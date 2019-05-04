// ==UserScript==
// @name        SvenskaMagic Auto Login
// @namespace   io.github.mattiasb.svm-autologin
// @description Auto-login to SvenskaMagic
// @include     http://www.svenskamagic.com/*
// @version     1
// @license     MIT
// @grant       none
// @run-at      document-idle
// ==/UserScript==

const $ = document.querySelector.bind(document);

function inputNotEmpty(input) {
    return input              != null
        && input.value        != null
        && input.value.length >  0;
}

let loginBtn = $("div#loginbox input[type=image][value=submit]");
let userName = $("div#loginbox input[type=text][name=loginusername]");
let password = $("div#loginbox input[type=password][name=password]");

if( loginBtn != null        &&
    inputNotEmpty(userName) &&
    inputNotEmpty(password)   ) {
    loginBtn.click();
}
