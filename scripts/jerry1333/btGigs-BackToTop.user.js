// ==UserScript==
// @name        btGigs-BackToTop
// @version     1.0
// @author      archion mod by jerry1333
// @namespace   https://greasyfork.org/users/4704
// @description Back to Top for btGigs based on https://greasyfork.org/pl/scripts/5051-backtotop
// @include     http*://*btgigs.info/*

// ==/UserScript==

if (window.top != window.self) { return; }  //don't run on frames or iframes
var af=document.createElement("link");
af.rel="stylesheet";
af.href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css";
document.head.appendChild(af);
var tp=document.createElement("span");
tp.className="fa fa-chevron-circle-up fa-3x top";
tp.setAttribute("style", "cursor: pointer; opacity:0; position: fixed; right: 40px; bottom: 25px; transition: opacity 0.7s;z-index: 999999;");
document.body.appendChild(tp);

tp.addEventListener('click', function(e){
    var sm = function() {
        if ((document.body.scrollTop||document.documentElement.scrollTop) === 0) {
            return;
        } else {
            scroll(0, (document.body.scrollTop || document.documentElement.scrollTop) * 0.9);
            setTimeout(sm, 0.1);
        }
    };
    sm();
}, false);

window.onscroll = function() {
    if ((document.body.scrollTop || document.documentElement.scrollTop) > window.innerHeight / 10) {
        document.querySelector("span.top").style.opacity = 0.8;
        document.querySelector("span.top").style.cursor = "pointer";
    }else{
        document.querySelector("span.top").style.opacity = 0;
        document.querySelector("span.top").style.cursor = "initial";
    }
};
