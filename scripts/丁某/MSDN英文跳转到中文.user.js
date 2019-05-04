// ==UserScript==
// @name         MSDN英文跳转到中文
// @namespace    Dyw
// @version      1.0
// @description  自动将英文msdn网页跳转到相应的中文网页
// @author       Dyw
// @match        *://msdn.microsoft.com/en-us/*
// @grant        none
// ==/UserScript==

location.href=location.href.replace("en-us","zh-cn")