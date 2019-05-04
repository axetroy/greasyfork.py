// ==UserScript==
// @name        taobao_fixed
// @namespace   tbpu
// @include     http://detail.tmall.com/*
// @include     https://detail.tmall.com/*
// @include     *.taobao.com/*
// @version     1.4
// @description 淘寶網址清理
// ==/UserScript==
String.prototype.repeat = function(n) {
  return Array(n + 1).join(this);
};
String.prototype.downcase = function() {
  return this.toLowerCase();
};
String.prototype.upcase = function() {
  return this.toUpperCase();
};
String.prototype.find = function(str) {
  return this.indexOf(str);
};
String.prototype.has = function(str) {
  return (this.indexOf(str)) >= 0;
};
var sPageUrl = window.location.href;
if( sPageUrl.has('item.taobao.com') || sPageUrl.has('detail.tmall.com')  )
{
	var q = sPageUrl.match(/id=(\d+)/)
	if( q.length > 0 ){
		history.replaceState(null, null, 'item.htm?id='+q[1] );
	}
}else if ( sPageUrl.has('s.taobao.com') ){
	
	var query = '';
	if( sPageUrl.has('q=') )
	{
		var q = sPageUrl.match(/q=[^&(!#)]+/);
		query += '?' + q[0];
	}
	if( sPageUrl.has('cat=') ){
		var q = sPageUrl.match(/cat=[\d+]+/);
		query += '&' + q[0];
	}
	if( sPageUrl.has('sort=') ){
		var q = sPageUrl.match(/sort=[^&]+/);
		query += '&' + q[0];
	}
	if( sPageUrl.has('tab=') ){
		var q = sPageUrl.match(/tab=(all|mall|old)/);
		if(q[0] !=='tab=all')
		{
			query += '&' + q[0];
		}
	}
	if( sPageUrl.has('s=') )
	{
		var q = sPageUrl.match(/s=(\d+)+/);
		query += '&' + q[0];
	}
	if( query != '' ){
		history.replaceState(null, null, 'search'+query);
	}
}

document.getElementById('page').addEventListener("DOMNodeInserted", function (e) {
    if( e.target.className == 'tb-content' ){
        var elements = e.target.querySelectorAll('img'); //[data-ks-lazyload]
		for (var i = 0; i < elements.length; i++)
		{
		    elements[i].src = elements[i].getAttribute('data-ks-lazyload');
		    elements[i].removeAttribute('data-ks-lazyload');
		}
    }
}, true);