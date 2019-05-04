// ==UserScript==
// @name         Downloaded Torrents List
// @namespace    superiorSilicon
// @version      1.15
// @description  Keep track of WWT torrent downloads
// @author       superiorSilicon
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include      *worldwidetorrents.me/account.php
// @include      *worldwidetorrents.me/torrents-details.php*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// ==/UserScript==
$(document).ready(function(){
    /* STYLING */
    $('head').append('<style> .download-links * { margin-left: 3px; margin-right: 3px} a[title*="Alt"] * { color: blue; } td.delete span { color: red; font-size: 16px;} tr.tableHead th { text-align: center; } .torrent td { text-align: center; } #torrentsTable td, #torrentsTable th { border-left: 1px solid lightgray; border-right: 1px solid lightgray }</style>');

    /* SETTINGS PAGE */
    var settingsLink = '&nbsp;|&nbsp; <a href="#dlSettings" id="dlTorrentsGet"><b>Downloaded Torrents</b></a>';
    $('.f-title th').append(settingsLink);
    var dlTorrentTable = '<table align="center" class="w3-table w3-striped w3-bordered w3-card-4" id="torrentsTable"><tbody><tr class="tableHead"><th class="w3-centered" height="5" width="700">Torrents Name</th><th height="5">Rate</th><th height="5">Uploader</th><th height="5">Download</th><th heigth="5">Delete</th></tr></tbody></table>';
    $('#dlTorrentsGet').click(function(){
        $('.f-border.comment').replaceWith(dlTorrentTable);
        for(i = 0; i < GM_listValues().length; i++) {
            var entry = GM_getValue(GM_listValues()[i]);
            $('#torrentsTable tbody').append(entry);
        }
        $('.delete a[id*="delete-"]').click(function(){
            GM_deleteValue($(this).attr('id').split(/delete\-/g)[1]);
            window.location.reload(false);
        });
    });

    /* TORRENT PAGE */
    var dlButtons = [$('a[href^="magnet:"]'), $('a[href*="itorrents.org"]'), $('a[href*="download.php"]')];
    var magnetURL = $('a[href^="magnet:"]').attr('href');
    var torDL2 = $('a[href*="itorrents.org"]').attr('href');
    var torrentEntry, EntryName;
    var torrentName = $('.myFrame-content span[style="font-size: 20px;"]').html();
    var uploaderName = $('a[href*="account-details"] font').html();
    var uploaderColor = $('a[href*="account-details"] font').attr('color');
    var uploaderID = $('td p > a[href*="account-details"]').attr('href').split(/\/account-details\.php\?id\=/g)[1];
    var torID = window.location.href.split(/.*worldwidetorrents.me\/torrents-details.php\?id=/g)[1];
    $.each(dlButtons, function(){
        this.click(function(){
            EntryName = 'entry' + torID;
            torrentEntry = '<tr class="torrent" id="'+ torID +'">'+
                '<td class="torrent-name"><a title="'+ torrentName +'" href="torrents-details.php?id='+ torID +'&amp;hit=1">'+ torrentName +'</a></td>'+
                '<td class="rate-torrent"><a title="Rate Good" href="/reputation.php?action=add&good&targetid='+ uploaderID +'&targetto='+ torID +'" target="_blank"><span style="color: green;" class="glyphicon glyphicon-thumbs-up"></span></a>&nbsp;<a title="Rate Bad" href="/reputation.php?action=add&bad&targetid='+ uploaderID +'&targetto='+ torID +'" target="_blank"><span style="color: red;" class="glyphicon glyphicon-thumbs-down"></span></a></td>'+
                '<td class="uploader-name"><a title="'+ uploaderName +'" href="account-details.php?id='+ uploaderID +'"><b><font color="'+ uploaderColor +'">'+ uploaderName +'</font></b></a></td>'+
                '<td class="download-links"><a title="Magnet" href="'+ magnetURL +'"><span class="btn btn-default"><span class="glyphicon glyphicon-magnet invert"></span></span></a>'+
                '<a title="Regular Download" href="/download.php?id='+torID+'&name='+torID+'"><span class="btn btn-default"><span class="glyphicon glyphicon-download"></span></span></a>'+
                '<a title="Alternate Download" href="'+ torDL2 +'"><span class="btn btn-default"><span class="glyphicon glyphicon-download"></span></span></a></td>'+
                '<td class="delete"><a title="Delete Entry" href="#deleteEntry" id="delete-'+ EntryName +'"><span class="btn btn-default"><span class="glyphicon glyphicon-remove"></span></span></a>'+
                '</td></tr>';
            GM_setValue(EntryName, torrentEntry);
        });
    });
});