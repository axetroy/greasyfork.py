// ==UserScript==
// @name        中国原创音乐基地免登陆下载
// @namespace    https://zhang18.top
// @version      0.1
// @description  中国原创音乐基地免登陆下载,去除原来点击下载需要登录，鼠标移动到下载按钮处，右键新建标签打开就行。
// @author       ZLOE
// @match        http://5sing.kugou.com/yc/*.html
// @grant        GM_xmlhttpRequest
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// 作者博客:https://zhang18.top
// ==/UserScript==

(function() {
    'use strict';
    //获取音乐,单首播放的页面
    function get_music(){
        var id = window.location.href.split('/')[4].split(".")[0]
        try{
        var url = 'http://service.5sing.kugou.com/song/getsongurl?&songid='+id+'&songtype=yc'
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(res) {
                if (res.status == 200) {
                    var text = res.responseText;
                    var a = jQuery.parseJSON(text)
                    var music_url = a.data.squrl
                    console.log(music_url)
                     $('.action_down').after('<a href="'+music_url+'" id="func_Down" class="action_down" target="_blank">下载</a>')
                     $('.action_down').eq(0).remove()

                }
            }
        });
        }catch (erro){
            var urls = 'http://service.5sing.kugou.com/song/getsongurl?&songid='+id+'&songtype=fc'
            GM_xmlhttpRequest({
                method: "GET",
                url: urls,
                onload: function(res) {
                    if (res.status == 200) {
                        var text = res.responseText;
                        var a = jQuery.parseJSON(text)
                        var music_url = a.data.squrl
                        console.log(music_url)
                        $('.action_down').after('<a href="'+music_url+'" id="func_Down" class="action_down" target="_blank">下载</a>')
                        $('.action_down').eq(0).remove()
                    }
                }
        });
        }
    }
    //主控制程序
    get_music()

    // Your code here...
})();