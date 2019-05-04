// ==UserScript==
// @name        AQW Link Preview for Wiki and Character Pages
// @description Adds image previews for links on the official AQW Wiki or AQW character pages.
// @namespace   AQW Whitehats
// @include     http://aqwwiki.wikidot.com/*
// @include     http://www.aq.com/char/*
// @include     http://www.aq.com/character.asp*
// @include     http://account.aq.com/Inventory.aspx*
// @version     1.2
// @grant       GM_log
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js

// ==/UserScript==



var currentMousePos = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });


 $("a.item, div.item > div > a, div.list-pages-item > p > a, div.collapsible-block-content > a, div.collapsible-block-content > p > a, div.yui-content > div > a, div.yui-content > div > p > a, div.list-pages-box > p > a, #page-content > ul > li > a, #page-content > ul > li > span > a, #page-content > ul > li > ul > li > a, div.yui-content > div > ul > li > ul > li > a, #page-content > a, #page-content > p > a, tr > td > a ").hover(function(){
     $("body").append("<div id='preview' style='position:absolute;z-index:9999;'><iframe frameBorder='0' scrolling='no' width='2500px' height='800px' src='http://lel.wtf/wikimg.php?page="+this.href+"'></iframe></div>");                                
         $("#preview")
            .css("top",(currentMousePos.y - 200) + "px")
            .css("left",(currentMousePos.x + 100) + "px")
        },function(){
      $("#preview").remove();
    });


 
$( "div.invgrids div table tbody tr td:nth-child(2)" ).hover(function(){
    
     $("body").append("<div id='preview' style='position:absolute;z-index:9999;'><iframe frameBorder='0' scrolling='no' width='2500px' height='800px' src='http://lel.wtf/wikimg.php?page=http://aqwwiki.wikidot.com/search:site/a/p/q/"+this.innerHTML+"'></iframe></div>");                                
         $("#preview")
            .css("top",(currentMousePos.y - 200) + "px")
            .css("left",(currentMousePos.x + 100) + "px")
        },function(){
      $("#preview").remove();
    });