// ==UserScript==
// @name         LeetCode_CN/力扣 一键打开英文讨论区
// @namespace    Aloxaf_i
// @version      0.1.0
// @description  为 LeetCode_CN 添加一键打开英文讨论区的按钮——中文讨论内容太水了
// @author       Aloxaf
// @match        https://leetcode-cn.com/problems/*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant        GM_openInTab
// @run-at       document-end
// ==/UserScript==

/* jshint esversion: 6 */
(function() {
    'use strict';
    // https://stackoverflow.com/questions/22125865/wait-until-flag-true
    function waitFor(condition, callback) {
        if(!condition()) {
            console.log('waiting');
            window.setTimeout(waitFor.bind(null, condition, callback), 100); /* this checks the flag every 100 milliseconds*/
        } else {
            console.log('done');
            callback();
        }
    }

    function add_button() {
        const problem_name = location.href.match(/problems\/([^\/]+)/)[1];
        const button = `<button id="jump2eng" class="btn__r7r7 button__1hMm">
<svg viewBox="0 0 24 24" width="1em" height="1em" class="icon__3Su4">
<path fill-rule="evenodd" d="M8.995 22a.955.955 0 0 1-.704-.282.955.955 0 0 1-.282-.704V18.01H3.972c-.564 0-1.033-.195-1.409-.586A1.99 1.99 0 0 1 2 15.99V3.97c0-.563.188-1.032.563-1.408C2.94 2.188 3.408 2 3.972 2h16.056c.564 0 1.033.188 1.409.563.375.376.563.845.563 1.409V15.99a1.99 1.99 0 0 1-.563 1.432c-.376.39-.845.586-1.409.586h-6.103l-3.709 3.71c-.22.187-.454.281-.704.281h-.517zm.986-6.01v3.1l3.099-3.1h6.948V3.973H3.972V15.99h6.01zm-3.99-9.013h12.018v2.018H5.991V6.977zm0 4.037h9.014v1.972H5.99v-1.972z"></path>
</svg>
<span>英文版讨论区</span>
</button>`;
        $('.tools__wTOC').append($(button));
        $('#jump2eng').click(() => GM_openInTab(`https://leetcode.com/problems/${problem_name}/discuss/`));
    }

    waitFor(() => $('.tools__wTOC').length > 0, add_button);
})();