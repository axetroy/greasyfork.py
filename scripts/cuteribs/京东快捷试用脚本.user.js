// ==UserScript==
// @name         京东快捷试用脚本
// @namespace	 https://blog.cuteribs.com/
// @version      0.11
// @description  一键申请试用
// @author       cuteribs
// @match        *://try.jd.com/
// @match        *://try.jd.com/activity/getActivityList*
// @icon 		 https://www.jd.com/favicon.ico
// ==/UserScript==

(function () {
	'use strict';

	var setItem = container => {
		container.find('a.link').remove();

		container.find('div.try-button').css('cursor', 'pointer').bind('click', e => {
			e.preventDefault();
			e.cancelBubble = true;
			var $button = $(e.target);
			var $item = $button.closest('li');
	
			if (!$item.hasClass('applied')) {
				let id = $item.attr('activity_id');
	
	
				let url = `https://try.jd.com/migrate/apply?activityId=${id}&source=0`;
				$.get(url).done(r => {
					switch (r.code) {
						case '1':
						case '-114':
							$button.text('已申请');
							$item.addClass('applied');
							break;
						case '-113':
							$button.text('操作太快');
							break;
					}
	
					console.log(r.message);
				});
			}
		});
	};

	setItem($('ul.clearfix'));

	let observer = new MutationObserver(records => {
		setItem($(records[0].addedNodes[0]));
	});

	var $panels = $('div.ui-switchable-panel-main div.ui-switchable-panel');

	for (let i = 0; i < $panels.length; i++) {
		observer.observe($panels[i], {
			childList: true
		});
	}
})();