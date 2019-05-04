// ==UserScript==
// @name         ShuWuRedirectToDownload
// @namespace     https://greasyfork.org/zh-CN/users/194463
// @version      0.1
// @description  我的小书屋快速下载
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @author       WayneShao
// @match        http://www.shuwu.mobi/*
// @grant        window.close
// @grant        none
// ==/UserScript==

(function() {
    if(window.location.href.indexOf('.html')>0)
    {
        var id = window.location.href.substring(window.location.href.lastIndexOf('/')+1,window.location.href.lastIndexOf('.html'));
        //var id =window.location.href.match('[0-9]+');
        window.location.href='http://www.shuwu.mobi/download.php?id='+id;
        console.log(id);
    }
    else if(window.location.href.indexOf('download.php')>0)
    {
        $(function(){
             $('body > div.list > a ')[0].click();
            console.log(jQuery.fn.jquery);
            console.log('跳转下载');

            setTimeout(function() {
                window.close();
            }, 50);
        });
    }
    else
    {
        let regex = new RegExp("http://www.shuwu.mobi/[0-9]+.html");
        $('a').each(function(i)
                    {
            if(regex.exec(this.href))
            {
                var id1 =this.href.match('[0-9]+');
                console.log(id1.length);
                this.href='http://www.shuwu.mobi/download.php?id='+id1;
            }
        });
    }
})();