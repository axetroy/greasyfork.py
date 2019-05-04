// ==UserScript==
// @name	Black Facebook Theme
// @namespace	ishygddt.xyz/BlackFacebook
// @description	A simple theme for Facebook to make many blue and colored elements a classier dark monochrome
// @match	*://www.facebook.com/*
// @version	1.7.10
// @license	https://opensource.org/licenses/MIT
// @supportURL	https://gitlab.com/James_E/BlackFacebook/issues
// @grant	GM_addStyle
// @icon	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAzUlEQVRIx+3VMQqDQBAFUM8hLlmHcSxCihxDr5CrBLxG6hwlB0iX1iqsFwi2P0XWBQVhRwkYyJ/KYh8u88Uk2UTSKnMGuslcWgXAOAIrh2BcAAiCUjkCQgBYfbxECY4H9mjwQI8XWtxw9e8bDRxwxziFBhA0mIZ1wH0dwOj9sTMIBgZWCwwRDG2RZcC0LWqAdT0QzKWNuwLPApe4HswDp7XAMfYK1n/5Qz5Pu9g1it95HoB81ILvr/EP/BxAbglAXQBszZ0WKJ623saP+Q0OX/df9nCdGQAAAABJRU5ErkJggg==
// ==/UserScript==

var favicon_link_html = document.createElement('link');
favicon_link_html.rel = 'icon';
favicon_link_html.href = 'http://ix.io/12UD';
favicon_link_html.type = 'image/x-icon';
try {
   document.getElementsByTagName('head')[0].appendChild( favicon_link_html );
}
catch(e) { }

GM_addStyle( "\
._9-- { \
   /* Small reaction faces used to display the top 3 reactions */ \
   background-image: url(\"//i.imgur.com/WYGLbHr.png?1\") !important; \
   /* THIS ALWAYS CHANGES */
} \
._2s1x ._2s1y { \
   background-color: rgb(51, 51, 51) !important; \
   border-bottom-color: rgb(47,47,47) !important; \
} \
a { \
   color: #222; \
} \
.uiButtonConfirm { \
   /* BUTTONS AFAIK, at least the Log In one */ \
   background-color: #222 !important; \
   border-color: #111 !important; \
} \
._4mq3 .fbNubFlyoutTitlebar { \
   background-color: black !important; \
} \
.uiSideHeader a,.nameText,a.uiHeaderActions { \
   color: #222 !important; \
} \
._58cn ._58cl { \
   color: inherit !important; \
} \
._585- { \
   border-color: rgb(152,152,152) !important; \
} \
._4jy1 { \
   border-color: #555 !important; \
   background-color: #484848 !important; \
} \
._3__- ._1nc6 ._d97 { \
   background-color: rgb(100, 100, 100) !important; \
} \
._4jy0:focus { \
    box-shadow: 0px 0px 1px 2px rgba(144, 144, 144, 0.75), 0px 1px 1px rgba(0, 0, 0, 0.3) !important; \
} \
._9jo li._54ne,._9jo li.navSubmenu._54ne a { \
   background-color: #222 !important; \
} \
._569t ._54ne ._54nc { \
   background-color: #222 !important; \
   border-color: rgb(41,41,41) !important; \
} \
._3__-._20fw ._50mz:active .fbNubFlyoutTitlebar, \
._3__-._20fw ._50mz.focusedTab .fbNubFlyoutTitlebar, \
._3__-._20fw ._50mz.highlightTitle .fbNubFlyoutTitlebar:hover, \
._3__-._20fw ._50mz .menuOpened .fbNubFlyoutTitlebar, \
._3__-._20fw ._50mz .menuOpened .fbNubFlyoutTitlebar:hover, \
._3__- ._50mz.highlightTitle .fbNubFlyoutTitlebar { \
   /* Title bar for chat */ \
   background-color: currentColor; \
   color: #222 !important; \
} \
._9-_ { \
   /* Large reaction faces that you click on to react */ \
   background-image: url(\"//i.imgur.com/Qi831ZV.png?1\") !important; \
} \
._5vsj .UFIComment .UFICommentLikeIcon { \
   /* Like icon for comments */ \
   background-image: url(\"//i.imgur.com/uAvYeLa.png\") !important; \
   background-position: 0px 0px !important; \
} \
.sp_Zn3YYJ5dTSI { \
   /* Left panel icons */ \
   background-image: url(\"//i.imgur.com/uifSQri.png?1\") !important; \
} \
.sp_Kjf28s29DtJ { \
   /* Left panel icons, maybe deprecated */ \
   background-image: url(\"//i.imgur.com/ET5GftF.png?1\") !important; \
} \
.sp_IOTsvnHKgp8 { \
   /* More left panel icons (PROBABLY just the Edit Profile one), maybe deprecated */ \
   background-image: url(\"//i.imgur.com/r1Gj5uv.png?1\") !important; \
} \
.sp_XJnaDr8Tsla { \
   /* Some left panel calendar icons */ \
   background-image: url(\"//i.imgur.com/QZCBloc.png?1\") !important; \
} \
.sp_OsACXE4JqRf { \
   /* More left panel calendar icons */ \
   background-image: url(\"//i.imgur.com/OmCa869.png?1\") !important; \
{ \
.sp_SO8onrRk42s { \
   /* Even more left panel calendar icons and stuff what is this, maybe deprecated \
   background-image: url(\"//i.imgur.com/AKw7WpQ.png?1\") !important; \
} \
.53jh { \
   /* Login screen banner */ \
   background-color: rgb(59, 59, 59) !important; \
   background-image: linear-gradient(rgb(78, 78, 78), rgb(59, 59, 69) 50%) !important; \
   border-bottom-color: rgb(19, 19, 19) !important; \
} \
.sp_beZQzZ7Rg6Q { \
   /* Login screen image */ \
   background-image: url(\"//i.imgur.com/w6nYu9u.png?1\") !important; \
} \
.greyscale { \
   /* UNUSED */ \
   filter: url(\"data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0 0 0 1 0\'/></filter></svg>#grayscale\"); \
} \
");
