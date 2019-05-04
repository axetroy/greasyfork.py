// ==UserScript==
// @name         Duolingo - Re-Enable Textareas
// @description  makes the textareas in lessons selectable again after checking the result
// @version      0.1
// @author       tiramisues
// @match        https://www.duolingo.com/*
// @grant        none
// @namespace https://greasyfork.org/users/158976
// ==/UserScript==


new MutationObserver(function(mutations) {
	if(window.location.href.indexOf('practice') != -1 || window.location.href.indexOf('skill') != -1 )
		mutations.forEach(function(mutation){
            if(mutation.attributeName == "disabled"){
                var textarea = document.querySelector('[data-test="challenge-translate-input"]');
                textarea.removeAttribute('disabled');
                textarea.setAttribute('readonly','readonly');
            }
    });
}).observe(document.body, {childList: true, subtree: true, attributes: true });