// ==UserScript==
// @name         增强黎明版
// @namespace    no1xsyzy
// @version      0.2.5
// @description  增强黎明版的一些交互
// @author       no1xsyzy
// @match        http://adnmb.com/*
// @match        https://adnmb.com/*
// @match        http://adnmb1.com/*
// @match        https://adnmb1.com/*
// @match        http://adnmb2.com/*
// @match        https://adnmb2.com/*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @require      https://code.jquery.com/jquery-2.2.4.min.js
// @license      Apache License, Version 2.0 (Apache-2.0); https://opensource.org/licenses/Apache-2.0
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle(".h-ref-view {  position: absolute;  display: none;}.h-ref-view .h-threads-item-ref {  background: #f0e0d6;  border: 1px solid #000;  margin-top: 20px;}.h-ref-view .uk-container {  background: #f0e0d6;}")
    var URL参数 = (function(参数){
        var URL参数 = {}
        参数.replace(/^\?/, "").split("&").forEach(function(键值等号对){
            var 键值对=键值等号对.split("=",2)
            URL参数[键值对[0]]=键值对[1]
        })
        return URL参数
    })(window.location.search)
    var 正文框 = document.querySelector("textarea.h-post-form-textarea")
    var 保存 = function(){
        GM_setValue(window.location.pathname, 正文框.value)
    }
    ;(function() {
        // 模块：自动保存编辑
        if(window.location.href.includes("doReplyThread")){ // 回复 POST 页面
            if(document.getElementsByClassName('success')[0].textContent.includes("回复成功")){ // 回复成功
                var 主串路径=/https?:\/\/[^/]+(\/t\/\d+)/.exec(document.getElementById('href').href)[1]
                GM_deleteValue(主串路径)
            }
        }else if(window.location.href.includes("/t/")){ // 串内
            正文框.value = GM_getValue(window.location.pathname, URL参数.r?">>No."+URL参数.r+"\n":"")
            正文框.addEventListener("change", 保存)
        }
    })()
    ;(function() {
        // 模块：追记引用串号
        if(window.location.href.includes("/t/")){
            $("body").on("click", "a.h-threads-info-id", function(e){
                if(正文框.value.length > 0 && !正文框.value.endsWith("\n")){
                    正文框.value += "\n"
                }
                正文框.value += ">>"+e.target.textContent+"\n"
                保存()
                e.preventDefault()
            })
        }
    })()
    $(document).ready(function(e){
        var 无限取引用Timeout=setTimeout(function() {
            // 模块：无限取引用
            var m = $("font[color='#789922']").filter(function(){
                return /^((>>No\.)|(>>)|(>))\d+$/.test($.trim($(this).text()));
            }).on('click', function togglesRef(e){
                var ref = $(this).data("ref")
                if(ref === undefined){
                    var self = this;
                    var tid = /\d+/.exec($(this).text())[0];
                    $.get('/Home/Forum/ref?id='+tid).done(function(data){
                        if(data.indexOf('<!DOCTYPE html><html><head>')>=0){
                            console.log('ref tid ' + tid + ' return false');
                            return false;
                        }
                        var m = $("<div class=\"h-ref-view\"></div>").html(data).css({
                            top:$(self).offset().top,
                            left:$(self).offset().left
                        }).appendTo($('body')).fadeIn(100).on('click',function(e){m.fadeOut(100)})
                        $(self).data("ref", m)
                        m.find("font[color='#789922']").filter(function(){
                            return /^((>>No\.)|(>>)|(>))\d+$/.test($(this).text())
                        }).on('click', togglesRef)
                    })
                }else{
                    ref.css({
                        top:$(this).offset().top,
                        left:$(this).offset().left
                    }).fadeToggle(100)
                }
                e.stopPropagation()
            })
            $("#h-ref-view").remove()
            clearTimeout(无限取引用Timeout)
        }, 100)
    })
})();