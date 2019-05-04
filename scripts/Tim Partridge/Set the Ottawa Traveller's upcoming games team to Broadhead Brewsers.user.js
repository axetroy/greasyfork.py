// ==UserScript==
// @name         Set the Ottawa Traveller's upcoming games team to Broadhead Brewsers
// @namespace    http://timpartridge.ca
// @version      0.3
// @description  Sets the default team for Ottawa Travellers upcoming games table to "Broadhead Brewsers" instead of showing all teams by default.
// @author       You
// @match        https://ottawatravellers.ca/*/upcoming-games/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Set the team name here

    var teamName = 'Broadhead Brewsers';

    // Do not change anything below this line

    selectTeam(teamName);

    function selectTeam(team) {
        var teamFilter = $('#filterByTeam');
        if (teamFilter) {
            teamFilter.val(team).change();
        }
    }
})();