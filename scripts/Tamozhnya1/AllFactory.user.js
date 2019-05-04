// ==UserScript==
// @name           AllFactory
// @namespace      Tamozhnya1
// @description    All Factory In One Page
// @include        http://*.heroeswm.*/map.php*
// @include        http://173.231.37.114/map.php*
// @include        http://178.248.235.15/map.php*
// @include        http://*герои.рф/map.php*
// @include        http://*lordswm.com/map.php*
// @grant GM_xmlhttpRequest
// @version 0.0.1.20150225105139
// ==/UserScript==
var GlobalCultureName = location.href.match('lordswm') ? "en-US" : "ru-RU",
    Strings = {
        "ru-RU" : {
            Mining : ustring("Добыча"),
            Machining : ustring("Обработка"),
            Production : ustring("Производство"),
            Wage : ustring("Зарплата")
        },
        "en-US" : {
            Mining : "Mining",
            Machining : "Machining",
            Production : "Production",
            Wage : "Wage"
        }
    },
    LocalizedString = Strings[GlobalCultureName];

// Получаем координаты
var mapRef = document.querySelector("a[href^='map.php?cx=']"),
    x = getVarValueFromURL("cx", mapRef.href),
    y = getVarValueFromURL("cy", mapRef.href);
var factoryTypes = ["mn", "fc", "sh"];
var currentFactoryType = getFactoryType();
var mainFactoriesTable = getFactoriesTable(document);
if(!mainFactoriesTable) {
	return;
}
var factoriesTableContainer = mainFactoriesTable.parentNode;
var tabCount = 1;
var factoryTables = { };
factoryTables[currentFactoryType] = mainFactoriesTable;
// Асинхронно запрашиваем др. станицы
for(var i = 0; i < factoryTypes.length; i++) {
	if(factoryTypes[i] != currentFactoryType) {
        appendFactoriesTable(factoryTypes[i]);
	}
}
function appendFactoriesTable(factoryType) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: "map.php?cx=" + x + "&cy=" + y + "&st=" + factoryType,
        overrideMimeType: "text/html; charset=windows-1251",
        onload: function (response) {
            factoryTables[factoryType] = getFactoriesTable(htmltocontext(response.responseText));
            tabCount++;
            if(tabCount == 3) {
                factoriesTableContainer.removeChild(mainFactoriesTable);
                for(var i = 0; i < factoryTypes.length; i++) {
                    factoriesTableContainer.appendChild(factoryTables[factoryTypes[i]])
                }
            }
        }
    });
}
function getFactoryType() {
	var b = document.getElementsByTagName("b");
	for(var i = 0; i < b.length; i++) {
        switch(b[i].innerHTML) {
            case LocalizedString.Mining:
                return 'mn';
            case LocalizedString.Machining:
                return 'fc';
            case LocalizedString.Production:
                return 'sh';
        }
	}
}
function getFactoriesTable(doc) {
	var b = doc.getElementsByTagName("b");
	for(var i = 0; i < b.length; i++) {
        if(b[i].innerHTML.indexOf(LocalizedString.Wage) > -1) {
			return b[i].parentNode.parentNode.parentNode;
        }
	}
}
function htmltocontext(source) {
	var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
	var doc = document.implementation.createDocument('', '', dt);
	var html = doc.createElement('html');
	html.innerHTML = source;
	doc.appendChild(html);
	return doc;
}
function getVarValueFromURL(varName, url) {
	if(url == undefined) {
		url = window.location.toString();
	}
    var data = url.substring(url.indexOf('?') + 1);
    var vars = data.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == varName) {
            return pair[1];
        }
    }
    return null;
}
function uchar(s) {
    switch (s[0]) {
    case "А":
        return "\u0410";
    case "Б":
        return "\u0411";
    case "В":
        return "\u0412";
    case "Г":
        return "\u0413";
    case "Д":
        return "\u0414";
    case "Е":
        return "\u0415";
    case "Ж":
        return "\u0416";
    case "З":
        return "\u0417";
    case "И":
        return "\u0418";
    case "Й":
        return "\u0419";
    case "К":
        return "\u041a";
    case "Л":
        return "\u041b";
    case "М":
        return "\u041c";
    case "Н":
        return "\u041d";
    case "О":
        return "\u041e";
    case "П":
        return "\u041f";
    case "Р":
        return "\u0420";
    case "С":
        return "\u0421";
    case "Т":
        return "\u0422";
    case "У":
        return "\u0423";
    case "Ф":
        return "\u0424";
    case "Х":
        return "\u0425";
    case "Ц":
        return "\u0426";
    case "Ч":
        return "\u0427";
    case "Ш":
        return "\u0428";
    case "Щ":
        return "\u0429";
    case "Ъ":
        return "\u042a";
    case "Ы":
        return "\u042b";
    case "Ь":
        return "\u042c";
    case "Э":
        return "\u042d";
    case "Ю":
        return "\u042e";
    case "Я":
        return "\u042f";
    case "а":
        return "\u0430";
    case "б":
        return "\u0431";
    case "в":
        return "\u0432";
    case "г":
        return "\u0433";
    case "д":
        return "\u0434";
    case "е":
        return "\u0435";
    case "ж":
        return "\u0436";
    case "з":
        return "\u0437";
    case "и":
        return "\u0438";
    case "й":
        return "\u0439";
    case "к":
        return "\u043a";
    case "л":
        return "\u043b";
    case "м":
        return "\u043c";
    case "н":
        return "\u043d";
    case "о":
        return "\u043e";
    case "п":
        return "\u043f";
    case "р":
        return "\u0440";
    case "с":
        return "\u0441";
    case "т":
        return "\u0442";
    case "у":
        return "\u0443";
    case "ф":
        return "\u0444";
    case "х":
        return "\u0445";
    case "ц":
        return "\u0446";
    case "ч":
        return "\u0447";
    case "ш":
        return "\u0448";
    case "щ":
        return "\u0449";
    case "ъ":
        return "\u044a";
    case "ы":
        return "\u044b";
    case "ь":
        return "\u044c";
    case "э":
        return "\u044d";
    case "ю":
        return "\u044e";
    case "я":
        return "\u044f";
    case "Ё":
        return "\u0401";
    case "ё":
        return "\u0451";
    default:
        return s[0];
    }
}
function ustring(s) {
    s = String(s);
    var result = "";
    for (var i = 0; i < s.length; i++) {
        result += uchar(s[i]);
    }
    return result;
}