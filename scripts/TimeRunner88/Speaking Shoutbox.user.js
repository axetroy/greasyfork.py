// ==UserScript==
// @name            Speaking Shoutbox
// @version         0.58
// @description     Cause shoutbox to use speech API
// @namespace       whatever@whatever.com
// @locale          en
// @include         http://*.johnsarcade.com/*
// @include         http://johnsarcade.com/*


// ==/UserScript==

/*
    Features:
    - uses the Chrome SpeechSynthesisUterrance API to speak shoutbox messages

*/


    
var style = document.createElement('style');
style.innerHTML = (<><![CDATA[
/*
img[src*="/Smileys/classic"]{
  width: 120px;
  height: auto;
}
*/
img:not([src$='forum_logo.png']):not([src*='staticflickr.com/']):not([src*='flickrviewer/']):not([src*='/Themes/']):not([src$='smiley.gif']):not([src$='cheesy.gif']):not([src$='grin.gif']):not([src$='angry.gif']):not([src$='sad.gif']):not([src$='shocked.gif']):not([src$='cool.gif']):not([src$='huh.gif']):not([src$='rolleyes.gif']):not([src$='tongue.gif']):not([src$='embarassed.gif']):not([src$='lipsrsealed.gif']):not([src$='undecided.gif']):not([src$='kiss.gif']):not([src$='cry']) {
  width: 50px;
  height: auto;
}
]]></>).toString();
document.getElementsByTagName('head')[0].appendChild(style);

//smiley,cheesy,grin,angry,sad,shocked,cool,huh,rolleyes,tongue,ebarassed,lipsrsealed,undecided,kiss,cry
var script = document.createElement('script');
script.type = "text/javascript"; 
script.innerHTML = (<><![CDATA[



var sbVoiceDebug = true;    
    
    /************** START OF FUNCTIONS **************/

    function setSbVoice(username, voice) {
		if (sbVoiceDebug) console.log('username='+username+';voice='+voice);
    	sbVoiceMap[username] = voice;
        if (sbVoiceDebug) console.log('set: ' + JSON.stringify(sbVoiceMap));               
        localStorage.setItem("sbVoiceMap", JSON.stringify(sbVoiceMap));
        
    }
    
    function getSbVoice() {
		var map = {};
        map = JSON.parse(localStorage.getItem('sbVoiceMap'));
        if (sbVoiceDebug) console.log('retrieved from localStorage: ' + JSON.stringify(map));   
	    if (JSON.stringify(map) != 'null') {
    		if (sbVoiceDebug) console.log('returning map');
    		return map;    
    	}
                         
        var map = {};
        map['default'] = "Google UK English Male"; // this voice is played for everyone else
		map["John's Arcade"] = "Daniel";

        // other voices I use locally but you can customize yours on your own
		//map['BloodyCactus'] = "Junior";
		//map['computerfixerguy'] = "Fred";
		//map['DaCord421'] = "Alex";
		//map['danreedphoto'] = "Deranged";
		//map['esqueleto'] = "Carmit";
		//map['Griffin'] = "Bahh";
		//map['Hyderyoda'] = "Alex";
		//map['iankellogg'] = "Boing";
        //map['JollyMan'] = "Hysterical";
		//map['JoshODBrown'] = "Daniel";
		//map['jow'] = "Ralph";
		//map['lojack'] = "Zarvox";
		//map['KillerDragon'] = "Alex";
		//map['mattcandraw'] = "Alex";
		//map['Servo'] = "Trinoids";
		//map['VertexGuy'] = "Albert";

		localStorage.setItem("sbVoiceMap", JSON.stringify(map));
		if (sbVoiceDebug) console.log('nothing to retrieve. set: ' + JSON.stringify(map));   
        location.replace(document.URL); //reload page to read in new local value
        return map;
    }
    
    function loadVoices() {
    	if (document.getElementById('voice').length < 1) {
	        var voiceSelect = document.getElementById('voice');
    		var voices = speechSynthesis.getVoices();
			i = 0;            
			// Add Voices
            voices.forEach(function(voice) {
                i++;
            	var option = document.createElement('option');
            	option.value = voice.name;
            	option.innerHTML = voice.name;
            	voiceSelect.appendChild(option);
    		});
            if (i > 1) {
				// Add Muted voice option
                var option = document.createElement('option');
                option.value = 'Muted';
                option.innerHTML = 'Muted';
                voiceSelect.appendChild(option);
                // Add Volume Adjustable voice option
                var option = document.createElement('option');
                option.value = 'lang-en-US';
                option.innerHTML = 'Volume Adjustable';
                voiceSelect.appendChild(option);
				if (sbVoiceDebug) console.log('loadVoices() ran -- voices added: ' + document.getElementById('voice').length);
            }
        }
    }

    var isChatBotAsleep = false;

    // change the alert tone to instead read aloud the most recent row
    function Shoutbox_NewMsgs() {
    
        // play sound :)
        if (Shoutbox.feature.nosound) {
            lastSpokenRow = Shoutbox.maxmsgs - 1;
            lastShoutUser = '';
            return;
        }
    
        if (lastSpokenRow == 0) {
            lastSpokenRow = Shoutbox.maxmsgs - 1;
        }
        
        while (lastSpokenRow < Shoutbox.maxmsgs) {
            if (sbVoiceDebug) console.log('lastSpokenRow = ' + lastSpokenRow + '; Shoutbox.maxmsgs = ' + Shoutbox.maxmsgs + '; //Speaking new message');
            lastSpokenRow++;
            shoutRow = document.getElementById('shoutbox_row' + lastSpokenRow);
            //linkifyTextNode(document.getElementById('shoutbox_row' + lastSpokenRow));
            
            // change new row to remove target="_blank" profile links
            findTarget = shoutRow.getElementsByTagName('A');
            for (var i=0; i < findTarget.length; i++) {
                if (findTarget[i].href.indexOf('action=profile') > -1) {
                    findTarget[i].target = '_self';
                }
            }
            
            if (sbVoiceDebug) console.log(shoutRow.innerHTML);
            if (shoutRow.innerHTML.indexOf('action=profile') > -1) {
                shoutUser = shoutRow.getElementsByTagName('A')[0].innerHTML;
            } else {
                shoutUser = '';
            }
            var useVoice = document.getElementById('voice').value;
            useVoice = (sbVoiceMap[shoutUser] != undefined) ? sbVoiceMap[shoutUser] : document.getElementById('voice').value;
            shoutUser = shoutUser.replace('iankellog','ian kellog').replace('JoshODBrown','josh brown').replace(/\'/gi,'').toLowerCase();
            shoutMessage = shoutRow.getElementsByTagName('SPAN')[1].innerText;

            shoutMessageLinks = shoutRow.getElementsByTagName('SPAN')[1].getElementsByTagName('A');
            for (var i=0; i < shoutMessageLinks.length; i++) {
                if (sbVoiceDebug) console.log('parsed link ' + shoutMessageLinks[i].innerHTML);
                shoutMessage = shoutMessage.replace(shoutMessageLinks[i].innerHTML,'http bla bla bla');
            }
            shoutMessage = shoutMessage.replace("I'm","I am").replace("'","").replace('.',' ').toLowerCase();
            shoutMessage = (lastShoutUser != shoutUser) ? shoutUser + ' said,' + shoutMessage : shoutMessage;

            var currentTime = new Date();
            var secondsSinceLastChat = parseInt((currentTime - lastChatTime)/1000);
            var programmedResponses = [];
 
            programmedResponses.push('botidentify|BobBot Zarzadeck v0.6 Super Awesome Edition: ACTIVE. Last BobBot Phrase: "' + lastChatBotPhrase + '" -- Total BobBot Responses: ' + totalAutomatedPhrases + ' -- Last BobBot Response: ' + secondsSinceLastChat + ' seconds ago.');
 /*
            programmedResponses.push('bye|[runs after ' + shoutUser + ' as he drives away]');
            programmedResponses.push('that sucks|You know what else sucks? Outer space.');
            //programmedResponses.push('morning|Have a damn good morning ' + shoutUser);
            //programmedResponses.push('afternoon|Wonderful afternoon ' + shoutUser);
            //programmedResponses.push('evening|Super awesome evening ' + shoutUser);
            programmedResponses.push('delorean|I had a DeLorean back in the day. Used it to haul hookers and blow from Mexico. Good times.');
            programmedResponses.push('sleepy|Whenever I\'m sleepy I take a shot of Jolt cola I have stashed under my desk. #PROTIP');
            programmedResponses.push('turkey|Is it thanksgiving already?');
            programmedResponses.push('back me up|I totally agree with you ' + shoutUser);
            programmedResponses.push('funny|That\'s frickin hilarious!');
            programmedResponses.push('star wars|I have this theory that Luke Skywalker is really a chick.');
            programmedResponses.push('expensive|That is totally too much money!');
            programmedResponses.push('wine|Wine is for beautiful lesbians, man.');
            programmedResponses.push('houston|Houston? We have a problem.');
            programmedResponses.push('minneapolis|Go Twins!');
            programmedResponses.push('stupid|I had a friend that always said stupid is as stupid does -- he died in a riding lawn mower accident.');
            programmedResponses.push('coffee|I used to think if you coughed a lot you were really coffee.');
            programmedResponses.push('star trek|Best part about Star Trek is definitely the green chicks.');
            programmedResponses.push('gay|Oopsy.');
            programmedResponses.push('vhs|VHS sucks. Beta rules.');
            programmedResponses.push('bullshit|In Texas we say bull-hockey to keep things clean.');
            //programmedResponses.push('christmas|merry merry');
            programmedResponses.push('bathroom|Hey ' + shoutUser + ' if you\'re gonna go to the bathroom don\'t forget to turn the fart fan on.');
            programmedResponses.push('the office|I\'m a work from home kinda guy but I hear offices have sweet water coolors.');
            programmedResponses.push('the flash|My name is Bob Zarzadeck and I am the flashiest man alive.');
            programmedResponses.push('iphone|Did I even mention I invented the iPhone?');
            programmedResponses.push('knightrider|I really love the control panel on KITT.');
            programmedResponses.push('transformers|MORE THAN MEETS THE EYE!');
            programmedResponses.push('chicken|I used to cook chicken with a laser pointer but it takes like three days so no bueno.');
            programmedResponses.push('alpha|I\'m more of a beta guy myself');
*/
            for (var i=0; i<programmedResponses.length; i++) {
                var encounter = programmedResponses[i].split('|');
                if (shoutMessage.toLowerCase().indexOf(encounter[0]) > -1 && !isChatBotAsleep) {
                    isChatBotAsleep = true;
                    if (encounter[0] == 'trbot' || encounter[0] == 'bobbot') {
                        runChatBot(encounter[1],false);
                    } else {
                        runChatBot('[BobZarzadeckBot]: ' + encounter[1],true);
                    }
                    var wakeChatBot = setInterval(function () {
                        if (isChatBotAsleep) {
                            clearInterval(wakeChatBot);
                            isChatBotAsleep = false;
                        }
                    }, 3000);
                }
            }                
            
            lastShoutUser = shoutUser;
			var shoutMessageArray = shoutMessage.match(/.{1,150}/g);
            
            if (sbVoiceDebug && shoutMessageLinks.length != null && shoutMessageArray.length != null) console.log('shoutMessageLinks.length = ' + shoutMessageLinks.length + '; shoutMessageArray.length = ' + shoutMessageArray.length);

			if (useVoice != 'Muted') {
                
            	for (var i=0; i < shoutMessageArray.length; i++) {

                    var utterance = new SpeechSynthesisUtterance(shoutMessageArray[i]);
                    var voices = window.speechSynthesis.getVoices();
                    utterance.voice = voices.filter(function(voice) { return voice.name == useVoice; })[0];
                    utterance.rate = 1.2;
                    //utterance.voiceURI = 'native';
                    //utterance.pitch = '1.0';
                    if (useVoice == 'lang-en-US') {
                        utterance.lang = utterance.voice;
                        utterance.volume = document.getElementById('volume').value;
                    }
                    window.speechSynthesis.speak(utterance);
 
            	}                
            	
            }
        }
    }
    
    function Shoutbox_PostMsg(XMLDoc) {
    
        if (Shoutbox.msgs !== false) { 
            window.clearTimeout(Shoutbox.msgs);
        }
        Shoutbox.posting = false;
        // document.getElementById("shoutbox_send").disabled = false;
        Shoutbox_PutMsgs(XMLDoc);
        
        lastSpokenRow = Shoutbox.maxmsgs;
        shoutRow = document.getElementById('shoutbox_row' + lastSpokenRow);
            
        // change new row to remove target="_blank" profile links
        findTarget = shoutRow.getElementsByTagName('A');
        for (var i=0; i < findTarget.length; i++) {
            if (findTarget[i].href.indexOf('action=profile') > -1) {
                findTarget[i].target = '_self';
            }
        }

        if (sbVoiceDebug) console.log('lastSpokenRow = ' + lastSpokenRow + '; Shoutbox.maxmsgs = ' + Shoutbox.maxmsgs + '; //Skipped speaking your message');
        clearInterval(chatBot);
        chatBot = setInterval("runChatBotInterval()", 3600000);

    }

    function setProfileVoice() {
        shoutUser = document.getElementById('bodyarea').getElementsByTagName('TD')[5].innerHTML;
        useVoice = (sbVoiceMap[shoutUser] !== undefined) ? sbVoiceMap[shoutUser] : sbVoiceMap['default'];
        if (sbVoiceDebug) console.log(useVoice);
        document.getElementById('voice').value = useVoice;
    }

function resetLastSpokenRow(thisObj) {
    var clickedRow = thisObj.parentNode.parentNode.id.substring(12);//shoutbox_row1998 -- tbox_row
    console.log('Resetting speaking pointer to row ' + clickedRow + '.');
       lastShoutUser = '';
      lastSpokenRow = clickedRow - 1;
        Shoutbox_NewMsgs();
}

//(function () {
//  var body = document.body;
//  body.style['filter'] = 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)';
//  if (!body.style['filter']) {
//    body.style['-webkit-filter'] = 'grayscale(1)';
//    body.style['filter'] = 'grayscale(1)';
//  }
//}());

    //make links to profile in shoutbox NOT open in a new window
    function isShoutBoxLoaded() {
        if (Shoutbox.first === false) {

            //document.body.style.backgroundImage = "url('')";
            //document.getElementsByClassName('tborder')[0].innerHTML = '';   
            //document.getElementsByClassName('catbg2')[0].innerHTML = '';
            //document.getElementsByClassName('catbg2')[0].style.backgroundImage = "url('')";

            if (sbVoiceDebug) console.log('shoutbox loaded');
            shoutRows = document.getElementById('shoutbox_table').getElementsByTagName('A');
            for (var i=0; i < shoutRows.length; i++) {
                if (shoutRows[i].href.indexOf('action=profile') > -1) {
                    shoutRows[i].parentNode.innerHTML = shoutRows[i].parentNode.innerHTML + '<button onclick="resetLastSpokenRow(this)">*</button>';
                    shoutRows[i].target = '_self';
                    shoutRows[i].title = Shoutbox.maxmsgs - i;
                }
            }
            clearInterval(refreshIntervalId);
            //runChatBot(you+'Bot reporting for duty.');
        } else {
            if (sbVoiceDebug) console.log('shoutbox not yet loaded');
        }
    }

	function saveVoice() {
		setSbVoice(shoutUser, document.getElementById('voice').value);
        location.href = smf_scripturl;
    }        

    function testVoice() {
        useVoice = document.getElementById('voice').value;
        if (useVoice != 'Muted') {
            var utterance = new SpeechSynthesisUtterance('Hey guys! We are in the basement!');
            var voices = window.speechSynthesis.getVoices();
            utterance.voice = voices.filter(function(voice) { return voice.name == useVoice; })[0];
            window.speechSynthesis.speak(utterance);
        }
    }

	function changeVoice() {
		if (document.getElementById('voice').value != 'lang-en-US') {
        	document.getElementById('volume').style.display = 'none';                 
        } else {
        	document.getElementById('volume').style.display = 'block';                 
        }
	}

    var lastChatBotPhrase = '[none]';
    var totalAutomatedPhrases = 0;
    var lastChatTime = new Date();

    function runChatBot(chatThis,advanceCounter) {
//        if (document.getElementById('shoutbox_message').value === '') {
            document.getElementById('shoutbox_message').value = chatThis;
            document.getElementsByClassName('button_submit')[0].click();
            if (advanceCounter) {
                lastChatBotPhrase = chatThis;
                lastChatTime = new Date();
                totalAutomatedPhrases++;
            }
//      }
    }

    function runChatBotInterval() {
//         if (lastShoutUserAutoChat != lastShoutUser) {
             var randomChats = 'Awesome!,Heck yes!,Woot!,Yeah, man!,Cool, man!,Sweet!,Hmmm...,[twiddles thumbs],For reals, man.,Hooyah!,Yup.,Are they ever bringing back King of the Hill or what?,Yo waddup?,Sup?,Suh?'.split(',');
             var randomChat = randomChats[Math.floor(Math.random()*randomChats.length)];
//             if (lastShoutUser != you.toLowerCase()) {
//                 runChatBot(randomChat + ' ' + lastShoutUser);
//             } else {
                 runChatBot(randomChat,true);
//             }
//             lastShoutUserAutoChat = lastShoutUser;
//         } else {
//             var randomBoreds = ''.split(',');
//             var randomBored = randomBoreds[Math.floor(Math.random()*randomBoreds.length)];
//             runChatBot(randomBored);
//         }
    }

function linkifyTextNode(node) {
    var i, l, m;
    var txt = node.textContent;
    var span = null;
    var p = 0;
    while (m = urlRE.exec(txt)) {
        if (null == span) {
            // Create a span to hold the new text with links in it.
            span = document.createElement('span');
            span.className = 'linkifyplus';
        }

        //get the link without trailing dots
        l = m[0].replace(/\.*$/, '');
        var lLen = l.length;
        //put in text up to the link
        span.appendChild(document.createTextNode(txt.substring(p, m.index)));
        //create a link and put it in the span
        a = document.createElement('a');
        a.className = 'linkifyplus';
        a.appendChild(document.createTextNode(l));
        if (l.indexOf(":/") < 0) {
            if (l.indexOf("@") > 0) {
                l = "mailto:" + l;
            } else {
                l = "http://" + l;
            }
        }
        a.setAttribute('href', l);
        a.setAttribute('target', '_blank');
        span.appendChild(a);
        //track insertion point
        p = m.index+lLen;
    }
    if (span) {
        //take the text after the last link
        span.appendChild(document.createTextNode(txt.substring(p, txt.length)));
        //replace the original text with the new span
        try {
            node.parentNode.replaceChild(span, node);
        } catch (e) {
            console.error(e);
            console.log(node);
        }
    }
}

    
	/************** END OF FUNCTIONS **************/

    //shoutBox vars
    var sbVoiceMap = {};
    var lastSpokenRow = 0;
    var lastShoutUser = '';
    var lastShoutUserAutoChat = '';
	var shoutUser = '';
	var useVoice = '';
    var you = document.getElementsByClassName('titlebg2')[0].innerText.replace('Hello','').replace(' ','');
    console.log('You are: ' + you);

    if (document.title.indexOf('View the profile of ') > -1) { // user is on profile page
        
        document.getElementById('bodyarea').getElementsByTagName('TD')[14].innerHTML = '<strong>ShoutBox Voice:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + 
            '<select name="voice" id="voice"></select> ' +
            '<input type="button" onclick="saveVoice();" value="Save"/>&nbsp;' +
			'<input type="button" onclick="testVoice();" value="Test"/>';
        
		sbVoiceMap = getSbVoice();
        
        // Execute loadVoices.
        loadVoices();  
        setProfileVoice();
    
        // Chrome loads voices asynchronously
        window.speechSynthesis.onvoiceschanged = function(e) {
            loadVoices();
			setProfileVoice();
        };
        
		setProfileVoice();
        
    } else if ((document.title.indexOf('Classic Arcade') > -1) || (document.title.indexOf('Arcade Shoutbox') > -1)) { //user is on shoutbox page

		sbVoiceMap = getSbVoice();
        document.getElementById('shoutbox').getElementsByTagName('TD')[1].innerHTML = '<select name="voice" id="voice" onchange="changeVoice()"></select>' +
            ' <input type="range" max="1" min="0" step="0.1" value="1" id="volume" style="display: none;">';

        // Execute loadVoices.
        loadVoices(); 
        document.getElementById('voice').value = sbVoiceMap['default'];
    
        // Chrome loads voices asynchronously
        window.speechSynthesis.onvoiceschanged = function(e) {
          	loadVoices();
			document.getElementById('voice').value = sbVoiceMap['default'];
        };

 		// Wait for ShoutBox to load and then change links to profile to open target="_self"
        var refreshIntervalId = setInterval("isShoutBoxLoaded()", 500);
        var chatBot = setInterval("runChatBotInterval()", 3600000);

    }    
        
        
         

]]></>).toString();
document.getElementsByTagName('head')[0].appendChild(script);


/************** START OF LINKIFYPLUS **************/


var notInTags = [
	  'a', 'code', 'head', 'noscript', 'option', 'script', 'style',
	  'title', 'textarea'];
var textNodeXpath =
  	".//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]";
// Built based on:
//  - http://en.wikipedia.org/wiki/URI_scheme
//  - http://www.regular-expressions.info/regexbuddy/email.html
var urlRE = new RegExp(
    '('
    // leading scheme:// or "www."
    + '\\b([a-z][-a-z0-9+.]+://|www\\.)'
    // everything until non-URL character
    + '[^\\s\'"<>()]+'
    + '|'
    // email
    + '\\b[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}\\b'
    + ')', 'gi');
var queue = [];

/******************************************************************************/

linkifyContainer(document.body);
document.body.addEventListener('DOMNodeInserted', function(event) {
	linkifyContainer(event.target);
}, false);

/******************************************************************************/

function linkifyContainer(container) {
	// Prevent infinite recursion, in case X(HT)ML documents with namespaces
	// break the XPath's attempt to do so.	(Don't evaluate spans we put our
	// classname into.)
	if (container.className && container.className.match(/\blinkifyplus\b/)) {
	  return;
	}

	var xpathResult = document.evaluate(
		  textNodeXpath, container, null,
		  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var i = 0;
	function continuation() {
		var node = null, counter = 0;
		while (node = xpathResult.snapshotItem(i++)) {
		  var parent = node.parentNode;
		  if (!parent) continue;

		  // Skip styled <pre> -- often highlighted by script.
		  if ('PRE' == parent.tagName && parent.className) continue;
		  
			linkifyTextNode(node);

			if (++counter > 50) {
				return setTimeout(continuation, 0);
			}
		}
	}
	setTimeout(continuation, 0);
}

function linkifyTextNode(node) {
	var i, l, m;
	var txt = node.textContent;
	var span = null;
	var p = 0;
	while (m = urlRE.exec(txt)) {
		if (null == span) {
			// Create a span to hold the new text with links in it.
			span = document.createElement('span');
			span.className = 'linkifyplus';
		}

		//get the link without trailing dots
		l = m[0].replace(/\.*$/, '');
		var lLen = l.length;
		//put in text up to the link
		span.appendChild(document.createTextNode(txt.substring(p, m.index)));
		//create a link and put it in the span
		a = document.createElement('a');
		a.className = 'linkifyplus';
		a.appendChild(document.createTextNode(l));
		if (l.indexOf(":/") < 0) {
			if (l.indexOf("@") > 0) {
				l = "mailto:" + l;
			} else {
				l = "http://" + l;
		  }
		}
		a.setAttribute('href', l);
		a.setAttribute('target', '_blank');
		span.appendChild(a);
		//track insertion point
		p = m.index+lLen;
	}
	if (span) {
		//take the text after the last link
		span.appendChild(document.createTextNode(txt.substring(p, txt.length)));
		//replace the original text with the new span
		try {
			node.parentNode.replaceChild(span, node);
		} catch (e) {
			console.error(e);
			console.log(node);
		}
	}
}
                    
/************** END OF LINKIFYPLUS **************/

                    
