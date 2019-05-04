// ==UserScript==
// @name         Wuyi University Assistant
// @name:en      Wuyi University Assistant
// @name:zh-CN   邑大旧系统助手
// @namespace    http://www.wyu.edu.cn/
// @version      0.1.3
// @description  由原来的邑大读书考试辅助系统转为邑大旧系统助手,保留原功能,并支持其他旧系统页面的chrome兼容.
// @description:en  A lowbee javascript...
// @author       LengSword
// @match        *://202.192.240.54/reading/*
// @match        *://jwc.wyu.cn/student/*
// @grant        unsafeWindow
// ==/UserScript==

/* jshint esversion: 6 */
(function() {
    'use strict';

    const _this = unsafeWindow;

    function CheckIsAnswering() {
        var maindoc=document;
        if(frames.mainFrame){
            maindoc=frames.mainFrame.document;
        }
        var itemlist=maindoc.getElementById("itemlist");
        if(maindoc.lform){
            //密码框不显示密码了,自动填写可以用浏览器的,安全性较高
            //获取到验证码为4位时立即登陆并转到选题目界面(注意:会自动强制进入考试,且可多次考试,建议一周只考一次)
            if(maindoc.lform.Validate.value.length==4){
                maindoc.lform.submit();
            }
        }

        if(itemlist){
            if(typeof(isChecked) == "function") {
                _this.isChecked=function isChecked(SEL) {
                    var col=document.getElementsByName(SEL);
                    for(var i=0;i<col.length;i++){
                        if (col[i].checked === true && col[i].disabled === false) {
                            return true;
                        }
                    }
                    //alert ("请选择答案！");
                    return false;
                };
            }


            _this.getItemList=function getItemList(id) {
                var xmldoc=new XMLHttpRequest();
                var sUrl="loaditemlist.asp?id=" + id;
                xmldoc.open("POST",sUrl,false);
                xmldoc.send();

                itemlist.innerHTML = unescape(xmldoc.responseText);

                _this.crID = id;
            };

            _this.getItemShow=function getItemShow(id) {
                var xmldoc=new XMLHttpRequest();
                var sUrl="loaditemshow.asp?id=" + id;
                xmldoc.open("POST",sUrl,false);
                xmldoc.send();
                _this.itemshow.innerHTML = unescape(xmldoc.responseText);

                //嵌入代码到getItemShow函数里,每次刷新下一题时给点击事件赋值,实现快速转到下一题
                //若是多选题则需用户自己选择并确定
                if(document.getElementsByName("ssel")[0].type!="checkbox") {
                    for(var i=0;i<document.getElementsByName("ssel").length;i++) {
                        document.getElementsByName("ssel")[i].onclick = _this.formsubmit;
                    }
                }
            };
            _this.writersp=function writersp() {
                var epid=document.getElementsByName("PID")[0].value;
                var eid=document.getElementsByName("ID")[0].value;
                var essel="";
                for(var i=0;i<document.getElementsByName("ssel").length;i++) {
                    if (document.getElementsByName("ssel")[i].checked) {
                        if (essel!=="") {
                            essel = essel + ", ";
                        }

                        essel=essel+document.getElementsByName("ssel")[i].value;
                    }
                }
                var xmldoc=new XMLHttpRequest();
                var sUrl="exam_write.asp?pid=" + epid + "&id=" + eid + "&ssel=" + essel;
                xmldoc.open("POST",sUrl,false);
                xmldoc.send();

                if (_this.crID<_this.maxID) {
                    _this.crID++;
                }
                else {
                    _this.crID=1;
                }
                _this.goItem(_this.crID);
            };
            _this.goItem(_this.crID);
            _this.getWriteTime=function getWriteTime() {
                var xmldoc=new XMLHttpRequest();
                var sUrl="exam_time.asp";
                xmldoc.open("POST",sUrl,false);
                xmldoc.send();
                setTimeout(getWriteTime,100000);
            };
            _this.ltime.innerText="剩余时间:300分钟\n";

            return;
        }
        setTimeout(CheckIsAnswering,1500);
    }

    setInterval(function goToChoose(){
        var maindoc=document;
        if(frames.mainFrame){
            maindoc=frames.mainFrame.document;
        }
        if( maindoc.location.href.search("exam_test") != -1) {
            clearInterval(goToChoose);
            return;
        }
        if(maindoc.location.href.search("readtest") != -1) {
            maindoc.location.href='exam_do.asp';
            clearInterval(goToChoose);
            return;
        }
    },2000);
    // 若多次出现无法自动进入选题界面的问题,可重新刷新登录一次或修改这里的延迟数值
    // 若觉得不够快,可以减少延迟数值

    setTimeout(function () {
        var maindoc=document;
        if(frames.mainFrame){
            maindoc=frames.mainFrame.document;
        }
        if(maindoc && _this.Enable !== undefined){
            //解决点击选取文字,复制粘贴的问题
            _this.Enable = function Enable() {
                return true;
            }
            maindoc.onkeydown = function (event) {
                if(event.keyCode==13) {
                    maindoc.lform.submit();
                }
            }

            _this.ChangeObj(document);
        }

    },500)

    if(window.location.href != "http://jwc.wyu.cn/student/qinfo.htm") {
        CheckIsAnswering();
    }
})();