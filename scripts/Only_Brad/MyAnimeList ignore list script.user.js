// ==UserScript==
// @name         MyAnimeList ignore list script
// @namespace    MAL
// @version      0.1
// @description  Hide users on MAL
// @author       Only_Brad
// @match        https://myanimelist.net/forum/*
// @grant        none
// ==/UserScript==

/*How to use:

add the username inside the blacklist variable, put the names inside quotation marks and separate them with a comma.
Example, if you want blacklist the users AnnoyingPrick, Troll and IDontLikeHisFace, replace:

var blacklist = [];
with
var blacklist = ["AnnoyingPrick","Troll","IDontLikeHisFace"];
*/

(function() {
    function ignoreList() {
        var blacklist = []; //ADD USERS HERE
        var allUsers = document.querySelectorAll(".forum_boardrow2 strong");

        for(var i=0;i<allUsers.length;i++) {

            if(blacklist.indexOf(allUsers[i].innerHTML) >= 0) {

                var post = allUsers[i].parentNode;
                for(var j=0;j<7;j++) {
                    post = post.parentNode
                }
                post.style.display = "none";
                post.previousElementSibling.style.display = "none";
            }
        }
    }
    window.onload = ignoreList;
})();

