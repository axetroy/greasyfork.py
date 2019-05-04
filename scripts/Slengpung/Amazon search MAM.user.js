// ==UserScript==
// @name         Amazon search MAM
// @namespace    https://greasyfork.org/en/users/78880
// @version      1.0
// @description  Add "Search MAM" button to Amazon
// @author       Slengpung
// @include      https://www.amazon.tld/*
// @include      https://smile.amazon.tld/*
// @grant        none
// ==/UserScript==

var ul;

// If this is a book, inject search-button
try {
	var tmm = document.getElementById("tmmSwatches");
	ul = tmm.getElementsByTagName("ul")[0];
	console.log("MAM plugin: Looks like a book! Injecting MAM box...");
}
catch(err) {
	console.log("MAM plugin: This does not look like a book, won't inject search button!");
	return;
}

// Grab title
var title = document.getElementById("title").getElementsByTagName("span")[0].innerHTML;

// Grab author
var author = "";
var spans = document.getElementsByTagName("span");
for (var i = 0, len = spans.length; i < len; i++) {
	if(spans[i].innerHTML === "(Author)") {
		author = spans[i-2].innerText;
	}
}

// Create search-box
var li = document.createElement("li");
li.className += "swatchElement unselected resizedSwatchElement";

// Create search for title
var span = document.createElement("span");
//span.className += "a-button a-button-selected a-spacing-mini a-button-toggle format";
span.className += "a-spacing-mini format";
var a = document.createElement("a");
a.href = "https://www.myanonamouse.net/tor/browse.php?tor[srchIn][title]=true&tor[text]=" + title;
a.target = "_new";
var text = document.createTextNode("MAM: title");
a.appendChild(text);
span.style.cssText += "background: #EDB91F; text-align: left; border: none";
span.appendChild(a);

// Create search for title + author
var aauth = document.createElement("a");
aauth.href = "https://www.myanonamouse.net/tor/browse.php?tor[text]=" + title + "%20" + author;
aauth.target = "_new";
var textauth = document.createTextNode("MAM: title + author");
aauth.appendChild(textauth);
var br = document.createElement("br");
span.appendChild(br);
span.appendChild(aauth);

li.style.cssText += "height: 50px; padding: 5px 10px; background: #EDB91F; color: black; min-width:150px";
li.appendChild(span);

// Inject title-search on page
ul.appendChild(li);