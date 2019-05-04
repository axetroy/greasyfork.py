// ==UserScript==
// @name       Feedly: Append "- feedly" to Title
// @version    0.1
// @description  Append "- feedly" to page <title> for cloud.feedly.com
// @include     http://feedly.com/*
// @run-at         document-start
// @namespace https://greasyfork.org/users/14108
// ==/UserScript==

(function(){

if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

var suffix = " - feedly";
var appendFeedlyTitle = function() {
    if (!document.title.endsWith(suffix)) {
        document.title += suffix;
    }
}

window.addEventListener("DOMTitleChanged", appendFeedlyTitle, false);

var DOMTitle = document.getElementsByTagName('TITLE')[0];
DOMTitle.addEventListener('DOMSubtreeModified', appendFeedlyTitle, false);

appendFeedlyTitle();

})();