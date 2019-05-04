// ==UserScript==
// @name           Spinics Fedora mailing lists URL fixer
// @version        1.1
// @namespace      spinics-fedora-url-fixer
// @author         Samuel Rakitničan
// @description    Fixes URLs pointing to Fedora mailing lists
// @include        https://*.spinics.net/lists/*
// @grant          none
// ==/UserScript==

var links = document.getElementsByTagName("a"); //array
var regex = /(https:\/\/lists\.fedoraproject\.org\/archives\/list\/[^.]+@)xxxxxxxxxxxxxxxxxxxxxxx/ig;
for (var i=0,imax=links.length; i<imax; i++) {
  links[i].href = links[i].href.replace(regex,"$1lists.fedoraproject.org");
  links[i].innerHTML = links[i].innerHTML.replace(regex,"$1lists.fedoraproject.org");
}