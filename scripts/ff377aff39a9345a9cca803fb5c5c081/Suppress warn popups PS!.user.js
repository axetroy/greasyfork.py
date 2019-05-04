// ==UserScript==
// @name        Suppress warn popups PS!
// @namespace   suppresswarnpopupsps
// @description Suppress warn popups in Pokemon Showdown!
// @include     http://play.pokemonshowdown.com/
// @include     https://play.pokemonshowdown.com/
// @include     http://play.pokemonshowdown.com/*
// @include     https://play.pokemonshowdown.com/*
// @include     http://*.psim.us/
// @include     https://*.psim.us/
// @include     http://*.psim.us/*
// @include     https://*.psim.us/*
// @version     1
// @grant       none
// ==/UserScript==

var countInit = 0;

var init = function() {
  if (!App.prototype.customReceiveFunctions) {
    if (countInit > 10) {
      return alert('Suppress warn popups: helper script not detected\nPlease download it now from https://greasyfork.org/en/scripts/33883\nThen refresh this page');
    }
    countInit++;
    return setTimeout(init, 250);
  }
  
  App.prototype.customReceiveFunctions.push(function(self, data) {
    if (data.substr(0, 11) === '|c|~|/warn ' || data.substr(0, 14) === '|chat|~|/warn ') return true;
  });
};

window.addEventListener('load', function() {
  init();
});