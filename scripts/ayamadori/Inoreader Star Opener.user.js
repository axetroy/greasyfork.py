// ==UserScript==
// @name        Inoreader Star Opener
// @namespace   my
// @description Starred item open in a lump for Inoreader
// @include     http://inoreader.com/*
// @include     https://inoreader.com/*
// @include     http://www.inoreader.com/*
// @include     https://www.inoreader.com/*
// @include     http://jp.inoreader.com/*
// @include     https://jp.inoreader.com/*
// @include     http://us.inoreader.com/*
// @include     https://us.inoreader.com/*
// @exclude     *inoreader.com/stream*
// @exclude     *inoreader.com/m/*
// @grant       GM_openInTab
// @version     1.0
// @author      ayamadori
// ==/UserScript==

// @original    https://pastebin.com/LUs1Z7kW

(function()
 {
    var MAX_WINDOW_OPEN = 10;

    var onKeyDown = function(event)
    {
        // push "w" key
        if(event.keyCode == 87 && !event.shiftKey)
        {
            var entries = document.evaluate('//div[@id="reader_pane"]//div[contains(@data-fav,"1")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for(var i = 0, m = MAX_WINDOW_OPEN; i < entries.snapshotLength && m > 0; i++)
            {
                var entry = entries.snapshotItem(i);
                m--;

                var stars = document.evaluate('.//div[@class="article_favicon"]//a', entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (stars.snapshotLength  == 0)
                {
                    continue;
                }

                var links = document.evaluate('.//div[@class="article_title_wrapper"]//a', entry, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (links.snapshotLength  == 0)
                {
                    continue;
                }
                var linkURL = String(links.snapshotItem(0).getAttribute("href"));
                GM_openInTab(linkURL,true,false);

                var star = stars.snapshotItem(0);
                var event = document.createEvent('MouseEvents');
                event.initEvent('click', true, true);
                star.dispatchEvent(event);
            }
            var refresh = document.evaluate('//div[@id="sb_rp_refresh"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            refresh.dispatchEvent(event);
        }
    };
    document.addEventListener('keydown', onKeyDown, false);
})();