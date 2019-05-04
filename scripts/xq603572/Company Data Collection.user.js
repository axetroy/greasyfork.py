// ==UserScript==
// @name         Company Data Collection
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  收集公司数据
// @author       lanqianqian
// @match        *://search.51job.com/list/*
// @match        *://www.qichacha.com/search?key=*
// @match        *://www.qichacha.com/firm_*.html?companyName=*&companyPhone=*
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function() {
    function __main__() {
        GM_addStyle("#toolbar{opacity:0.6;z-index:999999;position:fixed;top:60px;left:1%;border:1px solid #a38a54;width:150px;border-radius:3px;}.clickable a{cursor:pointer;}")

        if (location.href.indexOf("51job") > 0) {
            Collect.init();
        } else if (location.href.indexOf("search") > 0) {
            Search.init();
        } else {
            Get.init();
        }
    }

    var Collect = {
        init() {
            $("body").append(`<div id='toolbar' class="clickable" style="display:flex;flex-direction:column">
                                <div style="margin:2px auto">
                                    <a id="startBtn" style="margin:auto">开始收集</a>
                                </div>
                            </div>`);
            Collect.eventRegister();
        },
        eventRegister() {
            $(document).on("click", "#startBtn", function(event) {
                let companyNameList = [];
                let elements = $(".dw_table").find(".el");
                for (var i = 1; i < elements.length; i++) {
                    let companyNameNodes = $(elements[i]).find(".t2");
                    if (companyNameNodes.length > 0) {
                        companyNameList.push($(companyNameNodes[0]).text().replace("...", ""));
                    }
                }
                let companyNameListJson = JSON.stringify(companyNameList);
                localStorage.setItem("companyNameList", companyNameListJson);
                window.open("https://www.qichacha.com/search?key=" + encodeURI(companyNameListJson));
            });
        }
    }

    var Search = {
        init() {
            let companyNameList = JSON.parse(localStorage.getItem("companyNameList"));
            let key = decodeURI(getQueryVariable("key"));
            if (companyNameList == null) {
                companyNameList = JSON.parse(decodeURI(key));
                let companyName = companyNameList.shift();
                localStorage.setItem("companyName", companyName);
                localStorage.setItem("companyNameList", JSON.stringify(companyNameList));
                window.location.href="https://www.qichacha.com/search?key=" + encodeURI(companyName);
                return;
            }
            if (key == localStorage.getItem("companyName")) {
                let elements = $("#searchlist").find("tr");
                if (elements.length > 0) {
                    let element = $(elements[0]);
                    let companyName = element.find(".ma_h1").text();
                    let companyPhone = $(element.find(".m-t-xs")[1]).find(".m-l").text().replace("电话：", "");
                    if (companyPhone != "-") {
                        let companyUrl = element.find(".ma_h1").attr("href");
                        window.open(companyUrl + "?companyName=" + encodeURI(companyName) + "&companyPhone=" + companyPhone);
                    }
                }
                if (companyNameList.length > 0) {
                    let companyName = companyNameList.shift();
                    localStorage.setItem("companyName", companyName);
                    localStorage.setItem("companyNameList", JSON.stringify(companyNameList));
                    window.location.href="https://www.qichacha.com/search?key=" + encodeURI(companyName);
                } else {
                    setTimeout(Search.write, 3000);
                }
            } else {
                localStorage.removeItem("companyName");
                localStorage.removeItem("companyNameList");
                localStorage.removeItem("companyResult");
                alert("Error!");
            }
        },
        write() {
            $("body").append(`<div id='toolbar' class="clickable" style="display:flex;flex-direction:column">
                                <div style="margin:2px auto">
                                    <span style="margin:auto">收集完毕</span>
                                </div>
                                <div style="margin:2px auto" class="showmsg">
                                    <textarea id="result" style="font-size:10px;width:120px;height:100px">${localStorage.getItem("companyResult")}</textarea>
                                </div>
                            </div>`);
            localStorage.removeItem("companyName");
            localStorage.removeItem("companyNameList");
            localStorage.removeItem("companyResult");
            alert("Successful!");
        }
    }

    var Get = {
        init() {
            let companyScale = $($($("#Cominfo").find(".ntable")[1]).find("td")[33]).text().trim();
            if (companyScale != "-") {
                localStorage.setItem("companyResult", (localStorage.getItem("companyResult") || "") + decodeURI(getQueryVariable("companyName")) + "\t" + getQueryVariable("companyPhone")
                                    + "\t" + companyScale + "\n");
            }
            window.close();
        },
    }

    function getQueryVariable(variable) {
        var url = window.location.search.substring(1);
        var vars = url.split("&");
        for (var i=0; i<vars.length; i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){
                return pair[1];
            }
        }
        return(false);
    }

    __main__();
})();