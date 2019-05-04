// ==UserScript==
// @name         SteamGifts: Look for similar
// @namespace    lainscripts_sg_look_for_similar
// @version      3.7
// @description  Adds a button to search for a similar giveaways.
// @author       lainverse
// @match        *://www.steamgifts.com/
// @match        *://www.steamgifts.com/giveaway/*
// @match        *://www.steamgifts.com/giveaways/*
// @match        *://www.steamgifts.com/discussion/*
// @grant        none
// ==/UserScript==
/* jshint esnext: true */
(function() {
    'use strict';

    // NodeList iterator polyfill (mostly for Safari)
    // https://jakearchibald.com/2014/iterators-gonna-iterate/
    if (!NodeList.prototype[Symbol.iterator]) {
        NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
    }

    (function(st) {
        st.id = 'sg_look_for_similar_stylesheet';
        document.head.appendChild(st);
        st.sheet.insertRule(
            '.featured__heading .fa-search {' + (
                'font-size: 1.8em'
            ) + '}', 0);
        st.sheet.insertRule(
            '.lfsList {' + (
                'position: relative;'+
                'display: inline-block;'+
                'margin-right: -5px'
            ) + '}', 0);
        st.sheet.insertRule(
            '.lfsMenu { ' + (
                'display: none;'+
                'position: absolute;'+
                'min-width: max-content;'+
                'background-color: #f9f9f9;'+
                'box-shadow: 0px 4px 8px -2px #666;'+
                'padding: 5px 0px'
            ) + '}', 0);
        st.sheet.insertRule(
            '.lfsOpts {' + (
                'display: block;'+
                'font-weight: bold;'+
                'min-width: max-content;'+
                'white-space: nowrap;'+
                'color: rgb(70, 86, 112) !important;'+
                'padding: 5px 15px 5px 5px;'+
                'text-decoration: none !important;'+
                'font-size: 12px !important'
            ) + '}', 0);
        st.sheet.insertRule(
            '.lfsOpts:hover {' + (
                'background-color: #ddd'
            ) + '}', 0);
        st.sheet.insertRule(
            '.lfsList:hover > .lfsMenu {' + (
                'display: inline-block;'+
                'z-index: 100'
            ) + '}', 0);
        st.sheet.insertRule(
            '.lfsList > .fa, .lfsList > a {' + (
                'display: block;'+
                'padding: 2px 5px 0 5px;'+
                'margin-left: 0'
            ) + '}', 0);
        st.sheet.insertRule(
            '.lfsList:hover .fa {' + (
                'color: rgb(70, 86, 112)'
            ) + '}', 0);
        st.sheet.insertRule(
            '.lfsList:hover {' + (
                'background-color: #f9f9f9;'+
                'box-shadow: 0px 4px 8px 0px #666;'
            ) + '}', 0);
    })(document.createElement('style'));

    var loc = ( location.pathname
               .replace(/^\/$/,'/giveaways')
               .replace(/^\/giveaway\/.*$/, '/giveaway')
               .replace(/\/search$/i, '')
               .replace(/^\/discussion\/.*/i,'/discussion')),
        type = loc.match(/\/([^/]+)\/?$/i)[1],
        locs = {
            local    : {title: 'Here', id: 'lfsInLocal', loc: loc},
            entered  : {title: 'Entered',   id: 'lfsInEntered', loc: '/giveaways/entered'},
            giveaways: {title: 'All Giveaways', id: 'lfsInGiveaways', loc: '/giveaways'}
        },
        contSearch = {
            giveaway  : [locs.giveaways, locs.entered],
            won       : [locs.local, locs.entered],
            giveaways : [locs.local, locs.entered],
            entered   : [locs.local, locs.giveaways],
            discussion: [locs.giveaways, locs.entered],
            default   : [locs.local]
        },
        clHeader = (
            '.giveaway__heading__name,'+
            '.featured__heading__medium,'+
            'a.table__column__heading,'+
            '.markdown td > strong > a[href]'
        ),
        clHeaderIns = [
            'giveaway__heading__name',
            'table__column__heading'
        ],
        caHeaderSib = [
            'giveaway__heading__thin',
            'featured__heading__small'
        ];

    if (!(type in contSearch)) type = 'default';

    function ofClass(itm, lst) {
        for (var cls of lst) {
            if (itm.classList.contains(cls)) {
                return true;
            }
        }
        return false;
    }

    function createLFSIcon () {
        var ico = document.createElement('i');
        ico.className = 'giveaway__icon fa fa-search';
        return ico;
    }

    function createLFSLink (el, search) {
        var lnk = document.createElement('a');
        lnk.className = 'lfsOpts';
        lnk.textContent = el.title;
        lnk.href = el.loc + search;
        lnk.id = el.id;
        return lnk;
    }

    function appendLFSLink(he) {
        var heLink = he.pathname ? he : he.querySelector('a'),
            heText = he.textContent;

        // Do not parse invite-only giveaways, non-giveaway and not-steam links
        if (heText == 'Invite Only' ||
            (heLink &&
             !/^\/giveaway\//i.test(heLink.pathname) &&
             !/^store\.steampowered\.com|steamcommunity.com$/i.test(heLink.hostname))) {
            return;
        }

        // Do not add LFS button to a node with already existing LFS button
        if (he.parentNode.querySelector('.lfsList')) {
            return;
        }

        // Append LFS buttons
        var ovl = document.createElement('div'),
            mnu = document.createElement('div'),
            ico = he.parentNode.querySelector('a[href^="/giveaways/search?"]') || createLFSIcon();

        ovl.className = 'lfsList';
        ovl.appendChild(ico);
        mnu.className = 'lfsMenu';
        ovl.appendChild(mnu);

        heText = '/search?q=' + encodeURIComponent(
            heText
            .replace(/(\s\(\d+(P|\sCopies)\))+$/i,'')
            .replace(/\.\.\.$/,'')
        );

        for (var loc of contSearch[type]) {
            mnu.appendChild(createLFSLink(loc, heText));
        }

        while (he.nextElementSibling && ofClass(he.nextElementSibling, caHeaderSib))
            he = he.nextElementSibling;
        if (ofClass(he, clHeaderIns))
            he.appendChild(ovl);
        else
            he.parentNode.insertBefore(ovl, he.nextElementSibling);
    }

    for (var header of document.querySelectorAll(clHeader)) {
        appendLFSLink(header);
    }

    var obs = new MutationObserver(function(ms){
        var m, node, header;
        for (m of ms) {
            for (node of m.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    for (header of node.querySelectorAll(clHeader)) {
                        appendLFSLink(header);
                    }
                }
            }
        }
    });

    obs.observe(document.body, {childList: true, subtree: true});
})();