// ==UserScript==
// @name        hideQuoraSignInModal
// @namespace   DT
// @description Hide Quora signin modal
// @include     http://www.quora.com/*
// @include     https://www.quora.com/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(".modal_signup_background { display: none;}");
GM_addStyle(".modal_signup_dialog { display: none;}");
GM_addStyle(".dialog_wrapper { display: none;}");