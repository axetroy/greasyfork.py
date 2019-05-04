// ==UserScript==
// @name        Wanikani Golden Burn
// @namespace   rfindley
// @description Turn burned items to gold.
// @version     1.1.4
// @include     https://www.wanikani.com/
// @include     https://www.wanikani.com/dashboard
// @include     https://www.wanikani.com/lattice/radicals/progress
// @include     https://www.wanikani.com/lattice/*/status
// @include     https://www.wanikani.com/level/*
// @include     https://www.wanikani.com/radical*
// @include     https://www.wanikani.com/kanji*
// @include     https://www.wanikani.com/vocabulary*
// @include     https://community.wanikani.com/*
// @copyright   2015+, Robin Findley
// @license     MIT; http://opensource.org/licenses/MIT
// @run-at      document-end
// @grant       none
// ==/UserScript==

window.wkgoldburn = {};

(function(gobj) {

    var css;
    if (window.location.hostname === 'community.wanikani.com') {
        css =
            '.avatar-flair[class*="level-60"] {'+
            '  color: rgb(223,170,11) !important;'+
            '  background: linear-gradient(45deg, rgba(242,215,12,1) 0%,rgba(255,255,255,1) 56%,rgba(252,235,0,1) 96%) !important;'+
            '  border: 1px solid rgba(242,215,12,.5);'+
            '  box-sizing: border-box;'+
            '}';
    } else {
        css =
            'body ul.single-character-grid li.character-item.burned,'+
            'body ul.multi-character-grid li.character-item.burned {'+
            '  background-color: #fbc042;'+
            '  background-image:-moz-linear-gradient(top, #fbc550, #faac05);'+
            '  background-image:-o-linear-gradient(top, #fbc550, #faac05);'+
            '  background-image: linear-gradient(to bottom, #fbc550, #faac05);'+
            '  filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#FFFBC550, endColorstr=#FFFAAC05, GradientType=0);'+
            '  border-top:1px solid #fbc550;'+
            '  border-left:1px solid #fbc550;'+
            '}'+

            'body ul.single-character-grid li.character-item.burned span.character,'+
            'body ul.single-character-grid li.character-item.burned ul>li,'+
            'body ul.multi-character-grid li.character-item.burned span.character,'+
            'body ul.multi-character-grid li.character-item.burned ul>li,'+
            'body ul.alt-character-list span.burned span {'+
            '  opacity: 0.9;'+
            '  filter:alpha(opacity=90)'+
            '}'+

            'body .legend.level-list span.burned{'+
            '  background-color: #fbc042;'+
            '}'+

            'body .dashboard section.srs-progress ul li:last-child,'+
            'body ul.alt-character-list span.burned {'+
            '  background-color:#fbc042;'+
            '  background-image:-moz-linear-gradient(-45deg, #fbc550, #faac05);'+
            '  background-image:-webkit-linear-gradient(-45deg, #fbc550, #faac05);'+
            '  background-image:-o-linear-gradient(-45deg, #fbc550, #faac05);'+
            '  background-image:linear-gradient(-45deg, #fbc550, #faac05);'+
            '}'+

            'body .lattice-single-character .burned-lattice,'+
            'body .lattice-multi-character .burned-lattice {'+
            '  background-color:#faac05;'+
            '}'+

            'ul.multi-character-grid li.character-item ul>li {font-size:1.3em !important;}'+

            'body .burned-lattice {'+
            '  background-color:#faac05;'+
            '}'+

            // Ultimate Timeline up to v6
            'body #timeline .arrows .bur {fill:#fbc042;}'+
            'body #timeline .bars .bur {fill:#fbc042;}'+

            // Ultimate Timeline v7+
            'body #timeline svg .burn {fill:#fbc042;}'+
            'body #timeline svg .markers .bur {fill:#fbc042;}'+
            'body #timeline .review_info .summary .bur,'+
            'body #timeline .review_info[data-mode="srs_stage"] .burn {background-color:#fbc042;background-image:linear-gradient(to bottom, #fccd69, #faac05);color:#333;}'+
            'body #timeline .review_info[data-mode="srs_stage"] .burn svg.radical {stroke:#333;}'+
            'body #timeline .review_info[data-mode="srs_stage"] li.burn {border:1px solid #fbc042;}'+
            '';
    }

    // Insert CSS
    $('head').append('<style type="text/css">'+css+'</style>');

})(window.wkgoldburn);
