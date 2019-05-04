// ==UserScript==
// @name Trello coloured Scrum Kanban
// @namespace https://trello.com/
// @version 2.31
// @description Colour list for Scrum, referenced with Kanban Game
// @match https://trello.com/*
// @require http://code.jquery.com/jquery-latest.js
// @author       Michael Wan
// ==/UserScript==
// Ref: https://stawebteam.wordpress.com/2014/03/07/coloured-lists-in-trello/

$(document).ready(function() {

    var red = '#fccbc2',
        blue = '#9ec4ff',
        green = '#dbffd1',
        grey = '#c4c4c4',
        black = '#898989',
        white = '#fff',
        yellow = '#ffd800',
        lightyellow = '#fdffbf',
        darkred = '#ff6363',
        lightblue = '#dbf3ff',
        lightorange = '#ffd396',
        darkdarkred = '#c1150f',
        pink = '#fabaff',
        orange = '#ff8300';

    $('body').hover(function() {
        $("h2:contains('Analysis')").css('color', white).parents('.list').css('background', red);
        $("h2:contains('Development')").css('color', white).parents('.list').css('background', blue);
        $("h2:contains('Testing')").css('color', white).parents('.list').css('background', green);
        $("h2:contains('Ready to Deploy')").css('color', white).parents('.list').css('background', grey);
        $("h2:contains('Deployed')").css('color', white).parents('.list').css('background', black);
        $("span:contains('!')").parents('.list-card-details').css('border-color', yellow).css('border-style', 'solid').css('border-width', '5px');
        $("span:contains('!!')").parents('.list-card-details').css('border-color', orange).css('border-style', 'solid').css('border-width', '5px');
        $("span:contains('`')").parents('.list-card-details').css('border-color', lightblue).css('border-style', 'solid').css('border-width', '5px');
        $("span:contains('[P]')").parents('.list-card-details').css('background', lightyellow);
        $(".card-short-id").append(" ").removeClass("hide").css('color', lightorange);
        $("span[class='list-card-title js-card-name']").filter(function () {
            return !new RegExp("\\(\\d+\\)").test($(this).text());
        }).find(".card-short-id").css('color', darkdarkred);
        $("span:contains('Blocked')").parents('.list-card-details').css('background', pink);
        $("span:contains('[VIP]')").parents('.list-card-details').css('background', darkred);
    });


    function printOneMemberWIP(value, key, map) {
        var WIP_LIMIT = 2;
        if (value == 0 || value > WIP_LIMIT) {
            $("#actualWIP").append("<b style='color: yellow'>" + key + ": " + value + " , </b>");
        } else {
            $("#actualWIP").append(key + ": " + value + " , ");
        }
    }

    function printWIP() {
        var text = "";
        $("#actualWIP").remove();
        $(".board-header").after("<div id='actualWIP' style='color: white'>ActualWIP (excluded Blocked): </div>");
        var allMember = $("div.list-wrapper")
        .find("img.member-avatar")
        .map(function() {
            return this.alt.replace(/\(.+\)/, "");
        })
        .toArray();

        var finalMap = new Map();
        for (var i in allMember) {
            finalMap.set(allMember[i], 0);
        }

        var normalMap = $('textarea:contains("In Progress")')
        .closest("div.list-wrapper")
        .find("img.member-avatar")
        .map(function() {
            return this.alt.replace(/\(.+\)/, "");
        })
        .toArray()
        .reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map());

        var blockedMap = $('textarea:contains("In Progress")')
        .closest("div.list-wrapper")
        .find("span[title='Blocked'], span[title='Keep Monitoring'], span[title='Pending for Desk Check']")
        .closest("a.list-card")
        .find("img.member-avatar")
        .map(function() {
            return this.alt.replace(/\(.+\)/, "");
        })
        .toArray()
        .reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map());

        for (var [key, value] of finalMap.entries()) {
            var point = normalMap.get(key) === undefined ? 0 : normalMap.get(key);
            var blockedPoint = blockedMap.get(key) === undefined ? 0 : blockedMap.get(key);
            finalMap.set(key, point - blockedPoint);
        }
        finalMap.forEach(printOneMemberWIP);
        setTimeout(function(){ printWIP(); }, 1000);
    }

    function printListInsight() {
        $('p.StoryPtInsight').remove();
        $('div.list-wrapper')
            .each(function(index) {
            listname = $(this).find('textarea.list-header-name').text();
            listcardLength = $(this).find(".list-card").length;
            let listStoryPt = 0;
			let numOfCardWithStoryPt = 0;
            $(this).find(".list-card").find(".list-card-title").each(function(index) {
                cardTitle = $(this).text();
                storyPt = cardTitle.match(new RegExp(/\((\d+)\)/)) ? parseInt(cardTitle.match(new RegExp(/\((\d+)\)/))[1]) : 0;
				numOfCardWithStoryPt += cardTitle.match(new RegExp(/\((\d+)\)/)) ? 1 : 0;
                listStoryPt += storyPt;
            });
			appendElement = `<p class='StoryPtInsight'><b style='color: green'>#Cards:${listcardLength}</b> <b style='color: blue'>#StoryPt:${listStoryPt}</b>`;
			if (listcardLength-numOfCardWithStoryPt > 0) {
				appendElement += ` <b style='color: red'>#Miss:${listcardLength-numOfCardWithStoryPt}</b>`;
            }
			appendElement += `</p>`;
            $('textarea.list-header-name').filter(function() {
                return $(this).text() === listname;
            }).after(appendElement)
            ;
        })
        ;

        setTimeout(function(){ printListInsight(); }, 1000);
    }
    printWIP();
    printListInsight();
});