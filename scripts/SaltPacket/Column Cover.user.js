// ==UserScript==
// @name         Column Cover
// @namespace    SaltPacket
// @version      1.0.0
// @description  Fills the available space with columns.
// @author       SaltPacket
// @match        https://tweetdeck.twitter.com/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
.app-columns {
  display: flex;
}
.app-columns > .column {
  flex-grow: 1;
  flex-shrink: 0;
}
`)