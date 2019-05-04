// ==UserScript==
// @name         Schoolsoft Hack
// @version      1.3
// @description  Show class attendance as green when red
// @author       Hassan
// @match        https://sms.schoolsoft.se/itg/jsp/student/right_student_*
// @require      http://code.jquery.com/jquery-latest.min.js
// @run-at       document-start
// @namespace    https://greasyfork.org/users/14214
// ==/UserScript==

$('body').hide();

$(window).load(function() {
    $("body").show();
    
    if (location.href.split('?').pop().split('&').shift() == "action=select") {
        
        $('.table-verticalborders > .red, .table-verticalborders > .yellowbold, .table-verticalborders > .yellow, .table-verticalborders > .greenbold').attr('class', 'green');
        
    } else if (location.href.split('?')[0] == 'https://sms.schoolsoft.se/itg/jsp/student/right_student_lesson_status.jsp') {
        
        $('.red.schedulecell, .greenbold.schedulecell, .yellow.schedulecell, .yellowbold.schedulecell').attr('class', 'green schedulecell');
        
          setTimeout(function() {
          }, 1000);
    } else if (location.href.split('?')[0] == 'https://sms.schoolsoft.se/itg/jsp/student/right_student_course.jsp') {
        
        $('#inv_couse_content > table:nth-child(8) > tbody > tr:nth-child(3) > td:nth-child(9)')[0].innerHTML = 'D 2017-06-15';
        $('#inv_couse_content > table:nth-child(8) > tbody > tr:nth-child(4) > td:nth-child(9)')[0].innerHTML = 'D 2017-06-15';
        $('#inv_couse_content > table:nth-child(8) > tbody > tr:nth-child(14) > td:nth-child(9)')[0].innerHTML = 'C 2017-06-15';
        $('#inv_couse_content > table:nth-child(8) > tbody > tr:nth-child(16) > td:nth-child(9)')[0].innerHTML = 'C 2017-06-16';
        
          setTimeout(function() {
          }, 1000);
    } else {
    
       $('div.yellow, div.red, td:not(.schedulecell) > div, div[id^=test]').attr('class', 'green');
        $('td:not(.schedulecell) > div').attr('style', '');
        $('div[id^=test]').attr('style', 'margin-bottom:2px;');
    }
});