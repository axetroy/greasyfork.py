// ==UserScript==
// @name        Yahoo!ニュース自動推移
// @namespace   http://webfile.blog.jp/
// @description Yahoo!ニュースのリンクを自動で推移します。
// @include     http://news.yahoo.co.jp/pickup*
// @version  1.0.0
// @license	http://creativecommons.org/licenses/by-nc/3.0/
// @grant       none
// ==/UserScript==

(function(d, func) {
    var check = function() {
        if (typeof unsafeWindow.jQuery == 'undefined') return false;
        func(unsafeWindow.jQuery); return true;
    }
    if (check()) return;
    var s = d.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
    d.getElementsByTagName('head')[0].appendChild(s);
    (function() {
        if (check()) return;
        setTimeout(arguments.callee, 100);
    })();
})(document, function($) {
//--Start Script--
    
$(function(){
    var link = $(".newsLink").attr("href");
    location.href = link;
});
    
//--End Script--
})();