// ==UserScript==
// @name         去除信奥一本通OJ提交限制
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  去除提交26次的限制
// @author       abc2237512422
// @match        http://ybt.ssoier.cn:8088/submit.php?pid=*
// @match        https://ybt.ssoier.cn:8088/submit.php?pid=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
           function children(curEle,tagName){
               var nodeList = curEle.childNodes;
               var ary = [];
               if(/MSIE(6|7|8)/.test(navigator.userAgent)){
                   for(var i=0;i<nodeList.length;i++){
                       var curNode = nodeList[i];
                       if(curNode.nodeType ===1){
                          ary[ary.length] = curNode;
                       }
                   }
               }else{
                   ary = Array.prototype.slice.call(curEle.children);
               }
               if(typeof tagName === "string"){
                   for(var k=0;k<ary.length;k++){
                     var curTag = ary[k];
                     if(curTag.nodeName.toLowerCase() !== tagName.toLowerCase()){
                      ary.splice(k,1);
                      k--;
                     }
                   }
               }

               return ary;
       }
    var body=document.getElementsByTagName("body")[0];
    var url=window.location.href;
    var v1=children(body,"center")[0];
    var v2=children(v1,"table")[0];
    var v3=children(v2,"tbody")[0];
    var v4=children(v3,"tr")[0];
    var v5=children(v4,"th")[1];
    var v6=children(v5,"table")[0];
    var v7=children(v6,"tbody")[0];
    var v8=children(v7,"tr")[0];
    var v9=children(v8,"th")[0];
    var uid=v9.innerText.replace("修改资料", "").replace(/(\s*$)/g, "");
    var prob;
    if (url.charAt(4)=='s'){
        prob=url.replace("https://ybt.ssoier.cn:8088/submit.php?pid=","");
    }else{
        prob=url.replace("http://ybt.ssoier.cn:8088/submit.php?pid=","");
    }
    var warn=document.getElementsByClassName("warn");
    if (warn.length>0){
        body.innerHTML="<form action='action.php' method='post'><div align='center'><br><font size='5' color='#333399'>已破解，想提交几次就提交几次吧</font><br>用户名: <input name='user_id' value='"+uid+"' size='20' readonly='readonly' accesskey='u'><br>题号:<input name='problem_id' value='"+prob+"' size='20' readonly='readonly' accesskey='p'><br>语言:<select size='1' name='language' accesskey='l'><option value='1' selected=''>G++</option><option value='2'>GCC</option><option value='3'>Java</option><option value='4'>Pascal</option><option value='5'>Python</option></select><br>源代码: <br><textarea rows='30' name='source' cols='70' accesskey='c' onkeyup='if(this.value.length > 12768) this.value=this.value.substr(0,12768)'></textarea><br><input type='submit' value='提交' name='submit' accesskey='s'><input type='reset' value='清空' name='reset'></div></form>"

    }
})();