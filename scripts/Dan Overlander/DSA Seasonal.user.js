// ==UserScript==
// @name         DSA Seasonal
// @locale       English (en)
// @namespace    COMDSPDSA
// @version      2.1
// @description  Applies seasonal theme to DSA
// @author       SD / Dan Overlander
// @include      http://sales.dell.com/*
// @include	     *olqa.preol.dell.com*
// @include      *localhost.dell.com*
// @include	     *http://localhost:36865*
// @require      https://greasyfork.org/scripts/23115-tampermonkey-support-library/code/Tampermonkey%20Support%20Library.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js
// @grant        none
// ==/UserScript==

// Since v02.00: adapting to localhost.dell.com...
// Since v01.87: Fixed remaining images by moving them to publicly-accessible, reliable host. Removed Spring Forward because it was too close in look to Mother's Day and too close in time to St Pats
// Since v01.86: Adjusting timing of Groundhog Day. Moved source of Valentines images, PresidentsDay images, StPats. Tweaked Days.
// Since v01.80: Adjusted timing of Daylight Saving Time Ends. Adding scrolling and/or animating backgrounds. Added Groundhog Day.
// Since v01.70: Tweaks background on swagger pages
// Since v01.60: Daylight Saving Time Ends Updated
// Since v01.50: Tweaked Halloween image & colors
// Since v01.40: Changed Senior background.  Not final.  Added diff to console log when showing a theme. Halloween adjusted.  Gonna have to figure out how to more accurately grab holidays, someday.
// Since v01.30: Converted date format to ISO, to avoid future failure
// Since v01.20: Added Senior Citizens Day
// Since v01.10: Updated 4th July banner; it was being "checked" :)
// Since v01.00: Father's Day color tweak.  Added Independence Day. TWEAKED DATE CALCULATION!
// Since v0.961: Added Father's Day, Daylight Savings Time Ends, Halloween - thus completes about a 1-year cycle
// Since v0.96: Tweaked link colors of Tax Day
// Since v0.95: Added Tax/Theft Day
// Since v0.94: Annoying Easter header image swapped
// Since v0.93: Added St. Patrick's Day
// Since v0.92: TM library link changed. Tweak Spring Forward. Add option to invert; will need work later
// Since v0.91: Tweaked Spring Forward's colors
// Since v0.9: Tweaked President's Day colors
// Since v0.8: Disabled show-off theme control keyboard keys
// Since v0.7: Fixed MLK, added Presidents
// Since v0.6: Added Martin Luther King Day and Valentine's Day
// Since v0.5: Renamed. Tweaked Thanksgiving occurence. Added logging when no holiday is selected.
// Since v0.4: white opacity.8 background, different Easter image
// Since v0.3: Hacky keyboard toggling between 4 themes
// Since v0.2: Temporary full-web-accessible background images
// Since v0.1: gets next holiday and applies theme within X days of its date

(function() {
    'use strict';

    //var monthAbbr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    //var ordinals = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth', 'Twentieth', 'Twenty-First', 'Twenty-Second', 'Twenty-Third', 'Twenty-Fourth', 'Twenty-Fifth', 'Twenty-Sixth', 'Twenty-Seventh', 'Twenty-Eighth', 'Twenty-Ninth', 'Thirtieth', 'Thirty-First'];

    // I think, I shouldn't use a 6 in the 3rd position, ie "12,1,6" ... but WHY???
    var areKeysAdded = areKeysAdded || false,
        holidays = { // keys are formatted as month,week,day, zero-based
            "0,2,1": "Martin Luther King Day",
            "1,0,0": "Groundhog Day",
            "1,1,6": "Valentine's Day",
            "1,2,1": "President's Day",
            "2,2,5": "St. Patrick's Day",
            "3,1,0": "Easter", // approximate
            "3,2,2": "Tax Day",
            "4,2,0": "Mother's Day",
            "4,-1,1": "Memorial Day",
            "5,2,0": "Father's Day",
            "6,0,3": "Independence Day",
            "7,3,2": "Senior Citizens Day",
            "8,0,1": "Labor Day",
            "9,4,2": "Halloween", // untested, approximate
            "10,0,1": "Daylight Savings Time Ends",
            "10,4,1": "Thanksgiving",
            "11,1,5": "midwinter",
            "11,4,1": "Christmas" // approximate
        };
    function isoFormat(year, month, date) {
        if (year == null || month == null || date == null) {
            return null;
        }

        var mill;
        year = year.toString();
        month = month.toString();
        date = date.toString();
        if (year.length === 2) {
            mill = new Date().getFullYear().toString().substr(0,2);
            year = mill + year;
        }
        month = ('0' + month);
        month = month.substr(month.length-2, 2);

        date = ('0' + date);
        date = date.substr(date.length-2, 2);
        return year + '-' + month + '-' + date;
    }
    function getHoliday(month, week, day) {
        return holidays[month + "," + week + "," + day];
    }
    function getNextHoliday() {
        var myYear = moment().year(),
            oneYearFromNow = moment().year() + 1,
            myMonth = moment().month(),
            myWeek,
            myDate = moment().date()-1,
            myDayOfWeek,
            startDate = moment(isoFormat(myYear, myMonth+1, myDate+1)),
            scanDate = startDate,
            daysInMonth = (moment(scanDate).endOf('month').date())-1,
            holiday;

        while (holiday === undefined && myDate < 33 && myYear < oneYearFromNow) {
            scanDate = moment(isoFormat(myYear, myMonth+1, myDate+1));
            myWeek = Math.ceil(moment(scanDate).date() / 7)-1;
            myDayOfWeek = moment(scanDate).day();
            holiday = getHoliday(myMonth, myWeek, myDayOfWeek);
            //tm.log(daysInMonth + ', ' + myMonth + ' '  + myWeek + ' ' + myDayOfWeek + ' = ' + scanDate + ' (found holiday: ' + holiday + ')');

            myDate++;
            if (myDate > daysInMonth) {
                myDate = 0;
                myMonth++;
                if (myMonth > 11) {
                    myMonth = 0;
                    myYear++;
                }
                daysInMonth = (moment(scanDate).endOf('month').date())-1;
            }
        }

        var holidayObj = {
            name: holiday,
            diff: -(moment(startDate).diff(scanDate, 'days'))
        };

        return holidayObj;
    }

    function applyHoliday(holidayName) {
        switch (holidayName) {
            case 'Martin Luther King Day' :
                pageImage = 'http://www.dorkforce.com/dsa/themes/mlk-background.jpg';
                headerImage = 'http://dorkforce.com/dsa/themes/mlk-banner.png';
                buttonColor = 'CadetBlue';
                backgroundColor = 'cornsilk';
                break;
            case 'Groundhog Day' :
                pageImage = 'http://www.dorkforce.com/dsa/themes/groundhog-day-background.jpg';
                headerImage = 'http://www.dorkforce.com/dsa/themes/groundhog-day-banner.png';
                buttonColor = 'CadetBlue';
                backgroundColor = 'cornsilk';
                break;
            case "Valentine's Day" :
                pageImage = 'http://www.dorkforce.com/dsa/themes/valentines-background.jpg';
                page2Image = 'http://www.dorkforce.com/dsa/themes/valentines-overlay.png';
                headerImage = 'http://www.dorkforce.com/dsa/themes/valentines-banner.jpg';
                buttonColor = 'HotPink';
                backgroundColor = 'LightPink';
                scrollTB = true;
                break;
            case "President's Day" :
                pageImage = 'http://www.dorkforce.com/dsa/themes/presidentsday-background.png';
                headerImage = 'http://www.dorkforce.com/dsa/themes/presidentsday-banner.jpg';
                buttonColor = '#005CB7';
                buttonTextColor = '#ccdef0';
                dropdownColor = '#7faddb';
                backgroundColor = 'LightSkyBlue';
                break;
            case "St. Patrick's Day" :
                pageImage = 'http://www.dorkforce.com/dsa/themes/stpats-background.jpg';
                page2Image = 'http://www.dorkforce.com/dsa/themes/stpats-background2.png';
                headerImage = 'http://www.dorkforce.com/dsa/themes/stpats-banner.jpg';
                buttonColor = '#144314';
                backgroundColor = 'darkgreen';
                //dropdownColor = '#7faddb';
                tm.addGlobalStyle('#page2Image	{background-size:225% !important;}');
                break;
            case 'Easter' :
                pageImage = 'http://www.dorkforce.com/dsa/themes/easter-background.jpg';
                headerImage = 'http://www.dorkforce.com/dsa/themes/easter-banner.jpg';
                buttonColor = 'DeepPink';
                backgroundColor = '#c0fff4';
                break;
            case 'Tax Day' :
                pageImage = 'http://www.dorkforce.com/dsa/themes/tax-background.jpg';
                headerImage = 'http://www.dorkforce.com/dsa/themes/tax-banner.png';
                backgroundColor = 'darkolivegreen';
                dropdownColor = 'aliceblue';
                break;
            case "Mother's Day" :
                pageImage = 'http://www.dorkforce.com/dsa/themes/mother-background.png';
                headerImage = 'http://www.dorkforce.com/dsa/themes/mother-banner.png';
                buttonColor = 'crimson';
                baseLink = 'crimson';
                backgroundColor = '#c0fff4';
                dropdownColor = 'lightpink';
                break;
            case 'Christmas' :
                pageImage = 'http://www.dorkforce.com/dsa/themes/christmas-background.png';
                headerImage = 'http://www.dorkforce.com/dsa/themes/christmas-banner.jpg';
                buttonColor = 'azure';
                backgroundColor = 'silver';
                baseLink = 'cadetblue';
                dropdownColor = 'lightsteelblue';
                scrollTB = true;
                break;
            case 'Thanksgiving' :
                pageImage = 'http://www.dorkforce.com/dsa/themes/fall-background.png';
                page2Image = 'http://www.dorkforce.com/dsa/themes/fall-background2.png';
                headerImage = 'http://www.dorkforce.com/dsa/themes/fall-banner.jpg';
                buttonColor = 'orange';
                backgroundColor = 'lightgoldenrodyellow';
                scrollRL = true;
                tm.addGlobalStyle('#page2Image	{background-size:800% !important;}');
                break;
            case 'midwinter' :
                pageImage = 'http://www.dorkforce.com/dsa/themes/midwinter-background.gif';
                headerImage = 'http://www.dorkforce.com/dsa/themes/midwinter-banner.gif';
                baseLink = 'cadetblue';
                buttonColor = 'cadetblue';
                backgroundColor = 'silver';
                dropdownTitle = 'white';
                dropdownColor = 'lavendar';
                appTitleColor = 'white';
                break;
            case "Father's Day" :
                pageImage = 'http://www.dorkforce.com/dsa/themes/fathers-background.jpg';
                headerImage = 'http://www.dorkforce.com/dsa/themes/fathers-banner.jpg';
                buttonColor = '#012255';
                backgroundColor = '#9FD7E4';
                dropdownTitle = 'white';
                dropdownColor = '#7faddb';
                break;
            case "Independence Day" :
                pageImage = 'http://www.dorkforce.com/dsa/themes/id-background.jpg';
                headerImage = 'http://www.dorkforce.com/dsa/themes/id-banner.png';
                backgroundColor = 'darkblue';
                dropdownColor = 'aliceblue';
                appTitleColor = 'white';
                break;
            case "Senior Citizens Day" :
                pageImage = 'http://www.dorkforce.com/dsa/themes/senior-background.jpg';
                headerImage = 'http://www.dorkforce.com/dsa/themes/senior-banner.jpg';
                buttonColor = '#012255';
                // buttonTextColor
                backgroundColor = '#B28EC7';
                dropdownTitle = 'white';
                dropdownColor = '#C09DC7';
                // invertedColor
                // dropShadowText
                appTitleColor = 'white';
                break;
            case "Labor Day" :
                pageImage = 'http://www.dorkforce.com/dsa/themes/labor-background.jpg';
                headerImage = 'http://www.dorkforce.com/dsa/themes/labor-banner.jpg';
                buttonColor = '#012255';
                // buttonTextColor
                backgroundColor = '#9FD7E4';
                dropdownTitle = 'white';
                dropdownColor = '#7faddb';
                // invertedColor
                // dropShadowText
                // appTitleColor
                break;
            case "Halloween" :
                pageImage = 'http://www.dorkforce.com/dsa/themes/halloween-background.jpg';
                headerImage = 'http://www.dorkforce.com/dsa/themes/halloween-banner.png';
                baseLink = "royalblue";
                buttonColor = 'white';
                buttonTextColor = 'black';
                backgroundColor = '#120E4C';
                dropdownTitle = 'white';
                dropdownColor = '#7875A7';
                appTitleColor = 'white';
                break;
            case "Daylight Savings Time Ends" :
                pageImage = 'http://www.dorkforce.com/dsa/themes/fallback-background.jpg';
                headerImage = 'http://www.dorkforce.com/dsa/themes/fallback-banner.jpg';
                buttonColor = '#4D1E00';
                backgroundColor = '#FF7619';
                dropdownTitle = 'white';
                //dropdownColor = '#FFC898';
                break;
            default:
                break;
        }
        tm.addGlobalStyle('.content-view {background-color: inherit;}');
        tm.addGlobalStyle('.content-area, #swagger-ui-container, .dell-container-body {background-color: rgba(255, 255, 255, 0.8);}');
        tm.addGlobalStyle('@keyframes horizontalAnimation { 	from { background-position: 0 0; } 	to { background-position: 100% 0; } }');
        tm.addGlobalStyle('@keyframes verticalAnimation { 	from { background-position: 0 0; } 	to { background-position: 0 100%; } }');
        if (pageImage != null) tm.addGlobalStyle('body { background: url("' + pageImage + '") no-repeat center center fixed; background-size: cover; }');
        if (headerImage != null) tm.addGlobalStyle('.main-nav, .dds__msthd-navbar-top, .footer { background-image: url("' + headerImage + '"); background-size: cover; }');
        if (buttonColor != null) tm.addGlobalStyle('.main-nav, .btn-primary, button { background-color: ' + buttonColor + ' !important;}');
        if (buttonColor != null) tm.addGlobalStyle('#dropMenu button { background-color:inherit !important; color: ' + buttonColor + '; }');
        if (buttonColor != null) tm.addGlobalStyle('a { color: ' + buttonColor + ';}');
        if (backgroundColor != null) tm.addGlobalStyle('.view-nav { background-color: ' + backgroundColor + ' !important; }');
        if (baseLink != null) tm.addGlobalStyle('a { color: ' + baseLink + ' !important;}');
        if (buttonTextColor != null) tm.addGlobalStyle('.btn-primary, button, .main-nav .top-nav .dropdown-menu ul li > a { color: ' + buttonTextColor + ' !important;}');
        if (dropdownTitle != null) tm.addGlobalStyle('#menu_versionToggle, .current-business-unit a { color: ' + dropdownTitle + ' !important;}');
        if (dropdownColor != null) tm.addGlobalStyle('.dropdown-menu { background-color: ' + dropdownColor + ' !important;}');
        if (invertedColor === true) tm.addGlobalStyle('a { -webkit-filter: invert(100%); filter: invert(100%); }');
        if (dropShadowText === true) tm.addGlobalStyle('a { text-shadow: 1px 1px 1px #000; }');
        if (appTitleColor != null) tm.addGlobalStyle('#welcomeMessage, .app-title, .customer-header .segment-info, .customer-header h5, customer-details-navigation .row, customer-details-navigation .segment-info { color: ' + appTitleColor + '; }');
        if (scrollRL === true) tm.addGlobalStyle('#COM	{ background-position: 0px 0px; 	background-repeat: repeat-x; 	animation: horizontalAnimation 40s linear infinite; }');
        if (scrollTB === true) tm.addGlobalStyle('#COM	{ background-position: 0px 0px; 	background-repeat: repeat-y; 	animation: verticalAnimation 40s linear infinite; }');
        if (page2Image != null) {
            $('.content-shell').prepend('<div id="page2Image"></div>');
            tm.addGlobalStyle('#page2Image	{  background-position: 0px 0px; 	background-repeat:repeat-x; 	animation:horizontalAnimation 40s linear infinite;		width:100%;		height:100%;	position:fixed;	z-index:-1; background:url("' + page2Image + '");}');
        }
    }

    var nextHoliday = getNextHoliday(),
        baseLink,
        pageImage,
        page2Image,
        headerImage,
        buttonColor,
        buttonTextColor,
        dropdownColor,
        dropdownTitle,
        invertedColor,
        dropShadowText,
        appTitleColor,
        scrollRL = false,
        scrollTB = false,
        backgroundColor;
    if (nextHoliday.diff < 19) {
        tm.log('Showing ' + nextHoliday.name + '(' + nextHoliday.diff + ')');
        applyHoliday(nextHoliday.name);
    } else {
        tm.log(nextHoliday.name + ' is ' + nextHoliday.diff + ' days away.');
    }

    areKeysAdded = true;
    if (!areKeysAdded) {
        areKeysAdded = true;

        $(document).unbind('keyup');

        $(document).keyup(function(e) {
            if (e.keyCode == 37 && e.ctrlKey) { applyHoliday('Christmas'); } // Ctrl-Left
            if (e.keyCode == 39 && e.ctrlKey) { applyHoliday('Easter'); } // Ctrl-Right
            if (e.keyCode == 38 && e.ctrlKey) { applyHoliday('Thanksgiving'); } // Ctrl-Up
            if (e.keyCode == 40 && e.ctrlKey) { applyHoliday('Spring Forward'); } // Ctrl-Down
        });
        // these SHOULD initialize the dropdown menus, but no longer do:
        $('.dropdown[title="Group by"] a').trigger('click').next().css('display', 'none');
        $('.dropdown[title="Person"] a').trigger('click').next().css('display', 'none');
    }
})();
