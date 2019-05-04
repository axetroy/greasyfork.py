// ==UserScript==
// @name         bahn.de preselect Bahncard 50 reduction
// @namespace    http://wosc.de/
// @version      1.0
// @description  Preselects the "Bahncard 50" reduction
// @author       Wolfgang Schnerring
// @match        https://reiseauskunft.bahn.de/bin/query.exe/d*
// @match        https://reiseauskunft.bahn.de//bin/query.exe/d*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementById('travellerReduction_1').value = 4;
})();