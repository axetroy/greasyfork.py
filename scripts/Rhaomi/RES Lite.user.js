// ==UserScript==
// @name          RES Lite
// @description   Simplified version of RES v2.1 for iOS
// @version       2.10003
// @namespace     RESLite
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// ==/UserScript==

var RESVersion = 2.1;
function keyArrayCompare(fromArr, toArr) {
	
	if (typeof(toArr) == 'number') {
		toArr = Array(toArr,false,false,false);
	} else if (toArr.length == 4) {
		toArr.push(false);
	}
	if (fromArr.length != toArr.length) return false;
	for (var i = 0; i < toArr.length; i++) {
		if (fromArr[i].compare) { 
			if (!fromArr[i].compare(toArr[i])) return false;
		}
		if (fromArr[i] !== toArr[i]) return false;
	}
	return true;
}
function hasClass(ele,cls) {
	if ((typeof(ele) == 'undefined') || (ele == null)) {
		console.log(arguments.callee.caller);
		return false;
	}
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
	if (!hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}
function post_to_url(path, params, method) {
    method = method || "post"; 
    
    
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
}
if (typeof(safari) != 'undefined') {
	safari.self.addEventListener("message", safariMessageHandler, false);
}
var RESConsoleContainer = '';
var modalOverlay = '';
var RESMenuItems = new Array();
var RESConsolePanels = new Array();
var modules = new Array();
var RESUtils = {
	
	imgurAPIKey: 'fe266bc9466fe69aa1cf0904e7298eda',
	
	css: '',
	addCSS: function(css) {
		this.css += css;
	},
	
	isMatchURL: function (moduleID) {
		var currURL = location.href;
		
		var excludes = modules[moduleID].exclude;
		var includes = modules[moduleID].include;
		
		if (typeof(excludes) != 'undefined') {
			for (i=0, len = excludes.length; i<len; i++) {
				
				if (excludes[i].test(currURL)) {
					return false;
				}
			}
		}
		
		for (i=0, len=includes.length; i<len; i++) {
			
			if (includes[i].test(currURL)) {
				return true;
			}
		}
		return false;
	},
	
	getOptions: function(moduleID) {
		var thisOptions = localStorage.getItem('RESoptions.' + moduleID);
		var currentTime = new Date();
		if ((thisOptions) && (thisOptions != 'undefined') && (thisOptions != null)) {
			
			storedOptions = JSON.parse(thisOptions);
			codeOptions = modules[moduleID].options;
			for (attrname in codeOptions) {
				if (typeof(storedOptions[attrname]) == 'undefined') {
					storedOptions[attrname] = codeOptions[attrname];
				}
			}
			modules[moduleID].options = storedOptions;
			localStorage.setItem('RESoptions.' + moduleID, JSON.stringify(modules[moduleID].options));
		} else {
			
			localStorage.setItem('RESoptions.' + moduleID, JSON.stringify(modules[moduleID].options));
		}
		return modules[moduleID].options;
	},
	setOption: function(moduleID, optionName, optionValue) {
		
		var thisOptions = this.getOptions(moduleID);
		if ((isNaN(optionValue)) || (typeof(optionValue) == 'boolean') || (typeof(optionValue) == 'object')) {
			saveOptionValue = optionValue;
		} else if (optionValue.indexOf('.')) {
			saveOptionValue = parseFloat(optionValue);
		} else {
			saveOptionValue = parseInt(optionValue);
		}
		thisOptions[optionName].value = saveOptionValue;
		
		modules[moduleID].options = thisOptions;
		
		localStorage.setItem('RESoptions.' + moduleID, JSON.stringify(modules[moduleID].options));
		return true;
	},
	click: function(obj, button) { 
		var button = button || 0;
		var evt = document.createEvent('MouseEvents');
		evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, button, null); obj.dispatchEvent(evt); 
	},
	loggedInUser: function() {
		var userLink = document.querySelector('#header-bottom-right > span.user > a');
		if (userLink != null) {
			return userLink.innerHTML
		} else {
			return null;
		}
	},
	pageType: function() {
		var pageType = '';
		var currURL = location.href;
		var commentsRegex = new RegExp(/http:\/\/www.reddit.com\/[-\w\.\/]*comments\/[-\w\.\/]*/i);
		var inboxRegex = new RegExp(/http:\/\/www.reddit.com\/message\/[-\w\.\/]*/i);
		var submitRegex = new RegExp(/http:\/\/www.reddit.com\/[-\w\.\/]*\/submit\/?/i);
		if (commentsRegex.test(currURL)) {
			pageType = 'comments'
		} else if (inboxRegex.test(currURL)) {
			pageType = 'inbox';
		} else if (submitRegex.test(currURL)) {
			pageType = 'submit';
		} else {
			pageType = 'linklist';
		}
		return pageType;
	},
	currentSubReddit: function() {
		var match = location.href.match(/http:\/\/www.reddit.com\/r\/([\w]+).*/i);
		if (match != null) {
			return match[1];
		} else {
			return null;
		}
	},
	getXYpos: function (obj) {
		var topValue= 0,leftValue= 0;
		while(obj){
			leftValue+= obj.offsetLeft;
			topValue+= obj.offsetTop;
			obj= obj.offsetParent;
		}
		finalvalue = { 'x': leftValue, 'y': topValue };
		return finalvalue;
	},
	elementInViewport: function (obj) {
		var top = obj.offsetTop;
		var left = obj.offsetLeft;
		var width = obj.offsetWidth;
		var height = obj.offsetHeight;
		while(obj.offsetParent) {
			obj = obj.offsetParent;
			top += obj.offsetTop;
			left += obj.offsetLeft;
		}
		return (
			top >= window.pageYOffset &&
			left >= window.pageXOffset &&
			(top + height) <= (window.pageYOffset + window.innerHeight) &&
			(left + width) <= (window.pageXOffset + window.innerWidth)
		);
	},
	setSelectValue: function(obj, value) {
		for (var i=0, len=obj.length; i < len; i++) {
			if (obj[i].value == value) {
				obj[i].selected = true;
			}
		}
	},
	stripHTML: function(str) {
		var regExp = /<\/?[^>]+>/gi;
        str = str.replace(regExp,"");
        return str;
	},
	fadeElementOut: function(obj, speed) {
		if (obj.getAttribute('isfading') == 'in') {
			return false;
		}
		obj.setAttribute('isfading','out');
		speed = speed || 0.1;
		if (obj.style.opacity <= 0) {
			obj.style.display = 'none';
			obj.setAttribute('isfading',false);
			return true;
		} else {
			var newOpacity = parseFloat(obj.style.opacity) - parseFloat(speed);
			if (newOpacity < 0) newOpacity = 0;
			obj.style.opacity = newOpacity;
			setTimeout(function() { RESUtils.fadeElementOut(obj, speed) }, 100);
		}
	},
	fadeElementIn: function(obj, speed) {
		if (obj.getAttribute('isfading') == 'out') {
			return false;
		}
		obj.setAttribute('isfading','in');
		speed = speed || 0.1;
		if ((obj.style.display == 'none') || (obj.style.display == '')) {
			obj.style.opacity = 0;
			obj.style.display = 'block';
		}
		if (obj.style.opacity >= 1) {
			obj.setAttribute('isfading',false);
			return true;
		} else {
			var newOpacity = parseFloat(obj.style.opacity) + parseFloat(speed);
			if (newOpacity > 1) newOpacity = 1;
			obj.style.opacity = newOpacity;
			setTimeout(function() { RESUtils.fadeElementIn(obj, speed) }, 100);
		}
	},
}
RESUtils.addCSS(' \
#RESConsole { \
	display: none; \
	font-size: 12px; \
	z-index: 1000; \
	position: absolute; \
	top: 50px; \
	left: 50px; \
	width: 740px; \
	height: 500px; \
	border-radius: 10px 10px 10px 10px; \
	-moz-border-radius: 10px 10px 10px 10px; \
	-webkit-border-radius: 10px 10px 10px 10px; \
	padding: 10px; \
	border: 4px solid #CCCCCC; \
	background-color: #ffffff; \
} \
#modalOverlay { \
	display: none; \
	z-index: 999; \
	position: absolute; \
	top: 0px; \
	left: 0px; \
	width: 100%; \
	background-color: #333333; \
	opacity: 0.6; \
} \
#RESConsoleHeader { \
	width: 100%; \
} \
#RESLogo { \
	margin-right: 5px; \
	float: left; \
} \
#RESConsoleTopBar { \
	width: 100%; \
	height: 35px; \
	margin-bottom: 10px; \
	padding: 3px; \
	background-color: #F0F3FC; \
	float: left; \
} \
#RESConsoleTopBar h1 { \
	float: left; \
	margin-top: 5px; \
	padding: 0px; \
	font-size: 14px; \
	font-weight: bold; \
} \
#RESConsoleSubredditLink { \
	margin-left: 15px; \
	font-size: 11px; \
} \
#RESClose { \
	background-image: url("http://thumbs.reddit.com/t5_2s10b_0.png"); \
	background-position: 0px -120px; \
	width: 16px; \
	height: 16px; \
	float: right; \
	cursor: pointer; \
} \
#RESHelp { \
	background-image: url("http://thumbs.reddit.com/t5_2s10b_0.png"); \
	background-position: -16px -120px; \
	margin-right: 8px; \
	width: 16px; \
	height: 16px; \
	float: right; \
	cursor: pointer; \
} \
#RESMenu li { \
	float: left; \
	text-align: center; \
	min-width: 80px; \
	margin-right: 15px; \
	border: 1px solid black; \
	border-radius: 5px 5px 5px 5px; \
	-moz-border-radius: 5px 5px 5px 5px; \
	-webkit-border-radius: 5px 5px 5px 5px; \
	padding: 3px; \
	cursor: pointer; \
} \
#RSSConsoleContent { \
	clear: both; \
	margin-top: 40px; \
	padding: 6px; \
	height: 410px; \
	border: 1px solid #DDDDDD; \
	overflow: auto; \
} \
#RESConfigPanelOptions { \
	margin-top: 15px; \
	display: block; \
	width: 100%; \
} \
.RESPanel { \
	display: none; \
} \
.clear { \
	clear: both; \
} \
#keyCodeModal { \
	display: none; \
	width: 200px; \
	height: 40px; \
	position: absolute; \
	z-index: 1000; \
	background-color: #FFFFFF; \
	padding: 4px; \
	border: 2px solid #CCCCCC; \
} \
p.moduleListing { \
	padding-left: 5px; \
	padding-right: 5px; \
	padding-top: 5px; \
	padding-bottom: 15px; \
	border: 1px solid #BBBBBB; \
	-moz-box-shadow: 3px 3px 3px #BBB; \
	-webkit-box-shadow: 3px 3px 3px #BBB; \
} \
#RESConsoleModulesPanel label { \
	float: left; \
	width: 140px; \
	padding-top: 6px; \
} \
#RESConsoleModulesPanel input[type=checkbox] { \
	float: left; \
	margin-left: 10px; \
} \
#RESConsoleModulesPanel input[type=button] { \
	float: right; \
	padding: 3px; \
	margin-left: 20px; \
	font-size: 12px; \
	border: 1px solid #DDDDDD; \
	-moz-box-shadow: 3px 3px 3px #BBB; \
	-webkit-box-shadow: 3px 3px 3px #BBB; \
	background-color: #F0F3FC; \
	margin-bottom: 10px; \
} \
#RESConsoleModulesPanel p { \
	overflow: auto; \
	clear: both; \
	margin-bottom: 10px; \
} \
.moduleDescription { \
	float: left; \
	width: 500px; \
	margin-left: 10px; \
	padding-top: 6px; \
} \
.optionContainer { \
	width: 700px; \
	overflow: auto; \
	padding: 5px; \
	border: 1px dashed #AAAAAA; \
} \
.optionContainer table { \
	width: 650px; \
	margin-top: 20px; \
} \
.optionContainer label { \
	float: left; \
	width: 140px; \
} \
.optionContainer input[type=text] { \
	float: left; \
	width: 100px; \
} \
.optionDescription { \
	float: left; \
	width: 430px; \
	margin-left: 10px; \
} \
#RESCheckForUpdate { \
	float: left; \
	font-size: 10px; \
	cursor: pointer; \
	color: f0f3fc; \
	margin-left: 10px; \
} \
#moduleOptionsSave { \
	float: right; \
	padding: 3px; \
	margin-top: 6px; \
	margin-left: 20px; \
	font-size: 12px; \
	border: 1px solid #DDDDDD; \
	-moz-box-shadow: 3px 3px 3px #BBB; \
	-webkit-box-shadow: 3px 3px 3px #BBB; \
	background-color: #F0F3FC; \
	margin-bottom: 10px; \
} \
#moduleOptionsSaveStatus { \
	display: none; \
	margin-top: 10px; \
	padding: 5px; \
	text-align: center; \
	background-color: #FFFACD; \
} \
#RESConsoleAboutPanel p { \
	margin-bottom: 10px; \
} \
#RESConsoleAboutPanel ul { \
	margin-bottom: 10px; \
	margin-top: 10px; \
} \
#RESConsoleAboutPanel li { \
	list-style-type: disc; \
	margin-left: 15px; \
} \
.outdated { \
	float: right; \
	font-size: 11px; \
	margin-right: 15px; \
	margin-top: 5px; \
} \
');
var RESConsole = {
	
	RESConsoleModulesPanel: createElementWithID('div', 'RESConsoleModulesPanel', 'RESPanel'),
	RESConsoleConfigPanel: createElementWithID('div', 'RESConsoleConfigPanel', 'RESPanel'),
	addConsoleLink: function() {
		var userMenu = document.querySelector('#header-bottom-right');
		if (userMenu) {
			var preferencesUL = userMenu.querySelector('UL');
			var separator = document.createElement('span');
			separator.setAttribute('class','separator');
			separator.innerHTML = '|';
			this.RESPrefsLink = document.createElement('a');
			this.RESPrefsLink.setAttribute('id','openRESPrefs');
			this.RESPrefsLink.setAttribute('href','javascript:void(0)');
			if (localStorage.getItem('RESoutdated') == 'true') {
				this.RESPrefsLink.innerHTML = '[RES](u)';
			} else {
				this.RESPrefsLink.innerHTML = '[RES]';
			}
			this.RESPrefsLink.addEventListener('click', function(e) {
				e.preventDefault();
				RESConsole.open();
			}, true);
			insertAfter(preferencesUL, this.RESPrefsLink);
			insertAfter(preferencesUL, separator);
		}
	},
	resetModulePrefs: function() {
		prefs = {
			'userTagger': true,
			'commentsLinker': true,
			'singleClick': true,
			'subRedditTagger': true,
			'uppersAndDowners': true,
			'keyboardNav': true,
			'commentPreview': true,
			'showImages': true,
			'showKarma': true,
			'usernameHider': false,
			'accountSwitcher': true,
			'styleTweaks': true
		};
		this.setModulePrefs(prefs);
		return prefs;
	},
	getAllModulePrefs: function() {
		
		if (localStorage.getItem('RES.modulePrefs') != null) {
			var storedPrefs = JSON.parse(localStorage.getItem('RES.modulePrefs'));
		} else if (localStorage.getItem('modulePrefs') != null) {
			
			var storedPrefs = JSON.parse(localStorage.getItem('modulePrefs'));
			localStorage.removeItem('modulePrefs');
			this.setModulePrefs(storedPrefs);
		} else {
			
			storedPrefs = this.resetModulePrefs();
		}
		if (storedPrefs == null) {
			storedPrefs = {};
		}
		
		var prefs = {};
		
		for (i in modules) {
			if (storedPrefs[i]) {
				prefs[i] = storedPrefs[i];
			} else if (storedPrefs[i] == null) {
				
				prefs[i] = true;
			} else {
				prefs[i] = false;
			}
		}
		if ((typeof(prefs) != 'undefined') && (prefs != 'undefined') && (prefs)) {
			return prefs;
		} 
	},
	getModulePrefs: function(moduleID) {
		if (moduleID) {
			var prefs = this.getAllModulePrefs();
			return prefs[moduleID];
		} else {
			alert('no module name specified for getModulePrefs');
		}
	},
	setModulePrefs: function(prefs) {
		if (prefs != null) {
			localStorage.setItem('RES.modulePrefs', JSON.stringify(prefs));
			this.drawModulesPanel();
			return prefs;
		} else {
			alert('error - no prefs specified');
		}
	},
	container: RESConsoleContainer,
	create: function() {
		
		RESConsoleContainer = createElementWithID('div', 'RESConsole');
		
		modalOverlay = createElementWithID('div', 'modalOverlay');
		modalOverlay.addEventListener('click',function(e) {
			e.preventDefault();
			return false;
		}, true);
		document.body.appendChild(modalOverlay);
		
		RESConsoleHeader = createElementWithID('div', 'RESConsoleHeader');
		
		RESConsoleTopBar = createElementWithID('div', 'RESConsoleTopBar');
		this.logo = 'logo';
		this.loader = 'loader';
		RESConsoleTopBar.innerHTML = '<img id="RESLogo" src="'+this.logo+'"><h1>Reddit Enhancement Suite Console</h1>';
		RESConsoleHeader.appendChild(RESConsoleTopBar);
		this.RESCheckUpdateButton = createElementWithID('div','RESCheckForUpdate');
		this.RESCheckUpdateButton.innerHTML = 'v' + RESVersion + ' [check for update]';
		this.RESCheckUpdateButton.addEventListener('click',function(e) {
			RESUtils.checkForUpdate(true);
		}, true);
		RESConsoleTopBar.appendChild(this.RESCheckUpdateButton);
		RESSubredditLink = createElementWithID('a','RESConsoleSubredditLink');
		RESSubredditLink.innerHTML = '/r/Enhancement';
		RESSubredditLink.setAttribute('href','http://reddit.com/r/Enhancement');
		RESSubredditLink.setAttribute('alt','The RES Subreddit');
		RESConsoleTopBar.appendChild(RESSubredditLink);
		
		RESClose = createElementWithID('span', 'RESClose');
		RESClose.innerHTML = '&nbsp;';
		RESClose.addEventListener('click',function(e) {
			e.preventDefault();
			RESConsole.close();
		}, true);
		RESConsoleTopBar.appendChild(RESClose);
		
		RESHelp = createElementWithID('span', 'RESHelp');
		RESHelp.innerHTML = '&nbsp;';
		RESHelp.addEventListener('click',function(e) {
			e.preventDefault();
			modules['RESTips'].randomTip();
		}, true);
		RESConsoleTopBar.appendChild(RESHelp);
		if (localStorage.getItem('RESoutdated') == 'true') {
			var RESOutdated = document.createElement('div');
			RESOutdated.setAttribute('class','outdated');
			RESOutdated.innerHTML = 'There is a new version of RES! <a target="_blank" href="http://reddit.honestbleeps.com/">click to grab it</a>';
			RESConsoleTopBar.appendChild(RESOutdated); 
		}
		
		var menuItems = new Array('Enable Modules','Configure Modules','About RES');
		if (localStorage.getItem('RESPro')) {
			menuItems[menuItems.length] = 'RES Pro';
		}
		RESMenu = createElementWithID('ul', 'RESMenu');
		for (i in menuItems) {
			thisMenuItem = document.createElement('li');
			thisMenuItem.innerHTML = menuItems[i];
			thisMenuItem.setAttribute('id', 'Menu-' + menuItems[i]);
			thisMenuItem.addEventListener('click', function(e) {
				e.preventDefault();
				RESConsole.menuClick(this);
			}, true);
			RESMenu.appendChild(thisMenuItem);
		}
		RESConsoleHeader.appendChild(RESMenu);
		RESConsoleContainer.appendChild(RESConsoleHeader);
		
		RESMenuItems = RESMenu.querySelectorAll('li');
		
		RESConsoleContent = createElementWithID('div', 'RSSConsoleContent');
		RESConsoleContainer.appendChild(RESConsoleContent);
		this.drawModulesPanel();
		
		this.drawConfigPanel();
		
		this.drawAboutPanel();
		if (localStorage.getItem('RESPro')) {
			
			this.drawProPanel();
		}
		
		RESConsolePanels = RESConsoleContent.querySelectorAll('div');
		
		document.body.appendChild(RESConsoleContainer);
	},
	drawModulesPanel: function() {
		
		RESConsoleModulesPanel = this.RESConsoleModulesPanel;
		RESConsoleModulesPanel.innerHTML = '';
		var prefs = this.getAllModulePrefs();
		var modulesPanelHTML = '';
		for (i in modules) {
			(prefs[i]) ? thisChecked = 'CHECKED' : thisChecked = '';
			if (typeof(modules[i]) != 'undefined') {
				thisDesc = modules[i].description;
				modulesPanelHTML += '<p class="moduleListing"><label for="'+i+'">' + modules[i].moduleName + ':</label> <input type="checkbox" name="'+i+'" '+thisChecked+' value="true"> <span class="moduleDescription">'+thisDesc+'</span></p>';
			}
		}
		RESConsoleModulesPanel.innerHTML = modulesPanelHTML;
		var RESConsoleModulesPanelButtons = createElementWithID('span','RESConsoleModulesPanelButtons');
		var RESSavePrefsButton = createElementWithID('input','savePrefs');
		RESSavePrefsButton.setAttribute('type','button');
		RESSavePrefsButton.setAttribute('name','savePrefs');
		RESSavePrefsButton.setAttribute('value','save');
		RESSavePrefsButton.addEventListener('click', function(e) {
			e.preventDefault();
			var modulePrefsCheckboxes = RESConsole.RESConsoleModulesPanel.querySelectorAll('input[type=checkbox]');
			var prefs = {};
			for (i=0, len=modulePrefsCheckboxes.length;i<len;i++) {
				var thisName = modulePrefsCheckboxes[i].getAttribute('name');
				var thisChecked = modulePrefsCheckboxes[i].checked;
				prefs[thisName] = thisChecked;
			}
			RESConsole.setModulePrefs(prefs);
			RESConsole.close();
		}, true);
		RESConsoleModulesPanelButtons.appendChild(RESSavePrefsButton);
		var RESResetPrefsButton = createElementWithID('input','resetPrefs');
		RESResetPrefsButton.setAttribute('type','button');
		RESResetPrefsButton.setAttribute('name','resetPrefs');
		RESResetPrefsButton.setAttribute('value','reset to default');
		RESConsoleModulesPanelButtons.appendChild(RESResetPrefsButton);
		RESResetPrefsButton.addEventListener('click', function(e) {
			e.preventDefault();
			RESConsole.resetModulePrefs();
		}, true);
		RESConsoleModulesPanel.appendChild(RESConsoleModulesPanelButtons);
		var clearDiv = document.createElement('p');
		clearDiv.setAttribute('class','clear');
		clearDiv.style.display = 'block';
		RESConsoleModulesPanel.appendChild(clearDiv);
		RESConsoleContent.appendChild(RESConsoleModulesPanel);
	},
	drawConfigPanel: function() {
		RESConsoleConfigPanel = createElementWithID('div', 'RESConsoleConfigPanel', 'RESPanel');
		RESConfigPanelSelectorLabel = document.createElement('label');
		RESConfigPanelSelectorLabel.setAttribute('for','RESConfigPanelSelector');
		RESConfigPanelSelectorLabel.innerHTML = 'Configure module: ';
		RESConsoleConfigPanel.appendChild(RESConfigPanelSelectorLabel);
		this.RESConfigPanelSelector = createElementWithID('select', 'RESConfigPanelSelector');
		thisOption = document.createElement('option');
		thisOption.setAttribute('value','');
		thisOption.innerHTML = 'Select Module';
		this.RESConfigPanelSelector.appendChild(thisOption);
		for (i in modules) {
			thisOption = document.createElement('option');
			thisOption.value = modules[i].moduleID;
			thisOption.innerHTML = modules[i].moduleName;
			this.RESConfigPanelSelector.appendChild(thisOption);
		}
		this.RESConfigPanelSelector.addEventListener('change', function(e) {
			thisModule = this.options[this.selectedIndex].value;
			if (thisModule != '') {
				RESConsole.drawConfigOptions(thisModule);
			}
		}, true);
		RESConsoleConfigPanel.appendChild(this.RESConfigPanelSelector);
		RESConfigPanelOptions = createElementWithID('div', 'RESConfigPanelOptions');
		RESConsoleConfigPanel.appendChild(RESConfigPanelOptions);
		RESConsoleContent.appendChild(RESConsoleConfigPanel);
	},
	drawOptionInput: function(moduleID, optionName, optionObject, isTable) {
		switch(optionObject.type) {
			case 'text':
				
				var thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type','text');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				thisOptionFormEle.setAttribute('value',optionObject.value);
				break;
			case 'password':
				
				var thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type','password');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				thisOptionFormEle.setAttribute('value',optionObject.value);
				break;
			case 'boolean':
				
				var thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type','checkbox');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				thisOptionFormEle.setAttribute('value',optionObject.value);
				if (optionObject.value) {
					thisOptionFormEle.setAttribute('checked',true);
				}
				break;
			case 'enum':
				
				if (typeof(optionObject.values) == 'undefined') {
					alert('misconfigured enum option in module: ' + moduleID);
				} else {
					var thisOptionFormEle = createElementWithID('div', optionName);
					thisOptionFormEle.setAttribute('class','enum');
					for (var j=0;j<optionObject.values.length;j++) {
						var thisDisplay = optionObject.values[j].display;
						var thisValue = optionObject.values[j].value;
						thisOptionFormSubEle = createElementWithID('input', optionName+'-'+j);
						thisOptionFormSubEle.setAttribute('type','radio');
						thisOptionFormSubEle.setAttribute('name',optionName);
						thisOptionFormSubEle.setAttribute('moduleID',moduleID);
						thisOptionFormSubEle.setAttribute('value',optionObject.values[j].value);
						if (optionObject.value == optionObject.values[j].value) {
							thisOptionFormSubEle.setAttribute('checked','checked');
						}
						var thisOptionFormSubEleText = document.createTextNode(optionObject.values[j].name + ' ');
						thisOptionFormEle.appendChild(thisOptionFormSubEle);
						thisOptionFormEle.appendChild(thisOptionFormSubEleText);
					}
				}
				break;
			case 'keycode':
				
				var thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type','text');
				thisOptionFormEle.setAttribute('class','keycode');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				thisOptionFormEle.setAttribute('value',optionObject.value);
				break;
			default:
				console.log('misconfigured option in module: ' + moduleID);
				break;
		}
		if (isTable) {
			thisOptionFormEle.setAttribute('tableOption','true');
		}
		return thisOptionFormEle;
	},
	drawConfigOptions: function(moduleID) {
		var thisOptions = RESUtils.getOptions(moduleID);
		var optCount = 0;
		RESConfigPanelOptions.setAttribute('style','display: block;');
		RESConfigPanelOptions.innerHTML = '';
		for (var i in thisOptions) {
			if (!(thisOptions[i].noconfig)) {
				optCount++;
				var thisOptionContainer = createElementWithID('div', null, 'optionContainer');
				var thisLabel = document.createElement('label');
				thisLabel.setAttribute('for',i);
				thisLabel.innerHTML = i;
				thisOptionDescription = createElementWithID('div', null, 'optionDescription');
				thisOptionDescription.innerHTML = thisOptions[i].description;
				thisOptionContainer.appendChild(thisLabel);
				if (thisOptions[i].type == 'table') {
					
					if (typeof(thisOptions[i].fields) == 'undefined') {
						alert('misconfigured table option in module: ' + moduleID);
					} else {
						
						var fieldNames = new Array();
						
						var thisTable = document.createElement('table');
						thisTable.setAttribute('moduleID',moduleID);
						thisTable.setAttribute('optionName',i);
						thisTable.setAttribute('class','optionsTable');
						var thisThead = document.createElement('thead');
						var thisTableHeader = document.createElement('tr');
						thisTable.appendChild(thisThead);
						for (var j=0;j<thisOptions[i].fields.length;j++) {
							fieldNames[j] = thisOptions[i].fields[j].name;
							var thisTH = document.createElement('th');
							thisTH.innerHTML = thisOptions[i].fields[j].name;
							thisTableHeader.appendChild(thisTH);
						}
						thisThead.appendChild(thisTableHeader);
						thisTable.appendChild(thisThead);
						var thisTbody = document.createElement('tbody');
						thisTbody.setAttribute('id','tbody_'+i);
						for (var j=0;j<thisOptions[i].value.length;j++) {
							var thisTR = document.createElement('tr');
							for (var k=0;k<thisOptions[i].fields.length;k++) {
								var thisTD = document.createElement('td');
								thisOpt = thisOptions[i].fields[k];
								thisOpt.value = thisOptions[i].value[j][k];
								var thisOptInputName = thisOpt.name + '_' + j;
								var thisTableEle = this.drawOptionInput(moduleID, thisOptInputName, thisOpt, true);
								thisTD.appendChild(thisTableEle);
								thisTR.appendChild(thisTD);
							}
							thisTbody.appendChild(thisTR);
						}
						thisTable.appendChild(thisTbody);
						var thisOptionFormEle = thisTable;
					}
					thisOptionContainer.appendChild(thisOptionDescription);
					thisOptionContainer.appendChild(thisOptionFormEle);
					
					var addRowButton = document.createElement('input');
					addRowButton.setAttribute('type','button');
					addRowButton.setAttribute('value','Add Row');
					addRowButton.setAttribute('optionName',i);
					addRowButton.setAttribute('moduleID',moduleID);
					addRowButton.addEventListener('click',function() {
						var optionName = this.getAttribute('optionName');
						var thisTbodyName = 'tbody_' + optionName;
						var thisTbody = document.getElementById(thisTbodyName);
						var newRow = document.createElement('tr');
						for (var i=0, len=modules[moduleID].options[optionName].fields.length;i<len;i++) {
							var newCell = document.createElement('td');
							var thisOpt = modules[moduleID].options[optionName].fields[i];
							thisOpt.value = '';
							var thisInput = RESConsole.drawOptionInput(moduleID, optionName, thisOpt, true);
							newCell.appendChild(thisInput);
							newRow.appendChild(newCell);
						}
						thisTbody.appendChild(newRow);
					}, true);
					thisOptionContainer.appendChild(addRowButton);
				} else {
					var thisOptionFormEle = this.drawOptionInput(moduleID, i, thisOptions[i]);
					thisOptionContainer.appendChild(thisOptionFormEle);
					thisOptionContainer.appendChild(thisOptionDescription);
				}
				RESConfigPanelOptions.appendChild(thisOptionContainer);
			}
		}
		
		var keyCodeInputs = RESConfigPanelOptions.querySelectorAll('.keycode');
		if (keyCodeInputs.length > 0) {
			this.keyCodeModal = createElementWithID('div','keyCodeModal');
			this.keyCodeModal.innerHTML = 'Press a key (or combination with shift, alt and/or ctrl) to assign this action.';
			document.body.appendChild(this.keyCodeModal);
			for (var i=0, len=keyCodeInputs.length;i<len;i++) {
				keyCodeInputs[i].style.border = '1px solid red';
				keyCodeInputs[i].style.display = 'none';
				thisKeyCodeDisplay = createElementWithID('input',keyCodeInputs[i].getAttribute('id')+'-display');
				thisKeyCodeDisplay.setAttribute('type','text');
				thisKeyCodeDisplay.setAttribute('capturefor',keyCodeInputs[i].getAttribute('id'));
				thisKeyCodeDisplay.setAttribute('displayonly','true');
				thisKeyCodeDisplay.setAttribute('value',RESUtils.niceKeyCode(keyCodeInputs[i].value.toString()));
				
				thisKeyCodeDisplay.addEventListener('focus',function(e) {
					window.addEventListener('keydown', function(e) {
						if ((RESConsole.captureKey) && (e.keyCode != 16) && (e.keyCode != 17) && (e.keyCode != 18)) {
							
							e.preventDefault();
							document.getElementById(RESConsole.captureKeyID).value = e.keyCode + ',' + e.altKey + ',' + e.ctrlKey + ',' + e.shiftKey + ',' + e.metaKey;
							var keyArray = Array(e.keyCode, e.altKey, e.ctrlKey, e.shiftKey, e.metaKey);
							document.getElementById(RESConsole.captureKeyID+'-display').value = RESUtils.niceKeyCode(keyArray);
							RESConsole.keyCodeModal.style.display = 'none';
							RESConsole.captureKey = false;
						}
					}, true);
					thisXY=RESUtils.getXYpos(this);
					RESConsole.keyCodeModal.setAttribute('style', 'display: block; top: ' + thisXY.y + 'px; left: ' + thisXY.x + 'px;');
					
					RESConsole.keyCodeModal.style.display = 'block';
					RESConsole.captureKey = true;
					RESConsole.captureKeyID = this.getAttribute('capturefor');
				}, true);
				insertAfter(keyCodeInputs[i], thisKeyCodeDisplay);
			}
		}
		var thisSaveButton = createElementWithID('input','moduleOptionsSave');
		thisSaveButton.setAttribute('type','button');
		thisSaveButton.setAttribute('value','save');
		thisSaveButton.addEventListener('click',function(e) {
			e.preventDefault();
			var panelOptionsDiv = document.getElementById('RESConfigPanelOptions');
			
			var inputs = panelOptionsDiv.querySelectorAll('input');
			for (var i=0, len=inputs.length;i<len;i++) {
				
				if ((inputs[i].getAttribute('type') != 'button') && (inputs[i].getAttribute('displayonly') != 'true') && (inputs[i].getAttribute('tableOption') != 'true')) {
					
					if (inputs[i].getAttribute('type') == 'radio') {
						var optionName = inputs[i].getAttribute('name');
					} else {
						var optionName = inputs[i].getAttribute('id');
					}
					
					var moduleID = inputs[i].getAttribute('moduleID');
					if (inputs[i].getAttribute('type') == 'checkbox') {
						(inputs[i].checked) ? optionValue = true : optionValue = false;
					} else if (inputs[i].getAttribute('type') == 'radio') {
						if (inputs[i].checked) {
							var optionValue = inputs[i].value;
						}
					} else {
						
						if ((inputs[i].getAttribute('class')) && (inputs[i].getAttribute('class').indexOf('keycode') >= 0)) {
							var tempArray = inputs[i].value.split(',');
							
							var optionValue = Array(parseInt(tempArray[0]), (tempArray[1] == 'true'), (tempArray[2] == 'true'), (tempArray[3] == 'true'), (tempArray[4] == 'true'));
						} else {
							var optionValue = inputs[i].value;
						}
					}
					if (typeof(optionValue) != 'undefined') {
						RESUtils.setOption(moduleID, optionName, optionValue);
					}
				}
			}
			
			var optionsTables = panelOptionsDiv.querySelectorAll('.optionsTable');
			if (typeof(optionsTables) != 'undefined') {
				
				
				for (i=0, len=optionsTables.length;i<len;i++) {
					var moduleID = optionsTables[i].getAttribute('moduleID');
					var optionName = optionsTables[i].getAttribute('optionName');
					var thisTBODY = optionsTables[i].querySelector('tbody');
					var thisRows = thisTBODY.querySelectorAll('tr');
					
					if (typeof(thisRows) != 'undefined') {
						
						var optionMulti = Array();
						for (j=0;j<thisRows.length;j++) {
							var optionRow = Array();
							var inputs = thisRows[j].querySelectorAll('input');
							var notAllBlank = false;
							for (k=0;k<inputs.length;k++) {
								
								var moduleID = inputs[k].getAttribute('moduleID');
								if (inputs[k].getAttribute('type') == 'checkbox') {
									(inputs[k].checked) ? optionValue = true : optionValue = false;
								} else if (inputs[k].getAttribute('type') == 'radio') {
									if (inputs[k].checked) {
										var optionValue = inputs[k].value;
									}
								} else {
									
									if ((inputs[k].getAttribute('class')) && (inputs[k].getAttribute('class').indexOf('keycode') >= 0)) {
										var tempArray = inputs[k].value.split(',');
										
										var optionValue = Array(parseInt(tempArray[0]), (tempArray[1] == 'true'), (tempArray[2] == 'true'), (tempArray[3] == 'true'));
									} else {
										var optionValue = inputs[k].value;
									}
								}
								if (optionValue != '') {
									notAllBlank = true;
								}
								optionRow[k] = optionValue;
							}
							if (notAllBlank) {
								optionMulti[j] = optionRow;
							}
						}
						if (optionMulti == null) {
							optionMulti = [];
						}
						
						if (typeof(optionValue) != 'undefined') {
							RESUtils.setOption(moduleID, optionName, optionMulti);
						}
					}
				}
			}
			
			var statusEle = document.getElementById('moduleOptionsSaveStatus');
			statusEle.innerHTML = 'Options have been saved...';
			statusEle.setAttribute('style','display: block; opacity: 1');
			RESUtils.fadeElementOut(statusEle, 0.1)
		}, true);
		RESConfigPanelOptions.appendChild(thisSaveButton);
		var thisSaveStatus = createElementWithID('div','moduleOptionsSaveStatus','saveStatus');
		RESConfigPanelOptions.appendChild(thisSaveStatus);
		if (optCount == 0) {
			RESConfigPanelOptions.innerHTML = 'There are no configurable options for this module';
		}
	},
	drawAboutPanel: function() {
		RESConsoleAboutPanel = createElementWithID('div', 'RESConsoleAboutPanel', 'RESPanel');
		var AboutPanelHTML = ' \
<p>Author: <a target="_blank" href="http://honestbleeps.com">
<p>Description: Reddit Enhancement Suite is a collection of modules that make browsing reddit a bit nicer.</p> \
<p>It\'s built with <a target="_blank" href="http://reddit.honestbleeps.com/api">an API</a> that allows you to contribute and include your own modules!</p> \
<p>If you\'ve got bug reports, you\'d like to discuss RES, or you\'d like to converse with other users, please see the <a target="_blank" href="http://www.reddit.com/r/Enhancement/">Enhancement subreddit.</a> </p> \
<p>If you want to contact me directly with suggestions, bug reports or just want to say you appreciate the work, an <a href="mailto:steve@honestbleeps.com">email</a> would be great.</p> \
<p>If you really, really like the work, a donation would be much appreciated.</p> \
<p> \
<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="S7TAR7QU39H22"><input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1"></form> \
</p> \
<p><strong>Note:</strong> Reddit Enhancement Suite will check, at most once a day, to see if a new version is available.  No data about you is sent to me nor is it stored.</p> \
		'
		RESConsoleAboutPanel.innerHTML = AboutPanelHTML;
		RESConsoleContent.appendChild(RESConsoleAboutPanel);
	},
	drawProPanel: function() {
		RESConsoleProPanel = createElementWithID('div', 'RESConsoleProPanel', 'RESPanel');
		var ProPanelHTML = ' \
			Pro stuff will go here. \
		';
		RESConsoleProPanel.innerHTML = ProPanelHTML;
		RESConsoleContent.appendChild(RESConsoleProPanel);
	},
	open: function() {
		
		var adFrame = document.getElementById('ad-frame');
		if ((typeof(adFrame) != 'undefined') && (adFrame != null)) {
			adFrame.style.display = 'none';
		}
		var leftCentered = Math.floor((window.innerWidth - 720) / 2);
		modalOverlay.setAttribute('style','display: block; height: ' + document.documentElement.scrollHeight + 'px');
		RESConsoleContainer.setAttribute('style','display: block; left: ' + leftCentered + 'px');
		RESConsole.menuClick(RESMenuItems[0]);
	},
	close: function() {
		
		var adFrame = document.getElementById('ad-frame');
		if ((typeof(adFrame) != 'undefined') && (adFrame != null)) {
			adFrame.style.display = 'block';
		}
		modalOverlay.setAttribute('style','display: none;');
		RESConsoleContainer.setAttribute('style','display: none;');
		
		if (typeof(RESConsole.keyCodeModal) != 'undefined') {
			RESConsole.keyCodeModal.style.display = 'none';
			RESConsole.captureKey = false;
		}
	},
	menuClick: function(obj) {
		objID = obj.getAttribute('id')
		
		for (i in RESMenuItems) {
			if (i == 'length') break;
			RESMenuItems[i].setAttribute('style', 'background-color: #ffffff');
		}
		
		obj.setAttribute('style', 'background-color: #dddddd');
		
		for (i in RESConsolePanels) {
			
			if (i == 'length') break;
			RESConsolePanels[i].setAttribute('style', 'display: none');
		}
		switch(objID) {
			case 'Menu-Enable Modules':
				
				RESConsoleModulesPanel.setAttribute('style', 'display: block');
				break;
			case 'Menu-Configure Modules':
				
				this.RESConfigPanelSelector.selectedIndex = 0;
				RESConsoleConfigPanel.setAttribute('style', 'display: block');
				break;
			case 'Menu-About RES':
				
				RESConsoleAboutPanel.setAttribute('style', 'display: block');
				break;
			case 'Menu-RES Pro':
				
				RESConsoleProPanel.setAttribute('style', 'display: block');
				break;
			default:
				alert('err, what just happened here? I do not recognize that menu item.');
				break;
		}
	},
};
function insertAfter( referenceNode, newNode ) {
	if ((typeof(referenceNode) == 'undefined') || (referenceNode == null)) {
		console.log(arguments.callee.caller);
	} else if ((typeof(referenceNode.parentNode) != 'undefined') && (typeof(referenceNode.nextSibling) != 'undefined')) {
		referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
	}
};
function createElementWithID(elementType, id, classname) {
	obj = document.createElement(elementType);
	if (id != null) {
		obj.setAttribute('id', id);
	}
	if ((typeof(classname) != 'undefined') && (classname != '')) {
		obj.setAttribute('class', classname);
	}
	return obj;
};
modules['commentsLinker'] = {
	moduleID: 'commentsLinker',
	moduleName: 'Full Comments Linker',
	options: {
		fullCommentsText: {
			type: 'text',
			value: 'full comments',
			description: 'text of full comments link'
		}
	},
	description: 'Adds a link to a post\'s full comments page beyond just \'context\', etc.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	include: Array(
		/http:\/\/www.reddit.com\/user\/[-\w\.]+\/?/i,
		/http:\/\/www.reddit.com\/message\/[-\w\.]*\/?/i,
		/http:\/\/www.reddit.com\/message\/comments\/[-\w\.]+/i
	),
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			RESUtils.getOptions(this.moduleID);
			var entries = document.querySelectorAll('#siteTable .entry');
			for (var i=0, len=entries.length; i<len;i++) {
				
				if (i == 'length') break;
				var linkEle = entries[i].querySelector('A.bylink');
				var thisCommentsLink = '';
				if ((typeof(linkEle) != 'undefined') && (linkEle != null)) {
					thisCommentsLink = linkEle.getAttribute('href');
				}
				if (thisCommentsLink != '') {
					thisCommentsSplit = thisCommentsLink.split("/");
					thisCommentsSplit.pop();
					thisCommentsLink = thisCommentsSplit.join("/");
					linkList = entries[i].querySelector('.flat-list');
					var fullCommentsLink = document.createElement('li');
					fullCommentsLink.innerHTML = '<a class="redditFullComments" href="' + thisCommentsLink + '">'+ this.options.fullCommentsText.value +'</a>';
					linkList.appendChild(fullCommentsLink);
				}
			}
		}
	}
};
modules['commentPreview'] = {
	moduleID: 'commentPreview',
	moduleName: 'Live Comment Preview',
	options: {
	},
	description: 'Provides a live preview of comments, as well as shortcuts for easier markdown.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/http:\/\/www.reddit.com\/[-\w\.\/]+\/comments\/[-\w\.]+/i,
		/http:\/\/www.reddit.com\/message\/[-\w\.]*\/?[-\w\.]*/i,
		/http:\/\/www.reddit.com\/r\/[-\w\.]*\/submit\/?/i,
		/http:\/\/www.reddit.com\/submit\/?/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			RESUtils.getOptions(this.moduleID);
			var Showdown = {};
			Showdown.converter = function() {
			var g_urls;
			var g_titles;
			var g_html_blocks;
			var g_list_level = 0;
			this.makeHtml = function(text) {
				g_urls = new Array();
				g_titles = new Array();
				g_html_blocks = new Array();
				text = text.replace(/</g,"&lt;");
				text = text.replace(/>/g,"&gt;");
				text = text.replace(/~/g,"~T");
				text = text.replace(/\$/g,"~D");
				text = text.replace(/\r\n/g,"\n"); 
				text = text.replace(/\r/g,"\n"); 
				text = "\n\n" + text + "\n\n";
				text = _Detab(text);
				text = text.replace(/^[ \t]+$/mg,"");
				text = _HashHTMLBlocks(text);
				text = _StripLinkDefinitions(text);
				text = _RunBlockGamut(text);
				text = _UnescapeSpecialChars(text);
				text = text.replace(/~D/g,"$$");
				text = text.replace(/~T/g,"~");
				return text;
			}
			var _StripLinkDefinitions = function(text) {
				var text = text.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|\Z)/gm,
					function (wholeMatch,m1,m2,m3,m4) {
						m1 = m1.toLowerCase();
						g_urls[m1] = _EncodeAmpsAndAngles(m2);  
						if (m3) {
							return m3+m4;
						} else if (m4) {
							g_titles[m1] = m4.replace(/"/g,"&quot;");
						}
						return "";
					}
				);
				return text;
			}
			var _HashHTMLBlocks = function(text) {
				text = text.replace(/\n/g,"\n\n");
				var block_tags_a = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del"
				var block_tags_b = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math"
				text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,hashElement);
				text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,hashElement);
				text = text.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,hashElement);
				text = text.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,hashElement);
				text = text.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,hashElement);
				
				text = text.replace(/\n\n/g,"\n");
				return text;
			}
			var hashElement = function(wholeMatch,m1) {
				var blockText = m1;
				blockText = blockText.replace(/\n\n/g,"\n");
				blockText = blockText.replace(/^\n/,"");
				blockText = blockText.replace(/\n+$/g,"");
				blockText = "\n\n~K" + (g_html_blocks.push(blockText)-1) + "K\n\n";
				return blockText;
			};
			var _RunBlockGamut = function(text) {
				text = _DoHeaders(text);
				var key = hashBlock("<hr />");
				text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,key);
				text = text.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,key);
				text = text.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,key);
				text = _DoLists(text);
				text = _DoCodeBlocks(text);
				text = _DoBlockQuotes(text);
				text = _HashHTMLBlocks(text);
				text = _FormParagraphs(text);
				return text;
			}
			var _RunSpanGamut = function(text) {
				text = _DoCodeSpans(text);
				text = _EscapeSpecialCharsWithinTagAttributes(text);
				text = _EncodeBackslashEscapes(text);
				text = _DoImages(text);
				text = _DoAnchors(text);
				text = _DoAutoLinks(text);
				text = _EncodeAmpsAndAngles(text);
				text = _DoItalicsAndBold(text);
				text = text.replace(/  +\n/g," <br />\n");
				return text;
			}
			var _EscapeSpecialCharsWithinTagAttributes = function(text) {
				var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
				text = text.replace(regex, function(wholeMatch) {
					var tag = wholeMatch.replace(/(.)<\/?code>(?=.)/g,"$1`");
					tag = escapeCharacters(tag,"\\`*_");
					return tag;
				});
				return text;
			}
			var _DoAnchors = function(text) {
				text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,writeAnchorTag);
				text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,writeAnchorTag);
				text = text.replace(/(\[([^\[\]]+)\])()()()()()/g, writeAnchorTag);
				return text;
			}
			var writeAnchorTag = function(wholeMatch,m1,m2,m3,m4,m5,m6,m7) {
				if (m7 == undefined) m7 = "";
				var whole_match = m1;
				var link_text   = m2;
				var link_id	 = m3.toLowerCase();
				var url		= m4;
				var title	= m7;
				if (url == "") {
					if (link_id == "") {
						link_id = link_text.toLowerCase().replace(/ ?\n/g," ");
					}
					url = "#"+link_id;
					if (g_urls[link_id] != undefined) {
						url = g_urls[link_id];
						if (g_titles[link_id] != undefined) {
							title = g_titles[link_id];
						}
					}
					else {
						if (whole_match.search(/\(\s*\)$/m)>-1) {
							
							url = "";
						} else {
							return whole_match;
						}
					}
				}	
				url = escapeCharacters(url,"*_");
				var result = "<a href=\"" + url + "\"";
				if (title != "") {
					title = title.replace(/"/g,"&quot;");
					title = escapeCharacters(title,"*_");
					result +=  " title=\"" + title + "\"";
				}
				result += ">" + link_text + "</a>";
				return result;
			}
			var _DoImages = function(text) {
				text = text.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,writeImageTag);
				text = text.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,writeImageTag);
				return text;
			}
			var writeImageTag = function(wholeMatch,m1,m2,m3,m4,m5,m6,m7) {
				var whole_match = m1;
				var alt_text   = m2;
				var link_id	 = m3.toLowerCase();
				var url		= m4;
				var title	= m7;
				if (!title) title = "";
				if (url == "") {
					if (link_id == "") {
						link_id = alt_text.toLowerCase().replace(/ ?\n/g," ");
					}
					url = "#"+link_id;
					if (g_urls[link_id] != undefined) {
						url = g_urls[link_id];
						if (g_titles[link_id] != undefined) {
							title = g_titles[link_id];
						}
					}
					else {
						return whole_match;
					}
				}
				alt_text = alt_text.replace(/"/g,"&quot;");
				url = escapeCharacters(url,"*_");
				var result = "<img src=\"" + url + "\" alt=\"" + alt_text + "\"";
					title = title.replace(/"/g,"&quot;");
					title = escapeCharacters(title,"*_");
					result +=  " title=\"" + title + "\"";
				result += " />";
				return result;
			}
			var _DoHeaders = function(text) {
				text = text.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,
					function(wholeMatch,m1){return hashBlock("<h1>" + _RunSpanGamut(m1) + "</h1>");});
				text = text.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,
					function(matchFound,m1){return hashBlock("<h2>" + _RunSpanGamut(m1) + "</h2>");});
				text = text.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,
					function(wholeMatch,m1,m2) {
						var h_level = m1.length;
						return hashBlock("<h" + h_level + ">" + _RunSpanGamut(m2) + "</h" + h_level + ">");
					});
				return text;
			}
			var _ProcessListItems;
			var _DoLists = function(text) {
				text += "~0";
				var whole_list = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
				if (g_list_level) {
					text = text.replace(whole_list,function(wholeMatch,m1,m2) {
						var list = m1;
						var list_type = (m2.search(/[*+-]/g)>-1) ? "ul" : "ol";
						list = list.replace(/\n{2,}/g,"\n\n\n");;
						var result = _ProcessListItems(list);
						result = result.replace(/\s+$/,"");
						result = "<"+list_type+">" + result + "</"+list_type+">\n";
						return result;
					});
				} else {
					whole_list = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;
					text = text.replace(whole_list,function(wholeMatch,m1,m2,m3) {
						var runup = m1;
						var list = m2;
						var list_type = (m3.search(/[*+-]/g)>-1) ? "ul" : "ol";
						var list = list.replace(/\n{2,}/g,"\n\n\n");;
						var result = _ProcessListItems(list);
						result = runup + "<"+list_type+">\n" + result + "</"+list_type+">\n";	
						return result;
					});
				}
				text = text.replace(/~0/,"");
				return text;
			}
			_ProcessListItems = function(list_str) {
				g_list_level++;
				list_str = list_str.replace(/\n{2,}$/,"\n");
				list_str += "~0";
				list_str = list_str.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,
					function(wholeMatch,m1,m2,m3,m4){
						var item = m4;
						var leading_line = m1;
						var leading_space = m2;
						if (leading_line || (item.search(/\n{2,}/)>-1)) {
							item = _RunBlockGamut(_Outdent(item));
						}
						else {
							
							item = _DoLists(_Outdent(item));
							item = item.replace(/\n$/,""); 
							item = _RunSpanGamut(item);
						}
						return  "<li>" + item + "</li>\n";
					}
				);
				list_str = list_str.replace(/~0/g,"");
				g_list_level--;
				return list_str;
			}
			var _DoCodeBlocks = function(text) {
				text += "~0";
				text = text.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,
					function(wholeMatch,m1,m2) {
						var codeblock = m1;
						var nextChar = m2;
						codeblock = _EncodeCode( _Outdent(codeblock));
						codeblock = _Detab(codeblock);
						codeblock = codeblock.replace(/^\n+/g,""); 
						codeblock = codeblock.replace(/\n+$/g,""); 
						codeblock = "<pre><code>" + codeblock + "\n</code></pre>";
						return hashBlock(codeblock) + nextChar;
					}
				);
				text = text.replace(/~0/,"");
				return text;
			}
			var hashBlock = function(text) {
				text = text.replace(/(^\n+|\n+$)/g,"");
				return "\n\n~K" + (g_html_blocks.push(text)-1) + "K\n\n";
			}
			var _DoCodeSpans = function(text) {
				text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
					function(wholeMatch,m1,m2,m3,m4) {
						var c = m3;
						c = c.replace(/^([ \t]*)/g,"");	
						c = c.replace(/[ \t]*$/g,"");	
						c = _EncodeCode(c);
						return m1+"<code>"+c+"</code>";
					});
				return text;
			}
			var _EncodeCode = function(text) {
				text = text.replace(/&/g,"&amp;");
				text = text.replace(/</g,"&lt;");
				text = text.replace(/>/g,"&gt;");
				text = escapeCharacters(text,"\*_{}[]\\",false);
				return text;
			}
			var _DoItalicsAndBold = function(text) {
				text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,
					"<strong>$2</strong>");
				text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,
					"<em>$2</em>");
				return text;
			}
			var _DoBlockQuotes = function(text) {
				text = text.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,
					function(wholeMatch,m1) {
						var bq = m1;
						bq = bq.replace(/^[ \t]*>[ \t]?/gm,"~0");	
						bq = bq.replace(/~0/g,"");
						bq = bq.replace(/^[ \t]+$/gm,"");		
						bq = _RunBlockGamut(bq);
						bq = bq.replace(/(^|\n)/g,"$1  ");
						bq = bq.replace(
								/(\s*<pre>[^\r]+?<\/pre>)/gm,
							function(wholeMatch,m1) {
								var pre = m1;
								pre = pre.replace(/^  /mg,"~0");
								pre = pre.replace(/~0/g,"");
								return pre;
							});
						return hashBlock("<blockquote>\n" + bq + "\n</blockquote>");
					});
				return text;
			}
			var _FormParagraphs = function(text) {
				text = text.replace(/^\n+/g,"");
				text = text.replace(/\n+$/g,"");
				var grafs = text.split(/\n{2,}/g);
				var grafsOut = new Array();
				var end = grafs.length;
				for (var i=0; i<end; i++) {
					var str = grafs[i];
					if (str.search(/~K(\d+)K/g) >= 0) {
						grafsOut.push(str);
					}
					else if (str.search(/\S/) >= 0) {
						str = _RunSpanGamut(str);
						str = str.replace(/^([ \t]*)/g,"<p>");
						str += "</p>"
						grafsOut.push(str);
					}
				}
				end = grafsOut.length;
				for (var i=0; i<end; i++) {
					
					while (grafsOut[i].search(/~K(\d+)K/) >= 0) {
						var blockText = g_html_blocks[RegExp.$1];
						blockText = blockText.replace(/\$/g,"$$$$"); 
						grafsOut[i] = grafsOut[i].replace(/~K\d+K/,blockText);
					}
				}
				return grafsOut.join("\n\n");
			}
			var _EncodeAmpsAndAngles = function(text) {
				text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;");
				text = text.replace(/<(?![a-z\/?\$!])/gi,"&lt;");
				return text;
			}
			var _EncodeBackslashEscapes = function(text) {
				text = text.replace(/\\(\\)/g,escapeCharacters_callback);
				text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g,escapeCharacters_callback);
				return text;
			}
			var _DoAutoLinks = function(text) {
				text = text.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,"<a href=\"$1\">$1</a>");
				text = text.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,
					function(wholeMatch,m1) {
						return _EncodeEmailAddress( _UnescapeSpecialChars(m1) );
					}
				);
				return text;
			}
			var _EncodeEmailAddress = function(addr) {
				function char2hex(ch) {
					var hexDigits = '0123456789ABCDEF';
					var dec = ch.charCodeAt(0);
					return(hexDigits.charAt(dec>>4) + hexDigits.charAt(dec&15));
				}
				var encode = [
					function(ch){return "&#"+ch.charCodeAt(0)+";";},
					function(ch){return "&#x"+char2hex(ch)+";";},
					function(ch){return ch;}
				];
				addr = "mailto:" + addr;
				addr = addr.replace(/./g, function(ch) {
					if (ch == "@") {
						ch = encode[Math.floor(Math.random()*2)](ch);
					} else if (ch !=":") {
						
						var r = Math.random();
						ch =  (
								r > .9  ?	encode[2](ch)   :
								r > .45 ?	encode[1](ch)   :
											encode[0](ch)
							);
					}
					return ch;
				});
				addr = "<a href=\"" + addr + "\">" + addr + "</a>";
				addr = addr.replace(/">.+:/g,"\">"); 
				return addr;
			}
			var _UnescapeSpecialChars = function(text) {
				text = text.replace(/~E(\d+)E/g,
					function(wholeMatch,m1) {
						var charCodeToReplace = parseInt(m1);
						return String.fromCharCode(charCodeToReplace);
					}
				);
				return text;
			}
			var _Outdent = function(text) {
				text = text.replace(/^(\t|[ ]{1,4})/gm,"~0"); 
				text = text.replace(/~0/g,"")
				return text;
			}
			var _Detab = function(text) {
				text = text.replace(/\t(?=\t)/g,"    ");
				text = text.replace(/\t/g,"~A~B");
				text = text.replace(/~B(.+?)~A/g,
					function(wholeMatch,m1,m2) {
						var leadingText = m1;
						var numSpaces = 4 - leadingText.length % 4;
						for (var i=0; i<numSpaces; i++) leadingText+=" ";
						return leadingText;
					}
				);
				text = text.replace(/~A/g,"    ");  
				text = text.replace(/~B/g,"");
				return text;
			}
			var escapeCharacters = function(text, charsToEscape, afterBackslash) {
				var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g,"\\$1") + "])";
				if (afterBackslash) {
					regexString = "\\\\" + regexString;
				}
				var regex = new RegExp(regexString,"g");
				text = text.replace(regex,escapeCharacters_callback);
				return text;
			}
			var escapeCharacters_callback = function(wholeMatch,m1) {
				var charCodeToEscape = m1.charCodeAt(0);
				return "~E"+charCodeToEscape+"E";
			}
			} 
			var converter = new Showdown.converter();
			function wireupNewCommentEditors( parent )
			{	
				if (!parent.getElementsByTagName) return;
				if ( parent.tagName == 'FORM' )
				{
					removeExistingPreview( parent );		
					removeExistingEditor( parent );
					
					var preview = addPreviewToParent( parent );	
					addMarkdownEditorToForm( parent, preview );
				}
				else
				{		
					var forms = parent.getElementsByTagName('form');
					for ( var i=0, form=null; form=forms[i]; i++ ) {
						if ( form.getAttribute('id') && 
							(
								(form.getAttribute('id').match(/^commentreply_./)) 
							)
						) 
						{				
							var preview = addPreviewToParent(form);
							addMarkdownEditorToForm( form, preview );
						}
					}
				}
			}
			function wireupExistingCommentEditors()
			{
				var editDivs = document.evaluate(
					"//div[@class='usertext-edit']",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null
				);
				for ( var i = 0; i < editDivs.snapshotLength; i++)
				{
					var editDiv = editDivs.snapshotItem(i);
					var preview = addPreviewToParent( editDiv );
					addMarkdownEditorToForm( editDiv, preview );
					refreshPreview( preview, preview.textArea )
				}
			}
			function addPreviewToParent( parent ) 
			{	
				var set=document.createElement('fieldset');
				set.setAttribute('class', 'liveComment');
				var legend=document.createElement('legend');
				legend.textContent='Live Preview';
				var preview=document.createElement('div');
				preview.setAttribute('class', 'md');
				set.appendChild(legend);
				set.appendChild(preview);
				preview.parentNode.style.display = 'none';
				parent.appendChild(set);
				var textAreas = parent.getElementsByTagName('textarea');
				if ( textAreas[0] )
				{		
					var targetTextArea = textAreas[0];
					var timer=null;
					
					targetTextArea.addEventListener(
						'keyup',
						function()
						{
							if (timer) clearTimeout(timer);
							
							timer = setTimeout(
								function()
								{
									refreshPreview( preview, targetTextArea );			
								},
								100
							);
						},
						false
					);	
					
					preview.textArea = targetTextArea;
				
					addPreviewClearOnCommentSubmit( parent, preview );
				}
				
				return preview;
			}
			
			function removeExistingPreview( parent )
			{
				var fieldSets = parent.getElementsByTagName('fieldset');
				
				for (var i = 0, fieldSet = null; fieldSet = fieldSets[i]; i++)
				{		
					if ( fieldSet.getAttribute( 'class' ) == 'liveComment' )
					{			
						fieldSet.parentNode.removeChild( fieldSet );
						break;
					}
				}
			}
			function removeExistingEditor( parent )
			{
				var divs = parent.getElementsByTagName('div');
				
				for (var i = 0, div = null; div = divs[i]; i++)
				{
					if ( div.getAttribute( 'class' ) == 'markdownEditor' )
					{
						div.parentNode.removeChild( div );
						break;
					}
				}
			}
			function addPreviewClearOnCommentSubmit( parent, preview )
			{
				var buttons = parent.getElementsByTagName('button');
				
				for (var i = 0, button = null; button = buttons[i]; i++)
				{
					if ( button.getAttribute('class') == "save" )
					{
						button.addEventListener(
							'click', 
							function()
							{
								preview.innerHTML='';
							}, 
							false
						);
					}
				}	
			}
			function refreshPreview( preview, targetTextArea )
			{
				
				if (targetTextArea.value == '') {
					preview.parentNode.style.display = 'none';
				} else {
					preview.parentNode.style.display = 'block';
				}
				preview.innerHTML = converter.makeHtml( targetTextArea.value );
			}
			function addMarkdownEditorToForm( parent, preview ) 
			{	
				var textAreas = parent.getElementsByTagName('textarea');
				
				if ( !textAreas[0] ) return;
				
				var targetTextArea = textAreas[0];
				
				var controlBox = document.createElement( 'div' );
				controlBox.setAttribute('class', 'markdownEditor');
				
				parent.insertBefore( controlBox, parent.firstChild );
				
				var bold = new EditControl(
					'<b>Bold</b>',
					function()
					{
						tagSelection( targetTextArea, '**', '**' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var italics = new EditControl(
					'<i>Italic</i>',
					function()
					{
						tagSelection( targetTextArea, '*', '*' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var link = new EditControl(
					'Link',
					function()
					{
						linkSelection( targetTextArea );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var quote = new EditControl(
					'|Quote',
					function()
					{
						prefixSelectionLines( targetTextArea, '>' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var code = new EditControl(
					'<span style="font-family: Courier New;">Code</span>',
					function()
					{
						prefixSelectionLines( targetTextArea, '    ' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var bullets = new EditControl(
					'&bull;Bullets',
					function()
					{
						prefixSelectionLines( targetTextArea, '* ' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var numbers = new EditControl(
					'1.Numbers',
					function()
					{
						prefixSelectionLines( targetTextArea, '1. ' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var disapproval = new EditControl(
					'&#3232;\_&#3232;',
					function() {
						prefixSelectionLines( targetTextArea, '&#3232;_&#3232;' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var promoteRES = new EditControl(
					'[Promote]',
					function() {
						prefixSelectionLines( targetTextArea, '[Reddit Enhancement Suite](http://reddit.honestbleeps.com?referral='+RESUtils.loggedInUser()+')' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				controlBox.appendChild( bold.create() );
				controlBox.appendChild( italics.create() );
				controlBox.appendChild( link.create() );
				controlBox.appendChild( quote.create() );
				controlBox.appendChild( code.create() );
				controlBox.appendChild( bullets.create() );
				controlBox.appendChild( numbers.create() );
				controlBox.appendChild( disapproval.create() );
				controlBox.appendChild( promoteRES.create() );
					
			}
			function EditControl( label, editFunction )
			{
				this.create = function() 
				{
					var link = document.createElement('a');
					link.innerHTML = label;
					link.href = 'javascript:;';
					link.setAttribute('style','Margin-Right: 15px; text-decoration: none;');
					link.execute = editFunction;
					addEvent( link, 'click', 'execute' );
					return link;	
				}
			}
			function tagSelection( targetTextArea, tagOpen, tagClose, textEscapeFunction )
			{	
				var scrollTop = targetTextArea.scrollTop;
				var selectionStart = targetTextArea.selectionStart;
				var selectionEnd = targetTextArea.selectionEnd;
				var selectedText = targetTextArea.value.substring( selectionStart, selectionEnd );
				var potentialTrailingSpace = '';
				if( selectedText[ selectedText.length - 1 ] == ' ' )
				{
					potentialTrailingSpace = ' ';
					selectedText = selectedText.substring( 0, selectedText.length - 1 );
				}
				if ( textEscapeFunction )
				{
					selectedText = textEscapeFunction( selectedText );
				}
				targetTextArea.value = 
					targetTextArea.value.substring( 0, selectionStart ) + 
					tagOpen + 
					selectedText +
					tagClose + 
					potentialTrailingSpace +
					targetTextArea.value.substring( selectionEnd ); 
				targetTextArea.selectionStart = selectionStart + tagOpen.length;
				targetTextArea.selectionEnd = selectionEnd + tagOpen.length;
				
				targetTextArea.scrollTop = scrollTop;
			}
			function linkSelection( targetTextArea )
			{
				var url = prompt( "Enter the URL:", "" );
				if ( url != null )
				{
					tagSelection(
						targetTextArea,
						'[',
						'](' + url.replace( /\(/, '\\(' ).replace( /\)/, '\\)' ) + ')', 
						function( text )
						{
							return text.replace( /\[/, '\\[' ).replace( /\]/, '\\]' ).replace( /\(/, '\\(' ).replace( /\)/, '\\)' ); 
						}
					);
				}
			}
			function prefixSelectionLines( targetTextArea, prefix )
			{
				var scrollTop = targetTextArea.scrollTop;
				var selectionStart = targetTextArea.selectionStart;
				var selectionEnd = targetTextArea.selectionEnd;
				var selectedText = targetTextArea.value.substring( selectionStart, selectionEnd );
				var lines = selectedText.split( '\n' );
				var newValue = '';
				for( var i = 0; i < lines.length; i++ )
				{
					newValue += prefix + lines[i] + '\n';
				}
				targetTextArea.value = 
					targetTextArea.value.substring( 0, selectionStart ) + 
					newValue + 
					targetTextArea.value.substring( selectionEnd ); 
				
				targetTextArea.scrollTop = scrollTop;
			}
			function addEvent( target, eventName, handlerName )
			{
				target.addEventListener(eventName, function(e){target[handlerName](e);}, false);
			}
			RESUtils.addCSS('fieldset.liveComment, fieldset.liveComment legend { border: 1px solid black; border-radius: 1em; -moz-border-radius: 1em; -webkit-border-radius: 1em; }'+
				'fieldset.liveComment { padding: 1ex; margin: 1em 0; }'+
				'fieldset.liveComment legend { padding: 0 1ex; background-color: #E9E9E9; }');
			wireupExistingCommentEditors();
			document.body.addEventListener(
				'DOMNodeInserted',
				function( event ) 
				{
					wireupNewCommentEditors( event.target );
				},
				false
			);
		}
	}
};
modules['showImages'] = {
	moduleID: 'showImages',
	moduleName: 'Inline Image Viewer',
	options: {
		maxWidth: {
			type: 'text',
			value: '640',
			description: 'Max width of image displayed onscreen'
		},
		maxHeight: {
			type: 'text',
			value: '480',
			description: 'Max height of image displayed onscreen'
		},
		openInNewWindow: {
			type: 'boolean',
			value: true,
			description: 'Open images in a new tab/window when clicked?'
		},
		hideNSFW: {
			type: 'boolean',
			value: false,
			description: 'If checked, do not show images with NSFW in the title.'
		},
		useSmallImages: {
			type: 'boolean',
			value: false,
			description: 'If checked, use smaller images from imgur to save bandwidth.'
		}
	},
	description: 'Opens images inline in your browser with the click of a button. Also has configuration options, check it out!',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/http:\/\/www.reddit.com\/[-\w\.\_\?=]*/i
	),
	exclude: Array(
		/http:\/\/www.reddit.com\/ads\/[-\w\.\_\?=]*/i,
		/http:\/\/www.reddit.com\/[-\w\.\/]*\/submit\/?/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			RESUtils.getOptions(this.moduleID);
			RESUtils.addCSS(".expando-button.image { float: left; width: 23px; height: 23px; max-width: 23px; max-height: 23px; display: inline-block; background-image: url('http://thumbs.reddit.com/t5_2s10b_0.png'); margin-right: 6px; cursor: pointer;  padding: 0px; }");
			RESUtils.addCSS(".expando-button.image.commentImg { float: none; margin-left: 4px; } ");
			RESUtils.addCSS(".expando-button.image.collapsed { background-position: 0px 0px; } ");
			RESUtils.addCSS(".expando-button.image.collapsed:hover { background-position: 0px -24px; } ");
			RESUtils.addCSS(".expando-button.image.expanded { background-position: 0px -48px; } ");
			RESUtils.addCSS(".expando-button.image.expanded:hover { background-position: 0px -72px; } ");
			this.imageList = Array();
			this.imagesRevealed = Array();
			document.body.addEventListener('DOMNodeInserted', function(event) {
				if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') == 'siteTable')) {
					modules['showImages'].findAllImages(event.target);
					if (modules['showImages'].imagesVisible) {
						this.waitForScan = setInterval(function() {
							if (!(modules['showImages'].scanningForImages)) {
								modules['showImages'].showImages(modules['showImages'].gw, true);
								clearInterval(modules['showImages'].waitForScan);
							}
						}, 100);
					}
				}
			}, true);
			this.createImageButtons();
			this.findAllImages();
		}
	},
	createImageButtons: function() {
		var mainmenuUL = document.body.querySelector('#header-bottom-left ul.tabmenu');
		
		if (mainmenuUL) {
			var li = document.createElement('li');
			var a = document.createElement('a');
			var text = document.createTextNode('scanning for images...');
			this.scanningForImages = true;
			a.setAttribute('href','javascript:void(0);');
			a.setAttribute('id','viewImagesButton');
			a.addEventListener('click', function(e) {
				e.preventDefault();
				if (!(modules['showImages'].scanningForImages)) {
					modules['showImages'].showImages();
				}
			}, true);
			a.appendChild(text);
			li.appendChild(a);
			mainmenuUL.appendChild(li);
			this.viewButton = a;
			this.gw = '';
			var commentsre = new RegExp(/comments\/[-\w\.\/]/i);
			if (!(commentsre.test(location.href)) && (window.location.href.indexOf('gonewild')>=0)){
				var li = document.createElement('li');
				var a = document.createElement('a');
				var text = document.createTextNode('[m]');
				a.setAttribute('href','javascript:void(0);');
				a.addEventListener('click', function(e) {
					e.preventDefault();
					modules['showImages'].gw = 'm';
					modules['showImages'].showImages('m');
				}, true);
				a.appendChild(text);
				li.appendChild(a);
				mainmenuUL.appendChild(li);
				var li = document.createElement('li');
				var a = document.createElement('a');
				var text = document.createTextNode('[f]');
				a.setAttribute('href','javascript:void(0);');
				a.addEventListener('click', function(e) {
					e.preventDefault();
					modules['showImages'].gw = 'f';
					modules['showImages'].showImages('f');
				}, true);
				a.appendChild(text);
				li.appendChild(a);
				mainmenuUL.appendChild(li);
			}
		}
	},
	updateImageButtons: function(imgCount) {
		if ((typeof(this.viewButton) != 'undefined')) {
			if (this.imagesVisible) {
				this.viewButton.innerHTML = 'hide images ('+imgCount+')';
			} else {
				this.viewButton.innerHTML = 'view images ('+imgCount+')';
			}
		}
	},
	findImages: function(gonewild, showmore) {
		switch (gonewild) {
			case 'f':
				re = new RegExp(/[\[\{\<\(](f|fem|female)[\]\}\>\)]/i);
				break;
			case 'm':
				re = new RegExp(/[\[\{\<\(](m|man|male)[\]\}\>\)]/i);
				break;
		}
		if (this.options.hideNSFW.value) {
			re = new RegExp(/nsfw/i);
		}
		for(var i=0, len=this.imageList.length;i<len;i++) {
			var href= this.imageList[i].getAttribute("href");
			var title_text=this.imageList[i].text;
			(gonewild) ? titleMatch = re.test(title_text) : titleMatch = false;
			var NSFW = false;
			if (this.options.hideNSFW.value) {
				NSFW = re.test(title_text);
			}
			if (href && (gonewild == '' || titleMatch) && (!NSFW) && (href.indexOf('imgur.')>=0 || href.indexOf('.jpeg')>=0 || href.indexOf('.jpg')>=0 || href.indexOf('.gif')>=0)) {
				if (hasClass(this.imageList[i].parentNode,'title')) {
					var targetImage = this.imageList[i].parentNode.nextSibling
				} else {
					var targetImage = this.imageList[i].nextSibling
				}
				this.revealImage(targetImage, showmore);
			}
		}
	},
	imgurType: function(url) {
		var urlPieces = url.split('?');
		var cleanURL = urlPieces[0];
		var directImg = /i.imgur.com\/[\w]+\.[\w]+/gi;
		var imgPage = /imgur.com\.[\w+]$/gi;
	},
	findAllImages: function(ele) {
		this.scanningForImages = true;
		if (ele == null) {
			ele = document.body;
		}
		var commentsre = new RegExp(/comments\/[-\w\.\/]/i);
		var userre = new RegExp(/user\/[-\w\.\/]/i);
		if ((commentsre.test(location.href)) || (userre.test(location.href))) {
			this.allElements = ele.querySelectorAll('#siteTable A.title, .usertext-body > div.md a');
		} else {
			this.allElements = ele.querySelectorAll('#siteTable A.title');
		}
		this.imgurCalls = new Array();
		this.hashRe = /^http:\/\/[i.]*imgur.com\/([\w]+)(\..+)?$/i;
		var groups = Array();
		this.allElementsCount=this.allElements.length;
		this.allElementsi = 0;
		(function(){
			var chunkLength = Math.min((modules['showImages'].allElementsCount - modules['showImages'].allElementsi), 10);
			for (var i=0;i<chunkLength;i++) {
				modules['showImages'].checkElementForImage(modules['showImages'].allElementsi);
				modules['showImages'].allElementsi++;
			}
			if (modules['showImages'].allElementsi < modules['showImages'].allElementsCount) {
				setTimeout(arguments.callee, 300);
			} else {
				modules['showImages'].scanningForImages = false;
				modules['showImages'].updateImageButtons(modules['showImages'].imageList.length);
			}
		})();		
	},
	checkElementForImage: function(index) {
		ele = this.allElements[index];
		var href = ele.getAttribute('href');
		if ((!(hasClass(ele,'imgScanned'))) && (typeof(this.imagesRevealed[href]) == 'undefined') && (href != null)) {
			addClass(ele,'imgScanned');
			this.imagesRevealed[href] = true;
			isImgur = (href.indexOf('imgur.com')>=0);
			
			if (!(ele.getAttribute('scanned') == 'true') && (isImgur || href.indexOf('.jpeg')>=0 || href.indexOf('.jpg')>=0 || href.indexOf('.gif')>=0)) {
				if (isImgur) {
					var splithref = href.split('?');
					href = splithref[0];
					if (this.options.useSmallImages.value) { 
						splithref = href.split('.');
						if ((splithref[splithref.length-1] == 'jpg') || (splithref[splithref.length-1] == 'jpeg') || (splithref[splithref.length-1] == 'png') || (splithref[splithref.length-1] == 'gif'))  {
							splithref[splithref.length-2] += 'h';
							href = splithref.join('.');
						}
					}
					ele.setAttribute('href',href);
					groups = this.hashRe.exec(href);
					if ((groups && !groups[2]) && (typeof(opera) == 'undefined')) {
						var apiURL = 'http://api.imgur.com/2/image/'+groups[1]+'.xml';
						if (typeof(this.imgurCalls[apiURL]) == 'undefined') {
							
							this.imgurCalls[apiURL] = ele;
							GM_xmlhttpRequest({ 
								method: 'GET', 
								url: apiURL,
								onload: function(response) {
									var parser = new DOMParser();
									var xml = parser.parseFromString(response.responseText, "application/xml");
									if (xml.getElementsByTagName('original')[0]) {
										modules['showImages'].imgurCalls[apiURL].setAttribute('href',xml.getElementsByTagName('original')[0].textContent);
									}
								}
							});
						}
					} 
					if (groups) this.createImageExpando(ele, true);
				} else {
					this.createImageExpando(ele);
				}
			}
		} else if (!(hasClass(ele,'imgFound'))) {
			if (!(ele.getAttribute('scanned') == 'true') && (href.indexOf('imgur.')>=0 || href.indexOf('.jpeg')>=0 || href.indexOf('.jpg')>=0 || href.indexOf('.gif')>=0)) {
				var textFrag = document.createTextNode(' [duplicate image ignored.]');
				insertAfter(ele, textFrag);
			}
		}
	},
	createImageExpando: function(obj, asynch) {
		addClass(obj,'imgFound');
		obj.setAttribute('scanned','true');
		this.imageList.push(obj);
		var thisExpandLink = document.createElement('a');
		thisExpandLink.setAttribute('class','toggleImage expando-button image');
		
		thisExpandLink.innerHTML = '&nbsp;';
		removeClass(thisExpandLink, 'expanded');
		addClass(thisExpandLink, 'collapsed');
		thisExpandLink.addEventListener('click', function(e) {
			e.preventDefault();
			modules['showImages'].revealImage(e.target);
		}, true);
		if (hasClass(obj.parentNode,'title')) {
			var nodeToInsertAfter = obj.parentNode;
			addClass(thisExpandLink, 'linkImg');
		} else {
			var nodeToInsertAfter = obj;
			addClass(thisExpandLink, 'commentImg');
		}
		insertAfter(nodeToInsertAfter, thisExpandLink);
	},
	revealImage: function(showLink, showhide) {
		
		if (hasClass(showLink, 'commentImg')) {
			var thisImageLink = showLink.previousSibling;
		} else {
			var thisImageLink = showLink.previousSibling.firstChild;
		}
		var imageCheck = showLink.nextSibling;
		
		if ((typeof(imageCheck) != 'undefined') && (imageCheck != null) && (typeof(imageCheck.tagName) != 'undefined') && (hasClass(imageCheck, 'madeVisible'))) {
			if ((showhide != true) && (imageCheck.style.display != 'none')) {
				imageCheck.style.display = 'none';
				
				removeClass(showLink, 'expanded');
				addClass(showLink, 'collapsed');
			} else {
				imageCheck.style.display = 'block';
				
				removeClass(showLink, 'collapsed');
				addClass(showLink, 'expanded');
			}
		} else {
			
			var href = thisImageLink.getAttribute('href');
			var ext = (href.indexOf('imgur.')>=0 && href.indexOf('.jpg')<0 && href.indexOf('.png')<0 && href.indexOf('.gif')<0) ? '.jpg' :'';
			var img = document.createElement('a');
			if (this.options.openInNewWindow.value) {
				img.setAttribute('target','_blank');
			}
			img.setAttribute('href',href);
			img.setAttribute('class','madeVisible');
			img.setAttribute('style','display: block;max-width:'+this.options.maxWidth.value+'px;max-height:'+this.options.maxHeight.value+'px; clear: both;');
			img.innerHTML = '<img style="display:block;max-width:'+this.options.maxWidth.value+'px;max-height:'+this.options.maxHeight.value+'px;" src="' + href + ext + '" />';
			insertAfter(showLink, img);
			
			removeClass(showLink, 'collapsed');
			addClass(showLink, 'expanded');
		}
	},
	showImages: function(gonewild, showmore) {
		if ((this.imagesVisible) && (!(showmore))) {
			this.imagesVisible = false;
			
			var imageList = document.body.querySelectorAll('.madeVisible');
			for (var i=0, len=this.imageList.length;i<len;i++) {
				this.revealImage(imageList[i].previousSibling, false);
			}
			this.viewButton.innerHTML = 'view images ('+this.imageList.length+')';
			return false;
		} else {
			this.imagesVisible = true;
			this.viewButton.innerHTML = 'hide images ('+this.imageList.length+')';
			var gw = gonewild || '';
			this.findImages(gw, showmore);
		}
	}
}; 
modules['hideChildComments'] = {
	moduleID: 'hideChildComments',
	moduleName: 'Hide All Child Comments',
	options: {
		automatic: {
			type: 'boolean',
			value: false,
			description: 'Automatically hide all but parent comments, or provide a link to hide them all?'
		}
	},
	description: 'Allows you to hide all comments except for replies to the OP for easier reading.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/http:\/\/www.reddit.com\/[-\w\.\/]+\/comments\/[-\w\.]+/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			
			RESUtils.getOptions(this.moduleID);
			
			
			var toggleButton = document.createElement('li');
			this.toggleAllLink = document.createElement('a');
			this.toggleAllLink.innerHTML = 'hide all child comments';
			this.toggleAllLink.setAttribute('action','hide');
			this.toggleAllLink.setAttribute('href','javascript:void(0);');
			this.toggleAllLink.setAttribute('title','Show only replies to original poster.');
			this.toggleAllLink.addEventListener('click', function() {
				modules['hideChildComments'].toggleComments(this.getAttribute('action'));
				if (this.getAttribute('action') == 'hide') {
					this.setAttribute('action','show');
					this.setAttribute('title','Show all comments.');
					this.innerHTML = 'show all child comments';
				} else {
					this.setAttribute('action','hide');
					this.setAttribute('title','Show only replies to original poster.');
					this.innerHTML = 'hide all child comments';
				}
			}, true);
			toggleButton.appendChild(this.toggleAllLink);
			var commentMenu = document.querySelector('ul.buttons');
			if (commentMenu) {
				commentMenu.appendChild(toggleButton);
				var rootComments = document.querySelectorAll('div.commentarea > div.sitetable > div.thing > div.child > div.listing');
				for (var i=0, len=rootComments.length; i<len; i++) {
					var toggleButton = document.createElement('li');
					var toggleLink = document.createElement('a');
					toggleLink.innerHTML = 'hide child comments';
					toggleLink.setAttribute('action','hide');
					toggleLink.setAttribute('href','javascript:void(0);');
					toggleLink.setAttribute('class','toggleChildren');
					toggleLink.setAttribute('title','Hide child comments.');
					toggleLink.addEventListener('click', function(e) {
						modules['hideChildComments'].toggleComments(this.getAttribute('action'), this);
						if (this.getAttribute('action') == 'hide') {
							this.setAttribute('action','show');
							this.setAttribute('title','show child comments.');
							this.innerHTML = 'show child comments';
						} else {
							this.setAttribute('action','hide');
							this.setAttribute('title','hide child comments.');
							this.innerHTML = 'hide child comments';
						}
					}, true);
					toggleButton.appendChild(toggleLink);
					var sib = rootComments[i].parentNode.previousSibling;
					if (typeof(sib) != 'undefined') {
						var sibMenu = sib.querySelector('ul.buttons');
						sibMenu.appendChild(toggleButton);
					}
				}
				if (this.options.automatic.value) {
					RESUtils.click(this.toggleAllLink);
				}
			}
		}
	},
	toggleComments: function(action, obj) {
		if (obj) {
			var thisChildren = obj.parentNode.parentNode.parentNode.parentNode.nextSibling.firstChild;
			(action == 'hide') ? thisChildren.style.display = 'none' : thisChildren.style.display = 'block';
		} else {
			
			var commentContainers = document.querySelectorAll('div.commentarea > div.sitetable > div.thing');
			for (var i=0, len=commentContainers.length; i<len; i++) {
				var thisChildren = commentContainers[i].querySelector('div.child > div.sitetable');
				var thisToggleLink = commentContainers[i].querySelector('a.toggleChildren');
				if (thisToggleLink != null) {
					if (action == 'hide') {
						if (thisChildren != null) {
							thisChildren.style.display = 'none' 
						}
						thisToggleLink.innerHTML = 'show child comments';
						thisToggleLink.setAttribute('title','show child comments');
						thisToggleLink.setAttribute('action','show');
					} else {
						if (thisChildren != null) {
							thisChildren.style.display = 'block';
						}
						thisToggleLink.innerHTML = 'hide child comments';
						thisToggleLink.setAttribute('title','hide child comments');
						thisToggleLink.setAttribute('action','hide');
					}
				}
			}
		}
	}
};
modules['userHighlight'] = {
	moduleID: 'userHighlight',
	moduleName: 'User Highlighter',
	description: 'Highlights certain users in comment threads: OP, Admin, Friends, Mod - contributed by MrDerk',
	options: { 
		highlightOP: {
			type: 'boolean',
			value: true,
			description: 'Highlight OP\'s comments'
		},
		OPColor: {
			type: 'text',
			value: '#0055DF',
			description: 'Color to use to highlight OP. Defaults to original text color'
		},
		OPColorHover: {
			type: 'text',
			value: '#4E7EAB',
			description: 'Color used to highlight OP on hover.'
		},
		highlightAdmin: {
			type: 'boolean',
			value: true,
			description: 'Highlight Admin\'s comments'
		},
		adminColor: {
			type: 'text',
			value: '#FF0011',
			description: 'Color to use to highlight Admins. Defaults to original text color'
		},
		adminColorHover: {
			type: 'text',
			value: '#B3000C',
			description: 'Color used to highlight Admins on hover.'
		},
		highlightMod: {
			type: 'boolean',
			value: true,
			description: 'Highlight Mod\'s comments'
		},
		modColor: {
			type: 'text',
			value: '#228822',
			description: 'Color to use to highlight Mods. Defaults to original text color'
		},
		modColorHover: {
			type: 'text',
			value: '#134913',
			description: 'Color used to highlight Mods on hover. Defaults to gray.'
		},
		fontColor: {
			type: 'text',
			value: 'white',
			description: 'Color for highlighted text.',
		}
	},
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/http:\/\/www.reddit.com\/[\?]*/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},	
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			
			RESUtils.getOptions(this.moduleID);
			if (this.options.highlightFriend.value) {
				var name = 'friend';
				var color = this.options.friendColor.value;
				var hoverColor = this.options.friendColorHover.value;
				this.doHighlight(name,color,hoverColor);
			}
			if (this.options.highlightMod.value) {
				var name = 'moderator';
				var color = this.options.modColor.value;
				var hoverColor = this.options.modColorHover.value;
				this.doHighlight(name,color,hoverColor);
			}
			if (this.options.highlightAdmin.value) {
				var name = 'admin';
				var color = this.options.adminColor.value;
				var hoverColor = this.options.adminColorHover.value;
				this.doHighlight(name,color,hoverColor);
			}
			if (this.options.highlightOP.value) {
				var name = 'submitter';
				var color = this.options.OPColor.value;
				var hoverColor = this.options.OPColorHover.value;
				this.doHighlight(name,color,hoverColor);
			}			
		}
	},
	doHighlight: function(name,color,hoverColor) {
		var firstComment = document.querySelector('.noncollapsed .' + name);
		if (firstComment === null) { 
			firstComment = document.querySelector('.' + name); 
		}
		if (firstComment != null) {
			if (color === 'default') {
				color = this.getStyle(firstComment, 'color');
			}
			if (hoverColor === 'default') {
				hoverColor = "#AAA";
			}
			if(typeof(color) != "undefined" && color != 'rgb(255, 255, 255)') {
				RESUtils.addCSS("\
				.author." + name + " { \
					color: " + this.options.fontColor.value + " !important; \
					font-weight: bold; \
					padding: 0 2px 0 2px; \
					border-radius: 3px; \
					-moz-border-radius: 3px; \
					-webkit-border-radius: 3px; \
					background-color:" + color + " !important} \
				.collapsed .author." + name + " { \
					color: white !important; \
					background-color: #AAA !important}\
				.author." + name + ":hover {\
					background-color: " + hoverColor + " !important; \
					text-decoration: none !important}");
				
			}		
		}
	},
	getStyle: function(oElm, strCssRule){
		var strValue = "";
		if(document.defaultView && document.defaultView.getComputedStyle){
			strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
		}
		else if(oElm.currentStyle){
			strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
				return p1.toUpperCase();
			});
			strValue = oElm.currentStyle[strCssRule];
		}
		return strValue;
	}
}; 
modules['newCommentCount'] = {
	moduleID: 'newCommentCount',
	moduleName: 'New Comment Count',
	options: {
		cleanComments: {
			type: 'text',
			value: 7,
			description: 'Clean out cached comment counts of pages you haven\t visited in [x] days - enter a number here only!'
		}
	},
	description: 'Shows how many new comments there are since your last visit.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/http:\/\/www.reddit.com\/?/i,
		/http:\/\/www.reddit.com\/r\/[\w]+\/?$/i,
		/http:\/\/www.reddit.com\/[-\w\.\/]+\/comments\/[-\w\.]+/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			
			RESUtils.getOptions(this.moduleID);
			
			var counts = localStorage.getItem('RESmodules.newCommentCount.counts');
			if (counts == null) {
				counts = '{}';
			}
			this.commentCounts = JSON.parse(counts);
			if (RESUtils.pageType() == 'comments') {
				this.updateCommentCount();
				document.body.addEventListener('DOMNodeInserted', function(event) {
					if ((event.target.tagName == 'DIV') && (hasClass(event.target,'thing'))) {
						modules['newCommentCount'].updateCommentCount();
					}
				}, true);
			} else {
				this.processCommentCounts();
			}
			RESUtils.addCSS('.newComments { display: inline; color: #aaaadd; }');
		}
	},
	processCommentCounts: function() {
		var lastClean = localStorage.getItem('RESmodules.newCommentCount.lastClean');
		var now = new Date();
		if (lastClean == null) {
			localStorage.setItem('RESmodules.newCommentCount.lastClean', now.getTime());
		}
		
		if ((now.getTime() - lastClean) > 5) {
			this.cleanCache();
		}
		var IDre = /\/r\/[\w]+\/comments\/([\w]+)\//i;
		var commentsLinks = document.querySelectorAll('#siteTable div.thing.link a.comments');
		for (var i=0, len=commentsLinks.length; i<len;i++) {
			var href = commentsLinks[i].getAttribute('href');
			var thisCount = commentsLinks[i].innerHTML;
			var split = thisCount.split(' ');
			thisCount = split[0];
			var matches = IDre.exec(href);
			if (matches) {
				var thisID = matches[1];
				if (typeof(this.commentCounts[thisID]) != 'undefined') {
					var diff = thisCount - this.commentCounts[thisID].count;
					if (diff > 0) {
						commentsLinks[i].innerHTML += ' ('+diff+' new)';
					}
				}
			}
		}
	},
	updateCommentCount: function() {
		var IDre = /\/r\/[\w]+\/comments\/([\w]+)\//i
		var matches = IDre.exec(location.href);
		if (matches) {
			if (!this.currentCommentCount) {
				this.currentCommentID = matches[1];
				var thisCountText = document.querySelector('#siteTable a.comments').innerHTML;
				var split = thisCountText.split(' ');
				this.currentCommentCount = split[0];
			} else {
				this.currentCommentCount++;
			}
		}
		var now = new Date();
		if (typeof(this.commentCounts) == 'undefined') {
			this.commentCounts = {};
		}
		this.commentCounts[this.currentCommentID] = {
			count: this.currentCommentCount,
			updateTime: now.getTime()
		}
		localStorage.setItem('RESmodules.newCommentCount.counts', JSON.stringify(this.commentCounts));
	},
	cleanCache: function() {
		var now = new Date();
		for(i in this.commentCounts) {
			if ((now.getTime() - this.commentCounts[i].updateTime) > (86400000 * this.options.cleanComments.value)) {
				this.commentCounts[i] = null;
			}
		}
		localStorage.setItem('RESmodules.newCommentCount.lastClean', now.getTime());
	}
};
(function(u) {
	if ((location.href.match(/comscore-iframe/i)) || (location.href.match(/static\.reddit/i)) || (location.href.match(/thumbs\.reddit/i))) {
		return false;
	} 
	if (location.href.match(/reddit\.com/i)) {
		RESUtils.checkForUpdate();
		
		RESConsole.create();
		RESConsole.addConsoleLink();
		var userNameEle = document.querySelector('#header-bottom-right span a');
		if ((typeof(userNameEle) != 'undefined') && (userNameEle != null)) {
			RESUtils.userName = userNameEle.text;
		}
		RESUtils.checkIfSubmitting();
		
		for (i in modules) {
			thisModuleID = i;
			if (typeof(modules[thisModuleID]) == 'object') {
				modules[thisModuleID].go();
			}
		}
		GM_addStyle(RESUtils.css);
	
	}
	if (location.href.match(/reddit.honestbleeps.com\/download/)) {
		var installLinks = document.body.querySelectorAll('.install');
		for (var i=0, len=installLinks.length;i<len;i++) {
			addClass(installLinks[i], 'update');
			removeClass(installLinks[i], 'install');
		}
	}
})();
var lastPerf = 0;
function perfTest(name) {
	var d = new Date();
	var diff = d.getTime() - lastPerf;
	console.log(name+' executed. Diff since last: ' + diff +'ms');
	lastPerf=d.getTime();
}