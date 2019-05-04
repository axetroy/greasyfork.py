// ==UserScript==
// @name         Anti dilidili adblock-detector
// @namespace    halyul
// @version      0.5
// @description  Fuck dilidili adblock-detector
// @author       Halyul
// @match        http://www.dilidili.wang
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (document.readyState === 'complete' || document.readyState !== 'loading') {
        antiDetector();
    } else {
        document.addEventListener('DOMContentLoaded', antiDetector);
    }
    
    function antiDetector() {
        $.ajax({
        url:"http://static.jfrft.com/js/main_list.js",
           dataType:"script"
        }).done(
            function() {
                console.log('didnt find the adblock-detector, exit');
                return;
            }
        ).fail(
            function() {
                console.log('adblock-detector detected, ready to reload the page!');
                pageReload();
            }
        );
    }

    function pageReload() {
        var req = new XMLHttpRequest();
        req.open('GET', "http://www.dilidili.wang");
        req.send();
        req.onload = () => {
            document.querySelector('html').innerHTML = req.responseText;
            document.querySelector('div.popUp').style.display = 'none';
        };
    }
})();