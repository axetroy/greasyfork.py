// ==UserScript==
// @name         完成mycourse课程
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动完成mycourse课程
// @author       You
// @match        http://*.mycourse.cn/*
// @exclude      http://wb.mycourse.cn/svnweiban/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    try{console.log(exportRoot.currentFrame)}catch(e){}
    try {
        var userid = getQueryString("userid");
        var jiaoxuejihuaid = getQueryString("jiaoxuejihuaid");
		//var referrerStr = document.referrer;
        var finishWxHost = document.referrer.replace("http://","").replace("https://","").split("/")[0];
		if(document.referrer=="" || document.referrer==null || document.referrer==undefined){
			finishWxHost = "wx.mycourse.cn"
		}

		//判断域名，如果是hndx.mycourse.cn,返回true;否则返回false
		var $href = window.location.href;
		//var isTrue= $href.indexOf('hndxzy.mycourse.cn/')>0?true:false;
		var finishWxUrl=getRecordUrl($href);
//		if(isTrue){
//			finishWxUrl = "http://hndxre.mycourse.cn:8082/wxcourse/addJiaoXueJiHuainfo.action"
//		}else{
//			finishWxUrl = "http://cp.mycourse.cn:8082/wxcourse/addJiaoXueJiHuainfo.action"
//		}
		//	var finishWxUrl = "http://"+finishWxHost+"/svnweiban/addJiaoXueJiHuainfo.action
		//	var finishWxUrl = "http://cp.mycourse.cn:8082/wxcourse/addJiaoXueJiHuainfo.action"
		//	var finishWxUrl = "http://hndxre.mycourse.cn:8082/wxcourse/addJiaoXueJiHuainfo.action"
		//      var finishWxUrl = "http://182.92.212.191/svnweiban/addJiaoXueJiHuainfo.action"
		//      var finishWxUrl = "http://211.144.154.222/test/wk/aaa.txt"
		//      var finishWxUrl = "http://192.168.1.254/wxRespond/test/ok.do"

		var finishData = {"userid": userid, "jiaoxuejihuaid": jiaoxuejihuaid};

        	//ajax jsonp 请求

        $.ajax({
            async: false,
            url: finishWxUrl,
            type: "GET",
            dataType: "jsonp",
//            jsonp: "callback",
//            jsonpCallback:"jsonpCallback",
            data: finishData,
            timeout: 5000,

            success : function (data) {//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
                if (data.msg == "ok") {
                    alert("恭喜，您已完成本微课的学习");
                } else {
                    alert("发送完成失败");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                  //alert("错误");
            }//,
//            complete: function (data) {
//                jsonData = data
//                if (data.msg == "ok") {
//                    alert("恭喜，您已完成本课程的学习");
//                } else {
//                    alert("发送完成");
//                }
//            }
        });
    } catch (e) {
        alert("报了啥错误" + e)
    }
})();