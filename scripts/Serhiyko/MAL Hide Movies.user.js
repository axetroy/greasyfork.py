// MAL Hide Movies!
// version 1.0
// 2015-02-25
// Copyright (c) 2015, Serhiyko <io73newser@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MAL Hide Movies", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        MAL Hide Movies
// @namespace   http://thayanger.neostrada.pl
// @include     http://myanimelist.net/animelist/*
// @description Hides movies on your own anime list
// @author      Serhiyko <io73newser@gmail.com>
// @version     1.0.0
// ==/UserScript==
// @grant GM_getValue
// @grant GM_setValue

//Anchor for checkbox
var	allElements = document.evaluate(
    "//strong",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

var AnchorLink = allElements.snapshotItem(2);

if( AnchorLink.innerHTML == "You are viewing your anime list" ){
    //Element Placing
    var newElement;

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    AnchorLink.appendChild(checkbox);

    newElement = document.createElement('label');
    newElement.setAttribute('for','firstName');
    newElement.appendChild(document.createTextNode('Hide movies.'));
    AnchorLink.appendChild(newElement);
    newElement.style.fontWeight="normal";
    newElement.style.fontSize="10px";

    //Anime list entries search
    allElements = document.evaluate(
        "//td[string() = 'Movie']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    //Get or Set status of checkbox
    var checkboxmem = GM_getValue('checkboxmem'); //Get chceckbox status
    if(checkboxmem==null){
        checkboxmem=false;
        GM_setValue('checkboxmem', checkboxmem);
        checkbox.checked=checkboxmem;
    }
    else{
        checkbox.checked=checkboxmem;
        if(checkbox.checked==true)
            HideDivs();
    }

    //Listener
    checkbox.addEventListener('change',function () {

        if(checkbox.checked==true){
            HideDivs();
        }

        if(checkbox.checked==false){
            for (var i = 0; i < allElements.snapshotLength; i++){
                var EditLink = allElements.snapshotItem(i);
                EditLink.parentNode.removeAttribute('style');
            }
        }

        GM_setValue('checkboxmem', checkbox.checked);

    },false)

    console.log(AnchorLink.innerHTML);
}

function HideDivs(){
    for (var i = 0; i < allElements.snapshotLength; i++){
        var EditLink = allElements.snapshotItem(i);
        EditLink.parentNode.style.display="none";
    }
}