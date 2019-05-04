// ==UserScript==
// @name         epet-rush-to-buy
// @namespace    https://github.com/Links7094/
// @version      0.1
// @description  e宠商城抢购脚本
// @author       Links
// @license      MIT
// @include      https://www.epet.com/
// @include      https://cat.epet.com/
// @match        <$URL$>
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @grant        none
// @run-at       document-end
// @supportURL   https://github.com/Links7094/epet-rush-to-buy/issues
// @date         09/27/2018
// ==/UserScript==

var inline_src = (<><![CDATA[
    const date = new Date()
    const today = date.getFullYear() + "/" + (date.getMonth()+1+"").padStart(2, "0") + "/" + (date.getDate()+"").padStart(2, "0")
    const taskMap = new Map()

    let dateStrToTimestamp = (dateStr) => {
        return new Date(dateStr).getTime()
    };

    let initTask = (targetTimeStr) => {
        let taskContent = new Map()
        taskMap.set(targetTimeStr, taskContent)
        let targetTimestamp = dateStrToTimestamp(today + " " + targetTimeStr)
        setTimeout(() => {
            console.log("start task:" + targetTimeStr)
            for (let [gid, acid] of taskContent) {
                console.log("尝试抢购商品:" + gid)
                sale(acid, gid)
            }
            setTimeout(() => {
                $('.time-proconli ul[lang="' + targetTimeStr + '"] li').map((index, element) =>{
                    $(element).find(".novip").html("")
                })
            }, 10000)
        }, targetTimestamp - new Date().getTime())
    }

    let times = ["10:00","11:00","12:00","14:00","16:00","18:00","20:00","22:00"]
    for (let time of times){
        initTask(time)
        $.ajax({
            url: '/share/activitys/suprise.html?do=getNewSurprise',
            type: "POST",
            dataType: 'html',
            data: {time: time},
            success: function (msg) {
                var time_tmp = time;
                if (time.indexOf(':') >= 0) {
                    time_tmp = time.split(':')[0] + '\\:'+time.split(':')[1];
                }
                if ($("#pros" + time_tmp).length <= 0) {
                    $('.time-proconli').append('<ul id="pros' + time + '" class="clearfix vvvv time-procon prosvvv mt15" lang="' + time + '">' + msg + '<input type="hidden" class="num" value="0"/></ul>');
                    $('.time-proconli ul[lang="' + time + '"]').hide()
                }
                if(dateStrToTimestamp(today + " " + time) > new Date().getTime()){
                    $('.time-proconli ul[lang="' + time + '"] li').map((index, element) =>{
                        $(element).find(".novip").html("<input id='checkbox' type='checkbox'>想要</input>")
                        let checkbox = $(element).find(".novip").find("#checkbox")
                        checkbox.change(function(){
                            let taskContent = taskMap.get(time)

                            let gid = $(element).find(".gid").val()
                            let atid = $(element).find(".atid").val()
                            if(checkbox.prop("checked")){
                                // add to task
                                taskContent.set(gid, atid)
                            }else{
                               // remove from task
                                taskContent.delete(gid)
                            }
                        })
                    })
                }
            }
        });
    }
    $('.day-surprise').delegate('.timemove', 'mouseenter', function () {
        $(this).addClass('on').siblings().removeClass('on');
        var time = $(this).find('p.time').text();
        var obj = $('.time-proconli ul[lang="' + time + '"]');
        var ulwid =  $(obj).find("li").length*$(obj).find("li").width();
        $(obj).width(ulwid);
        if (obj.length > 0) {
            $('.time-proconli ul').hide();
            obj.show();
            //隐藏左右按钮
            if (obj.find('li').length <= 4) {
                $('.left_1').hide();
                $('.right_1').hide();
            } else {
                $('.left_1').show();
                $('.right_1').show();
            }
        }
    });

]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);