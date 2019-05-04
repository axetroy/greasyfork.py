// ==UserScript==
// @name               zhihu: auto collapse answers
// @name:zh-CN         知乎: 自动收起回答
// @namespace          https://github.com/Cologler/
// @version            0.2
// @description        auto collapse answer when you browse all answers
// @description:zh-CN  在查看全部回答时自动收起回答
// @author             Cologler (skyoflw@gmail.com)
// @match              http*://www.zhihu.com/question/*
// @grant              none
// @noframes
// @license            MIT
// @require            https://greasyfork.org/scripts/369577/code/event-emitter.js
// @require            https://greasyfork.org/scripts/369578/code/dom.js
// ==/UserScript==

// hosting on:

// let type script auto-completion work.
(function() { function require(){}; require("greasemonkey"); })();

if (typeof Components === 'undefined') {
    var Components = {};
}

(function() {
    'use strict';

    const ScriptName = 'zhihu: auto collapse answers';
    const ComponentName = 'AutoCollapseAnswers';

    Components[ComponentName] = (function() {
        function main() {
            Dom.on('.Card .List .List-item', e => {
                for (const btn of e.querySelectorAll('button')) {
                    if (btn.textContent.includes('收起')) {
                        btn.click();
                    }
                }
            });
        }

        return {
            name: ComponentName,
            main,
            desc: ''
        };
    })();

    if (GM_info.script.name === ScriptName) {
        Components[ComponentName].main();
    }
})();
