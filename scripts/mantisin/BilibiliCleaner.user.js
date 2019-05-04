// ==UserScript==
// @name         BilibiliCleaner
// @namespace    http://tampermonkey.net/
// @version      0.9.5
// @description  Remove some boring tips.
// @author       mnts
// @include      http?://live.bilibili.com/?*
// @include      *://*live.bilibili.*/*
// @grant        none
// ==/UserScript==

function removeVideoCannotAutoplayTips()
{
    var divsTips = document.getElementsByClassName('video-cannot-autoplay-tips');
    for (var i = divsTips.length - 1; i >= 0; i--) {
        var divTips = divsTips[i];
        divTips.outerHTML = null;
    }
}

function clickPopup()
{
    var i = 0;

    //full channel present
    var divPopup = document.getElementById('chat-popup-area-vm');
    if (divPopup !== undefined && divPopup !== null) {
        var divsTitle = divPopup.getElementsByClassName('title');

        for (i = 0; i < divsTitle.length; i++) {
            var divTitle = divsTitle[i];

            var strsMatched = divTitle.innerHTML.match(/已.*等待/g);
            if (strsMatched === undefined || strsMatched === null) {
                var divsMain = divPopup.getElementsByClassName('main');

                for (var j = 0; j < divsMain.length; j++) {
                    divsMain[j].click();
                }
            }
        }
    }

    //full channel present, storm result, storm validate code input set focus
    var divsNotice = document.getElementsByClassName('link-popup-panel');
    var inputStormValid = null, divStormValidClose = null, btnStormValidValid = null; //for storm valid panel
    for (i = 0; i < divsNotice.length; i++) {
        var divNotice = divsNotice[i];

        var h2sTitle = divNotice.getElementsByClassName('popup-title');
        var h2Title = (h2sTitle.length > 0 ? h2sTitle[0] : h2sTitle);

        var inputsStormValid = divNotice.getElementsByClassName('link-input');
        var psTip = divNotice.getElementsByClassName('tip');
        if (psTip.length > 0 && inputsStormValid.length > 0) {
            if (psTip[0].innerHTML.match(/.*输入验证码才能领取奖励哦.*/g).length > 0) {
                inputStormValid = inputsStormValid[0];
                divStormValidClose = divNotice.getElementsByClassName('close-btn')[0];
                btnStormValidValid = divNotice.getElementsByClassName('bl-button')[0];
            }
        }

        var shouldContinue = true;
        if (h2Title.innerHTML === '获奖结果') shouldContinue = false;
        if (h2Title.innerHTML === '中奖名单') shouldContinue = false;
        if (h2Title.innerHTML === '节奏风暴') shouldContinue = false;
        //if (h2Title.innerHTML === '请填写信息') shouldContinue = true;

        if (shouldContinue === true) continue;

        var btnsOK = divNotice.getElementsByClassName('bl-button');
        for (j = 0; j < btnsOK.length; j++) {
            btnsOK[j].click();
        }

        var divsIgnoreNotices = document.getElementsByClassName('ignore-notice');
        var iptIgnore = document.getElementById('cbIgnore');
        if (iptIgnore !== undefined && iptIgnore !== null) iptIgnore.checked = true;
        var divsClose = divNotice.getElementsByClassName('close-btn');
        for (j = 0; j < divsClose.length; j++) {
            divsClose[j].click();
        }
    }

    //storm click
    var divsStorm = document.getElementsByClassName('rhythm-storm');
    if (inputStormValid === null || inputStormValid === undefined) {
        //click storm when there is no storm valid panel
        for (i = 0; i < divsStorm.length; i++) {
            var divStorm = divsStorm[i];
            divStorm.click();
        }
        flagDivInput = 0;
    } else {
        if (divsStorm.length <= 0 && (divStormValidClose != null && divStormValidClose != undefined)) {
            //close storm valid panel when storm has already disappeared
            divStormValidClose.click();
            flagDivInput = 0;
        } else {
            if (flagDivInput === 0) {
                inputStormValid.focus();
                inputStormValid.addEventListener('keyup', function(event) {
                    if (event.key === 'Enter') { //press enter to validate
                        var inputStormValid = event.target;
                        console.log('inputStormValid = ' + inputStormValid);
                        var divPopup = inputStormValid.parentNode, i = 0;
                        for (i = 0; i < 10; i++) {
                            if (divPopup.classList.contains('popup-content-ctnr')) break;
                            divPopup = divPopup.parentNode;
                        }
                        if (i >= 10) return;
                        console.log('divPopup = ' + divPopup);

                        var btnsOK = divPopup.getElementsByClassName('bl-button');
                        for (i = 0; i < btnsOK.length; i++) {
                            btnsOK[i].click();
                        }
                        console.log('btnsOK = ' + btnsOK);
                    }
                });
            }
            flagDivInput = 1;
        }
    }
}

function needsReload()
{ //for bilibili live room page h5 video player stucking and showing a loading indicator
    var needs = false;

    var divsLoading = document.getElementsByClassName('video-loading');
    if (divsLoading.length > 0) needs = true;

    if (needs === true) {
        var divsLiveEnding = document.getElementsByClassName('bilibili-live-player-ending-panel');
        if (divsLiveEnding.length > 0) {
            if (divsLiveEnding[0].style.display != "none") needs = false;
        }
    }

    return needs;
}

function doVideoReload()
{
    var divsReload = document.getElementsByClassName('bilibili-live-player-video-controller-reload-btn');
    if (divsReload.length <= 0) return;

    var divReload = divsReload[0];
    var btnsReload = divReload.getElementsByTagName('button');
    if (btnsReload.length <= 0) return;

    console.log('Loading detected, trying to reload...');
    var btnReload = btnsReload[0];
    btnReload.click();
}

function needsReloadPage()
{ //for 400 error when you reopen a closed bilibili live room page by Ctrl+Shift+T
    var divs404 = document.getElementsByClassName('error-404');
    var div404 = (divs404.length <= 0 ? null : divs404[0]);
    if (div404 === null) return false;

    var divsRightPanel = div404.getElementsByClassName('right-panel');
    var divRightPanel = (divsRightPanel.length <= 0 ? null : divsRightPanel[0]);
    if (divRightPanel === null) return false;

    var strsMatched = divRightPanel.innerHTML.match(/ 400/g);
    if (strsMatched === undefined || strsMatched === null) return false;

    return true;
}

function tryCommon()
{ //live.bilibili.com/*
    var body = document.getElementsByTagName('body')[0];
    if (body === undefined || body === null) return false;

    if (needsReloadPage()) location.reload();

    window.addEventListener('load', function(event) {
        removeVideoCannotAutoplayTips();
    });

    console.log('Setup removeVideoCannotAutoplayTips');
    console.log('Setup clickPopup');
    setInterval(function() {
        removeVideoCannotAutoplayTips();
        clickPopup();
    }, 500);
    console.log('Setup auto-reload when stucked');
    setInterval(function() {
        if (needsReload()) doVideoReload();
    }, 15000);

    return true;
}

var flagDivInput = 0;
tryCommon();
