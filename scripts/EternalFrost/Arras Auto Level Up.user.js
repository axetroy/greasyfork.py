// ==UserScript==
// @name         Arras Auto Level Up
// @namespace    EFdatastuff
// @version      1.0.3
// @description  Levels you up automatically (In enabled gamemodes)
// @author       EternalFrostrOrig (@EternalFrost#0955 /u/PineappleNarwhal)
// @match        http://arras.io/
// @match        http://arras-proxy.surge.sh/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    try {
      var canvas = document.getElementsByTagName('canvas').item(0)
      function doStuff() {
          if (canvas !== undefined && canvas.parent !== undefined) {
            canvas.parent.emit("L")
          }
      }
      setInterval(doStuff, 10)
    } catch(e) {}
})();