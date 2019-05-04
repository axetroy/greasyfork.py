// ==UserScript==
// @name        微博图片全显示
// @namespace   hzhbest
// @include     http://weibo.com/*
// @include     https://weibo.com/*
// @include     http://www.weibo.com/*
// @include     https://www.weibo.com/*
// @description    同屏显示多图微博的全部大图。
// @version     3.2
// @grant       GM_xmlhttpRequest
// @grant       unsafeWindow
// @run-at         document-end
// ==/UserScript==

(function() {

var topheight = 10;
var topspare = 50;

	// http://weibo.com/2710065263/BmxiVDCgt?from=page_1005052710065263_profile&wvr=6&mod=weibotime&type=comment#_rnd1436436058420
	// http://weibo.com/2328516855/CnYCvixUq?type=comment#_rnd1436493435761
var regex = /weibo\.com\/\d{10}\/[a-z0-9A-Z]{9}\??/;

// window.addEventListener('load', function(){if (regex.test(document.location.href)) {setTimeout(init, 3000);}}, false);
if (regex.test(document.location.href)) init(); //console.log(regex.test(document.location.href));

function init(){
	var list_ul = getElementsByClass("list_ul", 'div')[0];  //评论框架
	var expbox = getElementsByClass("WB_expand_media_box", 'div')[0];  //附加媒体容器
	if (!list_ul && !expbox){  //console.log("no1");//未加载评论框架，等候
		setTimeout(init, 1000);
		return;
	} else if (!!list_ul && !expbox) {  //console.log("no2");//评论框架已加载却无附加媒体容器，退出
		getlongtext()
		return;
	} else {//console.log("go");
		getlongtext()
		go();
	}
}

function go(){
	var wrpbox = getElem('//div[@node-type="feed_list_media_prev"]') || getElem('//div[@class="WB_detail"]/div[@class="WB_media_wrap clearfix"]');        //附加媒体容器
	var expbox = getElementsByClass("WB_expand_media_box", 'div')[0];  //扩展媒体容器
	var feedbox = getElementsByClass("WB_feed_handle", 'div')[0];		//评论区分解元素
	var appbox = getElementsByClass("WB_app_view", 'div')[0];			//应用容器
	var videobox = getElem('//div[@class="WB_detail"]//div[@node-type="fl_h5_video_disp"]');			//视频容器
	var maintextimg = getElem('//div[@class="WB_detail"]/div[@class="WB_text W_f14"]/a[@imagecard]');   //正文中的图片
	var box = wrpbox.parentNode;										//装载提取内容的容器
	var imgthumbs = wrpbox.getElementsByTagName('img');				//提取其中的图片
	var imgsrc = [], imgs = [], imgl = imgthumbs.length, mtimg;
	var _limited = false;
	//console.log(maintextimg.attributes[0]);

	// Insert CSS
	var headID = document.getElementsByTagName("head")[0];         
	var cssNode = creaElemIn('style', headID);
	cssNode.type = 'text/css';
	cssNode.innerHTML = '.big_pic{max-width: 890px;} .big_pic_n{max-width: 500px;} ';  //大图样式
	cssNode.innerHTML += '.WB_frame_c {width: auto !important; max-width: 920px; min-width: 600px;} .WB_text.W_f14, .repeat_list .list_box .WB_text, .WB_expand>.WB_text{width: 490px;} .WB_frame_c .media_box{display: none !important;} div[node-type="comment_list"] .media_box{display: block !important;} div[id^="Pl_Core_RecommendFeed__"]{right: 150px; width: 100px !important; max-height: 35px; overflow: hidden; transition: all ease 0.2s 0.5s;} div[id^="Pl_Core_RecommendFeed__"]:hover{width: 300px !important; max-height: 1000px;} div[id^="Pl_Core_RecommendFeed__"] .opt_box{display:none;} div[id^="Pl_Core_RecommendFeed__"]:hover .opt_box{display: inline-block;}';  //微博自身框架样式
	cssNode.innerHTML += '.big_pic_sc,.big_pic_nc,.big_pic_1c,.big_pic_2c,.big_pic_3c{position: fixed; left:10px; height: 20px; padding: 3px; border: 1px solid white; color: white; background: rgba(133,133,133,0.6); cursor: pointer;} .big_pic_sc{top: 430px} .big_pic_nc{top: 500px;} .big_pic_1c{top: 300px;} .big_pic_2c{top: 340px;} .big_pic_3c{top: 380px;}';  //按钮样式
	

	var sclink = creaElemIn('div', document.body);						//直达评论链接
	sclink.className = "big_pic_sc";
	sclink.innerHTML = "直达评论";
	sclink.addEventListener("click", function(){
		scrollto(getTop(feedbox));
	}, false);
	
	if (!!videobox) {
		cssNode.innerHTML = '.big_pic_sc{position: fixed; left:10px; padding: 3px; border: 1px solid white; color: white; background: rgba(133,133,133,0.6); cursor: pointer;} .big_pic_sc{top: 430px}';
		return;
	}
	
	if (!!appbox) {													//检测到应用容器（微博文章或视频）时退出
		box.appendChild(appbox);
		if (!!wrpbox) box.removeChild(wrpbox);
		if (!!expbox) expbox.parentNode.removeChild(expbox);
		cssNode.innerHTML = '.media_box{display: none !important;} .big_pic_sc{position: fixed; left:10px; padding: 3px; border: 1px solid white; color: white; background: rgba(133,133,133,0.6); cursor: pointer;} .big_pic_sc{top: 430px}';
		return;
	}
	
	if (!!maintextimg) {												//检测到有正文转发含有图片，自动展开
		maintextimg.innerHTML = "";
		maintextimg.parentNode.insertBefore(document.createElement("br"), maintextimg);
		mtimg = creaElemIn("img", maintextimg);
		mtimg.src = maintextimg.getAttribute("imagecard").replace("pid=", "http://ww1.sinaimg.cn/bmiddle/") + ".jpg";
		mtimg.className = "big_pic";
	}
	
	var j = 0;
	for (var i = 0; i < imgl; i++) {		console.log(j,imgthumbs[i].src);							//提取大图
		if (/sinaimg.c(om|n)\/(orj|thumb)\d{3}/.test(imgthumbs[i].src)) {		// http://ww3.sinaimg.cn/thumb180/005CeWgjjw1f28f73p6imj30cs07ot96.jpg
			imgsrc[i] = imgthumbs[i].src.replace(/(sinaimg\.c(om|n)\/)(orj|thumb)\d{3}/, "$1large");     console.log(j,imgsrc[i]);
		} else {
			j += 1;  //console.log(j,imgl,j == imgl);
			continue;
		}
		if (j == imgl) return;
		imgs[i] = creaElemIn('img', box);
		creaElemIn('br', box);
		imgs[i].src = imgsrc[i];
		imgs[i].className = "big_pic";
	}
	if (j == imgl) {													//没找到符合条件的大图，退出
		cssNode.innerHTML = '.big_pic_sc{position: fixed; left:10px; padding: 3px; border: 1px solid white; color: white; background: rgba(133,133,133,0.6); cursor: pointer;} .big_pic_sc{top: 430px}';
		return;
	}
	imgl = imgs.length;
	if (!!mtimg) imgl = imgs.unshift(mtimg); //console.log(imgs.length);
	// console.log(!!wrpbox + "1 " + !!expbox + "2");
	if (!!wrpbox) box.removeChild(wrpbox);
	if (!!expbox) expbox.parentNode.removeChild(expbox);
	
	var nclink = creaElemIn('div', document.body);						//图片限宽链接
	nclink.className = "big_pic_nc";
	nclink.innerHTML = "图片限宽";
	nclink.addEventListener("click", function(){
		if (_limited) {
			for (var i = 0; i < imgl; i++) {imgs[i].className = "big_pic";}
			_limited = false;
		} else {
			for (var i = 0; i < imgl; i++) {imgs[i].className = "big_pic_n";}
			_limited = true;
		}
	}, false);
	var n1link = creaElemIn('div', document.body);						//首个图片链接
	n1link.className = "big_pic_1c";
	n1link.innerHTML = "△首个图片";
	n1link.addEventListener("click", function(){
		scrollto(getTop(imgs[0])-topspare);
	}, false);
	var n2link = creaElemIn('div', document.body);						//上个图片链接
	n2link.className = "big_pic_2c";
	n2link.innerHTML = "▲上个图片";
	n2link.addEventListener("click", function(){
		var t = document.documentElement.scrollTop; console.log("t:"+t);
		for (var j=imgl-1; j>=0; j--) { console.log(j,getTop(imgs[j]),getTop(imgs[j]) + imgs[j].height - topspare);
			if (t > getTop(imgs[j]) + imgs[j].height - topspare) {
				scrollto(getTop(imgs[j]) - topspare);
				n2link.innerHTML = "▲上个图片[" + (j+1) + " / " + imgl + "]";
				return;
			}
		}
	}, false);
	var n3link = creaElemIn('div', document.body);						//下个图片链接
	n3link.className = "big_pic_3c";
	n3link.innerHTML = "▼下个图片";
	n3link.addEventListener("click", function(){
		var t = document.documentElement.scrollTop; console.log("t:"+t);
		for (var j=0; j<imgl; j++) { console.log(j,getTop(imgs[j]));
			if (t < getTop(imgs[j]) - topspare) {
				scrollto(getTop(imgs[j]) - topspare);
				n2link.innerHTML = "▲上个图片[" + (j+1) + " / " + imgl + "]";
				return;
			}
		}
	}, false);
	waitscroll();
}

function waitscroll(){  //等待页面完全载入再滚动
	var list_ul = getElementsByClass("list_ul", 'div')[0];   //↓等待评论框架载入，如果评论框架就位就等待评论区或无评论提示载入，再视滚动位置判断
	if (!list_ul || (!list_ul.getElementsByTagName('div')[0] || !getElementsByClass("tips_rederror", 'div')[0]) || document.documentElement.scrollTop < (topheight+70)) {
		setTimeout(waitscroll, 300);  //console.log("wait");
		return;
	} else {
		scrollto(topheight);  //console.log("scroll");
	}
}

function scrollto(pos){  //滚动
	document.documentElement.scrollTop = pos;
}

// Create an element
function creaElemIn(tagname, destin) {
	var theElem = destin.appendChild(document.createElement(tagname));
	return theElem;
}
// Get the first element by xpath
function getElem(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}
// Get elements by classname
function getElementsByClass(cName ,tagName){
	var elements = tagName ? document.getElementsByTagName(tagName) : document.getElementsByTagName('*');
	var findEles = [];
	var reg = new RegExp('^'+cName+'\\s*|\\s+'+cName+'\\s+|\\s+'+cName+'$');
	for(var i=0;i<elements.length;i++) {
		if(reg.test(elements[i].className))findEles.push(elements[i]);          
	}
	return findEles;
}
// Get the absolute top of an element
function getTop(e){
	var offset=e.offsetTop;
	if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
	return offset;
} 
// 通过模拟请求展开超长微博
function getlongtext() {
	var longtext = document.getElementById('plc_main').querySelectorAll('[action-type="fl_unfold"]')[0];   //可展开的按钮
	if (!longtext) return;
	var mid = longtext.getAttribute('action-data').slice(4);
	GM_xmlhttpRequest({
		'method': 'GET',
		'url': 'http://' + document.domain + '/p/aj/mblog/getlongtext?ajwvr=6&mid=' + mid,
		'onload': function (_h) {
			var html = JSON.parse(_h.responseText).data.html;
			longtext.parentNode.innerHTML = html;
		}
    });
  }

})();