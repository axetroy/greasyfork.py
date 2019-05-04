// ==UserScript==
// @author andy37380
// @name 99kubo_Xfplay
// @namespace https://greasyfork.org/en/users/122708-%E8%84%AB%E6%8B%96%E9%9E%8B
// @version 1.2
// @description 自動開啟58b.tv及旋風tv先鋒連結，並關閉分頁
// @include https://www.58b.tv/vod-play-id-*-sid-*-pid-*.html
// @include https://www.58b.tv/Public/player2.8/xfplay.php?url=*
// @include http://www.ixftv.com/vod-play-id-*-sid-*-pid-*.html
// @run-at document-end
// @grant unsafeWindow
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

var $ = window.jQuery;

function waitFor(conditionFunction) {

    const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 500);
    }

    return new Promise(poll);
}

(function () {
    if (location.href.startsWith("https://www.58b.tv/vod-play-id-")) {
        waitFor(_ => $('iframe[src*="https://www.58b.tv/Public/player2.8/xfplay.php"]').contents().find('iframe').contents().find('a[href*="xfplay"]').length > 0)
            .then(function () {
                var a = document.createElement("a");
                if (a.click) {
                    var href = $('iframe[src*="https://www.58b.tv/Public/player2.8/xfplay.php"]').contents().find('iframe').contents().find('a[href*="xfplay"]').attr('href');
                    console.log(href);
                    a.setAttribute("href", href);
                    a.style.display = "none";
                    document.body.appendChild(a);
                  	a.click();
                    if (!unsafeWindow.chrome) {
                        window.close();
                    }                    
                }
            });
    } else if (location.href.startsWith("http://www.ixftv.com/vod-play-id-")) {
        if (unsafeWindow.chrome) {
            return;
        }
        var index = parseInt(location.pathname.substring(location.pathname.lastIndexOf("-") + 1,
            location.pathname.lastIndexOf("."))) - 1;
        if (index < 0) {
            index = 0;
        }
        if (index >= 0) {
            var playerIndex = unsafeWindow.player_name.split('$$$').indexOf('xfplay');
            var newurl =
                decodeURIComponent(unsafeWindow.url_list).split('$$$')[playerIndex].split('+++')[index].split('++')[1];
            location.replace(newurl);
            window.close();
        } else {
            window.close();
        }
    }
})();