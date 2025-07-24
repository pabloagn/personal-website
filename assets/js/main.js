import { initHeaderScroll } from './modules/headerScroll.js';
import { initCallouts } from './modules/callouts.js';
import { initCodeDecor } from './modules/codeDecor.js';
import { initHeaderAnchors } from './modules/headerAnchors.js';
import { initSmoothScroll } from './modules/smoothScroll.js';
import { initCodeLineHover } from './modules/codeLineHover.js';
import { initHeroReactor } from './modules/heroReactor.js';
import { initSiteSearch } from './modules/search.js';

function boot() {
  initHeaderScroll();
  initSmoothScroll();
  initCodeDecor();
  initCodeLineHover();
  initCallouts();
  initSiteSearch();
  // initHeaderAnchors();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
