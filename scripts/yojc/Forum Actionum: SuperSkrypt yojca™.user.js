// ==UserScript==
// @name			Forum Actionum: SuperSkrypt yojca™
// @description		Dodaje takie tam fajerwerki do forume.
// @author			yojo2
// @namespace		https://greasyfork.org/pl/scripts/6458-forum-actionum-superskrypt-yojca
// @version			1.29
// @include			http://forum.cdaction.pl/*
// @run-at			document-end
// @grant			none
// @icon			http://yojc.is-best.net/favicon.ico
// @resource		http://media.gtanet.com/gtaforums/images/medal.png
// ==/UserScript==

/*jshint multistr: true, noarg: false, -W082 */
/*global $:false, jQuery:false, ipb:false */


(function () {
	function doStuff() {
		var yojcVersion = "1.29";
		var userNick = jQuery("#user_link").text().trim();
		var userId = parseInt(jQuery("#user_link").attr("href").replace(/\D+/, ""), 10);
		
		// tak bo cośtam
		jQuery.noConflict();
		
		// jak to ciulstwo zacznie w końcu działać to sie włączy
		/*
		window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObject) {
			var errMsg; //check the errorObject as IE and FF don't pass it through (yet)
			
			if (errorObject && errorObject !== undefined) {
				errMsg = errorObject.message;
				column = "\nNumer kolumny:" + columnNumber;
			} else {
				errMsg = errorMsg;
				column = "";
			}
			
			var _options = {
				type: 'pane',
				modal: true,
				initial: '<div><h3>SuperSkrypt yojca &trade; napotkał błąd!</h3>\
					<div class="ipsPad ipsForm_center"><p>Wykonywanie SuperSkryptu yojca™ zostało przerwane przez błąd.<br />Zostaw info o błędzie oraz treść komunikatu tutaj: <a href=\"http://forum.cdaction.pl/index.php?showtopic=262666\" title=\"Temat o skrypcie na Forum Actionum\">SuperSkrypt yojca&trade;</a><br />Napisz wszystko, co możesz uznać za przydatne przy próbie powtórzenia błędu.<br />Przepraszam za niedogodności.<br/><br />Treść błędu:<br /><textarea style="width: 450px; height: 200px; font-family: monospace;">[codebox]Wersja skryptu: ' + yojcVersion + '\n\Aktualna strona: ' + window.location.href + '\n\User Agent: ' + navigator.userAgent + '\n\Treść błędu: ' + errMsg + '\n\Numer linii: ' + lineNumber + column + '[/codebox]</textarea></p>\
					<br /><span onclick="ipb.global.popups[\'yojcError\'].hide()" class="clickable ipsButton_secondary important">Zamknij</span></div>',
				hideAtStart: false,
				w: '',
				h: '',
			};
			ipb.global.popups['yojcError'] = new ipb.Popup('confirm',_options);
			
			return false;
		};
		*/
		
		function debug(fun) {
			if (false) {
				var today = new Date();
				console.debug(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "." + today.getMilliseconds() + " # " + fun);
			}
		}
		
		function alertError(id, e) {
			var _options = {
				type: 'pane',
				modal: true,
				initial: '<div><h3>SuperSkrypt yojca &trade; napotkał błąd!</h3>\
					<div class="ipsPad ipsForm_center"><p>Wykonywanie SuperSkryptu yojca™ zostało przerwane przez błąd.<br />Zostaw info o błędzie oraz treść komunikatu tutaj: <a href=\"http://forum.cdaction.pl/index.php?showtopic=262666\" title=\"Temat o skrypcie na Forum Actionum\">SuperSkrypt yojca&trade;</a><br />Napisz wszystko, co możesz uznać za przydatne przy próbie powtórzenia błędu.<br />Przepraszam za niedogodności.<br/><br />Treść błędu (skopiuj i wklej do tematu na forum):<br /><textarea style="width: 450px; height: 200px; font-family: monospace;">[codebox]Wersja skryptu: ' + yojcVersion + '\nFunkcja z błędem: yojc_' + id + '\nAktualna strona: ' + window.location.href + '\n\User Agent: ' + navigator.userAgent + '\n\Treść błędu: ' + e + '\nNumer linii: ' + e.lineNumber + '\nUstawienia skryptu: ' + '[tu będą ustawienia jak mi się zechce zrobić]' + '[/codebox]</textarea></p>\
					<br /><span onclick="ipb.global.popups[\'yojcError\'].hide()" class="clickable ipsButton_secondary important">Zamknij</span></div>',
				hideAtStart: false,
				w: '',
				h: '',
			};
			ipb.global.popups.yojcError = new ipb.Popup('confirm',_options);
		}
		
		// wyciagąnie wartości z ciastek
		// http://www.w3schools.com/js/js_cookies.asp
		
		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for (var i=0; i<ca.length; i++) {
				var c = ca[i].trim();
				if (c.indexOf(name)===0)
					return c.substring(name.length, c.length);
			}
			return "";
		}
		
		// zapisywanie wartości do ciastek
		
		function setCookie(name, val) {
			var expirationDate = new Date();
			expirationDate.setFullYear(expirationDate.getFullYear() + 1);
			
			document.cookie = name + " = " + val + "; path=/; expires=" + expirationDate.toGMTString();
		}
		
		// http://stackoverflow.com/questions/2144386/javascript-delete-cookie
		
		function deleteCookie(name) {
			document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
		
		// http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
		function deromanize(roman) {
			roman = roman.toUpperCase().split('');
			var lookup = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000}, num = 0, val = 0;
			
			while (roman.length) {
				val = lookup[roman.shift()];
				num += val * (val < lookup[roman[0]] ? -1:1);
			}
			return num;
		}
		
		// http://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
		function unescapeHtml(text) {
			var map = {
				'&amp;': '&',
				'&lt;': '<',
				'&gt;': '>',
				'&quot;': '"',
				'&#039;': "'"
			};
			return text.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) { return map[m]; });
		}
		
		function properDate(forumDate, datePrefix) {
			datePrefix = typeof datePrefix !== 'undefined' ? datePrefix : "";
			var regDate, regTime;
			
			if (forumDate.match(datePrefix + "Dzisiaj")) {
				regTime = forumDate.match(/\d{2}:\d{2}/)[0];
				regDate = new Date();
				
				regDate.setHours(parseInt(regTime.match(/\d{2}/g)[0], 10));
				regDate.setMinutes(parseInt(regTime.match(/\d{2}/g)[1], 10));
				regDate.setSeconds(0);
				regDate.setMilliseconds(0);
			}
			else if (forumDate.match(datePrefix + "Wczoraj")) {
				regTime = forumDate.match(/\d{2}:\d{2}/g)[0];
				regDate = new Date();
				regDate.setDate(regDate.getDate() - 1);
				
				regDate.setHours(parseInt(regTime.match(/\d{2}/g)[0], 10));
				regDate.setMinutes(parseInt(regTime.match(/\d{2}/g)[1], 10));
				regDate.setSeconds(0);
				regDate.setMilliseconds(0);
			}
			else {
				var regDateRaw = forumDate.match(/\d{1,2}\s\w{1,4}\s\d{4}/)[0].split(" ");
				regDate = new Date(regDateRaw[2], deromanize(regDateRaw[1])-1, regDateRaw[0]);
			}
			
			return regDate;
		}
		
		// sprawdza czy dana funkcja ma być włączona
		
		function shouldItRun(name) {
			if(localStorage.getItem("yojc_" + name) == "true") {
				debug(name + " should run");
				return true;
			}
			else {
				debug(name + " should not run");
				return false;
			}
		}
		
		// odmienia słowo
		
		function properForm(number, word) {
			if (number == 1)
				return (word === "aktywn" ? word + "y" : word);
				
			number = number.toString();	
			
			if (number[number.length-1] > 1 && number[number.length-1] < 5 && number[number.length-2] != 1)
				return word + (word === "aktywn" ? "e" : "y");
			else
				return word + (word === "aktywn" ? "ych" : "ów");
		}
		
		// sprawdza rangę użytkownika
		
		function userRank() {
			if (jQuery("#admin_bar a[title=\"Panel moderatora\"]").length > 0)
				return true;
			else
				return false;
		}
		
		// sprawdza wyświetlaną stronę
		
		function viewing(name) {
			switch (name) {
				case "profile":
					if ((window.location.href.match("showuser=") || window.location.href.match(/\-m\d+\.html/)) && jQuery(".row_data").length > 0)
						return true;
					else
						return false;
					break;
				
				case "forum":
					if (window.location.href.match("showforum=") || window.location.href.match(/\-f\d+\.html/))
						return true;
					else
						return false;
					break;
				
				case "ignored":
					if (window.location.href.match("ignoredusers"))
						return true;
					else
						return false;
					break;
				
				case "main":
					if (jQuery("#board_stats").length > 0 && !window.location.href.match("blog"))
						return true;
					else
						return false;
					break;
				
				case "msgEdit":
					if (jQuery("#postingform").length > 0)
						return true;
					else
						return false;
					break;
				
				case "privmsg":
					if (window.location.href.match("topicID="))
						return true;
					else
						return false;
					break;
				
				case "settings":
					if (window.location.href.match("area=yojc"))
						return true;
					else
						return false;
					break;
				
				case "topic":
					if (window.location.href.match("showtopic=") || window.location.href.match(/\-t\d+\.html/))
						return true;
					else
						return false;
					break;
				
				case "userCP":
					if (window.location.href.match("module=usercp"))
						return true;
					else
						return false;
					break;
				
				case "newContent":
					if (window.location.href.match("do=viewNewContent"))
						return true;
					else
						return false;
					break;
				
				case "report":
					if (window.location.href.match("do=show_report"))
						return true;
					else
						return false;
					break;
				
				case "mostRep":
					if (window.location.href.match("module=reputation&section=most"))
						return true;
					else
						return false;
					break;
				
				case "blogMain":
					if (window.location.href.match("app=blog&type=dash") || window.location.href.match("app=blog&s=") || window.location.href.match(/app\=blog$/))
						return true;
					else
						return false;
					break;
				
				case "blogList":
					if (window.location.href.match("app=blog") || window.location.href.match("type=all"))
						return true;
					else
						return false;
					break;
				
				case "blogView":
					if (window.location.href.match("app=blog") || window.location.href.match("showentry="))
						return true;
					else
						return false;
					break;
				
				case "deletedPosts":
					if (window.location.href.match("tab=deletedposts"))
						return true;
					else
						return false;
					break;
				
				case "editMember":
					if (window.location.href.match("do=editmember"))
						return true;
					else
						return false;
					break;
				
				default:
					return false;
			}
		}
		
		// sprawdza ustawioną skórkę
		
		function isDarkSkin() {
			if(jQuery("#nav_wrap").length > 0)
				return true;
			else
				return false;
		}
		
		// tworzenie linku do panelu ustawień
		
		function createLinkToPanel() {
			debug(arguments.callee.name);
			
			jQuery("<li/>", {
				id: "yojc",
				style: "z-index: 10000;"
			}).appendTo("#links");
			
			jQuery("<a/>", {
				href: "http://forum.cdaction.pl/index.php?app=core&module=usercp&tab=core&area=yojc",
				title: "Ustawienia SuperSkryptu",
				text: "SuperSkrypt yojca™",
				style: "z-index: 10000;"
			}).appendTo("#yojc");
		}
		
		// tworzenie zakładki z ustawieniami skryptu
		
		function createSettingsPanelTab() {
			if (!viewing("userCP"))
				return;
			
			debug(arguments.callee.name);
			
			jQuery("<li/>", {
				id: "yojcTab"
			}).append(jQuery("<a/>", {
				href: "http://forum.cdaction.pl/index.php?app=core&module=usercp&tab=core&area=yojc",
				title: "Ustawienia SuperSkryptu",
				text: "SuperSkrypt yojca™"
			})).appendTo("#usercp_tabs > ul");
		}
		
		// tworzenie strony z ustawieniami
		
		function createSettingsPanel() {
			try {
				if (!viewing("settings"))
					return;
				
				debug(arguments.callee.name);
				
				// tworzenie checkboxa
				
				function createCheckbox(id, label, desc) {
					return jQuery('<ul>\
						<li class="field checkbox">\
							<input class="input_check" id="' + id + '" name="' + id + '" value="1" ' + (id === "yojc_changeYTEmbedsOpts" ? 'type="number" min="0" style="width: 30px"' : 'type="checkbox"') + '> <label for="' + id + '">' + label + '</label><br>\
							<span class="desc lighter">' + desc + '</span>\
						</li>\
					</ul>');
				}
				
				// zwijanie/rozwijanie dodatkowych opcji
				
				function createClickEvent(id) {
					if (!jQuery("#" + id).prop('checked'))
						jQuery("#" + id).parent().parent().next().hide();
					
					jQuery("#" + id).click(function() {
						jQuery(this).parent().parent().next().slideToggle();
					});
				}
				
				var polishMonthNames = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
				var polishMonthProperNames = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada","grudnia"];
			
				
				jQuery(".ipsType_pagetitle").html("Ustawienia SuperSkryptu yojca&trade;");
				jQuery("#yojcTab").attr("class", "active");
				document.title = "Ustawienia SuperSkryptu yojca™ - Forum Actionum";
				jQuery("div.ipsPad").html("Aktualnie zainstalowana wersja skryptu to <b>" + yojcVersion + "</b>.\
					<br>Teoretycznie aktualizacje powinny się instalować automatycznie, ale w razie czego dostępne są na stronie <a href=\"https://greasyfork.org/pl/scripts/6458-forum-actionum-superskrypt-yojca\" title=\"Strona skryptu na greasyfork.org\">https://greasyfork.org/pl/scripts/6458-forum-actionum-superskrypt-yojca</a>. Tam można również znaleźć historię zmian (changelog) poszczególnych wersji.\
					<br>Wszelkie uwagi proszę zgłaszać w temacie na forum: <a href=\"http://forum.cdaction.pl/index.php?showtopic=262666\" title=\"Temat o skrypcie na Forum Actionum\">SuperSkrypt yojca&trade;</a>. Znajduje się tam także pełny opis każdej z funkcji.\
					<br><br>");
					
				
				// kopiowanie ustawień z pre-1.15
				
				if (getCookie("yojc_ignoreTopics") !== "") {
					jQuery("div.ipsPad").append(jQuery("<div/>", {
						style: "font-size: 11px;",
						class: "message error",
						html: "W wersji 1.16 została zmieniona lokalizacja zapisywanych ustawień - zamiast w ciastkach są przechowywane w window.localStorage. Możesz przenieść stare ustawienia i/lub je całkiem usunąć, jeśli nie chcesz by zaśmiecały ciastka.<br><br>\
					<a class=\"input_submit ipsButton_secondary clickable important\" style=\"padding: 0 10px !important; text-decoration: none;\" title=\"Kliknij, aby przenieść ustawienia z ciastek\">Przenieś ustawienia</a> <a class=\"input_submit ipsButton_secondary clickable\" style=\"padding: 0 10px !important; text-decoration: none;\" title=\"Kliknij, aby usunąć ustawienia z ciastek\">Usuń stare ustawienia</a>"
					}));
					jQuery("div.ipsPad").append(jQuery("<br/>"));
					jQuery("div.ipsPad").append(jQuery("<br/>"));
					
					jQuery("div.ipsPad > .message.error > .input_submit.important").click(function() {
						var _options = {
							type: 'pane',
							modal: true,
							initial: '<div><h3>Potwierdź chęć skopiowania ustawień z ciastek</h3>\
								<div class="ipsPad ipsForm_center"><p>Obecne ustawienia zostaną nadpisane!</p>\
								<br /><span id=\"copyConfirmButton\" class="clickable ipsButton_secondary important">Przenieś</span> <span onclick="ipb.global.popups[\'yojcCookiesToLocal\'].hide()" class="clickable ipsButton_secondary">Anuluj</span></div>',
							hideAtStart: false,
							w: '',
							h: '',
						};
						ipb.global.popups.yojcCookiesToLocal = new ipb.Popup('confirm',_options);
						
						jQuery("#copyConfirmButton").click(function() {
							jQuery("input[id^=yojc_], select[id^=yojc_]").each(function() {
								localStorage.setItem(this.id, getCookie(this.id));
							});
							location.reload();
						});
					});
					
					jQuery("div.ipsPad > .message.error > .input_submit.important + .input_submit").click(function() {
						var _options = {
							type: 'pane',
							modal: true,
							initial: '<div><h3>Potwierdź chęć usunięcia starych ustawień z ciastek</h3>\
								<div class="ipsPad ipsForm_center"><p>Ustawienia z wersji starszych niż 1.16 zostaną usunięte!<br>(ta opcja NIE ruszy ustawień zapisanych po zainstalowaniu wersji 1.16,<br>ona usuwa pozostałości z poprzedniej wersji)</p>\
								<br /><span id=\"purgeConfirmButton\" class="clickable ipsButton_secondary important">Usuń</span> <span onclick="ipb.global.popups[\'yojcPurgeCookies\'].hide()" class="clickable ipsButton_secondary">Anuluj</span></div>',
							hideAtStart: false,
							w: '',
							h: '',
						};
						ipb.global.popups.yojcPurgeCookies = new ipb.Popup('confirm',_options);
						
						jQuery("#purgeConfirmButton").click(function() {
							jQuery("input[id^=yojc_], select[id^=yojc_]").each(function() {
								deleteCookie(this.id);
							});
							location.reload();
						});
					});
				}
				
				// ustawienia dla użytkowników
				
				jQuery("div.ipsPad").append(jQuery("<h2/>", {
					id: "yojcUserHeading",
					class: "ipsType_subtitle ipsSettings_pagetitle",
					text: "Ustawienia dla użytkowników"
				}));
				
				jQuery("div.ipsPad").append(jQuery("<fieldset/>", {
					id: "yojcUserSettings",
					class: "ipsSettings_section"
				}));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_ignoreTopics", "Ignoruj tematy wybranych użytkowników", "Ukrywa z pola widzenia tematy użytkowników (w forach jak i w nowej zawartości), których nie lubisz. Mechanizm działa dokładnie tak samo jak ignorowanie postów."));
				jQuery("#yojcUserSettings").append(jQuery('<div style="margin-left: 0 !important;">\
						<input autocomplete="off" placeholder="Lista użytkowników (oddzielaj przecinkami, wielkość liter bez znaczenia)" class="input_text" id="yojc_ignoreTopicsOpts" style="width: 99% !important" value="' + localStorage.getItem("yojc_ignoreTopicsOpts") + '" type="text">\
					</div>'));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_ignoreBlogEntries", "Ignoruj blogi wybranych użytkowników", "Ukrywa z pola widzenia wpisy użytkowników których nie lubisz. Mechanizm działa dokładnie tak samo jak ignorowanie postów."));
				jQuery("#yojcUserSettings").append(jQuery('<div style="margin-left: 0 !important;">\
						<input autocomplete="off" placeholder="Lista użytkowników (oddzielaj przecinkami, wielkość liter bez znaczenia)" class="input_text" id="yojc_ignoreBlogEntriesOpts" style="width: 99% !important" value="' + localStorage.getItem("yojc_ignoreBlogEntriesOpts") + '" type="text">\
					</div>'));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_showSubforums", "Pokazuj pełne dane podforów", "Zamiast listy podforów (z samą ikonką i nazwą) dodaje panel z pełnymi danymi, takimi jak link do ostatniego postu, itd."));
				jQuery("#yojcUserSettings").append(jQuery('<div id="yojc_showSubforumsDummy" style="margin-left: 50px !important;"></div>'));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_hideForums", "Ukryj wybrane fora", "Ukrywa wybrane fora na stronie głównej forum. Subfora będą ukryte tylko wtedy, jeśli zostało wybrane pokazanie pełnych danych subforów dla danego forum."));
				jQuery("#yojcUserSettings").append(jQuery('<div id="yojc_hideForumsDummy" style="margin-left: 50px !important;"></div>'));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_simpleEditor", "Napraw prosty edytor wiadomości", "Przywraca działanie podstawowych przycisków prostego edytora, takich jak pogrubienie, podkreślenie, itd."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_colorNick", "Koloruj ksywki użytkowników zgodnie z rangą", "Przy wyświetlaniu tematów/PW nicki użytkowników (po lewej) będą w kolorze rangi."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_showGender", "Pokazuj płeć użytkowników", "Dodaje znaki ♂/♀ przy nickach użytkowników (podczas wyświetlania tematu lub PW)."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_showPostsPerDay", "Pokazuj liczbę postów na dzień", "Pokazuje w profilach użytkowników średnią liczbę postów i wyświetleń profilu na dzień."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_properMonthNames", "Popraw formę miesięcy w datach", "Zmienia niepoprawną odmianę miesięcy (daty postów, PW, cytatów), np. \"" + (new Date()).getDate() + " " + polishMonthNames[(new Date()).getMonth()] + "\" na \"" + (new Date()).getDate() + " " + polishMonthProperNames[(new Date()).getMonth()] + "\". Dodatkowo czas napisania posta pokazuje również sekundy."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_toggleSpoiler", "Dodaj przycisk \"Całość/Nic\" przy spoilerach", "Pozwala na szybkie rozwinięcie spoileru i wszystkich spoilerów się w nim znajdujących. Dodatkowo zmienia napis \"Show\" na \"Pokaż\"."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_toggleSig", "Dodaj przycisk \"Pokaż/Ukryj sygnatury\"", "Ukrywa sygnatury przy wyświetlaniu tematów/PW, i dodaje przycisk służący do ich szybkiego włączenia. Wyświetlanie sygnatur ma być WŁĄCZONE w ustawieniach forum!"));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_toggleRep", "Dodaj przycisk \"Pokaż/Ukryj reputację\"", "Ukrywa przy wyświetlaniu tematów/PW/profili wszystko co związane z reputacją, i dodaje przycisk służący do jej szybkiego włączenia."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_toggleQuote", "Dodaj przycisk \"Zwiń/Rozwiń cytat\"", "Dodaje możliwość zwijania/rozwijania cytatów. Automatycznie zwija (chowa) cytaty w cytatach."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_toggleCode", "Schowaj treść znaczników [code]", "Treść takiego znacznika będzie ukryta aż na niego klikniesz."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_hoverSpoiler", "Pokazuj treść starych spoilerów po nakierowaniu kursora", "Tekst w tagach [oldspoiler] staje się biały po wskazaniu myszką. Po kliknięciu spoiler odkrywa się na stałe."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_copyNick", "Kopiowanie nicku do schowka", "Po kliknięciu na wskaźnik zalogowania (w tematach to kropka na lewo od nicka, w profilach napis \"Offline/Online\") do schowka można szybko skopiować nick użytkownika opakowany w różne tagi BBCode, np. [b][member=" + userNick + "][/b]. Biała skórka nie ma tego wskaźnika w tematach, więc dodaje kropkę obok nicka."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_turnOffLightbox", "Wyłącz \"galerię\" przy przeglądaniu obrazków z załączników", "Ta galeria (Lightbox) blokuje w Firefoksie ŚPM i PPM. Kto wpadł na taki debilizm to nie wiem."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_showForumAwards", "Dodaj medale przy nickach zwycięzców Smugglerków", "Przy nickach osób, które otrzymały wyróżnienia Smugglerkowe pojawi się medal. Po nakierowaniu kursora wyświetli się lista wyróżnień."));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_changeYTEmbeds", "Zmień zagnieżdżone filmiki z YouTube na HTML5", "Po kliknięciu na teść posta, zamieszczone w nim filmiki będą używać odtwarzacza HTML5 zamiast Flash."));
				jQuery("#yojcUserSettings").append(jQuery('<div style="margin-left: 30px !important;">\
						' + createCheckbox("yojc_changeYTEmbedsOpts", "Limit automatycznej zmiany", "Jeśli dana strona będzie zawierać nie więcej niż podaną liczbę filmików, to zmiana odtwarzacza nastąpi automatycznie. Zbyt wielka liczba zmienianych odwtarzaczy naraz mocno przymula przeglądarkę (nie testowałem, ale ok. 3 brzmi rozsądnie).")[0].outerHTML + '\
					</div>'));
				
				jQuery("#yojcUserSettings").append(createCheckbox("yojc_sendCtrlEnter", "Wyślij wiadomość po wciśnięciu Ctrl + Enter", "Podana kombinacja klawiszy spowoduje wysłanie aktualnie pisanej wiadomości."));
				
				// ustawienia dla moderatorów
				
				if (userRank()) {
					jQuery("div.ipsPad").append(jQuery("<h2/>", {
						id: "yojcModHeading",
						class: "ipsType_subtitle ipsSettings_pagetitle",
						text: "Ustawienia dla moderatorów"
					}));
					
					jQuery("div.ipsPad").append(jQuery("<fieldset/>", {
						id: "yojcModSettings",
						class: "ipsSettings_section"
					}));
					
					jQuery("#yojcModSettings").append(createCheckbox("yojc_addBanSpammerButton", "Dodaj przycisk \"Zbanuj spamera\"", "Dodaje w profilach przycisk \"Zbanuj spamera\", który oznacza danego użytkownika jako spamera, daje ostrzeżenie za 5 punktów i przenosi od Odrzutków."));
					
					jQuery("#yojcModSettings").append(createCheckbox("yojc_showHiddenCount", "Pokazuj liczbę tematów/postów do zatwierdzenia", "Zamiast napisu \"UKRYTE\" podaje od razu na tacy, ile postów i tematów czeka na zatwierdzenie w danym dziale."));
					
					jQuery("#yojcModSettings").append(createCheckbox("yojc_changeWarnCountToBar", "Zmień informację o liczbie ostrzeżeń na pasek", "Zamiast liczby ostrzeżeń, pod avatarem użytkownika wyświetlany jest pasek postępu. Pasek zmienia kolor w zależności od liczby ostrzeżeń (5 ostrzeżeń == czerwony)."));
					
					jQuery("#yojcModSettings").append(createCheckbox("yojc_quickIP", "Dodaj linki akcji do IP", "Przy IP (w postach/PW) podane są od razu linki do opcji \"Rozwiń\", \"Znajdź posty\", \"Znajdź użytkowników\"."));
					
					jQuery("#yojcModSettings").append(createCheckbox("yojc_alwaysShowReports", "Zawsze pokazuj link do centrum raportów", "Link będzie widoczny nawet wtedy, gdy nie ma aktywnych raportów. Poprawia też napis na bardziej poprawny gramatycznie."));
					
					jQuery("#yojcModSettings").append(createCheckbox("yojc_showWarnLogLink", "Zawsze pokazuj linki do historii ostrzeżeń użytkownika", "Funkcja dla Junior Moderatorów: w każdym dziale przy postach (i np. w profilach użytkowników) jest widoczny link od historii ostrzeżeń użytkownika, nawet jak nie masz w tym dziale uprawnień."));
				}
				
				// koniec
				
				jQuery("div.ipsPad").append(jQuery("<fieldset/>", {
					id: "yojcSaveSettings",
					class: "ipsSettings_section"
				}));
				
				jQuery("#yojcSaveSettings").append(jQuery('<a class="input_submit ipsButton_secondary clickable important" style=\"padding: 0 10px !important; font-decoration: none;\" title="Kliknij aby zapisać">Zapisz ustawienia</a>'));
				
				// eksport ustawień
				
				jQuery("div.ipsPad").append(jQuery("<h2/>", {
						id: "yojcExportHeading",
						class: "ipsType_subtitle ipsSettings_pagetitle",
						text: "Eksport/import ustawień"
					}));
				
				jQuery("div.ipsPad").append(jQuery("<fieldset/>", {
					id: "yojcExportSettings",
					class: "ipsSettings_section",
					html: 'Po eksporcie Twoje ustawienia są dostepne na stronie <a href=\"http://yojc.is-best.net/settings/?n=' + userNick + '\" title=\"Zapisane ustawienia\">http://yojc.is-best.net/settings/?n=' + userNick + '</a>.\
					<br>W celu importu ustawień skopiuj zawartość powyższej strony, wklej w poniższe pole i kliknij "Importuj ustawienia".\
					<br><br><div style="margin-left: 0 !important;">\
						<input autocomplete="off" placeholder="Tu wklej ustawienia do zaimportowania" class="input_text" id="yojcImportSettings" style="width: 99% !important" type="text">\
					</div>\
					<br>\
					<a class="input_submit ipsButton_secondary clickable" style=\"padding: 0 10px !important; font-decoration: none;\" title="Kliknij aby importować">Importuj ustawienia</a> &nbsp; <a class="input_submit ipsButton_secondary clickable important" style=\"padding: 0 10px !important; font-decoration: none;\" title="Kliknij aby eksportować">Eksportuj ustawienia</a>'
				}));
				
				jQuery("input[id^=yojc_]").each(function() {
					if (localStorage.getItem(this.id) == "true")
						jQuery(this).prop('checked', true);
				});
				jQuery("#yojc_changeYTEmbedsOpts").val(localStorage.getItem("yojc_changeYTEmbedsOpts"));
				
				createClickEvent("yojc_ignoreTopics");
				createClickEvent("yojc_ignoreBlogEntries");
				createClickEvent("yojc_showSubforums");
				createClickEvent("yojc_hideForums");
				createClickEvent("yojc_changeYTEmbeds");
				
				// spis forów
				
				jQuery.ajax("http://forum.cdaction.pl/index.php?app=core&module=search&search_in=forums").done(function(response) {
					jQuery(response).find("select.input")
						.detach().attr("id", "yojc_showSubforumsOpts").appendTo(jQuery("#yojc_showSubforumsDummy"))
						.clone().attr("id", "yojc_hideForumsOpts").appendTo(jQuery("#yojc_hideForumsDummy"));
					
					jQuery("select.input > option").each(function() {
						if(this.innerHTML[0] !== "&")
							this.disabled=("disabled");
					});
					
					// wywalamy z listy fora bez subforów
					
					var showSubforumsList = localStorage.getItem("yojc_showSubforumsOpts").split(",");
					var tmp = jQuery("#yojc_showSubforumsOpts > option");
					tmp.each(function(i) {
						if (showSubforumsList.indexOf(this.value) > -1)
							this.selected = "selected";
						
						if (i === tmp.length-1) {
							jQuery(this).remove();
							return false;
						}
						else {
							var currentLevel = (this.innerHTML.match(/\-\-/g) || []).length;
							var nextLevel = (tmp.eq(i+1).html().match(/\-\-/g) || []).length;
							
							if (currentLevel >= nextLevel) {
								jQuery(this).remove();
							}
							else {
								return true;
							}
						}
					});
					
					if (localStorage.getItem("yojc_hideForumsOpts")) {
						var hideForumsList = localStorage.getItem("yojc_hideForumsOpts").split(",");
						
						jQuery("#yojc_hideForumsOpts > option").each(function() {
							if (hideForumsList.indexOf(this.value) > -1)
								this.selected = "selected";
						});
					}
				});
				
				// obsługa przycisku zapisz
				
				jQuery("#yojcSaveSettings .input_submit").click(function() {
					jQuery("input[id^=yojc_]").each(function() {
						localStorage.setItem(this.id, jQuery(this).prop('checked'));
					});
					
					localStorage.setItem("yojc_ignoreTopicsOpts", jQuery("#yojc_ignoreTopicsOpts").val());
					localStorage.setItem("yojc_ignoreBlogEntriesOpts", jQuery("#yojc_ignoreBlogEntriesOpts").val());
					localStorage.setItem("yojc_changeYTEmbedsOpts", jQuery("#yojc_changeYTEmbedsOpts").val());
					
					localStorage.setItem("yojc_showSubforumsOpts", (jQuery("#yojc_showSubforumsOpts").val() !== null ? jQuery("#yojc_showSubforumsOpts").val().toString() : null));
					
					localStorage.setItem("yojc_hideForumsOpts", (jQuery("#yojc_hideForumsOpts").val() !== null ? jQuery("#yojc_hideForumsOpts").val().toString() : null));
					
					var _options = {
						type: 'pane',
						modal: true,
						initial: '<div><h3>Sukces!</h3>\
							<div class="ipsPad ipsForm_center"><p>Wygląda na to, że się udało zapisać ustawienia.</p>\
							<br /><span onclick="ipb.global.popups[\'yojcSave\'].hide()" class="clickable ipsButton_secondary important">Zamknij</span></div>',
						hideAtStart: false,
						w: '',
						h: '',
					};
					ipb.global.popups.yojcSave = new ipb.Popup('confirm',_options);
				});
				
				// obsługa przycisku importuj
				
				jQuery("#yojcExportSettings .input_submit").eq(0).click(function() {
					var JSONArray = JSON.parse(unescapeHtml(jQuery("#yojcImportSettings").val()));
					
					jQuery.each(JSONArray, function() {
						//console.info(this.id + " : " + this.value);
						var $this = jQuery("#" + this.id);
						
						if ($this.prop("tagName") == "SELECT") {
							$this.val(this.value.split(","));
						}
						else if ($this.prop("tagName") == "INPUT" && $this.prop("type") == "checkbox" && $this.prop('checked') !== this.value) {
							$this.click();
						}
						else if ($this.prop("tagName") == "INPUT" && $this.prop("type") == "text") {
							$this.val(this.value);
						}
						else if ($this.prop("tagName") == "INPUT" && $this.prop("type") == "number") {
							$this.get(0).value = this.value;
						}
					});
					
					var _options = {
						type: 'pane',
						modal: true,
						initial: '<div><h3>Sukces!</h3>\
							<div class="ipsPad ipsForm_center"><p>Ustawienia zostały przywrócone, ALE NIE ZAPISANE.<br>Sprawdź czy wszystko się zgadza, i kliknij przycisk "Zapisz ustawienia".</p>\
							<br /><span onclick="ipb.global.popups[\'yojcImport\'].hide()" class="clickable ipsButton_secondary important">Zamknij</span></div>',
						hideAtStart: false,
						w: '',
						h: '',
					};
					ipb.global.popups.yojcImport = new ipb.Popup('confirm',_options);
				});
				
				// obsługa przycisku eksportuj
				
				jQuery("#yojcExportSettings .input_submit.important").click(function() {
					//var nickShort = jQuery("#user_link").text().trim().substring(0, 16).toLowerCase().replace(/^[a-z0-9]+$/, "");
					
					var JSONArray = [];
					var temp;
					
					jQuery("input[id^=yojc_]").each(function() {
						temp = {};
						temp.id = this.id;
						temp.value = jQuery(this).prop('checked');
						
						JSONArray.push(temp);
					});
					
					temp = {};
					temp.id = "yojc_ignoreTopicsOpts";
					temp.value = jQuery("#yojc_ignoreTopicsOpts").val();
					JSONArray.push(temp);
					
					temp = {};
					temp.id = "yojc_ignoreBlogEntriesOpts";
					temp.value = jQuery("#yojc_ignoreBlogEntriesOpts").val();
					JSONArray.push(temp);
					
					temp = {};
					temp.id = "yojc_showSubforumsOpts";
					temp.value = (jQuery("#yojc_showSubforumsOpts").val() !== null ? jQuery("#yojc_showSubforumsOpts").val().toString() : null);
					JSONArray.push(temp);
					
					temp = {};
					temp.id = "yojc_hideForumsOpts";
					temp.value = (jQuery("#yojc_hideForumsOpts").val() !== null ? jQuery("#yojc_hideForumsOpts").val().toString() : null);
					JSONArray.push(temp);
					
					temp = {};
					temp.id = "yojc_changeYTEmbedsOpts";
					temp.value = (jQuery("#yojc_changeYTEmbedsOpts").val() !== null ? jQuery("#yojc_changeYTEmbedsOpts").val().toString() : null);
					JSONArray.push(temp);
					
					
					var iframeSaver = document.createElement("iframe");
					iframeSaver.src = "http://yojc.is-best.net/settings/?n=" + userNick + "&d=" + JSON.stringify(JSONArray);
					iframeSaver.setAttribute("style", "display:none;");
					document.body.appendChild(iframeSaver);
					
					var _options = {
						type: 'pane',
						modal: true,
						initial: '<div><h3>Sukces!</h3>\
							<div class="ipsPad ipsForm_center"><p>Wygląda na to, że się udało zapisać ustawienia na serwerze.<br>Przynajmniej mam taką nadzieję, bo nie mam możliwości tego zweryfikować.</p>\
							<br /><span onclick="ipb.global.popups[\'yojcExport\'].hide()" class="clickable ipsButton_secondary important">Zamknij</span></div>',
						hideAtStart: false,
						w: '',
						h: '',
					};
					ipb.global.popups.yojcExport = new ipb.Popup('confirm',_options);
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		
		//---------------------------------
		// skrypty dla użytkowników
		//---------------------------------
		
		//---------------------------------
		// pokazywanie średniej postów
		//---------------------------------
		
		function showPostsPerDay() {
			try {
				if (!viewing("profile"))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				var $profileFields = jQuery(".row_data");
				
				if (!($profileFields.eq(1).html().match(/\d+/) && $profileFields.eq(2).html().match(/\d+/)))
					return;
				
				function round(num, count) {
					count = Math.pow(10, count);
					return Math.round((num)*count)/count;
				}
				
				function avg(count, date) {
					var today = new Date();
					var dayLength = 1000*60*60*24;
					
					if (today !== date)
						return round(count/((today.getTime()-date.getTime())/dayLength), 3);
					else
						return 0;
				}
				
				var regDate = properDate(jQuery("#user_info_cell").text(), "Użytkownik od ");
				
				var postCount = parseInt($profileFields.eq(1).html().match(/\d+/)[0], 10);
				var viewCount = parseInt($profileFields.eq(2).html().match(/\d+/)[0], 10);
				
				$profileFields.eq(1).html(postCount + " (" + avg(postCount, regDate) + " dziennie)");
				$profileFields.eq(2).html(viewCount + " (" + avg(viewCount, regDate) + " dziennie)");
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// kolorowanie nicków
		//---------------------------------
		
		function colorNick() {
			try {
				if (!(viewing("topic") || viewing("privmsg")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				//$nameList = jQuery(".author.vcard > a > span[itemprop=name]");
				var $colorList = jQuery(".group_title");
				
				$colorList.each(function() {
					var e = jQuery(this).parent().parent().parent().prev().find(".author.vcard, .author.vcard > a");
					e.attr("style", jQuery(this).find("span").attr("style"));
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// wyświetlanie płci przy nickach
		//---------------------------------
		
		function showGender() {
			try {
				if (!(viewing("topic") || viewing("privmsg")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				var $nameList;
				
				if (isDarkSkin())
					$nameList = jQuery(".post_username");
				else
					$nameList = jQuery(".author.vcard");
					
				var $infoList = jQuery(".custom_fields"); 
				
				if($nameList) {
					var adCount=0;
					$nameList.each(function(i, e) {
						if (jQuery(e).text().trim() == "Ogłoszenie" || jQuery(e).text().trim().match(/^Gość\_/)) {
							adCount++;
							return true;
						}
						
						var $gender = jQuery("<img/>", {
							style: "margin-left: 2px;"
						});
						
						if ($infoList.eq(i-adCount).text().search("kobieta") != -1) {
							$gender.attr("src", "http://x.forum.cdaction.pl/public/style_images/infinite_dark/profile/female.png");
							$nameList.eq(i).append($gender);
						}
						else if ($infoList.eq(i-adCount).text().search("mężczyzna") != -1) {
							$gender.attr("src", "http://x.forum.cdaction.pl/public/style_images/infinite_dark/profile/male.png");
							$nameList.eq(i).append($gender);
						}
					});
				}
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// pokazywanie pełnych danych subforów
		//---------------------------------
		
		function showSubforums($e) {
			try {
				if (!(viewing("main") || viewing("forum")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				if ($e === null) {
					debug(arguments.callee.name);
					$e = jQuery("body");
				}
				
				var customColor = (getCookie("customcolor") || "3A85BA");
				var forumList = localStorage.getItem("yojc_showSubforumsOpts").split(",");
				
				function sendRequest(thisId, $thisForum) {
					jQuery.ajax("http://forum.cdaction.pl/index.php?showforum=" + thisId).done(function(response) {
						/* w newTr -> newTd zostanie umieszczona nowa lista subforów */
						var $newTr = jQuery("<tr/>");
						var $newTd = jQuery("<td/>", {
							colspan: "4"
						});
					 
						/* wpakowanie kodu do tymczasowego div */
						var $tempNode = jQuery(response.replace(/returntoforumid=\d+/g, "returntoforumid=0"));
								
						/* zaaplikowanie koloru użytkownika (ciemna skórka) */
						if (isDarkSkin()) {
							$tempNode.find(".col_c_icon").each(function(i, e) {
								if (e.tagName == "TD")
									/* jeśli to normalne forum */
									if (e.children[0].tagName == "A")
										e.children[0].children[0].setAttribute("style", "background-color: #" + customColor);
									/* jeśli to tylko przekierowanie */
									else
										e.children[0].setAttribute("style", "background-color: #" + customColor);
								else
									return true;
							});
						}
						
						/* usuwanie kolumn "wyświetleń/postów" oraz "ostatni post" (jeśli w danym dziale da się pisać tylko w subforach) */
						if ($tempNode.find("#forum_table").length === 0 || $tempNode.find("#forum_table .col_f_post").length < 2) {
							$thisForum.parent().next().remove();
							$thisForum.parent().next().remove();
							$thisForum.parent().attr("colspan", "3");
						}
						else {
							// poprawiamy kolumnę "Ostatni post"
							var latestPost = 0;
							var latestDate = new Date(0);
							var pinnedFlag = false;
							
							var dateClass = "a[title^=\"Idź do ostatniego posta\"]";
							
							$tempNode.find("#forum_table .col_f_post").each(function(i) {
								if (i === 0)
									return true;
								else if (jQuery(this).parent().find("img[alt=\"Przeniesiony temat\"]").length > 0)
									return true;
								else if (jQuery(this).parent().find(".ipsBadge.ipsBadge_green:contains(Przypięty)").length > 0) {
									if (!pinnedFlag) {
										latestPost = i;
										latestDate = jQuery(this).find(dateClass);
										pinnedFlag = true;
										return true;
									}
									else
										return true;
								}
								else {
									if (!pinnedFlag) {
										latestPost = i;
										latestDate = jQuery(this).find(dateClass);
										return false;
									}
									else {
										var thisDate = jQuery(this).find(dateClass);
										
										if (properDate(thisDate.text()) > properDate(latestDate.text())) {
											latestPost = i;
											latestDate = thisDate;
										}
										return false;
									}
								}
							});
							
							if (latestPost !== 0) {
								var latestPostCell = $tempNode.find("#forum_table .col_f_post").eq(latestPost);
								
								var $posterNick = latestPostCell.find(".name");
								var $posterAv = latestPostCell.find("img");
								var posterID = latestPostCell.html().match(/showuser\=(\d+)/)[1];
								var postDate = latestPostCell.find(dateClass).text().trim();
								var topicID = latestPostCell.html().match(/showtopic\=(\d+)/)[1];
								var topicTitle = latestPostCell.parent().find(".topic_title").text().trim();
								var topicTitleShort = (topicTitle.length > 30 ? topicTitle.substring(0, 27).trim() + "..." : topicTitle);
								
								var tdNewContents = '<a href="http://forum.cdaction.pl/index.php?showuser=' + posterID + '" class="ipsUserPhotoLink left">\
										<img id="replaceThisTyCwelu">\
									</a>\
									<ul class="last_post ipsType_small">\
										<li><span class="highlight_unread"><a href="http://forum.cdaction.pl/index.php?showtopic=' + topicID + '&amp;view=getnewpost" title="' + topicTitle + '">' + topicTitleShort + '</a></span></li>\
											<li>' + (isDarkSkin() ? '<span class="desc lighter blend_links">\
													<a href="http://forum.cdaction.pl/index.php?showtopic=' + topicID + '&amp;view=getlastpost" title="Zobacz ostatni post">' + postDate + '</a>\
												</span>\
													Przez  <a id="replaceThisTyCiulu"></a>'
													: 'Przez  <a id="replaceThisTyCiulu"></a><br>\
													<span class="desc lighter blend_links">\
													<a href="http://forum.cdaction.pl/index.php?showtopic=' + topicID + '&amp;view=getlastpost" title="Zobacz ostatni post">' + postDate + '</a>\
												</span>') +
											'</li>\
									</ul>';
									
								$thisForum.parent().parent().find(".col_c_post").html(tdNewContents);
								$thisForum.parent().parent().find(".col_c_post #replaceThisTyCiulu").replaceWith($posterNick);
								
								if ($posterAv.length > 0) {
									$posterAv.attr("alt", "Zdjęcie");
									$thisForum.parent().parent().find(".col_c_post #replaceThisTyCwelu").replaceWith($posterAv);
								}
								else
									$thisForum.parent().parent().find(".col_c_post #replaceThisTyCwelu").remove();
							}
						}
						
						/* wyciągnięcie z kodu strony tabeli z subforami */
						var $newSubforumsList = $tempNode.find(".ipb_table:not(*[id=forum_table])");
						
						if (isDarkSkin())
							$newSubforumsList.addClass("border");
						else
							$newSubforumsList.addClass("ipsBox_container");
						
						/* dołączenie tabeli do strony głównej forum */
						$newTd.append($newSubforumsList.last().detach());
						$newTd.appendTo($newTr);
						showHiddenCount($newTr);
						$thisForum.parent().parent().after($newTr);
						
						IPBoard.prototype.hoverCardRegister.postAjaxInit();
						
						/* usuwanie standardowej listy subforów */
						//$thisForum.remove();
						$thisForum.hide();
						$thisForum.children().each(function() {
							jQuery(this).hide();
						});
						
						hideForums($newTr);
						showSubforums($newTr);
					});
					
					
				}
				
				/* wysłanie zapytań */
				
				$e.find(".ipsList_inline.ipsType_small.subforums").each(function(i, e) {
					var forumId = e.parentNode.children[0].innerHTML.match(/showforum\=(\d+)/)[1];
					if (forumList.indexOf(forumId) > -1)
						sendRequest(forumId, jQuery(e));
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// ukrywanie forów na stronie głównej
		//---------------------------------
		
		function hideForums($e) {
			try {
				if (!(viewing("main")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				if ($e === null) {
					debug(arguments.callee.name);
					$e = jQuery("body");
				}
				
				var forumList = localStorage.getItem("yojc_hideForumsOpts").split(",");
				var $subForumsList = $e.prev().find(".ipsList_inline.ipsType_small.subforums");
				
				$e.find("td.col_c_forum").each(function(i, e) {
					e = jQuery(e);
					
					var forumId = e.html().match(/showforum\=(\d+)/)[1];
					if (forumList.indexOf(forumId) > -1) {
						$subForumsList.show();
						$subForumsList.find("a[href$=showforum\\=" + forumId + "]").parent().show();
						e.parent().remove();
					}
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// ignorowanie tematów
		//---------------------------------
		
		function ignoreTopics() {
			try {
				if (!(viewing("newContent") || viewing("forum") || viewing("topic")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				var removedTopics = [];
				var ignoreArray = jQuery.map(localStorage.getItem("yojc_ignoreTopicsOpts").toLowerCase().split(","), jQuery.trim);
				
				if (viewing("topic")) {
					if (ignoreArray.indexOf(jQuery("span[itemprop=creator]").text().toLowerCase()) != -1) {
						if (!isDarkSkin())
							jQuery(".ipsBox_container.ipsPad, .topic_controls:not(.ipsPad_top_bottom_half)").prepend('<br />');
						else
							jQuery(".topic_controls:not(.ipsPad_top_bottom_half)").prepend('<br />');
						
						jQuery(".ipsBox_container.ipsPad, .topic_controls:not(.ipsPad_top_bottom_half)").prepend('<div class="message error">Ignorujesz tematy tego autora.</div>');
					}
					return;
				}
				
				var nickClass;
				
				if (isDarkSkin() && viewing("forum"))
					nickClass = ".topic_desc";
				else
					nickClass = ".desc";
				
				jQuery("tr[id^=trow]").each(function() {
					var $nickname = jQuery(this).find(nickClass + " > .___hover___member");
					var nickname = $nickname.text();
					
					if (nickname === "") {
						nickname = jQuery(this).find(".topic_desc").text();
						nickname = nickname.substring(26, nickname.indexOf("_*,"));
						$nickname = jQuery("<span>" + nickname + "</span>");
					}
					
					if (ignoreArray.indexOf(nickname.toLowerCase()) != -1) {
						var colspan = 3;
						var $hiddenPosts = jQuery(this).find(".col_f_content .ipsBadge_orange");
						var $modTickbox = jQuery(this).find(".col_f_mod");
						if ($modTickbox.length > 0)
							colspan++;
						
						jQuery(this).find(nickClass + " > .___hover___member").replaceWith(jQuery("<a id=\"unhide_username_" + removedTopics.length + "\">dupa</a>"));
						
						var $newCell = jQuery("\
							<td class=\"col_f_icon altrow short\">\
								" + jQuery(this).find(".col_f_icon").html() + "\
							</td>\
							<td class=\"post_ignore\" colspan=\"" + colspan + "\" style=\"padding: none !important\">\
								<a id=\"replaceHidden\"></a> Ten temat jest ukryty ponieważ wybrałeś opcję ignorowania tematów użytkownika <a id=\"replace\"></a>. \
								<a id=\"unhide_topic_" + removedTopics.length + "\" title=\"Zobacz ten temat\" style=\"cursor: pointer;\">Wyświetlić i tak?</a>\
							</td>");
						$newCell.find("#replace").replaceWith($nickname);
						
						if ($hiddenPosts.length > 0) {
							$hiddenPosts = $hiddenPosts.eq(0).parent();
							$hiddenPosts.replaceWith(jQuery("<a id=\"unhide_hiddenposts_" + removedTopics.length + "\">dupa</a>"));
							$newCell.find("#replaceHidden").replaceWith($hiddenPosts);
						}
						
						$newCell.find("a[id^=unhide_topic_]").click(function() {
							var arrayId = parseInt(jQuery(this).attr('id').replace(/\D+/, ""));
							var $nickname = jQuery(this).parent().find(".___hover___member");
							var $hiddenPosts = jQuery(this).parent().find(".ipsBadge_orange");
							var $parentNode = jQuery(this).parent().parent();
							
							$parentNode.toggle("fast", function() {
								$parentNode.children().remove();
								$parentNode.append(removedTopics[arrayId]);
								$parentNode.find("#unhide_username_" + arrayId).replaceWith($nickname);
								
								if ($hiddenPosts.length > 0)
									$parentNode.find("#unhide_hiddenposts_" + arrayId).replaceWith($hiddenPosts.parent());
								
								removedTopics[arrayId] = null;
								jQuery(this).toggle("slow");
							});
						});
						
						removedTopics.push(jQuery(this).children().detach());
						jQuery(this).append($newCell);
						jQuery(this).append($modTickbox.clone(true, true));
					}
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// ignorowanie blogów
		//---------------------------------

		function ignoreBlogEntries() {
			try {
				if (!(viewing("blogMain") || viewing("blogList")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				var removedEntries = [];
				var ignoreArray = jQuery.map(localStorage.getItem("yojc_ignoreBlogEntriesOpts").toLowerCase().split(","), jQuery.trim);

				if (viewing("blogMain")) {
					jQuery(".ipsBox_container").each(function() {
						var $nickname = jQuery(this).find("strong > .___hover___member");
						var nickname = $nickname.text();
						
						if (ignoreArray.indexOf(nickname.toLowerCase()) != -1) {
							var $toggleEntry = jQuery("<div/>", {
								class: "entry_content ipsType_textblock ipsPad",
								html: "Ten wpis jest ukryty ponieważ wybrałeś opcję ignorowania wpisów użytkownika <a id=\"replace\"></a>. <a id=\"unhide_entry_" + removedEntries.length + "\" title=\"Zobacz ten wpis\" style=\"cursor: pointer;\">Wyświetlić i tak?</a>"
							});
							
							$toggleEntry.find("#replace").replaceWith($nickname);
							jQuery(this).find("strong").eq(0).append(jQuery("<a id=\"unhide_username_" + removedEntries.length + "\">dupa</a>"));
							
							var $modTickBox = jQuery(this).find(".input_check");
							
							if ($modTickBox) {
								var $modTickBoxContainer = jQuery("<span/>", {
									class: "right"
								});
								$modTickBoxContainer.append($modTickBox.clone(true, true));
								$toggleEntry.append($modTickBoxContainer);
							}
							
							$toggleEntry.find("a[id^=unhide_entry_]").click(function() {
								var arrayId = parseInt(jQuery(this).attr('id').replace(/\D+/, ""));
								var $nickname = jQuery(this).parent().find(".___hover___member");
								var $parentNode = jQuery(this).parent().parent();
								
								$parentNode.fadeToggle("fast", function() {
									$parentNode.children().remove();
									$parentNode.append(removedEntries[arrayId]);
									$parentNode.find("#unhide_username_" + arrayId).replaceWith($nickname);
									
									removedEntries[arrayId] = null;
									jQuery(this).fadeToggle("slow");
								});
							});
							
							removedEntries.push(jQuery(this).children().detach());
							jQuery(this).prepend($toggleEntry);
						}
					});
				}
				else if (viewing("blogList")) {
					jQuery("tr[id^=brow]").each(function() {
						var $nickname = jQuery(this).find(".col_f_starter > .___hover___member");
						var nickname = $nickname.text();
						
						if(nickname === "") {
							nickname = jQuery(this).find(".col_f_starter").text().trim();
							nickname = nickname.substring(5, nickname.indexOf("_*,"));
							$nickname = jQuery("<span>" + nickname + "</span>");
						}
						
						if(ignoreArray.indexOf(nickname.toLowerCase()) != -1) {
							var colspan = 6;
							var $modTickbox = jQuery(this).find(".col_f_mod");
							if($modTickbox)
								colspan++;
							
							jQuery(this).find(".col_f_starter > .___hover___member").replaceWith(jQuery("<a id=\"unhide_username_" + removedEntries.length + "\">dupa</a>"));
							
							var $newCell = jQuery("\
								<td class=\"post_ignore\" colspan=\"" + colspan + "\" style=\"padding: none !important\">\
									Ten blog jest ukryty ponieważ wybrałeś opcję ignorowania blogów użytkownika <a id=\"replace\"></a>. \
									<a id=\"unhide_entry_" + removedEntries.length + "\" title=\"Zobacz ten blog\" style=\"cursor: pointer;\">Wyświetlić i tak?</a>\
								</td>");
							$newCell.find("#replace").replaceWith($nickname);
							
							$newCell.find("a[id^=unhide_entry_]").click(function() {
								var arrayId = parseInt(jQuery(this).attr('id').replace(/\D+/, ""));
								var $nickname = jQuery(this).parent().find(".___hover___member");
								var $parentNode = jQuery(this).parent().parent();
								
								$parentNode.fadeToggle("fast", function() {
									$parentNode.children().remove();
									$parentNode.append(removedEntries[arrayId]);
									$parentNode.find("#unhide_username_" + arrayId).replaceWith($nickname);
									
									removedEntries[arrayId] = null;
									jQuery(this).fadeToggle("slow");
								});
							});
							
							removedEntries.push(jQuery(this).children().detach());
							jQuery(this).append($newCell);
							jQuery(this).append($modTickbox.clone(true, true));
						}
					});
				}
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// naprawa prostego edytora
		//---------------------------------
		
		function simpleEditor() {
			try {
				//if (!(viewing("msgEdit") || viewing("topic") || viewing("privmsg") || viewing("blogView") || viewing("report")))
				//	return;
				
				if (jQuery(".ipsEditor_textarea").length===0)
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				// http://blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
				
				function setCaretPosition(ctrl, pos) {
					if(ctrl.setSelectionRange) {
						ctrl.focus();
						ctrl.setSelectionRange(pos,pos);
					}
					else if (ctrl.createTextRange) {
						var range = ctrl.createTextRange();
						range.collapse(true);
						range.moveEnd('character', pos);
						range.moveStart('character', pos);
						range.select();
					}
				}
				
				// to też gdzieś znalezione (przynajmniej część), ale nie pamiętam gdzie
				
				function formatText(e, tagStart, tagEnd) {
					e = jQuery(e).parent().parent().parent().parent().parent().parent().parent().find("textarea.cke_source").get(0);
					var pos = e.value.substring(0, e.selectionStart).length + tagStart.length + e.value.substring(e.selectionStart, e.selectionEnd).length;
					
					if (e.value.substring(e.selectionStart, e.selectionEnd).length !== 0) {
						pos += tagEnd.length;
					}
					
					if (e.setSelectionRange) {
						e.value = e.value.substring(0, e.selectionStart) + tagStart + e.value.substring(e.selectionStart, e.selectionEnd) + tagEnd + e.value.substring(e.selectionEnd, e.value.length);
						setCaretPosition(e, pos);
					}
				}
				
				// usuwa tagi z zaznaczenia
				
				function deleteTags(e) {
					e = jQuery(e).parent().parent().parent().parent().parent().parent().parent().find("textarea.cke_source").get(0);
					
					var beforeSelection = e.value.substring(0, e.selectionStart);
					var contentSelection = e.value.substring(e.selectionStart, e.selectionEnd);
					var afterSelection = e.value.substring(e.selectionEnd);
					
					e.value = beforeSelection + contentSelection.replace(/\[[^\[\]]+?\]/g, "") + afterSelection;
				}
				
				// sprawdza tryb edytora (żeby nie waliło błędami po przejściu w tryb wizualny)
				
				function checkEditorMode(e) {
					if (jQuery(e).parent().parent().parent().parent().parent().parent().parent().find(".cke_button_removeFormat").attr("class").match("cke_off"))
						return true;
					else
						return false;
				}
				
				// naprawia linki w zestawach
				
				function deleteSpaces(e) {
					e = e.parent().parent().find("textarea.cke_source");
					e.val(e.val().replace(/\s(cpu|gpu|mobo|hdd|ram|psu|dvd|case)\s/g, '').replace(/\t\n/g, '\n').replace(/\n{2,}/g, '\n\n').replace(/\n[\s\dŁE,]*=/g, '\n\n=').replace(/(\[url\])*(http:[^\s\[]*)(\[\/url\])*/g, "[url]$2[/url]").replace(/£/g, "Ł"));
				}
				
				// dołącza guziki
				
				function appendButtons() {
					if (userId !== 138003)
						// to funkcja tylko dla szlachty, plebs niech se idzie
						return;
					
					var e = jQuery("fieldset.right, fieldset.submit");
					
					var $buttonSpaces = jQuery("<input/>", {
						type: "button",
						value: "Usuń spacje",
						class: "input_submit alt",
						style: "margin-left: 3px"
					});
					
					$buttonSpaces.click(function() {
						if (!checkEditorMode(this))
							deleteSpaces(jQuery(this));
					});
					
					e.each(function(i, e) {
						e = jQuery(e);
						if (e.attr("class") === "right") {
							e.attr("class", "right withButtons");
							
							e.append($buttonSpaces);
						}
						else if (e.attr("class") === "submit" || e.attr("class") === "submit clear") {
							e.attr("class", "submit clear withButtons");
							
							e = e.find("input[id^=edit_switch_], input[name=preview]");
							$buttonSpaces.insertAfter(e);
						}
					});
				}
				
				// dodaje eventy do guzików
				
				function fixButton(id, name, tagStart, tagEnd, e) {
					var switchId = parseInt(jQuery(e).parent().parent().parent().find(".cke_button_ipsswitch").attr("id").substring(4), 10);
					var switchIdBase = 6;
					
					var button = jQuery("#cke_" + (switchId - switchIdBase + id));
					button.attr("class", "cke_button_" + name);
					
					if (!button.data("events")) {
						if (tagStart !== null && tagEnd !== null) {
							button.click(function() {
								if (!checkEditorMode(this))
									formatText(this, tagStart, tagEnd);
							});
						}
						else if (name === "ipsemoticon") {
							button.click(function() {
								if (!checkEditorMode(this)) {
									console.info("test");
									var newWindow = window.open("http://forum.cdaction.pl/index.php?app=forums&module=extras&section=legends","Emotikony - Forum Actionum","height=600,width=300");
									if (window.focus) {
										newWindow.focus();
									}
								}
							});
						}
						else {
							button.click(function() {
								deleteTags(this);
							});
						}
					}
				}
				
				// dodaje listy rozwijania do guzików
				
				function fixList(id, name, e) {
					var switchId = parseInt(jQuery(e).parent().parent().parent().find(".cke_button_ipsswitch").attr("id").substring(4), 10);
					var switchIdBase = 6;
					
					var button = jQuery("#cke_" + (switchId - switchIdBase + id));
					
					if (["font", "fontSize"].indexOf(name) === -1)
						button.attr("class", "cke_button_" + name);
					else
						button.attr("class", "cke_" + name);
					
					if (!button.data("events")) {
						var resultList;
						if (name === "textcolor") {
							resultList = [
								"(brak)<span class=\"yojc_tagValue\" style=\"display: none;\"></span>",
								"Biały<span class=\"yojc_tagValue\" style=\"display: none;\">white</span>",
								"Brązowy<span class=\"yojc_tagValue\" style=\"display: none;\">brown</span>",
								"Czarny<span class=\"yojc_tagValue\" style=\"display: none;\">black</span>",
								"Czerwony<span class=\"yojc_tagValue\" style=\"display: none;\">red</span>",
								"Niebieski<span class=\"yojc_tagValue\" style=\"display: none;\">blue</span>",
								"Pomarańczowy<span class=\"yojc_tagValue\" style=\"display: none;\">orange</span>",
								"Różowy<span class=\"yojc_tagValue\" style=\"display: none;\">pink</span>",
								"Szary<span class=\"yojc_tagValue\" style=\"display: none;\">grey</span>",
								"Zielony<span class=\"yojc_tagValue\" style=\"display: none;\">green</span>",
								"Żółty<span class=\"yojc_tagValue\" style=\"display: none;\">yellow</span>"
							];
						}
						else if (name === "font") {
							resultList = [
								"<span class=\"yojc_tagValueOmit\">(brak)</span>",
								"<span style=\"font-family: monospace;\">(monospace)</span>",
								"<span style=\"font-family: sans-serif;\">(sans-serif)</span>",
								"<span style=\"font-family: serif;\">(serif)</span>",
								"<span style=\"font-family: arial,helvetica,sans-serif;\">Arial</span>",
								"<span style=\"font-family: calibri,tahoma,geneva,sans-serif;\">Calibri</span>",
								"<span style=\"font-family: comic sans ms,cursive;\">Comic Sans MS</span>",
								"<span style=\"font-family: courier new,courier,monospace;\">Courier New</span>",
								"<span style=\"font-family: consolas,monospace;\">Consolas</span>",
								"<span style=\"font-family: georgia,serif;\">Georgia</span>",
								"<span style=\"font-family: lucida sans unicode,lucida grande,sans-serif;\">Lucida Sans Unicode</span>",
								"<span style=\"font-family: segoe ui,tahoma,geneva,sans-serif;\">Segoe UI</span>",
								"<span style=\"font-family: tahoma,geneva,sans-serif;\">Tahoma</span>",
								"<span style=\"font-family: times new roman,times,serif;\">Times New Roman</span>",
								"<span style=\"font-family: trebuchet ms,helvetica,sans-serif;\">Trebuchet MS</span>",
								"<span style=\"font-family: ubuntu,tahoma,geneva,sans-serif;\">Ubuntu</span>",
								"<span style=\"font-family: verdana,geneva,sans-serif;\">Verdana</span>"
							];
						}
						else if (name === "ipsbbcode") {
							resultList = [
								"[acronym=]<span class=\"yojc_tagStart\" style=\"display: none;\">[acronym=]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/acronym]</span>",
								"[background=]<span class=\"yojc_tagStart\" style=\"display: none;\">[background=]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/background]</span>",
								"[blog=]<span class=\"yojc_tagStart\" style=\"display: none;\">[blog=]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/blog]</span>",
								"[codebox]<span class=\"yojc_tagStart\" style=\"display: none;\">[codebox]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/codebox]</span>",
								"[entry=]<span class=\"yojc_tagStart\" style=\"display: none;\">[entry=]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/entry]</span>",
								"[extract]<span class=\"yojc_tagStart\" style=\"display: none;\">[extract]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/extract]</span>",
								"[html]<span class=\"yojc_tagStart\" style=\"display: none;\">[html]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/html]</span>",
								"[hr]<span class=\"yojc_tagStart\" style=\"display: none;\">[hr]</span><span class=\"yojc_tagEnd\" style=\"display: none;\"></span>",
								"[justify]<span class=\"yojc_tagStart\" style=\"display: none;\">[justify]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/justify]</span>",
								"[media]<span class=\"yojc_tagStart\" style=\"display: none;\">[media]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/media]</span>",
								"[member=]<span class=\"yojc_tagStart\" style=\"display: none;\">[member=</span><span class=\"yojc_tagEnd\" style=\"display: none;\">]</span>",
								"[oldspoiler]<span class=\"yojc_tagStart\" style=\"display: none;\">[oldspoiler]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/oldspoiler]</span>",
								"[php]<span class=\"yojc_tagStart\" style=\"display: none;\">[php]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/php]</span>",
								"[post=]<span class=\"yojc_tagStart\" style=\"display: none;\">[post=]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/post]</span>",
								"[spoiler]<span class=\"yojc_tagStart\" style=\"display: none;\">[spoiler]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/spoiler]</span>",
								"[sql]<span class=\"yojc_tagStart\" style=\"display: none;\">[sql]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/sql]</span>",
								"[surl=]<span class=\"yojc_tagStart\" style=\"display: none;\">[surl]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/surl]</span>",
								"[topic=]<span class=\"yojc_tagStart\" style=\"display: none;\">[topic=]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/topic]</span>",
								"[twitter]<span class=\"yojc_tagStart\" style=\"display: none;\">[twitter]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/twitter]</span>",
								"[xml]<span class=\"yojc_tagStart\" style=\"display: none;\">[xml]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/xml]</span>",
								"[youtube]<span class=\"yojc_tagStart\" style=\"display: none;\">[youtube]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/youtube]</span>",
								"[yt]<span class=\"yojc_tagStart\" style=\"display: none;\">[yt]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/yt]</span>"
							];
							var descList = [
								"Wstawia skrót do postu, po nakierowaniu kursora wyświetla jego rozwinięcie.\n[acronym=(rozwinięcie)](skrót)[/acronym]",
								"Dodaje tło w danym kolorze pod tekstem.\n[background=(kolorTła)](tekst)[/background]</span>",
								"Wstawia link do podanego bloga.\n[blog=(idBlogu)](tekst)[/blog]",
								"To samo co [code], tylko z paskiem przewijania (maks. wysokość 200 pikseli).\n[codebox](kod)[/codebox]",
								"Wstawia link do podanego wpisu na blogach.\n[entry=(idWpisu)](tekst)[/entry]",
								"Pozwala na zdefiniowanie użytkownikom wyciągu danego wpisu, wyświetlanego na stronie głównej blogów oraz w RSS.\n[extract](tekst)[/extract]",
								"To samo co [code], tylko dla HTML.\n[html](tekst)[/html]",
								"Wstawia poziomą linię.\n[hr]",
								"Wyjustowuje tekst.\n[justify](tekst)[/justify]",
								"Wstawia na forum element multimedialny (np. Flash).\n[media(=rozmiar)](link)[/media]",
								"Wstawia na forum odnośnik do profilu użytkownika, wraz z hovercardem.\n[member=(nick)]",
								"Wstawia czarny tekst na czarnym tle.\n[oldspoiler](tekst)[/oldspoiler]",
								"To samo co [code], tylko dla PHP.\n[php](tekst)[/php]",
								"Wstawia link do wybranego postu.\n[post=(idPostu)](tekst)[/post]",
								"Wstawia ukrytą treść (z przyciskiem Pokaż/Ukryj).\n[spoiler](tekst)[/spoiler]",
								"To samo co [code], tylko dla SQL.\n[sql](tekst)[/sql]",
								"Wstawia link do postu będącego na tej samej stronie tematu.\n[surl=(idPostu)](tekst)[/surl]",
								"Wstawia link do tematu na forum.\n[topic=(idtematu)](tekst)[/topic]",
								"Wstawia link do konta w serwisie Twitter.\n[twitter](nick)[/twitter]",
								"To samo co [code], tylko dla XML.\n[xml](tekst)[/xml]",
								"Wstawia na forum odtwarzacz YouTube.\n[youtube](link)[/youtube]",
								"Wstawia na forum odtwarzacz YouTube.\n[yt](idFilmu)[/yt]"
							];
							if (userId === 138003) {
								// no i co się gapisz
								resultList.splice(19, 0, "[yojc]<span class=\"yojc_tagStart\" style=\"display: none;\">[yojc]</span><span class=\"yojc_tagEnd\" style=\"display: none;\">[/yojc]</span>");
								descList.splice(19, 0, "Jak nie jesteś yojcem to nie dotykaj");
							}
						}
						else if (name === "fontSize") {
							resultList = [
								"(brak)",
								"<span style=\"font-size: 8px\">8</span>",
								"<span style=\"font-size: 10px\">10</span>",
								"<span style=\"font-size: 12px\">12 (stand.)</span>",
								"<span style=\"font-size: 14px\">14</span>",
								"<span style=\"font-size: 18px\">18</span>",
								"<span style=\"font-size: 24px\">24</span>",
								"<span style=\"font-size: 36px\">36</span>",
								"<span style=\"font-size: 48px\">48</span>"
							];
						}
						
						var $listContainer = jQuery("<ul/>", {
							id: "topic_reply_" + name + "_menucontent_" + (switchId - switchIdBase + id),
							class: "ipbmenu_content",
							style: "display: none; position: absolute; z-index: 9999;"
						});
						
						jQuery.each(resultList, function(i, e) {
							var $listRow = jQuery("<li/>", {
								style: "z-index: 10000;"
							});
							
							var $listElement = jQuery("<a/>", {
								style: "cursor: pointer; z-index: 10000;",
								html: e
							});
							
							if (name === "textcolor") {
								$listElement.click(function() {
									if (!checkEditorMode(button.get(0)))
										formatText(button.get(0), "[color=" + jQuery(this).find(".yojc_tagValue").text() + "]", "[/color]");
								});
							}
							else if (name === "font") {
								$listElement.click(function() {
									if (!checkEditorMode(button.get(0)))
										formatText(button.get(0), "[font=" + (jQuery(this).find("span").attr("class") === "yojc_tagValueOmit" ? "" : jQuery(this).find("span").css("font-family")) + "]", "[/font]");
								});
							}
							else if (name === "fontSize") {
								$listElement.click(function() {
									if (!checkEditorMode(button.get(0)))
										formatText(button.get(0), "[size=" + (jQuery(this).parent().index() || "") + "]", "[/size]");
								});
							}
							else if (name === "ipsbbcode") {
								$listElement.attr("title", descList[i]);
								
								$listElement.click(function() {
									if (!checkEditorMode(button.get(0)))
										formatText(button.get(0), jQuery(this).find(".yojc_tagStart").text(), jQuery(this).find(".yojc_tagEnd").text());
								});
							}
							
							$listRow.append($listElement);
							$listContainer.append($listRow);
						});
						
						jQuery("body").append($listContainer);
						
						var thisMenu = new ipb.Menu( button.get(0), $("topic_reply_" + name + "_menucontent_" + (switchId - switchIdBase + id)), { stopClose: false } );
					}
				}
				
				// naprawia wszystko
				
				function fixAllButtons() {
					jQuery("textarea.cke_source:not(*.yojcDone)").each(function() {
						if (jQuery(this).parent().attr("id") === "cke_contents_commentFastReply" || window.location.href.match("warnings")) {
						
							fixButton(7, "removeFormat", null, null, this);
							
							fixButton(9, "bold", "[b]", "[/b]", this);
							fixButton(10, "italic", "[i]", "[/i]", this);
							fixButton(11, "underline", "[u]", "[/u]", this);
							fixButton(12, "strike", "[s]", "[/s]", this);
							
							fixList(15, "font", this);
							fixButton(14, "bulletedlist", "[list][*]", "[/list]", this);
							fixList(18, "textcolor", this);
							
							fixButton(20, "link", "[url=", "][/url]", this);
							fixButton(21, "unlink", "[url]", "[/url]", this);
							fixButton(22, "image", "[img]", "[/img]", this);
							
							fixButton(24, "code", "[code]", "[/code]", this);
							fixButton(25, "quote", "[quote]", "[/quote]", this);
							
							jQuery(this).addClass("yojcDone");
						}
						else {
							fixButton(7, "removeFormat", null, null, this);
							
							fixList(8, "ipsbbcode", this);
							fixList(10, "font", this);
							fixList(11, "fontSize", this);
							fixList(13, "textcolor", this);
							
							fixButton(14, "ipsemoticon", null, null, this);
							
							fixButton(30, "bold", "[b]", "[/b]", this);
							fixButton(31, "italic", "[i]", "[/i]", this);
							fixButton(32, "underline", "[u]", "[/u]", this);
							fixButton(33, "strike", "[s]", "[/s]", this);
							
							fixButton(35, "subscript", "[sub]", "[/sub]", this);
							fixButton(36, "superscript", "[sup]", "[/sup]", this);
							
							fixButton(38, "bulletedlist", "[list][*]", "[/list]", this);
							fixButton(39, "numberedlist", "[list=1][*]", "[/list]", this);
							
							fixButton(41, "link", "[url=", "][/url]", this);
							fixButton(42, "unlink", "[url]", "[/url]", this);
							fixButton(43, "image", "[img]", "[/img]", this);
							
							fixButton(44, "code", "[code]", "[/code]", this);
							fixButton(45, "quote", "[quote]", "[/quote]", this);
							
							fixButton(50, "indent", "[indent=1]", "[/indent]", this);
							fixButton(51, "justifyleft", "[left]", "[/left]", this);
							fixButton(52, "justifycenter", "[center]", "[/center]", this);
							fixButton(53, "justifyright", "[right]", "[/right]", this);
							
							jQuery(this).addClass("yojcDone");
						}
					});
				}
				
				
				jQuery("body").click(fixAllButtons);
				jQuery("body").click(appendButtons);
				
				var $script = jQuery("<script/>", {
					type: "text/javascript",
					text: fixButton + formatText + setCaretPosition + deleteSpaces + deleteTags
				});
				jQuery("body").append($script);
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// rozwijanie całych spoilerów
		//---------------------------------
		
		function toggleSpoiler() {
			try {
				//if (!(viewing("topic") || viewing("privmsg") || viewing("msgEdit") || viewing("report") || viewing("profile")))
				//	return;
				
				if (jQuery(".bbc_spoiler_show:not(.bbc_spoiler_wrapper *)").length===0)
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				jQuery(".bbc_spoiler_show[value=Show]").val("Pokaż");
				
				jQuery(".bbc_spoiler_show:not(.bbc_spoiler_wrapper *)").each(function() {
					var e = jQuery(this);
					
					var $button;
					
					if (isDarkSkin()) 
						$button = jQuery("<input/>", {
							class: "ipsButton_secondary",
							type: "button",
							value: "Całość",
							style: "width: 45px; font-size: 0.8em; margin: 0 0 0 5px; padding: 0;"
						});
					else
						$button = jQuery("<input/>", {
							type: "button",
							value: "Całość",
							style: "width: 45px; font-size: 0.7em; margin: 0 0 0 5px; padding: 0;"
						});
					
					e.after($button);
					
					$button.click(function() {
						if (this.value === "Całość") {
							jQuery(this).parent().find(".bbc_spoiler_content").attr("style", "");
							jQuery(this).parent().find(".bbc_spoiler_show[value=Pokaż]").val("Ukryj");
							this.value = "Nic";
						}
						else {
							jQuery(this).parent().find(".bbc_spoiler_content").attr("style", "display: none;");
							jQuery(this).parent().find(".bbc_spoiler_show[value=Ukryj]").val("Pokaż");
							this.value = "Całość";
						}
					});
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// pokazywanie/ukrywanie sygnatur/reputacji
		//---------------------------------
		
		function toggleSigRep() {
			try {
				//if (!(viewing("topic") || viewing("privmsg") || viewing("profile") || viewing("mostRep") || viewing("blogView")))
				//	return;
				
				if (jQuery(".signature, .reputation, div.rep_bar > ul.ipsList_inline, p.rep_highlight").length===0 && !viewing("profile"))
					return;
				
				function toggleMain(prefix, text, target) {
					function toggle() {
						var labels = ["Pokaż " + text, "Ukryj " + text];
						var $toggleButton = jQuery("#" + prefix + "Button");
						var $sigList = jQuery(target);
						
						if ($sigList && $toggleButton.text() === labels[0]) {
							$sigList.each(function() {
								jQuery(this).attr("style", "display: block !important");
							});
							$toggleButton.html(labels[1]);
						}
						else if ($sigList && $toggleButton.text() === labels[1]) {
							$sigList.each(function() {
								jQuery(this).attr("style", "display: none !important");
							});
							$toggleButton.html(labels[0]);
						}
					}
					
					var $toggleButton = jQuery("<a/>", {
						id: prefix + "Button",
						style: "cursor: pointer;",
						text: "Ukryj " + text
					});
					
					var $container = jQuery("<li/>");
					$container.append($toggleButton);
					
					if (isDarkSkin() && userId == 138003) {
						jQuery("#user_navigation > ul > li:nth-child(2)").before($container);
					}
					else if (isDarkSkin()) {
						var $barContainer = jQuery("<ul/>", {
							id: "community_app_menu",
							class: "ipsList_inline right"
						});
						
						$barContainer.append($container);
						$barContainer.appendTo(jQuery("#community_app_menu"));
					}
					else {
						$container.addClass("right");
						
						var $toRemove = jQuery("#community_app_menu > li.right:nth-child(3)");
						
						// wypierdalamy ten przycisk, nie ma kurwa tego przycisku
						if($toRemove.text().match("Regulamin"))
							$toRemove.remove();
						
						jQuery("#nav_explore").after($container);
					}
					
					$toggleButton.click(toggle);
					toggle();
				}
				
				if (shouldItRun("toggleSig") && !(viewing("profile") || viewing("mostRep") || viewing("blogView"))) {
					debug("toggleSig");
					toggleMain("sig", "sygnatury", ".signature");
				}
				
				if (shouldItRun("toggleRep") && !viewing("privmsg")) {
					debug("toggleRep");
					toggleMain("rep", "reputację", ".reputation, div.rep_bar > ul.ipsList_inline, p.rep_highlight");
				}
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// poprawna odmiana nazw miesięcy
		//---------------------------------
		
		function properMonthNames() {
			try {
				if (!(viewing("topic") || viewing("privmsg") || viewing("blogView") || viewing("blogMain")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				var polishMonthNames = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];
				var polishMonthProperNames = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada","grudnia"];
				
				// posty
				jQuery(".published").each(function() {
					if (!isNaN(parseInt(this.textContent[0], 10))) {
						var month = this.textContent.split(" ")[1];
						
						this.innerHTML = this.innerHTML.replace(month, polishMonthProperNames[polishMonthNames.indexOf(month)]);
					}
					var time = this.title.match(/\:\d{2}\:\d{2}/)[0];
					this.innerHTML = this.innerHTML.replace(/\:\d{2}/, time);
				});
				
				// pw
				jQuery(".post_date, .posted_info").each(function() {
					if (!isNaN(parseInt(this.textContent[8], 10))) {
						var month = this.textContent.split(" ")[2];
						
						this.innerHTML = this.innerHTML.replace(month, polishMonthProperNames[polishMonthNames.indexOf(month)]);
					}
				});
				
				// blogi
				jQuery(".entry_header.row2.ipsPad_half div.desc").each(function() {
					var tmp = this.textContent.match(/\d{1,2}\s(\S+)\s\d{4}/);
					
					if (!tmp)
						return true;
					
					var month = tmp[1];
					
					var $nick = jQuery(this).find("a[hovercard-ref][id!^=unhide]").replaceWith(jQuery("<a/>", {
						id: "tmpNick"
					}));
					var $tags = jQuery(this).find(".ipsType_small.desc.blend_links").replaceWith(jQuery("<span/>", {
						id: "tmpTags"
					}));
					
					this.innerHTML = this.innerHTML.replace(month, polishMonthProperNames[polishMonthNames.indexOf(month)]);
					
					jQuery(this).find("#tmpNick").replaceWith($nick);
					jQuery(this).find("#tmpTags").replaceWith($tags);
				});
				
				// cytaty
				jQuery(".citation").each(function() {
					if (this.textContent.split(",").length === 3) {
						var month = this.textContent.split(",")[1].trim().split(" ")[1];
						this.innerHTML = this.innerHTML.replace(month, polishMonthProperNames[polishMonthNames.indexOf(month)]);
					}
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// wyłączanie Lightboxa
		//---------------------------------
		
		function turnOffLightbox() {
			try {
				//if (!(viewing("topic") || viewing("privmsg") || viewing("msgEdit") || viewing("report") || viewing("profile") || viewing("blogView")))
				//	return;
				
				if (jQuery("a[id^=ipb-attach-url], *[rel=lightbox]").length===0)
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				jQuery("a[id^=ipb-attach-url], *[rel=lightbox]").attr("rel", "");
				
				jQuery("img.bbc_img").each(function() {
					if (this.parentNode.tagName !== "A")
						jQuery(this).attr("style", "cursor: default !important;");
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// chowanie kodu
		//---------------------------------
		
		function toggleCode() {
			try {
				//if (!(viewing("topic") || viewing("privmsg") || viewing("msgEdit") || viewing("report") || viewing("profile") || viewing("blogView")))
				//	return;
				
				if (jQuery(".prettyprint").length===0)
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				jQuery(".prettyprint").hide();

				var $showButton = jQuery("<pre/>", {
					class: "prettyprint",
					style: "cursor: pointer",
					text: "Kliknij, aby pokazać kod"
				});

				$showButton.click(function() {
					jQuery(this).fadeOut("fast", function() {
						jQuery(this).next().fadeToggle();
						jQuery(this).remove();
					});
				});

				jQuery(".prettyprint").before($showButton);
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// zwijanie cytatów
		//---------------------------------
		
		function toggleQuote() {
			try {
				//if (!(viewing("topic") || viewing("privmsg") || viewing("msgEdit") || viewing("report") || viewing("profile") || viewing("blogView")))
				//	return;
				
				if (jQuery(".citation").length===0)
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				jQuery(".citation").each(function() {
					var button = jQuery("<a/>", {
						class: "quoteToggle",
						text: " (zwiń cytat)",
						style: "cursor: pointer;"
					});
					
					button.click(function() {
						if (this.innerHTML == " (zwiń cytat)") {
							jQuery(this).parent().fadeTo("slow", 0.3);
							this.innerHTML = " (rozwiń cytat)";
						}
						else if (this.innerHTML == " (rozwiń cytat)") {
							jQuery(this).parent().fadeTo("slow", 1);
							this.innerHTML = " (zwiń cytat)";
						}
						
						jQuery(this).parent().next().fadeToggle();
					});
					
					jQuery(this).append(button);
				});
				
				var base;
				
				if (viewing("report"))
					base = ".blockquote .blockquote .blockquote";
				else
					base = ".blockquote .blockquote";
				
				jQuery(base + ":not(" + base + " .blockquote)").each(function() {
					jQuery(this).prev().find("a.quoteToggle").click();
					jQuery(this).hide();
					jQuery(this).prev().fadeTo(0, 0.3);
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// pokazywanie starego spoilera
		//---------------------------------
		
		function hoverSpoiler() {
			try {
				//if (!(viewing("topic") || viewing("privmsg") || viewing("msgEdit") || viewing("report") || viewing("profile") || viewing("blogView")))
				//	return;
				
				var spoilerSelector = "span[style=color\\:black\\;background\\-color\\:black], span[style=color\\:\\#000000\\;background\\:\\#000000], span[style=\"background\\-color\\: black\"] > span[style=\"color\\: black\"], span[style=\"color\\: black\"] > span[style=\"background\\-color\\: black\"]";
				
				if (jQuery(spoilerSelector).length===0)
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				jQuery(spoilerSelector).each(function() {
					jQuery(this).hover(function() {
						jQuery(this).attr("style", "color:white;background-color:black");
					}, function() {
						jQuery(this).attr("style", "color:black;background-color:black");
					});
					
					jQuery(this).click(function() {
						jQuery(this).unbind("mouseenter");
						jQuery(this).unbind("mouseover");
						jQuery(this).unbind("mouseleave");
						jQuery(this).unbind("mouseout");
						jQuery(this).unbind("hover");
						jQuery(this).unbind("click");
						jQuery(this).attr("style", "transition: all 0.15s linear;");
						
						if (this.parentNode.nodeName === "SPAN")
							jQuery(this).parent().attr("style", "transition: all 0.15s linear;");
					});
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// koipiowanie nicków do schowka
		//---------------------------------
		
		function copyNick() {
			try {
				if (!(viewing("topic") || viewing("profile")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				function appendList(count) {
					// niestety IPB się wysypuje przy próbie podpięcia tej samej listy do wielu elementów (menu otwiera się i znika)
					// więc musi być to zrobione tak ciulowo (bo tak to jedna lista by wystarczyła), chyba, że masz lepszy pomysł
					for (var i=0; i<count; i++) {
						var tmpNick = "<span class=\"yojc_copyNick\" style=\"display: none;\">dupa</span>";
						var tmpId = "<span class=\"yojc_copyId\" style=\"display: none;\">666</span>";
						var resultList = [
							"Sam nick" + tmpNick + "",
							"@[b][member=" + tmpNick + "][/b]: ",
							"[b][member=" + tmpNick + "][/b]",
							"[member=" + tmpNick + "]",
							"[user=" + tmpId + "]" + tmpNick + "[/user]",
							"[uost=" + tmpId + "]" + tmpNick + "[/uost]"
						];
						
						var $listContainer = jQuery("<ul/>", {
							id: "topic_user_nick_menucontent_" + i,
							class: "ipbmenu_content",
							style: "display: none; position: absolute; z-index: 9999;"
						});
						
						jQuery.each(resultList, function(i, e) {
							var $listRow = jQuery("<li/>", {
							style: "z-index: 10000;"
							});
							
							var $listElement = jQuery("<a/>", {
								style: "cursor: pointer; z-index: 10000;",
								html: e
							});

							$listElement.click(function() {
								prompt("Skopiuj do schowka (Ctrl+C):", this.textContent.replace("Sam nick", ""));
							});
							
							$listRow.append($listElement);
							$listContainer.append($listRow);
						});
						
						jQuery("body").append($listContainer);
					}
				}
				
				if (viewing("topic")) {
					if (!isDarkSkin()) {
						var $dot = jQuery("<img/>", {
							class: "post_online",
							style: "margin: -3px 5px 0px 0px; vertical-align: middle;",
							src: "http://x.forum.cdaction.pl//public/style_images/infinite_dark/post_offline.png"
						});
						
						jQuery(".author.vcard").prepend($dot);
					}
					
					appendList(jQuery(".post_online").length);
					
					try {
						jQuery(".post_online").each(function(i) {
							var thisMenu = new ipb.Menu(this, $("topic_user_nick_menucontent_" + i), { stopClose: false });
						});
					}
					catch (err) {
					}
					
					jQuery(".post_online").css("cursor", "pointer");
					
					jQuery(".post_online").click(function() {
						var id = (jQuery(this).parent().html().match(/hovercard-id\=\"(\d+)\"/));// || jQuery(this).parent().parent().next().find(".ipsUserPhoto").attr("src").match(/photo\-(\d+)/));
						var nick = jQuery(this).parent().text().trim();
						
						if (!id) {
							jQuery(".yojc_copyId").parent().hide();
							jQuery(".yojc_copyId").html("");
						}
						else {
							jQuery(".yojc_copyId").parent().show();
							jQuery(".yojc_copyId").html(id[1]);
						}
						
						jQuery(".yojc_copyNick").html(nick);
					});
				}
				else if (viewing("profile")) {
					appendList(1);
					
					var thisMenu = new ipb.Menu(jQuery(".ipsBadge.reset_cursor").get(0), $("topic_user_nick_menucontent_0"), { stopClose: false });
					
					jQuery(".yojc_copyNick").html(jQuery(".ipsType_pagetitle > .fn.nickname").text());
					jQuery(".yojc_copyId").html((window.location.href.match(/showuser\=(\d+)/) || window.location.href.match(/m(\d+)\.html/))[1]);
					
					jQuery(".ipsBadge.reset_cursor").css("cursor", "pointer");
				}
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// wyświetlanie nagród Smugglerkowych
		//---------------------------------
		
		function showForumAwards() {
			try {
				if (!(viewing("topic") || viewing("privmsg")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				var nameClass;
				
				if (isDarkSkin())
					nameClass = ".post_username";
				else
					nameClass = ".author.vcard";

				jQuery(".wyroznienieSmugglerkowe").each(function() {
					
					this.src = "http://media.gtanet.com/gtaforums/images/medal.png";
					this.setAttribute("style", "margin: 2px 0 0 2px;");
					this.title = this.title.replace(/<br \/\>/g, "");
					
					jQuery(this).appendTo(jQuery(this).parent().parent().parent().parent().parent().parent().parent().find(nameClass));
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// zmiana embedów YT z Flash na HTML5
		//---------------------------------
		
		function changeYTEmbeds() {
			try {
				if (jQuery(".post object").length===0)
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				var tmp = parseInt(localStorage.getItem("yojc_changeYTEmbedsOpts"), 10);
				var maxEmbedCount = isNaN(tmp) ? 0 : tmp;
				
				function changeEmbed(e, l) {
					var $video = jQuery("<iframe></iframe>", {
						width: 560,
						height: 315,
						frameborder: 0,
						allowfullscreen: true,
						src: l
					});
					
					if (jQuery(e).parent().parent().attr("style") === "display:table;") {
						jQuery(e).parent().parent().replaceWith($video);
						$video.after(jQuery("<br></br>"));
					}
					else
						jQuery(e).replaceWith($video);
				}
				
				if (maxEmbedCount < jQuery(".post object").length)
					jQuery(".post").each(function() {
						jQuery(this).click(function() {
							jQuery(this).find("object").each(function() {
								var movieLink = jQuery(this).find("param[name=movie]").val();
								if (typeof movieLink !== "undefined")
									changeEmbed(this, movieLink.replace(/\/v\//, "/embed/"));
									});
						});
					});
				else
					jQuery(".post object").each(function() {
						var movieLink = jQuery(this).find("param[name=movie]").val();
						if (typeof movieLink !== "undefined")
							changeEmbed(this, movieLink.replace(/\/v\//, "/embed/"));
					});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// wysyłanie na Ctrl + Enter
		//---------------------------------
		
		function sendCtrlEnter() {
			try {
				if (!(viewing("topic") || viewing("privmsg")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				jQuery("textarea").eq(1).on("keypress", function(e) { 
					if (e.ctrlKey && (e.which === 13)) {
						jQuery(this).closest("form").find("#submit_post, input[id^=\"edit_save_\"], input[name=\"dosubmit\"]").trigger("click");
					}
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		
		//---------------------------------
		// poniżej skrypty dla moderatorów
		//---------------------------------
		
		//---------------------------------
		// "Zbanuj spamera"
		//---------------------------------
		
		function addBanSpammerButton() {
			try {
				if (!(viewing("profile")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				var vipGroups = ["Administrators", "Ghost", "Guests", "Junior Admini", "Redaktorzy", "Moderatorzy", "Junior Moderatorzy"];
				var userGroup = jQuery(".row_data").eq(0).text().trim();
				var $actionBox = jQuery("div.ipsLayout_right > div.general_box.clearfix").eq(0);
				
				if (vipGroups.indexOf(userGroup) == -1) {
					var spacer = isDarkSkin() ? "&nbsp;" : "";
					var ulClass = isDarkSkin() ? "ipsList_data" : "ipsPad";
					
					if ($actionBox.children("h3").text() != "Narzędzia użytkownika") {
						var userId = window.location.href.match(/showuser=\d+/)[0].match(/\d+/);
						var hash = document.body.innerHTML.match(/secure_hash\W+(\w+)/)[1];
						
						var $newActionBox = jQuery('<div class="general_box clearfix">\
								<h3>Narzędzia użytkownika</h3>\
								<ul class="' + ulClass + '">\
									<li>\
										<a href="http://forum.cdaction.pl/index.php?app=core&amp;module=modcp&amp;do=setAsSpammer&amp;member_id=' + userId + '&amp;auth_key=' + hash + '" onclick="return ipb.global.toggleFlagSpammer(' + userId + ', true)">\
											<img src="http://x.forum.cdaction.pl//public/style_images/infinite_dark/spammer_off.png" alt="Oflaguj jako Spammera">' + spacer + ' Oflaguj jako Spammera\
										</a>\
									</li>\
								</ul>\
							</div>');
						
						$newActionBox.insertBefore($actionBox);
						$actionBox = $newActionBox;
					}
					
					var buttonCode = "<li>\
						<a id=\"banSpammerLink\" style=\"cursor: pointer\">\
							<img src=\"http://x.forum.cdaction.pl//public/style_images/infinite_dark/delete.png\" alt=\"Zbanuj spamera\">" + spacer + " Zbanuj spamera</a>\
						</li>";
					
					$actionBox.children("." + ulClass).html(buttonCode + $actionBox.children("." + ulClass).html());
					
					jQuery("#banSpammerLink").click(function() {
						var _options = {
							type: 'pane',
							modal: true,
							initial: '<div><h3>Potwierdź zbanowanie spamera</h3>\
								<div class="ipsPad ipsForm_center"><p>Ta funkcja oznaczy użytkownika jako spamera, a dodatkowo przeniesie go do grupy Odrzutki, zbanuje na stałe i da ostrzeżenie o wartości 5. Proszę używać z rozwagą!\
								<br /><br />\
								<b>Proszę potwierdzić chęć zbanowania użytkownika za spam</b>:\
								<br /><br />\
								</p><br /><span onclick="ipb.global.popups[\'banSpammer\'].hide()" class="clickable ipsButton_secondary important">Anuluj</span> &nbsp; <span id="confirmButton" class="clickable ipsButton_secondary">Potwierdzam</span></div>',
							hideAtStart: false,
							w: '',
							h: '',
						};
						ipb.global.popups.banSpammer = new ipb.Popup('confirm',_options);
						
						jQuery("#confirmButton").click(function() {
							var userId = window.location.href.match(/showuser=\d+/)[0].match(/\d+/);
							var hash = document.body.innerHTML.match(/secure_hash\W+(\w+)/)[1];
							var banLink = "http://forum.cdaction.pl/index.php?app=members&module=profile&section=warnings&do=save&member=" + userId;
							var flagLink = "http://forum.cdaction.pl/index.php?app=core&module=modcp&do=setAsSpammer&member_id=" + userId + "auth_key=" + hash;
							
							jQuery.post(flagLink);
							jQuery.post(banLink, {
								from_app: "members",
								reason: 13,
								points: 5,
								suspend_perm: true,
								ban_group: true,
								ban_group_id: 5,
								note_mods: "Konto zostało zbanowane za pomocą [url=http://forum.cdaction.pl/index.php?showtopic=262666]SuperSkryptu yojca(tm)[/url] (wersja " + yojcVersion + ")."
								}).done(function() {
								ipb.global.okDialogue("Wygląda na to, że się udało");
								location.reload(true);
							});
						});
					});
				}
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// zmiana "ukryte" na liczbę postów/tematów do zatwierdzenia
		//---------------------------------
		
		function showHiddenCount($e) {
			try {
				if (!(viewing("main") || viewing("forum")))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				if ($e === null) {
					debug(arguments.callee.name);
					$e = jQuery("body");
				}
				
				var $tags = $e.find(".ipsBadge.ipsBadge_orange");
				
				$tags.each(function(i, e) {
					e = jQuery(e);
					var count;
					
					if (e.attr("data-tooltip") != null) {
						count = e.attr("data-tooltip").match(/\d+/g);
						
						if (count.length === 2) {
							var number1 = parseInt(count[0], 10);
							var number2 = parseInt(count[1], 10);
							
							if (number1 !== 0 && number2 !== 0)
								e.html(number1 + " " + properForm(number1, "temat") + ", " + number2 + " " + properForm(number2, "post"));
							else if (number1 === 0)
								e.html(number2 + " " + properForm(number2, "post"));
							else if (number2 === 0)
								e.html(number1 + " " + properForm(number1, "temat"));
						}
					}
					else if (e.parent().attr("data-tooltip") != null) {
						count = e.parent().attr("data-tooltip").match(/\d+/g);
						
						if (count.length === 1)
							e.html(count[0] + " " + properForm(count[0], "post"));
					}
					else if (e.html() == "Ukryte")
						e.html("Temat niezatwierdzony");
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// zmiana liczby ostrzeżeń na pasek
		//---------------------------------
		
		function changeWarnCountToBar() {
			try {
				//if (!(viewing("topic") || viewing("privmsg") || viewing("report") || viewing("profile") || viewing("blogView")))
				//	return;
				
				if (jQuery("a[title$=ostrzeżeń]")===0 || viewing("editMember"))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				jQuery("a[title$=ostrzeżeń]").each(function(i,e) {
					e = jQuery(e);
					var warnCount = e.html().replace(/[^\d.]/g, "");
					var maxRed = 136;
					var colorFrame, colorBar, colorBg;
					
					if (warnCount !== "") {
						warnCount = parseInt(warnCount, 10);
						var maxWarnCount = 5;
						var barWidth = warnCount > maxWarnCount ? "100%" : (warnCount/maxWarnCount)*100 + "%";
						
						if (isDarkSkin()) {
							maxRed = 136;
							colorFrame = "#2E2E2E";
							colorBar = "#ADADAD";
							colorBg = "#262626";
						}
						else {
							maxRed = 255;
							colorFrame = "#D5DDE5";
							colorBar = "#243F5C";
							colorBg = "#FFFFFF";
						}
						
						// płynna zmiana koloru
						
						if (warnCount > 1 && warnCount < maxWarnCount) {
							var valRed = parseInt(colorBar.slice(1, 3), 16);
							var valGreen = parseInt(colorBar.slice(3, 5), 16);
							var valBlue = parseInt(colorBar.slice(5, 7), 16);
							
							valRed = Math.round(valRed + (warnCount-1) * (maxRed-valRed)/(maxWarnCount-1));
							valGreen = Math.round(valGreen - (warnCount-1) * (valGreen)/(maxWarnCount-1));
							valBlue = Math.round(valBlue - (warnCount-1) * (valBlue)/(maxWarnCount-1));
							
							colorBar = "rgb(" + valRed + ", " + valGreen + ", " + valBlue + ")";
						}
						else if (warnCount > 4) {
							colorBar = "#" + maxRed.toString(16) + "0000";
						}
						
						jQuery(e).parent().find("img[title=\"Moderator dodał ostrzeżenie dla tej treści\. Kliknij po więcej szczegółów\.\"]").attr("style", "float: left; position: relative; bottom: 18px;");
						
						var $newP = jQuery("<a/>", {
							style: "display: block; border: 1px solid " + colorFrame + "; height: 6px; margin-top: 3px; margin-bottom: 3px; background-color: " + colorBg + ";",
							href: e.attr("href"),
							title: e.attr("title")
						});
						
						$newP.append(jQuery("<span/>", {
							style: "display: block; width: " + barWidth + "; height: 100%; background-color: " + colorBar + ";"
						}));
						
						e.before($newP);
						e.remove();
					}
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// dodanie szybkich opcji wyboru do IP
		//---------------------------------
		
		function quickIP() {
			try {
				//if (!(viewing("topic") || viewing("privmsg") || viewing("deletedPosts")))
				//	return;
				
				if (jQuery(".ip a").length===0)
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				jQuery(".ip a").each(function(i) {
					/*
					var ip = jQuery(this).text();
					var e = jQuery(this).parent();
					
					e.html("(IP: " + ip + "; \
						<a href=\"http://forum.cdaction.pl/index.php?app=core&module=modcp&fromapp=members&tab=iplookup&iptool=resolve&_do=submit&ip=" + ip + "\">rozwiń</a>, \
						<a href=\"http://forum.cdaction.pl/index.php?app=core&module=modcp&fromapp=members&tab=iplookup&_do=submit&ip=" + ip + "\">posty</a>, \
						<a href=\"http://forum.cdaction.pl/index.php?app=core&module=modcp&fromapp=members&tab=iplookup&iptool=members&_do=submit&ip=" + ip + "\">użytkownicy</a>)");
					*/
					var ip = jQuery(this).text();
					
					var textList = [
						"Rozwiń IP",
						"Znajdź posty",
						"Znajdź użytkowników"
					];
					
					var linkList = [
						"http://forum.cdaction.pl/index.php?app=core&module=modcp&fromapp=members&tab=iplookup&iptool=resolve&_do=submit&ip=" + ip,
						"http://forum.cdaction.pl/index.php?app=core&module=modcp&fromapp=members&tab=iplookup&_do=submit&ip=" + ip,
						"http://forum.cdaction.pl/index.php?app=core&module=modcp&fromapp=members&tab=iplookup&iptool=members&_do=submit&ip=" + ip
					];
					
					var $listContainer = jQuery("<ul/>", {
						id: "topic_ip_menucontent_" + i,
						class: "ipbmenu_content",
						style: "display: none; position: absolute; z-index: 9999;"
					});
					
					// zmiana końcówki na .*
					
					var $listRow = jQuery("<li/>", {
						style: "z-index: 10000;",
						html: '<a><input class="input_check" id="yojc_toggleIP' + i + '" name="yojc_toggleIP' + i + '" type="checkbox"> <label for="yojc_toggleIP' + i + '">&nbsp;Końcówka .*</label></a>'
					});
					
					$listRow.find("input").change(function () {
						if (this.checked) {
							jQuery(this).parent().parent().parent().find(".yojc_optIP").each(function(i) {
								this.innerHTML = this.innerHTML.replace(ip, ip.replace(/\.\d+?$/, ".*"));
								
								if (i === 1) {
									this.children[0].setAttribute("style", "pointer-events: none; cursor: default; text-decoration: line-through; ");
								}
							});
						}
						else {
							jQuery(this).parent().parent().parent().find(".yojc_optIP").each(function(i) {
								this.innerHTML = this.innerHTML.replace(ip.replace(/\.\d+?$/, ".*"), ip);
								
								if (i === 1) {
									this.children[0].setAttribute("style", "cursor: pointer; z-index: 10000;");
								}
							});
						}
					});
					
					$listContainer.append($listRow);
					
					// kopiowanie do schowka
					
					$listRow = jQuery("<li/>", {
						style: "z-index: 10000;",
						class: "yojc_optIP"
					});
					
					var $listElement = jQuery("<a/>", {
						style: "cursor: pointer; z-index: 10000;",
						text: "Kopiuj do schowka",
						onclick: "prompt(\"Skopiuj do schowka (Ctrl+C):\", \"" + ip + "\");",
					});
					
					$listRow.append($listElement);
					$listContainer.append($listRow);
					
					jQuery.each(textList, function(i, e) {
						var $listRow = jQuery("<li/>", {
							style: "z-index: 10000;",
							class: "yojc_optIP"
						});
						
						var $listElement = jQuery("<a/>", {
							style: "cursor: pointer; z-index: 10000;",
							href: linkList[i],
							text: e
						});
						
						$listRow.append($listElement);
						$listContainer.append($listRow);
					});
					
					jQuery("body").append($listContainer);
					
					var thisMenu = new ipb.Menu(this, $("topic_ip_menucontent_" + i), { stopClose: true });
				});
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// dodanie linków do historii ostrzeżeń użytkownika
		//---------------------------------
		
		function showWarnLogLink() {
			try {
				//if (!(viewing("topic") || viewing("privmsg") || viewing("report") || viewing("profile")))
				//	return;
				
				if (jQuery(".group_title").length===0 && !viewing("profile"))
					return;
				
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				var vipGroups = ["Administrators", "Ghost", "Guests", "Junior Admini", "Redaktorzy"];
				
				if (!viewing("profile")) {
					jQuery(".group_title").each(function() {
						if (vipGroups.indexOf(this.textContent.trim()) > -1)
							return;
						else {
							var idMember = jQuery(this).parent().parent().parent().parent().find("h3 a.url.fn.name.___hover___member._hoversetup").attr("hovercard-id");
							var idFrom, idFrom2, idApp;
							
							if (viewing("privmsg")) {
								idFrom = jQuery(this).parent().parent().parent().parent().parent().attr("id").match(/\d+/)[0];
								idFrom2 = "";
								idApp = "members";
							}
							else if (viewing("topic")) {
								idFrom = jQuery(this).parent().parent().parent().parent();
								if (idFrom.attr("style") === "display:none") {
									idFrom = idFrom.attr("id").match(/\d+/)[0];
								}
								else {
									idFrom = idFrom.parent().attr("id").match(/\d+/)[0];
								}
								idFrom2 = "";
								idApp = "forums";
							}
							else if (viewing("report")) {
								idFrom = "mreport";
								idFrom2 = window.location.href.match(/rid\=(\d+)/)[1];
								idApp = "core";
							}
							
							var $warnContainer = jQuery("<li/>");
							var $warnLink = jQuery("<a/>", {
								id: "warn_link_" + idFrom + "_" + idMember,
								class: "desc lighter blend_links",
								title: "Zobacz historię ostrzeżeń",
								text: "Historia ostrzeżeń",
								href: "http://forum.cdaction.pl/index.php?app=members&module=profile&section=warnings&member=" + idMember + "&from_app=" + idApp + "&from_id1=" + idFrom + "&from_id2=" + idFrom2
							});
							
							$warnLink.appendTo($warnContainer);
							$warnContainer.appendTo(jQuery(this).parent());
						}
					});
				}
				else if (viewing("profile")) {
					if (vipGroups.indexOf(jQuery(".ipsList_data.clearfix .row_data").eq(0).text().trim()) > -1)
						return;
					else {
						var idMember = (window.location.href.match(/showuser\=(\d+)/) || window.location.href.match(/m(\d+)\.html/))[1];
						
						var $warnContainer = jQuery("<div/>", {
							class: "warn_panel clear ipsType_small"
						});
						var $warnBold = jQuery("<strong/>");
						var $warnLink = jQuery("<a/>", {
							title: "Zobacz historię ostrzeżeń",
							text: "Historia ostrzeżeń",
							href: "http://forum.cdaction.pl/index.php?app=members&module=profile&section=warnings&member=" + idMember + "&from_app=members"
						});
						
						$warnLink.appendTo($warnBold);
						$warnBold.appendTo($warnContainer);
						$warnContainer.insertAfter(jQuery(".short.photo_holder"));
					}
				}
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		//---------------------------------
		// zawsze wyświetlaj link do raportów
		//---------------------------------
		
		function alwaysShowReports() {
			try {
				if (!shouldItRun(arguments.callee.name))
					return;
				
				debug(arguments.callee.name);
				
				var $reportCenterLink = jQuery("a[title=\"Zobacz aktywne raporty\"]");
				
				if (jQuery("#admin_bar").length > 0 && $reportCenterLink.length === 0) {
					var $reportContainer = jQuery("<li/>");
					var $reportLink = jQuery("<a/>", {
						href: "http://forum.cdaction.pl/index.php?app=core&module=reports&do=index",
						title: "Zobacz aktywne raporty",
						text: "Brak raportów"
					});

					$reportContainer.append($reportLink);
					jQuery("#admin_bar > ul.ipsList_inline.left").eq(0).append($reportContainer);
				}
				else if ($reportCenterLink.length > 0) {
					var count = $reportCenterLink.text().replace(" Aktywne raporty", "");
					$reportCenterLink.text(count + " " + properForm(count, "aktywn") + " " + properForm(count, "raport"));
				}
			}
			catch (err) {
				alertError(arguments.callee.name, err);
			}
		}
		
		// jedziemy z koksem
		debug("SuperSkrypt yojca");
		debug("Jeśli się nie wyświetli \"Koniec\", to najwyraźniej jakiś skrypt nawalił");
		
		createLinkToPanel();
		createSettingsPanelTab();
		createSettingsPanel();
		
		setTimeout(function(){ignoreTopics();}, 100);
		setTimeout(function(){ignoreBlogEntries();}, 100);
		setTimeout(function(){toggleQuote();}, 100);
		
		showPostsPerDay();
		showGender();
		colorNick();
		showHiddenCount(null);
		hideForums(null);
		showSubforums(null);
		toggleSpoiler();
		toggleSigRep();
		properMonthNames();
		simpleEditor();
		turnOffLightbox();
		toggleCode();
		hoverSpoiler();
		copyNick();
		showForumAwards();
		changeYTEmbeds();
		sendCtrlEnter();
		
		changeWarnCountToBar();
		addBanSpammerButton();
		quickIP();
		alwaysShowReports();
		
		setTimeout(function(){showWarnLogLink();}, 100);
		
		debug("Koniec");
	}
	
	// biała skórka to zło bo nie ma jQuery
	
	if(!window.jQuery && window.location.href !== "about:blank") {
		var script = document.createElement("script");
		script.src = "http://x.forum.cdaction.pl//public/style_images/infinite_dark/js/jquery.min.js";
		document.body.appendChild(script);
		script.onload = doStuff;
	}
	else {
		doStuff();
	}
})();