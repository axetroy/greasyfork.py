// ==UserScript==
// @name         Watch2Gether Extender
// @namespace    http://www.devforce.de/
// @version      0.3
// @description  Collaps chat and widens Video. Removes unnecessary features and adds more functional ones.
// @author       Fonso
// @match        https://www.watch2gether.com/rooms/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @require https://greasyfork.org/scripts/45343-configuration-dialog/code/Configuration%20Dialog.js?version=272542
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// ==/UserScript==

var isVisible = true;

function createInput(){
    if(true == GM_getValue('hide_chromecast')){
        $('.cast-icon').remove();
    }

    $('#w2g-video').css("pointer-events", "none");

    $('#player-video').click(function(e){
        $('#player-ctrl-playbutton').find('i').click();
    });

    $('#player-settings-section').append(`
    <a id="chatcollapsebutton" class="item">
        <i class="fa fa-arrows-h"></i>
    </a>
    `);

    $('#player-settings-section').append(`
    <a id="videoexpandbutton" class="item">
        <i class="fa fa-arrows"></i>
    </a>
    `);

    var totalWidth = $("#userbar-chat").css("width") + $("#player-video").css("width");
    $("#chatcollapsebutton").on("click", function() {
        if(isVisible){
            $(".mobile-tab-chat").hide();
            $('#player-column').attr('style', 'width: 100% !important');
            isVisible = false;
        }
        else{
            $(".mobile-tab-chat").show();
            $('#player-column').attr('style', 'width: 62.5% !important');
            isVisible = true;
        }
    });

    $("#videoexpandbutton").click(function() {
        $('[class="maximize icon"]')[0].click();
    });

}

$(function(){
    $('head').append('<link id="font-awesome" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">');

    createInput();

    configurationWindow.create({
        'title': 'Chat Collapser Config',
        'id': 'chat_collapser_config',

        "font": {
            "size": "18px"
        },

        'content':
        [
            {
                "id": "hide_chromecast",
                "label": "Hide chromecast symbol:",
                "type": "checkbox",
                "default": "false"
            }
        ]
    });

    GM_registerMenuCommand("Chat Collapser Config", function() { configurationWindow.open(); });
});