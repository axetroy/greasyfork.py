// ==UserScript==
// @name         Double skin changer
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Add skin changing
// @author       iwubbz/editedbydouble
// @match        http://agarlist.com/
// @match        http://alis.io/
// @match        http://warlis.io/
// @grant        none
// ==/UserScript==
var skinChanger = false;
var i = 0
var skinSpeed = 500;
var skinList = ["http://i.imgur.com/V4cA5LV.png",
                "http://i.imgur.com/Je0DQg2.png",
                "http://i.imgur.com/DhvES4i.png",
                "http://i.imgur.com/H6VLd2D.png",
                "http://i.imgur.com/IhL6XnD.png",
                "http://i.imgur.com/HYiEqHx.png"
                
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