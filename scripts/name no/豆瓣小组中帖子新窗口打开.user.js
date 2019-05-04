// ==UserScript==
// @name         豆瓣小组中帖子新窗口打开
// @version      0.1.0
// @description  不再为打开一个帖子看完回退烦恼了
// @author       codepoet764@gmail.com
// @include      *douban.com*
// @grant        none
// @namespace https://greasyfork.org/users/129395
// ==/UserScript==

(function() {
    $('.title a').click(function(){
        var url =$(this).attr('href');
         window.open(url);
      
        return false;
 });
})();