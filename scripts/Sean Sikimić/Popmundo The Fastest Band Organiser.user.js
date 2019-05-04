// ==UserScript==
// @name         Popmundo The Fastest Band Organiser
// @namespace    http://tampermonkey.net/
// @version      2
// @description  Make your band great again.
// @author       S.Sikimić
// @include      http://83.popmundo.com/World/Popmundo.aspx/Character
// @include      http://84.popmundo.com/World/Popmundo.aspx/Character
// @include      http://85.popmundo.com/World/Popmundo.aspx/Character
// @include      https://83.popmundo.com/World/Popmundo.aspx/Character
// @include      https://84.popmundo.com/World/Popmundo.aspx/Character
// @include      https://85.popmundo.com/World/Popmundo.aspx/Character

// @include      http://83.popmundo.com/World/Popmundo.aspx/Artist/Members/*
// @include      http://84.popmundo.com/World/Popmundo.aspx/Artist/Members/*
// @include      http://85.popmundo.com/World/Popmundo.aspx/Artist/Members/*
// @include      https://83.popmundo.com/World/Popmundo.aspx/Artist/Members/*
// @include      https://84.popmundo.com/World/Popmundo.aspx/Artist/Members/*
// @include      https://85.popmundo.com/World/Popmundo.aspx/Artist/Members/*

// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var active = true;

var SCRIPTDATA = "band";
if( window.location.href == "http://83.popmundo.com/World/Popmundo.aspx/Character" ||
   window.location.href == "http://84.popmundo.com/World/Popmundo.aspx/Character" ||
   window.location.href == "http://85.popmundo.com/World/Popmundo.aspx/Character" ||
   window.location.href == "https://83.popmundo.com/World/Popmundo.aspx/Character" ||
   window.location.href == "https://84.popmundo.com/World/Popmundo.aspx/Character" ||
   window.location.href == "https://85.popmundo.com/World/Popmundo.aspx/Character"){
    try{
        if(GM_getValue(SCRIPTDATA) == undefined || GM_getValue(SCRIPTDATA) == null || !GM_getValue(SCRIPTDATA)){
            registerMe();
        }
    }catch(e){
        console.log("failed to exec : registerMe()");
    }
}

//changeAchs();
increaseDps();
setBg();



if(active){
    setTimeout(function() { checkIfArtistPage(); }, 500);
}

function checkIfArtistPage(){
    if(window.location.href.includes("/World/Popmundo.aspx/Artist/Members/")){
        document.getElementById("ctl00_cphLeftColumn_ctl01_repMembers_ctl00_ucAM_btnQuit").click();
        setTimeout(function() {
            var info = document.getElementsByClassName("ui-button ui-corner-all ui-widget");
            setTimeout(function() {
                try{
                    info[7].click();
                }catch(ex){
                    info[1].click();
                }
            }, 250);
        }, 250);
    }
}

if (!window.location.href.includes("popmundo")) {
    alertPrint("Not popmundo page.");
} else {

    var domains = document.getElementsByClassName('float_left characterPresentation');
    var charInfo = document.getElementsByClassName('charMainInfo');
    var artistIdStr = "none";

    if (!isTGH()) {
        for (var i = 0; i < domains.length; i++) {
            var links = domains[i].getElementsByTagName('a');

            for (var j in links) {
                try {
                    if (links[j].attributes['href'].value.includes("Artist")) {
                        artistIdStr = links[j].attributes['href'].value.replace("/World/Popmundo.aspx/Artist/", "");
                    }
                } catch (Ex) {}
            }
        }

        if (artistIdStr == ("none")) {
            alertPrint("This person has no band");
        } else {
            alertPrint("Artist ID: " + artistIdStr);
            if(active){
                setLinks(artistIdStr);
            }
        }

    } else {
        alertPrint("This person doesn't play Popmundo (TGH player here.)");
    }
}

function isTGH() {
    for (var i = 0; i < charInfo.length; i++) {
        var links = charInfo[i].getElementsByTagName('td');

        return links[0].innerHTML.includes("Heist");
    }
}

function setLinks(artistIdd) {

    var links = document.getElementsByTagName('a');

    for (var j in links) {
        try {
            links[j].attributes['href'].value = "/World/Popmundo.aspx/Artist/Members/" + artistIdd;
        } catch (Ex) {
            logPrint(Ex);
        }
    }
}

function alertPrint(str) {
    //alert(str);
    logPrint(str);
}

function logPrint(str) {
    console.log(str);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setBg(){

    document.body.style.backgroundColor = "#a06565";
}

function changeAchs(){
    try{
        var arr = document.getElementsByClassName("characterAchievements");
        var den = arr[0].getElementsByTagName('div');

        den[0].className = "Achievement Achievement_127";
        den[1].className = "Achievement Achievement_152";
        den[2].className = "Achievement Achievement_304";
    }catch(Ex){
        console.log("err catched.");
    }
}

function increaseDps(){
    try{
        document.getElementById("mnuToolTipImproveCharacter").childNodes[1].data = " (69 dp)" ;
    }catch(Ex){
        console.log("err catched.");
    }
}

function registerMe() {

    var ID = document.getElementsByClassName("idHolder")[0].innerText;
    var NAME = document.getElementsByTagName("h2")[0].innerText;
    var DATA = JSON.stringify({popId:ID, ingameName:NAME, scriptType:SCRIPTDATA});

    GM_xmlhttpRequest({
        method: "POST",
        url: "https://popmundo.azurewebsites.net/api/add_user",
        data: DATA ,
        headers: {
            "Content-Type": "application/json"
        },
        onload: function(response) {
            //alert("posted");
            console.log(response);
            if(response.readyState == 4 && response.status == 200) {
                GM_setValue(SCRIPTDATA, true);
            }
        }
    });
}