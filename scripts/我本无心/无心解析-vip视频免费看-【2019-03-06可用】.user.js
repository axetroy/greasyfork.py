// ==UserScript==
// @name         无心解析-vip视频免费看-【2019-03-06可用】
// @namespace    http://www.luckyblank.cn/vip_videos
// @version      20.19.03.06
// @description  除去其他不必要的功能，专注于VIP影视解析。因为只做vip解析，所以更专业。调整为8条解析线路，更加方便快捷的观看vip影视。
// @author       我本无心
// @icon         http://www.luckyblank.cn/jiaoben/favorite.ico
// @match        *://v.youku.com/v_show/*
// @match        *://*.iqiyi.com/v_*
// @match        *://*.iqiyi.com/w_*
// @match        *://*.iqiyi.com/a_*
// @match        *://*.iqiyi.com/dianying/*
// @match        *://*.le.com/ptv/vplay/*
// @match        *://v.qq.com/x/cover/*
// @match        *://v.qq.com/x/page/*
// @match        *://*.tudou.com/listplay/*
// @match        *://*.tudou.com/albumplay/*
// @match        *://*.tudou.com/programs/view/*
// @match        *://*.mgtv.com/b/*
// @match        *://film.sohu.com/album/*
// @match        *://*.acfun.cn/v/*
// @match        *://*.bilibili.com/video/*
// @match        *://*.bilibili.com/anime/*
// @match        *://vip.pptv.com/show/*
// @match        *://v.pptv.com/show/*
// @match        *://v.yinyuetai.com/video/*
// @match        *://v.yinyuetai.com/playlist/*
// @match        *://*.wasu.cn/Play/show/*
// ==/UserScript==

(function() {
var qq1 = '<span style="display:block;float:left;width:3vw;height:3vw;font-size:2.5vw;color:#fff;line-height:3vw;text-align:center;border-radius:100%;box-shadow:0px 0px 3px #a9a9a9;background:#0078FF;margin:1vw 1vw;">我</span>'
var qq2 = '<span style="display:block;float:left;width:3vw;height:3vw;font-size:2.5vw;color:#fff;line-height:3vw;text-align:center;border-radius:100%;box-shadow:0px 0px 3px #a9a9a9;background:#0078FF;margin:1vw 1vw;">很</span>'
var qq3 = '<span style="display:block;float:left;width:3vw;height:3vw;font-size:2.5vw;color:#fff;line-height:3vw;text-align:center;border-radius:100%;box-shadow:0px 0px 3px #a9a9a9;background:#0078FF;margin:1vw 1vw;">帅</span>'
var qq4 = '<span style="display:block;float:left;width:3vw;height:3vw;font-size:2.5vw;color:#fff;line-height:3vw;text-align:center;border-radius:100%;box-shadow:0px 0px 3px #a9a9a9;background:#0078FF;margin:1vw 1vw;">但</span>'
var qq5 = '<span style="display:block;float:left;width:3vw;height:3vw;font-size:2.5vw;color:#fff;line-height:3vw;text-align:center;border-radius:100%;box-shadow:0px 0px 3px #a9a9a9;background:#0078FF;margin:1vw 1vw;">我</span>'
var qq6 = '<span style="display:block;float:left;width:3vw;height:3vw;font-size:2.5vw;color:#fff;line-height:3vw;text-align:center;border-radius:100%;box-shadow:0px 0px 3px #a9a9a9;background:#0078FF;margin:1vw 1vw;">很</span>'
var qq7 = '<span style="display:block;float:left;width:3vw;height:3vw;font-size:2.5vw;color:#fff;line-height:3vw;text-align:center;border-radius:100%;box-shadow:0px 0px 3px #a9a9a9;background:#0078FF;margin:1vw 1vw;">低</span>'
var qq8 = '<span style="display:block;float:left;width:3vw;height:3vw;font-size:2.5vw;color:#fff;line-height:3vw;text-align:center;border-radius:100%;box-shadow:0px 0px 3px #a9a9a9;background:#0078FF;margin:1vw 1vw;">调</span>'






var apis = [{
name:qq1 + "解析接口1",url:"http://www.luckyblank.cn/wuxinjx/?url=",title:"接口1"
},{
name:qq2 + "解析接口2",url:"https://jx.618g.com/?url=",title:"接口2"
},{
name:qq3 + "解析接口3",url:"https://jiexi.071811.cc/jx.php?url=",title:"接口3"
},{
name:qq4 + "解析接口4",url:"http://jx.api.163ren.com/vod.php?url=",title:"接口4"
}, {
name:qq5 + "解析接口5",url:"http://api.wlzhan.com/sudu/?url=",title:"接口5"
},{
name:qq6 + "解析接口6",url:"http://api.nepian.com/ckparse/?url=",title:"接口6"
}, {
name:qq7 + "解析接口7",url:"http://beaacc.com/api.php?url=",title:"接口7"
}, {
name:qq8 + "解析接口8",url:"http://api.bbbbbb.me/jx/?url=",title:"接口8"
}
 ];


//创建选项
function createSelect (apis) {
	var myul = document.createElement("ul");
	myul.id = "myul";
	myul.setAttribute("style","display:none;background:#fff;box-shadow:0px 1px 10px rgba(0,0,0,0.3);margin:0;padding:0 2vw;position:fixed;bottom:33vh;right:12vw;z-index:99999;height:45vh;overflow:scroll;border-radius:1.26vw;");
	for (var i = 0; i < apis.length; i ++) {
		var myli = document.createElement("li");
		var that=this;
		myli.setAttribute("style","margin:0;padding:0;display:block;list-style:none;font-size:2vw;width:15vw;text-align:left;line-height:5vw;letter-spacing:0;border-bottom:1px solid #f0f0f0;position:relative;overflow:hidden;text-overflow:hidden;white-space:nowrap;");
		(function (num) {
			myli.onclick = function () {
				window.open(apis[num].url + location.href,'_blank');
			};
			myli.ontouchstart = function () {
				this.style.cssText += "color:yellow;background:#373737;border-radius:1.26vw;";
			}
			myli.ontouchend = function () {
				this.style.cssText += "color:black;background:transparent;border-radius:0;";
			}
		})(i);
		myli.innerHTML = apis[i].name;
		myul.appendChild(myli);
	}
	document.body.appendChild(myul);
}

//创建菜单
function createMenu(){
	var myBtn = document.createElement("div");
	myBtn.id = "myBtn";
	myBtn.innerHTML = "+";
	myBtn.setAttribute("style","width:5vw;height:5vw;position:fixed;bottom:20vh;right:10vw;z-index:100000;border-radius:100%;text-align:center;line-height:5vw;box-shadow:0px 1px 10px rgba(0,0,0,0.3);font-size:3vw;background:rgb(228, 8, 8);");
	myBtn.onclick = function (){
		var myul = document.getElementById("myul");
		if(myul.style.display == "none"){
			myul.style.display = "block";
			this.style.transform="rotateZ(45deg)";
		}else{
			myul.style.display = "none";
			this.style.transform="rotateZ(0deg)";
		}
	}
	document.body.appendChild(myBtn);
}
/*document.addEventListener("DOMContentLoaded",function () {
	createMenu();
	createSelect(apis);
});*/
if(location.href.match(".iqiyi.com") || location.href.match(".youku.com") || location.href.match(".le.com") || location.href.match(".letv.com") || location.href.match("v.qq.com") || location.href.match(".tudou.com") || location.href.match(".mgtv.com") || location.href.match("film.sohu.com") || location.href.match("tv.sohu.com") || location.href.match(".acfun.cn") || location.href.match(".bilibili.com") || location.href.match(".pptv.com") || location.href.match("vip.1905.com") || location.href.match(".yinyuetai.com") || location.href.match(".fun.tv") || location.href.match(".56.com") || location.href.match(".wasu.cn")) {
		createMenu();
		createSelect(apis);
}



var oHead1002 = document.getElementsByTagName('body').item(0);
    var oScript1002 = document.createElement("script");
    oScript1002.type = "text/javascript";
    //oScript1002.src="http://www.luckyblank.cn/jiaoben/video.js";
    oHead1002.appendChild( oScript1002);


})();