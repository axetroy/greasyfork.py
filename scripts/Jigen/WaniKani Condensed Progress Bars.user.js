// ==UserScript==
// @name         WaniKani Condensed Progress Bars
// @namespace    http://tampermonkey.net/
// @version      2.5
// @description  try to take over the world!
// @author       You
// @match        https://www.wanikani.com/
// @match        https://www.wanikani.com/dashboard
// @require      https://greasyfork.org/scripts/22751-wanikani-settings/code/WaniKani%20Settings.js?version=166555
// @grant        none
// ==/UserScript==

(function() {
// Hook into App Store
    //try { $('.app-store-menu-item').remove(); $('<li class="app-store-menu-item"><a href="https://community.wanikani.com/t/there-are-so-many-user-scripts-now-that-discovering-them-is-hard/20709">App Store</a></li>').insertBefore($('.navbar .dropdown-menu .nav-header:contains("Account")')); window.appStoreRegistry = window.appStoreRegistry || {}; window.appStoreRegistry[GM_info.script.uuid] = GM_info; localStorage.appStoreRegistry = JSON.stringify(appStoreRegistry); } catch (e) {}
    'use strict';
    var css = '.progressBarProgress {' +
             '  float: right;' +
             '  position: absolute;' +
             '  text-shadow: 0 1px 0 rgba(255,255,255,0.5);' +
             '  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;' +
             '  font-size: 12px;' +
             '  right: 10px;' +
             '  color: black;' +
             '}' +
             '.threshold {' +
             '  color: black !important;' +
             '}' +
             '.progression .chart {' +
             '  display: block !important;' +
             '}' +
             '.progress, .progress .bar {' +
             '  border-radius: 10px' +
             '}' +
             '#progressBarSettingsLink.error {' +
             '  background-color: red;' +
             '}' +
             '.bar.zero .dark {' +
             '  display: none;' +
             '}' + 
             '.radicals-progress h3, .kanji-progress h3 {' +
             '  display: none;' +
             '}';

    makeSettings("Progress Bars",{1: {Name: "apiKeyForProgressBar", Display: "Api Key", Type: "textbox"},
                                 2: {Name: "ProgressBarBackgrounds", Display: "Background", Type: "checkbox", Default: "0"},
                                 3: {Name: "DecimalPoints", Display: "Decimals", Type: "textbox", Default: "2"}});
    var apiKey = getSetting('apiKeyForProgressBar');
    if(getSetting('ProgressBarBackgrounds') == "1"){
        css = css +
            '.radicals-progress .progress {' +
            '  background-color: #99ddff;' +
            '}' +
            '.kanji-progress .progress {' +
            '  background-color: #ff99dd;' +
            '}';
    }
    addStyle(css);
    if(apiKey !== null && apiKey !== "") {
        DoProgressBars(apiKey);
    } else {
        ProgressBarsNotSetup();
    }
})();

function DoProgressBars(apiKey){
    var radicals = "";
    var kanji = "";
    var decimals = getSetting("DecimalPoints") === null ? 2 : getSetting("DecimalPoints");
    $.getJSON('https://www.wanikani.com/api/user/' + apiKey + '/level-progression', function (data) {
        setTimeout(function () {
            if (data.error) {
                alert('API Error: ' + data.error.message);
            } else {
                var radicalProgress = (parseInt(data.requested_information.radicals_progress) / parseInt(data.requested_information.radicals_total) * 100);
                radicals = "<div class='progress'><div class='bar' style='width: " + (radicalProgress).toFixed(decimals) + "%;'>" +
                    "<span class='dark'><b>" + (radicalProgress).toFixed(decimals) + "%</b></span>" +
                    "</div>" +
                    "<span class='progressBarProgress'>" + data.requested_information.radicals_progress + "/" + data.requested_information.radicals_total + "</span></div>";
                var kanjiProgress = parseInt(data.requested_information.kanji_progress) / parseInt(data.requested_information.kanji_total) * 100;
                kanji = "<div class='progress'>" +
                    "<div class='bar' style='width: " + (kanjiProgress).toFixed(decimals) + "%;'>" +
                    "<span class='dark'><b>" + (kanjiProgress).toFixed(decimals) + "%</b></span>" +
                    "<div class='threshold' style='width: 90%;'>Goal: " + Math.ceil(parseInt(data.requested_information.kanji_total) * 0.9) + "</div>" +
                    "</div><span class='progressBarProgress'>" + data.requested_information.kanji_progress + "/" + data.requested_information.kanji_total + "</span>" +
                    "</div>" +
                    "</div>";
                $('.radicals-progress .chart').html(radicals);
                $('.kanji-progress .chart').html(kanji);
                if(radicalProgress === 0 || ($.isNumeric(radicalProgress) === false)){
                    $('.radicals-progress .bar').addClass('zero');
                }
                if(kanjiProgress === 0){
                    $('.kanji-progress .bar').addClass('zero');
                }
            }
        }, 0);
    });
}

function ProgressBarsNotSetup(){
    setTimeout(function () {
        if($('.dropdown.account.open').length === 0){
            $('.dropdown.account').addClass('open');
        }
        $('#divProgressBarsLink').addClass('error');
        $("#divProgressBarsLink").attr('title','SRS Grid needs for API key ->');
        $("#divProgressBarsLink").tooltip({
            position: { my: "right-15 right", at: "left center" }
        });
        $("#divProgressBarsLink").tooltip("open");
    }, 2000);
}