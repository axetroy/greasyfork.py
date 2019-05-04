// ==UserScript==
// @name         Nice Meme!
// @version      1.1
// @description  NiceMeme! Loop
// @author       DaCurse0
// @copyright    2016+, DaCurse0
// @match        http://niceme.me/
// @require      https://code.jquery.com/jquery-latest.min.js
// @namespace    https://greasyfork.org/users/62051
// ==/UserScript==

$(function(){setInterval(function(){$.get("/",function(a){$("body").append(a),$("body").animate({scrollTop:$(document).height() + 2e3},1)})},1)});