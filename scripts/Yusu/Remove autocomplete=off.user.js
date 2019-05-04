// ==UserScript==
// @name        Remove autocomplete=off
// @namespace   remove-autocomplete-off
// @version     1
// @description Removes the attribute autocomplete=off of forms and inputs.
// @grant none
// ==/UserScript==

Array.prototype.forEach.call(document.querySelectorAll('[autocomplete]'), function(el){
    el.setAttribute('autocomplete', 'on');
});