// ==UserScript==
// @name        IQDB Linkify
// @namespace   Crazycatz00
// @description Makes "Your image" clickable when querying by url.
// @icon        data:image/gif;base64,R0lGODdhMAAwAPQAAPW5lfjKsZNzY2xUTayFcVRAN/vWv/vPdf7iyyUbFaeZkdKNPUIyKfeqS/v39MWOS/OoiY5iNcSWendeVmFKQYNpZK1+RtVmb82iVOK3YeOefdPJxOibQb+CMOXf2s+2oywAAAAAMAAwAAAF/+AnbIpQTVV6DmglEHA1zPRkD8ShH1zzRAXCRECRGBAVhcdlU00GqpQNZRpQCtgCRbDDCB6LzKBAAyDOFU9JFm053y+CYHKd6DIWS6PBeViuDAIKCgSDGy4nUYpSVhSOZIgCDRh+D3uXC1pWLFobBFKLoYoCcwN6lT0NCxgYEY8MDFAEEoegojeNFFAyExYcFg99rBkHBgeZDFi6BB8ACqLQJ0+6VxECFhjEOzs+GdoYHwYG0dI0M082pDEsvnscCwsPDx2TOg0HEmjQT8B5QLIS5JAycYNChA7wFiDsgBAeBw4fkEDjskPClCYBZeiycUUXvUscOhAAAEHCvA+h0v9tm4PrBR0UE7DQyGIKXgdXLeKIonhATA0UY3TRpJCMDCwyyh45KrroSTEdjbIAJaWJQMejgKglYyFAAgQAAdrYyHDmQAUtcWBcGSAAQEwKhLTAYrBU1wwjBgCYkRglhw6LNggEEBcAgIYKWwIMiPWBQoIEc7M4etRVwxE3NrZNORfxjIHCYz4QeEz6cbKjSedOkOAExw4iLJ6cIHAGwYchCiQweFyBRAIBBY4mIyoXVoLW22LHFqDBhIIJBDYgCLCbtAIHHrAvvgKZKN1Ah1fwFHIR+upPCI4YEFA6QRAH8B0IoOs9uHsB425g2FG+CZQAH3yV3gDtFRAAdvEFV9T/aZCVd09P5kAnwVoKTBcAGgwoUABpAGAwgQfZfbDYXO6pNkMFexxgwQ3JMCGTdLUZYJV7BehBwQcenIHdafbZZ0ONKeL0hBUFPNFibUgqQEEHD0wwmDg6VnAUARokI4QVejQgBhk1dMRJZ0iKQ0hhT9amYZEMzBLLkJbsIRQNFMhB1xACIJmeOOKQBMARMcIyAQQTaEAAAxy1mckMdl0BwaAFSFBnjIQFIGmZSOKQpmEACNBImx1oIltwEwCgm5NhfjbpnnwmaVgBX30lVJadQqLpGJcOeiGkhYGF6gcwniGBXoICq0kEe8RKxicT0KdXIaWSBAEEgxFwwbRGIJAb/7B6AaDMAD0sEFkK862oAQAfZIjrs18ZMK0Gz+YTjgTjZnsFl+/MtRVirGrwQQIU5BhjYc+SewG7rQI42AcSeAXAGDIN4C1qxBEawATufQCfZ5NK+sEF6D4bwAbhENZMTDSNCAsR9rJHGgNp3GlqtB1DYMAHIeNpwBNZaKEgGd5BVp1pHTgwCMZPUhkwAoLZ/BlHPNaF1RYbljYBAh1UaCqUtn1wIQAEKC3ODcFhMafJsLDVXgIMhTxpqulliqrSQ444L1ve2bvyY63ULCmfeUEgwLMv42mO3LpUQIDJujzmASwdZNBvxqcaRgC6kEvKJQ1FSUW2abAAUUHfEBD8VffCYJGZK7pBOWJCcU+TCJkCGxQWu6MEa+BVzKV/xutSNE3Qir30cUcaKa4EEvB8Bj2ggQYPfIGuv3QwjIUFGUTgOPBaEMV5AcwBG4Bj2FtguwZIck+BRgVk0EAHGDQQAfCZFzVABBbA8OvPkCFFKpJnySCHHQnJAAci8L7SZC5nWYBf5yxjJwSsRi4DeMABOvAQYmWgADfBX/4S6Lpk0G9c6rGTgSQgNvUBgwMMkCAGGECsArZHgXSxBimeMAIRfoZRB3CfHoKjgwew8CFRO5sQHzMACdxKhNLJVARyuCT3JcACB0CABViIEOIoaDc/404g9tTAM4QAADs=
// @match       *://*.iqdb.org/?url=*
// @version     2.0.1.1
// @grant       none
// ==/UserScript==

var match = /[?&]url=([^&]+)/.exec(window.location.search), t;
if (match)
{
	if (t = document.querySelector('#pages table:first-of-type td>img[alt]'))
	{
		var link = t.parentNode.appendChild(document.createElement('a'));
		link.appendChild(t);
		link.href = decodeURIComponent(match[1]);
	}
	
	for (t of document.getElementsByTagName('a'))
	{
		if (/[./]iqdb\.org\/?$/.test(t.href) && t.textContent.toLowerCase().indexOf('main') === -1)
		{
			t.href += (t.href.slice(-1) === '/' ? '' : '/') + match[0];
		}
	}
}
