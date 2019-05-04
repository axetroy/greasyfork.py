// ==UserScript==
// @name        Steam Queue Clicker
// @description Automate stupid steam queue for some free trading cards
// @namespace   ceremony.steam.queue.clicker
// @include     http://store.steampowered.com/agecheck/*
// @include     http://store.steampowered.com/app/*
// @include     http://store.steampowered.com/explore/
// @version     2.1
// @grant       none
// ==/UserScript==

if (/(Error \d{3} (\n|.)*XID: \d+|An error occurred while processing your request|Failed to load queue)/.test(document.body.innerText)) {
  document.location = document.location;
}

if (window.DoAgeGateSubmit) {
  DoAgeGateSubmit();
}
$J(".agegate_text_container.btns a:first-child").click();


var form = $J('#next_in_queue_form');

if (form) {
  form.submit();
}

if (/You can get \d+ more card/.test($J('.discovery_queue_content_ctn .subtext').text())) {
  document.location = 'http://store.steampowered.com/explore/startnew';
} else (document.location.indexOf("store.steampowered.com/explore/") != -1) {
  setTimeout(function(){window.document.location.reload}, 15*60*1000);
}