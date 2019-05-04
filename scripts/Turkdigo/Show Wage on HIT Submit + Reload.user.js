// ==UserScript==
// @name         Show Wage on HIT Submit + Reload
// @author       Turkdigo
// @version      1
// @description  Personalized wage script; I take no credit for the original script.
// @icon         http://www.mturkgrind.com/data/avatars/l/5/5824.jpg
// @match        *www.mturk.com/mturk*
// @exclude      *mturk.com/mturk/dashboard*
// @exclude	 *mturk.com/mturk/findhits?match=true?hit_scraper*
// @require      http://code.jquery.com/jquery-latest.min.js
// @namespace https://greasyfork.org/users/9008
// ==/UserScript==

$(document).ready(function () {
    if ($("img[src='/media/return_hit.gif']").length){
        var startTime;

        startTime = new Date();

        $(window).bind('beforeunload', function(){
            var seconds = (new Date() - startTime) / 1000;
            var reward = $(".capsule_field_text .reward").text().replace("$", "");
            var wage = reward * 3600 / (seconds+2); // change 2 to whatever your average refresh rate is

            $("body").append("<div id='wage-wrapper'><div id='wage'>" + '$' + wage.toFixed(2) + "/h</div></div>");

            $("#wage-wrapper").css('position','fixed');
            $("#wage-wrapper").css('width','100%');
            $("#wage-wrapper").css('height','100%');
            $("#wage-wrapper").css('top','0');
            $("#wage-wrapper").css('left','0');
            $("#wage-wrapper").css('background-color','rgba(0,0,0,0.8)');

            $("#wage").css('position','absolute');
            $("#wage").css('top','50%');
            $("#wage").css('font-size','50px');
            $("#wage").css('color','white');
            $("#wage").css('width','100%');
            $("#wage").css('text-align','center');
        });
    }
});