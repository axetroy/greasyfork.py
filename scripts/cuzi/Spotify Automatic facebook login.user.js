// ==UserScript==
// @name         Spotify Automatic facebook login
// @description  Automatically log in to Spotify web with your facebook account, no need to click the multiple login buttons anymore
// @namespace    cuzi
// @version      5
// @grant        GM.setValue
// @grant        GM.getValue
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @include      https://open.spotify.com/*
// @include      https://accounts.spotify.com/*
// ==/UserScript==
"use strict";



async function login() {  
  let button = document.querySelector("button#has-account");
  if(button) {
    button.click();
  }

  button = document.querySelector(".btn-facebook");
  if(button) {
    button.click();
  }
  
  button = document.querySelector(".navBar-signupPrompt button.btn-black");
  if(button) {
    button.click();
  }
  
  
  if(document.querySelector("#login-screen")) {
    await GM.setValue("userscript_auto_redirect", document.location.href);
  }
  
  if(document.location.href.indexOf("login?continue=") != -1) {
    await GM.setValue("userscript_auto_redirect", document.location.href);
  }
  
  
  if(document.location.href == "https://accounts.spotify.com/en/status") {
    let url = await GM.getValue("userscript_auto_redirect", false);
    if(url) {
      await GM.setValue("userscript_auto_redirect", false);
      document.location.href = url;
    }
  }
  
  
}

login();
window.setTimeout(login, 500);
window.setTimeout(login, 1000);
window.setInterval(login, 3000);
