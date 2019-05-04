// ==UserScript==
// @name         New Youtube Player
// @author       Abbas
// @description  Automatically starts the new youtube player aka Transparent youtube Player
// @include      http://www.youtube.com/*
// @include      https://www.youtube.com/*
// @version      1.0
// @grant        none
// @namespace    https://greasyfork.org/users/12049
// ==/UserScript==

if (document.cookie.indexOf("VISITOR_INFO1_LIVE=Q06SngRDTGA") === -1)  {
    document.cookie="VISITOR_INFO1_LIVE=Q06SngRDTGA"
    location.reload();
}