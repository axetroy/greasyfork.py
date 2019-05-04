// ==UserScript==
// @name        Automatically block challenges PS!
// @namespace   automaticallyblockchallengesps
// @description Automatically use /bch on page load
// @include     http://play.pokemonshowdown.com/
// @include     https://play.pokemonshowdown.com/
// @include     http://play.pokemonshowdown.com/*
// @include     https://play.pokemonshowdown.com/*
// @include     http://*.psim.us/
// @include     https://*.psim.us/
// @include     http://*.psim.us/*
// @include     https://*.psim.us/*
// @version     1.0.2
// @grant       none
// @run-at      document-end
// ==/UserScript==

window.addEventListener('load', function() {
  app.on('init:socketopened', function() {
    setTimeout(function() {
      app.send('/bch');
    }, 2500);
  }, this);
});