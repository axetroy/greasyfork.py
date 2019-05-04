// ==UserScript==
// @name         Grepolis Report Converter
// @author       Potusek & Anpu
// @description  Grepolis Report Converter Revolution Tools
// @include      http://*.grepolis.com/game/*
// @include      https://*.grepolis.com/game/*
// @exclude      view-source://*
// @icon         http://grepolis.potusek.eu/img/octopus.png
// @iconURL      http://grepolis.potusek.eu/img/octopus.png
// @version      3.5.6
// @grant        none
// @copyright    2011+
// @namespace https://greasyfork.org/users/91559
// ==/UserScript==
function _GRCRTRepConvLangArray() {
  this.cs = {INFO:{0:"Potusek", 1:"grepolis@potusek.eu"}, WEBSITE:"Web", AUTHOR:"tomthas@seznam.cz, Thasoss", BTNCONV:"Konvertovat", BTNGENER:"Vytvo\u0159it", BTNSRC:"Zdroj", BTNVIEW:"N\u00e1hled", BTNSAVE:"Ulo\u017eit", BTNMARKS:"Ozna\u010dit jako p\u0159e\u010dten\u00e9", BTNMARKA:"Ozna\u010dit v\u0161e jako p\u0159e\u010dten\u00e9", MSGTITLE:"Konvertovat hl\u00e1\u0161en\u00ed", MSGQUEST:"Jak\u00e1 data maj\u00ed b\u00fdt zobrazena?", MSGALL:"V\u0161e", MSGBBCODE:"N\u00e1sleduj\u00edc\u00ed publikaci hl\u00e1\u0161en\u00ed m\u016f\u017eete za pomoci BB k\u00f3d\u016f vkl\u00e1dat do zpr\u00e1v \u010di f\u00f3ra.", 
  MSGRESOURCE:"Ko\u0159ist", MSGUNITS:"Jednotky", MSGBUILD:"Budovy", MSGUSC:"Pou\u017eit\u00e9 st\u0159\u00edbrn\u00e9 mince", MSGRAW:"Suroviny", SUPPORT:"Podpora", SPY:"\u0160pehov\u00e1n\u00ed", CONQUER:"Dobyto", LOSSES:"Ztr\u00e1ty", HIDDEN:"Skryt\u00e9", NOTUNIT:"[i]\u017d\u00e1dn\u00fd[/i]", TOWN:"[i]M\u011bsto:[/i] ", PLAYER:"[i]Hr\u00e1\u010d:[/i] ", ALLY:"[i]Ali:[/i] ", CAST:"seslat:", ONTOWER:"Na m\u011bsto:", MSGHIDAD:"Skr\u00fdt m\u011bsta", MSGFORUM:"Hl\u00e1\u0161en\u00ed bude publikov\u00e1no", 
  BBALLY:"alian\u010dn\u00ed f\u00f3ra / zpr\u00e1vy", BBFORUM:"extern\u00ed f\u00f3rum", ERRGETSRC:"Do\u0161lo k chyb\u011b! Pros\u00edm, ohlaste to na:  potusek@westtax.info", ICOCLOSE:"Zav\u0159\u00edt", ICOHELP:"O konvertoru", MSGPREVIEW:"<b>N\u00e1hled hl\u00e1\u0161en\u00ed</b>", HELPTAB1:"O...", HELPTAB2:"Jak to funguje", HELPTAB3:"Zm\u011bny", HELPTAB4:"Nastaven\u00ed", HLPVERSION:"Verze", HLPFIXED:"Fixed", HLPADDED:"P\u0159id\u00e1no", MSGHUMAN:{OK:"Informace ulo\u017eeny", ERROR:"P\u0159i zapisov\u00e1n\u00ed nastala chyba!"}, 
  STATSPOINT:"Body", STATSRANK:"Um\u00edst\u011bn\u00ed", LABELS:{attack:{ATTACKER:"\u00dato\u010dn\u00edk", DEFENDER:"Obr\u00e1nce", MSGHIDAT:"\u00fato\u010dn\u00edk", MSGHIDDE:"obr\u00e1nce", MSGATTUNIT:"\u00dato\u010d\u00edc\u00ed vojsko", MSGDEFUNIT:"Br\u00e1n\u00edc\u00ed vojsko"}, support:{ATTACKER:"Podporuj\u00edc\u00ed", DEFENDER:"Podpo\u0159en\u00fd", MSGHIDAT:"podporuj\u00edc\u00ed", MSGHIDDE:"podpo\u0159en\u00fd", MSGATTUNIT:"Podporuj\u00edc\u00ed vojsko", MSGDEFUNIT:"Vojsko obr\u00e1nce"}, 
  espionage:{ATTACKER:"\u0160peh", DEFENDER:"\u0160pehovan\u00fd", MSGHIDAT:"\u0161peh", MSGHIDDE:"\u0161pehovan\u00fd", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"podrobnosti o p\u0159\u00edkazu", MSGRETURN:"(n\u00e1vrat)", MSGCLAIM:"Rezervace m\u011bsta", MSGCLAIMPPUP:"Vytvo\u0159it rezervaci", MSGGENBBCODE:"Vytvo\u0159it seznam v BB k\u00f3du", MSGDEFSITE:"Pora\u017een\u00fd...", MSGLOSSITE:"Ztr\u00e1ty...", MSGASATT:"...jako \u00fato\u010dn\u00edk", MSGASDEF:"...jako obr\u00e1nce", MSGDIFF1:"neuk\u00e1zat rozd\u00edly", 
  MSGDIFF2:"uk\u00e1zat rozd\u00edly", MSGDIFF3:"uk\u00e1zat jen rozd\u00edly", BBCODELIMIT:"V p\u0159\u00edpad\u011b p\u0159ekro\u010den\u00ed po\u010dtu znak\u016f na jeden p\u0159\u00edsp\u011bvek jsou skupiny odd\u011bleny. Ka\u017ed\u00e1 skupina je odd\u011blena samostatn\u011b.", CHKPOWERNAME:"Zobrazit \u010das zb\u00fdvaj\u00edc\u00ed do mo\u017enosti seslat kouzlo", CHKNIGHTNAME:"Skr\u00fdt m\u011bsta v no\u010dn\u00edm bonusu", CHKFORUMTABS:"Nahrazen\u00ed posuvn\u00edku z\u00e1lo\u017eek na f\u00f3ru za v\u00edcero \u0159ad", 
  BTNRESERVE:"Rezervace", LNKRESERVE:"Rezervace", LBLGETRESER:"Z\u00edsk\u00e1v\u00e1n\u00ed dat ...", BTNCHECK:"Kontrolov\u00e1n\u00ed rezervac\u00ed", CHKCMDIMG:"Vid\u011bt ikony p\u0159\u00edkaz\u016f u c\u00edlov\u00fdch m\u011bst", STATSLINK:"Statistiky zobrazovat z", BTNSUPPLAYERS:"Seznam hr\u00e1\u010d\u016f", CHKUNITSCOST:"Hl\u00e1\u0161en\u00ed ukazuje cenu padl\u00fdch jednotek", CHKOCEANNUMBER:"Zobrazit \u010d\u00edsla mo\u0159\u00ed", MSGRTLBL:"Informace o vzpou\u0159e", MSGRTSHOW:"P\u0159idat informace o vzpou\u0159e", 
  MSGRTONLINE:"Bude\u0161 online b\u011bhem b\u011b\u017e\u00edc\u00ed vzpoury?", MSGRTYES:"Ano", MSGRTNO:"Ne", MSGRTGOD:"B\u016fh", MSGRTCSTIME:"\u010cas kol. lod\u011b", MSGRTONL:"Online?", MSGRTERR:"Jsi ve \u0161patn\u00e9m m\u011bst\u011b!<br/>Pro vytvo\u0159en\u00ed informac\u00ed o vzpou\u0159e p\u0159ejdi na spr\u00e1vn\u00e9 m\u011bsto: ", BBTEXT:"textov\u00e1 verze", BBHTML:"tabulkov\u00e1 verze", MSG413ERR:"<h3>Vytvo\u0159en\u00e9 hl\u00e1\u0161en\u00ed je p\u0159\u00edli\u0161 velk\u00e9.</h3><p>Vyu\u017eij dostupn\u00fdch mo\u017enost\u00ed pro bezprobl\u00e9mov\u00e9 zredukov\u00e1n\u00ed velikosti.</p>", 
  CHKREPORTFORMAT:"Hl\u00e1\u0161en\u00ed v tabulk\u00e1ch", WALLNOTSAVED:"Hradby nejsou ulo\u017eeny", WALLSAVED:"Hradby jsou ulo\u017eeny", POPSELRECRUNIT:"klikni pro zvolen\u00ed v\u00fdchoz\u00ed produkovan\u00e9 jednotky", POPRECRUNITTRADE:"klikni pro dopln\u011bn\u00ed pot\u0159ebn\u00fdch surovin k rekrutaci zvolen\u00e9 jednotky", POPINSERTLASTREPORT:"Vlo\u017eit naposledy konvertov\u00e9 hl\u00e1\u0161en\u00ed", MSGCOPYREPORT:"Hl\u00e1\u0161en\u00ed ulo\u017eeno. Klikni, pros\u00edm na [paste_icon] v okn\u011b f\u00f3ra \u010di zpr\u00e1v pro vlo\u017een\u00ed.", 
  POPDISABLEALARM:"Vypnout alarm", SOUNDSETTINGS:"Nastaven\u00ed zvuku", CHKSOUNDMUTE:"Ztlumit", SOUNDVOLUME:"Hlasitost", SOUNDURL:"URL souboru", CHKSOUNDLOOP:"Opakovan\u011b", POPSOUNDLOOP:"P\u0159ehr\u00e1vat opakovan\u011b", POPSOUNDMUTE:"Ztlumit zvuk", POPSOUNDPLAY:"Spustit se sou\u010dasn\u00fdm nastaven\u00edm", POPSOUNDSTOP:"Zastavit p\u0159ehr\u00e1v\u00e1n\u00ed", POPSOUNDURL:"URL cesta k souboru se zvukem", STATS:{PLAYER:"Stats hr\u00e1\u010de", ALLY:"Stats aliance", TOWN:"Stats m\u011bsta", 
  INACTIVE:"Neaktivn\u00ed", CHKINACTIVE:"Uk\u00e1zat neaktivn\u00ed hr\u00e1\u010de", INACTIVEDESC:"Za tento \u010das nedo\u0161lo k n\u00e1r\u016fstu bitevn\u00edch ani stavebn\u00edch bod\u016f."}, ABH:{WND:{WINDOWTITLE:"Pomocn\u00edk s rekrutov\u00e1n\u00edm", UNITFRAME:"zvol jednotku", DESCRIPTION1:"V tomto m\u011bst\u011b m\u00e1\u0161 [population] voln\u00e9 populace", DESCRIPTION2:"Dostatek surovin pro stavbu [max_units]", DESCRIPTION3:"[yesno] m\u00e1\u0161 [research] vyzkoum\u00e1n.", DESCRIPTION4:"Do fronty lze za\u0159adit maxim\u00e1ln\u011b [max_queue] jednotek", 
  TARGET:"Zvol c\u00edlov\u00fd po\u010det", PACKAGE:"Mno\u017estv\u00ed surovin na z\u00e1silku (jednotky)", BTNSAVE:"Ulo\u017eit nastaven\u00ed", TOOLTIPOK:"klikni pro zvolen\u00ed v\u00fdchoz\u00ed jednotky, na kterou budou pos\u00edl\u00e1ny suroviny", TOOLTIPNOTOK:"jednotka nebyla vyzkoum\u00e1na", HASRESEARCH:"ANO", NORESEARCH:"NE", SETTINGSAVED:"Nastaven\u00ed pro [city] bylo ulo\u017eeno"}, RESWND:{RESLEFT:"suroviny odesl\u00e1ny", IMGTOOLTIP:"klikni pro napln\u011bn\u00ed surovinami"}}, 
  NEWVERSION:{AVAILABLE:"K dispozici nov\u00e1 verze", REMINDER:"P\u0159ipomenout pozd\u011bji", REQRELOAD:"Po\u017eadov\u00e1no obnoven\u00ed str\u00e1nky", RELOAD:"Obnovit", INSTALL:"Instalovat"}, LANGS:{LANG:"P\u0159eklad pro jazyk:", SEND:"Poslat ke zve\u0159ejn\u011bn\u00ed", SAVE:"Ulo\u017eit & testovat", RESET:"Vr\u00e1tit k v\u00fdchoz\u00edmu jazyku", REMOVE:"Smazat V\u00e1\u0161 p\u0159eklad?"}, HELPTAB5:"P\u0159eklad", BTNSIMUL:"Simul\u00e1tor", EMOTS:{MESS:"Vlo\u017ete odkazy na emotikony, ka\u017ed\u00fd na novou \u0159\u00e1dku.", 
  LABEL:"Chcete v\u00edce emotikon\u016f?"}, COMMAND:{ALL:"V\u0161e", FORTOWN:"M\u011bsto:", INCOMING:"P\u0159\u00edchoz\u00ed", OUTGOING:"Odchoz\u00ed", RETURNING:"Vracej\u00edc\u00ed se"}, RADAR:{TOWNFINDER:"Hledat m\u011bsta", FIND:"Hledat", MAXCSTIME:"Maxim\u00e1ln\u00ed dojezd kol. lod\u011b", BTNFIND:"Hledat", TOWNNAME:"M\u011bsto", CSTIME:"\u010cas kol. lod\u011b", TOWNOWNER:"Majitel", TOWNRESERVED:"Rezervace", TOWNPOINTS:"Minim\u00e1ln\u00ed po\u010det bod\u016f", BTNSAVEDEFAULT:"Ulo\u017eit hodnoty jako v\u00fdchoz\u00ed", 
  ALL:"Jak\u00e9koliv m\u011bsto"}, LASTUPDATE:"1429470667613", BTNVIEWBB:"BB k\u00f3d", MSGSHOWCOST:"Cena padl\u00fdch jednotek", WALL:{LISTSAVED:"Ulo\u017eeno na hradb\u00e1ch dne", LISTSTATE:"Stav pro hradby z dne", DELETECURRENT:"Smazat sou\u010dasn\u00fd z\u00e1znam", WANTDELETECURRENT:"Chce\u0161 odstranit sou\u010dasn\u00fd z\u00e1znam hradeb?"}, QUESTION:"Dotaz", TSL:{WND:{WINDOWTITLE:"Seznam se\u0159azen\u00fdch m\u011bst", TOOLTIP:"uk\u00e1zat za\u0159azen\u00e9 m\u011bsto"}}, CHKOLDTRADE:"Pou\u017e\u00edt star\u00e9 rozvr\u017een\u00ed obchodu", 
  AO:{TITLE:"P\u0159ehled akademie"}};
  this.da = {AUTHOR:"pcgeni, Bologna, Hypatia, RAC2720", BTNCONV:"Konventere", BTNGENER:"Generere", BTNVIEW:"Smugkig", BTNSAVE:"Gem", MSGTITLE:"Konvert\u00e9r report", MSGQUEST:"Hvilke data \u00f8nsker du at offentligg\u00f8re?", MSGBBCODE:"Ved offentligg\u00f8relse af rapporten, kan du s\u00e6tte bruge den i nyheder og forums ved at bruge BBCode.", MSGRESOURCE:"Plyndring", MSGUNITS:"Enheder", MSGBUILD:"Bygninger", MSGUSC:"Brugte s\u00f8lvm\u00f8nter", MSGRAW:"R\u00e5 materialer", SUPPORT:"Hj\u00e6lp", 
  SPY:"Spionere", CONQUER:"Overvundet", LOSSES:"Tab", HIDDEN:"Skjulte", NOTUNIT:"[i]Ingen[/i]", TOWN:"[i]By:[/i] ", PLAYER:"[i]Spiller:[/i] ", ALLY:"[i]Alliance:[/i] ", CAST:"udgiver:", ONTOWER:"P\u00e5 byen:", MSGHIDAD:"Skjul byer", MSGFORUM:"Rapporten vil offentligg\u00f8res", BBALLY:"alliance forums / i beskeden", BBFORUM:"Eksternt forum", ICOCLOSE:"Luk", ICOHELP:"Om konverteren", MSGPREVIEW:"<b>Report overblik</b>", HELPTAB1:"Omkring", HELPTAB2:"Hvordan virker det", HELPTAB3:"\u00c6ndringer", 
  HELPTAB4:"Indstillinger", MSGHUMAN:{OK:"Informationerne er gemt", ERROR:"En fejl opstod under skrivning"}, LABELS:{attack:{ATTACKER:"Angriber", DEFENDER:"Forsvarer", MSGHIDAT:"angriber", MSGHIDDE:"forsvarer", MSGATTUNIT:"Angribende h\u00e6r", MSGDEFUNIT:"Forsvarende h\u00e6r"}, support:{ATTACKER:"Hj\u00e6lper", DEFENDER:"Hjulpet", MSGHIDAT:"hj\u00e6lper", MSGHIDDE:"hjulpet", MSGATTUNIT:"St\u00f8tteh\u00e6r", MSGDEFUNIT:"Forsvarende h\u00e6r"}, espionage:{ATTACKER:"Spionere", DEFENDER:"Spioneret", 
  MSGHIDAT:"spionere", MSGHIDDE:"udspioneret", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"kommando detaljer", MSGRETURN:"(tilbage)", MSGGENBBCODE:"Generere en liste af BBCode", MSGDEFSITE:"Besejret...", MSGLOSSITE:"Tab...", MSGASATT:"...som angriber", MSGASDEF:"...som forsvarer", MSGDIFF1:"vis ikke forskelle", MSGDIFF2:"vis forskelle", MSGDIFF3:"vis kun forskellene", BBCODELIMIT:"Grundet den begr\u00e6nsede tekstm\u00e6ngde i en boks, og for at undg\u00e5 en lang liste, er datasne inddelt i hver deres boks.", 
  CHKPOWERNAME:"Vis den tilbagev\u00e6rende tid indtil magien kan bruges", CHKFORUMTABS:"Overskriv scrolls fanerne p\u00e5 forummet for multi line", STATSLINK:"Statistikker fra fremviseren", BTNSUPPLAYERS:"Liste over spillere", CHKUNITSCOST:"Rapporten viser tabene af tabte enheder", CHKOCEANNUMBER:"Vis havnumre", MSGRTLBL:"Opr\u00f8r information", MSGRTSHOW:"tilf\u00f8j igangv\u00e6rende opr\u00f8r information", MSGRTONLINE:"Er du online n\u00e5r det r\u00f8de opr\u00f8r er i gang?", MSGRTYES:"Ja", 
  MSGRTNO:"Nej", MSGRTGOD:"Gud", MSGRTCSTIME:"KS tid", MSGRTONL:"til stede?", MSGRTERR:"Du er i den forkerte by!<br/>For at lave den rigtige opr\u00f8rs information, g\u00e5 til byen: ", BBTEXT:"tekst version", BBHTML:"tabel version", MSG413ERR:"<h3>Den generede rapport er for stor.</h3><p>Brug andre muligeheder for at rapportere uden problemer</p>", CHKREPORTFORMAT:"Generer rapport ved brug af tabbeler", WALLNOTSAVED:"Muren er ikke gemt", WALLSAVED:"Muren er gemt", POPSELRECRUNIT:"klik, for at v\u00e6lge standard produktions enhed", 
  POPRECRUNITTRADE:"klik, for at inds\u00e6tte de n\u00f8dvendige ressourcer for den valgte enhed", POPINSERTLASTREPORT:"Inds\u00e6t den senest konventerede rapport", MSGCOPYREPORT:"Rapporten er gemt. V\u00e6r s\u00f8d at klikke [paste_icon] p\u00e5 forummet eller under ny besked for at inds\u00e6tte den", POPDISABLEALARM:"Sl\u00e5 alarm fra", SOUNDSETTINGS:"Lyd indstillinger", CHKSOUNDMUTE:"Lydl\u00f8s", SOUNDVOLUME:"Lydstyke", SOUNDURL:"Lyd fil url", CHKSOUNDLOOP:"spring", POPSOUNDLOOP:"Spring i numrene", 
  POPSOUNDMUTE:"Sl\u00e5 lyden fra", POPSOUNDPLAY:"Spil med nuv\u00e6rende indstillinger", POPSOUNDSTOP:"Stop afspilning", POPSOUNDURL:"Url sti til lydfilen", STATS:{PLAYER:"Spiller statistik", ALLY:"Alliance statistik", TOWN:"By statistik"}, ABH:{WND:{WINDOWTITLE:"GRCRTools H\u00e6r Bygnings Hj\u00e6lper", UNITFRAME:"v\u00e6lg din enhed", DESCRIPTION1:"I denne by, har du [population] fri befolkning", DESCRIPTION2:"Hvilket er nok til at rekruttere [max_units]", DESCRIPTION3:"Du [yesno] har udforsket  [research].", 
  DESCRIPTION4:"Du kan maximalt s\u00e6tte [max_queue] enheder igang   ", TARGET:"v\u00e6lg dit byggem\u00e5l", PACKAGE:"ressourcer per bestilling (enhed)", BTNSAVE:"gem indstillingerne", TOOLTIPOK:"klik, for at v\u00e6lge enhed du vil sende resourser til", TOOLTIPNOTOK:"enheder er ikke udforsket", HASRESEARCH:"G\u00d8R", NORESEARCH:"G\u00d8R IKKE", SETTINGSAVED:"Ops\u00e6tningen for [by] er gemt"}, RESWND:{RESLEFT:"tilg\u00e6ngelige ressourcer", IMGTOOLTIP:"klik, for at inds\u00e6tte ressourcer"}}, 
  NEWVERSION:{AVAILABLE:"Ny version tilg\u00e6ngelig", INSTALL:"Installer", REMINDER:"P\u00e5mind mig senere", REQRELOAD:"Kr\u00e6ver genindl\u00e6sning af siden", RELOAD:"Genindl\u00e6s"}, LANGS:{LANG:"Overs\u00e6ttelse for sprog:", SEND:"Send til publikatoren", SAVE:"Gem og test", RESET:"Gendan standard sproget", REMOVE:"Slet din overs\u00e6tning"}, HELPTAB5:"Overs\u00e6ttelse", ATTACKER:"Angribere", DEFENDER:"Forsvarer", MSGHIDAT:"angriber", MSGHIDDE:"forsvarer", MSGATTUNIT:"H\u00e6r angreb", 
  MSGDEFUNIT:"H\u00e6r forsvarere", EMOTS:{LABEL:"Vil du have flere smilieys?", MESS:"Inds\u00e6t links til smilieys, hver p\u00e5 en ny linie"}, COMMAND:{ALL:"Alle", INCOMING:"indkommende", OUTGOING:"udg\u00e5ende", RETURNING:"retur", FORTOWN:"by:"}, BTNSIMUL:"Simulatoren", LASTUPDATE:"1427550767614"};
  this.de = {INFO:{0:"Potusek", 1:"grepolis@potusek.eu"}, WEBSITE:"Strona domowa", AUTHOR:"Kartuga-Chipssi1@gmx.net, Lupo22, Jordan06", BTNCONV:"Convert", BTNGENER:"Generieren", BTNSRC:"Quelle", BTNVIEW:"Vorschau", BTNSAVE:"Speichern", BTNMARKS:"Als gelesen markieren", BTNMARKA:"Markieren Sie alle als gelesen", MSGTITLE:"Konvertieren Report", MSGQUEST:"Welche der Daten, die Sie ver\u00f6ffentlichen wollen?", MSGALL:"Alle", MSGBBCODE:"Nach der Ver\u00f6ffentlichung des Berichts, k\u00f6nnen Sie die News in internen und externen Foren ver\u00f6ffentlichen.", 
  MSGRESOURCE:"Beute", MSGUNITS:"Einheiten", MSGBUILD:"Geb\u00e4ude", MSGUSC:"Die verwendeten Silber-M\u00fcnzen ", MSGRAW:"Rohstoffe", SUPPORT:"Unterst\u00fctzt", SPY:"Spionage", CONQUER:"erobert", LOSSES:"Verluste", HIDDEN:"versteckt", NOTUNIT:"[i]Keine[/i]", TOWN:"[i]Stadt:[/i] ", PLAYER:"[i]Spieler:[/i] ", ALLY:"[i]Allianz:[/i] ", CAST:"Besetzung:", ONTOWER:"\u00fcber der Stadt:", MSGHIDAD:"St\u00e4de ausblenden", MSGFORUM:"Der Bericht wird ver\u00f6ffentlicht", BBALLY:"Allianz Forum / in Nachrichten", 
  BBFORUM:"Externe Forum", ERRGETSRC:"Ist ein Fehler aufgetreten! Bitte, generiere mir die Quelle und senden Sie als Anhang an die Adresse potusek@westtax.info", ICOCLOSE:"Schlie\u00dfen", ICOHELP:"\u00dcber Konverter", MSGPREVIEW:"<b>Report-Vorschau</b>", HELPTAB1:"\u00dcber", HELPTAB2:"Wie es funktioniert", HELPTAB3:"\u00c4nderungen", HELPTAB4:"Einstellungen", HLPVERSION:"Version", HLPFIXED:"Fixed", HLPADDED:"Added", MSGHUMAN:{OK:"Die Informationen wurden gerettet", ERROR:"Fehler beim Schreiben"}, 
  STATS:"Player stats", STATSPOINT:"Points", STATSRANK:"Rank", LABELS:{attack:{ATTACKER:"Angreifer", DEFENDER:"Verteidiger", MSGHIDAT:"Angreifer", MSGHIDDE:"Verteidiger", MSGATTUNIT:"Armee angreifer", MSGDEFUNIT:"Armee verteidiger"}, support:{ATTACKER:"Unterst\u00fctzung", DEFENDER:"Unterst\u00fctzte", MSGHIDAT:"tragende", MSGHIDDE:"unterst\u00fctzt", MSGATTUNIT:"Armee Unterst\u00fctzung", MSGDEFUNIT:"Armee Verteidigung"}, espionage:{ATTACKER:"Spion", DEFENDER:"spioniert", MSGHIDAT:"Spion", MSGHIDDE:"ausspionierte Stadt", 
  MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"Befehl Details", MSGRETURN:"(r\u00fcckkehr)", MSGCLAIM:"Reservierte Stadt", MSGCLAIMPPUP:"Generieren Reservation", MSGDEFSITE:"Besiegt...", MSGLOSSITE:"Verluste...", MSGASATT:"...als Angreifer", MSGASDEF:"...als Verteidiger", MSGDIFF:"zeige unterschiede", MSGDIFF1:"zeige keine Unterschiede", MSGDIFF2:"Zeige Unterschiede", MSGDIFF3:"zeige nur die Unterschiede", BBCODELIMIT:"In Anbetracht der begrenzten Menge des Textes in einem Pfosten, im Falle einer langen Liste, wurden die Daten in Gruppen aufgeteilt. Jede Gruppe wird als separater Eintrag eingef\u00fcgt.", 
  CHKPOWERNAME:"Zeigt die verbleibende Zeit auf die M\u00f6glichkeit der Verwendung des Zaubers", CHKFORUMTABS:"Ersetzt das bl\u00e4ttern Forum Reiter werden in 2 Reihen angezeigt", BTNRESERVE:"Booking", LNKRESERVE:"Reservierungen", LBLGETRESER:"Erste Daten ...", BTNCHECK:"\u00dcberpr\u00fcfen Vorbehalte", CHKCMDIMG:"View the icons for the destination city commands", STATSLINK:"Statistiken anzeigen \u00fcber", BTNSUPPLAYERS:"Liste der Spieler", CHKUNITSCOST:"Im Bericht werden die Kosten f\u00fcr verlorene Einheiten angezeigt", 
  CHKOCEANNUMBER:"Display numbers seas", MSGRTYES:"Ja", MSGRTNO:"Nein", MSGGENBBCODE:"Erstelle die Liste als BBCode", BBTEXT:"Text Version", BBHTML:"Tabellen Version", WALLNOTSAVED:"Stadtmauer ist nicht sicher", WALLSAVED:"Stadtmauer ist sicher", POPINSERTLASTREPORT:"Einf\u00fcgen vom letzten Erstellten Bericht", POPDISABLEALARM:"Alarm Ausschalten", SOUNDSETTINGS:"Sound Einstellungen", ABH:{WND:{UNITFRAME:"Einheit w\u00e4hlen", DESCRIPTION1:"Sie habe in dieser Stadt [population] Freie Bev\u00f6lkerung", 
  BTNSAVE:"Einstellungen Speichern", SETTINGSAVED:"Einstellungen f\u00fcr [city] wurden gespeichert", DESCRIPTION2:"Das reicht f\u00fcr den Bau von [max_units]", DESCRIPTION3:"Die Forschung [research] [yesno] Erforscht.", HASRESEARCH:"IST", NORESEARCH:"IST NICHT", DESCRIPTION4:"Es k\u00f6nnen [max_queue] Einheiten gebaut werden.", WINDOWTITLE:"Armee bau helfer", TARGET:"w\u00e4hlen Sie Ihre Bau Ziel", PACKAGE:"Ressourcen-Paket pro Sendung (Einheiten)", TOOLTIPOK:"click, to select default unit for which you'll be sending resources", 
  TOOLTIPNOTOK:"Einheit nicht erforscht"}, RESWND:{IMGTOOLTIP:"Klicken Sie, um  Ressourcen zu f\u00fcllen"}}, NEWVERSION:{REMINDER:"sp\u00e4ter Erinnern", AVAILABLE:"Verf\u00fcgbare neue Version", INSTALL:"Installieren", REQRELOAD:"Aktualisierung erforderlich", RELOAD:"Aktualisierung "}, LANGS:{LANG:"\u00dcbersetzung in Sprache:", REMOVE:"L\u00f6schen der \u00dcbersetzung?", RESET:"Zur\u00fccksetzten auf default Sprache", SAVE:"Speichern & Testen", SEND:"senden zum Ver\u00f6ffentlichen"}, HELPTAB5:"\u00dcbersetzung", 
  POPSOUNDURL:"Url Pfad zur Musik Datei", SOUNDVOLUME:"Lautst\u00e4rke", MSGCOPYREPORT:"Der Bericht wurde gespeichert.Click [paste_icon] um den Bericht im Forum oder einer Nachricht Einzuf\u00fcgen.", POPSOUNDSTOP:"Wiedergabe Stoppen", MSGSHOWCOST:"Kosten f\u00fcr verlorene Einheiten", MSGRTLBL:"Revolte Informationen", MSGRTSHOW:"hinzuf\u00fcgen eingehende Revolte Informationen", MSGRTONLINE:"Werden Sie w\u00e4hrend der roten Revolte online sein?", MSGRTGOD:"Gott", MSGRTCSTIME:"CS Zeit", MSGRTONL:"Online?", 
  MSGRTERR:"Sie befinden sich in der falschen Stadt!<br/>Um Revolte Informationen zu erstellen, gehen Sie bitte zur Stadt: ", MSG413ERR:"<h3>Der generierte Bericht ist zu gro\u00df.</h3><p>Verwenden Sie die verf\u00fcgbaren Optionen zum reduzieren, und ohne Probleme zu ver\u00f6ffentlichen.</p>", CHKREPORTFORMAT:"Erstellen Sie Berichte mit Hilfe von Tabellen", POPSELRECRUNIT:"Klicken, um Standard-Produktionseinheit zu w\u00e4hlen", CHKSOUNDMUTE:"Stumm", SOUNDURL:"Musik Datei url", CHKSOUNDLOOP:"Schleife", 
  POPSOUNDLOOP:"Spielen in Schleife", POPSOUNDMUTE:"Stummschalten des Tons", POPSOUNDPLAY:"Spielen Sie mit den momentanen Einstellungen", EMOTS:{LABEL:"Sie wollen mehr Emoticon?", MESS:"Link einf\u00fcgen zu Emoticon, jeden in einer neuen Zeile."}, COMMAND:{ALL:"Alles", INCOMING:"Eingehend", OUTGOING:"Ausgehend", RETURNING:"R\u00fcckkehr", FORTOWN:"Stadt:"}, RADAR:{TOWNFINDER:"suche St\u00e4dte", FIND:"suchen", MAXCSTIME:"Maximale Zeit CS", BTNFIND:"suchen", TOWNNAME:"Stadt", CSTIME:"CS Zeit", TOWNOWNER:"Besitzer", 
  TOWNRESERVED:"Reservierung", TOWNPOINTS:"Minimale Stadt Punkte", BTNSAVEDEFAULT:"Werte als Standard speichern", ALL:"jede Stadt"}, TSL:{WND:{TOOLTIP:"zeige Sortiert nach Ort", WINDOWTITLE:"St\u00e4dte Liste sortiert"}}, QUESTION:"Frage", WALL:{LISTSAVED:"Gespeichert auf der Mauer der Tag", LISTSTATE:"Beschaffenheit der Mauer an dem Tag", DELETECURRENT:"L\u00f6schen Sie den aktuellen Datensatz", WANTDELETECURRENT:"M\u00f6chten Sie den aktuellen Datensatz von der Mauer entfernen?"}};
  this.el = {AUTHOR:"moutza, stathisss21, Akis27274, george696969", BTNCONV:"\u039c\u03b5\u03c4\u03b1\u03c4\u03c1\u03bf\u03c0\u03ae", BTNGENER:"\u0394\u03b7\u03bc\u03b9\u03bf\u03c5\u03c1\u03b3\u03af\u03b1", BTNVIEW:"\u03a0\u03c1\u03bf\u03b5\u03c0\u03b9\u03c3\u03ba\u03cc\u03c0\u03b7\u03c3\u03b7", BTNSAVE:"\u0391\u03c0\u03bf\u03b8\u03ae\u03ba\u03b5\u03c5\u03c3\u03b7", MSGTITLE:"\u039c\u03b5\u03c4\u03b1\u03c4\u03c1\u03bf\u03c0\u03ae \u03b1\u03bd\u03b1\u03c6\u03bf\u03c1\u03ac\u03c2", MSGQUEST:"\u03a0\u03bf\u03b9\u03b1 \u03b1\u03c0\u03cc \u03c4\u03b1 \u03b4\u03b5\u03b4\u03bf\u03bc\u03ad\u03bd\u03b1 \u03b8\u03b5\u03c2 \u03bd\u03b1 \u03b4\u03b7\u03bc\u03bf\u03c3\u03b9\u03b5\u03cd\u03c3\u03b5\u03b9\u03c2;", 
  MSGBBCODE:"\u039c\u03b5\u03c4\u03ac \u03c4\u03b7 \u03b4\u03b7\u03bc\u03bf\u03c3\u03af\u03b5\u03c5\u03c3\u03b7 \u03c4\u03b7\u03c2 \u03b1\u03bd\u03b1\u03c6\u03bf\u03c1\u03ac\u03c2, \u03bc\u03c0\u03bf\u03c1\u03b5\u03af\u03c4\u03b5 \u03bd\u03b1 \u03c4\u03b7 \u03c3\u03c5\u03bd\u03b4\u03c5\u03ac\u03c3\u03b5\u03c4\u03b5 \u03bc\u03b5 \u03bd\u03ad\u03b1 \u03ba\u03b1\u03b9 \u03c6\u03cc\u03c1\u03bf\u03c5\u03bc\u03c2 \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03ce\u03bd\u03c4\u03b1\u03c2 \u03c4\u03bf BBCode.", 
  MSGRESOURCE:"\u039b\u03ac\u03c6\u03c5\u03c1\u03b1", MSGUNITS:"\u039c\u03bf\u03bd\u03ac\u03b4\u03b5\u03c2", MSGBUILD:"\u039a\u03c4\u03af\u03c1\u03b9\u03b1", MSGUSC:"\u03a7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03b7\u03bc\u03ad\u03bd\u03b1 \u03b1\u03c3\u03b7\u03bc\u03ad\u03bd\u03b9\u03b1 \u03bd\u03bf\u03bc\u03af\u03c3\u03bc\u03b1\u03c4\u03b1", MSGRAW:"\u03a5\u03bb\u03b9\u03ba\u03ac \u03ba\u03b1\u03c4\u03b1\u03c3\u03ba\u03b5\u03c5\u03ae\u03c2", SUPPORT:"\u03a5\u03c0\u03bf\u03c3\u03c4\u03ae\u03c1\u03b9\u03be\u03b7", 
  SPY:"\u039a\u03b1\u03c4\u03b1\u03c3\u03ba\u03bf\u03c0\u03af\u03b1", CONQUER:"\u039a\u03b1\u03c4\u03ac\u03ba\u03c4\u03b7\u03c3\u03b7", LOSSES:"\u0391\u03c0\u03ce\u03bb\u03b5\u03b9\u03b5\u03c2", HIDDEN:"\u039a\u03c1\u03c5\u03bc\u03bc\u03ad\u03bd\u03b1", NOTUNIT:"[i]\u039a\u03b1\u03bd\u03ad\u03bd\u03b1\u03c2[/i]", TOWN:"[i]\u03a0\u03cc\u03bb\u03b7:[/i] ", PLAYER:"[i]\u03a0\u03b1\u03af\u03c7\u03c4\u03b7\u03c2:[/i] ", ALLY:"[i]\u03a3\u03c5\u03bc\u03bc\u03b1\u03c7\u03af\u03b1:[/i] ", CAST:"\u03b5\u03be\u03b1\u03c0\u03cc\u03bb\u03c5\u03c3\u03b7:", 
  ONTOWER:"\u039c\u03b5\u03c2 \u03c4\u03b7\u03bd \u03c0\u03cc\u03bb\u03b7:", MSGHIDAD:"\u039a\u03c1\u03cd\u03c8\u03b5 \u03c4\u03b9\u03c2 \u03c0\u03cc\u03bb\u03b5\u03b9\u03c2", MSGFORUM:"\u0397 \u03b1\u03bd\u03b1\u03c6\u03bf\u03c1\u03ac \u03b8\u03b1 \u03b4\u03b7\u03bc\u03bf\u03c3\u03b9\u03b5\u03c5\u03b8\u03b5\u03af", BBALLY:"\u03c3\u03c5\u03bc\u03bc\u03b1\u03c7\u03b9\u03ba\u03cc \u03c6\u03cc\u03c1\u03bf\u03c5\u03bc / \u03c3\u03b5 \u03bc\u03ae\u03bd\u03c5\u03bc\u03b1", BBFORUM:"\u03b5\u03be\u03c9\u03c4\u03b5\u03c1\u03b9\u03ba\u03cc \u03c6\u03cc\u03c1\u03bf\u03c5\u03bc", 
  ICOCLOSE:"\u039a\u03bb\u03b5\u03b9\u03c3\u03c4\u03cc", ICOHELP:"\u03a3\u03c7\u03b5\u03c4\u03b9\u03ba\u03ac \u03bc\u03b5 \u03c4\u03bf\u03bd \u039c\u03b5\u03c4\u03b1\u03c4\u03c1\u03bf\u03c0\u03ad\u03b1", MSGPREVIEW:"<b>\u03a0\u03c1\u03bf\u03b5\u03c0\u03b9\u03c3\u03ba\u03cc\u03c0\u03b7\u03c3\u03b7 \u0391\u03bd\u03b1\u03c6\u03bf\u03c1\u03ac\u03c2</b>", HELPTAB1:"\u03a3\u03c7\u03b5\u03c4\u03b9\u03ba\u03ac \u03bc\u03b5", HELPTAB2:"\u03a0\u03c9\u03c2 \u03bb\u03b5\u03b9\u03c4\u03bf\u03c5\u03c1\u03b3\u03b5\u03af", 
  HELPTAB3:"\u0391\u03bb\u03bb\u03b1\u03b3\u03ad\u03c2", HELPTAB4:"\u03a1\u03c5\u03b8\u03bc\u03af\u03c3\u03b5\u03b9\u03c2", MSGHUMAN:{OK:"\u039f\u03b9 \u03c0\u03bb\u03b7\u03c1\u03bf\u03c6\u03bf\u03c1\u03af\u03b5\u03c2 \u03ad\u03c7\u03bf\u03c5\u03bd \u03b1\u03c0\u03bf\u03b8\u03b7\u03ba\u03b5\u03c5\u03c4\u03b5\u03af", ERROR:"\u0388\u03bd\u03b1 \u03c3\u03c6\u03ac\u03bb\u03bc\u03b1 \u03c0\u03b1\u03c1\u03bf\u03c5\u03c3\u03b9\u03ac\u03c3\u03c4\u03b7\u03ba\u03b5 \u03ba\u03b1\u03b8\u03ce\u03c2 \u03b3\u03c1\u03ac\u03c6\u03b1\u03c4\u03b5"}, 
  LABELS:{attack:{ATTACKER:"\u0395\u03c0\u03b9\u03c4\u03b9\u03b8\u03ad\u03bc\u03b5\u03bd\u03bf\u03c2", DEFENDER:"\u0391\u03bc\u03c5\u03bd\u03cc\u03bc\u03b5\u03bd\u03bf\u03c2", MSGHIDAT:"\u03b5\u03c0\u03b9\u03c4\u03b9\u03b8\u03ad\u03bc\u03b5\u03bd\u03bf\u03c5", MSGHIDDE:"\u03b1\u03bc\u03c5\u03bd\u03cc\u03bc\u03b5\u03bd\u03bf\u03c5", MSGATTUNIT:"\u03a3\u03c4\u03c1\u03b1\u03c4\u03cc\u03c2 \u03c0\u03bf\u03c5 \u03b5\u03c0\u03b9\u03c4\u03b5\u03af\u03b8\u03b5\u03c4\u03b5", MSGDEFUNIT:"\u03a3\u03c4\u03c1\u03b1\u03c4\u03cc\u03c2 \u03c0\u03bf\u03c5 \u03b1\u03bc\u03cd\u03bd\u03b5\u03c4\u03b5"}, 
  support:{ATTACKER:"\u03a5\u03c0\u03bf\u03c3\u03c4\u03b7\u03c1\u03af\u03b6\u03c9", DEFENDER:"\u03a5\u03c0\u03bf\u03c3\u03c4\u03b7\u03c1\u03af\u03b6\u03bf\u03bc\u03b1\u03b9", MSGHIDAT:"\u03c5\u03c0\u03bf\u03c3\u03c4\u03b7\u03c1\u03af\u03b6\u03c9", MSGHIDDE:"\u03c5\u03c0\u03bf\u03c3\u03c4\u03b7\u03c1\u03af\u03b6\u03bf\u03bc\u03b1\u03b9", MSGATTUNIT:"\u03a3\u03c4\u03c1\u03b1\u03c4\u03cc\u03c2 \u03c0\u03bf\u03c5 \u03c5\u03c0\u03bf\u03c3\u03c4\u03b7\u03c1\u03af\u03b6\u03b5\u03b9", MSGDEFUNIT:"\u03a3\u03c4\u03c1\u03b1\u03c4\u03cc\u03c2 \u03c0\u03bf\u03c5 \u03b1\u03bc\u03cd\u03bd\u03b5\u03c4\u03b5"}, 
  espionage:{ATTACKER:"\u039a\u03b1\u03c4\u03b1\u03c3\u03ba\u03bf\u03c0\u03b5\u03cd\u03b5\u03b9", DEFENDER:"\u039a\u03b1\u03c4\u03b1\u03c3\u03ba\u03bf\u03c0\u03b5\u03cd\u03b5\u03c4\u03b5", MSGHIDAT:"\u03ba\u03b1\u03c4\u03b1\u03c3\u03ba\u03bf\u03c0\u03b5\u03cd\u03b5\u03b9", MSGHIDDE:"\u03ba\u03b1\u03c4\u03b1\u03c3\u03ba\u03bf\u03c0\u03b5\u03cd\u03b5\u03c4\u03b1\u03b9", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"\u03bb\u03b5\u03c0\u03c4\u03bf\u03bc\u03ad\u03c1\u03b5\u03b9\u03b5\u03c2 \u03b5\u03bd\u03c4\u03bf\u03bb\u03ae\u03c2", 
  MSGRETURN:"(\u03b5\u03c0\u03b9\u03c3\u03c4\u03c1\u03bf\u03c6\u03ae)", MSGGENBBCODE:"\u0394\u03b7\u03bc\u03b9\u03bf\u03c5\u03c1\u03b3\u03af\u03b1 \u03bb\u03af\u03c3\u03c4\u03b1\u03c2 \u03c4\u03c9\u03bd BBCode", MSGDEFSITE:"\u0397\u03c4\u03c4\u03ae\u03b8\u03b7\u03ba\u03b1\u03bd...", MSGLOSSITE:"\u0391\u03c0\u03ce\u03bb\u03b5\u03b9\u03b5\u03c2...", MSGASATT:"...\u03c9\u03c2 \u03b5\u03c0\u03b9\u03c4\u03b9\u03b8\u03ad\u03bc\u03b5\u03bd\u03bf\u03b9", MSGASDEF:"...\u03c9\u03c2 \u03b1\u03bc\u03c5\u03bd\u03cc\u03bc\u03b5\u03bd\u03bf\u03b9", 
  MSGDIFF1:"\u03bc\u03b7\u03bd \u03b4\u03b5\u03af\u03c7\u03bd\u03b5\u03b9\u03c2 \u03c4\u03b9\u03c2 \u03b4\u03b9\u03b1\u03c6\u03bf\u03c1\u03ad\u03c2", MSGDIFF2:"\u03b4\u03b5\u03af\u03be\u03b5 \u03c4\u03b9\u03c2 \u03b4\u03b9\u03b1\u03c6\u03bf\u03c1\u03ad\u03c2", MSGDIFF3:"\u03b4\u03b5\u03af\u03be\u03b5 \u03bc\u03cc\u03bd\u03bf \u03c4\u03b9\u03c2 \u03b4\u03b9\u03b1\u03c6\u03bf\u03c1\u03ad\u03c2", BBCODELIMIT:"\u0395\u03bd\u03cc\u03c8\u03b5\u03b9 \u03c4\u03bf\u03c5 \u03c0\u03b5\u03c1\u03b9\u03bf\u03c1\u03b9\u03c3\u03bc\u03ad\u03bd\u03bf\u03c5 \u03c0\u03bf\u03c3\u03bf\u03cd \u03c4\u03c9\u03bd \u03ba\u03b5\u03b9\u03bc\u03ad\u03bd\u03c9\u03bd \u03c3\u03b5 \u03bc\u03af\u03b1 \u03b8\u03ad\u03c3\u03b7, \u03c3\u03c4\u03b7\u03bd \u03c0\u03b5\u03c1\u03af\u03c0\u03c4\u03c9\u03c3\u03b7 \u03b5\u03bd\u03cc\u03c2 \u03bc\u03b1\u03ba\u03c1\u03bf\u03cd \u03ba\u03b1\u03c4\u03b1\u03bb\u03cc\u03b3\u03bf\u03c5, \u03c4\u03b1 \u03b4\u03b5\u03b4\u03bf\u03bc\u03ad\u03bd\u03b1 \u03c7\u03c9\u03c1\u03af\u03b6\u03bf\u03bd\u03c4\u03b1\u03b9 \u03c3\u03b5 \u03bf\u03bc\u03ac\u03b4\u03b5\u03c2. \u039a\u03ac\u03b8\u03b5 \u03bf\u03bc\u03ac\u03b4\u03b1 \u03b5\u03c0\u03b9\u03ba\u03bf\u03bb\u03bb\u03ac\u03c4\u03b1\u03b9 \u03c9\u03c2 \u03be\u03b5\u03c7\u03c9\u03c1\u03b9\u03c3\u03c4\u03ae \u03b5\u03af\u03c3\u03bf\u03b4\u03bf.", 
  CHKPOWERNAME:"\u0395\u03bc\u03c6\u03ac\u03bd\u03b9\u03c3\u03b7 \u03ce\u03c1\u03b1\u03c2 \u03c0\u03bf\u03c5 \u03b1\u03c0\u03bf\u03bc\u03ad\u03bd\u03b5\u03b9 \u03bc\u03ad\u03c7\u03c1\u03b9 \u03c4\u03b7 \u03b4\u03c5\u03bd\u03b1\u03c4\u03cc\u03c4\u03b7\u03c4\u03b1 \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03af\u03b7\u03c3\u03b7\u03c2 \u03be\u03bf\u03c1\u03ba\u03b9\u03bf\u03cd", CHKFORUMTABS:"\u0391\u03bd\u03c4\u03b9\u03ba\u03b1\u03c4\u03b1\u03c3\u03c4\u03ae\u03c3\u03c4\u03b5 \u03c4\u03b7\u03bd \u03ba\u03cd\u03bb\u03b9\u03c3\u03b7 \u03ba\u03b1\u03c1\u03c4\u03b5\u03bb\u03ce\u03bd \u03c3\u03c4\u03bf \u03c6\u03cc\u03c1\u03bf\u03c5\u03bc \u03b3\u03b9\u03b1 \u03c0\u03bf\u03bb\u03bb\u03b1\u03c0\u03bb\u03ae \u03b3\u03c1\u03b1\u03bc\u03bc\u03ae", 
  STATSLINK:"\u03a3\u03c4\u03b1\u03c4\u03b9\u03c3\u03c4\u03b9\u03ba\u03ac \u03c4\u03b7\u03c2 \u03b1\u03c0\u03b5\u03b9\u03ba\u03cc\u03bd\u03b9\u03c3\u03b7\u03c2", BTNSUPPLAYERS:"\u039b\u03af\u03c3\u03c4\u03b1 \u03c4\u03c9\u03bd \u03c0\u03b1\u03b9\u03c7\u03c4\u03ce\u03bd", CHKUNITSCOST:"\u0397 \u03b1\u03bd\u03b1\u03c6\u03bf\u03c1\u03ac \u03b4\u03b5\u03af\u03c7\u03bd\u03b5\u03b9 \u03c4\u03b7\u03bd \u03b1\u03be\u03af\u03b1 \u03c4\u03c9\u03bd \u03c7\u03b1\u03bc\u03ad\u03bd\u03c9\u03bd \u03bc\u03bf\u03bd\u03ac\u03b4\u03c9\u03bd", 
  CHKOCEANNUMBER:"\u03a0\u03c1\u03bf\u03b2\u03bf\u03bb\u03ae \u03c4\u03c9\u03bd \u03bd\u03bf\u03cd\u03bc\u03b5\u03c1\u03c9\u03bd \u03c4\u03c9\u03bd \u03b8\u03b1\u03bb\u03b1\u03c3\u03c3\u03ce\u03bd", MSGRTLBL:"\u03a0\u03bb\u03b7\u03c1\u03bf\u03c6\u03bf\u03c1\u03af\u03b5\u03c2 \u03b5\u03c0\u03b1\u03bd\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7\u03c2", MSGRTSHOW:"\u03a0\u03c1\u03bf\u03c3\u03b8\u03ae\u03ba\u03b7 \u03c0\u03bb\u03b7\u03c1\u03bf\u03c6\u03bf\u03c1\u03b9\u03ce\u03bd \u03b5\u03c0\u03b1\u03bd\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7\u03c2 \u03b5\u03bd \u03b5\u03be\u03b5\u03bb\u03af\u03be\u03b5\u03b9", 
  MSGRTONLINE:"\u03a3\u03ba\u03bf\u03c0\u03b5\u03cd\u03b5\u03c4\u03b5 \u03bd\u03b1 \u03b5\u03af\u03c3\u03c4\u03b5 \u03c3\u03b5 \u03b1\u03c0\u03b5\u03c5\u03b8\u03b5\u03af\u03b1\u03c2 \u03c3\u03cd\u03bd\u03b4\u03b5\u03c3\u03b7 \u03ba\u03b1\u03c4\u03ac \u03c4\u03b7 \u03b4\u03b9\u03ac\u03c1\u03ba\u03b5\u03b9\u03b1 \u03c4\u03b7\u03c2 \u03ba\u03cc\u03ba\u03ba\u03b9\u03bd\u03b7\u03c2 \u03b5\u03c0\u03b1\u03bd\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7\u03c2;", MSGRTYES:"\u039d\u03b1\u03b9", MSGRTNO:"\u038c\u03c7\u03b9", 
  MSGRTGOD:"\u0398\u03b5\u03cc\u03c2", MSGRTCSTIME:"\u03a7\u03c1\u03cc\u03bd\u03bf\u03c2 \u03b1\u03c0\u03bf\u03b9\u03ba\u03b9\u03b1\u03ba\u03bf\u03cd", MSGRTONL:"\u03b5\u03bd\u03c4\u03cc\u03c2 \u03c3\u03cd\u03bd\u03b4\u03b5\u03c3\u03b7\u03c2;", MSGRTERR:"\u0395\u03af\u03c3\u03c4\u03b5 \u03c3\u03b5 \u03bb\u03ac\u03b8\u03bf\u03c2 \u03c0\u03cc\u03bb\u03b7! <br/> \u0393\u03b9\u03b1 \u03bd\u03b1 \u03b4\u03b7\u03bc\u03b9\u03bf\u03c5\u03c1\u03b3\u03ae\u03c3\u03b5\u03c4\u03b5 \u03c4\u03b9\u03c2 \u03c0\u03bb\u03b7\u03c1\u03bf\u03c6\u03bf\u03c1\u03af\u03b5\u03c2 \u03b5\u03c0\u03b1\u03bd\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7\u03c2, \u03c0\u03b1\u03c1\u03b1\u03ba\u03b1\u03bb\u03bf\u03cd\u03bc\u03b5 \u03c0\u03b7\u03b3\u03b1\u03af\u03bd\u03b5\u03c4\u03b5 \u03c3\u03c4\u03b7\u03bd \u03c0\u03cc\u03bb\u03b7:", 
  BBTEXT:"\u03ad\u03ba\u03b4\u03bf\u03c3\u03b7 \u03ba\u03b5\u03b9\u03bc\u03ad\u03bd\u03bf\u03c5", BBHTML:"\u03ad\u03ba\u03b4\u03bf\u03c3\u03b7 \u03c0\u03af\u03bd\u03b1\u03ba\u03b1", MSG413ERR:"<h3>\u0397 \u03b4\u03b7\u03bc\u03b9\u03bf\u03c5\u03c1\u03b3\u03b7\u03bc\u03ad\u03bd\u03b7 \u03ad\u03ba\u03b8\u03b5\u03c3\u03b7 \u03b5\u03af\u03bd\u03b1\u03b9 \u03c0\u03bf\u03bb\u03cd \u03bc\u03b5\u03b3\u03ac\u03bb\u03b7.</h3><p>\u03a7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03ae\u03c3\u03c4\u03b5 \u03c4\u03b9\u03c2 \u03b4\u03b9\u03b1\u03b8\u03ad\u03c3\u03b9\u03bc\u03b5\u03c2 \u03b5\u03c0\u03b9\u03bb\u03bf\u03b3\u03ad\u03c2 \u03ba\u03b1\u03b9 \u03bc\u03b5\u03b9\u03ce\u03c3\u03c4\u03b5 \u03b3\u03b9\u03b1 \u03bd\u03b1 \u03b4\u03b7\u03bc\u03bf\u03c3\u03b9\u03b5\u03cd\u03c3\u03b5\u03c4\u03b5 \u03c7\u03c9\u03c1\u03af\u03c2 \u03c0\u03c1\u03bf\u03b2\u03bb\u03ae\u03bc\u03b1\u03c4\u03b1.</p>", 
  CHKREPORTFORMAT:"\u0394\u03b7\u03bc\u03b9\u03bf\u03c5\u03c1\u03b3\u03af\u03b1 \u03b1\u03bd\u03b1\u03c6\u03bf\u03c1\u03ce\u03bd \u03bc\u03b5 \u03c0\u03af\u03bd\u03b1\u03ba\u03b5\u03c2", WALLNOTSAVED:"\u03a4\u03bf \u03c4\u03b5\u03af\u03c7\u03bf\u03c2 \u03b4\u03b5\u03bd \u03ad\u03c7\u03b5\u03b9 \u03b1\u03c0\u03bf\u03b8\u03b7\u03ba\u03b5\u03c5\u03c4\u03b5\u03af", WALLSAVED:"\u03a4\u03bf \u03c4\u03b5\u03af\u03c7\u03bf\u03c2 \u03ad\u03c7\u03b5\u03b9 \u03b1\u03c0\u03bf\u03b8\u03b7\u03ba\u03b5\u03c5\u03c4\u03b5\u03af", 
  POPSELRECRUNIT:"\u03ba\u03bb\u03b9\u03ba, \u03b3\u03b9\u03b1 \u03bd\u03b1 \u03b4\u03b9\u03b1\u03bb\u03ad\u03be\u03b5\u03c4\u03b5 \u03b1\u03c5\u03c4\u03cc\u03bc\u03b1\u03c4\u03b7 \u03bc\u03bf\u03bd\u03ac\u03b4\u03b1 \u03c0\u03b1\u03c1\u03b1\u03b3\u03c9\u03b3\u03ae\u03c2", POPRECRUNITTRADE:"\u03ba\u03bb\u03b9\u03ba, \u03b3\u03b9\u03b1 \u03bd\u03b1 \u03c3\u03c5\u03bc\u03c0\u03bb\u03b7\u03c1\u03ce\u03c3\u03b5\u03c4\u03b5 \u03c4\u03bf\u03c5\u03c2 \u03b1\u03c0\u03b1\u03b9\u03c4\u03bf\u03cd\u03bc\u03b5\u03bd\u03bf\u03c5\u03c2 \u03c0\u03cc\u03c1\u03bf\u03c5\u03c2 \u03b3\u03b9\u03b1 \u03c4\u03b7 \u03c3\u03c4\u03c1\u03b1\u03c4\u03bf\u03bb\u03cc\u03b3\u03b7\u03c3\u03b7 \u03c4\u03b7\u03c2 \u03b5\u03c0\u03b9\u03bb\u03b5\u03b3\u03bc\u03ad\u03bd\u03b7\u03c2 \u03bc\u03bf\u03bd\u03ac\u03b4\u03b1\u03c2", 
  POPINSERTLASTREPORT:"\u0395\u03c0\u03b9\u03ba\u03cc\u03bb\u03bb\u03b7\u03c3\u03b5 \u03c4\u03b7\u03bd \u03c4\u03b5\u03bb\u03b5\u03c5\u03c4\u03b1\u03af\u03b1 \u03bc\u03b5\u03c4\u03b1\u03c4\u03c1\u03bf\u03c0\u03bf\u03b9\u03b7\u03bc\u03ad\u03bd\u03b7 \u03b1\u03bd\u03b1\u03c6\u03bf\u03c1\u03ac", MSGCOPYREPORT:"\u0397 \u03b1\u03bd\u03b1\u03c6\u03bf\u03c1\u03ac \u03ad\u03c7\u03b5\u03b9 \u03b1\u03c0\u03bf\u03b8\u03b7\u03ba\u03b5\u03c5\u03c4\u03b5\u03af. \u03a0\u03b1\u03c1\u03b1\u03ba\u03b1\u03bb\u03ce \u03ba\u03bb\u03b9\u03ba [paste_icon] \u03c3\u03b5 \u03c6\u03cc\u03c1\u03bf\u03c5\u03bc \u03ae \u03c3\u03c4\u03bf \u03c0\u03b1\u03c1\u03ac\u03b8\u03c5\u03c1\u03bf \u03bd\u03ad\u03bf\u03c5 \u03bc\u03b7\u03bd\u03cd\u03bc\u03b1\u03c4\u03bf\u03c2 \u03b3\u03b9\u03b1 \u03b5\u03c0\u03b9\u03ba\u03cc\u03bb\u03bb\u03b7\u03c3\u03b7.", 
  POPDISABLEALARM:"\u0391\u03c0\u03b5\u03bd\u03b5\u03c1\u03b3\u03bf\u03c0\u03bf\u03af\u03b7\u03c3\u03b7 \u03c3\u03c5\u03bd\u03b1\u03b3\u03b5\u03c1\u03bc\u03bf\u03cd", SOUNDSETTINGS:"\u03a1\u03c5\u03b8\u03bc\u03af\u03c3\u03b5\u03b9\u03c2 \u03ae\u03c7\u03bf\u03c5", CHKSOUNDMUTE:"\u03a3\u03af\u03b3\u03b1\u03c3\u03b7", SOUNDVOLUME:"\u0388\u03bd\u03c4\u03b1\u03c3\u03b7", SOUNDURL:"url \u03b1\u03c1\u03c7\u03b5\u03af\u03bf\u03c5 \u03ae\u03c7\u03bf\u03c5", CHKSOUNDLOOP:"\u0395\u03c0\u03b1\u03bd\u03ac\u03bb\u03b7\u03c8\u03b7", 
  POPSOUNDLOOP:"\u03a0\u03b1\u03af\u03be\u03b5 \u03c3\u03c4\u03b7\u03bd \u03b5\u03c0\u03b1\u03bd\u03ac\u03bb\u03b7\u03c8\u03b7", POPSOUNDMUTE:"\u03a3\u03af\u03b3\u03b1\u03c3\u03b5 \u03c4\u03bf\u03bd \u03ae\u03c7\u03bf", POPSOUNDPLAY:"\u03a0\u03b1\u03af\u03be\u03b5 \u03bc\u03b5 \u03c4\u03b9\u03c2 \u03c4\u03c1\u03ad\u03c7\u03bf\u03c5\u03c3\u03b5\u03c2 \u03c1\u03c5\u03b8\u03bc\u03af\u03c3\u03b5\u03b9\u03c2", POPSOUNDSTOP:"\u03a3\u03c4\u03b1\u03bc\u03ac\u03c4\u03b1 \u03bd\u03b1 \u03c0\u03b1\u03af\u03b6\u03b5\u03b9\u03c2", 
  POPSOUNDURL:"\u0394\u03b9\u03b5\u03cd\u03b8\u03c5\u03bd\u03c3\u03b7 \u03b4\u03b9\u03b1\u03b4\u03c1\u03bf\u03bc\u03ae\u03c2 url \u03c0\u03c1\u03bf\u03c2 \u03c4\u03bf \u03b1\u03c1\u03c7\u03b5\u03af\u03bf \u03ae\u03c7\u03bf\u03c5", STATS:{PLAYER:"\u03a3\u03c4\u03b1\u03c4\u03b9\u03c3\u03c4\u03b9\u03ba\u03ac \u03c0\u03b1\u03af\u03c7\u03c4\u03b7", ALLY:"\u03a3\u03c4\u03b1\u03c4\u03b9\u03c3\u03c4\u03b9\u03ba\u03ac \u03c3\u03c5\u03bc\u03bc\u03b1\u03c7\u03af\u03b1\u03c2", TOWN:"\u03a3\u03c4\u03b1\u03c4\u03b9\u03c3\u03c4\u03b9\u03ba\u03ac \u03c0\u03cc\u03bb\u03b7\u03c2"}, 
  ABH:{WND:{WINDOWTITLE:"Army Builder Helper", UNITFRAME:"\u03b4\u03b9\u03ac\u03bb\u03b5\u03be\u03b5 \u03c4\u03b7 \u03bc\u03bf\u03bd\u03ac\u03b4\u03b1 \u03c3\u03bf\u03c5", DESCRIPTION1:"\u03a3\u03b5 \u03b1\u03c5\u03c4\u03ae\u03bd \u03c4\u03b7\u03bd \u03c0\u03cc\u03bb\u03b7, \u03ad\u03c7\u03b5\u03b9\u03c2 [population] \u03b5\u03bb\u03b5\u03cd\u03b8\u03b5\u03c1\u03bf \u03c0\u03bb\u03b7\u03b8\u03c5\u03c3\u03bc\u03cc", DESCRIPTION2:"\u039f \u03bf\u03c0\u03bf\u03af\u03bf\u03c2 \u03b5\u03af\u03bd\u03b1\u03b9 \u03b1\u03c1\u03ba\u03b5\u03c4\u03cc\u03c2 \u03b3\u03b9\u03b1 \u03bd\u03b1 \u03c6\u03c4\u03ac\u03be\u03b5\u03b9\u03c2 [max_units]", 
  DESCRIPTION3:"[yesno] \u03c4\u03b7\u03bd \u03ad\u03c1\u03b5\u03c5\u03bd\u03b1 [research] \u03b5\u03c1\u03b5\u03c5\u03bd\u03b7\u03bc\u03ad\u03bd\u03b7.", DESCRIPTION4:"\u039c\u03c0\u03bf\u03c1\u03b5\u03af\u03c2 \u03bd\u03b1 \u03b2\u03ac\u03bb\u03b5\u03b9\u03c2 \u03c3\u03b5 \u03bf\u03c5\u03c1\u03ac \u03c4\u03bf \u03bc\u03ad\u03b3\u03b9\u03c3\u03c4\u03bf \u03c4\u03c9\u03bd [max_queue] \u03bc\u03bf\u03bd\u03ac\u03b4\u03c9\u03bd", TARGET:"\u03b5\u03c0\u03b9\u03bb\u03ad\u03be\u03c4\u03b5 \u03c4\u03bf\u03bd \u03ba\u03b1\u03c4\u03b1\u03c3\u03ba\u03b5\u03c5\u03b1\u03c3\u03c4\u03b9\u03ba\u03cc \u03c3\u03b1\u03c2 \u03c3\u03c4\u03cc\u03c7\u03bf", 
  PACKAGE:"\u03c0\u03b1\u03ba\u03ad\u03c4\u03bf \u03c4\u03c9\u03bd \u03c0\u03cc\u03c1\u03c9\u03bd \u03b1\u03bd\u03ac \u03b1\u03c0\u03bf\u03c3\u03c4\u03bf\u03bb\u03ae (\u03bc\u03bf\u03bd\u03ac\u03b4\u03b5\u03c2)", BTNSAVE:"\u03b1\u03c0\u03bf\u03b8\u03ae\u03ba\u03b5\u03c5\u03c3\u03b7 \u03c1\u03c5\u03b8\u03bc\u03af\u03c3\u03b5\u03c9\u03bd", TOOLTIPOK:"\u03ba\u03bb\u03b9\u03ba, \u03b3\u03b9\u03b1 \u03bd\u03b1 \u03b5\u03c0\u03b9\u03bb\u03ad\u03be\u03b5\u03c4\u03b5 \u03c4\u03b7\u03bd \u03c0\u03c1\u03bf\u03b5\u03c0\u03b9\u03bb\u03b5\u03b3\u03bc\u03ad\u03bd\u03b7 \u03bc\u03bf\u03bd\u03ac\u03b4\u03b1 \u03b3\u03b9\u03b1 \u03c4\u03b7\u03bd \u03bf\u03c0\u03bf\u03af\u03b1 \u03b8\u03b1 \u03c3\u03c4\u03b5\u03af\u03bb\u03b5\u03c4\u03b5 \u03c0\u03cc\u03c1\u03bf\u03c5\u03c2", 
  TOOLTIPNOTOK:"\u03b7 \u03bc\u03bf\u03bd\u03ac\u03b4\u03b1 \u03b4\u03b5\u03bd \u03ad\u03c7\u03b5\u03b9 \u03b5\u03c1\u03b5\u03c5\u03bd\u03b7\u03b8\u03b5\u03af", HASRESEARCH:"\u0388\u03c7\u03b5\u03b9\u03c2", NORESEARCH:"\u0394\u0395\u039d \u03ad\u03c7\u03b5\u03b9\u03c2", SETTINGSAVED:"\u039f\u03b9 \u03c1\u03c5\u03b8\u03bc\u03af\u03c3\u03b5\u03b9\u03c2 \u03b3\u03b9\u03b1 \u03c4\u03b7\u03bd [\u03c0\u03cc\u03bb\u03b7] \u03ad\u03c7\u03bf\u03c5\u03bd \u03b1\u03c0\u03bf\u03b8\u03b7\u03ba\u03b5\u03c5\u03c4\u03b5\u03af"}, 
  RESWND:{RESLEFT:"\u03c0\u03cc\u03c1\u03bf\u03b9 \u03c0\u03bf\u03c5 \u03b1\u03c0\u03bf\u03bc\u03ad\u03bd\u03bf\u03c5\u03bd \u03bd\u03b1 \u03c3\u03c4\u03b5\u03af\u03bb\u03b5\u03c4\u03b1\u03b9", IMGTOOLTIP:"\u03ba\u03bb\u03b9\u03ba, \u03b3\u03b9\u03b1 \u03c3\u03c5\u03bc\u03c0\u03bb\u03ae\u03c1\u03c9\u03c3\u03b7 \u03c0\u03cc\u03c1\u03c9\u03bd"}}, NEWVERSION:{AVAILABLE:"\u039d\u03ad\u03b1 \u03ad\u03ba\u03b4\u03bf\u03c3\u03b7 \u03b4\u03b9\u03b1\u03b8\u03ad\u03c3\u03b9\u03bc\u03b7", INSTALL:"\u0395\u03b3\u03ba\u03b1\u03c4\u03ac\u03c3\u03c4\u03b1\u03c3\u03b7", 
  REMINDER:"\u03a5\u03c0\u03b5\u03bd\u03b8\u03cd\u03bc\u03b9\u03c3\u03b7 \u03b1\u03c1\u03b3\u03cc\u03c4\u03b5\u03c1\u03b1", REQRELOAD:"\u0391\u03c0\u03b1\u03b9\u03c4\u03b5\u03af\u03c4\u03b1\u03b9 \u03b1\u03bd\u03b1\u03bd\u03ad\u03c9\u03c3\u03b7 \u03c4\u03b7\u03c2 \u03c3\u03b5\u03bb\u03af\u03b4\u03b1\u03c2", RELOAD:"\u0391\u03bd\u03b1\u03bd\u03ad\u03c9\u03c3\u03b7"}, LANGS:{LANG:"\u039c\u03b5\u03c4\u03ac\u03c6\u03c1\u03b1\u03c3\u03b7 \u03b3\u03b9\u03b1 \u03b3\u03bb\u03ce\u03c3\u03c3\u03b1:", SEND:"\u03a3\u03c4\u03b5\u03af\u03bb\u03b5 \u03b3\u03b9\u03b1 \u03b4\u03b7\u03bc\u03bf\u03c3\u03af\u03b5\u03c5\u03c3\u03b7", 
  SAVE:"\u0391\u03c0\u03bf\u03b8\u03ae\u03ba\u03b5\u03c5\u03c3\u03b7 & \u03b4\u03bf\u03ba\u03b9\u03bc\u03ae", RESET:"\u0395\u03c0\u03b1\u03bd\u03ac\u03c6\u03bf\u03c1\u03ac \u03c3\u03c4\u03b7\u03bd \u03c0\u03c1\u03bf\u03b5\u03c0\u03b9\u03bb\u03b5\u03b3\u03bc\u03ad\u03bd\u03b7 \u03b3\u03bb\u03ce\u03c3\u03c3\u03b1", REMOVE:"\u0394\u03b9\u03b1\u03b3\u03c1\u03b1\u03c6\u03ae \u03c4\u03b7\u03c2 \u03bc\u03b5\u03c4\u03ac\u03c6\u03c1\u03b1\u03c3\u03ae\u03c2 \u03c3\u03bf\u03c5?"}, HELPTAB5:"\u039c\u03b5\u03c4\u03ac\u03c6\u03c1\u03b1\u03c3\u03b7", 
  COMMAND:{FORTOWN:"\u03c0\u03cc\u03bb\u03b7:", RETURNING:"\u03b5\u03c0\u03b9\u03c3\u03c4\u03c1\u03ad\u03c6\u03bf\u03c5\u03bd", OUTGOING:"\u03b5\u03be\u03b5\u03c1\u03c7\u03cc\u03bc\u03b5\u03bd\u03b1", INCOMING:"\u03b5\u03b9\u03c3\u03b5\u03c1\u03c7\u03cc\u03bc\u03b5\u03bd\u03b1", ALL:"\u038c\u03bb\u03b1"}, EMOTS:{MESS:"\u0395\u03c0\u03b9\u03ba\u03bf\u03bb\u03ae\u03c3\u03c4\u03b5 \u03c3\u03c5\u03bd\u03b4\u03ad\u03c3\u03bc\u03bf\u03c5\u03c2 \u03c4\u03c9\u03bd emoticon, \u03ba\u03ac\u03b8\u03b5 \u03ad\u03bd\u03b1\u03bd \u03c3\u03b5 \u03bc\u03b9\u03b1 \u03bd\u03ad\u03b1 \u03b3\u03c1\u03b1\u03bc\u03bc\u03ae", 
  LABEL:"\u0398\u03ad\u03bb\u03b5\u03c4\u03b5 \u03c0\u03b5\u03c1\u03b9\u03c3\u03c3\u03cc\u03c4\u03b5\u03c1\u03b1 emoticons?"}, BTNSIMUL:"\u03a0\u03c1\u03bf\u03c3\u03bf\u03bc\u03bf\u03b9\u03c9\u03c4\u03ae\u03c2", LASTUPDATE:"1427551114803"};
  this.en = {AUTHOR:"Potusek, Anpu, BentleyJ, Lascaux", BTNCONV:"Convert", BTNGENER:"Generate", BTNVIEW:"Preview", BTNSAVE:"Save", BTNVIEWBB:"BBCode", MSGTITLE:"Convert report", MSGQUEST:"Which of the data do you want to publish?", MSGBBCODE:"Following the publication of the report, you can pair it with news and forums using the BBCode.", MSGRESOURCE:"Loot", MSGUNITS:"Units", MSGBUILD:"Buildings", MSGUSC:"Silver coins used", MSGRAW:"Raw materials", MSGSHOWCOST:"Costs of lost units", SUPPORT:"Support", 
  SPY:"Spying", CONQUER:"Conquered", LOSSES:"Losses", HIDDEN:"Hidden", NOTUNIT:"[i]None[/i]", TOWN:"[i]Town:[/i] ", PLAYER:"[i]Player:[/i] ", ALLY:"[i]Ally:[/i] ", CAST:"cast:", ONTOWER:"On the town:", MSGHIDAD:"Hide cities", MSGFORUM:"The report will be published", BBALLY:"alliance forums / in the message", BBFORUM:"external forum", ICOCLOSE:"Close", ICOHELP:"About converter", MSGPREVIEW:"<b>Report preview</b>", HELPTAB1:"About", HELPTAB2:"How does it work", HELPTAB3:"Changes", HELPTAB4:"Settings", 
  MSGHUMAN:{OK:"The information has been saved", ERROR:"An error occurred while writing", YOUTUBEERROR:"Incorrect link or not allowed to play outside youtube"}, LABELS:{attack:{ATTACKER:"Attacker", DEFENDER:"Defender", MSGHIDAT:"attacker", MSGHIDDE:"defender", MSGATTUNIT:"Army attacking", MSGDEFUNIT:"Army defenders"}, support:{ATTACKER:"Supporting", DEFENDER:"Supported", MSGHIDAT:"supporting", MSGHIDDE:"supported", MSGATTUNIT:"Army supporting", MSGDEFUNIT:"Army defenders"}, espionage:{ATTACKER:"Spy", 
  DEFENDER:"Spied", MSGHIDAT:"spy", MSGHIDDE:"spied", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"command details", MSGRETURN:"(return)", MSGGENBBCODE:"Generate a list of BBCode", MSGDEFSITE:"Defeated...", MSGLOSSITE:"Losses...", MSGASATT:"...as an attacker", MSGASDEF:"...as a defender", MSGDIFF1:"do not show differences", MSGDIFF2:"show differences", MSGDIFF3:"show only the differences", BBCODELIMIT:"In view of the limited amount of text in one post, in the case of a long list, the data were divided into groups. Each group paste as a separate entry.", 
  CHKPOWERNAME:"Display time remaining to the possibility of using the spell", CHKFORUMTABS:"Replace scrolling tabs on the forum for multi line", STATSLINK:"Statistics from the display", BTNSUPPLAYERS:"List of players", CHKUNITSCOST:"The report showing the cost of lost units", CHKOCEANNUMBER:"Display ocean numbers", MSGRTLBL:"Revolt information", MSGRTSHOW:"Add ongoing revolt information", MSGRTONLINE:"Are you going to be online during red revolt?", MSGRTYES:"Yes", MSGRTNO:"No", MSGRTGOD:"God", MSGRTCSTIME:"CS time", 
  MSGRTONL:"online?", MSGRTERR:"You are in a wrong city!<br/>To create revolt information, please go to city: ", BBTEXT:"text version", BBHTML:"table version", BBIMG:"single image", MSG413ERR:"<h3>The generated report is too large.</h3><p>Use the available options and reduce to publish without problems.</p>", CHKREPORTFORMAT:"Generate reports using tables", WALLNOTSAVED:"Wall is not saved", WALLSAVED:"Wall is saved", POPSELRECRUNIT:"click, to select default production unit", POPRECRUNITTRADE:"click, to fill in resources needed to recruit selected unit", 
  POPINSERTLASTREPORT:"Paste the last converted report", MSGCOPYREPORT:"The report has been saved. Please click [paste_icon] on forums or new message window to paste it", POPDISABLEALARM:"Disable alarm", SOUNDSETTINGS:"Sound settings", CHKSOUNDMUTE:"Mute", SOUNDVOLUME:"Volume", SOUNDURL:"Sound file url", CHKSOUNDLOOP:"loop", POPSOUNDLOOP:"Play in the loop", POPSOUNDMUTE:"Mute the sound", POPSOUNDPLAY:"Play with current settings", POPSOUNDSTOP:"Stop playng", POPSOUNDURL:"Url path to the file with sound", 
  POPSOUNDEG:"example: https://www.youtube.com/watch?v=v2AC41dglnM, https://youtu.be/v2AC41dglnM, http://www.freesfx.co.uk/rx2/mp3s/10/11532_1406234695.mp3", STATS:{PLAYER:"Player stats", ALLY:"Alliance stats", TOWN:"Town stats", INACTIVE:"Inactive", CHKINACTIVE:"Show inactive players", INACTIVEDESC:"At that time there was no point fighting and expansion"}, ABH:{WND:{WINDOWTITLE:"Army Builder Helper", UNITFRAME:"choose your unit", DESCRIPTION1:"In this city, you have [population] free population", 
  DESCRIPTION2:"Which is enough to build [max_units]", DESCRIPTION3:"You [yesno] have a [research] researched.", DESCRIPTION4:"You can queue up maximum of [max_queue] units", TARGET:"choose your build target", PACKAGE:"resource package per shipment (units)", BTNSAVE:"save settings", TOOLTIPOK:"click, to select default unit for which you'll be sending resources", TOOLTIPNOTOK:"unit has not been researched", HASRESEARCH:"DO", NORESEARCH:"DO NOT", SETTINGSAVED:"Settings for [city] have been saved"}, 
  RESWND:{RESLEFT:"resources left to send", IMGTOOLTIP:"click, to fill in resources"}}, NEWVERSION:{AVAILABLE:"New version available", INSTALL:"Install", REMINDER:"Remind me later", REQRELOAD:"Refresh required", RELOAD:"Refresh"}, LANGS:{LANG:"Translation for language:", SEND:"Send to publication", SAVE:"Save & test", RESET:"Restore the default language", REMOVE:"Delete your translation?"}, HELPTAB5:"Translation", BTNSIMUL:"Simulator", EMOTS:{LABEL:"Do you want more emoticon?", MESS:"Paste links to emoticon, each on a new line"}, 
  COMMAND:{ALL:"All", INCOMING:"incoming", OUTGOING:"outgoing", RETURNING:"returning", FORTOWN:"town:"}, RADAR:{TOWNFINDER:"Search cities", FIND:"Search", MAXCSTIME:"Maximum time colony ship", BTNFIND:"Search", TOWNNAME:"Town", CSTIME:"CS time", TOWNOWNER:"Owner", TOWNRESERVED:"Reservation", TOWNPOINTS:"Minimal town points", BTNSAVEDEFAULT:"Save values as default", ALL:"Any town"}, WALL:{LISTSAVED:"Saved on the wall the day", LISTSTATE:"Condition of the wall on the day", DELETECURRENT:"Delete the current record", 
  WANTDELETECURRENT:"Do you want to delete the current record of the wall?"}, QUESTION:"Question", TSL:{WND:{WINDOWTITLE:"Towns Sorted List", TOOLTIP:"show sorted town"}}, CHKOLDTRADE:"Use old trade layout", AO:{TITLE:"Academy Overview"}, MOBILEVERSION:"Mobile version", CHKWONDERTRADE:"When sending resources for world wonders, send maximum equal amounts"};
  this.es = {INFO:{0:"Potusek", 1:"grepolis@potusek.eu"}, WEBSITE:"Website", AUTHOR:"katralba@gmail.com, JONUSEJ, Shirowashi", BTNCONV:"Convertir", BTNGENER:"Generar", BTNSRC:"Fuente", BTNVIEW:"Visualizar", BTNSAVE:"Guardar", BTNMARKS:"Marcarlo como le\u00eddo", BTNMARKA:"Marcar todo como le\u00eddo", MSGTITLE:"Convertir reporte", MSGQUEST:"\u00bfQu\u00e9 datos desea publicar?", MSGALL:"Todo", MSGBBCODE:"Una vez publicado el reporte, se puede anexar al foro utilizando c\u00f3digo BB.", MSGRESOURCE:"Saquear", 
  MSGUNITS:"Unidades", MSGBUILD:"Edificios", MSGUSC:"Monedas utilizadas", MSGRAW:"Materias primas", SUPPORT:"Soporte", SPY:"Espionaje", CONQUER:"Conquistado", LOSSES:"P\u00e9rdidas", HIDDEN:"Escondido", NOTUNIT:"[i]Nada[/i]", TOWN:"[i]Ciudad:[/i] ", PLAYER:"[i]Jugador:[/i] ", ALLY:"[i]Alianza:[/i] ", CAST:"echar:", ONTOWER:"En la ciudad:", MSGHIDAD:"Esconder ciudades", MSGFORUM:"El reporte se publicar\u00e1", BBALLY:"foro de la alianza / en el mensaje", BBFORUM:"foro externo", ERRGETSRC:"\u00a1Ha habido un error! Por favor, generar el fuente y enviarlo como anexo a  potusek@westtax.info", 
  ICOCLOSE:"Cerrar", ICOHELP:"Acerca del convertidor", MSGPREVIEW:"<b>Previsualizaci\u00f3n de informe</b>", HELPTAB1:"Acerca de", HELPTAB2:"C\u00f3mo funciona", HELPTAB3:"Cambios", HELPTAB4:"Configuraci\u00f3n", HLPVERSION:"Modificaci\u00f3n", HLPFIXED:"Corregido", HLPADDED:"A\u00f1adido", MSGHUMAN:{OK:"La informaci\u00f3n se ha guardado", ERROR:"Error al escribir"}, STATS:"Estad\u00edsticas del jugador", STATSPOINT:"Puntos", STATSRANK:"Rango", LABELS:{attack:{ATTACKER:"Atacante", DEFENDER:"Defensor", 
  MSGHIDAT:"atacante", MSGHIDDE:"defensor", MSGATTUNIT:"Ej\u00e9rcito atacante", MSGDEFUNIT:"Ej\u00e9rcito defensor"}, support:{ATTACKER:"Apoyador", DEFENDER:"Apoyado", MSGHIDAT:"apoyador", MSGHIDDE:"apoyado", MSGATTUNIT:"Ej\u00e9rcito de apoyo", MSGDEFUNIT:"Ej\u00e9rcito apoyado"}, espionage:{ATTACKER:"Esp\u00eda", DEFENDER:"Espiado", MSGHIDAT:"esp\u00eda", MSGHIDDE:"espiado", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"Detalles del comando", MSGRETURN:"(volver)", MSGCLAIM:"reservas de ciudades", 
  MSGCLAIMPPUP:"Generar la reserva", MSGGENBBCODE:"Generar una lista de c\u00f3digo BBC", MSGDEFSITE:"Derrotado...", MSGLOSSITE:"P\u00e9rdidas...", MSGASATT:"...como atacante", MSGASDEF:"...como defensor", MSGDIFF1:"no mostrar las diferencias", MSGDIFF2:"mostrar las diferencias", MSGDIFF3:"mostrar s\u00f3lo las diferencias", BBCODELIMIT:"En vista de la cantidad limitada de texto en un mensaje, si hay una lista larga, se dividir\u00e1 en partes. Cada parte cuenta como una entidad separada.", CHKPOWERNAME:"Mostrar el tiempo restante hasta el pr\u00f3ximo hechizo", 
  CHKNIGHTNAME:"Oscurece la ciudad en el bono nocturno", CHKFORUMTABS:"Reemplazar los desplazamientos de las pesta\u00f1as del foro por multi-l\u00ednea", BTNRESERVE:"Anotando", LNKRESERVE:"Reservas", LBLGETRESER:"Obteniendo los datos ...", BTNCHECK:"Verificando las  reservas", CHKCMDIMG:"View the icons for the destination city commands", STATSLINK:"Estad\u00edsticas en pantalla", BTNSUPPLAYERS:"Lista de jugadores", CHKUNITSCOST:"El informe muestra el coste de las unidades perdidas", CHKOCEANNUMBER:"Mostrar n\u00fameros de mares", 
  MSGRTGOD:"Deidad", MSGRTYES:"Si", MSGRTONLINE:"\u00bfEstar\u00e1s conectado durante el pu\u00f1o rojo?", MSGRTLBL:"Informaci\u00f3n de la revuelta", MSGRTERR:"\u00a1Est\u00e1s en una ciudad equivocada!<br/>Para crear informaci\u00f3n de la revuelta, por favor ve a la ciudad: ", BBTEXT:"versi\u00f3n texto", BBHTML:"versi\u00f3n tabla", MSG413ERR:"<h3>El informe generado es demasiado largo.</h3><p>Use las opciones disponibles y reduzcalo para publicar sin problemas.</p>", CHKREPORTFORMAT:"Generar informes usando tablas", 
  WALLNOTSAVED:"La muralla no est\u00e1 guardada", WALLSAVED:"Muralla guardada", POPSELRECRUNIT:"click, para seleccionar la unidad de producci\u00f3n por defecto", POPRECRUNITTRADE:"click, para rellenar los recursos necesarios para reclutar la unidad seleccionada", POPINSERTLASTREPORT:"Pegar el \u00faltimo informe convertido", MSGCOPYREPORT:"El informe ha sido guardado. Por favor click [paste_icon] on el foro o la ventana de nuevo mensaje para pegarlo", POPDISABLEALARM:"Desconectar alarma", SOUNDSETTINGS:"Ajustes de sonido", 
  CHKSOUNDMUTE:"Silenciar", SOUNDVOLUME:"Volumen", SOUNDURL:"URL fichero sonido", CHKSOUNDLOOP:"Repetir", POPSOUNDLOOP:"Reproducci\u00f3n continua", POPSOUNDMUTE:"Desactivar sonido", POPSOUNDPLAY:"Reproducir con los ajustes actuales", POPSOUNDSTOP:"Detener reproducci\u00f3n", POPSOUNDURL:"Ruta URL al fichero de sonido", ABH:{WND:{UNITFRAME:"elija su unidad", WINDOWTITLE:"Ayudante del constructor de ejercitos", DESCRIPTION1:"En esta ciudad, tienes [population] poblaci\u00f3n libre", DESCRIPTION2:"Que es suficiente para hacer [max_units]", 
  DESCRIPTION3:"T\u00fa [yesno] tienes [research] investigado.", DESCRIPTION4:"Puedes agregar un m\u00e1ximo de [max_queue] unidades", TARGET:"elige tu edificio objetivo", PACKAGE:"paquete de recursos por env\u00edo (unidades)", BTNSAVE:"guardar ajustes", TOOLTIPOK:"click, para seleccionar la unidad por defecto para la que enviar\u00e1s recursos", TOOLTIPNOTOK:"unidad no investigada", HASRESEARCH:"HAZ", NORESEARCH:"NO HAGAS", SETTINGSAVED:"Los ajustes para [city] guardados"}, RESWND:{RESLEFT:"recursos pendientes de env\u00edo", 
  IMGTOOLTIP:"click, para rellenar recursos"}}, NEWVERSION:{AVAILABLE:"Disponible nueva versi\u00f3n", INSTALL:"Instalar", REMINDER:"Record\u00e1rmelo m\u00e1s tarde", REQRELOAD:"Se necesita cargar de nuevo el sitio", RELOAD:"Cargar de nuevo"}, LANGS:{LANG:"Traducci\u00f3n para idioma:", SEND:"Enviar a publicar", SAVE:"Guardar y probar", RESET:"Restablecer el idioma por defecto", REMOVE:"\u00bfBorrar tu traducci\u00f3n?"}, HELPTAB5:"Traducci\u00f3n", MSGRTSHOW:"Informaci\u00f3n de la revuelta en curso", 
  MSGRTCSTIME:"Horario CS", MSGRTONL:"\u00bfconectado?", BTNSIMUL:"Simulador", EMOTS:{LABEL:"\u00bfQuieres m\u00e1s emoticonos?", MESS:"Pega enlaces de un emoticono, cada uno en una nueva l\u00ednea"}, COMMAND:{ALL:"Todo", INCOMING:"entrante", OUTGOING:"saliente", RETURNING:"retornando", FORTOWN:"ciudad:"}, LASTUPDATE:"1427551266169"};
  this.fr = {INFO:{0:"Potusek", 1:"grepolis@potusek.eu"}, WEBSITE:"Site web", AUTHOR:"group.xione@gmail.com, aezeluk, MilleBaffes, Steros", BTNCONV:"Convertir", BTNGENER:"G\u00e9ner\u00e9", BTNSRC:"Source", BTNVIEW:"Aper\u00e7u", BTNSAVE:"sauvegarder", BTNMARKS:"Marqu\u00e9 comme lu", BTNMARKA:"Marqu\u00e9 tout comme lu", MSGTITLE:"Convertir le rapport", MSGQUEST:"que souhaitez vous publier?", MSGALL:"tout", MSGBBCODE:"Apr\u00e8s la publication du rapport, vous pouvez le placer dans les forums en utilisant le BBCode.", 
  MSGRESOURCE:"piller", MSGUNITS:"Unit\u00e9s", MSGBUILD:"Batiments", MSGUSC:"Pi\u00e8ces d'argent utilis\u00e9es", MSGRAW:"Mati\u00e8res premi\u00e8re", SUPPORT:"soutien", SPY:"Espionnage", CONQUER:"Conquis", LOSSES:"pertes", HIDDEN:"cach\u00e9", NOTUNIT:"[i]rien[/i]", TOWN:"[i]ville:[/i] ", PLAYER:"[i]joueur:[/i] ", ALLY:"[i]Alliance:[/i] ", CAST:"cast:", ONTOWER:"dans la ville:", MSGHIDAD:"villes Masqu\u00e9es", MSGFORUM:"Le rapport sera publi\u00e9", BBALLY:"Forum d'alliance / dans le message", 
  BBFORUM:"Forum externe", ERRGETSRC:"Une erreur s'est produite S'il vous pla\u00eet, g\u00e9n\u00e9rer la source et envoyer une pi\u00e8ce jointe \u00e0 potusek@westtax.info", ICOCLOSE:"Fermer", ICOHELP:"\u00c0 propos du convertisseur", MSGPREVIEW:"<b>Aper\u00e7u rapport</b>", HELPTAB1:"A propos", HELPTAB2:"Comment \u00e7a marche", HELPTAB3:"Changements", HELPTAB4:"Param\u00e8tres", HLPVERSION:"Version", HLPFIXED:"Corriger", HLPADDED:"Ajouter", MSGHUMAN:{OK:"L'information a \u00e9t\u00e9 sauvegard\u00e9e", 
  ERREUR:"Une erreur s'est produite lors de l'\u00e9criture"}, STATSPOINT:"Points", STATSRANK:"Rang", LABELS:{attack:{ATTACKER:"Attaquant", DEFENDER:"D\u00e9fenseur", MSGHIDAT:"Attaquant", MSGHIDDE:"D\u00e9fenseur", MSGATTUNIT:"Arm\u00e9e attaquante", MSGDEFUNIT:"Arm\u00e9e d\u00e9fensive"}, support:{ATTACKER:"Soutenir", DEFENDER:"Soutien", MSGHIDAT:"Soutenir", MSGHIDDE:"Soutien", MSGATTUNIT:"Arm\u00e9e de support", MSGDEFUNIT:"Arm\u00e9e d\u00e9fensive"}, espionage:{ATTACKER:"Espion", DEFENDER:"Espionn\u00e9", 
  MSGHIDAT:"Espion", MSGHIDDE:"Espionn\u00e9", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"les d\u00e9tails des commandes", MSGRETURN:"(retour)", MSGCLAIM:"r\u00e9serve la ville", MSGCLAIMPPUP:"G\u00e9n\u00e9rer r\u00e9servation", MSGGENBBCODE:"G\u00e9n\u00e9rer la liste de BBCode", MSGDEFSITE:"Vaincu...", MSGLOSSITE:"Pertes...", MSGASATT:"... en tant qu'attaquant", MSGASDEF:"... en tant que d\u00e9fenseur", MSGDIFF1:"ne pas afficher les diff\u00e9rences", MSGDIFF2:"afficher les diff\u00e9rences", 
  MSGDIFF3:"afficher seulement les diff\u00e9rences", BBCODELIMIT:"Compte tenu du montant limit\u00e9 de texte dans un poste, dans le cas d'une longue liste, les donn\u00e9es ont \u00e9t\u00e9 divis\u00e9 en groupes; Chaque groupe sera coll\u00e9 comme une entr\u00e9e s\u00e9par\u00e9e", CHKPOWERNAME:"Afficher le temps restant avant la possibilit\u00e9 d'utiliser le sort", CHKNIGHTNAME:"Assombrir la ville en bonus de nuit.", CHKFORUMTABS:'Remplacer les "ascenseurs" de d\u00e9filement sur le forum pour le multi ligne', 
  BTNRESERVE:"R\u00e9servation", LNKRESERVE:"R\u00e9servations", LBLGETRESER:"Obtenir des donn\u00e9es ...", BTNCHECK:"V\u00e9rification des r\u00e9serves", CHKCMDIMG:"Afficher les icones de destinations des d\u00e9placements", STATSLINK:" Source des statistiques :", BTNSUPPLAYERS:"List of players", CHKUNITSCOST:"The report showing the cost of lost units", CHKOCEANNUMBER:"Display numbers seas", MSGRTLBL:"Information de r\u00e9volte", MSGRTSHOW:"Ajouter des informations sur la r\u00e9volte en cours", 
  MSGRTONLINE:"Allez-vous \u00eatre en ligne lors de la r\u00e9volte rouge?", MSGRTYES:"Oui", MSGRTNO:"Non", MSGRTGOD:"Dieu", MSGRTCSTIME:"CS", MSGRTONL:"en ligne?", MSGRTERR:"Vous \u00eates dans une mauvaise ville <br/> Pour cr\u00e9er des informations de r\u00e9volte, s'il vous pla\u00eet allez \u00e0 la ville en r\u00e9volte :", BBTEXT:"Version texte", BBHTML:"Version tableau", MSG413ERR:"<h3>Le rapport g\u00e9n\u00e9r\u00e9 est trop grand.</h3><p>Utilisez l'option disponible pour r\u00e9duire et publier le rapport sans probl\u00e8mes.</p>", 
  CHKREPORTFORMAT:"G\u00e9n\u00e9rer les rapports \u00e0 l'aide de tableaux", WALLNOTSAVED:"Les remparts ne sont pas enregistr\u00e9s", WALLSAVED:"Les remparts sont enregistr\u00e9s", POPSELRECRUNIT:"cliquez, pour s\u00e9lectionner l'unit\u00e9 de production par d\u00e9faut", POPRECRUNITTRADE:"cliquez, pour remplir les ressources n\u00e9cessaires pour l'unit\u00e9 s\u00e9lectionn\u00e9e", POPINSERTLASTREPORT:"Collez le dernier rapport converti", MSGCOPYREPORT:"Le rapport a \u00e9t\u00e9 enregistr\u00e9. Cliquez sur [paste_icon] pour le coller", 
  POPDISABLEALARM:"d\u00e9sactiver l'alarme", SOUNDSETTINGS:"R\u00e9glages son", CHKSOUNDMUTE:"Muet", SOUNDVOLUME:"Volume", SOUNDURL:"URL du fichier son", CHKSOUNDLOOP:"boucle", POPSOUNDLOOP:"lire en boucle", POPSOUNDMUTE:"Couper le son", POPSOUNDPLAY:"Lire avec les param\u00e8tres actuels", POPSOUNDSTOP:"Arreter la lecture", POPSOUNDURL:"Chemin (lien) vers le fichier audio", STATS:{PLAYER:"Statistiques joueur", ALLY:"Statistiques alliance", TOWN:"Statistiques ville"}, ABH:{WND:{WINDOWTITLE:"Aide construction d'arm\u00e9e", 
  UNITFRAME:"Choisissez le type d'unit\u00e9", DESCRIPTION1:"Dans cette ville, vous avez [population] population libre", DESCRIPTION2:"Qui est suffisant pour construire [max_units]", DESCRIPTION3:"Vous [yesno] [research] recherch\u00e9.", DESCRIPTION4:"File d'attente maximale de [max_queue] unit\u00e9s", TARGET:"Choisissez le nombre d'unit\u00e9s \u00e0 produire", PACKAGE:"Nombre de ressources par envoi (en unit\u00e9s)", BTNSAVE:"Enregistrer les param\u00e8tres", TOOLTIPOK:"Cliquez pour s\u00e9lectionner l'unit\u00e9 par d\u00e9faut pour lequel vous enverrez des ressources", 
  TOOLTIPNOTOK:"Le type d'unit\u00e9 n'a pas \u00e9t\u00e9 recherch\u00e9", HASRESEARCH:"avez", NORESEARCH:"n'avez pas", SETTINGSAVED:"Les r\u00e9glages pour [city] ont \u00e9t\u00e9 enregistr\u00e9s"}, RESWND:{RESLEFT:"Ressources restantes \u00e0 envoy\u00e9es", IMGTOOLTIP:"Cliquez, pour ajouter les ressources"}}, NEWVERSION:{AVAILABLE:"Nouvelle version disponible", INSTALL:"Installer", REMINDER:"Me rappeler plus tard", REQRELOAD:"N\u00e9cessite le raffra\u00eechissement du site", RELOAD:"Raffra\u00eechir"}, 
  LANGS:{LANG:"Traduction de la langue", SEND:"Envoyer pour publication", SAVE:"Sauver et tester", RESET:"Restaurer le langage par d\u00e9faut", REMOVE:"Supprimer votre traduction?"}, HELPTAB5:"Traduction", BTNSIMUL:"Simulateur", EMOTS:{LABEL:{}, MESS:"collez le lien vers les \u00e9moticons, chaque fois sur une nouvelle ligne"}, COMMAND:{ALL:"tout", INCOMING:"entrant", OUTGOING:"sortant", FORTOWN:"ville:"}};
  this.it = {INFO:{0:"Potusek", 1:"grepolis@potusek.eu"}, WEBSITE:"Sito web", AUTHOR:"av250866@gmail.com, G.O.W., Marco305, Xyarghas", BTNCONV:"Converti", BTNGENER:"Crea", BTNSRC:"Sorgente", BTNVIEW:"Anterprima", BTNSAVE:"Salva", BTNMARKS:"Segna come letto", BTNMARKA:"Segna tutto come letto", MSGTITLE:"Converti il report", MSGQUEST:"Quali informazioni vuoi pubblicare?", MSGALL:"Tutto", MSGBBCODE:"Una volta pubblicato il report, potrai inserirlo nelle news o nel forums tramite il BBCode.", MSGRESOURCE:"Bottino", 
  MSGUNITS:"Unit\u00e0", MSGBUILD:"Edifici", MSGUSC:"Argento impiegato", MSGRAW:"Materiali", SUPPORT:"Supporti", SPY:"Spiando", CONQUER:"Conquistata", LOSSES:"Persa", HIDDEN:"Nascosto", NOTUNIT:"[i]Nessuna[/i]", TOWN:"[i]Citt\u00e0:[/i] ", PLAYER:"[i]Giocatore:[/i] ", ALLY:"[i]Alleanza:[/i] ", CAST:"lancia:", ONTOWER:"sulla citt\u00e0:", MSGHIDAD:"Nascondi citt\u00e0", MSGFORUM:"Il report sar\u00e0 pubblicato", BBALLY:"Forum alleanza / nel messaggio", BBFORUM:"forum esterno", ERRGETSRC:"Errore! Per favore, creare il sorgente ed inviarlo come allegato a potusek@westtax.info", 
  ICOCLOSE:"Chiudi", ICOHELP:"Riguardo al converter", MSGPREVIEW:"<b>Anteprima report</b>", HELPTAB1:"Riguardo a", HELPTAB2:"Come funziona", HELPTAB3:"Cambiamenti", HELPTAB4:"Opzioni", HLPVERSION:"Versione", HLPFIXED:"Corretto", HLPADDED:"Aggiunto", MSGHUMAN:{OK:"La informazione \u00e8 stata salvata", ERROR:"\u00e8 avvenuto un errore in scrittura"}, STATSPOINT:"Punti", STATSRANK:"classifica", LABELS:{attack:{ATTACKER:"Attaccante", DEFENDER:"Difensore", MSGHIDAT:"attaccante", MSGHIDDE:"difensore", 
  MSGATTUNIT:"Esercito attaccante", MSGDEFUNIT:"Esercito difensore"}, support:{ATTACKER:"In supporto", DEFENDER:"Supportato", MSGHIDAT:"in supporto", MSGHIDDE:"supportato", MSGATTUNIT:"Esercito in supporto", MSGDEFUNIT:"Esercito difensore"}, espionage:{ATTACKER:"Spia", DEFENDER:"Spiato", MSGHIDAT:"spia", MSGHIDDE:"spiato", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"dettagli ordine", MSGRETURN:"(ritorno)", MSGCLAIM:"citt\u00e0 prenotata", MSGCLAIMPPUP:"Genera prenotazione", MSGGENBBCODE:"Genera una lista in BBCode", 
  MSGDEFSITE:"Sconfitto...", MSGLOSSITE:"Perdite...", MSGASATT:"...come attaccante", MSGASDEF:"...come difensore", MSGDIFF1:"non mostrare le differenze", MSGDIFF2:"mostra le differenze", MSGDIFF3:"mostra solo le differenze", BBCODELIMIT:"A causa della quantit\u00e0 di testo limitata in un singolo post, in caso di liste molto lunghe i dati saranno divisi in gruppi. Copiare ciascun gruppo come post separato.", CHKPOWERNAME:"Mostra il tempo mancante all'utilizzo di un nuovo incantesimo", CHKNIGHTNAME:"Rende buie le citt\u00e0 in bonus notturno", 
  CHKFORUMTABS:"Sostituisce le tabelle a scorrimento nel forum con multilinea", HELPTAB5:"Traduzione", CHKCMDIMG:"Visualizza la icona per la citta di destinazione dei comandi", STATSLINK:"Statistiche da display", BTNSUPPLAYERS:"Lista dei giocatori", CHKUNITSCOST:"Il report mostra il costo delle unit\u00e0 perse", CHKOCEANNUMBER:"Visualizza il numero dei mari", MSGRTLBL:"Informazioni rivolta", MSGRTSHOW:"Aggiungi informazioni rivolta in corso", MSGRTONLINE:"Sarai connesso durante la rivolta rossa?", 
  MSGRTYES:"Si", MSGRTNO:"No", MSGRTGOD:"Dio", MSGRTCSTIME:"Tempo CS", MSGRTONL:"connesso?", MSGRTERR:"Sei nella citt\u00e0 sbagliata!<br/>Per creare un rapporto della rivolta, vai alla citt\u00e0: ", BBTEXT:"versione testo", BBHTML:"versione tabelle", MSG413ERR:"<h3>Il rapporto generato \u00e8 troppo grande.</h3><p>Usa le opzioni disponibili e riducilo per pubblicarlo senza problemi.</p>", CHKREPORTFORMAT:"Genera il rapporto usando le tabelle", WALLNOTSAVED:"Wall non \u00e8 stato salvato", WALLSAVED:"Wall \u00e8 stato salvato", 
  POPSELRECRUNIT:"clicca, per selezionare le unit\u00e0 da produrre di default", POPRECRUNITTRADE:"clicca, per riempire con le risorse necessarie a reclutare le unit\u00e0 selezionate", POPINSERTLASTREPORT:"Incolla l ultimo rapporto creato", MSGCOPYREPORT:"Il rapporto \u00e8 stato salvato. Per favore clicca [paste_icon] nel forum o nel nuovo messaggio per incollarlo", POPDISABLEALARM:"Disabilita allarme", SOUNDSETTINGS:"Opzioni suono", CHKSOUNDMUTE:"Silenzioso", SOUNDVOLUME:"Volume", SOUNDURL:"url del file sonoro", 
  CHKSOUNDLOOP:"ripeti", POPSOUNDLOOP:"Suona a ripetizione", POPSOUNDMUTE:"Silenzia il suono", POPSOUNDPLAY:"Suona con le opzioni correnti", POPSOUNDSTOP:"Smetti di suonare", POPSOUNDURL:"Percorso al file sonoro", STATS:{PLAYER:"Statistiche giocatore", ALLY:"Statistiche alleanza", TOWN:"Statistiche citt\u00e0"}, ABH:{WND:{WINDOWTITLE:"Aiuto costruzione esercito", UNITFRAME:"scegli le tue unit\u00e0", DESCRIPTION1:"In questa citt\u00e0, la popolazione libera \u00e8: [population]", DESCRIPTION2:"Che \u00e8 sufficiente per creare [max_units] unit\u00e0", 
  DESCRIPTION3:"Hai [yesno] una [research] ricercata.", DESCRIPTION4:"Puoi mettere in coda fino a [max_queue] unit\u00e0", TARGET:"Scegli le unit\u00e0 da costruire", PACKAGE:"Risorse sufficienti per creare(unit\u00e0)", BTNSAVE:"salva opzioni", TOOLTIPOK:"clicca, per selezionare la unit\u00e0 standard per la quale manderai risorse", TOOLTIPNOTOK:"questa unit\u00e0 non \u00e8 ancora stata ricercata", HASRESEARCH:"", NORESEARCH:"NON", SETTINGSAVED:"Le opzioni per la citt\u00e0 [city] sono state salvate"}, 
  RESWND:{RESLEFT:"risorse rimaste da inviare", IMGTOOLTIP:"clicca, per caricare le risorse"}}, NEWVERSION:{AVAILABLE:"Nuova versione disponibile", INSTALL:"Installa", REMINDER:"Ricordamelo pi\u00f9 tardi", REQRELOAD:"E' necessario aggiornare la pagina", RELOAD:"Aggiorna"}, LANGS:{LANG:"Traduzione per la lingua: ", SEND:"Invia per la pubblicazione", SAVE:"Salva e prova", RESET:"Ripristina la lingua predefinita", REMOVE:"Cancellare la tua traduzione?"}, BTNSIMUL:"Simulatore", EMOTS:{LABEL:"Vuoi altre faccine?", 
  MESS:"Copia i links alle faccinen, uno solo per riga"}, COMMAND:{ALL:"Tutto", INCOMING:"in arrivo", OUTGOING:"in partenza", RETURNING:"di ritorno", FORTOWN:"citt\u00e0:"}};
  this.nl = {INFO:{0:"Potusek", 1:"grepolis@potusek.eu"}, WEBSITE:"Website", AUTHOR:"zippohontas@gmail.com, jestertje, Gotcha8", BTNCONV:"Converteer", BTNGENER:"Genereer", BTNSRC:"Bron", BTNVIEW:"Voorbeeld", BTNSAVE:"Bewaar", BTNMARKS:"Gemarkeerd als gelezen", BTNMARKA:"Markeer alle als gelezen", MSGTITLE:"Converteer rappport", MSGQUEST:"Welke data wil je publiceren?", MSGALL:"Alle", MSGBBCODE:"Volgens de publicatie van het rapport, kun je het paren met nieuws en forums gebruikmakens van de BBCode.", 
  MSGRESOURCE:"Buit", MSGUNITS:"Eenheden", MSGBUILD:"Gebouwen", MSGUSC:"Gebruikt zilver", MSGRAW:"Grondstoffen", SUPPORT:"Ondersteuning", SPY:"Spionage", CONQUER:"Overwonnen", LOSSES:"Verliezen", HIDDEN:"Verborgen", NOTUNIT:"[i]Geen[/i]", TOWN:"[i]Stad:[/i] ", PLAYER:"[i]Speler:[/i] ", ALLY:"[i]Allie:[/i] ", CAST:"gunst:", ONTOWER:"Op de stad:", MSGHIDAD:"Verberg steden", MSGFORUM:"Het rapport wordt gepubliceerd", BBALLY:"alliantie forums / in het bericht", BBFORUM:"externe forum", ERRGETSRC:"Een fout is opgetreden! AUB, genereer de bron en verstuur als bijlage aan potusek@westtax.info", 
  ICOCLOSE:"Sluiten", ICOHELP:"Over de converteerder", MSGPREVIEW:"<b>Rapport voorbeeld</b>", HELPTAB1:"Over", HELPTAB2:"Hoe werkt het", HELPTAB3:"Veranderingen", HELPTAB4:"Configuratie", HLPVERSION:"Versie", HLPFIXED:"Fixed", HLPADDED:"Toegevoegd", MSGHUMAN:{OK:"De informatie is opgeslagen", ERROR:"En fout is tijdens het schrijven opgestreden"}, STATS:"Speler statistieken", STATSPOINT:"Punten", STATSRANK:"Rang", LABELS:{attack:{ATTACKER:"Aanvaller", DEFENDER:"Verdediger", MSGHIDAT:"aanvaller", MSGHIDDE:"verdediger", 
  MSGATTUNIT:"Aanvallend Leger", MSGDEFUNIT:"Verdedigend Leger"}, support:{ATTACKER:"Ondersteuner", DEFENDER:"Ondersteunde", MSGHIDAT:"ondersteuning", MSGHIDDE:"ondersteund", MSGATTUNIT:"Ondersteunend Leger", MSGDEFUNIT:"Verdeigend Leger"}, espionage:{ATTACKER:"Spion", DEFENDER:"Bespioneerde", MSGHIDAT:"spion", MSGHIDDE:"bespioneerde", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"commando details", MSGRETURN:"(enter)", MSGCLAIM:"city ??claims", MSGCLAIMPPUP:"Genereer claim", MSGGENBBCODE:"Genereer een lijst in BBCode", 
  MSGDEFSITE:"Verslagen...", MSGLOSSITE:"Verliezen...", MSGASATT:"...als een aanvaller", MSGASDEF:"...als een verdediger", MSGDIFF1:"laat niet de verschillen zien", MSGDIFF2:"laat verschillen zien", MSGDIFF3:"laat enkel de verschillen zien", BBCODELIMIT:"Vanwege gelimiteerde hoeveelheid tekst in een bericht, in het geval van een lange lijst, de data is onderverdeeld in groepen. Elke groep in een apart bericht plakken.", CHKPOWERNAME:"Toon de tijd tot mogelijk gebruik van de gunst", CHKNIGHTNAME:"Verduisterd de stad tijdens nacht bonus", 
  CHKFORUMTABS:"Vervang scrollen van de forum tabs in meerdere regels", BTNRESERVE:"Claim", LNKRESERVE:"Claims", LBLGETRESER:"Data ophalen...", BTNCHECK:"Controle Claims", CHKCMDIMG:"View the icons for the destination city commands", STATSLINK:"Statistieken van de display", BTNSUPPLAYERS:"Lijst met spelers", CHKUNITSCOST:"Het rapport de kosten van de verloren eenheden laten tonen", CHKOCEANNUMBER:"Oceaannummers laten zien", MSGRTLBL:"Opstandsinformatie", MSGRTSHOW:"Voeg bezigzijnde opstandsinformatie toe", 
  MSGRTONLINE:"Ben je online tijdens fase rood?", MSGRTYES:"Ja", MSGRTNO:"Nee", MSGRTCSTIME:"Koloschip vaartijd", MSGRTERR:"Je kijkt naar de verkeerde stad!<br/>Om de opstandsinformatie te maken, ga dan naar de stad: ", BBTEXT:"Tekst versie", BBHTML:"Tabel versie", MSG413ERR:"<h3>Het gegenereerde rapport is te groot</h3><p>Gebruik de aanwezige mogelijkheden en reduceer het om publiceerproblemen te voorkomen</p>", CHKREPORTFORMAT:"Genereer rapporten door middel van tabellen", WALLNOTSAVED:"De muur is niet opgeslagen", 
  WALLSAVED:"De muur is opgeslagen", POPSELRECRUNIT:"Klik, om de standaard productie-eenheid te selecteren", POPRECRUNITTRADE:"Klik, om de grondstoffen benodig voor de geselecteerde eenheid in te vullen", POPINSERTLASTREPORT:"Post het laatst geconverteerde rapport", MSGCOPYREPORT:"Het rapport is  opgeslagen. Klik op[paste_icon]op de fora of een nieuw berichtscherm om het te posten", POPDISABLEALARM:"Schakel het alarm uit", SOUNDSETTINGS:"Geluid instellingen", CHKSOUNDMUTE:"Geluid uit", POPSOUNDLOOP:"In loop afspelen", 
  POPSOUNDMUTE:"Het geluid uitzetten", POPSOUNDPLAY:"Speel af met deze instellingen", POPSOUNDSTOP:"Stop afspelen", POPSOUNDURL:"Url naar het bestand van het geluid", ABH:{WND:{WINDOWTITLE:"Legeraanbouw helper", UNITFRAME:"Kies je eenheid", DESCRIPTION1:"In deze stad heb je [population] vrije inwoners", DESCRIPTION2:"Wat genoeg is om  [max_units] te bouwen", DESCRIPTION3:"Je hebt [yesno] [research] onderzocht", DESCRIPTION4:"Je kan in de wachtrij[max_queue] eenheden zetten", TARGET:"Kies je bouwdoel", 
  PACKAGE:"Grondstoffen per lading (units)", BTNSAVE:"Slaat isntellingen op", TOOLTIPOK:"klik, om de standaard eenheid in te stellen waarvoor je grondstoffen zult zenden", TOOLTIPNOTOK:"Eenheid is nog niet onderzocht", SETTINGSAVED:"Instelling voor [city] zijn opgeslagen", HASRESEARCH:"DOE", NORESEARCH:"DOE NIET"}, RESWND:{RESLEFT:"Grondstoffen nog te sturen", IMGTOOLTIP:"klik, om de grondstoffen in te vullen"}}, NEWVERSION:{AVAILABLE:"Er is een nieuwe versie beschikbaar", INSTALL:"Installeer ", 
  REMINDER:"Herinner mij later", REQRELOAD:"Het is nodig om de site opnieuw te laden", RELOAD:"Opnieuw laden"}, LANGS:{LANG:"Vertaling voor taal:", SEND:"Verzonden naar publicatie", SAVE:"Opslaan en testen", RESET:"Herstel de standaardtaal", REMOVE:"Verwijder je vertaling?"}, HELPTAB5:"Vertaling", COMMAND:{ALL:"Allen", INCOMING:"inkomend", OUTGOING:"uitgaand", RETURNING:"terugkomend", FORTOWN:"stad:"}};
  this.pl = {AUTHOR:"Potusek", BTNCONV:"Konwertuj", BTNGENER:"Generuj", BTNSRC:"\u0179r\u00f3d\u0142o", BTNVIEW:"Podgl\u0105d", BTNSAVE:"Zapisz", BTNMARKS:"Oznacz jako przeczytane", BTNMARKA:"Oznacz wszystkie jako przeczytane", MSGTITLE:"Opcje konwersji", MSGQUEST:"Kt\u00f3re z danych chcesz opublikowa\u0107?", MSGALL:"Wszystkie", MSGBBCODE:"Po opublikowaniu raportu, mo\u017cesz powi\u0105za\u0107 go z wiadomo\u015bciami lub forum korzystaj\u0105c z BBCode.", MSGRESOURCE:"\u0141up", MSGUNITS:"Jednostki", 
  MSGBUILD:"Budynki", MSGUSC:"Wykorzystane srebrne monety", MSGRAW:"Surowce", MSGSHOWCOST:"Koszty utraconych jednostek", SUPPORT:"Wspiera", SPY:"Szpieguje", CONQUER:"Podbi\u0142", LOSSES:"Straty", HIDDEN:"Ukryte", NOTUNIT:"[i]Brak[/i]", TOWN:"[i]Miasto:[/i] ", PLAYER:"[i]Gracz:[/i] ", ALLY:"[i]Sojusz:[/i] ", CAST:"rzuci\u0142:", ONTOWER:"Na miasto:", MSGHIDAD:"Ukrywanie miasta", MSGFORUM:"Raport b\u0119dzie publikowany", BBALLY:"forum sojuszu / w wiadomo\u015bci", BBFORUM:"forum zewn\u0119trzne", 
  ERRGETSRC:"Wyst\u0105pi\u0142 b\u0142\u0105d! Prosz\u0119 wygenerowa\u0107 \u017ar\u00f3d\u0142o i wys\u0142a\u0107 jako za\u0142\u0105cznik na adres potusek@westtax.info", ICOCLOSE:"Zamknij", ICOHELP:"O konwerterze", MSGPREVIEW:"<b>Podgl\u0105d raportu</b>", HELPTAB1:"O konwerterze", HELPTAB2:"Jak to dzia\u0142a", HELPTAB3:"Zmiany", HELPTAB4:"Ustawienia", HLPVERSION:"Wersja", HLPFIXED:"Poprawiono", HLPADDED:"Dodano", MSGHUMAN:{OK:"Informacje zosta\u0142y zapisane", ERROR:"Wyst\u0105pi\u0142 b\u0142\u0105d podczas zapisu", 
  YOUTUBEERROR:"Niepoprawny link lub niedozwolone odtwarzanie poza youtube"}, STATSPOINT:"Punkty", STATSRANK:"Ranking", LABELS:{attack:{ATTACKER:"Agresor", DEFENDER:"Obro\u0144ca", MSGHIDAT:"atakuj\u0105cego", MSGHIDDE:"obro\u0144cy", MSGATTUNIT:"Wojska atakuj\u0105cego", MSGDEFUNIT:"Wojska obro\u0144cy"}, support:{ATTACKER:"Wspieraj\u0105cy", DEFENDER:"Wspierany", MSGHIDAT:"wspieraj\u0105cego", MSGHIDDE:"wspieranego", MSGATTUNIT:"Wojska wspieraj\u0105cego", MSGDEFUNIT:"Wojska obro\u0144cy"}, espionage:{ATTACKER:"Szpieguj\u0105cy", 
  DEFENDER:"Szpiegowany", MSGHIDAT:"szpieguj\u0105cego", MSGHIDDE:"szpiegowanego", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"szczeg\u00f3\u0142y polecenia", MSGRETURN:"(powr\u00f3t)", MSGCLAIM:"rezerwuje miasto", MSGCLAIMPPUP:"Generuj rezerwacj\u0119", MSGGENBBCODE:"Generuj list\u0119 w BBCode", MSGDEFSITE:"Pokonane...", MSGLOSSITE:"Stracone...", MSGASATT:"...w roli atakuj\u0105cego", MSGASDEF:"...w roli obro\u0144cy", MSGDIFF1:"nie pokazuj r\u00f3\u017cnic", MSGDIFF2:"poka\u017c r\u00f3\u017cnice", 
  MSGDIFF3:"poka\u017c tylko r\u00f3\u017cnice", BBCODELIMIT:"W zwi\u0105zku z ograniczeniem ilo\u015bci tekstu w jednym po\u015bcie, w przypadku d\u0142ugiej listy, dane zosta\u0142y podzielone na grupy. Ka\u017cd\u0105 grup\u0119 wklejaj jako osobny wpis.", CHKPOWERNAME:"Wy\u015bwietlaj czas, jaki pozosta\u0142 do mo\u017cliwo\u015bci u\u017cycia czaru", CHKNIGHTNAME:"Zaciemniaj polis w bonusie nocnym", CHKFORUMTABS:"Zamie\u0144 przewijane zak\u0142adki na forum, na wieloliniowe", BTNRESERVE:"Rezerwacja", 
  LNKRESERVE:"Rezerwacje", LBLGETRESER:"Pobieranie danych ...", BTNCHECK:"Sprawdzenie rezerwacji", CHKCMDIMG:"Poka\u017c ikony rozkaz\u00f3w przy docelowym mie\u015bcie", STATSLINK:"Statystyki wy\u015bwietlaj ze strony", BTNSUPPLAYERS:"Lista graczy", CHKUNITSCOST:"Na raporcie pokazuj koszt straconych jednostek", CHKOCEANNUMBER:"Wy\u015bwietlaj numery m\u00f3rz", MSGRTLBL:"Informacja o buncie", MSGRTSHOW:"Do\u0142\u0105cz do raportu informacje o buncie", MSGRTONLINE:"Czy b\u0119dziesz online podczas buntu?", 
  MSGRTYES:"Tak", MSGRTNO:"Nie", MSGRTGOD:"B\u00f3g", MSGRTCSTIME:"CK", MSGRTONL:"online?", MSGRTERR:"Znajdujesz si\u0119 w niew\u0142a\u015bciwym mie\u015bcie!<br/>Aby wygenerowa\u0107 informacje o buncie, przejd\u017a do miasta: ", BBTEXT:"wersja tekstowa", BBHTML:"wersja oparta na tabelach", BBIMG:"jako pojedynczy obraz", MSG413ERR:"<h3>Je\u017celi przez d\u0142u\u017csz\u0105 chwil\u0119 widzisz ten napis, w\u00f3wczas wygenerowany raport jest zbyt obszerny.</h3><p>U\u017cyj dost\u0119pnych opcji redukuj\u0105c ilo\u015b\u0107 publikowanych danych.</p>", 
  CHKREPORTFORMAT:"Generowanie raport\u00f3w w oparciu o tabele", WALLNOTSAVED:"Mur nie zosta\u0142 zapisany", WALLSAVED:"Mur jest zapisany", POPSELRECRUNIT:"kliknij, aby wybra\u0107 domy\u015bln\u0105 jednostk\u0119 do produkcji", POPRECRUNITTRADE:"kliknij, \u017ceby zape\u0142ni\u0107 handlarza surowcami dla wybranej jednostki", POPINSERTLASTREPORT:"Wstaw ostatni wynik konwersji", MSGCOPYREPORT:"Wynik konwersji zosta\u0142 zapisany. Prosz\u0119 klikn\u0105\u0107 [paste_icon] na forum lub w wiadomo\u015bci, aby wstawi\u0107", 
  POPDISABLEALARM:"Wy\u0142\u0105cz alarm", SOUNDSETTINGS:"Ustawienia d\u017awi\u0119ku", CHKSOUNDMUTE:"Wycisz", SOUNDVOLUME:"G\u0142o\u015bno\u015b\u0107", SOUNDURL:"\u015acie\u017cka do pliku", CHKSOUNDLOOP:"loop", POPSOUNDLOOP:"odtwarzaj w p\u0119tli", POPSOUNDMUTE:"Wycisz d\u017awi\u0119k", POPSOUNDPLAY:"Odtw\u00f3rz z bie\u017c\u0105cymi ustawieniami", POPSOUNDSTOP:"Przerwij odtwarzanie", POPSOUNDURL:"\u015acie\u017cka do pliku z d\u017awi\u0119kiem", POPSOUNDEG:"np: https://www.youtube.com/watch?v=v2AC41dglnM, https://youtu.be/v2AC41dglnM, http://www.freesfx.co.uk/rx2/mp3s/10/11532_1406234695.mp3", 
  STATS:{PLAYER:"Statystyki gracza", ALLY:"Statystyki sojuszu", TOWN:"Statystyki miasta", INACTIVE:"Nieaktywny", CHKINACTIVE:"Poka\u017c nieaktywno\u015b\u0107 graczy", INACTIVEDESC:"W tym czasie nie odnotowano punkt\u00f3w walki jak i rozbudowy"}, ABH:{WND:{WINDOWTITLE:"Army Builder Helper", UNITFRAME:"Wybierz domy\u015bln\u0105 jednostk\u0119", DESCRIPTION1:"W obecnym mie\u015bcie masz [population] wolnych mieszka\u0144c\u00f3w", DESCRIPTION2:"Co wystarczy do zbudowania: [max_units]", DESCRIPTION3:"[yesno] badanie [research]", 
  DESCRIPTION4:"Mo\u017cesz zakolejkowa\u0107 max [max_queue] jednostek", TARGET:"wybierz ile zbudowa\u0107", PACKAGE:"na ile jednostek domy\u015blnie wysy\u0142a\u0107", BTNSAVE:"zapisz ustawienia", TOOLTIPOK:"kliknij, aby wybra\u0107 jednostk\u0119 dla kt\u00f3rej chcesz domy\u015blnie wysy\u0142a\u0107 surowce", TOOLTIPNOTOK:"jednostka nie zosta\u0142a zbadana", HASRESEARCH:"MASZ", NORESEARCH:"NIE MASZ", SETTINGSAVED:"Ustawienia dla miasta [city] zosta\u0142y zapisane"}, RESWND:{RESLEFT:"pozosta\u0142o do wys\u0142ania", 
  IMGTOOLTIP:"kliknij, \u017ceby wype\u0142ni\u0107 pola surowc\u00f3w"}}, NEWVERSION:{AVAILABLE:"Dost\u0119pna nowa wersja", INSTALL:"Zainstaluj", REMINDER:"Przypomnij p\u00f3\u017aniej", REQRELOAD:"Wymagane od\u015bwie\u017cenie strony", RELOAD:"Od\u015bwie\u017c"}, HELPTAB5:"T\u0142umaczenie", LANGS:{REMOVE:"Skasowa\u0107 Twoje t\u0142umaczenie?", RESET:"Przywr\u00f3\u0107 domy\u015blny j\u0119zyk", SAVE:"Zapisz i testuj", SEND:"Wy\u015blij do publikacji", LANG:"T\u0142umaczenie dla j\u0119zyka:"}, 
  BTNSIMUL:"Symulator", EMOTS:{LABEL:"Chcesz wi\u0119cej emotek?", MESS:"Wklej linki do obrazk\u00f3w, ka\u017cdy w nowej linii"}, COMMAND:{ALL:"Wszystkie", INCOMING:"nadchodz\u0105ce", OUTGOING:"wychodz\u0105ce", RETURNING:"powracaj\u0105ce", FORTOWN:"miasto:"}, RADAR:{TOWNFINDER:"Wyszukiwanie miast", FIND:"Szukane", MAXCSTIME:"Maksymalny czas statku kolonizacyjnego", BTNFIND:"Szukaj", TOWNNAME:"Miasto", CSTIME:"Czas", TOWNOWNER:"W\u0142a\u015bciciel", TOWNRESERVED:"Rezerwacja", TOWNPOINTS:"Minimalne punkty miasta", 
  BTNSAVEDEFAULT:"Zapisz warto\u015bci jako domy\u015blne", ALL:"Dowolne miasto"}, WALL:{LISTSAVED:"Zapis muru na dzie\u0144", LISTSTATE:"Stan muru na dzie\u0144", DELETECURRENT:"Usu\u0144 bie\u017c\u0105cy zapis", WANTDELETECURRENT:"Czy chcesz usun\u0105\u0107 bie\u017c\u0105cy zapis muru?"}, QUESTION:"Pytanie", TSL:{WND:{WINDOWTITLE:"Towns Sorted List", TOOLTIP:"poka\u017c posortowane miasta"}}, CHKOLDTRADE:"U\u017cywaj starego uk\u0142adu handlu", AO:{TITLE:"Academy Overview"}, MOBILEVERSION:"Wersja mobilna", 
  CHKWONDERTRADE:"Wysy\u0142aj\u0105c surowce na cud wstawiaj maksymalne r\u00f3wne warto\u015bci"};
  this.pt = {AUTHOR:"100 no\u00e7\u00e3o, Cirrus Minor", BTNCONV:"Converter", BTNGENER:"Gerar", BTNVIEW:"Visualizar", BTNSAVE:"Salvar", MSGTITLE:"Converter Relat\u00f3rio", MSGQUEST:"Quais dados voc\u00ea deseja publicar ?", MSGBBCODE:"Uma vez o relat\u00f3rio publicado, pode partilh\u00e1-lo em not\u00edcias e f\u00f3runs usando BBCode.", MSGRESOURCE:"Saque", MSGUNITS:"Unidades", MSGBUILD:"Edif\u00edcios", MSGUSC:"Moedas de prata usadas", MSGRAW:"Recursos da Cidade", SUPPORT:"Suporte", SPY:"Espionagem", 
  CONQUER:"Conquistas", LOSSES:"Perdas", HIDDEN:"Omitido", NOTUNIT:"[i]Nenhum[/i]", TOWN:"[i]Cidade:[/i] ", PLAYER:"[i]Jogador:[/i] ", ALLY:"[i]Alian\u00e7a:[/i] ", CAST:"Lan\u00e7ar:", ONTOWER:"Na Cidade:", MSGHIDAD:"Esconder cidades", MSGFORUM:"O relat\u00f3rio ser\u00e1 publicado", BBALLY:"F\u00f3runs da alian\u00e7a / na mensagem", BBFORUM:"F\u00f3rum Externo", ICOCLOSE:"Fechar", ICOHELP:"Sobre o conversor", MSGPREVIEW:"<b>Pr\u00e9 visualiza\u00e7\u00e3o do Relat\u00f3rio</b>", HELPTAB1:"Sobre", 
  HELPTAB2:"Como funciona", HELPTAB3:"Mudan\u00e7as", HELPTAB4:"Configura\u00e7\u00f5es", MSGHUMAN:{OK:"Informa\u00e7\u00e3o salva com sucesso", ERROR:"Ocorreu um erro ao salvar"}, LABELS:{attack:{ATTACKER:"Atacante", DEFENDER:"Defensor", MSGHIDAT:"Atacante", MSGHIDDE:"defensor", MSGATTUNIT:"Unidades de Ataque", MSGDEFUNIT:"Unidades de Defesa"}, support:{ATTACKER:"Apoiando", DEFENDER:"Apoiado", MSGHIDAT:"Apoiando", MSGHIDDE:"Apoiado", MSGATTUNIT:"Unidades apoiando", MSGDEFUNIT:"Unidades Defendendo"}, 
  espionage:{ATTACKER:"Espi\u00e3o", DEFENDER:"Espiado", MSGHIDAT:"Espi\u00e3o", MSGHIDDE:"Espiado", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"Detalhes do Comando", MSGRETURN:"(retornar)", MSGGENBBCODE:"Gerar lista de BBcode", MSGDEFSITE:"Derrotado...", MSGLOSSITE:"Perdas...", MSGASATT:"...Como atacante", MSGASDEF:"...Como defensor", MSGDIFF1:"N\u00e3o mostrar diferen\u00e7as", MSGDIFF2:"Mostrar diferen\u00e7as", MSGDIFF3:"Mostrar apenas as diferen\u00e7as", BBCODELIMIT:"Tendo em vista um n\u00famero limitado de caracteres em um post, no caso de uma lista longa, os dados ser\u00e3o divididos em grupos, cada grupo postado separadamente.", 
  CHKPOWERNAME:"Tempo restante para poder usar o encantamento", CHKFORUMTABS:"Substituir guias de rolagem do f\u00f3rum para uma guia paralela", STATSLINK:"Estat\u00edsticas no visor", BTNSUPPLAYERS:"Lista de jogadores", CHKUNITSCOST:"O Relat\u00f3rio mostra o custo das unidades perdidas", CHKOCEANNUMBER:"Exibir n\u00famero do oceano", MSGRTLBL:"Informa\u00e7\u00f5es sobre a revolta", MSGRTSHOW:"Adicionar informa\u00e7\u00e3o de revolta em curso", MSGRTONLINE:"Voc\u00ea estar\u00e1 online durante a m\u00e3o de fogo ?", 
  MSGRTYES:"Sim", MSGRTNO:"N\u00e3o", MSGRTGOD:"Bom", MSGRTCSTIME:"Tempo CS", MSGRTONL:"Conectado ?", MSGRTERR:"Voc\u00ea est\u00e1 na cidade errada!<br/>Para criar a informa\u00e7\u00e3o de revolta, por favor v\u00e1 para a cidade:", BBTEXT:"Vers\u00e3o em Texto", BBHTML:"Vers\u00e3o em Tabela", MSG413ERR:"<h3>O relat\u00f3rio gerado \u00e9 muito grande.</h3><p>Use as op\u00e7\u00f5es dispon\u00edveis para reduzir e publicar sem problemas.</p>", CHKREPORTFORMAT:"Gerar relat\u00f3rios usando Tabela", 
  WALLNOTSAVED:"Muralha n\u00e3o foi salva", WALLSAVED:"Muralha foi salva", POPSELRECRUNIT:"Clique, para selecionar a unidade de produ\u00e7\u00e3o padr\u00e3o", POPRECRUNITTRADE:"Clique, para preencher os recursos necess\u00e1rios para recrutar a unidade selecionada", POPINSERTLASTREPORT:"Colar o \u00faltimo relat\u00f3rio convertido", MSGCOPYREPORT:"O relat\u00f3rio foi salvo. Por favor, clique em [paste_icon] no f\u00f3rum ou em nova janela de mensagem para col\u00e1-lo", POPDISABLEALARM:"Desativar alarme", 
  SOUNDSETTINGS:"Configura\u00e7\u00f5es de som", CHKSOUNDMUTE:"Mudo", SOUNDVOLUME:"Volume", SOUNDURL:"Link de som", CHKSOUNDLOOP:"ciclo", POPSOUNDLOOP:"percorrer ciclo", POPSOUNDMUTE:"Cortar som", POPSOUNDPLAY:"Jogar com as configura\u00e7\u00f5es atuais", POPSOUNDSTOP:"Parar execu\u00e7\u00e3o", POPSOUNDURL:"Caminho de url para o arquivo com som", STATS:{PLAYER:"Status do Jogador", ALLY:"Status da Alian\u00e7a", TOWN:"Status da Cidade"}, ABH:{WND:{WINDOWTITLE:"Ajuda do Construtor de Ex\u00e9rcitos", 
  UNITFRAME:"Selecione sua unidade", DESCRIPTION1:"Nessa cidade, voc\u00ea tem [population] popula\u00e7\u00e3o livre", DESCRIPTION2:"Qual \u00e9 o suficiente para construir [max_units]", DESCRIPTION3:"Voc\u00ea [yesno] Tem [research] Pesquisado.", DESCRIPTION4:"Voc\u00ea pode enfileirar um m\u00e1ximo de [max_queue] unidades", TARGET:"Selecione sua cidade alvo", PACKAGE:"Pacote de Recursos por vez (units)", BTNSAVE:"Salvar configura\u00e7\u00f5es", TOOLTIPOK:"Clique para selecionar a unidade padr\u00e3o a qual voc\u00ea estar\u00e1 enviando recursos", 
  TOOLTIPNOTOK:"A unidade n\u00e3o foi pesquisada", HASRESEARCH:"Fazer", NORESEARCH:"N\u00e3o fazer", SETTINGSAVED:"Configura\u00e7\u00f5es de [city] Foram salvas"}, RESWND:{RESLEFT:"Recursos excedentes para envio", IMGTOOLTIP:"Clique, para preencher os recursos"}}, NEWVERSION:{AVAILABLE:"Nova vers\u00e3o dispon\u00edvel", INSTALL:"Instalar", REMINDER:"Lembrar mais tarde", REQRELOAD:"Atualiza\u00e7\u00e3o requerida", RELOAD:"Atualizar"}, LANGS:{LANG:"Traduzido para o idioma:", SEND:"Enviar para publica\u00e7\u00e3o", 
  SAVE:"Salvar e testar", RESET:"Restaurar idioma padr\u00e3o", REMOVE:"Excluir sua tradu\u00e7\u00e3o ?"}, HELPTAB5:"Tradu\u00e7\u00e3o", BTNSIMUL:"Simulador", EMOTS:{LABEL:"Quer mais emoctions ?", MESS:"Cole links para emoction, cada um em uma nova linha"}, COMMAND:{ALL:"Todos", INCOMING:"A chegar", OUTGOING:"A partir", RETURNING:"A regressar", FORTOWN:"cidade:"}};
  this.ro = {INFO:{0:"Potusek", 1:"grepolis@potusek.eu"}, WEBSITE:"Website", AUTHOR:"Autor, Sir Prize, magicianul2006", BTNCONV:"Converteste", BTNGENER:"Genereaza", BTNSRC:"Sursa", BTNVIEW:"Previzualizare", BTNSAVE:"Salveaza", BTNMARKS:"Marcheaza ca citit", BTNMARKA:"Marcheaza tot ca citit", MSGTITLE:"Converteste Raportul", MSGQUEST:"Ce informatii din data vrei sa publici?", MSGALL:"Tot", MSGBBCODE:"Urmarind publicarea raportului, puteti sa il asociati cu noutati si forumuri folosind BBCode.", MSGRESOURCE:"Prada", 
  MSGUNITS:"Solda\u021bi", MSGBUILD:"Cladiri", MSGUSC:"Monede de argint utilizate", MSGRAW:"Materii prime", SUPPORT:"Sprijin", SPY:"Spionat", CONQUER:"Cucerit", LOSSES:"Pierderi", HIDDEN:"Ascunde", NOTUNIT:"[i]Nimic[/i]", TOWN:"[i]Ora\u0219:[/i] ", PLAYER:"[i]Juc\u0103tor:[/i] ", ALLY:"[i]Alian\u021b\u0103:[/i] ", CAST:"Folosire:", ONTOWER:"\u00cen ora\u0219:", MSGHIDAD:"Ascunde ora\u0219", MSGFORUM:"Raportul va fi publicat", BBALLY:"forumurile alian\u021bei / \u00een mesaje", BBFORUM:"forum extern", 
  ERRGETSRC:"O eroare a avut loc! Va rugam, trimiteti sursa ca o atasare la potusek@westtax.info", ICOCLOSE:"\u00cenchide", ICOHELP:"Despre convertor", MSGPREVIEW:"<b>Previzualizare raport</b>", HELPTAB1:"Despre", HELPTAB2:"Cum func\u021bioneaz\u0103", HELPTAB3:"Schimb\u0103ri", HELPTAB4:"Set\u0103ri", HLPVERSION:"Versiune", HLPFIXED:"Fixat", HLPADDED:"Adaugat", MSGHUMAN:{OK:"Informatiile au fost salvate", ERROR:"O eroare a avut loc in timpul tiparirii"}, STATS:"Statisticile jucatorului", STATSPOINT:"Puncte", 
  STATSRANK:"Rang", LABELS:{attack:{ATTACKER:"Atacator", DEFENDER:"Aparator", MSGHIDAT:"atacator", MSGHIDDE:"aparator", MSGATTUNIT:"Armata atacatoare", MSGDEFUNIT:"Armata defensiva"}, support:{ATTACKER:"Sprijin", DEFENDER:"Sprijinit", MSGHIDAT:"sprijin", MSGHIDDE:"sprijinit", MSGATTUNIT:"Armata sprijin", MSGDEFUNIT:"Armata aparatori"}, espionage:{ATTACKER:"Spion", DEFENDER:"Spionat", MSGHIDAT:"spion", MSGHIDDE:"spionat", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"deatalii comanda", MSGRETURN:"(inapoi)", 
  MSGCLAIM:"oras \u200b\u200brezervare", MSGCLAIMPPUP:"Genereaza rezervare", MSGGENBBCODE:"Genereaz\u0103 o list\u0103 de BBCode", MSGDEFSITE:"Infrant...", MSGLOSSITE:"Pierderi...", MSGASATT:"...ca atacator", MSGASDEF:"...ca ap\u0103r\u0103tor", MSGDIFF1:"nu arat\u0103 diferen\u021bele", MSGDIFF2:"arat\u0103 diferen\u021bele", MSGDIFF3:"arat\u0103 doar diferen\u021bele", BBCODELIMIT:"Din cauza spa\u021biului limitat pentru text \u00eentr-o postare, \u00een cazul unei liste lungi, informa\u021bia a fost impar\u021bit\u0103 pe grupe. Fiecare grup\u0103 este separat\u0103.", 
  CHKPOWERNAME:"Arat\u0103 timpul r\u0103mas p\u00e2n\u0103 la folosirea vr\u0103jii", CHKNIGHTNAME:"Ascunde orasul in bonusul de noapte", CHKFORUMTABS:"Aranjeaz\u0103 tab-urile de pe forum pe mai multe r\u00e2nduri", BTNRESERVE:"Booking", LNKRESERVE:"Reservations", LBLGETRESER:"No\u0163iuni de baz\u0103 de date ...", BTNCHECK:"Checking reservations", CHKCMDIMG:"View the icons for the destination city commands", STATSLINK:"Statistici de afi\u0219at", BTNSUPPLAYERS:"Lista juc\u0103torilor", CHKUNITSCOST:"Afi\u0219area costurilor unit\u0103\u021bilor pierdute \u00een raport", 
  CHKOCEANNUMBER:"Arat\u0103 num\u0103rul m\u0103rii", MSGRTCSTIME:"Timp Nava Colonizare", MSGRTGOD:"Zeu", MSGRTNO:"Nu", MSGRTYES:"Da", MSGRTONLINE:"Vei fi online in timpul revoltei rosii? ", MSGRTSHOW:"Adauga informatii despre revolta in curs de desfasurare", MSGRTLBL:"Informa\u021bia despre revolt\u0103", MSGRTERR:"E\u0219ti \u00een orasul gre\u0219it!<br/>Pentru a crea informa\u021bia pentru revolt\u0103, mergi te rog la ora\u0219ul: ", BBHTML:"versiunea tabelat\u0103", BBTEXT:"versiunea text", 
  MSG413ERR:"<h3>Raportul generat este prea mare.</h3><p>Folose\u0219te op\u021biunile valabile \u0219i reduse pentru a publica f\u0103r\u0103 probleme.</p>", CHKREPORTFORMAT:"Genereaz\u0103 rapoarte folosind tabele", WALLNOTSAVED:"Zidul nu a fost salvat", WALLSAVED:"Zidul a fost salvat", POPRECRUNITTRADE:"click, ca s\u0103 folose\u0219ti resursele necesare pentru recrutarea unit\u0103\u021bii selectate", ABH:{WND:{WINDOWTITLE:"GRCRTools Ajutor Creator Armata", UNITFRAME:"alege-ti unitatea", DESCRIPTION1:"In acest oras ai [population] populatie libera", 
  DESCRIPTION2:"Care este suficienta pentru a construi [max_units]", DESCRIPTION3:"Tu [yesno] ai cercetat [research].", DESCRIPTION4:"Poti sa adaugi in coada [max_queue] unitati", TARGET:"alege constructia", PACKAGE:"pachet de resurse pe expediere", BTNSAVE:"salveaza setarile", TOOLTIPOK:"click pentru a seta o unitate prestabilita pentru care vei trimite resurse", TOOLTIPNOTOK:"unitatile nu au fost cercetate", HASRESEARCH:"Fa", NORESEARCH:"Nu face", SETTINGSAVED:"Setarile pentru [city] au fost salvate"}, 
  RESWND:{RESLEFT:"resurse ramase pentru trimitere", IMGTOOLTIP:"click pentru a completa cu resurse"}}, POPSOUNDURL:"Calea url a fi\u0219ierului cu sunet", POPSOUNDSTOP:"Nu asculta", POPSOUNDPLAY:"Ascult\u0103 cu set\u0103rile curente", POPSOUNDMUTE:"\u00cenchide sunetul", POPSOUNDLOOP:"Ascult\u0103 \u00een bucl\u0103", CHKSOUNDLOOP:"bucl\u0103", SOUNDVOLUME:"Volum", SOUNDURL:"Sunetul fi\u0219ierului url", CHKSOUNDMUTE:"Mut", SOUNDSETTINGS:"Set\u0103ri pentru sunet", POPDISABLEALARM:"Dezactiveaz\u0103 alarma", 
  MSGCOPYREPORT:"Raportul a fost salvat. Te rog d\u0103 click [lipire_icon] pe forumuri sau pe noile mesaje din fereastra pentru lipire", POPINSERTLASTREPORT:"Lipe\u0219te ultimul raport convertit", NEWVERSION:{AVAILABLE:"O noua versiune este disponibila", INSTALL:"Instaleaza", REMINDER:"Adu-mi aminte mai tarziu", REQRELOAD:"Reimprospatare nececsara", RELOAD:"Reimprospateaza"}, LANGS:{LANG:"Traducere limba:", SEND:"Trimite catre editori", SAVE:"Salveaza si testeaza", RESET:"Seteaza limba prestabilita", 
  REMOVE:"Sterge traducerea"}, HELPTAB5:"Traducere", EMOTS:{LABEL:"Doresti mai multe emoticonuri?", MESS:"Lipeste link-ul catre emoticon, fiecare pe o noua linie"}, COMMAND:{ALL:"toate", INCOMING:"vine", OUTGOING:"pleaca", RETURNING:"se intoarce", FORTOWN:"oras:"}};
  this.ru = {AUTHOR:"Goland70, CTPEC", BTNCONV:"\u041a\u043e\u043d\u0432\u0435\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c", BTNGENER:"\u0413\u0435\u043d\u0435\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c", BTNVIEW:"\u041f\u0440\u0435\u0434\u043e\u0441\u043c\u043e\u0442\u0440", BTNSAVE:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c", MSGTITLE:"\u041f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u0442\u044c \u043e\u0442\u0447\u0435\u0442", MSGQUEST:"\u041a\u0430\u043a\u0438\u0435 \u0438\u0437 \u0434\u0430\u043d\u043d\u044b\u0445 \u0432\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u043e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u0442\u044c?", 
  MSGBBCODE:"\u041f\u043e\u0441\u043b\u0435 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0438 \u0434\u043e\u043a\u043b\u0430\u0434\u0430, \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0441\u0438\u043d\u0445\u0440\u043e\u043d\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0435\u0433\u043e \u0441 \u043d\u043e\u0432\u043e\u0441\u0442\u044f\u043c\u0438 \u0438 \u0444\u043e\u0440\u0443\u043c\u0430\u0445, \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044f BBCode.", MSGRESOURCE:"\u0414\u043e\u0431\u044b\u0447\u0430", 
  MSGUNITS:"\u0411\u043e\u0435\u0432\u044b\u0435 \u0435\u0434\u0438\u043d\u0438\u0446\u044b", MSGBUILD:"\u0417\u0434\u0430\u043d\u0438\u044f", MSGUSC:"\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u043e \u0441\u0435\u0440\u0435\u0431\u0440\u044f\u043d\u044b\u0445 \u043c\u043e\u043d\u0435\u0442", MSGRAW:"\u0421\u044b\u0440\u044c\u0435", SUPPORT:"\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430", SPY:"\u0428\u043f\u0438\u043e\u043d\u0430\u0436", CONQUER:"\u0437\u0430\u0432\u043e\u0435\u0432\u0430\u043d\u043d\u044b\u0439", 
  LOSSES:"\u041f\u043e\u0442\u0435\u0440\u0438", HIDDEN:"\u0421\u043a\u0440\u044b\u0442\u044b\u0439", NOTUNIT:"[i]\u041d\u0438 \u043e\u0434\u0438\u043d[/i]", TOWN:"[i]\u0413\u043e\u0440\u043e\u0434:[/i] ", PLAYER:"[i]\u0418\u0433\u0440\u043e\u043a:[/i] ", ALLY:"[i]\u0421\u043e\u044e\u0437\u043d\u0438\u043a:[/i] ", CAST:"\u0411\u0440\u043e\u0441\u043e\u043a:", ONTOWER:"\u0412 \u0433\u043e\u0440\u043e\u0434\u0435:", MSGHIDAD:"\u0421\u043a\u0440\u044b\u0442\u044c \u0433\u043e\u0440\u043e\u0434", MSGFORUM:"\u041e\u0442\u0447\u0451\u0442 \u0431\u0443\u0434\u0435\u0442 \u043e\u043f\u0443\u0431\u043b\u0438\u043a\u043e\u0432\u0430\u043d", 
  BBALLY:"\u0424\u043e\u0440\u0443\u043c\u044b \u0430\u043b\u044c\u044f\u043d\u0441\u0430 / \u0432 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0438", BBFORUM:"\u0432\u043d\u0435\u0448\u043d\u0438\u0439 \u0444\u043e\u0440\u0443\u043c", ICOCLOSE:"\u0417\u0430\u043a\u0440\u044b\u0442\u044c", ICOHELP:"\u041e \u043f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435", MSGPREVIEW:"<b>\u041e\u0442\u0447\u0451\u0442 \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440</b>", 
  HELPTAB1:"\u041e \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0438", HELPTAB2:"\u041a\u0430\u043a \u044d\u0442\u043e \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442", HELPTAB3:"\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f", HELPTAB4:"\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438", MSGHUMAN:{OK:"\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u0431\u044b\u043b\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0430", ERROR:"\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0437\u0430\u043f\u0438\u0441\u0438"}, 
  LABELS:{attack:{ATTACKER:"\u0410\u0442\u0430\u043a\u0430", DEFENDER:"\u041e\u0431\u043e\u0440\u043e\u043d\u0430", MSGHIDAT:"\u0430\u0442\u0430\u043a\u0430", MSGHIDDE:"\u043e\u0431\u043e\u0440\u043e\u043d\u0430", MSGATTUNIT:"\u0412\u043e\u0439\u0441\u043a\u0430 \u0430\u0442\u0430\u043a\u0430", MSGDEFUNIT:"\u0412\u043e\u0439\u0441\u043a\u0430 \u043e\u0431\u043e\u0440\u043e\u043d\u0430"}, support:{ATTACKER:"\u041f\u043e\u0434\u043a\u0440\u0435\u043f\u043b\u0435\u043d\u0438\u0435", DEFENDER:"\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u043d\u043d\u044b\u0439", 
  MSGHIDAT:"\u043f\u043e\u0434\u043a\u0440\u0435\u043f\u043b\u0435\u043d\u0438\u0435", MSGHIDDE:"\u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0430\u043d\u043d\u044b\u0439", MSGATTUNIT:"\u0412\u043e\u0439\u0441\u043a\u0430 \u043f\u043e\u0434\u043a\u0435\u043f\u043b\u0435\u043d\u0438\u0435", MSGDEFUNIT:"\u0412\u043e\u0439\u0441\u043a\u0430 \u043e\u0431\u043e\u0440\u043e\u043d\u0430"}, espionage:{ATTACKER:"\u0428\u043f\u0438\u043e\u043d", DEFENDER:"\u0428\u043f\u0438\u043e\u043d\u044f\u0449\u0438\u0439", 
  MSGHIDAT:"\u0448\u043f\u0438\u043e\u043d", MSGHIDDE:"\u0448\u043f\u0438\u043e\u043d\u044f\u0449\u0438\u0439", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"\u043f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435 \u043a\u043e\u043c\u0430\u043d\u0434\u0430", MSGRETURN:"(\u041e\u0431\u0440\u0430\u0442\u043d\u043e)", MSGGENBBCODE:"\u041f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u0442\u044c BBCode", MSGDEFSITE:"\u041e\u0431\u043e\u0440\u043e\u043d\u0430...", MSGLOSSITE:"\u041f\u043e\u0442\u0435\u0440\u0438...", 
  MSGASATT:"...\u0432 \u043d\u0430\u043f\u0430\u0434\u0435\u043d\u0438\u0438", MSGASDEF:"...\u0432 \u043e\u0431\u043e\u0440\u043e\u043d\u0435", MSGDIFF1:"\u043d\u0435 \u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u0440\u0430\u0437\u043b\u0438\u0447\u0438\u044f", MSGDIFF2:"\u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u0440\u0430\u0437\u043b\u0438\u0447\u0438\u044f", MSGDIFF3:"\u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u0442\u043e\u043b\u044c\u043a\u043e \u0440\u0430\u0437\u043b\u0438\u0447\u0438\u044f", 
  BBCODELIMIT:"\u0412\u0432\u0438\u0434\u0443 \u043e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u043d\u043e\u0433\u043e \u043e\u0431\u044a\u0435\u043c\u0430 \u0442\u0435\u043a\u0441\u0442\u0430 \u0432 \u043e\u0434\u0438\u043d \u043f\u043e\u0441\u0442, \u0432 \u0441\u043b\u0443\u0447\u0430\u0435 \u0434\u043b\u0438\u043d\u043d\u043e\u0433\u043e \u0441\u043f\u0438\u0441\u043a\u0430, \u0434\u0430\u043d\u043d\u044b\u0435 \u0431\u044b\u043b\u0438 \u0440\u0430\u0437\u0434\u0435\u043b\u0435\u043d\u044b \u043d\u0430 \u0433\u0440\u0443\u043f\u043f\u044b. \u041a\u0430\u0436\u0434\u0430\u044f \u0433\u0440\u0443\u043f\u043f\u0430 \u0432\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u043a\u0430\u043a \u043e\u0442\u0434\u0435\u043b\u044c\u043d\u044b\u0439 \u044d\u043b\u0435\u043c\u0435\u043d\u0442.", 
  CHKPOWERNAME:"\u041f\u043e\u043a\u0430\u0437 \u0432\u0440\u0435\u043c\u0435\u043d\u0438, \u043e\u0441\u0442\u0430\u0432\u0448\u0435\u0435\u0441\u044f \u0434\u043e \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u0438 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u044f \u0437\u0430\u043a\u043b\u0438\u043d\u0430\u043d\u0438\u044f", CHKFORUMTABS:"\u0417\u0430\u043c\u0435\u043d\u0438\u0442\u044c \u043f\u0440\u043e\u043a\u0440\u0443\u0447\u0438\u0432\u0430\u043d\u0438\u0435 \u0442\u0435\u043c \u043d\u0430 \u0444\u043e\u0440\u0443\u043c\u0435 \u043d\u0430 \u043c\u0443\u043b\u044c\u0442\u0438 \u043b\u0438\u043d\u0438\u044e", 
  STATSLINK:"\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430 \u043d\u0430 \u044d\u043a\u0440\u0430\u043d\u0435", BTNSUPPLAYERS:"\u0421\u043f\u0438\u0441\u043e\u043a \u0438\u0433\u0440\u043e\u043a\u043e\u0432", CHKUNITSCOST:"\u041e\u0442\u0447\u0435\u0442, \u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u044e\u0449\u0438\u0439 \u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u043f\u043e\u0442\u0435\u0440\u044f\u043d\u043d\u044b\u0445 \u0435\u0434\u0438\u043d\u0438\u0446", CHKOCEANNUMBER:"\u041f\u043e\u043a\u0430\u0437 \u043d\u043e\u043c\u0435\u0440\u0430 \u043e\u043a\u0435\u0430\u043d\u0430", 
  MSGRTLBL:"\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u043e \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u0438\u0438", MSGRTSHOW:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0442\u0435\u043a\u0443\u0449\u0443\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u0438\u0435", MSGRTONLINE:"\u0421\u043e\u0431\u0438\u0440\u0430\u0435\u0442\u0435\u0441\u044c \u043b\u0438 \u0432\u044b \u0432 \u0441\u0435\u0442\u0438 \u0432\u043e \u0432\u0440\u0435\u043c\u044f \u0431\u0443\u043d\u0442\u0430?", 
  MSGRTYES:"\u0414\u0430", MSGRTNO:"\u041d\u0435\u0442", MSGRTGOD:"\u0411\u043e\u0433", MSGRTCSTIME:"\u041a\u041a \u0432\u0440\u0435\u043c\u044f", MSGRTONL:"\u043e\u043d\u043b\u0430\u0439\u043d?", MSGRTERR:"\u0412\u044b \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u0435\u0441\u044c \u0432 \u0434\u0440\u0443\u0433\u043e\u043c \u0433\u043e\u0440\u043e\u0434\u0435!<br/>\u0427\u0442\u043e\u0431\u044b \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e, \u043f\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u0432 \u0433\u043e\u0440\u043e\u0434: ", 
  BBTEXT:"\u0442\u0435\u043a\u0441\u0442\u043e\u0432\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f", BBHTML:"\u0442\u0430\u0431\u043b\u0438\u0447\u043d\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f", MSG413ERR:"<h3> \u0421\u0444\u043e\u0440\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u043e\u0442\u0447\u0435\u0442 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0431\u043e\u043b\u044c\u0448\u0438\u043c. </ h3> <p> \u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0435 \u043e\u043f\u0446\u0438\u0438 \u0438 \u0443\u043c\u0435\u043d\u044c\u0448\u0438\u0442\u0435 \u043e\u0442\u0447\u0451\u0442 \u0434\u043b\u044f \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0438 \u0431\u0435\u0437 \u043f\u0440\u043e\u0431\u043b\u0435\u043c. </p>", 
  CHKREPORTFORMAT:"\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u043e\u0442\u0447\u0435\u0442\u043e\u0432 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u0442\u0430\u0431\u043b\u0438\u0446", WALLNOTSAVED:"\u0421\u0442\u0435\u043d\u0430 \u043d\u0435 \u0441\u043e\u0445\u0440\u0430\u043d\u044f\u0435\u0442\u0441\u044f", WALLSAVED:"\u0421\u0442\u0435\u043d\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u044f\u0435\u0442\u0441\u044f", POPSELRECRUNIT:"\u043d\u0430\u0436\u043c\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0441\u0442\u0432\u043e \u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e", 
  POPRECRUNITTRADE:"\u043d\u0430\u0436\u043c\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u0440\u0435\u0441\u0443\u0440\u0441\u043e\u0432, \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u044b\u0445 \u0434\u043b\u044f \u043d\u0430\u0431\u043e\u0440\u0430 \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u043e\u0433\u043e \u0431\u043b\u043e\u043a\u0430", POPINSERTLASTREPORT:"\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0439 \u043f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u043e\u0442\u0447\u0435\u0442", 
  MSGCOPYREPORT:"\u041e\u0442\u0447\u0451\u0442 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043d\u0430\u0436\u043c\u0438\u0442\u0435 [paste_icon] \u043d\u0430 \u0444\u043e\u0440\u0443\u043c\u0430\u0445 \u0438\u043b\u0438 \u043e\u043a\u043d\u0435 \u043d\u043e\u0432\u043e\u0433\u043e \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f, \u0447\u0442\u043e\u0431\u044b \u0432\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0435\u0433\u043e", 
  POPDISABLEALARM:"\u041e\u0442\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0441\u0438\u0433\u043d\u0430\u043b \u0442\u0440\u0435\u0432\u043e\u0433\u0438", SOUNDSETTINGS:"\u0417\u0432\u0443\u043a\u043e\u0432\u044b\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438", CHKSOUNDMUTE:"\u0411\u0435\u0437 \u0437\u0432\u0443\u043a\u0430", SOUNDVOLUME:"\u0413\u0440\u043e\u043c\u043a\u043e\u0441\u0442\u044c", SOUNDURL:"\u0417\u0432\u0443\u043a\u043e\u0432\u043e\u0439 \u0444\u0430\u0439\u043b URL", 
  CHKSOUNDLOOP:"\u041f\u043e\u0432\u0442\u043e\u0440", POPSOUNDLOOP:"\u0418\u0433\u0440\u0430\u0442\u044c \u043f\u043e \u043a\u0440\u0443\u0433\u0443", POPSOUNDMUTE:"\u0411\u0435\u0437 \u0437\u0432\u0443\u043a\u0430", POPSOUNDPLAY:"\u0418\u0433\u0440\u0430 \u0441 \u0442\u0435\u043a\u0443\u0449\u0438\u043c\u0438 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u0430\u043c\u0438 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438", POPSOUNDSTOP:"\u041e\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c", 
  POPSOUNDURL:"\u0410\u0434\u0440\u0435\u0441 \u043f\u0443\u0442\u044c \u043a \u0444\u0430\u0439\u043b\u0443 \u0441\u043e \u0437\u0432\u0443\u043a\u043e\u043c", STATS:{PLAYER:"\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430 \u0438\u0433\u0440\u043e\u043a\u0430", ALLY:"\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430 \u0441\u043e\u044e\u0437\u0430", TOWN:"\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430 \u0433\u043e\u0440\u043e\u0434\u0430"}, ABH:{WND:{WINDOWTITLE:"\u041f\u043e\u043c\u043e\u0448\u043d\u0438\u043a \u041d\u0430\u0439\u043c\u0430 \u0410\u0440\u043c\u0438\u0438", 
  UNITFRAME:"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0432\u0438\u0434 \u0432\u043e\u0439\u0441\u043a", DESCRIPTION1:"\u0412 \u044d\u0442\u043e\u043c \u0433\u043e\u0440\u043e\u0434\u0435, \u0443 \u0432\u0430\u0441 \u0435\u0441\u0442\u044c [population] \u0441\u0432\u043e\u0431\u043e\u0434\u043d\u043e\u0433\u043e \u043d\u0430\u0441\u0435\u043b\u0435\u043d\u0438\u044f.", DESCRIPTION2:"\u0414\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e, \u0447\u0442\u043e\u0431\u044b \u043f\u043e\u0441\u0442\u0440\u043e\u0438\u0442\u044c [max_units]", 
  DESCRIPTION3:"\u0423 \u0432\u0430\u0441 [yesno] \u0438\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u043d\u043e [research].", DESCRIPTION4:"\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0432 \u043e\u0447\u0435\u0440\u0435\u0434\u044c [max_queue] \u0435\u0434\u0438\u043d\u0438\u0446(\u0443)", TARGET:"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e", PACKAGE:"\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0440\u0435\u0441\u0443\u0440\u0441\u043e\u0432 \u0434\u043b\u044f \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f(\u0435\u0434.)", 
  BTNSAVE:"\u0441\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438", TOOLTIPOK:"\u041d\u0430\u0436\u043c\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u0432\u0438\u0434 \u0432\u043e\u0439\u0441\u043a, \u0434\u043b\u044f \u043a\u043e\u0442\u043e\u0440\u043e\u0433\u043e \u0431\u0443\u0434\u0443\u0442 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u044b \u0440\u0435\u0441\u0443\u0440\u0441\u044b", 
  TOOLTIPNOTOK:"\u041d\u0435 \u0438\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u043d", HASRESEARCH:"\u0414\u0430", NORESEARCH:"\u041d\u0435", SETTINGSAVED:"\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0434\u043b\u044f [city] \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u044b"}, RESWND:{RESLEFT:"\u0440\u0435\u0441\u0443\u0440\u0441\u044b \u0441\u043b\u0435\u0432\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c", IMGTOOLTIP:"\u043d\u0430\u0436\u043c\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u0437\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c"}}, 
  NEWVERSION:{AVAILABLE:"\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u0430 \u043d\u043e\u0432\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f", INSTALL:"\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c", REMINDER:"\u041d\u0430\u043f\u043e\u043c\u043d\u0438\u0442\u044c \u043f\u043e\u0437\u0436\u0435", REQRELOAD:"\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u044f", RELOAD:"\u041e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435"}, 
  LANGS:{LANG:"\u041f\u0435\u0440\u0435\u0432\u043e\u0434 \u0434\u043b\u044f \u044f\u0437\u044b\u043a\u0430:", SEND:"\u041f\u043e\u0448\u043b\u0438\u0442\u0435 \u0432 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u044e", SAVE:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c & \u043f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c", RESET:"\u042f\u0437\u044b\u043a \u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e", REMOVE:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u0432\u043e\u0439 \u043f\u0435\u0440\u0435\u0432\u043e\u0434?"}, 
  HELPTAB5:"\u041f\u0435\u0440\u0435\u0432\u043e\u0434\u0447\u0438\u043a", BTNSIMUL:"\u0421\u0438\u043c\u0443\u043b\u044f\u0442\u043e\u0440", EMOTS:{LABEL:"\u0423 \u0432\u0430\u0441 \u0435\u0441\u0442\u044c \u0434\u0440\u0443\u0433\u0438\u0435 \u0441\u043c\u0430\u0439\u043b\u0438\u043a\u0438?", MESS:"\u0412\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0441\u0441\u044b\u043b\u043a\u0443 \u043d\u0430 \u0441\u043c\u0430\u0439\u043b\u0438\u043a \u0432 \u043b\u0438\u043d\u0438\u044e \u043d\u0438\u0436\u0435"}, 
  COMMAND:{ALL:"\u0412\u0441\u0435", INCOMING:"\u043d\u0430 \u0432\u0430\u0441", OUTGOING:"\u043e\u0442 \u0432\u0430\u0441", RETURNING:"\u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u044e\u0449\u0438\u0435\u0441\u044f", FORTOWN:"\u0433\u043e\u0440\u043e\u0434:"}};
  this.sk = {AUTHOR:" , DragonKnight, jaro868, tekri", BTNCONV:"Previes\u0165", BTNGENER:"Vytvori\u0165", BTNVIEW:"Uk\u00e1\u017eka", BTNSAVE:"Ulo\u017ei\u0165", MSGTITLE:"Previes\u0165 spr\u00e1vu", MSGQUEST:"Ktor\u00e9 z d\u00e1t chcete publikova\u0165?", MSGBBCODE:"Po zverejnen\u00ed spr\u00e1vy, m\u00f4\u017eete sp\u00e1rova\u0165 s novinkami a f\u00f3rom pomocou BBCode.", MSGRESOURCE:"Koris\u0165", MSGUNITS:"Jednotky", MSGBUILD:"Stavby", MSGUSC:"Pou\u017eit\u00fdch strieborn\u00fdch minc\u00ed", 
  MSGRAW:"Suroviny", SUPPORT:"Podpora", SPY:"\u0160pehovanie", CONQUER:"Zv\u00ed\u0165azil", LOSSES:"Straty", HIDDEN:"Skryt\u00e9", NOTUNIT:"[i]\u017eiadny[/i]", TOWN:"[i]Mesto:[/i] ", PLAYER:"[i]Hr\u00e1\u010d:[/i] ", ALLY:"[i]Spojenectvo:[/i] ", CAST:"obsadenie:", ONTOWER:"V meste:", MSGHIDAD:"Skryt\u00e9 mest\u00e1", MSGFORUM:"T\u00e1to spr\u00e1va bude zverejnen\u00e1", BBALLY:"spojeneck\u00e9 f\u00f3rum / v spr\u00e1ve", BBFORUM:"extern\u00e9 f\u00f3rum", ICOCLOSE:"Zavrie\u0165", ICOHELP:"O prevodn\u00edku", 
  MSGPREVIEW:"<b>Zobrazi\u0165 spr\u00e1vu</b>", HELPTAB1:"O ", HELPTAB2:"Ako to funguje", HELPTAB3:"Zmeny", HELPTAB4:"Nastavenia", MSGHUMAN:{OK:"Inform\u00e1cie boli ulo\u017een\u00e9", ERROR:"Vyskytla sa chyba pri p\u00edsan\u00fd"}, LABELS:{attack:{ATTACKER:"Uto\u010dn\u00edk", DEFENDER:"Obranca", MSGHIDAT:"Uto\u010dn\u00edk", MSGHIDDE:"Obranca", MSGATTUNIT:"Uto\u010diaca arm\u00e1da", MSGDEFUNIT:"Obranuj\u00faca arm\u00e1da"}, support:{ATTACKER:"Supporting", DEFENDER:"Supported", MSGHIDAT:"supporting", 
  MSGHIDDE:"supported", MSGATTUNIT:"Army supporting", MSGDEFUNIT:"Army defenders"}, espionage:{ATTACKER:"\u0160pi\u00f3n", DEFENDER:"Spied", MSGHIDAT:"\u0160pi\u00f3n", MSGHIDDE:"spied", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"detaily pr\u00edkazu", MSGRETURN:"(sp\u00e4\u0165)", MSGGENBBCODE:"Vytvori\u0165 zoznam v BBCode", MSGDEFSITE:"Porazen\u00ed...", MSGLOSSITE:"Straty...", MSGASATT:"...ako \u00fato\u010dn\u00edk", MSGASDEF:"...ako obranca", MSGDIFF1:"nezobrazi\u0165 rozdiely", MSGDIFF2:"zobrazi\u0165 rozdiely", 
  MSGDIFF3:"zobrazi\u0165 iba rozdiely", BBCODELIMIT:"Vzh\u013eadom k obmedzen\u00e9mu mno\u017estvu textu v jednej spr\u00e1ve, v pr\u00edpade dlh\u00e9ho zoznamu, boli d\u00e1ta rozdelen\u00e1 do skup\u00edn. Ka\u017ed\u00fa skupinu vlo\u017ei\u0165 ako samostatn\u00fd vstup.", CHKPOWERNAME:"Zobrazenie zost\u00e1vaj\u00faceho \u010dasu na mo\u017enos\u0165 pou\u017eitia k\u00fazla", CHKFORUMTABS:"Vymeni\u0165 rolovanie zar\u00e1\u017eky na f\u00f3re multi line", STATSLINK:"\u0160tatistiky z displeja", 
  BTNSUPPLAYERS:"Zoznam hr\u00e1\u010dov", CHKUNITSCOST:"Spr\u00e1va zobrazuje n\u00e1klady straten\u00fdch jednotiek", CHKOCEANNUMBER:"Zobrazi\u0165 \u010d\u00edslo mora", MSGRTLBL:"Inform\u00e1cie o vzbure", MSGRTSHOW:"Prida\u0165 priebe\u017en\u00e9 inform\u00e1cie o odboji", MSGRTONLINE:"Chyst\u00e1\u0161 sa by\u0165 on-line v priebehu \u010dervenej vzbury?", MSGRTYES:"Ano", MSGRTNO:"Nie", MSGRTGOD:"Boh", MSGRTCSTIME:"\u010cas OL", MSGRTONL:"on-line?", MSGRTERR:"Ste v zlom meste <br/> Ak chcete vytvori\u0165 inform\u00e1cie o vzbure cho\u010fte do mesta !:", 
  BBTEXT:"verzia s textom", BBHTML:"verzia s tabu\u013ekou", MSG413ERR:"<H3> generovan\u00e1 spr\u00e1va je pr\u00edli\u0161 ve\u013ek\u00e1. </h3><p> Pou\u017eite dostupn\u00e9 mo\u017enosti a zredukujte publikovan\u00e9 bez probl\u00e9mov. </p>", CHKREPORTFORMAT:"Generate reports using tables", WALLNOTSAVED:"Hradby nie s\u00fa ulo\u017een\u00e9", WALLSAVED:"Hradby s\u00fa ulo\u017een\u00e9", POPSELRECRUNIT:"click, to select default production unit", POPRECRUNITTRADE:"click, to fill in resources needed to recruit selected unit", 
  POPINSERTLASTREPORT:"Paste the last converted report", MSGCOPYREPORT:"The report has been saved. Please click [paste_icon] on forums or new message window to paste it", POPDISABLEALARM:"Disable alarm", SOUNDSETTINGS:"Sound settings", CHKSOUNDMUTE:"Vypn\u00fa\u0165 zvuk", SOUNDVOLUME:"Hlasitos\u0165", SOUNDURL:"Sound file url", CHKSOUNDLOOP:"loop", POPSOUNDLOOP:"Play in the loop", POPSOUNDMUTE:"Stlmi\u0165 zvuk", POPSOUNDPLAY:"Hra\u0165 s aktu\u00e1lnym nastaven\u00edm", POPSOUNDSTOP:"Presta\u0165 hra\u0165", 
  POPSOUNDURL:"Url path to the file with sound", STATS:{PLAYER:"\u0160tatistiky hr\u00e1\u010da", ALLY:"\u0160tatistiky spojenectva", TOWN:"\u0160tatistiky mesta"}, ABH:{WND:{WINDOWTITLE:"Army Builder Helper", UNITFRAME:"vyber si svoje jednotky", DESCRIPTION1:"Vo\u013en\u00e1 popul\u00e1cia v tomto meste je [population] ", DESCRIPTION2:"Which is enough to build [max_units]", DESCRIPTION3:"You [yesno] have a [research] researched.", DESCRIPTION4:"You can queue up maximum of [max_queue] units", TARGET:"vyber si cie\u013e", 
  PACKAGE:"resource package per shipment (units)", BTNSAVE:"ulo\u017ei\u0165 nastavenia", TOOLTIPOK:"click, to select default unit for which you'll be sending resources", TOOLTIPNOTOK:"jednotka e\u0161te nebola vysk\u00faman\u00e1", HASRESEARCH:"DO", NORESEARCH:"DO NOT", SETTINGSAVED:"Settings for [city] have been saved"}, RESWND:{RESLEFT:"resources left to send", IMGTOOLTIP:"kliknite, pre zaplnenie surov\u00edn"}}, NEWVERSION:{AVAILABLE:"Nov\u00e1 verzia dostupn\u00e1", INSTALL:"In\u0161talova\u0165", 
  REMINDER:"Pripomen\u00fa\u0165 nesk\u00f4r", REQRELOAD:"Obnovenie je nevyhnutn\u00e9", RELOAD:"Obnovenie"}, LANGS:{LANG:"Prelo\u017ei\u0165 do jazyka:", SEND:"Send to publication", SAVE:"Ulo\u017ei\u0165 a vysk\u00fa\u0161a\u0165", RESET:"Nastavi\u0165 p\u00f4vodn\u00fd jazyk", REMOVE:"Vymaza\u0165 tv\u00f4j preklad?"}, HELPTAB5:"Preklad", BTNSIMUL:"Simul\u00e1tor", EMOTS:{LABEL:"Chce\u0161 viac smajl\u00edkov?", MESS:"Prilep linky smajl\u00edkov, ka\u017ed\u00fd do novej karty"}, COMMAND:{ALL:"V\u0161etky", 
  INCOMING:"Prich\u00e1dzaj\u00face", OUTGOING:"Odch\u00e1dzaj\u00face", RETURNING:"Vracaj\u00face sa", FORTOWN:"mesto:"}};
  this.sv = {AUTHOR:" , Mr. Ferdinand, llavids", BTNCONV:"Omvandla", BTNGENER:"Generera", BTNVIEW:"F\u00f6rhandsvisa", BTNSAVE:"Spara", MSGTITLE:"Omvandla rapport", MSGQUEST:"Vilken information vill du publicera?", MSGBBCODE:"Efter att ha publicerat din rapport s\u00e5 kan du dela den i forum mm med hj\u00e4lp utav BBkoden.", MSGRESOURCE:"Byte", MSGUNITS:"Enheter", MSGBUILD:"Byggnader", MSGUSC:"Silvermynt f\u00f6rbrukade", MSGRAW:"Resurser", SUPPORT:"St\u00f6djer", SPY:"Spionerar", CONQUER:"Er\u00f6vrade", 
  LOSSES:"F\u00f6rluster", HIDDEN:"Dolda", NOTUNIT:"[i]Inga[/i]", TOWN:"[i]Stad:[/i] ", PLAYER:"[i]Spelare:[/i] ", ALLY:"[i]Allians:[/i] ", CAST:"kasta:", ONTOWER:"P\u00e5 staden:", MSGHIDAD:"D\u00f6lj st\u00e4der", MSGFORUM:"Rapporten kommer att delas", BBALLY:"alliansforum / meddelande", BBFORUM:"externa forum", ICOCLOSE:"St\u00e4ng", ICOHELP:"Om omvandlaren", MSGPREVIEW:"<b>F\u00f6rhandsvisa Rapport</b>", HELPTAB1:"Om", HELPTAB2:"Hur fungerar det", HELPTAB3:"\u00c4ndringar", HELPTAB4:"Inst\u00e4llningar", 
  MSGHUMAN:{OK:"Informationen har sparats", ERROR:"Ett problem uppstod vid skrivandet"}, LABELS:{attack:{ATTACKER:"Anfallare", DEFENDER:"F\u00f6rsvarare", MSGHIDAT:"anfallare", MSGHIDDE:"f\u00f6rsvarare", MSGATTUNIT:"Anfallande arm\u00e9", MSGDEFUNIT:"F\u00f6rsvarande arm\u00e9"}, support:{ATTACKER:"St\u00f6der", DEFENDER:"St\u00f6dde", MSGHIDAT:"F\u00f6rst\u00e4rkande stad", MSGHIDDE:"F\u00f6rst\u00e4rkt stad", MSGATTUNIT:"F\u00f6rst\u00e4rkande enheter", MSGDEFUNIT:"F\u00f6rsvarande enheter"}, 
  espionage:{ATTACKER:"Spion", DEFENDER:"Spionerade", MSGHIDAT:"spion", MSGHIDDE:"spionerade", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"kommando\u00f6versikt", MSGRETURN:"(\u00e5terv\u00e4nd)", MSGGENBBCODE:"Genererar en lista med BBkod", MSGDEFSITE:"Besegrade...", MSGLOSSITE:"F\u00f6rluster...", MSGASATT:"...som anfallare", MSGASDEF:"...som f\u00f6rsvarare", MSGDIFF1:"visa inte skillnader", MSGDIFF2:"visa skillnader", MSGDIFF3:"visa bara skillnaderna", BBCODELIMIT:"Med h\u00e4nsyn till m\u00e4ngden text som f\u00e5r finnas i ett inl\u00e4gg s\u00e5 delas informationen upp i grupper vid l\u00e4ngre listor. Varje grupp klistras in som ett enskilt inl\u00e4gg. ", 
  CHKPOWERNAME:"Visa tiden som \u00e5terst\u00e5r innan du kan anv\u00e4nda kraften", CHKFORUMTABS:"Ers\u00e4tt skrollningslisten i forumet f\u00f6r flera rader", STATSLINK:"Statistik fr\u00e5n", BTNSUPPLAYERS:"Lista p\u00e5 spelare", CHKUNITSCOST:"Rapporten visar kostnaderna f\u00f6r f\u00f6rlorade enheter", CHKOCEANNUMBER:"Visa havets nummer", MSGRTLBL:"Information om revolt", MSGRTSHOW:"L\u00e4gg till information om p\u00e5g\u00e5ende revolt", MSGRTONLINE:"Kommer du vara inloggad under p\u00e5g\u00e5ende revolt?", 
  MSGRTYES:"Ja", MSGRTNO:"Nej", MSGRTGOD:"Gud", MSGRTCSTIME:"KS tid", MSGRTONL:"inloggad?", MSGRTERR:"Du \u00e4r i fel stad!<br/>F\u00f6r att hitta information om revolten, g\u00e5 till stad: ", BBTEXT:"textversion", BBHTML:"tabbelversion", MSG413ERR:"<h3>Den genererade rapporten \u00e4r f\u00f6r stor.</h3><p>Filtrera bort vissa alternativ f\u00f6r att kunna publicera utan problem</p>", CHKREPORTFORMAT:"Generera rapport med hj\u00e4lp av tabeller", WALLNOTSAVED:"Muren \u00e4r inte sparad", WALLSAVED:"Muren \u00e4r sparad", 
  POPSELRECRUNIT:"klicka, f\u00f6r att v\u00e4lja standardenhet f\u00f6r producera", POPRECRUNITTRADE:"klicka, f\u00f6r att fylla i resurser som kr\u00e4vs f\u00f6r att rekrytera vald enhet", POPINSERTLASTREPORT:"Klistra in senast omvandlad rapport", MSGCOPYREPORT:"Rapporten har sparats. Klicka p\u00e5 [paste_icon] i forum eller ett nytt meddelande f\u00f6r att klistra in", POPDISABLEALARM:"St\u00e4ng av alarm", SOUNDSETTINGS:"Ljudinst\u00e4llningar", CHKSOUNDMUTE:"St\u00e4ng av ljudet", SOUNDVOLUME:"Volym", 
  SOUNDURL:"Ljudfil url", CHKSOUNDLOOP:"repetera", POPSOUNDLOOP:"Spela upp ljudet i en slinga", POPSOUNDMUTE:"St\u00e4ng av ljudet", POPSOUNDPLAY:"Spela med aktuella inst\u00e4llningar", POPSOUNDSTOP:"Sluta spela", POPSOUNDURL:"URL l\u00e4nk till ljudfilen", STATS:{PLAYER:"Spelarstatistik", ALLY:"Alliansstatistik", TOWN:"Stadsstatistik"}, ABH:{WND:{WINDOWTITLE:"Truppbyggarverktyg", UNITFRAME:"v\u00e4lj din enhet", DESCRIPTION1:"I den h\u00e4r staden har du [population] fria inv\u00e5nare", DESCRIPTION2:"Vilket r\u00e4cker f\u00f6r att bygga [max_units]", 
  DESCRIPTION3:"Du [yesno] har en [research] framforskad.", DESCRIPTION4:"Du kan k\u00f6a upp till [max_queue] enheter", TARGET:"v\u00e4lj vad du vill bygga", PACKAGE:"resurser per f\u00f6rs\u00e4ndelse (units)", BTNSAVE:"spara inst\u00e4llningar", TOOLTIPOK:"klicka, f\u00f6r att v\u00e4lja fixerad m\u00e4ngd resurser att skicka", TOOLTIPNOTOK:"enheten har inte forskats fram", HASRESEARCH:"DU B\u00d6R", NORESEARCH:"DU B\u00d6R EJ", SETTINGSAVED:"Inst\u00e4llningarna f\u00f6r [city] har sparats"}, 
  RESWND:{RESLEFT:"resurser kvar att skicka", IMGTOOLTIP:"klicka f\u00f6r att fylla i resurser"}}, NEWVERSION:{AVAILABLE:"Ny version tillg\u00e4nglig", INSTALL:"Installera", REMINDER:"P\u00e5minn mig senare", REQRELOAD:"Du beh\u00f6ver ladda om sidan", RELOAD:"Ladda om sidan"}, LANGS:{LANG:"\u00d6vers\u00e4ttning till spr\u00e5k:", SEND:"Skicka f\u00f6r publicering", SAVE:"Spara & testa", RESET:"\u00c5terst\u00e4ll ursprungligt spr\u00e5k", REMOVE:"Radera din \u00f6vers\u00e4ttning?"}, HELPTAB5:"\u00d6vers\u00e4ttning", 
  BTNSIMUL:"Simulator", EMOTS:{LABEL:"Vill du ha fler emotikoner?", MESS:"Klistra in l\u00e4nk till emotikon, separera med ny rad"}, COMMAND:{ALL:"Alla", INCOMING:"inkommande", OUTGOING:"utg\u00e5ende", RETURNING:"\u00e5terv\u00e4ndande", FORTOWN:"stad:"}};
  this.tr = {AUTHOR:"Lazmanya 61, zabidin", BTNCONV:"D\u00f6n\u00fc\u015ft\u00fcr", BTNGENER:"Olu\u015ftur", BTNVIEW:"\u00d6nizle", BTNSAVE:"Kaydet", MSGTITLE:"Raporu d\u00f6n\u00fc\u015ft\u00fcr", MSGQUEST:"Hangi i\u00e7erikler g\u00f6sterilebilir?", MSGBBCODE:"Bu raporu yay\u0131nland\u0131ktan sonra BB kodunu kullanarak mesajlara ya da foruma dahil edebilirsin.", MSGRESOURCE:"Ganimet", MSGUNITS:"Birimler", MSGBUILD:"Binalar", MSGUSC:"Kullan\u0131lan g\u00fcm\u00fc\u015f paralar", MSGRAW:"Hammaddeler", 
  SUPPORT:"Yard\u0131m", SPY:"Casusluk", CONQUER:"Fethetmek", LOSSES:"Kay\u0131plar", HIDDEN:"Gizlendi", NOTUNIT:"[i]Hi\u00e7biri[/i]", TOWN:"[i]\u015eehir:[/i] ", PLAYER:"[i]Oyuncu:[/i] ", ALLY:"[i]M\u00fcttefik:[/i] ", CAST:"Yap\u0131m:", ONTOWER:"\u015eehirde:", MSGHIDAD:"\u015fehirleri gizle", MSGFORUM:"Raporu yay\u0131nla", BBALLY:"ittifak forumu / mesaj i\u00e7inde", BBFORUM:"di\u011fer forumda", ICOCLOSE:"Kapat", ICOHELP:"D\u00f6n\u00fc\u015ft\u00fcr\u00fcc\u00fc hakk\u0131nda", MSGPREVIEW:"<b>Raporu \u00f6nizleme</b>", 
  HELPTAB1:"Hakk\u0131nda", HELPTAB2:"Nas\u0131l \u00c7al\u0131\u015f\u0131r", HELPTAB3:"De\u011fi\u015fiklikler", HELPTAB4:"Ayarlar", MSGHUMAN:{OK:"Kaydedildi", ERROR:"Yazarken bir hata olu\u015ftu"}, LABELS:{attack:{ATTACKER:"Sald\u0131r\u0131", DEFENDER:"Destek", MSGHIDAT:"sald\u0131rgan", MSGHIDDE:"savunmac\u0131", MSGATTUNIT:"Sald\u0131rgan\u0131n birlikleri", MSGDEFUNIT:"Savunmac\u0131n\u0131n birlikleri"}, support:{ATTACKER:"Destekleyen", DEFENDER:"Desteklenen", MSGHIDAT:"destekleyen", MSGHIDDE:"desteklenen", 
  MSGATTUNIT:"destekleyen birim", MSGDEFUNIT:"Savunma birimleri"}, espionage:{ATTACKER:"Casus", DEFENDER:"Casusluk", MSGHIDAT:"casuslayan", MSGHIDDE:"casuslanan", MSGATTUNIT:"", MSGDEFUNIT:""}}, MSGDETAIL:"komut ayr\u0131nt\u0131lar\u0131", MSGRETURN:"(geri d\u00f6n)", MSGGENBBCODE:"BBCode listesi olu\u015ftur", MSGDEFSITE:"Yenildi....", MSGLOSSITE:"Kay\u0131plar...", MSGASATT:"...sald\u0131rgan olarak", MSGASDEF:"...savunmac\u0131 olarak", MSGDIFF1:"farkl\u0131l\u0131klar\u0131 g\u00f6sterme", MSGDIFF2:"farkl\u0131l\u0131klar\u0131 g\u00f6ster", 
  MSGDIFF3:"sadece farkl\u0131l\u0131klar\u0131 g\u00f6ster", BBCODELIMIT:"Metin uzun bir liste ise, veri gruba ayr\u0131l\u0131r. Her grubu ayr\u0131 bir girdi olarak kopyalay\u0131p yap\u0131\u015ft\u0131r\u0131n.", CHKPOWERNAME:"B\u00fcy\u00fcler i\u00e7in gerekli tevecc\u00fchlerin y\u00fcklenme s\u00fcrelerini g\u00f6ster", CHKFORUMTABS:"Forum sekme pencerelerini s\u0131rala", STATSLINK:"\u0130statistikler i\u00e7in", BTNSUPPLAYERS:"Oyuncu listesi", CHKUNITSCOST:"Kaybedilen birimlerin maliyet raporu", 
  CHKOCEANNUMBER:"Deniz numaralar\u0131n\u0131 g\u00f6ster", MSGRTLBL:"Ayaklanma Bilgisi", MSGRTSHOW:"Devem eden Ayaklanma Bilgisi ekle", MSGRTONLINE:"Ayaklanma ba\u015flad\u0131\u011f\u0131nda \u00e7evrimi\u00e7i olacak m\u0131s\u0131n?", MSGRTYES:"Evet", MSGRTNO:"Hay\u0131r", MSGRTGOD:"Tanr\u0131", MSGRTCSTIME:"Koloni zaman\u0131", MSGRTONL:"\u00e7evrimi\u00e7i?", MSGRTERR:"Yanl\u0131\u015f \u015eehirdesin!<br/>Bilgiyi olu\u015fturmak i\u00e7in \u015fu \u015fehire git: ", BBTEXT:"yaz\u0131 \u015fekinde", 
  BBHTML:"tablo \u015feklinde", MSG413ERR:"<h3>Olu\u015fturulan rapor \u00e7ok b\u00fcy\u00fck.</h3><p>Se\u00e7enekler k\u0131sm\u0131ndan ayarlar\u0131 de\u011fi\u015ftirirseniz sorunu \u00e7\u00f6zebilirsiniz.</p>", CHKREPORTFORMAT:"Tablo kullanarak raporlar\u0131 olu\u015ftur", WALLNOTSAVED:"\u015eehir surlar\u0131 kaydedilmedi", WALLSAVED:"\u015eehir surlar\u0131 kaydedildi", POPSELRECRUNIT:"Varsay\u0131lan \u00fcretim birimi se\u00e7mek i\u00e7in t\u0131klay\u0131n", POPRECRUNITTRADE:"se\u00e7ili birimi olu\u015fturmak i\u00e7in hammadde doldurmak i\u00e7in t\u0131kla", 
  POPINSERTLASTREPORT:"D\u00f6n\u00fc\u015ft\u00fcr\u00fclen son raporu yay\u0131nla", MSGCOPYREPORT:"Rapor kaydedildi. Bu raporu yay\u0131nlamak i\u00e7in forum yada yeni mesaj penceresinde bu [paste_icon] logoya t\u0131klay\u0131n.", POPDISABLEALARM:"Alarm\u0131 kapat", SOUNDSETTINGS:"Ses ayar\u0131", CHKSOUNDMUTE:"Sessiz", SOUNDVOLUME:"Ses", SOUNDURL:"Ses dosyas\u0131 adresi", CHKSOUNDLOOP:"Tekrar", POPSOUNDLOOP:"Tekrar oynat", POPSOUNDMUTE:"Sesi k\u0131s", POPSOUNDPLAY:"Oynat", POPSOUNDSTOP:"Durdur", 
  POPSOUNDURL:"y\u00fcklenen ses dosyas\u0131n\u0131n adresi", STATS:{PLAYER:"Oyuncu istatisti\u011fi", ALLY:"\u0130ttifak istatisti\u011fi", TOWN:"\u015eehir istatisti\u011fi"}, ABH:{WND:{WINDOWTITLE:"Birim Toplama Yard\u0131mc\u0131s\u0131", UNITFRAME:"biriminizi se\u00e7in", DESCRIPTION1:"Bu \u015fehide [population] \u00f6zg\u00fcr n\u00fcfus var", DESCRIPTION2:"in\u015faat yapmak i\u00e7in yeterli olan [max_units]", DESCRIPTION3:"Bu [yesno] ara\u015ft\u0131rmay\u0131 tamamlad\u0131n [research].", 
  DESCRIPTION4:"En fazla [max_queue] kadar birim s\u0131raya koyabilirsin", TARGET:"in\u015faat yapmak istedi\u011fin hedefi se\u00e7", PACKAGE:"Ta\u015f\u0131ma ba\u015f\u0131na hammadde miktar\u0131(units)", BTNSAVE:"ayarlar\u0131 kaydet", TOOLTIPOK:"Hammadde g\u00f6ndercece\u011fin varsay\u0131lan birimi se\u00e7mek i\u00e7in t\u0131kla", TOOLTIPNOTOK:"teknoloji akademide ara\u015ft\u0131r\u0131lmam\u0131\u015f", HASRESEARCH:"YAP", NORESEARCH:"YAPMA", SETTINGSAVED:"[city] i\u00e7in ayarlar kaydedildi"}, 
  RESWND:{RESLEFT:"yollayabilece\u011fin kalan hammadde", IMGTOOLTIP:"hammaddeyi doldurmak i\u00e7in t\u0131kla"}}, NEWVERSION:{AVAILABLE:"Yeni versiyon mevcut", INSTALL:"Y\u00fckle", REMINDER:"Daha sonra hat\u0131rlat", REQRELOAD:"Sitenin yenilenmesi gerekiyor.", RELOAD:"Yenile"}, LANGS:{LANG:"\u00c7evirilen dil:", SEND:"\u00c7eviriyi G\u00f6nder", SAVE:"Kaydet & Test Et", RESET:"Varsay\u0131lan dile s\u0131f\u0131rla", REMOVE:"\u00c7evirini silmek istedi\u011fine emin misin?"}, HELPTAB5:"\u00c7eviri", 
  BTNSIMUL:"Sim\u00fclat\u00f6r", EMOTS:{LABEL:"Daha fazla ifade ister misin?", MESS:"Her yeni bir ifade i\u00e7in yeni bir sat\u0131ra ba\u011flant\u0131 yap\u0131\u015ft\u0131r\u0131n..."}, COMMAND:{ALL:"Hepsi", INCOMING:"Gelen", OUTGOING:"Giden", RETURNING:"D\u00f6nen", FORTOWN:"\u015fehir:"}};
}
(function(e) {
  for (var a, b, c = document.getElementsByTagName("head")[0].style, g = ["transformProperty", "WebkitTransform", "OTransform", "msTransform", "MozTransform"], m = 0;m < g.length;m++) {
    void 0 !== c[g[m]] && (a = g[m]);
  }
  a && (b = a.replace(/[tT]ransform/, "TransformOrigin"), "T" == b[0] && (b[0] = "t"));
  eval('IE = "v"=="\v"');
  jQuery.fn.extend({rotate:function(a) {
    if (0 !== this.length && "undefined" != typeof a) {
      "number" == typeof a && (a = {angle:a});
      for (var b = [], c = 0, g = this.length;c < g;c++) {
        var m = this.get(c);
        if (m.Wilq32 && m.Wilq32.PhotoEffect) {
          m.Wilq32.PhotoEffect._handleRotation(a);
        } else {
          var E = e.extend(!0, {}, a), m = (new Wilq32.PhotoEffect(m, E))._rootObj;
          b.push(e(m));
        }
      }
      return b;
    }
  }, getRotateAngle:function() {
    for (var a = [], b = 0, c = this.length;b < c;b++) {
      var e = this.get(b);
      e.Wilq32 && e.Wilq32.PhotoEffect && (a[b] = e.Wilq32.PhotoEffect._angle);
    }
    return a;
  }, stopRotate:function() {
    for (var a = 0, b = this.length;a < b;a++) {
      var c = this.get(a);
      c.Wilq32 && c.Wilq32.PhotoEffect && clearTimeout(c.Wilq32.PhotoEffect._timer);
    }
  }});
  Wilq32 = window.Wilq32 || {};
  Wilq32.PhotoEffect = function() {
    return a ? function(a, b) {
      a.Wilq32 = {PhotoEffect:this};
      this._img = this._rootObj = this._eventObj = a;
      this._handleRotation(b);
    } : function(a, b) {
      this._img = a;
      this._onLoadDelegate = [b];
      this._rootObj = document.createElement("span");
      this._rootObj.style.display = "inline-block";
      this._rootObj.Wilq32 = {PhotoEffect:this};
      a.parentNode.insertBefore(this._rootObj, a);
      if (a.complete) {
        this._Loader();
      } else {
        var c = this;
        jQuery(this._img).bind("load", function() {
          c._Loader();
        });
      }
    };
  }();
  Wilq32.PhotoEffect.prototype = {_setupParameters:function(a) {
    this._parameters = this._parameters || {};
    "number" !== typeof this._angle && (this._angle = 0);
    "number" === typeof a.angle && (this._angle = a.angle);
    this._parameters.animateTo = "number" === typeof a.animateTo ? a.animateTo : this._angle;
    this._parameters.step = a.step || this._parameters.step || null;
    this._parameters.easing = a.easing || this._parameters.easing || this._defaultEasing;
    this._parameters.duration = a.duration || this._parameters.duration || 1E3;
    this._parameters.callback = a.callback || this._parameters.callback || this._emptyFunction;
    this._parameters.center = a.center || this._parameters.center || ["50%", "50%"];
    this._rotationCenterX = "string" == typeof this._parameters.center[0] ? parseInt(this._parameters.center[0], 10) / 100 * this._imgWidth * this._aspectW : this._parameters.center[0];
    this._rotationCenterY = "string" == typeof this._parameters.center[1] ? parseInt(this._parameters.center[1], 10) / 100 * this._imgHeight * this._aspectH : this._parameters.center[1];
    a.bind && a.bind != this._parameters.bind && this._BindEvents(a.bind);
  }, _emptyFunction:function() {
  }, _defaultEasing:function(a, b, c, e, g) {
    return -e * ((b = b / g - 1) * b * b * b - 1) + c;
  }, _handleRotation:function(b, c) {
    a || this._img.complete || c ? (this._setupParameters(b), this._angle == this._parameters.animateTo ? this._rotate(this._angle) : this._animateStart()) : this._onLoadDelegate.push(b);
  }, _BindEvents:function(a) {
    if (a && this._eventObj) {
      if (this._parameters.bind) {
        var b = this._parameters.bind, c;
        for (c in b) {
          b.hasOwnProperty(c) && jQuery(this._eventObj).unbind(c, b[c]);
        }
      }
      this._parameters.bind = a;
      for (c in a) {
        a.hasOwnProperty(c) && jQuery(this._eventObj).bind(c, a[c]);
      }
    }
  }, _Loader:function() {
    return IE ? function() {
      var a = this._img.width, b = this._img.height;
      this._imgWidth = a;
      this._imgHeight = b;
      this._img.parentNode.removeChild(this._img);
      this._vimage = this.createVMLNode("image");
      this._vimage.src = this._img.src;
      this._vimage.style.height = b + "px";
      this._vimage.style.width = a + "px";
      this._vimage.style.position = "absolute";
      this._vimage.style.top = "0px";
      this._vimage.style.left = "0px";
      this._aspectW = this._aspectH = 1;
      this._container = this.createVMLNode("group");
      this._container.style.width = a;
      this._container.style.height = b;
      this._container.style.position = "absolute";
      this._container.style.top = "0px";
      this._container.style.left = "0px";
      this._container.setAttribute("coordsize", a - 1 + "," + (b - 1));
      this._container.appendChild(this._vimage);
      this._rootObj.appendChild(this._container);
      this._rootObj.style.position = "relative";
      this._rootObj.style.width = a + "px";
      this._rootObj.style.height = b + "px";
      this._rootObj.setAttribute("id", this._img.getAttribute("id"));
      this._rootObj.className = this._img.className;
      for (this._eventObj = this._rootObj;a = this._onLoadDelegate.shift();) {
        this._handleRotation(a, !0);
      }
    } : function() {
      this._rootObj.setAttribute("id", this._img.getAttribute("id"));
      this._rootObj.className = this._img.className;
      this._imgWidth = this._img.naturalWidth;
      this._imgHeight = this._img.naturalHeight;
      var a = Math.sqrt(this._imgHeight * this._imgHeight + this._imgWidth * this._imgWidth);
      this._width = 3 * a;
      this._height = 3 * a;
      this._aspectW = this._img.offsetWidth / this._img.naturalWidth;
      this._aspectH = this._img.offsetHeight / this._img.naturalHeight;
      this._img.parentNode.removeChild(this._img);
      this._canvas = document.createElement("canvas");
      this._canvas.setAttribute("width", this._width);
      this._canvas.style.position = "relative";
      this._canvas.style.left = -this._img.height * this._aspectW + "px";
      this._canvas.style.top = -this._img.width * this._aspectH + "px";
      this._canvas.Wilq32 = this._rootObj.Wilq32;
      this._rootObj.appendChild(this._canvas);
      this._rootObj.style.width = this._img.width * this._aspectW + "px";
      this._rootObj.style.height = this._img.height * this._aspectH + "px";
      this._eventObj = this._canvas;
      for (this._cnv = this._canvas.getContext("2d");a = this._onLoadDelegate.shift();) {
        this._handleRotation(a, !0);
      }
    };
  }(), _animateStart:function() {
    this._timer && clearTimeout(this._timer);
    this._animateStartTime = +new Date;
    this._animateStartAngle = this._angle;
    this._animate();
  }, _animate:function() {
    var a = +new Date, b = a - this._animateStartTime > this._parameters.duration;
    if (b && !this._parameters.animatedGif) {
      clearTimeout(this._timer);
    } else {
      if (this._canvas || this._vimage || this._img) {
        a = this._parameters.easing(0, a - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration), this._rotate(~~(10 * a) / 10);
      }
      this._parameters.step && this._parameters.step(this._angle);
      var c = this;
      this._timer = setTimeout(function() {
        c._animate.call(c);
      }, 10);
    }
    this._parameters.callback && b && (this._angle = this._parameters.animateTo, this._rotate(this._angle), this._parameters.callback.call(this._rootObj));
  }, _rotate:function() {
    var c = Math.PI / 180;
    return IE ? function(a) {
      this._angle = a;
      this._container.style.rotation = a % 360 + "deg";
      this._vimage.style.top = -(this._rotationCenterY - this._imgHeight / 2) + "px";
      this._vimage.style.left = -(this._rotationCenterX - this._imgWidth / 2) + "px";
      this._container.style.top = this._rotationCenterY - this._imgHeight / 2 + "px";
      this._container.style.left = this._rotationCenterX - this._imgWidth / 2 + "px";
    } : a ? function(c) {
      this._angle = c;
      this._img.style[a] = "rotate(" + c % 360 + "deg)";
      this._img.style[b] = this._parameters.center.join(" ");
    } : function(a) {
      this._angle = a;
      a = a % 360 * c;
      this._canvas.width = this._width;
      this._canvas.height = this._height;
      this._cnv.translate(this._imgWidth * this._aspectW, this._imgHeight * this._aspectH);
      this._cnv.translate(this._rotationCenterX, this._rotationCenterY);
      this._cnv.rotate(a);
      this._cnv.translate(-this._rotationCenterX, -this._rotationCenterY);
      this._cnv.scale(this._aspectW, this._aspectH);
      this._cnv.drawImage(this._img, 0, 0);
    };
  }()};
  IE && (Wilq32.PhotoEffect.prototype.createVMLNode = function() {
    document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
    try {
      return !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), function(a) {
        return document.createElement("<rvml:" + a + ' class="rvml">');
      };
    } catch (a) {
      return function(a) {
        return document.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
      };
    }
  }());
})(jQuery);
(function(e) {
  function a(a, b) {
    var c = (a & 65535) + (b & 65535);
    return (a >> 16) + (b >> 16) + (c >> 16) << 16 | c & 65535;
  }
  function b(b, c, e, g, m, x) {
    b = a(a(c, b), a(g, x));
    return a(b << m | b >>> 32 - m, e);
  }
  function c(a, c, e, g, m, x, B) {
    return b(c & e | ~c & g, a, c, m, x, B);
  }
  function g(a, c, e, g, m, x, B) {
    return b(c & g | e & ~g, a, c, m, x, B);
  }
  function m(a, c, e, g, m, x, B) {
    return b(e ^ (c | ~g), a, c, m, x, B);
  }
  function t(e, x) {
    e[x >> 5] |= 128 << x % 32;
    e[(x + 64 >>> 9 << 4) + 14] = x;
    var q, u, t, v, B, h = 1732584193, k = -271733879, l = -1732584194, p = 271733878;
    for (q = 0;q < e.length;q += 16) {
      u = h, t = k, v = l, B = p, h = c(h, k, l, p, e[q], 7, -680876936), p = c(p, h, k, l, e[q + 1], 12, -389564586), l = c(l, p, h, k, e[q + 2], 17, 606105819), k = c(k, l, p, h, e[q + 3], 22, -1044525330), h = c(h, k, l, p, e[q + 4], 7, -176418897), p = c(p, h, k, l, e[q + 5], 12, 1200080426), l = c(l, p, h, k, e[q + 6], 17, -1473231341), k = c(k, l, p, h, e[q + 7], 22, -45705983), h = c(h, k, l, p, e[q + 8], 7, 1770035416), p = c(p, h, k, l, e[q + 9], 12, -1958414417), l = c(l, p, h, k, e[q + 
      10], 17, -42063), k = c(k, l, p, h, e[q + 11], 22, -1990404162), h = c(h, k, l, p, e[q + 12], 7, 1804603682), p = c(p, h, k, l, e[q + 13], 12, -40341101), l = c(l, p, h, k, e[q + 14], 17, -1502002290), k = c(k, l, p, h, e[q + 15], 22, 1236535329), h = g(h, k, l, p, e[q + 1], 5, -165796510), p = g(p, h, k, l, e[q + 6], 9, -1069501632), l = g(l, p, h, k, e[q + 11], 14, 643717713), k = g(k, l, p, h, e[q], 20, -373897302), h = g(h, k, l, p, e[q + 5], 5, -701558691), p = g(p, h, k, l, e[q + 10], 
      9, 38016083), l = g(l, p, h, k, e[q + 15], 14, -660478335), k = g(k, l, p, h, e[q + 4], 20, -405537848), h = g(h, k, l, p, e[q + 9], 5, 568446438), p = g(p, h, k, l, e[q + 14], 9, -1019803690), l = g(l, p, h, k, e[q + 3], 14, -187363961), k = g(k, l, p, h, e[q + 8], 20, 1163531501), h = g(h, k, l, p, e[q + 13], 5, -1444681467), p = g(p, h, k, l, e[q + 2], 9, -51403784), l = g(l, p, h, k, e[q + 7], 14, 1735328473), k = g(k, l, p, h, e[q + 12], 20, -1926607734), h = b(k ^ l ^ p, h, k, e[q + 5], 
      4, -378558), p = b(h ^ k ^ l, p, h, e[q + 8], 11, -2022574463), l = b(p ^ h ^ k, l, p, e[q + 11], 16, 1839030562), k = b(l ^ p ^ h, k, l, e[q + 14], 23, -35309556), h = b(k ^ l ^ p, h, k, e[q + 1], 4, -1530992060), p = b(h ^ k ^ l, p, h, e[q + 4], 11, 1272893353), l = b(p ^ h ^ k, l, p, e[q + 7], 16, -155497632), k = b(l ^ p ^ h, k, l, e[q + 10], 23, -1094730640), h = b(k ^ l ^ p, h, k, e[q + 13], 4, 681279174), p = b(h ^ k ^ l, p, h, e[q], 11, -358537222), l = b(p ^ h ^ k, l, p, e[q + 3], 
      16, -722521979), k = b(l ^ p ^ h, k, l, e[q + 6], 23, 76029189), h = b(k ^ l ^ p, h, k, e[q + 9], 4, -640364487), p = b(h ^ k ^ l, p, h, e[q + 12], 11, -421815835), l = b(p ^ h ^ k, l, p, e[q + 15], 16, 530742520), k = b(l ^ p ^ h, k, l, e[q + 2], 23, -995338651), h = m(h, k, l, p, e[q], 6, -198630844), p = m(p, h, k, l, e[q + 7], 10, 1126891415), l = m(l, p, h, k, e[q + 14], 15, -1416354905), k = m(k, l, p, h, e[q + 5], 21, -57434055), h = m(h, k, l, p, e[q + 12], 6, 1700485571), p = m(p, 
      h, k, l, e[q + 3], 10, -1894986606), l = m(l, p, h, k, e[q + 10], 15, -1051523), k = m(k, l, p, h, e[q + 1], 21, -2054922799), h = m(h, k, l, p, e[q + 8], 6, 1873313359), p = m(p, h, k, l, e[q + 15], 10, -30611744), l = m(l, p, h, k, e[q + 6], 15, -1560198380), k = m(k, l, p, h, e[q + 13], 21, 1309151649), h = m(h, k, l, p, e[q + 4], 6, -145523070), p = m(p, h, k, l, e[q + 11], 10, -1120210379), l = m(l, p, h, k, e[q + 2], 15, 718787259), k = m(k, l, p, h, e[q + 9], 21, -343485551), h = a(h, 
      u), k = a(k, t), l = a(l, v), p = a(p, B);
    }
    return [h, k, l, p];
  }
  function A(a) {
    var b, c = "";
    for (b = 0;b < 32 * a.length;b += 8) {
      c += String.fromCharCode(a[b >> 5] >>> b % 32 & 255);
    }
    return c;
  }
  function v(a) {
    var b, c = [];
    c[(a.length >> 2) - 1] = void 0;
    for (b = 0;b < c.length;b += 1) {
      c[b] = 0;
    }
    for (b = 0;b < 8 * a.length;b += 8) {
      c[b >> 5] |= (a.charCodeAt(b / 8) & 255) << b % 32;
    }
    return c;
  }
  function x(a) {
    return A(t(v(a), 8 * a.length));
  }
  function D(a, b) {
    var c, e = v(a), g = [], m = [];
    g[15] = m[15] = void 0;
    16 < e.length && (e = t(e, 8 * a.length));
    for (c = 0;16 > c;c += 1) {
      g[c] = e[c] ^ 909522486, m[c] = e[c] ^ 1549556828;
    }
    c = t(g.concat(v(b)), 512 + 8 * b.length);
    return A(t(m.concat(c), 640));
  }
  function E(a) {
    var b = "", c, e;
    for (e = 0;e < a.length;e += 1) {
      c = a.charCodeAt(e), b += "0123456789abcdef".charAt(c >>> 4 & 15) + "0123456789abcdef".charAt(c & 15);
    }
    return b;
  }
  e.md5 = function(a, b, c) {
    b ? c ? a = D(unescape(encodeURIComponent(b)), unescape(encodeURIComponent(a))) : (a = D(unescape(encodeURIComponent(b)), unescape(encodeURIComponent(a))), a = E(a)) : a = c ? x(unescape(encodeURIComponent(a))) : E(x(unescape(encodeURIComponent(a))));
    return a;
  };
})("function" === typeof jQuery ? jQuery : this);
function _GRCRTInnoFix() {
  $("head").append($("<style/>").append(".island_quests .details_window .collect_units .lbl_troops_rallied {\nline-height: 14px;\n}").append(".place_sim_wrap_mods {\nmin-width: 304px;\n}"));
}
function _GRCRTRepConvForm() {
  this.button = function(e) {
    return $("<div/>").append($("<a/>", {"class":"button", href:"#", style:"display:inline-block; vertical-align: middle;"}).append($("<span/>", {"class":"left"}).append($("<span/>", {"class":"right"}).append($("<span/>", {"class":"middle"}).text(e))))).html();
  };
  this.checkbox = function(e) {
    var a = $("<div/>", {"class":"checkbox_new" + (e.checked ? " checked" : ""), style:"padding: 5px;" + (e.style || "")}).append($("<input/>", {type:"checkbox", name:e.name, id:e.name, checked:e.checked, style:"display: none;"})).append($("<div/>", {"class":"cbx_icon", rel:e.name})).append($("<div/>", {"class":"cbx_caption"}).text(RepConvTool.GetLabel(e.name))).bind("click", function() {
      $(this).toggleClass("checked");
      $(this).find($('input[type="checkbox"]')).attr("checked", $(this).hasClass("checked"));
    });
    void 0 != e.cb && $(a).append($("<br/>", {style:"clear:both"}));
    void 0 != e.sample && $(a).append($("<div/>", {style:"display:" + ("" != e.sample.org || "" != e.sample.grc ? "block" : "none")}).append(e.sample.org).append(e.sample.grc).append($("<br/>")).append($("<br/>", {style:"clear:both"})));
    return $(a);
  };
  this.input = function(e) {
    return $("<div/>", {"class":"textbox", style:e.style}).append($("<div/>", {"class":"left"})).append($("<div/>", {"class":"right"})).append($("<div/>", {"class":"middle"}).append($("<div/>", {"class":"ie7fix"}).append($("<input/>", {type:"text", tabindex:"1", id:e.name, value:e.value}).attr("size", e.size || 10))));
  };
  this.inputMinMax = function(e) {
    return $("<div/>", {"class":"textbox"}).append($("<span/>", {"class":"grcrt_spinner_btn grcrt_spinner_down", rel:e.name}).click(function() {
      var a = $(this).parent().find("#" + $(this).attr("rel"));
      parseInt($(a).attr("min")) < parseInt($(a).attr("value")) && $(a).attr("value", parseInt($(a).attr("value")) - 1);
    })).append($("<div/>", {"class":"textbox", style:e.style}).append($("<div/>", {"class":"left"})).append($("<div/>", {"class":"right"})).append($("<div/>", {"class":"middle"}).append($("<div/>", {"class":"ie7fix"}).append($("<input/>", {type:"text", tabindex:"1", id:e.name, value:e.value, min:e.min, max:e.max}).attr("size", e.size || 10).css("text-align", "right"))))).append($("<span/>", {"class":"grcrt_spinner_btn grcrt_spinner_up", rel:e.name}).click(function() {
      var a = $(this).parent().find("#" + $(this).attr("rel"));
      parseInt($(a).attr("max")) > parseInt($(a).attr("value")) && $(a).attr("value", parseInt($(a).attr("value")) + 1);
    }));
  };
  this.unitMinMax = function(e) {
    return $("<div/>", {"class":"grcrt_abh_unit_wrapper"}).append($("<div/>", {"class":"grcrt_abh_selected_unit unit_icon40x40 unit selected"}).append($("<span/>", {"class":"value grcrt_spiner", min:e.min, max:e.max, id:e.name}).html(e.value)).addClass(e.unit).attr("rel", null != RepConvABH.savedArr[e.tTown] ? RepConvABH.savedArr[e.tTown].unit : "").attr("wndId", e.wndId).mousePopup(new MousePopup(RepConvTool.GetLabel("ABH.RESWND.IMGTOOLTIP")))).append($("<div/>").append($("<span/>", {"class":"grcrt_target_btn grcrt_target_down", 
    rel:e.name}).click(function() {
      var a = $(this).parent().parent().find("#" + $(this).attr("rel") + ".value");
      parseInt($(a).attr("min")) < parseInt($(a).html()) && $(a).html(parseInt($(a).html()) - 1);
    })).append($("<span/>", {"class":"grcrt_target_btn grcrt_target_up", rel:e.name}).click(function() {
      var a = $(this).parent().parent().find("#" + $(this).attr("rel") + ".value");
      parseInt($(a).attr("max")) > parseInt($(a).html()) && $(a).html(parseInt($(a).html()) + 1);
    })));
  };
  this.soundSlider = function(e) {
    return $("<div/>", {id:"grcrt_" + e.name + "_config"}).append($("<div/>", {"class":"slider_container"}).append($("<div/>", {style:"float:left;width:120px;"}).html(RepConvTool.GetLabel("SOUNDVOLUME"))).append(RepConvForm.input({name:"grcrt_" + e.name + "_value", style:"float:left;width:33px;"}).hide()).append($("<div/>", {"class":"windowmgr_slider", style:"width: 200px;float: left;"}).append($("<div/>", {"class":"grepo_slider sound_volume"})))).append($("<script/>", {type:"text/javascript"}).text("RepConv.slider = $('#grcrt_" + 
    e.name + "_config .sound_volume').grepoSlider({\nmin: 0,\nmax: 100,\nstep: 5,\nvalue: " + e.volume + ",\ntemplate: 'tpl_grcrt_slider'\n}).on('sl:change:value', function (e, _sl, value) {\n$('#grcrt_" + e.name + "_value').attr('value',value);\nif (RepConv.audio.test != undefined){\nRepConv.audio.test.volume = value/100;\n}\nRepConvGRC.getGrcrtYTPlayerTest().setVolume(value)\n}),\n$('#grcrt_" + e.name + "_config .button_down').css('background-position','-144px 0px;'),\n$('#grcrt_" + e.name + "_config .button_up').css('background-position','-126px 0px;')\n"));
  };
  $("head").append($("<style/>").append('.grcrt_spinner_btn {background-image: url("' + RepConv.Const.uiImg + 'pm.png");height:20px;width:20px;margin-top: 1px;vertical-align: top;display:inline-block;cursor:pointer;background-position:0px 0px;}').append(".grcrt_spinner_down {background-position:-20px 0px;}").append(".grcrt_spinner_down:hover {background-position: -20px -21px;}").append(".grcrt_spinner_up:hover {background-position: 0 -21px;}")).append($("<script/>", {id:"tpl_grcrt_slider", type:"text/template"}).text('<div class="button_down left js-button-left" style="background-position: -144px 0px;"></div>\n<div class="bar js-slider js-slider-handle-container">\n<div class="border_l"></div>\n<div class="border_r"></div>\n<div class="slider_handle js-slider-handle"></div>\n</div>\n<div class="button_up right js-button-right" style="background-position: -126px 0px;"></div>\n'));
}
function _GRCRTConverterTpl() {
  function e(a, b) {
    RepConv._tmpl = {str:a, data:b};
    var c = /((^|%>)[^\t]*)'/g, c = /\W/.test(a) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(c, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : cache[a] = cache[a] || e(a);
    return b ? c(b) : c;
  }
  this.rct = {};
  this.rcts = {A:{outside:!1, town:"town", player:"player", ally:"ally", island:"island", tag:"quote", fonttag:"monospace", blank:"..........", separator:".", separator3:"...", unitDigits:7, sign:"u", textTown:"", textPlayer:"", textAlly:"", unitSize:"8", getTown:"id", morale:RepConvTool.Adds(RepConv.Const.staticImg + RepConv.Const.morale, "img") + " ", luck:RepConvTool.Adds(RepConv.Const.staticImg + RepConv.Const.luck, "img") + " ", nightbonus:RepConvTool.Adds(RepConv.Const.staticImg + RepConv.Const.nightbonus, 
  "img") + " ", oldwall:RepConvTool.Adds(RepConv.Const.staticImg + RepConv.Const.oldwall, "img") + " ", genImg:RepConv.grcrt_domain + "static/{0}{1}_37_5.png", genImgS:42, genImgM:5, nullImg:RepConv.grcrt_domain + "static/{0}_{1}_{2}.png", doubleline:"[color=#0000ff]======================================================================================================[/color]", singleline:"[color=#0000ff]------------------------------------------------------------------------------------------------------[/color]", 
  tplTableBegin:"[table]", tplTableEnd:"[/table]", tplRowBegin:"", tplRowEnd:"", tplColBegin:"[*]", tplColEnd:"[/*]", tplColSpan2:"[*]", tplColSpan3:"[*]", tplColSpan4:"[*]", tplColSep:"[|]", tplGenImg:RepConv.grcrt_domain + "static/{0}{1}_45_4.png", tplTableNBBegin:"", tplTableNBEnd:"", tplFontBegin:"[font=monospace]", tplFontEnd:"[/font]", tplSize9:"[size=9]", tplSizeEnd:"[/size]", unitWall:15, unitWall2:7, tplBlank:"\u00a0", charLimit:8E3, tagLimit:500, spoiler:"spoiler"}, E:{outside:!0, town:"b", 
  player:"b", ally:"b", island:"b", tag:"code", fonttag:"Courier New", blank:"          ", separator:" ", separator3:"   ", unitDigits:7, sign:"f", textTown:RepConvTool.GetLabel("TOWN"), textPlayer:RepConvTool.GetLabel("PLAYER"), textAlly:RepConvTool.GetLabel("ALLY"), unitSize:"8", getTown:"name", morale:"", luck:"", nightbonus:"", oldwall:"", genImg:RepConv.grcrt_domain + "static/{0}{1}_45_4.png", genImgS:45, genImgM:4, nullImg:RepConv.grcrt_domain + "static/{0}_{1}_{2}.png", doubleline:"[color=#0000ff]=========================================================[/color]", 
  singleline:"[color=#0000ff]---------------------------------------------------------[/color]", tplTableBegin:'[table="width: 710, class: outer_border"]', tplTableEnd:"[/table]", tplRowBegin:"[tr]", tplRowEnd:"[/tr]", tplColBegin:"[td]", tplColEnd:"[/td]", tplColSpan2:'[td="colspan: 2"]', tplColSpan3:'[td="colspan: 3"]', tplColSpan4:'[td="colspan: 4"]', tplColSep:"[/td][td]", tplGenImg:RepConv.grcrt_domain + "static/{0}{1}_45_4.png", tplTableNBBegin:'[tr][td="colspan: 3"]', tplTableNBEnd:"[/td][/tr]", 
  tplFontBegin:"[font=Courier New]", tplFontEnd:"[/font]", tplSize9:"", tplSizeEnd:"", unitWall:15, unitWall2:7, tplBlank:"\u00a0", charLimit:99999, tagLimit:99999, spoiler:"spr"}};
  this.reportText = function(a, b) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    var c, g = !0;
    c = "[b]<%=GRCRTtpl.AddSize(time+title,9)%> (##/##)[/b]\\n<%=GRCRTtpl.rct.doubleline%>\\n";
    switch(a) {
      case "command":
        c += "<%=attacker.town%> <%=attacker.player%>\\n<%=detail.time_title%> <%=detail.time_time%>\\n<%=attacker.units_title%>\\n<%  if (attacker.full.img_url != '') {%><%=attacker.full.img_url%> <%=detail.power_img%>\\n<%  }else{%><%=RepConvTool.GetLabel('NOTUNIT')%>\\n<%  }%><%=GRCRTtpl.rct.singleline%>\\n<%=defender.town%> <%=defender.player%>\\n<%  if(resources.title!=null){%><%=GRCRTtpl.rct.singleline%>\\n<%=GRCRTtpl.AddSize(resources.title,9)%>\\n<%=resources.img_url%>\\n<%  }%>";
        break;
      case "conquer":
      ;
      case "illusion":
        c += "[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('ATTACKER'),10)%>[/b]: <%=attacker.town%> <%=attacker.player%> <%=attacker.ally%> <%=GRCRTtpl.AddSize(morale+' '+luck,8)%>\\n<%=GRCRTtpl.rct.singleline%>\\n[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('DEFENDER'),10)%>[/b]: <%=defender.town%> <%=defender.player%> <%=defender.ally%> <%if(Object.size(oldwall)>0){%><%=GRCRTtpl.AddSize(oldwall[0]+' '+nightbonus,8)%><%}%>\\n<%=GRCRTtpl.rct.singleline%>\\n<%=detail%>\\n";
        break;
      case "raise":
      ;
      case "breach":
      ;
      case "attack":
      ;
      case "take_over":
        c += "[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('ATTACKER'),10)%>[/b]: <%=attacker.town%> <%=attacker.player%> <%=attacker.ally%> <%=GRCRTtpl.AddSize(morale+' '+luck,8)%>\\n<%=attacker.full.img_url%><%=powerAtt%>\\n<%=GRCRTtpl.rct.singleline%>\\n[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('DEFENDER'),10)%>[/b]: <%=defender.town%> <%=defender.player%> <%=defender.ally%> <%if(Object.size(oldwall)>0){%><%=GRCRTtpl.AddSize(oldwall[0]+' '+nightbonus,8)%><%}%>\\n<%=defender.full.img_url%><%=powerDef%>\\n<%=GRCRTtpl.rct.singleline%>\\n<%=GRCRTtpl.AddSize(resources.title,9)%>\\n<%=resources.img_url%>\\n" + 
        ("" != b.bunt ? '<%if ( bunt.length > 0){%><%=GRCRTtpl.rct.singleline%>\\n<%=RepConvTool.Adds(RepConv.Const.bunt,"img")%> <%=bunt%>\\n<%}%>' : "") + "<%=GRCRTtpl.rct.singleline%>\\n" + (b.showCost ? '<%=GRCRTtpl.rct.separator3%><%=RepConvTool.Adds(RepConv.Const.unitImg+GRCRTtpl.rct.sign+"Z1Z2Z3Z4Z5.png","img")%><%=GRCRTtpl.rct.separator3%>[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel(\'LOSSES\'),9)%>[/b]\\n<%if ( attacker.w != undefined ){%><%=GRCRTtpl.AddSize(GRCRTtpl.Value(attacker.w,10)+GRCRTtpl.Value(attacker.s,10)+GRCRTtpl.Value(attacker.i,10)+GRCRTtpl.Value(attacker.p,10)+GRCRTtpl.Value(attacker.f,10)+" [b]"+RepConvTool.GetLabel(\'ATTACKER\')+"[/b]",8)%>\\n<%}%><%=GRCRTtpl.AddSize(GRCRTtpl.Value(defender.w,10)+GRCRTtpl.Value(defender.s,10)+GRCRTtpl.Value(defender.i,10)+GRCRTtpl.Value(defender.p,10)+GRCRTtpl.Value(defender.f,10)+" [b]"+RepConvTool.GetLabel(\'DEFENDER\')+"[/b]",8)%>\\n' : 
        "");
        break;
      case "conqueroldtroops":
        c = "[b]<%=GRCRTtpl.AddSize(command.title,9)%>[/b] (##/##)\\n" + (0 < Object.size(b.linia) ? "=#=#=<%for(ind in linia){%><%=GRCRTtpl.rct.singleline%>\\n<%=linia[ind].img%> <%=linia[ind].inout%> (<%=linia[ind].time%>) <%=linia[ind].text%>\\n=#=#=<%}%>" : "");
        break;
      case "commandList":
        c += "=#=#=<%for(ind in linia){%><%  if (ind > 0){%><%=GRCRTtpl.rct.singleline%>\\n<%  }%><%  if (linia[ind].title.length>0) {%><%=linia[ind].title%>\\n<%  } else {%><%=linia[ind].img%> <%=linia[ind].time%> <%=linia[ind].townIdA.full%> <%=linia[ind].inout%> <%=linia[ind].townIdB.full%>\\n<%=linia[ind].img_url%>  <%=linia[ind].power%>\\n<%  }%>=#=#=<%}%>";
        break;
      case "conquerold":
        c = "[b]<%=GRCRTtpl.AddSize(title+time,9)%>[/b]\\n<%=GRCRTtpl.rct.doubleline%>\\n<%=defender.town%> <%=defender.player%>\\n<%=GRCRTtpl.rct.singleline%>\\n<%=attacker.units_title%>\\n<%=attacker.full.img_url%>\\n";
        break;
      case "support":
        c += "[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('ATTACKER'),10)%>[/b]: <%=attacker.town%> <%=attacker.player%> <%=attacker.ally%> <%=GRCRTtpl.AddSize(morale+' '+luck,8)%>\\n[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('DEFENDER'),10)%>[/b]: <%=defender.town%> <%=defender.player%> <%=defender.ally%> <%if(Object.size(oldwall)>0){%><%=GRCRTtpl.AddSize(oldwall[0]+' '+nightbonus,8)%><%}%>\\n<%=GRCRTtpl.rct.singleline%>\\n<%=attacker.full.img_url%>\\n";
        break;
      case "attackSupport":
        c += "[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('ATTACKER'),10)%>[/b]: <%=attacker.town%> <%=attacker.player%> <%=attacker.ally%> <%=GRCRTtpl.AddSize(morale+' '+luck,8)%>\\n<%=GRCRTtpl.rct.singleline%>\\n[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('DEFENDER'),10)%>[/b]: <%=defender.town%> <%=defender.player%> <%=defender.ally%> <%if(Object.size(oldwall)>0){%><%=GRCRTtpl.AddSize(oldwall[0]+' '+nightbonus,8)%><%}%>\\n<%=defender.full.img_url%><%=powerDef%>\\n<%=GRCRTtpl.rct.singleline%>\\n" + 
        (b.showCost ? '<%=GRCRTtpl.rct.separator3%><%=RepConvTool.Adds(RepConv.Const.unitImg+GRCRTtpl.rct.sign+"Z1Z2Z3Z4Z5.png","img")%><%=GRCRTtpl.rct.separator3%>[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel(\'LOSSES\'),9)%>[/b]\\n<%if ( attacker.w != undefined ){%><%=GRCRTtpl.AddSize(GRCRTtpl.Value(attacker.w,10)+GRCRTtpl.Value(attacker.s,10)+GRCRTtpl.Value(attacker.i,10)+GRCRTtpl.Value(attacker.p,10)+GRCRTtpl.Value(attacker.f,10)+" [b]"+RepConvTool.GetLabel(\'ATTACKER\')+"[/b]",8)%>\\n<%}%><%=GRCRTtpl.AddSize(GRCRTtpl.Value(defender.w,10)+GRCRTtpl.Value(defender.s,10)+GRCRTtpl.Value(defender.i,10)+GRCRTtpl.Value(defender.p,10)+GRCRTtpl.Value(defender.f,10)+" [b]"+RepConvTool.GetLabel(\'DEFENDER\')+"[/b]",8)%>\\n' : 
        "");
        break;
      case "agoraD":
      ;
      case "agoraS":
        c += "=#=#=<%for(ind in linia){%><%  if (ind > 0){%><%=GRCRTtpl.rct.singleline%>\\n<%  }%><%=linia[ind].title%>\\n<%=linia[ind].img_url%>\\n=#=#=<%}%>";
        break;
      case "espionage":
        c += "[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('ATTACKER'),10)%>[/b]: <%=attacker.town%> <%=attacker.player%> <%=attacker.ally%> <%=GRCRTtpl.AddSize(morale+' '+luck,8)%>\\n<%=GRCRTtpl.rct.singleline%>\\n[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('DEFENDER'),10)%>[/b]: <%=defender.town%> <%=defender.player%> <%=defender.ally%> <%if(Object.size(oldwall)>0){%><%=GRCRTtpl.AddSize(oldwall[0]+' '+nightbonus,8)%><%}%>\\n<%if (defender.title != null){%><%=defender.title%>\\n<%=defender.full.img_url%>\\n<%}%><%if (build.title != null){%><%=build.title%>\\n<%=build.full.img_url%>\\n<%}%><%=iron.title%>\\n<%if(iron.count!=\"\"){%><%=RepConvTool.Adds(RepConv.Const.unitImg+\"iron.png\",\"img\")%> <%=GRCRTtpl.AddSize(iron.count,8)%>\\n<%}%><%if (resources.title != \"\"){%><%=GRCRTtpl.AddSize(resources.title,8)%>\\n<%=resources.img_url%>\\n<%}%>";
        break;
      case "powers":
        c += "[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('ATTACKER'),10)%>[/b]: <%=attacker.town%> <%=attacker.player%> <%=attacker.ally%> <%=GRCRTtpl.AddSize(morale+' '+luck,8)%>\\n<%=GRCRTtpl.rct.singleline%>\\n[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('DEFENDER'),10)%>[/b]: <%=defender.town%> <%=defender.player%> <%=defender.ally%> <%if(Object.size(oldwall)>0){%><%=GRCRTtpl.AddSize(oldwall[0]+' '+nightbonus,8)%><%}%>\\n<%=power%>\\n<%=efekt.title%>\\n<%if (efekt.detail != null){%><%=efekt.detail.wrapLine(25)%>\\n<%}%><%if (type == 1){%><%}else if (type == 2){%><%=resources.full.img_url%>\\n<%}else if (type == 3){%><%=resources.img_url%>\\n<%}else if (type == 4){%><%}else if (type == 5){%><%=resources.img_url%>\\n<%}%>";
        break;
      case "wall":
        c = '<%=title%>\\n<%=GRCRTtpl.rct.doubleline%>\\n<%if (defeated.title != ""){%><%=GRCRTtpl.AddSize(defeated.title,10)%>\\n<%  if(defeated.titleAttacker != ""){%><%=GRCRTtpl.AddSize(defeated.titleAttacker,8)%>\\n<%    for(ind in defeated.attacker){%><%=defeated.attacker[ind].img_url%>\\n<%    }%><%  }%><%  if(defeated.titleDefender != ""){%><%=GRCRTtpl.AddSize(defeated.titleDefender,8)%>\\n<%    for(ind in defeated.defender){%><%=defeated.defender[ind].img_url%>\\n<%    }%><%  }%><%}%><%if (losses.title != ""){%><%  if (defeated.title != ""){%><%=GRCRTtpl.rct.doubleline%>\\n<%  }%><%=GRCRTtpl.AddSize(losses.title,10)%>\\n<%  if(losses.titleAttacker != ""){%><%=GRCRTtpl.AddSize(losses.titleAttacker,8)%>\\n<%    for(ind in losses.attacker){%><%=losses.attacker[ind].img_url%>\\n<%    }%><%  }%><%  if(losses.titleDefender != ""){%><%=GRCRTtpl.AddSize(losses.titleDefender,8)%>\\n<%    for(ind in losses.defender){%><%=losses.defender[ind].img_url%>\\n<%    }%><%  }%><%}%>';
        break;
      case "found":
        c += "[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('ATTACKER'),10)%>[/b]: <%=attacker.town%> <%=attacker.player%> <%=attacker.ally%> <%=GRCRTtpl.AddSize(morale+' '+luck,8)%>\\n[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('DEFENDER'),10)%>[/b]: <%=defender.town%> <%=defender.player%> <%=defender.ally%> <%if(Object.size(oldwall)>0){%><%=GRCRTtpl.AddSize(oldwall[0]+' '+nightbonus,8)%><%}%>\\n<%=GRCRTtpl.rct.singleline%>\\n<%=detail%>\\n";
        break;
      case "conquest":
        c = "[b]<%=GRCRTtpl.AddSize(title,9)%>[/b]\\n<%=defender.town%> (<%=time%>)\\n<%=GRCRTtpl.rct.singleline%>\\n[b]<%=GRCRTtpl.AddSize(RepConvTool.GetLabel('ATTACKER'),10)%>[/b]: <%=attacker.town%> <%=attacker.player%> <%=attacker.ally%> <%=GRCRTtpl.AddSize(morale+' '+luck,8)%>\\n<%=GRCRTtpl.rct.singleline%>\\n<%=attacker.units_title%>\\n<%for(ind in attacker.splits){%><%=  attacker.splits[ind].img_url%>\\n<%}%><%=GRCRTtpl.rct.singleline%>\\n[b]<%=GRCRTtpl.AddSize(command.title,9)%>[/b] (##/##)\\n" + 
        (0 < Object.size(b.linia) ? "=#=#=<%for(ind in linia){%><%=GRCRTtpl.rct.singleline%>\\n<%=linia[ind].img%> <%=linia[ind].inout%> (<%=linia[ind].time%>) <%=linia[ind].text%>\\n=#=#=<%}%>" : "");
        break;
      case "academy":
        c += '<%for(ind in linia){%><%=RepConvTool.Adds((GRCRTtpl.rct.tplGenImg).RCFormat(GRCRTtpl.rct.sign, linia[ind].unit_list), "img")%>\\n\\n<%}%>[b]<%=GRCRTtpl.AddSize(points,9)%>[/b]\\n';
        break;
      case "ownTropsInTheCity":
        c += "<%=defender.full.img_url%>\\n";
        break;
      case "bbcode_island":
      ;
      case "bbcode_player":
      ;
      case "bbcode_alliance":
        c = "<%=GRCRTtpl.AddSize(header,9)%> (##/##)\\n=#=#=<%for(ind in linia){%><%=ind%> <%=linia[ind].col1%>. <%=linia[ind].col2%> <%=linia[ind].col3%>\\n=#=#=<%}%>", g = !1;
    }
    c = RepConvTool.Adds(RepConvTool.AddFont(c + (g ? "<%=GRCRTtpl.rct.doubleline%>\\n<%=RepConv.Const.footer%>" : ""), GRCRTtpl.rct.fonttag), GRCRTtpl.rct.tag);
    c = (b.showRT && "" != b.rtrevolt ? "[quote][table]\\n[*][|]<%=defender.town%>[/*]\\n[*]<%=RepConvTool.Adds(RepConv.Const.bunt2,\"img\")%>[||]<%=GRCRTtpl.AddSize(rtrevolt,11)%>[/*]\\n[/table]\\n[table]\\n[*]<%=GRCRTtpl.AddSize(rtlabels.wall,10)%>[||] <%=GRCRTtpl.AddSize(rtwall.toString(),11)%> [|]<%=GRCRTtpl.AddSize(rtlabels.ram,10)%>[||] <%=GRCRTtpl.AddSize(rtram,11)%> [/*]\\n[*]<%=GRCRTtpl.AddSize(rtlabels.tower,10)%>[||] <%=GRCRTtpl.AddSize(rttower,11)%> [|]<%=GRCRTtpl.AddSize(rtlabels.phalanx,10)%>[||] <%=GRCRTtpl.AddSize(rtphalanx,11)%> [/*]\\n[*]<%=GRCRTtpl.AddSize(rtlabels.god,10)%>[||] <%=GRCRTtpl.AddSize(rtgod||'',11)%> [|]<%=GRCRTtpl.AddSize(rtlabels.captain,10)%>[||] <%=GRCRTtpl.AddSize(rtpremium.captain,11)%> [/*]\\n[*]<%=GRCRTtpl.AddSize(rtlabels.cstime,10)%>[||] <%=GRCRTtpl.AddSize(rtcstime,11)%> [|]<%=GRCRTtpl.AddSize(rtlabels.commander,10)%>[||] <%=GRCRTtpl.AddSize(rtpremium.commander,11)%> [/*]\\n[*]<%=GRCRTtpl.AddSize(rtlabels.online,10)%>[||] <%=GRCRTtpl.AddSize(rtonline,11)%> [|]<%=GRCRTtpl.AddSize(rtlabels.priest,10)%>[||] <%=GRCRTtpl.AddSize(rtpremium.priest,11)%> [/*]\\n[/table][/quote]\\n\\n" : 
    "") + c;
    return e(c, b);
  };
  this.reportHtml = function(a, b) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    var c = "", c = "[b]<%=GRCRTtpl.AddSize(time+title,9)%> (##/##)[/b]\\n";
    switch(a) {
      case "command":
        c += GRCRTtpl.rct.tplTableBegin + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(190)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(((attacker.town != undefined) ? attacker.town+'\\n' : '')+((attacker.player != undefined) ? attacker.player+'\\n' : '')+((attacker.ally != undefined) ? attacker.ally+'\\n' : ''),10), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont('[img]'+RepConv.grcrt_cdn+'ui/ragB.png[/img][img]'+RepConv.grcrt_cdn+'ui/5/'+reportImage+'.png[/img][img]'+RepConv.grcrt_cdn+'ui/ragE.png[/img]', GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(((defender.town != undefined) ? defender.town+'\\n' : '')+((defender.player != undefined) ? defender.player+'\\n' : '')+((defender.ally != undefined) ? defender.ally+'\\n' : ''),10), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + 
        (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBBegin : GRCRTtpl.rct.tplTableEnd) + "[center]<%=RepConv.Const.footer%>[/center]" + (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBEnd : GRCRTtpl.rct.tplTableBegin) + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColSpan3%><%=GRCRTtpl.rct.tplFontBegin+GRCRTtpl.rct.tplSize9%><%=detail.time_title%> <%=detail.time_time%>\\n<%=attacker.units_title%>\\n<%  if (attacker.full.img_url != '') {%><%=attacker.full.img_url%> <%=detail.power_img%>\\n<%  }else{%><%=RepConvTool.GetLabel('NOTUNIT')%>\\n<%  }%><%  if(resources.title!=null){%><%=GRCRTtpl.rct.tplFontBegin%>[b]<%=GRCRTtpl.AddSize(resources.title.wrapLine(25),10)%>[/b]<%    if ((resources.img_url||'').length > 0){%>\\n<%=resources.img_url %><%    }%><%=GRCRTtpl.rct.tplFontEnd%><%  }%><%=RepConvTool.addLine(698)%><%=GRCRTtpl.rct.tplSizeEnd+GRCRTtpl.rct.tplFontEnd%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd %>" + 
        GRCRTtpl.rct.tplTableEnd;
        break;
      case "take_over":
        c = (b.showRT && "" != b.rtrevolt ? "<%=GRCRTtpl.rct.tplTableBegin + GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.Adds(RepConv.Const.bunt2,\"img\")%><%=GRCRTtpl.rct.tplColSep%><%  if(GRCRTtpl.rct.outside){%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(defender.town,11)+'\\n'+GRCRTtpl.AddSize(rtrevolt,10)+'\\n', GRCRTtpl.rct.fonttag)%><%  }else{%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(defender.town,11)+'\\n'+GRCRTtpl.AddSize(rtrevolt,10)+'\\n'+RepConvTool.addLine(200), GRCRTtpl.rct.fonttag)%><%  }%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.Adds(RepConv.Const.unitImg+GRCRTtpl.rct.sign+\"G2_32_5.png\",\"img\")%><%=GRCRTtpl.rct.tplColSep%><%  if(GRCRTtpl.rct.outside){%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(rtlabels.cstime,10)+'\\n'+GRCRTtpl.AddSize(rtcstime,11)+'\\n', GRCRTtpl.rct.fonttag)%><%  }else{%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(rtlabels.cstime,10)+'\\n'+GRCRTtpl.AddSize(rtcstime,11)+'\\n'+RepConvTool.addLine(120), GRCRTtpl.rct.fonttag)%><%  }%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.Adds(RepConv.Const.uiImg + 'c/attack.png',\"img\")%><%=GRCRTtpl.rct.tplColSep%><%  if(GRCRTtpl.rct.outside){%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(GRCRTtpl.Unit(unit_movements.attack,4).replace(/\\./g,GRCRTtpl.rct.tplBlank),10)+'\\n', GRCRTtpl.rct.fonttag)%><%  }else{%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(GRCRTtpl.Unit(unit_movements.attack,4).replace(/\\./g,GRCRTtpl.rct.tplBlank),10)+'\\n'+RepConvTool.addLine(40), GRCRTtpl.rct.fonttag)%><%  }%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.Adds(RepConv.Const.uiImg + 'c/support.png',\"img\")%><%=GRCRTtpl.rct.tplColSep%><%  if(GRCRTtpl.rct.outside){%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(GRCRTtpl.Unit(unit_movements.support,4).replace(/\\./g,GRCRTtpl.rct.tplBlank),10)+'\\n', GRCRTtpl.rct.fonttag)%><%  }else{%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(GRCRTtpl.Unit(unit_movements.support,4).replace(/\\./g,GRCRTtpl.rct.tplBlank),10)+'\\n'+RepConvTool.addLine(40), GRCRTtpl.rct.fonttag)%><%  }%><%=GRCRTtpl.rct.tplColSep%><%  if(GRCRTtpl.rct.outside){%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(rtlabels.online,10)+'\\n[b]'+GRCRTtpl.AddSize(rtonline,11)+'[/b]'+'\\n', GRCRTtpl.rct.fonttag)%><%  }else{%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(rtlabels.online,10)+'\\n[b]'+GRCRTtpl.AddSize(rtonline,11)+'[/b]'+'\\n'+RepConvTool.addLine(98), GRCRTtpl.rct.fonttag)%><%  }%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd + GRCRTtpl.rct.tplTableEnd%><%=GRCRTtpl.rct.tplTableBegin + GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.AddFont(RepConvTool.Adds(RepConv.Const.unitImg+GRCRTtpl.rct.sign+rtimg+\"_45_7.png\",\"img\")+\" \"+RepConvTool.Adds(RepConv.Const.uiImg+\"5/\"+rtgodid+\".png\",\"img\")+GRCRTtpl.AddSize((rtgod||'').replace(/\\./g,GRCRTtpl.rct.tplBlank),15)+'\\n'+RepConvTool.addLine(698), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd + GRCRTtpl.rct.tplTableEnd%>" : 
        "") + c;
      case "raise":
      ;
      case "breach":
      ;
      case "attack":
        c += GRCRTtpl.rct.tplTableBegin + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(190)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(((attacker.town != undefined) ? attacker.town+'\\n' : '')+((attacker.player != undefined) ? attacker.player+'\\n' : '')+((attacker.ally != undefined) ? attacker.ally+'\\n' : ''),10), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont('[img]'+RepConv.grcrt_cdn+'ui/ragB.png[/img][img]'+RepConv.grcrt_cdn+'ui/5/'+reportImage+'.png[/img][img]'+RepConv.grcrt_cdn+'ui/ragE.png[/img]', GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(((defender.town != undefined) ? defender.town+'\\n' : '')+((defender.player != undefined) ? defender.player+'\\n' : '')+((defender.ally != undefined) ? defender.ally+'\\n' : ''),10), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + 
        (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBBegin : GRCRTtpl.rct.tplTableEnd) + "[center]<%=RepConv.Const.footer%>[/center]" + (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBEnd : GRCRTtpl.rct.tplTableBegin) + GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin + "<%if(powerAtt.length>0){%><%=powerAtt%>\\n<%}%><%=GRCRTtpl.rct.tplFontBegin+GRCRTtpl.rct.tplSize9%>\\n<%=morale%>\\n<%=luck%>\\n<%=GRCRTtpl.rct.tplSizeEnd+GRCRTtpl.rct.tplFontEnd%><%=GRCRTtpl.rct.tplFontBegin+GRCRTtpl.rct.tplSize9%><%for(idx in attacker.splits){%><%=attacker.splits[idx].img_url %>\\n<%}%><%=GRCRTtpl.rct.tplSizeEnd+GRCRTtpl.rct.tplFontEnd%>" + 
        GRCRTtpl.rct.tplColSep + "[center]<%=GRCRTtpl.rct.tplFontBegin%>[b]<%=GRCRTtpl.AddSize(resources.title.wrapLine(25),10)%>[/b]\\n<%=resources.img_url %><%=GRCRTtpl.rct.tplFontEnd%>[/center]\\n" + ("" != b.bunt ? "[center]<%=GRCRTtpl.rct.tplFontBegin%>\\n[b]<%=GRCRTtpl.AddSize(bunt.wrapLine(25),10)%>[/b]\\n<%=GRCRTtpl.rct.tplFontEnd%>[/center]" : "") + (b.showCost ? "[center]<%=GRCRTtpl.rct.tplFontBegin%>\\n<%=GRCRTtpl.Value(attacker.w.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\u00a0[img]<%= RepConv.grcrt_cdn %>ui/wood.png[/img]\u00a0<%=GRCRTtpl.Value(defender.w.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\\n<%=GRCRTtpl.Value(attacker.s.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\u00a0[img]<%= RepConv.grcrt_cdn %>ui/stone.png[/img]\u00a0<%=GRCRTtpl.Value(defender.s.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\\n<%=GRCRTtpl.Value(attacker.i.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\u00a0[img]<%= RepConv.grcrt_cdn %>ui/iron.png[/img]\u00a0<%=GRCRTtpl.Value(defender.i.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\\n<%=GRCRTtpl.Value(attacker.f.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\u00a0[img]<%= RepConv.grcrt_cdn %>ui/power.png[/img]\u00a0<%=GRCRTtpl.Value(defender.f.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\\n<%=GRCRTtpl.Value(attacker.p.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\u00a0[img]<%= RepConv.grcrt_cdn %>ui/pop.png[/img]\u00a0<%=GRCRTtpl.Value(defender.p.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%><%=GRCRTtpl.rct.tplFontEnd%>[/center]\\n" : 
        "") + GRCRTtpl.rct.tplColSep + "<%if(powerDef.length>0){%><%=powerDef%>\\n<%}%><%=GRCRTtpl.rct.tplFontBegin+GRCRTtpl.rct.tplSize9%>\\n<%for(idx in oldwall){%><%=oldwall[idx]%> \\n<%}%><%=nightbonus%> \\n<%=GRCRTtpl.rct.tplSizeEnd+GRCRTtpl.rct.tplFontEnd%><%=GRCRTtpl.rct.tplFontBegin+GRCRTtpl.rct.tplSize9%><%for(idx in defender.splits){%><%=defender.splits[idx].img_url %>\\n<%}%><%=GRCRTtpl.rct.tplSizeEnd+GRCRTtpl.rct.tplFontEnd%>" + GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(190)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + 
        GRCRTtpl.rct.tplTableEnd;
        break;
      case "conqueroldtroops":
        c = GRCRTtpl.rct.tplTableBegin + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.addLine(32)%><%=GRCRTtpl.rct.tplColSep%><%=GRCRTtpl.rct.tplFontBegin %>[b]<%=GRCRTtpl.AddSize(command.title,10)%>[/b] (##/##)\\n<%=RepConvTool.addLine(302)%><%=GRCRTtpl.rct.tplFontEnd %><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(32)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(302)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + (0 < Object.size(b.linia) ? "=#=#=<%for(xx = 0; xx < Object.size(linia); xx+=2){%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=linia[xx].img%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont(GRCRTtpl.AddSize('('+linia[xx].time+')\\n'+linia[xx].text,8), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%  if(Object.size(linia[xx+1])>0){%><%=linia[xx+1].img%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont(GRCRTtpl.AddSize('('+linia[xx+1].time+')\\n'+linia[xx+1].text,8), GRCRTtpl.rct.fonttag)%><%  } else {%><%=GRCRTtpl.rct.tplColSep%><%  }%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>=#=#=<%}%>" : 
        "") + GRCRTtpl.rct.tplTableEnd + "[center]<%=RepConv.Const.footer%>[/center]";
        break;
      case "commandList":
        c += GRCRTtpl.rct.tplTableBegin + "=#=#=<%for(ind in linia){%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%  if (linia[ind].title.length>0) {%><%=GRCRTtpl.rct.tplColSep%>[b]<%=GRCRTtpl.AddSize(linia[ind].title,10)%>[/b]<%=GRCRTtpl.rct.tplColSep%><%=GRCRTtpl.rct.tplColSep%><%  } else {%><%=linia[ind].img%><%=GRCRTtpl.rct.tplColSep%><%=GRCRTtpl.rct.tplFontBegin%><%=linia[ind].townIdA.full%> <%=linia[ind].inout%> <%=linia[ind].townIdB.full%>\\n<%=linia[ind].time%><%=GRCRTtpl.rct.tplFontEnd%><%=GRCRTtpl.rct.tplColSep%><%=linia[ind].power%><%=GRCRTtpl.rct.tplColSep%><%=linia[ind].img_url%>\\n<%  }%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>=#=#=<%}%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.addLine(35)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(380)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(25)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(265)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + 
        GRCRTtpl.rct.tplTableEnd + "[center]<%=RepConv.Const.footer%>[/center]";
        break;
      case "conquerold":
        c = GRCRTtpl.rct.tplTableBegin + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColSpan4%><%=GRCRTtpl.rct.tplFontBegin + GRCRTtpl.rct.tplSize9 %>[b]<%=title%>[/b]\\n<%=defender.town%> <%=time%>\\n<%=attacker.units_title%>\\n<%=attacker.full.img_url%>\\n<%=RepConvTool.addLine(698)%><%=GRCRTtpl.rct.tplSizeEnd + GRCRTtpl.rct.tplFontEnd%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + GRCRTtpl.rct.tplTableEnd + "[center]<%=RepConv.Const.footer%>[/center]";
        break;
      case "support":
        c += GRCRTtpl.rct.tplTableBegin + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(190)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(((attacker.town != undefined) ? attacker.town+'\\n' : '')+((attacker.player != undefined) ? attacker.player+'\\n' : '')+((attacker.ally != undefined) ? attacker.ally+'\\n' : ''),10), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont('[img]'+RepConv.grcrt_cdn+'ui/ragB.png[/img][img]'+RepConv.grcrt_cdn+'ui/5/'+reportImage+'.png[/img][img]'+RepConv.grcrt_cdn+'ui/ragE.png[/img]', GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(((defender.town != undefined) ? defender.town+'\\n' : '')+((defender.player != undefined) ? defender.player+'\\n' : '')+((defender.ally != undefined) ? defender.ally+'\\n' : ''),10), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + 
        (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBBegin : GRCRTtpl.rct.tplTableEnd) + "[center]<%=RepConv.Const.footer%>[/center]" + (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBEnd : GRCRTtpl.rct.tplTableBegin) + GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColSpan3 + "<%=GRCRTtpl.rct.tplFontBegin+GRCRTtpl.rct.tplSize9%><%for(idx in attacker.splits){%><%=attacker.splits[idx].img_url %>\\n<%}%><%=GRCRTtpl.rct.tplSizeEnd+GRCRTtpl.rct.tplFontEnd%>" + GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd + 
        "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(190)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + GRCRTtpl.rct.tplTableEnd;
        break;
      case "attackSupport":
        c += GRCRTtpl.rct.tplTableBegin + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(190)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(((attacker.town != undefined) ? attacker.town+'\\n' : '')+((attacker.player != undefined) ? attacker.player+'\\n' : '')+((attacker.ally != undefined) ? attacker.ally+'\\n' : ''),10), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont('[img]'+RepConv.grcrt_cdn+'ui/ragB.png[/img][img]'+RepConv.grcrt_cdn+'ui/5/'+reportImage+'.png[/img][img]'+RepConv.grcrt_cdn+'ui/ragE.png[/img]', GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(((defender.town != undefined) ? defender.town+'\\n' : '')+((defender.player != undefined) ? defender.player+'\\n' : '')+((defender.ally != undefined) ? defender.ally+'\\n' : ''),10), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + 
        (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBBegin : GRCRTtpl.rct.tplTableEnd) + "[center]<%=RepConv.Const.footer%>[/center]" + (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBEnd : GRCRTtpl.rct.tplTableBegin) + GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin + GRCRTtpl.rct.tplColSep + (b.showCost ? "[center]<%=GRCRTtpl.rct.tplFontBegin%>\\n<%=GRCRTtpl.Value(attacker.w.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\u00a0[img]<%= RepConv.grcrt_cdn %>ui/wood.png[/img]\u00a0<%=GRCRTtpl.Value(defender.w.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\\n<%=GRCRTtpl.Value(attacker.s.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\u00a0[img]<%= RepConv.grcrt_cdn %>ui/stone.png[/img]\u00a0<%=GRCRTtpl.Value(defender.s.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\\n<%=GRCRTtpl.Value(attacker.i.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\u00a0[img]<%= RepConv.grcrt_cdn %>ui/iron.png[/img]\u00a0<%=GRCRTtpl.Value(defender.i.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\\n<%=GRCRTtpl.Value(attacker.f.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\u00a0[img]<%= RepConv.grcrt_cdn %>ui/power.png[/img]\u00a0<%=GRCRTtpl.Value(defender.f.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\\n<%=GRCRTtpl.Value(attacker.p.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%>\u00a0[img]<%= RepConv.grcrt_cdn %>ui/pop.png[/img]\u00a0<%=GRCRTtpl.Value(defender.p.toString(),7).replace(/\\./g,GRCRTtpl.rct.tplBlank)%><%=GRCRTtpl.rct.tplFontEnd%>[/center]\\n" : 
        "") + GRCRTtpl.rct.tplColSep + "<%=GRCRTtpl.rct.tplFontBegin+GRCRTtpl.rct.tplSize9%><%for(idx in defender.splits){%><%=defender.splits[idx].img_url %>\\n<%}%><%=GRCRTtpl.rct.tplSizeEnd+GRCRTtpl.rct.tplFontEnd%>" + GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(190)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + 
        GRCRTtpl.rct.tplTableEnd;
        break;
      case "agoraD":
      ;
      case "agoraS":
        c += GRCRTtpl.rct.tplTableBegin + "=#=#=<%for(ind in linia){%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin + GRCRTtpl.rct.tplFontBegin + GRCRTtpl.rct.tplSize9%><%=linia[ind].title%>\\n<%=RepConvTool.addLine(698)%>\\n<%=linia[ind].img_url%><%=GRCRTtpl.rct.tplSizeEnd + GRCRTtpl.rct.tplFontEnd + GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>=#=#=<%}%>" + (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBBegin : GRCRTtpl.rct.tplTableEnd) + "[center]<%=RepConv.Const.footer%>[/center]" + 
        (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBEnd + GRCRTtpl.rct.tplTableEnd : "");
        break;
      case "espionage":
        c += GRCRTtpl.rct.tplTableBegin + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(190)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(((attacker.town != undefined) ? attacker.town+'\\n' : '')+((attacker.player != undefined) ? attacker.player+'\\n' : '')+((attacker.ally != undefined) ? attacker.ally+'\\n' : ''),10), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont('[img]'+RepConv.grcrt_cdn+'ui/ragB.png[/img][img]'+RepConv.grcrt_cdn+'ui/5/'+reportImage+'.png[/img][img]'+RepConv.grcrt_cdn+'ui/ragE.png[/img]', GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(((defender.town != undefined) ? defender.town+'\\n' : '')+((defender.player != undefined) ? defender.player+'\\n' : '')+((defender.ally != undefined) ? defender.ally+'\\n' : ''),10), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + 
        (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBBegin : GRCRTtpl.rct.tplTableEnd) + "[center]<%=RepConv.Const.footer%>[/center]" + (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBEnd : GRCRTtpl.rct.tplTableBegin) + GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColSpan2 + GRCRTtpl.rct.tplFontBegin + GRCRTtpl.rct.tplSize9 + "<%if (defender.title != null){%>[b]<%=defender.title%>[/b]\\n<%      for(idx in defender.splits){%><%=defender.splits[idx].img_url %>\\n<%      }%><%}%><%if (build.title != null){%>[b]<%=build.title%>[/b]\\n<%      for(idx in build.splits){%><%=build.splits[idx].img_url %>\\n<%      }%><%}%>" + 
        GRCRTtpl.rct.tplSizeEnd + GRCRTtpl.rct.tplFontEnd + GRCRTtpl.rct.tplColSep + GRCRTtpl.rct.tplFontBegin + GRCRTtpl.rct.tplSize9 + '[b]<%=iron.title%>[/b]\\n<%if(iron.count!=""){%><%=RepConvTool.Adds(RepConv.Const.uiImg + "5/coins.png", "img")%> [b]<%=GRCRTtpl.AddSize(iron.count,12)%>[/b]\\n<%}%><%if (resources.title != ""){%>\\n\\n[b]<%=resources.title%>[/b]\\n<%=resources.img_url%>\\n<%}%>' + GRCRTtpl.rct.tplSizeEnd + GRCRTtpl.rct.tplFontEnd + GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd + 
        "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColSpan2%><%=RepConvTool.addLine(472)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(218)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + GRCRTtpl.rct.tplTableEnd;
        break;
      case "powers":
        c += GRCRTtpl.rct.tplTableBegin + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(190)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(((attacker.town != undefined) ? attacker.town+'\\n' : '')+((attacker.player != undefined) ? attacker.player+'\\n' : '')+((attacker.ally != undefined) ? attacker.ally+'\\n' : ''),10), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont('[img]'+RepConv.grcrt_cdn+'ui/ragB.png[/img][img]'+RepConv.grcrt_cdn+'ui/5/'+reportImage+'.png[/img][img]'+RepConv.grcrt_cdn+'ui/ragE.png[/img]', GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(((defender.town != undefined) ? defender.town+'\\n' : '')+((defender.player != undefined) ? defender.player+'\\n' : '')+((defender.ally != undefined) ? defender.ally+'\\n' : ''),10), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + 
        (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBBegin : GRCRTtpl.rct.tplTableEnd) + "[center]<%=RepConv.Const.footer%>[/center]" + (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBEnd : GRCRTtpl.rct.tplTableBegin) + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.AddFont(GRCRTtpl.AddSize('[b]'+powerinfo.name.wrapLine(26)+'[/b]\\n\\n'+powerinfo.description.wrapLine(31),11)+'\\n'+RepConvTool.addLine(245), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=GRCRTtpl.rct.tplFontBegin%>[center]<%=RepConvTool.Adds(RepConv.Const.uiImg + '8/' + powerinfo.id + '.png',\"img\") %>[/center]\\n<%=RepConvTool.addLine(190)%><%=GRCRTtpl.rct.tplFontEnd%><%=GRCRTtpl.rct.tplColSep%><%=GRCRTtpl.rct.tplFontBegin+GRCRTtpl.rct.tplSize9%><%if (efekt.detail != null){%>[b]<%=efekt.detail.wrapLine(25)%>[/b]\\n<%}%><%if (type == 1){%><%}else if (type == 2){%><%  for(idx in resources.splits){%><%=resources.splits[idx].img_url %>\\n<%  }%><%}else if (type == 3){%><%=resources.img_url%>\\n<%}else if (type == 4){%><%}else if (type == 5){%><%=resources.img_url%>\\n<%}%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplSizeEnd+GRCRTtpl.rct.tplFontEnd%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd %>" + 
        GRCRTtpl.rct.tplTableEnd;
        break;
      case "wall":
        c = this.rct.tplTableBegin + '<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin %>[b]<%=GRCRTtpl.AddSize(title,12)%>[/b]\\n<%=RepConvTool.addLine(340)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(25)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(340)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=  GRCRTtpl.AddSize(defeated.title,12) + GRCRTtpl.rct.tplColSep + GRCRTtpl.rct.tplColSep + GRCRTtpl.AddSize(losses.title,12)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%><%  if(defeated.titleAttacker != "" || losses.titleAttacker != ""){%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=  GRCRTtpl.rct.tplFontBegin + GRCRTtpl.rct.tplSize9 %><%    if(defeated.titleAttacker != ""){%>[b]<%=defeated.titleAttacker%>[/b]\\n<%      for(ind = 0; ind < Math.max(Object.size(defeated.attacker), Object.size(losses.attacker)); ind++){%><%        if(defeated.attacker[ind] != undefined){%><%=  defeated.attacker[ind].img_url%>\\n<%        } else {%><%=  emptyline%><%        }%><%      }%><%    }%><%=GRCRTtpl.rct.tplSizeEnd + GRCRTtpl.rct.tplFontEnd%><%=GRCRTtpl.rct.tplColSep%><%=GRCRTtpl.rct.tplColSep%><%=GRCRTtpl.rct.tplFontBegin + GRCRTtpl.rct.tplSize9 %><%    if(losses.titleAttacker != ""){%>[b]<%=losses.titleAttacker%>[/b]\\n<%      for(ind = 0; ind < Math.max(Object.size(defeated.attacker), Object.size(losses.attacker)); ind++){%><%        if(losses.attacker[ind] != undefined){%><%=  losses.attacker[ind].img_url%>\\n<%        } else {%><%=  emptyline%><%        }%><%      }%><%    }%><%=GRCRTtpl.rct.tplSizeEnd + GRCRTtpl.rct.tplFontEnd%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%><%  }%><%  if(defeated.titleDefender != "" || losses.titleDefender != ""){%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=GRCRTtpl.rct.tplFontBegin + GRCRTtpl.rct.tplSize9 %><%    if(defeated.titleDefender != ""){%>[b]<%=defeated.titleDefender%>[/b]\\n<%      for(ind = 0; ind < Math.max(Object.size(defeated.defender), Object.size(losses.defender)); ind++){%><%        if(defeated.defender[ind] != undefined){%><%=  defeated.defender[ind].img_url%>\\n<%        } else {%><%=  emptyline%><%        }%><%      }%><%    }%><%=GRCRTtpl.rct.tplSizeEnd + GRCRTtpl.rct.tplFontEnd%><%=GRCRTtpl.rct.tplColSep%><%=GRCRTtpl.rct.tplColSep%><%=GRCRTtpl.rct.tplFontBegin + GRCRTtpl.rct.tplSize9 %><%    if(losses.titleDefender != ""){%>[b]<%=losses.titleDefender%>[/b]\\n<%      for(ind = 0; ind < Math.max(Object.size(defeated.defender), Object.size(losses.defender)); ind++){%><%        if(losses.defender[ind] != undefined){%><%=  losses.defender[ind].img_url%>\\n<%        } else {%><%=  emptyline%><%        }%><%      }%><%    }%><%=GRCRTtpl.rct.tplSizeEnd + GRCRTtpl.rct.tplFontEnd%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%><%  }%>' + 
        this.rct.tplTableEnd + "[center]<%=RepConv.Const.footer%>[/center]";
        break;
      case "conquer":
      ;
      case "illusion":
      ;
      case "found":
        c += GRCRTtpl.rct.tplTableBegin + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(190)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(245)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(((attacker.town != undefined) ? attacker.town+'\\n' : '')+((attacker.player != undefined) ? attacker.player+'\\n' : '')+((attacker.ally != undefined) ? attacker.ally+'\\n' : ''),10), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont('[img]'+RepConv.grcrt_cdn+'ui/ragB.png[/img][img]'+RepConv.grcrt_cdn+'ui/5/'+reportImage+'.png[/img][img]'+RepConv.grcrt_cdn+'ui/ragE.png[/img]', GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont(GRCRTtpl.AddSize(((defender.town != undefined) ? defender.town+'\\n' : '')+((defender.player != undefined) ? defender.player+'\\n' : '')+((defender.ally != undefined) ? defender.ally+'\\n' : ''),10), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + 
        (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBBegin : GRCRTtpl.rct.tplTableEnd) + "[center]<%=RepConv.Const.footer%>[/center]" + (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBEnd : GRCRTtpl.rct.tplTableBegin) + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColSpan3%><%=detail%>\\n<%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd %><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColSpan3%><%=RepConvTool.addLine(698)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd %>" + GRCRTtpl.rct.tplTableEnd;
        break;
      case "conquest":
        c = GRCRTtpl.rct.tplTableBegin + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColSpan4%><%=GRCRTtpl.rct.tplFontBegin %>[b]<%=title%>[/b]\\n<%=defender.town%> (<%=time%>)\\n[b]<%=RepConvTool.GetLabel('ATTACKER')%>[/b]: <%=attacker.player%> <%=GRCRTtpl.rct.tplFontEnd%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColSpan4%><%=GRCRTtpl.rct.tplFontBegin + GRCRTtpl.rct.tplSize9 %><%=attacker.title%>\\n<%for(ind in attacker.splits){%><%=  attacker.splits[ind].img_url%>\\n<%}%><%=RepConvTool.addLine(698)%><%=GRCRTtpl.rct.tplSizeEnd + GRCRTtpl.rct.tplFontEnd%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + 
        (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColSpan4 : GRCRTtpl.rct.tplTableEnd) + "[center]<%=RepConv.Const.footer%>[/center]" + (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBEnd : GRCRTtpl.rct.tplTableBegin) + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=RepConvTool.addLine(32)%><%=GRCRTtpl.rct.tplColSep%><%=GRCRTtpl.rct.tplFontBegin %>[b]<%=GRCRTtpl.AddSize(command.title,10)%>[/b] (##/##)\\n<%=RepConvTool.addLine(302)%><%=GRCRTtpl.rct.tplFontEnd %><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(32)%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.addLine(302)%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + 
        (0 < Object.size(b.linia) ? "=#=#=<%for(xx = 0; xx < Object.size(linia); xx+=2){%><%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin%><%=linia[xx].img%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont(GRCRTtpl.AddSize('('+linia[xx].time+')\\n'+linia[xx].text,8), GRCRTtpl.rct.fonttag)%><%=GRCRTtpl.rct.tplColSep%><%  if(Object.size(linia[xx+1])>0){%><%=linia[xx+1].img%><%=GRCRTtpl.rct.tplColSep%><%=RepConvTool.AddFont(GRCRTtpl.AddSize('('+linia[xx+1].time+')\\n'+linia[xx+1].text,8), GRCRTtpl.rct.fonttag)%><%  } else {%><%=GRCRTtpl.rct.tplColSep%><%  }%><%=GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>=#=#=<%}%>" : 
        "") + GRCRTtpl.rct.tplTableEnd;
        break;
      case "academy":
        c += GRCRTtpl.rct.tplTableBegin + '<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin + GRCRTtpl.rct.tplFontBegin%><%for(ind in linia){%><%=RepConvTool.Adds((GRCRTtpl.rct.tplGenImg).RCFormat(GRCRTtpl.rct.sign, linia[ind].unit_list), "img")%>\\n<%}%><%=RepConvTool.addLine(698)%>\\n[b]<%=GRCRTtpl.AddSize(points,9)%>[/b]<%=GRCRTtpl.rct.tplFontEnd + GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>' + (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBBegin : GRCRTtpl.rct.tplTableEnd) + "[center]<%=RepConv.Const.footer%>[/center]" + 
        (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBEnd + GRCRTtpl.rct.tplTableEnd : "");
        break;
      case "ownTropsInTheCity":
        c += GRCRTtpl.rct.tplTableBegin + "<%=GRCRTtpl.rct.tplRowBegin + GRCRTtpl.rct.tplColBegin + GRCRTtpl.rct.tplFontBegin%><%=RepConvTool.addLine(698)%>\\n<%=defender.full.img_url %>\\n<%=GRCRTtpl.rct.tplFontEnd + GRCRTtpl.rct.tplColEnd + GRCRTtpl.rct.tplRowEnd%>" + (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBBegin : GRCRTtpl.rct.tplTableEnd) + "[center]<%=RepConv.Const.footer%>[/center]" + (GRCRTtpl.rct.outside ? GRCRTtpl.rct.tplTableNBEnd + GRCRTtpl.rct.tplTableEnd : "");
        break;
      case "bbcode_island":
      ;
      case "bbcode_player":
      ;
      case "bbcode_alliance":
        c = "<%=GRCRTtpl.AddSize(header,9)%> (##/##)\\n<%=GRCRTtpl.rct.tplTableBegin%>=#=#=<%for(ind in linia){%><%=GRCRTtpl.rct.tplRowBegin%><%=GRCRTtpl.rct.tplColBegin%><%=ind%>.<%=GRCRTtpl.rct.tplColSep%><%=linia[ind].col1%><%=GRCRTtpl.rct.tplColSep%><%=linia[ind].col2%><%=GRCRTtpl.rct.tplColSep%><%=linia[ind].col3%><%=GRCRTtpl.rct.tplColEnd%><%=GRCRTtpl.rct.tplRowEnd%>\\n=#=#=<%}%><%=GRCRTtpl.rct.tplTableEnd%>";
    }
    return e(RepConvTool.Adds(c, GRCRTtpl.rct.tag), b);
  };
  this.report = function(a, b, c) {
    a = "txt" == a ? this.reportText(b, c) : this.reportHtml(b, c);
    RepConv.Debug && console.log(a);
    b = a.split("=#=#=");
    c = b[0];
    for (var e = b[b.length - 1], m = [], t = c, A = 1;A < b.length - 1;A++) {
      if (((t + b[A] + e).match(/\[/g) || []).length >= this.rct.tagLimit || (t + b[A] + e).length >= this.rct.charLimit) {
        m.push(t + e), t = c;
      }
      t += b[A];
    }
    t != c && m.push(t + e);
    1 == b.length && m.push(a.replace(" (##/##)", ""));
    $.each(m, function(a, b) {
      m[a] = b.replace("##/##", a + 1 + "/" + Object.size(m));
    });
    RepConv.Debug && console.log(m);
    return m;
  };
  this.AddSize = function(a, b) {
    return 0 < a.length && this.rcts.A == this.rct ? "[size=" + b + "]" + a + "[/size]" : a;
  };
  this.White = function(a, b) {
    return this.rct.blank.slice(1, b - a.length);
  };
  this.Color = function(a, b) {
    return "[color=#" + b + "]" + a + "[/color]";
  };
  this.Unit = function(a, b) {
    RepConv.Debug && console.log(a);
    return this.White(a, this.rct.unitDigits) + a;
  };
  this.Value = function(a, b) {
    return this.White(String(a), b) + String(a);
  };
  this.tmpl = function(a, b) {
    return e(a, b);
  };
  $("head").append($("<style/>").append(".grcrt_frame .checkbox_new {display: block;}"));
  RepConv.initArray.push("GRCRTtpl.init()");
  RepConv.wndArray.push("grcrt_convert");
  this.init = function() {
    new _grcrtWindowConvert;
  };
}
function _grcrtWindowConvert() {
  require("game/windows/ids").GRCRT_CONVERT = "grcrt_convert";
  (function() {
    var e = window.GameControllers.TabController.extend({render:function() {
      var a = this.getWindowModel(), b = $("<div/>").css({margin:"10px"});
      this.$el.html(b);
      a.hideLoading();
      a.getJQElement || (a.getJQElement = function() {
        return b;
      });
      a.appendContent || (a.appendContent = function(a) {
        return b.append(a);
      });
    }});
    window.GameViews.GrcRTView_grcrt_convert = e;
  })();
  (function() {
    var e = window.GameViews, a = window.WindowFactorySettings, b = require("game/windows/ids"), c = require("game/windows/tabs"), g = b.GRCRT_CONVERT;
    a[g] = function(a) {
      a = a || {};
      return us.extend({window_type:g, minheight:575, maxheight:575, width:870, tabs:[{type:c.INDEX, title:"none", content_view_constructor:e.GrcRTView_grcrt_convert, hidden:!0}], max_instances:1, activepagenr:0, minimizable:!1, resizable:!1, title:RepConv.Scripts_name}, a);
    };
  })();
}
function _GRCRTConverterCtrl(e) {
  function a(d, a, b) {
    return $("<div/>", {"class":"checkbox_new"}).checkbox({caption:RepConvTool.GetLabel(b || d), checked:a, cid:d}).on("cbx:check", function() {
      ua();
    });
  }
  function b(d, a, b, f) {
    $.each(d, function(d, e) {
      c(e, a, b, f);
    });
  }
  function c(d, a, b, f) {
    if ("undefined" != typeof d.ua && 0 < d.ua.length) {
      a = a || GRCRTtpl.rct.genImgS;
      b = b || GRCRTtpl.rct.genImgM;
      f = f || GRCRTtpl.rct.genImgS / 50 * 11;
      var c;
      c = m(d.ua, a, b, f);
      c = $.md5(c);
      d.img_url = RepConvTool.Adds(t(c), "img");
      RepConv.Debug && console.log(c);
      $.ajax({type:"POST", url:RepConv.grcrt_domain + "imgdata.php", data:{param:btoa(m(d.ua, a, b, f)), dest:c}, dataType:"script", async:!1});
    }
  }
  function g(d) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    var a = null;
    $.each("raise conquer illusion breach attack take_over conqueroldtroops commandList conquerold support attackSupport agoraD agoraS espionage powers wall found conquest academy ownTropsInTheCity".split(" "), function(b, f) {
      -1 < d.indexOf(f) && (a = f);
    });
    return a;
  }
  function m(d, a, b, f) {
    return JSON.stringify({ua:d, s:a, m:b, fs:f || GRCRTtpl.rct.genImgS / 50 * 11});
  }
  function t(d) {
    return RepConv.grcrt_domain + "_img_cache_/" + d.substr(0, 2) + "/" + d + ".png";
  }
  function A(d) {
    function a(d) {
      return d.replace(e, c);
    }
    function b(d, a) {
      for (var f in a) {
        d = d.replace(new RegExp(f, "g"), a[f]);
      }
      return d;
    }
    function f(d) {
      d = d.replace('"', "").split(",");
      var a = "";
      $.each(d, function(d, b) {
        var f = b.split(":");
        a += " " + f[0] + '="' + f[1] + '"';
      });
      return a;
    }
    function c(d, b, e, K) {
      K && -1 < K.indexOf("[") && (K = a(K));
      switch(b) {
        case "url":
        ;
        case "anchor":
        ;
        case "email":
          return "<a " + g[b] + (e || K) + '">' + K + "</a>";
        case "img":
          return d = n.exec(e), '<img src="' + K + '"' + (d ? ' width="' + d[1] + '" height="' + d[2] + '"' : "") + ' alt="' + (d ? "" : e) + '" />';
        case "flash":
        ;
        case "youtube":
          return d = n.exec(e) || [0, 425, 366], '<object type="application/x-shockwave-flash" data="' + l[b] + K + '" width="' + d[1] + '" height="' + d[2] + '"><param name="movie" value="' + l[b] + K + '" /></object>';
        case "float":
          return '<span style="float: ' + e + '">' + K + "</span>";
        case "left":
        ;
        case "right":
        ;
        case "center":
        ;
        case "justify":
          return '<div style="text-align: ' + b + '">' + K + "</div>";
        case "google":
        ;
        case "wikipedia":
          return '<a href="' + h[b] + K + '">' + K + "</a>";
        case "b":
        ;
        case "i":
        ;
        case "u":
        ;
        case "s":
        ;
        case "sup":
        ;
        case "sub":
        ;
        case "h1":
        ;
        case "h2":
        ;
        case "h3":
        ;
        case "h4":
        ;
        case "h5":
        ;
        case "h6":
        ;
        case "table":
        ;
        case "tr":
        ;
        case "th":
        ;
        case "td":
          return d = "", void 0 != e && (d = f(e)), "<" + b + d + ">" + K + "</" + b + ">";
        case "row":
        ;
        case "r":
        ;
        case "header":
        ;
        case "head":
        ;
        case "h":
        ;
        case "col":
        ;
        case "c":
          return "<" + p[b] + ">" + K + "</" + p[b] + ">";
        case "acronym":
        ;
        case "abbr":
          return "<" + b + ' title="' + e + '">' + K + "</" + b + ">";
      }
      return "[" + b + (e ? "=" + e : "") + "]" + K + "[/" + b + "]";
    }
    if (0 > d.indexOf("[")) {
      return d;
    }
    var e = /\[([a-z][a-z0-9]*)(?:=([^\]]+))?]((?:.|[\r\n])*?)\[\/\1]/g, n = RegExp("^(\\d+)x(\\d+)$", void 0), g = {url:'href="', anchor:'name="', email:'href="mailto: '}, h = {google:"http://www.google.com/search?q=", wikipedia:"http://www.wikipedia.org/wiki/"}, l = {youtube:"http://www.youtube.com/v/", flash:""}, p = {row:"tr", r:"tr", header:"th", head:"th", h:"th", col:"td", c:"td"}, k = {notag:[{"\\[":"&#91;", "]":"&#93;"}, "", ""], code:[{"<":"&lt;"}, "<code><pre>", "</pre></code>"]};
    k.php = [k.code[0], k.code[1] + "&lt;?php ", "?>" + k.code[2]];
    var m = {font:"font-family:$1", size:"font-size:$1px", color:"color:$1"}, r = {c:"circle", d:"disc", s:"square", 1:"decimal", a:"lower-alpha", A:"upper-alpha", i:"lower-roman", I:"upper-roman"}, ia = {}, x = {}, X;
    for (X in k) {
      ia["\\[(" + X + ")]((?:.|[\r\n])*?)\\[/\\1]"] = function(d, a, f) {
        return k[a][1] + b(f, k[a][0]) + k[a][2];
      };
    }
    for (X in m) {
      x["\\[" + X + "=([^\\]]+)]"] = '<span style="' + m[X] + '">', x["\\[/" + X + "]"] = "</span>";
    }
    x["\\[list]"] = "<ul>";
    x["\\[list=(\\w)]"] = function(d, a) {
      return '<ul style="list-style-type: ' + (r[a] || "disc") + '">';
    };
    x["\\[/list]"] = "</ul>";
    x["\\[\\*]"] = "<li>";
    x["\\[quote(?:=([^\\]]+))?]"] = function(d, a) {
      return '<div class="bb-quote">' + (a ? a + " wrote" : "Quote") + ":<blockquote>";
    };
    x["\\[/quote]"] = "</blockquote></div>";
    x["\\[(hr|br)]"] = "<$1 />";
    x["\\[sp]"] = "&nbsp;";
    return a(b(b(d, ia), x));
  }
  function v(d, a) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    var b = {message:d};
    RepConv.Debug && console.log(d.length);
    gpAjax._ajax("message", "preview", b, !0, function(d) {
      RepConv.Debug && console.log(d.message);
      $(a).html(d.message);
    }, "post");
  }
  function x(d) {
    1 == $("#repConvArea").length && $("#repConvArea").remove();
    1 == $("#RepConvDivPrev").length && $("#RepConvDivPrev").remove();
    var a = $("<textarea/>", {style:RepConv.Const.textareastyle, id:"repConvArea", readonly:"readonly"}).text(d).click(function() {
      this.select();
    }).height(S - 6).hide(), b = $("<span/>", {"class":"monospace", id:"RepConvSpanPrev"}), f = $("<div/>", {style:"background-color: #fff; height: 225px; width: 753px; overflow-y: scroll; font-size: 100%;", id:"RepConvDivPrev", "class":"quote_message small "}).width("BBCODEA" == U.getValue() ? 805 : 777).css("padding", "BBCODEA" == U.getValue() ? "0px" : "0 15px").height(S).append(b);
    "BBCODEH" == ja.getValue() && "BBCODEE" == U.getValue() ? $(b).append(A(d)) : v(d, b);
    $("#RepConvAreas div.box_content").append(a);
    $("#RepConvAreas div.box_content").append(f);
    "BBCODEA" == U.getValue() && (RepConv.ClipBoard = d, $("#RepConvBtns div.RepConvMsg").html(RepConvTool.GetLabel("MSGCOPYREPORT").replace("[paste_icon]", '<img src="' + RepConv.Const.uiImg + 'paste_report.png" style="vertical-align: text-top;"/>')).fadeOut(50).fadeIn(500));
  }
  function D(d) {
    if ("BBCODEH" != ja.getValue() || "BBCODEE" != U.getValue()) {
      RepConv.__repconvHtmlArray = [], $.each(d, function(d, a) {
        $("<div/>");
        var b = {message:a};
        RepConv.Debug && console.log(value.length);
        gpAjax._ajax("message", "preview", b, !0, function(d) {
          RepConv.Debug && console.log(d.message);
          RepConv.__repconvHtmlArray.push(d.message);
        }, "post");
      });
    }
  }
  function E() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    d.title = r.find($("#report_report_header")).html().stripTags().replace("&nbsp;", " ").trim();
  }
  function C() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    d.time = "(" + r.find($("#report_date")).html() + ") ";
  }
  function I() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    q();
  }
  function q() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    d.morale = 0 == r.find($("span.fight_bonus.morale")).length ? "" : GRCRTtpl.rct.morale + r.find($("span.fight_bonus.morale")).html().stripTags().trim();
  }
  function u() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    d.luck = 0 == r.find($("span.fight_bonus.luck")).length ? "" : GRCRTtpl.rct.luck + r.find($("span.fight_bonus.luck")).html().stripTags().trim();
    -1 < d.luck.indexOf("-") && (d.luck = "[color=#b50307]" + d.luck + "[/color]");
  }
  function z() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    d.oldwall = {};
    0 == r.find($("span.fight_bonus.oldwall")).length ? d.oldwall[0] = "" : $.each(r.find($("span.fight_bonus.oldwall")), function(a, b) {
      d.oldwall[a] = $(b).html().stripTags().trim();
    });
  }
  function w() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    d.nightbonus = 0 == r.find($("span.fight_bonus.nightbonus")).length ? "" : GRCRTtpl.rct.nightbonus + r.find($("span.fight_bonus.nightbonus")).html().stripTags().trim();
  }
  function B() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    var a = {};
    d.resources = J();
    d.resources.title = (0 == r.find($("div#resources h4")).length ? r.find($("div#resources p")).html() : r.find($("div#resources h4")).html()) || " ";
    $.each(r.find($("div#resources li.res_background div")), function(b, f) {
      switch(f.className) {
        case "wood_img":
          a = {i:"S1", b:$(f).nextAll().text()};
          d.resources.ua.push(a);
          d.resources.wood = $(f).nextAll().text();
          break;
        case "stone_img":
          a = {i:"S2", b:$(f).nextAll().text()};
          d.resources.ua.push(a);
          d.resources.stone = $(f).nextAll().text();
          break;
        case "iron_img":
          a = {i:"S3", b:$(f).nextAll().text()};
          d.resources.ua.push(a);
          d.resources.iron = $(f).nextAll().text();
          break;
        case "favor_img":
          a = {i:"S4", b:$(f).nextAll().text()}, d.resources.ua.push(a), d.resources.power = $(f).nextAll().text();
      }
    });
    c(d.resources, 30, GRCRTtpl.rct.genImgM + 5, 7.5);
  }
  function h() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    d.bunt = "";
    0 == r.find($("div#resources h4")).length && 1 == r.find($("div#resources>span")).length ? d.bunt = r.find($("div#resources>span")).html().stripTags() : 1 == r.find($("div#resources>h4")).length && 2 == r.find($("div#resources>span")).length ? d.bunt = r.find($("div#resources>span")).eq(1).html().stripTags() : 1 == r.find($("div#resources>h4")).length && 1 == r.find($("div#resources>span")).length && (d.bunt = r.find($("div#resources>span")).eq(0).html().stripTags());
  }
  function k(d, a) {
    var b = "CS_" + d + "_" + a.id;
    if (sessionStorage.getItem(b) && JSON.parse(sessionStorage.getItem(b)).timestamp + 600 > Timestamp.server()) {
      return JSON.parse(sessionStorage.getItem(b)).CsTime;
    }
    var f = {}, c = {player_id:d, town_id:Game.townId, nl_init:NotificationLoader.isGameInitialized()}, e = $.ajax({url:"/game/player?action=get_profile_html&town_id=" + Game.townId + "&h=" + Game.csrfToken + "&json=" + JSON.stringify(c), async:!1}), n = null, g = Math.floor(Math.sqrt(Math.pow(100, 2) + Math.pow(100, 2))), e = $("<pre/>").append(JSON.parse(e.responseText).plain.html);
    $.each(e.find(".gp_town_link"), function(d, b) {
      var c = JSON.parse(RepConvTool.Atob($(b).attr("href"))), e = Math.floor(Math.sqrt(Math.pow(a.ix - c.ix, 2) + Math.pow(a.iy - c.iy, 2)));
      g = Math.min(g, e);
      void 0 == f[e] && (f[e] = {});
      void 0 == f[e][c.id] && (f[e][c.id] = {});
      f[e][c.id].id = c.id;
      f[e][c.id].name = c.name;
    });
    $.each(f[g], function(d, b) {
      c = {id:d, town_id:a.id, nl_init:NotificationLoader.isGameInitialized()};
      $.ajax({url:"/game/town_info?town_id=" + a.id + "&action=attack&h=" + Game.csrfToken + "&json=" + JSON.stringify(c), async:!1, complete:function(d) {
        d = JSON.parse(d.responseText).json.json.units.colonize_ship.duration_without_bonus;
        n = Math.min(n || d, d);
      }});
    });
    sessionStorage.setItem(b, JSON.stringify({timestamp:Timestamp.server() + 600, CsTime:n}));
    return n;
  }
  function l() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    return {unit_img:"", unit_send:"", unit_lost:"", unit_list:"", unit_diff:"", ua:[], img_url:RepConvTool.GetLabel("NOTUNIT")};
  }
  function p() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    return {unit_img:"", unit_send:"", unit_lost:"", unit_list:"", unit_diff:"", w:0, s:0, i:0, p:0, f:0, ua:[]};
  }
  function J() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    return {title:"", detail:"", image:"", count:"", wood:"0", stone:"0", iron:"0", power:"0", ua:[]};
  }
  function Q(a, f, e) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    var n = 0, g = 0;
    e = "undefined" !== typeof e ? e : 5;
    d[a].full = l();
    d[a].splits = {};
    d[a].splits[1] = l();
    $.each(r.find($(f)), function(b, f) {
      if (0 < f.childElementCount) {
        var c = RepConvTool.getUnitName($(f).find(".report_unit")), h = RepConvTool.GetUnitCost(c), k = $(f).find(".report_losts").html().replace("-", ""), p = {};
        "?" == k ? k = 0 : (d[a].w += h.w * parseInt(k), d[a].s += h.s * parseInt(k), d[a].i += h.i * parseInt(k), d[a].p += h.p * parseInt(k), d[a].f += h.f * parseInt(k));
        0 == n % e && (n = 0, g++);
        void 0 == d[a].splits[g] && (d[a].splits[g] = l());
        p = {i:RepConvTool.GetUnit(c), b:$(f).find(".report_unit>span").html(), r:k};
        d[a].full.ua.push(p);
        d[a].splits[g].ua.push(p);
        n++;
      }
    });
    c(d[a].full);
    b(d[a].splits);
  }
  function M(a, f, e) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    var n = 0, g = 0;
    e = "undefined" !== typeof e ? e : 5;
    d[a].full = l();
    d[a].splits = {};
    d[a].splits[1] = l();
    $.each(r.find($(f)), function(b, f) {
      var c = RepConvTool.getUnitName($(f));
      RepConvTool.GetUnitCost(c);
      var h = {};
      0 == n % e && (n = 0, g++);
      void 0 == d[a].splits[g] && (d[a].splits[g] = l());
      h = {i:RepConvTool.GetUnit(c), b:$(f).children("span").html()};
      d[a].full.ua.push(h);
      d[a].splits[g].ua.push(h);
      n++;
    });
    c(d[a].full);
    b(d[a].splits);
  }
  function N(a, f, e) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    var n = 0, g = 0;
    e = "undefined" !== typeof e ? e : 5;
    d[a].full = l();
    d[a].splits = {};
    $.each(r.find($(f)), function(b, f) {
      var c = RepConvTool.getUnitName($(f));
      RepConvTool.GetUnitCost(c);
      var h = {};
      0 == n % e && (n = 0, g++);
      void 0 == d[a].splits[g] && (d[a].splits[g] = l());
      h = {i:RepConvTool.GetBuild(c), b:$(f).children("span").html()};
      d[a].full.ua.push(h);
      d[a].splits[g].ua.push(h);
      n++;
    });
    c(d[a].full);
    b(d[a].splits);
  }
  function P(d) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    return {town:ca(d), player:Y(d), ally:V(d), townName:da(d), playerName:R(d)};
  }
  function H(d, a) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    void 0 == d && (d = {});
    d.town = ca(a);
    d.town_type = ka(a);
    d.player = Y(a);
    d.ally = V(a);
    d.townName = da(a);
    d.playerName = R(a);
    return d;
  }
  function da(d) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    return 0 < $(d).find($("li.town_name a")).length ? $(d).find($("li.town_name a")).html().trim() : "";
  }
  function R(d) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    return 0 < $(d).find($("li.town_owner a")).length ? $(d).find($("li.town_owner a")).html().trim() : "";
  }
  function ca(d) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    return 0 < $(d).find($("li.town_name a,.gp_town_link")).length ? RepConvTool.Adds(JSON.parse(RepConvTool.Atob($(d).find($("li.town_name a,.gp_town_link")).attr("href")))[GRCRTtpl.rct.getTown] + "", GRCRTtpl.rct.town) : 0 < $(d).find($("li.town_name")).length ? RepConvTool.Adds($(d).find($("li.town_name")).html().trim(), GRCRTtpl.rct.town) : "";
  }
  function ka(d) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    return 0 < $(d).find($("li.town_name a,.gp_town_link")).length ? RepConvTool.Atob($(d).find($("li.town_name a,.gp_town_link")).attr("href")).tp : 0 < $(d).find($("li.town_name")).length ? RepConvTool.Adds($(d).find($("li.town_name")).html().trim(), GRCRTtpl.rct.town) : "";
  }
  function Y(d) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    return 0 < $(d).find($("li.town_owner a,.gp_player_link")).length ? RepConvTool.Adds($(d).find($("li.town_owner a,.gp_player_link")).html(), GRCRTtpl.rct.player) : RepConvTool.Adds(($(d).find($("li.town_owner")).html() || "").trim(), GRCRTtpl.rct.player);
  }
  function V(d) {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    return 0 < $(d).find($("li.town_owner_ally a")).length ? RepConvTool.Adds($(d).find($("li.town_owner_ally a")).attr("onclick").replace(/.*'(.*)'.*/, "$1"), GRCRTtpl.rct.ally) : "";
  }
  function ea() {
    function a() {
      return ITowns.getCurrentTown().getBuildings().getBuildingLevel("academy");
    }
    function b() {
      return ITowns.getCurrentTown().getBuildings().getBuildingLevel("library");
    }
    function f() {
      var d = GameData.researches, a = ITowns.getCurrentTown().getResearches(), b = e.data.collections.research_orders, c = 0, n;
      for (n in d) {
        if (d.hasOwnProperty(n)) {
          var g = d[n];
          if (a.hasResearch(n) || b.isResearchInQueue(n)) {
            c += g.research_points;
          }
        }
      }
      return c;
    }
    var c = function() {
      var d = GameData.researches, c = e.data.collections.research_orders, n = a(), g = a() * GameDataResearches.getResearchPointsPerAcademyLevel() + (1 === b() ? GameDataResearches.getResearchPointsPerLibraryLevel() : 0) - f(), h = ITowns.getCurrentTown().getResearches(), k = [], l;
      for (l in d) {
        if (d.hasOwnProperty(l)) {
          var p = d[l], m = p.building_dependencies, r = Math.ceil(m.academy / 3), x = h.hasResearch(l), ia = c.isResearchInQueue(l), X = c.isResearchQueueFull(), q;
          a: {
            q = GameData.researches[l].resources;
            var ra = ITowns.getCurrentTown().resources(), O = void 0;
            for (O in q) {
              if (q.hasOwnProperty(O) && q[O] > ra[O]) {
                q = !1;
                break a;
              }
            }
            q = !0;
          }
          ra = n >= m.academy;
          p = g >= p.research_points;
          k[r - 1] || (k[r - 1] = []);
          k[r - 1].push({research_id:l, column_number:r, is_researched:x, in_progress:ia, can_be_bought:ra && !x && !ia && !X && q && p, academy_lvl:m.academy});
        }
      }
      return k;
    }(), n = 0, g = a();
    $.each(c, function(d, a) {
      n = Math.max(n, a.length);
    });
    d.title = GameData.buildings.academy.name + " (" + RepConvTool.Adds(GRCRTtpl.rct.outside ? Game.townName : Game.townId.toString(), GRCRTtpl.rct.town) + ")";
    d.time = "";
    d.linia = {};
    $.each(c, function(a, b) {
      for (var f = 0;f < n;f++) {
        void 0 == d.linia[f] && (d.linia[f] = {unit_list:"", unit_name:""});
        var c = void 0 != b[f] ? RepConvTool.GetImageCode(GameDataResearches.getResearchCssClass(b[f].research_id)) : "", c = void 0 == b[f] || b[f].is_researched || b[f].in_progress ? c : c.toLowerCase();
        d.linia[f].unit_list += 0 < d.linia[f].unit_list.length ? "." : "";
        d.linia[f].unit_list += c;
        d.linia[f].unit_list += void 0 != b[f] && (b[f].academy_lvl > g || c == c.toUpperCase()) ? "|-" : "|";
      }
    });
    d.points = DM.getl10n("academy", "research_points") + ": " + (a() * GameDataResearches.getResearchPointsPerAcademyLevel() + (1 === b() ? GameDataResearches.getResearchPointsPerLibraryLevel() : 0) - f()) + "/" + (GameDataBuildings.getBuildingMaxLevel("academy") * GameDataResearches.getResearchPointsPerAcademyLevel() + (1 === b() ? GameDataResearches.getResearchPointsPerLibraryLevel() : 0));
  }
  function O() {
    d.title = r.find($("div.game_header")).html().stripTags();
    d.time = "";
    d.linia = {};
    if (0 < r.find($("#tab_all ul#command_overview li")).length) {
      var a = -1;
      $.each(r.find($("#tab_all ul#command_overview li")), function(b, f) {
        if ("none" != $(f).css("display")) {
          if (a++, d.linia[a] = {title:"", img:null, townIdA:null, townIdB:null, inout:null, power:"", unit_img:"", unit_send:"", unit_list:"", spy:"", time:""}, 0 < $(f).find($("h4")).length) {
            d.linia[a].title = "[b]" + $(f).find($("h4")).html().stripTags() + "[/b]";
          } else {
            if (0 < $(f).find($("span.italic")).length) {
              d.linia[a].title = "[i]" + $(f).find($("span.italic")).html().stripTags() + "[/i]";
            } else {
              if ($(f).hasClass("place_command")) {
                d.linia[a].img = RepConvTool.getCommandIcon($(f).find("div.cmd_img"));
                d.linia[a].townIdB = "";
                var c = $(f).find($("span.cmd_span")), e = $(c).find($("span.icon")), n = $(e).prevAll(), e = $(e).nextAll();
                d.linia[a].inout = RepConvTool.Adds(RepConv.Const.staticImg + (0 == $(c).find(".overview_incoming").length ? "out" : "in") + ".png", "img");
                d.linia[a].townIdA = {};
                switch(n.length) {
                  case 2:
                  ;
                  case 1:
                    $.each(n, function(b, f) {
                      "gp_town_link" == f.className ? "town" == JSON.parse(RepConvTool.Atob(f.hash)).tp ? (d.linia[a].townIdA.town = RepConvTool.Adds(JSON.parse(RepConvTool.Atob(f.hash))[GRCRTtpl.rct.getTown].toString(), GRCRTtpl.rct.town), d.linia[a].townIdA.townId = JSON.parse(RepConvTool.Atob(f.hash)).id, d.linia[a].townIdA.townJSON = JSON.parse(RepConvTool.Atob(f.hash))) : d.linia[a].townIdA.town = RepConvTool.Adds(f.text, GRCRTtpl.rct.town) : "gp_player_link" == f.className && (d.linia[a].townIdA.player = 
                      RepConvTool.Adds(f.text, GRCRTtpl.rct.player));
                    });
                    d.linia[a].townIdA.full = d.linia[a].townIdA.town;
                    void 0 != d.linia[a].townIdA.player && (d.linia[a].townIdA.full += " (" + d.linia[a].townIdA.player + ")");
                    break;
                  case 0:
                    d.linia[a].townIdA.full = "", $.each(c[0].firstChild.data.split("\n"), function(f, b) {
                      d.linia[a].townIdA.full += " " + b.trim();
                      d.linia[a].townIdA.full = d.linia[a].townIdA.full.trim();
                    });
                }
                d.linia[a].townIdB = {};
                switch(e.length) {
                  case 2:
                  ;
                  case 1:
                    d.linia[a].townIdB.town = "";
                    $.each(e, function(f, b) {
                      "gp_town_link" == b.className ? "town" == JSON.parse(RepConvTool.Atob(b.hash)).tp ? d.linia[a].townIdB.town = RepConvTool.Adds(JSON.parse(RepConvTool.Atob(b.hash))[GRCRTtpl.rct.getTown].toString(), GRCRTtpl.rct.town) : d.linia[a].townIdB.town = RepConvTool.Adds(b.text, GRCRTtpl.rct.town) : "gp_player_link" == b.className && (d.linia[a].townIdB.player = RepConvTool.Adds(b.text, GRCRTtpl.rct.player), d.linia[a].townIdB.playerId = JSON.parse(RepConvTool.Atob(b.hash)).id);
                    });
                    void 0 != d.linia[a].townIdB.town && (d.linia[a].townIdB.full = d.linia[a].townIdB.town);
                    void 0 != d.linia[a].townIdB.player && (d.linia[a].townIdB.full += " (" + d.linia[a].townIdB.player + ")");
                    break;
                  case 0:
                    d.linia[a].townIdB.full = "", $.each(c[0].lastChild.data.split("\n"), function(b, f) {
                      d.linia[a].townIdB.full += " " + f.trim();
                      d.linia[a].townIdB.full = d.linia[a].townIdB.full.trim();
                    });
                }
                d.linia[a].time = $(f).find(".troops_arrive_at").html();
                d.linia[a].power = RepConvTool.getPowerIcon($(f).find("div.casted_power"));
                if ("attack_spy" == $(f).attr("data-command_type")) {
                  qa.isChecked() ? d.linia[a].img_url = RepConvTool.Adds(RepConv.Const.unitImg + "iron.png", "img") + "  " + $(f).find("span.resource_iron_icon").html() : d.linia[a].img_url = RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i");
                } else {
                  if ("revolt" == $(f).attr("id").replace(/.*_(revolt).*/, "$1") && void 0 != d.linia[a].townIdA.townId) {
                    if (qa.isChecked() && (c = ITowns.getTown(d.linia[a].townIdA.townId), void 0 != c)) {
                      d.linia[a].unit_list = "A6";
                      d.linia[a].unit_list += "|" + c.buildings().getBuildingLevel("wall").toString();
                      d.linia[a].unit_list += (1 == c.buildings().getBuildingLevel("tower") ? ".B6" : ".b6") + "|-";
                      d.linia[a].unit_list += (c.researches().get("ram") ? ".C6" : ".c6") + "|-";
                      d.linia[a].unit_list += (c.researches().get("phalanx") ? ".D6" : ".d6") + "|-";
                      d.linia[a].unit_list += (MM.checkAndPublishRawModel("PremiumFeatures", {id:Game.player_id}).get("captain") > Timestamp.server() ? ".E6" : ".e6") + "|-";
                      d.linia[a].unit_list += (MM.checkAndPublishRawModel("PremiumFeatures", {id:Game.player_id}).get("commander") > Timestamp.server() ? ".F6" : ".f6") + "|-";
                      d.linia[a].unit_list += (MM.checkAndPublishRawModel("PremiumFeatures", {id:Game.player_id}).get("priest") > Timestamp.server() ? ".G6" : ".g6") + "|-";
                      0 < d.linia[a].unit_list.length && (d.linia[a].img_url = RepConvTool.Adds((RepConv.grcrt_domain + "static/{0}{1}_32_2.png").RCFormat(GRCRTtpl.rct.sign, d.linia[a].unit_list), "img"), d.linia[a].img_url += RepConvTool.Adds((RepConv.grcrt_cdn + "ui/3/{0}.png").RCFormat(c.god() || "nogod"), "img"), d.linia[a].rt = "x");
                      try {
                        d.linia[a].img_url += "\n" + RepConvTool.GetLabel("MSGRTCSTIME") + ": ~" + readableUnixTimestamp(parseInt(k(d.linia[a].townIdB.playerId, d.linia[a].townIdA.townJSON)), "no_offset");
                      } catch (g) {
                      }
                    }
                  } else {
                    qa.isChecked() ? (d.linia[a].ua = [], $.each($(f).find("div.command_overview_units div.place_unit"), function(b, f) {
                      var c = RepConvTool.getUnitName($(f)), c = {i:RepConvTool.GetUnit(c), b:$(f).find($("span.place_unit_black")).html()};
                      d.linia[a].ua.push(c);
                    })) : d.linia[a].img_url = RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i");
                  }
                }
              }
            }
          }
        }
      });
    }
    b(d.linia, 25, 2, 8);
  }
  function L() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    d.title = r.find($("#conqueror_units_in_town>span")).html();
    d.time = r.find($("div.clearfix"))[0].innerHTML.stripTags().trim().replace(/\n/gi, "").replace(/.*(\(.*\)).*/, "$1");
    d.attacker = {};
    d.defender = {};
    d.defender.town = RepConvTool.Adds(JSON.parse(RepConvTool.Atob(r.find($("div.clearfix a.gp_town_link")).attr("href")))[GRCRTtpl.rct.getTown].toString(), GRCRTtpl.rct.town);
    d.defender.townName = r.find($("div.clearfix a.gp_town_link")).html();
    d.defender.player = RepConvTool.Adds(r.find($("div.clearfix a.gp_player_link")).html(), GRCRTtpl.rct.player);
    d.defender.playerName = r.find($("div.clearfix a.gp_player_link")).html();
    null == d.defender.player && (d.defender.player = "", d.defender.playerName = "");
    na.isChecked() && (d.defender.town = RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), GRCRTtpl.rct.town));
    d.attacker.units_title = r.find($("div.clearfix div.bold")).html();
    W.isChecked() ? M("attacker", "div.index_unit", 11) : d.attacker.full = {img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")};
    RepConv.Debug && console.log(d);
  }
  function F() {
    d.title = r.parent().find($(".ui-dialog-title")).html();
    d.type = "";
    d.time = "";
    d.power = "";
    d.morale = "";
    d.luck = "";
    d.oldwall = {};
    d.nightbonus = "";
    d.attacker = {};
    d.defender = {};
    d.command = {};
    d.command.title = r.find($("div.tab_content>span")).clone();
    $(d.command.title).children().remove();
    d.command.title = $(d.command.title).html();
    0 == r.find($("ul#unit_movements")).length ? d.command.title = "\n[i]" + $_content.find($(".gpwindow_content>span")).html() + "[/i]" : (d.linia = {}, $.each(r.find($("ul#unit_movements>li")), function(a, f) {
      d.linia[a] = {};
      d.linia[a].inout = RepConvTool.Adds(RepConv.Const.staticImg + (0 == $(f).attr("class").replace(/.*(incoming).*/, "$1").length ? "out" : "in") + ".png", "img");
      d.linia[a].img = RepConvTool.Adds($(f).find($("img.command_type")).attr("src"), "img");
      var b = $(f).find("div>span.eta").html().split(":"), b = 3600 * parseInt(b[0]) + 60 * parseInt(b[1]) + parseInt(b[2]), b = readableUnixTimestamp(Timestamp.server() + parseInt(b), "player_timezone", {with_seconds:!0, extended_date:!0});
      d.linia[a].time = b;
      d.linia[a].text = RepConvTool.Adds(JSON.parse(RepConvTool.Atob($(f).find($("a.gp_town_link")).attr("href")))[GRCRTtpl.rct.getTown].toString(), GRCRTtpl.rct.town);
    }));
  }
  function T() {
    d.title = r.closest($(".js-window-main-container")).find($(".ui-dialog-title")).html();
    d.type = "";
    var a = r.find($("div#conquest")).html().split(":"), a = 3600 * parseInt(a[0]) + 60 * parseInt(a[1]) + parseInt(a[2]), a = readableUnixTimestamp(Timestamp.server() + parseInt(a), "player_timezone", {with_seconds:!0, extended_date:!0});
    d.time = a;
    d.power = "";
    d.morale = "";
    d.luck = "";
    d.oldwall = {};
    d.nightbonus = "";
    d.attacker = {};
    d.defender = {};
    d.command = {};
    d.attacker.title = $(r.find($("h4"))[0]).html();
    d.attacker.player = RepConvTool.Adds(r.find($("a.gp_player_link")).html(), GRCRTtpl.rct.player);
    d.defender.town = RepConvTool.Adds(JSON.parse(RepConvTool.Atob(r.find($("a.gp_town_link")).attr("href")))[GRCRTtpl.rct.getTown].toString(), GRCRTtpl.rct.town);
    na.isChecked() && (d.defender.town = RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), GRCRTtpl.rct.town));
    d.attacker.units_title = r.find($("div.clearfix div.bold")).html();
    W.isChecked() ? M("attacker", "div.report_unit", 11) : d.attacker.full = {img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")};
    d.command.title = $(r.find($("h4"))[1]).html();
    d.linia = {};
    0 == r.find($("ul#unit_movements")).length ? d.command.title = "\n[i]" + (r.find($(".conquest_info_wrapper>span")).html() || "") + "[/i]" : (d.linia = {}, $.each(r.find($("ul#unit_movements>li")), function(a, b) {
      d.linia[a] = {};
      d.linia[a].inout = RepConvTool.Adds(RepConv.Const.staticImg + (0 == $(b).attr("class").replace(/.*(incoming).*/, "$1").length ? "out" : "in") + ".png", "img");
      d.linia[a].img = RepConvTool.Adds($(b).find($("img.command_type")).attr("src"), "img");
      var f = $(b).find("div>span.eta").html().split(":"), f = 3600 * parseInt(f[0]) + 60 * parseInt(f[1]) + parseInt(f[2]), f = readableUnixTimestamp(Timestamp.server() + parseInt(f), "player_timezone", {with_seconds:!0, extended_date:!0});
      d.linia[a].time = f;
      var c = RepConvTool.Adds(JSON.parse(RepConvTool.Atob($($($(b).find("div")[2]).html()).eq(3).attr("href")))[GRCRTtpl.rct.getTown].toString(), GRCRTtpl.rct.town), e = RepConvTool.Adds(JSON.parse(RepConvTool.Atob($($($(b).find("div")[2]).html()).eq(5).attr("href"))).name, GRCRTtpl.rct.player), n = "(" + RepConvTool.Adds($($($(b).find("div")[2]).html()).eq(7).html(), GRCRTtpl.rct.ally) + ")" || "";
      d.linia[a].text = "";
      $.each($($($(b).find("div")[2]).html().replace(/.*<span.*span>(.*)/, "$1")), function(b, f) {
        $(f).hasClass("gp_town_link") ? d.linia[a].text += " " + c : $(f).hasClass("gp_player_link") ? d.linia[a].text += "\n" + e : void 0 != $(f).attr("onclick") ? d.linia[a].text += " " + n : 0 < $(f).text().replace(/(\(|\))/, "").trim().length && (d.linia[a].text += " " + $(f).text().trim());
      });
      a++;
    }));
  }
  function oa() {
    d.title = r.find($("#place_defense .game_header")).html().stripTags() + " " + RepConvTool.Adds(GRCRTtpl.rct.outside ? Game.townName : Game.townId.toString(), GRCRTtpl.rct.town);
    d.time = "";
    d.linia = {};
    $.each(r.find($("li.place_units")), function(a, f) {
      var b = "", c = "";
      0 < $(f).children("h4").children("a.gp_town_link").length && (b = RepConvTool.Adds(JSON.parse(RepConvTool.Atob($(f).children("h4").children("a.gp_town_link").attr("href")))[GRCRTtpl.rct.getTown].toString(), GRCRTtpl.rct.town));
      0 < $(f).children("h4").children("a.gp_player_link").length && (c = RepConvTool.Adds($(f).children("h4").children("a.gp_player_link").html(), GRCRTtpl.rct.player));
      if (na.isChecked() || va.isChecked()) {
        b = RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), GRCRTtpl.rct.town);
      }
      d.linia[a] = {};
      d.linia[a].titleOrg = $(f).children("h4").html();
      d.linia[a].title = "" != c ? $(f).children("h4").html().replace(/(.*)<a.*\/a>.*(<a.*\/a>).*/, "$1") + b + " (" + c + ")" : $(f).children("h4").html().replace(/(.*)<a.*\/a>/, "$1") + b;
      fa.isChecked() || W.isChecked() ? (d.linia[a].ua = [], $.each($(f).find($(".place_unit")), function(f, b) {
        var c = RepConvTool.getUnitName($(b)), c = {i:RepConvTool.GetUnit(c), b:$(b).find($("span")).html()};
        d.linia[a].ua.push(c);
      })) : d.linia[a].img_url = RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i");
    });
    (fa.isChecked() || W.isChecked()) && b(d.linia);
  }
  function wa() {
    function a(d, f) {
      RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
      var c = -1, e = 0, n = [];
      $.each($(f).find($("div.wall_report_unit")), function(a, d) {
        var f = RepConvTool.getUnitName($(d)), b = {};
        switch(pa.getValue()) {
          case "MSGDIFF1":
            b = {i:RepConvTool.GetUnit(f), b:$(d).find($("span.place_unit_black")).html()};
            n.push(b);
            break;
          case "MSGDIFF2":
            b = {i:RepConvTool.GetUnit(f), b:$(d).find($("span.place_unit_black")).html(), g:$(d).parent().find($("div.grcrt_wall_diff")).html()};
            n.push(b);
            break;
          case "MSGDIFF3":
            "" != $(d).parent().find($("div.grcrt_wall_diff")).html() && (b = {i:RepConvTool.GetUnit(f), g:$(d).parent().find($("div.grcrt_wall_diff")).html()}, n.push(b));
        }
      });
      $.each(n, function(a, f) {
        0 == e % ("BBCODEP" == ja.getValue() ? GRCRTtpl.rct.unitWall : GRCRTtpl.rct.unitWall2) && (c++, d[c] = {ua:[]});
        d[c].ua.push(f);
        e++;
      });
      b(d);
    }
    d.title = r.find($(".game_header")).html().stripTags();
    d.defeated = {};
    d.losses = {};
    d.defeated.title = "";
    d.defeated.titleAttacker = "";
    d.defeated.titleDefender = "";
    d.losses.title = "";
    d.losses.titleAttacker = "";
    d.losses.titleDefender = "";
    d.defeated.attacker = {};
    d.defeated.defender = {};
    d.losses.attacker = {};
    d.losses.defender = {};
    if (xa.isChecked() || ya.isChecked()) {
      d.defeated.title = r.find($("div.list_item_left h3")).html(), xa.isChecked() && (d.defeated.titleAttacker = $(r.find($("div.list_item_left h4"))[0]).html().stripTags().trim(), a(d.defeated.attacker, r.find($("div.list_item_left .wall_unit_container"))[0])), ya.isChecked() && (d.defeated.titleDefender = $(r.find($("div.list_item_left h4"))[1]).html().stripTags().trim(), a(d.defeated.defender, r.find($("div.list_item_left .wall_unit_container"))[1]));
    }
    if (za.isChecked() || Aa.isChecked()) {
      d.losses.title = r.find($("div.list_item_right h3")).html(), za.isChecked() && (d.losses.titleAttacker = $(r.find($("div.list_item_right h4"))[0]).html().stripTags().trim(), a(d.losses.attacker, r.find($("div.list_item_right .wall_unit_container"))[0])), Aa.isChecked() && (d.losses.titleDefender = $(r.find($("div.list_item_right h4"))[1]).html().stripTags().trim(), a(d.losses.defender, r.find($("div.list_item_right .wall_unit_container"))[1]));
    }
    var f = "emptyline_" + GRCRTtpl.rct.genImgS + "_" + GRCRTtpl.rct.genImgM;
    d.emptyline = RepConvTool.Adds(t(f), "img");
    $.ajax({type:"POST", url:RepConv.grcrt_domain + "imgdata.php", data:{param:btoa(m([{i:"null", b:""}], GRCRTtpl.rct.genImgS, GRCRTtpl.rct.genImgM)), dest:f}, dataType:"script", async:!1});
    RepConv.Debug && console.log(d);
  }
  function f() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    if (ha.isChecked()) {
      if ("[town]" + Game.townId + "[/town]" == d.defender.town || Game.townName == d.defender.townName) {
        d.rtrevinfo = MM.checkAndPublishRawModel("CommandsMenuBubble", {id:Game.player_id}).get("revolts").in_current_town;
        d.rtrevccount = d.rtrevinfo.count;
        d.rtcstime = "~" + readableUnixTimestamp(parseInt(k(JSON.parse(RepConvTool.Atob(r.find($("#report_sending_town .gp_player_link")).attr("href"))).id, JSON.parse(RepConvTool.Atob(r.find($("#report_receiving_town .gp_town_link")).attr("href"))))), "no_offset");
        d.rtrevolt = "";
        try {
          $.each(d.rtrevinfo.arising, function(a, f) {
            var b = readableUnixTimestamp(f.finished_at, "player_timezone", {extended_date:!1, with_seconds:!1});
            -1 < d.time.indexOf(b) && (d.rtrevolt = readableUnixTimestamp(f.started_at, "player_timezone", {extended_date:!0, with_seconds:!0}));
          }), $.each(d.rtrevinfo.running, function(a, f) {
            var b = readableUnixTimestamp(f.finished_at, "player_timezone", {extended_date:!1, with_seconds:!1});
            -1 < d.time.indexOf(b) && (d.rtrevolt = readableUnixTimestamp(f.started_at, "player_timezone", {extended_date:!0, with_seconds:!0}));
          });
        } catch (a) {
          d.rtrevolt = "";
        }
      } else {
        ha.check(!1), d.rtrevolt = "";
      }
    } else {
      d.rtrevolt = "";
    }
    d.rttownId = parseInt(Game.townId);
    var f = ITowns.getTown(d.rttownId);
    d.rtwall = f.buildings().getBuildingLevel("wall");
    d.rtimg = "A6";
    d.rtimg += "|" + d.rtwall.toString();
    1 == ITowns.getTown(d.rttownId).buildings().getBuildingLevel("tower") ? (d.rttower = RepConvTool.GetLabel("MSGRTYES"), d.rtimg += ".B6", d.rtdetail += ".....\u2612.") : (d.rttower = RepConvTool.GetLabel("MSGRTNO"), d.rtimg += ".b6", d.rtdetail += ".....\u2610.");
    d.rtimg += "|-";
    d.rtgod = DM.getl10n("layout").powers_menu.gods[ITowns.getTown(d.rttownId).god()];
    d.rtgodid = ITowns.getTown(d.rttownId).god() || "nogod";
    d.rtonline = Ba.isChecked() ? RepConvTool.GetLabel("MSGRTYES") : RepConvTool.GetLabel("MSGRTNO");
    ITowns.getTown(d.rttownId).researches().get("ram") ? (d.rtram = RepConvTool.GetLabel("MSGRTYES"), d.rtimg += ".C6", d.rtdetail += ".....\u2612.") : (d.rtram = RepConvTool.GetLabel("MSGRTNO"), d.rtimg += ".c6", d.rtdetail += ".....\u2610.");
    d.rtimg += "|-";
    ITowns.getTown(d.rttownId).researches().get("phalanx") ? (d.rtphalanx = RepConvTool.GetLabel("MSGRTYES"), d.rtimg += ".D6", d.rtdetail += ".....\u2612.") : (d.rtphalanx = RepConvTool.GetLabel("MSGRTNO"), d.rtimg += ".d6", d.rtdetail += ".....\u2610.");
    d.rtimg += "|-";
    d.rtpremium = [];
    MM.checkAndPublishRawModel("PremiumFeatures", {id:Game.player_id}).get("captain") > Timestamp.server() ? (d.rtpremium.captain = RepConvTool.GetLabel("MSGRTYES"), d.rtimg += ".E6", d.rtdetail += ".....\u2612.") : (d.rtpremium.captain = RepConvTool.GetLabel("MSGRTNO"), d.rtimg += ".e6", d.rtdetail += ".....\u2610.");
    d.rtimg += "|-";
    MM.checkAndPublishRawModel("PremiumFeatures", {id:Game.player_id}).get("commander") > Timestamp.server() ? (d.rtpremium.commander = RepConvTool.GetLabel("MSGRTYES"), d.rtimg += ".F6", d.rtdetail += ".....\u2612.") : (d.rtpremium.commander = RepConvTool.GetLabel("MSGRTNO"), d.rtimg += ".f6", d.rtdetail += ".....\u2610.");
    d.rtimg += "|-";
    MM.checkAndPublishRawModel("PremiumFeatures", {id:Game.player_id}).get("priest") > Timestamp.server() ? (d.rtpremium.priest = RepConvTool.GetLabel("MSGRTYES"), d.rtimg += ".G6", d.rtdetail += ".....\u2612.") : (d.rtpremium.priest = RepConvTool.GetLabel("MSGRTNO"), d.rtimg += ".g6", d.rtdetail += ".....\u2610.");
    d.rtimg += "|-";
    d.rtlabels = [];
    d.rtlabels.wall = GameData.buildings.wall.name;
    d.rtlabels.tower = GameData.buildings.tower.name;
    d.rtlabels.god = RepConvTool.GetLabel("MSGRTGOD");
    d.rtlabels.cstime = RepConvTool.GetLabel("MSGRTCSTIME");
    d.rtlabels.online = RepConvTool.GetLabel("MSGRTONL");
    d.rtlabels.ram = GameData.researches.ram.name;
    d.rtlabels.phalanx = GameData.researches.phalanx.name;
    d.rtlabels.captain = Game.premium_data.captain.name;
    d.rtlabels.commander = Game.premium_data.commander.name;
    d.rtlabels.priest = Game.premium_data.priest.name;
    RepConv.Cmds = MM.checkAndPublishRawModel("CommandsMenuBubble", {id:Game.player_id});
    RepConv.Cmds.get("unit_movements");
    d.unit_movements = {support:0, attack:0};
    $.each(RepConv.Cmds.get("unit_movements"), function(a, f) {
      f.incoming && (d.unit_movements.support += "support" == f.type ? 1 : 0, d.unit_movements.attack += "attack_incoming" == f.type ? 1 : 0);
    });
  }
  function n() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    E();
    I();
    C();
    q();
    u();
    z();
    w();
    d.attacker = p();
    d.defender = p();
    d.attacker = H(d.attacker, r.find($("#report_sending_town")));
    d.defender = H(d.defender, r.find($("#report_receiving_town")));
    d.powerAtt = "";
    $.each(r.find($("div.report_side_attacker div.report_power")), function(a, f) {
      d.powerAtt += RepConvTool.getPowerIcon($(f));
    });
    d.powerDef = "";
    $.each(r.find($("div.report_side_defender div.report_power")), function(a, f) {
      d.powerDef += RepConvTool.getPowerIcon($(f));
    });
    "attackSupport" == Z ? fa.isChecked() ? Q("defender", "div.report_side_attacker_unit") : (d.defender.full = {img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")}, d.defender.splits = {1:{img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")}}, d.powerDef = "") : (W.isChecked() ? Q("attacker", "div.report_side_attacker_unit") : (d.attacker.full = {img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")}, d.attacker.splits = {1:{img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), 
    "i")}}, d.powerAtt = ""), fa.isChecked() ? Q("defender", "div.report_side_defender_unit") : (d.defender.full = {img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")}, d.defender.splits = {1:{img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")}}, d.powerDef = ""));
    B();
    h();
  }
  function X() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    E();
    I();
    C();
    q();
    u();
    z();
    w();
    d.attacker = p();
    d.defender = p();
    d.attacker = H(d.attacker, r.find($("#report_sending_town")));
    d.defender = H(d.defender, r.find($("#report_receiving_town")));
    d.powerAtt = "";
    d.powerDef = "";
    fa.isChecked() ? Q("defender", "div.support_report_summary div.report_units.report_side_defender div.report_side_defender_unit") : (d.defender.full = {img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")}, d.defender.splits = {1:{img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")}});
    d.bunt = "";
  }
  function ra() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    E();
    I();
    C();
    q();
    u();
    z();
    w();
    d.attacker = p();
    d.defender = p();
    d.attacker = H(d.attacker, r.find($("#report_sending_town")));
    d.defender = H(d.defender, r.find($("#report_receiving_town")));
    d.powerAtt = "";
    $.each(r.find($("div.report_side_attacker div.report_power")), function(a, f) {
      d.powerAtt += RepConvTool.getPowerIcon($(f));
    });
    d.powerDef = "";
    $.each(r.find($("div.report_side_defender div.report_power")), function(a, f) {
      d.powerDef += RepConvTool.getPowerIcon($(f));
    });
    W.isChecked() ? Q("attacker", "#left_side div.report_side_attacker_unit") : (d.attacker.full = {img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")}, d.attacker.splits = {1:{img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")}}, d.powerAtt = "");
    fa.isChecked() ? Q("defender", "#right_side div.report_side_attacker_unit") : (d.defender.full = {img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")}, d.defender.splits = {1:{img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")}}, d.powerDef = "");
    B();
    h();
  }
  function Qa() {
    d.title = sa.parent().parent().find($("span.ui-dialog-title")).html();
    d.time = "";
    d.back = 1 == r.find($(".command_icon_wrapper img")).length;
    d.detail = {};
    d.attacker = p();
    d.defender = p();
    d.ret = 0 < r.find($("div.return")).length;
    d.farm = 1 < r.find($(".command_icon_wrapper img")).length && r.find($(".command_icon_wrapper img")).attr("src").match(/.*\/(farm).*/) || 1 == r.find($("div.report_town_bg_quest")).length ? !0 : !1;
    d.back || (d.attacker = H(d.attacker, r.find($("div.attacker"))));
    d.defender = H(d.defender, r.find($("div.defender")));
    d.detail.time_title = r.find($("fieldset.command_info_time legend")).html();
    d.detail.time_time = r.find($("fieldset.command_info_time .arrival_time")).html();
    d.attacker.units_title = 0 == r.find($(".grcrt_wisdom")).length ? r.find($("fieldset.command_info_units legend")).html() : r.find($("fieldset.command_info_units .grcrt_wisdom h4")).html();
    d.detail.power_title = r.find($("fieldset.command_info_casted_powers legend")).html();
    d.detail.power_img = "";
    W.isChecked() ? (M("attacker", 0 == r.find($(".grcrt_wisdom")).length ? "div.index_unit" : "div.report_unit", 5), $.each(r.find($("fieldset.command_info_casted_powers div.index_town_powers")), function(a, f) {
      d.detail.power_img += RepConvTool.getPowerIcon($(f));
    }), 0 != r.find($(".grcrt_wisdom")).length && (d.detail.power_img = RepConvTool.Adds(RepConv.Const.uiImg + "pm/wisdom.png", "img"))) : d.attacker.full = {img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")};
    d.resources = J();
    d.resources.title = 0 == r.find($("fieldset.command_info_res legend")).length ? "" : r.find($("fieldset.command_info_res legend")).html();
    $.each(r.find($("div#command_booty li.res_background div")), function(a, f) {
      var b = {};
      switch(f.className) {
        case "wood_img":
          b = {i:"S1", b:$(f).nextAll().text()};
          d.resources.ua.push(b);
          d.resources.wood = $(f).nextAll().text();
          break;
        case "stone_img":
          b = {i:"S2", b:$(f).nextAll().text()};
          d.resources.ua.push(b);
          d.resources.stone = $(f).nextAll().text();
          break;
        case "iron_img":
          b = {i:"S3", b:$(f).nextAll().text()};
          d.resources.ua.push(b);
          d.resources.iron = $(f).nextAll().text();
          break;
        case "favor_img":
          b = {i:"S4", b:$(f).nextAll().text()}, d.resources.ua.push(b), d.resources.power = $(f).nextAll().text();
      }
    });
    c(d.resources, 30, GRCRTtpl.rct.genImgM + 5, 10);
    d.bunt = "";
    try {
      d.reportImage = r.find($(".command_icon_wrapper img")).attr("src").replace(/.*\/([^\/]*)\.png/, "$1");
    } catch (a) {
    }
  }
  function Ra() {
    function a(d) {
      RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
      var f = $(d).children();
      return {col1:RepConvTool.Adds(JSON.parse(RepConvTool.Atob(f.eq(0).attr("href")))[GRCRTtpl.rct.outside ? "name" : "id"].toString(), GRCRTtpl.rct.town), col2:f.eq(1).html(), col3:0 < $(f).eq(2).children("a.gp_player_link").length ? RepConvTool.Adds(JSON.parse(RepConvTool.Atob($(f).eq(2).children("a.gp_player_link").attr("href"))).name, GRCRTtpl.rct.player) : $(f).eq(2).justtext()};
    }
    var f = 0;
    d.title = e.getTitle() + " (" + (GRCRTtpl.rct.outside ? RepConvTool.Adds(e.getJQElement().find($(".island_info>h4")).html(), GRCRTtpl.rct.island) : RepConvTool.Adds(e.getHandler().island.id.toString(), GRCRTtpl.rct.island)) + ")";
    d.time = "";
    d.header = GRCRTtpl.rct.outside ? RepConvTool.Adds(e.getJQElement().find($(".island_info>h4")).html(), GRCRTtpl.rct.island) : RepConvTool.Adds(e.getHandler().island.id.toString(), GRCRTtpl.rct.island);
    d.header += "\n";
    d.header += e.getJQElement().find($(".islandinfo_coords")).justtext().trim() + "\n";
    d.header += e.getJQElement().find($(".islandinfo_free")).justtext().trim();
    d.linia = {};
    $.each(e.getJQElement().find($(".island_info_left .game_list:visible li")), function(b, c) {
      d.linia[++f] = a(c);
    });
  }
  function Sa() {
    function a(d) {
      RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
      var f = $(d).children();
      return {col1:RepConvTool.Adds(JSON.parse(RepConvTool.Atob(f.eq(1).attr("href")))[GRCRTtpl.rct.outside ? "name" : "id"].toString(), GRCRTtpl.rct.town), col2:f.eq(2).html().split("|")[0].trim(), col3:f.eq(2).html().split("|")[1].trim()};
    }
    var f = 0;
    d.title = e.getTitle();
    d.time = "";
    d.header = RepConvTool.Adds(e.getJQElement().find($("#player_info h3")).justtext(), GRCRTtpl.rct.player);
    d.header += 0 < e.getJQElement().find($("#player_info>a")).length ? " (" + RepConvTool.Adds(e.getJQElement().find($("#player_info>a")).attr("onclick").replace(/.*\('(.*)'.*/, "$1"), GRCRTtpl.rct.ally) + ")" : "";
    d.linia = {};
    $.each(e.getJQElement().find($("#player_towns ul.game_list li")), function(b, c) {
      d.linia[++f] = a(c);
    });
  }
  function ia() {
    function a(d) {
      RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
      return {col1:RepConvTool.Adds(JSON.parse(RepConvTool.Atob($(d).find("a.gp_player_link").attr("href"))).name, GRCRTtpl.rct.player), col2:$(d).find("div.small-descr").html().replace(/^\s*|\s(?=\s)|\t|\s*$/g, "").split(",")[0].trim(), col3:$(d).find("div.small-descr").html().replace(/^\s*|\s(?=\s)|\t|\s*$/g, "").split(",")[1].trim()};
    }
    var f = 0;
    d.title = e.getTitle();
    d.time = "";
    d.header = RepConvTool.Adds(e.getTitle(), GRCRTtpl.rct.ally);
    d.linia = {};
    $.each(e.getJQElement().find($("#ally_towns ul.members_list>li:nth-child(2) ul li")), function(b, c) {
      d.linia[++f] = a(c);
    });
  }
  function Ta() {
    RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
    $("#RepConvBtns div.RepConvMsg").html("");
    "BBCODEE" == U.getValue() ? (GRCRTtpl.rct = GRCRTtpl.rcts.E, aa.show()) : (GRCRTtpl.rct = GRCRTtpl.rcts.A, aa.hide());
    Ca.hide();
    RepConv.Debug && console.log("btns");
    switch(Z) {
      case "command":
        Qa();
        break;
      case "breach":
      ;
      case "attack":
        n();
        break;
      case "take_over":
        n();
        d.showRT = ha.isChecked();
        ha.isChecked() && f();
        break;
      case "attackSupport":
        X();
        break;
      case "espionage":
        E();
        C();
        d.morale = "";
        d.luck = "";
        d.oldwall = {};
        d.nightbonus = "";
        d.attacker = p();
        d.defender = p();
        d.attacker = H(d.attacker, r.find($("#report_sending_town")));
        d.defender = H(d.defender, r.find($("#report_receiving_town")));
        d.defender.title = r.find($("div#left_side>h4")).html() || r.find($("div#left_side>p")).html();
        d.defender.success = 0 != r.find($("div#left_side>h4")).length;
        M("defender", "div#left_side>div.report_unit", 9);
        d.build = {};
        d.build.title = r.find($("div#spy_buildings>h4")).html();
        N("build", "div#spy_buildings>div.report_unit", 9);
        d.iron = {};
        0 < r.find($("div#right_side>h4")).length ? d.iron.title = r.find($("div#right_side>h4"))[0].innerHTML : 0 < r.find($("div#right_side>p")).length ? d.iron.title = r.find($("div#right_side>p"))[0].innerHTML.replace(/(.*:).*/, "$1") : d.iron.title = r.find($("div#report_game_body>div>p")).html().trim();
        d.iron.count = 0 < r.find($("div#right_side")).length ? r.find($("#payed_iron span")).html() || r.find($("div#right_side>p"))[0].innerHTML.replace(/.*:([0-9]*)/, "$1").trim() : "";
        B();
        d.resources.title = r.find($("#right_side>#resources")).prev().html();
        "" != d.iron.count && (d.iron.count = RepConvTool.AddSize(d.iron.count, 8));
        break;
      case "commandList":
        O();
        break;
      case "conqueroldtroops":
        F();
        break;
      case "conquerold":
        L();
        break;
      case "support":
        E();
        I();
        C();
        q();
        u();
        z();
        w();
        d.attacker = p();
        d.attacker = H(d.attacker, r.find($("#report_sending_town")));
        d.defender = H(d.defender, r.find($("#report_receiving_town")));
        d.power = 0 == r.find($("div.report_power")).length ? "" : RepConvTool.Adds(RepConv.Const.staticImg + r.find($("div.report_power")).attr("id") + "_30x30.png", "img");
        W.isChecked() ? M("attacker", "div.report_unit", 10) : d.attacker.full = {img_url:RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i")};
        break;
      case "agoraS":
      ;
      case "agoraD":
        oa();
        break;
      case "powers":
        E();
        C();
        d.attacker = H(d.attacker, r.find($("#report_sending_town")));
        d.defender = H(d.defender, r.find($("#report_receiving_town")));
        d.morale = "";
        d.luck = "";
        d.oldwall = {};
        d.nightbonus = "";
        d.efekt = {};
        d.type = -1;
        d.resources = {};
        d.power = RepConvTool.Adds(RepConv.Const.staticImg + r.find($("div#report_power_symbol")).attr("class").replace(/power_icon86x86 (.*)/, "$1") + "_30x30.png", "img");
        d.powerinfo = {};
        d.powerinfo.id = r.find($("div#report_power_symbol")).attr("class").replace(/power_icon86x86 (.*)/, "$1");
        switch(d.powerinfo.id) {
          case "happiness":
          ;
          case "fertility_improvement":
          ;
          case "bolt":
          ;
          case "earthquake":
          ;
          case "call_of_the_ocean":
          ;
          case "town_protection":
          ;
          case "cap_of_invisibility":
            d.type = 1;
            break;
          case "sea_storm":
          ;
          case "divine_sign":
          ;
          case "wisdom":
          ;
          case "transformation":
          ;
          case "patroness":
          ;
          case "resurrection":
          ;
          case "chain_lightning":
          ;
          case "demoralizing_plague":
          ;
          case "sudden_aid":
          ;
          case "demoralized_army":
            d.type = 2;
            break;
          case "kingly_gift":
          ;
          case "wedding":
          ;
          case "underworld_treasures":
          ;
          case "wedding_of_the_aristocrats":
          ;
          case "natures_gift":
            d.type = 3;
            break;
          case "fair_wind":
          ;
          case "strength_of_heroes":
          ;
          case "desire":
          ;
          case "pest":
          ;
          case "summoning_of_the_nereids":
          ;
          case "help_of_the_nereids":
            d.type = 4;
            break;
          case "cleanse":
            d.type = 5;
        }
        d.powerinfo.name = GameData.powers[d.powerinfo.id].name;
        d.powerinfo.description = r.find($("div#left_side>p")).html();
        d.efekt.title = r.find($("div#left_side h4")).html();
        switch(d.type) {
          case 1:
            d.efekt.detail = r.find($("#right_side p")).html().stripTags().trim();
            break;
          case 2:
            d.efekt.detail = r.find($("#right_side h4")).html();
            d.resources = p();
            M("resources", "#right_side div.report_unit", 5);
            break;
          case 3:
            d.efekt.detail = r.find($("#report_result")).html();
            B();
            break;
          case 5:
            if (0 < r.find($(".power_icon")).length) {
              var a = r.find($(".power_icon")).attr("name");
              d.efekt.detail = GameData.powers[a].name;
              d.resources = p();
              d.resources.img_url = RepConvTool.Adds(RepConv.Const.uiImg + "8/" + a + ".png", "img");
            }
          ;
        }
        break;
      case "raise":
        ra();
        break;
      case "wall":
        wa();
        break;
      case "illusion":
      ;
      case "conquer":
      ;
      case "found":
        E();
        I();
        C();
        d.morale = "";
        d.luck = "";
        d.oldwall = {};
        d.nightbonus = "";
        d.attacker = H(d.attacker, r.find($("#report_sending_town")));
        d.defender = H(d.defender, r.find($("#report_receiving_town")));
        var a = 0 == r.find($("#report_game_body p a.gp_town_link")).length ? "" : RepConvTool.Adds(JSON.parse(RepConvTool.Atob(r.find($("#report_game_body p a.gp_town_link")).attr("href")))[GRCRTtpl.rct.getTown].toString(), GRCRTtpl.rct.town), b = 0 == r.find($("#report_game_body p a.gp_player_link")).length ? "" : RepConvTool.Adds(r.find($("#report_game_body p a.gp_player_link")).html(), GRCRTtpl.rct.player);
        d.detail = r.find($("#report_game_body p")).html().trim().replace(/<a[^\/]*gp_player_link[^\/]*\/a>/, b).replace(/<a[^\/]*gp_town_link[^\/]*\/a>/, a);
        break;
      case "conquest":
        T();
        break;
      case "academy":
        ea();
        break;
      case "ownTropsInTheCity":
        d.title = GRCRTtpl.rct.outside ? RepConvTool.Adds(r.closest($(".ui-dialog-title")).html(), GRCRTtpl.rct.town) : RepConvTool.Adds(e.getHandler().target_id.toString(), GRCRTtpl.rct.town);
        d.title += ": " + r.find($(".support_details_box .game_header")).html().stripTags();
        d.time = "";
        d.defender = {};
        d.defender.full = l();
        d.defender.full.img_url = r.find($(".no_results")).html();
        M("defender", ".support_details_box .units_list .unit_icon25x25", 11);
        0 == d.defender.full.ua.length && (d.defender.full.img_url = r.find($(".no_results")).html());
        break;
      case "bbcode_island":
        Ra();
        break;
      case "bbcode_player":
        Sa();
        break;
      case "bbcode_alliance":
        ia();
    }
    RepConv.Debug && console.log(d);
    try {
      d.showCost = Ea.isChecked() || !1;
    } catch (c) {
    }
    if (na.isChecked()) {
      try {
        d.attacker.town = RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), GRCRTtpl.rct.town), d.title = d.title.replace(" (" + d.attacker.playerName + ")", ""), d.title = d.title.replace(d.attacker.townName, d.attacker.playerName);
      } catch (c) {
      }
    }
    if (va.isChecked()) {
      try {
        d.defender.town = RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), GRCRTtpl.rct.town), d.title = d.title.replace(" (" + d.defender.playerName + ")", ""), d.title = d.title.replace(d.defender.townName, d.defender.playerName);
      } catch (c) {
      }
    }
    if (!Fa.isChecked() && !Ga.isChecked() && "powers" != Z && "raise" != Z) {
      try {
        d.resources.img_url = RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i");
      } catch (c) {
      }
    }
    if (!Ha.isChecked()) {
      try {
        d.iron.count = RepConvTool.Adds(RepConvTool.GetLabel("HIDDEN"), "i");
      } catch (c) {
      }
    }
    try {
      d.reportImage = g(r.find($("div#report_arrow img")).attr("src"));
    } catch (c) {
    }
    ta = GRCRTtpl.report("BBCODEP" == ja.getValue() ? "txt" : "tbl", Z, d);
    ba = 0;
    Da = Object.size(ta) - 1;
    RepConv.__repconvValueArray = ta;
    D(ta);
    $("#grcrt_pagination").show();
    Ia();
  }
  function Ia() {
    "BBCODEE" == U.getValue() && aa.show();
    la.hide();
    $("#grcrt_pagination").show();
    $("#grcrt_pagination .pages").html(ba + 1 + "/" + (Da + 1));
    Ja.disable(0 == ba);
    Ka.disable(ba == Da);
    Ma = ta[ba];
    x(Ma);
  }
  function Ua() {
    function f(d, b, c) {
      $.each(d, function(d, f) {
        switch(f) {
          case "MSGATTUNIT":
            W = a(f, c);
            b.append(W);
            break;
          case "MSGRESOURCE":
            Fa = a(f, c);
            b.append(Fa);
            break;
          case "MSGHIDAT":
            na = a(f, c);
            b.append(na);
            break;
          case "MSGHIDDE":
            va = a(f, c);
            b.append(va);
            break;
          case "MSGDEFUNIT":
            fa = a(f, c);
            b.append(fa);
            break;
          case "MSGRTSHOW":
            ha = a(f, c);
            ha.on("cbx:check", function() {
              ha.isChecked() || Ba.check(!1);
            });
            b.append(ha);
            break;
          case "MSGRTONLINE":
            Ba = a(f, c);
            b.append(Ba);
            break;
          case "MSGUNITS":
            Na = a(f, c);
            b.append(Na);
            break;
          case "MSGBUILD":
            Oa = a(f, c);
            b.append(Oa);
            break;
          case "MSGUSC":
            Ha = a(f, c);
            b.append(Ha);
            break;
          case "MSGRAW":
            Ga = a(f, c);
            b.append(Ga);
            break;
          case "MSGDETAIL":
            qa = a(f, c);
            b.append(qa);
            break;
          case "MSGSHOWCOST":
            Ea = a(f, c);
            b.append(Ea);
            break;
          default:
            RepConv.Debug && console.log(f);
        }
      });
    }
    var b = $("<div/>", {id:"publish_report_options1"}), c = $("<div/>", {id:"publish_report_options2"});
    $("<div/>", {id:"publish_report_options3"});
    var e = $("<div/>", {id:"publish_report_options4"}), n = {}, g = {}, k = {}, l = RepConvTool.RamkaLight(RepConvTool.GetLabel("MSGQUEST"), b), p = RepConvTool.RamkaLight(RepConvTool.GetLabel("MSGHIDAD"), c), m = RepConvTool.RamkaLight(RepConvTool.GetLabel("MSGRTLBL"), e);
    $(p).attr("style", "width: 50%; float:right;");
    $(m).attr("style", "clear: both; top: 10px");
    RepConv.Debug && console.log("_reportType=" + Z);
    switch(Z) {
      case "command":
        G = "attack";
        n = ["MSGATTUNIT", "MSGRESOURCE"];
        g = ["MSGHIDAT", "MSGHIDDE"];
        break;
      case "breach":
      ;
      case "attack":
        G = "attack";
        n = ["MSGATTUNIT", "MSGDEFUNIT", "MSGRESOURCE", "MSGSHOWCOST"];
        g = ["MSGHIDAT", "MSGHIDDE", ""];
        break;
      case "take_over":
        G = "attack";
        n = ["MSGATTUNIT", "MSGDEFUNIT", "MSGRESOURCE", "MSGSHOWCOST"];
        g = ["MSGHIDAT", "MSGHIDDE", ""];
        h();
        P(r.find($("#report_receiving_town"))).playerName == Game.player_name && "" != d.bunt && (k = ["MSGRTSHOW", "MSGRTONLINE"]);
        break;
      case "espionage":
        G = "espionage";
        n = ["MSGUNITS", "MSGBUILD", "MSGUSC", "MSGRAW"];
        g = ["MSGHIDAT", "MSGHIDDE", "", ""];
        break;
      case "commandList":
        G = "attack";
        n = ["MSGDETAIL"];
        g = {};
        break;
      case "conquer":
      ;
      case "illusion":
        G = "attack";
        n = {};
        g = ["MSGHIDAT", "MSGHIDDE"];
        break;
      case "conquest":
      ;
      case "conquerold":
        G = "attack";
        n = ["MSGATTUNIT"];
        g = ["MSGHIDDE"];
        break;
      case "attackSupport":
        G = "attack";
        n = ["MSGDEFUNIT", "MSGSHOWCOST"];
        g = ["MSGHIDAT", "MSGHIDDE"];
        break;
      case "support":
        G = "support";
        n = ["MSGATTUNIT", ""];
        g = ["MSGHIDAT", "MSGHIDDE"];
        break;
      case "agoraD":
        G = "support";
        n = ["MSGDEFUNIT"];
        g = ["MSGHIDAT"];
        break;
      case "agoraS":
        G = "support";
        n = ["MSGATTUNIT"];
        g = ["MSGHIDDE"];
        break;
      case "powers":
        G = "attack";
        n = {};
        g = ["MSGHIDDE"];
        break;
      case "raise":
        G = "attack";
        n = ["MSGATTUNIT", "MSGDEFUNIT"];
        g = ["MSGHIDAT", "MSGHIDDE"];
        break;
      case "found":
        G = "attack";
        n = {};
        g = ["MSGHIDAT"];
        break;
      case "conqueroldtroops":
        G = "attack";
        n = {};
        g = {};
        break;
      default:
        G = "attack", n = {}, g = {};
    }
    switch(Math.max(n.length || 0, g.length || 0)) {
      case 0:
        S = 330;
        break;
      case 1:
        S = 269;
        break;
      case 2:
        S = 265;
        break;
      case 3:
        S = 250;
        break;
      case 4:
        S = 233;
    }
    S -= 0 < k.length ? 71 : 0;
    RepConv.Lang.ATTACKER = RepConvTool.GetLabel("LABELS." + G + ".ATTACKER");
    RepConv.Lang.DEFENDER = RepConvTool.GetLabel("LABELS." + G + ".DEFENDER");
    RepConv.Lang.MSGHIDAT = RepConvTool.GetLabel("LABELS." + G + ".MSGHIDAT");
    RepConv.Lang.MSGHIDDE = RepConvTool.GetLabel("LABELS." + G + ".MSGHIDDE");
    RepConv.Lang.MSGATTUNIT = RepConvTool.GetLabel("LABELS." + G + ".MSGATTUNIT");
    RepConv.Lang.MSGDEFUNIT = RepConvTool.GetLabel("LABELS." + G + ".MSGDEFUNIT");
    RepConv.Debug && console.log(RepConv.Lang.ATTACKER);
    RepConv.Debug && console.log(RepConv.Lang.LABELS[G].ATTACKER);
    RepConv.Debug && console.log(G);
    f(n, b, !0);
    f(g, c, !1);
    f(k, e, !0);
    try {
      var x = JSON.parse(RepConvTool.Atob(r.find($("#report_receiving_town .gp_town_link")).attr("href")));
      e.append($("<div/>", {id:"GRCRT_block", rel:x.id}).css("position", "absolute").css("top", "18px").css("background-color", "rgb(255, 0, 0)").css("width", "801px").css("height", "32px").css("color", "white").css("font-weight", "bold").css("padding", "2px").css("text-align", "center").css("display", x.id == Game.townId ? "none" : "block").html(RepConvTool.GetLabel("MSGRTERR") + x.name));
    } catch (ia) {
    }
    0 < n.length && 0 < g.length ? ($(l).attr("style", "width: 50%; float:left;"), $(p).attr("style", "width: 50%; float:left;")) : 0 < n.length ? ($(l).attr("style", "clear: both; top: 10px;"), $(p).attr("style", "display: none")) : 0 < g.length ? ($(l).attr("style", "display: none"), $(p).attr("style", "clear: both; top: 10px;")) : ($(l).attr("style", "display: none"), $(p).attr("style", "display: none"));
    ma.append(l);
    ma.append(p);
    0 < k.length && r.find($("#report_receiving_town .gp_player_link")).html() == Game.player_name && ma.append(m);
  }
  function Va() {
    xa = a("MSGASATTDEF", !0, "MSGASATT");
    ya = a("MSGASDEFDEF", !0, "MSGASDEF");
    za = a("MSGASATTLOS", !0, "MSGASATT");
    Aa = a("MSGASDEFLOS", !0, "MSGASDEF");
    pa = $("<div/>", {"class":"radiobutton"}).radiobutton({value:"MSGDIFF2", template:"tpl_radiobutton", options:[{value:"MSGDIFF1", name:RepConvTool.GetLabel("MSGDIFF1")}, {value:"MSGDIFF2", name:RepConvTool.GetLabel("MSGDIFF2")}, {value:"MSGDIFF3", name:RepConvTool.GetLabel("MSGDIFF3")}]}).on("rb:change:value", function() {
      RepConv.Debug && console.log("rShowDiff=" + pa.getValue());
      ua();
    });
    var d = $("<div/>").append($("<fieldset/>", {id:"publish_report_options_group_1L", style:"width:46%; float: left; border : 0px;"}).append($("<legend/>").html(RepConvTool.GetLabel("MSGDEFSITE"))).append(xa).append(ya)).append($("<fieldset/>", {id:"publish_report_options_group_1R", style:"width:46%; float: right; border : 0px;"}).append($("<legend/>").html(RepConvTool.GetLabel("MSGLOSSITE"))).append(za).append(Aa)).append($("<div/>", {style:"width: 100%; text-align: center; clear: both;"}).append(pa));
    0 == sa.find($("div.grcrt_wall_diff")).length && (pa.setValue("MSGDIFF1"), pa.disable());
    d = RepConvTool.RamkaLight(RepConvTool.GetLabel("MSGQUEST"), d, 125);
    ma.append(d);
  }
  function ua() {
    try {
      1 == $("#repConvArea").length && $("#repConvArea").remove(), 1 == $("#RepConvDivPrev").length && $("#RepConvDivPrev").remove(), $("#RepConvBtns div.RepConvMsg").html(""), Ca.show(), la.hide(), aa.hide(), $("#grcrt_pagination").hide();
    } catch (a) {
      RepConv.Debug && console.log(a);
    }
  }
  RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString()));
  RepConv.Debug && console.log("wnd.type=" + e.getType());
  var La = "undefined" == typeof e.getID, sa = La ? $("#window_" + e.getIdentifier()) : $("#gpwnd_" + e.getID()), r = La ? sa.find("div.window_content") : sa, Z = function(a) {
    if ("undefined" == typeof a.getController) {
      return a.getType();
    }
    switch(a.getController()) {
      case "building_place":
        switch(a.getContext().sub) {
          case "building_place_index":
            return "agoraD";
          case "building_place_units_beyond":
            return "agoraS";
        }
        break;
      case "building_wall":
        return "wall";
      case "command_info":
        switch(a.getContext().sub) {
          case "command_info_colonization_info":
          ;
          case "command_info_info":
            return "command";
          case "command_info_conquest_info":
            return "conquerold";
          case "command_info_conquest_movements":
            return "conqueroldtroops";
        }
        break;
      case "report":
        switch(a.getContext().sub) {
          case "report_view":
            return a = g(r.find($("div#report_arrow img")).attr("src")), "attack" == a && 0 != r.find($("div.support_report_summary")).length && (a = "attackSupport"), a;
        }
        break;
      case "town_info":
        switch(a.getContext().sub) {
          case "town_info_support":
            return "ownTropsInTheCity";
        }
        break;
      case "town_overviews":
        return "commandList";
      case "conquest_info":
        return "conquest";
      case "island_info":
        switch(a.getContext().sub) {
          case "island_info_index":
            return "bbcode_island";
        }
      ;
      case "player":
        switch(a.getContext().sub) {
          case "player_get_profile_html":
            return "bbcode_player";
        }
      ;
      case "alliance":
        switch(a.getContext().sub) {
          case "alliance_profile":
            return "bbcode_alliance";
        }
      ;
    }
    return "";
  }(e);
  $("<br/>", {style:"clear:both;"});
  var ma = $("<div/>", {style:"margin-top: 3px"}), G = "attack", S = 225, d = {}, U, ja, xa, ya, za, Aa, pa, W = a("MSGATTUNIT", !1), fa = a("MSGDEFUNIT", !1), Ea = a("MSGSHOWCOST", !1), Fa = a("MSGRESOURCE", !1), na = a("MSGHIDAT", !1), va = a("MSGHIDDE", !1), Na = a("MSGUNITS", !1), Oa = a("MSGBUILD", !1), Ha = a("MSGUSC", !1), Ga = a("MSGRAW", !1), qa = a("MSGDETAIL", !1), ha = a("MSGRTSHOW", !1), Ba = a("MSGRTONLINE", !1), Ca, la, aa, Ja, Ka, Ma, ta, ba = 0, Da = 0;
  try {
    WM.getWindowByType("grcrt_convert")[0].close();
  } catch (K) {
  }
  window.RepConvOptionsWnd = WF.open("grcrt_convert");
  RepConv.Debug && console.log("Typ=" + Z);
  switch(Z) {
    case "command":
    ;
    case "breach":
    ;
    case "attack":
    ;
    case "attackSupport":
    ;
    case "raise":
    ;
    case "take_over":
    ;
    case "commandList":
    ;
    case "conquerold":
    ;
    case "conqueroldtroops":
    ;
    case "support":
    ;
    case "agoraD":
    ;
    case "agoraS":
    ;
    case "powers":
    ;
    case "espionage":
    ;
    case "conquer":
    ;
    case "found":
    ;
    case "illusion":
    ;
    case "conquest":
    ;
    case "academy":
    ;
    case "ownTropsInTheCity":
    ;
    case "bbcode_island":
    ;
    case "bbcode_player":
    ;
    case "bbcode_alliance":
      Ua();
      break;
    case "wall":
      Va(), S = 220;
  }
  (function() {
    U = $("<div/>", {"class":"radiobutton"}).radiobutton({value:"BBCODEA", template:"tpl_radiobutton", options:[{value:"BBCODEA", name:RepConvTool.GetLabel("BBALLY")}, {value:"BBCODEE", name:RepConvTool.GetLabel("BBFORUM")}]}).on("rb:change:value", function() {
      RepConv.Debug && console.log("rBbcode=" + U.getValue());
      ua();
    });
    ja = $("<div/>", {"class":"radiobutton"}).radiobutton({value:RepConv.active.reportFormat ? "BBCODEH" : "BBCODEP", template:"tpl_radiobutton", options:[{value:"BBCODEP", name:RepConvTool.GetLabel("BBTEXT")}, {value:"BBCODEH", name:RepConvTool.GetLabel("BBHTML")}]}).on("rb:change:value", function() {
      RepConv.Debug && console.log("rBbcodeType=" + ja.getValue());
      ua();
    });
    var a = $("<div/>").append(U).append(ja), a = RepConvTool.RamkaLight(RepConvTool.GetLabel("MSGFORUM"), a, 120);
    $(a).attr("style", "clear: both; top: 10px");
    ma.append(a);
  })();
  var Pa = RepConvTool.RamkaLight(RepConvTool.GetLabel("MSGBBCODE"), "");
  $(Pa).attr("id", "RepConvAreas");
  $(ma).append(Pa);
  window.RepConvOptionsWnd.appendContent(RepConvTool.Ramka(RepConvTool.GetLabel("MSGTITLE"), ma, 485));
  window.RepConvOptionsWnd.getJQElement().find($("#publish_report_options1,#publish_report_options2")).height(window.RepConvOptionsWnd.getJQElement().find($("#publish_report_options1,#publish_report_options2")).height());
  $("#RepConvAreas div.box_content").height(S);
  (function() {
    Ca = RepConvTool.AddBtn("BTNGENER");
    la = RepConvTool.AddBtn("BTNVIEW");
    aa = RepConvTool.AddBtn("BTNVIEWBB");
    Ja = $("<div/>", {"class":"button_arrow left"}).button();
    Ka = $("<div/>", {"class":"button_arrow right"}).button();
    $("<div/>", {id:"grcrt_pagination", "class":"slider grepo_slider"}).css({width:"70px", "float":"right", padding:"2px 5px", "text-align":"center", display:"inline-block"}).append(Ja.css("float", "left").click(function() {
      0 < ba && (ba--, Ia());
    })).append($("<div/>", {"class":"pages", style:"float: left; width: 40px; padding-top: 3px;"}).html("")).append(Ka.css("float", "left").click(function() {
      ba < Da && (ba++, Ia());
    })).hide().appendTo(window.RepConvOptionsWnd.getJQElement().find($("#RepConvBtns")));
    Ca.click(function() {
      aa.show();
      la.hide();
      Ta();
    }).appendTo(window.RepConvOptionsWnd.getJQElement().find($("#RepConvBtns")));
    la.hide().click(function() {
      0 < $("#repConvArea").length && ($("#repConvArea").slideToggle(), $("#RepConvDivPrev").slideToggle(), aa.show(), la.hide());
    }).appendTo(window.RepConvOptionsWnd.getJQElement().find($("#RepConvBtns")));
    aa.hide().click(function() {
      0 < $("#repConvArea").length && ($("#repConvArea").slideToggle(), $("#RepConvDivPrev").slideToggle(), la.show(), aa.hide());
    }).appendTo(window.RepConvOptionsWnd.getJQElement().find($("#RepConvBtns")));
    $("<div/>", {"class":"RepConvMsg", style:"float: left; margin: 5px;"}).appendTo(window.RepConvOptionsWnd.getJQElement().find($("#RepConvBtns")));
    window.RepConvOptionsWnd.getJQElement().find($("#RepConvBtns")).css("display", "block");
  })();
  (La ? sa.find($(".btn_wnd.close")) : e.getJQCloseButton()).bind("click", function(a) {
    try {
      window.RepConvOptionsWnd.close();
    } catch (d) {
    }
    window.RepConvOptionsWnd = void 0;
  });
}
function _GRCRTRepConvABH() {
  function e() {
    var a = $("<div/>", {id:"GRCRT_wrpr", style:"margin:0 0 0 -7px;", "class":"tech_tree_box"}), b = $("<div/>", {id:"GRCRT_abh_settings"}).append($("<div/>", {"class":"GRCRT_abh_spacer"}).append($("<span/>", {"class":"GRCRT_abh_spcr_img"}))).append($("<div/>", {"class":"GRCRT_abh_pop"}).append($("<span/>").html(RepConvTool.GetLabel("ABH.WND.DESCRIPTION1").replace("[population]", '<span class="GRCRT_abh_pop_img"></span><span class="GRCRT_abh_pop_count"></span>'))).append($("<br/>")).append($("<span/>").html(RepConvTool.GetLabel("ABH.WND.DESCRIPTION2").replace("[max_units]", 
    '<span class="GRCRT_abh_unit_count"></span><span class="GRCRT_abh_unit_type"></span>'))).append($("<br/>")).append($("<span/>", {id:"GRCRT_abh_has_research"}).html(RepConvTool.GetLabel("ABH.WND.DESCRIPTION3").replace("[yesno]", '<span class="GRCRT_abh_has_research"></span>').replace("[research]", '<span class="GRCRT_abh_what_research"></span>'))).append($("<br/>")).append($("<span/>").html(RepConvTool.GetLabel("ABH.WND.DESCRIPTION4").replace("[max_queue]", '<span class="GRCRT_abh_max_to_build"></span>')))).append($("<div/>", 
    {"class":"GRCRT_abh_spacer"}).append($("<span/>", {"class":"GRCRT_abh_spcr_img"}))).append($("<div/>", {"class":"GRCRT_abh_target"}).append($("<span/>").html(RepConvTool.GetLabel("ABH.WND.TARGET") + ' <span class="GRCRT_abh_input"></span>'))).append($("<div/>", {"class":"GRCRT_abh_spacer"}).append($("<span/>", {"class":"GRCRT_abh_spcr_img"}))).append($("<div/>", {"class":"GRCRT_abh_pckg"}).append($("<span/>").html(RepConvTool.GetLabel("ABH.WND.PACKAGE") + ' <span class="GRCRT_abh_input"></span>'))).append($("<div/>", 
    {"class":"GRCRT_abh_spacer"}).append($("<span/>", {"class":"GRCRT_abh_spcr_img"}))).append($("<div/>", {"class":"GRCRT_abh_buttons"}).append($("<span/>"))), c = [];
    $.each(A, function(b, c) {
      var e = $("<div/>", {"class":"GRCRT_abh_column"}), g = 0;
      $.each(c, function(c, m) {
        4 == g && ($(a).append(e), e = $("<div/>", {"class":"GRCRT_abh_column"}), g = 0);
        $(e).append($("<div/>", {"class":"research_box"}).append($("<span/>", {"class":"research_icon research inactive" + m, name:m}).addClass(m).addClass(b)));
        g++;
      });
      0 < g && $(a).append(e);
    });
    c.push(RepConvTool.Ramka(RepConvTool.GetLabel("ABH.WND.UNITFRAME"), a, 318));
    c.push(b);
    return c;
  }
  function a(c) {
    RepConv.Debug && console.log(c);
    var e = ITowns.getTown(Game.townId), g = e.researches(), m = e.buildings(), t, q, u;
    $.each(A, function(b, c) {
      $.each(c, function(b, c) {
        t = g.get(c) || "sword" == c && 0 < m.get("barracks") || "big_transporter" == c && 0 < m.get("docks");
        q = GRCRTabhWnd.getJQElement().find($('#GRCRT_wrpr span[name="' + c + '"]'));
        $(q).css("cursor", t ? "pointer" : "not-allowed").removeClass("not_available").removeClass("grcrt_set").removeClass("inactive").removeClass("is_researched").mousePopup(new MousePopup(RepConvTool.GetLabel(t ? "ABH.WND.TOOLTIPOK" : "ABH.WND.TOOLTIPNOTOK"))).addClass("inactive").addClass(t ? "" : "not_available").hover(function() {
          $(this).hasClass("grcrt_set") || $(this).hasClass("not_available") || $(this).toggleClass("inactive is_researched");
        }).click(function() {
          if (!$(this).hasClass("not_available")) {
            var b = $(this).attr("name");
            GRCRTabhWnd.getJQElement().find($("grcrt_set")).attr("name");
            $(".grcrt_set").toggleClass("inactive is_researched grcrt_set");
            $(this).addClass("grcrt_set");
            a(b);
          }
        });
        $(q).parent().css("opacity", t ? "" : ".3");
      });
    });
    GRCRTabhWnd.getJQElement().find($("grcrt_set")).toggleClass("inactive is_researched grcrt_set");
    e = GRCRTabhWnd.getJQElement().find($('#GRCRT_wrpr span[name="' + c + '"]'));
    $(e).addClass("grcrt_set").toggleClass("inactive is_researched");
    $(e).hasClass("land_unit") || $(e).hasClass("sea_unit") ? (u = $(e).hasClass("land_unit") ? GameData.researches.conscription : "", u = $(e).hasClass("sea_unit") ? GameData.researches.mathematics : "", GRCRTabhWnd.getJQElement().find($(".GRCRT_abh_what_research")).text(u.name)) : u = "no_research";
    "no_research" == u ? GRCRTabhWnd.getJQElement().find($(".GRCRT_abh_has_research")).text(RepConvTool.GetLabel("ABH.WND.NORESEARCH")) : ITowns.getTown(Game.townId).researches().get(u.id) ? GRCRTabhWnd.getJQElement().find($(".GRCRT_abh_has_research")).text(RepConvTool.GetLabel("ABH.WND.HASRESEARCH")) : GRCRTabhWnd.getJQElement().find($(".GRCRT_abh_has_research")).text(RepConvTool.GetLabel("ABH.WND.NORESEARCH"));
    null != c ? $("#GRCRT_abh_has_research").show() : $("#GRCRT_abh_has_research").hide();
    e = ITowns.getTown(parseInt(Game.townId)).getAvailablePopulation();
    u = null != c ? Math.floor(e / GameData.units[c].population) : 0;
    var v = null != c ? GameData.units[c].name : "???", w = MM.checkAndPublishRawModel("Town", {id:Game.townId}).get("storage"), B = null != c ? RecruitUnits.getResearchModificationFactor(Game.townId, c) : 0, h = null != c ? RepConvTool.GetUnitCost(c, B) : {w:0, s:0, i:0}, h = [h.w, h.s, h.i], w = null != c ? Math.floor(w / Math.max.apply(Math, h)) : 0, h = null != c ? b(7, w, u) : "", k = null != c ? 7 * w > u ? u : 7 * w : 0;
    GRCRTabhWnd.getJQElement().find($("#GRCRT_abh_settings .GRCRT_abh_buttons .button")).attr("unit", c);
    GRCRTabhWnd.getJQElement().find($("#GRCRT_abh_settings .GRCRT_abh_buttons .button")).attr("factor", B);
    GRCRTabhWnd.getJQElement().find($(".GRCRT_abh_pop_count")).text(e);
    GRCRTabhWnd.getJQElement().find($(".GRCRT_abh_unit_count")).text(u);
    GRCRTabhWnd.getJQElement().find($(".GRCRT_abh_unit_type")).text(v);
    GRCRTabhWnd.getJQElement().find($(".GRCRT_abh_max_to_build")).text(k);
    GRCRTabhWnd.getJQElement().find($("#GRCRT_abh_target_input")).attr("max", k).attr("value", k);
    GRCRTabhWnd.getJQElement().find($(".GRCRT_abh_max_to_build_detail")).text(h);
    GRCRTabhWnd.getJQElement().find($("#GRCRT_abh_pckg_input")).attr("max", Math.floor(.34 * w)).attr("value", Math.floor(.34 * w));
  }
  function b(a, b, c) {
    var e = "";
    return e = a * b > c ? "(" + (b > c ? "" : Math.floor(c / b) + "x" + b + ", ") + "1x" + c % b + ")" : "(" + a + "x" + b + ")";
  }
  function c(a) {
    a.getJQElement().find($(".grcrt_abh_unit_wrapper")).remove();
    a.getJQElement().find($("#trade_duration .grcrt_abh_res_left")).remove();
    null != v.selectedTo.id && (a.getJQElement().find($("#trade_options")).append(RepConvForm.unitMinMax({name:"unit_slider_" + a.getID(), wndId:a.getID(), min:"0", max:v.pckgSize, value:v.pckgSize, tTown:v.selectedTo.id, unit:null == v.selectedTo.id ? "x" : RepConvABH.savedArr[v.selectedTo.id].unit})), a.getJQElement().find($(".grcrt_abh_selected_unit")).click(function() {
      t($(this).attr("rel"), !0, $(this).attr("wndid"));
    }), a.getJQElement().find($("#trade_duration")).append($("<div/>", {"class":"grcrt_abh_res_left"}).append($("<div/>", {style:"display:inline-flex"}).append($("<div/>").append($("<div/>", {"class":"resource_wood_icon res_icon"})).append($("<div/>", {"class":"amount"}).text(Math.round(v.resPerUnit.w * RepConvABH.savedArr[v.selectedTo.id].target_left)))).append($("<div/>").append($("<div/>", {"class":"resource_stone_icon res_icon"})).append($("<div/>", {"class":"amount"}).text(Math.round(v.resPerUnit.s * 
    RepConvABH.savedArr[v.selectedTo.id].target_left)))).append($("<div/>").append($("<div/>", {"class":"resource_iron_icon res_icon"})).append($("<div/>", {"class":"amount"}).text(Math.round(v.resPerUnit.i * RepConvABH.savedArr[v.selectedTo.id].target_left)))).append($("<div/>", {"class":"grcrt_abh_caption"}).html('<span class="target_left">' + RepConvABH.savedArr[v.selectedTo.id].target_left + "</span>/" + RepConvABH.savedArr[v.selectedTo.id].target + " " + GameData.units[RepConvABH.savedArr[v.selectedTo.id].unit].name_plural)))));
  }
  function g(a, b) {
    return {w:parseInt($.trim(a ? $("#trade_selected_from .resource_wood_icon").text() : $("#ui_box .ui_resources_bar .wood .amount").text())), s:parseInt($.trim(a ? $("#trade_selected_from .resource_stone_icon").text() : $("#ui_box .ui_resources_bar .stone .amount").text())), i:parseInt($.trim(a ? $("#trade_selected_from .resource_iron_icon").text() : $("#ui_box .ui_resources_bar .iron .amount").text())), t:parseInt($.trim(a ? $("#trade_selected_from .trade_capacity").text() : b.getJQElement().find($("#big_progressbar .max")).text()))};
  }
  function m(a, b, c, e) {
    var m = void 0 === RepConvABH.savedArr[a] ? 1 : RepConvABH.savedArr[a].factor;
    b = g(b, e);
    m = RepConvTool.GetUnitCost(RepConvABH.savedArr[a].unit, m);
    e = m.w + m.s + m.i;
    c = MM.getModels().Town[c].getAvailableTradeCapacity();
    c = Math.floor(c / e);
    b = Math.min.apply(Math, [Math.floor(b.w / m.w), Math.floor(b.s / m.s), Math.floor(b.i / m.i)]);
    return Math.min.apply(Math, [b, c, RepConvABH.savedArr[a].package]);
  }
  function t(a, b, c) {
    c = Layout.wnd.GetByID(c);
    var e = c.getHandler().target_id, e = void 0 === RepConvABH.savedArr[e] ? 1 : RepConvABH.savedArr[e].factor;
    g(b, c);
    var m = b ? v.resPerUnit : RepConvTool.GetUnitCost(a, e), q = parseInt(c.getJQElement().find($(".grcrt_abh_selected_unit span.value")).html());
    a = q * m.w;
    e = q * m.s;
    m = q * m.i;
    b && (c.getJQElement().find($("#trade_overview_type_wood")).select().val(a).blur(), c.getJQElement().find($("#trade_overview_type_stone")).select().val(e).blur(), c.getJQElement().find($("#trade_overview_type_iron")).select().val(m).blur());
    b || (c.getJQElement().find($("#trade_type_wood input")).select().val(a).blur(), c.getJQElement().find($("#trade_type_stone input")).select().val(e).blur(), c.getJQElement().find($("#trade_type_iron input")).select().val(m).blur());
  }
  var A = {land_unit:"slinger hoplite rider catapult sword archer chariot".split(" "), sea_unit:"big_transporter small_transporter bireme attack_ship demolition_ship trireme colonize_ship".split(" ")}, v = {selectedFrom:{id:null}, selectedTo:{id:null}, resPerUnit:{}, targetTown:"", pckgSize:0};
  this.showView = function() {
    var b = null === RepConvABH.savedArr ? null : void 0 === RepConvABH.savedArr[Game.townId] ? null : RepConvABH.savedArr[Game.townId].unit;
    try {
      WM.getWindowByType("grcrt_abh")[0].close();
    } catch (c) {
    }
    window.GRCRTabhWnd = WF.open("grcrt_abh");
    GRCRTabhWnd.setContent2(e());
    GRCRTabhWnd.getJQElement().find($(".grcrt_frame")).css({position:"", "padding-left":"5px", overflow:"hidden"}).addClass("academy");
    GRCRTabhWnd.getJQElement().find($(".inner_box")).css({width:"322px", "float":"left", "margin-right":"20px"});
    $(RepConvForm.inputMinMax({name:"GRCRT_abh_target_input", value:"0", size:"2", min:"0", max:"0"})).appendTo(".GRCRT_abh_target .GRCRT_abh_input");
    $(RepConvForm.inputMinMax({name:"GRCRT_abh_pckg_input", value:"0", size:"1", min:"0", max:"0"})).appendTo(".GRCRT_abh_pckg .GRCRT_abh_input");
    $(RepConvForm.button(RepConvTool.GetLabel("ABH.WND.BTNSAVE"))).click(function() {
      var a = RepConvABH.savedArr || {};
      a[Game.townId] = {unit:$(this).attr("unit"), target:parseInt($("#GRCRT_abh_target_input").val()), target_left:parseInt($("#GRCRT_abh_target_input").val()), factor:parseFloat($(this).attr("factor")), "package":parseInt($("#GRCRT_abh_pckg_input").val())};
      RepConvABH.savedArr = a;
      RepConvTool.setItem(RepConv.CookieUnitsABH, JSON.stringify(RepConvABH.savedArr));
      RepConv.Debug && console.log(JSON.stringify(a));
      setTimeout(function() {
        HumanMessage.success(RepConvTool.GetLabel("ABH.WND.SETTINGSAVED").replace("[city]", Game.townName));
      }, 0);
    }).appendTo("#GRCRT_abh_settings .GRCRT_abh_buttons").css("margin", "auto");
    a(b);
  };
  this.functCall = function(a, b) {
    if (0 == a.getJQElement().find($(".grcrt_abh_selected_unit")).length) {
      if (b) {
        $("#trade_selected_from").bind("DOMSubtreeModified", function() {
          0 == a.getJQElement().find($("#trade_selected_from .gp_town_link")).length ? (v.selectedFrom = {id:null}, v.pckgSize = "0", v.resPerUnit = RepConvTool.GetUnitCost("x")) : (v.selectedFrom = JSON.parse(RepConvTool.Atob(a.getJQElement().find($("#trade_selected_from .gp_town_link")).attr("href"))), void 0 !== RepConvABH.savedArr[v.selectedTo.id] && (v.pckgSize = m(v.selectedTo.id, !0, v.selectedFrom.id, a), v.resPerUnit = RepConvTool.GetUnitCost(RepConvABH.savedArr[v.selectedTo.id].unit, parseFloat(RepConvABH.savedArr[v.selectedTo.id].factor))));
          c(a);
        }), $("#trade_selected_to").bind("DOMSubtreeModified", function() {
          v.selectedTo = 0 == a.getJQElement().find($("#trade_selected_to .gp_town_link")).length ? {id:null} : JSON.parse(RepConvTool.Atob(a.getJQElement().find($("#trade_selected_to .gp_town_link")).attr("href")));
          void 0 === RepConvABH.savedArr[v.selectedTo.id] ? a.getJQElement().find($(".grcrt_abh_unit_wrapper")).remove() : (v.pckgSize = null == v.selectedFrom.id ? 0 : m(v.selectedTo.id, !0, v.selectedFrom.id, a), v.resPerUnit = null == v.selectedFrom.id ? RepConvTool.GetUnitCost("x") : RepConvTool.GetUnitCost(RepConvABH.savedArr[v.selectedTo.id].unit, parseFloat(RepConvABH.savedArr[v.selectedTo.id].factor)), c(a));
        }), $("#trade_buttons .confirm").click(function() {
          null != v.selectedFrom.id && null != v.selectedTo.id && (RepConvABH.savedArr[v.selectedTo.id].target_left = parseInt(RepConvABH.savedArr[v.selectedTo.id].target_left) - parseInt(a.getJQElement().find($(".grcrt_abh_selected_unit .value")).text()), _res = {wood:parseInt(a.getJQElement().find($(".grcrt_abh_res_left .wood .amount")).text()), stone:parseInt(a.getJQElement().find($(".grcrt_abh_res_left .stone .amount")).text()), iron:parseInt(a.getJQElement().find($(".grcrt_abh_res_left .iron .amount")).text())}, 
          a.getJQElement().find($(".grcrt_abh_res_left .wood .amount")).text(_res.wood - parseInt(a.getJQElement().find($("#trade_overview_type_wood")).val())), a.getJQElement().find($(".grcrt_abh_res_left .stone .amount")).text(_res.stone - parseInt(a.getJQElement().find($("#trade_overview_type_stone")).val())), a.getJQElement().find($(".grcrt_abh_res_left .iron .amount")).text(_res.iron - parseInt(a.getJQElement().find($("#trade_overview_type_iron")).val())), a.getJQElement().find($(".grcrt_abh_res_left .target_left")).text(RepConvABH.savedArr[v.selectedTo.id].target_left), 
          RepConvTool.setItem(RepConv.CookieUnitsABH, JSON.stringify(RepConvABH.savedArr)));
        });
      } else {
        var e = a.getHandler().target_id, g = RepConvTool.GetUnitCost(null == RepConvABH.savedArr || void 0 === RepConvABH.savedArr[e] ? "x" : RepConvABH.savedArr[e].unit), A = null == RepConvABH.savedArr || void 0 === RepConvABH.savedArr[e] ? "0" : m(e, b, Game.townId, a);
        null != RepConvABH.savedArr && void 0 != RepConvABH.savedArr[e] && (a.getJQElement().find($("#trade .content")).append(RepConvForm.unitMinMax({name:"unit_slider_" + a.getID(), wndId:a.getID(), min:"0", max:A, value:A, tTown:e, unit:RepConvABH.savedArr[e].unit})).append($("<div/>", {"class":"grcrt_abh_res_left"}).append($("<div/>", {style:"margin:auto;"}).append($("<div/>", {"class":"grcrt_abh_caption"}).html('<span class="target_left">' + RepConvABH.savedArr[e].target_left + "</span>/" + 
        RepConvABH.savedArr[e].target + " " + GameData.units[RepConvABH.savedArr[e].unit].name_plural))).append($("<div/>", {style:"display:inline-flex"}).append($("<div/>").append($("<div/>", {"class":"resource_wood_icon res_icon"})).append($("<div/>", {"class":"amount wood"}).text(Math.round(g.w * RepConvABH.savedArr[e].target_left)))).append($("<div/>").append($("<div/>", {"class":"resource_stone_icon res_icon"})).append($("<div/>", {"class":"amount stone"}).text(Math.round(g.s * RepConvABH.savedArr[e].target_left)))).append($("<div/>").append($("<div/>", 
        {"class":"resource_iron_icon res_icon"})).append($("<div/>", {"class":"amount iron"}).text(Math.round(g.i * RepConvABH.savedArr[e].target_left)))))), a.getJQElement().find($(".btn_trade_button")).bind("click", function() {
          RepConvABH.savedArr[e].target_left -= parseInt($(".grcrt_abh_selected_unit .value").text());
          var b = parseInt(a.getJQElement().find($(".grcrt_abh_res_left .wood.amount")).text()), c = parseInt(a.getJQElement().find($(".grcrt_abh_res_left .stone.amount")).text()), g = parseInt(a.getJQElement().find($(".grcrt_abh_res_left .iron.amount")).text());
          a.getJQElement().find($(".grcrt_abh_res_left .wood.amount")).text(b - parseInt(a.getJQElement().find($("#trade_type_wood input")).val()));
          a.getJQElement().find($(".grcrt_abh_res_left .stone.amount")).text(c - parseInt(a.getJQElement().find($("#trade_type_stone input")).val()));
          a.getJQElement().find($(".grcrt_abh_res_left .iron.amount")).text(g - parseInt(a.getJQElement().find($("#trade_type_iron input")).val()));
          a.getJQElement().find($(".grcrt_abh_res_left .target_left")).text(RepConvABH.savedArr[e].target_left);
          RepConvTool.setItem(RepConv.CookieUnitsABH, JSON.stringify(RepConvABH.savedArr));
        }), a.getJQElement().find($(".grcrt_abh_selected_unit")).click(function() {
          t($(this).attr("rel"), !1, $(this).attr("wndid"));
        }));
      }
    }
  };
  this.savedArr = {};
  $("head").append($("<style/>").append('.grcrt_target_btn {background-image: url("' + RepConv.Const.uiImg + 'pm.png");height:20px;width:20px;margin-top: 1px;vertical-align: top;display:inline-block;cursor:pointer;background-position:0px 0px;}').append(".grcrt_target_down {background-position:-20px 0px;}").append(".grcrt_target_down:hover {background-position: -20px -21px;}").append(".grcrt_target_up:hover {background-position: 0 -21px;}").append(".grcrt_abh_unit_wrapper {position: absolute;top: 135px;left: 120px;cursor:pointer;}").append("#trade_overview_wrapper .grcrt_abh_unit_wrapper {position: absolute;top: 5px;left: 10px;cursor:pointer;}").append(".grcrt_abh_unit_wrapper .grcrt_abh_selected_unit {margin: 0px;}").append("div#trade_tab div.grcrt_abh_res_left {position: absolute;left: 10px;bottom: 5px;width: 100%;font-size:0.7em}").append("div#trade_tab div.grcrt_abh_res_left div.amount {width: 40px;margin-right: 20px;text-align: right;float: left;}").append("div#trade_tab div.content {min-height: 340px;}").append("div#trade_duration div.grcrt_abh_res_left {position: absolute;left: 250px;bottom: 3px;width: 100%;}").append("div#trade_duration div.grcrt_abh_res_left div.amount {width: 40px;margin-right: 20px;text-align: right;float: left;}").append(".GRCRT_abh_pop_count, .GRCRT_abh_unit_count, .GRCRT_abh_unit_type, .GRCRT_abh_has_curator, .GRCRT_abh_has_research, .GRCRT_abh_what_research, .GRCRT_abh_max_to_build {font-weight: bold;margin:0 3px;}").append('.GRCRT_abh_pop_img {background:url("' + 
  RepConv.Const.uiImg + '3/pop.png") no-repeat scroll center top rgba(0, 0, 0, 0);width:30px;height:30px;display: inline-block;vertical-align: middle;}').append("#GRCRT_wrpr {float:left;}").append("#GRCRT_abh_settings {float:left;width: 400px;text-align: center;}").append(".GRCRT_abh_spacer {clear:both;}").append('.GRCRT_abh_spcr_img {background:url("' + RepConv.Const.uiImg + 'div_hor.png") no-repeat scroll center top rgba(0, 0, 0, 0);width:auto,;height:25px;display: block;margin-bottom: 10px;position:relative;top: 5px;background-size:90% ;}').append("#GRCRT_wrpr {height: 283px;}").append('.GRCRT_abh_column {border-left: 2px groove #D6B468;float: left;height: 100%;background:url("' + 
  Game.img(!0) + '/game/border/even.png") 0 0 repeat;width: 62px;padding: 7px 6px 5px 9px;}'));
  RepConv.menu.abh = {name:"ABH.WND.WINDOWTITLE", action:"RepConvABH.showView()", "class":"abh"};
  $("head").append($("<style/>").append(".grcrt.abh { background-position: -42px -80px;}"));
  $.Observer(GameEvents.town.town_switch).subscribe("GRCRT_ABH_town_town_switch", function(b, c) {
    var e = null === RepConvABH.savedArr ? null : void 0 === RepConvABH.savedArr[Game.townId] ? null : RepConvABH.savedArr[Game.townId].unit;
    "undefined" != typeof GRCRTabhWnd && a(e);
  });
  RepConv.initArray.push("RepConvABH.init()");
  RepConv.wndArray.push("grcrt_abh");
  this.init = function() {
    new _grcrtWindowABH;
  };
}
function _grcrtWindowABH() {
  require("game/windows/ids").GRCRT_ABH = "grcrt_abh";
  (function() {
    var e = window.GameControllers.TabController, a = e.extend({initialize:function() {
      e.prototype.initialize.apply(this, arguments);
      var a = this.getWindowModel(), c = $("<div/>").css({margin:"10px"});
      this.$el.html(c);
      a.hideLoading();
      a.getJQElement || (a.getJQElement = function() {
        return c;
      });
      a.appendContent || (a.appendContent = function(a) {
        return c.append(a);
      });
      a.setContent2 || (a.setContent2 = function(a) {
        return c.html(a);
      });
    }, render:function() {
    }});
    window.GameViews.GrcRTView_grcrt_abh = a;
  })();
  (function() {
    var e = window.GameViews, a = window.WindowFactorySettings, b = require("game/windows/ids"), c = require("game/windows/tabs"), g = b.GRCRT_ABH;
    a[g] = function(a) {
      a = a || {};
      return us.extend({window_type:g, minheight:380, maxheight:390, width:780, tabs:[{type:c.INDEX, title:"none", content_view_constructor:e.GrcRTView_grcrt_abh, hidden:!0}], max_instances:1, activepagenr:0, minimizable:!0, resizable:!1, title:RepConvTool.GetLabel("ABH.WND.WINDOWTITLE"), special_buttons:{help:{action:{type:"external_link", url:RepConv.Scripts_url + "module/grchowto#2"}}}}, a);
    };
  })();
}
function _GRCRTRepConvTSL() {
  function e(a) {
    $(a).attr("townid");
    var b = GRCRTtslWnd.getJQElement().find($(".tsl_set"));
    $(b).toggleClass("tsl_set");
    $(a).addClass("tsl_set");
  }
  function a() {
    var a = {}, b = [], e = MM.getModels().Town[Game.townId].getResearches().hasResearch("cartography") ? GameData.research_bonus.cartography_speed : 0, t = 1 == ITowns.towns[Game.townId].buildings().getBuildingLevel("lighthouse") ? .15 : 0, A = GameData.units.attack_ship.speed * (1 + e + t), v = 900 / Game.game_speed, e = Game.townId, x = MM.getModels().Town[e], e = $("<div/>", {id:"townsSortedList"}), D, E = $("<div/>", {id:"townsSortedListDetail"}), C;
    $.each(MM.getCollections().TownGroupTown[0].getTowns(MM.getCollections().TownGroup[0].getActiveGroupId()), function(e, m) {
      C = MM.getModels().Town[m.getTownId()];
      if (x.getId() != C.getId()) {
        var t = $.toe.calc.getDistance({x:x.get("abs_x"), y:x.get("abs_y")}, {x:C.get("abs_x"), y:C.get("abs_y")});
        void 0 == a[t] && (a[t] = {time:0, towns:[]}, b.push(t));
        a[t].towns.push({id:C.getId(), name:C.getName()});
        a[t].timeInSec = Math.round(50 * t / A) + v;
        a[t].time = readableUnixTimestamp(a[t].timeInSec, "no_offset", {with_seconds:!0});
      }
    });
    do {
      for (D = !1, t = 0;t < b.length - 1;t++) {
        b[t] > b[t + 1] && (D = b[t], b[t] = b[t + 1], b[t + 1] = D, D = !0);
      }
    } while (D);
    $(e).append($("<div/>", {id:"TSLhead"}).append($("<span/>", {"class":"TSLwrapper"}).append($("<span/>", {"class":"TSLicon"})).append($("<span/>", {"class":"TSLcityName", style:14 < Game.townName.length ? "font-size: 8px;" : "", townid:Game.townId}).append($("<a/>", {"class":"gp_town_link", style:"color: white", href:"#" + MM.getModels().Town[Game.townId].getLinkFragment()}).html(Game.townName))).append($("<span/>", {"class":"TSLicon"}))));
    $.each(b, function(b, e) {
      $.each(a[e].towns, function(a, b) {
        $(E).append($("<div/>", {"class":"TSLitem", townid:b.id}).text(b.name));
      });
    });
    $(e).append(E);
    return e;
  }
  var b = RepConv.grcrt_cdn + "ui/tsl_sprite.png?3.3.0";
  this.createWindow = function() {
    try {
      WM.getWindowByType("grcrt_tsl")[0].close();
    } catch (b) {
    }
    window.GRCRTtslWnd = WF.open("grcrt_tsl");
    GRCRTtslWnd.setContent2(a());
    $("#townsSortedList > #townsSortedListDetail > div[townid]").click(function() {
      HelperTown.townSwitch($(this).attr("townid"));
      e(this);
    });
  };
  RepConv.menu.tsl = {name:"TSL.WND.WINDOWTITLE", action:"RepConvTSL.createWindow();", "class":"tsl"};
  $("head").append($("<style/>").append(".grcrt.tsl { background-position: -113px -80px; cursor: pointer;}"));
  $("head").append($("<style/>").append("#townsSortedList {height: 100%;overflow-y: auto;font-size: 11px;font-family: Verdana;font-weight: 700;}").append("#TSLhead {height: 30px;width: 100%;position: relative;background: url(" + b + ") 0 0 repeat-x;}").append("#townsSortedListDetail {height: 365px;overflow-x: hidden;overflow-y: scroll;margin-left: 5px;}").append(".TSLwrapper {height: 16px;width: 160px;position: absolute;top: 0;right: 0;bottom: 0;left: 0;margin: auto;}").append(".TSLicon {width: 18px;height: 16px;background: url(" + 
  b + ") -44px -31px no-repeat;display: inline-block;}").append(".TSLcityName {display: inline-block;vertical-align: top;color: #FFF;width: 124px;text-align: center;}").append(".TSLitem {cursor: pointer;color: #423515;line-height: 22px;position: relative;}").append(".TSLitem:hover {background-color: rgba(0, 0, 0, 0.1);}").append('.TSLitem:hover::before {content: "";display: inline-block;border: 4px solid transparent;border-left: 7px solid #423515;padding-right: 10px;}').append('.TSLitem:hover::after {content: "";display: inline-block;background: url(' + 
  b + ") -44px -68px no-repeat;width: 15px;height: 19px;padding-right: 10px;position: absolute;right: 5px;}").append('.tsl_set {content: "";display: inline-block;border: 4px solid transparent;border-left: 7px solid #423515;padding-right: 10px;background-color: rgba(0, 0, 0, 0.1);width: 170px;padding-left: 10px;}'));
  $("#townsSortedList > #townsSortedListDetail > div[townid]").click(function() {
    HelperTown.townSwitch($(this).attr("townid"));
    e(this);
  });
  RepConv.initArray.push("RepConvTSL.init()");
  RepConv.wndArray.push("grcrt_tsl");
  this.init = function() {
    new _grcrtWindowTSL;
  };
}
function _grcrtWindowTSL() {
  require("game/windows/ids").GRCRT_TSL = "grcrt_tsl";
  (function() {
    var e = window.GameControllers.TabController, a = e.extend({initialize:function(a) {
      e.prototype.initialize.apply(this, arguments);
      var c = this.getWindowModel(), g = $("<div/>");
      this.$el.html(g);
      c.hideLoading();
      c.getJQElement || (c.getJQElement = function() {
        return g;
      });
      c.appendContent || (c.appendContent = function(a) {
        return g.append(a);
      });
      c.setContent2 || (c.setContent2 = function(a) {
        return g.html(a);
      });
    }, render:function() {
    }});
    window.GameViews.GrcRTView_grcrt_tsl = a;
  })();
  (function() {
    var e = window.GameViews, a = window.WindowFactorySettings, b = require("game/windows/ids"), c = require("game/windows/tabs"), g = b.GRCRT_TSL;
    a[g] = function(a) {
      a = a || {};
      return us.extend({window_type:g, minheight:440, maxheight:440, width:220, tabs:[{type:c.INDEX, title:"none", content_view_constructor:e.GrcRTView_grcrt_tsl, hidden:!0}], max_instances:1, activepagenr:0, minimizable:!0, resizable:!1, title:RepConvTool.GetLabel("TSL.WND.WINDOWTITLE"), special_buttons:{help:{action:{type:"external_link", url:RepConv.Scripts_url + "module/grchowto#3"}}}}, a);
    };
  })();
}
function _GRCRTTradeFarmOldVersion() {
  function e(a) {
    a.getName();
    $.each(a.getJQElement().find($(".fp_property>.popup_ratio")).parent(), function(a, b) {
      if (!$(b).hasClass("grcrt_trade")) {
        if (!$(b).children(0).eq(0).hasClass("you_pay")) {
          var e = $(b).children(0).eq(0).attr("class"), t = $(b).children(0).eq(2).attr("class");
          $(b).children(0).eq(0).attr("class", t);
          $(b).children(0).eq(2).attr("class", e);
        }
        $(b).children(0).eq(1).html(RepConvOT.grcrtratio($(b).children(0).eq(1).html()));
        $(b).addClass("grcrt_trade");
      }
    });
  }
  function a(a) {
    a.getName();
    if (0 == a.getJQElement().find($(".grcrt_trin")).length) {
      var c = a.getJQElement().find($(".trade_slider_box>a.button")).attr("onclick").replace(/.*'([0-9]*)'.*/, "$1"), c = WMap.mapData.getFarmTown(c), e = Math.round(100 * c.ratio) / 100, m = !1, t, A;
      a.getJQElement().find($(".trade_slider_count>input.trade_slider_input")).before($("<div/>", {"class":"grcrt_trin spinner"}));
      a.getJQElement().find($(".trade_slider_count>input.trade_slider_output")).before($("<div/>", {"class":"grcrt_trout spinner"}));
      t = a.getJQElement().find($(".grcrt_trin")).spinner({value:100, step:100, max:Math.min(ITowns.getTown(Game.townId).getAvailableTradeCapacity(), 2E3), min:100}).on("sp:change:value", function() {
        m || (m = !0, a.getJQElement().find($(".trade_slider_count>input.trade_slider_input")).select().val(t.getValue()).blur(), A.setValue(e * t.getValue()), a.getJQElement().find($(".trade_slider_count>input.trade_slider_output")).select().val(A.getValue()).blur(), m = !1);
      });
      A = a.getJQElement().find($(".grcrt_trout")).spinner({value:Math.round(100 * e), step:100, max:Math.round(e * Math.min(ITowns.getTown(Game.townId).getAvailableTradeCapacity(), 2E3)), min:Math.round(100 * e)}).on("sp:change:value", function() {
        m || (m = !0, a.getJQElement().find($(".trade_slider_count>input.trade_slider_output")).select().val(A.getValue()).blur(), t.setValue(A.getValue() / e), a.getJQElement().find($(".trade_slider_count>input.trade_slider_input")).select().val(t.getValue()).blur(), m = !1);
      });
      t.setValue(Math.min(ITowns.getTown(Game.townId).getAvailableTradeCapacity(), t.getMax()));
      a.getJQElement().find($(".grcrt_trin")).css({top:110, left:96});
      a.getJQElement().find($(".grcrt_trout")).css({top:110, left:165});
      a.getJQElement().find($("input.trade_slider_input")).hide();
      a.getJQElement().find($("input.trade_slider_output")).hide();
      a.getJQElement().find($("div.left_container")).hide();
      a.getJQElement().find($("div.right_container")).hide();
      a.getJQElement().find($("div.trade_slider_slider")).hide();
      a.getJQElement().find($("form.trade_slider_count img.demand")).css({left:24});
      a.getJQElement().find($("form.trade_slider_count img.offer")).css({left:151});
      a.getJQElement().find($("form.trade_slider_count span.offer_header")).css({left:228, right:"auto"});
      a.getJQElement().find($("form.trade_slider_count span.demand_header")).css({left:"auto", right:228});
      a.getJQElement().find($(".trade_slider_box>a.button")).css({bottom:21});
      c = 1 <= e ? '<span style="color:rgb(0, 224, 28)">1:' + e + "</span>" : '<span style="color:rgb(247, 59, 34)">1:' + e + "</span>";
      a.getJQElement().find($(".trade_ratio:not(.trade_ratio_back)")).html(c);
      a.getJQElement().find($(".trade_ratio.trade_ratio_back")).html(c.stripTags());
    }
  }
  this.grcrtratio = function(a) {
    a = a.split(":");
    a = Math.round(a[0] / a[1] * 100) / 100;
    return 1 <= a ? '<span style="color:green; font-weight: bold">1:' + a + "</span>" : '<span style="color:red; font-weight: bold">1:' + a + "</span>";
  };
  this.init = function() {
    if ("undefined" == typeof GameData.FarmMouseOverTemplate) {
      setTimeout(function() {
        RepConvOT.init();
      }, 500);
    } else {
      if (-1 == GameData.FarmMouseOverTemplate.indexOf("you_pay")) {
        if ("undefined" == RepConv.settings[RepConv.Cookie + "_trade"] && RepConvTool.setItem(RepConv.Cookie + "_trade", !0), RepConv.settings[RepConv.Cookie + "_trade"]) {
          if ("undefined" == typeof GameData.FarmMouseOverTemplateGRCRT || GameData.FarmMouseOverTemplateOrg != GameData.FarmMouseOverTemplate) {
            GameData.FarmMouseOverTemplateOrg = GameData.FarmMouseOverTemplate, GameData.FarmMouseOverTemplateGRCRT = GameData.FarmMouseOverTemplate.replace(/offer/, "dem_and").replace(/demand/, "offer").replace(/dem_and/, "demand").replace(/ ratio /, "RepConvOT.grcrtratio(ratio)"), GameData.FarmMouseOverTemplate = GameData.FarmMouseOverTemplateGRCRT;
          }
        } else {
          "undefined" != typeof GameData.FarmMouseOverTemplateGRCRT && (GameData.FarmMouseOverTemplate = GameData.FarmMouseOverTemplateOrg);
        }
      } else {
        RepConv.settings[RepConv.Cookie + "_trade"] = !1;
      }
    }
  };
  $(document).ajaxComplete(function(b, c, g) {
    "undefined" != typeof g && (b = g.url.replace(/\/game\/(.*)\?.*/, "$1"), b = "frontend_bridge" != b ? b : -1 < g.url.indexOf("json") ? JSON.parse(unescape(g.url).split("&")[3].split("=")[1]).window_type : b, RepConv.requests[b] = {url:g.url, responseText:c.responseText}, $.each(Layout.wnd.getAllOpen(), function(b, c) {
      RepConv.Debug && console.log("Dodanie przycisku dla starego okna o ID = " + c.getID());
      var g = Layout.wnd.GetByID(c.getID());
      RepConv.AQQ = g;
      if (RepConv.settings[RepConv.Cookie + "_trade"]) {
        switch(g.getController()) {
          case "farm_town_info":
            switch(g.getContext().sub) {
              case "farm_town_info_trading":
                a(g);
            }
            break;
          case "farm_town_overviews":
            switch(g.getContext().sub) {
              case "farm_town_overviews_index":
                e(g);
            }
            break;
          case "island_info":
            e(g);
        }
      }
    }));
  });
  RepConv.initArray.push("RepConvOT.init()");
  $.Observer(GameEvents.grcrt.settings.load).subscribe("GRCRTsl", function() {
    RepConvOT.init();
  });
}
function _GRCRTRepConvGRC() {
  function e(a) {
    a.getWindowVeryMainNode().find($("div.ui-dialog-titlebar.ui-widget-header a.grc_reload")).remove();
    switch(a.getController()) {
      case "building_barracks":
      ;
      case "building_docks":
        0 == a.getWindowVeryMainNode().find($("div.ui-dialog-titlebar.ui-widget-header a.grc_reload")).length && a.getWindowVeryMainNode().find($("div.ui-dialog-titlebar.ui-widget-header")).append($("<a/>", {href:"#n", "class":"grc_reload down_big reload", style:"float: right; height: 22px; margin: -1px 0 1px;", rel:a.getID()}).click(function() {
          switch(Layout.wnd.getWindowById($(this).attr("rel")).getController()) {
            case "building_barracks":
              BarracksWindowFactory.openBarracksWindow();
              break;
            case "building_docks":
              DocksWindowFactory.openDocksWindow();
          }
        }));
    }
  }
  function a(a) {
    var b = void 0, c = void 0;
    switch(a.getController()) {
      case "building_barracks":
        $.each(MM.checkAndPublishRawModel("PlayerGods", {id:Game.player_id}).getProductionOverview(), function(a, f) {
          "hera" == a && (b = "fertility_improvement", c = "hera");
        });
        break;
      case "building_docks":
        $.each(MM.checkAndPublishRawModel("PlayerGods", {id:Game.player_id}).getProductionOverview(), function(a, f) {
          "poseidon" == a && (b = "call_of_the_ocean", c = "poseidon");
        });
    }
    if (void 0 != b && 0 == $("#unit_order .grcrt_power").length) {
      var e = HelperPower.createCastedPowerModel(b, Game.townId), g = MM.checkAndPublishRawModel("PlayerGods", {id:Game.player_id}).get(c + "_favor") < GameData.powers[b].favor, h = g ? " disabled" : "", k = HelperPower.createCastedPowerModel(b, Game.townId);
      $.each(MM.checkAndPublishRawModel("Town", {id:Game.townId}).getCastedPowers(), function(a, f) {
        f.getPowerId() == b && (k = f, h = " active_animation extendable");
      });
      a.getJQElement().find($(".game_inner_box")).append($("<div/>", {"class":"grcrt_power"}).append($("<div/>", {"class":"powers_container clearfix"}).append($("<div/>", {"class":"power_icon45x45 " + b + " new_ui_power_icon js-power-icon" + h, "data-power_id":b, rel:c}).append($("<div/>", {"class":"extend_spell"}).append($("<div/>", {"class":"gold"})).append($("<div/>", {"class":"amount"}))).append($("<div/>", {"class":"js-caption"})).on("mouseover", function(a) {
        var f = {show_costs:!0};
        "undefined" != typeof k.getId && (f.casted_power_end_at = k.getEndAt(), f.extendable = k.isExtendable());
        $(this).tooltip(TooltipFactory.createPowerTooltip(e.getPowerId(), f)).showTooltip(a);
      }).on("click", function(c) {
        CM.unregister({main:a.getContext().main, sub:"casted_powers"}, "grcrt_power_" + k.getId());
        c = CM.register({main:a.getContext().main, sub:"casted_powers"}, "grcrt_power_" + k.getId(), a.getJQElement().find($(".grcrt_power .new_ui_power_icon .gold")).button());
        var e = HelperPower.createCastedPowerModel(b, Game.townId);
        void 0 == k.getId() ? e.cast() : k.isExtendable() && (BuyForGoldWindowFactory.openExtendPowerForGoldWindow(c, k), $(this).addClass(h));
      }))));
      if (g && !k.isExtendable()) {
        var g = GameData.powers[b], l = MM.checkAndPublishRawModel("PlayerGods", {id:Game.player_id}).getCurrentProductionOverview()[c], p = MM.checkAndPublishRawModel("PlayerGods", {id:Game.player_id})[c + "_favor_delta_property"].calculateCurrentValue().unprocessedCurrentValue, m = $("<div/>", {style:"margin-top:42px;color:black;text-shadow: 2px 2px 2px gray;font-size:10px;z-index:3000;font-weight: bold;", name:"counter"});
        CM.unregister({main:a.getContext().main, sub:"casted_powers"}, "grcrt_countdown");
        CM.register({main:a.getContext().main, sub:"casted_powers"}, "grcrt_countdown", m.countdown2({value:(g.favor - p) / l.production * 3600, display:"readable_seconds_with_days"}).on("cd:finish", function() {
          $(this).parent().removeClass("disabled");
          $(this).remove();
        }));
        a.getJQElement().find($(".new_ui_power_icon")).append(m);
      }
    }
  }
  function b(a) {
    0 == a.getJQElement().find("#GRCRTSetupLink").length && a.getJQElement().find(".settings-menu ul").eq(2).append($("<li>", {"class":"with-icon"}).append($("<img/>", {"class":"support-menu-item-icon", src:RepConv.grcrt_cdn + "img/octopus.png", style:"width: 15px;"})).append($("<a/>", {id:"GRCRTSetupLink", href:"#"}).html(RepConv.Scripts_nameS).click(function() {
      RepConvGRC.openGRCRT("HELPTAB4");
    })));
  }
  function c(a) {
    if (RepConv.active.ftabs) {
      var b = a.getWindowVeryMainNode().find($("div.menu_wrapper.minimize.menu_wrapper_scroll")), c = a.getWindowVeryMainNode().find($("div.menu_wrapper.minimize.menu_wrapper_scroll>ul"));
      a.getWindowVeryMainNode().find($(".gpwindow_content>.forum_content>.t0"));
      if (b.width() != c.width()) {
        b.width(b.width() + $(b).parent().find($("a.next")).width() + $(b).parent().find($("a.prev")).width());
        c.width(b.width());
        c.css("right", 0);
        $(b).find($("div.fade_left")).remove();
        $(b).find($("div.fade_right")).remove();
        $(b).parent().find($("a.next")).remove();
        $(b).parent().find($("a.prev")).remove();
        var c = $($("ul.menu_inner li")[$("ul.menu_inner li").length - 1]).position().top / 22 + 1, e = $("#gptop" + c).css("z-index");
        a.getJQElement().find($("div.gpwindow_content")).css("top", b.height() * (c + 1));
        b.height(b.height() * c);
        a.setHeight(a.getOptions().maxHeight + 22 * (c - 1));
        0 == a.getJQElement().find($("div.gpwindow_top#gptop1")).length && (a.getJQElement().find($("div.gpwindow_top")).attr("id", "gptop1"), a.getWindowVeryMainNode().find($("div#gptop1")).css({"z-index":"10", height:"30px"}));
        for (b = 1;b < c;b++) {
          a.getWindowVeryMainNode().find($("div#gptop" + (b + 1))).remove(), $("<div/>", {"class":"gpwindow_top", id:"gptop" + (b + 1), style:"top:" + 22 * b + "px; z-index:" + (10 - b)}).append($("<div/>", {"class":"gpwindow_left corner"})).append($("<div/>", {"class":"gpwindow_right corner"})).insertBefore(a.getJQElement().find($("div.gpwindow_content")));
        }
        for (b = c - 1;0 < b;b--) {
          $("#gptop" + b).css("z-index", ++e).css("height", "30px"), $("#gptop" + b + " .corner").css("height", "30px");
        }
        a.getWindowVeryMainNode().find($("ul.menu_inner>li")).css("float", "left");
        var g = a.getWindowVeryMainNode().find($("ul.menu_inner>li")).length;
        $.each(a.getWindowVeryMainNode().find($("ul.menu_inner>li")), function(a, b) {
          $(b).attr("lp", --g);
        });
        g = a.getWindowVeryMainNode().find($("ul.menu_inner>li")).length;
        for (b = 1;b < g;b++) {
          a.getWindowVeryMainNode().find($("ul.menu_inner>li[lp=" + b + "]")).insertAfter(a.getWindowVeryMainNode().find($("ul.menu_inner>li[lp=" + (b - 1) + "]")));
        }
      }
    }
  }
  function g(a) {
    var b = a.getName(), c = "#" + b;
    if (0 == a.getJQElement().find($(c + "RepConvTownButton")).length) {
      var e = JSON.parse(RepConv.requests[a.getController()].responseText).json.json.town_list;
      0 == a.getJQElement().find($("#island_info_towns_left_sorted_by_name li span.player_name a.gp_player_link")).length && $.each(a.getJQElement().find($("#island_info_towns_left_sorted_by_name li span.player_name")), function(a, b) {
        $.each(e, function(a, f) {
          f.player == $(b).html() && $(b).html(hCommon.player(btoa(JSON.stringify({name:f.player, id:f.pid}).replace(/[\u007f-\uffff]/g, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
          })), f.player, f.pid));
        });
      });
      0 == a.getJQElement().find($("#island_info_towns_left_sorted_by_score li span.player_name a.gp_player_link")).length && $.each(a.getJQElement().find($("#island_info_towns_left_sorted_by_score li span.player_name")), function(a, b) {
        $.each(e, function(a, f) {
          f.player == $(b).html() && $(b).html(hCommon.player(btoa(JSON.stringify({name:f.player, id:f.pid}).replace(/[\u007f-\uffff]/g, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
          })), f.player, f.pid));
        });
      });
      0 == a.getJQElement().find($("#BTNVIEWBB" + b)).length && RepConvTool.AddBtn("BTNVIEWBB", b).css("margin", "0").click(function() {
        window.GRCRTConvWnd = new _GRCRTConverterCtrl(a);
      }).insertBefore(c + " div.island_info_towns.island_info_left div.game_border_top");
      RepConv.settings[RepConv.Cookie + "_idle"] && 0 == a.getJQElement().find($(".grcrt_idle")).length && 0 != a.getJQElement().find($(".gp_player_link")).length && ($("<div/>", {"class":"grcrt_idle"}).insertBefore(a.getJQElement().find($("li:not(.reservation_tool)")).find($(".gp_player_link"))), R(a));
    }
  }
  function m(a) {
    var b = a.getName(), c = "#" + b;
    0 == a.getJQElement().find($("#BTNVIEWBB" + b)).length && RepConvTool.AddBtn("BTNVIEWBB", b).css("margin", "0").click(function() {
      window.GRCRTConvWnd = new _GRCRTConverterCtrl(a);
    }).insertBefore(c + " #player_towns div.game_border_top");
    if (0 == a.getJQElement().find($(c + "RepConvStatsPlayer")).length) {
      var e = JSON.parse(unescape(RepConv.requests.player.url).match(/({.*})/)[0]).player_id, g = a.getJQElement().find($('#write_message_form input[name="recipients"]')).val(), h = $("<a/>", {href:"#n", id:b + "RepConvStatsPlayer", player_id:e, player_name:g}).html($("<img/>", {src:RepConv.Const.staticImg + "/stats.png"})).mousePopup(new MousePopup(RepConvTool.GetLabel("STATS.PLAYER")));
      $(h).attr({href:k("player", e, g), target:"_blank"});
      a.getJQElement().find($('#write_message_form input[name="recipients"]')).parent().parent().append(h);
    }
    0 == a.getJQElement().find($(c + "RepConvRadarPlayer")).length && (e = JSON.parse(unescape(RepConv.requests.player.url).match(/({.*})/)[0]).player_id, g = a.getJQElement().find($('#write_message_form input[name="recipients"]')).val(), a.getJQElement().find($("#player_info>h3")).before($("<div/>", {id:b + "RepConvRadarPlayer", style:"width: 23px; height: 23px; float: left;", "class":"grcrt radar"}).mousePopup(new MousePopup(RepConvTool.GetLabel("RADAR.TOWNFINDER"))).click(function() {
      RepConvRadar.windowOpen({player:{id:e, name:g}});
    })));
    RepConv.settings[RepConv.Cookie + "_idle"] && 0 == a.getJQElement().find($(".grcrt_idle")).length && ($("<div/>", {"class":"grcrt_idle"}).insertAfter(a.getJQElement().find($("#player_info>h3")).next()), R(a));
  }
  function t(a) {
    var b = a.getName(), c = "#" + b;
    0 == a.getJQElement().find($("#BTNVIEWBB" + b)).length && (RepConvTool.AddBtn("BTNVIEWBB", b).css("margin", "0").click(function() {
      window.GRCRTConvWnd = new _GRCRTConverterCtrl(a);
    }).insertBefore(c + " #ally_towns div.game_border_top"), $("<a/>", {href:"#", style:"position:absolute; top:1px; right:90px;", rel:c + "RepConvTownArea", parent:c + " #player_towns"}).append($("<img/>", {id:"grcrt_ally_mass_mail", src:Game.img() + "/game/ally/mass_mail.png"})).click(function() {
      var b = "";
      $.each(a.getJQElement().find($("#ally_towns ul.members_list>li:nth-child(2) ul li")), function(a, f) {
        JSON.parse(RepConvTool.Atob($(f).find("a.gp_player_link").attr("href"))).name != Game.player_name && (b += JSON.parse(RepConvTool.Atob($(f).find("a.gp_player_link").attr("href"))).name + ";");
      });
      Layout.newMessage.open({recipients:b});
    }).insertBefore(c + " #ally_towns div.game_border_top"));
    if (0 == a.getJQElement().find($(c + "RepConvStatsAlly")).length) {
      var e = JSON.parse(unescape(RepConv.requests.alliance.url).match(/({.*})/)[0]).alliance_id, g = a.getOptions().title, h = $("<a/>", {href:"#n", id:b + "RepConvStatsAlly", ally_id:e, ally_name:g, "class":"button_new square", style:"width:26px; float: left;"}).html($("<img/>", {src:RepConv.Const.staticImg + "/stats.png"})).mousePopup(new MousePopup(RepConvTool.GetLabel("STATS.ALLY")));
      $(h).attr({href:k("alliance", e, g), target:"_blank"});
      a.getJQElement().find($("#alliance_points")).next().append(h);
    }
    0 == a.getJQElement().find($(c + "RepConvRadarAlliance")).length && (e = JSON.parse(unescape(RepConv.requests.alliance.url).match(/({.*})/)[0]).alliance_id, g = a.getOptions().title, a.getJQElement().find($("#player_info>h3")).before($("<div/>", {id:b + "RepConvRadarAlliance", style:"width: 23px; height: 23px; float: left;", "class":"grcrt radar"}).mousePopup(new MousePopup(RepConvTool.GetLabel("RADAR.TOWNFINDER"))).click(function() {
      RepConvRadar.windowOpen({alliance:{id:e, name:g}});
    })));
    RepConv.settings[RepConv.Cookie + "_idle"] && 0 == a.getJQElement().find($(".grcrt_idle")).length && ($("<div/>", {"class":"grcrt_idle"}).insertAfter(a.getJQElement().find($(".member_icon"))), R(a));
  }
  function A(a) {
    var b = a.getName();
    0 == a.getJQElement().find($("#BTNCONV" + b)).length && RepConvTool.AddBtn("BTNCONV", b).click(function() {
      window.GRCRTConvWnd = new _GRCRTConverterCtrl(a);
    }).insertAfter(a.getJQElement().find($("div.gpwindow_content a.gp_town_link")).eq(0));
  }
  function v(a) {
    var b = a.getName();
    if (0 < a.getJQElement().find($("#report_arrow")).length && 0 == a.getJQElement().find($("#BTNCONV" + b)).length && (a.getJQElement().find($("#report_report div.game_list_footer")).append(RepConvTool.AddBtn("BTNCONV", b).click(function() {
      window.GRCRTConvWnd = new _GRCRTConverterCtrl(a);
    })), RepConv.active.unitsCost)) {
      switch(b = a.getJQElement().find($("div#report_arrow img")).attr("src").replace(/.*\/([a-z_]*)\.png.*/, "$1"), "attack" == b && 0 != a.getJQElement().find($("div.support_report_summary")).length && (b = "attackSupport", a.setHeight(539)), b) {
        case "attack":
        ;
        case "take_over":
        ;
        case "breach":
        ;
        case "attackSupport":
          if (0 < a.getJQElement().find($("div.report_booty_bonus_fight")).length) {
            var c = {unit_img:"", unit_send:"", unit_lost:"", unit_list:"", w:0, s:0, i:0, p:0, f:0}, e = {unit_img:"", unit_send:"", unit_lost:"", unit_list:"", w:0, s:0, i:0, p:0, f:0}, c = RepConvTool.getUnitResource(c, a.getJQElement().find($("div.report_side_attacker_unit"))), e = RepConvTool.getUnitResource(e, a.getJQElement().find($(("attackSupport" == b ? ".support_report_summary " : "") + "div.report_side_defender_unit")));
            $(a.getJQElement().find($("div.report_booty_bonus_fight"))[0]).append($("<hr/>")).append($("<table/>", {style:"width:100%; text-align:center; font-size:12px", "class":"grcrt_lost_res"}).append($("<tr/>", {style:"height:16px; padding:0px;"}).append($("<td/>", {style:"width:45%;"}).html(c.w)).append($("<td/>", {style:"height: 15px", "class":"resource_wood_icon"})).append($("<td/>", {style:"width:45%;"}).html(e.w))).append($("<tr/>", {style:"height:16px; padding:0px;"}).append($("<td/>", 
            {style:"width:45%;"}).html(c.s)).append($("<td/>", {style:"height: 15px", "class":"resource_stone_icon"})).append($("<td/>", {style:"width:45%;"}).html(e.s))).append($("<tr/>", {style:"height:16px; padding:0px;"}).append($("<td/>", {style:"width:45%;"}).html(c.i)).append($("<td/>", {style:"height: 15px", "class":"resource_iron_icon"})).append($("<td/>", {style:"width:45%;"}).html(e.i))).append($("<tr/>", {style:"height:16px; padding:0px;"}).append($("<td/>", {style:"width:45%;"}).html(c.f)).append($("<td/>", 
            {style:"height: 14px", "class":"resource_favor_icon"})).append($("<td/>", {style:"width:45%;"}).html(e.f))).append($("<tr/>", {style:"height:16px; padding:0px;"}).append($("<td/>", {style:"width:45%;"}).html(c.p)).append($("<td/>", {style:"width:20px; margin: 0px;", "class":"town_population"})).append($("<td/>", {style:"width:45%;"}).html(e.p))));
          }
        ;
      }
    }
  }
  function x(a) {
    function b(c) {
      var e = {defAtt:{}, losAtt:{}, defDef:{}, losDef:{}, saved:c || Timestamp.server()};
      $.each(a.getJQElement().find($("div#building_wall li.odd")), function(a, b) {
        0 < a && (RepConv.Debug && console.log($(b).find($(".list_item_left")).length), $.each($(b).find($(".list_item_left")), function(d, b) {
          RepConv.Debug && console.log(m[a][d]);
          RepConv.Debug && console.log(b.getElementsByClassName("wall_report_unit").length);
          $.each($(b).find($(".grcrt_wall_units")), function(b, c) {
            var f = RepConvTool.getUnitName($(c).find($(".wall_report_unit"))), g = $(c).find($(".place_unit_black")).html();
            e[m[a][d]][f] = g;
          });
        }), RepConv.Debug && console.log($(b).find($(".list_item_right")).length), $.each($(b).find($(".list_item_right")), function(d, b) {
          RepConv.Debug && console.log(m[a][d]);
          RepConv.Debug && console.log(b.getElementsByClassName("wall_report_unit").length);
          $.each($(b).find($(".grcrt_wall_units")), function(b, c) {
            var f = RepConvTool.getUnitName($(c).find($(".wall_report_unit"))), g = $(c).find($(".place_unit_black")).html();
            e[m[a][d + 1]][f] = g;
          });
        }));
      });
      return e;
    }
    function c() {
      try {
        RepConvTool.setItem(RepConv.Cookie, b(Timestamp.server()));
        var g = RepConvTool.getItem(RepConv.CookieWall) || [];
        10 < g.length && g.remove(0, 0);
        g.push(RepConvTool.getItem(RepConv.Cookie));
        RepConvTool.setItem(RepConv.CookieWall, g);
        setTimeout(function() {
          HumanMessage.success(RepConvTool.GetLabel("MSGHUMAN.OK"));
        }, 0);
        1 == $("#" + RepConv.Const.IdWindowClone).length && $("#" + RepConv.Const.IdWindowClone).remove();
        h(0, !1);
        h(t, !0);
        a.reloadContent();
        e();
      } catch (k) {
        RepConv.Debug && console.log(k), setTimeout(function() {
          HumanMessage.error(RepConvTool.GetLabel("MSGHUMAN.ERROR"));
        }, 0);
      }
    }
    function e(b) {
      RepConv.Debug && console.log("Load wall...");
      0 == a.getJQElement().find($("#RepConvSaved")).length && a.getJQElement().find($("#building_wall div.game_border")).append($("<div/>", {id:"RepConvSaved", style:"position: relative; float: left; margin: 5px; font-weight: bold;"}));
      a.getJQElement().find($(".wall_unit_container>.wall_report_unit")).wrap($("<div/>", {"class":"grcrt_wall_units"}));
      if (null != RepConvTool.getItem(RepConv.Cookie)) {
        var c = RepConvTool.getItem(RepConv.Cookie), g = RepConvTool.getItem(RepConv.CookieWall) || [];
        void 0 != b && $.each(g, function(a, f) {
          f.saved == b && (c = f);
        });
        a.getJQElement().find($("div.grcrt_wall_diff")).remove();
        a.getJQElement().find($("div.grcrt_wall_units")).append($("<div/>", {"class":"grcrt_wall_diff"}).html("-"));
        RepConv.Debug && console.log("Load wall...");
        var h;
        $.each(a.getJQElement().find($("div#building_wall li.odd")), function(a, b) {
          0 < a && (RepConv.Debug && console.log($(b).find($(".list_item_left")).length), $.each($(b).find($(".list_item_left")), function(b, f) {
            RepConv.Debug && console.log(m[a][b]);
            RepConv.Debug && console.log(f.getElementsByClassName("wall_report_unit").length);
            $.each($(f).find($(".grcrt_wall_units")), function(f, e) {
              var g = RepConvTool.getUnitName($(e).find($(".wall_report_unit"))), n = $(e).find($(".place_unit_black")).html(), k = c[m[a][b]][g];
              RepConv.Debug && console.log(g + " " + k + "/" + n);
              h = n;
              void 0 != k && (h = n - k);
              RepConv.Debug && console.log("unitDiff = " + h);
              $(e).find($(".grcrt_wall_diff")).html(0 != h ? h : "");
            });
          }), RepConv.Debug && console.log($(b).find($(".list_item_right")).length), $.each($(b).find($(".list_item_right")), function(b, f) {
            RepConv.Debug && console.log(m[a][b]);
            RepConv.Debug && console.log(f.getElementsByClassName("wall_report_unit").length);
            $.each($(f).find($(".grcrt_wall_units")), function(f, e) {
              var g = RepConvTool.getUnitName($(e).find($(".wall_report_unit"))), n = $(e).find($(".place_unit_black")).html(), k = c[m[a][b + 1]][g];
              RepConv.Debug && console.log(g + " " + k + "/" + n);
              h = n;
              void 0 != k && (h = n - k);
              RepConv.Debug && console.log("unitDiff = " + h);
              $(e).find($(".grcrt_wall_diff")).html(0 != h ? h : "");
            });
          }));
        });
        $("#RepConvSaved").html(RepConvTool.GetLabel("WALLSAVED") + (void 0 != c.saved ? ": " + readableUnixTimestamp(c.saved, "player_timezone", {with_seconds:!0, extended_date:!0}) : "")).css("color", "black");
      } else {
        $("#RepConvSaved").html(RepConvTool.GetLabel("WALLNOTSAVED")).css("color", "red");
      }
    }
    function g(b) {
      RepConv.Debug && console.log("Load state wall...");
      var c = RepConvTool.getItem(RepConv.Cookie), h = RepConvTool.getItem(RepConv.CookieWall) || [];
      b == t ? c = O : $.each(h, function(a, d) {
        d.saved == b && (c = d);
      });
      q.disable(b != t);
      $.each(a.getJQElement().find($("div#building_wall li.odd")), function(a, d) {
        0 < a && (RepConv.Debug && console.log($(d).find($(".list_item_left")).length), $.each($(d).find($(".list_item_left")), function(d, b) {
          RepConv.Debug && console.log(m[a][d]);
          RepConv.Debug && console.log(b.getElementsByClassName("wall_report_unit").length);
          $.each($(b).find($(".grcrt_wall_units")), function(b, f) {
            var e = RepConvTool.getUnitName($(f).find($(".wall_report_unit")));
            $(f).find($(".place_unit_black")).html(c[m[a][d]][e]);
            $(f).find($(".place_unit_white")).html(c[m[a][d]][e]);
          });
        }), RepConv.Debug && console.log($(d).find($(".list_item_right")).length), $.each($(d).find($(".list_item_right")), function(d, b) {
          RepConv.Debug && console.log(m[a][d]);
          RepConv.Debug && console.log(b.getElementsByClassName("wall_report_unit").length);
          $.each($(b).find($(".grcrt_wall_units")), function(b, f) {
            var e = RepConvTool.getUnitName($(f).find($(".wall_report_unit")));
            $(f).find($(".place_unit_black")).html(c[m[a][d + 1]][e]);
            $(f).find($(".place_unit_white")).html(c[m[a][d + 1]][e]);
          });
        }));
      });
      e(B.getValue());
    }
    function h(a, b) {
      var c = [], f = RepConvTool.getItem(RepConv.CookieWall) || [];
      $.each(f, function(d, b) {
        b.saved > a && b.saved < t && c.push({value:b.saved, name:readableUnixTimestamp(b.saved, "player_timezone", {with_seconds:!0, extended_date:!0})});
      });
      b ? (c.push({value:t, name:readableUnixTimestamp(t, "player_timezone", {with_seconds:!0, extended_date:!0})}), v.setOptions(c), v.setValue(t)) : (B.setOptions(c), B.setValue(void 0 != RepConvTool.getItem(RepConv.Cookie) ? RepConvTool.getItem(RepConv.Cookie).saved : 0));
    }
    function k() {
      B = I("grcrt_saved", $("<div/>", {id:"grcrtListSaved", "class":"dropdown default"}).dropdown({list_pos:"left", value:void 0 != RepConvTool.getItem(RepConv.Cookie) ? RepConvTool.getItem(RepConv.Cookie).saved : "", class_name:"grcrt_dd_list"}).on("dd:change:value", function(a, b, c, f, d) {
        h(b, !0);
        e(b);
      }).on("dd:list:show", function() {
        v.hide();
      }));
      v = I("grcrt_wall", $("<div/>", {id:"grcrtListWall", "class":"dropdown default"}).dropdown({list_pos:"left", value:void 0 != RepConvTool.getItem(RepConv.Cookie) ? RepConvTool.getItem(RepConv.Cookie).saved : "", class_name:"grcrt_dd_list"}).on("dd:change:value", function(a, b, c, f, d) {
        g(b);
      }).on("dd:list:show", function() {
        B.hide();
      }));
      r = I("grcrt_delsaved", $("<a/>", {"class":"cancel", style:"float:right;"}).button({template:"empty"}).on("btn:click", function() {
        hOpenWindow.showConfirmDialog(RepConvTool.GetLabel("QUESTION"), RepConvTool.GetLabel("WALL.WANTDELETECURRENT"), function() {
          l();
        });
      }).mousePopup(new MousePopup(RepConvTool.GetLabel("WALL.DELETECURRENT"))));
      h(0, !1);
      h(t, !0);
      a.getJQElement().find($("div#building_wall li")).eq(0).append($("<hr/>")).append($("<div/>", {"class":"grcrt_wall_compare"}).append($("<div/>", {"class":"grcrt_wall_compare_dd", style:"width: 49%;"}).append(r).append($("<label/>", {"for":"grcrtListSaved"}).text(RepConvTool.GetLabel("WALL.LISTSAVED"))).append(B)).append($("<div/>", {"class":"grcrt_wall_compare_dd", style:"width: 49%;"}).append($("<label/>", {"for":"grcrtListWall"}).text(RepConvTool.GetLabel("WALL.LISTSTATE"))).append(v)).append($("<br/>", 
      {style:"clear:both"})));
    }
    function l() {
      try {
        var b = CM.get({main:"GRCRT", sub:"grcrt_saved"}, "grcrt_saved").getValue(), c = RepConvTool.getItem(RepConv.CookieWall) || [];
        $.each(c, function(a, f) {
          if (f.saved == b) {
            return c.remove(a, 0), !1;
          }
        });
        RepConvTool.setItem(RepConv.CookieWall, c);
        h(0, !1);
        h(t, !0);
        a.reloadContent();
        e();
        setTimeout(function() {
          HumanMessage.success(RepConvTool.GetLabel("MSGHUMAN.OK"));
        }, 0);
      } catch (g) {
        RepConv.Debug && console.log(g), setTimeout(function() {
          HumanMessage.error(RepConvTool.GetLabel("MSGHUMAN.ERROR"));
        }, 0);
      }
    }
    var p = a.getName(), m = {1:["defAtt", "losAtt"], 2:["defDef", "losDef"]}, q, t = Timestamp.server(), O = b(t), B, v, r;
    0 == a.getJQElement().find($("#building_wall div.game_border #BTNCONV" + p)).length && (a.getJQElement().find("#building_wall ul.game_list").css("max-height", "455px"), RepConvTool.AddBtn("BTNCONV", p).click(function() {
      B.hide();
      v.hide();
      window.GRCRTConvWnd = new _GRCRTConverterCtrl(a);
    }).appendTo(a.getJQElement().find($("#building_wall div.game_border"))));
    0 == a.getJQElement().find($("#building_wall div.game_border #BTNSAVE" + p)).length && (q = RepConvTool.AddBtn("BTNSAVE", p).on("btn:click", function() {
      c();
    }), q.appendTo(a.getJQElement().find($("#building_wall div.game_border"))), $.each(a.getJQElement().find($("div#building_wall li.odd")), function(a, b) {
      0 < $(b.previousElementSibling).find($(".wall_symbol")).length && $(b.previousElementSibling).css("cursor", "pointer").click(function() {
        $(b).slideToggle(200);
      });
    }), e(), k(), O = b(t), RepConv.wall = O);
  }
  function D(a) {
    function b() {
      var c = {}, e, g = {}, h = 0, n = "", k = 0, m, l;
      $.each(a.getJQElement().find($('.game_list li[id^="support_units_"] a.gp_player_link')), function(a, b) {
        e = $(b).attr("href").split(/#/);
        m = JSON.parse(atob(e[1] || e[0]));
        Game.player_name != m.name && void 0 == c[m.id] && (c[m.id] = m);
      });
      $.each(c, function(a, b) {
        var f = {player_id:b.id, town_id:Game.townId, nl_init:NotificationLoader.isGameInitialized()}, e, f = $.ajax({url:"/game/player?action=get_profile_html&town_id=" + Game.townId + "&h=" + Game.csrfToken + "&json=" + JSON.stringify(f), async:!1});
        try {
          e = JSON.parse(f.responseText).plain.html;
        } catch (g) {
          e = f.responseText;
        }
        c[b.id].alliance_name = ($(e).children("a").attr("onclick") || "").replace(/.*\('(.*)'.*/, "$1");
      });
      n = a.getJQElement().find($("#defense_header")).html().stripTags() + ":";
      n += "[town]" + Game.townId + "[/town]";
      n += "\n[table]\n";
      $.each(c, function(b, c) {
        l = "[*]" + ++k + ".[|]";
        l += "[player]" + c.name + "[/player][|]";
        l += "[ally]" + c.alliance_name + "[/ally]";
        l += "[/*]\n";
        3E3 < (n + l).length && (g[h] = n + "[/table]", h++, n = a.getJQElement().find($("#defense_header")).html().stripTags() + ":", n += "[town]" + Game.townId + "[/town]", n += "\n[table]\n");
        n += l;
      });
      Layout.hideAjaxLoader();
      g[h] = n + "[/table]";
      if ("undefined" != typeof RepConvParamWnd) {
        try {
          RepConvParamWnd.close();
        } catch (p) {
        }
        RepConvParamWnd = void 0;
      }
      window.RepConvParamWnd = Layout.dialogWindow.open("", RepConv.Scripts_name, 500, 580, null, !1);
      RepConvParamWnd.setHeight(480);
      RepConvParamWnd.setPosition(["center", "center"]);
      RepConvParamWnd.appendContent($("<div/>", {style:"width:100%"}).html(RepConvTool.GetLabel("BBCODELIMIT")));
      $.each(g, function(a, b) {
        RepConvParamWnd.appendContent($("<textarea/>", {"class":"message_post_content", style:"height: 160px; width: 98%; border: 1px solid #D1BF91", readonly:"readonly"}).text(b).click(function() {
          this.select();
        }));
      });
    }
    var c = a.getName();
    0 == a.getJQElement().find($("#place_defense #BTNCONV" + c)).length && a.getJQElement().find($("#place_defense div.game_list_footer")).append(RepConvTool.AddBtn("BTNCONV", c).click(function() {
      window.GRCRTConvWnd = new _GRCRTConverterCtrl(a);
    }));
    0 < a.getJQElement().find($("#place_defense #defense_header")).length && 0 == a.getJQElement().find($("#place_defense #BTNSUPPLAYERS" + c)).length && a.getJQElement().find($("#place_defense div.game_list_footer")).append(RepConvTool.AddBtn("BTNSUPPLAYERS", c).click(function() {
      b();
    }));
  }
  function E(a) {
    var b = a.getName();
    if (0 < a.getJQElement().find($("#dd_commands_command_type")).length && 0 == a.getJQElement().find($("#BTNCONV" + b)).length) {
      a.getJQElement().find($("#game_list_footer")).append(RepConvTool.AddBtn("BTNCONV", b).click(function() {
        window.GRCRTConvWnd = new _GRCRTConverterCtrl(a);
      }));
      CM.get(a.getContext(), "dd_commands_command_type") && CM.get(a.getContext(), "dd_commands_command_type").bind("dd:change:value", function(b, c, e, g) {
        z(a, parseInt(u("grcrt_townsDD").getValue() || "0"), RepConvGRC.townsCommand);
      });
      JSON.parse(RepConv.requests.town_overviews.responseText);
      var b = {name:RepConvTool.GetLabel("COMMAND.ALL"), value:0}, c = [{name:"enable", value:1}, {name:"disable", value:0}], e = [b];
      I("grcrt_townsDD", $("<div/>", {id:"grcrt_townsDD", "class":"dropdown default", style:"margin-left:5px;width: 120px;"}).dropdown({list_pos:"left", value:b.value, options:e}).on("dd:change:value", function(b, c, e, g, h) {
        z(a, c, RepConvGRC.townsCommand);
      }));
      I("grcrt_FI", $("<div/>", {id:"grcrt_FI", "class":"dropdown default", style:"margin-left:5px;width: 120px;"}).dropdown({list_pos:"left", value:1, options:c}).on("dd:change:value", function(b, c, e, g, h) {
        RepConv.Debug && console.log("grcrt_FI" + c);
        z(a, parseInt(u("grcrt_townsDD").getValue() || "0"), RepConvGRC.townsCommand);
      }));
      I("grcrt_FR", $("<div/>", {id:"grcrt_FR", "class":"dropdown default", style:"margin-left:5px;width: 120px;"}).dropdown({list_pos:"left", value:1, options:c}).on("dd:change:value", function(b, c, e, g, h) {
        RepConv.Debug && console.log("grcrt_FR" + c);
        z(a, parseInt(u("grcrt_townsDD").getValue() || "0"), RepConvGRC.townsCommand);
      }));
      I("grcrt_FO", $("<div/>", {id:"grcrt_FO", "class":"dropdown default", style:"margin-left:5px;width: 120px;"}).dropdown({list_pos:"left", value:1, options:c}).on("dd:change:value", function(b, c, e, g, h) {
        RepConv.Debug && console.log("grcrt_FO" + c);
        z(a, parseInt(u("grcrt_townsDD").getValue() || "0"), RepConvGRC.townsCommand);
      }));
      q("grcrt_towns");
      b = I("grcrt_towns", $("<div/>", {id:"grcrt_towns", "class":"dropdown default", style:"margin-left:5px;width: 180px;"}).dropdown({list_pos:"left", value:u("grcrt_townsDD") ? u("grcrt_townsDD").getValue() : Options.value, options:u("grcrt_townsDD").getOptions()}).on("dd:change:value", function(b, c, e, g, h) {
        u("grcrt_townsDD").setValue(c);
        C(a);
        z(a, c, RepConvGRC.townsCommand);
      }));
      a.getJQElement().find($("#game_list_header")).append($("<div/>", {id:"grcrt_command_filter", style:"display: inline-block; float: right;"}).append($("<span/>", {"class":"grcrt_filter"}).html(a.getJQElement().find($("#command_filter>span")).html())).append($("<span/>", {"class":"overview_incoming icon grcrt_filter"}).mousePopup(new MousePopup(RepConvTool.GetLabel("COMMAND.INCOMING"))).addClass(0 == parseInt(u("grcrt_FI").getValue()) ? "grcrt_disabled" : "").click(function() {
        $(this).toggleClass("grcrt_disabled");
        u("grcrt_FI").setValue($(this).hasClass("grcrt_disabled") ? "0" : "1");
      })).append($("<span/>", {"class":"overview_outgoing icon grcrt_filter"}).mousePopup(new MousePopup(RepConvTool.GetLabel("COMMAND.OUTGOING"))).addClass(0 == parseInt(u("grcrt_FO").getValue()) ? "grcrt_disabled" : "").click(function() {
        $(this).toggleClass("grcrt_disabled");
        u("grcrt_FO").setValue($(this).hasClass("grcrt_disabled") ? "0" : "1");
      })).append($("<span/>", {"class":"grcrt_return grcrt_filter"}).mousePopup(new MousePopup(RepConvTool.GetLabel("COMMAND.RETURNING"))).addClass(0 == parseInt(u("grcrt_FR").getValue()) ? "grcrt_disabled" : "").click(function() {
        $(this).toggleClass("grcrt_disabled");
        u("grcrt_FR").setValue($(this).hasClass("grcrt_disabled") ? "0" : "1");
      })).append($("<label/>").text(RepConvTool.GetLabel("COMMAND.FORTOWN"))).append(b));
      0 == parseInt(u("grcrt_townsDD").getValue()) && a.getJQElement().find($("span.icon.grcrt_filter")).hide();
      C(a);
      z(a, parseInt(u("grcrt_townsDD").getValue() || "0"), RepConvGRC.townsCommand);
    }
  }
  function C(a) {
    var b = JSON.parse(RepConv.requests.town_overviews.responseText).json.data.commands, c = [{name:RepConvTool.GetLabel("COMMAND.ALL"), value:0}], e = {};
    RepConv.Debug && console.log("refreshTownList");
    RepConvGRC.townsCommand = {};
    a.getJQElement().find($("span.icon.grcrt_filter")).hide();
    0 != parseInt(u("grcrt_townsDD").getValue()) && (a.getJQElement().find($("span.icon.grcrt_filter")).show(), RepConv.Debug && console.log(u("grcrt_townsDD").getOption("value", parseInt(u("grcrt_townsDD").getValue()))), a = u("grcrt_townsDD").getOption("value", parseInt(u("grcrt_townsDD").getValue())), e[a.value] = a);
    $.each(b, function(a, b) {
      var c = {name:b.origin_town_name, value:b.origin_town_id}, f = {name:b.destination_town_name, value:b.destination_town_id};
      void 0 == RepConvGRC.townsCommand[c.value] && (RepConvGRC.townsCommand[c.value] = []);
      void 0 == RepConvGRC.townsCommand[f.value] && (RepConvGRC.townsCommand[f.value] = []);
      e[f.value] = f;
      e[c.value] = c;
      RepConvGRC.townsCommand[c.value].push(b);
      RepConvGRC.townsCommand[f.value].push(b);
    });
    $.each(e, function(a, b) {
      c.push(b);
    });
    u("grcrt_townsDD") && (u("grcrt_townsDD").setOptions(c), u("grcrt_towns") && u("grcrt_towns").setOptions(u("grcrt_townsDD").getOptions()));
  }
  function I(a, b) {
    u(a) || (RepConv.Debug && console.log("register: " + a), CM.register({main:"GRCRT", sub:a}, a, b));
    return u(a);
  }
  function q(a) {
    u(a) && (RepConv.Debug && console.log("unregister: " + a), CM.unregister({main:"GRCRT", sub:a}, a));
  }
  function u(a) {
    RepConv.Debug && console.log("get: " + a);
    return CM.get({main:"GRCRT", sub:a}, a);
  }
  function z(a, b, c) {
    if (0 == b) {
      a.getJQElement().find($(".place_command")).removeClass("grcrt_command"), 0 == parseInt(u("grcrt_FR").getValue()) && $.each(c, function(b, c) {
        $.each(c, function(b, c) {
          c.return && a.getJQElement().find($("#command_" + c.id)).addClass("grcrt_command");
        });
      });
    } else {
      try {
        a.getJQElement().find($(".place_command")).addClass("grcrt_command"), $.each(c[b], function(c, e) {
          a.getJQElement().find($("#command_" + e.id)).addClass("grcrt_command");
          1 != parseInt(u("grcrt_FI").getValue()) || e.destination_town_id != b || e.return || a.getJQElement().find($("#command_" + e.id)).removeClass("grcrt_command");
          1 == parseInt(u("grcrt_FR").getValue()) && e.destination_town_id == b && e.return && a.getJQElement().find($("#command_" + e.id)).removeClass("grcrt_command");
          1 == parseInt(u("grcrt_FR").getValue()) && e.origin_town_id == b && e.return && a.getJQElement().find($("#command_" + e.id)).removeClass("grcrt_command");
          1 != parseInt(u("grcrt_FO").getValue()) || e.origin_town_id != b || e.return || a.getJQElement().find($("#command_" + e.id)).removeClass("grcrt_command");
        });
      } catch (e) {
      }
    }
  }
  function w(a) {
    var b = a.getName();
    0 == a.getJQElement().find($("div.command_info #BTNCONV" + b)).length && (RepConvTool.AddBtn("BTNCONV", b).css({position:"absolute", bottom:"0px", right:"0px"}).click(function() {
      window.GRCRTConvWnd = new _GRCRTConverterCtrl(a);
    }).appendTo(a.getJQElement().find($("div.command_info"))), 0 < a.getJQElement().find($("div.command_info a.button")).length && a.getJQElement().find($("div.command_info #BTNCONV" + b)).css("right", "125px"), $.each(a.getJQElement().find($("#casted_power_reports a")), function(b, c) {
      var e = $(c).attr("onclick").replace(/.*\(([0-9]*)\).*/, "$1");
      gpAjax.ajaxPost("report", "view", {id:e}, !0, {success:function(b, c, e, g) {
        $("#RepConvTMP").html(c.html);
        1 == $("#RepConvTMP").find($("#report_power_symbol.wisdom")).length && (b = $("#RepConvTMP").find($("#right_side")), a.getJQElement().find($("fieldset.command_info_units .index_unit")).hide(), a.getJQElement().find($("fieldset.command_info_units")).append($("<div/>", {"class":"grcrt_wisdom"}).append($("<div/>", {"class":"power_icon60x60 wisdom", style:"float:left"})).append(b)));
        $("#RepConvTMP").html(null);
      }});
    }));
  }
  function B(a) {
    var b = a.getName();
    0 < a.getJQElement().find($("#conqueror_units_in_town")).length && 0 == a.getJQElement().find($("#conqueror_units_in_town #BTNCONV" + b)).length && RepConvTool.AddBtn("BTNCONV", b).click(function() {
      window.GRCRTConvWnd = new _GRCRTConverterCtrl(a);
    }).attr("style", "position: absolute; right: 0px; top: 0px;").appendTo(a.getJQElement().find($("#conqueror_units_in_town")));
    0 < a.getJQElement().find($("#unit_movements")).length && 0 == a.getJQElement().find($("#unit_movements #BTNCONV" + b)).length && RepConvTool.AddBtn("BTNCONV", b).click(function() {
      window.GRCRTConvWnd = new _GRCRTConverterCtrl(a);
    }).attr("style", "position: absolute; right: 20px; top: 0px;").appendTo(a.getJQElement().find($("#unit_movements")));
  }
  function h(a) {
    var b = a.getName();
    "town_info_support" == a.getContext().sub && 0 == a.getJQElement().find($("div.support_details_box .game_border #BTNCONV" + b)).length && a.getJQElement().find($("div.support_details_box .game_border")).append(RepConvTool.AddBtn("BTNCONV", b).click(function() {
      window.GRCRTConvWnd = new _GRCRTConverterCtrl(a);
    }).css({position:"absolute", top:"-2px", right:"-2px"}));
  }
  function k(a, b, c) {
    "grepostats" == RepConv.active.statsGRCL ? a = "http://" + Game.market_id + ".grepostats.com/world/" + Game.world_id + "/" + a + "/" + b : "grepointel" == RepConv.active.statsGRCL ? ("player" == a ? a = "pn" : "alliance" == a && (a = "an"), a = "http://grepointel.com/track.php?server=" + Game.world_id + "&" + a + "=" + c + "&rt=overview") : a = RepConv.grcrt_domain + a + "/" + Game.world_id + "/" + b + "/" + Game.locale_lang;
    return a;
  }
  function l(a) {
    "town_info_trading" != a.getContext().sub && "wonders_index" != a.getContext().sub || 0 != a.getJQElement().find($(".amounts .curr4")).length || a.getJQElement().find($(".amounts .curr3")).after($("<span/>", {"class":"curr4"})).bind("DOMSubtreeModified", function() {
      var a = $(this).parent();
      0 < $(a).find($(".curr3")).text().length || 0 < $(a).find($(".curr2")).text().length ? $(a).find($(".curr4")).html(" = " + eval($(a).find($(".curr")).text() + $(a).find($(".curr2")).text() + $(a).find($(".curr3")).text())) : $(a).find($(".curr4")).html("");
    });
    $.each(a.getJQElement().find($(".amounts .curr4")), function(a, b) {
      var c = $(b).parent();
      0 < $(c).find($(".curr3")).text().length || 0 < $(c).find($(".curr2")).text().length ? $(c).find($(".curr4")).html(" = " + eval($(c).find($(".curr")).text() + $(c).find($(".curr2")).text() + $(c).find($(".curr3")).text())) : $(c).find($(".curr4")).html("");
    });
  }
  function p(a) {
    var b = O[a.island_x + "_" + a.island_y];
    a = {lang:Game.world_id.substr(0, 2), world:Game.world_id, wonder_id:WorldWonders.all_wonders[b].id, wonder_lvl:WorldWonders.all_wonders[b].expansion_stage, alliance_id:Game.alliance_id, player_id:Game.player_id, wood:a.wood, stone:a.stone, iron:a.iron, power:a.power, wonder_type:WorldWonders.all_wonders[b].wonder_type, wonder_name:JSON.parse(RepConvTool.Atob($("a.gp_goto_wonder_link").attr("href"))).name, player_hash:RepConv.hash, alliance_hash:$.md5(Game.alliance_id + "_" + Game.world_id)};
    $.ajax({url:RepConv.grcrt_domain + "wonder.php", method:"post", data:{json:JSON.stringify(a)}, cache:!1, async:!0});
  }
  function J(a) {
    if (RepConv.active.power) {
      switch(a.getContext().sub) {
        case "town_info_god":
        ;
        case "command_info_god":
          a.getJQElement().find($(".choose_power.disabled")).css("opacity", "0.4").attr("href", null).attr("onclick", null), RepConv.Debug && console.log("loadPower"), $.each(a.getJQElement().find($(".js-power-icon div[name=counter]")), function(a, b) {
            $(b).remove();
          }), $.each(a.getJQElement().find($(".js-power-icon.disabled")), function(b, c) {
            var e = GameData.powers[$(c).attr("data-power_id")], g = MM.checkAndPublishRawModel("PlayerGods", {id:Game.player_id}).getCurrentProductionOverview()[e.god_id];
            if (0 == a.getJQElement().find($(".js-god-box.disabled." + e.god_id)).length) {
              var h = MM.checkAndPublishRawModel("PlayerGods", {id:Game.player_id})[e.god_id + "_favor_delta_property"].calculateCurrentValue().unprocessedCurrentValue;
              $(c).append($("<div/>", {style:"margin-top:32px;color:white;text-shadow: 1px 1px 1px black;font-size:10px;z-index:3000;font-weight: bold;", name:"counter"}).countdown(Timestamp.server() + (e.favor - h) / g.production * 3600));
            }
          });
      }
    }
  }
  function Q(a) {
    var b = $("#window_" + a.getIdentifier()).find("div.window_content");
    0 == b.find($("#BTNCONV" + a.getIdentifier())).length && b.append(RepConvTool.AddBtn("BTNCONV", a.getIdentifier()).click(function() {
      RepConv.Debug && console.log(a.getType() + " [id:" + a.getIdentifier() + "]");
      window.GRCRTConvWnd = new _GRCRTConverterCtrl(a);
    }).css({position:"absolute", bottom:"15px", right:"15px"}));
  }
  function M(a, b, c) {
    0 == a.getJQElement().find("#emots_popup_" + a.type).length && (a.getJQElement().find($(".bb_button_wrapper")).append($("<div/>", {id:"emots_popup_" + a.type, style:"display:none; z-index: 5000;"}).append($("<div/>", {"class":"bbcode_box middle_center"}).append($("<div/>", {"class":"bbcode_box top_left"})).append($("<div/>", {"class":"bbcode_box top_right"})).append($("<div/>", {"class":"bbcode_box top_center"})).append($("<div/>", {"class":"bbcode_box bottom_center"})).append($("<div/>", {"class":"bbcode_box bottom_right"})).append($("<div/>", 
    {"class":"bbcode_box bottom_left"})).append($("<div/>", {"class":"bbcode_box middle_left"})).append($("<div/>", {"class":"bbcode_box middle_right"})).append($("<div/>", {"class":"bbcode_box content clearfix", style:"overflow-y:auto !important; max-height: 185px;"}))).css({position:"absolute", top:"27px", left:"455px", width:"300px"})), $.each(RepConvAdds.emots, function(b, e) {
      a.getJQElement().find("#emots_popup_" + a.type + " .content").append($("<img/>", {src:e.img, title:e.title}).click(function() {
        RepConvTool.insertBBcode("[img]" + $(this).attr("src") + "[/img]", "", a.getJQElement().find(c)[0]);
        a.getJQElement().find($("#emots_popup_" + a.type)).toggle();
      }));
    }), a.getJQElement().find($(".bb_button_wrapper")).append($("<div/>", {id:"reports_popup_" + a.getType(), "class":"grcrtbb_reports", style:"display:none; z-index: 5000;"}).append($("<div/>", {"class":"bbcode_box middle_center"}).append($("<div/>", {"class":"bbcode_box top_left"})).append($("<div/>", {"class":"bbcode_box top_right"})).append($("<div/>", {"class":"bbcode_box top_center"})).append($("<div/>", {"class":"bbcode_box bottom_center"})).append($("<div/>", {"class":"bbcode_box bottom_right"})).append($("<div/>", 
    {"class":"bbcode_box bottom_left"})).append($("<div/>", {"class":"bbcode_box middle_left"})).append($("<div/>", {"class":"bbcode_box middle_right"})).append($("<div/>", {"class":"bbcode_box content clearfix", style:"overflow-y:auto !important; max-height: 185px;"}).append($("<ul/>")))).css({position:"absolute", top:"27px", left:"525px", width:"120px"})), $.each(RepConv.__repconvValueArray, function(b, e) {
      a.getJQElement().find("#reports_popup_" + a.getType() + " .content ul").append($("<li/>").append($("<a/>", {href:"#n"}).html("\u00bb " + DM.getl10n("COMMON", "window_goto_page").page + " " + (b + 1) + "/" + Object.size(RepConv.__repconvValueArray)).click(function() {
        RepConvTool.insertBBcode(P(b) + RepConv.__repconvValueArray[b], "", a.getJQElement().find(c)[0]);
        a.getJQElement().find($(".grcrtbb_reports")).hide();
      })));
    }), a.getJQElement().find(b).append($("<img/>", {src:RepConv.Scripts_url + "emots/usmiech.gif", style:"cursor: pointer;"}).click(function() {
      a.getJQElement().find($('.bb_button_wrapper>div[class^="bb"]')).remove();
      a.getJQElement().find($(".grcrtbb_reports")).hide();
      a.getJQElement().find($("#emots_popup_" + a.type)).toggle();
    })), a.getJQElement().find(b).append($("<img/>", {src:RepConv.Const.uiImg + "paste_report.png", style:"cursor: pointer;"}).click(function() {
      a.getJQElement().find($('.bb_button_wrapper>div[class^="bb"]')).remove();
      a.getJQElement().find($(".grcrtbb_emots")).hide();
      switch(Object.size(RepConv.__repconvValueArray)) {
        case 0:
          break;
        case 1:
          RepConvTool.insertBBcode(P(0) + RepConv.__repconvValueArray[0], "", a.getJQElement().find($(c))[0]);
          break;
        default:
          a.getJQElement().find($("#reports_popup_" + a.getType())).toggle();
      }
    }).mousePopup(new MousePopup(RepConvTool.GetLabel("POPINSERTLASTREPORT")))));
  }
  function N(a) {
    $("#window_" + a.getIdentifier()).unbind("DOMSubtreeModified").bind("DOMSubtreeModified", function() {
      var b = $("#window_" + a.getIdentifier()).find($("div.bb_button_wrapper")), c = $("#window_" + a.getIdentifier()).find($("div.notes_container"));
      0 < b.length && 0 == $("#window_" + a.getIdentifier()).find($("div.notes_container #emots_popup_" + a.getType())).length && ($("#window_" + a.getIdentifier()).unbind("DOMSubtreeModified"), $(b).find($(".bbcode_option")).bind("click", function() {
        $(b).find($("#emots_popup_" + a.getType())).hide();
        $(b).find($("#reports_popup_" + a.getType())).hide();
      }), $(b).append($("<div/>", {id:"emots_popup_" + a.getType(), "class":"grcrtbb_emots", style:"display:none; z-index: 5000;"}).append($("<div/>", {"class":"bbcode_box middle_center"}).append($("<div/>", {"class":"bbcode_box top_left"})).append($("<div/>", {"class":"bbcode_box top_right"})).append($("<div/>", {"class":"bbcode_box top_center"})).append($("<div/>", {"class":"bbcode_box bottom_center"})).append($("<div/>", {"class":"bbcode_box bottom_right"})).append($("<div/>", {"class":"bbcode_box bottom_left"})).append($("<div/>", 
      {"class":"bbcode_box middle_left"})).append($("<div/>", {"class":"bbcode_box middle_right"})).append($("<div/>", {"class":"bbcode_box content clearfix", style:"overflow-y:auto !important; max-height: 185px;"}))).css({position:"absolute", top:"27px", left:"455px", width:"300px"})), $.each(RepConvAdds.emots, function(e, g) {
        $(b).find("#emots_popup_" + a.getType() + " .content").append($("<img/>", {src:g.img, title:g.title}).click(function() {
          RepConvTool.insertBBcode("[img]" + $(this).attr("src") + "[/img]", "", $(c).find($("textarea"))[0]);
          $(c).find($("textarea")).keyup();
          $(b).find($("#emots_popup_" + a.getType())).toggle();
        }));
      }), $(b).append($("<div/>", {id:"reports_popup_" + a.getType(), "class":"grcrtbb_reports", style:"display:none; z-index: 5000;"}).append($("<div/>", {"class":"bbcode_box middle_center"}).append($("<div/>", {"class":"bbcode_box top_left"})).append($("<div/>", {"class":"bbcode_box top_right"})).append($("<div/>", {"class":"bbcode_box top_center"})).append($("<div/>", {"class":"bbcode_box bottom_center"})).append($("<div/>", {"class":"bbcode_box bottom_right"})).append($("<div/>", {"class":"bbcode_box bottom_left"})).append($("<div/>", 
      {"class":"bbcode_box middle_left"})).append($("<div/>", {"class":"bbcode_box middle_right"})).append($("<div/>", {"class":"bbcode_box content clearfix", style:"overflow-y:auto !important; max-height: 185px;"}).append($("<ul/>")))).css({position:"absolute", top:"27px", left:"525px", width:"120px"})), $.each(RepConv.__repconvValueArray, function(e, g) {
        $(b).find("#reports_popup_" + a.getType() + " .content ul").append($("<li/>").append($("<a/>", {href:"#n"}).html("\u00bb " + DM.getl10n("COMMON", "window_goto_page").page + " " + (e + 1) + "/" + Object.size(RepConv.__repconvValueArray)).click(function() {
          RepConvTool.insertBBcode(P(e) + RepConv.__repconvValueArray[e], "", $(c).find($("textarea"))[0]);
          $(c).find($("textarea")).keyup();
          $(b).find($(".grcrtbb_reports")).hide();
        })));
      }), $(b).append($("<img/>", {src:RepConv.Scripts_url + "emots/usmiech.gif", style:"cursor: pointer;"}).click(function() {
        $(b).find($('.bb_button_wrapper>div[class^="bb"]')).remove();
        $(b).find($(".grcrtbb_reports")).hide();
        $(b).find($("#emots_popup_" + a.getType())).toggle();
      })).append($("<img/>", {src:RepConv.Const.uiImg + "paste_report.png", style:"cursor: pointer;"}).click(function() {
        $(b).find($('.bb_button_wrapper>div[class^="bb"]')).remove();
        $(b).find($(".grcrtbb_emots")).hide();
        switch(Object.size(RepConv.__repconvValueArray)) {
          case 0:
            break;
          case 1:
            RepConvTool.insertBBcode(P(0) + RepConv.__repconvValueArray[0], "", $(c).find($("textarea"))[0]);
            $(c).find($("textarea")).keyup();
            break;
          default:
            $(b).find($("#reports_popup_" + a.getType())).toggle();
        }
      }).mousePopup(new MousePopup(RepConvTool.GetLabel("POPINSERTLASTREPORT")))), N(a));
    });
  }
  function P(a) {
    return "[url=http://www.grcrt.net/repview.php?rep=" + $.ajax({url:"https://www.grcrt.net/repsave.php", method:"post", data:{html:RepConv.__repconvHtmlArray[a]}, cache:!1, async:!1}).responseJSON.filename + "]" + RepConvTool.GetLabel("MOBILEVERSION") + "[/url]\n\n";
  }
  function H(a) {
    if (RepConv.active.power) {
      var b = GameData.powers[a];
      setTimeout(function() {
        try {
          var a = MM.checkAndPublishRawModel("PlayerGods", {id:Game.player_id}).getCurrentProductionOverview()[b.god_id], c = MM.checkAndPublishRawModel("PlayerGods", {id:Game.player_id})[b.god_id + "_favor_delta_property"].calculateCurrentValue().unprocessedCurrentValue, e = Timestamp.server() + (b.favor - c) / a.production * 3600;
          $("#popup_content div#grcrt_pop_ads").remove();
          0 < b.favor - a.current && 0 < god.production && $("#popup_content div.temple_power_popup").append($("<div/>", {name:"counter", id:"grcrt_pop_ads"}).css({margin:"70px 10px 0 0", "float":"right", "text-shadow":"2px 2px 2px white", color:"black", "font-weight":"bold", position:"absolute", top:"20px", right:"270px"}).countdown(e));
        } catch (f) {
        }
      }, 100);
    }
  }
  function da() {
    if (RepConv.settings[RepConv.Cookie + "_idle"] && 10 > ea) {
      if (!RepConvGRC.idle || RepConvGRC.idle.time + 30 < Timestamp.server()) {
        RepConv.Debug && console.log("getIdleData - fetch"), $.ajax({url:"https://www.grcrt.net/json.php", method:"get", data:{method:"getIdleJSON", world:Game.world_id}, cache:!0}).done(function(a) {
          ea = 0;
          RepConvGRC.idle = a;
          RepConvGRC.idle.time = Timestamp.server();
        }).fail(function() {
          ea++;
        });
      }
      RepConv.Debug && console.log("getIdleData");
    }
  }
  function R(a) {
    $.each(a.getJQElement().find($(".grcrt_idle")), function(b, c) {
      var e = ("player_get_profile_html" == a.getContext().sub ? btoa(JSON.stringify({id:a.getOptions().player_id})) : $(c).nextAll(".gp_player_link").attr("href")).split(/#/), e = "player_get_profile_html" == a.getContext().sub ? JSON.parse(unescape(RepConv.requests.player.url).match(/({.*})/)[0]).player_id : JSON.parse(atob(e[1] || e[0])).id, e = parseFloat(RepConvGRC.idle.JSON[e] || "0");
      $(c).addClass("grcrt_idle_days");
      $(c).addClass("grcrt_idle_dg");
      $(c).html(parseInt(e));
      $(c).mousePopup(new MousePopup("<b>" + RepConvTool.GetLabel("STATS.INACTIVE") + ": </b>" + (hours_minutes_seconds(3600 * parseInt(24 * e)) || "0") + '<br/><div style="font-size:75%">' + RepConvTool.GetLabel("STATS.INACTIVEDESC") + "</div>"));
      7 <= e ? $(c).toggleClass("grcrt_idle_dg grcrt_idle_dr") : 2 <= e && $(c).toggleClass("grcrt_idle_dg grcrt_idle_dy");
    });
  }
  function ca() {
    "object" != typeof YT || "function" != typeof YT.Player ? setTimeout(function() {
      ca();
    }, 100) : (F = new YT.Player("grcrtVideoContainer", {height:"39", width:"64"}), oa = new YT.Player("grcrtVideoContainerTest", {height:"39", width:"64"}));
  }
  function ka() {
    if (!RepConv.active.sounds.mute) {
      RepConv.Debug && console.log("Attack incoming = " + MM.checkAndPublishRawModel("CommandsMenuBubble", {id:Game.player_id}).getIncommingAttacksCommandsCount());
      if (MM.checkAndPublishRawModel("CommandsMenuBubble", {id:Game.player_id}).getIncommingAttacksCommandsCount() > RepConv.active.attack_count && "none" == $("#grcrtSound").css("display")) {
        RepConv.audio = {};
        var a = $("<audio/>", {preload:"auto"}), b = $("<audio/>", {preload:"auto"}).append($("<source/>", {src:RepConv.Const.defMuteM + ".mp3"})).append($("<source/>", {src:RepConv.Const.defMuteM + ".ogg"}));
        L = null;
        "" != RepConv.active.sounds.url ? (L = -1 < RepConv.active.sounds.url.indexOf("youtube") && RepConv.active.sounds.url.replace(/.*v=(.[^&]*)/, "$1") || -1 < RepConv.active.sounds.url.indexOf("youtu.be") && RepConv.active.sounds.url.replace(/.*youtu.be\/(.[^?]*)/, "$1"), $(a).append($("<source/>", {src:RepConv.active.sounds.url}))) : $(a).append($("<source/>", {src:RepConv.Const.defAlarmM + ".mp3"})).append($("<source/>", {src:RepConv.Const.defAlarmM + ".ogg"}));
        RepConv.audio.mute = b.get(0);
        null != L && L ? (RepConv.Debug && console.log("\u0142aduje " + L), Y()) : ($("#grcrtSound").show(), RepConv.audio.alarm = a.get(0), RepConv.audio.alarm.loop = RepConv.active.sounds.loop, RepConv.audio.alarm.volume = RepConv.active.sounds.volume / 100, RepConv.audio.alarm.addEventListener("ended", function() {
          $("#grcrtSound").hide();
        }), RepConv.audio.alarm.play());
        DM.getl10n("layout", "toolbar_activities");
        MM.checkAndPublishRawModel("CommandsMenuBubble", {id:Game.player_id}).getIncommingAttacksCommandsCount();
      }
      0 == MM.checkAndPublishRawModel("CommandsMenuBubble", {id:Game.player_id}).getIncommingAttacksCommandsCount() && "none" != $("#grcrtSound").css("display") && -1 < RepConv.active.attack_count && (null != L && L ? F.stopVideo() : (RepConv.audio.alarm.pause(), RepConv.audio.alarm.currentTime = 0), $("#grcrtSound").hide());
      RepConv.active.attack_count = MM.checkAndPublishRawModel("CommandsMenuBubble", {id:Game.player_id}).getIncommingAttacksCommandsCount();
    }
  }
  function Y() {
    "object" != typeof F || "function" != typeof F.loadVideoById ? setTimeout(function() {
      Y();
    }, 500) : ($("#grcrtSound").show(300), F.loadVideoById({videoId:L, loop:1, events:{onError:onGrcrtYTPlayerError, onStateChange:onGrcrtYTPlayerStateChange, onReady:onGrcrtYTPlayerReady}}).setVolume(RepConv.active.sounds.volume));
  }
  var V = require("game/windows/ids"), ea = 0, O = {};
  this.spellCountDownRefresh = function() {
    $.each(GPWindowMgr.getAllOpen(), function(a, b) {
      var c = CM.get({main:b.getID(), sub:"casted_powers"}, "grcrt_countdown");
      if (c) {
        var e = $(c).parent(), g = $(e).attr("data-power_id"), e = $(e).attr("rel"), g = GameData.powers[g], h = MM.checkAndPublishRawModel("PlayerGods", {id:Game.player_id}).getCurrentProductionOverview()[e], e = MM.checkAndPublishRawModel("PlayerGods", {id:Game.player_id})[e + "_favor_delta_property"].calculateCurrentValue().unprocessedCurrentValue;
        c.setValue((g.favor - e) / h.production * 3600);
      }
    });
  };
  this.settings = function() {
    function a(b, c, e) {
      return $("<div/>", {"class":"checkbox_new", style:"margin-bottom: 10px; display: block;"}).checkbox({caption:RepConvTool.GetLabel(e || b), checked:c, cid:b});
    }
    var b = $("<div/>", {style:"padding: 5px"}), c = $("<fieldset/>", {style:"float:left; width:375px; min-height: 250px;"}), e = $("<fieldset/>", {style:"float:right; width:370px; min-height: 250px;"}), g = a(RepConv.CookiePower, RepConv.active.power, "CHKPOWERNAME"), h = a(RepConv.CookieForumTabs, RepConv.active.ftabs, "CHKFORUMTABS"), k = a(RepConv.CookieUnitsCost, RepConv.active.unitsCost, "CHKUNITSCOST"), l = a(RepConv.CookieOceanNumber, RepConv.active.oceanNumber, "CHKOCEANNUMBER"), m = a(RepConv.CookieReportFormat, 
    RepConv.active.reportFormat, "CHKREPORTFORMAT"), p = a("GRCRTsoundLoop", RepConv.active.sounds.loop, "CHKSOUNDLOOP"), q = a("GRCRTsoundMute", RepConv.active.sounds.mute, "POPSOUNDMUTE"), t = a(RepConv.Cookie + "_idle", RepConv.settings[RepConv.Cookie + "_idle"], "STATS.CHKINACTIVE"), O = a(RepConv.Cookie + "_trade", RepConv.settings[RepConv.Cookie + "_trade"], "CHKOLDTRADE"), B = a(RepConv.Cookie + "_wonder_trade", RepConv.settings[RepConv.Cookie + "_wonder_trade"], "CHKWONDERTRADE"), v = $("<div/>", 
    {id:"statsGRC2Sel", "class":"dropdown default", style:"margin-left:5px;width: 150px;"}).dropdown({list_pos:"left", value:RepConv.active.statsGRCL, options:[{value:"potusek", name:"www.grcrt.net"}, {value:"grepostats", name:"grepostats.com"}, {value:"grepointel", name:"grepointel.com"}]});
    $(c).append($("<legend/>").html("GRCRTools " + RepConvTool.GetLabel("HELPTAB4"))).append(g).append(h).append(k).append(l).append(m).append(t).append(B).append($("<div/>", {style:"padding: 5px"}).append($("<label/>", {"for":"statsGRCL"}).text(RepConvTool.GetLabel("STATSLINK"))).append(v));
    $(e).append($("<legend/>").html(RepConvTool.GetLabel("EMOTS.LABEL"))).append($("<div/>").html(RepConvTool.GetLabel("EMOTS.MESS"))).append($("<textarea/>", {id:"GRCRTEmots", style:"width: 360px; min-height: 200px;"}).val(RepConvTool.getItem(RepConv.CookieEmots)));
    $(b).append($(c));
    $(b).append($(e));
    $(b).append($("<br/>", {style:"clear: both;"}));
    RepConv.audioSupport && $(b).append($("<fieldset/>", {id:"GRCRT_Sounds"}).append($("<legend/>").html(RepConvTool.GetLabel("SOUNDSETTINGS"))).append(RepConvForm.soundSlider({name:"sound", volume:RepConv.active.sounds.volume})).append(p.css({"float":"left", padding:"6px"}).mousePopup(new MousePopup(RepConvTool.GetLabel("POPSOUNDLOOP")))).append(q.css({"float":"left", padding:"6px"}).mousePopup(new MousePopup(RepConvTool.GetLabel("POPSOUNDMUTE")))).append($("<img/>", {id:"grcrt_play", src:RepConv.grcrt_cdn + 
    "ui/button-play-4.png", style:"float:right;"}).click(function() {
      if (1 == $("#grcrt_stop:hidden").length) {
        T = null;
        $("#grcrt_play").toggle();
        $("#grcrt_stop").toggle();
        var a = $("<audio/>", {preload:"auto"});
        "" != $("#grcrt_sound_url").val() ? (T = -1 < $("#grcrt_sound_url").val().indexOf("youtube") && $("#grcrt_sound_url").val().replace(/.*v=(.[^&]*)/, "$1") || -1 < $("#grcrt_sound_url").val().indexOf("youtu.be") && $("#grcrt_sound_url").val().replace(/.*youtu.be\/(.[^?]*)/, "$1"), $(a).append($("<source/>", {src:$("#grcrt_sound_url").val()}))) : $(a).append($("<source/>", {src:RepConv.Const.defAlarmM + ".mp3"})).append($("<source/>", {src:RepConv.Const.defAlarmM + ".ogg"}));
        null != T && T ? (RepConv.Debug && console.log("\u0142aduje " + T), oa.loadVideoById({videoId:T, events:{onError:onGrcrtYTPlayerErrorTest, onStateChange:onGrcrtYTPlayerStateChangeTest, onReady:onGrcrtYTPlayerReadyTest}}).setVolume(RepConv.slider.getValue())) : (RepConv.audio.test = a.get(0), RepConv.audio.test.addEventListener("ended", function() {
          $("#grcrt_play").toggle();
          $("#grcrt_stop").toggle();
        }), RepConv.audio.test.volume = RepConv.slider.getValue() / 100, RepConv.audio.test.loop = !1, RepConv.audio.test.play());
      }
    }).mousePopup(new MousePopup(RepConvTool.GetLabel("POPSOUNDPLAY")))).append($("<img/>", {id:"grcrt_stop", src:RepConv.grcrt_cdn + "ui/button-stop-4.png", style:"float:right;"}).hide().click(function() {
      null != T && T ? oa.stopVideo() : (RepConv.audio.test.pause(), RepConv.audio.test.currentTime = 0);
      $("#grcrt_play").toggle();
      $("#grcrt_stop").toggle();
    }).mousePopup(new MousePopup(RepConvTool.GetLabel("POPSOUNDSTOP")))).append($("<br/>", {style:"clear:both"})).append($("<div/>", {style:"float:left;width:120px;"}).html(RepConvTool.GetLabel("SOUNDURL"))).append(RepConvForm.input({name:"grcrt_sound_url", style:"float:left;width:600px;", value:RepConv.active.sounds.url}).mousePopup(new MousePopup(RepConvTool.GetLabel("POPSOUNDURL")))).append($("<div/>", {style:"float:left;width:120px;"}).html("&nbsp;")).append($("<div/>", {style:"float:left;width: 635px;font-size: 11px;font-style: italic;max-height: 27px;"}).html(RepConvTool.GetLabel("POPSOUNDEG"))));
    $(b).append(RepConvTool.AddBtn("BTNSAVE").click(function() {
      try {
        RepConv.settings[RepConv.CookiePower] = g.isChecked() ? !0 : !1;
        RepConv.settings[RepConv.CookieForumTabs] = h.isChecked() ? !0 : !1;
        RepConv.settings[RepConv.CookieUnitsCost] = k.isChecked() ? !0 : !1;
        RepConv.settings[RepConv.CookieOceanNumber] = l.isChecked() ? !0 : !1;
        RepConv.settings[RepConv.Cookie + "_idle"] = t.isChecked() ? !0 : !1;
        RepConv.settings[RepConv.Cookie + "_trade"] = O.isChecked() ? !0 : !1;
        RepConv.settings[RepConv.Cookie + "_wonder_trade"] = B.isChecked() ? !0 : !1;
        RepConv.settings[RepConv.CookieReportFormat] = m.isChecked() ? !0 : !1;
        RepConv.settings[RepConv.CookieStatsGRCL] = v.getValue();
        RepConv.settings[RepConv.CookieEmots] = $("#GRCRTEmots").val();
        if (RepConv.audioSupport) {
          RepConv.settings[RepConv.CookieSounds] = {mute:q.isChecked() ? !0 : !1, loop:p.isChecked() ? !0 : !1, volume:RepConv.slider.getValue(), url:$("#grcrt_sound_url").val()};
          var a = $("<audio/>", {preload:"auto"});
          "" != RepConv.settings[RepConv.CookieSounds].url ? $(a).append($("<source/>", {src:RepConv.settings[RepConv.CookieSounds].url})) : $(a).append($("<source/>", {src:RepConv.Const.defAlarmM + ".mp3"})).append($("<source/>", {src:RepConv.Const.defAlarmM + ".ogg"}));
          RepConv.audio.alarm = a.get(0);
        }
        RepConvTool.saveRemote();
        RepConv.active.power = RepConvTool.getSettings(RepConv.CookiePower);
        RepConv.active.ftabs = RepConvTool.getSettings(RepConv.CookieForumTabs);
        RepConv.active.statsGRCL = RepConvTool.getSettings(RepConv.CookieStatsGRCL);
        RepConv.active.unitsCost = RepConvTool.getSettings(RepConv.CookieUnitsCost);
        RepConv.active.oceanNumber = RepConvTool.getSettings(RepConv.CookieOceanNumber);
        RepConv.active.reportFormat = RepConvTool.getSettings(RepConv.CookieReportFormat);
        RepConv.active.sounds = RepConvTool.getSettings(RepConv.CookieSounds);
        setTimeout(function() {
          HumanMessage.success(RepConvTool.GetLabel("MSGHUMAN.OK"));
        }, 0);
      } catch (b) {
        setTimeout(function() {
          HumanMessage.error(RepConvTool.GetLabel("MSGHUMAN.ERROR"));
        }, 0);
      }
    }));
    return b;
  };
  this.getGrcrtYTPlayer = function() {
    return F;
  };
  this.getGrcrtYTPlayerTest = function() {
    return oa;
  };
  var L = null, F, T = null, oa;
  window.onGrcrtYTPlayerError = function(a) {
    HumanMessage.error(RepConvTool.GetLabel("MSGHUMAN.YOUTUBEERROR"));
    RepConv.Debug && console.log("event eventuje [onGrcrtYTPlayerError]");
  };
  window.onGrcrtYTPlayerReady = function(a) {
    RepConv.Debug && console.log("event eventuje [onGrcrtYTPlayerReady]");
    a.target.playVideo();
  };
  window.onGrcrtYTPlayerStateChange = function(a) {
    RepConv.Debug && console.log("event eventuje [onGrcrtYTPlayerStateChange]");
    RepConv.Debug && console.log(a);
    0 == a.data && (RepConv.settings[RepConv.CookieSounds].loop ? F.playVideo() : $("#grcrtSound").hide());
  };
  window.onGrcrtYTPlayerErrorTest = function(a) {
    HumanMessage.error(RepConvTool.GetLabel("MSGHUMAN.YOUTUBEERROR"));
    RepConv.Debug && console.log("event eventuje [onGrcrtYTPlayerErrorTest]");
    a.target.stopVideo();
  };
  window.onGrcrtYTPlayerReadyTest = function(a) {
    RepConv.Debug && console.log("event eventuje [onGrcrtYTPlayerReadyTest]");
    a.target.playVideo();
  };
  window.onGrcrtYTPlayerStateChangeTest = function(a) {
    RepConv.Debug && console.log("event eventuje [onGrcrtYTPlayerStateChange]");
    RepConv.Debug && console.log(a);
    0 == a.data && ($("#grcrt_play").toggle(), $("#grcrt_stop").toggle());
  };
  this.testAI = function() {
    RepConv.active.attack_count = -1;
    ka();
  };
  this.addBTN = function(a) {
    switch(a.getType()) {
      case V.ACADEMY:
        Q(a);
        break;
      case V.NOTES:
        N(a);
    }
  };
  this.openGRCRT = function(a, b) {
    if ("undefined" != typeof window.GRCRTWnd) {
      try {
        window.GRCRTWnd.close();
      } catch (c) {
      }
      window.GRCRTWnd = void 0;
    }
    window.GRCRTWnd = WF.open("grcrt", {args:b});
    switch(a) {
      case "HELPTAB1":
        window.GRCRTWnd.setActivePageNr(0);
        break;
      case "HELPTAB2":
        window.GRCRTWnd.setActivePageNr(1);
        break;
      case "HELPTAB3":
        window.GRCRTWnd.setActivePageNr(2);
        break;
      case "HELPTAB4":
        window.GRCRTWnd.setActivePageNr(3);
        break;
      case "HELPTAB5":
        window.GRCRTWnd.setActivePageNr(4);
    }
  };
  $(document).ajaxComplete(function(f, n, q) {
    if ("undefined" != typeof q) {
      f = q.url.replace(/\/game\/(.*)\?.*/, "$1");
      var u = "frontend_bridge" != f ? f : -1 < q.url.indexOf("json") ? JSON.parse(unescape(q.url).split("&")[3].split("=")[1]).window_type : f;
      RepConv.requests[u] = {url:q.url, responseText:n.responseText};
      if ("frontend_bridge" == f) {
        var F = WM.getWindowByType(u)[0];
        F ? (RepConv.WND = F, RepConv.Debug && console.log('dodanie przycisku dla "' + F.getType() + '"'), $("#window_" + F.getIdentifier()).ready(function() {
          RepConv.Debug && console.log('dodanie przycisku dla "' + F.getType() + '" [id:' + F.getIdentifier() + "]");
          RepConvGRC.addBTN(F);
        })) : RepConv.Debug && console.log("typ wnd nieznany");
      } else {
        -1 < q.url.indexOf("game/wonders") && (-1 < q.url.indexOf("send_resources") || -1 < q.url.indexOf("decrease_build_time_with_favor")) && JSON.parse(n.responseText).json.success && (n = JSON.parse(decodeURIComponent(q.data).split("=")[1]), RepConv.Debug && console.log(n), n.wood = -1 < q.url.indexOf("decrease_build_time_with_favor") ? 0 : n.wood, n.stone = -1 < q.url.indexOf("decrease_build_time_with_favor") ? 0 : n.stone, n.iron = -1 < q.url.indexOf("decrease_build_time_with_favor") ? 0 : 
        n.iron, n.power = -1 < q.url.indexOf("decrease_build_time_with_favor") ? 400 : 0, RepConv.Debug && console.log(n), p(n)), $.each(Layout.wnd.getAllOpen(), function(f, p) {
          RepConv.Debug && console.log("Dodanie przycisku dla starego okna o ID = " + p.getID());
          var n = Layout.wnd.GetByID(p.getID());
          RepConv.AQQ = n;
          switch(n.getController()) {
            case "alliance":
              switch(n.getContext().sub) {
                case "alliance_profile":
                  t(n);
                  break;
                case "alliance_create_application":
                  M(n, ".bb_button_wrapper", "#application_edit_message");
              }
              break;
            case "alliance_forum":
              M(n, ".bb_button_wrapper", "#forum_post_textarea");
              c(n);
              break;
            case "building_barracks":
            ;
            case "building_docks":
              a(n);
              e(n);
              break;
            case "building_place":
              D(n);
              break;
            case "building_wall":
              x(n);
              break;
            case "command_info":
              switch(n.getContext().sub) {
                case "command_info_colonization_info":
                ;
                case "command_info_info":
                  w(n);
                  J(n);
                  break;
                case "command_info_conquest_info":
                  B(n);
                  break;
                case "command_info_conquest_movements":
                  B(n);
              }
              break;
            case "farm_town_overviews":
              n.getJQElement().find($("#fto_town_list li")).attr("style", "border-right:0px");
              n.getJQElement().find($("#fto_town_list li.town" + Game.townId)).attr("style", "border-right: 5px solid green");
              0 == n.getJQElement().find($("#fto_town_list li.town" + Game.townId + ".active")).length && RepConv.currTown != Game.townId && (RepConv.currTown = Game.townId, n.getJQElement().find($("#fto_town_list li.town" + Game.townId)).click());
              break;
            case "island_info":
              g(n);
              break;
            case "message":
              var q = "";
              switch(n.getContext().sub) {
                case "message_new":
                  q = "#message_new_message";
                  break;
                case "message_view":
                  q = "#message_reply_message";
                  break;
                case "message_forward":
                  q = "#message_message";
              }
              M(n, ".bb_button_wrapper", q);
              break;
            case "player":
              switch(n.getContext().sub) {
                case "player_get_profile_html":
                  m(n);
                  break;
                case "player_index":
                  b(n);
              }
              break;
            case "report":
              switch(n.getContext().sub) {
                case "report_view":
                  v(n);
              }
              break;
            case "town_info":
              switch(n.getContext().sub) {
                case "town_info_info":
                  var q = n.getName(), F = "#" + q;
                  if (0 == n.getJQElement().find($(F + "RepConvStatsPlayer")).length && void 0 != $(n.getJQElement().find($("a.gp_player_link"))[0]).attr("href")) {
                    var u = $(n.getJQElement().find($("a.gp_player_link"))[0]).attr("href").split(/#/), L = JSON.parse(atob(u[1] || u[0])).id, N = encodeURIComponent($(n.getJQElement().find($("a.gp_player_link"))[0]).html()), u = $("<a/>", {href:"#n", id:q + "RepConvStatsPlayer", player_id:L, player_name:N}).html($("<img/>", {src:RepConv.Const.staticImg + "/stats.png"})).mousePopup(new MousePopup(RepConvTool.GetLabel("STATS.PLAYER")));
                    $(u).attr({href:k("player", L, N), target:"_blank"});
                    n.getJQElement().find($("a.color_table.assign_color")).parent().css("min-width", "100px").append(u);
                  }
                  0 == n.getJQElement().find($(F + "RepConvStatsAlly")).length && void 0 != n.getJQElement().find($("a.color_table.assign_ally_color")).parent().parent().children().eq(1).attr("onclick") && (L = n.getJQElement().find($("a.color_table.assign_ally_color")).parent().parent().children().eq(1).attr("onclick").replace(/.*\,([0-9]*)\)/, "$1"), N = n.getJQElement().find($("a.color_table.assign_ally_color")).parent().parent().children().eq(1).html(), u = $("<a/>", {href:"#n", id:q + "RepConvStatsAlly", 
                  ally_id:L, ally_name:N}).html($("<img/>", {src:RepConv.Const.staticImg + "/stats.png"})).mousePopup(new MousePopup(RepConvTool.GetLabel("STATS.ALLY"))), $(u).attr({href:k("alliance", L, N), target:"_blank"}), n.getJQElement().find($("a.color_table.assign_ally_color")).parent().css("min-width", "100px").append(u));
                  0 == n.getJQElement().find($(F + "RepConvStatsTown")).length && 0 < n.getJQElement().find($(".town_bbcode_id")).length && (F = n.getJQElement().find($(".town_bbcode_id")).attr("value").replace(/.*\]([0-9]*)\[.*/, "$1"), u = $("<a/>", {href:"#n", id:q + "RepConvStatsTown", town_id:F, style:"position: absolute; top: 1px; right: 2px;"}).html($("<img/>", {src:RepConv.Const.staticImg + "/stats.png"})).mousePopup(new MousePopup(RepConvTool.GetLabel("STATS.TOWN"))), $(u).attr({href:k("town", 
                  F, null), target:"_blank"}), n.getJQElement().find($("div.game_header.bold")).append(u));
                  RepConv.settings[RepConv.Cookie + "_idle"] && 0 == n.getJQElement().find($(".grcrt_idle")).length && 0 != n.getJQElement().find($(".gp_player_link")).length && ($("<div/>", {"class":"grcrt_idle"}).insertBefore(n.getJQElement().find($("li:not(.reservation_tool)")).find($(".gp_player_link"))), R(n));
                  break;
                case "town_info_support":
                  h(n);
                  break;
                case "town_info_trading":
                  RepConvABH.functCall(n, !1);
                  l(n);
                  break;
                case "town_info_god":
                  J(n);
              }
              break;
            case "wonders":
              l(n);
              n = MM.checkAndPublishRawModel("Town", {id:Game.townId}).getAvailableTradeCapacity();
              RepConv.Debug && console.log(n);
              try {
                O[WorldWonders.all_wonders[WorldWonders.wonder_nr].island_x + "_" + WorldWonders.all_wonders[WorldWonders.wonder_nr].island_y] = WorldWonders.wonder_nr, RepConv.settings[RepConv.Cookie + "_wonder_trade"] && 0 < n && (WorldWonders.spinners.wood.setValue(n / 3), WorldWonders.spinners.stone.setValue(n / 3), WorldWonders.spinners.iron.setValue(n / 3));
              } catch (T) {
              }
              break;
            case "town_overviews":
              switch(n.getContext().sub) {
                case "town_overviews_trade_overview":
                  RepConvABH.functCall(n, !0);
                  break;
                case "town_overviews_command_overview":
                  E(n);
              }
              break;
            case "conquest_info":
              switch(n.getContext().sub) {
                case "conquest_info_getinfo":
                  A(n);
              }
              break;
            case "building_farm":
              0 == n.getJQElement().find($("#farm_militia .game_footer #grcrt_militia")).length && n.getJQElement().find($("#farm_militia .game_footer #request_militia_button")).is(":visible") && n.getJQElement().find($("#farm_militia .game_footer #request_militia_button")).before($("<div/>", {"class":"index_unit unit_icon40x40 militia", id:"grcrt_militia"}).append($("<div/>", {"class":"value"}).html(Math.min(MM.getCollections().Town[0].getCurrentTown().getBuildings().getBuildingLevel("farm"), 25) * 
              (MM.getCollections().Town[0].getCurrentTown().getResearches().get("town_guard") ? 15 : 10)).css({"text-align":"right", "font-family":"Verdana", "font-weight":"700", "font-size":"12px", margin:"1px", color:"#fff", "text-shadow":"1px 1px 0 #000", position:"absolute", bottom:"1px", right:"1px"}))) && n.getJQElement().find($("#farm_militia .game_footer")).height(44);
          }
        }), $.each(V, function(a, b) {
          if (WM.isOpened(b)) {
            var c = WM.getWindowByType(b)[0];
            c ? (RepConv.WND = c, RepConv.Debug && console.log('dodanie przycisku dla "' + c.getType() + '"'), $("#window_" + c.getIdentifier()).ready(function() {
              RepConv.Debug && console.log('dodanie przycisku dla "' + c.getType() + '" [id:' + c.getIdentifier() + "]");
              RepConvGRC.addBTN(c);
            })) : RepConv.Debug && console.log("typ wnd nieznany");
          }
        });
      }
    }
    1 == $("#grcrt_pl").length && (RepConv.Debug && console.log("War=" + RepConv.models.PlayerLedger.getCoinsOfWar()), RepConv.Debug && console.log("Wisdom=" + RepConv.models.PlayerLedger.getCoinsOfWisdom()), $("#grcrt_pl_war").html(RepConv.models.PlayerLedger.getCoinsOfWar()), $("#grcrt_pl_wis").html(RepConv.models.PlayerLedger.getCoinsOfWisdom()));
  });
  $.Observer(GameEvents.window.open).subscribe("GRCRT_GRC_window_open", function(a, b) {
    try {
      RepConv.WND = b, RepConv.Debug && console.log('dodanie przycisku dla "' + b.getType() + '"'), $("#window_" + b.getIdentifier()).ready(function() {
        RepConv.Debug && console.log('dodanie przycisku dla "' + b.getType() + '" [id:' + b.getIdentifier() + "]");
        RepConvGRC.addBTN(b);
      });
    } catch (c) {
    }
  });
  $.Observer(GameEvents.window.close).subscribe("GRCRT_GRC_window_close", function(a, b, c) {
    switch(b.type) {
      case Layout.wnd.TYPE_TOWN_OVERVIEWS:
        q("grcrt_townsDD");
        q("grcrt_FI");
        q("grcrt_FR");
        q("grcrt_FO");
        q("grcrt_towns");
        break;
      case Layout.wnd.TYPE_BUILDING:
        "building_wall_index" == b.window_obj.wnd.getContext().sub && (q("grcrt_saved"), q("grcrt_wall"), q("grcrt_delsaved"));
    }
  });
  $.Observer(GameEvents.window.reload).subscribe("GRCRT_GRC_window_reload", function(a, b, c) {
    0 == $("#grcrtListSaved").length && (q("grcrt_saved"), q("grcrt_delsaved"));
    0 == $("#grcrtListWall").length && q("grcrt_wall");
  });
  $.Observer(GameEvents.ui.layout_gods_spells.state_changed).subscribe("GRCRT_GRC_ui_layout_gods_spells_state_changed", function() {
    RepConvTool.loadPower();
  });
  $.Observer(GameEvents.ui.layout_gods_spells.rendered).subscribe("GRCRT_GRC_ui_layout_gods_spells_rendered", function() {
    RepConvTool.loadPower();
  });
  $.Observer(GameEvents.window.daily_bonus.accept).subscribe("GRCRT_GRC_window_daily_bonus_accept", function() {
    RepConvTool.loadPower();
  });
  $.Observer(GameEvents.bar.powers.render).subscribe("GRCRT_GRC_bar_powers_render", function() {
    RepConvTool.loadPower();
  });
  $.Observer(GameEvents.town.town_switch).subscribe("GRCRT_GRC_town_town_switch", function() {
    $("#GRCRT_block").show();
    $("#GRCRT_block[rel=" + Game.townId + "]").hide();
  });
  $.Observer(GameEvents.favor.change).subscribe("GRCRT_GRC_favor_change", function() {
    setTimeout(function() {
      RepConvTool.loadPower();
    }, 100);
  });
  var wa;
  GameEvents.grcrt = GameEvents.grcrt || {};
  GameEvents.grcrt.powertooltip = "grcrt:powertooltip";
  wa = DM.getTemplate("COMMON", "casted_power_tooltip");
  DM.loadData({templates:{COMMON:{casted_power_tooltip:wa + "<script type=\"text/javascript\">;\n$.Observer(GameEvents.grcrt.powertooltip).publish({power:'<%=power.id%>'});\n\x3c/script>"}}});
  $.Observer(GameEvents.grcrt.powertooltip).subscribe("GRCRT_GRC_grcrt_powertooltip", function(a, b) {
    H(b.power);
  });
  $("head").append($("<style/>").append(".tripple-progress-progressbar .amounts {width: 300px; text-align: right;}")).append($("<style/>").append(".grcrt_power {position: absolute; top: 35px; right: 85px; z-index: 5}\n.grcrt_power .new_ui_power_icon.active_animation .extend_spell {width: 56px; height: 56px; background-image: none;}\n.grcrt_command {display: none !important}\n.grcrt_return {width: 19px; height: 13px; display: inline-block; margin: 0 2px; vertical-align: middle; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAaCAYAAACHD21cAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggYFSEA10+XNgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAC+ElEQVQ4y42UUUhUaRiGnzPn6OjMhB0ZsliiacOIaI3YNiiwLtIkVt2rxbFGMXIuuig3sdBoRkejaS8yguhCiQRdzlwIlYtQM3ZRgQVRYATWtsvIbrFra55mG3OnOWf/vZjUzGP23X7fw/9+7/fyS1hUrK9RTOhJ3KqLUl+nZDVjs4J+vjnCng0pfomPs1gpVtDJSoFIv2FCNxcFbR9Dwe/z2PWjE2Gm+FQpH0JttYUUn/yLrGw7thwndx88INT4nZgZdqsuANavLUD68KUdwSR57i8QwFCwYIEN5tQLACL3DJQJPUnowCa2HnlEjmMZSpYdI52ipH2c/9LvePP65TyJdzuWMaGbKG7VRevlEe61yRSfTjOdfI1r+QquHoxjc6xCdu2chbYeuv1+dwVbqa9Tqti9mY5rguHTKzHe/cv0VAJhptkXGqbvxhP6bjyZczPHjVt1ZRaYgdt++p074TWk3v6DlOVg+9frqPl2C/t3r5kFM2dKzt2x1NcpxfoaRevlEW4FVpJ+9Qj4EpGe4pvD9+fA91KlxZLTvPMZV54X4yvbMNszEr/OuiotldXhh7/Nu+HMHRUr8JWyDV2eRNiW09r5mSHXNE0MDQ1RVFREPB5fOqsAkUhExGIxqqqqME0TXdeXBjVNE7FYjNraWs6eOoppmkuHPBKJiGg0it/vJ9TsZ2x6NdnZ2Ty+f52mpiaRn58/D/J4PEgz8mpqajj4Q4iNqzPuBYNBZFlGCIHdbp8HDgwMoOi6Tn19Pb5DJyjM+xvIgO3t7ZYSw+FwRqqqqnR1dXEhfJzzZ47xbNygsEChoaEBp9OJw+EAQJZlWlpa5szxer1SWVkZ/f39nOi4iCf3j0xKDINQs5/e3l4GBwetXfV6vVJJSQk9PT20nunm6Z8pcnNz+WrbXurq6qisrFz8s6qurpY0TRPd3d1cOhcgkUgghMAwDAKBwAJQskpONBqloqKC0dFRysvLkWV5gauWOdQ0TUxOTqKqKmNjYwv6Ho+H/wFcKEqd4DudIQAAAABJRU5ErkJggg==) no-repeat;}\n.grcrt_return.grcrt_disabled {background-position: 0 -13px !important;}\n.grcrt_filter {cursor: pointer;}\n.overview_outgoing.icon.grcrt_disabled {background-position: -12px -13px !important;}\n.overview_incoming.icon.grcrt_disabled {background-position: 0 -13px !important;}\n.grcrt_wall_units {width: 54px; height: 71px; float: left;}\n.grcrt_wall_diff {float: right; padding-right: 4px; font-weight: 700; letter-spacing: -1px; color: green;}\n.grcrt_wall_compare_dd {float: left; text-align: right;}\n.grcrt_dd_list {margin-left:5px; width: 125px !important;}\n").append(".grcrt_idle {min-width: 20px; min-height: 11px; background: url(" + 
  RepConv.grcrt_cdn + "ui/idle_loader2.gif) no-repeat; float: left; margin-right: 4px; margin-top: 3px;}\n.grcrt_idle_days { background: url(" + RepConv.grcrt_cdn + "ui/idle.png) 0 0 no-repeat; color: white; text-align: center; font-size: 8px; vertical-align: middle; text-shadow: 1px 1px black; min-width: 20px; min-height: 11px; padding-top: 1px; cursor: help;}\n.grcrt_idle_dg {background-position: 0px 0px;}\n.grcrt_idle_dy {background-position: 0px -12px;}\n.grcrt_idle_dr {background-position: 0px -24px;}\n").append(".grcrt_lost_res {visibility: visible !important;}\n"));
  $("#ui_box").append($("<img/>", {src:RepConv.grcrt_cdn + "img/mute.png", id:"grcrtSound", style:"position:absolute; bottom: 45px; left: 15px;z-index: 1002;"}).mousePopup(new MousePopup(RepConvTool.GetLabel("POPDISABLEALARM"))).click(function() {
    null != L && L ? F.stopVideo() : (RepConv.audio.alarm.pause(), RepConv.audio.alarm.currentTime = 0, RepConv.audio.mute.play());
    $("#grcrtSound").hide();
  }).hide());
  $("<div/>", {id:"grcrtVideoContainer", style:"display:none"}).appendTo($("body"));
  $("<div/>", {id:"grcrtVideoContainerTest", style:"display:none"}).appendTo($("body"));
  $.getScript("https://www.youtube.com/player_api").done(function(a, b) {
    setTimeout(function() {
      ca();
    }, 100);
  });
  RepConv.initArray.push("RepConvGRC.init()");
  RepConv.wndArray.push("grcrt");
  RepConv.wndArray.push("grcrt_stats");
  this.init = function() {
    try {
      "undefined" != typeof $.fn.spinner && function(a) {
        RepConv.oldSpinner || (RepConv.oldSpinner = a.fn.spinner, a.fn.spinner = function() {
          var a = RepConv.oldSpinner.apply(this, arguments);
          a.on("keyup", "input", function(b) {
            38 == b.keyCode ? a.stepUp() : 40 == b.keyCode && a.stepDown();
          });
          return a;
        });
      }(jQuery);
    } catch (a) {
      console.err(a);
    }
    new _grcrtWindowGrcRT;
    new _grcrtWindowStats;
    MM.checkAndPublishRawModel("CommandsMenuBubble", {id:Game.player_id}).onIncomingAttackCountChange(function() {
      ka();
    }, MM.checkAndPublishRawModel("CommandsMenuBubble", {id:Game.player_id}));
    0 < MM.checkAndPublishRawModel("CommandsMenuBubble", {id:Game.player_id}).getIncommingAttacksCommandsCount() && ka();
    void 0 == RepConv.idleInterval && (da(), RepConv.idleInterval = setInterval(function() {
      da();
    }, 9E5));
  };
}
function _grcrtWindowStats() {
  require("game/windows/ids").GRCRT_STATS = "grcrt_stats";
  (function() {
    var e = window.GameControllers.TabController.extend({render:function() {
      var a = this.getWindowModel().getArguments(), b = RepConv.grcrt_domain + "light/" + a.what + "/" + Game.world_id + "/" + a.id + "/" + Game.locale_lang, c = this.getWindowModel().getIdentifier();
      this.getWindowModel().showLoading();
      this.getWindowModel().setTitle(RepConvTool.GetLabel("STATS." + ("ALLIANCE" == a.what.toUpperCase() ? "ALLY" : a.what.toUpperCase())));
      this.$el.html($("<div/>").append($("<iframe/>", {src:b, style:"width: 825px; height: 625px; border: 0px"}).bind("load", function() {
        $.each(WM.getWindowByType("grcrt_stats"), function(a, b) {
          b.getIdentifier() == c && b.hideLoading();
        });
      })));
    }});
    window.GameViews.GrcRTView_grcrt_stats = e;
  })();
  (function() {
    var e = window.GameViews, a = window.WindowFactorySettings, b = require("game/windows/ids"), c = require("game/windows/tabs"), g = b.GRCRT_STATS;
    a[g] = function(a) {
      a = a || {};
      return us.extend({window_type:g, minheight:660, maxheight:680, width:840, tabs:[{type:c.INDEX, title:RepConvTool.GetLabel("HELPTAB1"), content_view_constructor:e.GrcRTView_grcrt_stats, hidden:!0}], max_instances:5, activepagenr:0, minimizable:!0, resizable:!1, title:RepConv.Scripts_nameS + "  ver." + RepConv.Scripts_version}, a);
    };
  })();
}
function _grcrtWindowGrcRT() {
  require("game/windows/ids").GRCRT = "grcrt";
  (function() {
    var e = window.GameControllers.TabController.extend({render:function() {
      this.getWindowModel().showLoading();
      this.$el.html($("<div/>").append($("<iframe/>", {src:this.whatLoading(), style:"width: 815px; height: 430px; border: 0px; float: left;"}).bind("load", function() {
        WM.getWindowByType("grcrt")[0].hideLoading();
      })));
    }, whatLoading:function() {
      var a = this.getWindowModel().getArguments(), b = RepConv.getUrlForWebsite(this.getWindowModel().getActivePage().getType());
      null != a && this.getWindowModel().getActivePage().getType() == a.page && (a = a.hash, this.getWindowModel().setArguments(null), b = RepConv.getUrlForWebsite(this.getWindowModel().getActivePage().getType(), a));
      return b;
    }});
    window.GameViews.GrcRTViewEx_grcrt = e;
  })();
  (function() {
    var e = window.GameControllers.TabController.extend({render:function() {
      this.$el.html(RepConvGRC.settings());
      this.getWindowModel().hideLoading();
    }});
    window.GameViews.GrcRTViewS_grcrt = e;
  })();
  (function() {
    var e = window.GameControllers.TabController.extend({render:function() {
      this.$el.html(RepConvTranslations.table());
      this.getWindowModel().hideLoading();
    }});
    window.GameViews.GrcRTViewT_grcrt = e;
  })();
  (function() {
    var e = window.GameViews, a = window.WindowFactorySettings, b = require("game/windows/ids"), c = require("game/windows/tabs"), g = b.GRCRT;
    a[g] = function(a) {
      a = a || {};
      return us.extend({window_type:g, minheight:475, maxheight:485, width:830, tabs:[{type:"grc", title:RepConvTool.GetLabel("HELPTAB1"), content_view_constructor:e.GrcRTViewEx_grcrt, hidden:!1}, {type:"grchowto", title:RepConvTool.GetLabel("HELPTAB2"), content_view_constructor:e.GrcRTViewEx_grcrt, hidden:!1}, {type:"changesgrc", title:RepConvTool.GetLabel("HELPTAB3"), content_view_constructor:e.GrcRTViewEx_grcrt, hidden:!1}, {type:c.INDEX, title:RepConvTool.GetLabel("HELPTAB4"), content_view_constructor:e.GrcRTViewS_grcrt, 
      hidden:!1}, {type:c.INDEX, title:RepConvTool.GetLabel("HELPTAB5"), content_view_constructor:e.GrcRTViewT_grcrt, hidden:!1}], max_instances:1, activepagenr:0, minimizable:!0, resizable:!1, title:RepConv.Scripts_nameS + "  ver." + RepConv.Scripts_version}, a);
    };
  })();
}
function _GRCRTRepConvTranslations() {
  function e() {
    RepConvTool.setItem(RepConv.CookieTranslate, JSON.stringify(RepConvTranslations.RepConvLangArrayNew));
    RepConvLangArray[Game.locale_lang.substring(0, 2)] = RepConvTranslations.RepConvLangArrayNew;
    RepConv.Lang = RepConvTranslations.RepConvLangArrayNew;
  }
  this.RepConvLangArrayNew = {};
  RepConv.CookieTranslate = RepConv.Cookie + "_translate";
  this.table = function() {
    var a = $("<div/>", {id:"grcrttranslate", style:"padding: 5px"}), b = RepConv.Scripts_update_path + "translation.php", c = $("<iframe/>", {id:"transSender", name:"transSender", style:"display:none"});
    $(a).append($("<h4/>", {style:"float:left;"}).html(RepConvTool.GetLabel("LANGS.LANG") + " " + Game.locale_lang.substring(0, 2))).append($("<form/>", {action:b, method:"post", target:"transSender", id:"transForm", style:"display:none"}).append($("<input/>", {name:"player"}).attr("value", Game.player_name)).append($("<input/>", {name:"lang"}).attr("value", Game.locale_lang.substring(0, 2))).append($("<textarea/>", {name:"translations", id:"trans2send"}).text(RepConvTool.getItem(RepConv.CookieTranslate)))).append($(c)).append(RepConvTool.AddBtn("LANGS.SEND").click(function() {
      try {
        RepConvTranslations.sendTranslate(), HumanMessage.success(RepConvTool.GetLabel("MSGHUMAN.OK"));
      } catch (a) {
        HumanMessage.error(RepConvTool.GetLabel("MSGHUMAN.ERROR"));
      }
    })).append(RepConvTool.AddBtn("LANGS.SAVE").click(function() {
      try {
        e(), HumanMessage.success(RepConvTool.GetLabel("MSGHUMAN.OK"));
      } catch (a) {
        HumanMessage.error(RepConvTool.GetLabel("MSGHUMAN.ERROR"));
      }
    })).append(RepConvTool.AddBtn("LANGS.RESET").click(function() {
      Layout.showConfirmDialog("GRCRTools", '<div><img src="' + RepConv.grcrt_domain + 'img/octopus.png" style="float:left;padding-right: 10px"/><p style="padding:5px">' + RepConvTool.GetLabel("LANGS.REMOVE") + "</p></div>", function() {
        RepConvLangArray = new _GRCRTRepConvLangArray;
        void 0 == RepConvLangArray[Game.locale_lang.substring(0, 2)] ? RepConv.LangEnv = "en" : RepConv.LangEnv = Game.locale_lang.substring(0, 2);
        void 0 == RepConvLangArray[RepConv.LangEnv] && (RepConv.LangEnv = "en", RepConv.LangLoaded = !0);
        RepConv.Lang = RepConvLangArray[RepConv.LangEnv];
        RepConvTool.setItem(RepConv.CookieTranslate, "");
        RepConvTranslations.changeLang(Game.locale_lang.substring(0, 2));
      }, RepConvTool.GetLabel("MSGRTYES"), null, RepConvTool.GetLabel("MSGRTNO"));
    })).append($("<br/>", {style:"clear:both"})).append($("<div/>", {style:"height: 32px;"}).html(RepConvTool.GetLabel4Lang("AUTHOR", Game.locale_lang.substring(0, 2)))).append(this.changeLang(Game.locale_lang.substring(0, 2)));
    return a;
  };
  this.sendTranslate = function() {
    e();
    $("#trans2send").text(RepConvTool.getItem(RepConv.CookieTranslate));
    $("#transForm").submit();
  };
  this.changeLang = function(a) {
    function b(b) {
      $(e).append($("<div/>", {"class":"grcrtLangRow"}).append($("<textarea/>", {"class":"grcrtLangEN", id:"en_" + b.replace(/\./g, "_"), readonly:"readonly"}).html(RepConvTool.GetLabel4Lang(b, "en"))).append($("<textarea/>", {"class":"grcrtLangTranslate", rel:b}).text(RepConvTool.GetLabel4Lang(b, a)).css("background-color", RepConvTool.GetLabel4Lang(b, "en") == RepConvTool.GetLabel4Lang(b, a) && "en" != a ? "lightcoral" : "white").change(function() {
        function a(b, c, e) {
          console.log(e);
          var g = c.split(".");
          c = c.split(".");
          1 == c.length ? b[c[0]] = e : (b[c[0]] = b[c[0]] || {}, g.remove(0), b[c[0]] = a(b[c[0]], g.join("."), e));
          return b;
        }
        console.log("aqq");
        RepConvTranslations.RepConvLangArrayNew = a(RepConvTranslations.RepConvLangArrayNew, $(this).attr("rel"), $(this).val());
      })).append($("<br/>", {style:"clear:both"})));
    }
    function c(a, e) {
      e += 0 == e.length ? "" : ".";
      $.each(a, function(a, g) {
        "object" == typeof g ? c(g, e + a) : 0 < g.length && "AUTHOR" != e + a && b(e + a);
      });
    }
    var e = $("<div/>", {id:"grcrttrrows"});
    RepConvLangArray[a] = RepConvLangArray[a] || RepConvLangArray.en;
    this.RepConvLangArrayNew = $.extend({}, RepConvLangArray[a]);
    c(RepConvLangArray.en, "");
    $("#grcrttrrows").remove();
    $("#grcrttranslate").append(e);
    return e;
  };
  $("head").append($("<style/>").append("#grcrttrrows {height: 360px;overflow: auto;}").append(".grcrtLangRow {border-top: solid 1px grey;}").append(".grcrtLangEN {float: left;width: 370px;margin-top: 2px;background-color: transparent;border: 0px;}").append(".grcrtLangTranslate {width: 400px;resize: vertical;height: 100%;margin-left: 5px;}"));
  null != RepConvTool.getItem(RepConv.CookieTranslate) && (RepConvLangArray[Game.locale_lang.substring(0, 2)] = JSON.parse(RepConvTool.getItem(RepConv.CookieTranslate)), RepConv.Lang = RepConvLangArray[Game.locale_lang.substring(0, 2)]);
}
function _GRCRTRepConvAdds() {
  function e() {
    if (void 0 == require("game/windows/ids")) {
      setTimeout(function() {
        e();
      }, 100);
    } else {
      var a = require("game/windows/ids");
      $.each(RepConv.wndArray, function(c, e) {
        a[e.toUpperCase()] = e;
      });
      window.define("game/windows/ids", function() {
        return a;
      });
      $.each(RepConv.initArray, function(a, b) {
        setTimeout(b, 10);
      });
    }
  }
  function a() {
    $("head").append($("<style/>").append(".grcrt {background: url(" + RepConv.grcrt_cdn + "ui/layout_3.3.0.png) -4px -80px no-repeat;}").append("#grcrt_mnu_list ul { height: auto !important;}"));
    $.each(RepConv.menu, function(a, c) {
      $("#grcrt_mnu_list ul").append($("<li/>").append($("<span/>", {"class":"content_wrapper"}).append($("<span/>", {"class":"button_wrapper"}).append($("<span/>", {"class":"button"}).append($("<span/>", {"class":"icon grcrt" + (c.class ? " " + c.class : "")})).append($("<span/>", {"class":"indicator", style:"display: none;"}))).append($("<span/>", {"class":"name_wrapper", style:"width: 90px; height: 34px;"}).append($("<span/>", {"class":"name"}).html(RepConvTool.GetLabel(c.name)))))).click(function() {
        eval(c.action);
      }).attr("id", c.id));
    });
  }
  this.init = function() {
    if ("undefined" == typeof RepConv.settingsReaded || "undefined" == typeof Layout) {
      RepConv.Debug && console.log("czekam...."), setTimeout(function() {
        RepConvAdds.init();
      }, 100);
    } else {
      RepConv.Debug && console.log("init....");
      var b = (require("map/helpers") || MapTiles).map2Pixel(100, 100);
      $("head").append($("<style/>").append(".RepConvON {border: 1px solid #fff; position: absolute; display: block; z-index: 2; opacity: .1;width: " + b.x + "px; height: " + b.x + "px;}#RepConvSpanPrev .outer_border {border: 2px solid black; font-size: 95%;}").append("#ui_box.grcrt_ui_box .nui_units_box{ top:244px;}#ui_box.grcrt_ui_box .nui_right_box #grcrt_pl{  top:156px;  height: 30px; line-height: 24px; font-weight: 700; color: rgb(255, 204, 102); font-size: 11px; text-align: center;}#ui_box.grcrt_ui_box.city-overview-enabled .nui_units_box{ top:223px !important;}#ui_box.grcrt_ui_box.city-overview-enabled .nui_right_box #grcrt_pl{ top:135px;}").append("div.island_info_wrapper div.center1 {top: 0px;width: 435px;float: left;left: 270px;}div.island_info_towns {margin-top: 25px;}div.island_info_wrapper .island_info_left .game_list {height: 340px !important;}div.island_info_wrapper .island_info_right .game_list {height: 370px;}#farm_town_overview_btn {top: 75px !important}"));
      RepConv.audioSupport = "function" == typeof Audio;
      $("body").append($("<div/>", {id:"RepConvTMP"}).hide());
      try {
        RepConv.Debug && console.log(RepConv.settings), RepConvTool.checkSettings(), RepConv.active.fcmdimg = !1, RepConv.active.power = RepConvTool.getSettings(RepConv.CookiePower), RepConv.active.ftabs = RepConvTool.getSettings(RepConv.CookieForumTabs), RepConv.active.statsGRCL = RepConvTool.getSettings(RepConv.CookieStatsGRCL), RepConv.active.unitsCost = RepConvTool.getSettings(RepConv.CookieUnitsCost), RepConv.active.oceanNumber = RepConvTool.getSettings(RepConv.CookieOceanNumber), RepConv.active.reportFormat = 
        RepConvTool.getSettings(RepConv.CookieReportFormat), RepConvTool.useSettings();
      } catch (g) {
        RepConv.Debug && console.log(g);
      }
      RepConv.Debug && console.log(RepConv.settings);
      RepConv.Debug && console.log("zmiana wygl\u0105du");
      RepConv.Debug && console.log(-1 != location.pathname.indexOf("game"));
      RepConv.Debug && console.log($("#ui_box div.bottom_ornament").length);
      -1 != location.pathname.indexOf("game") && (0 == $("#grcrt_mnu_list").length && ($("#ui_box div.bottom_ornament").before($("<div/>", {id:"grcrt_mnu_list", "class":"container_hidden", style:"position:relative;"}).append($("<div/>", {"class":"top"})).append($("<div/>", {"class":"bottom"})).append($("<div/>", {"class":"middle nui_main_menu", style:"top: 0px; width: 142px;"}).append($("<div/>", {"class":"left"})).append($("<div/>", {"class":"right", style:"z-index:10;"})).append($("<div/>", {"class":"content", 
      style:"display: none;"}).append($("<div/>", {"class":"units_wrapper clearfix"}).append($("<ul/>")))))), $("#ui_box div.bottom_ornament").append($("<div/>", {id:"grcrt_mnu", style:"background: url(" + RepConv.grcrt_cdn + "ui/layout_3.3.0.png) no-repeat; width: 142px; height: 75px;"}).append($("<div/>", {"class":"btn_settings circle_button", style:"top: 34px; right: 55px;"}).append($("<div/>", {"class":"icon js-caption", style:""}).append($("<img/>", {src:RepConv.grcrt_cdn + "img/octopus.png", 
      style:"width: 20px; margin: 5px;"})).mousePopup(new MousePopup(RepConv.Scripts_nameS + " " + RepConv.Scripts_version + " [" + RepConv.LangEnv + "]")).click(function() {
        $("#grcrt_mnu_list li.main_menu_item").remove();
        $("#grcrt_mnu_list .content").slideToggle();
      })))), a()), $("#ui_box").append($("<img/>", {src:RepConv.grcrt_cdn + "img/octopus.png", id:"grcgrc", style:"position:absolute;bottom:10px;left:10px;z-index:1000"})), this.addPlayerLedger());
      if (RepConv.audioSupport) {
        RepConv.active.sounds = RepConvTool.getSettings(RepConv.CookieSounds);
        RepConv.audio = {};
        var b = $("<audio/>", {preload:"auto"}), c = $("<audio/>", {preload:"auto"}).append($("<source/>", {src:RepConv.Const.defMuteM + ".mp3"})).append($("<source/>", {src:RepConv.Const.defMuteM + ".ogg"}));
        "" != RepConv.active.sounds.url ? $(b).append($("<source/>", {src:RepConv.active.sounds.url})) : $(b).append($("<source/>", {src:RepConv.Const.defAlarmM + ".mp3"})).append($("<source/>", {src:RepConv.Const.defAlarmM + ".ogg"}));
        RepConv.audio.alarm = b.get(0);
        RepConv.audio.mute = c.get(0);
      }
      RepConv.Start = {};
      setTimeout(function() {
        RepConvTool.newVersion();
      }, 3E4);
      RepConv.active.oceanNumber && RepConvAdds.oceanNumbers();
      0 == $("#GTBTN").length && "pl" == Game.market_id && ($("#main_menu").width(865), $("#main_menu div.border_right").css({background:'url("' + RepConv.grcrt_cdn + 'images/prawy.png") no-repeat 0 13px', width:"77px"}), $("#main_menu div.help").css("right", "31px"), $("#main_menu div.logout").css("right", "31px"), $("#main_menu div.options_container").append($("<div/>", {id:"GTBTN", "class":"small_option small_option_top_right help", style:"background: url(" + RepConv.grcrt_cdn + "images/gt.png') no-repeat 0 0; right: 3px; top: 45px;"}).mouseenter(function() {
        $(this).css("background-position", "0 -62px");
      }).mouseleave(function() {
        $(this).css("background-position", "0 0");
      }).click(function() {
        $(this).css("background-position", "0 -31px");
        window.open("http://gretimes.community.grepolis.pl/", "_blank");
      }).mousePopup(new MousePopup("GreTime's"))));
      e();
      try {
        $("#dio_available_units_style_addition").text($("#dio_available_units_style_addition").text().replace(" .nui_main_menu", "#ui_box>.nui_main_menu"));
      } catch (g) {
      }
    }
  };
  this.oceanNumbers = function() {
    if (0 == $("#map_move_container").length) {
      setTimeout(function() {
        RepConvAdds.oceanNumbers();
      }, 100);
    } else {
      if (!RepConv.active.oceanNumber) {
        $("div#grcrt_oceanNumbers").remove();
      } else {
        if (0 == $("div#grcrt_oceanNumbers").length) {
          $("#map_move_container").append($("<div/>", {id:"grcrt_oceanNumbers", style:"position:absolute; top:0; left:0;"}));
          (require("map/helpers") || MapTiles).map2Pixel(100, 100);
          for (var a = 0;10 > a;a++) {
            for (var c = 0;10 > c;c++) {
              var e = (require("map/helpers") || MapTiles).map2Pixel(100 * c, 100 * a);
              $("div#grcrt_oceanNumbers").append($("<div/>", {"class":"RepConvON", style:"left:" + e.x + "px; top: " + e.y + "px; background-image: url(" + RepConv.grcrt_cdn + "map/" + c + a + ".png);"}));
            }
          }
        }
      }
    }
  };
  this.emots = {};
  this.emotsDef = [{img:RepConv.grcrt_cdn + "emots/usmiech.gif", title:":)"}, {img:RepConv.grcrt_cdn + "emots/ostr.gif", title:":>"}, {img:RepConv.grcrt_cdn + "emots/kwadr.gif", title:":]"}, {img:RepConv.grcrt_cdn + "emots/smutny2.gif", title:":("}, {img:RepConv.grcrt_cdn + "emots/yyyy.gif", title:":|"}, {img:RepConv.grcrt_cdn + "emots/uoeee.gif", title:"<uoee>"}, {img:RepConv.grcrt_cdn + "emots/lol.gif", title:"<lol>"}, {img:RepConv.grcrt_cdn + "emots/rotfl.gif", title:"<rotfl>"}, {img:RepConv.grcrt_cdn + 
  "emots/oczko.gif", title:";)"}, {img:RepConv.grcrt_cdn + "emots/jezyk.gif", title:":P"}, {img:RepConv.grcrt_cdn + "emots/jezyk_oko.gif", title:";P"}, {img:RepConv.grcrt_cdn + "emots/stres.gif", title:"<stres>"}, {img:RepConv.grcrt_cdn + "emots/nerwus.gif", title:"<nerwus>"}, {img:RepConv.grcrt_cdn + "emots/zly.gif", title:":["}, {img:RepConv.grcrt_cdn + "emots/w8.gif", title:"<w8>"}, {img:RepConv.grcrt_cdn + "emots/wesoly.gif", title:":))"}, {img:RepConv.grcrt_cdn + "emots/bezradny.gif", title:"<bezradny>"}, 
  {img:RepConv.grcrt_cdn + "emots/krzyk.gif", title:"<krzyk>"}, {img:RepConv.grcrt_cdn + "emots/szok.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/hura.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/boisie.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/prosi.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/nie.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/hejka.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/okok.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/cwaniak.gif", title:""}, 
  {img:RepConv.grcrt_cdn + "emots/haha.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/mysli.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/pocieszacz.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/foch.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/zmeczony.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/beczy.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/wysmiewacz.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/zalamka.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/buziak.gif", title:""}, 
  {img:RepConv.grcrt_cdn + "emots/buzki.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/dobani.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/dokuczacz.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/figielek.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/klotnia.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/paluszkiem.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/wnerw.gif", title:""}, {img:RepConv.grcrt_cdn + "emots/zacieszacz.gif", title:""}];
  this.addPlayerLedger = function() {
    RepConv.Debug && console.log("monetki...");
    0 == $("#grcrt_pl").length && GameDataHeroes.areHeroesEnabled() && 0 == $("#ui_box .nui_coins_container").length && (RepConv.Debug && console.log("...dzialam"), RepConv.Debug && console.log("WAR=" + RepConv.models.PlayerLedger.getCoinsOfWar()), $("#ui_box").addClass("grcrt_ui_box"), $("#ui_box .nui_right_box").append($("<div/>", {id:"grcrt_pl", "class":"ui_heroes_overview_container", style:"display:block;"}).append($("<div/>").css({background:"url(//gpzz.innogamescdn.com/images/game/heroes/heroes_common_sprite.2.54.png) no-repeat -546px -88px", 
    height:"24px", width:"140px", position:"absolute", right:"0px", top:"0px"}).append($("<div/>").css({"float":"left", width:"48%", height:"21px"}).append($("<div/>").css({"float":"left", width:"21px", height:"21px", margin:"2px", background:"url(//gpzz.innogamescdn.com/images/game/heroes/heroes_common_sprite.2.54.png) no-repeat -147px -93px"})).append($("<span/>", {id:"grcrt_pl_war", style:"float:left"}).html(RepConv.models.PlayerLedger.getCoinsOfWar())).mousePopup(new MousePopup(DM.getl10n("heroes", 
    "council").exchange_currency.tooltip_coins_of_war))).append($("<div/>").css({"float":"right", width:"48%", height:"21px"}).append($("<div/>").css({"float":"right", width:"21px", height:"21px", margin:"2px", background:"url(//gpzz.innogamescdn.com/images/game/heroes/heroes_common_sprite.2.54.png) no-repeat -124px -93px"})).append($("<span/>", {id:"grcrt_pl_wis", style:"float:right"}).html(RepConv.models.PlayerLedger.getCoinsOfWisdom())).mousePopup(new MousePopup(DM.getl10n("heroes", "council").exchange_currency.tooltip_coins_of_wisdom))))));
  };
}
function _GRCRTRepConvTool() {
  var e = 0;
  this.checkSettings = function() {
    var a = {}, b = !0;
    a[RepConv.CookieCmdImg] = !0;
    a[RepConv.CookiePower] = !0;
    a[RepConv.CookieForumTabs] = !0;
    a[RepConv.CookieStatsGRCL] = "potusek";
    a[RepConv.CookieUnitsCost] = !0;
    a[RepConv.CookieOceanNumber] = !0;
    a[RepConv.CookieReportFormat] = !0;
    a[RepConv.CookieSounds] = {mute:!1, volume:100, url:"", loop:!0};
    RepConv.settings = RepConv.settings || {};
    void 0 == RepConv.settings[RepConv.CookiePower] && (RepConv.settings[RepConv.CookiePower] = JSON.parse(RepConvTool.getSettings(RepConv.CookiePower, a[RepConv.CookiePower])), b = !1, RepConv.Debug && console.log(RepConv.CookiePower));
    void 0 == RepConv.settings[RepConv.CookieForumTabs] && (RepConv.settings[RepConv.CookieForumTabs] = JSON.parse(RepConvTool.getSettings(RepConv.CookieForumTabs, a[RepConv.CookieForumTabs])), b = !1, RepConv.Debug && console.log(RepConv.CookieForumTabs));
    void 0 == RepConv.settings[RepConv.CookieStatsGRCL] && (RepConv.settings[RepConv.CookieStatsGRCL] = RepConvTool.getSettings(RepConv.CookieStatsGRCL, a[RepConv.CookieStatsGRCL]), b = !1, RepConv.Debug && console.log(RepConv.CookieStatsGRCL));
    void 0 == RepConv.settings[RepConv.CookieUnitsCost] && (RepConv.settings[RepConv.CookieUnitsCost] = JSON.parse(RepConvTool.getSettings(RepConv.CookieUnitsCost, a[RepConv.CookieUnitsCost])), b = !1, RepConv.Debug && console.log(RepConv.CookieUnitsCost));
    void 0 == RepConv.settings[RepConv.CookieOceanNumber] && (RepConv.settings[RepConv.CookieOceanNumber] = JSON.parse(RepConvTool.getSettings(RepConv.CookieOceanNumber, a[RepConv.CookieOceanNumber])), b = !1, RepConv.Debug && console.log(RepConv.CookieOceanNumber));
    void 0 == RepConv.settings[RepConv.CookieReportFormat] && (RepConv.settings[RepConv.CookieReportFormat] = JSON.parse(RepConvTool.getSettings(RepConv.CookieReportFormat, a[RepConv.CookieReportFormat])), b = !1, RepConv.Debug && console.log(RepConv.CookieReportFormat));
    void 0 == RepConv.settings[RepConv.CookieUnitsABH] && (RepConv.settings[RepConv.CookieUnitsABH] = RepConvTool.getSettings(RepConv.CookieUnitsABH, "{}"), b = !1, RepConv.Debug && console.log(RepConv.CookieUnitsABH));
    void 0 == RepConv.settings[RepConv.Cookie + "radar_cs"] && (RepConv.settings[RepConv.Cookie + "radar_cs"] = RepConvTool.getSettings(RepConv.Cookie + "radar_cs", "06:00:00"), b = !1, RepConv.Debug && console.log(RepConv.Cookie + "radar_cs"));
    void 0 == RepConv.settings[RepConv.Cookie + "radar_points"] && (RepConv.settings[RepConv.Cookie + "radar_points"] = JSON.parse(RepConvTool.getSettings(RepConv.Cookie + "radar_points", "0")), b = !1, RepConv.Debug && console.log(RepConv.Cookie + "radar_points"));
    void 0 == RepConv.settings[RepConv.CookieWall] && (RepConv.settings[RepConv.CookieWall] = JSON.parse(RepConvTool.getItem(RepConv.CookieWall)) || [], b = !1, RepConv.Debug && console.log(RepConv.CookieWall));
    void 0 == RepConv.settings[RepConv.Cookie] && 0 < RepConv.settings[RepConv.CookieWall].length && (RepConv.settings[RepConv.Cookie] = JSON.parse(RepConvTool.getItem(RepConv.Cookie)) || null, b = !1, RepConv.Debug && console.log(RepConv.Cookie));
    void 0 == RepConv.settings[RepConv.CookieEmots] && (RepConv.settings[RepConv.CookieEmots] = RepConvTool.getItem(RepConv.CookieEmots) || "https://www.pic4ever.com/images/237.gif\nhttps://www.pic4ever.com/images/shake2.gif", b = !1, RepConv.Debug && console.log(RepConv.CookieEmots));
    void 0 == RepConv.settings[RepConv.Cookie + "_idle"] && (RepConv.settings[RepConv.Cookie + "_idle"] = !0, b = !1, RepConv.Debug && console.log(RepConv.Cookie + "_idle"));
    void 0 == RepConv.settings[RepConv.CookieSounds] && (RepConv.settings[RepConv.CookieSounds] = JSON.parse(RepConvTool.getSettings(RepConv.CookieSounds, JSON.stringify(a[RepConv.CookieSounds]))), b = !1, RepConv.Debug && console.log(RepConv.CookieSounds));
    void 0 == RepConv.settings[RepConv.Cookie + "_wonder_trade"] && (RepConv.settings[RepConv.Cookie + "_wonder_trade"] = void 0 == RepConv.settings[RepConv.Cookie + "_wonder_trade"] ? !0 : RepConv.settings[RepConv.Cookie + "_wonder_trade"], b = !1, RepConv.Debug && console.log(RepConv.CookieSounds));
    b ? (RepConv.active.power = RepConv.settings[RepConv.CookiePower], RepConv.active.ftabs = RepConv.settings[RepConv.CookieForumTabs], RepConv.active.statsGRCL = RepConv.settings[RepConv.CookieStatsGRCL], RepConv.active.unitsCost = RepConv.settings[RepConv.CookieUnitsCost], RepConv.active.oceanNumber = RepConv.settings[RepConv.CookieOceanNumber], RepConv.active.reportFormat = RepConv.settings[RepConv.CookieReportFormat], RepConv.audioSupport && (RepConv.active.sounds = RepConv.settings[RepConv.CookieSounds]), 
    this.useSettings()) : (RepConv.Debug && console.log(e), RepConvTool.saveRemote(), 10 > ++e ? setTimeout(function() {
      RepConvTool.readRemote();
    }, 1E3) : (setTimeout(function() {
      e = 0;
    }, 6E4), setTimeout(function() {
      HumanMessage.error(RepConvTool.GetLabel("MSGHUMAN.ERROR"));
    }, 0)));
  };
  this.useSettings = function() {
    setTimeout(function() {
      RepConvAdds.oceanNumbers();
    }, 100);
    setTimeout(function() {
      try {
        RepConvABH.savedArr = JSON.parse(RepConvTool.getSettings(RepConv.CookieUnitsABH, "{}"));
      } catch (a) {
      }
    }, 100);
    setTimeout(function() {
      var a = 0;
      RepConvAdds.emots = {};
      $.each(RepConvAdds.emotsDef, function(c, e) {
        RepConvAdds.emots[a++] = e;
      });
      void 0 != RepConvTool.getItem(RepConv.CookieEmots) && $.each(RepConvTool.getItem(RepConv.CookieEmots).split("\n"), function(c, e) {
        RepConvAdds.emots[a++] = {img:e, title:""};
      });
    }, 100);
    try {
      $("#grcrt_disable_quack").remove(), RepConv.settings[RepConv.Cookie + "_idle"] && $("head").append($("<style/>", {id:"grcrt_disable_quack"}).append("a.qt_activity {display: none !important;}"));
    } catch (b) {
    }
    $.Observer(GameEvents.grcrt.settings.load).publish();
    try {
      if (RepConv.settings[RepConv.Cookie + "_translate"] && "" != RepConv.settings[RepConv.Cookie + "_translate"]) {
        var a = Game.locale_lang.substring(0, 2);
        RepConvLangArray[a] = JSON.parse(RepConv.settings[RepConv.Cookie + "_translate"]);
        RepConv.Lang = RepConvLangArray[a];
        RepConv.LangEnv = a;
      }
    } catch (b) {
    }
  };
  this.saveRemote = function() {
    RepConv.Debug && console.log("saveRemote");
    var a = $("<form/>", {action:RepConv.grcrt_domain + "savedata.php", method:"post", target:"GRCSender"}).append($("<textarea/>", {name:"dest"}).text(RepConv.hash)).append($("<textarea/>", {name:"param"}).text(btoa(JSON.stringify(RepConv.settings).replace(/[\u007f-\uffff]/g, function(a) {
      return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
    }))));
    $("#RepConvTMP").html(null);
    $("#RepConvTMP").append(a);
    a.submit();
    this.useSettings();
  };
  this.readRemote = function() {
    RepConv.Debug && console.log("readRemote");
    $.ajax({type:"POST", url:RepConv.grcrt_domain + "readdata.php", data:{dest:RepConv.hash}, dataType:"script", async:!1}).done(function() {
      RepConv.settingsReaded = !0;
      RepConvTool.checkSettings();
    });
  };
  this.setItem = function(a, b) {
    RepConv.Debug && console.log("setItem(" + a + ")");
    "object" == typeof RepConv.settings && (RepConv.settings[a] = b, RepConvTool.saveRemote());
  };
  this.getItem = function(a) {
    RepConv.Debug && console.log("getItem(" + a + ")");
    if ("object" == typeof RepConv.settings && "undefined" != typeof RepConv.settings[a]) {
      return RepConv.settings[a];
    }
    if ("function" == typeof GM_getValue) {
      return RepConv.Debug && console.log("... use GM"), "undefined" == GM_getValue(a) ? null : GM_getValue(a);
    }
    RepConv.Debug && console.log("... use LS");
    return "undefined" == localStorage.getItem(a) ? null : localStorage.getItem(a);
  };
  this.removeItem = function(a) {
    RepConv.Debug && console.log("removeItem(" + a + ")");
    "function" == typeof GM_deleteValue ? (RepConv.Debug && console.log("... use GM"), GM_deleteValue(a)) : (RepConv.Debug && console.log("... use LS"), localStorage.removeItem(a));
  };
  this.getSettings = function(a, b) {
    if (null != RepConvTool.getItem(a)) {
      return RepConvTool.getItem(a);
    }
    if (null != localStorage.getItem(a)) {
      return RepConvTool.setItem(a, localStorage.getItem(a)), RepConvTool.getItem(a);
    }
    RepConvTool.setItem(a, b);
    return RepConvTool.getItem(a);
  };
  this.GetLabel = function(a) {
    var b, c = a.split("."), e = RepConv.Lang;
    $.each(c, function(a, t) {
      a + 1 == c.length && void 0 != e[t] && (b = e[t]);
      e = e[t] || {};
    });
    return b || this.getLabelLangArray(a);
  };
  this.GetLabel4Lang = function(a, b) {
    var c, e = a.split("."), m = RepConvLangArray[b];
    $.each(e, function(a, b) {
      a + 1 == e.length && void 0 != m && void 0 != m[b] && (c = m[b]);
      m = void 0 != m && void 0 != m[b] ? m[b] : {};
    });
    return c || this.getLabelLangArray(a);
  };
  this.getLabelLangArray = function(a) {
    var b, c = a.split("."), e = RepConvLangArray.en;
    $.each(c, function(a, t) {
      a + 1 == c.length && void 0 != e[t] && (b = e[t]);
      e = e[t] || {};
    });
    return b || a;
  };
  this.getUnit = function(a, b, c) {
    for (var e = -1, m = 0;m < $(b).length;m++) {
      0 == m % c && (-1 < e && 0 < a[e].unit_list.length && (a[e].unit_img = RepConvTool.Adds(RepConv.Const.genImg.RCFormat(RepConvType.sign, a[e].unit_list), "img")), e++, a.Count = e);
      0 < a[e].unit_list.length && (a[e].unit_list += ".");
      var t = RepConvTool.getUnitName($(b)[m]);
      a[e].unit_list += RepConvTool.GetUnit(t);
      a[e].unit_img += RepConvTool.GetUnit(t);
      a[e].unit_send += RepConvTool.Unit($(b + " span.place_unit_black")[m].innerHTML, "000") + RepConvType.separator;
    }
    -1 < e && 0 < a[e].unit_list.length && (a[e].unit_img = RepConvTool.Adds(RepConv.Const.genImg.RCFormat(RepConvType.sign, a[e].unit_list), "img"));
    return a;
  };
  this.getUnitResource = function(a, b) {
    $.each($(b), function(b, e) {
      0 < a.unit_list.length && (a.unit_list += ".");
      if (0 < e.childElementCount) {
        var m = RepConvTool.getUnitName(e.children[0]), m = RepConvTool.GetUnitCost(m), t = e.children[1].innerHTML.replace("-", "");
        "?" != t && (a.w += m.w * parseInt(t), a.s += m.s * parseInt(t), a.i += m.i * parseInt(t), a.p += m.p * parseInt(t), a.f += m.f * parseInt(t));
      }
    });
    return a;
  };
  this.REPORTS = "report";
  this.WALL = "wall";
  this.AGORA = "agora";
  this.COMMANDLIST = "commandList";
  this.COMMAND = "command";
  this.CONQUER = "conquerold";
  this.groupsUnit = {defAtt:"div#building_wall li:nth-child(4) div.list_item_left div.wall_unit_container div.wall_report_unit", defDef:"div#building_wall li:nth-child(6) div.list_item_left div.wall_unit_container div.wall_report_unit", losAtt:"div#building_wall li:nth-child(4) div.list_item_right div.wall_unit_container div.wall_report_unit", losDef:"div#building_wall li:nth-child(6) div.list_item_right div.wall_unit_container div.wall_report_unit"};
  this.newVersion = function() {
    var a = "";
    null != RepConvTool.getItem(RepConv.CookieNew) && (a = RepConvTool.getItem(RepConv.CookieNew));
    a != RepConv.Scripts_version && RepConvNotifications.addNotification(NotificationType.GRCRTWHATSNEW);
  };
  this.Adds = function(a, b) {
    return void 0 != a && 0 < a.length ? "[" + b + "]" + a + "[/" + b + "]" : a;
  };
  this.AddSize = function(a, b) {
    return 0 < a.length && $("#BBCODEA").attr("checked") ? "[size=" + b + "]" + a + "[/size]" : a;
  };
  this.AddFont = function(a, b) {
    return 0 < a.length && "" != b ? "[font=" + b + "]" + a + "[/font]" : a;
  };
  this.White = function(a, b) {
    return RepConvType.blank.slice(1, b - a.length);
  };
  this.Color = function(a, b) {
    return "[color=#" + b + "]" + a + "[/color]";
  };
  this.Unit = function(a, b) {
    RepConv.Debug && console.log(a);
    return RepConvTool.White(a, RepConvType.unitDigits) + a;
  };
  this.Value = function(a, b) {
    return RepConvTool.White(String(a), b) + String(a);
  };
  this.getUnitName = function(a) {
    if (null != $(a).attr("style") && $(a).attr("style").replace(/.*\/([a-z_]*)_[0-9]*x[0-9]*\.png.*/, "$1") != $(a).attr("style")) {
      return $(a).attr("style").replace(/.*\/([a-z_]*)_[0-9]*x[0-9]*\.png.*/, "$1");
    }
    for (var b in GameData.units) {
      if ($(a).hasClass(b)) {
        return b.toString();
      }
    }
    for (b in GameData.heroes) {
      if ($(a).hasClass(b)) {
        return b.toString();
      }
    }
    for (b in GameData.buildings) {
      if ($(a).hasClass("building_" + b)) {
        return b.toString();
      }
    }
    for (b in RepConv.academyCode) {
      if ($(a).hasClass(b)) {
        return b.toString();
      }
    }
    return $(a).hasClass("unknown_naval") ? "unknown_naval" : "unknown";
  };
  this.getCommandIcon = function(a) {
    for (var b in RepConv.commandImage) {
      if ($(a).hasClass(RepConv.commandImage[b])) {
        return RepConvTool.Adds(RepConv.Const.uiImg + "c/" + RepConv.commandImage[b] + ".png", "img");
      }
    }
    return "";
  };
  this.getPowerIcon = function(a) {
    if (void 0 != $(a).attr("data-power-id")) {
      var b = "";
      void 0 != $(a).attr("data-power-configuration") && (b = 0 < $(a).attr("data-power-configuration").length ? "_l" + JSON.parse($(a).attr("data-power-configuration")).level : "");
      return RepConvTool.Adds(RepConv.Const.uiImg + "pm/" + $(a).attr("data-power-id") + b + ".png", "img");
    }
    for (b in RepConv.powerImage) {
      if ($(a).hasClass(RepConv.powerImage[b])) {
        return RepConvTool.Adds(RepConv.Const.uiImg + "pm/" + RepConv.powerImage[b] + ".png", "img");
      }
    }
    return "";
  };
  this.GetUnit = function(a) {
    return RepConv.unitsCode[a] || "XX";
  };
  this.GetUnitCost = function(a, b) {
    try {
      return _ratio = b || 1, {w:Math.round(GameData.units[a].resources.wood * _ratio), s:Math.round(GameData.units[a].resources.stone * _ratio), i:Math.round(GameData.units[a].resources.iron * _ratio), p:GameData.units[a].population, f:Math.round(GameData.units[a].favor * _ratio)};
    } catch (c) {
      return {w:0, s:0, i:0, p:0, f:0};
    }
  };
  this.GetBuild = function(a) {
    return RepConv.buildCode[a] || "XX";
  };
  this.GetImageCode = function(a) {
    return RepConv.buildCode[a] || RepConv.unitsCode[a] || RepConv.academyCode[a] || "XX";
  };
  this.AddBtn = function(a, b) {
    var c = b || "", e = $("<div/>", {"class":"button_new", id:a + c, name:RepConvTool.GetLabel(a), style:"float: right; margin: 2px; ", rel:"#" + c}).button({caption:RepConvTool.GetLabel(a)});
    RepConv.Debug && console.log(c);
    return e;
  };
  this.TownObj = "";
  this.Ramka = function(a, b, c) {
    c = c || 300;
    a = $("<div/>", {"class":"game_border"}).append($("<div/>", {"class":"game_border_top"})).append($("<div/>", {"class":"game_border_bottom"})).append($("<div/>", {"class":"game_border_left"})).append($("<div/>", {"class":"game_border_right"})).append($("<div/>", {"class":"game_border_corner corner1"})).append($("<div/>", {"class":"game_border_corner corner2"})).append($("<div/>", {"class":"game_border_corner corner3"})).append($("<div/>", {"class":"game_border_corner corner4"})).append($("<div/>", 
    {"class":"game_header bold", style:"height:18px;"}).append($("<div/>", {style:"float:left; padding-right:10px;"}).html(a)));
    c = c - 18 - 8;
    c -= 8;
    $(a).append($("<div/>", {"class":"grcrt_frame", style:"overflow-x: hidden; padding-left: 5px; position: relative;"}).html(b).height(c || 300));
    $(a).append($("<div/>", {"class":"game_list_footer", id:"RepConvBtns", style:"display: none;"}));
    return $("<div/>", {"class":"inner_box"}).append(a);
  };
  this.RamkaLight = function(a, b) {
    var c = $("<div/>");
    $(c).append($("<div/>", {"class":"box top left"}).append($("<div/>", {"class":"box top right"}).append($("<div/>", {"class":"box top center"})))).append($("<div/>", {"class":"box middle left"}).append($("<div/>", {"class":"box middle right"}).append($("<div/>", {"class":"box middle center"}).append($("<span/>", {"class":"town_name"}).html(a)).append($("<div/>", {"class":"box_content"}).html(b))))).append($("<div/>", {"class":"box bottom left"}).append($("<div/>", {"class":"box bottom right"}).append($("<div/>", 
    {"class":"box bottom center"}))));
    return c;
  };
  this.insertBBcode = function(a, b, c) {
    c.focus();
    if ("undefined" != typeof document.selection) {
      c = document.selection.createRange();
      var e = c.text;
      c.text = a + e + b;
      c = document.selection.createRange();
      0 == e.length ? c.move("character", -b.length) : c.moveStart("character", a.length + e.length + b.length);
      c.select();
    } else {
      if ("undefined" != typeof c.selectionStart) {
        c.focus();
        var m = c.selectionStart, t = c.selectionEnd, A = c.scrollTop, v = c.scrollHeight, e = c.value.substring(m, t);
        c.value = c.value.substr(0, m) + a + e + b + c.value.substr(t);
        a = 0 == e.length ? m + a.length : m + a.length + e.length + b.length;
        c.selectionStart = a;
        c.selectionEnd = a;
        c.scrollTop = A + c.scrollHeight - v;
      }
    }
  };
  this.addsEmots = function(a, b, c) {
    0 == a.getJQElement().find("#emots_popup_" + a.type).length && (a.getJQElement().find($(".bb_button_wrapper")).append($("<div/>", {id:"emots_popup_" + a.type, style:"display:none; z-index: 5000;"}).append($("<div/>", {"class":"bbcode_box middle_center"}).append($("<div/>", {"class":"bbcode_box top_left"})).append($("<div/>", {"class":"bbcode_box top_right"})).append($("<div/>", {"class":"bbcode_box top_center"})).append($("<div/>", {"class":"bbcode_box bottom_center"})).append($("<div/>", {"class":"bbcode_box bottom_right"})).append($("<div/>", 
    {"class":"bbcode_box bottom_left"})).append($("<div/>", {"class":"bbcode_box middle_left"})).append($("<div/>", {"class":"bbcode_box middle_right"})).append($("<div/>", {"class":"bbcode_box content clearfix", style:"overflow-y:auto !important; max-height: 185px;"}))).css({position:"absolute", top:"27px", left:"455px", width:"300px"})), $.each(RepConvAdds.emots, function(b, e) {
      a.getJQElement().find("#emots_popup_" + a.type + " .content").append($("<img/>", {src:e.img, title:e.title}).click(function() {
        RepConvTool.insertBBcode("[img]" + $(this).attr("src") + "[/img]", "", a.getJQElement().find(c)[0]);
        $("#emots_popup_" + a.type).toggle();
      }));
    }), a.getJQElement().find(b).append($("<img/>", {src:RepConv.Scripts_url + "emots/usmiech.gif", style:"cursor: pointer;"}).click(function() {
      $("#emots_popup_" + a.type).toggle();
    })), a.getJQElement().find(b).append($("<img/>", {src:RepConv.Const.uiImg + "paste_report.png", style:"cursor: pointer;"}).click(function() {
      void 0 != RepConv.ClipBoard && RepConvTool.insertBBcode(RepConv.ClipBoard, "", a.getJQElement().find(c)[0]);
    }).mousePopup(new MousePopup(RepConvTool.GetLabel("POPINSERTLASTREPORT")))));
  };
  this.loadPower = function() {
    RepConv.active.power && (RepConv.Debug && console.log("loadPower"), $.each($("div.gods_area .god_container div.new_ui_power_icon div[name=counter]"), function(a, b) {
      $(b).remove();
    }), $.each($("div.gods_area .god_container div.new_ui_power_icon.disabled"), function(a, b) {
      power = GameData.powers[$(b).attr("data-power_id")];
      god = MM.checkAndPublishRawModel("PlayerGods", {id:Game.player_id}).getCurrentProductionOverview()[power.god_id];
      _godCurr = MM.checkAndPublishRawModel("PlayerGods", {id:Game.player_id})[power.god_id + "_favor_delta_property"].calculateCurrentValue().unprocessedCurrentValue;
      marg = 27;
      $(b).append($("<div/>", {style:"margin-top:" + marg + "px;color:white;text-shadow: 1px 1px 1px black;font-size:7px;z-index:3000;", name:"counter"}).countdown(Timestamp.server() + (power.favor - _godCurr) / god.production * 3600));
    }));
  };
  this.BBC2HTML = function(a) {
    function b(a) {
      return a.replace(t, m);
    }
    function c(a, b) {
      for (var c in b) {
        a = a.replace(new RegExp(c, "g"), b[c]);
      }
      return a;
    }
    function e(a) {
      a = a.replace('"', "").split(",");
      var b = "";
      $.each(a, function(a, c) {
        y = c.split(":");
        b += " " + y[0] + '="' + y[1] + '"';
      });
      return b;
    }
    function m(a, c, k, l) {
      l && -1 < l.indexOf("[") && (l = b(l));
      switch(c) {
        case "url":
        ;
        case "anchor":
        ;
        case "email":
          return "<a " + v[c] + (k || l) + '">' + l + "</a>";
        case "img":
          return a = A.exec(k), '<img src="' + l + '"' + (a ? ' width="' + a[1] + '" height="' + a[2] + '"' : "") + ' alt="' + (a ? "" : k) + '" />';
        case "flash":
        ;
        case "youtube":
          return a = A.exec(k) || [0, 425, 366], '<object type="application/x-shockwave-flash" data="' + D[c] + l + '" width="' + a[1] + '" height="' + a[2] + '"><param name="movie" value="' + D[c] + l + '" /></object>';
        case "float":
          return '<span style="float: ' + k + '">' + l + "</span>";
        case "left":
        ;
        case "right":
        ;
        case "center":
        ;
        case "justify":
          return '<div style="text-align: ' + c + '">' + l + "</div>";
        case "google":
        ;
        case "wikipedia":
          return '<a href="' + x[c] + l + '">' + l + "</a>";
        case "b":
        ;
        case "i":
        ;
        case "u":
        ;
        case "s":
        ;
        case "sup":
        ;
        case "sub":
        ;
        case "h1":
        ;
        case "h2":
        ;
        case "h3":
        ;
        case "h4":
        ;
        case "h5":
        ;
        case "h6":
        ;
        case "table":
        ;
        case "tr":
        ;
        case "th":
        ;
        case "td":
          return a = "", void 0 != k && (a = e(k)), "<" + c + a + ">" + l + "</" + c + ">";
        case "row":
        ;
        case "r":
        ;
        case "header":
        ;
        case "head":
        ;
        case "h":
        ;
        case "col":
        ;
        case "c":
          return "<" + E[c] + ">" + l + "</" + E[c] + ">";
        case "acronym":
        ;
        case "abbr":
          return "<" + c + ' title="' + k + '">' + l + "</" + c + ">";
      }
      return "[" + c + (k ? "=" + k : "") + "]" + l + "[/" + c + "]";
    }
    if (0 > a.indexOf("[")) {
      return a;
    }
    var t = /\[([a-z][a-z0-9]*)(?:=([^\]]+))?]((?:.|[\r\n])*?)\[\/\1]/g, A = RegExp("^(\\d+)x(\\d+)$", void 0), v = {url:'href="', anchor:'name="', email:'href="mailto: '}, x = {google:"http://www.google.com/search?q=", wikipedia:"http://www.wikipedia.org/wiki/"}, D = {youtube:"http://www.youtube.com/v/", flash:""}, E = {row:"tr", r:"tr", header:"th", head:"th", h:"th", col:"td", c:"td"}, C = {notag:[{"\\[":"&#91;", "]":"&#93;"}, "", ""], code:[{"<":"&lt;"}, "<code><pre>", "</pre></code>"]};
    C.php = [C.code[0], C.code[1] + "&lt;?php ", "?>" + C.code[2]];
    var I = {font:"font-family:$1", size:"font-size:$1px", color:"color:$1"}, q = {c:"circle", d:"disc", s:"square", 1:"decimal", a:"lower-alpha", A:"upper-alpha", i:"lower-roman", I:"upper-roman"}, u = {}, z = {}, w;
    for (w in C) {
      u["\\[(" + w + ")]((?:.|[\r\n])*?)\\[/\\1]"] = function(a, b, e) {
        return C[b][1] + c(e, C[b][0]) + C[b][2];
      };
    }
    for (w in I) {
      z["\\[" + w + "=([^\\]]+)]"] = '<span style="' + I[w] + '">', z["\\[/" + w + "]"] = "</span>";
    }
    z["\\[list]"] = "<ul>";
    z["\\[list=(\\w)]"] = function(a, b) {
      return '<ul style="list-style-type: ' + (q[b] || "disc") + '">';
    };
    z["\\[/list]"] = "</ul>";
    z["\\[\\*]"] = "<li>";
    z["\\[quote(?:=([^\\]]+))?]"] = function(a, b) {
      return '<div class="bb-quote">' + (b ? b + " wrote" : "Quote") + ":<blockquote>";
    };
    z["\\[/quote]"] = "</blockquote></div>";
    z["\\[(hr|br)]"] = "<$1 />";
    z["\\[sp]"] = "&nbsp;";
    return b(c(c(a, u), z));
  };
  this.addLine = function(a) {
    return "[img]" + RepConv.Const.unitImg + a + ".png[/img]";
  };
  this.Atob = function(a) {
    a = a.split(/#/);
    return atob(a[1] || a[0]);
  };
  this.getCaller = function(a) {
    a = a.substr(9);
    return a = a.substr(0, a.indexOf("("));
  };
  $("<iframe/>", {id:"GRCSender", name:"GRCSender", style:"display:none"}).appendTo($("body"));
}
function _GRCRTRepConvRadarV2() {
  function e() {
    u = [];
    z = {};
    w = [];
    B = MM.getModels().Town[Game.townId];
    h = B.get("island_x");
    k = B.get("island_y");
    l = WMap.toChunk(h, k).chunk;
    R[Game.townId] = R[Game.townId] || {};
    ca = GameData.units.colonize_ship.speed * (1 + (MM.getModels().Town[Game.townId].getResearches().get("cartography") ? GameData.research_bonus.cartography_speed : 0) + (MM.getModels().Town[Game.townId].getResearches().get("set_sail") ? GameData.research_bonus.colony_ship_speed : 0));
    setTimeout(function() {
      b();
    }, 500);
  }
  function a(a, b) {
    a = a.replace("#", "");
    var c = parseInt(a.substring(0, 2), 16), e = parseInt(a.substring(2, 4), 16), g = parseInt(a.substring(4, 6), 16);
    return "rgba(" + c + "," + e + "," + g + "," + b / 100 + ")";
  }
  function b() {
    for (var a = [], b = !1, c = l.x - H;c <= l.x + H;c++) {
      for (var e = l.y - H;e <= l.y + H;e++) {
        try {
          RepConv.Debug && console.log("G:" + c + ":" + e + " - " + WMap.mapData.getChunk(c, e).chunk.timestamp), RepConv.Debug && console.log("D:" + c + ":" + e + " - " + P[c + "_" + e].timestamp), b = WMap.mapData.getChunk(c, e).chunk.timestamp > P[c + "_" + e].timestamp;
        } catch (g) {
          b = !0;
        }
        RepConv.Debug && console.log("wmapChanged:" + b);
        (!P[c + "_" + e] || P[c + "_" + e].timestamp + 6E4 < Timestamp.server() || b) && a.push({x:c, y:e, timestamp:0});
        10 < a.length && (a = {chunks:a}, WMap.ajaxloader.ajaxGet("map_data", "get_chunks", a, !0, function(a, b) {
          $.each(a.data, function(a, b) {
            P[b.chunk.x + "_" + b.chunk.y] = {timestamp:b.chunk.timestamp, towns:b.towns};
          });
        }), a = []);
      }
    }
    0 < a.length && (a = {chunks:a}, WMap.ajaxloader.ajaxGet("map_data", "get_chunks", a, !0, function(a, b) {
      $.each(a.data, function(a, b) {
        P[b.chunk.x + "_" + b.chunk.y] = {timestamp:b.chunk.timestamp, towns:b.towns};
      });
    }));
  }
  function c() {
    0 == Object.size(R[Game.townId]) && $.each(P, function(a, b) {
      $.each(b.towns, function(a, b) {
        "town" == da(b) && (R[Game.townId][b.id] = b);
      });
    });
    return R[Game.townId];
  }
  function g(a) {
    if ("town" != da(a)) {
      return null;
    }
    var b = {id:a.id, ix:a.x, iy:a.y, abs_x:0, abs_y:0, name:a.name, player_id:a.player_id, player_name:a.player_name, alliance_id:a.alliance_id, alliance_name:a.alliance_name, points:a.points, reservation:a.reservation, href:"#" + btoa(JSON.stringify({id:parseInt(a.id), ix:a.x, iy:a.y, tp:null !== a.player_id ? "town" : "ghost_town", name:a.name}).replace(/[\u007f-\uffff]/g, function(a) {
      return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
    })), flag_type:a.flag_type, fc:a.fc};
    a.id += "";
    a.id = a.id.replace("=", "");
    var c = require("map/helpers").map2Pixel(a.x, a.y), e = require("map/helpers").getTownType(a), g = e + "_" + a.id, h = MapTiles.tOffset[a.dir] || MapTiles.ftOffset, f = MapTiles.cssOffset.x + c.x + a.ox, c = MapTiles.cssOffset.y + c.y + a.oy;
    h && (f += h.x, c += h.y);
    h = MapTiles.d.createElement("a");
    (h.className = "tile", h.href = "#" + btoa('{"id":"' + a.id + '","ix":' + a.x + ',"iy":' + a.y + ',"tp":"' + e + '"' + ("free" === e ? (a.invitation_spot ? ',"inv_spo":true' : "") + ',"nr":' + a.nr : "") + (void 0 !== a.player_town_id && null !== a.player_town_id ? ',"player_town_id":' + a.player_town_id : "") + (void 0 !== a.nr && null !== a.nr ? ',"number_on_island":' + a.nr : "") + "}"), "farm_town" === e) ? (a = MapTiles.d.createElement("div"), a.className = "tile", a.appendChild(h), a.style.left = 
    f + "px", a.style.top = c + "px", a.id = g) : (b.abs_x = f, b.abs_y = c, h.id = g);
    return b;
  }
  function m() {
    null != p ? t() : null != J ? A() : "RGHOST" != N.getValue() ? v() : x();
    return !0;
  }
  function t() {
    u = [];
    $.each(c(), function(a, b) {
      var c = g(b);
      null != c && c.player_id == p.id && u.push(c);
    });
  }
  function A() {
    u = [];
    $.each(c(), function(a, b) {
      var c = g(b);
      null != c && c.alliance_id == J.id && u.push(c);
    });
  }
  function v() {
    u = [];
    $.each(c(), function(a, b) {
      var c = g(b);
      null != c && c.player_id != Game.player_id && u.push(c);
    });
  }
  function x() {
    u = [];
    $.each(c(), function(a, b) {
      var c = g(b);
      null != c && null == c.player_id && u.push(c);
    });
  }
  function D() {
    var a = 900 / Game.game_speed, b = Game.townId, c = MM.getModels().Town[b];
    z = {};
    w = [];
    $.each(u, function(b, e) {
      var f = $.toe.calc.getDistance({x:c.get("abs_x"), y:c.get("abs_y")}, {x:e.abs_x, y:e.abs_y});
      void 0 == z[f] && (z[f] = {time:0, towns:[]}, w.push(f));
      z[f].towns.push(e);
      z[f].timeInSec = Math.round(50 * f / ca) + a;
      z[f].time = DateHelper.readableSeconds(z[f].timeInSec);
    });
    var e;
    do {
      for (e = !1, b = 0;b < w.length - 1;b++) {
        w[b] > w[b + 1] && (e = w[b], w[b] = w[b + 1], w[b + 1] = e, e = !0);
      }
    } while (e);
    return !0;
  }
  function E() {
    function b(a) {
      if (!a.reservation) {
        return "";
      }
      if ("added" === a.reservation.state) {
        return "ally" === a.reservation.type ? c.can_reserve : c.reserved_by_alliance;
      }
      if ("reserved" === a.reservation.state) {
        var e = '<span class="reservation_tool icon small ' + a.reservation.state + " " + a.reservation.type + '"></span>';
        return "own" === a.reservation.type ? e + c.reserved_for_you : "ally" === a.reservation.type ? e + c.reserved_for(a.reservation.player_link) : e + c.reserved_for_alliance(a.reservation.player_link, a.reservation.alliance_link);
      }
    }
    var c = DM.getl10n("map");
    $("#grcrt_radar_result").html("").append($("<div/>", {"class":"game_header bold", style:"height:18px;"}).append($("<div/>", {"class":"grcrt_rr_town", style:"float:left;"}).html(RepConvTool.GetLabel("RADAR.TOWNNAME"))).append($("<div/>", {"class":"grcrt_rr_cs_time", style:"float:left;"}).html("&nbsp;")).append($("<div/>", {"class":"grcrt_rr_player", style:"float:left;"}).html(RepConvTool.GetLabel("RADAR.TOWNOWNER"))).append($("<div/>", {"class":"grcrt_rr_player", style:"float:left;"}).html(RepConvTool.GetLabel("RADAR.TOWNRESERVED")))).append($("<div/>", 
    {style:"min-height: 350px; max-height: 350px; overflow-y: scroll; overflow-x: hidden; border: 1px solid grey;"}).append($("<ul/>", {"class":"game_list"})));
    var e = 0, g;
    $.each(w, function(h, k) {
      Y.getTimeValueAsSeconds() >= z[k].timeInSec && $.each(z[k].towns, function(f, h) {
        V.getValue() <= h.points && (parseFloat(RepConvGRC.idle.JSON[h.player_id]) >= ea.getValue() && (null != p || null != J || "RGHOST" != N.getValue()) || N && "RGHOST" == N.getValue()) && (g = null == h.player_id ? DM.getl10n("common", "ghost_town") : '<img src="' + Game.img() + '/game/icons/player.png" />' + hCommon.player(btoa(JSON.stringify({name:h.player_name, id:h.player_id}).replace(/[\u007f-\uffff]/g, function(a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        })), h.player_name, h.player_id), g += void 0 == h.alliance_id ? "" : '<br/><img src="' + Game.img() + '/game/icons/ally.png" />' + hCommon.alliance("n", h.alliance_name, h.alliance_id), $("#grcrt_radar_result ul").append($("<li/>", {"class":++e % 2 ? "even" : "odd"}).append($("<div/>", {"class":"grcrt_rr_town"}).append($("<a/>", {"class":"gp_town_link", href:h.href}).html(h.name)).append($("<br/>")).append($("<span/>", {"class":""}).html('<img src="' + Game.img() + '/game/icons/points.png" /> ' + 
        c.points(h.points))).css("border-left", "5px solid #" + (h.fc || "f00")).css("background-color", a(h.fc || "f00", 10))).append($("<div/>", {"class":"grcrt_rr_cs_time"}).html("~" + z[k].time)).append($("<div/>", {"class":"player_name grcrt_rr_player"}).html(g)).append($("<div/>", {"class":"player_name grcrt_rr_player"}).html(b(h))).append($("<br/>", {style:"clear:both"}))));
      });
    });
  }
  function C() {
    return null != p ? '<img src="' + Game.img() + '/game/icons/player.png" />' + hCommon.player(btoa(JSON.stringify({name:p.name, id:p.id}).replace(/[\u007f-\uffff]/g, function(a) {
      return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
    })), p.name, p.id) : null != J ? '<img src="' + Game.img() + '/game/icons/ally.png" />' + hCommon.alliance("n", J.name, J.id) : N = $("<div/>", {"class":"radiobutton", id:"grcrt_rghost"}).radiobutton({value:"RGHOST", template:"tpl_radiobutton", options:[{value:"RGHOST", name:DM.getl10n("common", "ghost_town")}, {value:"RALL", name:RepConvTool.GetLabel("RADAR.ALL")}]});
  }
  function I() {
    return $("<div/>").append($("<div/>", {style:"float: left; padding: 3px 5px; margin: 2px;"}).append($("<span/>").html(RepConvTool.GetLabel("RADAR.FIND") + ": ")).append(C())).append($("<div/>", {style:"float:right; margin: 5px 10px 0 0"}).append(RepConvTool.AddBtn("RADAR.BTNSAVEDEFAULT").click(function() {
      try {
        Q = Y.getValue(), M = V.getValue(), RepConvTool.setItem(RepConv.Cookie + "radar_cs", Q), RepConvTool.setItem(RepConv.Cookie + "radar_points", M), setTimeout(function() {
          HumanMessage.success(RepConvTool.GetLabel("MSGHUMAN.OK"));
        }, 0);
      } catch (a) {
        RepConv.Debug && console.log(RepConvTool.getCaller(arguments.callee.toString())), setTimeout(function() {
          HumanMessage.error(RepConvTool.GetLabel("MSGHUMAN.ERROR"));
        }, 0);
      }
    })).append(ka.click(function() {
      $.Observer(GameEvents.grcrt.radar.find_btn).publish();
    }))).append($("<br/>", {style:"clear:both"})).append($("<div/>", {style:"float: left; padding: 3px 5px; margin: 2px;"}).html(RepConvTool.GetLabel("RADAR.MAXCSTIME"))).append($("<div/>", {id:"grcrt_cs_time", "class":"spinner", style:"width: 65px; float: left; margin: 2px;"})).append($("<div/>", {style:"float: left; padding: 3px 5px; margin: 2px;"}).html(RepConvTool.GetLabel("RADAR.TOWNPOINTS"))).append($("<div/>", {id:"grcrt_town_points", "class":"spinner", style:"width: 65px; float: left; margin: 2px;"})).append($("<div/>", 
    {style:"float: left; padding: 3px 5px; margin: 2px;"}).html(RepConvTool.GetLabel("STATS.INACTIVE"))).append($("<div/>", {id:"grcrt_player_idle", "class":"spinner", style:"width: 40px; float: left; margin: 2px;"})).append($("<br/>", {style:"clear: both"})).append($("<div/>", {id:"grcrt_radar_result", style:"overflow: hidden;"}));
  }
  function q() {
    require("game/windows/ids").GRCRT_RADAR = "grcrt_radar";
    (function() {
      var a = window.GameControllers.TabController, b = a.extend({initialize:function() {
        RepConv.Debug && console.log("initialize");
        a.prototype.initialize.apply(this, arguments);
        Q = RepConvTool.getSettings(RepConv.Cookie + "radar_cs", "06:00:00");
        M = parseInt(RepConvTool.getSettings(RepConv.Cookie + "radar_points", 0));
        this._radarMode();
        this.registerListeners();
        this.render();
        this._setCurrentTown();
        this.registerViewComponents();
      }, unregisterListeners:function() {
        RepConv.Debug && console.log("initialize");
        $.Observer(GameEvents.town.town_switch).unsubscribe("GRCRT_Radar_town_town_switch");
        $.Observer(GameEvents.grcrt.radar.find_btn).unsubscribe("GRCRT_Radar_grcrt_radar_find_btn");
      }, registerListeners:function() {
        RepConv.Debug && console.log("registerListeners");
        $.Observer(GameEvents.town.town_switch).subscribe("GRCRT_Radar_town_town_switch", this._setCurrentTown.bind(this));
        $.Observer(GameEvents.grcrt.radar.find_btn).subscribe("GRCRT_Radar_grcrt_radar_find_btn", this._findTowns.bind(this));
      }, render:function() {
        RepConv.Debug && console.log("render");
        this.$el.html(I());
        Y = $("#grcrt_cs_time").spinner({value:Q, step:"00:30:00", max:"24:00:00", min:"00:00:00", type:"time"});
        V = $("#grcrt_town_points").spinner({value:M, step:500, max:18E3, min:0});
        ea = $("#grcrt_player_idle").spinner({value:0, step:1, max:999, min:0});
        return this;
      }, reRender:function() {
      }, registerViewComponents:function() {
        RepConv.Debug && console.log("registerViewComponents");
      }, unregisterViewComponents:function() {
        RepConv.Debug && console.log("unregisterViewComponents");
      }, destroy:function() {
        RepConv.Debug && console.log("destroy");
        this.unregisterViewComponents();
        this.unregisterListeners();
      }, _setCurrentTown:function() {
        var a = this.getWindowModel();
        this.getWindowModel().showLoading();
        setTimeout(function() {
          e();
          a.hideLoading();
        }, 10);
      }, _findTowns:function() {
        var a = this.getWindowModel();
        this.getWindowModel().showLoading();
        setTimeout(function() {
          $("#grcrt_radar_result").html("");
          m();
          D();
          E();
          a.hideLoading();
        }, 50);
      }, _radarMode:function() {
        try {
          var a = this.getWindowModel().getArguments();
          if (void 0 == a) {
            J = p = null;
          } else {
            if (void 0 != a.player) {
              p = {id:a.player.id, name:a.player.name}, J = null;
            } else {
              if (void 0 != a.alliance) {
                var b = a.alliance.id, c = a.alliance.name;
                p = null;
                J = {id:b, name:c};
              }
            }
          }
        } catch (e) {
          J = p = null;
        }
      }});
      window.GameViews.GrcRTView_grcrt_radar = b;
    })();
    (function() {
      var a = window.GameViews, b = window.WindowFactorySettings, c = require("game/windows/ids"), e = require("game/windows/tabs"), g = c.GRCRT_RADAR;
      b[g] = function(b) {
        b = b || {};
        return us.extend({window_type:g, minheight:490, maxheight:510, width:845, tabs:[{type:e.INDEX, title:"none", content_view_constructor:a.GrcRTView_grcrt_radar, hidden:!0}], max_instances:1, activepagenr:0, minimizable:!0, resizable:!1, title:RepConvTool.GetLabel("RADAR.TOWNFINDER")}, b);
      };
    })();
  }
  GameEvents.grcrt = GameEvents.grcrt || {};
  GameEvents.grcrt.radar = {find_btn:"grcrt:radar:find_btn"};
  WMap.getChunkSize();
  var u, z, w, B, h, k, l, p = null, J = null, Q, M, N, P = {}, H = Math.ceil(8.5 * GameData.units.colonize_ship.speed / WMap.getChunkSize()), da = (require("map/helpers") || WMap).getTownType, R = {}, ca, ka = RepConvTool.AddBtn("RADAR.BTNFIND"), Y, V, ea;
  this.setPlayer = function(a, b) {
    p = {id:a, name:b};
    J = null;
  };
  this.setAlly = function(a, b) {
    p = null;
    J = {id:a, name:b};
  };
  this.setGhost = function() {
    J = p = null;
  };
  this.setCurrentTown = function() {
    e();
  };
  this.getFirstTown = function() {
    m();
    D();
    return z[w[0]] || null;
  };
  this.windowOpen = function(a) {
    try {
      WM.getWindowByType("grcrt_radar")[0].close();
    } catch (b) {
    }
    WF.open("grcrt_radar", {args:a});
  };
  RepConv.menu.radar = {name:"RADAR.TOWNFINDER", action:"RepConvRadar.windowOpen();", "class":"radar"};
  $("head").append($("<style/>").append(".grcrt.radar { background-position: -77px -80px; cursor: pointer;}"));
  $("head").append($("<style/>").append(".grcrt_rr_town, .grcrt_rr_player {float: left; width: 240px; max-width: 240px;}").append(".grcrt_rr_points {float: left; width: 40px; text-align: right;}").append(".grcrt_rr_cs_time {float: left; width: 70px; text-align: right; margin-right: 5px;}").append(".grcrt_rr_town img, .grcrt_rr_player img {float: left;}"));
  RepConv.initArray.push("RepConvRadar.init()");
  RepConv.wndArray.push("grcrt_radar");
  this.init = function() {
    new q;
  };
}
function _GRCRTRepConvAO() {
  function e() {
    var a = $("<div/>", {"class":"grcrt_ao_scroll"}).width(q), b = $("<div/>").css({clear:"both", height:"40px", padding:"0", width:"100%", "border-bottom":"1px solid #000", background:"url(" + Game.img() + "/game/overviews/fixed_table_header_bg.jpg) repeat-x 0 0"}).append($("<div/>", {"class":"button_arrow left"}).css({position:"absolute", top:"10px", left:"170px"}).bind("click", function() {
      0 < $(".grcrt_ao_scroll").position().left ? $(".grcrt_ao_scroll").css({left:"0px"}) : 0 != $(".grcrt_ao_scroll").position().left ? $(".grcrt_ao_scroll").animate({left:"+=598px"}, 400) : $(".grcrt_ao_scroll").animate({left:"-=" + 598 * Math.floor(q / 600) + "px"}, 400);
    })).append($("<div/>").css({overflow:"hidden", position:"absolute", left:"190px"}).width(600).append(a)).append($("<div/>", {"class":"button_arrow right"}).css({position:"absolute", top:"10px", right:"15px"}).click(function() {
      $(".grcrt_ao_scroll").position().left < -598 * Math.floor(q / 600) || 0 < $(".grcrt_ao_scroll").position().left ? $(".grcrt_ao_scroll").css({left:"0px"}) : Math.ceil(Math.abs($(".grcrt_ao_scroll").position().left) / 600) == Math.floor(q / 600) ? $(".grcrt_ao_scroll").animate({left:"+=" + 598 * Math.floor(q / 600) + "px"}, 400) : $(".grcrt_ao_scroll").animate({left:"-=598px"}, 400);
    }));
    $.each(GameData.researches, function(b, c) {
      a.append($("<div/>", {"class":"grcrt_ao_unit unit research_icon research40x40 " + GameDataResearches.getResearchCssClass(b)}));
    });
    return b;
  }
  function a() {
    w = {};
    0 < Object.size(MM.getModels().ResearchOrder) && $.each(MM.getModels().ResearchOrder, function(a, b) {
      w[b.getTownId()] = w[b.getTownId()] || {};
      w[b.getTownId()][b.getType()] = b;
    });
  }
  function b(b) {
    z = b;
    var e = $("<ul/>").css({"overflow-y":"scroll", height:"485px"}).addClass("academy");
    b = $("<div/>").append(e);
    var k = !1, l = [];
    $.each(MM.getCollections().TownGroupTown[0].getTowns(MM.getCollections().TownGroup[0].getActiveGroupId()), function(a, b) {
      var c = MM.getModels().Town[b.getTownId()];
      l.push({id:c.id, name:c.getName()});
    });
    var p = !1;
    do {
      for (var p = !1, q = 0;q < l.length - 1;q++) {
        l[q].name > l[q + 1].name && (p = l[q], l[q] = l[q + 1], l[q + 1] = p, p = !0);
      }
    } while (p);
    $.each(l, function(b, l) {
      u.forEach(function(b) {
        if (l.id == b.id) {
          var p = $("<div/>", {"class":"grcrt_ao_scroll"}).css({display:"inline-block", position:"relative", left:"0px"}).width(46 * Object.size(GameData.researches)), q = $("<li/>", {"class":k ? "odd" : "even", style:"position: relative; min-height: 29px;"});
          a();
          var t = GameData.researches, u = b.getBuildings().getBuildingLevel("academy"), v = c(b.id), B = b.getResearches(), x = w && w[b.id] && Object.size(w[b.id]) == GameDataConstructionQueue.getResearchOrdersQueueLength() || !1;
          q.append($("<div/>", {"class":"grcrt_ao_ta grcrt_ao_town"}).append($("<a/>", {"class":"gp_town_link", href:b.getLinkFragment(), rel:b.id}).html(b.getName()))).append($("<div/>", {"class":"grcrt_ao_ta grcrt_ao_ap", id:"grcrt_ao_" + b.id}).html(v)).append($("<div/>").css({overflow:"hidden", position:"absolute", left:"184px", top:"3px"}).width(600).append(p));
          $.each(GameData.researches, function(a, c) {
            var e = t[a], h = B.hasResearch(a), k = w && w[b.id] && Object.size(w[b.id]) == GameDataConstructionQueue.getResearchOrdersQueueLength() || !1, l = g(b.id, a), q = m(b.id, a);
            p.append($("<div/>", {"class":"textbox tech_tree_box " + a, id:"grcrt_ao_" + b.id + "_" + a}).data("town", b.id).append(l).append(q).hover(function() {
              $(this).find($(".button_downgrade,.button_upgrade")).slideDown();
            }, function() {
              $(this).find($(".button_downgrade,.button_upgrade")).slideUp();
            }).tooltip(z || !z && !h && !k ? GrcRTAcademyTooltipFactory.getResearchTooltip(e, u, v, h, k, x, b.id) : AcademyTooltipFactory.getRevertTooltip(e, MM.checkAndPublishRawModel("Player", {id:Game.player_id}).getCulturalPoints())));
          });
          k = !k;
          e.append(q);
        }
      });
    });
    return b;
  }
  function c(b) {
    var c = MM.getCollections().Town[0].get(b), e = c.getBuildings().getBuildingLevel("academy") * GameDataResearches.getResearchPointsPerAcademyLevel() + c.getBuildings().getBuildingLevel("library") * GameDataResearches.getResearchPointsPerLibraryLevel();
    c.getResources();
    $.each(GameData.researches, function(a, b) {
      c.getResearches().get(a) && (e -= b.research_points);
    });
    a();
    0 < Object.size(w) && w[b] && $.each(w[b], function(a, b) {
      e -= GameData.researches[a].research_points;
    });
    RepConv.Debug && console.log(e);
    return e;
  }
  function g(a, b) {
    RepConv.Debug && console.log("wypelnienie dla town_id [" + a + "] => " + b);
    var c = u.get(a), e = c.getResearches().get(b), g;
    return GameData.researches[b].building_dependencies.academy <= c.getBuildings().getBuildingLevel("academy") ? w && w[c.id] && w[c.id][b] ? (c = w[c.id][b], c.getType() == b && (I[a + "_" + b] = $("<div/>", {"class":"single-progressbar instant_buy js-item-progressbar type_unit_queue"}).singleProgressbar({template:"tpl_pb_single_nomax", type:"time", reverse_progress:!0, liveprogress:!0, liveprogress_interval:1, value:c.getRealTimeLeft(), max:c.getDuration(), countdown:!0}).on("pb:cd:finish", function() {
      $(this).parent().html(D.html());
      this.destroy();
    }), g = I[a + "_" + b]), g || D.html()) : e ? D.html() : C.html() : E.html();
  }
  function m(b, e) {
    var k = u.get(b), l = k.getResearches().get(e), p;
    if (GameData.researches[e].building_dependencies.academy <= k.getBuildings().getBuildingLevel("academy")) {
      if (w && w[k.id] && w[k.id][e]) {
        return "";
      }
      !l && z ? p = $("<div/>", {"class":"btn_upgrade button_upgrade"}).hide().data("town_id", b).data("research", e).click(function() {
        var b = $(this).data("town_id"), e = $(this).data("research");
        RepConv.Debug && console.log(b + " => " + e);
        gpAjax.ajaxPost("frontend_bridge", "execute", {model_url:"ResearchOrder", action_name:"research", arguments:{id:e}, town_id:b}, !0, {success:function(h, k) {
          a();
          $("#grcrt_ao_" + b + "_" + e).html(g(b, e));
          $("#grcrt_ao_" + b).html(c(b));
        }, error:function(a, b) {
          RepConv.Debug && console.log(a);
          RepConv.Debug && console.log(b);
        }});
      }) : l && !z && (p = $("<div/>", {"class":"btn_downgrade button_downgrade"}).hide().data("town_id", b).data("research", e).click(function() {
        ConfirmationWindowFactory.openConfirmationResettingResearch(function(b) {
          var e = $(b).data("town_id"), h = $(b).data("research");
          RepConv.Debug && console.log("Potwierdzenie dla: " + e + " => " + h);
          gpAjax.ajaxPost("frontend_bridge", "execute", {model_url:"ResearchOrder", action_name:"revert", arguments:{id:h}, town_id:e}, !0, {success:function(b, k) {
            a();
            $("#grcrt_ao_" + e + "_" + h).html(g(e, h));
            $("#grcrt_ao_" + e).html(c(e));
          }, error:function(a, b) {
            RepConv.Debug && console.log(a);
            RepConv.Debug && console.log(b);
          }});
        }.bind(this, this));
      }));
    }
    return p;
  }
  function t() {
    var a = "";
    MM.getCollections().TownGroup[0].forEach(function(b) {
      b.getId() == MM.getCollections().TownGroup[0].getActiveGroupId() && (a = " (" + b.getName() + ")");
    });
    return a;
  }
  function A() {
    require("game/windows/ids").GRCRT_AO = "grcrt_ao";
    (function() {
      var a = window.GameControllers.TabController, c = $("<div/>", {id:"townsoverview"}), g = a.extend({initialize:function(b) {
        RepConv.Debug && console.time("initialize");
        a.prototype.initialize.apply(this, arguments);
        var e = this.getWindowModel();
        this.$el.html(c);
        e.hideLoading();
        e.getJQElement || (e.getJQElement = function() {
          return c;
        });
        e.appendContent || (e.appendContent = function(a) {
          return c.append(a);
        });
        e.setContent2 || (e.setContent2 = function(a) {
          return c.html(a);
        });
        this.bindEventListeners();
        RepConv.Debug && console.timeEnd("initialize");
      }, render:function() {
        this.reRender();
      }, reRender:function() {
        RepConv.Debug && console.time("reRender");
        var a = this.getWindowModel();
        this.getWindowModel().setTitle(GameData.buildings.academy.name + t());
        MM.getCollections().TownGroup[0].getTownGroups();
        this.getWindowModel().showLoading();
        setTimeout(function() {
          RepConv.Debug && console.time("fill");
          a.setContent2(e());
          a.appendContent(b(0 == a.getActivePageNr()));
          a.hideLoading();
          RepConv.Debug && console.timeEnd("fill");
        }, 100);
        RepConv.Debug && console.timeEnd("reRender");
      }, bindEventListeners:function() {
        this.$el.parents(".grcrt_ao").on("click", ".js-wnd-buttons .help", this._handleHelpButtonClickEvent.bind(this));
      }, _handleHelpButtonClickEvent:function() {
        var a = this.getWindowModel().getHelpButtonSettings();
        RepConvGRC.openGRCRT(a.action.tab, a.action.args);
      }});
      window.GameViews.GrcRTView_grcrt_ao = g;
    })();
    (function() {
      var a = window.GameViews, b = window.WindowFactorySettings, c = require("game/windows/ids"), e = require("game/windows/tabs"), g = c.GRCRT_AO;
      b[g] = function(b) {
        b = b || {};
        var h = DM.getl10n(c.ACADEMY);
        return us.extend({window_type:g, minheight:570, maxheight:580, width:822, tabs:[{type:e.RESEARCH, title:h.tabs[0], content_view_constructor:a.GrcRTView_grcrt_ao, hidden:!1}, {type:e.RESET, title:h.tabs[1], content_view_constructor:a.GrcRTView_grcrt_ao, hidden:!1}], max_instances:1, activepagenr:0, title:GameData.buildings.academy.name}, b);
      };
    })();
  }
  function v() {
    var a = DM.getl10n("tooltips", "academy");
    window.GrcRTAcademyTooltipFactory = {getResearchTooltip:function(b, c, e, g, m, q, t) {
      var u = "";
      if (u += '<div class="academy_popup">', u += "<h4>" + b.name + "</h4>", u += '<p style="width: 320px;">' + b.description + "</p>", g) {
        u += "<h5>" + a.already_researched + "</h5>";
      } else {
        if (m) {
          u += "<h5>" + a.in_progress + "</h5>";
        } else {
          var v, w, x = "";
          g = ITowns.getTown(t);
          m = g.resources();
          var z = g.getProduction(), A = 0, C = !0;
          g = !0;
          var E;
          t = GrcRTGameDataResearches.getResearchCosts(b, t);
          E = {wood:{amount:Math.floor(t.wood, 10)}, stone:{amount:Math.floor(t.stone, 10)}, iron:{amount:Math.floor(t.iron, 10)}, research_points:{amount:b.research_points}, time:{amount:GameDataResearches.getResearchTime(b, c)}};
          for (v in E) {
            if (E.hasOwnProperty(v)) {
              t = E[v];
              var D;
              D = v;
              D = '<img src="' + Game.img() + "/game/res/" + ("population" === D ? "pop" : D) + '.png" alt="' + a[D] + '" />';
              if (x += D, "research_points" === v && t.amount > e) {
                C = !1;
              }
              t.amount > m[v] && "time" !== v && "research_points" !== v && (g = !1, 0 < z[v]) && (w = parseInt(3600 * parseFloat((t.amount - m[v]) / z[v]), 10), w > A && 0 < w) && (A = w);
              "time" === v && (t.amount = DateHelper.readableSeconds(t.amount));
              x += "<span" + (t.amount > m[v] || "research_points" === v && !1 === C ? ' style="color:#B00"' : "") + ">" + t.amount + "</span>";
            }
          }
          e = A;
          u += x + "<br/>";
          b = b.building_dependencies;
          c < b.academy && (u += "<h5>" + a.building_dependencies + "</h5>", u += '<span class="requirement">' + GameData.buildings.academy.name + " " + b.academy + "</span><br />");
          g || (u += '<span class="requirement">' + a.not_enough_resources + '</span><br /><span class="requirement">' + s(a.enough_resources_in, DateHelper.formatDateTimeNice(Timestamp.server() + e, !1)) + "</span><br />");
          q && (u += '<span class="requirement">' + a.full_queue + "</span><br />");
        }
      }
      return u + "</div>";
    }};
  }
  function x(a) {
    var b = $.extend({}, GameDataResearches, {getResearchCostsById:function(a, b) {
      return this.getResearchCosts(GameData.researches[a], b);
    }, getResearchCosts:function(a, b) {
      MM.getCollections().PlayerHero[0] || MM.createBackboneObjects({PlayerHeroes:null}, window.GameCollections, {});
      var c, e;
      return c = a.resources, e = GeneralModifications.getResearchResourcesModification(b), {wood:Math.ceil(c.wood * e), stone:Math.ceil(c.stone * e), iron:Math.ceil(c.iron * e)};
    }});
    a.GrcRTGameDataResearches = b;
  }
  var D = $("<div/>").append($("<div/>", {"class":"grcrt_ao_bl"})).append($("<div/>", {"class":"grcrt_ao_green"})).append($("<div/>", {"class":"grcrt_ao_br"})), E = $("<div/>").append($("<div/>", {"class":"grcrt_ao_bl"})).append($("<div/>", {"class":"grcrt_ao_gray"})).append($("<div/>", {"class":"grcrt_ao_br"})), C = $("<div/>").append($("<div/>", {"class":"grcrt_ao_bl"})).append($("<div/>", {"class":"grcrt_ao_red"})).append($("<div/>", {"class":"grcrt_ao_br"})), I = {}, q = 46 * Object.size(GameData.researches), 
  u = MM.getCollections().Town[0], z = !0, w = {};
  RepConv.menu.academy_overview = {name:"AO.TITLE", action:"RepConvAO.windowOpen();", "class":"aom"};
  $("head").append($("<style/>").append(".grcrt.ao { background-position: -77px -80px; cursor: pointer;}").append(".grcrt_ao_unit { margin: 0 3px !important;}").append(".grcrt_ao_scroll {display: inline-block; position: relative; left: 0px;}").append(".grcrt_ao_scroll .textbox {margin: 0px 3px; width: 40px; float: left;}").append(".grcrt_ao_bl, .grcrt_ao_br, .grcrt_ao_green, .grcrt_ao_gray, .grcrt_ao_red {float: left; height: 24px; background: url(" + Game.img() + "/game/survey/survey_sprite.png) no-repeat scroll 0px -39px;}\n.grcrt_ao_bl, .grcrt_ao_br {width: 2px;}\n.grcrt_ao_green, .grcrt_ao_gray, .grcrt_ao_red {width: 36px;}\n.grcrt_ao_bl {background-position: 0px -39px;}\n.grcrt_ao_br {background-position: -360px -39px;}\n.grcrt_ao_green {background-position: -321px -39px;}\n.grcrt_ao_gray {background: gray;}\n.grcrt_ao_red {background-position: -2px -39px;}\n.grcrt_ao_ta {font-size: 10px; float:left; padding-top: 8px; }\n.grcrt_ao_town {width: 130px; max-width:130px; padding-left: 5px;}\n.grcrt_ao_ap {width: 40px; max-width:40px; text-align: right; background: url(" + 
  Game.img() + "/game/academy/points_25x25.png) no-repeat;}\n.grcrt_ao .single-progressbar .curr { font-size: 8px;}\n.grcrt_ao .button_upgrade, .grcrt_ao .button_downgrade {bottom: 1px !important; right: 1px !important;}\n.grcrt.aom {background: url(" + Game.img() + "/game/academy/points_25x25.png) no-repeat;top: 4px !important; left: 4px !important;}\n"));
  this.windowOpen = function() {
    try {
      WM.getWindowByType("grcrt_ao")[0].close();
    } catch (a) {
    }
    WF.open("grcrt_ao");
  };
  RepConv.initArray.push("RepConvAO.init()");
  RepConv.wndArray.push("grcrt_ao");
  this.init = function() {
    u = MM.getCollections().Town[0];
    q = 46 * Object.size(GameData.researches);
    new x(window);
    new v;
    new A;
  };
}
function _GRCRTRepConvRecipes() {
  function e() {
    require("game/windows/ids").GRCRT_RECIPES = "grcrt_recipes";
    (function() {
      var a = window.GameControllers.TabController.extend({render:function() {
        this.getWindowModel().showLoading();
        this.$el.html($("<div/>").append($("<iframe/>", {src:this.whatLoading(), style:"width: 815px; height: 430px; border: 0px; float: left;"}).bind("load", function() {
          WM.getWindowByType("grcrt_recipes")[0].hideLoading();
        })));
      }, whatLoading:function() {
        var a = this.getWindowModel().getArguments(), c = RepConv.getUrlForWebsite(this.getWindowModel().getActivePage().getType());
        null != a && this.getWindowModel().getActivePage().getType() == a.page && (a = a.hash, this.getWindowModel().setArguments(null), c = RepConv.getUrlForWebsite(this.getWindowModel().getActivePage().getType(), a));
        return c;
      }});
      window.GameViews.GrcRTViewEx_grcrt_recipes = a;
    })();
    (function() {
      var a = window.GameControllers.TabController.extend({render:function() {
        this.$el.html(RepConvGRC.settings());
        this.getWindowModel().hideLoading();
      }});
      window.GameViews.GrcRTViewS_grcrt_recipes = a;
    })();
    (function() {
      var a = window.GameControllers.TabController.extend({render:function() {
        this.$el.html(RepConvTranslations.table());
        this.getWindowModel().hideLoading();
      }});
      window.GameViews.GrcRTViewT_grcrt_recipes = a;
    })();
    (function() {
      var a = window.GameViews, b = window.WindowFactorySettings, c = require("game/windows/ids");
      require("game/windows/tabs");
      var e = c.GRCRT_RECIPES;
      b[e] = function(b) {
        b = b || {};
        return us.extend({window_type:e, minheight:475, maxheight:485, width:830, tabs:[{type:"recipes", title:DM.getl10n("easter").window_title + ": " + DM.getl10n("easter").alchemy.btn_recipe, content_view_constructor:a.GrcRTViewEx_grcrt_recipes, hidden:!1}], max_instances:1, activepagenr:0, minimizable:!0, resizable:!1, title:RepConv.Scripts_nameS + "  ver." + RepConv.Scripts_version}, b);
      };
    })();
  }
  RepConv.menu.recipes = {name:DM.getl10n("easter").alchemy.btn_recipe, action:"RepConvRecipes.windowOpen();", "class":"recip", id:"grcrt_recipes"};
  RepConv.initArray.push("RepConvRecipes.init()");
  RepConv.wndArray.push("grcrt_recipes");
  $("head").append($("<style/>").append(".grcrt.recip { background:url(" + RepConv.grcrt_cdn + "ui/recipes.png) -2px -2px no-repeat; cursor: pointer;}"));
  this.windowOpen = function() {
    window.open("http://www.grcrt.net/module/recipes/" + Game.locale_lang, "_blank").focus();
  };
  this.init = function() {
    new e;
    0 == $("#happening_large_icon.easter").length && $("#grcrt_recipes").hide();
  };
}
function _GRCRTUpdater() {
  this.checkTime = 9E5;
  this.reload = this.checked = !1;
  this.checkUpdate = function() {
    this.checked ? this.reload && RepConvNotifications.addNotification(NotificationType.GRCRTRELOAD) : $.ajax({type:"GET", url:RepConv.Scripts_check_path + "checkVersion.php", dataType:"script", async:!0, complete:function() {
      (RepConv.asv || RepConv.Scripts_version) != RepConv.Scripts_version && ("undefined" == typeof GRCRTools && "undefined" == typeof GRCRTLoader ? RepConvNotifications.addNotification(NotificationType.GRCRTNEWVERSION) : (RepConvUpdater.reload = !0, RepConvNotifications.addNotification(NotificationType.GRCRTRELOAD)));
    }});
  };
  void 0 == RepConv.updateInterval && (RepConv.updateInterval = setInterval(function() {
    RepConvUpdater.checkUpdate();
  }, this.checkTime));
}
function _GRCRTNotifications() {
  this.version = "2.0";
  NotificationType.GRCRT = "grcrt";
  NotificationType.GRCRTNEWVERSION = "grcrtnewversion";
  NotificationType.GRCRTWHATSNEW = "grcrtwhatsnew";
  NotificationType.GRCRTRELOAD = "grcrtreload";
  $("head").append($("<style/>").append("#notification_area ." + NotificationType.GRCRT + " .icon, #notification_area ." + NotificationType.GRCRTNEWVERSION + " .icon, #notification_area ." + NotificationType.GRCRTWHATSNEW + " .icon, #notification_area ." + NotificationType.GRCRTRELOAD + " .icon { background: url(" + RepConv.grcrt_cdn + "img/octopus.png) 4px 7px no-repeat !important; cursor: pointer;}"));
  $.Observer(GameEvents.notification.push).subscribe("GRCRT_Notif_notification_push", function() {
    RepConvNotifications.addOnClick();
  });
  $.Observer(GameEvents.notification.del_all).subscribe("GRCRT_Notif_notification_del_all", function() {
    RepConvUpdater.checked = !1;
  });
  $.Observer(GameEvents.notification.del).subscribe("GRCRT_Notif_notification_del", function() {
    RepConvNotifications.addOnClick();
  });
  $.Observer(GameEvents.window.open).unsubscribe("GRCRT_Notif_window_open");
  $.Observer(GameEvents.window.open).subscribe("GRCRT_Notif_window_open", function() {
    if (1 == GPWindowMgr.getOpenedWindows().length && GPWindowMgr.getOpenedWindows()[0].getType() == GPWindowMgr.TYPE_CONFIRM_DIALOG && $(".ui-widget-overlay").prev().hasClass("ui-dialog")) {
      var e = $(".ui-widget-overlay").prev();
      $(".ui-widget-overlay").insertBefore(e);
    }
  });
  this.addOnClick = function() {
    $.each($("#notification_area>.notification." + NotificationType.GRCRTNEWVERSION), function(e, a) {
      $(a).unbind("click");
      $(a).bind("click", function() {
        $(this).find($("a.close")).click();
        Layout.showConfirmDialog("GRCRTools new version", '<div><img src="' + RepConv.grcrt_cdn + 'img/octopus.png" style="float:left;padding-right: 10px"/><p style="padding:5px">' + RepConvTool.GetLabel("NEWVERSION.AVAILABLE") + ": <b>" + RepConv.asv + "</b></p></div>", function() {
          if ("undefined" == typeof GRCRTExtension) {
            try {
              location.href = RepConv.Scripts_update_path + "GrepolisReportConverterV2.user.js";
            } catch (a) {
            }
            RepConvUpdater.reload = !0;
            RepConvNotifications.addNotification(NotificationType.GRCRTRELOAD);
          } else {
            "undefined" != typeof GRCRTExtension ? GRCRTExtension.getJSFile() && (RepConvUpdater.reload = !0, RepConvNotifications.addNotification(NotificationType.GRCRTRELOAD)) : browser.safari && (RepConvUpdater.reload = !0, RepConvNotifications.addNotification(NotificationType.GRCRTRELOAD));
          }
        }, RepConvTool.GetLabel("NEWVERSION.INSTALL"), function() {
          RepConvUpdater.checked = !1;
        }, RepConvTool.GetLabel("NEWVERSION.REMINDER"));
      });
    });
    $.each($("#notification_area>.notification." + NotificationType.GRCRTWHATSNEW), function(e, a) {
      $(a).unbind("click");
      $(a).bind("click", function() {
        $(this).find($("a.close")).click();
        RepConvGRC.openGRCRT("HELPTAB3");
      });
    });
    $.each($("#notification_area>.notification." + NotificationType.GRCRTRELOAD), function(e, a) {
      $(a).unbind("click");
      $(a).bind("click", function() {
        $(this).find($("a.close")).click();
        RepConvUpdater.reload = !1;
        Layout.showConfirmDialog("GRCRTools new version", '<div><img src="' + RepConv.grcrt_cdn + 'img/octopus.png" style="float:left;padding-right: 10px"/><p style="padding:5px">' + RepConvTool.GetLabel("NEWVERSION.REQRELOAD") + "</b></p></div>", function() {
          location.reload();
        }, RepConvTool.GetLabel("NEWVERSION.RELOAD"), function() {
          RepConvUpdater.reload = !0;
        }, RepConvTool.GetLabel("NEWVERSION.REMINDER"));
      });
    });
  };
  this.addNotification = function(e) {
    if (7 < $("#notification_area>.notification").length) {
      setTimeout(function() {
        RepConvNotifications.addNotification(e);
      }, 1E4);
    } else {
      switch(e) {
        case NotificationType.GRCRTNEWVERSION:
          0 == $("#notification_area ." + e).length && (this.checked = !0, createNotification(e, RepConvTool.GetLabel("NEWVERSION.AVAILABLE")));
          break;
        case NotificationType.GRCRTWHATSNEW:
          0 == $("#notification_area ." + e).length && (createNotification(e, RepConvTool.GetLabel("HELPTAB3")), RepConvTool.setItem(RepConv.CookieNew, RepConv.Scripts_version));
          break;
        case NotificationType.GRCRTRELOAD:
          0 == $("#notification_area ." + e).length && createNotification(e, RepConvTool.GetLabel("NEWVERSION.REQRELOAD"));
      }
    }
  };
  createNotification = function(e, a) {
    ("undefined" == typeof Layout.notify ? new NotificationHandler : Layout).notify($("#notification_area>.notification").length + 1, e, "<span><b>" + RepConv.Scripts_name + "</b></span>" + a + "<span class='small notification_date'>" + RepConv.Scripts_nameS + " " + RepConv.Scripts_version + " [" + RepConv.LangEnv + "]</span>");
  };
}
function _GRCRTMain() {
  this.Scripts_update_path = this.Scripts_check_path = "https://www.grcrt.net/scripts/";
  this.Scripts_name = "Grepolis Report Converter Revolution Tools";
  this.Scripts_nameS = "GRCRTools";
  this.Scripts_url = "https://www.grcrt.net/";
  this.Scripts_link = "[url=" + this.Scripts_url + "]" + this.Scripts_name + "[/url]";
  this.securityData = "";
  this.Scripts_version = "3.5.6";
  this.grcrt_domain = "https://www.grcrt.net/";
  this.grcrt_cdn = "https://cdn.grcrt.net/";
  this.Const = {IdWindowName:"repConvWindow", IdWindowHelp:"repConvWindowHelp", IdWindowView:"repConvWindowView", IdWindowClone:"repConvClone", IdParent:"#report_report", footer:this.Scripts_link + " - ver. " + this.Scripts_version + " created by Potusek & Anpu", staticImg:this.Scripts_url + "img/", morale:"morale.png", luck:"luck.png", oldwall:"oldwall.png", nightbonus:"nightbonus.png", unitImg:this.Scripts_url + "static/", uiImg:this.Scripts_url + "ui/", wood:this.grcrt_cdn + "ui/3/wood.png", stone:this.grcrt_cdn + 
  "ui/3/stone.png", iron:this.grcrt_cdn + "ui/3/iron.png", bunt:this.grcrt_cdn + "ui/c/revolt_arising.png", bunt2:this.grcrt_cdn + "ui/c/revolt_running.png", dataUrl:this.Scripts_url + "data/stats.php", dataDetailUrl:this.Scripts_url + "data/statsdetail.php", langUrl:this.Scripts_url + "scripts/", textareastyle:"width:805px; height:219px; font-size : 75%;", defAlarm:this.grcrt_cdn + "ui/s/alarm.mp3", defMute:this.grcrt_cdn + "ui/s/car_lock.mp3", defAlarmM:this.grcrt_cdn + "ui/s/alarm", defMuteM:this.grcrt_cdn + 
  "ui/s/car_lock"};
  this.LangLoaded = this.Debug = !1;
  this.StoreLoaded = !0;
  this.LangEnv = "en";
  this.LangAvailable = {pl:"PL", en:"EN", de:"DE", ro:"RO", fr:"FR", es:"ES", nl:"NL", it:"IT", cs:"CS", cz:"CS"};
  this.Lang = {};
  this.HelpTabs = {};
  this.RepType = "";
  this.menu = {about:{name:"HELPTAB1", action:"RepConvGRC.openGRCRT('HELPTAB1')"}};
  this.initArray = [];
  this.wndArray = [];
  "undefined" == typeof String.prototype.RCFormat && (String.prototype.RCFormat = function() {
    var e = arguments;
    return this.replace(/\{(\d+)\}/g, function(a, b) {
      return e[b];
    });
  });
  "undefined" == typeof String.prototype.stripTags && (String.prototype.stripTags = function() {
    tags = this;
    return stripped = tags.replace(/<\/?[^>]+>/gi, "");
  });
  "undefined" == typeof String.prototype.wrapLine && (String.prototype.wrapLine = function(e) {
    var a = "", b;
    for (_string = this.replace(/\n/g, " ").replace(/\ \ /g, " ");0 < _string.length;) {
      b = _string.length > e ? _string.substring(0, e).lastIndexOf(" ") : -1, -1 == b && (b = 0 < _string.length && _string.length <= e ? _string.length : e), a += (0 < a.length ? "\n" : "") + _string.substring(0, b), _string = _string.substring(b + 1, _string.length);
    }
    return a;
  });
  "undefined" == typeof Array.prototype.kasuj && (Array.prototype.kasuj = function(e) {
    e = this.indexOf(e);
    -1 != e && this.splice(e, 1);
  });
  "undefined" == typeof Object.size && (Object.size = function(e) {
    var a = 0, b;
    for (b in e) {
      e.hasOwnProperty(b) && a++;
    }
    return a;
  });
  Array.prototype.searchFor || (Array.prototype.searchFor = function(e, a) {
    return this.filter(function(b, c, g) {
      return b[e] == a;
    });
  });
  Array.prototype.clone || (Array.prototype.clone = function() {
    return this.slice(0);
  });
  Array.prototype.remove || (Array.prototype.remove = function(e, a) {
    var b = this.slice((a || e) + 1 || this.length);
    this.length = 0 > e ? this.length + e : e;
    return this.push.apply(this, b);
  });
  Function.prototype.inherits || (Function.prototype.inherits = function(e) {
    this.prototype = new e;
    this.prototype.constructor = this;
    this.prototype.parent = e.prototype;
  });
  "undefined" == typeof $.fn.justtext && ($.fn.justtext = function() {
    return $(this).clone().children().remove().end().text();
  });
  this.PublChanges = function(e) {
    return this.getInfoFromWebsite("changesgrc");
  };
  this.getUrlForWebsite = function(e, a) {
    return this.Scripts_url + "light/" + e + "/" + Game.locale_lang + (a || "");
  };
  this.getInfoFromWebsite = function(e, a) {
    var b = $("<div/>"), c = RepConv.getUrlForWebsite(e, a);
    b.append($("<iframe/>", {src:c, style:"width: 825px; height: 425px;", onload:"console.log(this)"}));
    return b.html();
  };
  this.AQQ = {};
  this.currTown = "";
  this.active = {sounds:{mute:!1, volume:100, url:"", loop:!0}, power:!0, ftabs:!0, fcmdimg:!0, statsGRC2:!1, statsGRCL:"potusek", unitsCost:!0, oceanNumber:!0, reportFormat:!0, attack_count:0};
  this.commandList = this._cookie + "_CmdList";
  this.command = this._cookie + "_Cmd_";
  this.addCmd = !1;
  this.unitsCode = {sword:"A1", slinger:"B1", archer:"C1", hoplite:"D1", rider:"E1", chariot:"F1", catapult:"G1", big_transporter:"A2", bireme:"B2", attack_ship:"C2", demolition_ship:"D2", small_transporter:"E2", trireme:"F2", colonize_ship:"G2", zyklop:"A3", sea_monster:"B3", harpy:"C3", medusa:"D3", minotaur:"E3", manticore:"F3", centaur:"G3", pegasus:"H3", cerberus:"I3", fury:"J3", calydonian_boar:"K3", griffin:"L3", godsent:"M3", militia:"A4", atalanta:"A5", cheiron:"B5", ferkyon:"C5", helen:"D5", 
  hercules:"E5", leonidas:"F5", orpheus:"G5", terylea:"H5", urephon:"I5", zuretha:"J5", andromeda:"K5", odysseus:"L5", iason:"M5", apheledes:"N5", democritus:"O5", hector:"P5", unknown_naval:"XY", unkown:"XX", unknown:"XX"};
  this.buildCode = {main:"A9", storage:"B9", hide:"C9", farm:"D9", place:"E9", lumber:"F9", stoner:"G9", ironer:"H9", market:"I9", docks:"J9", wall:"K9", academy:"L9", temple:"M9", barracks:"N9", theater:"O9", thermal:"P9", library:"R9", lighthouse:"S9", tower:"T9", statue:"U9", oracle:"V9", trade_office:"W9"};
  this.academyCode = {architecture:"A7", building_crane:"B7", cryptography:"C7", espionage:"D7", plow:"E7", stone_storm:"F7", temple_looting:"G7", berth:"H7", cartography:"I7", democracy:"J7", instructor:"K7", pottery:"L7", strong_wine:"M7", town_guard:"N7", booty:"O7", combat_experience:"P7", diplomacy:"Q7", mathematics:"R7", set_sail:"S7", take_over:"T7", breach:"U7", conscription:"V7", divine_selection:"W7", meteorology:"X7", shipwright:"Y7", take_over_old:"Z7", phalanx:"D6", ram:"C6", booty_bpv:"H6"};
  this.commandImage = "abort attack_incoming attack_land attack_pillage attack_sea attack_spy attack_takeover attack breakthrough colonization_failed colonization conqueror farm_attack illusion revolt_arising revolt_running revolt siege spying support trade underattack_land underattack_sea".split(" ");
  this.powerImage = "acumen attack_boost attack_penalty bolt building_order_boost call_of_the_ocean cap_of_invisibility cleanse defense_boost defense_penalty desire divine_sign earthquake effort_of_the_huntress fair_wind favor_boost favor_penalty fertility_improvement forced_loyalty happiness happy_folks hermes_boost illusion iron_production_penalty kingly_gift loyalty_loss myrmidion_attack natures_gift olympic_experience olympic_sword olympic_torch olympic_village patroness pest population_boost pumpkin resource_boost resurrection sea_storm starter_protection stone_production_penalty strength_of_heroes town_protection transformation trojan_defense underworld_treasures unit_movement_boost unit_order_boost unit_training_boost wedding wisdom wood_production_penalty".split(" ");
  this.models = {};
  this.requests = {};
  this.__repconvValueArray = {};
  this.settings = {};
  this.Tracker = function() {
    (function(e, a, b, c, g, m, t) {
      e.GoogleAnalyticsObject = g;
      e[g] = e[g] || function() {
        (e[g].q = e[g].q || []).push(arguments);
      };
      e[g].l = 1 * new Date;
      m = a.createElement(b);
      t = a.getElementsByTagName(b)[0];
      m.async = 1;
      m.src = c;
      t.parentNode.insertBefore(m, t);
    })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
    ga("create", "UA-6635454-10", "auto");
    ga("send", "pageview");
  };
  this.init = function() {
    if ("object" != typeof Game && "function" != typeof MousePopup && "object" != typeof GameEvents) {
      setTimeout(function() {
        RepConv.init();
      }, 1E3);
    } else {
      GameEvents.grcrt = GameEvents.grcrt || {};
      GameEvents.grcrt.settings = {load:"grcrt:settings:load", save:"grcrt:settings:save"};
      this.browser = browser;
      this.grcrt_domain = this.Scripts_url = "https://www.grcrt.net/";
      this.grcrt_cdn = "https://cdn.grcrt.net/";
      this.Scripts_link = "[url=" + this.grcrt_domain + "]" + this.Scripts_name + "[/url]";
      this.Const.footer = this.Scripts_link + " - ver. " + this.Scripts_version + " created by Potusek & Anpu";
      this.Const.staticImg = this.grcrt_cdn + "img/";
      this.Const.unitImg = this.grcrt_domain + "static/";
      this.Const.uiImg = this.grcrt_cdn + "ui/";
      this.Const.bunt = this.grcrt_cdn + "ui/c/revolt_arising.png";
      this.Const.bunt2 = this.grcrt_cdn + "ui/c/revolt_running.png";
      this.Const.langUrl = this.grcrt_cdn + "scripts/";
      this.Const.defAlarm = this.grcrt_cdn + "ui/s/alarm.mp3";
      this.Const.defMute = this.grcrt_cdn + "ui/s/car_lock.mp3";
      this.Cookie = this._cookie = Game.player_name + "_" + Game.world_id;
      this.CookieNew = this._cookie + "_new";
      this.CookiePower = this._cookie + "_power";
      this.CookieForumTabs = this._cookie + "_ftags";
      this.CookieCmdImg = this._cookie + "_cmdimg";
      this.CookieStatsGRC2 = this._cookie + "_statsGRC2";
      this.CookieStatsGRCL = this._cookie + "_statsGRCL";
      this.CookieUnitsCost = this._cookie + "_unitsCost";
      this.CookieOceanNumber = this._cookie + "_oceanNumber";
      this.CookieReportFormat = this._cookie + "_repFormat";
      this.CookieUnitsRecr = this._cookie + "_unitsRecr";
      this.CookieUnitsABH = this._cookie + "_unitsRecrABH";
      this.CookieSounds = this._cookie + "_sounds";
      this.CookieEmots = this._cookie + "_emots";
      this.CookieWall = this._cookie + "_wall";
      this.hash = $.md5(this._cookie);
      RepConvLangArray = new _GRCRTRepConvLangArray;
      void 0 == RepConvLangArray[Game.locale_lang.substring(0, 2)] ? this.LangEnv = "en" : this.LangEnv = Game.locale_lang.substring(0, 2);
      RepConvHelpTabs = {HELPTAB1:this.getInfoFromWebsite("grc"), HELPTAB2:this.getInfoFromWebsite("grchowto"), HELPTAB3:this.getInfoFromWebsite("changesgrc"), HELPTAB4:"", HELPTAB5:""};
      if ("en" == this.LangEnv || "zz" == this.LangEnv) {
        this.LangEnv = "en", this.LangLoaded = !0;
      }
      void 0 == RepConvLangArray[this.LangEnv] && (this.LangEnv = "en", this.LangLoaded = !0);
      this.Lang = RepConvLangArray[this.LangEnv];
      RepConvCommand = {};
      RepConvCommandList = [];
      browser.chrome ? (new _GRCRTInnoFix, RepConvTool = new _GRCRTRepConvTool, RepConvForm = new _GRCRTRepConvForm, GRCRTtpl = new _GRCRTConverterTpl, RepConvABH = new _GRCRTRepConvABH, RepConvTSL = new _GRCRTRepConvTSL, RepConvTranslations = new _GRCRTRepConvTranslations, RepConvAdds = new _GRCRTRepConvAdds, RepConvGRC = new _GRCRTRepConvGRC, RepConvUpdater = new _GRCRTUpdater, RepConvNotifications = new _GRCRTNotifications, RepConvOT = new _GRCRTTradeFarmOldVersion, RepConvRadar = new _GRCRTRepConvRadarV2, 
      RepConvAO = new _GRCRTRepConvAO, RepConvRecipes = new _GRCRTRepConvRecipes) : (new _GRCRTInnoFix, uw.RepConvTool = new _GRCRTRepConvTool, uw.RepConvForm = new _GRCRTRepConvForm, uw.RepConvABH = new _GRCRTRepConvABH, uw.RepConvTSL = new _GRCRTRepConvTSL, uw.GRCRTtpl = new _GRCRTConverterTpl, uw.RepConvTranslations = new _GRCRTRepConvTranslations, uw.RepConvAdds = new _GRCRTRepConvAdds, uw.RepConvGRC = new _GRCRTRepConvGRC, uw.RepConvUpdater = new _GRCRTUpdater, uw.RepConvNotifications = new _GRCRTNotifications, 
      uw.RepConvOT = new _GRCRTTradeFarmOldVersion, uw.RepConvRadar = new _GRCRTRepConvRadarV2, uw.RepConvAO = new _GRCRTRepConvAO, uw.RepConvRecipes = new _GRCRTRepConvRecipes);
      this.GA = 0;
      RepConvTool.readRemote();
      RepConv.Debug && console.log("...start init");
      setTimeout(function() {
        RepConvAdds.init();
      }, 100);
      setTimeout(function() {
        RepConv.Tracker();
      }, 100);
    }
  };
}
var matched, browser;
uaMatch = function(e) {
  e = e.toLowerCase();
  var a = /(opr)[\/]([\w.]+)/.exec(e) || /(chrome)[ \/]([\w.]+)/.exec(e) || /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 <= e.indexOf("trident") && /(rv)(?::| )([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
  e = /(ipad)/.exec(e) || /(iphone)/.exec(e) || /(android)/.exec(e) || /(windows phone)/.exec(e) || /(win)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/i.exec(e) || [];
  return {browser:a[3] || a[1] || "", version:a[2] || "0", platform:e[0] || ""};
};
matched = uaMatch(window.navigator.userAgent);
browser = {msie:!1, safari:!1};
matched.browser && (browser[matched.browser] = !0, browser.version = matched.version, browser.versionNumber = parseInt(matched.version));
matched.platform && (browser[matched.platform] = !0);
if (browser.android || browser.ipad || browser.iphone || browser["windows phone"]) {
  browser.mobile = !0;
}
if (browser.cros || browser.mac || browser.linux || browser.win) {
  browser.desktop = !0;
}
if (browser.chrome || browser.opr || browser.safari) {
  browser.webkit = !0;
}
if (browser.rv) {
  var ie = "msie";
  matched.browser = ie;
  browser[ie] = !0;
}
if (browser.opr) {
  var opera = "opera";
  matched.browser = opera;
  browser[opera] = !0;
}
if (browser.safari && browser.android) {
  var android = "android";
  matched.browser = android;
  browser[android] = !0;
}
browser.name = matched.browser;
browser.platform = matched.platform;
uw = "undefined" == typeof unsafeWindow ? window : unsafeWindow;
$(document).ready(function() {
  if (!window.TempBarData) {
    $.Observer(GameEvents.game.start).subscribe("GRCRT_Main_game_start", function() {
      if ("undefined" == typeof RepConv || browser.safari && "undefined" == typeof RepConv.init) {
        browser.chrome ? RepConv = new _GRCRTMain : uw.RepConv = new _GRCRTMain, RepConv.init();
      }
    });
  } else {
    if ("undefined" == typeof RepConv || browser.safari && "undefined" == typeof RepConv.init) {
      browser.chrome ? RepConv = new _GRCRTMain : uw.RepConv = new _GRCRTMain, RepConv.init();
    }
  }
});
