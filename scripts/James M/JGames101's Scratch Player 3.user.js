// ==UserScript==
// @name         JGames101's Scratch Player 3
// @namespace    https://jgames101.github.io/scratch-player-3/
// @version      1.2.1
// @description  Play your Scratch Projects in HTML5!
// @author       JGames101
// @match        https://scratch.mit.edu/projects/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js?v=1
// @grant        none
// ==/UserScript==

(function() {
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        if (myObj.version > 1.2.1) {
			var newURL = "https://greasyfork.org/en/scripts/32912-jgames101-s-scratch-player-3";
			chrome.tabs.create({ url: newURL });	
		}
    }
};
xmlhttp.open("GET", "https://jgames101.github.io/scratch-player-3/latest.json", true);
xmlhttp.send();
$('#stats').append('<div class="action tooltip bottom" id="sp3" style="cursor:pointer;"><span class="hovertext"><span class="arrow"></span>Run this project in the new HTML5 Player.</span><span class="see-inside white">Run In Scratch 3</span></div>');
$("#sp3").click(function(){
    $(".player").empty();
	$("#sp3").css("display", "none");
	$($( "#see-inside" ).parent()).attr('href','https://llk.github.io/scratch-gui/#' + location.href.slice(33));
	$('.player').append('<div id="player" style="width:500px;height:410px;overflow:hidden;position:relative;left:-8px;top:10px;"><object style="position:absolute;top:-51px;left:-2060px" class="int-player" width="2560" height="1440" data="https://llk.github.io/scratch-gui/#' + location.href.slice(33) + '" scrolling="no"></object></div>');
	$(".stage").css("background", "#e8edf1");
});
})();