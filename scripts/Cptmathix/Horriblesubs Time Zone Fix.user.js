// ==UserScript==
// @name         Horriblesubs Time Zone Fix
// @version      2.0.10
// @description  Release time for your timezone
// @author       Cpt_Mathix & Hoshiburst
// @match        *://horriblesubs.info/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.23/moment-timezone-with-data-2012-2022.min.js
// @license      GPL-2.0-or-later
// @grant        none
// @noframes
// @namespace https://greasyfork.org/users/16080
// ==/UserScript==

// Thank you Hoshiburst (https://greasyfork.org/en/forum/profile/Hoshiburst) for helping me improve this script

(function() {
    Number.prototype.mod = function(n) {
        return (( this % n) + n) % n;
    };

    // Current day in LA and locally
    var local_day = parseInt(moment().local().format('d'));

    // Difference between local time and LA time
    var difference = parseInt(moment().local().format('ZZ')) - parseInt(moment().tz('America/Los_Angeles').format('ZZ'));

    if (window.location.href.indexOf('release-schedule') > -1) {
        // HS full release schedule
        var main = document.getElementById('main');
        var daily_schedule = main.getElementsByTagName('table');

        for (var i = 0; i < 7; i++) {
            // i = 0 corresponds to the table for Monday so we add 1 and mod 7 for convertTime
            convertFullReleaseScheduleTime(daily_schedule[i], (i + 1).mod(7));
        }

        hideClockFullSchedule();
    } else if (difference !== 0) {
        // HS today schedule
        var schedule_table = document.getElementsByClassName("schedule-table")[0];
        if (schedule_table) {
            getFullSchedule(schedule_table, difference);
            hideClockTodaySchedule();
        }
    }

    function hideClockTodaySchedule(todaySchedule) {
        var h2_elements = document.getElementsByTagName("h2");
        for (var i = 0; i < h2_elements.length; i++) {
            var h2 = h2_elements[i];
            if (h2.textContent.indexOf("Current Time") > -1) {
                h2.style.display = 'none';
                var nextSibling = h2.nextElementSibling;
                while (nextSibling && nextSibling.tagName !== "IFRAME") {
                    nextSibling = nextSibling.nextElementSibling;
                }
                nextSibling.style.display = 'none';
            }
        }
    }

    function hideClockFullSchedule() {
        var content = document.querySelector('.entry-content');

        var iframes = content.getElementsByTagName('iframe');
        if (iframes.length === 1) {
            var clock = iframes[0];
            clock.parentNode.style.display = 'none';
            clock.parentNode.previousElementSibling.style.display = 'none';
        }

        var timezoneLink = content.querySelector('ul > li > a');
        if (timezoneLink) {
            timezoneLink.textContent = 'your own timezone';
            timezoneLink.href = 'https://greasyfork.org/en/scripts/12650-horriblesubs-time-zone-fix';
        }
    }

    function getFullSchedule(todaySchedule, difference) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var container = document.implementation.createHTMLDocument().documentElement;
                container.innerHTML = xmlHttp.responseText;
                createTodaysSchedule(container, todaySchedule, difference);
            }
        };
        xmlHttp.open('GET', 'https://horriblesubs.info/release-schedule/', true); // true for asynchronous
        xmlHttp.send(null);
    }

    function createTodaysSchedule(schedule, todaySchedule, difference) {
        schedule = schedule.querySelector('.entry-content');

        // Eg. If it's Monday in Sydney, difference is +18 so we want to
        // fill the sidebar with shows released on Sunday and Monday in NA
        var first_day, second_day;
        if (difference < 0) {
            first_day = local_day;
            second_day = (local_day + 1).mod(7);
        } else if (difference > 0) {
            first_day = (local_day - 1).mod(7);
            second_day = local_day;
        }

        var scheduleWeekdays = schedule.getElementsByClassName('weekday');
        var firstDaySchedule = scheduleWeekdays[(first_day - 1).mod(7)].nextElementSibling.firstElementChild.innerHTML;
        firstDaySchedule = firstDaySchedule.replace(/schedule-page-item/g, 'firstday').replace(/schedule-page-show/g, 'schedule-widget-show').replace(/schedule-time/g, 'schedule-widget-time');
        var secondDaySchedule = scheduleWeekdays[(second_day - 1).mod(7)].nextElementSibling.firstElementChild.innerHTML;
        secondDaySchedule = secondDaySchedule.replace(/schedule-page-item/g, 'secondday').replace(/schedule-page-show/g, 'schedule-widget-show').replace(/schedule-time/g, 'schedule-widget-time');

        var todayScheduleTable = todaySchedule.querySelector('table > tbody');
        todayScheduleTable.innerHTML = firstDaySchedule + secondDaySchedule;

        for (var i = 0; i < todayScheduleTable.children.length; i++) {
            var anime = todayScheduleTable.children[i];
            if (anime.classList.contains('firstday')) {
                convertTodaysScheduleTime(anime, first_day);
            } else {
                convertTodaysScheduleTime(anime, second_day);
            }
        }

        removeProtectedEmail(todayScheduleTable);
    }

    function convertTodaysScheduleTime(anime, day) {
        anime.innerHTML = anime.innerHTML.replace(/\d\d:\d\d/g, function(s) {
            var selected_time = moment.tz(day + ' ' + s, 'd HH:mm','America/Los_Angeles');
            var converted_time = selected_time.local();
            if (parseInt(converted_time.format('d')) !== local_day) {
                anime.style.display = 'none';
                return null;
            } else {
                return converted_time.format('HH:mm');
            }
        });
    }

    function convertFullReleaseScheduleTime(schedule, day) {
        schedule.innerHTML = schedule.innerHTML.replace(/\d\d:\d\d/g, function(s) {
            var selected_time = moment.tz(day + ' ' + s, 'd HH:mm','America/Los_Angeles');
            var converted_time = selected_time.local();
            return converted_time.format('ddd HH:mm');
        });
    }

    function removeProtectedEmail(element) {
        var protected_emails = element.getElementsByClassName("__cf_email__");
        for (var j = protected_emails.length - 1; j >= 0; j--) {
            var email = protected_emails[j];
            email.outerHTML = cfDecodeEmail(email.dataset.cfemail);
        }
    }

    // https://usamaejaz.com/cloudflare-email-decoding/
    function cfDecodeEmail(encodedString) {
        var email = "", r = parseInt(encodedString.substr(0, 2), 16), n, i;
        for (n = 2; encodedString.length - n; n += 2){
            i = parseInt(encodedString.substr(n, 2), 16) ^ r;
            email += String.fromCharCode(i);
        }
        return email;
    }
})();