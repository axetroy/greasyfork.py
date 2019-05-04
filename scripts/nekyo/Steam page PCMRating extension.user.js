// ==UserScript==
// @name         Steam page PCMRating extension
// @namespace    http://your.homepage/
// @require      http://code.jquery.com/jquery-latest.js
// @version      0.16
// @description  Gets the PCMRating and displays it on the website
// @author       Nekyo
// @match        http://store.steampowered.com/app/*
// @match        http://store.steampowered.com/app/*/
// @match        http://store.steampowered.com/app/*/*
// @grant        none
// ==/UserScript==
$(document).ready(function(){
    var url = window.location.toString();
    var regex = new RegExp(".*\/([0-9]{1,})");
    var id = url.match(regex)[1];
  
    var pcmrurl = "http://www.pcmrating.com/games/show/" + id;
    $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent(pcmrurl) + '&callback=?', function(data){
        console.log("success?");
        var _html= jQuery(data.contents);
        //do some thing with html eg: _html.find('div').addClass('red')
        var section = _html.find('.col-xs-12 > ul').first().html();
        var ranking = "http://www.pcmrating.com" + _html.find('.ranking > img').first().attr("src");
        if(typeof section != 'undefined'){
            $('.game_description_column').prepend("<div id='pcmr' class='steam_curators_block block' style='min-height:190px;margin-top:-20px;'><div class='block_header'><div class='right'></div><h2>PCMRatings</h2></div><div class='steam_curators_grid three_wide'><img src='"+ranking+"' style='max-height:150px;margin-left:10px;'/></div><div class='steam_curator_selected'>"+section+"</div></div>");
            $('#pcmr .steam_curator_selected li').css("list-style","none").css("margin-left","15px").css("width","450px").css("height","16px").css("white-space","nowrap").css("overflow","hidden").css("text-overflow","ellipsis");
            $('#pcmr .steam_curator_selected li label').css("font-weight","bold");
        }else{
             $('.game_description_column').prepend("<div id='pcmr' class='steam_curators_block block' style='height:55px;margin-top:-20px;'><div class='block_header'><div class='right'></div><h2>PCMRatings</h2></div><div class='steam_curator_selected'>No reviews yet, wanna write one?</div></div></div></div>");
        }
        $("#pcmr").mouseenter(function() {
            $(this).css("background", "rgba(255,255,255,0.1)").css("cursor","pointer");
        }).mouseleave(function() {
            $(this).css("background", "rgba(255,255,255,0)").css("cursor","default");
        }).click(function(){
            window.location = pcmrurl;  
        });
    });
});
