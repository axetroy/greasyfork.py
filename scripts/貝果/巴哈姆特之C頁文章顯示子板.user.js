// ==UserScript==
// @name         巴哈姆特之C頁文章顯示子板
// @description  可以在C頁文章頁面確認子板，無須回到B頁文章列表查看，具板務身份者可以在C頁移動該文章的子板。
// @namespace    nathan60107
// @version      1.4
// @author       nathan60107(貝果)
// @contributor  moontai0724(我是月太 づ(・ω・)づ)
// @homepage     https://home.gamer.com.tw/homeindex.php?owner=nathan60107
// @include      https://forum.gamer.com.tw/C*
// ==/UserScript==

var mySubbsn, mySnA = document.body.outerHTML.match(/snA=(\d*)/)[1], myBsn = window.location.href.match(/bsn=(\d*)/)[1], mySn;
var displaySubbsn, author, title, bmTool, changeSubButton;
/*
function changeSubbsn(){//更改文章子板
    var args = 'bsn=' + myBsn + "&jsn[]=" + mySnA;
    window.open('move_article_sub.php?' + args,'_blank','width=480,height=480,location=no,menubar=no,scrollbars=yes');
}

function step4(){//如果是板務人員，顯示更改子板按鈕。
    if(document.body.outerHTML.match("<!-- 版主工具 -->")!=null){
        //displaySubbsn.onclick = changeSubbsn; //把按鈕設置在文字上（配合方案一）
        bmTool = document.getElementsByClassName("c-section__main managertools")[0];
        bmTool.innerHTML += '<button type="button" class="btn--sm btn--ghost bagelButton">修改子板</button>';
        changeSubButton = document.getElementsByClassName("btn--sm btn--ghost bagelButton")[0];
        changeSubButton.onclick = changeSubbsn;
    }
}*/

function step3(){//顯示子板
    //console.log("my subbsn="+mySubbsn+" =>"+subtitle(mySubbsn));

    //方案一：顯示在標題下方
    /*title = document.getElementsByClassName("c-post__header__title ")[0];
    author = document.getElementsByClassName("c-post__header__author")[0];
    title.outerHTML = '<h1 class="c-post__header__title " style="border-bottom:0pt;">'+title.innerHTML+'</h1>';
    jQuery('<div class="c-post__header__title " id="display_subbsn" style="line-height: 0em; margin-bottom: 12px; margin-top: -8px; margin-left: 8px; font-size: 15px;">《'+subtitle(mySubbsn)+'》</div>').insertBefore(author);
    displaySubbsn = document.getElementById("display_subbsn");
    */
    //方案二：顯示在標題前面
    title = document.getElementsByClassName("c-post__header__title ")[0];
    title.outerHTML = '<h1 class="c-post__header__title ">《'+subtitle(mySubbsn)+'》'+title.innerHTML+'</h1>';

    //step4();
}

function step2(){//取得子板資料
    if( typeof subtitle != 'undefined'){

        if(window.location.href.match(/C.php/)!=null){//C頁
            mySubbsn = document.head.innerHTML.match(/"subbsn" value="(\d*)"/)[1];
            step3();

        }else{//Co頁
            mySn = window.location.href.match(/&sn=(\d*)/)[1];
            jQuery.ajax({
                type: "GET",
                url: 'https://forum.gamer.com.tw/C.php?bsn='+myBsn+'&snA='+mySnA+'&sn='+mySn+'&locked=F',
                success: function (html) {
                    mySubbsn = html.match(/"subbsn" value="(\d*)"/)[1];
                    step3();
                },
                error: function (errMsg) {
                    console.error(errMsg);
                },
            });
        }
    }else{
        setTimeout(function(){step2();}, 500);
    }
}

(function step1(){//取得看板子板
    myBsn = Array(6-myBsn.length).join("0") +myBsn;//補零
    jQuery("head").append('<script src="https://i2.bahamut.com.tw/forum/subboard/'+myBsn+'.js">');
    step2();
})();
