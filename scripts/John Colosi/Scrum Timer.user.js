// ==UserScript==
// @name        Scrum Timer
// @namespace   http://johncolosi.com
// @include     https://jira.vrsn.com/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.13/clipboard.min.js
// @version     3.11
// @description Add a clock and timer to Jira to keep scrums short
// ==/UserScript==

// Constants
var MillisPerSecond = 1000;
var MillisPerMinute = 60 * MillisPerSecond;
var MillisPerHour = 60 * MillisPerMinute;
var MillisPerHalfHour = 30 * MillisPerMinute;
var Clocks = ["🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛"];


// Variables
var jxInterval;
var jxRunning = false;
var jxLastClickTime = null;
var jxThisClickTime = null;
var jxBankedTime = null;
var jxTargetTime = null;
var clipboard = new Clipboard('.jxBtnCopy');
var isKanban = false;


// Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);

// Initialize on "load"... lol
$(document).ready(function() {

    /*
     * Add a countdown clock with time before the end of the meeting
     */
    $('#ghx-controls-work').prepend("<dl><div id='jxClock'></div></dl>");
    clock_init();


    /*
     * Update the planning page with clock, timer, create, and boards
     */
    if ( $('#ghx-controls-plan').children().length == 0 ) {

        /*
         * Add the Scrum Timer widget
         */
        $('#ghx-controls-work').prepend("<a id='jxTimer' class='aui-button aui-button-primary aui-style jxBtnOff jxBtnCopy'>Start</a>");
        document.getElementById("jxTimer").addEventListener (
            "click", timer_click, false
        );

        /*
         * Move the create button onto the collapsable panel
         */
        var jxCreateButton = $('#create-menu').children();
        $('#ghx-controls-work').prepend(jxCreateButton);

        /*
         * Move the boards button onto the collapsable panel
         */
        var jxBoardsMenu = $('#greenhopper_menu').parent().children();
        $('#ghx-controls-work').prepend(jxBoardsMenu);
    }
});

/*
  // Removing days-in-column dots for Kanban boards
  // There is a check box in the config board page that turns this off, so don't need this hack to remove them from kanban boards
  setTimeout(removeKanbanDots, 1000);
  function removeKanbanDots() {
    isKanban = $(".subnavigator-title").attr("title").toUpperCase() === "KANBAN BOARD";
    if (isKanban) {
        $(".ghx-days").addClass("jxBlank");
    }
    setTimeout(removeKanbanDots, 1000);
  }
*/

/**
 * Clock features - show a count-down clock counting to the half-hour
 */
function clock_init() {
    setInterval(clock_show, 1000);
    var now = new Date().getTime();
    var over = now % MillisPerHalfHour;
    var start = now - over;
    jxTargetTime = start + MillisPerHalfHour;
    var delay = 0 - Math.trunc(over / 1000);
    $('#jxClock').css('animation-delay',delay+'s');
    clock_show();
}

function clock_show() {
    var text;
    var time = new Date().getTime();
    var secondsLeft = Math.trunc((jxTargetTime - time)/1000);
    if (secondsLeft < 0) text = "End";
    else {
        var minutes = Math.trunc(secondsLeft / 60);
        var seconds = pad(secondsLeft % 60);
        text = minutes+":"+seconds;
    }
    $('#jxClock').text(text);
}


/**
 * Timer features - keep a count-up timer to capture how long the actual scrum takes, click to click
 */
function timer_click() {
    jxThisClickTime = new Date().getTime();

    // RESET
    if (jxThisClickTime-jxLastClickTime < 250) {
        jxBankedTime=0;
        timer_clear();
        $('#jxTimer').text('Start');
    }

    // START
    else if (!jxRunning) {
        jxInterval = setInterval(timer_spin, 83);
        $('#jxTimer').addClass('jxBtnOn');
        $('#jxTimer').removeClass('jxBtnOff');
        jxRunning = true;
    }

    // STOP
    else {
        jxBankedTime += jxThisClickTime - jxLastClickTime;
        timer_clear();
        timer_show();
    }

    jxLastClickTime = jxThisClickTime;
}

function timer_clear() {
    clearInterval(jxInterval);
    $('#jxTimer').addClass('jxBtnOff');
    $('#jxTimer').removeClass('jxBtnOn');
    jxRunning = false;
}

function timer_spin() {
    var index = Math.trunc((new Date().getTime() % 1000)/83);
    $('#jxTimer').html("&nbsp;"+Clocks[index]);
}

function timer_show() {
    var delta = jxBankedTime;
    delta %= MillisPerHour;

    var jxMin = Math.floor(delta/MillisPerMinute);
    delta %= MillisPerMinute;
    var jxSec = pad(Math.floor(delta/MillisPerSecond));
    delta %= MillisPerSecond;

    $('#jxTimer').text(jxMin+":"+jxSec);

    var d = new Date();
    var date = pad(d.getMonth()+1)+"/"+pad(d.getDate());
    var time = pad(jxMin)+":"+jxSec;
    $('#jxTimer').attr('data-clipboard-text',date+" - "+time);
}


/**
 * Utility features
 */
function pad(x) {
    return (x<10) ? '0'+x : x;
}