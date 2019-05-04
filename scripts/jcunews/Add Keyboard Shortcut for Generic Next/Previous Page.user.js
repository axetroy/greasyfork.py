// ==UserScript==
// @name        Add Keyboard Shortcut for Generic Next/Previous Page
// @namespace   AddKeyboardShortcutForGenericNextPreviousPage
// @version     1.0.4
// @license     GNU AGPLv3
// @description Add CTRL+ArrowLeft and CTRL+ArrowRight for generic next/previous page. It will click the last found link whose text starts/ends with e.g. "Next", "Prev", or "Previous".
// @author      jcunews
// @include     *://*/*
// @grant       none
// ==/UserScript==

(function(rxPrev, rxNext) {
  rxPrevious = /^prev(ious)?\b|\bprev(ious)?$/i;
  rxNext = /^next\b|\bnext$/i;

  addEventListener("keydown", function(ev) {

    function clickLink(rx, i, r) {
      for (i = document.links.length-1; i >= 0; i--) {
        if (rx.test(document.links[i].textContent.trim()) || rx.test(document.links[i].getAttribute("rel"))) {
          ev.preventDefault();
          document.links[i].click();
          return true;
        }
      }
      return false;
    }

    if (ev.ctrlKey && !ev.altKey && !ev.shiftKey) {
      if (document.activeElement && (
        (/^(INPUT|TEXTAREA)$/).test(document.activeElement.tagName) ||
        document.activeElement.isContentEditable)) return;
      switch (ev.key) {
        case "ArrowLeft": //previous
          if (clickLink(rxPrevious)) return;
          break;
        case "ArrowRight": //next
          if (clickLink(rxNext)) return;
          break;
      }
    }
  });
})();
