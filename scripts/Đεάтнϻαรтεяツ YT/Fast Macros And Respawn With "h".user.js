// ==UserScript==
// @name         Fast Macros And Respawn With "h"
// @namespace    Fast Macros And Respawn With "h"
// @version      1.6
// @description  Fastest Mass Ejector & Split Macro
// @author       Hiruna :)
// @match        *.senpa.io/*
// @match        *.popsplit.us/*
// @match        *.gaver.io/*
// @match        *.gota.io/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 30; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 65) { //key A
        split();
        setTimeout(split, speed);
    }
        if (event.keyCode == 81) { //key R
            closeStats();
            rspwn(document.getElementById('nick').value);
    }
    if (event.keyCode == 68) { //key D
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
    }
    if (event.keyCode == 83) { //key S
        X = window.innerWidth/2;
        Y = window.innerHeight/2;
        $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
    }
}

function keyup(event) {
    if (event.keyCode == 87) { // key W
        EjectDown = false;
    }
}

function eject() {
    if (EjectDown) {
        window.onkeydown({keyCode: 87}); // key W
        window.onkeyup({keyCode: 87});
        setTimeout(eject, speed);
    }
}

function split() {
    $("body").trigger($.Event("keydown", { keyCode: 32})); //key space
    $("body").trigger($.Event("keyup", { keyCode: 32})); //Why You Look Here O_o
}

}window.stop();
document.documentElement.innerHTML = "";
"gota.io" == location.host && "/" == location.pathname && (location.href = "https://gota.io/web/crowns" + location.hash);
GM_xmlhttpRequest({
    method : "GET",
    url : "https://gota.io/web/", 
    onload : function(e) {
        var doc = injectFiles(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});

function injectFiles(page) {
	page = page.replace(/((<script>\s.*?var.*?<\/script>))/g, "");
    page = page.replace(/(<script.*?src=\"*?gota.*?\")/i, tagScript(SCRIPT));
    page = page.replace(/(<link.*?href="style.css.*?" \/>)/i, "$1" + tagStyle(STYLE));
    return page;
}
