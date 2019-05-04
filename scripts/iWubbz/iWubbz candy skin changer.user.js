// ==UserScript==
// @name         iWubbz candy skin changer 
// @namespace    http://tampermonkey.net/
// @version      1.2.2
// @description  Add skin changing
// @author       iwubbz
// @match        http://agarlist.com/
// @match        http://alis.io/
// @match        http://warlis.io/
// @grant        none
// ==/UserScript==
var skinChanger = false;
var i = 0
var skinSpeed = 500;
var skinList = ["http://i.imgur.com/1JQqUzR.png",
                "http://i.imgur.com/VKcEy4k.png",
                "http://i.imgur.com/FKsf0PC.png",
                "http://i.imgur.com/zg6Oxzo.png",
                "http://i.imgur.com/EPawa6H.png",
                "http://i.imgur.com/NyKl8tG.png"
                
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
//$('#overlays2').append('<h6 style="margin-left:500px">Agarlist Skin Changer by iWubbz</h6>')