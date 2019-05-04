// ==UserScript==
// @name         Pinterest - Open Original Image
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  Open the original (largest) image in a new tab by pressing 'z' while hovering over a pin
// @author       Valacar
// @include      https://*.pinterest.tld/*
// @grant        GM_openInTab
// @noframes
// @license      MIT
// @compatible   firefox Firefox
// @compatible   chrome Chrome
// ==/UserScript==

(function() {
  'use strict';

  // Custom key. Only single letters.
  const KEY_TO_OPEN = "z";

  // Immediately switch to new tab?
  // Note: Hold SHIFT key to do the opposite of this (e.g. shift-z)
  const ACTIVATE_NEW_TAB = true;

  function showImage(shouldActivateTab)
  {
    const imageData = getPinImageData();
    if (!(imageData && imageData.orig)) return;
    let imageOrig = imageData.orig;
    if (/\.(?:jpe?g|png|gif|webp)$/.test(imageOrig.url)) {
      GM_openInTab(imageOrig.url, {active: shouldActivateTab});
    }
  }

  function getEventHandler(pin)
  {
    return Object.keys(pin).find(
      prop => prop.startsWith("__reactEventHandlers")
    );
  }

  function getPathToImagesFromChild(obj)
  {
    if (obj && obj.props) {
      if (obj.props.data && obj.props.data.images) {
        return obj.props.data.images;
      }
      if (obj.props.pin && obj.props.pin.images) {
        return obj.props.pin.images;
      }
    }
  }

  function getPinImageData()
  {
    let path, handler;
    const hoveredElements = document.querySelectorAll(':hover');
    let len = hoveredElements.length;
    while (len--) {
      const el = hoveredElements[len];
      if (handler === undefined) handler = getEventHandler(el);
      if (!handler) continue;
      const target = el[handler];
      if (target && target.children) {
        if (Array.isArray(target.children)) {
          for (let child of target.children) {
            path = getPathToImagesFromChild(child);
            if (path) return path;
          }
        } else {
          path = getPathToImagesFromChild(target.children);
          if (path) return path;
        }
      }
    }
  }

  window.addEventListener("keydown",
    function(event) {
      if (event.defaultPrevented ||
        /(input|textarea)/i.test(document.activeElement.nodeName) ||
        document.activeElement.matches('[role="textarea"]'))
      {
        return;
      }
      switch (event.key) {
        case KEY_TO_OPEN.toLowerCase():
          showImage(ACTIVATE_NEW_TAB);
          break;
        case KEY_TO_OPEN.toUpperCase():
          showImage(!ACTIVATE_NEW_TAB);
          break;
        default:
          return;
      }
      event.preventDefault();
    },
    true
  );

})();
