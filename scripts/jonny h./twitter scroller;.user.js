// ==UserScript==
// @name         twitter scroller;
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://twitter.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var TopTweet;
    var btn = document.createElement("BUTTON");
    var t  = document.createTextNode("LOAD TWEETS");
    btn.appendChild(t);
    document.getElementsByClassName("container")[0].children[2].appendChild(btn);
    btn.onclick=load;

    function load(){
        TopTweet=document.getElementById("stream-items-id").children[0].id;
        if(document.getElementsByClassName("new-tweets-bar js-new-tweets-bar")[0]){
            document.getElementsByClassName("new-tweets-bar js-new-tweets-bar")[0].click();
            btn.textContent="goto "+TopTweet;
            btn.onclick=goto;
        }
    }
    function goto(){
        console.log(TopTweet);
        try {
         window.scrollTo(0,document.getElementById(TopTweet.toString()).offsetTop);
        }catch(e){
        
        }
        btn.textContent="refresh";
        btn.onclick=load;
    }
    // Your code here...
})();