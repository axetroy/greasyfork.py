// ==UserScript==
// @name         HookTube RSS
// @namespace    HTRSS
// @version      1.0
// @description  Create a link to get the channel RSS feed
// @author       lapincroyable
// @include      *hooktube.com/watch*
// @run-at       document-idle
// ==/UserScript==


// interval to check channel name
let TicToc = setInterval(function(){
  if (document.getElementById("video-channel-name").lastChild == undefined){
    //console.log("Not ready yet.");  
  } else {
    clearInterval(TicToc);
    // RSS button
    let HTStMenu = document.getElementById("stream-select");
    let HTRSS = document.createElement("a");
    HTRSS.innerHTML = "RSS";
    HTRSS.className = "btn btn-primary mb-2";
    HTRSS.style.marginRight = "4px";
    HTStMenu.parentNode.insertBefore(HTRSS,HTStMenu);
    HTRSS.href = "http://www.youtube.com/feeds/videos.xml?channel_id="+document.getElementById("video-channel-name").lastChild.href.split("/")[4];
    //console.log(HTRSS.href);
    return;
  }
}, 3);