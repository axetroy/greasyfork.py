// ==UserScript==
// @name         PHP Documentation Columnify
// @version      1.5
// @description  View PHP Document as multi column
// @author       Shakil Shahadat
// @match        http://php.net/manual/en/
// @match        http://php.net/manual/en/index.php
// @grant        none
// @namespace https://greasyfork.org/users/6404
// ==/UserScript==

document.querySelector('.chunklist').style.WebkitColumnCount = 4;
document.querySelector('.chunklist').style.MozColumnCount = 4;
document.querySelector('.chunklist').style.ColumnCount = 4;

document.querySelector('.chunklist').style.WebkitColumnRuleStyle = 'dotted';
document.querySelector('.chunklist').style.MozColumnRuleStyle = 'dotted';
document.querySelector('.chunklist').style.ColumnRuleStyle = 'dotted';

document.querySelector('.chunklist').style.WebkitColumnRuleWidth = '1px';
document.querySelector('.chunklist').style.MozColumnRuleWidth = '1px';
document.querySelector('.chunklist').style.ColumnRuleWidth = '1px';


document.querySelector('.page-tools').style.display = 'none';
document.querySelector('#usernotes').style.display = 'none';
document.querySelector('nav').style.position = 'absolute';

document.querySelector('.info').style.display = 'none';

//Dynamically add target="_blank" to the anchor links
for ( var i = 0; i < document.querySelectorAll('a').length; i++ )
{
    document.querySelectorAll('a')[i].setAttribute("target","_blank");
    //document.querySelectorAll('a')[i].style.textDecoration = 'none';
}