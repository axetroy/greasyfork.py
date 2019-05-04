// ==UserScript==
// @name       Facebook Redirect to "Most Recent" News Feed (kuminhdey)
// @version    1.2
// @include https://www.facebook.com/*
// @description Redirects facebooks homepage to show the "Most Recent" News Feed rather than "Top Stories"
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @grant none
// @namespace https://greasyfork.org/users/161806
// ==/UserScript==
if(window.location.href != "https://www.facebook.com/"){
$("a[href='https://www.facebook.com/?ref=logo']").attr("href", "https://www.facebook.com/?sk=h_chr");
$("a[href='https://www.facebook.com/?ref=tn_tnmn']").attr("href", "https://www.facebook.com/?sk=h_chr");
};
if(window.location.href == "https://www.facebook.com/"){
    window.location.href = "https://www.facebook.com/?sk=h_chr";
   };


