// ==UserScript==
// @name         IMDB List Importer
// @namespace    Neinei0k_imdb
// @include      https://www.imdb.com/list/*
// @version	     6.0
// @grant        none
// @description  Import list of titles or people in the imdb list
// ==/UserScript==

var o = {

init: function(e) {
	this.etext = e.querySelector('textarea');
	this.efile = e.querySelector('input[type="file"]');
	this.eready = e.children[10]; // DOM element with messages for the user.
	var checkboxes = e.querySelectorAll('input[type="checkbox"]');
	this.source = checkboxes[0];
	this.csv = checkboxes[1];
	this.unique = checkboxes[2];
  
  var hidden_element =  document.querySelector('#main > input'); // Unknown hidden element. Data needs to be send with all requests.
  if (hidden_element == null) {
   	this.log('e','Hidden element not found');
  } else {
  	this.hidden_data = hidden_element.id + "=" + hidden_element.value;
  }
},

run: function(event) {
	this.text = this.etext.value;
	if (this.source.checked) { // read data from file
		var file = this.efile.files[0];
		if (file !== undefined) {
			this.log("i","Reading file " + file.name);
			var r = new FileReader();
			r.onload = this.file_onload.bind(this);
			r.readAsText(file);
		} else {
			this.log("e","File is undefined");
		}
	} else { // read data from input element
		this.add_list(this.create_list());
	}
},

file_onload: function(e) {
	if (e.target.error === null) {
		this.text = e.target.result;
		this.add_list(this.create_list());
	} else {
		this.log("e","File reading error: " + e.target.error);
	}
},

log: function(level,msg) {
	var l = "";
  switch (level) {
    case 'i': l = "Info: "; break;
    case 'w': l = "Warning: "; break;
    case 'e': l = "Error: "; break;
  }
	if (l.length !== 0)
		console.log("IMDB List Importer: " + l + msg);
	if (level == "n" || level == "e")
		this.eready.innerText = msg;
},

create_list: function() {
	var re;
	// Find type of the list
	/*if (document.querySelector('[data-type="Characters"]') !== null) {
		this.log("i", "List type: characters");
		re = "ch";
	} else*/
  if (document.querySelector('[data-type="People"]') !== null) {
		this.log("i", "List type: people");
		re = "nm";
	} else if (document.querySelector('[data-type="Titles"]') !== null) {
		this.log("i", "List type: titles");
		re = "tt";
	} else {
		this.log("e","Could not determine type of the list");
		return [];
	}
	re += "[0-9]{7}";

	if (this.csv.checked) {
		return this.read_csv(re);
	} else {
		re = new RegExp(re);
		var list = [];
		var e;
		var text = this.text;
		while ((e = re.exec(text)) !== null) {
			var flag = '';
			if (this.unique.checked) flag = 'g';
			text = text.replace(new RegExp(e[0], flag), '');
			list.push({const: e[0], description: ""});
		}
		return list;
	}
},

read_csv: function(re) {
	re = new RegExp("^" + re + "$");
	var list = [];
  
  // Parse csv
  var text = this.text.split('\n'); // Separate by lines
  this.text = null; // Variable may have lots of data which is no longer needed
  var parsed_text = [];
  for (var i in text) { // For each line
    if (text[i].trim().length === 0) { // Ignore empty lines including lines with only white space characters
      continue;
    }
    var state = 0; // 0 - outside of double quotes (comma character is the separator), 1 - inside double quotes (comma character is part of a field)
    var parsed_line = [""];
    for (var j in text[i]) {
      if (state == 0 && text[i][j] == ',') {
        parsed_line.push("");
      } else if (text[i][j] == '"') {
        state = (state + 1) % 2;
      } else {
        parsed_line[parsed_line.length-1] += text[i][j];
      }
    }
    parsed_text.push(parsed_line);
  }
  text = parsed_text;
  
  // console.log(text); // print parsed data

	// Find const and description field numbers.
	try {
    if (text.length < 2) { // There must be at least 2 rows in the data
    	throw "No data";
    }
		var fl = text[0];
		var fll = fl.length;
		var const_field = fl.indexOf('const');
		if (const_field === -1) {
      const_field = fl.indexOf('Const');
      if (const_field === -1) {
      	throw "Field 'const' not found.";
      }
    }
		var desc_field = fl.indexOf('description');
		if (desc_field === -1) {
      desc_field = fl.indexOf('Description');
      if (desc_field === -1) {
      	throw "Field 'description' not found.";
      }
    }
	} catch (err) {
		this.log("e","Input line 1: " + err);
		return [];
	}
	this.log("i","Found csv file fields const(" + const_field +
	             ") and description(" + desc_field + ")");
	text.shift();

	// Add elements to the list
	for (var i = 0; i < text.length; i++) {
		if (text[i].length === 0)
			continue;
		try {
			fl = text[i];
			if (fll !== fl.length) throw "Invalid number of fields.";
			if (re.exec(fl[const_field]) === null) throw "Invalid 'const' field.";
		} catch (err) {
			this.log("e","Input line " + (i+2) + ": " + err);
			return [];
		}
		if (this.unique.checked) {
			var exists = list.findIndex(function(v){
				return v.const === fl[const_field];
			});
			if (exists !== -1) continue;
		}
		list.push({const: fl[const_field],description: fl[desc_field]});
	}
 
  // console.log(list); // Print final list
  
	return list;
},
	
add_list: function(list) {
	if (list.length === 0)
		return;

	var msg = "Elements to add: ";
	for (var i in list)
		msg += list[i].const + ",";
	this.log("i",msg);

	var l = {};
	l.list = list;
	l.ready = 0;
	l.list_id = /ls[0-9]{1,}/.exec(location.href)[0];
  
	this.sendNext(l);
},

sendNext: function(l) {
	this.log("i",'Add element ' + l.ready + ': ' + l.list[l.ready].const);
	this.send_request(this.check_item, l, 'https://www.imdb.com/list/' + l.list_id + '/' + l.list[l.ready].const + '/add', this.hidden_data);
},

send_request: function(f,l,u,d) {
	var x = new XMLHttpRequest();
	x.onreadystatechange = f.bind(this,l);
	x.open('POST', u, true);
	x.setRequestHeader('Content-Type',
	  'application/x-www-form-urlencoded');
	x.send(d);
},

check_item: function(l, e) {
	this.log("i","Add element(" + l.list[l.ready].const +
	             ") request: readyState(" + e.target.readyState +
	             "), status(" + e.target.status + ")");
	if (e.target.readyState == 4 && e.target.status == 200) {
		if (l.list[l.ready].description.length !== 0) {
			this.send_request(this.check_item_desc, l, 'https://www.imdb.com/list/' + l.list_id + '/edit/itemdescription',
			                  'newDescription=' + l.list[l.ready].description +
			                  '&listItem=' + JSON.parse(e.target.responseText).list_item_id + '&' + this.hidden_data);
		} else {
			this.showReady(l);
		}
	}
},

check_item_desc: function(l,e) {
	this.log("i","Add element(" + l.list[l.ready].const +
	             ") description request: readyState(" + e.target.readyState +
	             "), status(" + e.target.status + ")");
	if (e.target.readyState == 4 && e.target.status == 200) {
		this.showReady(l);
	}
},

showReady: function(l) {
	l.ready += 1;
	this.log("n",'Ready ' + l.ready + ' of ' + l.list.length + '.');
	if (l.ready == l.list.length) {
		location.reload();
	} else {
		this.sendNext(l);
	}
},

change: function(e) {
	var s = e.target.checked;
	this.etext.disabled = s;
	this.efile.disabled = !s;
},

};

var c = window.File && window.FileReader && window.FileList && window.Blob; // Check support of File API
var div = document.createElement('div');
div.setAttribute('class', 'search-bar');
div.style.height = "initial"
var s = '<textarea style="background-color: white; width: 100%; height: 100px; overflow: initial"></textarea><br>';
if (c) {
	s += '<input type="file" disabled><br>';
	s += '<label>';
	s += '<input type="checkbox" style="width: initial;">';
	s += '<span style="font-weight: normal;">';
	s += 'Import from file (otherwise import from text)';
	s += '</span>';
	s += '</label><br>';
} else {
	s += '<span style="font-weight: normal;">';
	s += 'Looks like your browser does not support File API for reading local files.';
	s += '</span><br>';
}
s += '<label>';
s += '<input type="checkbox" checked style="width: initial;">';
s += '<span style="font-weight: normal;">Data from .csv file</span>';
s += '</label><br>';
s += '<label>';
s += '<input type="checkbox" style="width: initial;">';
s += '<span style="font-weight: normal;">Add only unique elements</span>';
s += '</label><br>';
s += '<div>Set-up parameters. Insert text or choose file. Press \'Import List\' button.</div>';
s += '<button class="btn">Import List</button>';
div.innerHTML = s;

o.init(div);
div.querySelector('button').addEventListener('click',o.run.bind(o),false);
if (c) {
	o.source.addEventListener('change',o.change.bind(o),false);
}

var list_edit = document.querySelector('.lister-search');
list_edit.appendChild(div);
