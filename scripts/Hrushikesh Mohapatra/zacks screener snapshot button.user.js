// ==UserScript==
// @name         zacks screener snapshot button
// @namespace    https://screener.zacks.com/
// @version      1.1
// @description  --
// @author       Hrushikesh Mohapatra
// @match        https://screener.zacks.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

    // Load z2 css
    // It provide report_camera class
    //$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'https://staticx.zacks.com/min/z2-min.css') );

    function log(msg){
        var time = new Date();
        console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + " - " + msg);
    }

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function prettyInt(x) {
        var parts = Number(x).toString().split(".");
        var y = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        //log(x + " -> "+ y);
        return y;
    }

    function round(value, decimals) {
        return Number(Math.round(Number(value)+'e'+decimals)+'e-'+decimals);
    }

    function prettyFloat(x){
        var parts = round(x, 2).toString().split(".");
        var y = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
         y = y+"."+( parts.length > 1 ? parts[1] : "00");
        //log(x + " -> "+ y);
        return y;
    }

    function intToDate(x){
        var y = moment(x.toString()).format("MM/DD");
        log(x + " -> "+y);
        return y;
    }
    function updateHTML(elements, callback){
        elements.each(function(i, e){
            e.innerHTML = callback(e.innerHTML);
        });
    }

    function addSnap(){
        var table = $('#screener_content table');
        var news = table.find('td.results_links>a.stock_news');

        if(news.length > 0){
            log(news.length + " news elements will be updated");

            // Convert a.news to Snapshot
            news.each(function(){
                var ticker=/research\/(.*)\/all-news\/all/.exec(this.href)[1];
                this.href='http://www.zacks.com/stock/research/snapshot/'+ticker;
                this.target="_blank";
            });

            // Remove stock_charts
            table.find('td.results_links>a.stock_charts').remove();

            // Make volume, Market Cap readable
            updateHTML(table.find('td.VOLUME, td.MKT_VALUE'), prettyInt);
            updateHTML(table.find('td.PERC_CHG_4W, td.PERC_CHG_1W'), prettyFloat);
            updateHTML(table.find('td.EXP_REP_DATE'), intToDate);
        }

    }

    // main()
    addSnap();

})();