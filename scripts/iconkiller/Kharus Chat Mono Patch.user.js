// ==UserScript==
// @name        Kharus Chat Mono Patch
// @namespace   Kharus Chat Patch
// @match       https://kharus.com/pages/chat*
// @match       http://kharus.com/pages/chat*
// @description:en for Kharus Chatting
// @version     201612.007

// @description for Kharus Chatting
// ==/UserScript==

function ChatPatch() {
$('p>span').css({'color': 'black'});
$('p').removeClass();
chatCount["GUILD_CHATTING"] = -999;
chatCount["PUBLIC_거래채팅"] = -999;
}
setInterval(ChatPatch, 100);