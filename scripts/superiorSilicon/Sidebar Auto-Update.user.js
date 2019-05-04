// ==UserScript==
// @name         Sidebar Auto-Update
// @namespace    superiorSilicon
// @version      1.3.1
// @description  Auto-updates the sidebar on WWT without having to reload the page
// @author       superiorSilicon, NotNeo
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include      *worldwidetorrents.me*
// @exclude      *worldwidetorrents.me/api.php
// @icon         https://i.imgur.com/xf3DTQR.png
// @grant        none
// ==/UserScript==

//SETTINGS
var time = 20; //Replace the "20" with your desired time in seconds.
//SETTINGS END

$(document).ready(function(){
    function update(){
        $.ajax({
		   url:'https://worldwidetorrents.me/home.php',
		   type:'GET',
		   dataType: 'text',
		   success: function(data){
			   var newForumContent = data.split('Add Blog</button></a><input type=hidden name=class value=></form></center></center>\n</div><br><div class="w3-card-2 w3-round w3-white w3-padding-large">')[1].split('</div>')[0];
			   $("td[valign='top'] > .w3-card-2.w3-round.w3-white.w3-padding-large:eq(1)").html(newForumContent);
		   }
		});
    }
    setInterval(update, time*1000);
});