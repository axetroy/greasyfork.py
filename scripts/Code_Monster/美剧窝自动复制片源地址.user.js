// ==UserScript==
// @name         美剧窝自动复制片源地址
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动复制带字幕片源地址(第一个)
// @author       Code Monster
// @match        http://www.meiwo.com/*/*/*
// @match        http://www.meiwo.com/resource/*
// @grant        GM_setClipboard
// ==/UserScript==
jQuery.fn.valuechange = function(fn) {
    return this.bind('valuechange', fn);
};
jQuery.event.special.valuechange = {
    setup: function() {
        jQuery(this).watch('value', function(){
            jQuery.event.handle.call(this, {type:'valuechange'});
        });
    },
    teardown: function() {
        jQuery(this).unwatch('value');
    }
};


function detectLink(){
    $(".resource-more-link a").each(function(){
        var link = $(this).attr("href").toLowerCase();
        if(link.indexOf("%e4%b8%ad") > 0){
            GM_setClipboard(link);
            return;
        }
    });
}

(function() {
    $("body").bind('DOMNodeInserted',function(){
        detectLink();
    });
})();