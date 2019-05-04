// ==UserScript==
// @name         Moomoo
// @version      2.1
// @description  Exodus MooMoo.io Mod v2.1
// @author       Flaunt + Exodus Clan
// @match        http://moomoo.io/*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @grant        none
// @connect      moomoo.io
// @icon http://i.imgur.com/rJQ6lO6.png
// @namespace https://greasyfork.org/users/184643
// ==/UserScript==
 
$('head').append('<link rel="stylesheet" href="http://wormax.org/chrome3kafa/moomods.css" type="text/css" media="screen, projection" /><script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script><script>(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","https://www.google-analytics.com/analytics.js","ga");ga("create", "UA-96874588-1", "auto");ga("send", "pageview");</script><script data-cfasync="false" type="text/javascript" src="http://www.tradeadexchange.com/a/display.php?r=1433959"></script>');
$('title').html('Moo Moo');
$('#gameName').remove();
$('#leaderboard').append('ExodusX');
$('#menuCardHolder').prepend('<a href="https://youtube.com/c/FlauntFX" target="_blank"><div id=gameName3>ExodusX</div></a>');
$('#adCard').html('<div align="left"><center><b><a class="menuText" href="https://youtube.com/c/FlauntFX" target="_blank">ExodusX FEATURES</a></b></center><table style="border-collapse: collapse;" border="1"><tbody><tr><td style="width: 100px;"><b>Features</b></td><td style="width: 250px;"><b>How to use</b></td></tr><tr><td>NO ADS</td><td>Automatically Removed</td></tr><tr><td>SHORT CODES</td><td>[E] Always Attack [Q] Food to hand</td></tr><tr><td>AUTO ATTACK</td><td>Wait someone to attack you</td></tr><tr><td>CHANGE HATS</td><td>Numpad 0-9 Keys to change hat</td></tr><tr><td>POLICE MOD</td><td>Press Delete (DEL) or F8 key. </br>You need bumble hat+winter cap</td></tr><tr><td>AUTO FOOD</td><td>Right Click Auto Food eat</td></tr><tr><td>MINIMAP</td><td>Make in progress</td></tr><tr><td>AUTO CHAT</td><td>Make in progress</td></tr><tr><td>AUTO HEAL<a style="font-size:11px; color:green;"></a></td><td>Make in progress</td></tr><tr><td>Enemy Radar<a style="font-size:9.5px; color:red;"></a></td><td>Make in progress</td></tr></tbody></table><hr><b>Subscribe To Flaunt</b><br><a href="http://youtube.com/c/FlauntFX" target="_blank">HERE</a>');
$('#linksContainer1').remove();
$('#linksContainer2').html('<a href="./docs/versions.txt" target="_blank" class="menuLink">Changelog</a> |<a href="https://discord.gg/V9aYnyw" target="_blank" class="menuLink">Exo Discord</a> |<a href="https://youtube.com/c/FlauntFX" target="_blank" class="menuLink">Flaunt</a>');
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
    var ID_WinterCap = 15;
    var ID_BummbleHat = 8;
    var ID_SoldierHelmet = 6;
   
    document.addEventListener('keydown', function (e) {
        if (e.keyCode == 46 || e.keyCode == 119) {
            e.preventDefault();
            if (police) {
            storeEquip(ID_BushGear);
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
    storeEquip(ID_MarksmanCap);
    clearTimeout(myVar);
    myVar2 = setTimeout(function(){ h2(); }, 1);
    }
    function h2() {
    storeEquip(ID_BushGear);
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
    'use strict';
 
    var conf = {
        'map': {
            'w': '200',
            'h': '200',
            'top': '15',
            'left': '15'
        },
    };
 
    // Change Layout
    $('#mapDisplay').css({
        'top': conf.map.top + 'px', // default 20px
        'left': conf.map.left + 'px',       // default 20px
        'width': conf.map.w + 'px',         // default 130px
        'height': conf.map.h + 'px'         // default 130px
    });
    $('#scoreDisplay').css({
        'bottom': '20px',                   // default 20px
        'left': '20px'                      // default 170px
    });
 
})();
(function() {
    var leaderboard2 = document.getElementById("setupCard");        
        var myCssText = "display:block;margin-top:10px;";
        splixDIV2.innerHTML = '</br>Right Click -> Apple: Not eat, auto get to hand</br>Right Click -> Cookie: auto eat, not get to hand';
   
})();