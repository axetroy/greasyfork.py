// ==UserScript==
// @name WME Check Road Name
// @author buchet37
// @description This script make a Check for Roads naming
// @namespace https://greasyfork.org/users/4062
// @match     https://world.waze.com/editor/*
// @match     https://*.waze.com/editor/*
// @match     https://*.waze.com/*/editor/*
// @match     https://world.waze.com/map-editor/*
// @match     https://world.waze.com/beta_editor/*
// @match     https://www.waze.com/map-editor/*
// @connect   https://docs.google.com/spreadsheets/d/
// @connect   *
// @grant     GM_xmlhttpRequest
// @include   https://editor-beta.waze.com/*
// @include   https://*.waze.com/editor/editor/*
// @include   https://*.waze.com/*/editor*
// @exclude   https://www.waze.com/*user/editor/*
// @version   4.0.0
// ==/UserScript==


var WME_CRN_version = "4.0.0" ;

function waitForCountryTop () {
    var myWaze = unsafeWindow.W;
    if (myWaze && myWaze.model && myWaze.model.countries && myWaze.model.countries.top && myWaze.model.countries.top.id) {
        var myCountryname = myWaze.model.countries.objects[myWaze.model.countries.top.id].name;  //alert ("On a recu le pays : " + myCountryname);
        switch(myWaze.model.countries.top.id) {
            case 73:  // France
            case 74:  // France - Guyane française
			case 75:  // France - Polynésie française
            case 88:  // France - Guadeloupe
            case 141: // France - Martinique
			case 144: // France - Mayotte
            case 148: // Monaco
            case 184: // France - Réunion
			case 209: // France - Saint-Pierre et Miquelon
            case 243: // France - Wallis et Futuna
                unsafeWindow.mainDictionnaryKey = '1fZNOmDQSYgAam6Lj3z9YpNFu0-Sb6AjAyFdy_dH-roA';
                unsafeWindow.publicDictionnarykey = '1T-UVFQtp5OrKqMZPRsfRBMohIAwdgNoWQcA6Ry4UEgA';
                break;
            case 152: // Morocco
                unsafeWindow.mainDictionnaryKey = '1IAoaPWK2OwpVLFSvdNrJDa5SfQCmiI4u4BJ8UeobxFs';
                unsafeWindow.publicDictionnarykey = '1Y087xlOI-e_lUMZFnSTdRWvSLnQ_Bh3FZ8rKSVUs3aY';
                break;
            default:
                alert ("WME Check Road Name Alert\n\nNo dictionnary for "+ myCountryname);
                unsafeWindow.WME_CRN_onload = "Error";
                delete WME_CRN_1_mainDictionaryTxt;
                delete WME_CRN_1_publicDictionaryTxt;
                return ;
        }

        GM_xmlhttpRequest({             //alert ("On démarre le chargement");
            method:  'GET',
            url:   'https://docs.google.com/spreadsheets/d/' + unsafeWindow.mainDictionnaryKey +'/export?format=csv' ,      // dictionaire principal
            headers: {"User-Agent": "Mozilla/5.0",  // If not specified, navigator.userAgent will be used.
                      "Accept": "text/plain"  },     // If not specified, browser defaults will be used.
            synchronous: false,
            onload: function (mainDictionary) {
                unsafeWindow.WME_CRN_1_mainDictionaryTxt = mainDictionary.responseText;
            }
        });

        GM_xmlhttpRequest({
            method:  'GET',
            url: 'https://docs.google.com/spreadsheets/d/' + unsafeWindow.publicDictionnarykey +'/export?format=csv' ,      // dictionaire public
            headers: {"User-Agent": "Mozilla/5.0",
                      "Accept": "text/plain"  },
            synchronous: false,
            onload: function (publicDictionary) {
                unsafeWindow.WME_CRN_1_publicDictionaryTxt = publicDictionary.responseText;
            }
        });
        return myWaze.model.countries.top.id ;
    }
    else {
        setTimeout (function () {waitForCountryTop();}, 1000);   //      alert ("On attend le pays");
    }
}

if ('undefined' == typeof WME_CRN_onload) {        // le script n'est a pas encore chargé
    unsafeWindow.WME_CRN_onload = "In Progress";
    unsafeWindow.WME_CRN_1_mainDictionaryTxt = "In Progress";
    unsafeWindow.WME_CRN_1_publicDictionaryTxt  = "In Progress";
    var mainDictionnaryURL = '' ;
    var publicDictionnaryURL = '' ;
    waitForCountryTop();
}

if ('undefined' == typeof __RTLM_PAGE_SCOPE_RUN__) {
    (function page_scope_runner() {
        // If we're _not_ already running in the page, grab the full source
        // of this script.
        var my_src = "(" + page_scope_runner.caller.toString() + ")();";

        // Create a script node holding this script, plus a marker that lets us
        // know we are running in the page scope (not the Greasemonkey sandbox).
        // Note that we are intentionally *not* scope-wrapping here.
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.textContent = "var __RTLM_PAGE_SCOPE_RUN__ = true;\n" + my_src;

        // Insert the script node into the page, so it will run, and immediately
        // remove it to clean up.  Use setTimeout to force execution "outside" of
        // the user script scope completely.
        setTimeout(function() {
            document.body.appendChild(script);
            document.body.removeChild(script);
        }, 0);
    })();

    // Stop running, because we know Greasemonkey actually runs us in
    // an anonymous wrapper.
    return;
}

function Check_Road_Name() {
    WME_CRN_Dictionary = [];                            // déclaration Hors "loadFiles" pour compatibilité Chrome
    WME_CRN_MainCountry = "";

    // *****************   COMPATIBILITY WITH NEW EDITOR     ***********
    //var WazeActionCreateObject = require("Waze/Action/CreateObject");
      var WazeActionAddOrGetCity   = require("Waze/Action/AddOrGetCity");
      var WazeActionAddOrGetStreet = require("Waze/Action/AddOrGetStreet");
      var WazeActionMultiAction    = require("Waze/Action/MultiAction");
      var WazeActionUpdateObject   = require("Waze/Action/UpdateObject");
      var WazeActionAddAlternateStreet   = require("Waze/Action/AddAlternateStreet");
      var WazeActionUpdateFeatureAddress =  require("Waze/Action/UpdateFeatureAddress");
    //var WazeModelObjectType    = require("Waze/Model/ObjectType");
    // *****************************************************************

    loadFiles ();
    function loadFiles () {                  // Passage en variable locales
        if (WME_CRN_1_mainDictionaryTxt != "In Progress" && WME_CRN_1_publicDictionaryTxt != "In Progress") {
            traiteDictionary(WME_CRN_1_mainDictionaryTxt,1);                           // main directory line 1 +
            traiteDictionary(WME_CRN_1_publicDictionaryTxt,1001);                         // public directory line 1001 +
            delete WME_CRN_1_mainDictionaryTxt; delete WME_CRN_1_publicDictionaryTxt;                            // supprime les variables d'import de fichiers
            WME_CRN_onload = "Done";
            WME_CRN_MainCountry = W.model.countries.top.id;
            insertButton();
        }
        else {
            setTimeout (function () {loadFiles();}, 1000);
        }
    }

    function traiteDictionary(texte,N_ligne) {
        var generic = texte.replace (/\t\t/g,"\t");                               // supprime les doubles tabulation
        generic = generic.replace (/\r/g,"\n");                                    // remplace /r par /n
        generic = generic.replace (/\n\n\n/g,"\n");                                // supprime triplon CR
        generic = generic.replace (/\n\n/g,"\n");                                  // supprime doublon CR

        var lignes = generic.split(/\n/);                                         // split
        for(var i = 0; i < lignes.length; i++) {
            //alert (lignes[i]);
            if (lignes[i].search('"') === 0) {                                        // elimine les guillemets involontaires de l'import
                lignes[i] = lignes[i].replace (/^"/,'');
                lignes[i] = lignes[i].replace (/",/,',');
            }
            //alert (lignes[i]+' ' +lignes[i].search('//'));
            if (lignes[i].search('/')  !== 0) {continue;}                            // si la ligne ne commence pas par / , on saute
            if (lignes[i].search('//') === 0) {continue;}                            // si la ligne commence par // , on saute

            var pos = lignes[i].search("//");
            if (pos != -1) {lignes[i] = lignes[i].substring(0,pos-1);}
            lignes[i] = lignes[i].replace (/"""/g,'"');                              // Traitement des guillemets suite au CSV
            lignes[i] = lignes[i].replace (/""/g,'"');                              // Traitement des guillemets suite au CSV
            //lignes[i] = lignes[i].replace (/^"/g,'');
            var inter1 = lignes[i].split(/,/);                                      // Split with comma Char
            if (inter1.length <2) {continue;}                                        // jump over if incorrect syntax
            if (inter1[0].substring(0,1) !="/") {inter1[0] = "/"+inter1[0]+"/";}    //transform simple texte in regexp
            inter1[1]="("+inter1[1].replace (/[ ]*$/g,"")+")";
            var toverified  = inter1[0].substring(1,inter1[0].lastIndexOf("/"));    // extrait la partie entre / pour egexp
            var flag  = inter1[0].substring(inter1[0].lastIndexOf("/")+1);          // extrait le flag
            var correct = inter1[1].replace (/@/g,",");                              // replace à by comma
            if (correct == "()") { correct ='("")';}                                // interprete une chaine vide
            WME_CRN_Dictionary.push({line :i+N_ligne, toVerify: toverified.replace (/@/g,",") , flags: flag.replace (/"/g,""),  corrected : correct});
        }

        //alert (WME_CRN_Dictionary.length)
        return ;
    }

    function insertButton() {

        if(document.getElementById('WME_CRN_All') === null) {
			var chk1 = $('<Label style="font-weight:normal;"><input type="checkbox"; style="vertical-align: middle;margin: 0px;" id="WME_CRN_enable" title="Enable or Disable WME CRN">On-Off    </input></Label>');
            var chk2 = $('<Label style="font-weight:normal;height:20px;margin:0px 5px 0px 0px"><input type="checkbox"; style="vertical-align: middle;margin: 0px;" id="WME_CRN_CheckRoadName" title="Click for automatic check of road name (and landmark if layer On)"> Auto </input></Label>');
			var url1 = $('<div style="font-size:12px;display: inline;"> <u><i><a href="https://greasyfork.org/scripts/3776-wme-check-road-name" target="_blank">Check Road Name ' + WME_CRN_version+ '</a></i></u>');
			var btn0 = $('<div id="WME_CRN_Dictionary" style="display: inline;"  > <u><i><a style= "float:right; font-size:12px;padding:0 7px 0 3px;border-width:1px;border-color: SkyBlue; border-style:solid;border-radius:6px;" href="https://docs.google.com/spreadsheets/d/'+publicDictionnarykey+'/edit#gid=0" target="_blank" title="Go to dictionary"> '+searchIdOTAN(WME_CRN_MainCountry)+' </a> </i></u>');

            var btn1 = $('<button class="waze-btn waze-btn-small waze-btn-white" style="padding:0px 6px; height:20px; margin-right:5px;" id="WME_CRN_chk"  title="Click this button to Check Road Names">Check Road</button>'); btn1.click(rename_Road2);
            var btn2 = $('<button class="waze-btn waze-btn-small waze-btn-white" style="padding:0px 6px; height:20px; margin-right:5px;" id="WME_CRN_stop" title="Click this button to stop">Stop</button>'); btn2.click(stop_check); //           var chk2 = $('<Label class="controls-container" style="font-weight:normal"><input type="checkbox"; style="vertical-align: middle;margin: 0px;" id="WME_CRN_CheckRoadName" title="Click for automatic check of road name (and landmark if layer On)"> Auto </input></Label>');
            var btn3 = $('<button class="waze-btn waze-btn-small waze-btn-white" style="padding:0px 6px; height:20px; margin-right:5px;" id="WME_CRN_raz"  title="Click this button to Clear stored roads">RAZ</button>'); btn3.click(RAZ);
            var btn4 = $('<button class="waze-btn waze-btn-small waze-btn-white" style="padding:0px 6px; height:20px; margin-right:5px;" title="Click this button to change to alternate name">Change To Altern. Name</button>'); btn4.click(ChAlternate1);
            var btn5 = $('<button class="waze-btn waze-btn-small waze-btn-white" style="padding:0px 6px; height:20px; margin-right: px;"id="WME_CRN_StreetID" title="Click this button to see Street IDS">Str ID</button>');btn5.click(ShowPrimaryStreetID);

			var cnt1 = $('<section id="WME_CRN_link"           style="padding-top:2px; margin:2px;"/>');
			var cnt2 = $('<section id="WME_CRN_rename"         style="padding-top:2px; margin:2px;"/>');
			var cnt3 = $('<section id="WME_CRN_ChangeToAltern" style="padding-top:2px; margin:2px; display : none"/>');

			cnt1.append(chk1); cnt1.append(url1); cnt1.append(" ");  cnt1.append(btn0);
            cnt2.append(btn1); cnt2.append(btn2); cnt2.append(chk2); cnt2.append(btn3); cnt2.append(btn5);
            cnt3.append(btn4);

			var WME_CRN_Menu = $('<div id="WME_CRN_All" style="height: auto;width:100%;"/>');
            WME_CRN_Menu.append(cnt1);
            WME_CRN_Menu.append(cnt2);
            WME_CRN_Menu.append(cnt3);

			delete mainDictionnaryKey ;     // on supprime les variables globales du dictionnaire
            delete publicDictionnarykey ;   // on n'en a plus besoin

            // ******* Mise en place des buttons
            var WME_CRN_MenuFlag = false, myAlertBoxFlag = false, myDialogBoxFlag = false;
            function put_WME_CRN_Menu() {        // wait for 'sidebar'
                if (document.getElementById('sidebar')!== null) {
                    if (document.getElementById('WME_JCB_All')!== null) {   // si mon menu existe
                        $("#WME_JCB_All").append('<hr style="margin-bottom:5px; margin-top:5px;width=100%;color:SkyBlue; background-color:SkyBlue; height:1px;">'); }     // on ajoute une barre
                    else {
                        var WME_JCB_Menu = $ ('<div id="WME_JCB_All" style="padding:2px 2px 2px 5px;margin:5px 0px 35px 10px;width:295px; border-width:3px; border-style:double;border-color: SkyBlue; border-radius:10px"/>');
                        $("#sidebar").append(WME_JCB_Menu); // sinon on le créé
                    }
                    $("#WME_JCB_All").append(WME_CRN_Menu);    // on ajoute le menu CRN
                    WME_CRN_MenuFlag = true;
                }
                else {
                    setTimeout (function () {put_WME_CRN_Menu();}, 500);
                }
            }
            put_WME_CRN_Menu();

            // Boite d'alerte
            function put_myAlertBox() {
                if (document.getElementById('edit-buttons')!== null) {
                    if (document.getElementById('WME_JCB_AlertBox')=== null) {
                        var myAlertBox = $('<div id="WME_JCB_AlertBox" class="form-search" style="opacity : 0.8;display :none; padding :4px 10px; height: auto;min-height: 27px; position: absolute;top :6px; margin-left: 370px; margin-right: auto; background-color: #fff;border-radius: 15px;"/>');
                        var myAlertTxt = $('<div id="WME_JCB_AlertTxt" style=" opacity : 1;color : black; display:inline;padding:0px 0px">City ID/');	$("#edit-buttons").append(myAlertBox);

                        myAlertBox.append(myAlertTxt);
                        $("#edit-buttons").append(myAlertBox);
                    }
                    myAlertBoxFlag = true;
                }
                else {setTimeout (function () {put_myAlertBox();}, 501);}
            }
            put_myAlertBox();

            function start_init_WME_CRN() {         // si tous les boutons sont chargés on démarre le script
                if (WME_CRN_MenuFlag && myAlertBoxFlag) {init_WME_CRN();}
                else {setTimeout(function () {start_init_WME_CRN();}, 501);}
            }
            start_init_WME_CRN();
        }
        console_log("Check Road Name initialized");
    }

    var WME_CRN_badStreet = [];
    var WME_CRN_goodStreet = [];
    var WME_CRN_badAlternateStreet = [];
    var listSegIDs = [];
    var listLmrkIDs = [];
	var myStreets = [];

    function ChAlternate1 (ev) {
        var selection = [];                              											// Stocke la selection
        var selectedItems = W.selectionManager.getSelectedFeatures();
		for (var j = 0; j< selectedItems.length;j++) {
            selection.push(selectedItems[j].model);
        }
        for (var i = 0; i<selection.length;i++) {
			var sel =selection[i];
			//W.selectionManager.select([sel]);
			//W.selectionManager.setSelectedModels(sel);
            if (sel.type == "segment") {
                var street= W.model.streets.objects[sel.attributes.primaryStreetID];
                var streetName = (street.name)? street.name : "" ;
                var city = W.model.cities.objects[street.cityID];
                var cityName = city.attributes.name;
                var dxxx = streetName;
                if (/(^[A|D|E|N|M][1-9][0-9]*[.]*[0-9]*[a-z]*[0-9]*)/.test(streetName)) {					// le nom commence par un numéro de route
                    dxxx = dxxx.match(/(^[A|D|E|N|M][1-9][0-9]*[.]*[0-9]*[a-z]*[0-9]*)/)[0];                // On extrait le numéro de route																													// reset index regex
					streetName = streetName.replace (/(^[A|D|E|N|M][1-9][0-9]*[.]*[0-9]*[a-z]*[0-9]*)/,"");
                    streetName = streetName.replace (/(^ \- )/,"");}  										// On extrait le nom de la rue
                var lieuDit = "";
                if (/[(]/.test(cityName) && /[)]/.test(cityName)) {                        					// c'est un lieudit
                    lieuDit = cityName.replace (/([a-zéèêîïëôâàû '-]*)[ ][(].*/gi,"$1");              		// extrait le lieudit
                    cityName = cityName.replace (/[a-zéèêîïëôâàû '-]*[ ][(](.*)/gi,"$1");                   // extrait la ville d'origine
                    cityName = cityName.replace (/([a-zéèêîïëôâàû '-)]*)([ ][(][0-9][0-9][)])*[)]/gi,"$1"); // supprime le département s'il existe
 //                   add_alternative_street_city (lieuDit,cityName);										// on ajoute le lieudit en alternate de la ville
                    if (streetName==='') {streetName = lieuDit;}											// si la rue n'est pas nommée, elle prend le nom du lieudit
                }

				var multiaction = new WazeActionMultiAction();
				multiaction.setModel(W.model);

				multiaction.doSubAction(changeStreetAdress (sel, city.attributes.countryID, city.attributes.stateID,"", dxxx));
				sel.getAddress();

				if (streetName!==lieuDit && streetName!=="") {
					multiaction.doSubAction(add_Alternative_Street(sel,city.attributes.countryID,city.attributes.stateID,cityName,streetName));
				}
				if (lieuDit!=="" ) {
					multiaction.doSubAction(add_Alternative_Street(sel,city.attributes.countryID,city.attributes.stateID,cityName,lieuDit));
				}
				multiaction._description = I18n.t("save.changes_log.actions.UpdateFeatureAddress", {objectType: "segment"});
				W.model.actionManager.add (multiaction);
			}
        }
        return;
    }

	function add_Alternative_Street (sel, country_ID, state_ID,city_Name, street_Name) {
		var attr = {
			countryID: country_ID,
			stateID: state_ID,
			cityName: city_Name,
			emptyCity: (city_Name==''),
			streetName: street_Name,
			emptyStreet: (street_Name=='')
		};
		var add_Alternative = new WazeActionAddAlternateStreet(sel, attr);
		add_Alternative._description = I18n.t("save.changes_log.actions.UpdateFeatureAddress", {objectType: "segment"});
		return add_Alternative;
	}

    function ShowPrimaryStreetID(ev) {
        var selectedItems = W.selectionManager.getSelectedFeatures();
		if (selectedItems.length == 1) {
            var sel = selectedItems[0].model;                         // .model pour compatibilité
            if ((sel.type == "segment") && (sel.attributes.primaryStreetID !== null)) {
                var Street = sel.model.streets.get(sel.attributes.primaryStreetID);
                var City   = sel.model.cities.get(Street.cityID);
                var states = sel.model.states.get(City.attributes.stateID);
                var country= sel.model.countries.get(City.attributes.countryID);

                var max_length = 2 + Math.max (sel.attributes.primaryStreetID.toString().length,Street.cityID.toString().length,City.attributes.stateID.toString().length, City.attributes.countryID.toString().length );
                var message =  "StreetID = "+ completeWithSpaces (sel.attributes.primaryStreetID,max_length) +"  Street name = "+ Street.name;
                message += "\nCityID = " + completeWithSpaces(Street.cityID,max_length) +"      City name = "+ City.attributes.name;
                message += "\nStateID = " + completeWithSpaces(City.attributes.stateID,max_length) + "   State name = "+ states.name;
                message += "\nCountryID = " + completeWithSpaces(City.attributes.countryID,max_length) + "Country name = "+ country.name;

                alert (message);
            }
        }
        else { alert ("Sélection incorrecte"); }
    }

    function completeWithSpaces (name,lgth) {
        var name1 = name.toString();
        return (name1 + " ".repeat((lgth - name1.length)*2));
    }

    function RAZ (ev) {
        WME_CRN_badStreet.length = 0;
        WME_CRN_goodStreet.length = 0;
        WME_CRN_badAlternateStreet.length = 0;
		myStreets.length = 0;
        document.getElementById('WME_CRN_raz').disabled = true; // on desactive le bouton RAZ puisque les tableaux sont vides
        return;
    }

    function stop_check (ev) {
        listSegIDs.length = 0;
        listLmrkIDs.length = 0;
        document.getElementById ('WME_CRN_CheckRoadName').checked = 0;
        document.getElementById ('WME_CRN_CheckRoadName').disabled = false;
        document.getElementById ('WME_CRN_chk').disabled = false;
        return;
    }

	function rename_Road2 (ev) {
        var name, oldName, newName;
        var ldmk,seg,mySegs
        var roadID,ldmkID,cityID,goodstreet;
        listLmrkIDs.length = 0;
        listSegIDs.length = 0;

//        if (findPending().length=== 0  && W.map.zoom > 1 && limitForSaveNotReach() )  {  // wait for loading
		if (W.map.zoom > 1 && limitForSaveNotReach() ) {

            document.getElementById('WME_CRN_chk').disabled = true;            // on désactive le bouton "check" durant le check
            document.getElementById('WME_CRN_CheckRoadName').disabled = true;

            myStreets.length = 0;
            if (WME_CRN_goodStreet.length > 1500) {WME_CRN_goodStreet.splice(0,750);}    // on vide les plus anciennes  goods streets s'il y en a trop de stocker
            if (!limitForSaveNotReach()){myAlert ("<FONT color='red'><b>Please save and retry</b></FONT>");}
			for (var streetID in W.model.streets.objects) {

                var street = W.model.streets.objects[streetID];
                var street_ID = street.id;

				if (notInArray(street_ID,WME_CRN_goodStreet)
                    && notInArray(street_ID,WME_CRN_badStreet)
                    && street.name && street.name!="" && street.name !== null  // verif nom existe
                    && street.cityID != null
                    && W.model.cities.objects[street.cityID]
                    && W.model.cities.objects[street.cityID].attributes.name!== null
                    && W.model.cities.objects[street.cityID].attributes.countryID == WME_CRN_MainCountry){
                       myStreets.push (W.model.streets.objects[streetID]);  // on garde que les streets avec noms
				}
			}
			for (var i = 0; i < myStreets.length; i++) {
                name = myStreets[i].name;
				newName = rename2(name);
                if (newName == name) {WME_CRN_goodStreet.push(myStreets[i].id);}// on stocke l'ID du bon nom pour ne pas le regrader à nouveau
                if (!limitForSaveNotReach()){myAlert ("<FONT color='red'><b>Please save and retry</b></FONT>");}
                if (newName!=name && limitForSaveNotReach()){
					mySegs = searchSegWithStreetID (myStreets[i].id); // on extrait les primaryStreet & alternateStreet
					var myLdmkToCheckStreetID  = searchLdmkToCheckStreetID(myStreets[i].id);    //on exttrait les landmark

                    if (mySegs.main.length + mySegs.alternate.length + myLdmkToCheckStreetID.length > 0) {
						var city = W.model.cities.objects[myStreets[i].cityID];
                        var message = "";
                        if (mySegs.main.length>0)           {message += mySegs.main.length+" street(s) to change in main adress\n";}
                        if (mySegs.alternate.length>0)      {message += mySegs.alternate.length+" street(s) to change in alternative adress\n";}
                        if (myLdmkToCheckStreetID.length>0) {message += myLdmkToCheckStreetID.length+" landmark(s) to change adress\n";}
                        message += "\nCity : "+city.attributes.name+"\n"
                        message += "Département : "+ W.model.states.objects[city.attributes.stateID].name+"\n"
                        message += "Old name is : "+name+"\n\n"
                        message += "Confirm the new name or change it";
                        newName = prompt (message,newName);
                        if (newName === null) {
                            WME_CRN_badStreet.push (myStreets[i].id);
                            document.getElementById('WME_CRN_raz').disabled = false;}
                        else {
							if (newName != name) {
								var multiaction = new WazeActionMultiAction();
								multiaction.setModel(W.model);
                                // on traite les primaryStreet
                                for (var j = 0; j < mySegs.main.length; j++) {
                                    seg = W.model.segments.objects[mySegs.main[j]]
                                    multiaction.doSubAction (changeStreetAdress (seg, city.attributes.countryID, city.attributes.stateID,city.attributes.name, newName));
									seg.getAddress();
								}
								// on traite les alternateStreet
								for (var j1 = 0; j1 < mySegs.alternate.length; j1++) {
                                    seg = W.model.segments.objects[mySegs.alternate[j1]]
                                    var oldStreetIDs = seg.attributes.streetIDs;
                                    var newStreetIDs = deleteInArray(myStreets[i].id,oldStreetIDs)
                                    multiaction.doSubAction (new WazeActionUpdateObject(seg, {streetIDs: newStreetIDs}));
                                    multiaction.doSubAction (add_Alternative_Street(seg,city.attributes.countryID,city.attributes.stateID,city.attributes.name,newName));
									seg.getAddress();
								}
								// on traite les adresses des landmark
								if (checkLayerState ("landmarks")) {
									for (var j2 = 0; j2 < myLdmkToCheckStreetID.length; j2++) {
                                        multiaction.doSubAction(changeVenueAdress (myLdmkToCheckStreetID[j2], city.attributes.countryID, city.attributes.stateID,city.attributes.name, newName));
										myLdmkToCheckStreetID[j2].getAddress();
									}
								}
                                var modifiedSegsIds = delete_multi_Ids(mySegs.main.concat(mySegs.alternate));
                                if (modifiedSegsIds.length== 1) {multiaction._description = I18n.t("save.changes_log.actions.UpdateFeatureAddress", {objectType: "segment"});}
                                if (modifiedSegsIds.length > 1) {multiaction._description = I18n.t("save.changes_log.actions.MultiUpdateFeatureAddress", {count: modifiedSegsIds.length,objectType: "segment"});}
                                if (myLdmkToCheckStreetID.length== 1) {
                                    multiaction._description = completeForSave(multiaction._description) + I18n.t("save.changes_log.actions.UpdateFeatureAddress", {objectType: "venue"});}
                                if (myLdmkToCheckStreetID.length > 1) {
                                    multiaction._description = completeForSave(multiaction._description) + I18n.t("save.changes_log.actions.MultiUpdateFeatureAddress", {count: myLdmkToCheckStreetID.length,objectType: "venue"});}

                                if ((modifiedSegsIds.length + myLdmkToCheckStreetID.length) > 0) { W.model.actionManager.add (multiaction);}

                            }
						}
					}
                }
            }
// on traite les noms des landmark
		    if (checkLayerState ("landmarks")) {
                var myWazeVenues = []; myWazeVenues = W.model.venues.objects;
                for (ldmkID in myWazeVenues) {
                    ldmk =  myWazeVenues[ldmkID];
                    if (ldmk!== null && ldmk.state !== "Delete" && onScreen(ldmk) && (ldmk.attributes.approved) &&  (ldmk.attributes.streetID!== null) && ldmk.isAllowed(ldmk.PERMISSIONS.EDIT_GEOMETRY)) {
                        street = W.model.streets.objects[ldmk.attributes.streetID];
                        if (street && street.cityID !== null) {
                            city = W.model.cities.objects[street.cityID];
                            oldName = ldmk.attributes.name;
                            if (city && city.attributes.name!== null && city.attributes.countryID == WME_CRN_MainCountry && oldName && oldName!== "" && notInArray(oldName,WME_CRN_badStreet) && notInArray(oldName,WME_CRN_goodStreet)) {              //  Le segment remplit toutes les conditions pour analyse ultérieure
                                listLmrkIDs.push (ldmkID);                                          // alimente la bsase des rues a tester
                            }
                        }
                    }
                }
                listLmrkIDs = delete_multi_Ids (listLmrkIDs);
                checkLandmarkName (listLmrkIDs);
 //               modif = checkLandmarkName (listLmrkIDs);
            }
		}

        setTimeout (function(){manage_CheckRoadName();},4001);
	}


    function completeForSave(texte) {
        var nbChar = 20;
        var maxChar = nbChar*(Math.trunc(texte.length/nbChar)+1);
        if (texte.length > 0){
            texte += " ";
            for (var i = texte.length; i < maxChar; i=i+2) {texte+="  ";}
        }
        return texte;
    }

    function searchLdmkToCheckStreetID (street_ID) {
        var myLdmks = [];
        for (var venues_ID in W.model.venues.objects){
            if (W.model.venues.objects[venues_ID].attributes.streetID == street_ID
                && ldmkIsAllowed(W.model.venues.objects[venues_ID])) {
                myLdmks.push(W.model.venues.objects[venues_ID]);
            }
        }
        return myLdmks;
    }

    function searchSegWithStreetID(Street_ID) {
        var	mySegs = {};
		mySegs.main = [];
		mySegs.alternate = [];
        for (var segmentID in W.model.segments.objects){
           	if (roadsIsAllowed(W.model.segments.objects[segmentID])) {
				if (W.model.segments.objects[segmentID].attributes.primaryStreetID == Street_ID) {
                    mySegs.main.push(segmentID);
				}
				if (W.model.segments.objects[segmentID].attributes.streetIDs
					&& isInArray(Street_ID, W.model.segments.objects[segmentID].attributes.streetIDs)) {
                    mySegs.alternate.push(segmentID);

				}
			}
        }
        return mySegs;
    }

	function ldmkIsAllowed(ldmk) {
         return (onScreen(ldmk) 							// le segment est a l'écran
         && ldmk.arePropertiesEditable()                    // n'a pas de closures
         && !ldmk.hasUpdateRequests()) // on a les droits d'editioon){
     }

    function roadsIsAllowed(road) {
         return (onScreen(road) 							// le segment est a l'écran
         && !road.attributes.hasClosures                    // n'a pas de closures
         && road.isAllowed(road.PERMISSIONS.EDIT_GEOMETRY)) // on a les droits d'editioon){
     }

    function userIsCM() {
		return (W.model.loginManager.user.editableCountryIDs &&
                W.model.loginManager.user.editableCountryIDs.length !== 0 &&
                W.model.loginManager.user.editableCountryIDs[0] != ' ');
    }

	function userIsFrenchCM() {
        //return true;
		return (userIsCM() && isInArray (73,W.model.loginManager.user.editableCountryIDs));
    }

    function onScreen(obj){
        if (obj.geometry){
            return(W.map.getExtent().intersectsBounds(obj.geometry.getBounds()));}
        return false;
    }

    function checkLandmarkName (listLmrkIDs) {
        var modif = false;
        var street,city,state,ldmark;
        var oldName, newName, cityName, ldmarkID;
        if (W.model.venues.objects.length === 0 ) { myAlert ("No landmark in memory");}
        for (var i = 0; i < listLmrkIDs.length; i++) {
            ldmark =  W.model.venues.objects[listLmrkIDs[i]];

            if (ldmark!==null && onScreen(ldmark)) {
                oldName = ldmark.attributes.name;
                if (oldName !==null && oldName !=="" && !isInArray(oldName,WME_CRN_badStreet)) {
                    if (ldmark.attributes.residential) {                                                  // on efface le nom sur place résidentielle
                        newName = "";}
                    else {
                        newName = rename2 (oldName);
                    }
                    newName = newName.replace (/ *:[ -]*/g," - ");          // remplacement des ":"par "-" pour les landmark
                    if (newName !=oldName && limitForSaveNotReach() ) {
                        //W.selectionManager.select([ldmark]);
						//W.selectionManager.setSelectedModels([ldmark]);
                        street = W.model.streets.objects [ldmark.attributes.streetID];
                        city = W.model.cities.objects [street.cityID];
                        state = W.model.states.objects[city.attributes.stateID];
                        if (typeof(city) === 'undefined' || city === null) {cityName ="";}
                        else {cityName= city.attributes.name;}

                        var message = " Landmark to rename ";
                        message += "\nType : " + ldmark.attributes.categories ;
                        message += "\n\nDépartement : " + state.name ;
                        message += "\nCity : " + cityName ;
                        message += "\nOld name is : " + oldName ;
                        message += "\n\nConfirm the new name or change it" ;

                        newName = prompt (message,newName);
                        if (newName === null) {
                            WME_CRN_badStreet.push (ldmark.attributes.name);
                            document.getElementById('WME_CRN_raz').disabled = false;
                        }
                        else if (newName != oldName) {
//                            $("input[name=name]").val(newName).change();				//contournement du require
							W.model.actionManager.add (new WazeActionUpdateObject(ldmark,{name: newName}));
                            modif = true;
                        }
                        //W.selectionManager.select([]);
						//W.selectionManager.setSelectedModels([]);
                    }
                }
            }
        }
        return modif;
    }

	function changeStreetAdress (sel, country_ID, state_ID,city_Name, street_Name) {
		var attr = {
			countryID: country_ID, stateID: state_ID,
			cityName: city_Name, emptyCity: (city_Name==''),
			streetName: street_Name, emptyStreet: (street_Name=='')
		};
        var changeStreet = new WazeActionUpdateFeatureAddress(sel, attr,{ streetIDField: "primaryStreetID"});
        changeStreet.generateDescription();
		return changeStreet ;
	}

   function changeVenueAdress (sel, country_ID, state_ID,city_Name, street_Name) {
		var attr = {
			countryID: country_ID, stateID: state_ID,
			cityName: city_Name, emptyCity: (city_Name==''),
			streetName: street_Name, emptyStreet: (street_Name=='')
		    };
       var changeVenue = new WazeActionUpdateFeatureAddress(sel, attr,{ streetIDField: "streetID"});
       changeVenue.generateDescription();
       return changeVenue;
	}

    function rename2(old_name) {
        var new_name = genericCorrection (old_name);
        var name = new_name;
        var list = WME_CRN_Dictionary;
        for (var i = 0; i < list.length; i++) {
            //console_log("Test de la ligne " + list[i].line +" "+  list[i].toVerify +" "+ list[i].flags +" "+ eval(list[i].corrected ));                // trace modification
            try {                                                         // Capture des erreurs de regexp
                var regexp = new RegExp(list[i].toVerify, list[i].flags);
                name = new_name.replace (regexp, eval(list[i].corrected));
            }
            catch (e) {                                              // Ca traite les erreurs
                var message = (list[i].line > 1000) ? (list[i].line - 1000) + " in public " : list[i].line + " in main " ;
                message = e + "\nLine "+ message + " dictionary has an error";
                message += "\n\nThis line is desactivated\n\nPlease correct it";
                alert (message);
                list.splice(i,1);                                                // delete incorrect line in array
            }

            //      if (name != new_name)  {                                            // informations de débug
            //         console_log("WME_CRN line " + list[i].line + ' OldName="'+new_name+'" ==> New_Name="'+name+'"');                // trace modification
            //     }

            new_name = name;
        }
        return genericCorrection (new_name);
    }

    function genericCorrection (name) {
        name = name.replace (/ +/g," ");   // delete double spaces
        name = name.replace (/^[ ]*/g,""); // delete "Space" at the begining of the name
        name = name.replace (/[ ]*$/g,""); // delete "Space" at the end of the name
        return name;
    }

    function checkLayerState (layerName) {
        var index = findLayerIndex (layerName);
        if (index !== null) {
            return W.map.controls[0].map.layers[index].visibility;
        }
        return false;
    }

    function activateLayer (layerName, flag) {
        if (flag === true || flag === false) {
            var index = findLayerIndex (layerName);
            if (index !== null) {
                var layerID = W.map.controls[0].map.layers[index].id;
                W.map.controls[0].map.getLayer(layerID).setVisibility(flag);         //affiche le Layer "landmark"  "Waze.Layer.FeatureLayer_60"
            }
        }
    }

	function findLayerIndex (layerName) {
        var index ;
		var layers = W.map.controls[0].map.layers;
		for (var i = 0; i<layers.length; i++) {
            if (layers[i].uniqueName && layers[i].uniqueName.toUpperCase() == layerName.toUpperCase()) {
				index=i;
            }
        }
        return index;
    }

    function delete_multi_Ids (myArray) {
        var myNewArray = [];
        if (myArray.length > 0) {
            myNewArray[0]= myArray [0];
            for (var i = 0, len = myArray.length; i < len; i++) {
                if (notInArray (myArray [i],myNewArray)) {myNewArray.push(myArray [i]);}
            }
        }
        return myNewArray;
    }

    function deleteInArray (item,array) {
        var newArray = [];
        for (var i = 0, len = array.length; i<len;i++) {
            if (array[i] != item ) {
                newArray.push (array[i]);
            }
        }
        return newArray;
    }

    function soustraitArray (array1,array2) {
        var newArray = [];
        for (var i = 0, len = array1.length; i<len;i++) {
            if (notInArray (array1[i] , array2)) {
                newArray.push (array1[i]);
            }
        }
        return newArray;
    }

    function isInArray (item,array) {return array.indexOf(item) !== -1;}
    function notInArray (item,array) {return array.indexOf(item) === -1;}
    function findPending() {
        var elements = W.map.controls[0].map.layers;
        for (var i = 0; i < elements.length;i++) {                  //scan all layers
            if (elements[i].loading === true ) {
                return [1];}            // if it is loading return an array not null
        }
        return [];                                              // return empty array (Compatibility with old pending manner)
        //return W.map.controls[5].pending;
    }

    function manage_WME_CRN(ev) {
        localStorage.WME_CRN_enable = document.getElementById ('WME_CRN_enable').checked == 1;
        if(document.getElementById('WME_CRN_enable').checked == 1) {
            document.getElementById ('WME_CRN_rename').style.display = "block";
            document.getElementById ('WME_CRN_Dictionary').style.display = "inline";
            if (userIsFrenchCM() && WME_CRN_MainCountry == 73) {document.getElementById ('WME_CRN_ChangeToAltern').style.display = "block";}
            else {document.getElementById ('WME_CRN_ChangeToAltern').style.display = "none";}
        }
        else {
            document.getElementById ('WME_CRN_rename').style.display = "none";
            document.getElementById ('WME_CRN_CheckRoadName').checked = 0;
            document.getElementById ('WME_CRN_ChangeToAltern').style.display = "none";
            document.getElementById ('WME_CRN_Dictionary').style.display = "none";
        }
        manage_CheckRoadName();
        WME_CRN_goodStreet.length = 0;                                              // vide le tableau des rues correctes
        return;
    }

    function manage_CheckRoadName() {
        if (document.getElementById ('WME_CRN_CheckRoadName').checked == 1) {
            document.getElementById('WME_CRN_CheckRoadName').disabled = true;        // on désactive la case
            document.getElementById('WME_CRN_chk').disabled = true;                   // on désactive le lancement manuel
            rename_Road2();
        }
        else {
            document.getElementById('WME_CRN_CheckRoadName').disabled = false;        // on désactive la case
            document.getElementById('WME_CRN_chk').disabled = false;
        }
        if (WME_CRN_badStreet.length===0 && WME_CRN_goodStreet.length===0) {          // gestion du bouton raz
            document.getElementById('WME_CRN_raz').disabled = true;}
        else {
            document.getElementById('WME_CRN_raz').disabled = false;}
        return;
    }

    function afficheObjet (objet) {
        for (var e in objet) {alert("objet["+e+"] ="+ objet[e]+" !");}
    }

    function console_log(msg) {
        if (console) {
            console.log(msg);}
    }

    function encodeHTML (var1) {
        var var2 = var1;
        var2 = var2.replace (/[&]/gi,"&amp;");
        var2 = var2.replace (/["]/gi,"&quot;");
        var2 = var2.replace (/[<]/gi,"&lsaquo;");
        var2 = var2.replace (/[>]/gi,"&rsaquo;");
        return var2;
    }

    function init_WME_CRN() {
        localStorage.removeItem('WME_CRN_CheckLdmkName');                        // Remove old item in LocalStorage
        localStorage.removeItem('WME_Merge_Unknown_Roads_CheckLdmkName');
        localStorage.removeItem('WME_Merge_Unknown_Roads_CheckRoadName');
        localStorage.removeItem('WME_Merge_Unknown_Roads_enable');
        localStorage.removeItem('WME_CRN_CheckCityName');
        localStorage.removeItem('WME_CRN_CheckRoadName');

        if (localStorage.WME_CRN_enable == "true") {                              // restaure old Values (if exist)
            document.getElementById ('WME_CRN_enable').checked = 1; }
		document.getElementById ('WME_CRN_CheckRoadName').checked = 0;
		document.getElementById('WME_CRN_enable').onclick = manage_WME_CRN;
		document.getElementById('WME_CRN_CheckRoadName').onclick = manage_CheckRoadName;
		document.getElementById ('WME_CRN_StreetID').style.display = "none";
		W.selectionManager.events.register("selectionchanged", null, manage_streetID);
		manage_streetID ();
		manage_WME_CRN ();

		myAlert("WME_CRN initialized");
		myAlert("Dictionnaries : " + W.model.countries.objects[WME_CRN_MainCountry].name);
    }

    function manage_streetID() {
		var selectedItems = W.selectionManager.getSelectedFeatures();
		if (selectedItems.length== 1) {
            document.getElementById ('WME_CRN_StreetID').style.display = "inline";}
        else {
            document.getElementById ('WME_CRN_StreetID').style.display = "none";}
    }
    return;

    function searchIdOTAN(countryID){
        switch (countryID) {
            case 73 : return " FRA "; break; // France
            case 74 : return "FR-FG"; break; // France - Guyane française
			case 75 : return "FR-PF"; break; // France - Polynésie française
            case 88 : return "FR-GP"; break; // France - Guadeloupe
            case 141: return "FR-MB"; break; // France - Martinique
			case 144: return "FR-MA"; break; // France - Mayotte
            case 148: return " MCO "; break; // Monaco
            case 152: return " MAR "; break; // Maroc
            case 184: return "FR-RE"; break; // France - Réunion
			case 209: return "FR-PM"; break; // France - Saint-Pierre et Miquelon
            case 243: return "FR-WF"; break; // France - Wallis et Futuna
            default : return " ??? ";
        }
    }

    function myAlert (message) {
        if (document.getElementById('edit-buttons')!==null && !document.getElementById ('WME_JCB_AlertTxt')) {       // verif (et réafffichage) de l'alerteBox
            var myAlertBox = $('<div id="WME_JCB_AlertBox" class="form-search" style="opacity : 0.8;display :none; padding :4px 10px; height: auto;min-height: 27px; position: absolute;top :6px; margin-left: 370px; margin-right: auto; background-color: #fff;border-radius: 15px;"/>');
            var myAlertTxt = $('<div id="WME_JCB_AlertTxt" style=" opacity : 1;color : black; display:inline;padding:0px 0px">City ID/');	$("#edit-buttons").append(myAlertBox);

            myAlertBox.append(myAlertTxt);
            $("#edit-buttons").append(myAlertBox);
        }
        if (document.getElementById ('WME_JCB_AlertTxt')){
            var myMessage = document.getElementById ('WME_JCB_AlertTxt').innerHTML;
            var line = myMessage.split("<br>");
            if (line.length==1 && line[0]===""){ line[0]= message;}
            else { line.push (message);}
            document.getElementById ('WME_JCB_AlertTxt').innerHTML = line.join ("<br>");
            document.getElementById ('WME_JCB_AlertBox').style.display = "block";
            setTimeout(function() {endAlert();}, 3750 + 500*Math.random());
        }
    }

    function endAlert() {
        var myMessage = document.getElementById ('WME_JCB_AlertTxt').innerHTML;
        var line = myMessage.split("<br>");
        line.shift();
        document.getElementById ('WME_JCB_AlertTxt').innerHTML = line.join ("<br>");
        if (line.length ===0){
            document.getElementById ('WME_JCB_AlertBox').style.display = "none";
        }
    }

    function limitForSaveNotReach() {
		if (W.model.actionManager.index) {return (W.model.actionManager.index < 99);}
		if (W.model.actionManager._undoStack) {return (W.model.actionManager._undoStack.length < 99);} // beta
	}

}

Check_Road_Name();
