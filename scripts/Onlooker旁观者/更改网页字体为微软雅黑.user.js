// ==UserScript==
// @name        更改网页字体为微软雅黑
// @author      seedlx
// @description 修改自Lvyiwan的《更改网页中文字体》,更改网页字体为微软雅黑。稍微修改以正确显示乱码。如有网页出现乱码，请附上相关网页地址以便测试。
// @namespace   
// @icon        
// @encoding    utf-8
// @grant       unsafeWindow
// @grant       GM_setClipboard
// @run-at      document-start
// @version     0.69
// ==/UserScript==

(
        function (){
                with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('style')).innerHTML = '*:not([class*="icon"]):not([class*="mui-amount"]):not([class*="button"]):not([class*="tic"]):not([class*="tyc"]):not([class*="ddgsi"]):not(i):not(s){font-family:"微软雅黑", "Microsoft Yahei" !important;}'];
        }
)()
