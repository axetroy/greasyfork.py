// ==UserScript==
// @name         青海大学计算机系思想品德评定自动填写
// @namespace    https://www.onlinecode.cn/
// @version      2.1
// @description  青海大学计算机系思想品德评定自动填写~
// @author       Lee
// @match        *://49.209.80.139:8080/student/moral_mark
// @grant        none
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.js
// @require      https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js
// @run-at       document-end
// ==/UserScript==
/*var xhr = new XMLHttpRequest();
        xhr.open("get", "../verify_img", true);
        xhr.responseType = "blob";
        xhr.onload = function() {
            if (this.status == 200) {
                var blob = this.response;
                var img = document.createElement("img");
                img.onload = function(e) {
                    window.URL.revokeObjectURL(img.src); // 清除释放
                };
                img.src = window.URL.createObjectURL(blob);
                $(".container").before(img);
                console.log(document.cookie);
            }
        }
        xhr.send();*/

(function() {
    'use strict';

    // Your code here...
    var AllStuID = new Array();
    $(".container").before('<center><h1>输入验证码</h1><img src="/verify_img" onclick="this.src=\'/verify_img?\'+Math.random()" class="img-responsive"><input type="text" id="mycode"><button id="autosubmit">一键提交</button></center>');
    $("#autosubmit").click(function(){
        console.log("Auto Submit Working...");
        var score = new Array(10,15,15,15,15,10,10,10);
        var verify_code = $("#mycode").val();
        if(verify_code=="")
        {
            alert("请输入验证码!");
            return;
        }
        $("ul").each(function () {
            for (var i = 1; i < $(this).find("li").length; i++) {
                var stuid = $(this).find("li").eq(i).find("a").attr("href");
                stuid = stuid.substr(1,stuid.length-1);
                AllStuID.push(stuid);
            }
        });
        for(var i=0;i<AllStuID.length;i=i+1)
        {
            var data = {
                stu_id:AllStuID[i],
                score:score,
                total_score:100,
                verify_code:verify_code
            };
            var data_json = JSON.stringify(data);
            $.post("/student/moral_mark_processing",
                   {score_data:data_json},
                   function (response, status) {
                    console.log("Success!");
                    $(".container").before("<center><h3>评定成功!</h3></center>");
                });
        }
    });
})();