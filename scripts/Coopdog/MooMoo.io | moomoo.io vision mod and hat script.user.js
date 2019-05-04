// ==UserScript==
// @name         MooMoo.io | moomoo.io vision mod and hat script
// @version      .5
// @description  moomoo vision mod and hat script!! pluse hat cycle and chatmods this works you should try it, it looks really cool lol and click on me then scroll down check out the images.
// @author       Coopdog // credit to flarez and FΣΓΔΠΨZΣΓΛΓ
// @match        *://*.moomoo.io/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.slim.min.js
//@icon          https://mobimg.b-cdn.net/androidgame_img/moomooio/real/1_moomooio.jpg
// @namespace https://greasyfork.org/users/170638
// ==/UserScript==

$("#moomooio_728x90_home").parent().css({display: "none"});

document.getElementById("twitterFollow").remove();  //  some of the parts are from other people scripts so credit to flarez and FΣΓΔΠΨZΣΓΛΓ. i couldent have done this without falre without flarez cause im new at scripting.
document.getElementById("youtubeFollow").remove();
document.getElementById("followText").innerHTML = "Hello"
document.getElementById("followText").style = "bottom: -0px;"


document.getElementById("storeHolder").style = "height: 1500px; width: 450px;";
document.getElementById('errorNotification').remove();

document.getElementById("gameName").style.color = "red";
document.getElementById("setupCard").style.color = "blue";
document.getElementById("gameName").innerHTML = "MooMoo.io";
document.getElementById("promoImg").remove();
document.getElementById("desktopInstructions").innerHTML = "<br/> how to use mod </a> <br> Shift=Booster Hat,Ctrl=Flipper Hat,</a> <br> Tab=Emp Helmet,Alt=Tank Gear,</a> <br>I=Winter Cap,Y=Soldier Helmet,</a> <br> Z=Turret Gear,U=Bull Helmet,</a> <br> K=Samurai Armor,perid=bush</a> <br>H=Marksman Cap,J=Musketeer</a> <br> Comma=Bull/Samurai ,</a> <br>Semicolon= Soldier/Bull"
document.getElementById("desktopInstructions").style.color = "#e842f4";
document.getElementById("ageText").style.color = "blue";
$('#guideCard').prepend('<a href = "https://discord.gg/zJFvV48">hi! </a> <br> ');
$('#featuredYoutube').prepend('<a href = "https://www.youtube.com/channel/UCfPlaEXq5BWJQzRwr5Qywwg">FlareZ </a> <br> ');
console.info('Loading href...')
    document.getElementById("leaderboard").append('ASSASSIN');
    document.getElementById("leaderboard").style.color = "#0000FF";
    document.getElementById("allianceButton").style.color = "blue";
    document.getElementById("chatButton").style.color = "blue";
    document.getElementById("storeButton").style.color = "blue";
    document.getElementById("diedText").style.color= "#0000FF";
    document.getElementById("chatBox").style.color= "#0000FF";
    document.getElementById("followText").style.color = "#e842f4";
    document.getElementById("linksContainer2").innerHTML = ";-;";
    document.getElementById("linksContainer2").style.color = "#e842f4";
    document.getElementById("nameInput").style.color = "#0000FF";
    document.querySelector(".menuText").style.color = "#e842f4";
    document.querySelector(".settingRadio").style.color = "#e842f4";
    document.getElementById('loadingText').innerHTML = '. . . . . . . . . . . . . . . . . . . . . . HELLO . . . . . . . . . . . . . . . . . . . . . .';
    document.getElementById('nameInput').placeholder = "UKNOWN";
    document.getElementById('chatBox').placeholder = "CHAT";
    document.querySelector(".menuButton span").style.color = "#0000FF";
    document.getElementById('enterGame').innerHTML = '? ENTER ?';
    document.getElementById("promoImgHolder").innerHTML = "Equal button to update chat cycle</a> <br> escape to toggle on chat cycle"
    document.getElementById('adCard').innerHTML = '<iframe width="341px" height="240.25px" src="https://www.youtube.com/embed/_Zxd4t0QLm0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
//if u want to chang the video just go to youtube chose a video then click share the look at the imges it shows the one that looks like <> this click it then copy and paste the embem between the two '' quots and change the with and hieght to this width="300px" height="240.25px
document.getElementById("scoreDisplay").style.color = "#FCF485";
document.getElementById("woodDisplay").style.color = "#0000FF";
document.getElementById("stoneDisplay").style.color = "#0000FF";
document.getElementById("killCounter").style.color = "#0000FF";
document.getElementById("foodDisplay").style.color = "#0000FF";


const enableMiner = false;
const disableMiner = true;


$("#mapDisplay").css("background", "url('https://i.imgur.com/fgFsQJp.png')");

$('#loadingText').css({'color': '#808080',
                       'background-color': 'rgba(0, 0, 0, 0.74)',
                       'padding': '8px',
                       'right': '150%',
                       'left': '150%',
                       'margin-top': '40px'});

$('.menuHeader').css({'color': '#0000FF'});

$('.menuCard').css({'white-space': 'normal',
                    'text-align': 'center',
                    'background-color': 'rgba(0, 0, 0, 0.74)',
                    '-moz-box-shadow': '0px 0px rgba(255, 255, 255, 0)',
                    '-webkit-box-shadow': '0px 0px rgba(255, 255, 255, 0)',
                    'box-shadow': '0px 0px rgba(255, 255, 255, 0)',
                    '-webkit-border-radius': '0px',
                    '-moz-border-radius': '0px',
                    'border-radius': '0px',
                    'margin': '15px',
                    'margin-top': '15px'});

$('#itemInfoHolder').css({'text-align': 'center',
                          'top': '125px',
                          'left': '350px',
                          'right': '350px',
                          'max-width': '666px'});

$('#serverSelect').css({'cursor': 'pointer',
                        'color': '#FF0000',
                        'background-color': '#808080',
                        'border': 'hidden',
                        'font-size': '20px'});

$('.ytLink').css({'color': '#00FFFF',
                  'padding': '8px',
                  'background-color': 'rgba(rgb(0, 0, 0, 0.74))'});

 $('#promoImgHolder').css({'color':'#e842f4'});

$('#chatBox').css({'background-color':'#000000'});

$('#settingsTitle').css({'color':'#ff0000'});

$('.menuPrompt').css({'color':'#ff0000'});

$("#gameCanvas").css('cursor', 'url(http://cur.cursors-4u.net/user/use-1/use153.cur), default'); //credit to flarez

$("#ageBar").css({
  'border-radius':'50px',
  'border':'3px solid #7100cf'
});

$("#upgradeCounter").css({
  'color':'#7100cf',
  'width':'27%',
  'top':'10px'
});

$("#upgradeHolder").css({
  'width':'5%',
  'height':'0px'
});

$("#ageBarContainer").append('</br><div id="hacktext"></div><div style="width: 100%;position: absolute;bottom: 94px;text-align: center;color: blue;font-size: 24px;" id="freetext"></div><div style="width: 100%;position: absolute;bottom: 144px;text-align: center;color: #ed3f00;font-size: 24px;" id="ptext"></div><div style="width: 100%;position: absolute;bottom: 224px;text-align: center;color: #9a008b;font-size: 24px;" id="ctext"></div><div style="width: 100%;position: absolute;top: 100px;text-align: center;color: blue;font-size: 12px;" id="bilgitext">Free animals ─ Backslash | bears/monkey ─ F9 | Pig / Cow / Sheep / Bull ─ F10 | Free ─ Backslash | Animals ─ F6 | police mod ─ BracketRight | All hats ─ BracketLeft </div><div style="width: 100%;position: absolute;bottom: 170px;text-align: center;color: darkgreen;font-size: 24px;" id="atext"></div><div style="width: 100%;position: absolute;bottom: 196px;text-align: center;color: black;font-size: 24px;" id="mtext"></div>'); // credit to cumhur

$('#adCard').css({'width': '25%'});

$('#ageBarBody').css({
  'background-color': '#0000FF'
});




document.getElementById("linksContainer2").href = "https://www.youtube.com/channel/UCLmapaWzwTHQIe3EgWMyMEg"

document.getElementById("diedText").innerHTML = "U R DIED"
var myElement = document.querySelector('#nameInput');
myElement.style.backgroundColor = "#0000FF";
myElement.style.color = "#FF0000";

var myElement = document.querySelector('#enterGame');
myElement.style.backgroundColor = "#FF0000";
myElement.style.color = "#0000FF";

var _msgs = ["hi", "DIE", "xD"];  // credit to MOODAWIDYT
var msgs = _msgs;
var msgCycleSwitch = false;
var shift = false;
var esc = false;
var home = false;
var chat;
var msgNum = 0;

var socket = null;

var scriptSetup = false;

WebSocket = class extends WebSocket {
    constructor(...arg) {
        super(...arg);
        if (!scriptSetup){
            scriptSetup = true;
            styleInit();
            ren_overlay();
            window.onbeforeunload = function (){
                return 'Are you sure you want to leave?';
            };
        }
        socket = this;
    }
};

if (storageAvailable('localStorage')){
   if (!localStorage.getItem("msgs")){
       localStorage.setItem("msgs", JSON.stringify(msgs));
   }else{
       let temp;
       try{
           temp = JSON.parse(localStorage.getItem("msgs"));
       }
       catch (e){
           alert("Invalid Array! Setting default...");
           saveData();
           temp = "";
       }
       if (temp !== ""){
           msgs = temp;
       }
   }
}

const overlay = {};
overlay.keyCode = 187;
overlay.toggle = false;
overlay.inputString = msgs.join("\n");
overlay.tempMsgs = _msgs;

function styleInit() {
    addGlobalStyle(`#chatCyclerUI{padding: 0.2em; margin:0.2em; position: absolute;top: 0;left: 0;width: 30%;
    background-color: rgba(0,200,200,0.75);display:none;}`);
    addGlobalStyle(".table{ display: table; text-align: center; width: 100%; height: 80%;}");
    addGlobalStyle(".row{ display: table-row; }");
    addGlobalStyle(`.cell{ display: table-cell; padding: 0px 0.3em;border: 1px solid black;}`);
    addGlobalStyle(`.backRed{background-color:#f14e54}`);
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
}

function toggleOverlay(tf){
    if (tf){
        document.querySelector('#chatCyclerUI').style.display = "block";
    }else{
        document.querySelector('#chatCyclerUI').style.display = "none";
    }
};

function ren_overlay(){
    const title = `<div style="font-size:32px">Chat Cycle Menu</div>`;
    const descr = `<div>Press Escape to toggle chat press plus to toggle menu.</div>`;
    const body = `
            <div class="table">
                <div class="row">Message Cycle Settings
                </div>
                <div class="row">
                    <div class="cell" style="vertical-align:middle">Messages</div>
                    <div class="cell" style="vertical-align:middle"><textarea name="overlay_messages" rows=4 cols=32 style="resize:none"></textarea></div>
                </div>
                <div class="row">
                    <div class="cell" style="vertical-align:middle">Update Message Cycle</div>
                    <div class="cell" style="vertical-align:middle"><input type="button" name="overlay_update_cycle" value="Update"></div>
                </div>
                <br>
                <div class="row">Message Cycle Toggle
                </div>
                <div class="row">
                    <div class="cell" style="vertical-align:middle">Toggle<br><span class="overlay_cycle_toggle_value"><span style="font-size:24px;color:#FF0000";>off</span></span></div>
                    <div class="cell" style="vertical-align:middle"><input type="button" name="overlay_cycle_toggle" value="Toggle"></div>
                </div>
            </div>`;
    const footer = `<div style="font-size:24px;color:red">;-;</div>`;
    const temp = `${title} ${body} ${descr} ${footer}`;
    const d = document.createElement("div");
    d.id = "chatCyclerUI";
    d.innerHTML = temp;
    d.style.zIndex = 999999;
    document.body.appendChild(d);
    const val = document.querySelector('textarea[name="overlay_messages"]');
    val.value = overlay.inputString;
    val.addEventListener('input', function(e) {
        overlay.inputString = e.target.value;
    });
    document.querySelector('input[name="overlay_update_cycle"]').addEventListener('click', function() {
        if (!overlay.inputString){
            overlay.tempMsgs = _msgs;
        }else{
            overlay.tempMsgs = overlay.inputString.split(/\r?\n/);
        }
        msgNum = 0;
        msgs = overlay.tempMsgs;
        saveData();
    });
    document.querySelector('input[name="overlay_cycle_toggle"]').addEventListener('click', function(e) {
        msgCycleSwitch = !msgCycleSwitch;
        if (msgCycleSwitch){
            chat = setInterval(autoChat, 2000);
            document.querySelector('.overlay_cycle_toggle_value').innerHTML = `<span style="font-size:24px;color:#00FF00";>on</span>`;
        }else{
            document.querySelector('.overlay_cycle_toggle_value').innerHTML = `<span style="font-size:24px;color:#FF0000";>off</span>`;
            clearInterval(chat);
            msgNum = 0;
        }
    });
}

function concatBuffers(buffer1, buffer2){
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
}

const four = Uint8Array.from([4]).buffer;

function autoChat(){
    socket && socket.send(msgpack.encode(["ch", [msgs[msgNum]]]));
    msgNum++;
    if (msgNum >= msgs.length) msgNum = 0;
}

function storageAvailable(type){
	try{
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e){
		return false;
	}
}

function saveData(){
    if (storageAvailable('localStorage')){
        localStorage.setItem("msgs", JSON.stringify(msgs));
    }
}

window.addEventListener('keydown', function (event){
    if (overlay.toggle) event.stopImmediatePropagation();
    if (!esc && event.keyCode === 27){ //ESC
        msgCycleSwitch = !msgCycleSwitch;
        if (msgCycleSwitch){
            chat = setInterval(autoChat, 3000);
        }else{
            clearInterval(chat);
            msgNum = 0;
        }
        esc = true;
    }
    if (!home && event.keyCode === overlay.keyCode){ //esc
        overlay.toggle = !overlay.toggle;
        toggleOverlay(overlay.toggle);
        home = true;
    }
});

window.addEventListener('keypress', function (event){
    if (overlay.toggle) event.stopImmediatePropagation();
});

window.addEventListener('keyup', function (event){
    if (overlay.toggle) event.stopImmediatePropagation();
    if (event.keyCode == 27){
        esc = false;
    }else if (event.keyCode == 187){// to toggle chat info and update press '=' equal.
        home = false;
    }
});

// ==UserScript==
// @name           MooMoo.io | ?hat mod?
// @namespace      https://greasyfork.org/users/171308
// @version        ╳D╳Σ╳Δ╳D╳
// @description     〖 HAT MICROS 〗〖 BETTER MINIMAP 〗〖 REMOVING NEEDLESSNESS 〗〖 OTHER IMPROVEMENTS 〗
// @author         Coopdog //credit to FΣΓΔΠΨZΣΓΛΓ
// @match          *.moomoo.io/*
// @match          *://45.77.0.81/*
// @require        http://code.jquery.com/jquery-3.3.1.min.js
// @icon           http://i.imgur.com/EVgFAYg.png
// ==/UserScript==




// http://keycode.info/
// https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

var Zf = [0,0],
    tN = [[12, "Booster Hat"], [16, "Bushido Armor"], [31, "Flipper Hat"], [13, "Medic Gear"], [15, "Winter Cap"], [22, "Emp Helmet"], [26, "Barbarian Armor"], [20, "Samurai Armor"], [40, "Tank Gear"], [7, "Bull Helmet"], [28, "Moo Head"], [29, "Pig Head"], [30, "Fluff Head"], [36, "Pandou Head"], [37, "Bear Head"], [38, "Monkey Head"], [44, "Polar Head"], [35, "Fez Hat"], [42, "Enigma Hat"], [43, "Blitz Hat"], [49, "Bob XIII Hat"], [8, "Bummle Hat"], [2, "Straw Hat"], [5, "Cowboy Hat"], [4, "Ranger Hat"], [18, "Explorer Hat"], [1, "Marksman Cap"], [10, "Bush Gear"], [48, "Halo"], [6, "Soldier Helmet"], [23, "Anti Venom Gear"], [9, "Miners Helmet"], [32, "Musketeer Hat"], [21, "Plague Mask"], [46, "Bull Mask"], [14, "Windmill Hat"], [11, "Spike Gear"], [27, "Scavenger Gear"], [53,"Turret Gear"], [11,"Monkey Tail"]];

function Rt(sE){
    if(Zf[0] === 0){
        storeEquip(tN[sE][0]);
        document.title = tN[sE][1];
        Zf[1] = 90;
        revertTitle();
    } else {
        storeBuy(tN[sE][0]);
        Zf[0] = 0;
        Zf[1] = 180;
        document.title = "WATS up";
        revertTitle();
    }
}

document.addEventListener('keydown', function(kfc) {
    if(!$(':focus').length) {
        switch (kfc.keyCode) {
            case 226,190: Zf[0] = 1; Zf[1] = 300; document.title = "hi...."; kfc.preventDefault(); break;                   // Kupování.... / Buying....   = \ [ < /git > / 226 ] / T [ 84 ]
            case 255: if(Zf[0] === 1){Zf[1] = 120; document.title = "idk....";}  Zf[0] = 0; kfc.preventDefault(); break;  // Nekupování.... / Not Buying = Fn [ Toggle Touchpad / 255 ]
            case 189: storeEquip(45); kfc.preventDefault(); break;     // FΔZΣ / FΔZΣ                         = - [ 27 / 96 ]
            case 16: Rt(0); kfc.preventDefault(); break;              // Booster Hat                          = Shift [ 16 ]
            case 17: Rt(2); kfc.preventDefault(); break;              // Flipper Hat                          = ctrl [ 86 ]
            case 9: Rt(5); kfc.preventDefault(); break;              // Emp Helmet                            = tab [ 9 ]
            case 18: Rt(8); kfc.preventDefault(); break;              // Tank Gear                            = alt [ 18 ]
            case 72: Rt(26); kfc.preventDefault(); break;             // Marksman Cap                         = H [ 72 ]
            case 74: Rt(32); kfc.preventDefault(); break;             // Musketeer Hat                        = J [ 74 ]
            case 73: Rt(4); kfc.preventDefault(); break;              // Winter Cap                           = i [ 73 ]
            case 89: Rt(29); kfc.preventDefault(); break;             // Soldier Helmet                       = y [ 89 ]
            case 90: Rt(38); kfc.preventDefault(); break;             // Turret Gear                          = z [ 90 ]
            case 85: Rt(9); kfc.preventDefault(); break;             // Bull Helmet                           = u [ 85 ]
            case 75: Rt(7); kfc.preventDefault(); break;             // Samurai Armor                         = K [ 99 ]
            case 101: Rt(27); kfc.preventDefault(); break;            // Bush Gear                            = . [ perid / 190 ]
            case 105: Rt(31); kfc.preventDefault(); break;            // Miners Helmet                        = , [ comma / 188 ]
          }
	}
});
//under this they all might not be the same or correct
// CHANGER HATS ║ Free animals ─ f8 [ 220 ] | bears/monkey ─ F9 [ 120 ] | Pig / Cow / Sheep / Bull ─ F10 [ 121 ] | Free ─ f9 [ 220 ] | Animals ─ F6 [ 117 ] | police mod ─ F1 [ 122 ] | All hats ─ BracketLeft [ 220 ]

// Animals Free ─ \ \\

(function() {
    var můjVar;
    var můjVar2;
    var můjVar3;
    var můjVar4;
    var můjVar5;
    var můjVar6;
    var můjVar7;
	var změna = true;
    var ID_FΔZΣ = 45;
    var ID_Moo_Head = 28;
	var ID_Pig_Head = 29;
    var ID_Fluff_Head = 30;
    var ID_Pandou_Head = 36;
    var ID_Bear_Head = 37;
    var ID_Monkey_Head = 38;
    var ID_Polar_Head = 44;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 119) {
			e.preventDefault();
			if (změna) {
            storeEquip(ID_Moo_Head);
            můjVar = setTimeout(function(){ h1(); }, 270);
			} else {
            clearTimeout(můjVar);
            clearTimeout(můjVar2);
            clearTimeout(můjVar3);
            clearTimeout(můjVar4);
            clearTimeout(můjVar5);
            clearTimeout(můjVar6);
            clearTimeout(můjVar7);
            storeEquip(ID_FΔZΣ);
			}
			změna = !změna;
		}
	});

    function h1() {
    storeEquip(ID_Moo_Head);
    clearTimeout(můjVar);
    můjVar2 = setTimeout(function(){ h2(); }, 270);
    }
    function h2() {
    storeEquip(ID_Pig_Head);
    clearTimeout(můjVar2);
    můjVar3 = setTimeout(function(){ h3(); }, 270);
    }
    function h3() {
    storeEquip(ID_Fluff_Head);
    clearTimeout(můjVar3);
    můjVar4 = setTimeout(function(){ h4(); }, 270);
    }
    function h4() {
    storeEquip(ID_Pandou_Head);
    clearTimeout(můjVar4);
    můjVar5 = setTimeout(function(){ h5(); }, 270);
    }
    function h5() {
    storeEquip(ID_Bear_Head);
    clearTimeout(můjVar5);
    můjVar6 = setTimeout(function(){ h6(); }, 270);
    }
    function h6() {
    storeEquip(ID_Monkey_Head);
    clearTimeout(můjVar6);
    můjVar7 = setTimeout(function(){ h7(); }, 270);
    }
    function h7() {
    storeEquip(ID_Polar_Head);
    clearTimeout(můjVar7);
    můjVar = setTimeout(function(){ h1(); }, 270);
    }
})();

// Panda / Medvěd / Opice / Polární Medvěd ─ F9 [ 120 ] \\
// Panda / Bear / Monkey / Polar Bear ─ F9 [ 120 ] \\

(function() {
    var můjVar;
    var můjVar2;
    var můjVar3;
    var můjVar4;
	var změna = true;
    var ID_FΔZΣ = 45;
    var ID_Pandou_Head = 36;
    var ID_Bear_Head = 37;
    var ID_Monkey_Head = 38;
    var ID_Polar_Head = 44;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 120) {
			e.preventDefault();
			if (změna) {
            storeEquip(ID_Pandou_Head);
            můjVar = setTimeout(function(){ h1(); }, 270);
			} else {
            clearTimeout(můjVar);
            clearTimeout(můjVar2);
            clearTimeout(můjVar3);
            clearTimeout(můjVar4);
            storeEquip(ID_FΔZΣ);
			}
			změna = !změna;
		}
	});

    function h1() {
    storeEquip(ID_Pandou_Head);
    clearTimeout(můjVar);
    můjVar2 = setTimeout(function(){ h2(); }, 270);
    }
    function h2() {
    storeEquip(ID_Bear_Head);
    clearTimeout(můjVar2);
    můjVar3 = setTimeout(function(){ h3(); }, 270);
    }
    function h3() {
    storeEquip(ID_Monkey_Head);
    clearTimeout(můjVar3);
    můjVar4 = setTimeout(function(){ h4(); }, 270);
    }
    function h4() {
    storeEquip(ID_Polar_Head);
    clearTimeout(můjVar4);
    můjVar = setTimeout(function(){ h1(); }, 270);
    }
})();

// Pig / Cow / Sheep / Bull ─ F10 [ 121 ] \\

(function() {
    var můjVar;
    var můjVar2;
    var můjVar3;
    var můjVar4;
	var změna = true;
    var ID_FΔZΣ = 45;
    var ID_Moo_Head = 28;
	var ID_Pig_Head = 29;
    var ID_Fluff_Head = 30;
    var ID_Bull_Mask = 46;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 121) {
			e.preventDefault();
			if (změna) {
            storeEquip(ID_Moo_Head);
            můjVar = setTimeout(function(){ h1(); }, 270);
			} else {
            clearTimeout(můjVar);
            clearTimeout(můjVar2);
            clearTimeout(můjVar3);
            clearTimeout(můjVar4);
            storeEquip(ID_FΔZΣ);
			}
			změna = !změna;
		}
	});

    function h1() {
    storeEquip(ID_Moo_Head);
    clearTimeout(můjVar);
    můjVar2 = setTimeout(function(){ h2(); }, 270);
    }
    function h2() {
    storeEquip(ID_Pig_Head);
    clearTimeout(můjVar2);
    můjVar3 = setTimeout(function(){ h3(); }, 270);
    }
    function h3() {
    storeEquip(ID_Fluff_Head);
    clearTimeout(můjVar3);
    můjVar4 = setTimeout(function(){ h4(); }, 270);
    }
    function h4() {
    storeEquip(ID_Bull_Mask);
    clearTimeout(můjVar4);
    můjVar = setTimeout(function(){ h1(); }, 270);
    }
})();

// Zdarma ─ Tab [ 9 ] \\
// Free ─ Tab [ 9 ] \\

(function() {
    var můjVar;
    var můjVar2;
    var můjVar3;
    var můjVar4;
    var můjVar5;
    var můjVar6;
    var můjVar7;
    var můjVar8;
    var můjVar9;
    var můjVar10;
    var můjVar11;
	var změna = true;
    var ID_FΔZΣ = 45;
    var ID_Moo_Head = 28;
	var ID_Pig_Head = 29;
    var ID_Fluff_Head = 30;
    var ID_Pandou_Head = 36;
    var ID_Bear_Head = 37;
    var ID_Monkey_Head = 38;
    var ID_Polar_Head = 44;
    var ID_Fez_Hat = 35;
    var ID_Enigma_Hat = 42;
    var ID_Blitz_Hat = 43;
    var ID_Bob_XIII_Hat = 49;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 220) {
			e.preventDefault();
			if (změna) {
            storeEquip(ID_Moo_Head);
            můjVar = setTimeout(function(){ h1(); }, 180);
			} else {
            clearTimeout(můjVar);
            clearTimeout(můjVar2);
            clearTimeout(můjVar3);
            clearTimeout(můjVar4);
            clearTimeout(můjVar5);
            clearTimeout(můjVar6);
            clearTimeout(můjVar7);
            clearTimeout(můjVar8);
            clearTimeout(můjVar9);
            clearTimeout(můjVar10);
            clearTimeout(můjVar11);
            storeEquip(ID_FΔZΣ);
			}
			změna = !změna;
		}
	});

    function h1() {
    storeEquip(ID_Moo_Head);
    clearTimeout(můjVar);
    můjVar2 = setTimeout(function(){ h2(); }, 180);
    }
    function h2() {
    storeEquip(ID_Pig_Head);
    clearTimeout(můjVar2);
    můjVar3 = setTimeout(function(){ h3(); }, 180);
    }
    function h3() {
    storeEquip(ID_Fluff_Head);
    clearTimeout(můjVar3);
    můjVar4 = setTimeout(function(){ h4(); }, 180);
    }
    function h4() {
    storeEquip(ID_Pandou_Head);
    clearTimeout(můjVar4);
    můjVar5 = setTimeout(function(){ h5(); }, 180);
    }
    function h5() {
    storeEquip(ID_Bear_Head);
    clearTimeout(můjVar5);
    můjVar6 = setTimeout(function(){ h6(); }, 180);
    }
    function h6() {
    storeEquip(ID_Monkey_Head);
    clearTimeout(můjVar6);
    můjVar7 = setTimeout(function(){ h7(); }, 180);
    }
    function h7() {
    storeEquip(ID_Polar_Head);
    clearTimeout(můjVar7);
    můjVar8 = setTimeout(function(){ h8(); }, 180);
    }
    function h8() {
    storeEquip(ID_Fez_Hat);
    clearTimeout(můjVar8);
    můjVar9 = setTimeout(function(){ h9(); }, 180);
    }
    function h9() {
    storeEquip(ID_Enigma_Hat);
    clearTimeout(můjVar9);
    můjVar10 = setTimeout(function(){ h10(); }, 180);
    }
    function h10() {
    storeEquip(ID_Blitz_Hat);
    clearTimeout(můjVar10);
    můjVar11 = setTimeout(function(){ h11(); }, 180);
    }
    function h11() {
    storeEquip(ID_Bob_XIII_Hat);
    clearTimeout(můjVar11);
    můjVar = setTimeout(function(){ h1(); }, 180);
    }
})();

// Zvířata ─ F6 [ 117 ] \\
// Animals ─ F6 [ 117 ] \\

(function() {
    var můjVar;
    var můjVar2;
    var můjVar3;
    var můjVar4;
    var můjVar5;
    var můjVar6;
    var můjVar7;
    var můjVar8;
    var můjVar9;
	var změna = true;
    var ID_FΔZΣ = 45;
    var ID_Moo_Head = 28;
	var ID_Pig_Head = 29;
    var ID_Fluff_Head = 30;
    var ID_Pandou_Head = 36;
    var ID_Bear_Head = 37;
    var ID_Monkey_Head = 38;
    var ID_Polar_Head = 44;
    var ID_Flipper_Hat = 31;
    var ID_Bull_Mask = 46;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 117) {
			e.preventDefault();
			if (změna) {
            storeEquip(ID_Moo_Head);
            můjVar = setTimeout(function(){ h1(); }, 270);
			} else {
            clearTimeout(můjVar);
            clearTimeout(můjVar2);
            clearTimeout(můjVar3);
            clearTimeout(můjVar4);
            clearTimeout(můjVar5);
            clearTimeout(můjVar6);
            clearTimeout(můjVar7);
            clearTimeout(můjVar8);
            clearTimeout(můjVar9);
            storeEquip(ID_FΔZΣ);
			}
			změna = !změna;
		}
	});

    function h1() {
    storeEquip(ID_Moo_Head);
    clearTimeout(můjVar);
    můjVar2 = setTimeout(function(){ h2(); }, 270);
    }
    function h2() {
    storeEquip(ID_Pig_Head);
    clearTimeout(můjVar2);
    můjVar3 = setTimeout(function(){ h3(); }, 270);
    }
    function h3() {
    storeEquip(ID_Fluff_Head);
    clearTimeout(můjVar3);
    můjVar4 = setTimeout(function(){ h4(); }, 270);
    }
    function h4() {
    storeEquip(ID_Pandou_Head);
    clearTimeout(můjVar4);
    můjVar5 = setTimeout(function(){ h5(); }, 270);
    }
    function h5() {
    storeEquip(ID_Bear_Head);
    clearTimeout(můjVar5);
    můjVar6 = setTimeout(function(){ h6(); }, 270);
    }
    function h6() {
    storeEquip(ID_Monkey_Head);
    clearTimeout(můjVar6);
    můjVar7 = setTimeout(function(){ h7(); }, 270);
    }
    function h7() {
    storeEquip(ID_Polar_Head);
    clearTimeout(můjVar7);
    můjVar8 = setTimeout(function(){ h8(); }, 270);
    }
    function h8() {
    storeEquip(ID_Flipper_Hat);
    clearTimeout(můjVar8);
    můjVar9 = setTimeout(function(){ h9(); }, 270);
    }
    function h9() {
    storeEquip(ID_Bull_Mask);
    clearTimeout(můjVar9);
    můjVar = setTimeout(function(){ h1(); }, 270);
    }
})();

// Červená / Modrá ─ F1 [ 112 ] \\
// Red / Blue ─ F1 [ 112 ] \\

(function() {
    var můjVar;
    var můjVar2;
	var změna = true;
	var ID_Bummle_Hat = 8;
    var ID_FΔZΣ = 45;
	var ID_Winter_Cap = 15;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 221) {
			e.preventDefault();
			if (změna) {
            storeEquip(ID_Bummle_Hat);
            můjVar = setTimeout(function(){ h1(); }, 125);
			} else {
            clearTimeout(můjVar);
            clearTimeout(můjVar2);
            storeEquip(ID_FΔZΣ);
			}
			změna = !změna;
		}
	});

    function h1() {
    storeEquip(ID_Bummle_Hat);
    clearTimeout(můjVar);
    můjVar2 = setTimeout(function(){ h2(); }, 125);
    }
    function h2() {
    storeEquip(ID_Winter_Cap);
    clearTimeout(můjVar2);
    můjVar = setTimeout(function(){ h1(); }, 125);
    }
})();

// Všechny Postupně ─ F3 [ 114 ] \\
// All Gradually ─ F3 [ 114 ] \\

(function() {
    var můjVar;
    var můjVar2;
    var můjVar3;
    var můjVar4;
    var můjVar5;
    var můjVar6;
    var můjVar7;
    var můjVar8;
    var můjVar9;
    var můjVar10;
    var můjVar11;
    var můjVar12;
    var můjVar13;
    var můjVar14;
    var můjVar15;
    var můjVar16;
    var můjVar17;
    var můjVar18;
    var můjVar19;
    var můjVar20;
    var můjVar21;
    var můjVar22;
    var můjVar23;
    var můjVar24;
    var můjVar25;
    var můjVar26;
    var můjVar27;
    var můjVar28;
    var můjVar29;
    var můjVar30;
    var můjVar31;
    var můjVar32;
    var můjVar33;
    var můjVar34;
    var můjVar35;
    var můjVar36;
    var můjVar37;
    var můjVar38;
    var můjVar39;
	var změna = true;
    var ID_FΔZΣ = 45;
	var ID_Moo_Head = 28;
	var ID_Pig_Head = 29;
    var ID_Fluff_Head = 30;
    var ID_Pandou_Head = 36;
    var ID_Bear_Head = 37;
    var ID_Monkey_Head = 38;
    var ID_Polar_Head = 44;
	var ID_Fez_Hat = 35;
	var ID_Enigma_Hat = 42;
	var ID_Blitz_Hat = 43;
	var ID_Bob_XIII_Hat = 49;
	var ID_Bummle_Hat = 8;
	var ID_Straw_Hat = 2;
	var ID_Winter_Cap = 15;
	var ID_Cowboy_Hat = 5;
	var ID_Ranger_Hat = 4;
	var ID_Explorer_Hat = 18;
	var ID_Flipper_Hat = 31;
	var ID_Marksman_Cap = 1;
	var ID_Bush_Gear = 10;
    var ID_Halo = 48;
	var ID_Soldier_Helmet = 6;
	var ID_Anti_Venom_Gear = 23;
	var ID_Medic_Gear = 13;
	var ID_Miners_Helmet = 9;
	var ID_Musketeer_Hat = 32;
	var ID_Bull_Helmet = 7;
    var ID_Emp_Helmet = 22;
    var ID_Booster_Hat = 12;
    var ID_Barbarian_Armor = 26;
    var ID_Plague_Mask = 21;
    var ID_Bull_Mask = 46;
    var ID_Windmill_Hat = 14;
    var ID_Spike_Gear = 11;
    var ID_Samurai_Armor = 20;
    var ID_Bushido_Armor = 16;
    var ID_Scavenger_Gear = 27;
    var ID_Tank_Gear = 40;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 219) {
			e.preventDefault();
			if (změna) {
            storeEquip(ID_FΔZΣ);
            můjVar = setTimeout(function(){ h1(); }, 75);
			} else {
            clearTimeout(můjVar);
            clearTimeout(můjVar2);
            clearTimeout(můjVar3);
            clearTimeout(můjVar4);
            clearTimeout(můjVar5);
            clearTimeout(můjVar6);
            clearTimeout(můjVar7);
            clearTimeout(můjVar8);
            clearTimeout(můjVar9);
            clearTimeout(můjVar10);
            clearTimeout(můjVar11);
            clearTimeout(můjVar12);
            clearTimeout(můjVar13);
            clearTimeout(můjVar14);
            clearTimeout(můjVar15);
            clearTimeout(můjVar16);
            clearTimeout(můjVar17);
            clearTimeout(můjVar18);
            clearTimeout(můjVar19);
            clearTimeout(můjVar20);
            clearTimeout(můjVar21);
            clearTimeout(můjVar22);
            clearTimeout(můjVar23);
            clearTimeout(můjVar24);
            clearTimeout(můjVar25);
            clearTimeout(můjVar26);
            clearTimeout(můjVar27);
            clearTimeout(můjVar28);
            clearTimeout(můjVar29);
            clearTimeout(můjVar30);
            clearTimeout(můjVar31);
            clearTimeout(můjVar32);
            clearTimeout(můjVar33);
            clearTimeout(můjVar34);
            clearTimeout(můjVar35);
            clearTimeout(můjVar36);
            clearTimeout(můjVar37);
            clearTimeout(můjVar38);
            clearTimeout(můjVar39);
            storeEquip(ID_FΔZΣ);
			}
			změna = !změna;
		}
	});

    function h1() {
    storeEquip(ID_FΔZΣ);
    clearTimeout(můjVar);
    můjVar2 = setTimeout(function(){ h2(); }, 75);
    }
    function h2() {
    storeEquip(ID_Moo_Head);
    clearTimeout(můjVar2);
    můjVar3 = setTimeout(function(){ h3(); }, 75);
    }
    function h3() {
    storeEquip(ID_Pig_Head);
    clearTimeout(můjVar3);
    můjVar4 = setTimeout(function(){ h4(); }, 75);
    }
    function h4() {
    storeEquip(ID_Fluff_Head);
    clearTimeout(můjVar4);
    můjVar5 = setTimeout(function(){ h5(); }, 75);
    }
    function h5() {
    storeEquip(ID_Pandou_Head);
    clearTimeout(můjVar5);
    můjVar6 = setTimeout(function(){ h6(); }, 75);
    }
    function h6() {
    storeEquip(ID_Bear_Head);
    clearTimeout(můjVar6);
    můjVar7 = setTimeout(function(){ h7(); }, 75);
    }
    function h7() {
    storeEquip(ID_Monkey_Head);
    clearTimeout(můjVar7);
    můjVar8 = setTimeout(function(){ h8(); }, 75);
    }
    function h8() {
    storeEquip(ID_Polar_Head);
    clearTimeout(můjVar8);
    můjVar9 = setTimeout(function(){ h9(); }, 75);
    }
    function h9() {
    storeEquip(ID_Fez_Hat);
    clearTimeout(můjVar9);
    můjVar10 = setTimeout(function(){ h10(); }, 75);
    }
    function h10() {
    storeEquip(ID_Enigma_Hat);
    clearTimeout(můjVar10);
    můjVar11 = setTimeout(function(){ h11(); }, 75);
    }
    function h11() {
    storeEquip(ID_Blitz_Hat);
    clearTimeout(můjVar11);
    můjVar12 = setTimeout(function(){ h12(); }, 75);
    }
    function h12() {
    storeEquip(ID_Bob_XIII_Hat);
    clearTimeout(můjVar12);
    můjVar13 = setTimeout(function(){ h13(); }, 75);
    }
    function h13() {
    storeEquip(ID_Bummle_Hat);
    clearTimeout(můjVar13);
    můjVar14 = setTimeout(function(){ h14(); }, 75);
    }
    function h14() {
    storeEquip(ID_Straw_Hat);
    clearTimeout(můjVar14);
    můjVar15 = setTimeout(function(){ h15(); }, 75);
    }
    function h15() {
    storeEquip(ID_Winter_Cap);
    clearTimeout(můjVar15);
    můjVar16 = setTimeout(function(){ h16(); }, 75);
    }
    function h16() {
    storeEquip(ID_Cowboy_Hat);
    clearTimeout(můjVar16);
    můjVar17 = setTimeout(function(){ h17(); }, 75);
    }
    function h17() {
    storeEquip(ID_Ranger_Hat);
    clearTimeout(můjVar17);
    můjVar18 = setTimeout(function(){ h18(); }, 75);
    }
    function h18() {
    storeEquip(ID_Explorer_Hat);
    clearTimeout(můjVar18);
    můjVar19 = setTimeout(function(){ h19(); }, 75);
    }
    function h19() {
    storeEquip(ID_Flipper_Hat);
    clearTimeout(můjVar19);
    můjVar20 = setTimeout(function(){ h20(); }, 75);
    }
    function h20() {
    storeEquip(ID_Marksman_Cap);
    clearTimeout(můjVar20);
    můjVar21 = setTimeout(function(){ h21(); }, 75);
    }
    function h21() {
    storeEquip(ID_Bush_Gear);
    clearTimeout(můjVar21);
    můjVar22 = setTimeout(function(){ h22(); }, 75);
    }
    function h22() {
    storeEquip(ID_Halo);
    clearTimeout(můjVar22);
    můjVar23 = setTimeout(function(){ h23(); }, 75);
    }
    function h23() {
    storeEquip(ID_Soldier_Helmet);
    clearTimeout(můjVar23);
    můjVar24 = setTimeout(function(){ h24(); }, 75);
    }
    function h24() {
    storeEquip(ID_Anti_Venom_Gear);
    clearTimeout(můjVar24);
    můjVar25 = setTimeout(function(){ h25(); }, 75);
    }
    function h25() {
    storeEquip(ID_Medic_Gear);
    clearTimeout(můjVar25);
    můjVar26 = setTimeout(function(){ h26(); }, 75);
    }
    function h26() {
    storeEquip(ID_Miners_Helmet);
    clearTimeout(můjVar26);
    můjVar27 = setTimeout(function(){ h27(); }, 75);
    }
    function h27() {
    storeEquip(ID_Musketeer_Hat);
    clearTimeout(můjVar27);
    můjVar28 = setTimeout(function(){ h28(); }, 75);
    }
    function h28() {
    storeEquip(ID_Bull_Helmet);
    clearTimeout(můjVar28);
    můjVar29 = setTimeout(function(){ h29(); }, 75);
    }
    function h29() {
    storeEquip(ID_Emp_Helmet);
    clearTimeout(můjVar29);
    můjVar30 = setTimeout(function(){ h30(); }, 75);
    }
    function h30() {
    storeEquip(ID_Booster_Hat);
    clearTimeout(můjVar30);
    můjVar31 = setTimeout(function(){ h31(); }, 75);
    }
    function h31() {
    storeEquip(ID_Barbarian_Armor);
    clearTimeout(můjVar31);
    můjVar32 = setTimeout(function(){ h32(); }, 75);
    }
    function h32() {
    storeEquip(ID_Plague_Mask);
    clearTimeout(můjVar32);
    můjVar33 = setTimeout(function(){ h33(); }, 75);
    }
    function h33() {
    storeEquip(ID_Bull_Mask);
    clearTimeout(můjVar33);
    můjVar34 = setTimeout(function(){ h34(); }, 75);
    }
    function h34() {
    storeEquip(ID_Windmill_Hat);
    clearTimeout(můjVar34);
    můjVar35 = setTimeout(function(){ h35(); }, 75);
    }
    function h35() {
    storeEquip(ID_Spike_Gear);
    clearTimeout(můjVar35);
    můjVar36 = setTimeout(function(){ h36(); }, 75);
    }
    function h36() {
    storeEquip(ID_Samurai_Armor);
    clearTimeout(můjVar36);
    můjVar37 = setTimeout(function(){ h37(); }, 75);
    }
    function h37() {
    storeEquip(ID_Bushido_Armor);
    clearTimeout(můjVar37);
    můjVar38 = setTimeout(function(){ h38(); }, 75);
    }
    function h38() {
    storeEquip(ID_Scavenger_Gear);
    clearTimeout(můjVar38);
    můjVar39 = setTimeout(function(){ h39(); }, 75);
    }
    function h39() {
    storeEquip(ID_Tank_Gear);
    clearTimeout(můjVar39);
    můjVar = setTimeout(function(){ h1(); }, 75);
    }
})();

// ? ─ Windows Menu [ Right ⌘ / 93 ] \\
// ? ─ Windows Menu [ Right ⌘ / 93 ] \\

(function() {
    var můjVar;
    var můjVar2;
    var můjVar3;
    var můjVar4;
    var můjVar5;
    var můjVar6;
    var můjVar7;
    var můjVar8;
    var můjVar9;
    var můjVar10;
    var můjVar11;
	var změna = true;
    var ID_0_0_0_0_0_0 = 0;
    var ID_17_17_17_17 = 17;
    var ID_24_24_24_24 = 24;
    var ID_33_33_33_33 = 33;
    var ID_34_34_34_34 = 34;
    var ID_39_39_39_39 = 39;
    var ID_41_41_41_41 = 41;
    var ID_45_45_45_45 = 45;
    var ID_47_47_47_47 = 47;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 93) {
			e.preventDefault();
			if (změna) {
            storeEquip(ID_0_0_0_0_0_0);
            můjVar = setTimeout(function(){ h1(); }, 180);
			} else {
            clearTimeout(můjVar);
            clearTimeout(můjVar2);
            clearTimeout(můjVar3);
            clearTimeout(můjVar4);
            clearTimeout(můjVar5);
            clearTimeout(můjVar6);
            clearTimeout(můjVar7);
            clearTimeout(můjVar8);
            clearTimeout(můjVar9);
            storeEquip(ID_0_0_0_0_0_0);
			}
			změna = !změna;
		}
	});

    function h1() {
    storeEquip(ID_0_0_0_0_0_0);
    clearTimeout(můjVar);
    můjVar2 = setTimeout(function(){ h2(); }, 180);
    }
    function h2() {
    storeEquip(ID_17_17_17_17);
    clearTimeout(můjVar2);
    můjVar3 = setTimeout(function(){ h3(); }, 180);
    }
    function h3() {
    storeEquip(ID_24_24_24_24);
    clearTimeout(můjVar3);
    můjVar4 = setTimeout(function(){ h4(); }, 180);
    }
    function h4() {
    storeEquip(ID_33_33_33_33);
    clearTimeout(můjVar4);
    můjVar5 = setTimeout(function(){ h5(); }, 180);
    }
    function h5() {
    storeEquip(ID_34_34_34_34);
    clearTimeout(můjVar5);
    můjVar6 = setTimeout(function(){ h6(); }, 180);
    }
    function h6() {
    storeEquip(ID_39_39_39_39);
    clearTimeout(můjVar6);
    můjVar7 = setTimeout(function(){ h7(); }, 180);
    }
    function h7() {
    storeEquip(ID_41_41_41_41);
    clearTimeout(můjVar7);
    můjVar8 = setTimeout(function(){ h8(); }, 180);
    }
    function h8() {
    storeEquip(ID_45_45_45_45);
    clearTimeout(můjVar8);
    můjVar9 = setTimeout(function(){ h9(); }, 180);
    }
    function h9() {
    storeEquip(ID_47_47_47_47);
    clearTimeout(můjVar9);
    můjVar10 = setTimeout(function(){ h10(); }, 180);
    }
})();

(function() {
    var můjVar;
    var můjVar2;
	var změna = true;
	var ID_Bull_Helmet = 7;
    var ID_FΔZΣ = 45;
	var ID_Medic_Gear = 13;

	document.addEventListener('keydown', function (e) { //numpad one for bullhel, and med gear
		if (e.keyCode == 97) {
			e.preventDefault();
			if (změna) {
            storeEquip(ID_Bull_Helmet);
            můjVar = setTimeout(function(){ h1(); }, 42);
			} else {
            clearTimeout(můjVar);
            clearTimeout(můjVar2);
            storeEquip(ID_FΔZΣ);
			}
			změna = !změna;
		}
	});

    function h1() {
    storeEquip(ID_Bull_Helmet);
    clearTimeout(můjVar);
    můjVar2 = setTimeout(function(){ h2(); }, 42);
    }
    function h2() {
    storeEquip(ID_Medic_Gear);
    clearTimeout(můjVar2);
    můjVar = setTimeout(function(){ h1(); }, 42);
    }
})();

(function() {    // comma for bull helm and Samurai_Armor hat cycle
    var můjVar;
    var můjVar2;
	var změna = true;
	var ID_Bull_Helmet = 7;
    var ID_FΔZΣ = 45;
	var ID_Samurai_Armor = 20;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 188) {
			e.preventDefault();
			if (změna) {
            storeEquip(ID_Samurai_Armor);
            můjVar = setTimeout(function(){ h1(); },42);
			} else {
            clearTimeout(můjVar);
            clearTimeout(můjVar2);
            storeEquip(ID_FΔZΣ);
			}
			změna = !změna;
		}
	});

    function h1() {
    storeEquip(ID_Bull_Helmet);
    clearTimeout(můjVar);
    můjVar2 = setTimeout(function(){ h2(); }, 42);
    }
    function h2() {
    storeEquip(ID_Samurai_Armor);
    clearTimeout(můjVar2);
    můjVar = setTimeout(function(){ h1(); }, 42);
    }
})();

(function() { //devel or angle who knows (Backquote)
    var můjVar;
    var můjVar2;
	var změna = true;
	var ID_Bushido_Armor = 16;
    var ID_FΔZΣ = 45;
	var ID_Halo = 48;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 192) {
			e.preventDefault();
			if (změna) {
            storeEquip(ID_Halo);
            můjVar = setTimeout(function(){ h1(); }, 80);
			} else {
            clearTimeout(můjVar);
            clearTimeout(můjVar2);
            storeEquip(ID_FΔZΣ);
			}
			změna = !změna;
		}
	});

    function h1() {
    storeEquip(ID_Bushido_Armor);
    clearTimeout(můjVar);
    můjVar2 = setTimeout(function(){ h2(); }, 80);
    }
    function h2() {
    storeEquip(ID_Halo);
    clearTimeout(můjVar2);
    můjVar = setTimeout(function(){ h1(); }, 80);
    }
})();

(function() {  // (numpad 2) hat cycle Soldier Helmet Bull Helmet
    var můjVar;
    var můjVar2;
	var změna = true;
	var ID_Soldier_Helmet = 6;
    var ID_FΔZΣ = 45;
	var ID_Bull_Helmet = 7;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 98) {
			e.preventDefault();
			if (změna) {
            storeEquip(ID_Soldier_Helmet);
            můjVar = setTimeout(function(){ h1(); }, 42);
			} else {
            clearTimeout(můjVar);
            clearTimeout(můjVar2);
            storeEquip(ID_FΔZΣ);
			}
			změna = !změna;
		}
	});

    function h1() {
    storeEquip(ID_Soldier_Helmet);
    clearTimeout(můjVar);
    můjVar2 = setTimeout(function(){ h2(); }, 42);
    }
    function h2() {
    storeEquip(ID_Bull_Helmet);
    clearTimeout(můjVar2);
    můjVar = setTimeout(function(){ h1(); }, 42);
    }

})();
(function() { //ultimite marksman musketeer and marksman cap (numpad 3)
    var můjVar;
    var můjVar2;
	var změna = true;
	var ID_Musketeer_Hat = 1;
    var ID_FΔZΣ = 45;
	var ID_Marksman_Cap = 32;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 99) {
			e.preventDefault();
			if (změna) {
            storeEquip(ID_Marksman_Cap);
            můjVar = setTimeout(function(){ h1(); }, 42);
			} else {
            clearTimeout(můjVar);
            clearTimeout(můjVar2);
            storeEquip(ID_FΔZΣ);
			}
			změna = !změna;
		}
	});

    function h1() {
    storeEquip(ID_Musketeer_Hat);
    clearTimeout(můjVar);
    můjVar2 = setTimeout(function(){ h2(); }, 37);
    }
    function h2() {
    storeEquip(ID_Marksman_Cap);
    clearTimeout(můjVar2);
    můjVar = setTimeout(function(){ h1(); }, 37);
    }
})();