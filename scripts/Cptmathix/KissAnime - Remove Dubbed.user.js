// ==UserScript==
// @name         KissAnime - Remove Dubbed
// @version      1.1.4
// @description  Remove all dubbed anime from the latest updates on the kissanime homepage and also from the Anime list
// @author       Cpt_mathix
// @match        *://kissanime.ru/*
// @include      *://kissanime*
// @grant        none
// @noframes
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @namespace    https://greasyfork.org/users/16080
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var domLength = 1;
var looped = 1;
removeDubFromHomepage();
removeDubFromAnimelist();
loop();

function loop() {
	setTimeout(function () {
		if (domLength != $('#leftside > div.bigBarContainer > div.barContent > div.scrollable > div.items').children().length) {
			looped += 1;
			removeDubFromHomepage();
		}
		loop();
	}, 2000);
}

function removeDubFromAnimelist() {
	$('.listing > tbody > tr').each( function() {
		if (this.innerHTML.indexOf("(Dub)") > -1) {
			$(this).hide();
		} else if (this.innerHTML.indexOf("(Sub)") > -1) {
			this.innerHTML = this.innerHTML.replace("(Sub)", "");
		}
	});
}

function removeDubFromHomepage() {
	$('#leftside > div.bigBarContainer > div.barContent > div.scrollable > div.items > div').each( function() {
		$(this).contents().filter(function() {
			return this.nodeType === 3; //Node.TEXT_NODE
		}).remove();

		$(this).contents().each( function() {
			var title = $(this).text();
			if (title.match('(Dub)'))
				$(this).remove();
			if (title.match('(Sub)')) {
				$(this).html(function(i, htm){
					return htm.replace('(Sub)', '');
				});
			}
		});
	});

	$('#leftside > div.bigBarContainer > div.barContent > div.scrollable > div.items > div').each( function() {
		if($(this).contents().length < 5 && $(this).next()[0]) {
			for(var i = $(this).contents().length; i < 5 && $(this).next()[0]; i++) {
				var nextItem = $(this).next().find('a').first();
				$(this).append(nextItem);

				if($(this).next().find('a').length === 0) {
					$(this).next().remove();
				}
			}
		}
	});

	$('#leftside > div.bigBarContainer > div.barContent > div.scrollable > div.items > div').each( function(index) {
		for( var i = 0; i < $(this).find('> a > img').length; i++) {
			var img = $(this).find('> a > img')[i];
			var srctemp = img.attributes.srctemp;
			var page = img.attributes.page;
			if (page)
				page.value = index + 1;
			if (index + 1 <= domLength + 1 && srctemp)
				img.src = srctemp.value;
		}
	});

	while ($(".items div > a").size() < looped * 50) {
		createGhostDiv();
	}

	domLength = $('#leftside > div.bigBarContainer > div.barContent > div.scrollable > div.items').children().length;
}

// kissanime won't load duplicate anime anymore
function createGhostDiv() {
	var divHTML = "<div><a href=\"\" title=\"\" style=></div>";
	var element = document.createElement("div");
	element.className = "items";
	element.style = "display:none";
	element.innerHTML = divHTML;
	document.getElementById("footer").appendChild(element);
}