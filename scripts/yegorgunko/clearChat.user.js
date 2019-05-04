// ==UserScript==
// @name         clearChat
// @namespace    https://github.com/yegorgunko/shikme-tools
// @version      0.2
// @description  Clear chat
// @author       Yegor Gunko
// @match        https://shikme.ru/
// @icon         https://shikme.ru/default_images/icon.png?v=1528136794
// @grant        none
// ==/UserScript==
const clearChat=()=>{document.getElementById("open_left_menu").insertAdjacentHTML("afterend",'<div title="Очистить чат" id=clearChat class=chat_footer_item><i class="i_btm fa fa-broom"></i></div>'),document.getElementById("clearChat").addEventListener("click",()=>{document.getElementById("chat_logs_container").innerHTML=""})};document.addEventListener("DOMContentLoaded",(document.getElementById("open_left_menu").insertAdjacentHTML("afterend",'<div title="Очистить чат" id=clearChat class=chat_footer_item><i class="i_btm fa fa-broom"></i></div>'),void document.getElementById("clearChat").addEventListener("click",()=>{document.getElementById("chat_logs_container").innerHTML=""})),!1);