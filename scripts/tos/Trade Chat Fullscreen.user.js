// ==UserScript==
// @name         Trade Chat Fullscreen
// @namespace    namespace
// @version      0.1
// @description  description
// @author       tos
// @match       *.torn.com/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
#chatRoot div[class*=trade] div[class^=chat-box-content] {
  position: fixed;
  top: 0;
  left: 0;
  height: 100% !important;
  width: 100% !important;
}
#chatRoot div[class*=trade] div[class^=chat-box-content] div[class^=viewport] {
  height: 100% !important;
  max-height: 100% !important;
}
`)