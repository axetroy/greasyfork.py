// ==UserScript==
// @name       RYM: Add Dropdown Menus (Fixed Toolbar)
// @version    1.4
// @description    see title
// @include      http://rateyourmusic.com/*
// @include      https://rateyourmusic.com/*
// @grant      GM_addStyle
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js 
// @namespace https://greasyfork.org/users/2625
// ==/UserScript==


$("#navtop").css('zIndex', 1); 

var communityMenu = '<li class="dropmenu">'; 
communityMenu += '<a href="/boards/board_id=1">Music</a><a href="/boards/board_id=9">Polls/Games/Surveys</a>'; 
communityMenu += '<a href="/boards/board_id=2">Site Board</a><a href="/boards/board_id=3">Film</a>'; 
communityMenu += '<a href="/boards/board_id=6">Off Topic</a>'; 
communityMenu += '<a href="/boards/board_id=9999">Video Games</a></li>'; 

var chartMenu = '<li class="dropmenu">'; 
chartMenu += '<a href="/customchart?chart_type=top&type=album&year=2016">2016 albums</a>'; 
chartMenu += '<a href="/customchart?chart_type=top&type=single&year=2016">2016 singles</a>'; 
chartMenu += '<a href="/films/chart">film charts</a>'; 
chartMenu += '<a href="/films/chart?year=2016">2016 films</a></li>'; 

$('#navtop li:nth-child(2)').addClass('topmenu').css('height', '30px').append(chartMenu); 
$('#navtop li:nth-child(4)').addClass('topmenu').css('height', '30px').append(communityMenu); 


GM_addStyle('li.topmenu li.dropmenu {  visibility: hidden; }'); 
GM_addStyle('li.dropmenu {  display: none; position: absolute; z-index: 1; font-size: 0.8em!important; background: #555!important; opacity:0.9;}'); 
GM_addStyle('li.topmenu:hover li.dropmenu {visibility: visible;}'); 

$("#navtop").css("position", "fixed");
$("#navtop").css("top", 0);
$("#top").css("zIndex", 1); 
$("#top").css("position", "fixed"); 
$(".submenu_ext:eq(0)").before('<br><br>')
