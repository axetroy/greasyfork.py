// ==UserScript==
// @name B站(Bilibili)搜索页面已看视频标记
// @version 1.1.1
// @description 在B站搜索结果页面标记哪些视频是已经看过的，直观区分已看和未看的视频
// @author Truazusa
// @namespace BiliSearchViewed
// @match https://search.bilibili.com/*
// @grant none
// ==/UserScript==

var GM_addStyle = GM_addStyle || function(css) {
  var style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  document.getElementsByTagName("head")[0].appendChild(style);
};

// 增加自定义样式
GM_addStyle(".btnNotView{width:25px;text-align:center;display:inline-block;position:absolute;z-index:9999;margin-left:130px;border:2px solid #999;border-radius:4px;padding:3px 5px;background:#fff;color:#999;}.btnNotView:hover{background:#aaa;color:#fff;}");
GM_addStyle(".btnIsView{width:25px;text-align:center;display:inline-block;position:absolute;z-index:9999;margin-left:130px;background:rgba(255,255,255,0.5);border:2px solid #999;border-radius:4px;color:#999;padding:3px 5px;opacity:0.2;}.btnIsView:hover{background:rgba(255,255,255,1);opacity:1;}");

GM_addStyle(".btnRefresh{display:inline-block;position:absolute;z-index:9999;right:52px;top:17px;background:#fff;border:2px solid #999;border-radius:5px;color:#999;padding:1px 5px;}.btnList:hover{background:#aaa;color:#fff;}");
GM_addStyle(".btnList{display:inline-block;position:absolute;z-index:9999;right:97px;top:17px;background:#fff;border:2px solid #999;border-radius:5px;color:#999;padding:1px 5px;}.btnList:hover{background:#aaa;color:#fff;}");
GM_addStyle(".btnListSave{display:inline-block;position:absolute;z-index:9999;right:170px;top:17px;background:#fff;border:2px solid #999;border-radius:5px;color:#999;padding:1px 5px;display:none;}.btnListSave:hover{background:#aaa;color:#fff;}");

GM_addStyle(".viewList{width:100%;height:120px;display:none;}");


var isSetView = 0;
var timer = null;
var viewVideoList = null;
window.onload = function(){
  // 从缓存中读取已看视频列表
	if(localStorage.BiliViewed){
    viewVideoList = localStorage.BiliViewed;
	}else{
    viewVideoList = "start\n";
	}
  setSearchPage();
}

// 设置搜索页面
var setSearchPage = function(){
  setBtnView();
  
  $(".filter-wrap").append("<a class='btnList' title='显示/隐藏已看ID的数据列表，建议定期复制到其他地方进行保存，避免因事故造成丢失'>显示/隐藏</a>");
  $(".filter-wrap").append("<a class='btnRefresh' title='如果列表没出现已看/未看标识，请手动点击这个按钮进行刷新'>刷新</a>");
  $(".filter-wrap").append("<a class='btnListSave' title='如果文本框内容有修改，请点击这个按钮进行保存。'>保存列表</a>");
  $(".filter-wrap").append("<textarea class='viewList'></textarea>");
  
  $(".btnList").click(function(){
    $(".viewList").text(localStorage.BiliViewed);
    $(".viewList").toggle();
    $(".btnListSave").toggle();
  })
  
  $(".btnRefresh").click(function(){
    // 从缓存中读取已看视频列表
    if(localStorage.BiliViewed){
      viewVideoList = localStorage.BiliViewed;
    }else{
      viewVideoList = "start\n";
    }
    setBtnView();
  })
  
  $(".btnListSave").click(function(){
    localStorage.BiliViewed = $(".viewList").val();
    viewVideoList = $(".viewList").val();
    $(".viewList").toggle();
    $(".btnListSave").toggle();
  })
}

var setBtnView = function(){
  var videoArr = viewVideoList.split('\n');
  var isView = 0;
  $(".video").each(function(){
    // 获取av
    var av = $(this).find("a:eq(0)").attr("href");
    var avStartIndex = av.indexOf("/av");
    var avEndIndex = av.indexOf("?");
    var avId = av.substring(avStartIndex+3,avEndIndex);
    // 设置是否已看
    isView = 0;
    for(var i = 0 ; i < videoArr.length;i++){
      if(avId == videoArr[i]){
        // 已看
        isView = 1;
        break;
      }
    }
    if(isView == 1){
      // 已看
      $(this).prepend("<a class='btnView btnIsView' data-view='1' data-av='"+avId+"'>已看</a>");
      $(this).find(".lazy-img").css("opacity","0.1");
    }else{
      // 未看
      $(this).prepend("<a class='btnView btnNotView' data-view='0' data-av='"+avId+"'>未看</a>");
      $(this).find(".lazy-img").css("opacity","1");
    }

    $(this).find(".btnView").click(function(e){
      var avId = $(this).data("av");
      var view = $(this).data("view");
      if(view == 0){
        // 未看 -> 已看
        viewVideoList += avId+"\n";
        $(this).text("已看");
        $(this).removeClass("btnNotView");
        $(this).addClass("btnIsView");
        $(this).data("view","1");
        $(this).parent().find(".lazy-img").css("opacity","0.1");
      }else{
        // 已看 -> 未看
        viewVideoList = viewVideoList.replace(avId+"\n","");
        $(this).text("未看");
        $(this).removeClass("btnIsView");
        $(this).addClass("btnNotView");
        $(this).data("view","0");
        $(this).parent().find(".lazy-img").css("opacity","1");
      }
      localStorage.BiliViewed = viewVideoList;
      
    });
	});
  // 分页按钮响应
  $(".page-item").click(function(){
    isSetView = 0;
    timer = setInterval(resetBtnView,1000);
  })
  // 搜索按钮响应
  $(".search-button").click(function(){
    isSetView = 0;
    timer = setInterval(resetBtnView,1000);
  })
  // 回车监听响应
  $(document).keyup(function(event){
    if(event.keyCode ==13){
      isSetView = 0;
      timer = setInterval(resetBtnView,1000);
    }
  });
  isSetView = 1;
}

var resetBtnView = function(e){
  if(isSetView == 1){
    clearInterval(timer);
    timer = null;
  }else{
    setBtnView();
  }
}