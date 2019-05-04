// ==UserScript==
// @name               Redefined Browser Actions
// @name:zh-CN         重定义浏览器行为
// @namespace          https://github.com/cologler/
// @version            0.1.0.4
// @description        provide some features for browser. you can enable/disable they from menu command.
// @description:zh-CN  给浏览器添加一些功能。可以在菜单命令中开关。
// @author             cologler (skyoflw@gmail.com)
// @include            *
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_registerMenuCommand
// @noframes
// @license            MIT
// @require            https://greasyfork.org/scripts/31694/code/OnDom.js
// @require            https://cdn.jsdelivr.net/quicksettings/latest/quicksettings.min.js

// ==/UserScript==

// this script was hosting on: https://gist.github.com/Cologler/4cf6a7945fd824979f89e426bc4ae3f9
// this script was hosting on: https://greasyfork.org/scripts/28695

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();

(function() {
    'use strict';

    class Switcher {
        constructor(key, def, display) {
            Object.defineProperties(this, {
                value: {
                    get: () => GM_getValue(key, def),
                    set: val => {
                        GM_setValue(key, val);
                    }
                },
                title: {
                    get: () => title
                }
            });

            this.addToSetting = settings => {
                settings.addHTML(display.title, display.html);
                settings.addBoolean('enable', this.value, e => {
                    this.value = e;
                });
            };
        }
    }

    const removeUnhelpfulLinks = new Switcher('remove-unhelpful-links', false, {
        title: 'feature 1',
        html: `
            <b>remove unhelpful links</b>
            <p>if link url as same as page url, will remove it.</p>`
    });

    if (removeUnhelpfulLinks.value) {
        // remove some links.
        onDom('a', a => {
            if (a.hasAttribute('href')) {
                const href = a.getAttribute('href');
                if (a.href === location.href) {
                    a.setAttribute('raw-href', href);
                    a.removeAttribute('href');
                }
            }
        });
    }

    let settingPanel = null;
    GM_registerMenuCommand('Redefined Browser Actions', () => {
        if (settingPanel) {
            settingPanel.destroy();
            settingPanel = null;
        } else {
            settingPanel = QuickSettings.create(50, 50, 'Redefined Browser Settings', null);
            settingPanel._panel.style.position = 'fixed';
            removeUnhelpfulLinks.addToSetting(settingPanel);
        }
    });
})();