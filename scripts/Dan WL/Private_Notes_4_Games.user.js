// ==UserScript==
// @name        Private_Notes_4_Games
// @namespace   DanWL
// @description See https://greasyfork.org/en/scripts/19761-jz-warlight instead. This final version allows your current notes to be merged into JZ's userscript.
// @include     https://www.warzone.com/MultiPlayer?GameID=*
// @version     1.0.1
// @grant       none
// @depreciated See https://greasyfork.org/en/scripts/19761-jz-warlight
// ==/UserScript==

(function()
{
	// JZ's userscript is more popular than this, so guide current users to it and give option of making current notes compatible for JZ's solution
	const discontMsg = function() {
		return confirm("This has been discontinued in favour of JZ's userscript. Do you want to convert you current notes to work with JZ's userscript?");
	};
	const convertToJzFormat = discontMsg();
	let currentPage = window;
	const showInstallLocation = function() {
		return currentPage.prompt("JZ's userscript can be installed at", "https://greasyfork.org/en/scripts/19761-jz-warlight");
	};

	if (!convertToJzFormat) {return showInstallLocation();}

	localStorage.setItem('setting_enable_notes', 'true');

	if (!localStorage.getItem("notes")) {
		localStorage.setItem("notes", "{}");
	}

	// JZ format
	function saveJzNotes(jzNotes) {
		if (typeof jzNotes != "object") {return;}

		localStorage.setItem("notes", JSON.stringify(jzNotes));
	}

	function getJzNotes() {
		return JSON.parse(localStorage.getItem("notes"));
	}

	function makeJzNote(myNoteGameId, myNoteValue) {
		/**
		 * @param myNoteGameId String of Number
		 * @param myNoteValue String not HTML-like text
		*/

		let notes = getJzNotes();
		let note = notes[myNoteGameId];
		let now = new Date();

		if (notes[myNoteGameId]) {
			notes[myNoteGameId] = {
				date: now,
				value: note.value + '\n' + myNoteValue
			};
		}
		else {
			notes[myNoteGameId] =
			{
				date: now,
				value: myNoteValue
			};
		}

		saveJzNotes(notes);
	}

	function makeJzNotes(myNotes) {
		myNotes.forEach(function(mynote) {
			makeJzNote(mynote.gameId, mynote.value);
		});
	}

	// my format
	function getPlayerId()
	{
		const ownProfileLink = document.querySelector("a[href^='/Profile?p=']");

		if (!ownProfileLink) {return;}

		const playerNumber = ownProfileLink.href.match(/\d+/)[0];
		const playerId = playerNumber.substring(2, playerNumber.length - 2);

		return playerId;
	}

	function readNotes(callback)
	{
		const note = open('https://www.warzone.com/Discussion/Notes?p=' + getPlayerId());
		let myNotes = [];
		currentPage = note;

		note.onload = function()
		{
			try{
			const pmTextArea = note.document.getElementById('TextArea_0');
			const pmEditBtn = note.document.getElementById('EditBtn_0');
			const pmSaveBtn = note.document.getElementById('SubmitPostBtn_0');

			pmEditBtn.click();

			const noteStartSplitter = /Game \d+ notes:\n/g;
			const noteEndSplitter = /End of game (\d+) notes\n__________________________________________________/g;
			const allNotes = pmTextArea.value.split(noteStartSplitter);
			const allNotesLen = allNotes.length;
			let allNonPrivateNoteContent = "";// to erase notes afterwards

			for (let i = 0; i < allNotesLen; i++) {
				let note = allNotes[i];
				let noteMsg;
				let noteGameId;
				let noteSplit = note.split(noteEndSplitter);
				let isValidNote = noteSplit.length > 1;

				if (isValidNote) {
					noteMsg = noteSplit[0];
					noteGameId = noteSplit[1];

					myNotes.push({gameId: noteGameId, value: noteMsg});
				}
				else {
					allNonPrivateNoteContent += noteSplit[0];
				}
			}

			if (typeof callback == "function") {
				callback(myNotes);

				// erase the notes
				pmTextArea.value = allNonPrivateNoteContent;
				pmSaveBtn.click();
				currentPage.alert("Successfully converted notes to JZ format");
				showInstallLocation();
			}
			}catch(err){
				currentPage.prompt("An error occurred when convert these notes to JZ format:", err.name + '\n' + err.message + '\n' + err.stack);
			}
			finally {
				currentPage = window;
			}
		};
	}

	readNotes(makeJzNotes);
})();