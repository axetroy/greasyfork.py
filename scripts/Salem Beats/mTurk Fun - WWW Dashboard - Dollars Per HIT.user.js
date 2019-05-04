// ==UserScript==
// @name         mTurk Fun - WWW Dashboard - Dollars Per HIT
// @namespace    salembeats
// @version      1
// @description  Quick one-time display of your average $/HIT as an alert box.
// @author       Cuyler Stuwe (salembeats)
// @match        https://www.mturk.com/mturk/dashboard
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

function main() {
    if(GM_getValue("alreadyRunOnce")) {return;}

    let allMetricsTables = document.querySelectorAll("table.metrics-table");
    let totalEarningsUSD = Number(document.querySelector("#total_earnings_amount span.reward").innerText.replace(/[,$]/g, ""));
    let totalApprovedHITs = Number(allMetricsTables[allMetricsTables.length-1].querySelector("tr:nth-of-type(3) td:nth-of-type(2)").innerText);
    let usdPerHIT = totalEarningsUSD / totalApprovedHITs;
    let centsPerHIT = (usdPerHIT * 100).toFixed(2);
    alert(`You earn, on average, ${centsPerHIT} cents per HIT!`);

    GM_setValue("alreadyRunOnce", true);
}
main();