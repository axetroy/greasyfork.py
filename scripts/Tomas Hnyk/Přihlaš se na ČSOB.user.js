// ==UserScript==
// @name          Přihlaš se na ČSOB
// @namespace     CSOB-TH			
// @author     	  Tomáš Hnyk mailto:tomashnyk@gmail.com
// @description   Vyplní přihlašovací údaje na stránce internetového bankovnictví ČSOB
// @include       https://ib.csob.cz/*
// @license	      GPL 3
// @version       1.1
// @run-at   document-idle
// ==/UserScript==
// Napište své přihlašovací číslo a PIN od následujících dvou řádků vždy mezi uvozovky
// Pozore, kdokoliv s přístupem k vašemu počítači pak může tyto údaje jednoduše zjistit
// To ale moc nevadí, pokud zároveň nezíská váš telefon 
var csob_username = "20381840";
var csob_password = "38760";

document.getElementById("username-view").value = csob_username;
document.getElementById("password-view").value = csob_password;

var csob_button = document.querySelector('button[id=submit-login-form]');
csob_button.click();