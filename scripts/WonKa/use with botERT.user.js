// ==UserScript==
// @name         use with botERT
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Press & hold W for macro feed Press A or 2 to split 2x Press Q or 1 to split 1x Press T for horizontal  linesplit position and more!!!
// @author       WonKa
// @match        *.agar.io/*
// @match        agar.io
// @match        gota.io
// @match        agarlist.com
// @match        alis.io
// @match        abs0rb.me
// @match        abs0rb.me/index.php
// @run-at       document-end
// ==/UserScript==

// User input.
window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);

//List instructions
var i = document.getElementById("instructions");
i.innerHTML += "<center>Press & hold <b>W</b> for macro feed</center>";
i.innerHTML += "<center>Press <b>A</b> or <b>2</b> to split 2x</center>";
i.innerHTML += "<center>Press <b>Q</b> or <b>1</b> to split 1x</center>";
i.innerHTML += "<center>Press <b>T</b> for horizontal linesplit position</center>";
i.innerHTML += "<center>Press <b>Y</b> for vertical linesplit position</center>";
i.innerHTML += "<center>Press <b>G</b> and <b>G</b> to move left and right during a horizontal linesplit</center>";
i.innerHTML += "<center>Press <b>H</b> and <b>H</b> to move up and down during a vertical linesplit</center>";

//Auto-enable show mass/skip stats
//IMPORTANT: You must uncheck showmass/skip stats first then recheck them for it to auto save every time
function autoSet() {
    var m = document.getElementById('showMass'), s = document.getElementById('skipStats');
    if (document.getElementById("overlays").style.display!= "none") {
        document.getElementById("settings").style.display = "block";
        if (m.checked) {m.click();} m.click(); //Show mass
        if (s.checked) {s.click();} s.click(); //Skip stats
    } else setTimeout(autoSet, 100);
}

//Load macros
var canFeed = false;
function keydown(event) {
switch (event.keyCode) {
case 87: //Feeding Macro (w)
            canFeed = true;
            feed();
            break;
case 65: //Doublesplit Macro (a)
            split();
            setTimeout(split, 50);
            break;
case 50: //Doublesplit Macro (2)
            split();
            setTimeout(split, 50);
            break;
case 81: //Space Macro (q)
            split();
            break;
case 49: //Space Macro (1)
            split();
            break;
case 84: //Horizontal linesplit (t)
            X = window.innerWidth / 2;
            Y = window.innerHeight / 2;
            $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
            break;
case 89: //Vertical linesplit (y)
            X = window.innerWidth / 2;
            Y = window.innerHeight / 2.006;
            $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
            break;
case 71: //Move left Horizontal (g)
            X = window.innerWidth / 2.4;
            Y = window.innerHeight / 2;
            $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
            break;
case 71: //Move right Horizontal (g)
            X = window.innerWidth / 1.6;
            Y = window.innerHeight / 2;
            $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
            break;
case 72: // Move up Veritcal (h)
            X = window.innerWidth / 2;
            Y = window.innerHeight / 2.4;
            $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
            break;
case 72: // Move down Veritcal (h)
            X = window.innerWidth / 2;
            Y = window.innerHeight / 1.6;
            $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
            break;
    }
}

//When a player lets go of W stop feeding
function keyup(event) {
    if (event.keyCode == 87)
        canFeed = false;
}

//Alias for W key
function feed() {
    if (canFeed) {
        window.onkeydown({keyCode: 87});
        window.onkeyup({keyCode: 87});
        setTimeout(feed, 0);
    }
}

//Alias for space
function split() {
    $("body").trigger($.Event("keydown", { keyCode: 32}));
    $("body").trigger($.Event("keyup", { keyCode: 32}));
}