// ==UserScript==
// @name        Google Card-Style UI
// @description Greatly Beautify Google UI!
// @author      Fei Sun
// @version     1.2.6
// @include     http://www.google.*/*
// @include     https://www.google.*/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @namespace https://greasyfork.org/users/35010
// ==/UserScript==
/*jshint multistr: true */
var cssblock=document.createElement("div");
var csstext=`<style>body {
background:#f9f9f9;
}
* {
font-family:'Segoe UI','Microsoft YaHei'!important;
outline:none;
}
div.col,div.col *,div.g {
box-sizing:border-box;
}
.VoEfsd,.g {
box-shadow:0px 1px 2px rgba(0,0,0,0.1);
transition:box-shadow 0.3s;
}
.exp-outline {
border:none;
}
.bh13Qc {
margin-left:0;
margin-right:0;
}
.g {
background:white;
padding:25px;
margin-bottom:15px!important;
margin-right:0px;
position:relative;
}
.VoEfsd:hover,.g:hover {
box-shadow:0px 1px 15px rgba(0,0,0,0.1);
}
a.fl:link, .fl a, .flt, a.flt, .gl a:link, a.mblink, .mblink b,a:link, .w, #prs a:visited, #prs a:active, .q:active, .q:visited, .kl:active, .tbotu,.xXEKkb {
color:#006621;
}
.RJn8N.xXEKkb.ellip {
color:#006621!important;
}
.appbar {
margin-top:59px;
border-bottom:none;
}
.appbar.hdtb-ab-o {
}
body.vasq #hdtbMenus.hdtb-td-o {
height:44px;
box-shadow:0px 1px 2px rgba(0,0,0,0.1);
box-sizing:border-box;
}
#cnt {
width:100%;
}
.mw {
width:100%;
max-width:100%!important;
}
#rcnt {
width:100%!important;
box-sizing:border-box;
margin-top:0px;
}
#rcnt .col:nth-of-type(2) {
width:65%!important;
min-width:582px;
margin-left:6%;
}
#rcnt .col:nth-of-type(3) {
width:23%!important;
float:left;
padding-top:6px;
}
#rhs .rhsvw {
width:100%;
}
.kp-blk {
box-shadow:none;
}
#center_col {
width:100%!important;
min-width:0px!important;
margin-left:0px!important;
padding-top:0px!important;
}
#rhscol {
width:20%!important;
min-width:200px;
float:right;
}
#rhs {
margin-left:0px!important;
}
.kp-blk._Jw._Rqb._RJe {
margin:0px!important;
}
.s {
max-width:100%;
}
h3.r:after {
content:'';
display:block;
border-top:1px solid #ebebeb;
height:0px;
margin-top:5px;
margin-bottom:5px;
}
#center_col .kp-blk {
margin-left:0px;
margin-right:0px;
}
.kno-ftr {
margin: 0 -35px 0 -8px;
padding: 4px 40px 0;
}
.related-question-pair>div>div>div>div {
padding-top:10px!important;
}
._U7g._grf {
padding-top:10px;
padding-bottom:10px;
}
#extrares {
background:transparent;
padding:0px 15px!important;
}
#botstuff {
background:white;
padding:20px;
box-shadow:0px 1px 2px rgba(0,0,0,0.1);
transition:all 0.5s;
position:relative;
}
#botstuff:hover {
box-shadow:0px 1px 15px rgba(0,0,0,0.1);
}
._Ugf {
overflow:hidden;
}
a._Eu._H2 {
display:block;
width:100%!important;
background:white;
padding:20px;
box-shadow:0px 1px 2px rgba(0,0,0,0.1);
transition:all 0.5s;
position:relative;
}
a._Eu._H2:hover {
box-shadow:0px 1px 15px rgba(0,0,0,0.1);
}
div#bcenter {
display:none;
}
/*remove ads*/
div#tads {
display:none;
}
div#bottomads {
display:none;
}
img#hplogo {
box-sizing:content-box;
}
ol#ab_ctls * {
box-sizing:content-box!important;
}
g-snapping-carousel {
margin-left:12px;
margin-right:12px;
}
#foot {
width:calc(100% - 16px)!important;
margin-left:8px;
box-sizing:border-box;
padding:1px;
}
#fbarcnt {
padding-left:30%;
}
#footcnt {
background:#f2f2f2;
border-top:1px solid #e4e4e4;
}
#fbar {
border-top:none;
min-width:0px;
}
#rhs .kp-blk {
margin:0px;
}
div#subform_ctrl {
margin-top:0px!important;
}
#slim_appbar {
height:44px;
}
#hdtbMenus.hdtb-td-o {
background:#fafafa;
top:59px!important;
}
.appbar {
margin-top:40px;
}
#resultStats {
line-height:44px!important;
}
#res a:link,#extrares a:link {
color:#222!important;
}
#res a:visited,#extrares a:visited {
color:#999!important;
}
#appbar {
background:#fafafa;
}
#res {
padding:0px 15px;
}
div._M6k.vk_c {
width:100%;
margin-left:0px!important;
box-shadow:0px 1px 2px rgba(0,0,0,0.1);
}
div._M6k.vk_c:hover {
box-shadow:1px 1px 15px rgba(0,0,0,0.1);
}
#hdtbSum {
background:#fafafa!important;
}
g-card-grid {
margin:0px;
}
.hdtb-mn-cont {
margin-top:8px;
}
.kno-ftr.rhsvw {
padding-bottom:4px;
}
._KBh {
background: white;
padding: 25px;
box-shadow: 0px 1px 2px rgba(0,0,0,0.1);
margin-bottom: 15px!important;
margin-right: 0px;
transition: box-shadow 0.5s;
position: relative;
box-sizing:border-box;
width:100%;
margin:0;
}
._KBh:hover {
box-shadow:0px 1px 15px rgba(0,0,0,0.1);
}
g-more-link *{
color:#222!important;
}
._Bfp {
width:100%;
margin:0;
}
._wCh {
padding:0;
}
._Ncr {
margin:0;
}
.H3O4uc {
margin-left:0;
margin-right:0;
}
.vk_c, .vk_cxp {
margin-left:0;
margin-right:0;
}
.COEoid {
margin:-4px 0;
}
</style>`;
cssblock.innerHTML=csstext;
(function () {
    if (window.location.href.search('tbm=isch')==-1) {
        document.body.appendChild(cssblock);}
    document.getElementById("lst-ib").addEventListener("blur",function () {
        document.querySelector("div.gstl_0.sbdd_a").style.cssText='display:none';
    });
    document.getElementById("lst-ib").addEventListener("focus",function () {
        document.querySelector("div.gstl_0.sbdd_a").style.cssText='display:block';
    });
})();