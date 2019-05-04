// ==UserScript==
// @name       4chan Filter Bypass
// @namespace  ModsAreSoyBoys
// @description Puts hidden characters between certain words so that they aren't be filtered
// @match   *://*.4chan.org/*
// @version 0.0.1.20180421185401
// ==/UserScript==

(function() {
    'use strict';

    // Words that will have a special invisible character inserted between each letter.
    // Currently the invisible character doesn't work, so this doesn't work.
    var words = [];
    // Will be inserted inbetween letters
    var insertionCharacter = "\uFE00";

    // Replace the first array index with the second (0 index with 1 index)
    var replaces = [
        ["soy", "sסy"],
        ["Soy", "Sסy"],
        ["pcuck", "pcטck"],
        ["SOY", "SΩY"],
        ["drone", "drסne"],
        ["old", "סld"],
        ["todd", "tסdd"],
        ["sony", "sסny"],
        ["pony", "pסny"],
        ["brony", "brסny"],
    ];

    var filterText = function(text){
        var before = text;

        text = text.replace(new RegExp("spoiler", "g"), "sp@iler");

        for(var i=0; i<replaces.length;i++){
            text = text.replace(new RegExp(replaces[i][0], "g"), replaces[i][1]);
        }

        var textSplit = text.split(" ");
        for(i=0;i<textSplit.length;i++){
            for(var j=0;j<words.length;j++){
                if(textSplit[i].toLowerCase().includes(words[j].toLowerCase())){
                    console.log("detected '" + words[j] +"', unfiltering.");
                    // normal case
                    var newString = "";
                    for(var k=0;k<textSplit[i].length;k++){
                        newString += textSplit[i][k] + insertionCharacter;
                    }
                    textSplit[i] = newString;
                    break;
                }
            }
        }

        var after = textSplit.join(" ");
        after = after.replace(new RegExp("sp@iler", "g"), "spoiler");
        console.log("Before......\n\n" + before);
        console.log("After.......\n\n" + after);
        return after;
    };

    document.addEventListener("click",function(e){
        if(e.srcElement.type == "submit"){
            console.log('unfiltering words...');
            var textAreas = document.getElementsByTagName("textarea");
            for(var i=0;i<textAreas.length;i++){
                textAreas[i].value = filterText(textAreas[i].value);
            }
        }
    },false);

    console.log("word unfiltering initialized on reply button. See below for unfiltered words.");
    console.log(words);
})();