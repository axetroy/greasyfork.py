// ==UserScript==
// @name        Bypass rinks.sks.ac.kr
// @version     1.0
// @include     http://rinks.aks.ac.kr/*
// @run-at      document-start
// @grant       none
// @namespace https://greasyfork.org/users/201299
// @description none
// ==/UserScript==

location.href = location.href.replace("rinks.aks.ac.kr/Portal/ContentsView?sCode=ENCYKOREA&s", "encykorea.aks.ac.kr/Contents/Index?contents_");