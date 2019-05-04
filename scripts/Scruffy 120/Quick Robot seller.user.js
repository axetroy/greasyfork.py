// ==UserScript==
// @name         Quick Robot seller
// @namespace    Quick Robot Seller
// @version      0.6
// @description  Sells the minerals from the super robot super fast!
// @author       Breakmyballs
// @match        *.diamondhunt.co/game.php
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant        unsafeWindow
// ==/UserScript==

unsafeWindow.robotSell = function robotSell(){
quickSell("item-stone-box");
quickSell("item-copper-box");
quickSell("item-tin-box");
quickSell("item-iron-box");
quickSell("item-silver-box");
quickSell("item-gold-box");
};

$("#gatherings-tab").append('<span class="activate-tooltip" tooltip="Sells robot minerals"><span id="item-robotSell-box" onclick="robotSell()" class="inventory-item-box" style="display: inline-block;"><br><img class="item-box-img" src="http://www.diamondhunt.co/images/pic_coin2.png" alt="Item Image" width="90px" height="90px"><br><span id="robotSeller">Robot Sell</span><br></span></span>');
