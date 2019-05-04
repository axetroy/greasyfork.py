// ==UserScript==
// @name         Go testing cover profile filter
// @namespace    https://github.com/tevino
// @version      0.1
// @description  Add a search input for go testing cover profile.
// @author       Tevin Zhang
// @grant        none
// @require https://code.jquery.com/jquery-2.2.4.min.js
// ==/UserScript==
var frame = null;

var findMainFrame = function(e) {
    return $(e.target).contents();
};

var addElementsInFrame = function(inputs) {
    inputs.reverse();
    inputs.forEach(function(input) {
        frame.find("#nav").prepend(input);
    });
};

var onUserInput = function(e) {
    var keys = e.target.value.split(" ");
    console.log("searching for '" + keys + "'");
    var options = frame.find("#files option");
    options.removeAttr("disabled");
    keys.forEach(function(key) {
        options.not(":contains(" + key + ")").attr("disabled", "disabled");
    });
};

var createSearchInput = function() {
    var searchInput = $(
        '<input id="keyword" type="text" placeholder="Search"></input>'
    );
    searchInput.css({
        "font-family": "Menlo, monospace",
        "font-weight": "bold",
        "border-radius": "3px",
        "border-width": 0,
        padding: "3px",
        "padding-left": "8px"
    });
    searchInput.on("keyup change input", onUserInput);
    return searchInput;
};

var createResetButtonOfSearchInput = function(searchInput) {
    var btn = $(
        '<input type="button" value="clear" style="margin-left: 10px"></input>'
    );
    btn.click(function() {
        searchInput.val("");
        searchInput.trigger("change");
    });
    return btn;
};


$("#pkgShow").load(function(e) {
    "use strict";

    frame = findMainFrame(e);

    var searchInput = createSearchInput();
    var resetButton = createResetButtonOfSearchInput(searchInput);

    addElementsInFrame([searchInput, resetButton]);

    searchInput.focus();
});