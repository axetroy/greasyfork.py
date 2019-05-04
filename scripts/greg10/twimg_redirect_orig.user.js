// ==UserScript==
// @name        twimg_redirect_orig
// @namespace   http://catherine.v0cyc1pp.com/twimg_redirect_orig.user.js
// @include     *://pbs.twimg.com/media/*
// @include     *://pbs.twimg.com/media/*:large
// @include     *://pbs.twimg.com/media/*:thumb
// @include     *://pbs.twimg.com/media/*:small
// @exclude     https://pbs.twimg.com/media/*:orig#*
// @run-at      document-start
// @author      greg10
// @license     GPL 3.0
// @version     1.8
// @grant       none
// @description Redirect twimg to :orig
// ==/UserScript==

var str = document.location + "";

//mobile.twitter.com用の不要な文字列をはずす
str = str.replace( /&name=[^&]+/, "");
str = str.replace( /\?format=/, ".");


str = str.replace( /:(thumb|small|large|orig).*$/, "");
//str = str.replace( /^https:/, "http:"); // httpが自動的にhttpsにリダイレクトされるようになったので、この行をONにすると無限ループになる。したがってOFFにする。出力されるURLはhttpsになる。2017/7/21
var ext = str.substr( str.length - 3, 3);
//console.log("ext="+ext);

var url = str + ":orig#." + ext;

window.location.replace( url );