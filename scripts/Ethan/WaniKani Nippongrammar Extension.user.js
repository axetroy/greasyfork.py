// ==UserScript==
// @name         WaniKani Nippongrammar Extension
// @namespace    WK-nippongrammar
// @version      0.9
// @website      http://nippongrammar.appspot.com/
// @description  Svg Canvas used to draw Kanji on reviews and lessons, using website code.
// @author       Code by Aaron Drew, Wanikani adaption by Ethan McCoy
// @include      *.wanikani.com/*
// @include      *.wanikani.com/review/session*
// @include      *.wanikani.com/lesson/session*
// @grant        none
// @license        MIT
// ==/UserScript==

//"use strict";

$("head").prepend('<script type="text/javascript" src="https://greasyfork.org/scripts/11949-kanjisvg/code/kanjiSvg.js"></script>');
$("head").prepend('<script type="text/javascript" src="https://greasyfork.org/scripts/11951-kanjirender/code/kanjirender.js"></script>');


    var NG = {
        strokesShown: true,
        strokeDiv: document.getElementById('strokeChar'),


        showStrokes : function(){
            this.strokesShown = true;
            this.strokeDiv && (this.strokeDiv.style.display = "block");
            this.charDiv && (this.charDiv.style.display = "none");
        },

        showOriginal: function(){
            this.strokesShown = false;
            this.strokeDiv && (this.strokeDiv.style.display = "none");
            this.charDiv && (this.charDiv.style.display = "block");
        },

        showImage: function(){
            //as above but don't change strokesShown
            this.strokeDiv && (this.strokeDiv.style.display = "none");
            this.charDiv && (this.charDiv.style.display = "block");    
        },

        animateStrokes: function(text){
            if (this.strokeDiv === null){
                this.strokeDiv = document.createElement('div'), 
                    //this.strokeDiv.style = "padding: 20px 20px 0; height: 110px; width: 110px",
                    this.strokeDiv.id = "strokeChar";

                this.charDiv && this.charDiv.parentNode.insertBefore(this.strokeDiv, this.charDiv);

            }
            this.strokeDiv.style.border = "1px";
            //add replay functionality
            this.strokeDiv.removeEventListener("click", handlers.onDivClick);
            this.strokeDiv.addEventListener("click", handlers.onDivClick);

            //from kanjirender.js
            animateWriting(text,'strokeChar',10);


            if (this.strokesShown)
                this.showStrokes();        

        },
    };

    var handlers = {
        switchViews: function(e){
            e.shiftKey && e.keyCode === 37 && NG.showStrokes();
            e.shiftKey && e.keyCode === 39 && NG.showOriginal();
        },

        onDivClick: function(){
            NG.animateStrokes(NG.text||"");
        },

        handleKeyChange: function(key, action){

            console.groupCollapsed("animate strokes userscript");

            switch (key){
                case "l/currentLesson":
                case "l/currentQuizItem":
                    //for lessons and their following quizzes
                    NG.charDiv = document.getElementById("character");
                    break;
                case "currentItem":
                    //for reviews
                    var spanArr = document.getElementById("character").getElementsByTagName("span");
                    NG.charDiv = spanArr[spanArr.length-1]; //animate strokes may insert spans for chars it doesn't know.
                    break;
            }
            var cur = $.jStorage.get(key);
            NG.text = cur.voc || cur.kan || cur.rad || "";
            if (NG.text.indexOf(".png") === -1) { //weed out picture radicals for now, extend svg library later
                NG.animateStrokes(NG.text);
                //introduce hotkey switching
                document.addEventListener("keyup", handlers.switchViews);
            }else{
                //remove hotkey switching
                document.removeEventListener("keyup", handlers.switchViews);
                NG.showImage();
            }
            console.groupEnd();
        }
    };

    var handleLevelsPage = function(){
    };




function main() {

if (document.URL.match(/.wanikani.com\/level\//)){
        false&&handleLevelsPage();
    }else{
        $.jStorage.listenKeyChange("currentItem", handlers.handleKeyChange);
        $.jStorage.listenKeyChange("l/currentQuizItem", handlers.handleKeyChange);
        $.jStorage.listenKeyChange("l/currentLesson", handlers.handleKeyChange);
    }


}

function animateWriting(txt, div_id, millisecondsPerStroke)
{
    if (typeof div_id === 'string'){
        document.getElementById(div_id).innerHTML = "";
    }else{
        div_id.innerHTML = "";
    }
	var renderQueue = [];

	function renderNext() {
		if(renderQueue.length) 
			renderQueue.shift()();
	}

	for(var i=0;i<txt.length;i++) {
		var ch = txt.charAt(i);
		var canvas = document.createElement("canvas");
		canvas.width = 110;
		canvas.height = 110;
		canvas.style.width = "110";
		canvas.style.height = "110";

	
        if (typeof div_id === 'string'){
            document.getElementById(div_id).appendChild(canvas);
        }else{
            div_id.appendChild(canvas);;
        }

		renderQueue.push(renderMojiOrSpan(canvas, ch, millisecondsPerStroke));
	}

	function nextStroke() {
		if(renderQueue.length)
		{
			renderQueue.shift()(nextStroke, function() {
				nextStroke();
			});
		}
	};
	nextStroke();
};

if (document.readyState === 'complete')
    main();
else
    window.addEventListener("load", main, false);
