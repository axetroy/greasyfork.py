// ==UserScript==
// @name         マクロミル（PC版・事前）
// @namespace    macromill_pc
// @version      0.1
// @description  新UI作ったやつは肉骨粉食え
// @author       nikukoppun
// @include      https://monitor.macromill.com/airs/exec/answerAction.do*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (0 < $("form[name=answerForm] td[class^=matrix]").size()) {

        let scriptHtml = '<script>\
            function allCheck(ptn) {\
                var inputNum;\
                if (ptn == 0) {\
                    inputNum = "1";\
                } else if (ptn == 1) {\
                    inputNum = "";\
                } else {\
                    inputNum = window.prompt("何列目を一括チェックしますか？ (1～) (0=全チェックをクリア)", "");\
                    if (inputNum == null) return;\
                }\
                var tbl = $("form[name=answerForm] td[class^=matrix]:first").closest("table");\
                if (inputNum == "0") {\
                    tbl.find("input[type=\'checkbox\']").prop("checked", false);\
                    return;\
                }\
                tbl.find("tr").each(function(i, elem) {\
                    var checkNum;\
                    if (0 < $(elem).find("input[type=\'radio\']").length) {\
                        if (inputNum == "") {\
                            checkNum = $(elem).find("input[type=\'radio\']").length - 1;\
                        } else {\
                            checkNum = parseInt(inputNum) - 1;\
                        }\
                        $(elem).find("input[type=\'radio\']:eq(" + checkNum + ")").prop("checked", true);\
                    }\
                    if (0 < $(elem).find("input[type=\'checkbox\']").length) {\
                        if (inputNum == "") {\
                            checkNum = $(elem).find("input[type=\'checkbox\']").length - 1;\
                        } else {\
                            checkNum = parseInt(inputNum) - 1;\
                        }\
                        $(elem).find("input[type=\'checkbox\']:eq(" + checkNum + ")").prop("checked", true);\
                    }\
                });\
            }\
            function allCheckBottom() {\
                var tbl = $("form[name=answerForm] td[class^=matrix]:first").closest("table");\
                tbl.children("tbody").children("tr:last").find("input[type=\'radio\']").prop("checked", true);\
                tbl.children("tbody").children("tr:last").find("input[type=\'checkbox\']").prop("checked", true);\
            }\
            </script>';

        let buttonHtml = '<button style="float:right;margin:0.5rem;padding:0.5rem;" onclick="allCheck(1);return false;">縦（→）</button>&nbsp;&nbsp;\
                          <button style="float:right;margin:0.5rem;padding:0.5rem;" onclick="allCheck(9);return false;">縦（任意）</button>&nbsp;&nbsp;\
                          <button style="float:right;margin:0.5rem;padding:0.5rem;" onclick="allCheck(0);return false;">縦（←）</button>&nbsp;&nbsp;\
                          <button style="float:right;margin:0.5rem;padding:0.5rem;" onclick="allCheckBottom();return false;">横（最終行）</button>';

        var tbl = $("form[name=answerForm] td[class^=matrix]:first").closest("table");
        tbl.before(scriptHtml + buttonHtml);

    }

})();