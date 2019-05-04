// ==UserScript==
// @name         豆瓣电影磁力猫资源搜索
// @namespace    http://css.thatwind.com/
// @version      1.4
// @description  在电影详情页右侧显示磁力猫资源搜索快捷链接
// @author       遍智
// @match        *://movie.douban.com/subject/*
// @match        *://www.cilimao.cc/search*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var IfMoviePageAuto=false;//值为'true'表示自动打开磁力猫电影百科页；'false'不自动打开（留在搜索页）。

    go(IfMoviePageAuto);

    function go(IfMoviePageAuto){

        if(document.querySelector(".aside")){

            //获取电影名称
            var alltitle=document.querySelector('title').innerHTML.split(" ");
            var title='';
            for(var i=0;i<alltitle.length;i++){
                if((alltitle[i]!=''&&alltitle[i]!='\n')&&i!=(alltitle.length-1)){
                    if(title!=''){title=title+' '+alltitle[i];}
                    else{title=alltitle[i];}
                }
            }

            //添加搜索卡片DIV
            var searchDiv=document.createElement('div');
            searchDiv.className="gray_ad";
            searchDiv.innerHTML="<img style='transform:translate(0,15%);margin:0 6px;' height='16px' src='https://using-1255852948.cos.ap-shanghai.myqcloud.com/cilimaologo.png'></alltitle.length;i++){><a target='_blank' href='https://www.cilimao.cc/search?word="+encodeURI(title)+"&page=1'>"+"在磁力猫搜索"+"</a>";
            var first=document.querySelector(".aside").firstChild;
            document.querySelector(".aside").insertBefore(searchDiv,first);
        }

        else if(document.querySelector('[href*="/baike/movie"]')){
            if(IfMoviePageAuto) document.querySelector('[href*="/baike/movie"]').click();
        }

        else{
            setTimeout("go(IfMoviePageAuto);",500);
        }
    }
})();