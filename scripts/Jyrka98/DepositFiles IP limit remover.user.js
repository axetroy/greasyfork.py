// ==UserScript==
// @name         DepositFiles IP limit remover
// @namespace    jyrka98_depositfiles_limit_remover
// @version      0.3
// @description  Removes the per-IP download limit
// @author       Jyrka98
// @include      /^https?:\/\/depositfiles\.com\/files\/[a-zA-Z0-9]+(\/.*)?$/
// @include      /^https?:\/\/dfiles\.(eu|org|ru)\/files\/[a-zA-Z0-9]+(\/.*)?$/
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @noframes
// ==/UserScript==

(function() {
    'use strict';
    for (var i = 0; i < 3; i++) {
        jQuery.ajax({
            url: window.location.protocol + '//' + window.location.hostname + '/get_file.php?fd2=clearlimit',
            type: 'GET',
            dataType: 'text',
            success: function(result) {
                console.info('%cIP limit cleared', 'color: lime;');
            },
            error: function(jqxhr, status, error) {
                console.error(error);
            }
        });
    }
})();