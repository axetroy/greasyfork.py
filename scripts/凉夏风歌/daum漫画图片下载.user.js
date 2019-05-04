// ==UserScript==
// @name         daum漫画图片下载
// @namespace    http://weibo.com/liangxiafengge/
// @version      0.2.1
// @description  在daum浏览漫画的页面，添加漫画原图链接，右击即可自动重命名并保存。
// @author       coolwind
// @icon         http://s1.daumcdn.net/photo-section/-cartoon10/favicon/201312/favicon.ico
// @match        http://webtoon.daum.net/webtoon/viewer/*
// @require      http://code.jquery.com/jquery-2.1.1.min.js
// @grant        GM_xmlhttpRequest

// ==/UserScript==
/* jshint -W097 */
'use strict';

// 模式1 得到链接到迅雷中批量下载 并 自行重命名  |      模式2 图片框中显示所有链接，需逐一点击下载
var mode = 2;
// 后面的不要改了
var imgs = daumGet(location.href.split('/')[5]);
var text = [], url = [];
var fileName = '第' + document.title.match(/[0-9]+/) + '话';
if (mode===1){// 模式1
    for (var i=0; i<imgs.url.length;i++){
        text  +=  'REN ' + imgs.name[i] + '.jpg ' +  sprintf(2,i+1)  + '.jpg\r\n';
        url   +=  imgs.url[i] + '\r\n';
    }
    // 保存文件  //必须传入已经整理好的内容
    saveas(('data:text/plain;charset=utf-8;base64,' + base64encode(utf16to8(url))),  fileName + '.txt');
    saveas(('data:text/plain;charset=utf-8;base64,' + base64encode(utf16to8(text))), '双击以重命名'+fileName + '图片.bat');
}
else{// 模式2
    var box = document.createElement('div');
    box.style = 'text-align:center;background-color:#262424;position:fixed;top:30%;left:5%;width:auto;height:auto';
    //var pTmp= document.createElement('p');
    box.innerHTML = '<p style="color:red;gray;font-size:16px;text-lign:center;margin-top:7px">图片链接</p><hr>';
    //box.appendChild(pTmp);
    //debugger;
    for(var i=0;i<imgs.url.length;i++){
        var aTmp = document.createElement('a');
        aTmp.style = 'margin:5px;color:white;';
        // aTmp.innerHTML = '';
        aTmp.href= imgs.url[i];
        aTmp.download  =  aTmp.innerText = sprintf(2,i+1);
        aTmp.download += '.jpg';
        box.appendChild(aTmp);
        if (!((i+1)%6)){
            box.innerHTML += '<br>';
        }
    }
    /*box.innerHTML += '<br>';
    for (var i=0; i<imgs.url.length;i++){
        text  +=  'REN ' + imgs.name[i] + '.jpg ' +  sprintf(2,i+1)  + '.jpg\r\n';
    }
    var aTmp = document.createElement('a');
    aTmp.style = 'position:fixed;margin-top:15px;text-align:center;margin-left:-58px;color:red';
    aTmp.innerText = '自动重命名文件';
    aTmp.href = ('data:text/plain;charset=utf-8;base64,' + base64encode(utf16to8(text)));
    aTmp.download = fileName + '.bat';
    box.appendChild(aTmp);*/
    document.body.appendChild(box);
    saveas(aTmp.href, '重命名'+fileName + '图片.bat');
}
/////////////////////////////////////////结束此程序，以下是被调用的函数////////////////////////////////////////////////////////
//获取道姆中的图片地址
function daumGet(epsId){
	var tmp = [], img = {};
    img.url=[];img.name=[];
	$.ajaxSettings.async=false;
    var n=0;
    //debugger;
    // http://t1.daumcdn.net/cartoon/597CF69C0228F00001
	$.getJSON('http://webtoon.daum.net/data/pc/webtoon/viewer_images/'+epsId,function(result){
		tmp = result.data;
		for (var i =0; i<tmp.length;i++)
		{
            //debugger;
			img.url[i] = tmp[i].url;
            n=tmp[i].url.split('/').length;
            img.name[i]= tmp[i].url.split('/')[n-1];
		}
	});
    /*debugger;
    var tmp222;
    $.get('http://t1.daumcdn.net/cartoon/5986D94D0323770001',function(result){
		tmp222 = result;
		
	});*/
	return img;
}
//输出2位数
function sprintf(n,i){
    return (i>9) ? i : '0'+i ;
}
//保存函数
function saveas(Url,name){
    var blob=new Blob([''], {type:'application/octet-stream'});
    var url = URL.createObjectURL(blob);  // webkitURL
    var a = document.createElement('a');
    a.href = Url;
    a.download = name;
    var e = document.createEvent('MouseEvents');
    // 用createEvent来创建对象，用dspatchEvent来触发事件。
    //e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    e.initMouseEvent('click');
    a.dispatchEvent(e);
    URL.revokeObjectURL(url);
}
// text_____base64
function utf16to8(str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
}
function base64encode(str) {
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var base64DecodeChars = new Array(
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if(i == len)
        {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if(i == len)
        {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}