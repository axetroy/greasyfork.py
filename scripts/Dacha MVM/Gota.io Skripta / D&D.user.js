// ==UserScript== 
// @name         Gota.io Skripta // D&D
// @namespace    D&D
// @description  Skripta napravljena od D&D! >> GP klan je kul :D
// @version      0.1
// @author       D&D
// @match        http://gota.io/web/*
// @grant        GM_addStyle
// ==/UserScript==

// Uzivajte
function addStyleSheet(style){
	var getHead = document.getElementsByTagName("HEAD")[0];
	var cssNode = window.document.createElement( 'style' );
	var elementStyle= getHead.appendChild(cssNode);
	elementStyle.innerHTML = style;
	return elementStyle;
}


//Vlastiti Font, Logo i Minimapa
addStyleSheet('@import url(https://fonts.googleapis.com/css?family=Ubuntu);'); // Link za font
GM_addStyle('* #logo {background-image: url("http://imgur.com/Q5fpiY7.png");}'); // Logo od panela (Onaj dio D&D gore lijevo)
GM_addStyle('* #minimap-canvas {background-image: url("http://i.imgur.com/QMBgZaC.png");}'); // Background od minimape
GM_addStyle('*{font-family: Oswald;}'); // Font
GM_addStyle('* .coordinates {font-family: Oswald;}'); // Font za kordinate
GM_addStyle('* #leaderboard-panel {font-size: 24px;}'); // Velicina leaderborda panela

var fillTextz = CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText = function(){
	var argumentz = arguments;
	if(this.canvas.id == 'leaderboard-canvas'){
		this.font = 'bold 15px Oswald';
	}
	if(this.canvas.id == 'minimap-canvas'){
		this.font = 'bold 15px Oswald';
	}
	if(this.canvas.id == 'party-canvas'){
		this.font = 'bold 15px Oswald';
	}
	fillTextz.apply(this, arguments);
};

//Makivanje rubova/bordera
document.getElementById("leaderboard-panel").style.borderRadius = "0";
document.getElementById("leaderboard-panel").style.borderWidth = "0px";
document.getElementById("leaderboard-panel").style.boxShadow = "0px 0px 0px black";
document.getElementById("score-panel").style.borderRadius = "0";
document.getElementById("score-panel").style.borderWidth = "0px";
document.getElementById("score-panel").style.boxShadow = "0px 0px 0px black";
document.getElementById("minimap-panel").style.borderRadius = "0";
document.getElementById("minimap-panel").style.borderWidth = "0px";
document.getElementById("minimap-panel").style.boxShadow = "0px 0px 0px black";
document.getElementById("minimap-panel").style.marginBottom = "3px";
document.getElementById("party-panel").style.borderRadius = "0";
document.getElementById("party-panel").style.borderWidth = "0px";
document.getElementById("party-panel").style.boxShadow = "0px 0px 0px black";

//Borderi panela
GM_addStyle('* .main-panel {border: solid 3px rgba(99, 97, 95, 0.5)}'); 
GM_addStyle('* .main-panel {border-radius: 0px}');
GM_addStyle('* .main-panel {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.52)}');
GM_addStyle('* .gota-btn {border-radius: 15px}');
GM_addStyle('* .main-bottom-stats {border-radius: 5px}');
GM_addStyle('* #popup-party {border-radius: 0px}');
GM_addStyle('* #popup-party {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.25)}');
GM_addStyle('* #popup-login {border-radius: 0px}');
GM_addStyle('* #popup-login {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.25)}');
GM_addStyle('* .login-input {border-radius: 0px}');
GM_addStyle('* #chat-input {border-radius: 0 0 0px 0px}');
GM_addStyle('* .ui-pane {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.52)}');
GM_addStyle('* #main-cover {display: none}');

//Veličina chata
GM_addStyle('* #chat-panel {width: 300px}'); //Debljina chata
GM_addStyle('* #chat-panel {height: 195px}'); //Visina chata

//Makivanje gumbova od social medie (facebook od gota.io, instagram i slično)
$(".main-bottom-links").replaceWith("");

//Instrukcije
var maincontent = document.getElementById("main-content");
var version = document.createElement("div");
version.innerHTML = 'Q - Doublesplit | T - Max split (16) '; // Ono što piše kod instrukcija na panelu skroz dole na sredini, ako zelis promjeniti eto primjer: 'Car sam' - (Ovo crveno zamjenis samo)
version.id = 'instructions';
maincontent.appendChild(version);
document.getElementById("instructions").style.textAlign = "center"; //Mjesto teksta za instrukcije
document.getElementById("instructions").style.fontSize = "12px"; //Velicina teksta za instrukcije
document.getElementById("instructions").style.color = "white"; //Boja teksta za instrukcije


//Makivanje adova
$("#main-rb").replaceWith("");
GM_addStyle ('* #main {left: 350px;}');

function split() { // Funkcija za split, nista posebno :D
	window.onkeydown({keyCode: 32});
	window.onkeyup({keyCode: 32});
}

window.addEventListener('keydown', keydown);
//window.addEventListener('keyup', keyup); //Ne koristi se funkcija
var timeBetweenSplits = 10; //Broj u necemu manjem od sekunda između splitova

function keydown(event) {
	if (event.keyCode == 81) { //tipka Q //ako zelite promjeniti tipku za neki split idite na: http://keycode.info/ > kliknete tipku koju zelite imati za double split ili 16 split na primjer: kliknes R i dobijes keycode... zamjeni taj key code sa ovim kojim zelis (event.keyCode == 81 > ovaj 81 promjeni u keycode koji dobijes) i onda save
		split();                  //Double Split
		setTimeout(split, timeBetweenSplits*1);
	} else if (event.keyCode === 84) { //tipka T
		split();                  //16 Split 
		setTimeout(split, timeBetweenSplits*1);
		setTimeout(split, timeBetweenSplits*2);
		setTimeout(split, timeBetweenSplits*3);
    }
}

//Title
var newTitle = "Gota.io - D&D";

document.title = newTitle;  
document.querySelector("div.boardTitle").textContent = newTitle;  

// AKO NEBI RADILO NA FIREFOX ILI NEGDJE DRUGDJE JAVITE NA FB: Dorian Peras ILI SKYPE: agarnt5 > Kako bi dodao agente za druge browsere , hvala!

//Zelite li nesto dodati a ne znate kako? Kontaktirajte DoDu na fb: Dorian Peras // na skype: agarnt5 > Stvari koje mozete na primjer dodati: custom cursor,drugu sliku kraj url, neke druge funkcije poput triplesplit i tako....
//Extension je djelom kopiran.... Nije sve skopirano ali nesto jest, vecina je custom!
//Ako zelis mozes maknuti neke stvari ako ti se ne sviđaju!