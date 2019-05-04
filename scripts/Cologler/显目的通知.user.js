// ==UserScript==
// @name               clear-notifications
// @name:zh-CN         显目的通知
// @namespace          https://github.com/cologler/
// @version            0.2.2
// @description        show clear notifications on some websites.
// @description:zh-CN  在某些网站上显示显目的通知
// @author             cologler (skyoflw@gmail.com)
// @match              http*://tieba.baidu.com/*
// @match              http*://zhidao.baidu.com/*
// @exclude            http*://zhidao.baidu.com/ihome/notice/center*
// @grant              GM_addStyle
// @grant              GM_getResourceText
// @noframes
// @license            MIT
// @require            https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js
// @require            https://cdn.jsdelivr.net/toastr/2.1.3/toastr.min.js
// @require            https://greasyfork.org/scripts/369577/code/event-emitter.js
// @require            https://greasyfork.org/scripts/369578/code/dom.js
// @resource           toastr    https://cdn.jsdelivr.net/toastr/2.1.3/toastr.min.css
// ==/UserScript==

// hosting on: https://gist.github.com/Cologler/152179a951350bec2beedcf24ab9bbba
// hosting on: https://greasyfork.org/scripts/369793

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();

(function() {
    'use strict';

    const APP_NAME = 'clear-notifications';

    const HOSTNAME_SITED = {};

    HOSTNAME_SITED['tieba.baidu.com'] = function() {
        Dom.once('.u_news_wrap.j_news', z => {
            Dom.on('span', (el, info) => {
                const textContent = el.textContent;
                const number = textContent.slice(1, -1);
                if (number && number !== '0') {
                    info.off();
                    toastr.info(`you got ${number} unread messages.`);
                }
            }, { element: z, includeTextNode: true });
        });
    };

    HOSTNAME_SITED['zhidao.baidu.com'] = function() {
        Dom.on('.userbar-msg-a .orange-num i', (el, info) => {
            const number = el.textContent;
            if (number && number !== '0') {
                info.off();
                toastr.info(`you got ${number} unread messages.`);
            }
        });
    };

    if (HOSTNAME_SITED[location.hostname]) {
        GM_addStyle(GM_getResourceText("toastr"));
        toastr.options = {
            // positionClass: "toast-top-left",
            onclick: () => toastr.clear(),
        };
        HOSTNAME_SITED[location.hostname]();
    } else {
        console.log(`<${APP_NAME}> does not match any site.`);
    }
})();
