// ==UserScript==
// @name         Audible search MAM
// @namespace    https://greasyfork.org/en/users/78880
// @version      0.5
// @description  Add "MAM" button to Audible
// @author       Slengpung
// @include      https://www.audible.com/pd/*
// @grant        none
// ==/UserScript==

// Get current book title
var title = document.getElementsByTagName("h1")[0].innerHTML;

// Get author
var author = document.getElementsByClassName("authorLabel")[0].getElementsByTagName("a")[0].innerHTML;

// Create search-link for title
var li = document.createElement("li");
var a = document.createElement("a");
a.href = "https://www.myanonamouse.net/tor/browse.php?tor[text]=" + title;
a.target = "_new";
var text = document.createTextNode("[ Search on MAM: Title ]");
a.appendChild(text);
li.appendChild(a);


// Inject title-search on page
var list = document.getElementsByTagName("h1")[0].parentNode.parentNode; //ul
list.appendChild(li);

// Create search-link for title+author
li = document.createElement("li");
a = document.createElement("a");
a.href = "https://www.myanonamouse.net/tor/browse.php?tor[text]=" + title + "%20" + author;
a.target = "_new";
text = document.createTextNode("[ Search on MAM: Title + Author ]");
a.appendChild(text);
li.appendChild(a);

// Inject title+author-search on page
list = document.getElementsByTagName("h1")[0].parentNode.parentNode; //ul
list.appendChild(li);