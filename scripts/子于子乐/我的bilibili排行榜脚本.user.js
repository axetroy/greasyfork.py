// ==UserScript==
// @name         我的bilibili排行榜脚本
// @version      1.2
// @description  1、排行榜过滤已阅视频 2、封面图片显示原图
// @author       Zz_子于子乐
// @include      http://www.bilibili.com/ranking*
// @grant        none
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @namespace    https://greasyfork.org/users/9579
// ==/UserScript==
/////////////////////
///<<脚本初始化>>///
///////////////////
var MyRankZz = '<input id="MyRankButton" type="button" style="float:left;background:#00a1d6;color:#fff;border-radius:4px;padding:0 5px;height:20px;font-size:12px;margin-right:5px;cursor:pointer;" value="添加我的排行" />'
+ '<div style="float:left;background:#00a1d6;color:#fff;border-radius:4px;padding:0 5px;margin-top:1px;">'
+ '<input id="MyRankCheck" type="checkbox" style="float:left;line-height:20px;margin-left:5px;cursor:pointer;text-align:center;transition:0.2s all;" />'
+ '<label for="MyRankCheck" style="cursor:pointer;">我的排行过滤</label>'
+ '</div>';
$(MyRankZz).insertBefore("#rank_tips");	//在页面插入控件
var MyRankCheck = localStorage.getItem("MyRankCheck");	//获取过滤参数
if(MyRankCheck && MyRankCheck==1){
    $("#MyRankCheck").attr("checked",true); //设置选项
}
var d = new Date();
var dMon = d.getMonth() + 1;
if(!MyRankCheck && MyRanking!=0){
    localStorage.setItem("MyRankCheck",0);	//初始化参数
    localStorage.setItem("MyRanking"+dMon,"");	//初始化存储
    alert("排行榜脚本初始化成功！\n——bilibili排行榜脚本 by Zz");
    location.reload(); //刷新页面
}
var MyRanking = localStorage.getItem("MyRanking"+dMon);	//获取存储排行
if(!MyRanking && MyRanking!=""){
    localStorage.setItem("MyRanking"+dMon,"");	//添加新一月存储
    alert("又是新的一个月！——bilibili排行榜脚本");
}
///////////////////////////////
//==函数递归等待排行榜加载==//
/////////////////////////////
function loadStart(){
    if($(".dyn_list").html() == '<li class="rank-loading">loading...</li>'){
        //console.info("网速慢……只能等");
        setTimeout(function(){
            loadStart();
        },100);
    }else{
        imgShow();		//启动显示封面大图
        rankShow(0);	//启动排行比较过滤
    }
}
/////////////////////////
//==浮动显示封面大图==//
///////////////////////
function imgShow(){
    var imgItem = "<img style='z-index:10001;display:none;left:173px;top:10px;position:absolute' src=''></img>";
    $(imgItem).insertAfter(".preview img");
    $(".preview img").mousemove(function(){
        var theImage = new Image();
        theImage.src = $(this).attr("src");
        $(this).next().attr("src",$(this).attr("src"))
        .css("max-width",theImage.width)
        .css("height",theImage.height)
        .css("display","block");
        var scroll = (document.body.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop; //兼容Firefox
        var imgNum = parseInt((scroll - $('#rank_list').offset().top)/112);
        var imgX = $(this).offset().top - $(".preview:eq("+imgNum+") img").offset().top;
        if(imgX > 112*3-20 || imgX < 0){
            $(this).next().css("top",102-20-theImage.height); //当前图片定位为北则向上展示
        }else{
        	$(this).next().css("top",10);
        }
    });
    $(".preview img").mouseout(function(){
        $(this).next().css("display","none");
    });
}
///////////////////////////////
//==排行榜比较·过滤·添加==//
/////////////////////////////
function rankShow(a){
    var rankList = MyRanking.split("｜");	//存储排行分割后存放
    var rankItem = new Array(100);	//当前页面排行
    $("#rank_list .title").each(function(i){
        rankItem[i] = $(this).html();
    });
    //--开始循环比较页面排行与存储排行--//
    for(var n=0;n<100;n++){
        var unRead = 1;	//已阅否?
        for(var m=0;m<rankList.length;m++){
            if(rankItem[n] == rankList[m]){
                unRead = 0;	//已阅～
                if(MyRankCheck==1){
                    $("#rank_list li:eq("+n+")").slideUp(); //隐藏已阅
                }else{
                    $("#rank_list li:eq("+n+")").css("background","#eee");	//已阅视频过滤后变灰
                }
            }
        }
        if(unRead==1){
            if(a==0){
                $("#rank_list li:eq("+n+")").css("border","1px solid #66dd55");		//未阅视频过滤后加绿
            }else{
                MyRanking += "｜" + rankItem[n];	//添加未阅
                console.info(rankItem[n]);
            }
        }
    }
    if(a==1){
        localStorage.setItem("MyRanking"+dMon,MyRanking);
        alert("成功添加当前排行到已阅存储！——bilibili排行榜脚本");
        location.reload();
    }
}
//++点击我的排行过滤++//
$("#MyRankCheck").click(function(){
    if($("#MyRankCheck").is(":checked")){
        MyRankCheck = 1;
        localStorage.setItem("MyRankCheck",1); //存储过滤参数1
        rankShow(0); //点击比较显示排行
    }else{
        localStorage.setItem("MyRankCheck",0); //存储过滤参数0
        location.reload(); //还原直接刷新...偷个懒
    }
});
//++切换各个排行++//
$("#rank_range_tab li,#rank_catalogy_tab li,#rank_menu li").click(function(){
    setTimeout(function(){
        loadStart();
    },200);
});
//++点击添加我的排行++//
$("#MyRankButton").click(function(){
    rankShow(1);
});
/////////////////////
//<<脚本开始加载>>//
///////////////////
loadStart();

