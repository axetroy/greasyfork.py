// ==UserScript==
// @name               8Comic.com image list
// @description        Lists all images in a chapter/volume
// @name:zh-TW         8Comic 漫畫列表
// @description:zh-TW  列出章節內所有圖片
// @version            1.6.3
// @include            /^https?\:\/\/.*?\.comicvip\.com\/show\//
// @include            /^https?\:\/\/.*?\.comicbus\.com\//
// @include            /^https?\:\/\/.*?\.comicbus\.cc\//
// @include            /^https?\:\/\/.*?\.nowcomic\.com\//
// @include            /^https?\:\/\/.*?\.comicgood\.com\//
// @author             willy_sunny
// @license            GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @namespace https://greasyfork.org/users/9968
// ==/UserScript==
//
// ************************
// Own Variable Declaration
// ************************
// imgList: the output result
// 
// ***********************************
// Site function/variable Declearation
// many can be found in the nview.js
// http://new.comicvip.com/js/nview.js
// ***********************************
//
// ps: total page count, it's also auto stored when nview.js was done loading
//

var imgList = ""; 
var encStr=document.getElementById('TheImg').src.split("_")[1].substr(0,3);
var encPos=0;
var ch=request("ch");var p=1;if(ch.indexOf("-")>0) {p=parseInt(ch.split('-')[1]);ch=ch.split('-')[0];}
while(su(lc(su(cs,i*y+encPos, 40)), mm(p),3)!=encStr){encPos +=2;if(encPos>cs.length){console.log("over limit");return;}} // Reverse Engineer the encode string to find the location
var imgRoot=document.getElementById('TheImg').src.substr(0,document.getElementById('TheImg').src.lastIndexOf("/")+1); // server root is always the same
for (var p = 1; p <= ps; p++) {
    var picUrl = imgRoot + nn(p) + '_' + su(lc(su(cs,i*y+encPos,40)), mm(p), 3) + '.jpg';
    imgList = imgList + '<a href="'+picUrl+'"><img src="'+picUrl+'"></a><br>';
}
imgList += '<a href="#" onClick="jv(ni)">Next >>'; // this enables the user to click the next chapter link on the bottom to follow to the next chapter
document.write("<center>"+imgList+"</center>"); // outputs the list