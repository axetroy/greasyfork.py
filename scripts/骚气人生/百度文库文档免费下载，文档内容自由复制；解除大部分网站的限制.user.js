// ==UserScript==
// @name         百度文库文档免费下载，文档内容自由复制；解除大部分网站的限制
// @namespace    crack_vip_document_dissertation
// @version      1.0.7
// @description  可下载百度文库免费文档和需要下载券的文档，不能下载付费文档；自由复制百度文库文档中的内容；解除知乎、360doc、百度阅读、17k、文起书院、逐浪、红薯网等大部分网站复制、剪切、选择文本、右键菜单的操作限制。（注：本脚本下载调用第三方网站数据，该网站首次下载文档需要关注微信公众号）
// @author       crack_vip_document_dissertation_broom
// @icon 		 data:image/png;base64,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
// @include      *://wenku.baidu.com/view/*
// @include      *://www.wocali.com/tampermonkey/doc/download
// @include      *://api.ebuymed.cn/ext/*
// @include      *://www.ebuymed.cn/
// @include      *://pan.baidu.com/s/*
// @include      *://yun.baidu.com/s/*
// @include      *://pan.baidu.com/share/init*
// @include      *://yun.baidu.com/share/init*
// @include      *://www.zhihu.com/*
// @include      *://www.bilibili.com/read/*
// @include      *://b.faloo.com/*
// @include      *://bbs.coocaa.com/*
// @include      *://book.hjsm.tom.com/*
// @include      *://book.zhulang.com/*
// @include      *://book.zongheng.com/*
// @include      *://book.hjsm.tom.com/*
// @include      *://chokstick.com/*
// @include      *://chuangshi.qq.com/*
// @include      *://yunqi.qq.com/*
// @include      *://city.udn.com/*
// @include      *://cutelisa55.pixnet.net/*
// @include      *://huayu.baidu.com/*
// @include      *://tiyu.baidu.com/*
// @include      *://yd.baidu.com/*
// @include      *://yuedu.baidu.com/*
// @include      *://imac.hk/*
// @include      *://life.tw/*
// @include      *://luxmuscles.com/*
// @include      *://read.qidian.com/*
// @include      *://www.15yan.com/*
// @include      *://www.17k.com/*
// @include      *://www.18183.com/*
// @include      *://www.360doc.com/*
// @include      *://www.eyu.com/*
// @include      *://www.hongshu.com/*
// @include      *://www.coco01.com/*
// @include      *://news.missevan.com/*
// @include      *://www.hongxiu.com/*
// @include      *://www.imooc.com/*
// @include      *://www.readnovel.com/*
// @include      *://www.tadu.com/*
// @include      *://www.jjwxc.net/*
// @include      *://www.xxsy.net/*
// @include      *://www.z3z4.com/*
// @include      *://yuedu.163.com/*
// @connect 	 www.quzhuanpan.com
// @connect		 pan.baidu.com
// @connect		 yun.baidu.com
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_download
// @grant        GM_addStyle
// @require      http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @require      https://greasyfork.org/scripts/376804-intelligent-weight/code/Intelligent_weight.js?version=684520
// @run-at       document-end
// @compatible	 Chrome
// @compatible	 Firefox
// @compatible	 Edge
// @compatible	 Safari
// @compatible	 Opera
// @compatible	 UC
// @license      LGPLv3
// ==/UserScript==

(function() {
	'use strict';	
    var $ = $ || window.$;
    var window_url = window.location.href;
    var website_host = window.location.host;
    
    var analysis={};
    analysis.judge=function(){
    	if(website_host.indexOf("wenku.baidu.com")!=-1){
    		return true;
    	}
    	return false;
    };
    analysis.addHtml=function(){
    	if(analysis.judge()){
    		//左边图标
	    	var topBox = "<div style='position:fixed;z-index:999999;background-color:#ccc;cursor:pointer;top:200px;left:0px;'>"+
							"<div id='crack_vip_document_box' style='font-size:13px;padding:10px 2px;color:#FFF;background-color:#25AE84;'>下载</div>"+
							"<div id='crack_vip_search_wenku_box' style='font-size:13px;padding:10px 2px;color:#FFF;background-color:#DD5A57;'>网盘</div>"+
							/*"<div id='crack_vip_search_wangpan_box' style='font-size:13px;padding:10px 2px;color:#FFF;background-color:#357EFD;'>网盘</div>"+*/
							"<div id='crack_vip_copy_box' style='font-size:13px;padding:10px 2px;color:#FFF;background-color:#FE8A23;'>复制</div>"+
					 	 "</div>";
			$("body").append(topBox);			
	    	var searchWord = "";
	    	if("wenku.baidu.com"===website_host){
	    		if($("#doc-tittle-0").length!=0){
	    			searchWord = $("#doc-tittle-0").text();
	    		}else if($("#doc-tittle-1").length!=0){
	    			searchWord = $("#doc-tittle-1").text();
	    		}else if($("#doc-tittle-2").length!=0){
	    			searchWord = $("#doc-tittle-2").text();
	    		}else if($("#doc-tittle-3").length!=0){
	    			searchWord = $("#doc-tittle-3").text();
	    		}
	    	}
	    	
	    	//为每一页添加复制按钮
			var onePageCopyContentHtml = '<div class="copy-one-page-text" style="float:left;padding:3px 10px;background:green;z-index:999;position:relative;top:60px;color:#fff;background-color:#FE8A23;font-size:14px;cursor:pointer;">获取此页面内容</div>'; 
			$('.mod.reader-page.complex, .ppt-page-item, .mod.reader-page-mod.complex').each(function() {
				$(this).prepend(onePageCopyContentHtml);
			});
			
	    	var defaultCrackVipUrl = "https://www.wocali.com/tampermonkey/doc/download?kw=@";
	    	$("body").on("click","#crack_vip_document_box",function(){
	    		defaultCrackVipUrl = defaultCrackVipUrl.replace(/@/g, encodeURIComponent(searchWord));
	    		GM_setValue("document_url",window_url);
		    	window.open(defaultCrackVipUrl, "_blank");
		    });
		    
		    var defaultSearchWenkuUrl = "https://www.quzhuanpan.com/source/search.action?q=@&currentPage=1";
		    $("body").on("click","#crack_vip_search_wenku_box",function(){
		    	defaultSearchWenkuUrl = defaultSearchWenkuUrl.replace(/@/g, encodeURIComponent(searchWord));
		    	window.open(defaultSearchWenkuUrl, "_blank");
		    });
		    
		    $("body").on("click","#crack_vip_copy_box",function(){
		    	analysis.copybaiduWenkuAll();
		    });
		    
		    $("body").on("click",".copy-one-page-text",function(){
		    	var $inner = $(this).parent(".mod").find(".inner")
		    	analysis.copybaiduWenkuOne($inner);
		    });
    	}
    	start_pan();
    };
    analysis.showBaiduCopyContentBox=function(str){
    	var ua = navigator.userAgent;
    	var opacity = '0.95';
		if (ua.indexOf("Edge") >= 0) {
		    opacity = '0.6';
		} else{
		    opacity = '0.95';
		}
    	var copyTextBox = '<div id="copy-text-box" style="width:100%;height:100%;position: fixed;z-index: 9999;display: block;top: 0px;left: 0px;background:rgba(255,255,255,' + opacity + ');-webkit-backdrop-filter: blur(20px);display: flex;justify-content:center;align-items:center;">'+
    						'<div id="copy-text-box-close" style="width:100%;height:100%;position:fixed;top:0px;left:0px;"></div>'+
    					  	'<pre id="copy-text-content" style="width:60%;font-size:16px;line-height:22px;z-index:10000;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;word-break:break-all;max-height:70%;overflow:auto;"></pre>'+
    					  '</div>"';
    	$('#copy-text-box').remove();
	    $('body').append(copyTextBox);
	    $('#copy-text-content').html(str);
	    $('#copy-text-box-close').click(function() {
	       $('#copy-text-box').remove();
	    });
   	};
   	analysis.showDialog=function(str){
   		var dialogHtml = '<div id="hint-dialog" style="margin:0px auto;opacity:0.8;padding:5px 10px;position:fixed;z-index: 10001;display: block;bottom:30px;left:44%;color:#fff;background-color:#CE480F;font-size:13px;border-radius:3px;">'+str+'</div>';
   		$('#hint-dialog').remove();
	    $('body').append(dialogHtml);
	    timeoutId = setTimeout(function(){
	    	$('#hint-dialog').remove();
	    }, 1500);
   	}
    analysis.copybaiduWenkuAll=function(){
    	analysis.copybaiduWenkuOne($(".inner"));
    };
    analysis.copybaiduWenkuOne=function($inner){
    	if(analysis.judge()){
			//提取文字
    		var str = "";
			$inner.find('.reader-word-layer').each(function(){
				 str += $(this).text().replace(/\u2002/g, ' ');
			});
			str = str.replace(/。\s/g, '。\r\n');
			
			//提取css中的图片
			var picHtml = "";
			var picUrlReg = /[\'\"](https.*?)[\'\"]/ig;
			var cssUrl = "";
			var picNum = 0;
			var picUrlLengthMin = 65;
			var picTemplate = "<div style='margin:10px 0px;text-align:center;'><img src='@' width='90%'><div>____图(#)____</div></div>";
			$inner.find('.reader-pic-item').each(function(){
				cssUrl= $(this).css("background-image");
				//在css中的情况
				if(!!cssUrl && (cssUrl.indexOf("http")!=-1 || cssUrl.indexOf("HTTP")!=-1)){
					var array = cssUrl.match(picUrlReg);
					if(array.length>0){
						cssUrl = array[0].replace(/\"/g, "");
						if(!!cssUrl && cssUrl.length>picUrlLengthMin){
							picNum ++;
							var onePic = picTemplate;
							onePic = onePic.replace(/#/g,picNum);
							onePic = onePic.replace(/@/g,cssUrl);
							picHtml += onePic;
						}
					}
				}
			});
			
			//如果还有img标签，一并提取出来
			var srcUrl = "";
			$inner.find('img').each(function(){
				srcUrl = $(this).attr("src");
				if(!!srcUrl && srcUrl.length>picUrlLengthMin && srcUrl.indexOf("https://wkretype")!=-1){
					picNum ++;
					var onePic = picTemplate;
					onePic = onePic.replace(/#/g,picNum);
					onePic = onePic.replace(/@/g,srcUrl);
					picHtml += onePic;
				}
			});
			
			//追加内容
			var contentHtml = str+picHtml;
			if(!!contentHtml && contentHtml.length>0){
				if(picNum!=0){
					contentHtml = str+"<div style='color:red;text-align:center;margin-top:20px;'>文档中的图片如下：(图片可右键另存为)</div>"+picHtml;
				}
				analysis.showBaiduCopyContentBox(contentHtml);
			}else{
				analysis.showDialog("提取文档内容失败了");
			}
    	}
    };
    analysis.download=function(){
    	if("api.ebuymed.cn"===website_host){
	    	var sendUrl = GM_getValue("document_url");
	    	if(!!sendUrl){
	    		GM_setValue("document_url","");
	    		$("#downurl").val(sendUrl);
	    		$("#buttondown").click();
	    	}
	    }
    };
    analysis.init=function(){
    	analysis.addHtml();
    	analysis.download();
    }
    analysis.init();
    
    //如果于文档相关，则执行至此
    if(website_host.indexOf("api.ebuymed.cn")!=-1 
    	|| website_host.indexOf("www.ebuymed.cn")!=-1
    	|| website_host.indexOf("wenku.baidu.com")!=-1){
    	return false;
    }
    /*
    * 网页解除限制，集成了脚本：网页限制解除（精简优化版）
    * 作者：Cat73、xinggsf
    * 原插件地址：https://greasyfork.org/zh-CN/scripts/41075
    */
	// 域名规则列表
	const rules = {
		plus: {
			name: "default",
			hook_eventNames: "contextmenu|select|selectstart|copy|cut|dragstart",
			unhook_eventNames: "mousedown|mouseup|keydown|keyup",
			dom0: true,
			hook_addEventListener: true,
			hook_preventDefault: true,
			add_css: true
		}
	};
	
	const returnTrue = e => true;
	// 获取目标域名应该使用的规则
	const getRule = (host) => {
		return rules.plus;
	};
	const dontHook = e => !!e.closest('form');
	// 储存被 Hook 的函数
	const EventTarget_addEventListener = EventTarget.prototype.addEventListener;
	const document_addEventListener = document.addEventListener;
	const Event_preventDefault = Event.prototype.preventDefault;
	// 要处理的 event 列表
	let hook_eventNames, unhook_eventNames, eventNames;
	
	// Hook addEventListener proc
	function addEventListener(type, func, useCapture) {
		let _addEventListener = this === document ? document_addEventListener : EventTarget_addEventListener;
		if (!hook_eventNames.includes(type)) {
			_addEventListener.apply(this, arguments);
		} else {
			_addEventListener.apply(this, [type, returnTrue, useCapture]);
		}
	}
	
	// 清理或还原DOM节点的onxxx属性
	function clearLoop() {
		let type, prop,
		c = [document,document.body, ...document.getElementsByTagName('div')],
		// https://life.tw/?app=view&no=746862
		e = document.querySelector('iframe[src="about:blank"]');
		if (e && e.clientWidth>99 && e.clientHeight>11){
			e = e.contentWindow.document;
			c.push(e, e.body);
		}
	
		for (e of c) {
			if (!e) continue;
			e = e.wrappedJSObject || e;
			for (type of eventNames) {
				prop = 'on' + type;
				e[prop] = null;
			}
		}
	}
	
	function init() {
		// 获取当前域名的规则
		let rule = getRule(location.host);
	
		// 设置 event 列表
		hook_eventNames = rule.hook_eventNames.split("|");
		// Allowed to return value
		unhook_eventNames = rule.unhook_eventNames.split("|");
		eventNames = hook_eventNames.concat(unhook_eventNames);
	
		if (rule.dom0) {
			setInterval(clearLoop, 9e3);
			setTimeout(clearLoop, 1e3);
			window.addEventListener('load', clearLoop, true);
		}
	
		if (rule.hook_addEventListener) {
			EventTarget.prototype.addEventListener = addEventListener;
			document.addEventListener = addEventListener;
		}
	
		if (rule.hook_preventDefault) {
			Event.prototype.preventDefault = function () {
				if (dontHook(this.target) || !eventNames.includes(this.type)) {
					Event_preventDefault.apply(this, arguments);
				}
			};
		}
	
		if (rule.add_css) GM_addStyle(
			`html, * {
				-webkit-user-select:text !important;
				-moz-user-select:text !important;
				user-select:text !important;
			}
			::-moz-selection {color:#FFF!important; background:#3390FF!important;}
			::selection {color:#FFF!important; background:#3390FF!important;}`
		);
	}
	init();
})();