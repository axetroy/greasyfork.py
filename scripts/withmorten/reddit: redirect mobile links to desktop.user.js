// ==UserScript==
// @name        reddit: redirect mobile links to desktop
// @namespace   mailto:morten.with@gmail.com
// @locale      en
// @include     *m.reddit.com*
// @version     0.2
// @run-at      document-start
// @grant       none
// @description redirects mobile reddit links to desktop reddit links
// ==/UserScript==

(function()
{
'use strict';

document.location.replace(document.location.href.replace('://m.', '://'));
})();
