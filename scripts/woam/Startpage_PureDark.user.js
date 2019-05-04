// ==UserScript==
// @name Startpage_PureDark
// @description Simplify and darkened Starpage (&ixquick)
// @description:fr un thème sombre et simplifié pour Starpage (&ixquick)
// @include http://www.startpage.com/*
// @include https://www.startpage.com/*
// @include http://www.ixquick.com/*
// @include https://www.ixquick.com/*
// @author woam
// @version 1.2
// @date 1.0 : 2016-10-13
// @date 1.1 : 2016-10-16
// @date 1.2 : 2016-10-20
// Script inspired by those of agnostik_one and roipoussière
// http://tinyurl.com/hvofn3a & http://tinyurl.com/hj5q4h3
// But I changed quite a lot of thing u_u */
// Sorry about the french comments, but now that that's done...
// @namespace https://greasyfork.org/users/73143
// ==/UserScript==

/* --------------------------------> StartPage - PureDark   /  20-2016 <------------------------------ */

@namespace url(http://www.w3.org/1999/xhtml);

@-moz-document domain("startpage.com"), domain("ixquick.com") {

#home_wrap, #results, #content-box, #wrapper, #page-wrapper,.sidebar-collapse, .text-fields, input, .input_field, .wrapper-dropdown, .dropdown li,
.slide-menu li, #footer, .home-wrapper, #pics-lemmon-slider-id, .dropdown li:hover, #menu-id ul li a:hover, .set-heading, .toggle-content,
.toggle-label, .navbar .navbar-header {

    /* Couleur du Fond */
    
    background-color: #1D1E2A !important;
} 
    /* Couleur cadre saisie recherche - PageAccueil */
   .first input#query {
	border: 1px solid #474870 !important;
	border-radius: 12px;
	height: 42px;
	padding: 3px 40px 0 12px !important;
	}
     
    /* Cacher "Le moteur le plus confidentiel au monde" */
    p#caption a  {display:none!important;}
	    
    /* Couleur "Mettre un signet à cette recherche" */
   #bookmark_text.bookmark {
	color: #33623F !important;
}
    /* Cacher le lien vers Startmail */
.startmail-menu a {display: none;}

    /* Cacher le raccourci Options*/
          /*a#menu-icon-id {display: none;}*/ 
    
   /* Caractéristiques "Web / Images / Vidéos / Avancé" - PageAccueil */
    .top_menu a {
	text-decoration: none;
	color: #405680;
     font:15px'verdana';
	}

    /* Conserver la barre d'en-tête vide */
    .navbar .navbar-header {
    background-image: none !important;
    }
    
    /* Menu nombre de pages - PageRecherche */
    #pagenavigation #jumpsbar span.active, #pagenavigation .numbers span.active {
    color: #CB4338 !important;
    border-radius: 12px;
   /*background-color: #6182BC !important;*/ /*numéro de page entouré*/
    background-image: none !important;
    }

.result_url_heading, .result, #results .result h3 a, .slide-wrapper ul li a, 
#results .result h3 a, .slide-wrapper, .classified .relatedlist_wrap p a,
#bookmark_tip, p.sitelinks a:visited, p.sitelinks a, .sellerrating a:visited,
#head_left.non_js_tab a.active, #pagenavigation a {

    /* Couleur liens non visités  - PageRecherches */
        color: #6C95D0 !important;
    }

    /* Couleur nombre Résultats  - PageRecherches */
    .page_counter {
		color: #555679 !important;
    }
    
   /* Couleur Catégories  - PageRecherches */
        #head_left a {
        color: #4E5F69 !important;
    } 
    
    input {
    color: #FFFFFF !important;
    }

    /* Couleur "Ne cherchiez-vous pas plutôt :" */
    #results .result h3 {
	margin: 0;
	font-size: 16px;
	font-weight: normal;
	white-space: nowrap;
    border:1px;
    color: #5E648E !important;    
    }

    /* Couleur Proposition de recherche "Ne recherchiez-vous pas plutôt : */
    strong, b {
	font-family: 'Arial' !important;
	font-weight: normal !important;
    color: #59819B !important;
    }
    
    /* Couleurs URL sous les Résultats  - PageRecherches */     
.result .url, #side_bar2 ul#settings li a {
    color: #3D764B !important;
    }
    
    /* Couleur descriptif site  - PageRecherches */
    .result .desc{color: #838383 !important;}
    
    /* Couleur Texte bouton "ALLER"  - PageAccueil */
     input#submit1{color: #838383 !important;
    }
    
    /* Couleur  Texte Saisi  - PageAccueil */
     input#query{color: #7A9192 !important;
    }
    
    /* Couleur  Texte Saisi  - PageRecherches */
     input#query_top{color: #7A9192 !important;
    }    
    
    /* Bas de page "Recherches associées a :" */
    .classified .relatedtext {color: #6C9B69 !important;
    }
         
    /* Couleur liens visités  - PageRecherches */    
      #results .result h3 a:visited, .result a:visited .result_url_heading {
    color: #856C61 !important;
    }
    
       
    /* Couleur Slide-bar  - PageRecherches */    
    .side_list_menu li a {
        color: #506470 !important;    
    }
      
  /* Couleur "Le Web / Pages en Français / Pays : France"  - PageRecherches */    
   .location_filter li a {
	color: #555679;
    }   
        
    /* Couleur/Epaisseur Ligne séparation supérieure  - PageRecherches */
    
.navbar-default, .slide-wrapper .slide-menu>li:last-child {
    border-bottom: solid 2px #40435E  !important;
    }

    /* Couleur Cadre texte saisi  - PageRecherches */    
#field_size, .set-heading {
    border: 2px #40435E solid !important;
    border-radius: 2px;
    }

.navbar-default.navbar-static-side {
    border-bottom: none !important;
    }

    /* Couleur sélecteur "Web ,Images, Vidéos, Avancé"  - PageRecherches  */
.slide-wrapper .slide-menu, .slide-wrapper .slide-menu>li, .classified, .links_n.active {

    border-color: #555679 !important;
    }

    /* Couleur "Proxy - Mis en surbrillance"  - PageRecherches */    
.proxy {
    color: #444562 !important;
    }

   
    /* Conserver telle quelle l'icône paramètres - PageRecherches */
.settings_cont.inner-pages.three_line_menu {
    background: none;
    }
         
    /* Position bouton "Aller"  - PageAccueil */
   .go-btn input#submit1 {	
    border: 1px #2F304A solid !important;
    border-radius: 12px;
} 
  
    /*Caractéristiques bouton "Aller"  - PageRecherches */
   div#search input#submit1 {
    border: 2px #2F304A solid !important;
	font: 14px 'ProximaNova-Bold';
	text-align: center;
	height: 35px;
	} 
      
   /* Largeur cadre saisie - PageAccueil */
  form#search_form {
		width: 550px;    
    }  
  
   /* Position Croix "Effacer" - PageAccueil */ 
    .midline .midline_left .label .clear_search {	
	left: 500px;	
    }

  
    /* Affichage :
                none=Caché / inline=Affiché
    */ 
    
    /*  "Navigateur / Page Accueil"  - PageAccueil*/
    div#links{display:none}
   /* Lien  ?? */    
    div.footer_links_bottom_right{display:inline
    }
    /* "Renforcé par Google" */
    div#enhanced{display:none
    }
    /* Bouton "Aller" - PageAccueil */
    span.go-btn{display:inline
    }
    /* Bouton "Aller"  - PageRecherches */
    span.small-go-btn{display:inline
    }
    /* Bas-de-Page : Confidentialité + Bouton  - PageAccueil */
   .extended-scrollbtn-text {display: none;
    }
    .start-down-icon {display: none;
    }
    
    /* */
    div.intro{display:none;
    }
   
    span.pe_start{display:none;
    }
    
    ul#settings {display: none;
    }
    
  
    /* Cacher barre séparation supérieure */
    #head_left {
    border-bottom: none !important;     
    } 
    /* Cacher/Afficher Ligne séparation Slide-bar n°1 */
    .side_list_menu {
    border-bottom: none !important;
       /* border-bottom: 1px solid #31324F; */
    }
    /* Cacher/Afficher Ligne séparation Slide-bar n°2 */
    .location_filter {
   border-bottom: none !important;
       /*  border-bottom: 1px solid #31324F;*/
    }    
   /* Cacher Bas de page : "Startmail & Politique de confidentialité" - PageRecherches */
    .footer a {
	color: #31324F;
	text-decoration: underline;
    display:none!important;
    }
   /* Copyright Startpage - Bas de page - PageRecherches */
    .footer div.copyright {
	padding: 12px 0 0 600px;
	color: #E5452F;
	font-size: 13px;
	float: left;
    }
  /* Caractéristiques Bas de Page */
    #footer {
	position: relative;
	width: 100%;;
	margin: 0 auto;
	background: #1D1E2A!important;
	height: 28px;
	font-size: 12px;
	border-top: 2px solid #40435E;
	z-index: 5;
    }
  
    #sponsored_container1 {
    display: none !important;
    }
    
/* --------------------------------> Page Préférences <--------------------------------------- */    
    
    /* Couleur textes sélectionnés Menus déroulants - PagePréférences */
      .any-span, .dropdown li  {	
	      color: #756B5E !important;	
    } 
    
    /* Couleur propositions Menus déroulants - PagePréférences */
     .wrapper-dropdown .dropdown li a {
		   color: #857A6B;
	      font-size: 14px;
    }
  
     
    /* Couleur "Préférences" - PagePréférences */ 
    #wrapper-inner h1 {
	font-size: 37pt;
	letter-spacing: -2px;
	color: #D8412D;
	padding: 0;
	margin: 0;
}
  
    /* Couleur Fonds Catégories - PagePréférences */ 
     .set-heading, .set-heading h3  {
         background:none !important;
	      background-color: #252738 !important;
         border-radius: 12px!important; 
         border:1px #000000 !important;
    }
    
    /* Couleur Textes Catégories - PagePréférences */   
    #wrapper-inner .settings-wrapper .set-heading h3 {
	font-size: 22px;
	color: #678FCE;
}
    
    /* Taille Commentaires - PagePréférences */
    .settings-wrapper   {
	      font-size: 15px;
    } 
   
    /* Couleur texte Menus SlideBar droite - PageAccueil */
 .slide-wrapper ul li a, .slide-wrapper, .classified .relatedlist_wrap p a {
	color: #857A6B !important;
}
    /* Couleur Boutons génération URL - PagePréférences */
a.btn_green span, a.btn_green_b span, a.btn_green_lar span, a.btn_green_s span {
	background: #005B2E;
}

    /* Couleur Options - PagePréférences */
 .settings-wrapper .category-options .co-title {
	vertical-align: top;
	font-size: 16px;
	color: #846D40;
	padding: 2px 5px 0;
	display: inline-block;
}   
 
    
     /* ----------------------------- FIN  ------------------------------- */ 
 
}
