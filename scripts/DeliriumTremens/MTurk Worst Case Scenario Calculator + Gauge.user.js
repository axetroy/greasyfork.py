// ==UserScript==
// @name        MTurk Worst Case Scenario Calculator + Gauge
// @namespace   localhost
// @author      ThirdClassInternationalMasterTurker, DeliriumTremens
// @description Shows what your approval rate would be in worst case scenario
// @include     https://www.mturk.com/mturk/dashboard
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// @require     http://cdn.jsdelivr.net/jqplot/1.0.8/jquery.jqplot.js
// @require     http://cdn.jsdelivr.net/jqplot/1.0.8/plugins/jqplot.meterGaugeRenderer.js
// @resource    http://cdn.jsdelivr.net/jqplot/1.0.8/jquery.jqplot.css
// @version     3.1dt
// @grant       none
// ==/UserScript==
 
//
// 2012-09-07 First public release by ThirdClassInternationalMasterTurker
//
// 2012-09-09 Added approximate number of rejects that drop you to the
//            edge of RATE_GOOD and RATE_OK
//
// 2012-10-06 Added GUI for setting RATE_GOOD and RATE_OK
//            (Click 'Pending (Worst Case Scenario)')
//
// 2012-12-02 3.1: Added @downloadURL and @updateURL
//
 
// --- SETTINGS ------------------------------------------------------- //
var RATE_GOOD = (localStorage['WCS_GOOD']) ? localStorage['WCS_GOOD'] : 99.0;
var RATE_OK   = (localStorage['WCS_OK']) ? localStorage['WCS_OK'] : 95.0;
 
var COLOUR_GOOD    = 'lightgreen';
var COLOUR_OK      = 'orange';
var COLOUR_BAD     = 'red';
 
// -------------------------------------------------------------------- //
 
var rows = document.evaluate('//tr[@class]',
           document,
           null,
           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
 
var submitted;
var returned;
var abandoned;
var approved;
var rejected;
var pending;
 
function config_func()
{
  return function()
  {
    var t = prompt('MTurk Worst Case Scenario\nSet your RATE_GOOD and RATE_OK.\nFor example: 99.0;95.0',
                    '' + RATE_GOOD + ';' + RATE_OK);
    if (!t)
      return;
 
    var rates = t.split(';', 2);
    rates[0] = parseFloat(rates[0]).toFixed(1);
    rates[1] = parseFloat(rates[1]).toFixed(1);
   
    if (rates[0] > 0 && rates[0] <= 100)
      localStorage['WCS_GOOD'] = rates[0];
    if (rates[1] > 0 && rates[1] <= 100)
      localStorage['WCS_OK'] = rates[1];
  };  
}
 
 
for (var i=0;i<rows.snapshotLength;i++) {
  var row = rows.snapshotItem(i);
 
  if (row.cells.length != 3)
    continue;
  if (row.className.match('odd|even') == null) {
    continue;
  }
 
  if (row.cells[0].textContent.match('HITs Submitted')) {
    submitted = parseInt(row.cells[1].textContent);
  }
 
  if (row.cells[0].textContent.match('\\.\\.\\. Approved')) {
    approved = parseInt(row.cells[1].textContent);
    approved_p = parseFloat(row.cells[2].textContent);
 
    if (approved_p >= RATE_GOOD) {
      row.cells[2].style.backgroundColor = COLOUR_GOOD;
    }
    else if (approved_p >= RATE_OK) {
      row.cells[2].style.backgroundColor = COLOUR_OK;
    }
    else {
      row.cells[2].style.backgroundColor = COLOUR_BAD;
    }
  }
 
  if (row.cells[0].textContent.match('\\.\\.\\. Rejected')) {
    rejected = parseInt(row.cells[1].textContent);
  }
 
  if (row.cells[0].textContent.match('\\.\\.\\. Pending')) {
    pending = parseInt(row.cells[1].textContent);
 
    row.cells[0].innerHTML += " <small>(Worst Case Scenario)</small>";
 
    if (RATE_GOOD < approved_p) {
      var p = 1.0 - RATE_GOOD/100;
      var x = (rejected-(p*submitted))/(p-1);
      row.cells[0].innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:" + COLOUR_OK + "\">(~" + Math.round(x) + " rejects => " + RATE_GOOD + "%)</span>";
    }
    if (RATE_OK < approved_p) {
      var p = 1.0 - RATE_OK/100;
      var x = (rejected-(p*submitted))/(p-1);
      row.cells[0].innerHTML += "<br>&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:" + COLOUR_BAD + "\">(~" + Math.round(x) + " rejects => " + RATE_OK + "%)</span>";
    }
 
    WCS = Math.round((approved/(approved+rejected+pending) * 1000))/10;
    row.cells[2].innerHTML = '(' + WCS + '%)';
 
    if (WCS >= RATE_GOOD) {
      row.cells[2].style.backgroundColor = COLOUR_GOOD;
    }
    else if (WCS >= RATE_OK) {
      row.cells[2].style.backgroundColor = COLOUR_OK;
    }
    else {
      row.cells[2].style.backgroundColor = COLOUR_BAD;
    }
 
    row.cells[0].addEventListener("click", config_func(), false);
    row.cells[2].addEventListener("click", config_func(), false);
  }
}
 
$(document).ready(function(){
   s1 = [WCS];
    $(".container-content:eq(2)").append('<div id="pendingMeter" style="height:200px;width:350px;margin: 0 auto"></div>');
   plot3 = $.jqplot('pendingMeter',[s1],{
       animate: !$.jqplot.use_excanvas,
       grid: {
           background: "transparent"
       },
       seriesDefaults: {
           renderer: $.jqplot.MeterGaugeRenderer,
           rendererOptions: {
               label: 'Worst Case Gauge',
               labelPosition: 'bottom',
               labelHeightAdjust: -5,
               min: 90,
               max: 100,
               ticks: [90,91,92,93,94,95,96,97,98,99,100],
               intervals:[95, 98, 99, 100],
               intervalColors:['#990000','#FF6600','#FFFF33', '#66CC00']
           }
       }
   });
});