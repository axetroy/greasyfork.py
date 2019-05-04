// ==UserScript==
// @name           东方财富股吧增强功能增强
// @author         九得
// @version        16.06.03
// @description    股吧增加一键圈子，问财功能同步访问.
// @include         http://guba.eastmoney.com/*
// @icon           http://u.thsi.cn/avatar/6460/96036460.gif
// @grant          GM_xmlhttpRequest
// @auther         九得Q:135163
// @namespace      Kanan 
// ==/UserScript==

var locationhref = window.location.href;
if (locationhref.indexOf('guba.eastmoney.com/list')>0){
	var head = document.head || document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	var style = document.createElement('style');
	script.innerHTML  = '';
	var bodywidth=document.body.clientWidth;
	var bodyHeight=$(window).height();
	style.innerHTML = '#AddDiv{position:fixed; width:45%;height:50%;z-index:100;left:0px;top:38px;background:#ffffff;}#AddDiv2{position:fixed; width:45%;height:50%;z-index:100;left:0px;top:50%;background:#ffffff;}.gbbodyAll{margin-left:45%;}';
	head.appendChild(script);
	head.appendChild(style);
	var wc='http://www.iwencai.com/stockpick/search?typed=1&preParams=&ts=1&f=1&qs=index_rewrite&selfsectsn=&querytype=&searchfilter=&tid=stockpick&w='+code;
	var qz='http://t.10jqka.com.cn/guba/'+code+'/';
	var newdiv = '<div class="gbbox2" id="thsgnzq" style="display: block;"><div class="gbboxt">同花顺功能增强</div><div class="gbboxb" align="center"  ><a href="'+wc+'"><img src="http://static1.foolyun.com/public483842/images/sp_index_logo.png"></a><a href="'+qz+'"><img src="http://i.thsi.cn/sns/circle/newcircle/header.20151228.jpg"></a><div id="AddDiv2"><iframe src="'+qz+'" width="100%" height="100%"  frameborder=0></iframe></div><div id="AddDiv"><iframe src="'+wc+'" width="100%" height="100%"  frameborder=0></iframe></div></div></div>'; 
	$("#sider").prepend(newdiv); 
	$(".gbbody").addClass("gbbodyAll");
	$("#rightAD").html(""); 
	$("#feedback").html(""); 
  	$('.dh10').parent().html(""); 
	$("#backtop").html(""); 
}