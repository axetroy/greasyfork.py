// ==UserScript==
// @name         今年一定島 以圖搜圖
// @namespace    https://greasyfork.org/zh-TW/scripts/37238
// @description  metadata description
// @description:zh  汲汲營營大報社
// @author       稻米
// @include      http://sora.komica.org/00/*
// @include      https://sora.komica.org/00/*
// @version      2019.04.18.0502.build16299
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
        ypa();
        color();
    });
    //throw "is empty";
}
catch(err){}
finally{}



function ypa(){
    var tmp='';
    var imgurl='';

    $(".file-text").each(function(){
        imgurl='';
        imgurl='http:' + $(this).find('a').attr('href');////使用原圖網址
        //imgurl='http:' + $(this).parent().find('.file-thumb img').attr('src');//使用縮圖網址
        //console.log( tmp );
        //console.log( $(this).parent().find('.file-thumb img').attr('src') );
        tmp='';
        if( /webm$/.test( imgurl ) ){
            //console.log( '影片' );
            tmp=tmp+' 🎨影片';
        }else{
            //console.log( '不是影片' );
            tmp=tmp+' <a href="https://iqdb.org/?url=' + imgurl + '" target="_blank">[iqdb]</a>';
            tmp=tmp+' <a href="https://saucenao.com/search.php?url=' + imgurl + '" target="_blank">[saucenao]</a>';
            tmp=tmp+' <a href="https://www.google.com/searchbyimage?image_url=' + imgurl + '" target="_blank">[google]</a>';
            tmp=tmp+' <a href="https://ascii2d.net/search/url/' + imgurl + '" target="_blank">[ascii2d]</a>';
            tmp=tmp+' <a href="https://yandex.com/images/search?source=collections&rpt=imageview&url=' + imgurl + '" target="_blank">[yandex]</a>';
            tmp=tmp+' <a href="https://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi&imgurl=' + imgurl + '" target="_blank">[bing]</a>';
            tmp=tmp+' ';
            tmp=tmp+' <a href="https://trace.moe/?url=' + imgurl + '" target="_blank">[trace.moe]</a>';
        }
        //每個圖片 //加上查圖連結
        $(this).append('<div class="cls190216">'+tmp+'</div>');
    });

}
function color(){
    //console.log( 'color' );
    $('.cls190216').css({
        'display':'inline',
        "background-color":"rgb(200,255,255)",
        "border":"1px solid #FFF",
    });//連結上背景色 不想上色就把這段刪除


}//function color(){

