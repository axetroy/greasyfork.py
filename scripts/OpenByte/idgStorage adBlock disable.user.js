// ==UserScript==
// @name            idgStorage adBlock disable
// @namespace       openbyte/idgsabd
// @author          OpenByte
// @description     disables idgStorage adBlock
// @compatible      firefox
// @compatible      chrome
// @compatible      opera
// @license         MIT License
// @encoding        utf-8
// @include         *
// @version         1.0.1
// @run-at          document-start
// @grant           none
// ==/UserScript==


window.addEventListener('beforescriptexecute', function(e) {
    if (e.target.innerText.includes("idgStorage.adBlock = \"1\";"))
        e.target.innerText = e.target.innerText.replace("idgStorage.adBlock = \"1\";", "idgStorage.adBlock = \"0\";");
}, false);
