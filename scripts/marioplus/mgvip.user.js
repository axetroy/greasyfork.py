// ==UserScript==
// @name         mgvip
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  芒果vip视频观看，解析是一个chrome拓展里边弄的,源解析里边太多乱七八糟的东西了。
// @author       marioplus
// @match        https://www.mgtv.com/*.html
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    // 初始css
    const marioPlayBtnCss = `
    :root {
        --mario-size: 60px;
    }

    a#mario-play-btn {
        position: fixed;
        z-index: 999;
        left: 50px;
        top: 150px;
        display: block;
        background: #536DFE;
        background-image: url('data:image/png;base64,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');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        color: white;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
        width: var(--mario-size);
        height: var(--mario-size);
        line-height: var(--mario-size);
        text-align: center;
        border-radius: calc(var(--mario-size) / 2);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1) 0s, -webkit-box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1) 0s;
        cursor: pointer;
        opacity: .4;
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
    }

    a#mario-play-btn:hover {
        opacity: 1;
    }

    a#mario-play-btn:active {
        -webkit-box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 5px 8px 0 rgba(0, 0, 0, .14), 0 1px 14px 0 rgba(0, 0, 0, .12);
        box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 5px 8px 0 rgba(0, 0, 0, .14), 0 1px 14px 0 rgba(0, 0, 0, .12);
    }`

    let marioStyle = document.createElement('style')
    marioStyle.type = 'text/css'
    try {
        marioStyle.appendChild(document.createTextNode(marioPlayBtnCss))
    } catch (ex) {
        // IE
        style.styleSheet.cssText = marioPlayBtnCss
    }
    document.getElementsByTagName("head")[0].appendChild(marioStyle)

    let marioPlayBtn = document.createElement('a');
    function marioNewWindow() {
        const marioBaseUrl = 'http://jx.918jx.com/jx.php'
        const marioMGUrl = location.href
        const marioParseUrl = `${marioBaseUrl}?url=${marioMGUrl}`
        window.open(marioParseUrl);
    }
    marioPlayBtn.onclick = marioNewWindow
    marioPlayBtn.id = 'mario-play-btn'
    marioPlayBtn.target = '_black'

    document.getElementsByTagName('body')[0].appendChild(marioPlayBtn)
})();