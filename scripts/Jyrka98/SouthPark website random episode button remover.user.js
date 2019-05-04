// ==UserScript==
// @name         SouthPark website random episode button remover
// @namespace    jyrka98_script
// @version      1.1
// @description  Removes the random episode button on the southpark website
// @author       Jyrka98
// @match        http://southpark.cc.com/*
// @match        https://southpark.cc.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(document).ready(function() {
        $("a.random-episode").parent().remove();
    });
})();