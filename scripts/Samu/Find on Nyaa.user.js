// ==UserScript==
// @name         Find on Nyaa
// @namespace    findOnNyaaSamu
// @version      1.0
// @description  Will open nyaa on a new window and search for the anime title
// @author       Samu
// @match        https://myanimelist.net/anime/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  //** SCROLL DOWN FOR SETTINGS **//

  /**
    icon source
    https://icons8.com/icon/82838/external-link
    https://ezgif.com/image-to-datauri
  **/

  var sorts = ["comments", "size", "id", "seeders", "leechers", "downloads"];
  var filters = ["0", "1", "2"];
  var cat = {
    Allcategories: "0_0",
    Anime: "1_0",
    AnimeMusicVideo: "1_1",
    AnimeEnglishTranslated: "1_2",
    AnimeNonEnglishTranslated: "1_3",
    Raw: "1_4",
    Audio: "2_0",
    Lossless: "2_1",
    Lossy: "2_2",
    Literature: "3_0",
    LiteratureEnglishTranslated: "3_1",
    LiteratureNonEnglishTranslated: "3_2",
    LiteratureRaw: "3_3",
    LiveAction: "4_0",
    LiveActionEnglishTranslated: "4_1",
    IdolPromotionalVideo: "4_2",
    LiveActionNonEnglishTranslated: "4_3",
    LiveActionRaw: "4_4",
    Pictures: "5_0",
    Graphics: "5_1",
    Photos: "5_2",
    Software: "6_0",
    Applications: "6_1",
    Games: "6_2",
  }

  //** SETTINGS **//
  var sortBy = sorts[3];
  var filt = filters[0];
  var category = cat.AnimeEnglishTranslated;
  //** END OF SETTINGS **//

  var titleElem = document.querySelector("#contentWrapper .h1 span[itemprop='name']");
  var header = titleElem.parentElement;
  var title = titleElem.innerText.replace(/[^a-zA-Z0-9]+/g, " ");
  var nyaaButton = document.createElement("a");

  var path = `?f=${filt}&c=${category}&s=${sortBy}&o=desc&q=${encodeURI(title)}`;

  nyaaButton.innerHTML = "";
  nyaaButton.setAttribute("href", "https://nyaa.si/" + path);
  nyaaButton.setAttribute("target", "_blank");
  nyaaButton.setAttribute("rel", "noopener");
  nyaaButton.setAttribute("title", "Search on Nyaa");
  nyaaButton.setAttribute("style", "margin-left: 10px;height: 10px;width: 10px;background-size: cover;display: inline-block;transform: scale(1.8);");
  nyaaButton.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFnSURBVGhD7ZlLSgNRFESzDp3qSPfjdlyOgjsTxM9U0HsggWt7k3716mln8A4chM61qjrT7CaTyeSsuQ6fwvfwq9Ml1U2LMlfhS1iFKS6pblqU4ZuvglSXVDctynyEVZDqkuqmRRk7QOQu/AyXvQdl7ACBtfEoYwc0Uo2vXkbGDmjg2Hie52coYwescGo85OcoYwecYG085M9Qxg44Qst4yJ+jjB1Q0Doe8g3K2AELlPGQ71DGDkio4yHfoowdsKdn/BByIfaw2XjIpaiy6XjIxaiw+XjI5djKqPH5/1GmJ2DkN58zUEYNGDkecg7KKAGjx0POQpnWgNtw9HjIeSijBNyHh7sR4yF3o4wawEuMGg9q/y96Am72f0fQ0/8DO8DE7rcDTOx+O8DE7rcDTOx+O8DE7rcDTOx+5zeB0b6FMo9hFbaFbJG5CJ/DKvA/ZQNburgMefvXsAr/S+l8CNkwmUwmZ8lu9w0a6EAybIGM4AAAAABJRU5ErkJggg==)";

  header.appendChild(nyaaButton);

})();