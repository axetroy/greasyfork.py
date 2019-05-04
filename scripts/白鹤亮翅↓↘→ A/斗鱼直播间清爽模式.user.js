// ==UserScript==
// @name         斗鱼直播间清爽模式
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  开启清爽模式 移除无关元素
// @author       GodOfBug
// @match        https://www.douyu.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @run-at       document-end
// ==/UserScript==

(function () {


    // Your code here...
    jQuery.noConflict();
    var $ = window.jQuery;
    //setTimeout(function () {
    hide();
    //}, 500);


    var flag = false;
    var button = $('<button type="button" style="position:fixed;top:0px;left:0px;z-index:99999;color:#ec603d" title="失败点我刷新">清爽模式(点我切换)</button>');
    button.click(function () {
        if (flag) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            setTimeout(function () { hide(); }, 500);
            flag = false;
        } else {
            show();
            flag = true;
        }
    });

    $('body').append(button);

    $('main.layout-Main').css({
        'padding-top': '0px'
    });

    $(window).resize(function () {
        if (window.screen.availWidth - document.body.offsetWidth >= 100) {
            $('div.layout-Player-main ').css({
                'margin-right': '50px',
            });
        } else {
            $('div.layout-Player-main ').css({
                'margin-right': '364px',
            });
        }
    });

    var f = false;
    var timer = setInterval(function () {
        f = testPlayer();
        if (f) {
            console.info('clearInterval');
            clearInterval(timer);
        }
    }, 500);



    function testPlayer() {
        var fs = document.getElementsByClassName("wfs-2a8e83")[0];
        if (fs == undefined) {
            return false;
        } else {

            document.getElementsByClassName("wfs-2a8e83")[0].onclick = function () {
                if (!$('body').hasClass('is-fullScreenPage')) {
                    var btn = document.getElementsByClassName("layout-Player-asidetoggleButton")[0];
                    btn.click();
                }
                $('div.layout-Player-main ').css({
                    'margin-right': '',
                });
            }

            document.getElementsByClassName("wfs-exit-180268")[0].onclick = function () {
                var btn = document.getElementsByClassName("layout-Player-asidetoggleButton")[0];
                btn.click();
                $(window).resize();
            }

        }
        return true;
    }

    function hide() {
        $('aside').hide();
        $('div.layout-Player-aside').hide();
        $('#js-player-guessgame').hide();
        $('#js-bottom').hide();
        $('#js-room-activity').hide();
        $('#js-player-toolbar').css({
            'width': '0px',
            'height': '0px',
            'overflow': 'hidden'
        });
        $('#focusModel-97f7d5').hide();

        if (window.screen.availWidth - document.body.offsetWidth >= 100) {
            $('div.layout-Player-main ').css({
                'margin-right': '50px',
            });
        }
    }

    function show() {
        $('aside').show();
        $('div.layout-Player-aside').show();
        $('#js-player-guessgame').show();
        $('#js-bottom').show();
        $('#js-room-activity').show();
        $('#js-player-toolbar').css({
            'width': '',
            'height': '',
            'overflow': ''
        });
        $('#focusModel-97f7d5').show();

        $('div.layout-Player-main ').css({
            'margin-right': '364px',
        });
    }


})();