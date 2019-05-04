// ==UserScript==
// @name         京东热自动跳转
// @namespace    http://liuzhixin.net/
// @version      0.1
// @description  京东热卖场自动跳转至京东商品页面
// @author       lzx
// @match        http://re.jd.com/*
// @grant         everyone，lucaslei
// ==/UserScript==

 var findurl = document.getElementsByClassName("l_info_b")[0].children[0].href
 window.open(findurl,"_self");