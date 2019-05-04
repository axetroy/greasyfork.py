// ==UserScript==
// @name         VK Chat++
// @version      2
// @namespace    maksimkurb/vkchatplusplus
// @description  Vkontakte chat improved
// @author       maksimkurb
// @match        *://vk.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var closeButton = document.createElement('div');
closeButton.className = "im_tab_selected";
closeButton.innerHTML = '<div class="im_tab1"><div class="im_tab2"><table cellspacing="0" cellpadding="0"><tbody><tr><td><div class="im_tabx" onclick="cancelEvent(event);IM.closeOtherTabs();"></div></td></tr></tbody></table></div></div>';

var appendButton = function() {
   var tabs = document.getElementById('im_tabs');
   tabs.insertBefore(closeButton, tabs.firstChild);
}

IM.closeOtherTabs = function() {
    for (var peer in cur.tabs){
        if (cur.tabs.hasOwnProperty(peer)) {
            if (peer != cur.peer) {
                IM.closeTab(peer);
            }
        }
    }
};

IM.selectDialog = (function() {
    var cached_function = IM.selectDialog;
    return function() {
        var result = cached_function.apply(this, arguments);
        appendButton();
        return result;
    };
})();

appendButton();