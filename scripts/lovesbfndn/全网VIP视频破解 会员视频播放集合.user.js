// ==UserScript==
// @name         全网VIP视频破解 会员视频播放集合
// @namespace    http://tampermonkey.net/
// @version      1.0.4
// @description  破解[优酷|腾讯|乐视|爱奇艺|芒果|AB站|音悦台]等VIP或会员视频，有直接跳转＋备用接口列表。
// @author       花呆子
// @match        *://*.iqiyi.com/*
// @match        *://*.youku.com/*
// @match        *://*.le.com/*
// @match        *://*.letv.com/*
// @match        *://v.qq.com/*
// @match        *://*.tudou.com/*
// @match        *://*.mgtv.com/*
// @match        *://film.sohu.com/*
// @match        *://tv.sohu.com/*
// @match        *://*.acfun.cn/v/*
// @match        *://*.bilibili.com/*
// @match        *://vip.1905.com/play/*
// @match        *://*.pptv.com/*
// @match        *://v.yinyuetai.com/video/*
// @match        *://v.yinyuetai.com/playlist/*
// @match        *://*.fun.tv/vplay/*
// @match        *://*.wasu.cn/Play/show/*
// @match        *://*.56.com/*
// @exclude      *://*.bilibili.com/blackboard/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// ==/UserScript==

(function() {
    'use strict';
    var replaceRaw=GM_getValue("replaceRaw");
    var episodes=GM_getValue("episodes");
    GM_addStyle('#TManays{z-index:999999; position:absolute; left:0px; top:0px; width:100px; height:auto; border:0; margin:0;}'+
                '#parseUl{position:fixed;top:80px; left:0px;}'+
                '#parseUl li{list-style:none;}'+
                '.TM1{opacity:0.4; position:relative;padding: 0 7px 0 0; min-width: 19px;}'+
                '.TM1:hover{opacity:1;}'+
                '.TM1 span{display:block; border-radius:0 5px 5px 0; background-color:#339999; border:0; font:bold 15px "微软雅黑" !important; color:#ff0000; margin:0; padding:15px 2px;}'+
                '.TM3{position:absolute; top:0; left:19px; display:none; border-radius:5px; margin:0; padding:0;}'+
                '.TM3 li{float:none; width:80px; margin:0; font-size:14px; padding:3px 10px 2px 15px; cursor:pointer; color:#3a3a3a !important; background:rgba(255,255,0,0.8)}'+
                '.TM3 li:hover{color:white !important; background:rgba(0,0,0,0.8);}'+
                '.TM3 li:last-child{border-radius: 0 0 5px 5px;}'+
                '.TM3 li:first-child{border-radius: 5px 5px 0 0;}'+
                '.TM2:hover .TM3{display:block}');
    var apis=[
	    {"name":"人人发布","url":"http://v.renrenfabu.com/jiexi.php?url=","title":"清晰度不错，官方"},
        {"name":"V云[腾讯]","url":"http://www.viyun.me/jiexi.php?url=","title":"腾讯首选"},
        {"name":"V云[腾讯2]","url":"http://www.viyun.me/qq.php?url=","title":"支持腾讯部分收费"},
        {"name":"石头解析","url":"https://jiexi.071811.cc/jx.php?url=","title":"手动点播放"},
        {"name":"无名小站","url":"http://www.85105052.com/admin.php?url=","title":"无名小站同源"},
        {"name":"无名小站2","url":"http://www.wmxz.wang/video.php?url=","title":"转圈圈就换线路"},
        {"name":"VIYUN","url":"http://www.viyun.me/qq.php?url=","title":"支持腾讯部分收费"},
        {"name":"旋风解析","url":"http://api.xfsub.com/index.php?url=","title":"1905优先使用"},
        {"name":"CKFLV","url":"http://www.0335haibo.com/tong.php?url=","title":"CKFLV云,效率接近47影视云"},
        {"name":"51CKM云解析","url":"http://http://api.51ckm.com/jx.php?url=","title":"效果还不错"},
    ];
    var defaultapi={"title":"人人发布VIP视频解析接口，如果失效更换接口即可","url":"http://v.renrenfabu.com/jiexi.php?url="};
    //嵌入页面播放
    function openInTab(evt){
        var iframe=document.createElement("iframe");
        iframe.id="TMiframe";
        var video;
        //iframe.style.cssText="width:100%;height:100%;text-align:center;border:none;";
        iframe.style.border="none";
        iframe.textAlign="center";
        iframe.src=evt.target.dataset.url+location.href;
        var timer=setInterval(function(){                                                                
            [].every.call(document.querySelectorAll("object,embed,video"),function(item){                
                var style=getComputedStyle(item, null);                                               
                if(style.width.replace("px","")>100 && style.height.replace("px","")>100){         
                    video=item;
                    return false;//有播放窗
                }
                return true;
            });
            if(video||document.querySelector("#TMiframe")){
                if(document.querySelector("#TMiframe")){video=document.querySelector("#TMiframe");}
                clearInterval(timer);
                var videoStyle=getComputedStyle(video, null);
                iframe.width=videoStyle.width;
                iframe.height=videoStyle.height;
                var videoParent=video.parentNode;
                iframe.style.lineHeight=getComputedStyle(videoParent).height;
                if(video.parentNode){video.parentNode.replaceChild(iframe,video);}
            }
        },500);                                                                                         //-------------检测视频元素思路借鉴他人  End--------------------
        if(window.location.href.indexOf("youku")!=-1){
            document.querySelector(".vpactionv5_iframe_wrap").style.display="none";
        }
    }
    function noNewTabCheck(){
        var x, arr=document.querySelectorAll(".TM4 li");
        replaceRaw=document.querySelector("#inTabChekbx").checked;
        GM_setValue("replaceRaw",replaceRaw);
        for(x=0;x<arr.length;x++){
            if(replaceRaw){
                arr[x].addEventListener("click",openInTab,false);
                arr[x].onclick='';
                document.getElementById("TMGobtn").style.display="none";
            }else{
                arr[x].removeEventListener("click",openInTab,false);
                arr[x].onclick=function(){window.open(this.dataset.url+location.href);};
                document.getElementById("TMGobtn").style.display="block";
            }
        }
        //document.getElementById("TMSet").click();//收缩回去
    }
    function rightEpsLinkCheck() {
        episodes=document.querySelector("#realLinkChekbx").checked;
        GM_setValue("episodes",episodes);
        if(episodes){
            document.querySelector('#widget-dramaseries').addEventListener('click', function getLink (e){      //-------------iqiyi剧集真实播放页面方法  Begin------------------//Homepage: http://hoothin.com    Email: rixixi@gmail.com
                var target=e.target.parentNode.tagName=="LI"?e.target.parentNode:(e.target.parentNode.parentNode.tagName=="LI"?e.target.parentNode.parentNode:e.target.parentNode.parentNode.parentNode);
                if(target.tagName!="LI")return;
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: "http://cache.video.qiyi.com/jp/vi/"+target.dataset.videolistTvid+"/"+target.dataset.videolistVid+"/?callback=crackIqiyi",
                    onload: function(result) {
                        var crackIqiyi=function(d){
                            location.href=d.vu;
                        };
                        eval(result.responseText);
                    }
                });
            });                                                                              //-------------iqiyi剧集真实播放页面方法  End------------------
        }
        else{document.querySelector('#widget-dramaseries').removeEventListener('click', getLink);}
    }

    if(top.location==location){//只在顶层页面运行，在iframe中不起作用
        var div=document.createElement("div");
        div.id="TManays";
        var txt='',i=0;
        for (i in apis) {
            txt +='<li data-order='+i+' data-url="'+apis[i].url+'" title="'+apis[i].title+'" onclick="window.open(this.dataset.url+location.href)">'+apis[i].name+'</li>';
        }
        div.innerHTML='<ul id="parseUl">'+
            '<li class="TM1" title="'+defaultapi.title+'" onclick="window.open(\''+defaultapi.url+'\'+window.location.href)"><span id="TMGobtn">▶</span></li>'+
            '<li class="TM1 TM2"><span id="TMList" >▷</span><ul class="TM3 TM4">'+txt+'</ul></li>'+
            '<li class="TM1 TM2"><span id="TMSet">☸</span><ul class="TM3"><li><label><input type="checkbox" id="inTabChekbx">本页解析</label></li><li><label><input type="checkbox" id="realLinkChekbx">爱奇艺正确选集</label></li></ul></li>'+
            '</ul>';
        document.body.appendChild(div);
        console.log(div.parentNode.parentNode.parentNode.tagName);
        document.querySelector("#inTabChekbx").addEventListener("click",noNewTabCheck,false);
        document.querySelector("#inTabChekbx").checked=replaceRaw;
        document.querySelector("#realLinkChekbx").addEventListener("click",rightEpsLinkCheck,false);
        document.querySelector("#realLinkChekbx").checked=episodes;

        if(episodes && window.location.href.indexOf("iqiyi")!=-1){
            rightEpsLinkCheck();
        }
        if(replaceRaw && window.location.protocol!="https:"){noNewTabCheck();document.getElementById("TMSet").click();}    //https和http页面不能镶嵌。
    }
})();

//有效性未知，会时常更换||不能直接引用接口~