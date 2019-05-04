// ==UserScript==
// @name         Rifas Stagle 
// @namespace    http://tampermonkey.net/
// @version      1.2.2
// @description  Add skin changing
// @author       iwubbz
// @match        http://agarnet.me/
// @match        http://alis.io/
// @match        http://dual-agar.me/
// @grant        none
// ==/UserScript==
var skinChanger = false;
var i = 0
var skinSpeed = 500;
var skinList = ["https://i.imgur.com/rCPYf1W.png",
                "https://i.imgur.com/4o4hTJl.png",
                "https://i.imgur.com/wDM7w4i.png",
                "https://i.imgur.com/ivcpitJ.png",
                "http://i.imgur.com/EPawa6H.png",
                "https://i.imgur.com/LJmP20v.png"
                
               ];
window.addEventListener('keydown', keydown);
function keydown(e) {
        if(e.keyCode === 67 && !($("#input_box2").is(":focus"))) {
        skinChanger = !skinChanger;
        }
        if(e.keyCode === 27) {
        skinChanger = false;
        }
   }
//$('.content').append('<input style="border:1px solid grey;" placeholder="Time between skin change (milliseconds)" id="skin_change_inputSpeed" value="500" type="number" min="300"/>');

setInterval(function(){
    if(skinChanger) {
    document.getElementById('skin_url').value = skinList[i];
    i++;
    if(i === skinList.length) {i = 0;}
    setNick(document.getElementById('nick').value);
          }
    },skinSpeed);
//$('#overlays2').append('<h6 style="margin-left:500px">Photo korean skin by Stagle</h6>')