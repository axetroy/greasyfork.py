// ==UserScript==
// @name         HJ Auto Fill
// @namespace    https://mesquka.github.io/
// @version      0.1
// @description  Autofill HJ's Experience Surveys on Desktop with some predefined data. Edit the 'checkids' and 'selectids' arrays at the top of the script if you want to change the responses this bot makes.
// @author       Kieran Mesquita <kieran.mesquita@launchmii.com.au>
// @match        https://www.myhjexperience.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var checkids = [
        "R001000.2",
        "R002000.1",
        "R004000.3",
        "R000063.3",
        "R012000.3",
        "R020000.3",
        "R017000.3",
        "R015000.3",
        "R013000.3",
        "R107000.3",
        "R008000.3",
        "R011000.3",
        "R009000.3",
        "R023000.3",
        "R030000.3",
        "R029000.3",
        "R041000.2",
        "R044000.3",
        "R045000.3",
        "R100000.3",
        "R104000.3",
        "R103000.3",
        "R102000.3",
        "R101000.3",
        "R105000.3",
        "R077000.3",
        "R078000.3",
        "R049000.1",
        "R057000.1",
        "R060000.6",
        "R068000.2"
    ];
    for (var i in checkids){
        checkID(checkids[i]);
    }

    var selectids = [
        {id: "R069000", value: "2"},
        {id: "R070000", value: "2"},
        {id: "R075000", value: "1"}
    ];

    for (var e in selectids){
        selectID(selectids[e]);
    }

    if(window.location.href.indexOf("Survey.aspx") !== -1){
        if(document.getElementById("NextButton")){
            setTimeout(function(){
                document.getElementById('surveyForm').submit();
            }, 100);
        }
    }

})();

function checkID(id) {
    if(document.getElementById(id)){
        document.getElementById(id).checked = true;
    }
}

function selectID(element) {
    if(document.getElementById(element.id)){
        document.getElementById(element.id).value = element.value;
    }
}