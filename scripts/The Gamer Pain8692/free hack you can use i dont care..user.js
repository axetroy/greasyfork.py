// ==UserScript==
// @name         free hack you can use i dont care.
// @version      1.0
// @description  my good hack :)
// @author       The Gamerpain8692 YT
// @match        http://moomoo.io/*
// @match        http://45.77.0.81/?party=45.32.128.142
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @grant        none
// @connect      moomoo.io
// @icon http://i.imgur.com/eJSOmz9.png[/img]
// @namespace https://greasyfork.org/users/131053
// ==/UserScript==

$('head').append('<link rel="stylesheet" href="http://wormax.org/chrome3kafa/moomods.css" type="text/css" media="screen, projection" /><script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script><script>(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","https://www.google-analytics.com/analytics.js","ga");ga("create", "UA-96874588-1", "auto");ga("send", "pageview");</script><script data-cfasync="false" type="text/javascript" src="http://www.tradeadexchange.com/a/display.php?r=1433959"></script>');
$('title').html('Moo Moo');
$('#gameName').remove();
$('#leaderboard').append('Cow');
$('#menuCardHolder').prepend('<a href="https://www.youtube.com/channel/UCpLebMINCQlfVSJmggN4OqA" target="_blank"><div id=gameName3>Cow Client</div></a>');
$('#adCard').html('<div align="left"><center><b><a class="menuText" href="https://www.youtube.com/channel/UCpLebMINCQlfVSJmggN4OqA" target="_blank">Cow Client FEATURES</a></b></center><table style="border-collapse: collapse;" border="1"><tbody><tr><td style="width: 100px;"><b>Features</b></td><td style="width: 250px;"><b>How to use</b></td></tr><tr><td>NO ADS</td><td>Automatically Removed</td></tr><tr><td>AUTO-HAT</td><td>Press F8 or Del to toggle!</td></tr><tr><td>AUTO ATTACK</td><td>Make in progress</td></tr><tr><td>CHANGE HATS</td><td>Numpad 0-9 Keys to change hat</td></tr><tr><td>POLICE MOD</td><td>Updated to Auto-Hat </br>...</td></tr><tr><td>AUTO FOOD</td><td>Make in progress</td></tr><tr><td>MINIMAP SIZE</td><td>Edit from within the script as shown in the video.</td></tr><tr><td>+=+=AD POPUPS!!!!=+=+</td><td>Ad popups in different tabs may appear on click!</td></tr><tr><td>AUTO HEAL<a style="font-size:11px; color:green;"></a></td><td>Make in progress</td></tr><tr><td>Enemy Radar<a style="font-size:9.5px; color:red;"></a></td><td>Make in progress</td></tr></tbody></table><hr><b>Subscribe To Derpity Derpity For Constant Updates!</b><br><a href="https://www.youtube.com/channel/UCpLebMINCQlfVSJmggN4OqA" target="_blank">HERE</a>');
$('#linksContainer1').remove();
$('#linksContainer2').html('<a href="./docs/versions.txt" target="_blank" class="menuLink">Changelog</a> |<a href="https://discordapp.com/invite/moomoo" target="_blank" class="menuLink">Discord</a> |<a href="https://www.youtube.com/channel/UCpLebMINCQlfVSJmggN4OqA" target="_blank" class="menuLink">Derpity Derpity</a>');
$('#youtubeFollow').remove();
$('#twitterFollow').remove();


(function() {
var weapon;
var foodx;
$("#gameCanvas").mousedown(function(ev){
      if(ev.which == 3)
      {
        document.getElementById("actionBarItem7").onclick();
        var e = jQuery.Event( "keydown", { keyCode: 32 } );
        jQuery( "body" ).trigger( e );
        weapon = setTimeout(function(){ weapon5(); }, 25);
        foodx = setTimeout(function(){ takefood(); }, 40);
      }
});
    function takefood() {
    clearTimeout(foodx);
    document.getElementById("actionBarItem6").onclick();
    }
    function weapon5() {
    clearTimeout(weapon);
    document.getElementById("actionBarItem0").onclick();
    document.getElementById("actionBarItem1").onclick();
    document.getElementById("actionBarItem2").onclick();
    document.getElementById("actionBarItem4").onclick();
    }
})();


(function() {

	'use strict';
    var myVar;
    var myVar2;
	var police = true;
    var ID_BullsHelmet = 7;
    var ID_EMPTY = 0;
    var ID_BullsHelmet = 7;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode == 46 || e.keyCode == 15) {
			e.preventDefault();
			if (police) {
            storeEquip(ID_BullsHelmet);
            myVar = setTimeout(function(){ h1(); }, 1);
			} else {
            clearTimeout(myVar);
            clearTimeout(myVar2);
            storeEquip(ID_EMPTY);
			}
			police = !police;
		}
	});

    function h1() {
    storeEquip(ID_BullsHelmet);
    clearTimeout(myVar);
    myVar2 = setTimeout(function(){ h2(); }, 1);
    }
    function h2() {
    storeEquip(ID_BullsHelmet);
    clearTimeout(myVar2);
    myVar = setTimeout(function(){ h1(); }, 1);
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
    var ID_BullsHelmet = 7;
   	var ID_TankGear = 40;
    var ID_FlipperHat = 31;
   	var ID_EmpHelmet = 22;
    var actionBarItem10; // cookie
    var actionBarItem20; // boostpad
    var actionBarItem19; // pitfall
    var actionBarItem4; // katana
    var actionBarItem3; // shortsword

	document.addEventListener('keydown', function(e) {
		switch (e.keyCode - 96) {
			case 0: storeEquip(0); break; // UnEquip
            case 1: storeEquip(ID_BullsHelmet); break;
			case 2: storeEquip(ID_WinterCap); break;
			case 3: storeEquip(ID_SoldierHelmet); break;
			case 4: storeEquip(ID_TankGear); break;
			case 5: storeEquip(ID_BoosterHat); break;
			case 6: storeEquip(ID_BushGear); break;
			case 7: storeEquip(ID_SpikeGear); break;
			case 8: storeEquip(ID_BushidoArmor); break;
			case 9: storeEquip(ID_SamuraiArmor); break;
		}
	});

})();


(function() {
	'use strict';

	var conf = {
		'map': {
			'w': '130',
			'h': '130',
			'top': '15',
			'left': '15'
		},
	};

	// Change Layout
	$('#mapDisplay').css({
		'top': conf.map.top + 'px',	// default 20px
		'left': conf.map.left + 'px',		// default 20px
		'width': conf.map.w + 'px',			// default 130px
		'height': conf.map.h + 'px'			// default 130px
	});
	$('#scoreDisplay').css({
		'bottom': '20px',					// default 20px
		'left': '20px'						// default 170px
	});

})();
(function() {
	var leaderboard2 = document.getElementById("setupCard");
        var myCssText = "display:block;margin-top:10px;";
        splixDIV2.innerHTML = '</br>Right Click -> Apple: Not eat, auto get to hand</br>Right Click -> Cookie: auto eat, not get to hand';

})();