// ==UserScript==
// @name       direct url for pixiv
// @namespace  namespace
// @version    0.2
// @description  direct url for pixiv.
// @include    http://www.pixiv.net/member.php?id=*
// @copyright  2014+, q
// ==/UserScript==

$(function() {
  b = $(".profile-web > .td2 > a")
  b.attr("href", b.text())

  a = $(".profile-twitter > .td2 > a")
    aa = a.attr("href").match(/\?(.*)/)[1]
    a.attr("href", aa)

});

