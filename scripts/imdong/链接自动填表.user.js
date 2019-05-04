// ==UserScript==
// @name         链接自动填表
// @namespace    http://www.qs5.org/?auto_setForm
// @version      0.1
// @description  自动根据连接填充页面表单 方法网页追加 #field=选择器1:值,选择器2:值...&submit=#提交选择器,触发事件
// @author       ImDong
// @match        *://*/*
// ==/UserScript==

(function() {
    "use strict";

    // 获取参数
    var formFields = location.hash.match(/(?:^#|&)field=([^&]+)/),
        formSubmit = location.hash.match(/(?:^#|&)submit=([^&]+)/);

    // 遍历表单
    if(formFields && formFields.length > 1){
        formFields[1].split(",").forEach(function(fieldItem) {
            var fieldInfo = fieldItem.split(":"),
                fieldDom  = $(fieldInfo[0]);

                if(fieldDom.length > 0 && fieldInfo.length > 1){
                    fieldDom.val(decodeURIComponent(fieldInfo[1]));
                }
        });
    }

    // 开始提交
    if(formSubmit && formSubmit.length > 1){
        var submitInfo = formSubmit[1].split(","),
            submitDom  = $(submitInfo[0]);

            if(submitDom.length > 0 && submitInfo.length > 1 && typeof submitDom[submitInfo[1]] == 'function'){
                submitDom[submitInfo[1]]();
            }
    }
})();