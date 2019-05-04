// ==UserScript==
// @name         AutoCloseHosp'd
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  automatically closes torn profile pages if target is in the hospital
// @author       WizardRubic
// @match        *.torn.com/profiles.php*
// @grant        window.close

// ==/UserScript==

(function() {
    'use strict';
    var isAttackable = function(description) {
        // if hospital or travelling then return false as they're not attackable
        if(description=="" || description.indexOf("Okay")!=-1) {
            return true;
        } else {
            return false;
        }
    };
    var profileElement = (document.getElementsByClassName("content-wrapper m-left20 left summer")[0]);
    var callback = function(mutationsList) {
        var description = document.getElementsByClassName("main-desc")[0].innerHTML;
        if(!isAttackable(description)) {
            window.close();
        }
    };
    var mutationConfig = { attributes: true, childList: true, subtree: true };
    var observer = new MutationObserver(callback);
    observer.observe(profileElement, mutationConfig);
})();