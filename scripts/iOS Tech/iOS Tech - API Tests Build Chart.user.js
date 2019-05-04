// ==UserScript==
// @name         iOS Tech - API Tests Build Chart
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       You
// @match        http://bamboo.hcom/chain/viewChain.action?planKey=IOS-NAT
// @grant        none
// @require      http://code.jquery.com/jquery-3.1.1.slim.min.js
// ==/UserScript==

(function() {
    'use strict';

    function hideEverythingExceptFromChart() {
        // Hide everything but the chart
        var chart = $("#build-number-chart");
        chart.siblings().hide();
        chart.parents().siblings().hide();

        // Make chart left aligned
        var numberChart = $("#build-number-chart");
        numberChart.css("left", 0);

        // Add title
        var buildStatistics = $("#build-statistics");
        buildStatistics.prepend($("<li><h2>API Tests</h2></li>"));

        // Styling
        chart.parent().css("border", "none");
        var pagePanel = $(".aui-page-panel");
        pagePanel.css("border", "none");
        pagePanel.css("background", "none");
        $("#build-statistics li").css("padding", 0);
        $("section").css("padding", 0);
        $("li").css("text-align", "center");
        $("h2").css("font-size", "20pt");
        $("canvas").css("width", "340px");
        $(".aui-page-panel-content").css("border-top", "1px solid gray");
    }
    function schedulePageRefresh() {
        // Refresh every half an hour
        setTimeout(function(){
            window.location.reload();
        }, 1800000);
    }

    hideEverythingExceptFromChart();
    schedulePageRefresh();
})();