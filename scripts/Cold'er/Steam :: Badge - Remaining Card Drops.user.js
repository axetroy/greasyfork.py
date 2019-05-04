// ==UserScript==
// @name         Steam :: Badge - Remaining Card Drops
// @namespace    http://steamcommunity.com/id/Colder
// @version      0.1
// @description  Adds a button to show badges with remaining card drops.
// @author       Cold'er
// @match        *://steamcommunity.com/id/*/badges*
// @match        *://steamcommunity.com/profiles/*/badges*
// @icon         http://images.akamai.steamusercontent.com/ugc/320125633619822962/F71892F1DC4A1FE41FA782CFDA572F099FB6603F/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js
// @grant        none
// ==/UserScript==
'use strict';

// Text
var text = document.createElement('span');
text.appendChild(document.createTextNode('Toggle Badges With Remaining Drops'));

// Button
var button = document.createElement('button');
button.className = 'btnv6_blue_hoverfade btn_show_card_badges btn_medium'; // You can replace 'btn_medium'
// Steam store button styles I discovered: btn_medium, btn_small, btn_small_tall, app_tag
button.style.float = 'left';
button.style.margin = '-31px 200px 0px';
button.appendChild(text);
// Function, thanks to http://stackoverflow.com/a/6940628
button.onclick = function() {
$(".badge_row").each(function()
{
    if($(this).children(".badge_row_inner").children(".badge_title_row").children(".badge_title_stats").children(".badge_title_playgame").length == 0)
    {
        $(this).toggle();
    }
});
}

// Append
document.getElementsByClassName('profile_badges_header')[0].appendChild(button);