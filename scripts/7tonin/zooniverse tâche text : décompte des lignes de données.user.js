// ==UserScript==
// @name        zooniverse tâche text : décompte des lignes de données
// @name:en     zooniverse task text : lines count from new lines count
// @namespace   7tonin
// @description Affiche le nombre de lignes de données dans le champs de saisie
// @description:en Display the number of data lines in the text field
// @include     https://www.zooniverse.org/projects/edh/weather-rescue/classify
// @version     0.0.2
// @grant       none
// ==/UserScript==

var mySI = setInterval(myCatch, 1000);

function myCatch() {
	//Recup zone de saisie
	var allElts = document.getElementsByClassName('standard-input full');
	if(0<allElts.length) {
		textareaField=allElts[0];

// 		debug 
// 		document.getElementsByClassName('continue major-button')[0].style.background='#8092ec';
		
		//Event handler sur la zone de saisie
		textareaField.onblur=function() {
			this.parentNode.append(((this.value.trim().match(/\n/g)||[]).length+1)+' values ; ');
		}
	}
	else
	{
// 		debug 
// 		document.getElementsByClassName('continue major-button')[0].style.background='#890e2c'; 
	}
}
