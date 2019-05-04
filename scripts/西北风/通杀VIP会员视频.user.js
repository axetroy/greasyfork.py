// ==UserScript==
// @name         通杀VIP会员视频
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  ?????通杀常见网站VIP或会员视频。11个精选接口，包含①[【稳定】全网VIP视频在线解析▶ttmsjx]②[VIP会员视频解析▶龙轩]以及③[VIP视频破解▶hoothin]的接口。详细方法看说明还有图片。
// @author       西北风
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

// @match        *://pupudy.com/*
// @match        *://ifkjx.com/*
// @match        *://*.viyun.me/*
// @match        *://*.jiexi.071811.cc/*
// @match        *://*.sfsft.com/*
// @match        *://*.aikan-tv.com/*
// @match        *://*.flvsp.com/*
// @match        *://*aikan-tv.com/*
// @match        *://*.xfsub.com/*
// @match        *://*.0335haibo.com/*
// @match        *://*.65yw.com/*
// @match        *://*.efunfilm.com/*
// @match        *://*.baiyug.cn/*
// @match        *://*,qtzr.net/*
// @match        *://*.zihu.tv/*
// @match        *://*.72du.com/*
// @match        *://*.wmxz.wang/*
// @match        *://*.163ren.com/*
// @match        *://*.yymeier.com/*

// @exclude      *://*.bilibili.com/blackboard/*
// @exclude      *://v.qq.com/txyp/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// ==/UserScript==
(function() {
    'use strict';
    var inTabMark=GM_getValue("inTabMark");
    var episodes=GM_getValue("episodes");
    //是否为解析页面,如果不是解析页，返回false，如果是解析页，返回true
    var isParsePage=location.hostname.search(/iqiyi|youku|wasu|le|v\.qq|tudou|mgtv|sohu|acfun|bilibili|1905|pptv|yinyuetai|fun\.tv/i) == -1;
    if(!isParsePage){GM_setValue("parseHref",location.href);}//如果不是解析页面，先更新解析目标链接
    var onclickString=' onclick=\"var a=document.querySelector(\'.menuWindow\'); window.open(this.dataset.url+((a.dataset.parse==\'true\')?a.dataset.href:location.href),a.dataset.checked)\" ';
    GM_addStyle(
        //噗噗解析页面对本CSS冲突
        '#menuHolder *{margin:0px; padding:0px;}'+
        '#menuHolder {width:30px; height:30px; position:fixed; top:0px; left:0px; z-index:999999; }'+
        '#menuHolder ul {padding:0; margin:0; list-style:none; position:absolute; left:0; top:0; width:0; height:0; }'+
        '#menuHolder ul li a {color:#000; text-decoration:none; font:bold 16px arial, sans-serif; text-align:center; -webkit-transform-origin:0 0; -moz-transform-origin:0 0; -ms-transform-origin:0 0; -o-transform-origin:0 0; transform-origin:0 0; }'+
        '#menuHolder ul.p1 li {position:absolute; left:0; top:0; }'+
        '#menuHolder ul.p2 {z-index:-1;}'+
        '#menuHolder ul.p3 {z-index:-1;}'+
        '#menuHolder li.s1 > a {position:absolute; display:block; width:30px; height:30px; background:#c8c8c8; border-radius:0 0 30px 0; opacity:0.3;}'+
        '#menuHolder li.s1 a > span {display:block; font-size:20px !important; -webkit-transform:rotate(45deg); -moz-transform:rotateZ(45deg); -ms-transform:rotate(45deg); -o-transform:rotate(45deg); transform:rotate(45deg);  }'+
        '#menuHolder li.s2 > a {position:absolute; display:block; width:100px; padding-left:70px; height:170px; background:rgba(220,220,220,0.5); border-radius:0 0 170px 0; }'+
        '#menuHolder ul.p3 li > a {position:absolute; display:block; width:100px; padding-left:180px; height:280px; background:rgba(148,148,148,0.6); border-radius:0 0 280px 0; }'+
        '#menuHolder ul ul { -webkit-transform-origin:0 0; -moz-transform-origin:0 0; -ms-transform-origin:0 0; -o-transform-origin:0 0; transform-origin:0 0; '+
        '-webkit-transform:rotate(90deg); -moz-transform:rotateZ(90deg); -ms-transform:rotate(90deg); -o-transform:rotate(90deg); transform:rotate(90deg); }'+
        '#menuHolder li.s2:nth-of-type(6) > a {-webkit-transform:rotate(75deg); -moz-transform:rotateZ(75deg); -ms-transform:rotate(75deg); -o-transform:rotate(75deg); transform:rotate(75deg); }'+
        '#menuHolder li.s2:nth-of-type(5) > a {-webkit-transform:rotate(60deg); -moz-transform:rotateZ(60deg); -ms-transform:rotate(60deg); -o-transform:rotate(60deg); transform:rotate(60deg); }'+
        '#menuHolder li.s2:nth-of-type(4) > a {-webkit-transform:rotate(45deg); -moz-transform:rotateZ(45deg); -ms-transform:rotate(45deg); -o-transform:rotate(45deg); transform:rotate(45deg); }'+
        '#menuHolder li.s2:nth-of-type(3) > a {-webkit-transform:rotate(30deg); -moz-transform:rotateZ(30deg); -ms-transform:rotate(30deg); -o-transform:rotate(30deg); transform:rotate(30deg); }'+
        '#menuHolder li.s2:nth-of-type(2) > a {-webkit-transform:rotate(15deg); -moz-transform:rotateZ(15deg); -ms-transform:rotate(15deg); -o-transform:rotate(15deg); transform:rotate(15deg); }'+
        //'#menuHolder .a6 li:nth-of-type(6) > a {background:#444; -webkit-transform:rotate(75deg); -moz-transform:rotateZ(75deg); -ms-transform:rotate(75deg); -o-transform:rotate(75deg); transform:rotate(75deg); }'+
        //'#menuHolder .a6 li:nth-of-type(5) > a {background:#555; -webkit-transform:rotate(60deg); -moz-transform:rotateZ(60deg); -ms-transform:rotate(60deg); -o-transform:rotate(60deg); transform:rotate(60deg); }'+
        //'#menuHolder .a6 li:nth-of-type(4) > a {background:#666; -webkit-transform:rotate(45deg); -moz-transform:rotateZ(45deg); -ms-transform:rotate(45deg); -o-transform:rotate(45deg); transform:rotate(45deg); }'+
        //'#menuHolder .a6 li:nth-of-type(3) > a {background:#777; -webkit-transform:rotate(30deg); -moz-transform:rotateZ(30deg); -ms-transform:rotate(30deg); -o-transform:rotate(30deg); transform:rotate(30deg); }'+
        //'#menuHolder .a6 li:nth-of-type(2) > a {background:#888; -webkit-transform:rotate(15deg); -moz-transform:rotateZ(15deg); -ms-transform:rotate(15deg); -o-transform:rotate(15deg); transform:rotate(15deg); }'+
        '#menuHolder .a5 li:nth-of-type(5) > a {-webkit-transform:rotate(72deg); -moz-transform:rotateZ(72deg); -ms-transform:rotate(72deg); -o-transform:rotate(72deg); transform:rotate(72deg); }'+
        '#menuHolder .a5 li:nth-of-type(4) > a {-webkit-transform:rotate(54deg); -moz-transform:rotateZ(54deg); -ms-transform:rotate(54deg); -o-transform:rotate(54deg); transform:rotate(54deg); }'+
        '#menuHolder .a5 li:nth-of-type(3) > a {-webkit-transform:rotate(36deg); -moz-transform:rotateZ(36deg); -ms-transform:rotate(36deg); -o-transform:rotate(36deg); transform:rotate(36deg); }'+
        '#menuHolder .a5 li:nth-of-type(2) > a {-webkit-transform:rotate(18deg); -moz-transform:rotateZ(18deg); -ms-transform:rotate(18deg); -o-transform:rotate(18deg); transform:rotate(18deg); }'+
        //'#menuHolder .a3 li:nth-of-type(3) > a {background:#777; -webkit-transform:rotate(60deg); -moz-transform:rotateZ(60deg); -ms-transform:rotate(60deg); -o-transform:rotate(60deg); transform:rotate(60deg); }'+
        //'#menuHolder .a3 li:nth-of-type(2) > a {background:#888; -webkit-transform:rotate(30deg); -moz-transform:rotateZ(30deg); -ms-transform:rotate(30deg); -o-transform:rotate(30deg); transform:rotate(30deg); }'+
        '#menuHolder .a2 li:nth-of-type(2) > a {-webkit-transform:rotate(45deg); -moz-transform:rotateZ(45deg); -ms-transform:rotate(45deg); -o-transform:rotate(45deg); transform:rotate(45deg); }'+
        '#menuHolder li.s1:hover ul.p2 { -webkit-transform:rotate(0deg); -moz-transform:rotateZ(0deg); -ms-transform:rotate(0deg); -o-transform:rotate(0deg); transform:rotate(0deg); }'+
        '#menuHolder li.s2:hover ul.p3 { -webkit-transform:rotate(0deg); -moz-transform:rotateZ(0deg); -ms-transform:rotate(0deg); -o-transform:rotate(0deg); transform:rotate(0deg); }'+
        '#menuHolder a:hover {background:#81bc06 !important; color:#fff; }'+
        '.menuWindow {width:30px; height:30px; overflow:hidden; position:absolute; left:0; top:0; text-align:center; font-size:18px; z-index:999999;}'+
        '.menuWindow:hover li.s1 a {opacity:1!important;}'+
        '#menuHolder:hover .menuWindow:hover {width:281px; height:281px;}'
    );
    //为了精简，最多保留11接口
    var apis=[
        {"name":"浮空解析","url":"http://ifkjx.com/?url=","title":"综合接口，龙轩脚本的接口"},//默认接口
        {"name":"噗噗电影","url":"http://pupudy.com/play?make=url&id=","title":"综合接口，ttmsjx脚本的接口，脚本样式有影响，将就下用吧"},
        {"name":"V云[腾讯]","url":"http://www.viyun.me/jiexi.php?url=","title":"腾讯首选"},
        //{"name":"FLVSP","url":"https://api.flvsp.com/?url=","title":"加载速度好"},
        {"name":"石头解析","url":"https://jiexi.071811.cc/jx.php?url=","title":"手动点播放"},
        {"name":"无名小站","url":"http://www.sfsft.com/admin.php?url=","title":"无名小站同源"},
        {"name":"ODFLV","url":"http://aikan-tv.com/?url=","title":"广告过滤软件可能有影响"},
        {"name":"旋风解析","url":"http://api.xfsub.com/index.php?url=","title":"1905优先使用"},
        {"name":"CKFLV","url":"http://www.0335haibo.com/tong.php?url=","title":"CKFLV云,效率接近47影视云"},
        {"name":"65YW","url":"http://www.65yw.com/65yw/?vid=","title":"新接口，稳定性未知"},
        {"name":"云解析","url":"http://www.efunfilm.com/yunparse/index.php?url=","title":"新接口，稳定性未知"},
        {"name":"百域阁","url":"http://api.baiyug.cn/vip/index.php?url=","title":"转圈圈就换线路"},
        {"name":"舞动秋天","url":"http://qtzr.net/s/?qt=","title":"qtzr.net"},
        {"name":"紫狐","url":"http://yun.zihu.tv/play.html?url=","title":"效果可能不稳定"},
        {"name":"VIP看看","url":"http://q.z.vip.totv.72du.com/?url=","title":"更换线路成功率会提高"},
        {"name":"无名小站2","url":"http://www.wmxz.wang/video.php?url=","title":"转圈圈就换线路"},
        {"name":"眼睛会下雨","url":"http://www.vipjiexi.com/yun.php?url=","title":"www.vipjiexi.com"},
        {"name":"163人","url":"http://jx.api.163ren.com/vod.php?url=","title":"偶尔支持腾讯"},
        {"name":"妹儿云","url":"https://www.yymeier.com/api.php?url=","title":"不稳定"}
    ];
    function parseInTab(){
        inTabMark=document.querySelector("#inTabChekbx").checked;
        GM_setValue("inTabMark",inTabMark);
        document.querySelector('.menuWindow').dataset.checked=(inTabMark?'_self':'_blank');
    }
    //function updateHref(){GM_setValue("parseHref",location.href);}
    function rightEpsLinkCheck() {
        episodes=document.querySelector("#realLinkChekbx").checked;
        GM_setValue("episodes",episodes);
        if(episodes && document.querySelector('#widget-dramaseries')){
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
            });                                                                             //-------------iqiyi剧集真实播放页面方法  End------------------
        }
        else if(document.querySelector('#widget-dramaseries')){document.querySelector('#widget-dramaseries').removeEventListener('click', getLink);}
    }

    var elemtxt=
        '<div class="menuWindow" data-href="'+GM_getValue("parseHref")+'" data-parse="'+isParsePage+'" data-checked="'+((inTabMark || isParsePage) ? '_self' : '_blank')+'">'+
        '<ul class="p1">'+
        '<li class="s1"><a data-mark="go" data-url="'+apis[0].url+'" title="'+apis[0].title+'"'+onclickString+'><span>▶</span></a>'+
        '<ul class="p2">'+
        '<li class="s2"><a  data-mark="go" data-url="'+apis[1].url+'" title="'+apis[1].title+'"'+onclickString+'>'+apis[1].name+'</a>'+
        '<ul class="p3 a5">'+
        '<li><a data-mark="go" data-url="'+apis[6].url+'" title="'+apis[6].title+'"'+onclickString+'>'+apis[6].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[7].url+'" title="'+apis[7].title+'"'+onclickString+'>'+apis[7].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[8].url+'" title="'+apis[8].title+'"'+onclickString+'>'+apis[8].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[9].url+'" title="'+apis[9].title+'"'+onclickString+'>'+apis[9].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[10].url+'" title="'+apis[10].title+'"'+onclickString+'>'+apis[10].name+'</a></li>'+
        '</ul>'+
        '</li>'+
        '<li class="s2"><a data-mark="go" data-url="'+apis[2].url+'" title="'+apis[2].title+'"'+onclickString+'>'+apis[2].name+'</a>'+
        '<ul class="p3 a5">'+
        '<li><a data-mark="go" data-url="'+apis[6].url+'" title="'+apis[6].title+'"'+onclickString+'>'+apis[6].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[7].url+'" title="'+apis[7].title+'"'+onclickString+'>'+apis[7].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[8].url+'" title="'+apis[8].title+'"'+onclickString+'>'+apis[8].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[9].url+'" title="'+apis[9].title+'"'+onclickString+'>'+apis[9].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[10].url+'" title="'+apis[10].title+'"'+onclickString+'>'+apis[10].name+'</a></li>'+
        '</ul>'+
        '</li>'+
        '<li class="s2"><a data-mark="go" data-url="'+apis[3].url+'" title="'+apis[3].title+'"'+onclickString+'>'+apis[3].name+'</a>'+
        '<ul class="p3 a5">'+
        '<li><a data-mark="go" data-url="'+apis[6].url+'" title="'+apis[6].title+'"'+onclickString+'>'+apis[6].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[7].url+'" title="'+apis[7].title+'"'+onclickString+'>'+apis[7].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[8].url+'" title="'+apis[8].title+'"'+onclickString+'>'+apis[8].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[9].url+'" title="'+apis[9].title+'"'+onclickString+'>'+apis[9].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[10].url+'" title="'+apis[10].title+'"'+onclickString+'>'+apis[10].name+'</a></li>'+
        '</ul>'+
        '</li>'+
        '<li class="s2"><a data-mark="go" data-url="'+apis[4].url+'" title="'+apis[4].title+'"'+onclickString+'>'+apis[4].name+'</a>'+
        '<ul class="p3 a5">'+
        '<li><a data-mark="go" data-url="'+apis[6].url+'" title="'+apis[6].title+'"'+onclickString+'>'+apis[6].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[7].url+'" title="'+apis[7].title+'"'+onclickString+'>'+apis[7].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[8].url+'" title="'+apis[8].title+'"'+onclickString+'>'+apis[8].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[9].url+'" title="'+apis[9].title+'"'+onclickString+'>'+apis[9].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[10].url+'" title="'+apis[10].title+'"'+onclickString+'>'+apis[10].name+'</a></li>'+
        '</ul>'+
        '</li>'+
        '<li class="s2 b6"><a data-mark="go" data-url="'+apis[5].url+'" title="'+apis[5].title+'"'+onclickString+'>'+apis[5].name+'</a>'+
        '<ul class="p3 a5">'+
        '<li><a data-mark="go" data-url="'+apis[6].url+'" title="'+apis[6].title+'"'+onclickString+'>'+apis[6].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[7].url+'" title="'+apis[7].title+'"'+onclickString+'>'+apis[7].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[8].url+'" title="'+apis[8].title+'"'+onclickString+'>'+apis[8].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[9].url+'" title="'+apis[9].title+'"'+onclickString+'>'+apis[9].name+'</a></li>'+
        '<li><a data-mark="go" data-url="'+apis[10].url+'" title="'+apis[10].title+'"'+onclickString+'>'+apis[10].name+'</a></li>'+
        '</ul>'+
        '</li>'+
        '<li class="s2"><a>设置</a>'+
        '<ul class="p3 a2">'+
        '<li><a><label><input type="checkbox" id="inTabChekbx">本页解析</label></a></li>'+
        '<li><a><label><input type="checkbox" id="realLinkChekbx">爱奇艺正确选集</label></a></li>'+
        '</ul>'+
        '</li>'+
        '</ul>'+
        '</li>'+
        '</ul>'+
        '</div>';
    var div=document.createElement("div");
    div.id="menuHolder";
    div.innerHTML=elemtxt;
    document.body.appendChild(div);
    document.querySelector("#inTabChekbx").addEventListener("click",parseInTab,false);
    document.querySelector("#inTabChekbx").checked=inTabMark;
    document.querySelector("#realLinkChekbx").addEventListener("click",rightEpsLinkCheck,false);
    document.querySelector("#realLinkChekbx").checked=episodes;
    if(episodes && window.location.hostname.indexOf("iqiyi")!=-1){
        rightEpsLinkCheck();
    }
    function checkCSS(){
        var as,bs,i,j;
        as=document.querySelectorAll('#menuHolder ul.p3 li > a');
        bs=document.querySelectorAll('#menuHolder li.s2 > a');
        if(window.location.hostname.indexOf("ifkjx")!=-1 ) {
            for(i=0;i<bs.length;i++){bs[i].style.width="170px";}
            for(j=0;j<as.length;j++){as[j].style.width="280px";}
        }
        if(window.location.hostname.indexOf("flvsp")!=-1) {
            for(i=0;i<bs.length;i++){bs[i].style.maxHeight="170px";}
            for(j=0;j<as.length;j++){as[j].style.maxHeight="280px";}
        }
    }
    checkCSS();//修正个别网站CSS

})();