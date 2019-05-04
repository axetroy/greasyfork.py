// ==UserScript==
// @name        retail statistics
// @namespace   yichizhng@gmail.com
// @describe    Collects customer action statistics for BvS Retail
// @include     http://*animecubed.com/billy/bvs/shop-retail.html
// @version     1.2
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @description Collects customer action statistics for BvS Retail
// ==/UserScript==

//const customerRegex = /(Fanboy|Fangirl|Bad Haggler|Buffet|Ghost Michelle|Hater|One-Up|Shipper|Skimmer|Soft Talker|Wanderer|Umm|Clumsy Cosplayer|Model|Cardrat|Bender|Cropduster|Fighter|Childswarm|MeowMeow|Tsk|Con Bro|El Supercast|SimonSan|Ze Regular|Whale)/;

var username = document.querySelector('input[name="player"]').value;

var shadowname = username.split('').reverse().join('');

var customerRegex = new RegExp('(?:Fanboy|Fangirl|Bad Haggler|Buffet|Ghost Michelle|Hater|One-Up|Shipper|Skimmer|Soft Talker|Wanderer|Umm|Clumsy Cosplayer|Model|Cardrat|Bender|Cropduster|Fighter|Childswarm|MeowMeow|Tsk|Con Bro|El Supercast|SimonSan|Ze Regular|Whale|' + shadowname + ')');

var actionRegex = function() { return new RegExp('(Fanboy|Fangirl|Bad Haggler|Buffet|Ghost Michelle|Hater|One-Up|Shipper|Skimmer|Soft Talker|Wanderer|Umm|Clumsy Cosplayer|Model|Cardrat|Bender|Cropduster|Fighter|Childswarm|MeowMeow|Tsk|Con Bro|El Supercast|SimonSan|Ze Regular|Whale|' + shadowname + ')(.*?)(::|$)', 'g') };

var inc = function(object, property) {
  if (property.trim()) {
    object[property.trim()] = (object[property.trim()] || 0) + 1;
  }
};

var dec = function(object, property) {
  if (property.trim()) {
    object[property.trim()] = (object[property.trim()] || 0) - 1;
  }
};


// Return the type of a customer
var parseCustomer = function(text) {
  var empty = /Empty/.test(text);
  if (empty) { return '' }
  
  var customerType = customerRegex.exec(text);
  if (!customerType) {
    return 'Unknown';
  }
  if (customerType[0] == shadowname) {
    return 'Shadow Player';
  }
  return customerType[0];
}

var parseStore = function(actions) {
  var store = document.querySelectorAll('table[cellpadding="0"]')[4];
  var storeTable = store.children[0];
  var rows = storeTable.children;
  var topRow = rows[0].children;
  var bottomRow = rows[1].children;
  

  for (var col = 0; col < 7; col++) {
    if (col == 0 || col == 3 || col == 6) {
      // parsedTopRow.push(new Customer());
    } else {
      inc(actions, parseCustomer(topRow[col].textContent));
    }
    
    if (col == 2 || col == 4 || col == 5) {
      // parsedBottomRow.push(new Customer());
    } else {
      inc(actions, parseCustomer(bottomRow[col].textContent));
    }
  }
 
};

var parseActions = function(actions) {
  var customerText = document.querySelector('td[width="440"][align="center"]');
  if (!customerText) {
    // console.log('No actions');
    return false;
  }
  var text = customerText.textContent.trim();
  var potato = text.indexOf('Potatoes');
  if (potato == -1) {
    return false; // Nothing interesting happened
  } else {
    text = text.substr(potato + 8);
  }

  var ar = actionRegex();
  var match;
  while (match = ar.exec(text)) {
    if (match[1] == shadowname) { match[1] = 'Shadow Player'; }
    if (/walks in!/.test(match[2])) {
      dec(actions, match[1]);
    } else {
      if (/tries to move/.test(match[2])) {
	    } else if (/rushes out the door from the stench/.test(match[2])) {
	    } else if (/almost throws up/.test(match[2])) {
	    } else if (/is getting ready to leave/.test(match[2])) {
      } else if (/leaves!/.test(match[2])) {
      } else if (/moves to/.test(match[2])) {
	    } else if (/checks out!/.test(match[2])) {
      } else if (/TOUCHES THE MARKERS/.test(match[2])) {
	    } else {
        //console.log('not skipped:');
        inc(actions, match[1] + match[2])
  	  }
    }
     //console.log(match[0]);
  }
  return true;
};

var updateStoredValue = function(actions, property) {
	var oldProperty = GM_getValue(property, 0);
	GM_setValue(property, oldProperty + actions[property]);
};

var updateStoredValues = function(actions) {
	for (property in actions) {
		updateStoredValue(actions, property);
	}
};

var showStoredValues = function() {
	var text = '';
	
	var values = GM_listValues();
	for each (var val in values) {
		//console.log(val + ': ' + GM_getValue(val));
		if (val.length < 20) {
      var customerTotal = GM_getValue(val);
			text += '\n';
    }
		text += val + ': ' + GM_getValue(val);
    if (val.length < 20) {
      text += '\n';
    } else {
      text += ' (' + (100*(GM_getValue(val)/customerTotal)).toFixed(2) + '%)\n';
    }
    // GM_deleteValue(val);
	}
	window.open("data:text/plain;charset=ascii," + encodeURIComponent(text), '_blank');
};

var main = function() {
  if (!document.makeaction) {
	  // showStoredValues();
	document.addEventListener('keyup', function(e) {
      if (e.code != 'KeyC') return;
      showStoredValues();
    }, false);
    return;
  }
  var actions = {};
  parseStore(actions);
  var acted = parseActions(actions);
  if (!acted) {
    console.log('Nothing interesting happens.');
    return;	
  }
  /*
  for (c in actions) {
    console.log(c + ': ' + actions[c]);
  } */
  updateStoredValues(actions);
};

main();
