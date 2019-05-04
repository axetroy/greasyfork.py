// ==UserScript==
// @name        UVA Tab Problem Title
// @namespace   https://greasyfork.org/users/8233
// @description Put problem name in as title when viewing a problem on UVA
//@include      https://uva.onlinejudge.org/*
// @version     1
// @grant       none
// ==/UserScript==
var probname = document.getElementById('col3_content_wrapper').getElementsByTagName('h3') [0].innerText;
if (probname !== undefined) {
  document.title = probname;
}
