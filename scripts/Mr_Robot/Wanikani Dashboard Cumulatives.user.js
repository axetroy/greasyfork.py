// ==UserScript==
// @name         Wanikani Dashboard Cumulatives
// @author       MrRobot
// @version      1.0
// @copyright    2016
// @description  Show more informative cummulatives on Wanikani dashboard
// @include      https://www.wanikani.com/
// @include      https://www.wanikani.com/dashboard
// @run-at       document-end
// @grant        none
// @namespace https://greasyfork.org/users/33264
// ==/UserScript==


// ========== Constants
var css = 
    '.dashboard section.srs-progress ul li span:first-of-type {' +
	'     padding-left: 10px; ' +
    '     padding-right: 10px; ' +
	'}  ' +
   '.srs-progress-cumulative-popup {' +
    '    padding-right: 10px; ' +
    '    opacity: 0.25; ' +
    '    color: black !important; ' +
    '    text-shadow: none !important; ' + 
    '}                      ' +
    '.srs-progress-cumulative {' +
    '    opacity: 0.25; ' +
    '    color: black !important; ' +
    '    text-shadow: none !important; ' + 
    '}' ;

var srs_lvls = ['apprentice','guru','master','enlighten','burned'];
var srs_lvls_class = ['apprentice','guru','master','enlightened','burned'];
var srs_items = ['total','radicals','kanji','vocabulary'];


// ========== Main
$(document).ready(function(){
    
    // add style to document
    add_style(css);
    
    // obtain api if not present
    get_api();
    
    // perform json request and store in cache
    read_api();
    
    // obtain data from cache
    var srs_cache = localStorage.getItem('srs_cache');
    srs = JSON.parse(srs_cache);
    srs_complete = JSON.parse(srs_cache);
    
    // compute cumulatives
    srs_complete = get_cumulatives(srs, srs_complete);
    
    // modify document
    modify_numbers(srs,srs_complete);    
    
});


// ========== Get API (from rfindley's dashboard progress plus)
function get_api() {
    var done = $.Deferred();

    // First check if the API key is in local storage.
    var api_key = localStorage.getItem('apiKey');
    if (api_key && api_key.length == 32) return done.resolve();

    // We don't have the API key.  Fetch it from the /account page.
    $.get('/account')
    .done(function(page){
        // Make sure what we got is a web page.
        if (typeof page !== 'string') {return done.reject();}

        // Extract the API key.
        var api_key = $(page).find('#api-button').parent().find('input').attr('value');
        if (typeof api_key !== 'string' || api_key.length !== 32)  {return done.reject();}

        // Store the updated user info.
        localStorage.setItem('apiKey', api_key);

        // Return success.
        done.resolve();
    })
    .fail(function(){
        // Failed to get web page.
        done.reject();
    });
    
    return done.promise();
}


// ==========  Read API
function read_api() {
    var api = localStorage.getItem('apiKey');    
    var txt;
    var srs_cache;
    if (api) {
        $.getJSON('https://www.wanikani.com/api/user/' + api + '/srs-distribution', function (data) {
            setTimeout(function () {
              if (data.error) {
                alert('API Error: ' + data.error.message);
              } else {
                localStorage.setItem('srs_cache', JSON.stringify(data.requested_information));
              }
            }, 0);
          });
      }
}


// ==========  Modify numbers
function modify_numbers(srs,srs_complete) {      
    for (var ii=0; ii<=4; ii++) {
        srs_complete_lvl = srs_complete[srs_lvls[ii]];
        var li_after = '<span class="srs-progress-cumulative">' + srs_complete_lvl.total + '</span>';
        $('#' + srs_lvls_class[ii] + ' span').after(li_after);
        $('#' + srs_lvls_class[ii]).attr("data-content",modify_popover(ii,srs, srs_complete));        
    }
}

// ========== Modify popover numbers
function modify_popover(ii,srs,srs_complete) {
    srs_lvl = srs[srs_lvls[ii]];
    srs_complete_lvl = srs_complete[srs_lvls[ii]];
    var content = 
        '<ul><li>Radicals<span>' + srs_lvl.radicals + '</span>' + '<span class="srs-progress-cumulative-popup">' + srs_complete_lvl.radicals + '</span>' + '</li>' +
        '<li>Kanji<span>' + srs_lvl.kanji + '</span>' + '<span class="srs-progress-cumulative-popup">' + srs_complete_lvl.kanji + '</span>' + '</li>' +
        '<li>Vocabulary<span>' + srs_lvl.vocabulary + '</span>' + '<span class="srs-progress-cumulative-popup">' + srs_complete_lvl.vocabulary + '</span>' + '</li>' +
        '</ul>';
    return content;
}


// ========== Get cummulatives
function get_cumulatives(srs,srs_complete) { 
    // calculate cummulatives
    for (var iii=0; iii<=3; iii++) {
        srs_complete.burned[srs_items[iii]] = srs.burned[srs_items[iii]];
        for (var ii=3; ii>=0; ii--) {
            srs_complete[srs_lvls[ii]][srs_items[iii]] += srs_complete[srs_lvls[ii+1]][srs_items[iii]];
        } 
    }    
    return srs_complete;
}

// ========== Add CSS (from rfindley's ultimate timeline)
function add_style(aCss) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (head) {
    style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.textContent = aCss;
    head.appendChild(style);
    return style;
  }
  return null;
}