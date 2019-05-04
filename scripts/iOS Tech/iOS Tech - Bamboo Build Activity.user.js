// ==UserScript==
// @name         iOS Tech - Bamboo Build Activity
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http://bamboo.hcom/currentActivity.action
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    $("header").remove();
    $("footer").remove();
    $("#header").remove();
    $("#footer").remove();
    $("#assistive-skip-links").remove();
    $("#recently-built").remove();
    
    $(".aui-page-panel")
        .css('margin-top', '0px');
    
    $("h2").remove();
    
    $(".aui-page-panel-content")
        .css('padding-top', '0px');
    
    
    $("#currentActivity p").last().remove();
    
    function filterOutNonIOSBuildsAfter(seconds)
    {
        setTimeout(function(){
            $("#building li").each(function() {
                var label = $(this).find(".buildInfo a").first().text();
                if (label.startsWith("IOS")) {
                    // Examples of 'progressText' are:
                    //    Building for 12 mins
                    //    Building for 12 mins. 1 min remaining
                    //    Building for 1 min. 1 min remaining
                    //    Building for 2 mins. 28 mins remaining
                    var progressText = $(this).find(".progress-text").text();
                    // Split at any ' (to remove the '. X min(s) remaining' part)
                    progressText = progressText.split('.', 1)[0];

                    // If the progressText contains 'mins'
                    if (progressText.indexOf("mins") !== -1) 
                    {
                        // Remove 'Building for ' prefix
                        progressText = progressText.substr(13,progressText.length-1).substr();
                        // Remove ' mins' suffix
                        progressText = progressText.substr(0,progressText.length-5).substr()
                        // Parse time to int
                        var buildTime = parseInt(progressText, 10)
                        if (buildTime >= 20) {
                           $(this).css('background-color', '#FF4444');
                        }
                    }
                    
                } else {
                    $(this).remove()
                }
            });
            
            $("#queue li").each(function() {
                var label = $(this).find(".buildInfo a").first().text();
                if (label.startsWith("IOS")) {
                    //$(this).css('background-color', 'red');
                } else {
                    $(this).remove()
                }
            });
            
            filterOutNonIOSBuildsAfter(2)
        }, 1000 * seconds);
    }
    
    filterOutNonIOSBuildsAfter(1);
    
    
    // Refresh the page every 1 minute
    setTimeout(function(){
            window.location.reload();
    }, 60000);
    
    // Your code here...
})();