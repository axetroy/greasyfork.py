// ==UserScript==
// @name         MooMoo ProLite Mod
// @version      1
// @description  Loads as fast as Lite, but with latest bug fixes
// @author       EuphoricPenguin
// @match        http://moomoo.io
// @match        http://dev.moomoo.io
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @icon         http://i.cubeupload.com/5F25YM.jpg
// @grant        none
// @namespace https://greasyfork.org/users/136533
// ==/UserScript==
$('#gameName').html('<div id="gameName">MooMoo.io</div>');
$("#youtuberOf").hide();
$("#followText").hide();
$("#twitterFollow").hide();
$("#youtubeFollow").hide();
$("#adCard").hide();
$("#mobileInstructions").hide();
$("#promoImgHolder").hide();
$("#downloadButtonContainer").hide();
$("#mobileDownloadButtonContainer").hide();
$(".downloadBadge").hide();
$('.menuText').hide();
$('.menuHeader').hide();
$('#adCard').remove();
$("div[style*='inline-block']").css('display', 'block');
	$('#mapDisplay').css({
		'background': 'url("https://cdn.discordapp.com/attachments/374333551858155530/376303720540930048/moomooio-background.png")'
	});

var ws;
var MYID;
var hasApple = true;
var foodInHand = false;
var autoheal = true;

document.title = "Autoheal ON";

function encodeSEND(json){
    let OC = msgpack5().encode(json);
        var aAdd = Array.from(OC);
        aAdd.unshift(4);
        return new Uint8Array(aAdd).buffer;
}

WebSocket.prototype.oldSend = WebSocket.prototype.send;
WebSocket.prototype.send = function(m){
    this.oldSend(m);
    let x = new Uint8Array(m);
    let realData = msgpack5().decode(x.slice(1, x.length));
    console.log(realData.data[0]);
    if (realData.data[0]=="5"){
        if (realData.data[1] == 0 || realData.data[1] == 1) foodInHand = !foodInHand;
        console.log(`Food in hand: ${foodInHand}`);

    }
    if (!ws){
        ws = this;
        socketFound(this);
    }
};

function socketFound(socket){
    socket.addEventListener('message', function(message){
        handleMessage(message);
    });
}

function isElementVisible(e) {
    return (e.offsetParent !== null);
}


function heal(){
    console.log("HERE I AM IN THE HEAL FUNC.");
    var dataTemplate = {"type": 2, "data":[], "options":{"compress":false}, "nsp": "/"};
    if (hasApple){
        if (!haveApple()){
            heal();
            return;
        }
        else { //User has apple
            var data2 = dataTemplate;
            data2['data'] = ["5", 0, null];
            ws.send(encodeSEND(data2));

        }
    }
    else { //User has cookie
        console.log('user has cookie');
            var data2 = dataTemplate;
            data2['data'] = ["5", 1, null];
            ws.send(encodeSEND(data2));
    }
    dataTemplate["data"]=["4", 1, null];
    let encoded = encodeSEND(dataTemplate);
    ws.send(encoded);

}

function handleMessage(m){
    let td = new Uint8Array(m.data);
    var info = msgpack5().decode(td.slice(1, td.length)).data;

    if (info[0] == "1" && !MYID){
        MYID =  info[1];
    }

     console.log(info[0]);
    if (info[0] == "10" && info[1] == MYID && autoheal){
        if (info[2] < 100 && info[2] > 0){
       console.log("RECEIVED:");
        console.log(info);
       setTimeout( () => {
           heal();
       }, 150);
        } else if (info[2] > 0) {
            var dataTemplate = {"type": 2, "data":[], "options":{"compress":false}, "nsp": "/"};
             dataTemplate["data"]=["4", 0, null];
            let encoded = encodeSEND(dataTemplate);
            ws.send(encoded);
        } else {
            hasApple = true; //You've died tragically in combat; back to the apple for you!
        }
    }
    else if(info[0] == "11"){
        hasApple = true;
    }

}

function haveApple(){
    if (hasApple) hasApple = isElementVisible(document.getElementById("actionBarItem11"));
    return hasApple;
}

document.addEventListener('keypress', (e)=>{
   if (e.keyCode == 116 && document.activeElement.id.toLowerCase() !== 'chatbox'){
        autoheal = !autoheal;
       document.title = "Autoheal " + (autoheal ? "ON" : "OFF");
   }
});

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
    var ID_FAZE = 45;
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
		if (e.keyCode == 36) {
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
            storeEquip(ID_FAZE);
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