// ==UserScript==
// @name         auto-open-ciat
// @namespace    www.juniper.net
// @version      1.1
// @description  auto_open-gnats
// @author       Yan Zhongwen
// @include      http*://*pvs.jnpr.net/jss-ciat/app/home*
// @include      http*://*pvs.juniper.net/jss-ciat/app/home*
// @grant        none
// ==/UserScript==

function openALLPR_onthisPage () {
    Table_all = window.top.frames[9].document.getElementsByClassName('customSort')[0];
    for (var i=1, len=Table_all.rows.length; i<len-1; i++) {
        ELEMENT = Table_all.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].getElementsByTagName('a');
               ELEMENT[0].click();
// Gnats       ELEMENT[1].click();
    };
};
if (self == top) {
    LstBun = document.getElementById('myslidemenu').childNodes[1].lastChild;
    bun_NEW = window.frames[9].document.createElement("input");
    bun_NEW.type = "button";
    bun_NEW.value = "Go!";
    bun_NEW.name = 'DE';
    bun_NEW.style.cssText = "height: 30px; cursor:pointer; color:#f3f3f3; border-top-left-radius: 10px; border-bottom-right-radius: 10px; width: 45px; background-color: rgb(92, 184, 92); border-color: rgb(76, 174, 76);";
    bun_NEW.onclick = openALLPR_onthisPage;
    LstBun.parentNode.appendChild(bun_NEW);
};