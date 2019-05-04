// ==UserScript==
// @name           Mturk Survey Timer
// @author         Cuyler
// @license        Simplified BSD license
// @icon         http://ez-link.us/sb-png
// @version        1.1
// @namespace      http://www.mturkforum.com
// @description    Timer for survey pages.
// @include        https://www.mturk.com/mturk/dashboard
// @include	   http://*.qualtrics.com/*
// @include	   https://*.qualtrics.com/*
// @include        https://*.*.qualtrics.com/*
// @include        http://*.*.qualtrics.com/*
// @include        http://*.surveygizmo.com/*
// @include        https://*.surveygizmo.com/*
// @include        https://docs.google.com/forms/*
// @include        https://*.surveymonkey.com/*
// @include        https://*.vennliapp.com/*
// @include        https://*.*.*.de/*
// @include        http://*.*.*.de/*
// @include        https://*.*.de/*
// @include        http://*.*.de/*
// @include        https://*.de/*
// @include        http://*.de/*
// @include        http://*.*.*.edu/*
// @include        https://*.*.*.edu/*
// @include        http://*.*.edu/*
// @include        https://*.*.edu/*
// @include        http://*.*.*.ca/*
// @include        https://*.*.*.ca/*
// @include        http://*.*.ca/*
// @include        https://*.*.ca/*
// @include        http://www.marshlabduke.com/*
// @include        https://*.typeform.com/*
// @include        http://surveys*.surveyanalytics.com/*
// @include        http://*.cspurdue.com/*
// @include        http://questionpro.com/*
// @include        https://questionpro.com/*
// @include        https://*.kwiksurveys.com/*
// @include        https://*.wonderliconline.com/*
// @include        http://*.lab42.com/*
// @include        http://turkitron.com/*
// @include        http://sgiz.mobi/*
// @include        http://www.consumerbehaviorlab.com/*
// @include        https://www.psychdata.com/*
// @include        https://*.*.*.ac.uk/*
// @include        https://*.*.ac.uk/*
// @include        http://*.*.*.ac.uk/*
// @include        http://*.*.ac.uk/*
// @include        http://survey.psy.unipd.it/*
// @include        https://www.predikkta.com/*
// @include        https://*.userzoom.com/*
// @include        https://www.vopspsy.ugent.be/*
// @include        http://crsi.byethost33.com/*
// @include        https://www.psychdata.com/*
// @include        http://hospitalityexperiments.net/*
// @include        http://www.dise-online.net/*
// @include        https://www.descil.ethz.ch/apps/mturk/*
// @include        https://www.tfaforms.com/*
// @include        https://*.shinyapps.io/*
// @include        https://mutual-science.org/*
// @include        http://*/TurkGate/*
// @include        http://jbfreeman.net/webmt/*
// @include        http://*.fluidsurveys.com/*
// @include        https://gate.aon.com/*
// @include        https://www.cvent.com/Surveys/*
// @include        http://*/limesurvey/*
// @include        http://www.ets-research.org/*
// @include        https://www.psychsurveys.org/*
// @include        https://*.herokuapp.com/*
// @include        https://*.wufoo.com/*
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_registerMenuCommand
// ==/UserScript==

var timerValue = 0;
var timerText = "";

var secondsValue = 0;
var minutesValue = 0;

function doTimerCycle()
{
    secondsValue++;
    
    if(secondsValue == 60) {secondsValue = 0; minutesValue++;}
    
    timerText = String(minutesValue) + " minutes, " + String(secondsValue) + " seconds";
    
    document.getElementById('timerTextbox').value = timerText;
}

$ = unsafeWindow.$;


    if (!/https?:\/\/www.mturk.com\/mturk\/*/.test(window.location.href)) {
		idDiv = document.createElement('div');
		idDiv.id = "timerDiv";
 		idInner = "<input type='text' id='timerTextbox' onmouseover='javascript:this.focus();this.select() ;' onmouseout='javascript:this.blur();' value='" + timerText + "' style='position:fixed;border:thick solid #010101;top:80px;z-index:10000;right:1px;padding:5px 3px;background:blue;font-size:13px;color:white;' readonly/>";
		idDiv.innerHTML = idInner;
		document.body.insertBefore(idDiv,document.body.firstChild);
        
        setInterval( doTimerCycle, 1000);
	}