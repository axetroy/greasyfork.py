// ==UserScript==
// @name        Lazy Embedded Video
// @namespace   zeusex81@gmail.com
// @description Lazy load embedded videos from Youtube/Dailymotion/Vimeo/Rutube/Twitch/Ustream/Coub/Vine/Facebook
// @version     3.5
// @include     *
// @icon        https://i.imgur.com/rf0mFDM.png
// @license     MIT
// @grant       GM.getValue
// @grant       GM.setValue
// @grant       GM_getValue
// @grant       GM_setValue
// @run-at      document-start
// ==/UserScript==

(async function() {
    var a = document.createElement("A");
    try      { a.href = top.location.href; }
    catch(e) { a.href = document.referrer || location.href; }
    if(a.hostname && /(youtube|dailymotion|vimeo|rutube|twitch|ustream|coub|vine|facebook)\.[^.]+$/.test(a.hostname))
        return;

    var getValue = typeof(GM) != "undefined" ? GM.getValue : typeof(GM_getValue) != "undefined" ? GM_getValue :
                                 function(name, value) { return localStorage.getItem(name) || value; };
    var setValue = typeof(GM) != "undefined" ? GM.setValue : typeof(GM_setValue) != "undefined" ? GM_setValue :
                                 function(name, value) { localStorage.setItem(name, value); };

    var settings = JSON.parse(await getValue("zeusLEV", '[false,true,[]]'));
    while(typeof(settings) == "string") settings = JSON.parse(settings);
    if(settings[2].includes(location.hostname))
        return;
    window.addEventListener("message", async function(e) {
        if(!e.data.startsWith("zeusLEV")) return;
        var data = e.data.split(' ');
        switch(data[1]) {
        case "CSP"      : iframes[parseInt(data[2])].dataset.zeusLEV = 3; break;
        case "play"     : iframes[parseInt(data[2])].removeAttribute("srcdoc");
                          iframes[parseInt(data[2])].src = data[3];       break;
        case "settings" :
            settings = JSON.parse(await getValue("zeusLEV", '[false,true,[]]'));
            while(typeof(settings) == "string") settings = JSON.parse(settings);
            switch(data[2]) {
            case "autoplay"  : settings[0] = data[3] == 'true'; break;
            case "flash"     : settings[1] = data[3] == 'true'; break;
            case "reset"     : settings[2] = [];                break;
            case "whitelist" :
                observer.disconnect();
                cancelAnimationFrame(animation);
                if(!settings[2].includes(location.hostname))
                    settings[2].push(location.hostname);
                for(var i = 0; i < iframes.length; i++)
                    iframes[i].removeAttribute("srcdoc");
                break;
            }
            setValue("zeusLEV", JSON.stringify(settings));
            break;
        }
    });

    var html, iframes = [];
    var createHtml = function(url, src, api, background_img) {
        /(.*\/\/(?:[^.\/]+\.)?([^.\/]+)\.[^.\/]+)\//i.test(url);
        var provider_url = RegExp.$1, provider_name = RegExp.$2, data_convert = "", button_color = "";
        api += '&callback=jsonpCallback';
        if(api.includes("yahooapis"))
            data_convert += 'data = data.query.results.json;';
        switch(provider_name) {
        case "youtube" :
            button_color  = "#c22";
            data_convert += 'data = {'+
                                'thumbnail_url: (data.items[0].snippet.thumbnails.maxres || data.items[0].snippet.thumbnails.standard || '+
                                                'data.items[0].snippet.thumbnails.high   || data.items[0].snippet.thumbnails.medium   || '+
                                                'data.items[0].snippet.thumbnails.default).url,'+
                                'title:          data.items[0].snippet.title,'+
                                'author_url:     "https://www.youtube.com/channel/"+data.items[0].snippet.channelId,'+
                                'author_name:    data.items[0].snippet.channelTitle,'+
                                'duration:       data.items[0].contentDetails ? /PT(\\d+H)?(\\d+M)?(\\d+S)?/i.test(data.items[0].contentDetails.duration) && '+
                                                '(parseInt(RegExp.$1||0)*3600+parseInt(RegExp.$2||0)*60+parseInt(RegExp.$3||0)) || "LIVE" : "PLAYLIST"'+
                            '};';
            /*data_convert += 'if(data.thumbnail_url) {'+
                                'var img    = new Image();'+
                                'img.onload = function() {'+
                                    'var valid = this.naturalWidth > 120;'+
                                    'if(this.src.includes("hqdefault_live")) {'+
                                        'this.src = this.src.replace("hqdefault"+(valid ? "" : "_live"), "maxresdefault");'+
                                    '} else if(valid) {'+
                                        'document.body.style.backgroundImage = "url("+this.src+")";'+
                                    '} else if(this.src.includes("maxresdefault")) {'+
                                        'this.src = this.src.replace("maxresdefault", "sddefault");'+
                                    '} else {'+
                                        'document.body.style.backgroundImage = "url("+this.src.replace("sddefault", "hqdefault")+")";'+
                                    '}'+
                                '};'+
                                'img.src = removeProtocol(data.thumbnail_url.replace(/\\w+.jpg$/, "hqdefault_live.jpg"));'+
                                'delete data.thumbnail_url;'+
                            '}';*/
            break;
        case "dailymotion" :
            button_color  = "#fd5";
            // data_convert += 'if(data.thumbnail_url) data.thumbnail_url = data.thumbnail_url.replace(/\\/x240[^.]+/i, "");';
            data_convert += 'data.author_url  = data["owner.url"];'+
                            'data.author_name = data["owner.screenname"];'+
                            'if(!data.duration) data.duration = "LIVE";';
            break;
    case "vimeo" :
            button_color  = "#5af";
            data_convert += 'if(data.thumbnail_url) data.thumbnail_url = data.thumbnail_url.replace(/_\\d+x\\d+/i, "");';
      break;
    case "rutube" :
            button_color  = "#444";
            data_convert += 'if(data.thumbnail_url) data.thumbnail_url = data.thumbnail_url.replace(/\\?.+/i, "");';
      break;
        case "twitch" :
            button_color  = "#548";
            var id = url.match(/[^\/]+$/)[0];
            if(src.includes("channel")) { // channel live
                data_convert += 'var script = document.getElementById("api");'+
                                'if(script.src.includes("/users")) {'+
                                    'if(data.users[0]) {'+
                                        'var script2 = document.createElement("SCRIPT");'+
                                        'script2.id  = "api";'+
                                        'script2.src = "'+api+'".replace("{api}", "streams")+"&channel="+data.users[0]._id;'+
                                        'document.body.replaceChild(script2, script);'+
                                    '}'+
                                    'return;'+
                                '} else if(script.src.includes("/streams")) {'+
                                    'if(data.streams.length == 0) {'+
                                        'document.getElementById("space").insertAdjacentHTML("afterend", "<div id=duration>offline</div>");'+
                                        'var script2 = document.createElement("SCRIPT");'+
                                        'script2.id  = "api";'+
                                        'script2.src = "'+api+'".replace("{api}", "channels/"+script.src.match(/[^=]+$/)[0]);'+
                                        'document.body.replaceChild(script2, script);'+
                                        'return;'+
                                    '}'+
                                    'if(data.streams[0].preview)'+
                                        'data.streams[0].channel.video_banner = data.streams[0].preview.template.replace("{width}x{height}", "0x0");'+
                                    'else delete data.streams[0].channel.video_banner;'+
                                    'data = data.streams[0].channel;'+
                                '}'+
                                'data.title         = data.status || "Untitled Broadcast";'+
                                'if(data.video_banner) data.thumbnail_url = data.video_banner;'+
                                'if(data.url)          data.author_url    = data.url;'+
                                'if(data.display_name) data.author_name   = data.display_name;'+
                                'if(data.game)         data.duration      = \'playing <a target=_blank href="'+provider_url+
                                                                            '/directory/game/\'+data.game+\'">\'+data.game+\'</a>\';'+
                                'if(document.getElementById("duration")) delete data.duration;';
                if(background_img)
                    api = api.replace("{api}", "users")+'&login='+id;
                else
                    api = api.replace("{api}", "streams")+'&channel='+id;
            } else { // video recorded
                api = api.replace("{api}", "videos/"+id);
                data_convert += 'if(data.preview) data.thumbnail_url = data.preview.template.replace("{width}x{height}", "0x0");'+
                                'if(data.channel) data.author_url    = data.channel.url;'+
                                'if(data.channel) data.author_name   = data.channel.display_name;'+
                                'if(data.length)  data.duration      = data.length;';
            }
            break;
        case "ustream" :
            button_color  = "#f82";
            if(background_img) // channel live
                data_convert += 'delete data.thumbnail_url;';
            break;
        case "coub" :
            button_color  = "#04f";
            data_convert += 'if(data.channel_url) data.author_url = data.channel_url;';
            break;
        case "vine" :
            button_color  = "#0b8";
            break;
        case "facebook" :
            button_color  = "#ccc";
            data_convert += 'data.title = /<a.*?>(.+)<\\/a><p>/i.test(data.html) ? RegExp.$1 : "Untitled";';
            break;
        }
        if(!html) html = [
            '<!doctype html>'+
            '<html>'+
                '<head>'+
                    '<title>Lazy Embedded Video</title>'+
                    '<style>'+
                        'html { height:100%; } '+
                        'body { margin:0; height:100%; color:white; font:14px sans-serif; '+
                               'background:black center/100% no-repeat; } '+
                        'a { color:inherit; font-weight:bold; text-decoration:none; } '+
                        'a:hover { text-decoration:underline; } '+
                        '#interface { position:absolute; width:100%; height:100%; overflow:hidden; opacity:0.9; '+
                        '-moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; user-select:none; } '+
                        '#playButton { display:flex; height:100%; cursor:pointer; } '+
                        '#playButton > div { width:70px; height:70px; margin:auto; border-radius:50%; background-color:black; } '+
                        '#playButton:hover > div { background-color:', button_color, '; } '+
                        '#playButton > div > div { width:0; height:0; margin:20px 0 0 25px; border:solid transparent; '+
                                                  'border-width:14px 0px 14px 28px; border-left-color:white; } '+
                        '#infobar { position:absolute; top:0px; width:100%; height:32px; display:flex; '+
                        'box-sizing:border-box; background:black; border:0px solid grey; border-bottom-width:1px; } '+
                            '#author, #title, #duration { overflow:hidden; white-space:nowrap; margin:auto 8px; } '+
                            '#author { flex-shrink:0; max-width:30%; color:', button_color ,'; } '+
                            '#space { flex-grow:1; } '+
                            '#duration { flex-shrink:0; } '+
                        '#settingsButton { flex-basis:32px; flex-shrink:0; font:bold 20px sans-serif; text-align:center; cursor:pointer; } '+
                        '#settingsButton:hover { color:', button_color, '; } '+
                        '#settingsButton.active { background-color:', button_color, '; color:black; } '+
                        '#settingsPanel { position:absolute; right:0px; top:31px; max-height:100%; margin:0px; list-style:none; padding:8px; '+
                        'border:solid grey; border-width:0px 0px 1px 1px; background-color:', button_color ,'; color:black; cursor:default; visibility:hidden; } '+
                        '#settingsPanel.active { visibility:visible; } '+
                            '#settingsPanel label { display:inline-block; width:144px; vertical-align:top; } '+
                            '#settingsPanel button { width:100%; }'+
                    '</style>'+
                '</head>'+
                '<body>'+
                    '<div id=interface>'+
                        '<div id=playButton><div><div></div></div></div>'+
                        '<div id=infobar>'+
                            '<a id=author target=_blank onmouseenter="this.title = this.scrollWidth > this.clientWidth ? this.textContent : \'\';" href="', provider_url, '">', provider_name, '</a>'+
                            '<a id=title  target=_blank onmouseenter="this.title = this.scrollWidth > this.clientWidth ? this.textContent : \'\';" href="', url, '">', url, '</a>'+
                            '<div id=space></div>'+
                            '<span id=settingsButton>⚙</span>'+
                        '</div>'+
                        '<ul id=settingsPanel>'+
                            '<li><label>Allow autoplay:</label><input class=setting type=checkbox', '', '></li>'+
                            '<li><label>Legacy Flash support:</label><input class=setting type=checkbox', '', '></li>'+
                            '<li><button class=setting>Whitelist this site</button>'+
                            '<li><button class=setting>Clear whitelist</button>'+
                        '</ul>'+
                    '</div>'+
                    '<script>'+
                        'parent.postMessage("zeusLEV CSP ', iframes.length, '", "'+location.href+'");'+
                        'document.getElementById("playButton").onclick = function() {'+
                            'parent.postMessage("zeusLEV play ', iframes.length, ' ', src, '", "'+location.href+'");'+
                        '};'+
                        'var settingsButton = document.getElementById("settingsButton");'+
                        'var settingsPanel  = document.getElementById("settingsPanel");'+
                        'settingsButton.onclick = function() {'+
                            'settingsButton.classList.toggle("active");'+
                            'settingsPanel.classList.toggle("active");'+
                        '};'+
                        '[].slice.call(settingsPanel.getElementsByClassName("setting")).forEach(function(e, i) {'+
                            'switch(i) {'+
                            'case 0: e.onchange = function() { parent.postMessage("zeusLEV settings autoplay "+e.checked, "'+location.href+'"); }; break;'+
                            'case 1: e.onchange = function() { parent.postMessage("zeusLEV settings flash "+e.checked   , "'+location.href+'"); }; break;'+
                            'case 2: e.onclick  = function() { parent.postMessage("zeusLEV settings whitelist"          , "'+location.href+'"); }; break;'+
                            'case 3: e.onclick  = function() { parent.postMessage("zeusLEV settings reset"              , "'+location.href+'"); }; break;'+
                            '}'+
                        '});'+
                        'var loaded = false;'+
                        'function removeProtocol(url) { return url.replace(/^[a-z]+:/i, ""); }'+
                        'function jsonpCallback(data) {',
                            data_convert,
                            'loaded = true;'+
                            'if(data.thumbnail_url) document.body.style.backgroundImage           = "url("+removeProtocol(data.thumbnail_url)+")";'+
                            'if(data.url)           document.getElementById("title").href         = removeProtocol(data.url);'+
                            'if(data.title)         document.getElementById("title").textContent  = data.title;'+
                            'if(data.author_url)    document.getElementById("author").href        = removeProtocol(data.author_url);'+
                            'if(data.author_name)   document.getElementById("author").textContent = data.author_name;'+
                            'if(data.duration)      document.getElementById("space").insertAdjacentHTML("afterend",'+
                                '"<div id=duration>"+(Number(data.duration) ? new Date(data.duration*1000).toISOString().substr(11,8) : data.duration)+"</div>");'+
                        '}'+
                    '</script>'+
                    '<script id=api src="', api, '"></script>'+
                    '<script>'+
                        'if(!loaded)'+
                            'document.body.style.backgroundImage = "', background_img, '";'+
                    '</script>'+
                '</body>'+
            '</html>'
        ];
        html[ 1] = button_color;
        html[ 3] = button_color;
        html[ 5] = button_color;
        html[ 7] = button_color;
        html[ 9] = button_color;
        html[11] = provider_url;
        html[13] = provider_name;
        html[15] = url;
        html[17] = url;
        html[19] = settings[0] ? ' checked' : '';
        html[21] = settings[1] ? ' checked' : '';
        html[23] = iframes.length;
        html[25] = iframes.length;
        html[27] = src;
        html[29] = data_convert;
        html[31] = api;
        html[33] = background_img;
    };

    var createOembed  = function(api, url) { return api+encodeURIComponent(url); };
    // var createNOembed = function(api, url) { return createOembed("https://noembed.com/embed?url=", url); };
    var createYOembed = function(api, url) { return createOembed("https://query.yahooapis.com/v1/public/yql?format=json&q=",
                                                                 'SELECT * FROM json WHERE url="'+createOembed(location.protocol+api,url)+'"'); };

    var createLazyVideo = function(elem) {
        var id, args, url, src = elem.src || elem.data || elem.dataset.src;
        if(!src || elem.dataset.zeusLEV) return;
        elem.dataset.zeusLEV = 1;
        a.href = src;
        switch(a.hostname.match(/([^.]+)\.[^.]+$/)[1]) {
        case "youtube" :
            if(/\/(?:p\/|embed\/videoseries)([^&]*)/i.test(a.pathname)) {
                id = RegExp.$1 || (/[?&]list=([^&]+)/i.test(a.search) && RegExp.$1);
                if(!id || (settings[0] && a.search.includes("autoplay=1"))) return;
                args = "?autoplay=1";
                if(/[?&](v=[^&]+)/i.test(a.search))     args += "&"+RegExp.$1;
                if(/[?&](index=[^&]+)/i.test(a.search)) args += "&"+RegExp.$1;
                if(/[?&](start=[^&]+)/i.test(a.search)) args += "&"+RegExp.$1;
                createHtml(
                    url = /[?&]v=([^&]+)/i.test(a.search) ? "https://www.youtube.com/watch"+args+"&list="+id : "https://www.youtube.com/playlist?list="+id,
                    src = "https://www.youtube.com/embed/videoseries"+args+"&list="+id,
                    "https://www.googleapis.com/youtube/v3/playlists?part=snippet&fields=items/snippet(channelId,title,thumbnails,channelTitle)&key=AIzaSyDLowtdhRBblJhyDhtiPaIbwRKT_PSyHWE&id="+id,
                    /[?&]v=([^&]+)/i.test(a.search) ? "url(https://i.ytimg.com/vi/"+RegExp.$1+"/hqdefault.jpg)" : null
                );
            } else if(/\/(?:v|embed)\/([^&]*)/i.test(a.pathname)) {
                id = RegExp.$1 || (/[?&]v=([^&]+)/i.test(a.search) && RegExp.$1);
                if(!id || (settings[0] && a.search.includes("autoplay=1"))) return;
                args = "?autoplay=1";
                if(/[?&](start=[^&]+)/i.test(a.search)) args += "&"+RegExp.$1;
                createHtml(
                    url = "https://www.youtube.com/watch"+args+"&v="+id,
                    src = "https://www.youtube.com/embed/"+id+args,
                    // createNOembed("https://www.youtube.com/oembed?format=json&url=", location.protocol+url),
                    "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&fields=items(snippet(channelId,title,thumbnails,channelTitle),contentDetails/duration)&key=AIzaSyDLowtdhRBblJhyDhtiPaIbwRKT_PSyHWE&id="+id,
                    "url(https://i.ytimg.com/vi/"+id+"/hqdefault.jpg)"
                );
            }
            break;
        case "dailymotion" :
            if(/\/(?:swf|embed)\/(?:video\/)?([^&_]+)/i.test(a.pathname)) id = RegExp.$1;
            if(!id || (settings[0] && a.search.includes("autoplay=1"))) return;
            args = "?autoplay=1";
            // if(/[?&](mute=[^&]+)/i.test(a.search))  args += "&"+RegExp.$1;
            if(/[?&](start=[^&]+)/i.test(a.search)) args += "&"+RegExp.$1;
            createHtml(
                url = "https://www.dailymotion.com/video/"+id+args,
                src = "https://www.dailymotion.com/embed/video/"+id+args,
                // createOembed("https://www.dailymotion.com/services/oembed?format=json&url=", location.protocol+url),
                "https://api.dailymotion.com/video/"+id+"?fields=owner.screenname,owner.url,title,url,duration,thumbnail_url",
                "url(https://www.dailymotion.com/thumbnail/video/"+id+")"
            );
            break;
        case "vimeo" :
            if(/\/(?:moogaloop\.swf|video\/)([^&]*)/i.test(a.pathname))
                id = RegExp.$1 || (/[?&]clip_id=([^&]+)/i.test(a.search) && RegExp.$1);
            if(!id || (settings[0] && a.search.includes("autoplay=1"))) return;
            args = "?autoplay=1";
            if(/[?&](loop=[^&]+)/i.test(a.search)) args += "&"+RegExp.$1;
            if(/(\#t=[\dhms]+)/i.test(a.hash))     args += RegExp.$1;
            createHtml(
                url = "https://vimeo.com/"+id+args,
                src = "https://player.vimeo.com/video/"+id+args,
                createOembed("https://vimeo.com/api/oembed.json?url=", url)
            );
            break;
        case "rutube" :
            if(/\/play\/embed\/([^&.\/]+)/i.test(a.pathname)) id = RegExp.$1;
            if(!id || (settings[0] && a.search.includes("autoStart=1"))) return;
            args = "?autoStart=1";
            if(/[?&](bmstart=[^&]+)/i.test(a.search)) args += "&"+RegExp.$1;
            createHtml(
                url = "https://rutube.ru/"+(isNaN(id) ? "video/"+id+"/" : "tracks/"+id+".html/")+args,
                src = "https://rutube.ru/play/embed/"+id+args,
                createOembed("https://rutube.ru/api/oembed/?format=jsonp&url=", url)
            );
            break;
        case "twitch" :
            if(/[?&](channel|video)=([^&]+)/i.test(a.search))            {args = RegExp.$1; id = RegExp.$2;}
            else if(/[?&](stream=.+&channelId)=([^&]+)/i.test(a.search)) {args = RegExp.$1; id = RegExp.$2;}
            else if(/\/(.+)\/embed/i.test(a.pathname))                   {args = "channel"; id = RegExp.$1;}
            if(!id || (settings[0] && a.search.includes("autoplay=true"))) return;
            createHtml(
                url = "https://www.twitch.tv/"+(args=="video" ? id.replace("v","c/v/") : args=="channel" ? id :
                      args.replace("stream=", "streams/").replace("&channelId", "/channel/")+id),
                src = "https://player.twitch.tv/?autoplay=true&"+args+"="+id,
                "https://api.twitch.tv/kraken/{api}?client_id=du8sn5luinquldpeh4e2hy8le87fdo&api_version=5",
                args=="channel" ? "url(https://static-cdn.jtvnw.net/previews-ttv/live_user_"+id+"-0x0.jpg)" : null
            );
            break;
        case "ustream" :
            if(/(?:\/embed)?\/(channel\/|recorded\/)?([^&]+)/i.test(a.pathname)) {args = RegExp.$1 || "channel/"; id = RegExp.$2;}
            if(!id || (settings[0] && a.search.includes("autoplay=1"))) return;
            createHtml(
                url = "https://www.ustream.tv/"+args+id,
                src = "https://www.ustream.tv/embed/"+(args=="channel/" ? "" : args)+id+"?html5ui=1&autoplay=1",
                createYOembed("https://www.ustream.tv/oembed?format=json&url=", url),
                args=="channel/" && !isNaN(id) ? "url(https://static-cdn1.ustream.tv/i/channel/live/1_"+id+",640x360,b:0.jpg)" : null
            );
            break;
        case "coub" :
            if(/\/embed\/([^&]+)/i.test(a.pathname)) id = RegExp.$1;
            if(!id || (settings[0] && a.search.includes("autostart=true"))) return;
            createHtml(
                url = "https://coub.com/view/"+id,
                src = "https://coub.com/embed/"+id+"?startWithHD=true&autostart=true",
                createYOembed("https://coub.com/api/oembed.json?url=", url)
            );
            break;
        case "vine" :
            if(/\/v\/([^&]+)\/embed\/([^&]+)/i.test(a.pathname)) {args = RegExp.$2; id = RegExp.$1;}
            if(!id) return;
            createHtml(
                url = "https://vine.co/v/"+id,
                src = "https://vine.co/v/"+id+"/embed/"+args+"?audio=1",
                createOembed("https://vine.co/oembed.json?url=", url)
            );
            break;
        case "facebook" :
            if(a.pathname.endsWith("/plugins/video.php") && /[?&]href=([^&]+)/i.test(a.search)) {
                url = decodeURIComponent(RegExp.$1).replace(/^[a-z]+:/i, '');
                if(/\/videos.*?\/(\d+)/i.test(url)) id = RegExp.$1;
            }
            if(!id || (settings[0] && a.search.includes("autoplay=1"))) return;
            createHtml(
                url,
                src = "https://www.facebook.com/plugins/video.php?autoplay=1&href="+encodeURIComponent(location.protocol+url),
                createOembed("https://www.facebook.com/plugins/video/oembed.json/?url=", location.protocol+url),
                "url(https://graph.facebook.com/"+id+"/picture)"
            );
            break;
        default :
            return;
        }
        if(elem.tagName != "IFRAME") {
            if(elem.parentNode.tagName == "OBJECT")
                elem = elem.parentNode;
            var iframe = document.createElement("IFRAME");
            iframe.src           = src;
            iframe.id            = elem.id;
            iframe.name          = elem.name;
            iframe.className     = elem.className;
            iframe.style.cssText = elem.style.cssText;
            iframe.width         = elem.width;
            iframe.height        = elem.height;
            iframe.frameBorder   = elem.border;
            iframe.align         = elem.align;
            elem.parentNode.replaceChild(iframe, elem);
            elem = iframe;
        }
        elem.dataset.zeusLEV = 2;
        elem.allowFullscreen = true;
        elem.srcdoc          = html.join("");
        iframes.push(elem);
        setTimeout(function() {
            if(elem.dataset.zeusLEV != 3)
                elem.removeAttribute("srcdoc");
        }, 5000);
    };

    var refresh = true, observer, animation;
    var update = function() {
        if(!document.body) {
        } else if(!observer) {
            observer = new MutationObserver(function() { refresh = true; });
            observer.observe(document.body, {childList: true, attributes: false, characterData: false, subtree: true});
        } else if(refresh) {
            var nodes = document.querySelectorAll(settings[1] ? "IFRAME, EMBED, OBJECT" : "IFRAME");
            for(var i = 0; i < nodes.length; i++)
                createLazyVideo(nodes[i]);
            refresh = false;
        }
        animation = requestAnimationFrame(update);
    };
    update();
})();