// ==UserScript==
// @name          GBF mbga sidebar remover
// @namespace     LightouchDev
// @description   Remove the annoying left sidebar
// @match         http://game.granbluefantasy.jp/*
// @version       1.0.3
// @grant         none
// @run-at        document-start
// ==/UserScript==

var info = console.log;

var gameWatcher = setInterval(function () {
  if (window.Game) {
    // remove mobage bar
    try {
      if (Game.ua.platformName() === 'mobage') {
        document
          .getElementById(Game.gameContainer.id)
          .setAttribute('data-hide-menubar', 'true');
        // Fix popup position
        Game.ua.hasPcgamecontainerIrregularParent = function(){ return false };
        info('mobage sidebar removed');
        clearInterval(gameWatcher);
      }
    } catch (error) {}
  }
});

// remove watcher if dom ready
addEventListener('DOMContentLoaded', function () {
  clearInterval(gameWatcher);
});
