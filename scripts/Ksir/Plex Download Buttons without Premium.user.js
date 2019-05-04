// ==UserScript==
// @name         Plex Download Buttons without Premium
// @namespace    http://ksir.pw
// @version      0.4
// @description  Adds a download button to the bottom of the media player controls allowing you to download movies and music without buying plex premium
// @author       Kain (http://ksir.pw)
// @match        https://app.plex.tv/*
// @grant        none
// ==/UserScript==

var dltarget, dlbtn, dlaudio, dlmovie, trackbar, src;

setInterval(function(){
    // Find Media
    dlmovie = document.getElementsByTagName('video');
    dlaudio = document.getElementsByTagName('audio');
    dltarget = dlmovie.length > 0 ? dlmovie[0].currentSrc : dlaudio.length > 0 ? dlaudio[0].currentSrc : undefined;
    // Find Trackbar and check if button is already there
    trackbar = document.querySelectorAll("button[title='Close Player']");
    dlbtn = document.getElementById('pmd') ;
    // If ready to display
    if(dlbtn === null && trackbar.length > 0){
        dlbtn = document.createElement("a");
        dlbtn.setAttribute("id", "pmd");
        dlbtn.setAttribute("target", "_blank");
        dlbtn.setAttribute("download", "");
        dlbtn.setAttribute("style", "color:#ccc;text-align:center;z-index:99999999;position:absolute;bottom: 0;left:0;right:0;margin:auto;font-size:12px;");
        dlbtn.innerHTML = "Download";
        trackbar[0].parentElement.appendChild(dlbtn);
    }
    if(dlbtn){
        // Update button state as media changes
        dlbtn.style.display = 'none';
        if(dltarget !== undefined){
            dlbtn.style.display = 'block';
            if(dltarget.substring(0,4) === "blob"){
                dlbtn.innerHTML = "Transcode downloads will not work, Please use original quality";
            } else dlbtn.setAttribute("href", dltarget + "&download=1");
        }
    }
}, 250);