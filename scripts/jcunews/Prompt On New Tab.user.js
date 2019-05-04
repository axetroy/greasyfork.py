// ==UserScript==
// @name         Prompt On New Tab
// @namespace    https://greasyfork.org/en/users/85671-jcunews
// @version      1.2.17
// @license      GNU AGPLv3
// @description  Display a confirmation dialog when the site wants to open a new tab, so that user has the chance to cancel or allow it to open in a new or current tab. This script won't work if the user opens a link in a new tab using web browser's "Open in a new tab", "Open in background tab", or similar which are web browser internal or browser extension features.
// @author       jcunews
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function(open_, submit_, wael, ele) {

  //===== CONFIGURATION BEGIN =====

  /*
  Information about rejectList and allowList can be found on below URL.
  https://greasyfork.org/en/scripts/38392-prompt-on-new-tab
  */

  var rejectList = [
    ["*", "*://*.doubleclick.net/*"],
    ["*", /^https?:\/\/[^.]+\.adservices?\.com\//i],
    ["*://site.com/*", /^.*?:\/\/site\.com\/(offer|popup)/i]
  ];

  var allowList = [
    ["*://www.bing.com/*", "*"],
    ["*://www.google.*/*", "*://*.google.*/*"]
  ];

  //If promptToOpenInCurrentTab is enabled, when the confirmation dialog is shown and the user chose Cancel,
  //an additional confirmation dialog will be shown to confirm whether the URL should be opened in current tab or not.
  var promptToOpenInCurrentTab = true;

  //===== CONFIGURATION END =====

  [rejectList, allowList].forEach(function(list) {
    list.forEach(function(pair) {
      pair.forEach(function(str, i) {
        if (("string" === typeof str) || (str instanceof String)) {
          pair[i] = new RegExp("^" + str.replace(/([(){}\[\]\\^$.+?|])/g, "\\$1").replace(/([*])/g, ".*?") + "$", "i");
        }
      });
    });
  });

  function checkUrl(target, curUrl) {
    function checkUrlPair(pair) {
      if (pair[0].test(curUrl) && pair[1].test(target)) return true;
    }

    curUrl = location.href;
    if (rejectList.some(checkUrlPair)) {
      return -1;
    } else if (allowList.some(checkUrlPair)) {
      return 1;
    } else return 0;
  }

  function getFrameNames(wnd, fs, r) {
    function doEle(ele, n, i, z) {
      try {
        n = ele.tagName;
      } catch(z) {
        n = "";
      }
      if (fs.indexOf(n) >= 0) {
        try {
          r.push(ele.name);
        } catch(z) {}
      } else if (n) {
        for (i = ele.childElementCount-1; i >= 0; i--) {
          try {
            n = ele.children[i].tagName;
          } catch(z) {
            n = "";
          }
          if (fs.indexOf(n) >= 0) {
            try {
              r.push(ele.children[i].name);
            } catch(z) {}
          } else if (n) {
            doEle(ele.children[i]);
          }
        }
      }
    }
    fs = ["IFRAME", "FRAME"];
    try {
      r = [];
      doEle(wnd.document.body);
      return r;
    } catch(r) {
      return [];
    }
  }

  function dummy(){}

  function isExistingFrameName(name) {
    return (!name || ["_parent", "_self", "_top"].indexOf(name) >= 0) || (getFrameNames(window).indexOf(name) >= 0);
//    return (!name || ["_parent", "_self", "_top"].indexOf(name) >= 0) || (getFrameNames(window).indexOf(name) >= 0) || (getFrameNames(window.top).indexOf(name) >= 0);
  }

  open_ = window.open;
  window.open = function(url, name) {
    var loc = {};
    if (isExistingFrameName(name)) {
      return open_.apply(this, arguments);
    } else switch (checkUrl(url)) {
      case 1:
        return open_.apply(this, arguments);
      case 0:
        if (confirm("This site wants to open a new tab.\nDo you want to allow it?\n\nURL:\n" + url)) {
          return open_.apply(this, arguments);
        } else if (promptToOpenInCurrentTab && confirm("URL:\n" + url + "\n\nDo you want to open it in current tab instead?")) {
          name = "_top";
          return open_.apply(this, arguments);
        }
    }
    return {
      document: {
        close: dummy,
        location: loc,
        open: dummy,
        write: dummy
      },
      location: loc
    };
  };

  function reject(ev) {
    if (!ev || !ev.preventDefault) return;
    ev.preventDefault();
    ev.stopPropagation();
    ev.stopImmediatePropagation();
  }

  function actionCheckUrl(ele, url, msg, ev) {
    switch (checkUrl(url)) {
      case 0:
        if (!confirm(msg + "\nDo you want to allow it?\n\nURL:\n" + url)) {
          if (promptToOpenInCurrentTab && confirm("URL:\n" + url + "\n\nDo you want to open it in current tab instead?")) {
            ele.target = "_top";
            break;
          }
          reject(ev);
          return false;
        } else break;
      case -1:
        reject(ev);
        return false;
    }
    return true;
  }

  function onFormSubmit(ev) {
    if ((/^https?:/).test(this.action) && !isExistingFrameName(this.target) &&
       !actionCheckUrl(this, this.action, "This site wants to submit a form in a new tab.")) return;
    return submit_.apply(this, arguments);
  }
  submit_ = HTMLFormElement.prototype.submit;
  HTMLFormElement.prototype.submit = onFormSubmit;

  function windowSubmit(ev){
    if (!ev.defaultPrevented && (/^https?:/).test(ev.target.action) && !isExistingFrameName(ev.target.target)) {
      return actionCheckUrl(ev.target, ev.target.action, "This site wants to submit a form in a new tab.", ev);
    }
  }
  addEventListener("submit", windowSubmit);

  function onAnchorClick(ev) {
    if ((/^(?:f|ht)tps?:/).test(this.href) && !isExistingFrameName(this.target)) {
      return actionCheckUrl(this, this.href, "This site wants to open a new tab.", ev);
    }
    return;
  }

  function windowClick(ev, a){
    if (ev.button || !(a = ev.target) || ev.defaultPrevented) return;
    if (a.tagName === "A") {
      return onAnchorClick.call(a, ev);
    } else {
      while (a = a.parentNode) {
        if (a.tagName === "A") return onAnchorClick.call(a, ev);
      }
    }
  }
  addEventListener("click", windowClick);

  wael = window.addEventListener;
  window.addEventListener = function(type, fn) {
    var res = wael.apply(this, arguments);
    if (type === "click") {
      removeEventListener("click", windowClick);
      wael("click", windowClick);
    } else if (type === "submit") {
      removeEventListener("click", windowSubmit);
      wael("submit", windowSubmit);
    }
    return res;
  };

})();
