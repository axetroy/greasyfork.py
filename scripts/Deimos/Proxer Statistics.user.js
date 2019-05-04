// ==UserScript==
// @name         Proxer Statistics
// @namespace    https://greasyfork.org/de/users/83349-deimos
// @version      1.21
// @description  Zählt die bereits geschauten/gelesenen Animes/Mangas und erlaubt es die Tabellen per Klick zusammenzuklappen bzw. sich mehr Details anzeigen zu lassen.
// @author       Deimos
// @run-at       document-start
// @include      http://proxer.me/*
// @include      https://proxer.me/*
// @include      http://www.proxer.me/*
// @include      https://www.proxer.me/*        
// @require      https://greasyfork.org/scripts/12981-proxer-userscript-anker/code/Proxer-Userscript-Anker.js?version=108560
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        unsafeWindow
// @history      1.2 Script funktioniert auch im User-Control-Panel
// @history      1.1 Einbinden des Userscript Anker von Blue.Reaper
// @history      1.0 Zählen von Anime/Manga, anzeigen von Details, minimieren von Tabellen
// ==/UserScript==

var page = 0;
var hv_values = "vvvvvvvv";   //v:= visible     h:= hidden
var dn_values = "nnnnnnnn";   //d:= details     n:= no details

//############################# Einbinden des Userscript Anker #############################

document.addEventListener('DOMContentLoaded', function(event) {
    var zusatz = document.createElement("div");
    function changefunction(change) //Ist das Script aktiviert?
    {
        if(GM_getValue("proxStat",0) == 1 ) //aktiviert
        {
            if(window.location.pathname.split('/')[3] == "anime" || window.location.search === "?s=anime" )  ///User befindet sich auf Anime Verzeichnis
            {
                page = 1;
                tableListener();
            }
            else if(window.location.pathname.split('/')[3] == "manga" || window.location.search === "?s=manga"  ) ///User befindet sich auf Manga Verzeichnis
            {
                page = 2;
                tableListener();
            }
        }
    }
    //addAnkerMember(id, modulname, modus, changefunction, memoryName, memoryDefault, zusatz);
    addAnkerMember("proxStat_Anker","Proxer Statistics",4,changefunction,"proxStat",1,zusatz);

    var obj_tabellen = createExtAnkerCheckBox("Tabellen" , "safe_tables", "12em");
    var obj_details = createExtAnkerCheckBox("Details" , "safe_details", "12.6em");
    var obj_anzahl = createExtAnkerCheckBox("Anzahl" , "safe_number", "12.8em");
    var anleitung = createExtAnkerAnleitung("http://proxer.me/forum/anwendungen/380300-userscript-proxer-statistics");

    zusatz.appendChild(obj_tabellen);
    zusatz.appendChild(obj_details);
    zusatz.appendChild(obj_anzahl);
    zusatz.appendChild(anleitung);
});

//############################# Hauptteil #############################

//Ermitteln der Tabellenlänge und setzen der EventListener
function tableListener()
{
    var tables = document.getElementsByTagName("table");
    for(i = 0; i<tables.length;i++)
    {
        var tr = tables[i].rows;
        var l = 0;
        
        if(tr[2].getElementsByTagName("td")[0].innerHTML !== "Keine Einträge.")
            l = tr.length - 2;
        var message= ": " + l; 

        if(GM_getValue("safe_number",0) == 1 ) //Anzahl wird angezeigt
            tr[0].getElementsByTagName("th")[0].innerHTML+= message;
        tr[0].addEventListener("click",action);
        tr[0].id ="tr"+(i+(page*4)-4);

        if(GM_getValue("safe_tables",0) == 1 ) //Tabellen werden minimiert
        {
            hv_values = checkCookie("hv_values",hv_values);
            if(hv_values[i+(page*4)-4]=="h")
                hide(tr);
        }
        if(GM_getValue("safe_details",0) == 1 ) //Details werden angezeigt
        {
            dn_values = checkCookie("dn_values",dn_values);
            if(dn_values[i+(page*4)-4]=="d")
                details(tr);
        }
    }
}

//Auswahl ob "hide" oder "details", setzen des neuen Cookies
function action(e)
{
    var tr = this.parentElement.parentElement.rows;
    var xPosition = e.clientX;
    var rect = tr[0].getBoundingClientRect();
    var width = tr[0].offsetWidth;

    if(xPosition<width/2)
    {
        details(tr);
        setCookie("dn_values",dn_values,365);
    }
    else
    {
        hide(tr);
        setCookie("hv_values",hv_values,365);
    }
}

//Anzeigen der genaueren Details der ausgewählten Tabelle
function details(tr)
{
    var id = parseInt(tr[0].id[2]);
    var text = tr[0].getElementsByTagName("th")[0].innerHTML;

    if(text.includes("<br>")) //Details werden minimiert
    {
        text = text.slice(0,text.indexOf("<br>"));
        tr[0].getElementsByTagName("th")[0].innerHTML = text;
        dn_values = dn_values.substring(0,id) + "n" +  dn_values.substring(id+1, dn_values.length);  //erstellen eines neuen Cookies
        return true;
    }

    var l = tr.length;
    var movies = 0;
    var ovas = 0;
    var animes = 0;
    var mangas = 0;
    var doujinshis = 0;
    var one_shots = 0;
    var h_mangas = 0;

    for(e = 2; e<l; e++)
    {
        var type = tr[e].getElementsByTagName("td")[2].innerHTML;
        switch(type) 
        {
            case "Movie":
                movies++;
                break;
            case "OVA":
                ovas++;
                break;
            case "Animeserie":
                animes++;
                break;
            case "Mangaserie":
                mangas++;
                break;
            case "H-Manga":
                h_mangas++;
                break;
            case "Doujinshi":
                doujinshis++;
                break;
            case "One-Shot":
                one_shots++;
                break;
        }
    }

    var message= "";
    if(animes!==0)
        message+= 		"<br> Animeserien: "+animes;
    if(movies!==0)
        message+= 		"<br> Movies: "+movies;
    if(ovas!==0)
        message+= 		"<br> OVAs: "+ovas;
    if(mangas!==0)
        message+= 		"<br> Mangaserien: "+mangas;
    if(h_mangas!==0)
        message+=		"<br> H-Mangas: "+h_mangas;
    if(doujinshis!==0)
        message+= 		"<br> Doujinshis:: "+doujinshis;
    if(one_shots!==0)
        message+= 		"<br> One-Shots: "+one_shots;

    tr[0].getElementsByTagName("th")[0].innerHTML+= message;
    dn_values = dn_values.substring(0,id) + "d" +  dn_values.substring(id+1, dn_values.length);  //erstellen eines neuen Cookies
}

//Einklappen der ausgewählten Tabelle
function hide(tr)
{
    var id = parseInt(tr[0].id[2]);
    var visibility;
    var char;

    if(tr[1].style.display == "none")
    {
        visibility = "table-row";
        char = "v";
    }
    else
    {
        visibility = "none";
        char = "h";
    }

    hv_values = hv_values.substring(0,id) + char +  hv_values.substring(id+1, hv_values.length); //erstellen eines neuen Cookies
    for(e = 1; e < tr.length; e++)
    {
        tr[e].style.display =visibility;
    }
}

//############################# Cookies #############################
function checkCookie(cname,ctext) 
{
    var cookie = getCookie(cname);
    if (cookie === "")  
    {
        cookie = ctext;
        setCookie(cname, cookie, 365); 
    }
    return cookie;
}
function getCookie(cname) 
{
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}