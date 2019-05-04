// ==UserScript==
// @name         WWT - EZ Scrape Buttons
// @namespace    NotNeo
// @version      0.3
// @description  EZ Scrape Buttons @ WWT
// @author       NotNeo
// @match        https://worldwidetorrents.to/torrents-details.php*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @grant        none
// ==/UserScript==

var currentID = $("button[type='submit']:contains('Report')").first().parent().attr("href").split("=")[1];
$("button[type='submit']:contains('Report')").first().parent().parent().prepend("<button style='float:left;' class='w3-btn w3-teal' id='scrapeThis'>Scrape</button> <button style='float: left; background-color: #2e4dc9' class='w3-btn' id='scrapeNext'>Scrape Next</button>");
$("button[type='submit']:contains('Report')").first().parent().parent().after("<br>");

$("#scrapeThis").click(function(e) {
    e.preventDefault();
    $(this).text("Scraping...");
    location.href = "https://worldwidetorrents.to/torrents-details.php?id=" + currentID + "&scrape=1#technical";
});
$("#scrapeNext").click(function(e) {
    e.preventDefault();
    $(this).text("Scraping Next...");
    location.href = "https://worldwidetorrents.to/torrents-details.php?id=" + ((currentID * 1) + 1) + "&scrape=1#technical";
});