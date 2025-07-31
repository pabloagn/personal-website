// main.js
module.exports = class extends require('obsidian').Plugin {
    onload() {
        this.registerMarkdownPostProcessor((element, context) => {
            const frontmatter = context.frontmatter;

            if (frontmatter && frontmatter['banner-image-position-y']) {
                const positionY = frontmatter['banner-image-position-y'];
                document.documentElement.style.setProperty('--banner-image-position-y', positionY);
            }
        });
    }

    onunload() {
        // Cleanup when plugin is disabled/unloaded
        document.documentElement.style.removeProperty('--banner-image-position-y');
    }
};