// ==UserScript==
// @name           tieba_quote
// @description    百度贴吧引用
// @include        http://tieba.baidu.com/p/*
// @include        https://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?ct=*
// @include        http://tieba.baidu.com/f?kz=*
// @icon           http://imgsrc.baidu.com/forum/pic/item/6fd108fb43166d229cb84fac452309f79152d2e2.png
// @author         congxz6688
// @grant          none
// @version        2017.2.28.0
// @namespace      https://greasyfork.org/scripts/147
// ==/UserScript==


function addStyle(css){document.head.appendChild(document.createElement("style")).textContent = css;}
var replyCss = ".split2{margin:0 4px}";
replyCss += ".ordiFloor>.SimQuote,.ordiFloor>.jiangyou,.ordiFloor>.quoteButton{margin:0px 3px; float:right} .ordiFloor>.splitl{color:#7B6681; float:right}";
replyCss += ".lzlFloor>.quoteButton{margin:0px 3px 0px 6px;} .lzlFloor>.splitl{color:#7B6681;}";
replyCss += "fieldset{width:580px !important; background-color:#E7E6E0 !important;color:#555555 !important; border: solid 1px #D2B48C !important;}";
replyCss += ".d_quote{width:582px !important; color:#555555 !important;}";
replyCss += "legend{background-color:#F2F1EE !important;border: solid 1px #C3A782 !important; border-radius: 5px !important;}.super_jubao{display:none !important;}";
replyCss += "fieldset .myresized,fieldset .BDE_Image{height:auto !important; width:auto !important; max-height:200px; max-width:560px !important;}";
addStyle(replyCss);

var splitt = "<br>———————————————————————————<br>";
var $=unsafeWindow.$;

//函数 元素精确定位
function addNodeInsertedListener(elCssPath, handler, executeOnce, noStyle) {
	var animName = "anilanim",
	prefixList = ["-o-", "-ms-", "-khtml-", "-moz-", "-webkit-", ""],
	eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
	forEach = function (array, func) {
		for (var i = 0, l = array.length; i < l; i++) {
			func(array[i]);
		}
	};
	if (!noStyle) {
		var css = elCssPath + "{",
		css2 = "";
		forEach(prefixList, function (prefix) {
			css += prefix + "animation-duration:.001s;" + prefix + "animation-name:" + animName + ";";
			css2 += "@" + prefix + "keyframes " + animName + "{from{opacity:.9;}to{opacity:1;}}";
		});
		css += "}" + css2;
		addStyle(css);
	}
	if (handler) {
		var bindedFunc = function (e) {
			var els = document.querySelectorAll(elCssPath),
			tar = e.target,
			match = false;
			if (els.length !== 0) {
				forEach(els, function (el) {
					if (tar === el) {
						if (executeOnce) {
							removeNodeInsertedListener(bindedFunc);
						}
						handler.call(tar, e);
						return;
					}
				});
			}
		};
		forEach(eventTypeList, function (eventType) {
			document.addEventListener(eventType, bindedFunc, false);
		});
		return bindedFunc;
	}
}
//函数 元素精确定位取消绑定
function removeNodeInsertedListener(bindedFunc) {
	var eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
	forEach = function (array, func) {
		for (var i = 0, l = array.length; i < l; i++) {
			func(array[i]);
		}
	};
	forEach(eventTypeList, function (eventType) {
		document.removeEventListener(eventType, bindedFunc, false);
	});
}

// 函数 回复层引用
function replyQuote(e) {
	if ($("#btUnminify").css("display") == "block") {
		unsafeWindow.unminifyShare();
	}
	if($('#tb_rich_poster').css('position') != 'fixed'){
		window.scrollTo(0, 99999);
	}
	var opyu = e.target;
	allInfo = JSON.parse($(".l_post").has(opyu).attr("data-field"));
	Louzhu = allInfo.author.name ? allInfo.author.name : allInfo.author.user_name;
	Louceng = (allInfo.content.floor ? allInfo.content.floor : allInfo.content.post_no) + "楼";
	quoteText = ($(".l_post").has(opyu).find(".d_post_content").html()) ? $(".l_post").has(opyu).find(".d_post_content").html().replace(/<a[ ].*?>@?/g, "").replace(/<\/a>/g, "").replace(/<spa[mn][ ]class="addPlus.*?<\/spa[mn]>/g, "").replace(/<spa[mn][ ]class="picFrdTab.*?<\/spa[mn]>/g, "") : $(".l_post").has(opyu).find(".d_post_content").text();
	
	//以下屏蔽小尾巴
	quoteText = quoteText.replace(/<span[ ]class="apc_src_wrapper">.*?span>/g, "");
	quoteText = quoteText.replace(/<span[ ]class="edit_font.*?">(<strong>)?\s*————.*?span>/g, "");
	quoteText = quoteText.replace(/<strong>.*?————.*?strong>/g, "");
	quoteText = quoteText.replace(//g, "");
	quoteText = quoteText.replace(/<br>\s*[-—]{2,}.*|<br>>{2,}.*|<br>([-]\s){2,}.*/g, "");
	
	//去除以下的签名图
	quoteText = quoteText.replace(/<img.*?height="21"[ ]width="570".*/, "");
	quoteText = quoteText.replace(/<img.*?height="19"[ ]width="570".*/, "");
	quoteText = quoteText.replace(/<img.*?height="20"[ ]width="560".*/, "");
	quoteText = quoteText.replace(/<img.*?height="19"[ ]width="320".*/, "");
	
	//消除多余的空格回车
	quoteText = quoteText.replace(/(<br>){2,}/g, "<br>");
	//队形
	if (opyu.className == "jiangyou") {
		unsafeWindow.test_editor.execCommand("inserthtml", quoteText);
		setTimeout(function () {
			document.querySelector(".poster_submit").click();
		}, 500);
	} else {
		//引用
		var temp = '引用&nbsp;@' + Louzhu + '&nbsp;(' + Louceng + ')<br>' + quoteText + splitt + '<br>';
		temp = temp.replace(/<\/?span>/g,"").replace(/(<br>){2,}—————————/,"<br>—————————");
		//简引
		if (opyu.className == "SimQuote") {
			var nhtemp = quoteText.replace(/<br><img.*?>/g, " [图] ").replace(/<(?!br).*?>/g, "");
			var temp = '引用&nbsp;@' + Louzhu + '&nbsp;(' + Louceng + ')<br>' + ((nhtemp.length < 72) ? nhtemp : nhtemp.slice(0, 61) + '......') + splitt + '<br>';
			temp = temp.replace("<br><br>—————————","<br>—————————");
		}
		unsafeWindow.test_editor.execCommand("inserthtml", temp);
		$(".tb-editor-editarea img:not(.BDE_Smiley)").removeAttr("id").attr("class", "BDE_Image");
	}
}

//函数 楼中楼引用
function replyQuote_lzl(e) {
	if ($("#btUnminify").css("display") == "block") {
		unsafeWindow.unminifyShare();
	}
	if($('#tb_rich_poster').css('position') != 'fixed'){
		window.scrollTo(0, 99999);
	}
	var opyu = e.target;
	allInfo = JSON.parse($(".l_post").has(opyu).attr("data-field"));
	Louzhu = JSON.parse($(".lzl_single_post").has(opyu).attr("data-field").replace(/'/g,'"')).user_name;
	Louceng = (allInfo.content.floor ? allInfo.content.floor : allInfo.content.post_no) + "楼，楼中楼";
	quoteText = $(".lzl_cnt").has(opyu).find(".lzl_content_main").html().replace(/回复.*?[ ][：:]/,"").replace(/<a[ ].*?>@?/g, "").replace(/<\/a>/g, "").replace(/<spa[mn][ ]class="addPlus.*?<\/spa[mn]>/g, "").replace(/<spa[mn][ ]class="picFrdTab.*?<\/spa[mn]>/g, "").replace(/^(<br>)+/, "").replace(/(<br>)+$/, "");
	var temp = '引用&nbsp;@' + Louzhu + '&nbsp;(' + Louceng + ')<br>' + quoteText + splitt + '<br>';
	var nhtemp = quoteText.replace(/<img.*?>/g, " [图] ").replace(/<(?!br).*?>/g, "").replace(/^\s*/, "").replace(/\s*$/, "");
	unsafeWindow.test_editor.execCommand("inserthtml", temp);
	$(".tb-editor-editarea img:not(.BDE_Smiley)").removeAttr("id").attr("class", "BDE_Image");
}
//帖子内刷新
var freshDiv = $("<spadn>", {
		title : "刷新页面",
		html : "刷"
	}).css({
		"cursor" : "pointer",
		"color" : "blue",
		"font-size" : "14px",
		"backgroundColor" : "grey",
		"height" : "14px",
		"width" : "14px",
		"padding" : "2px 5px 7px 5px",
		"position" : "fixed",
		"bottom" : "0px",
		"left" : "0px",
		"z-index" : "99999"
	}).click(function () {
		window.location = window.location.href.replace(/#\d+/, "");
	}).appendTo(document.body);
var backDiv = $("<spadm>", {
		title : "返回帖子列表",
		html : "返"
	}).css({
		"cursor" : "pointer",
		"color" : "blue",
		"font-size" : "14px",
		"backgroundColor" : "grey",
		"height" : "14px",
		"width" : "14px",
		"padding" : "2px 5px 7px 5px",
		"position" : "fixed",
		"bottom" : "0px",
		"left" : "25px",
		"z-index" : "99999"
	}).click(function () {
		window.location = document.querySelector("#tofrs_up>a").href;
	}).appendTo(document.body);

//主楼层引用按钮
addNodeInsertedListener('.p_mtail', function () {
	var uuyuui = $("<li>", {
			class : "ordiFloor"
		});
	$("<span>", {
		class : "splitl",
		html : "|"
	}).appendTo(uuyuui);
	
	$("<a>", {
		href : "javascript:void(0);",
		title : "全文引用",
		html : "引用",
		class : "quoteButton",
		click : replyQuote
	}).appendTo(uuyuui);
	
	$("<span>", {
		class : "splitl",
		html : "|"
	}).appendTo(uuyuui);
	
	$("<a>", {
		href : "javascript:void(0);",
		title : "象征性引用前面一部分",
		html : "简引",
		class : "SimQuote",
		click : replyQuote
	}).appendTo(uuyuui);
	
	$("<span>", {
		class : "splitl",
		html : "|"
	}).appendTo(uuyuui);
	
	$("<a>", {
		href : "javascript:void(0);",
		html : "队形",
		class : "jiangyou",
		click : replyQuote
	}).appendTo(uuyuui);

	$(this).find("li:has(.tip_bubble_con)").detach();
	if ($(this).find("li>.p_tail_wap").length != 0) {
		$(this).find("li:has(.p_tail_wap)").replaceWith(uuyuui);
	} else {
		$(this).append(uuyuui);
	}
});
//主楼层引用按钮第二类
addNodeInsertedListener('.post-tail-wrap', function () {
	$("<span>", {
		class : "split2",
		html : "|"
	}).prependTo(this);
	
	//给楼层加直达链接
	var z = window.location.href.match(/&z=(\d+)/)?window.location.href.match(/&z=(\d+)/)[1]:window.location.href.match(/\/p\/(\d+)/)[1];
	var rtrde = JSON.parse($(".l_post").has(this).attr("data-field"));
	var tabPid = rtrde.content.id ? rtrde.content.id : rtrde.content.post_id;
	$("<a>", {
		href : "http://tieba.baidu.com/f?ct=335675392&tn=baiduPostBrowser&z=" + z + "&sc=" + tabPid + "#" + tabPid,
		html : "直达",
		title : "右键复制链接地址，可供访问者直达此楼",
	}).prependTo(this);	$("<span>", {
		class : "split2",
		html : "|"
	}).prependTo(this);
	
	$("<a>", {
		href : "javascript:void(0);",
		title : "全文引用",
		html : "引用",
		class : "quoteButton",
		click : replyQuote
	}).prependTo(this);
	
	$("<span>", {
		class : "split2",
		html : "|"
	}).prependTo(this);
	
	$("<a>", {
		href : "javascript:void(0);",
		title : "象征性引用前面一部分",
		html : "简引",
		class : "SimQuote",
		click : replyQuote
	}).prependTo(this);
	
	$("<span>", {
		class : "split2",
		html : "|"
	}).prependTo(this);
	
	$("<a>", {
		href : "javascript:void(0);",
		html : "队形",
		class : "jiangyou",
		click : replyQuote
	}).prependTo(this);
});

//楼中楼引用按钮
addNodeInsertedListener('.lzl_content_reply', function () {
	var z = window.location.href.match(/&z=(\d+)/)?window.location.href.match(/&z=(\d+)/)[1]:window.location.href.match(/\/p\/(\d+)/)[1];
	var lzlspid = JSON.parse($(".lzl_single_post").has(this).attr("data-field").replace(/'/g,'"')).spid;
	var iip = $("<span>", {
			class : "lzlFloor"
		}).insertAfter($(this).find(".lzl_jb"));
	
	$("<a>", {
		href : "javascript:void(0);",
		html : "引用",
		class : "quoteButton",
		click : replyQuote_lzl
	}).appendTo(iip);
	
	$("<span>", {
		class : "splitl",
		html : "|"
	}).appendTo(iip);
	
	$("<a>", {
		href : "http://tieba.baidu.com/f?ct=335675392&tn=baiduPostBrowser&z=" + z + "&sc=" + lzlspid + "#" + lzlspid,
		title : "右键复制链接地址，可供访问者直达此楼",
		class : "quoteButton",
		html : "链接",
	}).appendTo(iip);
	
	$("<span>", {
		class : "splitl",
		html : "|"
	}).appendTo(iip);
});

//给引用部分改个式样
addNodeInsertedListener('.d_post_content', function () {
	var ol = this.innerHTML;
	var splittReg = new RegExp("<br>—{27,36}", "g");
	var howManyQuote = ol.match(splittReg);
	if (howManyQuote && ol.indexOf("楼)") != -1) {
		$(this.parentNode.parentNode).find("br").detach();
		var partQuote = ol.split(howManyQuote[0]);
		if (howManyQuote.length == 1) {
			var uu = partQuote[0].replace(/.*?(?=引用[ ])/, "");
			var tmp1 = uu.substr(0, uu.indexOf("楼)") + 2);
			if (tmp1.match(/\(\d{6,}[ ]\d+楼/)) {
				var thisTabId = window.location.href.match(/(\/p\/|&z=)\d{8,}/)[0].replace("/p/", "").replace("&z=", "");
				tmp1 = tmp1.replace(/\((\d{6,})[ ](\d+楼)/, "(<a href='http://tieba.baidu.com/p/" + thisTabId + "?pid=$1#$1' target='_blank'>$2</a>");
			}
			var tmp2 = (partQuote[0].split("楼)<br>")[1]) ? partQuote[0].split("楼)<br>")[1] : "";
			var quote = '<blockquote class="d_quote"><fieldset><legend>' + tmp1 + '</legend><p class="quote_content">' + tmp2 + '</fieldset></blockquote>';
			$(quote).insertBefore(this.parentNode);
			this.innerHTML = partQuote[1].replace(/^(<br>){1,}/, "");
		} else {
			for (ss = 0; ss < howManyQuote.length; ss++) {
				if (partQuote[ss].indexOf("楼)") == -1) {
					continue;
				} else {
					var uu = partQuote[ss].replace(/.*?(?=引用[ ])/, "");
					var tmp1 = uu.substr(0, uu.indexOf("楼)") + 2);
					if (tmp1.match(/\(\d{6,}[ ]\d+楼/)) {
						var thisTabId = window.location.href.match(/(\/p\/|&z=)\d{8,}/)[0].replace("/p/", "").replace("&z=", "");
						tmp1 = tmp1.replace(/\((\d{6,})[ ](\d+楼)/, "(<a href='http://tieba.baidu.com/p/" + thisTabId + "?pid=$1#$1' target='_blank'>$2</a>");
					}
					var tmp2 = partQuote[ss].split("楼)<br>")[1];
					if (partQuote[ss + 1]) {
						oll = partQuote[ss + 1].substr(0, (partQuote[ss + 1].indexOf("引用 ") == -1) ? partQuote[ss + 1].length : partQuote[ss + 1].indexOf("引用 "));
					} else {
						oll = "";
					}
					var quote = '<blockquote class="d_quote"><fieldset><legend>' + tmp1 + '</legend><p class="quote_content">' + tmp2 + '</fieldset></blockquote>';
					$(this.parentNode.parentNode).append(quote);
					var partText = '<cc><div class="d_post_content">' + oll.replace(/^(<br>){1,}/, "") + '</div></cc><br>';
					$(this.parentNode.parentNode).append(partText);
				}
			}
			this.innerHTML = "";
		}
	}
});
//链接跳转
addNodeInsertedListener('a[href^="http://jump.bdimg.com"]', function () {
	if (this.parentNode.className != "apc_src_wrapper") {
		this.href = (this.innerHTML.indexOf("http") != -1 ? "" : "http://") + this.innerHTML.replace(/&amp;/g, "&");
	}
});
//给各楼层号添加直达链接
addNodeInsertedListener('.p_tail>li:first-child>span', function () {
	var z = window.location.href.match(/&z=(\d+)/)?window.location.href.match(/&z=(\d+)/)[1]:window.location.href.match(/\/p\/(\d+)/)[1];
	var rtrde = JSON.parse($(".l_post").has(this).attr("data-field"));
	var tabPid = rtrde.content.id ? rtrde.content.id : rtrde.content.post_id;
	//var hreff = window.location.href.replace(/f\?ct.*?&z=/, "p/").replace(/\?.*/, "").replace(/#.*/, "");
	var newAn = $("<a>", {
			href : "http://tieba.baidu.com/f?ct=335675392&tn=baiduPostBrowser&z=" + z + "&sc=" + tabPid + "#" + tabPid,
			title : "右键复制链接地址，可供访问者直达此楼",
			html : this.innerHTML
		});
	$(this).replaceWith(newAn);
});

//编辑窗预载入 节取自 寂寞的原子 的悬浮窗脚本
if (!window.test_editor) {
	_.Module.use("common/widget/RichPoster", {
		prefix : {}
	}, function (t) {
		t.init();
		t.unbindScrollEvent();
	});
}
//高图片自动展开
$(".replace_tip").click();