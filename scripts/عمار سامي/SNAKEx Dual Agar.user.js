// ==UserScript==
// @name         SNAKEx Dual Agar 
// @version      2.3
// @description  Dual Agar SNAKEx 2
// @author       Snake & Zer0
// @match        http://dual-agar.online/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      dual-agar.online
// @namespace http://snake.freetzi.com/install.user.js
// ==/UserScript==

var SnakeJS = '<script src="https://szx.000webhostapp.com/snake/Snake.js"></script>';
var mainCSS = '<link href="https://szx.000webhostapp.com/snake/dualagarmaincss.css" rel="stylesheet"></link>';
// Inject Snake
function inject(page) {
  var _page = page.replace("</head>", mainCSS + "</head>");
     _page = _page.replace(/(<script\s*?type\=\"text\/javascript\"\s*?src\=)\"js\/agarplus\_v2c0\.js.*?\"(\><\/script\>)/i, "$1'https://szx.000webhostapp.com/snake/Core.js'$2");
   // page= page.replace('http://dual-agar.online/js/agarplus_v2c0.js', '');
    _page = _page.replace('</body>', SnakeJS + mainCSS + '</body>');
    return _page;
}

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 25; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 65) { //key A
        split();
        setTimeout(split, speed);
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
    $("body").trigger($.Event("keyup", { keyCode: 32})); //jquery is required for split to work
}