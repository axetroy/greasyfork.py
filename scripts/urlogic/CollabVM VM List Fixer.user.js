// ==UserScript==
// @name         CollabVM VM List Fixer
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Why isn't it like this in the first place?
// @author       urlogic
// @match        http://computernewb.com/collab-vm/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

setTimeout(`
multicollab("63.141.238.98:6004");
multicollab("63.141.238.98:6005");`,200);

unsafeWindow.tunnel.onstatechange=()=>{};
document.querySelector('#loading').style.display='none';