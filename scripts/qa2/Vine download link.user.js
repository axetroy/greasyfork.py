// ==UserScript==
// @name       Vine download link
// @namespace  namespace
// @version    0.3
// @description  generate link to download vine movie
// @include https://vine.co/v/*
// @copyright  2014+, qa2
// ==/UserScript==

!function() {
  // media source
  var src = $(".post > video").attr("src")

  // link
  var a =  $("<a>")
  a.text("DL")
  a.attr("href", src)
  $(".post-actions").append(a)

}();

