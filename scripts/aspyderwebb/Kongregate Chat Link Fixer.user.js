// ==UserScript==
// @name           Kongregate Chat Link Fixer
// @namespace      tag://kongregate
// @description    Fix Kong Chat Name Links 
// @author         aspyderwebb
// @version        0.0.1
// @date           3.26.2016
// @include        http://www.kongregate.com/games/*
// @grant GM_addStyle
// ==/UserScript==   
GM_addStyle ("  #kong_game_ui .chat_message_window p { padding: 1px 2px 1px 2px !important; } #kong_game_ui .chat_message_window .chat_message_window_username { text-decoration: underline !important; } ") ;
