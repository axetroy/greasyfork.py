// ==UserScript==
// @name        Anti-Adblock-Harassment-for-golem.de
// @namespace   anti-adblock-harassment-for-golem-de
// @description This script makes the pages of golem.de usable again for people with adblockers installed.
// @include     http://www.golem.de/*
// @include     http://forum.golem.de/*
// @include     https://www.golem.de/*
// @include     https://forum.golem.de/*
// @version     0.2
// @grant       none
// ==/UserScript==

var className       = "formatted";
var identifyingText = "ADBLOCKER ERKANNT"

//adblocker warning is not present on load; injected at a later point in time, so scan content every 500 milliseconds
theInterval = window.setInterval(main, 500);

function main() {
  var rootWrapper = document.getElementsByTagName("article");

  if (rootWrapper.length != 0) {
    element = rootWrapper[0];
    style = window.getComputedStyle(element);
    filter = style.getPropertyValue("filter");

    if (filter.substring(0, 4).toLowerCase() == "blur") {
      element.style = "background: url('data:image/png;base64,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')";

      for each (elm in document.getElementsByClassName(className)) {
        if (elm.innerHTML.contains(identifyingText)) {
          elm.parentNode.removeChild(elm);
        }
      }

	  //harassment is removed, so stop scanning
      clearInterval(theInterval);
    }
  }
}
