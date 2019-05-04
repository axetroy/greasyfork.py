// ==UserScript==
// @name         BDO Easier quest matching - The buttoned version
// @version      0.1
// @description  You might find it useless, or not. ;^}
// @author       Nekyo
// @match        http://black.inven.co.kr/dataninfo/quest/
// @match        http://black.inven.co.kr/dataninfo/quest/?*
// @grant        none
// @namespace https://greasyfork.org/users/9636
// ==/UserScript==
$(document).ready(function(){
    $('<div id="mySearch"></div>').insertAfter(".blackDbQuestSearch");
    $('<input id="showSearchButton" type="button" value="Show the icon-based search" style="width:700px;margin-left:20px;margin-top:10px;padding:5px;"/>').insertAfter(".blackDbQuestSearch");
    $('#showSearchButton').click(function(){
        $("#mySearch").css("width","715px").css("margin-left","20px").css("margin-top","10px").append("<h1 style=\"font-size:18px;color:black;font-weight:bold;\">Click on the quest icon</h1><br/><br/>");
        $("img.icon").each(function(){
            if($('#mySearch > img[src=\"'+$(this).attr("src")+'"]').length == 0){
                if(!$(this).parent().parent().hasClass("reward")){
                    $("#mySearch").append("<img class=\"searchIcon\" src=\"" + $(this).attr("src") + "\" />");
                }
            }
        });
        $(".searchIcon").css("margin","1px").css("border","double 3px black").css("width","42px").css("height","42px");
        $(".searchIcon").click(function(){
            var imgUrl = $(this).attr("src");
            $("td:first-child > a > img.icon[src=\""+ imgUrl+"\"]").parent().parent().parent().show();
            $("td:first-child > a > img.icon[src!=\""+ imgUrl+"\"]").parent().parent().parent().hide();
        });
        $(this).remove();
    });
});
