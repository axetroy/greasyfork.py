// ==UserScript==
// @name        BitChute Download Link
// @namespace   http:/Sglmerohbjojnbo
// @description Create Download Links on Bitchute.com
// @include     https://*.bitchute.com/video/*
// @include     https://bitchute.com/video/*
// @version     1.0
// @grant       none
// ==/UserScript==

function flattenTitle(h) {
	h = unescape(h);
	h = h.replace(/\W/g,"_").replace(/\_+/g,"_").replace("_amp_", "_and_");
	while (!h.charAt(0).match(/[a-zA-Z0-9]/i)&&h.length>1) {h = h.substr(1);}
	while (h.length>1&&!h.charAt(h.length-1).match(/[a-zA-Z0-9]/i)) {h = h.substring(0,h.length-1);}
	return(h);
}

var As = document.getElementsByTagName("a");
for (var s=0; s<As.length; s++) {
  if (As[s].href.match(/^magnet/)) {
    var ml = As[s].href;
    var d = ml.split("&as=")[1].split("&")[0];
    var m2 = ml.split("&");
    var lnew = m2[0];
    for (l3=1;l3<m2.length;l3++) {
      var l2 = m2[l3];
      if (l2 !== 'undefined' && l2 !=null ) {
      if (l2.indexOf("tr")!=-1 || l2.indexOf("tr")!=-1 || l2.indexOf("as")!=-1 || l2.indexOf("as")!=-1) {
        var _l1 = l2.split("=")[0];
        var _l2 = encodeURIComponent(l2.split("=")[1]);
        var _lelement = _l1 +"=" + _l2;
      } else {
       var _lelement = l2;
      }
      lnew += "&"+_lelement;
    }}
    break;
  }
  
}

var m = document.createElement("a");
m.setAttribute("href", lnew);
m.setAttribute("id", "mllink");
m.setAttribute("class", "btn btn-success");
m.textContent="Torrent Magnet URI";
m.setAttribute("style", "color:white; font-weight:bold; margin-top:5px; vertical-align:baseline; margin-left:5px;")

var l = document.createElement("a");
l.setAttribute("href", d);
l.setAttribute("id", "dllink");
l.setAttribute("class", "btn btn-success");
l.textContent="Download Video";
l.setAttribute("style", "color:white; font-weight:bold; margin-top:5px; vertical-align:baseline; ")

if (!document.getElementById("dllink")) {
  document.getElementById("nav-top-menu").insertBefore(l, document.getElementById("nav-top-menu").lastChild);
}
if (!document.getElementById("mllink")) {
  document.getElementById("nav-top-menu").insertBefore(m, document.getElementById("nav-top-menu").lastChild);
}

var title = document.getElementById("video-title").textContent.toString();
var p = document.createElement("p");
p.textContent = flattenTitle(title);
p.setAttribute("id", "flat_title");
if (!document.getElementById("flat_title")) {
  document.getElementById("video-title").parentNode.appendChild(p);
}
