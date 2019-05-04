// ==UserScript==
// @name         Youtube-logo as subscriptionlink
// @namespace    https://www.youtube.com/
// @version      1.0
// @description  With this script the youtube logo is now linked to the subscription-feed like in the old days :)
// @author       k-ruben.de
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

'use strict';

var element = document.getElementById("logo-container");
element.href = "/feed/subscriptions";

var element2 = document.getElementByTagName("area")[0];
element2.href = "/feed/subscriptions";