

// ==UserScript==
// @name         淘宝购物车抢拍
// @namespace    http://killest.net/
// @version      1.8
// @description  try to take over the world!
// @author       killest
// @match        https://h5.m.taobao.com/*
// @match        https://h5.m.tmall.hk/*
// @match        https://*.alipay.com/*
// @match        https://*.taobao.com/*
// @match        https://*.tmall.com/*
// @require      https://code.jquery.com/jquery-latest.js
// @require      http://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.js
// @grant        none
// ==/UserScript==
var bwtime = 100;//前置时间
var loginTimeout = 30;//登陆超时刷新时间 min
var Isweb=false;
if (window.location.href.indexOf("h5.m.taobao.com") > 0)
{
    Isweb=true;
}
var d8;//抢拍时间
var IsRob = $.cookie('IsRob') === "true" ? true : false;
var Isasync = false;
var realTime;
var starttime;
var endtime;
var initsdtime_int = 0;//第一次获得的服务器时间
var thissdtime_int;
function syncTime()
{
    d8 = new Date();
    d8.setTime($.cookie("d8time"));//读取抢拍时间

    starttime = new Date().getTime();
    $.ajax({
        url: "https://t.alicdn.com/t/gettime?_ksTS=1523775092522_196",
        async: false,
        success: function (result)
        {


            endtime = new Date().getTime();
            console.log("耗时" + (endtime - starttime));
            console.log("结束获取时间" + new Date().getTime());
            //服务器时间
            var sd = new Date();
            sd.setTime(result.time * 1000);
            console.log("时间:" + sd.toLocaleString());
            console.log("d8时间:" + d8.toLocaleString());
            var ttx = d8 - sd;
            console.log("ttx:" + ttx);
            $.cookie('IsRob', true, { expires: 7 ,path: '/'});
            if (ttx < 0)//已过1
            {
                alert("时间已过");
                $.cookie('IsRob', false, { expires: 7,path: '/' });
                location.replace(location.href);
            }
            else if (ttx > 60 * 1000 * 10)//10分钟才同步
            {
                console.log("距离开始抢拍还要一段时间");
                setTimeout(() =>
                           {
                    location.replace(location.href);
                }, 60 * 1000);
            }
            else if (ttx > 0) {
                if (initsdtime_int == 0) {
                    initsdtime_int = parseInt(result.time);
                }

                if (parseInt(result.time) == (initsdtime_int + 1)) {
                    console.log("同步时间完成");

                    sd.setTime(result.time * 1000 + endtime - starttime + bwtime);

                    window.setTimeout(function ()
                                      {
                        // alert("时间到");
                        console.log("时间到");
                        if(Isweb)
                        {
                            $(".btn").trigger("click");
                        }
                        else
                        {
                            $("#J_Go > span").trigger("click");
                        }


                    }, d8 - sd);
                }
                else {
                    setTimeout(() =>
                               {
                        syncTime();
                    }, 20);
                }


            }


        },
        dataType: "jsonp"


    });
}
if (window.location.href.indexOf("buyNow") > 0 ) {

    // $("#submitOrder_1 > div.mui-flex.align-center > div.cell.fixed.action > div > span").trigger("click");
    //setTimeout setInterval
    window.setTimeout(function () {
        $("#submitOrder_1 > div.mui-flex.align-center > div.cell.fixed.action > div > span").trigger("click");
        window.setInterval(function () {
            $("#submitOrder_1 > div.mui-flex.align-center > div.cell.fixed.action > div > span").trigger("click");

        }, 25);
    }, 15);


}
console.log(window.location.href);
if (window.location.href.indexOf("confirm_order") > 0 ) {
    // console.log( $("#submitOrder_1 > div > a.go-btn").html());

    $(".go-btn").trigger("click");
    window.setInterval(function () {
        $(".go-btn").trigger("click");
        var submit=$('.go-btn');
        if(submit.length !== 0){
            submit[0].click();
            submit[0].trigger("click");
        }
    }, 10);
}
if (window.location.href.indexOf("trade_pay.do") > 0 && IsRob) {
    $.cookie('IsRob', false, { expires: 7 ,path: '/'});
    var notification = new Notification("MSG：", {
        body: '已经抢拍成功~尽快支付'
    });
}

function SetNotification()
{
    Notification.requestPermission().then(function (result)
                                          {
        // result可能是是granted, denied, 或default.
        if (result != 'granted')
            alert('请允许桌面通知~');
    });

}
(function ()
 {
    'use strict';
    if(Notification.permission != 'granted')
    {
        SetNotification();
    }
    //Notification.requestPermission();
    //$(".shop").trigger("select");



    $(document).ready(function ()
                      {
        console.log("Isweb:"+Isweb);




        if (window.location.href.indexOf("cart.htm") > 0) {
            if(Isweb)
            {
                var elem = "#J_cartBuy > div > div:nth-child(2) > div.allItemv2 > div.footer > div > div > div.qx";
                var selectstr = "#" + $(".bundlev2")[0].id + " > div.shop > div > div > div.shopcb > p > label";
            }
            else
            {

                var elem = "#J_FloatBar > div.float-bar-wrapper > div.operations > a.J_BatchShare";
                if($(".J_Order")[0])
                {
                    var selectstr = "#" + $(".J_Order")[0].id + " > div.J_ItemHead.shop.clearfix > div > div > label";
                }
                else
                {
                    var selectstr = "#" + $(".J_CheckBoxShop")[0].id + " > div.J_ItemHead.shop.clearfix > div > div > label";
                }

            }



            if (IsRob) {

                $(selectstr).trigger("click");
                $(elem).after("<button class=\"btn\" id=\"startRob\" > 抢拍中... <botton>");

            }
            else {
                $(elem).after("<button class=\"btn\" id=\"startRob\"> 开始抢拍 <botton>");

            }
            if ($.cookie('robtime')) {
                $(elem).after("<input id=\"Robtime\" class=\"hj\" style='width:70px' value=\"" + $.cookie('robtime') + "\"  type=\"text\"  ></input>");
            }
            else {
                $(elem).after("<input id=\"Robtime\" class=\"hj\" value=\"20:00:00\" style='width:70px'  type=\"text\"  ></input>");
            }

            if (IsRob) {
                syncTime();
            }
            $(elem).after("<label class=\"major\"style='color:red' >抢拍时间</label>");
            $("#startRob").click(function ()
                                 {
                if (IsRob) {
                    IsRob = false;
                    $.cookie('IsRob', false, { expires: 7 ,path: '/'});
                    $("#startRob").text("开始抢拍");
                }
                else {




                    $(selectstr).trigger("click");

                    let d = new Date();
                    d8 = new Date();
                    var timestr = $("#Robtime").val();

                    var tts = timestr.split(":");
                    console.log(timestr);
                    if (tts.length != 3) {
                        alert("输入的时间有误 参考: 20:00:00  ");
                        return;
                    }

                    d8.setHours(parseInt(tts[0]));
                    d8.setMinutes(parseInt(tts[1]));
                    d8.setSeconds(parseInt(tts[2]));

                    let ttx = d8 - d;
                    if (ttx < 0)//已过10s
                    {
                        d8.setTime(d8.getTime() + 24 * 60 * 60 * 1000);


                    }
                    console.log("抢拍时间:" + d8.toLocaleString());
                    $.cookie('d8time', d8.getTime(), { expires: 7 });
                    IsRob = true;
                    $.cookie('robtime', $("#Robtime").val(), { expires: 7 });
                    $.cookie('IsRob', true, { expires: 7,path: '/' });
                    $("#startRob").text("抢拍中...");
                    syncTime();
                }


                // window.setTimeout(
                //     function(){
                //         var selectstr="#"+$(".bundlev2")[0].id+" > div.shop > div > div > div.shopcb > p > label";
                //         $(selectstr).trigger("click");
                //     },
                //     2000
                // );

            });


        }
        else if(window.location.href.indexOf("newOn_desc") > 0)
        {
            //setTimeout  setInterval
            window.setInterval(function () {
                var newonnode;
                var newurl;
                if(window.location.href.indexOf("tmall")> 0)
                {
                    newonnode=$("#J_ShopSearchResult > div > div.J_TItems > div:nth-child(1) > dl:nth-child(1) > dd.detail > a");
                    newurl = newonnode.attr("href");
                }
                else
                {

                    newonnode=$("#J_ShopSearchResult > div > div.shop-hesper-bd.grid > div:nth-child(2) > dl:nth-child(1) > dd.detail > a");
                    newurl = newonnode.attr("href");
                }
                newurl="https:"+newurl;
                newurl = $.trim (newurl.replace("&amp;","&"));
                console.log(newurl);
                if(newonnode.text()!="" && newonnode.text()!= $.cookie("newnode") )
                {

                    $.cookie('newnode', newonnode.text(), { expires: 7 ,path: '/'});
                    var notification = new Notification("MSG：", {
                        body: newonnode.text(),
                        icon: 'http://img.alicdn.com/favicon.ico'
                    });
                    notification.onclick = function() {
                        window.open(newurl);
                    }
                }
                else
                {
                    location.replace(location.href);
                }

            },5000);



        }

    });


})();


