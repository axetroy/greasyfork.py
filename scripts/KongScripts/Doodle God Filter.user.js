// ==UserScript==
// @name            Doodle God Filter
// @author          BobTheCoolGuy
// @description     Tries to save you from Doodle God talk on Kongregate!
// @include         http://www.kongregate.com/games/*/*
// @homepage        
// @version 0.0.1.20160306135351
// @namespace https://greasyfork.org/users/32649
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
var matcher = /element|do+[dle]{1,3}|(\+[\s\S]*?[?=])/i
unsafeWindow.holodeck.addIncomingMessageFilter(function(s,e){if(matcher.test(s))e("");else e(s);});
}, 1250)