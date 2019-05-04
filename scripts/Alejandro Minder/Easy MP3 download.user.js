// ==UserScript==
// @name         Easy MP3 download
// @namespace    https://www.easy-youtube-mp3.com
// @version      0.0.1
// @description  Provides an iframe to download MP3 after pressing "load MP3 converter" button (forked from Arari's Simple YouTube MP3 Button)
// @author       ale8min4
// @include      http*://*.youtube.com/* 
// @include      http*://youtube.com/*
// @include      http*://*.youtu.be/*
// @include      http*://youtu.be/*
// @run-at       document-end
// ==/UserScript==

function polymerInject(){

    /* Create button */
    var buttonDiv = document.createElement("div");
    buttonDiv.style.width = "174.156px";
    buttonDiv.id = "parentButton";

    var addButton = document.createElement("button");
    addButton.appendChild(document.createTextNode("load MP3 converter"));

    if(typeof(document.getElementById("iframeDownloadButton")) != 'undefined' && document.getElementById("iframeDownloadButton") !== null){

        document.getElementById("iframeDownloadButton").remove();

    }

    addButton.style.width = "174.156px";
    addButton.style.backgroundColor = "#181717";
    addButton.style.color = "white";
    addButton.style.textAlign = "center";
    addButton.style.padding = "10px 0";
    addButton.style.margin = "0 4px 0 4px";
    addButton.style.marginTop = "5px";
    addButton.style.fontSize = "14px";
    addButton.style.border = "0";
    addButton.style.cursor = "pointer";
    addButton.style.borderRadius = "2px";
    addButton.style.fontFamily = "Roboto, Arial, sans-serif";

    addButton.onclick = function () {

        this.remove();
        


        /* Add large button on click */
        var addIframe = document.createElement("iframe");
        addIframe.src = 'https://www.easy-youtube-mp3.com/download.php' + window.location.search;

        addIframe.style.width = "992px";
        addIframe.style.height = "230px";
        //addIframe.style.marginTop = "-560px";
        addIframe.style.overflow = "hidden";
        addIframe.scrolling = "no";
        addIframe.id = "iframeDownloadButton";

        var targetElement = document.querySelectorAll("[id='meta']");

        for(var i = 0; i < targetElement.length; i++){

            if(targetElement[i].className.indexOf("ytd-watch") > -1){

                targetElement[i].insertBefore(addIframe, targetElement[i].childNodes[0]);

            }

        }
      document.getElementById('iframeDownloadButton').setAttribute("frameBorder", "0")

    };

    buttonDiv.appendChild(addButton);

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

function finalButton(){

    var buttonIframeDownload = document.createElement("iframe");
    buttonIframeDownload.src = '//www.convertmp3.io/widget/button/?color=ba1717&amp;video=' + window.location.href;
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