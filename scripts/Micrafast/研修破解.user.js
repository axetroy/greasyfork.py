// ==UserScript==
// @name         研修破解
// @namespace    研修破解
// @version      1.1
// @description  关闭教师研修提示暂停 适用于teacheredu.cn登录入口的教师研修或视频页面为study.yanxiu.jsyxsq.com/proj/studentwork/的研修
// @author       Micrafast
// @match        http://study.yanxiu.jsyxsq.com/proj/studentwork/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    var tishiBar = document.getElementById("benci").parentNode;
    var pjscript = document.createElement("script");
    var scriptText = document.createTextNode(
    'function openTishi(minute,second){\n'+
    '    if(minute==randomTime)\n'+
    '    {\n'+
    '        if(second == "0")\n'+
    '        {\n'+
    '            var tishiTime=document.form2.thzt.value;\n'+
    '            updateStudyTime(0);\n'+
    '            setRandomTipTime();\n'+
    '        }\n'+
    '    }\n'+
    '}\n'+

    'function openTishi(second){\n'+
    '    if(second==randomTime)\n'+
    '    {\n'+
    '        var tishiTime=document.form2.thzt.value;\n'+
    '        updateStudyTime(0);\n'+
    '        setRandomTipTime();\n'+
    '    }\n'+
    '}\n');
    pjscript.appendChild(scriptText);
    tishiBar.appendChild(pjscript);
    var childText = document.createTextNode("破解成功");
    tishiBar.appendChild(childText);
})();