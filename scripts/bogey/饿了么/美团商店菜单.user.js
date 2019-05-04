// ==UserScript==
// @name         饿了么/美团商店菜单
// @namespace    Bogey
// @version      1.2.2
// @author       Bogey
// @description  饿了么/美团PC商店和菜单信息。
// @match        *www.ele.me/place/*
// @match        *www.ele.me/shop/*
// @match        *waimai.meituan.com/home/*
// @match        *waimai.meituan.com/restaurant/*
// @require      http://code.jquery.com/jquery-latest.js
// @require      https://greasyfork.org/scripts/18532-filesaver/code/FileSaver.js?version=164030
// ==/UserScript==

(function() {
    //饿了么商店信息
    function allEleShop(){
        var info="";
        var url="";
        $("div.place-rstbox.clearfix > div.clearfix > a.rstblock").each(function(){
            var img ="https:"+$(this).children("div.rstblock-logo").children("img").attr("src");
            img = img.substring(0,img.indexOf("?"));
            url=url+img+"\n";
            var uri = "https://www.ele.me"+$(this).attr("href");
            img = img.substring(img.lastIndexOf("/")+1);
            var title = $.trim($(this).children("div.rstblock-content").children("div.rstblock-title").text());
            info=info+title+"\n"+uri+"\n"+img+"\n";
        });
        $("#chen textarea:eq(0)").val(url);
        $("#chen textarea:eq(1)").val(info);
        divOpen();
    }

    //美团商店信息
    function allMeituanShop(){
        var info="";
        var url="";
        $("div.restaurant").each(function(){
            var img =$(this).find("div.preview").children("img").attr("src");
            url=url+img+"\n";
            var uri = "http://waimai.meituan.com"+$(this).children("a.rest-atag").attr("href");
            uri=uri.substring(0,uri.indexOf("?"));
            img = img.substring(img.lastIndexOf("/")+1);
            var title = $.trim($(this).find("div.content").children("div.name").children("span").attr("title"));
            info=info+title+"\n"+uri+"\n"+img+"\n";
        });
        $("#chen textarea:eq(0)").val(url);
        $("#chen textarea:eq(1)").val(info);
        divOpen();
    }

    //饿了么菜单信息
    function allEleFood(){
        var type="";
        var info="";
        var url="";
        var shopTitle = $.trim($("div.shopguide-info-wrapper > div > h1").attr("title"));
        type=type+shopTitle+"\n###\n";
        $("div.shopmenu-list").each(function(){
            var bigTitle = $(this).children("h3.shopmenu-title").html();
            bigTitle=$.trim(bigTitle.substring(0,bigTitle.indexOf("<")));
            var smallTitle=$.trim($(this).children("h3.shopmenu-title").children("span.shopmenu-des").text());
            type=type+bigTitle+"\n"+smallTitle+"\n";

            try{
                $(this).children("div.shopmenu-food").each(function(){
                    var image = "https:" + $(this).children("span.col-1").children("a").children("img").attr("src");
                    image = image.substring(0,image.indexOf("?"));
                    url=url+image+"\n";

                    image=image.substring(image.lastIndexOf("/")+1);
                    var title = $.trim($(this).children("div.col-2").children("h3.shopmenu-food-name").text());
                    var toolTip = $.trim($(this).children("div.col-2").children("p:first").text());
                    toolTip=toolTip.replace(/[\n]/g,"");
                    var foodPrice = $.trim($(this).children("span.col-3").text());
                    foodPrice=foodPrice.replace(/起/g,'');
                    info=info+bigTitle+"\n";
                    info=info+title+"\n";
                    info=info+toolTip+"\n";
                    info=info+foodPrice+"\n";
                    info=info+image+"\n";
                });
            }catch(e){}
        });
        $("#chen textarea:eq(0)").val(url);
        $("#chen textarea:eq(1)").val(type);
        $("#chen textarea:eq(2)").val(info);
        divOpen();
    }

    //美团菜单信息
    function allMeituanFood(){
        var type="";
        var info="";
        var url="";
        var shopTitle = $.trim($("div.details div.na span").text());
        type=type+shopTitle+"\n###\n";
        $("div.category").each(function(){
            var bigTitle = $.trim($(this).children("h3.title").attr("title"));
            var smallTitle="";
            try{
                smallTitle=$.trim($(this).children("div.food-cate-desc").text());
            }catch(e){}
            type=type+bigTitle+"\n"+smallTitle+"\n";

            try{
                $(this).find("div.j-pic-food").each(function(){
                    var image = "https:" + $(this).children("div.avatar").children("img").attr("data-src");
                    url=url+image+"\n";

                    image=image.substring(image.lastIndexOf("/")+1);
                    var title = $.trim($(this).children("div.np").children("span.name").attr("title"));
                    var toolTip = $.trim($(this).children("div.avatar").children("div.description").text());
                    var foodPrice = $.trim($(this).children("div.labels").children(".price").children(".only").text());
                    foodPrice=foodPrice.replace(/¥/g,'').replace(/\/份/g,'');
                    info=info+bigTitle+"\n";
                    info=info+title+"\n";
                    info=info+toolTip+"\n";
                    info=info+foodPrice+"\n";
                    info=info+image+"\n";
                });
            }catch(e){}
        });
        $("#chen textarea:eq(0)").val(url);
        $("#chen textarea:eq(1)").val(type);
        $("#chen textarea:eq(2)").val(info);
        divOpen();
    }

    //关闭信息
    function divClose(){
        $("body").css("padding-left","0px");
        $("#chen").css("display","none");
        $("#closeButton").css("display","none");
        $("#saveButton").css("display","none");
    }

    //显示信息
    function divOpen(){
        $("body").css("padding-left","200px");
        $("#chen").css("display","block");
        $("#closeButton").css("display","inline-block");
        $("#saveButton").css("display","inline-block");
    }

    //初始组件
    function createComponent() {
        var chen="<div style='position:fixed;z-index:99999;left:0;top:0;background:#fff;width:200px;height:90%;font-size:14px;display:none;' id='chen'></div>";
        var chen2="<div style='position:fixed;z-index:99999;left:0;bottom:0;height:3%;width:200px;font-size:14px;' id='chen2'></div>";
        var myButton="<button style='height:100%;display:inline-block;' id='myButton'></button>";
        var saveButton="<button style='height:100%;display:none;' id='saveButton'>保存</button>";
        var closeButton="<button style='float:right;height:100%;display:none;width:50px;text-align:center;' id='closeButton'>X</button>";
        $("body").append(chen);
        $("body").append(chen2);
        $("#chen2").append(myButton);
        $("#chen2").append(saveButton);
        $("#chen2").append(closeButton);
    }

    //保存信息
    function downloadText(filename,content){
        var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename);
    }
    //保存商店信息
    function downloadShopInfo(){
        var filename="info.txt";
        var content=$("#chen textarea:eq(1)").val();
        downloadText(filename,content);
    }
    //保存菜单信息
    function downloadFoodInfo(){
        var filename="info.txt";
        var content=$("#chen textarea:eq(1)").val()+"###\n"+$("#chen textarea:eq(2)").val();
        downloadText(filename,content);
    }

    //生成食物类型的菜单
    function createFoodMenu(){
        var imageurl="<textarea style='height:50%;width:100%'></textarea>";
        var myItems="<textarea style='height:50%;width:100%'></textarea>";
        $("#chen").append(imageurl);
        $("#chen").append(myItems);
    }

    //生成商店类型的菜单
    function createShopMenu(){
        var imageurl="<textarea style='height:33%;width:100%'></textarea>";
        var myMenu="<textarea style='height:33%;width:100%'></textarea>";
        var myItems="<textarea style='height:33%;width:100%'></textarea>";
        $("#chen").append(imageurl);
        $("#chen").append(myMenu);
        $("#chen").append(myItems);
    }

    //根据url地址判断
    function switchHref(href){
        if(href.indexOf("/place")>=0){
            $("#myButton").text("饿了么商店信息");
            $("#myButton").click(function(){allEleShop();});
            $("#saveButton").click(function(){downloadShopInfo();});
            createFoodMenu();
        }
        if(href.indexOf("/shop")>=0){
            $("#myButton").text('饿了么菜单信息');
            $("#myButton").click(function(){allEleFood();});
            $("#saveButton").click(function(){downloadFoodInfo();});
            createShopMenu();
        }
        if(href.indexOf("/home")>=0){
            $("#myButton").text("美团商店信息");
            $("#myButton").click(function(){allMeituanShop();});
            $("#saveButton").click(function(){downloadShopInfo();});
            createFoodMenu();
        }
        if(href.indexOf("/restaurant")>=0){
            $("#myButton").text('美团菜单信息');
            $("#myButton").click(function(){allMeituanFood();});
            $("#saveButton").click(function(){downloadFoodInfo();});
            createShopMenu();
        }
        $("#closeButton").click(function(){divClose();});
    }

    //初始化
    function init() {
        createComponent();
        switchHref(window.location.href);
    }

    init();
})();