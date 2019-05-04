// ==UserScript==
// @description Removes ads in Yandex search results ("Реклама")
// @name     hide ads on yandex
// @include  *yandex.ru*
// @require  https://code.jquery.com/jquery-2.1.3.min.js
// @version     1.1
// @namespace mapx_hide_yandex_ads
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://code.jquery.com/jquery-2.1.3.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
$('div.serp-item:contains("Реклама")').hide()
}

// load jQuery and execute the main function
addJQuery(main);      