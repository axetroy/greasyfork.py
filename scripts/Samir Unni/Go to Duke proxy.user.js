// ==UserScript==
// @name         Go to Duke proxy
// @namespace    http://www.github.com/srunni
// @version      0.3
// @description  Redirects page to Duke proxy when you press Ctrl+Alt+d; goes back to regular page if you press Ctrl+Alt+d again
// @author       Samir Unni
// @grant        none
// @include		 *
// @exclude      http://www.ncbi.nlm.nih.gov/pubmed/*
// ==/UserScript==

proxy_str = ".proxy.lib.duke.edu"

window.onkeydown = function(event) {
    if (event.ctrlKey && event.altKey && event.keyCode === 68) {
        if(window.location.href.indexOf(proxy_str) === -1) {
            var str = window.location.href,
                delimiter = '/',
                div_loc = 3,
                tokens = str.split(delimiter),
                before = tokens.slice(0, div_loc),
                after = tokens.slice(div_loc),
                result = before.join(delimiter) + proxy_str + "/" + after.join(delimiter);
            window.location.replace(result);
        } else {
            window.location.replace(window.location.href.replace(proxy_str,""));
        }   
    }
};