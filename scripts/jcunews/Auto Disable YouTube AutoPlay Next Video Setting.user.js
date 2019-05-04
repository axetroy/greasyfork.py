// ==UserScript==
// @name         Auto Disable YouTube AutoPlay Next Video Setting
// @namespace    AutoDisableYouTubeAutoPlayNextVideoSetting
// @description  Auto disable YouTube's AutoPlay Next Video setting at top sidebar of video page
// @version      1.0.3
// @license      GNU AGPLv3
// @author       jcunews
// @match        https://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

(function chk(eleCheck){
  if((eleCheck = window["autoplay-checkbox"] || document.querySelector("#improved-toggle.ytd-compact-autoplay-renderer") || document.querySelector("#toggle.ytd-compact-autoplay-renderer")) && eleCheck.attributes["checked"]) {
    eleCheck.click();
  } else setTimeout(chk, 500);
})();
