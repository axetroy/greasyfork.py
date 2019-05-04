// ==UserScript==
// @name         Random.org
// @version      0.1
// @match        https://www.random.org/*
// @description  Predictable number generation for True Random Number Generator (https://www.random.org/)
// @author       Kaimi
// @homepage     https://kaimi.io/2016/01/tampering-vk-contest-results/
// @namespace    https://greasyfork.org/users/228137
// ==/UserScript==

// Number which will be generated on target click
var desired_number = 31337;
var desired_click_number = 3;

var click_ctr = 0;

if (typeof printNumber != "undefined")
{
    var origPrintNumber = printNumber;
    printNumber = function()
    {
        click_ctr++;

        if (click_ctr == desired_click_number)
            document.getElementById("true-random-integer-generator-result").innerHTML = desired_number;
        else
            origPrintNumber();
    }
};