// ==UserScript==
// @name         Replace input with textarea - Bitcointalk Report
// @namespace    http://minifrij.com
// @version      1
// @description  -
// @author       Minifrij
// @match        https://bitcointalk.org/index.php?action=reporttm*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //Create the new textarea element
    var reportArea = document.createElement('textarea');
    reportArea.name = 'comment';
    reportArea.rows = '7';
    reportArea.cols = '50';
    reportArea.style = 'display:block;';

    //Get old element
    var reportInput = document.getElementsByName('comment')[0];
    //Replace
    reportInput.parentNode.replaceChild(reportArea, reportInput);
})();