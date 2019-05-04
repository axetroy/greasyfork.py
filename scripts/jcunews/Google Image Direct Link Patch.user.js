// ==UserScript==
// @name        Google Image Direct Link Patch
// @namespace   GoogleImageDirectLinkPatch
// @description Make clicking on image bottom panel go directly to the image in a Google Image search result. Use SHIFT+Click to open image in a new tab.
// @version     1.1.5
// @license     AGPL v3
// @author      jcunews
// @include     /^https:\/\/www\.google\.(co\.)?[a-z]{2,3}\/search.*tbm=isch/
// @include     /^https:\/\/www\.google\.com(\.[a-z]{2,3})?\/search.*tbm=isch/
// @grant       none
// ==/UserScript==

//*** Settings Start ***
var bottomPanelBackgroundColor = "rgba(51,51,51,0.8)"; //"rgba(51,51,51,0.8)" is the default. Alpha (4th number) is the opacity level.
var bottomPanelFontColor       = "#FFF";               //"#FFF" is the default.
var bottomPanelFontSize        = "11px";               //"11px" is the default. Can be e.g. "9pt" for size in Points.
var bottomPanelFontWeight      = "normal";             //"normal is the default. Can be "bold".
//*** Settings End ***

//add bottom panel style override
var ele = document.createElement("STYLE");
ele.innerHTML = ".rg_ilmbg,a.rg_ilmbg:link,a.rg_ilmbg:visited{background-color:" + bottomPanelBackgroundColor + ";color:" + bottomPanelFontColor + ";font-size:" + bottomPanelFontSize + ";font-weight:" + bottomPanelFontWeight + "}";
document.body.appendChild(ele);

//add the click handler to the direct image
document.addEventListener("click", function(ev) {
  var ele = ev.target, url;
  if (!ev.button && (ele.tagName === "A") && ele.classList.contains("rg_ilmbg")) {
    if (ev.stopImmediatePropagation) {
      ev.stopImmediatePropagation();
    }
    if (ev.stopPropagation) {
      ev.stopPropagation();
    }
    ev.preventDefault();
    if (ev.shiftKey) {
      window.open(ele.href);
    } else {
      window.location.href = ele.href;
    }
  }
}, true);

//add direct image URL to the image bottom panel
document.addEventListener("mouseover", function(ev) {
  var panel = ele = ev.target, css, url, link;
  if ((ele.className === "rg_ilmbg") && (panel.tagName !== "A") && ele.parentNode) {
    css = ele.style.cssText;
    ele = ele.parentNode;
    url = ele.search.match(/imgurl=([^&]+)/);
    if (url) {
      url = decodeURIComponent(url[1]);
      link = document.createElement("A");
      link.href = url;
      link.className = "rg_ilmbg";
      link.innerHTML = panel.innerHTML;
      link.style.cssText = css;
      panel.parentNode.replaceChild(link, panel);
    }
  }
}, true);
