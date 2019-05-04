// ==UserScript==
// @name        Dawn of the Dragons ArmorInterfaceSimplifier
// @namespace   voorash
// @description Removes nonessential elements from the AG interface
// @include     http://armorgames.com/dawn-of-the-dragons-game/13509
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1.5
// @grant       none
// ==/UserScript==
_sf_startpt=0;
$(".game-header").remove();
$(".game-secondary").remove();
$(".subscriptions-ad").remove();
$("#premium-info-modal").remove();
$("#ag3-header").remove();
$("#footer").remove();


$("#content-canvas").css("position","fixed");
$("#content-canvas").css("top",($(window).height()-690)/2+"px");
$("#content-canvas").css("left",($(window).width()-1025)/2+"px");