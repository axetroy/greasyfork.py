// ==UserScript==
// @name         Jenkins收藏夹
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       caolei<caolei@qiyi.com>
// @match        http://www.jenkins.com/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/vue/dist/vue.js
// ==/UserScript==

(function() {
    'use strict';
    var commonStyle =
        'body{font-family: Consolas, "Pingfang SC", "Microsoft Yahei";}' +
        '#header{background: #00a65a !important;}' +
        '.star-btn{color: gray; cursor: pointer; padding-left: 8px;}.star-btn.star{color: red;}' +
        '.star-list-ul {padding: 5px;}' +
        '.star-list-ul li{display: inline; list-style: none; border-right: 1px solid red; padding: 0 5px;}' +
        '#insert_app{ background: #00a65a; border-color: #008d4c; border-radius: 5px 5px 0 0;}' +
        '.star-link{ color: #ffffff !important; }' +
        '.remove-star-btn {color: red; padding-left: 3px; cursor: pointer;}' +
        '#side-panel{background: #222d32;color: white;width: 300px !important;}' +
        '#side-panel a {color: white !important;}' +
        '#main-panel {margin-left: 305px !important;}' +
        '.pane{color: white !important;}a.build-link{color: #000000 !important;}' +
        '.pane-header, .pane-footer{background-color: #2c3b41 !important; color: white !important;}' +
        'table.stripped tr:nth-child(even){background-color: #2c3b41 !important; color: white !important;}';
    var style = document.createElement('style');
    var textnode = document.createTextNode(commonStyle);
    style.appendChild(textnode);
    var head = document.getElementsByTagName('head');
    head[0].appendChild(style);

    var insertNode = document.createElement('div');
    var ulNode = document.createElement('ul');
    ulNode.className = 'star-list-ul';
    var liNode = document.createElement('li');
    liNode.setAttribute('v-for', 'starItem in starList');

    var linkNode = document.createElement('a');
    linkNode.setAttribute(':href', 'starItem.url');
    linkNode.className = 'star-link';
    var insertText = '{{ starItem.title }}';
    var textNode = document.createTextNode(insertText);

    var removeNode = document.createElement('span');
    removeNode.className = 'remove-star-btn';
    removeNode.appendChild(document.createTextNode('x'));
    removeNode.setAttribute('v-on:click', 'removeStarBtnClick(starItem.url)');

    linkNode.appendChild(textNode);
    liNode.appendChild(linkNode);
    liNode.appendChild(removeNode);
    ulNode.appendChild(liNode);

    insertNode.appendChild(ulNode);
    insertNode.id = "insert_app";
    insertNode.className = 'login';

    var mainContent = document.getElementById('main-panel');
    mainContent.insertBefore(insertNode, mainContent.childNodes[0]);

    var app = new Vue({
        el: '#insert_app',
        data: {
            message: 'Hello world',
            domain: location.host,
            storageKey: 'starList:' + location.host,
            starList: [],
            starBtn: null,
            titleText: ''
        },
        mounted: function(){
            var self = this;
            this.$nextTick(function() {
                self.init();
            });
        },
        watch: {
            starList: function(currentList){
                if (this.hasStared()) {
                    this.starBtn.className = 'star-btn star';
                } else {
                    this.starBtn.className = 'star-btn';
                }

                localStorage.setItem(this.storageKey, JSON.stringify(currentList));
            }
        },
        methods: {
            init: function(){
                this.starList = this.getStarList();
                console.log(this.starList);
                this.addStarBtn();
            },
            addStarBtn: function(){
                var self = this;
                this.starBtn = document.createElement('span');
                this.starBtn.appendChild(document.createTextNode('♥️'));
                this.starBtn.addEventListener('click', function(){
                    self.starBtnClick();
                });
                if (this.hasStared()) {
                    this.starBtn.className = 'star-btn star';
                } else {
                    this.starBtn.className = 'star-btn';
                }
                var mainPanel = document.getElementById('main-panel');
                var mainTitle = null;
                for (var i in mainPanel.childNodes) {
                    if (mainPanel.childNodes[i].tagName === 'H1') {
                        mainTitle = mainPanel.childNodes[i];
                        this.titleText = mainTitle.innerText.trim();
                        break;
                    }
                }
                if (mainTitle !== null) {
                    mainTitle.appendChild(this.starBtn);
                }
            },
            starBtnClick: function(){
                console.log('star button clicked');
                if (this.hasStared()) {
                    this.removeStar();
                } else {
                    this.addStar();
                }
            },
            getStarList: function(){
                var allStar = localStorage.getItem(this.storageKey);
                if (allStar === null) {
                    return [];
                }
                allStar = JSON.parse(JSON.parse(allStar));
                return allStar;
            },
            hasStared: function(){
                for(var i in this.starList) {
                    if (this.starList[i].url === location.href) {
                        return true;
                    }
                }
                return false;
            },
            addStar: function(){
                if (this.hasStared()) {
                    return true;
                }
                var item = {
                    url: location.href,
                    title: this.titleText + ''
                };
                this.starList.push(item);
            },
            removeStar: function(url){
                if (url === undefined) {
                    url = location.href;
                }
                for(var i in this.starList) {
                    if (this.starList[i].url === url) {
                        this.starList.splice(i, 1);
                        return true;
                    }
                }
                return false;
            },
            removeStarBtnClick: function(url) {
                this.removeStar(url);
            }
        }
    });
})();