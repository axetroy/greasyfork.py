// ==UserScript==
// @name         Free soundsnap.com
// @name:en      Free soundsnap.com
// @name:ru      Бесплатный soundsnap.com
// @namespace    tuxuuman:soundsnap
// @version      0.1
// @description:en  Free download of sounds from soundsnap.com.
// @description:ru  Бесплатная загрузка звуков с сайта soundsnap.com.
// @author       tuxuuman <tuxuuman@gmail.com>
// @match        *://www.soundsnap.com/*
// @grant        none
// @run-at document-body
// ==/UserScript==

(function() {
    'use strict';
    var oldLoad = WaveSurfer.load;
    WaveSurfer.load = function(){
        jQuery(this.container)
            .parents('.ojoo-audio')
            .find('.audio-download')
            .css('width', '300px')
            .append('<a title="free download ^^," class="si_buttons si_download" href="'+arguments[0]+'" download>free</a>');
        return oldLoad.apply(this, arguments);
    };
})();