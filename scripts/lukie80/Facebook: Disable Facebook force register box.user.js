// ==UserScript==
// @name           Facebook: Disable Facebook force register box
// @namespace      https://greasyfork.org/de/scripts/21545
// @description    This script removes the annoying force regicter box for non-facebook users

// @include        *.facebook.*/*
// @run-at         document-end

// @author         lukie80
// @copyright      Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @version        2.0
// @lastupdated    2016.06.15

// ==/UserScript==
//-------------------------------------------------------------------------------------------------------------------

//execute on first run
if (document.getElementsByClassName("_5hn6")[0]){
  document.getElementsByClassName("_5hn6")[0].remove();
}

//add event listener for dynamic creation
document.addEventListener("DOMNodeInserted", function(eventHandler) {
  if (eventHandler.target.className=="_5hn6"){
      document.getElementsByClassName("_5hn6")[0].remove();
      //alert("fired");
  }
}, false);

//-------------------------------------------------------------------------------------------------------------------