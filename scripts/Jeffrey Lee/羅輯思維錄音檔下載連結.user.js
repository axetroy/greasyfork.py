// ==UserScript==
// @name         羅輯思維錄音檔下載連結
// @namespace    http://blog.darkthread.net/
// @version      0.1
// @description  產生錄音檔直接下載連結
// @author       Jeffrey
// @match        http://www.ximalaya.com/1412917/album/239463
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';
function genDownloadLinks() {
    $(this).remove();
  $(".miniPlayer3 .title").each(function() { 
    var a = this;
    var id = a.href.split('/')[5];
    $.getJSON("http://www.ximalaya.com/tracks/" + id + ".json")
    .done(function(res) { 
        var title = res.title;
        var path = res.play_path_128 || res.play_path_64 || res.play_path_32;
        var ext = path.match("[.]m.+$")[0];
        $(a).after("<a href='" + path + "' download='" + title + ext + "' " + 
            "style='margin-left: 6px; color: blue;'>下載</a>");
    });
  });
}

$("<button style='margin-left:6px;border:1px solid gray;background-color:#ccc'>" + 
  "產生下載連結</button>")
.appendTo(".body_top .left").click(genDownloadLinks);