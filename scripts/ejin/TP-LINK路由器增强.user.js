// ==UserScript==
// @name         TP-LINK路由器增强
// @namespace   8646c2f909614c7b0888bc8af4ad2fb3
// @version      2015.10.16
// @description  目前增加功能，手动断线后自动连接网络，在banner栏显示状态信息和操作按钮（仅适用于WR941N类型的固件界面）
// @author       ejin
// @match        */userRpm/StatusRpm.htm
// @grant        none
// ==/UserScript==

var re = /<meta.*charset=([^"]+).*?>/i;
if ( document.documentElement.innerHTML.match(re)[1]!="iso-8859-1" ) {
    self.parent.frames[1].document.body.innerHTML='';
    self.parent.frames[1].document.writeln("<style>td {font-family: 'Times New Roman', '宋体';font-size: 12px;}body{BACKGROUND-COLOR: #0052A4;color:#fff;}</style>");
    self.parent.frames[1].document.writeln("<table bakwidth='100%'  border='0' cellpadding='1' bakcellspacing='0' bakbgcolor='#ADD7FF' id='tablehead'>");
    self.parent.frames[1].document.writeln("	<tr bgcolor='#0052A4'>");
    self.parent.frames[1].document.writeln("		<td><strong>广域网</strong></td>");
    self.parent.frames[1].document.writeln("		<td><strong>局域网</strong></td>");
    self.parent.frames[1].document.writeln("		<td><strong>无线</strong></td>");
    self.parent.frames[1].document.writeln("		<td><strong>统计(下载)</strong></td>");
    self.parent.frames[1].document.writeln("		<td><strong>统计(上传)</strong></td>");
    self.parent.frames[1].document.writeln("	</tr>");
    self.parent.frames[1].document.writeln("	<tr bgcolor='#0052A4'>");
    self.parent.frames[1].document.writeln("		<td>"+wanPara[2]+"&nbsp;</td>");
    self.parent.frames[1].document.writeln("		<td>"+lanPara[1]+"&nbsp;</td>");
    self.parent.frames[1].document.writeln("		<td>"+wlanPara[1]+"&nbsp;</td>");
    self.parent.frames[1].document.writeln("		<td>字节"+new Number(statistList[0]/1024).toFixed(3)+" KB&nbsp;</td>");
    self.parent.frames[1].document.writeln("		<td>"+new Number(statistList[1]/1024).toFixed(3)+" KB&nbsp;</td>");
    self.parent.frames[1].document.writeln("	</tr>");
    self.parent.frames[1].document.writeln("	<tr bgcolor='#0052A4'>");
    self.parent.frames[1].document.writeln("		<td><div id='wanfun'></div></td>");
    self.parent.frames[1].document.writeln("		<td>"+lanPara[2]+"&nbsp;</td>");
    self.parent.frames[1].document.writeln("		<td>&nbsp;</td>");
    self.parent.frames[1].document.writeln("		<td>数据包"+statistList[2]+"&nbsp;</td>");
    self.parent.frames[1].document.writeln("		<td>"+statistList[3]+"&nbsp;</td>");
    self.parent.frames[1].document.writeln("	</tr>");
    self.parent.frames[1].document.writeln("</table>");
    if ( wanPara[2] == '0.0.0.0' ) {
        self.parent.frames[1].wanfun.innerHTML="<a href='javascript:;' onclick='self.parent.frames[4].doConnect(1)'><font color='#fff'>连线</font></a>"
        setTimeout("doConnect(1)",5000)
    } else {
        self.parent.frames[1].wanfun.innerHTML="<a href='javascript:;' onclick=\"self.parent.frames[4].doDisConnect(1);setTimeout('self.parent.frames[4].location.href=\\'/userRpm/StatusRpm.htm\\'',5000)\"><font color='#fff'>断线</font></a>"
    }
}