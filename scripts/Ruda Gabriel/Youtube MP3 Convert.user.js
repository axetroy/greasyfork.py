// ==UserScript==
// @name         Youtube MP3 Convert
// @version      3.0
// @namespace    https://pastebin.com/sUZvzEsS
// @homepage     http://bit.ly/YxuRd
// @description  Add a button to convert videos at youtube in mp3
// @author       Ruda Gabriel
// @license MIT  https://opensource.org/licenses/MIT
// @include      *://*.youtube.com/*
// @include      *://*.youtube.com/*
// @include      *://*.youtu.be/*
// @include      *://*.youtu.be/*
// @include      *://*.ytmp3.net/*
// @include      *://*.amoyshare.com/*
// @run-at       document-start
// @icon         http://decode.droppages.com/favicon_yt.png
// ==/UserScript==
//SCREEN : https://greasyfork.org/system/screenshots/screenshots/000/012/083/original/mp3_convert.jpg
//Add a button to convert videos at youtube in mp3
//If you are Redistributing, please give credits to the author: Ruda Gabriel

setInterval(function(){
    function removeElementId(elementId){var element = document.getElementById(elementId);element.parentNode.removeChild(element);}
    if (location.host =="www.amoyshare.com"){
        var headeremove = document.getElementsByClassName("header")[0];
        if (headeremove!==undefined){headeremove.parentNode.removeChild(headeremove);}
        var iconremove = document.getElementsByClassName("icon")[1];
        if (iconremove!==undefined){iconremove.parentNode.removeChild(iconremove);}
        var anymusicsremove = document.getElementsByClassName("anymusics-playlist-article")[0];
        if (anymusicsremove!==undefined){anymusicsremove.parentNode.removeChild(anymusicsremove);}
        var anymusicsremovedesc = document.getElementsByClassName("anymusics-product-sm-desc anymusics-product-sm-desc2")[0];
        if (anymusicsremovedesc!==undefined){anymusicsremovedesc.parentNode.removeChild(anymusicsremovedesc);}
        var softwaredownloadremoved = document.getElementsByClassName("anymusics-search-software-download")[0];
        if (softwaredownloadremoved!==undefined){softwaredownloadremoved.parentNode.removeChild(softwaredownloadremoved);}
        var noticeremove = document.getElementsByClassName("server-notice-icon")[0];
        if (noticeremove!==undefined){noticeremove.parentNode.removeChild(noticeremove);}
        var discoverremove = document.getElementsByClassName("landing-discover")[0];
        if (discoverremove!==undefined){discoverremove.parentNode.removeChild(discoverremove);}
        var helpremove = document.getElementsByClassName("landing-help")[0];
        if (helpremove!==undefined){helpremove.parentNode.removeChild(helpremove);}
        var anymusictipremove = document.getElementsByClassName("anymusic-tip")[0];
        if (anymusictipremove!==undefined){anymusictipremove.parentNode.removeChild(anymusictipremove);}
        var c15remove = document.getElementsByClassName("c-15")[0];
        if (c15remove!==undefined){c15remove.parentNode.removeChild(c15remove);}
        var helps1remove = document.getElementsByClassName("landing-help-s1")[0];
        if (helps1remove!==undefined){helps1remove.parentNode.removeChild(helps1remove);}
        var boxesremove = document.getElementsByClassName("box-1 box-3")[0];
        if (boxesremove!==undefined){boxesremove.parentNode.removeChild(boxesremove);}
        var helps2remove = document.getElementsByClassName("landing-help-s2")[0];
        if (helps2remove!==undefined){helps2remove.parentNode.removeChild(helps2remove);}
        var helps3remove = document.getElementsByClassName("landing-help-s3")[0];
        if (helps3remove!==undefined){helps3remove.parentNode.removeChild(helps3remove);}
        var globalremove = document.getElementsByClassName("global")[0];
        if (globalremove!==undefined){globalremove.parentNode.removeChild(globalremove);}
        var box2remove =  document.getElementsByClassName("box-2")[0];
        if (box2remove!==undefined){box2remove.parentNode.removeChild(box2remove);}
        var machintoshremove =  document.getElementsByClassName("machintosh")[0];
        if (machintoshremove!==undefined){machintoshremove.parentNode.removeChild(machintoshremove);}
        var box1remove =  document.getElementsByClassName("box-1")[0];
        if (box1remove!==undefined){box1remove.parentNode.removeChild(box1remove);}
        var faqremove =  document.getElementsByClassName("faq")[0];
        if (faqremove!==undefined){faqremove.parentNode.removeChild(faqremove);}
        var testimonialsremove =  document.getElementsByClassName("testimonials")[0];
        if (testimonialsremove!==undefined){testimonialsremove.parentNode.removeChild(testimonialsremove);}
        var help6sremove =  document.getElementsByClassName("landing-help-6")[0];
        if (help6sremove!==undefined){help6sremove.parentNode.removeChild(help6sremove);}
        var help7sremove =  document.getElementsByClassName("landing-help-7")[0];
        if (help7sremove!==undefined){help7sremove.parentNode.removeChild(help7sremove);}
        var footerremove =  document.getElementsByClassName("footer")[0];
        if (footerremove!==undefined){footerremove.parentNode.removeChild(footerremove);}
        var fixedsearchremove =  document.getElementsByClassName("fixed-search-bottom-download")[0];
        if (fixedsearchremove!==undefined){fixedsearchremove.parentNode.removeChild(fixedsearchremove);}
        var searchbottomremove =  document.getElementsByClassName("fixed-search-bottom-container")[0];
        if (searchbottomremove!==undefined){searchbottomremove.parentNode.removeChild(searchbottomremove);}
        var resultformatDescremove =  document.getElementsByClassName("anymusics-search-result-formatDesc")[0];
        if (resultformatDescremove!==undefined){resultformatDescremove.parentNode.removeChild(resultformatDescremove);}
        var tipbox0remove =  document.getElementsByClassName("tip-box")[0];
        if (tipbox0remove!==undefined){tipbox0remove.parentNode.removeChild(tipbox0remove);}
        var tipbox1remove =  document.getElementsByClassName("tip-box")[1];
        if (tipbox1remove!==undefined){tipbox1remove.parentNode.removeChild(tipbox1remove);}
        var forbidremove =  document.getElementsByClassName("forbid")[0];
        if (forbidremove!==undefined){forbidremove.parentNode.removeChild(forbidremove);}
        var forbid1remove =  document.getElementsByClassName("forbid")[1];
        if (forbid1remove!==undefined){forbid1remove.parentNode.removeChild(forbid1remove);}
        var sharecontentremove =  document.getElementsByClassName("anymusics-search-result-share-content")[0];
        if (sharecontentremove!==undefined){sharecontentremove.parentNode.removeChild(sharecontentremove);}
        var landinghelp3remove =  document.getElementsByClassName("landing-help-3")[0];
        if (landinghelp3remove!==undefined){landinghelp3remove.parentNode.removeChild(landinghelp3remove);}
        var addthis_32remove =  document.getElementsByClassName("at4-share addthis_32x32_style atss atss-left addthis-animated slideInLeft")[0];
        if (addthis_32remove!==undefined){addthis_32remove.parentNode.removeChild(addthis_32remove);}
        var updownremove =  document.getElementsByClassName("anymusics-detail-up-down")[0];
        if (updownremove!==undefined){updownremove.parentNode.removeChild(updownremove);}
        var clickdown1 = document.getElementsByTagName("li")[20];var getsrc1 = document.getElementsByTagName("a")[11].href;
        clickdown1.onclick = function() {
            location.href=getsrc1;
            //open(getsrc1);
        };
        var clickdown2 = document.getElementsByTagName("li")[21];var getsrc2 = document.getElementsByTagName("a")[12].href;
        clickdown2.onclick = function() {
            location.href=getsrc2;
            //open(getsrc2);
        };
    }
    if (location.host =="www.ytmp3.net"){
        if (document.getElementById("sad")!==null){removeElementId("sad");}
        if (document.getElementById("ytmp3-language-container")!==null){removeElementId("ytmp3-language-container");}
        if (document.getElementById("ytmp3-language-container")!==null){removeElementId("ytmp3-language-container");}
        if (document.getElementById("rad")!==null){removeElementId("rad");}
        if (document.getElementById("description")!==null){removeElementId("description");}
        if (document.getElementById("footer")!==null){removeElementId("footer");}
        if (document.getElementById("dl_link").style.display=="block"){removeElementId("terms-short");removeElementId("btns");removeElementId("form");}
        if (document.getElementsByTagName("h1")[0]!==undefined){document.getElementsByTagName("h1")[0].hidden=true;}
        if (document.getElementsByTagName("h2")[0]!==undefined){document.getElementsByTagName("h2")[0].hidden=true;}
        if (document.getElementsByTagName("p")[0]!==undefined){document.getElementsByTagName("p")[0].hidden=true;}
        if (document.getElementsByTagName("p")[1]!==undefined){document.getElementsByTagName("p")[1].hidden=true;}
        if (document.getElementsByTagName("p")[2]!==undefined){document.getElementsByTagName("p")[2].hidden=true;}
        if (document.getElementsByTagName("ul")[0]!==undefined){document.getElementsByTagName("ul")[0].hidden=true;}
        var elementclass = document.getElementsByClassName("pd")[1];
        if (elementclass!==undefined){elementclass.parentNode.removeChild(elementclass);}
        document.styleSheets[0].cssRules[7].style.removeProperty("max-width");
        document.styleSheets[0].cssRules[7].style.removeProperty("float");
        if (document.getElementById("status_text").innerText=="ERROR: The YouTube video link might be invalid, private or no longer available. Please check the link and try again."){
            location.href="https://ytmp3.cc";
        }
        return setInterval;
    }
    if (location.href.includes("watch?v=")){
        if (document.getElementById("mp3conv")!==null) {
            document.getElementById("mp3conv").style.display="inline-block";
        }
        if (document.getElementById("mp3convbeta")!==null) {
            document.getElementById("mp3convbeta").style.display="inline-block";
        }
    }else if (location.href.includes("watch?v=")===false) {
        if (document.getElementById("mp3conv")!==null) {
            document.getElementById("mp3conv").style.display="none";
        }
        if (document.getElementById("mp3convbeta")!==null) {
            document.getElementById("mp3convbeta").style.display="none";
        }
    }
    if (document.getElementById("mp3conv")!==null) {
        document.getElementById("mp3conv").onclick = function() {
            if (location.host == "www.youtube.com" && location.search.indexOf("v=") != -1){
                open("http://www.ytmp3.net/#v=" + location.search.split("v=")[1].split("&")[0]+"&bitrate=128k");
            }else if (location.host == "www.youtube.com" && location.pathname.indexOf("/embed/") != -1){
                open("http://www.ytmp3.net/#v=" + location.pathname.split("/")[2]+"&bitrate=128k");
            }
        };
    }
    if (document.getElementById("imaag")!==null) {
        document.getElementById("imaag").onclick = function() {
            if (location.host == "www.youtube.com" && location.search.indexOf("v=") != -1){
                open("http://www.ytmp3.net/#v=" + location.search.split("v=")[1].split("&")[0]+"&bitrate=128k");
            }else if (location.host == "www.youtube.com" && location.pathname.indexOf("/embed/") != -1){
                open("http://www.ytmp3.net/#v=" + location.pathname.split("/")[2]+"&bitrate=128k");
            }
        };
    }
    if (document.getElementById("mp3convbeta")!==null) {
        document.getElementById("mp3convbeta").onclick = function() {
            var video_id = window.location.search.split('v=')[1];
            var ampersandPosition = video_id.indexOf('&');
            if(ampersandPosition != -1){video_id = video_id.substring(0, ampersandPosition);}
            location.href="https://www.amoyshare.com/amoyshare-res/mp3?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D"+video_id+"&quality=128k";
            //open("https://www.amoyshare.com/amoyshare-res/mp3?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D"+video_id+"&quality=128k");
        };
    }
    if (location.href.includes("embed")){
        if (document.getElementsByClassName("ytp-watch-later-button ytp-button")[0]!==undefined){
            if (document.getElementById("mp3conv")!==null) {return setInterval;}
            var btn = document.createElement('button');
            var Dev = document.createElement('div');
            var AA = document.createElement('a');
            var IM = document.createElement('img');
            var Deve = document.createElement('div');
            var aft = document.getElementsByClassName("ytp-watch-later-button ytp-button")[0];
            var mescl = aft.parentNode;
            Dev.setAttribute('class','ytp-watch-later-icon');
            Dev.setAttribute('id','dev');
            AA.setAttribute('id','acreat');
            IM.src='https://i.imgur.com/qYsM14j.png';
            IM.setAttribute('id','imaag');
            IM.width="30";IM.height="35";
            Deve.setAttribute('class','ytp-watch-later-title');
            Deve.setAttribute('id','mp3conv');
            Deve.appendChild(document.createTextNode("Mp3 convert"));
            btn.setAttribute('class','ytp-watch-later-button ytp-button');
            btn.title="Convert to mp3";
            btn.setAttribute('id','creatinga');
            if (document.getElementById("dev")===null){
                if (document.getElementById("creatinga")!==null){
                    document.getElementById("creatinga").appendChild(Dev);
                }
            }
            if (document.getElementById("acreat")===null){
                if (document.getElementById("dev")!==null){
                    document.getElementById("dev").appendChild(AA);
                }
            }
            if (document.getElementById("imaag")===null){
                if (document.getElementById("acreat")!==null){
                    document.getElementById("acreat").appendChild(IM);
                }
            }
            if (document.getElementById("imaag")!==null){
                if (document.getElementById("creatinga")!==null){
                    document.getElementById("creatinga").appendChild(Deve);
                }
            }
            if (document.getElementById("creatinga")!==null){return setInterval;}else{
            document.body.appendChild(btn);mescl.insertBefore(btn, aft);}
        }
    }
    if (document.getElementById("mp3conv")!==null) {
        if (document.getElementById("mp3convbeta")!==null) {return setInterval;}
        var beta1 = document.createElement('paper-button');var beta2 = document.getElementById("mp3conv");var mesclarbeta = beta2.parentNode;
        beta1.setAttribute('class','style-scope ytd-subscribe-button-renderer');
        beta1.setAttribute('id','mp3convbeta');
        beta1.appendChild(document.createTextNode("DOWNLOAD MP3 (BETA) 128k"));
        document.body.appendChild(beta1);
        mesclarbeta.insertBefore(beta1, beta2);
    }
    if (document.getElementById("end")!==null) {
        if (document.getElementById("mp3conv")!==null) {return setInterval;}
        var sp1 = document.createElement('paper-button');var sp2 = document.getElementById("end");var mesclar = sp2.parentNode;
        sp1.setAttribute('class','style-scope ytd-subscribe-button-renderer');
        sp1.setAttribute('id','mp3conv');
        sp1.appendChild(document.createTextNode("MP3 CONVERT"));
        document.body.appendChild(sp1);
        mesclar.insertBefore(sp1, sp2);
    }
}, 1);