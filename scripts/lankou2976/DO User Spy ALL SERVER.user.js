// ==UserScript==
// @name            DO User Spy ALL SERVER
// @namespace       http://desert-operation.kazeo.com/accueil-c27905706
// @include         http*://*.gamigo.*/world*/userDetails.php?user=*
// @author          Lankou2976
// @name:fr         Do Espionne la connection du Membre
// @name:en         DO User Spy ALL SERVER
// @description:fr  Espionne la connection du Membre meme si point vert online si connexion vide jouer hors ligne si affiché date heure en ligne
// @description:en  Spy the connection of the same Member if green dot online if connection empty play offline if posted date time online
// @version        2.3
// @description Espionne la connection du Membre meme si point vert online si connexion vide jouer hors ligne si affiché date heure en ligne
// ==/UserScript==
function randomInt(mini, maxi) {
	var nb = mini + (maxi+1-mini)*Math.random();
	return Math.floor(nb);
}
    var userDetails = document.location.href.match(/user=([""-""]+)/)
	var ConvertDay = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
	var ConvertMonth = new Array('Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre');
	function setcookies(sName, sValue) {
		var today = new Date(), expires = new Date();
		expires.setTime(today.getTime() + (24*60*60*1000));
		document.cookies = sName + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString();
	} function getcookies(sName) {
		var oRegex = new RegExp("(?:; )?" + sName + "=([^;]*);?");
		if (oRegex.test(document.cookies)) {
			return decodeURIComponent(RegExp["1"]);
		} else {
			return null;
		}
	} function ConvertDate(Time) {
		var End = new Date(Time);
		var message = ConvertDay[End.getDay()] + ' ' + End.getDate() + ' ' + ConvertMonth[End.getMonth()] + ' | ';
		var minutes = End.getMinutes();
		if(minutes < 10) minutes = "0" + minutes;
		message += End.getHours() + 'H' + minutes;
		return message;
	} var cookies = getcookies(userDetails);
	if (document.body.innerHTML.match(/images\/classic\/icons\/bullet_green.png/g)) {
		if (cookies == null) {
			cookies = new Date();
			Table = new Array(cookies);
		} else {
			cookies += ';' + new Date();
			var Table = cookies.split(';');
		}
		setcookies(userDetails, cookies);
	} else {
		if (cookies == null) {
			Table = new Array();
		} else {
			var table = cookies.split(';');
		}
	} var Add = "http://desert-operation.kazeo.com"
         + '<Table width="16%"  border="25" cellpadding="-800" cellspacing="3"><tr bgcolor="#1ED91E">'
		 + '<td style="";><strong> - Connexion - </strong></td></tr>';
	for (var i = 0, c = Table.length; i < c; i++) {
		if (ConvertDate(Table[i]) != ConvertDate(Table[(i-1)])) {
			Add += '<tr bgcolor="#D91E4A"><td>' + ConvertDate(Table[i]) + '</td></tr>';
		}
	} document.body.innerHTML += Add + '</table>';

setTimeout('window.location.reload(true);', randomInt(300000,600000));