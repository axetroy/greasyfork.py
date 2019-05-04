// ==UserScript==
// @name        tieba_html5_music
// @namespace   kusari
// @description 贴吧html5播放器
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f?ct=*
// @include     http://tieba.baidu.com/f?kz=*
// @version     1
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==
GM_addStyle('audio{width:320px;position:absolute;bottom:1px;}
.bottom-bars{display:none}}');
var target = document.querySelector("#j_p_postlist");
var configs = {
    attributes : true,
    subtree : true
};
var observer = new MutationObserver(function (es) {
    es.map(function (e) {
        if (e.target.className == 'musicbox_con') {
            var cn = e.target;
            var sn = cn.querySelector(".song-name");
            var songid = sn.getAttribute("songid");
            var bb = cn.querySelector(".bottom-bars");
            if (songid) {
                var music_url = 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=' + songid;
                GM_xmlhttpRequest({
                    method : "Get",
                    url : music_url,
                    onload : function (d) {
                        var c = JSON.parse(d.responseText);
                        var file = c.bitrate.file_link;
                        var node = document.createElement("audio");
                        node.setAttribute('src', file);
                        node.setAttribute('controls', 'controls');
                        bb.parentNode.replaceChild(node,bb);
                    }
                });
            }
        }
    });
 
});
observer.observe(target, configs);