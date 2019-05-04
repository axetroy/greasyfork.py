// ==UserScript==
// @name       GDocs form field focus
// @description Places the cursor in the first text field on a Google Docs form. Useful if you use the form in combination with a barcode scanner for example.
// @version 0.2
// @match      https://docs.google.com/*/viewform*
// @namespace https://greasyfork.org/users/5660
// ==/UserScript==

document.querySelector("input[type=text]").focus();