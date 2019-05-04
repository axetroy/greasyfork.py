// ==UserScript==
// @name        zyxel modem autologin
// @namespace   zyxel-autologin
// @description:en zyxel modem autologin script
// @include     http://192.168.1.1/cgi-bin/login.html
// @version     1
// @grant       none
// @description zyxel modem autologin script
// ==/UserScript==

function login(){
	var user = document.getElementsByName('Loginuser')[0];
	user.value = "admin";
	var password = document.getElementsByName("LoginPassword")[0];
	password.value = "admin";
	var button = document.getElementsByName('Prestige_Login')[0];
	button.click();
}

window.onload = function() {
  login();
};