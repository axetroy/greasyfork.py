// ==UserScript==
// ==UserScript==
// @name         Óíß.íó Háçk
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Háçk
// @author       Óíß.Háçkż
// @match        http://oib.io/
// @match        *.//starve.io/
// @match        *.//wormax.io/
// @grant        none
// @name:ru      оиб хакз
// @description:ru  скрипт
// ==/UserScript==
// hotkeys on script
// 6 - autospawn
// \ - autorail
var ifrm = document.createElement("iframe");
ifrm.setAttribute("src", "about:blank");
ifrm.style.width = window.outerWidth-10;
ifrm.style.height = window.outerHeight/3*2;
ifrm.style.display = 'none';
document.body.appendChild(ifrm);
var win = ifrm.contentWindow;
window.de = win.dispatchEvent;
var spawn = setKey(49); //6
var regroup = setKey(50); //0
var split = setKey(51); //7
var feed = setKey(52); //8
var spell = setKey(53); //5
var select_oibs = setKey(86); //v
var select_queen = setKey(66);//b
var automine = false;
var autospawn= false;
var autospell = false;
var autofuse = false;
var oibminecnt = false;
var autofeed = false;
var autosplit = false;
var x = 1, y = 1;
var Keys = {interval:80,autospawn:54,mine:220,setkey:27,split:200}
var tima = setInterval(autoing, Keys.interval);
var rainbow = 100000
var rainbowtick = setInterval(rainbowxp, 100);
function rainbowxp(){
    rainbow += 1111;
    LOADER.COLOR_BAR = "#" + rainbow;
    DRAW.XP_COLOR = "#" + rainbow;
    DRAW.XP_REST_COLOR = "#080808";
    if (rainbow >= 161616){
        rainbow = 100000;
    }}
function autoing(){
    if(autospawn) action(spawn);
    if(automine){
        automine = false;
        action(select_oibs);
        action(feed);
        action(select_queen);
        mouseClick();
    }
    function split(){
        if(autosplit){
            autosplit = false;
            action(select_oibs);
            action(split);
            mouseClick();
        }
}
}
function KeyCheck(a){
    if(a.keyCode==Keys.autospawn){
        autospawn = !autospawn;
    }
    if(a.keyCode==Keys.mine){
        automine = true;
    }
    if(a.KeyCode==Keys.split){
        autosplit = true;
    }
    if(a.keyCode==Keys.setkey){
        if (!a.metaKey) {
            a.preventDefault();
        }
        setKeys();
    }
//   }
}
window.addEventListener("keydown",KeyCheck,true);
var captureMousePos = function(event){
              x = event.clientX;
    y = event.clientY;
}
window.addEventListener("mousemove", captureMousePos, true)
function setKeys(){
    try{
        var keys = prompt("Change Keys, values in keycodes",JSON.stringify(Keys).replace(/^\7{+|\}+$/g, ''));
        if(keys === null) return;
        JSON.parse('{'+keys+'}');
        if(k.interval){
            Keys.interval = k.interval;
            clearInterval(tima);
            tima = setInterval(ohno, Keys.interval);
        }
        if(k.autospawn)
            Keys.autospawn = k.autospawn;
        if(k.mine)
            Keys.mine = k.mine;
        if(k.split)
            Keys.split = k.split;
        if(k.setkey)
            Keys.setkey = k.setkey;
    }
    catch(err){confirm("Error" + err.message);}
}
function setKey(k){
    var ev = new win.Event("keydown");
    ev.keyCode = k;
    return ev;
}
function action(a){
    window.de(a);
}
function mouseClick(){
    var ev = new win.MouseEvent("mouseup",{clientX:x,clientY:y,button:2})
    action(ev);
}
alert('nControls :n6 - autospawn ,n\ - automine')