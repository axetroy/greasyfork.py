// ==UserScript==
// @name        Dailymotion Raw Html5 Player
// @namespace   zeusex81@gmail.com
// @description Replaces dailymotion's flash player with html5
// @version     4.2
// @include     http://www.dailymotion.com/*
// @include     https://www.dailymotion.com/*
// @icon        https://i.imgur.com/O9PEPCF.png
// @license     MIT
// @license     hls.js   https://github.com/dailymotion/hls.js/blob/master/LICENSE
// @license     ionicons https://github.com/driftyco/ionicons/blob/master/LICENSE
// @grant       GM.getValue
// @grant       GM.setValue
// @grant       GM.xmlHttpRequest
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       unsafeWindow
// @connect     dailymotion.com
// ==/UserScript==

(function() {
    var replacePlayer = async function() {
        //VARIABLES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VARIABLES//
        if(!metadata.qualities.auto) return; // no auto means offline live
        var wnd      = typeof(unsafeWindow) != "undefined" ? unsafeWindow : window;
        var xhr      = typeof(GM) != "undefined" ? GM.xmlHttpRequest : typeof(GM_xmlhttpRequest) != "undefined" ? GM_xmlhttpRequest : null;
        var addStyle = typeof(GM_addStyle) != "undefined" ? GM_addStyle :
        async function(css) {
            return new Promise(function(resolve, reject) {
                var style = document.createElement("STYLE");
                style.onload    = resolve;
                style.onerror   = reject;
                style.innerHTML = css;
                document.head.appendChild(style);
            });
        };
        var addScript = async function(src) {
            return new Promise(function(resolve, reject) {
                var script = document.createElement("SCRIPT");
                script.onload  = resolve;
                script.onerror = reject;
                script.async   = true;
                script.src     = src;
                document.head.appendChild(script);
            });
        };
        var getValue = typeof(GM) != "undefined" ? GM.getValue : typeof(GM_getValue) != "undefined" ? GM_getValue :
                       function(name, value) { return localStorage.getItem(name) || value; };
        var setValue = typeof(GM) != "undefined" ? GM.setValue : typeof(GM_setValue) != "undefined" ? GM_setValue :
                       function(name, value) { localStorage.setItem(name, value); };

        var dmp_Video = document.getElementById("dmp_Video");
        if(dmp_Video) dmp_Video.onplaying = function() { dmp_Video.src = ""; }; // ensures not having an invisible player running in background
        var settings = JSON.parse(await getValue("zeusDRHP", '["auto","auto","auto",true,"#ffdd55"]'));
        if(settings[3] === undefined) settings[3] = true;
        if(settings[4] === undefined) settings[4] = "#ffdd55";
        var time     = metadata.stream_type == "live" ? -1 : 0;
        var muted    = settings[1] == "yes";
        var paused   = settings[2] == "no";
        var hls      = null;
        try {
            if(metadata.stream_type != "live" && /[?&]start=([^&#]+)/i.test(location.search))
                time = parseInt(RegExp.$1);
            if(settings[2] == "auto" && location.pathname.startsWith("/embed") &&
            (!/[?&]autoPlay=([^&#]+)/i.test(location.search) || /^(false|0)$/i.test(RegExp.$1)))
                paused = true;
            if(settings[1] == "auto" && location.pathname.startsWith("/embed") && !paused &&
            (/[?&]mute=([^&#]+)/i.test(location.search) && !/^(false|0)$/i.test(RegExp.$1)))
                muted = true;
        } catch(e) {}
        var embedded = true;
        try { embedded = top.location.hostname != location.hostname; } catch(e) {}
        var getDuration = function() {
            var duration = zVideo.duration || metadata.duration;
            if(duration == Infinity) duration = 0;
            return duration;
        };
        var time2str = function(t) {
            return new Date(t*1000).toISOString().slice(getDuration() >= 3600 ? 11 : 14, 19);
        };
        var isFullscreenEnabled = function() {
            return  document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
        };
        var isFullscreen = function() {
            return (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) == player;
        };
        var toggleFullscreen = function() {
            if(isFullscreen())
                 (document.exitFullscreen  || document.webkitExitFullscreen    || document.mozCancelFullScreen  || document.msExitFullscreen ).call(document);
            else (player.requestFullscreen || player.webkitRequestFullscreen   || player.mozRequestFullScreen   || player.msRequestFullscreen).call(player);
        };
        var onFullscreenChange = function(callback) {
            document.addEventListener("webkitfullscreenchange", callback);
            document.addEventListener("mozfullscreenchange", callback);
            document.addEventListener("fullscreenchange", callback);
        };
        //VARIABLES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VARIABLES//

        //HTML/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////HTML//
        addStyle(
            '#zPlayer { --zColor:'+settings[4]+'; position:absolute;'+(player.id ? ' width:100%; height:100%;' : '')+' overflow:hidden; z-index:1; } '+
            '#zVideo { position:absolute; width:100%; height:100%; outline:none; background-color:black; } '+
            '#zInterface { position:absolute; width:100%; height:100%; display:flex; flex-direction:column; opacity:0.9; font:14px sans-serif; color:white; '+
            '-moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; user-select:none; } '+
                '#zInterface * { color:inherit; border:0px solid grey; margin:0px; padding:0px; list-style:none; text-decoration:none; } '+
                '#zInfo { display:flex; justify-content:space-between; height:32px; background-color:black; border-bottom-width:1px; visibility:hidden; } '+
                '#zInterface.active #zInfo { visibility:visible; } '+
                    '#zOwner, #zTitle { font-weight:bold; margin:auto 8px; white-space:nowrap; overflow:hidden; } '+
                    '#zOwner:hover, #zTitle:hover { text-decoration:underline; } '+
                    '#zOwner { flex-shrink:0; max-width:30%; color:'+settings[4]+'; color:var(--zColor); } '+
                    '#zSpace { flex-grow:1; } '+
                '#zCentralView { flex:1; position:relative; cursor:none; } '+
                '#zCentralView.active { cursor:pointer; } '+
                    '#zSpinner { position:absolute; top:-32px; width:100%; height:4px; pointer-events:none; animation:loading 0.5s linear infinite alternate; visibility:hidden; '+
                    'background:no-repeat left/20% 100% linear-gradient('+settings[4]+','+settings[4]+'); background-image:linear-gradient(var(--zColor),var(--zColor)); } '+
                    '#zSpinner.active { visibility:visible; } '+
                        '@keyframes loading { from { background-position:left; } to { background-position:right; } } '+
                    '#zOSD { opacity:0.0; transition:opacity 1s linear; pointer-events:none; font-size:30px; text-shadow:0px 0px 8px black; } '+
                    '#zOSD.active { opacity:1.0; transition:none; } '+
                        '#zOSD > span { display:inline-block; width:60px; font-size:60px; text-align:center; } '+
                    '#zSharePanel { position:absolute; right:0px; top:-1px; width:33px; max-height:100%; border-width:0px 0px 1px 1px; '+
                    'background-color:color:'+settings[4]+'; background-color:var(--zColor); color:black; overflow:auto; text-align:center; visibility:hidden; } '+
                    '#zSharePanel.active { visibility:visible; } '+
                        '#zSharePanel a { display:block; padding:8px; text-align:center; } '+
                        '#zSharePanel a:hover { background-color:black; color:white; } '+
                    '#zSettingsPanel { position:absolute; right:0px; bottom:-1px; padding:8px; border-width:1px 0px 0px 1px; '+
                    'background-color:'+settings[4]+'; background-color:var(--zColor); color:black; cursor:default; visibility:hidden; } '+
                    '#zSettingsPanel.active { visibility:visible; } '+
                        '#zSettingsPanel li > * { display:inline-block; height:20px; vertical-align:top; } '+
                        '#zSettingsPanel label { width:128px; } '+
                        '.zSetting { width:80px; background-color:inherit; font:inherit; } '+
                    '#zSubtitlesPanel { position:absolute; right:0px; bottom:-1px; width:129px; max-height:100%; border-width:1px 0px 0px 1px; '+
                    'background-color:'+settings[4]+'; background-color:var(--zColor); color:black; overflow:auto; text-align:right; visibility:hidden; } '+
                    '#zSubtitlesPanel.active { visibility:visible; } '+
                        '#zSubtitlesPanel > li { padding:8px; text-transform:capitalize; } '+
                        '#zSubtitlesPanel > li:hover { background-color:black; color:white; } '+
                    '#zQualityPanel { position:absolute; right:0px; bottom:-1px; width:97px; max-height:100%; border-width:1px 0px 0px 1px; '+
                    'background-color:'+settings[4]+'; background-color:var(--zColor); color:black; overflow:auto; text-align:right; visibility:hidden; } '+
                    '#zQualityPanel.active { visibility:visible; } '+
                        '#zQualityPanel > li { padding:8px; text-transform:capitalize; } '+
                        '#zQualityPanel > li:hover { background-color:black; color:white; } '+
                            '.zDownload { font-size:20px !important; float:left; margin-top:-4px !important; } '+
                            '.zDownload:hover { color:'+settings[4]+' !important; color:var(--zColor) !important; } '+
                    '#zPreviewPanel { position:absolute; bottom:-1px; padding:8px 8px 0px; border-width:1px 1px 0px; '+
                    'background-color:black; text-align:center; visibility:hidden; } '+
                    '#zInterface.active #zPreviewPanel.active { visibility:visible; } '+
                        '#zPreviewImg { display:none; } '+
                        '#zPreviewImg.active { display:block; width:200px; background-size:1000% 1000%; } '+
                        '#zPreviewTimer, #zCurrentTimer, #zDurationTimer { font:bold 14px monospace; }'+
                '#zControls { display:flex; background-color:black; height:32px; border-top-width:1px; visibility:hidden; } '+
                '#zInterface.active #zControls { visibility:visible; } '+
                    '.zButton { flex-basis:32px; font-size:20px !important; padding-top:4px !important; text-align:center; cursor:pointer; } '+
                    '.zButton:hover { color:'+settings[4]+' !important; color:var(--zColor) !important; } '+
                    '.zButton.active { background-color:'+settings[4]+'; background-color:var(--zColor); color:black !important; } '+
                    '.zButtonCircled { flex-basis:32px; padding:5px 4px !important; text-align:center; cursor:pointer; } '+
                    '.zButtonCircled.active { background-color:'+settings[4]+'; background-color:var(--zColor); } '+
                        '.zButtonCircled > div { border-radius:4px; padding:2px 4px !important; background-color:white; color:black !important; } '+
                        '.zButtonCircled:hover > div { background-color:'+settings[4]+'; background-color:var(--zColor); } '+
                        '.zButtonCircled.active > div { background-color:black; color:'+settings[4]+' !important; color:var(--zColor) !important; } '+
                    '.zSlider { position:absolute; width:100%; left:0px; bottom:100%; padding:8px !important; background-color:black; border-width:1px 1px 0px !important; visibility:hidden; } '+
                    '.zButton:hover .zSlider { visibility:visible; } '+
                        '.zSlider > div { position:relative; width:4px; height:64px; margin:6px auto 0px !important; border-radius:4px; background-color:grey; } '+
                            '.zSlider > div > div { position:absolute; bottom:0px; width:100%; height:100%; border-radius:4px; '+
                            'background-color:'+settings[4]+'; background-color:var(--zColor); } '+
                                '.zSlider > div > div > div { position:absolute; top:-6px; right:-4px; width:12px; height:12px; '+
                                'border-radius:50%; background-color:white; box-shadow:0px 0px 4px black; } '+
                                '.zSlider:hover > div > div > div { background-color:'+settings[4]+'; background-color:var(--zColor); } '+
                    '#zVolumeButton, #zPlayButton { position:relative; } '+
                    '#zSeekBar { flex-grow:1; display:flex; flex-direction:column; justify-content:center; padding:0px 8px; cursor:pointer; } '+
                        '#zSeekGauge { position:relative; width:100%; height:4px; margin-bottom:2px; border-radius:4px; background-color:grey; } '+
                            '#zSeekBuffer, #zSeekProgress { position:absolute; height:100%; border-radius:4px; transition:width 0.25s linear; } '+
                            '#zSeekBuffer { background:repeat left/8px 100% white repeating-linear-gradient(-45deg, white, white 60%, grey 60%, grey 67%); } '+
                            '#zSeekProgress { background-color:'+settings[4]+'; background-color:var(--zColor); } '+
                            '#zSeekBar.active #zSeekProgress { transition:none; } '+
                                '#zSeekThumb { position:absolute; top:-4px; right:-6px; width:12px; height:12px; '+
                                'border-radius:50%; background-color:white; box-shadow:0px 0px 4px black; } '+
                                '#zSeekBar:hover #zSeekThumb { background-color:'+settings[4]+'; background-color:var(--zColor); } '+
                        '#zTimers { display:flex; justify-content:space-between; } '+
                            '#zCurrentTimer, #zDurationTimer { height:10px; } '+
                            '#zCurrentTimer { padding-right:16px;'+(metadata.stream_type == "live" ? ' color:'+settings[4]+'; color:var(--zColor);' : '')+' } '+
                    '#zQualityButton { flex-basis:96px; } '+
                        '#zQualityButton > div { text-transform:capitalize; }'
        );
        player.innerHTML =
            '<div id=zPlayer>'+
                '<link rel="stylesheet" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">'+
                '<video id=zVideo preload=none'+(paused ? ' poster="'+metadata.poster_url+'"' : '')+'></video>'+
                '<div id=zInterface'+(paused ? ' class=active' : '')+'>'+
                    '<div id=zInfo>'+
                        '<a id=zOwner'+(embedded ? ' target=_blank' : '')+' href="'+metadata.owner.url+'">'+metadata.owner.screenname.replace(/</g, "&lt;").replace(/>/g, "&gt;")+'</a>'+
                        '<a id=zTitle target=_blank href="'+metadata.url+'">'+metadata.title.replace(/</g, "&lt;").replace(/>/g, "&gt;")+'</a>'+
                        '<div id=zSpace></div>'+
                        (metadata.sharing && metadata.sharing.length > 0 ? '<a id=zShareButton class="zButton ion-paper-airplane"></a>' : '')+
                    '</div>'+
                    '<div id=zCentralView>'+
                        '<div id=zSpinner></div>'+
                        '<div id=zOSD></div>'+
                        (metadata.sharing && metadata.sharing.length > 0 ?
                        '<ul id=zSharePanel>'+
                            metadata.sharing.reduce(function(sum, data) {
                                sum += '<li><a target=_blank href="'+data.url+'" class="ion-';
                                switch(data.service) {
                                case "embed"    : sum += 'code'                   ; break;
                                case "facebook" : sum += 'social-facebook-outline'; break;
                                case "twitter"  : sum += 'social-twitter-outline' ; break;
                                default         : sum += 'link'                   ; break;
                                }
                                return sum+'" title="'+data.service+' "></a></li>'; // the space in title is here to prevent dailymotion from hiding facebook & twitter
                            }, "")+
                        '</ul>' : '')+
                        '<ul id=zSettingsPanel>'+
                            '<li><label>Default quality:</label><select class=zSetting>'+
                                '<option>auto</option><option>144p</option><option>240p</option><option>380p</option><option>480p</option>'+
                                '<option>720p</option><option>1080p</option><option>1440p</option><option>2160p</option>'+
                            '</select></li>'+
                            '<li><label>Default mute:</label><select class=zSetting>'+
                                '<option>auto</option><option>yes</option><option>no</option>'+
                            '</select></li>'+
                            '<li><label>Default autoplay:</label><select class=zSetting>'+
                                '<option>auto</option><option>yes</option><option>no</option>'+
                            '</select></li>'+
                            '<li><label>Prefer HLS to MP4:</label><input type=checkbox class=zSetting></li>'+
                            '<li><label>Main color:</label><input type=color class=zSetting></li>'+
                        '</ul>'+
                        (metadata.subtitles.enable ?
                        '<ul id=zSubtitlesPanel>'+
                            '<li>none</li>'+
                            Object.keys(metadata.subtitles.data).reduce(function(sum, lang) {
                                return sum+'<li data-value="'+lang+'">'+metadata.subtitles.data[lang].label+
                                        '<a target=_blank class="zDownload ion-arrow-down-a" href="'+metadata.subtitles.data[lang].urls[0]+
                                        '" download="'+metadata.title.replace(/"/g, "&quot;")+' '+lang+'.srt"></a></li>';
                            }, "")+
                        '</ul>' : '')+
                        '<ul id=zQualityPanel></ul>'+
                        '<div id=zPreviewPanel>'+
                            (metadata.stream_type != "live" && metadata.filmstrip_url ? '<img id=zPreviewImg src="'+metadata.filmstrip_url+'">' : '')+
                            '<span id=zPreviewTimer></span>'+
                        '</div>'+
                    '</div>'+
                    '<div id=zControls>'+
                        '<a id=zPlayButton class="zButton ion-play">'+
                            '<div id=zSpeedSlider class=zSlider><div><div style="height:50%;"><div></div></div></div></div>'+
                        '</a>'+
                        '<a id=zVolumeButton class="zButton ion-android-volume-up">'+
                            '<div id=zVolumeSlider class=zSlider><div><div><div></div></div></div></div>'+
                        '</a>'+
                        '<div id=zSeekBar>'+
                            '<div id=zSeekGauge><div id=zSeekBuffer></div><div id=zSeekProgress><div id=zSeekThumb></div></div></div>'+
                            '<div id=zTimers><span id=zCurrentTimer>LIVE</span><span id=zDurationTimer>0&nbsp;viewers</span></div>'+
                        '</div>'+
                        '<a id=zSettingsButton class="zButton ion-gear-a"></a>'+
                        (isFullscreenEnabled() ? '<a id=zFullscreenButton class="zButton ion-arrow-expand"></a>' : '')+
                        (metadata.subtitles.enable ? '<a id=zSubtitlesButton class=zButtonCircled><div>cc</div></a>' : '')+
                        '<a id=zQualityButton class=zButtonCircled><div>auto</div></a>'+
                    '</div>'+
                '</div>'+
            '</div>';
        var zPlayer           = document.getElementById("zPlayer");
        var zVideo            = document.getElementById("zVideo");
        var zInterface        = document.getElementById("zInterface");
        var zCentralView      = document.getElementById("zCentralView");
        var zTitle            = document.getElementById("zTitle");
        var zOwner            = document.getElementById("zOwner");
        var zShareButton      = document.getElementById("zShareButton");
        var zSpinner          = document.getElementById("zSpinner");
        var zOSD              = document.getElementById("zOSD");
        var zSharePanel       = document.getElementById("zSharePanel");
        var zSettingsPanel    = document.getElementById("zSettingsPanel");
        var zSubtitlesPanel   = document.getElementById("zSubtitlesPanel");
        var zQualityPanel     = document.getElementById("zQualityPanel");
        var zPreviewPanel     = document.getElementById("zPreviewPanel");
        var zPreviewImg       = document.getElementById("zPreviewImg");
        var zPreviewTimer     = document.getElementById("zPreviewTimer");
        var zPlayButton       = document.getElementById("zPlayButton");
        var zSpeedSlider      = document.getElementById("zSpeedSlider");
        var zVolumeButton     = document.getElementById("zVolumeButton");
        var zVolumeSlider     = document.getElementById("zVolumeSlider");
        var zSeekBar          = document.getElementById("zSeekBar");
        var zSeekGauge        = document.getElementById("zSeekGauge");
        var zSeekProgress     = document.getElementById("zSeekProgress");
        var zSeekBuffer       = document.getElementById("zSeekBuffer");
        var zCurrentTimer     = document.getElementById("zCurrentTimer");
        var zDurationTimer    = document.getElementById("zDurationTimer");
        var zSettingsButton   = document.getElementById("zSettingsButton");
        var zFullscreenButton = document.getElementById("zFullscreenButton");
        var zSubtitlesButton  = document.getElementById("zSubtitlesButton");
        var zQualityButton    = document.getElementById("zQualityButton");
        //HTML/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////HTML//

        //INTERFACE///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////INTERFACE//
        zInterface.show = function(duration) {
            zInterface.classList.add("active");
            clearTimeout(zInterface.timeout);
            if(duration > 0)
                zInterface.timeout = setTimeout(zInterface.hide, duration);
            if(!zSettingsButton.classList.contains("active"))
                zVideo.focus();
        };
        zInterface.hide = function() {
            if(embedded && !isFullscreen())
                zVideo.blur();
            if(zVideo.ended || zVideo.poster || zSettingsButton.classList.contains("active") || zQualityButton.classList.contains("active") ||
            (zSubtitlesButton && zSubtitlesButton.classList.contains("active")) || (zShareButton && zShareButton.classList.contains("active")))
                return;
            zInterface.classList.remove("active");
            clearTimeout(zInterface.timeout);
        };
        zInterface.onmousemove = function() {
            if(!isFullscreen()) zInterface.show(0);
        };
        zInterface.onmouseleave = function() {
            zInterface.hide();
        };
        zCentralView.showPointer = function(duration) {
            zCentralView.classList.add("active");
            clearTimeout(zCentralView.timeout);
            if(duration > 0)
                zCentralView.timeout = setTimeout(zCentralView.hidePointer, duration);
        };
        zCentralView.hidePointer = function() {
            zCentralView.classList.remove("active");
            clearTimeout(zCentralView.timeout);
        };
        zCentralView.onmousemove = function() {
            zCentralView.showPointer(2000);
            if(isFullscreen()) zInterface.hide();
        };
        zCentralView.onmouseleave = function() {
            if(isFullscreen()) zInterface.show(0);
        };
        zVideo.onended = function() {
            time = 0;
            paused = true;
            if(isFullscreen())                        toggleFullscreen();
            if(zSeekBar.classList.contains("active")) zSeekBar.onmouseup({button:0});
            zInterface.show(0);
            zSpinner.classList.remove("active");
            zOSD.print('<span class="ion-stop"></span>Stop');
        };
        zVideo.onwaiting = function() {
            if(!zVideo.ended)
                zSpinner.classList.add("active");
        };
        zVideo.onplaying = function() {
            zSpinner.classList.remove("active");
            if(player.parentNode.style.zIndex == -1) paused = true; // mobile closed player
            if(player.parentNode.parentNode.style.zIndex == -1) paused = true; // closed mini player
        };
        zOSD.print = function(text) {
            zOSD.innerHTML = text;
            zOSD.classList.add("active");
            clearTimeout(zOSD.timeout);
            zOSD.timeout = setTimeout(function() { zOSD.classList.remove("active"); }, 2000);
        };
        //INTERFACE///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////INTERFACE//

        //TITLE///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////TITLE//
        zTitle.onmouseenter =
        zOwner.onmouseenter = function() {
            zTitle.href = metadata.url;
            this.title = this.scrollWidth > this.clientWidth ? this.textContent : "";
        };
        zTitle.onmouseleave = function() {
            zTitle.href = metadata.url;
        };
        zTitle.onclick =
        zOwner.onclick = function() {
            if(metadata.stream_type != "live" && this == zTitle)
                zTitle.href = metadata.url+"?start="+parseInt(time);
            if(!paused) zPlayButton.onclick();
        };
        //TITLE///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////TITLE//

        //SHARE///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SHARE//
        if(zShareButton) {
            [].slice.call(zSharePanel.getElementsByTagName("A")).forEach(function(e) {
                e.onclick = zOwner.onclick;
            });
            zShareButton.onclick = function() {
                if(zSubtitlesButton) zSubtitlesButton.classList.remove("active");
                if(zSubtitlesButton) zSubtitlesPanel.classList.remove("active");
                zQualityButton.classList.remove("active");
                zQualityPanel.classList.remove("active");
                zSettingsButton.classList.remove("active");
                zSettingsPanel.classList.remove("active");
                zShareButton.classList.toggle("active");
                zSharePanel.classList.toggle("active");
            };
        }
        //SHARE///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SHARE//

        //PLAY/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////PLAY//
        zCentralView.onclick = function(e) {
            if(e.target == zCentralView)
                zPlayButton.onclick();
        };
        zPlayButton.onclick = function() {
            if(zVideo.poster) {
                zVideo.removeAttribute("poster");
                zQualityButton.onchange();
            }
            paused = !paused;
            if(paused) zVideo.pause();
            else       zVideo.play();
            zOSD.print(zVideo.paused ? '<span class="ion-pause"></span>Pause' : '<span class="ion-play"></span>Play');
        };
        zVideo.onpause =
        zVideo.onplay = function() {
            zPlayButton.classList.remove(zVideo.paused ? "ion-pause" : "ion-play");
            zPlayButton.classList.add(zVideo.paused ? "ion-play" : "ion-pause");
        };
        zPlayButton.onwheel = function(e) {
            var v = zVideo.playbackRate*10;
            v += e.deltaY > 0 ? -1 : 1;
            v = e.deltaY > 0 ? Math.ceil(v)/10  : Math.floor(v)/10;
            zVideo.playbackRate = Math.min(Math.max(0.0625, v), 16);
            e.stopPropagation();
            e.preventDefault();
            zVideo.onplaybackRatechange();
        };
        zSpeedSlider.onmousedown = function(e) {
            if(e.button !== 0) return;
            zSpeedSlider.setCapture();
            zSpeedSlider.classList.add("active");
            zSpeedSlider.onmousemove(e);
        };
        zSpeedSlider.onmouseup = function(e) {
            if(e.button !== 0) return;
            zSpeedSlider.releaseCapture();
            zSpeedSlider.classList.remove("active");
        };
        zSpeedSlider.onclick = function(e) {
            e.stopPropagation();
        };
        zSpeedSlider.onmousemove = function(e) {
            if(zSpeedSlider.classList.contains("active")) {
                var rect = zSpeedSlider.firstChild.getBoundingClientRect();
                var pct  = 1 - Math.min(Math.max(0, (e.clientY-rect.top)/rect.height), 1);
                zVideo.playbackRate = pct >= 0.5 ? (pct-0.5)*2*15+1 : (pct*2*15+1)/16;
                zVideo.onplaybackRatechange();
            }
        };
        zVideo.onplaybackRatechange = function() {
            zSpeedSlider.firstChild.firstChild.style.height = (zVideo.playbackRate >= 1 ? (zVideo.playbackRate-1)/15/2+0.5 : (zVideo.playbackRate*16-1)/15/2)*100+"%";
            zOSD.print('<span class="ion-ios-fastforward"></span>x'+zVideo.playbackRate.toFixed(2));
        };
        //PLAY/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////PLAY//

        //VOLUME/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VOLUME//
        zQualityPanel.onwheel = function(e) {
            if(this.classList.contains("active") && this.scrollHeight > this.clientHeight)
                e.stopPropagation();
        };
        if(zSubtitlesButton)
            zSubtitlesPanel.onwheel = zQualityPanel.onwheel;
        zInterface.onwheel = function(e) {
            if(document.activeElement == zVideo && (!embedded || isFullscreen()))
                zVolumeButton.onwheel(e);
        };
        zVolumeButton.onwheel = function(e) {
            var v = zVideo.muted ? 0 : Math.round(zVideo.volume*100);
            v = e.deltaY > 0 ? Math.max(0, v-5) : Math.min(v+5, 100);
            zVideo.volume = v/100;
            zVideo.muted  = zVideo.volume === 0;
            e.stopPropagation();
            e.preventDefault();
        };
        zVolumeButton.onclick = function() {
            zVideo.muted = !zVideo.muted;
            if(!zVideo.muted && zVideo.volume === 0)
                zVideo.volume = 0.1;
        };
        zVolumeSlider.onmousedown = function(e) {
            if(e.button !== 0) return;
            zVolumeSlider.setCapture();
            zVolumeSlider.classList.add("active");
            zVolumeSlider.onmousemove(e);
        };
        zVolumeSlider.onmouseup = function(e) {
            if(e.button !== 0) return;
            zVolumeSlider.releaseCapture();
            zVolumeSlider.classList.remove("active");
        };
        zVolumeSlider.onclick = function(e) {
            e.stopPropagation();
        };
        zVolumeSlider.onmousemove = function(e) {
            if(zVolumeSlider.classList.contains("active")) {
                var rect = zVolumeSlider.firstChild.getBoundingClientRect();
                zVideo.volume = 1 - Math.min(Math.max(0, (e.clientY-rect.top)/rect.height), 1);
                zVideo.muted  = zVideo.volume === 0;
            }
        };
        zVideo.onvolumechange = function() {
            zVolumeButton.classList.remove(zVideo.muted ? "ion-android-volume-up" : "ion-android-volume-off");
            zVolumeButton.classList.add(zVideo.muted ? "ion-android-volume-off" : "ion-android-volume-up");
            zVolumeSlider.firstChild.firstChild.style.height = (zVideo.muted ? 0 : zVideo.volume*100)+"%";
            zOSD.print('<span class="ion-android-volume-mute"></span>'+Math.round(zVideo.muted ? 0 : zVideo.volume*100)+"%");
        };
        //VOLUME/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VOLUME//

        //SEEKBAR///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SEEKBAR//
        zVideo.onprogress = function() {
            zVideo.onplaying();
            zVideo.ontimeupdate();
        };
        zVideo.ontimeupdate = function() {
            zQualityButton.update();
            var duration    = getDuration();
            var currentTime = zVideo.currentTime || time;
            if(metadata.stream_type != "live") {
                zCurrentTimer.textContent  = time2str(currentTime);
                zDurationTimer.textContent = time2str(duration);
            }
            if(!zSeekBar.classList.contains("active") && zVideo.readyState >= 1)
                time = currentTime;
            zSeekProgress.style.width = (time == -1 || duration === 0 ? 100 : time*100/duration)+"%";
            var buffered = 0;
            if(duration > 0)
                for(var i = 0; i < zVideo.buffered.length; i++) {
                    if(currentTime >= zVideo.buffered.start(i) && currentTime <= zVideo.buffered.end(i))
                        buffered = Math.max(buffered, zVideo.buffered.end(i)*100/duration);
                }
            zSeekBuffer.style.width = buffered+"%";
        };
        zSeekBar.onmousedown = function(e) {
            if(e.button !== 0) return;
            zSeekBar.setCapture();
            zSeekBar.classList.add("active");
            zSeekBar.timeout = null;
            zSeekBar.onmousemove(e);
        };
        zSeekBar.onmouseup = function(e) {
            if(e.button !== 0) return;
            if(zSeekBar.timeout) {
                clearTimeout(zSeekBar.timeout);
                zVideo.currentTime = time;
                zSeekBar.timeout   = null;
            }
            zSeekBar.classList.remove("active");
            zSeekBar.releaseCapture();
        };
        zSeekBar.onmousemove = function(e) {
            var duration = getDuration();
            if(duration === 0) return;
            var rect     = zSeekGauge.getBoundingClientRect();
            var x        = Math.min(Math.max(0, (e.clientX-rect.left)/rect.width), 1);
            if(zSeekBar.classList.contains("active")) {
                time = x*duration;
                zVideo.ontimeupdate();
                clearTimeout(zSeekBar.timeout);
                zSeekBar.timeout = setTimeout(function() {
                    zVideo.currentTime = time;
                    zSeekBar.timeout   = null;
                }, zSeekBar.timeout ? 500 : 0);
            }
            zPreviewTimer.textContent = metadata.stream_type == "live" ? "-"+time2str((1-x)*duration) : time2str(x*duration);
            if(zPreviewImg) {
                x = Math.round(x*99);
                zPreviewImg.style.backgroundPosition = (x%10*-100)+"% "+(Math.floor(x/10)*-100)+"%";
            }
            x = e.clientX-zCentralView.getBoundingClientRect().left-zPreviewPanel.getBoundingClientRect().width/2;
            zPreviewPanel.style.left = Math.min(Math.max(-1, x), zVideo.clientWidth-199)+"px";
            zPreviewPanel.classList.add("active");
        };
        zSeekBar.onmouseleave = function() {
            zPreviewPanel.classList.remove("active");
        };
        if(zPreviewImg) {
            zPreviewImg.onload = function() {
                zPreviewImg.style.backgroundImage = 'url('+zPreviewImg.src+')';
                zPreviewImg.style.height = Math.round(200*zPreviewImg.naturalHeight/zPreviewImg.naturalWidth)+"px";
                zPreviewImg.removeAttribute("src");
                zPreviewImg.classList.add("active");
            };
        }
        if(metadata.stream_type == "live") {
            zDurationTimer.update = function() {
                var req = new XMLHttpRequest();
                req.open("GET", "https://api.dailymotion.com/video/"+metadata.id+"?fields=audience");
                req.onload = function() {
                    var data = JSON.parse(req.responseText);
                    if(data && data.audience) zDurationTimer.innerHTML = data.audience+"&nbsp;viewers";
                };
                req.send();
            };
        }
        //SEEKBAR///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SEEKBAR//

        //SETTINGS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SETTINGS//
        [].slice.call(zSettingsPanel.getElementsByClassName("zSetting")).forEach(function(e, i) {
            e.onchange = function() {
                settings[i] = i == 3 ? e.checked : e.value;
                setValue("zeusDRHP", JSON.stringify(settings));
                if(i == 3 && !isNaN(zQualityButton.value))
                    zQualityButton.onchange();
            };
            switch(i) {
            case 0: case 1: case 2:
                e.selectedIndex = [].slice.call(e.options).findIndex(function(o) { return settings[i] == o.text; });
                break;
            case 3:
                e.checked = settings[i];
                break;
            case 4:
                e.value = settings[i];
                e.oninput = function() { zPlayer.style.setProperty("--zColor", e.value); };
                break;
            }
        });
        zSettingsButton.onclick = function() {
            if(zShareButton) zShareButton.classList.remove("active");
            if(zShareButton) zSharePanel.classList.remove("active");
            if(zSubtitlesButton) zSubtitlesButton.classList.remove("active");
            if(zSubtitlesButton) zSubtitlesPanel.classList.remove("active");
            zQualityButton.classList.remove("active");
            zQualityPanel.classList.remove("active");
            zSettingsButton.classList.toggle("active");
            zSettingsPanel.classList.toggle("active");
        };
        //SETTINGS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SETTINGS//

        //FULLSCREEN/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////FULLSCREEN//
        if(zFullscreenButton) {
            zCentralView.ondblclick = function(e) {
                if(e.target != zCentralView) return;
                zFullscreenButton.onclick();
                zOSD.print('');
            };
            zFullscreenButton.onclick = function() {
                toggleFullscreen();
                zInterface.show(2000);
                zCentralView.showPointer(2000);
            };
            onFullscreenChange(function() {
                if(isFullscreen()) {
                    zFullscreenButton.classList.remove("ion-arrow-expand");
                    zFullscreenButton.classList.add("ion-arrow-shrink");
                } else {
                    zFullscreenButton.classList.remove("ion-arrow-shrink");
                    zFullscreenButton.classList.add("ion-arrow-expand");
                }
            });
        }
        //FULLSCREEN/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////FULLSCREEN//

        //SUBTITLES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SUBTITLES//
        if(zSubtitlesButton) {
            zSubtitlesButton.onmousedown = function(e) {
                if(e.button !== 0) return;
                if(zShareButton) zShareButton.classList.remove("active");
                if(zShareButton) zSharePanel.classList.remove("active");
                zSettingsButton.classList.remove("active");
                zSettingsPanel.classList.remove("active");
                zQualityButton.classList.remove("active");
                zQualityPanel.classList.remove("active");
                zSubtitlesButton.classList.toggle("active");
                zSubtitlesPanel.classList.toggle("active");
            };
            zSubtitlesPanel.onmouseup = function(e) {
                if(e.button !== 0 || e.target.tagName != "LI") return;
                zSubtitlesButton.onmousedown(e);
                if(isFullscreen()) zInterface.hide();
                if(zSubtitlesButton.value == e.target.dataset.value) return;
                zSubtitlesButton.value                  = e.target.dataset.value;
                zSubtitlesButton.firstChild.textContent = e.target.dataset.value || "cc";
                zSubtitlesButton.onchange();
            };
            zSubtitlesButton.onchange = function() {
                var sub = metadata.subtitles.data[zSubtitlesButton.value];
                if(!sub) {
                    if(zVideo.textTracks[0])
                        zVideo.textTracks[0].mode = "hidden";
                } else if(sub.loaded) {
                    zVideo.innerHTML = '<track label="'+sub.label+'" kind=subtitles srclang="'+zSubtitlesButton.value+'" src="'+sub.urls[1]+'">';
                    zVideo.textTracks[0].mode = "showing";
                } else {
                    var req = new XMLHttpRequest();
                    req.open("GET", sub.urls[0]);
                    req.onload = function() {
                        var vtt = "WEBVTT\n\n"+req.response.replace(/\d+\n\d+:\d+:\d+,\d+ --> \d+:\d+:\d+,\d+\n\n\n/g, "") // remove empty lines
                                                           .replace(/(\d+:\d+:\d+),/g, "$1."); // convert srt to vtt
                        sub.loaded  = new Blob([vtt], {encoding:"UTF-8", type:"text/plain; charset=UTF-8"});
                        sub.urls[1] = URL.createObjectURL(sub.loaded);
                        zSubtitlesButton.onchange();
                    };
                    req.send();
                }
            };
        }
        //SUBTITLES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SUBTITLES//

        //QUALITY///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QUALITY//
        zQualityButton.onmousedown = function(e) {
            if(e.button !== 0) return;
            if(zShareButton) zShareButton.classList.remove("active");
            if(zShareButton) zSharePanel.classList.remove("active");
            if(zSubtitlesButton) zSubtitlesButton.classList.remove("active");
            if(zSubtitlesButton) zSubtitlesPanel.classList.remove("active");
            zSettingsButton.classList.remove("active");
            zSettingsPanel.classList.remove("active");
            zQualityButton.classList.toggle("active");
            zQualityPanel.classList.toggle("active");
            zQualityButton.update();
        };
        zQualityPanel.onmouseup = function(e) {
            if(e.button !== 0 || e.target.tagName != "LI") return;
            zQualityButton.onmousedown(e);
            if(isFullscreen()) zInterface.hide();
            if(zQualityButton.value == e.target.dataset.value) return;
            zQualityButton.value                  = e.target.dataset.value;
            zQualityButton.firstChild.textContent = e.target.textContent;
            zQualityButton.onchange();
        };
        zQualityPanel.update = function() {
            var selec = 0;
            zQualityPanel.innerHTML =
                Object.keys(metadata.qualities).sort(function(a, b) {
                    if(a == "auto")               a = 0;
                    else if(isNaN(a=parseInt(a))) a = 0xFFFF;
                    if(b == "auto")               b = 0;
                    else if(isNaN(b=parseInt(b))) b = 0xFFFF;
                    return a - b;
                }).reduce(function(sum, k, i) {
                    var text = isNaN(k) ? k.replace("@", "p") : k+"p";
                    if(k == "auto") {
                        text += '<a id=zScreenshotButton target=_blank class="zDownload ion-camera"></a>';
                    } else {
                        if(settings[0] != "auto" && (!selec || parseInt(settings[0]) >= parseInt(k)))
                            selec = i;
                        if(metadata.qualities[k][1])
                            text += '<a target=_blank class="zDownload ion-arrow-down-a" href="'+metadata.qualities[k][1].url+
                                    '" download="'+metadata.title.replace(/"/g, "&quot;")+' '+text+'.mp4"></a>';
                    }
                    return sum+'<li data-value='+k+'>'+text+'</li>';
                }, "");
            selec = zQualityPanel.children[selec];
            zQualityButton.value                  = selec.dataset.value;
            zQualityButton.firstChild.textContent = selec.textContent;
            zQualityButton.onchange();
            var zScreenshotButton = document.getElementById("zScreenshotButton");
            zScreenshotButton.onmouseleave = function() {
                zScreenshotButton.removeAttribute("href");
            };
            zScreenshotButton.onclick = function() {
                var canvas    = document.createElement("canvas");
                canvas.width  = zVideo.videoWidth;
                canvas.height = zVideo.videoHeight;
                var context   = canvas.getContext("2d");
                context.drawImage(zVideo, 0, 0, canvas.width, canvas.height);
                zScreenshotButton.href     = canvas.toDataURL("image/png");
                zScreenshotButton.download = metadata.title+" "+parseInt(time)+".png";
            };
        };
        zQualityButton.update = function() {
            var level = zQualityButton.value == "auto" ? hls ? hls.levelController.currentLevelIndex : adjustQuality(zVideo.videoHeight) : -1;
            if(zQualityButton.level == level) return;
            zQualityButton.level = level;
            if(level == -1) {
            } else if(hls) {
                level = hls.levels[level].name || adjustQuality(hls.levels[level].height);
                zQualityButton.firstChild.textContent = isNaN(level) ? "@"+level.replace("@", "p") : "@"+level+"p";
            } else {
                zQualityButton.firstChild.textContent = "@"+level+"p";
            }
        };
        zQualityButton.onchange = function() {
            if(zVideo.poster) return;
            var srcs = metadata.qualities[zQualityButton.value];
            var id   = srcs[1] && !settings[3] ? 1 : 0;
            if(xhr && !srcs[id].loaded)
                xhr({
                    method: "HEAD",
                    url: srcs[id].url,
                    onload: function(response) {
                        srcs[id].url = response.finalUrl || srcs[id].url;
                        srcs[id].loaded = true;
                        load(srcs, id);
                    },
                    onerror: function() { load(srcs, id); }
                });
            else load(srcs, id);
        };
        var adjustQuality = function(k) {
            if(!k)             k =   -1;
            else if(k <=  144) k =  144;
            else if(k <=  240) k =  240;
            else if(k <=  380) k =  380;
            else if(k <=  480) k =  480;
            else if(k <=  720) k =  720;
            else if(k <= 1080) k = 1080;
            else if(k <= 1440) k = 1440;
            else if(k <= 2160) k = 2160;
            return k;
        };
        var load = function(srcs, id) {
            var playbackRate = zVideo.playbackRate;
            if(hls) hls.detachMedia();
            if(srcs[id].type != "application/x-mpegURL" || !createHls()) {
            // if(zVideo.canPlayType(srcs[id].type)) {
                zVideo.src = srcs[id].url;
            } else {
                hls.loadSource(srcs[id].url);
                hls.attachMedia(zVideo);
            }
            zVideo.load();
            zVideo.playbackRate = playbackRate;
            if(time != -1) zVideo.currentTime = time;
            if(paused) zVideo.pause();
            else       zVideo.play();
        };
        var createHls = function() {
            if(hls) return true;
            if(typeof(wnd.Hls) == "undefined" || !wnd.Hls.isSupported()) return false;
            hls = new wnd.Hls();
            hls.on(wnd.Hls.Events.ERROR, function(_, data) {
                if (!data.fatal) return;
                switch(data.type) {
                case wnd.Hls.ErrorTypes.NETWORK_ERROR: hls.startLoad();         break;
                case wnd.Hls.ErrorTypes.MEDIA_ERROR:   hls.recoverMediaError(); break;
                default:                               hls.destroy();           break;
                }
            });
            hls.on(wnd.Hls.Events.MANIFEST_PARSED, function(_, data) {
                if(zQualityButton.value != "auto") return;
                var changed = false;
                for(var i = 0; i < data.levels.length; i++) {
                    var k = data.levels[i].name || adjustQuality(data.levels[i].height);
					if(k != -1 && !metadata.qualities[k]) {
                        metadata.qualities[k] = [{type:"application/x-mpegURL", url:data.levels[i].url[0], loaded:true}];
                        changed = true;
                    }
                }
                if(changed) zQualityPanel.update();
            });
            return true;
        };
        //QUALITY///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////QUALITY//

        //POLYFILL/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////POLYFILL//
        if(!zSeekBar.setCapture) {
            var capture = null;
            zSeekBar.setCapture     = zVolumeSlider.setCapture     = zSpeedSlider.setCapture     = function() { capture = this; };
            zSeekBar.releaseCapture = zVolumeSlider.releaseCapture = zSpeedSlider.releaseCapture = function() { capture = null; };
            window.addEventListener("mousemove" , function(e) { if(capture) capture.onmousemove(e); });
            window.addEventListener("mouseup"   , function(e) { if(capture) capture.onmouseup(e);   });
            window.addEventListener("mouseenter", function(e) { if(capture) e.stopPropagation();    }, true);
            window.addEventListener("mouseleave", function(e) { if(capture) e.stopPropagation();    }, true);
        }
        //POLYFILL/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////POLYFILL//

        //SHORTCUTS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SHORTCUTS//
        window.addEventListener("keydown", function(e) {
            if(embedded && !isFullscreen() && document.activeElement != zVideo) return;
            switch(e.keyCode) {
            case 13: // enter
                zFullscreenButton.onclick();
                break;
            case 32: // space
                zPlayButton.onclick();
                break;
            case 37: case 39: // left & right
                var duration = getDuration();
                if(duration > 0) {
                    time = zVideo.currentTime = Math.min(Math.max(0, zVideo.currentTime+(e.keyCode == 37 ? -5 : 5)), duration);
                    zVideo.ontimeupdate();
                    zOSD.print('<span class="ion-ios-skip'+(e.keyCode == 37 ? 'back' : 'for')+'ward"></span>'+time2str(time)+' / '+time2str(duration));
                    zInterface.show(2000);
                }
                break;
            case 38: case 40: // up & down
                e.deltaY = e.keyCode == 38 ? -1 : 1;
                zVolumeButton.onwheel(e);
                break;
            default: return;
            }
            e.stopPropagation();
            e.preventDefault();
        });
        //SHORTCUTS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SHORTCUTS//

        //INITIALIZE/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////INITIALIZE//
        await addScript("https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.light.min.js");
        if(!embedded) zVideo.focus();
        zVideo.muted = muted;
        zVideo.onvolumechange();
        zVideo.ontimeupdate();
        zQualityPanel.update();
        zOSD.print('');
        if(metadata.stream_type == "live") {
            zDurationTimer.update();
            setInterval(zDurationTimer.update, 30000);
        }
        //INITIALIZE/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////INITIALIZE//
    };

    //METADATA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////METADATA//
    var metadata, player;
    var findMetadata = function() {
        var template;
        [].slice.call(document.getElementsByTagName("SCRIPT")).some(function(e) {
            if(/"metadata":(.+)}/.test(e.innerHTML)) {
                metadata = JSON.parse(RegExp.$1);
                return true;
            } else if(/"metadata_template_url":(.+?),/.test(e.innerHTML)) {
                template = JSON.parse(RegExp.$1);
                return true;
            } else {
                return false;
            }
        });
        if(metadata) {
            replacePlayer();
        } else if(template) {
            new MutationObserver(function(mutations, observer) {
                var id = player.getElementsByClassName("dmp_VideoInfo-title-text")[0];
                id = id && id.href.match(/video\/(\w+)/)[1];
                if(!id) return;
                observer.disconnect();
                loadMetadata(template.replace(":videoId", id), replacePlayer);
            }).observe(player, {childList: true, subtree: true});
        }
    };
    var loadMetadata = function(url, callback) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.onload = function() {
            metadata = JSON.parse(req.responseText);
            if(metadata) callback();
        };
        req.send();
    };
    var findPlayer = function() {
        if(player = document.getElementById("player")) {
            findMetadata();
        } else if(document.getElementById("root")) {
            var url = location.pathname;
            setInterval(function() {
                if(player) {
                    if(url == location.pathname) return;
                    url = location.pathname;
                    id  = url.match(/video\/(\w+)/)[1];
                    if(!id || (metadata && metadata.id == id)) return;
                    loadMetadata("//www.dailymotion.com/player/metadata/video/"+id, replacePlayer);
                } else if(player = document.querySelector("div[class^=Player__body__]")) {
                    findMetadata();
                }
            }, 250);
        }
    };
    findPlayer();
    //METADATA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////METADATA//
})();