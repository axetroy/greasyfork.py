// ==UserScript==
// @name     GameFAQs - reverse message order
// @version  1.0
// @namespace  gamefaqs.com
// @description reverses the order of the messages displayed in topics on the boards
// @include  https://gamefaqs.gamespot.com/boards/*
// @grant    none
// ==/UserScript==

var table = document.querySelector("table.board.message.msg_list");

var messages = table.getElementsByTagName("tr");
var messagesArray = Array.prototype.slice.call(messages);

messagesArray.forEach(node => node.remove());

var fragment = document.createDocumentFragment();

messagesArray.reverse();
messagesArray.forEach(node => fragment.appendChild(node));

table.appendChild(fragment);
