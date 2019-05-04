// ==UserScript==
// @name           Kongregate chat padding fix
// @namespace      https://greasyfork.org/en/scripts/18261-kongregate-chat-padding-fix
// @description    Makes the kong chat look like the old one
// @author         grabarz19
// @version        1
// @date           25.03.2016
// @include        http://www.kongregate.com/games/*
// @grant GM_addStyle
// ==/UserScript==   
GM_addStyle ("#kong_game_ui .chat_message_window p span {vertical-align:top;} #kong_game_ui .chat_message_window p {padding:2px 6px 1px 4px;}");