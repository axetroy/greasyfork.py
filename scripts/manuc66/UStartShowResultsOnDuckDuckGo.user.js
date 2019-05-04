// ==UserScript==
// @name        UStartShowResultsOnDuckDuckGo
// @namespace   manuc66
// @description UStart open search results on DuckDuckGo
// @include     http://www.ustart.org/*
// @include     https://www.ustart.org/*
// @version     3
// ==/UserScript==

// redirect search to google pages
var searchForm = document.getElementsByName("mysearch");
searchForm[0].setAttribute("onsubmit","");
searchForm[0].setAttribute("action","https://duckduckgo.com/?q=");
var MyInput = document.getElementById("q");

// do not show search result while typing
var backToFirst = function(e) { App.page.selectTab(0); };
App.event.attach(MyInput, "keyup", backToFirst);

App.search.suggest.Click_Suggestion = function (i) {
    // get selected value
    var sug = document.getElementById("suggesttable");
    var selectedCell = sug.rows[i].cells[0];
    var celValue = selectedCell.innerHTML.replace(/<([^>]*)>/gi,"");
    
    // set value in search box
    var MyInput = document.getElementById("q");
    MyInput.value = celValue;
    
    // close suggest box
    App.search.suggest.SwitchAutoComplete(true);
    
    // send search
    var searchForm = document.getElementsByName("mysearch");
    searchForm[0].submit();
};
