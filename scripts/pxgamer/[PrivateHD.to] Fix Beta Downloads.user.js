// ==UserScript==
// @name         [PrivateHD.to] Fix Beta Downloads
// @namespace    pxgamer
// @version      0.2.0
// @description  Trying to download through beta beta.privatehd.to/download/torrent/*.torrent causes a 500 error. Simple bug fix to resolve this.
// @author       pxgamer
// @include      *beta.privatehd.to/*
// @grant        none
// ==/UserScript==
/*jshint multistr: true */

(function() {
    'use strict';

    $('a[href^="https://beta.privatehd.to/download/"]').each(function(){
        let newLink = $(this).attr('href').replace('beta.','');
        $(this).attr('href', newLink);
    });
})();
