// ==UserScript==
// @name        Google Tools Button Clicker
// @name:ja     Google Tools Button Clicker
// @namespace   knoa.jp
// @description Automatically clicks Tools button on Google search.
// @description:ja Google検索結果のページでツールボタンを自動的にクリックします。
// @include     https://www.google.*/search*
// @version     1.2
// @grant       none
// ==/UserScript==

(function(){
  let click = function(){
    let ae = document.activeElement;
    let tool = document.querySelector('#hdtb-tls:not(.hdtb-tl-sel)');
    if (tool) tool.click(), ae.focus();
  }
  if(document.hidden) window.addEventListener('focus', click, {once: true});
  else window.addEventListener('load', setTimeout.bind(null, click, 10));
})();
