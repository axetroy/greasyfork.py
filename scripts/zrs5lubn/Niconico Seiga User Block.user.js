// ==UserScript==
// @name Niconico Seiga User Block
// @match http://seiga.nicovideo.jp/*
// @description block images on Niconico Seiga
// @grant None
// @version 0.0.1.20151020022124
// @namespace https://greasyfork.org/users/18369
// ==/UserScript==

var elements = document.getElementsByClassName('user');
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var user_name = element.innerHTML;
    if (/.*(アカウント名１|アカウント名２|アカウント名３|以下同様).*/.test(user_name)) {
        var parent = element.parentNode.parentNode.parentNode;
        parent.style.visibility = 'hidden';
    }
}