// ==UserScript==
// @name	     Auto Twitch Refresh
// @description  Reload any page in your "User matches"
// @version     1.0.7
// @author      SEBAS204
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @icon        https://static.twitchcdn.net/assets/favicon-75270f9df2b07174c23c.ico
// @namespace https://greasyfork.org/users/201157
// ==/UserScript==

//////////////////////////////////////////////////////////////////
/////////////////// ADD CSS RULE FOR NOTIFICATE //////////////////
//////////////////////////////////////////////////////////////////
$("<style>").text([
    '/* AUTO TWITCH REFRESH USER SCRIPT STYLE */',
    '/* Colors */',
    ':root { --bg-on: #14b866; --twitch-bg: #17141f; --twitch-borders: #2c2541; --twitch-color: #6441a4; }',
    '/**/',
    '/* Animations/Transitions */',
    '@-webkit-keyframes version{from{-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%);} 20%{-webkit-transform:translate(-50%,20%);transform:translate(-50%,20%)} 80%{-webkit-transform:translate(-50%,20%);transform:translate(-50%,20%)} to{-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%);}}',
    '@keyframes version{from{-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%);}20%{-webkit-transform:translate(-50%,20%);transform:translate(-50%,20%)}80%{-webkit-transform:translate(-50%,20%);transform:translate(-50%,20%)}to{-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%);}}',
    '/**/',
    '/* TOP INFO ANIMATION */',
    'body:before {content: "AUTO RELOAD PLUGIN IS ON"; font-weight: 700; z-index: 1000000000000000000000000 !important; text-aling: center; color: white; background:var(--bg-on); top: 0px; left: 50%; position: absolute; border-radius: 5px; padding: 5px 15px; transform: translate(-50%,-100%) !important; -webkit-animation: version 4s ease; animation: version 4s ease; animation-delay: 4s !important;}',
    '/**/',
    '/* User img/avatar hover */',
    '.channel-header__user-avatar::after { transition: height 0.3s cubic-bezier(0, 1.95, 1, 0.9) 0s; height: 0px;}',
    '.channel-header__user-avatar:hover::after { height: 16px !important; text-align: center; content: "ON" !important;  background: var(--twitch-color); color: white; position: absolute; visibility: visible; font-weight: 700;}',
    '/**/',
    '/* Top nav bar */',
    '.top-nav__menu::after { transition: height 0.3s cubic-bezier(0, 1.95, 1, 0.9) 0s; height: 0px; content: ""; }',
    '.top-nav__menu.top-nav__menu:hover::after { transition: height 0.3s cubic-bezier(0, 1.95, 1, 0.9) 0s; height: 16px !important; text-align: center; content: "AUTO RELOAD PLUGIN IS ON" !important; color: white; background: #4b367c; position: absolute !important; visibility: visible; font-weight: 700; left: 40% !important; top: 109% !important; padding: 6px; padding-left: 20px !important; padding-right: 20px !important; border: 2px solid #4b367c; border-bottom: 0px; border-bottom-left-radius: 20px !important; border-bottom-right-radius: 20px !important; margin-top: -4px !important; z-index: 1 !important;}',
    '/* Dark Mode Menu */',
    '.tw-root--theme-dark .top-nav__menu:hover::after { transition: height 0.3s cubic-bezier(0, 1.95, 1, 0.9) 0s; height: 16px !important; text-align: center; content: "AUTO RELOAD PLUGIN IS ON" !important; color: white; background: #392e5c; position: absolute !important; visibility: visible; font-weight: 700; left: 40% !important; top: 109% !important; padding: 6px; padding-left: 20px !important; padding-right: 20px !important; border: 2px solid #392e5c; border-bottom: 0px; border-bottom-left-radius: 20px !important; border-bottom-right-radius: 20px !important; margin-top: -4px !important; z-index: 1 !important;}',
    '/**/',
    '/* Thanks for using this script, by SEBAS204 */',
].join("\n")).appendTo(document.documentElement);



//////////////////////////////////////////////////////////////////
///////////////////////// THE RELOAD SCRIPT //////////////////////
//////////////////////////////////////////////////////////////////
(function() {
    'use strict';

//// 600000 = 10 minutes ////
///  6000  = 1 minute ///
var timeout = setTimeout("location.reload(true);",600000);
  function resetTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout("location.reload(true);",600000);
  };
})();
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
