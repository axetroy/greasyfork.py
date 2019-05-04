// ==UserScript==
// @name            Odstranění reklam pod články (iDnes.cz a Lidovky.cz)
// @description:en  Removes ads bellow articles at iDnes.cz and Lidovky.cz.
// @namespace       monnef.tk
// @include         http://*.lidovky.cz/*
// @include         http://*.idnes.cz/*
// @version         3
// @grant           none
// @require         https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @description Removes ads bellow articles at iDnes.cz and Lidovky.cz.
// ==/UserScript==

var targetText = 'Reklama';
var targetLink = 'etarget.cz';

function process() {
  $('a:contains(\'' + targetText + '\')').each(function () {
    var elem = $(this);
    if (elem.text() === targetText && elem.attr('href').indexOf(targetLink) !== - 1) {
      elem.parent().parent().hide();
    }
  });
}

process();
setTimeout(process, 500);
