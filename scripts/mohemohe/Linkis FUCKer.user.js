// ==UserScript==
// @name        Linkis FUCKer
// @namespace   net.ghippos.linkisFucker
// @description FUCKING IDIOT
// @include     http://linkis.com*
// @version     1
// @grant       none
// ==/UserScript==

(function(){
  var classNames = ['orig-link', 'top-link', 'js-source-link'];
  
  for each (var className in classNames) {
    try {
      var origLink = document.getElementsByClassName(className);
      document.location = origLink[0].getAttribute('href');
    }
    catch (e) { }
  }
  
  try {
    var origLink = document.getElementById('source_site');
    document.location = origLink.src;
  }
  catch (e) { }
})();