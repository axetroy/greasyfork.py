// ==UserScript==
// @name		 Beautify Apache server-status page
// @namespace	 http://denilson.sa.nom.br/
// @author		 Denilson Sá
// @grant		 none
// @version		 1.5
// @description  Apache HTTP server can have mod_status enabled and can
//			display some server status via HTTP/HTML (there must be some
//			uncommented lines in httpd.conf). However, the page sent to
//			browser is a bit raw, completely unstyled, and hard to read.
//			This script tries to make that page much prettier and more
//			readable. It has been tested with Apache 2.0.55 and 2.2.21 and
//			should work on most versions, unless the generated HTML changes,
//			which will gradually degrade the script.
// @include		 http://*/server-status
// @include		 https://*/server-status
// ==/UserScript==


//////////////////////////////////////////////////////////////////////
// Including code from:
// http://www.kryogenix.org/code/browser/sorttable/
// fetched on 2011-10-18
// Slightly modified in order to fix bugs


// Denilson has moved to the top of the script instead of the bottom.
// Dean's forEach: http://dean.edwards.name/base/forEach.js
/*
	forEach, version 1.0
	Copyright 2006, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

// array-like enumeration
if (!Array.forEach) { // mozilla already supports this
	Array.forEach = function(array, block, context) {
		for (var i = 0; i < array.length; i++) {
			block.call(context, array[i], i, array);
		}
	};
}

// generic enumeration
Function.prototype.forEach = function(object, block, context) {
	for (var key in object) {
		if (typeof this.prototype[key] == "undefined") {
			block.call(context, object[key], key, object);
		}
	}
};

// character enumeration
String.forEach = function(string, block, context) {
	Array.forEach(string.split(""), function(chr, index) {
		block.call(context, chr, index, string);
	});
};

// globally resolve forEach enumeration
var forEach = function(object, block, context) {
	if (object) {
		var resolve = Object; // default
		if (object instanceof Function) {
			// functions have a "length" property
			resolve = Function;
		} else if (object.forEach instanceof Function) {
			// the object implements a custom forEach method so use that
			object.forEach(block, context);
			return;
		} else if (typeof object == "string") {
			// the object is a string
			resolve = String;
		} else if (typeof object.length == "number") {
			// the object is array-like
			resolve = Array;
		}
		resolve.forEach(object, block, context);
	}
};



/*
  SortTable
  version 2
  7th April 2007
  Stuart Langridge, http://www.kryogenix.org/code/browser/sorttable/
  
  Instructions:
  Download this file
  Add <script src="sorttable.js"></script> to your HTML
  Add class="sortable" to any table you'd like to make sortable
  Click on the headers to sort
  
  Thanks to many, many people for contributions and suggestions.
  Licenced as X11: http://www.kryogenix.org/code/browser/licence.html
  This basically means: do what you want with it.
*/

 
// Denilson has changed this to always false.
var stIsIE = false;

sorttable = {
  init: function() {
	// quit if this function has already been called
	if (arguments.callee.done) return;
	// flag this function so we don't do the same thing twice
	arguments.callee.done = true;

	// Denilson removed this because the timer is not even set anymore
	// kill the timer
	//if (_timer) clearInterval(_timer);
	
	if (!document.createElement || !document.getElementsByTagName) return;
	
	sorttable.DATE_RE = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;
	
	forEach(document.getElementsByTagName('table'), function(table) {
	  if (table.className.search(/\bsortable\b/) != -1) {
		sorttable.makeSortable(table);
	  }
	});
	
  },
  
  makeSortable: function(table) {
	if (table.getElementsByTagName('thead').length == 0) {
	  // table doesn't have a tHead. Since it should have, create one and
	  // put the first table row in it.
	  the = document.createElement('thead');
	  the.appendChild(table.rows[0]);
	  table.insertBefore(the,table.firstChild);
	}
	// Safari doesn't support table.tHead, sigh
	if (table.tHead == null) table.tHead = table.getElementsByTagName('thead')[0];
	
	if (table.tHead.rows.length != 1) return; // can't cope with two header rows
	
	// Sorttable v1 put rows with a class of "sortbottom" at the bottom (as
	// "total" rows, for example). This is B&R, since what you're supposed
	// to do is put them in a tfoot. So, if there are sortbottom rows,
	// for backwards compatibility, move them to tfoot (creating it if needed).
	sortbottomrows = [];
	for (var i=0; i<table.rows.length; i++) {
	  if (table.rows[i].className.search(/\bsortbottom\b/) != -1) {
		sortbottomrows[sortbottomrows.length] = table.rows[i];
	  }
	}
	if (sortbottomrows) {
	  if (table.tFoot == null) {
		// table doesn't have a tfoot. Create one.
		tfo = document.createElement('tfoot');
		table.appendChild(tfo);
	  }
	  for (var i=0; i<sortbottomrows.length; i++) {
		tfo.appendChild(sortbottomrows[i]);
	  }
	  delete sortbottomrows;
	}
	
	// work through each column and calculate its type
	headrow = table.tHead.rows[0].cells;
	for (var i=0; i<headrow.length; i++) {
	  // manually override the type with a sorttable_type attribute
	  if (!headrow[i].className.match(/\bsorttable_nosort\b/)) { // skip this col
		mtch = headrow[i].className.match(/\bsorttable_([a-z0-9]+)\b/);
		if (mtch) { override = mtch[1]; }
		  if (mtch && typeof sorttable["sort_"+override] == 'function') {
			headrow[i].sorttable_sortfunction = sorttable["sort_"+override];
		  } else {
			headrow[i].sorttable_sortfunction = sorttable.guessType(table,i);
		  }
		  // make it clickable to sort
		  headrow[i].sorttable_columnindex = i;
		  headrow[i].sorttable_tbody = table.tBodies[0];
		  dean_addEvent(headrow[i],"click", function(e) {

		  if (this.className.search(/\bsorttable_sorted\b/) != -1) {
			// if we're already sorted by this column, just 
			// reverse the table, which is quicker
			sorttable.reverse(this.sorttable_tbody);
			this.className = this.className.replace('sorttable_sorted',
													'sorttable_sorted_reverse');
			this.removeChild(document.getElementById('sorttable_sortfwdind'));
			sortrevind = document.createElement('span');
			sortrevind.id = "sorttable_sortrevind";
			sortrevind.innerHTML = stIsIE ? '&nbsp<font face="webdings">5</font>' : '&nbsp;&#x25B4;';
			this.appendChild(sortrevind);
			return;
		  }
		  if (this.className.search(/\bsorttable_sorted_reverse\b/) != -1) {
			// if we're already sorted by this column in reverse, just 
			// re-reverse the table, which is quicker
			sorttable.reverse(this.sorttable_tbody);
			this.className = this.className.replace('sorttable_sorted_reverse',
													'sorttable_sorted');
			this.removeChild(document.getElementById('sorttable_sortrevind'));
			sortfwdind = document.createElement('span');
			sortfwdind.id = "sorttable_sortfwdind";
			sortfwdind.innerHTML = stIsIE ? '&nbsp<font face="webdings">6</font>' : '&nbsp;&#x25BE;';
			this.appendChild(sortfwdind);
			return;
		  }
		  
		  // remove sorttable_sorted classes
		  theadrow = this.parentNode;
		  forEach(theadrow.childNodes, function(cell) {
			if (cell.nodeType == 1) { // an element
			  cell.className = cell.className.replace('sorttable_sorted_reverse','');
			  cell.className = cell.className.replace('sorttable_sorted','');
			}
		  });
		  sortfwdind = document.getElementById('sorttable_sortfwdind');
		  if (sortfwdind) { sortfwdind.parentNode.removeChild(sortfwdind); }
		  sortrevind = document.getElementById('sorttable_sortrevind');
		  if (sortrevind) { sortrevind.parentNode.removeChild(sortrevind); }
		  
		  this.className += ' sorttable_sorted';
		  sortfwdind = document.createElement('span');
		  sortfwdind.id = "sorttable_sortfwdind";
		  sortfwdind.innerHTML = stIsIE ? '&nbsp<font face="webdings">6</font>' : '&nbsp;&#x25BE;';
		  this.appendChild(sortfwdind);

			// build an array to sort. This is a Schwartzian transform thing,
			// i.e., we "decorate" each row with the actual sort key,
			// sort based on the sort keys, and then put the rows back in order
			// which is a lot faster because you only do getInnerText once per row
			row_array = [];
			col = this.sorttable_columnindex;
			rows = this.sorttable_tbody.rows;
			for (var j=0; j<rows.length; j++) {
			  row_array[row_array.length] = [sorttable.getInnerText(rows[j].cells[col]), rows[j]];
			}
			/* If you want a stable sort, uncomment the following line */
			//sorttable.shaker_sort(row_array, this.sorttable_sortfunction);
			/* and comment out this one */
			row_array.sort(this.sorttable_sortfunction);
			
			tb = this.sorttable_tbody;
			for (var j=0; j<row_array.length; j++) {
			  tb.appendChild(row_array[j][1]);
			}
			
			delete row_array;
		  });
		}
	}
  },
  
  guessType: function(table, column) {
	// guess the type of a column based on its first non-blank row
	sortfn = sorttable.sort_alpha;
	for (var i=0; i<table.tBodies[0].rows.length; i++) {
	  text = sorttable.getInnerText(table.tBodies[0].rows[i].cells[column]);
	  if (text != '') {
		if (text.match(/^-?[£$¤]?[\d,.]+%?$/)) {
		  return sorttable.sort_numeric;
		}
		// check for a date: dd/mm/yyyy or dd/mm/yy 
		// can have / or . or - as separator
		// can be mm/dd as well
		possdate = text.match(sorttable.DATE_RE)
		if (possdate) {
		  // looks like a date
		  first = parseInt(possdate[1]);
		  second = parseInt(possdate[2]);
		  if (first > 12) {
			// definitely dd/mm
			return sorttable.sort_ddmm;
		  } else if (second > 12) {
			return sorttable.sort_mmdd;
		  } else {
			// looks like a date, but we can't tell which, so assume
			// that it's dd/mm (English imperialism!) and keep looking
			sortfn = sorttable.sort_ddmm;
		  }
		}
	  }
	}
	return sortfn;
  },
  
  getInnerText: function(node) {
	// gets the text we want to use for sorting for a cell.
	// strips leading and trailing whitespace.
	// this is *not* a generic getInnerText function; it's special to sorttable.
	// for example, you can override the cell text with a customkey attribute.
	// it also gets .value for <input> fields.
	
	hasInputs = (typeof node.getElementsByTagName == 'function') &&
				 node.getElementsByTagName('input').length;
	
	if (node.getAttribute("sorttable_customkey") != null) {
	  return node.getAttribute("sorttable_customkey");
	}
	else if (typeof node.textContent != 'undefined' && !hasInputs) {
	  return node.textContent.replace(/^\s+|\s+$/g, '');
	}
	else if (typeof node.innerText != 'undefined' && !hasInputs) {
	  return node.innerText.replace(/^\s+|\s+$/g, '');
	}
	else if (typeof node.text != 'undefined' && !hasInputs) {
	  return node.text.replace(/^\s+|\s+$/g, '');
	}
	else {
	  switch (node.nodeType) {
		case 3:
		  if (node.nodeName.toLowerCase() == 'input') {
			return node.value.replace(/^\s+|\s+$/g, '');
		  }
		case 4:
		  return node.nodeValue.replace(/^\s+|\s+$/g, '');
		  break;
		case 1:
		case 11:
		  var innerText = '';
		  for (var i = 0; i < node.childNodes.length; i++) {
			innerText += sorttable.getInnerText(node.childNodes[i]);
		  }
		  return innerText.replace(/^\s+|\s+$/g, '');
		  break;
		default:
		  return '';
	  }
	}
  },
  
  reverse: function(tbody) {
	// reverse the rows in a tbody
	newrows = [];
	for (var i=0; i<tbody.rows.length; i++) {
	  newrows[newrows.length] = tbody.rows[i];
	}
	for (var i=newrows.length-1; i>=0; i--) {
	   tbody.appendChild(newrows[i]);
	}
	delete newrows;
  },
  
  /* sort functions
	 each sort function takes two parameters, a and b
	 you are comparing a[0] and b[0] */
  sort_numeric: function(a,b) {
	aa = parseFloat(a[0].replace(/[^0-9.-]/g,''));
	if (isNaN(aa)) aa = 0;
	bb = parseFloat(b[0].replace(/[^0-9.-]/g,'')); 
	if (isNaN(bb)) bb = 0;
	return aa-bb;
  },
  sort_alpha: function(a,b) {
	if (a[0]==b[0]) return 0;
	if (a[0]<b[0]) return -1;
	return 1;
  },
  sort_ddmm: function(a,b) {
	mtch = a[0].match(sorttable.DATE_RE);
	y = mtch[3]; m = mtch[2]; d = mtch[1];
	if (m.length == 1) m = '0'+m;
	if (d.length == 1) d = '0'+d;
	dt1 = y+m+d;
	mtch = b[0].match(sorttable.DATE_RE);
	y = mtch[3]; m = mtch[2]; d = mtch[1];
	if (m.length == 1) m = '0'+m;
	if (d.length == 1) d = '0'+d;
	dt2 = y+m+d;
	if (dt1==dt2) return 0;
	if (dt1<dt2) return -1;
	return 1;
  },
  sort_mmdd: function(a,b) {
	mtch = a[0].match(sorttable.DATE_RE);
	y = mtch[3]; d = mtch[2]; m = mtch[1];
	if (m.length == 1) m = '0'+m;
	if (d.length == 1) d = '0'+d;
	dt1 = y+m+d;
	mtch = b[0].match(sorttable.DATE_RE);
	y = mtch[3]; d = mtch[2]; m = mtch[1];
	if (m.length == 1) m = '0'+m;
	if (d.length == 1) d = '0'+d;
	dt2 = y+m+d;
	if (dt1==dt2) return 0;
	if (dt1<dt2) return -1;
	return 1;
  },
  
  shaker_sort: function(list, comp_func) {
	// A stable sort function to allow multi-level sorting of data
	// see: http://en.wikipedia.org/wiki/Cocktail_sort
	// thanks to Joseph Nahmias
	var b = 0;
	var t = list.length - 1;
	var swap = true;

	while(swap) {
		swap = false;
		for(var i = b; i < t; ++i) {
			if ( comp_func(list[i], list[i+1]) > 0 ) {
				var q = list[i]; list[i] = list[i+1]; list[i+1] = q;
				swap = true;
			}
		} // for
		t--;

		if (!swap) break;

		for(var i = t; i > b; --i) {
			if ( comp_func(list[i], list[i-1]) < 0 ) {
				var q = list[i]; list[i] = list[i-1]; list[i-1] = q;
				swap = true;
			}
		} // for
		b++;

	} // while(swap)
  }  
}

/* ******************************************************************
   Supporting functions: bundled here to avoid depending on a library
   ****************************************************************** */

// Dean Edwards/Matthias Miller/John Resig

// Denilson has disabled the code below. I'm manually calling sorttable.init instead.
// // for Mozilla/Opera9
// if (document.addEventListener) {
//	   document.addEventListener("DOMContentLoaded", sorttable.init, false);
// }
// 
// // for Internet Explorer
// // Removed
// 
// // for Safari
// if (/WebKit/i.test(navigator.userAgent)) { // sniff
//	   var _timer = setInterval(function() {
//		   if (/loaded|complete/.test(document.readyState)) {
//			   sorttable.init(); // call the onload handler
//		   }
//	   }, 10);
// }
// 
// // for other browsers
// //window.onload = sorttable.init;


// written by Dean Edwards, 2005
// with input from Tino Zijdel, Matthias Miller, Diego Perini

// http://dean.edwards.name/weblog/2005/10/add-event/

function dean_addEvent(element, type, handler) {
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else {
		// assign each event handler a unique ID
		if (!handler.$$guid) handler.$$guid = dean_addEvent.guid++;
		// create a hash table of event types for the element
		if (!element.events) element.events = {};
		// create a hash table of event handlers for each element/event pair
		var handlers = element.events[type];
		if (!handlers) {
			handlers = element.events[type] = {};
			// store the existing event handler (if there is one)
			if (element["on" + type]) {
				handlers[0] = element["on" + type];
			}
		}
		// store the event handler in the hash table
		handlers[handler.$$guid] = handler;
		// assign a global event handler to do all the work
		element["on" + type] = handleEvent;
	}
};
// a counter used to create unique IDs
dean_addEvent.guid = 1;

function removeEvent(element, type, handler) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else {
		// delete the event handler from the hash table
		if (element.events && element.events[type]) {
			delete element.events[type][handler.$$guid];
		}
	}
};

function handleEvent(event) {
	var returnValue = true;
	// grab the event object (IE uses a global event object)
	event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
	// get a reference to the hash table of event handlers
	var handlers = this.events[event.type];
	// execute each event handler
	for (var i in handlers) {
		this.$$handleEvent = handlers[i];
		if (this.$$handleEvent(event) === false) {
			returnValue = false;
		}
	}
	return returnValue;
};

function fixEvent(event) {
	// add W3C standard event methods
	event.preventDefault = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
};
fixEvent.preventDefault = function() {
	this.returnValue = false;
};
fixEvent.stopPropagation = function() {
	this.cancelBubble = true;
};

// Denilson has moved "Dean's forEach" to the top of the script

// End of code from sorttable.js
//////////////////////////////////////////////////////////////////////




(function() {

	// Configuration.

	// Colors:
	var table_head_bg = "#525d76";
	var table_head_fg = "white";

	var table_row0_bg = "#d6d7e9";	// Old 1.0 color: #ffffff
	var table_row0_fg = "black";
	var table_row1_bg = "#eaebff";	// Old 1.0 color: #d6d7e9
	var table_row1_fg = "black";

	var table_row0_hover_bg = "white";
	var table_row0_hover_fg = "black";
	var table_row1_hover_bg = "white";
	var table_row1_hover_fg = "black";

	var table_border = "black";
	var td_border = "#AAA";

	var pre_bg = "#eaebff";
	var pre_fg = "black";
	var pre_border = "black";

	//
	// DO NOT EDIT BELOW THIS LINE!
	//

	// Main code below.
	var head = document.getElementsByTagName('head')[0];
	if (head) {
		// Adding the style sheet
		var style = document.createElement('style');
		style.setAttribute('type', 'text/css');
		style.appendChild(document.createTextNode(
			'html,body { background: white; color: black; padding: 0; margin: 0;}\n' +
			'body  { padding: 1em; }\n' +
			'dt    { margin-top: 1ex; font-weight: bold; }\n' +
			'pre   { border: 2px solid ' + pre_border + '; padding: 1ex; margin: 1em 0; background: ' + pre_bg + '; color: ' + pre_fg + '; }\n' +
			'table { border: 2px solid ' + table_border + '; border-collapse: collapse; margin: 1em 0; }\n' +
			'td,th { border: 1px solid ' + td_border + '; border-width: 0 1px; padding: 0.1em 0.5ex; white-space: nowrap; }\n' +
			'th    { background: ' + table_head_bg + '; color: ' + table_head_fg + '; text-align: center; font-weight: bold; }\n' +
			'#connectionsheadtable th { background: transparent; color: inherit; text-align: right;  font-weight: bold; }\n' +
			'#scoreboardtable	   th { background: transparent; color: inherit; text-align: center; font-weight: bold; }\n' +
			'#scoreboardtable, #connectionsheadtable { float: left; margin: 0 1em 0 0;}\n' +
			'hr { float: none; clear: both; }\n' +
			'tr:nth-child(even) { background: ' + table_row0_bg + '; color: ' + table_row0_fg + '; }\n' +
			'tr:nth-child(odd)	{ background: ' + table_row1_bg + '; color: ' + table_row1_fg + '; }\n' +
			'tr:nth-child(even):hover { background: ' + table_row0_hover_bg + '; color: ' + table_row0_hover_fg + '; }\n' +
			'tr:nth-child(odd):hover { background: ' + table_row1_hover_bg + '; color: ' + table_row1_hover_fg + '; }\n'
		));
		head.appendChild(style);

		// Finding and naming some tables (putting IDs).
		var pidtable = null;
		var connectionstable = null;
		var connectionsheadtable = null;
		Array.prototype.forEach.call(
			document.getElementsByTagName('table'),
			function(table) {
				var heading_text = table.getElementsByTagName('tr')[0].textContent;
				if (heading_text.indexOf('Connections') > -1) {
					pidtable = table;
					pidtable.setAttribute('id', 'pidtable');
				} else if (heading_text.indexOf('Request') > -1) {
					connectionstable = table;
					connectionstable.setAttribute('id', 'connectionstable');
				} else if (heading_text.indexOf('Child Server number') > -1) {
					connectionsheadtable = table;
					connectionsheadtable.setAttribute('id', 'connectionsheadtable');
				}
			}
		);

		// Removing incorrect P element. (It is written <p />
		// at source, it was supposed to be a close-tag, I guess.)
		var temp = document.getElementsByTagName('p');
		if (temp.length==2) {
			temp = temp[1];
			while (temp.hasChildNodes()) {
				temp.parentNode.insertBefore(temp.childNodes[0], temp);
			}
			temp.parentNode.removeChild(temp);
		}
		temp = null;

		// Removing an HR element between the two tables.
		if (connectionsheadtable) {
			var temp = connectionsheadtable.previousElementSibling;
			if (temp && temp.tagName.toLowerCase() == 'hr') {
				temp.parentNode.removeChild(temp);
			}
		}

		function add_column_alignment_to_table(table, alignments) {
			if (!table) {
				return;
			}
			var firstchild = table.firstChild;
			alignments.forEach(function(align) {
				var colgroup=document.createElement('colgroup');
				colgroup.setAttribute('align', align);
				table.insertBefore(colgroup, firstchild);
			});
		}

		// Trying to style each column separately.
		add_column_alignment_to_table(pidtable, [
			'right',  // PID
			'right',  // total
			'center', // accepting
			'right',  // busy
			'right',  // idle
			'right',  // writing
			'right',  // keep-alive
			'right'   // closing
		]);
		add_column_alignment_to_table(connectionstable, [
			'left',   // Srv
			'right',  // PID
			'center', // Acc
			'center', // M
			'right',  // CPU
			'right',  // SS
			'right',  // Req
			'right',  // Conn
			'right',  // Child
			'right',  // Slot
			'right',  // Client
			'center', // VHost
			'left'	  // Request
		]);

		function thead_tfoot_and_sortable(table) {
			if (!table) {
				return;
			}

			// Creating/getting the THEAD and TFOOT.
			var firstchild = table.firstChild;
			var thead = table.getElementsByTagName('thead')[0];
			if (!thead) {
				thead = document.createElement('thead');
				table.insertBefore(thead, firstchild);
			}
			var tfoot = table.getElementsByTagName('tfoot')[0];
			if(!tfoot) {
				tfoot = document.createElement('tfoot');
				table.insertBefore(tfoot, firstchild);
			}

			// Moving headers to THEAD, and copying headers to TFOOT.
			var first_tr = table.getElementsByTagName('tr')[0];
			var second_tr = table.getElementsByTagName('tr')[1];
			thead.appendChild(first_tr);
			tfoot.appendChild(first_tr.cloneNode(true));

			if (second_tr.getElementsByTagName('th').length > 2) {
				thead.appendChild(second_tr);
				tfoot.appendChild(second_tr.cloneNode(true));
			}

			// Making it sortable.
			table.setAttribute('class', 'sortable');

		}
		thead_tfoot_and_sortable(pidtable);
		thead_tfoot_and_sortable(connectionstable);

		// Transforming a paragraph in a table.
		if (connectionstable) {
			var scoreboardtable = null;
			var scoreboard = connectionstable.previousElementSibling;
			if (scoreboard && scoreboard.tagName.toLowerCase() == 'p') {
				var text = scoreboard.textContent;

				// Removing header text "Scoreboard Key:".
				text = text.replace(/^[^:]+:/, '');
				// Removing newlines.
				text = text.replace(/[\r\n]/g, '');

				var elements = text.split(',');

				var scoreboardtable = document.createElement('table');
				var tbody = document.createElement('tbody');
				scoreboardtable.appendChild(tbody);
				scoreboardtable.setAttribute('id', 'scoreboardtable');

				var regex = /"(.)" +(.*[^ ]) */
				elements.forEach(function(elem) {
					var tr = document.createElement('tr');
					var th = document.createElement('th');
					var td = document.createElement('td');
					var match = regex.exec(elem);
					if (match) {
						th.appendChild(document.createTextNode(match[1]));
						td.appendChild(document.createTextNode(match[2]));
					} else {
						td.appendChild(document.createTextNode(elem));
					}
					tr.appendChild(th);
					tr.appendChild(td);
					tbody.appendChild(tr);
				});
				scoreboard.parentNode.insertBefore(scoreboardtable, connectionsheadtable);
				scoreboard.parentNode.removeChild(scoreboard);
			}
		}

		// Splitting <dt> into <dt> and <dd>.
		Array.prototype.forEach.call(
			document.getElementsByTagName('dl'),
			function(dl) {
				if (dl.getElementsByTagName('dd').length > 0) {
					return;
				}
				// Converting HTMLCollection to an Array, so that we can modify the elements without changing the array.
				var dts = Array.prototype.slice.call(dl.getElementsByTagName('dt'));
				dts.forEach(function(dt) {
					var match = /([^:]+): +(.*)/.exec(dt.textContent);
					if (match) {
						var dd = document.createElement('dd');
						dd.textContent = match[2];
						dt.textContent = match[1];
						dt.parentNode.insertBefore(dd, dt.nextSibling);
					} else {
						var dd = document.createElement('dd');
						dd.textContent = dt.textContent;
						dt.parentNode.insertBefore(dd, dt);
						dt.parentNode.removeChild(dt);
					}
				});
			}
		);

		// Finally, calling sorttable.init()
		sorttable.init();
	}
})();