// ==UserScript==
// @name         CHH论坛 坟贴提醒
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  CHH论坛坟贴提醒
// @author       xingxing
// @match        https://www.chiphell.com/thread-*
// @grant        none
// ==/UserScript==

;(function() {

  'use strict';

  let expirationDays = 15; //坟贴天数
  let expirationDate = expirationDays * 24 * 60 * 60 * 1000;
  let postDate = document.querySelector('.authi em').textContent
                  .split(' ').splice(1,2).join(' ');
  let tipText = `…这可能是超过${expirationDays}天的坟贴，请确认后回复！`;

  if(Date.now() - Date.parse(new Date(postDate)) >= expirationDate){
    let node = document.createElement('b');
    node.textContent = tipText;
    node.style.color = 'red';
    document.querySelector('#thread_subject').appendChild(node);
    document.querySelector('#fastposteditor textarea').placeholder = tipText;
  }

})();