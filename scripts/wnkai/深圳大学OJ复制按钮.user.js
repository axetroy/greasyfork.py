// ==UserScript==
// @name         深圳大学OJ复制按钮
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Copy SZUOJ!
// @author       ???
// @match        http://172.31.234.11/JudgeOnline/problem.php?cid=*&pid=*
// @match        http://172.31.234.12/JudgeOnline/problem.php?cid=*&pid=*
// @match        http://172.31.234.14/JudgeOnline/problem.php?cid=*&pid=*
// @match        http://172.31.234.21/JudgeOnline/problem.php?cid=*&pid=*
// @match        http://172.31.234.46/JudgeOnline/problem.php?cid=*&pid=*
// @match        http://172.31.234.47/JudgeOnline/problem.php?cid=*&pid=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var button1 = document.createElement("button");
    button1.innerText="复制样例输入";
    button1.onclick = function(){
        var myelement = document.getElementsByClassName("sampledata");
        var range = document.createRange();
        range.selectNode(myelement[0]);
        window.getSelection().addRange(range);
        document.execCommand("Copy");
        window.getSelection().empty();
    };

    var button2 = document.createElement("button");
    button2.innerText="复制样例输出";
    button2.onclick = function(){
        var myelement = document.getElementsByClassName("sampledata");
        var range = document.createRange();
        range.selectNode(myelement[1]);
        window.getSelection().addRange(range);
        document.execCommand("Copy");
        window.getSelection().empty();
    };

    var x=document.getElementsByTagName("h2");
    x[4].append(button1);
    x[5].append(button2);
})();