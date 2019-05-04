// ==UserScript==
// @run-at      document-start
// @name        General URL Cleaner
// @namespace   
// @description Cleans URL's from various popular sites. Also, makes sure the sites are using HTTPS.
// @include     /^https?://[a-z]+\.google(\.com?)?\.[a-z]{2,3}/.*$/
// @include     /^https?://[a-z.]+\.ebay(desc)?(\.com?)?\.[a-z]{2,3}/.*$/
// @include     /^https?://www\.amazon(\.com?)?\.[a-z]{2,3}/.*$/
// @include     /^https?://www\.newegg\.c(om|a)/.*$/
// @include     /^https?://www\.bing\.com/.*$/
// @include     https://www.youtube.com/*
// @include     http://stat.dealtime.com/*
// @include     /https?://www.imdb.com/.*$/
// @include     /https?://(www\.)?staticice\.com\.au/.*$/
// @include     https://www.facebook.com/*
// @include     /https?://[a-z0-9.]*twitter.com/.*$/
// @include     https://disqus.com/embed/comments/*
// @exclude     https://apis.google.com/*
// @exclude     https://accounts.google.com/*
// @exclude     https://support.google.com/*
// @exclude     https://www.google.com/recaptcha/api2/*
// @version     2.12.3
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var doc = document;
var loc = location;
var lhost = loc.host;
var lpath = loc.pathname;
var ebay = /^[a-z.]+\.ebay(desc)?(\.com?)?\.[a-z]{2,3}$/;
var amazon = /^www\.amazon\.com?(\.[a-z]{2,3})?$/;
var google = /^[a-z]+\.google\.com?(\.[a-z]{2,3})?$/;
var amazonParams = /&(url|ie|pf_rd_[a-z]|bbn|rw_html_to_wsrp|ref_)=[^&#]*/;
var utmParams = /&utm_[a-z]+=[^&]*/g;
var neweggParams = /&(cm_sp|icid|ignorebbr)=[^&#]*/g;
var bingParams = /&(go|qs|form|FORM|filt|pq|s[cpk]|qpvt|cvid)=[^&#]*/g;
var youtubeParams = /&(feature|src_vid|annotation_id|[gh]l)=[^&#]*/g;
var ebayParams = /&(_(o?sacat|odkw|from|trksid)|rt)=[^&#]*/g;
var googleParams = /&(sa(fe)?|ved|source(id)?|s?ei|tab|tbo|h[ls]|authuser|n?um|ie|aqs|as_qdr|bav|bi[wh]|bs|bvm|cad|channel|complete|cp|s?client|d[pc]r|e(ch|msg|s_sm)|g(fe|ws)_rd|gpsrc|noj|btnG|o[eq]|p(si|bx|f|q)|rct|rlz|site|spell|tbas|usg|xhr|gs_[a-z]+)=[^&#]*/g;

// -------- Main --------
function main() {
    if (lhost=='www.bing.com') {
        var newUrl = cleanBing(doc.URL);
        if (loc.protocol=='http:') loc.replace(newUrl);
        else cleanPageUrl(newUrl);
        cleanLinks('all');
    }
    else if (lhost=='www.youtube.com') {
        if (lpath=='/watch') cleanPageUrl(cleanYoutube(doc.URL));
        else if (lpath=='/redirect') loc.replace(cleanYoutubeRedir(loc.search));
        cleanLinks('youtube');
    }
    else if (lhost.endsWith('.newegg.com')||lhost.endsWith('.newegg.ca')) {
        if (loc.search) cleanPageUrl(cleanNewegg(doc.URL));
        cleanLinks('newegg');
    }
    else if (lhost=='www.imdb.com') {
        if (loc.search) cleanPageUrl(cleanImdb(doc.URL));
        cleanLinks('imdb');
        deleteHash();
    }
    else if (google.test(lhost)) {
        if (lpath=='/url'||lpath=='/imgres') loc.replace(cleanGoogleRedir(loc.search));
        else if (loc.search||loc.hash.match(/[&#]q=/)) {
            cleanPageUrl(cleanGoogle(doc.URL));
            cleanLinks('google');
            if (loc.search.includes('tbm=isch')) cleanAllLinks('googleImages');
            else cleanLinks('google');
            googleInstant();
        }
    }
    else if (ebay.test(lhost)) {
        if (lpath.includes('/itm/')) cleanPageUrl(cleanEbayItem(loc));
        else if (loc.search) cleanPageUrl(cleanEbayParams(doc.URL));
        cleanLinks('ebay');
        deleteHash();
    }
    else if (amazon.test(lhost)) {
        if (lpath.includes('/dp/')) cleanPageUrl(cleanAmazonItemdp(loc));
        else if (lpath.includes('/gp/product')) cleanPageUrl(cleanAmazonItemgp(loc));
        else if (loc.search) cleanPageUrl(cleanAmazonParams(doc.URL));
        cleanLinks('amazon');
        onhashchange = function() {
            if (!loc.hash.startsWith('#reader_'))
                history.replaceState(null,null,loc.href.replace(loc.hash,''));
        };
    }
    else if (lhost.endsWith('staticice.com.au')) {
        cleanLinks('staticice');
    }
    else if (lhost=='twitter.com') {
        cleanLinks('twitter');
    }
    else if(lhost=='www.facebook.com'){
        cleanLinks('facebook');
    }
    else if (lhost=='disqus.com') {
        cleanLinks('disqus');
    }
}

// -------- Front functions --------
function cleanPageUrl(newUrl) {
    if (newUrl != doc.URL) history.replaceState(null, null, newUrl);
}

// Clean links once, mark them as cleaned, then ignore them.
function cleanLinks(site) {
    new MutationObserver(function(_,self) {
        console.time('clean');
        for (let link of doc.links) {
            if (!link.classList.contains('cleaned')) {
                linkCleaners[site](link);
                link.classList.add('cleaned');
            }
        }
        console.timeEnd('clean');
    }).observe(doc, {childList:true, subtree:true});
}
// Clean all  links, all the time, no matter what
function cleanAllLinks(site) {
    new MutationObserver(function(_,self) {
        console.time('clean');
        for (let link of doc.links)
            linkCleaners[site](link);
        console.timeEnd('clean');
    }).observe(doc, {childList:true, subtree:true});
}


function deleteHash() {
    function onhashchange() {
        history.replaceState(null, null, loc.href.replace(loc.hash, ''));
    }
}
function googleInstant() {
    changeState(function(url) {
        if (url.endsWith('#imgrc=_'))
            return url.slice(0,-8);
        else if (url.match(/#(.+&)?q=/))
            return lpath + cleanGoogle(url.replace(/.+#/,'?'));
        return url;
    });
}
function changeState(mod) {
    pushState = history.pushState;
    replaceState = history.replaceState;
    history.pushState = function() {
        arguments[2] = mod(arguments[2]);
        pushState.apply(history, arguments);
    };
    history.replaceState = function() {
        arguments[2] = mod(arguments[2]);
        replaceState.apply(history, arguments);
    };
}

// -------- URL cleaning functions --------
function cleanGoogle(url) {
    return url.replace('?','?&').replace(googleParams,'').replace('?&','?');
}
function cleanGoogleRedir(url) {
    return decodeURIComponent(url.match(/[&?](img)?url=([^&]+)/)[2]);
}
function cleanBing(url) {
    return url.replace('?','?&').replace(bingParams,'').replace('?&','?').replace(/^http\:/,'https:');
}
function cleanYoutube(url) {
    return url.replace("?","?&").replace(youtubeParams,'').replace("?&","?");
}
function cleanYoutubeRedir(url) {
    return decodeURIComponent(url.match(/[?&]q=([^&]+)/)[1]);
}
function cleanEbayParams(url) {
    return url.replace('?','?&').replace(ebayParams,'').replace('?&','?');
}
function cleanEbayItem(a) {
    return a.origin+'/itm'+a.pathname.match(/\/[0-9]{12}/)+(a.search.replace(/&/g, '?').match(/\?orig_cvip=[^?]+/)||'')+a.hash;
}
function cleanEbayPulsar(url) {
    return loc.origin + '/itm/' + url.match(/%7B%22mecs%22%3A%22([0-9]{12})/).pop();
}
function cleanNewegg(url) {
    return url.replace('?','?&').replace(neweggParams,'').replace('?&','?');
}
function cleanAmazonParams(url) {
    return url.replace('?','?&').replace(amazonParams,'').replace('?&','?').replace(/\?$/,'');
}
function cleanAmazonItemgp(a) {
    return a.origin+'/gp/product'+a.pathname.match(/\/[A-Z0-9]{10}/)+a.hash;
}
function cleanAmazonItemdp(a) {
    return a.origin+'/dp'+a.pathname.match(/\/[A-Z0-9]{10}/)+a.hash;
}
function cleanImdb(url) {
    return url.replace('?','?&').replace(/&(pf_rd_[a-z]|ref_)=[^&#]*/g,'').replace('?&','?').replace(/\?$/,'');
}
function cleanGenericRedir(url) {
    return decodeURIComponent(url.match(/[?&]u(rl)?=([^&]+)/)[2]);
}
function cleanUtm(url) {
    return url[0]+('&'+url.slice(1)).replace(utmParams,'').slice(1);
}
function cleanStaticiceRedir(url) {
    return decodeURIComponent(url.match(/[?&]newurl=([^&]+)/)[1]);
}
function cleanClixgalore(url) {
    return decodeURIComponent(url.match(/[?&]AffDirectURL=([^&]+)/)[1]);
}

// -------- Link cleaning functions --------
var linkCleaners = {
    all:function(a) { host=a.host; path=a.pathname;
        if (google.test(host))
            if (path=='/imgres'||path=='/url') a.href = cleanGoogleRedir(a.search);
            else if (a.search) a.search = cleanGoogle(a.search);
        else if (host=='www.youtube.com')
            if (path=='/watch') a.search = cleanYoutube(a.search);
            else if (path=='/redirect') a.href = cleanYoutubeRedir(a.search);
        else if (host.endsWith('.newegg.com') || host.endsWith('.newegg.ca'))
            if(a.search) a.search = cleanNewegg(a.search);
        else if (host=='www.imdb.com' && a.search)
            a.search = cleanImdb(a.search);
        else if (amazon.test(host))
            if (path.includes('/dp/')) a.href = cleanAmazonItemdp(a);
            else if (path.includes('/gp/product')) a.href = cleanAmazonItemgp(a);
            else if (a.pathname.includes('/picassoRedirect')) {
                a.href = cleanGenericRedir(a.search);
                a.search = '';
            }
            else if (a.search) a.href = cleanAmazonParams(a.href);
            if (a.pathname.includes('/ref=')) a.pathname = cleanAmazonParams(a.pathname);
        else if (ebay.test(host))
            if (path.includes('/itm/')) a.href = cleanEbayItem(a);
            else if (a.host.startsWith('pulsar.')) a.href = cleanEbayPulsar(a.search);
            else if (a.search) a.search = cleanEbayParams(a.search);
        else {
            if (a.search) a.search = cleanUtm(a.search);
            if (a.hash) a.hash = cleanUtm(a.hash);
        }
    },
    amazon:function(a) {
        if (amazon.test(a.host))
            if (a.pathname.includes('/dp/')) a.href = cleanAmazonItemdp(a);
            else if (a.pathname.includes('/gp/product')) a.href = cleanAmazonItemgp(a);
            else if (a.pathname.includes('/picassoRedirect')) {
                a.href = cleanGenericRedir(a.search);
                a.search = '';
            }
            else if (a.search) a.href = cleanAmazonParams(a.href);
            if (a.pathname.includes('/ref=')) a.pathname = cleanAmazonParams(a.pathname);
    },
    ebay:function(a) {
        if (ebay.test(a.host))
            if (a.pathname.includes('/itm/')) a.href = cleanEbayItem(a);
            else if (a.host.startsWith('pulsar.')) a.href = cleanEbayPulsar(a.search);
            else if (a.search) a.search = cleanEbayParams(a.search);
        
    },
    newegg:function(a) {
        if (a.host.endsWith('.newegg.com')||a.host.endsWith('.newegg.ca'))
            if (a.pathname.includes('/marketplace/'));
            else if (a.search) a.search = cleanNewegg(a.search);
    },
    google:function(a) {
        a.removeAttribute('onmousedown');
        linkCleaners.all(a);
    },
    googleImages:function(a) {
        a.removeAttribute('onmousedown');
        a.removeAttribute('data-ved');
        a.classList.remove('i3597');
        a.classList.remove('i3596');
        if (a.hasAttribute('jsaction'))
            if (a.getAttribute('jsaction').includes('down:irc.rl'))
                a.removeAttribute('jsaction');
        linkCleaners.all(a);
    },
    youtube:function(a) {
        a.classList.remove('yt-uix-redirect-link');
        a.classList.remove('spf-link');
        a.removeAttribute('data-sessionlink');
        old = a.href;
        linkCleaners.all(a);
        if (a.title==old) a.title=a.href;
    },
    staticice:function(a) {
        if (a.host.endsWith('staticice.com.au')) {
            if (a.pathname=='/cgi-bin/redirect.cgi') {
                a.href = cleanStaticiceRedir(a.search);
                if (a.host=='www.clixgalore.com' && a.pathname=='/PSale.aspx')
                    a.href = cleanClixgalore(a.search);
            }
            else if (a.pathname.startsWith('/cgi-bin/www.'))
                a.href = 'http://'+a.pathname.slice(9);
        }
        if (a.host=='t.dgm-au.com' || a.host=='www.kqzyfj.com') a.href = cleanGenericRedir(a.search);
        if (a.search) a.search = cleanUtm(a.search);
    },
    twitter:function(a) {
        if (a.host=='t.co') {
            if (a.hasAttribute('data-expanded-url')) {
                var dirty = 'twitterRedir_'+a.pathname.slice(1);
                a.href = a.getAttribute('data-expanded-url');
                a.removeAttribute('data-expanded-url');
                sessionStorage.setItem(dirty, a.href);
            }
            else if (a.classList.contains('TwitterCard-container')) {
                var dirty = 'twitterRedir_'+a.pathname.slice(1);
                var clean = sessionStorage.getItem(dirty);
                if (clean) a.href = clean;
            }
        }
    },
    facebook:function(a) {
        if (a.hasAttribute('onclick') && a.hasAttribute('onmouseover')) {
            if (a.getAttribute('onclick').startsWith('LinkshimAsyncLink')) {
                a.removeAttribute('onclick');
                a.removeAttribute('onmouseover');
                if (a.host=='l.facebook.com')
                    a.href = cleanGenericRedir(a.search);
            }
        }
    },
    imdb:function(a) {
        if (a.host=='www.imdb.com' && a.search)
            a.search = cleanImdb(a.search);
    },
    disqus:function(a) {
        if (a.host=='disq.us' && a.pathname=='/url')
            a.href = cleanGenericRedir(a.search);
        linkCleaners.all(a);
    }
};

main();