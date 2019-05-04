// ==UserScript==
// @name         Recolor.me Tag Auto-Select
// @namespace    https://recolor.me/
// @version      0.1
// @description  Automatically selects the "Adult" tag from the dropdown when creating a new post
// @author       edikit
// @match        https://recolor.me/community/2/GD/new_topic
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementsByName("forum_topic_content")[0].options[1].selected=true;

})();