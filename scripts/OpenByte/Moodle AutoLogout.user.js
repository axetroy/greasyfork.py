// ==UserScript==
// @name        Moodle AutoLogout
// @namespace   openbyte/moodleal
// @icon        https://image.ibb.co/iwn9km/Oygi_Eh_QE6rcn8_KW1e3b_LUPXt67_A6_QEOKy_Eqv_W_Qx_UT8v_N_BEtt_ODh2c_YPrk2d_S7hjy_A_w300.png
// @include     *://moodle.*/*
// @include     *://*.moodle.*/
// @include     *://moodle.*.*/*
// @include     *://*.moodle.*.*/*
// @include     *://moodle.*.*.*/*
// @include     *://*.moodle.*.*.*/*
// @version     1.0.1
// @grant       none
// @description Automatically performs an AutoLogout on Moodle.
// ==/UserScript==


var a = document.querySelectorAll("a[href*=logout]");

if (a.length !== 0)
  location.href = a[0].getAttribute("href");