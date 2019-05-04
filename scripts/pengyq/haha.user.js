// ==UserScript==
// @name         haha
// @namespace    http://spark.wsd.oa.com/
// @version      0.3
// @description  haha1
// @author       box
// @match        http://spark.wsd.oa.com/
// @grant        none
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

$(document).ready(function(){
     $("a[href]").each(function(){
        old=$(this).attr("href");
        if(old.indexOf("http") >= 0)
        {
            info=old.match(/(\d+)/g);
            console.log(info);
            if(info.length==5)
            {
               $(this).attr("href","http://spark-"+info[3]+"-"+info[4]+".wsd.oa.com/");
            }
        }
        }
   );
  }
);