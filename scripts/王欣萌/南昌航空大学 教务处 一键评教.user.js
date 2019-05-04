// ==UserScript==
// @name         南昌航空大学 教务处 一键评教
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  南昌航空大学教务处一键评教
// @author       kiritoxkiriko
// @include      http://jwc-publish.jwc.nchu.edu.cn/jsxsd/xspj/xspj_list.do*
// @include      http://jwc-publish.jwc.nchu.edu.cn/jsxsd/xspj/xspj_edit.do*
// @grant        unsafeWindow
// @grant        window
// @reqire       http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js

// ==/UserScript==

(function() {
var markPosition=1
var flag1=0;
var href=document.location.href;
if(href.search('jwc-publish.jwc.nchu.edu.cn/jsxsd/xspj/xspj_list.do')!=-1){//判断是否为加载网页
    hook();
    addBtn()
}else {
    remark();
}
function hook() {
    unsafeWindow.JsMod = function (htmlurl, tmpWidth, tmpHeight) {
        htmlurl = getRandomUrl(htmlurl);
        var newwin = window.open(htmlurl, window, "dialogWidth:" + tmpWidth + "px;status:no;dialogHeight:" + tmpHeight + "px")
        if (newwin == "refresh" || newwin == "ok") {
            if (getOs() == "chrome") {
                alert(getOs());
                window.location.reload();// 谷歌浏览器要用此方法刷新
            } else {
                window.location.reload()
                //window.location.href = window.location.href;
            }
        }

    }
}
function remarkAll() {
        $('#dataList a').each(function (index) {
            //alert(index);
            $('#dataList a')[index].click();
        })
}
function remark() {
    //hookRemark();
    //hookAlert()
   var length=$("input[type='radio']").length;
    $("input[type='radio']").each(function (index) {
        //if(length-1-index<4){
            var position=(markPosition==3)?0:1;
            if((length-1)-index==position){
                $(this).attr('checked','checked')
            }
        /*}else*/ if(index%4==markPosition){
            $(this).attr('checked','checked')
        }
    })
    $('textarea').val('老师的课很好听');
    document.getElementById("issubmit").value = "1";
    $.ajax({
        async: false,
        type: "POST",
        url:'/jsxsd/xspj/xspj_save.do',
        contentType : "application/x-www-form-urlencoded; charset=utf-8",
        data:$("#Form1").serialize(),
        success: function () {
            window.close()
        },
        error: function () {
            alert('error')
        }
    })
}
function addBtn() {
    var btn="<input type=\"button\" id=\"btnRemarkAll\" value=\"一键评分\"  class=\"button\" style='margin-left:20px'>"
    $('#btnShenshen').after(btn);
    $('#btnRemarkAll').click(function () {
        var isConfirm=confirm('是否一键评分')
        if(isConfirm){
            remarkAll();
        }else{
            return;
        }
    })
}




})();