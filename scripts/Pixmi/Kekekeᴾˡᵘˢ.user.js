// ==UserScript==
// @name         Kekekeᴾˡᵘˢ
// @namespace    https://greasyfork.org
// @version      1.7.6
// @description  在kekeke加入黑名單、關鍵字遮蔽、儲存對話紀錄、色碼查看、滑出好料、發文通知開關、自訂顏色版面，等輔助工具
// @author       Pixmi
// @icon         http://www.google.com/s2/favicons?domain=https://kekeke.cc/
// @include      https://kekeke.cc/*
// @include      https://www.kekeke.cc/*
// @license      MIT
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

'use strict';

$(window).on('load',function () {

// 檢查Local Storage的kekeke_plug_config是否存在
if (localStorage.getItem('kekeke_plug_config') === null) {
    // 對config做初次設定
    var config = {
        matchName: true,
        matchColor: true,
        replace: true,
        keyword: false,
        Block_Word: '點讚,訂閱',
        tabTip: false,
        seeColor: false,
        Custom_Style: false,
        Body_Color: '#444444',
        Link_Color: '#FFAA00',
        Font_Color: '#eeeeee',
        Chat_Color: '0.5',
        Auto_Logs: false,
        Logs_Time: true,
        Logs_Clear: true,
        Download_Time: '0'
    };
    localStorage.setItem('kekeke_plug_config', JSON.stringify(config));
} else {
    // 舊版本升級新版本時，預防Local Storage出錯的檢查與設定
    var config = JSON.parse(localStorage.getItem('kekeke_plug_config'));
    if (config.keyword === null) { config.keyword = false; }
    if (config.Block_Word == null || typeof config.Block_Word !== 'string') { config.Block_Word = '點讚,訂閱'; } // 修正1.7.0版本config.Block_Word設定成陣列造成的錯誤
    if (config.Body_Color == null) { config.Body_Color = '#444444'; }
    if (config.Link_Color == null) { config.Link_Color = '#FFAA00'; }
    if (config.Font_Color == null) { config.Font_Color = '#EEEEEE'; }
    if (config.Chat_Color == null) { config.Chat_Color = '0.5'; }
    if (config.Auto_Logs == null) { config.Auto_Logs = false; }
    if (config.Logs_Time == null) { config.Logs_Time = true; }
    if (config.Logs_Clear == null) { config.Logs_Clear = true; }
    if (config.Download_Time == null) { config.Download_Time = '0'; }
    localStorage.setItem('kekeke_plug_config', JSON.stringify(config));
}
// 檢查Local Storage的kekeke_dice_config是否存在(是否有安裝Kekeke Dice Bot)
if (localStorage.getItem('kekeke_dice_config') !== null) {
    var dice = true;
} else {
    // 清空kekeke_logs紀錄
    localStorage.setItem('kekeke_logs', JSON.stringify([]));
}
setTimeout(function () {
    // 給部分物件加上ID
    $('table.SquareCssResource-chatRoom > tbody > tr:last').find('table').attr('id', 'ChatTable');
    $('div.gwt-MenuBar.gwt-MenuBar-horizontal.GlobalCssResource-statusPanel').attr('id', 'MenuBar');
    // 替換原有功能的Icon
    $('.SquareCssResource-inputAreaTool td:eq(0)').find('img').attr('src', 'data:image/png;base64,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')
    $('.SquareCssResource-inputAreaTool td:eq(1)').find('img').attr('src', 'data:image/png;base64,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')
    $('.SquareCssResource-inputAreaTool td:eq(2)').find('img').attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANlSURBVFhH7ZjbT1JxHMB9qf6a3tp6b731J/TSUw/JzanNyGWlZaUcQLGJCgc4XJWbOtOJeEMtb4imFszENk2Xt+bW3fh2vr+BmB6Qg4e05nf7jC98L3y2w4DfyTuLsziLDEKRr79IiQ0RhYiGDIjVFVs+KkX0jfh47kORT7fYqbbd9zMRyITRjlFQSY2/lGJDZXxFbqO2iAkGXMMAXz9lTDQUBpXMGNOWWpvia3IXmmJziK8gsjQdAXWBCZjHziAlY65RIt3VbKm6pbtcVtZ8Pq70Z2QriKwtLIFD0UouOcfnlRfVIv1L7U3tubhWMtQFxrEBRw/82F48MbaW3hBJKr/pUlwrGadBEEFBpZieUUoMQ5RY78Zvl1MnaL5ngpZHDOjkhl2lhF4QVHBnJQw7H8KctUxAwV6NBSaNNvKIzwUT3Hg3B/VyK2jv2mBjcZ6z5yhyJpiQ0z1pJ2QrmRPB/XL9YyuEbCUFFzwoNzi5SshWUlDBVHLHkRRM8Ci5BHwlBRHcjM4fkusZXIKu7sieWJcvTF47KIm/Flw7EwgiODv4igy2ukNEwNe/CJoSGzRWtO4JYl53x05q+Bx7cWaOneXamUAQQSTg6gWl1AhO6ziRw380jRXefYJe9s+DgUhiD/YOufo4d+1HMEEEJXFBs6qV5AcF/RYfqWFPJnKIoIJIdCoIX9YXYKRt4JAg7sNadGqKc5YLwQUTpBLk6k1HGkHTeEOpFRyUhxdOtRe2oq9hxHv4Evfbu0kNe7hmuUgpqCliQqZyK/hoNy/6GA+sz/phwOKFxnJPUpDNfbSL1LCHa5aLtIK4cHnCB5vzfth+2wsrkz7yBpivTfcQMMfXsIY59uJMKkG++44UbCo1Q7CjnTTbn9qg3+whefvzFgLmAbuX1DDHXpxJJch3378rqC4w+F80OE/8Eqtkhlin0kwEu1RmoMT0ZyJYLaavUxI61slKDlg8vLE/s0PDw6Qg5tZKK2dvOrRyZrdGZgBHOQM1Mvo7e3BK3hRASU2hsVtTzEzwRSUzLtffd8cSgpiz5+RVrt501BaaRsmJTqLvY8/IcrVYfSGud7yoFtEl9Q/c3/YE2Zw9Mv6d+zaZxJngcQMFa27bfjroYUAwP1WCVSL9FUpqCiilpiEEc7xjFS//z5GX9xs3v8BFmp3B8QAAAABJRU5ErkJggg==')
    $('.SquareCssResource-inputAreaTool td:eq(4)').find('img').attr('src', 'data:image/png;base64,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')
    $('.SquareCssResource-inputAreaTool td:eq(5)').find('img').attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAZESURBVFhH3VhZTFxVGMYlMa7xQU1cYow+mPjokvhg9MH45qO+GI0aTW2ZDQqm0ppgq7XLLHf2mTv33HNnCi0F2wqlQaB0UbaWlpa9VJbSUgoFalvaAgPM/f3PnUOZYUicmYIYv+TLwNw7///d//zLOTcjXVgy5XccJnnSuZ42CCbyKv/6vwOLjuaKG6labJZVm5HOWfR0I2TAffzy6gMFfiAYqTo3IkFrpQzObKo6spXKHd+Sx/ktqwt3pvsxq57C5ZMegFEJxjoJiHlUtWfTLsGkPMlvW11g1G52VrphZsAJ6kgAbvVLEPyBqq5s2u4wFDzBb1s9+DbIA037vBDuE2CflUBtEYGJPgn832EkDbSM37Z6EPPknoa9Pk1g33EX2I0UhlsIjHYQsJuUiEWn6PitqwP/BtrdWBwVyDja7IDZQS/AmARNpTIIBhreoSPP8dtXHuZ19C2rXv5UXCM+wv535shDzaXRJZ7nlSYXNB4gELkqQehHOWI1KEHtxysNc86uR20YEcEoz+HndWwzX9uMynTPEXecwEv1LkBRMN4lQW8tAax01W4MvcjNrBwsxuAbNr0SudFhh+MhH7C/rXpFW9ZYgYx7thKopjKo2H7I9zSCTXwzN7NysOroJ1gUk/MiBmpd4M6hkWriTxDYXe0GRxaF6UEJTv6KuWiig8yGRSd/aDfRAYte+UIzupzA5ru73C3Oxgrp/90FuMzaZ+z3kz12wKmiLfHVNrbMCopUXsLZXSNtkjEFaHi7IfACN33vYFMDx9odFplYIYxlLhH22wIJ35eYJThWIGtTxp1L51hxOUy0p3GvF0JbpDDmcYCbv3dYDcE8/wYSnuqNF8HIJglOjoTvG4q8sGc7CsSWU7hVnsUU2WbFojpX5dFSgBWcZY34FHeRPhwG+WmM3u2Wg54EEYyTfwrQUZF47Va3HUZa/JrAci9RsZrPs9l9vc0B0/igmM/T2Mg3cTfpQzDIweBmEmZGF4v4J0aGfZrAahnzDvNw91ZpZv7aiRIvThvay92kB+xnb6Nh9WJdfBEky8iVqMBD/qjA2EiPnHJq3+00BF/h7lKHI5ueOuQR52KdpkL1qqgJPOghajCfzIQXrYKYR6Zw2fXcXWowZwbfZc149ExiI06WMBbQBIY2U6gvWpjZ8zzk9mN1pzkKcWeiHLClH71wn10TNzMkab3y/OHEFsXyEBt6K3eZPNjZAhN4vLV86cpNlpFhP1xuJthSFLjZaU+4ztqNYFQmuNvkYcsqeJYl8PjZ9JdXY78Af3V6oSFmSxbLC384Aee0yt0mD5uOvs4Esh63lOHl4pWT0UpO+XjATmw4luLm7krwYl1UYMonwejGVFGXGm3Lya4qbeTNcLfJw/pN8Hn2ZNdaExN7OTiNFc4+T+/3gD1L0bZiKSE/P/9Btls+V+mDyQ5kuw+6KvxQ+BOB0wfSq+wKrwi/CgEYqovam+zw4v+Sijv0Uu42Nbhz5MoKD4kaQ9YECNRIEtxoTy+qQ41OKBMItJWKmr3brT5wracqFuTn3GVqMGcqn3lzlcjEWf7EnNM9Dug96oaJruSEss3spXonTHW74+wwoYKeRsxrdz3DXaYGa3bxw/iE1+sLpDjDzfvRMDbeyxiRpQQtJjs3s/3ipWPRyDHebvMB2UQBOwXh7tKDVSd/6cRluNbkv2u8cbcE7WWiFskxnNPHQgtnkjvno1FlaVDuCmhb/+lzTqgNBaCnakFgQ2EAxx+eDnEgcFfpoeTjkgfc65Xmwi0yLF5qxmoxAEXbiCZq6ITz7s56AseaE88kHeULoubZd1hks1lFruVu7g1sR+3MlsdLMcFvtcQ7Y8vfU4WRworsP+rTln6qy4PXvNBUJMGFmniBA0dE8ORSFVOnmJtfHpgN8msOFMkiOXoiXuQ8WVX2VidGbJ4sLexZVMXIljoMjoe46eVDNJL0DDsLs8jdPLO0kMUcrvPDPrO2o1btWcGdK/oWljVwPJl9xd4LenNp5DcvgY6DIlxrikaQCWK5OnhchOZfArD3Z5m9gWD9rsumI29yMysP9vKIVbgrVz4iGOgsG4uMbAnxUK79LZjoFLaRAkum8j4+2P38p/8+WD7Z1skvs7f+mKsfWQ3ye2yW88v/d2Rk/A3zhCPxJxMb3gAAAABJRU5ErkJggg==')
    $('.SquareCssResource-inputAreaTool td:eq(6)').find('img').attr('src', 'data:image/png;base64,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')
    // 增加清除好料的按鈕
    $('<span id="clearMedia">清除好料</span>').css({'cursor':'pointer','margin-left':'5px','padding':'0 3px'}).addClass('SquareCssResource-eventSectionModeSelector').insertBefore($('.SquareCssResource-mediaFlow .SquareCssResource-eventSectionModeSelector'));
    $('.SquareCssResource-eventSectionModeSelector').css({'border-width':'1px','border-style':'solid','line-height':'20px','box-sizing':'content-box','display':'block','height':'20px'});
    // 增加黑名單操作的按鈕
    $('<td class="gwt-MenuItem" id="Album_Mode" role="menuitem" title="以相簿形式觀賞及時好料">相簿模式</td>').insertAfter('.gwt-MenuItem:contains("Q & A")');
    $('<td class="gwt-MenuItemSeparator"><div class="menuSeparatorInner"></div></td>').insertAfter('.gwt-MenuItem:contains("Q & A")');
    $('<td class="gwt-MenuItem" id="viewBlockUser" role="menuitem" title="檢視在黑名單中的使用者，點擊使用者名稱即可對其解除封鎖。">檢視名單</td>').insertAfter('.gwt-MenuItem:contains("Q & A")');
    $('<td class="gwt-MenuItemSeparator"><div class="menuSeparatorInner"></div></td>').insertAfter('.gwt-MenuItem:contains("Q & A")');
    $('<td class="gwt-MenuItem" id="addBlockUser" role="menuitem" title="檢視目前有發言的使用者，直接點擊可封鎖該位使用者。">黑名單</td>').insertAfter('.gwt-MenuItem:contains("Q & A")');
    $('<td class="gwt-MenuItemSeparator"><div class="menuSeparatorInner"></div></td>').insertAfter('.gwt-MenuItem:contains("Q & A")');
    $('.gwt-MenuItem').hover(function() {
        $(this).addClass("gwt-MenuItem-selected");
    }, function() {
        $(this).removeClass("gwt-MenuItem-selected");
    });
    // 增加進階設定的按鈕
    $('<td><div><img id="KekekeConfig" src="data:image/png;base64,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" style="cursor: pointer;" title="開啟Kekekeᴾˡᵘˢ設定選項"></div></td>').insertBefore($('.SquareCssResource-submitInputButton'));
    // 沒安裝Kekeke Dice Bot的話，增加一個Kekeke Logs的按鈕
    if (!dice)
        $('<td><div><img id="KekekeLogs" src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVlSURBVHhe7VpbbxtFFDYgeEA88YIQzzzBT+GVF8QzSPWFRmpBRYClJlxKfWkhKHFivI4dK8FpbkVtqUBJ1FZpaBq7SWhDkya0SdwER0kaGiSKlA5z1nPW4/XY3rV3bW/YI31KduacOef7ZjI7u1mHbbbZZptttjkcXm/yBZ8z8rXfJWUoiEWR8bmkr4ALo6Xd/M7Il4IBrQnKhdHSbnT2H0LwxUt3yJWZjYZhaj5LUne3FcB1JR/E2NgSipBhtLQbqqdOVk/UQv7mwja5lt5UVgGjpd0aLYAR5MHHMgJcTW2Q3+7tyL8bRR5gCQFy5LfJenafzC3tFBCqhTzAEgLAzAN5wNqf+2Th/iOZUK3kwdcSAgBg5oH83PKuTEgP+ZnfxeShzxICYLHVzHw58oCmF0BNzEjygKYWwGzygKYVoB7kAU0pQL3IA0wXIHRyRElSK0Inh+UxgVC4bbSov/vzUV3kARjLaGk3DOSTidDVOqIkqRUwFhIKf3G+uJ+KwueuRB6AsYyWdsNAPmEtUBcL15V8EHqXPY+mEKBR5AENF6CR5AHIowRKvzFCJz65XjSaPIAjWxqiN0bYyRcggpF3ATXwrgCohjwAx8rOdCp4sjYk4/71AewvfmOEgTxZEYy8C6gBY0MOnvzi2l4BwXKAOBxLJAAA+xntvGGHmnAlqGcKriv5ICot+9sru/IjM/zk40TAvMijLgKYS/4RWd18LAsAP+Gaj+fB50UepgtgJvnF1T3lhQkPaOfHAajzIg9TBIDXWFdTm6aSR2hZAaK8yMNwAeaXcu/wltf/IrcWyxdRK3lEuT1AlBeAPAwXAGZ+hZKfvZd/iWkmeYToLlCKPAB5GC4AJE3XaebLoRx5APIwVAB1sc1KHoA8DBEATn1dbSMFRcBhhT+xAaAtTJ/deT94vlc/z4vGAz9RrLpNlBfGU7chD0MEwDYsAmZA7ce38QWr/UTj8X7l2kR5+fFEbVULMDGdIT+OLZDBy7OK87lLtxQ0Y9vgT7NyzeM31pW2qgUYooNhgvbPBmTwSZu5bYibtKoF4BNYEchDtwD4gUQicU04sBUAtQOHjg8j+gXQ84lM+ydJmjBdVABg4GJaXpaiuHrhciisXwB4TcRE0PSRVP/wDaEA3YELQv96AGYeyG9M58lvpbq0CaDVgi2xv2GAvuRUEfneXroE3awgZ+QdFiI0LISfKTOweztqnABer/fZgDt6AAMkz88UkE+O3iRnjydYgsgvxEGeYWFCw0JERRuFrXSI/PPgnHECBI5E34Dg4NFYAfn+4Wny7cf9ucGd0toZT/crLKSkYSGiwmvFVipEZ14qIl+zAD6n5IbgjtYhhXw8doWcPdYrDxpwSeunPJHXmXtZw0LUBZoNzMvK0Gc+VyQNwT3hcZLomyQdbfkBA27pV//70deYa0XDOFGRZgLzsjK0m8/5/VsY/M0JttwpAp6eg8DR+Keh90LPM1dNhueOP64nhYWaAcjF6q7iQ0qnNI+kAcGWnqedrcNjlPyrzEWX6Tl3iPDD6Th5sqoiSa/7T8WF/gWo5lNaurOP0z0gG/wg2nemJf4unfEXWVdVpvfcIcLK5ECBANm5igewDOSs6mPqZjK6FwWB0IVQokCAB1OKAFPM9XAa3Gl8LulfvzvydGUyv4c8TOUEoALdYa6H1+C/vEC286PoQXY+d7/fXx6kmzIIID2udBCzvMl7CN2XQITvjkXJ3YncSoi19sir4LQn/CZzPbzWfqT9Jbox/wyEAfG2mCIA3exOMLfDbcm3k89RwsfpuWIPhQDQP4Ml5vL/MH9L98uUuAcexCh26MqYYF222WabbbaJzeH4D6uBiP3McYkFAAAAAElFTkSuQmCC" style="cursor: pointer;" title="開啟Kekeke Logs設定選項"></div></td>').insertBefore($('.SquareCssResource-submitInputButton'));
    $('.SquareCssResource-chatRoom .SquareCssResource-inputArea td > div').css('padding', '0 1px');
    $('head').append($('<style></style>').attr('id','Custom_Style'));
    $('body').append($('<div></div>').addClass('slide'));
    // 自訂色系
    if (config.Custom_Style)
        CustomStyle(config);
    Observer();
}, 1500);

var observeConfig = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
};

function Observer() {
    var defaultTitle = $(document).attr('title');

    // 建立rootObserver監控
    var rootObserver = new MutationObserver(function (mutations) {
        // 設定要監控的元素
        var chatElement = document.body.querySelector('table#ChatTable'),
            mediaElement = document.body.querySelector('table.SquareCssResource-mediaFlow'),
            voteElement = document.body.querySelector('table.SquareCssResource-lightningVote'),
            slideElement = document.body.querySelector('div.slide'),
            titleElement = document.head.querySelector('title'),
            config = JSON.parse(localStorage.getItem('kekeke_plug_config'));
        // 確認chatElement、voteElement都已經生成
        if (chatElement && voteElement) {
            // 結束rootObserver監控
            rootObserver.disconnect();
            console.log('Kekekeᴾˡᵘˢ 1.7.6 已在 ' + document.title + ' 啟動。');

            // 從關鍵字設定遮蔽聊天內容
            function RemoveKeyword(Post_Name,Post_Content) {
                var config = JSON.parse(localStorage.getItem('kekeke_plug_config'));
                var keyword = config.Block_Word.split(',');
                if (config.keyword) {
                    keyword.forEach(function(item,index) {
                       if (Post_Content.text().indexOf(keyword[index]) >= 0) {
                           Post_Content.parents('.SquareCssResource-chatContent').remove();
                           console.log(Post_Name.text() + '發了含有 [' + keyword[index] + '] 的訊息，已將訊息移除。');
                       }
                    });
                }
            }
            
            // 遮蔽判斷的function
            function Blocked(target) {
                chatObserver.disconnect();
                var config = JSON.parse(localStorage.getItem('kekeke_plug_config'));
                var blockArray = JSON.parse(localStorage.getItem("blacklist"));
                $(blockArray).each(function () {
                    var blocklistName = this.name;
                    var blocklistColor = this.color;
                    // 依照使用者儲存的判斷模式做篩選
                    if (config.matchName && config.matchColor) {
                        if ($(target).text() == blocklistName && $(target).css('color') == blocklistColor) { actionBlock($(target)) }
                    } else if (config.matchName && !config.matchColor) {
                        if ($(target).text() == blocklistName) { actionBlock($(target)) }
                    } else if (!config.matchName && config.matchColor) {
                        if ($(target).css('color') == blocklistColor) { actionBlock($(target)) }
                    }
                    if (config.replace) {
                        var Post_Content = target.parents('.SquareCssResource-chatContent').find('.SquareCssResource-message');
                        // 檢查聊天文字內容是否有@黑名單的人
                        if (Post_Content.html().indexOf('@' + blocklistName + ' ') >= 0){
                            var Message = Post_Content.html().replace('@' + blocklistName + ' ','');
                            $(Post_Content).html(Message);
                        }
                        if (Post_Content.html().indexOf('@' + blocklistName + '<') >= 1){
                            var Message = Post_Content.html().replace('@' + blocklistName + '<','<');
                            $(Post_Content).html(Message);
                        }
                    }
                });
                chatObserver.observe(chatElement, observeConfig);
            }

            // 實際執行遮蔽的function
            function actionBlock(element) {
                // 確認封鎖對象有沒有發出超鏈結
                var text = element.parents('.SquareCssResource-chatContent').find('.SquareCssResource-message');
                var links = element.parents('.SquareCssResource-chatContent').find('.GlobalCssResource-external').attr('href');
                // 發文有含連結，但避開是刪除好料的連結
                if (links && text.html().indexOf('delete') == -1) {
                    // 判斷鏈結是不是youtube網址
                    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                    var youtubeLink = links.match(regExp);
                    if (youtubeLink && youtubeLink[7].length == 11) {
                        // 移除youtube影片
                        $('iframe[src="https://www.youtube.com/embed/' + youtubeLink[7] + '"]').parents('.SquareCssResource-media').hide();
                        $('.SquareCssResource-mediaFlow').find($('iframe[src="https://www.youtube.com/embed/' + youtubeLink[7] + '"]')).remove();
                        console.log('移除影片 https://www.youtube.com/embed/' + youtubeLink[7]);
                    } else {
                        // 移除圖片或其他鏈結方式的影片
                        $('[src*="' + links + '"]').parents('.SquareCssResource-media').hide();
                        $('[src*="' + links + '"]').remove();
                        console.log('移除圖片 ' + links);
                    }
                }
                element.parents('.SquareCssResource-chatContent').hide();
                console.log('發現黑名單對象 ' + element.text() + ' 的發言，進行遮蔽');
            }
            
            // 呼叫modal
            function modal(text) {
                $('body').css('overflow', 'hidden');
                $('<div id="dark_curtain"></div>').css({ 'cursor': 'pointer', 'position': 'fixed', 'top': '0', 'bottom': '0', 'left': '0', 'right': '0', 'background-color': 'rgba(0,0,0,.5)', 'z-index': '999' }).appendTo('#MenuBar');
                $('<ul id="block_list"></ul>').css({ 'border': '1px solid #bbb', 'border-radius': '5px', 'position': 'fixed', 'width': '400px', 'max-height': '85vh', 'background': '#fff', 'margin': '0', 'padding': '0', 'list-style': 'none', 'top': '50px', 'left': 'calc(50vw - 200px)', 'overflow': 'auto', 'z-index': '1000' }).appendTo('#MenuBar');
                $('<li>' + text + '</li>').css({ 'padding': '0 10px', 'text-align': 'center', 'background-color': '#eee', 'border-radius': '5px 5px 0 0' }).appendTo('#block_list');
                $('.gwt-MenuItem:last').css('border-radius', '0 0 5px 5px');
                $('#dark_curtain').click(function () {
                    $('body').css('overflow', 'unset');
                    $('#dark_curtain').fadeOut(300, function () { $('#dark_curtain').remove(); });
                    $('#block_list').fadeOut(300, function () { $('#block_list').remove(); });
                });
            }

            // 按鈕的滑入滑出效果
            function hover() {
                $('.gwt-MenuItem').hover(function () {
                    $(this).addClass("gwt-MenuItem-selected");
                }, function () {
                    $(this).removeClass("gwt-MenuItem-selected");
                });
            }

            // 色碼轉換的function
            function rgb2hex(rgb) {
                if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
                rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                function hex(x) {
                    return ("0" + parseInt(x).toString(16)).slice(-2);
                }
                return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
                /* RGB轉換的參考資料
                 * https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
                 * */
            }

            // 日期+時間函數
            function getDateTimes(get,mode) {
                if (get) {
                    var dt = new Date(),
                        year = dt.getFullYear(),
                        month = (dt.getMonth() < 10 ? "0" : "") + dt.getMonth()+1,
                        day = (dt.getDate() < 10 ? "0" : "") + dt.getDate(),
                        hours = (dt.getHours() < 10 ? "0" : "") + dt.getHours(),
                        minutes = (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes(),
                        seconds = (dt.getSeconds() < 10 ? "0" : "") + dt.getSeconds();
                    if (mode === 'logs') {
                        var text = hours + ':' + minutes + ':' + seconds + " - ";
                    }
                    if (mode === 'files') {
                        var text = year + month + day + '-' + hours + minutes + seconds;
                    }
                } else {
                    var text ='';
                }
                return text;
            }

            // 檢查自動下載
            if (!dice && config.Download_Time !== '0' && config.Auto_Logs) {
                var s = config.Download_Time*60*60*1000;
                if (s < 5000 || s === null) { s = 60*60*1000 } // 避免local storage發生問題時(例如NaN、0值)造成瀏覽器崩潰
                console.log('已開啟自動下載，每 ' + config.Download_Time + ' 小時自動下載對話紀錄');
                var Download_Logs = setInterval(function(){
                    console.save(JSON.parse(localStorage.getItem('kekeke_logs')), document.title + '.' + getDateTimes(true,'files') + '.log');
                    // 清空紀錄
                    if (config.Logs_Clear)
                        localStorage.setItem('kekeke_logs', JSON.stringify([]));
                },s);
            }
            
            // 建立titleObserver監控發文通知
            var titleObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    // 判斷title產生變化，是否與預設title不同
                    if (mutation.addedNodes[0].textContent !== defaultTitle) {
                        var config = JSON.parse(localStorage.getItem('kekeke_plug_config'));
                        if (!config.tabTip) {
                            // 將title替換為預設title
                            $(document).attr('title', defaultTitle);
                        } else {
                            var Post_Name = $('#ChatTable tr:first').find('.GlobalCssResource-colorNickname');
                            var blockArray = JSON.parse(localStorage.getItem("blacklist"));
                            $(blockArray).each(function () {
                                if (config.matchName && config.matchColor) {
                                    if ($(Post_Name).text() == this.name && $(Post_Name).css('color') == this.color) { $(document).attr('title', defaultTitle) }
                                } else if (config.matchName && !config.matchColor) {
                                    if ($(Post_Name).text() == this.name) { $(document).attr('title', defaultTitle) }
                                } else if (!config.matchName && config.matchColor) {
                                    if ($(Post_Name).css('color') == this.color) { $(document).attr('title', defaultTitle) }
                                }
                            });
                        }
                    }
                });
            });
            titleObserver.observe(titleElement, observeConfig);

            // 建立chatObserver監控聊天頻道
            var chatObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    // 有新的發言近來
                    if (mutation.type == 'childList' && mutation.addedNodes.length >= 1 && mutation.addedNodes[0].nodeName === 'DIV') {
                        if (mutation.addedNodes[0].classList.contains('SquareCssResource-chatContent')) {
                            // console.log($(mutation.addedNodes).find('.GlobalCssResource-colorNickname'));
                            var config = JSON.parse(localStorage.getItem('kekeke_plug_config')),
                                Post_Name = $(mutation.addedNodes[0]).find('.GlobalCssResource-colorNickname'),
                                Post_Content = $(mutation.addedNodes[0]).find('.SquareCssResource-message');
                            
                            // 將聊天紀錄輸出到console.log
                            if (config.Auto_Logs) {
                                let logs = JSON.parse(localStorage.getItem("kekeke_logs")),
                                    // 設置去除表情符號html與超連結html的regex
                                    text = Post_Content.html().split('<span class="SquareCssResource-chatDate">'),
                                    url = /<a class="GlobalCssResource-external" target="_blank" ref="noopener" href="((http|https)(:\/\/)[\w\+\-\*\/\.\&\:\(\)\<\>\?\=]*)">((http|https)(:\/\/)[\w\+\-\*\/\.\&\:\(\)\<\>\?\=]*)<\/a>/ig,
                                    emoji = /<img class="GlobalCssResource-smiley" src="\/com\.liquable\.hiroba\/emoji\/[\w]*\/[\w\+\-\*\/\^\.\&\:\(\)\<\>]*.[a-z]*" alt="([\w\+\-\*\/\^\.\&\:\(\)\<\>\@]*)">/ig,
                                    br = /<br>/ig,
                                    // 替換掉html，保留表情符號的alt與超連結的href
                                    logs_content = text[0].replace(url,'$1').replace(emoji,'$1').replace(br,''),
                                    // 設定時間戳記
                                    time = getDateTimes(config.Logs_Time,'logs');
                                // 略過空白的對話內容
                                if (logs_content !== '')
                                    logs.push(time + Post_Name.text() + ' : ' + logs_content);
                                localStorage.setItem('kekeke_logs', JSON.stringify(logs));
                            }
                            if (config.seeColor) {
                                let rgb = Post_Name.css('color'),
                                    userColor = $('<span>' + rgb2hex(rgb) + '</span>').css({ "color": rgb2hex(rgb), "font-weight": "normal", "padding-left": "5px" }).addClass('userColor');
                                Post_Name.after(userColor);
                            }
                            Blocked($(Post_Name));
                            RemoveKeyword(Post_Name,Post_Content);
                        }
                    }
                });
            });
            chatObserver.observe(chatElement, observeConfig);

            // 建立mediaObserver監控即時好料
            var mediaObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type == 'childList' && mutation.addedNodes.length >= 1 && mutation.addedNodes[0].localName == 'tr') {
                        var media = mutation.addedNodes[0];
                        // console.log(media);
                        setTimeout(function () {
                            mediaBoost($(media).find('.SquareCssResource-mediaContent'));
                        }, 1500);
                    }
                });
            });
            mediaObserver.observe(mediaElement, observeConfig);

            // 建立voteObserver監控投票
            var voteObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    // 有新的投票出現
                    if (mutation.type == 'childList' && mutation.addedNodes.length >= 1) {
                        if (mutation.addedNodes[0].childNodes.length >= 4) {
                            var initiator = $(mutation.addedNodes[0].childNodes[2]);
                            // console.log('發現新投票，發起人為 '+ $(initiator).text() + ' 辨識色碼為 ' + $(initiator).css('color'));
                            var config = JSON.parse(localStorage.getItem('kekeke_plug_config'));
                            var blockArray = JSON.parse(localStorage.getItem("blacklist"));
                            $(blockArray).each(function () {
                                if (config.matchName && config.matchColor) {
                                    if ($(initiator).text() == this.name && $(initiator).css('color') == this.color) {
                                        $('.SquareCssResource-voteChartPanel').css('display', 'none');
                                        console.log('發現由 ' + this.name + ' 發起的新投票，已進行遮蔽');
                                    }
                                } else if (config.matchName && !config.matchColor) {
                                    if ($(initiator).text() == this.name) {
                                        $('.SquareCssResource-voteChartPanel').css('display', 'none');
                                        console.log('發現由 ' + this.name + ' 發起的新投票，已進行遮蔽');
                                    }
                                } else if (!config.matchName && config.matchColor) {
                                    if ($(initiator).css('color') == this.color) {
                                        $('.SquareCssResource-voteChartPanel').css('display', 'none');
                                        console.log('發現由 ' + this.name + ' 發起的新投票，已進行遮蔽');
                                    }
                                }
                            });
                        }
                    }
                });
            });
            voteObserver.observe(voteElement, observeConfig);

            var oldWidth = $('#popup').width();
            // 建立slideObserver監控滑動視窗
            var slideObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.target.id === 'popup' && mutation.attributeName === 'style' && oldWidth !== $('#popup').width()) {
                        $('#popup').height(function () {
                            var newHeight = $('#popup').width()/$('#popup').attr('data-ratio');
                            // console.log(newHeight);
                            return newHeight;
                        });
                        if ($('#popupRotate').css('transform') !== 'matrix(1, 0, 0, 1, 0, 0)') {
                            $('#popupRotate').css('transform','rotate(0deg)');
                            $('#popupImg').css('top','0');
                        }
                        oldWidth = $('#popup').width();
                    }
                });
            });
            slideObserver.observe(slideElement, observeConfig);
            
            // 第一次清除動作
            $('table#ChatTable').find('.SquareCssResource-chatContent').each(function () {
                var Post_Name = $(this).find('.GlobalCssResource-colorNickname');
                var Post_Content = $(this).find('.SquareCssResource-message');
                Blocked(Post_Name);
                RemoveKeyword(Post_Name,Post_Content);
            });
            
            // 網頁開啟時的色碼檢查
            var config = JSON.parse(localStorage.getItem('kekeke_plug_config'));
            if (config.seeColor) {
                $('.SquareCssResource-chatContent').each(function () {
                    var rgb = $(this).find('.GlobalCssResource-colorNickname').css('color');
                    var userColor = $('<span>' + rgb2hex(rgb) + '</span>').css({ "color": rgb2hex(rgb), "font-weight": "normal", "padding-left": "5px" }).addClass('userColor');
                    $(this).find('.GlobalCssResource-colorNickname').after(userColor);
                });
            }
            
            setTimeout(function () {
                $('.SquareCssResource-mediaContent').each(function () {
                    mediaBoost($(this))
                });
            }, 1500);

            // 在線上使用者、封鎖使用者的按鈕上加入Class
            $('.SquareCssResource-inputAreaTool td:eq(1) div').addClass('list-fix');
            $('.SquareCssResource-inputAreaTool td:eq(5) div').addClass('list-fix');
            // 點了Class後，加入@功能與色碼檢視
            $('.list-fix').on('click', function () {
                setTimeout(function () {
                    var table = $('div.dialogContent').find('table[cellspacing="5"]').css({'display':'block'}),
                        tobdy = $(table).find('tbody').css({'display':'block'}),
                        tr = $(table).find('tr').css({'display':'inline','width':'50%','float':'left'}),
                        td = $(table).find('td').css({'display':'block','padding':'3px 0','height':'20px'});
                    $(td).each(function () {
                        $(this).find('.SquareCssResource-chatName').css({'display':'inline'});
                        var userName = $(this).find('.GlobalCssResource-colorNickname').text(),
                            userColor = $(this).find('.GlobalCssResource-colorNickname').css('color');
                        var at = $('<span>@</span>').css({'padding-right':'2px','cursor':'pointer','color':userColor}).click(function () {
                            var text = $('textarea.SquareCssResource-messageInputField').val();
                            $('textarea.SquareCssResource-messageInputField').val(text + ' @' + userName + ' ');
                            $('div.gwt-DialogBox').remove();
                        });
                        $(this).prepend(at);
                        $('<span></span>').css({'color':userColor,'padding-left':'5px'}).text(rgb2hex(userColor)).appendTo($(this).find('.SquareCssResource-chatName'));
                    });
                }, 500);
            });

            // 增加黑名單對象
            $('#addBlockUser').click(function () {
                modal('請選擇要加入黑名單的對象');
                var userArray = [];
                $('.SquareCssResource-chatContent:visible').each(function () {
                    var userName = $(this).find('.GlobalCssResource-colorNickname').text();
                    var userColor = $(this).find('.GlobalCssResource-colorNickname').css('color');
                    userArray.push({ name: userName, color: userColor });
                });
                var blockArray = [...new Set(userArray.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));
                // blockArray的處理參照這篇文章 https://guahsu.io/2018/04/JavaScript-Duplicates-Array-Object/
                // console.log(blockArray);

                $(blockArray).each(function () {
                    var li = $('<li></li>').attr({'role':'menuitem','title':'將 ' + this.name + ' 加入黑名單'}).css({ "cursor": "pointer", "font-weight": "400", "border-top": "1px solid #bbb" }).addClass('gwt-MenuItem blocked').appendTo('#block_list');
                    $('<span></span>').css({'color':this.color,'font-weight':'bold'}).text(this.name).appendTo(li);
                    $('<span></span>').css({'color':this.color,'padding-left':'10px'}).text(rgb2hex(this.color)).appendTo(li);
                });
                $('.blocked').hover(function () {
                    $(this).css('background-color','#eee');
                }, function () {
                    $(this).css('background-color','#fff');
                });
                $('.gwt-MenuItem.blocked').click(function () {
                    var blocklistName = $(this).find('span:first').text();
                    var blocklistColor = $(this).find('span:first').css('color');
                    var target = $(this).find('span');
                    console.log("已將 " + blocklistName + " 加入黑名單，識別色碼為 " + blocklistColor);

                    // 建立JSON資料格式
                    var blockArray;
                    if (localStorage.getItem('blacklist') === null) {
                        blockArray = [];
                    } else {
                        blockArray = JSON.parse(localStorage.getItem("blacklist"));
                    }
                    var blockUser = {}
                    blockUser.name = blocklistName;
                    blockUser.color = blocklistColor;
                    blockArray.push(blockUser);
                    localStorage.setItem("blacklist", JSON.stringify(blockArray));
                    $(this).remove();

                    $('table#ChatTable').find('.GlobalCssResource-colorNickname').each(function () {
                        Blocked($(this));
                    });
                });
            });

            // 查看黑名單
            $('#viewBlockUser').click(function () {
                modal('點擊名稱可將對象移除名單');
                $(JSON.parse(localStorage.getItem('blacklist'))).each(function () {
                    var li = $('<li></li>').attr({'role':'menuitem','title':'將 ' + this.name + ' 從黑名單中剔除'}).css({ "cursor": "pointer", "font-weight": "400", "border-top": "1px solid #bbb" }).addClass('gwt-MenuItem unblock').appendTo('#block_list');
                    $('<span></span>').css({'color':this.color,'font-weight':'bold'}).text(this.name).appendTo(li);
                    $('<span></span>').css({'color':this.color,'padding-left':'10px'}).text(rgb2hex(this.color)).appendTo(li);
                });
                $('.unblock').hover(function () {
                    $(this).css('background-color','#eee');
                }, function () {
                    $(this).css('background-color','#fff');
                });
                $('.gwt-MenuItem.unblock').click(function () {
                    // 取得解除對象的ID與色碼
                    var blocklistName = $(this).find('span:first').text();
                    var blocklistColor = $(this).find('span:first').css('color');
                    if (localStorage.getItem('blacklist') !== null) {
                        // 取出黑名單的Json
                        var blockArray = JSON.parse(localStorage.getItem('blacklist'));
                        // 對黑名進行一次遍歷
                        for (var key in blockArray) {
                            // 將解除對象的名稱與顏色進行比對
                            if (blockArray[key]['name'] == blocklistName && blockArray[key]['color'] == blocklistColor) {
                                console.log("解除封鎖 " + blockArray[key]['name'] + ' ' + blockArray[key]['color']);
                                blockArray.splice(key, 1);
                            }
                        }
                        // console.log(blockArray);
                        localStorage.setItem("blacklist", JSON.stringify(blockArray));
                    }
                    $(this).remove();
                });
            });

            // 相簿模式
            $('#Album_Mode').click(function () {
                $('body').css('overflow', 'hidden');
                $('<div></div>').attr('id','dark_curtain').css({'position':'fixed','top':'0','bottom':'0','left':'0','right':'0','background-color':'rgba(0,0,0,.75)','overflow-y':'auto','z-index':'999'}).appendTo('body');
                $('<div></div>').attr('id','album_panel').css({'background':'#fff','box-sizing':'border-box','width':'80%','min-height':'100vh','margin':'0 auto','padding':'5px 0','column-gap':'0','column-count':'4','counter-reset':'item-counter','position':'relative','z-index':'1010'}).appendTo('#dark_curtain');
                $('<div><h2>相簿模式</h2><p>提供快速閱覽與另存圖片的介面</p></div>').css({'text-align':'center',}).appendTo('#album_panel');
                $('<div></div>').css({'left':'0',}).addClass('close_curtain').appendTo('#dark_curtain');
                $('<div></div>').css({'right':'0'}).addClass('close_curtain').appendTo('#dark_curtain');
                $('.SquareCssResource-mediaFlow .SquareCssResource-imageMediaThumb').each(function () {
                    let url = $(this).attr('src'),
                        node = $('<div></div>').css({'background-color':'#fff','border':'1px solid #bbb','box-sizing':'border-box','border-radius':'5px','padding':'5px'}).addClass('album_node'),
                        link = $('<a></a>').attr({'href':url,'target':'_blank'}).css({'display':'block','outline':'none'}).appendTo(node),
                        image = $('<img>').attr({'src':url,'tittle':'點擊開新分頁'}).css({'width':'100%','height':'auto','border-radius':'5px'}).appendTo(link);
                    $('<div></div>').addClass('album_item').append(node).appendTo('#album_panel');
                    $('.album_item').css({'background-color':'transparent','box-sizing':'border-box','padding':'10px','-webkit-column-break-inside':'avoid','break-inside':'avoid','counter-increment':'item-counter'});
                });
                $('.album_node').hover(function() {
                    $(this).css('box-shadow','0px 1px 5px rgba(0,0,0,.25)');
                }, function() {
                    $(this).css('box-shadow','none');
                });
                $('.close_curtain').css({'cursor':'pointer','width':'15%','position':'fixed','top':'0','bottom':'0','z-index':'1005'}).click(function () {
                    $('body').css('overflow', 'unset');
                    $('#dark_curtain').fadeOut(300, function () { $('#dark_curtain').remove(); });
                });
            });
            
            // 清除所有好料
            $('#clearMedia').click(function () {
                $('.SquareCssResource-mediaFlow').find('table').find('tr').hide();
                $('.SquareCssResource-mediaFlow').find('table').find('.SquareCssResource-mediaContent').remove();
            });

            // Kekeke Plus設定
            $('#KekekeConfig').click(function () {
                $(this).toggleClass('init');
                if ($(this).hasClass('init')) {
                    var config = JSON.parse(localStorage.getItem('kekeke_plug_config'));
                    $(this).parent().css('position', 'relative');
                    $('<div id="KekekeConfig_panel"></div>').attr('id','KekekeConfig_panel').css({'background-color':'#fff','border':'1px solid #bbb','color':'#000','width':'250px','padding':'5px','position':'absolute','top':'30px','z-index':'999'}).insertAfter('#KekekeConfig');
                    $('<div><label><input type="checkbox" id="cb_matchName" checked="checked">以ID執行黑名單遮蔽</label></div>').appendTo('#KekekeConfig_panel');
                    $('<div><label><input type="checkbox" id="cb_matchColor" checked="checked">以色碼執行黑名單遮蔽</label></div>').appendTo('#KekekeConfig_panel');
                    $('<div><label><input type="checkbox" id="cb_replace" checked="checked">遮蔽@黑名單ID的對話</label></div>').appendTo('#KekekeConfig_panel');
                    $('<div><label><input type="checkbox" id="cb_keyword" checked="checked">遮蔽有下方關鍵字的對話</label></div>').appendTo('#KekekeConfig_panel');
                    var textarea = $('<textarea></textarea>').attr({'id':'input_keyword','rows':'2','title':'使用,做分隔'}).css({'width':'calc(100% - 17px)','margin-left':'17px','resize':'vertical','font-size':'14px'}).val(config.Block_Word);
                    $('<div></div>').append(textarea).appendTo('#KekekeConfig_panel');
                    $('<div><label><input type="checkbox" id="cb_tabTip" checked="checked">發文通知</label></div>').appendTo('#KekekeConfig_panel');
                    $('<div><label><input type="checkbox" id="cb_seeColor" checked="checked">檢視ID色碼</label></div>').appendTo('#KekekeConfig_panel');
                    $('<div><label><input type="checkbox" id="cb_Custom_Style" checked="checked">自訂版面顏色</label></div>').appendTo('#KekekeConfig_panel');
                    $('<div class="set_color"><label>背景顏色</label><input type="button" id="def_body_color" class="button_setting" value="預設"><input type="color" id="cb_body_color" class="button_setting color_select"></div>').appendTo('#KekekeConfig_panel');
                    $('<div class="set_color"><label>輔助顏色</label><input type="button" id="def_link_color" class="button_setting" value="預設"><input type="color" id="cb_link_color" class="button_setting color_select"></div>').appendTo('#KekekeConfig_panel');
                    $('<div class="set_color"><label>文字顏色</label><input type="button" id="def_font_color" class="button_setting" value="預設"><input type="color" id="cb_font_color" class="button_setting color_select"></div>').appendTo('#KekekeConfig_panel');
                    // 顏色選擇器的預設顏色
                    $('#cb_body_color').val(config.Body_Color);
                    $('#cb_link_color').val(config.Link_Color);
                    $('#cb_font_color').val(config.Font_Color);
                    $('<div class="set_color"><label>顏色濃度</label><input type="range" id="cb_chat_color" class="button_setting color_select"></div>').appendTo('#KekekeConfig_panel');
                    $('#cb_chat_color').attr({'min':'0.05','max':'0.9','step':'0.05','value':config.Chat_Color}).css({'width':'100px'});
                    $('<div style="padding-top: 3px"><button type="button" id="save_config" class="button_setting" title="儲存後將自動重新整理">儲存設定</button></div>').appendTo('#KekekeConfig_panel');
                    $('.set_color').css({'padding':'3px 0 0 17px','overflow':'hidden'})
                    $('.button_setting').css({'height':'20px','float':'right','margin':'0 2px','padding':'0','font-size':'10px','box-sizing':'border-box'});
                    // 開啟面板時，各選項的勾選狀態
                    if (!config.matchName) $('#cb_matchName').attr('checked', false);
                    if (!config.matchColor) $('#cb_matchColor').attr('checked', false);
                    if (!config.replace) $('#cb_replace').attr('checked', false);
                    if (!config.keyword) $('#cb_keyword').attr('checked', false);
                    if (!config.tabTip) $('#cb_tabTip').attr('checked', false);
                    if (!config.seeColor) $('#cb_seeColor').attr('checked', false);
                    if (!config.Custom_Style) {
                        $('#cb_Custom_Style').attr('checked', false);
                        $('.set_color').css('display','none');
                    }
                    // checkboxk的變換
                    $('#cb_matchName').on('change', function () {
                        (this.checked) ? config.matchName = true : config.matchName = false;
                    });
                    $('#cb_matchColor').on('change', function () {
                        (this.checked) ? config.matchColor = true : config.matchColor = false;
                    });
                    $('#cb_replace').on('change', function () {
                        (this.checked) ? config.replace = true : config.replace = false;
                    });
                    $('#cb_keyword').on('change', function () {
                        (this.checked) ? config.keyword = true : config.keyword = false;
                    });
                    $('#cb_tabTip').on('change', function () {
                        (this.checked) ? config.tabTip = true : config.tabTip = false;
                    });
                    $('#cb_seeColor').on('change', function () {
                        (this.checked) ? config.seeColor = true : config.seeColor = false;
                    });
                    $('#cb_Custom_Style').on('change', function () {
                        if (this.checked) {
                            config.Custom_Style = true;
                            $('.set_color').css('display','block');
                            CustomStyle(config);
                        } else {
                            config.Custom_Style = false;
                            $('.set_color').css('display','none');
                            $('#Custom_Style').html('')
                        }
                        localStorage.setItem('kekeke_plug_config', JSON.stringify(config));
                    });
                    $('.color_select').on('change', function () {
                        config.Body_Color = $('#cb_body_color').val();
                        config.Link_Color = $('#cb_link_color').val();
                        config.Font_Color = $('#cb_font_color').val();
                        config.Chat_Color = $('#cb_chat_color').val();
                        localStorage.setItem('kekeke_plug_config', JSON.stringify(config));
                        CustomStyle(config);
                    });
                    $('#def_body_color').click(function () {
                        $('#cb_body_color').val('#444444');
                        config.Body_Color = $('#cb_body_color').val();
                        localStorage.setItem('kekeke_plug_config', JSON.stringify(config));
                        CustomStyle(config);
                    });
                    $('#def_link_color').click(function () {
                        $('#cb_link_color').val('#FFAA00');
                        config.Link_Color = $('#cb_link_color').val();
                        localStorage.setItem('kekeke_plug_config', JSON.stringify(config));
                        CustomStyle(config);
                    });
                    $('#def_font_color').click(function () {
                        $('#cb_font_color').val('#EEEEEE');
                        config.Font_Color = $('#cb_font_color').val();
                        localStorage.setItem('kekeke_plug_config', JSON.stringify(config));
                        CustomStyle(config);
                    });
                    $('#save_config').click(function () {
                        config.Block_Word = $('#input_keyword').val();
                        localStorage.setItem('kekeke_plug_config', JSON.stringify(config));
                        $('#KekekeConfig').removeClass('init');
                        $('#KekekeConfig_panel').remove();
                        location.reload();
                    });
                } else {
                    $('#KekekeConfig_panel').remove();
                }
            });
            // Kekeke Logs設定
            if (!dice) {
                $('#KekekeLogs').click(function (){
                    $(this).toggleClass('init');
                    if ($(this).hasClass('init')) {
                        var config = JSON.parse(localStorage.getItem('kekeke_plug_config'));
                        $(this).parent().css('position', 'relative');
                        $('<div id="KekekeLogs_panel"></div>').css({'background-color':'#fff','border':'1px solid #bbb','color':'#000','width':'300px','padding':'5px','position':'absolute','top':'30px','z-index':'999'}).insertAfter('#KekekeLogs');
                        $('<table></table>').css({'width':'100%','table-layout':'fixed'}).appendTo('#KekekeLogs_panel');
                        $('<tr><td width="65px">自動記錄</td><td><label><input type="checkbox" id="cb_Auto_Logs" checked="checked">啟用自動紀錄</label></td></tr>').appendTo('#KekekeLogs_panel > table');
                        $('<tr><td></td><td><label><input type="checkbox" id="cb_Logs_Time" checked="checked">加入時間戳記</label></td></tr>').appendTo('#KekekeLogs_panel > table');
                        $('<tr><td>下載紀錄</td><td><select id="cb_Download_Time" style="width:100%"></select></td></tr>').appendTo('#KekekeLogs_panel > table');
                        function check_download_time(v,t) {                             
                            if (v == t)
                                return true
                            return false
                        }
                        $('<option></option>').attr({'value':'0','selected':check_download_time(0,config.Download_Time)}).text('手動下載').appendTo('#cb_Download_Time');
                        $('<option></option>').attr({'value':'1','selected':check_download_time(1,config.Download_Time)}).text('每1小時').appendTo('#cb_Download_Time');
                        $('<option></option>').attr({'value':'2','selected':check_download_time(2,config.Download_Time)}).text('每2小時').appendTo('#cb_Download_Time');
                        $('<option></option>').attr({'value':'6','selected':check_download_time(6,config.Download_Time)}).text('每6小時').appendTo('#cb_Download_Time');
                        $('<option></option>').attr({'value':'12','selected':check_download_time(12,config.Download_Time)}).text('每12小時').appendTo('#cb_Download_Time');
                        $('<option></option>').attr({'value':'24','selected':check_download_time(24,config.Download_Time)}).text('每24小時').appendTo('#cb_Download_Time');
                        $('<tr><td></td><td><label><input type="checkbox" id="cb_Logs_Clear" checked="checked">下載後清除舊紀錄 <small style="color: #777">(降低Storage使用量)</small></label></td></tr>').appendTo('#KekekeLogs_panel > table');
                        $('<div></div>').css({'padding-top':'3px'}).appendTo('#KekekeLogs_panel');
                        $('<button></button>').attr({'id':'save_logs_config','type':'button','title':'儲存後將自動重新整理'}).addClass('button_setting').text('儲存設定').appendTo('#KekekeLogs_panel > div');
                        $('<button></button>').attr({'id':'save_logs','type':'button'}).addClass('button_setting').text('下載對話紀錄').appendTo('#KekekeLogs_panel > div');
                        $('.button_setting').css({'height':'20px','float':'right','margin':'0 2px','padding':'0','font-size':'10px','box-sizing':'border-box'});
                        // 開啟面板時設定狀態
                        if (!config.Auto_Logs) $('#cb_Auto_Logs').attr('checked',false);
                        if (!config.Logs_Time) $('#cb_Logs_Time').attr('checked',false);
                        $('#cb_Auto_Logs').on('change', function () {
                            (this.checked) ? config.Auto_Logs = true : config.Auto_Logs = false;
                        });
                        $('#cb_Logs_Time').on('change', function () {
                            (this.checked) ? config.Logs_Time = true : config.Logs_Time = false;
                        });
                        $('#cb_Download_Time').on('change', function () {
                            config.Download_Time = $('#cb_Download_Time').val();
                        });
                        $('#cb_Logs_Clear').on('change', function () {
                            (this.checked) ? config.Logs_Clear = true : config.Logs_Clear = false;
                        });
                        $('#save_logs').click(function () {
                            console.save(JSON.parse(localStorage.getItem('kekeke_logs')), document.title + '.' + getDateTimes(true,'files') + '.log');
                            // 清空訊息紀錄
                            if (config.Logs_Clear)
                                localStorage.setItem('kekeke_logs', JSON.stringify([]));
                        });
                        $('#save_logs_config').click(function () {
                            localStorage.setItem('kekeke_plug_config', JSON.stringify(config));
                            $('#KekekeLogs').removeClass('init');
                            $('#KekekeLogs_panel').remove();
                            location.reload();
                        });
                    } else {
                        $('#KekekeLogs_panel').remove();
                    }
                });
            }
        }
    });
    rootObserver.observe(document, observeConfig);
}

/* MutationObserver的參考資料
 * https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 * https://www.htmlgoodies.com/beyond/javascript/respond-to-dom-changes-with-mutation-observers.html
 * https://javascript.ruanyifeng.com/dom/mutationobserver.html
 * https://segmentfault.com/a/1190000015215393 */

function CustomStyle(config) {
    var Chat_Color_1 = config.Chat_Color;
    var Chat_Color_2 = config.Chat_Color*1 + 0.1;
    $('#Custom_Style').html('body,.SquareCssResource-dockPanel,.SquareCssResource-squareHeader{background-color:'+config.Body_Color+'}.GlobalCssResource-footer{background-color:transparent;color:'+config.Link_Color+';text-align:center}.gwt-MenuBar-horizontal{background-color:rgba(255,255,255,0.15);background-image:none;border-width:0 0 1px}.gwt-MenuItemSeparator,.gwt-MenuBar-horizontal .gwt-MenuItemSeparator .menuSeparatorInner{background-color:#888}.gwt-MenuBar .gwt-MenuItem-selected{background-color:rgba(0,0,0,0.4)}.gwt-MenuBar-horizontal .gwt-MenuItem{color:'+config.Font_Color+'}.gwt-MenuBar-horizontal .gwt-MenuItemSeparator{border-left:none}.SquareCssResource-chatRoom .SquareCssResource-inputArea,.SquareCssResource-mediaFlow .SquareCssResource-mediaHeader,.SquareCssResource-posterPanel,.SquareCssResource-voteChartPanel{background-color:rgba(255,255,255,0.15);color:'+config.Font_Color+'}.SquareCssResource-chatRoom .SquareCssResource-inputArea{border-top-left-radius:5px;border-top-right-radius:5px}.GlobalCssResource-colorBox{background-color:rgba(255,255,255,0.15)!important;color:'+config.Link_Color+'!important;border-radius:5px}.GlobalCssResource-noOfCrowd{padding:.5em}.GlobalCssResource-colorBox,.SquareCssResource-squareHeaderAddress,.SquareCssResource-squareHeaderAddress > a,.SquareCssResource-squareStatusPanel .SquareCssResource-kermaEnoughMenu,.SquareCssResource-deviceShapeSelected,.KmarkCssResource-kmark a,.SquareCssResource-stickyPoster .SquareCssResource-title,.SquareCssResource-lightningVote .SquareCssResource-title,.SquareCssResource-mediaFlow .SquareCssResource-title,.HomeCssResource-topicLink a{color:'+config.Link_Color+'}.KmarkCssResource-kmark{color:'+config.Font_Color+'}.google-visualization-table{color:#333}.SquareCssResource-chatRoom .SquareCssResource-chatContent.SquareCssResource-even:not([class*="SquareCssResource-replyToMe"]){background-color:rgba(255,255,255,'+Chat_Color_1+')}.SquareCssResource-chatRoom .SquareCssResource-chatContent:not([class*="SquareCssResource-replyToMe"]){background-color:rgba(255,255,255,'+Chat_Color_2+')}.SquareCssResource-chatRoom .SquareCssResource-replyToMe{background-color:'+config.Link_Color+'!important}.SquareCssResource-chatRoom .SquareCssResource-chatContent .SquareCssResource-chatDate{color:#666}.SquareCssResource-posterPanel{padding:0}.SquareCssResource-eventSectionModeSelector{background-color:transparent;border-color:'+config.Link_Color+';color:'+config.Link_Color+'}.SquareCssResource-eventSectionModeSelector:hover{border-color:'+config.Font_Color+';color:'+config.Font_Color+'}.SquareCssResource-eventSectionModeSelector option{background-color:'+config.Body_Color+';color:'+config.Link_Color+'}.SquareCssResource-eventSectionModeSelector option:hover{color:'+config.Font_Color+'}');
}
    
function mediaBoost(element) {
    var content = element.parents('.SquareCssResource-media');
    // 判斷是否有滑出視窗的按鈕
    if (content.find('.SLP-Icon').length === 0) {
        var icon = $('<img>').addClass('SLP-Icon').css({'cursor':'pointer','width':'20px','height':'20px','vertical-align':'middle'}).attr('src','data:image/png;base64,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');
        var button = $('<div></div>').attr('title','滑出好料').css({'display':'inline-block','line-height':'0','padding-left':'3px','padding-right':'3px'}).append(icon);
        if (content.find('video').length !== 0) {
            $(content).find('table.SquareCssResource-mediaHeader').find('td[align="right"]').append('<div></div>');
        }
        $(button).click(function () {
            if ($('#popup')) $('#popup').remove();
            var popupTop = $('<div>滑出視窗</div>').attr('id','popupDrag').css({'cursor':'move', 'text-align': 'center', 'line-height': '26px','user-select': 'none', 'position': 'absolute', 'top': '0','left':'0','right':'0','z-index':'101'}),
                popupBottom = $('<div></div>').css({'user-select':'none','padding':'3px 0','position':'absolute','bottom':'0','left':'0','right':'15px','z-index':'101'}),
                popupClose = $('<img>').css({'cursor':'pointer','width':'20px','height':'20px','margin':'3px 5px','vertical-align':'middle','position':'absolute','top':'0','right':'0','z-index':'102'}).attr({'title':'關閉滑出視窗','src':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ7SURBVHhe7dw9TsNAEEDh1JwKCcUVF6CAk8AV4EDQ8yM6hOAO0AKiCl4rT0JRDI53dnZmM0+aJsVm9zMgF9iLKIqiKIq89Xh8fHC3XF7fHh0drj9yV9p7OkM6y/ojndIX3nfdw/PJyfdd1314RBzw+r2nM6SzqCGC93p6+vV1dbV6Oz9feUMEL+09nSGdRQVxE4/xhLiJxxRHHMNjPCCO4THFEP/DYywjDnjL5SgeI444FY+xiDgVjxFD3BWPsYS4Kx6TjTgXj7GAOBePyUK87bqbp/4eadvCU6cmYi4ekwySxXrZ6Q0b6A+fu4EaiFJ42Xv3iGgGjzwhmsMjD4hm8cjyBkX31q8jjkcWEd3gkSVEd3hkAZE9vF9cbF176qjjUU1E93hUA7EZPNJEbA6PNBCbxaOSiM3jUQnEvcEjacS9wiPJn5rcC5H24AqPpBBzxi0e1UR0j0c1EJvBI03E5vBIA7FZPCqJ2DwelUDcGzwCMfceL427m2SJAjAj8OJXeEYl8JjmEUviMc0iauAxzSFq4jHNINbAY9wj1sRj3CJK4aV7vNx7RXeI4EkdXOpCuECUxkvrsWbziCXw1kuL/kkwiVgSj5pF1MCj5hA18agZxBp45B6xJh65RZTCk9i4O0RLeOQG0SIemUccNtgJPWhT6CqLIo78k+esPOCROURPeGQG0SMemUAUe+BaGY+kEGc/cC3yyH8lPMpFfDk7q/PeBAt4NBcxG492RbSER7siiuHRVESLeDQVURyP/kO0jEd/IX5eXpbDozHEAU/ixlOhbYgqeLSJ6AmPfiOq4hGI7l/A2COqv4CR0hf2G4hXgEZRFEVRVKXF4gcoL/mW3+i3nwAAAABJRU5ErkJggg=='}).click(function () { $('#popup').remove(); });
            // 判斷是否為圖片、Youtube影片、Gif影片
            if (content.find('.SquareCssResource-imageMediaThumb').length !== 0) {
                var defaultSet = element,
                    img = $('<img>').attr({'id': 'popupImg', 'src': element.attr('src')}).css({ 'cursor': 'move', 'max-width': '100%', 'max-height': '100%', 'position': 'relative', 'top': '0' }),
                    media = $('<div></div>').attr('id','popupRotate').css({'transform':'rotate(0deg)','text-align':'center'}).append(img),
                    position = $(content).find('.SquareCssResource-posterCreator');
                // 圖片左轉90°
                $('<img>').css({'cursor':'pointer','width':'20px','height':'20px','margin-left':'5px','vertical-align':'middle'}).attr({'title':'將圖片左轉90°','src':' data:image/png;base64,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'}).click(function () {
                    var angle = Rotate($('#popupRotate')) - 90;
                    $('#popupRotate').css('transform','rotate(' + angle + 'deg)');
                    if (angle == -90 || angle == 90 || angle == 270) {
                        $('#popup').height($('#popup').width());
                        $('#popupImg').css('top',( $('#popupRotate').height() - $('#popupImg').height() ) / 2);
                    } else {
                        $('#popup').height( $('#popup').width() / $('#popup').attr('data-ratio') );
                        $('#popupImg').css('top','0');
                    }
                }).appendTo(popupBottom);
                // 圖片右轉90°
                $('<img>').css({'cursor':'pointer','width':'20px','height':'20px','margin-left':'5px','vertical-align':'middle'}).attr({'title':'將圖片右轉90°','src':'  data:image/png;base64,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'}).click(function () {
                    var angle = Rotate($('#popupRotate')) + 90;
                    $('#popupRotate').css('transform','rotate(' + angle + 'deg)');
                    if (angle == -90 || angle == 90 || angle == 270) {
                        $('#popup').height($('#popup').width());
                        $('#popupImg').css('top',( $('#popupRotate').height() - $('#popupImg').height() ) / 2);
                    } else {
                        $('#popup').height( $('#popup').width() / $('#popup').attr('data-ratio') );
                        $('#popupImg').css('top','0');
                    }
                }).appendTo(popupBottom);
                // 圖片水平翻轉
                $('<img>').css({'cursor':'pointer','width':'20px','height':'20px','margin-left':'5px','vertical-align':'middle'}).attr({'title':'將圖片水平翻轉','src':'  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAOKAAADigGnjPUfAAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTExLTE4VDIyOjQyOjM3KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0xMS0xOFQyMjo1MTozMSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0xMS0xOFQyMjo1MTozMSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NGUwMmFlYy03MjA1LTI0NGItOWYzYS1hMmM2Y2Y3MDMzMTIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDplZjc2YTQxZi02N2I4LWVmNDItYjU2ZS1lY2UzNTdjYTZlN2UiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNzM3MTdlYy1kNDkyLTUzNDItOTc1ZC04MTlhZTMxMDhjOTgiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmE3MzcxN2VjLWQ0OTItNTM0Mi05NzVkLTgxOWFlMzEwOGM5OCIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xOFQyMjo0MjozNyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkMDNkOWE3MS01ZTcyLTVhNDQtYWZjMC1jNWFjMzhmOTcwYWQiIHN0RXZ0OndoZW49IjIwMTgtMTEtMThUMjI6NDY6MjgrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTRlMDJhZWMtNzIwNS0yNDRiLTlmM2EtYTJjNmNmNzAzMzEyIiBzdEV2dDp3aGVuPSIyMDE4LTExLTE4VDIyOjUxOjMxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+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'}).click(function () {
                    $('#popupImg').toggleClass('horizontal-flip');
                    if ($('#popupImg').hasClass('horizontal-flip')) {
                        $('#popupImg').css('transform','rotatey(180deg)');
                    } else {
                        $('#popupImg').css('transform','rotatey(0deg)');
                    }
                }).appendTo(popupBottom);
                // 圖片垂直翻轉
                $('<img>').css({'cursor':'pointer','width':'20px','height':'20px','margin-left':'5px','vertical-align':'middle'}).attr({'title':'將圖片垂直翻轉','src':'  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAOKAAADigGnjPUfAAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTExLTE4VDIyOjQyOjM3KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0xMS0xOFQyMjo1MTo1MSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0xMS0xOFQyMjo1MTo1MSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNDdmZjYxMC03MTRhLTU5NDctYWY3NC03ZDFhYTAxMTQzZDMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5M2QxZjUxMS04NTMzLWE0NDMtOGE4ZC1kOThiNGM1MWM2N2EiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NzFjNjYzOC0xMzVmLTMwNGQtYTFiMy02YTlmM2VjMTEyYjkiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjg3MWM2NjM4LTEzNWYtMzA0ZC1hMWIzLTZhOWYzZWMxMTJiOSIgc3RFdnQ6d2hlbj0iMjAxOC0xMS0xOFQyMjo0MjozNyswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplOGQ3ZWQ2Yi0yMGEzLTA3NGMtYjkyMS1iOWFmY2UwZjMzOTgiIHN0RXZ0OndoZW49IjIwMTgtMTEtMThUMjI6NDY6NTMrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MTQ3ZmY2MTAtNzE0YS01OTQ3LWFmNzQtN2QxYWEwMTE0M2QzIiBzdEV2dDp3aGVuPSIyMDE4LTExLTE4VDIyOjUxOjUxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+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'}).click(function () {
                    $('#popupImg').toggleClass('vertical-flip');
                    if ($('#popupImg').hasClass('vertical-flip')) {
                        $('#popupImg').css('transform','rotatex(180deg)');
                    } else {
                        $('#popupImg').css('transform','rotatex(0deg)');
                    }
                }).appendTo(popupBottom);
            } else if (content.find('.SquareCssResource-youtubeWrapper').length !== 0) {
                var defaultSet = content.find('iframe'),
                    media = defaultSet;
            } else if (content.find('video').length !== 0) {
                var defaultSet = content.find('video'),
                    media = defaultSet;
            }
            $(media).css({'display':'block','width':'100%','height':'100%','user-select': 'none'})
            var AspectRatio = defaultSet.width()/defaultSet.height();
            var popup = $('<div></div>').attr({'id':'popup','data-ratio':AspectRatio}).css({'background-color': '#333', 'border-radius': '5px', 'box-shadow': '0px 1px 4px 3px rgba(0,0,0,.2)', 'font-size': '12px', 'color': '#ccc', 'width': defaultSet.width(), 'height': defaultSet.height(), 'padding': '26px 0', 'position': 'fixed', 'top': '10vh', 'left': '50vw', 'z-index': '100' ,'resize': 'horizontal', 'overflow': 'auto'});
            $(popup).append(popupTop).append(popupClose).append(media).append(popupBottom).appendTo('.slide');  
            // console.log($('.popupDrag'));
            content.hide();
            dragElement(document.getElementById("popup"));
        });
        $(content).find('table.SquareCssResource-mediaHeader').find('td[align="right"] > div').prepend(button);
    }
    // 替換掉相似圖按鈕
    if (content.find('.SquareCssResource-similarImageLink') && content.find('.GIS-Icon').length == 0) {
        var icon = $('<img>').addClass('GIS-Icon').css('vertical-align', 'middle').attr({ 'src': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABMsSURBVHhe7V1pcFvXdXb3fd/3pukPt0nb6XRLmzZt0noynaZtOmkyrTvTpE1rRwTARQQXUaRAiQSxg6REiyveA8BNpETQ2ixZtqzdkijJ1uZYliNvWurImyxrjZfb7zze93AfeAECIAg+ivhmvgEJ4G7n3HvPOXd5uK+EEkoooYSCIbhM+bVgmfq3YZv6jZBNDYfs6ji4EzwQtKsnwAvgiyGbcjxoUw4H7coO/K/g1YXXr4Xt6qcD1fEf4dmVkAvGvzz+PcHy6B9B2NUQ5nYo4Dr+ZnMllPMBeBYKiwUd6n90OiI/x4ssIRWaEmzKAyG7EsfrOzKBFpw29UO8TqHMxoA9/jFelaUNjID7IZQQeNkQVBo+4lDZSIXCHqsaYPurB9hUdT971tnPztb0GTyB/4+Bh/DZruUDLFEZYXGk6ZTkJxIj5yMoZh9Nb66vqj/Iq7d0ELYN/DGEsIn30hkCageHKyJsL4RKgr5c18veqs+fb4IXavs0JW6tirAeKFdWLjFoU19H3RraK9Sf5NW9dxFyqJ9Co3elCoG4FpxEj6YefiVFoPPBb0FBT0Hh/Q5lRl00arZLae0q6/pRXv17B2RAudeDqcHccBLIQUxBr9f1SQVXDJ6rmR45HZKRA5t2JehQ/tvlcn03b87iBTUCvcwuM9QjGA2nMBpoOpEJaSF4GZ3iCdioLsmoQRvgTqv386YtPvhsA7+MRjyV2rBIucJOQxEygViF/webtROK6bCbFYP23MJr9aIbLQF79O9hHK+KjSEvibyfNyQCsCpfw4iZwEgW26HRpkwuCqWw+9h3YVi3pdqKR9Eo6nWyRi8GPoMRTR1KbBPa+UXebGvC5Rr/fngmI2KlyUgexaiQNXKxkVxvmm6N9tkUH2+69eCrGfgxGO8nRWUoqPxLcC1ljVuMnMIoEduH9j7Mm28teB/q/Qn0lmfEyo5jirpaf+8og4LTdtHA25SXLBnR9z7U+8PkDorKeLRyYF5d2auYOmjknYaQjqDXHkIMQxE9kZyG43jvOcQVFws0OimAXOtI2kTNhbcpv8dFYB1oNmN6CdxQBq0zyRo1F16Bp0PTxTaMOrVC0ZZVxDIzcR1s2BDSPAllfRMKzNXDew3K77Ynl3dgyG8GyiJ/xkVgHZA3hV4yJDaeAipZo/IhjYKjUAItJuaigNlICtqGelJkLitXJHmFA+WRD/S08Bw/CNqi/8RFYC2ggtV6RYnbqyLSRuXKSxgNtEqb6mLOpHIbHt0ZxDpPoGNsw3u0YaVtWmFKOQpekS3TiFThdJA7K5ter4LDFcp3xO8HyyLLePOtBdp9w9A1KksGfK4249vojbuhiM40ioBwaWOpE0r4Eu0e0gjl1UmLTsfgj4ftyl8hnRN8XFOiJG/yBk86zfZmonLgjul7NsXDs7UWaJEQQrmoV3QAjZnrouBJTB/dckVcpiAzXBb9BC9+Tph2zaP/ifrvlpSlReQX0TG2VPWbFYepOZsOsCBAT90kVpaGvEzI2ZAUuRlCEPPTaFPPo0f/DzkNvNiCg7wkzQam7Md0pE5zUN581mNOCNoiXzBVFtQi8TyU8jKUYYp6QSjh3YA9UuVyub6XFznv8C+L/r5mh4R6GPWxq6cpxuJftRboxAYE9rKs4kRaqyI7IBN+KilG6EpJj8ZvD1cO/hIvrqig6ShsU75KO4VGfWzKQVqt5l+xHjC8fXplOytVduqxDaynPmYSKtmTF2cJxs5AGeImEHcOqjPN0etssZ/hf84rKMgN2NS/CZQPfNLSK7nUU0QP5eDYKLt7McGuvTDBxoODhnCJJOynETnLlHEWU5tpR86mXkdPfIAXI4Vus/A6yt8qAcJo14XYtzLGbr6c0BRCvPNaQlNQuFwQNEgei+h90QGDtcIuHO2V0NkrXoQUnY7OH0DZSSPrUD/FP1q6CHwj/vOYVm7qQnlm2wZDGSJfPjzOelZEDYETaa/8PBRBEW+fWWHXZlOGDozMPXo6KGeMv710AWV4dYH0N8bY7VcnpAohSqcwkAIv4z2bcjdgVz7Hs58V4TLln5Np1fe9jr5f5R8tPZD/jV75pi6QY4/KR4dImsKeHh9h7eXm0aITU5WDZ29C+7LY73iWDf8U/9cAGVd0ihf19GR0+UdLDyFb9F90QXRVR9mNC+lHRyplUxh6+EaetQkYNXX0OQz8O7Qsw982gOj6T5H2EJTZQ0dO+dtLD5i/N+vC3BUZlgo+E7etHxIUorwTfKj3Z3nWJuBz4+AcRsN7IUfkr/lHJejgxtxYQHz1yEap0NPxyrMbWdjk4kb+i2c9AyFH9LMYHXS8RlfKzaAj9of84xIIJEBdQGTM78I2yASfjpOdydERtiunZlucI6Vg6rqhp4HtauAflUDQFt64cJ5Qc5uurp7eSDGDoRDM/1/i2WZE0KH8hWbAbeqZ9gr1N/nbJRAwhVzRBfqtA+NSwafjvuERQxkdFeqFRXfKz2oIl0U/YQgUAZ0Ymc/GO68mWO+K5BoXFOvk2RqgWCJYFvnLJe0x5QJ4RA/rAh1yx6WCT0dyd/W0cGE/7Cjv/wWerQbtriB5UqQsu3IJ01Pzkg72sgGE1aELNVf7cWB01FDII071BM/SAF3c1D83iOh9tkXGXEAOBAWZVmPe+zzouTt0YaVbu0rHEW/cEHS4XG3iWRqgaQqfrUeQZ9qzhkI6+VfyBj/KGkZexbmjmCPJnUf9RkJV/T/Nq5wdkPgVPROagmSCl/E27Ee7sIiY6fwSj3NqofxvQjnnyG7xj/IGRppHL9vKRHu38CrPDjoeCS0a+8xvP79JKnwZv30K7m6y4I9CVWM/xLMtCkTP0OrMetOtozz263oiirQzre6m8oU9Y0aBXc7o2zzLokEvm+jZ9TpzH7xuKQarhKWkbI+iBhyR39UTra9FhC4RfDpOJTYYBfavVM/wLIsGvWxi2963mfvYHUsxtHzYqF/2CsG8ryfqX5mbQg6NJwNCtTl+gGdpAh1kCC+L/BYxUDbwG4UMGvWyifeMQsL2yN/piaKrc4tB9g4lFRJbE9vFszSA+KZX/zxJ5VShbI2Y770zQuzqP+iJclXILiWpkKGWWIJnaUAPCFOZ7XbubBDzvIcUonxOT5SrQvYII2SwNb6XZ2kACmmCJyQss9NpcnVL3gFTCvR8ifeOQpYpf6InohMmMsGn45GJZJQeb42f5lkWDXrZREsqpCIZNKNzZnffnfa29US0bSsTfDo++1jSy1JcsUs8y6JBL5toOYVM3TbqRqTwglc7M2ihT0x465Xs4xBaptfTdTnVuzzLokGst+UUcui6UTdi1meG+XrQ+3rCN85mH6lfOzdhKhTe06xrNmQ/CuX6imVbTiH73jHJJqcT9VDIeT3h+X25bU511yVPmmwKDH2dZzkDZKtg4Adg3G6gvIsUl/CP8oZeLtFqCqGVA6N+NiW32QOJtuqJKfqWCT4dJzqSywMbvLEneZYGaKUTijiof8egTa3kX8kbogcX8D7O/MHdBWWgfQ/zDZ1l7qO3pELPRO/kBaG9ygu8ytkBDfPribf35rYfQsv1etr+ldEbPEsD4uEJgwUaIXChpfc8Ck2/e4dmpGWCT0dv/LSYx05e5ewgCi2yKrdYhFaHxQMOm9qHPsOz1eB3RD8Owb1Fn+F1P4bvg3Somn88J5CHqO1C8rLnk57EBang09HXfdhIi3b38CpnB3ogpFE4hHvthewN+3sXJth6wY6E3IO7ebYGtLt+D0d/hf9bUNBj+TDi/g2Kris0A/aocaTVFz0pFXw60hSqp6V9IF7d7IFpy7gtdebxManwU3n5+EYWaTJf4gksj37o9Y5nfS2MRkvvQ73fx/+1DLSnptqj1/R2kU2QCT4dg87kKkbYofwjzzZ7IGG/nsG27tntyPEtG7SbVXoaka2ewawu22hniaef0fsGbQPwty2BQFn0M0abEHG7j9yUCl7Gtt1vGLLAlPpRuiO1GaENe54JRezpAkSaojZ3iWd4USimOY8ruUyAUfK+x7N+xsl2EZgSHqS1LSMPyfGhhQTq06fXze/dJRV8OnrHzhmygP04x7PMDXTpHnOdcVHn+d0z4xHpFFUTZSu2bmTO/QkWrEzaEnfb4D6e9QxgNPyrSRl25U0y/vzjBQfZPCjkXb1+3g3PSwWfjv61+w05oOOpPNvcgcTGcdJEx6BJGSe2zpyi2loGmXNfgi2fmtTY3J90gUOOKGttH/48z9oEjMZD+vfQg15HuTNWQimyXajL+2SEjfrVjOQ0XZF7TGn09GDaYHlWoFc8oGdEdwjfem4i7RTlGhhly49OK8Lg4Unma0iOIG999Ab1Np69AQRKjfw7r8lWQWkE4Tu3KaAq1o1cHdpMIVyX9kWOywWfhp5tF4320yxAp2141rmD1pgoaNMz3LxuKO0UZVKEQPqMFKZ/H6NIutdOi5p0LZn/a4DWutAxXtXTQ2FFfc4hRqtxHZwOKbQdeFcq+HQ0xx/KUzzb/AEB1OsZpjJ1ikrH5l7TkGVtbYMxnv2sCJdFv2KkpfuJc+lhOUJbbxPuyHjjp6RCT8ujtzBdJfeIMMLtPOv8wZ+l+HYy0wxTVDoeTTBPa/IyKKVv9Q+GeREZYbYvStaKnCtoeRzKSN5tdG3JfblkPOldoR3vF+xJFZj7XEbGYOPYuFzwGVh9MGGyJ6QUt2eonReRFhgVyUs8RbpVxbcgkk8MKo8xz84rUqFnYmD1lmR7C3mlW1uOsKtGlNoSGpYKfTY6904wf8rjONpaYpOZvCcYVNt0T1Ua+VvzClIGhJcQ65irm0v0PHbJ1M6CP/QA04VTLKB+S3pDnok1T00wn3B/hOhtir0UbliYB8+IoBPq/uXRKbFuZJRlAp+NgZZtRh6Q3WFeROEw7e2oJ42KQqjVT89u0GWs2T/BvKuSkTzRX63edXsHF+w5uH6n+mm/M2Y+Ne/AVLXjslTgmUgrwaZ8srzSlzPabbE/R+bGQeyWjvymLqITymwJC8diOL0rY+fdKwY+yYucd9B07GmKT8CmyZ/PWDmY20Li1C0WaExuZdPomNeAFvNrt1jhxvHcDbzIppExFqgyP2CADD6EdMLbMDhvD5uhBT6PK94TrEyeH9DKroyy1WuHWVB8Nosjyryx7JbbfQPHknnZlY+oE/Mi5wcUvGGUPKcXGkADah/fJBV2tiS74vaZo3+d/vr4JV/TYJu/TP1FXoW8QXX318YehLKPhsrNj/YjUlxVs3tCq9OKRxHQLjd3FH/XwYyur2fnZc0j078PhRTnkVLweu4HjWOh5DnV7M/PnohsmNw4w7bopFETcMauYkrbgvneRleo0wWJtJ9CG2B0cBz1/JqvPqb662IXkMcMJRB9DXG2ctM4q06Jq+p2bZrhFQY8O5n78HszlNF2+EbKVKW+NV+bcFIE7ZF/FytKgqRYQ2xQvlwBxSCa15QglpGOmF6+EyxXbgUr1Fv0t+w7Mnqb4qxpdIwtPyKvB5FWIjzN5k4SXDXJ3PuEUy1Td5g/tMf0Hdrb4aIqHhC0ma6QUTROxlrWsHxI0wetGPsgOLGcuRCjjK1eN8Lqt2fvtlcfnmSt/pQptXYDa+PBoq8vaTeIMOR9XETFBXkPmBIUsTIezMOFGikiKahcid5MwmxbM6gJVixXSjLGK2OsJTjEXOoGVr8Dti7b5Z5UIl1zt3lNjjww3yOHKOgz3oM8Ti/oT7xO36pNPjWISLuFtEElbVghiZ5LDkEdnIq6nUnWYu6n8lNtQiG4amhMU7TYXoM29aIl7txPLzeo28XKkTGcq/dlVTZshgdWISiC6Ihel22sLRjIs4FSomIlKb6Ya5xiNdKoW90tLqlrHtVNKOSzXBTWAbcpbWJliWsQ0ee7zGIl1hxIsDa3+ZmSiDXetOTviYhARf8XdsX0QHvy9VdgqMsauhhIrri/dobteAUdcHH80GTIHvkDzKnPiw2guILWr2qy2GW0CmlU0HaD2A6tLTZ1v6UfRS4D/agvlKKmNoZsC23rzod7XCg6DyXYqsgonSkz1R1T1Ado05pF/WgputmLoW1sh+qkxq7uGclqX75YpE7SFIUinFLX9hVLGu98oD1Dxa40Ioo17nDoDFZEWWtoCO4kPLJ5iB2yIcUvLZ0jM1aetfpRnW3qqmI/u6UooMuOmH97QPNPCnH662JsddeIppzqDGtMcyW5r/VbN8KFHWE+RPOyutDeD0b2cNYXNBcz6AQGel4QjabD1VKB0N6E2z3EXP2jmpdTu2d6aTxnQvg1SNuQGGfNfaPM7RmcYRvMVG5TpwmV9f82r+7SAe1jQwB2GMun5cIxk5Tka4yztrYhtqZ9WBtNzT2jbHXvqPa65pER1rJ2GJ7RkLbYqe3fm38IID3hFWJENBXz7JelQT0SI6YZvfMkTRdSoRWapASb2oJX6yx7WBF0hpf2FCCsdaQgUGpzciOmIrt6DKOxnc4LF2IXcsmCzhnTVTvYnc9PT3GqF4Ltxt9xvCagMLrwST8DO47vDICdFC/g/6/Ts+Sz/e3DEkoooYQSSiihhBLuXdx33/8D1GkW2bDWkokAAAAASUVORK5CYII=', 'width': '20px', 'height': '20px', 'title': 'google iamge search' });
        content.find('.SquareCssResource-similarImageLink').find('.GlobalCssResource-external').text('').append(icon);
    }
    // 替換掉海報按鈕
    if (content.find('.SquareCssResource-posterCreator') && content.find('img.GlobalCssResource-img16')) {
        content.find('.SquareCssResource-posterCreator').css({'padding-left':'3px','padding-right':'3px'});
        content.find('.SquareCssResource-posterCreator').find('img').removeClass('GlobalCssResource-img16').attr({ 'src': 'data:image/png;base64,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', 'width': '20px', 'height': '20px' });
    }
}
    
function Rotate(element) {
    var matrix = element.css("-webkit-transform") || element.css("-moz-transform") || element.css("-ms-transform") || element.css("-o-transform") || element.css("transform");
    if (matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle +=360 : angle;
}
/* Rotate的參考資料
 * https://gist.github.com/hoandang/5989980 */
    
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // 有圖片的話，替圖片也加入dragMouseDown
    if (document.getElementById(element.id + "Img")) {
        document.getElementById(element.id + "Img").onmousedown = dragMouseDown;
    }
    document.getElementById(element.id + "Drag").onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // 取得滑鼠座標
        pos3 = e.clientX;
        pos4 = e.clientY;
        // 滑鼠放開
        document.onmouseup = closeDragElement;
        // 滑鼠移動
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // 設定滑鼠移動後的座標
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // 新的座標寫入物件
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // 清空滑鼠事件
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
/* dragElement的參考資料
 * https://www.w3schools.com/howto/howto_js_draggable.asp */

$('body').keydown(function (event) {
    if (event.which == 27) {
        $('#popup').fadeOut(300, function () { $('#popup').remove(); });
    }
});

// 下載對話紀錄
(function(console){
    console.save = function(data, filename){
        if (!data) {
            console.error('沒有保存任何對話紀錄')
            return;
        }
        if (!filename) filename = 'autosave.log'
        if (typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }
        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a');
        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)
/* console.save的參考資料
* https://bgrins.github.io/devtools-snippets/#console-save */
});