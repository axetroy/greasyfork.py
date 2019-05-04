// ==UserScript==
// @name        JDownloader Autostart Video Hosts
// @version     1.1
// @author      drhouse
// @description Automatically starts download of the hosted video file with JDownloader on many host sites. 
// @include     http://bestreams.net/*
// @include     http://vodlocker.com/*
// @include     http://movdivx.com/*
// @include     http://daclips.in/*
// @include     http://vidzi.tv/*
// @include     http://www.movshare.net/*
// @include     http://streamin.to/*
// @include     http://mightyupload.com/*
// @include     http://www.putlocker.com/*
// @include     http://www.sockshare.com/*
// @include     http://www.firedrive.com/file/*
// @include     http://billionuploads.com/*
// @include     http://thefile.me/*
// @include     http://www.promptfile.com/*
// @include     http://filenuke.com/*
// @include     http://www.zalaa.com/*
// @include     http://www.uploadc.com/*
// @include     http://sharesix.com/*
// @include     http://nosvideo.com/*
// @include     http://www.vidhog.com/*
// @include     http://movpod.in/*
// @include     http://hipfile.com/*
// @include     http://uploadboy.com/*
// @include     http://gorillavid.in/*
// @include     http://movreel.com/*
// @include     http://www.cloudtime.to/*
// @include     http://www.cloudzilla.to/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @locale      en
// @icon        https://board.jdownloader.org/favicon.ico
// @namespace https://greasyfork.org/users/10118
// ==/UserScript==

$(document).ready(function () {

    ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", 'http://127.0.0.1:9666/flash/add?urls='+window.location.href);
    ifrm.style.width = 0+"px";
    ifrm.style.height = 0+"px";
    $(ifrm).insertBefore('body');    

});