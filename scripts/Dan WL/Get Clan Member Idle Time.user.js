// ==UserScript==
// @name Get Clan Member Idle Time
// @namespace DanWL
// @version 1.1.2
// @description Displays the idle time for each clan member.
// @author https://greasyfork.org/en/users/85040-dan-wl-danwl
// @match https://www.warzone.com/*
// @grant none
// ==/UserScript==
/*
changes:
performance increases and faster download time to get dependencies
todo:

*/
var $, dom, css, string, onPage, types, download, runTabelSorter, runSlides;

const DEBUG = false;
const log = console.log;
let onClanPage;
let startTime;
let totalClannedMembers = 0;

function logEndTime()
{
	let endTime = new Date().getTime();
	let secondsTakenToGetIdleTime = (endTime - startTime) / 1000;

	log(secondsTakenToGetIdleTime + ' seconds taken to get idle time\nAverage was ' + secondsTakenToGetIdleTime / totalClannedMembers);
}

let GCMIToptions;
const allOptions = ['profilePageLoaded', 'doneClan', 'doneAllClans'];
const allClanPages = [];
/*
{
	profilePageLoaded: function(Window profilePageWindow){},
	doneClan: function(Window clanPageWindow){},
	doneAllClans: function(Array allClanPages){}
}
*/
const allClanPageUrls = [];

function runOption(functionName, functionWindow)
{
	if (!isObject(GCMIToptions) || !allOptions.includes(functionName))
		return;

	let _function = GCMIToptions[functionName];

	if (isFunction(_function))
		_function(functionWindow);
}

let doneAllClans;

function convertHoursToMins(hours)
{
	return hours * 60;
}
function convertDaysToMins(days)
{
	return convertHoursToMins(days * 24);
}
function convertTextTimeToMins(lastSeenTime)
{
	let sortVal = parseInt(lastSeenTime.match(/\d+/)[0]);//< 15 mins, only mins
	let timeParts = lastSeenTime.split(/\s/g);
	let timePart0 = parseInt(timeParts[0]);
	let timePart2 = parseInt(timeParts[2]);

	if (lastSeenTime.match(/minutes/) && lastSeenTime.match(/hour/))
		sortVal = convertHoursToMins(timePart0) + timePart2;//hours + mins
	else if (lastSeenTime.match(/day/) && lastSeenTime.match(/hour/))
		sortVal = convertDaysToMins(timePart0) + convertHoursToMins(timePart2);//days + hours
	else if (!lastSeenTime.match(/minutes/) && lastSeenTime.match(/hour/))
		sortVal = convertHoursToMins(timePart0);//only whole hours
	else if (lastSeenTime.match(/day/) && !lastSeenTime.match(/hour/))
		sortVal = convertDaysToMins(timePart0);//only whole days
	else if (lastSeenTime.match(/less than/))
		sortVal--;//makes less than sorted higher up than only mins

	return sortVal;
}

let clanMembersTbl;
let clanMembers = [];
/*
	would be nice to this:

	let allClanData =
	{
		clanIds: []
		'clanId':
		{
			ids: [],
			byIds:
			[
				{
					id: int id,
					isMember: bool isMember
					idleTime: int mins
				}
			]
		}
	};
*/

function readProfile(index, profilePage, clanIds, clanNo)
{
	//find the text that says the time that the player was last seen
	if (DEBUG) log('profilePage loaded');

	let profilePageDoc;

	if (profilePage.src === top.location.href)
	{
		if (DEBUG) log('window is same as top');
		//firefox prevents iframes of the top frame from having iframe of same src being placed in it
		profilePageDoc = window.document;
	}
	else
		profilePageDoc = profilePage.document;

	let textMutedCN = dom.nodeListToArray(profilePageDoc.getElementsByClassName('text-muted'));
	let getLastSeenTime = function(textMutedCNItem)
	{
		if (textMutedCNItem.innerText === 'Last seen ')
		{
			let lastSeenTime = $.trim(textMutedCNItem.nextSibling.textContent);//isn't an element, has loads of extra whitespace for some reason
			let idleTimeInMins = convertTextTimeToMins(lastSeenTime);
			let idleTimeLabel = dom.create('td', '', lastSeenTime, clanMembersTbl.children[1].children[index]);

			idleTimeLabel.setAttribute('sortvalue', idleTimeInMins);

			if (DEBUG)
			{
				log('lastSeenTime = ' + lastSeenTime + '\nidleTimeInMins = ' + idleTimeInMins);
				log(idleTimeLabel);
			}
		}
	};

	textMutedCN.forEach(function(textMutedCNItem)
	{
		getLastSeenTime(textMutedCNItem);
	});

	runOption('profilePageLoaded', profilePage);

	index++;//read next profile

	if (index === clanMembers.length)
	{
		let oldClanNo = clanNo;//quite a big delay for table to be sorted, so the doneAllClans wouldn't execute otherwise

		$(window.clanPage.document.getElementsByTagName('table')[0]).on('sortEnd', function()
		{
			runOption('doneClan', window.clanPage);
			if (oldClanNo + 1 === clanIds.length)
				doneAllClans();
		});
		let idleTimeColumn = 2;
		runTabelSorter([idleTimeColumn], window.clanPage);//autosort by idle time where clanPage is the 'active' window

		clanNo++;//read next clan

		if (clanNo === clanIds.length)
			return;

		if (DEBUG) log('moving onto clan ' + clanNo);

		clanMembers = [];
		window.clanPage = undefined;
		return readPlayersOnClanPage(clanIds, clanNo);
	}

	readTime(index, clanIds, clanNo);
}
function readTime(index, clanIds, clanNo)
{
	//reads one profile at a time
	let playerNumber = clanMembers[index][0];

	onloadGet('https://www.warzone.com/Profile?p=' + playerNumber, function(profilePage)
	{
		readProfile(index, profilePage, clanIds, clanNo);
	});
}

function checkIfClanPageFullyLoaded(clanIds, clanNo)
{
	//when getting idle time from non-clan page, the clan page isn't always fully loaded so the get idle time button can't be removed successfully
	let btn = window.clanPage.document.getElementById('getIdleTimeLi');

	if (!btn)
		return setTimeout((function(){checkIfClanPageFullyLoaded(clanIds, clanNo);}), 100);

	btn.remove();//remove get idle time button if already getting or got idle time

	if (DEBUG) log('init checkIfClanPageFullyLoaded ' + clanNo);

	allClanPages.push(window.clanPage);

	clanMembersTbl = window.clanPage.document.getElementsByClassName('dataTable')[0];
	let clanMembersTblTheadTr = clanMembersTbl.firstElementChild.firstElementChild;
	let clanMembersTblTheadTrChildren = dom.nodeListToArray(clanMembersTblTheadTr.children);

	//fix bad HTML for the table (th expected in table thead), td used instead - causes tablesorter error
	dom.changeElementTagNames(clanMembersTblTheadTrChildren, 'th');

	//display heading - using dom.elementExists to prevent the need to reload to see the results normally
	let id = 'idleTime';

	if (DEBUG)
	{
		log('id = ' + id);
		log(clanMembersTblTheadTr);
	}

	dom.elementExists(id, function()
	{
		if (DEBUG) log('creating th');

		return dom.create('th', id, 'Idle Time', clanMembersTblTheadTr);
	}, function(element, elements)
	{
		return elements;
	}, window.clanPage).className = "{sorter: 'digit'}";

	//preserve the old style of td
	clanMembersTblTheadTrChildren.forEach(function(tableHeading)
	{
		tableHeading.style.borderBottom = '1px solid #444444';
		tableHeading.style.fontWeight = 'normal';
	});

	//get the idle time for each of the clan members
	let clanMemberTds = dom.nodeListToArray(clanMembersTbl.children[1].children);
	let addClanMember = function(clanMember)
	{
		clanMember = clanMember.firstElementChild.firstElementChild;
		clanMembers.push([clanMember.href.match(/\d+/)[0], clanMember.innerText]);
	};
	clanMemberTds.forEach(function(clanMember)
	{
		addClanMember(clanMember);
	});

	if (DEBUG) log(clanMembers);

	totalClannedMembers += (clanMembers.length - 1);
	readTime(0, clanIds, clanNo);
}

function isIntLike(number, options)
{
	if (!isObject(options))
		options = {};
	if (!isBool(options.retNumber) && (options.retIsNumber == true || !isBool(options.retIsNumber)))
		options.retNumber = false;
	if (!isBool(options.retIsNumber) && options.retNumber == false)
		options.retIsNumber = true;
	else if (options.retNumber && !isBool(options.retIsNumber))
		options.retIsNumber = false;
	//console.log(options);
	if (options.retNumber == options.retIsNumber)
		return 'options.retIsNumber and options.retNumber have to be opposites';

	let isNumber = false;

	if (isInt(number))
		isNumber = true;
	else if (isString(number))
	{
		let _number = parseInt(number);

		if (!isNaN(_number))
		{
			isNumber = true;
			number = _number;
		}
	}

	if (options.retNumber)
		return number;
	else
		return isNumber;
}

function readPlayersOnClanPage(clanIds, clanNo)
{
	if (clanNo === clanIds.length)
		return doneAllClans();

	let clanId = clanIds[clanNo];
	const clanPath = 'https://www.warzone.com/Clans/?ID=';
	const clanPageHref = clanPath + clanId;
	const recallSelf = function(reason)
	{
		log('skipping clan id as it is ' + reason);
		return readPlayersOnClanPage(clanIds, clanNo + 1);
	};

	if (!isNumber(clanId))
		return recallSelf('not number-like');
	if (allClanPageUrls.includes(clanPageHref))
		return recallSelf('a duplicate');

	let _main = function()
	{
		allClanPageUrls.push(clanPageHref);

		setTimeout(function()
		{
			checkIfClanPageFullyLoaded(clanIds, clanNo);
		}, 100);
	};

	if (location.href.match(new RegExp(string.escapeRegExpChars(clanPath) + clanId, 'i')))
	{
		window.clanPage = window;
		_main();
	}
	else
	{
		window.clanPage = open(clanPageHref);
		window.clanPage.onload = function()
		{
			log(window.clanPage);
			createGetIdleTimeButton(window.clanPage);
			_main();
		};
	}
}

function GetIdleTime(event, clanIds, options)
{
	try
	{
		if (isArray(clanIds))
		{
			clanIds.forEach(function(clanId, index)
			{
				clanIds[index] = isIntLike(clanId, {retNumber: true});
			});
		}
		else
		{
			let clanId = isIntLike(clanIds, {retNumber: true});

			if (isNumber(clanId))
				clanIds = [clanId];
			else
				return log('clanIds is not number-like or an array of number-like clan ids');
		}

		GCMIToptions = options;
		doneAllClans = function()
		{
			logEndTime();
			runOption('doneAllClans', allClanPages);
		};

		if (DEBUG) log('GetIdleTime called');
		startTime = new Date().getTime();
		let clanNo = 0;
		readPlayersOnClanPage(clanIds, clanNo);
	}
	catch(err){log(err);}
}

window.GetIdleTime = GetIdleTime;

function createGetIdleTimeButton(_window)
{
	if (!isWindow(_window)) _window = window;
	if (DEBUG) log('init createGetIdleTimeButton');

	const ids = ['getIdleTimeLi', 'getIdleTimeA'];
	let existingElements = [];
	const clanActionsUl = _window.document.getElementsByTagName('ul')[1];
	let _createGetIdleTimeButton = function(i)
	{
		let tagNames = ['li', 'a'];
		let displayTexts = ['', 'Get idle time'];
		let parents = [clanActionsUl, 0];

		//prevents multiple already existing elements to be recreated
		let id = ids[i];
		let parent = parents[i];
		let element = _window.document.getElementById(id);

		if (!element)
		{
			if (isNumber(parent) && parent > -1 && parent < existingElements.length)
			{
				parent = existingElements[parent];
			}
			element = dom.create(tagNames[i], id, displayTexts[i], parent);
		}

		existingElements.push(element);

		if (DEBUG) log(existingElements);

		return existingElements;
	};
	const btns = dom.elementExists(ids, function(i)
	{
		return _createGetIdleTimeButton(i);
	}, function(element, elements)
	{
		return elements;
	}, top);

	const btns1 = btns[1];
	const windowClanId = location.href.match(/\d+/)[0];

	btns1.href = '#';
	btns1.onclick = function(e)
	{
		if (DEBUG) log(windowClanId);

		GetIdleTime(e, windowClanId);
	};
}

function HandelErr(err)
{
	let errStack = err.stack;
	let errorDescription = err.toString();

	if (errStack)
	{
		errorDescription += '\n' + errStack;
	}

	console.warn(errorDescription);
}

function get(url, successCallback, failureCallback)
{
	//doesn't bypass CORS, must use http: or https: protocol
	if (typeof url != 'string') {return;}

	let xhttp = new XMLHttpRequest();//most browsers

	if (!xhttp && ActiveXObject)
	{
		xhttp = new ActiveXObject('Microsoft.XMLHTTP');//below IE 7
	}

	let successCallbackIsFunction = typeof successCallback == 'function';
	let failureCallbackIsFunction = typeof failureCallback == 'function';

	if (!xhttp)
	{
		//no implementation of get requests - use iframe instead
		if (successCallbackIsFunction)
		{
			onloadGet(url, function(iframe)
			{
				successCallback(iframe);
			});
		}
		else
		{
			onloadGet(url);
		}
		return;
	}

	xhttp.onreadystatechange = function()
	{
		if (this.readyState == 4)
		{
			let status = this.status;
			let goodStatuses = [200, 304];//ok, not modified https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

			log('xhttp status = ' + status);

			if (goodStatuses.indexOf(status) > -1)
			{
				if (successCallbackIsFunction) {successCallback(this);}
			}
			else
			{
				log('get status not OK; request = ');
				log(this);

				if (failureCallbackIsFunction) {failureCallback(this);}
			}
		}
	};
	xhttp.open('GET', url, true);
	xhttp.send();
}

function onloadGet(url, callback, options)
{
	//doesn't bypass CORS, must use http: or https: protocol
	if (DEBUG)
	{
		log('onloadGet called');
		log('url = ' + url + '\ncallback =');
		log(callback);
		log(options);
	}
	if (typeof url != 'string' || typeof callback != 'function') {return;}

	let useExistingIframe = true;
	let hideIframe = true;

	if (typeof options == 'object')
	{
		if (options.preventUsingExistingIframe)
			useExistingIframe = false;
		if (options.showIframe)
			hideIframe = false;
	}

	let iframeId = 'onloadGetIframe';
	let iframe;

	if (useExistingIframe)
		iframe = document.getElementById(iframeId);

	if (!iframe)
	{
		iframe = document.createElement('iframe');

		if (useExistingIframe)
			iframe.id = iframeId;

		if (hideIframe)
			iframe.style.display = 'none';

		iframe.style.width = '100%';
		document.body.appendChild(iframe);
	}

	iframe.src = url;
	iframe.onload = function()
	{
		iframe.window = iframe.contentWindow;
		iframe.location = iframe.window.location;
		iframe.style.height = iframe.window.screen.height + 'px';

		if (iframe.window.jQuery)
		{
			iframe.window.jQuery.migrateMute = true;//want my error system, not jQuery - prevents unexpected errors
		}

		window.iframe = iframe;

		iframe.document = iframe.contentDocument || iframe.window.document;
		iframe.responseText = iframe.document.querySelector('html').outerHTML;

		window.iframe = iframe;
		if (DEBUG) log(iframe);
		callback(iframe);

		if (!useExistingIframe) {iframe.remove();}
	};
}

function onloadGetNonReusable(url, callback)
{
	onloadGet(url, callback, {preventUsingExistingIframe: true});
}

function main()
{
	if (DEBUG) log('init main');
	try
	{
		//insert code here...
		onClanPage = onPage('https://www.warzone.com/Clans/?ID=');

		if (onClanPage)
		{
			createGetIdleTimeButton();
		}
	}
	catch(err)
	{
		HandelErr(err);
	}
}

function shouldBlockFrameworkRequests()
{
	if (!location.href.match(/https:\/\/www\.warzone\.com/)) return true;

	let _opener = window.opener;
	let hasDependencies = function(_window){return !!(_window.dom && _window.css && _window.$ && _window.types && _window.download && _window.RunTabelSorter && _window.RunSlides);};

	if (_opener)
	{
		if (hasDependencies(_opener) && location.href.match(/https:\/\/www\.warzone\.com\/Clans\/\?ID=/i))
			return true;
	}
	if (self != top)
		return hasDependencies(top);//for iframes on player profile
	
	return hasDependencies(window);
}

(function()
{
	let blockingFrameworkRequests = shouldBlockFrameworkRequests();
	if (DEBUG)
		log('blockingFrameworkRequests = ' + blockingFrameworkRequests);
	if (blockingFrameworkRequests) return;//prevent readPlayersOnClanPage and other functions from running more than once

	//main init
	get('https://danwlgames.000webhostapp.com/scripts/frameworks/frameworks.min.js', function(xhttp)
	{
		if (!xhttp) {return;}

		let script = document.createElement('script');

		script.innerHTML = xhttp.responseText;//using script src doesn't execute in FF61 but using in-line script does
		document.head.appendChild(script);

		let getHelperFrameworks = function(callback)
		{
			//wait for helper functions to load
			if (DEBUG) console.log('init getHelperFrameworks');
			let capitalise = window.capitalise;
			let escapeRegExpChars = window.escapeRegExpChars;
			dom = window.dom;
			let easyDOMLoaded = dom && escapeRegExpChars && capitalise;
			let getOccurenceOfChar = window.getOccurenceOfChar;
			css = window.css;
			let addCssLoaded = css && getOccurenceOfChar;
			$ = window.$;
			runSlides = window.RunSlides;
			runTabelSorter = window.RunTabelSorter;
			types = window.types;
			download = window.download;

			if (!(easyDOMLoaded && addCssLoaded && $ && runSlides && runTabelSorter && types && download))
			{
				return setTimeout(function(){getHelperFrameworks(callback);}, 500);
			}
			if (DEBUG) log(callback);
			if (typeof callback != 'function') {return;}

			string =
			{
				capitalise: capitalise,
				escapeRegExpChars: escapeRegExpChars,
				getOccurenceOfChar: getOccurenceOfChar
			};
			onPage = function(windowLocation, _window)
			{
				if (typeof windowLocation != 'string')
				{
					throw 'onPage windowLocation not a string; is ' + JSON.stringify(windowLocation);
				}
				if (!(_window instanceof Window))
				{
					_window = window;
				}

				return _window.location.href.match(new RegExp(escapeRegExpChars(windowLocation)));
			};

			types.removePrefix();//types.js exports all in an object called types, this makes everything accessible in the global window object

			callback();
		};

		getHelperFrameworks(main);
	});
})();