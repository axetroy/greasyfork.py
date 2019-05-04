// ==UserScript==
// @name         Vacations
// @namespace    DanWL
// @version      1
// @description  Has ability to override the vacation symbol and revert it. Local image files as well as online files are supported
// @author       https://greasyfork.org/en/users/85040-dan-wl-danwl
// @match        https://www.warzone.com/*
// @grant        none
// ==/UserScript==
const changes = ``;
/*
todo:
Makes it easier to set vacations and
test beginVacation

requests:

*/

function checkIfShouldRun()
{
	return self == top && location.href.match(/https:\/\/www\.warzone\.com\/*/);
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

			console.log('xhttp status = ' + status);

			if (goodStatuses.indexOf(status) > -1)
			{
				if (successCallbackIsFunction) {successCallback(this);}
			}
			else
			{
				console.log('get status not OK; request = ');
				console.log(this);

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
	console.log('onloadGet called');
	console.log('url = ' + url + '\ncallback =');
	console.log(callback);
	console.log(options);
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
		console.log(iframe);
		callback(iframe);

		if (!useExistingIframe) {iframe.remove();}
	};
}

function onloadGetNonReusable(url, callback)
{
	onloadGet(url, callback, {preventUsingExistingIframe: true});
}

let storage =
{
	key: 'wzVactions',
	vacationImgKey: 'vacationImg',
	get: function(item)
	{
		let ls = localStorage.getItem(this.key);

		if (isString(ls))
		{
			ls = JSON.parse(ls);

			if (isString(item))
				ls = ls[item];
		}

		return ls;
	},
	set: function(item, as)
	{
		if (!this.get(this[item]))
		{
			localStorage.setItem(this.key, '{}');
		}
		if (isString(item) && isString(as))
		{	
			let ls = this.get();

			ls[this[item]] = as;
			localStorage.setItem(this.key, JSON.stringify(ls));

			return this.get(this[item]);
		}

		return this.get();
	}
};

function main($, dom, css, string, onPage, types, download)
{
	try
	{
		//insert code here...
		originalVacationSymbol = undefined;
		let overrideVacationSymbol = function()
		{
			let vacationImgKeyValue = storage.get('vacationImg');

			if (location.href.match(/https:\/\/www\.warzone\.com\/MultiPlayer\?GameID=\d+/))
			{
				dom.waitForElementToExist({querySelectorString: '#ujs_VacationIcon_img'}, function(ujs_VacationIcon_img)
				{
					if (!originalVacationSymbol)
						originalVacationSymbol = ujs_VacationIcon_img.style.backgroundImage;

					if (vacationImgKeyValue)
						vacationImgKeyValue = 'url(' + vacationImgKeyValue + ')';
					else
						vacationImgKeyValue = originalVacationSymbol;//makes reverting work instantly instead of requiring refresh

					ujs_VacationIcon_img.setAttribute('alt', vacationImgKeyValue);
					ujs_VacationIcon_img.style.backgroundImage = vacationImgKeyValue;
				});
			}
		};
		let leaveLadders = function(goOnVacationMain)
		{
			//leave all ladders that user competing in
			let ladderSeasonURL = 'https://www.warzone.com/LadderSeason?ID='
			let oneVoneLadderURL = ladderSeasonURL + 0;
			let twoVtwoLadderURL = ladderSeasonURL + 1;
			let threeVthreeLadderURL = ladderSeasonURL + 4;
			let seasonalLadderURL = 'https://www.warzone.com/Ladder?Ladder=Seasonal';
			let rtLadderURL = ladderSeasonURL + 3;
			let ladderLeaveMainURL = 'https://www.warzone.com/LadderLeave?Ladder=';
			let oneVoneLadderLeaveURL = ladderLeaveMainURL + 'OneVersusOne';
			let twoVtwoLadderLeaveURL = ladderLeaveMainURL + 'TwoVersusTwo';
			let threeVthreeLadderLeaveURL = ladderLeaveMainURL + 'ThreeVersusThree';
			let seasonalLadderLeaveURL = ladderLeaveMainURL + 'Seasonal';
			let rtLadderLeaveURL = ladderLeaveMainURL + 'RealTime';
			let leaveLadder = function(ladder, callback)
			{
				onloadGetNonReusable(ladder, function(iframe)
				{
					let ladderDoc = iframe.document;

					if (ladderDoc.querySelector('#LadderJoinBtn'))
						//not in ladder
						if (isFunction(callback))
							return callback();
						else
							return;

					if (ladderDoc.querySelector('#LeaveLadderBtn'))
					{
						let ladderLeaveURL = '';

						if (ladder = oneVoneLadderURL) ladderLeaveURL = oneVoneLadderLeaveURL;
						if (ladder = twoVtwoLadderURL) ladderLeaveURL = twoVtwoLadderLeaveURL;
						if (ladder = threeVthreeLadderURL) ladderLeaveURL = threeVthreeLadderLeaveURL;
						if (ladder = seasonalLadderURL) ladderLeaveURL = seasonalLadderLeaveURL;
						if (ladder = rtLadderURL) ladderLeaveURL = rtLadderLeaveURL;

						onloadGetNonReusable(ladderLeaveURL, function(_iframe)
						{
							_iframe.onload = function()
							{
								_iframe.remove();

								if (isFunction(callback))
									callback();
							};
							_iframe.document.querySelector('#LeaveLadderBtn').click();
						});
					}
					iframe.remove();
				});
			};
			leaveLadder(oneVoneLadderURL, function()
			{
				leaveLadder(twoVtwoLadderURL, function()
				{
					leaveLadder(threeVthreeLadderURL, function()
					{
						leaveLadder(seasonalLadderURL, function()
						{
							leaveLadder(rtLadderURL, function()
							{
								goOnVacationMain();
							});
						});
					});
				})
			})
		};
		let beginVacation = function(numDays)
		{
			if (!(isInt(numDays) && numDays > 0 && numDays < 11))
				return 'numDays must be between 1 and 10';

			alert('Leaving laddders. Click OK to continue.');
			leaveLadders(function()
			{
				//can't go on vacation unless you leave all ladders
				let setVactionURL = 'https://www.warzone.com/ChangeVacationMode';

				onloadGet(setVactionURL, function(iframe)
				{
					let setVactionPageDoc = iframe.document;

					setVactionPageDoc.getElementById('VacDropDown').value = JSON.stringify(numDays);
					setVactionPageDoc.getElementById('FirstBtn').click();//confirm
					alert('You are now on vacation for ' + numDays);
				});
			});
		};
		let createUI = function()
		{
			let createStartVacationBtn = function(item)
			{
				item.innerText = 'Start Vacation';
				item.onclick = function()
				{
					let enteredInvalidDays = true;
					let numDays;
					
					while (enteredInvalidDays)
					{
						numDays = (function(){return prompt('Enter days');})();

						if (isString(numDays))
						{
							numDays = parseInt(numDays);

							if (isInt(numDays) && numDays > 0 && numDays < 11)
								enteredInvalidDays = false;
							else
								alert('You can only go on vacation for between 1 and 10 days');
						}
						else
							return;
					}

					beginVacation(numDays);
				};
			};
			let createReplaceVacationSymbolBtn = function(item)
			{
				item.innerText = 'Replace Vacation Symbol';
				item.onclick = function()
				{
					let enteredInvalidImgUrl = true;
					let imgUrl;
					let isLocalImg;

					while (enteredInvalidImgUrl)
					{
						imgUrl = (function(){return prompt('Enter replacement vacation icon URL/path');})();

						if (isString(imgUrl))
						{
							let isOnlineImg = imgUrl.match(/http(s)*:\/\/(www\.)*/);
							isLocalImg = imgUrl.match(/[a-z]:(\\|\/)(\w|\s)+/i);//c:\something.image or c:\somthing.image

							if ((isOnlineImg || isLocalImg) && imgUrl.match(/\.(jpg|jpeg|jfif|jpe|png|tif|tiff|gif|ico|cur|bmp|dib|svg(z*))/i))
								enteredInvalidImgUrl = false;
							else
								alert('Invalid image URL/path');
						}
						else
							return;
					}

					if (isLocalImg && !imgUrl.match(/file:\/\/\//i))
						imgUrl = 'file:///' + imgUrl.replace(/\\/g, '/');//file protocol is required to display local images and forward slashes are expected instead of backslashes

					storage.set('vacationImgKey', imgUrl);
					overrideVacationSymbol();
				};
			};
			let createUseDefaultVacationSymbolBtn = function(item)
			{
				item.innerText = 'Use Default Vacation Symbol';
				item.onclick = function()
				{
					let carryOn = (function(){return confirm('Are you sure you want to use the default vacations symbol?');})();

					if (!carryOn)
						return;

					storage.set('vacationImgKey', '');
					overrideVacationSymbol();
				};
			};
			let navItemToClone = $('li.nav-item.dropdown a[id = "HelpDropDown"]').parent();
			let clone = navItemToClone.clone();

			clone.hide();//hide while modifying the clone to be relevant to vacations

			let vacationsLable = clone.find('a')[0];
			let subMenu = vacationsLable.nextElementSibling;
			let subMenuItems = dom.nodeListToArray(subMenu.children);

			vacationsLable.innerText = 'Vacations';
			subMenuItems.forEach(function(item, index)
			{
				if (index == 0)
				{
					createReplaceVacationSymbolBtn(item);
				}
				else if (index == 1)
				{
					createUseDefaultVacationSymbolBtn(item);
				}
				else
					return item.remove();

				item.setAttribute('href', '#');
			});
			
			clone.show();
			clone.prependTo(navItemToClone.parent());
		};

		createUI();
		overrideVacationSymbol();
	}
	catch(err)
	{
		HandelErr(err);
	}
}

(function()
{
	if (!checkIfShouldRun())
		return;

	//main init
	get('https://danwlgames.000webhostapp.com/scripts/frameworks/frameworks.js', function(xhttp)
	{
		if (!xhttp) {return;}

		let script = document.createElement('script');

		script.innerHTML = xhttp.responseText;//using script src doesn't execute in FF61 but using in-line script does 
		document.head.appendChild(script);

		let getHelperFrameworks = function(callback)
		{
			//wait for helper functions to load
			console.log('init getHelperFrameworks');
			let capitalise = window.capitalise;
			let escapeRegExpChars = window.escapeRegExpChars;
			let dom = window.dom;
			let easyDOMLoaded = dom && escapeRegExpChars && capitalise;
			let getOccurenceOfChar = window.getOccurenceOfChar;
			let css = window.css;
			let addCssLoaded = css && getOccurenceOfChar;
			let $ = window.$;
			let runSlides = window.RunSlides;
			let runTabelSorter = window.RunTabelSorter;
			let types = window.types;
			let download = window.download;

			if (!(easyDOMLoaded && addCssLoaded && $ && runSlides && runTabelSorter && types && download))
			{
				return setTimeout(function(){getHelperFrameworks(callback);}, 500);
			}
			console.log(callback);
			if (typeof callback != 'function') {return;}

			let string =
			{
				capitalise: capitalise,
				escapeRegExpChars: escapeRegExpChars,
				getOccurenceOfChar: getOccurenceOfChar
			};
			let onPage = function(windowLocation, _window)
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

			callback($, dom, css, string, onPage, types, download);
		};

		getHelperFrameworks(main);
	});
})();