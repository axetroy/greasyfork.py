// ==UserScript==
// @name         Auto Click Link Read Online in LHTranslation
// @namespace    Auto Click here(Link Read Online) in LHTranslation
// @version      1.3
// @description  Auto Click here(Link Read Online) in LHTranslation.
// @author       Riztard
// @include      http://lhtranslation.com/*chapter*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

'use strict';

window.location.href = $(".commentmetadata>p>a:contains('ere')").attr('href');