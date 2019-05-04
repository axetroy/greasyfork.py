// ==UserScript==
// @name Image Search Exclusion
// @namespace Violentmonkey Scripts
// @description Blacks out images not supported by Image Max URL
// @match *://image.baidu.com/*
// @include /^https?:\/\/[^/]*google\.[a-z]+\/.*tbm=isch/
// @include /^https?:\/\/[^/]*images\.search\.yahoo\.[a-z]+\//
// @include /^https?:\/\/[^/]*bing\.[a-z]+\/images\/search/
// @grant none
// @run-at document-end
// @version 0.1
// ==/UserScript==

(function() {
    var selectors = [
        // baidu
        {
            parent: ".imgitem",
            link: ".imgbox > a"
        },
        // google
        {
            parent: "#ires > div > div > div > div > div > div",
            link: "a"
        },
        // yahoo
        {
            parent: "#results > div > ul > li",
            link: "a"
        },
        // bing (doesn't work properly)
        {
            parent: "#mmComponent_images_1 > ul > li",
            link: "div > div > a"
        }
    ];
    
    var defaults = [
        "",
        "/wp-content/",
        "\\.files\\.wordpress\\.com",
        "/sites/[^/]*/files/",
        "$i.dailymail.co.uk",
        "$[^/]*gettyimages\\.com/",
        "$\\.alamy\\.com/",
        "$pinimg\\.",
        "$pbs\\.twimg\\.",
        "$sinaimg\\.",
        "$\\.fbsbx\\.",
        "$\\.cdninstagram\\.",
        "$\\.hdslb\\.",
        "$\\.ytimg\\.",
        "$i\\.imgur\\.com/",
        "$imgur\\.com/",
        "$\\.127\\.net",
        "$\\.static\\.?flickr\\.",
        "$\\.tumblr\\.",
        "$\\.upaiyun\\.",
        "$\\.meitudata\\.",
        "$wikia\\.nocookie\\.net",
        "$\\.inven\\.co\\.kr",
        "$\\.fastly\\.net/",
        "$\\.wikifeet\\.com/",
        "$\\.famousbirthdays\\.com",
        "$\\.eonline\\.com/",
        "$\\.depositphotos\\.com/",
        "$\\.stylebistro\\.com/",
        "$\\.zimbio\\.com/",
        "$images\\.hellogiggles\\.com/",
        "$\\.deviantart\\.net/",
        "$\\.shutterstock\\.com/",
        "$\\.dreamstime\\.com/",
        "$\\.bigstockphoto\\.com/",
        "$data\\.whicdn\\.com/",
        "$contactmusic\\.com/",
        "$123rf\\.com/",
        "$\\.joins\\.com/",
        "$\\.topstarnews\\.net/",
        "$\\.chosun\\.com/",
        "$img\\.discogs\\.com/", // haven't found a pattern yet
        "$\\.imgix\\.net/",
        "$\\.narvii\\.com/",
        "$cdn\\.namuwikiusercontent\\.com",
        // https://ncache.ilbe.com/files/attach/new/20121227/14357299/446289814/563253625/36914192240a5b2a2aa3ca1fce5a60e3.jpg
        // https://www.neoanime.co.kr/files/attach/images/111/038/053/008/c676ce5a8eea1875021f0fad1d7837bb.jpg
        // https://lovelive.kr/xe/files/attach/images/525/773/382/b0a5392fae73ad73d30b72fa90918d24.jpg
        "://[^/]*/(?:xe\/)?files/attach/(?:images|new)/", // common pattern in korean websites (xe?)
        "$\\.weebly\\.com/",
        "$contents\\.oricon\\.co\\.jp/",
        "$\\.(?:ssl-)?(?:images|media)-(?:amazon|imdb)\\.com/",
        "$\\.blogimg\\.jp",
        "$\\.fc2\\.com",
        "$\\.wikimedia\\.org/",
        "$image\\.dhgate\\.com/",
        "$dhresource\\.com/",
        "$postimg\\.cc\/",
        "$i\\.redditmedia\\.com/",
        "$\\.alicdn\\.com/",
        "$\\.kym-cdn\\.com/",
        "://[^/]*\/data\/out\/[0-9]+\/[0-9]+-[^/]*$",
        "$i[0-9]*\\.kknews\\.cc/SIG=",
        "$\\.read01\\.com/SIG=",
        "://[^/]*/thumbnail/[0-9]+/gallery/[^/]*$",
        "$tse?[0-9]*\\.mm\\.bing\\.net/",
        "$partners-programs.ru/thumbs/",
        "$i.redd.it/",
        "$.ask.fm/.*/original/",
        "$kn3.net/taringa/",
        "$snap69.com/thumb\.php",
        "$pp.userapi.com/",
        "$thumbnails[0-9]*\\.imagebam\.com/",
        "$x\\.imagefapusercontent\\.com/",
        "$\\.fansshare\\.com/",
        "$i[0-9]*\\.photobucket\\.com/",
        "$\\.wattpad\\.com/",
        "^x-raw-image:\/\/",
        "$archive\\.is/",
        "$i\\.ntere\\.st/",
        // https://www.liciwang.com/upload/i01.pic.sogou.com/9aa89fd706dba7fe.jpg
        // https://www.liciwang.com/upload/i03.pictn.sogoucdn.com/42fecd35e9fff842.jpg
        "/upload/i[0-9]*\\.pic[a-z]*\\.sogou(?:cdn)?\\.com/[0-9a-f]+\\.",
        "$\\.dmcdn\\.net/",
        "$i\\.mycdn\\.me/",
        // http://megafucker.ru/bigyzsduk/images/TQLEEXOWG7H9BEy3HDE6zST4We9SelTnGkTe-vHkRFQkhHOf4RXDV9u9IhgSYX2Rrd7j.jpg
        //    http://gpewf372.ummashop.ru/images/TQLEEXOWG7H9BEy3HDE6zST4We9SelTnGkTe-vHkRFQkhHOf4RXDV9u9IhgSYX2Rrd7j.jpg
        //     http://www.dom-receptov.ru/images/pZlGpJI4syQDudnOOOquPGF3lWaOqLdIGDVe573mFRYkvhFwafUZ3zD14ZYtkOZiOaCl.jpg
        //       http://www.pogruchiks.ru/images/GJGtKkdzeNCt5YRusSMc_GTNPIaZ9Ca5s-X1jlrJ8uMmIqaNrUNF5X5WDuwTjWM9YF1f.jpg
        //         http://www.interyou.ru/images/CLp5QL_OYcv8lcuqaN4PixQ8n3IR3x_yU_-f7kyPqA69sSyDH_-TKN8g.jpg
        "$[^/]*\/images\/(?:[-0-9A-Za-z_]{68}|[-0-9A-Za-z_]{56})\.jpg$",
        "$k[0-9]*\.kn3\.net/"
    ].join("\n");
    
    function getlink(src) {
        if (!src)
            return src;
        
        var protocol_split = src.split("://");
        var protocol = protocol_split[0];
        var splitted = protocol_split[1].split("/");
        var domain = splitted[0];
        var domain_nowww = domain.replace(/^www\./, "");
        var domain_nosub = domain.replace(/^.*\.([^.]*\.[^.]*)$/, "$1");
        
        if (domain === "image.baidu.com") {
            return decodeURIComponent(src.replace(/.*?[?&]objurl=([^&]*).*/, "$1"));
        }
        
        if (domain.match(/\.google\./)) {
            //var newsrc = decodeURIComponent(src.replace(/.*?[?&]imgurl=([^&]*).*/, "$1"));
            var newsrc = src.replace(/^[a-z]+:\/\/[^/]*\/imgres.*?[?&]imgurl=([^&]*).*/, "$1");
            if (newsrc !== src)
                return decodeURIComponent(newsrc);
            newsrc = src.replace(/^[a-z]+:\/\/[^/]*\/url.*?[?&]url=([^&]*).*/, "$1");
            if (newsrc !== src)
                return decodeURIComponent(newsrc);
        }
        
        if (domain.match(/\.images\.search\.yahoo\./)) {
            return "http://" + decodeURIComponent(src.replace(/.*?[?&]imgurl=([^&]*).*/, "$1"));
        }
        
        if (domain.match(/bing\.com/)) {
            return decodeURIComponent(src.replace(/.*?[?&]mediaurl=([^&]*).*?$/, "$1"));
        }
        
        return src;
    }
    
    function apply(data) {
        var lines = data.split("\n")
        var regexes = [];
        lines.forEach((line) => {
            if (line.replace(/\s+/g, "") !== "")
                regexes.push(new RegExp(line.replace(/^[$]/, "^[a-z]+://[^/]*")));
        });
        console.log(regexes);
        var imu = unsafeWindow.imu_variable;
        
        selectors.forEach((selector) => {
            document.querySelectorAll(selector.parent).forEach((el) => {
                var link = el.querySelector(selector.link);
                if (!link)
                    return;
                var url = link.href;
                var newurl = getlink(url);
                if (!newurl)
                    return;
                for (var i = 0; i < regexes.length; i++) {
                    if (newurl.match(regexes[i])) {
                        /*el.style.display = "none";
                        el.style.visibility = "hidden";*/
                        el.style.filter = "brightness(0%)";
                        return;
                    }
                }
                try {
                    //console.log(newurl);
                    if (imu(newurl, {
                            fill_object: false
                            }) !== newurl) {
                        console.log("IMU");
                        el.style.filter = "brightness(0%)";
                        return;
                    }
                } catch (e) {
                    console.log("Couldn't run IMU on: " + newurl);
                    console.dir(e);
                }
            })
        })
    }
    
    function replacelinks() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === "attributes" &&
                    mutation.target.tagName === "A" &&
                    mutation.attributeName === "href") {
                    var oldhref = mutation.target.href;
                    var newhref = getlink(mutation.target.href);
                    if (oldhref !== newhref) {
                        console.log(oldhref);
                        console.log(newhref);
                        mutation.target.href = newhref;
                    }
                }
            });
        });
        observer.observe(document.documentElement, {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true,
            attributeOldValue: true,
            characterDataOldValue: true
        });
    }
    function create_textarea() {
        unsafeWindow.imu_variable = null;

        setTimeout(function() {
            var script = document.createElement("script");
            //script.src = "https://gitcdn.xyz/repo/qsniyg/maxurl/master/userscript.user.js";
            script.src = "https://rawgit.com/qsniyg/maxurl/master/userscript.user.js";
            document.body.appendChild(script);
            console.log(script);
        }, 1);

        var container = document.createElement("div");
        container.style.zIndex = 9999999;
        container.style.position = "fixed";
        container.style.top = "0";
        container.style.right = "0";
        var ta = document.createElement("textarea");
        ta.value = defaults;
        var button = document.createElement("button");
        button.innerHTML = "Apply";
        button.onclick = function() {
            console.dir(ta);
            apply(ta.value);
        }
        container.appendChild(ta);
        container.appendChild(button);
        document.body.appendChild(container);
        console.log(container);
    }
    
    replacelinks();
    create_textarea();
})();