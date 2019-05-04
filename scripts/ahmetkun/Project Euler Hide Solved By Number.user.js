// ==UserScript==
// @name         Project Euler Hide Solved By Number
// @namespace    http://ahmetkun.com/
// @version      0.1
// @description  if you feel 'solved by' count is affecting your ability and desire to solve a Project Euler question 
// @author       Ahmet Kun
// @match        https://projecteuler.net/problems
// @grant        none
// ==/UserScript==

var counts = document.querySelectorAll('#problems_table > tbody > tr > td:nth-child(3)');
for(var i=0; i<counts.length; i++) {
 counts[i].style.visibility = 'hidden';
}