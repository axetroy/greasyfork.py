// ==UserScript==
// @name         Tải nhạc mp3 youtube và tải nhạc chất lượng cao zing mp3
// @namespace    Phạm Văn Sướng ||| https://www.facebook.com/NhokDoA || nhokglno1st@gmail.com
// @version      0.0.1
// @description  Download nhạc chất lượng cao tại mp3.zing.vn (chỉ áp dụng cho bài hát kô bao gồm album) và nút tải nhạc ở youtube
// @author       Phạm Văn Sướng
// @include      http://mp3.zing.vn/bai-hat/*.html*
// @include      http://mp3.zing.vn/album/*.html*
// @include      http://mp3.zing.vn/playlist/*.html*
// @include      http://mp3.zing.vn/nghe-si/*
// @include      http://mp3.zing.vn/tim-kiem/bai-hat.html?q=*
// @include      http*://*.youtube.com/*
// @include      http*://youtube.com/*
// @include      http*://*.youtu.be/*
// @include      http*://youtu.be/*
// @run-at       document-end
// ==/UserScript==

    /*Tạo nút buttom tải nhạc youtube*/

function polymerInject(){
    var buttonDiv = document.createElement("div");
    buttonDiv.style.width = "100%";
    buttonDiv.id = "parentButton";

    var addButton = document.createElement("button");
    addButton.appendChild(document.createTextNode("Tải MP3"));

    addButton.style.width = "100%";
    addButton.style.backgroundColor = "#181717";
    addButton.style.color = "green";
    addButton.style.textAlign = "center";
    addButton.style.padding = "10px 0";
    addButton.style.marginTop = "5px";
    addButton.style.fontSize = "14px";
    addButton.style.border = "0";
    addButton.style.cursor = "pointer";
    addButton.style.borderRadius = "2px";
    addButton.style.fontFamily = "Roboto, Arial, sans-serif";
    

    addButton.onclick = function () {
        
        this.remove();
        var addIframe = document.createElement("iframe");
        addIframe.src = '//www.youtubeinmp3.com/widget/button/?color=1CF25C&video=' + window.location.href;

        addIframe.style.width = "100%";
        addIframe.style.height = "60px";
        addIframe.style.marginTop = "10px";
        addIframe.style.overflow = "hidden";
        addIframe.scrolling = "no";

        var targetElement = document.querySelectorAll("[id='meta']");

        for(var i = 0; i < targetElement.length; i++){

            if(targetElement[i].className.indexOf("ytd-watch") > -1){

                targetElement[i].insertBefore(addIframe, targetElement[i].childNodes[0]);

            }

        }

    };

    buttonDiv.appendChild(addButton);

    var targetElement = document.querySelectorAll("[id='subscribe-button']");

    for(var i = 0; i < targetElement.length; i++){

        if(targetElement[i].className.indexOf("ytd-video-secondary-info-renderer") > -1){

            targetElement[i].appendChild(buttonDiv);

        }

    }
    
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

function finalButton(){

    var buttonIframeDownload = document.createElement("iframe");
    buttonIframeDownload.src = '//www.youtubeinmp3.com/widget/button/?color=1CF25C&amp;video=' + window.location.href;
    buttonIframeDownload.id = "buttonIframe";

    buttonIframeDownload.style.width = "100%";
    buttonIframeDownload.style.height = "60px";
    buttonIframeDownload.style.paddingTop = "20px";
    buttonIframeDownload.style.paddingBottom = "20px";
    buttonIframeDownload.style.overflow = "hidden";
    buttonIframeDownload.scrolling = "no";

    document.getElementById("watch-header").appendChild(buttonIframeDownload);

}

function run(){

    if(!document.getElementById("parentButton") && window.location.href.substring(0, 25).indexOf("youtube.com") > -1 && window.location.href.indexOf("watch?") > -1){

        var parentButton = document.createElement("div");

        parentButton.className = "yt-uix-button yt-uix-button-default";
        parentButton.id = "parentButton";

        parentButton.style.height = "23px";
        parentButton.style.marginLeft = "28px";
        parentButton.style.paddingBottom = "1px";

        parentButton.onclick = function () {

            this.remove();
            finalButton();

        };

        document.getElementById("watch7-user-header").appendChild(parentButton);

        var childButton = document.createElement("span");
        childButton.appendChild(document.createTextNode("Tải xuống bản MP3"));
        childButton.className = "yt-uix-button-content";

        childButton.style.lineHeight = "25px";
        childButton.style.fontSize = "12px";

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

    /* Tạo button zingmp3*/

  {
  if (location.pathname.indexOf('/bai-hat/') === 0) {
     var code = $('div.fb-like').data('href');
    $('#tabService').replaceWith(' <a id="tabService" href="http://htstar.design/zingmp3.php?q=128&link=' + code + '"class="button-style-1 pull-left fn-tab"><i class="zicon icon-download"></i><span>Tải nhạc 128kbps</span></a> <a id="tabService" href="http://htstar.design/zingmp3.php?q=320&link=' + code + '"class="button-style-1 pull-left fn-tab"><i class="zicon icon-download"></i><span>Tải nhạc 320kbps</span></a> <a id="tabService" href="http://htstar.design/zingmp3.php?q=lossless&link=' + code + '"class="button-style-1 pull-left fn-tab"><i class="zicon icon-download"></i><span>Tải nhạc Lossless</span></a> ');
  } else {
    $('.fn-dlsong').replaceWith(function () {
      return '<a style="background-color: #444;" title="Tải nhạc 320kbps" class="fn-dlsong" href=https://linksvip.net/download/zingmp3.php?code=' + $(this).data('item').slice(5) + '"></a>';
    });
  }
   
};

