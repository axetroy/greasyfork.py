// ==UserScript==
// @name         LostFilm.tv автоматический вход
// @namespace    LostFilm
// @version      0.1
// @description  автоматический вход с логином и паролем
// @author       drakulaboy
// @include      *lostfilm.tv/login
// @grant        none
// @icon         http://lostfilm.tv/favicon.ico
// ==/UserScript==

var mail = "ваш_логин";
var pass = "ваш_пароль";

$(function() {
  $("input[name=mail]").val(mail);
  $("input[name=pass]").val(pass);
  $("div.bnt-pane > input").click();
});