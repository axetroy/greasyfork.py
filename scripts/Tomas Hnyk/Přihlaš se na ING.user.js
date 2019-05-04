// ==UserScript==
// @name          Přihlaš se na ING
// @namespace     ING-TH			
// @author     	  Tomáš Hnyk mailto:tomashnyk@gmail.com
// @description   Vyplní přihlašovací údaje na stránce internetového bankovnictví ING
// @include       https://ib.ing.cz/*
// @license	      GPL 3
// @version       1.1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require https://greasyfork.org/scripts/6250-waitforkeyelements/code/waitForKeyElements.js?version=23756
// @run-at        document-idle
// @grant         GM_addStyle
// ==/UserScript==

// Napište své heslo do následujícího řádku mezi uvozovky
// Pozor, kdokoliv s přístupem k vašemu počítači pak může jednoduše heslo zjistit
// To ale moc nevadí, pokud zároveň nemá váš telefon, aby vám mohl ukrást peníze

var cIdInpt = document.querySelector('input[name=customer-id]');

waitForKeyElements (
        "div.basic-form-control-wrap"
  					, fill_ing_id
        );

function fill_ing_id() {var cIdInpt = document.querySelector('input[name=customer-id]');
                            var keyupEvnt   = new Event ('keyup', {bubbles: true} );  //  no key code needed in this case.
                            cIdInpt.value   = "1234567890";
                            cIdInpt.dispatchEvent (keyupEvnt);
                            setTimeout(function(){ingbutton_.click();},300);
                            
};


waitForKeyElements (
        "button:not(.disabled)"
  					, click_ing_button
        );

function click_ing_button() {var ingbutton_ = document.querySelector('button[data-selector=validate-button]');
                             ingbutton_.click()};