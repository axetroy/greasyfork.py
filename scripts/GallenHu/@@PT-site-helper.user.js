// ==UserScript==
// @name         @@PT-site-helper
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  PT-site-helper PT 助手
// @author       You
// @match        http://hdhome.org/*
// @match        https://tp.m-team.cc/*
// @match        https://ourbits.club/*
// @match        https://nanyangpt.com/*
// @match        https://pt.btschool.net/*
// @match        https://pt.gztown.net/torrents.php*
// @match        https://www.nicept.net/torrents.php*
// @match        https://www.pthome.net/torrents.php*
// @match        http://www.hdscg.cc/torrents.php*
// @match        https://www.hdarea.co/torrents.php*
// @require https://cdn.staticfile.org/jquery/1.12.2/jquery.min.js
// @require https://greasyfork.org/scripts/373955-secretlyrequest/code/secretlyRequest.js?version=642317
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var url = window.location.origin;
    var fullurl = window.location.href;

    $('body, table, .torrents td').css({
        "background-color": "#efefef",
        "color": "#000"
    });
    $('table a').css('color', 'blue');
    var allFitStyle = `<style>
        .ddiframeshim { height:0!important; }
        </style>`;
    $('head').append(allFitStyle);

    setTimeout(function() {
        var $qiandao1 = $('#nav_block a.faqlink');
        var $qiandao2 = $('#outer a[href="index.php?action=addbonus"]');
        var $qiandao3 = $('#sign_in a');
        if ($qiandao1.length) {
            window.H.secretlyRequest($qiandao1.attr('href')).then((err) => {
                if (!err) $qiandao1.remove();
            });
        }
        if ($qiandao2.length) {
            window.H.secretlyRequest($qiandao2.attr('href')).then((err) => {
                if (!err) $qiandao1.remove();
            });
        }
        if ($qiandao3.length) {
            $qiandao3.click();
        }
    }, 2000);

    function insertButton(btnName) {
        var btn = `<button id="fn1"
        style="position: fixed; left: 10px; top: 10px; z-index: 9999; background: #fff; border: 1px solid #aaa; padding: 4px 10px;"
        >${btnName}</button>`;

        $('body').append(btn);
        $('#fn1').on('click', function () {
            start();
        });
    }

    function start() {
        var $free = $('.pro_free');
        var $free2 = $('.pro_free2up');
        $.each($free, (index, item) => {
            $(item).parent().attr('style', 'background: orange !important');
        });
        $.each($free2, (index, item) => {
            $(item).parent().attr('style', 'background: orange !important');
        });
    }

    insertButton('高亮Free');

    if (url.indexOf('gztown.net') > -1) {
        var style = `<style>
        img { display:none; }
        body,table { background-color: #fff !important; }
        .sticky_normal { background: #fff !important; }
        </style>`;
        $('head').append(style);
    }

    // show https ipv4 link
    if (fullurl.indexOf('tp.m-team.cc/details.php') > -1) {
        var $link = $("a:contains('[IPv4+https]')");
        var ahref = $link.attr('href');
        var urlTxt = url + ahref;
        var $td = $link.parent().parent();
        $td.prepend([
            '<input id="downloadurl" value="'+ urlTxt +'" style="width:700px">',
            '<span id="downloadurlinfo" style="color: #f60;"></span>',
            '<br><br>'
        ].join(''));
        $('body').on('click', '#downloadurl', function () {
            document.querySelector('#downloadurl').select();
            $('#downloadurlinfo').html('');
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                $('#downloadurlinfo').html('复制成功');
            }
        })
    }
    // shot
    if (fullurl.indexOf('tp.m-team.cc/torrents.php') > -1 || fullurl.indexOf('tp.m-team.cc/adult.php') > -1 || fullurl.indexOf('tp.m-team.cc/movie.php') > -1) {
        var insertSelector = function () {
            var sl = `<span style="position: fixed; left: 10px; top: 40px; z-index: 9999; background: #fff; border: 1px solid #aaa; padding: 4px 10px;"><select class="thumb-sl">
                <option value ="1">原始缩略图</option>
                <option value ="2">中号缩略图</option>
                <option value ="3">大号缩略图</option>
            </select></span>`
            $('body').append(sl);
        };
        var setSize = function(size) {
            var _s = size || '1';
            var heights = {
                '1': '43px',
                '2': '120px',
                '3': '280px'
            };
            $('td.torrentimg img').css({
                maxWidth: _s == 1 ? '75px' : 'none',
                height: heights[_s],
            });
        };
        var lis = function() {
            var $sl = $('.thumb-sl');
            $sl.on('change', function() {
                console.log(this.value);
                setSize(this.value);
            });
        };
        insertSelector();
        lis();
    }

    if (fullurl.indexOf('ourbits.club/details.php') > -1) {
        var $link = $("a:contains('[下载地址]')");
        var ahref = $link.attr('href');
        var urlTxt = window.location.origin + ahref;
        var $td = $link.parent();
        $td.prepend([
            '<input id="downloadurl" value="'+ urlTxt +'" style="width:700px">',
            '<span id="downloadurlinfo" style="color: #f60;"></span>',
            '<br><br>'
        ].join(''));
        $('body').on('click', '#downloadurl', function () {
            document.querySelector('#downloadurl').select();
            $('#downloadurlinfo').html('');
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                $('#downloadurlinfo').html('复制成功');
            }
        })
    }

    if (fullurl.indexOf('hdhome.org/details.php') > -1) {
        var $link = $("a:contains('请右键复制链接')");
        var ahref = $link.attr('href');
        var urlTxt = ahref;
        var $td = $link.parent();
        $td.prepend([
            '<input id="downloadurl" value="'+ urlTxt +'" style="width:700px">',
            '<span id="downloadurlinfo" style="color: #f60;"></span>',
            '<br><br>'
        ].join(''));
        $('body').on('click', '#downloadurl', function () {
            document.querySelector('#downloadurl').select();
            $('#downloadurlinfo').html('');
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                $('#downloadurlinfo').html('复制成功');
            }
        })
    }
})();
