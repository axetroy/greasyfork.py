// ==UserScript==
// @name         1337X - Magnet/Torrent links everywhere
// @namespace    NotNeo
// @version      0.4.3
// @description  Adds magnet and torrent links everywere, e.g. directly to the torrent search results
// @author       NotNeo
// @include      /^https:\/\/1337x\.(to|st|ws|eu|se|is)((?!\/torrent\/)).*$/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

	var intervalHandle;

    $(function() {
		//If we are not on a page that has a torrent list of torrents, don't run the script
        if($("table.table-list").length > 0) {
            addGlobalStyle(`
				main.container, div.container {
					max-width: 1600px;
				}
				table.table-list td.coll-5 {
					border-right: 1px solid silver;
				}
				table.table-list td.dl-buttons {
					border-left: 1px solid #f6f6f6;
					padding-left: 2.5px;
					padding-right: 2.5px;
					text-align: center;
					position: relative;
					display: inline-block;
					width: 50px;
				}
				td.dl-buttons > a,
				td.dl-buttons > a:hover,
				td.dl-buttons > a:visited,
				td.dl-buttons > a:link,
				td.dl-buttons > a:active {
					color: inherit;
					text-decoration: none;
					cursor: pointer;
					display: inline-block;
					margin: 0 1.5px;
				}
				.list-dl-button-magnet > i.flaticon-magnet {
					font-size: 13px;
					color: #89ad19;
				}
				.list-dl-button > i.flaticon-torrent-download {
					font-size: 13px;
					color: #da3a04
				}
				span.fetchNotifier {
					display: inline-block;
					position: absolute;
					z-index: 999;
					padding: 2px 8px;
					left: 45px;
					top: 0px;
					width: 140px;
					background-color: white;
					border: 1px black solid;
					border-radius: 20px;
				}
			`);

            $("table.table-list thead tr").append('<th class="coll-6" style="text-align: center;">dl</th>'); //adding the dowload thead
            $("table.table-list tbody tr").each(function(){ //adding all download buttons
                $(this).append(`<td class="coll-6 dl-buttons">
					<a href="#" class="list-dl-button-magnet" title="Download via magnet"><i class="flaticon-magnet"></i></a>
					<a href="#" class="list-dl-button" title="Download torrent file"><i class="flaticon-torrent-download"></i></a>
				</td>`);
            });

            $("a.list-dl-button-magnet[href='#']").mouseover(MouseOverFuncMagnet); //adding mouseover events for all
			$("a.list-dl-button[href='#']").mouseover(MouseOverFunc); //adding mouseover events for all

            $("a.list-dl-button-magnet").click(function(e){ //click event for all
                var linkElem = $(this); //saving proper this to avoid scope mistakes
                clearInterval(intervalHandle); //clearing possible old intervals
                $(".fetchNotifier").remove(); //removing possible old messages
                if(linkElem.prop("href").substring(0, 6) != "magnet") { //if the link hasn't loaded yet
                    e.preventDefault();
                    linkElem.after('<span class="fetchNotifier" style="display: none;">Fetching magnet link...</span>');//adding message
                    linkElem.next(".fetchNotifier").fadeIn(200);
                    intervalHandle = setInterval(function(){ CheckForMagnet(linkElem); }, 100); //starting link checker interval
                } //else default action, i.e. opens the link
            });

			$("a.list-dl-button").click(function(e){ //click event for all
                var linkElem = $(this); //saving proper this to avoid scope mistakes
                clearInterval(intervalHandle); //clearing possible old intervals
                $(".fetchNotifier").remove(); //removing possible old messages
                if(linkElem.prop("href") == "#") { //if the link hasn't loaded yet
                    e.preventDefault();
                    linkElem.after('<span class="fetchNotifier" style="display: none;">Fetching torrent link...</span>');//adding message
                    linkElem.next(".fetchNotifier").fadeIn(200);
                    intervalHandle = setInterval(function(){ CheckForTorLink(linkElem); }, 100); //starting link checker interval
                } //else default action, i.e. opens the link
            });
        }
    });

	function CheckForMagnet(theLink) {
		if(theLink.prop("href").substring(0, 6) == "magnet") { //if the link has been loaded
			clearInterval(intervalHandle);
            theLink.next(".fetchNotifier").fadeOut(300, function() { //hiding, then removing message
                $(this).remove();
            });
			location.href = theLink.prop("href"); //opening link
		}//else interval will call this function again
	}

	function CheckForTorLink(theLink) {
		if(theLink.prop("href") != "#") { //if the link has been loaded
			clearInterval(intervalHandle);
            theLink.next(".fetchNotifier").fadeOut(300, function() { //hiding, then removing message
                $(this).remove();
            });
			location.href = theLink.prop("href"); //opening link
		}//else interval will call this function again
	}

    function MouseOverFuncMagnet() {
        var thisElem = $(this);//saving this element to avoid scope mistakes
        thisElem.unbind("mouseover"); //mouse over for this element wont be needed unless load fails
        thisElem.prop("title", "Download via magnet (fetching magnet link...)");
        var url = thisElem.parent().parent().find("td.name > a[href^='/torrent/']").prop("href"); //getting url
        $.get(url, function(res) { //ajax
            let result = $("a[href^='magnet:?']:first", res).prop("href");
            thisElem.prop("href", result);
            thisElem.prop("title", "Download via magnet");
        }).fail(function(x, status){
            console.log("error getting magnet link: " + status + "\nFor: " + thisElem.prop("href")); //printing error to console
            thisElem.mouseover(MouseOverFuncMagnet); //re-initializing mouseover event if load failed
        });
    }

	function MouseOverFunc() {
        var thisElem = $(this);//saving this element to avoid scope mistakes
        thisElem.unbind("mouseover"); //mouse over for this element wont be needed unless load fails
        thisElem.prop("title", "Download torrent file (fetching torrent link...)");
        var url = thisElem.parent().parent().find("td.name > a[href^='/torrent/']").prop("href"); //getting url
        $.get(url, function(res) { //ajax
            let result = $("a.btn[href*='itorrents.org/torrent/']:first", res).prop("href");
            thisElem.prop("href", result);
            thisElem.prop("title", "Download torrent file");
        }).fail(function(x, status){
            console.log("error getting torrent link: " + status + "\nFor: " + thisElem.prop("href")); //printing error to console
            thisElem.mouseover(MouseOverFunc); //re-initializing mouseover event if load failed
        });
    }

	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

})();