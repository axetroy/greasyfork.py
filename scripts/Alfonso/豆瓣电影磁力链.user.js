// ==UserScript==
// @name         豆瓣电影磁力链
// @namespace    http://tampermonkey.net/
// @version      3.20.0408.20
// @description  豆瓣电影（https://movie.douban.com/）和 时光网（http://movie.mtime.com/）中进入电影的详细页时，在电影海报下方自动添加与当前电影匹配的磁力链。
// @author       Alfonso
// @match        https://movie.douban.com/subject/*
// @match        http://movie.mtime.com/*
// @connect      www.bteat.com
// @connect      www.wcs333.com
// @connect      www.wcs222.com
// @connect      www.btanf.com
// @connect      xiguacili.net
// @connect      www.ksnksn.com
// @connect      www.nms222.com
// @connect      cl8.cc
// @run-at       document-idle
// @grant        GM.xmlHttpRequest
// @grant        GM.setClipboard
// @grant        GM.setValue
// @grant        GM.getValue
// @require      https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js
// ==/UserScript==

(function() {
    'use strict';
    var main={
        mtime:{
            re:/mtime/,
            key:function(){return document.querySelector(".db_head > div  > h1 ").innerText;},
            insertNode:function (){return document.querySelector("p.line_dot");}
        },
        douban:{
            re:/douban/,
            key:function(){return document.querySelector("div#content h1 span").innerText.split(" ")[0];},
            insertNode:function(){return document.querySelector("#interest_sect_level");}
        }
    }

    //     let key = document.querySelector("div#content h1 span").innerText.split(" ")[0];
    //     let insertNode = document.querySelector("#interest_sect_level");
    var key="";
    var insertNode = "";

    var main_keys = Object.keys(main);
    for (var i = 0; i < main_keys.length; i++) {
        var currentMovieSite = main[main_keys[i]];
        if (currentMovieSite.re && currentMovieSite.re.test(location.href)) {
            key =currentMovieSite.key();
            insertNode =currentMovieSite.insertNode();
        }
    }

    let mainNode = document.createElement("div");
    mainNode.setAttribute("id","mainmovie");
    mainNode.innerHTML="<movies></movies>";
    insertNode.parentNode.insertBefore(mainNode,insertNode);
    //     console.log(insertNode);

    // 将搜索结果转为HTML
    function parseText(text) {
        let doc = null;
        try {
            doc = document.implementation.createHTMLDocument("");
            doc.documentElement.innerHTML = text;
            return doc;
        }
        catch (e) {
            //  alert("parse error");
        }
    }

    Vue.component('movies',{
        data: function () {
            return {
                movies: [],
                error:null,
                currentSelect:"bteat",
                couponSelected: '',
                magnetSite:
                {
                    bteat: {
                        search: (key) => {
                            return `http://www.bteat.com/search/${key}-first-asc-1`;
                        },
                        lists: "div#wall > div.search-item",
                        title: (item) => {
                            return item.querySelector(".item-title").innerText;
                        },
                        url: (item) => {
                            return item.querySelector(".item-title > a").href;
                        },
                        magnet: (item) => {
                            return item.querySelector("div.item-bar> a.download").href;
                        },
                        hot: (item) => {
                            return item.querySelector("div.item-bar>span:nth-child(4) > b").innerText;
                        },
                        size: (item) => {
                            return item.querySelector("div.item-bar>span:nth-child(2) > b").innerText;
                        }
                    },
                    wcs333: {
                        search: (key) => {
                            return `http://www.wcs333.com/s/${key}-hot-desc-1`;
                        },
                        lists: "td.x-item",
                        title: (item) => {
                            return item.querySelector("h3>a").innerText;
                        },
                        url: (item) => {
                            return "http://www.wcs123.com" + item.querySelector("h3>a").href;
                        },
                        magnet: (item) => {
                            return item.querySelector("span>a").href;
                        },
                        hot: (item) => {
                            return item.querySelector("span:nth-child(5)>b").innerText;
                        },
                        size: (item) => {
                            return item.querySelector("span:nth-child(6)>b").innerText;
                        }
                    },
                    ksnksn: {
                        search: (key) => {
                            return `https://www.ksnksn.com/search-${key}-0-3-1.html`;
                        },
                        lists: "dl.detail",
                        title: (item) => {
                            return item.querySelector("dt > a > span").innerText;
                        },
                        url: (item) => {
                            return "https://www.ksnksn.com/" + item.querySelector("dt>a").href;
                        },
                        magnet: (item) => {
                            return item.querySelector("dd.info>span:nth-child(6)>a").href;
                        },
                        hot: (item) => {
                            return item.querySelector("dd.info>span:nth-child(5)>b").innerText;
                        },
                        size: (item) => {
                            return item.querySelector("dd.info>span:nth-child(3)").innerText.split(":")[1];
                        }
                    },
                    nms222: {
                        search: (key) => {
                            return `http://www.nms222.com/l/${key}-hot-desc-1`;
                        },
                        lists: ".x-item",
                        title: (item) => {
                            return item.querySelector("div:nth-child(1)>a.title").innerText;
                        },
                        url: (item) => {
                            return "http://www.nms222.com" + item.querySelector("div:nth-child(1)>a.title").href;
                        },
                        magnet: (item) => {
                            return item.querySelector("div.tail>a.title").href;
                        },
                        hot: (item) => {
                            return item.querySelector("div.tail").innerText.split(" ")[7];
                        },
                        size: (item) => {
                            return item.querySelector("div.tail").innerText.split(" ")[4]+item.querySelector("div.tail").innerText.split(" ")[5];
                        }
                    },
//                     cl8cc: {
//                         search: (key) => {
//                             return `https://cl8.cc/cili/${key}/default-1.html`;
//                         },
//                         lists: "div.cili-item",
//                         title: (item) => {
//                             return item.querySelector("div.item-title>h3>a").innerText;
//                         },
//                         url: (item) => {
//                             return item.querySelector("div.item-title>h3>a").href;
//                         },
//                         magnet: (item) => {
//                             return item.querySelector("div.item-bar>a:nth-child(6)").href;
//                         },
//                         hot: (item) => {
//                             return item.querySelector("div.item-bar> span:nth-child(4) > b:nth-child(1)").innerText;
//                         },
//                         size: (item) => {
//                             return item.querySelector("div.item-bar>span:nth-child(3) > b").innerText;
//                         }
//                     },
                    btanf: {
                        search: (key) => {
                            return `http://www.btanf.com/search/${key}-first-asc-1`;
                        },
                        lists: "div.search-item",
                        title: (item) => {
                            return item.querySelector("div.item-title>a").innerText;
                        },
                        url: (item) => {
                            return "http://www.btanf.com" + item.querySelector("div.item-title>a").href;
                        },
                        magnet: (item) => {
                            return item.querySelector("div:nth-child(3) > a:nth-child(5)").href;
                        },
                        hot: (item) => {
                            return item.querySelector(" div:nth-child(3) > span:nth-child(2) > b").innerText;
                        },
                        size: (item) => {
                            return item.querySelector("div:nth-child(3) > span:nth-child(4) > b").innerText;
                        }
                    },
                },

            }
        },
        template:
        '<table style="width: 100%; padding: 0; margin-bottom: 3px;">' +
        '<thead>' +
        '<tr>' +
        '<th style="border:1px dashed #dddddd; text-align:center; width:40px; color:#007722; font-size:14px; padding:5px;">操作</th>' +
        '<th style="border:1px dashed #dddddd; text-align:center; width:45px; color:#007722; font-size:14px; padding:5px;">热度</th>' +
        '<th style="border:1px dashed #dddddd; text-align:center; width:65px; color:#007722; font-size:14px; padding:5px;">大小</th>' +
        '<th style="border:1px dashed #dddddd; text-align:center; color:#007722; font-size:14px; padding:5px;">' +
        '磁力搜索网站：<select v-model="couponSelected" @change="selectMagnetSite"><option v-for="(item, key,value) in magnetSite" v-bind:value="key">&nbsp;{{key}}&nbsp; </option></select></th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr v-if="!movies.length && !error"><td colspan="4" style="font-size:14px;text-align:center;padding:8px;"><span>Loading......</span></td></tr>' +
        '<tr v-if="error"><td colspan="4" style="color:darkred;font-size:14px;text-align:center;padding:8px;"><span>{{error}}</span></td></tr>' +
        '<tr v-for="item in movies" v-else>' +
        '<td style="border:1px dashed #dddddd; text-align:center; padding:5px;"><a :href="item.magnet" @click.prevent="copyMagnet" title="单击此处复制磁力链到剪贴板">复制</a></td>' +
        '<td style="border:1px dashed #dddddd; padding:5px;">{{item.hot}}</td>' +
        '<td style="border:1px dashed #dddddd; padding:5px;"><a :href="item.url" target="_blank" title="打开搜索结果页">{{item.size}}</a></td>' +
        '<td style="border:1px dashed #dddddd; padding:5px;"><a :href="item.magnet" target="_blank">{{item.title}}</a></td>' +
        '</tr></tbody></table>',
        mounted:function(){
            GM.getValue("currentMagnetSite", "xiguacili").then((response)=>{
                this.currentSelect=response;
                this.getMovies(key);
            });
        },
        created:function(){
            // 读取当前磁力网站名
            GM.getValue("currentMagnetSite", "xiguacili").then((response)=>{
                this.currentSelect=response;
                // 设置下拉框的默认项
                this.couponSelected =response;
            })
        },
        methods:{
            selectMagnetSite:function(){
                // console.log(this.couponSelected);
                this.currentSelect=this.couponSelected;
                GM.setValue("currentMagnetSite", this.couponSelected);
                this.error =null;
                this.movies =[];
                this.getMovies(key);
            },
            copyMagnet:function(event){
                console.log("跳转 >>> ");
                event.preventDefault(); //阻止跳转
                event.target.innerHTML = '<span style="color:#3c763d">成功</span>';
                GM.setClipboard(event.target.href);
                setTimeout(()=>{
                    event.target.innerHTML = "复制";
                }, 3000);
            },
            getMovies:function(keyword){
                // console.log("get movies start!");
                let currentMagnet=this.magnetSite[this.currentSelect];
                console.log("currentMagnet >>> ",this.currentSelect," >>> ",currentMagnet);
                var self = this;
                GM.xmlHttpRequest({
                    method: "GET",
                    url: currentMagnet.search(key),
                    onload: function(response) {
                         console.log(response.responseText);
                        let magHtml = parseText(response.responseText);
                        console.log(currentMagnet.lists);
                        let mags = magHtml.querySelectorAll(currentMagnet.lists);
                        console.log(self.couponSelected);
                        console.log(mags);
                        console.log("数量：",mags.length);
                        if(mags){
                            self.error =null;
                            mags.forEach(function (item, index) {
                                console.log(index);
                                if(!(index ==0 && self.currentSelect =="xiguacili")){
                                    let title = currentMagnet.title(item);
                                    console.log("Title -> "+title);
                                    if(title.indexOf(key) != -1){
                                        self.movies.push({
                                            "title": title,
                                            "url": currentMagnet.url(item),
                                            "magnet": currentMagnet.magnet(item),
                                            "hot": currentMagnet.hot(item),
                                            "size": currentMagnet.size(item),
                                        });
                                    }}
                            });
                            // console.log("self.movies >>> .",self.movies);
                        }
                        if(!self.movies.length){
                            self.error ="当前电影无有效磁力资源，换个磁力搜索网站试试！";
                        }
                    },
                    onerror:function(ex){
                        console.log(`獲取磁力鏈資源異常：${ex}`);
                        self.error ="提供磁力资源的网站异常，请稍后再重试！";
                    }
                });
            }
        }
    });

    var app = new Vue({
        el: '#mainmovie',
    });

    // Your code here...
})();