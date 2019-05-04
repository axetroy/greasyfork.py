// ==UserScript==
// @name          修改Youtube为1080P、英文翻译
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  try to take over the world!
// @author        小虾吃大虾 
// @match        *.youtube.com/*
// @match        *.unity3d.com/*
// @grant        none
// ==/UserScript==

//player.loadModule("captions");
//player.loadModule("cc");

//player.setOption("cc", "track", {"languageCode": "en"});
//player.setOption("captions", "track", {"languageCode": "en"});

setTimeout(function(){

    var player = document.getElementById("movie_player");
    player.setPlaybackQuality("hd1080");

    var module;
    if (player.getOptions().indexOf("cc") !== -1) {
        module = "cc";
    } else if (player.getOptions().indexOf("captions") != -1) {
        module = "captions";
    }
    var tracklist = player.getOption(module, "tracklist");
    console.log(tracklist);

    var isDefault = true;
    if(tracklist[0] != null){
        tracklist.forEach(function(a) {
            if(a["vss_id"] == ".en"){
                player.setOption(module, "track", {"languageCode": "en"});
                isDefault = false;
            }
        });
    }

    if(isDefault){
        //player.unloadModule(module);
    }

},500);
