// ==UserScript==
// @name               bilibili why blocked
// @name:zh-CN         哔哩哔哩 为什么拉黑
// @namespace          https://github.com/cologler/
// @version            0.2.2.1
// @description        recode why I block this guy.
// @description:zh-CN  记录为什么屏蔽了此人
// @author             cologler
// @match              https://account.bilibili.com/site/blacklist.html
// @match              https://bangumi.bilibili.com/anime/*/play*
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_addValueChangeListener
// @grant              GM_removeValueChangeListener
// @grant              GM_addStyle
// @grant              GM_getResourceText
// @require            https://greasyfork.org/scripts/31539-singletondata/code/SingletonData.js
// @require            https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js
// @require            https://cdn.jsdelivr.net/toastr/2.1.3/toastr.min.js
// @resource           toastr    https://cdn.jsdelivr.net/toastr/2.1.3/toastr.min.css
// @noframes
// ==/UserScript==

// this script was hosting on: https://greasyfork.org/scripts/31615

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();
(function() { function require(){}; require("toastr"); })();


(function() {
    'use strict';

    GM_addStyle(GM_getResourceText("toastr"));

    class BlockController {
        constructor() {
            this._singletonData = new SingletonData('blocked-reasons', {});
        }

        blockUser(userId, url, type, content) {
            if (Bilibili.badlistUser === undefined) {
                throw 'API error';
            }
            Bilibili.badlistUser('', userId, () => {});
            this.addReason(userId, url, type, content);
        }

        addReason(userId, url, type, content, autoSave = true) {
            let data = {
                key: userId,
                url: url,
                type: type,
                content: content
            };
            this._singletonData.data[userId] = data;
            if (autoSave) {
                this._singletonData.save();
            }
        }

        getReason(userId) {
            return this._singletonData.data[userId] || null;
        }

        removeReason(userId) {
            delete this._singletonData.data[userId];
            this._singletonData.save();
        }

        export() {
            let data = JSON.stringify(this._singletonData.data);
            let blob = new Blob([data], {type: 'text/json'});
            let url = window.URL.createObjectURL(blob);
            var elem = window.document.createElement('a');
            elem.href = url;
            elem.download = 'data.json';
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        }

        canImport() {
            return (Bilibili && typeof Bilibili.badlistUser === 'function');
        }

        _ServerSiteBlockAsync(id) {
            return new Promise((resolve, reject) => {
                Bilibili.badlistUser('', id, e => {
                    console.log(e);
                    resolve(e.code === 0);
                });
            });
        }

        async import(content) {
            let data = null;
            try {
                data = JSON.parse(content);
            } catch (_) {
                toastr.info('This is not a vaild json file.');
            }

            let hasError = false;
            if (data) {
                let added  = 0;
                let exists = 0;
                let errors = 0;
                let values = Object.values(data);
                for (let i = 0; i < values.length; i++) {
                    let z = values[i];
                    if ('string' === typeof z.key &&
                        'string' === typeof z.url &&
                        'string' === typeof z.type &&
                        'string' === typeof z.content) {
                        if (this.getReason(z.key) === null) {
                            if (await this._ServerSiteBlockAsync(z.key)) {
                                this.addReason(z.key, z.url, z.type, z.content);
                                added++;
                            } else {
                                errors++;
                            }
                        } else {
                            exists++;
                        }
                    }
                }

                if (added + errors + exists > 0) {
                    toastr.info([
                        `Total imported ${added + errors + exists} items,`,
                        `added ${added}, exists ${exists}, error ${errors}.`
                    ].join('<br>'));
                    return;
                }
            }

            toastr.info(`No items has be imported.`);
        }
    }
    let blockReason = new BlockController();

    function xmlEscape (s) {
        return $('<div/>').text(s).html();
    }

    function onVideoPage() {
        let lastUser = null;

        function onSubmitButton(e) {
            e.addEventListener('click', z => {
                if (lastUser !== null) {
                    let url = window.location.href;
                    toastr.info([
                        xmlEscape(`Blocked ${lastUser.userName}`),
                        xmlEscape(`Id: ${lastUser.userId}`),
                        xmlEscape('Reason:'),
                        xmlEscape(lastUser.content)
                    ].join('<br>'));
                    blockReason.addReason(lastUser.userId, url, lastUser.type, lastUser.content);
                }
            }, true);
        }

        function onElement(e) {
            function parseUserInfo() {
                let parents = $(e).parentsUntil('.list-item');
                let root = null;
                let text = null;
                let type = null;
                if (parents.length === 5) { // comment
                    type = 'comment';
                    root = parents[4];
                    let floor = parents[parents.length - 1].querySelector('.floor').innerText;
                    text = floor + ': ' + root.querySelector('.text').innerText;
                } else if (parents.length === 8) {
                    type = 'comment-in-comment';
                    root = parents[4];
                    text = root.querySelector('.text-con').innerText;
                }

                if (root === null) {
                    console.log(parents);
                    return null;
                }

                if (text.length > 200) {
                    text = text.substr(0, 160) + '...';
                }

                let a = root.querySelector('.user a');
                let userId = a.dataset.usercardMid;
                let userName = a.innerText;
                return {
                    userId: a.dataset.usercardMid,
                    userName: a.innerText,
                    content: text,
                    type: type
                };
            }

            let userInfo = parseUserInfo();
            e.addEventListener('click', () => {
                lastUser = userInfo; // if null, should clear.
                if (lastUser === null) {
                    toastr.info('Cannot detect user info.<br>Please report to the developer.');
                }
            }, true);
        }

        function resolveElements(e) {
            if (!e.classList) {
                return;
            }

            if (e.classList.contains('comment-bilibili-blacklist')) {
                const con = e.querySelector('.comment-bilibili-con');
                let btn = con.querySelector('.btn-submit');
                onSubmitButton(btn);
                return;
            }

            if (e.classList.contains('blacklist')) {
                onElement(e);
                return;
            }

            let items = e.querySelectorAll('.blacklist');
            if (items.length > 0) {
                items.forEach(z => {
                    onElement(z);
                });
                return;
            }
        }

        let observer = new MutationObserver(mrs => {
            mrs.forEach(mr => {
                mr.addedNodes.forEach(z => {
                    resolveElements(z);
                });
            });
        });
        observer.observe(document, {
            childList: true,
            subtree: true
        });
        resolveElements(document);
    }

    function onManagePage() {

        function getStyleRuleValue(selector, sheet = null) {
            let sheets = sheet !== null ? [sheet] : document.styleSheets;
            for (let i = 0, l = sheets.length; i < l; i++) {
                let sheet = sheets[i];
                if ( !sheet.cssRules ) { continue; }
                for (let j = 0, k = sheet.cssRules.length; j < k; j++) {
                    let rule = sheet.cssRules[j];
                    if (rule.selectorText && rule.selectorText.split(',').indexOf(selector) !== -1) {
                        return rule.style;
                    }
                }
            }
            return null;
        }

        GM_addStyle(
`
.why-blocked-button{
    position: relative;
    float: right;
    width: 80px;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    border-radius: 4px;
    border: solid 1px #ddd;
    margin: 8px 8px 8px 0;
    cursor: pointer;
}
.why-blocked-button:hover{
    border: solid 1px #00a1d6;
    color: #00a1d6;
}
`
        );
        function addOperationButton() {
            let root = document.querySelector('.sr-t');
            function createButton(text) {
                let btn = document.createElement('div');
                btn.classList.add('why-blocked-button');
                btn.innerHTML = text;
                return btn;
            }
            let importBtn = createButton('import');
            $(root).append(importBtn);
            let exportBtn = createButton('export');
            $(root).append(exportBtn);
            let input = document.createElement('input');
            input.type = 'file';
            input.style.display = 'none';
            $(root).append(input);

            importBtn.addEventListener('click', e => {
                e.stopPropagation();
                if (blockReason.canImport()) {
                    input.click();
                } else {
                    toastr.info('Cannot import because of API is invalid.')
                }
            });
            exportBtn.addEventListener('click', e => {
                e.stopPropagation();
                blockReason.export();
            });
            input.addEventListener('change', e => {
                let file = e.target.files[0];
                if (!file) {
                    return;
                }
                let reader = new FileReader();
                reader.onload = x => {
                    var contents = x.target.result;
                    blockReason.import(contents);
                };
                reader.readAsText(file);
            }, false);
        }
        addOperationButton();

        function showReason(z) {
            let btn = z.querySelector('.del-button');
            let id = $(btn).attr('fid');
            let data = blockReason.getReason(id);
            btn.addEventListener('click', () => {
                blockReason.removeReason(id);
            });
            if (data !== null) {
                let root = z.querySelector('.bl-info');
                let div = document.createElement('div');
                div.style.width = '600px';
                div.style.padding = '4px 0';
                div.style.lineHeight = '150%';

                $(div).append('Blocked on ');

                let url = document.createElement('a');
                url.href = data.url;
                url.innerHTML = 'this page';
                $(div).append(url);

                $(div).append(' because it say:');
                $(div).append('<br>');
                let p = document.createElement('p');
                p.style.textOverflow = 'ellipsis';
                p.style.whiteSpace = 'nowrap';
                p.style.overflow = 'hidden';
                p.innerHTML = data.content;
                $(div).append(p);

                $(root).append(div);
            }
        }

        function resolveElements(e) {
            if (!e.classList) {
                return;
            }

            if (e.classList.contains('list-block')) {
                showReason(e);
                return;
            }

            let items = e.querySelectorAll('.list-block');
            if (items.length > 0) {
                e.querySelectorAll('.list-block').forEach(z => {
                    showReason(z);
                });
            }
        }

        let observer = new MutationObserver(mrs => {
            mrs.forEach(mr => {
                mr.addedNodes.forEach(z => {
                    resolveElements(z);
                });
            });
        });
        observer.observe(document, {
            childList: true,
            subtree: true
        });
        resolveElements(document);
    }

    if (window.location.href === 'https://account.bilibili.com/site/blacklist.html') {
        onManagePage();
    } else {
        onVideoPage();
    }
})();