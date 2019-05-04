// ==UserScript==
// @name         Skin-Ratator V1
// @namespace    trbot.weebly.com
// @version      3
// @description  Skin-Ratator ! Press C For On/Off Skin Ratator
// @author       FreeTz YT
// @match        http://alis.io/
// @grant        none
// ==/UserScript==
var skinChanger = false;
var i = 0
var skinSpeed = 200;
var skinList = ["http://i.imgur.com/gWNUOF7.png",
                "http://e.top4top.net/p_28151gb1.jpg",
                "http://c.top4top.net/p_28120lt1.jpg",
                "http://a.top4top.net/p_28178kx2.jpg",
                "http://f.top4top.net/p_281yl3z1.jpg",
                "http://b.top4top.net/p_2812n2w3.jpg",
                "http://c.top4top.net/p_281l4ym4.png",
                "http://e.top4top.net/p_281lysd4.png",
                "http://d.top4top.net/p_281tf9c3.jpg",
                "http://c.top4top.net/p_281943e2.png",
                "http://b.top4top.net/p_281n1ue1.jpg",
                "http://a.top4top.net/p_281cfva1.jpg",
                "http://b.top4top.net/p_28103712.jpg",
                "http://c.top4top.net/p_281wxz33.jpg",
                "http://d.top4top.net/p_281udi64.jpg",
                "http://e.top4top.net/p_281mjor5.jpg",
                "http://f.top4top.net/p_281tx5z6.jpg",
                "http://a.top4top.net/p_281h3627.jpg",
                "http://b.top4top.net/p_281wduu1.jpg",
                "http://c.top4top.net/p_281yl5q2.jpg",
                "http://d.top4top.net/p_281yqk03.jpg",
                "http://e.top4top.net/p_281zkyn4.jpg",
                "http://f.top4top.net/p_281v6ip5.jpg",
                "http://a.top4top.net/p_281ul296.png",
                "http://b.top4top.net/p_2814yg77.jpg",
                "http://c.top4top.net/p_281cufy8.png",
                "http://e.top4top.net/p_281ags410.jpg",
                "http://d.top4top.net/p_2816qqa9.jpg",
                "http://d.top4top.net/p_281qudh3.png",
                "http://c.top4top.net/p_28166j62.jpg",
                "http://b.top4top.net/p_281l64l1.jpg",

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
//$('#overlays2').append('<h4 style="margin-left:900px">Alix.io Skin/color Changer by FreeTz YT</h4>')
 
 
//To on the skin/color press c, and if you want to of it press c again , enjoy ! This Extension By "FreeTz YT"