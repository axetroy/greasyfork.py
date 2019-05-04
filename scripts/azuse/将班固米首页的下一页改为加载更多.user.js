// ==UserScript==
// @name         将班固米首页的下一页改为加载更多
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       azuse
// @match        http://bgm.tv/
// @match        http://bangumi.tv/
// @require    http://code.jquery.com/jquery-1.11.0.min.js
// @grant        none
// ==/UserScript==
var static_page = 2;
(function() {
    var a = document.createElement("a");
    a.className = "p";
    a.innerHTML = "加载更多";
    a.onclick = function(){
        $.ajax({
            type: "GET",
            url: "timeline?type=all&page="+static_page+"&ajax=1",
            success: function(html) {
                var htmlKai = $(html).html();
                var htmlNew = $(html).children("div#timeline");
                var newdate = $(html).children("h4.Header");
                var newul = $(html).children("ul");
                for(var i in newdate){
                    if(i == "length")break;
                    if($("#timeline").text().indexOf($(newdate)[i].innerHTML) != -1){
                        $("#tmlPager").before($(newul)[i].outerHTML);
                    }
                    else{
                        $("#tmlPager").before($(newdate)[i].outerHTML + $(newul)[i].outerHTML);
                    }
                }
                // if($("#timeline").text().indexOf($(newdate)[0].innerHTML)){
                //     $("#tmlPager")[0].previousElementSibling.innerHTML = $("#tmlPager")[0].previousElementSibling.innerHTML + $(html).children("ul").html();
                // }
                // else{
                //     $("#tmlPager")[0].previousElementSibling.innerHTML = $("#tmlPager")[0].previousElementSibling.innerHTML + $(html).children("*").html();
                // }
                static_page++;
                //$content.html(html);
                chiiLib.tml.prepareAjax();
            },
            error: function(html) {
                $("#robot_speech_js").html(AJAXtip['error']);
                $("#robot").animate({
                    opacity: 1
                }, 1000).fadeOut(500);
            }
        });
    };
    $(".page_inner")[0].innerHTML = "";
    $(".page_inner")[0].appendChild(a);
})();