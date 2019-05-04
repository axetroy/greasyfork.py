// ==UserScript==
// @name         海事大学图书馆插件
// @namespace    https://github.com/weakiwi
// @version      0.1
// @description  我终于把界面做好看了
// @run-at       document-idle
// @author       weakiwi
// @match        https://book.douban.com/subject/*
// @grant        GM_xmlhttpRequest
// @require      http://cdn.bootcss.com/jquery/3.1.0/jquery.js
// ==/UserScript==
var book_title = $('[property="v:itemreviewed"]').text();
GM_xmlhttpRequest({
    method: "GET",
    url: "https://teambition_addon.leanapp.cn/lib?search=" + book_title,
    synchronous : false,
    onload: function(response) {
        var response_new =response.responseText;
        var obj = JSON.parse(response_new);
        if(obj.book_location) {
            $('.gray_ad').eq(0).after('<div class="gray_ad" id="buyinfo"><div id="buyinfo-ebook"><h2 class=" ">图书馆收录信息</h2><ul class="bs noline more-after "><li><a target=_blank href="'+obj.book_url+'"><div class=basic-info><span>'+obj.book_location+'</span><span class=buylink-price><span>'+obj.book_states+'</span></span></div><div class=more-info><span class=buyinfo-promotion>'+obj.book_ztflh+'</span></div></a></ul></div></div>');
        }
    }
});
