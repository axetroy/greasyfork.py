// ==UserScript==
// @name        Disable Google Search Result URL Redirector
// @namespace   DisableGoogleSearchResultURLRedirector
// @version     1.0.8
// @license     GNU AGPLv3
// @description Disable Google URL redirector (i.e. user data tracking) on Google Search result, including Google Custom Search Engine (CSE) which is used by many websites.
// @author      jcunews
// @website     https://greasyfork.org/en/users/85671-jcunews
// @include     *://*/*
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==

(function(createElement_, appendChild_, insertBefore_) {

  //===== CONFIGURATION BEGIN =====

  var disableGoogleAdSense = true;

  //===== CONFIGURATION END =====

  function rwt_() { return true }

  function checkElement(ele, m, obj, fn) {
    if (ele.tagName === "SCRIPT") {
      if (disableGoogleAdSense && (/:\/\/cse\.google\.com\/adsense\/search\/(async-)?ads\.js/).test(ele.src)) {
        return false;
      } else if (m = ele.src.match(/:\/\/www.googleapis.com\/customsearch\/.*callback=([^?]+)/)) {
        obj = unsafeWindow;
        m[1].split(".").forEach(function(k, i, a) {
          if (i < (a.length - 1)) {
            obj = obj[k];
          } else {
            fn = obj[k];
            obj[k] = function(data) {
              data.results.forEach(function(res) {
                delete res.clicktrackUrl;
              });
              return fn.apply(this, arguments);
            };
          }
        });
      }
    }
    return true;
  }

  if ((/www\.google\.[a-z]+(\.[a-z]+)?/).test(location.hostname)) {
    //Google site
    addEventListener("mousedown", function() {
      if (unsafeWindow.rwt && (unsafeWindow.rwt !== rwt_)) unsafeWindow.rwt = rwt_;
    }, true);
    //Google image search site
    let setAttribute = HTMLAnchorElement.prototype.setAttribute;
    HTMLAnchorElement.prototype.setAttribute = function(name, value) {
      if ((name === "href") && !this.dataset_) {
        let a = this, href = value;
        this.dataset_ = this.dataset;
        Object.defineProperty(this, "dataset", {
          value: new Proxy(this.dataset_, {
            set: function(tgt, prop, value, recv) {
              if ((prop === "cthref") && (/^\/url\?/).test(value)) {
                a.href = href;
              } else a.dataset_[prop] = val;
              return true;
            }
          })
        });
      }
      return setAttribute.apply(this, arguments);
    };
  } else {
    //other sites
    appendChild_ = Node.prototype.appendChild;
    Node.prototype.appendChild = function(ele) {
      if (checkElement(ele)) {
        return appendChild_.apply(this, arguments);
      } else return ele;
    };
    insertBefore_ = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function(ele) {
      if (checkElement(ele)) {
        return insertBefore_.apply(this, arguments);
      } else return ele;
    };
  }

})();
