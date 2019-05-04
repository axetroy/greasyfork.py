// ==UserScript==
// @name         Trakt Watchlist Downloader
// @namespace    https://greasyfork.org/en/scripts/17991-trakt-downloader
// @version      0.4
// @description  Trakt.tv torrent site(s) added to the Watch Now modal.
// @author       Tusk
// @match        https://trakt.tv/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';
var modal = $('#watch-now-modal');

var torrent_sites = [
    {
        name: 'The Pirate Bay',
        color: 'white',
        image: 'http://www.completemusicupdate.com/wp-content/uploads/2016/01/623thepiratebay.jpg',
        link: 'https://thepiratebay.org/search/%s 720p/0/3/0'
    }
];

$('.trakt-icon-play2-thick').on('click', function() {
    var checkExist = setInterval(function() {
        var $streaming_links = modal.find('.streaming-links');
        if ($streaming_links.length) {
            $streaming_links.append('<div class="title">Torrent Sites</div>');
            $streaming_links.append('<div class="section torrent-section"></div>');
            addSites();
            clearInterval(checkExist);
        }
    }, 100);
});

function addHeader($streaming_links) {
    $streaming_links.append('<div class="title">Torrent Sites</div>');
}

function addSites() {
    var name_of_item = modal.find('h1').text();
    for(var i=0;i < torrent_sites.length;i++) {
        var link = parse(torrent_sites[i].link, name_of_item);
        addSite(torrent_sites[i].name, torrent_sites[i].color, torrent_sites[i].image, link);
    }
}

function addSite(name, color, image, link) {
    modal.find('.torrent-section').append(`<a target="_blank" href="${link}"><div class="icon" style="background-color:${color};"><img class="lazy" src="${image}" alt="${name}"></div><div class="price">${name}</div></a>`);
}

function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, function() {
        return args[i++];
    });
}