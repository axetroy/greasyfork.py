// ==UserScript==
// @name        WK Language Point Connector Cards
// @namespace   WK_LanguagePointConnectorCards
// @description Adds a section to your Dashboard to play Language Point Connctions fridge magnet poetry.
// @author      hoovard
// @include     https://www.wanikani.com/dashboard
// @include     https://www.wanikani.com/
// @version     0.1.0
// @run-at      document-end
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js
// ==/UserScript==
// Based on this Kiochi Language Learning Tip Video
// https://www.youtube.com/watch?v=pTlAy_gkyCc

$(document).ready(initLPCSection);

//////////// Sets of language points

var strParticleList = "は,か,が,の,に,へ,を,と,や,も,に";
var strNounList = "人間,医者,足,脚 ,顔,歯,動物,犬,猫,水,食べ物,鰐,蟹,家";
var strVerbList = "歩く,遊ぶ,会う,入る,始まる,行く,帰る,かかる,書く,買う,聞く,待つ,持つ,習う,飲む,送る,思う,泳ぐ,知る,座る,立つ,止まる,着く,売る,歌う,分かる,笑う";
var strAdjectiveList = "大きい,小さい,長い,短い,太い,薄い,広い,狭い,重い,軽い,高い,低い,速い,遅い,多い,少ない,固い,深い,浅い,美しい,新しい";
var strCustomList = "北,南,東,西";

var iDefinitionType; // which list of items is being updated.

////////////////////////////////////

var iItemLimit = 12;
var iSavedListCount = 0;

////////////////////////////////////


var a_strSources = [];
var a_strChosenItems = [];

var HLPCStyles = "";
HLPCStyles += "<style>";
HLPCStyles += "li.Card0 {padding:0; margin:0; border: 1px dotted #999999; text-align: center; background-color: #729EBA;}";
HLPCStyles += "li.Card1 {padding:0; margin:0; border: 1px dotted #999999; text-align: center; background-color: #25B125;}";
HLPCStyles += "li.Card2 {padding:0; margin:0; border: 1px dotted #999999; text-align: center; background-color: #D69C4D;}";
HLPCStyles += "li.Card3 {padding:0; margin:0; border: 1px dotted #999999; text-align: center; background-color: #C17482;}";
HLPCStyles += "li.Card4 {padding:0; margin:0; border: 1px dotted #999999; text-align: center; background-color: #A670AC;}";

HLPCStyles += "div#CardDeliverySection {padding: 20px; margin-bottom: 0px; border: 1px solid #bbbbbb; background-color: #dddddd;}";
HLPCStyles += "div#DefinitionSection {padding: 2px; margin-bottom: 0px; border: 1px solid #bbbbbb; background-color: #dddddd;}";
HLPCStyles += "div#DefinitionInputSection {padding: 2px; margin-bottom: 0px; border: 1px solid #bbbbbb; background-color: #dddddd;}";

HLPCStyles += "#sortable { list-style-type: none; margin: 0; padding: 0; width: 100%; list-type: inline;}";
HLPCStyles += "#sortable li { margin: 0 3px 3px 3px; padding: 0.4em; font-size: 1.4em; height: 18px; display: inline;}";

HLPCStyles += "";
HLPCStyles += "</style>";

var strInitialDiv = "";

strInitialDiv += "<div style='width 100%; text-align: center;'>";
strInitialDiv += "<div id='HoovardLanguageConnectorSection' style='border: 0px; color: #000000; background-color: #cccccc; width: 100%; margin-left: auto; margin-right: auto; margin-bottom: 20px; text-align: center;'>";
strInitialDiv += "<p>LANGUAGE CONNECTIONS :: <a class='HLPCLink' href='https://www.youtube.com/watch?v=pTlAy_gkyCc' target='LCPVideo'>Watch the Tofugu video</a></p>";

// controls start here
strInitialDiv += "<form id='connections'>";
strInitialDiv += "<p>Number of items: <input id='itemCountInput' style='width: 50px; border: 1px solid #999999;' type='number' min='1' max='"+iItemLimit+"' name='itemCount' size='4' maxlength='3' value='3' /> |";

strInitialDiv += " <input type='checkbox' id='Particles' name='Particles' value='Particles' checked='checked'> Particles";
strInitialDiv += " <input type='checkbox' id='Nouns' name='Nouns' value='Nouns' checked='checked'> Nouns";
strInitialDiv += " <input type='checkbox' id='Verbs' name='Verbs' value='Verbs' checked='checked'> Verbs";
strInitialDiv += " <input type='checkbox' id='Adjectives' name='Adjectives' value='Adjectives' checked='checked'> Adjectives";
strInitialDiv += " <input type='checkbox' id='Custom' name='Custom' value='Custom'> Custom";

strInitialDiv += " | <button id='go'>Get cards</button> | <button id='clear'>Clear</button> <span id='SaveButtonArea'> | <button id='keepCurrentSet'>New set</button></span>";
strInitialDiv += "</p>";

strInitialDiv += "<div id='CardDeliverySection'>";

strInitialDiv += "</div>";


// controls end here
strInitialDiv += "</form>";


// data input section starts here
strInitialDiv += "<div id='DefinitionSection'>";
strInitialDiv += "<a id='particleDefiner' href='#'>Particles</a> | ";
strInitialDiv += "<a id='nounDefiner' href='#'>Nouns</a> | ";
strInitialDiv += "<a id='verbDefiner' href='#'>Verbs</a> | ";
strInitialDiv += "<a id='adjectiveDefiner' href='#'>Adjectives</a> | ";
strInitialDiv += "<a id='customDefiner' href='#'>Custom</a>";
strInitialDiv += "</div>";
strInitialDiv += "<div id='DefinitionInputSection'><span id='inputTitle'>Input</span><form id='definitionInputForm'><input id='CSVInput' style='width: 60%; border: 1px solid #999999; background-color: #ffffff;' type='text' name='CSVInput' size='100' maxlength='256' value='' /><p><button id='inputOKButton'>OK</button> <button id='inputCancelButton'>Cancel</button></p></form></div>";


strInitialDiv += "<div id='CopyTextSection'><span id='CopyTextTitle'>Copy text with Ctrl-c</span><form id='copyTextForm'><input id='TextToCopy' style='width: 60%; border: 1px solid #999999; background-color: #ffffff;' type='text' name='TextToCopy' size='100' maxlength='256' value='' /><p><button id='copyTextDoneButton'>Done</button></p></form></div>";

strInitialDiv += "</div>";
strInitialDiv += "</div>";
strInitialDiv += "";
strInitialDiv += "";
strInitialDiv += "";



  
  


function initLPCSection()
{
	
	iSavedListCount = 0;
	// check for existing language lists in jStorage
	
	if ( ! $.jStorage.get("strParticleList") ) {
		$.jStorage.set("strParticleList", strParticleList);
	}
	
	if ( ! $.jStorage.get("strNounList") ) {
		$.jStorage.set("strNounList", strNounList);
	}
	if ( ! $.jStorage.get("strVerbList") ) {
		$.jStorage.set("strVerbList", strVerbList);
	}
	if ( ! $.jStorage.get("strAdjectiveList") ) {
		$.jStorage.set("strAdjectiveList", strAdjectiveList);
	}
	if ( ! $.jStorage.get("strCustomList") ) {
		$.jStorage.set("strCustomList", strCustomList);
	}
	
	$( "head" ).append( HLPCStyles );
	$('section.progression').after(strInitialDiv);
	
	initialiseSortables();
    
    $( "form#connections" ).bind( "submit", function( event ) {
	  
	  event.preventDefault();
	});
    
    $( "form#definitionInputForm" ).bind( "submit", function( event ) {	  
	  event.preventDefault();
	});
	
	
	$( "button#go" ).click(function() {
	  populateConnections();
	});	
	
	$( "button#clear" ).click(function() {
	  clearConnections();
	});
	
	$( "button#keepCurrentSet" ).click(function() {
	  keepCurrentSet();
	});
	
	$( "button#copyTextDoneButton" ).click(function() {
	  $("#CopyTextSection").hide();
	  $("#TextToCopy").val('');
	});
	
	$( "form#definitionInputForm" ).bind( "submit", function( event ) {	  
			event.preventDefault();
	});
	
	
	
	$( "form#copyTextForm" ).bind( "submit", function( event ) {	  
			event.preventDefault();
	});
	
	$( "button#inputCancelButton" ).click(function() {
		$("#DefinitionSection").show();
		$("#DefinitionInputSection").hide();
		iDefinitionType = -1;
	});
	
	$( "button#inputOKButton" ).click(function() {
		// get input from form field and write it to jStorage
		switch (iDefinitionType)
		{
			case 0:
				$.jStorage.set("strParticleList", $("#CSVInput").val());
				break
			case 1:
				$.jStorage.set("strNounList", $("#CSVInput").val());
				break
			case 2:
				$.jStorage.set("strVerbList", $("#CSVInput").val());
				break
			case 3:
				$.jStorage.set("strAdjectiveList", $("#CSVInput").val());
				break
			case 4:
				$.jStorage.set("strCustomList", $("#CSVInput").val());
				break
		}
		
		// close the form
		$("#DefinitionSection").show();
		$("#DefinitionInputSection").hide();
		$("#CSVInput").val("")
		iDefinitionType = -1;
	});
	
	// links to open input form
	
	$( "#particleDefiner" ).bind( "click", function() {
	  $("#DefinitionSection").hide();
	  $("#DefinitionInputSection").show();		
	  $("#CSVInput").val($.jStorage.get("strParticleList"));
	  iDefinitionType = 0;
	  $("#inputTitle").html('Input comma separated list of PARTICLES: ');
	  return false;
	});
	
	$( "#nounDefiner" ).bind( "click", function() {
	  $("#DefinitionSection").hide();
	  $("#DefinitionInputSection").show();		
	  $("#CSVInput").val($.jStorage.get("strNounList"));
	  iDefinitionType = 1;
	  $("#inputTitle").html('Input comma separated list of NOUNS: ');
	  return false;
	});
	
	$( "#verbDefiner" ).bind( "click", function() {
	  $("#DefinitionSection").hide();
	  $("#DefinitionInputSection").show();
	  $("#CSVInput").val($.jStorage.get("strVerbList"));
	  iDefinitionType = 2;
	  $("#inputTitle").html('Input comma separated list of VERBS: ');
	  return false;
	});
	
	$( "#adjectiveDefiner" ).bind( "click", function() {
	  $("#DefinitionSection").hide();
	  $("#DefinitionInputSection").show();
	  $("#CSVInput").val($.jStorage.get("strAdjectiveList"));
	  iDefinitionType = 3;
	  $("#inputTitle").html('Input comma separated list of ADJECTIVES: ');
	  return false;
	});
	
	$( "#customDefiner" ).bind( "click", function() {
	  $("#DefinitionSection").hide();
	  $("#DefinitionInputSection").show();
	  $("#CSVInput").val($.jStorage.get("strCustomList"));
	  iDefinitionType = 4;
	  $("#inputTitle").html('Input comma separated list of STUFF: ');
	  return false;
	});
  
	$("#DefinitionInputSection").hide();
	$("#CopyTextSection").hide();
	$("#SaveButtonArea").hide();
	
}


function keepCurrentSet()
{
	var saveListId = "savedList" + iSavedListCount;
	$('div#CardDeliverySection').after("<div id='"+ saveListId +"' style='padding: 20px; margin-bottom: 0px; border: 1px solid #bbbbbb; background-color: #dddddd;'"+ iSavedListCount +"'></div>");
	var thisSet = $('div#CardDeliverySection').html();
	
	$('div#' + saveListId).html(thisSet);
	
	
	var strDeleteButton = "<span style='float: right;'>[<a href='#' id='saveSetDelete"+iSavedListCount+"' style='font-weight: bold; color:#660000;'>X</a>]</span>";
	$('div#' + saveListId).append(strDeleteButton);
	
	$( "#saveSetDelete"+iSavedListCount ).bind( "click", function() {
	  deleteSavedSet(this.id);
	  return false;
	});
	
	$( "a.copyThisSet" ).bind( "click", function() {
	  copySet(this.id);
	  return false;
	});
	
	clearConnections();
	initialiseSortables();
	doBindDoubleClick();
	
	++iSavedListCount;
}

function deleteSavedSet(oDeleteMe)
{
	var iDeleteID = oDeleteMe.substring(oDeleteMe.length-1, oDeleteMe.length);
	console.log("oDeleteMe: " + oDeleteMe);
	console.log("iDeleteID: " + iDeleteID);
	console.log("oDeleteMe.length: " + oDeleteMe.length);
	$( "div#savedList"+ iDeleteID).remove();
}

function populateConnections()
{
	a_strSources.length = 0;
	var strInsert = "";
	
	strInsert += "<ul id='sortable' class='connectedSortable' style='height: 100%; width: 100%; border: 0; padding-top: 1em; padding=bottom: 1em;'>";
	
	var iCount = $( "#itemCountInput" ).val()
	
	console.log("iCount: " + iCount)
	
	if (iCount > iItemLimit) {
		$( "#itemCountInput" ).val(iItemLimit);
		iCount = iItemLimit;
	}
	
	// make an array of selected item arrays - convert the jStorage CSV to actual arrays
	// so that while selecting, the items can be spliced to avoid duplicates
	
	
	
	if ($("#Particles").prop('checked')) {
		a_strSources.push(Array($.jStorage.get("strParticleList").split(","), 0));
	}
	
	if ($("#Nouns").prop('checked')) {
		a_strSources.push(Array($.jStorage.get("strNounList").split(","), 1));
	}
	
	if ($("#Verbs").prop('checked')) {
		a_strSources.push(Array($.jStorage.get("strVerbList").split(","), 2));
	}
	
	if ($("#Adjectives").prop('checked')) {
		a_strSources.push(Array($.jStorage.get("strAdjectiveList").split(","), 3));
	}
	
	if ($("#Custom").prop('checked')) {
		a_strSources.push(Array($.jStorage.get("strCustomList").split(","), 4));
	}
	
	
	
	var iAvailableItemCount = getAvailableItemCount();
	console.log(">>>>>>>>>>> iAvailableItemCount: " + iAvailableItemCount)
	if (iCount > iAvailableItemCount) {
		iCount = iAvailableItemCount;
	}
	console.log(">>>>>>>>>>> iCount: " + iCount)
	
	a_strChosenItems.length = 0;
	
	var i = 0;
	var strItemCandidate = "";
	
	do
	{
		var a_strRandomSource = getRandomSource();
		strItemCandidate = getRandomItem(a_strRandomSource[0]);
		console.log(strItemCandidate + " = " + $.inArray(strItemCandidate, a_strChosenItems));
		// this is a bit belt and braces here, now that the selection splices from the array, I don't think it
		// needs to check whether the item is already in the array
		if ($.inArray(strItemCandidate, a_strChosenItems) == -1 && strItemCandidate != "") {
			a_strChosenItems.push(strItemCandidate);
			strInsert += "<li class='LCCard Card" + a_strRandomSource[1] + "' style='white-space: nowrap;'>" + strItemCandidate + "</li>";			
			++i;
		}
		
	} while (i < iCount);	

	strInsert += "</ul>";
	
	
	
	$( "div#CardDeliverySection" ).html( strInsert );
	
	var strSaveButton = "<span style='float: right; margin-left: 4px;'>[<a href='#' class='copyThisSet' id='copyThisSet"+iSavedListCount+"' style='font-weight: bold; color:#660000;'>C</a>]</span>";
	$( "div#CardDeliverySection" ).append( strSaveButton );
	
	$( ".copyThisSet" ).bind( "click", function() {
	  copySet(this.id);
	  return false;
	});
	
	// bind double click delete function	
	doBindDoubleClick();
	
	// set the cards to be sortable so they can be dragged around to reorder
	initialiseSortables();
    
    
    $("#SaveButtonArea").show();
}

function deleteCard(iDeleteMe)
{
	console.log("DELETING CARD " + iDeleteMe.id);
	$( iDeleteMe ).remove();
}

function copySet(iCopyMe)
{
	var copyLinkParent = $("#"+iCopyMe).parent().parent();
	
	var listItems = $("#"+copyLinkParent[0].id + " li.LCCard").text();
	console.log("Copy me P " + copyLinkParent[0].id);
	console.log("Copy me " + listItems);
	$("#TextToCopy").val(listItems);
	$("#CopyTextSection").show();
	$("#TextToCopy").select();

}

function getAvailableItemCount()
{
	var iCount = 0;
	
	var a_strTemp;
	
	for (x = 0; x < a_strSources.length; ++x) {
		console.log(a_strSources[x][0].length);
		iCount += a_strSources[x][0].length;
	}
	
	return iCount;
}

function getRandomItem(strSourcelist)
{
	var strSplicedItem = strSourcelist.splice(Math.floor((Math.random() * strSourcelist.length)), 1);
	return strSplicedItem;
}

function getRandomSource()
{
	strIndex = Math.floor((Math.random() * a_strSources.length));
	var a_strReturn = a_strSources[strIndex];
	return a_strReturn;
}

function doBindDoubleClick()
{
	$( "li.LCCard" ).dblclick(function() {
	  deleteCard(this);
	});
}

function initialiseSortables()
{
	
	$( "#sortable" ).sortable({
      connectWith: ".connectedSortable"
    }).disableSelection()
	
	$("#sortable li").css('cursor', 'pointer');
	
	
}

function clearConnections()
{
	$( "div#CardDeliverySection" ).html( "" );
	$("#SaveButtonArea").hide();
}
