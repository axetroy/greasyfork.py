// ==UserScript==
// @name        Kharus Chat Unlimited Patch
// @namespace   Kharus Chat Patch
// @match       https://kharus.com/pages/chat*
// @match       http://kharus.com/pages/chat*
// @description:en for Kharus Chatting
// @version     201612.001

// ==/UserScript==

function ChatPatch() {
chatCount["GUILD_CHATTING"] = -999;
chatCount["PUBLIC_거래채팅"] = -999;
chatCount["PUBLIC_동맹레이드"] = -999;
chatCount["PUBLIC_잡담채팅"] = -999;
}
setInterval(ChatPatch, 1000);