// ==UserScript==
// @name         好友页面显示Steam空余好友位
// @namespace    http://blog.853lab.com/
// @version      0.1
// @description  Show Steam empty friend list.
// @author       Sonic853
// @include		*://steamcommunity.com/id/*
// @include		*://steamcommunity.com/profiles/*
// @exclude		*://steamcommunity.com/id/*/friends/
// @exclude		*://steamcommunity.com/profiles/*/friends/
// @grant        none
// ==/UserScript==

var EdmundDZhang = document.getElementsByClassName("friendPlayerLevelNum")[0].innerText;
document.getElementsByClassName("profile_friend_links")[0].getElementsByClassName("profile_count_link_total")[0].innerHTML += ' / '+ (250 + (5 * EdmundDZhang)) +'<span style="font-size: 12px;">or ' + (300 + (5 * EdmundDZhang)) + '</span>';