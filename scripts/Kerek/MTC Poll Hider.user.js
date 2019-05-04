// ==UserScript==
// @name       MTC Poll Hider
// @version    1.0
// @include      http://www.mturkcrowd.com/*
// @include      https://www.mturkcrowd.com/*
// @description Hide and toggle polls on MTurk Crowd.
// @namespace https://greasyfork.org/users/11205
// ==/UserScript==

    $(".PollContainer").before('<button id="toggle" type="button"><span>Show Poll</span></button>');
    $(".PollContainer").hide();

    // Toggles instructions and changes toggle text.
    $('#toggle').click(function() {
        $(".PollContainer").toggle();
        $('#toggle').text() == 'Show Poll' ? str = 'Hide Poll' : str = 'Show Poll';
        $('#toggle span').html(str);
    });    