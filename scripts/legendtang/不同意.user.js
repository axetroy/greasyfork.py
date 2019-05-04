// ==UserScript==
// @name         不同意
// @version      1.02
// @description  知道了，不同意
// @author       知道了
// @match        *://*.zhihu.com/*
// @run-at       document-end
// @grant        none
// @namespace https://greasyfork.org/users/8650
// ==/UserScript==

(function() {
    'use strict';

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    const target = document.body;
    const observer = new MutationObserver(function(mutations, ob) {
        mutations.forEach(function(mutation) {
            const mut_target = mutation.target;

            Array.prototype.forEach.call(mut_target.children, function(child, index){
                if (child.children.length && child.children[0].children.length) {
                    const confirm_popup = child.children[0].children[0];
                    if (confirm_popup.children.length && confirm_popup.children[0].children.length) {
                        const confirm_inner_popup = confirm_popup.children[0];
                        if (confirm_inner_popup.className.indexOf("Modal-wrapper") >= 0 && confirm_inner_popup.children[1].className.indexOf("PrivacyConfirm") >= 0) {
                            document.documentElement.style.overflow = "auto";
                            child.remove();
                            ob.disconnect();
                        }
                    }
                }
            });
        });
    });
    const config = { attributes: true, childList: true, characterData: true };
    observer.observe(target, config);
})();