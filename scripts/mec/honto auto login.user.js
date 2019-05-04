// ==UserScript==
// @name        honto auto login
// @namespace   honto auto login
// @description hontoにオートログイン
// @include     https://honto.jp/reg/login.html*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

$("#dy_pw").focus().val("*******");
$("#dy_btLgin").trigger("click");