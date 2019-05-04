// ==UserScript==
// @name         今年一定島 看大圖
// @namespace    https://greasyfork.org/zh-TW/scripts/39037
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
function poi(){
    //console.log(window.location.href);
    var tmp=window.location.href;
    tmp=tmp.match("\\?res=");
    //window.location.href.match("\\?res=")
    //console.log(tmp);
    if(tmp){
        if( $('div.thread').length == 1 ){
            poi2();
        }
    }else{
        //console.log('非回應');
    }
}
function poi2(){
    //console.log(arguments.callee.name); //poi2
    //$("#threads").before('before');
    $(".thread").before('<poi><button type="reset">看大圖</button></poi>');
    $("poi >button:contains('看大圖')").click(function(){
        //console.log('按鈕');
        poi3();
    });
    //

}//poi2(){

/*
height:auto; width:auto;
min-width:20px; min-height:20px;
max-width:250px; max-height:250px;

*/

function poi3(){
    $(".file-thumb").each(function(){
        var imgurl;
        imgurl='';
        imgurl='http:' + $(this).attr('href');////使用原圖網址
        imgurl='http://i0.wp.com/'+imgurl.substr(7);//cdn(測試)
        //console.log( $(this).offset().top );//元件位置
        if( /webm$/.test( imgurl ) ){
            //影片
        }else{
            $(this).find('img').attr('src',imgurl);
            $(this).find('img').attr('style','max-width:100%;');//display:block;
            $(this).find('img').after('<br clear=both>');

        }
    });

}



function poi3_old(){
    console.log('poi2');
    window.addEventListener("scroll", function(event){
        //console.log( '==offset==' );
        //console.log( $(window).width(),$(window).height() );//視窗可見大小
        //console.log( $(window).scrollLeft(),$(window).scrollTop() );//卷軸狀態

        //console.log( $(window).height() + $(window).scrollTop() );//

        $(".file-thumb").each(function(){
            imgurl='';
            imgurl='http:' + $(this).attr('href');////使用原圖網址
            imgurl='http://i0.wp.com/'+imgurl.substr(7);// http://
            //console.log( $(this).offset().top );//元件位置
            if( /webm$/.test( imgurl ) ){
                //影片
            }else{
                $(this).find('img').attr('src',imgurl);
                $(this).find('img').attr('style','max-width:100%;');
                if(   $(this).offset().top < ($(window).height() + $(window).scrollTop())  ){
                    //console.log( 'viewport' );
                    //console.log( imgurl );
                }
            }
        });
    });
}



/*
http://www.homu-api.com/
http://www.homu-api.com/follow/10455981
http://homu.homu-api.com/res/10455438
http://homu.homu-api.com/page/0
*/
