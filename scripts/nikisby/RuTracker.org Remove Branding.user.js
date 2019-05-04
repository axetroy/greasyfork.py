// ==UserScript==
// @name         RuTracker.org Remove Branding
// @namespace    nikisby
// @version      1.1
// @description  Returns old colors to info panel + old style highlight on new PMs.
// @author       nikisby
// @match        http://rutracker.org/*
// @match        http://*.rutracker.org/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @grant        none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$('.branding').removeClass('branding');

if ($('.new-pm').length) {
    $('.new-pm').removeClass('new-pm');
    $('.topmenu').addClass('new-pm');
}

$('img.menu-alt1').each(function(){
    $(this).attr('src', $(this).attr('src').replace('_2','_1'));
});