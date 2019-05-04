// ==UserScript==
// @name         TFL Delay Checker
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Check each journey in TFL Journey Planner to look for delays of 15 minutes or over.
// @author       You
// @match        https://contactless.tfl.gov.uk/NewStatements*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// version 0.5 - Updated default times for new journey, added filter for specified journey stations.
// version 0.4 - Nested evaluate recode to correct get date from parent node.
// version 0.3 - Recode for TFL redesign
// version 0.2 - Fix for time occuring across midnight
// version 0.1 - initial release

var expectedJourneyTime = 24;
var maxDelayTime = 15;
var JourneyStation1 = "Green Park"
var JourneyStation2 = "Stepney Green"
//"//div[@class='col-xs-9']",

var allDivs, thisDiv; 
allDivs = document.evaluate(
    "//div[@class='statements-list clearfix']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

//alert(thisHeading);
//alert(thisDiv);
//alert("here1");
//alert("Total Divs: " +allDivs.snapshotLength);
//alert("here2");

for (var i = 0; i < allDivs.snapshotLength; i++) {
    //alert(allDivs.snapshotItem(i));
    thisDiv = allDivs.snapshotItem(i).innerHTML;
    //alert("thisDiv: " + thisDiv);
    //window.prompt(i + ", thisDiv", thisDiv);
    
    var divArray = thisDiv.match(/class="date-link">(.+?)</); //Journey Divs
    
   //    "div[@class='col-xs-9']",

      //var resultDiv = document.getElementById("col-xs-9");  
//alert(resultDiv.innerHTML);
    var allRows, thisRow;
    allRows = document.evaluate(
    ".//div[@class='col-xs-9']",
    allDivs.snapshotItem(i),
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

    //alert("allRows length: " + allRows.snapshotLength);
    for (var j = 0; j < allRows.snapshotLength; j++) {
        thisRow = allRows.snapshotItem(j).innerHTML;
        //alert("thisRow: " + thisRow);
        //window.prompt(j + ", thisRow", thisRow);
    
        var rowArray = thisRow.match(/journey-from">(.+?)<[\s\S]+?journey-to">(.+?)<[\s\S]+?journey-time">(.+?)</); //Journey Divs
        if (rowArray) {
            //alert("rowArray.length " + rowArray.length);
            //alert("Date: " + divArray[1] + "\n" + rowArray[1] + "\n" + rowArray[2] + "\n" + rowArray[3]);
            var res = rowArray[3].split(" - ");
            //thisRow = thisRow.getStringValue();
            //alert("difference " + res[0] + " " + res[1] + ": ");
            
            //Is the journey between desired 2 stations
            
            if ((JourneyStation1 == rowArray[1] && JourneyStation2 == rowArray[2]) || (JourneyStation1 == rowArray[2] && JourneyStation2 == rowArray[1])) {
                var journeyTime;
                journeyTime = CompareTimes(res[0], res[1]); // / 1000 / 60 
                //alert("journeyTime: " + journeyTime);
                if (journeyTime > (maxDelayTime+expectedJourneyTime)) { //Delay more than journeyTime (" + expectedJourneyTime + ") + " + maxDelayTime + " minutes delayTime
                    alert(journeyTime-expectedJourneyTime + " minute delay (more than "+maxDelayTime+" minutes): \n[" + rowArray[3] + "] " + journeyTime +  " minutes journey time, should take " + expectedJourneyTime + ".\n" + rowArray[1] + " to " + rowArray[2] + " on " + divArray[1]);
                }
                //alert("Delay more than 15 minutes: " + journeyTime +  " minutes journey time.");
            }
            
        }
        else
        {
            //alert("No rows found " + divArray.length + "\n " + thisRow);

        }
    }
}

function CompareTimes(startTime, endTime) { //07:56 - 08:39
    var startDate = new Date("January 1, 1970 " + startTime +":00");
    var endDate = new Date("January 1, 1970 " + endTime +":00");
    if (endDate < startDate) {
        endDate.setDate(endDate.getDate() + 1);
    }
    var timeDiff = Math.abs(startDate - endDate);

    var hh = Math.floor(timeDiff / 1000 / 60 / 60);
    if(hh < 10) {
        hh = '0' + hh;
    }
    timeDiff -= hh * 1000 * 60 * 60;
    var mm = Math.floor(timeDiff / 1000 / 60);
    if(mm < 10) {
        mm = '0' + mm;
    }
    timeDiff -= mm * 1000 * 60;
    var ss = Math.floor(timeDiff / 1000);
    if(ss < 10) {
        ss = '0' + ss;
    }

    //alert("Time Diff- " + hh + ":" + mm + ":" + ss);
    return Math.floor(Math.abs(startDate - endDate) / 1000 / 60);
}

function parseTime(s) {
    var part = s.match(/(\d+):(\d+)(?: )?(am|pm)?/i);
    var hh = parseInt(part[1], 10);
    var mm = parseInt(part[2], 10);
    var ap = part[3] ? part[3].toUpperCase() : null;
    
    if (ap === "AM") {
        if (hh == 12) {
            hh = 0;
        }
    }
    if (ap === "PM") {
        if (hh != 12) {
            hh += 12;
        }
    }
    
    //alert(hh + " " + mm);
    return { hh: hh, mm: mm };
}
//parseTime("12:00 AM"); // {hh:  0, mm: 0}
//parseTime("12:00 PM"); // {hh: 12, mm: 0}
//parseTime("01:00 PM"); // {hh: 13, mm: 0}
//parseTime("23:00");    // {hh: 23, mm: 0}