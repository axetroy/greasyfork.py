// ==UserScript==
// @name        Custom commands PS!
// @namespace   customcommandsps
// @description Utility userscript to add custom commands in PS! client
// @include     http://play.pokemonshowdown.com/
// @include     https://play.pokemonshowdown.com/
// @include     http://play.pokemonshowdown.com/*
// @include     https://play.pokemonshowdown.com/*
// @include     http://*.psim.us/
// @include     https://*.psim.us/
// @include     http://*.psim.us/*
// @include     https://*.psim.us/*
// @version     1.0.3
// @grant       none
// ==/UserScript==

window.addEventListener('load', function() {
  ConsoleRoom.prototype.customCommands = {};
  ConsoleRoom.prototype.parseCommandOrig = ConsoleRoom.prototype.parseCommand;
  ConsoleRoom.prototype.parseCommand = function(text) {
    var cmd = '';
    var target = '';
    var noSpace = false;
    if (text.substr(0, 2) !== '//' && text.charAt(0) === '/') {
      var spaceIndex = text.indexOf(' ');
      if (spaceIndex > 0) {
        cmd = text.substr(1, spaceIndex - 1);
        target = text.substr(spaceIndex + 1);
      } else {
        cmd = text.substr(1);
        target = '';
        noSpace = true;
      }
    }
    if (this.customCommands[cmd.toLowerCase()]) return this.customCommands[cmd.toLowerCase()](this, target);
    return this.parseCommandOrig(text);
  };
});