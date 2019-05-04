// ==UserScript==
// @name         SD charge remover
// @version      1.0
// @author       Scruffy120/Breakmyballs
// @namespace    Diamondhunt
// @description  Removes the SD charge icons from the hammer/pickaxe
// @include      *.diamondhunt.*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant        GM_addStyle   
// ==/UserScript==


//Hides pickaxe stardust
$("#enchantedPickaxeStarDustAmount").hide();
$("#key-item-enchantedPickaxeLevel-box > img:nth-child(6)").hide();

//Hides hammer stardust
$("#enchantedHammerStarDustAmount").hide();
$("#key-item-enchantedHammerLevel-box > img:nth-child(6)").hide();