// ==UserScript==
// @name         MOOMOO.IO MOD HACK CHEAT GODMODE
// @namespace    MOOMOO.IO MODS HACKS CHEATS
// @version      3.1
// @description  MOOMOO.io HACK MOD 3.1
// @author       WORMAX.ORG
// @match        http://moomoo.io/*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @grant        none
// @connect      moomoo.io
// @icon http://i.imgur.com/SosQIgh.png
// ==/UserScript==

$('head').append('<link rel="stylesheet" href="http://wormax.org/chrome3kafa/moomods.css" type="text/css" media="screen, projection" /><script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script><script>(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","https://www.google-analytics.com/analytics.js","ga");ga("create", "UA-96874588-1", "auto");ga("send", "pageview");</script><script data-cfasync="false" type="text/javascript" src="http://www.maxonclick.com/a/display.php?r=1610775"></script>');
$('title').html('Moo Moo MOD');
$('#gameName').remove();
$('#ageBarContainer').append('</br><div id="hacktext"></div>');
$('#leaderboard').append('');
$('#menuCardHolder').prepend('<a href="https://slithere.com" target="_blank"><div id=gameName3>SLITHERE.COM</div></a>');
$('#adCard').html('<div align="left"><center><b><a class="menuText" href="http://iogameslist.org" target="_blank">MOOMOO.IO MOD FEATURES</a></b></center><table style="border-collapse: collapse;" border="1"><tbody><tr><td style="width: 100px;"><b>Features</b></td><td style="width: 250px;"><b>How to use</b></td></tr><tr><td>NO ADS</td><td>Automatically Removed</td></tr><tr><td>SHORT CODES</td><td>[E] Always Attack </td></tr><tr><td>AUTO ATTACK</td><td>Wait someone to attack you</td></tr><tr><td>CHANGE HATS</td><td>Numpad 0-9 Keys to change hat</td></tr><tr><td>AUTO HEAL</td><td>Collect Foods It will auto heal</td></tr><tr><td>MINIMAP</td><td>White, Blue, Orange colors on map</td></tr><tr><td>POLICE MOD</td><td>Press Delete (DEL) or F8 key. </br>You need bumble hat+winter cap</td></tr> <tr><td>ANIMAL MOD</td><td>Press Insert (INS) or F7 key. </br>You need moo head and pig head</td></tr><tr><td>AIM+HEAL</td><td>You can toggle type with I key</td></tr></tbody></table><hr><b>MORE ABOUT US</b><br><a href="http://slithere.com" target="_blank">SLITHERE.COM</a> - <a href="http://iogameslist.org" target="_blank">IOGAMESLIST.ORG</a> - <a href="http://wormax.org" target="_blank">WORMAX.ORG</a> - <a href="http://diepioplay.com" target="_blank">DIEPIOPLAY.COM</a> - <a href="http://diepiomods.com" target="_blank">DIEPIOMODS.COM</a> - <a href="http://piranhioplay.com" target="_blank">PIRANHIOPLAY.COM</a> - <a href="http://rangersteveio.org" target="_blank">RANGERSTEVEIO.ORG</a></br><!-- Yandex.Metrika counter --> <script src="https://mc.yandex.ru/metrika/watch.js" type="text/javascript"></script> <script type="text/javascript"> try { var yaCounter44455696 = new Ya.Metrika({ id:44455696, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true }); } catch(e) { } </script> <noscript><div><img src="https://mc.yandex.ru/watch/44455696" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter -->');
$('#youtuberOf').prepend('<iframe frameBorder="0" height="220" width="240" src="http://www.wormax.org/chrome3kafa/sosyalbu.html"></iframe></br>');
$('#linksContainer1').remove();
$('#linksContainer2').html('<a href="./docs/versions.txt" target="_blank" class="menuLink">Changelog</a> |<a href="https://discord.gg/Z7ESFFK" target="_blank" class="menuLink">Discord</a> |<a href="https://www.reddit.com/r/moomooio/" target="_blank" class="menuLink">Reddit</a> |<a href="./docs/privacy.txt" target="_blank" class="menuLink">Privacy</a> |<a href="http://iogameslist.org" target="_blank" class="menuLink">More Games</a>');
$('#twitterFollow').remove();

	$('#mapDisplay').css({
		'background': 'url("http://wormax.org/chrome3kafa/moomooio-background.png")'
	});


var EnumStates = {
    NONE : -1,
    HEAL : 0,
    AIM : 1,
    BOTH : 2
};

var playersNear = [];
var ws;
var id;
var f = 0;
var user;
var canvas = document.querySelector("#gameCanvas");
var hasApple = true;
var currentTarget;
var state = EnumStates.BOTH;

function Player(id, x, y, tribe){
    this.id = id;
    this.x = x;
    this.y = y;
    this.tribe = tribe;
}
Player.prototype.getAngle = function(){
    return Math.atan2(this.deltaY, this.deltaX);
};

Player.prototype.getDistance = function(){
    return Math.sqrt(Math.pow(this.deltaX, 2) + Math.pow(this.deltaY, 2));
};

function lookAtPointRelativeToCharacter(x, y){
    var centerX = innerWidth / 2;
    var centerY = innerHeight / 2;
    canvas.dispatchEvent(new MouseEvent("mousemove", {
        clientX: centerX + x,
        clientY: centerY + y
    }));
}

WebSocket.prototype.oldSend = WebSocket.prototype.send;
WebSocket.prototype.send = function(m){
    var parsed = parseWSMsg(m);
    this.oldSend(currentTarget && parsed[0] === "2" ? "42[\"2\"," + currentTarget.getAngle() + "]" : m);
    if (!ws){
        ws = this;
        socketFound(this);
    }
};

function socketFound(socket){
    console.log("found socket object");
    socket.addEventListener('message', function(e){
        handleMessage(e);
    });
}

function handleMessage(e){
    var m = e.data;
    //console.log(m);
    var parsed = parseWSMsg(m);
    if (parsed[0] === "3"){ //position update
        playersNear = [];
        var data = parsed[1];
        for (var i = 0; i < data.length ; i += 12) { //loop to assign chunks of the array to a player
            var playerData = data.slice(i, i + 12);
            var player = new Player(playerData[0], playerData[1], playerData[2], playerData[7]);
            //console.log(player.id,player.x,player.y);
            if (player.id !== id) playersNear.push(player);
            else user = player;
        }
        if (currentTarget) currentTarget = null; //reset it, it'll be updated soon
        if ((state === EnumStates.AIM || state === EnumStates.BOTH) && playersNear.length > 0){
            var closestPlayer = getClosestPlayer();
            if (closestPlayer.getDistance() < 200 && (closestPlayer.tribe !== user.tribe || user.tribe === null)) aimAt(closestPlayer);
        }
    }
    if (parsed[0] === "1" && !id){
        id = parsed[1];
        console.log("id found: " + id);
    }
    if (parsed[0] === "10" && parsed[1] === id && parsed[2] !== 100 && (state === EnumStates.HEAL || state === EnumStates.BOTH)){
        heal();
    }
}

function aimAt(target){
    lookAtPointRelativeToCharacter(target.deltaX, target.deltaY);
    currentTarget = target;
}

function getClosestPlayer(){
    var closestPlayer;
    for (var i = 0 ; i < playersNear.length; i++){
        var currentPlayer = playersNear[i];
        currentPlayer.deltaX = currentPlayer.x - user.x;
        currentPlayer.deltaY = currentPlayer.y - user.y;
        if (i === 0 || currentPlayer.getDistance() < closestPlayer.getDistance()){
            closestPlayer = currentPlayer;
        }
    }
    return closestPlayer;
}

function parseWSMsg(s){
    if (s.indexOf("42") === -1) return -1;
    var o = s.substring(s.indexOf("["));
    return JSON.parse(o);
}

function heal(){
    console.log("healing");
    if (hasApple){
        if (!haveApple()){
            heal();
            return;
        }
        else ws.send("42[\"5\",0,null]");
    }
    else ws.send("42[\"5\",1,null]");
    ws.send("42[\"4\",1,null]");
}

function haveApple(){
    if (hasApple) hasApple = isElementVisible(document.getElementById("actionBarItem9"));
    return hasApple;
}

function isElementVisible(e) {
    return (e.offsetParent !== null);
}

document.addEventListener('keydown', function(e){
    if (e.keyCode === 73 && document.activeElement.id.toLowerCase() !== 'chatbox'){ //Toggle key is I
        changeState();
    }
});

function changeState(){
    if (state === EnumStates.BOTH) state = EnumStates.NONE;
    else state++;
    var t;
    switch (state){
        case EnumStates.NONE:
            t = "Aim + heal off";
            break;
        case EnumStates.HEAL:
            t = "Heal on";
            break;
        case EnumStates.AIM:
            t = "Aim on";
            break;
        case EnumStates.BOTH:
            t = "Aim + heal on";
    }
document.getElementById("hacktext").innerHTML = t;
    revertTitle();
}

function revertTitle(){
    f++;
    setTimeout(function(){
        f--;
        if (!f) {
        document.getElementById("hacktext").innerHTML = '<div id="ageText"></div>';
        }
    }, 1500);
}



(function() {
    
	'use strict';
    var myVar;
    var myVar2;
	var police = true;
	var ID_MooHead = 28;
    var ID_EMPTY = 0;
	var ID_PigHead = 29;
    
	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 45 || e.keyCode == 118) {
			e.preventDefault();
			if (police) {
            storeEquip(ID_MooHead);
            myVar = setTimeout(function(){ h1(); }, 500);
			} else {
            clearTimeout(myVar);
            clearTimeout(myVar2);
            storeEquip(ID_EMPTY);
			}
			police = !police;
		}
	});
    
    function h1() { 
    storeEquip(ID_MooHead);
    clearTimeout(myVar);
    myVar2 = setTimeout(function(){ h2(); }, 500);
    }
    function h2() { 
    storeEquip(ID_PigHead);
    clearTimeout(myVar2);
    myVar = setTimeout(function(){ h1(); }, 500);
    }
})();


(function() {
    
	'use strict';
    var myVar;
    var myVar2;
	var police = true;
	var ID_BummleHat = 8;
    var ID_EMPTY = 0;
	var ID_WinterCap = 15;
    
	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 46 || e.keyCode == 119) {
			e.preventDefault();
			if (police) {
            storeEquip(ID_BummleHat);
            myVar = setTimeout(function(){ h1(); }, 500);
			} else {
            clearTimeout(myVar);
            clearTimeout(myVar2);
            storeEquip(ID_EMPTY);
			}
			police = !police;
		}
	});
    
    function h1() { 
    storeEquip(ID_WinterCap);
    clearTimeout(myVar);
    myVar2 = setTimeout(function(){ h2(); }, 500);
    }
    function h2() { 
    storeEquip(ID_BummleHat);
    clearTimeout(myVar2);
    myVar = setTimeout(function(){ h1(); }, 500);
    }
})();

(function() {
	'use strict';

	var ID_BummleHat = 8;
	var ID_StrawHat = 2;
	var ID_WinterCap = 15;
	var ID_CowboyHat = 5;
	var ID_RangerHat = 4;
	var ID_ExplorerHat = 18;
	var ID_MarksmanCap = 1;
	var ID_SoldierHelmet = 6;
	var ID_HoneycrispHat = 13;
	var ID_MinersHelmet = 9;
	var ID_BoosterHat = 12;
	var ID_BushGear = 10;
	var ID_SpikeGear = 11;
	var ID_BushidoArmor = 16;
	var ID_SamuraiArmor = 20;

	document.addEventListener('keydown', function(e) {
		switch (e.keyCode - 96) {
			case 0: storeEquip(0); break; // UnEquip
			case 1: storeEquip(ID_BummleHat); break;
			case 2: storeEquip(ID_WinterCap); break;
			case 3: storeEquip(ID_SoldierHelmet); break;
			case 4: storeEquip(ID_HoneycrispHat); break;
			case 5: storeEquip(ID_BoosterHat); break;
			case 6: storeEquip(ID_BushGear); break;
			case 7: storeEquip(ID_SpikeGear); break;
			case 8: storeEquip(ID_BushidoArmor); break;
			case 9: storeEquip(ID_SamuraiArmor); break;
		}
	});

})();


(function() {
	var leaderboard2 = document.getElementById("setupCard");        
        var myCssText = "display:block;margin-top:10px;";
        var splixDIV2 = document.createElement("div");
        splixDIV2.className = "menuCard";
        splixDIV2.style.cssText = myCssText;
        splixDIV2.innerHTML = '<a style="font-size:14px" href="http://slithere.com/moomoo-io-mods/" target="_blank">CHECK MOD TOPIC <font color="black">(CLICK)</font> FOR DAILY UPDATES</a>';
        leaderboard2.parentNode.insertBefore(splixDIV2, leaderboard2.nextSibling);
        uiElems.push(splixDIV2);
    
})();