// ==UserScript==
// @name            Moodle Error Reload
// @namespace       openbyte/mer
// @description     Reloads page when a database error occurs.
// @icon            https://image.ibb.co/iwn9km/Oygi_Eh_QE6rcn8_KW1e3b_LUPXt67_A6_QEOKy_Eqv_W_Qx_UT8v_N_BEtt_ODh2c_YPrk2d_S7hjy_A_w300.png
// @author          OpenByte
// @include         http*://moodle.htl.rennweg.at/*
// @include         http*://*.moodle.htl.rennweg.at/*
// @license         MIT License
// @encoding        utf-8
// @compatible      firefox
// @compatible      chrome
// @compatible      opera
// @version         1.0.1
// @run-at          document-end
// @grant           none
// ==/UserScript==


var e = document.querySelector("div p");
if (e && e.innerText.toLowerCase().includes("error")) 
    location.reload();