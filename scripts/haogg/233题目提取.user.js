// ==UserScript==
// @name         233题目提取
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       四无小青年
// @grant        none
// @require        http://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
//@include        *//*.233.com/*
//<script src=”http://libs.baidu.com/jquery/2.1.1/jquery.min.js”></script>
// ==/UserScript==

(function () {
    'use strict';
    requestJson();
    window.copy = function (data) {
        var text = "<body>";
        var options = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]
        $.each(data.list.examDtoList, function (index, item) {
            text += "<p>" + (index + 1) + "、【" + item.examTypeName + "】" + item.content + "<br>";
            if (item.optionList.length > 0) {
                var tempOption = {};
                text += "答案选项:"
                $.each(item.optionList, function (index, item) {
                    tempOption[options[index]] = item;
                });
                text += JSON.stringify(tempOption);
            }
            text += "<br>答案:" + item.answer.replace("\n", "") + "<br>解析:" + item.analysis.replace("\n", "") + "<br></p>";
        })
        text += "</body>"
        var newWindow = window.open("", "newwin", "height=auto, width=auto,toolbar=no ,scrollbars=" + scroll + ",menubar=no");
        newWindow.document.write(text);
        newWindow.focus();
        console.log(text);
    }
})();

function requestJson() {
    $.ajax({
        type: 'post',
        url: 'http://wx.233.com/tiku/exam/GetExam?' + 'md5=' + page_paperMd5 + '&type=' + page_type + '&pageIndex=' + (page_index + 1) + '&pageSize=2000' + '&_=' + new Date().getTime(),
        dataType: 'text json',
        //data : '{"id":"4","usercode":"44","password":"123"}',
        success: function (data, textStatus, jqXHR) {
            //console.log("success");
            // console.log(data.result);
            //console.log(JSON.parse(data.result));
            window.mData = JSON.parse(jqXHR.responseText);
            addBtn();
            console.log(textStatus);
        },

        error: function (data, textStatus, jqXHR) {
            // console.log("error");
            // console.log(data.result );
            console.log(textStatus);
        },

        complete: function (jqXHR, textStatus) {
            // console.log("complete");
            //console.log(jqXHR.responseText );
            console.log(textStatus);
            // copy(data);
        }

    });
}

function addBtn() {
    $(".le-sidebar ul li:last").append('<li class="copy" onclick="copy(mData)" style="background:url("")"> ' +
        '<a href="javascript:;" class="m-trans copy" title="提取">' +
        '</a> <div class="le-sidebar-hover hy-aside-animation" style="display: none;">' +
        ' <i class="le-sidebar-triangle-ico"></i> <p class="le-sidebar-hover-txt">' +
        '提取</p> </div> </li>')
}


