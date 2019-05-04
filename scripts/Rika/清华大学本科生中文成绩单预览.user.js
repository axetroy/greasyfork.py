// ==UserScript==
// @name         清华大学本科生中文成绩单预览
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  →http://jxgl.cic.tsinghua.edu.cn/jxpg/f/zzzc/v_zzfw_zzdy_dd/bks_dzcjd
// @author       Rika
// @match        http://jxgl.cic.tsinghua.edu.cn/jxpg/f/zzzc/v_zzfw_zzdy_dd/bks_dzcjd
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';
if (location.pathname === '/jxpg/f/zzzc/v_zzfw_zzdy_dd/bks_dzcjd') {
            $('<div class="panel" >\n' +
                '\t\t\t\t\t<div class="panel-header">\n' +
                '\t\t\t\t\t\t<div class="panel-title">本科生中文成绩单预览</div>\t\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="panel-body preview" id="pdf-preview">\n' +
                '\t\t\t\t\t\t\t\n' +
                '\t\t\t\t</div>\t\t\t\t\t\t\t\t\n' +
                '\t\t\t</div>').insertAfter('#disabled_button')
            $.post('/jxpg/f/zzzc/v_zzfw_zzdy_dd/bks_dzcjd_lx', {cjdlx: "yxw_zw"}, function (result) {
                $("#pdf-preview").html(result); // Or whatever you need to insert the result
            }, 'html');
        }
    // Your code here...
})();