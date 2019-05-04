// ==UserScript==
// @name         RPS Night Mode
// @namespace    http://tampermonkey.net/
// @version      0.27
// @description  Night mode for site "Rock, Paper, Shotgun"
// @author       Pathduck
// @supportURL   https://greasyfork.org/en/scripts/370482-rps-night-mode
// @@updateURL   https://greasyfork.org/en/scripts/370482-rps-night-mode
// @match        http://*.rockpapershotgun.com/*
// @match        https://*.rockpapershotgun.com/*
// @exclude      http://forum.rockpapershotgun.com/*
// @exclude      https://forum.rockpapershotgun.com/*
// @exclude      http://www.rockpapershotgun.com/wp-admin/*
// @exclude      https://www.rockpapershotgun.com/wp-admin/*
// @grant        GM_addStyle
// @run-at       document-body
// ==/UserScript==

(function() {
    'use strict';
})();

GM_addStyle("" +
            "body {color: #eee; background-color: black;}" +
            "div[class^='eurogamer'] {display: none !important;}" +
            "h2,h3,h4,h5 {color: #009C7C !important;}" +
            "#comments .account-details strong {color: #eee;}" +
            "#right-rail .small-list .list-item .title a {color: #e9e9e9;}" +
            ".about-the-author .name {color: #009C7C;}"+
            ".article header .breadcrumb a {color: #009C7C;}" +
            ".article header .metadata .author-name a {color: #009C7C;}" +
            ".article main blockquote {background: #272727;}" +
            ".article main table {color: #333;}" +
            ".article.feature header .comment-count {color: #BD698A;}" +
            ".article.feature header .subtitle {color: #BD698A;}" +
            ".article.feature main a:not(.button) {color: #BD698A;}" +
            ".blog-post .label {color: #BD698A;}" +
            ".blog-post.feature .title a {color: #e9e9e9;}" +
            ".blog-post.feature a {color: #BD698A;}" +
            ".blog-post.premium .label, .blog-post.premium a {color: #8965CF;}" +
            ".blog-post.premium .title a {color: #e9e9e9;}" +
            ".comment .date a {color: #009C7C !important;}" +
            ".comment .person {color: #eee;}" +
            ".container-550 {background-color: white;}" +
            ".footer .section-title {color: #ccc;}" +
            ".header-desktop .primary a {color: #eee;}" +
            ".header-desktop .secondary a {color: #ddd;}" +
            ".header-desktop, .footer {background-color: black;}" +
            ".leaderboards {display: none !important;}" +
            ".lightbox-overlay {background-color:rgba(50,50,50,0.85);}" +
            ".mormont-recommendation.large .title, .mormont-recommendation.large .strapline {margin-right: 0 !important; padding-left: .5rem !important;}" +
            ".page > main {background-color: #393939;}" +
            ".related-games.count-1 .related-games-list .related-game-item .title a {color: #009C7C;}" +
            ".section-title img {background-color: white;}" +
            ".section-title {color: #009C7C;}" +
            ".support-us-card-inner {background-color: #272727 !important;}" +
            ".support-us-header-inner title {color: #aaa;}" +
            ".support-us-section p {color: #eee;}" +
            ".title a.mormont-url {color: black !important;}" +
            ".title, .page-title, .title a {color: #e9e9e9 !important;}" +
            ".tlod {display: none !important;}" +
"");