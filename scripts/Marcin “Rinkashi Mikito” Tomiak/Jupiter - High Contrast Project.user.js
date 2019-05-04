// ==UserScript==
// @name         Jupiter - High Contrast Project
// @namespace    http://tampermonkey.net/
// @version      0.35
// @description  Contrast adjustment for low quality monitors; use only if you know what you are doing
// @author       RinkashiMikito
// @match        https://jupiter.ergohestia.pl/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //Function that adds to internal CSS
    // if in doubt use !important property
    function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    }

    //0.31 initial defined styles
    addGlobalStyle('.user-box .user-box-handle .user-data .user-location { color:black !important; font-weight:bold !important; }');
    addGlobalStyle('.user-box .user-box-handle .user-data .user-name { font-size: 12px; color:blue; }');
    addGlobalStyle('.product-picker {border: 2px solid black;}');
    addGlobalStyle('.product-picker .picker-content h6 {color: black; font-size: 14px;}');
    addGlobalStyle('.link.link-dark { color:black; }');
    addGlobalStyle('label {	color:black; }');
    addGlobalStyle('.form-control { color:black; border: 1px solid black;}');
    addGlobalStyle('.product-picker .picker-icon i { color:black; }');
    addGlobalStyle('.form-control:focus { color:black; }');
    addGlobalStyle('.form-control::-moz-placeholder { color:grey }');
    addGlobalStyle('h5, .h5 { color:black }');
    addGlobalStyle('.panel-sale .panel-body-icon i { color:black }');
    addGlobalStyle('.panel { border-color: black; }');
    addGlobalStyle('.btn-default { color: black; background-color: pink; border-color: black; }');
    addGlobalStyle('.text-dark { color: black; }');
    addGlobalStyle('.tabs .list-inline li .tabs-item.active { font-size: 18px; }');
    addGlobalStyle('.link.link-darker { color:black }');
    addGlobalStyle('.link.link-darker:hover, .link.link-darker:focus, .link.link-darker.active { color: red; }');
    //0.32 Sorter style added
    addGlobalStyle('.table thead th .sorter { color: black; }');
    addGlobalStyle('.table thead th .sorter:hover, .table thead th .sorter:focus { color: red; }');
    //0.33 header bar, footnote, "next" button, radio buttons adjustment
    addGlobalStyle('.app-header { border-bottom: 1px solid black; }');
    addGlobalStyle('.hamburger .hamburger-handle span { background-color: black; }');
    addGlobalStyle('.help .help-handle i {color: black;}');
    addGlobalStyle('.notification .notification-handle i {color: black;}');
    addGlobalStyle('.user-box .user-box-handle .user-icon i {color: black;}');
    addGlobalStyle('.user-box .user-box-menu .user-box-identity .list-group .list-group-item {color: black;}');
    addGlobalStyle('.sticked-footer {border-top: 1px dashed black;}');
    addGlobalStyle('.btn-primary:hover, .btn-primary:focus, .btn-primary.focus, .btn-primary:active, .btn-primary.active, .open > .btn-primary.dropdown-toggle {background-color: green;}');
    addGlobalStyle('.input-radio span {border: 1px solid black;}');
    addGlobalStyle('.input-radio input:checked + span i {color: black;}');
    //0.34 form headers and labels adjustment
    addGlobalStyle('.panel-sale h6, .panel-sale .h6 {border-bottom: 1px solid grey; color: black;}');
    addGlobalStyle('hr {border-top: 1px solid grey;}');
    addGlobalStyle('.panel-sale h5, .panel-sale .h5 {border-bottom: 1px dashed black;}');
    addGlobalStyle('.panel-sale.panel-sale-double h5, .panel-sale.panel-sale-double .h5 {font-weight: 600; color: black;}');
    //0.35 matrix, summary text header adjustment
    addGlobalStyle('.matryca.matryca-property .matryca-main .matryca-main-content .risk-item {border-top: 1px dashed black;}');
    addGlobalStyle('.matryca .matryca-aside .aside-amount .amount-label {border-bottom: 1px solid black; color: black;}');
    addGlobalStyle('.matryca.matryca-property .matryca-main .matryca-main-content .risk-item .item-name .item-name-subtitle {font-size: 12px;}');
    addGlobalStyle('.panel-sale.panel-sale-static .table thead tr th, .panel-sale.panel-sale-static .table tbody tr th {color: black;}');