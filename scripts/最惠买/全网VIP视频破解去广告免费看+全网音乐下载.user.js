// ==UserScript==
// @name         全网VIP视频破解去广告免费看+全网音乐下载
// @namespace    http://www.zhmdy.top
// @version      1.21
// @description  本脚本精选解析线路为大家提供优酷、爱奇艺、腾讯、乐视、芒果等各大视频网站视频解析服务，让你省去购买视频VIP费用，同时提供网易云音乐、QQ音乐、酷狗、酷我、虾米、蜻蜓FM、荔枝FM、喜马拉雅等网站音乐免客户端下载和查券功能。
// @author       zuihuimai
// @include      *://v.youku.com/v_*
// @include      *://m.youku.com/v*
// @include      *://m.youku.com/a*
// @include      *://*.iqiyi.com/v_*
// @include      *://*.iqiyi.com/w_*
// @include      *://*.iqiyi.com/a_*
// @include      *://*.iqiyi.com/dianying/*
// @include      *://*.le.com/ptv/vplay/*
// @include      *://*v.qq.com/x/cover/*
// @include      *://*v.qq.com/x/page/*
// @include      *://*v.qq.com/play*
// @include      *://*v.qq.com/cover*
// @include      *://*.tudou.com/listplay/*
// @include      *://*.tudou.com/albumplay/*
// @include      *://*.tudou.com/programs/view/*
// @include      *://*.tudou.com/v*
// @include      *://*.mgtv.com/b/*
// @include      *://film.sohu.com/album/*
// @include      *://tv.sohu.com/*
// @include      *://*.acfun.cn/v/*
// @include      *://*.bilibili.com/video/*
// @include      *://*.bilibili.com/anime/*
// @include      *://*.bilibili.com/bangumi/play/*
// @include      *://vip.pptv.com/show/*
// @include      *://v.pptv.com/show/*
// @include      *://*.baofeng.com/play/*
// @include      *://*.wasu.cn/Play/show*
// @include      *://v.yinyuetai.com/video/*
// @include      *://v.yinyuetai.com/playlist/*
// @include      *://item.taobao.com/*
// @include      *://detail.tmall.com/*
// @include      *://detail.tmall.hk/*
// @include      *://s.taobao.com/*
// @include      *://ai.taobao.com/search/*
// @include      *://list.tmall.com/*
// @include      *://*.liangxinyao.com/*
// @include      *://music.163.com/song*
// @include      *://y.qq.com/n/*
// @include      *://*.kugou.com/song*
// @include      *://*.kuwo.cn/yinyue*
// @include      *://*.xiami.com/*
// @include      *://music.taihe.com/song*
// @include      *://*.1ting.com/player*
// @include      *://music.migu.cn/v*
// @include      *://*.lizhi.fm/*
// @include      *://*.qingting.fm/*
// @include      *://*.ximalaya.com/*
// @exclude      *://*.zhmdy.top/*
// @require      http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @grant        GM_openInTab
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        unsafeWindow
// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
    //is_off
    $.get('https://www.zuihuimai.net/vrhr/loading.php',function(loading_html){
    if(loading_html){
    var head = document.getElementsByTagName('head')[0],
	cssURL = 'https://www.zuihuimai.net/tm/style.css',
	linkTag = document.createElement('link');
	linkTag.id = 'dynamic-style';
	linkTag.href = cssURL;
	linkTag.setAttribute('rel','stylesheet');
	linkTag.setAttribute('media','all');
	linkTag.setAttribute('type','text/css');
	head.appendChild(linkTag);
	var goods_id = getQueryString('id');
	var zhm_url = 'https://www.zuihuimai.net/vrhr/index.php';
	if(goods_id){

		$('#J_LinkBasket').parent().after(loading_html);
		$('.J_LinkAdd').parent().after(loading_html);
		if(window.location.host.search('taobao.com') != -1){
			$('#zhm_table').addClass('zhm_tab_taobao');
		}else{
			$('#zhm_table').addClass('zhm_tab_tmall');
		}

		$.get(zhm_url,{goods_id:goods_id},function(data){
			$('#zhm_div_s').html(data);
			$('#zhm_div_s').html(data);
			if(window.location.host.search('taobao.com') != -1){
				$('#zhm_table').addClass('zhm_tab_taobao');
			}else{
				$('#zhm_table').addClass('zhm_tab_tmall');
			}
		});
	}
    }
    });

	var play_url = window.location.href;
	var arr = new Array();
	arr = play_url.split('?')
	var get_url = arr[0];
	if(get_url.indexOf('zhmdy.top') == -1){
		var jx_title=new Array()
		jx_title[0]="youku.com"
		jx_title[1]="iqiyi.com"
		jx_title[2]="le.com"
		jx_title[3]="qq.com"
		jx_title[4]="tudou.com"
		jx_title[5]="mgtv.com"
		jx_title[6]="sohu.com"
		jx_title[7]="acfun.cn"
		jx_title[8]="bilibili.com"
		jx_title[9]="pptv.com"
		jx_title[10]="baofeng.com"
		jx_title[11]="yinyuetai.com"
		jx_title[12]="wasu.cn"
		var title_result = false;
		for(var n=0;n<jx_title.length;n++){
			if(get_url.indexOf(jx_title[n])!= -1){
				var zhm_html = "<div href='javascript:void(0)' target='_blank' id='zhm_jx_url' style='cursor:pointer;z-index:98;display:block;width:30px;height:30px;line-height:30px;position:fixed;left:0;top:300px;text-align:center;overflow:visible'><img src='https://www.zuihuimai.net/images/vip.gif' height='55' ></div>";
				$("body").append(zhm_html);
			}
		}
		$("#zhm_jx_url").click(function(){
			var play_jx_url = window.location.href;
			window.open('http://www.zhmdy.top/index.php?zhm_jx='+play_jx_url);
		});
		var music_title=new Array()
		music_title[0]="163.com"
		music_title[1]= "y.qq.com"
		music_title[2]= "kugou.com"
		music_title[3]= "kuwo.cn"
		music_title[4]= "xiami.com"
		music_title[5]= "taihe.com"
		music_title[6]= "1ting.com"
		music_title[7]= "migu.cn"
		music_title[8]= "qingting.fm"
		music_title[9]= "lizhi.fm"
		music_title[10]= "ximalaya.com"
		for(var i=0;i<music_title.length;i++){
			if(get_url.indexOf(music_title[i])!= -1){
				var music_html = "<div href='javascript:void(0)' id='zhm_music_url' style='cursor:pointer;z-index:98;display:block;width:30px;height:30px;line-height:30px;position:fixed;left:0;top:300px;text-align:center;'><img src='https://www.zuihuimai.net/images/vip.gif' height='55' ></div>";
				$("body").append(music_html);
			}
		}
		$("#zhm_music_url").click(function(){
			var music_jx_url = encodeURIComponent(window.location.href);
			window.open('http://www.zhmdy.top/music/?url='+music_jx_url);
		});
	}
	//获取url参数;
	function getQueryString(e) {
		var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
		var a = window.location.search.substr(1).match(t);
		if (a != null) return a[2];
		return "";
	}
})();