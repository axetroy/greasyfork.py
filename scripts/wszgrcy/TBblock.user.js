// ==UserScript==
// @name         TBblock
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  淘宝客杀手beta0.1版本
// @author       You
// @match        http://bbs.mydigit.cn/thread.php?fid=73*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    main();
    // Your code here...
})();
function main() {
    var fatherList=document.querySelector("#threadlist");
    var strList=fatherList.querySelectorAll("tr td.subject a[name=readlink]");
    var authorList=fatherList.querySelectorAll("tr td.author a");
    var trList=fatherList.querySelectorAll("tr");
    console.log("总共"+strList.length);
    var searchObj={
        name:"",//搜索用
        node:""
    };
    var nameObj={
        name:"",//搜索用
        node:""
    };
    for (var i=0;i<strList.length;i++)
    {
        searchObj.name=strList[i].innerHTML;
        searchObj.node=trList[i];
        nameObj.name=authorList[i].innerHTML;
        console.log(nameObj.name);
        nameObj.node=trList[i];
        univeralSearch(searchObj);//搜索标题的
        univeralSearchAuthor(nameObj);//搜索标题的
        //搜索用户名的~暂时
    }
}

function univeralChangeStrBgColor(mark,link)
/*mark:位置,颜色,链接*/
{
    if (mark.num==999)
    { link.style.backgroundColor = mark.color;}
    else{
        link.childNodes[mark.num].style.backgroundColor = mark.color;
    }
}
function univeralthrun(name4seek,obj,mark,fexe)
/*搜索namelist列表中的某一个字符串,搜索到后执行指定函数
* 通用多线程搜索
*/
{
    var name=obj.name;
    var link=obj.node;
    setTimeout(function () {
        if (name.indexOf(name4seek)!=-1)
        {
            fexe(mark,link);//如果找到了那么执行这个函数
        }

    },0);
}
function univeralmultiSeek(namelist,obj,mark)/*多线程搜索
思路:每个线程搜索一样东西,搜索到后执行函数
参数:搜索总表(一个数组),执行函数,列表对象,标记
---->此函数为需要调用函数
*/
{
    var listlength=namelist.length;
    for (var i=0;i<listlength;i++)
    {
        if(namelist[i]!==""){
            univeralthrun(namelist[i],obj,mark,univeralChangeStrBgColor);
        }

    }
}
/*你们就这里有用其他的没用*/
function univeralSearch(obj) {
    var searchStrArray=new Array();
    searchStrArray[0]={
        num:3,
        color:"#000000",
        str:"元包邮"//屏蔽标题关键字,用|隔开比如 烙铁|t12
    };
    /*自定义格式
    searchStrArray[0完了是123456789...]={
     num:1,3,5,7,9区域高亮,
        color:"#000000",高亮颜色
        str:"元包邮"//标题关键字,用|隔开比如 烙铁|t12
    };
    */
    for (var i=0;i<searchStrArray.length;i++)
    {
        univeralmultiSeek(searchStrArray[i].str.split("|"),obj,searchStrArray[i]);
    }
}
//屏蔽指定id
function univeralSearchAuthor(obj) {
    var searchStrArray=new Array();
    searchStrArray[0]={
        num:999,
        color:"#000000",
        str:"jinleliangge|qineng"//屏蔽标题关键字,用|隔开比如 烙铁|t12
    };
    /*自定义格式
    searchStrArray[0完了是123456789...]={
     num:1,3,5,7,9区域高亮,
        color:"#000000",高亮颜色
        str:"元包邮"//标题关键字,用|隔开比如 烙铁|t12
    };
    */
    for (var i=0;i<searchStrArray.length;i++)
    {
        univeralmultiSeek(searchStrArray[i].str.split("|"),obj,searchStrArray[i]);
    }
}