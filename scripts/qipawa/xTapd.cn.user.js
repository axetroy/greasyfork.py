// ==UserScript==
// @name         xTapd.cn
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  调整tapd界面
// @author       Jack.Chan
// @match        https://www.tapd.cn/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    var rules = [];
    rules.push(".left-tree-brick .left-tree-brick-text{opacity:1;}");
    rules.push(".left-tree-project-list{top: 0;left: 0;right: 0;bottom: auto;height: 50px;width: 1366px;background-color:#3d424a;}");
    rules.push(".project-nav{top:50px;}");
    rules.push("#page-wrapper #page-content, #page-wrapper.read-like-card #page-content{margin-top:65px;}");
    rules.push(".left-tree-project-list-title,");
    rules.push(".left-tree-project-list .status-list,");
    rules.push(".left-tree-project-list .left-tree-project-list-title,");
    rules.push(".g-sidebar .projects.list-content li,");
    rules.push(".add-projects-wrap");
    rules.push("{display:inline-block !important;vertical-align:top;}");
    rules.push(".left-tree-project-list .status-list{padding-top:0;padding-bottom:0;}");
    rules.push(".left-tree-project-list .status-list .myprojects-content{display:inline-block;}");
    rules.push(".g-sidebar .projects.list-content li{padding:5px 10px}");

    rules.push(".left-tree-project-list .status-list .myprojects-content{padding-top:0;vertical-align:middle;}");
    rules.push("ul.projects a{padding-left:10px;}");
    rules.push("ul.projects .project-name{width:auto;padding-right:10px;}");
    rules.push(".add-projects-wrap{vertical-align:middle;}");
    rules.push("");
    rules.push("");

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = rules.join('');
    document.head.appendChild(style);

    if(jQuery){
         $(window).on('resize', function(e){
             $('.left-tree-project-list').width($(window).width());
         }).trigger('resize');;
    }
})();