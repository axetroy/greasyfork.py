// ==UserScript==
// @name         超多选项Select附加搜索框
// @namespace    http://ynotme.cn/
// @version      0.1
// @description  try to take over the world!
// @author       zhangtao103239
// @match         *://*/*
// @grant        none
// ==/UserScript==

(function() {
    selections = document.getElementsByTagName('select');
    for (var i = 0; i < selections.length; i++) {
        var selection = selections[i];
        if (selection.length > 20) {
            var ins = document.createElement('input');
            ins["data-indexCount"] = i;
            ins.onkeypress = function (e) {
                if (e.keyCode == 13) {
                    var value = ins.value;
                    var indexCount = ins["data-indexCount"]
                    var selection = selections[indexCount]
                    for (var j = 0; j < selection.length; j++) {
                        if (selection[j].label == value) {
                            selection[j].selected = true;
                            break;
                        }
                    }
                }
            }
            selection.parentElement.appendChild(ins);
        }
    }
    // Your code here...
})();