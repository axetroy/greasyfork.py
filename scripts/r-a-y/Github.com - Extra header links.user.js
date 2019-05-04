// ==UserScript==
// @name        Github.com - Extra header links
// @namespace   r-a-y/github/watching/homepage
// @description Adds "Stars" and "Watching" links, as well as your user profile link, to the header alongside the existing "Pull Requests", "Issues" and "Gist" links.
// @include     https://github.com/*
// @version     1.2.2
// @grant       none
// ==/UserScript==

var nav = document.querySelector('header.Header ul');

var watchingLink = document.createElement('a');
watchingLink.href = '/watching';
watchingLink.setAttribute( 'class', 'HeaderNavlink px-2' );
//watchingLink.innerHTML = '<span class="octicon octicon-eye"> </span> Watching';
watchingLink.innerHTML = 'Watching';

var watchingLi = document.createElement("li");
watchingLi.setAttribute( 'class', 'header-nav-item' );
watchingLi.appendChild(watchingLink);

var starLink = document.createElement('a');
starLink.href = '/stars';
starLink.setAttribute( 'class', 'HeaderNavlink px-2' );
starLink.innerHTML = 'Stars';

var starLi = document.createElement("li");
starLi.setAttribute( 'class', 'header-nav-item' );
starLi.appendChild(starLink);

var user = document.getElementsByClassName('header-nav-current-user');
user = user[0].childNodes[1].textContent;

var userLink = document.createElement('a');
userLink.href = '/' + user;
userLink.setAttribute( 'class', 'HeaderNavlink px-2' );
userLink.innerHTML = user;

var userLi = document.createElement("li");
userLi.setAttribute( 'class', 'header-nav-item' );
userLi.appendChild(userLink);

nav.appendChild( starLi );
nav.appendChild( watchingLi );
nav.appendChild( userLi );