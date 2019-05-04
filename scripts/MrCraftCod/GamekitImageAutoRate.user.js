// ==UserScript==
// @name         GamekitImageAutoRate
// @namespace    fr.mrcraftcod
// @version      0.2
// @description  Continuously rate every pictures with 3 stars
// @author       MrCraftCod
// @match        https://gamekit.com/image/star/*
// @match        https://dogry.pl/image/star/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function tryRate()
    {
        var captchaValid = $('#google_recaptcha_send');
        if(captchaValid && captchaValid !== undefined && captchaValid !== null && captchaValid.length && captchaValid.length > 0) //Can't valid automatically captcha due to CORS
            return;
        var button = $('[data-rating="6"]');
        if(!button || button === null || button === undefined)
            setTimeout(tryRate, 100);
        else
            button.click();
    }

    $(document).ready(function(){
        tryRate();
    });
})();

