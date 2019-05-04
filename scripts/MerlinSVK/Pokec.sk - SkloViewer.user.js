// ==UserScript==
// @name         Pokec.sk - SkloViewer
// @namespace    Pokec.sk, sklo, azet
// @icon         http://s.aimg.sk/pokec_base/css/favicon.ico
// @version      1.6
// @description  Prehliadač Youtube a iných videí/pesničiek priamo na skle
// @author       MerlinSVK
// @date         2018-01-14
// @match        https://pokec-sklo.azet.sk/miestnost/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @license      MIT
// ==/UserScript==

// v1.6 pridana podpora na Audiomack
// v1.5 fix pre neplatny soundclound link
// v1.4 pridana vynimka pre link smerujuci na YT kanal
// v1.3 refaktoring kodu + podpora Dailymotion, Beatport, Gfycat,
//      Openload a VideaCesky.cz
// v1.2 pridaná podpora Soundcloud, Twitch, Metacafe, Instagram
// v1.1 pridaná podpora Vimeo
// v1.0 YouTube prehliadač
/////////////////////////////////////////////////////////////////

var sites = ["youtu", "vimeo", "soundcloud", "twitch", "metacafe", "instagram", "dailymotion", "beatport", "gfycat", "openload", "videacesky", "audiomack"];

var loadMedia = {
    init: function(site, elm, url){
        elm.preventDefault();
        this[site](url);
    },
    findSite: function(elm){
        var url = elm.target.href;
        for (var i = 0, len = sites.length; i < len; i++){
            if (url.includes(sites[i])){
                if (url.includes("youtu") && url.includes("channel")){
                    return;
                }
                else
                    this.init(sites[i], elm, url);
            }
        }
    },
    showModal: function(width, divID, html, overlay = true){
        new PokecModal("")
            .width(width)
            .alert("Zatvoriť")
            .onShow(function(){
            $(".pokecModal").draggable();
            if (overlay === false){
                $(".pokecModalOverlay").remove();
            }
        })
            .content('<div style="text-align:center" id="'+divID+'">'+html+'</div>');
    },
    youtu: function(url){
        url = unescape(url).match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        var videoID = url[1];  // [0] = obsahuje cely link, [1] len videoID
        var divID = "ytPlayer";
        var width = 720;
        var height = Math.round(width/(16/9));
        var content = '<iframe width="'+width+'" height="'+height+'" frameborder="0" src="//www.youtube.com/embed/'+videoID+'?modestbranding=0&iv_load_policy=3&rel=0&showinfo=1&disablekb=1&fs=0"></iframe></div>';
        this.showModal(width, divID, content);

    },
    vimeo: function(url){
        url = unescape(url).match(/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i);
        var videoID = url[1];  // [0] = obsahuje cely link, [1] len videoID
        var divID = "vimeoPlayer";
        var width = 720;
        var height = Math.round(width/(16/9));
        var content = '<iframe width="'+width+'" height="'+height+'" frameborder="0" src=//player.vimeo.com/video/'+videoID+'?byline=0"></iframe>';
        this.showModal(width, divID, content);
    },
    twitch: function(url){
        url = unescape(url).match(/(?:https?:\/\/)?(?:www\.)?(?:twitch.tv\/)(.*)?(?:&i9=.*)/);
        var videoID = url[1];  // [0] = obsahuje cely link, [1] len videoID
        var divID = "twitchPlayer";
        var width = 720;
        var height = Math.round(width/(16/9));
        var content = "";
        if (videoID.includes("streams")){
            videoID = videoID.match(/(?:streams\/)([0-9]*)(?:\/channel\/)([0-9]*)/); // [0] = obsahuje cely link, [1] len streamID, [2] channelID
            var streamID = videoID[1];
            var channelID = videoID[2];
            content = '<iframe width="'+width+'" height="'+height+'" frameborder="0" scrolling="no" src="https://player.twitch.tv/?stream='+streamID+'&channelId='+channelID+'&autoplay=false"></iframe>';
        }
        else if (videoID.includes("videos")){
            videoID = videoID.replace("videos/", "");
            content = '<iframe width="'+width+'" height="'+height+'" frameborder="0" scrolling="no" src="//player.twitch.tv/?video=v'+videoID+'&autoplay=false"></iframe>';
        }
        else {
            content = '<iframe width="'+width+'" height="'+height+'" frameborder="0" scrolling="no" src="//player.twitch.tv/?channel='+videoID+'&autoplay=false"></iframe>';
        }
        this.showModal(width, divID, content);
    },
    metacafe: function(url){
        url = unescape(url).match(/([0-9]+\/.*)(?:\/&i9=)/);
        var videoID = url[1];
        var divID = "metacafePlayer";
        var width = 720;
        var height = Math.round(width/(16/9));
        var content = '<iframe width="'+width+'" height="'+height+'" frameborder="0" scrolling="no" src="//www.metacafe.com/embed/'+videoID+'/"></iframe>';
        this.showModal(width, divID, content);
    },
    dailymotion: function(url){
        url = unescape(url).match(/https?:\/\/(?:(www|touch)\.)?dailymotion\.com\/(?:(?:(?:embed)\/)?video)\/([^/?_]+)/);
        var videoID = url[2];
        var divID = "dailymotionPlayer";
        var width = 720;
        var height = Math.round(width/(16/9));
        var content = '<iframe width="'+width+'" height="'+height+'" frameborder="0" scrolling="no" src="//www.dailymotion.com/embed/video/'+videoID+'?autoplay=0&sharing-enable=0"></iframe>';
        this.showModal(width, divID, content);
    },
    soundcloud: function(url){
        url = unescape(url).match(/https?:\/\/(?:w\.|www\.|)(?:soundcloud\.com\/)(?:(?:player\/\?url=https\%3A\/\/api.soundcloud.com\/tracks\/)|)(((\w|-)[^A-z]{7})|([A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*(?!\/sets(?:\/|$))(?:\/[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*){1,2}))/);
        if (url === null) return;
        var audioID = encodeURIComponent(url[1]);   // [0] = obsahuje cely link, [1] len audioID
        var divID = "soundCloudPlayer";
        var width = 720;
        var height = Math.round(width/(16/9));
        var content = '<iframe width="'+width+'" height="'+height+'" frameborder="0" scrolling="no" src="//w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2F'+audioID+'%3Fvisual%3Dtrue"></iframe>';
        this.showModal(width, divID, content);
    },
    instagram: function(url){
        url = unescape(url).match(/(https?:\/\/(www\.)?)?instagram\.com(\/p\/[\w-]+\/?)/);
        var mediaID = url[3];
        var divID = "instagramPlayer";
        var width = Math.round((window.innerHeight-252)/1.25);
        var height = Math.round(window.innerHeight-252);
        var content = '<iframe width="325" height="'+height+'" frameborder="0" scrolling="no" src="//instagram.com'+mediaID+'embed/"></iframe>';
        this.showModal(width, divID, content);
    },
    beatport: function(url){
        url = unescape(url).match(/https?:\/\/(?:www\.|pro\.|embed\.)?beatport\.com\/(?:track\/|\?id=)([^/]+\/|[0-9]+)([0-9]+|&type=track)/);
        var audioID = "";
        if (url[0].includes("embed")){
            audioID = url[1];
        }
        else {
            audioID = url[2];
        }
        var divID = "beatportPlayer";
        var width = 720;
        var height = 162;
        var content = '<iframe style="max-width:'+width+'px" width="'+width+'" height="'+height+'" frameborder="0" scrolling="no" src="//embed.beatport.com/?id='+audioID+'&type=track"></iframe>';
        this.showModal(width, divID, content);
    },
    gfycat: function(url){
        url = unescape(url).match(/https?:\/\/(?:www\.)?gfycat\.com\/(?:ifr\/)?([^/?#]+)(?:&i9=.+)/);
        var gifID = url[1];
        var divID = "gfycatPlayer";
        var width = 720;
        var height = Math.round(width/(16/9));
        var content = '<iframe width="'+width+'" height="'+height+'" frameborder="0" scrolling="no" src="https://gfycat.com/ifr/'+gifID+'"></iframe>';
        this.showModal(width, divID, content);
    },
    openload: function(url){
        url = unescape(url).match(/https?:\/\/(?:openload\.(?:co|io)|oload\.tv)\/(?:f|embed)\/([a-zA-Z0-9-_]+)/);
        var videoID = url[1];
        var divID = "openloadPlayer";
        var width = 720;
        var height = Math.round(width/(16/9));
        var content = '<iframe width="'+width+'" height="'+height+'" frameborder="0" scrolling="no" src="https://openload.co/embed/'+videoID+'/"></iframe>';
        this.showModal(width, divID, content);
    },
    videacesky: function(url){
        url = unescape(url).match(/(?:https?:\/\/)?(?:videacesky\.cz)\/(?:video)\/([a-zA-Z0-9-_]+)/);
        var videoID = url[1];
        var divID = "videaceskyPlayer";
        var width = 711;
        var height = Math.round(width/(16/9));
        var content = '<iframe width="'+width+'" height="'+height+'" frameborder="0" scrolling="no" src="https://videacesky.cz/embed/'+videoID+'"></iframe>';
        this.showModal(width, divID, content);
    },
    audiomack: function(url){
        url = unescape(url).match(/(?:https?:\/\/)?(?:audiomack\.com)\/(song\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+)/);
        if (url === null) return;
        var audioID = url[1];   // [0] = obsahuje cely link, [1] vsetko za audiomack.com/
        var divID = "audiomackPlayer";
        var width = 720;
        var content = '<iframe width="'+width+'" height="252" frameborder="0" scrolling="no" src="https://audiomack.com/embed/'+audioID+'"></iframe>';
        this.showModal(width, divID, content);
    }
};

/////////////////////////////////////////////////////////////////

$(document).ready(function (){
    $("#sklo").on("click", ".prispevok > span > a", function(elm){loadMedia.findSite(elm);});
});
