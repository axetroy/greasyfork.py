// ==UserScript==
// @name        Bing Image Direct Link Patch
// @namespace   BingImageDirectLinkPatch
// @description Make CTRL+Click on image thumbnail go directly to the image in a Bing Image search result. Use CTRL+SHIFT+Click to open image in a new tab.
// @author      jcunews
// @include     https://www.bing.com/images/search*
// @version     1.0.1
// @grant       none
// ==/UserScript==

//add direct image URL to the image bottom panel
document.addEventListener("click", function(ev) {
  var base, ele = ev.target, url, link, z;
  if (!ev.button && ev.ctrlKey && ele.classList.contains("mimg")) try {
    base = ele.parentNode.parentNode.parentNode.parentNode;
    url = JSON.parse(base.querySelector(".iusc").getAttribute("m")).murl;
    if (ev.shiftKey) {
      open(url, "bidlp" + (new Date()).valueOf());
    } else {
      location.href = url;
    }
    ev.preventDefault();
    ev.stopPropagation();
    ev.stopImmediatePropagation();
  } catch (z) {}
}, true);
