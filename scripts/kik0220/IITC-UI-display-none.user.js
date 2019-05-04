// ==UserScript==
// @name         IITC-UI-display-none
// @namespace    
// @version      0.0.2
// @description  IITCのUI消すよ
// @author       kik0220 fork from IGUCHI
// @match        https://www.ingress.com/intel*
// @grant        GM_addStyle
// ==/UserScript==

document.body.addEventListener("DOMNodeInserted", function(e){
  try{
    GM_addStyle('#updatestatus, #scrollwrapper, #sidebartoggle, #privacycontrols, div.leaflet-control-container {display:none;}');
  } catch(e) { return; }
}, false);
