// ==UserScript==
// @description ogame skin 4
// @name ogamerest xtreme v1
// @namespace ogame skin  
// @version 1.2
// @license         MPL 2.0
// @icon            https://addons.cdn.mozilla.net/media/img/addon-icons/default-32.png
// @icon64URL       https://addons.cdn.mozilla.net/media/img/addon-icons/default-64.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Add-ons+Manager+-+Stylish+-+Install+style+from+URL
// @homepageURL     https://greasyfork.org/scripts/192
// @supportURL      https://greasyfork.org/scripts/192/feedback
// @screenshot      https://raw.github.com/LouCypher/userscripts/master/scriptish/addons-manager-stylish-install-style-from-url/screenshot.png
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/scriptish/addons-manager-stylish-install-style-from-url/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/MPL/LICENSE.txt
// @run-at          document-end
// @include         about:addons
// @include         chrome://mozapps/content/extensions/extensions.xul
// ==/UserScript==

function $(aId) document.getElementById(aId);

var stylishMenu = document.createElement("menuitem");
stylishMenu.id = "stylish-menuitem-installFromURL";
stylishMenu.setAttribute("label", "Install User Style from URL\u2026");
stylishMenu.setAttribute("oncommand", "stylishCommon.startInstallFromUrls();");

// If Stylish is not installed or Stylish version is earlier than 1.4
if (!("stylishCommon" in window && "startInstallFromUrls" in stylishCommon))
  stylishMenu.setAttribute("disabled", "true"); // Disable menuitem

$("utils-menu").insertBefore(stylishMenu, $("scriptish-installFromFile").nextSibling);


.ago_planets_arrow_moon {
    display: none !important;
    
}

.ago_planets_arrow_planet {
    display: none !important;
    
}

.ago_shortcuts_content span.ago_shortcuts_ownmoon {
   left: -40px!important;
}



.ago_shortcuts_content span {
   
    
 
    overflow: visible !important;
}

.undermark {
    color: orange !important;
}

.premiumHighligt span {
    color: cyan !important;
}

#ago_summary_routine {

    display: none !important;
    width: 1px !important;
    min-height: 2px !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    line-height: 22px !important;
    color: rgb(111, 159, 200) !important;
    margin: 0px 0px 0px 3px !important;
    padding: 2px 0px 1px 8px !important;
    
}

 #star2, #changelog_link {
    display: block !important;
}

.content-box-s .construction th {
     text-align: center !important;
}



.m9enu_icon .menuImage.active.station {
    background-image:url("http://imageshack.com/a/img208/5910/nu8e.png")!important;
}


.m9enu_icon .menuImage.active.fleet1 {
     background-image:url("http://imageshack.com/a/img208/5910/nu8e.png")!important;
}

.m9enu_icon .menuImage.active.overview{
     background-image:url("http://imageshack.com/a/img208/5910/nu8e.png")!important;
}


#links .leftmenu a.menubutton:link, #links .leftmenu a.menubutton:visited, .no-touch #links .leftmenu a.menubutton:hover, #links .leftmenu a.menubutton:active {
   

    font-size: 10px !important;
    
   text-shadow:0 0 5px #000!important;
    line-height: 23px !important;
}


#planetdata td {
    padding: 1px 5px  !important;
    
}
    

#planet h2 a:link, #planet h2 a:visited, .no-touch #planet h2 a:hover, #planet h2 a:active {
    
padding: 3px 0px  !important;
    
}

#galaxy div.activity.minute15 {
    background: url("http://imageshack.com/a/img59/6231/kdtb.png") no-repeat scroll 0px -656px transparent !important;
    height: 16px !important;
    width: 16px !important;
}

.icon, .icon_link, .icon12px {
    background: url("http://imageshack.com/a/img32/1598/6xlu.png") no-repeat scroll 0% 0% transparent !important;
    display: inline-block !important;
    height: 16px !important;
    width: 16px !important;
}

.icon12px.icon_wrench {
    background-position: 0px -672px !important;
}

.icon.icon_trash:hover {
    background-position: 0px -320px !important;
}

.icon.icon_trash {
    background-position: 0px -320px !important;
}

.icon.icon_mail:hover {
    background-position: 0px -192px !important;
}

.icon.icon_mail {
    background-position: 0px -192px !important;
}

.icon.icon_eye:hover {
    background-position: 0px -128px !important;
}

.icon.icon_eye {
    background-position: 0px -128px !important;
}

.planetMoveIcons {
    background-image: url("http://imageshack.com/a/img59/6231/kdtb.png") !important;
    background-repeat: no-repeat;
    background-position: 0px -384px !important;
}

.icon.icon_user{
    background-position: 0px -416px !important;
}

.icon.icon_user:hover {
    background-position: 0px -416px !important;
}

.icon.icon_missile:hover {
    background-position: 0px -160px !important;
}

.icon.icon_missile {
    background-position: 0px -160px !important;
}

.icon.icon_recall {
    background-position: 0px -576px !important;
}

.icon.icon_rewind:hover {
    background-position: 0px -384px !important;
}

.icon.icon_rewind {
    background-position: 0px -384px !important;
}

.icon.icon_skip_back:hover {
    background-position: 0px -496px !important;
}

.icon.icon_skip_back {
    background-position: 0px -496px !important;
}

.icon.icon_fastforward:hover {
    background-position: 0px -448px !important;
}

.icon.icon_fastforward {
    background-position: 0px -448px !important;
}

.icon.icon_skip:hover {
    background-position: 0px -512px !important;
}

.icon.icon_skip {
    background-position: 0px -512px !important;
}

#galaxy div.activity.showMinutes {
    width: 15px !important;
    background-color: rgb(0, 0, 0) !important;
    color: rgb(255, 255, 255) !important;
    padding: 0px 1px 1px 0px !important;
    border: 0px solid rgb(255, 168, 0) !important;
    border-radius: 3px 3px 3px 3px !important;
}


#netz table#mail td span.coordinates a, #netz .contentz table#mailz .subject a:link, #netz .contentz table#mailz .subject a:visited, #netz .contentz table#mailz .subject a:active {
    c'olor: rgb(0, 80, 60) !important;
    
      

        
}

.infohead table th, .infohead table td, .messagebox td.pages {
    
    color: rgb(200, 200, 200) !important;
}




#netz .contentz table td {
    color: rgb(102, 122, 132) !important;
    
}

.icon.icon_info {
    background-position: 0px -560px !important;
}

.icon.icon_info:hover {
    background-position: 0px -560px !important;
}


.ago_construction_finishtime {
    color: grey !important;
    font-size: 10px !important;
}

#planetdata a:link, #planetdata a:visited, .no-touch #planetdata a:hover, #planetdata a:active {
    color: rgb(150, 150, 150) !important;
    cursor: pointer !important;
    text-decoration: none !important;

}

.icon.icon_reload {
    background-position: 0px -32px !important;
}


#i9nhalt .content-box-s .content table.construction.active {
    background: -moz-linear-gradient(center top , rgb(23, 29, 35) 0px, rgb(16, 20, 25) 100%) repeat scroll 0% 0% transparent !important;
    border: 1px solid rgb(23, 29, 35) !important;
    border-radius: 3px 3px 3px 3px !important;
    width: 93% !important;
    position: relative !important; left: 6px !important; top: 2px !important;
    
    
}





.ago_planets_construction {
    
    color: rgb(220, 80, 60) !important;
    
}


.ago_planets_construction_moon {
    font-size: 0px !important;
    line-height: 9px !important;
    color: rgb(190, 190, 190)!important;
    position: absolute !important;
    white-space: nowrap !important;
    left: 85px !important;
    top: -2px  !important;
}


.ago_items_finishtime {
    color: 		#A0A0A0 
 

 
 !important;
    font-weight: 600 !important;
    padding: 2px 0px 0px 13px !important;
}

.ago_jumpgate_cooldown {
    font-size: 7px !important;
    font-weight: bold !important;
    line-height: 0px !important;
    padding: 0px 0px 0px !important;
    top: 10px  !important;
    left: 19px  !important;
    color: rgb (253, 138, 28) !important;
    border: 0px solid rgb(0, 0, 0) !important;
}

#fleet1 .allornonewrap {
    padding-bottom: 5px!important;
    top: 9px!important;
    
    
  
}

#fleet1 #planet, #fleet1 #planet.shortHeader, #fleet2 #planet, #fleet2 #planet.shortHeader, #fleet3 #planet, #fleet3 #planet.shortHeader {
   
    height: 250px!important;
    margin-bottom: 0px !important;
    overflow: hidden !important;
}



#rechts a.planetlink.active .planetPic {
   box-shadow: 0px 0px 2px 1px rgb(153, 204, 0), 0px 0px 1px 0px rgb(153, 204, 20) inset !important;
  

}


#0mmonetbar #0mmoNews #0mmoNewsticker ul li a {
height: 20px!important; /*width of new image*/ 
padding-left:245px!important; /*height of new image*/
width:0!important;background-image:url("http://img11.imageshack.us/img11/1425/capturezxy.png")!important}
}



.ago_planets_construction_moon {
    font-size: 9px !important;
    line-height: 9px !important;
    color: rgb(132, 132, 132)!important;
    position: absolute !important;
    white-space: nowrap !important;
    left: 0px !important;
    top: 39px  !important;
}

.ago_planets_construction {
    font-size: 9px !important;
    line-height: 9px !important;
    color: rgb(190, 190, 190)!important;
    position: absolute !important;
    white-space: nowrap !important;
    left: 100px !important;
    top: 38px  !important;
}


#planet h2 {
    color: rgb(255, 255, 255) !important;
    font: bold 17px/22px Charlemagne Std !important;
    white-space: nowrap !important;
    
a.planetlink:hover .planetPic, #rechts a.planetlink:active .planetPic  {
    box-shadow: 0px 0px 2px 1px rgb(153, 204, 0), 0px 0px 1px 0px rgb(153, 204, 20) inset !important;
}

#rechts a.planetlink.active .planetPic {
   box-shadow: 0px 0px 2px 1px rgb(153, 204, 0), 0px 0px 1px 0px rgb(153, 204, 20) inset !important;
  

}



