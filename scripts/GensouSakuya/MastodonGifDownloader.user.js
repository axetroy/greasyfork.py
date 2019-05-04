// ==UserScript==
// @name         MastodonGifDownloader
// @version      0.5
// @description  try to take over the world!
// @author       You
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @match        https://nebula.moe/*
// @match        https://cmx.im/*
// @namespace https://greasyfork.org/users/194737
// ==/UserScript==

//↑↑@match的意思是匹配特定的实例域名，需要增加新的实例则另起一行填入url即可
(
    function() {
'use strict';
//↓↓必须填入ApiKey才可以使用
        ///apikey填在引号里
        var Apikey = "";
        ///apikey填在引号里

var downloadButton = '<button id="########" aria-label="下载Gif" aria-pressed="false" title="下载Gif" class="status__action-bar-button star-icon icon-button" tabindex="0" style="font-size: 18px; width: 23.1429px; height: 23.1429px; line-height: 18px;"><i class="fa fa-fw fa-download" aria-hidden="true" style="transform: rotate(0deg);"></i></button>'


$(document).on('DOMNodeInserted', injectAdditionalDownloadButtons);

var buttonCount = 1;
var buttonID = "DownloadButton";

function injectAdditionalDownloadButtons(event)
{
    if(event.target.localName == 'article')
    {
        var video = $(event.target).find("video");
        if(video.length>0){
            injectDownloadButton(event.target);
        }
    }
}
function injectDownloadButton(target) {
    var parentdiv = $(target).find('.status__action-bar');
    var id = buttonID+buttonCount++;
    var html = downloadButton.replace("########",id);
    var button = $(parentdiv).children('.star-icon').after(html);
    $("#"+id).on("click",function () {
        downloadGif(this);
    });
}

function downloadGif(target)
{
    if(Apikey == null || Apikey.length<1)
    {
        alert("请在cloudconvert.com注册账号后，进入https://cloudconvert.com/dashboard/api获取ApiKey填入本脚本");
        window.open("https://cloudconvert.com/dashboard/api");
        return;
    }
    var article = $(target).closest("article");
    var video = $(article).find("video")[0];
    window.open("https://api.cloudconvert.com/convert?apikey="+Apikey+"&inputformat=mp4&outputformat=gif&input=download&file="+video.src+"&wait=true&download=inline");
}}())