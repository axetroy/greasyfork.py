// ==UserScript==
// @name         Zing Duplicates
// @version      0.3
// @description  clicks "No" by default for Zing "Are these receipts the same" hits
// @author       Tjololo
// @match        https://backend.ibotta.com/duplicate_receipt_moderation/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @grant        none
// @namespace https://greasyfork.org/users/710
// ==/UserScript==

$("#duplicatefalse").click();
$("#duplicatefalse").focus();