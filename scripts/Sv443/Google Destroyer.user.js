// ==UserScript==
// @name            Google Destroyer
// @namespace       http://sv443.net/
// @version         0.2
// @description     Type something into Google to instantly die
// @author          Sv443
// @license         MIT
// @copyright       2018, Sv443 (https://github.com/Sv443)
// @match           https://www.google.de/*
// @match           https://www.google.com/*
// @run-at          document-start
// @icon            https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png
// ==/UserScript==


var donce = false, rb_mult = 2;

document.addEventListener("DOMContentLoaded", ()=>{
    document.addEventListener("keyup", ()=>rainbow());
});

function rainbow() {
    var l = document.getElementById("hplogo"), i = 0, a = 0;
    if(donce) return;
    setInterval(function(){
        donce = true;
        if(i <= 0) a = 0;
        if(i >= 360) a = 1;
        if(i < 360 && a === 0) i += 3 * rb_mult;
        else i -= 3 * rb_mult;
        if(Math.floor(Math.random() * 2) < 1) i += Math.random() * 10;
        else i -= Math.random() * 10;
        l.style.filter="drop-shadow(4px 4px 2px #000) hue-rotate(" + i * ((Math.random() * 10) - 5) + "deg) opacity(" + Math.random() * 100 + "%)";
        l.style.transform="rotate(" + i * 4 + "deg)";
        l.style.left=Math.random() * 75 + 5 + "%";
        l.style.bottom=Math.random() * 25 + 15 + "%";
        l.style.width=Math.random() * 1000 + 50 + "px";
        l.style.height=Math.random() * 550 + 50 + "px";
        l.style.position="absolute";
        l.style.transition="transform 0.1s linear, left 0.1s linear, bottom 0.1s linear";

        var m = document.getElementsByClassName("RNNXgb")[0];
        m.style.filter="hue-rotate(" + i * ((Math.random() * 10) - 5) + "deg) opacity(" + Math.random() * 100 + "%)";
        m.style.transform="rotate(-" + i * 3 + "deg)";
        m.style.left=Math.random() * 75 + 5 + "%";
        m.style.bottom=Math.random() * 25 + 15 + "%";
        m.style.width=Math.random() * 1000 + 50 + "px";
        m.style.position="absolute";
        m.style.transition="transform 0.1s linear, left 0.1s linear, bottom 0.1s linear";

        var n = document.getElementsByClassName("FPdoLc")[0];
        n.style.filter="hue-rotate(" + i * ((Math.random() * 10) - 5) + "deg) opacity(" + Math.random() * 100 + "%)";
        n.style.transform="rotate(-" + (i * 7 + 30) + "deg)";
        n.style.left=Math.random() * 75 + 5 + "%";
        n.style.bottom=Math.random() * 25 + 15 + "%";
        n.style.width=Math.random() * 1000 + 50 + "px";
        n.style.position="absolute";
        n.style.transition="transform 0.1s linear, left 0.1s linear, bottom 0.1s linear";

        var o = document.getElementsByClassName("UUbT9")[0];
        o.style.filter="hue-rotate(" + i * ((Math.random() * 10) - 5) + "deg) opacity(" + Math.random() * 100 + "%)";
        o.style.transform="rotate(-" + (i * 7 + 30) + "deg)";
        o.style.left=Math.random() * 75 + 5 + "%";
        o.style.bottom=Math.random() * 25 + 15 + "%";
        o.style.height=Math.random() * 550 + 50 + "px";
        o.style.width=Math.random() * 1000 + 50 + "px";
        o.style.position="absolute";
        o.style.transition="transform 0.1s linear, left 0.1s linear, bottom 0.1s linear";
    }, 100 / (rb_mult / 6));
}