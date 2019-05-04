// ==UserScript==
// @name Wikiwand_PureDark
// @description Simplify and Darkened Wikiwand
// @description:fr un thème sombre et simplifié pour Wikiwand
// @include http://www.wikiwand.com/*
// @include https://www.wikiwand.com/*
// @author woam
// @version 1.0
// @date 1.0 : 2016-10-20
// @namespace https://greasyfork.org/users/73143
// ==/UserScript==




@namespace url(http://www.w3.org/1999/xhtml);
@-moz-document domain("wikiwand.com"), domain("ixquick.com") {

/*------------------------------------- PAGE PRINCIPALE ---------------------------------------- */
	

/*Couleur du Fond - Principale*/ 
#content {
	width: 82%;
background-color: #1D1E2A !important;	
	}
/*Couleur du Fond des Blocks - Principale*/	
body.light #article_content_wrapper.padded, body.light #body_wrapp {
	background-color: #27283E;
  }
		
/*Couleur du Texte - Principale */
.article_content {
	list-style: inherit;
	color: #808080 !important;
  }
	
/*Couleur Liens hypertexte - Principale */	
body.light a {
	color: #759A82 !important;
  }

/*Couleur Liens survolés - Principale */	
	body.light.mobile_webview a.active, body.light:not(.mobile_webview) a:hover {
	color: #009F50!important;
  }
		
/*Couleur Titres article - Principale */
	span {
	border: 0;
	margin: 0;
	padding: 0;
	color: #4B768A !important;
  }		

	/*Couleur Barre d'entête - Principale */
	#main_menu.navbar_opaque {
	background-color: rgba(87,91,96,.1);
  }
	
	/*Couleur Barre d'entête surimpression - Principale */
	body:not(.dark) #header.fold #main_menu.navbar_opaque {
	background-color: rgba(128,128,128,.4);
  }
		
	/*Couleur Barre d'entête sur photo - Principale */
	#main_menu {
	position: relative;
	height: 100%;
	background-color: rgba(245,255,245,.1);
	}

/*Couleur Boutons - Principale */	
#read_more a {
	margin: 5px 12px 5px 0;
	font-family: "Open Sans",sans-serif;
	color: #FFFF00;
	font-size: 13px;
	background-color: #2E3043;
	border-radius: 10px;
	}				

/*Couleur textes boutons - Principale */
	span.title.ng-binding {
color: #6C719B !important;
  }
	
/* Couleur de la mention "Un article de Wikipédia, l'encyclopédie libre" */	
body.light .title_wrapper h2 {
	color: #6C719B;
  }
	
/*Couleur des bordures tableaux - Principale */
table.wikitable > * > tr > td, table.wikitable > * > tr > th, table.wikitable > tr > td, table.wikitable > tr > th {
	border: 1px solid #333A51;
	padding: .3em .4em;
  }
	
	/*Couleur des titres tableaux - Principale */	
table.wikitable:not(.infobox):not(.ww_ib_1) th {
	font-weight: 700;
	font-size: 1.1em;
	background-color: rgba(0,0,0,.1);
	color:#4B768A!important;
  }	

	/*Couleur des textes tableaux - Principale */
	table {
	border-collapse: collapse;
		color:#928787!important;
  }
	
	/*Légende photo - Principale */
	#info_wrapper div, #info_wrapper table div, .infobox div, .infobox_v2 div, .infobox_v3 div, .sinottico div, .vertical-navbox div, .ww_ib div, dl#infoboxCountry div {
	margin: auto;
		color:#949EBC!important;
		background-color: #252738!important;
		border-radius:6px !important;
  }
	
/* Caractéristiques Pied de Page - Principale */
	.wikiwand_footer {
	position: relative;
	width: 100%;
	margin-top: 80px;
	text-align: center;
	float: left;
	padding: 0 10px;
	direction: ltr;
	font-family: Lora,serif;
	background-color: #efefef;
	letter-spacing: 0;
		/* Affiche:inline / Cache:none */
	display:none!important;
	}
	
	/* Couleurs titres barre droite */
		td.entete.map, th, tr {	
	color: #749FB4!important;
  }
	

/*----------------------------------- SIDEBAR ----------------------------------- */
	
	
	/*Couleur Texte - SideBar */
	#wikiwand_toc .toc_list > li > a {
	color: #808080 !important;
	padding: 1.5px 10px 1.5px 0;
  }
		
	/*Couleur Fond - SideBar */
#wikiwand_toc {
	position: relative;
	width: 90%;
	height: 100%;
	overflow: auto;
	background-color: #212332;
	font:15px'verdana';
  }
	
	/*Couleur Chapitre sélectionné - SideBar */
	#wikiwand_toc .toc_list > li.active {
	background-color: #343750;
  }
		
	/*Couleur de la barre d'entête - SideBar */
#toc_btn  {
	font-size: 23px;
	background-color: #2E3043 !important;
  }	
	
/* Largeur	SideBar */	
body:not(.touch) #wikiwand_toc {
	position: fixed;
	backface-visibility: hidden;
	width: 18%;
	}
		
	/* Affiche:inline / Cache:none  les Copyright - BasDePage */
.page_copyright {
		display:none!important;
  }
	
}	
/*------------------------------------------ FIN --------------------------------------- */ 
