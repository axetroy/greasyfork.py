// ==UserScript==
// @name        Heroes RPG Auto Attack
// @namespace   HRPG
// @description Heroes RPG: More Idle
// @include     http://heroesrpg.com/game.php*
// @include     http://www.heroesrpg.com/game.php*
// @version     1.1.6.27
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js
// @grant       none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...

var farm = setInterval(function () { 
    if ($('#attack-btn')) $('#attack-btn').click();
    if ($('#s_quest1').text() == 'Request') questRequest(1);
},10000)