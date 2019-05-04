// ==UserScript==
// @name         教师研修网学习外挂
// @namespace    https://greasyfork.org/zh-CN/users/41249-tantiancai
// @version      1.1
// @description  自动挂机学习。
// @author       Tantiancai
// @match        http://i.yanxiu.com/uft/course/*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    function getUnsafeWindow() {
        if(this)
        {
            console.log(this);
            if (typeof(this.unsafeWindow) !== "undefined") {//Greasemonkey, Scriptish, Tampermonkey, etc.
                return this.unsafeWindow;
            } else if (typeof(unsafeWindow) !== "undefined" && this === window && unsafeWindow === window) {//Google Chrome natively
                var node = document.createElement("div");
                node.setAttribute("onclick", "return window;");
                return node.onclick();
            }else
            {
            }
        } else {//Opera, IE7Pro, etc.
            return window;
        }
    }
    var myUnsafeWindow = getUnsafeWindow();
    var doc = myUnsafeWindow.document;
    var processTimer = null;
    var cntRetry = 0;
	myUnsafeWindow.clearInterval(processTimer);
    processTimer = myUnsafeWindow.setInterval(TimeProcess, 10000);

    function TimeProcess()
    {
		console.log('%c clock-tip:display=' + $('.clock-tip').css('display') + ' full-cover:display=' + $('.full-cover').css('display'), 'color:blue');

        if($('.clock-tip').css('display') != 'none')
        {
	        console.log('%c Click Tip', 'color:blue');
	        myUnsafeWindow.setTimeout(ClickTip, 1000);
        }

		if($('.full-cover').length > 0)
		{
	        if( ($('.full-cover').css('display') != 'none')
    	     && (parseFloat($('.slider-range')[0].style.width) > parseFloat('1%') ) )
        	{
				console.log('%c Setting Next Page...', 'color:blue');
				myUnsafeWindow.setTimeout(SetNextUrl, 10000);
				myUnsafeWindow.clearInterval(processTimer);
    	    }
	    }
	    else
	    {
		    console.log('%c Setting Next Page...', 'color:blue');
			myUnsafeWindow.setTimeout(SetNextUrl, 10000);
			myUnsafeWindow.clearInterval(processTimer);
	    }
    }

    function ClickTip()
    {
	    $('.clock-tip').click();
    }

    function SetNextUrl()
    {
	    var thisUrl = myUnsafeWindow.location.href;
	    var nextUrl = '';
	    var list = $('.class_all').find('a.doc_tit.video');
	    var index = -1;
		for(var i = 0; i < list.length; i++)
		{
			if($(list[i]).hasClass('click'))
			{
				index = i;
				break;
			}
		}

	    if(index + 1 >= list.length)
	    {
		    var trainingid = GetParamValue(thisUrl, 'trainingid');
		    var courseid = GetParamValue(thisUrl, 'courseid');

			$.ajax({
				url: 'http://i.yanxiu.com/user/train/personal/checkTools.tc?projectid=' + trainingid + '&_=' + Math.random(),
				method: 'GET',
				dataType: 'json',
				success: function(data){
					var stageid = -1;
					var found = false;
					for(var key in data.sts)
					{
						var step = data.sts[key];
						for(var key1 in step)
						{
							if(step[key1] == 1)
							{
								found = true;
								break;
							}
						}

						if(found == true)
						{
							stageid = key;
							break;
						}
					}

					if(stageid != -1)
					{
						nextUrl = '/user/train/personal/courseview.tc?projectid=' + trainingid + '&courseid=' + (parseInt(courseid) + 1) + '&stageid=' + stageid;
						console.log('%c Next URL=' + nextUrl, 'color:blue');
            			myUnsafeWindow.location.href = nextUrl;
					}
					else
					{
						nextUrl = '/uft/course/courseview.vm?trainingid=' + trainingid + '&courseid=' + (parseInt(courseid) + 1);
            			console.log('%c Next URL=' + nextUrl, 'color:blue');
            			myUnsafeWindow.location.href = nextUrl;
					}
				},
				error: function(){
					nextUrl = '/uft/course/courseview.vm?trainingid=' + trainingid + '&courseid=' + (parseInt(courseid) + 1);
            		console.log('%c Next URL=' + nextUrl, 'color:blue');
            		myUnsafeWindow.location.href = nextUrl;
				}
			});
	    }
	    else
	    {
		    nextUrl = $(list[index + 1]).attr('href');
            console.log('%c Next URL=' + nextUrl, 'color:blue');
            $(list[index+1])[0].click();
	    }
    }

    function GetParamValue(url, key){
		var regex = new RegExp(key + '=([^&]*)', 'i');
		return url.match(regex)[1];
	}
})();
