// ==UserScript==
// @name         币乎批量关注脚本
// @namespace    www.liaobaocheng.com
// @version      2.1
// @description  减少重复工作
// @author       liaobaocheng
// @match        https://www.bihu.com/*
// @require      http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @grant        none
// ==/UserScript==

(function(){
    $(document).ready(function(){
        var articleContent = $(".col-sm-3>a").first().text()
        var numberPattern = /\d+/g;
        var articleNum = articleContent.match(numberPattern)[0]

        if(articleNum>=3){//大于3，说明是个真实用户，可以关注
            if($(".head-btn>button").text()=='关注'){
                $(".head-btn>button").click()
            }
        }

        // get people index
        var peopleNum = window.location.href.match(numberPattern)[0]
        var nextLocation = parseInt(peopleNum) + 1;
        setTimeout(function(){
            window.location.href = 'https://www.bihu.com/people/' + nextLocation;
        },2000);

    })
})();