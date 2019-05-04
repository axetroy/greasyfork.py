// ==UserScript==
// @name         Post Hyperlink WWT
// @namespace    superiorSilicon
// @version      1.9.3
// @description  Adds hyperlinks to posts in WWT Forums
// @author       superiorSilicon, NotNeo
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js
// @include      *worldwidetorrents.to/forums.php?action=viewtopic&topicid=*
// @grant        none
// ==/UserScript==

var cleanurl = window.location.href.split("#")[0];

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
    postid = $(this).prevAll("a[id^='post']:first").prop("id").split("post")[1];
    hyperlink = cleanurl + '#post' + postid; //Constructed Hyperlink For Final Use
    button = '<button class="w3-btn w3-teal" title="Link to be copied:\n '+hyperlink+'" style="margin-right: 5px; background: #00E676 !important; color: #3a3a3a !important" id="'+ postid +'" data-clipboard-text="'+ hyperlink +'">Hyperlink</button>';
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