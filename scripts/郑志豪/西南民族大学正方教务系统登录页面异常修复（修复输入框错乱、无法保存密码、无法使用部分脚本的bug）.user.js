// ==UserScript==
// @name         西南民族大学正方教务系统登录页面异常修复（修复输入框错乱、无法保存密码、无法使用部分脚本的bug）
// @namespace    smu-swun-jwxt-zf-fix
// @version      0.1.1801224
// @description  修复西南民族大学正方教务系统登录页面的bug：输入框错乱、无法保存密码、无法使用部分脚本。本脚本主要代码移至自@Gao Liang 的同类脚本，仅对适用页面做出调整。理论上经过修改也可用于其他学校的正方教务系统。
// @oldauthor       Gao Liang
// @author         zzhjim
// @match        http*://jwxt.njupt.edu.cn
// @match        http*://jwxt.njupt.edu.cn/default2.aspx
// @match        http*://jwxt.njupt.edu.cn/Default2.aspx
// @match        http*://202.119.225.34
// @match        http*://202.119.225.34/default2.aspx
// @match        http*://202.119.225.34/Default2.aspx
// @match        http*://211.83.241.245/default*.aspx
// @match        http*://211.83.241.245/Default*.aspx
// @match        http*://211.83.241.245
// @match        http*://jwxt.swun.edu.cn
// @match        http*://jwxt.swun.edu.cn/default2.aspx
// @match        http*://jwxt.swun.edu.cn/Default2.aspx
// @include      *://211.83.241.245/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 去除没用的input
    var bad_input = document.getElementById("Textbox1");
    var _parentElement = bad_input.parentNode;
    if(_parentElement){
        _parentElement.removeChild(bad_input);
    }
    // 修改正确input的显示方式
    document.getElementById("TextBox2").style.display="inline";
})();