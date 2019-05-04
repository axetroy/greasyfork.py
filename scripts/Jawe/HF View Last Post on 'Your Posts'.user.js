// ==UserScript==
// @name        HF View Last Post on 'Your Posts'
// @description Add a View Last Post link to the 'Your Posts' page. 
// @include     *hackforums.net/search.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1
// @namespace https://greasyfork.org/users/24272
// ==/UserScript==
var pageText = $('body').html().toString();

var foundText = pageText.indexOf("Last Post");

if (foundText == -1) {
    $(".trow1 a[href*='showthread.php?tid=']").each(function(e) {
        uid = $(this).attr("href");




        if (uid.indexOf('pid') > -1) {} else {

            $(this).after("<a href=" + uid + "&action=lastpost><b><u>View Last Post</u></b></a>");
            $(this).after(" || ");
        }

    })

    $(".trow2 a[href*='showthread.php?tid=']").each(function(e) {
        uid = $(this).attr("href");

        if (uid.indexOf('pid') > -1) {} else {

            $(this).after("<a href=" + uid + "&action=lastpost><b><u>View Last Post</u></b></a>");
            $(this).after(" || ");
        }

    })
}