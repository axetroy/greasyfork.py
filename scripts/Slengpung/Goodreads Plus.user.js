// ==UserScript==
// @name         Goodreads Plus
// @namespace    https://greasyfork.org/en/users/78880
// @version      0.2
// @description  Add "Search MAM" button to Goodreads
// @author       Slengpung
// @include      https://www.goodreads.com/*
// @grant        none
// ==/UserScript==

console.log("[G+] Tweaking Goodreads...");

var page = window.location.pathname.split('/')[1];

if(page === 'book'){
	var bookTitle = getBookTitle(document.getElementById("bookTitle"));
	var mamSearchUrl = "https://www.myanonamouse.net/tor/browse.php?tor[text]=" + bookTitle;

	// Add 'Search MAM' button
	var buttonBar = document.getElementById("buyButtonContainer");
	if (buttonBar === null || buttonBar == "null") {
		buttonBar = document.getElementById("asyncBuyButtonContainer");
	}
	var buttonUl  = buttonBar.getElementsByTagName("ul");
	var mamButton = document.createElement("li");
	mamButton.innerHTML = '<a id="mamLink" href="' + mamSearchUrl + '" target="_blank" class="buttonBar">Search MAM</a>';
	mamButton.className = "Button";
	buttonUl[0].appendChild(mamButton);
	console.log("[G+] 'Search MAM' button added!");
}else if(page === 'review'){
	var bookList = document.querySelectorAll('#booksBody .title div a');
	// Loop over all the books
	for(var i=0; i<bookList.length; i++){
		var mamSearchUrl = "https://www.myanonamouse.net/tor/browse.php?tor[text]=" + getBookTitle(bookList[i]);
		// Add 'Search MAM' button
		var newLink = document.createElement('a');
		var linkText = document.createTextNode('[Search MAM]');
		newLink.appendChild(linkText);
		newLink.setAttribute('href',mamSearchUrl);
		newLink.setAttribute('style','color:#b3b3b3;font-style:italic');
		bookList[i].parentNode.parentNode.appendChild(newLink);
	}
	console.log("[G+] 'Search MAM' buttons added!");
}

// Grab book title (and only title) from the element
function getBookTitle(el){
	var bookTitle = el.innerHTML.trim().split('<', 1)+'';
	console.log("Book title: " + bookTitle.trim());
	return bookTitle.trim();
}