// ==UserScript==
// @name         New Userscript
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http://www.runacap.com/
// @grant        none
// @namespace http://tampermonkey.net/
// ==/UserScript==

(function() {
    'use strict';

    var script = document.createElement('script');
    script.src="http://widget.happydesk.ru/widget.js";
    document.body.appendChild(script);

    script = document.createElement('script');
    script.innerHTML = 'document.addEventListener("DOMContentLoaded", function(event) {\
  Happydesk.initChat({clientId: 207}, {\
        page_url: window.location.href,\
        user_agent: window.navigator.userAgent,\
        language: "ru"\
    });\
});';
    document.body.appendChild(script);
})();