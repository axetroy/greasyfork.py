// ==UserScript==
// @name         豆瓣FM增加网易云音乐搜索按钮
// @version      1.1
// @description  在豆瓣听到好听的音乐，点击搜索按钮在网易云音乐搜索
// @author       MyFaith
// @match        http://*.douban.fm/*
// @match        https://*.douban.fm/*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @run-at       document-end
// @namespace https://greasyfork.org/users/8899
// ==/UserScript==

var $ = $ || window.$;
window.jQuery = $;

$(document).ready(function(){
    function openNetease() {
        var artistName = $('.middle .artist-name').attr('title');
        var songName = $('title').text();
        songName = songName.split(' - ')[0];
        window.open('https://music.163.com/#/search/m/?s=' + songName + ' ' + artistName + '&type=1');
    }
    // 增加搜索按钮
    $('.sub-buttons').append('<span style="width: 25px; display: inline-block;"></span>');
    $('.sub-buttons').append('<label id="netease" title="在网易云音乐搜索"><svg title="Title" viewBox="0 0 20 20" height="20" width="20" class="icon" style="vertical-align: middle;">  <image id="image0" width="20" height="20" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABHVBMVEX////////////f39/Q0NDPz8/+/v7Gxsa5ubm7u7uzs7Ourq6vr6+6urrd3d2srKyxsbG9vLzp6enw8PDNzMy0tLTe3t7MzMy1tbWtra3Nzc3j4uK7urr29fXBwcGysrLOzs6+vr7a2tqenp7Hx8e3t7fn5ubd3NykpKS5uLj9/f339/fOzc3Jycng39+amprKysrx8PDs6+vPzs7S0dG/v7+2tra3trbq6emmpaXc3Nypqanv7++6ubmfn5/X19fAwMCnpqb09PSdnZ23uLj19fWoqKi4uLj8/Pz6+fmgoKDl5uarq6vCwsKjo6Pt7e2wr6/4+Pi2tbWioqLh4eHLy8vIx8e9vb28u7vu7u7Dw8PV1NTHxsbZ2dnR0dEWWIO0AAAAAnRSTlPl8gYpWaEAAAABYktHRACIBR1IAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4gocFiAn7wKupAAAARhJREFUGNNt0dlWwjAYBOB2KCXYlFSWYqhQWaqCgntdUMGqFBVxw115/8cwXeRG5y7fSU7+TCRJ/hNJApBQkrMoCQGSrKZImPScRqlOSEqVJTkjQCeUGfPZXL4gFqbAorAFXrIWy+JgxSZkSWBSGLWAKmr1RtUhRAmRsGWsrDZba+s2S/+i1kZnYxNB2lyPkW+pjGB7R93NYc+I0N3HQb0G5xBHXRyzGE9gnfbQP4N3noXjhnhhty4H/hBXyF/foBkhGXVwO67cecrofljW/AgLDh4en7psPJjgWYtv1/kLoLy+Nd4xYdGcwTPZhxeO+cldnZQEmkEh1PjqfRd95ouaMnJcne4bnFOxLaouKHmqzDI1g5L/+44fbH4fFHQ1NecAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMTAtMjhUMjI6MzI6MzkrMDg6MDDD9OAEAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTEwLTI4VDIyOjMyOjM5KzA4OjAwsqlYuAAAAABJRU5ErkJggg==" /></svg></label>');
    // 监听点击事件
    $('#netease').click(function(){
        openNetease();
    });
    // 监听红心点击事件
    $('.icon-heart').click(function() {
        openNetease();
    });
});