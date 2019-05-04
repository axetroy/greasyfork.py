// ==UserScript==
// @name         Simple HTML5 video player
// @description  Replaces any default HTML5 player with custom controls
// @grant        GM_addStyle
// @include *
// @run-at document-load
// @version 3.2
// @namespace https://greasyfork.org/users/3167
// ==/UserScript==

function HHMMSS(num) {
    num = num || 0;
    var sec_num = Math.floor(num);

    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    if (hours<1) {
        return minutes+':'+seconds;
    }
    return hours+':'+minutes+':'+seconds;
}

function fs_status() {
    if (document.fullscreenElement) {
        return 1;
    }
    else if (document.webkitFullscreenElement) {
        return 1;
    }
    else if (document.mozFullScreenElement) {
        return 1;
    }
    else return -1;
}

function init_videowrapper() {

    var videos = document.getElementsByTagName('video');
    for (var i=0; i<videos.length; i++) {

        (function(video) {
            if (video.controls==true && !video.iswrapped) {

                video.controls_timeout=false;
              
                video.controls=false;
                video.iswrapped=true;

                var videowrapper = document.createElement('videowrapper');

                if (video.parentNode==document.body) {
                    document.body.style.display="flex";
                    document.body.style.alignItems="center";
                    document.body.style.justifyContent="center";
                    document.body.style.margin="0";
                    
                    videowrapper.style.display="inline-block";
                }

                if (video.parentNode!=videowrapper) { 
                    video.parentNode.insertBefore(videowrapper, video); 
                    videowrapper.appendChild(video);
                }

                var controls = document.createElement('controls');
                video.parentNode.insertBefore(controls, video.nextSibling);

                var playbutton = document.createElement('button');
                controls.appendChild(playbutton);
                playbutton.innerHTML="&#x25b6;";

                playbutton.style.left="4px";

                var timestamp = document.createElement('span');
                controls.appendChild(timestamp);
                timestamp.innerHTML="0:00/0:00";

                timestamp.style.left="32px";

                var seekbar = document.createElement('input');
                controls.appendChild(seekbar);
                seekbar.type="range";
                seekbar.value=0;
                seekbar.step=0.01;
                seekbar.innerHTML="";

                seekbar.style.left="140px";
                seekbar.style.right="140px";
                seekbar.style.width="calc(100% - 140px - 140px)";

                var mutebutton = document.createElement('button');
                controls.appendChild(mutebutton);
                mutebutton.innerHTML="&#x1f50a;";
                mutebutton.style.right="100px";

                var volumebar = document.createElement('input');
                controls.appendChild(volumebar);
                volumebar.type="range";
                volumebar.min=0;
                volumebar.max=1;

                volumebar.step=0.01;
                volumebar.value=0.5;
                volumebar.innerHTML="";

                volumebar.style.width="50px";
                volumebar.style.right="40px";

                var fsbutton = document.createElement('button');
                controls.appendChild(fsbutton);
                fsbutton.innerHTML="&#x25a1;";

                fsbutton.style.right="4px";
                
                var header = document.createElement('header');
                video.parentNode.insertBefore(header, video.nextSibling);

                var label = document.createElement('label');
                header.appendChild(label);
                label.innerHTML="Loading...";

                /*
			var savebutton = document.createElement('a');
			controls.appendChild(savebutton);
			savebutton.innerHTML="&#x1f847;";
			savebutton.style.lineHeight="32px";
			savebutton.style.position="absolute";
			savebutton.style.right="8px";
			savebutton.style.bottom="0";
			savebutton.style.border="none";
			savebutton.style.paddingTop="0";
			savebutton.style.paddingBottom="0";
			savebutton.style.paddingLeft="4px";
			savebutton.style.paddingRight="4px";
			savebutton.style.background="none";
			savebutton.style.fontFamily="Segoe UI Symbol";
			savebutton.style.fontSize="18px";
			savebutton.style.margin="0";
			savebutton.style.height="32px";

			savebutton.href=video.currentSrc;
			savebutton.download="";
*/
                playbutton.addEventListener("click", function() {
                    if (video.paused == true) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });

                video.addEventListener("click", function() {
                    if (video.paused == true) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });

                video.addEventListener("play", function() {
                    playbutton.innerHTML = "&#10074;&#10074;";
                    //controls.className="playing";
                    videowrapper.classList.remove("paused");
                    videowrapper.classList.add("playing");
                });

                video.addEventListener("pause", function() {
                    playbutton.innerHTML = "&#x25b6;";
                    //controls.className="paused";
                    videowrapper.classList.remove("playing");
                    videowrapper.classList.add("paused");
                });

                video.addEventListener("timeupdate", function() {
                    timestamp.innerHTML = HHMMSS(video.currentTime) + "/" + HHMMSS(video.duration);
                });

                video.addEventListener("durationchange", function() {
                    timestamp.innerHTML = HHMMSS(video.currentTime) + "/" + HHMMSS(video.duration);
                });

                mutebutton.addEventListener("click", function() {
                    if (video.muted == false) {
                        video.muted = true;
                    } else {
                        video.muted = false;
                    }
                });

                var togglefs = function() {
                    if (fs_status()>0) {
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                        } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                        } else if (document.msExitFullscreen) {
                            document.msExitFullscreen();
                        }
                    }
                    else {

                        if (videowrapper.requestFullscreen) {
                            videowrapper.requestFullscreen();
                        } else if (videowrapper.mozRequestFullScreen) {
                            videowrapper.mozRequestFullScreen(); // Firefox
                        } else if (videowrapper.webkitRequestFullscreen) {
                            videowrapper.webkitRequestFullscreen(); // Chrome and Safari
                        }
                    }
                };
              
                fsbutton.addEventListener("click", togglefs);
              
                videowrapper.addEventListener("dblclick", togglefs);

                seekbar.addEventListener("input", function() {
                    var time = video.duration * (seekbar.value / 100);
                    video.currentTime = time;

                });


                video.addEventListener("timeupdate", function() {
                    var value = (100 / video.duration) * video.currentTime;
                    var progress = (video.currentTime / video.duration);
                    seekbar.value = value;
                    //seekbar.style.background = '-webkit-gradient( linear, left top, right top, color-stop(' + progress + ', var(--range-progress-color)), color-stop(' + progress + ', var(--range-background-color)))';
                });

                var updatebuffer = function() {
                    var start = video.buffered.length>0 ? ( video.buffered.start(0) / video.duration) : 0;
                    var end = video.buffered.length>0 ? (video.buffered.end(0) / video.duration) : 0;
                    seekbar.style.background = '-webkit-gradient( linear, left top, right top, color-stop(' + start + ', var(--range-background-color)), color-stop(' + start + ', var(--range-progress-color)), color-stop(' + end  + ', var(--range-progress-color)), color-stop(' + end + ', var(--range-background-color)))';
                    
                    if (video.videoHeight>0) {
                        videowrapper.classList.remove("audiomode");
                        videowrapper.classList.add("videomode");
                    } else {
                        videowrapper.classList.remove("videomode");
                        videowrapper.classList.add("audiomode");
                    }
                    
                    if (video.currentSrc && video.currentSrc.length>0) {
                        label.innerHTML = decodeURIComponent(video.currentSrc.split("/").pop());
                    }
                };

                video.addEventListener("timeupdate", updatebuffer);
                video.addEventListener("canplay", updatebuffer);
                video.addEventListener("progress", updatebuffer);
                video.addEventListener("canplaythrough", updatebuffer);

                seekbar.addEventListener("mousedown", function() {
                    seekbar.paused = video.paused;
                    video.pause();
                });

                // Play the video when the slider handle is dropped
                seekbar.addEventListener("mouseup", function() {
                    if (!seekbar.paused) {
                        video.play();
                    }
                });

                volumebar.addEventListener("input", function() {
                    video.volume = volumebar.value;
                    

                });
                
                video.addEventListener('wheel', function(e) {
                    var volumedelta = 0.10;
                    if (e.deltaY < 0) {
                        video.volume = Math.min(video.volume+volumedelta, 1);
                    }
                    if (e.deltaY > 0) {
                        video.volume = Math.max(video.volume-volumedelta, 0);
                    }
                    volumebar.value = video.volume;
                });

                var updatevolume = function() {
                    if (video.muted || video.volume==0) {
                        mutebutton.innerHTML = "&#x1f507;";
                    } else {
                        mutebutton.innerHTML = "&#x1f50a;";
                    }
                    volumebar.style.background = '-webkit-gradient( linear, left top, right top, color-stop(' + video.volume + ', var(--range-progress-color)), color-stop(' + video.volume + ', var(--range-background-color)))';
                    
                    localStorage.setItem("videovolume", video.volume);
                }

                video.addEventListener("volumechange", updatevolume);

                volumebar.value = localStorage.getItem("videovolume", video.volume);
                video.volume = volumebar.value;
              
                var autohide_controls = function() {
                    videowrapper.classList.remove("mouseover");
                }
              
                videowrapper.addEventListener("mousemove", function() {
                    videowrapper.classList.add("mouseover");
                    if (video.controls_timeout) {
                      clearTimeout(video.controls_timeout);
                    }
                    
                    video.controls_timeout = setTimeout(autohide_controls, 1000);
                    //seekbar.style.background = '-webkit-gradient( linear, left top, right top, color-stop(' + progress + ', var(--range-progress-color)), color-stop(' + progress + ', var(--range-background-color)))';
                });

              
              
                updatebuffer();
              
                updatevolume();

                //seekbar.style.background = '-webkit-gradient( linear, left top, right top, color-stop(' + seekbar.value / 100 + ', var(--range-progress-color)), color-stop(' + seekbar.value / 100 + ', var(--range-background-color)))';
                //volumebar.style.background = '-webkit-gradient( linear, left top, right top, color-stop(' + video.volume + ', var(--range-progress-color)), color-stop(' + video.volume + ', var(--range-background-color)))';
            }
        })(videos[i])
    }
}

var stylesheet = `
videowrapper {
	--background-color: rgba(0, 0, 0, 0.5);
    --controls-color: #dcdcdc;
    --range-progress-color: #8c8c8c;
    --range-background-color: #3c3c3c;

    position: relative;
    width: auto;
    display: block;
    font-size: 0px;
}
videowrapper video {
    position: relative;
    max-height: 100vh;
}
videowrapper:-webkit-full-screen {
    height: 100%;
    width: 100%;
    background: inherit;
}
videowrapper:-webkit-full-screen video {
    width: 100%;
    height: 100%;
}
videowrapper video::-webkit-media-controls-enclosure {
  display:none !important;
}
videowrapper:-webkit-full-screen controls,
videowrapper:-webkit-full-screen header {
  z-index: 2147483647;
}

videowrapper controls > *,
videowrapper header > * {
    color: var(--controls-color);
    /* mix-blend-mode: difference; */
    background: none;
    outline: none;
    line-height: 32px;
    position: absolute;
}

videowrapper controls,
videowrapper header {
    overflow: hidden;
    white-space: nowrap;

	transition: all 0.5s ease !important;
    background-color: var(--background-color) !important;
    height: 32px !important;
    width: 100% !important;
    display: block !important;
    position: absolute !important;
    cursor: default !important;
    font-size: 18px !important;
    user-select: none;
}
videowrapper controls {
    bottom: 0px !important;
}
videowrapper header {
    top: 0px !important;
}

videowrapper controls,
videowrapper header {
	opacity: 1;
}
videowrapper.playing controls,
videowrapper.playing header {
	opacity: 0;
}
videowrapper controls:hover, videowrapper.mouseover controls, videowrapper.paused controls, videowrapper.audiomode controls,
videowrapper header:hover, videowrapper.mouseover header, videowrapper.paused header, videowrapper.audiomode header {
	opacity: 1;
}

videowrapper button, videowrapper label {
    line-height: 32px !important;
    position: absolute !important;
    bottom: 0px !important;
    border: none !important;
    padding: 0px 4px !important;
    background-color: none !important;
    font-family: "Segoe UI Symbol" !important;
    font-size: 18px !important;
    margin: 0px !important;
    height: 32px !important;
}
videowrapper input[type=range] {
    line-height: 32px !important;
    position: absolute !important;
    background-color: var(--range-background-color) !important;

    bottom: 10px !important;
    height: 10px !important;
    border: none !important;
    margin: 0px !important;
    border-radius: 6px !important;
    -webkit-appearance: none !important;
}
videowrapper input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    background-color: var(--controls-color);
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
}

videowrapper.audiomode video:-webkit-full-page-media {
    width: 600px;
}
videowrapper.audiomode:before {
    content: '♫';
    position: absolute;
    left: 50%;
    top: calc(50%);
    color: white;
    font-size: 64px;
    z-index: 1;
    transform: translate(-50%, -50%);
    pointer-events: none;
}

videowrapper label {
    right: 0;
    min-width: 100%;
    text-align: left;
    box-sizing: border-box;
}
`;

if (typeof GM_addStyle != "undefined") {
  GM_addStyle (stylesheet);
} else {
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = stylesheet;
  document.head.appendChild(css);
}

init_videowrapper();
unsafeWindow.init_videowrapper = init_videowrapper;

