﻿// ==UserScript==
// @name 		   BSCF : sdgardne About Me - 20 pages
// @namespace	   http://supportforums.blackberry.com/
// @description	version 2
// @include		http://supportforums.blackberry.com/t5/user/mobilemypostspage/page/*
// @include		https://supportforums.blackberry.com/t5/user/mobilemypostspage/page/*
// @version 0.0.1.20150820024950
// ==/UserScript==

/**
 * for each results page, reads the 10 threads and keeps the one with at least 1 New message
 * stored into MyThreadsList array.
**/
function condenseList(nodesSnapshot,_MyThreadsList,_pageNumber) {

	var nbrSpans = nodesSnapshot.snapshotLength;
	var myRow=document.createElement('tr');
	if (0!=nbrSpans) {
		var z=0 // when 0 then the HR has not been added yet
	
		for ( var i=0 ; i < nbrSpans ; i++ ) {
			var myCommenter=nodesSnapshot.snapshotItem(i);
			if (-1==myCommenter.textContent.indexOf(' (0 New)')) {
				// thread has at least 1 New message.
				
				if (0==z) {
					z=1;
					// on ajoute un hr
					var mySeperator=document.createElement('tr');
						var mytd1 = document.createElement('td');
							mytd1.appendChild(document.createTextNode('P'+_pageNumber));
						var mytd2 = document.createElement('td');
							mytd2.appendChild(document.createElement('hr'));
						var mytd3 = document.createElement('td');
						mySeperator.appendChild(mytd1);
						mySeperator.appendChild(mytd2);
						mySeperator.appendChild(mytd3);
					_MyThreadsList.push(mySeperator);
				} // end if
				
				myRow = myCommenter.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
				var dupRow = myRow.cloneNode(true);
				_MyThreadsList.push(dupRow);
				// le TR de l'idem
			} // end if
		} // end for
	} // end if

} // end function condenseList()

/** read last 20 pages
 * keeps threads with at least 1 New message.
**/
function fetchAndCondense(_MyThreadsList) {
	for ( var i=1 ; i<=20 ; i++ ) {
		var ficheURL = 'http://supportforums.blackberry.com/t5/user/mobilemypostspage/page/'+i;
		var xmlhttp;
		xmlhttp=new XMLHttpRequest();
		xmlhttp.open('GET',ficheURL,false);
		xmlhttp.send();
		var doc = document.implementation.createHTMLDocument('example');
		doc.documentElement.innerHTML = xmlhttp.responseText;
		var nodesSnapshot = doc.evaluate(
			  '//a[starts-with(@id, "threadReplies")]'
			, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
		);
		condenseList(nodesSnapshot,_MyThreadsList,i);
	} // end for
} // end function fetchAndCondense()

/**
 * main function
**/
window.xdx = function() {

	// hides the other table
	document.getElementsByTagName('table')[0].setAttribute('style','display: none;');

	var MyThreadsList= new Array();
	fetchAndCondense(MyThreadsList);
	
	// displays the unread list
	var myTable = document.createElement('table');
	myTable.setAttribute('style','border: solid red 1px');
	myTable.setAttribute('class','lia-list-wide');
	myTable.setAttribute('id','xdxNewMessages');
	for (var j=0 ; j<MyThreadsList.length ; j++) {
		myTable.appendChild(MyThreadsList[j]);
	} // end for
	document.getElementsByTagName('table')[0].parentNode.appendChild(myTable);
	
} // end xdx()

xdx();