// ==UserScript==
// @name        Wanikani Review Count Analysis
// @namespace   HoovardWKRCA
// @description Reports review counts.
// @include     https://www.wanikani.com/dashboard
// @include     https://www.wanikani.com/
// @version     0.1.0
// @grant       none
// ==/UserScript==

$(document).ready(initReviewCount);

var strAPIKey = "";

var strUserLevelURL = "https://www.wanikani.com/api/user/"+ strAPIKey +"/level-progression";

var strRadURL = "https://www.wanikani.com/api/user/"+ strAPIKey +"/radicals";
var strKanURL = "https://www.wanikani.com/api/user/"+ strAPIKey +"/kanji/";
var strVocURL = "https://www.wanikani.com/api/user/"+ strAPIKey +"/vocabulary/";

const TYPE_RAD = 0;
const TYPE_KAN = 1;
const TYPE_VOC = 2;

var g_iDateDiff = 0;
var strTodayDate = getTimestamp();

var bDisplayOptionsVisible = false;


var a_iLevelTotals = []; // Array to hold level subtotals

var iUserLevel = 0;

var iCorrectTotal = 0;
var iIncorrectTotal = 0;

var iAccuracyCorrectTotal = 0;
var iAccuracyIncorrectTotal = 0;

function initReviewCount()
{
	// Insert the div and table elements
	var ReviewAnalysisStyles = "";
	var strInitialDiv = "";
	strInitialDiv += "<div id='FloatWrapper' style='text-align: center; width: 100%;'>";
	strInitialDiv += "<div id='MainAnalysisDisplaySectionWrapper' style='width: 1000px; margin-right: auto; margin-left: auto; padding-top: 10px; padding-bottom:10px; margin-bottom: 10px; border: 1px solid #999999;'>";	
	strInitialDiv += "<div id='buttonRegion' style='width: 100%; text-align: center; margin-bottom: 6px;'>";	
	
	// colour the API Key button to show whether a Key is available
	var strAPIKeyButtonColor;
	if ($.jStorage.get("ReviewAnalysisSavedAPIKey")) {
		strAPIKeyButtonColor = "#42AC48";
	} else {
		strAPIKeyButtonColor = "#E45350";		
	}
	
	strInitialDiv += "<button id='startAnalysis'>Review Count Analysis</button> | <button id='clearResults'>Clear Results</button><button id='toggleExtraOptions'>Show Display Options</button><button style='color: "+ strAPIKeyButtonColor +"' id='enterAPIKey'>Enter API Key</button>";
	strInitialDiv += "</div>";
	// Display options
	strInitialDiv += "<div id='displayOptions' style='width: 100%; text-align: center;'>";
	strInitialDiv += "Accuracy decimal places <input id='accuracyDecimals' style='width: 50px; border: 1px solid #999999;' type='number' min='1' max='8' name='accuracyDecimals' size='4' maxlength='3' value='3' /> | ";
	strInitialDiv += "Display as total answers entered: <input type='checkbox' id='displayAsTotalAnswers' name='displayAsTotalAnswers' value='displayAsTotalAnswers'>";
	
	strInitialDiv += "</div>";
	strInitialDiv += "<div id='ReviewAnalysisSection' style='width: 100%; text-align: center;'>";
	strInitialDiv += "</div>";
	strInitialDiv += "</div>";
	strInitialDiv += "</div>";
	
	
	$( "head" ).append( ReviewAnalysisStyles );
	$('section.progression').after(strInitialDiv);
	
	//$('div.navbar-static-top').after(strInitialDiv);
	
	$("#displayOptions").hide();
	bDisplayOptionsVisible = false;
	
	if (strAPIKey != "") {
		$("#APIkey").val(strAPIKey)
	}
	
	$( "button#startAnalysis" ).click(function() {
		$( "button#startAnalysis" ).attr('disabled', 'disabled');
		startReviewAnalysis();
	});
	
	$( "button#clearResults" ).click(function() {
		$( "button#startAnalysis" ).removeAttr('disabled');
		clearTable();
	});
	
	$( "button#enterAPIKey" ).click(function() {
		enterNewAPIKey();
	});
	
	$( "button#toggleExtraOptions" ).click(function() {
		toggelDisplayOptions();
	});
}

function toggelDisplayOptions()
{
	if (bDisplayOptionsVisible) {
		$("#displayOptions").hide();
		bDisplayOptionsVisible = false;
		$("#toggleExtraOptions").html('Show Display Options');
	} else {
		$("#displayOptions").show();
		bDisplayOptionsVisible = true;
		$("#toggleExtraOptions").html('Hide Display Options');
	}
}

function getLevelInformation(iLev)
{
	iUserLevel = iLev;
	console.log("Level: " + iUserLevel);
	var bDisplayAsTotalAnswers = $("#displayAsTotalAnswers").prop('checked');
	
	// get r/k/v info
	
	for (i = 1; i <= iUserLevel; ++i) {
		var iLevelRadSubTotal = 0;
		var iLevelKanSubTotal = 0;
		var iLevelVocSubTotal = 0;		
		
		// Radicals
		$.get( strRadURL + "/" + i, function( data ) {
			var iDataLevel = data['requested_information'][0]['level'];
			var iRadCount = Object.keys(data['requested_information']).length
			
			var iRadCorrectAnswers = 0;
			var iRadIncorrectAnswers = 0;
			var iRadAccuracyCorrect = 0;
			var iRadAccuracyIncorrect = 0;
			
			for (n = 0; n < iRadCount; ++n) {
				
				if (data['requested_information'][n]['user_specific'] != null) {
					var irCorrect = parseInt(data['requested_information'][n]['user_specific']['meaning_correct']);
					var irIncorrect = parseInt(data['requested_information'][n]['user_specific']['meaning_incorrect']);
					
					if (bDisplayAsTotalAnswers) {
						iRadCorrectAnswers += irCorrect;
						iRadIncorrectAnswers += irIncorrect;
						
						iCorrectTotal += irCorrect;
						iIncorrectTotal += irIncorrect;					
						
						iAccuracyCorrectTotal += iRadAccuracyCorrect;
						iAccuracyIncorrectTotal += iRadAccuracyIncorrect;
						
					
					} else {
					
						iRadCorrectAnswers += irCorrect;
						iRadIncorrectAnswers += irIncorrect;
						
						iRadAccuracyCorrect += irCorrect;
						iRadAccuracyIncorrect += irIncorrect;
						
						iAccuracyCorrectTotal += iRadAccuracyCorrect;
						iAccuracyIncorrectTotal += iRadAccuracyIncorrect;
						
						iCorrectTotal += irCorrect;
						iIncorrectTotal += irIncorrect;
					}
				}
			}
			
			if (bDisplayAsTotalAnswers) {
				a_iLevelTotals[iDataLevel-1] += (iRadCorrectAnswers + iRadIncorrectAnswers);
				$( "td#Levtot" + iDataLevel ).html(a_iLevelTotals[iDataLevel-1]);
				$( "td#Rad" + iDataLevel ).html( (iRadCorrectAnswers + iRadIncorrectAnswers) + " [+"+iRadCorrectAnswers+" -"+iRadIncorrectAnswers+"]");
				
				var dPercentage = (iCorrectTotal/(iCorrectTotal+iIncorrectTotal)) * 100;
				var iDailyAverage = Math.floor((iCorrectTotal+iIncorrectTotal) / g_iDateDiff)
				$( "td#mainTotal" ).html( strTodayDate + " " + "Answers: "+ (iCorrectTotal+iIncorrectTotal) +" [+"+iCorrectTotal+" -"+iIncorrectTotal+"] Accuracy: "+ (dPercentage.toFixed( $( "#accuracyDecimals" ).val() )) + "% "+ g_iDateDiff +" Days, Avg. " + iDailyAverage);	
			} else {
				a_iLevelTotals[iDataLevel-1] += iRadCorrectAnswers;
				$( "td#Levtot" + iDataLevel ).html(a_iLevelTotals[iDataLevel-1]);
				$( "td#Rad" + iDataLevel ).html( iRadCorrectAnswers );

				$( "td#mainTotal" ).html( getMainOutputString(iCorrectTotal, iIncorrectTotal, iAccuracyCorrectTotal, iAccuracyIncorrectTotal) );
			}
		});
		
		// Kanji
		$.get( strKanURL + "/" + i, function( data ) {
			var iDataLevel = data['requested_information'][0]['level'];
			var iKanCount = Object.keys(data['requested_information']).length;			
			var iKanCorrectAnswers = 0;
			var iKanIncorrectAnswers = 0;
			var iKanAccuracyCorrect = 0;
			var iKanAccuracyIncorrect= 0;
			
			for (n = 0; n < iKanCount; ++n) {
				if (data['requested_information'][n]['user_specific'] != null) {
					var ikCorrectM = parseInt(data['requested_information'][n]['user_specific']['meaning_correct']);
					var ikIncorrectM = parseInt(data['requested_information'][n]['user_specific']['meaning_incorrect']);
					var ikCorrectR = parseInt(data['requested_information'][n]['user_specific']['reading_correct']);
					var ikIncorrectR = parseInt(data['requested_information'][n]['user_specific']['reading_incorrect']);
					
					if (bDisplayAsTotalAnswers) {
						
						iKanCorrectAnswers += ikCorrectM + ikCorrectR;
						iKanIncorrectAnswers += ikIncorrectM + ikIncorrectR;
						
						iCorrectTotal += ikCorrectM + ikCorrectR;
						iIncorrectTotal += ikIncorrectM + ikIncorrectR;
					
					} else {
						
						iKanCorrectAnswers += ikCorrectM;
						iKanIncorrectAnswers += ikIncorrectM;
						
						iKanAccuracyCorrect += ikCorrectM + ikCorrectR;
						iKanAccuracyIncorrect += ikIncorrectM + ikIncorrectR;
						
						iAccuracyCorrectTotal += iKanAccuracyCorrect;
						iAccuracyIncorrectTotal += iKanAccuracyIncorrect;
						
						iCorrectTotal += ikCorrectM;
						iIncorrectTotal += ikIncorrectM;
					}
				}
			}
			
			if (bDisplayAsTotalAnswers) {
				a_iLevelTotals[iDataLevel-1] += (iKanCorrectAnswers + iKanIncorrectAnswers);
				$( "td#Levtot" + iDataLevel ).html( a_iLevelTotals[iDataLevel-1] );
				$( "td#Kan" + iDataLevel ).html( (iKanCorrectAnswers + iKanIncorrectAnswers) + " [+"+iKanCorrectAnswers+" -"+iKanIncorrectAnswers+"]");
				
				var dPercentage = (iCorrectTotal/(iCorrectTotal+iIncorrectTotal)) * 100;
				var iDailyAverage = Math.floor((iCorrectTotal+iIncorrectTotal) / g_iDateDiff)
				$( "td#mainTotal" ).html( strTodayDate + " " + "Answers: "+ (iCorrectTotal+iIncorrectTotal) +" [+"+iCorrectTotal+" -"+iIncorrectTotal+"] Accuracy: "+ (dPercentage.toFixed( $( "#accuracyDecimals" ).val() )) + "% "+ g_iDateDiff +" Days, Avg. " + iDailyAverage);	
			} else {					
				a_iLevelTotals[iDataLevel-1] += iKanCorrectAnswers;
				$( "td#Levtot" + iDataLevel ).html( a_iLevelTotals[iDataLevel-1] );
				$( "td#Kan" + iDataLevel ).html( iKanCorrectAnswers );
				
				$( "td#mainTotal" ).html( getMainOutputString(iCorrectTotal, iIncorrectTotal, iAccuracyCorrectTotal, iAccuracyIncorrectTotal) );
			}
		});
		
		// Vocab
		$.get( strVocURL + "/" + i, function( data ) {
			var iDataLevel = data['requested_information'][0]['level'];
			var iVocCount = Object.keys(data['requested_information']).length;
			var iVocCorrectAnswers = 0;
			var iVocIncorrectAnswers = 0;
			var iVocAccuracyCorrect = 0;
			var iVocAccuracyIncorrect= 0;
			
			for (n = 0; n < iVocCount; ++n) {
				if (data['requested_information'][n]['user_specific'] != null) {
					var ivCorrectM = parseInt(data['requested_information'][n]['user_specific']['meaning_correct']);
					var ivIncorrectM = parseInt(data['requested_information'][n]['user_specific']['meaning_incorrect']);
					var ivCorrectR = parseInt(data['requested_information'][n]['user_specific']['reading_correct']);
					var ivIncorrectR = parseInt(data['requested_information'][n]['user_specific']['reading_incorrect']);
					
					if (bDisplayAsTotalAnswers) {
						
						iVocCorrectAnswers += ivCorrectM + ivCorrectR;
						iVocIncorrectAnswers += ivIncorrectM + ivIncorrectR;
						
						iCorrectTotal += ivCorrectM + ivCorrectR;
						iIncorrectTotal += ivIncorrectM + ivIncorrectR;
					
					} else {
						iVocCorrectAnswers += ivCorrectM;
						iVocIncorrectAnswers += ivIncorrectM;
						
						iVocAccuracyCorrect += ivCorrectM + ivCorrectR;
						iVocAccuracyIncorrect += ivIncorrectM + ivIncorrectR;
						
						iAccuracyCorrectTotal += iVocAccuracyCorrect;
						iAccuracyIncorrectTotal += iVocAccuracyIncorrect;
						
						iCorrectTotal += ivCorrectM;
						iIncorrectTotal += ivIncorrectM;
					}
					
				}
			}
			if (bDisplayAsTotalAnswers) {
				a_iLevelTotals[iDataLevel-1] += (iVocCorrectAnswers + iVocIncorrectAnswers);
				$( "td#Levtot" + iDataLevel ).html( a_iLevelTotals[iDataLevel-1] );	
				$( "td#Voc" + iDataLevel ).html( (iVocCorrectAnswers + iVocIncorrectAnswers) + " [+"+iVocCorrectAnswers+" -"+iVocIncorrectAnswers+"]");
				
				var dPercentage = (iCorrectTotal/(iCorrectTotal+iIncorrectTotal)) * 100;
				var iDailyAverage = Math.floor((iCorrectTotal+iIncorrectTotal) / g_iDateDiff)
				$( "td#mainTotal" ).html( strTodayDate + " " + "Answers: "+ (iCorrectTotal+iIncorrectTotal) +" [+"+iCorrectTotal+" -"+iIncorrectTotal+"] Accuracy: "+ (dPercentage.toFixed( $( "#accuracyDecimals" ).val() )) + "% "+ g_iDateDiff +" Days, Avg. " + iDailyAverage);	
			} else {
				a_iLevelTotals[iDataLevel-1] += (iVocCorrectAnswers);
				$( "td#Levtot" + iDataLevel ).html( a_iLevelTotals[iDataLevel-1] );	
				$( "td#Voc" + iDataLevel ).html( iVocCorrectAnswers );
				
				$( "td#mainTotal" ).html( getMainOutputString(iCorrectTotal, iIncorrectTotal, iAccuracyCorrectTotal, iAccuracyIncorrectTotal) );
			}
		});
	}
}

function getMainOutputString(iCr, iIncr, iAccCr, iAccIncr)
{
	var strReturn = "";
	var dPercentage = (iAccCr/(iAccCr+iAccIncr)) * 100;
	var iDailyAverage = Math.floor((iCr) / g_iDateDiff);
	
	strReturn += strTodayDate + " " + "Reviews: "+ iCorrectTotal + " Accuracy: "+ (dPercentage.toFixed( $( "#accuracyDecimals" ).val() )) + "% "+ g_iDateDiff +" Days, Avg. " + iDailyAverage;
	
	return strReturn;
}

function clearTable()
{
	$( "div#ReviewAnalysisSection" ).html( "" );
	var a_iLevelTotals = [];

	iUserLevel = 0;

	iCorrectTotal = 0;
	iIncorrectTotal = 0;
	
	iAccuracyCorrectTotal = 0;
	iAccuracyIncorrectTotal = 0;
	
}

function startReviewAnalysis()
{
	
	if (! $.jStorage.get("ReviewAnalysisSavedAPIKey")) {
		alert ("Please enter your API Key");
		return 0;
	} else {
		strAPIKey = $.jStorage.get("ReviewAnalysisSavedAPIKey");
		strUserLevelURL = "https://www.wanikani.com/api/user/"+ strAPIKey +"/level-progression";
		strRadURL = "https://www.wanikani.com/api/user/"+ strAPIKey +"/radicals";
		strKanURL = "https://www.wanikani.com/api/user/"+ strAPIKey +"/kanji/";
		strVocURL = "https://www.wanikani.com/api/user/"+ strAPIKey +"/vocabulary/";
	}
	
	clearTable();
	
	var strBaseTable = "";
	
	strBaseTable = "<table border='1' style='margin-left: auto; margin-right: auto; width: 80%; border 1px solid #000000;' id='ReviewAnalysisTable'><tr style='background-color: #660000; color: #ffffff;'><td style=' width:50px;'>Level</td><td>Rad</td><td>Kan</td><td>Voc</td><td>Level Tot.</td></tr></table>";
	
	$( "div#ReviewAnalysisSection" ).append( strBaseTable );	
	
	$.get( strUserLevelURL, function( data ) {
		if (data['user_information'] == null) {
			clearTable();
			alert("No data returned. Something wrong with API key or network.");
			return 0;
		}
		var iCurrentUserLevel = parseInt(data['user_information']['level']);
		var iCreatationDateTimestamp = parseInt(data['user_information']['creation_date']);
		
		
		var objUserStartDate = new Date(iCreatationDateTimestamp * 1000);
		var objNow = new Date();
		
		// number of days since starting
		g_iDateDiff = Math.floor(DateDiff(objNow, objUserStartDate));
		
		a_iLevelTotals = initialiseLevelTotalsArray(iCurrentUserLevel);
		for (n = 0; n < iCurrentUserLevel; ++n) {
			$( "table#ReviewAnalysisTable" ).append( "<tr><td style='background-color: #9C9C9C; width:50px; color: #ffffff;'>"+ (n+1) +"</td><td id='Rad"+ (n+1) +"'>0</td><td id='Kan"+ (n+1) +"'>0</td><td id='Voc"+ (n+1) +"'>0</td><td id='Levtot"+ (n+1) +"'>0</td></tr>" );
		}
		$( "table#ReviewAnalysisTable" ).append( "<tr><td style='background-color: #660000; color: #ffffff; font-weight: regular;' id='mainTotal' colspan='5'>0</td></tr>" );
		getLevelInformation(iCurrentUserLevel);
	});	
}

function initialiseLevelTotalsArray(iCt)
{
	var a_iReturn = new Array(iCt);
	for (x = 0; x < iCt; ++x) {
		a_iReturn[x] = 0;
	}
	return a_iReturn;
}

function enterNewAPIKey()
{
	var strExistingAPIKey = "";
	if ($.jStorage.get("ReviewAnalysisSavedAPIKey")) {
		strExistingAPIKey = $.jStorage.get("ReviewAnalysisSavedAPIKey");
	}
	var strNewAPIKey = prompt("Enter API Key", strExistingAPIKey)
	if (strNewAPIKey != null) { $.jStorage.set("ReviewAnalysisSavedAPIKey", strNewAPIKey); }
	setAPIKeyButtonColour();
}

function setAPIKeyButtonColour()
{
	var strAPIKeyButtonColor;
	if ($.jStorage.get("ReviewAnalysisSavedAPIKey")) {
		strAPIKeyButtonColor = "#42AC48";
	} else {
		strAPIKeyButtonColor = "#E45350";		
	}
	$( "#enterAPIKey" ).css('color', strAPIKeyButtonColor);
}

function timeToHuman()
{
	var theDate = new Date(document.u2h.timeStamp.value * 1000);
	dateString = theDate.toGMTString();
	document.u2h.result.value = dateString;
}

function DateDiff(date1, date2) {
    var datediff = date1.getTime() - date2.getTime();
    return (datediff / (24 * 60 * 60 * 1000));
}

function getTimestamp()
{
	var objNow = new Date();
	var a_strMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	var strMonthName = a_strMonthNames[objNow.getMonth()]
	return strMonthName +" "+ objNow.getDate() +" "+ objNow.getFullYear()
}
