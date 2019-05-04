// ==UserScript==
// @name Disable AutoRefresh
// @name:fr Disable AutoRefresh
// @namespace Disable AutoRefresh
// @description Disable AutoRefresh is a user script to override and disable meta refresh html tag on all websites to prevent the automatic refresh or redirection.
// @description:fr Disable AutoRefresh est un user script pour annuler et désactiver le tag html Meta refresh sur tous les sites web et empêcher le rafraîchissement automatique ou la redirection vers une autre page / site web.
// @author SMed79
// @version 2.0
// @encoding utf-8
// @license https://creativecommons.org/licenses/by-nc-sa/4.0/
// @icon http://i.imgur.com/ZJ9mHLO.png
// @twitterURL https://twitter.com/SMed79
// @contactURL http://tinyurl.com/contact-smed79
// @supportURL https://greasyfork.org/fr/scripts/16079-disable-autorefresh/feedback
// @include http://*
// @include https://*
// @run-at document-start
// @grant none
// ==/UserScript==

/*
Example of a immediate redirection. 
http://www.isthe.com/chongo/tech/comp/cgi/zeroredirect.html
<META HTTP-EQUIV="Refresh" content="0; url=cgidemo.html">

Example of a 5 second redirection.
http://www.isthe.com/chongo/tech/comp/cgi/index.html
<META HTTP-EQUIV="Refresh" content="5; url=cgidemo.html">
*/

(function () {
 
  window.addEventListener("DOMContentLoaded", function (event) {
 
    var allMetas,
    thisMeta,
    content,
    timeout,
    timeout_ms,
    rules;
 
    rules = [{
        host : 'moviesvids.blogspot.co.uk',
        timeout : .5
      }
    ];
 
    allMetas = document.getElementsByTagName('meta');
    for (var i = 0; i < allMetas.length; i++) {
      thisMeta = allMetas[i];
 
      if (thisMeta.httpEquiv.match(/refresh/i)) {
        if (thisMeta.content.match(/[\D]/)) {
          content = thisMeta.content.split(';');
          timeout = content[0] - 1;
          rules.forEach(function (rule) {
            if (location.host.indexOf(rule.host) > -1) {
              timeout = rule.timeout;
              return false;
            }
          })
          timeout_ms = (timeout > 0) ? (timeout * 1e3) : 0;
          setTimeout(function () {
            console.log('Redirection stopped after ' + timeout_ms + ' ms');
            window.stop();
          }, timeout_ms);
        }
      }
    }
 
  });
 
})();
