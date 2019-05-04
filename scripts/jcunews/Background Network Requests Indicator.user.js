// ==UserScript==
// @name        Background Network Requests Indicator
// @namespace   BackgroundNetworkRequestsIndicator
// @description Shows an indicator at bottom right/left when there is one or more background network requests in progress.
// @version     1.0.3
// @license     AGPL v3
// @author      jcunews
// @include     *://*/*
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function(ele, eleStyle, xhrId, xhrCount, xhrOpen, xhrSend) {

  if (!(document instanceof HTMLDocument)) return;

  ele = document.createElement("DIV");
  eleStyle = `
display:block!important; opacity:1!important; visibility:visible!important;
position:fixed!important; z-index:9999999999!important; left:auto!important;
top:auto!important; right:0!important; bottom:0!important; float:none!important;
margin:0!important; box-sizing:content-box!important; border:4px solid #bb0!important;
border-radius:12px!important; padding:0!important; min-width:16px!important;
background:#ff0!important; text-align:center!important;
font:12px/16px sans-serif!important`;
  ele.style.cssText = eleStyle;

  xhrId = xhrCount = 0;

  function checkCursor(ev) {
    if (ev.clientX >= Math.floor(innerWidth / 2)) {
      ele.style.cssText = eleStyle.replace(/left:auto/, "left:0").replace(/right:0/, "right:auto");
    } else ele.style.cssText = eleStyle;
  }

  function checkState() {
    if ((this.readyState >= XMLHttpRequest.HEADERS_RECEIVED) && !ele.parentNode && document.body) {
      document.body.appendChild(ele);
      addEventListener("mousemove", checkCursor);
    }
    if ((this.readyState !== XMLHttpRequest.DONE) || !this.id_bnri) return;
    if (--xhrCount < 0) xhrCount = 0;
    delete this.id_bnri;
    if (xhrCount) {
      ele.textContent = xhrCount;
    } else if (ele.parentNode) {
      removeEventListener("mousemove", checkCursor);
      document.body.removeChild(ele);
    }
  }

  xhrOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
    if (!this.url_bnri) this.addEventListener("readystatechange", checkState);
    this.url_bnri = arguments[1];
    return xhrOpen.apply(this, arguments);
  };

  xhrSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function() {
    if (!this.id_bnri) this.id_bnri = ++xhrId;
    ele.textContent = ++xhrCount;
    if (!ele.parentNode && document.body) {
      document.body.appendChild(ele);
      addEventListener("mousemove", checkCursor);
    }
    return xhrSend.apply(this, arguments);
  };

})();
