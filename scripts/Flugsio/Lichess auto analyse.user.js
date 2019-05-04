// ==UserScript==
// @name         Lichess auto analyse
// @namespace    http://github.com/flugsio
// @version      0.1
// @description  Automatically request analysis when going to the analysis page.
// @author       flugsio
// @include        /\.lichess\.org\/\w{8}(|\/white|\/black)$/
// @grant none
// ==/UserScript==

function auto_analyse() {
  var button = $("form.future_game_analysis button[type=submit]");
  if (button) {
    button.click();
  }
}

auto_analyse();