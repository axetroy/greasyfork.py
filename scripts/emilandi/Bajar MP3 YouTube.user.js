// ==UserScript==
// @name        Bajar MP3 YouTube
// @namespace   youtube.com
// @description Descarga MP3 desde YouTube con un solo clic / Download mp3 from YouTube with just one click
// @author      emilandi
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     1.0.3
// @grant       none
// @require https://code.jquery.com/jquery-2.2.3.min.js
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(function() {
        console.clear();
        console.log(document.title);
        var id = getId();
        crearboton(id);
    });

    function crearboton(id){
        var elem = document.getElementById('info-contents'); //
        var btn = document.getElementById('idbtn');
        if (elem!==null && btn===null) {
            var url=window.location.href;
            var key = 'MzQzNDIxODk3';
            var src = 'https://www.download-mp3-youtube.com/api/?api_key=MzQzNDIxODk3&format=mp3&video_id=' + id;
            var html ='<iframe width="250px" height="60px" scrolling="no" style="border:none;" src=' + src + '></iframe>' ;
            var div = document.createElement('div');
            div.id='idbtn';
            div.innerHTML = html;
            elem.appendChild(div);
        }
    }

    function getId(){
        var data = document.getElementsByTagName('ytd-watch-flexy')[0];
        if(id != data.getAttribute('video-id')){
            var id = data.getAttribute('video-id');
        }
        return id;
    }

    document.addEventListener("mousemove", function() {
        var id = getId();
        var btn = document.getElementById('idbtn');
        if (btn===null){
            crearboton(id);
        }
    });

})();