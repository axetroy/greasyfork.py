// ==UserScript==
// @name         Overwatch League - Hide Scores
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Hide Scores from Overwatch League Pages unless you hover over
// @author       Scott Bass
// @match        https://overwatchleague.com/en-us/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle ( `
.MatchStatus--transparent {
opacity: 0;
    }

.MatchStatus--transparent:hover {
opacity:1;
}

.TeamScore-score, .TeamScore--winner .TeamScore-score {
opacity: 0;
}

.TeamScore-score:hover, .TeamScore--winner:hover .TeamScore-score:hover {
opacity: 1;
}

.GameResult-scores {
opacity: 0;
}

.GameResult-scores:hover {
opacity:1;
}

` );
