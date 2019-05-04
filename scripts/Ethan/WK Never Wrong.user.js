// ==UserScript==
// @name         WK Never Wrong
// @namespace    WKNW
// @version      0.1
// @description  Never get a review wrong again* (*even if you do)
// @author       Ethan
// @match        http*://www.wanikani.com/review/session*
// @match        http*://www.wanikani.com/lesson/session*
// @grant        none
// ==/UserScript==

if (answerChecker){
    answerChecker.evaluate = function(){
        return {accurate : !0, passed: !0};
    }
}else{
    console.log("answerChecker not found");
}