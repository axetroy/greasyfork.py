// ==UserScript==
// @name         移除知乎跟随标题，展示所有回答！
// @description  remove zhihu title, unfold all the answers
// @version      1.0
// @author       TM
// @match        https://www.zhihu.com/question/*

// @namespace https://greasyfork.org/users/192511
// ==/UserScript==

(
    function() {
    var pageHeader = window.document.getElementsByClassName('PageHeader');
    if (pageHeader.length > 0) {
         pageHeader[0].getElementsByClassName('QuestionHeader-title')[0].innerHTML = '';
    }
    var isall=document.querySelector(".QuestionMainAction");
    if(isall){
        isall.click();
    }
}

)();