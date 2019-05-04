// ==UserScript==
// @description remove primewire fake hosts
// @name     remove primewire fake_hosts
// @include  *primewire.ag*
// @require  https://code.jquery.com/jquery-2.1.3.min.js
// @version     1.1
// @namespace remove primewire fake hosts
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
$('table.movie_version:contains("Sponsor")').hide()
$('table.movie_version:contains("Promo")').hide()
}

// load jQuery and execute the main function
addJQuery(main);     