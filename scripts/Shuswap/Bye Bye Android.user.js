// ==UserScript==
// @name     Bye Bye Android
// @include  https://forums.crackberry.com*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant    GM_addStyle
// @description   A script to remove Android devices from CrackBerry Forums search results
// @version 0.0.2
// @namespace https://greasyfork.org/users/220598
// ==/UserScript==
//- The @grant directive is needed to restore the proper sandbox.

/*--- Use the jQuery contains selector to find content to remove.
    Beware that not all whitespace is as it appears.
*/
var badDivs = $("div div.c:contains('Motion'), div.c:contains('KEYone'), div.c:contains('KEY2'), div.c:contains('DTEK60'), div.c:contains('DTEK50'), div.c:contains('Priv'), div.c:contains('Evolve'), div.c:contains('Android'), div.c:contains('BlackBerry Mobile Support'), div.c:contains('BlackBerry Aurora'), div.c:contains('BlackBerry HUB+ Suite')");

badDivs.parent().parent().parent().parent() .remove ();

//-- Or use badDivs.hide(); to just hide the content.

var badDivs2 = $("div div.title:contains('Motion'), div.title:contains('KEYone'), div.title:contains('KEY2'), div.title:contains('DTEK60'), div.title:contains('DTEK50'), div.title:contains('Priv'), div.title:contains('Evolve'), div.title:contains('Android'), div.title:contains('BlackBerry Mobile Support'), div.title:contains('BlackBerry Aurora'), div.title:contains('BlackBerry HUB+ Suite')");

badDivs2.parent().parent() .remove ();

//-- Or use badDivs2.hide(); to just hide the content.