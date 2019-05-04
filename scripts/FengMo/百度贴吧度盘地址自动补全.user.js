// ==UserScript==
// @name        百度贴吧度盘地址自动补全
// @namespace   https://greasyfork.org/zh-CN/scripts/32957-%E7%99%BE%E5%BA%A6%E8%B4%B4%E5%90%A7%E5%BA%A6%E7%9B%98%E5%9C%B0%E5%9D%80%E8%87%AA%E5%8A%A8%E8%A1%A5%E5%85%A8
// @author      FengMo
// @description 自动补全百度贴吧页面中的“/s/ab1234cd”类度盘链接。感谢mew07编写的原脚本。
// @include     https://tieba.baidu.com/*
// @version     0.1.3
// @grant       none
// ==/UserScript==

(function(){
    var strHTML=window.document.body.innerHTML;

	//用于匹配的正则表达式
	var strMatch={
        // bd:/\/?s\/(\w{8})(?:\s+(\w{4}))?/g,  //度娘 类型：s/1i31aCbb /s/1i31aCbb
        // bd:/\/?[^y]s\/([A-Za-z0-9]{7,8})(?!.*?_$)/g,  //度娘 类型：s/1i31aCbb /s/1i31aCbb
        bd:/\/s\/([A-Za-z0-9]{7,8})(?!.*?_$)/g,  //度娘 类型：/s/1i31aCbb 加入识别七位网盘地址的正则表达式，暂时停止对s/1i31aCbb格式的支持
	};

	//用于替换的链接
	var strURL=[];
	//strURL.bd="http://pan.baidu.com/s/$1";
    strURL.bd="https://pan.baidu.com/s/$1";

 	//预处理：将原有的链接删除；
	strHTML=strHTML.replace(/(https?:\/\/)?pan\.baidu\.com(\/s\/)(?=[A-Za-z0-9]{7,8})/g,"/s/"); //使用正则表达式提高转换识别能力
        //strHTML=strHTML.replace("https://pan.baidu.com/s/","/s/");

	//替换网盘
	strHTML = strHTML.replace(strMatch.bd,strURL.bd);//百度

    window.document.body.innerHTML=strHTML;
})();