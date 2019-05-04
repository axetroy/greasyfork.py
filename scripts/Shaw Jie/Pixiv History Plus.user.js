// ==UserScript==
// @name         Pixiv History Plus
// @namespace    http://tampermonkey.net/
// @icon         https://s.pximg.net/common/images/apple-touch-icon.png?20180709
// @version      0.1
// @description  try to take over the Pixiv History!
// @author       ShaoFan
// @include        https://www.pixiv.net/history.php
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle('.htb:hover{width:480px;}.artist{ color:#fff;background:rgba(34, 34, 34, 0.8);position:absolute;bottom:0;width:90%;border-radius:0.5rem;padding:5px 0;margin:0 5%;}');

    var requireFields = {
        // 列表Ids参数匹配
        regex: /https:\/\/i.pximg.net\/c\/\d+x\d+\/img-master\/img\/\S{20}(\d+)_\S+/,
        // 图片详情页地址
        imgPatter: '/member_illust.php?mode=medium&illust_id=',
        // 图片详情Json接口
        historyUrl: '/rpc/index.php?mode=get_illust_detail_by_ids&illust_ids=',
        // 行显示内容
        lineCount: 5,
        // 重试时间间隔
        tryDuration: 300,
        // 是否开启调试模式
        isDebug: false,
        elementMaker:function(id, bcImg, artist){
            var tag = document.createElement('a');
            tag.href = this.imgPatter + id;
            tag.target = '_blank';
            tag["data-id"] = id;
            tag.className = '_history-item htb';
            tag.style.backgroundImage = `url("${bcImg}")`;
            tag.style.transition = "all 1s";
            tag.style.display = "none";

            var artister = document.createElement('div');
            artister.innerHTML = artist;
            artister.className = 'artist';
            tag.appendChild(artister);
            return tag;
        },
        replaceFunc:(historySpanList, self) => {
            var ids = [];
            var str;
            historySpanList.each((index, element)=>{
                str = element.style.backgroundImage.substring(5);
                ids.push(str.match(self.regex)[1]);
            });
            Debug.log(ids);

            var path = self.historyUrl + encodeURIComponent(ids.join(','));

            $.get(path,(data)=>{
                Debug.log(data);
                if(!data.error){
                    var list = data.body;
                    var elements = [];
                    for(var i = 0; i < ids.length; i++){
                        var tag = self.elementMaker(list[ids[i]].illust_id, list[ids[i]].url['240mw'], list[ids[i]].user_name);
                        if(i != 0 && i % self.lineCount == 0){
                            elements.push('<br/>')
                        }
                        elements.push(tag);
                    }
                    $('._history-items').empty();
                    $('._history-items').css("text-align","center");
                    $('._history-items').append(elements);
                    $(elements).siblings( "a" ).slideDown('slow');
                }else{
                    Debug.error('接口调用出错');
                    Debug.error(data);
                }
            });
        },
        initFunc:function(){
            $('._history-items').children().hide();
            var self = this;
             // 进行第一次列表数据获取操作
            var historySpanList = $("._history-items").find("a[class='_history-item show-detail list-item'], span[class='_history-item trial']")

            if(historySpanList.length == 0){
                var tryCount = 5;
                var timmer = setInterval(() => {
                    historySpanList = $("._history-items").find("a[class='_history-item show-detail list-item'], span[class='_history-item trial']");
                    if(historySpanList.length != 0){
                        self.replaceFunc(historySpanList, self);
                        clearInterval(timmer);
                    }else{
                        tryCount--;
                        if(tryCount == 0){
                            console.log('未能获取到历史浏览记录列表')
                            clearInterval(timmer);
                        }
                    }
                },self.tryDuration);
            }else{
                self.replaceFunc(historySpanList);
            }
        }
    }

    var Debug = {
        printDebugInfo:function(name, message){
            if(requireFields.isDebug){
                console[name](message);
            }
        },
        group:function(message){
            this.printDebugInfo("group",message);
        },
        groupEnd:function(message){
            this.printDebugInfo("groupEnd",message);
        },
        log:function(message){
            this.printDebugInfo("log",message);
        },
        info:function(message){
            this.printDebugInfo("info",message);
        },
        error:function(message){
            this.printDebugInfo("error",message);
        },
        count:function(message){
            this.printDebugInfo("count",message);
        }
    };

    requireFields.initFunc();
})();