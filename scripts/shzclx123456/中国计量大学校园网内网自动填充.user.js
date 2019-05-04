// ==UserScript==
// @name         中国计量大学校园网内网自动填充
// @version      0.1.3
// @description  内网登录界面自动填充账号密码(需自己动手修改)并勾选“访问互联网”，只需“确定”弹出的确认框会自动登录
// @method       注：安装此脚本是不能正常使用的。需要用户自行复制代码，保存到txt中，并更改为自己的用户名和密码，然后将txt“另存为”，在界面中修改编码方式为UTF-8，保存文件名为*.user.js(eg:sku.user.js)，再自行导入到浏览器扩展应用中。基于chrome内核的浏览器都可以在浏览器地址栏输入chrome://extensions，然后拖入创建好的*.user.js进行安装
// @author       Hotos
// @grant        none
// @namespace	 https://greasyfork.org/zh-CN/users/122009
// ==/UserScript==
if(location.href.indexOf("cjlu.edu.cn/2.htm")!=-1)
{
	setTimeout(function (){
		document.getElementsByName("ac_forward")[0].click();
	},0);
}
if(location.href.indexOf("cjlu.edu.cn")!=-1)
{
    setTimeout(function (){
		document.getElementById("VipDefaultAccount").value="用户帐号(学号)";
		document.getElementById("VipDefaultPassword").value="用户密码";		
		document.getElementsByName("union")[0].click();
		document.getElementById("login").click();
	},100);
}