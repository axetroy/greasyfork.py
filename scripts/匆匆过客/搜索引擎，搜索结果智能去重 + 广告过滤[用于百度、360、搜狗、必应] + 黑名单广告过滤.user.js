// ==UserScript==
// @name         搜索引擎，搜索结果智能去重 + 广告过滤[用于百度、360、搜狗、必应] + 黑名单广告过滤
// @namespace    Intelligent_weight _removal
// @version      2.0.5
// @description  脚本在不改变搜索结果和样式的基础上，通过相似度算法（Levenshtein Distance）进行重复内容判断，同时去掉搜索结果页面的广告。google被墙了，像百度、360、搜狗、必应等搜索引擎都是一丘之貉，想好好使用搜索引擎，还是用插件吧！免得被坑~，远离重复、远离广告、远离莆田系......，添加黑名单广告过滤，大家觉得那些网站的广告很恶心，让人厌烦，可以给我反馈，后面我统一添加......
// @author       Intelligent_weight _removal_broom
// @icon 		 data:image/png;base64,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
// @match        *://www.baidu.com
// @match        *://www.baidu.com/
// @match        *://www.baidu.com/s?*
// @match		 *://www.baidu.com/baidu?wd=*
// @match        *://m.baidu.com/s?*
// @match        *://www.so.com/s*
// @match        *://www.sogou.com/web*
// @match        *://cn.bing.com/search*
// @match        *://pan.baidu.com/s/*
// @match        *://pan.baidu.com/share/init*
// @match        *://wenku.baidu.com/search?*
// @match        *://zhidao.baidu.com/search?*
// @match        *://wenda.so.com/search/*
// @match        *://www.sohu.com
// @match        *://*.sohu.com/*
// @exclude      *://www.baidu.com/s?rtt=*
// @exclude      *://www.baidu.com/s?tn=news&rtt=*
// @require      http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @require      https://greasyfork.org/scripts/376804-intelligent-weight/code/Intelligent_weight.js?version=684520
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @connect 	 www.quzhuanpan.com
// @run-at       document-end
// @compatible	 Chrome
// @compatible	 Firefox
// @compatible	 Safari
// @compatible	 Opera
// ==/UserScript==

(function() {
    'use strict';
    var $ = $ || window.$;
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
		$("#content_right").children().each(function(){
			if($(this).context.nodeName!=='TABLE'){
				$(this).css({"display":"none"});
				removeAdNum +=1;
			}
		});
		$(".ad-block").remove();
		if($(".quzhuanpan-tampermonkey-cue-box").length==0){
			//优先添加提示html
			bottomText.init(removeAdNum,0,1);
		}else{
			$("#quzhuanpan-tampermonkey-ad").text(removeAdNum);
		}
	};
	baisuSearchEngine.pan=function(){
		start_pan();
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
		},150);
	};
	baisuSearchEngine.pan();
	
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
		},150);
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
		},150);
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
		},150);
	};
	
	//搜索引擎判断
    function judgeSearchEngineClassify(){
    	var window_url = window.location.href;
    	var classify = 0;
    	if(window_url.indexOf("www.baidu.com")!=-1){
    		classify = 1;
    	}else if(window_url.indexOf("www.so.com")!=-1){
    		classify = 2;
    	}else if(window_url.indexOf("www.sogou.com")!=-1){
    		classify = 3;
    	}else if(window_url.indexOf("cn.bing.com")!=-1){
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
	
	//白名单去广告
	var whiteListRemoveAd={};
	whiteListRemoveAd.remove=function(){
		var current_window_url = window.location.href;
		if(current_window_url.indexOf("wenku.baidu.com/search")!=-1){
			whiteListRemoveAd.baiduWenku();
		}
		else if(current_window_url.indexOf("zhidao.baidu.com/search")!=-1){
			whiteListRemoveAd.baiduZhidao();
		}
		else if(current_window_url.indexOf("wenda.so.com/search")!=-1){
			whiteListRemoveAd.soWenda();
		}
		else if(current_window_url.indexOf("sohu.com/")!=-1){
			whiteListRemoveAd.sohu();
		}
	};
	whiteListRemoveAd.baiduWenku=function(){ //百度文库
		setInterval(function(){
			$("#fengchaoad").css("display","none");
			$(".search-aside-adWrap").css("display","none");
			$(".search-aside-newadWrap").css("display","none");
			$(".yuedu-recommend-wrap").css("display","none");
			$("#lastcell-dialog").css("display","none");
			$(".ad-vip-close-bottom").css("display","none");
			$("iframe").remove();
		},150);
	};
	whiteListRemoveAd.baiduZhidao=function(){ //百度知道
		setInterval(function(){
			$(".list-header").css("display","none");
			$(".widget-sma").css("display","none");
			$("#union-aspLU").css("display","none");
			$(".wgt-union").css("display","none");
			$(".union-tg").css("display","none");
			$(".list-footer").css("display","none");
			$("iframe").remove();
		},150);
	};
	whiteListRemoveAd.soWenda=function(){  //360问答
		setInterval(function(){
			//搜索结果顶部
			$("#e_idea_wenda_leftBox").css("display","none");
			//搜索结果底部
			$("#js-bussiness-bot-list").css("display","none");
			//右下角小弹窗
			$(".mod-fixed-float").remove();
			//右侧广告
			$(".aside").remove();
			$("iframe").remove();
		},150);
	};
	whiteListRemoveAd.sohu=function(){
		setInterval(function(){
			//中上部广告
			$(".god_header").css("display","none");
			$(".god-wrapper").css("display","none");
			$(".godR").css("display","none");
			$(".god-cut").css("display","none");
			$(".god_promotion").css("display","none");
			$(".god-main").css("display","none");
			$(".small-god").css("display","none");
			$(".god-channel-top").css("display","none");
			
			$(".ad-rect-long").css("display","none");
			$(".ad-rect").css("display","none");
			
			$("#logon_loading").remove();
		},150);
	};
	whiteListRemoveAd.remove();
})();