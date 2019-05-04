// ==UserScript==
// @name         Download all torrents on current page nyaa.si
// @namespace    vvrvhxnk.qpe
// @version      0.4
// @description  Clicking the link column opens all magnets on page
// @author       vvrvhxnk.qpe
// @include      *nyaa.si/*
// @grant        GM_addStyle
// ==/UserScript==
GM_addStyle(`
    .hdr-link::after {
        content: "\\f076";
        color: #808080;
        font-size: 0.85em;
		position: absolute;
		top: 12px;
		right: 8px;
		display: block;
		font-family: FontAwesome;
    }
    .hdr-link {
        width: 100px !important;
        cursor: pointer;
    }
`);
(function() {
    $('.hdr-link').attr('title', 'Download all');
    $('.hdr-link').click(function() {
        if (confirm('Are you sure you want to download all magnets on this page?')) {
            $('a[href^="magnet:?xt="]').each(function() {
                url = $(this).attr('href');
                var popout = window.open(url);
                window.setTimeout(function() {
                    popout.close();
                }, 5);
            });
        } else {}
    });
})();