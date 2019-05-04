// ==UserScript==
// @name         Lang-8 Language Combo
// @namespace    http://tampermonkey.net/
// @version      0.15
// @description  try to take over the world!
// @author       You
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery-ui.js
// @match        http://*lang-8.com/*/journals/*
// @match        https://*lang-8.com/*/journals/*
// @grant        none
// ==/UserScript==

(function() {
    if ($('#body_show_mo').length === 0) return;
    var learning = $('#body_show_ori').html().split("<br>").filter(function(n){ return n !== "" && n !== "\n";});
    var native = $('#body_show_mo').html().split("<br>").filter(function(n){ return n !== "" && n !== "\n";});
    debugger;
    if (learning.length !== native.length) return;
    var comboHtml = "";
    for (var i=0; i<native.length; i++){
        comboHtml += learning[i] + '<br/>' + native[i] + '<br/>';
        if (learning.length === $('.correct_sentence_body').length){
            $('#sentence_' + (i+1)).after($("<span>").html('<br/>' + native[i]));
        }
    }
    var comboDiv = $("<div id='comboDiv'>").html(comboHtml);
    $('#body_show_ori').before(comboDiv);
})();