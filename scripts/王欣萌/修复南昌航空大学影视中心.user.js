// ==UserScript==
// @name         修复南昌航空大学影视中心
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  修复南昌航空大学影视中心无法全屏的bug   我将默认的弹幕播放器替换成了浏览器自带的
// @author       kiritoxkiriko
// @match        http://movie.stu.nchu.edu.cn/Movie.aspx?MovieID=*
// @grant        none
// ==/UserScript==

(function() {
var link=$('#movieurl').val();
var newPlayer="<video controls='' autoplay='' name='media'  style='width: 100%'><source src='"+link+"' type='video/mp4'></video>"
$('.product').remove();
$('.product-header').after(newPlayer);
})();