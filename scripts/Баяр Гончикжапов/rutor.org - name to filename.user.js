// ==UserScript==
// @name        rutor.org - name to filename
// @namespace   bayarookie
// @description create tag H2, sort comments reverse
// @include     http://ru-free-tor.org/torrent/*
// @include     http://zerkalo-rutor.org/torrent/*
// @include     http://free-rutor.org/torrent/*
// @include     http://fast-bit.org/torrent/*
// @include     http://film-tor.org/torrent/*
// @include     http://top-tor.org/torrent/*
// @version     1.3
// @grant       none
// ==/UserScript==

function create_h2(s) {
  document.title = s;
  s = s.replace(/[:\\\/?]/g, ".");
  s = s.replace(/[']/g, "`");
  s = s.replace(/(50\/50)/g, "50на50");
  s = s.replace(/(\| )/g, "");
  s = s.trim();
  var e_h2 = document.createElement("h2");
  var t_h2 = document.createTextNode(s);
  e_h2.appendChild(t_h2);
  all.insertBefore(e_h2, all.children[2]);
}

var e_h1 = document.getElementsByTagName('h1')[0];
var s_h1 = e_h1.firstChild.data;
s_h2 = s_h1;
var pos1 = s_h1.indexOf("/");
if (pos1 > 0) {
  var sub1 = s_h1.slice(0, pos1);
  var pos2 = s_h1.indexOf("(");
  var sub2 = s_h1.slice(pos1 + 1, pos2);
  var s_h2 = sub2.trim() + " (" + sub1.trim() + ")";
  if (pos2 > 0) {
    var pos3 = s_h1.indexOf(")");
    var sub3 = s_h1.slice(pos2 + 1, pos3);
    s_h2 = s_h2 + " " + sub3;
    if (pos3 > 0) {
      s_h2 = s_h2 + s_h1.slice(pos3 + 1);
    }
  }
}
if (s_h1.indexOf("VA") === 0 || s_h1.indexOf("V.A.") === 0 || s_h1.indexOf("Сборник") === 0 || s_h1.indexOf("Various Artists") === 0) {
  var pos1 = s_h1.indexOf("(");
  if (pos1 > 0) {
    s_h2 = "VA - ";
    var pos2 = s_h1.indexOf(")");
    var sub1 = s_h1.slice(pos1 + 1, pos2);
    var d = new Date();
    if (sub1 == d.getFullYear()) {
      var m = d.getMonth() + 1;
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      var c = d.getDate();
      if (c.toString().length == 1) {
        c = "0" + c;
      }
      sub1 = sub1 + "." + m + "." + c;
    } else if (sub1.indexOf(".") > 0) {
      var pdt1 = sub1.indexOf(".");
      var sdt1 = sub1.slice(0, pdt1);
      var pdt2 = sub1.indexOf(".", pdt1 + 1);
      var sdt2 = sub1.slice(pdt1 + 1, pdt2);
      sub1 = sub1.slice(pdt2 + 1) + "." + sdt2 + "." + sdt1;
    }
    if (s_h1.indexOf("VA") === 0) {i = 5;}
    else if (s_h1.indexOf("V.A.") === 0) {i = 7;}
    else if (s_h1.indexOf("Various") === 0) {i = 18;}
    else {i = 10;}
    s_h2 = s_h2 + sub1 + " - " + s_h1.slice(i, pos1);
  }
}
if (s_h1.indexOf("PC |") > 0) {
  s_h2 = s_h1.replace(/(PC \| )/g, "");
}
create_h2(s_h2);


//Обратная сортировка по дате
function process()
{
    if (arguments.callee.done) return;
    arguments.callee.done = true;
	//process comments begin
	var trs = document.getElementsByClassName('c_h');
	var tbody = trs[0].parentNode;
	var count = tbody.childElementCount - 6;
	for(var i = count; i > -1; i = i - 3)
	{
		tbody.appendChild(tbody.childNodes[i]);
		tbody.appendChild(tbody.childNodes[i]);
		tbody.appendChild(tbody.childNodes[i]);
	} //process comments end
}

// Set event for firefox, opera
if (document.addEventListener)
{
    document.addEventListener("DOMContentLoaded", process, false);
}

// Set event for ie
/*@cc_on @*/
/*@if (@_win32)
document.write("<script id=__ie_onload defer src=javascript:void(0)>");
document.write("<\/script>");
var script = document.getElementById("__ie_onload");
script.onreadystatechange = function()
{
    if (this.readyState == "complete")
    {
        process();
    }
};
/*@end @*/

// Set event for safari
if (/WebKit/i.test(navigator.userAgent))
{
    var _timer = setInterval(function()
    {
        if (/loaded|complete/.test(document.readyState))
        {
            clearInterval(_timer);
            delete _timer;
            process();
        }
    }, 10);
}

// Set event for other browsers
window.onload = process;
