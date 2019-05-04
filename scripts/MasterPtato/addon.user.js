// ==UserScript==
// @name         addon
// @namespace    MasterPtato
// @version      1.4
// @description  addonthingy
// @author       MasterPtato
// @match        https://www.google.com/_/chrome/newtab?espv=2&ie=UTF-8
// @match        https://www.google.com/_/chrome/newtab*
// @grant        none
// ==/UserScript==

var newDiv = document.createElement('div');
var newDiv2 = document.createElement('div');
var time;
var hours;
var mins;
var hr;
var secs;
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
newDiv.id = 'timerClock';
newDiv.style.width = '500px';
newDiv.style.height = '100px';
newDiv.style.marginLeft = '190px';
newDiv.style.marginTop = '-95px';
newDiv.style.position = 'relative';
newDiv.style.color = 'white';
newDiv.style.fontSize = '80px';
newDiv.style.textAlign = 'right';
newDiv.style.textShadow = '0 0 50px';

newDiv2.style.position = 'absolute';
newDiv.style.fontFamily = "'Product Sans', Arial, sans-serif";
newDiv2.style.width = '80px';
newDiv2.style.height = '63px';
newDiv2.style.backgroundColor = 'white';
newDiv2.style.top = 0;
newDiv2.style.left = 0;
newDiv2.innerHTML = '<p style=\'margin:0;margin-top:5px;\'>Color</p><form><input type="radio" name="color" value="black" onclick="document.getElementById(\'timerClock\').style.color = \'black\'"> Black<br><input type="radio" name="color" value="white" checked onclick="document.getElementById(\'timerClock\').style.color = \'white\'"> White</form>';
document.body.append(newDiv2);

var other = document.createElement('link');
other.rel = 'stylesheet';
other.href = 'https://fonts.googleapis.com/css?family=Product+Sans:400,400i,700,700i';
other.type = 'text/css';

setInterval(function(){
    hours = (new Date().getHours() <= 12) ? new Date().getHours() : new Date().getHours()-12;
    secs = (new Date().getSeconds() > 9) ? new Date().getSeconds() : "0" + new Date().getSeconds();
    mins = (new Date().getMinutes() > 9) ? new Date().getMinutes() : "0" + new Date().getMinutes();
    if(new Date().getHours() >= 12){
        hr = 'PM';
    }
    else{
        hr = 'AM';
    }
    time = hours + ":" + mins;
    newDiv.innerHTML = time + "<p style='font-size: 25px; display: inline-block;margin:0;'>"+ secs +"</p>" + " " + hr + "<br><p style='font-size: 20px;margin:0;margin-top: -15px'>"+ days[new Date().getDay()] + ", " + months[new Date().getMonth()] + " " + new Date().getDate() +"</p>";
    var logo = document.getElementById('hplogo');
    var getDiv = document.getElementById('lga');
    while(logo.style.marginLeft === ''){
        document.head.append(other);
        logo.style.position = 'relative';
        logo.style.marginLeft = '-400px';
        getDiv.append(newDiv);
    }
},1000);
console.log('test run');