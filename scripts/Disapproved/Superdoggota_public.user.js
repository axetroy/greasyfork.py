// ==UserScript==
// @name         Superdoggota_public
// @namespace    superdoggyscripts
// @version      1
// @description  superdoggy's gota extension
// @author       Superdoggy
// @match        http://gota.io/web/*
// @grant        none
// ==/UserScript==

var xmlhttp;
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        eval(xmlhttp.responseText);
    }
};
xmlhttp.open("GET", 'https://dl.dropboxusercontent.com/s/31tdcxs5ku2tu9o/superdoggota.js', true);
xmlhttp.send();