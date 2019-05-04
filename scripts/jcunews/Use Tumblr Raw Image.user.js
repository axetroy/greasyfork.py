// ==UserScript==
// @name         Use Tumblr Raw Image
// @namespace    UseTumblrRawImage
// @version      1.0.13
// @license      GNU AGPLv3
// @description  Changes all Tumblr hosted images to use the raw version or the largest image dimension available
// @author       jcunews
// @homepageURL  https://greasyfork.org/en/users/85671-jcunews
// @match        *://*.tumblr.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {

  //=== CONFIGURATION BEGIN ===

  /*
  If UnrandomizeMainServerHostName is enabled, and when the final image URL points to
  "##.media.tumblr.com" where ## is a random number, it will be replaced with "media.tumblr.com".
  This setting is provided for users which are having a problem accessing those randomized servers from their network.
  */
  var UnrandomizeMainServerHostName = true;

  //=== CONFIGURATION END ===

  var regex  = /^(https?:\/\/)(\d+\.media\.tumblr\.com)(\/[0-9a-f]{32}\/tumblr_(?:inline_)?[0-9A-Za-z]+_(?:r\d+_)?)(\d+)(\.[a-z]+)$/;
  var regex2 = /^(https?:\/\/\d+\.media\.tumblr\.com\/tumblr_[0-9A-Za-z]+_(?:r\d+_)?)(\d+)(\.[a-z]+)$/;
  var hostrx = /^(https?:\/\/)\d+\.(media\.tumblr\.com\/)/;

  function setSrc(ele, url) {
    if (url) {
      ele.utri_skip = 1;
      if (UnrandomizeMainServerHostName) url = url.replace(hostrx, "$1$2");
      if (ele.getAttribute("data-src") === ele.src) ele.setAttribute("data-src", url);
      ele.src = url;
    }
  }

  function tryLoad(ele, url1, url2, i, m, e) {
    i = document.createElement("IMG");
    i.onerror = function() {
      setSrc(ele, url2);
      i.remove();
      e.remove();
    };
    i.onload = function() {
      setSrc(ele, i.src);
      i.remove();
      e.remove();
    };
    i.style.cssText = "position:absolute;z-index:-9999;opacity:.1;visibility:hidden;left:-9999px;top:-9999px;width:1px;height:1px";
    setSrc(i, url1);
    e = document.createElement("DIV");
    e.utri_skip = 1;
    e.textContent = "Optimizing...";
    e.style.cssText = "position:absolute;z-index:9;padding:.1em .5ex .2em .5ex;background:#000;color:#fff;line-height:normal;font-size:8pt;font-weight:normal";
    ele.parentNode.insertBefore(e, ele);
    document.body.appendChild(i);
  }

  function processSrc(ele, match) {
    if ((ele.tagName !== "IMG") || !ele.src || ele.utri_skip) return;
    match = ele.src.match(regex);
    if (match) {
      tryLoad(ele, match[1] + "s3.amazonaws.com/data.tumblr.com" + match[3] + "raw" + match[5], match[4] < 1280 ? match[1] + match[2] + match[3] + "1280" + match[5] : "");
    } else if ((match = ele.src.match(regex2)) && (match[2] < 1280)) {
      tryLoad(ele, match[1] + "1280" + match[3], "");
    }
  }

  function processContainer(container, eles) {
    if (container.nodeType !== Node.ELEMENT_NODE) return;
    eles = container.querySelectorAll('img[src*=".media.tumblr.com/"]');
    processSrc(container);
    eles.forEach(processSrc);
  }

  addEventListener("load", function() {
    processContainer(document.body);
    (new MutationObserver(function(records) {
      records.forEach(function(record) {
        if (record.attributeName === "src") {
          processSrc(record.target);
        } else record.addedNodes.forEach(processContainer);
      });
    })).observe(document.body, { childList: true, attributes: true, subtree: true });
  });

})();
