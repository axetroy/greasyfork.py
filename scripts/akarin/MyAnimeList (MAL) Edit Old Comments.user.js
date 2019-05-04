// ==UserScript==
// @name        MyAnimeList (MAL) Edit Old Comments
// @namespace   https://greasyfork.org/users/7517
// @description Returns edit comment link to your old comments on MAL.
// @icon        http://i.imgur.com/b7Fw8oH.png
// @version     1.2.4
// @author      akarin
// @include     /^https?:\/\/myanimelist\.net\/(profile|comtocom|comments)/
// @run-at      document-start
// @grant       none
// @noframes
// ==/UserScript==

/*jslint fudge, maxerr: 10, browser, devel, this, white, for, single */
/*global jQuery */

(function() {
    'use strict';

function main($) {
    if ($('#malLogin').length > 0) {
        return;
    }

    var mal = {};
    var newProfile = document.URL.match(/^https?:\/\/myanimelist\.net\/profile/);

    mal.name = $('.header-profile-link').text().trim();
    mal.process = function(e) {
        $('div[id^="comtext"]', e.target || e).each(function() {
            var id = $(this).prop('id').match(/\d+/)[0];
            var username = $('a[href*="/profile"]', $(this).prev('div')).text();
            if (username === mal.name) {
                var el = $(this).next('div');
                if (!newProfile) {
                    el = $('small', el);
                }
                if ($('a[onclick^="editComment"]', el).length === 0 &&
                    $('a.js-profile-edit-comment', el).length === 0) {
                    if (!newProfile) {
                        el.prepend(' - ');
                    }
                    el.prepend('<a href="#" class="js-profile-edit-comment" data-comment="' + id + '" title="Edit Comment">Edit</a>');
                }
            }
        });
    };

    mal.process($('#contentWrapper').on('DOMNodeInserted', mal.process));
}

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.page-common #contentWrapper { display: none !important; }';
document.getElementsByTagName('head')[0].appendChild(style);

var callback = function() {
    try {
        main(jQuery);
    } catch(e) {
        console.log(e.name + ': ' + e.message);
    } finally {
        style.remove();
    }
};

if (document.readyState !== 'loading') {
    callback();
} else {
    document.addEventListener('DOMContentLoaded', callback);
}

}());
