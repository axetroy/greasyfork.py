﻿﻿﻿// ==UserScript==
// @name            SearchInPM
// @name:fr         SearchInPM
// @description     Added filtering options and search text in private messages.
// @description:fr  Mise en place d'options de filtrage et recherche de texte dans les messages privés.
// @match           http://*.waze.com/forum/*
// @match           https://*.waze.com/forum/*
// @namespace       https://greasyfork.org/fr/scripts/6116
// @author          seb-d59
// @copyright       2014 Seb.D <https://www.waze.com/forum/ucp.php?i=pm&mode=compose&u=16863068>
// @icon            data:image/png;base64,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
// @version         1.32.1
// @grant           none
// ==/UserScript==


var SiPM_Version = "1.32.1";

// level de débogage: 1 - affiche le mini; 3 - Affiche Tout
var LevelAutorise = 1;

var langue = {
	fr: {
		id: "Français",
		1: "Recherche en cours, veuillez patienter...",
		2: "Annuler",
		3: "Search in PM\: Resultat de la recherche\.",
		4: "Fermer",
		5: "Récupération des usernames\, veuillez patienter...",
		6: "Search in PM:\nVeuillez sélectionner le type de recherche.",
		7: "Search in PM:\nVeuillez saisir un ou plusieurs mots à rechercher.\nOu modifiez vos choix.",
		8: "Search in PM:\nVeuillez sélectionner un user.\nOu modifiez vos choix.",
		9: "Search in PM:\nVous possédez ",
		10: " message(s) sur ",
		11: " page(s),\nla recherche peut prendre du temps.\nVoulez-vous continuer?",
		12: "Saisir un texte à rechercher dans vos messages privés",
		13: "Search in PM...",
		14: "Search",
		15: "Rechercher: \t",
		16: "User",
		17: "Sélectionner un User",
		18: "\t\tEt/Ou le texte dans: \t",
		19: " Sujet ",
		20: " Message",
		21: "\nMinor update."
		},
	en: {
		id: "English",
		1: "Search in progress, please wait...",
		2: "Cancel",
		3: "Search in PM\: Search result\.",
		4: "Close",
		5: "Retrieving usernames\, please wait...",
		6: "Search in PM:\nPlease select the type of search.",
		7: "Search in PM:\nPlease enter one or more words to search for.\nOr change your choice.",
		8: "Search in PM:\nPlease select a user.\nOr change your choice.",
		9: "Search in PM:\nYou have ",
		10: " message(s) on ",
		11: " page(s),\nthe search can take time.\nDo you want to continue?",
		12: "Enter text to search in your private messages",
		13: "Search in PM...",
		14: "Search",
		15: "Search: \t",
		16: "User",
		17: "Select a User",
		18: "\t\tAnd/Or text in: \t",
		19: " Title ",
		20: " Message",
		21: "\nMinor update."
		},
	nb: {
		id: "Norwegian Bokmål",
		1: "Søker, vennligst vent...",
		2: "Avbryt",
		3: "Search in PM\: Søkeresultat\.", // "Søk i PM\:
		4: "Lukk",
		5: "Finner brukernavn\, vennligst vent...",
		6: "Søk i PM:\nVennligst velg søketype.",
		7: "Søk i PM:\nVennligst skriv ett eller flere ord å søke etter.\nEller skift søketype.",
		8: "Søk i PM:\nVennligst velg en bruker.\nEller skift søketype.",
		9: "Søk i PM:\nDu har ",
		10: " beskjed(er) på ",
		11: " side(r),\nsøket kan ta tid.\nØnsker du å fortsette?",
		12: "Skriv søketeksten fr å søke i dine meldinger",
		13: "Søk i PM...",
		14: "Søk",
		15: "Søk: \t",
		16: "Bruker",
		17: "Velg et brukernavn",
		18: "\t\tog/eller søk etter tekst i: \t",
		19: " Tittel ",
		20: " Beskjed",
		21: "\nMinor update."
		}
	};
var translations={};

var SiPM_OldVersion = SiPM_Version;
var SiPM_Maj;

var connectedUser;
var currentbox = new Array(), PmBox = new Array();
var controle1, controle2, secondcontrol, Refcontrol, Parent;
var SearchBoxPM, SiPMAuteur, SiPMSujet, SiPMMessage;
var ctrlUser;
var stopScan=false;
var chaine = new Array();

var message = new Array();
var resultCompare = new Array();
var resultRequest = new Object();
var resultText = new Array();
var resultSujet = new Array();
	

var nbMessages, nbPages;
var Panel;
var messageOk = false;
var txtmessageOk = false;

var curseurBar = 0;
var currentPage=0;
var currentMess=0;
var messParPage=0;

var dossierPerso=false;
var anonymous=false;
var error=false;


function WSIPMBootstrap(){
	DebugLog('WSIPMBootstrap',1);
  if (typeof unsafeWindow === "undefined") {
    unsafeWindow    = ( function () {
      var dummyElem = document.createElement('p');
      dummyElem.setAttribute('onclick', 'return window;');
      return dummyElem.onclick();
    }) ();
  }
	/* begin running the code! */
	DebugLog('WSIPMBootstrap ok',1);
	WSIPMInitialise();
}

//==========  Helper ==============================//
function getElementsByClassName(classname, node) {
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for (var i=0,j=els.length; i<j; i++)
    if (re.test(els[i].className)) a.push(els[i]);
  return a;
}

function getId(node) {
	return document.getElementById(node);
}

function DebugLog(DebugLog_msg, LevelDebug) {
	var text = 'SiPM v' + SiPM_Version;
	
	if (LevelDebug > LevelAutorise)
		return;
		
	if (typeof DebugLog_msg == "object") {
		if ((DebugLog_msg.id != undefined) && (DebugLog_msg.fid != undefined)) {
			console.log(text + ' Affichage détails d\'objet: ' + DebugLog_msg.id +' - '+ DebugLog_msg.fid);
		}else if ((DebugLog_msg.id != undefined) && (DebugLog_msg.fid == undefined)) {
			console.log(text + ' Affichage détails d\'objet: ' + DebugLog_msg.id);
		}else if ((DebugLog_msg.id == undefined) && (DebugLog_msg.fid != undefined)) {
			console.log(text + ' Affichage détails d\'objet: ' + DebugLog_msg.fid);
		}else if ((DebugLog_msg.id == undefined) && (DebugLog_msg.fid == undefined)) {
			console.log(text + ' Affichage détails d\'objet: ');
		}
		console.log(DebugLog_msg);
	}
	else {
 	console.log(text + ": " + DebugLog_msg);
	}
}
//==========  /Helper ==============================//

function SiPM_SaveSettings(){
	if (localStorage)
		localStorage.SIMPVersion = SiPM_OldVersion;
}

function SiPM_LoadSettings(){
	if (localStorage.SIMPVersion)
		SiPM_OldVersion=localStorage.SIMPVersion;
}

function SiPM_TestVersion() {
	if (SiPM_OldVersion != SiPM_Version) {
		SiPM_Maj = "SearchInPM " + SiPM_Version + ': ' + translations[21];
		alert(SiPM_Maj);
		SiPM_OldVersion = SiPM_Version;
	}
	
}
/*
function stop(){
	stopScan=true;
	BarProgress("off", "");
}
*/

function init_SiPMDialog() {
// Initialisation de la fenêtre fenêtre de progression.
//  --> pour faire patienter! ;)
	
  var SiPMDialog = document.createElement('div');
  SiPMDialog.id = "SiPMDialog";
  SiPMDialog.setAttribute('style', 'text-color: #000000; border: 1px solid black; background-color: #FFFFFF; top: 300px; right: 300px; height: auto; width: auto; padding: 5px; position: absolute; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; display: none;');
  var SiPMDialogHTML = '<center style="font-weight: bold; font-Size: x-large;">Search in PM</center><br><br>';
  SiPMDialogHTML += '<center><span id="SiPMText" style="font-Size: large;">'+translations[1]+'</span><br><br>';
	SiPMDialogHTML += '<progress id="SiPMProgress" value="0" max="100" style="height: 20px; width: 250px;"></progress><br><br>';
	SiPMDialogHTML += '<button id="SiPMBtnCancel" style="height: auto; width: 100px; font-Size: large; display: none">'+translations[2]+'</button></center><br>';
  SiPMDialog.innerHTML = SiPMDialogHTML;
  getId("page-body").appendChild(SiPMDialog);
  
//	var cancelBtn = document.getId('SiPMBtnCancel'); 
//	cancelBtn.addEventListener("click", stop, false);

/*  getId('SiPMBtnCancel').onclick = function () {
  	 getId('SiPMDialog').style.display="none";
  	 stopScan=true;
  	};
 */ 
}

function init_SiPMaffResut() {
// Initialisation de la fenêtre contenant les résultat de la recherche
// Affichage dans le champs id="SiPMResult" avec mise en forme style forum

  var SiPMaffResut = document.createElement('div');
  SiPMaffResut.id = "SiPMaffResut";
  SiPMaffResut.setAttribute('style', 'text-color: #000000; border: 1px solid black; background-color: #FFFFFF; padding: 5px; position: absolute; top: 300px; right: 7px; height: auto; width: 744px; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; display: none;');
  var SiPMaffResutHTML = '<center style="font-weight: bold; font-Size: x-large;">'+translations[3]+'</center><br>';
	SiPMaffResutHTML += '<center><button id="AffBtnClose" style="height: auto; width: 100px; font-Size: large;">'+translations[4]+'</button></center><br>';
	SiPMaffResutHTML += '<ul class="topiclist cplist pmlist" id="SiPMResult" style="font-Size: medium"></ul><br>';
	SiPMaffResutHTML += '<center><button id="AffBtnClose1" style="height: auto; width: 100px; font-Size: large;">'+translations[4]+'</button></center>';
  SiPMaffResut.innerHTML = SiPMaffResutHTML;
  getId("page-body").appendChild(SiPMaffResut);
  
  getId('AffBtnClose').onclick = function () {
  	 getId('SiPMaffResut').style.display="none";
  	};
  getId('AffBtnClose1').onclick = function () {
  	 getId('SiPMaffResut').style.display="none";
   	};
}


function BarProgress(cmd, texte) {
// Affichage ou masquage de la fenêtre de progression.
	DebugLog('BarProgress ' + cmd + ' ' + texte, 3);
	if (cmd == "on") {
			//getId('SiPMText').childNodes[0].textContent = texte;
			getId('SiPMText').textContent = texte;
			getId('SiPMDialog').style.display="block";
	
	}else if (cmd == "off") {
		getId("SiPMProgress").value = 0;
		getId('SiPMDialog').style.display="none";
	}
}


function compare(m) {
	DebugLog('compare', 2);
	var ctrlSel = getId('selUsers');
	var selIndex = ctrlSel.selectedIndex;
	var selUser = ctrlSel.options[selIndex].text;
	var	strSujet = {};
	var	strText = {};
	var result;
	

	if (SiPMAuteur && !SiPMSujet && !SiPMMessage) {
	// Recherche des messages d'un même utilisateurs
		if (message[m].user.username==selUser) {
			DebugLog('message[m].user.username', 3);
			//DebugLog(message[m].user.username, 3);
			return message[m];
		}
	}	
	if (SiPMSujet) {
	// Recherche uniquement dans le sujet
	var testSujet = message[m].titre;
	var liste={}; //[];
	var result=null;
	DebugLog('testSujet', 3);
	//DebugLog(testSujet, 3);
		if ((SiPMAuteur && message[m].user.username==selUser) || !SiPMAuteur) {
			for (var j=0; j<chaine.length; j++) {
				result=testSujet.match(new RegExp(chaine[j],"i"));
				DebugLog('result dans sujet = '+result, 3);
	
				if (result!=null) {
					var index=0, n=0;
					do{
						n=testSujet.indexOf(result,index);
						if (n!=-1) {
							liste[n]=result[0];
							strSujet["id"]=message[m].id;
							strSujet[n]=liste[n];
							index=n+1;
						}
					}while (n!=-1);
				}
			}
			liste={};
			if (strSujet.propertyIsEnumerable("id")) {
				resultSujet.push(strSujet);
				DebugLog('resultSujet', 3);
				DebugLog(resultSujet, 3);
			}
		}
	}
	if (SiPMMessage) { 
	// Recherche uniquement dans le corp du message 
	var testText = message[m].text;
	var liste={}, ligne={};
	var result=null;
	DebugLog('testText', 3);
	//DebugLog(testText, 3);
		if ((SiPMAuteur && message[m].user.username==selUser) || !SiPMAuteur) {
			for (var j=0; j<chaine.length; j++) {
				for (var i=0; i<testText.length; i++) {
					result=testText[i].match(new RegExp(chaine[j],"i"));
					DebugLog('result dans Text = '+result, 3);
					if (result!=null) {
						var index=0, n=0;
						do{
							n=testText[i].indexOf(result,index);
							if (n!=-1) {
								liste[n]=result[0];
								index=n+1;
							}
						}while (n!=-1);
						ligne[i]=liste;
						strText["id"]=message[m].id;
						strText[i]=ligne[i];
						
					}
					liste={};
				}
				ligne={};
			}
			if (strText.propertyIsEnumerable("id")) {
				resultText.push(strText);
				DebugLog('resultText', 3);
				DebugLog(resultText, 3);
				
			}
		}
	}
	
	if (strText.propertyIsEnumerable("id")||strSujet.propertyIsEnumerable("id")) {
		strText={};
		strSujet={};
		return message[m];
	}

}


function requete(cible, Page){
	RequestObject = window.ActiveXObject
                        // ? new ActiveXObject("Microsoft.XMLHTTP") 
                        ? new ActiveXObject("Msxml2.XMLHTTP") 
                       : new XMLHttpRequest();
  RequestObject.onreadystatechange = function()
  {   
  	if(RequestObject.readyState == 4) {
  		resultRequest=document.createElement('contenu');
			resultRequest.id=Page;
			resultRequest.innerHTML = RequestObject.responseText;
    }
  };
	RequestObject.open("GET", cible, false); 
	RequestObject.send(null);
	
}

function messageParPage(PageN) {

	var P=(25*PageN);
	var NomPage = 'Page' + P; //currentbox + '_' + P;
	var url = "https://www.waze.com/forum/ucp.php?i=pm&"+ currentbox[0]+ "&start=" + P;
	resultRequest={};
	requete(url, NomPage);

	var infoPage = (PageN+1);
	DebugLog('Recupération Page ' + infoPage,1);
	//DebugLog(resultRequest,3);
	
	var Pmlist = resultRequest.getElementsByClassName('topiclist cplist pmlist',Panel);
	//DebugLog(Pmlist,3);
	var Topictitle = resultRequest.getElementsByClassName('topictitle',Panel);
	//DebugLog(Topictitle,3);
	var Info = resultRequest.getElementsByClassName('info',Panel);
	//DebugLog(Info,3);
	var Mark = resultRequest.getElementsByClassName('mark',Panel);
	//DebugLog(Mark,3);
	var j=0;
	for (var i=0; i < (Topictitle.length); i++) {
		j=(i*2)+1;
		var infoMess = (i+1);
		
		var date;
		var user = new Object();
		var detail = new Object();
		
		detail.id=(Mark[i+1].childNodes[0].value);
		detail.titre=(Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[1].textContent);
		detail.link=(Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[1].href);
		detail.error

		// Detection profile User supprimé
		
		if (Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[4].className=="small"){
				anonymous=true;
		}
		if (Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[4].className=="error"){
				detail["error"]={errorInfo:"", className:""};
        error=true;
				detail.error.errorInfo=Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[4].textContent;
				detail.error.className=Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[4].className;
		}
		
		if (anonymous!==true && error===false){
		try{
			user.username=(Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[5].textContent);
			user.profile=(Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[5].href);
			user.className=(Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[5].className);
			user.styleColor=(Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[5].style.color);
			
		}catch (e)
		{
		  DebugLog('SIMP Error Information Message ' + infoMess + '; Page ' + infoPage,2);
			console.debug('SIMP Error:',e );
		  console.debug('SIMP Error message classname: ' + Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[4].className);
		  console.debug('SIMP Error message in default : ', Pmlist[0].childNodes[j].childNodes[1].childNodes[1].outerHTML);
		  
		}
		
		}else if (anonymous===true){
		// Affichage info profile Anonymous User
			DebugLog('Anonymous Information Message ' + infoMess + '; Page ' + infoPage,2);
			user.classInfo=Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[4].className;
			user.delInfo=Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[4].textContent;
			user.username='Anonymous';
		}else if (error===true){
		// Affichage info profile Anonymous User
			DebugLog('error Information Message ' + infoMess + '; Page ' + infoPage,2);
			user.username=(Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[8].textContent);
			user.profile=(Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[8].href);
			user.className=(Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[8].className);
			user.styleColor=(Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[8].style.color);
		}
		detail.user=user;
		
		if (Info.length==0){ 
		//Recuperation Date Inbox
			if (anonymous!=true && error!==true){
				date=(Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[6].textContent);
			}else if (error==true){
				date=(Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[9].textContent);
			}else if (anonymous==true){
				date=(Pmlist[0].childNodes[j].childNodes[1].childNodes[1].childNodes[7].textContent);
				var n=date.indexOf("»");
				//DebugLog('indexOf("»") = '+n,3);
				date=date.slice((n-1), date.length);
				//DebugLog(date,2);
			}
		}else if (Info.length!=0) {
		//Recuperation Date pour OutBox et SendBox
			date=(Info[i].textContent);
		}
		detail.date=date;
		
		var text = new Array(); 
			
		if (SiPMMessage==true && error===false) {
			resultRequest=[];
			requete(detail.link,detail.id);
			//DebugLog('Récupération message',2);
			//DebugLog(resultRequest,3);
		
			var Panelbg3 = document.getElementsByClassName("panel bg3");
			//DebugLog(Panelbg3,3);
			var Content = resultRequest.getElementsByClassName('content', Panelbg3);
			//DebugLog(Content,3);

			for (var j=0; j<Content[0].childNodes.length; j++){
				text.push(Content[0].childNodes[j].textContent);
			}			
		}else if (SiPMMessage === false || error===true) {
				text.push("");
		}
		
		detail.text = text; 
		//DebugLog('detail.text',3);
		//DebugLog(detail.text,3);
		message.push(detail);

		if (anonymous==true)
			DebugLog(detail,2);

		if (error==true)
			DebugLog(detail,2);
		
		curseurBar++;
		getId("SiPMProgress").value = curseurBar;
		//DebugLog('getId("SiPMProgress").value =' + getId("SiPMProgress").value + ' getId("SiPMProgress").max =' + getId("SiPMProgress").max); 

		anonymous=false;
		error=false;
		
	}

}


function actualisationControle() {
	ctrlUser = getId('selUsers');
	//DebugLog('message', 3);
	//DebugLog(message, 3);

	BarProgress("off", "");

	var nameUser;
	var nameUsers=[];
	//for (var mes in message){
	for (var mes=0; mes<message.length; mes++){
		nameUser = message[mes].user.username;
		nameUsers.push(nameUser);	
	}
	nameUsers.sort(function(a, b){
		var nomA=a.toLowerCase(), nomB=b.toLowerCase();
		if (nomA < nomB) // Tri Alphabétique a-A --> z-Z
			return -1;
		if (nomA > nomB)
			return 1;
		return 0 // Valeur par defaut (pas de tri)
	});
	var i=0;
	do{
		nameUser = nameUsers[i];
		for (var j=i+1; j<nameUsers.length; j++){
			if (nameUsers[j] == nameUser) {
				nameUsers.splice(j, 1);
				j--;
			}
		}
		i++;
	}while (i < nameUsers.length);
	for (var l=0; l<nameUsers.length; l++){
    var optUser = new Option(nameUsers[l], (l+1));
    ctrlUser.options.add(optUser);
	}
	DebugLog(nameUsers,3);


}
function traitementAuteur()
{
  // traiter la page currentPage
		
	messageParPage(currentPage);
  //mise A Jour ProgressBar
  currentPage++;
  if (currentPage>=nbPages){
		messageOk = true;
    setTimeout(actualisationControle, 50);
	}
  else if (!stopScan)
    setTimeout(traitementAuteur, 10);

}

function refrechAuteur() {
// Actualisation du controle select contenant les usernames.
	ctrlUser = getId('selUsers');
	if (ctrlUser.disabled == true && getId('chkUsers').checked==true) {
		if (ctrlUser.options.length <= 1){
			currentPage=0;
			curseurBar = 0;
			getId("SiPMProgress").value = curseurBar;
		
			BarProgress("on", translations[5]);
			
			if (!messageOk) {
				message = []; 
				traitementAuteur();
			}else actualisationControle();
		}
		ctrlUser.disabled = false;

	}else if (ctrlUser.disabled == false && getId('chkUsers').checked==false) {
		ctrlUser.disabled = true;
		ctrlUser.options.selectedIndex = 0;
	}
	if (stopScan) {
		stopScan=false;
		ctrlUser.disabled = true;
		ctrlUser.options.selectedIndex = 0;
		getId('chkUsers').checked=false;
	}

}

function affichageResultat() {
	DebugLog('affichageResultat', 1);

	BarProgress("off", "");
	DebugLog('message', 3);
	DebugLog(message, 3);

	var sujetAAfficher='';
	var textAAfficher='';
	resultCompare = [];
	resultText = [];
	resultSujet = [];
	
	var count =0;
	
	for (var mes=0; mes<message.length; mes++){
		
		var r = compare(mes);
		if (r!=undefined) resultCompare.push(r);
		DebugLog(message[mes],3);
		count++;
	}
	DebugLog('Recupération de ' + count + ' message(s)',1);
	
	// Affichage des resultats
	var w = getId('SiPMaffResut');
	var wtext = getId('SiPMResult');
	wtext.innerHTML = '';
	var n=1;

	for (var mes=0; mes<resultCompare.length; mes++){
		sujetAAfficher=resultCompare[mes].titre;
		if (SiPMSujet){
			for (var m=0; m<resultSujet.length; m++){
				//DebugLog('resultCompare[mes].id= '+resultCompare[mes].id+'; resultSujet[m].id= '+resultSujet[m].id,3);
				//DebugLog(resultSujet[m],3);
				if (resultSujet[m]!==undefined && resultCompare[mes].id==resultSujet[m].id){
					sujetAAfficher='';
					var p=0;
					for (var index in resultSujet[m]){
						if (index!="id"){
							sujetAAfficher+=resultCompare[mes].titre.slice(p,parseInt(index));
							sujetAAfficher+='<mark>'+resultSujet[m][parseInt(index)]+'</mark>';
							p=parseInt(index)+resultSujet[m][parseInt(index)].length;
						}
					}
					sujetAAfficher+=resultCompare[mes].titre.slice(p,resultCompare[mes].titre.length);
				}
			}
		}
		
		if (SiPMMessage){
			for (var m=0; m<resultText.length; m++){
				if (resultText[m]!==undefined && resultCompare[mes].id==resultText[m].id){
					textAAfficher='';
					var meml=-1;
					for (var l in resultText[m]){
						if (l!="id"){
							//textAAfficher=resultCompare[mes].text;
							var p=0;
							for (var index in resultText[m][l]){
								if (meml!=parseInt(l)-1) textAAfficher+='...<br>';
								textAAfficher+=resultCompare[mes].text[l].slice(p, parseInt(index));
								textAAfficher+='<mark>'+resultText[m][l][parseInt(index)]+'</mark>';
								p=parseInt(index)+resultText[m][l][parseInt(index)].length;
							}
							textAAfficher+=resultCompare[mes].text[l].slice(p, (resultCompare[mes].text[l].length));
							meml=parseInt(l);
						}
					}
				}
			}
		}
		
		// profile Normal
		DebugLog(resultCompare[mes].error,3);
		
		if (resultCompare[mes].user.username !== "Anonymous" && resultCompare[mes].hasOwnProperty('error')===false){
			if (SiPMMessage) {
				wtext.innerHTML += '<li class="row bg' + n + '"><dl class="icon" style="background-image: url(./styles/prosilver/imageset/topic_read.gif); background-repeat: no-repeat;"><dt style="width: 93%;"><a class="topictitle" href="' + resultCompare[mes].link + '" target="_blank">' + sujetAAfficher + '</a><br>' + currentbox[1] + '<a href="'+ resultCompare[mes].user.profile +'" target="_blank" style="color: ' + resultCompare[mes].user.styleColor + ';" class="' + resultCompare[mes].user.className + '">' + resultCompare[mes].user.username + '</a>\t' + resultCompare[mes].date + '<br>'+ textAAfficher + '</dt></dl></li>'; //resultCompare[mes].text[0] + resultCompare[mes].text[1] + resultCompare[mes].text[2] + resultCompare[mes].text[3] + '</dt></dl></li>';
			}else if (!SiPMMessage) {
				wtext.innerHTML += '<li class="row bg' + n + '"><dl class="icon" style="background-image: url(./styles/prosilver/imageset/topic_read.gif); background-repeat: no-repeat;"><dt style="width: 93%;"><a class="topictitle" href="' + resultCompare[mes].link + '" target="_blank">' + sujetAAfficher + '</a><br>' + currentbox[1] + '<a href="'+ resultCompare[mes].user.profile +'" target="_blank" style="color: ' + resultCompare[mes].user.styleColor + ';" class="' + resultCompare[mes].user.className + '">' + resultCompare[mes].user.username + '</a>\t' + resultCompare[mes].date + '</dt></dl></li>';
			}
		}else	if (resultCompare[mes].user.username !== "Anonymous" && resultCompare[mes].hasOwnProperty('error')===true){
			if (SiPMMessage) {
				wtext.innerHTML += '<li class="row bg' + n + '"><dl class="icon" style="background-image: url(./styles/prosilver/imageset/topic_read.gif); background-repeat: no-repeat;"><dt style="width: 93%;"><a class="topictitle" href="' + resultCompare[mes].link + '" target="_blank">' + sujetAAfficher + '</a><br><span class="error">This message was deleted by its author.</span><br>' + currentbox[1] + '<a href="'+ resultCompare[mes].user.profile +'" target="_blank" style="color: ' + resultCompare[mes].user.styleColor + ';" class="' + resultCompare[mes].user.className + '">' + resultCompare[mes].user.username + '</a>\t' + resultCompare[mes].date + '<br>'+ textAAfficher + '</dt></dl></li>';
			}else if (!SiPMMessage) {
				wtext.innerHTML += '<li class="row bg' + n + '"><dl class="icon" style="background-image: url(./styles/prosilver/imageset/topic_read.gif); background-repeat: no-repeat;"><dt style="width: 93%;"><a class="topictitle" href="' + resultCompare[mes].link + '" target="_blank">' + sujetAAfficher + '</a><br><span class="error">This message was deleted by its author.</span><br>' + currentbox[1] + '<a href="'+ resultCompare[mes].user.profile +'" target="_blank" style="color: ' + resultCompare[mes].user.styleColor + ';" class="' + resultCompare[mes].user.className + '">' + resultCompare[mes].user.username + '</a>\t' + resultCompare[mes].date + '</dt></dl></li>';
			}
		// profile Anonymous User
		}else	if (resultCompare[mes].user.username == "Anonymous"){
			if (SiPMMessage) {
				wtext.innerHTML += '<li class="row bg' + n + '"><dl class="icon" style="background-image: url(./styles/prosilver/imageset/topic_read.gif); background-repeat: no-repeat;"><dt style="width: 93%;"><a class="topictitle" href="' + resultCompare[mes].link + '" target="_blank">' + sujetAAfficher + '</a><br><em class=​"small">This message was sent by a user no longer registered.</em><br>' + currentbox[1] + resultCompare[mes].user.username + '\t' + resultCompare[mes].date + '<br>' + textAAfficher + '</dt></dl></li>'; //resultCompare[mes].text[0] + resultCompare[mes].text[1] + resultCompare[mes].text[2] + resultCompare[mes].text[3] + '</dt></dl></li>';
			}else if (!SiPMMessage) {
				wtext.innerHTML += '<li class="row bg' + n + '"><dl class="icon" style="background-image: url(./styles/prosilver/imageset/topic_read.gif); background-repeat: no-repeat;"><dt style="width: 93%;"><a class="topictitle" href="' + resultCompare[mes].link + '" target="_blank">' + sujetAAfficher + '</a><br><em class=​"small">This message was sent by a user no longer registered.</em><br>' + currentbox[1] + resultCompare[mes].user.username + '\t' + resultCompare[mes].date + '</dt></dl></li>';
			}
		}


		n++;
		if (n == 3) n=1;
	}
	DebugLog(wtext, 2);
	w.style.display="block";
}


function traitementRecherhce()
{
  // traiter la page currentPage
		
	messageParPage(currentPage);
  currentPage++;
  if (currentPage>=nbPages) {
   	messageOk = true;
    if (SiPMMessage) txtmessageOk = true;
  	setTimeout(affichageResultat, 100);
  }
  else if (!stopScan)
  	setTimeout(traitementRecherhce, 10);
}
   
function SearchPmFct() {
	DebugLog('SearchPmFct', 1);
	SiPMAuteur = getId('chkUsers').checked;
	SiPMSujet = getId('chkSujet').checked;
	SiPMMessage = getId('chkMessage').checked;
	ctrlUser = getId('selUsers');
	SearchBoxPM = getId('_SearchInPm');
	chaine = SearchBoxPM.value;

	currentPage=0;
	curseurBar = 0;

	
	if (!SiPMAuteur && !SiPMSujet && !SiPMMessage){
		alert(translations[6]);
		return;
	}

	if ((chaine =='' || chaine == 'Search in pm…') && (SiPMSujet || SiPMMessage)) {
		alert(translations[7]);
		return;
	}	
	chaine=chaine.trim();
	chaine=chaine.split(" ");
	DebugLog(chaine,2);

	if (SiPMAuteur && ctrlUser.options.selectedIndex==0) {
		alert(translations[8]);
		return;
	}
	SearchBoxPM.blur();
	if (nbPages>1 && (!messageOk || (SiPMMessage && !txtmessageOk))) {
			var reponse = confirm(translations[9] + nbMessages + translations[10] + nbPages +translations[11]);
			if (!reponse)
				return;
	}
	BarProgress("on", translations[1]);
	if (!messageOk || (SiPMMessage && !txtmessageOk)) {
		//modif proposé par DummyD2
		// afficher la progressBar
		message = [];
		
    setTimeout(traitementRecherhce, 10);
	//////////////////////////////////////////////////////////////////////////////////////
	}else if (!stopScan)	affichageResultat();
	
	 if (stopScan) stopScan=false;


}

function FctNbPages() {
	var page=document.getElementsByClassName('rightside pagination',Panel);
	var str = page[0].childNodes[1].textContent;
	var res = str.split(" ");
  var res1 = res[res.length-1];
  return res1;
}

function FctNbMessages() {
	var pagination=document.getElementsByClassName('rightside pagination',Panel);
	var str = pagination[0].firstChild.data;
  var res = str.split(" ");
  var res1 = res[0].split("\t");
	DebugLog(res1[3]+' '+res[1],1);
	return res1[3];
	
}

function WSIPMInitialise(){
  
  message = [];
	currentbox=[];
	
	SiPM_LoadSettings();
	
	if (location.pathname == "/forum/ucp.php") {

		var locale = navigator.language.match(/fr|en|nb/);
		
		if(locale != null){
			switch(locale[0]) {
				case "fr":
					translations=langue.fr;
					break;
				case "en":
					translations=langue.en;
					break;
				case "nb":
					translations=langue.nb;
					break;
			}
		}else if(locale == null){
			translations=langue.en;
		}
		DebugLog('language naivguateur: '+navigator.language+'; language SIMP: '+translations.id,1)
		DebugLog(translations,3);

		PmBox = location.search.match(/pm/);
		DebugLog(PmBox,2);
		
		currentbox = location.search.match(/f=0|f=-1|f=-2|folder=(inbox|outbox|sentbox|[0-9]*)/);
		switch (currentbox[1])
		{	case 'inbox' : currentbox[0]='f=0';
										 currentbox[1]='By ';
										 currentbox[2]='inbox';
										 break;
			case 'outbox' : currentbox[0]='f=-2';
										 	currentbox[1]='To ';
										 	currentbox[2]='outbox';
											break;
			case 'sentbox' : currentbox[0]='f=-1';
											 currentbox[1]='To ';
											 currentbox[2]='sentbox';
											 break;
			default : currentbox[1]='By ';
								currentbox[2]='personal folder';
								dossierPerso=true;
								break;
		}
		DebugLog(currentbox,1);
		

		if (PmBox[0] == "pm" && !(location.search.match(/p=/))) {

			var logInfo=JSON.parse(localStorage.user);
			connectedUser=logInfo["message"];
			DebugLog('Utilisateur connecté: '+connectedUser,2);

			SiPM_TestVersion();

			controle1 = document.createElement('div');
			controle1.id="SearchInPmCtrl";
			controle1.setAttribute('style', 'font-size: 1.1em');
			controle1.innerHTML = '<input type="text" id="_SearchInPm" name="SearchInPm" class="inputbox search" maxlength="128" title="'+translations[12]+'" value="Search in pm…" onclick="if(this.value==\'Search in pm…\')this.value=\'\';" onblur="if(this.value==\'\')this.value=\'Search in pm…\';"></input>'; //onKeyPress="if(event.keyCode==13)SearchPmFct();"
			controle1.innerHTML += '&nbsp&nbsp<input type="button" id="_SearchPm" name="SearchPm" class="button2" value="'+translations[14]+'"></input><br>';
			controle1.innerHTML += translations[15];
			controle1.innerHTML += '&nbsp&nbsp<input type="checkbox" id="chkUsers" value="chkUsers" name="_chkUsers"> '+translations[16];
			controle1.innerHTML += '&nbsp<select id="selUsers" name="_selUsers" disabled="true"><option selected="selected" value="0">'+translations[17]+'</option></select>';
			controle1.innerHTML += translations[18];
			controle1.innerHTML += '&nbsp&nbsp<input type="checkbox" id="chkSujet" value="chkSujet" name="_chkSujet">'+translations[19];
			controle1.innerHTML += '&nbsp&nbsp<input type="checkbox" id="chkMessage" value="chkMessage" name="_chkMessage">'+translations[20]+'<br><br>';
			
			Refcontrol = getId("viewfolder");
			//DebugLog(Refcontrol,2);
			Parent =  getId("cp-main");
			//DebugLog(Parent,2);
			Parent.insertBefore(controle1, Refcontrol);

			Panel =  document.getElementsByClassName("panel");
			//DebugLog(panel,2);
			
//			var testvar=
			
			nbMessages = FctNbMessages(), nbPages = FctNbPages();

			init_SiPMDialog();
			init_SiPMaffResut();
			
			getId("SiPMProgress").max = nbMessages; 	 // init du controle progress
			//DebugLog('getId("SiPMProgress").value =' + getId("SiPMProgress").value + ' getId("SiPMProgress").max =' + getId("SiPMProgress").max, 2); 

			getId('_SearchPm').onclick = SearchPmFct;
			getId('chkUsers').onclick = refrechAuteur;
		
			window.addEventListener("beforeunload", SiPM_SaveSettings, true);

			
		}
	}
}

WSIPMBootstrap();

