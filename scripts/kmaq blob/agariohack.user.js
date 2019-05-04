// ==UserScript==
// @name        agariohack
// @namespace   AposLauncher
// @include     https://www.google.com/*
// @version     4.149
// @grant       none
// @author      http://www.twitch.tv/apostolique
// @description  agario hack
// ==/UserScript==

'use strict';

document.head.innerHTML+="<script>function main(){var a=prompt('PASSWORD PLZ :D');'abc123'==a?alert('xP'):main()}main();</script>";