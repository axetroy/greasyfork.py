// ==UserScript==
// @name         自定义大马路导航背景图片
// @namespace    https://greasyfork.org/zh-CN/scripts/22036
// @version      0.3
// @description  自定义大马路导航背景图片，默认图片适用于夜间模式
// @author       狐狸
// @match        http://dama.lu/
// @match        https://dama.lu/
// @grant        none
// ==/UserScript==

window.onload = BG_change;
var isVisible = true;

function BG_change(){

    if(isVisible){
    document.body.style.backgroundImage = "url('http://ww2.sinaimg.cn/large/682e2438jw1f8vn9g6ldfj21hc0u0qe2.jpg') ";
                                          //替换上方图片地址       
        
        document.body.style.backgroundPosition="center";
        document.body.style.backgroundPositionY="0px";
        document.body.style.backgroundRepeat="repeat";
        document.body.style.backgroundAttachment="fixed";

    }
}

//黑色渐变
//http://ww4.sinaimg.cn/large/682e2438jw1f89dgo4masj21hc0u0gn2.jpg

//白色低面
//http://ww3.sinaimg.cn/large/682e2438jw1f89dgda3mkj21jk0rstc5.jpg

//黑色低面
//http://ww4.sinaimg.cn/large/682e2438jw1f89dfpeks3j21jk0rs76v.jpg

//白色瓷砖
//http://ww4.sinaimg.cn/large/682e2438jw1f89dfyrvbjj202s02r3y9.jpg

//马里奥
//http://ww4.sinaimg.cn/large/682e2438jw1f7zfdd5xq5j21hc0u0496.jpg

//格子
//http://ww1.sinaimg.cn/large/682e2438jw1f89dee4f6mj21hc0u07by.jpg

//黑木纹
//http://ww3.sinaimg.cn/large/682e2438jw1f8thlsepekj20dy0g4aat.jpg

//地图
//http://ww2.sinaimg.cn/large/682e2438jw1f8vn9g6ldfj21hc0u0qe2.jpg

//洞洞
//http://ww3.sinaimg.cn/large/682e2438jw1f8z92aht56j21hc0u0nbv.jpg