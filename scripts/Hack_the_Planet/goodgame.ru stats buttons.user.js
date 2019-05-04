// ==UserScript==
// @name     goodgame.ru stats buttons
// @description add stats buttons to user profile and channel pages on goodgame.ru
// @description:en add stats buttons to user profile and channel pages on goodgame.ru
// @version  1.3
// @include  https://goodgame.ru/*
// @grant    unsafeWindow
// @run-at   document-idle
// @namespace https://greasyfork.org/users/72530
// ==/UserScript==

var url = window.location.href;
if (isProfilePage(url)) { AddButtonToProfile(); }
else if (isChannelPage(url)) { AddButtonToChannel(); };

setInterval(function () {
  if (window.location.href != url)
  {
    url = window.location.href;
    if (isProfilePage(url)) { AddButtonToProfile(); }
    else if (isChannelPage(url)) { AddButtonToChannel(); };
  }
}, 1000);

function isProfilePage(currentUrl) {
  return currentUrl.indexOf("goodgame.ru/user/") !== -1;
}

function isChannelPage(currentUrl) {
  return currentUrl.indexOf("goodgame.ru/channel/") !== -1;
}

function AddButtonToProfile() {
  var userId = window.location.href.split("/user/")[1].replace("/","");
  var statsHref = "http://strayge.com/gg/user/" + userId;
  
  var info = document.getElementsByClassName("profile-info")[0];
  
  var newDiv = document.createElement("div");
  newDiv.style.height='15px';
  info.insertAdjacentElement('afterbegin', newDiv);
  
  var buttonStats = document.createElement("stats");
  buttonStats.className = "btn btn-blue";
	buttonStats.innerHTML = "Статистика";
  buttonStats.style.marginRight='10px';
  buttonStats.style.float='right';
	newDiv.appendChild(buttonStats);
	buttonStats.addEventListener ("click", function() {
    window.open(statsHref, '_blank');
	});
}

function AddButtonToChannel() {
  var channelId = unsafeWindow.ApiData["channel_id"];
  var statsHref = "https://strayge.com/gg/channel/" + channelId;

  var dashboard = document.getElementsByClassName("streamer-dashboard")[0];

  var newDiv = document.createElement("div");
  newDiv.className = "dash-element";
  newDiv.style = "margin-top: -1px; width: 26px;";
  dashboard.insertAdjacentElement('afterbegin', newDiv);

  var buttonStats = document.createElement("a");
  buttonStats.target="_blank";
  buttonStats.className = "icon";
  buttonStats.href = statsHref;
  buttonStats.style = "font-size: 20px; font-style: oblique; font-weight: bold;";

  buttonStats.innerHTML = "S";

  newDiv.appendChild(buttonStats);
}
