// ==UserScript==
// @name         iOS Tech - Bamboo Agents Status
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       You
// @match        http://bamboo.hcom/agent/viewAgents.action?planKey=IOS-DEV-JOB1
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // This is required to be able to use jQuery .reverse()
    // http://stackoverflow.com/questions/1394020/jquery-each-backwards
    jQuery.fn.reverse = [].reverse;
    
    // NOTE the inclusion of the @require in the header comment to facilitate the use of jQuery

    $("#tabContainer").prependTo("body");
    
    $(".aui-tabs>.tabs-pane").css("padding", "0px");
    
    $("#Offlineremoteagents #remote-agents tbody tr").reverse().each(function( index ) {
        
        var agentName = $(this).find("a:first").html();
        
        var offlineRow = $("<tr class='agentOffline'>")
                            .append($("<td/>").html(agentName))
                            .append($("<td class='agentStatus'>OFFLINE</td>"));
        
        $(offlineRow).prependTo("#Onlineremoteagents #remote-agents tbody");
        
    });
    
    $("#remote-agents td:not(.agentStatus)")
        .css('background-color', '#55bb15')
        .css('color', 'white')
        .css('border-width', '0px');
    
    $(".agentOffline td:not(.agentStatus)")
        .css('background-color', '#FF4444');
    
    $("#remote-agents td:not(.agentStatus) a")
        .css('background-color', 'transparent')
        .css('color', 'white')
        .css('border-width', '0px');
    
    $("#Onlineremoteagents").contents().filter(function(){
        return (this.nodeType == 3);
    }).remove();
    $("#remote-agents thead").remove();
    $(".tabs-menu").remove();
    $("#header").remove();
    $("#footer").remove();
    $("#content").remove();
    
    // Refresh the page every 30 seconds
    setTimeout(function(){
            window.location.reload();
    }, 30000);

})();