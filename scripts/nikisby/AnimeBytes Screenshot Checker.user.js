// ==UserScript==
// @name         AnimeBytes Screenshot Checker
// @namespace    nikisby
// @version      0.5
// @description  Check whether or not a torrent has screenshots on AnimeBytes
// @author       nikisby
// @match        https://animebytes.tv/torrents.php*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.3/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2014-11-29/FileSaver.min.js
// @grant        none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$('#content > div.thin > div.pages').after('<div id="screens" style="text-align:center"><button id="check-screens">Check Screens</button></div>');

$('#check-screens').click(function(){
    $('tr.torrent > td.torrent_properties > a').each(function(index,value){
        var that = $(this);
        var url = that.attr('href');
        var down_url = that.prev().find('a').attr('href');
        var tid = url.split('=')[2];
        var full_url = url + '&screenshots=' + tid;
        var filename = tid + '.torrent';
        setTimeout(function(){
            $.get(full_url, function(data){
                if ($(data).find('#' + tid + '_screenshots a.screenshot').length) {
                    that.parents().eq(1).css('background-color','#f6c6c6');
                    that.parents().eq(1).hide(300);
                } else {
                    that.parents().eq(1).css('background-color','#bef2b6');
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', down_url, true);
                    xhr.responseType = "blob";
                    xhr.withCredentials = true;
                    xhr.onreadystatechange = function (){
                        if (xhr.readyState === 4) {
                            var blob = xhr.response;
                            saveAs(blob, filename);
                        }
                    };
                    xhr.send();
                }
            });
        }, 500 + index * 500);
    });
});