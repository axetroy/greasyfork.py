// ==UserScript==
// @name         FVToolkit CustomCssLoader
// @version      0.1a3
// @description  Custom CSS loader for profile/villager pages.
// @author       CuteHornyUnicorn
// @namespace    CuteHornyUnicorn
// @include      /^https?://(?:www\.)?furvilla\.com/villager/[0-9]*$/
// @include      /^https?://(?:www\.)?furvilla\.com/profile/[0-9]*$/
// @include      http://www.furvilla.com/profile
// @grant        none
// ==/UserScript==

var cssLink = document.querySelectorAll("code")[0].textContent;

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = cssLink;
document.getElementsByTagName("HEAD")[0].appendChild(link);