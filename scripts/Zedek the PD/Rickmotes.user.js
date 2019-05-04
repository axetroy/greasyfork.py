// ==UserScript==
// @name         Rickmotes
// @namespace    saladfingers' Room
// @version      9.09
// @description  Weddings are like funerals with cake!
// @grant        none
// @copyright    2016
// @include     	*://*.instasync.com/r/SaladFingers
// @include     	*://instasync.com/r/SaladFingers
// @match       	*://*.instasync.com/r/SaladFingers
// @match       	*://instasync.com/r/SaladFingers
// ==/UserScript==

//    { src:"", width:, height:, title:''},
//    { src:"", width:, height:, name:''},

var version = GM_info.script.version;
var importantUpdateSeconds = 60; // Update the message every minute
var quoteUpdateSeconds = 120; // Update the quote every 1.5 minutes
var emoteListOpen = 0;

var unityBonus = 0;
var unityURL = "http://dailymotion.com/video/x3h6kdj";
var unityEyeURL = "http://i.imgur.com/H4wOhJJ.png";

var currentImportantMessage = '';

var specialIcon = "http://i.imgur.com/Sma26XW.gif";

var getLink_coolusers = "https://docs.google.com/document/u/0/export?format=txt&id=1O-G9sePHWrAP3ZhvcBxpltNabdKqBJJw2fSr7Xvo-r8&token=AC4w5Vh9JwSeJoO7aAdkwWcleDe-Y9TjSA%3A1463390710207";

// -- FOR GRAPPLES --
var grapplesPerLetter = 2;
var grapplesPerUser = 10;

// WHAT TO REPLACE UNNAMED WITH
var scumReplacer = "glipglop";

// I'm tired of checking this shit every time so I'm just storing purplenames in an array
var purpleNameList = [];

// -- COLORS THAT YOU CAN USE IN THE CHAT --
var chatColors = [
	"red",
	"orange",
	"yellow",
	"pink",
	"cyan",
	"green",
	"lime",
	"blue",
	"yellow",
	"brown",
	"gray",
	"grey",
	"white",
	"black",
	"gold",
	"violet",
	"magenta",
	"purple",
	"indigo",
	"aqua",
	"darkblue",
	"navy",
	"tan",
	"wheat",
	"maroon"
];

// QUOTES
var quotes = [
"Put 'em way up inside there, and shove 'em WAAAAAAY up inside your butthole.",
"What, so everyone's supposed to sleep every single night now? You realize that nighttime makes up half of all time?",
"'Love' is just a chemical reaction that compels animals to breed. It hits hard Morty, then it slowly fades leaving you stranded in a failing marriage. I did it, your parents are gonna do it. Break the cycle, Morty. Rise above, focus on science.",
"Sometimes science is more art than science, Morty. A lot of people don't get that.",
"Don't break an arm jerking yourself off.",
"I wish that shotgun was my penis.",
"What about the reality where Hitler cured cancer, Morty? The answer is: don't think about it.",
"MY MAN!",
"BUCKLE UP, BITCH",
"We're gonna 9/11 this bitch unless Morty gets better math grades!",
"You're missing the point, Morty. Why would he drive a smaller toaster with wheels? I mean, does your car look like a smaller version of your house? No.",
"EAT SOME FUCKING SHIT YOU FUCKING STUPID BITCH!",
"I'll tell you how I feel about school, Jerry. It's a waste of time. Bunch of people runnin' around bumpin' into each other, guy up front says '2+2' and the people in the back say '4,' then the bell rings and they give you a carton of milk and a piece of paper that says you can go take a dump or somethin'. I mean, it's not a place for smart people, Jerry.",
"We don't whitewash it either, Morty. I mean, the pirates are really rape-y.",
"You're young, you have your whole life ahead of you, and your anal cavity is still taut yet malleable!",
"Well she's my daughter, Summer. I outrank you. Or family means nothing, in which case, don't play that card.",
"5 more minutes of this and I'm gonna get mad!",
"People on the internet that are only turned on by cartoons of Japanese teenagers!",
"Boy, fuck you john. You fucking dumb, stupid idiot. You dumb, stupid, weak, pathetic, white, white... u-uh... guilt... white-guilt, milquetoast piece of human garbage.",
"STOP BEING SUCH A FUCKING TEASE YOU SWEET LITTLE TWAT",
"So what if the most meaningful day in your life was a simulation operating at minimum capacity?",
"Oh great adventure, buddy. Rick and Morty go to giant prison. You know if someone drops the soap it's going to land on our heads and crush our spines, Morty. You know, it'll be really easy to rape us after that.",
"Weddings are basically funerals with cake.",
"So what if the most meaningful day of your life was a simulation operating at minimum capacity?",
"FUCK YOU PICHAEL, YOU'RE A FUCKING PIECE OF SHIT!",
"Well shit, fuck it, just call him Pichael!",
"PLUTO'S A FUCKIN' PLANET, BITCH!"
];
var authors = [
"Rick", // In your butt
"Rick", // Sleep
"Rick", // Love reaction
"Rick", // More art
"Rick", // Jerk off
"Jerry", // Shotgunpenis
"Rick", // Hitler cancer
"Black Mailman", // MY MAN
"Scary Terry", // Buckle up bitch
"Rick", // 9/11,
"Rick", // Poptart
"Lil' Bits Guy",
"Rick", // School
"Rick", // Pirates
"Rick", // Malleable
"Rick", // Family
"Mr. Goldenfold", // 5 minutes
"Poncho", // Weebs
"Gazorpazorpfield", // Fuck you john
"King Jellybean", // Tease
"Rick", // Simulation
"Rick", // Giant prison
"Rick", // Cake
"Rick", // Simulation
"Michael", // Fuck you pichael
"Pichael", //Well shit
"King Flippy Nips" // Planet
];

var emotes = [
// secret memes
    { src:"http://i.imgur.com/J0BJhzz.gif", width:67, height:50, name:'mexlaugh'},
    { src:"http://i.imgur.com/3IWiwPI.gif", width:80, height:50, name:'pornoninsta'},
// frog emotes
    { src:"http://i.imgur.com/hjlsz9o.png", width:57, height:50, title:'actualfrog'},
    { src:"http://i.imgur.com/NGGdRIR.jpg", width:50, height:50, title:'animefrog'},
    { src:"http://i.imgur.com/of7zEEs.png", width:55, height:46, title:'bedfrog'},
    { src:"http://i.imgur.com/Er4PZbQ.png", width:50, height:60, title:'beefrog'},
    { src:"http://i.imgur.com/KHyrbrG.jpg", width:52, height:51, title:'chadfrog'},
    { src:"http://i.imgur.com/Rd6gdlT.jpg", width:55, height:51, title:'coolfrog'},
    { src:"http://i.imgur.com/5ymyU7a.png", width:49, height:55, title:'cuck'},
    { src:"http://i.imgur.com/YFIgSxW.jpg", width:75, height:48, title:'enough'},
    { src:"http://i.imgur.com/20v2cWD.jpg", width:50, height:50, title:'fam'},
    { src:"http://i.imgur.com/7DcmUoX.jpg", width:50, height:53, title:'fedorafrog'},
    { src:"http://i.imgur.com/H4Eur5e.png", width:40, height:37, title:'feelsfrogman'},
    { src:"http://i.imgur.com/H4Eur5e.png", width:40, height:37, title:'feelsfrog'}, /* alternate */
    { src:"http://i.imgur.com/N77gVg8.png", width:40, height:37, title:'feelsgoodman'},
    { src:"http://i.imgur.com/N77gVg8.png", width:40, height:37, title:'feelsgood'}, /* alternate */
    { src:"http://i.imgur.com/ciCmM39.jpg", width:50, height:43, title:'feelsmadman'},
    { src:"http://i.imgur.com/ciCmM39.jpg", width:50, height:43, title:'feelsmad'}, /* alternate */
    { src:"http://i.imgur.com/Vb53ri9.png", width:50, height:50, title:'fuckingnormies'},
    { src:"http://i.imgur.com/CCMYYYB.jpg", width:55, height:53, title:'grillfrog'},
    { src:"http://i.imgur.com/ySnOinb.jpg", width:50, height:49, title:'happyfrog'},
    { src:"http://i.imgur.com/afgxDQd.jpg", width:47, height:55, title:'jewfrog'},
    { src:"http://i.imgur.com/Pu1TimZ.jpg", width:60, height:52, title:'katyperry'},
    { src:"http://i.imgur.com/QttRBGs.jpg", width:49, height:49, title:'kawaiifrog'},
    { src:"http://i.imgur.com/LThXYVR.png", width:55, height:56, title:'lewdpep'},
    { src:"http://i.imgur.com/eVwca1X.png", width:60, height:50, title:'mericafrog'},
    { src:"http://i.imgur.com/eZBnzJ6.jpg", width:50, height:50, title:'normies'},
    { src:"http://i.imgur.com/uzhVfaA.jpg", width:51, height:50, title:'oldfrog'},
    { src:"http://i.imgur.com/4q3Zc9k.jpg", width:50, height:50, title:'pepe'},
    { src:"http://i.imgur.com/Oltz7Zg.png", width:50, height:50, title:'pepehd'},
    { src:"http://i.imgur.com/gtIfAdr.png", width:55, height:53, title:'reallyfrog'},
    { src:"http://i.imgur.com/SENpdAn.jpg", width:60, height:45, title:'ree'},
    { src:"http://i.imgur.com/w5Bh1U6.png", width:50, height:51, title:'smugshark'},
    { src:"http://i.imgur.com/K4ig6MJ.jpg", width:55, height:55, title:'snibetisad'},
    { src:"http://i.imgur.com/CNnJl0P.jpg", width:56, height:50, title:'spookfrog'},
    { src:"http://i.imgur.com/9A97Xm6.png", width:55, height:55, title:'stacy'},
    { src:"http://i.imgur.com/VxOyrMs.png", width:55, height:53, title:'supasmug'},
    { src:"http://i.imgur.com/q7ldsDW.jpg", width:50, height:47, title:'worryfrog'},
// shygirl emotes
    { src:"http://i.imgur.com/gYowCe1.gif", width:34, height:60, title:'blackshy'},
    { src:"http://i.imgur.com/89x9MO3.gif", width:33, height:60, title:'greenshy'},
    { src:"http://i.imgur.com/ybnC8DW.gif", width:41, height:60, title:'koopagirl'},
    { src:"http://i.imgur.com/zDA2ZIw.gif", width:33, height:60, title:'orangeshy'},
    { src:"http://i.imgur.com/x2iaHDw.gif", width:33, height:60, title:'pinkshy'},
    { src:"http://i.imgur.com/NdfhcHD.gif", width:39, height:60, title:'plantgirl'},
    { src:"http://i.imgur.com/2slI0no.gif", width:31, height:60, title:'purpleshy'},
    { src:"http://i.imgur.com/oGOftIm.gif", width:34, height:60, title:'redshy'},
    { src:"http://i.imgur.com/FTf1lSW.gif", width:38, height:60, title:'shygirl'},
    { src:"http://i.imgur.com/Z2hBkxR.gif", width:34, height:60, title:'whiteshy'},
// political emotes
    { src:"http://i.imgur.com/PqQJCd8.jpg", width:55, height:55, title:'bestpepe'},
    { src:"http://i.imgur.com/YNjhCkX.gif", width:75, height:50, title:'caucuses'},
    { src:"http://i.imgur.com/Vtp6jWl.gif", width:55, height:55, title:'emperor'},
    { src:"http://i.imgur.com/jiHja3d.png", width:50, height:55, title:'feelthebern'},
    { src:"http://i.imgur.com/Q2QZftg.png", width:50, height:55, title:'smug5'},
    { src:"http://i.imgur.com/AH3cHH7.jpg", width:56, height:55, title:'stump'},
// chaika emotes
    { src:"http://i.imgur.com/rflhJtC.gif", width:58, height:55, title:'chaika'},
    { src:"http://i.imgur.com/rflhJtC.gif", width:58, height:55, title:'chaik'}, /* alternate */
    { src:"http://i.imgur.com/Gh6S9en.gif", width:53, height:55, title:'chaikabaka'},
    { src:"http://i.imgur.com/0CSp8JQ.gif", width:55, height:55, title:'chaikaclap'},
    { src:"http://i.imgur.com/HrWHzSJ.gif", width:55, height:55, title:'chaikacute'},
    { src:"http://i.imgur.com/vIFFBE6.gif", width:55, height:55, title:'chaikaded'},
    { src:"http://i.imgur.com/aFFDv2s.gif", width:68, height:55, title:'chaikagrape'},
    { src:"http://i.imgur.com/JplLdWx.gif", width:81, height:55, title:'chaikaintense'},
    { src:"http://i.imgur.com/ikYJclp.png", width:60, height:55, title:'chaikamad'},
    { src:"http://i.imgur.com/B7bRg8R.gif", width:55, height:55, title:'chaikano'},
    { src:"http://i.imgur.com/O3TiDF2.gif", width:55, height:55, title:'chaikared'},
    { src:"http://i.imgur.com/dewn9vj.gif", width:57, height:55, title:'chaikashock'},
    { src:"http://i.imgur.com/sZMt8I2.gif", width:81, height:55, title:'chaikasmile'},
    { src:"http://i.imgur.com/MbWhq1o.jpg", width:55, height:55, title:'chaikastare'},
    { src:"http://i.imgur.com/wI8VKe9.gif", width:75, height:53, title:'chaikawait'},
    { src:"http://i.imgur.com/Alnm9f3.gif", width:43, height:60, title:'chaikawhat'},
    { src:"http://i.imgur.com/hR1ayZM.gif", width:87, height:55, title:'thechaikover'},
// flag emotes
    { src:"http://i.imgur.com/Wpw7XN2.gif", width:36, height:26, title:'aus'},
    { src:"http://i.imgur.com/fZ44WVA.gif", width:36, height:26, title:'br'},
    { src:"http://i.imgur.com/t2t6hm1.gif", width:36, height:26, title:'ca'},
    { src:"http://i.imgur.com/3DEQ5zg.gif", width:36, height:26, title:'co'},
    { src:"http://i.imgur.com/kb8yinu.gif", width:36, height:26, title:'de'},
    { src:"http://i.imgur.com/hUnHJvO.gif", width:36, height:26, title:'fin'},
    { src:"http://i.imgur.com/GHnQRYG.gif", width:36, height:26, title:'fr'},
    { src:"http://i.imgur.com/vnhY9Mu.gif", width:36, height:26, title:'isr'},
    { src:"http://i.imgur.com/Nffo2UR.gif", width:36, height:26, title:'jp'},
    { src:"http://i.imgur.com/mMtrKYK.gif", width:36, height:26, title:'mex'},
    { src:"http://i.imgur.com/ZYcwsa1.gif", width:36, height:26, title:'nz'},
    { src:"http://i.imgur.com/CUlQsfH.gif", width:36, height:26, title:'ru'},
    { src:"http://i.imgur.com/kURaCY6.gif", width:36, height:26, title:'sco'},
    { src:"http://i.imgur.com/3GvSRC6.gif", width:36, height:26, title:'sk'},
    { src:"http://i.imgur.com/9eCWp0T.gif", width:36, height:26, title:'som'},
    { src:"http://i.imgur.com/SbNJ2tq.gif", width:36, height:26, title:'uk'},
    { src:"http://i.imgur.com/Yd8m2gA.gif", width:36, height:26, title:'usa'},
// default emotes
    { src:"http://i.imgur.com/SAyYM.png", width:30, height:29, title:':3'},
    { src:"http://i.imgur.com/cw2K1qQ.gif", width:50, height:49, title:':o'},
    { src:"http://i.imgur.com/eKMaWME.jpg", width:59, height:45, title:'2slow'},
    { src:"http://i.imgur.com/zU4MWxt.gif", width:50, height:50, title:'applause'},
    { src:"http://i.imgur.com/KMtUc.png", width:20, height:27, title:'babby'},
    { src:"http://i.imgur.com/GiBiY.png", width:30, height:21, title:'babyseal'},
    { src:"http://i.imgur.com/sNwfW.png", width:83, height:28, title:'bagger288'},
    { src:"http://i.imgur.com/C7jqbVR.gif", width:50, height:65, title:'bardy'},
    { src:"http://i.imgur.com/sqmG0.gif", width:60, height:60, title:'bateman'},
    { src:"http://i.imgur.com/JVbAzkh.gif", width:35, height:58, title:'bear'},
    { src:"http://i.imgur.com/AAulUfx.gif", width:50, height:50, title:'bender'},
    { src:"http://i.imgur.com/mAQAc.gif", width:24, height:36, title:'bikenigger'},
    { src:"http://i.imgur.com/7rhHQ.gif", width:55, height:38, title:'birdy'},
    { src:"http://i.imgur.com/NHWMFAV.png", width:27.2, height:40, title:'bogs'},
    { src:"http://i.imgur.com/6aqGVba.gif", width:60, height:60, title:'boogie'},
    { src:"http://i.imgur.com/dVo0h.gif", width:40, height:40, title:'brody'},
    { src:"http://i.imgur.com/6bkHh.gif", width:50, height:50, title:'burt'},
    { src:"http://i.imgur.com/j5Znq.gif", width:50, height:50, title:'chikkin'},
    { src:"http://i.imgur.com/qTy2s.gif", width:60, height:40, title:'clap'},
    { src:"http://i.imgur.com/KWKwd.gif", width:60, height:45, title:'daddycool'},
    { src:"http://i.imgur.com/Pvq0s.gif", width:40, height:40, title:'dansen'},
    { src:"http://i.imgur.com/1awtK.png", width:30, height:30, title:'datass'},
    { src:"http://i.imgur.com/3Nzl3gQ.gif", width:50, height:63, title:'ded'},
    { src:"http://i.imgur.com/LIe61.gif", width:50, height:31, title:'deowitit'},
    { src:"http://i.imgur.com/VpmN8.jpg", width:56, height:38, title:'dilbert'},
    { src:"http://i.imgur.com/QbPMBnT.jpg", width:50, height:50, title:'disguy'},
    { src:"http://i.imgur.com/DaUdTh0.gif", width:46, height:60, title:'disco'},
    { src:"http://i.imgur.com/wtfdb.gif", width:40, height:49, title:'dog'},
    { src:"http://i.imgur.com/93FIGRJ.gif", width:60, height:60, title:'doge'},
    { src:"http://i.imgur.com/gZe9z.png", width:30, height:37, title:'dolan'},
    { src:"http://i.imgur.com/uYK1FIh.jpg", width:40, height:40, title:'dreck'},
    { src:"http://i.imgur.com/NSodE.gif", width:55, height:38, title:'duane'},
    { src:"http://i.imgur.com/0gq5a.gif", width:40, height:40, title:'dynamite'},
    { src:"http://i.imgur.com/i2SWp.gif", width:60, height:60, title:'ecchi'},
    { src:"http://i.imgur.com/aOXm1.gif", width:45, height:45, title:'epicsaxguy'},
    { src:"http://i.imgur.com/PsY5I.gif", width:33, height:40, title:'fap'},
    { src:"http://i.imgur.com/FGs29.jpg", width:40, height:30, title:'facepalm'},
    { src:"http://i.imgur.com/3d9rVYL.gif", width:55, height:60, title:'feels'},
    { src:"http://i.imgur.com/D5Pb9CK.png", width:55, height:55, title:'feelsbadman'},
    { src:"http://i.imgur.com/obllO.png", width:30, height:36, title:'foreveralone'},
    { src:"http://i.imgur.com/rPd1rF4.png", width:30, height:40, title:'foreverfedora'},
    { src:"http://i.imgur.com/HK8Mc.gif", width:60, height:44, title:'frog'},
    { src:"http://i.imgur.com/e6oan.gif", width:50, height:37, title:'fukkireta'},
    { src:"http://i.imgur.com/5ziar.gif", width:30, height:40, title:'gang'},
    { src:"http://i.imgur.com/RQDcT0t.gif", width:50, height:50, title:'gir'},
    { src:"http://i.imgur.com/OzoGMzC.jpg", width:45, height:50, title:'glad'},
    { src:"http://i.imgur.com/tZ7uG.png", width:40, height:40, title:'gooby'},
    { src:"http://i.imgur.com/zg7DE.gif", width:50, height:58, title:'goyim'},
    { src:"http://i.imgur.com/0YH5oDz.jpg", width:60, height:52, title:'haveaseat'},
    { src:"http://i.imgur.com/tyu9p.png", width:29, height:30, title:'imokwiththis'},
    { src:"http://i.imgur.com/XTRtP.jpg", width:40, height:41, title:'invadinggecko'},
    { src:"http://i.imgur.com/0gRnsme.jpg", width:45, height:55, title:'jimmy'},
    { src:"http://i.imgur.com/JeUM7i7.png", width:40, height:54, title:'kek'},
    { src:"http://i.imgur.com/fjnKFla.jpg", width:45, height:58, title:'kekefeels'},
    { src:"http://i.imgur.com/lMNHVOi.gif", width:50, height:60, title:'kidzbop'},
    { src:"http://i.imgur.com/LoiLTWx.png", width:30, height:30, title:'like'},
    { src:"http://i.imgur.com/LLXMuJ1.jpg", width:50, height:45, title:'lefunnymeme'},
    { src:"http://i.imgur.com/r6OJDU5.png", width:50, height:53, title:'lewd'},
    { src:"http://i.imgur.com/jP8QL.png", width:28, height:34, title:'lolface'},
    { src:"http://i.imgur.com/lwZ8K.gif", width:40, height:31, title:'lolicatgirls1080p'},
    { src:"http://i.imgur.com/USvG7.gif", width:40, height:40, title:'meattball'},
    { src:"http://i.imgur.com/1x6es.png", width:30, height:31, title:'megusta'},
    { src:"http://i.imgur.com/slU5Ibx.gif", width:35, height:58, title:'merica'},
    { src:"http://i.imgur.com/7Zpq3i9.gif", width:45, height:55, title:'metal'},
    { src:"http://i.imgur.com/aHk0nnU.gif", width:60, height:45, title:'mewte'},
    { src:"http://i.imgur.com/ScyKroE.gif", width:32, height:43, title:'miku'},
    { src:"http://i.imgur.com/GDa6R.jpg", width:40, height:40, title:'mmmm'},
    { src:"http://i.imgur.com/f8QbyJk.gif", width:45, height:55, title:'monkey'},
    { src:"http://i.imgur.com/MYnVAEY.gif", width:50, height:38, title:'motherofgod'},
    { src:"http://i.imgur.com/Gg1asUN.gif", width:50, height:45, title:'mysides'},
    { src:"http://i.imgur.com/UsUdb.png", width:60, height:60, title:'nice'},
    { src:"http://i.imgur.com/eAqvn.jpg", width:20, height:30, title:'nigga'},
    { src:"http://i.imgur.com/N97Di.png", width:30, height:41, title:'nope'},
    { src:"http://i.imgur.com/NaJOipw.jpg", width:50, height:50, title:'notsure'},
    { src:"http://i.imgur.com/XVR2I.jpg", width:46, height:40, title:'nowai'},
    { src:"http://i.imgur.com/doRcz.gif", width:40, height:40, title:'o'},
    { src:"http://i.imgur.com/TN1xn.png", width:21, height:30, title:'okay'},
    { src:"http://i.imgur.com/Moz8e.gif", width:50, height:50, title:'omnom'},
    { src:"http://i.imgur.com/ifjt6ru.gif", width:50, height:49, title:'oo'},
    { src:"http://i.imgur.com/2cRoc.jpg", width:48, height:44, title:'orly'},
    { src:"http://i.imgur.com/vRZA9.png", width:18, height:25, title:'pedobear'},
    { src:"http://i.imgur.com/gbqK7.png", width:30, height:33, title:'pokerface'},
    { src:"http://i.imgur.com/lotDJ.gif", width:50, height:40, title:'pomf'},
    { src:"http://i.imgur.com/fomgV.jpg", width:40, height:40, title:'pull'},
    { src:"http://i.imgur.com/pad58.gif", width:60, height:50, title:'racist'},
    { src:"http://i.imgur.com/LzEUn.gif", width:60, height:40, title:'rape'},
    { src:"http://i.imgur.com/rgeL0X0.gif", width:56, height:60, title:'rin'},
    { src:"http://i.imgur.com/WGVec1g.png", width:40, height:50, title:'sad'},
    { src:"http://i.imgur.com/CTZGo.png", width:31, height:33, title:'sanic'},
    { src:"http://i.imgur.com/0Bwax.gif", width:20, height:45, title:'snoop'},
    { src:"http://i.imgur.com/30e00.png", width:28, height:59, title:'success'},
    { src:"http://i.imgur.com/FhdArn4.gif", width:55, height:55, title:'thuglife'},
    { src:"http://i.imgur.com/q0erE.gif", width:40, height:40, title:'timotei'},
    { src:"http://i.imgur.com/idXUK.png", width:30, height:25, title:'trollface'},
    { src:"http://i.imgur.com/kODDJ.gif", width:66, height:46, title:'umad'},
    { src:"http://i.imgur.com/Yk6ZV.png", width:33, height:14, title:'umaood'},
    { src:"http://i.imgur.com/xpamg.png", width:40, height:40, title:'unamused'},
    { src:"http://i.imgur.com/CALcK.png", width:38, height:42, title:'wat'},
    { src:"http://i.imgur.com/65QFT.png", width:51, height:60, title:'weegee'},
    { src:"http://i.imgur.com/FL5zr.jpg", width:75, height:65, title:'yarly'}
    ];
// SALAD EMOTES
// Courtesy of Zedek the PD
var rickmotes = [
    { src:"http://i.imgur.com/X1J2Pp9.png", width:78, height:54, title:'goodshow'},
    { src:"http://i.imgur.com/zfIA8sT.gif", width:122, height:64, title:'eatsomeshit'},
    { src:"http://i.imgur.com/MwDe03X.gif", width:102, height:50, title:'butthole'},
	{ src:"http://i.imgur.com/DdodxC4.gif", width:75, height:65, title:'cure'},
	{ src:"http://i.imgur.com/CGZV9FU.gif", width:100, height:64, title:'bedtime'},
	{ src:"http://i.imgur.com/GtUYPWa.gif", width:90, height:55, title:'disqualified'},
	{ src:"http://i.imgur.com/E0S4pWE.gif", width:101, height:64, title:'vr'},
	{ src:"http://i.imgur.com/b5liibU.gif", width:56, height:80, title:'jessica'},
	{ src:"http://i.imgur.com/fhGg3GF.png", width:99, height:70, title:'stealy'},
	{ src:"http://i.imgur.com/4ShQDnK.gif", width:98, height:48, title:'theflow'},
	{ src:"http://i.imgur.com/ptcE0ew.png", width:59, height:60, title:'goodmorty'},
	{ src:"http://i.imgur.com/CiEzMqq.png", width:98, height:85, title:'drawmejerry'},
	{ src:"http://i.imgur.com/IkeigkI.gif", width:126, height:68, title:'undercover'},
	{ src:"http://i.imgur.com/sk049Ku.png", width:89, height:70, title:'theory'},
	{ src:"http://i.imgur.com/XXAtt6z.png", width:50, height:60, title:'fondlers'},
	{ src:"http://i.imgur.com/42eGfZf.png", width:57, height:75, title:'slides'},
	{ src:"http://i.imgur.com/e5ywKtt.gif", width:70, height:70, title:'fuckheknows'},
	{ src:"http://i.imgur.com/NyfpMr3.gif", width:112, height:59, title:'dreambitch'},
	{ src:"http://i.imgur.com/TasbzAE.gif", width:92, height:60, title:'pichael'},
	{ src:"http://i.imgur.com/vtkztf5.gif", width:108, height:61, title:'fuckyoupichael'},
	{ src:"http://i.imgur.com/ltnwz6U.png", width:67, height:70, title:'pilot'},
	{ src:"http://i.imgur.com/5qmVZ19.png", width:67, height:80, title:'alcoholism'},
	{ src:"http://i.imgur.com/WiF9aca.gif", width:58, height:63, title:'rickdance'},
	{ src:"http://i.imgur.com/eL8VkQx.png", width:50, height:65, title:'angryjerry'},
	{ src:"http://i.imgur.com/JloPy0q.png", width:76, height:70, title:'pissedmorty'},
	{ src:"http://i.imgur.com/0OGgurc.png", width:67, height:70, title:'furiousmorty'},
	{ src:"http://i.imgur.com/Egtb6if.png", width:52, height:70, title:'shouldersmorty'},
	{ src:"http://i.imgur.com/0zDwXWo.png", width:112, height:70, title:'smugjessica'},
	{ src:"http://i.imgur.com/wh8Q6vU.png", width:97, height:70, title:'emostreak'},
	{ src:"http://i.imgur.com/9seLs4q.png", width:77, height:60, title:'helpmems'},
	{ src:"http://i.imgur.com/CKRz1l9.png", width:50, height:70, title:'manson'},
	{ src:"http://i.imgur.com/FPRYTW5.png", width:109, height:16, title:'dicknose'},
	{ src:"http://i.imgur.com/Py0tCUD.png", width:29, height:16, title:'rmdick'},
	{ src:"http://i.imgur.com/wG0u8D8.png", width:63, height:70, title:'shrimpley'},
	{ src:"http://i.imgur.com/YCZ65gL.png", width:49, height:70, title:'smugjerry'},
	{ src:"http://i.imgur.com/68uWUep.png", width:70, height:70, title:'catalog'},
	{ src:"http://i.imgur.com/vWBInT9.png", width:58, height:70, title:'pissedbeth'},
	{ src:"http://i.imgur.com/wTwZhsE.gif", width:96, height:16, title:'pspace'},
	{ src:"http://i.imgur.com/iVIC5Bk.png", width:89, height:70, title:'artsybeth'},
	{ src:"http://i.imgur.com/rUE1qhR.png", width:62, height:70, title:'drunkbeth'},
	
	// Reddit
	{ src:"http://i.imgur.com/Q5029X2.png", width:32, height:32, title:'blankrick'},
	{ src:"http://i.imgur.com/UscFGwy.png", width:32, height:32, title:'woorick'},
	{ src:"http://i.imgur.com/8RuKNFQ.png", width:32, height:32, title:'gimprick'},
	{ src:"http://i.imgur.com/mmOHE8r.png", width:32, height:32, title:'happyrick'},
	{ src:"http://i.imgur.com/JybqAuz.png", width:32, height:32, title:'hmrick'},
	
	{ src:"http://i.imgur.com/KfDhl04.png", width:32, height:32, title:'dumbmorty'},
	{ src:"http://i.imgur.com/dOiDipJ.png", width:32, height:32, title:'helmetmorty'},
	{ src:"http://i.imgur.com/vbbz2ZA.png", width:32, height:32, title:'madmorty'},
	{ src:"http://i.imgur.com/cuIO09V.png", width:32, height:32, title:'muslimmorty'},
	{ src:"http://i.imgur.com/Rn8SOSc.png", width:32, height:32, title:'surprisedmorty'},
	{ src:"http://i.imgur.com/LPW6eyC.png", width:32, height:32, title:'swagmorty'},
	{ src:"http://i.imgur.com/ELyEkTa.png", width:32, height:32, title:'widemorty'},
	
	{ src:"http://i.imgur.com/14O7xj2.png", width:32, height:32, title:'happyjerry'},
	{ src:"http://i.imgur.com/RCFONGI.png", width:32, height:32, title:'madjerry'},
	{ src:"http://i.imgur.com/L6svB44.png", width:32, height:32, title:'surprisedjerry'},
	{ src:"http://i.imgur.com/Q1DFdYS.png", width:32, height:32, title:'reallyjerry'},
	
	{ src:"http://i.imgur.com/HwWOvum.png", width:32, height:32, title:'buttholeflaps'},
	{ src:"http://i.imgur.com/As1kIqq.png", width:32, height:32, title:'pearlharbor'},
	{ src:"http://i.imgur.com/saPPAoN.png", width:32, height:32, title:'davinmantis'},
	{ src:"http://i.imgur.com/qpfuCw0.png", width:32, height:32, title:'drbloom'},
	{ src:"http://i.imgur.com/lbGwxOR.png", width:32, height:32, title:'goldenfold'},
	{ src:"http://i.imgur.com/VBhMO5A.png", width:32, height:32, title:'hepadisease'},
	{ src:"http://i.imgur.com/XL3DWIM.png", width:32, height:32, title:'hepcdisease'},
	{ src:"http://i.imgur.com/lHmO8af.png", width:32, height:32, title:'mailman'},
	{ src:"http://i.imgur.com/AcCK2Bf.png", width:32, height:32, title:'mantis1'},
	{ src:"http://i.imgur.com/oCIK9Dj.png", width:32, height:32, title:'poncho'},
	{ src:"http://i.imgur.com/Ov3a2UG.png", width:32, height:32, title:'poptart'},
	{ src:"http://i.imgur.com/leodZIy.png", width:32, height:32, title:'putthatbackon'},
	{ src:"http://i.imgur.com/cz1TieR.png", width:32, height:32, title:'rdjessica'},
	{ src:"http://i.imgur.com/qPFfE3p.png", width:32, height:32, title:'rdkevin'},
	{ src:"http://i.imgur.com/d3bFmsQ.png", width:32, height:32, title:'rmannie'},
	{ src:"http://i.imgur.com/MOlL5AY.png", width:32, height:32, title:'rmbeth'},
	{ src:"http://i.imgur.com/xJiZKSj.png", width:32, height:32, title:'rmbrad'},
	{ src:"http://i.imgur.com/265dg0m.png", width:32, height:32, title:'scaryt'},
	{ src:"http://i.imgur.com/tcil83t.png", width:32, height:32, title:'slowdown'},
	{ src:"http://i.imgur.com/GJXXyLm.png", width:32, height:32, title:'udunnome'}
	
	
];

// SUPER SECRET PURPLE ONLY EMOTES
var secret_rickmotes = [
    { src:"http://i.imgur.com/BoXRtdP.png", width:79, height:70, title:'breed'},
    { src:"http://i.imgur.com/e7QUPV9.png", width:59, height:80, title:'evilmorty'},
    { src:"http://i.imgur.com/nf1K0nQ.png", width:82, height:68, title:'jessicatits'},
    { src:"http://i.imgur.com/mvJdrXj.gif", width:137, height:70, title:'shadjessica'},
    { src:"http://i.imgur.com/B33Z5HC.png", width:121, height:70, title:'unitytits'},
    { src:"http://i.imgur.com/R23NxMW.png", width:63, height:80, title:'summerpussy'},
    { src:"http://i.imgur.com/INeaRG6.png", width:72, height:70, title:'bethmoan'},
    { src:"http://i.imgur.com/JtzNvfh.png", width:108, height:60, title:'bethtits'},
    { src:"http://i.imgur.com/LyEfHzQ.png", width:56, height:70, title:'bethbite'}
];

function addEmotes(){
    emotes.forEach(function(emote){
        window.$codes[emote.title || emote.name] = $('<img>', emote)[0].outerHTML;
    });
	
	rickmotes.forEach(function(emote){		
        window.$codes[emote.title || emote.name] = $('<img>', emote)[0].outerHTML;
    });
	
	secret_rickmotes.forEach(function(emote){		
        window.$codes[emote.title || emote.name] = $('<img>', emote)[0].outerHTML;
    });
}
 
function main(){
    if(!window.$codes || Object.keys(window.$codes).length === 0){
        setTimeout(main, 75);
    } else{
        setTimeout(versionChecker, 5000); // Initial version check
		setInterval(versionChecker, 300000); // Periodic version check
		setInterval(updateQuote, quoteUpdateSeconds * 1000); // Periodic quote update
		addEmotes();
        
        setTimeout(createUselessBox, 3000);
		setInterval(updateImportantMessage, importantUpdateSeconds * 1000);
		
        // Parse page items.
        parseChat();
		parseUsers();
        setTimeout(parseVideo, 3000);
        
        // Add a tab with emote shortcuts.
        setTimeout(addEmoteTab, 3000);
    }
}
if (window.document.readyState === 'complete') {
  main();
} else {
  window.addEventListener('load', main, false);
}

function versionChecker() {    
    $.get("https://greasyfork.org/en/scripts/17917-rickmotes", function( data ) {
        $.each($(data).find('dd.script-show-version'), function(i, v) {
            var currentVersion = $(this).text();

            if (version < currentVersion) {
                // alert("update script pls");
				$("#chat_messages").append("<div class='chat-message'><span class='username unregistered'>: </span><span class='message superimportant'>Your RickMotes script is out of date. Please update it!</span></div>");
				
				$("#chat_messages").append("<div class='chat-message'><span class='username unregistered'>: </span><span class='message superimportant'>You're using " + version.toString() + ", the newest is <a href='https://greasyfork.org/en/scripts/17917-rickmotes'>" + currentVersion + "</a>. </span></div>");
            }
        });
    });
}

// Work in progress.
function checkUserForScript() {
    /*    
    $("#user_list li").each(function(index) {
        console.log("test");
        console.log( index + ": " + $( this ).text() );
    });
    
    //var currentUser = $("#logged_in_as");
    //console.log(currentUser);
    
    // leader (class to add).
    */
}

function createUselessBox(){
    // Style the box
    $("<style type='text/css'> .poll.always-active{ box-shadow:0px 0px 8px rgba(0,0,0,0.25); background-color:#464646; color:white; !important;} </style>").appendTo("head");
    // WELCOME
    $("<style type='text/css'> #welcomerick, #importantheader{ width:100%; background-color:#222222; border-top:1px dashed #666666; border-bottom:1px dashed #666666; text-align:center; line-height:24px; font-size:10pt; font-weight:bold; font-family:Verdana; !important;} </style>").appendTo("head");
    // Large text
    $("<style type='text/css'> .larger{ font-size:12pt; font-weight:bold; color:#f4ffe0; !important;} </style>").appendTo("head");
    // Important header
    $("<style type='text/css'> #importantheader{ color:red; !important;} </style>").appendTo("head");
    // Important chat messages
    $("<style type='text/css'> .message.superimportant{ color:red; font-weight:bold; !important;} </style>").appendTo("head");
    // Author
    $("<style type='text/css'> #author{ text-align:right; padding:4px; color:#aaa; !important;} </style>").appendTo("head");
    
    var emote_container=$("\<div style='clear:both;'></div> \
	<div id='poll_column' class='emotes poll'><div class='poll always-active' style='overflow: auto;vertical-align: middle;'> \
	<span style='font-size:10pt; font-weight:bold'><a target='_blank' href='https://greasyfork.org/en/scripts/17917-rickmotes'>RickMotes Script (Official)</a></span><br>\
	<div id='importantheader'>Important:</div> \
	<span class='importantmessage' id='imessage'>---</span><br><br>\
	<div id='welcomerick'>Words of Wisdom:</div> \
	<span id='shownquote'>This is a quote</span> \
	<div id='author'>- <span id='shownauthor'>Rick</span></div> \
	<div id='welcomerick'>Welcome to SaladFingers!</div> \
	<span class='larger'>The official SaladFingers room.</span><br> \
	If you're reading this, that means you've installed the RickMotes script. In which case, congrats! That means you're a cool motherfucker and we'll remember you fondly.<br><br> \
	<span class='larger'>Room Rules:</span><br> \
	Don't spam shit, otherwise, that's it.<br><br> \
	<span class='larger'>Instructions:</span><br> \
	Check the emotes tab for a list of emotes. If something's fucky, let one of the mods (NoirSuccubus) know. Hopefully, the script will have lots of new features soon.<br><br> \
	You can surround your text with certain things to add flavor:<br><br>\
	* <strong>Bold</strong><br> \
	_ <em>Italics</em><br> \
	[X] <span style='font-size:16pt; color:red; font-weight:bold'>MASSIVE</span><br> \
	[^] <span style='font-size:16pt'>Large</span><br> \
	[color] <span style='color:yellow'>Colored Text</span><br> \
	</div></div>").insertAfter(".col-sm-4.hidden-xs.column .mod-control");
	
	// Apply the notification
	updateImportantMessage();
	updateQuote();
}

function updateQuote(){
	// Pick a quote
	var selectedQuote = Math.floor((Math.random() * quotes.length));
	
	document.getElementById('shownquote').innerHTML = "\"" + quotes[selectedQuote] + "\"";
	document.getElementById('shownauthor').innerHTML = authors[selectedQuote];
}

function updateImportantMessage(){
	$.get("https://docs.google.com/document/export?format=txt&id=15hjb5PjleQ65pv60mnIWjRsP3GD9MFv5QYxsEb6d7HM&token=AC4w5VhcQrA1Ehg-RqDIyDZoVghrrRb4cA%3A1463243015483", function(data) {
        // Get element.
        var IM = document.getElementById('imessage');
        
        // Check if data is new.
        if (currentImportantMessage != data)
        {
            // If this is not first update, notify chatters.
            if (currentImportantMessage != ''){
                $("#chat_messages").append("<div class='chat-message'><span class='username unregistered'>: </span><span class='message superimportant'>New important message!</span></div>");
            }

            // Display text and save as var (string).
            if (data != ""){IM.innerHTML = data; currentImportantMessage = data;}
            else {IM.innerHTML = "No message to display.";}
        }

	});
}

function testLog(loggy) {
	$("#chat_messages").append("<div class='chat-message'><span class='username unregistered'>: </span><span class='message superimportant'>"+loggy+"</span></div>");
}

function calculateGrapples() {
	var userItems = document.getElementById('user_list').childNodes;
	var grapples = 0;
	
	for (var l = 0; l < userItems.length; l++) {
		if (userItems[l].textContent !== scumReplacer) {
            grapples += grapplesPerUser;
            grapples += (userItems[l].textContent.length * grapplesPerLetter);
		}
	}
	
	return grapples;
}

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Replace the text between two characters with some special formatting
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function replaceBetweenCharacters(obj, originalString, replacer, frmt, frmtend) {
	// Figure out how many replacers we have.
	var stars = originalString.split(replacer).length - 1;
	
	// Only parse if we have an even number of replaces.
	if (stars % 2 == 0 && originalString.indexOf(replacer) !== -1)
	{
		while (originalString.indexOf(replacer) !== -1)
		{
					// First star.
					var bold1 = originalString.indexOf(replacer);
					originalString = originalString.replace(replacer,"`");
					
					// Second star.
					var bold2 = originalString.indexOf(replacer);
					originalString = originalString.replace(replacer,"`");
					
					// Now that we have both of the stars, let's isolate the stars.
					var leftText = originalString.slice(0,bold1);
					var midText = originalString.slice(bold1+1,bold2);
					
					// Replace midtext with bold.
					midText = frmt+midText+frmtend;
					
					var rightText = originalString.slice(bold2+1,originalString.length);
					
					originalString = leftText+midText+rightText;
					
					
		} 
		
		obj.html(originalString);
	}
	
	return originalString;
}

function userIsPurple(uname)
{
	var purple = false;
	
	for (var l=0; l<purpleNameList.length; l++)
	{
		if (purpleNameList[l].toLowerCase() == uname.toLowerCase()) {purple=true;}
	}
	
	alert(purpleNameList.join()+" $ "+purple);
	return purple;
}

// Handles things that are done in the chat
function parseChat() {
    // Add event listener on the chat.
    $('#chat_messages').bind("DOMSubtreeModified", function() {
        // Get the last element (last message).
        var lastMessage = $('.chat-message:last-child', this);
		var realMessage = $('.message', lastMessage);
        // Extract the message as a string.
        var lastMessageText = realMessage.text();
		
		// PURPLE SHIT
		var messageUser = $('.username', lastMessage);
		var messageUserName = messageUser.text().slice(0,messageUser.text().indexOf(":"));
		
		//if (userIsPurple(messageUserName)){alert("PURPLE!");}
		//alert("$"+messageUserName+"$");
		
		// UNITY MODE?
		if (unityBonus && lastMessage.html().indexOf(unityEyeURL) == -1 && lastMessageText !== "")
		{	
			lastMessage.html("<div id='unityeyes'><img src='"+unityEyeURL+"'></div>  "+lastMessage.html());
		}
		
		// -- EXCEPTION FOR GRAPPLES -------------------------------------
		
		var totalGrapples = 0;
		var hasGrapples = lastMessageText.indexOf('!grapples');

		// !grapples
		if (hasGrapples !== -1) {
			var totalGrapples = calculateGrapples();
			$("#chat_messages").append("<div class='chat-message'><span class='username unregistered' style='color:red'>Stealy: </span><span class='message' style='color:blue; font-weight:bold;'>That's " + totalGrapples.toString() + " grapples!</span></div>");
		}

		// BOLD CHECK
		lastMessageText = replaceBetweenCharacters(realMessage,lastMessageText,"*","<strong>","</strong>");
		// ITALIC CHECK
		lastMessageText = replaceBetweenCharacters(realMessage,lastMessageText,"_","<em>","</em>");
		// COLOR CHECK
		for (var l=0; l<chatColors.length; l++)
		{
		lastMessageText = replaceBetweenCharacters(realMessage,lastMessageText,"["+chatColors[l]+"]","<span style='color:"+chatColors[l]+"'>","</span>");
		}
		// HUGE CHECK
		lastMessageText = replaceBetweenCharacters(realMessage,lastMessageText,"[^]","<span style='font-size:16pt'>","</span>");
		// MAJOR LEL RED CHECK
		lastMessageText = replaceBetweenCharacters(realMessage,lastMessageText,"[X]","<span style='font-size:16pt; color:red; font-weight:bold;'>","</span>");
    });
}

// Rename FILTHY UNNAMED SCUM and other things.
function parseUsers() {
	updateUsers();
	
    // Add event listener on the chat.
    $('#user_list').bind("DOMSubtreeModified", function() {
		updateUsers();
    });
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

function updateUsers() {
	var userItems = document.getElementById('user_list').childNodes;
    
    $.get(getLink_coolusers, function(data) {
		
		// Now let's turn the users into an array.
		var userArray = data.split(',');
		var titleArray = [];
		
		// Separate titles.
		for (var m = 0; m < userArray.length; m++) {
			titleArray[m] = userArray[m].slice(userArray[m].indexOf("`")+1, userArray[m].length);
			userArray[m] = userArray[m].slice(0, userArray[m].indexOf("`"));

			// $("#chat_messages").append("<div class='chat-message'><span class='username unregistered' style='color:red'>: </span><span class='message' style='color:blue; font-weight:bold;'>"+userArray[m]+" - "+titleArray[m]+"</span></div>");
		}

        for (var l = 0; l < userItems.length; l++) {
            // Cool users.
            for (var m = 0; m < userArray.length; m++) {

                if (userItems[l].textContent.toLowerCase() == userArray[m] && userItems[l].innerHTML.indexOf(specialIcon) == -1) {
                    userItems[l].innerHTML = "<img src="+specialIcon+"> "+userItems[l].innerHTML;
                    userItems[l].style.color = "#c600ff";
                    userItems[l].setAttribute('title', userItems[l].textContent + ' - '+titleArray[m]);
                }
            }

            // Replace unnamed.
            if (userItems[l].textContent == 'unnamed'){
                userItems[l].textContent = scumReplacer;
                userItems[l].setAttribute('title', scumReplacer);
            }
        }
    });
}

function addGoodMorty() {
	// Morty face
	// $("<style type='text/css'> .fa-morty{ width:100%; !important;} </style>").appendTo("head");

	// Emote tab style
	$("<style type='text/css'> #tabs_playlist_brochure{ overflow: scroll; height:280px; padding:8px; !important;} </style>").appendTo("head");
	// Panel style
	$("<style type='text/css'> #mortypane{ width: 100%; !important;} </style>").appendTo("head");

	// Add the actual tab
	$('<li><a title="The Good Morty" data-original-title="The Good Morty" href="#tabs_playlist_brochure" data-toggle="tab"><i class="fa" style="width: 12px;height: 14px;"><img src="http://i.imgur.com/xTvF2C2.png" class="fa-morty"></i></a></li>').insertBefore('.video-controls .nav-tabs .skip-controls');
	// Emote div
	$("\<div class='tab-pane' id='tabs_playlist_brochure'><span class='emotetitle'>The Good Morty:</span><br><br> \
	<img src='http://i.imgur.com/QeLBQMl.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/6qS1IFu.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/tGN7SOM.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/SrbGr5f.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/JMD4Q9q.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/hJLEX82.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/YHsbI53.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/JSK8y3c.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/sHEyKkY.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/bAhrR7N.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/owudsyk.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/bbdCQMF.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/Rc84SGk.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/adIanNG.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/KU9Wqph.jpg' id='mortypane'><br> \
	<img src='http://i.imgur.com/gDjZmJK.jpg' id='mortypane'><br> \
	</div>").insertAfter("#tabs_playlist_settings");
}

function addEmoteTab() {
    // Unity image
    $("<style type='text/css'> #unityeyes{ margin-right:8px; display:inline;} </style>").appendTo("head");
	// Morty face
	$("<style type='text/css'> .fa-morty{ width:100%; !important;} </style>").appendTo("head");
	// Emote div style
	$("<style type='text/css'> #emotetable{ text-align:center; padding:4px; display:table; margin:auto; !important;} </style>").appendTo("head");
	// Emote tab style
	$("<style type='text/css'> #tabs_playlist_emotes{ overflow: scroll; height:384px; padding:8px; !important;} </style>").appendTo("head");
	// Emote images
	$("<style type='text/css'> #emote_icon img{ max-width:100%;} </style>").appendTo("head");
	// Emote names
	$("<style type='text/css'> #emote_name{ font-weight:bold; padding:4px;} </style>").appendTo("head");
	// Emote header
	$("<style type='text/css'> .emotetitle{ font-weight:bold; font-size:16pt; font-family:Tahoma; !important;} </style>").appendTo("head");
	// Individual emote style
	$("<style type='text/css'> #singleemote{ float:left; background-color:white; padding:4px; width:128px; text-align:center; height:128px; margin:4px; border:1px solid gray;} </style>").appendTo("head");

	// Add the actual tab // http://i.imgur.com/yTEP748.png
	$('<li><a title="Emote Menu" data-original-title="Emote Menu" href="#tabs_playlist_emotes" data-toggle="tab"><i class="fa" style="width: 12px;height: 14px;"><img src="http://i.imgur.com/yTEP748.png" class="fa-morty"></i></a></li>').insertBefore('.video-controls .nav-tabs .skip-controls');
	// Emote div
	$("\<div class='tab-pane' id='tabs_playlist_emotes'><span class='emotetitle'>Available RickMotes:</span><br> \
	<div id='emotetable'> \
	</div> \
	</div>").insertAfter("#tabs_playlist_settings");

	var eTabID = document.getElementById('tabs_playlist_emotes');
	
	rickmotes.forEach(function(emote){	
		eTabID.innerHTML += "<div id='singleemote'> \
		<div id='emote_icon'><img src='"+emote.src+"'></img></div> \
		<div id='emote_name'>"+emote.title+"</div> \
		</div> ";
	});
    
    $.get(getLink_coolusers, function(data) {
		
		// Now let's turn the users into an array.
		var userArray = data.split(',');
		for (var m = 0; m < userArray.length; m++) {
			userArray[m] = userArray[m].slice(0, userArray[m].indexOf("`"));
		}
        
        // Set if this account is purple.
        var signedInAs = document.getElementById('logged_in_as');
        var isPurple = userArray.contains(signedInAs.innerHTML.toLowerCase());

        if (isPurple) {
            secret_rickmotes.forEach(function(emote){	
                eTabID.innerHTML += "<div id='singleemote' style='background-color:lime'> \
<div id='emote_icon'><img src='"+emote.src+"'></img></div> \
<div id='emote_name'>"+emote.title+"</div> \
</div> ";
            });
        }
    });
	
	// While we're here, let's add lights for the Unity bonus
	$("<style type='text/css'> #unitylights{ overflow:hidden; width:100%; height:100%; background-color:black; position:absolute; background-image:url('http://i.imgur.com/Bq6aPx8.gif');} </style>").appendTo("head");
	$("<style type='text/css'> #unityface{ overflow:hidden; width:100%; height:100%; background-color:black; position:absolute; background-image:url('http://i.imgur.com/U1MHdux.png'); opacity:0.4;} </style>").appendTo("head");
	
	$('<div id="unitylights"></div>').prependTo('body');
	$('<div id="unityface"></div>').insertAfter('#unitylights');
	
	hideUnity();
	
	// Add The Good Morty
	addGoodMorty();
}

function resetPurples() {purpleNameList.length = 0;}

// Happens when a video changes
function parseVideo() {
	updateVideo();
	
	/*
    // Add event listener on the chat.
    $('#tabs_playlist').bind("DOMSubtreeModified", function() {
		updateVideo();
    });
	*/
	
	setInterval(updateVideo,2000);
}

function hideUnity(){
	var chatList = document.getElementById('chat_messages');
	chatList.style.backgroundColor = "#ffffff";
	$("#unitylights").hide();
	$("#unityface").hide();
}

function showUnity(){
	var chatList = document.getElementById('chat_messages');
    chatList.style.backgroundColor = "#ffddff";
	$("#unitylights").show();
	$("#unityface").show();
}

function updateVideo() {
	var currentVid = $("#playlist li.active .buttons a").attr('href');
	
	if (currentVid == unityURL && unityBonus == 0)
	{
		unityBonus = 1;
		testLog('HELLO UNITY, WELCOME BACK');
		testLog("<span style='color:violet'>HIVEMIND BONUS!</span>");
		
		showUnity();
	}
	else if (currentVid != unityURL && unityBonus == 1)
	{
		unityBonus = 0;
		hideUnity();
		testLog('GOODBYE UNITY');
		testLog("<span style='color:violet'>SEE YOU NEXT TIME</span>");
	}
}