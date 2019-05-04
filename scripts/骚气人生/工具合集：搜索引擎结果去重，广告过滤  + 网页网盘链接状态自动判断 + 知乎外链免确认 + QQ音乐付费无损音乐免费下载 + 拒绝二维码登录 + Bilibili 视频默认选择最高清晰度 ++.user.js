// ==UserScript==
// @name         工具合集：搜索引擎结果去重，广告过滤  + 网页网盘链接状态自动判断 + 知乎外链免确认 + QQ音乐付费无损音乐免费下载 + 拒绝二维码登录 + Bilibili 视频默认选择最高清晰度 ++
// @namespace    togeter
// @version      1.0.2
// @description  脚本收集整合了其它脚本的一些功能，本来一个脚本就能搞定，干嘛要同时安装多个呢？如果需要其它功能，大家可以反馈，在此，感谢这些脚本的开发者们。当前整合的脚本有【搜索引擎，搜索结果智能去重 + 广告过滤 ++ — [用于百度、360、搜狗、必应]】【网页网盘链接检查实时检查】【知乎外链免确认】 【QQ音乐付费无损音乐免费下载 】【拒绝二维码登录（网站默认出现账号密码登录界面】【Bilibili 视频默认选择最高清晰度】
// @author       Erimus Koo & 刘明野 & 匆匆过客 & xxooyy & Zimongmu & ++
// @icon         data:image/png;base64,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
// @match        *://*/*
// @connect 	 www.quzhuanpan.com
// @connect		 pan.baidu.com
// @require      http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @require 	 https://greasyfork.org/scripts/376401-findandreplacedomtext/code/findAndReplaceDOMText.js?version=660038
// @require      https://greasyfork.org/scripts/376402-ddxuf/code/ddxuf.js?version=663769
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-end
// @compatible	 Chrome
// @compatible	 Firefox
// @compatible	 Edge
// @compatible	 Safari
// @compatible	 Opera
// ==/UserScript==

(function() {
    'use strict';
    var $ = $ || window.$;
	var current_window_url = window.location.href;
	
	//https://greasyfork.org/zh-CN/scripts/21192
	//知乎外链免确认
	//原作者：Erimus Koo
	//版本：0.13
	if(current_window_url.indexOf("link.zhihu.com/")!=-1){
		var pAll = document.getElementsByTagName("p");
	    for(var i=0;i<pAll.length;i++){
	        if(pAll[i].innerHTML.indexOf("http")!=-1){
	            window.location=pAll[i].innerHTML;
	        }
	    }
	}
	
	//https://greasyfork.org/zh-CN/scripts/370308
	//QQ音乐付费无损音乐免费下载
	//原作者：刘明野
	//版本：1.0.5
	if(current_window_url.indexOf("//y.qq.com/")!=-1){
		var SiteUrl = window.location.href;
		var ReA = /y\.qq\.com\/n\/yqq\/(song|playsquare|album|playlist|singer)/i;
		var ReB = /y\.qq\.com\/portal\/player.html/i;
		var openUrl = function (a){
			window.open("http://tool.liumingye.cn/music/?name=" + encodeURIComponent(a));
		}
		if (ReA.test(SiteUrl)) {
			var $name = $('.data__name_txt');
			var BtnA = $('<a href="javascript:;" class="mod_btn_green"><i class="mod_btn_green__icon_play"></i>VIP解析</a>');
			var BtnB = $('<a href="javascript:;" class="mod_btn"></i>歌名搜索</a>');
			$name.parent('.data__name').after(BtnA,BtnB);
			var MusicName = $name.text();
			$('.data__actions').css('bottom', '-10px');
			BtnA.click(function () {
				openUrl(window.location.href);
			})
			BtnB.click(function () {
				openUrl(MusicName.replace(/[\r\n]/g, "").replace(/for/i, "f o r"));
			})
			// 判断是否下架
			var interval = setInterval(function(){
				if($('.data__name_txt').length == 0){
					clearInterval(interval);
					var BtnA = $('<a href="javascript:;" class="mod_btn_green"><i class="mod_btn_green__icon_play"></i>解析该下架歌曲</a>');
					$('.none_txt__symbol').after(BtnA);
					BtnA.click(function () {
						openUrl(window.location.href);
					})
					
				}
			},1000);
		}else if (ReB.test(SiteUrl)) {
			var BtnA = $('<a style="margin-top:-10px;" href="javascript:;" class="mod_btn">VIP解析</a>');
			var BtnB = $('<a style="margin-top:-10px;" href="javascript:;" class="mod_btn">歌名搜索</a>');
			$('.mod_songlist_toolbar').after(BtnA,BtnB);
			BtnA.click(function () {
				openUrl($('.mod_btn_comment').attr('href').replace('#comment_box', ''));
			})
			BtnB.click(function () {
				openUrl($('.js_song').text().replace(/[\r\n]/g, "").replace(/for/i, "f o r"));
			})
		}
	}
	
    //https://greasyfork.org/zh-CN/scripts/375893
	//【转盘助手油猴版】网盘链接状态实时判断+资源搜索网站导航++
	//原作者：匆匆过客
	//版本：2.0.2
    start_xx_j();
    
    //https://greasyfork.org/zh-CN/scripts/37988
    //拒绝二维码登录
    //原作者：xxooyy
    //版本:1.2.0
	//12306
    if (isURL("kyfw.12306.cn")) {
        var auto = setInterval(function() {
            if ($('#J-login-code-loading').css('display')==='none' && $('.login-hd-code').hasClass('active')) {
                $('.login-hd-account a')[0].click();
                clearInterval(auto);
            }
        }, 50);
    }
    //淘宝
    if (isURL("login.taobao.com")) {
        var auto = setInterval(function() {
            if ($('#J_StaticForm').css('display') === 'none') {
                $('#J_Quick2Static').click();
                clearInterval(auto);
            }
        }, 50);
    }
    //京东
    if (isURL("passport.jd.com")) {
        var auto = setInterval(function() {
            if ($('.login-box').css('display') === 'none') {
                $('.login-tab-r').click();
                clearInterval(auto);
            }
        }, 50);
    }
    //百度
    if (isURL("baidu.com")) {
        var auto = setInterval(function() {
            var yunbtn = $('#TANGRAM__PSP_4__footerULoginBtn');
            var indexBtn = $('#TANGRAM__PSP_10__footerULoginBtn');
            var passportBtn = $('#TANGRAM__PSP_3__footerULoginBtn');
            var tiebaBtn = $('#TANGRAM__PSP_11__footerULoginBtn');
            var tiebaBtn2 = $('#TANGRAM__PSP_28__footerULoginBtn');
            var wenKuBtn = $('#TANGRAM__PSP_18__footerULoginBtn');
            if (yunbtn.length > 0) {
                yunbtn[0].click();
                clearInterval(auto);
            }
            if (indexBtn.length > 0) {
                indexBtn[0].click();
                clearInterval(auto);
            }
            if (passportBtn.length > 0) {
                passportBtn[0].click();
                clearInterval(auto);
            }
            if (tiebaBtn.length > 0) {
                tiebaBtn[0].click();
                clearInterval(auto);
            }
            if (tiebaBtn2.length > 0) {
                tiebaBtn2[0].click();
                clearInterval(auto);
            }
            if (wenKuBtn.length > 0) {
                wenKuBtn[0].click();
                clearInterval(auto);
            }
        }, 50);
    }
    //苏宁
    if (isURL("passport.suning.com")) {
        var auto = setInterval(function() {
            if ($('.pc-login').css('display') === 'none') {
                $('.tab-item')[1].click();
                clearInterval(auto);
            }
        }, 50);
    }
    //知乎
    if (isURL("zhihu.com")) {
        var loginDiv = $('.Login-content');
        var auto = setInterval(function() {
            if (loginDiv.length == 0) {
                $('.SignContainer-switch').children("span").click();
                clearInterval(auto);
            }
        }, 50);
    }
    //支付宝
    if (isURL("alipay.com")) {
        var auto = setInterval(function() {
            var changeTabs = $('#J-loginMethod-tabs li');
            var qrCode = $('#J-qrcode');
            var ssoLogin = $('#J-ssoLogin');
            var loginForm = $('#J-login');
            var loginFormMethod = $('#J-loginFormMethod');
            var popbox = $('#J_popbox');
            if(popbox.hasClass('stat-login')){
                var iframe = $('#J_loginIframe');
                if(iframe)
                {
                    var contentWindow = iframe[0].contentWindow;
                    if(contentWindow)
                    {
                        var loginMethod = contentWindow.document.getElementById('J-loginFormMethod');
                        if(loginMethod)
                        {
                            contentWindow.document.getElementById('J-qrcode-target').click();
                            clearInterval(auto);
                        }
                    }
                }
            }
            if (changeTabs.length >= 2) {
                changeTabs.each(function(index,element){
                    var self = $(this);
                    if((self.attr('data-status') === 'show_login') && (!self.hasClass("active"))){
                        loginFormMethod.val('');
                        qrCode.addClass('fn-hide');
                        if (window.light && window.light.page && window.light.page.products && window.light.page.products.barcode) {
                            window.light.page.products.barcode.onready(function () {
                                this.stop();
                            });
                        }
                        if (ssoLogin.attr('data-hide') === 'false' && ssoLogin.attr('data-state') === 'finished') {
                            ssoLogin.removeClass('fn-hide');
                        } else {
                            loginForm.removeClass('fn-hide');
                        }
                        self.addClass("active");
                        self.siblings().removeClass('active');
                        clearInterval(auto);
                    }
                });
            }
        }, 50);
    }
    //QQ
    if (isURL('xui.ptlogin2.qq.com') || isURL('ssl.xui.ptlogin2.qq.com') || isURL('ui.ptlogin2.qq.com')) {
        if(isURL('web2.qq.com')){
            
        }else{
        	var auto = setInterval(function() {
	            if ($('.onekey_logo').length == 1 || $('.face').length == 1) {
	                $('#switcher_plogin')[0].click();
	                $('#switcher_qlogin').on('click',function(){
	                    clearInterval(auto);
	                })
	            }
	        }, 50);
        }
    }
    //微云
    if (isURL("weiyun.com")) {
        var auto = setInterval(function() {
            if ($('.face').length==1 && $('#bottom_qlogin').css('display') === 'block') {
                $('#switcher_plogin')[0].click();
                clearInterval(auto);
            }
        }, 50);
    }
    //腾讯企业邮箱
    if (isURL("exmail.qq.com")) {
        var auto = setInterval(function() {
            if ($('.login_account_pwd_panel').css('display') === 'none') {
                $('.js_show_pwd_panel')[0].click();
                clearInterval(auto);
            }
        }, 50);
    }
    //腾讯云
    if (isURL("cloud.tencent.com") || isURL("qcloud.com")) {
        var auto = setInterval(function() {
            if ($('.J-wxloginBox').css('display') === 'block') {
                $('a[data-type="email"]')[0].click();
                clearInterval(auto);
            }
        }, 50);
    }
    //虾米
    if(isURL("xiami.com")){
        $('.modal-wrapper').bind('DOMNodeInserted', function(e) {
            var auto = setInterval(function() {
                if ($('.modal').hasClass('opened')&&!$('.login').hasClass('current')) {
                    $('.login')[0].click();
                    clearInterval(auto);
                }
            }, 50);
        });
    }
    //虎牙
    if (isURL("huya.com")) {
        var auto = setInterval(function() {
            if ($('.account').hasClass('UDBSdkLgn-none')) {
                $("img[src$='qrweb.png']").click();
                $("img[src$='webqr.png']").on('click',function(){
                    clearInterval(auto);
                })
            }
        }, 50);
    }
    //58同城
    if (isURL("passport.58.com")) {
        var auto = setInterval(function() {
            if ($('#scanCode').hasClass('hide')) {
                $('#pwdLogin').click();
                clearInterval(auto);
            }
        }, 50);
    }
    //百姓网
    if (isURL("baixing.com")) {
        var auto = setInterval(function() {
            if ($('.login-window a[href="#appLogin"]').closest('li').hasClass('active')) {
                $('.login-window a[href="#mobile"]')[0].click();
                clearInterval(auto);
            }
        }, 50);
    }
    //升蓝物流
    if (isURL("sl56.com")) {
        var auto = setInterval(function() {
            if ($('#password').css('display') === 'none') {
                $('#btnPassword').click();
                clearInterval(auto);
            }
        }, 50);
    }
    //判断网址
    function isURL(x){
        return window.location.href.indexOf(x) != -1;
    }	
	
	//https://greasyfork.org/zh-CN/scripts/374770
    //Bilibili 视频默认选择最高清晰度
    //原作者：Zimongmu
    //版本:0.2018.12.28
    if(current_window_url.indexOf("www.bilibili.com/video/av")!=-1){
    	 var MO = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	    function vip(element, observer) {
	        setTimeout(function () {
	            element.click();
	            observer.takeRecords();
	        }, window.location.search === '' ? 0 : 1000);
	    }
	    function novip(a, e, u, observer) {
	        for (var i=1; document.querySelector(a + i + ")") !== null; i++) {
	            if (document.querySelector(a + i + e) === null && document.querySelector(a + i + u) === null) {
	                vip(document.querySelector(a + i + ")"), observer);
	                break;
	            }
	        }
	    }
	    new MO(function (elements, observer) {
	        elements[0] = document.querySelector("div.bui-select-list-wrap li:first-child");
	        elements[1] = document.querySelector("i.legalize.vip");
	        elements[2] = document.getElementById("bilibiliPlayer");
	        elements[3] = "div.bui-select-list-wrap li:nth-of-type(";
	        if (
	            document.querySelector("div.i-face") !== null &&
	            elements[2].hasAttribute("data-login") &&
	            /自动/.test(document.querySelector("span.bui-select-result").innerHTML)
	        ) {
	            if (elements[1] !== null) vip(elements[0], observer);
	            else if (elements[2].getAttribute("data-login") == 'true') {
	                novip(elements[3], ") span.bilibili-player-bigvip", ") span.bilibili-player-bigvip", observer);
	            }
	            else if (elements[2].getAttribute("data-login") == 'false') {
	                novip(elements[3], ") span.bilibili-player-needlogin", ") span.bilibili-player-bigvip", observer);
	            }
	        }
	    }).observe(document.body, {'attributes': true, 'subtree': true, 'attributeFilter': ['src']});
    }
    
    
    //https://greasyfork.org/zh-CN/scripts/376652
    //搜索引擎，搜索结果智能去重 + 广告过滤 ++ — [用于百度、360、搜狗、必应]
    //原作者：匆匆过客
    //版本:2.0.1
    var levenshteinDistance = {};
    levenshteinDistance.createTwoArray=function(one,two){
		var myarr=new Array();
		for (var i=0;i<one;i++){
		    myarr[i]=new Array();
		    for(var j=0;j<two;j++){
		        myarr[i][j]=i*j;
		    }
		}
		return myarr;
    };
    levenshteinDistance.min=function(one, two, three){
    	return (one = one < two ? one : two) < three ? one : three;
	};
	levenshteinDistance.compare=function(str, target){
        var n = str.length
        var m = target.length;
        var i;                  // 遍历str的
        var j;                  // 遍历target的
        var ch1;               // str的
        var ch2;               // target的
        var temp;               // 记录相同字符,在某个矩阵位置值的增量,不是0就是1
        if (n == 0) { return m; }
        if (m == 0) { return n; }
        var d = levenshteinDistance.createTwoArray(n + 1,m + 1);  // 矩阵
        for (i = 0; i <= n; i++){   // 初始化第一列                
            d[i][0] = i;
        }
        for (j = 0; j <= m; j++){  // 初始化第一行                      
            d[0][j] = j;
        }
        for (i = 1; i <= n; i++){   // 遍历str            
            ch1 = str.charAt(i - 1);
            for (j = 1; j <= m; j++){  // 去匹配target
                ch2 = target.charAt(j - 1);
                if (ch1 == ch2 || ch1 == ch2+32 || ch1+32 == ch2){
                    temp = 0;
                }else{
                    temp = 1;
                }
                // 左边+1,上边+1, 左上角+temp取最小
                d[i][j] = levenshteinDistance.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + temp);
            }
        }
        return d[n][m];
	};
	levenshteinDistance.getSimilarityRatio=function(str, target){
		var compareRes = levenshteinDistance.compare(str, target);
		compareRes = parseFloat(compareRes);
		compareRes = compareRes.toFixed(10);
        return 1 -  compareRes / Math.max(str.length, target.length);
    };
    levenshteinDistance.isIncludeStr=function(str, target){
    	var n = str.length;
    	var m = target.length;
    	if(n>=m){
    		return str.indexOf(target)!=-1?1:0;
    	}else{
    		return target.indexOf(str)!=-1?1:0;
    	}
    };
    levenshteinDistance.start=function(str,target){
    	var r1 = levenshteinDistance.isIncludeStr(str,target);
    	if(r1==0){
    		r1 = levenshteinDistance.getSimilarityRatio(str, target);
    	}
    	return r1;
    }
		
	var bottomText = {};
	bottomText.init=function(adNum, repeatNum, classify){
    	var is_pull = false;
    	var pull_text = GM_getValue("pull_text");
    	var pull_time =  GM_getValue("pull_time");
    	if(!!pull_text && !!pull_time){
    		var nowTime = new Date().getTime();
			if(nowTime - Number(pull_time) > 1000*60*10){
				is_pull = true;
			}else{
				is_pull = false;
			}
    	}else{
    		is_pull = true;
    	}
    	if(!is_pull){
    		bottomText.loadLocalText(pull_text,adNum, repeatNum, classify);
    	}else{
    		bottomText.pullText(adNum, repeatNum, classify);
    	}
	};
	bottomText.loadLocalText=function(text, adNum, repeatNum, classify){
    	try{
		    if(!!text){
		    	text = text.replace(/%/g, adNum);
		    	text = text.replace(/@/g, repeatNum);
		    	bottomText.show(text,classify);
		    }else{
		    	bottomText.pullText();
		    }
		}catch(e){
			bottomText.pullText();
		}
	}
	bottomText.pullText=function(adNum, repeatNum, classify){
		GM_xmlhttpRequest({
		  	method: "GET",
		  	url: "http://www.quzhuanpan.com/browser/tampermonkey_search_engine_text",
		  	onload: function(response) {
				var status = response.status;
				var text = "";
				if(status==200||status=='200'){
					text = response.responseText;
					if(!!text){
						GM_setValue("pull_text",text);
						GM_setValue("pull_time",new Date().getTime());
					}else{
						text = GM_getValue("pull_text");
					}
				}else{
					text = GM_getValue("pull_text");
				}
				if(!!text){
					text = text.replace(/%/g, adNum);
		    		text = text.replace(/@/g, repeatNum);
					bottomText.show(text, classify);	
				}
		  	}
		});	
	}
	bottomText.show=function(text, classify){
		var json = JSON.parse(text);
		$(".quzhuanpan-tampermonkey-cue-box").remove();
		if(classify==1){$("#content_left").append(json.baidu);}
		else if(classify==2){$("#main").append(json.so);}
		else if(classify==3){$("#main").append(json.sogou);}
		else if(classify==4){$(".b_pag").prepend(json.bing);}
	}
	
	/**
	 * 判断标准：
	 * 1、标题相似度0.9  且内容相似度0.5
	 * 2、标题相似度1，长度相等 且内容相似度0.15
	 * 3、内容相似度0.8
	 */
	function isRepeatResult(contentValue, titleValue, title1, title2){
		if(contentValue>=0.8 || (contentValue>=0.5 && titleValue>=0.9) || (contentValue>=0.15 && titleValue==1 && title1.length == title2.length)){
			return true;
		}
		return false;
	}
	
	//百度搜索结果	
	var baisuSearchEngine={};
	baisuSearchEngine.createSearchDiv=function(id,t,cabstract){ //创建一个搜索结果obj，保存数据	
		var obj = new Object();
		obj.id=id;
		obj.t=t;
		obj.cabstract=cabstract;
		obj.isRepeat=false;
		return obj;
	};
	baisuSearchEngine.searchResult=function(){  //获取百度搜索结果div
		var baiduSearchDivArray = new Array();
		$(".c-container").each(function(){
			var id = $(this).attr("id");
			var t = $(this).find(".t").text();
			var cabstract = $(this).find(".c-abstract").text();
			if(!!t&&!!cabstract){
				baiduSearchDivArray.push(baisuSearchEngine.createSearchDiv(parseInt(id),t,cabstract));
			}
		});
		return baiduSearchDivArray;
	};
	baisuSearchEngine.judgeRepeatResult=function(array){  //判读搜索结果
		var str = "++";
		var obj1 = "";
		var obj2 = "";
		var numstr1 = "";
		var numstr2 = "";
		var cabstractJudge = 0;
		var titleJudge = 0
		for(var i = 0; i < array.length; i++){    //循环遍历当前数组 
			obj1 = array[i];
			for(var j=0; j< array.length; j++){
				obj2 = array[j];
				if(i==j) continue;
				if(obj2.isRepeat) continue;
				numstr1 = i+""+j;
				numstr2 = j+""+i;
				if(str.indexOf("+"+numstr1+"+")==-1&&str.indexOf("+"+numstr2+"+")==-1){
					str = str+"++"+numstr1+"++"+numstr2+"++";
					cabstractJudge = levenshteinDistance.start(obj1.cabstract,obj2.cabstract);
					titleJudge = levenshteinDistance.start(obj1.t,obj2.t);				
					//console.log(obj1.id+"  "+obj2.id +"  "+cabstractJudge+"  "+titleJudge);
					if(isRepeatResult(cabstractJudge, titleJudge, obj1.t, obj2.t)){
						obj2.isRepeat=true;
						array[j] = obj2;
					}
				}	
			}
		} 
		return array;
	};
	baisuSearchEngine.getRepeatSearchDic=function(){  //查找归纳重复搜索结果
		//删除提示盒子
		$(".quzhuanpan-tampermonkey-cue-box").remove();
		//删除重复内容盒子
		$(".quzhuanpan-tampermonkey-repeat-box").remove();
		//删除重复提示文字
		$(".quzhuanpan-tampermonkey-repeat-cue").remove();
		var resultArray = baisuSearchEngine.judgeRepeatResult(baisuSearchEngine.searchResult());
		var html = "";
		var getNum = 0;
		$(".c-container").each(function(){
			var id = $(this).attr("id");
			for(var i=0;i<resultArray.length;i++){
				if(parseInt(id)==resultArray[i].id && resultArray[i].isRepeat){
					html += "<div class='result c-container quzhuanpan-tampermonkey-repeat-box' tampermonkeyplugin='1'>" + $(this).html() + "</div>";
					getNum +=1;
					$(this).remove();
					break;
				}
			}
		});
		if(getNum>0){
			$("#content_left").append("<div style='text-align:center;background-color:#F8F8F8;color:#000;margin:10px 0px;' tampermonkeyplugin='1' class='quzhuanpan-tampermonkey-repeat-cue'>//////////////////////////////// 以下结果为重复内容 ////////////////////////////////</div>");
			$("#content_left").append(html);
		}
		//优先添加提示html
		bottomText.init(0,getNum,1);
	};
	baisuSearchEngine.remove=function(){ //删除百度的推广广告
		var removeAdNum = 0;
		$("#content_left").children("div").each(function(){
			if(!$(this).attr("srcid") && !$(this).attr("tampermonkeyplugin")){
				$(this).css({"display":"none"});
				removeAdNum +=1;
			}
			var f13Text = $(this).find(".f13").text();
			if(!!f13Text && f13Text.indexOf("广告")!=-1){
				$(this).css({"display":"none"});
				removeAdNum +=1;
			}
		});
		if(removeAdNum!=0){
			//console.log("本次执行：过滤百度广告："+removeAdNum+"条");
			if($(".quzhuanpan-tampermonkey-cue-box").length==0){
				//优先添加提示html
				bottomText.init(removeAdNum,0,1);
			}else{
				$("#quzhuanpan-tampermonkey-ad").text(removeAdNum);
			}	
		}
	};
	baisuSearchEngine.bind=function(){
		//点击下一页要检查
		$("body").on("click","#page",function(){
			baisuSearchEngine.start();
		});
		//点击确定要检查
		$("body").on("click","#su",function(){
			baisuSearchEngine.start();
		});
		//输入框改变需要监听    
	    $('input').bind('input propertychange', function(){
			baisuSearchEngine.start();
		});
	    //点击下拉提示要检查
	    $("body").on("click",".bdsug-overflow",function(){
			baisuSearchEngine.start();
		});
	};
	baisuSearchEngine.start = function(){
		setTimeout(function(){
			baisuSearchEngine.getRepeatSearchDic();
			baisuSearchEngine.remove();
		},500);
	};
	
	//360搜索
	var soSearchEngine = {};
	soSearchEngine.remove=function(){  //删除360广告
		var removeAdNum = 0;
		$("#e_idea_pp").children("li").each(function(){
			removeAdNum+=1;
		});
		$("#e_idea_pp_vip_bottom").children("li").each(function(){
			removeAdNum+=1;
		});
		$("#rightbox").children("li").each(function(){
			removeAdNum+=1;
		});
		$("#e_idea_pp").css({"display":"none"}); //删除360顶部广告
		$("#e_idea_pp_vip_bottom").css({"display":"none"});
		$("#rightbox").css({"display":"none"});
		if($(".quzhuanpan-tampermonkey-cue-box").length==0){
			bottomText.init(removeAdNum,0,2);
		}else{
			if(removeAdNum!=0){
				$("#quzhuanpan-tampermonkey-ad").text(removeAdNum);
			}
		}
	};
	soSearchEngine.bind=function(){
		//点击下一页要检查
		$("body").on("click","#page",function(){
			soSearchEngine.start();
		});
		//点击确定要检查
		$("body").on("click","#su",function(){
			soSearchEngine.start();
		});
		//输入框改变需要监听    
	    $('input').bind('input propertychange', function(){
			soSearchEngine.start();
		});
	    //点击下拉提示要检查
	    $("body").on("click",".ac_menu",function(){
			soSearchEngine.start();
		});
	};
	soSearchEngine.start = function(){
		setTimeout(function(){
			soSearchEngine.remove();
		},500);
	};
	
	//搜狗搜索
	var sogoSearchEngine = {};
	sogoSearchEngine.remove=function(){  //删除搜狗广告
		var removeAdNum = 0;
		$(".biz_sponsor").find(".biz_rb").each(function(){
			removeAdNum+=1;
		});
		$("#leftbottomleadContainer").css({"display":"none"});
		$("#promotion_adv_container").css({"display":"none"});
		$(".sponsored").css({"display":"none"});
		$(".biz_sponsor").css({"display":"none"});
		if($(".quzhuanpan-tampermonkey-cue-box").length==0){
			bottomText.init(removeAdNum,0,3);
		}else{
			if(removeAdNum!=0){
				$("#quzhuanpan-tampermonkey-ad").text(removeAdNum);
			}
		}
	};
	sogoSearchEngine.bind=function(){
		//点击下一页要检查
		$("body").on("click","#pagebar_container",function(){
			sogoSearchEngine.start();
		});
		//点击确定要检查
		$("body").on("click","#searchBtn",function(){
			sogoSearchEngine.start();
		});
		//输入框改变需要监听    
	    $('input').bind('input propertychange', function(){
			sogoSearchEngine.start();
		});
	    //点击下拉提示要检查
	    $("body").on("click",".suglist",function(){
			sogoSearchEngine.start();
		});
	};
	sogoSearchEngine.start = function(){
		setTimeout(function(){
			sogoSearchEngine.remove();
		},500);
	};
	
	//必应
	var bingSearchEngine = {};
	bingSearchEngine.remove=function(){  //删除必应广告
		var removeAdNum = 0;
		$(".b_ad").find("ul").each(function(){
			$(this).children("li").each(function(){
				removeAdNum+=1;
			});
		});
		$(".b_ad").css({"display":"none"});
		if($(".quzhuanpan-tampermonkey-cue-box").length==0){
			bottomText.init(removeAdNum,0,4);
		}else{
			if(removeAdNum!=0){
				$("#quzhuanpan-tampermonkey-ad").text(removeAdNum);
			}
		}
	};
	bingSearchEngine.bind=function(){
		//点击下一页要检查
		$("body").on("click",".b_pag",function(){
			bingSearchEngine.start();
		});
		//点击确定要检查
		$("body").on("click","#sb_form_go",function(){
			bingSearchEngine.start();
		});
		//输入框改变需要监听    
	    $('input').bind('input propertychange', function(){
			bingSearchEngine.start();
		});
	    //点击下拉提示要检查
	    $("body").on("click",".sa_drw",function(){
			bingSearchEngine.start();
		});
	};
	bingSearchEngine.start = function(){
		setTimeout(function(){
			bingSearchEngine.remove();
		},500);
	};
	
	//搜索引擎判断
    function judgeSearchEngineClassify(){
    	var window_url = window.location.href;
    	var classify = 0;
    	if(window_url.indexOf("https://www.baidu.com/s?rtt=")==-1
    		&& window_url.indexOf("https://www.baidu.com/s?tn=news&rtt=")==-1
    		&& (window_url.indexOf("https://www.baidu.com/s?")!=-1 || window_url.indexOf("https://www.baidu.com/baidu?wd=?")!=-1)){
    		classify = 1;
    	}else if(window_url.indexOf("https://www.so.com/s")!=-1){
    		classify = 2;
    	}else if(window_url.indexOf("https://www.sogou.com/web")!=-1){
    		classify = 3;
    	}else if(window_url.indexOf("https://cn.bing.com/search")!=-1){
    		classify = 4;
    	}
    	return classify;
    }
    
    //开始任务
    function searchEngine(){
    	var classify = judgeSearchEngineClassify();
    	if(classify == 1){
			baisuSearchEngine.start();
			baisuSearchEngine.bind();
    	}else if(classify == 2){
    		soSearchEngine.start();
    		soSearchEngine.bind();
    	}else if(classify == 3){
    		sogoSearchEngine.start();
    		sogoSearchEngine.bind();
    	}else if(classify == 4){
    		bingSearchEngine.start();
    		bingSearchEngine.bind();
    	}
    }
     
    //防止搜索引擎动态加载广告
	setInterval(function(){
		var classify = judgeSearchEngineClassify();
		if(classify == 1){
			baisuSearchEngine.remove();
    	}else if(classify == 2){
    		soSearchEngine.remove();
    	}else if(classify == 3){
    		sogoSearchEngine.remove();
    	}else if(classify == 4){
    		bingSearchEngine.remove();
    	}
	},300);
	
	//回车键要检查，事件绑定
	document.onkeydown = function (event) {
        var e = event || window.event;
        var classify = judgeSearchEngineClassify();
        if (e && e.keyCode == 13) {
            if(classify == 1){
				baisuSearchEngine.start();
	    	}else if(classify == 2){
	    		soSearchEngine.start();
	    	}else if(classify == 3){
	    		sogoSearchEngine.start();
	    	}else if(classify == 4){
	    		bingSearchEngine.start();
	    	}
        }
    }; 
	searchEngine();
})();