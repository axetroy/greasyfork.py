// ==UserScript==
// @name         マクロミル（SP版・事前）
// @namespace    macromill_sp
// @version      0.3
// @description  新UI作ったやつは肉骨粉食え
// @author       nikukoppun
// @include      https://monitor.macromill.com/airs/exec/smartAnswerAction.do*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (0 < $(".qtype-matrix").size()) {

        let scriptHtml = '<script>\
            function allCheck(ptn) {\
                var inputNum;\
                if (ptn == 0) {\
                    inputNum = "1";\
                } else if (ptn == 1) {\
                    inputNum = "";\
                } else {\
                    inputNum = window.prompt("何番目を一括チェックしますか？ (1～)", "");\
                    if (inputNum == null) return;\
                }\
                var targetSelector = null;\
                if (0 < $(".matrix_chk").size()) {\
                    targetSelector = $(".matrix_chk");\
                } else if (0 < $(".matrix-selections ").size()) {\
                    targetSelector = $(".matrix-selections")\
                }\
                if (targetSelector == null) {return}\
                $(".matrix-item:first").click();\
                targetSelector.each(function(i, elem) {\
                    var checkNum;\
                    if (0 < $(elem).find("li[data-choiceid]").length) {\
                        if (inputNum == "") {\
                            checkNum = $(elem).find("li[data-choiceid]").length - 1;\
                        } else {\
                            checkNum = parseInt(inputNum) - 1;\
                        }\
                        $(elem).find("li[data-choiceid]:eq(" + checkNum + ")").click();\
                    }\
                });\
                $("#finishButton").addClass("btnshow");\
            }\
            </script>';
        let buttonHtml = '\
                          <button style="float:right;margin:0.5rem;padding:0.5rem;" onclick="allCheck(1);return false;">一括（↓）</button>\
                          <button style="float:right;margin:0.5rem;padding:0.5rem;" onclick="allCheck(9);return false;">一括（任意）</button>&nbsp;\
                          <button style="float:right;margin:0.5rem;padding:0.5rem;" onclick="allCheck(0);return false;">一括（↑）</button>&nbsp;\
                         ';

        $("div.qnr-q-qbody-furl").append(scriptHtml + buttonHtml);

    }

})();