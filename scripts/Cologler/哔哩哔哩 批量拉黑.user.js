// ==UserScript==
// @name               bilibili batch blocker
// @name:zh-CN         哔哩哔哩 批量拉黑
// @namespace          https://github.com/cologler/
// @version            0.2.2
// @description        kill other users.
// @description:zh-CN  批量拉黑各种坑货
// @author             cologler
// @match              https://www.bilibili.com/blackboard/html5player.html?*
// @grant              unsafeWindow
// @grant              GM_listValues
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_deleteValue
// @grant              GM_info
// @require            https://greasyfork.org/scripts/31694-ondom/code/OnDom.js
// @require            https://greasyfork.org/scripts/32751/code/GreasemonkeyStorage.js
// @require            https://greasyfork.org/scripts/32795/code/ObjectStorage.js
// ==/UserScript==

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();

(function () {
    'use strict';

    let observer = null;
    let id2DataMap = {}; // cache comments data by id
    let timeoutSet = new Set(); // avoid elements detect loop
    setInterval(() => {
        timeoutSet.clear();
    }, 5000);
    function cleanCache() {
        id2DataMap = {};
        timeoutSet.clear();
    }

    function parseTime(text) {
        const dateMatch = text.match(/^(\d+):(\d+)$/);
        if (!dateMatch) {
            throw `Cannot parse ${dateText} to time.`;
        }
        const min = Number(dateMatch[1]);
        const sec = Number(dateMatch[2]);
        if (sec < 0 || sec >= 60) {
            throw 'second must >= 0 and < 60';
        }
        const ret = min * 60 + sec;
        console.assert(isFinite(ret));
        return ret;
    }

    class BlockRule {
        constructor(source, dateText) {
            let min = null;
            let max = null;
            if (dateText) {
                const prs = dateText.split('~', 2);
                if (prs.length == 1) {
                    max = parseTime(prs[0]);
                } else {
                    min = parseTime(prs[0]);
                    max = parseTime(prs[1]);
                }
            }

            let testTextCache = {};
            function testText(text) {
                if (typeof source === 'string') {
                    return text.indexOf(source) >= 0;
                } else {
                    return source.test(text);
                }
            }
            this.testTextCache = testTextCache;

            this.test = data => {
                let text = data.text;
                let textTestResult = testTextCache[text];
                if (textTestResult === undefined) {
                    textTestResult = testText(text);
                    testTextCache[text] = textTestResult;
                }
                if (!textTestResult) {
                    return false;
                }

                if (max !== null && data.time > max) {
                    return false;
                }

                if (min !== null && data.time < min) {
                    return false;
                }

                return true;
            };
        }
    }

    function inject() {
        let window = unsafeWindow;

        let disposable = onDom('.bilibili-player-danmaku-list', danmakuList => {
            if (danmakuList.querySelector('.danmaku-info-row') === null) {
                return;
            }
            disposable.dispose();
            console.log(`Bilibili-batch-blocker v${GM_info.script.version} inited.`);

            document.querySelectorAll('.bilibili-player-danmaku-date-picker-day-content .day-span')
                .forEach(z => z.addEventListener('mouseenter', cleanCache, true));

            let rules = [];
            const tempStorage = new ObjectStorage(sessionStorage);
            function addRule(rule, time) {
                rules.push(new BlockRule(rule, time));
            }
            function addRuleToStorage(rule, time, storage, key) {
                if (!rule) return;
                addRule(rule, time);
                let ls = storage.getItem(key) || [];
                ls.push({
                    type: typeof rule === 'string' ? 0 : 1,
                    value: typeof rule === 'string' ? rule : rule.source,
                    time: time || undefined
                });
                storage.setItem(key, ls);
            }

            function getUrlParametersMap() {
                const url = new URL(location.href);
                const map = Array.from(url.searchParams.entries()).reduce((sum, z) => { sum[z[0]] = z[1]; return sum; }, {});
                return map;
            }

            class BlockRuleManager {
                constructor (storage, prefix) {
                    this.addForTemp = (r, t) => {
                        if (!r) return;
                        addRule(r, t);
                    };

                    this.addForEpisode = (r, t) => {
                        if (!r) return;
                        const map = getUrlParametersMap();
                        if (!map.episodeId) throw 'this is not a episode.';
                        addRuleToStorage(r, t, storage, prefix + 'episode-' + map.episodeId);
                    };

                    this.addForSeason = (r, t) => {
                        if (!r) return;
                        const map = getUrlParametersMap();
                        if (!map.seasonId) throw 'this is not a season.';
                        addRuleToStorage(r, t, storage, prefix + 'season-' + map.seasonId);
                    };

                    this.addForAll = (r, t) => {
                        if (!r) return;
                        addRuleToStorage(r, t, storage, prefix + 'rules');
                    }

                    function loadByKey(key) {
                        (storage.getItem(key) || []).forEach(z => {
                            addRule(z.type === 0 ? z.value : new RegExp(z.value), z.time);
                        });
                    }

                    (() => {
                        const map = getUrlParametersMap();
                        if (map.episodeId) loadByKey(prefix + 'episode-' + map.episodeId);
                        if (map.seasonId) loadByKey(prefix + 'season-' + map.seasonId);
                        loadByKey(prefix + 'rules');
                    })();
                }
            }

            unsafeWindow.top.addRule = function (r, t) {
                if (!r) return;
                addRule(r, t);
            };
            unsafeWindow.top.blockRuleManagerForSession = new BlockRuleManager(tempStorage, 'batch-blocker-');
            unsafeWindow.top.blockRuleManagerForPermanent = new BlockRuleManager(GMStorage, '');

            id2DataMap = {};
            function onDanmakuRow(row) {
                let id = $(row).attr('dmno');
                if (timeoutSet.has(id)) {
                    return;
                }
                timeoutSet.add(id);

                let data = id2DataMap[id];
                if (data === undefined) {
                    let danmakuText = row.querySelector('.danmaku-info-danmaku').innerText;

                    let timeText = row.querySelector('.danmaku-info-time').innerText;

                    data = {
                        id: id,
                        text: danmakuText,
                        time: parseTime(timeText),
                        timeText: timeText,
                        isBlocked: undefined
                    };
                    id2DataMap[id] = data;
                }

                if (!data.isBlocked) {
                    data.isBlocked = row.querySelector('.danmaku-info-block') !== null;
                }

                if (data.isBlocked) {
                    return;
                }

                if (rules.some(z => z.test(data))) {
                    console.log(`block <${data.text}> at <${data.timeText}>.`);
                    row.querySelector('.danmaku-info-block-btn').click();
                }
            }

            let attrNames = new Set();
            if (observer !== null) {
                observer.disconnect();
                observer = null;
            }
            observer = new MutationObserver(mrs => {
                mrs.forEach(mr => {
                    if (mr.type === 'characterData') {
                        let row = mr.target.parentElement.parentElement;
                        if (row.classList.contains('danmaku-info-row')) {
                            onDanmakuRow(row);
                        }
                    } else if (mr.type === 'childList') {
                        if (mr.addedNodes.length > 0) {
                            mr.addedNodes.forEach(z => {
                                if (z.classList.contains('danmaku-info-row')) {
                                    onDanmakuRow(z);
                                }
                            });
                        }
                    } else {
                        console.log(mr);
                    }
                });
            });

            observer.observe(danmakuList, {
                childList: true,
                subtree: true,
                characterData: true
            });

        });
    }

    inject();
})();