// ==UserScript==
// @name         吾爱破解论坛回帖自动填写验证问题答案
// @namespace    http://bmqy.net/
// @version      0.4
// @description  吾爱破解论坛点击回帖内容输入框后，自动填写验证问题答案
// @author       bmqy
// @match        http://*.52pojie.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function getAnswerText(){
        var sAnswerText = '';
        var reg = /\u3010(.*)\u3011/g;
        if(reg.test(document.querySelector('.p_pop.p_opt').innerText)){
            sAnswerText = RegExp.$1;
        }
        return sAnswerText;
    }

    function toAnswer(){
        var oReplyAnswer = document.querySelector('input[name=secanswer]');
        oReplyAnswer.value = getAnswerText();
    }

    if(document.querySelector('#fastposteditor')){
        document.addEventListener('DOMNodeInserted', function(){
            if(document.querySelector('input[name=secanswer]')){
                var oReplyTextarea = document.querySelector('#fastpostmessage');
                oReplyTextarea.addEventListener('focus', function(){
                    toAnswer();
                    if(document.querySelector('input[name=secanswer]').value !== ''){
                        document.querySelector('#seccheck_fastpost').addEventListener('DOMNodeInserted', function(){
                            toAnswer();
                        });
                    }
                });
            }
        });

        if(document.querySelector('#append_parent')){
            document.querySelector('#append_parent').addEventListener('DOMNodeInserted', function(){
                document.querySelector('#seccheck_reply').addEventListener('DOMNodeInserted', function(){
                    toAnswer();
                });
            });
        }
    }
    else if(document.querySelector('#editorbox')){
        document.querySelector('#seccheck').addEventListener('DOMNodeInserted', function(){
            toAnswer();
        });
    }
    else{
        return;
    }
})();