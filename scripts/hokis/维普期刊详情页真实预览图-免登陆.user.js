// ==UserScript==
// @name         维普期刊详情页真实预览图-免登陆
// @namespace    http://tampermonkey.net/
// @version      1.2
// @icon         http://www.cqvip.com/favicon.ico
// @description  在期刊文章的详情页，自动将模糊的预览图改为真实的图片（若是没有预览图则用不了此脚本）。对于多页的文章，可以点开预览图后手动下载（另存为jpg格式）再合成PDF。
// @description  交流:hokis艾foxmail.com
// @author       Hokis
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @match        http://www.cqvip.com/QK/*/*/*.html
// @created        2018-12-20
// @lastUpdated    2019-01-05
// @grant        none
// @run-at      document-end

// ==/UserScript==
/* jshint -W097 */

(function() {
    'use strict';
    var $viewDiv = $("div.pageview");
    //加个按钮
    var $previewBtn_a = $('<a href="javascript:void(0);" style="display:block;float:left;margin: 40px auto 0  20px;color: gray;border-color: gray;background-color: white;border-style: double;text-decoration: line-through;font-size: 20px;line-height: 30px;text-align: center;width: 100px;height: 30px;">高清预览</a>');
    //存在预览图
    if($viewDiv.length == 1){
        $previewBtn_a.css({"color": "red","border-color":"red","background-color": "aliceblue","text-decoration": "none"});
        //$previewBtn_a.click(AA($viewDiv));
        $previewBtn_a.bind('click',function(){getPreviewPic($viewDiv);});
        $viewDiv.find("ul").append($previewBtn_a);
    }
    else{
        var $previewPage = $('<div class="pageview"><ul class="pics"><li></li><div id="cqvip_ad_detailleft2"></div></ul></div>');
        $previewBtn_a.text("无预览图");
        $previewPage.find("ul").append($previewBtn_a);
        $("div.detailinfo").prepend($previewPage);
    }

    function getPreviewPic(viewDiv){
        var url,perurl,id,$li;
        //虚的页数，单行最多4页
        var pages = viewDiv.find("ul>li>a");
        //1、从【出　处】解析出的页数
        var ActualPages = parseInt(viewDiv.parent().find("b:contains('【出　处】')").parent().next().text().match(/共\d+页/g)[0].replace("共","").replace("页",""));
        //2、从mata中取(有时不够准确）
        //var ActualPages =parseInt($("meta[name=citation_lastpage]").attr("content")) - parseInt($("meta[name=citation_firstpage]").attr("content")) + 1;
        //清除浮动
        var $divClear = $('<div style="clear: both;"></div>');
        var tempCount = 0;
        //补充完整
        for(var i=pages.length+1;i<= ActualPages;i++){
            if(tempCount%4 === 0){
                //调整大小
                console.log("tempCount:"+tempCount);
                viewDiv.find("ul").append($divClear.clone());
                var nowHeight = viewDiv.find("ul").height();
                nowHeight =(Math.round(i/pages.length)+1)*130;
                viewDiv.height(nowHeight).find("ul").height(nowHeight);
            }
            $li = viewDiv.find("ul>li").eq(0).clone();
            $li.find("i").text("第"+i+"页");
            $li.appendTo(viewDiv.find("ul"));
            tempCount ++;
        }
        //重新获取
        pages = viewDiv.find("ul>li>a");

        //有内容
        if( pages.length > 0){
            url = pages[0].href;
            var tempArr = url.split("id=");
            id = tempArr[tempArr.length-1];
            //发包
            $.ajax({
                url:url,
                type:"GET",
                dataType:"html",
                async: false,
                beforeSend:function(){
                    viewDiv.find("ul > a").text("获取中...");
                },
                success:function(result){
                    var resArr = result.match(/AC_FL_RunContent.*?;/g);
                    if(resArr.length > 0){
                        var tempArr1 = resArr[0].split(",");
                        var tempArr2;
                        for (var i = 0;i < tempArr1.length;i++){
                            if((tempArr2 = tempArr1[i].match(/pInfo=.*?&/g))){
                                perurl = window.decodeURIComponent(tempArr2[0].slice(6,-1));
                                break;
                            }
                        }
                        viewDiv.find("ul > a").unbind('click').css("width","150px").text("已获取高清预览");
                    }
                },
                error:function(){
                    viewDiv.find("ul > a").text("高清预览");
                }
            });
            if(perurl && perurl.startsWith("http")){
                var imgArr = new Array(pages.length);
                //生成URL
                for(var j = 0; j < pages.length;j++){
                    imgArr[j] = perurl+"&page="+(j+1)+"&lngID="+id;
                }
                //执行替换
                $.each(pages,function(index,p){
                    p.href = imgArr[index];
                    $(p).find("img")[0].src = imgArr[index];

                });
            }
        }
    }

})();

// Your code here...