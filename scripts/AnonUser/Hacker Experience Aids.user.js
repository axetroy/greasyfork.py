// ==UserScript==
// @name         Hacker Experience Aids
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Nobody at all... I'm obviously a bot
// @include      https://*hackerexperience.com/*?hack
// @exclude      https://*hackerexperience.com/hackui
// @grant        none
// ==/UserScript==

win = window.open("https://legacy.hackerexperience.com/hackui", "_blank", "directories=0, fullscreen=1, menubar=0, resizable=0, status=0, titlebar=0, toolbar=0, scrollbars=1, width=400, height=500");
win.getLog = function(which, func) {
  var request = new win.XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      //document.body.innerHTML = request.responseText;
      var log = request.responseText;
      log = log.substring(log.search("<textarea class=\"logarea\" rows=\"15\" name=\"log\" spellcheck=FALSE>"));
      log = log.substring(64, log.search("</textarea>"));
      //console.log(log);
      if (log.substring(1, 16) !== "<!DOCTYPE html>") {func(log);}
    }
  };
  if (which === 0) {
    request.open("GET", "/internet?view=logs&random=" + Math.random(), true);
  } else if (which === 1) {
    request.open("GET", "/log?random=" + Math.random(), true);
  }
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send();
};

win.main_dialog = function() {
  win.document.body.innerHTML = "";
  var div = win.document.createElement("DIV");
  div.innerHTML = "<h2 style='font-size: 20px; text-align: center;'>Hacker Experience Hack Tool</h2><hr><b>Capture logs from... </b><a href='javascript: void(0);' onclick='log_connected();'>connected IP</a> or <a href='javascript: void(0);' onclick='log_yours();'>your IP</a>";
  div.style.cssText = "position: fixed; left: 0; top: 0; width: 100%; height: 100%; margin: 0; border: 3px solid black; background-color: black; color: white; font-family: sans-serif; font-size: 15px;";
  win.document.body.appendChild(div);
};

win.log_connected = function() {
  win.document.body.innerHTML = "";
  var div = win.document.createElement("DIV");
  div.innerHTML = "<h2 style='font-size: 20px; text-align: center;'><a href='javascript: void(0);' onclick='main_dialog();'>&lt;</a>&nbsp;Connected IP</h2><hr><textarea id='log_holder_connected' style='width: 100%; height: calc(100% - 50px);'></textarea>";
  div.style.cssText = "position: fixed; left: 0; top: 0; width: 100%; height: 100%; margin: 0; border: 3px solid black; background-color: black; color: white; font-family: sans-serif; font-size: 15px;";
  win.document.body.appendChild(div);
};

win.log_yours = function() {
  win.document.body.innerHTML = "";
  var div = win.document.createElement("DIV");
  div.innerHTML = "<h2 style='font-size: 20px; text-align: center;'><a href='javascript: void(0);' onclick='main_dialog();'>&lt;</a>&nbsp;Your IP</h2><hr><textarea id='log_holder_yours' style='width: 100%; height: calc(100% - 75px);'></textarea>";
  div.style.cssText = "position: fixed; left: 0; top: 0; width: 100%; height: 100%; margin: 0; background-color: black; color: white; font-family: sans-serif; font-size: 15px;";
  win.document.body.appendChild(div);
};

win.onload = function(event) {
  win.main_dialog();
  var connected_prelogs = "";
  var yours_prelogs = "";
  win.setInterval(function() {
    try {
      win.getLog(0, function(logs) {if (logs !== connected_prelogs) {connected_prelogs = logs; win.document.getElementById("log_holder_connected").value += "\n===\n" + logs;}});
    } catch(error) {}
  }, 1500);

  win.setInterval(function() {
    try {
      win.getLog(1, function(logs) {if (logs !== yours_prelogs) {yours_prelogs = logs; win.document.getElementById("log_holder_yours").value += "\n" + logs;}});
    } catch(error) {}
  }, 1500);

};

window.onload = function(event) {
  history.back();
};