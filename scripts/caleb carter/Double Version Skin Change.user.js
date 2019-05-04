// ==UserScript==
// @name         Double Version Skin Change
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Double
// @match        https://greasyfork.org/scripts/24894-toradorable-animator/code/Toradorable%20Animator.js?version=158248
// @grant        none
// ==/UserScript==

animator.addAnimation(
    {title:"Double Arcade Skins",
     frames: [
         {time: 500, url: "https://s28.postimg.org/txaqxsgel/retro_blue_swirl_hi.png", nick: "Double Fan"},
         {time: 500, url: "https://s30.postimg.org/6p43n2g29/retro_bubblesaurus_hi.png", nick: "Double Fan"},
         {time: 500, url: "https://s29.postimg.org/hbn4nou7b/retro_duck_target_hi.png", nick: "Double Fan"},
         {time: 500, url: "https://s23.postimg.org/d0ji2uejf/retro_dynamite_guy_hi.png", nick: "Double Fan"},
         {time: 500, url: "https://s24.postimg.org/zcyl8b8dx/retro_jumper_hi.png", nick: "Double Fan"},
         {time: 2000, url: "https://s30.postimg.org/aejatw0b5/retro_neon_bug_hi.png", nick: "Double Fan"}
     ]}
);
