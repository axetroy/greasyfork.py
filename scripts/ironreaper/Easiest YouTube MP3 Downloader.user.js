// ==UserScript==
// @name         Easiest YouTube MP3 Downloader
// @version      1.2
// @description  Adds a frame below the YouTube video which allows you to download a MP3 of the video without having to leave the page or click any buttons. It is fast, simple, and easy to use for anyone!
// @author       Ironreaper23
// @include      http*://*.youtube.com/*
// @include      http*://youtube.com/*
// @include      http*://*.youtu.be/*
// @include      http*://youtu.be/*
// @include      http*://distillvideo.com/*
// @run-at       document-end
// @namespace https://greasyfork.org/users/231602
// ==/UserScript==

var globScope = unsafeWindow || window;
var new_page  = setInterval (new_video, 100);

function getYTId(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

function new_video (){
    var ytId = getYTId(location.href);
    var dvId = getYTId(document.getElementById("iframeDownloadButton").src);
    if(ytId !== dvId){
        downloadFrame();
    }
}

function downloadFrame(){

     if(document.getElementById("iframeDownloadButton") !== null)
        {
            document.getElementById("iframeDownloadButton").remove();
        }

        var addIframe = document.createElement("iframe");
        addIframe.src = '//distillvideo.com/mp3?url=' + location.href;
        addIframe.style.width = "100%";
        addIframe.style.height = "100px";
        addIframe.style.marginTop = "10px";
        addIframe.style.overflow = "hidden";
        addIframe.scrolling = "no";
        addIframe.id = "iframeDownloadButton";

        var targetElement = document.querySelectorAll("[id='meta']");

        for(var i = 0; i < targetElement.length; i++){

            if(targetElement[i].className.indexOf("ytd-watch") > -1)
            {

                targetElement[i].insertBefore(addIframe, targetElement[i].childNodes[0]);

            }
        }
}

function distillcompress()
   {
    var artist = $('.table-responsive').html();
    var div=document.createElement("div");
    $('.header_area.animated').hide();
    $('.main_area.clearfix').hide();
    $('#scrollUp').hide();
    div.innerHTML = artist;
    document.body.insertBefore(div,document.body.firstChild);
}

if(document.getElementById("polymer-app") || document.getElementById("masthead") || window.Polymer){
    setInterval(function(){
        if(window.location.href.indexOf("watch?v=") < 0){
            return false;
        }
        if(document.getElementById("count") && document.getElementById("iframeDownloadButton") === null){
           //current_site = location.href;
           downloadFrame();
        }
    }, 100);
}
else{
    distillcompress();
}