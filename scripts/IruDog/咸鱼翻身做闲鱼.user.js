// ==UserScript==
// @name        咸鱼翻身做闲鱼
// @namespace   xianyu
// @description make XianYu great again
// @license      MIT
// @match       https://2.taobao.com/*
// @match       https://s.2.taobao.com/*
// @match       https://trade.2.taobao.com/*
// @version     7.1
// @grant       none
// ==/UserScript==

/* show search box by WarsFeng */
search_form_html = '<form method="get" action="//s.2.taobao.com/list" name="search" target="_top">' +
      '<input class="input-search" id="J_HeaderSearchQuery" name="q" type="text" value="" placeholder="搜闲鱼" />' +
      '<input type="hidden" name="search_type" value="item" autocomplete="off" />' + 
      '<input type="hidden" name="app" value="shopsearch" autocomplete="off" />';

var a = document.createElement('div');
a.className = 'idle-search';

var idle_header = document.getElementById('J_IdleHeader');
if (idle_header != null) {
  a.innerHTML = search_form_html +
    '<button class="btn-search" type="submit"><i class="iconfont">&#xe602;</i><span class="search-img"></span></button>' +
    '</form>';
  idle_header.appendChild(a);
} else {
  var snav = document.getElementById('J_SiteNavBdR');
  if (snav != null) {
    a.innerHTML = search_form_html + '</form>';
    snav.appendChild(a);
  }
}

var b = document.getElementsByClassName('guide-img');
if (b != null && b.length > 0) {
  b[0].parentNode.innerHTML = ''
}

/* also need to change "list/list.htm" to "list" in the links in the search page */
var search_links = document.getElementsByTagName("a");
for (var i = 0; i < search_links.length; i++) {
  var ln = search_links[i];
  ln.href = ln.href.replace("list/list.htm", "list");
}

/* Thank persmule for providing the method of buying from web! */
var badbuy = document.getElementById("J_BuyNow")
if (badbuy != null)
  badbuy.parentElement.removeChild(badbuy)

var form = document.getElementById('J_FrmBid')
if (form != null) {
  form.innerHTML += '<input name="buy" type="submit" value="buy">'
  form.action = "//buy.taobao.com/auction/buy_now.jhtml"
}