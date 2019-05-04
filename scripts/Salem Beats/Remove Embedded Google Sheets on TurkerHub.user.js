// ==UserScript==
// @name         Remove Embedded Google Sheets on TurkerHub
// @namespace    salembeats
// @version      1
// @description  Like the title says. They're annoying bacause the site automatically jumps to sheets when they're present.
// @author       Cuyler Stuwe (salembeats)
// @include      https://turkerhub.com/threads/*/*
// @grant        none
// ==/UserScript==

document.querySelectorAll("iframe[data-s9e-mediaembed='googlesheets']").forEach( (sheetFrame) => {sheetFrame.remove();} );