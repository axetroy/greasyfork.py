// ==UserScript==
// @name         TAPD迭代列表仅显示自己
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  TAPD hidden others
// @author       ficapy
// @match        https://www.tapd.cn/*/prong/iterations/view/*
// @run-at       document-end
// @grant        none
// ==/UserScript==


function detect_change() {
    if (! $('#hidden_other').length) {
        insert_filter()
    }
}

function switch_hidden_other() {
    let all_tr = $('#stories_tasks_content tr')
    var td_val
    all_tr.each(function () {
        td_val = $('#' + this.id + 'owner').attr('data-editable-value')
        if (typeof td_val === "undefined") {
            return
        } else {
            if (td_val.indexOf(user_nick) === -1) {
                $('#hidden_other').attr("checked") ? $(this).hide() : $(this).show()
            }
        }
    })
}

function insert_filter() {
    $('#show_task_b').parent().append('<label class="checkbox"><input type="checkbox" id="hidden_other" checked>隐藏其他人</label>')
    switch_hidden_other()
    $("#hidden_other").click(switch_hidden_other);
}

(function () {
    'use strict';
    var t = setTimeout(function () {
        insert_filter()
    }, 1000)
    var x = setInterval(function () {
        detect_change()
    }, 500)
})()