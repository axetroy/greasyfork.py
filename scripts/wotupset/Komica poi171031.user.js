// ==UserScript==
// @name         Komica poi171031
// @name:zh      今年一定島 測試
// @namespace    https://greasyfork.org/zh-TW/scripts/34687
// @description  metadata description
// @description:zh 汲汲營營大報社
// @author       稻米
// @include      http://*.komica.org/00/*
// @include      https://*.komica.org/00/*
// @include      http://*.komica2.net/00/*
// @include      https://*.komica2.net/00/*
// @include      http://*.komica2.net/*/pixmicat.php?res=*
// @include      https://*.komica2.net/*/pixmicat.php?res=*
// @version      2019.01.27.0032.build16299
// @grant        none
// icon          https://a.pomf.cat/xfkmne.ico
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function(event) {
    console.log( 'DOMContentLoaded' );
});

window.addEventListener("load", function(event) {
    console.log("All resources finished loading!");
});


//= $(window).on("load",function(event){});


//jquery
try{
    $(document).ready(function() {
        console.log( 'jquery ready' );
        //全域變數//global
        time = new Date();
        gg=[];

        //gg.poi='123';
        //gg.poi.ypa='456';
        gg['poi']='123';
        gg.ypa='456';        //
        gg.time=time;
        $.gginin=gg;
        $.gginin.var181226=[];
        $.gginin.var181226.index=null;


        //console.log( $.gginin );
        //
        poi(); //
        poi2(); //
        poi3(); //頁數
        poi4();//卷軸
        //poi5();//$.get //function poi5(){}
        poi181226();
    });
    //throw "is empty";
}
catch(err){
    console.log( err );
    console.log( err.message );

    throw '錯誤';
}
finally{

}


(function($){

})(jQuery);


(function(){})();
function poi0(){}
function poi181226(){
    //console.log( $('.thread') );
    //console.log( $.gginin.var181226.index );
    var cc=$.gginin.var181226.index;
    var cc2=$('.thread').length -1;

    if( cc2 > 1 ){
        //
        $('.thread').each(function(index,element){
            //console.log( $(this).prop('offsetTop')  );//.offsetTop
        });
    }//if

    var str='';
    str=str+"<button id='btn181226a'>︽</button><br/>";
    str=str+"<button id='btn181226b'>︾</button><br/>";
    $("#poi171031box").append( ""+str );

    $('#btn181226a').on('click',function(){
        if(cc === null){
            console.log( 'null' );
            cc=0;
        }else{
            if(cc > 0){
                cc--;
            }else{
                cc=0;
            }
        }
        //console.log( cc,$('.thread').eq(cc).prop('offsetTop')  );//.offsetTop
        var FFF=$('.thread').eq(cc).prop('offsetTop');
        console.log( cc,FFF );//.offsetTop
        $(document).scrollTop(FFF);
    });
    //
    $('#btn181226b').on('click',function(){
        if(cc === null){
            console.log( 'null' );
            cc=0;
        }else{
            if( cc < cc2 ){
                cc++;
            }else{
                cc=cc2;
            }
        }
        //console.log( cc,$('.thread').eq(cc).prop('offsetTop')  );//.offsetTop
        var FFF=$('.thread').eq(cc).prop('offsetTop');
        console.log( cc,FFF );//.offsetTop
        $(document).scrollTop(FFF);
    });

}

function poi5(){

    $.get("https://httpbin.org/ip",null,function(a,b,c){
        //Type: Function( PlainObject data, String textStatus, jqXHR jqXHR )
        //console.log("$.get",a,b,c);
        var obj = JSON.parse( a );
        console.log( obj.origin );
        $("#poi171031box").append( "<div id='poi181116'>div</div>" );
        $("#poi181116").css({
            "position":"relative",
            "top":"5px",
            "left":"10px",
        });
        $("#poi181116").html("");
        $("#poi181116").append( "<div id='poi181116b'>div</div>" );
        $("#poi181116b").css({
            "position":"absolute",
            "pointer-events":"none",
        });
        $("#poi181116b").html( obj.origin );

    },"text");
}
function poi4(){
    var elm="<div id='poi181028'>div</div>";
    $("#poi171031box").append(elm);
    $("#poi181028").css({
        "border":"1px solid #000",
    });

    $(window).scroll(function () {
        var FFF1 = $(this).scrollTop();
        var FFF2 = $(document).height()-$(window).height();

        //console.log( FFF1,FFF2 );
        var FFF3 = (FFF1 / FFF2).toFixed(2);
        var FFF4 = Math.floor(FFF3 * 100);
        $("#poi181028").css({
            "width":FFF4+"%",
        });
        $("#poi181028").html( FFF4 );
        //$("#poi181028").html( "<div style='width:"+FFF4+"%';border:1px solid #000;'>"+FFF4+"</div>" );
        //style="width:50%;"

    });//scroll

}
function poi3(){
    var FFF;
    FFF=window.location.href;
    //console.log( window.location );
    FFF=window.location.pathname
    //console.log( FFF );
    switch(1){
        case 1:
            //console.log( "!!" );
            break;
        default:
            break;
    }

    var tmp,page=0;
    if(FFF.match("htm")){
        tmp=FFF.match("\/([0-9])+\.htm");
        if(tmp){
        //console.log( tmp );
        page=tmp[1];
        }
        tmp=FFF.match("\/(index)\.htm");
        if(tmp){
        //console.log( tmp );
        page=0;
        }
        //
        page='⚜️'+page;
        //console.log( page );
    }else{
        if( FFF.match("php") ){
            FFF=window.location.search;

            //console.log( "php" );
            //console.log( FFF );
            if(FFF.match("res")){
                FFF=window.location.search;
                //console.log( FFF );
                tmp=FFF.match("([0-9]+)");
                //console.log( tmp[1] );
                page='♈'+$('div.post').length;
                //console.log( page );


            }
            if(FFF.match("page_num")){
                //console.log( FFF );
                tmp=FFF.match("([0-9]+)");
                //console.log( tmp[1] );
                page=tmp[1];
            }

        }
    }
    page="<span id='poi180724'>"+page+"</span>";


    $("#poi171031box").append(page);
    $("#poi180724").css({
        "color":"red",
        "font-size":"100%",
    });//"background-color","yellow"



}
function poi2(){
    //$("div.thread").each(function(index, value){});
    //console.log( $('div.thread').length );
    if($('div.thread').length > 1){
        //console.log( document.title );
        //console.log( $(document).attr("title") );
        //console.log( $('html head').find('title').text() );
        gg.原標題=''+document.title;
        //console.log( gg.原標題 );
        document.title = gg.原標題 +'::首頁';

    }

}
function poi(){
    $("#threads").css({
        "border-style": "solid",
        "border-color": "green",
        "border-width": "1px",
    });//"background-color","yellow"

    div = $("<div>").html("prepend").attr({
        'id':'poi171031prepend',
        'class':'class_poi171031',
    });//{attribute:value, attribute:value ...}
    $("#threads").prepend(div);//#page_switch

    div = $("<div>").html("append").attr({
        'id':'poi171031append',
        'class':'class_poi171031',
    });//'id','poi171031append'
    $("#threads").append(div);

    //樣式
    $(".class_poi171031").css({
        "background-color":"yellow",
        "font-size":"150%",
        "border-style": "solid",
        "border-color": "red",
    });//"background-color","yellow"


    div = $("<div>").html("box").attr({
        'id':'poi171031box',
    });//{attribute:value, attribute:value ...}
    $("#page_switch").append(div);
    $("#poi171031box").css({
        "z-index":"10",
        "position":"fixed",
        "bottom":"40%",
        "left":"0px",
        "border":"1px solid #000",
    });//"background-color","yellow"
    var ary = []; // 空陣列
    ary[0]='';
    ary[1]='<a href="#poi171031prepend">▲頂端</a>';
    ary[2]='<a href="#poi171031append">▼底部</a>';

    $("#poi171031box").html(ary[1]+'<br/>'+ary[2]+'<br/>');
    //.append(), prepend(), .after() .before()
    var FFF='';
    FFF=time.getTime();
    FFF='./?'+FFF+'#header';
    FFF='<a href="'+FFF+'">🌼首頁</a>';
    ary[3]=FFF;
    $("#poi171031box").append(ary[3]+'<br/>');
    $("#poi171031prepend").html(ary[1]+ary[2]+ary[3]);
    $("#poi171031append").html(ary[1]+ary[2]+ary[3]);
    FFF='';
    FFF='';





}//function


function poi_old(){
    //var x=document.getElementById("page_switch");
    //var div = document.createElement("div");
    //div.innerHTML = "There is no spoon.";
    //div.id='poi171031';
    //x.appendChild(div);



}

/*
.fixed {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 200px;
  background-color: white;
}
*/