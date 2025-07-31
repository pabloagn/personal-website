// import { initSiteSearch } from "./modules/search.js";
import { initHeaderScroll } from "./modules/headerScroll.js";
import { initCallouts } from "./modules/callouts.js";
import { initCodeDecor } from "./modules/codeDecor.js";
import { initHeaderAnchors } from "./modules/headerAnchors.js";
import { initSmoothScroll } from "./modules/smoothScroll.js";
import { initCodeLineHover } from "./modules/codeLineHover.js";
import { enableDatablockSort } from "./modules/datablockSort.js";
import { enableLanguageStackTooltips } from "./modules/languageStack.js";
import { progressScroll } from "./modules/progressBar.js";
import { initTimelineLines } from "./modules/verticalTimelines.js";
import { initHexagonPillars } from "./modules/pillarsHexagon.js";
import { hamburgerMenu } from "./modules/hamburgerMenu.js";
import { autonumberHeadings } from "./modules/autonumberHeadings.js";
import { enableTableOverflowFade } from "./modules/enableTableOverflowFade.js";
import { enableTocFadeEffect } from "./modules/enableTocFadeEffect.js";
import { applyDropCap } from "./modules/applyDropCap.js";
import { tocTotree } from "./modules/tocToTree.js"
import { decorateHeader } from "./modules/decorateHeader.js"

// NOTE:
// Be careful with the orderof function calling.
// e.g., autonumber always must go before anchors.
function boot() {
  // initSiteSearch();
  initHeaderScroll();
  initSmoothScroll();
  initCodeDecor();
  initCodeLineHover();
  initCallouts();
  progressScroll();
  enableDatablockSort();
  enableLanguageStackTooltips();
  initTimelineLines();
  autonumberHeadings();
  initHeaderAnchors();
  initHexagonPillars();
  hamburgerMenu();
  enableTableOverflowFade();
  enableTocFadeEffect();
  applyDropCap();
  tocTotree();
  decorateHeader();
}

import "./modules/datablock.js";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
