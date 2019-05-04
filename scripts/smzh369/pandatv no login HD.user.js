// ==UserScript==
// @name        pandatv no login HD
// @namespace   https://greasyfork.org/
// @description 干掉低清晰度通道，强制播放高画质
// @include     http://www.panda.tv/*
// @include     https://www.panda.tv/*
// @version     1.1
// @grant       none
// ==/UserScript==
(function() {
   $(document).ready(function(){
      var delLoginPopItvl = setInterval(function(){
            if($('div.h5player-control-bar.flute').length > 0){
                $("div.room-player-login-notice").remove();
                $("li.h5player-control-bar-kbps-change[data-res='HD']").remove();
                $("li.h5player-control-bar-kbps-change[data-res='LD_H']").remove();
                clearInterval(delLoginPopItvl);
            }
        }, 1000);
    });
})();