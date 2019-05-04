// ==UserScript==
// @name         Waffles.fm Check Requests
// @namespace    nikisby
// @version      1.0
// @description  Searches for already uploaded torrents in Waffles.fm requests
// @author       nikisby
// @match        https://waffles.fm/requests.php*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {var css = [".main > tbody > tr > td > div:nth-child(1) {",
"    display: none;",
"}",
"",
"#header #header-main,",
".mainouter,",
"table.main {",
"    width: 98%;",
"}",
"",
"#requesttable td {",
"    font-size: 1.1em;",
"    padding: 3px;",
"    width: auto;",
"}",
"",
"#requesttable td.colhead {",
"    height: 30px;",
"    padding: 0 3px;",
"}",
"",
"#requesttable td a {",
"    font-weight: normal !important;",
"}",
"",
"#requesttable td:nth-child(5),",
"#requesttable td:nth-child(6),",
"#requesttable td:nth-child(10),",
"div > input {",
"    display: none;",
"}",
"",
"table.main > tbody > tr > td > div:nth-child(2) {",
"    margin: 0 auto;",
"}",
"",
"td.outer {",
"    padding: 0 !important;",
"}",
"",
"#requesttable td:nth-child(4) {",
"    width: 105px;",
"}",
"",
"#requesttable td:nth-child(2) {",
"    width: 450px;",
"}",
"",
".start-btn {",
"    width: 400px;",
"    height: 35px;",
"    font-size: 1.5em;",
"    font-family: Verdana, sans-serif;",
"    color: #356AA0;",
"    font-weight: bold;",
"}",
"",
"#requesttable tr.nothing,",
"#requesttable tr.nothing a {",
"  color: gray !important; ",
"  background-color: #F5F5F5;   ",
"}",
"",
"#requesttable tr.error,",
"#requesttable tr.error a {",
"  background-color: #FFAAAA;",
"}",
"",
"#requesttable tr.found {",
"  border: 2px solid #83d150;",
"  background-color: #C9FFB2;  ",
"  transition-property: all;",
"  transition-duration: 0.4s;      ",
"}",
"",
"#requesttable tr.found td {",
"    padding: 7px 3px;      ",
"}",
"",
"#requesttable tr.found td > div {",
"    line-height: 1.5em;",
"}",
"",
"#requesttable tr.found > td:first-child {",
"    text-align: right !important;  ",
"}",
"",
"#requesttable tr.found > td:first-child a {",
"    font-weight: bold !important;",
"}"
].join("\n");
if (typeof GM_addStyle != 'undefined') {
 GM_addStyle(css);
 } else if (typeof PRO_addStyle != 'undefined') {
 PRO_addStyle(css);
 } else if (typeof addStyle != 'undefined') {
 addStyle(css);
 } else {
 var node = document.createElement('style');
 node.type = 'text/css';
 node.appendChild(document.createTextNode(css));
 var heads = document.getElementsByTagName('head');
 if (heads.length > 0) { heads[0].appendChild(node);
 } else {
 // no head yet, stick it whereever
 document.documentElement.appendChild(node);
 }
}})();

this.$ = this.jQuery = jQuery.noConflict(true);

$('#requesttable tr:first td:first-child').after('<td class="colhead" align="center">Search results</td>');

$('#requesttable tr:gt(0) td:first-child').after('<td>...</td>');

$('.main .embedded > p:first').after('<p align="center"><button class="start-btn">Search for uploaded torrents!</button></p>');

$('.start-btn').click(function(){
    $('#requesttable tr:gt(0)').each(function(ind, val){ 
        var approved = '';
        var torrent = $(this).find('td:first').text();
        var strings = torrent.match(/(.+) \[(.+?)\/(.+?)[\/\]].*/);
        
        if ((strings == null) || ($('#requesttable tr:eq('+(ind+1)+') td:eq(6)').text() == 'Yes')) {
            $('#requesttable tr:eq('+(ind+1)+')').addClass('nothing').hide('slow');            
            return;
        }
        
        strings.shift();
        if (strings[2].indexOf('(WI approved)') >= 0) approved = 'is:approved ';
        strings = $.map(strings, function(v) {
            return v.replace(/\s?[\[\(].*?[\]\)]|\s-|[\?!"]|\sep|\ssingle|:.*|any/gi,'');
        });
        var search = approved + strings.join(' ');
        
        setTimeout(function(){
            $.get('browse.php', {q: search})
            .done(function(data) {
                var links = $(data).find('#browsetable td:nth-child(2) a[href^="/details.php"]');
                if (links.length == 0) {
                    $('#requesttable tr:eq('+(ind+1)+')').addClass('nothing').hide('slow');
                    $('#requesttable tr:eq('+(ind+1)+') td:eq(1)').text('Nothing found.');
                } else { 
                    $('#requesttable tr:eq('+(ind+1)+')').addClass('found');
                    $('#requesttable tr:eq('+(ind+1)+') td:eq(1)').hide().html(links).show('fast');
                    $('#requesttable tr:eq('+(ind+1)+') a[href^="/details.php"]').wrap('<div></div>');
                }
            })
            .fail(function() {
                $('#requesttable tr:eq('+(ind+1)+')').addClass('error');
                $('#requesttable tr:eq('+(ind+1)+') td:eq(1)').hide().text('Search error!').show('fast');
            })
        }, 500+(ind*500));        
    });
});