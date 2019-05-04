// ==UserScript==
// @name         Navigate Jira Issues on Swimlanes with y & n
// @namespace    http://tedmor.in/
// @version      0.2.1
// @description  Navigate between open issues on the Jira current sprint with y (up) and n (down). Add shift to jump to first or last.
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @author       Ted Morin
// @match        https://*.atlassian.net/secure/*
// @grant        none
// ==/UserScript==
// jshint asi:true

(function() {
    'use strict';
    let issueNumber = 0
    /* Open issues */
    function openIssues() {
        return $('.ghx-swimlane .ghx-swimlane-header') // Get all headers
            .filter((i, el) => !$(el).find('.jira-issue-status-lozenge:contains("Closed")').length) // Filter out the closed ones
            .map((i, el) => $(el).parent())
    }
    /* Return the open issue at given index */
    function issueAt(index) {
        return openIssues()[index] // Return the parent, which is the actual swimlane element
    }
    /* Scroll to an issue by index */
    function scrollToIssue(index) {
        console.log('Scrolling to', index)
        $('#ghx-pool').animate({scrollTop: issueAt(index).offset().top - $('.ghx-first').offset().top + 1}, 200)
    }
    $(document).keypress(function(e) {
        if ($(e.target).is("input")) {
            return
        }
        let doIt = true
        switch (e.which) {
            case 110: // n
                if (issueAt(issueNumber + 1)) {
                    issueNumber += 1
                }
                break;
            case 78: // N
                issueNumber = openIssues().length - 1
                break;
            case 121: // y
                if (issueAt(issueNumber - 1)) {
                    issueNumber -= 1
                }
                break;
            case 89: // Y
                issueNumber = 0
                break;
            default:
                doIt = false;
        }
        if (doIt) {
            e.preventDefault()
            scrollToIssue(issueNumber)
        }
    })
})();