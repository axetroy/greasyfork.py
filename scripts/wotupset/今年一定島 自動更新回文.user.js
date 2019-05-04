// ==UserScript==
// @name         今年一定島 自動更新回文
// @namespace    https://greasyfork.org/zh-TW/scripts/39891
// @description  汲汲營營大報社
// @author       稻米
// @include      http://*.komica.org/00/*
// @include      https://*.komica.org/00/*
// @exclude      *.jpg
// @exclude      *.png
// @exclude      *.webm

// @version      2019.13.16.1515.build16299
// @grant        none
// ==/UserScript==

//jquery
try{
    var190106();
}
catch(err){
    console.log( ''+err.message );
}
finally {
    //console.log( 'try-catch-finally' );
}


function var190106(){
    $(document).ready(function() {
        //console.log( 'jquery ready' );
        //全域變數//global
        time=new Date();
        //console.log( time );
        //$.globalEval('gg=[];');
        //window.gg=[];
        window.gg={}; //globalVar
        gg.time=time;
        gg.timestamp=Date.parse(time); //time.getTime(); //Date.now()
        gg.cc=0;
        gg.newlogcc=0;
        gg.selfurl=window.location.href;
        gg.原標題=document.title;


        //console.log( gg );

        //console.log( tmp );
        //$.gginin='全域變數';
        //console.log( $.gginin );

        $( document ).ajaxStart(function(){ //啟動ajax時 執行這段 // AJAX 请求开始
            //console.log( 'ajaxStart' );
            if($('div.thread').length == 1){
                gg=chk_gg();//檢查gg是否存在 //ajax的異步問題
            }
        });
        $( document ).ajaxSend(function() { // AJAX 请求发送
            //console.log( gg );
            //console.log( "ajaxSend" );
            if(gg.selfres){ //有找到res參數才執行(回文模式)
                gg.cc=gg.cc + 1;
            }
        });
        //
        //$.gginin=gg;//jquery global variable
        //console.log( $.gginin );
        //$.gginin=gg;
        //
        //jQuery.fx.interval = 1000; //動畫更新間隔(毫秒) 預設=13//沒效果??
        //console.log( gg );
        //console.log( $.gginin );
        //
        //console.log( gg );//解析網址參數
        poi();
        xopowo();
    });
};//var190106


//
function xopowo(){
    if (typeof poi === "function"){
        //console.log( '這是function' );
    }
    if (typeof _expandThread === "function"){
        //console.log( '這是function' );
    }
}

//
//var tmp=$(function(){console.log('aaa1');}); //$(document).ready(function(){})
// iife
//var tmp=(function(){console.log('aaa2');})();

/*
http://ram.komica2.net/00/pixmicat.php?mode=module&load=mod_ajax&action=thread&html=true&op=11168423
http://www.homu-api.com/
http://www.homu-api.com/follow/10455981
http://homu.homu-api.com/res/10455438
http://homu.homu-api.com/page/0

*/



function poi(){
    //
    //gg=$.gginin;//jquery global variable
    //console.log(arguments.callee.name); //
    //

    if( window.location.href.match("\\?res=") ){
        if( $('div.thread').length == 1 ){
            //回應
            var url_p1 = new URL( gg.selfurl);
            var url_p2 = new URLSearchParams( url_p1.search ).get('res'); //.substr(1)
            gg.selfres=url_p2; //首篇編號
            //console.log( gg );
            var tmp='';
            tmp = gg;
            tmp = JSON.stringify( tmp );
            tmp = encodeURIComponent( tmp );
            tmp = btoa(tmp);

            //console.log(  tmp );
            if(window.localStorage){
                window.localStorage.poi="HTML5 Storage";
                window.sessionStorage.poi=tmp;
                //console.log(window.localStorage);
                //console.log(window.sessionStorage);
            }else{
                $(".thread").attr('poi',tmp);
            }
            //$.cookie('poi_cookie', tmp);

            //tmp = atob(tmp);
            //tmp = decodeURIComponent(tmp);
            //tmp = JSON.parse(tmp);


        }
    }else{
        //console.log('非回應');
    }
    //console.log( gg );//解析網址參數


    //
    if(gg.selfres){ //有找到res參數才執行(回文模式)
            animate01();
    }
    //poi_title();
}//poi()

function poi_title(x){
    //
    //gg=$.gginin;//jquery global variable
    //
    //console.log( gg.selfres,gg.newlogcc );//解析網址參數
    //非焦點視窗不會更新???
    if(gg.selfres){ //有找到res參數才執行(回文模式)
        if($('div.thread').length == 1){
            if(gg.newlogcc > 0){
                //gg.原標題='改變標題';
                document.title = '('+gg.newlogcc+')'+gg.原標題;
            }
        }
    }
}//poi_title()

function chk_gg(){
    //console.log(arguments.callee.name); //
    //console.log( '首篇編號='+gg.selfres );
    //檢查全域變數是否存在
    if(gg.selfres){
        //console.log( '有' );
    }else{
        //console.log( '無' );
        var tmp='';
        if(window.localStorage){
            tmp = window.sessionStorage.poi;
        }else{
            tmp = $(".thread").attr('poi');
            $(".thread").removeAttr('poi');
        }

        //tmp=$.cookie('poi_cookie');
        //console.log( tmp );

        tmp = atob(tmp);
        tmp = decodeURIComponent(tmp);
        tmp = JSON.parse(tmp);

        //console.log( tmp );
        gg=tmp;
        //console.log( '補上' );
    }
    //
    return gg;
}//chk_gg(){


function getapi(){
    //console.log(arguments.callee.name); //
    //console.log( '$='+$.gginin );
    //console.log( $.gginin );
    //gg=$.gginin;//jquery global variable
    try{
        var selfres = $('.post.threadpost').attr('data-no'); //首篇編號
        var apiurl='./pixmicat.php?mode=module&load=mod_ajax&action=thread&html=true&op='+selfres; //綜合版原生api
        //var apiurl='http://homu.homu-api.com/res/'+gg.selfres; //第三方api
        //console.log(apiurl);
        //jQuery 的ajax 就是返回一个promise 对象，里面含有done(), fail()方法；
        //var jqxhr=$.get(apiurl, function(x,y,z){});
        var jqxhr=$.ajax({ //用ajax獲取網址內容
            url:apiurl,
            timeout:2000,
        }, function(x,y,z){
            console.log('ajax');
        });

            //console.log('x',y,z);
        //jQuery has deprecated synchronous XMLHTTPRequest
        //var jqxhr=$.ajax({url:apiurl,async:false}, function(x,y,z){});

        //jqxhr.always();
        //發生錯誤後 再次嘗試
        jqxhr.fail(function(x,y,z){
            //console.log(x,y,z);
            console.log('失敗 10分鐘後重試');
            $("#poi180324inbox >poi").html('失敗 10分鐘後重試');
            setTimeout(function(){
                getapi();
            }, 600*1000);
        });
        //成功
        jqxhr.done(function(x,y,z){

            //
            //console.log(y,z);
            //$.gginin='全域變數';
            //console.log( '$$='+gg );
            //console.log( gg );
            json= x;
            json = $.parseJSON( x );//分析parse
            ////console.log(Object.keys(json.posts).length ,json ); //Object length
            //
            //updatelog();
            //console.log( json.posts );
            if(Object.keys(json.posts).length > 0){
                animate01();//頁面下方的動畫
                updatelog01(json);//更新留言
            }
        });
    }
    catch(err){
        console.log(err);
    }
    finally {
        //console.log( 'try-catch-finally' );
    }
    //

}

function updatelog01(x){
    //console.log(arguments.callee.name); //
    //input
    json=x;
    //
    //console.log(Object.keys(json.posts).length ,json ); //Object length
    var new_time = new Date();
    console.log( new_time , Object.keys(json.posts).length ); //在控制台顯示更新時間//Object length
    //
    //$(".thread").find('hr').before('<div>資料'+ gg.cc +'</div>');
    var allElements = document.querySelectorAll('.post');
    var origlog=[];//清空
    //網頁上的文章編號 集合起來
    $.each(allElements, function( index, value ) {
        origlog.push( $(value).attr('data-no') );
    });
    //console.log( gg.origlog );
    //
    //console.log( json ); //
    //console.log( json.posts ); //
    //console.log( Object.keys(json.posts).length ); //
    Array.from(json.posts).forEach((value, index) => {
        //console.log(value.no);
        var find_post_id=origlog.indexOf( value.no.toString()  ); // 2
        //console.log(find_post_id);
        if(find_post_id<0){
            //有新文章 //沒找到對應編號
            gg.newlogcc++; //計數
            //console.log( gg.newlogcc );
            console.log( '新文章='+value.no );
            //顯示新的回文
            $(".thread").find('hr').before(value.html);//before //after
            //var tmp = $.getScript("../common/js/script.js");
            //console.log( tmp );
            poi_title(gg.newlogcc); //改變標題
        }else{
            //沒有新文章
            //console.log( '有找到='+value.no );
        }
    });
}//updatelog01


//建立動畫的dom
function animate01(){
    if( $("#poi180324append").length > 0){
        //已存在
        //還原長度
        $("#poi180324inbox").css({
            "width":"600px",
        });
    }else{
        //不存在
        //建立元素
        div = $("<div>").html("180324append").attr({
            'id':'poi180324append',
            'class':'class_poi180324',
        });//
        //$(".thread").append(div);
        $(".thread").find('hr').before(div);//before //after
        //
        $("#poi180324append").html('');
        $("#poi180324append").before('<br clear="both">');
        $("#poi180324append").append('<div id="poi180324inbox"></div>');
        $("#poi180324inbox").html('<poi>自動更新回文</poi><span style="float: right;"></apsn>');

        //
        $("#poi180324append").css({
            "border":'5px solid #ff0000',
            "background-color":"#ffff00",//yellow
            "display":"block",
            //"height":"10px",
            "width":"600px",
        });//連結上背景色 不想上色就把這段刪除
        $("#poi180324inbox").css({
            //"border":'5px solid #ff0000',
            "background-color":"#ff0000",
            "white-space":"nowrap",
            "display":"block",
            //"height":"10px",
            "width":"600px",
        });//連結上背景色 不想上色就把這段刪除
    }//if
    //
    animate01b();
}

//
function animate01b(){
    //gg=$.gginin;
    //console.log( gg );
    //console.log( $.gginin );

    //setTimeout
    var f1=function(){
        var starttime=Date.now();
        var tmp='';
        var cc=0;
        var oneElement = document.querySelector('#poi180324inbox');
        var duration = 60; //動畫持續時間(秒)
        var progress = 0;
        var timer=function(){
            var tt=setTimeout(function(){
                cc++;
                //經過時間
                //window.performance.now() 網頁開啟的時間

                progress= ( (Date.now()-starttime) / 1000).toFixed(1); //Math.floor
                //document.title = progress; //Date.now();
                //console.log( cc, progress);

                tmp =600 - (progress / duration)*600; //600=寬度
                oneElement.style.width = tmp+'px';
                //
                if(progress > duration){
                    clearTimeout(tt);
                    getapi();//跑完動畫 再抓一次api
                }else{
                    timer();
                }

            }, 1*1000/5);
        };
        timer();
    };
    f1();//setTimeout
    //

    var f2=function(){
        var cc=0;
        var tmp='';
        $("#poi180324inbox").stop().animate({width:'1px'},{
            duration:60*1000, //動畫時間
            easing:'linear', //'linear'
            queue: false,
            complete:function(){
                //$(".pp3").prepend('CMPL1');
                //$FFF=$(".pp3").html().substr(0,100);
                //$(".pp3").html($FFF);
                //跑完動畫 再抓一次api
                getapi();
            },
            start:function(){
                //$(".pp3").prepend('START1');
            },
            step:function(now, fx ){
                //console.log( now, fx );
                cc++;
                //$("#poi180324inbox >span").html(cc);
            },
            progress: function(promise, remaining){
                //console.log( promise, remaining );
                var tmp = ((1-remaining) * 60).toFixed(1);
                //$("#poi180324inbox >span").html(tmp);
                //document.title = tmp;
            }
        });//animate
    };
    //f2();//jq animate

    var f3=function(){
        var start = window.performance.now();
        var duration = 60*1000; //動畫持續時間
        var interval = 1000/60; //動畫更新間隔 //fps
        var oneElement = document.querySelector('#poi180324inbox');
        //console.log( oneElement );
        //
        var progress = 0;
        var poipoi=function(timestamp){
            //console.log( timestamp ); //window.performance.now()
            //if(start === null){start = timestamp;}
            progress = timestamp - start;
            //progress++;
            //console.log( progress );
            var tmp='';
            //tmp=Math.floor((duration-progress)/1000);
            tmp=((duration-progress)/1000).toFixed(1);
            //$("#poi180324inbox >span").html(tmp);
            document.title = tmp;
            tmp =600 - (progress / duration)*600; //600=寬度
            oneElement.style.width = tmp+'px';
            if(progress < duration) {
                window.requestAnimationFrame(poipoi);
            }else{
                //跑完動畫 再抓一次api
                getapi();
            }
        };
        var requestID=window.requestAnimationFrame(poipoi);
        //console.log( requestID );
    };
    //f3();//requestAnimationFrame


/*
  $( "div:animated" ).toggleClass( "colored" );
  myDiv.clearQueue();
  myDiv.stop();
*/
}