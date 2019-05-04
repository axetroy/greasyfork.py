// ==UserScript==
// @name         [diep.io]sandboxで目指せ！100m！
// @name:en      Aim for a score of 100 m!
// @author       ゲームハック研究所の管理人
// @homepage     https://www1.x-feeder.info/javascript/
// @namespace    https://www.x-feeder.info/
// @version      0.2
// @description  自動でレベルアップして右下の方向に向かって進みます。
// @description:en  You should use this script in sandbox mode.
// @match        http://diep.io/
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var flag = 0;
    setInterval(function(){

        if(document.getElementById( "a" ).style.display == null || document.getElementById( "a" ).style.display !== "none" ){
        if(flag == 1)flag = 0;
        input.keyUp(68);//「→」を解除
        input.keyUp(83);//「↓」を解除
        input.keyDown(13);//「Enter」を押す
        setTimeout(function(){ input.keyUp(13);}, 300);
        }
        else{
    if(flag == 0){
    flag = 1;
    input.keyDown(75);//「K」を押す
    setTimeout(function(){ input.keyUp(75);}, 2000);
    input.set_convar('game_stats_build','8888888');//speed MAX
    }
    setTimeout(function(){
    input.keyDown(68);//「→」を押す
    input.keyDown(83);//「↓」を押す
    }, 2000);
        }

        }, 2000);
})();