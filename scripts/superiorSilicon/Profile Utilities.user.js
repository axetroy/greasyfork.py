// ==UserScript==
// @name         Profile Utilities
// @namespace    Superior Silicon
// @version      1.5.10
// @description  Adds little utilities to profile pages
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author       superiorSilicon
// @include      *worldwidetorrents.eu/account-details.php?id=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Settings

    // Variables
    var placement = $('td[align="center"][valign="top"]'); //Placement selector
    var textbody = $('textarea[name="body"]'); //Textarea selector

    // Text Utilities
    var userName = $('h3 > center > font[color^="#"]').html();
    $('h3 > center > font[color^="#"]').attr("id","username");

    var welMess = `[align=center][size=4]Welcome to WorldWide Torrents, ` + userName + `.

Please take time to familiarize yourself with the site rules and various forum threads at the following links:
[url=https://worldwidetorrents.eu/rules.php?action=viewforum&forumid=24]site rules[/url] and 
[url=https://worldwidetorrents.eu/forums.php?action=viewforum&forumid=24]site rules threads[/url].

You can find all kinds of tutorials on site workings at the following link:
[url=https://worldwidetorrents.eu/forums.php?action=viewforum&forumid=30]tutorials[/url]

If you have any questions about anything not covered in the rules or tutorials then contact one of our "Super Users" at the following link:
[url=https://worldwidetorrents.eu/forums.php?action=viewtopic&topicid=647]ask a SU for help[/url].

Any members that feel they might have something to contribute to our site magazine, "The Privateer", please PM either [url=https://worldwidetorrents.eu/mailbox.php?compose&id=5]RonthePirate[/url] or [url=https://worldwidetorrents.eu/mailbox.php?compose&id=8718]KayOs[/url]. They will be glad to talk to you.

Enjoy your stay here and feel free to chat and make friends with other members on the forums or in "shoutbox" on the Home page.[/size][/align]`;


    // Buttons
    var welButt = '<button id="welButt" type="button" class="pu-btn w3-btn w3-teal" title="Welcome Message For New Users" style="width:127px">Welcome</button>';

    placement.append(welButt);
    function welAddM () { textbody.val(welMess); }
    $('#welButt').click(welAddM);
    $('.pu-btn').css("border","1px solid gray");
})();