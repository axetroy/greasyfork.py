// ==UserScript==
// @name        TaimaMacroListMove
// @namespace   Taima
// @description Moves the macro bar to overlay the chat window on taima.tv
// @include     *taima.tv/r/*
// @version     1.0
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle( "                                    \
    .modal.in .modal-dialog {                     \
      transform: translate(0px, 0px) !important;  \
      float: left !important;                     \
    }                                             \
" );
