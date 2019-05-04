// ==UserScript==
// @name 从谷歌 百度 必应搜索结果中屏蔽自定义关键字 增强版（基于AC的脚本优化）
// @namespace BlockAnyThingYouWant Plus
// @include http://www.baidu.com/*
// @include https://www.baidu.com/*
// @include https://www.google.com/*
// @include /^https?\:\/\/encrypted.google.[^\/]+/
// @include /^https?\:\/\/www.google.[^\/]+/
// @include /^https?\:\/\/www.so.com/
// @include /^https?\:\/\/www.youdao.com/
// @require http://code.jquery.com/jquery-1.8.0.min.js
// @icon    https://coding.net/u/zb227/p/zbImg/git/raw/master/img0/icon.jpg
// @author       zzhjim( Based on AC)
// @version 1.2.1.1803151
// @description 基于AC脚本制作，新增大量关键词，欢迎结合本人其他脚本使用，如有意见请反馈至zzhjim@vip.qq.com（也可向原作者反馈）
//@grant note 2018.1.21 第2.12版 @zzhjim：增加对于部分反动网站、百家号的屏蔽
//@grant note 2018.1.21 第2.09-2.11版 @zzhjim：调整部分关键词
//@grant note 2017.8.12 第2.04-2.08版 @zzhjim：修复一批重大BUG，调整部分关键词
//@grant note 2017.8.9 第2.02-2.03版 @zzhjim:增加部分关键词
//@grant note 2017.8.8 第2.01版 @zzhjim:增删部分关键词，增强对繁体恶意网站的拦截
//@grant note 2017.8.6 第2.0版 @zzhjim:原脚本已经许久没有更新，我将一些常见的恶意网站名称加入了进去，修改了360搜索的网址。如果还有合适的关键词，欢迎提交讨论。（本脚本配合AC的其他脚本使用效果更好）
//@grant note 2018.1.18 第2.1版 @zzhjim:调整部分关键字
// @grant note 2015.11.26 第一版，规则自己写吧，觉得要反馈的关键字可以在卡饭回个帖，我合适的加入
// ==/UserScript==


/*
变量x用于                                           百度=谷歌=必应=360搜索=有道
就是黑名单,自己加入自己想要屏蔽的关键字
*/
var blankList = "小学生作文||快播||百度软件||百度浏览||百度卫士||百家号||网赚||婚恋交友||賭場||赌场||百家乐||百家樂||金沙娱乐||澳门金沙||橡果国际||人娱乐场||戒色||返利||算命||解梦||电子商务平台||爱词霸句库||本地宝||成人电影||新金瓶梅游||同城交友||qvod||成人网||交友聊天室||加QQ||六合彩||在线聊天室||115os||人体艺术||不雅照片||网站流量||2345||hao123|| 法輪||法轮||李洪志||新唐人||阿波罗综合||阿波罗新闻||退党||三退九评||追查国际||真善忍||活摘器官||中国之春||雪山狮子||讲真相||时时彩||五分彩||流亡藏人||人人贷||澳门赌场||大乐透||娱乐城||七星彩||威尼斯人娱||威尼斯人官||新加坡双赢||幸运28||上海快三||老虎机"; //自己看着格式差不多加入就好
var x = blankList.split("||");
//===================================================主入口=======================================================
mo = new MutationObserver(function(allmutations) {
    var href = window.location.href;
    if(href.indexOf("www.baidu") > -1){
        $(".c-container").each(deal); // 百度

    } else if(href.indexOf("www.google") > -1){
        $(".g").each(deal);     // 谷歌
        
    } else if(href.indexOf("so.com") > -1){
        $(".res-list").each(deal); // 360搜索
        $(".spread ").each(deal); // 360搜索
        $(".brand").each(deal); // 360搜索
        
    } else if(href.indexOf("bing.com") > -1){
        $(".b_algo").each(deal);    // 必应1
        $(".b_ans").each(deal);    // 必应2
        
    } else if(href.indexOf("youdao.com") > -1){
        $(".res-list").each(deal);        // 有道
        
    }
});
var targets = document.body;
mo.observe(targets, {'childList': true,'characterData':true,'subtree': true});

// ================================================通用处理函数==========================================================
function deal(){
    var curText = $(this).attr
    var curText = $(this).text();
    if(checkIndexof(curText) == true){
        $(this).remove();
        //console.log("dealing with");
    }
}
/*遍历查表，如果在表中则返回true*/
function checkIndexof(element){
	var result = (element.indexOf(x[0]) > -1);
	for(var i = 1; i <= x.length; i++){
		//alert("check");
		result = result || (element.indexOf(x[i]) > - 1);
	}
	return result;
}