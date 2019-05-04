// ==UserScript==
// @name         fuck南昌航空大学一体化学习平台
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  去除南昌航空大学一体化学习平台不可粘贴，并添加一键粘贴功能
// @author       kiritoxkiriko
// @match        http://10.1.244.30:8080/labex/login.do
// @match        http://10.1.244.30:8080/lab/login.do
// @grant        none
// @require      http://libs.baidu.com/jquery/2.1.1/jquery.min.js

// ==/UserScript==

(function () {
    'use strict';
    var btn_fuck = "<div class='btn btn-default' id='fuck_unpaste' style='position: absolute;top:50px;right:150px;z-index:1000;'>fuck it</div>";
    var fuck = "<div class='btn btn-default' id='fuck' style='margin-left:10px;float:right;'>一键添加答案<div>";
    var copy_btn = "<div class='btn btn-default' id='copy' style='margin-left:10px;float:right;'>一键复制答案到剪贴板<div>";
    var fuck_input = "<textarea id='fuck_input' type='text' rows='1' style='border:0;border-bottom:1px solid black;text-align:center;margin-left:10px;margin-top:10px;float:right;'></textarea>";
    $("#top-panel").prepend(btn_fuck); //添加设置按钮
    $("#fuck_unpaste").click(function () { //按下该按钮
        if ($("#btn_save").length > 0) { //存在保存按钮，即当前为提交界面
            if ($("#fuck").length <= 0) { //未添加过一键添加按钮
                alert("设置成功"); //弹出提示
                $("#btn_save").after(copy_btn);
                $('textarea,input').off('paste'); //设为可粘贴
                $("#btn_save").after(fuck); //添加按钮和文本框
                $("#btn_save").after(fuck_input);
                try {
                    var editor1 = ace.edit("editor"); //获取编辑器
                    $("#fuck").text("复制答案到编辑器"); //设置文本框按钮文字
                    $("#copy").remove();
                    $("#fuck_input").val("添加答案到此处");
                    $("#fuck_input").focus(function () {
                        if ($(this).val() == "添加答案到此处") {
                            $(this).val("");
                        }
                    });

                    $("#fuck_input").blur(function () {
                        if ($(this).val() == "") {
                            $(this).val("添加答案到此处");
                        }
                    });
                    $("#fuck").click(function () { //按下复制按钮
                        var input = $("#fuck_input").val(); //获取文本框内容
                        editor1.setValue(input); //将文本框内容复制到编辑器
                    });
                } catch (err) { //获取编辑器跳出异常，即页面没有编辑器
                    $("#fuck_input").val("每个答案用分号隔开"); //设置文本框按钮文字
                    $("#fuck_input").focus(function () {
                        if ($(this).val() == "每个答案用分号隔开") {
                            $(this).val("");
                        }
                    });
                    $("#fuck_input").blur(function () {
                        if ($(this).val() == "") {
                            $(this).val("每个答案用分号隔开");
                        }
                    });
                    $("#fuck").click(function () { //按下按钮
                        var input = $("#fuck_input").val(); //获取文本框内容
                        var output = input.split(";"); //将从文本框获取到的字符串用;分割，得到多个结果
                        $('input[id="answer"]').each(function (index) { //遍历界面中所有输入框
                            if (index < output.length) { //当输入框数量少于输入的结果数
                                $(this).val(output[index]); //将结果输入至输入框
                            } else { //否则
                                $(this).val(""); //赋值空白
                            }
                        });
                    });
                    $("#copy").click(function(){
                        var temp=$('#fuck_input').val(copy());//答案
                        temp.select();
                        document.execCommand("Copy"); // 执行浏览器复制命令
                        alert("复制完成");
                    });
                }
            }
        }
    });
})();
function copy(){
    var answer="";
    $('input[id="answer"]').each(function (index) { //遍历界面中所有输入框
                                answer+=$(this).val()+";"
                                 //将结果加入字符串

                        });
    return answer;
}