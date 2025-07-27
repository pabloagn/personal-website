// scripts/generate-langstats.js
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const DATA_DIR = "./data/langstats";
const CONTENT_DIR = "./content/projects";
const COLOR_MAP = {
  Ada: "#bb3e41",
  Agda: "#957fb8",
  Angular: "#c34043",
  Assembly: "#d27e99",
  Astro: "#ffa066",
  Bash: "#89e051",
  C: "#555555",
  Clojure: "#7aa89f",
  COBOL: "#c0a36e",
  Coq: "#7e9cd8",
  Cpp: "#00599c",
  Crystal: "#7aa89f",
  CSharp: "#178600",
  CSS: "#563d7c",
  D: "#ba595e",
  Dart: "#00b4ab",
  Elixir: "#6e4a7e",
  Elm: "#60b5cc",
  Erlang: "#b83998",
  Fennel: "#fff3d7",
  Fortran: "#4d41b1",
  GAP: "#8fc1ff",
  Gleam: "#ffaff3",
  Go: "#00add8",
  GraphQL: "#e10098",
  Haskell: "#5e5086",
  HDL: "#c0a36e",
  HTML: "#e34c26",
  HTTP: "#7aa89f",
  Hugo: "#7aa89f",
  Idris: "#b2b7f8",
  Isabelle: "#bd81c0",
  Java: "#b07219",
  JavaScript: "#f1e05a",
  Julia: "#a270ba",
  Jupyter: "#da5b0b",
  Kotlin: "#a97bff",
  LaTeX: "#3d6117",
  Lean: "#c34043",
  Lisp: "#7aa89f",
  Lua: "#000080",
  Markdown: "#7aa89f",
  Mathematica: "#d0101b",
  MATLAB: "#e16737",
  Maxima: "#4a6c6f",
  Nim: "#ffc200",
  Nix: "#658594",
  Nodejs: "#44883e",
  ObjC: "#438eff",
  OCaml: "#3be133",
  Odin: "#867edb",
  Pascal: "#b0ceff",
  Perl: "#0298c3",
  PHP: "#4f5d95",
  Prolog: "#74283c",
  Python: "#3572A5",
  R: "#198ce7",
  Racket: "#9f1d20",
  React: "#61dafb",
  Ruby: "#701516",
  Rust: "#dea584",
  Sage: "#7aa89f",
  Scala: "#c22d40",
  Scheme: "#1e4aec",
  Scientific: "#7aa89f",
  Shaders: "#6e4a7e",
  Shell: "#89e051",
  Solidity: "#363636",
  SQL: "#e38c00",
  Svelte: "#ff3e00",
  Swift: "#f05138",
  TypeScript: "#2b7489",
  Typst: "#7e9cd8",
  V: "#4f87c4",
  Vue: "#41b883",
  Zig: "#ec915c",
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
