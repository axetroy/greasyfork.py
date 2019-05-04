// ==UserScript==
// @name         今年一定島 追蹤
// @namespace    https://greasyfork.org/zh-TW/scripts/36279
// @description  汲汲營營大報社
// @author       稻米
// @include      http://*.komica2.net/00/*
// @include      https://*.komica2.net/00/*
// @include      http://*.komica2.net/*/pixmicat.php?res=*
// @include      https://*.komica2.net/*/pixmicat.php?res=*
// @version      2017.12.13.0011.build16299
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
    $("div.thread").each(function(index, value){ // div.post-head
        //$(this).find("span.qlink").first().css( "background-color", "#ddd");
        var idno=$(this).attr("data-no");
        $(this).find("span.qlink").first().after('<span class="cls_qlink_171213"><a href="http://www.homu-api.com/follow/'+idno+'" target="_blank">追蹤</a></span>');

        $(".cls_qlink_171213").css({
            "background-color":"yellow",
            "border":"1px solid #000",
        });//連結上背景色 不想上色就把這段刪除
    });
    //
}//function poi(){

/*
http://www.homu-api.com/
http://www.homu-api.com/follow/10455981
http://homu.homu-api.com/res/10455438
http://homu.homu-api.com/page/0
*/
