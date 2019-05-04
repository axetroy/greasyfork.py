// ==UserScript==
// @name         Steam Auto Wishlist
// @namespace    https://greasyfork.org/users/191481
// @version      0.22
// @description  Add All Steam App in your wishlist.
// @author       Zeper
// @match        https://store.steampowered.com/
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var IsDebug = false;
var xhr = new XMLHttpRequest();
var AppList = [];
var WishList = [];
var LastAppAdded = 0;
var LastAppFail = 0;
var AppListIndex = 0;
var ErrorCount = 0;
var RetryOverError = 1;
var Loop = 0;

function FindIndexByAppID(value){
    return value == this;
}

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

function AddSucces( response ){
    LastAppAdded = AppList[AppListIndex];
    console.log("App "+ LastAppAdded +" added to the whishlist !");
    localStorage.setItem("SCRIPT_WISHLIST_LAST_APP_ADDED", LastAppAdded);
    AppListIndex++;
    AddAllAppToWishlist();
}

function AddFailed( response ){
    ErrorCount++;
    LastAppFail = AppList[AppListIndex];
    console.log("Failed to add "+ LastAppFail +" to the whishlist ("+response.msg+")");
    localStorage.setItem("SCRIPT_WISHLIST_LAST_APP_FAIL", LastAppFail);
    if (ErrorCount >= RetryOverError){
        ErrorCount = 0;
        AppListIndex++;
    }
    if (AppListIndex < AppList.length){
        AddAllAppToWishlist();
    } else {
        console.log("All App added in the wishlist !");
        if (IsDebug){console.log("AppListIndex : "+AppListIndex);}
        if (Loop){location.reload();}
    }
}

function AddAllAppToWishlist(){
    xhr.open('POST', "https://store.steampowered.com/api/addtowishlist", "true");
    xhr.setRequestHeader('X-Requested-With', "XMLHttpRequest");
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded; charset=UTF-8");
    var data = "sessionid="+g_sessionID.toString()+"&appid="+AppList[AppListIndex].toString();
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if(xhr.status == 200){
                var response = JSON.parse(xhr.responseText);
                if (IsDebug){console.log(response);}
                if (response.success){
                    AddSucces(response);
                } else {
                    AddFailed(response);
                }
            } else {
                AddFailed(response);
            }
        }
    }
}

function LoadLastAppID(){
    if (localStorage.getItem("SCRIPT_WISHLIST_LAST_APP_ADDED")) {LastAppAdded = parseInt(localStorage.getItem("SCRIPT_WISHLIST_LAST_APP_ADDED"));console.log("LastAppAdded : "+LastAppAdded);}
    if (localStorage.getItem("SCRIPT_WISHLIST_LAST_APP_FAIL")) {LastAppFail = parseInt(localStorage.getItem("SCRIPT_WISHLIST_LAST_APP_FAIL"));console.log("LastAppFail : "+LastAppFail);}
    if ( LastAppFail && AppList.includes(LastAppFail) ) {console.log("Loading LastAppindex From LastAppFail...");AppListIndex = AppList.findIndex(FindIndexByAppID,LastAppFail);if (AppListIndex >= AppList.length-1 || AppListIndex < 0){AppListIndex = 0;console.log("AppListIndex is at the end (or OOB) of the Applist.\nReboot of AppListIndex...");}}
    AddAllAppToWishlist();
}

function GetWishList(){
    xhr.open('GET', "https://store.steampowered.com/dynamicstore/userdata", true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if(xhr.status == 200){
                var response = JSON.parse(xhr.responseText);
                if (IsDebug){console.log(response);}
                if (response.rgWishlist){
                    WishList = response.rgWishlist;
                    if (IsDebug){console.log("Succes WishList:"+WishList);}
                    AppList = AppList.diff(WishList);
                    if (IsDebug){console.log("App Not in Wish list:"+AppList);}
                    LoadLastAppID();
                } else {
                    console.log("Failed to get rgWishlist from the response");
                }
            } else {
                console.log("WishList request fail");
            }
        }
    }
}

GM_xmlhttpRequest ( {
    method:     "GET",
    url:        "http://api.steampowered.com/ISteamApps/GetAppList/v2",
    onreadystatechange :     function (response) {
        if (response.readyState == 4 && response.status == 200) {
            var JSONresponse = JSON.parse(response.responseText);
            if (IsDebug){console.log(JSONresponse);}
            for (var i = 0; i < JSONresponse.applist.apps.length; i++){
                AppList.push(JSONresponse.applist.apps[i].appid);
            }
            AppList.sort(function(a, b) {return a - b;});
            if (IsDebug){console.log(AppList);}
            GetWishList();
        }
    }
} );