// ==UserScript==
// @name         今年一定島 書籤
// @namespace    https://greasyfork.org/zh-TW/scripts/36387
// @description  汲汲營營大報社
// @author       稻米
// @include      http://*.komica.org/00/*
// @include      https://*.komica.org/00/*
// @include      http://*.komica2.net/00/*
// @include      https://*.komica2.net/00/*
// @include      http://*.komica2.net/*/pixmicat.php?res=*
// @include      https://*.komica2.net/*/pixmicat.php?res=*
// @version      2018.07.11.0000.build16299
// @grant        none
// ==/UserScript==

//jquery
try{
    $(document).ready(function() {
        //console.log( 'jquery ready' );
        //全域變數//global
        time = new Date();
        gg=[];
        gg.time=time;
        $.gginin=gg;
        //gg.poi='123';
        //gg.poi.ypa='456';
        gg['poi']='123';
        gg.ypa='456';
        //console.log( gg );
        //document.cookie="poi001=poi001";//測試_建立cookie
        //console.log( document.cookie );
        //
        poi();
    });
    //throw "is empty";
}
catch(err){
    console.log( ''+err.message );
}
finally {
    //console.log( 'try-catch-finally' );
}

function poi(){//搜尋每個首篇
    //console.log(''+$("div.thread").length);
    //遍歷元素01
    $("div.thread").each(function(index, value){ // div.post-head
        //$(this).after('[01]'+cc1);
        //console.log(index);
        //console.log(value);
        //console.log($(this));
        //console.log($(this).attr("data-no"));
        //.first().parent();
        $(this).find("div.post-head").first().css( "background-color", "#ddd");
        var idno=$(this).attr("data-no");
        $(this).find("div.post-head").first().append('<span class="cls_poi171213" idno="'+idno+'"></span>');
        //$(this).prepend('prepend');
    });
    //
    ypa();
    //
}//function poi(){

function ypa(){//建立按鈕
    div = $("<div>").html("prepend").attr({
        'id':'id_poi171214_box01',
        'class':'class_poi171214_box01',
    });//{attribute:value, attribute:value ...}
    $("#threads").prepend(div);//#page_switch

    $(".class_poi171214_box01").html('');
    $(".class_poi171214_box01").append('<poi qwq="button">按鈕用的區塊</poi>');
    $(".class_poi171214_box01").append('<poi qwq="add">新增用的區塊</poi>');
    $(".class_poi171214_box01").append('<poi qwq="list">清單用的區塊</poi>');
    $(".class_poi171214_box01").css({
        "background-color":"rgba(255,255,0,0.5)",
        //"background-color":"yellow",
        "border": "1px solid blue",
        "display":"block",
        "width":"200",
        "height":"200",
        "position":"fixed",
        "top":"0",
        "left":"0",
        "overflow":"scroll",
    });
    $(".class_poi171214_box01").css({
        "display":"none",
    });


    $(".cls_poi171213").prepend('<button type="button">書籤</button>');
    $(".cls_poi171213 > button").on('click', function(event) {
        //console.log( $(this) );
        //console.log( event.originalEvent );
        var idno='';
        idno=$(this).parent().attr("idno");//.attr("data-no")
        //console.log( tmp );//.attr("data-no")
        if($(this).html() =='書籤'){//開啟左上角
            $(".class_poi171214_box01").css({
                "display":"block",
            });//"background-color","yellow"
            $(this).html('開啟中'+idno);
            //
            ouo(idno);//點擊書籤按鈕後的反應(自訂函式)
        }else{//關閉左上角
            $(".class_poi171214_box01").css({
                "display":"none",
            });//"background-color","yellow"
            $(this).html('書籤');
        }
    });

    //
}//function ypa(){

function ppp(){//
    $(".class_poi171214_box01 > poi[qwq=list]>span").css({
        "border-right":"10px solid red",
        "border-left":"10px solid red",
    });
    $("button[qwq=edit]").css({
        "background-color":"red",
    });
    $("span.cls_poi171216_2010 > button[qwq=del]").on('click', function() {
        var idno='';
        idno=$(this).parent().attr('idno');
        //console.log( idno );
        cookie_del(idno);
        $(this).html('(已刪除)');
        $(this).css({
            "background-color":"#FFF",
            "color":"#000",
            "font-weight":"bold",
        });
    });
    $(".class_poi171214_box01 > poi[qwq=list] > button[qwq=delall]").on('click', function(){
        document.cookie="poi001=";//清空cookie
        cookie_list();//列出cookie(自訂函式)
    });
}//function ppp(){//


function cookie_del(x){//
    var del_idno=x;
    //console.log( del_idno );
    var tmp='';
    var array_tmp = [];
    var cookie_time = fnc_cookie_time();
    //
    if(document.cookie !== ""){  //有coolkie執行這部份
        array_tmp=document.cookie.split(";");
        array_tmp.forEach(function(element,index){
            array_tmp[index]=array_tmp[index].trim();//去掉頭尾空白
            array_tmp[index]=array_tmp[index].split("=");
            if( /poi[0-9]+/.test( array_tmp[index][0] ) ){
                //if(array_tmp[index][0] == 'poi001'){}
                array_tmp[index][1]=array_tmp[index][1].split(",");//分解字串
                var i = array_tmp[index][1].indexOf(del_idno);//找出元素位置
                //console.log( array_tmp[index][1] );
                if(i==-1){//沒找到
                    //沒事
                }else{
                    //找到
                    array_tmp[index][1].splice(i,1);//移除陣列元素
                }
                //console.log( array_tmp[index][1] );
                array_tmp[index][1]=array_tmp[index][1].join();//組合字串//預設用逗號分隔
                tmp=array_tmp[index][1];
            }//if
        });//foreach
        document.cookie = "poi001="+tmp+cookie_time.addtime;//寫入新的cookie
    }//if
}//function cookie_del(){//

function ouo(x){//產生cookie
    var idno=x;//傳入的id編號
    var tmp='';
    //開啟左上角時 重新取得清單
    cookie_list();//列出cookie(自訂函式)
    //
    $(".class_poi171214_box01 > poi").css({
        "display":"block",
        "border": "1px solid blue",
        //"background-color":"#ddd",
    });//"background-color","yellow"

    //建立新增區的按鈕
    $(".class_poi171214_box01 > poi[qwq=add]").html('');
    $(".class_poi171214_box01 > poi[qwq=add]").append('<button type="button" qwq="add" idno="'+idno+'">新增'+idno+'</button>');
    //點擊新增按鈕的反應
    $(".class_poi171214_box01 >poi> button[qwq=add]").on('click', function() {
        //console.log( $(this).attr('idno') );
        //$(this).attr("disabled", true);
        //$(this).html('done');
        cookie_add( $(this).attr('idno') );//新增cookie
        cookie_list();//列出cookie(自訂函式)//更新清單
        //
        //$("button[qwq=edit]").css({"background-color":"",});
        //$("button[qwq=edit]").html('編輯');
        //延遲1秒後 出現new字串提醒
        //console.log( $(this) );//$(".class_poi171214_box01 >poi> button[qwq=add]")
        $(this).clearQueue();
        $(this).delay(1000).queue(function(){//延遲1秒後 執行隊列
            tmp=$(".class_poi171214_box01 > poi[qwq=list] >span.cls_poi171216_2010:contains('"+idno+"')").append('<span style="vertical-align:super;">new</span>');
            //console.log( tmp );
            $(this).dequeue();//清除隊列
        });//delay
    });
    //
       //console.log( $("poi[qwq=button]") );
    //console.log( $(".class_poi171214_box01") );
    //console.log( $(".class_poi171214_box01").find("poi[qwq=button]") );
    //建立按鈕區的按鈕
    $(".class_poi171214_box01").find("poi[qwq=button]").html('');
    $(".class_poi171214_box01").find("poi[qwq=button]").append('<button type="button" qwq="close">收合</button>');
    $(".class_poi171214_box01").find("poi[qwq=button]").append('<button type="button" qwq="edit">編輯</button>');
    //點擊收合按鈕的反應
    $(".class_poi171214_box01 >poi> button[qwq=close]").on('click', function() {
        //console.log( $(this).parent() );
        $(this).parent().parent().css({
            "display":"none",
        });//"background-color","yellow"
    });
    //點擊編輯按鈕的反應
    $(".class_poi171214_box01 >poi> button[qwq=edit]").on('click', function() {
        cookie_list();//列出cookie(自訂函式)
        if( $("button[qwq=edit]").css('background-color') == "rgb(255, 0, 0)" ){
            //正常模式
            $("button[qwq=edit]").css({
                "background-color":"",
            });
            $(this).html('編輯');
        }else{
            //編輯模式
            //$(".class_poi171214_box01 >poi> button[qwq=add]").clearQueue();
            $(".class_poi171214_box01 > poi[qwq=list] > span.cls_poi171216_2010").append('<button type="button" qwq="del">刪除</button>');
            $(".class_poi171214_box01 > poi[qwq=list]").append('<button type="button" qwq="delall">全部刪除</button>');
            $(this).html('返回');
            ppp();
        }
    });


}//function ouo(){

function fnc_cookie_time(){//
    var day7 = 3600*24*7;//7天的秒數
    //
    today = new Date();
    today.setTime(today.getTime()-1000*60);	// 刪除用的過期時間
    var deltime=";expires="+ today.toUTCString(); // 刪除用的過期時間
    //console.log( deltime );
    today = new Date();
    today.setTime(today.getTime()+1000*day7);	// 新增用的時間
    var addtime=";expires="+ today.toUTCString(); // 新增用的時間
    //console.log( addtime );
    today = new Date();
    //console.log( today );
    //console.log( today.toISOString() );
    //console.log( today.toUTCString() );
    //console.log( today.toLocaleString() ); //2017/12/16 上午6:11:21
    var array_tmp = [
        today.getFullYear(),
        today.getMonth()+1,
        today.getDate(),
        today.getHours(),
        today.getMinutes(),
        today.getSeconds(),
        today.getTime(),//時間戳
    ];
    //console.log( array_tmp );
    array_tmp.forEach(function(element,index) {
        array_tmp[index]=element.toString();
        //console.log( index );
        //console.log( element );
        //console.log( element.toString().length );
        if(0<element && element<10){
            array_tmp[index]='0'+array_tmp[index];
        }
        //str.substring(3,7);
        //str.slice(-4,2);
    });
    //console.log( array_tmp ); //["2017", "12", "16", "06", "11", "21", "1513375881786"]
    //console.log("可讀時間: "+array_tmp[0]+"/"+array_tmp[1]+"/"+array_tmp[2]+" "+array_tmp[3]+":"+array_tmp[4]+":"+array_tmp[5]+"");
    //
    //this.deltime=deltime;
    //this.addtime=addtime;
    //
    x=[];
    x.deltime=deltime;
    x.addtime=addtime;
    return x;
}//function cookie_time(){//

function cookie_list(){//
    //console.log( '[]'+document.cookie );
    if(document.cookie !== ""){  //有coolkie執行這部份
        $(".class_poi171214_box01 > poi[qwq=list]").html('');
        var cc=0;
        var array_tmp = [];
        var array_tmp2 = [];
        array_tmp = document.cookie.split(";");
        array_tmp.forEach(function(element,index) {
            array_tmp[index]=array_tmp[index].trim();//去掉頭尾空白
            array_tmp[index]=array_tmp[index].split("=");
            if( /poi[0-9]+/.test( array_tmp[index][0] ) ){
                if(array_tmp[index][0] == 'poi001'){
                    if(array_tmp[index][1] === ''){
                        //
                    }else{
                        cc++;
                        array_tmp[index][1]=array_tmp[index][1].split(",");
                        array_tmp[index][1].forEach(function(element,index){
                            //if(element == 999 ){return;}//
                            $(".class_poi171214_box01 > poi[qwq=list]").append('<span class="cls_poi171216_2010" idno="'+element+'"><a href="./pixmicat.php?res='+element+'" target="_blank">'+element+'</a></span>');
                            //console.log( element );
                        });
                    }
                }//if-poi001
            }//if
        });//foreach
        if(cc>0){
            //沒事
        }else{
            $(".class_poi171214_box01 > poi[qwq=list]").append('沒有紀錄');
        }
        //繪製
        $(".cls_poi171216_2010").css({
            "display":"block",
            "border": "1px solid #999999",
        });//"background-color","yellow"        //
    }else{
        $(".class_poi171214_box01 > poi[qwq=list]").html('沒有cookie');
    }
}//function cookie_list(){//
function cookie_add(x){//
    var idno=x;//傳入的id編號
    //
    //事先處理過的時間字串
    //var cookie_time = new fnc_cookie_time(); //this
    //console.log( cookie_time.addtime );
    var cookie_time = fnc_cookie_time();
    //console.log( fnc_cookie_time().addtime );
    //console.log( cookie_time.addtime );
    //
    //document.cookie="poi123=0123456789"+cookie_time.addtime;//測試_建立cookie
    document.cookie="poi000=poi";//測試_建立cookie
    if(document.cookie !== ""){  //有coolkie執行這部份
        console.log( document.cookie );
        document.cookie = "poi000=000"+cookie_time.deltime;//測試_刪除cookie
        //cookie清單
        var tmp = '';
        var array_tmp = [];
        var array_tmp2 = [];
        array_tmp = document.cookie.split(";");
        for(i=0;i<array_tmp.length; i++) {
            array_tmp[i]=array_tmp[i].trim();//去掉頭尾空白
            //console.log( array_tmp[i] );
            array_tmp[i] = array_tmp[i].split("=");
            //console.log( array_tmp[i][0] );
            //console.log( array_tmp[i][0].search(/poi[0-9]+/) ); //找到=大於等於0 沒找到=-1
            //console.log( array_tmp[i][0].match(/poi[0-9]+/) ); //找到=回傳陣列 沒找到=null
            //console.log( /poi[0-9]+/.test( array_tmp[i][0] ) ); //找到=true 沒找到=false
            //if( array_tmp[i][0].search(/poi[0-9]+/) >=0 ){
            //if( array_tmp[i][0].match(/poi[0-9]+/)  ){
            if( /poi[0-9]+/.test( array_tmp[i][0] ) ){
                //console.log( '找到'+array_tmp[i][0] );
                //console.log( array_tmp[i][0]+'/'+array_tmp[i][1] );
                if(array_tmp[i][0] == 'poi001'){
                    //console.log( '找到'+array_tmp[i][0] );
                    array_tmp[i][1]=array_tmp[i][1].split(",");
                    //console.log( array_tmp[i][1] );
                    array_tmp[i][1].sort();//排序
                    //console.log( array_tmp[i][1] );
                    if( array_tmp[i][1].includes(idno) ){
                        $(".class_poi171214_box01 >poi> button[qwq=add]").html('已存在');
                        //console.log( '已存在' );
                    }else{
                        array_tmp[i][1].push(idno);//加入資料
                        $(".class_poi171214_box01 >poi> button[qwq=add]").html('已加入');
                        //console.log( '已加入' );
                    }
                    //console.log( array_tmp[i][1] );
                    array_tmp[i][1].reverse();//反轉排序
                    array_tmp[i][1]=array_unique(array_tmp[i][1]);//刪除重複的資料(自訂函式)
                    array_tmp[i][1]=array_tmp[i][1].join();//合併成字串 預設用逗號分隔
                    //console.log( array_tmp[i][1] );
                    tmp=array_tmp[i][1];
                }
            }
        }//for
        //console.log( tmp );
        //沒找到poi001就直接新增
        if(tmp===''){tmp=idno;}
        //console.log( cookie_time.addtime );
        document.cookie = "poi001="+tmp+cookie_time.addtime;//寫入新的cookie
        //更新清單
    }

}//function cookie_time(){//

function array_unique(x){//
    var array_tmp=x;//傳入的陣列
    var array_tmp2=[];
    //有超過一個cookie才比對
    if(array_tmp.length>1){//if
        array_tmp.forEach(function(element,index){
            //只允許數字內容
            if( /[0-9]+/.test( element ) ){
                if(array_tmp2.includes(element)){//沒重複才加入
                    //沒事
                }else{
                    if( /[0-9]+/.test( array_tmp[i][0] ) ){//只允許全數字
                        array_tmp2.push(element);//加入資料
                    }
                }
            }
        });//forEach
    }else{
        array_tmp2=array_tmp;
    }
    //array_tmp.push('999');
    //
    x=array_tmp2;
    return x;
}