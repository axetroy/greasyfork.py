// ==UserScript==
// @name         Fix for externalSubmit
// @namespace    https://gist.github.com/Kadauchi
// @version      1.0.1
// @description  Correctly redirects for mturk when logged into both old and new mturk
// @author       Kadauchi
// @icon         http://i.imgur.com/oGRQwPN.png
// @include      https://www.mturk.com/mturk/externalSubmit*
// @grant        GM_log
// ==/UserScript==

const reloadOuterPage = () => {
  const boxes = top.document.getElementsByName('autoAcceptEnabled');
  if (boxes.length === 0 || !boxes[0].checked) {
    top.location = top.document.getElementById('hitExternalNextLink').href;
  } else {
    top.location = top.document.getElementById('hitExternalNextAcceptLink').href;
  }
};

setTimeout(reloadOuterPage, 500);
//reloadOuterPage();
