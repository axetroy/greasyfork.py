// ==UserScript==
// @name        SGW Fixer - Users
// @namespace   https://greasyfork.org
// @include     https://sellers.shopgoodwill.com/*
// @include     http://localhost/sgw.html
// @version     2018.04.18.103339
// @description Contains user definitions for other scripts
// @grant       none
// ==/UserScript==

// NOTE: Old users should be left in!

console.log("grapefruit");

var posters = {
    "Alicia V" : {
        "name" : "Alicia",
        "username" : "AliciaV",
        "dept" : "jewelry",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "false",
    },
    "Angela N" : {
        "name" : "Angela",
        "username" : "AngelaN2",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "false",
    },
    "Caroline K" : {
        "name" : "Caroline",
        "username" : "CarolineK",
        "dept" : "all",
        "sup" : "true",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "false",
    },
    "Cynthia J" : {
        "name" : "Cindy",
        "username" : "CindyJ",
        "dept" : "jewelry",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "false",
    },
    "Eileen P" : {
        "name" : "Eileen",
        "username" : "EileenP",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "1",
        "CM" : "false",
        "disabled" : "false",
    },
    "Gregory N" : {
        "name" : "Gregory",
        "username" : "GregoryN",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "1",
        "CM" : "false",
        "disabled" : "false",
    },
    "Jackie C" : {
        "name" : "Jackie",
        "username" : "jackiec",
        "dept" : "jewelry",
        "sup" : "false",
        "delay" : "0",
        "CM" : "yes",
        "disabled" : "false",
    },
    "Jacob L" : {
        "name" : "Jacob",
        "username" : "Jacob",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "yes",
        "disabled" : "false",
    },
    "Janet L" : {
        "name" : "Janet",
        "username" : "JanetL2",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "false",
    },
    "Jeff H" : {
        "name" : "Jeff",
        "username" : "JeffH",
        "dept" : "collectibles",
        "sup" : "true",
        "delay" : "0",
        "CM" : "BIN",
        "disabled" : "false",
    },
    "Jeff (J) Holden" : {
        "name" : "Jeff (jewelry)",
        "username" : "jeffhjewelry",
        "dept" : "jewelry",
        "sup" : "true",
        "delay" : "0",
        "CM" : "BIN",
        "disabled" : "false",
    },
    "Jenny W" : {
        "name" : "Jenny W",
        "username" : "jennyw",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "1",
        "CM" : "false",
        "disabled" : "false",
    },
    "Joanne H" : {
        "name" : "Joanne",
        "username" : "JoanneH",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "false",
    },
    "Josh Agan" : {
        "name" : "Josh A",
        "username" : "JoshA",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "false",
    },
    "Liz A" : {
        "name" : "Liz A",
        "username" : "LizA",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "1",
        "CM" : "false",
        "disabled" : "false",
    },
    "Nepin V" : {
        "name" : "Nepin",
        "username" : "NepinV",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "1",
        "CM" : "false",
        "disabled" : "false",
    },
    "Nicole H" : {
        "name" : "Nicole",
        "username" : "nicoleh",
        "dept" : "all",
        "sup" : "true",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "false",
    },
    "Nikki K" : {
        "name" : "Nikki K",
        "username" : "NikkiK",
        "dept" : "jewelry",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "false",
    },
    "Peter N" : {
        "name" : "Peter",
        "username" : "petern",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "false",
    }, 
    "Zak N" : {
        "name" : "Zak N",
        "username" : "ZakN",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "1",
        "CM" : "false",
        "disabled" : "false",
    },
    "Ann S" : {
        "name" : "Ann",
        "username" : "AnnS",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "vue cheng" : {
        "name" : "Vue",
        "username" : "chengv",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Dallas D" : {
        "name" : "Dallas",
        "username" : "DallasD",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Dylan O" : {
        "name" : "Dylan",
        "username" : "DylanO",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "1",
        "CM" : "false",
        "disabled" : "true",
    },
    "George Wadsworth" : {
        "name" : "George",
        "username" : "GeorgeW2",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Grace C" : {
        "name" : "Grace",
        "username" : "GraceC",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Hetal S" : {
        "name" : "Hetal",
        "username" : "HetalS",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Jeremy J" : {
        "name" : "Jeremy",
        "username" : "JeremyJ",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "yes",
        "disabled" : "true",
    },
    "Jessica G" : {
        "name" : "Jessica",
        "username" : "JessicaG",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Kathy O" : {
        "name" : "Kathy",
        "username" : "KathyO",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Leah D" : {
        "name" : "Leah D",
        "username" : "LeahD",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "1",
        "CM" : "false",
        "disabled" : "true",
    },
    "Leemu G" : {
        "name" : "Leemu",
        "username" : "LeemuG",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Marilyn P" : {
        "name" : "Marilyn",
        "username" : "marilynp",
        "dept" : "collectibles",
        "sup" : "true",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Mark I" : {
        "name" : "Mark",
        "username" : "MarkI",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Mark T" : {
        "name" : "Mark",
        "username" : "MarkT",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Mike F" : {
        "name" : "Mike",
        "username" : "MikeF2",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Nick Q" : {
        "name" : "Nick",
        "username" : "NickQ",
        "dept" : "collectibles",
        "sup" : "true",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Pahoua V" : {
        "name" : "Pahoua",
        "username" : "pahouav",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Phalada X" : {
        "name" : "Phalada",
        "username" : "PhaladaX",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "yes",
        "disabled" : "true",
    },
    "Phalada (J) X" : {
        "name" : "Phalada (Jewelry)",
        "username" : "phaladajewelry",
        "dept" : "jewelry",
        "sup" : "false",
        "delay" : "0",
        "CM" : "yes",
        "disabled" : "true",
    },
    "Phillip S" : {
        "name" : "Phillip",
        "username" : "PhillipS",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Poppy P" : {
        "name" : "Poppy",
        "username" : "poppyp",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Poppy (J) P" : {
        "name" : "Poppy (Jewelry)",
        "username" : "poppyjewelry",
        "dept" : "jewelry",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Shylia H" : {
        "name" : "Shylia",
        "username" : "ShyliaH",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "1",
        "CM" : "false",
        "disabled" : "true",
    },
    "Tanya K" : {
        "name" : "Tanya",
        "username" : "TanyaK",
        "dept" : "jewelry",
        "sup" : "true",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Thomas L Butler" : {
        "name" : "Tom",
        "username" : "TomB",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Tyler M" : {
        "name" : "Tyler",
        "username" : "TylerM",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Valerie W" : {
        "name" : "Valerie",
        "username" : "ValerieW",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "yes",
        "disabled" : "true",
    },
    "Zainab M" : {
        "name" : "Zainab",
        "username" : "ZainabM",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "0",
        "CM" : "false",
        "disabled" : "true",
    },
    "Suzanne R" : {
        "name" : "Suzanne",
        "username" : "suzanner",
        "dept" : "jewelry",
        "sup" : "true",
        "delay" : "0",
        "CM" : "true",
        "disabled" : "false",
    }, 
    "Sara V" : {
	"name" : "Sara V",
	"username" : "sarav",
	"dept" : "collectibles",
	"sup" : "false",
	"delay" : "1",
	"CM" : "false",
	"disabled" : "false",
    },
    "Connor D" : {
	"name" : "Connor D", 
	"username" : "ConnorD", 
	"dept" : "collectibles", 
	"sup" : "false", 
	"delay" : "1", 
	"CM" : "false", 
	"disabled" : "false",
    },
    "Vicki H" : {
	"name" : "Vicki H",
	"username" : "vickih", 
	"dept" : "collectibles", 
	"sup" : "false", 
	"delay" : "1", 
	"CM" : "false", 
	"disabled" : "false", 
    },
    "Delta H" : {
        "name" : "Delta H",
        "username" : "DeltaHi",
        "dept" : "collectibles",
        "sup" : "false",
        "delay" : "1",
        "CM" : "false",
        "disabled" : "false",
    },

};