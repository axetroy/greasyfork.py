// ==UserScript==
// @name         CH Hide Annoying MTurk Announcements
// @author       clickhappier
// @namespace    clickhappier
// @version      0.1c
// @description  Hides annoying global announcement messages from Amazon, on every MTurk page except the Dashboard.
// @match        https://www.mturk.com/*
// @exclude      https://www.mturk.com/mturk/dashboard*
// @require      http://code.jquery.com/jquery-latest.min.js
// @grant        GM_log
// ==/UserScript==


// hit promotion messages
$('a[href*="https://requester.mturk.com/business_solutions_inquiries?referral=banner"]').closest('div[class*="message"]').remove();

// timechange/maintenance message
$('h3:contains("Scheduled Maintenance between")').parent().remove();