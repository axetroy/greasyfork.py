// ==UserScript==
// @name         Better UoL: Timetables
// @namespace    http://jojko.xaa.pl/
// @require      http://code.jquery.com/jquery-latest.js
// @version      0.1.9
// @match        https://www.liverpool.ac.uk/timetables
// @match        https://plm.liv.ac.uk:8447/cas-web/logout*
// @match        https://plm.liv.ac.uk:8447/cas-web/login?service&timetable
// @match        https://plm.liv.ac.uk/web/home-community/1?timetable
// @match        https://wlspi.liv.ac.uk/pls/spi/systlumi.p_WeeklyTimetableWrapper?p_style=GRID
// @match        https://orbit.liverpool.ac.uk/SWS/UOL1617/ShowWeekly.asp
// @description Access the University of Liverpool timetables faster!
// @author JoJko | jojko.xaa.pl
// @encoding utf-8
// @license https://raw.githubusercontent.com/JoJk0/JJK-UoL-Timetables/master/LICENSE
// @icon https://raw.githubusercontent.com/JoJk0/JJK-UoL-Timetables/master/icon-128x128.png
// @homepage https://github.com/JoJk0/JJK-UoL-Timetables
// @contactURL nothing
// @supportURL https://github.com/JoJk0/JJK-UoL-Timetables/issues
// @grant unsafeWindow
// @run-at document-start
/*jshint multistr: true */

// ==/UserScript==
/* jshint -W097 */
'use strict';

// -------------------------------------------------------------
//    CONFIG
// -------------------------------------------------------------

var uolt = {

   title: 'Better UoL: Timetables',
   version: '0.1.8',
   year: '2016',
   url: 'https://www.liverpool.ac.uk/timetables',
   website: 'jojko.xaa.pl',
   gitHub: 'https://github.com/JoJk0/JJK-UoL-Timetables'

};

var url = document.location.href;
var url2 = url.substring(0, 36);


// -------------------------------------------------------------
//    CSS
// -------------------------------------------------------------

var cssText = "";

// -------------------------------------------------------------
//    CSS - TIMETABLE FRAME
// -------------------------------------------------------------

if(url.indexOf('wlspi.liv.ac.uk/pls/spi/systlumi.p_WeeklyTimetableWrapper?p_style=GRID') >= 0){

cssText += "\
\
body{\
\
    overflow: hidden !important;\
\
}\
body > table > tbody > tr > td:nth-of-type(2) > a{\
\
    padding: 10px;\
    font-size: 16px;\
    font-family: 'Segoe UI', 'Roboto', 'Open Sans', 'Sans Serif' !important;\
    text-decoration: none;\
    font-weight: 400;\
    margin: 5px;\
    border-radius: 3px;\
    display: block;\
    width: 100px;\
	background: #44579c !important;\
    color: #FFF !important;\
    transition: all 0.2s ease;\
\
}\
body > table > tbody > tr > td:nth-of-type(2) > a:hover{\
\
	opacity: 0.8;\
\
}\
body > table > tbody > tr > td:nth-of-type(1) > a{\
\
    padding: 15px;\
    font-family: 'consolas' !important;\
    text-decoration: none;\
    font-weight: 800;\
    font-size: 20px;\
    margin: 5px;\
    display: block;\
    width: 15px;\
    border-radius: 100px;\
    line-height: 15px;\
    height: 15px;\
	background: #EEE;\
    color: #EEE;\
    overflow: hidden;\
    transition: all 0.2s ease;\
\
}\
body > table > tbody > tr > td:nth-of-type(3) > a{\
\
    padding: 15px;\
    font-family: 'consolas' !important;\
    text-decoration: none;\
    font-weight: 800;\
    font-size: 20px;\
    margin: 5px;\
    display: block;\
    width: 15px;\
    border-radius: 100px;\
    line-height: 15px;\
    height: 15px;\
	background: #EEE;\
    overflow: hidden;\
    color: #EEE;\
    transition: all 0.2s ease;\
\
}\
body > table > tbody > tr > td:nth-of-type(3) > a:before{\
\
	content: '>';\
\
}\
body > table > tbody > tr > td:nth-of-type(3) > a:hover{\
\
	background: #44579c;\
    color: #44579c;\
\
}\
body > table > tbody > tr > td:nth-of-type(1) > a:hover{\
\
	background: #44579c;\
    color: #44579c;\
\
}\
body > table > tbody > tr > td:nth-of-type(1) > a:hover:first-letter{\
\
	color: #FFF;\
\
}\
body > table > tbody > tr > td:nth-of-type(3) > a:hover:first-letter{\
\
	color: #FFF;\
\
}\
body > table > tbody > tr > td:nth-of-type(1) > a:first-letter{\
\
	color: #000;\
\
}\
body > table > tbody > tr > td:nth-of-type(3) > a:first-letter{\
\
	color: #000;\
\
}\
p[align='right']:first-of-type{\
\
	display: none;\
\
}\
body{\
\
	margin: 0;\
\
}\
#uol_left_panel{\
\
	width: 20%;\
    height: 100vh;\
    float: left;\
    border: 0;\
}\
#print-logo{\
\
	display: none;\
\
}\
#uol_nav{\
                                        \
	width: 20% !important;\
    padding-top: 20px;\
    padding-left: 10px;\
\
}\
#uol_right_panel{\
\
	width: 79%;\
    height: 88vh;\
\
}\
#uol_right_nav{\
\
	float: right;\
\
}\
.uol_logout{\
\
	background: #44579c !important;\
    font-size: 16px;\
    padding: 12px !important;\
    margin: 10px;\
    color: #FFF;\
    text-decoration: none;\
    display: block;\
    font-family: 'Roboto', 'Segoe UI';\
    transition: all 0.2s ease;\
    border-radius: 3px !important;\
    cursor: default !important;\
    margin-top: 20px;\
    margin-right: 20px;\
\
}\
.uol_logout:hover{\
\
	opacity: 0.8;\
\
}\
.uol_logout:active{\
\
	opacity: 1;\
\
}\
.logout_frame{\
\
	display: none;\
\
}\
";

// -------------------------------------------------------------
//    CSS - TIMETABLE LEFT AND RIGHT SIDES
// -------------------------------------------------------------

    
} else if(url.indexOf('orbit.liverpool.ac.uk/SWS/UOL1617/ShowWeekly.asp') >=0){

cssText += "\
@media screen and (min-width: 500px) {\
    body {\
        font-family: 'Segoe UI', 'Roboto', 'Open Sans', 'Sans Serif' !important;\
    }\
    .header-3-0-4 {\
        display: none !important;\
    }\
    table.grid-border-args {\
        border: 0 !important;\
    }\
    table.grid-border-args tr td {\
        border: 0;\
        border-bottom: 0;\
    }\
    .cell-border {\
        border-bottom: 0 !important;\
    }\
    table.grid-border-args > tbody > tr:nth-child(even) {\
        background: #FCFCFC;\
    }\
    table.grid-border-args > tbody > tr > td {\
        padding: 10px 5px;\
        margin: 5px;\
        line-height: 150%;\
    }\
    table.grid-border-args > tbody > tr > td:first-of-type {\
        background: transparent !important;\
        font-family: 'Segoe UI', 'Roboto', 'Open Sans' !important;\
        color: #000;\
        font-weight: 400;\
        border-bottom: 0 !important;\
    }\
    .header-3-0-5 {\
        font-family: 'Segoe UI', 'Roboto', 'Open Sans';\
        font-weight: 300;\
        font-size: 24px;\
        padding: 20px;\
        display: block;\
        padding-left: 10px;\
    }\
    .header-3-0-12,\
    .header-3-0-14 {\
        display: none;\
    }\
    .header-3-0-13 {\
        opacity: 0.4;\
        padding: 0 10px;\
        font-family: 'Segoe UI', 'Roboto', 'Open Sans', 'Sans Serif' !important;\
        font-weight: 400;\
        font-size: 16px;\
    }\
    .header-3-0-10,\
    .header-3-0-11 {\
        padding: 0 10px;\
        font-family: 'Segoe UI', 'Roboto', 'Open Sans', 'Sans Serif' !important;\
        font-weight: 400;\
        font-size: 16px;\
    }\
    .header-3-0-10 {\
        position: relative;\
        top: 3px;\
    }\
    .object-cell-args {\
        background: transparent !important;\
        font-family: 'Segoe UI', 'Roboto', 'Open Sans', 'Sans Serif' !important;\
    }\
    .object-cell-args a {\
        text-decoration: none !important;\
    }\
    .object-cell-border {\
        transition: all 0.2s ease;\
        background: transparent !important;\
        border-bottom: 3px solid #44579c !important;\
        margin: 0 5px !important;\
    }\
    .object-cell-border:hover {\
        opacity: 0.7;\
    }\
    .object-cell-border > .object-cell-args:last-of-type {\
        opacity: 0.5;\
    }\
    .object-cell-border > .object-cell-args > tbody > tr > td:nth-of-type(2) {\
        display: none;\
    }\
    table.grid-border-args > tbody > tr:first-of-type > td {\
        background: transparent;\
        font-family: 'Segoe UI', 'Roboto', 'Open Sans', 'Sans Serif' !important;\
        color: #000;\
        font-weight: 400;\
        border-bottom: 1px solid #000 !important;\
    }\
    .inj_button {\
        background: #44579c !important;\
        color: #FFF !important;\
        transition: all 0.2s ease;\
    }\
    .inj_button:hover {\
        opacity: 0.8;\
    }\
    .footer-5-0-4 a,\
    .footer-5-0-8 a {\
        background: #EEE;\
        padding: 10px;\
        font-size: 16px;\
        color: #000;\
        font-family: 'Segoe UI', 'Roboto', 'Open Sans', 'Sans Serif' !important;\
        text-decoration: none;\
        font-weight: 400;\
        margin: 5px;\
        border-radius: 3px;\
    }\
    .footer-5-0-0 table[border='0'][width='100%'] tr td {\
        width: 5%;\
    }\
    .footer-5-0-0 table[border='0'][width='100%'] tr td a {\
        background: #EEE;\
        padding: 10px;\
        font-size: 16px;\
        color: #000;\
        font-family: 'Segoe UI', 'Roboto', 'Open Sans', 'Sans Serif' !important;\
        text-decoration: none;\
        font-weight: 400;\
        margin: 5px;\
        border-radius: 3px;\
    }\
    #uol_left {\
        display: none;\
    }\
    #uol_bottom_nav {\
        position: absolute;\
        bottom: 0;\
    }\
}\
@media screen and (max-width: 499px) {\
    .header-border-args, .grid-border-args, .footer-border-args, hr {\
        display: none;\
    }\
    #uol_left {\
        background: #44579c;\
        width: 100%;\
        height: 100vh;\
    }\
    body {\
        padding: 0;\
        margin: 0;\
        overflow: hidden;\
    }\
    #uol_logo {\
        background: url(https://www.liverpool.ac.uk/files/images/schools/h1-logo-whiteout.png) no-repeat;\
        background-position: center;\
        width: 100%;\
        height: 100px;\
    }\
    .title {\
        padding: 15px;\
        padding-top: 0;\
        background: #44579c;\
        color: #FFF;\
        font-family: 'Roboto', 'Segoe UI', 'Open Sans', 'Sans serif' !important;\
        font-size: 24px;\
        font-weight: 100;\
        margin-bottom: 10px;\
    }\
    .uol_event {\
        padding: 15px;\
        padding-left: 15px;\
        color: #FFF;\
        font-family: 'Roboto', 'Segoe UI', 'Open Sans', 'Sans serif' !important;\
        font-size: 14px;\
        font-weight: 300;\
        transition: all 0.2s ease;\
        border-left: 3px solid rgba(255, 255, 255, 0.5);\
        margin: 5px 0;\
    }\
    .uol_event:hover {\
        background: rgba(255, 255, 255, 0.1);\
        border-left: 3px solid #FFF;\
    }\
    .uol_title {\
        font-size: 20px;\
    }\
    .uol_footer{\
                                        \
                                        position: absolute;\
                                        bottom: 10px;\
                                        left: 0;\
                                        color: #FFF;\
                                            opacity: 0.9;\
                                        font-family: 'Roboto', 'Segoe UI', 'Open Sans', 'Sans serif' !important;\
                                        line-height: 130%;\
                                            width: 100%;\
                                        }\
    .uol_footer p{\
                                        \
                                        \
                                        line-height: 130%;\
             font-weight: 300;\
                                            font-size: 14px;\
                                            text-align: center;\
                                        margin: 0px;}\
}\
hr{ display: none; }\
";

// -------------------------------------------------------------
//    CSS - LOGIN PANEL
// -------------------------------------------------------------

    
} else if(url.indexOf('plm.liv.ac.uk:8447/cas-web/login?service&timetable') >= 0){

cssText += "\
header, #welcome, footer{\
\
display: none;\
\
}\
html{\
\
  padding-bottom: 0;\
  background: #FFF;\
  overflow: hidden;\
\
}\
body{\
\
  background: #fafafa;\
  height: 100vh;\
\
}\
#login{\
\
	width: 100%;\
\
}\
#fm1{\
\
	text-align: center;\
    width: 300px;\
    display: block;\
    margin: 0 auto;\
    background: #FFF;\
    box-shadow: 2px 2px 5px rgba(0,0,0,0.05);\
\
}\
label[for='username'], label[for='password']{\
\
	display: none !important;\
\
}\
#fm1 ul li:nth-of-type(2){\
\
	display: none;\
\
}\
#msg.success{\
\
   display: none;\
\
}\
.loader{\
\
	background: url(http://www.jojko.xaa.pl/priv/Upload/styles/liv.ac.uk/loading.gif) no-repeat;\
    background-position: center;\
    width: 100%;\
    height: 100vh;\
\
}\
#uol_logo{\
\
    background: #44579c url(https://www.liverpool.ac.uk/files/images/schools/h1-logo-whiteout.png) no-repeat;\
    background-position: center;\
    width: 100%;\
    height: 100px;\
\
}\
.box{\
\
	background-color: transparent !important;\
\
}\
#username, #password{\
\
	background: transparent !important;\
    border: 0 !important;\
    border-bottom: 1px solid #CCC !important;\
    margin: 10px !important;\
    width: 90% !important;\
    font-family: 'Roboto', 'Segoe UI';\
\
}\
#username:hover, #password:hover{\
\
	border-bottom: 1px solid #44579c !important;\
\
}\
.btn-submit{\
\
	background: #44579c !important;\
    border-radius: 0 !important;\
    font-size: 16px;\
    padding: 12px !important;\
    margin: 10px;\
    width: 90%;\
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);\
    font-family: 'Roboto', 'Segoe UI';\
    transition: all 0.2s ease;\
    cursor: default !important;\
\
}\
.btn-submit:hover{\
\
	opacity: 0.8;\
\
}\
.btn-submit:active{\
\
	opacity: 1;\
\
}\
.uol_reset_pin{\
\
	text-decoration: none;\
    color: #CCC !important;\
    text-align: right !important;\
    float: right;\
    margin-right: 20px;\
    margin-bottom: 15px;\
\
}\
#fm1 h2{\
\
	display: none;\
\
}\
.errors{\
\
	background: lightred !important;\
    font-family: 'Roboto', 'Segoe UI' !important;\
    line-height: 140%;\
    padding: 10px;\
    margin-bottom: 10px;\
\
}\
#uol_title{\
\
	padding: 15px;\
    padding-top: 0;\
    background: #44579c;\
    color: #FFF;\
	font-family: 'Roboto', 'Segoe UI', 'Open Sans', 'Sans serif' !important;\
    font-size: 24px;\
    font-weight: 100;\
    margin-bottom: 20px;\
    \
}\
";
    
// -------------------------------------------------------------
//    CSS - LOADING SCREEN
// -------------------------------------------------------------


} else if(url.indexOf('plm.liv.ac.uk/web/home-community/1?timetable') >= 0){

cssText += "\
html{\
\
  padding-bottom: 0 !important;\
  background: #FAFAFA !important;\
  overflow: hidden !important;\
  background-color: #FAFAFA !important;\
  background-image: none! important;\
\
}\
body{\
\
    background-image: url(http://www.jojko.xaa.pl/priv/Upload/styles/liv.ac.uk/loading.gif) !important;\
    background-repeat: no-repeat !important; \
    background-color: #FAFAFA !important;\
    background-position: center !important;\
    width: 100% !important;\
    height: 100vh !important;\
\
}\
#wrapper, .overlay{\
\
	display: none !important;\
\
}\
.loader{\
\
	background: url(http://www.jojko.xaa.pl/priv/Upload/styles/liv.ac.uk/loading.gif) no-repeat;\
    background-position: center;\
    width: 100%;\
    height: 100vh;\
\
}\
";
    
// -------------------------------------------------------------
//    CSS - LOGOUT
// -------------------------------------------------------------


} else if(url.indexOf('plm.liv.ac.uk:8447/cas-web/logout') >=0){

cssText += "\
html{\
\
  padding-bottom: 0 !important;\
  background: #FAFAFA !important;\
  overflow: hidden !important;\
  background-color: #FAFAFA !important;\
  background-image: none! important;\
\
}\
body{\
\
    background-image: url(http://www.jojko.xaa.pl/priv/Upload/styles/liv.ac.uk/loading.gif) !important;\
    background-repeat: no-repeat !important; \
    background-color: #FAFAFA !important;\
    background-position: center !important;\
    width: 100% !important;\
    height: 100vh !important;\
\
}\
#cas{\
\
	display: none;\
\
}              \
";

}

var css = document.createElement('style');
var cssType = document.createAttribute('type');
cssType.value = 'text/css';
css.setAttributeNode(cssType); 
var cssTextNode = document.createTextNode(cssText);
css.appendChild(cssTextNode);
document.head.appendChild(css);

// -------------------------------------------------------------
//    MAIN PAGE
// -------------------------------------------------------------
window.addEventListener('load', function() {

if(url.indexOf(uolt.url) >= 0){
    
document.write('\
<!doctype html>\
<html lang="en">\
  <head>\
    <title>'+uolt.title+' '+uolt.version+'</title>\
    <meta charset="utf-8" />\
    <link id="favicon" rel="shortcut icon" type="image/ico" href="https://www.liverpool.ac.uk/images/favicon.ico">\
  </head>\
  <body style="margin: 0; overflow: hidden;">\
  <iframe id="login_applet" width=100% border=0 style="border: 0; height: 100vh;" src="https://plm.liv.ac.uk:8447/cas-web/login?service&timetable"></iframe>\
  </body>\
</html>');
    
// -------------------------------------------------------------
//    LOADING SCREEN
// -------------------------------------------------------------
   
} else if(url == 'https://plm.liv.ac.uk:8447/cas-web/login?service&timetable'){
     
 if($('div.success').length){
      var loader = document.createElement('div');
      $(loader).html('\
       <div class="loader"></div>\
      ');
      $('body').append(loader);
      
      document.location.href = 'https://plm.liv.ac.uk/web/home-community/1?timetable';
  } else{
    
// -------------------------------------------------------------
//    LOGIN PANEL
// -------------------------------------------------------------
    
  $('#username').attr('placeholder', 'Student ID...');
  $('#password').attr('placeholder', 'PIN...');
  var title = document.createElement('div');
  $(title).attr('id', 'uol_title');
  $(title).html('Timetables');
  $('#fm1').prepend(title);
  var logo = document.createElement('div');
  $(logo).attr('id', 'uol_logo');
  $('#fm1').prepend(logo);
  $("a[href='https://wlspi.liv.ac.uk/pls/spi/systlumi.p_ResetPin']").attr('class', 'uol_reset_pin');
  $(".uol_reset_pin").attr('target', '_blank');
  }
// -------------------------------------------------------------
//    LOADING SCREEN 2
// -------------------------------------------------------------
    
} else if(url == 'https://plm.liv.ac.uk/web/home-community/1?timetable'){
    
  /*var loader = document.createElement('div');
  $(loader).html('\
  <div class="loader"></div>\
  ');
  $('body').append(loader);*/
  $(document).ready(function(){
  
      document.location.href = 'https://wlspi.liv.ac.uk/pls/spi/systlumi.p_WeeklyTimetableWrapper?p_style=GRID';
  
  });

// -------------------------------------------------------------
//    TIMETABLES MAIN FRAME
// -------------------------------------------------------------
 
} else if(url == 'https://wlspi.liv.ac.uk/pls/spi/systlumi.p_WeeklyTimetableWrapper?p_style=GRID'){
 
var tUrl = $('iframe').attr('src');
$('iframe').attr('scrolling', 'no');
var tUrlWeek = parseInt(tUrl.substring(37,39));
var today = new Date();
var dayOfWeek = today.getDay();
if(dayOfWeek == 0){

   tUrl = tUrl.replace(tUrlWeek, tUrlWeek+1);
    
}
    
// Add left frame
var leftFrame = document.createElement('iframe');
$(leftFrame).attr('src', tUrl);
$(leftFrame).attr('id', 'uol_left_panel');
$('body').prepend(leftFrame);

// Append IDs
$('table:first-of-type').attr('id', 'uol_nav');
$('iframe[name="iframeORBIT"]').attr('id', 'uol_right_panel')

// Add right nav
var rightNav = document.createElement('div');
$(rightNav).attr('id', 'uol_right_nav');
$('body').prepend(rightNav);
$('#uol_right_nav').html('\
<a href="https://wlspi.liv.ac.uk/pls/spi/twbkwbis.p_idm_logout" class="uol_logout">Logout</a> \
');

// NAVIGATION NEXT / PREV WEEK
    
    var next = $('#uol_nav > tbody > tr > td[align="right"] > a');
    var prev = $('#uol_nav > tbody > tr > td[align="left"] > a');
    $('#uol_nav > tbody > tr > td[align="center"] > a').attr('target', 'iframeORBIT');
    var now = $('#uol_nav > tbody > tr > td[align="center"] > a').attr('href').replace('Wrapper', '');
    $('#uol_nav > tbody > tr > td[align="center"] > a').attr('href', now);

    var iframeTimetable = $('iframe[name="iframeORBIT"]');
    $(next).attr('href', '#');
    $(prev).attr('href', '#');
    
    $(next).click(function(){
    
        var NweekNo = parseInt($(iframeTimetable).attr('src').substring(37,39));
        var NweekRep = $(iframeTimetable).attr('src').replace(NweekNo, NweekNo+1);
        if(NweekNo <=53){
            $(iframeTimetable).attr('src', NweekRep);
        }
    
    });
    $(prev).click(function(){
    
        var NweekNo = parseInt($(iframeTimetable).attr('src').substring(37,39));
        var NweekRep = $(iframeTimetable).attr('src').replace(NweekNo, NweekNo-1);
        if(NweekNo >= 1){
            $(iframeTimetable).attr('src', NweekRep);
        }
    });

// -------------------------------------------------------------
//    LOGOUT
// -------------------------------------------------------------
    
} else if(url.indexOf('/cas-web/logout') >= 0){

    document.write('');
    document.location.href=uolt.url;

// -------------------------------------------------------------
//    TIMETABLE ICS EXPORTER
// -------------------------------------------------------------

} else if(url == 'https://orbit.liverpool.ac.uk/SWS/UOL1617/ShowWeekly.asp'){

    var date = $('.header-3-0-13').text();
    var date1 = date.split('-');
    date = date1[0];
    var date2 = date.split(' ');
    var month;

    switch(date2[1]){

        case 'Jan': month = '01'; break;
        case 'Feb': month = '02'; break;
        case 'Mar': month = '03'; break;
        case 'Apr': month = '04'; break;
        case 'May': month = '05'; break;
        case 'Jun': month = '06'; break;
        case 'Jul': month = '07'; break;
        case 'Aug': month = '08'; break;
        case 'Sep': month = '09'; break;
        case 'Oct': month = '10'; break;
        case 'Nov': month = '11'; break;
        case 'Dec': month = '12'; break;

    }

    var unixDate = new Date(date2[2],month-1,date2[0]);

    function toITCFormat(date, time) {
        var timeCont = [],
            dateCont = [];

        if (time.toLowerCase().indexOf('pm') != -1) {

            timeCont = time.toLowerCase().replace('pm', 00).split(':'); 
            timeCont[0] = (parseInt(timeCont[0]) + 12) % 24;
            if(timeCont[0] == 00){ timeCont[0] = 12 }
        } else {
            timeCont = time.toLowerCase().replace('am', 00).split(':');
        }
        dateCont = date.split('/');
        dateCont = dateCont[2]+dateCont[1]+dateCont[0];

        return dateCont + 'T' + timeCont.join('');
    }
    function timeConvert(timer){

        var time;
        switch(timer){
            case 1: time = '09:00AM'; break;
            case 2: time = '09:30AM'; break;
            case 3: time = '10:00AM'; break;
            case 4: time = '10:30AM'; break;
            case 5: time = '11:00AM'; break;
            case 6: time = '11:30AM'; break;
            case 7: time = '12:00PM'; break;
            case 8: time = '12:30PM'; break;
            case 9: time = '01:00PM'; break;
            case 10: time = '01:30PM'; break;
            case 11: time = '02:00PM'; break;
            case 12: time = '02:30PM'; break;
            case 13: time = '03:00PM'; break;
            case 14: time = '03:30PM'; break;
            case 15: time = '04:00PM'; break;
            case 16: time = '04:30PM'; break;
            case 17: time = '05:00PM'; break;
            case 18: time = '05:30PM'; break;
            default: time = "ERR";
        }
        return time;

    };

    var timetable = [];
    var i = 0;

    $("table.grid-border-args > tbody > tr").each(function() {
        var timer = 0;
        var tableData = $(this).children('td');
        if (tableData.length > 0) {
            tableData.each(function() { 

                if($(this).text() != ''){
                    var timetableRow = [];
                    $(this).find('td').each(function(){

                        timetableRow.push($(this).text());

                    });
                    if(timetableRow.length > 0){ 
                        timetableRow.push(timer); // Hour
                        timetableRow.push(i);
                        var time;

                        time = timeConvert(timer);
                        var timePlus = timeConvert(timer+parseInt($(this).attr("colspan")));
                        /*if($(this).attr("colspan") == "4"){
                            var timePlus = timeConvert(timer+4);
                        } else{
                            var timePlus = timeConvert(timer+2);
                        }*/
                        unixDate = unixDate-0;
                        var changedDate = new Date(unixDate+(i-1)* 24 * 60 * 60 * 1000);
                        var MyDate = changedDate;
                        var DateString;

                        MyDate.setDate(MyDate.getDate());

                        DateString = ('0' + MyDate.getDate()).slice(-2) + '/'
                            + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
                            + MyDate.getFullYear();

                        var x = toITCFormat(DateString, time)+"0";
                        var y = toITCFormat(DateString, timePlus)+"0";
                        var z = toITCFormat('01/01/2016', '01:00AM')+"0";

                        timetableRow.push(x);
                        timetableRow.push(y);
                        timetableRow.push(z);
                        timer = timer+(parseInt($(this).attr("colspan"))/2);
                        timetable.push(timetableRow); 
                    }

                } 
                /* HERE --------------------------------------------------------------------------------------------------------------------------------------- */
                if(parseInt($(this).attr("colspan")) >= 4){
                    var x = parseInt($(this).attr("colspan"))/2;
                    timer = timer+x;
                } else{
                    timer = timer+1;
                }

            });
        }
        i++;
    });

    // DISPLAY

    var timetableString = "\
BEGIN:VCALENDAR\r\n\
VERSION:2.0\r\n\
PRODID:http://www.jojko.xaa.pl\r\n\
CALSCALE:GREGORIAN\r\n\
METHOD:PUBLISH\r\n\
X-WR-CALNAME:UoL Timetable\r\n\
X-WR-TIMEZONE:Europe/London\r\n\
";

    $.each(timetable, function(){
        var event = $(this);
        var uid = "UOL-TIMETABLE-"+event[7]+"-"+event[8]+"-"+event[2]+"@jojko.xaa.pl";
        uid = uid.replace(' ', '-');
        timetableString = timetableString+"\
BEGIN:VEVENT\r\n\
DTSTART:"+event[7]+"\r\n\
DTEND:"+event[8]+"\r\n\
DTSTAMP:"+event[9]+"\r\n\
UID: "+uid+"\r\n\
CREATED:"+event[9]+"\r\n\
DESCRIPTION:"+event[3]+"\r\n\
LAST-MODIFIED:"+event[9]+"\r\n\
LOCATION:"+event[2]+"\r\n\
SEQUENCE:0\r\n\
STATUS:CONFIRMED\r\n\
SUMMARY:"+event[0]+"\r\n\
TRANSP:OPAQUE\r\n\
END:VEVENT\r\n\
";

    });

    timetableString = timetableString+"\
END:VCALENDAR";
    
    // Downloader 
    
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    var injBody = document.createElement("td");
    var width = document.createAttribute("width");
    width.value="20%";
    injBody.setAttributeNode(width);  

    var wk = $('.header-3-0-11').text();
    wk = wk.replace(' ', '-');
    $(injBody).html('\
<div class="inj_container">\
<a href="#" class="inj_button">Export to calendar</a>\
</div>\
');
    $(".footer-5-0-0 table[border='0'][width='100%'] tr").prepend(injBody);
    $('.inj_button').click(function(){

        download('timetable-'+wk+'.ics', timetableString);

    });
    
// -------------------------------------------------------------
//    TIMETABLE LEFT-SIDE FRAME
// -------------------------------------------------------------
    
    var today = new Date();
    var ThisDay = today.getDate();
    var ThisYear = today.getFullYear();
    var ThisMonth = today.getMonth();
    var ThisDayOfWeek = today.getDay();
    var hour = today.getHours();
    var dayInfo = "Today";

    if(hour >= 18 || ThisDayOfWeek == 0){ 
        if((ThisMonth == 0 || ThisMonth == 2 || ThisMonth == 4 || ThisMonth == 6 || ThisMonth == 7 || ThisMonth == 9 || ThisMonth == 11) && ThisDay > 30){ ThisDay = ThisDay-30; } 
        else if((ThisMonth == 3 || ThisMonth == 5 || ThisMonth == 8 || ThisMonth == 10) && ThisDay > 29){ ThisDay = ThisDay-29; } 
        else if(ThisMonth == 1 && ThisDay > 27 && ThisYear%4 != 0){ ThisDay = ThisDay-27; } 
        else if(ThisMonth == 1 && ThisDay > 28 && ThisYear%4 == 0){ ThisDay = ThisDay-28; } 
        else{ ThisDay = ThisDay+1 }
        dayInfo = "Tomorrow";
    }

    var left = document.createElement('div');
    $(left).attr('id', 'uol_left');
    $(left).html('\
<div id="uol_logo"></div>\
<div class="title">'+dayInfo+'</div>\
\
');
    $('body').prepend(left);
    var counter = 0;
    $.each(timetable, function(){

        var event = $(this);
        var startTimeH = event[7].substring(9,11);
        var startTimeM = event[7].substring(12,14);
        var endTimeH = event[8].substring(9,11);
        var endTimeM = event[8].substring(12,14);

        var day = parseInt(event[7].substring(6,8));

        if(ThisDay == day){
            $('#uol_left').append('\
<div class="uol_event">\
<div class="uol_title">'+event[0]+'</div>\
<div class="uol_time">at '+startTimeH+':'+startTimeM+' - '+endTimeH+':'+endTimeM+'</div>\
<div class="uol_place">in '+event[2]+'</div>\
</div>\
\
');
            counter++;
        }

    });
    if(counter == 0){ 
        $('#uol_left').append('\
<div class="uol_event">\
<div class="uol_title">No lectures</div>\
</div>\
\
'); }
    $('#uol_left').append('<div class="uol_footer"><p> '+uolt.title+' v.'+uolt.version+'</p><p>Created under MIT licence.</p><p>'+uolt.year+' '+uolt.website+'</div>');
    $('body > table:last-of-type').attr('id', 'uol_bottom_nav');

}

}, false);
