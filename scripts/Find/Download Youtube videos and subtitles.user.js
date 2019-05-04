// ==UserScript==
// @name      Download Youtube videos and subtitles
// @namespace  https://www.findhao.net
// @version    0.3.8
// @description  获取youtube视频和字幕的下载链接
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// @require https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// @exclude http://www.youtube.com/embed/*
// @exclude https://www.youtube.com/embed/*
// @match http://www.youtube.com/*
// @match https://www.youtube.com/*
// @match http://s.ytimg.com/yts/jsbin/html5player*
// @match https://s.ytimg.com/yts/jsbin/html5player*
// @match http://manifest.googlevideo.com/*
// @match https://manifest.googlevideo.com/*
// @match http://*.googlevideo.com/videoplayback*
// @match https://*.googlevideo.com/videoplayback*
// @match http://*.youtube.com/videoplayback*
// @match https://*.youtube.com/videoplayback*
// @copyright  2018+, Find
// @author FindHao
// @icon http://icons.iconarchive.com/icons/dtafalonso/android-l/256/Youtube-icon.png
// ==/UserScript==


bvd2_btn_onclick = function() {
    var form1 = document.createElement("form");
    form1.id = "post";
    form1.name = "post";
    form1.method = "post";
    form1.target = "_blank";
    form1.action = "https://www.findyoutube.net/result";
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = "url";
    input.value = window.location.href;
    document.body.appendChild(form1);
    form1.appendChild(input);
    form1.submit();
};
getSpan = function(text, className) {
    var _tn = document.createTextNode(text);
    var span = document.createElement("span");
    span.className = className;
    span.appendChild(_tn);
    return span;
};
function polymerInject(){

    /* Create button */
    var buttonDiv = document.createElement("div");
    buttonDiv.id = "parentButton";
    buttonDiv.className = "style-scope";
    var bvd2_btn = document.createElement("div");
    bvd2_btn.className = "style-scope bvd2_btn";


    if(typeof(document.getElementById("iframeDownloadButton")) != 'undefined' && document.getElementById("iframeDownloadButton") !== null){

        document.getElementById("iframeDownloadButton").remove();
    }

    bvd2_btn.style = "background-color: green; border: solid 2px green; border-radius: 2px; color: white; padding: 0px 15px; font-size: 14px; cursor:pointer; height:33px;margin-right: 7px;margin-top: 7px;line-height: 33px;font-weight: 500; display:inline-block;";
    bvd2_btn.appendChild(getSpan("Download By FindYoutube.net", ""));

    bvd2_btn.onclick = bvd2_btn_onclick;

    buttonDiv.appendChild(bvd2_btn);

    /* Find and add to target */
    var targetElement = document.querySelectorAll("[id='subscribe-button']");

    for(var i = 0; i < targetElement.length; i++){

        if(targetElement[i].className.indexOf("ytd-video-secondary-info-renderer") > -1){

            targetElement[i].appendChild(buttonDiv);

        }

    }

    /* Fix hidden description bug */
    var descriptionBox = document.querySelectorAll("ytd-video-secondary-info-renderer");
    if(descriptionBox[0].className.indexOf("loading") > -1){

        descriptionBox[0].classList.remove("loading");

    }

}

function standardInject() {
    var pagecontainer=document.getElementById('page-container');
    if (!pagecontainer) return;
    if (/^https?:\/\/www\.youtube.com\/watch\?/.test(window.location.href)) run();
    var isAjax=/class[\w\s"'-=]+spf\-link/.test(pagecontainer.innerHTML);
    var logocontainer=document.getElementById('logo-container');
    if (logocontainer && !isAjax) { // fix for blocked videos
        isAjax=(' '+logocontainer.className+' ').indexOf(' spf-link ')>=0;
    }
    var content=document.getElementById('content');
    if (isAjax && content) { // Ajax UI
        var mo=window.MutationObserver||window.WebKitMutationObserver;
        if(typeof mo!=='undefined') {
            var observer=new mo(function(mutations) {
                mutations.forEach(function(mutation) {
                    if(mutation.addedNodes!==null) {
                        for (var i=0; i<mutation.addedNodes.length; i++) {
                            if (mutation.addedNodes[i].id=='watch7-container' ||
                                mutation.addedNodes[i].id=='watch7-main-container') { // old value: movie_player
                                run();
                                break;
                            }
                        }
                    }
                });
            });
            observer.observe(content, {childList: true, subtree: true}); // old value: pagecontainer
        } else { // MutationObserver fallback for old browsers
            pagecontainer.addEventListener('DOMNodeInserted', onNodeInserted, false);
        }
    }
}

function onNodeInserted(e) {
    if (e && e.target && (e.target.id=='watch7-container' ||
                          e.target.id=='watch7-main-container')) { // old value: movie_player
        run();
    }
}


function run(){

    if(!document.getElementById("parentButton") && window.location.href.substring(0, 25).indexOf("youtube.com") > -1 && window.location.href.indexOf("watch?") > -1){

        var parentButton = document.createElement("div");

        parentButton.className = "yt-uix-button yt-uix-button-default";
        parentButton.id = "parentButton";

        parentButton.style.height = "23px";
        parentButton.style.marginLeft = "28px";
        parentButton.style.paddingBottom = "1px";

        parentButton.onclick = bvd2_btn_onclick;
        document.getElementById("watch7-user-header").appendChild(parentButton);

        var childButton = document.createElement("span");
        childButton.appendChild(document.createTextNode("Download By FindYoutube.net"));
        childButton.className = "yt-uix-button-content";
    childButton.style = "background-color: green; border: solid 2px green; border-radius: 2px; color: white; padding: 0px 15px; font-size: 14px; cursor:pointer; height:33px;margin-right: 7px;margin-top: 7px;line-height: 33px;font-weight: 500; display:inline-block;";

        parentButton.appendChild(childButton);

    }

}

if(document.getElementById("polymer-app") || document.getElementById("masthead") || window.Polymer){

    setInterval(function(){

        if(window.location.href.indexOf("watch?v=") < 0){

            return false;

        }

        if(document.getElementById("count") && document.getElementById("parentButton") === null){

            polymerInject();


        }

    }, 100);

}

else{

    standardInject();

}