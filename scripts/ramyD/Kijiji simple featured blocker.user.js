// ==UserScript==
// @name     Kijiji simple featured blocker
// @version  1
// @grant    none
// @author   ramyD
// @include     https://*.kijiji.ca/*
// @include     http://*.kijiji.ca/*
// @include     https://kijiji.ca/*
// @include     http://kijiji.ca/*
// @description hides certain divs on kijiji
// @namespace https://greasyfork.org/users/236878
// ==/UserScript==
/*jshint esversion: 6 */

let topFeatures = document.getElementsByClassName("top-feature");
let thirdParty = document.getElementsByClassName("third-party");
let fesPagelet = document.getElementsByClassName("fes-pagelet");

let objectsToRemove = [...topFeatures, ...thirdParty, ...fesPagelet];
objectsToRemove.forEach(function(obj) {
  obj.style = "display:none;";
});

let viewItemPage = document.getElementById("ViewItemPage");
if (viewItemPage !== null) {
 viewItemPage.parentElement.parentElement.style = "display:block;"; 
}