// ==UserScript==
// @name         【转盘助手油猴版】网盘链接状态实时判断+资源搜索网站导航++
// @namespace    http://www.quzhuanpan.com
// @version      2.0.2
// @description  功能介绍：1、网盘链接状态判断：实时判断网页中百度网盘链接状态，节约时间，方便又快捷；2、资源搜索网站导航：脚本会在百度、文库、360、搜狗、豆瓣等网站的合适位置推荐各类资源搜索网站，方便对资源的检索。如：豆瓣电影，就会实时的推荐电影相关资源网站，推荐网址长期维护更新。“资源搜索网站导航”做您资源查找的好帮手！
// @author       去转盘网，www.quzhuanpan.com
// @icon 		 data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAOESURBVGhD7ZhPSFRRHIWzhUaISpQUBLmQsECiFoUIYdFCRA3CTURLiRB31SKkEAwCtT/Qqk0UEejaQjdiCoYbsRDMAo200mIyM5x5M753OteuzhvffX/GueMkzPfx2/ju1XPG9+447sA2J1sg02QLZJpsgUyTLbCR9/QpvUWbaDNtpV10hupGS4EQbaOldIeHOfQEfUiXqA5SKmDSB7SI2oP6mUfnqA42XeAXPUPtwYJ6mepi0wXEq3+a2oMFdYTqIqVbaJoWUHs4P09RnaT8ED+h9oB+Pqc6SbmA4AK1h3RzPzWoTrQU+EEPUHtYlbepbrQUELyk4py3B7abS79S3WgrILhK7aHtXqTpQGuBP/QwFYH30QYqno9COkzTgdYCAnHGP6IRusYyTRfaC2w1aSuwGBnHzGIXvi29QsxclF/VT1oKhJbfYPz7zfX5EGqHacVvKZ2kpcCH0L2EAmJ+hcfkVb57PwE6O4HWVuDaNeDKFeDSJeD8eeDsWeDkSeDIEeDgQeDtW7nJhc0XsCxgYQHWu3cwe3pgvn4tLwAfQ/cdBRbCo/IqUFjIH8yfHGSGfQ4vLvEgHIY5NATzxQus3L2LWFMTovX1MI4fR2TvXkRyc9cnWlkpNwE/wyMJ4Sdtt9BXvpfl5DiDus1ovLcSLnHHmp5OCOk5u3bBmpqSO/89xLO/uzH3p5cPcfzTV2OjM6TXzPh8CuUSDyI8zXfvVgdWTLSmhoe++swXd1xLizOg1xQU8HOHKb+BC1zmjXHsmDKs2xhHj8IaH5e74yzxl3DokDOk11RXy80ecJk3seZmZVDX2bOHD8FPuTuRgQFg505nULd5/Fhu9IDLvDH7+9VBXSZ244bcqeb6dWdQ1RQV8TkK8P7HpT7wJjTKy5VhHZOfD2t2Vm5Uw8cKvCuVoe3T1iY3+MCl/pjd3erAGyYmjpgA8K0DeXnO0GtTVrZ6ggeCywPAIyRaV6cMvT7iGJ2YkBv8aW93BhfDXyLG4m/avnBLMKz5eRilperwnGhDg1wZDHE8VlUlhudrgL4+uSAggQsIrMlJGCUlygLmSPL/6/n0Kf5nRXExMDgoLyRBUgUE1ufPMCoqEsJHz52TV5Pn2TOgthb48kV+IUmSLrCKYWDlzh1EeNatvvq9vfLC1rO5AhKLf5mtdHSsPuSZIqUC/wPZApkmWyDTZAtkmm1eAPgL6lT4ekNP9cAAAAAASUVORK5CYII=
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @connect 	 www.quzhuanpan.com
// @connect		 pan.baidu.com
// @require 	 https://greasyfork.org/scripts/376401-findandreplacedomtext/code/findAndReplaceDOMText.js?version=660038
// @require      https://greasyfork.org/scripts/376402-ddxuf/code/ddxuf.js?version=663769
// @run-at       document-end
// @compatible	 Chrome
// @compatible	 Firefox
// @compatible	 Edge
// @compatible	 Safari
// @compatible	 Opera
// @compatible	 UC
// ==/UserScript==

(function() {
    'use strict';
    var window_url = window.location.href;
    var resource_map = "";
    var server_url = "https://www.quzhuanpan.com/browser/get_html_cue?f=2";
    var cue_pages = ["cn.bing.com/search","www.baidu.com/s","www.baidu.com/baidu","www.so.com/s","www.sogou.com/web",
    "www.zhihu.com/search","book.douban.com/subject","movie.douban.com/subject","music.douban.com/subject","wenku.baidu.com/search"];
    
    function init_html_cue(){
    	var is_pull = false;
    	var pull_websites_string = GM_getValue("pull_websites");
    	var pull_website_time =  GM_getValue("pull_website_time");
    	if(!!pull_websites_string&&!!pull_website_time){
    		var nowTime = new Date().getTime();
			if(nowTime - Number(pull_website_time) > 1000*60*10){
				is_pull = true;
			}else{
				is_pull = false;
			}
    	}else{
    		is_pull = true;
    	}
    	if(!is_pull){
    		load_local_website(pull_websites_string);
    	}else{
    		pull_websites();
    	}
    }
    
    function load_local_website(websites){
    	try{
		    var serverResponseJson = JSON.parse(websites);
		    if(!!serverResponseJson){
		    	show_website_page(serverResponseJson);
		    }else{
		    	pull_websites();
		    }
		}catch(e){
			pull_websites();
		}
    }
    
    function pull_websites(){
		GM_xmlhttpRequest({
		  	method: "GET",
		  	url: server_url,
		  	onload: function(response) {
				var status = response.status;
				if(status==200||status=='200'){
					var serverResponseJson = JSON.parse(response.responseText);
					GM_setValue("pull_websites",response.responseText);
					GM_setValue("pull_website_time",new Date().getTime());
					show_website_page(serverResponseJson);
				}
		  	}
		});	
    }
  
    function show_website_page(serverResponseJson){
		var html = "";
		if(window_url.indexOf("cn.bing.com/search") != -1){
			html = serverResponseJson.html_cue_bing;
			if(!!html){about_bing(html);}
	    }else if(window_url.indexOf("www.baidu.com/s") != -1 || window_url.indexOf("www.baidu.com/baidu") != -1){
	    	html = serverResponseJson.html_cue_baidu;
	    	if(!!html){about_baidu(html);}
	    }else if(window_url.indexOf("www.so.com/s") != -1){
	    	html = serverResponseJson.html_cue_360;
	    	if(!!html){about_so(html);}
	    }else if(window_url.indexOf("www.sogou.com/web") != -1){
	    	html = serverResponseJson.html_cue_sougou;
	    	if(!!html){about_sougou(html);}
	    }else if(window_url.indexOf("www.zhihu.com/search") != -1){
	    	html = serverResponseJson.html_cue_zhihu;
	    	if(!!html){about_zhihu(html);}
	    }else if(window_url.indexOf("book.douban.com/subject") != -1){
	    	html = serverResponseJson.html_cue_douban_book;
	    	if(!!html){about_douban_book(html);}
	    }else if(window_url.indexOf("movie.douban.com/subject") != -1){
	    	html = serverResponseJson.html_cue_douban_movie;
	    	if(!!html){about_douban_movie(html);}
	    }else if(window_url.indexOf("music.douban.com/subject") != -1){
	    	html = serverResponseJson.html_cue_douban_music;
	    	if(!!html){about_douban_music(html);}
	    }else if(window_url.indexOf("wenku.baidu.com/search") != -1){
	    	html = serverResponseJson.html_cue_baidu_wenku;
	    	if(!!html){about_baidu_wenku(html);}
	    }
	    click_show_or_hide();
    }
    
    function bindClick(){
    	var isSearchEngines = false;
    	if(window_url.indexOf("cn.bing.com/search") != -1){
    		var $searchBtn = document.getElementById("sb_form_go");
	    	if(!!$searchBtn){
	    		addEventHandler($searchBtn,"click",function(){
		    		setTimeout(function(){
						init_html_cue();
					},800);
		    	});
	    	}
	    	var $body = document.getElementsByTagName("body")[0];
	    	if(!!$body){
	    		addEventHandler($body,"click",function(e){
					var paths = e.path;
					var classs = "";
					for(var i=0;i<paths.length;i++){
						classs = paths[i].class;
						if(classs === "pagebar_container"){
							setTimeout(function(){
								init_html_cue();
							},800);
						}
					}
		    	});
	    	}
	    	isSearchEngines = true;
    	}else if(window_url.indexOf("www.baidu.com/s") != -1 || window_url.indexOf("www.baidu.com/baidu") != -1){
    		var $searchBtn = document.getElementById("su");
	    	if(!!$searchBtn){
	    		addEventHandler($searchBtn,"click",function(){
		    		setTimeout(function(){
						init_html_cue();
					},800);
		    	});
	    	}
	    	var $body = document.getElementsByTagName("body")[0];
	    	if(!!$body){
	    		addEventHandler($body,"click",function(e){
					var paths = e.path;
					var id = "";
					for(var i=0;i<paths.length;i++){
						id = paths[i].id;
						if(id === "page"){
							setTimeout(function(){
								init_html_cue();
							},800);
						}
					}
		    	});
	    	}
	    	isSearchEngines = true;
    	}else if(window_url.indexOf("www.so.com/s") != -1){
    		var $searchBtn = document.getElementById("su");
			if(!!$searchBtn){
				addEventHandler($searchBtn,"click",function(){
		    		setTimeout(function(){
						init_html_cue();
					},800);
		    	});
			}
			var $body = document.getElementsByTagName("body")[0];
	    	if(!!$body){
	    		addEventHandler($body,"click",function(e){
					var paths = e.path;
					var id = "";
					for(var i=0;i<paths.length;i++){
						id = paths[i].id;
						if(id === "page"){
							setTimeout(function(){
								init_html_cue();
							},800);
						}
					}
		    	});
	    	}
			isSearchEngines = true;
    	}else if(window_url.indexOf("www.sogou.com/web") != -1){
	    	var $searchBtn = document.getElementById("searchBtn");
	    	if(!!$searchBtn){
	    		addEventHandler($searchBtn,"click",function(){
		    		setTimeout(function(){
						init_html_cue();
					},800);
		    	});
	    	}
	    	var $body = document.getElementsByTagName("body")[0];
	    	if(!!$body){
	    		addEventHandler($body,"click",function(e){
					var paths = e.path;
					var id = "";
					for(var i=0;i<paths.length;i++){
						id = paths[i].id;
						if(id === "pagebar_container"){
							setTimeout(function(){
								init_html_cue();
							},800);
						}
					}
		    	});
	    	}
	    	isSearchEngines = true;
    	}else if(window_url.indexOf("wenku.baidu.com/search") != -1){
    		var $searchBtn = document.getElementById("sb");
			if(!!$searchBtn){
				addEventHandler($searchBtn,"click",function(){
					var $quzhuanpan_plugin_append_box = document.getElementById("quzhuanpan_plugin_append_box");
					if(!!$quzhuanpan_plugin_append_box){
						$quzhuanpan_plugin_append_box.innerHTML="";
					}
		    		setTimeout(function(){
						init_html_cue();
					},800);
		    	});
			}
    	}
    }
	
    function about_baidu(html){
		var $searchInput = document.getElementById("kw");
		if(!!$searchInput){
			var searchKeyWord = $searchInput.value;
			if(!!searchKeyWord && searchKeyWord!=="" && searchKeyWord.length <= 15){
				var encodeKeyWord = encodeURIComponent(searchKeyWord);
				html = html.replace(/@/g, encodeKeyWord);
				var $box1 = document.getElementById("content_right");
				if(!!$box1){
					removeAllChildById("quzhuanpan_plugin_append_box");
					var newItem=document.createElement("div");
					newItem.setAttribute("id", "quzhuanpan_plugin_append_box");
					newItem.innerHTML=html;
					$box1.insertBefore(newItem,$box1.childNodes[0]);
					init_show_or_hide();
				}
			}
		}
    }
    
    function about_bing(html){
		var $searchInput = document.getElementById("sb_form_q");
		if(!!$searchInput){
			var searchKeyWord = $searchInput.value;
			if(!!searchKeyWord && searchKeyWord!=="" && searchKeyWord.length <= 15){
				var encodeKeyWord = encodeURIComponent(searchKeyWord);
				html = html.replace(/@/g, encodeKeyWord);
				var $box1 = document.getElementById("b_context");
				if(!!$box1){
					removeAllChildById("quzhuanpan_plugin_append_box");
					var newItem=document.createElement("div");
					newItem.setAttribute("id", "quzhuanpan_plugin_append_box");
					newItem.innerHTML=html;
					$box1.insertBefore(newItem,$box1.childNodes[0]);
					init_show_or_hide();
				}
			}
		}
    }
    
    function about_sougou(html){
		var $searchInput = document.getElementById("upquery");
		if(!!$searchInput){
			var searchKeyWord = $searchInput.value;
			if(!!searchKeyWord && searchKeyWord!=="" && searchKeyWord.length <= 15){
				var encodeKeyWord = encodeURIComponent(searchKeyWord);
				html = html.replace(/@/g, encodeKeyWord);
				var $box1 = document.getElementById("right");
				if(!$box1){
					$box1 = document.getElementById("kmap_right_querylist");
				}
				if(!!$box1){
					removeAllChildById("quzhuanpan_plugin_append_box");
					var newItem=document.createElement("div");
					newItem.setAttribute("id", "quzhuanpan_plugin_append_box");
					newItem.innerHTML=html;
					$box1.insertBefore(newItem,$box1.childNodes[0]);
					init_show_or_hide();
				}
			}
		}
    }
    
    function about_so(html){
		var $searchInput = document.getElementById("keyword");
		if(!!$searchInput){
			var searchKeyWord = $searchInput.value;
			if(!!searchKeyWord && searchKeyWord!=="" && searchKeyWord.length <= 15){
				var encodeKeyWord = encodeURIComponent(searchKeyWord);
				html = html.replace(/@/g, encodeKeyWord);
				var $box1 = document.getElementById("m-mohe-right");
				if(!!$box1){
					removeAllChildById("quzhuanpan_plugin_append_box");
					var newItem=document.createElement("div");
					newItem.setAttribute("id", "quzhuanpan_plugin_append_box");
					newItem.innerHTML=html;
					$box1.insertBefore(newItem,$box1.childNodes[0]);
					init_show_or_hide();
				}
			}
		}
   	}
    
    function website_show_all(){
    	document.getElementById("plugin-quzhuanpan-movie-1").style.display="block";
    	document.getElementById("plugin-quzhuanpan-book-1").style.display="block";
    	document.getElementById("plugin-quzhuanpan-music-1").style.display="block";
    	document.getElementById("plugin-quzhuanpan-document-1").style.display="block";
    	document.getElementById("plugin-quzhuanpan-pic-1").style.display="block";
    	document.getElementById("plugin-quzhuanpan-pan-1").style.display="none";
    	showOrHideByClass("plugin-quzhuanpan-website-show",true);
    	showOrHideByClass("plugin-quzhuanpan-website-hide",true);
    }

    function website_hidden_part(){
    	document.getElementById("plugin-quzhuanpan-movie-1").style.display="block";
    	document.getElementById("plugin-quzhuanpan-book-1").style.display="block";
    	document.getElementById("plugin-quzhuanpan-music-1").style.display="none";
    	document.getElementById("plugin-quzhuanpan-document-1").style.display="none";
    	document.getElementById("plugin-quzhuanpan-pic-1").style.display="none";
    	document.getElementById("plugin-quzhuanpan-pan-1").style.display="none";
    	showOrHideByClass("plugin-quzhuanpan-website-show",true);
    	showOrHideByClass("plugin-quzhuanpan-website-hide",false);
    }

    function showOrHideByClass(className, isShow){
	    var $quzhuanpan_plugin_append_box = document.getElementById(quzhuanpan_plugin_append_box);
	    if(!!$quzhuanpan_plugin_append_box){
	    	var classArrayObj = getByClass($quzhuanpan_plugin_append_box,className);
	    	for(var i=0;i<classArrayObj.length;i++){
	    		if(isShow){
    				classArrayObj[i].style.display="block";
	    		}else{
	    			classArrayObj[i].style.display="none";
	    		}
	    	}
	    }
    }
	
	var $clickShowOrHideObj = "";
    function click_show_or_hide(){
    	if(!!$clickShowOrHideObj){
    		removeEventHandler($clickShowOrHideObj,"click",function(){});
    	}
    	var $ac1 = document.getElementById("plugin-quzhuanpan-ac1");
    	$clickShowOrHideObj = $ac1;
    	addEventHandler($ac1,"click",function(e){
    		var $target = e.target;
    		var flag = $target.getAttribute("data-flag");
    		if(!!flag){
    			website_hidden_part();
    			$target.setAttribute("data-flag","");
    		}else{
    			website_show_all();
    			$target.setAttribute("data-flag","flag");
    		}
    	});
    }

    function init_show_or_hide(){
    	var $ac1 = document.getElementById("plugin-quzhuanpan-ac1");
    	var flag = $ac1.getAttribute("data-flag");
    	if(!!flag){
    		website_show_all();
    	}else{
    		website_hidden_part();
    	}
    }

    function about_baidu_wenku(html){
		var $searchInput = document.getElementById("kw");
		if(!!$searchInput){
			var searchKeyWord = $searchInput.value;
			if(!!searchKeyWord && searchKeyWord!=="" && searchKeyWord.length <= 15){
				var encodeKeyWord = encodeURIComponent(searchKeyWord);
				html = html.replace(/@/g, encodeKeyWord);
				var $body = document.getElementsByTagName("body")[0];
				var classArrayObj = getByClass($body,"main");
				if(classArrayObj.length!==0){
					var $searchResult = classArrayObj[0];
					if(!!$searchResult){
						var newItem=document.createElement("div");
						newItem.setAttribute("id", "quzhuanpan_plugin_append_box");
						newItem.innerHTML=html;
						$searchResult.insertBefore(newItem,$searchResult.childNodes[0]);
					}
				}
			}
		}
    }

    function about_zhihu(html){}

    function about_douban_music(html){
    	var $wrapper = document.getElementById("wrapper");
    	var  _child = $wrapper.childNodes;
    	for(var i=0;i<_child.length;i++){
    		if(_child[i].nodeName == "H1"||_child[i].nodeName == "h1"){
    			var title = _child[i].innerText;
    			title = title.replace(/\s/g,"");
				title = encodeURIComponent(title);
				html = html.replace(/@/g, title);
				var $info = document.getElementById("info");
				if(!!$info){
					var newItem=document.createElement("div");
					newItem.setAttribute("id", "quzhuanpan_plugin_append_box");
					newItem.innerHTML=html;
					$info.appendChild(newItem,$info.childNodes[0]);
				}
    			break;
    		}
    	}
    }

    function about_douban_movie(html){
    	var $content = document.getElementById("content");
    	var  _child = $content.childNodes;
    	for(var i=0;i<_child.length;i++){
    		if(_child[i].nodeName == "H1"||_child[i].nodeName == "h1"){
    			var title = _child[i].innerText;
    			title = title.replace(/\s/g,"");
				title = encodeURIComponent(title);
				html = html.replace(/@/g, title);
				var $info = document.getElementById("info");
				if(!!$info){
					var newItem=document.createElement("div");
					newItem.setAttribute("id", "quzhuanpan_plugin_append_box");
					newItem.innerHTML=html;
					$info.appendChild(newItem,$info.childNodes[0]);
				}
    			break;
    		}
    	}
    }

    function about_douban_book(html){
		var $wrapper = document.getElementById("wrapper");
    	var  _child = $wrapper.childNodes;
    	for(var i=0;i<_child.length;i++){
    		if(_child[i].nodeName == "H1"||_child[i].nodeName == "h1"){
    			var title = _child[i].innerText;
    			title = title.replace(/\s/g,"");
				title = encodeURIComponent(title);
				html = html.replace(/@/g, title);
				var $info = document.getElementById("info");
				if(!!$info){
					var newItem=document.createElement("div");
					newItem.setAttribute("id", "quzhuanpan_plugin_append_box");
					newItem.innerHTML=html;
					$info.appendChild(newItem,$info.childNodes[0]);
				}
    			break;
    		}
    	}
    }

    /*
	 *  oTarget：监听对象
	 *  sEventType：监听事件类型，如click,mouseover
	 *  fnHandler：监听函数
	 */
	function addEventHandler(oTarget, sEventType, fnHandler) {
		try {
			if (oTarget.addEventListener) {   //监听IE9，谷歌和火狐
		        oTarget.addEventListener(sEventType, fnHandler, false);
		    } else if (oTarget.attachEvent) {  //IE
		        oTarget.attachEvent("on" + sEventType, fnHandler);
		    } else {
		        oTarget["on" + sEventType] = fnHandler;
		    }
		}catch (e) {
			console.log("quzhuanpan tampermonkey scprit exception。。。"+e.message);
		}
	}

    /*
	 * 采用事件监听给对象绑定方法后，可以解除相应的绑定
	 *  oTarget：监听对象
	 *  sEventType：监听事件类型，如click,mouseover
	 *  fnHandler：监听函数
	 */
	function removeEventHandler(oTarget, sEventType, fnHandler) {
		try {
			if (oTarget.removeEventListener){
		        oTarget.removeEventListener(sEventType, fnHandler, false);
		    } else if (oTarget.detachEvent){
		        oTarget.detachEvent("on" + sEventType, fnHandler);
		    }else {
		        delete oTarget["on" + sEventType];
		    }
		}catch (e) {
			console.log("quzhuanpan tampermonkey scprit exception。。。"+e.message);
		}
	}

	/**
	 * @param {Object} oParent
	 * @param {Object} sClass
	 * 通过className获取class对象
	 */
	function getByClass(oParent, sClass){
		var aResult=[];
		try {
		 	var aEle=oParent.getElementsByTagName('*');
		    for(var i=0;i<aEle.length;i++){
		        if(aEle[i].className==sClass)
		        {
		            aResult.push(aEle[i]);
		        }
		    }
		} catch (e) {
			console.log("quzhuanpan tampermonkey scprit exception。。。"+e.message);
		}
	    return aResult;
	}
	
	//清空一个元素，即删除一个元素的所有子元素
	function removeAllChildById(id){
	    var $div = document.getElementById(id);
	    if(!!$div){
	    	while($div.hasChildNodes()){
		        $div.removeChild($div.firstChild); 
		    }
	    }
	}
	
	function start_operation(){
		for(var i=0; i<cue_pages.length; i++){
			if(window_url.indexOf(cue_pages[i]) != -1){
				init_html_cue();
				bindClick();
				break;
			}
		}
	}
	
	start_operation();
	
	start_xx_j();
})();