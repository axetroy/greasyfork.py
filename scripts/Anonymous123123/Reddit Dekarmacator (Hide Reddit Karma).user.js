// ==UserScript==
// @name        Reddit Dekarmacator (Hide Reddit Karma)
// @namespace   http://www.heikkilotvonen.fi/
// @version     0.2
// @description Inspired by Benjamin Grosser's Facebook Demetricator. This script hides karma and comment values, so it's not about numbers anymore, it's about content.
// @include     *reddit.com/*
// @grant       GM_addStyle
// @copyright   2012+, Heikki Lotvonen
// ==/UserScript==

GM_addStyle(".score{display:none;} .score.likes{display:none !important;} .score.dislikes{display:none !important;} .res_post_ups{display:none !important;} .res_post_downs{display:none !important;} .userkarma{display:none !important;} .karma{display:none !important;} .res_comment_ups{display:none !important;} .res_comment_downs{display:none !important;} .downvotes{display:none !important;} .upvotes{display:none !important;} .authorDetail{display:none !important;}");