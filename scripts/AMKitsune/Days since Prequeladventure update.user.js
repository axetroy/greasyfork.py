// ==UserScript==
// @name         Days since Prequeladventure update
// @namespace    https://www.prequeladventure.com/fanartbooru/user/amkitsune
// @version      1.2
// @description  Displays how many days have passed since an update.
// @author       AMKitsune
// @include      https://www.prequeladventure.com/
// @include      /https:\/\/www\.prequeladventure\.com\/\d.*/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var titleDiv = document.getElementsByClassName('title')[0];
    var rawDay = document.getElementsByClassName('date')[0].getElementsByClassName('day')[0];
    var rawMonth = document.getElementsByClassName('date')[0].getElementsByClassName('month')[0];
    var rawYear = document.getElementsByClassName('date')[0].getElementsByClassName('year')[0];
    var day = rawDay.textContent;
    var month = null;
    var year = rawYear.textContent;
    var dayWord = null;


    switch (rawMonth.textContent) {
        case "Jan":month = 0;break;
        case "Feb":month = 1;break;
        case "Mar":month = 2;break;
        case "Apr":month = 3;break;
        case "May":month = 4;break;
        case "Jun":month = 5;break;
        case "Jul":month = 6;break;
        case "Aug":month = 7;break;
        case "Sep":month = 8;break;
        case "Oct":month = 9;break;
        case "Nov":month = 10;break;
        case "Dec":month = 11;break;
    }

    var updateDate = new Date(year,month,day);
    var currentDate = new Date();
    var timeDifference = (currentDate.getTime() - updateDate.getTime());//milliseconds

    if (Math.floor(timeDifference/86400000) == 1){
        dayWord = "day";
    } else {
        dayWord = "days";
    }
    
    var textNode = document.createTextNode(Math.floor(timeDifference/86400000) + " " + dayWord + " since this update was released.");
    //alert(rawDay.textContent + ":" + rawMonth.textContent + ":" + rawYear.textContent);
    titleDiv.appendChild(textNode);
})();