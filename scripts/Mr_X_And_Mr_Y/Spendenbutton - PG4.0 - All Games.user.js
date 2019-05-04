// ==UserScript==
// @name           Spendenbutton - PG4.0 - All Games
// @namespace      Script by MR. X and MR. Y 
// @description    Zeigt einen Spenden Button direkt auf der Uebersichtsseite von Pennergame an. Fuer die Seite http://www.menelgame.com.pl/
// @include        *spenden.hitfaker.net*
// @include        http://www.pennergame.de/overview/
// @include        http://*berlin.pennergame.de/overview/
// @include        http://*muenchen.pennergame.de/overview/
// @include        http://*koeln.pennergame.de/overview/
// @include        http://*reloaded.pennergame.de/overview/
// @include        http://*pennersturm.pennergame.de/overview/
// @include        http://*dossergame.co.uk/overview/
// @include        http://*bumrise.com/overview/
// @include        http://*clodogame.fr/overview/
// @include        http://*faveladogame.com.br/overview/
// @include        http://*mendigogame.es/overview/
// @include        http://*menelgame.pl/overview/
// @include        http://*halloween.pennergame.de/overview/
// @include        http://*mendigogame.com/overview/
// @include        http://*bomzhuj.ru/overview/
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_deleteValue
// @version        1.1.8 collect donations via spenden.hitfaker.net
// ==/UserScript==

// ***********************************************************************************************
// ***********************************************************************************************
//--------Update Funktion by Sageo - natuerlich mit ihrer Erlaubniss--------------
// ***********************************************************************************************
// ***********************************************************************************************
// Daten über das aktuelle Skript für den Update-Mechanismus
var THISSCRIPTNAME = "Spendenbutton - PG4.0 - All Games";
var THISSCRIPTVERSION = GM_info.script.version.split(" ")[0];
var THISSCRIPTINSTALL_URL = 'https://greasyfork.org/de/scripts/2967-spendenbutton-pg4-0-all-games';
// @version        1.1.7 update function corrected
// @version        1.1.6 grants added
// @version        1.1.5 correction
// @version        1.1.4 update info because of change on greasyfork.org
// @version        1.1.3 script did not work any more
// @version        1.1.2 script did not work any more
// @version        1.1.1 script did not work any more
// @version        1.0.18 change links for donation pages
// @version        1.0.17 Version for FF 17
// @version        1.0.16 Operation Pennersturm added
// @version        1.0.15 PG changed the donationsides because SHIFT sucks   by MR X
// @version        1.0.14 PG reloaded Hamburg added
// @version        1.0.13 alternative site did not work any longer
// @version        1.0.12 donations did not work because of www at the beginning of URL
// @version        1.0.11 use alternative site with Shift+Click in case of problems with the original site
// @version        1.0.10 now also runs in Köln
// @version        1.0.9 now also runs in London
// @version        1.0.8 now also runs in Russia
// @version        1.0.7 now also runs in Buenos Aires
// @version        1.0.6 now also runs on Halloween
// @version        1.0.5 now also runs on Mallorca
// @version        1.0.4 some more english texts
// @version        1.0.3 update the progress bar of the money while receiving donations; english text for all foreign versions
// @version        1.0.2 URL of donation page changed; countdown of donations
// @version        1.0.1 some small modifications by Mr. Y
// @version        1.0.0 Brand new Shit 
// $Id: spendenbutton_-_pg40_-_a.user.js 122 2015-09-02 12:12:41Z Mr. X $


// ***********************************************************************************************
// ***********************************************************************************************
// Formatiert ein Datum um in das Format "YYYY-MM-DD"
// ***********************************************************************************************
// ***********************************************************************************************
function FormatDate(DateToFormat) {
    var year = DateToFormat.getFullYear();
    var month = DateToFormat.getMonth() + 101 + "";
    var day = DateToFormat.getDate() + 100 + "";

    return year + "-" + month.slice(1) + "-" + day.slice(1);
}


// ***********************************************************************************************
// ***********************************************************************************************
// Entfernt Leerraum aus einen String (Anfang und Ende)
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
    return s.replace(/^\s+|\s+$/g,'');
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ueberprueft, ob es neue Skript-Versionen gibt (einmal pro Tag) und zeigt im positiven
// Fall eine Meldung an.
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForUpdate(german) {
    // Aktuelles Tagesdatum erzeugen und formatieren
    var today = new Date();
    var tagesdatum = FormatDate(today);

    if (GM_getValue("LastScriptUpdateCheckGF","") != tagesdatum) {
        // **********************************************************************************
        // *** GM_XMLHTTPREQUEST *** Abrufen der Skriptseite von greasyfork.org
        // **********************************************************************************
        GM_xmlhttpRequest({method: 'GET',
        url: THISSCRIPTINSTALL_URL,
        headers:{ "Accept":"text/javascript; charset=UTF-8" },
        overrideMimeType:"application/javascript; charset=UTF-8",
        onload:function(responseDetails) {
            // Wenn die Seite erfolgreich abgerufen werden konnte
            if (responseDetails.status == 200) {
            var content = responseDetails.responseText;

            // Ermitteln der Skriptversion
                        if (content.indexOf("@version") != -1)
                            var scriptfullversion = trimString(content.split('@version')[1]).split('\n')[0];
                        else
                            var scriptfullversion = content.split('"script-show-version">').pop().split('</span')[0].split('<span>').pop();
                        var scriptversion = scriptfullversion.split(' ')[0];
                        scriptfullversion = scriptfullversion.substr(scriptversion.length+1);
            
            // Wenn dort eine neue Skriptversion vorliegt
            if (scriptversion != THISSCRIPTVERSION) {
                // Hinweistext zusammenbauen
                if (german)
                var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos über die neue Version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschließend durchgeführt werden.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt."
                else
                var alerttext = "There is a new version of the script '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nThe new version can contain bugfixes and/or new features.\nHere you will find more information about the new version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nAn update is recommended and can be done directly afterwards.\n\nNote: The check for new versions is only done once a day."

                // Hinweistext ausgeben
                alert(alerttext);
                // Seite mit dem neuen Skript laden, um eine Installation zu ermöglichen
                window.location.href = THISSCRIPTINSTALL_URL+'/code/Spendenbutton%20-%20PG40%20-%20All%20Games.user.js';
            }
            }
        }
        });
        // Setze den Parameter auf das aktuelle Datum (Updatesuche wurde ausgeführt)
        GM_setValue("LastScriptUpdateCheckGF", tagesdatum)
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion erzeugt einen Fortschrittsbalken und liefert ihn als Tabelle zurück
// ***********************************************************************************************
// ***********************************************************************************************
function CreateProgressTable(columnr) {
    var newtable = document.createElement("table");
    newtable.style.width = "500px";
    newtable.style.border = "#000000 1px solid";
    var newtr = document.createElement("tr");
    
    newtable.appendChild(newtr);

    for (var i = 1; i <= columnr; i++) {
        var newtd = document.createElement("td");
        newtd.innerHTML = '&nbsp;';
        newtr.appendChild(newtd);
    }

    return newtable;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion füllt den Fortschrittsbalken bis zur Spalte columnnr
// ***********************************************************************************************
// ***********************************************************************************************
function FillProgressTable(currenttable, columnnr) {
    for (var i = 0; i < columnnr; i++) {
        var currenttd = currenttable.getElementsByTagName("td")[i];
        currenttd.style.backgroundColor = "#33cc00    ";
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion wandelt einen HTML-Content in ein DOM um
// **********************************************************************************
// **********************************************************************************
function HTML2DOM(content) {

    var host = document.location.host;
    var dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = content;

    return dummyDiv;
}

//---------------------------------------------------------------------------------------------------
//              Ermitteln der PG Seite
//---------------------------------------------------------------------------------------------------

var urls = new Array();
    urls[0] = 'http://www.menelegame.pl/';
    urls[1] = 'http://pennerga.me/';
    urls[2] = 'http://spenden.hitfaker.net/';
var links = new Array();
    links[0] = 'http://www.menelegame.pl/';
    links[1] = 'http://pennerga.me/donate.php';
    links[2] = 'http://spenden.hitfaker.net/';
var data = new Array();
    data[0] = 'url=%s&Submit=Donate';
    data[1] = 'url=%s&Submit=Donate';
    data[2] = 'url=%s';
var pg = new Array();
    pg[0] = 'POST';
    pg[1] = 'POST';
    pg[2] = 'click';

if(window.location.hostname == "spenden.hitfaker.net"){
    var don = GM_getValue("hitfakerlink", "");
    if (don != "") {
        function checklink(link, start) {
            if (document.getElementById(link).value == "")
                window.setTimeout(checklink, 1000, link, start);
            else {
                document.getElementById(link).value = don;
                window.setTimeout('document.getElementById("' + start + '").click()', 1000);
                window.setTimeout(checkrun, 1000);
            }
        }
        function checkrun() {
            if (document.getElementById("status"))
                if (document.getElementById("status").innerHTML.indexOf("<strong>") != -1) {
                    GM_deleteValue("hitfakerlink");
                    window.close();
                    return;
                }
            window.setTimeout(checkrun, 1000);
        }
        window.setTimeout(checklink, 1000, "url", "start");
    }
}
else {
    var url = document.location.href;
    var link = url.split('/overview')[0];
    var german = (link.substr(link.length-2,2) == "de");
    var indx = GM_getValue("donationindex", 0);
    if (indx >= urls.length)
        indx = 0;

    CheckForUpdate(german);
}

// ***********************************************************************************************
// ***********************************************************************************************
//----Ende----Auto Update Funktion---Ende---------------------------------------------------
// ***********************************************************************************************
// ***********************************************************************************************


//---------------------------------------------------------------------------------------------------
//              Spendenlink auslesen
//---------------------------------------------------------------------------------------------------
var donationlink = document.getElementsByTagName('html')[0].innerHTML.split('name="reflink" value="')[1];
var donationlink2 = donationlink.split('"')[0];
 
 
//---------------------------------------------------------------------------------------------------
//              Ausgabe auf der Overviewseite
//---------------------------------------------------------------------------------------------------
         
var div_tieritemA2 = document.getElementsByClassName('tieritemA');
for (var i = 0; i < div_tieritemA2.length; i++)
    if (div_tieritemA2[i].innerHTML.indexOf('change_please') != -1) {
        var donPos = i;
        break;
        }
var lis = div_tieritemA2[donPos].getElementsByTagName('li');
var donText = lis[3].innerHTML.replace(/[,.]/g, '').split(' ');
var j = 0;
for (var i = 0; i < donText.length; i++) {
    if (!isNaN(donText[i]))
        if (j++)
            var remDon = Number(donText[i]); // remaining donations
        else
            var recDon = Number(donText[i]); // received donations
}

var new2div = document.createElement('div');
new2div.setAttribute('class', 'tieritemA');
new2div.style.width = "500px";
if (german)
    new2div.innerHTML = '<h4><div style="padding-top:9px;">Spenden holen via: <a id="donlink" href="' + urls[indx] + '" title="Link zu ' + urls[indx] + '" target="_blank">' + urls[indx] + '</a></div><div style="text-align: right; margin-top:-20px;">Spenden übrig:<span style="font-size:1.6em"> '+remDon+'</span></div></h4><table Border="0" Width="100%"><tr><td><div style="text-align: left;"><span style="font-size:1.4em"><u><b>Info:</b></u></span><br>Hier kannst du mit einem Klick deine Spenden <br>innerhalb von ca. 60 Sek. abholen!<br><br>1. Wasche deinen Penner.<br>2. Lege einen Spendenplunder an.<br>3. Klicke den <b>"Spenden holen"</b> Button.<br> &nbsp;&nbsp;&nbsp; Warte auf die Bestätigung... FERTIG!!!<br><br></div></td><td><div style="text-align: right; padding-top:40px; padding-right:10px;"><form name="Formular" action=""><input type="button" value="Spenden holen" title="Klicke hier um deine Spenden für heute abzuholen!!!" id="holespenden"></form></div></td></tr></table>';
else
    new2div.innerHTML = '<h4><div style="padding-top:9px;">Receive donations via: <a id="donlink" href="' + urls[indx] + '" title="Link to ' + urls[indx] + '" target="_blank">' + urls[indx] + '</a></div><div style="text-align: right; margin-top:-20px;">Donations left:<span style="font-size:1.6em"> '+remDon+'</span></div></h4><table Border="0" Width="100%"><tr><td><div style="text-align: left;"><span style="font-size:1.4em"><u><b>Info:</b></u></span><br>Here you can receive your donations with one click<br>within about 60sec.!<br><br>1. Wash your bum.<br>2. Put on some junk for higher donations.<br>3. Clicke the <b>"receive donations"</b> button.<br> &nbsp;&nbsp;&nbsp; Wait for the confirmation... READY!!!<br><br></div></td><td><div style="text-align: right; padding-top:40px; padding-right:10px;"><form name="Formular" action=""><input type="button" value="receive donations" title="Click here to receive your donations for today!!!" id="holespenden"></form></div></td></tr></table>';
div_tieritemA2[donPos].parentNode.insertBefore(new2div, div_tieritemA2[donPos]);

// ***********************************************************************************************
// Fortschrittsbalken einfügen
// ***********************************************************************************************
var newtd = document.createElement("td");
newtd.setAttribute("colspan", "2");
if (german)
    newtd.innerHTML = 'Spendenanzahl:';
else
    newtd.innerHTML = 'Number of donations:';
new2div.appendChild(newtd);

var ProgressTable = CreateProgressTable(recDon+remDon);
newtd.appendChild(ProgressTable);
FillProgressTable(ProgressTable, recDon);

if (GM_getValue("hitfakerlink", donationlink2) != donationlink2)
    document.getElementById("holespenden").disabled = true;

if (remDon == 0) {
    // Button disablen
    document.getElementById("holespenden").disabled = true;
    GM_deleteValue("hitfakerlink");
}

document.getElementById("holespenden").addEventListener("click", function(event) { 
    function updateDonCount(newdiv, link, lis, recDonOld, lstCnt) {
       GM_xmlhttpRequest({
          method: 'GET',
          url: ''+link+'/overview/',
          onload: function(responseDetails) {
            if (responseDetails.status == 200) {
                var content = responseDetails.responseText;
                if (content.indexOf('change_please') != -1) {
                    var doc = HTML2DOM(content);

                    var div_tieritemA2 = doc.getElementsByClassName('tieritemA');
                    for (var i = 0; i < div_tieritemA2.length; i++)
                        if (div_tieritemA2[i].innerHTML.indexOf('change_please') != -1) {
                            var donPos = i;
                            break;
                            }
                    var lis2 = div_tieritemA2[donPos].getElementsByTagName('li');

                    lis[0].innerHTML = lis2[0].innerHTML;
                    lis[1].innerHTML = lis2[1].innerHTML;
                    lis[2].innerHTML = lis2[2].innerHTML;
                    lis[3].innerHTML = lis2[3].innerHTML;
                    var money = document.getElementsByClassName("icon money");
                    var money2 = doc.getElementsByClassName("icon money");
                    money[0].innerHTML = money2[0].innerHTML;
                    var donText = lis2[3].innerHTML.replace(/[,.]/g, '').split(' ');
                    var j = 0;
                    for (var i = 0; i < donText.length; i++) {
                        if (!isNaN(donText[i]))
                            if (j++)
                                var remDon = Number(donText[i]); // remaining donations
                            else
                                var recDon = Number(donText[i]); // received donations
                    }
                    var donrem = newdiv.getElementsByTagName('div')[1];
                    donrem.innerHTML = donrem.innerHTML.replace(/> [0-9]*</, '> '+remDon+'<');
                    var ProgressTable = newdiv.getElementsByTagName('table')[1];
                    FillProgressTable(ProgressTable, recDon);
                    if (recDon == recDonOld) {
                        if (lstCnt < 50)
                            updateDonCount(newdiv, link, lis, recDon, lstCnt+1);
                        else {
                            if (german)
                                alert ("Es kommen keine weiteren Spenden !!");
                            else
                                alert ("You do not receive any more donations !!");
                            document.location.reload();
                            }
                        return;
                    }
                    if (remDon > 0)
                        updateDonCount(newdiv, link, lis, recDon, 0);
                    else {
                        document.location.reload();
                        if (german)
                            alert ("Es wurden alle Spenden geholt !!");
                        else
                            alert ("All donations have been fetched !!");
                        GM_deleteValue(donationlink2);
                    }
                    return;
                }
            }
            updateDonCount(newdiv, link, lis, recDon, lstCnt);
        }
       });
    }

  document.getElementById("holespenden").disabled = true;
  if (event.shiftKey != 0) {
      indx++;
      if (indx >= urls.length)
          indx = 0;
      GM_setValue("donationindex", indx);
      var ele = document.getElementById("donlink");
      donlink.href = urls[indx];
      donlink.title = "Link " + (german?"zu ":"to ") + urls[indx];
      donlink.innerHTML = urls[indx];
  }
  var url = links[indx];
  var dat = data[indx].replace("%s", donationlink2);
  if (pg[indx] == "click") {
      GM_setValue("hitfakerlink", donationlink2);
      document.getElementById("donlink").click();
  }
  else {
      if (pg[indx] == "POST")
          dat = encodeURI(dat);
      else {
          url = url + "?" + dat;
          dat = "";
      }
      GM_setValue(donationlink2, true);

      GM_xmlhttpRequest({
            method: pg[indx],
            url: url,
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            data: dat,
            onload: function(responseDetails) { 
                if (GM_getValue(donationlink2, false)) {
                    GM_deleteValue(donationlink2);
                    var page = location.toString();
                    window.location.href = page;
                    if (german)
                        alert ("Es wurden alle Spenden geholt !!");
                    else
                        alert ("All donations have been fetched !!");
                }
            }
            
        });
  }
  updateDonCount(new2div, link, lis, recDon, 0);
}, false);
