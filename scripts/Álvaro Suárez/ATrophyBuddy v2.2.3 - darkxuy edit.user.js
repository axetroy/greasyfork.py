// ==UserScript==
// @name           ATrophyBuddy v2.2.3 - darkxuy edit
// @description    EN
// @version        2.2.3
// @include        http://trophymanager.com/*
// @include        http://test.trophymanager.com/*
// @exclude        http://trophymanager.com/banners*
// @exclude        http://trophymanager.com/showprofile.php*
// @exclude        http://trophymanager.com/matches/*
// @exclude        http://trophymanager.com/userguide.php*
// @exclude        http://trophymanager.com/livematch.php*manual_show.php
// @exclude        http://trophymanager.com/manual_show.php*
// @exclude        http://trophymanager.com/live*
// @exclude        http://trophymanager.com/transform.php
// @exclude        http://trophymanager.com/translate
// @exclude        http://trophymanager.com/translate?*
// @namespace      https://greasyfork.org/en/users/13275
// ==/UserScript==



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Customize Section: Customize TrophyBuddy to suit your personal preferences																		///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																														///
var myclubid = " ";		// if myclubid = "", some functions won't work. Add your team-id like this: var myclubid = "22882" to unlock those additional features			///
var menubar = "yes";		// switch yes/no to turn the menubar on/off																///
var sidebar = "yes";		// switch yes/no to turn the sidebar on/off																///
var PlayerDataPlus = "no";	// switch yes/no to turn the PlayerDataPlus on/off															///
var PlayerDataPlusPosition = "topleft"; // you can choose between "topleft" and "bottomleft"	and "inside"											///
var hovermenu = "yes";	// switch to "yes" to bring back the old hover menu style from TM1.1	(adapted from TM Auxiliary and slightly modified)					///			
var alt_training = "no";	// switch to "yes" to show an alternate version of the training overview (adapted from TM Auxiliary and slightly modified)				///
var old_skills = "no";		// switch to "yes" to to bring back the old look of the skills on the player page (adapted from TM Auxiliary and slightly modified)			///
var bronze_stars = "yes";	// switch to "no" to to add bronze stars for skill values 18 for coaches and scouts										///
var oldpos = "no";			// switch to "yes" to to bring back the old look of player positions														///
//																														///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var language = "pl";     // choose your language, check supported languages below:

var rou_factor = 0.00405;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//												SUPPORTED LANGUAGES														///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																														///
//The following languages are supported right now: 																						///
//																														///
//	ar = Arabic																												///
//	da = Danish																												///																																					///
//	de = German																											///
//	en = English																												///
//	fr = French																												///
//	he = Hebrew																											///
//	hu = Hungarian																											///
//	pl = Polish																												///
//	ro = Romanian																											///
//	sl = Slovakian																											///
//																														///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

YourRecentPosts = "Your Recent Posts";
GoYourRecentPosts = "Your Recent Posts";

switch (language) {

//ARABIC
 case "ar":
		var Home = "الصفحة الرئيسية";
		var CheckYourMails = "الرسائل";
		var League = "الدوري";
		var Cup = "الكأس";
		var Exit = "تسجيل خروج";
			
		var GoCurrentBids = "شاهد العروض الحالية";
		var GoTactics = "االخطة";
		var GoYouthAcademy = "اذهب إلى أكاديمية الشباب";
		var GoHireCoaches = "تعاقد مع مدربين جدد";
		var GoHireScouts = "تعاقد مع كشافين جدد";
		var GoMyCoaches = "اذهب الى قائمة مدربي الفريق الحاليين";
		var GoMyScouts = "اذهب الى قائمة كشافي الفريق الحاليين";
		var GoScoutReports = "تحقق من اخر تقارير الكشافه";
		var GoPlayerNotes = "تصفح ملاحظات اللاعبين";
		var GoTrainingOverview = "تصفح نتائج التدريب";
		var GoTrainingTeams = "التحكم بالانظمة التدريبية";
		var GoForum = "تصفح المنتديات";
		var GoTMUserGuide = "اقرأ دليل المستخدم";
		var GoTBConference = "منتدى تروفي بودي";
		
		var GoTransferForum = "اذهب الى منتدى الانتقالات";
		var GoGeneralForum = "اذهب الى المنتدى العالمي";
		var GoAnnouncementForum = "اذهب الى منتدى الاخبار";
		//var GoFederations = "الاتحادات";
		
	var Team = "الفريق";	
		var CurrentBids = "العروض الحالية";
		var Squad = "اللاعبين";
		var Tactics = "الخطة";
		var YouthAcademy = "الأكاديمية";
	var Staff = "الموظفون";
		var HireCoaches = "تعاقد مع مدرب";
		var HireScouts = "كشاف";
		var ScoutReports = "تقارير الكشافه";
		var MyCoaches = "المدربين";
		var MyScouts = "الكشافه";
	var Training = "التدريب";	
		var PlayerNotes = "الملاحظات";
		var TrainingOverview = "التقارير التدريبية";
		var TrainingTeams = "الأنظمة التدريبية";
	var Community = "المجتمع";
		var Forum = "المنتدى";
		var TMUserGuide = "دليل المستخدم";
		var TBConference = "منتدى تروفي بودي";
	break;

	
//DANISH
case "da":
		var Home = "Hjemme";
		var CheckYourMails = "Læs Dine Beskeder";
		var League = "Liga";
		var Cup = "Pokal";
		var Exit = "Forlad TrophyManager";

		var GoCurrentBids = "Se Bud";
		var GoTactics = "Gå til Taktik";
		var GoYouthAcademy = "Gå til Ungdomsakademi";
		var GoHireCoaches = "Hyr nye Trænere";
		var GoHireScouts = "Hyr nye Scouts";
		var GoMyCoaches = "Se dine trænere";
		var GoMyScouts = "Se dine scouts";
		var GoScoutReports = "Se scoutrapporter";
		var GoPlayerNotes = "Se spiller noter";
		var GoTrainingOverview = "Se træningsresultat";
		var GoTrainingTeams = "Ændre træningshold";
		var GoForum = "Gå til forummet";
		var GoTMUserGuide = "Læs brugermanualen";
		var GoTBConference = "Gå til TrophyBuddy-Konferencen";

		var GoTransferForum = "Gå til Transfer forummet";
		var GoGeneralForum = "Gå til Generalt forummet";
		var GoAnnouncementForum = "Gå til Announcement";
		//var GoFederations = "Gå til Konferencer";

	var Team = "Hold";
		var CurrentBids = "Nuværende Bud";
		var Squad = "Trup";
		var Tactics = "Taktik";
		var YouthAcademy = "Ungdomsakadami";
	var Staff = "Staff";
		var HireCoaches = "Hyr Trænere";
		var HireScouts = "Hyr Trænere";
		var ScoutReports = "Scout Rapporter";
		var MyCoaches = "Mine Trænere";
		var MyScouts = "Mine Scouts";
	var Training = "Træning";
		var PlayerNotes = "Spiller Noter";
		var TrainingOverview = "Trænings Overblik";
		var TrainingTeams = "Trænings Hold";
	var Community = "Community-Links";
		var Forum = "Forum";
		var TMUserGuide = "TM-Brugermanual";
		var TBConference = "TrophyBuddy-Konference";
	break;
	
	
//GERMAN	
case "de":
	var Home = "Startseite";
	var CheckYourMails = "Zum Postfach wechseln";
	var League = "Liga";
	var Cup = "Pokal";
	var Exit = "Ausloggen";
				
		var GoCurrentBids = "Laufende Transfergebote anschauen";
		var GoTactics = "Zum Taktikbereich";
		var GoSquad = "Przegląd Składu";
 		var GoYouthAcademy = "Die Jugendakademie besuchen";	
		var GoYouthAcademyy = "Go to Youth Academy";
		var GoHireCoaches = "Neue Trainer einstellen";
		var GoHireScouts = "Neue Scouts einstellen";
		var GoMyCoaches = "Sieh dir deine Trainer an";
		var GoMyScouts = "Sieh dir deine Scouts an";		
		var	GoScoutReports = "Schau dir deine Scout-Reporte an";
		var GoPlayerNotes = "Spielernotizen aufrufen";		
		var GoTrainingOverview = "Überprüfe die Trainingsergebnisse";
		var GoTrainingTeams = "Passe deine Trainingsgruppen an";
		var GoForum = "Durchstöbere die Foren";
		var GoTMUserGuide = "Lies das Handbuch";
		var GoTBConference = "Feedback geben";
		
		var GoTransferForum = "Das Transferforum besuchen";
		var GoGeneralForum = "Das Generalforum besuchen";
		var GoAnnouncementForum = "Halte Ausschau nach neuen Ankündigungen der Entwickler";
		//var GoFederations = "Föderationen besuchen";
	
	var Team = "Team";
		var CurrentBids = "Aktuelle Gebote";			
		var Squad = "Mannschaftsübersicht";
		var Tactics = "Taktiken";
		var YouthAcademy = "Jugendakademie";
		var YouthAcademyy = "Youth Academy";
	var Staff = "Mitarbeiter";
		var HireCoaches = "Trainer";
		var HireScouts = "Scouts kaufen";
		var ScoutReports = "Scout Reporte";
		var MyCoaches = "MyTrainer";
		var MyScouts = "MyScouts";
	var Training = "Training";	
		var PlayerNotes = "Spielernotizen";
		var TrainingOverview = "Trainingsübersicht";
		var TrainingTeams = "Trainingsgruppen";
	var Community = "Community-Links";	
		var Forum = "Forum";
		var TMUserGuide = "TM-Handbuch";
		var TBConference = "TrophyBuddy-Feedback";
	break;	
	
	
// ENGLISH
case "en":
		var Home = "Home";
		var CheckYourMails = "Check your mails";
		var League = "League";
		var Cup = "Cup";
		var Exit = "Exit TrophyManager";
			
		var GoCurrentBids = "See Current Bids";
		var GoTactics = "Go to Tactics";
 		var GoYouthAcademy = "Asystent-Taktyka";	
		var GoYouthAcademyy = "Go to Youth Academy";	
		var GoHireCoaches = "Hire new coaches";
		var GoHireScouts = "Hire new scouts";
		var GoMyCoaches = "Take a look at your coaches";
		var GoMyScouts = "Take a look at your scouts";
		var	GoScoutReports = "Check what you have scouted";
		var GoPlayerNotes = "See your player notes";		
		var GoTrainingOverview = "Check the training results";
		var GoTrainingTeams = "Change your training teams";
		var GoForum = "Browse forums";
		var GoTMUserGuide = "Read the User-Guide";
		var GoTBConference = "Enter the TrophyBuddy-Conference";
		
		var GoTransferForum = "Go to Transfer forum";
		var GoGeneralForum = "Go to General forum";
		var GoAnnouncementForum = "Go to Announcement forum";
		//var GoFederations = "Go to Federations";
		
	var Team = "Team";	
		var CurrentBids = "Current Bids";
		var Squad = "Squad";
		var Tactics = "Tactics";
		var YouthAcademy = "Asystent-Taktyka";
		var YouthAcademyy = "Youth Academy";
	var Staff = "Staff";
		var HireCoaches = "Hire Coaches";
		var HireScouts = "Scouts";
		var ScoutReports = "Scout Reports";
		var MyCoaches = "MyCoaches";				
		var MyScouts = "MyScouts";
	var Training = "Training";	
		var PlayerNotes = "Player Notes";
		var TrainingOverview = "Training Overview"; 
		var TrainingTeams = "Training Teams";
	var Community = "Community-Links";	
		var Forum = "Forum";
		var TMUserGuide = "TM-UserGuide";
		var TBConference = "TrophyBuddy-Conference";
	break;


//FRENCH
 case "fr":
		var Home = "Accueil";
		var CheckYourMails = "Messages";
		var League = "Tournoi";
		var Cup = "Coupe";
		var Exit = "Déconnexion";
			
		var GoCurrentBids = "Enchères en cours";
		var GoTactics = "Tactiques";
		var GoYouthAcademy = "Centre de formation";
		var GoHireCoaches = "Recruter un coach";
		var GoHireScouts = "Recruter un scout";
		var GoMyCoaches = "Coachs";
		var GoMyScouts = "Scouts";
		var GoScoutReports = "Rapports de scout";
		var GoPlayerNotes = "Notes";
		var GoTrainingOverview = "Compte rendu entraînement";
		var GoTrainingTeams = "Entraînement";
		var GoForum = "Forum";
		var GoTMUserGuide = "Manuel de jeu";
		var GoTBConference = "TrophyBuddy Conference";
		
		var GoTransferForum = "Forum des transferts";
		var GoGeneralForum = "Forum général";
		var GoAnnouncementForum = "Annonces officielles";
		//var GoFederations = "Fédérations";
		
	var Team = "Team";
		var CurrentBids = "Enchères actuelles";
		var Squad = "Équipe";
		var Tactics = "Tactiques";
		var YouthAcademy = "Centre de formation";
	var Staff = "Staff";
		var HireCoaches = "Recruter un coach";
		var HireScouts = "Recruter un scout";
		var ScoutReports = "Rapport de scout";
		var MyCoaches = "Mes coachs";
		var MyScouts = "Mes scouts";
	var Training = "Entraînement";
		var PlayerNotes = "Notes joueurs";
		var TrainingOverview = "Compte rendu d'entraînement";
		var TrainingTeams = "Equipe d'entraînement";
	var Community = "Communautés";
		var Forum = "Forum";
		var TMUserGuide = "TM-Manuel de jeu";
		var TBConference = "TrophyBuddy-Conference";
	break;	
	
	
//HEBREW
 case "he":
		var Home = "בית";
		var CheckYourMails = "בדוק את הדואר שלך";
		var League = "שפה";
		var Cup = "גביע";
		var Exit = "צא מטרופי מנג'ר";

		var GoCurrentBids = "ראה הצעות עדכניות";
		var GoTactics = "עבור לטקטיקה";
		var GoYouthAcademy = "עבור לאקדמית הנוער";
		var GoHireCoaches = "שכור מאמנים חדשים";
		var GoHireScouts = "שכור סקאוטים חדשים";
		var GoMyCoaches = "העף מבט במאמנים שלך";
		var GoMyScouts = "העף מבט בסקאוטים שלך";
		var GoScoutReports = "בדוק את תוצאות החקירה של הסקאוט";
		var GoPlayerNotes = "ראה את הערות על שחקניך";
		var GoTrainingOverview = "בדוק את תוצאות אימונייך";
		var GoTrainingTeams = "שנה את קבוצות האימון שלך";
		var GoForum = "עבור לפורום";
		var GoTMUserGuide = "קרא את המדריך-למשתמש";
		var GoTBConference = "הכנס לפורום תוכנות-עזר לטרופי";

		var GoTransferForum = "הכנס לפורום העברות";
		var GoGeneralForum = "הכנס לפורום הכללי";
		var GoAnnouncementForum = "הכנס לפורום ההודעות";
		//var GoFederations = "עבור לפדרציות";

	var Team = "קבוצה";
		var CurrentBids = "הצעות עדכניות";
		var Squad = "סגל";
		var Tactics = "טקטיקה";
		var YouthAcademy = "אקדמית נוער";
	var Staff = "צוות";
		var HireCoaches = "שכור מאמנים";
		var HireScouts = "שכור סקאוטים";
		var ScoutReports = "דוחות סקאוטים";
		var MyCoaches = "המאמנים שלי";
		var MyScouts = "הסקאוטים שלי";
	var Training = "אימונים";
		var PlayerNotes = "הערות שחקן";
		var TrainingOverview = "סקירת אימון";
		var TrainingTeams = "קבוצות אימון";
	var Community = "קשרי-קהילה";
		var Forum = "פורום";
		var TMUserGuide = "מדריך-משתמש";
		var TBConference = "פורום תוכנות-עזר";
	break;		
	

//HUNGARIAN
 case "hu":
		var Home = "Otthon";
		var CheckYourMails = "Levelek";
		var League = "Bajnokság";
		var Cup = "Kupa";
		var Exit = "Kilépés";

		var GoCurrentBids = "Aktív licitek";
		var GoTactics = "Taktika módosítása";
		var GoYouthAcademy = "Ifiakadémia meglátogatása";
		var GoHireCoaches = "Új edzö felvétele";
		var GoHireScouts = "Új megfigyelö felvétele";
		var GoMyCoaches = "Edzök igazgatása";
		var GoMyScouts = "Megfigyelök igazgatása";
		var GoScoutReports = "Jelentések böngészése";
		var GoPlayerNotes = "Játékos jegyzetek";
		var GoTrainingOverview = "Edzés áttekintés";
		var GoTrainingTeams = "Edzésprogram módosítása";
		var GoForum = "Fórum böngészés";
		var GoTMUserGuide = "TM-Kézikönyv";
		var GoTBConference = "TrophyBuddy-Szövetség";

		var GoTransferForum = "Átigazolási fórum - angol";
		var GoGeneralForum = "Globális fórum - angol";
		var GoAnnouncementForum = "Bejelentés fórum - angol";
		//var GoFederations = "Szövetségek";

	var Team = "Csapat";
		var CurrentBids = "Licitek";
		var Squad = "Keret";
		var Tactics = "Taktika";
		var YouthAcademy = "Ifiakadémia";
	var Staff = "Stáb";
		var HireCoaches = "Edzö felvétele";
		var HireScouts = "Scoutok";
		var ScoutReports = "Scout jelentések";
		var MyCoaches = "Edzöim";
		var MyScouts = "Scoutjaim";
	var Training = "Edzés";
		var PlayerNotes = "Jegyzetek";
		var TrainingOverview = "Edzés jelentés";
		var TrainingTeams = "Edzésprogramok";
	var Community = "Közösség";
		var Forum = "Fórum";
		var TMUserGuide = "TM-Ismertetö";
		var TBConference = "TrophyBuddy-Szövetség";
	break;	

	
//POLISH	
	case "pl":
		var Home = "Home";
		var CheckYourMailss = "Announcements ";
		var CheckYourMails = "Check Your Mails";
		var League = "League";
		var Cup = "League Team B";
		var Exit = "Exit";
			
		var GoCurrentBids = "See Current Bids";
		var GoSquad = "Squad Overview";
		var GoTactics = "Go to Tactics";
		var GoToYouthAcademy = "Go to Assistant Manager";
		var GoToYouthAcademyy = "Finances";	
		var GoPlayerNotes = "Youth Academy";
		var GoHireCoaches = "Zatrudnij Trenerów";
		var GoHireScouts = "Hire Scouts";
		var GoScoutReports = "Scout Reports";
		var GoTrainingOverview = "Training Overview";
		var GoTrainingTeams = "Training Teams";
		var GoForum = "Forum";
		var GoTMUserGuide = "Read the User-Guide";
		var GoTBConference = "Enter the TrophyBuddy-Conference";
		
		var GoTransferForum = "Transfer forum";
		var GoGeneralForum = "General forum";
		var GoAnnouncementForum = "Bugs forum";
		//var GoFederations = "Go to Federations";
		
		var Team = "Team";
			var CurrentBids = "Current Bids";
			var Squad = "Squad ";
			var Tactics = "Tactics";
			var YouthAcademy = "Assistant Manager";
			var YouthAcademyy = "Finances";
			var PlayerNotes = "Youth Academy";
			var PlayerNotess = "Fans";
		var Staff = "Staff";
			var HireCoaches = "Zatrudnij Trenerów";
			var HireScouts = "Hire Scouts";
			var ScoutReports = "Scout Reports";
			var MyCoaches = "Trenerzy";
			var MyScouts = "Skauci";
		var Training = "Training";
			var TrainingOverview = "Training Overview";
			var TrainingTeams = "Training Teams";
		var Community = "Community";
			var Forum = "Forum";
			var TMUserGuide = "TM-UserGuide";
			var TBConference = "TrophyBuddy";
			var TBConferencee = "Calculator";
	break;

	
//ROMANIAN	
	case "ro":
			var Home = "Acasă";
			var CheckYourMails = "Verifică mesajele";
			var League = "Ligă";
			var Cup = "Cupă";
			var Exit = "Ieşire";

			var GoCurrentBids = "Licitaţii";
			var GoTactics = "Tactici";
			var GoYouthAcademy = "Academia de tineret";
			var GoHireCoaches = "Angajează antrenori";
			var GoHireScouts = "Angajează scouteri";
			var GoMyCoaches = "Antrenori";
			var GoMyScouts = "Scouteri";
			var GoScoutReports = "Rapoarte";
			var GoPlayerNotes = "Notiţe";
			var GoTrainingOverview = "Vizualizare antrenament";
			var GoTrainingTeams = "Grupe de antrenament";
			var GoForum = "Citeşte forumul";
			var GoTMUserGuide = "Citeşte manualul";
			var GoTBConference = "Intră la Conferinţă TrophyBuddy";

			var GoTransferForum = "Forum transferuri";
			var GoGeneralForum = "Forum global";
			var GoAnnouncementForum = "Forum anunţuri";
			//var GoFederations = "Forum federaţii";

		var Team = "Echipa";
			var CurrentBids = "Licitaţii";
			var Squad = "Jucători";
			var Tactics = "Tactici";
			var YouthAcademy = "Academia de tineret";
		var Staff = "Staff";
			var HireCoaches = "Angajare antrenori";
			var HireScouts = "Scouteri";
			var ScoutReports = "Rapoarte";
			var MyCoaches = "Antrenorii";
			var MyScouts = "Scouterii mei";
		var Training = "Antrenament";
			var PlayerNotes = "Notiţe";
			var TrainingOverview = "Vizualizare antr.";
			var TrainingTeams = "Grupe de antr.";
		var Community = "Comunitate";
			var Forum = "Forum";
			var TMUserGuide = "Manual-TM";
			var TBConference = "Conferinţa TrophyBuddy";
	break;	
	
	
//SLOVAC	
	case "sl":
		var Home = "Doma";
		var CheckYourMails = "Pozri maily";
		var League = "Liga";
		var Cup = "Pohár";
		var Exit = "Odhlás sa z TrophyManager";

		var GoCurrentBids = "Ponuky";
		var GoTactics = "Taktia";
		var GoYouthAcademy = "Juniory";
		var GoHireCoaches = "Najať trénerov";
		var GoHireScouts = "Najať skautov";
		var GoMyCoaches = "Tréneri";
		var GoMyScouts = "Skauti";
		var GoScoutReports = "Správy skautov";
		var GoPlayerNotes = "Poznámky o hráčoch";
		var GoTrainingOverview = "Prehľad tréningu";
		var GoTrainingTeams = "Nastavenie tréningu";
		var GoForum = "Fórum";
		var GoTMUserGuide = "User-Guide fórum";
		var GoTBConference = "TrophyBuddy-Conference fórum";

		var GoTransferForum = "Transfer fórum";
		var GoGeneralForum = "General fórum";
		var GoAnnouncementForum = "Announcement fórum";
		//var GoFederations = "Federations fórum";

	var Team = "Klub";
		var CurrentBids = "Ponuky";
		var Squad = "Hráči";
		var Tactics = "Taktika";
		var YouthAcademy = "Juniory";
	var Staff = "Personál";
		var HireCoaches = "Najať trénerov";
		var HireScouts = "Skauti";
		var ScoutReports = "Správy skautov";
		var MyCoaches = "Moji tréneri";
		var MyScouts = "Moji skauti";
	var Training = "Tréning";
		var PlayerNotes = "Poznámky hráčov";
		var TrainingOverview = "Prehľad tréningu";
		var TrainingTeams = "Tréning";
	var Community = "Comunita";
		var Forum = "Fórum";
		var TMUserGuide = "TM-UserGuide";
		var TBConference = "TrophyBuddy-Conference"; 
	break;
	
}
// ==/UserScript==

var myurl=document.URL;





	







if (myurl.match(/playerss/))  { // hier wird geprueft, ob das die richtige Seite ist

	var check_statpage = document.URL;
	check_statpage = check_statpage.search("statistics");


		if (document.URL == ""){
		
		function embed() {
		var oldFunc = makeTable;

		makeTable = function() {

        
        
		myTable = document.createElement('table');
		myTable.className = "hover zebra";

		construct_th();
		var z=0;
		for (i=0; i<players_ar.length; i++) {
			if (players_ar[i]["fp"] != "GK" && add_me(players_ar[i]) && filter_squads()) {
				construct_tr(players_ar[i], z);
				z++;
			}
		}
		if (z == 0) {
			var myRow = myTable.insertRow(-1);
			var myCell = myRow.insertCell(-1);
			myCell.colSpan = 24;
			myCell.innerHTML = other_header;
		}
	    if (filters_ar[1] == 1) {
	        var myRow = myTable.insertRow(-1);
	        var myCell = myRow.insertCell(-1);
	        myCell.className = "splitter";
	        myCell.colSpan = "50";
	        myCell.innerHTML = gk_header;
	        construct_th(true);
	        z=0;
	        for (i=0; i<players_ar.length; i++) {
	            if (players_ar[i]["fp"] == "GK" && filter_squads()) {
	                if (!(players_ar[i]["age"] < age_min || players_ar[i]["age"] > age_max)) {
	                    construct_tr(players_ar[i], z, true);
	                    z++;
	                }
	            }
	        }
	    }
	    $e("sq").innerHTML = "";
	    $e("sq").appendChild(myTable);
	    activate_player_links($(myTable).find(""));
	    init_tooltip_by_elems($(myTable).find("["))
	    zebra();

	    };
		}

		var inject = document.createElement("script");

		inject.setAttribute("type", "text/javascript");
		inject.appendChild(document.createTextNode("(" + embed + ")()"));

		document.body.appendChild(inject);


		var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

		loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

		    $.noConflict();
		    jQuery(document).ready(function($) {
		       // $('table.zebra th:eq(0)').click();
		  });
		});
		
		}
		else if (check_statpage != -1) {
		}
		
		else {
		
		counttables = document.getElementsByTagName("table").length;
		//alert (counttables)
		var c = 0;
		
		if (counttables == 3) {
			aux = document.getElementsByTagName("table")[1]; // holt die gesamte Tabelle
		}
		else {
			aux = document.getElementsByTagName("table")[2]; // holt die gesamte Tabelle
		}
		auxx = document.getElementsByTagName("table")[0]; // holt die gesamte Tabelle		
		pos_td = document.getElementsByTagName("strong")[1]; // holt die gesamte Tabelle
		auxspan = document.getElementsByTagName("span")[28]; // holt die gesamte Tabelle
		aux2 = document.getElementsByTagName("p")[0]; // holt die gesamte Tabelle
		aux3 = document.getElementsByTagName("p")[1]; // holt die gesamte Tabelle
		aux4 = document.getElementsByTagName("p")[2]; // holt die gesamte Tabelle
		
		if (old_skills == "yes") {
		
		var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

		loadAndExecute("", function () {

		$.noConflict();
		jQuery(document).ready(function ($) {

    // Destination table
    var newskills =
      '<table id="new_skill_table">' +
      '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
      '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
      '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
      '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
      '</table>';

    // Hide current skills, insert new skills
    $('table.skill_table').toggle();
    $('table.skill_table').after(newskills);

    // Arrays for skill data
    var attributeNames = new Array();
    var attributeValues = new Array();

    // Load skill data
    $('table.skill_table tr th:nth-child(1)').each(function (index) {
      storeData($(this));
    });

    $('table.skill_table tr th:nth-child(3)').each(function (index) {
      storeData($(this));
    });

    // Inject first row of attributes
    $.each(attributeNames, function (index) {
      $('table#new_skill_table tr:eq(0) td:eq(' + index + ')').html(attributeNames[index].substr(0, 3));
      $('table#new_skill_table tr:eq(1) td:eq(' + index + ')').html(attributeValues[index]);
    });

    // Inject second row of attributes (14 attributes for non-goalies)
    if (attributeNames.length == 18) {
      $.each(attributeNames.slice(9), function (index) {
        $('table#new_skill_table tr:eq(2) td:eq(' + index + ')').html(attributeNames[index + 9].substr(0, 3));
        $('table#new_skill_table tr:eq(3) td:eq(' + index + ')').html(attributeValues[index + 9]);
      });
    }
    else {
      $.each(attributeNames.slice(7), function (index) {
        $('table#new_skill_table tr:eq(2) td:eq(' + (index + 3) + ')').html(attributeNames[index + 9].substr(0, 3));
        $('table#new_skill_table tr:eq(3) td:eq(' + (index + 3) + ')').html(attributeValues[index + 9]);
      });
    }

    // Format new skills
    $('table#new_skill_table tr td').css('text-align', 'center');
    $('table#new_skill_table tr td').css('width', '14.2%');
    $('table#new_skill_table tr:nth-child(even)').css('background-color', '#649024');
    $('table#new_skill_table tr td img').css('margin-bottom', '4px');
	$('table#new_skill_table tr:eq(0) td').css('font-weight', 'bold');
	$('table#new_skill_table tr:eq(2) td').css('font-weight', 'bold');
	
	$('span.gk:contains("Goalkeeper")').html('<span class="gk" style="font-size: 1em;">GK </span>');
	$('span.d:contains("Defender")').html('<span class="def" style="font-size: 1em;">D </span>');
	$('span.dm:contains("Defensive Midfielder")').html('<span class="dmid" style="font-size: 1em;">DM </span>');
	$('span.m:contains("Midfielder")').html('<span class="mid" style="font-size: 1em;">M </span>');
	$('span.om:contains("Offensive Midfielder")').html('<span class="omid" style="font-size: 1em;">OM </span>');
	$('span.f:contains("Forward")').html('<span class="fc" style="font-size: 1em;">F </span>');
	$('span.side:contains("Left")').html('<span class="left" style="font-size: 1em;">L</span>');
	$('span.side:contains("Center")').html('<span class="center" style="font-size: 1em;">C</span>');
	$('span.side:contains("Right")').html('<span class="right" style="font-size: 1em;">R</span>');
	
	
	// Format recommendation stars
    $('table.info_table tr td img').css('margin-bottom', '3px');
    $('table.info_table tr td img.flag').css('margin-bottom', '1px');

    // Show player details by default
    if (!$("#player_info").is(":visible")) {
      $("#player_info_arrow").click();
    }
    setClubList();

    // Store attributes to arrays
    function storeData(attribute) {

      // Only store attributes with values
      if (attribute.html() != '') {
        attributeNames.push(attribute.html());
        attributeValues.push(attribute.next().html());
      }
    }

    function sleep(ms) {
      var dt = new Date();
      dt.setTime(dt.getTime() + ms);
      while (new Date().getTime() < dt.getTime());
    }

    function setClubList() {
      // Show clubs for every line of history
      var lastClub;
      $('table.history_table div.club_name').each(function (index) {
        var currentClub = $(this).html();

        // Replace club name on dash, store club name otherwise
        if (currentClub == '-') {
          $(this).html(lastClub);
        }
        else {
          lastClub = currentClub;
        }
      });
    }
  });
});
			
	}
	else {
	
	}

	asi_check = auxx.getElementsByTagName("tr")[6].getElementsByTagName("td")[0].innerHTML;
	//alert(asi_check.search("pics"))
	if (asi_check.search("pics") != -1) {
		var zeile = 0
		var skillindex_yes = 0
	}
	else {
	
	if ( !isNaN( parseFloat(asi_check) ) ) { // ist eine Zahl
	//asi_check = asi_check.search(",") 
	//if (asi_check != -1) {
		var zeile = 0
		var skillindex_yes = 1
	}
	else {
		var zeile = 0
		var skillindex_yes = 0
	}
	}
	//	var asi = asi_check.getElementsByTagName("span")[0].innerHTML;
		
		
// fuer jeden Skill muss so geprueft werden, ob ein img-Tag oder ein span-Tag innerhalb der tabellenzelle vorliegt
	
//Strength
stae_td = aux.getElementsByTagName("tr")[zeile].getElementsByTagName("td")[0];

if(stae_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var stae = stae_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + stae)
}
else if(stae_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var stae = stae_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + stae)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var stae = aux.rows[zeile].cells[1].innerHTML;
//alert ("normal " + stae)
}
//Stamina
kon_td = aux.getElementsByTagName("tr")[zeile+1].getElementsByTagName("td")[0];

if(kon_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var kon = kon_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + kon)
}
else if(kon_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var kon = kon_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + kon)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var kon = aux.rows[zeile+1].cells[1].innerHTML;
//alert ("normal " + kon)
}

//Pace
ges_td = aux.getElementsByTagName("tr")[zeile+2].getElementsByTagName("td")[0];

if(ges_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var ges = ges_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + ges)
}
else if(ges_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var ges = ges_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + ges)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var ges = aux.rows[zeile+2].cells[1].innerHTML;
//alert ("normal " + ges)
}

//Marking
man_td = aux.getElementsByTagName("tr")[zeile+3].getElementsByTagName("td")[0];

if(man_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var man = man_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + man)
}
else if(man_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var man = man_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + man)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var man = aux.rows[zeile+3].cells[1].innerHTML;
//alert ("normal " + man)
}

//Tackling
zwe_td = aux.getElementsByTagName("tr")[zeile+4].getElementsByTagName("td")[0];

if(zwe_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var zwe = zwe_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + zwe)
}
else if(zwe_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var zwe = zwe_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + zwe)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var zwe = aux.rows[zeile+4].cells[1].innerHTML;
//alert ("normal " + zwe)
}

//Workrate
lau_td = aux.getElementsByTagName("tr")[zeile+5].getElementsByTagName("td")[0];

if(lau_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var lau = lau_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + lau)
}
else if(lau_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var lau = lau_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + lau)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var lau = aux.rows[zeile+5].cells[1].innerHTML;
//alert ("normal " + lau)
}

//Positioning
ste_td = aux.getElementsByTagName("tr")[zeile+6].getElementsByTagName("td")[0];

if(ste_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var ste = ste_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + ste)
}
else if(ste_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var ste = ste_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + ste)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var ste = aux.rows[zeile+6].cells[1].innerHTML;
//alert ("normal " + ste)
}

//Passing
pass_td = aux.getElementsByTagName("tr")[zeile].getElementsByTagName("td")[1];

if(pass_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var pass = pass_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + pass)
}
else if(pass_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var pass = pass_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + pass)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var pass = aux.rows[zeile].cells[3].innerHTML;
//alert ("normal " + pass)
}

//Crossing
fla_td = aux.getElementsByTagName("tr")[zeile+1].getElementsByTagName("td")[1];

if(fla_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var fla = fla_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + fla)
}
else if(fla_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var fla = fla_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + fla)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var fla = aux.rows[zeile+1].cells[3].innerHTML;
//alert ("normal " + fla)
}

//Technique
tec_td = aux.getElementsByTagName("tr")[zeile+2].getElementsByTagName("td")[1];

if(tec_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var tec = tec_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + tec)
}
else if(tec_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var tec = tec_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + tec)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var tec = aux.rows[zeile+2].cells[3].innerHTML;
//alert ("normal " + tec)
}

//Heading
kop_td = aux.getElementsByTagName("tr")[zeile+3].getElementsByTagName("td")[1];

if(kop_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var kop = kop_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + kop)
}
else if(kop_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var kop = kop_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + kop)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var kop = aux.rows[zeile+3].cells[3].innerHTML;
//alert ("normal " + kop)
}

//Shooting
tor_td = aux.getElementsByTagName("tr")[zeile+4].getElementsByTagName("td")[1];

if(tor_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var tor = tor_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + tor)
}
else if(tor_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var tor = tor_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + tor)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var tor = aux.rows[zeile+4].cells[3].innerHTML;
//alert ("normal " + tor)
}

//Longshots
wei_td = aux.getElementsByTagName("tr")[zeile+5].getElementsByTagName("td")[1];

if(wei_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var wei = wei_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + wei)
}
else if(wei_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var wei = wei_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + wei)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var wei = aux.rows[zeile+5].cells[3].innerHTML;
//alert ("normal " + wei)
}

//Setpieces
sta_td = aux.getElementsByTagName("tr")[zeile+6].getElementsByTagName("td")[1];

if(sta_td.getElementsByTagName("span").length==1) // wenn span Tag, wird der Inhalt des ersten Span-Tags ausgelesen
{
var sta = sta_td.getElementsByTagName("span")[0].innerHTML;
//alert ("span " + sta)
}
else if(sta_td.getElementsByTagName("img").length==1){ // wenn img Tag, wird das alt-Atribut des ersten img-Tags ausgelesen
var sta = sta_td.getElementsByTagName("img")[0].getAttribute("alt");
//alert ("img " + sta)
}
else{ // wenn keins von beiden, wird der Inhalt der Tabellenzelle uebernommen
var sta = aux.rows[zeile+6].cells[3].innerHTML;
//alert ("normal " + sta)
}



//LP, XP, ASI und Gehalt auslesen
		
		//Playername
		var name = document.title; // holt den Titel-Tag
		name = name.substring(0,name.length-20);
		//alert(name)	

		//Country
		country = document.getElementsByTagName("img")[2].getAttribute("src");
			switch (country) {
		
				case ("/pics/flags/gradient/de.png"):
					country = "Germany";
					//alert(country)
				break;

				default:
					country = "Country not included yet";
					//alert(country)
			}
		
		verein_td = auxx.getElementsByTagName("tr")[1].getElementsByTagName("td")[0];
		var verein = verein_td.getElementsByTagName("a")[0].innerHTML;
		var clubid = verein_td.getElementsByTagName("a")[0].getAttribute("href");
		clubid = clubid.substring(6,clubid.length-1);
		//alert(verein)
		//alert(clubid)

		//Routine
		var rou = auxx.rows[zeile+skillindex_yes+7].cells[1].innerHTML;
		//alert(rou)

		//Wage
		gehalt_td = auxx.getElementsByTagName("tr")[4].getElementsByTagName("td")[0];
		var gehalt = gehalt_td.getElementsByTagName("span")[0].innerHTML;
		//alert(gehalt)		
		
		//var asi = auxx.rows[5].cells[1].innerHTML;
		//asi = asi.replace("&nbsp;", "");
		//alert(asi)
		
/*		var status = auxx.rows[6].cells[1].innerHTML;
		if (status == '<img src="/pics/mini_green_check.png"> ') {
		status = "Gesund";
		//alert(status)
		}

		//status = status.substring(0,6);
		if (status == "Gesund") {
			status = status;
			//alert(status)
		}
		else if(aux.rows[7].cells[0].getElementsByTagName("img")[0].getAttribute("title") == "Dieser Spieler ist gesperrt"){
				var status = aux.rows[7].cells[0].getElementsByTagName("span")[0].innerHTML;
				alert(status)
				status = status.replace("&nbsp;", "");
				status = status.replace("&nbsp;", "");
				alert(status)
				status = 'Sperre:' + status;
		}
		else if(aux.rows[7].cells[0].getElementsByTagName("img")[0].getAttribute("title") == "Dieser Spieler ist verletzt") {
				var status = aux.rows[7].cells[0].innerHTML;
				status = status.substring(130,status.length-69);
				status = 'Verletzung:' + status;
		}
*/		
/*		alter_td = auxx.getElementsByTagName("tr")[2].getElementsByTagName("td")[0];		
		var alter = auxx.rows[2].cells[1].innerHTML;
			alter = alter.substring(24,alter.length-70);
			alter_year = alter.substring(0,2);
			alter_month = alter.substring(3,alter.length);
			alter_month = alter_month.replace("Jahre","");
			alter_month = alter_month.replace("Monate","");
			alter_month = alter_month.replace(/ /i,"");
			alter = alter_year + "-" + alter_month;
*/			//alert(alter)


		//Position
		var pos_zweinull = document.getElementsByTagName("strong")[1].getElementsByTagName("span"); // holt alle Spanelemente
		var poslength = pos_zweinull.length;
		//alert (poslength)
		if (poslength == 2) {
			var pos = document.getElementsByTagName("strong")[1].getElementsByTagName("span")[1].innerHTML;
			//alert(pos)
		}
		else if (poslength == 3) {
			var pos1 = document.getElementsByTagName("strong")[1].getElementsByTagName("span")[1].innerHTML;
			var pos2 = document.getElementsByTagName("strong")[1].getElementsByTagName("span")[2].innerHTML;
			pos = pos1 + pos2;
			//alert(pos)
		}
		else if (poslength == 5) {
			var pos1 = document.getElementsByTagName("strong")[1].getElementsByTagName("span")[1].innerHTML;
			var pos2 = document.getElementsByTagName("strong")[1].getElementsByTagName("span")[2].innerHTML;
			var pos3 = document.getElementsByTagName("strong")[1].getElementsByTagName("span")[3].innerHTML;
			var pos4 = document.getElementsByTagName("strong")[1].getElementsByTagName("span")[4].innerHTML;
			pos = pos1 + pos2 + pos3 + pos4;
			//alert(pos)
		}

		switch (pos) {
		case "Bramkarz":	pos = "GK"; break;
		
		case "Obrońca lewy": pos = "D L"; break;
		case "Obrońca środkowy": pos = "D C"; break;
		case "Obrońca prawy": pos = "D R"; break;
		case "Obrońca środkowy/prawy": pos = "D CR"; break;
		case "Obrońca prawy/środkowy": pos = "D RC"; break;
		case "Obrońca lewy/prawy": pos = "D LR"; break;
		case "Obrońca prawy/lewy": pos = "D RL"; break;
		case "Obrońca lewy/środkowy": pos = "D LC"; break;
		case "Obrońca środkowy/lewy": pos = "D CL"; break;
		
		case "Obrońca/Defensywny pomocnik lewy": pos = "D/DM L"; break;
		case "Defensywny pomocnik/Obrońca lewy": pos = "DM/D L"; break;
		case "Obrońca/Defensywny pomocnik prawy": pos = "D/DM R"; break;
		case "Defensywny pomocnik/Obrońca prawy": pos = "DM/D R"; break;
		case "Obrońca/Defensywny pomocnik środkowy": pos = "D/DM C"; break;
		case "Defensywny pomocnik/Obrońca środkowy": pos = "DM/D C"; break;
		
		case "Obrońca/Pomocnik lewy": pos = "D/M L"; break;
		case "Pomocnik/Obrońca lewy": pos = "M/D L"; break;
		case "Obrońca/Pomocnik prawy": pos = "D/M R"; break;
		case "Pomocnik/Obrońca prawy": pos = "M/D R"; break;
		case "Obrońca/Pomocnik środkowy": pos = "D/M C"; break;
		case "Pomocnik/Obrońca środkowy": pos = "M/D C"; break;
		
		case "Obrońca/Ofensywny pomocnik lewy": pos = "D/OM L"; break;
		case "Ofensywny pomocnik/Obrońca lewy": pos = "OM/D L"; break;
		case "Obrońca/Ofensywny pomocnik prawy": pos = "D/OM R"; break;
		case "Ofensywny pomocnik/Obrońca prawy": pos = "OM/D R"; break;
		case "Obrońca/Ofensywny pomocnik środkowy": pos = "D/OM C"; break;
		case "Ofensywny pomocnik/Obrońca środkowy": pos = "OM/D C"; break;
		
		case "Obrońca lewy/Napastnik": pos = "D L, F"; break; 
        case "Obrońca środkowy/Napastnik": pos = "D C, F"; break; 
        case "Obrońca prawy/Napastnik": pos = "D R, F"; break; 
        case "Napastnik/Obrońca lewy": pos = "F, D L"; break; 
        case "Napastnik/Obrońca środkowy": pos = "F, D C"; break; 
        case "Napastnik/Obrońca prawy": pos = "F, D R"; break; 
		
		case "Defensywny pomocnik lewy": pos = "DM L"; break;
		case "Defensywny pomocnik środkowy": pos = "DM C"; break;
		case "Defensywny pomocnik prawy": pos = "DM R"; break;
		case "Defensywny pomocnik lewy/środkowy": pos = "DM LC"; break;
		case "Defensywny pomocnik środkowy/lewy": pos = "DM CL"; break;
		case "Defensywny pomocnik środkowy/prawy": pos = "DM CR"; break;
		case "Defensywny pomocnik prawy/środkowy": pos = "DM RC"; break;
		case "Defensywny pomocnik lewy/prawy": pos = "DM LR"; break;
		case "Defensywny pomocnik prawy/lewy": pos = "DM RL"; break;
		
		case "Defensywny pomocnik/Pomocnik lewy": pos = "DM/M L"; break;
		case "Pomocnik/Defensywny pomocnik lewy": pos = "M/DM L"; break;
		case "Defensywny pomocnik/Pomocnik środkowy": pos = "DM/M C"; break;
		case "Pomocnik/Defensywny pomocnik środkowy": pos = "M/DM C"; break;
		case "Defensywny pomocnik/Pomocnik prawy": pos = "DM/M R"; break;
		case "Pomocnik/Defensywny pomocnik prawy": pos = "M/DM R"; break;
		
		case "Defensywny pomocnik/Ofensywny pomocnik lewy": pos = "DM/OM L"; break;
		case "Ofensywny pomocnik/Defensywny pomocnik lewy": pos = "OM/DM L"; break;
		case "Defensywny pomocnik/Ofensywny pomocnik środkowy": pos = "DM/OM C"; break;
		case "Ofensywny pomocnik/Defensywny pomocnik środkowy": pos = "OM/DM C"; break;
		case "Defensywny pomocnik/Ofensywny pomocnik prawy": pos = "DM/OM R"; break;
		case "Ofensywny pomocnik/Defensywny pomocnik prawy": pos = "OM/DM R"; break;
		
		case "Defensywny pomocnik lewy/Napastnik": pos = "DM L, F"; break;
		case "Napastnik/Defensywny pomocnik lewy": pos = "F, DM L"; break;
		case "Defensywny pomocnik środkowy/Napastnik": pos = "DM C, F"; break;
		case "Napastnik/Defensywny pomocnik środkowy": pos = "F, DM C"; break;
		case "Defensywny pomocnik prawy/Napastnik": pos = "DM R, F"; break;
		case "Napastnik/Defensywny pomocnik prawy": pos = "F, DM R"; break;
		
		case "Pomocnik lewy": pos = "M L"; break;
		case "Pomocnik środkowy": pos = "M C"; break;
		case "Pomocnik prawy": pos = "M R"; break;
		case "Pomocnik lewy/środkowy": pos = "M LC"; break;
		case "Pomocnik środkowy/lewy": pos = "M CL"; break;
		case "Pomocnik lewy/prawy": pos = "M LR"; break;
		case "Pomocnik prawy/lewy": pos = "M RL"; break;
		case "Pomocnik środkowy/prawy": pos = "M CR"; break;
		case "Pomocnik prawy/środkowy": pos = "M RC"; break;
		
		case "Pomocnik lewy/Napastnik": pos = "M L, F"; break;
		case "Pomocnik środkowy/Napastnik": pos = "M C, F"; break;
		case "Pomocnik prawy/Napastnik": pos = "M R, F"; break;
		case "Napastnik/Pomocnik lewy": pos = "F, M L"; break;
		case "Napastnik/Pomocnik środkowy": pos = "F, M C"; break;
		case "Napastnik/Pomocnik prawy": pos = "F, M R"; break;
	
		
		case "Pomocnik/Ofensywny pomocnik lewy": pos = "M/OM L"; break;
		case "Ofensywny pomocnik/Pomocnik lewy": pos = "OM/M L"; break;
		case "Pomocnik/Ofensywny pomocnik środkowy": pos = "M/OM C"; break;
		case "Ofensywny pomocnik/Pomocnik środkowy": pos = "OM/M C"; break;
		case "Pomocnik/Ofensywny pomocnik prawy": pos = "M/OM R"; break;
		case "Ofensywny pomocnik/Pomocnik prawy": pos = "OM/M R"; break;
		
		case "Ofensywny pomocnik lewy": pos = "OM L"; break;
		case "Ofensywny pomocnik środkowy": pos = "OM C"; break;
		case "Ofensywny pomocnik prawy": pos = "OM R"; break;
		case "Ofensywny pomocnik lewy/środkowy": pos = "OM LC"; break;
		case "Ofensywny pomocnik środkowy/lewy": pos = "OM CL"; break;
		case "Ofensywny pomocnik środkowy/prawy": pos = "OM CR"; break;
		case "Ofensywny pomocnik prawy/środkowy": pos = "OM RC"; break;
		case "Ofensywny pomocnik lewy/prawy": pos = "OM LR"; break
		case "Ofensywny pomocnik prawy/lewy": pos = "OM RL"; break
		
		case "Ofensywny pomocnik lewy/Napastnik": pos = "OM L, F"; break;
		case "Napastnik/Ofensywny pomocnik lewy": pos = "F, OM L "; break;
		case "Ofensywny pomocnik środkowy/Napastnik": pos = "OM C, F"; break;
		case "Napastnik/Ofensywny pomocnik środkowy": pos = "F, OM C"; break;
		case "Ofensywny pomocnik prawy/Napastnik": pos = "OM R, F"; break;
		case "Napastnik/Ofensywny pomocnik prawy": pos = "F, OM R"; break;
		
		case "Napastnik": pos = "F"; break;
		
		default: alert("TM2.0 currently only works in English. Please contact me if you want a different language version.")
		}

		//alert ("pos: " + pos)
		stae=parseInt(stae);
		kon=parseInt(kon);
		ges=parseInt(ges);
		man=parseInt(man);
		zwe=parseInt(zwe);
		lau=parseInt(lau);
		ste=parseInt(ste);
		pass=parseInt(pass);
		fla=parseInt(fla);
		tec=parseInt(tec);
		kop=parseInt(kop);
		tor=parseInt(tor);
		wei=parseInt(wei);
		sta=parseInt(sta);
		abw=parseInt(abw);
		
		// Skillsummen berechnen je nachdem wie deinen Positionen heissen
				
	switch (pos) {

		


	default:
		var skillsumme = "Unknown Position";

}

		if(typeof skillsumme_str == 'undefined')
		{
			skillsumme=parseFloat(skillsumme.toFixed(2));
		}
		else{
			skillsumme=skillsumme_str;
		}
	
	
//	Bereich zum Kopieren der Skills

/*	var div2 = document.createElement('div');
	div2.innerHTML="<div id=\"DB\" style=\"position: fixed; background-color: white; color: gray; bottom: 2px; right: 5px; height: 35px; width: 350px; -moz-opacity: .8; text-align: left; border: 2px #333333 outset; display:inline;\">" + name + "; (" + id + "); " + pos + "; " + stae + "; " + kon + "; " + ges + "; " + man + "; " + zwe + "; " + lau + "; " + ste + "; " + pass + "; " + fla + "; " + tec + "; " + kop + "; " + tor + "; " + wei + "; " + sta + "; " + skillsumme + "; " + rou + "; " + gehalt + "; " + asi + "</div>";
	document.body.appendChild(div2);
*/
//	var area_phy = stae + kon + ges + kop;
//	var area_tac = man + zwe + lau + ste;
	if ((pos == "D/DM L") || (pos == "D/DM R")) {
		var skillworou = (skillsumme1)/(1+rou_factor*rou);
		skillworou=parseFloat(skillworou.toFixed(2));
		var effect_rou = skillsumme1-skillworou;
		effect_rou=parseFloat(effect_rou.toFixed(2));
	}
	else if ((pos == "DM/M L") || (pos == "DM/M C") || (pos == "DM/M R") || (pos == "D/DM C") || (pos == "D CR") || (pos == "D LC") || (pos == "DM LC") || (pos == "DM CR") || (pos == "M CR") || (pos == "M LC") || (pos == "M/OM C") || (pos == "M/OM L") || (pos == "M/OM R") || (pos == "OM CR") || (pos == "OM LC") || (pos == "OM C, F") || (pos == "OM L, F") || (pos == "OM R, F"))  {
		var skillworou1 = (skillsumme1)/(1+rou_factor*rou);
		var skillworou2 = (skillsumme2)/(1+rou_factor*rou);
		skillworou1 = new String(skillworou1.toFixed(2));
		skillworou2 = new String(skillworou2.toFixed(2));
		var skillworou = skillworou1 + "/" + skillworou2;
		
		var effect_rou1 = skillsumme1-skillworou1;
		var effect_rou2 = skillsumme2-skillworou2;
		effect_rou1 = new String(effect_rou1.toFixed(2));
		effect_rou2 = new String(effect_rou2.toFixed(2));
		effect_rou = effect_rou1 + "/" + effect_rou2;		
	}
	else {
		var skillworou = (skillsumme)/(1+rou_factor*rou);
		skillworou=parseFloat(skillworou.toFixed(2));
		var effect_rou = skillsumme-skillworou;
		effect_rou=parseFloat(effect_rou.toFixed(2));
	}

	switch(pos) {
		case("GK"): 
		//var area_tec = "tba";
		//var area_tac = "tba";
		//var area_phy = "tba";
		var area_tec = tec + pass + sta + abw;
		var area_phy = stae + kon + ges + tor;
		var area_tac = fla + wei + kop;
		break;
		
		default:
		var area_phy = stae + kon + ges + kop; 
		var area_tac = man + zwe + lau + ste;		
		var area_tec = pass + fla + tec + tor + wei + sta;
		
	}
	var skillsum = area_phy + area_tec + area_tac;
	
	
	if (PlayerDataPlus == "yes") {
	
		if (PlayerDataPlusPosition == "topleft")  {
	
			var div_area = document.createElement('div');
			div_area.innerHTML="<div id=\"area\" style=\"position: absolute; z-index: 1000; background: #5F8D2D; color: #ff9900; top: 333px; left: 375px; width: 177px; padding-left: 5px; -moz-opacity: .8; text-align: middle; color: gold; border: 2px #275502 outset; display:inline;\"><p style=\"text-decoration: underline;\"><b>Dane Zawodnika:<\p><table style=\"margin-top: -1em; margin-left: 1em; margin-bottom: 1em;\"><tr><td>PhySum: " + area_phy + "</td><tr><td>TacSum: " + area_tac + " </td><tr><td>TecSum: " + area_tec + " </td><tr><td>AllSum: " + skillsum + "</td></tr></table></b></div>";
			document.body.appendChild(div_area);
			
		}
		else if (PlayerDataPlusPosition == "bottomleft")  {
		
			var div_area = document.createElement('div');
			div_area.innerHTML="<div id=\"area\" style=\"position: fixed; z-index: 1000; background: #5F8D2D; color: #ff9900; bottom: 10px; left: 25px; width: 250px; padding-left: 5px; -moz-opacity: .8; text-align: middle; color: gold; border: 2px #275502 outset; display:inline;\"><p style=\"text-decoration: underline;\"><b>PlayerData+:<\p><table style=\"margin-top: -1em; margin-left: 1em; margin-bottom: 1em;\"><tr><td>PhySum: " + area_phy + "</td><td>TB-Rating: " + skillsumme + " </td></tr><tr><td>TacSum: " + area_tac + " </td><td>RouEffect: " + effect_rou + " </td></tr><tr><td>TecSum: " + area_tec + " </td><td>TB-Pure: " + skillworou + "</td></tr><tr><td>AllSum: " + skillsum + "</td></tr></table></b></div>";
			document.body.appendChild(div_area);
			
		}
		else {
		
			var div_area = document.createElement('div');
			div_area.innerHTML="<div id=\"area\" style=\"position: absolute; z-index: 1000; width: 177px; margin-top: 15px; background: #5F8D2D; color: #ff9900; padding-left: 5px; -moz-opacity: .8; text-align: middle; color: gold; border: 2px #275502 outset; display:inline;\"><p style=\"text-decoration: underline;\"><b>Dane Zawodnika:<\p><table style=\"margin-top: -1em; margin-bottom: 1em;\"><tr><td>PhySum: </td><td>" + area_phy + "</td></tr><tr><td>TacSum: </td><td>" + area_tac + " </td></tr><tr><td>TecSum: </td><td>" + area_tec + " </td></tr><tr><td>AllSum: </td><td>" + skillsum + "</td></tr><tr><td>&nbsp;</td></tr><tr><td>Rating: </td><td>" + skillsumme + " </td></tr><tr><td>RouEffect: </td><td>" + effect_rou + " </td></tr><tr><td>TB-Pure: </td><td>" + skillworou + "</td></tr></table></b></div>";
			document.getElementsByTagName("div")[18].appendChild(div_area);
		
		}
	}	
	else {
	
	}
	
	/****************************************************************************************/
	/* Inject form                                        */
	/****************************************************************************************/

/*	var TMDB = document.createElement("span"); // erzeugt ein html-span-tag
	
	var Tform="<form action='http://patrick-meurer.de/tmdb/tmdb.php' target='_self' accept-charset='UTF-8' method='post' style='display:inline;'>";	

	Tform=Tform+"<input name='id' type='hidden' value='"+id+"' />";
	Tform=Tform+"<input name='name' type='hidden' value='"+name+"' />";
	Tform=Tform+"<input name='alter' type='hidden' value='"+alter+"' />";
	Tform=Tform+"<input name='clubid' type='hidden' value='"+clubid+"' />";
//	Tform=Tform+"<input name='nplayer' type='hidden' value='"+nplayer+"' />";
	Tform=Tform+"<input name='pos' type='hidden' value='"+pos+"' />";
	Tform=Tform+"<input name='skillsumme' type='hidden' value='"+skillsumme+"' />";
	Tform=Tform+"<input name='stae' type='hidden' value='"+stae+"' />";
	Tform=Tform+"<input name='kon' type='hidden' value='"+kon+"' />";
	Tform=Tform+"<input name='ges' type='hidden' value='"+ges+"' />";
	Tform=Tform+"<input name='man' type='hidden' value='"+man+"' />";
	Tform=Tform+"<input name='zwe' type='hidden' value='"+zwe+"' />";
	Tform=Tform+"<input name='lau' type='hidden' value='"+lau+"' />";
	Tform=Tform+"<input name='ste' type='hidden' value='"+ste+"' />";
	Tform=Tform+"<input name='pass' type='hidden' value='"+pass+"' />";
	Tform=Tform+"<input name='fla' type='hidden' value='"+fla+"' />";
	Tform=Tform+"<input name='tec' type='hidden' value='"+tec+"' />";
	Tform=Tform+"<input name='kop' type='hidden' value='"+kop+"' />";
	Tform=Tform+"<input name='tor' type='hidden' value='"+tor+"' />";
	Tform=Tform+"<input name='wei' type='hidden' value='"+wei+"' />";
	Tform=Tform+"<input name='sta' type='hidden' value='"+sta+"' />";
	Tform=Tform+"<input name='rou' type='hidden' value='"+rou+"' />";
	Tform=Tform+"<input name='gehalt' type='hidden' value='"+gehalt+"' />";
	Tform=Tform+"<input name='asi' type='hidden' value='"+asi+"' />";
	Tform=Tform+"<input name='status' type='hidden' value='"+status+"' />";
	Tform=Tform+"<input type='submit' name='button' value='Absenden'></form><br />";
*/	
//	alert ("Summe: " + skillsumme)
} // if showprofile
}
if (myurl.match(/.*/))
{
/*	
function hide (member) {
        if (document.getElementById) {
            if (document.getElementById(member).style.display = "inline") {
                document.getElementById(member).style.display = "none";
            } else {
                document.getElementById(member).style.display = "inline";
            }
        }
}
*/
/*var divswitch = document.createElement('div');
appdivswitch = document.body.appendChild(divswitch);
appdivswitch.innerHTML = '<div><a href="javascript:ToggleMenu();">Menu</a></div>';
*/

if (hovermenu == "yes") {

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

    $.noConflict();
    jQuery(document).ready(function($) {
    $('#top_menu ul li a').bind('mouseover', function() { 
		top_menu["change"]($(this).attr('top_menu'), false);
	});
  });
});

}
else  {

}


//Menu bottom right
if (menubar == "yes") {
var div1 = document.createElement('div');
appdiv1 = document.body.appendChild(div1);
appdiv1.innerHTML = '<div id="menu" style="position: fixed; z-index: 1000; bottom: 0px; right: 85px; height: 30px; width: 150px; -moz-opacity: .8; text-align: left; border: 2px #6C9922 outset; background: url(http://www.patrick-meurer.de/tm/TrophyBuddy_menu2.png);">&nbsp;&nbsp;<span style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/club/"><img src="http://patrick-meurer.de/tm/trophybuddy/home.png" title="' + Home + '" style="height: 20px;"></a></span>&nbsp;&nbsp;<span style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/home/box"><img src="http://patrick-meurer.de/tm/trophybuddy/mail.png" title="' + CheckYourMails + '" style="height: 20px;"></a></span>&nbsp;&nbsp;<span style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/league/"><img src="http://patrick-meurer.de/tm/trophybuddy/league.png" title="' + League + '" style="height: 20px;"></a></span>&nbsp;&nbsp;&nbsp;<span style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/league/en/5/124/#pa"><img src="http://iv.pl/images/52769207023949266399.png" title="' + Cup + '" style="height: 20px;"></a></span>&nbsp;&nbsp;&nbsp;<span style="position:relative; top:5px;left:0px"><a href="http://trophymanager.com/?logout"><img src="http://patrick-meurer.de/tm/trophybuddy/logout.png" title="' + Exit + '" style="height: 20px;"></a></span></div>';
}
else {
}
/*
var TMDB = document.createElement("span"); // erzeugt ein html-span-tag
TMDB.innerHTML=Tform;
document.getElementById("lastspan").appendChild(TMDB);
*/
if (sidebar == "yes") {
	if (myclubid == "") {
	Navigationsbereich
	var div = document.createElement('div');
	//appdiv = document.body.appendChild(div);
	appdiv.innerHTML = '<div id="tbuddy" style="position: fixed; z-index: 1000; top: 150px; left: 25px; height: 500px; width: 130px; -moz-opacity: .8; text-align: left; border: 2px #333333 outset; display:inline;"><img src="http://patrick-meurer.de/tm/TrophyBuddy21.png"><li><a href="http://http://trophymanager.com/club//" target="_self" style="list-style-type:disc; margin-top: 0px; padding-left: 0px;" title="' + Team + '">' + Team + ' </a></li><li><a href="http://trophymanager.com/bids/" target="_self" style="font-size: 10px; color: gold;" title="' + GoCurrentBids + '">' + CurrentBids + '</a></li><li><a href="http://trophymanager.com/tactics/" target="_self" style="font-size: 10px; color: gold;" title="Go to Tactics">' + Tactics + '</a></li><li><a href="http://trophymanager.com/assistant-manager/" target="_self" style="font-size: 10px; color: gold;" title="' + GoYouthAcademy + '">' + YouthAcademy + '</a></li><li><a href="http://trophymanager.com/finances/" target="_self" style="font-size: 10px; color: gold;" title="' + GoYouthAcademyy + '">' + YouthAcademyy + '</a></li><li><a href="http://trophymanager.com/youth-development/" target="_self" style="font-size: 10px; color: gold;" title="' + GoPlayerNotes + '">' + PlayerNotes + '</a></li></ul><p style="text-decoration: underline;">' + Staff + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/coaches/hire/" target="_self" style="font-size: 10px; color: gold;" title="' + GoHireCoaches + '">' + HireCoaches + '</a> | <a href="http://trophymanager.com/scouts/hire/" target="_self" style="font-size: 10px; color: gold;" title="' + GoHireScouts + '">' + HireScouts + '</a></li><li><a href="http://trophymanager.com/scouts/" target="_self" style="font-size: 10px; color: gold;" title="' + GoScoutReports + '">' + ScoutReports + '</a></li><li><a href="http://trophymanager.com/coaches/" target="_self" style="font-size: 10px; color: gold;" titles="' + GoMyCoaches + '">' + MyCoaches + '</a> | <a href="http://trophymanager.com/scouts/" target="_self" style="font-size: 10px; color: gold;" titles="' + GoMyScouts + '">' + MyScouts + '</a></li></ul><p style="text-decoration: underline;">' + Training + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/training-overview/advanced/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTrainingOverview + '">' + TrainingOverview + '</a></li><li><a href="http://trophymanager.com/training/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTrainingTeams + '">' + TrainingTeams + '</a></li></ul><p style="text-decoration: underline;">' + Community + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/forum/" target="_self" style="font-size: 10px; color: gold;" title="' + GoForum + '">' + Forum + '</a> ( <a href="http://trophymanager.com/forum/pl/help/" title="' + GoTransferForum + '">P</a> | <a href="http://trophymanager.com/forum/int/general/" title="' + GoGeneralForum + '">G</a> | <a href="http://trophymanager.com/forum/int/announcements/" title="' + GoAnnouncementForum + '">A</a> )</li><li><a href="http://trophymanager.com/forum/int/recent-posts/" target="_self" style="font-size: 10px; color: gold;" title="' + GoYourRecentPosts + '">' + YourRecentPosts + '</a></li><li><a href="http://trophymanager.com/user-guide/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTMUserGuide + '">' + TMUserGuide + '</a></li><li><a href="http://trophymanager.com/forum/conference/18/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTBConference + '">' + TBConference + '</a></li></ul></div>';
	//appdiv.innerHTML = '<div id="tbuddy" style="position: fixed; z-index: 1000; top: 150px; left: 25px; height: 500px; width: 130px; -moz-opacity: .8; text-align: left; border: 2px #333333 outset; display:inline;"><img src="http://patrick-meurer.de/tm/TrophyBuddy21.png"><li><a href="http://trophymanager.com/club/" target="_self" style="list-style-type:disc; margin-top: 0px; padding-left: 0px;" title="' + Team + '">' + Team + ' </a></li><li><a href="http://trophymanager.com/bids/" target="_self" style="font-size: 10px; color: gold;" title="' + GoCurrentBids + '">' + CurrentBids + '</a></li><li><a href="http://trophymanager.com/tactics/" target="_self" style="font-size: 10px; color: gold;" title="Go to Tactics">' + Tactics + '</a></li><li><a href="http://trophymanager.com/assistant-manager/" target="_self" style="font-size: 10px; color: gold;" title="' + GoYouthAcademy + '">' + YouthAcademy + '</a></li><li><a href="http://trophymanager.com/finances/" target="_self" style="font-size: 10px; color: gold;" title="' + GoYouthAcademyy + '">' + YouthAcademyy + '</a></li><li><a href="http://trophymanager.com/youth-development/" target="_self" style="font-size: 10px; color: gold;" title="' + GoPlayerNotes + '>' + PlayerNotes + '</a></li></ul><p style="text-decoration: underline;">' + Staff + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/coaches/hire/" target="_self" style="font-size: 10px; color: gold;" title="' + GoHireCoaches + '">' + HireCoaches + '</a> | <a href="http://trophymanager.com/scouts/hire/" target="_self" style="font-size: 10px; color: gold;" title="' + GoHireScouts + '">' + HireScouts + '</a></li><li><a href="http://trophymanager.com/scouts/" target="_self" style="font-size: 10px; color: gold;" title="' + GoScoutReports + '">' + ScoutReports + '</a></li><li><a href="http://trophymanager.com/coaches/" target="_self" style="font-size: 10px; color: gold;" titles="' + GoMyCoaches + '">' + MyCoaches + '</a> | <a href="http://trophymanager.com/scouts/" target="_self" style="font-size: 10px; color: gold;" titles="' + GoMyScouts + '">' + MyScouts + '</a></li></ul><p style="text-decoration: underline;">' + Training + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/training-overview/advanced/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTrainingOverview + '">' + TrainingOverview + '</a></li><li><a href="http://trophymanager.com/training/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTrainingTeams + '">' + TrainingTeams + '</a></li></ul><p style="text-decoration: underline;">' + Community + '</p><ul style="list-style-type:disc; margin-top: 0px; padding-left: 20px;"><li><a href="http://trophymanager.com/forum/" target="_self" style="font-size: 10px; color: gold;" title="' + GoForum + '">' + Forum + '</a> ( <a href="http://trophymanager.com/forum/pl/help/" title="' + GoTransferForum + '">P</a> | <a href="http://trophymanager.com/forum/int/general/" title="' + GoGeneralForum + '">G</a> | <a href="http://trophymanager.com/forum/int/announcements/" title="' + GoAnnouncementForum + '">A</a> | <a href="http://trophymanager.com/forum/federations" title="' + GoFederations + '">F</a> )</li><li><a href="http://trophymanager.com/user-guide/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTMUserGuide + '">' + TMUserGuide + '</a></li><li><a href="http://trophymanager.com/forum/conference/18/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTBConference + '">' + TBConference + '</a></li></ul></div>';	
	}
	else {
	//Navigationsbereich
	var div = document.createElement('div');
	appdiv = document.body.appendChild(div);
	appdiv.innerHTML = '<div id="tbuddy" style="position: fixed; z-index: 1000; top: 130px; left: 20px; height: 555px; width: 124px; -moz-opacity: .8; text-align: left; border: 2px #275502 outset; display:inline;"><span style="position:relative; top:0px;left:0px"><a href="http://trophymanager.com/forum/int/announcements/"><img src="http://iv.pl/images/09647191584926189472.gif" title="' + CheckYourMailss + '" style="height: 42px;"></a></span></p></p><span><a href="http://trophymanager.com/club/" target="_self" style="font-size: margin-top: 0px; padding-left: 0px;" title="' + Team + '">' + Team + '<ul style="list-style-type:disc; margin-top: 0px; padding-left: 10px;"></a></span><li><a href="http://trophymanager.com/bids/" target="_self" style="font-size: 10px; color: gold;" title="' + GoCurrentBids + '">' + CurrentBids + '</a></li><li><a href="http://trophymanager.com/club/' + myclubid + '/squad/" target="_self" style="font-size: 10px; color: gold;" title="Squad Overview">' + Squad + '</a></li><li><a href="http://trophymanager.com/tactics/" target="_self" style="font-size: 10px; color: gold;" title="Go to Tactics">' + Tactics + '</a></li><li><a href="http://trophymanager.com/assistant-manager/" target="_self" style="font-size: 10px; color: gold;" title="Go to Assistant Manager">' + YouthAcademy + '</a></li><li><a href="http://trophymanager.com/finances/" target="_self" style="font-size: 10px; color: gold;" title="Finances">' + YouthAcademyy + '</a></li><li><a href="http://trophymanager.com/youth-development/" target="_self" style="font-size: 10px; color: gold;" title="' + GoPlayerNotes + '">' + PlayerNotes + '</a></li><li><a href="http://trophymanager.com/_test_t" target="_self" style="font-size: 10px; color: gold;" title="Fans">' + PlayerNotess + '</a></li></ul></p><a href="http://trophymanager.com/teamsters/" target="_self" style="font-size: margin-top: 0px; padding-left: 0px;" title="' + Staff + '">' + Staff+ '<ul style="list-style-type:disc; margin-top: 0px; padding-left: 10px;"><li><a href="http://trophymanager.com/scouts/hire/" target="_self" style="font-size: 10px; color: gold;" title="' + GoHireScouts + '">' + HireScouts + '</a></li><li><a href="http://trophymanager.com/scouts/" target="_self" style="font-size: 10px; color: gold;" title="' + GoScoutReports + '">' + ScoutReports + '</a></li></li></ul></p><a href="http://trophymanager.com/training-overview/simple/" target="_self" style="font-size: margin-top: 0px; padding-left: 0px;" title="' + Training + '">' + Training+ '<ul style="list-style-type:disc; margin-top: 0px; padding-left: 10px;"></a><li><a href="http://trophymanager.com/training-overview/advanced/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTrainingOverview + '">' + TrainingOverview + '</a></li><li><a href="http://trophymanager.com/training/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTrainingTeams + '">' + TrainingTeams + '</a></li></ul></p><a href="http://trophymanager.com/forum/int/conferences/" target="_self" style="font-size: margin-top: 0px; padding-left: 0px;" title="' + Community + '">' + Community + '<ul style="list-style-type:disc; margin-top: 0px; padding-left: 10px;"></a><li><a href="http://trophymanager.com/forum/" target="_self" style="font-size: 10px; color: gold;" title="' + GoForum + '">' + Forum + '</a> ( <a href="http://trophymanager.com/forum/int/transfer/" title="' + GoTransferForum + '">T</a> | <a href="http://trophymanager.com/forum/int/general/" title="' + GoGeneralForum + '">G</a> | <a href="http://trophymanager.com/forum/int/bugs/" title="' + GoAnnouncementForum + '">B</a> )</li><li><a href="http://trophymanager.com/forum/int/recent-posts/" target="_self" style="font-size: 10px; color: gold;" title="' + GoYourRecentPosts + '">' + YourRecentPosts + '</a></li><li><a href="http://trophymanager.com/user-guide/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTMUserGuide + '">' + TMUserGuide + '</a></li><li><a href="http://trophymanager.com/forum/conference/18/" target="_self" style="font-size: 10px; color: gold;" title="' + GoTBConference + '">' + TBConference + '</a></li><p></p><p></p><p></p><span style="position:relative; top:1px;left:-10px"><a href="http://trophymanager.com/free-pro/"><img src="http://iv.pl/images/55650073709049284949.gif" title="Free Pro" style="height: 22px;"></a></span></div>';
	}
}
else {
}
}
//Transferseite
