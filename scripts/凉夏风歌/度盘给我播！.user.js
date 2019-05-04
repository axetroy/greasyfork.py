// ==UserScript==
// @name         度盘给我播！
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  强迫度盘打开 ts mts f4v m2ts等视频文件的播放页面。
// @author       coolwind2012
// @match        http*://pan.baidu.com/disk/home*
// @exclude      http*://pan.baidu.com/disk/home*search*
// @icon         https://pan.baidu.com/box-static/disk-system/images/favicon.ico
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==
var count = 0;
change = function(){
    'use strict';
    var mediaType = new Array('ts','3gp2','3g2','3gpp','amv','divx','dpg','f4v','m2t','m2ts','m2v','mpe','mpeg','mts','vob','webm','wxp','wxv');
    //var compressType= new Array('zip','7zip','rar','gz','gzip');
    var myMode    = ($('.zJMtAEb').attr('style')!=="display: none;")?0:1;
    if($('.zJMtAEb').attr('style')==="display: none;")
    {//大图标
        var fatherStr = '.JKvHJMb dd',
            childStr  = '.cEefyz:not(.open-enable)',
            targetStr = '.file-name a';
    }else{//小图标
        var fatherStr = ".vdAfKMb",
            childStr  = "dd:not(.open-enable)",
            targetStr = '.text a';
    }
    var myPath = '';
    //alert(myMode);
    // @match        http*://pan.baidu.com/s/*/path=*
    if(location.href.indexOf('.com\/s\/1')>1)
    {
        // 需要shareid
        var uk      = yunData.SHARE_;
        var shareId = yunData.SHARE_ID;
        //  t = b.getElementDataByPosition(e); //e=_position
        //  var fid = t.fs_id;
        //myPath = 
    }
    // https://pan.baidu.com/disk/home#list/path=%2F&vmode=list
    if(location.href.indexOf('/disk/home')!==-1)
    {
        myPath = location.href.split('path=')[1].split('&')[0];
    }
    myPath += (decodeURIComponent(myPath).slice(-1)==='/')? '':'%2F';
    //var myPath = location.href.split('path=')[1];
    // 从搜索页面得到的
    // https://pan.baidu.com/disk/home#search/key=.ts&vmode=list
    // 暂时还是无能为力啊 T_T
    // $('.JKvHJMb dd .cEefyz')
    $(fatherStr).children(childStr).each(function(){
        var houzhui = $(this).find(targetStr).attr('title').split('.').pop();
        if(isMedia(houzhui))
        {
            var tmp = $(this).find(targetStr).attr('href');
            if(tmp === 'javascript:void(0);'){
                var tmpTitle = $(this).find(targetStr).attr('title');
                $(this).find(targetStr).attr('href'  ,  'https://pan.baidu.com/play/video#video/path=' +  myPath  + encodeURIComponent(tmpTitle) +  '\&t=-1').attr('target','_blank_');
                if(!myMode) {$(this).find('.avjZ2gA').removeClass('default-small');$(this).find('.avjZ2gA').addClass('fileicon-small-video');
$(this).find('.zjumA4By').removeClass('default-small');$(this).find('.zjumA4By').addClass('fileicon-small-video');}
                else $(this).find(targetStr).attr('style','cursor:pointer;');
                //  node-type="inbeAVnQ" class="qwnAoRE"
                // node-type="inbeAVnQ" class="qwnAoRE"
            }// g-clearfix AuPKyz open-enable
            $(this).addClass("open-enable");
        }
    });
/*    $(".vdAfKMb .open-enable").each(function(){
        var houzhui = $(this).find('.text a').attr('title').split('.').pop();
        console.log(houzhui);
        //alert(houzhui);
        if(isCompress(houzhui))
        {
            $(this).removeClass("open-enable");
        }
    });
    */
    function isMedia(str){
        var tmp = str.toLowerCase();
        for(var i=0;i<mediaType.length;i++)
        {
            if(tmp===mediaType[i])
                return 1;
        }
        return 0;
    }
 /*   function isCompress(str){
        var tmp = str.toLowerCase();
        for(var i=0;i<compressType.length;i++)
        {
            if(tmp===mediaType[i])
                return 1;
        }
        return 0;
    }*/
    if(++count>50)
    {
        timeid = window.clearInterval(timeid);
        count=0;
    }
};

$('.vdAfKMb').ready(    function() {
    change();
});
$('document').ready(    function() {
    change();
});
var myhash = location.href;
var timeid = null;
window.setInterval(  function(){ if(location.href!==myhash){count=0;myhash=location.href;timeid = window.setInterval(change,60);}  }   ,120  );

