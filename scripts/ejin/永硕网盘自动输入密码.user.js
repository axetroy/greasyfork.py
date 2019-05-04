// ==UserScript==
// @name         永硕网盘自动输入密码
// @namespace   a4a5562ed47cfc93039004736bc39676
// @version      2014.12.06
// @description  永硕网盘很好用，但是前台如果有密码，每次都需要手动输入，特写此脚本，用于自动输密码，使用方式，安装此脚本后，用http://xxx.ys168.com/#psw=123或http://xxx.ys168.com/#psw=123打开就会自动输密码了（密码就是123这部分）
// @author       ejin
// @match        http://*.cccpan.com/login.aspx?d=*
// @match        http://*.ys168.com/login.aspx?d=*
// @grant        none
// ==/UserScript==

if (location.href.indexOf("#") != -1) {
    document.forms[0].action += "&action=auto"
    document.forms[0].teqtbz.value=location.href.split("psw=")[1]
	var dd = new Date(); dd.setDate(dd.getDate()+90);var dateexp = dd.toGMTString(); //cookie过期时间
    document.cookie = "psw" + "=" + location.href.split("psw=")[1] + ";expires=" + dateexp;  //写入cookie
	document.forms[0].b_dl.click()
} else if (location.href.indexOf("action=auto") == -1 && document.body.innerText.indexOf("用户名") != -1 && document.body.innerText.indexOf("登陆密码不正确") == -1 && document.cookie.indexOf("psw=") != -1) {
    if (document.cookie.indexOf("psw=") !=-1) {
    	document.forms[0].action += "&action=auto"
        document.forms[0].teqtbz.value=document.cookie.split("psw=")[1].split(";")[0]
        var dd = new Date(); dd.setDate(dd.getDate()+90);var dateexp = dd.toGMTString(); //cookie过期时间
   		document.cookie = "psw" + "=" + document.cookie.split("psw=")[1].split(";")[0] + ";expires=" + dateexp;  //写入cookie
        document.forms[0].b_dl.click()
    }
} else if (location.href.indexOf("action=auto") != -1 && document.body.innerText.indexOf("用户名") != -1 && document.body.innerText.indexOf("登陆密码不正确") != -1 && document.cookie.indexOf("psw=") != -1) {
    document.cookie = "psw" + "=;expires=" + new Date().toGMTString();
}