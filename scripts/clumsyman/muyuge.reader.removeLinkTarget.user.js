// ==UserScript==
// @name        muyuge.reader.removeLinkTarget
// @namespace   clumsyman
// @description prevent openning new window/tab for reader op links
// @include     http://muyuge.com/*/*.html
// @include     http://muyuge.net/*/*.html
// @include     http://www.muyuge.net/*/*.html
// @version     3
// ==/UserScript==

var links = document.querySelectorAll('ul.readertop>a[target=_blank]');
for(var i = 0; i < links.length; i++) {
    links[i].removeAttribute('target');
}
links = document.querySelectorAll('.readerFooterPage>a[target=_blank]');
for(var i = 0; i < links.length; i++) {
    links[i].removeAttribute('target');
}
