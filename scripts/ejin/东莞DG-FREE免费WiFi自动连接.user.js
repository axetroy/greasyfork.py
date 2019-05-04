// ==UserScript==
// @name		东莞DG-FREE免费WiFi自动连接
// @description	每次上网打开网页就能自动连接了。
// @namespace   69550ddb3000bb82684f8c7d0e9a186d
// @include     http://*?wlanacname=*&wlanuserip=*wlanapmac=*wlanuserfirsturl=*
// @include     http://api.yunxingzh.com/*/wifilink.html*
// @author			ejin
// @version     2017.10.16
// @grant        none
// ==/UserScript==

(function() {
	var HTML_Str = document.head.innerHTML + document.body.innerHTML;
	if (HTML_Str.indexOf('<button class="btn pc-btn pc-one-btn">一键登录</button>') != -1 ) {
		setTimeout(function (){
			document.getElementsByClassName("btn pc-btn pc-one-btn")[0].click();
		},1000);
	}
	if ( location.href.indexOf("wifilink.html") != -1 && document.referrer.indexOf("wlanuserfirsturl=") != -1 ) {
		setTimeout(function (){
			if ( document.body.innerHTML.indexOf("已连接东莞无限免费WiFi") != -1 ) {
				var url=document.referrer.split("wlanuserfirsturl=")[1].split("&")[0];
				if ( url.indexOf("?") != -1 ) {
					url=document.referrer.split("wlanuserfirsturl=")[1].split("&wlanacip=")[0];
				}
				location.href=url;
			}
		},10000);
	}
})();