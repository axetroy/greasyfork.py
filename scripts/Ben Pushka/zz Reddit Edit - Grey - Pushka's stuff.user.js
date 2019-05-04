// ==UserScript==
// @name        zz Reddit Edit - Grey - Pushka's stuff
// @namespace   english
// @description remove header logo - change from blue to grey theme.....
// @include     http*://*reddit.com*
// @version     1.12
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==


// Main - CSS hides two classes - video add box, and call to action box under it. - also social media

 
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '/*\n*//*Reddit Edit*//*\n*//*\n*//*edit header icon*//*\n*/#header-img-a img,#header-img img, #header-img{display:none !important;}/*\n*/#header-bottom-left span{display: inline-block !important;}/*\n*//*\n*//*\n*//*header bar*//*\n*/#header-bottom-left{background-color: #E2E2E2;  position: relative;  display: table;}/*\n*/#header {  border-bottom: 1px solid #939393;  background-color: #E2E2E2; }/*\n*//*\n*/#header-bottom-right {  background-color: #FFFFFF;}/*\n*//*\n*//*#header-bottom-left .pagename a{text-indent: -9999px;  background-image: @@@}*//*\n*//*\n*/a,.md a {   text-decoration: underline;   color: #935454; }/*\n*//*\n*//*\n*/#sr-header-area {  border-bottom: none;}/*\n*/#sr-header-area a{text-decoration: none;}/*\n*/#sr-header-area a:hover{text-decoration: underline;}/*\n*//*\n*//*yellow message box*//*\n*/.infobar {  background-color: #EFEFEF;  border: 1px solid #424242;}/*\n*//*\n*//*top menu*//*\n*/.tabmenu li a {  background-color: inherit !important;}/*\n*/ .tabmenu a,  .tabmenu .md a {  text-decoration: underline;  color: #7E7E7E;}/*\n*/.tabmenu li.selected a {  color: white;  background-color: rgb(165, 165, 165) !important;   border:none;   z-index: 100;  padding: 3px 7px;}/*\n*/ .tabmenu a:hover,  .tabmenu .md a:hover {text-decoration: none;}/*\n*//*\n*/#header-bottom-left span,#header-bottom-left ul{padding-bottom: 5px;}/*\n*//*\n*//*submit buttons*//*\n*//*\n*/.morelink a {  display: block;  color: #DADADA;  text-decoration: none; letter-spacing: 0.04em;}/*\n*//*\n*/.morelink a:hover{background-image: none;background-color: #000;border-color: #000;}/*\n*//*\n*/.submit:hover,.morelink:hover{background-image: none;}/*\n*//*\n*/.morelink {/*\n*/  display: block;/*\n*//*\n*/  border: 1px solid #000000;/*\n*/  background: #6C6C6C none repeat-x scroll center left;/*\n*/  background-image: none;/*\n*/  font-size: 125%;/*\n*/  font-weight: bold;/*\n*/  letter-spacing: -1px;/*\n*/  line-height: 22px;/*\n*/  height: 25px;/*\n*/}/*\n*//*\n*/.submit  .nub {display: none;}/*\n*//*\n*//*\n*//*minimalism*//*\n*/.footer-parent,.sidecontentbox,div.create {display: none;}/*\n*//*\n*//*\n*//*\n*//*\n*//*\n*//*submit links boxes blue*//*\n*/.roundfield {  background-color: #E7E7E7;}/*\n*//*\n*/.content.submit .info-notice {  background-color: #ECECEC;  border: 1px solid #242424;}/*\n*//*\n*//*\n*//*post page*//*\n*/.link .usertext-body .md {  border: 1px solid #B3B3B3;}/*\n*//*\n*/.thing .title:visited, .thing.visited .title {  color: #7E6E8C;}/*\n*//*\n*/.thumbnail.self {  background-image:  url(https://a.thumbs.redditmedia.com/C_XAWzXeooT5q5aKM2K35zt5lz13buH8vI71sCJsCQ0.png)  ;    background-repeat: no-repeat;  background-position: inherit;}/*\n*//*\n*/.linkinfo {  border: 1px solid #000000;  background-color: #F7F7F7;}/*\n*//*\n*/.fancy-toggle-button .remove,.fancy-toggle-button .add {  padding: 2px 9px 5px 9px;}/*\n*//*\n*/.gold-accent {  background-color: #FDFCED;  border: solid 1px #000000;  color: #9a7d2e;}/*\n*/.error {  color: rgb(176, 18, 18);  font-size: small;}/*\n*//*\n*/.thing .title,.title ,.may-blank  {  color: rgb(16, 16, 165) !important;}/*\n*//*\n*/a:hover,.md a:hover {   text-decoration: none !important;   color: #515151; }/*\n*//*\n*/.content {  z-index: 1;  margin: 17px 15px 0px 15px;}/*\n*//*\n*/.side .md {  font-size: 1.023em;}/*\n*//*\n*//*\n*/.new-comment .usertext-body {/*\n*/  background-color: #FDFDFD;/*\n*/  border: solid 1px #AEAEAE;/*\n*/  margin: -1px 0;/*\n*/  padding: 4px 4px;/*\n*/}/*\n*//*\n*/.entry form{padding:4px;}/*\n*//*\n*/body{padding-bottom: 55px;}/*\n*//*\n*/.gold-accent .title{color: #583800 !important;}/*\n*//*\n*//*\n*/ ';
document.getElementsByTagName('head')[0].appendChild(style);

 