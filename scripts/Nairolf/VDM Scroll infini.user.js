// ==UserScript==
// @name        VDM Scroll infini
// @namespace   florian-castier.fr
// @include     http://www.viedemerde.fr/*
// @version     1.0
// @grant       none
// @description Permet d'avoir un scroll infini pour Vie De Merde et non une pagination
// ==/UserScript==

$( document ).ready(function() {
	// Remove bottom content

	$("#footer").remove();
	$(".pagination").remove();

	//Get height

	$windowHeight = $(window).height();
	$offsetHeight = $('.article:last').offset().top;

	//Set page and load

	var page = 0,
	load = false;

	//Get next page
	function getNext(p) {
		$.get("", {page: p})
		.done(function(data) {
			articles = $(".article", data);
			articles.appendTo(".wrapper");
			$offsetHeight =  $('.article:last').offset().top;
			load = false;
		});
	}

	//Update contant at bottom
	$(window).scroll(function() {
		if($(window).scrollTop() >= $offsetHeight-$windowHeight && load === false) {
			load = true;
			page++;
			getNext(page);
		}
	});

	//If window is resize
	$(window).resize(function() {
		$windowHeight = $(window).height();
		$offsetHeight = $('.article:last').offset().top;
	});
});