// ==UserScript==
// @name         Post Hyperlink WWT
// @namespace    superiorSilicon
// @version      1.8
// @description  Adds hyperlinks to posts in WWT Forums
// @author       superiorSilicon
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js
// @include      *worldwidetorrents.me/forums.php?action=viewtopic&topicid=*
// @grant        none
// ==/UserScript==
$(document).ready(function(){
    var page = $(".myFrame-content").toArray(),
        forum = page[0].children,
        nav = forum[0].children[5].children,
        pageid;
    $.each(nav, function(){
        var match = /^[0-9]+$/g;
        if (match.test(this.innerText)) {
            pageid = this.innerHTML;
        }
    });
    var clipboard = new Clipboard('.w3-btn'),
        posts = $('.f-post'), //Array of all posts
        area, //Declaring var area
        postid, //Declaring var postid
        hyperlink, //Declaring var hyperlink
        button, //Declaring var button
        textlink,
        p;

    $.each(posts, function(){ //Iterating on each post
        area = $(this).find('div[align="right"]'); //Place to prepend the buttons to
        postid = $(this).find('a[href*="report.php?forumid="]').prop('href').split(/.*:\/\/worldwidetorrents\.me\/report.php\?forumid=.*\&forumpost=/)[1]; //ID of every post
        button = '<button class="w3-btn w3-teal" style="margin-right: 5px; background: #00E676 !important; color: #3a3a3a !important" id="'+ postid +'" data-clipboard-text="'+ hyperlink +'">Hyperlink</button>';
        hyperlink = window.location.href.split(/(.*:\/\/worldwidetorrents.me\/forums\.php\?action=viewtopic\&topicid=.*&page).*/)[1] + '=' + pageid + '#post' + postid; //Constructed Hyperlink For Final Use
        textlink = '<p data-post="'+ postid +'" style="display: none">'+ hyperlink +'</p>';
        area.prepend(button);
        $('button#'+postid+'').parent().prepend(textlink);
    });

    clipboard.on('success', function(e){
        setTimeout(function(){
            $('button[data-clipboard-text="'+e.text+'"]').html("Copied");
        }, 100);
        setTimeout(function(){
            $('button[data-clipboard-text="'+e.text+'"]').html("Hyperlink");
        }, 600);
    });
});