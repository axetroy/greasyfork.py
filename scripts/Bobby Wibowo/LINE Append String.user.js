// ==UserScript==
// @name        LINE Append String
// @namespace   lineappendstring
// @description Automatic generation of append string for BetterDiscord plugin
// @include     https://store.line.me/stickershop/product/*
// @version     0.4.2
// @grant       none
// @run-at      document-end
// ==/UserScript==

(function() {
    'use strict';

    var title = document.querySelector('.mdCMN08Ttl').innerHTML;
    var firstStickerID = document.querySelector('.mdCMN09Image').style['background-image'].match(/sticker\/(\d+)/)[1];
    var length = document.querySelectorAll('.mdCMN09Li').length.toString();
    var animated = Boolean(document.querySelector('.MdIcoPlay_b'));
    var append_string = 'maganeAppendPack(`' + title + '`, ' + firstStickerID + ', ' + length + ', ' + (animated ? 1 : 0) + ')';

    var href = window.location.pathname.split('/');
    var locale = href[href.length - 1]

    var strings = {
        'title' : 'Title',
        'count': 'Sticker count',
        'first_id': 'First sticker ID',
        'animated': 'Animated',
        'append': 'Console command'
    }
    if (locale === 'ja') {
        strings = {
            'title' : 'タイトル',
            'count': 'スタンプの数',
            'first_id': '最初のスタンプID',
            'append': '追加のコマンド'
        }
    }

    var inlineCSS = `background: #2e3136;
padding: 1em;
-webkit-border-radius: 3px;
border-radius: 3px;
font-family: monospace;
line-height: 16px;
color: rgba(255,255,255,.7);
margin: 10px 0;`;

    console.log(`${strings['title']}: ${title}
${strings['first_id']}: ${firstStickerID}
${strings['count']}: ${length}
${strings['animated']}: ${String(animated)}
${strings['append']}:
${append_string}`);

    document.querySelector('.mdCMN08Txt').innerHTML += `<p style='${inlineCSS}'>
${strings['title']}: ${title}<br>
${strings['first_id']}: ${firstStickerID}<br>
${strings['count']}: ${length}<br>
${strings['animated']}: ${String(animated)}<br>
${strings['append']}: <br>
${append_string}
</p>`;
})();