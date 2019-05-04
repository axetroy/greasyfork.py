// ==UserScript==
// @name         斗鱼按热度排序
// @namespace    http://tampermonkey.net/
// @version      0.21
// @description  斗鱼按热度从大到小排序
// @author       Hugo16
// @run-at       document-end
// @match        https://www.douyu.com/*
// @require      http://code.jquery.com/jquery-1.7.2.min.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let int;
    sort();

    function sort() {

        setTimeout(() => {
            let fHot = document.getElementsByClassName("DyListCover-hot");
            if (fHot[0].innerHTML != "") {

                let lists = document.getElementsByClassName("layout-Cover-list");
                if (!lists[0]) {
                    return;
                }

                for (let i = 0; i < lists.length; i++) {
                    let arr = new Array();

                    let list = lists[i].children;
                    for (let i = 0; i < list.length; i++) {
                        let hot = list[i].getElementsByClassName("DyListCover-hot")[0].innerText;
                        if (hot.indexOf("万") != -1) {
                            hot = hot.replace(/万/, "") * 1 * 10000;
                        }
                        else if (hot.indexOf("亿") != -1) {
                            hot = hot.replace(/亿/, "") * 1 * 100000000;
                        }
                        arr.push([list[i], hot])
                    }

                    arr.sort(function (a, b) {
                        return b[1] - a[1];
                    })

                    lists[i].innerHTML = "";
                    $(lists[i]).append("<div style='display:none'>1</div>");
                    for (let j = 0; j < arr.length; j++) {
                        lists[i].appendChild(arr[j][0]);
                    }

                    setTimeout(()=>{
                        if($(lists[i]).children(":first").html()!='1'){
                            sort()
                        }
                    },500)
                }
            }
            else {
                sort();
            }

        }, 10);

    }
})();