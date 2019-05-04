// ==UserScript==
// @name         Yahoo Mail -  Auto-delete mails (aka Clean your Inbox)
// @namespace    http://tampermonkey.net/
// @version      1.0.0.2
// @description  If you want to clean your Yahoo inbox this is the automated way of doing it!
// @author       The24thDS
// @include        http*://mail.yahoo.*/*
// @grant        none
// @require http://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

$(document).ready(function(){
    window.setInterval(function(){
        //select 100 mails
        document.querySelector('[class="c27KHO0_n b_0 M_0 i_0 I_T y_Z2uhb3X A_6EqO r_P C_q cvhIH6_T ir3_Z1FS2Mn P_0"][data-test-id="checkbox"]').click();
        //wait 2 seconds for the selection
        window.setTimeout(function(){},2000);
        //hit the delete button
        document.querySelector('[data-test-id="toolbar-delete"]').click();
        // wait 2 seconds for the popup
        window.setTimeout(function(){},2000);
        // hit ok button with the absurd classes (omg yahoo)
        document.querySelector('[class="P_1EudUu C_52qC r_P y_Z2uhb3X A_6EqO cvhIH6_T ir3_1IO2sY cZ11XJIl_0 k_w e_dRA D_X M_6LEV o_v p_R V_M t_C cZ1RN91d_n u_e69 i_3qGKe H_A cn_dBP cg_FJ l_Z2aVTcY j_n S_n S4_n I_Z2aVTcY I3_Z2bdAhD l3_Z2bdIi1 I0_Z2bdAhD l0_Z2bdIi1 I4_Z2bdAhD l4_Z2bdIi1"][data-test-id="primary-btn"]').click();
        //it should repeat itself after 10 seconds, enough time for the delete proccess to finish
    }, 6000);
    }
);