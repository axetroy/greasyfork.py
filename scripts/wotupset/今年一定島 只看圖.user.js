// ==UserScript==
// @name         今年一定島 只看圖
// @namespace    https://greasyfork.org/zh-TW/scripts/40400
// @description  汲汲營營大報社
// @author       稻米
// @include      http://*.komica.org/00/*
// @include      https://*.komica.org/00/*
// @include      http://*.komica2.net/00/*
// @include      https://*.komica2.net/00/*
// @include      http://*.komica2.net/*/pixmicat.php?res=*
// @include      https://*.komica2.net/*/pixmicat.php?res=*
// @version      2018.07.11.0001.build16299
// @grant        none
// ==/UserScript==

//jquery
try{
    $(document).ready(function() {
        //console.log(arguments.callee.name); //
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
////

function poi(){
    //console.log(arguments.callee.name); //
    //console.log(window.location.href);
    //console.log(tmp);
    if( window.location.href.match("\\?res=") ){
        //console.log('回應');
        if( $('div.thread').length == 1 ){
            poi2();
        }
    }else{
        //console.log('非回應');
    }
}//poi(){

function poi2(){
    //console.log(arguments.callee.name); //poi2
    //$("#threads").before('before');
    $(".thread").before('<poi><button type="reset">只看圖</button></poi>');
    $("poi >button:contains('只看圖')").click(function(){
        //console.log('按鈕');
        poi4();
    });
    //

}//poi2(){

function poi4(){
    var cc=0;

    $(".reply").each(function(x,y){
        //console.log(this);
        //console.log(x,y);
        //cc++; console.log(cc);
        //console.log( $(this).find('.file-text').length );
        //$(this).find('.file-text').css({"color": "red", "border": "2px solid red"});
        if(x >1){
            //return false; // 等於break
            //return; // 等於continue
        }
        if( $(this).find('.file-text').length > 0){
            //1 //有圖片
            $(this).css({
            });
        }else{
            //0 //沒圖片 //收合
            $(this).css({
                "color": "red",
                "border": "2px solid red",
                'display':'inline-block',
                'overflow': 'hidden',
                'margin':'0px',
                'padding':'0px',
                'width': '10px','height':'10px',
            });//bottom
                //'position': 'absolute',
                //'top':'0','left':'-200px',
            //top
            //$(this).after('0');
            //
            var tmp=0;
        }

    });

}//poi4()

function poi3(){
    var cc=0;

    $(".reply").each(function(x,y){
        //console.log(this);
        //console.log(x,y);
        //cc++; console.log(cc);
        //console.log( $(this).find('.file-text').length );
        //$(this).find('.file-text').css({"color": "red", "border": "2px solid red"});
        if(x >1){
            //return false; // 等於break
            //return; // 等於continue
        }
        if( $(this).find('.file-text').length > 0){
            //1 //有圖片
            $(this).css({
            });
        }else{
            //0 //沒圖片 //收合
            $(this).css({
                "color": "red",
                "border": "2px solid red",
                'display':'inline-block',
                'overflow': 'hidden',
                'margin':'0px',
                'padding':'0px',
            });
            //
            var tmp=0;
            $(this).animate({
                width:'5px',
                height:'5px',
            },{
                duration:1*1000, //動畫時間
                easing:'linear', //'linear'
                queue: false,
                complete:function(){
                    //console.log( $(this).attr('cc') );
                },
                start:function(Promise ){
                    if( ! $(this).attr('cc') ){
                        $(this).attr('cc',0);
                    }
                    //console.log(Promise.elem.id  );
                },
                step:function(now, fx ){
                    //fx=参与动画的元素
                    console.log(now, fx );
                    $(this).attr('cc', parseInt( $(this).attr('cc') )+1 );
                    //console.log( $(this).attr('cc') ,fx.prop );
                    //
                    if(fx.prop=="width"){
                        //console.log($(this).attr('cc'),fx.elem.id,fx.prop,now);
                        if( $(this).attr('cc') %10 == 1 ){
                            //console.log($(this).attr('cc'),fx.elem.id,fx.prop,now);
                            $(this).css({
                                'width':now+'px',
                            });
                        }
                    }

                    if(fx.prop=="height"){
                        //console.log($(this).attr('cc'),fx.elem.id,fx.prop,now);
                        if( $(this).attr('cc') %10 == 2 ){
                            //console.log($(this).attr('cc'),fx.elem.id,fx.prop,now);
                            $(this).css({
                                'height':now+'px',
                            });
                        }
                    }

                },
                progress: function(promise, remaining){
                    //console.log(promise, remaining);
                }

            });//animate
        }

    });

}//poi3()

/*
http://www.homu-api.com/
http://www.homu-api.com/follow/10455981
http://homu.homu-api.com/res/10455438
http://homu.homu-api.com/page/0
*/
