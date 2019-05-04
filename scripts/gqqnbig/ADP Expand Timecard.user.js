// ==UserScript==
// @name         ADP Expand Timecard
// @namespace    gqqnbig.me
// @version      0.1
// @description  Expand My Timecard section on workforcenow.adp.com so you don't have to check your timecard in a tiny viewport.
// @author       gqqnbig
// @match        https://workforcenow.adp.com/portal/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(()=>{
        if($(".dijitTitlePaneTextNode[data-dojo-attach-point=titleNode]").text().trim()==="My Timecard")
        {
            $("#targetPane").css("height","");
            $("#gridDiv").css("height","");
            $("#TcGridDiv").css("height","");
        }
    },2000);
})();