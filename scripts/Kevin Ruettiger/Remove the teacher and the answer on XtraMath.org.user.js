// ==UserScript==
// @name         Remove the teacher and the answer on XtraMath.org
// @namespace    https://xtramath.org
// @version      0.1
// @description  If your child gets stressed out while using XtraMath.org, this is the solution you are looking for. This script will remove the teacher image and the answer that pops up if the child doesn't answer fast enough.
// @author       Kevin Ruettiger
// @match        https://xtramath.org*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.teacherImage { display: none !important; }');
addGlobalStyle('.remaining_answer { display: none !important; }');