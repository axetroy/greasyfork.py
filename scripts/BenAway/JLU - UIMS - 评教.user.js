// ==UserScript==
// @name         JLU - UIMS - 评教
// @namespace    http://blog.pxpoi.cn/
// @version      0.1
// @description  For JLU - UIMS评教系统
// @author       BenAway
// @match        http://uims.jlu.edu.cn/ntms/page/eval/*
// @grant        none
// @require     https://code.jquery.com/jquery-latest.js
// ==/UserScript==

ntms.widget.RadioButtonLabel.superclass._static.MIN_INTERVAL_MS = 0;
(function() {
    for(let i = 0; i <= 17; i++) {
        $('#ntms_widget_RadioButtonLabel_' + i * 4).trigger('click');
    }
    $('#ntms_widget_CheckBoxLabel_10').trigger('click');
    setTimeout(function(){$('#dijit_form_Button_0_label').trigger('click');}, 500);
})();