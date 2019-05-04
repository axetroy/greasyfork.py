// ==UserScript==
// @name         WWT - Sidebar Forum Auto-Update
// @namespace    NotNeo
// @version      1.3.5
// @description  Auto-updates the sidebar forum on WWT without having to reload the page
// @author       superiorSilicon, NotNeo
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include      *worldwidetorrents.to*
// @exclude      *worldwidetorrents.to/api.php
// @icon         https://i.imgur.com/xf3DTQR.png
// @grant        none
// ==/UserScript==

//SETTINGS
var time = 30; //Replace the "30" with your desired time in seconds.
//SETTINGS END

$(document).ready(function(){
    if($("h4.w3-allerta:contains('Latest Forum')").length > 0) {
        //console.log("sidebar forum found");
        setInterval(UpdateSideForum, time*1000);
    }
});

function UpdateSideForum(){
    $.ajax({
        url:'/torrents-search.php',
        type:'GET',
        dataType: 'text',
        success: function(data){
            console.log("Sidebar Forum Update Load Successful");
            let newForumContent = '<h4' + data.split('Add Blog</button></a><input')[1].split('><h4')[1].split('</div>')[0]; //for some reason split just does not want to work right... ???
            $("td[valign='top'] > .w3-card-2.w3-round.w3-white.w3-padding-large:eq(1)").html(newForumContent);      //the rest of the HTML string would cut out if the second to last split here was ('>')[1] ???
        }                                                                                                           //so it now cuts mid tag, which is why '<h4' has to be prefixed to the result ???
    });
}