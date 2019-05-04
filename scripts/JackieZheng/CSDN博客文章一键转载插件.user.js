// ==UserScript==
// @name         CSDN博客文章一键转载插件 
// @version      0.7
// @description  CSDN博客文章转载插件 可以实现CSDN上的文章一键转载
// @author       By Jackie http://csdn.admans.cn/
// @match        *://blog.csdn.net/*/article/details/*
// @match        *://mp.csdn.net/postedit*
// @grant    GM_addStyle
// @namespace https://greasyfork.org/users/164689
// ==/UserScript==

GM_addStyle("#ReproduceBtn{position: absolute;float: right;right: 0px;width: auto;background: #0f962191;z-index: 99;color: white;text-align: center;margin: 5px;padding: 5px;border-radius: 5px;cursor: pointer;}");
document.domain="csdn.net";
(function(){
        'use strict';
         document.domain="csdn.net";         
        //文章查看窗口
        if(location.href.indexOf("article/details") > -1)
        {
              var divBtn = document.createElement("div");
              divBtn.setAttribute("id", "ReproduceBtn");
              divBtn.innerHTML ='转载';          
              var article=document.getElementsByClassName('article_content')[0];
              article.insertBefore(divBtn,article.childNodes[0]); 
              var posteditUrl="https://mp.csdn.net/postedit";

              divBtn.onclick=function()
              {
                  window.open(posteditUrl);   
              }
        }
      else //文章发布窗口
      {
         document.onreadystatechange = function(e){
                if(document.readyState == 'complete') {
                  setTimeout(function(){
                        var contentDocumentbody=document.getElementsByTagName("iframe")[0].contentDocument.body;
                        var blogContent=window.opener.document.getElementById('content_views').innerHTML
                                         +"<br>---------------------" 
                                         +"<br>作者："+window.opener.document.getElementsByClassName('follow-nickName')[0].innerHTML 
                                         +"<br>来源：CSDN" 
                                         +"<br>原文："+window.opener.location.href 
                                         +"<br>版权声明：本文为作者原创文章，转载请附上博文链接！";
                        document.getElementById('txtTitle').value=window.opener.document.getElementsByClassName('title-article')[0].innerHTML;
                        //清除代码前的多余行号
                        contentDocumentbody.innerHTML=blogContent.replace(/<ul class=\"pre-numbering\"[\s\S].*<\/ul>/g,'');
                        document.getElementById("selType").value="2";
                         
                      },1000);                  
                 
                }
            }         
          
      } 
        
    })();