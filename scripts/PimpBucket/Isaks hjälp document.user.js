// ==UserScript==
// @name        Isaks hjälp document
// @namespace    -
// @version     20.12
// @description  Subscriba på PimpBucket på youtube för fan.
// @author       PimpBucket
// @match        *://moomoo.io/*
// @match        http://dev.moomoo.io/*
// @match        *sandbox.moomoo.io/*
// @grant        none
// @require https://greasyfork.org/scripts/368273-msgpack/code/msgpack.js?version=598723
// @require http://code.jquery.com/jquery-3.3.1.min.js
// @require https://code.jquery.com/ui/1.12.0/jquery-ui.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js

// ==/UserScript==

// Ps4 = JacoBoss776, Geometry Dash = BombMannen42

$('#loadingText').css({'color': 'blue',
                       'background-color': 'rgba(0, 0, 0, 0.74)',
                       'padding': '8px',
                       'right': '150%',
                       'left': '150%',
                       'margin-top': '40px'});

$("#leaderboard").css("background", "url('https://img.freepik.com/free-vector/watercolor-background-with-stars_23-2147659850.jpg?size=338&ext=jpg')");
document.getElementById("leaderboard").append('PimpBucket');
document.getElementById("leaderboard").style.color = "lightblue";

document.getElementById("allianceButton").style.color = "black";
    document.getElementById("chatButton").style.color = "black";
    document.getElementById("storeButton").style.color = "black";

$("#allianceButton").css({background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyy2Wgum6uWma6Nsfi9LTfdJrTdHxKii4acnH_MjYw0kbn9T8hw')`});
$("#chatButton").css({background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyy2Wgum6uWma6Nsfi9LTfdJrTdHxKii4acnH_MjYw0kbn9T8hw')`});
$("#storeButton").css({background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyy2Wgum6uWma6Nsfi9LTfdJrTdHxKii4acnH_MjYw0kbn9T8hw')`});

$("#foodDisplay").css({background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyy2Wgum6uWma6Nsfi9LTfdJrTdHxKii4acnH_MjYw0kbn9T8hw')`});
$("#woodDisplay").css({background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyy2Wgum6uWma6Nsfi9LTfdJrTdHxKii4acnH_MjYw0kbn9T8hw')`});
$("#stoneDisplay").css({background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyy2Wgum6uWma6Nsfi9LTfdJrTdHxKii4acnH_MjYw0kbn9T8hw')`});
$("#scoreDisplay").css({background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyy2Wgum6uWma6Nsfi9LTfdJrTdHxKii4acnH_MjYw0kbn9T8hw')`});
$("#killCounter").css({background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyy2Wgum6uWma6Nsfi9LTfdJrTdHxKii4acnH_MjYw0kbn9T8hw')`});

$('#loadingText').css({'color': 'blue',
                       'background-color': 'rgba(0, 0, 0, 0.74)',
                       'padding': '8px',
                       'right': '150%',
                       'left': '150%',
                       'margin-top': '40px'});

document.getElementById("diedText").style.color= "blue";
document.getElementById("loadingText").style.color= "blue";

document.getElementById('gameName').innerHTML = '👺Olle Liljenberg👺';
document.getElementById('diedText').innerHTML = '☠Du dog din fucking idiot☠';


var myElement = document.querySelector('#nameInput');
myElement.style.backgroundColor = "darkblue";
myElement.style.color = "blue";
document.getElementById("setupCard").style.color = "blue";

document.getElementById("desktopInstructions").innerHTML = "<br/> how to use mod </a> <br> Shift=Booster Hat,Ctrl=Flipper Hat,</a> <br> Tab=Emp Helmet,Alt=Tank Gear,</a> <br>I=Winter Cap,Y=Soldier Helmet,</a> <br> Z=Turret Gear,U=Bull Helmet,</a> <br> K=Samurai Armor,perid=bush</a> <br>H=Marksman Cap,J=Musketeer</a> <br> Comma=Bull/Samurai ,</a> <br>Semicolon= Soldier/Bull"
document.getElementById("desktopInstructions").style.color = "blue";
document.getElementById("ageText").style.color = "blue";

document.getElementById('chatBox').placeholder = "✔Skriv här tjockis✔";
document.getElementById('loadingText').innerHTML = '✯Fittor✯';
document.getElementById('nameInput').placeholder = "💎Skriv ditt namn💎";
document.getElementById('enterGame').innerHTML = '⚔Kör för fan⚔';

document.getElementById("followText").style.color = "blue";

document.getElementById("linksContainer2").innerHTML = "röv";
    document.getElementById("linksContainer2").style.color = "blue";
document.querySelector(".settingRadio").style.color = "blue";

document.getElementById("scoreDisplay").style.color = "black";
document.getElementById("woodDisplay").style.color = "black";
document.getElementById("stoneDisplay").style.color = "black";
document.getElementById("killCounter").style.color = "black";
document.getElementById("foodDisplay").style.color = "black";

$('.menuHeader').css({'color': 'blue'});


$("#chatBox").css({background: `url('https://motionarray.imgix.net/preview-581063jsUiUheHM-low_0006.jpg?w=660&q=60&fit=max&auto=format')`});

$('#settingsTitle').css({'color':'blue'});

$('.menuPrompt').css({'color':'#ff0000'});
$("#gameCanvas").css('cursor', 'url(http://cur.cursors-4u.net/user/use-1/use153.cur), default');

$("#ageBar").css({
  'border-radius':'50px',
  'border':'3px solid #7100cf'
});

$('#ageBar').css({'color': 'blue'});

$("#upgradeCounter").css({ 'color':'blue'});
$('#ageBarBody').css({
  'background-color': '#0000FF'
});

$('.menuButton').css({'border-radius': '0px', 'color':'lightgreen',
                      '-moz-border-radius': '0px',
                      '-webkit-border-radius': '0px'});


$("#nameInput").css({background: `url('data:image/jpeg;base64,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')`});
$("#enterGame").css({background: `url('https://motionarray.imgix.net/preview-581063jsUiUheHM-low_0006.jpg?w=660&q=60&fit=max&auto=format')`});


$("#diedText").css({background: `url('https://motionarray.imgix.net/preview-581063jsUiUheHM-low_0006.jpg?w=660&q=60&fit=max&auto=format')`});
$("#loadingText").css({background: `url('https://motionarray.imgix.net/preview-581063jsUiUheHM-low_0006.jpg?w=660&q=60&fit=max&auto=format')`});

//document functions
document.querySelector("head").innerHTML = document.querySelector("head").innerHTML + '<link rel="stylesheet" href="http://wormax.org/chrome3kafa/moomods.css" type="text/css" media="screen, projection" /><link rel="stylesheet" href="https://iogameslist.org/wp-content/uploads/modal.css" type="text/css">';
$("#adCard").html('<div align="left"><div class="menuHeader">How To Use Mod?</div><div id="desktopInstructions" class="menuText"><a class="menuText" title="When you press *P* Key it will change police hats automatically. Please be sure that you have enough gold for Bummble Hat and Winter Cap, else it wont work.(not Caps)">Police Mod <font style="font-size: 18px;" color="red">(?)</font>:</a><a" target="_blank" style="font-size:18px;padding-left:46px;">P key</a><br><a title="When you press *Shift + P* it will Auto Kill. (Caps)" class="menuText">Auto Kill <font style="font-size: 18px;" color="red">(?)</font>:</a><a" target="_blank" style="font-size:18px;padding-left:42px;">Shift + P key</a><br><a title="When you press *N* it will change free animal hats automatically.(not Caps)" class="menuText">Animals Mod <font style="font-size: 18px;" color="red">(?)</font>:</a><a" target="_blank" style="font-size:18px;padding-left:28px;">N key</a><br><a title="When you press *B* it will change all free hats automatically. (not Caps)" class="menuText">Free Hats Mod <font style="font-size: 18px;" color="red">(?)</font>:</a><a" target="_blank" style="font-size:18px;padding-left:13px;">B key</a><br><a title="When you press *M* key it will change animal caps automatically.(not Caps)" class="menuText">Animal Caps <font style="font-size: 18px;" color="red">(?)</font>:</a><a" target="_blank" style="font-size:18px;padding-left:34px;">M key</a></br><a title="When you press *F* key it will put trap and no one will see that you put it there.(not Caps)" class="menuText">Booby Trap <font style="font-size: 18px;" color="red">(?)</font>:</a><a" target="_blank" style="font-size:18px;padding-left:42px;">F key</a><br><a title="When you press *O* it will Put a Circle Trap automatically. (not Caps)" class="menuText">Circle Trap <font style="font-size: 18px;" color="red">(?)</font>:</a><a" target="_blank" style="font-size:18px;padding-left:42px;">O key</a><br><a title="When you press *V* it will Put a Spike Trap automatically. (not Caps)" class="menuText">Spike Trap <font style="font-size: 18px;" color="red">(?)</font>:</a><a" target="_blank" style="font-size:18px;padding-left:42px;">V key<br><a title="When you press *L* it will Put a Circle Spike Trap automatically. (not Caps)" class="menuText">Circle Spike Trap <font style="font-size: 18px;" color="red">(?)</font>:</a><a" target="_blank" style="font-size:18px;padding-left:32px;">L key</a><br><a title="Hotkey for Tank Gear when press Z.(not Caps)" class="menuText">Tank Gear <font style="font-size: 18px;" color="red">(?)</font>:</a><a" target="_blank" style="font-size:18px;padding-left:34px;">Z key</a></br><a title="Hotkey for Soilder Hat when press C.(not Caps)" class="menuText">SoliderHat <font style="font-size: 18px;" color="red">(?)</font>:</a><a" target="_blank" style="font-size:18px;padding-left:34px;">C key</a></br><a title="Hotkey for Turrent Gear when press Spacebar.(not Caps)" class="menuText">TurrentGear <font style="font-size: 18px;" color="red">(?)</font>:</a><a" target="_blank" style="font-size:18px;padding-left:34px;">Spacebar key</a></br><a title="When you press *G* it will Auto Chat. (No Caps)" class="menuText">Auto Chat <font style="font-size: 18px;" color="red">(?)</font>:</a><a" target="_blank" style="font-size:18px;padding-left:42px;">G key</a></br><br>Auto Heal: Collect Food<br>Bull Helmet: <a title="If you buy the bull helmet, any time you swing this mod will put the bull helmet on and take it off automatically. If you put on another hat, the mod will automatically remember that hat and put it on after its done with the bull helmet. The mod will also take of the monkey tail (if its on) when you swing. ---> Imagine the combinations! Soldier +bull and plague +bull are good combos to get started with" style="font-size: 18px;color:dodgerblue;">Read Me (?)</a><br></div><hr><button class="trigger">Modify Interval Speed</button><div class="modal"><div class="modal-content"><span class="close-button">&times;</span><div align="left"><a title="Its the speed of animals mod, default is 200">Animals Mod Speed (?): </a><input onchange="anspeedupdate();" id="aspeed" type="number" value="200" style="width:60px;"></br><a title="Its the speed of free hats mod, default is 200">Free Hats Mod Speed (?): </a><input onchange="plspeedupdate();" id="pspeed" type="number" value="200" style="width:60px;"></br><a title="Its the speed of animal caps mod, default is 200">Animal Caps Mod Speed (?): </a><input onchange="clspeedupdate();" id="caspeed" type="number" value="200" style="width:60px;"></br><a title="Its the speed of police mod, default is 250">Police Mod Speed (?): </a><input onchange="frspeedupdate();" id="fspeed" type="number" value="250" style="width:60px;"></div></div></div> - <button class="trigger2">Extra Feature Keys</button><div class="modal2"><div class="modal-content"><span class="close-button2">&times;</span>Numpad0 = <input onchange="nm0(this.value)" type="number" value="0" id="nm00" style="width:60px;"></br>Numpad1 = <input onchange="nm1(this.value)" type="number" value="7" id="nm11" style="width:60px;"></br>Numpad2 = <input onchange="nm2(this.value)" type="number" value="6" id="nm22" style="width:60px;"></br>Numpad3 = <input onchange="nm3(this.value)" type="number" value="20" id="nm33" style="width:60px;"></br>Numpad4 = <input onchange="nm4(this.value)" id="nm44" type="number" value="31" style="width:60px;"></br>Numpad5 = <input onchange="nm5(this.value)" id="nm55" type="number" value="10" style="width:60px;"></br>Numpad6 = <input onchange="nm6(this.value)" id="nm66" type="number" value="11" style="width:60px;"></br>Numpad7 = <input onchange="nm7(this.value)" type="number" id="nm77" value="22" style="width:60px;"></br>Numpad8 = <input onchange="nm8(this.value)" id="nm88" type="number" value="12" style="width:60px;"></br>Numpad9 = <input onchange="nm9(this.value)" type="number" id="nm99" value="9" style="width:60px;"></br><div id="storeHolder" style="width:270px;" >     <div style="font-size:20px;" class="storeItem" id="storeDisplay0"> <img class="hatPreview" src="https://i.hizliresim.com/5y9PBD.png"><span>Default : 0</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay1"> <img class="hatPreview" src="../img/hats/hat_51.png"><span>Moo Cap : 51</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay2"> <img class="hatPreview" src="../img/hats/hat_50.png"><span>Apple Cap : 50</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay3"> <img class="hatPreview" src="../img/hats/hat_28.png"><span>Moo Head : 28</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay4"> <img class="hatPreview" src="../img/hats/hat_29.png"><span>Pig Head : 29</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay5"> <img class="hatPreview" src="../img/hats/hat_30.png"><span>Fluff Head : 30</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay6"> <img class="hatPreview" src="../img/hats/hat_36.png"><span>Pandou Head : 36</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay7"> <img class="hatPreview" src="../img/hats/hat_37.png"><span>Bear Head : 37</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay8"> <img class="hatPreview" src="../img/hats/hat_38.png"><span>Monkey Head : 38</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay9"> <img class="hatPreview" src="../img/hats/hat_44.png"><span>Polar Head : 44</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay10"> <img class="hatPreview" src="../img/hats/hat_35.png"><span>Fez Hat : 35</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay11"> <img class="hatPreview" src="../img/hats/hat_42.png"><span>Enigma Hat : 42</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay12"> <img class="hatPreview" src="../img/hats/hat_43.png"><span>Blitz Hat : 43</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay13"> <img class="hatPreview" src="../img/hats/hat_49.png"><span>Bob XIII Hat : 49</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay14"> <img class="hatPreview" src="../img/hats/hat_8.png"><span>Bummle Hat : 8</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay15"> <img class="hatPreview" src="../img/hats/hat_2.png"><span>Straw Hat : 2</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay16"> <img class="hatPreview" src="../img/hats/hat_15.png"><span>Winter Cap : 15</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay17"> <img class="hatPreview" src="../img/hats/hat_5.png"><span>Cowboy Hat : 5</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay18"> <img class="hatPreview" src="../img/hats/hat_4.png"><span>Ranger Hat : 4</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay19"> <img class="hatPreview" src="../img/hats/hat_18.png"><span>Explorer Hat : 18</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay20"> <img class="hatPreview" src="../img/hats/hat_31.png"><span>Flipper Hat : 31</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay21"> <img class="hatPreview" src="../img/hats/hat_1.png"><span>Marksman Cap : 1</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay22"> <img class="hatPreview" src="../img/hats/hat_10.png"><span>Bush Gear : 10</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay23"> <img class="hatPreview" src="../img/hats/hat_48.png"><span>Halo : 48</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay24"> <img class="hatPreview" src="../img/hats/hat_6.png"><span>Soldier Helmet : 6</span> </div><div style="font-size:18px;" class="storeItem" id="storeDisplay25"> <img class="hatPreview" src="../img/hats/hat_23.png"><span>Anti Venom Gear : 23</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay26"> <img class="hatPreview" src="../img/hats/hat_13.png"><span>Medic Gear : 13</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay27"> <img class="hatPreview" src="../img/hats/hat_9.png"><span>Miners Helmet : 9</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay28"> <img class="hatPreview" src="../img/hats/hat_32.png"><span>Musketeer Hat : 32</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay29"> <img class="hatPreview" src="../img/hats/hat_7.png"><span>Bull Helmet : 7</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay30"> <img class="hatPreview" src="../img/hats/hat_22.png"><span>Emp Helmet : 22</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay31"> <img class="hatPreview" src="../img/hats/hat_12.png"><span>Booster Hat : 12</span> </div><div style="font-size:19px;" class="storeItem" id="storeDisplay32"> <img class="hatPreview" src="../img/hats/hat_26.png"><span>Barbarian Armor : 26</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay33"> <img class="hatPreview" src="../img/hats/hat_21.png"><span>Plague Mask : 21</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay34"> <img class="hatPreview" src="../img/hats/hat_46.png"><span>Bull Mask : 46</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay35"> <img class="hatPreview" src="../img/hats/hat_14_p.png"><span>Windmill Hat : 14</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay36"> <img class="hatPreview" src="../img/hats/hat_11_p.png"><span>Spike Gear : 11</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay37"> <img class="hatPreview" src="../img/hats/hat_53_p.png"><span>Turret Gear : 53</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay38"> <img class="hatPreview" src="../img/hats/hat_20.png"><span>Samurai Armor : 20</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay39"> <img class="hatPreview" src="../img/hats/hat_16.png"><span>Bushido Armor : 16</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay40"> <img class="hatPreview" src="../img/hats/hat_27.png"><span>Scavenger Gear : 27</span> </div><div style="font-size:20px;" class="storeItem" id="storeDisplay41"> <img class="hatPreview" src="../img/hats/hat_40.png"><span>Tank Gear : 40</span> </div></div></div></div><hr><div id="durump">Police Mod: OFF</div><div id="duruma">Animals Mod: OFF</div><div id="durumc">Animal Caps: OFF</div><div id="durumf">Free Hats Mod: OFF</div><div id="durumm"></div></div><hr><div align="left"> <center>');
$("#ageBarContainer").append('</br><div id="hacktext"></div><div style="width: 100%;position: absolute;bottom: 94px;text-align: center;color:blue;font-size: 24px;" id="freetext"></div><div style="width: 100%;position: absolute;bottom: 144px;text-align: center;color: #ed3f00;font-size: 24px;" id="ptext"></div><div style="width: 100%;position: absolute;bottom: 224px;text-align: center;color: #9a008b;font-size: 24px;" id="ctext"></div><div style="width: 100%;position: absolute;top: 100px;text-align: center;color: white;font-size: 12px;" id="bilgitext">| Z - TankGear | C - SolderHat | SpaceBar - TurretGear | B - Free Hats Mod | N - Animals Mod | M - Animal Caps | P - Police Mod | F - Booby Trap | O - Circle Trap | V - Spike | L - Circle Spike | G - Auto Chat | J - Close Menu |</div><div style="width: 100%;position: absolute;bottom: 170px;text-align: center;color: darkgreen;font-size: 24px;" id="atext"></div><div style="width: 100%;position: absolute;bottom: 196px;text-align: center;color: black;font-size: 24px;" id="mtext"></div>');
document.getElementById('promoImgHolder').innerHTML = '</iframe><iframe width="300px"height="126.5px" src="https://www.youtube.com/embed/-aiiJDa4sZk" frameborder="0" allowfullscreen></iframe>';

$("#mainMenu").css("background", "url('https://media1.tenor.com/images/21c41588e7fe241d02caf4a35d996873/tenor.gif?itemid=10871835')");

$('.menuCard').css({'white-space': 'normal',
                    'text-align': 'center',
                    'background-color': 'rgba(0, 0, 0, 0.74)',
                    '-moz-box-shadow': '0px 0px rgba(255, 255, 255, 0)',
                    '-webkit-box-shadow': '0px 0px rgba(255, 255, 255, 0)',
                    'box-shadow': '0px 0px rgba(255, 255, 255, 0)',
                    '-webkit-border-radius': '0px',
                    '-moz-border-radius': '0px',
                    'border-radius': '0px',
                    'margin': '15px',
                    'margin-top': '15px'});

$('.menuCard').css({'color':'#808080'});

$('#promoImgHolder').css({'color':'#FFFAFA'});

$('#menuContainer').css({'white-space': 'normal'});

$('#guideCard').prepend('<a href = "https://discord.gg/T7wpygb">By F1reW1ng: Join the discord for help and tips on mod! </a> <br> ');

$('#guideCard').css({'color': '#FFFFF'});

$('.killCounter').css({'color': '#00FFFF'});

$('#nativeResolution').css({'cursor': 'pointer'});

$('#playMusic').css({'cursor': 'pointer'});

$('#serverSelect').css({'margin-bottom': '30.75px'});

$('#skinColorHolder').css({'margin-bottom': '30.75px'});

$('.settingRadio').css({'margin-bottom': '30.75px'});

$('#gameName').css({'color': 'blue',
                    'text-shadow': '0 1px 0 rgba(255, 255, 255, 0), 0 2px 0 rgba(255, 255, 255, 0), 0 3px 0 rgba(255, 255, 255, 0), 0 4px 0 rgba(255, 255, 255, 0), 0 5px 0 rgba(255, 255, 255, 0), 0 6px 0 rgba(255, 255, 255, 0), 0 7px 0 rgba(255, 255, 255, 0), 0 8px 0 rgba(255, 255, 255, 0), 0 9px 0 rgba(255, 255, 255, 0)',
                    'text-align': 'center',
                    'font-size': '126px',
                    'margin-bottom': '-30px'});

$('#loadingText').css({'color': 'blue',
                       'background-color': 'rgba(0, 0, 0, 0.74)',
                       'padding': '8px',
                       'right': '150%',
                       'left': '150%',
                       'margin-top': '40px'});

$('.ytLink').css({'color': '#00FFFF',
                  'padding': '8px',
                  'background-color': 'rgba(0, 0, 0, 0.74)'});

$('.menuLink').css({'color': '#00FFFF'});

$('.menuButton').css({'background-color': '#00FFFF'});


$('#nameInput').css({'border-radius': '0px',
                     '-moz-border-radius': '0px',
                     '-webkit-border-radius': '0px',
                     'border': 'hidden'});


$('#serverSelect').css({'cursor': 'pointer',
                        'color': '#00FFFF',
                        'background-color': '#808080',
                        'border': 'hidden',
                        'font-size': '20px'});

$('.menuButton').css({'border-radius': '0px',
                      '-moz-border-radius': '0px',})


$('#adCard').css({
	'max-height': '430px',
	'width': '320px',
	'overflow-y': 'scroll',
	'-webkit-overflow-scrolling': 'touch'
});




try {
document.getElementById("moomooio_728x90_home").style.display = "none"; //Remove sidney's ads
    $("#moomooio_728x90_home").parent().css({display: "none"});
} catch (e) {
  console.log("error removing ad");
}


var oldAlert = alert;
alert = function(){
    $.alert({title: "Full fucking server",
            content: "Välj en annan eller force connecta den här jäveln",
            useBootstrap: false,
            buttons: {
                  Back: () => { window.onbeforeunload = null; window.location = "http://moomoo.io"; },
                  Yes: () => {
                          let coreURL =  new URL(window.location.href);
                          let server = coreURL.searchParams.get("server");
                          window.sessionStorage.force = server;
                          window.sessionStorage.dog = server;
                          console.error(window.sessionStorage.force);
                          console.error(window.sessionStorage.dog);
                          console.error(server);
                          setTimeout(() => {
                                   console.error(window.sessionStorage.force);
                                  window.location = `http://moomoo.io?fc=${server}`;
                          }, 500);
                  },
            }
            });
}


$("#mapDisplay").css({background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa0T4yRDBy5rKnuMqFQYQHIukIs0-ukMBpVWPvnsceTajHyfnHBg')`});




document.title="Jacob är bättre än alla här"