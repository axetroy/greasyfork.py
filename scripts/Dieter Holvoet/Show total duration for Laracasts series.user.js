// ==UserScript==
// @name         Show total duration for Laracasts series
// @namespace    http://dieterholvoet.com
// @version      1.3
// @description  Shows a sum of the durations of all episodes of a Laracasts series
// @author       Dieter Holvoet
// @match        laracasts.com/series/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require      https://bowercdn.net/c/jquery-observe-2.0.2/jquery-observe.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if($(".condensed-episode-list").length > 0) {
        episode_page();

    } else if($(".episode-list").length > 0) {
        series_page();
    }

    /* SERIES PAGE */
    function series_page() {
        // Append container
        var $container = $('<div id="durations" class="level-right"></div>');
        $container.append('<div class="level-item"><span><strong id="time-total"></strong> Total</span></div>');
        $container.appendTo(".series-banner-meta .level-right");

        // Run once
        series_page_run();

        // Attach observer
        $(".episode-list .episode-list-item").observe({ attributes: true, attributeFilter: ['class'] }, series_page_run);
    }

    function series_page_run() {
        var seconds_total = 0,
            seconds_left = 0,
            is_running = $(".episode-list-item.is-complete").length > 0;

        $(".episode-list > .episode-list-item").each(function() {
            // Calculate
            var runtime = $(this).find(".running-time").text().replace("Run Time ", ""),
                seconds = unformatSeconds(runtime);

            // Add total
            seconds_total += seconds;

            // Add remaining
            if(is_running && !$(this).is(".is-complete"))
                seconds_left += seconds;
        });

        // Append
        if(!$("#time-remaining").length && is_running)
            $("#durations").append('<div class="level-item"><span><strong id="time-remaining">'+formatSeconds(seconds_left)+'</strong> Remaining</span></div>');

        $("#time-total").text(formatSeconds(seconds_total));
        $("#time-remaining").text(formatSeconds(seconds_left));
    }

    /* EPISODE PAGE */
    function episode_page() {
        // Append container
        var $container = $('<div id="durations" class="level-right" style="flex-direction: column; align-items: flex-end;"></div>');
        $container.append('<div class="level-item" style="margin: 0"><span><strong id="time-total"></strong> Total</span></div>');
        $container.append('<div class="level-item"><span><strong id="time-remaining"></strong> Remaining</span></div>');
        $container.insertAfter(".sidebar-section > .heading:first");

        // Run once
        episode_page_run();

        // Attach observer
        $(".vjs-remaining-time-display").observe("childlist", episode_page_run);
    }

    function episode_page_run() {
        var seconds_total = 0,
            seconds_left = 0;

        $(".condensed-episode-list > .condensed-episode-list-item").each(function() {
            // Calculate
            var runtime = $(this).find(".length").text(),
                seconds = unformatSeconds(runtime);

            // Add total
            seconds_total += seconds;

            // Add remaining
            if(!$(this).is(".is-complete") && !$(this).is(".is-active"))
                seconds_left += seconds;
        });

        // Add remaining seconds of active video
        var active_passed = unformatSeconds($(".vjs-progress-holder").attr("aria-valuetext")),
            active_total = unformatSeconds($(".condensed-episode-list-item.is-active .length").text().trim());

        seconds_left += (active_total - active_passed);

        // Append
        $("#time-total").text(formatSeconds(seconds_total));
        $("#time-remaining").text(formatSeconds(seconds_left));
    }

    /* HELPER */
    function unformatSeconds(str) {
        var splitted = str.split(":"),
            seconds = 0;

        seconds += parseInt(splitted[0]) * 60;
        seconds += parseInt(splitted[1]);

        return seconds;
    }

    function formatSeconds(total_seconds) {
        var str = '',
            t = {
                hours: parseInt(Math.floor(total_seconds / 3600)),
                minutes: parseInt(Math.floor((total_seconds % 3600) / 60)),
                seconds: parseInt(Math.floor(total_seconds % 60))
            };

        // Add zeros
        if(t.hours < 10)
            t.hours = '0'+t.hours;

        if(t.minutes < 10)
            t.minutes = '0'+t.minutes;

        if(t.seconds < 10)
            t.seconds = '0'+t.seconds;

        // Create string
        if(t.hours > 0)
            str += t.hours+':';

        str += t.minutes;

        if(t.seconds > 0)
            str += ':'+t.seconds;

        return str;
    }
})();