// ==UserScript==
// @name         OddWH RaidTable
// @namespace    http://tampermonkey.net/
// @version      0.4.2
// @description  Créateur OddWH
// @author       OddWH
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @include     	*.ogame*gameforge.com/game/index.php?page=messages
// ==/UserScript==
/* jshint -W097 */
'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ZONE CSS ////////////////////////////////////////////////////////////////////////////////////////////////CSS AREA/////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var MetaGlobal = MetaDatas();

var Picture = {};
    Picture.Attack = '"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAAK/INwWK6QAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAA9QTFRF////ERohKT9OGCQt////xekcDAAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUUlEQVQI1z3O0QnAQAiD4XguoO0CV7qAbfbf7S5Cm6ePHwSBb5a9gG0HICgIphINBcGOK4TMOXTl5Bxkwd3fu0oACcHghdjAST4QVDaMvfi/WNC7CBtD82AsAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA1LTE4VDIxOjQ5OjM1KzAyOjAwxD15VgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wNS0xOFQyMTo0OTozNSswMjowMLVgweoAAABKdEVYdHNpZ25hdHVyZQA0MDdjN2E2YTVlZjRkNWEwZmQ3YmYzYTZkMjEzZTQxNTc1ZjVmZmVkMWVhZGEwYjVjY2UyZmM0ZWQ2ZjJjMzY4RTAYDAAAAABJRU5ErkJggg=="';
    Picture.Delete = '"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQAgMAAAC0OM2XAAAABGdBTUEAAK/INwWK6QAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAxQTFRF////ERohGCQt////TqQTdwAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAO0lEQVQI12NgAAHR0NAABlEH1gAGAQYgYgwNZWAQcXUJYBBxgREaHR0LMIhVK4AEA8MCBqlVqxaATQIAQGARmtdXRBkAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDUtMTlUMjE6MjY6MDUrMDI6MDD9ZH7qAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTA1LTE5VDIxOjI2OjA1KzAyOjAwjDnGVgAAAEp0RVh0c2lnbmF0dXJlAGYyMjAyNjVlMzFjYjRjODY3NWI5ZWYxNTU2YTVlNGM5OGMwZTg0OTMwZTc0ZWIxMmQxMDk5NjJkNWJmZWJlZDdTCRapAAAAAElFTkSuQmCC"';
    Picture.Message = '"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAAK/INwWK6QAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAA9QTFRF////ERoh7RwkGCQt////eP04VgAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUElEQVQI11XOUQrAIAwD0NRcwHmC6QkKuf/dlgpuLB/yiIUWOIkxL6d/aGvNP2LcNWm0KmBE+KMbTInZQQpQprGbAuXCgBwYWRv9Ujv5XvEAY0YJ1r8Dex4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDUtMTlUMjE6NDE6MjUrMDI6MDC1KKitAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTA1LTE5VDIxOjQxOjI1KzAyOjAwxHUQEQAAAEp0RVh0c2lnbmF0dXJlADAzOGUzY2E5Nzk3N2Y1NzM0MTM2ZTlkMWVlMTBhYmNmMDBlNjhlMmY3ZjdhNjY2N2M1ZDRlM2Q2Y2M4M2YzMTYencQXAAAAAElFTkSuQmCC"';

GM_addStyle(".InfosVague { border: 1px solid #555; border-radius: 0px 0px 25px 25px; margin-top: 5px  } "); //bord du tableau
GM_addStyle(".TableauRaid { text-align: center; width: 100%;} "); //bord du tableau

//Ligne d'entête
GM_addStyle(".FirstLine { text-align: center; height: 30px; font-weight: bold; border-left: 1px solid #333;} "); //lignes de tête

//Toutes les lignes à l'intérieur du tableau
GM_addStyle(".InsideBoard { text-align: center; border-left: 1px solid #333;} "); //lignes contenant les RE


//Lignes spécifiques
GM_addStyle(".Line {width: 30px; border-left: 1px solid #222;}");
GM_addStyle(".Coord {height: 21px;}");
GM_addStyle(".PTGT {width: 18px ;}");

//Lignes paires et impaires
GM_addStyle(".Pair { background-color: #111A21;}"); //lignes paires
GM_addStyle(".Impair { background-color: #18242d;}"); //lignes impaires
if ((GM_getValue('color0' +  MetaGlobal.Universe))) { //Vérifie la présence de contenu sauvegardé
    GM_addStyle(".Pair:hover { background-image: linear-gradient(to bottom, #" + GM_getValue('color0' +  MetaGlobal.Universe) + " 0%, #111A21 30%, #111A21 70%, #" + GM_getValue('color0' + MetaGlobal.Universe) + " 100%); "); //lignes paires, le get value récupère la couleur enregistrée par l'utilisateur
    GM_addStyle(".Impair:hover { background-image: linear-gradient(to bottom, #" + GM_getValue('color0' + MetaGlobal.Universe) + " 0%, #111A21 30%, #111A21 70%, #" + GM_getValue('color0' + MetaGlobal.Universe) + " 100%); "); //lignes impaires, le get value récupère la couleur enregistrée par l'utilisateur
} else { //Lorsque le getvalue renvoie rien, le style par défaut est appliqué (ça arrive lorsque l'utilisateur n'entre rien ou lorsqu'il n'est pas encore passé dans les options
    GM_addStyle(".Pair:hover { background-image: linear-gradient(to bottom, #0C8528 0%, #111A21 30%, #111A21 70%, #0C8528 100%); "); //attribution du style par défaut lorsqu'aucune préférence n'est enregistrée
    GM_addStyle(".Impair:hover { background-image: linear-gradient(to bottom, #0C8528 0%, #18242D 30%, #18242D 70%, #0C8528 100%);}"); //lignes impaires
}

//Boutons attaque
if ((GM_getValue('color1' + MetaGlobal.Universe))) { //Vérifie la présence de contenu sauvegardé, le if fait exactement la même chose que pour les lignes paires et impaires juste au dessus (explications dispo à cet endroit-là)
    GM_addStyle(".AttackButton:link {display: block; width: 16px; height:16px; background-image: url(" + Picture.Attack + "); background-color: #" + GM_getValue('color1' + MetaGlobal.Universe) + ";}");
} else {
    GM_addStyle(".AttackButton:link {display: block; width: 16px; height:16px; background-image: url(" + Picture.Attack + "); background-color: #ffffff;}");
}
if ((GM_getValue('color2' + MetaGlobal.Universe))) {
    GM_addStyle(".AttackButton:hover {background-color: #" + GM_getValue('color2' + MetaGlobal.Universe) +";}");
} else {
    GM_addStyle(".AttackButton:hover {background-color: #00ff00;}");
}
//Lien Galaxie
GM_addStyle(".CoordLink:link, .CoordLink:visited, CoordLink:active, CoordLink:hover {text-decoration: none; color: white;}");

//Bouton supprimer message et bouton plus de détails
GM_addStyle("#DeleteA {display: block; width: 15px; height:16px; background-image: url(" + Picture.Delete + "); background-color: #FFFFFF;}");
GM_addStyle("#MoreDetails:link {display: block; width: 16px; height:16px; background-image: url(" + Picture.Message + "); background-color: #FFFFFF;}");

//Tableau d'entête avec tous les boutons
GM_addStyle(".TableButton {text-align: center; width: 100%;}");
GM_addStyle(".CaseTableButton {display:inline; border: 1px solid #444; margin-left: 5px");
GM_addStyle(".CaseTableButton:hover {display:inline; border: 1px solid #666; margin-left: 5px");


//Tableau des options
GM_addStyle("#OptionsDiv { border: 1px solid #555; text-align: center; width: 100%; border-radius: 0px 0px 25px 25px; margin-top: 5px;  } "); //bord du tableau
GM_addStyle("#OptionsMainTable {background-color : #000000; border: 1px solid #222; width: 100%} "); //bord du tableau
GM_addStyle(".OptionsMainLine { text-align: center; border-bottom: 1px solid #222; width: 100%; height: 30px} "); //Lignes principales à dérouler
GM_addStyle(".LastMainLine {text-align: center; width: 100%; height: 30px; border-bottom: 1px solid #222} "); //Lignes principales à dérouler
GM_addStyle("#SauvegarderOptions {text-align: center; width: 100%; height: 30px;} "); //Bouton sauvegarder en bas des options
GM_addStyle("#SauvegarderOptions:hover {text-align: center; width: 100%; height: 30px; background-image: radial-gradient(ellipse closest-corner at center, #242424 0%, #000000 80%, #000000 80%, #FFFFFF 84%, #000000 100%););} "); //Bouton sauvegarder en bas des options


GM_addStyle(".OptionsColonnes {width: 100%;} "); //Lignes principales à dérouler
GM_addStyle(".TableauZoneColonnes {width: 100%; display:inline;}"); //Lignes principales à dérouler
GM_addStyle(".OptionsColonnesContent {text-align: left; width: 100%; height: 20px; width: 100%; } "); //Lignes principales à dérouler

GM_addStyle(".OptionsCouleurs {width: 100%;} "); //Lignes principales à dérouler
GM_addStyle(".TableauZoneCouleurs {width: 100%; display:inline;}"); //Lignes principales à dérouler
GM_addStyle(".OptionsCouleursContent {text-align: left; width: 100%; height: 20px; width: 100%; } "); //Lignes principales à dérouler

GM_addStyle(".DropDownShipsMore {text-align:center ;width:40px;}");


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FONCTION D-AFFICHAGE DU SCRIPT////////////////////////////////////////////////////////DISPLAY BOARD FUNCTIONS/////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Display() //Cette fonction génère les boutons du haut
{
    var MetaLocal = MetaDatas();
    var DisplayButton = document.createElement("div"); //Création d'un élément div
    DisplayButton.innerHTML = BoardButton(); //Appel de la fonction affichant les boutons du dessus

    document.querySelector("#ui-id-14 .tab_inner:first-child").insertBefore(DisplayButton, document.querySelector("#ui-id-14 .tab_inner:first-child").firstChild); //Affichage des boutons
    try { //désactive l'affichage de la ligne indiquant qu'il n'y a aucun message (lorsqu'il y a aucun message)
        document.querySelector(".no_msg").style.display='none';
    } catch(err) {
    }



    //Assignation des fonctions des boutons

    document.getElementById('AfficherTableau').addEventListener("click", function(event) //Création du bouton permettant l'affichage du tableau
                                                                {
        InitialisationTableau();
    }, true);

    document.getElementById('CollecterMessages').addEventListener("click", function(event) //Création du bouton permettant la collecte et la sauvegarde des messages
                                                                  {
        CollectAndStoreRE();
    }, true);

    document.getElementById('MasquerTableau').addEventListener("click", function(event) //Création du bouton permettant la collecte et la sauvegarde des messages
                                                               {
    try {//Permet d'effacer le tableau s'il est déjà présent
        var Empty = '';
        var Table = document.querySelector(".InfosVague");
        if(Table.outerHTML) {
            Table.outerHTML = Empty;
            setTimeout(function() { GM_addStyle("#AfficherTableau { color: inherit;}");}, 10); //Recolorie le bouton afficher dans sa couleur d'origine
        }
    } catch(err) {}
    try {//Permet d'effacer le tableau d'informations s'il est déjà présent
        var Empty = '';
        var Table = document.querySelector("#DIVINFO");
        if(Table.outerHTML) {
            Table.outerHTML = Empty;
        }
    } catch(err) {}
    }, true);

    document.getElementById('OptionsButton').addEventListener("click", function(event) //Création du bouton permettant la collecte et la sauvegarde des messages
                                                              {
    OptionsButton();
    }, true);

    document.getElementById('Empty').addEventListener("click", function(event) //Création du bouton permettant la collecte et la sauvegarde des messages
                                                      {
        EmptyTable();
    }, true);

    //Si l'utilisateur a choisi de collecter automatiquement les REs, alors on les collecte
    if (GM_getValue('column22' + MetaLocal.Universe) === true) {
            CollectAndStoreRE();
    }

    //Si l'utilisateur a choisi d'afficher automatiquement le tableau, alors on l'affiche
    if (GM_getValue('column21' + MetaLocal.Universe) === true) {
        InitialisationTableau();
    }
}

//Fonction de création des boutons du tableau
function BoardButton()
{
    var TableauBoutons = '<div class ="TableButton">' +
                              '<ul class ="LigneTableButton">' +
                                   '<li class ="CaseTableButton" id="AfficherTableau">   Afficher Tableau   </td>' +
                                   '<li class ="CaseTableButton" id="CollecterMessages">   Collecter Messages   </td>' +
                                   '<li class ="CaseTableButton" id="MasquerTableau"> Masquer Tableau </td>' +
                                   '<li class ="CaseTableButton" id="OptionsButton">Options</td>' +
                                   '<li class ="CaseTableButton" id="Empty">Vider script</td>' +
                                   '<li class ="CaseTableButton"></td>' +
                              '</ul></div>';
    return TableauBoutons;
}


///////////////////////////
function InitialisationTableau() {
    if (GetStoredRE(0)) { //Vérifie la présence de RE dans le tableau et n'affiche pas le tableau si rien n'est trouvé
        try {//Permet d'effacer le tableau s'il est déjà présent
            var Empty = '';
            var Table = document.querySelector(".InfosVague");
            if(Table.outerHTML) {
                Table.outerHTML = Empty;
            }

        } catch(err) {}
        try {//Permet d'effacer le tableau d'informations s'il est déjà présent
            var Empty = '';
            var Table = document.querySelector("#DIVINFO");
            if(Table.outerHTML) {
                Table.outerHTML = Empty;
            }
        } catch(err) {}
        try {//Permet d'effacer le tableau d'options s'il est déjà présent
            var Empty = '';
            var Table = document.querySelector("#OptionsDiv");
            if(Table.outerHTML) {
                Table.outerHTML = Empty;
            }
        } catch(err) {}

        GM_addStyle("#AfficherTableau {color : #FFAA00;}"); //Colorie le bouton en orange pour indiquer que l'affichage est en cours d'execution
        var TableauRE = MsgBoard();
        //Tri du tableau
        TableauRE.sort(Tri);
        var NbItemsTableau = TableauRE.length;
        var MetaLocal = MetaDatas();
        //alert(NbItemsTableau);

        var DisplayInfos = 0;
        if (GM_getValue('column17' + MetaLocal.Universe) === false || GM_getValue('column17' + MetaLocal.Universe) === true) { //Vérifie si l'utilisateur a choisi d'afficher le tableau d'infos (je sais, l'id dans get value n'est pas explicite) -- Par défaut, le tableau s'affiche
            if (GM_getValue('column17' + MetaLocal.Universe) === true) {
                DisplayInfos = 1;
            }
        } else {
            DisplayInfos = 1
        }
        if (DisplayInfos == 1) {
            var TableauHTMLInfo = InfoDatasBoard(TableauRE); //Tableau d'infos
            var newElementA = document.createElement("div");
            newElementA.innerHTML = TableauHTMLInfo;
            document.querySelector("#ui-id-14 .TableButton:first-child").insertBefore(newElementA, document.querySelector("#ui-id-14 .TableButton:first-child").nextSibling);
        }


        var TableauHTML = CreateBoardHTML(TableauRE); //Tableau de pillage
        var Design = TableauHTML;
        var newElement = document.createElement("div"); // On crée un nouvelle élément div
        newElement.innerHTML = Design; // On écrit le code source qu'il contient
        document.querySelector("#ui-id-14 .TableButton:first-child").insertBefore(newElement, document.querySelector("#ui-id-14 .TableButton:first-child").nextSibling);
        GM_addStyle("#AfficherTableau { color: #00FF00;}");//Indique à l'utilisateur que le tableau s'est bien executé en passant la couleur du texte du bouton "afficher tableau" en vert





        //Boutons présents à l'intérieur du tableau

        ////Bouton suppression de chaque ligne
        for (var i=0; i < NbItemsTableau; i++){
            document.querySelectorAll('#DeleteButton')[i].addEventListener("click", function(event)                                                  {
                var IdLine = this.parentNode.id;
                this.parentNode.style.display='none'; //Suppression de l'affichage de la ligne
                var TextStoredLine = GetStoredRE(IdLine);
                var ObjLine = ConvertStringToObj(TextStoredLine);
                ObjLine.Display = 0;
                SetStoredRE(IdLine, ObjLine);
            }, true);
            document.querySelectorAll('#AttackPTButton')[i].addEventListener("click", function(event)                                                  {
                var PtAttacked = 1;
                var IdLine = this.parentNode.id;
                var TextStoredLine = GetStoredRE(IdLine);
                var ObjLine = ConvertStringToObj(TextStoredLine);
                ObjLine.PTAttacked = 1; //Mise en mémoire permettant de d'enregistrer en dur que le bouton a été cliqué
                SetStoredRE(IdLine, ObjLine);
                if ((GM_getValue('color3' + MetaLocal.Universe))) {
                GM_addStyle("#PT" + IdLine + ".AttackButton:visited, #PT" + IdLine + ".AttackButton:active { background-color: #" + GM_getValue('color3' + MetaLocal.Universe) + ";}"); //Cette ligne CSS s'applique uniquement lorsque l'utilisateur clique sur le bouton et permet d'afficher sur le tableau que le bouton a été cliqué. Elle ne permet pas de mise ne mémoire et vu qu'à chaque rafraichissement, il faut recliquer sur le bouton pour l'activer, il n'y a pas de mise en mémoire des liens cliqués à proprement parler.
                } else {
                    GM_addStyle("#PT" + IdLine + ".AttackButton:visited, #PT" + IdLine + ".AttackButton:active { background-color: #00ff00;}");
                }
            }, true);
            document.querySelectorAll('#AttackGTButton')[i].addEventListener("click", function(event)                                                  {
                var GtAttacked = 1;
                var IdLine = this.parentNode.id;
                var TextStoredLine = GetStoredRE(IdLine);
                var ObjLine = ConvertStringToObj(TextStoredLine);
                ObjLine.GTAttacked = 1; //Mise en mémoire permettant de d'enregistrer en dur que le bouton a été cliqué
                SetStoredRE(IdLine, ObjLine);
                if ((GM_getValue('color3' + MetaLocal.Universe))) { //If de vérification de présence d'une donnée dans color3 (fonctionne comme les lignes paires et impaires dans la zone css
                    GM_addStyle("#GT" + IdLine + ".AttackButton:visited, #GT" + IdLine + ".AttackButton:active { background-color: #" + GM_getValue('color3' + MetaLocal.Universe) + ";}"); //Cette ligne CSS s'applique uniquement lorsque l'utilisateur clique sur le bouton et permet d'afficher sur le tableau que le bouton a été cliqué. Elle ne permet pas de mise ne mémoire et vu qu'à chaque rafraichissement, il faut recliquer sur le bouton pour l'activer, il n'y a pas de mise en mémoire des liens cliqués à proprement parler.
                } else {
                    GM_addStyle("#GT" + IdLine + ".AttackButton:visited, #GT" + IdLine + ".AttackButton:active { background-color: #00ff00;}");
                }
            }, true);
        }
    }
}


//Fonction de création du tableau HTML
function CreateBoardHTML(DatasMsg) //mettre un second attribut qui définira si la création concerne la corbeille ou le vrai tableau *-*
{
    //Toutes les variables ci dessous récupèrent les options dans la partie "affichage des colonnes" des options (fonction OptionsButton)
    var DisplayLeftLine = 1;
    var DisplayCoord = 1;
    var DisplayFlotte = 1;
    var DisplayDefense = 1;
    var DisplayLoot = 1;
    var DisplayPlayer = 1;
    var DisplayLinkPT = 1;
    var DisplayLinkGT = 1;
    var DisplayHour = 1;
    var DisplayDelete = 1;
    var DisplayMoreDetails = 1;
    var MetaLocal = MetaDatas();
    if (GM_getValue('column0' + MetaLocal.Universe) === false || GM_getValue('column0' + MetaLocal.Universe) === true) { //Si une valeur a été enregistrée
        DisplayLeftLine = GM_getValue('column0' + MetaLocal.Universe);
        var DisplayRightLine = GM_getValue('column1' + MetaLocal.Universe);
        DisplayCoord = GM_getValue('column2' + MetaLocal.Universe);
        var DisplayMetal = GM_getValue('column3' + MetaLocal.Universe);
        var DisplayCristal = GM_getValue('column4' + MetaLocal.Universe);
        var DisplayDeut = GM_getValue('column5' + MetaLocal.Universe);
        var DisplayTotal = GM_getValue('column6' + MetaLocal.Universe);
        var DisplayButinRatio = GM_getValue('column7' + MetaLocal.Universe);
        DisplayFlotte = GM_getValue('column8' + MetaLocal.Universe);
        DisplayDefense = GM_getValue('column9' + MetaLocal.Universe);
        DisplayLoot = GM_getValue('column10' + MetaLocal.Universe);
        DisplayPlayer = GM_getValue('column11' + MetaLocal.Universe);
        DisplayLinkPT = GM_getValue('column12' + MetaLocal.Universe);
        DisplayLinkGT = GM_getValue('column13' + MetaLocal.Universe);
        DisplayHour = GM_getValue('column14' + MetaLocal.Universe);
        DisplayDelete = GM_getValue('column15' + MetaLocal.Universe);
        DisplayMoreDetails = GM_getValue('column16' + MetaLocal.Universe);
    }
    //Récupération de la valeur choisie par l'utilisateur pour le non affichage des lignes selon certains critères
    if (GM_getValue('text5' + MetaLocal.Universe)) { //Vérifie la présence d'une donnée sauvegardée --------------- FLOTTE
        var FlotteMaxi = GM_getValue('text5' + MetaLocal.Universe);
    } else { //Si aucune donnée sauvegardée, attribution d'une valeur par défaut
        var FlotteMaxi = 999999999999;
    }
    if (GM_getValue('text6' + MetaLocal.Universe)) { //Vérifie la présence d'une donnée sauvegardée ------------------- DEFENSE
        var DefenseMaxi = GM_getValue('text6' + MetaLocal.Universe);
    } else { //Si aucune donnée sauvegardée, attribution d'une valeur par défaut
        var DefenseMaxi = 999999999999;
    }
    if (GM_getValue('text7' + MetaLocal.Universe)) { //Vérifie la présence d'une donnée sauvegardée ------------------- AGE
        var AgeMaxi = GM_getValue('text7' + MetaLocal.Universe);
    } else { //Si aucune donnée sauvegardée, attribution d'une valeur par défaut
        var AgeMaxi = 999;
    }
    //Récupération du choix utilisateur pour : ouvrir les attaques dans un nouvel onglet
    if (GM_getValue('column20' + MetaLocal.Universe) === false) {
        var NewOnglet = '';
    } else {
        var NewOnglet = 'target="_blank"';
    }


    var NbItems = DatasMsg.length;
    //alert(DisplayMoreDetails);
    //alert(NbItems + ' items html à créer');
    var PT = "PT";
    var GT = "GT";
    var NumeroLigneDisplayed = 0; //Numéro de ligne affiché sur le tableau


    //Première ligne du tableau
    var Board = '<div class ="InfosVague"><table class ="TableauRaid">' +
        DisplayColumn(DisplayLeftLine, '<th class ="FirstLine">#</th>') +
        DisplayColumn(DisplayCoord, '<th class ="FirstLine">Coords</th>') +
        DisplayColumn(DisplayPlayer, '<th class ="FirstLine">(<span style="color:#ff8080">Act</span>) Joueur</th>')+
        DisplayColumn(DisplayHour, '<th class ="FirstLine">Age</th>')+
        DisplayColumn(DisplayMetal, '<th class ="FirstLine">Metal</th>')+
        DisplayColumn(DisplayCristal, '<th class ="FirstLine">Cristal</th>') +
        DisplayColumn(DisplayDeut, '<th class ="FirstLine">Deuterium</th>') +
        DisplayColumn(DisplayTotal, '<th class ="FirstLine">Total</th>') +
        DisplayColumn(DisplayLoot, '<th class ="FirstLine">Pillage</th>') +
        DisplayColumn(DisplayButinRatio, '<th class ="FirstLine">Ratio</th>') +
        DisplayColumn(DisplayFlotte, '<th class ="FirstLine">Flotte</th>') +
        DisplayColumn(DisplayDefense, '<th class ="FirstLine">Défense</th>') +
        DisplayColumn(DisplayLinkPT, '<th class ="FirstLine">PT</th>') +
        DisplayColumn(DisplayLinkGT, '<th class ="FirstLine">GT</th>') +
        DisplayColumn(DisplayDelete, '<th class ="FirstLine"></th>') +
        DisplayColumn(DisplayMoreDetails, '<th class ="FirstLine"></th>') +
        DisplayColumn(DisplayRightLine, '<th class ="FirstLine">#</th>');
    // Données du tableau
    for (var j = 0; j < NbItems; j++){
        if (DatasMsg[j].Display == 1) { //remplacer le 1 par une variable envoyée sur la fonction (lorque l'on affiche la corbeille, display doit être à 0 et lorsque l'on affiche le tableau standard, display doit être à 1
            if (DatasMsg[j].FlotteFinal < FlotteMaxi) { //Vérifie si la flotte du RE est inférieur au montant maximum souhaité par l'utilisateur
                if (DatasMsg[j].DefenseFinal < DefenseMaxi) {//Vérifie si la défense du RE est inférieur au montant maximum souhaité par l'utilisateur
                    if (DatasMsg[j].AgeSec < (AgeMaxi*3600)) { //Vérifie si l'âge du RE est inférieur au montant maximum souhaité par l'utilisateur
                        NumeroLigneDisplayed = NumeroLigneDisplayed + 1;
                        var Row =DisplayColumn(DisplayLeftLine, '<td class ="InsideBoard Line">' + DatasMsg[j].LineColor +  NumeroLigneDisplayed + '</font></td>') +
                            DisplayColumn(DisplayCoord, '<td class ="InsideBoard Coord">' + '<a class="CoordLink" href="' + DatasMsg[j].LienGalaxie + '">' + DatasMsg[j].CoordPlanete + " " + DatasMsg[j].Moon + '</a></td>') +
                            DisplayColumn(DisplayPlayer, '<td class ="InsideBoard">' + DatasMsg[j].Activite + DatasMsg[j].PlayerColor + DatasMsg[j].Player + DatasMsg[j].PlayerIcon + '</span></td>') +
                            DisplayColumn(DisplayHour, '<td class ="InsideBoard" id="AGE' + DatasMsg[j].Id + '">' + DatasMsg[j].AgeDisplayed + '</td>') +
                            DisplayColumn(DisplayMetal, '<td class ="InsideBoard">' + DatasMsg[j].MetalDisplayed + '</td>') +
                            DisplayColumn(DisplayCristal, '<td class ="InsideBoard">' + DatasMsg[j].CristalDisplayed + '</td>') +
                            DisplayColumn(DisplayDeut, '<td class ="InsideBoard">' + DatasMsg[j].DeuteriumDisplayed + '</td>') +
                            DisplayColumn(DisplayTotal, '<td class ="InsideBoard">' + DatasMsg[j].TotalDisplayed + '</td>') +
                            DisplayColumn(DisplayLoot, '<td class ="InsideBoard" id="LOOT' + DatasMsg[j].Id + '">' + DatasMsg[j].LootDisplayed + '</td>') +
                            DisplayColumn(DisplayButinRatio, '<td class ="InsideBoard">' + DatasMsg[j].Butin + '</td>') +
                            DisplayColumn(DisplayFlotte, '<td class ="InsideBoard" id="FLT' + DatasMsg[j].Id + '">' + DatasMsg[j].FlotteDisplayed + '</td>') +
                            DisplayColumn(DisplayDefense, '<td class ="InsideBoard" id="DEF' + DatasMsg[j].Id + '">' + DatasMsg[j].DefenseDisplayed + '</td>') +
                            DisplayColumn(DisplayLinkPT, '<td class ="InsideBoard" id="AttackPTButton">' + '<a id="PT' + DatasMsg[j].Id + '" class="AttackButton" href="' + DatasMsg[j].LienPT + '" ' + NewOnglet +  '></a></td>') + //note : ici, certains styles sont appliqués grace à l'id et d'autres grace à la class
                            DisplayColumn(DisplayLinkGT, '<td class ="InsideBoard" id="AttackGTButton">' + '<a id="GT' + DatasMsg[j].Id + '"class="AttackButton" href="' + DatasMsg[j].LienGT + '" ' + NewOnglet +  '></a></td>') +
                            DisplayColumn(DisplayDelete, '<td class ="InsideBoard" id="DeleteButton"><div id="DeleteA"></div>') +
                            DisplayColumn(DisplayMoreDetails, '<td class ="InsideBoard"><a id="MoreDetails" class="overlay" href="' + DatasMsg[j].LienDetails + '"></a></td>') +
                            DisplayColumn(DisplayRightLine, '<td class ="InsideBoard Line">' + DatasMsg[j].LineColor +  NumeroLigneDisplayed + '</td>') +
                            '</tr>';
                        // Vérification de si la ligne est paire ou impaire et attribution du style CSS correspondant
                        if (NumeroLigneDisplayed % 2 === 0) {
                            Board = Board +'<tr class ="Pair" id="' + DatasMsg[j].Id + '">' + Row; //Board, première partie du code + tr class paire ou impaire + Row (juste au dessus)

                        } else {
                            Board = Board +'<tr class ="Impair" id="' + DatasMsg[j].Id + '">' + Row; //LIGNE A REMETTRE
                        }
                        //Vérification de si les boutons PT ou GT ont déja été cliqués et si c'est le cas, colorisation du bouton en suivant le style css correspondant à l'id+le nom de class de la balise <a>
                        if (DatasMsg[j].PTAttacked == 1){
                            if ((GM_getValue('color4' + MetaLocal.Universe))) {
                                GM_addStyle("#PT" + DatasMsg[j].Id + ".AttackButton{ background-color: #" + GM_getValue('color4' + MetaLocal.Universe) + ";}");
                            } else {
                                GM_addStyle("#PT" + DatasMsg[j].Id + ".AttackButton{ background-color: #ff0000;}");
                            }
                        }
                        if (DatasMsg[j].GTAttacked == 1){
                            if ((GM_getValue('color4' + MetaLocal.Universe))) {
                                GM_addStyle("#GT" + DatasMsg[j].Id + ".AttackButton{ background-color: #" + GM_getValue('color4' + MetaLocal.Universe) + ";}");
                            } else {
                                GM_addStyle("#GT" + DatasMsg[j].Id + ".AttackButton{ background-color: #ff0000;}");
                            }
                        }
                        //Colorisation des textes en fonction des options enregistrées par l'utilisateur (il y a d'abord une vérification de l'enregistrement puis une vérification de si le chiffre est plus important que celui enregistré) Attention : la colorisation aura lieu seulement si l'utilisateur a défni le seuil + la couleur
                        if (GM_getValue('color5' + MetaLocal.Universe)) {
                            if (GM_getValue('text0' + MetaLocal.Universe)) {
                                if (DatasMsg[j].Loot > GM_getValue('text0' + MetaLocal.Universe)) {
                                    GM_addStyle("#LOOT" + DatasMsg[j].Id + " { color: #" + GM_getValue('color5' + MetaLocal.Universe) + ";}");
                                }
                            }
                        }
                        if (GM_getValue('color8' + MetaLocal.Universe)) {
                            if (GM_getValue('text3' + MetaLocal.Universe)) {
                                if ((DatasMsg[j].AgeSec / 3600)  > GM_getValue('text3' + MetaLocal.Universe)) {
                                    GM_addStyle("#AGE" + DatasMsg[j].Id + " { color: #" + GM_getValue('color8' + MetaLocal.Universe) + ";}");
                                }
                            }
                        }
                        if (GM_getValue('color6' + MetaLocal.Universe)) {
                            if (GM_getValue('text1' + MetaLocal.Universe)) {
                                try {
                                    if (DatasMsg[j].FlotteFinal > parseInt(GM_getValue('text1' + MetaLocal.Universe))) {
                                        GM_addStyle("#FLT" + DatasMsg[j].Id + " { color: #" + GM_getValue('color6' + MetaLocal.Universe) + ";}");
                                    }
                                } catch(err) {
                                }
                            }
                        }
                        if (GM_getValue('color7' + MetaLocal.Universe)) {
                            if (GM_getValue('text2' + MetaLocal.Universe)) {
                                try {
                                    if (DatasMsg[j].DefenseFinal > parseInt(GM_getValue('text2' + MetaLocal.Universe))) {
                                        GM_addStyle("#DEF" + DatasMsg[j].Id + " { color: #" + GM_getValue('color7' + MetaLocal.Universe) + ";}");
                                    }
                                } catch(err) {
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    Board = Board + '</table></div>';
    //alert(Board);
    return Board;
}

//Fonction d'affichage des colonnes
function DisplayColumn(YesNo, Content)
{
    var FinalContent;
    if (YesNo) {
        FinalContent = Content;
    } else {
        FinalContent = '';
    }
   return FinalContent;
}



function InfoDatasBoard(DatasMsg)
{

    GM_addStyle(".TableauInfos { border: 1px solid #555; text-align: center; width: 100%; margin-top: 5px  } ");
    GM_addStyle(".thTableauInfos { border-left: 1px solid #222; height : 25px;} ");
    GM_addStyle(".LigneInfoBoard { border-left: 1px solid #222;} ");
    GM_addStyle(".trinfo1 { background-color: #111A21;}"); //lignes paires
    GM_addStyle(".trinfo2 { background-color: #18242d;}"); //lignes impaires

    var i,j,k; //Calcul du nombre de PT, GT, de la renta totale
    var l,m,n;
    var FirstWaveSumPT = 0;
    var SecondWaveSumPT = 0;
    var ThirdWaveSumPT = 0;
    var FirstWaveSumGT = 0;
    var SecondWaveSumGT = 0;
    var ThirdWaveSumGT = 0;
    var FirstWaveSumLOOT = 0;
    var SecondWaveSumLOOT = 0;
    var ThirdWaveSumLOOT = 0;
    var MoyFirstWave = 0;
    var MoyScndWave = 0;
    var MoyThirWave = 0;
    var Msg = 0;
    var MetaLocal = MetaDatas();

    //Récupération de la valeur choisie par l'utilisateur pour le non affichage des lignes selon certains critères
    if (GM_getValue('text5' + MetaLocal.Universe)) { //Vérifie la présence d'une donnée sauvegardée --------------- FLOTTE
        var FlotteMaxi = GM_getValue('text5' + MetaLocal.Universe);
    } else { //Si aucune donnée sauvegardée, attribution d'une valeur par défaut
        var FlotteMaxi = 999999999999;
    }
    if (GM_getValue('text6' + MetaLocal.Universe)) { //Vérifie la présence d'une donnée sauvegardée ------------------- DEFENSE
        var DefenseMaxi = GM_getValue('text6' + MetaLocal.Universe);
    } else { //Si aucune donnée sauvegardée, attribution d'une valeur par défaut
        var DefenseMaxi = 999999999999;
    }
    if (GM_getValue('text7' + MetaLocal.Universe)) { //Vérifie la présence d'une donnée sauvegardée ------------------- AGE
        var AgeMaxi = GM_getValue('text7' + MetaLocal.Universe);
    } else { //Si aucune donnée sauvegardée, attribution d'une valeur par défaut
        var AgeMaxi = 999;
    }


    for (i = 0; i < 23; i) { //Collecte renta Première vague
        l = i + 1;
        if (DatasMsg[Msg]) {
            if (DatasMsg[Msg].Display == 1) {
                if (DatasMsg[Msg].FlotteFinal < FlotteMaxi) { //Vérifie si la flotte du RE est inférieur au montant maximum souhaité par l'utilisateur
                    if (DatasMsg[Msg].DefenseFinal < DefenseMaxi) {//Vérifie si la défense du RE est inférieur au montant maximum souhaité par l'utilisateur
                        if (DatasMsg[Msg].AgeSec < (AgeMaxi*3600)) { //Vérifie si l'âge du RE est inférieur au montant maximum souhaité par l'utilisateur
                            FirstWaveSumPT = FirstWaveSumPT + DatasMsg[Msg].NbPT;
                            FirstWaveSumGT = FirstWaveSumGT + DatasMsg[Msg].NbGT;
                            FirstWaveSumLOOT = FirstWaveSumLOOT + DatasMsg[Msg].Loot;
                            i = i + 1;
                        }
                    }
                }
            }
            Msg = Msg + 1;
        }
        if (DatasMsg[Msg]) {
        } else {
            i = 40;
        }
    }
    //Colorisation de la ligne de renta si elle dépasse la valeur indiquée par l'utilisateur
    if (GM_getValue('text4' + MetaLocal.Universe)) {
        if (FirstWaveSumLOOT > GM_getValue('text4' + MetaLocal.Universe)) {
            if (GM_getValue('color9' + MetaLocal.Universe)) {
                GM_addStyle("#Renta1Info {color: #" + GM_getValue('color9' + MetaLocal.Universe) +";}");
            }
        }
    }
    MoyFirstWave = FirstWaveSumLOOT / i;
    for (j = 0; j < 23; j) { //Collecte renta Seconde vague
        m = j + 1;
        if (DatasMsg[Msg]) {
            if (DatasMsg[Msg].Display == 1) {
                if (DatasMsg[Msg].FlotteFinal < FlotteMaxi) { //Vérifie si la flotte du RE est inférieur au montant maximum souhaité par l'utilisateur
                    if (DatasMsg[Msg].DefenseFinal < DefenseMaxi) {//Vérifie si la défense du RE est inférieur au montant maximum souhaité par l'utilisateur
                        if (DatasMsg[Msg].AgeSec < (AgeMaxi*3600)) { //Vérifie si l'âge du RE est inférieur au montant maximum souhaité par l'utilisateur
                            SecondWaveSumPT = SecondWaveSumPT + DatasMsg[Msg].NbPT;
                            SecondWaveSumGT = SecondWaveSumGT + DatasMsg[Msg].NbGT;
                            SecondWaveSumLOOT = SecondWaveSumLOOT + DatasMsg[Msg].Loot;
                            j = j + 1;
                        }
                    }
                }
            }
            Msg = Msg + 1;
        }
        if (DatasMsg[Msg]) {
        } else {
            j = 40;
        }
    }
    if (GM_getValue('text4' + MetaLocal.Universe)) {
        if (SecondWaveSumLOOT > GM_getValue('text4' + MetaLocal.Universe)) {
            if (GM_getValue('color9' + MetaLocal.Universe)) {
                GM_addStyle("#Renta2Info {color: #" + GM_getValue('color9' + MetaLocal.Universe) +";}");
            }
        }
    }
    MoyScndWave = SecondWaveSumLOOT / j;
    for (k = 0; k < 23; k) { //Collecte renta Troisième vague
        n = k + 1;
        if (DatasMsg[Msg]) {
            if (DatasMsg[Msg].Display == 1) {
                if (DatasMsg[Msg].FlotteFinal < FlotteMaxi) { //Vérifie si la flotte du RE est inférieur au montant maximum souhaité par l'utilisateur
                    if (DatasMsg[Msg].DefenseFinal < DefenseMaxi) {//Vérifie si la défense du RE est inférieur au montant maximum souhaité par l'utilisateur
                        if (DatasMsg[Msg].AgeSec < (AgeMaxi*3600)) { //Vérifie si l'âge du RE est inférieur au montant maximum souhaité par l'utilisateur
                            ThirdWaveSumPT = ThirdWaveSumPT + DatasMsg[Msg].NbPT;
                            ThirdWaveSumGT = ThirdWaveSumGT + DatasMsg[Msg].NbGT;
                            ThirdWaveSumLOOT = ThirdWaveSumLOOT + DatasMsg[Msg].Loot;
                            k = k + 1;
                        }
                    }
                }
            }
            Msg = Msg + 1;
        }
        if (DatasMsg[Msg]) {
        } else {
            k = 40;
        }
    }
    if (GM_getValue('text4' + MetaLocal.Universe)) {
        if (ThirdWaveSumLOOT > GM_getValue('text4' + MetaLocal.Universe)) {
            if (GM_getValue('color9' + MetaLocal.Universe)) {
                GM_addStyle("#Renta3Info {color: #" + GM_getValue('color9' + MetaLocal.Universe) +";}");
            }
        }
    }

    MoyThirWave = ThirdWaveSumLOOT / k;



    var Board = '<div id="DIVINFO"><table class="TableauInfos">' +
        '<th class="thTableauInfos"><b>Première Vague </b>(' + l + ' slots)</th>' +
        '<th class="thTableauInfos"><b>Seconde Vague</b>(' + m + ' slots)</th>' +
        '<th class="thTableauInfos"><b>Troisième Vague</b>(' + n + ' slots)</th>' +
        '<tr class ="trinfo1"><td class="LigneInfoBoard">PT : ' + ThousandSeparator(FirstWaveSumPT) + ' GT : ' + ThousandSeparator(FirstWaveSumGT) + '</td><td class="LigneInfoBoard">PT : ' + ThousandSeparator(SecondWaveSumPT) + ' GT : ' + ThousandSeparator(SecondWaveSumGT) + '</td><td class="LigneInfoBoard">PT : ' + ThousandSeparator(ThirdWaveSumPT) + ' GT : ' + ThousandSeparator(ThirdWaveSumGT) + '</td>' +
        '<tr class ="trinfo2"><td class="LigneInfoBoard">Renta : <div id="Renta1Info" style="display:inline;">' + ThousandSeparator(FirstWaveSumLOOT) + '</div></td><td class="LigneInfoBoard">Renta : <div id="Renta2Info" style="display:inline;">' + ThousandSeparator(SecondWaveSumLOOT) + '</div></td><td class="LigneInfoBoard">Renta : <div id="Renta3Info" style="display:inline;">' + ThousandSeparator(ThirdWaveSumLOOT) + '</div></td>' +
        '<tr class ="trinfo1"><td class="LigneInfoBoard">Moy/Slot : <div id="Renta1Info" style="display:inline;">' + ThousandSeparator(parseInt(MoyFirstWave)) + '</div></td><td class="LigneInfoBoard">Moy/Slot : <div id="Renta2Info" style="display:inline;">' + ThousandSeparator(parseInt(MoyScndWave)) + '</div></td><td class="LigneInfoBoard">Moy/Slot : <div id="Renta3Info" style="display:inline;">' + ThousandSeparator(parseInt(MoyThirWave)) + '</div></td>' +
        '</tr></table></div>';

    return Board
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FONCTIONS LIEES AUX BOUTONS///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Bouton de débug (indique le nombre de messages (et secondes vagues) enregistrés dans le tableau
function KnowMessageIndex() {
var MetaLocal = MetaDatas();
alert(GM_getValue('MessageIndex' + MetaLocal.Universe, MessageIndex));
}

//BOUTON VIDANT LE TABLEAU
function EmptyTable() {
    var Message = {};
    var MetaLocal = MetaDatas();
    MessageIndex = GM_getValue('MessageIndex'+MetaLocal.Universe, MessageIndex);
    for (var i = 0; i < MessageIndex + 1; i++){
        DelStoredRE(i);
    }
    //alert(MessageIndex + ' messages supprimés');
    MessageIndex = 0;
    GM_setValue('MessageIndex'+MetaLocal.Universe, MessageIndex);
    GM_deleteValue('REIdList'+MetaLocal.Universe, IdMessages);
    location.reload();
}


//BOUTON OPTIONS -- ZONE OPTIONS
function OptionsButton() { //Fonction gérant toute la parte options
    try {//Permet d'effacer le tableau s'il est déjà présent
        var MetaLocal = MetaDatas();
        var Empty = '';
        var Table = document.querySelector(".InfosVague");
        if(Table.outerHTML) {
            Table.outerHTML = Empty;
        }
        setTimeout(function() { GM_addStyle("#AfficherTableau { color: inherit;}");}, 10); //Recolorie le bouton afficher dans sa couleur d'origine
    } catch(err) {}
    try {//Permet d'effacer le tableau d'informations s'il est déjà présent
        var Empty = '';
        var Table = document.querySelector("#DIVINFO");
        if(Table.outerHTML) {
            Table.outerHTML = Empty;
            }
    } catch(err) {}
    try {//Permet d'effacer le tableau d'options s'il est déjà présent
        var Empty = '';
        var Table = document.querySelector("#OptionsDiv");
        if(Table.outerHTML) {
            Table.outerHTML = Empty;
            }
    } catch(err) {}

    var ZoneCouleurs = ('<div id="OptionsCouleurs"><table id="TableauZoneCouleurs">' + //Création des options dans la zone couleur
                             '<ul>' +
                                 '<li class="OptionsCouleursContent">Couleur lors du passage de la souris sur une ligne :                                             <label><input type="text" id="color0" value="0C8528" maxlength="6"></label>' +
                                 '<li class="OptionsCouleursContent">Couleur des boutons attaquer par défaut :                                                        <label><input type="text" id="color1" value="FFFFFF" maxlength="6"></label>' +
                                 '<li class="OptionsCouleursContent">Couleur des boutons attaquer lorsque l`on passe la souris dessus :                               <label><input type="text" id="color2" value="00FF00" maxlength="6"></label>' +
                                 '<li class="OptionsCouleursContent">Couleur des boutons attaquer lorsque l`on a cliqué dessus :                                      <label><input type="text" id="color3" value="00FF00" maxlength="6"></label>' +
                                 '<li class="OptionsCouleursContent">Couleur des boutons attaquer lorsque l`on a cliqué dessus et que l`on a actualisé la page :      <label><input type="text" id="color4" value="FF0000" maxlength="6"></label>' +
                                 '<li class="OptionsCouleursContent">Lorsque la renta dépasse <label><input type="text" class="BigText" id="text0" value="1000000" maxlength="13"></label>, colorier en :                                                      <label><input type="text" id="color5" value="00FF00" maxlength="6"></label>' +
                                 '<li class="OptionsCouleursContent">Lorsque la flotte dépasse <label><input type="text" class="BigText" id="text1" value="1000000" maxlength="13"></label>, colorier en :                                                     <label><input type="text" id="color6" value="FF0000" maxlength="6"></label>' +
                                 '<li class="OptionsCouleursContent">Lorsque la défense dépasse <label><input type="text" class="BigText" id="text2" value="1000000" maxlength="13"></label>, colorier en :                                                    <label><input type="text" id="color7" value="FF0000" maxlength="6"></label>' +
                                 '<li class="OptionsCouleursContent">Lorsque l`âge du RE dépasse <label><input type="text" class="SmallText" id="text3" value="2" maxlength="3"></label> heures, colorier en :                                                   <label><input type="text" id="color8" value="FF0000" maxlength="6"></label>' +
                                 '<li class="OptionsCouleursContent">Tableau infos : Lorsque la renta d`une vague dépasse <label><input type="text" class="BigText" id="text4" value="17500000" maxlength="10"></label>, colorier en :                                                   <label><input type="text" id="color9" value="00FF00" maxlength="6"></label>' +
                             '</ul>' +
                        '</table></div>');

    var ZoneColonnes = ('<div id="OptionsColonnes"><table id="TableauZoneColonnes">' + //affichage du contenu de la catégorie Affichage des colonnes (1)
                            '<ul>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox0">Afficher les n° de ligne à gauche</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox1">Afficher les n° de ligne à droite</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox2">Afficher les coordonnées</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox3">Afficher le métal</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox4">Afficher le cristal</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox5">Afficher le deutérium</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox6">Afficher le total des ressources</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox7">Afficher le ratio de butin</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox8">Afficher la flotte</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox9">Afficher la défense </label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox10">Afficher la quantité de ressources à piller</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox11">Afficher le pseudo des joueurs</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox12">Afficher les boutons PT</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox13">Afficher les boutons GT</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox14">Afficher l`âge du RE</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox15">Afficher le bouton supprimer</label>' +
                                 '<li class="OptionsColonnesContent"><label><input type="checkbox" id="cbox16">Afficher le bouton plus de détails</label>' +
                                 '<li class="OptionsColonnesContent">' +
                            '</ul>' +
                        '</table></div>');
    var ZoneGlobales = ('<div id="OptionsGlobales"><table id="TableauZoneGlobales">' +
                             '<ul>' +
                                  '<li class="OptionsGlobalesContent">Envoyer <select class="DropDownShipsMore" id="DropDown0" style="visibility:visible"><option value="0"> 0 % </option><option value="10"> 10 % </option><option value="20"> 20 % </option><option value="30"> 30 % </option><option value="40"> 40 % </option><option value="50"> 50 % </option><option value="60"> 60 % </option><option value="70"> 70 % </option><option value="80"> 80 % </option><option value="90"> 90 % </option><option value="100"> 100 % </option></select> de flotte en plus que le montant initial. ' +
                                  '<li class="OptionsGlobalesContent">Ne pas afficher un RE si la flotte dépasse <label><input type="text" class="BigText" id="text5" value="999999999999" maxlength="13"></label>' +
                                  '<li class="OptionsGlobalesContent">Ne pas afficher un RE si la défense dépasse <label><input type="text" class="BigText" id="text6" value="999999999999" maxlength="13"></label>' +
                                  '<li class="OptionsGlobalesContent">Ne pas afficher un RE si son âge dépasse <label><input type="text" class="SmallText" id="text7" value="999" maxlength="3"></label> heures' +
                                  '<li class="OptionsGlobalesContent">Taux de commerce (en construction) : <label><input type="text" class="SmallText" id="text8" value="3" maxlength="2"></label> Métal, <label><input type="text" class="SmallText"  id="text9" value="2" maxlength="2"></label> Cristal, <label><input type="text" class="SmallText" id="text10" value="1" maxlength="2"></label> Deuterium' +
                                  '<li class="OptionsGlobalesContent">---------------------------------------------------------------------------------------------------' +
                                  '<li class="OptionsGlobalesContent">Langue : (en construction) <select class="DropDownShipsMore" id="DropDown1" style="visibility:visible"><option value="FR"> FR </option><option value="EN"> EN </option></select>' +
                                  '<li class="OptionsGlobalesContent">Langue (réglage manuel - à utiliser lorsque la langue n`existe pas) (en construction) : ' +
                                  '<li class="OptionsGlobalesContent">Indicateur milliards : <label><input type="text" class="SmallText" id="text11" value="Md" maxlength="15"></label> Indicateur millions : <label><input type="text" class="SmallText" id="text12" value="M" maxlength="15"></label> Indicateur milliers : <label><input type="text" class="SmallText" id="text13" value="" maxlength="15"></label>' +
                                  '<li class="OptionsGlobalesContent">---------------------------------------------------------------------------------------------------' +
                                  '<li class="OptionsGlobalesContent">Lors de la collecte des messages, générer des secondes vagues (cocher la case) : <label><input type="checkbox" id="cbox19"></label>' +
                                  '<li class="OptionsGlobalesContent">Lors de la collecte des messages, générer une seconde vague à partir de  <label><input type="text" class="BigText" id="text17" value="400000" maxlength="9"></label> de renta' +
                                  '<li class="OptionsGlobalesContent">---------------------------------------------------------------------------------------------------' +
                                  '<li class="OptionsGlobalesContent"><label><input type="checkbox" id="cbox17">Afficher le tableau récapitulatif des vagues</label>' +
                                  '<li class="OptionsGlobalesContent"><label><input type="checkbox" id="cbox20">Ouvrir les attaques dans un nouvel onglet</label>' +
                                  '<li class="OptionsGlobalesContent"><label><input type="checkbox" id="cbox22">Collecter automatiquement les Rapports d`espionnages</label>' +
                                  '<li class="OptionsGlobalesContent"><label><input type="checkbox" id="cbox21">Afficher automatiquement le tableau lorsque celui-ci contient au moins un Rapport d`espionnage</label>' +
                                  '<li class="OptionsGlobalesContent"><label><input type="checkbox" id="cbox18">Affichage pour appareil mobile (en construction)</label>' +
                             '</ul>' +
                        '</table></div>');
    var ZoneTechs = ('<div id="OptionsTechs"><table id="TableauZoneTechs">' +
                             '<ul>' +
                                  '<li class="OptionsTechsContent">Réacteur à combustion : <label><input type="text" class="SmallText" id="text14" value="0" maxlength="2"></label>' +
                                  '<li class="OptionsTechsContent">Réacteur à impulsion : <label><input type="text" class="SmallText" id="text15" value="0" maxlength="2"></label>' +
                                  '<li class="OptionsTechsContent">Propulsion hyperespace : <label><input type="text" class="SmallText" id="text16" value="0" maxlength="2"></label>' +
                             '</ul>' +
                        '</table></div>');
    var TableauOptions = ('<div id="OptionsDiv"><table id="OptionsMainTable">' + //affichage des catégories des options (0)
                               '<tr>' +
                                    '<td class="OptionsMainLine">Options de couleurs </td>' +
                               '</tr><tr>' +
                                    '<td class="OptionsMainLine">' + ZoneCouleurs + '</td>' +
                               '</tr><tr>' +
                                    '<td class="OptionsMainLine">Affichage des colonnes </td>' +
                               '</tr><tr>' +
                                     '<td class="OptionsMainLine">' + ZoneColonnes + '</td>' +
                               '</tr><tr>' +
                                    '<td class="OptionsMainLine">Options globales </td>' +
                               '</tr></tr>' +
                                     '<td class="OptionsMainLine">' + ZoneGlobales + '</td>' +
                               '</tr><tr>' +
                                    '<td class="LastMainLine">Technologies du compte </td>' +
                               '</tr><tr>' +
                                     '<td class="LastMainLine">' + ZoneTechs + '</td>' +
                               '</tr><tr>' +
                                    '<td id="SauvegarderOptions" > --> Sauvegarder <-- </td>' +
                               '</tr><tr>' +
                          '</table></div>');


    //Affichage du tableau HTML
    var newElement = document.createElement("div"); // On crée un nouvelle élément div
    newElement.innerHTML = TableauOptions; // On écrit le code source qu'il contient
    document.querySelector("#ui-id-14 .TableButton:first-child").insertBefore(newElement, document.querySelector("#ui-id-14 .TableButton:first-child").nextSibling);


    //gestion des données (checkbox) : Affichage des colonnes cochées
    for (var j = 0; j < 23; j++){
        if (GM_getValue('column' + j + MetaLocal.Universe) === false || GM_getValue('column' + j + MetaLocal.Universe) === true) { //Si une valeur a été enregistrée
            if (GM_getValue('column' + j + MetaLocal.Universe)) {
                document.getElementById('cbox' + j ).checked = GM_getValue('column' + j + MetaLocal.Universe);
            } else {
                document.getElementById('cbox' + j ).checked = false;
            }
        } else {
            var Nothing = 1; //Vérifie si rien n'est enregistré
        }
    }
    if (Nothing == 1) { //Si aucun enregistrement est détecté, on applique les cases à cocher par défaut (ce qui correspond à l'affichage du tableau par défaut dans la fonction CreateBoardHTML)
        document.getElementById('cbox0').checked = true;
        document.getElementById('cbox2').checked = true;
        document.getElementById('cbox8').checked = true;
        document.getElementById('cbox9').checked = true;
        document.getElementById('cbox10').checked = true;
        document.getElementById('cbox11').checked = true;
        document.getElementById('cbox12').checked = true;
        document.getElementById('cbox13').checked = true;
        document.getElementById('cbox14').checked = true;
        document.getElementById('cbox15').checked = true;
        document.getElementById('cbox16').checked = true;
        document.getElementById('cbox17').checked = true; //Tableau récapitulatif des vagues
        document.getElementById('cbox19').checked = true; //Secondes vagues par défaut activées
        document.getElementById('cbox20').checked = true; //Ouvrir les attaques dans un nouvel onglet
    }

    //Gestion des couleurs, la boucle for ajoute un style CSS à chaque id comprenant "color", puis ajoute une fonction d'écoute et lorsque la longueur du texte inscrit dans le champ atteint 6, met à jour le background en fonction
    for (var k = 0; k < 10; k++) {
        try {
            if (GM_getValue('color' + k + MetaLocal.Universe)) {
                document.getElementById("color" + k).value = GM_getValue('color' + k + MetaLocal.Universe);
            }
        } catch (err) {
        }
        GM_addStyle("#color" + k + " { background-color : #" + document.getElementById('color' + k).value + "; padding: 0px 0px 0px 0px; box-shadow:none; border: 1px solid #aaa; height: 15px; width:60px; padding:0px; border-radius: 0px 0px 0px 0px; text-align: center; float: right; clear: both; }");
        document.getElementById('color' + k ).addEventListener("keyup", function(event) //Création du bouton permettant la collecte et la sauvegarde des messages
        {
            if (document.getElementById(this.id)) { //cette partie s'active plus tard (lorsque l'utilisateur a rempli le champ, du coup, k est bloqué à 8 donc il faut utiliser this
                var color1 = document.getElementById(this.id).value;
            GM_addStyle("#" + this.id + " { background-color : #" + color1 + ";} ");
        }
        }, true);
    }

    //Gestion des textes (rentas, heures, autre...)
    GM_addStyle(".BigText { width:90px;}");
    GM_addStyle(".SmallText { width:30px; }");
    for (var m = 0; m < 18; m++){
        try {
            GM_addStyle("#text" + m +" { background-color : #FFFFFF; padding: 0px 0px 0px 0px; box-shadow:none; border: 1px solid #aaa; height: 15px; padding:0px; border-radius: 0px 0px 0px 0px; text-align: center; }");
            if (GM_getValue('text' + m + MetaLocal.Universe)) {
                document.getElementById("text" + m).value = GM_getValue('text' + m + MetaLocal.Universe);
            }
        } catch (err) {
        }
    }
    //gestion des données (DropDown) : Affichage des valeurs dropdown
    for (var o = 0; o < 2; o++){
        try {
            if (GM_getValue('DropDown' + o + MetaLocal.Universe)) {
                document.getElementById("DropDown" + o).value = GM_getValue('DropDown' + o + MetaLocal.Universe);
            }
        } catch (err) {
             GM_setValue('DropDown' + o + MetaLocal.Universe, document.getElementById('DropDown' + o).value); //Permet d'inscrire des valeurs dans les enregistrements même si l'utilisateur n'en a jamais mis
        }
    }


    //Mise en mémoire des colonnes cochées dans l'affichage des colonnes (BOUTON ENREGISTRER EN BAS DES OPTIONS)
    document.getElementById('SauvegarderOptions').addEventListener("click", function(event) //Création du bouton permettant la collecte et la sauvegarde des messages
    {

        for (var i = 0; i < 23; i++) { //Boucle pour les checkbox
            GM_setValue('column' + i +  MetaLocal.Universe, document.getElementById('cbox' + i).checked);
        }
        for (var l = 0; l < 10; l++) { //Boucle pour la zone "Couleurs"
            GM_setValue('color' + l +  MetaLocal.Universe, document.getElementById('color' + l).value);
        }
        for (var n = 0; n < 18; n++) { //Boucle pour les datas de type "texte"
            GM_setValue('text' + n +  MetaLocal.Universe, document.getElementById('text' + n).value);
        }
        for (var p = 0; p < 2; p++) { //Boucle pour les dropdown
            GM_setValue('DropDown' + p +  MetaLocal.Universe, document.getElementById('DropDown' + p).value);
        }
        location.reload(); //Rechargement de la page
    }, true);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FONCTIONS DE GESTION ET RECUPERATION DES DONNEES DES MESSAGES////////////////////////////////GET MESSAGE / COMPUTE DATAS///////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Fonction de création du tableau 2D (variable contenant tous les messages)
function MsgBoard()
{
    var MetaLocal = MetaDatas();
// initialisation de la variable indiquant le numéro du RE
    var MessageNumero = 0;
// initialisation de la variable indiquant le nombre de RE
    var IndexDernierMessage = 0; //Numero permet ensuite lorsque l'on crée une seconde vague de récupérer le dernier Message noté
    var DtMsg = 0;
    var i; //Récupération des messages
    var j; //Gestion des secondes vagues
    var k; //Gestion de la vérif si un message est déjà présent
    var Meta = MetaDatas();
    var Table = new Array();
    var Message = {};
    var MessageStr;
    var NbItemsSaved = GM_getValue('MessageIndex' + MetaLocal.Universe, MessageIndex);
    for (i = 0; i < NbItemsSaved; i++) {
        DtMsg = GetStoredRE(MessageNumero);
        Message = ConvertStringToObj(DtMsg);
        Message = ComputeMessage(Message);
        if (Message.Metal) {
            IndexDernierMessage = IndexDernierMessage + 1;
            Table.push(Message);
        }
        MessageNumero = MessageNumero + 1;
        Message = null;
    }
//Affichage du tableau sous forme de pop-up :
    return Table;
}


function CollectAndStoreRE(){
// initialisation de la variable indiquant le numéro du RE
    var MessageToCollect = 0;
// initialisation de la variable indiquant le nombre de RE
    var NbRE = NbMessages();
    var DtMsg = '';
    var i;
    var j;
    var k;
    var Meta = MetaDatas();
    var Message = {};
    var MessageStr;
    var TotalRessourcesVagueSecondaire = 0;
    var IdMessagesSplit = new Array();
    var IdMessageSame = 0; //Cette variable passe à 1 si un id message identique est trouvé
    //Récupération du choix utilisateur concernant les vagues
    if (GM_getValue('column19' + Meta.Universe) === false || GM_getValue('column19' + Meta.Universe) === true) { //Si une valeur a été enregistrée
        var VagueSecondaireYesorNo = GM_getValue('column19' + Meta.Universe);
    } else { //si aucune valeur est enregistrée, par défaut, la variable est true
         var VagueSecondaireYesorNo = true;
    }
    //Récupération du choix utilisateur concernant la renta à partir de laquelle générer des secondes vagues

    if (GM_getValue('text17' + Meta.Universe)) {
        var MontantRentaVagueSecondaire = GM_getValue('text17' + Meta.Universe);
    } else {
        var MontantRentaVagueSecondaire = 400000;
    }

    GM_addStyle("#CollecterMessages { color: #FFAA00;}");
    MessageIndex = GM_getValue('MessageIndex' + Meta.Universe, MessageIndex);
    if (GM_getValue('REIdList' + Meta.Universe, IdMessages)) {
        IdMessages = GM_getValue('REIdList' + Meta.Universe, IdMessages);
        IdMessagesSplit = IdMessages.split(":--:");
    } else {
        IdMessages = 0;
    }
    for (i = 0; i < NbRE; i++) {
        DtMsg = RecupDataMessage(MessageToCollect);
        Message = DtMsg;
        if (Message) { //Cette boucle vérifie l'id message du message et si aucun id ne correspond, renvoie 0, si un id correspond, renvoie 1
            for (k = 0; k < IdMessagesSplit.length + 1; k++) {
                if (Message.IdIg != IdMessagesSplit[k]) {
                    IdMessageSame = IdMessageSame + 0;
                } else {
                    IdMessageSame = IdMessageSame + 1;
                }
            }
            if (IdMessageSame === 0) { //Si aucun message n'a correspondu, enregistrement du message
                Message.Id = MessageIndex;
                SetStoredRE(MessageIndex, Message);
                MessageIndex = MessageIndex + 1;
                IdMessages = (IdMessages + ":--:" + Message.IdIg);
                //Gestion des secondes vagues
                if (VagueSecondaireYesorNo) { //Vérifie si l'utilisateur souhaite ou non créer des secondes vagues
                    var VagueSecondaire =  clone(Message); //Attention, pour les bandits, il génère quand même une seconde vague de 0 renta étant donné que l'on trouve plus de 600k renta sur la première...
                    for (j = 0; j < 5; j++) {
                        TotalRessourcesVagueSecondaire = parseInt((VagueSecondaire.Metal + VagueSecondaire.Cristal + VagueSecondaire.Deuterium) * VagueSecondaire.Butin / 2);
                        if ( TotalRessourcesVagueSecondaire > (MontantRentaVagueSecondaire)) {
                            VagueSecondaire.Metal = parseInt(VagueSecondaire.Metal * (1 - VagueSecondaire.Butin));
                            VagueSecondaire.Cristal = parseInt(VagueSecondaire.Cristal * (1 - VagueSecondaire.Butin));
                            VagueSecondaire.Deuterium = parseInt(VagueSecondaire.Deuterium * (1 - VagueSecondaire.Butin));
                            VagueSecondaire.LineColor = '<font color="red">';
                            VagueSecondaire.Id = MessageIndex;
                            SetStoredRE(MessageIndex, VagueSecondaire);
                            MessageIndex = MessageIndex + 1;
                        } else {
                            j = 10;
                        }
                    }
                }
            }
        }
        IdMessageSame = 0;
        GM_setValue('REIdList' + Meta.Universe, IdMessages);
        MessageToCollect = MessageToCollect + 1;
        Message = null;
    }
    //alert(MessageToCollect + 'Messages Analysés' + ', Valeur du premier message : ' + GetStoredRE(1));
    //alert(MessageIndex);
    GM_setValue('MessageIndex' + Meta.Universe, MessageIndex);
    //alert(GM_getValue('MessageIndex'+Meta.Universe, MessageIndex));
    GM_addStyle("#CollecterMessages { color: #00FF00;}");
    setTimeout(function() { GM_addStyle("#CollecterMessages { color: inherit;}");}, 750);
}


//Fonction de récupération des messages et de leurs infos
function RecupDataMessage(MessageNumber)
{
    //Récupération des messages
    var AllMessages = document.querySelectorAll("li.msg");
    // Ressources du message
    var Message;
    if(AllMessages[MessageNumber].querySelectorAll('.espionageDefText').length === 0) {
        // Récupération des données Meta (utile pour savoir l'univers) :
        var Meta = MetaDatas();
        // Récupération des data messages
        Message = AllMessages[MessageNumber].querySelectorAll("span.resspan");
        Message.IdIg = AllMessages[MessageNumber].getAttribute('data-msg-id');
        Message.Metal = Message[0].textContent;
        Message.Metal = Message.Metal.split(":");
        Message.Metal = Message.Metal[1];
        Message.Metal = parseInt(ConvertRENumbers(Message.Metal)); //Appel de la fonction de transformation des nombres
        Message.Cristal = Message[1].textContent;
        Message.Cristal = Message.Cristal.split(":");
        Message.Cristal = Message.Cristal[1];
        Message.Cristal = parseInt(ConvertRENumbers(Message.Cristal));
        Message.Deuterium = Message[2].textContent;
        Message.Deuterium = Message.Deuterium.split(":");
        Message.Deuterium = Message.Deuterium[1];
        Message.Deuterium = parseInt(ConvertRENumbers(Message.Deuterium));
        // Coordonnées de la planète
        Message.BlueTitle = AllMessages[MessageNumber].querySelector("span.msg_title");
        Message.CoordPlanete = Message.BlueTitle.textContent;
        Message.CoordPlanete = Message.CoordPlanete.split("[");
        Message.CoordPlanete = Message.CoordPlanete[1].split("]");
        Message.CoordPlanete = Message.CoordPlanete[0];
        //Butin Possible, Activité, Nom du joueur, Flotte/Def
        Message.CTN = AllMessages[MessageNumber].querySelectorAll("span.ctn.ctn4");
        Message.Butin = Message.CTN[4].textContent;
        //Transformation de la flotte, try permet d'analyser si la flotte est visible ou non
        try {
            Message.Flotte = Message.CTN[5].textContent;
            Message.Flotte = Message.Flotte.split(":");
            Message.Flotte = Message.Flotte[1];
            Message.FlotteFinal = parseInt(ConvertRENumbers(Message.Flotte));
            Message.FlotteDisplayed = ThousandSeparator(Message.FlotteFinal);
        } catch(err) {
            Message.FlotteFinal = -1; //Permet de quand même afficher le RE et de faire des tris dessus
            Message.FlotteDisplayed = '<span style="color:#ff0000">?</span>';
        }
        //Transformation des défenses, try permet d'analyser si la défense est visible ou non
        try {
            Message.Defense = Message.CTN[6].textContent;
            Message.Defense = Message.Defense.split(":");
            Message.Defense = Message.Defense[1];
            Message.DefenseFinal = parseInt(ConvertRENumbers(Message.Defense));
            Message.DefenseDisplayed = ThousandSeparator(Message.DefenseFinal);
        } catch(err) {
            Message.DefenseFinal = -1;//Permet de quand même afficher le RE et de faire des tris dessus
            Message.DefenseDisplayed = '<span style="color:#ff0000">?</span>';
        }
        //Transformation du butin (ratio de butin, attention) ex : 0.5
        Message.Butin = Message.Butin.replace(/[^0-9.]/g, "");
        Message.Butin = Message.Butin / 100;
        //Transformation de l'activité
        Message.Activite = Message.CTN[1].textContent.split(" ")[2];
        switch (Message.Activite) {
            case ">60":
                Message.Activite = '';
                break;
            case "<15":
                Message.Activite = '(<span style="color:#ff0000"><15</span>)';
                break;
            default:
                Message.Activite = '(<span style="color:#ff8080">' + Message.Activite +'</span>)';
                break;
        }
        //Récupération de la date et de l'age du RE
        Message.Date = AllMessages[MessageNumber].querySelectorAll("span.msg_date");
        Message.Date = Message.Date[0].textContent;
        Message.Player= AllMessages[MessageNumber].querySelectorAll(".compacting")[0].querySelectorAll("span")[1].textContent; //Récupération du joueur
        Message.PlayerStatus= AllMessages[MessageNumber].querySelectorAll(".compacting")[0].querySelectorAll("span")[1].className; //Récupération du status joueur
        //Vérification du status du joueur afin de lui attribuer la bonne couleur dans le tableau
        switch(Message.PlayerStatus) {
            case "status_abbr_longinactive":
                //alert("Long Inactif");
                Message.PlayerColor = '<span style="color:#505050">';
                break;
            case "status_abbr_inactive":
                //alert("Inactif");
                Message.PlayerColor = '<span style="color:#808080">';
                break;
            case "status_abbr_active":
                //alert("Actif non honorable");
                Message.PlayerColor = '<span style="color:#ffffff">';
                break;
            case "status_abbr_honorableTarget":
                //alert("Actif honorable");
                Message.PlayerColor = '<span style="color:#ffff00">';
            break;
            case "status_abbr_outlaw":
                //alert("Actif Hors la loi");
                Message.PlayerColor = '<span style="color:#ff00ff">';
                break;
            case "status_abbr_vacation":
                //alert("Joueur en MV");
                Message.PlayerColor = '<span style="color:#00ffff">';
                break;
            case "status_abbr_noob":
                //alert("Joueur débutant");
                Message.PlayerColor = '<span style="color:#00ff00">';
                break;
        }
        //Recherche d'un statut honorifique et attribue "Nothing" lorsqu'il ne trouve rien
        try {
            Message.PlayerIcon = AllMessages[MessageNumber].querySelectorAll("span.honorRank")[0].className;
        }
        catch(err) {
            Message.PlayerIcon = "Nothing";
        }
        //Attribution de l'icône honorifique du joueur
        switch(Message.PlayerIcon) {
            case "Nothing":
                //alert("Aucun Rang honorifique");
                Message.PlayerIcon = '';
                break;
            case "honorRank rank_bandit3 tooltipHTML":
                //alert("C'est un bandit");
                Message.PlayerIcon = '&nbsp;<span class="honorRank rank_bandit3" >&nbsp;</span>';
                break;
            case "honorRank rank_bandit2 tooltipHTML":
                //alert("C'est un bandit");
                Message.PlayerIcon = '&nbsp;<span class="honorRank rank_bandit2" >&nbsp;</span>';
                break;
            case "honorRank rank_bandit1 tooltipHTML":
                //alert("C'est un bandit");
                Message.PlayerIcon = '&nbsp;<span class="honorRank rank_bandit1" >&nbsp;</span>';
                break;
            case "honorRank rank_starlord3 tooltip":
                Message.PlayerIcon = '&nbsp;<span class="honorRank rank_starlord3" >&nbsp;</span>';
                break;
            case "honorRank rank_starlord2 tooltip":
                Message.PlayerIcon = '&nbsp;<span class="honorRank rank_starlord2" >&nbsp;</span>';
                break;
            case "honorRank rank_starlord1 tooltip":
                Message.PlayerIcon = '&nbsp;<span class="honorRank rank_starlord1" >&nbsp;</span>';
                break;
        }
        //Récupération de l'icône lune
        try {
            Message.ClassMoon = AllMessages[MessageNumber].querySelectorAll("figure.planetIcon.moon")[0].className;
            Message.Moon = '<figure class="planetIcon moon tooltip js_hideTipOnMobile" >&nbsp;</figure>';
        } catch(err) {
            Message.Moon = '';
        }
        Message.LineColor = '<font color="white">'; //Permet d'attribuer une couleur au numéro de ligne, blanc lorsqu'il s'agit d'une première vague et jaune quand il s'agit d'une vague secondaire (pas géré ici)
        //Appel de la fonction qui effectue les calculs dans les messages
        Message.Display = 1; //Permet d'indiquer si le message doit être affiché ou non sur le tableau final,
        Message.PTAttacked = 0;
        Message.GTAttacked = 0;
        //Sortie des variables
        return Message;
    }
}

//Fonction utilisée pour effectuer les calculs de données dans les messages
function ComputeMessage(Message) {
    var Meta = MetaDatas();
    //Récupération du choix qu'a mis l'utilisateur dans "envoyer plus de flotte que nécessaire"
    if (GM_getValue('DropDown0' + Meta.Universe)) {
        var ShipMore = GM_getValue('DropDown0' + Meta.Universe);
    } else {
        var ShipMore = 20; //Valeur par défaut
    }
    //Récupération des techs de l'utilisateur
    if (GM_getValue('text14' + Meta.Universe)) { // Réacteur à combu
        var Combu = GM_getValue('text14' + Meta.Universe);
    } else {
        var Combu = 0; //Valeur par défaut
    }
    if (GM_getValue('text15' + Meta.Universe)) { // Réacteur à impu
        var Impu = GM_getValue('text15' + Meta.Universe);
    } else {
        var Impu = 0; //Valeur par défaut
    }
    if (GM_getValue('text16' + Meta.Universe)) { // Prop
        var Prop = GM_getValue('text16' + Meta.Universe);
    } else {
        var Prop = 0; //Valeur par défaut
    }
    //Récupération du taux défini par l'utilisateur
    //Gestion des ressources
    Message.MetalDisplayed = ThousandSeparator(Message.Metal);
    Message.CristalDisplayed = ThousandSeparator(Message.Cristal);
    Message.DeuteriumDisplayed = ThousandSeparator(Message.Deuterium);
    Message.Total = parseInt(Message.Metal) + parseInt(Message.Cristal) + parseInt(Message.Deuterium);
    Message.TotalDisplayed = ThousandSeparator(Message.Total);
	//Gestion de la galaxie de provenance du joueur
    Message.CoordSplit = Message.CoordPlanete.split(":");
    Message.CoordGalaxie = Message.CoordSplit[0];
    Message.CoordSS = Message.CoordSplit[1];
    Message.CoordPos = Message.CoordSplit[2];
	//Gestion de l'âge
    Message.Annee = Message.Date.split(" ")[0].split(".")[2];
    Message.Mois = Message.Date.split(" ")[0].split(".")[1];
    Message.Jour = Message.Date.split(" ")[0].split(".")[0];
    Message.Heure = Message.Date.split(" ")[1].split(":")[0];
    Message.Minute = Message.Date.split(" ")[1].split(":")[1];
    Message.Seconde = Message.Date.split(" ")[1].split(":")[2];
    Message.DateStamp = (new Date(Message.Annee + "/" + Message.Mois + "/" + Message.Jour + " " + Message.Heure + ":" + Message.Minute + ":" + Message.Seconde).getTime()) / 1000;
    Message.AgeSec = Meta.Timestamp - Message.DateStamp;
    Message.AgeDisplayed = secondsToHms(Message.AgeSec);
	//Calcul du pillage
    Message.Loot = parseInt((Message.Total * Message.Butin));
    Message.LootDisplayed = ThousandSeparator(Message.Loot);
	//calcul du nombre PT et GT
    Message.NbPT = parseInt(Message.Loot / 5000 * (1 + ShipMore / 100));
    Message.NbPTDisplayed = ThousandSeparator(Message.NbPT);
    Message.NbGT = parseInt(Message.Loot / 25000 * (1 + ShipMore / 100));
    Message.NbGTDisplayed = ThousandSeparator(Message.NbGT);
    //Création des liens PT et GT et galaxie
    Message.LienPT = ('https://' + Meta.Universe + '/game/index.php?page=fleet1&galaxy=' + Message.CoordGalaxie + '&system=' + Message.CoordSS + '&position=' + Message.CoordPos + '&type=1&mission=1&routine=3&am202=' + Message.NbPT);
    Message.LienGT = ('https://' + Meta.Universe + '/game/index.php?page=fleet1&galaxy=' + Message.CoordGalaxie + '&system=' + Message.CoordSS + '&position=' + Message.CoordPos + '&type=1&mission=1&routine=3&am203=' + Message.NbGT);
    Message.LienGalaxie = ('https://' + Meta.Universe + '/game/index.php?page=galaxy&galaxy=' + Message.CoordGalaxie + '&system=' + Message.CoordSS + '&position=' + Message.CoordPos);
    Message.LienDetails = ('https://' + Meta.Universe + '/game/index.php?page=messages&messageId=' + Message.IdIg + '&tabid=20&ajax=1');
    //Gestion vitesse PT
    if (Impu >= 5) {
        var PTSpeed = 10000 * (1 + 2 * Impu / 10);
    } else {
        var PTSpeed = 10000 * (1 + Combu / 10);
    }
    //Gestion vitesse GT
    var GTSpeed = 7500 * (1 + Combu / 10);
    Message.TempsTrajetPT = 0;
    //Récupération de la galaxie, ss et pos actuels
    var PlayerG = Meta.PlayerCoord.split(":")[0];
    var PlayerSS = Meta.PlayerCoord.split(":")[1];
    var PlayerPos = Meta.PlayerCoord.split(":")[2];
    var Gtraversees = Math.abs(PlayerG - Message.CoordGalaxie); //Nombre de galaxies traversées pour arriver à destination (ne tient pas en compte les unis circulaires)
    if (Gtraversees === 0) {
        //alert('Aucune galaxie traversée');
    }




	return Message;
}

//Tri Des données
function Tri(a,b) {
        if (a.Loot < b.Loot)
            return 1;
        if (a.Loot > b.Loot)
            return -1;
        return 0;
}



//Fonction de transformation d'un RE en chaine de caractères OBJ->STR
function ConvertObjToString(obj) {
    var Txt = (obj.Id + ":--:" + obj.Metal + ":--:" + obj.Cristal + ":--:" + obj.Deuterium + ":--:" + obj.CoordPlanete + ":--:" + obj.Butin + ":--:" + obj.Flotte + ":--:" + obj.FlotteFinal + ":--:" + obj.FlotteDisplayed + ":--:" + obj.Defense + ":--:" + obj.DefenseFinal + ":--:" + obj.DefenseDisplayed + ":--:" + obj.Activite + ":--:" + obj.Date + ":--:" + obj.Player + ":--:" + obj.PlayerStatus + ":--:" + obj.PlayerIcon + ":--:" + obj.LineColor + ":--:" + obj.PlayerColor + ":--:" + obj.Display + ":--:" + obj.PTAttacked + ":--:" + obj.GTAttacked + ":--:" + obj.Moon + ":--:" + obj.IdIg);
    /////////0//////////////////1//////////////////////2//////////////////////////3/////////////////////4//////////////////////////5///////////////////////6////////////////////////7//////////////////8///////////////////////////////9////////////////////////10/////////////////////////11///////////////////////////////12//////////////////13/////////////////////14////////////////////15////////////////////////16///////////////////////17/////////////////////////18/////////////////////////19/////////////////////////20////////////////////////21//////////////////////22/////////////////23////////
    return Txt;
}

//Fonction de transformation d'un message sous forme de chaine de caractère en objet STR->OBJ
function ConvertStringToObj(StrMessage) {
    var SplitStrMessage = StrMessage.split(":--:");
    var Message = {};
    Message.Id = SplitStrMessage[0];
    Message.Metal = SplitStrMessage[1];
    Message.Cristal = SplitStrMessage[2];
    Message.Deuterium = SplitStrMessage[3];
    Message.CoordPlanete = SplitStrMessage[4];
    Message.Butin = SplitStrMessage[5];
    Message.Flotte = SplitStrMessage[6];
    Message.FlotteFinal = SplitStrMessage[7];
    Message.FlotteDisplayed = SplitStrMessage[8];
    Message.Defense = SplitStrMessage[9];
    Message.DefenseFinal = SplitStrMessage[10];
    Message.DefenseDisplayed = SplitStrMessage[11];
    Message.Activite = SplitStrMessage[12];
    Message.Date = SplitStrMessage[13];
    Message.Player = SplitStrMessage[14];
    Message.PlayerStatus = SplitStrMessage[15];
    Message.PlayerIcon = SplitStrMessage[16];
    Message.LineColor = SplitStrMessage[17];
    Message.PlayerColor = SplitStrMessage[18];
    Message.Display = SplitStrMessage[19];
    Message.PTAttacked = SplitStrMessage[20];
    Message.GTAttacked = SplitStrMessage[21];
    Message.Moon = SplitStrMessage[22];
    Message.IdIg = SplitStrMessage[23];
    return Message;
}


//Fonction d'enregistrement des RE
function SetStoredRE(Index, Message) {
    var MetaLocal = MetaDatas();
    //Appel de la fonction convertissant les objets en chaine de caractères
    StringMessage = ConvertObjToString(Message);
    GM_setValue('MessageStoredNumber'+Index + MetaLocal.Universe, StringMessage);
}


//Fonction de récupération des RE enregistrés
function GetStoredRE(Index) {
    var MetaLocal = MetaDatas();
    var Message = GM_getValue('MessageStoredNumber'+Index + MetaLocal.Universe);
    return Message;
}

//Fonction de suppression de RE
function DelStoredRE(Index) {
    var MetaLocal = MetaDatas();
    GM_deleteValue('MessageStoredNumber'+Index + MetaLocal.Universe);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FONCTIONS DE TRANSFORMATION DES CHAINES DE CARACTERES//////////////////////////////////CONVERTERS///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Transformation des nombres (nombres transformés en valeurs décimales)
function ConvertRENumbers(Nombre) {
    //alert(Nombre);
    var MdFound = Nombre.indexOf("Md"); //ATTENTION LANGUE
    var MFound = Nombre.indexOf("M"); //ATTENTION LANGUE
    if (MdFound > -1) {
        //alert("Miliard trouvé!"); //permet de savoir si un miliard est trouvé
        Nombre = Nombre.replace(/[^0-9\.,\n]|,[^0-9]/g, "");
        Nombre = Nombre.replace(",",".");
        Nombre = Nombre * 1000000000;
    } else {
        if (MFound > -1) {
            //alert("Million trouvé !"); //permet de savoir si un million est trouvé
            Nombre = Nombre.replace(/[^0-9\.,\n]|,[^0-9]/g, "");
            Nombre = Nombre.replace(",",".");
            Nombre = Nombre * 1000000;
            } else { //dans le cas où on a moins d'un million
                Nombre = Nombre.replace(".","");
            }
    }
return Nombre;
}

//Séparateurs de miliers
function ThousandSeparator(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

//Conversion de secondes en heures, minutes et secondes
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ((h > 0 ? h + "H " + (m < 10 ? "0" : "") : "") + m + "m " + (s < 10 ? "0" : "") + s + "s");
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
//FONCTIONS DIVERSES//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//Comptabilisation du nombre de messages
function NbMessages()
{
    //
    var Messages = document.getElementById("ui-id-14");
    var i=0, NbLi =0;
    while(Messages.getElementsByClassName("msg")[i++]) NbLi++;
    // Affichage du nombre de messages :
    //alert("Nombre de messages :" + NbLi);
    return NbLi;
}

//Récupération de l'univers, de ses attributs, de la position actuelle, du timestamp, langue
function MetaDatas() {
    var Meta = {};
    Meta.Universe = document.querySelector("meta[name='ogame-universe']").getAttribute('content');
    Meta.UniverseEcoSpeed = document.querySelector("meta[name='ogame-universe-speed']").getAttribute('content');
    Meta.UniverseFleetSpeed = document.querySelector("meta[name='ogame-universe-speed-fleet']").getAttribute('content');
    Meta.Langue = document.querySelector("meta[name='ogame-language']").getAttribute('content');
    Meta.Timestamp = document.querySelector("meta[name='ogame-timestamp']").getAttribute('content');
    Meta.PlayerCoord = document.querySelector("meta[name='ogame-planet-coordinates']").getAttribute('content');
    Meta.GalaxiesCirculaires = document.querySelector("meta[name='ogame-donut-galaxy']").getAttribute('content');
    Meta.SystemesCirculaires = document.querySelector("meta[name='ogame-donut-system']").getAttribute('content');
    //alert(Meta.Universe + Meta.UniverseEcoSpeed + Meta.UniverseFleetSpeed + Meta.Langue + Meta.Timestamp + Meta.PlayerCoord); //--> Vérification du bon fonctionnement
    return Meta;
}

//Clonage d'objet - Ne fonctionne pas sur les anciens navigateurs (en tout cas sur chrome 35)
function clone(obj){
    try{
        var copy = JSON.parse(JSON.stringify(obj));
    } catch(ex){
        //alert("Vous utilisez un vieux navigateur bien pourri, qui n'est pas pris en charge par ce site");
    }
    return copy;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////VARIABLES GLOBALES////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var StringMessage; //Variable utilisée dans la sauvegarde des RE sous forme de texte/////////////////////
var IdMessages; //Variable utilisée pour stocker les id messages, ce qui facilite leur vérification lors de l'intégration d'un nouveau message
var MessageIndex = 0; //Variable permettant d'indexer les messages sauvegardés dans le script////////////




///////////////////////////////////////////////////////////////////////////////////////////////////////
//INITIALISATION DU SCRIPT/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

function affiche_script()
{
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Cette zone a été largement inspirée de raidstable, je tiens donc à le préciser (Merci à Xanatos, Vulca et Wukodlak pour leur travail)
    if(document.querySelector('#agoButtons')) {
        document.querySelector('#agoButtons').parentNode.removeChild(document.querySelector('#agoButtons')) //Suppression des boutons AGO en haut des messages
        if(document.querySelector('#agoSpyReportOverview'))
        {
            document.querySelector('#agoSpyReportOverview').parentNode.removeChild(document.querySelector('#agoSpyReportOverview')) //Suppression du tableau AGO
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (document.getElementById("AfficherTableau")) {
    } else {
        Display();
    }
}

setInterval(affiche_script, 100);

