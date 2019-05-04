// ==UserScript==
// @name         Turkdigo HIT Hunter
// @author       Turkdigo
// @namespace    Turkdigo
// @description  Hunt down HITs that requesters may have posted while you weren't looking.
// @match	 https://www.mturk.com/hithunter
// @require      http://code.jquery.com/jquery-latest.min.js
// @require	 http://cdn.jsdelivr.net/jquery.timing/0.1/jquery-timing.min.js
// @version      0.1
// @grant        GM_log
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// ==/UserScript==

$("tbody:eq(4)").hide();
$("table:eq(4)").prepend('<tbody><tr><td align="center"><br><div id="header" style="font-size: 200%; font-weight: bold;">Turkdigo -- HIT Hunter 0.1</div></td></tr><br></tbody>');
$("div#header").parent().append('<tr><td width="600" align="justify" id="content"><br><div id="filler"></div><div id="talking"><b>Description: </b>This script is designed to harvest HITs from requesters that you may have missed while away from the computer or watching Star Trek. Copy your list of requesters from HIT Monitor into the script (or follow the format already there) and save it. Click the button below and this page will cycle through the <b>first page</b> of <b>search terms</b> from your list one time checking for HITs. They will appear in a new list below this description as clickable links.<br><br><b>Note:</b> It is advised that you pause HIT Monitor, Turkmaster, Hitscraper, or anything else that relies on page refreshing for updates. This will only take a few moments depending on the length of your requester list!<br><br>Results are based on SEARCH results, not requester IDs (any search with "agent" would appear for "agent agent").</div></td></tr><br>');
$("table:eq(4)").append('<br><center><button id="hunt">Release the Hounds!</button></center>');

var target = [
// Paste your HIT Monitor list below, or make changes to the existing list.
    
    "Grocery_ROI",
    "A17KLBWRZ7M97G",
    "ProductRnR",
    "Project Endor",
    "Sergey Schmidt",
    "Set Master",
    "Two Lakes",
    "Zing"

];// ^ Make sure your last item does not have a comma!

$("button#hunt").click(function() {
    var count = target.length;
    var current = 0;
   	$("div#talking").fadeOut(1000);
    $("#content").prepend('<br><div id="loading" style="font-size: 100%;" align="center">Loading, please wait for notification before clicking.</div><br>');
    $(this).fadeOut(1000);
    
    $(target).each($).wait(500, function (index) {
        var str = target[index];
		str = str.replace(/\s+/g, '+').toLowerCase();
          
        $("<div>").load("https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&searchWords="+str+"&minReward=0.00&x=0&y=0 tbody", function(){
    		$("#filler").append("<b>"+target[index]+"</b><br><br>");
            $("#filler").append($(this).find("tbody a[href^='/mturk/preview']").parent().parent().parent().parent());
            $("#filler").append("<br>");
            current++;
            
            if (current === count){
                var hits = $("a[href^='/mturk/preview']").length;
                $("a[href^='/mturk/preview']:even").parent().parent().parent().parent().css("background-color", "#e0e0e0");
                $("a[href^='/mturk/preview']:odd").parent().parent().parent().parent().css("background-color", "#f5f5f5");
                $("#loading").replaceWith('<div style="font-size: 100%;" align="center">Done! Found '+hits+' HITs from your list of '+count+' requesters!</div><br>');
            } 
        });
      
    });
});