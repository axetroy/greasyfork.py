// ==UserScript==
// @name         Barter.vg, Custom UserGroups Name
// @description  Set custom name to user groups
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://barter.vg/*
// @grant        none
// @runat        document-end
// @nowrap
// ==/UserScript==

(function() {
    'use strict';
    var STORAGE_KEY = "UserGroups";
    var CharCodeFromA = 65;
    var CharCodeFromZ = 90;

    var groupsData = {};
    if (localStorage[STORAGE_KEY]) {
        groupsData = JSON.parse(localStorage[STORAGE_KEY]);
    }
    console.log(groupsData);

    var groups = document.querySelectorAll('#tradeUser [label=Groups] option');
    for (var i = 0; i < groups.length; i++) {
        var value = parseInt(groups[i].value);
        if (value > 0) {
            var name = groupsData[String.fromCharCode(value)];
            if (name) {
                groups[i].innerText = groups[i].innerText + " : " + name;
            }
        }
    }
    var groups = document.querySelectorAll("[name=group] option");
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].value > 0) {
            var name = groupsData[groups[i].innerText];
            if (name) {
                groups[i].innerText = groups[i].innerText + " : " + name;
            }
        }
    }

    var h1 = document.querySelector("h1 a");
    var signin = document.querySelector("#signin");
    if (h1 && h1.href == signin.href && signin.href == location.href) {
        // only self page
        initGroupsSetting();
    }

    function setGroupsName () {
        var data = {};
        var groups = document.querySelectorAll("#userGroupsNameListings li input");
        for (var i = 0; i < groups.length; i++) {
            console.log(groups[i].value);
            data[String.fromCharCode(CharCodeFromA + i)] = groups[i].value;
        }
        localStorage[STORAGE_KEY] = JSON.stringify(data);
    }

    function initGroupsSetting () {
        var data = groupsData || {};

        var h3 = document.createElement("h3");
        h3.innerText = "User Group Name";

        var ul = document.createElement("ul");
        ul.id = "userGroupsNameListings";
        ul.className = "preference";

        var html = "";
        // A to Z
        for (var i = CharCodeFromA; i <= CharCodeFromZ; i++) {
            var char = String.fromCharCode(i);
            html += "<li>";
            html += "<span style='width: 60px; display: inline-block;'>Group " + char + "</span>";
            html += '<input type="text" value="' + (data[char] ? data[char] : "") + '"/>';
            html += "</li>";
        }
        ul.innerHTML = html;

        var button = document.createElement("button");
        button.onclick = setGroupsName;
        button.innerText = "Set User Groups Name";

        var main = document.querySelector("#main");
        main.appendChild(h3);
        main.appendChild(ul);
        main.appendChild(button);
    }
    // Your code here...
})();