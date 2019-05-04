// ==UserScript==
// @name        MH - Raistlin - Présélection Télék
// @namespace   MH
// @description Sélection automatique de la bonne direction lors d'une télékinésie
// @include     */MH_Play/Actions/Sorts/Play_a_Sort24.php*
// @icon        https://xballiet.github.io/ImagesMH/MZ.png
// @version     1.2
// @grant       none
// @require     https://greasyfork.org/scripts/24178-mh-h2p-code-mutualis%C3%A9/code/MH%20-%20H2P%20-%20Code%20Mutualis%C3%A9.user.js?version=153518&d=.user.js
// ==/UserScript==

// Script MZ pour la sélection automatique de la bonne direction lors d'une télékinésie

// Récuperation de position de l'item ciblé (juste X/Y)
function getItemPosition() {
	var upperLeftCorner = document.getElementsByName('as_NewPos');
	var coordonnees = upperLeftCorner[0].value.split('#');
	return {x : parseInt(coordonnees[0]) + 1, y : parseInt(coordonnees[1]) - 1};
}

// Récupération de la position du trõll depuis les options MZ (juste X/Y)
function getTrollPosition() {
	var numTroll = MY_getValue("NUM_TROLL");
	return {x : MY_getValue(numTroll + ".position.X"), y : MY_getValue(numTroll + ".position.Y")};
}

// Vérification qu'on n'est pas dans le cas où on peut ramasser l'item
function isItemRamassable(itemPosition, trollPosition) {
	return (Math.abs(itemPosition.x - trollPosition.x) <= 1 && Math.abs(itemPosition.y - trollPosition.y) <= 1);
}

// Calcul de la case à cocher
function getCaseCible(itemPosition, trollPosition) {
	return {x : itemPosition.x + Math.sign(trollPosition.x - itemPosition.x), y : itemPosition.y + Math.sign(trollPosition.y - itemPosition.y)};
}

// Marquage de la case à cocher
// On parcourt toutes les cases et on coche celle qui a la bonne valeur
function setCaseCible(caseCible) {
	var caseCibleId = caseCible.x + '#' + caseCible.y;
	NodeList.prototype.find = Array.prototype.find;
	document.getElementsByName('as_NewPos').find(function(el) {
		return el.value === caseCibleId;
	}).checked = true;
}

// On vérifie si on est sur la première ou la deuxième itération de la page (donc sur la sélection de la cible ou sur la direction)
// La SelectboxV2 n'existe que sur la première des deux pages de Télék
if (document.getElementsByClassName('SelectboxV2').length === 0) {
	var itemPosition = getItemPosition();
	var trollPosition = getTrollPosition();
	if (!isItemRamassable(itemPosition, trollPosition)) {
		setCaseCible(getCaseCible(itemPosition, trollPosition));
	}
}