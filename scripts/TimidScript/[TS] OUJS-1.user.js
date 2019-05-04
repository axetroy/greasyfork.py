// ==UserScript==
// @name                    [TS] OUJS-1
// @namespace               TimidScript
// @version                 1.0.29.2
// @description             New post/issue notification, adds install and ratings history stats, improves table view, list all user scripts in one page, improves library page... [UnSupported]
// @author                  TimidScript
// @homepageURL             https://github.com/TimidScript
// @copyright               © 2014+ TimidScript, Some Rights Reserved.
// @license                 https://github.com/TimidScript/UserScripts/blob/master/license.txt
// @include                 http*://openuserjs.org/*
// @require                 https://greasyfork.org/scripts/19967/code/TSL - GM_update.js
// @require                 https://greasyfork.org/scripts/19968/code/TSLibrary - Generic.js
// @homeURL                 https://greasyfork.org/en/scripts/5412
// @grant                   GM_getValue
// @grant                   GM_setValue
// @grant                   GM_deleteValue
// @grant                   GM_xmlhttpRequest
// @grant                   GM_listValues
// @grant                   GM_registerMenuCommand
// @grant                   GM_setClipboard
// @icon                    data:image/gif;base64,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
// ==/UserScript==

/* License + Copyright Notice
********************************************************************************************
License can be found at: https://github.com/TimidScript/UserScripts/blob/master/license.txt
Below is a copy of the license the may not be up-to-date.

Copyright © TimidScript, Some Rights Reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
following conditions are met:

1) GPL-3 License is met that does not conflict with the rest of the license (http://www.gnu.org/licenses/gpl-3.0.en.html)
2) This notice must be included
3) Due credits and link to original author's homepage (included in this notice).
4) Notify the original author of redistribution
5) Clear clarification of the License and Notice to the end user
6) Do not upload on OpenUserJS.org or any other site that infringes on this license

TimidScript's Homepages:  GitHub:      https://github.com/TimidScript
                          GreasyFork:  https://greasyfork.org/users/1455
*/
/* Information
**************************************************************************************************
 Version History
------------------------------------
1.0.29.2 (2017-02-02)
 - Uploaded latest version
1.0.28 (2016-05-27)
 - Altered Licence
 - Added latest scripts column to the front page to give more coverage to new scripts
 - Bug fixes to changes in OUJS library page
1.0.27 (2016-05-25)
 - Moving to GreasyFork and preparing to remove OUJS files
1.0.26f (2016-04-10)
 - updateURL added
1.0.26e (2016-04-03)
 - Changed license to GPL-3
1.0.26 (2016-02-27)
 - Ratings bar and "Flaggins" are now separate elements, so removed unnecessary code and notice.
 - Removed flagged information as it seems admin hide it so might as well hide it also.
1.0.25 (2015-09-06)
 - Interval check for new issues every 3 minutes
 - Option to display new issue count in title. Need to set GM_setValue("EditTitle",1);
 - Highlight username in forums.
1.0.24 (2015-07-16)
 - Bug Fix: Correctly handle negative ratings
1.0.23 (2015-07-16)
 - Changed the styling of blockquote
1.0.22 (2015-06-25)
 - Bug Fix: Rating count is wrong when it is 0 and flagged
 - Unhide the progress bar elements
 - On script replaced the deceptive ratings bar and change the way information if conveyed.
 - No longer altering the profile page URL. Removed the search box from profile page
 - Columns sort order highlighted in listings
 - Removed cloneInto as it's no longer needed
 - Script icon now base64
 - Removed scripts are no longer listed in the History Chart
1.0.21 (2015-06-10)
 - Changed the colours of the issues on the forum
 - Changed progress-bar colouring
 - Bug Fix: Total rating in author script listing now shows both negative and positive count
1.0.20 (2015-05-14)
 - Closed issues are now in red while open ones are in a brighter green.
 - Small bug fixes
1.0.19 (2015-04-13)
 - Added ability to remove a history record. This is used when certain dates get corrupted.
1.0.18 (2015-01-22)
 - Bug fix for version 1.0.17 which broke support for other browsers.
 - Bug fix to support querySelector in Opera and Chrome. "Discussions" links use ".getAttribute" instead of ".href"
1.0.17 (2015-01-17)
 - Bug fixes to handle new changes in OUJS layout
 - Issue count now decrements
 - Provided a fix for the trash values created due to FireFox 35 breaking of GM_listValues API.
1.0.16 (2015-01-04)
 - Handles Lazy loading of icons in profile page
 - Created icon for libraries
1.0.15 (2014/12/27)
 - Bug fix in sorting installs and ratings in other users profiles
 - "Discuss" now points to All discussion board.
 - Change in forum interface to make it better with one click access to other boards.
 - Changed the dual colour scheme on issues forum to one
1.0.14 (2014/11/29)
 - More visible highlight colour for one's own script discussions on the forum
 - Bug fixes to deal with new OUJS layout
 - Bug fix to total count in history chart
1.0.13 (2014/11/01)
 - Bug Fix: Copy button text changed from @grant to @require
1.0.12 (2014/11/01)
 - Fixed it so it works on Opera and Chrome
 - It now displays "History Period Installs Chart" if the length is more than 0 as oppose to 3.
1.0.11 (2014/10/31)
 - Fixed Bug caused by console debug iteration
1.0.10 (2014/10/24)
 - Bug Fix on history cleanup
 - Changes in CSS for profile comments
1.0.9 (2014/10/18)
 - Bug Fix in history cleanup
 - Stats history takes into account deleted and new scripts
 - Negative stat is now shown in brackets
 - History Chart always at the bottom of page
  - Renamed "Top Installs During Period" chart
 - Added frame and margin to images
 - Correct handling of singular and plural period nouns
 - Changed the history spacing
 - Added wait period between new issues checks. Maximum of once every 20 seconds
 - Selected table header highlight is more visible and saves last sort order
1.0.8 Initial public release (2014/10/01)
 - Improved table view with numbering.
 - All profile scripts listed on one page
 - Script are listed on profile page also, so no need to click on Scripts tab
 - User scripts ordered by type (Script, Library and defunct)
 - Stats history for installs and ratings with sensible time spacing
 - Top install listing
 - Profile table view sort implemented within the script
 - Notification on issues raised on users scripts
 - Notification on the forum
 - Stores logged username so you do not need to be logged in to get script stats and notifications
 - Changed the interface of library scripts
 - Added copy button on library
 - List all author's scripts in profile tab.
 - List all author's scripts in one page
 - Limits size of image in frame on forum and icon size in library page
********************************************************************************************/


/*=================================================================================================*/
//      [VYCS] VARIABLE YOU CAN SET
//----------------------------------------
// GM_setValue("HistoryMIN",5); //Stats history, minimum number of consective days stored. Default 5.
// GM_setValue("HistoryMAX",5); //Stats history, minimum number of mins stored. Default 15
/*=================================================================================================*/

if (window !== window.top) return;
//GM_setValue("EditTitle", 1); //Uncomment line to allow issue count to be displayed on title. Once run once, you need to update the script to re-enable auto-update.
var HistoryMIN = parseInt(GM_getValue("HistoryMIN", 5));  //Stats history, minimum number of mins stored
var HistoryMAX = parseInt(GM_getValue("HistoryMAX", 15)); //Stats histry, maximum number of dates stored


console.info("OUJS-1 is Running");


var DAY = 86400000;

function ToggleIssuesView(discuss, issues)
{
    discuss.onmouseover = MouseOver;
    discuss.onmouseleave = MouseLeave;
    issues.onmouseover = MouseOver;
    issues.onmouseleave = MouseLeave;

    function MouseOver()
    {
        clearTimeout(document.to);
        issues.style.display = "block";
    }

    function MouseLeave()
    {
        document.to = setTimeout(function () { issues.style.display = "none"; }, 500);
    }
}

function RemoveNotice(e)
{
    var meta = JSON.parse(GM_getValue("USER-P:" + this.getAttribute("username")));
    meta[this.postID] = this.postdata;
    GM_setValue("USER-P:" + this.getAttribute("username"), JSON.stringify(meta));

    document.getElementById("newIssues").textContent = (parseInt(document.getElementById("newIssues").textContent) - 1);

    TSL.removeNode(this.parentElement);
    if (!document.querySelector("#IssuesListing li")) TSL.removeNode("IssuesListing");
}


function ClickedHistory(e)
{
    TSL.removeClass(this.parentElement.getElementsByClassName("selected")[0], "selected");
    TSL.addClass(this, "selected");
    DisplayStats(this.data, this.parentElement.data);
}

function DisplayStats(old, current)
{
    var totalR, totalI = totalIN = totalNew = totalRp = totalRn = 0, row, sups = document.querySelectorAll(".dStatP, .dStatN, .dStatZ, .dStatNew");

    var tmpStamp = Date.now();

    for (var i = 0; sups && i < sups.length; i++) TSL.removeNode(sups[i]);
    TSL.removeNode("TopTen");

    var arr = [];
    for (var scriptID in current)
    {
        row = document.querySelector('tr[scriptid="' + scriptID + '"]');

        if (scriptID == "timestamp") continue;
        else if (!row) arr.push({ name: GM_getValue(scriptID), installs: -1 }); //Removed Items
        else if (old[scriptID])
        {
            row.tempStamp = tmpStamp;
            var diff = current[scriptID].installs - old[scriptID].installs;
            if (isNaN(diff)) diff = 0;
            totalI += diff;
            if (diff < 0) totalIN += diff; //Can happen when you remove and then re-add the script
            if (diff) row.querySelector("td:nth-child(2) p").appendChild(TSL.createElementHTML("<sup class='dStat" + ((diff > 0) ? "P" : "N") + "'>" + diff + "</sup>"));

            if (diff) arr.push({ name: row.querySelector("b").textContent, installs: diff });

            diff = current[scriptID].rating - old[scriptID].rating;
            if (isNaN(diff)) diff = 0;
            if (diff > 0) totalRp += diff;
            else if (diff < 0) totalRn += diff;
            if (diff) row.querySelector("td:nth-child(3) p").appendChild(TSL.createElementHTML("<sup class='dStat" + ((diff > 0) ? "P" : "N") + "'>" + diff + "</sup>"));
        }
    }

    var rows = document.querySelectorAll(".col-xs-12 .table .tr-link");
    for (var i = 0, installs; i < rows.length, row = rows[i]; i++)
    {
        if (row.tempStamp != tmpStamp)
        {
            installs = parseInt(row.getAttribute("installs"));
            totalI += installs;
            totalNew += installs;
            row.querySelector("td:nth-child(2) p").appendChild(TSL.createElementHTML("<sup class='dStatNew'>" + installs + "</sup>"));
            arr.push({ name: row.querySelector(".tr-link-a > b").textContent, installs: installs, isNew: true });
        }
    }

    if (totalI) document.querySelector(".table thead th:nth-child(2) a").appendChild(TSL.createElementHTML("<sup class='dStat" + ((totalI > 0) ? "P" : "N") + "'>"
        + totalI + (function ()
        {
            if (totalI != totalIN && totalIN < 0) return "<span style='color: red;'>[" + totalIN + "]</span>"
            return "";
        })() + "</sup>"));



    totalR = totalRp + totalRn;
    if (totalRp || totalRn) document.querySelector(".table thead th:nth-child(3) a").appendChild(TSL.createElementHTML("<sup class='dStat" + ((totalR == 0) ? "Z" : (totalR > 0) ? "P" : "N") + "'>"
        + totalR +
        (function ()
        {
            if (totalRp && totalRn)
            {
                return "<span style='color:black;'>[<span style='color:green;'>" + totalRp + "</span><span style='color:red;'>" + totalRn + "</span>]</span>";
            }
            return "";
        })() + "</sup>"));

    if (arr.length == 0) return;
    arr.sort(function (a, b)
    {
        if (a.installs < b.installs) return -1;
        if (a.installs > b.installs) return 1;

        return 0;
    });
    arr.reverse();

    var panel = document.createElement("div");
    panel.className = "panel panel-default";
    panel.id = "TopTen";
    panel.appendChild(document.createElement("div"));
    document.querySelector(".container-fluid.col-sm-4").appendChild(panel);

    panel = panel.firstElementChild;
    panel.className = "panel-body";

    var el = document.createElement("h3");
    el.innerHTML = "History Period Installs Chart (<span style=\"color:green;\">" + totalI + "</span>)";
    panel.appendChild(el);

    var ol = document.createElement("ol");
    ol.setAttribute("style", "font-size:14px; font-weight: 500;");
    panel.appendChild(ol);

    while (arr.length > 0)
    {
        if (arr[0].installs >= 0)
        {
            el = document.createElement("li");
            if (arr[0].installs < 0) el.innerHTML = arr[0].name + " (<span style='color:red; font-weight: 700;'>Removed</span>)";
            else if (arr[0].isNew) el.innerHTML = arr[0].name + " (<span style='color:blue; font-weight: 700;'>" + arr[0].installs + "</span>)";
            else el.innerHTML = arr[0].name + " (<span style='color:green; font-weight: 700;'>" + arr[0].installs + "</span>)";
            ol.appendChild(el);
        }
        arr.shift();
    }
}



function addScriptListingNumbers()
{
    TSL.addStyle("ScriptNumbers", ".script_number {display: inline-block; margin: 0 1px 0 0 !important; background-color: #2C3E50; color: white; padding: 1px 2px 0 2px; margin: 0; border-radius: 3px; font-size: 13px; line-height: 13px; font-family: 'Courier New', Courier, monospace;}"
        + ".col-sm-8 .table .tr-link td {vertical-align: middle !important; }"
        + ".col-sm-8 .table .tr-link td .progress { margin-bottom: 0px; }"
        //+ ".col-sm-8 .table .tr-link td:nth-child(2) p {margin-bottom: 14px;}"
    );

    var sn = document.getElementsByClassName("script_number");
    while (sn.length > 0) TSL.removeNode(sn[0]);

    var start = document.querySelector(".pagination .active a");
    if (start) start = (parseInt(start.textContent) - 1) * 25 + 1;
    else start = 1;

    var rows = document.querySelector(".table");
    rows = rows.querySelectorAll(".tr-link");
    if (!rows) return;
    var prefix = "".lPad("0", rows.length.toString().length);
    for (var i = 0, row, cell; i < rows, row = rows[i]; i++)
    {
        var counter = document.createElement("span");
        counter.className = "script_number";
        counter.textContent = (prefix + (i + start)).slice(-1 * prefix.length);
        row.firstElementChild.insertBefore(counter, row.firstElementChild.children[0]);
    }
}

function SortScriptTable(e)
{
    e.stopImmediatePropagation();

    var sortDescending = !TSL.hasClass(this.parentElement, "descen");
    if (document.querySelector(".descen, .ascen")) TSL.removeClass(document.querySelector(".descen, .ascen"), "descen ascen");
    TSL.addClass(this.parentElement, ((sortDescending) ? "descen" : "ascen"));

    var tbody = document.querySelector(".table tbody");
    var rows = tbody.getElementsByClassName("tr-link");

    var idx = this.parentElement.cellIndex;
    GM_setValue("SortHeader", idx);
    GM_setValue("SortDescending", sortDescending);

    for (var n, i = 0; i < rows.length - 1; i++)
    {
        n = i;
        for (var j = i + 1; j < rows.length; j++)
        {
            if ((sortDescending && compareRows(rows[n], rows[j]) < 0) || (!sortDescending && compareRows(rows[n], rows[j]) > 0))
            {
                n = j;
            }
        }

        if (n != i) tbody.insertBefore(rows[n], rows[i]);
    }

    //row1 less it's negative otherwise positive
    function compareRows(row1, row2)
    {
        if (TSL.hasClass(row1, "header_row") || TSL.hasClass(row2, "header_row")) return 0;
        if (TSL.hasClass(row1, "_library") || TSL.hasClass(row1, "_defunct")) return 0;
        if (TSL.hasClass(row2, "_library") || TSL.hasClass(row2, "_defunct")) return 0;

        var selector = "b", val1, val2;
        if (idx == 1) selector = "td:nth-child(2) p";
        else if (idx == 2) selector = "td:nth-child(3) p";
        else if (idx == 3) selector = "td:nth-child(4) time";


        if (idx == 0)
        {
            val1 = row1.querySelector(selector).textContent.toLowerCase();
            val2 = row2.querySelector(selector).textContent.toLowerCase();
        }
        else if (idx == 1)
        {
            if (row1.hasAttribute("installs"))
            {
                val1 = parseInt(row1.getAttribute("installs"));
                val2 = parseInt(row2.getAttribute("installs"));
            }
            else
            {
                val1 = parseInt(row1.querySelector(selector).textContent);
                val2 = parseInt(row2.querySelector(selector).textContent);
            }
        }
        else if (idx == 2)
        {
            if (row1.hasAttribute("rating"))
            {
                val1 = parseInt(row1.getAttribute("rating"));
                val2 = parseInt(row2.getAttribute("rating"));
            }
            else
            {
                val1 = parseInt(row1.querySelector(selector).textContent);
                val2 = parseInt(row2.querySelector(selector).textContent);
            }
        }
        else if (idx == 3)
        {
            val1 = new Date(row1.querySelector(selector).getAttribute("datetime")).getTime();
            val2 = new Date(row2.querySelector(selector).getAttribute("datetime")).getTime();
        }

        if (val1 < val2) return -1;
        if (val1 > val2) return 1;

        return 0;
    }

    addScriptListingNumbers();
    return false;
}


//Fix broken saved data caused by FireFox 35 security issues
(function ()
{
    if (GM_getValue("HasBeenFixed", false)) return;
    alert("Due to changes in FireFox 35 GreaseMonkey GM_listValues got broken and with it, it has ruined OUJS-1 save. This will attempt to fix it. If it fails then remove, restart firefox and install again");

    var scriptIDsPresent = {};

    var usernames = getSavedUsernames();
    for (var i = 0; i < usernames.length; i++)
    {
        UpdateFireFox35BrokenData(usernames[i]);
    }


    var id, ids = GM_listValues();
    for (var i = ids.length - 1; i >= 0, id = ids[i]; i--)
    {
        if (id.match(/s\d\d\d\d/i) && !scriptIDsPresent[id])
        {
            GM_deleteValue(id);
        }
    }
    GM_setValue("HasBeenFixed", true);


    function UpdateFireFox35BrokenData(username)
    {
        var name,
        remove = false,
        updated = false,
        scriptNames = {},
        meta = JSON.parse(GM_getValue("USER-S:" + username));

        for (var i = 0; i < meta.history.length; i++)
        {
            remove = false;
            for (var key in meta.history[i])
            {
                if (key.match(/s\d\d\d\d/i))
                {
                    name = GM_getValue(key);

                    if (!scriptNames[name])
                    {
                        //console.log(name, key, scriptNames[name]);
                        scriptNames[name] = key;
                        scriptIDsPresent[key] = name;
                    }
                    else if (scriptNames[name] != key) //Value introduced after FF35 update and is invalid
                    {
                        updated = true;
                        remove = true;
                    }
                }
            }

            if (remove)
            {
                meta.history.splice(i, 1);
                i = 0;
            }
        }

        if (updated)
        {
            meta.current = meta.history[meta.history.length - 1];
            console.log(meta.current);
            GM_setValue("USER-S:" + username, JSON.stringify(meta));
        }
    }

    function getSavedUsernames()
    {
        var arr = new Array();
        var names = GM_listValues();

        for (var i = 0; i < names.length; i++)
        {
            if (names[i].match(/^USER-S:/))
            {
                arr.push(names[i].substr(7));
            }
        }

        return arr;
    }
})();

(function ()
{
    if (document.getElementsByClassName("navbar-brand").length) document.getElementsByClassName("navbar-brand")[0].innerHTML = 'OpenUserJS-1 <sub><a href="https://greasyfork.org/en/users/1455" style="font-size:0.6em; color: cyan;">TimidScript</a></sub>';
    var timestamp = Date.now();
    var loggedUsername = "";

    TSL.addStyle("ppp", ".progress {background-color: #E74C3C;} .progress-bar-good {background-color: #499E49;} .progress * {color: white;}");
    TSL.addStyle("Image-Limiter", ".user-content img, .topic-post-contents img {max-width: 98%; border: 1px solid blue; padding: 2px; color: yellow; margin: 5px 0; box-shadow: 5px 5px 2px #888888;}"
        + ".topic-post-contents img:last-child {margin-bottom: 10px;}"
        );
    TSL.addStyle("BetterQuotes", 'blockquote {font-size:14px;font-style: italic;border-left: 7px solid #DFE1E1;margin: 10px 30px;padding: 0px 5px; }');

    TSL.addStyle("OUJS-ORDER", ".descen {background-color: rgba(200,255,255,0.6);} .ascen {background-color: rgba(255,220,255, 0.6);} ");
    //#F0DDFD #DAFBF6 #C2F4F7 #FF0

    if (document.querySelector(".fa-sign-out") != undefined)
    {
        loggedUsername = document.querySelector('ul li a[href^="/users/"]').textContent;

        var meta = GM_getValue("USER-S:" + loggedUsername);
        if (!meta) //Create new user data.
        {
            meta = {};
            meta.current = {};
            meta.history = new Array();
            GM_setValue("USER-S:" + loggedUsername, JSON.stringify(meta));
        }

        meta = GM_getValue("USER-P:" + loggedUsername);
        if (!meta)
        {
            GM_setValue("USER-P:" + loggedUsername, JSON.stringify({}));
        }

        //perform cleanup by deleting old post records
        var names = getSavedUsernames();
        for (var i = 0; i < names.length; i++)
        {
            var meta = JSON.parse(GM_getValue("USER-P:" + names[i]));

            for (var key in meta)
            {
                if (timestamp - meta[key].timestamp > DAY * 14) //30 Days
                {
                    delete meta[key];
                    GM_deleteValue(key);
                }
            }

            GM_setValue("USER-P:" + names[i], JSON.stringify(meta));
        }
    }

    document.querySelector("nav a[href='/forum']").href = "/all"; //Change the "Discuss" link to point directly to "All"
    var pathname = document.location.pathname;
    if (pathname.match(/^\/$|^\/group\/\w+|^\/groups/))
    {
        console.log("OUJS-1: Scripts/Library/Groups listings");
        addLibraryIcons();
        addScriptListingNumbers();

        var columns = columns = ["name", "installs", "rating", "updated"],
            search = document.location.search,
            orderBy = search.match(/orderBy=(\w+)/i);

        orderBy = (orderBy) ? orderBy[1] : "rating";

        if (search.match(/library/i)) columns = ["name", "rating", "updated"];
        else if (pathname.match(/group/i)) columns = ["name", "size", "rating"];

        TSL.addClass(document.querySelector(".panel > table >  thead th:nth-child(" +
            (function ()
            {
                for (var i = 0; i < columns.length; i++)
                {
                    console.log(i, columns[i].toLowerCase(), orderBy);
                    if (orderBy.toLowerCase() == columns[i].toLowerCase()) return i + 1;
                }
                return 3;
            }
            )() + ")"), ((search.match(/orderDir=asc/i)) ? "ascen" : "descen"));

        if (!pathname.match(/^\/$/)) return;

        //Display latest script on the right side column
        var latestURL = document.URL.replace(/orderBy=\w+&orderDir=\w+/, "orderBy=updated&orderDir=desc");
        if (!latestURL.match("orderBy=updated&orderDir=desc"))
        {
            latestURL = latestURL.replace(/(\?|$)/,"?orderBy=updated&orderDir=desc&");
            latestURL = latestURL.replace(/\?&/,"?");
            latestURL = latestURL.replace(/\&$/,"");
        }

        var rcoloumn = document.querySelector(".col-sm-4");
        var panel = document.createElement("div");
        panel.className = "panel panel-default";
        panel.innerHTML = '<a class="panel-heading"><div class="panel-title">Latest Updated Scripts</div></a>';
        rcoloumn.appendChild(panel);

        xhrPage(latestURL, function()
        {
            //console.log("
        });
    }
    else if (pathname.match(/^\/users\/\w+$/i)) //User profile page
    {
        console.log("OUJS-1: Profile page");
        var container = document.getElementsByClassName("container-fluid")[0];
        getScriptListings(document.URL + "/scripts/?p=1");

        //Search box
        //document.getElementsByClassName("col-sm-4")[0].innerHTML += '<div class="panel panel-transparent"><div class="input-group col-xs-12"><form action="" method="get"><div class="input-group col-xs-12"><input name="q" placeholder="Search Profile Scripts" class="search form-control" value="" type="text"><span class="input-group-btn"><button class="btn btn-default" type="submit"><i class="fa fa-search"></i></button></span></div></form></div></div>';
        //window.history.pushState(null, "", document.URL + "/scripts"); //Change document URL
    }
    else if (pathname.match(/^\/users\/.+\/comments/i)) //User profile comments page
    {
        console.log("OUJS-1: Profile comments page");
        TSL.addStyle("UserScripts", ".topic-title .breadcrumb {margin-bottom: 0px;}");
    }
    else if (pathname.match(/^\/users\/\w+\/scripts/i)) //User script listing
    {
        TSL.addStyle("UserScripts", "ul.pagination {display: none;}");
        var nextpage = document.querySelector("ul.pagination > .active + li > a");
        if (nextpage) getScriptListings(nextpage.href);
        else if (document.querySelector(".table .tr-link")) amendUserScriptListing();
    }
    else if (pathname.match(/^\/scripts\/[^\/]+\/[^\/]+$/i)) //Script page
    {
        console.log("OUJS-1: Scripts page");
        scriptPageAmendRateArea();
    }
    else if (pathname.match(/^\/(all|issues|garage|corner|discuss|announcements)$/))
    {
        console.log("OUJS-1: Forum");
        TSL.addStyle("NinjaStyle", ".breadcrumb {padding: 8px; }  .breadcrumb > li + li {margin-left: 2px;} .breadcrumb > li + li:before { content: ''; padding: 0px;} .breadcrumb > li {width: 120px; text-align:center; border: 1px solid #CFD2D2; border-radius: 5px; } ");
        var el = document.querySelector(".breadcrumb");
        //el.className = "fishMonkey";
        el.innerHTML = '<li><a href="/all" title="Amalgamation of all discussion boards">All</a></li>' +
                       '<li><a href="/issues" title="Issues raised on scripts">Script Issues</a></li>' +
                       '<li><a href="/garage" title="Get help with script development">Developer Help</a></li>' +
                       '<li><a href="/corner" title="Propose ideas and request user-scripts">Script Requests</a></li>' +
                       '<li><a href="/discuss" title="Off-topic discussions">General</a></li>' +
                       '<li><a href="/announcements" title="Official site announcements">Announcements</a></li>';


        TSL.addStyle("WoloSD3", ".selectedDiscuss {background-color: #CACAF5; border-color: #00F !important;} .selectedDiscuss a {color: #00F;}");
        el.querySelector("li > a[href='" + pathname + "']").parentNode.className = "selectedDiscuss";
    }
    else if ((pathname.match(/^\/libs\/[^\/]+\/[^\/]+$/i))) amendLibraryPage();

    displayNewIssues();

    function displayNewIssues()
    {
        if (pathname.match(/^\/(issues|forum|all|corner|garage|discuss|announcements)/))
        {
            var usernames = getSavedUsernames();
            for (var i = 0, username; i < usernames.length, username = usernames[i]; i++)
            {
                var els = document.querySelectorAll('.label-info a[href="/users/' + username + '"]');
                for (var j = 0; j < els.length; j++) els[j].parentElement.style.backgroundColor = "#6AB046";
            }
        }

        if (pathname.match(/^\/(issues|forum|all)/))
        {
            TSL.addStyle("ForumHelper", "body .table .scriptIssues td {background-color: #BCF3F3 !important;}"
                + ".scriptIssues .tr-link-a, .scriptIssues td:nth-child(2) * {color: #04A263 !important;}"
                + "body .table .scriptIssues.closed td {background-color: #ECEDED !important;}"
                + ".scriptIssues.closed .tr-link-a, .scriptIssues.closed td:nth-child(2) * {color: gray !important;}"
                + "body .table .newposts td:nth-child(4) {color: red;}"
                + "body .table .newposts td:nth-child(4) sup {color: green;}"
                + "#newIssues {background-color: #D6FDF7; padding: 1px 20px; font-weight: 600; color: green;}"
                + "#newIssues span {margin-right: 30px;}"
                );

            var notice = document.createElement("div");
            notice.id = "newIssues";
            var usernames = getSavedUsernames();
            document.querySelector(".table-responsive").parentElement.insertBefore(notice, document.querySelector(".table-responsive"));
            for (var i = 0, username; i < usernames.length, username = usernames[i]; i++)
            {
                var c = getNewPostCount(username);
                if (c.length > 0)
                {
                    var el = document.createElement("span");
                    if (usernames.length > 1) el.textContent = "(" + username + ") ";
                    el.textContent += "New posts detected on " + c.length + " issues/threads";
                    notice.appendChild(el);
                }
            }

            if (!notice.textContent) notice.textContent = "No new issues detected";
            return;
        }

        if (window.sessionStorage.getItem("NewIssuesStamp") && Date.now() - window.sessionStorage.getItem("NewIssuesStamp") < 20000)
        {
            var doc = document.implementation.createHTMLDocument("OUJS");
            doc.documentElement.innerHTML = window.sessionStorage.getItem("NewIssuesDoc");
            NewIssues(doc);
        }
        else
        {
            GetIssueCount();
            setInterval(GetIssueCount, 6000);
            //setInterval(GetIssueCount, 180000);
        }

        function GetIssueCount()
        {
            xhrPage("https://openuserjs.org/issues", function (xhr, doc)
            {
                if (doc)
                {
                    window.sessionStorage.setItem("NewIssuesDoc", xhr.responseText);
                    window.sessionStorage.setItem("NewIssuesStamp", Date.now());
                    NewIssues(doc);
                }
            });
        }

        function NewIssues(doc)
        {
            TSL.removeNode("TheIssueCounter");
            TSL.removeNode("IssueNoticeBoard");
            if (GM_getValue("EditTitle")) document.title = document.title.replace(/^\[\d+\]\s*/, "");

            var count = 0;
            var usernames = getSavedUsernames();
            var issues = document.createElement("section");
            issues.id = "IssueNoticeBoard";
            issues.appendChild(document.createElement("ul"));

            for (var i = 0, username, arr; i < usernames.length, username = usernames[i]; i++)
            {
                var meta = JSON.parse(GM_getValue("USER-P:" + username));
                var updated = false;
                arr = getNewPostCount(username, doc);
                count += arr.length;
                for (var j = 0, li; j < arr.length; j++)
                {
                    li = TSL.createElementHTML("<li><a href='" + arr[j].url + "'>" + arr[j].postTitle + "</a></li>");
                    li.appendChild(TSL.createElementHTML("<span>❌</span>"));
                    issues.firstElementChild.appendChild(li);

                    li.lastElementChild.onclick = RemoveNotice;
                    li.lastElementChild.postdata = { timestamp: timestamp, replies: arr[j].replies };
                    li.lastElementChild.postID = arr[j].postID;
                    li.lastElementChild.setAttribute("username", username);

                    if (loggedUsername == username && decodeURI(document.location.pathname) == decodeURI(arr[j].url))
                    {
                        meta[arr[j].postID] = {}
                        meta[arr[j].postID].timestamp = timestamp;
                        meta[arr[j].postID].replies = arr[j].replies;
                        updated = true;
                    }
                }

                if (updated) GM_setValue("USER-P:" + username, JSON.stringify(meta));
            }

            if (count > 0)
            {
                if (GM_getValue("EditTitle")) document.title = "[" + count + "] " + document.title;
                var discuss = document.querySelector('.nav a[href="/all"]');
                var counter = document.createElement("span");
                counter.id = "TheIssueCounter";
                counter.style.marginLeft = "3px";
                discuss.appendChild(counter);
                counter.innerHTML += '(<span id="newIssues" style="color: lime; display:inline-block; font-weight: 600;">' + count + '</span>)';

                TSL.addStyle("OUJS-IL-BT", "#IssuesListing {position: absolute;background-color: #2C3E50; color: white; font-weight: 600; z-index: 99999;"
                    + "font-size:12px; padding: 3px 8px; color: white; border: 1px solid black; box-sizing: border-box;}"
                    + "#IssuesListing ul {margin: 0; padding-left: 10px;}"
                    + "#IssuesListing a {display: inline-block; color: orange; }"
                    + "#IssuesListing li:hover {background-color: #435A71;}"
                    + "#IssuesListing span {color: red; margin-left: 15px; cursor: default; display: inline-block;"
                    );

                issues.id = "IssuesListing";
                document.body.appendChild(issues);

                var pos = TSL.getAbsolutePosition(discuss.parentElement);
                issues.style.top = (discuss.clientHeight + pos.top) + "px";
                if (issues.clientWidth + pos.left - 10 > window.innerWidth) issues.style.right = "2px";
                else issues.style.left = (pos.left - 30) + "px";

                TSL.addStyle("OUJS-IL-BT2", "#IssuesListing {display: none;}");

                ToggleIssuesView(discuss, issues);
            }
        }
    }

    function getScriptListings(url)
    {
        xhrPage(url, xhrCallback);

        function xhrCallback(xhr, doc)
        {
            if (!doc) return;
            var tb = document.querySelector(".table tbody");
            var scripts = doc.getElementsByClassName("tr-link");
            if (tb)
            {
                while (scripts.length > 0) tb.appendChild(scripts[0]);
            }
            else
            {
                var container = document.getElementsByClassName("col-xs-12")[0];
                var scriptPanel = doc.getElementsByClassName("panel panel-default")[0];
                container.appendChild(document.importNode(scriptPanel, true));
            }

            var nextpage = doc.querySelector("ul.pagination > .active + li > a");
            if (nextpage) getScriptListings(document.location.origin + nextpage.href, xhrCallback);
            else amendUserScriptListing();
        }
    }

    function amendUserScriptListing()
    {
        TSL.addStyle("CoolColors", ".header_row {padding: 0; font-size: 16px;}"
            + ".header_row > td {padding: 0 10px !important; font-weight: 700;}"
            + "tr._defunct {background-color: #FFF5F3;}"
            + "tr.header_row._defunct {background-color: pink; color: red;}"
            + "tr._library {background-color: #F7FDF7;}"
            + "tr.header_row._library {background-color: #ACF9AC; color: green;}"
            );

        var tbody = document.querySelector(".table tbody");
        //var tbody = document.createElement("tbody");
        var rows = tbody.querySelectorAll(".tr-link");

        ////Put libraries at the bottom of the table
        var added = false;
        for (var i = 0, row, row2, cell; i < rows, row = rows[i]; i++)
        {
            if (!row.querySelector(".script-version"))
            {
                if (!added)
                {
                    added = true;
                    row2 = tbody.insertRow(-1);
                    row2.className = "header_row _library";
                    cell = row2.insertCell(-1);
                    cell.setAttribute("colspan", 5);
                    cell.textContent = "Libraries";
                }
                TSL.addClass(row, "_library");
                tbody.appendChild(row);
            }
        }

        //Put defunct scripts at the bottom of the table
        added = false;
        for (var i = 0, row, row2, cell; i < rows, row = rows[i]; i++)
        {
            var version = row.querySelector(".script-version")
            if (version && version.textContent.match(/defunct|depreciated|obselete/i))
            {
                if (!added)
                {
                    added = true;
                    row2 = tbody.insertRow(-1);
                    row2.className = "header_row _defunct";
                    cell = row2.insertCell(-1);
                    cell.setAttribute("colspan", 5);
                    cell.textContent = "Depreciated scripts that are no longer begin supported";
                }
                TSL.addClass(row, "_defunct");
                tbody.appendChild(row);
            }
        }

        TSL.addStyle("HeaderPointer", ".col-xs-12 .table th a {cursor: pointer;}");
        var headers = document.querySelectorAll(".table thead th a");
        for (var i = 0; i < headers.length; i++)
        {
            headers[i].removeAttribute("href");
            headers[i].onclick = SortScriptTable;
        }

        appendHistory();
        addLibraryIcons();

        //Load missing icons. Occurs in profile page
        els = document.querySelectorAll("i.fa.fa-fw.fa-file-code-o");
        for (var i = 0, el, img; i < els.length; i++)
        {
            el = els[i];
            img = document.createElement("img");
            img.src = el.parentElement.getAttribute("data-icon-src");
            el.parentElement.appendChild(img);
            TSL.removeNode(el);
        }

        var idx = GM_getValue("SortHeader", 3);
        var SortAscending = !GM_getValue("SortDescending", true);
        headers[idx].click();
        if (SortAscending) headers[idx].click();
        //addScriptListingNumbers();
    }

    function addLibraryIcons()
    {
        TSL.addStyle("IconReplacer", ".script-icon, .script-icon img {display:inline-block; height: 16px; width: 16px;}")
        var els = document.querySelectorAll("._library .script-icon.hidden-xs i");
        if (document.location.search.match(/^\?library=/i)) els = document.querySelectorAll(".script-icon.hidden-xs i");
        for (var i = 0, el, img; i < els.length; i++)
        {
            el = els[i];
            img = document.createElement("img");
            img.src = "https://i.imgur.com/pFNqMgL.png"
            el.parentElement.appendChild(img);
            TSL.removeNode(el);
        }
    }

    function getUID(name, prefix)
    {
        if (!prefix) prefix = "s";
        var id, ids = GM_listValues();

        for (var i = 0; i < ids.length, id = ids[i]; i++)
        {
            if (id[0] == prefix && id.match(/.\d+$/) && GM_getValue(id) == name) return id;
        }

        while (true)
        {
            id = (prefix || "s") + ("0000" + Math.floor(Math.random() * 10000 + 1)).slice(-4);
            if (GM_getValue(id, 0) == 0)
            {
                GM_setValue(id, name);
                return id;
            }
        }
    }

    function appendHistory()
    {
        var username = document.querySelector(".user-name").textContent;
        var meta = GM_getValue("USER-S:" + username);
        if (!meta) return;

        TSL.addStyle("HistoricalColors", ".dStatZ {color: blue;} .dStatN {color: red;} .dStatP {color: green;} .dStatNew {color: blue;} .dStatP:before, .dStatNew:before { content: '+';} ");

        meta = JSON.parse(meta);
        var oldCurrent = meta.current;
        meta = JSON.parse(GM_getValue("USER-S:" + username));

        var rows = document.querySelectorAll(".table .tr-link");
        for (var i = 0, row; i < rows, row = rows[i]; i++)
        {
            var scriptname = row.querySelector(".tr-link-a > b").textContent;
            var scriptID = getUID(scriptname);
            rows[i].setAttribute("ScriptID", scriptID);

            data = {};
            data.installs = parseInt(row.querySelector("td:nth-child(2) p").textContent);
            data.rating = parseInt(row.querySelector("td:nth-child(3) p").textContent);
            row.setAttribute("installs", data.installs);
            row.setAttribute("rating", data.rating);
            meta.current[scriptID] = data;
        }

        meta.current.timestamp = timestamp;
        if (meta.history.length == 0 || timestamp - meta.history[meta.history.length - 1].timestamp >= DAY)
        {
            meta.history.push(meta.current);
        }

        DisplayStats(oldCurrent, meta.current);

        if (meta.history.length > HistoryMAX) //History Cleanup greater than
        {
            for (var i = 0, j = HistoryMAX - HistoryMIN; i < HistoryMAX - HistoryMIN; i++, j--)
            {
                if (timestamp - meta.history[i].timestamp > DAY * 7 * j)
                {
                    //console.log("GREATER", i, timePassed(meta.history[i].timestamp));
                    meta.history.splice(i, 1);
                    break;
                }
            }
        }
        if (meta.history.length > HistoryMAX) //History Cleanup less than
        {
            for (var i = HistoryMIN, j = 1; i < HistoryMAX; i++, j++)
            {
                if (timestamp - meta.history[i].timestamp < DAY * 7 * j)
                {
                    //console.log("LESSER", i, timePassed(meta.history[i].timestamp));
                    meta.history.splice(i, 1);
                    break;
                }
            }
        }
        //if (meta.history.length > HistoryMAX) console.log("mm", timePassed(meta.history[i].timestamp));
        if (meta.history.length > HistoryMAX) meta.history.splice(HistoryMIN - 1, 1); //Last Min Date

        GM_setValue("USER-S:" + username, JSON.stringify(meta));

        if (meta.history.length == 1 && meta.history[0].timestamp == meta.current.timestamp) return;

        TSL.addStyle("Panel-History", "#HistoryList {padding-left: 20px;} "
            + "#HistoryList li {cursor: pointer; background-color: #E0F9FF; border-radius: 5px; margin-bottom: 1px; padding: 0 5px;}"
            + "#HistoryList li:hover {background-color: #E9FFE0;}"
            + "#HistoryList li.selected {background-color: #FBE0FF;}"
            );

        var panel = document.createElement("div");
        panel.className = "panel panel-default";
        panel.appendChild(document.createElement("div"));
        document.querySelector(".container-fluid.col-sm-4").appendChild(panel);

        //Display History List
        panel = panel.firstElementChild;
        panel.className = "panel-body";

        var el = document.createElement("h3");
        el.textContent = "Stats History";
        panel.appendChild(el);

        el = document.createElement("ul");
        el.id = "HistoryList";
        panel.appendChild(el);

        el.data = meta.current;

        li = document.createElement("li");
        li.textContent = "Current: " + timePassed(oldCurrent.timestamp);
        li.data = oldCurrent;
        li.onclick = ClickedHistory;
        el.appendChild(li);

        for (var i = meta.history.length - 1, li, remove; i >= 0; i--)
        {
            if (meta.history[i].timestamp != meta.current.timestamp && meta.history[i].timestamp != oldCurrent.timestamp)
            {
                li = document.createElement("li");
                li.textContent = timePassed(meta.history[i].timestamp);
                li.data = meta.history[i];
                li.onclick = ClickedHistory;

                remove = document.createElement("span");
                remove.textContent = "❌"; //❎❌
                remove.setAttribute("style", "float: right; color: red;");
                remove.onclick = removeRecord;
                li.appendChild(remove);
                el.appendChild(li);
            }
        }

        el.firstElementChild.className = "selected";
        DisplayStats(oldCurrent, meta.current);

        function removeRecord(e)
        {
            e.stopImmediatePropagation();

            if (!confirm("Do you want to remove this history record?")) return;

            var meta = GM_getValue("USER-S:" + username);
            meta = JSON.parse(meta);
            var record = this.parentElement.data.timestamp;

            for (var i = 0; i < meta.history.length; i++)
            {
                if (meta.history[i].timestamp == record)
                {
                    meta.history.splice(i, 1);
                    GM_setValue("USER-S:" + username, JSON.stringify(meta));
                    TSL.removeNode(this.parentElement);
                    break;
                }
            }
        }


        function timePassed(old)
        {
            var days, hrs, mins, secs, ms, ret;

            ms = timestamp - old;
            secs = Math.floor(ms / (1000)) % 60;
            mins = Math.floor(ms / (60 * 1000)) % 60;
            hrs = Math.floor(ms / (60 * 60 * 1000)) % 24;
            days = Math.floor(ms / (60 * 60 * 1000 * 24) % 7);
            weeks = Math.floor(ms / (60 * 60 * 1000 * 24) / 7);

            if (weeks) return weeks + "week" + isPlural(weeks) + " and " + days + "day" + isPlural(days);
            if (days) return days + "day" + isPlural(days) + " and " + hrs + "hr" + isPlural(hrs);
            if (hrs) return hrs + "hr" + isPlural(hrs) + " and " + mins + "min" + isPlural(mins);
            return mins + "min" + isPlural(mins) + " and " + secs + "sec" + isPlural(secs);

            function isPlural(val)
            {
                if (val == 1) return "";

                return "s";
            }
        }
    }

    function amendLibraryPage()
    {
        TSL.addStyle("LibOS", ".form-group {margin-bottom: 5px;} #copyBox {text-align: right; } #copyBtn{cursor:pointer; display: inline-block;"
        + "color: #273646; border-radius: 5px; border: 1px solid #273646; background-color: #D6D6F5; width: 140px; text-align:center;}"
        + ".input-group .form-control {cursor: default}"
        + "#masterScripts .script-icon img {width: 26px; height: 26px;}"
        + "#masterScripts ul {padding: 5px; font-size: 12px;}"
        + "#masterScripts li {margin-bottom: 3px;}"
        );


        scriptPageAmendRateArea();

        var require = document.querySelector(".input-group .form-control");
        require.value = require.value.replace(/^http:/i, "https:");
        require.readOnly = true;

        var copyBox = document.createElement("div");
        copyBox.id = "copyBox";
        copyBox.innerHTML = "<span id='copyBtn'>Copy to Clipboard</span>";

        copyBox.firstChild.setAttribute("meta", "// @require\t\t" + require.value);
        copyBox.firstChild.onclick = function (e)
        {
            GM_setClipboard(this.getAttribute("meta"));
            this.textContent = "Copied";
            this.style.backgroundColor = "#FBF6AB";
            setTimeout(function (btn) { btn.textContent = "Copy to Clipboard"; btn.style.backgroundColor = null; }, 2000, this);
        }

        var scriptmeta = document.querySelector(".script-meta");
        scriptmeta.parentElement.insertBefore(copyBox, scriptmeta);

        var panel = document.querySelector(".col-sm-8 .panel.panel-default > .panel-body > h4");
        if (panel)
        {
            panel.textContent += " (" + panel.parentElement.getElementsByTagName("li").length + ")";
            panel = panel.parentElement.parentElement;
            panel.id = "masterScripts";
            var side = document.querySelector(".col-sm-4");
            side.appendChild(panel);
            //panel.getElementsByTagName("ul")[0].style.paddingLeft = "30px";
        }
    }

    function scriptPageAmendRateArea()
    {
        var pd = document.querySelector(".col-sm-4.container-fluid .panel-default .panel-body");

        //Encourage rating
        var notice = document.createElement("div");
        notice.textContent = "If you like the script, show your appreciation to the author by rating and favouring it.";
        notice.setAttribute("style", "padding: 0 10px; color: red; font-weight: 700; border-radius: 5px; background-color: yellow;");
        pd.appendChild(notice);

        var rating = parseInt(pd.querySelector(".row p").textContent.match(/-?\d+$/)[0]),
            votes = parseInt(pd.querySelector(".progress-bar-good").textContent),
            votes = isNaN(votes) ? 0 : votes,
            votesDown = (votes - rating) / 2,
            flags = parseInt(pd.querySelector(".progress-bar-danger").textContent),
            bar1 = pd.querySelector(".progress");

        bar1.firstElementChild.innerHTML = "<span style='color: yellow;'>+" + (votes - votesDown) + "</span>";
        pd.querySelector(".row p").innerHTML = pd.querySelector(".row p").innerHTML.replace(/\d+$/, rating + " (" + votes + " Votes)");
        pd.querySelector(".progress-bar-danger").innerHTML = "<span style='color: yellow;'>-" + votesDown + "</span>";
        pd.querySelector(".progress-bar-danger").style.textAlign = "center";
        pd.querySelector(".progress-bar-danger").style.width = (100-parseFloat (pd.querySelector(".progress-bar-good").style.width)) + "%";
    }

    function xhrPage(url, callback)
    {
        GM_xmlhttpRequest({
            url: url,
            method: "GET",
            //overrideMimeType: 'text/plain; charset=x-user-defined',
            //overrideMimeType: 'document',
            //overrideMimeType: "responseXML",
            //headers: { "User-agent": navigator.userAgent},
            headers: { "User-agent": navigator.userAgent, "Accept": "text/xml" },
            onload: function (xhr)
            {
                if (xhr.status == 200)
                {
                    //var doc = new DOMParser().parseFromString(xhr.responseText, 'text/xml');
                    var doc = document.implementation.createHTMLDocument("OUJS");
                    doc.documentElement.innerHTML = xhr.responseText;
                    callback(xhr, doc);
                }
                else callback(xhr, null);
            }
        });
    }

    function getSavedUsernames()
    {
        var arr = new Array();
        var names = GM_listValues();

        for (var i = 0; i < names.length; i++)
        {
            if (names[i].match(/^USER-S:/))
            {
                arr.push(names[i].substr(7));
            }
        }

        return arr;
    }

    function getNewPostCount(username, doc)
    {
        var posts;
        var arr = new Array();

        if (doc) posts = doc.querySelectorAll('.table td:nth-child(2) span a[href*="/' + username + '/"]');
        else posts = document.querySelectorAll('.table td:nth-child(2) span a[href*="/' + username + '/"]');

        var meta = JSON.parse(GM_getValue("USER-P:" + username));

        for (var i = 0, post; i < posts.length, post = posts[i]; i++)
        {
            while (post.tagName != "TR") post = post.parentElement;
            if (!doc)
            {
                TSL.addClass(post, "scriptIssues");
                if (post.querySelector(".label-danger")) TSL.addClass(post, "closed");
            }
            var replies = parseInt(post.querySelector("td:nth-child(4)").textContent);
            var postTitle = post.querySelector(".tr-link-a").textContent;
            var postID = getUID(postTitle, "p");

            if (!meta[postID]) meta[postID] = {};

            if (meta[postID].replies != replies)
            {
                TSL.addClass(post, "newposts");

                if (!doc)
                {
                    var diff = document.createElement("sup");
                    post.querySelector("td:nth-child(4) p").appendChild(diff);
                    if (replies == 0) diff.textContent = "new";
                    else diff.textContent = "+" + ((meta[postID].replies == undefined) ? replies : replies - meta[postID].replies);
                }

                var val = { postID: postID, postTitle: postTitle, replies: replies, url: post.querySelector(".tr-link-a").getAttribute("href") };
                if (post.querySelector("td:nth-child(3) .label:last-child").textContent != username) arr.push(val);
                else
                {
                    meta[postID].replies = replies;
                    meta[postID].timestamp = timestamp;
                }
            }
        }

        GM_setValue("USER-P:" + username, JSON.stringify(meta));
        return arr;
    }
})();
