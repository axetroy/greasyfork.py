// ==UserScript==
// @name         超简易解除网页限制
// @namespace    http://xhunter.org
// @version      1.0.4
// @description  解除网页的复制 、拖动 、选中 、右键  、粘贴等限制。没有多余的代码,仅28行,尽量做到不占资源.
// @author       hunter
// @include      *
// @exclude        *baidu.com*
// @run-at           document-end
// ==/UserScript==
var eventArr = ['contextmenu', 'dragstart', 'mouseup', 'copy', 'beforecopy', 'selectstart', 'select', 'keydown'];
function runScript(window) {
    var document = window["document"],
        $ = window["jQuery"],
        unbind = function(ele) {
            eventArr.forEach(function(evt) {
                ele['on' + evt] = null;
                if ($) {
                    $(ele).unbind(evt);
                }
                try {
                    if (/frame/i.test(ele.tagName)) {
                        runScript(ele.contentWindow);
                    }
                } catch (err) {}
            });
        };
    [window, document].forEach(unbind);
    for (var i = 0, all = document.all, len = all.length; i < len; i++) {
        var ele = all[i];
        if (ele && ele.nodeType === 1) {
            unbind(ele);
        }
    }
}
window.onload = function(){
    runScript(window);
};
window.onhashchange = function(){
    setTimeout(
        function(){
            runScript(window);
        },400);
};