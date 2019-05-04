// ==UserScript==
// @name         leetcode Immersive workspace 
// @namespace    tea.pm
// @version      0.2
// @description simplify leetcode
// @author       linjun
// @match        https://leetcode.com/problems/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $("div.navbar").remove();
    $("div#interviewed-div").remove();
    $("li.list-item-tags").remove();
    $("div.action-btn-base").remove();
    $("#question-detail-share-buttons").parent().remove();
    $("footer.site-footer").remove();
    $("h3").prepend("<a href='javascript:history.back()'>Back</a>");
    $("div.question-detail-container").attr("class", "container-fluid question-detail-container");
    $("div.question-panel").attr("class", "col-md-4 question-panel");
    $("span.difficulty-label:first").prependTo("h3");
    $("div#desktop-side-bar").remove();//appendTo("div.question-panel");
    $("div.editor-base").appendTo("div#descriptionContent");
    $("div.editor-base").attr("class", "col-md-8 editor-base");
    $("div.side-bar").attr("class", "side-bar");
})();