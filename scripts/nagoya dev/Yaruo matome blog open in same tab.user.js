// ==UserScript==
// @name        Yaruo matome blog open in same tab
// @description やる夫系まとめブログの次話へのリンクを別タブではなく同じタブで開くようにします。
// @namespace   http://devdev.nagoya/
// @include     http://matariyaruo.doorblog.jp/*
// @version     1.02
// @grant       none
// ==/UserScript==

(function(){
var elem = document.getElementsByTagName('a');
elem = Array.slice(elem, 0);
for(var i=0; i<elem.length; i++) {
    elem[i] = elem[i].setAttribute('target','_self');
}
})();