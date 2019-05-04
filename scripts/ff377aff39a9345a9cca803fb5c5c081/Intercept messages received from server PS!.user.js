// ==UserScript==
// @name        Intercept messages received from server PS!
// @namespace   interceptmessagesps
// @description Intercept messages received from Pokemon Showdown server
// @include     http://play.pokemonshowdown.com/
// @include     https://play.pokemonshowdown.com/
// @include     http://play.pokemonshowdown.com/*
// @include     https://play.pokemonshowdown.com/*
// @include     http://*.psim.us/
// @include     https://*.psim.us/
// @include     http://*.psim.us/*
// @include     https://*.psim.us/*
// @version     1.0.1
// @grant       none
// ==/UserScript==

window.addEventListener('load', function() {
  App.prototype.customReceiveFunctions = [];
  App.prototype.receiveOrig = App.prototype.receive;
  App.prototype.receive = function(data) {
    for (var i = 0; i < this.customReceiveFunctions.length; i++) {
      if (this.customReceiveFunctions[i](this, data)) return;
    }
    return this.receiveOrig(data);
  };
});