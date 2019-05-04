// ==UserScript==
// @name         NYT Search MAM
// @namespace    https://greasyfork.org/en/users/78880
// @version      0.1
// @description  Add "MAM" button to NYT best sellers list
// @author       Slengpung
// @include      https://www.nytimes.com/books/best-sellers/*
// @grant        none
// ==/UserScript==

// Grab the books
var uls = document.getElementsByClassName("action-menu");
for (var i = 0; i < uls.length; ++i) {
	// Get current book title
	var buybutton = uls[i].getElementsByClassName("buy-button");
	var title = buybutton[0].getAttribute("data-title").toLowerCase();
	
	// Create new button which searches MAM for the given title
	var ul = uls[i];
	var li = document.createElement("li");
	var a = document.createElement("a");
	a.href = "https://www.myanonamouse.net/tor/browse.php?tor[text]=" + title;
	a.target = "_new";
	var button = document.createElement("button");
	var text = document.createTextNode("MAM");
	button.appendChild(text);
	button.className += "button";
	
	// Style the button
	button.style.width = '60px';
	button.style.fontSize = '14px';
	button.style.lineHeight = '14px';
	button.style.borderColor = '#326891';
	button.style.color = '#326891';
	button.style.transition = 'none';
	
	// Inject button on page
	a.appendChild(button);
	li.appendChild(a);
	ul.appendChild(li);
	
}