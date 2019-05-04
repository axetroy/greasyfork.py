// ==UserScript==
// @name        Keyboard shortcuts for Cube Timer
// @namespace   cubetimer
// @description Adds keyboard shortcuts to clear the last time or all the times
// @include     http://www.cubetimer.com/
// @author      SoKeT
// @version     1
// ==/UserScript==

$(document).keydown(function(e) {
  if (e.which === 46) { //Esc
    $("#elapsed_time").text("00:00.00");
    remove_time(time_list.length - 1);
  }
  else if (e.which === 27) { //Del
    clear_times();
  }
});
