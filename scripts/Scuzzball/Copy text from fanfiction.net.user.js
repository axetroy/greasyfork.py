// ==UserScript==
// @name         Copy text from fanfiction.net
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Allow copy from fanfiction.net
// @author       scuzz
// @match        https://www.fanfiction.net/s*
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutationRecord) {
      var elementStyle = document.getElementById('storytextp').style;
      if (elementStyle['-webkit-touch-callout'] != 'text' || elementStyle['-webkit-user-select'] != 'text' || elementStyle['-khtml-user-select'] != 'text' || elementStyle['-moz-user-select'] != 'text' || elementStyle['-ms-user-select'] != 'text' || elementStyle['user-select'] != 'text') {
        elementStyle['-webkit-touch-callout'] = 'text';
        elementStyle['-webkit-user-select'] = 'text';
        elementStyle['-khtml-user-select'] = 'text';
        elementStyle['-moz-user-select'] = 'text';
        elementStyle['-ms-user-select'] = 'text';
        elementStyle['user-select'] = 'text';
        console.log('Fuck you ff net');
      }
    });
  });
  var target = document.getElementById('storytextp');
  observer.observe(target, {
    attributes: true,
    attributeFilter: [
      'style'
    ]
  });
  setUserSelectText(document.getElementById('storytextp').style);
}) ();
