// scripts/generate-langstats.js
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const DATA_DIR = "./data/langstats";
const CONTENT_DIR = "./content/projects";
const COLOR_MAP = {
  Nix: "#3d8b71",
  Shell: "#89e051",
  Bash: "#89e051",
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Python: "#3572A5",
  // Add more as needed
};

async function getRepoLanguages(repoUrl) {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new Error(`Invalid GitHub repo URL: ${repoUrl}`);
  const [, owner, repo] = match;

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/languages`,
    {
      headers: {
        "User-Agent": "Hugo-LangStats",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    },
  );
  if (!res.ok)
    throw new Error(`Failed to fetch GitHub languages: ${res.statusText}`);
  const data = await res.json();

  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const languages = Object.entries(data)
    .filter(([lang]) => !["Markdown", "YAML", "JSON", "Text"].includes(lang))
    .map(([lang, bytes]) => ({
      name: lang,
      percent: Math.round((bytes / total) * 100),
      color: COLOR_MAP[lang] || "#999999",
    }))
    .sort((a, b) => b.percent - a.percent);

  const sum = languages.reduce((a, b) => a + b.percent, 0);
  if (sum !== 100 && languages.length > 0) {
    languages[0].percent += 100 - sum;
  }

  return languages;
}

function processProject(file) {
  const content = fs.readFileSync(file, "utf8");
  const repoMatch = content.match(/repository:\s*(.+)/);
  return repoMatch
    ? {
        slug: path.basename(file, ".md"),
        repoUrl: repoMatch[1].trim(),
      }
    : null;
}

async function main() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const project = processProject(path.join(CONTENT_DIR, file));
    if (!project) continue;

    try {
      const languages = await getRepoLanguages(project.repoUrl);
      fs.writeFileSync(
        path.join(DATA_DIR, `${project.slug}.json`),
        JSON.stringify({ languages }, null, 2),
      );
      console.log(`✅ ${project.slug}: ${JSON.stringify(languages)}`);
    } catch (err) {
      console.error(`❌ ${project.slug}: ${err.message}`);
    }
  }
}

main();
