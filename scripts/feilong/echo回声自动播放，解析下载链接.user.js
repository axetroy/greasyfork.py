// ==UserScript==
// @name         echo回声自动播放，解析下载链接
// @version      0.3
// @description  自动播放，解析下载链接
// @author       feilong
// @include        http://*.app-echo.com/sound/*
// @include        http://app-echo.com/sound/*
// @grant        none
// @namespace http://tampermonkey.net/
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...

var fid=window.location.pathname.slice(window.location.pathname.lastIndexOf('/')+1);
_p.play({'id': fid,});
var ele=document.getElementsByTagName("h1")[0];
ele.innerHTML=ele.innerHTML + '(正在解析下载地址...)';

setTimeout(getSource,5000);

function getSource ()
{
    var fid=window.location.pathname.slice(window.location.pathname.lastIndexOf('/')+1);
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "http://www.app-echo.com/sound/play-list", false );
xmlHttp.send( null );
//alert( xmlHttp.responseText);

var t=xmlHttp.responseText;

t=t.replace(eval("/"+fid+"/"),"test");
//document.write(t);

//document.write("****************************");
var json=eval("("+t+")");
//var text ="id="+json.desc.test.id+"name="+json.desc.test.name+"source="+json.desc.test.source+"<a href=\""+json.desc.test.source+"\">下载</a>";
//document.write(text);
    
    var ele=document.getElementsByTagName("h1")[0];
    //ele.innerHTML='<a href="'+json.desc.test.source+'">'+json.desc.test.name+'(点击此处下载 )</a>';
     //ele.innerHTML='<a href=# onclick=window.open("'+json.desc.test.source+'")>'+json.desc.test.name+'(点击此处下载 )</a>';
ele.innerHTML='<a href="'+json.desc.test.source+'" download="'+json.desc.test.name+'">'+json.desc.test.name+'(点击此处下载 )</a>';
}
