// ==UserScript==
// @name         Alegion - Fix JLL Property Brochure Link
// @description  Turns real estate broker jllproperty.us's 'Property Brochure' links into standard right-clickable links.
// @version      1.1
// @author       Kerek
// @namespace    Kerek
// @include      http://www.jllproperty.us/*
// @require      http://code.jquery.com/jquery-latest.min.js
// @grant        GM_log
// ==/UserScript==

var link = $('a:contains("Property Brochure")');
var correct_link = link[0].getAttribute('onclick').split('"')[1];
link.eq(0).prop('onclick',null);
link[0].href = correct_link;
link.eq(0).removeAttr('onclick');