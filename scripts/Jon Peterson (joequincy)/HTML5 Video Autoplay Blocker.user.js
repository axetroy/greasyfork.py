// ==UserScript==
// @name         HTML5 Video Autoplay Blocker
// @namespace    http://pnwebs.com/
// @version      0.2
// @description  Block HTML5 videos from autoplaying.
// @author       joequincy
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // **** User Preferences ****
    var allowedMillis = 100; // Number of milliseconds after clicking where a video is allowed to autoplay.
    var domainWhiteList = [ 
        // A list of domains which are allowed to autoplay video, to prevent breaking video-centric sites like YouTube.
        // You may add to this list by adding the domain name (with or without subdomain) of any video source.
        // DO NOT add the http(s):// because it will break things.
        "youtube.com",
        "www.cnn.com",
        "www.espn.com"
        ];
    // **** End Preferences ***
    /*
       Beyond this point is the logic of the script.
       Do not edit unless you know what you are doing.
    */
    var lastClicked = 0;
    var videos = document.getElementsByTagName("video");
    function isAllowed(s){ // Check if video src is whitelisted.
        var r = false;
        for(var i = 0; i < domainWhiteList.length; i++){
            var reg = new RegExp("https?\:\/\/[a-zA-Z0-9\.\-]*?\.?"+domainWhiteList[i].replace(/\./,"\.")+"\/","i");
            if(s.match(reg)!==null){
                r = true;
            }
        }
        return r;
    }
    function handlePlay(e){ // React when a video begins playing
        var t = Date.now();
        if(t-lastClicked>allowedMillis&&!isAllowed(e.target.currentSrc)){
            console.log("Paused video from source: ",e.target.currentSrc);
            e.target.pause();
        }
    }
    function addListeners(){
        for(var i = 0; i < videos.length; i++){
            // Due to the way some sites dynamically add videos, the "playing" event is not always sufficient.
            // Also, in order to handle dynamically added videos, this function may be called on the same elements.
            // Must remove any existing instances of this event listener before adding. Prevent duplicate listeners.
            videos[i].removeEventListener("playing",handlePlay);
            videos[i].addEventListener("playing",handlePlay);
            videos[i].removeEventListener("play",handlePlay);
            videos[i].addEventListener("play",handlePlay);
        }
    }
    addListeners();
    document.addEventListener("click",function(){
        lastClicked = Date.now();
    });
    var observer = new MutationObserver(function(mutations){
        // Listen for elements being added. Add event listeners when video elements are added.
        mutations.forEach(function(mutation){
            if(mutation.type=="attributes"&&mutation.target.tagName=="VIDEO"&&mutation.attributeName=="src"){
                addListeners();
            }
            if(mutation.addedNodes.length>0){
                for(var i = 0; i < mutation.addedNodes.length; i++){
                    if(mutation.addedNodes[i].nodeType==1&&mutation.addedNodes[i].tagName=="VIDEO"){
                        addListeners();
                    }
                }
            }
        });
    });
    observer.observe(document, {attributes:true,childList:true,subtree:true,characterData:false});
})();