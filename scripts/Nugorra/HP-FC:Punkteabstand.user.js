// ==UserScript==
// @name        HP-FC:Punkteabstand
// @author      Nugorra
// @namespace   hpfcpunkteabstand
// @description ein Script zur Anzeige der Punkteabstände im Forum
// @include     https://www.hp-fc.de/hpfc/board/*
// @version     2.0.4
// @grant       none
// @require     https://code.jquery.com/jquery-3.1.0.slim.min.js
// ==/UserScript==
var i = 0, speicher = 0, house = [], points = [];
$(document).ready(function(){
  if ($('#inforight').css('display') != 'none') {
	  $('#infobox').css({"display":"flex", "flex-direction":"row-reverse", "flex-wrap":"wrap"});
	  $('#infobox #infotop1').css({"flex":"100%", "order":"1"});
	  $('#infobox #infotop2').css({"flex":"100%", "order":"2", "height":"11px"});
	  $('#infobox #infoleft').css({"flex":"1 0 0", "order":"5", "width":"auto", "float":"none", "white-space":"nowrap"});
	  $('#infobox #infocenter').css({"flex":"3 0 0", "order":"4", "margin-left":"auto", "margin-right":"auto"});
	  $('#infobox #inforight').css({"flex":"2 0 0","order":"3", "width":"auto", "float":"none", "white-space":"nowrap"}).wrapInner("<div style='float:right;'></div>");
	  $('#inforight #punktglaeser li').each(function(element){
	    house.push($(this).attr('class'));
	    points.push($(this).find('.punktzahl').html().replace(".",""));
	  });
	  while(points[i+1] > 0){
	    speicher = points[i] - points[i+1];
	    $('#punktglaeser li.'+house[i]).append('<span class="punktzahl">(+' + punkt(speicher) + ')</span>');
	    i++;
	  }
  }
});
function punkt(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}