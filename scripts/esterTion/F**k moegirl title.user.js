// ==UserScript==
// @name        F**k moegirl title
// @namespace   esterTion
// @description 干掉萌百烦人的反白内容title
// @include     *://*.moegirl.org/*
// @version     2
// @run-at      document-end
// @grant       none
// ==/UserScript==
var script = document.createElement('script');
script.innerText = '(' + function() {
  function main(){
    $('.heimu').each(function(a,i){i.removeAttribute&&i.removeAttribute('title')})
  }
  var observer = new MutationObserver(main);
  observer.observe(document.body, {subtree:true,childList:true});
  main();
}.toString()+')()';

document.head.appendChild(script);