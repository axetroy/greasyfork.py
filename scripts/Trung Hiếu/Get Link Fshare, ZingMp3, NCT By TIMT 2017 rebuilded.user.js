﻿
// ==UserScript==
// @name         Get Link Fshare, ZingMp3, NCT By TIMT 2017 rebuilded
// @namespace    Tien Ich May Tinh ||| https://www.tienichmaytinh.com/ ||
// @version      1.0.0
// @icon         http://i.imgur.com/YWmejdi.png
// @description  Download Fshare Max Speed và nhạc nhất lượng cao tại mp3.zing.vn, NCT
// @match        http://mp3.zing.vn/bai-hat/*.html*
// @match        http://mp3.zing.vn/album/*.html*
// @match        http://mp3.zing.vn/playlist/*.html*
// @match        http://mp3.zing.vn/nghe-si/*
// @match        http://mp3.zing.vn/tim-kiem/bai-hat.html?q=*
// @match        http://www.nhaccuatui.com/bai-hat/*
// @match        https://www.fshare.vn/file/*
// @copyright    2017+ / Hiếu
// @grant        none
// ==/UserScript==
$(function () 
 
  
  {
  if (location.pathname.indexOf('/bai-hat/') === 0) {
     var code = $('div.fb-like').data('href');
    $('#tabService').replaceWith(' <a id="tabService" href="http://htstar.design/zingmp3.php?q=128&link=' + code + '"class="button-style-1 pull-left fn-tab"><i class="zicon icon-download"></i><span>Tải nhạc 128 kbps</span></a> <a id="tabService" href="http://htstar.design/zingmp3.php?q=320&link=' + code + '"class="button-style-1 pull-left fn-tab"><i class="zicon icon-download"></i><span>Tải nhạc 320 kbps</span></a> <a id="tabService" href="http://htstar.design/zingmp3.php?q=lossless&link=' + code + '"class="button-style-1 pull-left fn-tab"><i class="zicon icon-download"></i><span>Tải nhạc Lossless</span></a> ');} 
    
    var linknct = $("link[rel='canonical']").attr("href");
   if ($('#btnDownloadBox') === '<a href="javascript:;" id="btnDownloadBox"></span>Tải nhạc</a>'){
  $('#btnDownloadBox').replaceWith('<a href="http://starlabs.ml/getlinknct.php?q=128&link=' +linknct + '"><span class="icon_download"></span>   Tải nhạc 128kbps   </a><a href="http://starlabs.ml/getlinknct.php?q=320&link=' +linknct + '"></span>   Tải nhạc 320kbps   </a><a href="http://starlabs.ml/getlinknct.php?q=lossless&link=' +linknct + '"></span>   Tải nhạc Lossless</a>');}
  else
 {
    $('#btnAddPlaylistNowPlaying').after('<a href="http://starlabs.ml/getlinknct.php?q=128&link=' +linknct + '"></span>   Tải nhạc 128kbps   </a></li><a href="http://starlabs.ml/getlinknct.php?q=320&link=' +linknct + '"></span>   Tải nhạc 320kbps   </a><a href="http://starlabs.ml/getlinknct.php?q=lossless&link=' +linknct + '"></span>   Tải nhạc Lossless</a>')};
  if (location.pathname.indexOf('/file/') === 0) {$('.policy_download').prepend('<div class="col-xs-12"><a title="Tải Nhanh Không Giới Hạn By GLF" style="margin-top: 10px; height: 70px;" class="btn btn-success btn-lg btn-block btn-download-sms" href="https://getlinkfshare.com' + location.pathname.split( '/file/,' ) + '">        <i class="fa fa-cloud-download fa-2x pull-left"></i>        <span class="pull-right text-right download-txt">            Tải nhanh<br>            <small> Get link From get Link Fshare // Không giới hạn tốc độ </small>        </span></a></div>')};
  
});