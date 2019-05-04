// ==UserScript==
// @name        github no header-dark
// @description seamlessly remove .header-dark on github
// @namespace   ntauthority.me
// @include     https://github.com/*
// @include     https://gist.github.com/*
// @run-at      document-start
// @version     1
// @require     https://greasyfork.org/scripts/12228/code/setMutationHandler.js
// @grant       none
// ==/UserScript==
setMutationHandler(document, 'div.header-dark', function(nodes)
{
  this.disconnect();
  const obj = document.querySelector('div.header-dark');
  obj.classList.remove('header-dark');
});
