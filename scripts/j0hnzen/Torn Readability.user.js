// ==UserScript==
// @name         Torn Readability
// @version      1.0.1
// @description  Makes the chat in Torn more readable.
// @author       j0hnZen
// @match        https://www.torn.com/*
// @run-at       document-start
// @grant        none
// @namespace    j0hnZen
// ==/UserScript==

var fontSize = localStorage.getItem("tr_fontsize") ? localStorage.getItem("tr_fontsize") : "16px";
var tsReadable = localStorage.getItem("tr_TSReadability") ? localStorage.getItem("tr_TSReadability") == "true" ? true : false : false;

var chatRoot = document.getElementById("chatRoot");
var config = {
  childList: true
};


if (window.location.pathname == "/preferences.php") {
  window.onload = function() {
    var style_settings = document.createElement("style");
    style_settings.type = "text/css";
    style_settings.innerHTML = `
         .trSettings { width: 100%; height: auto; background-color: #F2F2F2; border-radius: 6px; padding: 0px 16px 8px 16px; box-sizing: border-box; }
         .trDivLine { width: 100%; height: 16px; padding-top: 6px; padding-bottom: 6px; }
         .trLabel { font-size: 14px; }
         .trTextInput { -webkit-appearance: none; width: 88%; float: right; height: 16px; border: 1px solid #999999; padding-left: 8px; }
         .trHeader { width: 100%; height: 18px; padding: 6px 0px 6px 0px; font-size: 18px; font-weight: bold; color: #555555; }
         .trSeperator { display: block; height: 1px; border: 0; border-top: 1px solid #CCCCCC; margin: 1em 0; padding 0; }
         .trDivButton { width: 100%; height: 16px; padding-top: 6px; padding-bottom: 6px; display: flex; align-items: center; justify-content: center; }
         .trButton { width: 128px; background: #D5D5D5; padding: 4px 0px 4px 0px; margin: 2px 2px 0px 2px; border: 2px solid #999999; }`
    document.head.appendChild(style_settings);


    var clear = document.createElement("div");
    clear.className = "clear";
    var settings = document.createElement("div");
    settings.className = "trSettings";

    var div_header = document.createElement("div");
    div_header.className = "trHeader";
    var span_header = document.createElement("span");
    span_header.innerText = "Torn Readability Settings";
    div_header.appendChild(span_header);
    settings.appendChild(div_header);

    var hr_seperator = document.createElement("hr");
    hr_seperator.className = "trSeperator";
    settings.appendChild(hr_seperator);

    var div_fontSize = document.createElement("div");
    div_fontSize.className = "trDivLine";
    var span_fontSize = document.createElement("span");
    span_fontSize.className = "trLabel";
    span_fontSize.innerText = "Font size:";
    var text_fontSize = document.createElement("input");
    text_fontSize.type = "text";
    text_fontSize.value = localStorage.getItem("tr_fontsize") ? localStorage.getItem("tr_fontsize") : "16px";
    text_fontSize.className = "trTextInput";
    text_fontSize.id = "txt_fontsize";
    div_fontSize.appendChild(span_fontSize);
    div_fontSize.appendChild(text_fontSize);
    settings.appendChild(div_fontSize);

    var div_TSReadability = document.createElement("div");
    div_TSReadability.className = "trDivLine";
    var span_TSReadability = document.createElement("span");
    span_TSReadability.className = "trLabel";
    span_TSReadability.innerText = "TornStats readability: ";
    var text_TSReadability = document.createElement("input");
    text_TSReadability.type = "checkbox";
    text_TSReadability.checked = localStorage.getItem("tr_TSReadability") ? localStorage.getItem("tr_TSReadability") == "true" ? true : false : false;
    text_TSReadability.id = "txt_TSReadability";
    div_TSReadability.appendChild(span_TSReadability);
    div_TSReadability.appendChild(text_TSReadability);
    settings.appendChild(div_TSReadability);

    var div_save = document.createElement("div");
    div_save.className = "trDivButton";
    var button_save = document.createElement("button");
    button_save.type = "button";
    button_save.innerText = "Save";
    button_save.className = "tccButton";
    button_save.id = "btn_save";
    var button_reset = document.createElement("button");
    button_reset.type = "button";
    button_reset.innerText = "Reset";
    button_reset.className = "trButton";
    button_reset.id = "btn_reset";
    div_save.appendChild(button_save);
    div_save.appendChild(button_reset);
    settings.appendChild(div_save);

    var cw = document.getElementById("mainContainer").children[document.getElementById("mainContainer").childElementCount - 2];
    cw.appendChild(clear);
    cw.appendChild(settings);


    document.getElementById("btn_save").addEventListener("click", function() {
      let fs = document.getElementById("txt_fontsize");
      let tsr = document.getElementById("txt_TSReadability");

      localStorage.setItem("tr_fontsize", fs.value);
      localStorage.setItem("tr_TSReadability", tsr.checked);
    });

    document.getElementById("btn_reset").addEventListener("click", function() {
      localStorage.removeItem("tr_fontsize");
      localStorage.removeItem("tr_TSReadability");
    });
  };
}
  var cssstr = ""
  if (tsReadable) {
      cssstr+=`.d .profile-wrapper .profile-container.basic-info > div > table table tr  { border: 1px solid !important }`
      cssstr+=`.d .profile-wrapper .profile-container.basic-info > div > table td  { padding-top: 2px !important; padding-bottom: 2px !important; }`
      cssstr+=`.d .profile-wrapper .profile-container.basic-info > div > table > tbody > tr > td:first-child  { line-height: 200%; !important; }`
  }

  cssstr+=`.message_oP8oM { font-size: ` + fontSize + ` }`

  if (cssstr != "") {
      var style = document.createElement('style');
      style.type = "text/css";
      style.innerHTML = cssstr;
      document.head.appendChild(style);
  }