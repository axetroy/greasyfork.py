// ==UserScript==
// @author          github.com/ugultopu/
// @name            Hide 'Recommended for you' videos on YouTube sidebar
// @description     Hides 'Recommended for you' videos on YouTube sidebar
// @namespace       youtube-hide-recommended-for-you-on-sidebar
// @include         *youtube.com*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version         1.0
// @grant           none
// ==/UserScript==
$('li.video-list-item:contains(\'Recommended for you\')').hide();