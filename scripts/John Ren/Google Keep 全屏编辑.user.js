// ==UserScript==
// @name       Fullscreen Google Keep
// @name:zh-CN       Google Keep 全屏编辑
// @namespace http://tampermonkey.net/
// @description	  Edit Google Keep in fullscreen and hide the dashboard
// @description:zh-CN	  全屏编辑Google Keep，隐藏dashboard
// @require       https://code.jquery.com/jquery-3.3.1.min.js
// @author        John Ren
// @match       http*://keep.google.com/*
// @run-at        document-start
// @version       1.03
// ==/UserScript==

// Hide dashboard and focus input
if (!location.hash) {
  $("html").css("opacity", 0);
  $("html").css("pointer-events", "none");
  $(window).on("load", function() {
    $(".IZ65Hb-YPqjbf.h1U9Be-YPqjbf.LwH6nd")[0].click();
    $(".IZ65Hb-YPqjbf.h1U9Be-YPqjbf.LwH6nd")[0].focus();
    $("html").animate(
      {
        opacity: 1
      },
      1000,()=>{$("html").css("pointer-events", "auto");}
    );
  });
}

// Inject style
(function() {
  var css = [
    "/* Full-screen for new note */",
    "",
    "/* Main */",
    " .h1U9Be-xhiy4>.IZ65Hb-n0tgWb.IZ65Hb-QQhtn>.IZ65Hb-TBnied {",
    "	width: 100vw !important;",
    "	height: 100vh !important;",
    "	position: fixed !important;",
    "	left: 0 !important;",
    "	top: 0 !important;",
    "	z-index: 999 !important;",
    "	border-radius: 0px;",
    "}",
    "/* Title */",
    " .h1U9Be-xhiy4>.IZ65Hb-n0tgWb.IZ65Hb-QQhtn>.IZ65Hb-TBnied>.IZ65Hb-s2gQvd>.IZ65Hb-YPqjbf.r4nke-YPqjbf {",
    "	font-size: 1.4rem !important;",
    "	font-weight: 400 !important;",
    "	line-height: 1.75rem !important;",
    "	padding-bottom: 12px !important;",
    "	padding-top: 16px !important;",
    "}",
    "/* Scroll */",
    " .h1U9Be-xhiy4>.IZ65Hb-n0tgWb.IZ65Hb-QQhtn>.IZ65Hb-TBnied>.IZ65Hb-s2gQvd {",
    "	max-height: calc(100% - 40px) !important;",
    "}",
    "/* Content */",
    " .h1U9Be-xhiy4>.IZ65Hb-n0tgWb.IZ65Hb-QQhtn>.IZ65Hb-TBnied>.IZ65Hb-s2gQvd>.IZ65Hb-YPqjbf.h1U9Be-YPqjbf {",
    "	width: calc(92vw - 11px) !important;",
    "	margin:2vw 4vw!important;",
    "	font-size: 1.1rem !important;",
    "	line-height: 2rem !important;",
    "}",
    "/* Tools */",
    " .h1U9Be-xhiy4>.IZ65Hb-n0tgWb.IZ65Hb-QQhtn>.IZ65Hb-TBnied>.IZ65Hb-yePe5c {",
    "	width: 100vw !important;",
    "	position: absolute !important;",
    "	bottom: 0 !important;",
    "	left:0 !important;",
    "}",
    "/* Full-screen for editing note */",
    "",
    "/* Main */",
    " .IZ65Hb-n0tgWb.IZ65Hb-QQhtn.oT9UPb {",
    "	width: 100vw !important;",
    "	height: 100vh !important;",
    "	position: fixed !important;",
    "	left: 0 !important;",
    "	top: 0 !important;",
    "	z-index: 999 !important;",
    "	border-radius: 0px;",
    "}",
    ".VIpgJd-TUo6Hb.XKSfm-L9AdLc.eo9XGd>.IZ65Hb-n0tgWb.IZ65Hb-QQhtn.oT9UPb>.IZ65Hb-TBnied {",
    "	width:100% !important;",
    "	height:100% !important;",
    "	border-radius: 0px;",
    "}",
    "/* Title */",
    " .VIpgJd-TUo6Hb.XKSfm-L9AdLc.eo9XGd>.IZ65Hb-n0tgWb.IZ65Hb-QQhtn.oT9UPb>.IZ65Hb-TBnied>.IZ65Hb-s2gQvd>.IZ65Hb-YPqjbf.r4nke-YPqjbf {",
    "	font-size: 1.4rem !important;",
    "}",
    "/* Scroll */",
    " .VIpgJd-TUo6Hb.XKSfm-L9AdLc.eo9XGd>.IZ65Hb-n0tgWb.IZ65Hb-QQhtn.oT9UPb>.IZ65Hb-TBnied>.IZ65Hb-s2gQvd {",
    "	max-height: calc(100% - 40px) !important;",
    "}",
    "/* Content */",
    " .VIpgJd-TUo6Hb.XKSfm-L9AdLc.eo9XGd>.IZ65Hb-n0tgWb.IZ65Hb-QQhtn.oT9UPb>.IZ65Hb-TBnied>.IZ65Hb-s2gQvd>.IZ65Hb-YPqjbf.h1U9Be-YPqjbf {",
    "	width: calc(92vw - 11px) !important;",
    "	margin:2vw 4vw!important;",
    "	font-size: 1.1rem !important;",
    "	line-height: 2rem !important;",
    "}",
    ".XKSfm-L9AdLc .h1U9Be-YPqjbf, .zJtgdf-swAEc-bN97Pc .h1U9Be-YPqjbf, body.dkl3Ye .h1U9Be-YPqjbf {",
    "	padding-top: 12px;",
    "}",
    "/* Tools */",
    " .VIpgJd-TUo6Hb.XKSfm-L9AdLc.eo9XGd>.IZ65Hb-n0tgWb.IZ65Hb-QQhtn.oT9UPb>.IZ65Hb-TBnied>.IZ65Hb-yePe5c {",
    "	width:100% !important;",
    "	position:absolute !important;",
    "	bottom:0 !important;",
    "	left:0 !important;",
    "}",
    "/* Info */",
    " .IZ65Hb-jfdpUb {",
    "	padding:0px 15px !important",
    "}",
    "/* Fixed font size on dashboard */",
    ".IZ65Hb-YPqjbf.h1U9Be-YPqjbf.zfdrlf-WsjYwc-sLO9V {",
    "	font-size: 0.8rem !important;",
    "}",
    "/* No scroll bar on dashboard */",
    " body::-webkit-scrollbar {",
    "	width: 0px;",
    "}",
    "/* Fix Scroll bar in editor */",
    " .IZ65Hb-s2gQvd.r4nke-bJ69tf-ma6Yeb::-webkit-scrollbar {",
    "	width:10px !important;",
    "}",
    ".IZ65Hb-s2gQvd::-webkit-scrollbar {",
    "	width:0px !important;",
    "}"
  ].join("\n");
  if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
  } else if (typeof PRO_addStyle != "undefined") {
    PRO_addStyle(css);
  } else if (typeof addStyle != "undefined") {
    addStyle(css);
  } else {
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      heads[0].appendChild(node);
    } else {
      // no head yet, stick it whereever
      document.documentElement.appendChild(node);
    }
  }
})();