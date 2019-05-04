// ==UserScript==
// @name         MyAnimeList (MAL) Seasonal Anime Filter
// @namespace    https://greasyfork.org/users/13918
// @version      2.0.0
// @description  This script hides seasonal anime results that you already have on your list. Show/Hide R18+, G-R+.
// @author       AleksNadt
// @match        http://myanimelist.net/anime/season*
// @grant        none
// ==/UserScript==

//Anchor for status
var	allElements = document.evaluate(
    "//div[@class='horiznav-nav-seasonal']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

var AnchorLink = allElements.snapshotItem(0);

if(AnchorLink!=null){

    //Element Placing
    
    var showHide;
    showHide = document.createElement('span');
    showHide.setAttribute('class','fl-r btn-show-r18');
    showHide.appendChild(document.createTextNode('Show R18+ / Hide G-R+'));
    AnchorLink.replaceChild(showHide, AnchorLink.firstChild.nextSibling);
    
    var hideEdit;
    hideEdit = document.createElement('span');
    hideEdit.setAttribute('class','fl-r btn-show-r18');
    hideEdit.appendChild(document.createTextNode('Hide results that you have on your list.'));
    AnchorLink.insertBefore(hideEdit, AnchorLink.firstChild.nextSibling.nextSibling);
    hideEdit.style.padding='0px 10px 0px 16px';

    //Anime list entries seasonal
    var allElementsEdit = document.evaluate(
        "//div[@class='seasonal-anime js-seasonal-anime ']//a[starts-with(@class, 'Lightbox_AddEdit button_edit ')]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    var allElementsEditR18 = document.evaluate(
        "//div[@class='seasonal-anime js-seasonal-anime r18 js-r18']//a[starts-with(@class, 'Lightbox_AddEdit button_edit ')]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    var allElementsDiv = document.evaluate(
        "//div[@class='seasonal-anime js-seasonal-anime ']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    var allElementsDivR18 = document.evaluate(
        "//div[@class='seasonal-anime js-seasonal-anime r18 js-r18']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    //Get or Set status
    var statusShowHide = (localStorage.getItem('status_showHide') === "true"); //Get status showHide
    var statusHideEdit = (localStorage.getItem('status_hideEdit') === "true"); //Get status hideEdit
    if(statusShowHide==null){
        statusShowHide=false;
        localStorage.setItem('status_showHide', statusShowHide);
        showHide.setAttribute('class','fl-r btn-show-r18');
        
        statusHideEdit=false;
        localStorage.setItem('status_hideEdit', statusHideEdit);
        hideEdit.setAttribute('class','fl-r btn-show-r18');
    }
    else{
        if(statusShowHide==false && statusHideEdit==true){
            hideEdit.setAttribute('class','fl-r btn-show-r18 on');
            HideEditDivs(statusShowHide);
        }
        else if(statusShowHide==true && statusHideEdit==false){
            showHide.setAttribute('class','fl-r btn-show-r18 on');
            ShowHideDivs(statusShowHide);
        }
        else if(statusShowHide==true && statusHideEdit==true){
            showHide.setAttribute('class','fl-r btn-show-r18 on');
            ShowHideDivs(statusShowHide);
            hideEdit.setAttribute('class','fl-r btn-show-r18 on');
            HideEditDivs(statusShowHide);
        }
    }

    //Listener
    showHide.addEventListener('click',function () {
        
        if(statusShowHide)
            statusShowHide=false;
        else
            statusShowHide=true;
               
        if(statusShowHide==true){
            showHide.setAttribute('class','fl-r btn-show-r18 on');
            ShowHideDivs(statusShowHide);
        }
        else if(statusShowHide==false){
            showHide.setAttribute('class','fl-r btn-show-r18');
            ShowHideDivs(statusShowHide);
        }

        hideEdit.setAttribute('class','fl-r btn-show-r18');
        statusHideEdit=false;
        localStorage.setItem('status_hideEdit', statusHideEdit);
        
        localStorage.setItem('status_showHide', statusShowHide);
    },false)

    hideEdit.addEventListener('click',function () {
        if(statusHideEdit)
            statusHideEdit=false;
        else
            statusHideEdit=true;
        
        if(statusHideEdit==true){
            hideEdit.setAttribute('class','fl-r btn-show-r18 on');
            HideEditDivs(statusShowHide);
        }

        if(statusHideEdit==false){
            hideEdit.setAttribute('class','fl-r btn-show-r18');
            ShowEditDivs(statusShowHide);
        }

        localStorage.setItem('status_hideEdit', statusHideEdit);

    },false)
}

function ShowHideDivs(status){
    if(status==true){
        
        allElementsDivR18
        for (var i = 0; i < allElementsDiv.snapshotLength; i++){
            var EditLink = allElementsDiv.snapshotItem(i);
            EditLink.style.display="none";
        }
        for (var i = 0; i < allElementsDivR18.snapshotLength; i++){
            var EditLink = allElementsDivR18.snapshotItem(i);
            EditLink.style.display="block";
        }
    }
    else if(status==false){
        for (var i = 0; i < allElementsDivR18.snapshotLength; i++){
            var EditLink = allElementsDivR18.snapshotItem(i);
            EditLink.removeAttribute('style');
        }
        for (var i = 0; i < allElementsDiv.snapshotLength; i++){
            var EditLink = allElementsDiv.snapshotItem(i);
            EditLink.removeAttribute('style');
        }
    }
}



function HideEditDivs(status){
    if(status==true){
        for (var i = 0; i < allElementsEditR18.snapshotLength; i++){
            var EditLink = allElementsEditR18.snapshotItem(i);
            EditLink.parentNode.parentNode.parentNode.removeAttribute('style');
        }
    }
    else if(status==false){
        for (var i = 0; i < allElementsEdit.snapshotLength; i++){
            var EditLink = allElementsEdit.snapshotItem(i);
            EditLink.parentNode.parentNode.parentNode.style.display="none";
        }
    }
}

function ShowEditDivs(status){
    if(status==true){
        for (var i = 0; i < allElementsEditR18.snapshotLength; i++){
            var EditLink = allElementsEditR18.snapshotItem(i);
            EditLink.parentNode.parentNode.parentNode.style.display="block";
        }
    }
    else if(status==false){
        for (var i = 0; i < allElementsEdit.snapshotLength; i++){
            var EditLink = allElementsEdit.snapshotItem(i);
            EditLink.parentNode.parentNode.parentNode.removeAttribute('style');
        }
    }
}