// ==UserScript==
// @name         Auto Vote WP
// @namespace    http://hermanfassett.me
// @version      0.2
// @description  Automatically star all parts of a Wattpad story
// @author       Herman Fassett
// @match        https://www.wattpad.com/story/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // On load, create a button
    function main() {
        // Do not add button if no user logged in
        if (wp.user === null) return;
        // Get container
        var container = document.querySelector(".story-controls");
        // Create button
        var button = $("<button/>",
        {
            text: "Auto Vote!",
            click: voteForStory,
            class: "btn btn-orange btn-sm btn-inline",
            id: "auto-vote-button-userscript"
        });
        // Add to container
        $(container).append(button);
    }
    // Get story id from window location pathname
    function getStoryID() {
        var match = window.location.pathname.match(/\/story\/(\d+)/i);
        var storyID = match[1];
        return storyID;
    }
    // Get the parts of a story
    function getParts(storyID, callback) {
        // Construct API url
        var url = "https://www.wattpad.com/api/v3/stories/" + storyID + "?fields=parts";
        // Get the parts of the given story and return it in a callback function
        $.getJSON(url, function(response) {
            callback(response.parts);
        });
    }
    // Vote for a part as a promise
    function voteForPart(storyID, partID) {
        return new Promise(function(resolve, reject) {
            // Construct API call url
            var url = "https://www.wattpad.com/api/v3/stories/" + storyID + "/parts/" + partID + "/votes";
            // Make a POST to url. Some of headers might not be necessary...
            $.ajax({
                url: url,
                type: "POST",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.8");
                    xhr.setRequestHeader("Authorization", "");
                    xhr.setRequestHeader("Accept", "*/*");
                    xhr.setRequestHeader("Authority", "www.wattpad.com");
                }
            }).done(function(data) {
                // console.log("Successfully voted on part " + partID + " of story " + storyID, data);
                resolve("Successfully voted on part " + partID + " of story with " + data.votes + " votes");
            }).fail(function() {
                reject("Failed to vote on part " + partID + " of story " + storyID + ". You may have run out of your 100 votes for the day.");
            });
        });
    }
    // Vote for all parts of story
    function voteForStory() {
        var storyID = getStoryID();
        // Get parts
        getParts(storyID, function(parts) {
            // Loop through parts
            for (var i = 0; i < parts.length; i++) {
                // Skip if already voted
                if (parts[i].voted) continue;
                // Otherwise, vote
                voteForPart(storyID, parts[i].id).then(function(result) {
                    // Success
                    console.log(result);
                }).catch(function(error) {
                    // Error
                    console.log("Error: " + error);
                });
            }
        });
    }
    // Start main function
    main();
})();