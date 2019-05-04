// ==UserScript==
// @name         Bunpro: Auto Commit 2.0
// @namespace    http://tampermonkey.net/
// @version      2.0.7
// @description  Automatically submits your answer once it's correct.
// @author       Kumirei
// @include      *bunpro.jp*
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012
// @require      https://greasyfork.org/scripts/370623-bunpro-helpful-events/code/Bunpro:%20Helpful%20Events.js?version=615700
// @require      https://greasyfork.org/scripts/370219-bunpro-buttons-bar/code/Bunpro:%20Buttons%20Bar.js?version=654288
// @grant        none
// ==/UserScript==

(function() {
		//if you want to get an alert when the script can't find the correct answer so you can report the bug to Kumi, set this to true
		var bugReporting = true;

		//sets the page up for continued running
		var answer = "";
		function initialise() {
				console.log('BAC: INITIALISING');
				//add the button
				autoCommit = (localStorage.getItem('BPautoCommit') == "false" ? false : true);
				buttonsBar.addButton('AutoCommit', 'Auto Commit ' + (autoCommit == true ? "ON" : "OFF"), 'toggleAutoCommit()');

				answer = "";
				var currentInput = "";
				//check answer each time a key is released
				$('#study-answer-input').on('keyup', function(e) {
						if (autoCommit) {
								//update current input value
								currentInput = $('#study-answer-input')[0].value;
								//if the input matches the stored answer, then submit it
								if (currentInput == answer) {
										$('#submit-study-answer').click();
								}
						}
				});
		}

		//update variables when a new item is detected
		$('HTML')[0].addEventListener('new-review-item', function() {
				console.log("New item");
				//if this is the first time running this code on the page then initialise
				if (!$('#AutoCommit').length) initialise();

				//find answer
				var lst = $('.level_lesson_info > a')[0].href.split("/");
				var id = lst[lst.length-1];
				answer = "";
				var sentence = parseSentence($('.study-question-japanese > div')[0]).replace(/\[.*\]$/g, '');
				console.log("Sentence", sentence);
				var matchSentence = new RegExp('^'+ sentence +'$');
				var startIndex = sentence.match(/\./).index;
				var sentenceEnd = sentence.slice(startIndex + 2);
				var matchSentenceEnd = new RegExp(sentenceEnd + '$');

				var found = false;
				var englishSentence = $('#sentence_english')[0].value.replace(/"/g, "'").replace(/(\(.*\))|(\[.*\])|(<strong>)|(<\/strong>)|(<span class='chui'>)|(<\/span>)| /g, '');
				$('.examples .japanese-example-sentence').each(function(i, e) {
						var parsedSentence = parseSentence(e);
						//try new stuff!
						var englishExample = e.nextElementSibling.innerHTML.replace(/"/g, "'").replace(/(\(.*\))|(\[.*\])|(<strong>)|(<\/strong>)|(<span class='chui'>)|(<\/span>)| /g, '');
						if (englishSentence.includes(englishExample)) {
								found = true;
								var endIndex = parsedSentence.match(matchSentenceEnd).index;
								var Answer = parsedSentence.slice(startIndex, endIndex);
								console.log(id, 'Answer:', Answer);
						}
						//old stuff
						if (parsedSentence.match(matchSentence) != null) {
								var endIndex = parsedSentence.match(matchSentenceEnd).index;
								answer = parsedSentence.slice(startIndex, endIndex);
								console.log(id, 'ANSWER:', answer);
						}
				});
				if (!found) {
						alert('Error in English translation.');
						var examples = '';
						$('.examples .english-example-sentence').each(function(i, e) {examples += 'Example: ' + e.innerText.replace(/(\(.*\))|(\[.*\])|(<strong>)|(<\/strong>)|(<span class='chui'>)|(<\/span>)| /g, '') + '\n';});
						console.log('Sentence:', englishSentence);
						console.log(examples);

				}
				if (answer == "") {
						console.log('No answer found');
						console.log('Sentence:', sentence);
						//bug reporting
						var examples = '';
						$('.examples .japanese-example-sentence').each(function(i, e) {examples += 'Example: ' + parseSentence(e) +'\n';});
						if (bugReporting) {
								var lst = $('.level_lesson_info > a')[0].href.split("/");
								var id = lst[lst.length-1];
								var text = '"Bunpro: Autocommit" could not find the answer to this question.'+
									'\nCopy the following and sent it to Kumi on the Bunpro forums.'+
									'\n\nIf you don\'t want to receive these bug alerts anymore, disable them by setting bugReporting = false at the top of the script.\n'+
									'\nGrammar ID: ' + id +
									'\nSentence: ' + sentence +
									'\n' + examples;
								console.log(examples);
								alert(text);
						}
				}
		});

		//Extracts the sentence from the sentence elements
		function parseSentence(sentenceElem) {
				var text = "";
				sentenceElem.childNodes.forEach(function(elem) {
						// find the text in each kind of element and append it to the text string
						var name = elem.nodeName;
						if (name == "#text") {
								text += elem.data;
						} else if (name == "STRONG" || name == "SPAN") {
								if (elem.className == "chui") {
										if (!elem.children.length) text += elem.innerText
										else text += elem.children[0].children[1].innerText;
								} else if (elem.className == "study-area-input") {
										text += ".*";
								} else if (elem.className == "name-highlight") {
										text += parseSentence(elem);
								} else if (name == "STRONG" && elem.children.length) {
										text += parseSentence(elem);
								} else {
										text += elem.innerText;
								}
						} else if (name == "RUBY") {
								text += elem.children[1].innerText;
						}
				});
				text = text.replace(/(\(.*\))|(\[.*\])/, '');
				return text;
		}
})();

toggleAutoCommit = function() {
		autoCommit = !autoCommit;
		var name = "Auto Commit " + (autoCommit == true ? "ON" : "OFF");
		$('#AutoCommit')[0].value = name;
		console.log(name);
		localStorage.setItem('BPautoCommit', autoCommit);
}