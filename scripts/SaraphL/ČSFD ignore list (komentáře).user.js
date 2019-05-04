// ==UserScript==
// @name        ČSFD ignore list (komentáře)
// @namespace   csfd.cz
// @description Skript sloužící k ignorování otravných uživatelů v ČSFD komentářích
// @include     *csfd.cz/film/*
// @icon        http://img.csfd.cz/assets/b1733/images/apple_touch_icon.png
// @grant       none
// @version     1.1
// ==/UserScript==


// následující řádek editujte
var ignore = ["Jméno1", "Jméno2", "Jméno3", "Jméno4"];

var comments = document.getElementsByClassName("ui-posts-list")[0];
var ratings = document.getElementById("ratings");
var fanclub = document.getElementById("fanclub");
var toRemove = [];

function contains(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) {
            return true;
        }
    }
    return false;
}

function isIgnoredName(author) {
	return contains(ignore, author.textContent);
}

function findUnwantedComments(comments) {
	if (comments !== undefined) {		
		var authors = comments.getElementsByClassName("author");
		for (var i = 0; i < authors.length; i++) {
			var author = authors[i].getElementsByTagName("a")[0];
			if (isIgnoredName(author)) {
				toRemove.push(authors[i].parentElement);
			}
		}
	}
}

function findUnwantedRatingsOrFans(ratingsOrFans) {
	var links = ratingsOrFans.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		if (isIgnoredName(links[i])) {
			toRemove.push(links[i].parentElement);
		}
	}
}

function removeUnwanted() {
	for (var i = 0; i < toRemove.length; i++) {
		toRemove[i].remove();
	}
	toRemove.clear();
}

// run the script
findUnwantedComments(comments);
findUnwantedRatingsOrFans(ratings);
findUnwantedRatingsOrFans(fanclub);
removeUnwanted();