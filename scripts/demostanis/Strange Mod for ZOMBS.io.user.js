// ==UserScript==
// @name         Strange Mod for ZOMBS.io
// @version      0.6
// @description  When the button play will be clicked, strange things will start...
// @author       DemostanisYt
// @match        http://zombs.io/*
// @namespace https://greasyfork.org/users/205154
// ==/UserScript==

function strangeMode() {
    document.getElementsByClassName('hud-intro-guide')[0].innerHTML = '<h1> Strange mod enabled! </h1>';
document.getElementsByClassName('btn btn-green hud-intro-play')[0].onclick = function(){
       setInterval(function() {
        Game.currentGame.world.localPlayer.entity.fromTick.yaw = '0';
    }, 100);
  };
}
    document.getElementsByClassName('hud-intro-guide')[0].innerHTML = '<button class="btn btn-red" style="width: 100%;" onclick="strangeMode();">Enable strange mod</button><br><br>';

                                                          /***********************************************************************\
                                                          //**********************script made by demostanis**********************\\
                                                          \***********************************************************************/