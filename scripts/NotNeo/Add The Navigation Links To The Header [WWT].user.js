// ==UserScript==
// @name         Add The Navigation Links To The Header [WWT]
// @namespace    Bond
// @author       Jaqen H'Ghar AKA ElBrado AKA Bond && NotNeo
// @description  Adds The Navigation Links To The Header without having to scroll for the links
// @include      *worldwidetorrents.to/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version      1.3.3
// @grant        none
// ==/UserScript==

var links = '';
links += '<a href="/teams-view.php"> Teams</a>';
links += '<a href="/staff.php"> Staff</a>';
links += '<a href="/account.php?action=mytorrents"> My Torrents</a>';
links += '<a href="/account.php?action=mythreads"> My Threads</a>';

//to enable disable entries, comment/uncomment lines with //
//To add new entiries: copy-paste below line, edit and uncomment.
//links += '<a href="https://yourlinkhere.com/betweenthequotes"> Menu text here</a>';

$(document).ready(function(){
    $('.w3-navbar').append('<li class="w3-hide-small w3-dropdown-hover jaqensscript"><a href="#" class="w3-padding-large w3-hover-white class1" title="Navigation"><i class="fa fa-arrow-right"></i> Navigation</a><div class="w3-dropdown-content w3-white w3-card-4 w3-small">'+links+'</div></li>');
    $('#main > center > table > tbody > tr > td:nth-child(3) > div > div.myBlock-content > div > h4:nth-child(33) > center').remove();
    $('#navigate').parent().prev("br").hide();
    $('#navigate').parent().hide();
});