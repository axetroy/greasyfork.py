// ==UserScript==
// @name         YouTube - Watched Video Remover
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Clear autoplay "up next" videos that already have a percentage watched that is greater than a user-defined threashold
// @author       Ðrawbackz
// @match        https://www.youtube.com/watch*
// @grant        none
// @run-at document-end
// ==/UserScript==

var playbackPercentThreashold = 75;
var removedItems = false;
var processing = false;
function processPlaybacks() {
    if(processing){return;}
    if (document.getElementsByTagName('ytd-thumbnail-overlay-time-status-renderer').length < 1) {
        setTimeout(processPlaybacks, 1000);
        return;
    }
    processing = true;
    var playbacks = document.getElementsByClassName('style-scope ytd-watch-next-secondary-results-renderer');
    for (var i = 0; i < playbacks.length; i++) {
        var playbackProgressEle = playbacks[i].querySelectorAll("#progress")[0];
        if (playbackProgressEle) {
            var percentage = playbackProgressEle.style.width;
            percentage = parseInt(percentage.substring(0, percentage.length - 1));
            if (percentage >= playbackPercentThreashold) {
                var button = playbacks[i].querySelectorAll(".dropdown-trigger .style-scope .ytd-menu-renderer")[0];
                button.click();
                var popup = document.getElementsByClassName('dropdown-content style-scope ytd-popup-container')[0];
                var notInterested = popup.querySelectorAll('.style-scope .ytd-menu-popup-renderer')[0];
				removedItems = true;
                setTimeout(function() {
                    notInterested.children[2].click();
                    if (playbacks.length > 1) {
                        playbacks[i].removeAttribute('class');
                        processPlaybacks();
                    }
                }, 100);
                processing = false;
                return;
            }
        }
    }
	if(removedItems){
		window.location = window.location;
	}
    processing = false;
}

function addControls(){
    if(document.getElementById("secondary-inner")){
    if(document.getElementById("video-remover-content")){return;}
    var removersytle = document.createElement("style");
    removersytle.innerHTML = "#video-remover-content{height: 20px;display: inline-flex;margin-bottom: 10px;}#video-remover-button{height: 20px;margin-left: 20px;border-radius: 5px;}#video-remover-auto-checkbox{line-height: 20px !important;}"
    document.head.appendChild(removersytle);

    var container = document.getElementById("secondary-inner");

    var content = document.createElement("div");
    content.id = "video-remover-content";

    var autoRemoveCheckBoxContainer = document.createElement("div");
    autoRemoveCheckBoxContainer.style.display = "inline-flex";
    
    var autoRemoveCheckBoxLabel = document.createElement("div");
    autoRemoveCheckBoxLabel.innerText = "Auto Remove";
    autoRemoveCheckBoxLabel.style.fontSize = "12px";
    autoRemoveCheckBoxLabel.style.lineHeight = 12;
    autoRemoveCheckBoxLabel.id = "video-remover-auto-checkbox";
    
    
    var autoRemoveCheckBox = document.createElement("input");
    autoRemoveCheckBox.type = "checkbox";
    autoRemoveCheckBox.id = "AutoRemoveCheckBox";
    autoRemoveCheckBox.onchange = function(){
        localStorage.setItem("video-remover-auto-remove", autoRemoveCheckBox.checked);
    };
    
    if(localStorage.getItem("video-remover-auto-remove")){
        autoRemoveCheckBox.checked = true;
    }

    var removeWatchedVideosButton = document.createElement("input");
    removeWatchedVideosButton.id = "video-remover-button";
    removeWatchedVideosButton.type = "button";
    removeWatchedVideosButton.value = "Remove Watched";
    removeWatchedVideosButton.onclick = processPlaybacks;

    content.appendChild(autoRemoveCheckBoxContainer);
    autoRemoveCheckBoxContainer.appendChild(autoRemoveCheckBox);
    autoRemoveCheckBoxContainer.appendChild(autoRemoveCheckBoxLabel);
    content.appendChild(removeWatchedVideosButton);
    container.prepend(content);
}
else{
    setTimeout(addControls, 500);
}
}
if(localStorage.getItem("video-remover-auto-remove")){
    setInterval(processPlaybacks, 1500);
}
addControls();