// ==UserScript==
// @name        防止网页弹出交互超时窗口
// @namespace   *
// @version     1
// @description 一些网站会有检测无交互时长功能（如：http://blog.udn.com），超时弹窗，此脚本每分钟模拟网页滚动一次又返回原位置，防止此类弹窗
// @grant       none
// ==/UserScript==
function run() {
    var url = document.location.href;
  switch (true) {
    case (url.indexOf('http://blog.udn.com') == 0) :
      jQuery('#show_box').hide();
      break;
    case (url.indexOf('http://www.appledaily.com.tw') == 0) :
      window.location.reload();
      break;
    default:
//       window.location.reload();
      window.scroll(window.scrollX, (window.scrollY + 1));
      window.scroll(window.scrollX, (window.scrollY - 1));
  }
}
setInterval(run, 60000);
