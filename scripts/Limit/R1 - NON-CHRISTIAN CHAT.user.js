// ==UserScript==
// @name         R1 - NON-CHRISTIAN CHAT
// @version      0.1.5
// @description  Allows you to lower your level of family-friendliness in R1 chat (say "!M;" to commit sodoku)
// @author       Limit
// @match        *://*.rewards1.com/*
// @grant        none
// @namespace    https://greasyfork.org/users/141657
// ==/UserScript==

// as of 1/1/2019
const nonChristianWords = ["an4l","an@l","anal","arsehole","assclown","assh0le","asshat","asshole","assholes","asslick","assmonkey","assmunch","asspirate","asswipe","awardgain","awardsgain","awsurveys","b!tch","b1tch","bankrollbucks","basicserve","bastard","basterd","basturd","bearpongmoney","bellend","biatch","biartch","bitch","blowjob","bltch","boner","boong","bukake","bukakke","bukkake","bux.to","buxp","byatch","c0ck","c0nd0m","c0ndom","cash4visits","cashcamel","cashclam","cashcrate","castlerewards","centerofprizes","chazingit","chink","choad","chode","circumcised","circumcized","circumcision","clickorsignup","clicksia","clixsense","cock","codes4free","cootchie","cootchy","coochie","cunt","cupidcash","dealsncash","deepthroat","d0uche","d0uch3","d1ck","d!ck","d1ckhead","d1k","d1ld0","d1ldo","d!ldo","d!ld0","d!ckhead","douch3","dick","dicks","dickhead","dildo","dild0","divinedeals","dumass","dumb@","dumb4","dumba$","dumba5","dumbas$","dumbas5","dumbass","dollarclickorsignup","dollarsignup","douche","douchebag","douchebags","douches","earngpt","earnperref","ejaculate","ejaculation","empiregpt","epicfreeprizes","epicrewardz","erection","f@g","f4g","fag","fagg","fagg0t","faggot","fagot","fakenamegenerator","fastcashgpt","fck","fcuk","feck","fggot","free-steam-games","freebiejeebies","freedsipoints","freeeasyprizes","freehakz","freeitunescodes","freeminecraft","freemspoints2013","freemspointsforever","freepsnforever","freesteamgifts","freeultimategamecards","freewowbank","freexboxcards","fuck","fucker","fuckers","fuckhead","fuckheads","fucken","fuckin","fucking","fucktard","fuk","fusioncash","fvck","gangbang","gay","g00k","g0ok","getcraft","getmeaticket","go0k","go.microsoft","gook","gptbucks","gptcashcow","h0m0","h0rny","h0mo","hom0","highestpaygpt","hits4pay","horny","inboxdollars","instagc","instantrewardz","j!zz","j1zz","jackalsoft","jackass","jackoff","jerkass","jerked","jerkin","jerking","jerkoff","jewboy","jizz","jizzed","joinicon","jointopline","junglebunny","kock","kuder","kunt","lameass","lesbo","lezbo","linkbucks","listia","livehacksource","lockerz","loltrainkraut","luckykoin","lunchmeat","madmoney","mastabate","masterbate","masturbate","mazbux","meatcurtain","meatflap","meatrack","meprizes","merde","minge","mofo","mofocker","mothafucka","mothafucker","motherfucker","motherfuker","monkeydollar","mspointsgiveaway","muffdiver","muthafucka","n!gger","n!gga","n1ggah","n1gger","n1gga","naturebucks","nazi","negro","neobux","nigah","nigga","niggah","niggas","niggaz","nigger","niggers","nigguh","niglet","niguh","nipple","niqa","niqqa","nutsack","p0rn","p2s","paidthefastest","paidviewpoint","panelrewards","paradisegpt","p3nis","p3n1s","p3n!s","pen!s","pen1s","penile","penis","penises","phuck","piggybankgpt","play2shop","plusdollars","pointdollars","pointriotcodes","points2points","point2shop","points2shop","points4shopping","poontang","porn","pr0n","prick","prizenation","prizepickle","prizerebel","probux","prostitute","psncardgenerator","pu55y","pu$$y","pu$5y","pu5$y","pu$sy","pu5sy","punta","puntang","pussy","pussies","pusy","queef","queer","quickrewards","qunt","rectum","redtube","rewardgalaxy","rimjob","rpointsgenerator","rprewards","s3x","sendearnings","sex","sexing","schlong","scrote","scrotum","sh1t","sh!t","shit","shiet","shitter","shittest","shittier","shittiest","shitting","shlong","shlt","shyt","simplerefs","sk@nk","sk4nk","skank","skeet","sl@g","sl4g","slag","slut","slutty","smegma","sp3rm","sperm","spotrewards","squishycash","steam-cards","steampowers","stuffpoint","surveyhunt","swagbucks","spankwire","testicles","tapporo","thelivegenerator","theultimategpt","tits","titties","treasuretrooper","tw@t","tw4t","twat","v@gina","vag!na","vag1na","vagina","vajayjay","vajina","videocoins","virgin","virginal","virgins","vjayjay","w4nk","wank","wanked","wanker","wanks","wanking","webbly","wh0r3","whor3","wh0re","whore","whores","whorez","whorebag","winterrowd","xhamster","youporn","zebradollar","zoombucks"];
// period is equivalent to space in the filter ('bux.to' and 'bux to' both mute)
for (var i = 0; i < nonChristianWords.length; i++) {
    if (nonChristianWords[i].indexOf('.') > -1) {
        nonChristianWords.push(nonChristianWords[i].replace('.', ' '));
    }
}

// soft hyphen
const escapeStr = '­';

function init() {
    clearTimeout(readyTimer);
    spRemoveListener('ready', init);

    //spAlert('(non-christian chat) sp detected!');

    spListen('preMsgSent', e => {
        var msg = e.detail.msg;
        for (var i = 0; i < nonChristianWords.length; i++) {
            var index;
            while (true) {
                index = msg.toLowerCase().indexOf(nonChristianWords[i]);
                if (!~index) break;
                console.log(index);
                msg = msg.substring(0, index + 1) + escapeStr + msg.substring(index + 1);
            }
        }
        e.detail.setMsg(msg.replace('!M;', 'sex'));
    });
}

// ==========================================================================================
// ==========================================================================================
// ==========================================================================================
// SCRIPT ENGINE STUFF

// Getter method, cause why not
function spGet(k) {
    return window.sp[k];
}

// Setter method, cause why not
function spSet(k, v) {
    return (window.sp[k] = v);
}

// Shorter calls to window.sp.alert
function spAlert(msg) {
    return window.sp.alert(msg);
}

// Shorter calls to window.sp.alertHTML
function spAlertHTML(msg) {
    return window.sp.alertHTML(msg);
}

// Wrapper for sp event listeners
function spListen(e, c) {
    window.addEventListener('sp' + e[0].toUpperCase() + e.substr(1), c);
}

// Wrapper to delete sp event listeners
function spRemoveListener(e, c) {
    window.removeEventListener('sp' + e[0].toUpperCase() + e.substr(1), c);
}

// Start a 10 second timer, which should later be cancelled by the init event
// If it doesn't get cancelled, sp hasn't dispatched the ready event for over 10 secs, and so likely isn't present
var readyTimer = setTimeout(() => {
    alert('[NC-CHAT] Script engine doesn\'t seem to be present (or took longer than 10 seconds to initialize). Make sure it\'s installed and contact Limit if you still have problems.');
}, 10000);

// If sp is already ready, run init, else add a listener for the 'spReady' event
(window.sp && window.sp.ready) ? init() : spListen('ready', init);