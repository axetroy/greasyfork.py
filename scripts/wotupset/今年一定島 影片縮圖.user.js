// ==UserScript==
// @name         今年一定島 影片縮圖
// @namespace    https://greasyfork.org/zh-TW/scripts/39842
// @description  汲汲營營大報社
// @author       稻米
// @include      http://*.komica.org/00/*
// @include      https://*.komica.org/00/*
// @include      http://*.komica2.net/00/*
// @include      https://*.komica2.net/00/*
// @include      http://*.komica2.net/*/pixmicat.php?res=*
// @include      https://*.komica2.net/*/pixmicat.php?res=*
// @version      2019.02.16.0001.build16299
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
        color();
    });
    //throw "is empty";
}
catch(err){
    console.log( ''+err.message );
}
finally {
    //console.log( 'try-catch-finally' );
}

function color(){
    $(".-expand-youtube").css({
        "background-color":"yellow",
        "border":"1px solid #000",
    });//連結上背景色 不想上色就把這段刪除
    $(".poi180324").css({
        "border":"5px solid #00ff00",
        "white-space":"nowrap",
    });//連結上背景色 不想上色就把這段刪除

}
function poi(){

    $("span.-expand-youtube").each(function(index, value){ // div.post-head
        //console.log(index, $(value).parent().prev().text() );//.next();.prev();.siblings();
        //var url_p = new URLSearchParams( $(value).parent().prev().text() );
        var url_p1 = new URL( $(value).parent().prev().text() );
        //console.log( url_p1 );//解析網址參數
        var tmp='';

        switch(url_p1.hostname) {
            case 'youtube.com': //長網址的參數
            case 'www.youtube.com': //長網址的參數
            case 'm.youtube.com': //長網址的參數
                tmp=url_p1.search;//.substr(1)
                var url_p2 = new URLSearchParams( tmp );
                tmp=url_p2.get('v');
                break;
            case 'youtu.be': //短網址的參數
                tmp=url_p1.pathname.substr(1);
                break;
            default:
                //console.log('switch default');//取得的video id
                break;
        }
        //console.log( tmp );//取得的video id


        if(0){
            console.log( tmp );
            console.log( typeof tmp );
            console.log( void(0) );//產生undefined
            console.log( $.isEmptyObject(tmp) );//检查一个对象是否为空对象。
            console.log( $.isPlainObject(tmp) );//检查一个对象是否为纯粹对象。
        }
        //console.log( tmp );//解析網址參數
        //if(tmp == null){console.log( 'null.01' );}
        //if(tmp === null){console.log( 'null.02' );}

        if( tmp ){
            //console.log( tmp );//取得網址參數
            //tmp='http://img.youtube.com/vi/'+tmp+'/sddefault.jpg';//.substr(1)
            //console.log( tmp );//取得影片縮圖

            var html='';
            var vid=tmp;
            //tmp='http://img.youtube.com/vi/'+vid+'/sddefault.jpg';//.substr(1)
            //html=html+'<img src="'+tmp+'" width="200px" height="200px">';

            tmp='http://img.youtube.com/vi/'+vid+'/default.jpg';//.substr(1) //0.jpg
            html=html+'<img src="'+tmp+'"> ';
            tmp='http://img.youtube.com/vi/'+vid+'/1.jpg';//.substr(1)
            html=html+'<img src="'+tmp+'"> ';
            tmp='http://img.youtube.com/vi/'+vid+'/2.jpg';//.substr(1)
            html=html+'<img src="'+tmp+'"> ';
            tmp='http://img.youtube.com/vi/'+vid+'/3.jpg';//.substr(1)
            html=html+'<img src="'+tmp+'"> ';

            html='<br/><span class="poi180324">'+html+'</span>';
            $(value).parent().after(html);
            //console.log(url_p2.get('v') );

        }





    });
    //
}//function poi(){

/*
http://www.homu-api.com/
http://www.homu-api.com/follow/10455981
http://homu.homu-api.com/res/10455438
http://homu.homu-api.com/page/0
*/
