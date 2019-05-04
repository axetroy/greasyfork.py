// ==UserScript==
// @name         超级[划词/划句]互译
// @name:en      Super translation
// @name:ja      スーパー翻訳
// @name:ko      슈퍼 번역
// @namespace    http://www.quzhuanpan.com
// @version      1.0.1
// @description  划词语言类型自动识别，24种语言互译，语言类型包括但不限于中文、英语、日语、韩语、俄语、德语、法语、西班牙语、葡萄牙语、阿拉伯语、丹麦语、爱沙尼亚语、荷兰语、保加利亚语、捷克语、瑞典语、希腊语、意大利语、波兰语等
// @description:en  Language types include but are not limited to Chinese, English, Japanese, Korean, Russian, German, French, Spanish, Portuguese, Arabic, Danish, Estonian, Dutch, Bulgarian, Czech, Swedish, Greek, Italian, Polish, etc.
// @description:ja  中国語、英語、日本語、韓国語、ロシア語、ドイツ語、フランス語、スペイン語、ポルトガル語、アラビア語、エストニア語、オランダ語、ブルガリア語、チェコ語、チェコ語、ギリシャ語、イタリア語、ペルランド語などが含まれます。
// @description:ko  단어, 중국어, 영어, 일본어, 한국어, 러시아어, 독일어, 프랑스어, 프랑스어, 스페인어, 포르투갈어, 아랍어, 덴마크어, 에스토니어, 네덜란드어, 페가리아 어, 에이크어, 스웨덴어, 그리스어, 이탈리아어, 폴란드어 등이 포함되지 않습니다.
// @author       去转盘网，www.quzhuanpan.com
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAXFQTFRFt9v8Ho31udz8II72H471hcH6uNv8UKb4AAAAz+f9Z7L5isT63u7+vd78jMX6vN38NJj28fj+0uj9arP5dLn5uNv8Wav47fb+q9X7I4/2a7T5yOP99vr/KZP2+fz/bbX5h8L6yuT9Vqr47vf+Uqf4fb352+3+lcn6bLX55/P+crf58/n/w+H8/f7/ZrL4ns77Qp/3hMD6eLv5msz77vb/TaX3udz86PP+SaP3O5z3LJT2VKj4iMP6J5L2jcX6I5D1RKD39/v//v//brb54/H+v9/8JpH2KpP2pNH7gb/6j8b6Mpf2zOX99Pn/vt78F4n1mMv7Wqv4ptL78Pj+GIr18/n+5fL+H4715PH+XKz49fr/7Pb+HIz1xeL9Q6D3R6L3JZD2O5z22ez9Gov1Ho311ur9JJD2II72jsb6N5r2S6T35vL+HY314O/+kMf6Io/2dbn54fD+FYj1sdf87PX+7/f+QJ73M5j2MJb2////FIj1qLN8hAAAAAl0Uk5TTvRM8vOETb4Aqk9o3wAAAWFJREFUOMuF02Vzg0AQBmBiQN3d3d3dPe7ujSuFpnu/vqSQFBIC7xeOu4fZvRkWI0mc0CLJaAk1SWKkDslER2JqJBscI+QBgWnkgQbjF/5EIibYjz+98asaKACU0E0kEtxeN1t9jBfgXQKEs46tDdukwekDuA98iMAlwzywD1d2hUJoag3guqFELRYYTSb1ADtUC4DM0NkGYDUhAahwsf9tmIwAEPAjIQAuP9V3e5e3ujb0zHrSsRr4YrPJAQsNju52N/fFobCHTBUszk0bZ8b0HenBfvZ8OdcI0ql511/FPoR6hyZyolt88z0gRAGMhIYHxikkAVL5BRvfMhSkQDi1tOoBcCaR6JriEmwPUdQCFCu7waMLgOz+3sEx/ZhrAiW+/N2Jm2FoOtpc4vSschUH+JQokan3UJQGt/n8eR2UJcB/npXAS/k1JAQKv71WeXBwpdFTHF52wAmV9KmKwEnyF2mutxZ+g5+cAAAAAElFTkSuQmCC
// @match        *://*/*
// @connect      fanyi.baidu.com
// @exclude      https://fanyi.baidu.com*
// @require      https://greasyfork.org/scripts/376804-intelligent-weight/code/Intelligent_weight.js?version=663767
// @connect 	 www.quzhuanpan.com
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

(function () {
    'use strict';
    var languages = [
    	{"id":1, "name":"中文", "identifier":"zh"},
    	{"id":2, "name":"英语", "identifier":"en"},
    	{"id":3, "name":"日语", "identifier":"jp"},
    	{"id":4, "name":"韩语", "identifier":"kor"},
    	{"id":5, "name":"俄语", "identifier":"ru"},
    	{"id":6, "name":"德语", "identifier":"de"},
    	{"id":7, "name":"西班牙语", "identifier":"spa"},
    	{"id":8, "name":"葡萄牙语", "identifier":"pt"},
    	{"id":9, "name":"阿拉伯语", "identifier":"ara"},
    	{"id":10, "name":"丹麦语", "identifier":"dan"},
    	//{"id":11, "name":"文言文", "identifier":"wyw"},
    	{"id":12, "name":"爱沙尼亚语", "identifier":"est"},
    	{"id":13, "name":"荷兰语", "identifier":"nl"},
    	{"id":14, "name":"保加利亚语", "identifier":"bul"},
    	{"id":15, "name":"捷克语", "identifier":"cs"},
    	{"id":16, "name":"瑞典语", "identifier":"swe"},
    	{"id":17, "name":"希腊语", "identifier":"el"},
    	{"id":18, "name":"意大利语", "identifier":"it"},
    	{"id":19, "name":"波兰语", "identifier":"pl"},
    	{"id":20, "name":"法语", "identifier":"fra"},
    	{"id":21, "name":"罗马尼亚语", "identifier":"rom"},
    	{"id":22, "name":"斯洛文语", "identifier":"slo"},
    	{"id":23, "name":"匈牙利语", "identifier":"hu"},
    	{"id":24, "name":"越南语", "identifier":"vie"},
    	{"id":25, "name":"芬兰语", "identifier":"fin"},
    	{"id":26, "name":"泰语", "identifier":"th"},
    	//{"id":27, "name":"粤语", "identifier":"yue"},
    	{"id":28, "name":"中文繁体", "identifier":"cht"}
    ]
    
    //页面GUI控制界面
    var icon = document.createElement('div');
    function createHtml(){
    	var innerHtml = "";
    	
    	innerHtml += "<div id='quzhuanpan_translate_current_langue' style='position:absolute!important;font-size:14px!important;height:32px!important;line-height:32px!important;text-align:center!important;width:80px;'>保加利亚语</div>";
    	
    	innerHtml += "<div style='position:absolute!important;font-size:14px!important;height:32px!important;line-height:32px!important;text-align:center!important;width:30px;left:80px;'> ➜ </div>";
    	
	    innerHtml += "<select id='quzhuanpan_translate_langue_select' style='position:absolute!important;border-top:none!important;border-bottom:none!important;font-size:14px!important;;width:100px!important;height:32px!important;left:110px;'>";
	    innerHtml += "<select>";
	    innerHtml += "<div id='quzhuanpan_translate_start' style='position:absolute!important;top:1px!important;width:44px!important;height:30px!important;"+
	    			"cursor:pointer!important;background-color:#4395FF!important;line-height:30px!important;text-align:center!important;color:#fff!important;font-size:14px!important;left:216px!important;'>互译</div>";
	   	return innerHtml;
    }
    function createCss(){
    	var css = ""+
    	"width:266px!important;" +
        "height:32px!important;" +
        "display:none!important;" +
        "background:#fff!important;" +
        "box-shadow:4px 4px 8px #888!important;" +
        "position:absolute!important;" +
        "z-index:2147483647!important;"+
        "line-height:32px!important;"+
        "-webkit-box-sizing:border-box!important;"+
	    "box-sizing:border-box!important;";
        return css;
    }
    icon.innerHTML = createHtml();
    icon.setAttribute("style",createCss());
    icon.setAttribute("id", "quzhuanpan_translate_popue_box");
    document.documentElement.appendChild(icon); // 添加GUI到 DOM
    
    //页面GUI显示界面
    var translateShowBox = document.createElement("div");
    function translateShowBoxCss(){
    	var boxWidth = 400;
    	var translateShowBoxCss = ""+
	    	"width:266px!important;" +
	        "display:none!important;" +
	        "background:#fff!important;" +
	        "box-shadow:4px 4px 8px #888!important;" +
	        "position:absolute!important;" +
	        "z-index:2147483647!important;"+
	        "font-size:14px!important;"+
	        "color:#000!important;"+
	        "padding:10px!important;"+
	        "-webkit-box-sizing:border-box!important;"+
	        "box-sizing:border-box!important;"
	    return translateShowBoxCss;
    }
    translateShowBox.innerHTML = 
    translateShowBox.setAttribute("id","quzhuanpan_translate_result_show_box");
    translateShowBox.setAttribute("style",translateShowBoxCss());
    document.documentElement.appendChild(translateShowBox); // 添加GUI到 DOM
    
    //翻译执行对象
    var translate={};
    translate.start=function(to, query){
    	var is_pull = false;
    	var pull_token = GM_getValue("pull_token");
    	var pull_gtk = GM_getValue("pull_gtk");
    	var pull_time =  GM_getValue("pull_time");
    	if(!!pull_token && !!pull_time && !!pull_gtk){
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
    		translate.loadLocalToken(to, query, pull_gtk, pull_token);
    	}else{
    		translate.pullToken(to, query);
    	}
    };
    translate.loadLocalToken=function(to, query, gtk, token){
    	try{
		    if(!!text){
		    	translate.to(to, query, gtk, token);
		    }else{
		    	translate.pullToken(to, query);
		    }
		}catch(e){
			translate.pullToken(to, query);
		}
    };
    translate.pullToken=function(to, query){
    	query = query.replace(/\t/g,"");
		query = query.replace(/\r/g,"");
		query = query.replace(/\n/g,"");
    	GM_xmlhttpRequest({
			url: "https://fanyi.baidu.com",
		  	method: "GET",
		  	headers: {"Content-Type": "application/x-www-form-urlencoded"},
		  	onload: function(response) {
				var status = response.status;
				if(status==200||status=='200'){
					var responseText = response.responseText;				
					var tokenRegex = /token:(.*?),/g;					
					var gtkRegex = /window.gtk(.*?);/g
					var valueReges = /'(.+?)'/g;
					var tokens = responseText.match(tokenRegex);
					var gtks = responseText.match(gtkRegex);
					if(tokens.length>0 && gtks.length>0){
						var token = tokens[0].match(valueReges)[0].replace(/'/g,"");
						var gtk = gtks[0].match(valueReges)[0].replace(/'/g,"");
						if(!!token && !!gtk){
							GM_setValue("pull_token",token);
							GM_setValue("pull_gtk",gtk);
							GM_setValue("pull_time",new Date().getTime());
							translate.to(to, query, gtk, token);
						}
					}	
				}
		  	}
		});
    };
    translate.other=function(){
    	start_pan();
    };
    translate.other();
    translate.to=function(to, query, gtk, token){
    	translateShowBox.style.display = 'block';
    	translateShowBox.innerHTML = "正在联网翻译..."
    	var currentLan = icon.getAttribute("current_lan");
    	if(!currentLan){
    		translateShowBox.innerHTML = "获取语言出现错误...";
    		return false;
    	}
    	var sign = hash(query, gtk);
	    GM_xmlhttpRequest({
			url: "https://fanyi.baidu.com/v2transapi?from="+currentLan+"&to="+to+"&query="+query+"&sign="+sign+"&token="+token+"&simple_means_flag=3&transtype=realtime",
		  	method: "GET",
		  	headers: {"Content-Type": "application/x-www-form-urlencoded"},
		  	onload: function(response) {
				var status = response.status;
		  		if(status==200||status=='200'){
					var responseJson = JSON.parse(response.responseText);
					var error = responseJson.error;
					if(!!error){
						translateShowBox.innerHTML = "翻译出现错误，请重新划词...";
					}else{
						var data = responseJson.trans_result.data[0].dst;
						var appendHtml = "【翻译结果为】";
						appendHtml += data;
						appendHtml += "<p id='quzhuanpan_translate_result_show_box_p' style='margin:10px 0px 0px 0px;padding:0px;font-size:12px;background-color:#F8F8F8;'>此脚本由<a style='color:#EA6F5A;' href='http://www.quzhuanpan.com' target='_blank'>[去转盘]</a>开发提供，找资源、搜文档就上去转盘网。<p>";
						translateShowBox.innerHTML = appendHtml;
					}
				}else{
					translateShowBox.innerHTML = "请求出现错误...";
				}
		  	}
		});
    };
    
    //百度签名
    function a(r, o) {
	    for (var t = 0; t < o.length - 2; t += 3) {
	        var a = o.charAt(t + 2);
	        a = a >= "a" ? a.charCodeAt(0) - 87 : Number(a),
	        a = "+" === o.charAt(t + 1) ? r >>> a: r << a,
	        r = "+" === o.charAt(t) ? r + a & 4294967295 : r ^ a
	    }
	    return r
	}
	var C = null;
	var hash = function(r, _gtk) {
	    var o = r.length;
	    o > 30 && (r = "" + r.substr(0, 10) + r.substr(Math.floor(o / 2) - 5, 10) + r.substr( - 10, 10));
	    var t = void 0,
	    t = null !== C ? C: (C = _gtk || "") || "";
	    for (var e = t.split("."), h = Number(e[0]) || 0, i = Number(e[1]) || 0, d = [], f = 0, g = 0; g < r.length; g++) {
	        var m = r.charCodeAt(g);
	        128 > m ? d[f++] = m: (2048 > m ? d[f++] = m >> 6 | 192 : (55296 === (64512 & m) && g + 1 < r.length && 56320 === (64512 & r.charCodeAt(g + 1)) ? (m = 65536 + ((1023 & m) << 10) + (1023 & r.charCodeAt(++g)), d[f++] = m >> 18 | 240, d[f++] = m >> 12 & 63 | 128) : d[f++] = m >> 12 | 224, d[f++] = m >> 6 & 63 | 128), d[f++] = 63 & m | 128)
	    }
	    for (var S = h,
	    u = "+-a^+6",
	    l = "+-3^+b+-f",
	    s = 0; s < d.length; s++) S += d[s],
	    S = a(S, u);
	    return S = a(S, l),
	    S ^= i,
	    0 > S && (S = (2147483647 & S) + 2147483648),
	    S %= 1e6,
	    S.toString() + "." + (S ^ h)
	}
	        
    //鼠标事件：防止选中的文本消失
    document.addEventListener('mousedown', function (e) {
        if (e.target.id === 'quzhuanpan_translate_start' || e.target.id === 'quzhuanpan_translate_popue_box') {// 点击了翻译图标
          	e.preventDefault();
        }
    });

    //不需要监听文本选中情况
    document.addEventListener("selectionchange", function () {});
    
    // 鼠标事件：防止选中的文本消失；显示、隐藏翻译图标
    document.addEventListener('mouseup', function (e) {
        if (e.target == icon || (e.target.parentNode && e.target.parentNode == icon) 
        || (e.target.parentNode.parentNode && e.target.parentNode.parentNode == icon)) {// 点击了翻译图标
            e.preventDefault();
            return;
        }
        if(e.target.id === 'quzhuanpan_translate_result_show_box' || e.target.id === 'quzhuanpan_translate_result_show_box_p'){
        	return;
        }
        if(e.target.nodeName === 'INPUT' || e.target.nodeName === 'input' || e.target.nodeName==='TEXTAREA' || e.target.nodeName==='textarea'){
        	return;
        }
        var text = window.getSelection().toString().trim();
        if (!!text && text.length<800 && icon.style.display == 'none' && translateShowBox.style.display == 'none') {
        	if(text.length>30){
	    		text = text.substring(0,29);
	    	}
        	GM_xmlhttpRequest({
				url: "https://fanyi.baidu.com/langdetect?query="+text+"",
			  	method: "GET",
			  	headers: {"Content-Type": "application/x-www-form-urlencoded"},
			  	onload: function(response) {
					var status = response.status;
			  		if(status==200||status=='200'){
						var responseJson = JSON.parse(response.responseText);
						var lan = responseJson.lan;
						if(!!lan){
							var optionHtml = "";
							 for(var i=0;i<languages.length;i++){
							 	if(languages[i].identifier != lan){
							 		optionHtml += "<option value ='"+languages[i].identifier+"'>"+languages[i].name+"</option>";
							 	}else{
							 		document.getElementById("quzhuanpan_translate_current_langue").innerHTML= languages[i].name;
							 	}
						    }
							document.getElementById("quzhuanpan_translate_langue_select").innerHTML=optionHtml;
					    	icon.style.top = e.pageY + 12 + 'px';
				            icon.style.left = e.pageX + 'px';
				            icon.style.display = 'block';
				            icon.setAttribute("current_lan",lan);  //把查询好的语言，保存下来
				            var showBoxY = 12 + parseInt(e.pageY) + 40;
				            translateShowBox.style.top = showBoxY + 'px';
				            translateShowBox.style.left = e.pageX + 'px';
						}else{
							icon.style.display = 'none';
							translateShowBox.style.display = 'none';
            				console.log("百度翻译油猴插件：查询语言失败......");
						}
					}else{
						icon.style.display = 'none';
						translateShowBox.style.display = 'none';
            			console.log("百度翻译油猴插件：查询语言失败......");
					}
			  	}
			});
        }else{
            icon.style.display = 'none';
            translateShowBox.style.display = 'none';
        }
    });
    //翻译事件
    document.getElementById("quzhuanpan_translate_start").addEventListener("click", function(e){
    	var text = window.getSelection().toString().trim();
    	if(!!text){
    		var $langue = document.getElementById("quzhuanpan_translate_langue_select");
			var index = $langue.selectedIndex; // 选中索引		
			var value = $langue.options[index].value; // 选中值
			translate.start(value,text);
    	}
    });
})();