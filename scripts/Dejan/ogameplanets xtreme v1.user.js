// ==UserScript==
// @description ogame skin 2
// @name ogameplanets xtreme v1
// @namespace ogame skin  
// @version 1.1    
// ==/UserScript==






img.planetPic{
top:6px!important;
left: 60px !important}


#myPlanets
{position: relative !important; left: 22px !important; top: 0px !important;}


#rechts {position: relative !important; left: 20px !important;}
#cutty #myPlanets {position: relative !important; left: 0px !important;}

/* -------------------------------------------------------------- */

.smallplanet{
text-align:left!important;
width:200px!important;
height:50px!important;
margin:0px 0 4px 0!important;
background:url("http://img20.imageshack.us/img20/3589/4v05.png") !important;
}
.smallplanet:hover
{background:url("http://img203.imageshack.us/img203/5926/m5hy.png") !important;}


a[class="planetlink active tipsStandard"]{
background:url("http://imageshack.com/a/img839/2307/9t5s.png") !important;
height:50px!important;
width:205px!important;
/*position: relative !important; top: -1px !important;*/}

/*a[class="planetlink active tipsStandard"]:hover{}*/

/* -------------------------------------------------------------- */

a.moonlink{
background:url("http://img59.imageshack.us/img59/6641/p6yv.png") no-repeat!important;
height:50px!important;
width:30px!important;
background-position:center center; 
position: relative !important; left: 0px !important; top: -53px !important;}

a.moonlink:hover{
background:url("http://img822.imageshack.us/img822/2725/v4moon2b.png") no-repeat!important;}


/* Fix a.moonlink activity */
div[class="smallplanet"][style="height: 52px;"] a.moonlink
{height:50px!important; position: relative !important; top: -50px !important;}


a[class="planetlink active tipsStandard"] + a.moonlink
{position: relative !important; top: -50px !important;}

a[class="planetlink active tipsStandard"] + a.alert + a.moonlink
{position: relative !important; top: -50px !important;}

div[class="smallplanet"][style="height: 52px;"] 
a[class="planetlink active tipsStandard"] + a.moonlink
{position: relative !important; top: -50px !important;}

 a.moonlink img.icon-moon{display:none!important}

/* -------------------------------------------------------------- */

.planet-name{
font-size: 11px !important;
color: #539fc8 !important;
text-shadow:0 0 5px #111!important;
font-weight: normal !important;
margin:0!important;
white-space:nowrap!important;
line-height:14px!important;
margin-top:0!important}

.smallplanet a.planetlink:hover span.planet-name
{color:#fb0 !important;}

.planet-koords{
color:#AAA!important;
text-shadow:0 0 10px #000!important;
font-size:11px!important;
font-weight: normal !important;
white-space:nowrap!important
}
/*.smallplanet a.planetlink:hover span.planet-koords
{color:#DDD!important;}*/

.smallplanet a.active span.planet-name
{color:#CCC!important;}



.planet-name{
position: relative !important;
top: 7px !important;
left: 100px!important;}

.planet-koords{
position: relative !important;
top: 7px !important;
left: 100px !important;}

/* -------------------------------------------------------------- */

.constructionName{
position:absolute!important;
top:35px!important;
left: 55px!important;
width: 200px !important;}

.constructionName{
color:#D43635 !important;
font-size:9px!important;
left:100px!important;
top:37px!important;
text-align:left!important}

.smallplanet:hover span.constructionName {color:#0f0!important}

a.constructionIcon img{display:none!important}

a.constructionIcon{
background:url("http://img577.imageshack.us/img577/725/v4cont.png")
no-repeat!important;
height:12px!important;
width:12px!important;
top:34px!important;
left:34px!important;}


img.planetPic{
top:8px!important;
left: 60px !important}


#countColonies
   {background:url("http://img842.imageshack.us/img842/5932/145x37.png")
    no-repeat !important;
    color:#888!important;
    height:32px!important;
    width: 145px !important;
    font-size:10px!important;
    line-height:0!important;
    font-weight:700!important;
    margin:0 0 0px 35px!important}

#countColonies p
{position: relative !important; top: 14px !important; left: -12px !important;}

#countColonies p span
{color: #ccc!important; font-weight:normal !important;}

/* -------------------------------------------------------------- */

/* ALERTA ATAQUE */
/*#myPlanets .alert{
position: relative !important;
top:-5px!important;
left:160px!important}*/

.smallplanet .activity img {display:none !important}

.smallplanet .activity{
position: relative !important; 
top: -3px !important; 
left:-89px!important;

height:12px!important;
width:12px!important;}

/* FIX Â¿Â¿Â¿??? */
a.alert[style="left: 132px; top: 0px;"]
{top: 22px !important; 
left:123px!important;}



/* -------------------------------------------------------------- */


a.moonlink.active{
background:url("http://imageshack.com/a/img19/9481/h3tv.png") no-repeat!important;}


a.planetlink.active{
background:url("http://s2.postimg.org/o4dr3ez55/new5.png") no-repeat!important;}

#rechts a.alert span.activity {
    background: url("http://gf1.geo.gfsrv.net/cdn94/297ee218d94064df0a66bd41a04d28.png") no-repeat scroll 0px -655px transparent !important;
    display: block !important;
    left: 13px !important;
    top: 13px !important;
    height: 12px !important;
    width: 12px !important;}
}