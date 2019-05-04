// ==UserScript==
// @name         查看 bangumi 马赛克瓷砖
// @namespace    http://tampermonkey.net/
// @author       鈴宮華緋
// @description  查看 bangumi 马赛克瓷砖，配合 http://bangumi.tv/group/topic/344198 使用
// @version      2.30
// @include      /https?:\/\/(bgm\.tv|bangumi\.tv|chii\.in)\/(user)\/[^\/]*$/
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    let dateobj = new Date();
    let date = dateobj.toLocaleDateString();
    let user_mosaic_date = {};
    let get_new_mosaic = false;
    let api_prefix = "https://bangumi-mosaic-tile.now.sh/users/";
    let url = window.location.href;
    let userid = url.match(/user\/(.*)/)[1];
    let type_name = "进度";
    let type = "progress";
    if (localStorage.getItem("bangumi_mosaic_date") === null || typeof(JSON.parse(localStorage.getItem("bangumi_mosaic_date"))) != 'object') {
        user_mosaic_date[userid] = date;
        localStorage.setItem("bangumi_mosaic_date", JSON.stringify(user_mosaic_date));
        get_new_mosaic = true;
    } else {
        let user_mosaic_date = JSON.parse(localStorage.getItem("bangumi_mosaic_date"));
        if ( date != user_mosaic_date[userid] ) {
            user_mosaic_date[userid] = date;
            localStorage.setItem("bangumi_mosaic_date", JSON.stringify(user_mosaic_date));
            get_new_mosaic = true;
        }
    }
    if (localStorage.getItem("bangumi_mosaic_type_name") === null) {
        localStorage.setItem("bangumi_mosaic_type_name",type_name);
    } else {
        type_name = localStorage.getItem("bangumi_mosaic_type_name");
    }
    if (localStorage.getItem("bangumi_mosaic_type") === null) {
        localStorage.setItem("bangumi_mosaic_type",type);
    } else {
        type = localStorage.getItem("bangumi_mosaic_type");
    }
    let type_list = {"吐槽":"say","收藏":"subject","进度":"progress","日志":"blog","人物":"mono","好友":"relation","小组":"group","维基":"wiki","目录":"index","天窗":"doujin"};
    $("ul.network_service").before("<div class='app_box' style='position:relative;'><div class='mosaic_box' style='text-align:center;margin-top:10px;color:rgb(150,150,150);'></div></div>");
    $("div.app_box").prepend("<ul class='tab_btn_list'></ul>");
    for(let key in type_list) {
        $("ul.tab_btn_list").append("<li class='tab_btn' target='" + type_list[key] + "'>" + key + "</li>");
    }
    $("li[target=" + type + "]").css({"background":"#ddd"}).addClass("clicked");
    if(1) {
        $("ul.tab_btn_list").css({"position":"relative","box-shadow":"0 0 3px 0 #666","-moz-box-shadow":"0 0 3px 0 #666","-webkit-box-shadow":"0 0 3px 0 #666","border-radius":"5px","margin":"20px 100px 0 100px","overflow":"hidden"});
        $("li.tab_btn").css({"padding":"3px 6px","border-bottom":"solid 1px #ddd","cursor":"pointer","float":"left","text-align":"center"});
        $("li.tab_btn").outerWidth($("ul.tab_btn_list").outerWidth() / getjsonlength(type_list));
    } else {
        $("ul.tab_btn_list").css({"position":"absolute","left":"-50px","top":"-10px","box-shadow":"0 0 3px 0 #666","-moz-box-shadow":"0 0 3px 0 #666","-webkit-box-shadow":"0 0 3px 0 #666","border-radius":"5px","overflow":"hidden"});
        $("li.tab_btn").css({"padding":"3px 6px","border-bottom":"solid 1px #ddd","cursor":"pointer","text-align":"center"}).last().css({"border":"none"});
    }
    $("li.tab_btn").hover(function(){
        if(!$(this).hasClass("clicked")) {
            $(this).css({"background":"#ddd"});
        }
    },function() {
        if(!$(this).hasClass("clicked")) {
            $(this).css({"background":"#fff"});
        }
    }).click(function(){
        $("li.tab_btn").css({"background":"#fff"}).removeClass("clicked");
        $(this).css({"background":"#ddd"}).addClass("clicked");
        type_name = $(this).text();
        type = $(this).attr("target");
        localStorage.setItem("bangumi_mosaic_type_name",type_name);
        localStorage.setItem("bangumi_mosaic_type",type);
        get_mosaic();
    });
    get_mosaic();
    function get_mosaic() {
        $.ajax({
            url : api_prefix + userid + "/timelines/" + type + ".svg",
            timeout : 3000,
            beforeSend : function() {
                $("div.mosaic_box").html('bangumi ' + type_name + '马赛克瓷砖</br><div>加载中...</div>');
            },
            success : function(){
                let parameter = "";
                if (get_new_mosaic) {
                    parameter = "?number=" + Math.random();
                }
                $("div.mosaic_box").html('bangumi ' + type_name + '马赛克瓷砖</br><a target="_blank" href="' + api_prefix + userid + '"><img src="' + api_prefix + userid + '/timelines/' + type + '.svg' + parameter + '" style="margin-top:10px; width:100%"></img></a>');
                get_new_mosaic = false;
            },
            error : function(){
                $("div.mosaic_box").html("该用户暂无马赛克瓷砖，请等待一段时间后再次查看");
            }
        });
    }
    function getjsonlength(json) {
        let length = 0;
        for(let item in json) {
            length++;
        }
        return length;
    }
})();