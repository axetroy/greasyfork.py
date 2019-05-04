// ==UserScript==
// @name            Zombs.io anti crasher
// @namespace  https://www.youtube.com/channel/UCC4Q28czyJPjSPtYQerbPGw
// @version         who cares about versions 2
// @description  Makes you immune to chat crash
// @author          Demostanis
// @match          http://zombs.io/*
// ==/UserScript==
Game.currentGame.network.addEnterWorldHandler(()=>{Game.currentGame.network.emitter.removeListener("PACKET_RPC",Game.currentGame.network.emitter._events.PACKET_RPC[1]),Game.currentGame.network.sendRpc({name:"SendChatMessage",channel:"Global",message:atob("U2NyaXB0IG1hZGUgYnkgRGVtb3N0YW5pcyBodHRwczovL2Rpc2NvcmQuZ2cvQ2NBZ2FiVQ==")});const onMessageReceived=e=>{const a=Game.currentGame.ui.getComponent("Chat"),s=e.displayName.replace(/<(?:.|\n)*?>/gm, ''),t=e.message.replace(/<(?:.|\n)*?>/gm, ''),m=a.ui.createElement(`<div class="hud-chat-message"><strong>${s}</strong>: ${t}</div>`);a.messagesElem.appendChild(m),a.messagesElem.scrollTop=a.messagesElem.scrollHeight};Game.currentGame.network.addRpcHandler("ReceiveChatMessage",onMessageReceived);})