// ==UserScript==
// @name         alis.io Skin/Color Changer By :JUAN MONSALVE YT COLOMBIA
// @namespace    http://tampermonkey.net/
// @version      3
// @description  Skin/color Changer !
// @author       5bzTeam
// @match        http://alis.io/
// @grant        none
// ==/UserScript==
var skinChanger = false;
var i = 0
var skinSpeed = 1600;
var skinList = ["http://i.imgur.com/dR17WdL.jpg",
                "http://i.imgur.com/gQCAEWx.jpg",
                "http://i.imgur.com/VJqmkhq.jpg",
                "http://i.imgur.com/K39uphl.jpg",
                "http://i.imgur.com/TshbPgr.jpg",
                "http://i.imgur.com/K25oiwS.mp4",
                "http://i.imgur.com/POsJ9uj.jpg?1",
                "http://i.imgur.com/x4xHJNb.png",
                "http://i.imgur.com/Hf5okn6.png",
                "http://i.imgur.com/DokHtL5.png",
                "http://i.imgur.com/EIIdCA6.png",
                "http://i.imgur.com/5f8PDee.png",
                "http://i.imgur.com/PKBkVCa.png",
                "http://i.imgur.com/bZWygIa.png",
                "http://i.imgur.com/LVPiqbl.png",
                "http://i.imgur.com/80qtiJs.png",
                "http://i.imgur.com/80qtiJs.png",
                "http://i.imgur.com/RXv3mOU.png",
                "http://i.imgur.com/ZFw8I8H.png",
                "http://i.imgur.com/U3Q0rnd.png",
                "http://i.imgur.com/DKIpJZJ.png",
                "http://i.imgur.com/jN1ZwZ6.png",
                "http://i.imgur.com/drMAcCh.png",
                "http://i.imgur.com/zdcFxNA.png",
                "http://i.imgur.com/i7UQe8h.png",
                "http://i.imgur.com/35Hg4KO.jpg",
                "http://i.imgur.com/0rd1ez7.jpg",
                "http://i.imgur.com/qeJsYx7.png",
                "http://i.imgur.com/tPV1Ofc.png",
                "http://i.imgur.com/z3Tk7MJ.png",
                "http://i.imgur.com/dEggQ2K.png",
                "http://i.imgur.com/s3pCy3J.jpg",
                "http://i.imgur.com/dUMSkwe.png",
                "http://i.imgur.com/4rnaj02.png",
                "http://i.imgur.com/bKMJOqd.png",
                "http://i.imgur.com/hieOiwb.jpg",
                "http://i.imgur.com/mE6Abw8.png",
                "http://i.imgur.com/VBhK5Pq.jpg",
                "http://i.imgur.com/EU6rWcF.jpg",
                "http://i.imgur.com/npAMFcQ.jpg",
                "http://i.imgur.com/qyQsSMh.jpg",
                "http://i.imgur.com/na1s933.jpg",
                "http://i.imgur.com/LVc7CBm.png",
                "http://i.imgur.com/J3OUB7Y.jpg",
                "http://i.imgur.com/5thoaBa.jpg",
                "http://i.imgur.com/sDzFe1k.jpg",
                "http://i.imgur.com/UWa75ul.jpg",
                "http://i.imgur.com/yG11JkD.jpg",
                "http://i.imgur.com/3ZYYXHH.jpg",
                "http://i.imgur.com/oLGjuiK.jpg",
                "http://i.imgur.com/0K1EGBU.jpg",
                "http://i.imgur.com/h2aukSA.png",
                "http://i.imgur.com/9Xk2Gv7.jpg",
                "http://i.imgur.com/VXKyGPg.png
               

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
//$('.content').append('<input style="border:1px solid grey;" placeholder="Time between skin change (milliseconds)" id="skin_change_inputSpeed" value="9991999" type="number" min="99999"/>');
 
 
 
setInterval(function(){
    if(skinChanger) {
        document.getElementById('skin_url').value = skinList[i];
        i++;
        if(i === skinList.length) {i = 0;}
        setNick(document.getElementById('nick').value);
    }
},skinSpeed);
//$('#overlays2').append('<h4 style="margin-left:900px">Agarlist Skin/color Changer by 5bzTeam</h4>')
 
 
//To on the skin/color press c, and if you want to of it press c again , enjoy ! This By 5bzTeam "iiPixelSA"