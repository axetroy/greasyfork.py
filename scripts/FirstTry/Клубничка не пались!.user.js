// ==UserScript==
// @name         Клубничка не пались!
// @namespace    pikabu.ru
// @version      2.1
// @description  Сворачивает клубничные посты на pikabu.ru
// @author       FirstTry
// @match        http://pikabu.ru/*
// @grant        none
// ==/UserScript==

var TagList = "девушки|попа|сиськи|грудь|эротика|чулки|юбка|клубничка|трусы|сексуальная|стринги|ножки|постель|поза";


var Regex = new RegExp(TagList,"g");

var stories_container = document.querySelectorAll(".b-story");
for (var i = 0; i < stories_container.length; i++) 
{
    if (ItsAStraw(stories_container[i])||ItsAHaveTag(stories_container[i]))
    { 
        btn = stories_container[i].querySelector("tbody > tr > td.b-story__main-header > div.b-story__header-additional.info > noindex > img");
        btn.click();
    }   
}

function ItsAStraw(Stories)
{
    result = false;
    Straw = Stories.querySelector("tbody > tr > td.b-story__main-header > div.b-story__header-additional.info > span > a.story_straw");

    if (Straw!==null) result = true;  

    return result;
}

function ItsAHaveTag(Stories)
{
    result = false;  
    story_tag_list = Stories.querySelector("tbody > tr > td.b-story__main-header > div.b-story__header-additional.info > span > span.story_tag_list");

    var HaveTag = story_tag_list.innerHTML.match(Regex);
    if (HaveTag!==null&&HaveTag.length>0) result = true;

    return result;
}