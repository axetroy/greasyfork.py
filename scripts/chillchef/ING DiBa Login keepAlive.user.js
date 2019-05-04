// ==UserScript==
// @name         ING DiBa Login keepAlive
// @namespace    https://*.ing-diba.*
// @version      0.6.6
// @description  try to keep login alive... Das Script setzt die "Automatische LogOut-Funktion" der DiBa-Site außer Kraft. Die Seite bleibt so lange Online, bis man sich selber abmeldet. Hauseigene Werbung wird nun ebenfalls ausgeblendet.
// @author       Chillchef
// @match        https://*.ing.*
// @match        https://ing.*
// @match        https://*.ing-diba.*
// @include      https://*.ing-diba.*
// @include      https://*.ing.*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if(window.debugOutput !== undefined)
    {
        window.debugOutput = true;
    }

    var d = document;
    var t = 480000;
    setTimeout(function(){refreshLogin();},t);
    setTimeout(function(){refreshPopup();},t);

    var classesToHide = new Object();
    classesToHide[0] = "ghost-account";
    classesToHide[1] = "hint sales-signals sales-signals--wide gap-top-2-lg sales-signals__teaser";
    classesToHide[2] = "hint sales-signals sales-signals--wide";
    classesToHide[3] = "modal modal--open";
    classesToHide[4] = "hint sales-signals sales-signals--wide";


    var hBckup = new Object();
    hideClasses(true);   //Werbeeinblendungen ausblenden. Falls nicht gewünscht, einfach auskommentieren oder auf 'false' setzen!
    editStyle("sh-page ing-diba-content-to-blur","90%");

    function refreshLogin()
    {
        try
        {
            var clsn = "session__refresh";
            var reloadBtn = d.getElementsByClassName(clsn);
            if(reloadBtn[0])
            {
                reloadBtn[0].click();
            }
        }
        catch(e)
        {
            window.alert("DiBa-Script-Refresh-Fehler: " + e.message);
            window.console.log("Fehler: " + e.message + " !!!");
            console.log(e);
        }
        setTimeout(function(){refreshLogin();},480000);
    }

    function refreshPopup()
    {
        try
        {
            var pId = "QuotestreamPopup";
            var p = d.getElementById(pId);
            if(p !== null)
            {
                var ph = p.clientHeight;
                if(ph > 0)
                {
                    d.getElementById("ctl00_QsPopup_Reload").click();
                }
            }
        }
        catch(e)
        {
            window.alert("DiBa-Script-Popup-Fehler: " + e.message);
            window.console.log("Fehler: " + e.message + " !!!");
            console.log(e);
        }
        setTimeout(function(){refreshPopup();},3000);
    }

    function hideClasses(hide)
    {
        for(var v in classesToHide)
        {
            hideClass(classesToHide[v], hide);
        }
    }

    function hideClass(clsName, hide)
    {
        try
        {
            var sichtbarkeit = hide ? 'hidden' : 'visible';
            var ga = d.getElementsByClassName(clsName);
            if(ga !== null)
            {
                for(var v in ga)
                {
                    if(ga[v].id !== undefined)
                    {
                        ga[v].style.visibility = sichtbarkeit;
                        if(hide === true)
                        {
                            if (hBckup[ga[v].id] === undefined) { hBckup[ga[v].id] = ga[v].style.height;}
                            ga[v].style.height = '0px';
                        }
                        else
                        {
                            if (hBckup[ga[v].id] !== undefined) { ga[v].style.height = hBckup[ga[v].id]}
                        }
                    }
                }
            }
        }
        catch(e)
        {
            window.alert("DiBa-Script-Hide-Class-Fehler: " + clsName + ": " + e.message);
            window.console.log("Fehler: " + e.message + " !!!");
            console.log(e);
        }
    }

    function editStyle(clsName, clsWidth)
    {
        try
        {
            var c = d.getElementsByClassName(clsName);
            if(c[0])
            {
                c[0].style["max-width"] = clsWidth;
                try
                {
                    c[0].children[1].style.maxWidth = clsWidth;
                }
                catch(ex)
                {
                }
            }
        }
        catch(e)
        {
            window.alert("DiBa-Script-editStyle-Fehler: " + clsName + ": " + e.message);
            window.console.log("Fehler: " + e.message + " !!!");
            console.log(e);
        }
    }
})();
