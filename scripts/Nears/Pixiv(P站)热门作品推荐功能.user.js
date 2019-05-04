// ==UserScript==
// @name         Pixiv(P站)热门作品推荐功能
// @namespace    http://tampermonkey.net/
// @version      2.82
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// @icon	 http://www.pixiv.net/favicon.ico
// @description  此插件用于移除跳转模块，让非会员用户直接点击热门推荐图片链接;UID和PID搜索功能及模拟按收藏人数搜索功能
// @author       Nears
// @include      *://www.pixiv.net/*
// @match        http://www.pixiv.net/
// @grant        none
// ==/UserScript==


(function(){
  $("div.popular-introduction-overlay").attr("id","vip_intro");
  $(".popular-introduction-overlay a").attr("href","#vip_intro");
  $(".popular-introduction-overlay a").remove();
  $("div.popular-introduction-overlay").remove();

 /* $(".popular-introduction-overlay").click(function(){
            $(".popular-introduction-overlay a").remove();
            alert("正在移除热门作品推荐屏蔽模块");
            $("div.popular-introduction-overlay").remove();
        });*/
})();

 function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if( r != null){return  unescape(r[2]);}else{ return null;}
 }

(function() {
   
    var search_w = $("#suggest-input").val();
    search_w = search_w.replace(/\s*\d+users入り/ig,"");
    $("#suggest-input").val(search_w);
    $("h1.column-title").text(search_w);
    var bm_Rang = [" 10000users入り"," 5000users入り"," 1000users入り"," 500users入り"," 300users入り"," 100users入り"," 50users入り"];
    



     /*$("div._premium-lead-tag-search-bar a").remove();
       $("<div class='clickable-area orange-back'><img src='https://source.pixiv.net/www/images/premium/lead/search_by_popularity.svg'><span class='words'>收藏人数搜索：</span><select style='width:118px;height:28px' id='vip_collect'><option value='7' selected='selected'>按收藏人数搜索</option></select></div>").appendTo("div._premium-lead-tag-search-bar");*/

     let prem = $("div._premium-lead-promotion-banner").length>0?$("div._premium-lead-promotion-banner")[0]:$("div._premium-lead-tag-search-bar")[0];
    prem.childNodes[0].remove();
    $('.clickable-area').remove();
    $("<div class='clickable-area orange-back'>"+
      "<img src='https://source.pixiv.net/www/images/premium/lead/search_by_popularity.svg'><span class='words'>收藏人数搜索：</span>"+
      "<select style='width:118px;height:28px' id='vip_collect'><option value='7' selected='selected'>按收藏人数搜索</option></select><br/>"+
      "<div style='padding-left:60px'><select style='width:50px;height:20px' id='se_type'><option value='1' selected='selected'>UID</option><option value='2' >PID</option></select>"+
      "<input id='uid_or_pid' type='text'><botton id='open_result' style='font-size: 18px;background-color:#ffffff;border: 1px solid #becad7;color: #5c6d99;vertical-align:middle;cursor:pointer'>打开</botton></div></div>")
      .appendTo(prem);


    $("#uid_or_pid").on('keyup',function(eve){
    eve.target.value =  eve.target.value.toString().replace(/[^\d]/g,"");
    })

    $("#open_result").click(function(){

     if($("#uid_or_pid").val() == ""){
        alert("Pid or uid is null!");
         return false;
     }

    if($("#se_type").val()== "1"){
      window.open("https://www.pixiv.net/member.php?id="+$("#uid_or_pid").val());
    }else{
      window.open('https://www.pixiv.net/member_illust.php?mode=medium&illust_id='+$("#uid_or_pid").val());
    }
    })

     for(var i = 6;i >= 0;i--){
          var option = $("<option>").val(i).text(bm_Rang[i].replace(/\s/ig,""));
            $("#vip_collect").append(option);
      }

     $('#vip_collect').change(function(){
        if(GetQueryString('scd') != null){
         search_w = search_w.replace(bm_Rang[$(this).val()],"");
         window.location.href = "https://www.pixiv.net/search.php?s_mode=s_tag&word=" + search_w+bm_Rang[$(this).val()]+"&scd="+GetQueryString('scd')+"&ecd="+GetQueryString('ecd');
        }else{
         search_w = search_w.replace(bm_Rang[$(this).val()],"");
         window.location.href = "https://www.pixiv.net/search.php?s_mode=s_tag&word=" + search_w+bm_Rang[$(this).val()];
        }
    });


   /* window.onload = function() {

    $("li.bookmark-range-container").remove();
    $("<select style='width:123px;height:33px' id='vip_collects'><option value='7' selected = 'selected'>按收藏人数搜索</option></select>").appendTo("nav._column-term-bookmark-menu>ul:first");
    for(var i = 6;i >= 0;i--){
          var option = $("<option>").val(i).text(bm_Rang[i].replace(/\s/ig,""));
            $("#vip_collects").append(option);
      }

    $("#vip_collect").remove();
    $("div.clickable-area.orange-back span").remove();
    $("<span class='words'>按收藏人数搜索下拉框已替换</span>").appendTo("div.clickable-area.orange-back");
    $("<span class='words'>按收藏人数搜索下拉框已替换</span>").appendTo("div.clickable-area.blue-back");



    $('#vip_collects').change(function(){
        if(GetQueryString('scd') != null){
         search_w = search_w.replace(bm_Rang[$(this).val()],"");
         window.location.href = "https://www.pixiv.net/search.php?s_mode=s_tag&word=" + search_w+bm_Rang[$(this).val()]+"&scd="+GetQueryString('scd')+"&ecd="+GetQueryString('ecd');
        }else{
         search_w = search_w.replace(bm_Rang[$(this).val()],"");
         window.location.href = "https://www.pixiv.net/search.php?s_mode=s_tag&word=" + search_w+bm_Rang[$(this).val()];
        }
    });
  };*/

        
  $("#suggest-list ul").remove();     
    
    
})();