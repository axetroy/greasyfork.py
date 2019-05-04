// ==UserScript==
// @name Clan Forum Downloader
// @namespace DanWL
// @version 1.3.3.1
// @description Allows you to download your clan's forum
// @author https://greasyfork.org/en/users/85040-dan-wl-danwl
// @match https://www.warzone.com/Clans/Forum*
// @match https://www.warzone.com/clans/Forum*
// @match https://www.warzone.com/clans/forum*
// @match https://www.warzone.com/clans/Forum*
// @exclude https://www.warzone.com/Clans/Forum?*
// @exclude https://www.warzone.com/clans/Forum?*
// @exclude https://www.warzone.com/clans/forum?*
// @exclude https://www.warzone.com/Clans/forum?*
// @require https://greasyfork.org/scripts/35370-add-css/code/Add_CSS.js?version=598682
// @require https://greasyfork.org/scripts/39784-easy-dom/code/Easy%20DOM.js?version=265196
// @grant none
// ==/UserScript==
/*
changes:

todo:
fix pager bugs: current page incorrectly highlighted when at least 7 pages
make jump to last page links on threads table?
make search clan forum button
*/

function OnPage(href)
{
	return location.href.match(new RegExp(EscapeRegExpChars(href), 'i'));
}

function ErrorDetected(err)
{
	var ua = navigator.userAgent;

	console.log(err);
	console.log(ua);

	return prompt('Error while downloading clan forum:', err.name + ': ' + err.message + '\nStack:\n' + err.stack + '\n' + ua);
}

(function()
{
	//const might not be supported
	//IE calls ` an invalid char
	try{
		const constStrTest = `a`;
	}catch(err){alert('Your browser is not supported. Use Firefox or Chrome instead.');}
})();

var allData =
{
	subjects: [],
	tempReplyData: [],
	replyData: [],
	clan: undefined
};

function DownloadAllData()
{
	try{
	MakeGetProgress(3, 'Content Rendering', allData.subjects.length, 2);
	document.getElementById('cfd_pause_btn').disabled = true;
	document.getElementById('cfd_Cancel_btn').disabled = true;

	//create download structure
	var content =
	{
		filename: 'Warzone_' + allData.clan.name.replace(/\s/g, '_') + '_clan_forum',
		filetype: 'html',
		contents: '',
		type: 'text/html'
	};

	//render allData in a visually appealing way
	var makeSpacing = function(numSpaces)
	{
		var spacer = '\n\t\t\t\t\t';

		if (!isNumber(numSpaces))
		{
			return spacer;
		}

		var spacesAdded = 0;

		while (spacesAdded < numSpaces)
		{
			spacer += '\t';
			spacesAdded++;
		}

		return spacer;
	};
	var spacers =
	{
		0: makeSpacing(),
		1: makeSpacing(1),
		2: makeSpacing(2),
		3: makeSpacing(3)
	};
	var formNum = 0;
	var generateForm = function(formForLabel, options, baseSpacing)
	{
		if (typeof formForLabel !== 'string' || !Array.isArray(options) || typeof baseSpacing !== 'string')
		{
			return;
		}

		const baseSpacers =
		{
			0: '\n' + baseSpacing,
			1: '\n' + baseSpacing + '\t',
			2: '\n' + baseSpacing + '\t\t'
		};
		const formName = formForLabel.replace(/[^a-z0-9]/ig, '');
		var makeOptions = function()
		{
			var allOptionsStr = '';

			options.forEach(function(option)
			{
				allOptionsStr += baseSpacers[2] + '<option value = "' + option + '">' + option + '</option>';
			});

			return allOptionsStr;
		}

		var form = baseSpacers[0] + '<form id = "' + formName + '" name = "' + formName + 'Form">' + baseSpacers[1] + '<label for = "' + formName + '">' + formForLabel + ':</label>' + baseSpacers[1] + '<select id = "' + formName + '" name = "' + formName + `" onchange = "FormSubmitted(` + formNum + `);">` + makeOptions() + baseSpacers[1] + '</select>' + baseSpacers[0] + '</form>';

		formNum++;
		return form;
	};
	var generatePager = function(pagerFor, subjectOrPostLength, baseSpacing)
	{
		if (['Threads', 'Posts'].indexOf(pagerFor) === -1 || !isNumber(subjectOrPostLength) || typeof baseSpacing !== 'string')
		{
			return;
		}

		const baseSpacers =
		{
			0: '\n' + baseSpacing,
			1: '\n' + baseSpacing + '\t',
			2: '\n' + baseSpacing + '\t\t',
			3: '\n' + baseSpacing + '\t\t\t',
			4: '\n' + baseSpacing + '\t\t\t\t'
		};

		var pager = baseSpacers[0] + '<table cellspacing = "4" cellpadding = "0" border = "0">' + baseSpacers[1] + '<tbody>' + baseSpacers[2] + '<tr align = "right">' + baseSpacers[3] + '<td>' + baseSpacers[4] + '<span>' + pagerFor + ' <span id = "currentPageRange">1 - ' + subjectOrPostLength + '</span> of ' + '<span id = "numPostsSubjects">' + subjectOrPostLength + '</span></span>' + baseSpacers[4] + '<div class = "pageList"></div>' + baseSpacers[3] + '</td>' + baseSpacers[2] + '</tr>' + baseSpacers[1] + '</tbody>' + baseSpacers[0] + '</table>';

		return pager;
	};
	var renderAllThreadsTableBodyContent = function()
	{
		var allRenderedThreadContent = '';

		//get the subject, first and last replies, num of posts and d+t of last post
		allData.subjects.forEach(function(subject, index)
		{
			var relativeResponceData = allData.replyData[index];

			if (!relativeResponceData)
			{
				//canceled before getting all reply data
				relativeResponceData = [[{img: '', name: '?', num: '?', level: '?', clan: undefined, isMember: false}, '', '']];
			}

			var lastResponce = relativeResponceData[relativeResponceData.length - 1];

			allRenderedThreadContent += spacers[0] + '<tr>' + spacers[1] + '<td valign = "middle">' + spacers[2] + `<a onclick = "ShowHideItem(` + index + `, 'show');">` + subject.text + '</a>' + spacers[2] + '<br>' + spacers[2] + '<font class = "text-muted"> by ' + relativeResponceData[0][0].name + '</font>' + spacers[1] + '</td>' + spacers[1] + '<td style = "text-align: center" nowrap = "nowrap">' + relativeResponceData.length + '</td>' + spacers[1] + '<td>' + spacers[2] + lastResponce[2] + spacers[2] + '<br>' + spacers[2] + '<span class = "text-muted">by ' + lastResponce[0].name + '</span>' + spacers[1] + '</td>' + spacers[0] + '</tr>';
			MakeGetProgress(3).increaseProgress(1).increaseMax(relativeResponceData.length);
		});

		return allRenderedThreadContent;
	};
	var renderAllThreadContent = function()
	{
		var allRenderedThreadContent = '';

		allData.subjects.forEach(function(subject, itemNo)
		{
			allRenderedThreadContent += `
			<div class = "AutoContainer">
				<div>
					<a onclick = "ShowHideItem(` + itemNo + `, 'hide');"><< Back to Clan Forum</a>&nbsp;|&nbsp;<a href = "https://www.warzone.com/Discussion/?ID=` + subject.id + `" target = "_blank">View original</a>&nbsp;|` + generateForm('Posts per page', ['All', 20, 50, 100, 200, 500], '					') + `
				</div>
				<br>`;

			var relativeResponceData = allData.replyData[itemNo];

			if (!relativeResponceData)
			{
				//canceled before getting all reply data
				relativeResponceData = [[{img: '', name: '?', num: '?', level: '?', clan: undefined, isMember: false}, '', '']];
			}

			relativeResponceData.forEach(function(responceData, index)
			{
				var player = responceData[0];
				var playerImg = player.img;
				var playerImgRendered = '';

				if (playerImg !== '')
				{
					playerImgRendered = `
								<img src = "https://s3.amazonaws.com/data.warlight.net/Data/Players/` + playerImg + `">
								<br>
								&nbsp`;
				}

				var clanImgRendered = '';
				var clanImg = player.clan;

				if (clanImg)
				{
					clanImgRendered = `
								<a href = "https://www.warzone.com/Clans/?ID=` + clanImg.id + `" title = "` + clanImg.name + `" target = "_blank">
									<img src = "https://s3.amazonaws.com/data.warlight.net/Data/Clans/` + clanImg.src + `">
								</a>`;
				}

				var memberIconRendered = '';

				if (player.isMember)
				{
					memberIconRendered = `
								<img src = "https://d2wcw7vp66n8b3.cloudfront.net/Images/SmallMemberIcon.png" title="Warzone Member">`
				}

				allRenderedThreadContent += `
				<table id = "PostTbl_` + index + `" class = "region" cellspacing = "0">
					<thead>
						<tr>
							<th colspan = "2">` + subject.text + ': ' + responceData[2] + `</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<br>` + playerImgRendered + clanImgRendered + `
								<a href = "https://www.warzone.com/Profile?p=` + player.num + `" target = "_blank">` + player.name + `
								</a>` + memberIconRendered + `
								<br>
								Level&nbsp;` + player.level + `
								<br>
							</td>
							<td>
								<div>` + responceData[1] + `</div>
							</td>
						</tr>
					</tbody>
				</table>`;
				MakeGetProgress(3).increaseProgress(1);
			});

			allRenderedThreadContent += generatePager('Posts', relativeResponceData.length, '				') + `
			</div>`;
		});

		return allRenderedThreadContent;
	};

	var renderedContent = `<!DOCTYPE HTML>
<html lang = "en-us">
	<head>
		<meta charset = "utf-8">
		<title>` + allData.clan.name + ` Clan Forum (Downloaded)</title>
		<link rel = "icon" href = "https://warzone.com/favicon.ico">
		<meta name = "viewport" content = "width=device-width, initial-scale=1">
		<style>
			*, ::after, ::before
			{
				box-sizing: inherit;
			}
			html
			{
				-webkit-text-size-adjust: 100%;
			}
			body
			{
				color: #c7c7c7;
				font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
				font-size: 1em;
			}
			.background
			{
				background-image: linear-gradient(-10deg, #33333322 0%, transparent 70%), url("https://d2wcw7vp66n8b3.cloudfront.net/Images/Warzone/Background2.jpg");
				background-repeat: no-repeat, repeat;
				background-size: 100% 100%, 10px 15px;
				background-color: #0f0802;
			}
			a
			{
				color: #5a9da5;
				text-decoration: none;
				cursor: pointer;
			}
			a:hover, a:focus, a:active
			{
				color: #0056b3;
				text-decoration: underline;
			}
			[role="button"], a, area, button, input, label, select, summary, textarea
			{
				-ms-touch-action: manipulation;
				touch-action: manipulation;
			}
			h1, h2, h3, h4, h5, h6, p
			{
				margin: 0 0 10px 0;
			}
			h1, h2, h3, h4, h5, h6
			{
				font-weight: 500;
				line-height: 1.1;
			}
			h1
			{
				font-size: 2.5em;
			}
			.AutoContainer
			{
				background-color: #151414;
				border: 1px solid #4e4e4e;
				margin: 1em;
				padding: 1.5em;
			}
			table
			{
				width: 100%;
			}
			table[id ^= "PostTbl_"]
			{
				padding-bottom: 15px;
			}
			th
			{
				text-align: center;
			}
			table[id ^= "PostTbl_"] th
			{
				text-align: right;
			}
			table[id ^= "PostTbl_"] tbody td:first-child
			{
				min-width: 90px;
				max-width: 110px;
				width: 110px;
				word-wrap: break-word;
				vertical-align:top;
				text-align: center;
			}
			table[id ^= "PostTbl_"] tbody td:nth-child(2n) div
			{
				display: block;
				width: 100%;
				overflow: auto;
			}
			.region
			{
				border: 1px solid #666;
				border-radius: 8px;
				border-collapse: separate;
				background-color: #131313;
				margin-bottom: 4px;
			}
			.region th
			{
				padding: 5px;
				background-image: url('https://d2wcw7vp66n8b3.cloudfront.net/Images/RegionGradient.png');
				background-color: #1d0f04;
			}
			.region td
			{
				padding: 3px;
			}
			.text-muted
			{
				color: #6b6b6a;
			}
			#allThreadsTable td:nth-child(3n)
			{
				padding-right: 15px;
				font-size: 11px;
				text-align: right;
			}
			code, kbd, pre, samp
			{
				font-family: Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
			}
			pre
			{
				display: block;
				margin-top: 0;
				margin-bottom: 1em;
				font-size: 90%;
				overflow: auto;
				color: #c7c7c7;
			}
			b, strong
			{
				font-weight: bolder;
			}
			dl, ol, ul
			{
				margin-top: 0;
				margin-bottom: 1em;
			}
			hr
			{
				margin-top: 1em;
				margin-bottom: 1em;
				border: 0;
				border-top: 1px solid white;
			}
			blockquote
			{
				margin: 0;
				padding-left: 30px;
			}

			#overlay, #allThreadsContainer .AutoContainer
			{
				display: none;
				position: fixed;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				height: 100%;
			}
			#overlay
			{
				z-index: 1;
				width: 100%;
			}
			#allThreadsContainer .AutoContainer
			{
				z-index: 2;
				overflow: auto;
				height: unset;
			}
			.date
			{
				color: #5a9da5;
			}
			form, .pageList
			{
				display: inline;
			}
			.hidden
			{
				display: none;
			}
		</style>
		<script>
			function isNumber(number)
			{
				return (isFinite(number) && typeof number === 'number');
			}
			function roundUp(number)
			{
				if (!isNumber(number))
				{
					return;
				}

				return Math.ceil(number);
			}
			function GetActiveAutoContainerNo()
			{
				var activeAutocontainerNo = 0;
				const autoContainers = document.getElementsByClassName('AutoContainer');
				var autoContainer;
				var autoContainersArray = [];

				for (var i = 0; i < autoContainers.length; i++)
				{
					autoContainer = autoContainers[i];
					autoContainersArray.push(autoContainers[i]);

					if (i > 0 && autoContainer.style.display === 'block')
					{
						activeAutocontainerNo = i;
					}
				}

				return [activeAutocontainerNo, autoContainersArray];
			}
			function Resize()
			{
				const activeAutocontainer = GetActiveAutoContainerNo();
				const activeAutocontainerNo = activeAutocontainer[0];
				const autoContainersArray = activeAutocontainer[1];

				if (!isNumber(activeAutocontainerNo))
				{
					return;
				}

				const regions = document.getElementsByClassName('region');
				var region;
				var postTables = [];
				var postTable;
				var postDiv;
				var postDivWidth = window.innerWidth + 'px - (20px + 2px + 2em + 3em + 2px + 6px + 6px + ';

				for (var regionNo = 0; regionNo < regions.length; regionNo++)
				{
					region = regions[regionNo];

					if (region.id.match('PostTbl_'))
					{
						region.parentNo = autoContainersArray.indexOf(region.parentNode);
						postTables.push(region);
					}
				}
				for (var postTableNo = 0; postTableNo < postTables.length; postTableNo++)
				{
					postTable = postTables[postTableNo];

					if (postTable.parentNo === activeAutocontainerNo)
					{
						postDiv = postTable.children[1].firstElementChild.children[1].firstElementChild;
						postDiv.style.width = 'calc(' + postDivWidth + postDiv.parentNode.previousElementSibling.clientWidth + 'px))';
					}
				}
			}
			function ShowHideItem(itemNo, mode)
			{
				const modes = ['show', 'hide'];

				if (!isNumber(itemNo) || modes.indexOf(mode) === -1)
				{
					return;
				}

				const show = mode === 'show';
				const threadList = document.getElementsByClassName('AutoContainer')[0];
				const itemToShowHide = document.getElementById('allThreadsContainer').children[itemNo];
				const overlay = document.getElementById('overlay');

				if (!threadList || !itemToShowHide || !overlay)
				{
					return;
				}

				if (show)
				{
					threadList.style.display = 'none';
					overlay.style.display = 'block';
					itemToShowHide.style.display = 'block';
					Resize();
				}
				else
				{
					itemToShowHide.style.display = 'none';
					overlay.style.display = 'none';
					threadList.style.display = 'block';
				}

				return true;
			}
			var pagerSettings =
			{
				allThreads: 'All',
				thread: 'All'
			};
			function viewPagerPage(pageNum)
			{
				const container = document.getElementsByClassName('AutoContainer')[GetActiveAutoContainerNo()[0]];

				if (!(container instanceof Node))
				{
					return;
				}

				const currentPageRange = container.querySelectorAll('#currentPageRange')[0];
				const numPostsSubjects = container.querySelectorAll('#numPostsSubjects')[0];
				const pageList = container.querySelectorAll('.pageList')[0];

				if (!currentPageRange || !numPostsSubjects || !pageList)
				{
					return;
				}

				var validPageNumbers = [];
				const pageNumbers = pageList.children;
				var pageNumber;

				for (var pgNum = 0; pgNum < pageNumbers.length; pgNum++)
				{
					pageNumber = pageNumbers[pgNum];

					if (pageNumber)
					{
						validPageNumbers.push(parseInt(pageNumber.innerText));
					}
				}

				if (!Array.isArray(validPageNumbers) || validPageNumbers.length === 0)
				{
					validPageNumbers.push(1);
				}

				if (validPageNumbers.indexOf(pageNum) === -1)
				{
					return;
				}

				const isUsingAllThreadsPager = container.parentNode === document.body;
				var postsOrThreads;
				const numPostsSubjectsInt = parseInt(numPostsSubjects.innerText);
				var pagerSetting;

				if (isUsingAllThreadsPager)
				{
					pagerSetting = pagerSettings.allThreads;
					postsOrThreads = document.getElementById('allThreadsTable').querySelectorAll('tbody tr');
				}
				else
				{
					pagerSetting = pagerSettings.thread;
					postsOrThreads = container.querySelectorAll("table[id ^= 'PostTbl_']");
				}

				var pageBtnLabels = [];
				var pageBtnCounter = 0;
				var lastPageNo = roundUp(numPostsSubjectsInt / pagerSetting);

				if (pageNum > lastPageNo)
				{
					pageNum = lastPageNo;
				}

				if (lastPageNo < 7)
				{
					while (pageBtnCounter < lastPageNo)
					{
						pageBtnLabels.push(pageBtnCounter + 1);
						pageBtnCounter++;
					}
				}
				else
				{
					pageBtnLabels.push(1, roundUp((lastPageNo - pageNum) / 2), pageNum - 1, pageNum, pageNum + 1, roundUp(lastPageNo - pageNum * 2), lastPageNo);

					//remove duplicates and below 1 and above max then sort lowest to highest
					pageBtnLabels = pageBtnLabels.filter(function(item, pos)
					{
						return pageBtnLabels.indexOf(item) == pos && item > 0 && item < lastPageNo + 1;
					}).sort(function(a, b)
					{
						return a - b;}
					);
				}

				//create pages
				var allPagerObjects = [];
				var createPage = function(btnLableNum)
				{
					if (!(btnLableNum < pageBtnLabels.length))
					{
						return;
					}

					var currentPage = btnLableNum + 1;
					var pagerBtn = document.createElement('a');
					var pageBtnLabel = pageBtnLabels[btnLableNum];
					var nextPageBtnLabel = pageBtnLabels[btnLableNum + 1];
					var pagerGap = undefined;

					pagerBtn.innerText = pageBtnLabel;

					if (currentPage === pageNum)
					{
						pagerBtn.style.color = '#c7c7c7';
						pagerBtn.style.textDecoration = 'none';
						pagerBtn.style.cursor = 'default';
					}
					else
					{
						pagerBtn.onclick = function(){return viewPagerPage(currentPage);};
					}

					if (isNumber(nextPageBtnLabel))
					{
						if (pageBtnLabel < nextPageBtnLabel - 1)
						{
							pagerGap = document.createTextNode('...');
						}
					}

					allPagerObjects.push(pagerBtn);

					if (pagerGap)
					{
						allPagerObjects.push(pagerGap);
					}

					createPage(btnLableNum + 1);
				};

				createPage(0);

				if (pageNum > 1)
				{
					var prevBtn = document.createElement('a');

					prevBtn.innerHTML = '&lt;&lt; Prev';
					prevBtn.onclick = function(){return viewPagerPage(pageNum - 1);};
					allPagerObjects.splice(0, 0, prevBtn);
				}
				if (pageNum < lastPageNo)
				{
					var nextBtn = document.createElement('a');

					nextBtn.innerHTML = 'Next &gt;&gt;'
					nextBtn.onclick = function(){return viewPagerPage(pageNum + 1);};
					allPagerObjects.push(nextBtn);
				}

				//fix the labels
				var newTopRangePostThread = pageNum * pagerSetting;

				if (pageNum === lastPageNo)
				{
					newTopRangePostThread = numPostsSubjectsInt;
				}

				const newBottomRangePostThread = (pageNum * pagerSetting) - (pagerSetting - 1);

				currentPageRange.innerText = newBottomRangePostThread + ' - ' + newTopRangePostThread;
				pageList.innerHTML = '';
				allPagerObjects.forEach(function(pagerObject)
				{
					pageList.appendChild(pagerObject);
				});
				//show only the range of posts/threads
				postsOrThreads.forEach(function(postOrThread, index)
				{
					if (index >= (newBottomRangePostThread - 1) && index <= (newTopRangePostThread - 1))
					{
						postOrThread.className = postOrThread.className.replace(' hidden', '');
					}
					else if (!postOrThread.className.match(' hidden'))
					{
						postOrThread.className += ' hidden';
					}
				});

				return true;
			}
			function ModifyPager()
			{
				const container = document.getElementsByClassName('AutoContainer')[GetActiveAutoContainerNo()[0]];

				if (!(container instanceof Node))
				{
					return;
				}

				const currentPageRange = container.querySelectorAll('#currentPageRange')[0];
				const numPostsSubjects = container.querySelectorAll('#numPostsSubjects')[0];
				const pageList = container.querySelectorAll('.pageList')[0];

				if (!currentPageRange || !numPostsSubjects || !pageList)
				{
					return;
				}

				var pagerSetting;
				var isModifyingAllThreadsPager = container.parentNode === document.body;

				isModifyingAllThreadsPager ? pagerSetting = pagerSettings.allThreads : pagerSetting = pagerSettings.thread;

				if (!(pagerSetting === 'All' || isNumber(pagerSetting)))
				{
					return;
				}

				const numPostsSubjectsInt = parseInt(numPostsSubjects.innerText);
				var postsOrThreads;

				if (isModifyingAllThreadsPager)
				{
					postsOrThreads = document.getElementById('allThreadsTable').querySelectorAll('tbody tr');
				}
				else
				{
					postsOrThreads = container.querySelectorAll("table[id ^= 'PostTbl_']");
				}

				if (pagerSetting === 'All')
				{
					//show all
					pageList.innerHTML = '';
					currentPageRange.innerText = '1 - ' + numPostsSubjectsInt;
					postsOrThreads.forEach(function(postOrThread)
					{
						postOrThread.className = postOrThread.className.replace('hidden', '');
					});
					return true;
				}

				var oldPageRangeStr = currentPageRange.innerText;
				var oldPageRangeRanges = oldPageRangeStr.split(' - ');
				var oldBottomRangePostThread = parseInt(oldPageRangeRanges[0]);
				var oldTopRangePostThread = parseInt(oldPageRangeRanges[1]);
				var oldPagerSetting = oldTopRangePostThread - oldBottomRangePostThread + 1;
				var currentPage = roundUp(oldBottomRangePostThread / pagerSetting);

				return viewPagerPage(currentPage);
			}
			function FormSubmitted(formnum)
			{
				if (!isNumber(formnum))
				{
					return
				}

				const form = document.forms[formnum];

				if (!(form instanceof Node))
				{
					return;
				}

				const formSelect = form.querySelectorAll('select')[0];

				if (!(formSelect instanceof Node))
				{
					return;
				}

				var formSelectVal = formSelect.value;

				if (formSelectVal !== 'All')
				{
					formSelectVal = parseInt(formSelectVal);
				}
	
				if (formnum === 0)
				{
					pagerSettings.allThreads = formSelectVal;
				}
				else
				{
					pagerSettings.thread = formSelectVal;
				}

				ModifyPager();
			}

			window.onresize = function()
			{
				Resize();
			};
			window.onkeyup = function(e)
			{
				const key = e.which || e.keyCode;
				const activeAutocontainerNo = GetActiveAutoContainerNo()[0];

				if (key === 27 && isNumber(activeAutocontainerNo))
				{
					return ShowHideItem(activeAutocontainerNo - 1, 'hide');
				}

				return false;
			};
		</script>
	</head>
	<body class = "background">
		<div class = "AutoContainer">
			<a href = "https://www.warzone.com/Clans/?ID=` + allData.clan.id + `" target = "_blank">` + allData.clan.name + `> clan forum</a>&nbsp;|&nbsp;<i class = "date">@` + new Date().toLocaleString() + `</i>&nbsp;|&nbsp;<a href = "` + location.href + `" target = "_blank">View original</a>&nbsp;|` + generateForm('Threads per page', ['All', 20, 50, 100, 200, 500], '			') + `
			<br>
			<br>
			<table id = "allThreadsTable" class = "region" cellspacing = "0">
				<thead>
					<tr>
						<th>Thread</th>
						<th>Posts</th>
						<th>Last Post</th>
					</tr>
				</thead>
				<tbody>` + renderAllThreadsTableBodyContent() + `
				</tbody>
			</table>` + generatePager('Threads', allData.subjects.length, '			') + `
		</div>
		<div id = "overlay" class = "background"></div>
		<div id = "allThreadsContainer">` + renderAllThreadContent() + `
		</div>
	</body>
</html>`;

	content.contents = renderedContent;

	//do the actual download
	var mime_type;

	if (content.type)
	{
		mime_type = content.type;
	}
	else
	{
		mime_type || 'text/html';
	}

	var blob = new Blob([content.contents], {type: mime_type});
	var downloadLink = create('a');

	downloadLink.download = content.filename + '.' + content.filetype;
	downloadLink.href = window.URL.createObjectURL(blob);
	downloadLink.onclick = function(e)
	{
		var that = this;

		setTimeout(function()
		{
			window.URL.revokeObjectURL(that.href);
		}, 1500);
	};

	downloadLink.click();
	downloadLink.remove();
	document.getElementById('downloadClanForumBtn').disabled = false;

	return content;
	}catch(err){ErrorDetected(err);}
}

localStorage.clanForumDownloader = "{\"threadOffset\":0,\"allThreadsOffset\":0,\"allThreads\":\"[]\",\"canRun\":true,\"state\":0}";
function GetCFD()
{
	return JSON.parse(localStorage.clanForumDownloader);
}
function GetThreadOffset()
{
	return GetCFD().threadOffset;
}
function GetAllThreadsOffset()
{
	return GetCFD().allThreadsOffset;
}
function GetAllThreads()
{
	return GetCFD().allThreads;
}
function GetCanRun()
{
	return GetCFD().canRun;
}
function GetState()
{
	return GetCFD().state;
}

var resumeFunction = function(){return;};
var makeRequestFunction = function(){return;};

function Cancel()
{
	const CancelBtn = document.getElementById('cfd_Cancel_btn');

	CancelBtn.disabled = true;
	document.getElementById('cfd_pause_btn').disabled = true;
	ModifyCanRun(false);
	ModifyState('"Cancel"')
	CancelBtn.value = 'Canceling...';
}
function CancelMain()
{
	var downloadThreads = function()
	{
		return confirm('Canceled. Do you want to download the data that has been gathered?');
	};
	var canDownloadThreads = downloadThreads();

	if (canDownloadThreads)
	{
		return DownloadAllData();
	}

	document.getElementById('downloadClanForumBtn').disabled = false;

	return downloadThreads;
}
function PauseOrResume()
{
	const pauseBtn = document.getElementById('cfd_pause_btn');

	if (pauseBtn.value === 'Pause')
	{
		pauseBtn.disabled = true;
		ModifyCanRun(false);
		ModifyState('"pause"');
		pauseBtn.value = 'Pausing...';
	}
	else
	{
		pauseBtn.value = 'Resuming...';
		ModifyCanRun(true)
		ModifyState(0);
		resumeFunction();
		pauseBtn.value = 'Pause';
	}
}
function Stop()
{
	const state = GetState();
	const states = [0, 'pause', 'Cancel'];

	if (states.indexOf(state) === -1 || !state)
	{
		return;
	}

	const btn = document.getElementById('cfd_' + state + '_btn');

	if (state === 'Cancel')
	{
		btn.value = capitalise(state) + 'ed';

		return CancelMain();
	}
	else if (state === 'pause')
	{
		btn.value = 'Resume';
		btn.disabled = false;
	}
}
function doesConnectionExist()
{
	//from https://www.kirupa.com/html5/check_if_internet_connection_exists_in_javascript.htm
	//checks if device is connected to the internet before trying to gather required data - if not connected, the download is paused
	//navigator.onLine lies

	var xhr = new XMLHttpRequest();

	if (!xhr)
	{
		Cancel();
		Stop();
		return alert('Your browser is not supported. Use Firefox or Chrome instead.');
	}

	var file = "https://www.warzone.com/clans/forum";

	xhr.open('GET', file, true);
	xhr.send();
	 
	xhr.addEventListener("readystatechange", processRequest, false);
 
	function processRequest(e)
	{
		if (xhr.readyState == 4)
		{
			if (xhr.status === 200)
			{
				//connection worked - carry on
				console.log('connection worked');
				makeRequestFunction();
			}
			else
			{
				//connection failed - pause
				console.log('connection failed... pausing');
				PauseOrResume();
				Stop();
			}
		}
	}
}

function ModifyStorageData(newVal, mode)
{
	try{
	const modes = ['threadOffset', 'allThreadsOffset', 'allThreads', 'canRun', 'state'];
	const $ = window.$;

	if (modes.indexOf(mode) === -1 || !$)
	{
		return;
	}

	var makejQueryListArray = function(jQueryListObject)
	{
		var list = [];

		$(jQueryListObject).each(function()
		{
			list.push(this);
		});

		console.log('makejQueryListArray list:');
		console.log(list);
		return list;
	};
	var makejQueryListString = function(jQueryListObject)
	{
		//JSON.stringify doesn't always correctly remember the items in the array
		var list = makejQueryListArray(jQueryListObject);

		list.forEach(function(item, index)
		{
			list[index] = '"' + item + '"';
		});

		list = '[' + list.toString() + ']';

		console.log('makejQueryListString list:');
		console.log(list);
		return list;
	};
	var oldVal;

	if (mode === modes[0])
	{
		oldVal = GetThreadOffset();
	}
	else if (mode === modes[1])
	{
		oldVal = GetAllThreadsOffset();
	}
	else if (mode === modes[2])
	{
		//make it possible to parse the list - directly adding the list to storage doesn't work in Edge cause it's a bit Edgy
		console.log('modifiying allThreads data');
		oldVal = GetAllThreads();
		newVal = makejQueryListArray(newVal);
	}
	else if (mode === modes[3])
	{
		oldVal = GetCanRun();
	}
	else if (mode === modes[4])
	{
		oldVal = GetState();
	}

	var oldValStr = oldVal;
	var newValStr = newVal;

	if (mode === modes[2])
	{
		if (Array.isArray(oldVal))
		{
			newVal = $.merge($.merge([], oldVal), newVal);
		}

		oldValStr = JSON.stringify(oldVal);
		newValStr = makejQueryListString(newVal);
	}

	console.log('newVal = ' + newVal + '\nnewValStr = ' + newValStr + '\noldVal ' + oldVal + '\noldValStr = ' + oldValStr);
	localStorage.clanForumDownloader = localStorage.clanForumDownloader.replace('"' + mode + '":' + oldValStr, '"' + mode + '":' + newValStr);

	return GetCFD();
	}catch(err){ErrorDetected(err);}
}
function ModifyThreadOffset(newVal)
{
	return ModifyStorageData(newVal, 'threadOffset');
}
function ModifyAllThreadsOffset(newVal)
{
	return ModifyStorageData(newVal, 'allThreadsOffset');
}
function ModifyAllThreads(newListToJoin)
{
	MakeGetProgress(1).increaseProgress(newListToJoin.length);
	return ModifyStorageData(newListToJoin, 'allThreads');
}
function ModifyCanRun(newVal)
{
	return ModifyStorageData(newVal, 'canRun');
}
function ModifyState(newVal)
{
	return ModifyStorageData(newVal, 'state');
}

function MakeGetProgress(id, label, max, adjacentElementId)
{
	if (!isNumber(id))
	{
		return;
	}

	if (isNumber(adjacentElementId))
	{
		adjacentElementId = 'cfd_progress_bar' + (id - 1);
	}
	else if (typeof adjacentElementId !== 'string')
	{
		adjacentElementId = 'downloadClanForumBtn';
	}

	var adjacentElement = document.getElementById(adjacentElementId);

	if (!adjacentElement)
	{
		//init when canceling/pausing download
		adjacentElement = create('span', adjacentElementId);
		adjacentElement.style.display = 'none';
	}

	id = 'cfd_progress_bar' + id;

	return elementExists(id, function()
	{
		var progressBar = create('span', id, '&nbsp;' + label + ':&nbsp;<span>0</span>/<span>' + max + '</span>&nbsp;<span>0</span>%.', adjacentElement, 'afterend');

		progressBar.currentFrac = function()
		{
			return parseInt(progressBar.firstElementChild.innerText);
		};
		progressBar.max = max;
		progressBar.modifyPercent = function()
		{
			progressBar.children[2].innerText = parseFloat(Number(progressBar.currentFrac() / progressBar.max).toPrecision(4)) * 100;

			return progressBar;
		};
		progressBar.increaseProgress = function(increasedProgress)
		{
			if (!isNumber(increasedProgress))
			{
				return;
			}

			progressBar.firstElementChild.innerText = progressBar.currentFrac() + increasedProgress;
			progressBar.modifyPercent();

			return progressBar;
		};
		progressBar.increaseMax = function(increment)
		{
			if (!isNumber(increment))
			{
				return;
			}

			progressBar.max += increment;
			progressBar.children[1].innerText = progressBar.max;
			progressBar.modifyPercent();

			return progressBar;
		};

		return progressBar;
	});
}

window.iframeLoaded = false;
var timeoutId;

function IframeNotLoaded()
{
	if (!window.iframeLoaded)
	{
		console.log('connection terminated after 30 secs');
		PauseOrResume();
		Stop();
	}
}
window.IframeNotLoaded = IframeNotLoaded;
function SetLoadTimeout()
{
	return setTimeout(function(){IframeNotLoaded();}, 30000);
}
function ClearLoadTimeout()
{
	if (timeoutId)
	{
		clearTimeout(timeoutId);
		timeoutId = undefined;
	}
}

function OpenInBackground(src)
{
	var id = 'cfd_iframe';

	window.iframeLoaded = false;

	return elementExists(id, function()
	{
		var iframe = create('iframe', id);

		iframe.style.display = 'none';
		iframe.src = src;
		iframe.AboutNetErrorOptions = function()
		{
			//blank the document
		};

		return iframe;
	}, function(element)
	{
		element.src = src;

		return element;
	});
}

function GetWindow(page)
{
	//Chrome, unlike FF and Edge, says _window instanceof Window is false
	if (!page)
	{
		return;
	}
	if (page instanceof Window)
	{
		return page;
	}

	return page.contentWindow;
}

function GetAllPageThreads(page)
{
	const _window = GetWindow(page);

	if (!_window)
	{
		return;
	}

	const $ = _window.$;

	if (typeof $ !== 'function')
	{
		return;
	}

	return $('.region a').filter(":not([href *= '?Offset'])");
}

function OpenThread(threadNumber)
{
	try{
	if (!isNumber(threadNumber))
	{
		threadNumber = 0;
	}

	const threadOffset = GetThreadOffset();

	console.log('threadNumber = ' + threadNumber + '\noffset = ' + threadOffset);

	var threadLink = GetAllThreads()[threadNumber];

	if (threadLink)
	{
		if (isNumber(threadOffset) && threadOffset > 0)
		{
			threadLink += '?Offset=' + (threadOffset * 30);
			console.log('threadLink = ' + threadLink);
		}

		return OpenInBackground(threadLink);
	}
	}catch(err){ErrorDetected(err);}
}

function ReadThread(thread, threadNumber)
{
	try{
	const allThreads = GetAllThreads();

	if (!isNumber(threadNumber))
	{
		threadNumber = 0;
	}

	resumeFunction = function()
	{
		return ReadThread(thread, threadNumber);
	};

	if (!GetCanRun())
	{
		return Stop();
	}

	const threadWindow = GetWindow(thread);
	const $ = threadWindow.$;
	const subject =
	{
		text: $($('#PostTbl_0 font')[0]).text(),//only get the subject - edited date would be included otherwise
		id: threadWindow.location.href.match(/\d+/)[0]
	};
	var repliesData = [];
	var responces = $("[id ^= 'PostTbl_']").filter("[id != 'PostTbl_-1']");
	var renderIcon = function(img)
	{
		const imgSrcMatchClanIcon = 'https://s3.amazonaws.com/data.warlight.net/Data/Clans/';

		if (!img.src.match(imgSrcMatchClanIcon))
		{
			return;
		}

		var clanLink = img.parentNode;
		var clan =
		{
			name: clanLink.title,
			src: img.src.replace(imgSrcMatchClanIcon, ''),
			id: clanLink.href.match(/\d+/)[0]
		};

		return clan;
	};

	responces.each(function()
	{
		const responceImgs = $(this).find("tr[style = \"height: 100px\"] td:first-child img").filter(":not([id ^= 'Vote']):not([src $= 'LoadingGif.gif'])");
		var playerImg = {src: ''};//not all players have profile pic or are still part of the clan - corrected when needed
		var clan;
		var srcMatchPlayersStr = 'https://s3.amazonaws.com/data.warlight.net/Data/Players/';
		var playerLink = $(this).find("a[href ^= '/Profile?p=']")[0];
		var isMember = false;
		var level = $(playerLink.nextElementSibling.nextSibling).text().match(/\d+/);

		if (level)
		{
			level = level[0];
		}
		else
		{
			isMember = true;
			level = $(playerLink.nextElementSibling.nextElementSibling.nextSibling).text().match(/\d+/)[0];
		}

		if (responceImgs.length === 3)
		{
			clan = allData.clan;
			playerImg = responceImgs[0];
		}
		else if (responceImgs.length === 2)
		{
			if (responceImgs[0].src.match(srcMatchPlayersStr))
			{
				playerImg = responceImgs[0];
				clan = renderIcon(responceImgs[1]);
			}
			else
			{
				clan = renderIcon(responceImgs[0]);
			}
		}

		var playerImgSrc = playerImg.src.replace(srcMatchPlayersStr, '');
		var player =
		{
			img: playerImgSrc,
			name: $(playerLink).text(),
			num: playerLink.href.match(/\d+/)[0],
			level: level,
			clan: clan,
			isMember: isMember
		};
		var content = $(this).find('.DiscussionPostDiv')[0].innerHTML.trim();
		var postDateAndTime = $($(this).find('th font')[0].nextSibling).text().replace(': ', '');

		repliesData.push([player, content, postDateAndTime]);
	});

	const threadOffset = GetThreadOffset();

	if (threadOffset === 0)
	{
		allData.subjects.push(subject);
	}

	allData.tempReplyData.push(repliesData);

	//check if there are multiple pages on the current thread
	var totalOffset = parseInt($($("table[cellspacing = '4'] td")[0].firstChild).text().split(' of ')[1].match(/\d+/)[0]);
	var totalOffsetPage = Math.floor(totalOffset / 30);//starting at 0

	console.log('threadNumber = ' + threadNumber + '\noffset = ' + threadOffset + '\ntotalOffsetPage = ' + totalOffsetPage);

	//read next offset
	if (threadOffset < totalOffsetPage)
	{
		ModifyThreadOffset(threadOffset + 1);

		makeRequestFunction = function()
		{
			var offsetedThread = OpenThread(threadNumber);

			timeoutId = SetLoadTimeout();

			offsetedThread.onload = function()
			{
				window.iframeLoaded = true;
				ClearLoadTimeout();
				ReadThread(offsetedThread, threadNumber);
			};
		};
		resumeFunction = doesConnectionExist;

		doesConnectionExist();

		return;
	}

	//if is last page, merge all temp parts
	console.log('was on last thread page');

	var allReplyDataParts;

	allData.tempReplyData.forEach(function(tempReplyDataPart)
	{
		if (!allReplyDataParts)
		{
			allReplyDataParts = tempReplyDataPart;
		}
		else
		{
			allReplyDataParts = $.merge(allReplyDataParts, tempReplyDataPart);
		}
	});

	allData.tempReplyData = [];
	allData.replyData.push(allReplyDataParts);
	MakeGetProgress(2).increaseProgress(1);

	//read the next thread's data
	threadNumber++;
	ModifyThreadOffset(0);

	if (GetAllThreads()[threadNumber])
	{
		makeRequestFunction = function()
		{
			var nextThread = OpenThread(threadNumber);

			timeoutId = SetLoadTimeout();

			nextThread.onload = function()
			{
				window.iframeLoaded = true;
				ClearLoadTimeout();
				ReadThread(nextThread, threadNumber);
			};
		};
		resumeFunction = doesConnectionExist;

		doesConnectionExist();
	}
	else
	{
		return DownloadAllData();
	}
	}catch(err){ErrorDetected(err);}
}

function OpenClanForumPage()
{
	try{
	ModifyAllThreadsOffset(GetAllThreadsOffset() + 1);

	var clanForumPageOffset = GetAllThreadsOffset();

	if (!isNumber(clanForumPageOffset) || !clanForumPageOffset || !window)
	{
		return;
	}

	resumeFunction = function()
	{
		return OpenClanForumPage();
	};

	if (!GetCanRun())
	{
		return Stop();
	}

	const $ = window.$;
	const totalOffset = parseInt($($("table[cellspacing = '4'] td").filter(":not([class = 'UIElement'])")[0].firstChild).text().split(' of ')[1].match(/\d+/)[0]);
	const totalOffsetPage = Math.floor(totalOffset / 25);
	const calculatedOffset = clanForumPageOffset * 25;
	const allThreads = GetAllThreads();

	if (!(clanForumPageOffset < totalOffsetPage + 1))//+ 1 to allow the final page to be read
	{
		//read the threads
		MakeGetProgress(2, 'All Thread Content', JSON.stringify(allThreads.length), 1);

		makeRequestFunction = function()
		{
			var currentThread = OpenThread();

			timeoutId = SetLoadTimeout();

			currentThread.onload = function()
			{
				window.iframeLoaded = true;
				ClearLoadTimeout();
				console.log('allThreads:');
				console.log(allThreads);
				ReadThread(currentThread);
			};
		};
		resumeFunction = doesConnectionExist;

		doesConnectionExist();
		return;
	}

	makeRequestFunction = function()
	{
		var clanForumPage = OpenInBackground('https://www.warzone.com/Clans/Forum?Offset=' + calculatedOffset);

		timeoutId = SetLoadTimeout();

		clanForumPage.onload = function()
		{
			window.iframeLoaded = true;
			ClearLoadTimeout();
			ModifyAllThreads(GetAllPageThreads(clanForumPage));
			OpenClanForumPage();
		};
	};
	resumeFunction = doesConnectionExist;

	doesConnectionExist();
	
	}catch(err){ErrorDetected(err);}
}

function ReadClanImg()
{
	try{
	if (!window)
	{
		return;
	}

	const jq = window.$;

	jq("[id ^= 'cfd_progress_bar']").remove();//reset the progress bars

	MakeGetProgress(0, 'Clan Icon Data', 1);

	resumeFunction = function()
	{
		return ReadClanImg();
	};

	if (!GetCanRun())
	{
		return Stop();
	}

	makeRequestFunction = function()
	{
		var ownProfile = OpenInBackground(jq("a[href ^= '/Profile?p=']")[0].href);

		timeoutId = SetLoadTimeout();

		ownProfile.onload = function()
		{
			window.iframeLoaded = true;
			ClearLoadTimeout();

			const $ = GetWindow(ownProfile).$;
			const clanLink = $("a[href ^= '/Clans/?ID=']")[0];

			allData.clan =
			{
				name: $(clanLink).text().trim(),
				src: clanLink.firstElementChild.src.replace('https://s3.amazonaws.com/data.warlight.net/Data/Clans/', ''),
				id: clanLink.href.match(/\d+/)[0]
			};
			MakeGetProgress(0).increaseProgress(1);
			MakeGetProgress(1, 'All Subject Links', window.$(window.$("table[cellspacing = '4'] td").filter(":not([class = 'UIElement'])")[0].firstChild).text().split(' of ')[1].match(/\d+/)[0], 0);

			//collect all the threads by searching through all thread pages
			//get current
			ModifyAllThreads(GetAllPageThreads(window));
			//get the rest
			OpenClanForumPage();
		};
	};
	resumeFunction = doesConnectionExist;

	doesConnectionExist();
	}catch(err){ErrorDetected(err);}
}

(function()
{
	try{
	var onOwnClanForum = OnPage('https://www.warzone.com/Clans/Forum') && !OnPage('https://www.warzone.com/Clans/Forum?') && !OnPage('https://www.warzone.com/Clans/Forum&');

	if (!onOwnClanForum)
	{
		return;
	}

	var createModifyPauseAndCancelBtns = function()
	{
		var ids = ['cfd_pause_btn', 'cfd_Cancel_btn'];

		return elementExists(ids, function()
		{
			var btns = create(['input', 'input'], ids, ['Pause', 'Cancel'], [downloadClanForumBtn, 0], 'afterend');
			var pauseBtn = btns[0];
			var CancelBtn = btns[1];

			pauseBtn.type = 'button';
			CancelBtn.type = 'button';
			pauseBtn.disabled = false;
			CancelBtn.disabled = false;

			pauseBtn.onclick = function()
			{
				PauseOrResume();
			};
			CancelBtn.onclick = function()
			{
				Cancel();
			};

			return btns;
		}, function(element, elements)
		{
			var pauseBtn = elements[0];
			var CancelBtn = elements[1];

			if (!CancelBtn)
			{
				return;//wait until all elements have been pushed into the elements array
			}

			pauseBtn.value = 'Pause';
			CancelBtn.value = 'Cancel';
			pauseBtn.disabled = false;
			CancelBtn.disabled = false;

			return elements;
		});
	};
	var downloadClanForumBtnId = 'downloadClanForumBtn';

	elementExists(downloadClanForumBtnId, function()
	{
		var downloadClanForumBtn = create('input', downloadClanForumBtnId, 'Download Clan Forum', window.$("a[href $= 'CreateThread']")[0], 'afterend');

		downloadClanForumBtn.onclick = function()
		{
			downloadClanForumBtn.disabled = true;
			ModifyCanRun(true);
			ModifyState(0);
			ReadClanImg();
			createModifyPauseAndCancelBtns();
		};

		return downloadClanForumBtn;
	}, function(element)
	{
		createModifyPauseAndCancelBtns();

		return element;
	}).type = 'button';
	}catch(err){ErrorDetected(err);}
})();