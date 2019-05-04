// ==UserScript==
// @name         'Select all' in Basic HTML View in Gmail
// @namespace    http://vaxquis.tk
// @version      0.1
// @description  an easy way to select all mails in basic HTML view of Gmail
// @author       vaxquis
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const target = document.querySelector('form[name=f] table td');
    const button = document.createElement('BUTTON');
    const text = document.createTextNode('Select all');
    button.style.marginRight = '1rem';
    button.appendChild( text );
    button.onclick = () => {
        document.querySelectorAll('input[name=t]').forEach( t => { t.checked = true; } );
        return false;
    }
    target.insertBefore(button, target.children[0]);
})();