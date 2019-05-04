// ==UserScript==
// @name          HWM Roulette Alert
// @namespace     hwm_roulette_alert
// @description   Alerts when roulette is about to spin
// @version       1.0.2
// @include       https://www.lordswm.com/roulette.php
// @include       https://www.heroeswm.ru/roulette.php
// @require       https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

var remaining_secs = 0;
var bid_amount = 0;
var c_interval;

async function main() {
  var total_bet_ele = document.querySelector(
    "body > center > table:nth-child(2) > tbody > tr > td > form > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table:nth-child(9) > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > b > table > tbody > tr > td:nth-child(2) > b"
  );
  bid_amount = total_bet_ele ? parseInt(total_bet_ele.innerHTML) : 0;
}

function getServerTime() {
  var all_td_Elements = document.getElementsByTagName("td");
  var time_pattern = /\d{1,2}:\d{2}, \d+ online/;
  var time_only = /\d{1,2}:\d{2}/;
  var btd;
  var btd_t;
  for (var i = 0; i < all_td_Elements.length; i++) {
    btd = all_td_Elements[i];
    btd_t = btd.innerHTML;
    if (btd_t.search(time_pattern) != -1 && btd_t.indexOf("td") == -1) {
      return btd_t.match(time_only)[0];
    }
  }
}

async function startTimer() {
  var timer_div = $("div#roul_time");
  var cur_time = timer_div.text();
  var cur_min = cur_time.split(":")[1];
  var cur_sec = cur_time.split(":")[2];
  var min_to = 5 - (cur_min % 5);
  
  remaining_secs = min_to * 60 - cur_sec;

  setTimeout(function () {
    if (bid_amount != 0) {
      alert("Roulette Wheel is about to Spin!");
    }
  }, (remaining_secs - 5) * 1000);
}

var future = startTimer();
future.then(main);