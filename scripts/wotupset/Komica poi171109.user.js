// ==UserScript==
// @name         Komica poi171109
// @name:zh      今年一定島 查ID
// @namespace    https://greasyfork.org/en/scripts/34953-komica-poi171109
// @description  metadata description
// @description:zh  汲汲營營大報社
// @author       稻米
// @include      http://*.komica2.net/00/*
// @include      https://*.komica2.net/00/*
// @include      http://*.komica2.net/*/pixmicat.php?res=*
// @include      https://*.komica2.net/*/pixmicat.php?res=*
// @version      2018.05.30.0003.build16299
// @grant        none
// ==/UserScript==




//jquery
try{
    $(document).ready(function() {
        //console.log( 'jquery ready' );
        //全域變數//global
        time = new Date();
        gg=[];
        //
        poi();
        //監聽();//測試
        //ppp();//太麻煩了不使用 //在首頁展開文章後的處理
    });
    //throw "is empty";
}
catch(err){
    console.log( ''+err.message );
}
finally {
    //console.log( 'try-catch-finally' );
}

function ppp(){
    var cc=0;
    gg[0]='';
    $(".warn_txt2_").parent().parent().css({
        "border":"2px solid blue",
    });//"background-color":"yellow",

    $(document).find(".poi180218").css({
        "background-color":"yellow",
        "border":"1px solid #000",
    });//"background-color":"yellow",


    $(document).on('click',".-expand-thread",function(){//點擊 //text-button
        //console.log('click');
        //console.log(this);
        //console.log($(this));
        $(".-expand-thread").parent().parent().parent().on('DOMSubtreeModified', function(){ //".warn_txt2"
            //console.log('DOMSubtreeModified');
            //console.log(this);
            //console.log($(this));

            //console.log( $(this).find(".warn_txt2")  );
            //console.log( $(this).children('.threadpost').children('.warn_txt2').children('.text-button').text() );//text() html() attr('class')
            cc++;
            var FFF='';
            FFF=$(this).children('.threadpost').children('.warn_txt2').children('.text-button').text();
            //console.log(FFF);

            //
            if(FFF != gg[0]  && 0){ //if
                //console.log(FFF+'?if');
                //console.log(FFF.indexOf("收合")+'?indexOf');
                //console.log(FFF.search("收合")+'?search');
                if(FFF.search("收合") > -1  ){ //if#2

                    //console.log(FFF+'?if#2');

                    $(this).clearQueue();
                    $(this).delay(1000).queue(function(){ //延遲
                        //console.log('delay');
                        //console.log( $(this).children('.thread').html() );
                        //console.log(this);
                        //console.log($(this));
                        $(this).find(".id_poi171109").remove();
                        $(this).find(".id").css({
                        });//"background-color":"red",
                        //
                        $(this).find(".id").each(function(){
                            FFF=$(this).html().substr(3,8);
                            //FFF='<a href="https://komica-cache.appspot.com/?search=ID&q='+FFF+'" target="_blank">查詢ID</a>';
                            FFF='<a href="https://www.homu-api.com/search?id='+FFF+'" target="_blank">查詢ID</a>';
                            FFF='<span class="id_poi171109">'+FFF+'</span>';
                            $(this).after(''+FFF);
                        });
                        $(".id_poi171109").css({
                            "background-color":"yellow",
                            "border":"1px solid #000",
                        });//連結上背景色 不想上色就把這段刪除

                        //完成後的處理
                        console.log('done');
                        $(this).dequeue();//關閉隊列
                        $(this).off('DOMSubtreeModified');//關閉監聽
                    });//延遲
                }//if#2
            }//if

            gg[0]=FFF;
        });//DOMSubtreeModified


    });

}//function ppp()

function 監聽(){
    //測試區
    //console.log('test');
    //監視點擊事件
    //$(".warn_txt2").children(".text-button").on('click',function(){
    $(document).on('click',".text-button",function(){
        //console.log('click .text-button');
    });
    $(document).on('click',".-collapse-thread",function(){
        //console.log('click .-collapse-thread');
    });
    $(document).on('click',".-expand-thread",function(){
        //console.log('click .-expand-thread');
        //console.log(this);
        延遲();
    });

}//function 監聽()

function 延遲(){
    $(this).delay(1000).queue(function(){//延遲1秒後 執行隊列
        //console.log('delay1000');
        //console.log( $(this) );//window
        $(this).dequeue();//清除隊列
    });//delay
}//function 延遲()


function poi(){
    var FFF='';
    //FFF=$(".id").html();
    $(".id").each(function(){
        FFF=$(this).html().substr(3,8);
        //FFF='<a href="https://komica-cache.appspot.com/?search=ID&q='+FFF+'" target="_blank">查詢ID</a>';
        FFF='<a href="https://www.homu-api.com/search?id='+FFF+'" target="_blank">查詢ID</a>';
        FFF='<span class="id_poi171109">'+FFF+'</span>';
        $(this).after(''+FFF);
    });

    //console.log( ''+FFF );
    $(".id_poi171109").css({
        "background-color":"yellow",
        "border":"1px solid #000",
    });//連結上背景色 不想上色就把這段刪除



    //

}//function poi2(){

