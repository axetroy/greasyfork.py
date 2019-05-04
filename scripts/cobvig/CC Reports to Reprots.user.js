// ==UserScript==
// @name         CC Reports to Reprots
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fixes the spelling mistake
// @author       cobvig
// @match        https://reports.cubecraft.net/*
// @grant        none
// ==/UserScript==

function doReplace(e) {
        $("body *").contents().each(function() {
            if(this.nodeType==3){
                if (this.textContent.match(/report/i)) {
                    this.textContent = this.textContent.replace(/report/g, "reprot").replace(/Report/g, "Reprot");
                }
            }
        });
}

(function() {
    'use strict';
    $(document).ready((e) => {
        doReplace(e);
    });
    setInterval(doReplace, 1000);
})();