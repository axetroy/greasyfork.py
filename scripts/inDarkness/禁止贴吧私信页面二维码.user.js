// ==UserScript==
// @name         禁止贴吧私信页面二维码
// @namespace    ntaow.com
// @version      0.2
// @description  try to take over the world!
// @author       AC
// @note         V0.2 尽早的干掉二维码
// @note         V0.1 初始功能
// @include      http://tieba.baidu.com/im/pcmsg*
// @supportURL      https://qm.qq.com/cgi-bin/qm/qr?k=fOg8ij6TuwOAfS8g16GRYNf5YYFu5Crw&jump_from=&auth=-l05paasrPe5zigt5ahdzn_dzXiB1jJ_
// @home-url        https://greasyfork.org/zh-TW/scripts/375700
// @run-at       document-start
// ==/UserScript==
function addStyle(css) { //添加CSS的代码--copy的
    var pi = document.createProcessingInstruction(
        'xml-stylesheet',
        'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
    );
    return document.insertBefore(pi, document.documentElement);
}
addStyle(".dialogJfix,.dialogJmodal{display:none !important;}");
try{
    $(".dialogJfix,.dialogJmodal").remove();
}catch(e){}
