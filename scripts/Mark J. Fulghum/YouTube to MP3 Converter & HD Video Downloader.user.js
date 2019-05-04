// ==UserScript==
// @name         YouTube to MP3 Converter & HD Video Downloader
// @namespace    https://youtube2mp3api.com
// @version      0.01
// @description  Convert any YouTube video to MP3 and MP4 directly within YouTube website. The best YouTube to MP3 Converter upto 320 kbps bitrate and HD video downloader support formats like Mp4, WebM, 3Gp, Flv, M4A, 2k & 4K videos.
// @author       Mark Fulghum
// @icon         https://youtube2mp3api.com/app/Templates/default/assets/img/icons/apple-icon-120x120.png
// @icon60       https://youtube2mp3api.com/app/Templates/default/assets/img/icons/apple-icon-60x60.png
// @include      http*://*.youtube.com/*
// @include      http*://youtube.com/*
// @include      http*://*.youtu.be/*
// @include      http*://youtu.be/*
// @run-at       document-end
// ==/UserScript==

var lastId = ""
function getYTId(url){ 
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp); 
  return (match&&match[7].length==11)? match[7] : false; 
} 

function audioMp3(){

    /* Create button */
    var buttonDiv = document.createElement("div");
    buttonDiv.style.width = "100%";
    buttonDiv.id = "parentButton";
    
    var addButton = document.createElement("button");
    addButton.appendChild(document.createTextNode("Download MP3"));
    
  if(typeof(document.getElementById("iframeDownloadButton")) != 'undefined' && document.getElementById("iframeDownloadButton") !== null)
  		{

        document.getElementById("iframeDownloadButton").remove();

    	}

    addButton.style.width = "100%";
    addButton.style.backgroundColor = "#181717";
    addButton.style.color = "white";
    addButton.style.textAlign = "center";
    addButton.style.padding = "10px";
    addButton.style.marginTop = "5px";
    addButton.style.fontSize = "16px";
    addButton.style.border = "0";
    addButton.style.cursor = "pointer";
    addButton.style.borderRadius = "2px";
    addButton.style.fontFamily = "Roboto, Arial, sans-serif";

  
    addButton.onclick = function () {
      
      if(document.getElementById("iframeDownloadButton") !== null)
  	{

        document.getElementById("iframeDownloadButton").remove();

   	}
      
                           
        /* Add large button on click */
        var ytId = getYTId(location.href);
        if(!ytId)return;
        var addIframe = document.createElement("iframe");
        addIframe.src = 'https://www.yt-download.org/@api/button/mp3/'+ytId;
      
        addIframe.style.width = "100%";
        addIframe.style.height = "80px";
        addIframe.style.marginTop = "10px";
        addIframe.style.border = "none";
        addIframe.border = "0px";
        addIframe.overflow = "hidden";
        addIframe.id = "iframeDownloadButton";
        addIframe.scrolling = "no";
        
        var targetElement = document.querySelectorAll("[id='meta']");

        for(var i = 0; i < targetElement.length; i++){

            if(targetElement[i].className.indexOf("ytd-watch") > -1)
            	{

                targetElement[i].insertBefore(addIframe, targetElement[i].childNodes[0]);
                
            	}
        }

    };

    buttonDiv.appendChild(addButton);

    /* Find and add to target */
    var targetElement = document.querySelectorAll("[id='subscribe-button']");

    for(var i = 0; i < targetElement.length; i++){

        if(targetElement[i].className.indexOf("ytd-video-secondary-info-renderer") > -1){

            targetElement[i].appendChild(buttonDiv);

        }

    }
 

}


function videoMp4(){

    /* Create button */
    var buttonDiv = document.createElement("div");
    buttonDiv.style.width = "100%";
    buttonDiv.id = "parentButton";
    
    var addButton = document.createElement("button");
    addButton.appendChild(document.createTextNode("Download VIDEO"));
    
  if(typeof(document.getElementById("iframeDownloadButton")) != 'undefined' && document.getElementById("iframeDownloadButton") !== null){

        document.getElementById("iframeDownloadButton").remove();

    }

    addButton.style.width = "100%";
    addButton.style.backgroundColor = "#181717";
    addButton.style.color = "white";
    addButton.style.textAlign = "center";
    addButton.style.padding = "10px";
    addButton.style.marginTop = "5px";
    addButton.style.fontSize = "16px";
    addButton.style.border = "0";
    addButton.style.cursor = "pointer";
    addButton.style.borderRadius = "2px";
    addButton.style.fontFamily = "Roboto, Arial, sans-serif";

    addButton.onclick = function () {

        if(document.getElementById("iframeDownloadButton") !== null)
  	{

		document.getElementById("iframeDownloadButton").remove();
    	}
                
        /* Add large button on click */
        var ytId = getYTId(location.href);
        if(!ytId)return;
        var addIframe = document.createElement("iframe");
        addIframe.src = 'https://www.yt-download.org/@api/button/videos/' + ytId;
      
        addIframe.style.width = "100%";
        addIframe.style.height = "80px";
        addIframe.style.marginTop = "10px";
        addIframe.style.border = "none";
        addIframe.border = "0px";
        addIframe.id = "iframeDownloadButton";
        addIframe.scrolling = "no";

        var targetElement = document.querySelectorAll("[id='meta']");

        for(var i = 0; i < targetElement.length; i++){

            if(targetElement[i].className.indexOf("ytd-watch") > -1){

                targetElement[i].insertBefore(addIframe, targetElement[i].childNodes[0]);

            }
        }

    };

    buttonDiv.appendChild(addButton);

    /* Find and add to target */
    var targetElement = document.querySelectorAll("[id='subscribe-button']");

    for(var i = 0; i < targetElement.length; i++){

        if(targetElement[i].className.indexOf("ytd-video-secondary-info-renderer") > -1){

            targetElement[i].appendChild(buttonDiv);

        }

    }
    
}
    

if(document.getElementById("polymer-app") || document.getElementById("masthead") || window.Polymer){

    setInterval(function(){

        if(window.location.href.indexOf("watch?v=") < 0){

            return false;

        }

        if(document.getElementById("count") && document.getElementById("parentButton") === null){

            audioMp3(), videoMp4();

        }

    }, 100);

}

else{

    standardInject();
  

}