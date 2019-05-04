// ==UserScript==
// @name         WK Cool Review Progress Bar
// @namespace    japanese
// @version      0.1
// @description  Make the review progress bar not be boring
// @author       Sean 'StarMech' Matthew
// @match        http*://www.wanikani.com/review/session
// @grant        none
// ==/UserScript==

(function() {
    ///////////////////////////////////////////////////
    // Edit these to choose which features you want
    var useAnimatedBar = true;
    var useThickBar = true;
    var barThickness = 25; //Height in pixels
    ///////////////////////////////////////////////////


    if(useAnimatedBar){
        document.getElementById('bar').style.transition = 'all 1s ease 0s';
    }
    if(useThickBar){
        document.getElementById('progress-bar').style.height = barThickness + 'px';
        document.getElementById('bar').style.height = '100%';
    }
})();