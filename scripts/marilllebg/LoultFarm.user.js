// ==UserScript==
// @name         LoultFarm
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://loult.family/*
// @grant        none
// ==/UserScript==
 
 
var tour1 = localStorage.getItem('tour') ; // recup tour
tour1 ++ ;  //ajouter au tour
localStorage.setItem('tour',tour1) ; // stocker tour +1
 
 
 
 
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
 
 
 
var CheminComplet = document.location.href;
var NomDuFichier     = CheminComplet.substring(CheminComplet.lastIndexOf( "/" )+1 );
var FirstMessage = true ;
 
 socket = new WebSocket('wss://loult.family/socket/'+NomDuFichier);
 
 
 
 
 socket.onmessage = function(e){
   var server_message = e.data;
 
if (typeof event.data === "string") {
var jsonObject = JSON.parse(e.data) ;
 
 
if(FirstMessage){      // si premier message du socket
 
var length = jsonObject.users.length ;      // taille du tableau des utilisateurs  et nombre pokemon connecté
for (var i = 0 ; i<length; i++) {
 
if( jsonObject.users[i].params.you === true) {
 
 
    console.log( "nom :" +  jsonObject.users[i].params.name  +" "+  jsonObject.users[i].params.adjective  );
 
    if (jsonObject.users[i].params.name=="Dardargnan" ) { console.log("dre dre") ; }
 
   // else if (jsonObject.users[i].params.adjective=="imité" ) { console.log("défoncé") ; }
    else {location.reload(); }
    console.log( "cookie :" + getCookie("id") );
    var a = getCookie("id") ;
    localStorage.setItem("cookie", a );
 
 
    document.cookie = "id"+ '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
 
}
 
 
FirstMessage=false ;  // sortir du if
}
 
 
 }
 
 
 
 
}
 
 };