// ==UserScript==
// @name         Enable-成都理工选课按钮可见
// @namespace    cdut-edu
// @version      0.1
// @description  成都理工的选课按钮在小屏幕下可能不可见，需要大屏幕，本脚本让选课按钮可以看到，但是需要鼠标选中文字往左边拉
// @author       You
// @include      /http:\/\/202.115.133.71\/G_Client\/Framework\/Default.aspx/
// @grant        none
// ==/UserScript==

var checkT = setInterval(function(){
    if(window.frames['fnode21']!=null && window.frames['fnode21'].document.querySelector("#ContentPanel1_wrapper>.x-panel")!=null){
        clearInterval(checkT);
        window.frames['fnode21'].document.querySelector("#ContentPanel1_wrapper>.x-panel").setAttribute("style", "height: 2100px;overflow:scroll;")
        window.frames['fnode21'].document.querySelector("#ContentPanel1_Content").setAttribute("style", "overflow:scroll;")
    }
}, 200);