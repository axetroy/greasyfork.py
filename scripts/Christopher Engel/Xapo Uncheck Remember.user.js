// ==UserScript==
// @name         Xapo Uncheck Remember
// @namespace    http://your.homepage/
// @version      0.1
// @description  Simple script to uncheck box that Xapo checks by default to remember device
// @author       Christopher ENgel
// @match        https://account.xapo.tld/*
// @grant        none
// ==/UserScript==

var chkbox = document.getElementById('remember-computer');
chkbox.removeAttribute('checked');
