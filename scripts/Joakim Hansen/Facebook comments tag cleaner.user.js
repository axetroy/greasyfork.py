// ==UserScript==
// @name         Facebook comments tag cleaner
// @namespace    http://mutux.org/
// @version      0.1
// @description  Deletes Facebook comments someone is tagged in, as these are usually of no interest whatsoever
// @author       Joakim
// @match http://*.facebook.com/*
// @match https://*.facebook.com/*
// @grant        none
// ==/UserScript==

do {
	var someRemoved = false;

	comments = document.getElementsByClassName("UFIComment");

	for (var i = 0; i < comments.length; i++) {

		comment = comments[i];
		text = comment.getElementsByClassName("UFICommentBody")[0];

		/* if (text.firstChild.className == "profileLink") { */
		if (text.getElementsByClassName("profileLink").length > 0) {

			comment.parentNode.removeChild(comment);
			someRemoved = true;
		}
	}
} while(someRemoved);