// ==UserScript==
// @name        HIT Scraper WITH EXPORT Legacy
// @author      Kerek, Tjololo, clickhappier, and feihtality
// @description Snag HITs.
//              Based in part on code from mmmturkeybacon Export Mturk History and mmmturkeybacon Color Coded Search with Checkpoints
// @namespace https://greasyfork.org/users/710
// @match       https://www.mturk.com/mturk/findhits?*hit_scraper
// @version     2.4.9
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @require     http://code.jquery.com/jquery-latest.min.js
// @require     https://greasyfork.org/libraries/jscolor/1.4.2/jscolor.js
// ==/UserScript==

// fixes jscolor directory detection to work with greasyfork hosted library
jscolor.getDir = function() {return 'https://greasyfork.org/libraries/jscolor/1.4.2/'};

//Fixes it so as not to rely on GM's storage schemes
this.GM_getValue=function (key,def) {
    return localStorage[key] || def;
};
this.GM_setValue=function (key,value) {
    return localStorage[key]=value;
};
this.GM_deleteValue=function (key) {
    return localStorage.removeItem(key);
};

var default_list = ["oscar smith", "Diamond Tip Research LLC", "jonathon weber", "jerry torres", "Crowdsource", "we-pay-you-fast", "turk experiment", "jon brelig"];
var ignore_list = default_list;
if (GM_getValue("scraper_ignore_list"))
    ignore_list = GM_getValue("scraper_ignore_list").split('^');
else
    GM_setValue("scraper_ignore_list", default_list.join('^'));

var include_list = [];
if (!GM_getValue("scraper_include_list"))
    GM_setValue("scraper_include_list","nothing includelisted yet");
if (GM_getValue("scraper_include_list"))
    include_list = GM_getValue("scraper_include_list").split('^');

//This is to update the hit export symbol
var symbol = "☭";

//this searches extra pages if you skip too much, helps fill out results if you hit a chunk of ignored HITs.  Change to true for this behavior.
var correct_for_skips = true;

//This will hide masters if selected to "hide"
var hide_masters = false;

//This is to test sorting by TO
var sort_TO = false; // by pay
var sort_TO2 = false; // by overall user-weighted ratings

// this fixes mismatched names due to Turkopticon using an older value after the requester changed it on mturk.
var fix_names = true;

var SPACER_TEXT         = " | "; // spacing for the control panel

//Used for theming
var rcolors = {}; // random
var wcolors = { "highlight"   :'#1F3847',  "background" :'#232A2F',  "accent"      :'#00ffff',   "bodytable" :'#AFCCDE',  "cpBackground"  :'#394752',
               "highTO"       :'#009DFF',  "goodTO"     :'#40B6FF',  "averageTO"   :'#7ACCFF',   "lowTO"     :'#B5E3FF',  "poorTO"        :'#DEF1FC',
               "hitDB"        :'#CADA95',  "nohitDB"    :'#DA95A8',  "unqualified" :'#808080',   "reqmaster" :'#C1E1F6',  "nomaster"      :'#D6C1F6',
               "defaultText"  :'#AFCCDE',  "inputText"  :'#98D6D6',  "secondText"  :'#808080',   "link"      :'#7B8F8F',  "vlink"         :'#40F0F0',
               "noTO"         :'#AFCCDE',  "export"     :'#86939C',  "hover"       :'#1E303B' 
              }; // whisper default
var sdcolors = { "highlight"   :'#657b83',  "background" :'#002b36',  "accent"      :'#b58900',   "bodytable" :'#839496',  "cpBackground"  :'#073642',
                "highTO"       :'#859900',  "goodTO"     :'#A2BA00',  "averageTO"   :'#b58900',   "lowTO"     :'#cb4b16',  "poorTO"        :'#dc322f',
                "hitDB"        :'#82D336',  "nohitDB"    :'#D33682',  "unqualified" :'#9F9F9F',   "reqmaster" :'#B58900',  "nomaster"      :'#839496',
                "defaultText"  :'#839496',  "inputText"  :'#eee8d5',  "secondText"  :'#93a1a1',   "link"      :'#000000',  "vlink"         :'#6c71c4',
                "noTO"         :'#839496',  "export"     :'#CCC6B4',  "hover"       :'#122A30' 
               }; // solarium dark default
var slcolors = { "highlight"   :'#657b83',  "background" :'#fdf6e3',  "accent"      :'#b58900',   "bodytable" :'#657b83',  "cpBackground"  :'#eee8d5',
                "highTO"       :'#859900',  "goodTO"     :'#A2BA00',  "averageTO"   :'#b58900',   "lowTO"     :'#cb4b16',  "poorTO"        :'#dc322f',
                "hitDB"        :'#82D336',  "nohitDB"    :'#36D0D3',  "unqualified" :'#9F9F9F',   "reqmaster" :'#B58900',  "nomaster"      :'#6C71C4',
                "defaultText"  :'#657b83',  "inputText"  :'#6FA3A3',  "secondText"  :'#A6BABA',   "link"      :'#000000',  "vlink"         :'#6c71c4',
                "noTO"         :'#657b83',  "export"     :'#000000',  "hover"       :'#C7D2D6' 
               }; // solarium light default
var clcolors = { "highlight"   :'#30302F',  "background" :'#131313',  "accent"      :'#94704D',   "bodytable" :'#000000',  "cpBackground"  :'#131313',
                "highTO"       :'#66CC66',  "goodTO"     :'#ADFF2F',  "averageTO"   :'#FFD700',   "lowTO"     :'#FF9900',  "poorTO"        :'#FF3030',
                "hitDB"        :'#66CC66',  "nohitDB"    :'#FF3030',  "unqualified" :'#9F9F9F',   "reqmaster" :'#551A8B',  "nomaster"      :'#0066CC',
                "defaultText"  :'#94704D',  "inputText"  :'#000000',  "secondText"  :'#997553',   "link"      :'#0000FF',  "vlink"         :'#800080',
                "noTO"         :'#d3d3d3',  "export"     :'#000000',  "hover"       :'#21211F' 
               }; // classic default
var cucolors = { "highlight"   :'#1F3847',  "background" :'#434e56',  "accent"      :'#fbde2d',   "bodytable" :'#f8f8f8',  "cpBackground"  :'#384147',
                "highTO"       :'#6FFA3C',  "goodTO"     :'#D9FC35',  "averageTO"   :'#fbde2d',   "lowTO"     :'#FAB050',  "poorTO"        :'#FA6F50',
                "hitDB"        :'#d8fa3c',  "nohitDB"    :'#DA95A8',  "unqualified" :'#ADC6EE',   "reqmaster" :'#BFADEE',  "nomaster"      :'#ADEEDF',
                "defaultText"  :'#f8f8f8',  "inputText"  :'#D8FA3C',  "secondText"  :'#ADC6EE',   "link"      :'#BFADEE',  "vlink"         :'#DCEEAD',
                "noTO"         :'#697048',  "export"     :'#ADC6EE',  "hover"       :'#426075'
               }; // custom default

var uwcolors = {}, usdcolors = {}, uslcolors = {}, uclcolors = {}, ucucolors = {};

// Random themes are still in testing stages! It can, on occasion, cause very minor lag on initial page load. 
// NOTE: The issue is on the inital page initialization; it does not affect searching/scraping.
// Comment out the next line to disable randomization.
randomizeScheme();

//display your hitdb records if applicable
var check_hitDB = true;

//default text size
var default_text_size=11;

//set to "true" to override checkbox setting and ding on new hits
var newHitDing = false;

//DO NOT EDIT ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOU ARE DOING!

var maxPages = 20;
var type = -1;
var status_array = [];
var shouldDing = false;
var useTO = true;

var audiofile1 = document.createElement('audio');
document.body.appendChild(audiofile1);
audiofile1.src = 'data:audio/ogg;base64,T2dnUwACAAAAAAAAAAB8mpoRAAAAAFLKt9gBHgF2b3JiaXMAAAAAARErAAAAAAAAkGUAAAAAAACZAU9nZ1MAAAAAAAAAAAAAfJqaEQEAAACHYsq6Cy3///////////+1A3ZvcmJpcx0AAABYaXBoLk9yZyBsaWJWb3JiaXMgSSAyMDA1MDMwNAAAAAABBXZvcmJpcxJCQ1YBAAABAAxSFCElGVNKYwiVUlIpBR1jUFtHHWPUOUYhZBBTiEkZpXtPKpVYSsgRUlgpRR1TTFNJlVKWKUUdYxRTSCFT1jFloXMUS4ZJCSVsTa50FkvomWOWMUYdY85aSp1j1jFFHWNSUkmhcxg6ZiVkFDpGxehifDA6laJCKL7H3lLpLYWKW4q91xpT6y2EGEtpwQhhc+211dxKasUYY4wxxsXiUyiC0JBVAAABAABABAFCQ1YBAAoAAMJQDEVRgNCQVQBABgCAABRFcRTHcRxHkiTLAkJDVgEAQAAAAgAAKI7hKJIjSZJkWZZlWZameZaouaov+64u667t6roOhIasBADIAAAYhiGH3knMkFOQSSYpVcw5CKH1DjnlFGTSUsaYYoxRzpBTDDEFMYbQKYUQ1E45pQwiCENInWTOIEs96OBi5zgQGrIiAIgCAACMQYwhxpBzDEoGIXKOScggRM45KZ2UTEoorbSWSQktldYi55yUTkompbQWUsuklNZCKwUAAAQ4AAAEWAiFhqwIAKIAABCDkFJIKcSUYk4xh5RSjinHkFLMOcWYcowx6CBUzDHIHIRIKcUYc0455iBkDCrmHIQMMgEAAAEOAAABFkKhISsCgDgBAIMkaZqlaaJoaZooeqaoqqIoqqrleabpmaaqeqKpqqaquq6pqq5seZ5peqaoqp4pqqqpqq5rqqrriqpqy6ar2rbpqrbsyrJuu7Ks256qyrapurJuqq5tu7Js664s27rkearqmabreqbpuqrr2rLqurLtmabriqor26bryrLryratyrKua6bpuqKr2q6purLtyq5tu7Ks+6br6rbqyrquyrLu27au+7KtC7vourauyq6uq7Ks67It67Zs20LJ81TVM03X9UzTdVXXtW3VdW1bM03XNV1XlkXVdWXVlXVddWVb90zTdU1XlWXTVWVZlWXddmVXl0XXtW1Vln1ddWVfl23d92VZ133TdXVblWXbV2VZ92Vd94VZt33dU1VbN11X103X1X1b131htm3fF11X11XZ1oVVlnXf1n1lmHWdMLqurqu27OuqLOu+ruvGMOu6MKy6bfyurQvDq+vGseu+rty+j2rbvvDqtjG8um4cu7Abv+37xrGpqm2brqvrpivrumzrvm/runGMrqvrqiz7uurKvm/ruvDrvi8Mo+vquirLurDasq/Lui4Mu64bw2rbwu7aunDMsi4Mt+8rx68LQ9W2heHVdaOr28ZvC8PSN3a+AACAAQcAgAATykChISsCgDgBAAYhCBVjECrGIIQQUgohpFQxBiFjDkrGHJQQSkkhlNIqxiBkjknIHJMQSmiplNBKKKWlUEpLoZTWUmotptRaDKG0FEpprZTSWmopttRSbBVjEDLnpGSOSSiltFZKaSlzTErGoKQOQiqlpNJKSa1lzknJoKPSOUippNJSSam1UEproZTWSkqxpdJKba3FGkppLaTSWkmptdRSba21WiPGIGSMQcmck1JKSamU0lrmnJQOOiqZg5JKKamVklKsmJPSQSglg4xKSaW1kkoroZTWSkqxhVJaa63VmFJLNZSSWkmpxVBKa621GlMrNYVQUgultBZKaa21VmtqLbZQQmuhpBZLKjG1FmNtrcUYSmmtpBJbKanFFluNrbVYU0s1lpJibK3V2EotOdZaa0ot1tJSjK21mFtMucVYaw0ltBZKaa2U0lpKrcXWWq2hlNZKKrGVklpsrdXYWow1lNJiKSm1kEpsrbVYW2w1ppZibLHVWFKLMcZYc0u11ZRai621WEsrNcYYa2415VIAAMCAAwBAgAlloNCQlQBAFAAAYAxjjEFoFHLMOSmNUs45JyVzDkIIKWXOQQghpc45CKW01DkHoZSUQikppRRbKCWl1losAACgwAEAIMAGTYnFAQoNWQkARAEAIMYoxRiExiClGIPQGKMUYxAqpRhzDkKlFGPOQcgYc85BKRljzkEnJYQQQimlhBBCKKWUAgAAChwAAAJs0JRYHKDQkBUBQBQAAGAMYgwxhiB0UjopEYRMSielkRJaCylllkqKJcbMWomtxNhICa2F1jJrJcbSYkatxFhiKgAA7MABAOzAQig0ZCUAkAcAQBijFGPOOWcQYsw5CCE0CDHmHIQQKsaccw5CCBVjzjkHIYTOOecghBBC55xzEEIIoYMQQgillNJBCCGEUkrpIIQQQimldBBCCKGUUgoAACpwAAAIsFFkc4KRoEJDVgIAeQAAgDFKOSclpUYpxiCkFFujFGMQUmqtYgxCSq3FWDEGIaXWYuwgpNRajLV2EFJqLcZaQ0qtxVhrziGl1mKsNdfUWoy15tx7ai3GWnPOuQAA3AUHALADG0U2JxgJKjRkJQCQBwBAIKQUY4w5h5RijDHnnENKMcaYc84pxhhzzjnnFGOMOeecc4wx55xzzjnGmHPOOeecc84556CDkDnnnHPQQeicc845CCF0zjnnHIQQCgAAKnAAAAiwUWRzgpGgQkNWAgDhAACAMZRSSimllFJKqKOUUkoppZRSAiGllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimVUkoppZRSSimllFJKKaUAIN8KBwD/BxtnWEk6KxwNLjRkJQAQDgAAGMMYhIw5JyWlhjEIpXROSkklNYxBKKVzElJKKYPQWmqlpNJSShmElGILIZWUWgqltFZrKam1lFIoKcUaS0qppdYy5ySkklpLrbaYOQelpNZaaq3FEEJKsbXWUmuxdVJSSa211lptLaSUWmstxtZibCWlllprqcXWWkyptRZbSy3G1mJLrcXYYosxxhoLAOBucACASLBxhpWks8LR4EJDVgIAIQEABDJKOeecgxBCCCFSijHnoIMQQgghREox5pyDEEIIIYSMMecghBBCCKGUkDHmHIQQQgghhFI65yCEUEoJpZRSSucchBBCCKWUUkoJIYQQQiillFJKKSGEEEoppZRSSiklhBBCKKWUUkoppYQQQiillFJKKaWUEEIopZRSSimllBJCCKGUUkoppZRSQgillFJKKaWUUkooIYRSSimllFJKCSWUUkoppZRSSikhlFJKKaWUUkoppQAAgAMHAIAAI+gko8oibDThwgMQAAAAAgACTACBAYKCUQgChBEIAAAAAAAIAPgAAEgKgIiIaOYMDhASFBYYGhweICIkAAAAAAAAAAAAAAAABE9nZ1MABAgkAAAAAAAAfJqaEQIAAAB89IOyJjhEQUNNRE5TRENHS0xTRllHSEpISUdORk1GSEdISUNHP0ZHS1IhquPYHv5OAgC/7wFATp2pUBdX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';
audiofile1.setAttribute("id", "ding_noise0");
audiofile1.volume = 1;

var audiofile2 = document.createElement('audio');
document.body.appendChild(audiofile2);
audiofile2.src = 'data:audio/mp3;base64,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VVVVVVVVVVVVVQBqs0jMnBWmgKng1FRU32lmZmb+N6/V+w+MygnAXTBSU3/Ffjw4KGwvhYijgbg038TRQL8U3//xv5cO4FZf/z8bdj8V3CpuILkwNl5P8KE+53G3eCoQUAIQxdpeAGCps5MdqtGpNehUFBQFS2qx1bDEzNSDATAKKlIBjsJGEQBFZnmMUrStzKW+pXKVDOZ+hnQ2jloarUNK2iGVjPlUVcHRF4NCI9e2HcNCJ4NQ0eEQlnbmh0FYaUxBTUUzLjk5LjNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7kkScD/K0GL+QyBnCYEgHsjBlXAAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
audiofile2.setAttribute("id", "ding_noise1");
audiofile2.volume = 1;

function newHits(dingNoise) {
    if (dingNoise || newHitDing)
        document.getElementById("ding_noise"+audio_index).play();
}

//For editing the blocklist
var div1 = document.createElement('div');
var textarea1 = document.createElement('textarea');

div1.style.position = 'fixed';
div1.style.width = '500px';
div1.style.height = '235px';
div1.style.left = '50%';
div1.style.right = '50%';
div1.style.margin = '-250px 0px 0px -250px';
div1.style.top = '300px';
div1.style.padding = '5px';
div1.style.border = '2px';
div1.style.backgroundColor = 'black';
div1.style.color = 'white';
div1.style.zIndex = '100';
div1.setAttribute('id','block_div');

textarea1.style.padding = '2px';
textarea1.style.width = '500px';
textarea1.style.height = '180px';
textarea1.title = 'Block list';
textarea1.setAttribute('id','block_text');

div1.textContent = 'BLOCKLIST - Edit the blocklist with what you want to ignore/hide. Separate requester names and HIT titles with the ^ character. After clicking "Save", you\'ll need to scrape again to apply the changes.';
div1.style.fontSize = '12px';
div1.appendChild(textarea1);

var save_button1 = document.createElement('button');
var cancel_button1 = document.createElement('button');

save_button1.textContent = 'Save';
save_button1.setAttribute('id', 'save_blocklist');
save_button1.style.height = '18px';
save_button1.style.width = '100px';
save_button1.style.fontSize = '10px';
save_button1.style.paddingLeft = '3px';
save_button1.style.paddingRight = '3px';
save_button1.style.backgroundColor = 'white';
save_button1.style.marginLeft = '5px';

cancel_button1.textContent = 'Cancel';
cancel_button1.setAttribute('id', 'cancel_blocklist');
cancel_button1.style.height = '18px';
cancel_button1.style.width = '100px';
cancel_button1.style.fontSize = '10px';
cancel_button1.style.paddingLeft = '3px';
cancel_button1.style.paddingRight = '3px';
cancel_button1.style.backgroundColor = 'white';
cancel_button1.style.marginLeft = '5px';

div1.appendChild(save_button1);
div1.appendChild(cancel_button1);
document.body.insertBefore(div1, document.body.firstChild);
$("#block_div").hide();

// save and cancel for blocklist
function save_blocklist() {
    //console.log("Save");
    var textarea = $("#block_text");
    var text = textarea.val();
    var block_list = text.split("^");
    var trimmed_list = [];
    for (var requester in block_list){
        if (block_list[requester].trim().length !== 0)
            trimmed_list.push(block_list[requester].toLowerCase().trim());
    }
    //console.log(trimmed_list);
    GM_setValue("scraper_ignore_list",trimmed_list.join('^'));
    ignore_list = GM_getValue("scraper_ignore_list").split('^');
    //console.log("Save complete: ");
    //console.log(ignore_list);
    $("#block_div").hide();
}
save_button1.addEventListener("click", function(){ save_blocklist(); }, false);
cancel_button1.addEventListener("click", function(){ 
    // reset textarea contents upon cancel
    ignore_list = GM_getValue("scraper_ignore_list").split('^');
    var textarea = $("#block_text");
    var text = "";
    for (var i = 0; i < ignore_list.length; i++){
        text += ignore_list[i]+"^";
    }
    textarea.val(text.substring(0, text.length - 1));
    // close editor
    $("#block_div").hide(); 
}, false);


//For editing the include list
var shouldInclude = false;
var div2 = document.createElement('div');
var textarea2 = document.createElement('textarea');

div2.style.position = 'fixed';
div2.style.width = '500px';
div2.style.height = '235px';
div2.style.left = '50%';
div2.style.right = '50%';
div2.style.margin = '-250px 0px 0px -250px';
div2.style.top = '300px';
div2.style.padding = '5px';
div2.style.border = '2px';
div2.style.backgroundColor = 'black';
div2.style.color = 'white';
div2.style.zIndex = '100';
div2.setAttribute('id','include_div');

textarea2.style.padding = '2px';
textarea2.style.width = '500px';
textarea2.style.height = '180px';
textarea2.title = 'include list';
textarea2.setAttribute('id','include_text');

div2.textContent = 'INCLUDELIST - Focus the results on your favorite requesters. Separate requester names and HIT titles with the ^ character. When \"Use includelist\" is selected, HIT Scraper only shows results matching the includelist.';
div2.style.fontSize = '12px';
div2.appendChild(textarea2);

var save_button2 = document.createElement('button');
var cancel_button2 = document.createElement('button');

save_button2.textContent = 'Save';
save_button2.setAttribute('id', 'save_includelist');
save_button2.style.height = '18px';
save_button2.style.width = '100px';
save_button2.style.fontSize = '10px';
save_button2.style.paddingLeft = '3px';
save_button2.style.paddingRight = '3px';
save_button2.style.backgroundColor = 'white';
save_button2.style.marginLeft = '5px';

cancel_button2.textContent = 'Cancel';
cancel_button2.setAttribute('id', 'cancel_includelist');
cancel_button2.style.height = '18px';
cancel_button2.style.width = '100px';
cancel_button2.style.fontSize = '10px';
cancel_button2.style.paddingLeft = '3px';
cancel_button2.style.paddingRight = '3px';
cancel_button2.style.backgroundColor = 'white';
cancel_button2.style.marginLeft = '5px';

div2.appendChild(save_button2);
div2.appendChild(cancel_button2);
document.body.insertBefore(div2, document.body.firstChild);
$("#include_div").hide();

// save and cancel for includelist
function save_includelist() {
    //console.log("Save");
    var textarea = $("#include_text");
    var text = textarea.val();
    var includes = text.split("^");
    //console.log(includes);
    var trimmed_list = [];
    for (var requester in includes){
        if (includes[requester].trim().length !== 0)
            trimmed_list.push(includes[requester].toLowerCase().trim());
    }
    GM_setValue("scraper_include_list",trimmed_list.join('^'));
    include_list = GM_getValue("scraper_include_list").split('^');
    //console.log(include_list);
    $("#include_div").hide();
}
save_button2.addEventListener("click", function(){ save_includelist(); }, false);
cancel_button2.addEventListener("click", function(){ 
    // reset textarea contents upon cancel
    include_list = GM_getValue("scraper_include_list").split('^');
    var textarea = $("#include_text");
    var text = "";
    for (var i = 0; i < include_list.length; i++){
        text += include_list[i]+"^";
    }
    textarea.val(text.substring(0, text.length - 1));
    // close editor
    $("#include_div").hide(); 
}, false);

var HITStorage = { db: null },
    DB_NAME = 'HITDB';
window.indexedDB.open(DB_NAME).onsuccess = function() { HITStorage.db = this.result; };
HITStorage.checkTitle = function(title,button) {
    if (!HITStorage.db || !HITStorage.db.objectStoreNames.contains("HIT")) return;
    HITStorage.db.transaction('HIT', 'readonly').objectStore('HIT').index('title').get(title).onsuccess = function(event) {
        scraper_history[button].titledb = event.target.result ? true : false;
        };
    };

HITStorage.checkRequester = function(id,button) {
    if (!HITStorage.db || !HITStorage.db.objectStoreNames.contains("HIT")) return;
    HITStorage.db.transaction('HIT', 'readonly').objectStore('HIT').index('requesterId').get(id).onsuccess = function(event) {
        scraper_history[button].reqdb = event.target.result ? true : false;
    };
};

var PAGES_TO_SCRAPE = 3;
var MINIMUM_HITS = 100;
var SEARCH_REFRESH=0;
var MINIMUM_TO = -1;
var URL_BASE = "/mturk/searchbar?searchWords=&selectedSearchType=hitgroups";
var initial_url = URL_BASE;
var TO_REQ_URL = "http://turkopticon.ucsd.edu/reports?id=";
var found_key_list=[];
var last_clear_time = new Date().getTime();
var searched_once = false;
var useBlocklist = true;
var save_new_results_time = 120;
var save_results_time = 3600;
var default_type = 0;
var block_no_to = false;
var audio_index = 0;
var cur_loc = window.location.href;
var time_input = document.createElement("INPUT");
time_input.value = 0;
var page_input = document.createElement("INPUT");
page_input.value = 3;
var min_input = document.createElement("INPUT");
var new_time_display_input = document.createElement("INPUT");
new_time_display_input.value = 300;
var reward_input = document.createElement("INPUT");
var qual_input = document.createElement("INPUT");
qual_input.type = "checkbox";
var masters_input = document.createElement("INPUT");
masters_input.type = "checkbox";
var masters_hide = document.createElement("INPUT");
masters_hide.type = "checkbox";
var sort_input = document.createElement("SELECT");
var sort_input1 = document.createElement("OPTION");
sort_input1.text = "Latest";
sort_input1.value = "late";
var sort_input2 = document.createElement("OPTION");
sort_input2.text = "Most Available";
sort_input2.value = "most";
var sort_input3 = document.createElement("OPTION");
sort_input3.text = "Reward";
sort_input3.value = "amount";
var sort_input4 = document.createElement("OPTION");
sort_input4.text = "Title";
sort_input4.value = "alpha";
sort_input.appendChild(sort_input1);
sort_input.appendChild(sort_input2);
sort_input.appendChild(sort_input3);
sort_input.appendChild(sort_input4);
var sort_input_invert = document.createElement("INPUT");
sort_input_invert.type = "checkbox";
var sort_to = document.createElement("INPUT");
sort_to.type = "checkbox";
var sort_to2 = document.createElement("INPUT");
sort_to2.type = "checkbox";
var sort_asc = document.createElement("INPUT");
sort_asc.type = "radio";
sort_asc.name = "sortOrder";
var sort_dsc = document.createElement("INPUT");
sort_dsc.type = "radio";
sort_dsc.name = "sortOrder";
var min_to = document.createElement("INPUT");
var no_to_block = document.createElement("INPUT");
no_to_block.type = "checkbox";
var useTO_input = document.createElement("INPUT");
useTO_input.type = "checkbox";
var friesAreDone = document.createElement("INPUT");
friesAreDone.type = "checkbox";
var audio_option = document.createElement("SELECT");
var audio1 = document.createElement("OPTION");
var audio2 = document.createElement("OPTION");
audio1.text = "Ding";
audio1.value = 0;
audio2.text = "Squee";
audio2.value = 1;
audio_option.appendChild(audio1);
audio_option.appendChild(audio2);
var correctForSkips = document.createElement("INPUT");
correctForSkips.type = "checkbox";
var useBlock = document.createElement("INPUT");
useBlock.type = "checkbox";
var matchOnly = document.createElement("INPUT");
matchOnly.type = "checkbox";
var highlightIncludes_input = document.createElement("INPUT");
highlightIncludes_input.type = "checkbox";
var opt_exportvb = document.createElement("INPUT");
opt_exportvb.type = "checkbox";
var opt_exportirc = document.createElement("INPUT");
opt_exportirc.type = "checkbox";
var opt_exportreddit = document.createElement("INPUT");
opt_exportreddit.type = "checkbox";
var sufTheme = "_thClassic";
var show_checkboxes = document.createElement("INPUT");
show_checkboxes.type = "checkbox";
var search_input = document.createElement("INPUT");

var saveState = {};
saveState.init = function() {
    if (localStorage["lastState_hit_scraper_with_export"]) 
        this.lastState = JSON.parse(localStorage["lastState_hit_scraper_with_export"]);
    else
        //this.lastState = this.lazyLoad();
        this.lastState = {};

    time_input.value = this.lastState.refreshTime || 0;
    page_input.value = this.lastState.numPages || 3;
    min_input.value = this.lastState.minHits || "";
    new_time_display_input.value = this.lastState.newHitHighlight || 300;
    reward_input.value = this.lastState.reward || "";
    qual_input.checked = this.lastState.qualified || ((this.lastState.qualified === false) ? false : true);
    masters_input.checked = this.lastState.masters || false;
    masters_hide.checked = this.lastState.mShow || false;
    sort_input.selectedIndex = this.lastState.sort || 0;
    sort_input_invert.checked = this.lastState.invert || false;
    sort_to.checked = this.lastState.to || false;
    sort_to2.checked = this.lastState.to2 || false;
    sort_asc.checked = this.lastState.asc || false;
    sort_dsc.checked = this.lastState.dsc || ((this.lastState.dsc === false) ? false : true);
    min_to.value = this.lastState.minTO || "";
    no_to_block.checked = this.lastState.hideNTO || false;
    search_input.value = this.lastState.searchTerms || "";
    matchOnly.checked = this.lastState.useInclude || false;
    friesAreDone.checked = this.lastState.fries || false;
    audio_option.selectedIndex = this.lastState.whichfry || 0;
    useBlock.checked = this.lastState.blocklist || ((this.lastState.blocklist === false) ? false : true);
    correctForSkips.checked = this.lastState.skips || ((this.lastState.skips === false) ? false : true);
    useTO_input.checked = this.lastState.useTO || false;
    highlightIncludes_input.checked = this.lastState.highlightIncl || ((this.lastState.highlightIncl === false) ? false : true);
    opt_exportvb.checked = this.lastState.exvb || ((this.lastState.exvb === false) ? false : true);
    opt_exportirc.checked = this.lastState.exirc || ((this.lastState.exirc === false) ? false : true);
    opt_exportreddit.checked = this.lastState.exreddit || ((this.lastState.exreddit === false) ? false : true);
    sufTheme = this.lastState.theme || "_thClassic";
    show_checkboxes.checked = this.lastState.checkboxes || ((this.lastState.checkboxes === false) ? false : true);
    var k = ['customwisp','customsd','customsl','customclassic','customcustom'];  
    for (k in this.lastState) {
        for (var j in this.lastState[k]) {
            if (this.lastState[k].hasOwnProperty(j)) {
                switch(k) {
                    case "customwisp":    uwcolors[j] = this.lastState[k][j]; break;
                    case "customsd":      usdcolors[j] = this.lastState[k][j]; break;
                    case "customsl":      uslcolors[j] = this.lastState[k][j]; break;
                    case "customclassic": uclcolors[j] = this.lastState[k][j]; break;
                    case "customcustom":  ucucolors[j] = this.lastState[k][j]; break;
                }
            }
        }
    }
    if (Object.keys(uwcolors).length == 0)
        for (var key in wcolors) { if (wcolors.hasOwnProperty(key) && uwcolors[key] === undefined) uwcolors[key] = wcolors[key]; }
    if (Object.keys(uslcolors).length == 0)
        for (var key in slcolors) { if (slcolors.hasOwnProperty(key) && uslcolors[key] === undefined) uslcolors[key] = slcolors[key]; }
    if (Object.keys(usdcolors).length == 0)
        for (var key in sdcolors) { if (sdcolors.hasOwnProperty(key) && usdcolors[key] === undefined) usdcolors[key] = sdcolors[key]; }
    if (Object.keys(ucucolors).length == 0)
        for (var key in cucolors) { if (cucolors.hasOwnProperty(key) && ucucolors[key] === undefined) ucucolors[key] = cucolors[key]; }
    if (Object.keys(uclcolors).length == 0)
        for (var key in clcolors) { if (clcolors.hasOwnProperty(key) && uclcolors[key] === undefined) uclcolors[key] = clcolors[key]; } 
    //console.dir(this.lastState);
}
saveState.setItem = function(key,value) {
    this.lastState[key] = value;
};
saveState.getItem = function(key) {
    return this.lastState[key];
};
saveState.removeItem = function(key) {
    delete this.lastState[key];
};
saveState.save = function() {
    localStorage["lastState_hit_scraper_with_export"] = JSON.stringify(this.lastState);
}
saveState.init();


var LINK_BASE = "https://www.mturk.com";
var STATUSDETAIL_DELAY = 250;
var MPRE_DELAY = 3000;

var css = "<style type = 'text/css'>\n";
css += ".body_thCustom {background-color: "+ucucolors.background+";}\n";
css += ".controlpanel_thCustom {color: "+ucucolors.defaultText+"; margin: 0px auto 5px auto; padding: 8px 5px 1px; background: "+ucucolors.cpBackground+";}\n";
css += ".cpInput_thCustom {color: "+ucucolors.inputText+"; border: 1px solid; background: "+ucucolors.background+"; text-align: center;}\n";
css += ".cpButtons_thCustom {color: "+ucucolors.accent+"; border: 1px solid; background: transparent;}\n";
css += ".cpSortdiv_thCustom {color: "+ucucolors.inputText+"; display: inline; font: 14px;}\n";
css += ".cpSpans_thCustom {padding: 2px; cursor:default; color: "+ucucolors.defaultText+"; background: "+ucucolors.cpBackground+";} .cpSpans_thCustom:hover {background: "+ucucolors.hover+";}\n";
css += ".cpSpansOn_thCustom {background: "+ucucolors.highlight+"; color: "+ucucolors.secondText+";}\n";
css += ".taButtons_thCustom {height: 14px; font-size: 8px; border: 1px solid; padding: 0px; background: transparent; color: "+ucucolors.export+";} .taButtonsOff_thCustom {display: none;}\n";
css += ".link_thCustom:link {color: "+ucucolors.link+";} .link_thCustom:visited {color: "+ucucolors.vlink+";}\n";
css += ".toNone_thCustom .link_thCustom, .toNone_thCustom .tolink_thCustom {color: "+ucucolors.noTO+";}\n .toNone_thCustom .link_thCustom:visited {color: "+ucucolors.vlink+";}\n";
css += ".toHigh_thCustom .link_thCustom, .toHigh_thCustom .tolink_thCustom {color: "+ucucolors.highTO+";}\n .toHigh_thCustom .link_thCustom:visited {color: "+ucucolors.vlink+";}\n";
css += ".toGood_thCustom .link_thCustom, .toGood_thCustom .tolink_thCustom {color: "+ucucolors.goodTO+";}\n .toGood_thCustom .link_thCustom:visited {color: "+ucucolors.vlink+";}\n";
css += ".toAverage_thCustom .link_thCustom, .toAverage_thCustom .tolink_thCustom  {color: "+ucucolors.averageTO+";}\n .toAverage_thCustom .link_thCustom:visited {color: "+ucucolors.vlink+";}\n";
css += ".toLow_thCustom .link_thCustom, .toLow_thCustom .tolink_thCustom  {color: "+ucucolors.lowTO+";}\n .toLow_thCustom .link_thCustom:visited {color: "+ucucolors.vlink+";}\n";
css += ".toPoor_thCustom .link_thCustom, .toPoor_thCustom .tolink_thCustom  {color: "+ucucolors.poorTO+";}\n .toPoor_thCustom .link_thCustom:visited {color: "+ucucolors.vlink+";}\n";
css += ".nohitDB_thCustom {color: #000000; background: "+ucucolors.nohitDB+";}\n";
css += ".tooweak_thCustom {color: #000000; background: "+ucucolors.unqualified+";}\n";
css += ".yeshitDB_thCustom {color:#000000; background: "+ucucolors.hitDB+";}\n";
css += ".needmaster_thCustom {color: #000000; background: "+ucucolors.reqmaster+";}\n";
css += ".nomaster_thCustom {color: #000000; background: "+ucucolors.nomaster+";}\n";
css += ".spacer_thCustom {color: "+ucucolors.accent+";}\n";
css += ".mainlink_thCustom {color: "+ucucolors.defaultText+"; text-align: top;}\n";
css += ".tabhead_thCustom {color: "+ucucolors.defaultText+";}\n";
css += ".bodytable_thCustom {color: "+ucucolors.bodytable+";}\n";
css += ".statusdiv_thCustom {font-size: 15px; color: "+ucucolors.secondText+";}\n";
css += ".body_thRandom {background-color: "+rcolors.background+";}\n";
css += ".controlpanel_thRandom {color: "+rcolors.defaultText+"; margin: 0px auto 5px auto; padding: 8px 5px 1px; background: "+rcolors.cpBackground+";}\n";
css += ".cpInput_thRandom {color: "+rcolors.inputText+"; border: 1px solid; background: "+rcolors.background+"; text-align: center;}\n";
css += ".cpButtons_thRandom {color: "+rcolors.accent+"; border: 1px solid; background: transparent;}\n";
css += ".cpSortdiv_thRandom {color: "+rcolors.inputText+"; display: inline; font: 14px;}\n";
css += ".cpSpans_thRandom {padding: 2px; cursor:default; color: "+rcolors.defaultText+"; background: "+rcolors.cpBackground+";} .cpSpans_thRandom:hover {background: "+rcolors.hover+";}\n";
css += ".cpSpansOn_thRandom {background: "+rcolors.highlight+"; color: "+rcolors.secondText+";}\n";
css += ".taButtons_thRandom {height: 14px; font-size: 8px; border: 1px solid; padding: 0px; background: transparent; color: "+rcolors.export+";} .taButtonsOff_thRandom {display: none;}\n";
css += ".link_thRandom:link {color: "+rcolors.link+";} .link_thRandom:visited {color: "+rcolors.vlink+";}\n";
css += ".toNone_thRandom .link_thRandom, .toNone_thRandom .tolink_thRandom {color: "+rcolors.noTO+";}\n .toNone_thRandom .link_thRandom:visited {color: "+rcolors.vlink+";}\n";
css += ".toHigh_thRandom .link_thRandom, .toHigh_thRandom .tolink_thRandom {color: "+rcolors.highTO+";}\n .toHigh_thRandom .link_thRandom:visited {color: "+rcolors.vlink+";}\n";
css += ".toGood_thRandom .link_thRandom, .toGood_thRandom .tolink_thRandom {color: "+rcolors.goodTO+";}\n .toGood_thRandom .link_thRandom:visited {color: "+rcolors.vlink+";}\n";
css += ".toAverage_thRandom .link_thRandom, .toAverage_thRandom .tolink_thRandom  {color: "+rcolors.averageTO+";}\n .toAverage_thRandom .link_thRandom:visited {color: "+rcolors.vlink+";}\n";
css += ".toLow_thRandom .link_thRandom, .toLow_thRandom .tolink_thRandom  {color: "+rcolors.lowTO+";}\n .toLow_thRandom .link_thRandom:visited {color: "+rcolors.vlink+";}\n";
css += ".toPoor_thRandom .link_thRandom, .toPoor_thRandom .tolink_thRandom  {color: "+rcolors.poorTO+";}\n .toPoor_thRandom .link_thRandom:visited {color: "+rcolors.vlink+";}\n";
css += ".nohitDB_thRandom {color: #000000; background: "+rcolors.nohitDB+";}\n";
css += ".tooweak_thRandom {color: #000000; background: "+rcolors.unqualified+";}\n";
css += ".yeshitDB_thRandom {color:#000000; background: "+rcolors.hitDB+";}\n";
css += ".needmaster_thRandom {color: #000000; background: "+rcolors.reqmaster+";}\n";
css += ".nomaster_thRandom {color: #000000; background: "+rcolors.nomaster+";}\n";
css += ".spacer_thRandom {color: "+rcolors.accent+";}\n";
css += ".mainlink_thRandom {color: "+rcolors.defaultText+"; text-align: top;}\n";
css += ".tabhead_thRandom {color: "+rcolors.defaultText+";}\n";
css += ".bodytable_thRandom {color: "+rcolors.bodytable+";}\n";
css += ".statusdiv_thRandom {font-size: 15px; color: "+rcolors.secondText+";}\n";
// -- Dark and Light themes adapted from the Solarized color scheme developed by Ethan Schoonover -- //
css += ".body_thSLight {background-color: "+uslcolors.background+";}\n";
css += ".controlpanel_thSLight {color: "+uslcolors.defaultText+"; margin: 0px auto 5px auto; padding: 8px 5px 1px; background: "+uslcolors.cpBackground+";}\n";
css += ".cpInput_thSLight {color: "+uslcolors.inputText+"; border: 1px solid; background: "+uslcolors.background+"; text-align: center;}\n";
css += ".cpButtons_thSLight {color: "+uslcolors.accent+"; border: 1px solid; background: transparent;}\n";
css += ".cpSortdiv_thSLight {color: "+uslcolors.inputText+"; display: inline; font: 14px;}\n";
css += ".cpSpans_thSLight {padding: 2px; cursor:default; color: "+uslcolors.defaultText+"; background: "+uslcolors.cpBackground+";} .cpSpans_thSLight:hover {background: "+uslcolors.hover+";}\n";
css += ".cpSpansOn_thSLight {background: "+uslcolors.highlight+"; color: "+uslcolors.secondText+";}\n";
css += ".taButtons_thSLight {height: 14px; font-size: 8px; border: 1px solid; padding: 0px; background: transparent; color: "+uslcolors.export+";} .taButtonsOff_thSLight {display: none;}\n";
css += ".link_thSLight:link {color: "+uslcolors.link+";} .link_thSLight:visited {color: "+uslcolors.vlink+";}\n";
css += ".toNone_thSLight .link_thSLight, .toNone_thSLight .tolink_thSLight {color: "+uslcolors.noTO+";}\n .toNone_thSLight .link_thSLight:visited {color: "+uslcolors.vlink+";}\n";
css += ".toHigh_thSLight .link_thSLight, .toHigh_thSLight .tolink_thSLight {color: "+uslcolors.highTO+";}\n .toHigh_thSLight .link_thSLight:visited {color: "+uslcolors.vlink+";}\n";
css += ".toGood_thSLight .link_thSLight, .toGood_thSLight .tolink_thSLight {color: "+uslcolors.goodTO+";}\n .toGood_thSLight .link_thSLight:visited {color: "+uslcolors.vlink+";}\n";
css += ".toAverage_thSLight .link_thSLight, .toAverage_thSLight .tolink_thSLight  {color: "+uslcolors.averageTO+";}\n .toAverage_thSLight .link_thSLight:visited {color: "+uslcolors.vlink+";}\n";
css += ".toLow_thSLight .link_thSLight, .toLow_thSLight .tolink_thSLight  {color: "+uslcolors.lowTO+";}\n .toLow_thSLight .link_thSLight:visited {color: "+uslcolors.vlink+";}\n";
css += ".toPoor_thSLight .link_thSLight, .toPoor_thSLight .tolink_thSLight  {color: "+uslcolors.poorTO+";}\n .toPoor_thSLight .link_thSLight:visited {color: "+uslcolors.vlink+";}\n";
css += ".nohitDB_thSLight {color: #000000; background: "+uslcolors.nohitDB+";}\n";
css += ".tooweak_thSLight {color: #000000; background: "+uslcolors.unqualified+";}\n";
css += ".yeshitDB_thSLight {color:#000000; background: "+uslcolors.hitDB+";}\n";
css += ".needmaster_thSLight {color: #000000; background: "+uslcolors.reqmaster+";}\n";
css += ".nomaster_thSLight {color: #000000; background: "+uslcolors.nomaster+";}\n";
css += ".spacer_thSLight {color: "+uslcolors.accent+";}\n";
css += ".mainlink_thSLight {color: "+uslcolors.defaultText+"; text-align: top;}\n";
css += ".tabhead_thSLight {color: "+uslcolors.defaultText+";}\n";
css += ".bodytable_thSLight {color: "+uslcolors.bodytable+";}\n";
css += ".statusdiv_thSLight {font-size: 15px; color: "+uslcolors.secondText+";}\n";
//css += ".tablerow_thSLight {color: "+colors.defaultText+";}\n";
css += ".body_thSDark {background-color: "+usdcolors.background+";}\n";
css += ".controlpanel_thSDark {color: "+usdcolors.defaultText+"; margin: 0px auto 5px auto; padding: 8px 5px 1px; background: "+usdcolors.cpBackground+";}\n";
css += ".cpInput_thSDark {color: "+usdcolors.inputText+"; border: 1px solid; background: "+usdcolors.background+"; text-align: center;}\n";
css += ".cpButtons_thSDark {color: "+usdcolors.accent+"; border: 1px solid; background: transparent;}\n";
css += ".cpSortdiv_thSDark {color: "+usdcolors.inputText+"; display: inline; font: 14px;}\n";
css += ".cpSpans_thSDark {padding: 2px; cursor:default; color: "+usdcolors.defaultText+"; background: "+usdcolors.cpBackground+";} .cpSpans_thSDark:hover {background: "+usdcolors.hover+";}\n";
css += ".cpSpansOn_thSDark {background: "+usdcolors.highlight+"; color: "+usdcolors.secondText+";}\n";
css += ".taButtons_thSDark {height: 14px; font-size: 8px; border: 1px solid; padding: 0px; background: transparent; color: "+usdcolors.export+";} .taButtonsOff_thSDark {display: none;}\n";
css += ".link_thSDark:link {color: "+usdcolors.link+";} .link_thSDark:visited {color: "+usdcolors.vlink+";}\n";
css += ".toNone_thSDark .link_thSDark, .toNone_thSDark .tolink_thSDark {color: "+usdcolors.noTO+";}\n .toNone_thSDark .link_thSDark:visited {color: "+usdcolors.vlink+";}\n";
css += ".toHigh_thSDark .link_thSDark, .toHigh_thSDark .tolink_thSDark {color: "+usdcolors.highTO+";}\n .toHigh_thSDark .link_thSDark:visited {color: "+usdcolors.vlink+";}\n";
css += ".toGood_thSDark .link_thSDark, .toGood_thSDark .tolink_thSDark {color: "+usdcolors.goodTO+";}\n .toGood_thSDark .link_thSDark:visited {color: "+usdcolors.vlink+";}\n";
css += ".toAverage_thSDark .link_thSDark, .toAverage_thSDark .tolink_thSDark  {color: "+usdcolors.averageTO+";}\n .toAverage_thSDark .link_thSDark:visited {color: "+usdcolors.vlink+";}\n";
css += ".toLow_thSDark .link_thSDark, .toLow_thSDark .tolink_thSDark  {color: "+usdcolors.lowTO+";}\n .toLow_thSDark .link_thSDark:visited {color: "+usdcolors.vlink+";}\n";
css += ".toPoor_thSDark .link_thSDark, .toPoor_thSDark .tolink_thSDark  {color: "+usdcolors.poorTO+";}\n .toPoor_thSDark .link_thSDark:visited {color: "+usdcolors.vlink+";}\n";
css += ".nohitDB_thSDark {color: #000000; background: "+usdcolors.nohitDB+";}\n";
css += ".tooweak_thSDark {color: #000000; background: "+usdcolors.unqualified+";}\n";
css += ".yeshitDB_thSDark {color:#000000; background: "+usdcolors.hitDB+";}\n";
css += ".needmaster_thSDark {color: #000000; background: "+usdcolors.reqmaster+";}\n";
css += ".nomaster_thSDark {color: #000000; background: "+usdcolors.nomaster+";}\n";
css += ".spacer_thSDark {color: "+usdcolors.accent+";}\n";
css += ".mainlink_thSDark {color: "+usdcolors.defaultText+"; text-align: top;}\n";
css += ".tabhead_thSDark {color: "+usdcolors.defaultText+";}\n";
css += ".bodytable_thSDark {color: "+usdcolors.bodytable+";}\n";
css += ".statusdiv_thSDark {font-size: 15px; color: "+usdcolors.secondText+";}\n";
css += ".body_thWisp {background-color: "+uwcolors.background+";}\n";
css += ".controlpanel_thWisp {color: "+uwcolors.defaultText+"; margin: 0px auto 5px auto; padding: 8px 5px 1px; background: "+uwcolors.cpBackground+";}\n";
css += ".cpInput_thWisp {color: "+uwcolors.inputText+"; border: 1px solid; background: "+uwcolors.background+"; text-align: center;}\n";
css += ".cpButtons_thWisp {color: "+uwcolors.accent+"; border: 1px solid; background: transparent;}\n";
css += ".cpSortdiv_thWisp {color: "+uwcolors.inputText+"; display: inline; font: 14px;}\n";
css += ".cpSpans_thWisp {padding: 2px; cursor:default; color: "+uwcolors.defaultText+"; background: "+uwcolors.cpBackground+";} .cpSpans_thWisp:hover {background: "+uwcolors.hover+";}\n";
css += ".cpSpansOn_thWisp {background: "+uwcolors.highlight+"; color: "+uwcolors.secondText+";}\n";
css += ".taButtons_thWisp {height: 14px; font-size: 8px; border: 1px solid; padding: 0px; background: transparent; color: "+uwcolors.export+";} .taButtonsOff_thWisp {display: none;}\n";
css += ".link_thWisp:link {color: "+uwcolors.link+";} .link_thWisp:visited {color: "+uwcolors.vlink+";}\n";
css += ".toNone_thWisp .link_thWisp, .toNone_thWisp .tolink_thWisp {color: "+uwcolors.noTO+";}\n .toNone_thWisp .link_thWisp:visited {color: "+uwcolors.vlink+";}\n";
css += ".toHigh_thWisp .link_thWisp, .toHigh_thWisp .tolink_thWisp {color: "+uwcolors.highTO+";}\n .toHigh_thWisp .link_thWisp:visited {color: "+uwcolors.vlink+";}\n";
css += ".toGood_thWisp .link_thWisp, .toGood_thWisp .tolink_thWisp {color: "+uwcolors.goodTO+";}\n .toGood_thWisp .link_thWisp:visited {color: "+uwcolors.vlink+";}\n";
css += ".toAverage_thWisp .link_thWisp, .toAverage_thWisp .tolink_thWisp  {color: "+uwcolors.averageTO+";}\n .toAverage_thWisp .link_thWisp:visited {color: "+uwcolors.vlink+";}\n";
css += ".toLow_thWisp .link_thWisp, .toLow_thWisp .tolink_thWisp  {color: "+uwcolors.lowTO+";}\n .toLow_thWisp .link_thWisp:visited {color: "+uwcolors.vlink+";}\n";
css += ".toPoor_thWisp .link_thWisp, .toPoor_thWisp .tolink_thWisp  {color: "+uwcolors.poorTO+";}\n .toPoor_thWisp .link_thWisp:visited {color: "+uwcolors.vlink+";}\n";
css += ".nohitDB_thWisp {color: #000000; background: "+uwcolors.nohitDB+";}\n";
css += ".tooweak_thWisp {color: #000000; background: "+uwcolors.unqualified+";}\n";
css += ".yeshitDB_thWisp {color:#000000; background: "+uwcolors.hitDB+";}\n";
css += ".needmaster_thWisp {color: #000000; background: "+uwcolors.reqmaster+";}\n";
css += ".nomaster_thWisp {color: #000000; background: "+uwcolors.nomaster+";}\n";
css += ".spacer_thWisp {color: "+uwcolors.accent+";}\n";
css += ".mainlink_thWisp {color: "+uwcolors.defaultText+"; text-align: top;}\n";
css += ".tabhead_thWisp {color: "+uwcolors.defaultText+";}\n";
css += ".bodytable_thWisp {color: "+uwcolors.bodytable+";}\n";
css += ".statusdiv_thWisp {font-size: 15px; color: "+uwcolors.secondText+";}\n";
css += ".body_thClassic {background-color: "+uclcolors.background+";}\n";
css += ".controlpanel_thClassic {color: "+uclcolors.defaultText+"; margin: 0px auto 5px auto; padding: 8px 5px 1px; background: "+uclcolors.cpBackground+";}\n";
css += ".cpInput_thClassic {color: "+uclcolors.inputText+"; border: 1px solid; text-align: center;}\n";
css += ".cpButtons_thClassic {border: 2px outset buttonface;}\n";
css += ".cpSortdiv_thClassic {color: "+uclcolors.inputText+"; display: inline; font: 14px;}\n";
css += ".cpSpans_thClassic {padding: 2px; cursor:default; color: "+uclcolors.defaultText+"; background: "+uclcolors.cpBackground+";} .cpSpans_thClassic:hover {background: "+uclcolors.hover+";}\n";
css += ".cpSpansOn_thClassic {background: "+uclcolors.highlight+"; color: "+uclcolors.secondText+";}\n";
css += ".taButtons_thClassic {height: 14px; font-size: 8px; border: 1px solid; padding: 0px; background: transparent; color: "+uclcolors.export+";} .taButtonsOff_thClassic {display: none;}\n";
css += ".link_thClassic:link {color: "+uclcolors.link+";} .link_thClassic:visited {color: "+uclcolors.vlink+";}\n";
css += ".toNone_thClassic {background: "+uclcolors.noTO+";}\n";
css += ".toHigh_thClassic {background: "+uclcolors.highTO+";}\n";
css += ".toGood_thClassic {background: "+uclcolors.goodTO+";}\n";
css += ".toAverage_thClassic {background: "+uclcolors.averageTO+";}\n";
css += ".toLow_thClassic {background: "+uclcolors.lowTO+";}\n";
css += ".toPoor_thClassic {background: "+uclcolors.poorTO+";}\n";
css += ".nohitDB_thClassic {color: #000000; background: "+uclcolors.nohitDB+";}\n";
css += ".tooweak_thClassic {color: #000000; background: "+uclcolors.unqualified+";}\n";
css += ".yeshitDB_thClassic {color:#000000; background: "+uclcolors.hitDB+";}\n";
css += ".needmaster_thClassic {color: #000000; background: "+uclcolors.reqmaster+";}\n";
css += ".nomaster_thClassic {color: #000000; background: "+uclcolors.nomaster+";}\n";
css += ".spacer_thClassic {color: "+uclcolors.accent+";}\n";
css += ".mainlink_thClassic {color: "+uclcolors.defaultText+"; text-align: top;}\n";
css += ".tabhead_thClassic {color: "+uclcolors.defaultText+";}\n";
css += ".bodytable_thClassic {color: "+uclcolors.bodytable+";}\n";
css += ".statusdiv_thClassic {font-size: 15px; color: "+uclcolors.secondText+";}\n";
css += ".edspan_thCustom {padding: 0px; font-size: 12px; display: block; width: 370px; color: "+ucucolors.defaultText+";}\n";
css += ".edspan_thRandom {padding: 0px; font-size: 12px; display: block; width: 370px; color: "+rcolors.defaultText+";}\n";
css += ".edspan_thWisp {padding: 0px; font-size: 12px; display: block; width: 370px; color: "+uwcolors.defaultText+";}\n";
css += ".edspan_thClassic {padding: 0px; font-size: 12px; display: block; width: 370px; color: "+uclcolors.defaultText+";}\n";
css += ".edspan_thSDark {padding: 0px; font-size: 12px; display: block; width: 370px; color: "+usdcolors.defaultText+";}\n";
css += ".edspan_thSLight {padding: 0px; font-size: 12px; display: block; width: 370px; color: "+uslcolors.defaultText+";}\n";

// ******************* below is universal and applies to all themes ********************************
css += ".scraperBlockedRowOff td { border: 3pt solid #cc0000; }\n .scraperBlockedRow {display: none; }\n";
css += ".scraperIncludelistedRow td { border: 3pt dashed #008800; }\n .scraperIncludelistedRowOff td { border: none; }\n";
css += ".toBlockedRow {display:none;} .toBlockedRowOff td {border: 2px solid #00E5FF;}\n";
css += "#thMenu {z-index: 2; position: absolute; top: 0.5%; right: 0.5%; text-align: center; display: inline; margin: 0; padding: 10px 5px; list-style: none;}\n";
css += "#thMenu li {font: 15px; display: inline-block; position: relative; padding: 5px 5px; background: #E3E8E8; color: #000000; cursor: default}\n";
css += "#thMenu li:hover {background: #616363; color: #ffffff;}\n";
css += "#thMenu li ul {position: absolute; top: 24px; right: 0; width: 120px; padding: 0; display: none;}\n";
css += "#thMenu li ul li {background: #616363; color: #ffffff; display: block; padding: 10px 10px;} #thMenu li ul li:hover {background: #8C8C8C;}\n";
css += "#thMenu li:hover ul {display: block;}\n";
css += ".checkboxesOff {display: none;}\n";
css += ".settingsCloseSpan {font-weight: bold; font-size: 1.2em; margin-top: 1.33em; margin-bottom: 1.33em; color: white; background: black; cursor: default; position: relative;}\n";
css += ".settingsPanelMainDiv {z-index: 105; position: fixed; background: white; box-shadow: -3px 3px 2px 2px #7B8C89; line-height: initial;}\n";
css += ".settingsPanelMainDiv:focus {outline:0;}\n";
css += ".settingsInnerDiv {left: 5px; top: 20px; padding: 2px; position: relative; border: 1px solid grey; float:left; line-height: initial;}\n";
css += ".settingsSidebarMainDiv {width: 100px; min-width: 90px;}\n";
css += ".settingsMainContainer {left: 10px; border: transparent; line-height: initial; overflow:auto;}\n";
css += ".settingsSidebarSpans {float: left; margin-bottom: 5px; width: 100px; font-size: 1.05em; cursor: pointer;} .settingsSidebarSpans-selected {background: aquamarine;}\n";
css += ".settingsDivInput {float: left; border: 1px solid black; display: inline; width: 25px; text-align: center; background: white; line-height: initial;}\n";
css += ".settingsDivInput-large {display: block;}\n";
css += ".settingsOptionContainers {margin-bottom: 15px; position: relative; background: #CCFFFA; margin-left: 5px; overflow: auto; padding-right: 10px; padding-bottom: 6px;}\n";
css += ".settingsOptionSections {margin-left: 100px;}\n";
css += ".settingsLabelSA {float: left; width: 51px;}\n";
css += ".settingsLabelBlocklist {float: left; width: 95px; margin-left: 15px;}\n";
css += ".ble {border: 1px solid black; border-collapse: collapse;} .blec {padding: 5px; text-align: left;}\n";
css += "</style>";
var header = document.getElementsByTagName("head");
header[0].innerHTML = header[0].innerHTML + css;

var next_page = 1;

var API_PROXY_BASE = 'https://mturk-api.istrack.in/';
var OFFICIAL_API_PROXY_BASE = 'https://turkopticon.ucsd.edu/';
var API_MULTI_ATTRS_URL = API_PROXY_BASE + 'multi-attrs.php?ids=';
var OFFICIAL_API_MULTI_ATTRS_URL = OFFICIAL_API_PROXY_BASE + 'api/multi-attrs.php?ids=';
var REVIEWS_BASE = 'http://turkopticon.ucsd.edu/';


document.body.className = "body"+sufTheme;

// --- theme buttons
var btn01 = document.createElement("BUTTON"); // edit
var btn02 = document.createElement("BUTTON"); // reset
var thin = [ document.createElement("INPUT"), document.createElement("INPUT"), document.createElement("INPUT"), document.createElement("INPUT"), document.createElement("INPUT"), 
            document.createElement("INPUT"), document.createElement("INPUT"), document.createElement("INPUT"), document.createElement("INPUT"), document.createElement("INPUT"), 
            document.createElement("INPUT"), document.createElement("INPUT"), document.createElement("INPUT"), document.createElement("INPUT"), document.createElement("INPUT"), 
            document.createElement("INPUT"), document.createElement("INPUT"), document.createElement("INPUT"), document.createElement("INPUT"), document.createElement("INPUT"), 
            document.createElement("INPUT"), document.createElement("INPUT"), document.createElement("INPUT") ];
btn01.className = "cpButtons"+sufTheme;
btn02.className = "cpButtons"+sufTheme;
btn01.textContent = "Edit Current Theme";
btn02.textContent = "Reset To Default Values";
btn02.title = "Reset the values of the current theme to its default.";
btn01.onclick = function() {
    if (btn01.textContent === "Edit Current Theme") {
        eddiv.style.display = 'initial';
        theme_editor();
        btn01.textContent = "Hide Editor";
    }
    else {
        eddiv.style.display = 'none';
        btn01.textContent = "Edit Current Theme";
    }
};
btn02.onclick = function() { 
    var cc = {}, dc = {}, kc = "";
    if (sufTheme === "_thWisp") { cc = uwcolors; dc = wcolors; kc = "customwisp"; }
    else if (sufTheme === "_thSDark") { cc = usdcolors; dc = sdcolors; kc = "customsd"; }
    else if (sufTheme === "_thSLight") { cc = uslcolors; dc = slcolors; kc = "customsl"; }
    else if (sufTheme === "_thCustom") { cc = ucucolors; dc = cucolors; kc = "customcustom"; }
    else if (sufTheme === "_thClassic") { cc = uclcolors; dc = clcolors; kc = "customclassic"; }
    for (var key in dc) {
        if (dc.hasOwnProperty(key)) cc[key] = dc[key];
    }
    theme_editor();
    saveState.setItem(kc, cc);
    saveState.save();
};

// --- control panel framing
var control_panel = document.createElement("DIV");
control_panel.className = "controlpanel"+sufTheme;
var cpdiv = document.createElement("DIV");
var eddiv = document.createElement("DIV");
cpdiv.id = 'control_panel';
var cptable = document.createElement("TABLE");
cpdiv.appendChild(cptable);
var testinput = document.createElement("INPUT");
cptable.style.width = '100%';
var cptr01 = document.createElement("TR");
var cptd01 = document.createElement("TD"); //left
cptd01.style.width = '900px';
var cptd02 = document.createElement("TD"); //right
cptable.appendChild(cptr01);
cptr01.appendChild(cptd01); // left
cptd01.appendChild(control_panel);
cptr01.appendChild(cptd02); // right
cptd02.appendChild(eddiv);
eddiv.appendChild(btn02);
var edspan = document.createElement("SPAN");
edspan.className = "edspan"+sufTheme;

edspan.innerHTML = "<br>Mouseover the input boxes for a description. With the exception of the random theme, anything changed here will be saved under the current theme. <b>Note: Some values, along with resetting to default, will require a page refresh to take effect.</b><br><br>";
eddiv.appendChild(edspan);
for (var i=0; i<thin.length; i++) { 
    eddiv.appendChild(thin[i]);
    eddiv.appendChild(document.createTextNode(" "));
    if ((i+1)%4 === 0) eddiv.appendChild(document.createElement("BR"));
    thin[i].size = '6'; 
    thin[i].className = "color {hash:true, pickerFaceColor:'transparent',pickerFace:0,pickerBorder:0,pickerInsetColor:'black'}";
}
eddiv.style.display = 'none';
document.body.insertBefore(cpdiv, document.body.firstChild); 
$('body > :not(#control_panel)').hide(); //hide all nodes directly under the body

// --- settings panel
var settings = {};
settings.panel = { mainDiv:     document.createElement("DIV"),
                  containers: document.createElement("DIV"),
                  sections:     document.createElement("SECTION"),
                  accessButton: document.createElement("BUTTON"),
                  closeSpan:    document.createElement("SPAN"),
                  init: function() {
                      this.mainDiv.className = "settings settingsPanelMainDiv";
                      this.mainDiv.id = "settingsPanel"; 
                      this.mainDiv.tabIndex = "0";
                      this.mainDiv.style.display = "none";
                      //this.mainDiv.addEventListener("blur", function() { settings.panel.mainDiv.style.display = "none"; });
                      this.mainDiv.appendChild(this.closeSpan);
                      this.mainDiv.appendChild(settings.sidebar.mainDiv);
                      this.mainDiv.appendChild(settings.general.mainDiv);
                      this.accessButton.className = "settings cpButtons"+sufTheme;
                      this.accessButton.id = "settingsButton";
                      this.accessButton.textContent = "Settings";
                      this.accessButton.onclick = function() { settings.display(); };
                      this.closeSpan.className = "settings settingsCloseSpan";
                      this.closeSpan.innerHTML = "&#160;&#10008;&#160;";
                      this.closeSpan.addEventListener("click", function() { settings.panel.mainDiv.style.display = "none"; });
                      this.closeSpan.title = "Close";
                      this.containers.className = "settings settingsOptionContainers";
                      this.sections.className = "settings settingsOptionSections";
                  }
                 };
settings.sidebar = { mainDiv:      document.createElement("DIV"),
                    generalSpan:   document.createElement("SPAN"),
                    blocklistSpan: document.createElement("SPAN"),
                    init: function() {
                        this.mainDiv.className = "settings settingsInnerDiv settingsSidebarMainDiv";
                        this.mainDiv.appendChild(this.generalSpan);
                        this.mainDiv.appendChild(this.blocklistSpan);
                        this.generalSpan.className = "settings settingsSidebarSpans settingsSidebarGeneralSpan";
                        this.generalSpan.textContent = "General";
                        this.generalSpan.addEventListener("click", function() { settings.sidebar._click("generalSpan", "general") });
                        this.blocklistSpan.className = "settings settingsSidebarSpans settingsSidebarBlocklistSpan";
                        this.blocklistSpan.textContent = "Blocklist";
                        this.blocklistSpan.addEventListener("click", function() { settings.sidebar._click("blocklistSpan", "blocklist") });
                    },
                    _click: function(v, div) {
                        if (!settings.sidebar[v].classList.contains("settingsSidebarSpans-selected")) {
                            settings.sidebar[v].classList.toggle("settingsSidebarSpans-selected");
                            var last = settings.panel.mainDiv.lastChild;
                            settings.sidebar[last.dataset.category.concat("Span")].classList.toggle("settingsSidebarSpans-selected");
                            settings.panel.mainDiv.replaceChild(settings[div].mainDiv, last);
                        }
                    }
                   };
settings.general = { mainDiv:          document.createElement("DIV"),
                    colorTypeSimple:   document.createElement("INPUT"),
                    colorTypeAdjusted: document.createElement("INPUT"),
                    sortTypeSimple:    document.createElement("INPUT"),
                    sortTypeAdjusted:  document.createElement("INPUT"),
                    colorTSLabel:      document.createElement("LABEL"),
                    colorTALabel:      document.createElement("LABEL"),
                    sortTSLabel:       document.createElement("LABEL"),
                    sortTALabel:       document.createElement("LABEL"),
                    commWeight:        document.createElement("DIV"),
                    payWeight:         document.createElement("DIV"),
                    fairWeight:        document.createElement("DIV"),
                    fastWeight:        document.createElement("DIV"),
                    commLabel:         document.createElement("LABEL"),
                    payLabel:          document.createElement("LABEL"),
                    fairLabel:         document.createElement("LABEL"),
                    fastLabel:         document.createElement("LABEL"),
                    init: function() {
                        this.mainDiv.className = "settings settingsInnerDiv settingsMainContainer settingsGeneralMainDiv";
                        this.mainDiv.dataset.category = "general";
                        var colorTypeContainer = settings.panel.containers.cloneNode(false);
                        var colorTypeSectionSimple = settings.panel.sections.cloneNode(false);
                        var colorTypeSectionAdjusted = settings.panel.sections.cloneNode(false);
                        var sortTypeContainer = settings.panel.containers.cloneNode(false);
                        var sortTypeSectionSimple = settings.panel.sections.cloneNode(false);
                        var sortTypeSectionAdjusted = settings.panel.sections.cloneNode(false);
                        var weightContainer = settings.panel.containers.cloneNode(false);
                        var weightSection = settings.panel.sections.cloneNode(false);
                        this.mainDiv.appendChild(colorTypeContainer);
                        this.mainDiv.appendChild(sortTypeContainer);
                        this.mainDiv.appendChild(weightContainer);
                        this.colorTypeSimple.className = "settings settingsRadio settingsGeneralColorTypeSimple";
                        this.colorTypeSimple.type = "radio";
                        this.colorTypeSimple.name = "colorType";
                        this.colorTypeSimple.id = "colorTypeSimple";
                        this.colorTypeSimple.addEventListener("click", function() { settings.options.commit("resultsColorType", "colorType", "sim"); });
                        this.colorTSLabel.htmlFor = "colorTypeSimple";
                        this.colorTSLabel.textContent = "Simple";
                        this.colorTSLabel.className = "settings settingsLabelSA";
                        this.colorTypeAdjusted.className = "settings settingsRadio settingsGeneralColorTypeAdjusted";
                        this.colorTypeAdjusted.type = "radio";
                        this.colorTypeAdjusted.name = "colorType";
                        this.colorTypeAdjusted.id = "colorTypeAdjusted";
                        this.colorTypeAdjusted.addEventListener("click", function() { settings.options.commit("resultsColorType", "colorType", "adj"); });
                        this.colorTALabel.htmlFor = "colorTypeAdjusted";
                        this.colorTALabel.textContent = "Adjusted";
                        this.colorTALabel.className = "settings settingsLabelSA";
                        var tempDiv = document.createElement("DIV")
                        tempDiv.style.float = "left";
                        tempDiv.style.marginLeft = "15px";
                        tempDiv.innerHTML = "<span style='position: relative; left: -8px;'><b>Color Type</b></span><br>";
                        tempDiv.appendChild(this.colorTSLabel);
                        tempDiv.appendChild(this.colorTypeSimple);
                        tempDiv.appendChild(document.createElement("P"));
                        tempDiv.appendChild(this.colorTALabel);
                        tempDiv.appendChild(this.colorTypeAdjusted);
                        colorTypeContainer.appendChild(tempDiv);
                        colorTypeContainer.appendChild(colorTypeSectionSimple);
                        colorTypeContainer.appendChild(colorTypeSectionAdjusted);
                        colorTypeSectionSimple.innerHTML = "<span style='position: relative; left: 10px;'><i>simple</i></span><br>HIT Scraper will use a simple weighted average to ";
                        colorTypeSectionSimple.innerHTML += "determine the overall TO rating and colorize results off that value. Use this setting to equalize coloration between ";
                        colorTypeSectionSimple.innerHTML += "HIT Scraper and Color Coded Search.";
                        colorTypeSectionAdjusted.innerHTML = "<span style='position: relative; left: 10px;'><i>adjusted</i></span><br>HIT Scraper will calculate an adjusted average based on ";
                        colorTypeSectionAdjusted.innerHTML += "confidence of the TO rating to colorize results. Confidence is proportional to the number of reviews.";
                        this.sortTypeSimple.className = "settings settingsRadio settingsGeneralSortTypeSimple";
                        this.sortTypeSimple.type = "radio";
                        this.sortTypeSimple.name = "sortType";
                        this.sortTypeSimple.id = "sortTypeSimple";
                        this.sortTypeSimple.addEventListener("click", function() { settings.options.commit("resultsSortType", "sortType", "sim"); });
                        this.sortTSLabel.htmlFor = "sortTypeSimple";
                        this.sortTSLabel.textContent = "Simple";
                        this.sortTSLabel.className = "settings settingsLabelSA";
                        this.sortTypeAdjusted.className = "settings settingsRadio settingsGeneralSortTypeAdjusted";
                        this.sortTypeAdjusted.type = "radio";
                        this.sortTypeAdjusted.name = "sortType";
                        this.sortTypeAdjusted.id = "sortTypeAdjusted";
                        this.sortTypeAdjusted.addEventListener("click", function() { settings.options.commit("resultsSortType", "sortType", "adj"); });
                        this.sortTALabel.htmlFor = "sortTypeAdjusted";
                        this.sortTALabel.textContent = "Adjusted";
                        this.sortTALabel.className = "settings settingsLabelSA";
                        var tempDiv2 = tempDiv.cloneNode(false);
                        tempDiv2.innerHTML = "<span style='position: relative; left: -8px;'><b>Sort Type</b></span><br>";
                        tempDiv2.appendChild(this.sortTSLabel);
                        tempDiv2.appendChild(this.sortTypeSimple);
                        tempDiv2.appendChild(document.createElement("P"));
                        tempDiv2.appendChild(this.sortTALabel);
                        tempDiv2.appendChild(this.sortTypeAdjusted);
                        sortTypeContainer.appendChild(tempDiv2);
                        sortTypeContainer.appendChild(sortTypeSectionSimple);
                        sortTypeContainer.appendChild(sortTypeSectionAdjusted);
                        sortTypeSectionSimple.innerHTML = "<span style='position: relative; left: 10px;'><i>simple</i></span><br>";
                        sortTypeSectionSimple.innerHTML += "HIT Scraper will sort results based simply on value regardless of the number of reviews.";
                        sortTypeSectionAdjusted.innerHTML = "<span style='position: relative; left: 10px;'><i>adjusted</i></span><br>HIT Scraper will adjust ratings based on ";
                        sortTypeSectionAdjusted.innerHTML += "reliability (ie. confidence) of the data. It factors in the number of reviews such that, for example, a requester ";
                        sortTypeSectionAdjusted.innerHTML += "with 100 reviews rated at 4.6 will rightfully be ranked higher than a requester with 3 reviews rated at 5. ";
                        sortTypeSectionAdjusted.innerHTML += "This gives a more accurate representation of the data.";
                        this.commWeight.className = "settings settingsDivInput settingsGeneralCommWeight";
                        this.commWeight.contentEditable = true;
                        this.commWeight.title = "default value: 1";
                        this.commWeight.addEventListener("keyup", function() {
                            var num = Math.abs(Number(settings.general.commWeight.textContent));
                            if (!isNaN(num))
                                settings.options.commit("comm", "commWeight", num);
                        });
                        this.commLabel.textContent = "comm: ";
                        this.commLabel.className = "settings settingsLabelSA";
                        this.payWeight.className = "settings settingsDivInput settingsGeneralPayWeight";
                        this.payWeight.contentEditable = true;
                        this.payWeight.title = "default value: 3";
                        this.payWeight.addEventListener("keyup", function() {
                            var num = Math.abs(Number(settings.general.payWeight.textContent));
                            if (!isNaN(num))
                                settings.options.commit("pay", "payWeight", num);
                        });
                        this.payLabel.textContent = "pay: ";
                        this.payLabel.className = "settings settingsLabelSA";
                        this.fairWeight.className = "settings settingsDivInput settingsGeneralFairWeight";
                        this.fairWeight.contentEditable = true;
                        this.fairWeight.title = "default value: 3";
                        this.fairWeight.addEventListener("keyup", function() {
                            var num = Math.abs(Number(settings.general.fairWeight.textContent));
                            if (!isNaN(num))
                                settings.options.commit("fair", "fairWeight", num);
                        });
                        this.fairLabel.textContent = "fair: ";
                        this.fairLabel.className = "settings settingsLabelSA";
                        this.fastWeight.className = "settings settingsDivInput settingsGeneralFastWeight";
                        this.fastWeight.contentEditable = true;
                        this.fastWeight.title = "default value: 1";
                        this.fastWeight.addEventListener("keyup", function() {
                            var num = Math.abs(Number(settings.general.fastWeight.textContent));
                            if (!isNaN(num))
                                settings.options.commit("fast", "fastWeight", num);
                        });
                        this.fastLabel.textContent = "fast: ";
                        this.fastLabel.className = "settings settingsLabelSA";
                        var tempDiv3 = tempDiv.cloneNode(false);
                        tempDiv3.innerHTML = "<span style='position: relative; left: -8px;'><b>TO Weighting</b></span><br>";
                        tempDiv3.appendChild(this.commLabel);
                        tempDiv3.appendChild(this.commWeight);
                        tempDiv3.appendChild(document.createElement("BR"));
                        tempDiv3.appendChild(this.payLabel);
                        tempDiv3.appendChild(this.payWeight);
                        tempDiv3.appendChild(document.createElement("BR"));
                        tempDiv3.appendChild(this.fairLabel);
                        tempDiv3.appendChild(this.fairWeight);
                        tempDiv3.appendChild(document.createElement("BR"));
                        tempDiv3.appendChild(this.fastLabel);
                        tempDiv3.appendChild(this.fastWeight);
                        weightContainer.appendChild(tempDiv3);
                        weightContainer.appendChild(weightSection);
                        weightSection.innerHTML = "<p>Specify weights for TO attributes to place greater importance on certain attributes over others.<br>";
                        weightSection.innerHTML += "The default values respect backwards compatibility; recommended settings are [1, 6, 3.5, 1].";
                    },
                    _init: function() {
                        var checked = settings.options.resultsColorType;
                        this.colorTypeSimple.checked = (checked === "adj") ? false : true;
                        this.colorTypeAdjusted.checked = (checked === "adj") ? true : false;
                        checked = settings.options.resultsSortType;
                        this.sortTypeSimple.checked = (checked === "adj") ? false : true;
                        this.sortTypeAdjusted.checked = (checked === "adj") ? true : false;
                        this.commWeight.textContent = settings.options.toWeighting.comm;
                        this.payWeight.textContent = settings.options.toWeighting.pay;
                        this.fairWeight.textContent = settings.options.toWeighting.fair;
                        this.fastWeight.textContent = settings.options.toWeighting.fast;
                    }
                   };
settings.blocklist = { mainDiv:      document.createElement("DIV"),
                      theListBox:    document.createElement("DIV"),
                      useWildcards:  document.createElement("INPUT"),
                      wildcardLabel: document.createElement("LABEL"),
                      init: function() {
                          this.mainDiv.className = "settings settingsInnerDiv settingsMainContainer settingsBlocklistMainDiv";
                          this.mainDiv.dataset.category = "blocklist";
                          var wildcardContainer = settings.panel.containers.cloneNode(false);
                          var listEditorContainer = settings.panel.containers.cloneNode(false);
                          var wildcardSection = settings.panel.sections.cloneNode(false);
                          var tempDiv = document.createElement("DIV");
                          tempDiv.style.float = "left";
                          this.mainDiv.appendChild(wildcardContainer);
                          //this.mainDiv.appendChild(listEditorContainer);
                          this.useWildcards.className = "settings settingsCheckbox settingsBlocklistUseWildcards";
                          this.useWildcards.type = "checkbox";
                          this.useWildcards.id = "useWildcards";
                          this.useWildcards.addEventListener("click", function() { settings.options.commit("blocklistWildcards", "wildblocks", settings.blocklist.useWildcards.checked); });
                          this.wildcardLabel.className = "settings settingsLabelBlocklist";
                          this.wildcardLabel.htmlFor = "useWildcards";
                          this.wildcardLabel.textContent = "Allow Wildcards";
                          this.theListBox.className = "settings settingsDivInput settingsDivInput-large settingsBlocklistList";
                          this.theListBox.contentEditable = true;
                          wildcardContainer.innerHTML = "<span style='position: relative; left: 7px;'><b>Advanced Matching</b></span><p></p>";
                          wildcardContainer.appendChild(tempDiv);
                          wildcardContainer.appendChild(wildcardSection);
                          tempDiv.appendChild(this.wildcardLabel);
                          tempDiv.appendChild(this.useWildcards);
                          wildcardSection.style.marginLeft = "150px";
                          wildcardSection.innerHTML = "Allows for the use of asterisks <code>(*)</code> as wildcards in the blocklist for simple glob matching. Any blocklist entry without ";
                          wildcardSection.innerHTML += "an asterisk is treated the same as the default behavior; the entry must exactly match a HIT title or requester to trigger ";
                          wildcardSection.innerHTML += "a block. <p><em>Wildcards have the potential to block more HITs than intended if using a pattern that's too generic.</em></p>";
                          wildcardSection.innerHTML += "<p></p>Matching is not case sensitive regardless of the wildcard setting. Entries without an opening asterisk are expected ";
                          wildcardSection.innerHTML += "to match the beginning of a line, likewise, entries without a closing asterisk are expected to match the end of a line. ";
                          wildcardSection.innerHTML += "Example usage below. <p></p><table class='ble' style='left: -100px; position:relative; width:100%;'><tr><th class='blec ble'></th><th class='blec ble'>Matches</th><th class='blec ble'>\
Does not match</th><th class='blec ble'>Notes</th></tr><tr><td rowspan='2' class='blec ble'><code>foo*baz</code></td><td class='blec ble'>foo bar bat baz<td class='blec ble'>bar foo bat baz\
</td><td rowspan='2' class='blec ble'>no leading or closing asterisks; <code>foo</code> must be at the start of a line, and <code>baz</code> must be at the end of a line for a \
positive match</td></tr><tr><td class='blec ble'>foobarbatbaz</td><td class='blec ble'>foo bar bat</td></tr><tr><td class='blec ble'><code>*foo</code></td>\
<td class='ble blec'>bar baz foo</td><td class='blec ble'>foo baz</td><td class='ble blec'>matches and blocks any line ending in <code>foo</code>\
</td></tr><tr><td class='blec ble'><code>foo*</code></td><td class='ble blec'>foo bat bar</td><td class='ble blec'>bat foo baz</td><td class='ble blec'>\
matches and blocks any line beginning with <code>foo</code></td></tr><tr><td class='ble blec' rowspan='4'><code>*bar*</code></td><td class='blec ble'>foo bar bat baz</td>\
<td class='ble blec' rowspan='4'>foo bat baz</td><td class='ble blec' rowspan='4'>matches and blocks any line containing <code>bar</code></td></tr><tr><td class='ble blec'>bar bat baz</td>\
</tr><tr><td class='blec ble'>foo bar</td></tr><tr><td class='blec ble'>foobatbarbaz</td></tr><tr><td class='ble blec'><code>** foo</code></td><td class='ble blec'>** foo</td>\
<td class='ble blec'>** foo bar baz</td><td class='ble blec'>Multiple consecutive asterisks will be treated as a string rather than a wildcard. \
This makes it compatible with HITs using multiple asterisks in their titles, <i>eg.</i>, <code>*** contains peanuts ***</code>.</td></tr><tr><td class='ble blec'>\
<code>** *bar* ***</td><td class='blec ble'>** foo bar baz bat ***</td><td class='ble blec'>foo bar baz</td><td class='blec ble'>Consecutive asterisks used in conjunction with single asterisks.\
</td><tr><td class='blec ble'><code>*</code></td><td class='ble blec'></td><td class='ble blec'><i>everything</i></td><td class='ble blec'>A single asterisk would usually match anything and everything, \
but here, it matches nothing. This prevents accidentally blocking everything from the results table.</td></tr></table>";
                          listEditorContainer.innerHTML = "<span style='position: relative; left: 7px;'><b>Blocklist Editor</b></span><br>";
                          listEditorContainer.appendChild(this.theListBox)
                      },
                      _init: function() {
                          this.useWildcards.checked = settings.options.blocklistWildcards;
                          this.theListBox.textContent = "placeholder";
                      }
                     };

settings.options = { resultsColorType:  null, 
                    resultsSortType:    null, 
                    toWeighting:        { comm: null, pay: null, fair: null, fast: null },
                    blocklistWildcards: null,
                    init: function() {
                        this.resultsColorType = saveState.getItem("colorType") || "sim";
                        this.resultsSortType = saveState.getItem("sortType") || "adj";
                        this.toWeighting = {comm: saveState.getItem("commWeight") || 1,
                                            pay: saveState.getItem("payWeight")   || 3, 
                                            fair: saveState.getItem("fairWeight") || 3, 
                                            fast: saveState.getItem("fastWeight") || 1
                                           };
                        this.blocklistWildcards = saveState.getItem("wildblocks") || false;
                    },
                    commit: function(v, key, val) {
                        if (this[v] || this[v] === false)
                            this[v] = val;
                        else if (this.toWeighting[v] || this.toWeighting[v] == 0)
                            this.toWeighting[v] = val;
                        else {
                            return;
                        }
                        saveState.setItem(key, val);
                        saveState.save();
                    }
                   };
settings.display = function() {
    var swidth = window.innerWidth*0.9;
    var sheight = window.innerHeight*0.9;
    var _display = document.querySelector(".settingsSidebarSpans-selected");
    this.panel.mainDiv.style.height = String(sheight).concat("px");
    this.panel.mainDiv.style.width = String(swidth).concat("px");
    this.panel.mainDiv.style.top = String(window.innerHeight*0.05).concat("px");
    this.panel.mainDiv.style.left = String(window.innerWidth*0.05).concat("px");
    this.panel.closeSpan.style.left = String(swidth - 128).concat("px");
    this.sidebar.mainDiv.style.height = String(sheight-45).concat("px");
    this.sidebar.mainDiv.style.maxHeight = this.sidebar.mainDiv.style.height;
    if (!_display)
        this.sidebar.generalSpan.className += " settingsSidebarSpans-selected";
    this.general.mainDiv.style.height = String(sheight-59).concat("px");
    this.general.mainDiv.style.width = String(swidth-126).concat("px");
    this.blocklist.mainDiv.style.height = String(sheight-59).concat("px");
    this.blocklist.mainDiv.style.width = String(swidth-126).concat("px");
    var containers = document.querySelectorAll(".settingsOptionContainers");
    for (var i=0; i<containers.length; i++) {
        containers[i].style.width = String(swidth-126-16).concat("px");
    };
    this.general._init();
    this.blocklist._init();
    this.panel.mainDiv.style.display = "block";
    this.panel.mainDiv.focus();
};
settings.init = function() {
    document.body.insertBefore(this.panel.mainDiv, document.body.firstChild);
    this.options.init();
    this.panel.init();
    this.sidebar.init();
    this.general.init();
    this.blocklist.init();
};
settings.init();


var big_red_button = document.createElement("BUTTON");
var reset_blocks = document.createElement("BUTTON");
var include_button = document.createElement("BUTTON");
var progress_report = document.createTextNode("Stopped");
var status_report = document.createTextNode("None");
var text_area = document.createElement("TABLE");
text_area.id = "body_table";
//text_area.className = "bodytable"+sufTheme;
var showButton = document.createElement("BUTTON");
showButton.className += " cpButtons"+sufTheme;
showButton.onclick = function() { show_TO_rows(); };
showButton.textContent = "Show ignored hits";
showButton.id = "show_TO_stuff_button";

function show_TO_rows() {
    var mr = document.getElementsByClassName("toBlockedRow");
    var mt = mr || "[]";
    if (showButton.textContent == "Show ignored hits") {
        for (var i=mt.length-1; i>-1; --i) { mt[i].className = mt[i].className.replace(/toBlockedRow/, "toBlockedRowOff"); }
        showButton.textContent = "Hide ignored hits";
    }
    else {
        mt = document.getElementsByClassName("toBlockedRowOff");
        for (var i=mt.length-1; i>-1; i--) { mt[i].className = mt[i].className.replace(/toBlockedRowOff/, "toBlockedRow"); }
        showButton.textContent = "Show ignored hits";
    }
}

show_interface();

// --- theme randomization
function yiqBrightness(hc,yiq) {  // hc type "#000000", "000000", "[00, 00, 00]"
    var r = 0, b = 0, g = 0;
    if (yiq===true) {
        if (typeof hc === 'object') { r = hc[0]; g = hc[1]; b = hc[2]; }
        else if (hc.substr(0,1) == "#") {
            r = parseInt(hc.substr(1,2), 16);
            g = parseInt(hc.substr(3,2), 16);
            b = parseInt(hc.substr(5,2), 16);
        }
        else {
            r = parseInt(hc.substr(0,2), 16);
            g = parseInt(hc.substr(2,2), 16);
            b = parseInt(hc.substr(4,2), 16);
        }
        return r*0.299 + g*0.587 + b*0.114; // y value
    }
    else {
        return hc[0] + hc[1]*0.956 + hc[2]*0.621; // get r value from full yiq
    }
}
function randomizeScheme() {
    // TODO: make randomization faster

    if (!("background" in rcolors)) 
        for (var l in cucolors) { if (cucolors.hasOwnProperty(l)) rcolors[l] = cucolors[l]; }
    var r = 0, g = 0, b = 0;
    var k = Object.keys(rcolors);
    for (k in rcolors) {
        rcolors[k] = getNewColor();
    }
    console.groupCollapsed("Random theme init routine");
    var bg1 = yiqBrightness(rcolors.cpBackground, true), bg0 = yiqBrightness(rcolors.background,true);
    var colorslice = {};
    var chex = "";
    k = ["defaultText", "inputText", "secondText", "export", "accent"];
    for (var i in k) { colorslice[k[i]] = rcolors[k[i]]; }
    for (k in colorslice) { 
        var iterations = 0;
        if (colorslice.hasOwnProperty(k)) {
            var c1 = yiqBrightness(rcolors[k],true);
            while (Math.abs(bg1-c1)<69 || Math.abs(bg0-c1)<69) { // increase readability
                if (iterations > 61000) {
                    console.log("Skipping: "+k+". Final value: " + rcolors[k]);
                    break;
                }
                chex = getNewColor();
                c1 = yiqBrightness(chex,true);
                rcolors[k] = chex;
                iterations++;
            }
            console.log(k+": "+rcolors[k]+" after "+iterations + " cycles");
        }
    }
    console.groupEnd();
}
function getNewColor() {
    var ri = Math.floor( Math.random()*255 ).toString(16);
    var gi = Math.floor( Math.random()*255 ).toString(16);
    var bi = Math.floor( Math.random()*255 ).toString(16);
    return "#".concat( ri.length<2 ? ("0".concat(ri)) : ri ).concat( gi.length<2 ? ("0".concat(gi)) : gi ).concat( bi.length<2 ? ("0".concat(bi)) : bi);
}

// ---
var global_run = false;
var statusdetail_loop_finished = false;
var date_header = "";
var scraper_history = {};
var wait_loop;
var dings = 0;

function set_progress_report(text, force)
{
    if (global_run == true || force == true)
    {
        progress_report.textContent = text;
        var status_text = status_array.join("; ");
        status_report.textContent = status_text;
    }
}

function get_progress_report()
{
    return progress_report.textContent;
}

function wait_until_stopped()
{
    if (global_run == true)
    {
        if (statusdetail_loop_finished == true)
        {
            big_red_button.textContent = "Start";
            set_progress_report("Finished", false);
        }
        else
        {
            setTimeout(function(){wait_until_stopped();}, 500);
        }
    }
}

function display_wait_time(wait_time)
{
    if (global_run == true)
    {
        var current_progress = get_progress_report();
        if (current_progress.indexOf("Searching again in")!==-1)
        {
            set_progress_report(current_progress.replace(/Searching again in \d+ seconds/ , "Searching again in " + wait_time + " seconds"),false);
        }
        else
            set_progress_report(current_progress + " Searching again in " + wait_time + " seconds.", false);
        if (wait_time>1)
            setTimeout(function(){display_wait_time(wait_time-1);}, 1000);
    }
}

function dispArr(ar)
{
    var disp = "";
    for (var z = 0; z < ar.length; z++)
    {
        disp += "id " + z + " is " + ar[z] + " ";
    }
    //console.log(disp);
}

function scrape($src)
{
    var $requester = $src.find('a[href^="/mturk/searchbar?selectedSearchType=hitgroups&requester"]');
    if ($requester.length == 0)
        $requester = $src.find('span.requesterIdentity');
    var $title = $src.find('a[class="capsulelink"]');
    var $reward = $src.find('span[class="reward"]');
    var $preview = $src.find('a[href^="/mturk/preview?"]');
    var $qualified = $src.find('a[href^="/mturk/notqualified?"],a[id^="private_hit"]');
    var $times = $src.find('a[id^="duration_to_complete"]');
    var $descriptions = $src.find('a[id^="description"]');
    var not_qualified_group_IDs=[];
    var $quals = $src.find('a[id^="qualificationsRequired"]');
    var $mixed;
    $qualified.each(function(){
        var groupy = $(this).attr('href');
        if (groupy){
            groupy = groupy.replace(/\/mturk\/notqualified\?hitGroupId=([A-Z0-9]+)(&.+)?/,"$1");
            groupy = groupy.replace(/\/mturk\/notqualified\?hitId=([A-Z0-9]+)(&.+)?/,"$1");
            groupy = groupy.replace(/\&hitGroupId=([A-Z0-9]+)(&.+)?/,"");
            groupy = groupy.replace(/\&hitId=([A-Z0-9]+)(&.+)?/,"");
        }
        not_qualified_group_IDs.push(groupy);
    });
    //console.log(not_qualified_group_IDs);
    if (document.getElementById('lnkWorkerSignin'))
        $mixed =  $src.find('a[href^="/mturk/preview?"],a[id^="private_hit"]');
    else
        $mixed =  $src.find('a[href^="/mturk/preview?"],a[href^="/mturk/notqualified?"]');
    //console.log($mixed);
    var listy =[];
    $mixed.each(function(){
        var groupy = $(this).attr('href');
        if (groupy)
        {
            groupy = groupy.replace(/\/mturk\/notqualified\?hitGroupId=([A-Z0-9]+)(&.+)?/,"$1");
            groupy = groupy.replace(/\/mturk\/notqualified\?hitId=([A-Z0-9]+)(&.+)?/,"$1");
            groupy = groupy.replace(/\&hitGroupId=([A-Z0-9]+)(&.+)?/,"");
            groupy = groupy.replace(/\&hitId=([A-Z0-9]+)(&.+)?/,"");
            groupy = groupy.replace("/mturk/preview?groupId=","");
        }
        else
            groupy = "";
        //console.log($(this));
        //console.log(groupy);
        if (listy.indexOf(groupy) == -1)
            listy.push(groupy);
        else if (groupy == "")
            listy.push(groupy);
    });
    //console.log(listy);
    //listy = listy.filter(function(elem, pos) {
    //    return listy.indexOf(elem) == pos;
    //});
    //console.log(listy);
    for (var j = 0; j < $requester.length; j++)
    {
        var $hits = $requester.eq(j).parent().parent().parent().parent().parent().parent().find('td[class="capsule_field_text"]');
        var requester_name = $requester.eq(j).text().trim();
        var requester_link = $requester.eq(j).attr('href');
        if (!requester_link)
        {
            requester_link = "https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&searchWords="+ requester_name.replace(/ /g,"+");
            requester_name += " (search)";
        }
        var group_ID=(listy[j] ? listy[j] : "");
        var masters = false;
        var title = $title.eq(j).text().trim();
        var preview_link = "/mturk/preview?groupId=" + group_ID;
        //console.log(listy[j]);
        //console.log(title+" "+group_ID +" "+ listy[j]);
        if (!group_ID || group_ID.length == 0){
            preview_link = requester_link;
            title += " (Preview link unavailable)";
        }
        var reward = $reward.eq(j).text().trim();
        var hits = $hits.eq(4).text().trim();
        if (hits.length == 0)
            hits = "Scraper logged out";
        var time = $times.eq(j).parent()[0].nextSibling.nextSibling.innerHTML;
        var description = $descriptions.eq(j).parent()[0].nextSibling.nextSibling.innerHTML;
        //console.log(description);
        var requester_id = requester_link.replace('/mturk/searchbar?selectedSearchType=hitgroups&requesterId=','');
        var accept_link;
        accept_link = preview_link.replace('preview','previewandaccept');

        /*HIT SCRAPER ADDITION*/
        var qElements = $quals.eq(j).parent().parent().parent().find('tr');
        //console.log(qElements);

        var qualifications = [];
        for (var i = 1; i < qElements.length; i++) {
            qualifications.push((qElements[i].childNodes[1].textContent.trim().replace(/\s+/g, ' ').indexOf("Masters") != -1 ? "[color=red][b]"+qElements[i].childNodes[1].textContent.trim().replace(/\s+/g, ' ')+"[/b][/color]" : qElements[i].childNodes[1].textContent.trim().replace(/\s+/g, ' ')));
            if (qElements[i].childNodes[1].textContent.trim().replace(/\s+/g, ' ').indexOf("Masters") != -1)
                masters=true;
        }
        var qualList = (qualifications.join('; ') ? qualifications.join('; ') : "None");

        var key = requester_name+title+reward+group_ID;
        if (found_key_list.indexOf(key) == -1)
            found_key_list.push(key);
        else
        {
            console.log("DUPE: "+key);
            continue;
        }
        if (scraper_history[key] === undefined)
        {
            scraper_history[key] = {requester:"", title:"", description:"", reward:"", hits:"", req_link:"", quals:"", prev_link:"", rid:"", acc_link:"", new_result:"", dinged:"", qualified:"", found_this_time:"", initial_time:"", reqdb:"",titledb:"",time:"",masters:false};
            scraper_history[key].req_link = requester_link;
            scraper_history[key].prev_link = preview_link;
            scraper_history[key].requester = requester_name;
            scraper_history[key].title = title;
            scraper_history[key].reward = reward;
            scraper_history[key].hits = hits;
            scraper_history[key].rid = requester_id;
            scraper_history[key].acc_link = accept_link;
            scraper_history[key].time = time;
            scraper_history[key].quals = qualList;
            scraper_history[key].description = description.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
            scraper_history[key].masters = masters;
            scraper_history[key].requester_strip = requester_name.replace(" (search)","");
            HITStorage.checkRequester(requester_id,key);
            HITStorage.checkTitle(title,key);
            if (searched_once)
            {
                scraper_history[key].initial_time = new Date().getTime();//-1000*(save_new_results_time - SEARCH_REFRESH);
                scraper_history[key].new_result = 0;
                scraper_history[key].dinged = 0;
            }
            else
            {
                scraper_history[key].initial_time = new Date().getTime()-1000*save_new_results_time;
                scraper_history[key].new_result = 1000*save_new_results_time;
                scraper_history[key].dinged = 1;
            }
            if (not_qualified_group_IDs.indexOf(group_ID) !== -1)
                scraper_history[key].qualified = false;
            else
                scraper_history[key].qualified = true;

            scraper_history[key].found_this_time = true;
        }
        else
        {
            scraper_history[key].new_result = new Date().getTime() - scraper_history[key].initial_time;
            scraper_history[key].found_this_time = true;
            scraper_history[key].hits = hits;
        }
    }
}

function statusdetail_loop(next_URL)
{
    if (global_run == true)
    {
        if (next_URL.length != 0)
        {
            $.get(next_URL, function(data)
                  {
                      var $src = $(data);
                      var maxpagerate = $src.find('td[class="error_title"]:contains("You have exceeded the maximum allowed page request rate for this website.")');
                      if (maxpagerate.length == 0)
                      {
                          if (next_page > PAGES_TO_SCRAPE)
                          {
                              if(status_array.indexOf("Correcting for skips") == -1 && type != 2){
                                  status_array.push("Correcting for skips");
                              }
                          }
                          set_progress_report("Processing page " + next_page, false);
                          scrape($src);

                          var $next_URL = $src.find('a[href^="/mturk/viewsearchbar"]:contains("Next")');
                          next_URL = ($next_URL.length != 0) ? $next_URL.attr("href") : "";
                          next_page++;
                          if (document.getElementById('lnkWorkerSignin'))
                              maxPages--;
                          if (maxPages == 0)
                          {
                              maxPages = 20;
                              next_URL = "";
                              next_page = -1;
                          }

                          if (default_type == 1)
                          {
                              var hmin = MINIMUM_HITS+1;
                              for (var j = 0; j < found_key_list.length; j++)
                              {
                                  //console.log(scraper_history[found_key_list[j]]);
                                  if (scraper_history[found_key_list[j]].hits < hmin)
                                  {
                                      next_URL = "";
                                      next_page = -1;
                                      break;
                                  }
                              }
                          }
                          else if (next_page > PAGES_TO_SCRAPE && correct_for_skips)
                          {
                              var skipped_hits = 0;
                              var added_pages = 0;
                              for (var k = 0; k < found_key_list.length; k++)
                              {
                                  var obj = scraper_history[found_key_list[k]];
                                  if (!ignore_check(obj.requester.replace(" (search)",""),obj.title))
                                      skipped_hits++;
                              }
                              added_pages = Math.floor(skipped_hits/10);
                              if (skipped_hits%10 >6)
                                  added_pages++;
                              if (next_page > PAGES_TO_SCRAPE + added_pages)
                              {
                                  next_URL = "";
                                  next_page = -1;
                              }

                          }
                          else if (next_page > PAGES_TO_SCRAPE)
                          {
                              next_URL = "";
                              next_page = -1;
                          }

                          setTimeout(function(){statusdetail_loop(next_URL);}, STATUSDETAIL_DELAY);
                      }
                      else
                      {
                          //console.log("MPRE");
                          setTimeout(function(){statusdetail_loop(next_URL);}, MPRE_DELAY);
                      }
                  }).fail(function() {
                if (qual_input)
                    alert("Error when searching. Are you logged out?");
                global_run = false;
                big_red_button.textContent = "Start";
            });
        }
        else
        {
            maxPages = 20;
            searched_once = true;
            var found_hits = found_key_list.length;
            var shown_hits = 0;
            var new_hits = 0;
            var blocklist_hits = 0, belowThreshold_hits = 0;
            dings = 0;
            var ridString = "";
            var rids = [];
            var rnames = [];
            var lastRow = text_area.rows.length - 1;
            for (var i = lastRow; i>0; i--)
                text_area.deleteRow(i);
            for (var j = 0; j < found_key_list.length; j++)
            {
                //(function(url,rids,j) {
                var obj = scraper_history[found_key_list[j]];
                //console.dir(obj);
                var ignored = ignore_check(obj.requester.replace(" (search)",""),obj.title);
                var includelisted = include_check(obj.requester.replace(" (search)", ""),obj.title);
                if (!(obj.masters == true && masters_hide.checked) && (ignored && obj.found_this_time) || (!ignored && obj.found_this_time)){
                    ++shown_hits;
                    //hit export will update col_heads[1]
                    var col_heads = [];
                    if(obj.req_link == obj.rid)
                    {
                        if (useTO)
                            col_heads = ["<a class=\"link"+sufTheme+"\" href='"+ obj.req_link +"' target='_blank'>" + obj.requester + "</a>","<a class=\"link"+sufTheme+"\" href='"+ obj.prev_link +"' target='_blank' title='"+ obj.description +"'>" + obj.title + "</a>",obj.reward,obj.hits,"TO down",(obj.title.indexOf("(Preview link unavailable)") > -1) ? "Scraper logged out" : "<a href='"+LINK_BASE+obj.acc_link+"' target='_blank'>Accept</a>","M"];
                        else
                            col_heads = ["<a class=\"link"+sufTheme+"\" href='"+ obj.req_link +"' target='_blank'>" + obj.requester + "</a>","<a class=\"link"+sufTheme+"\" href='"+ obj.prev_link +"' target='_blank' title='"+ obj.description +"'>" + obj.title + "</a>",obj.reward,obj.hits,"TO disabled",(obj.title.indexOf("(Preview link unavailable)") > -1) ? "Scraper logged out" : "<a href='"+LINK_BASE+obj.acc_link+"' target='_blank'>Accept</a>","M"];
                    }
                    else
                    {
                        if (useTO)
                            col_heads = ["<a class=\"link"+sufTheme+"\" href='"+ LINK_BASE+obj.req_link +"' target='_blank'>" + obj.requester + "</a>","<a class=\"link"+sufTheme+"\" href='"+ LINK_BASE+obj.prev_link +"' target='_blank' title='"+ obj.description +"'>" + obj.title + "</a>",obj.reward,obj.hits,"TO down","<a class=\"link"+sufTheme+"\" href='"+ LINK_BASE+obj.acc_link +"' target='_blank'>Accept</a>","M"];
                        else
                            col_heads = ["<a class=\"link"+sufTheme+"\" href='"+ LINK_BASE+obj.req_link +"' target='_blank'>" + obj.requester + "</a>","<a class=\"link"+sufTheme+"\" href='"+ LINK_BASE+obj.prev_link +"' target='_blank' title='"+ obj.description +"'>" + obj.title + "</a>",obj.reward,obj.hits,"TO disabled","<a class=\"link"+sufTheme+"\" href='"+ LINK_BASE+obj.acc_link +"' target='_blank'>Accept</a>","M"];
                    }
                    var row = text_area.insertRow(text_area.rows.length);
                    if (!ignored && obj.found_this_time){
                        if (useBlock.checked) row.setAttribute("class","scraperBlockedRow");
                        else row.className = "scraperBlockedRowOff";
                        blocklist_hits++;
                        obj.dinged = 1;
                        //console.log(blocklist_hits);
                    }
                    else if (!includelisted && obj.found_this_time){
                        if (highlightIncludes_input.checked) row.setAttribute("class","scraperIncludelistedRow");
                        else row.setAttribute("class", "scraperIncludelistedRowOff");
                    }
                    //url += obj.rid + ',';
                    //url2 += obj.rid + ',';
                    if (obj.rid == obj.req_link)
                        rnames.push(obj.requester_strip);
                    else{
                        ridString += obj.rid + ',';
                    }
                    rids.push(obj.rid);
                    if (check_hitDB)
                    {
                        col_heads.push("R");
                        col_heads.push("T");
                    }
                    if (!obj.qualified)
                    {
                        col_heads.push("Not Qualified");
                    }
                    for (i=0; i<col_heads.length; i++)
                    {
                        var this_cell = row.insertCell(i);
                        row.cells[i].style.fontSize = default_text_size+"px";
                        this_cell.innerHTML = col_heads[i];
                        if (i>1)
                            this_cell.style.textAlign = 'center';
                        if (i==6)
                        {
                            var listOfQuals = obj.quals.replace(/;/g,'\n');
                            listOfQuals = listOfQuals.replace(/\[(.*?)\]/g,'');
                            this_cell.title=listOfQuals;
                            if (obj.masters)
                            {
                                this_cell.className = "needmaster"+sufTheme;
                                this_cell.innerHTML="Y";
                            }
                            else
                            {
                                this_cell.className = "nomaster"+sufTheme;
                                this_cell.innerHTML="N";
                            }
                        }
                        if (check_hitDB)
                        {
                            if (i==7)
                            {
                                if (obj.reqdb){
                                    this_cell.className = "yeshitDB"+sufTheme;
                                    this_cell.title = "This requester name was found in your HitDB.";
                                    this_cell.addEventListener("click", (function (obj) { return function() {search_deleg(obj,0);}})(obj));
                                }
                                else {
                                    this_cell.className = "nohitDB"+sufTheme;
                                    this_cell.title = "This requester name was not found in your HitDB, or you don't have a HitDB.";
                                }
                            }
                            else if (i==8)
                            {
                                if (obj.titledb){
                                    this_cell.className = "yeshitDB"+sufTheme;
                                    this_cell.title = "This HIT title was found in your HitDB.";
                                    this_cell.addEventListener("click", (function (obj) { return function() {search_deleg(obj,1);}})(obj));
                                }
                                else {
                                    this_cell.className = "nohitDB"+sufTheme;
                                    this_cell.title = "This HIT title was not found in your HitDB, or you don't have a HitDB.";
                                }
                            }
                            else if (i==9)
                                this_cell.className = "tooweak"+sufTheme;
                        }
                        else if (i==7)
                            this_cell.className = "tooweak"+sufTheme;
                    }
                    if (Object.keys(scraper_history).length > 0)
                    {
                        if (obj.dinged == 0)
                        {
                            if (shouldInclude && !includelisted)
                            {
                                dings++;
                                obj.dinged = 2; //#hookdinged
                            }
                            else if (!shouldInclude)
                            {
                                dings++;
                                obj.dinged = 2;
                            }
                        }
                        if (obj.new_result < 1000*save_new_results_time)
                        {
                            if (ignored)
                                new_hits++;
                            for (var h = 0; h < col_heads.length; h++)
                            {
                                row.cells[h].style.fontSize = default_text_size + 1+"px";
                                row.cells[h].style.fontWeight = "bold";
                            }
                        }
                    }

                    var button1 = document.createElement('button'); // FORUM VBCODE EXPORT BUTTON
                    button1.textContent = 'vB';
                    button1.title = 'Export this HIT description as vBulletin formatted text';
                    button1.className = "vbButton";
                    button1.className += opt_exportvb.checked ? (" taButtons"+sufTheme) : (" taButtonsOff"+sufTheme);
                    button1.style.width = '30px';

                    var button2 = document.createElement('button'); //BUTTON TO BLOCK REQUESTER
                    button2.textContent = 'R';
                    button2.title = 'Add requester to block list';
                    button2.style.width = '15px';
                    button2.className += " taButtons"+sufTheme;

                    var button3 = document.createElement('button'); //BUTTON TO BLOCK TITLE
                    button3.textContent = 'T';
                    button3.title = 'Add title to block list';
                    button3.style.width = '15px';
                    button3.className += " taButtons"+sufTheme;

                    var button4 = document.createElement('button'); // IRC EXPORT BUTTON
                    button4.textContent = 'IRC';
                    button4.className = "ircButton";
                    button4.className += opt_exportirc.checked ? (" taButtons"+sufTheme) : (" taButtonsOff"+sufTheme);
                    button4.style.width = '30px';
                    button4.title = 'Click to save HIT information to your clipboard. Please wait while shortened URLs are retrieved.';

                    var button5 = document.createElement('button'); // REDDIT EXPORT BUTTON
                    button5.textContent = 'HWTF';
                    button5.style.width = '33px';
                    button5.className = "redditButton";
                    button5.className += opt_exportreddit.checked ? (" taButtons"+sufTheme) : (" taButtonsOff"+sufTheme);
                    button5.title = 'Export this HIT to r/HITsWorthTurkingFor title standards.'

                    button1.addEventListener("click", (function (obj,j) { return function() {export_sel_deleg(obj,j,"vb");}})(obj,j));
                    row.cells[1].appendChild(document.createTextNode(" "));
                    if (obj.rid != obj.req_link)
                        row.cells[1].appendChild(button1);
                    button4.addEventListener("click", (function (obj,j) { return function() {export_sel_deleg(obj,j,"irc");}})(obj,j));
                    row.cells[1].appendChild(document.createTextNode(" "));
                    row.cells[1].appendChild(button4);
                    button5.addEventListener("click", (function (obj,j) { return function() {export_sel_deleg(obj,j,"reddit");}})(obj,j));
                    row.cells[1].appendChild(document.createTextNode(" "));
                    row.cells[1].appendChild(button5);

                    button2.addEventListener("click", (function (obj,j) { return function() {block_deleg(obj,0);}})(obj,j));
                    row.cells[0].appendChild(document.createTextNode(" "));
                    row.cells[0].appendChild(button2);
                    button3.addEventListener("click", (function (obj,j) { return function() {block_deleg(obj,1);}})(obj,j));
                    row.cells[0].appendChild(button3);
                }
                //});

            }
            //url = url.substring(0,url.length - 1);
            //console.log(url);
            var success_flag = false;
            var rdata = "";
            if (useTO){
                if (ridString != "")
                    rdata = getTOMulti(ridString);
                else
                    rdata = "Scraper logged out";
            }
            else
                rdata = "TO Down";
            //var rdata = "TO Down";
            //console.log(rdata);
            if (rdata != "TO Down")
            {
                var globalMeans = { "pay":0, "paycount":0, "quality":0, "divisor":0, "reviews":0, "reviewcount":0 };

                for (var r = 0; r < rids.length; r++) { // calculate global values across entire table
                    if (rdata[rids[r]]) {
                        if (rdata[rids[r]].attrs.pay > 0) {
                            globalMeans.quality += rdata[rids[r]].attrs.pay * settings.options.toWeighting.pay;
                            globalMeans.pay += rdata[rids[r]].attrs.pay * 1.0;
                            globalMeans.paycount++;
                            globalMeans.divisor += settings.options.toWeighting.pay;
                        }
                        if (rdata[rids[r]].attrs.comm.trim() > 0) {
                            globalMeans.quality += rdata[rids[r]].attrs.comm.trim()*settings.options.toWeighting.comm;
                            globalMeans.divisor += settings.options.toWeighting.comm;
                        }
                        if (rdata[rids[r]].attrs.fast.trim() > 0) {
                            globalMeans.quality += rdata[rids[r]].attrs.fast.trim()*settings.options.toWeighting.fast;
                            globalMeans.divisor += settings.options.toWeighting.fast;
                        }
                        if (rdata[rids[r]].attrs.fair.trim() > 0) {
                            globalMeans.quality += rdata[rids[r]].attrs.fair.trim()*settings.options.toWeighting.fair;
                            globalMeans.divisor += settings.options.toWeighting.fair;
                        }
                        if (rdata[rids[r]].reviews > 0) {
                            globalMeans.reviews += rdata[rids[r]].reviews*1.0;
                            globalMeans.reviewcount++;
                        }
                    }
                }
                globalMeans.quality = globalMeans.divisor > 0 ? globalMeans.quality/globalMeans.divisor : 0;
                globalMeans.pay = globalMeans.paycount > 0 ? globalMeans.pay/globalMeans.paycount : 0;
                globalMeans.reviews = globalMeans.reviewcount > 0 ? globalMeans.reviews/globalMeans.reviewcount : 0;

                for (var r = 0; r < rids.length; r++)
                {
                    if (rdata[rids[r]])
                    {
                        var pay = rdata[rids[r]].attrs.pay*1.0;
                        var reviews = rdata[rids[r]].reviews*1.0;
                        var quality = 0;
                        var sum = 0;
                        var divisor = 0;
                        var count = 0;
                        var wpayrank = 0;
                        var wqualityrank = 0;
                        //console.log(rdata[rids[r]]);
                        var comm = rdata[rids[r]].attrs.comm.trim()*1.0;
                        var fair = rdata[rids[r]].attrs.fair.trim()*1.0;
                        var fast = rdata[rids[r]].attrs.fast.trim()*1.0;
                        var tos = rdata[rids[r]].tos_flags;
                        if (comm > 0)
                        {
                            sum += settings.options.toWeighting.comm*comm;
                            divisor += settings.options.toWeighting.comm;
                        }
                        if (pay > 0)
                        {
                            sum += settings.options.toWeighting.pay*pay;
                            divisor += settings.options.toWeighting.pay;
                        }
                        if (fair > 0)
                        {
                            sum += settings.options.toWeighting.fair*fair;
                            divisor += settings.options.toWeighting.fair;
                        }
                        if (fast > 0)
                        {
                            sum += settings.options.toWeighting.fast*fast;
                            divisor += settings.options.toWeighting.fast;
                        }
                        if (divisor > 0)
                        {
                            quality = sum/divisor;
                        }
                        var apay = (reviews * pay + 15) / (reviews + 5);
                        //wpayrank = ((globalMeans.pay - (pay/globalMeans.paycount)) + reviews * pay) / globalMeans.reviewcount; // simplification
                        //wpayrank = (globalMeans.reviews * (globalMeans.pay - (pay/globalMeans.paycount)) + (reviews * pay)) / globalMeans.reviewcount; // unit derivation
                        wpayrank = apay - 1.645 * Math.sqrt((Math.pow(1.061 * apay,2) - Math.pow(apay,2)) / (reviews + 5)); // pnormal alpha = 0.10
                        //wpayrank = (10*globalMeans.pay + reviews*pay)/(globalMeans.reviewcount+10); // minimalist, no zs/conf - large fluctuations
                        var aqual = (quality * reviews + 15)/(reviews + 5);
                        //wqualityrank = (15*globalMeans.quality + reviews*quality)/(reviews+15);
                        wqualityrank = aqual - 1.645 * Math.sqrt((Math.pow(1.0693 * aqual,2) - Math.pow(aqual,2)) / (reviews + 5)); // pnormal, alpha = 0.10
                        var titleText = "";
                        titleText += "comm: "+comm+"\nfair: "+fair+"\nfast: "+fast+"\npay: "+pay+"\nReviews: "+reviews+"\nTOS violations: "+tos;
                        titleText += "\n\nAdjusted pay rating: " + wpayrank.toPrecision(4) + "\nGlobal pay mean: " + globalMeans.pay.toPrecision(4);
                        titleText += "\nWeighted quality: " + quality.toPrecision(4) + "\nAdjusted quality rating: " + wqualityrank.toPrecision(4) + 
                            "\nGlobal quality mean: " + globalMeans.quality.toPrecision(4);
                        text_area.rows[r+1].cells[4].innerHTML = "<a class=\"tolink"+sufTheme+"\" href='"+ TO_REQ_URL+rids[r] +"' target='_blank'>" + pay.toFixed(2) + "</a>";
                        text_area.rows[r+1].cells[4].title += titleText;
                        text_area.rows[r+1].cells[4].dataset.simPay = pay;
                        text_area.rows[r+1].cells[4].dataset.adjPay = wpayrank.toPrecision(4);
                        text_area.rows[r+1].cells[4].dataset.simQual = quality.toPrecision(4);
                        text_area.rows[r+1].cells[4].dataset.adjQual = wqualityrank.toPrecision(4);
                        if (pay < MINIMUM_TO && text_area.rows[r+1].className.match(/(scraperBlocked|toBlocked)/) == null) {
                            text_area.rows[r+1].className += (showButton.textContent == "Hide ignored hits") ? " toBlockedRowOff" : " toBlockedRow";
                            belowThreshold_hits++;
                            for (var m=0; m<found_key_list.length; m++) {
                                if (dings > 0 && scraper_history[found_key_list[m]].rid == rids[r] && scraper_history[found_key_list[m]].dinged == 2) {
                                    //console.log("[threshold] "+scraper_history[found_key_list[m]].requester+"; initial dings: "+dings);
                                    dings--;
                                    scraper_history[found_key_list[m]].dinged = 1;
                                    //console.log("dings left: "+dings);
                                }
                            }
                        }
                        if (reviews > 4)
                        {
                            var copt = saveState.getItem("colorType") || "sim";
                            if (copt == "sim") {
                                if (quality > 4)
                                    text_area.rows[r+1].className += " toHigh"+sufTheme;
                                else if (quality > 3)
                                    text_area.rows[r+1].className += " toGood"+sufTheme;
                                else if (quality > 2)
                                    text_area.rows[r+1].className += " toAverage"+sufTheme;
                                else if (quality > 0)
                                    text_area.rows[r+1].className += " toPoor"+sufTheme;
                            }
                            else {
                                if (wqualityrank > 4.05)
                                    text_area.rows[r+1].className += " toHigh"+sufTheme;
                                else if (wqualityrank > 3.06)
                                    text_area.rows[r+1].className += " toGood"+sufTheme;
                                else if (wqualityrank > 2.4)
                                    text_area.rows[r+1].className += " toAverage"+sufTheme;
                                else if (wqualityrank > 1.7)
                                    text_area.rows[r+1].className += " toLow"+sufTheme;
                                else if (wqualityrank > 0)
                                    text_area.rows[r+1].className += " toPoor"+sufTheme;
                            }
                        }
                        else if (text_area.rows[r+1].className.match(/toNone/) == null) text_area.rows[r+1].className += " toNone"+sufTheme;
                    }
                    else if(rdata == "Scraper logged out")
                    {
                        text_area.rows[r+1].cells[4].innerHTML = "<a class=\"link"+sufTheme+"\" href='https://turkopticon.ucsd.edu/main/php_search?field=name&query="+rnames[r].replace(/ /g,'+') +"' target='_blank'>Search TO</a>";
                        text_area.rows[r+1].cells[4].setAttribute("title", "No Data");
                        text_area.rows[r+1].className += " toNone"+sufTheme;
                        if (block_no_to && text_area.rows[r+1].className.match(/(scraperBlocked|toBlocked)/) == null) {
                            text_area.rows[r+1].className += (showButton.textContent == "Hide ignored hits") ? " toBlockedRowOff" : " toBlockedRow";
                            belowThreshold_hits++;
                            for (var m=0; m<found_key_list.length; m++) {
                                if (dings > 0 && scraper_history[found_key_list[m]].rid == rids[r] && scraper_history[found_key_list[m]].dinged == 2) {
                                    //console.log("[nodata]"+scraper_history[found_key_list[m]].requester+"; initial dings: "+dings);
                                    dings--;
                                    scraper_history[found_key_list[m]].dinged = 1;
                                    //console.log("dings left: "+dings);
                                }
                            }
                        }
                    }
                    else
                    {
                        text_area.rows[r+1].cells[4].innerHTML = "<a class=\"link"+sufTheme+"\" href='"+ TO_REQ_URL+rids[r] +"' target='_blank'>No Data</a>";
                        text_area.rows[r+1].cells[4].setAttribute("title", "No Data");
                        text_area.rows[r+1].className += " toNone"+sufTheme;
                        if (block_no_to && text_area.rows[r+1].className.match(/(scraperBlocked|toBlocked)/) == null) {
                            text_area.rows[r+1].className += (showButton.textContent == "Hide ignored hits") ? " toBlockedRowOff" : " toBlockedRow";
                            belowThreshold_hits++;
                            for (var m=0; m<found_key_list.length; m++) {
                                if (dings > 0 && scraper_history[found_key_list[m]].rid == rids[r] && scraper_history[found_key_list[m]].dinged == 2) {
                                    //console.log("[nodata]"+scraper_history[found_key_list[m]].requester+"; initial dings: "+dings);
                                    dings--;
                                    scraper_history[found_key_list[m]].dinged = 1;
                                    //console.log("dings left: "+dings);
                                }
                            }
                        }
                    }
                }
                if (sort_TO) table_sort("pay");
                if (sort_TO2) table_sort("qual");

                success_flag = true;
            }
            var pStr = "Scrape complete. " + shown_hits + " HITs found (" + new_hits + " new results). ";
            if (!useBlock.checked) {
                if (blocklist_hits > 0) pStr += blocklist_hits + " HITs shown from blocklist.";
                if (belowThreshold_hits > 0) pStr += " " + belowThreshold_hits + " HITs below TO threshold."; 
                set_progress_report(pStr, false);
            }
            else {
                if (blocklist_hits > 0 || belowThreshold_hits > 0) pStr += (belowThreshold_hits+blocklist_hits) + " HITs ignored: ";
                if (blocklist_hits > 0) pStr += blocklist_hits + " from blocklist  ";
                if (belowThreshold_hits > 0) pStr += belowThreshold_hits + " below TO threshold.";
                set_progress_report(pStr, false);
            }
            if (!success_flag)
                for (var s = 0; s < rids.length; s++) 
                    if (text_area.rows[s+1].className.match(/toNone/) === null) text_area.rows[s+1].className += " toNone"+sufTheme;

            statusdetail_loop_finished = true;
            if (dings > 0){
                newHits(shouldDing);
            }
            if (SEARCH_REFRESH>0)
            {
                wait_loop = setTimeout(function(){if (global_run) start_it();}, 1000*SEARCH_REFRESH);
                display_wait_time(SEARCH_REFRESH);
            }
            else
            {
                global_run = false;
                big_red_button.textContent = "Start";
            }
        }
    }
}

function table_sort(stype) {
    //--- Get the table we want to sort.
    var jTableToSort = $("#body_table");

    //--- Get the rows to sort, but skip the first row, since it contains column titles.
    var jRowsToSort = jTableToSort.find ("tr:gt(0)");

    //--- Sort the rows in place.
    jRowsToSort.sort(function(a,b) {
        var opt = saveState.getItem("sortType") || "adj";
        var aVal = Number( $(a).find("td:eq(4)").attr("data-"+opt+"-"+stype) );
        var bVal = Number( $(b).find("td:eq(4)").attr("data-"+opt+"-"+stype) );
        //--- no TO goes to the bottom
        if (isNaN(aVal)) aVal = 0;
        if (isNaN(bVal)) bVal = 0;
        //--- sort
        if (sort_asc.checked) return aVal - bVal;
        else return bVal - aVal; // descending order
    }).appendTo(jTableToSort);
}

//--- check block list for requester name and HIT title
function ignore_check(r,t){
    var tempList = ignore_list.map(function(item) { return item.toLowerCase().replace(/\s+/g," "); });
    var foundR = -1;
    var foundT = -1;
    if (!settings.options.blocklistWildcards) { // wildcard matching disabled
        foundR = tempList.indexOf(r.toLowerCase().replace(/\s+/g," "));
        foundT = tempList.indexOf(t.toLowerCase().replace(/\s+/g," "));
    }
    else {
        var blockWilds = [], blockExact = [];
        blockExact = tempList.filter(function(item) { // separate wildcard glob patterns from regular exact patterns
            if (item.search(".*?[*].*")) return true; else if (item.length > 1) {blockWilds.push(item); return false;} 
        });
        // run default matching first
        foundR = blockExact.indexOf(r.toLowerCase().replace(/\s+/g," "));
        foundT = blockExact.indexOf(t.toLowerCase().replace(/\s+/g," "));
        // if no match, try globs
        if (foundR == -1 && foundT == -1) {
            for (var i=0; i<blockWilds.length; i++) {
                blockWilds[i] = blockWilds[i].replace(/([+${}[\](\)^|?.])/g, "\\$1");
                blockWilds[i] = "^".concat(blockWilds[i].replace(/([^*]|^)[*](?!\*)/g, "$1.*").replace(/\*{2,}/g, function(s) { return s.replace(/\*/g, "\\*") })).concat("$");
                foundR = r.toLowerCase().replace(/\s+/g," ").search(blockWilds[i]);
                foundT = t.toLowerCase().replace(/\s+/g," ").search(blockWilds[i]);
                if (foundR != -1 || foundT != -1)
                    break;
            }
        }
    }
    if (shouldInclude){  // if in Use Includelist mode, treat all HITs not matching the includelist as if they were on the blocklist
        //console.log(include_list);
        var temp = include_list.map(function(item) { return item.toLowerCase().replace(/\s+/g," "); }).indexOf(r.toLowerCase().replace(/\s+/g," "));
        console.log(temp);
        if (temp != -1)
            foundR = -1;
        else
            foundR = 0;
    }
    var found = foundR == -1 && foundT == -1;
    //console.log("r: "+r+" t: "+t+" f: "+found);
    return found;  // returns false (making !(include_check(x,y)) true) if HIT should be blocked, returns true if it shouldn't be blocked
}

// check include list for requester name and HIT title
function include_check(r,t){
    var tempList = include_list.map(function(item) { return item.toLowerCase().replace(/\s+/g," "); });
    var foundR = -1;
    var foundT = -1;
    foundR = tempList.indexOf(r.toLowerCase().replace(/\s+/g," "));
    foundT = tempList.indexOf(t.toLowerCase().replace(/\s+/g," "));
    var found = foundR == -1 && foundT == -1;
    return found;  // returns false (making !(include_check(x,y)) true) if HIT should be highlighted, returns true if it shouldn't be highlighted
}

function start_running()
{
    if (big_red_button.textContent == "Start")
    {
        status_array=[];
        ignore_list = GM_getValue("scraper_ignore_list").split('^');
        if (GM_getValue("scraper_include_list"))
            include_list = GM_getValue("scraper_include_list").split('^');
        global_run = true;
        initial_url = URL_BASE;

        if (search_input.value.length>0)
        {
            initial_url = initial_url.replace("searchWords=", "searchWords=" + search_input.value);
        }

        if (time_input.value.replace(/[^0-9]+/g,"") != "")
        {
            SEARCH_REFRESH = Number(time_input.value);
        }

        if (page_input.value.replace(/[^0-9]+/g,"") != "")
        {
            PAGES_TO_SCRAPE = Number(page_input.value);
            if (PAGES_TO_SCRAPE > 20 && document.getElementById('lnkWorkerSignin')){
                status_array.push("Search limited to 20 pages when logged out");
                PAGES_TO_SCRAPE = 20;
            }
        }

        if (new_time_display_input.value.replace(/[^0-9]+/g,"") != "")
        {
            save_new_results_time = Number(new_time_display_input.value);
        }

        if (reward_input.value.replace(/[^0-9]+/g,"") != "")
        {
            initial_url += "&minReward=" + reward_input.value;
        }
        else
        {
            initial_url += "&minReward=0.00";
        }

        if (qual_input.checked)
        {
            if (document.getElementById('lnkWorkerSignin')){
                status_array.push("Logged out, ignoring qualified");
                initial_url += "&qualifiedFor=off";
            }
            else
                initial_url += "&qualifiedFor=on";
        }
        else
        {
            initial_url += "&qualifiedFor=off";
        }

        if (masters_input.checked)
        {
            initial_url += "&requiresMasterQual=on";
        }

        if (masters_hide.checked)
        {
            status_array.push("Masters hits hidden");
        }

        switch (sort_input[sort_input.selectedIndex].value)
        {
            case "late":
                initial_url+= "&sortType=LastUpdatedTime%3A";
                type=1;
                default_type = 0;
                break;
            case "most":
                initial_url+= "&sortType=NumHITs%3A";
                default_type = 1;
                type=2;
                status_array.push("Sorting by NumHITs ignores Correct For Skips in favor of minimum batch size");
                break;
            case "amount":
                initial_url+= "&sortType=Reward%3A";
                type=3;
                default_type = 0;
                break;
            case "alpha":
                type=4;
                initial_url += "&sortType=Title%3A";
                break;
            default:
                alert("I don't know how you did it, but you broke it. Good job.");
        }

        if (min_input.value.replace(/[^0-9]+/g,"") != "")
        {
            if (type != 2)
                status_array.push("Minimum Batch Size requires sorting by Most Available");
            MINIMUM_HITS = Number(min_input.value);
        }

        if (sort_input_invert.checked)
        {
            if (sort_input[sort_input.selectedIndex].value == "alpha")
                initial_url += "1";
            else
                initial_url += "0";
        }
        else
        {
            if (sort_input[sort_input.selectedIndex].value == "alpha")
                initial_url += "0";
            else
                initial_url += "1";
        }   

        if (sort_to.checked)
        {
            if (document.getElementById('lnkWorkerSignin')){
                //logged_array.push("Logged out, ignoring TO");
                sort_TO = false;
                sort_TO2 = false;
            }
            else
            {
                sort_TO = true;
                sort_TO2 = false;
                status_array.push("Sorting by TO pay is still in testing");
            }
        }
        else if (sort_to2.checked) 
        {
            if (document.getElementById('lnkWorkerSignin')){
                status_array.push("Logged out, ignoring TO");
                sort_TO = false;
                sort_TO2 = false;
            }
            else
            {
                sort_TO2 = true;
                sort_TO= false;
                status_array.push("Sorting by TO quality is still in testing");
            }
        }
        else
        {
            sort_TO = false;
            sort_TO2 = false;
        }

        if (useTO_input.checked)
        {
            useTO = false;
        }
        else
        {
            useTO = true;
        }

        if (min_to.value.replace(/[^0-9]+/g,"") != "")
        {
            MINIMUM_TO = Number(min_to.value);
            $("#show_TO_stuff_button").show();
        }
        else
        {
            MINIMUM_TO = -1;
        }

        if (friesAreDone.checked)
        {
            shouldDing = true;
        }
        else 
        {
            shouldDing = false;
        }

        if (no_to_block.checked)
        {
            block_no_to = true;
            $("#show_TO_stuff_button").show();
        }
        else
        {
            block_no_to = false;
        }

        if (!block_no_to && MINIMUM_TO == -1)
            $("#show_TO_stuff_button").hide();

        if (correctForSkips.checked)
        {
            if (matchOnly.checked)
            {
                status_array.push("Use Includelist (match only) checked, so ignoring Correct For Skips to prevent issues");
                correct_for_skips = false;
            }
            else{
                correct_for_skips = true;
            }
        }
        else 
        {
            correct_for_skips = false;
        }

        if (useBlock.checked)
        {
            useBlocklist = true;
        }
        else
        {
            useBlocklist = false;
        }

        if (matchOnly.checked)
        {
            if (include_list.length == 0){
                status_array.push("No items in includelist, so ignoring Use Includelist checkbox");
                shouldInclude = false;
            }
            else
            {
                shouldInclude = true;
                if (!useBlock.checked)
                {
                    status_array.push("Use Includelist checked, so forcing Use Blocklist for intended output behavior");
                    useBlocklist = true;
                }
            }
        }
        else
        {
            shouldInclude = false;
        }

        initial_url += "&pageNumber=1&searchSpec=HITGroupSearch";
        audio_index = audio_option[audio_option.selectedIndex].value;
        start_it();
    }
    else
    {
        global_run = false;
        clearTimeout(wait_loop);
        big_red_button.textContent = "Start";
        set_progress_report("Stopped", true);
    }
}

function start_it()
{
    statusdetail_loop_finished = false;
    big_red_button.textContent = "Stop";
    found_key_list = [];
    var ctime = new Date().getTime();
    if (ctime - last_clear_time > save_results_time*666)
    {
        var last_history = scraper_history;
        scraper_history = {};
        for (var key in last_history)
        {
            if (last_history[key].new_result<save_results_time*1000)
            {
                scraper_history[key] = last_history[key];
                if (last_history[key].found_this_time)
                {
                    last_history[key].found_this_time = false;
                    if (last_history[key].new_result>save_new_results_time*1000)
                        last_history[key].initial_time = ctime-1000*save_new_results_time;
                }
            }

        }
        last_clear_time = ctime;
    }
    next_page = 1;
    statusdetail_loop(initial_url);
}

function themeSwitchAux(th, force) {
    var carr = $("[class*='"+sufTheme+"']");
    for (var i=0; i<carr.length; i++) {
        carr[i].className = carr[i].className.replace(/_[a-zA-Z]+/g, th);
    }
    sufTheme = th;
    saveState.setItem("theme",sufTheme);
}
function UIAux(span, checkbox, statename) {
    if (checkbox.checked) {
        checkbox.checked = false;
        span.className = span.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
    } else {
        checkbox.checked = true;
        span.className += " cpSpansOn"+sufTheme;
    }
    saveState.setItem(statename, checkbox.checked);
    saveState.save();
}
function colorSet(arr, loc, value, key) {
    var cc = {}, kc = "";
    if (sufTheme === "_thWisp") { cc = uwcolors; kc = "customwisp"; }
    else if (sufTheme === "_thSDark") { cc = usdcolors; kc = "customsd"; }
    else if (sufTheme === "_thSLight") { cc = uslcolors; kc = "customsl"; }
    else if (sufTheme === "_thCustom") { cc = ucucolors; kc = "customcustom"; }
    else if (sufTheme === "_thClassic") { cc = uclcolors; kc = "customclassic"; }
    cc[key] = '#'+value.toString();
    for (var j=0; j<arr.length; j++) {
        if (loc == "bg") arr[j].style.background = cc[key]; 
        else if (loc == "fg") arr[j].style.color = cc[key];
    }
    saveState.setItem(kc, cc);
    saveState.save();
}
function theme_editor() { //testinput.className = "color {hash:true, pickerFaceColor:'transparent',pickerFace:0,pickerBorder:0,pickerInsetColor:'black'}";
    var col = {};
    if (sufTheme === "_thWisp") col = uwcolors;
    else if (sufTheme === "_thSDark") col = usdcolors;
    else if (sufTheme === "_thSLight") col = uslcolors;
    else if (sufTheme === "_thCustom") col = ucucolors;
    else if (sufTheme === "_thClassic") col = uclcolors;
    else if (sufTheme === "_thRandom") col = rcolors;
    for (var i=0; i<thin.length; i++) { 
        var rebind = [];
        switch (i) {
            case 0: new jscolor.color(thin[i], {}).fromString(col.highlight);
                thin[i].title = "HIGHLIGHT: distinguishes between active and inactive states in the control panel";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".cpSpansOn"+sufTheme), 'bg', this, 'highlight'); }});
                col.highlight = thin[i].value;
                break;
            case 1: new jscolor.color(thin[i], {}).fromString(col.background);
                thin[i].title = "BACKGROUND: background color";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".body"+sufTheme+", .cpInput"+sufTheme), 'bg', this, 'background'); }});
                break;
            case 2: new jscolor.color(thin[i], {}).fromString(col.cpBackground);
                thin[i].title = "CP-BACKGROUND: background color of the control panel";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".cpSpans"+sufTheme+", .controlpanel"+sufTheme), 'bg', this, 'cpBackground'); }});
                break;
            case 3: new jscolor.color(thin[i], {}).fromString(col.accent);
                thin[i].title = "ACCENT: color of spacer text and control panel buttons";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".spacer"+sufTheme+", .cpButtons"+sufTheme), 'fg', this, 'accent'); }});
                break;
            case 4: new jscolor.color(thin[i], {}).fromString(col.bodytable);
                thin[i].title = "BODYTABLE: default text color of results table";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".bodytable"+sufTheme), 'fg', this, 'bodytable'); }});
                break;
            case 5: new jscolor.color(thin[i], {}).fromString(col.highTO);
                thin[i].title = "HIGH-TO: color for results with high TO";
                if (sufTheme === "_thClassic") 
                    rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                            function() { colorSet(document.querySelectorAll(".toHigh"+sufTheme), 'bg', this, 'highTO'); }});
                else 
                    rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                            function() { colorSet(document.querySelectorAll(".toHigh"+sufTheme+" .link"+sufTheme+", .toHigh"+sufTheme+" .tolink"+sufTheme), 'fg', this, 'highTO'); }});
                break;
            case 6: new jscolor.color(thin[i], {}).fromString(col.goodTO);
                thin[i].title = "GOOD-TO: color for results with good TO";
                if (sufTheme === "_thClassic") 
                    rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                            function() { colorSet(document.querySelectorAll(".toGood"+sufTheme), 'bg', this, 'goodTO'); }});
                else 
                    rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                            function() { colorSet(document.querySelectorAll(".toGood"+sufTheme+" .link"+sufTheme+", .toGood"+sufTheme+" .tolink"+sufTheme), 'fg', this, 'goodTO'); }});
                break;
            case 7: new jscolor.color(thin[i], {}).fromString(col.averageTO);
                thin[i].title = "AVERAGE-TO: color for results with mediocre TO";
                if (sufTheme === "_thClassic") 
                    rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                            function() { colorSet(document.querySelectorAll(".toAverage"+sufTheme), 'bg', this, 'toAverage'); }});
                else 
                    rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                            function() { colorSet(document.querySelectorAll(".toAverage"+sufTheme+" .link"+sufTheme+", .toAverage"+sufTheme+" .tolink"+sufTheme), 'fg', this, 'toAverage'); }});
                break;
            case 8: new jscolor.color(thin[i], {}).fromString(col.lowTO);
                thin[i].title = "LOW-TO: color for results with low TO";
                if (sufTheme === "_thClassic") 
                    rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                            function() { colorSet(document.querySelectorAll(".toLow"+sufTheme), 'bg', this, 'lowTO'); }});
                else 
                    rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                            function() { colorSet(document.querySelectorAll(".toLow"+sufTheme+" .link"+sufTheme+", .toLow"+sufTheme+" .tolink"+sufTheme), 'fg', this, 'lowTO'); }});
                break;
            case 9: new jscolor.color(thin[i], {}).fromString(col.poorTO);
                thin[i].title = "POOR-TO: color for results with terrible TO";
                if (sufTheme === "_thClassic") 
                    rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                            function() { colorSet(document.querySelectorAll(".toPoor"+sufTheme), 'bg', this, 'poorTO'); }});
                else 
                    rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                            function() { colorSet(document.querySelectorAll(".toPoor"+sufTheme+" .link"+sufTheme+", .toPoor"+sufTheme+" .tolink"+sufTheme), 'fg', this, 'poorTO'); }});
                break;
            case 10: new jscolor.color(thin[i], {}).fromString(col.noTO);
                thin[i].title = "NO-TO: color for results with no TO";
                if (sufTheme === "_thClassic") 
                    rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                            function() { colorSet(document.querySelectorAll(".toNone"+sufTheme), 'bg', this, 'noTO'); }});
                else 
                    rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                            function() { colorSet(document.querySelectorAll(".toNone"+sufTheme+" .link"+sufTheme+", .toNone"+sufTheme+" .tolink"+sufTheme), 'fg', this, 'noTO'); }});
                break;
            case 11: new jscolor.color(thin[i], {}).fromString(col.hitDB);
                thin[i].title = "HITDB: color for results found in your hitDB";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".yeshitDB"+sufTheme), 'bg', this, 'hitDB') }});
                break;
            case 12: new jscolor.color(thin[i], {}).fromString(col.nohitDB);
                thin[i].title = "NOHITDB: color for results not found in your hitDB";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".nohitDB"+sufTheme), 'bg', this, 'nohitDB'); }});
                break;
            case 13: new jscolor.color(thin[i], {}).fromString(col.unqualified);
                thin[i].title = "UNQUALIFIED: color for results for which you are unqualified";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".tooweak"+sufTheme), 'bg', this, 'unqualified'); }});
                break;
            case 14: new jscolor.color(thin[i], {}).fromString(col.reqmaster);
                thin[i].title = "REQMASTER: color for results which require masters";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".needmaster"+sufTheme), 'bg', this, 'reqmaster'); }});
                break;
            case 15: new jscolor.color(thin[i], {}).fromString(col.nomaster);
                thin[i].title = "NOMASTER: color for results which do not require masters";
                mat = document.querySelectorAll(".nomaster"+sufTheme);
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".nomaster"+sufTheme), 'bg', this, 'nomaster'); }});
                break;
            case 16: new jscolor.color(thin[i], {}).fromString(col.defaultText);
                thin[i].title = "DEFAULT-TEXT: default text color";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".controlpanel"+sufTheme+", .cpspans"+sufTheme+", .mainlink"+sufTheme+", .tabhead"+sufTheme), 'fg', this, 'defaultText'); }});
                break;
            case 17: new jscolor.color(thin[i], {}).fromString(col.inputText);
                thin[i].title = "INPUT-TEXT: color for the input boxes";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".cpInput"+sufTheme+", .cpSortdiv"+sufTheme), 'fg', this, 'inputText'); }});
                break;
            case 18: new jscolor.color(thin[i], {}).fromString(col.secondText);
                thin[i].title = "SECOND-TEXT: color of secondary text (status bar, highlighted control panel buttons)";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".cpSpansOn"+sufTheme+", .statusdiv"+sufTheme), 'fg', this, 'secondText'); }});
                break;
            case 19: new jscolor.color(thin[i], {}).fromString(col.link);
                thin[i].title = "LINK: default link color";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".link"+sufTheme+":link"), 'fg', this, 'link'); }});
                break;
            case 20: new jscolor.color(thin[i], {}).fromString(col.vlink);
                thin[i].title = "VLINK: default visited link color";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".link"+sufTheme+":visited"), 'fg', this, 'vlink'); }});
                break;
            case 21: new jscolor.color(thin[i], {}).fromString(col.export);
                thin[i].title = "EXPORT: color of buttons within the results table";
                mat = document.querySelectorAll(".toButtons"+sufTheme);
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".toButtons"+sufTheme), 'fg', this, 'export'); }});
                break;
            case 22: new jscolor.color(thin[i], {}).fromString(col.hover);
                thin[i].title = "HOVER: color of control panel options on mouseover";
                rebind[i] = new jscolor.color(thin[i], {"hash":true,"pickerBorder":0,"pickerFace":2,"onImmediateChange":
                                                        function() { colorSet(document.querySelectorAll(".cpSpans"+sufTheme+":hover"), 'bg', this, 'hover'); }});
                break;
        }
    }
}

function show_interface()
{
    //--- dynamic theme switching
    //theme_editor();
    var themeMenu = document.createElement("UL");
    var thC2 = document.createElement("UL");
    var thT1 = document.createElement("LI");
    var thT2 = document.createElement("LI");
    var thT3 = document.createElement("LI");
    var thT4 = document.createElement("LI");
    var thT5 = document.createElement("LI");
    var thT6 = document.createElement("LI");
    var thT7 = document.createElement("LI");
    var thE0 = document.createElement("LI");
    themeMenu.id = "thMenu";
    thE0.innerHTML = " &#9670; ";
    thE0.style.width = '20px';
    thT1.textContent = "Solarium:Dark Theme";
    thT2.textContent = "Solarium:Light Theme";
    thT3.textContent = "Whisper Theme";
    thT6.textContent = "Classic Theme";
    thT4.textContent = "Deluge Theme";
    thT7.textContent = !show_checkboxes.checked ? "Show checkboxes!" : "Remove Checkboxes!";
    thT5.textContent = "I'm Feelin' Lucky";
    thT7.addEventListener("click", function() {
        if (show_checkboxes.checked){  
            var mt = document.getElementsByClassName("checkboxes")
            for (var i=mt.length-1; i>-1; i--) mt[i].className = mt[i].className+"Off";
            show_checkboxes.checked = false;
            thT7.textContent = "Show Checkboxes!";
            saveState.setItem("checkboxes", show_checkboxes.checked);
        }
        else {
            var mt = document.getElementsByClassName("checkboxesOff")
            for (var i=mt.length-1; i>-1; i--) mt[i].className = mt[i].className.replace(/Off/, "");
            show_checkboxes.checked = true;
            thT7.textContent = "Hide Checkboxes!";
            saveState.setItem("checkboxes", show_checkboxes.checked);
        }
        saveState.setItem("checkboxes", show_checkboxes.checked);
        saveState.save();
    });
    thT1.addEventListener("click", function() { themeSwitchAux("_thSDark"); saveState.save(); }, false);
    thT2.addEventListener("click", function() { themeSwitchAux("_thSLight"); saveState.save();}, false);
    thT3.addEventListener("click", function() { themeSwitchAux("_thWisp"); saveState.save();}, false);
    thT4.addEventListener("click", function() { themeSwitchAux("_thCustom"); saveState.save();}, false);
    thT5.addEventListener("click", function() { themeSwitchAux("_thRandom"); saveState.save();}, false);
    thT6.addEventListener("click", function() { themeSwitchAux("_thClassic"); saveState.save();}, false);
    thC2.appendChild(thT7);
    thC2.appendChild(thT6);
    thC2.appendChild(thT2);
    thC2.appendChild(thT3);
    thC2.appendChild(thT1);
    thC2.appendChild(thT4);
    thC2.appendChild(thT5);
    thE0.appendChild(thC2);
    themeMenu.appendChild(thE0);
    control_panel.parentNode.insertBefore(themeMenu, control_panel);
    //---

    var spacer = document.createElement("SPAN");
    spacer.className = "spacer"+sufTheme;
    spacer.appendChild(document.createTextNode(SPACER_TEXT));

    control_panel.style.fontSize = "14px";
    //control_panel.removeChild(big_red_button);
    control_panel.appendChild(document.createTextNode("Auto-refresh delay: "));
    time_input.onkeydown = function(event){if (event.keyCode == 13){start_running();}};
    time_input.title = "Enter search refresh delay in seconds.\n" + "Enter 0 for no auto-refresh.\n" + "Default is 0 (no auto-refresh).";
    time_input.size = 3;
    time_input.className = "cpInput"+sufTheme;
    time_input.addEventListener("keyup", function() {
        time_input.value = time_input.value.replace(/.*?(\d+)?.*/, '$1');
        if (time_input.value >= 0) {
            saveState.setItem("refreshTime", time_input.value);
            saveState.save();
        }
    } );
    control_panel.appendChild(time_input);

    control_panel.appendChild(document.createTextNode("   "));

    control_panel.appendChild(spacer);
    control_panel.appendChild(document.createTextNode("Pages to scrape: "));
    page_input.onkeydown = function(event){if (event.keyCode == 13){start_running();}};
    page_input.title = "Enter number of pages to scrape. Default is 3.\n" + "Has no effect in a batch search (Most Available sort).";
    page_input.size = 3;
    page_input.className = "cpInput"+sufTheme;
    page_input.addEventListener("keyup", function() {
        page_input.value = page_input.value.replace(/.*?(\d+)?.*/, '$1');
        if (page_input.value > 0) {
            saveState.setItem("numPages", page_input.value);
            saveState.save();
        }
    } );
    control_panel.appendChild(page_input);

    var skipspan = document.createElement("SPAN");
    skipspan.appendChild(document.createTextNode("Correct for skips"));
    skipspan.className += " cpSpans"+sufTheme;
    skipspan.title = "Searches additional pages to get a more consistent number of results. Helpful if you're blocking a lot of items.";
    if (correctForSkips.checked) skipspan.className += " cpSpansOn"+sufTheme;
    skipspan.addEventListener("click", function() {
        UIAux(skipspan, correctForSkips, "skips");
    }, false);
    if (show_checkboxes.checked) correctForSkips.className = "checkboxes";
    else correctForSkips.className = "checkboxesOff";
    skipspan.appendChild(correctForSkips);
    correctForSkips.onclick = function () { UIAux(skipspan, correctForSkips, "skips"); };
    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(skipspan);

    control_panel.appendChild(document.createTextNode("   "));

    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(document.createTextNode("Minimum batch size: "));
    min_input.onkeydown = function(event){if (event.keyCode == 13){start_running();}};
    min_input.title = "Enter minimum HITs for batch search (must Sort by Most Available).\n" + "Default is 100.";
    min_input.size = 3;
    min_input.className = "cpInput"+sufTheme;
    min_input.addEventListener("keyup", function() {
        min_input.value = min_input.value.replace(/.*?(\d+)?.*/, '$1');
        if (min_input.value >= 0) {
            saveState.setItem("minHits", min_input.value);
            saveState.save();
        }
    } );
    control_panel.appendChild(min_input);
    control_panel.appendChild(document.createTextNode("   "));

    control_panel.appendChild(document.createElement("P"));
    control_panel.appendChild(document.createTextNode("Minimum reward: "));
    reward_input.size = 3;
    reward_input.title = "Enter the minimum desired pay per HIT, such as 0.10";
    reward_input.onkeydown = function(event){if (event.keyCode == 13){start_running();}};
    reward_input.className = "cpInput"+sufTheme;
    reward_input.addEventListener("keyup", function() {
        reward_input.value = reward_input.value.replace(/.*?(\d*\.?\d*)?.*/, '$1');
        if (reward_input.value >= 0) {
            saveState.setItem("reward", reward_input.value);
            saveState.save();
        }
    } );
    control_panel.appendChild(reward_input);

    var qualspan = document.createElement("SPAN");
    qualspan.appendChild(document.createTextNode("Qualified"));
    qualspan.className += " cpSpans"+sufTheme;
    qualspan.title = "Only show HITs you're currently qualified for (must be logged in).";
    if (qual_input.checked) qualspan.className += " cpSpansOn"+sufTheme;
    qualspan.addEventListener("click", function() {
        UIAux(qualspan, qual_input, "qualified");
    }, false);
    if (show_checkboxes.checked) qual_input.className = "checkboxes";
    else qual_input.className = "checkboxesOff";
    qualspan.appendChild(qual_input);
    qual_input.onclick = function () { UIAux(qualspan, qual_input, "qualified"); };
    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(qualspan);

    var forcemastersspan = document.createElement("SPAN");
    forcemastersspan.appendChild(document.createTextNode("Masters Only"));
    forcemastersspan.className += " cpSpans"+sufTheme;
    forcemastersspan.title = "Only show HITs that require Masters qualifications.";
    if (masters_input.checked) forcemastersspan.className += " cpSpansOn"+sufTheme;
    forcemastersspan.addEventListener("click", function() {
        UIAux(forcemastersspan, masters_input, "masters");
    }, false);
    if (show_checkboxes.checked) masters_input.className = "checkboxes";
    else masters_input.className = "checkboxesOff";
    forcemastersspan.appendChild(masters_input);
    masters_input.onclick = function () { UIAux(forcemastersspan, masters_input, "masters"); };
    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(forcemastersspan);

    var mhidespan = document.createElement("SPAN");
    mhidespan.appendChild(document.createTextNode("Hide Masters"));
    mhidespan.className += " cpSpans"+sufTheme;
    mhidespan.title = "Remove masters hits from the results if selected, otherwise display both masters and non-masters HITS.\nThe \"qualified\" setting superceedes this option.";
    if (masters_hide.checked) mhidespan.className += " cpSpansOn"+sufTheme;
    mhidespan.addEventListener("click", function() {
        UIAux(mhidespan, masters_hide, "mShow");
    }, false);
    if (show_checkboxes.checked) masters_hide.className = "checkboxes";
    else masters_hide.className = "checkboxesOff";
    mhidespan.appendChild(masters_hide);
    masters_hide.onclick = function () { UIAux(mhidespan, masters_hide, "mShow"); };
    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(mhidespan);

    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(document.createTextNode("Sort type: "));
    control_panel.appendChild(sort_input);
    sort_input.className += " cpInput"+sufTheme;
    sort_input.addEventListener('change', function() {
        var search = this.selectedIndex;
        console.log(search);
        saveState.setItem("sort", search);
        saveState.save();
    });
    sort_input.title = "Get search results by...\n Latest = HIT Creation Date (newest first),\n Most Available = HITs Available (most first),\n Reward = Reward Amount (most first),\n Title = Title (A-Z)";

    var sinvertspan = document.createElement("SPAN");
    sinvertspan.appendChild(document.createTextNode("Invert"));
    sinvertspan.className += " cpSpans"+sufTheme;
    sinvertspan.title = "Reverse the order of the Sort Type choice, so...\n Latest = HIT Creation Date (oldest first),\n Most Available = HITs Available (least first),\n Reward = Reward Amount (least first),\n Title = Title (Z-A)";
    if (sort_input_invert.checked) sinvertspan.className += " cpSpansOn"+sufTheme;
    sinvertspan.addEventListener("click", function() {
        UIAux(sinvertspan, sort_input_invert, "invert");
    }, false);
    if (show_checkboxes.checked) sort_input_invert.className = "checkboxes";
    else sort_input_invert.className = "checkboxesOff";
    sinvertspan.appendChild(sort_input_invert);
    sort_input_invert.onclick = function () { UIAux(sinvertspan, sort_input_invert, "invert"); };
    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(sinvertspan);

    control_panel.appendChild(document.createElement("P"));
    control_panel.appendChild(document.createTextNode("New HIT highlighting: "));
    new_time_display_input.onkeydown = function(event){if (event.keyCode == 13){start_running();}};
    new_time_display_input.title = "Enter time (in seconds) to keep new HITs highlighted.\n" + "Default is 300 (5 minutes).";
    new_time_display_input.size = 6;
    new_time_display_input.className = "cpInput"+sufTheme;
    new_time_display_input.addEventListener("keyup", function() {
        new_time_display_input.value = new_time_display_input.value.replace(/.*?(\d*)?.*/, '$1');
        if (new_time_display_input.value >= 0) {
            saveState.setItem("newHitHighlight", new_time_display_input.value);
            saveState.save();
        }
    } );
    control_panel.appendChild(new_time_display_input);

    var soundspan = document.createElement("SPAN");
    soundspan.appendChild(document.createTextNode("Sound on new HIT "));
    soundspan.className += " cpSpans"+sufTheme;
    soundspan.title = "Play a sound when new results are found.";
    if (friesAreDone.checked) soundspan.className += " cpSpansOn"+sufTheme;
    audio_option.className += " cpInput"+sufTheme;
    soundspan.addEventListener("click", function() {
        if (friesAreDone.checked) {
            friesAreDone.checked = false;
            soundspan.className = soundspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
            control_panel.removeChild(audio_option);
        } else {
            friesAreDone.checked = true;
            soundspan.className += " cpSpansOn"+sufTheme;
            control_panel.insertBefore(audio_option, soundspan.nextSibling);
        }
        saveState.setItem("fries", friesAreDone.checked);
        saveState.save();
    }, false);
    if (show_checkboxes.checked) friesAreDone.className = "checkboxes";
    else friesAreDone.className = "checkboxesOff";
    soundspan.appendChild(friesAreDone);
    friesAreDone.onclick = function () { UIAux(soundspan, friesAreDone, "fries"); };
    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(soundspan);
    audio_option.title = "Select which sound will be played.";
    audio_option.addEventListener('change', function() {
        var sound = this.selectedIndex;
        saveState.setItem("whichfry", sound);
        saveState.save();
    });
    if (friesAreDone.checked) control_panel.insertBefore(audio_option, soundspan.nextSibling);

    var ascspan = document.createElement("SPAN");
    ascspan.className += " cpSpans"+sufTheme;
    ascspan.style.fontSize = '15px';
    if (sort_asc.checked) ascspan.className += " cpSpansOn"+sufTheme;
    ascspan.title = "Sort results in ascending (low to high) order.";
    var dscspan = document.createElement("SPAN");
    dscspan.className += " cpSpans"+sufTheme;
    dscspan.style.fontSize = '15px';
    if (sort_dsc.checked) dscspan.className += " cpSpansOn"+sufTheme;
    dscspan.title = "Sort results in descending (high to low) order.";
    ascspan.addEventListener("click", function() { 
        if (!sort_asc.checked) { 
            sort_asc.checked = true; 
            sort_dsc.checked = false; 
            saveState.setItem("asc", sort_asc.checked);
            saveState.setItem("dsc", sort_dsc.checked);
            saveState.save();
            ascspan.className += " cpSpansOn"+sufTheme; 
            dscspan.className = dscspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
        }
    }, false);
    sort_asc.addEventListener("click", function() {
        saveState.setItem("asc", sort_asc.checked);
        saveState.setItem("dsc", sort_dsc.checked);
        saveState.save();
        ascspan.className += " cpSpansOn"+sufTheme; 
        dscspan.className = dscspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
    }, false);
    dscspan.addEventListener("click", function() { 
        if (!sort_dsc.checked) { 
            sort_dsc.checked = true;
            sort_asc.checked = false;
            saveState.setItem("asc", sort_asc.checked);
            saveState.setItem("dsc", sort_dsc.checked);
            saveState.save();
            dscspan.className += " cpSpansOn"+sufTheme; 
            ascspan.className = ascspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
        }
    }, false);
    sort_dsc.addEventListener("click", function() {
        saveState.setItem("asc", sort_asc.checked);
        saveState.setItem("dsc", sort_dsc.checked);
        saveState.save();
        dscspan.className += " cpSpansOn"+sufTheme; 
        ascspan.className = ascspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
    }, false);
    if (show_checkboxes.checked) {
        sort_asc.className = "checkboxes";
        sort_dsc.className = "checkboxes";
    }
    else {
        sort_asc.className = "checkboxesOff";
        sort_dsc.className = "checkboxesOff";
    }
    var sortdiv = document.createElement("DIV");
    sortdiv.className = "cpSortdiv"+sufTheme;
    sortdiv.appendChild(document.createTextNode(" ("));
    sortdiv.appendChild(ascspan);
    sortdiv.appendChild(dscspan);
    sortdiv.appendChild(document.createTextNode(")"));
    ascspan.innerHTML = " &#9650; ";
    ascspan.appendChild(sort_asc);
    //ascspan.appendChild(sort_asc);
    dscspan.innerHTML = "&nbsp;&#9660; ";
    dscspan.appendChild(sort_dsc);
    //dscspan.appendChild(sort_dsc);

    var topayspan = document.createElement("SPAN");
    var toqualspan = document.createElement("SPAN");
    topayspan.appendChild(document.createTextNode("Sort by TO pay"));
    topayspan.className += " cpSpans"+sufTheme;
    topayspan.title = "After getting search results based on the other selected options,\n" + "re-sort the results based on their average Turkopticon pay ratings. (Bayesian adjusted)";
    if (sort_to.checked) {
        topayspan.className += " cpSpansOn"+sufTheme;
    } else topayspan.className = topayspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
    topayspan.addEventListener("click", function() {
        if (sort_to.checked) {
            sort_to.checked = false; 
            control_panel.removeChild(sortdiv);
            topayspan.className = topayspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
        } else {
            sort_to.checked = true;
            sort_to2.checked = false;
            control_panel.insertBefore(sortdiv, topayspan.nextSibling);
            toqualspan.className = toqualspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
            topayspan.className += " cpSpansOn"+sufTheme;
        }
        saveState.setItem("to", sort_to.checked);
        saveState.setItem("to2", sort_to2.checked);
        saveState.save();
    }, false);
    if (show_checkboxes.checked) sort_to.className = "checkboxes";
    else sort_to.className = "checkboxesOff";
    topayspan.appendChild(sort_to);
    sort_to.onclick = function () { UIAux(topayspan, sort_to, "to"); };
    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(topayspan);
    if (sort_to.checked) control_panel.insertBefore(sortdiv, topayspan.nextSibling);

    toqualspan.style.cursor = 'default';
    toqualspan.appendChild(document.createTextNode("Sort by TO overall"));
    toqualspan.className += " cpSpans"+sufTheme;
    toqualspan.title = "After getting search results based on the other selected options,\n" + "re-sort the results by their overall Turkopticon rating. (Bayesian adjusted)";
    if (sort_to2.checked) {
        toqualspan.className += " cpSpansOn"+sufTheme;
    } else toqualspan.className = toqualspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
    toqualspan.addEventListener("click", function() {
        if (sort_to2.checked) {
            sort_to2.checked = false; 
            control_panel.removeChild(sortdiv);
            toqualspan.className = toqualspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
        } else {
            sort_to2.checked = true;
            sort_to.checked = false; 
            control_panel.insertBefore(sortdiv, toqualspan.nextSibling);
            topayspan.className = topayspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
            toqualspan.className += " cpSpansOn"+sufTheme;
        }
        saveState.setItem("to", sort_to.checked);
        saveState.setItem("to2", sort_to2.checked);
        saveState.save();
    }, false);
    if (show_checkboxes.checked) sort_to2.className = "checkboxes";
    else sort_to2.className = "checkboxesOff";
    toqualspan.appendChild(sort_to2);
    sort_to2.onclick = function () { UIAux(toqualspan, sort_to2, "to2"); };
    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(toqualspan);
    if (sort_to2.checked) control_panel.insertBefore(sortdiv, toqualspan.nextSibling);

    control_panel.appendChild(document.createElement("P"));
    control_panel.appendChild(document.createTextNode("Min pay TO: "));
    control_panel.appendChild(min_to);
    min_to.size = 3;
    min_to.className = "cpInput"+sufTheme;
    min_to.addEventListener("keyup", function() {
        min_to.value = min_to.value.replace(/.*?(\d*\.?\d*)?.*/, '$1');
        if (min_to.value >= 0) {
            saveState.setItem("minTO", min_to.value);
            saveState.save();
        }
    } );
    min_to.title = "After getting search results based on the other selected options,\n" + "hide any results below this average Turkopticon pay rating.\n" + "Minimum is 1, maximum is 5, decimals up to 2 places, such as 3.25";

    var hidenotospan = document.createElement("SPAN");
    hidenotospan.appendChild(document.createTextNode("Hide no TO"));
    hidenotospan.className += " cpSpans"+sufTheme;
    hidenotospan.title = "After getting search results based on the other selected options,\n" + "hide any results that have no Turkopticon pay ratings yet.";
    if (no_to_block.checked) hidenotospan.className += " cpSpansOn"+sufTheme;
    hidenotospan.addEventListener("click", function() {
        UIAux(hidenotospan, no_to_block, "hideNTO");
    }, false);
    if (show_checkboxes.checked) no_to_block.className = "checkboxes";
    else no_to_block.className = "checkboxesOff";
    hidenotospan.appendChild(no_to_block);
    no_to_block.onclick = function () { UIAux(hidenotospan, no_to_block, "hideNTO"); };
    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(hidenotospan);

    var disabletospan = document.createElement("SPAN");
    disabletospan.appendChild(document.createTextNode("Disable TO"));
    disabletospan.className += " cpSpans"+sufTheme;
    disabletospan.title = "Disable attempts to download ratings data from Turkopticon for the results table.";
    if (useTO_input.checked) disabletospan.className += " cpSpansOn"+sufTheme;
    disabletospan.addEventListener("click", function() {
        UIAux(disabletospan, useTO_input, "useTO");
    }, false);
    if (show_checkboxes.checked) useTO_input.className = "checkboxes";
    else useTO_input.className = "checkboxesOff";
    disabletospan.appendChild(useTO_input);
    useTO_input.onclick = function () { UIAux(disabletospan, useTO_input, "useTO"); };
    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(disabletospan);

    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(document.createTextNode("Display export buttons: "));
    var vbspan = document.createElement("SPAN");
    vbspan.className += " cpSpans"+sufTheme;
    vbspan.title = 'Show a button to export the specified HIT with vBulletin formatted text.';
    if (opt_exportvb.checked) vbspan.className += " cpSpansOn"+sufTheme;
    vbspan.addEventListener("click", function(){ 
        var carr = document.getElementsByClassName('vbButton');
        if (!opt_exportvb.checked) {
            opt_exportvb.checked=true; vbspan.className += " cpSpansOn"+sufTheme;
            for (var i=0; i<carr.length; i++) 
                carr[i].className = carr[i].className.replace(/taButtonsOff/, "taButtons");
        } else {
            for (var i=0; i<carr.length; i++)
                carr[i].className = carr[i].className.replace(/taButtons/, "taButtonsOff");
            opt_exportvb.checked=false; vbspan.className = vbspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
        }
        saveState.setItem("exvb", opt_exportvb.checked);
        saveState.save();
    }, false);
    vbspan.appendChild(document.createTextNode(" VB "));
    if (show_checkboxes.checked) opt_exportvb.className = "checkboxes";
    else opt_exportvb.className = "checkboxesOff";
    vbspan.appendChild(opt_exportvb);
    opt_exportvb.onclick = function () { UIAux(vbspan, opt_exportvb, "exvb"); };
    control_panel.appendChild(vbspan);

    var ircspan = document.createElement("SPAN");
    ircspan.className += " cpSpans"+sufTheme;
    ircspan.title = 'Show a button to export the specified HIT streamlined for IRC.';
    if (opt_exportirc.checked) ircspan.className += " cpSpansOn"+sufTheme;
    ircspan.addEventListener("click", function(){
        var carr = document.getElementsByClassName('ircButton');
        if (!opt_exportirc.checked) {
            for (var i=0; i<carr.length; i++) 
                carr[i].className = carr[i].className.replace(/taButtonsOff/, "taButtons");
            opt_exportirc.checked=true; ircspan.className += " cpSpansOn"+sufTheme;
        } else {
            for (var i=0; i<carr.length; i++)
                carr[i].className = carr[i].className.replace(/taButtons/, "taButtonsOff");
            opt_exportirc.checked=false; ircspan.className = ircspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
        } 
        saveState.setItem("exirc", opt_exportirc.checked);
        saveState.save();
    }, false);
    ircspan.appendChild(document.createTextNode(" IRC "));
    if (show_checkboxes.checked) opt_exportirc.className = "checkboxes";
    else opt_exportirc.className = "checkboxesOff";
    ircspan.appendChild(opt_exportirc);
    opt_exportirc.onclick = function () { UIAux(ircspan, opt_exportirc, "exirc"); };
    control_panel.appendChild(ircspan);

    var redditspan = document.createElement("SPAN");
    redditspan.className += " cpSpans"+sufTheme;
    redditspan.title = 'Show a button to export the specified HIT formatted to r/HITsWorthTurkingFor standards .';
    if (opt_exportreddit.checked) redditspan.className += " cpSpansOn"+sufTheme;
    redditspan.addEventListener("click", function(){
        var carr = document.getElementsByClassName('redditButton');
        if (!opt_exportreddit.checked) {
            for (var i=0; i<carr.length; i++) 
                carr[i].className = carr[i].className.replace(/taButtonsOff/, "taButtons");
            opt_exportreddit.checked=true; redditspan.className += " cpSpansOn"+sufTheme;
        } else {
            for (var i=0; i<carr.length; i++)
                carr[i].className = carr[i].className.replace(/taButtons/, "taButtonsOff");
            opt_exportreddit.checked=false; redditspan.className = redditspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
        } 
        saveState.setItem("exreddit", opt_exportreddit.checked);
        saveState.save();
    }, false);
    redditspan.appendChild(document.createTextNode(" HWTF "));
    if (show_checkboxes.checked) opt_exportreddit.className = "checkboxes";
    else opt_exportreddit.className = "checkboxesOff";
    redditspan.appendChild(opt_exportreddit);
    opt_exportreddit.onclick = function () { UIAux(redditspan, opt_exportreddit, "exreddit"); };
    control_panel.appendChild(redditspan);

    control_panel.appendChild(document.createElement("P"));
    control_panel.appendChild(document.createTextNode("Search Terms: "));
    control_panel.appendChild(search_input);
    search_input.size = 20;
    search_input.title = "Enter keywords to search for.\n" + "Default is blank (no search terms).";
    search_input.placeholder="Enter search terms here";
    search_input.style.textAlign = "left";
    search_input.className = "cpInput"+sufTheme;
    search_input.addEventListener('keyup', function() {
        var value = this.value;
        saveState.setItem("searchTerms", value);
        saveState.save();
    });
    var blockspan = document.createElement("SPAN");
    blockspan.appendChild(document.createTextNode("Hide blocklisted"));
    blockspan.className += " cpSpans"+sufTheme;
    blockspan.title = "When enabled, hide HITs that match your blocklist.\n" + "When disabled, HITs that match your blocklist will be displayed with a red border.";
    if (useBlock.checked) blockspan.className += " cpSpansOn"+sufTheme;
    blockspan.addEventListener("click", function() {
        if (useBlock.checked) {
            var mt = document.getElementsByClassName("scraperBlockedRow");
            if (mt.length > 0) for (var i=mt.length-1; i>-1; i--) 
                mt[i].className = mt[i].className.replace(/scraperBlockedRow/, "scraperBlockedRowOff");
            useBlock.checked = false;
            blockspan.className = blockspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
        }
        else {
            var mt = document.getElementsByClassName("scraperBlockedRowOff");
            if (mt.length > 0) for (var i=mt.length-1; i>-1; i--) 
                mt[i].className = mt[i].className.replace(/scraperBlockedRowOff/, "scraperBlockedRow");
            useBlock.checked = true;
            blockspan.className += " cpSpansOn"+sufTheme;
        } 
        saveState.setItem("blocklist", useBlock.checked);
        saveState.save();
    }, false);
    if (show_checkboxes.checked) useBlock.className = "checkboxes";
    else useBlock.className = "checkboxesOff";
    blockspan.appendChild(useBlock);
    useBlock.onclick = function () { UIAux(blockspan, useBlock, "blocklist"); };
    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(blockspan);

    var includelistspan = document.createElement("SPAN");
    includelistspan.appendChild(document.createTextNode("Restrict to includelist"));
    includelistspan.className += " cpSpans"+sufTheme;
    includelistspan.title = "Show only HITs that match your includelist.\n" + "Be sure to edit your includelist first or no results will be displayed.";
    if (matchOnly.checked) includelistspan.className += " cpSpansOn"+sufTheme;
    includelistspan.addEventListener("click", function() {
        if (matchOnly.checked) {
            matchOnly.checked = false;
            includelistspan.className = includelistspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
        }
        else {
            matchOnly.checked = true;
            includelistspan.className += " cpSpansOn"+sufTheme;
        }
        saveState.setItem("useInclude", matchOnly.checked)
        saveState.save();
    }, false);
    if (show_checkboxes.checked) matchOnly.className = "checkboxes";
    else matchOnly.className = "checkboxesOff";
    includelistspan.appendChild(matchOnly);
    matchOnly.onclick = function () { UIAux(includelistspan, matchOnly, "useInclude"); };
    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(includelistspan);

    var highincspan = document.createElement("SPAN");
    highincspan.appendChild(document.createTextNode("Highlight Includelisted"));
    highincspan.className += " cpSpans"+sufTheme;
    highincspan.title = "Outline HITs that match your includelist with a dashed green border.";
    if (highlightIncludes_input.checked) highincspan.className += " cpSpansOn"+sufTheme;
    highincspan.addEventListener("click", function() {
        if (highlightIncludes_input.checked) {
            var mt = document.getElementsByClassName("scraperIncludelistedRow");
            if (mt.length > 0)
                for (var i=mt.length-1; i>-1; i--) { mt[i].className = mt[i].className.replace(/scraperIncludelistedRow/, "scraperIncludelistedRowOff"); }
            highlightIncludes_input.checked = false;
            highincspan.className = highincspan.className.replace(/(?:^| +)cpSpansOn_[a-zA-Z]+/g, "");
        }
        else {
            var mt = document.getElementsByClassName("scraperIncludelistedRowOff");
            if ( mt.length > 0)
                for (var i=mt.length-1; i>-1; i--) { mt[i].className = mt[i].className.replace(/scraperIncludelistedRowOff/, "scraperIncludelistedRow"); }
            highlightIncludes_input.checked = true;
            highincspan.className += " cpSpansOn"+sufTheme;
        } 
        saveState.setItem("highlightIncl", highlightIncludes_input.checked)
        saveState.save();
    }, false);
    if (show_checkboxes.checked) highlightIncludes_input.className = "checkboxes";
    else highlightIncludes_input.className = "checkboxesOff";
    highincspan.appendChild(highlightIncludes_input);
    highlightIncludes_input.onclick = function () { UIAux(highincspan, highlightIncludes_input, "highlightIncl"); };
    control_panel.appendChild(spacer.cloneNode(true));
    control_panel.appendChild(highincspan);
    control_panel.appendChild(document.createElement("BR"));
    control_panel.appendChild(document.createTextNode(" "));
    //------
    big_red_button.textContent = "Start";
    big_red_button.className += " cpButtons"+sufTheme;
    big_red_button.onclick = function(){start_running();};

    // open blocklist editor
    reset_blocks.textContent = "Edit Blocklist";
    reset_blocks.className += " cpButtons"+sufTheme;
    reset_blocks.setAttribute("id","blocklist_reset_button");
    reset_blocks.onclick = function(){
        //console.log("in");
        ignore_list = GM_getValue("scraper_ignore_list").split('^');
        var textarea = $("#block_text");
        var text = "";
        for (var i = 0; i < ignore_list.length; i++){
            text += ignore_list[i]+"^";
        }
        textarea.val(text.substring(0, text.length - 1));
        $("#block_div").show();
    };

    // open includelist editor
    include_button.textContent = "Edit Includelist";
    include_button.className += " cpButtons"+sufTheme;
    include_button.id = "includes_reset_button";
    include_button.onclick = function() {
        include_list = GM_getValue("scraper_include_list").split('^');
        var textarea = $("#include_text");
        var text = "";
        for (var i = 0; i < include_list.length; i++){
            text += include_list[i]+"^";
        }
        textarea.val(text.substring(0, text.length - 1));
        $("#include_div").show();
    };

    control_panel.appendChild(document.createElement("P"));
    text_area.style.fontWeight = "normal";
    text_area.createCaption().innerHTML = '<a class="mainlink'+sufTheme+'" target="_blank" href="https://greasyfork.org/en/scripts/2002-hit-scraper-with-export" title="Read the documentation for HIT Scraper With Export on its Greasyfork page.">HIT Scraper</a> Results';
    var col_heads = ['Requester','Title','Reward','# Avail','TO pay','Accept HIT','M?'];
    var row = text_area.createTHead().insertRow(0);
    text_area.caption.style.fontWeight = 800;
    text_area.caption.className = "tabhead"+sufTheme;
    text_area.caption.style.lineHeight = "1.25em";
    if (default_text_size > 10)
        text_area.cellPadding=Math.min(Math.max(1,Math.floor((default_text_size-10)/2)),5);
    //console.log(text_area.cellPadding);
    //text_area.cellPadding=2;
    text_area.caption.style.fontSize = "24px";
    text_area.rows[0].style.fontWeight = 800;
    for (var i=0; i<col_heads.length; i++)
    {
        var this_cell = row.insertCell(i);
        this_cell.innerHTML = col_heads[i];
        this_cell.style.fontSize = "14px";
        this_cell.className = "tabhead"+sufTheme;
        if (i > 1)
            this_cell.style.textAlign = 'center';
    }
    text_area.style.width = '100%';
    var table_div = document.createElement('div');
    table_div.className = "bodytable"+sufTheme;
    text_area.rows[0].className = "tabHead"+sufTheme;
    table_div.style.fontSize = "14px";
    document.body.insertBefore(table_div,control_panel.nextSibling);
    var header_hide_button = document.createElement('button');
    table_div.appendChild(big_red_button); // start/stop
    table_div.appendChild(document.createTextNode("   "));
    table_div.appendChild(header_hide_button); // hide control panel
    table_div.appendChild(document.createTextNode("   "));
    table_div.appendChild(reset_blocks); // blocklist editor
    table_div.appendChild(document.createTextNode("   "));
    table_div.appendChild(include_button); // includelist editor
    table_div.appendChild(document.createTextNode("   "));
    table_div.appendChild(showButton); // toggle ignored
    table_div.appendChild(document.createTextNode("   "));
    table_div.appendChild(btn01); // theme editor
    table_div.appendChild(document.createTextNode("   "));
    table_div.appendChild(settings.panel.accessButton); // settings
    $("#show_TO_stuff_button").hide();

    table_div.appendChild(document.createElement("P"));
    var statusdiv = document.createElement("DIV");
    statusdiv.className = "statusdiv"+sufTheme;
    statusdiv.appendChild(progress_report);
    statusdiv.appendChild(document.createElement("P"));
    statusdiv.appendChild(document.createTextNode("Status messages: "));
    statusdiv.appendChild(status_report);
    table_div.appendChild(statusdiv);
    if (document.getElementById('lnkWorkerSignin'))
    {
        var logged_out_warning = document.createElement("P");
        logged_out_warning.style.color = "#ff3300";
        logged_out_warning.innerHTML = "<b>ATTENTION: SCRAPER IS RUNNING WHILE LOGGED OUT. SOME DATA WILL BE MISSING. GO TO REQUESTER'S LINK IN LOGGED-IN WINDOW FOR FORUM EXPORT.</b> <a class=\"link"+sufTheme+"\" href='https://www.mturk.com/mturk/beginsignin'>Click here to sign in</a>";
        table_div.appendChild(logged_out_warning);
        table_div.appendChild(document.createElement("P"));
    }
    table_div.appendChild(text_area);
    header_hide_button.textContent = "Hide Panel";
    header_hide_button.className += " cpButtons"+sufTheme;
    header_hide_button.onclick = function(){
        if (header_hide_button.textContent == "Hide Panel"){
            $('#control_panel').hide(300);
            btn01.style.display = 'none';
            header_hide_button.textContent = "Show Panel";
        }
        else{
            $('#control_panel').show(300);
            btn01.style.display = 'initial';
            header_hide_button.textContent = "Hide Panel";
        }
    };
}

/********HIT EXPORT ADDITIONS*****/

var EDIT = false;
var HIT;

var TO_BASE = "http://turkopticon.ucsd.edu/";
var API_BASE = "https://mturk-api.istrack.in/";
var API_URL = API_BASE + "multi-attrs.php?ids=";

var DEFAULT_TEMPLATE = '[table][tr][td][b]Title:[/b] [url={prev_link}][COLOR=blue]{title}[/COLOR][/url] | [url={acc_link}]PANDA[/url]\n';
DEFAULT_TEMPLATE += '[b]Requester:[/b] [url=https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId={rid}][COLOR=blue]{requester}[/COLOR][/url]';
DEFAULT_TEMPLATE += ' [{rid}] ([url='+TO_BASE+'{rid}][COLOR=blue]TO[/COLOR][/url])';
DEFAULT_TEMPLATE += '\n[b]TO Ratings:[/b]{to_stuff}';
DEFAULT_TEMPLATE += '\n[b]Description:[/b] {description}';
DEFAULT_TEMPLATE += '\n[b]Time:[/b] {time}';
DEFAULT_TEMPLATE += '\n[b]Hits Available:[/b] {hits}';
DEFAULT_TEMPLATE += '\n[b]Reward:[/b] [COLOR=green][b]{reward}[/b][/COLOR]';
DEFAULT_TEMPLATE += '\n[b]Qualifications:[/b] {quals}[/td][/tr][/table]';

var TEMPLATE;
var EASYLINK;

if (typeof GM_getValue === 'undefined')
    TEMPLATE = null;
else {
    TEMPLATE = GM_getValue('HITScraper Template');
    EASYLINK = GM_getValue('HITScraper Easylink');
}
if (TEMPLATE == null) {
    TEMPLATE = DEFAULT_TEMPLATE;
}

function buildXhrUrl(rai) {
    var url = API_URL;
    var ri = rai;
    url += rai;
    return url;
}

function makeXhrQuery(url) {
    var xhr = new XMLHttpRequest();
    try{
        xhr.open('GET', url, false);
        xhr.send(null);
        return $.parseJSON(xhr.response);
    }
    catch(err){
        return "TO DOWN";
    }
}

function getNamesForEmptyResponses(rai, resp) {
    for (var rid in rai) {
        if (rai.hasOwnProperty(rid) && resp[rid] == "") {
            resp[rid] = $.parseJSON('{"name": "' + rai[rid][0].innerHTML + '"}');
        }
    }
    return resp;
}

function getKeys(obj) {
    var keys = [];
    for (var key in obj) {
        keys.push(key);
    }
    return keys;
}

function export_sel_deleg(item,index,extype) {
    //console.log(item);
    if (extype == "vb") export_func(item);
    else display(item, extype);
}

function block_deleg(item,index) {
    //console.log(item);
    block(item,index);
}

function block(hit,index){
    var blockType = ["requester_strip","title"];
    var blockThis = hit[blockType[index]].replace(/\s+/g," ").toLowerCase().trim();
    var r = confirm("Do you really want to block hits matching requester/title \""+blockThis+"\"?");
    if(r)
    {
        ignore_list.push(blockThis);
        GM_setValue("scraper_ignore_list",ignore_list.join('^'));
    }
}

function search_deleg(item,index) {
    //console.log(item);
    var searches = ["rid","title"];
    search(item,searches[index]);
}

function hit_sort_func()
{
    return function(a,b) {
        if (a.date == b.date) {
            if (a.requesterName < b.requesterName)
                return -1;
            if (a.requesterName > b.requesterName)
                return 1;
            if (a.title < b.title)
                return -1;
            if (a.title > b.title)
                return 1;
            if (a.status < b.status)
                return -1;
            if (a.status > b.status)
                return 1;
        }
        if (a.date > b.date)
            return 1;
        if (a.date < b.date)
            return -1;
    };
}

function escapeRegExp(str) {
    return str.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function search(item,search_type){
    //return true;/*

    if (!HITStorage.db) return;
    var results = [];
    HITStorage.db.transaction('HIT', 'readonly').objectStore('HIT').openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            hit = cursor.value;
            var keys = ['title', 'requesterId'];
            var re = new RegExp(escapeRegExp(item[search_type]),"ig");
            for (var k in keys)
                if (hit[keys[k]] != null && re.test(hit[keys[k]].trim()))
                    results.push(cursor.value);
            cursor.continue();
        }
        else {
            //console.log(results);
            results.sort(hit_sort_func());
            show_results(results);
        }
    };
}

function format_hit_line (hit, odd, status_color, new_day)
{
    var line = '<tr style="background-color:';
    if (odd)
        line += '#f1f3eb;';
    else
        line += 'white;';
    line += ' valign=top;';
    if (new_day)
        line += ' border: 0px dotted #000000; border-width: 2px 0px 0px 0px">';
    else
        line += '">';

    line += '<td>' + hit.date + '</td>';
    if (hit.requesterLink != null)
        line += '<td style="width:165px"><a href="' + hit.requesterLink + '" title="Contact this Requester">' + hit.requesterName + '</a></td>';
    else
        line += '<td style="width:165px">' + hit.requesterName + '</td>';
    line += '<td style="width:213px">' + hit.title + '</td>';
    line += '<td style="width:45px">$' + hit.reward.toFixed(2) + '</td>';
    line += '<td style="color:' + status_color + '; width:55px">' + hit.status + '</td>';
    line += '<td><div style="width:225px; overflow:hidden">' + hit.feedback + '</div></td>';
    line += '</tr>\n';
    return line;
}

function status_color (status)
{
    var color = "green";

    if (status.match("Pending Approval"))
        color = "orange";
    else if (status.match("Rejected"))
        color = "red";

    return color;
}

function show_results (results){
    var resultsWindow = window.open();
    resultsWindow.document.write("<html><head><title>Status Detail Search Results</title></head><body>\n");
    resultsWindow.document.write("<h1>HITs matching your search:</h1>\n");
    resultsWindow.document.write('<table style="border: 1px solid black;border-collapse:collapse;width:90%;margin-left:auto;margin-right:auto;">\n');
    resultsWindow.document.write('<tr style="background-color:lightgrey"><th>Date</th><th>Requester</th><th>HIT Title</th><th>Reward</th><th>Status</th><th>Feedback</th></tr>\n');

    var odd = true;
    var sum = 0;
    var sum_rejected = 0;
    var sum_approved = 0;
    var sum_pending = 0;


    var new_day = false;

    for (var i=0; i<results.length; i++) {
        odd = !odd;
        sum += results[i].reward;
        if (results[i].status == 'Rejected')
            sum_rejected += results[i].reward;
        else if (results[i].status == 'Pending Approval')
            sum_pending += results[i].reward;
        else
            sum_approved += results[i].reward;

        if (i>0 && (results[i-1].date != results[i].date))
            new_day = true;
        else
            new_day = false;
        resultsWindow.document.write(format_hit_line(results[i], odd, status_color(results[i].status), new_day ));
    }

    resultsWindow.document.write('<tr style="background-color:lightgrey"><th></th><th></th><th></th><th>$' + sum.toFixed(2) + '</th><th></th><th></th></tr>\n');
    resultsWindow.document.write("</table>");
    resultsWindow.document.write("<p>Found " + results.length + " matching HITs. $" + sum_approved.toFixed(2) + " approved, " +
                                 "$" + sum_rejected.toFixed(2) + " rejected and $" + sum_pending.toFixed(2) + " pending.</p>");
    resultsWindow.document.write("</body></html>");
    resultsWindow.document.close();
}    


// ----  vB

function export_func(item) {
    HIT = item;
    gedit_button.textContent = 'Edit Template';
    apply_template(item);
    gdiv.style.display = 'block';
    gtextarea.select();
}

function apply_template(hit_data) {
    var txt = TEMPLATE;

    var vars = ['title', 'requester', 'rid', 'description', 'reward', 'quals', 'prev_link', 'acc_link', 'time', 'hits', 'to_stuff', 'to_text'];

    var resp = null;
    if (txt.indexOf('{to_text}') >= 0 || txt.indexOf('{to_stuff}') >= 0){
        var url = buildXhrUrl(hit_data["rid"]);
        resp = getTOMulti(hit_data["rid"]);
        //console.log(resp);
    }
    var toText = "";
    var toStuff = "";
    var toData = "";
    var numResp = (resp == null || resp == "TO DOWN" ? "n/a" : resp[hit_data["rid"]].reviews);
    if (resp == "TO DOWN"){
        toStuff = " [URL=\""+TO_BASE+hit_data['rid']+"\"]TO down.[/URL]";
        toText = toStuff;
    }
    else if (resp == null || resp[hit_data["rid"]].attrs == null && resp != "TO DOWN") {
        toStuff = " No TO ";
        toText = " No TO ";
        toStuff += "[URL=\""+TO_BASE+"report?requester[amzn_id]=" + hit_data['rid'] + "&requester[amzn_name]=" + hit_data['requester'] + "\"]";
        toStuff += "(Submit a new TO rating for this requester)[/URL]";
    }
    else {
        for (var key in resp[hit_data["rid"]].attrs) {
            //toText += "\n[*]"+key+": "+resp[hit_data["requesterId"]].attrs[key]+"\n";
            var i = 0;
            var color = "green";
            var name = key;
            var num = Math.floor(resp[hit_data["rid"]].attrs[key]);
            switch (key){
                case "comm":
                    name = "Communicativity";
                    break;
                case "pay":
                    name = "Generosity";
                    break;
                case "fast":
                    name = "Promptness";
                    break;
                case "fair":
                    name = "Fairness";
                    break;
                default:
                    name = key;
                    break;
            }
            switch (num){
                case 0:
                    color = "red";
                    break;
                case 1:
                    color = "red";
                    break;
                case 2:
                    color = "orange";
                    break;
                case 3:
                    color = "yellow";
                    break;
                default:
                    break;
            }
            toText += (num > 0 ? "\n[color="+color+"]" : "\n");
            for (i; i < num; i++){
                toText += "[b]"+symbol+"[/b]";
            }
            toText += (num > 0 ? "[/color]" : "");
            if (i < 5){
                toText += "[color=white]";
                for (i; i < 5; i++)
                    toText += "[b]"+symbol+"[/b]";
                toText += "[/color]";
            }
            toText += " "+Number(resp[hit_data["rid"]].attrs[key]).toFixed(2)+" "+name;
            toData += Number(resp[hit_data["rid"]].attrs[key]).toFixed(2) + ",";
        }
        //toText += "[/list]";
        toText += (txt.indexOf('{to_stuff}') >= 0 ? "" : "\nNumber of Reviews: "+numResp+"\n[URL=\""+TO_BASE+"report?requester[amzn_id]=" + hit_data['rid'] + "&requester[amzn_name]=" + hit_data['requester'] + "\"](Submit a new TO rating for this requester)[/URL]");
        toStuff = '\n[img]http://data.istrack.in/to/' + toData.slice(0,-1) + '.png[/img]';
        toStuff += (txt.indexOf('{to_stuff}') >= 0 ? (txt.indexOf('{to_text}') >= 0 ? "" : toText) : "");
        toStuff += "\nNumber of Reviews: "+numResp;
        toStuff += "[URL=\""+TO_BASE+"report?requester[amzn_id]=" + hit_data['rid'] + "&requester[amzn_name]=" + hit_data['requester'] + "\"]";
        toStuff += "\n(Submit a new TO rating for this requester)[/URL]";
    }

    for (var u = 0; u < vars.length; u++) {
        var t = new RegExp('\{' + vars[u] + '\}', 'g');
        if (vars[u] == "to_stuff") {
            txt = txt.replace(t, toStuff);
        }
        else if (vars[u] == "to_text") {
            txt = txt.replace(t, toText);
        }
        else if (vars[u] == "prev_link") {
            txt = txt.replace(t,"https://www.mturk.com"+hit_data[vars[u]]);
        }
        else if (vars[u] == "acc_link") {
            txt = txt.replace(t,"https://www.mturk.com"+hit_data[vars[u]]);
        }
        else
            txt = txt.replace(t, hit_data[vars[u]]);
    }
    gtextarea.value = txt;
}

function export_irc(item) {
    display(item);
}

function apply_template(hit_data) {
    var txt = TEMPLATE;

    var vars = ['title', 'requester', 'rid', 'description', 'reward', 'quals', 'prev_link', 'acc_link', 'time', 'hits', 'to_stuff', 'to_text'];

    var resp = null;
    if (txt.indexOf('{to_text}') >= 0 || txt.indexOf('{to_stuff}') >= 0){
        var url = buildXhrUrl(hit_data["rid"]);
        resp = getTOMulti(hit_data["rid"]);
        //console.log(resp);
    }
    var toText = "";
    var toStuff = "";
    var toData = "";
    var numResp = (resp == null || resp == "TO DOWN" ? "n/a" : resp[hit_data["rid"]].reviews);
    if (resp == "TO DOWN"){
        toStuff = " [URL=\""+TO_BASE+hit_data['rid']+"\"]TO down.[/URL]";
        toText = toStuff;
    }
    else if (resp == null || resp[hit_data["rid"]].attrs == null && resp != "TO DOWN") {
        toStuff = " No TO ";
        toText = " No TO ";
        toStuff += "[URL=\""+TO_BASE+"report?requester[amzn_id]=" + hit_data['rid'] + "&requester[amzn_name]=" + hit_data['requester'] + "\"]";
        toStuff += "(Submit a new TO rating for this requester)[/URL]";
    }
    else {
        for (var key in resp[hit_data["rid"]].attrs) {
            //toText += "\n[*]"+key+": "+resp[hit_data["requesterId"]].attrs[key]+"\n";
            var i = 0;
            var color = "green";
            var name = key;
            var num = Math.floor(resp[hit_data["rid"]].attrs[key]);
            switch (key){
                case "comm":
                    name = "Communicativity";
                    break;
                case "pay":
                    name = "Generosity";
                    break;
                case "fast":
                    name = "Promptness";
                    break;
                case "fair":
                    name = "Fairness";
                    break;
                default:
                    name = key;
                    break;
            }
            switch (num){
                case 0:
                    color = "red";
                    break;
                case 1:
                    color = "red";
                    break;
                case 2:
                    color = "orange";
                    break;
                case 3:
                    color = "yellow";
                    break;
                default:
                    break;
            }
            toText += (num > 0 ? "\n[color="+color+"]" : "\n");
            for (i; i < num; i++){
                toText += "[b]"+symbol+"[/b]";
            }
            toText += (num > 0 ? "[/color]" : "");
            if (i < 5){
                toText += "[color=white]";
                for (i; i < 5; i++)
                    toText += "[b]"+symbol+"[/b]";
                toText += "[/color]";
            }
            toText += " "+Number(resp[hit_data["rid"]].attrs[key]).toFixed(2)+" "+name;
            toData += Number(resp[hit_data["rid"]].attrs[key]).toFixed(2) + ",";
        }
        //toText += "[/list]";
        toText += (txt.indexOf('{to_stuff}') >= 0 ? "" : "\nNumber of Reviews: "+numResp+"\n[URL=\""+TO_BASE+"report?requester[amzn_id]=" + hit_data['rid'] + "&requester[amzn_name]=" + hit_data['requester'] + "\"](Submit a new TO rating for this requester)[/URL]");
        toStuff = '\n[img]http://data.istrack.in/to/' + toData.slice(0,-1) + '.png[/img]';
        toStuff += (txt.indexOf('{to_stuff}') >= 0 ? (txt.indexOf('{to_text}') >= 0 ? "" : toText) : "");
        toStuff += "\nNumber of Reviews: "+numResp;
        toStuff += "[URL=\""+TO_BASE+"report?requester[amzn_id]=" + hit_data['rid'] + "&requester[amzn_name]=" + hit_data['requester'] + "\"]";
        toStuff += "\n(Submit a new TO rating for this requester)[/URL]";
    }

    for (var u = 0; u < vars.length; u++) {
        var t = new RegExp('\{' + vars[u] + '\}', 'g');
        if (vars[u] == "to_stuff") {
            txt = txt.replace(t, toStuff);
        }
        else if (vars[u] == "to_text") {
            txt = txt.replace(t, toText);
        }
        else if (vars[u] == "prev_link") {
            txt = txt.replace(t,"https://www.mturk.com"+hit_data[vars[u]]);
        }
        else if (vars[u] == "acc_link") {
            txt = txt.replace(t,"https://www.mturk.com"+hit_data[vars[u]]);
        }
        else
            txt = txt.replace(t, hit_data[vars[u]]);
    }
    gtextarea.value = txt;
}

function hide_func(div) {
    if (EDIT == false)
        div.style.display = 'none';
}

function edit_func() {
    if (EDIT == true) {
        EDIT = false;
        TEMPLATE = gtextarea.value;
        gedit_button.textContent = 'Edit Template';
        apply_template(HIT);
    }
    else {
        //console.log("Editing");
        EDIT = true;
        gedit_button.textContent = 'Show Changes';
        gsave_button.disabled = false;
        gtextarea.value = TEMPLATE;
    }
}

function default_func() {
    GM_deleteValue('HITScraper Template');
    TEMPLATE = DEFAULT_TEMPLATE;
    EDIT = false;
    gedit_button.textContent = 'Edit Template';
    apply_template(HIT);
}

function save_func() {
    if (EDIT)
        TEMPLATE = gtextarea.value;
    GM_setValue('HITScraper Template', TEMPLATE);
}

var gdiv = document.createElement('div');
var gtextarea = document.createElement('textarea');
var gdiv2 = document.createElement('label');

gdiv.style.position = 'fixed';
gdiv.style.width = '500px';
gdiv.style.height = '235px';
gdiv.style.left = '50%';
gdiv.style.right = '50%';
gdiv.style.margin = '-250px 0px 0px -250px';
gdiv.style.top = '300px';
gdiv.style.padding = '5px';
gdiv.style.border = '2px';
gdiv.style.backgroundColor = 'black';
gdiv.style.color = 'white';
gdiv.style.zIndex = '100';

gtextarea.style.padding = '2px';
gtextarea.style.width = '500px';
gtextarea.style.height = '200px';
gtextarea.title = '{title}\n{requester}\n{rid}\n{description}\n{reward}\n{quals}\n{prev_link}\n{time}\n{hit}\n{to_stuff}\n{to_text}';

gdiv.textContent = 'Press Ctrl+C to copy to clipboard. Click textarea to close';
gdiv.style.fontSize = '12px';
gdiv.appendChild(gtextarea);

var gedit_button = document.createElement('button');
var gsave_button = document.createElement('button');
var gdefault_button = document.createElement('button');
var geasy_button = document.createElement('button');

gedit_button.textContent = 'Edit Template';
gedit_button.setAttribute('id', 'edit_button');
gedit_button.style.height = '18px';
gedit_button.style.width = '100px';
gedit_button.style.fontSize = '10px';
gedit_button.style.paddingLeft = '3px';
gedit_button.style.paddingRight = '3px';
gedit_button.style.backgroundColor = 'white';

gsave_button.textContent = 'Save Template';
gsave_button.setAttribute('id', 'save_button');
gsave_button.style.height = '18px';
gsave_button.style.width = '100px';
gsave_button.style.fontSize = '10px';
gsave_button.style.paddingLeft = '3px';
gsave_button.style.paddingRight = '3px';
gsave_button.style.backgroundColor = 'white';
gsave_button.style.marginLeft = '5px';

geasy_button.textContent = 'Change Adfly Url';
geasy_button.setAttribute('id', 'easy_button');
geasy_button.style.height = '18px';
geasy_button.style.width = '100px';
geasy_button.style.fontSize = '10px';
geasy_button.style.paddingLeft = '3px';

gdefault_button.textContent = ' D ';
gdefault_button.setAttribute('id', 'default_button');
gdefault_button.style.height = '18px';
gdefault_button.style.width = '20px';
gdefault_button.style.fontSize = '10px';
gdefault_button.style.paddingLeft = '3px';
gdefault_button.style.paddingRight = '3px';
gdefault_button.style.backgroundColor = 'white';
gdefault_button.style.marginLeft = '5px';
gdefault_button.title = 'Return default template';

gdiv.appendChild(gedit_button);
gdiv.appendChild(gsave_button);
gdiv.appendChild(gdefault_button);
gdiv.appendChild(geasy_button);
gsave_button.disabled = true;

gdiv.style.display = 'none';
gtextarea.addEventListener("click", function() {hide_func(gdiv);}, false);
gedit_button.addEventListener("click", function() {edit_func();}, false);
gsave_button.addEventListener("click", function() {save_func();}, false);
gdefault_button.addEventListener("click", function() {default_func();}, false);
document.body.insertBefore(gdiv, document.body.firstChild);


//Functions below were added for the irc export with the help of clickhappier and Cristo

var accountStatus = "loggedOut";
if ( !document.getElementById("lnkWorkerSignin") )  // if sign-in link not present
{ 
    accountStatus = "loggedIn"; 
}


function getUrlVariable(url, variable)
{
    var query = url.split('?');
    var vars = query[1].split("&");
    for ( var i=0; i<vars.length; i++ ) 
    {
        var pair = vars[i].split("=");
        if ( pair[0] == variable )
        { return pair[1]; }
    }
    return(false);
}

function getTO(f){
    var toComp = [];
    var toUrl2 = 'https://mturk-api.istrack.in/multi-attrs.php?ids='+f;
    var toUrl = 'https://turkopticon.ucsd.edu/api/multi-attrs.php?ids='+f;
    var requestTO = new XMLHttpRequest();
    try{   // first try Miku's TO mirror server (istrack.in)
        requestTO.onreadystatechange = function () {
            if ((requestTO.readyState ===4) && (requestTO.status ===200)) {
                if (requestTO.responseText.split(':').length > 2) {
                    var toInfo = requestTO.responseText.split('{')[3].split('}')[0].split(',');
                    for (var t = 0; t < 4; t++) {
                        var arrTo = toInfo[t].split(':');
                        toComp.push(arrTo[1].substring(1,4));
                    }
                } 
                else { toComp = ['-','-','-','-']; }
            }
        };
        requestTO.open('GET', toUrl, false);
        requestTO.send(null);
        return toComp;
    }
    catch(err){   // if mirror unavailable, try main TO server
        try{
            requestTO.onreadystatechange = function () {
                if ((requestTO.readyState ===4) && (requestTO.status ===200)) {
                    if (requestTO.responseText.split(':').length > 2) {
                        var toInfo = requestTO.responseText.split('{')[3].split('}')[0].split(',');
                        for (var t = 0; t < 4; t++) {
                            var arrTo = toInfo[t].split(':');
                            toComp.push(arrTo[1].substring(1,4));
                        }
                    } 
                    else { toComp = ['-','-','-','-']; }
                }
            };
            requestTO.open('GET', toUrl2, false);
            requestTO.send(null);
            return toComp;
        }
        catch(err){   // if both unavailable, return 'na's
            toComp = ['na','na','na','na'];
            return toComp;
        }
    }
}

function getTOMulti(f){
    var toComp = {};
    var toUrl2 = 'https://mturk-api.istrack.in/multi-attrs.php?ids='+f;
    var toUrl = 'https://turkopticon.ucsd.edu/api/multi-attrs.php?ids='+f;
    var rids = f.split(',');
    var requestTO = new XMLHttpRequest();
    try{   // first try Miku's TO mirror server (istrack.in)
        requestTO.onreadystatechange = function () {
            if ((requestTO.readyState ===4) && (requestTO.status ===200)) {
                if (requestTO.responseText.split(':').length > 2) 
                    toComp = $.parseJSON(requestTO.responseText);
                else 
                    toComp = null; 
            }
        };
        requestTO.open('GET', toUrl, false);
        requestTO.send(null);
        return toComp;
    }
    catch(err){   // if mirror unavailable, try main TO server
        try{
            requestTO.onreadystatechange = function () {
                if ((requestTO.readyState ===4) && (requestTO.status ===200)) {
                    if (requestTO.responseText.split(':').length > 2) 
                        toComp = $.parseJSON(requestTO.responseText);
                    else 
                        toComp = null; 
                }
            };
            requestTO.open('GET', toUrl2, false);
            requestTO.send(null);
            return toComp;
        }
        catch(err){   // if both unavailable, return 'na's
            toComp = "TO DOWN";
            return toComp;
        }
    }
}

function sleep(ms){  // from http://www.digimantra.com/tutorials/sleep-or-wait-function-in-javascript/
    var dt = new Date();
    dt.setTime(dt.getTime() + ms);
    while (new Date().getTime() < dt.getTime());
}
function ns4tbulkshorten(urlArr){
    console.log("ns4t bulk shorten");
    var urlT = "https://ns4t.net/yourls-api.php?action=bulkshortener&title=MTurk&signature=39f6cf4959";
    for (var i = 0; i < urlArr.length; i++)
    {
        urlT += "&urls[]="+encodeURIComponent(urlArr[i]);
    }
    console.log(urlT);
    var requestNs4t = new XMLHttpRequest();
    try{
        requestNs4t.onreadystatechange = function () {
            if (requestNs4t.readyState == 4) {
                if (requestNs4t.status == 200) {
                    shortUrl = requestNs4t.responseText;
                    console.log("ns4t.net response: " + requestNs4t.status + " " + requestNs4t.statusText + " " + requestNs4t.responseText);
                } 
                else {
                    console.log('ns4t.net unsuccessful: ' + requestNs4t.status + " " + requestNs4t.statusText);
                }
            }
        };
        requestNs4t.open('GET', urlT, false);
        requestNs4t.send(null);
        var urls = shortUrl.split(";");
        return {preview:urls[0], panda:urls[1], req:urls[2], to:urls[3]}
    }
    catch(err){
        return shortUrl;
    }
}

function ns4tShorten(url){  // mturk-only URL shortener on Tjololo's server ns4t.net
    console.log("ns4tShorten function");
    var shortUrl;
    var urlT = "https://ns4t.net/yourls-api.php" + "?action=shorturl&url=" + encodeURIComponent(url) + "&format=simple&title=MTurk&signature=39f6cf4959";
    var requestNs4t = new XMLHttpRequest();
    try{
        requestNs4t.onreadystatechange = function () {
            if (requestNs4t.readyState == 4) {
                if (requestNs4t.status == 200) {
                    shortUrl = requestNs4t.responseText;
                    console.log("ns4t.net response: " + requestNs4t.status + " " + requestNs4t.statusText + " " + requestNs4t.responseText);
                }
                else {
                    console.log('ns4t.net unsuccessful: ' + requestNs4t.status + " " + requestNs4t.statusText);
                }
            }
        };
        requestNs4t.open('GET', urlT, false);
        requestNs4t.send(null);
        return shortUrl;
    }
    catch(err){
        return shortUrl;
    }
}
function tnyimShorten(url){  // Tny.im URL Shortener - http://tny.im/aboutapi.php - this is only possible this way because their server has the "Access-Control-Allow-Origin = *" headers enabled (the above TO mirror server does too)
    console.log("tnyimShorten function");
    var shortUrl;
    var urlT = "https://tny.im/yourls-api.php" + "?action=shorturl&url=" + encodeURIComponent(url) + "&format=simple&title=MTurk";
    var requestTnyim = new XMLHttpRequest();
    try{
        requestTnyim.onreadystatechange = function () {
            if (requestTnyim.readyState == 4) {
                if (requestTnyim.status == 200) {
                    shortUrl = requestTnyim.responseText;
                    console.log("tny.im response: " + requestTnyim.status + " " + requestTnyim.statusText + " " + requestTnyim.responseText);
                } 
                else {
                    console.log('tny.im unsuccessful: ' + requestTnyim.status + " " + requestTnyim.statusText);
                }
            }
        };
        requestTnyim.open('GET', urlT, false);
        requestTnyim.send(null);
        return shortUrl;
    }
    catch(err){
        return shortUrl;
    }    
}
function googlShorten(url){  // Goo.gl URL Shortener
    console.log("googlShorten function");
    var shortUrl;
    var urlG = "https://www.googleapis.com/urlshortener/v1/url";
    var requestGoogl = new XMLHttpRequest();
    try{
        requestGoogl.open("POST", urlG, false);
        requestGoogl.setRequestHeader("Content-Type", "application/json");
        requestGoogl.onreadystatechange = function() {
            if (requestGoogl.readyState == 4) {
                if (requestGoogl.status == 200) {
                    shortUrl = JSON.parse(requestGoogl.response).id;
                    console.log("goo.gl response: " + requestGoogl.status + " " + requestGoogl.statusText + " " + JSON.parse(requestGoogl.response).id );
                } 
                else {
                    console.log('goo.gl unsuccessful: ' + requestGoogl.status + " " + requestGoogl.statusText);
                }
            }
        };
        var data = new Object();
        data.longUrl = url;
        requestGoogl.send(JSON.stringify(data)); 
        return shortUrl;
    }
    catch(err){
        return shortUrl;
    }
}
function shortenUrl(url){
    sleep(500);  // milliseconds delay - wait some milliseconds (currently half a second) between shortens to reduce chance of hitting usage limits
    var shortUrl;
    shortUrl = ns4tShorten(url);
    if ( shortUrl === undefined ) {   // if you reached the ns4t.net URL shortener's temporary usage limits or the server is otherwise unavailable
        shortUrl = tnyimShorten(url);
        if ( shortUrl === undefined ) {   // if you reached the tny.im URL shortener's temporary limits or the server is otherwise unavailable
            shortUrl = googlShorten(url);
            if ( shortUrl === undefined ) {  // if you reached the Google URL shortener's temporary limits too or the server is otherwise unavailable
                shortUrl = "(x)";
            }
        }
    }
    return shortUrl;
}

// output display box
// this is messy
// TODO: make it cleaner
var exportdiv = document.createElement('div');
var exporttextarea1 = document.createElement('textarea'); var exporttextarea2 = document.createElement('textarea');
var exporttextarea3 = document.createElement('textarea'); var exporttextarea4 = document.createElement('textarea');
var exporttextarea5 = document.createElement('textarea'); 
var exportclosebutton = document.createElement('button');var exporttitlebutton = document.createElement('button');var exporturlbutton = document.createElement('button');
var exportreqbutton = document.createElement('button');var exportpandabutton = document.createElement('button');var exporttobutton = document.createElement('button');
exportclosebutton.style.backgroundColor = 'black';
exportclosebutton.style.color = 'white';
//exportclosebutton.style.border = 'none';
exportclosebutton.style.width = '505px';
exportclosebutton.style.align = 'center';
exportclosebutton.textContent='Close';
exporttitlebutton.style.backgroundColor = 'black';
exporttitlebutton.style.color = 'white';
//exporttitlebutton.style.border = 'none';
exporttitlebutton.style.width = '101px';
exporttitlebutton.style.align = 'center';
exporttitlebutton.textContent='Title';
exporturlbutton.style.backgroundColor = 'black';
exporturlbutton.style.color = 'white';
//exporturlbutton.style.border = 'none';
exporturlbutton.style.width = '101px';
exporturlbutton.style.align = 'center';
exporturlbutton.textContent='URL';
exportreqbutton.style.backgroundColor = 'black';
exportreqbutton.style.color = 'white';
//exportreqbutton.style.border = 'none';
exportreqbutton.style.width = '101px';
exportreqbutton.style.align = 'center';
exportreqbutton.textContent='Req';
exportpandabutton.style.backgroundColor = 'black';
exportpandabutton.style.color = 'white';
//exportpandabutton.style.border = 'none';
exportpandabutton.style.width = '101px';
exportpandabutton.style.align = 'center';
exportpandabutton.textContent='PandA';
exporttobutton.style.backgroundColor = 'black';
exporttobutton.style.color = 'white';
//exporttobutton.style.border = 'none';
exporttobutton.style.width = '101px';
exporttobutton.style.align = 'center';
exporttobutton.textContent='TO';
exportdiv.style.position = 'fixed';
exportdiv.style.width = '505px';
exportdiv.style.height = '155px';
exportdiv.style.left = '50%';
exportdiv.style.right = '50%';
exportdiv.style.margin = '-250px 0px 0px -250px';
exportdiv.style.top = '300px';
exportdiv.style.padding = 'none'; // def 5px
exportdiv.style.border = 'none'; //def 2px
exportdiv.style.backgroundColor = 'black';
exportdiv.style.color = 'white';
exportdiv.style.zIndex = '100';
exportdiv.style.display = 'none';
document.body.insertBefore(exportdiv, document.body.firstChild);
exporttextarea1.style.padding = 'none';
exporttextarea1.style.width = '500px';
exporttextarea2.style.padding = 'none';
exporttextarea2.style.width = '500px';
exporttextarea2.style.height = '30px';
exporttextarea2.style.overflow = 'hidden';
exporttextarea2.setAttribute('id','hwtf_url');
exporttextarea3.style.padding = 'none';
exporttextarea3.style.width = '500px';
exporttextarea3.style.height = '30px';
exporttextarea3.style.overflow = 'hidden';
exporttextarea3.setAttribute('id','hwtf_req');
exporttextarea4.style.padding = 'none';
exporttextarea4.style.width = '500px';
exporttextarea4.style.height = '30px';
exporttextarea4.style.overflow = 'hidden';
exporttextarea4.setAttribute('id','hwtf_panda');
exporttextarea5.style.padding = '2px';
exporttextarea5.style.width = '500px';
exporttextarea5.style.height = '20px';
exporttextarea5.style.overflow = 'hidden';
exporttextarea5.setAttribute('id','hwtf_to');
exportdiv.style.fontSize = '12px';
//exportdiv.style.display = 'block';

function display(hit, extype){

    var thisReqName = hit["requester_strip"];
    var thisReqId = "unavailable";
    if ( accountStatus == "loggedIn" )
    {
        thisReqId = hit["rid"];
    }

    var thisTitle = hit["title"].replace(" (Requester link substituted)","");

    var thisReward = hit["reward"];

    var thisTimeLimit = hit["time"];

    var thisHitsAvail = "??";
    if ( accountStatus == "loggedIn" ) 
    { 
        thisHitsAvail = hit["hits"];
    }

    var qualList = hit["quals"];
    var qualColl = qualList.split(';');
    var masterQual = '';
    var locationStat = 'ICA';
    var locationIndex = null;
    for ( var m = 0; m < qualColl.length; m++ ) {
        if ( qualColl[m].indexOf('Masters') > -1 ) {
            masterQual = (extype == "irc") ? 'MASTERS • ' : ' [MASTERS]';
        }
        else if (qualColl[m].indexOf('is US') > -1) {
            locationStat = ' US';
            locationIndex = m;
        }
        else if (qualColl[m].match(/approval rate/)) {
            qualColl[m] = qualColl[m].replace(/[A-Za-z ]+\(%\) is (?:not less than (\d+)|greater than (\d+))/, '>$1$2%');
        }
        else if (qualColl[m].match(/approved HITs/)) {
            qualColl[m] = qualColl[m].replace(/Total approved HITs is (?:not less than (\d+)|greater than (\d+))/, '>$1$2');
            qualColl[m] = qualColl[m].replace(/Total approved HITs is (?:not greater than (\d+)|less than (\d+))/, '<$1$2');
        }
    }

    if (extype == "reddit" && locationIndex != null) qualColl.splice(locationIndex,1);
    if (qualColl[0] == null) qualColl = "None";
    var urlsToShorten = [];
    var prevUrl = (thisReqId == "unavailable") ? "Unavailable due to logged out scraper" : LINK_BASE+hit["prev_link"];
    var accUrl = (thisReqId == "unavailable") ? "Unavailable due to logged out scraper" : LINK_BASE+hit["acc_link"];
    if (thisReqId != "unavailable")
    {
        urlsToShorten.push(prevUrl);
        urlsToShorten.push(accUrl);
    }
    var thisPreviewUrl = prevUrl;
    var thisPandaUrl = accUrl;
    var thisReqUrl = "(url n/a)";
    if ( thisReqId != "unavailable")
    {
        if (extype == "irc"){
            urlsToShorten.push('https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId=' + thisReqId);
            //thisReqUrl = shortenUrl('https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId=' + thisReqId);
        }
        else
            thisReqUrl = 'https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId=' + thisReqId;
    }
    else if ( thisReqId == "unavailable")  // handle 2015-07-20 loss of logged-out requester ids
    {
        if (extype == "irc"){
            urlsToShorten.push('https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&searchWords=' + thisReqName.replace(/ /g, "+"));
            //thisReqUrl = shortenUrl('https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&searchWords=' + thisReqName.replace(/ /g, "+") ) + " (search)";
        }
        else
            thisReqUrl = 'https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&searchWords=' + thisReqName.replace(/ /g, "+") + " (Requester search URL due to logged out scraper)";
    }
    var hitLinkUnav = '';
    //if ( capGId == 'unavailable' ) { capUrl = capReqUrl;  pandaUrl = "";  hitLinkUnav = " (preview link unavailable)"; }  // handle logged-out export requests for HITs with no preview/notqualified links ** This is handled at line 647
    if (hit["prev_link"].indexOf("requesterId") > -1) 
    { 
        hitLinkUnav = " (preview link unavailable)";
        thisPandaUrl = "";
    }
    var thisTOUrl = "(url n/a)";
    var thisTOStats = "??";
    if ( thisReqId != "unavailable" )
    {
        urlsToShorten.push(TO_BASE+thisReqId);
        thisTOUrl = TO_BASE+thisReqId;
        thisTOStats = getTO(thisReqId);
    }
    else if ( thisReqId == "unavailable")  // handle 2015-07-20 loss of logged-out requester ids
    {
        urlsToShorten.push('https://turkopticon.ucsd.edu/main/php_search?query=' + thisReqName.replace(/ /g, "+")); 
        thisTOUrl = 'https://turkopticon.ucsd.edu/main/php_search?query=' + thisReqName.replace(/ /g, "+") +" (TO search URL due to logged out scraper)";
    }
    var shortUrlUnav = '';
    if ( (thisPreviewUrl == "(x)") && (thisHitGroup != "unavailable") ) 
    { 
        shortUrlUnav = " \r\n^ https://www.mturk.com/mturk/preview?groupId=" + thisHitGroup; 
    }
    if (extype == "irc")
    {
        if (urlsToShorten.length == 4)
        {
            var shortUrls = ns4tbulkshorten(urlsToShorten);
            console.log(shortUrls);
            thisPreviewUrl = shortUrls["preview"];
            thisPandaUrl = shortUrls["panda"];
            thisReqUrl = shortUrls["req"];
            thisTOUrl = shortUrls["to"];
            if ( thisReqId == "unavailable" ){
                thisTOUrl += " (search)";
                thisReqUrl += " (search)";
            }
        }
        else
        {
            if ( thisReqId != "unavailable" )  // handle logged-out export requests for HITs with no preview/notqualified links
            {
                thisPreviewUrl = shortenUrl('https://www.mturk.com/mturk/preview?groupId=' + thisHitGroup);
                thisPandaUrl = shortenUrl('https://www.mturk.com/mturk/previewandaccept?groupId=' + thisHitGroup);
                thisReqUrl = shortenUrl('https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId=' + thisReqId);
                thisTOUrl = shortenUrl('http://turkopticon.ucsd.edu/' + thisReqId);
            }
            else if ( thisReqId == "unavailable" )  // handle 2015-07-20 loss of logged-out requester ids
            {
                thisReqUrl = shortenUrl('https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&searchWords=' + thisReqName.replace(/ /g, "+") ) + " (search)";
                thisTOUrl = shortenUrl('https://turkopticon.ucsd.edu/main/php_search?query=' + thisReqName.replace(/ /g, "+") ) + " (search)";
            }
        }
    }
    var exportOutput = "";
    var loggedOutApology = " (Info missing since logged out.)";
    var temp = [];
    for (var i = 0; i < qualColl.length; i++)
    {
        var search = /b\](.*?)\[/.exec(qualColl[i]);
        if (search)
            temp[i] = search[1].trim();
        else
            temp[i] = qualColl[i].trim();
    }
    if (temp[0] != "None")
        var qualString = temp.join(", ");
    else
        qualString = temp;
    var exTitle = locationStat + ' - ' + thisTitle.replace(" (Preview link unavailable)","") + ' - ' + thisReqName + ' - ' + thisReward + '/' + 'COMTIME - ' + '(' + qualString + ')' + masterQual;
    var exUrl = 'URL: ' + thisPreviewUrl +'\n\n';
    var exReq = 'Req: ' + thisReqUrl +'\n\n';
    var exTO = 'TO: ' + thisTOUrl +'\n\n';
    var exPanda = 'PandA: ' + thisPandaUrl +'\n\n';
    if ( accountStatus == "loggedIn" )
    {
        if (extype == "irc") {
            exportOutput = masterQual + 'Requester: ' + thisReqName + ' ' + thisReqUrl + ' • ' + 'HIT: ' + thisTitle + ' ' + thisPreviewUrl + ' • ' + 'Pay: ' + thisReward + ' • ' + 'Avail: ' + thisHitsAvail + ' • ' + 'Limit: ' + thisTimeLimit + ' • ' + 'TO: ' + 'Pay='+thisTOStats[1] + ' Fair='+thisTOStats[2] + ' Comm='+thisTOStats[0] + ' ' + thisTOUrl + ' • ' + 'PandA: ' + thisPandaUrl + shortUrlUnav ;
            exporttextarea1.value = exportOutput;
            exporttextarea1.style.height = '130px';
            exporttextarea1.setAttribute('id', 'ircexport_text');
            exportdiv.textContent = 'IRC Export: Press Ctrl+C to (re-)copy to clipboard. Click textarea to close.';
            exportdiv.appendChild(exporttextarea1);
            exporttextarea1.addEventListener("click", function(){ exportdiv.style.display = 'none'; }, false);
            exportdiv.style.display = 'block';
            exporttextarea1.select();
            if (GM_setClipboard) { GM_setClipboard(exportOutput); }
        }
        else if (extype == "reddit") {
            exporttextarea1.value = exTitle;
            exporttextarea2.value = exUrl;
            exporttextarea3.value = exReq;
            exporttextarea4.value = exPanda;
            exporttextarea5.value = exTO;
            exporttextarea1.style.height = '50px';
            exporttextarea1.setAttribute('id','hwtf_title');
            exportdiv.textContent = 'r/HitsWorthTurkingFor Export: Use the buttons for single-click copying.';
            exportdiv.appendChild(exporttextarea1);
            exportdiv.appendChild(exporttextarea2);
            exportdiv.appendChild(exporttextarea3);
            exportdiv.appendChild(exporttextarea4);
            exportdiv.appendChild(exporttextarea5);
            exportdiv.appendChild(exporttitlebutton);
            exportdiv.appendChild(exporturlbutton);
            exportdiv.appendChild(exportreqbutton);
            exportdiv.appendChild(exportpandabutton);
            exportdiv.appendChild(exporttobutton);
            exportdiv.appendChild(exportclosebutton);
            document.body.insertBefore(exportdiv, document.body.firstChild);
            exportclosebutton.addEventListener("click", function(){ exportdiv.style.display = 'none'; }, false);
            exporttitlebutton.addEventListener("click", function(){ exporttextarea1.select(); if (GM_setClipboard) { GM_setClipboard(exporttextarea1.value); } }, false);
            exporturlbutton.addEventListener("click", function(){ exporttextarea2.select(); if (GM_setClipboard) { GM_setClipboard(exporttextarea2.value); } }, false);
            exportreqbutton.addEventListener("click", function(){ exporttextarea3.select(); if (GM_setClipboard) { GM_setClipboard(exporttextarea3.value); } }, false);
            exportpandabutton.addEventListener("click", function(){ exporttextarea4.select(); if (GM_setClipboard) { GM_setClipboard(exporttextarea4.value); } }, false);
            exporttobutton.addEventListener("click", function(){ exporttextarea5.select(); if (GM_setClipboard) { GM_setClipboard(exporttextarea5.value); } }, false);
            exportdiv.style.display = 'block';
            //exporttextarea1.focus();
            var tindex = exTitle.search(/COMTIME/);
            exporttextarea1.setSelectionRange(tindex, tindex+7); // pre-select completion time
        }
    }
    else if ( accountStatus == "loggedOut" )
    {
        if (extype == "irc") {
            exportOutput = masterQual + 'Requester: ' + thisReqName + ' ' + thisReqUrl + ' • ' + 'HIT: ' + thisTitle + ' ' + thisPreviewUrl + ' • ' + 'Pay: ' + thisReward + ' • ' + 'Avail: ' + thisHitsAvail + ' • ' + 'Limit: ' + thisTimeLimit + ' • ' + 'TO: ?? ' + thisTOUrl + ' • ' + 'PandA: ' + thisPandaUrl + loggedOutApology + shortUrlUnav ;
            exporttextarea1.value = exportOutput;
            exporttextarea1.style.height = '130px';
            exporttextarea1.setAttribute('id', 'ircexport_text');
            exportdiv.textContent = 'IRC Export: Press Ctrl+C to (re-)copy to clipboard. Click textarea to close.';
            exportdiv.appendChild(exporttextarea1);
            exporttextarea1.addEventListener("click", function(){ exportdiv.style.display = 'none'; }, false);
            exportdiv.style.display = 'block';
            exporttextarea1.select();
            if (GM_setClipboard) { GM_setClipboard(exportOutput); }
        }
        else if (extype == "reddit") {
            exporttextarea1.value = exTitle;
            exporttextarea2.value = exUrl;
            exporttextarea3.value = exReq;
            exporttextarea4.value = exPanda;
            exporttextarea5.value = exTO;
            exporttextarea1.style.height = '50px';
            exporttextarea1.setAttribute('id','hwtf_title');
            exportdiv.textContent = 'r/HitsWorthTurkingFor Export: Use the buttons for single-click copying.';
            exportdiv.appendChild(exporttextarea1);
            exportdiv.appendChild(exporttextarea2);
            exportdiv.appendChild(exporttextarea3);
            exportdiv.appendChild(exporttextarea4);
            exportdiv.appendChild(exporttextarea5);
            exportdiv.appendChild(exporttitlebutton);
            exportdiv.appendChild(exporturlbutton);
            exportdiv.appendChild(exportreqbutton);
            exportdiv.appendChild(exportpandabutton);
            exportdiv.appendChild(exporttobutton);
            exportdiv.appendChild(exportclosebutton);
            document.body.insertBefore(exportdiv, document.body.firstChild);
            exportclosebutton.addEventListener("click", function(){ exportdiv.style.display = 'none'; }, false);
            exporttitlebutton.addEventListener("click", function(){ exporttextarea1.select(); if (GM_setClipboard) { GM_setClipboard(exporttextarea1.value); } }, false);
            exporturlbutton.addEventListener("click", function(){ exporttextarea2.select(); if (GM_setClipboard) { GM_setClipboard(exporttextarea2.value); } }, false);
            exportreqbutton.addEventListener("click", function(){ exporttextarea3.select(); if (GM_setClipboard) { GM_setClipboard(exporttextarea3.value); } }, false);
            exportpandabutton.addEventListener("click", function(){ exporttextarea4.select(); if (GM_setClipboard) { GM_setClipboard(exporttextarea4.value); } }, false);
            exporttobutton.addEventListener("click", function(){ exporttextarea5.select(); if (GM_setClipboard) { GM_setClipboard(exporttextarea5.value); } }, false);
            exportdiv.style.display = 'block';
            //exporttextarea1.focus();
            var tindex = exTitle.search(/COMTIME/);
            exporttextarea1.setSelectionRange(tindex, tindex+7); // pre-select completion time
        }
    }
}

// TODO: cleanup, shift OO, readability, modularity