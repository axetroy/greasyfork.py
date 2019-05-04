// ==UserScript==
// @name         RYM group member newline
// @namespace    rym.sux
// @version      1.1.0
// @description  makes the list of group members readable
// @author       wahlp
// @include      https://rateyourmusic.com/artist/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var elems = document.querySelectorAll("*"),
        res = Array.from(elems).find(v => v.textContent == 'Members');
    if (res) {
        var txt = res.nextElementSibling.innerHTML;
        //gather brackets and commas
        var regex = /\(/g, result, open_brackets = [], closed_brackets = [], commas = [];
        while ( (result = regex.exec(txt)) ) {
            open_brackets.push(result.index);
        }
        regex = /\)/g;
        while ( (result = regex.exec(txt)) ) {
            closed_brackets.push(result.index);
        }
        regex = /\,/g;
        while ( (result = regex.exec(txt)) ) {
            commas.push(result.index);
        }
        //find the commas between brackets and mark them
        for (var i = commas.length - 1; i >= 0; i--){
            var index = commas[i];
            for (var j in open_brackets){
                if (index > open_brackets[j] && index < closed_brackets[j]){ //found comma between matching brackets
                    commas[i] = 0;
                    break; //escape loop to review comma position
                }
            }
            if (commas[i] != 0){ //comma is outside brackets
                txt = txt.slice(0,commas[i]+1) + '<br>' + txt.slice(commas[i]+1);
            }
        }
        res.nextElementSibling.innerHTML = txt;
        var useless_float = document.getElementsByClassName('dfp_300_float_right')[0];
        useless_float.parentNode.removeChild(useless_float);
    }

})();