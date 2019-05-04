// ==UserScript==
// @name         Add 'Google' button to duckduckgo.com
// @description  Adds a 'Google' button below the search box to repeat the search at google
// @encoding     utf-8
// @namespace    google_button_duckduckgo
// @match        *://duckduckgo.com/*
// @grant        none
// @run-at       document-end
// @version 0.0.1.20190401105002
// ==/UserScript==


(function() {
  console.log('running');
  function searchOnGoogle() {
    var searchString = document.getElementById('search_form_input').value;
    document.location = "https://google.com/search?q=" + encodeURIComponent(searchString);
  }
  var elem = document.getElementsByClassName("header__content  header__search")[0];
  if (elem && !document.getElementById('search_on_google')) {
    var div = document.createElement('div');
    div.id='search_on_google';
    var button = document.createElement('button');
    button.innerText = 'Google';
    button.onclick = searchOnGoogle
    div.appendChild(button);
    elem.appendChild(div);
  }
})();
