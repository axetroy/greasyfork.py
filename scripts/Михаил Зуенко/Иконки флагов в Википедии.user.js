// ==UserScript==
// @name         Иконки флагов в Википедии
// @namespace    wikiflagicons
// @icon         http://ru.wikipedia.org/favicon.ico
// @version      1.0
// @description  Подставляет иконки языков
// @author       Зуенко Михаил
// @include      http*://*.wikipedia.org/*
// @include      http*://*.wikimedia.org/*
// @include      http*://*.wiktionary.org/*
// @include      http*://*.wikibooks.org/*
// @include      http*://*.wikidata.org/*
// @include      http*://*.wikinews.org/*
// @include      http*://*.wikiquote.org/*
// @include      http*://*.wikisource.org/*
// @include      http*://*.wikiversity.org/*
// @include      http*://*.wikivoyage.org/*
// ==/UserScript==

var URL = "https://github.com/DavideViolante/Wikipedia-Flag-Icons/raw/master/Chrome%20Extension/WikipediaFlagIcons/flags/";
var flagLangCode = {
	en: "gb", de: "de", es: "es", fr: "fr", it: "it", nl: "nl", ja: "jp", pl: "pl", ru: "ru", sv: "se",
	vi: "vn", id: "id", ms: "my", cs: "cz", ko: "kr", hu: "hu", no: "no", pt: "pt", ro: "ro", sr: "rs",
	fi: "fi", tr: "tr", uk: "ua", zh: "cn", bs: "ba", bg: "bg", da: "dk", et: "ee", el: "gr", he: "il",
	ge: "ge", uz: "uz", am: "et", arz: "eg", az: "az", be: "by", bi: "vu", bn: "bd", hy: "am", is: "is",
	hr: "hr", lv: "lv", lt: "lt", sk: "sk", sl: "si", th: "th", ga: "ie", ka: "ge", kk: "kz", ne: "np",
	kl: "gl", km: "kh", ky: "kg", lb: "lu", lo: "la", mg: "mg", mk: "mk", mn: "mn", mt: "mt", ps: "af",
	rw: "rw", si: "lk", sm: "ws", so: "so", sq: "al", tg: "tj", tk: "tm", ur: "pk", uz: "uz", 
	hi: "in", ca: "catalonia", eo: "eo", sco: "scotland", tet: "tl"
};
var links = document.querySelectorAll(".interlanguage-link-target"), i;
for(i = 0; i < links.length; i++){
	var a = links[i].lang;
	links[i].innerHTML = "<img src='" + URL + flagLangCode[a] + ".png'> " + links[i].innerHTML;
}