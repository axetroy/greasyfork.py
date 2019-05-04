// ==UserScript==
// @name         CF-Predictor
// @version      1.2.2
// @description  This extension predicts rating changes for Codeforces. It shows approximate deltas during and after the contest.
// @author       Originally by WslF, Edited by ZZYSonny
// @match        http://codeforces.com/contest/*/standings*
// @connect      cf-predictor-frontend.herokuapp.com
// @grant        GM_xmlhttpRequest
// @namespace    https://greasyfork.org/users/169007
// ==/UserScript==

(function() {
    'use strict';
    var partyNum = 0;
    var results = [];
	showDeltas();

    function modifyPartyHtml(index, elem) {
        var delta = '?';
        var rank = ' ';
        var seed = ' ';

        if (partyNum > 0) {
            var handle = $(elem).find("td:eq(1)").find("a").last().html();
            if (handle) {
                //next 2 lines - fix for legendary grandmaster
                handle = handle.replace('<span class="legendary-user-first-letter">','');
                handle = handle.replace('</span>','');
                if (handle in results) {
                    delta = results[handle].delta;
                    rank = results[handle].rank;
                    seed = results[handle].seed;
                }
            }
        }

        var darkClass = "";
        if (partyNum % 2 == 1) {
            darkClass = "dark ";
        }
        var text;
        if (partyNum == 0) {
            text = "<th class='top right' style='width: 4em;'><span title='Rating change''>&Delta;</span></th>";
        } else {
            if (delta > 0) {
                text = "<td class='" + darkClass + "right'><span style='color:green;font-weight:bold;'>+" + delta + "</span></td>";
            } else {
                text = "<td class='" + darkClass + "right'><span style='color:gray;font-weight:bold;'>" + delta + "</span></td>";
            }
        }

        partyNum++;
        $(elem).append(text);
        /*
	text = "<td class='" + darkClass + "right'><span style='color:green;'>" + rank + "</span></td>";
	$(elem).append(text);
	text = "<td class='" + darkClass + "right'><span style='color:green;'>" + seed + "</span></td>";
	$(elem).append(text);
	*/
    }

    function showDeltas() {
        var count = $(".standings").find("tr").length;
        if (count > 2) {
            var contestId = document.location.href.replace(/\D+/ig, ',').substr(1).split(',')[0];
            getDeltas(contestId, function() {
                $(".standings").find("tr").first().find("th").last().removeClass("right");
                $(".standings").find("tr").find("td").removeClass("right");
                $(".standings").find("tr").each(modifyPartyHtml);
                if (count % 2 == 0) {
                    $(".standings").find("tr").last().find("td").last().replaceWith("<td class='smaller bottom right dark'>&Delta;</td>");
                } else {
                    $(".standings").find("tr").last().find("td").last().replaceWith("<td class='smaller bottom right'>&Delta;</td>");
                }
            });
        }
    }

    function getDeltas(contestId, callback) {
        //var localServer = "http://localhost:8084/CF-PredictorFrontEnd/"
        var herokuServer = "https://cf-predictor-frontend.herokuapp.com/";
        var page = 	"GetNextRatingServlet?contestId=" + contestId;

		var server = herokuServer + page;
		GM_xmlhttpRequest({
            method: "GET",
            url: server,
            onload: function(res) {
                var text = res.responseText;
                var data = JSON.parse(text);
                for (var i = 0; i < data.result.length; i++) {
                    var handle = data.result[i].handle;
					var delta = data.result[i].newRating - data.result[i].oldRating;
					var rank = data.result[i].rank;
					var seed = data.result[i].seed;
					var ret = {
						delta : delta,
						seed : seed,
						rank : rank
					};
					results[handle] = ret;
                }
                callback();
            }
		});
    }
})();