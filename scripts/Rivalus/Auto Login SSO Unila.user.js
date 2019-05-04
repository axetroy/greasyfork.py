// ==UserScript==
// @name        Auto Login SSO Unila
// @name:id     Auto Login SSO Unila
// @namespace   AutoLoginSSOUnila
// @description  Automatic Login for SSO Unila
// @description:id  Otomatis Login untuk SSO Unila
// @include     https://sso.unila.ac.id/login*
// @include     https://login.portal.unila.ac.id/*
// @include     https://login.portal.unila.ac.id/upload/custom/WIFI@Unila_CP/index.html
// @include     https://captiveportal-login.unila.ac.id/upload/custom/WIFI@Unila_CP*
// @include     https://sso250.unila.ac.id/login*
// @version     1.2018.3
// @grant       none
// ==/UserScript==
uname = "username"; // Ganti dengan nama user | Replace it with your username
paswd = "password"; // Ganti dengan password | Change it with your password
var e = document.querySelector('form');
if(e){
e.querySelector("input[type=text]").value = uname;
e.querySelector("input[type=password]").value = paswd;
e.submit();
e.querySelector("button[type=submit]").click();
}
var f = document.querySelector('form[name="login"]');
if(f){
f.elements.namedItem("username").value = uname;
f.elements.namedItem("password").value = paswd;
f.submit();
}
var g = document.querySelector('form[name="login-form"]');
if(g){
  g.elements.namedItem("uid").value = uname;
  g.elements.namedItem("passwd").value = paswd;
  g.submit();
}
var h = document.querySelector('form[name="form1"]');
if(h){
  h.elements.namedItem("username").value = uname;
  h.elements.namedItem("password").value = paswd;
  h.querySelector("button").click();
}
