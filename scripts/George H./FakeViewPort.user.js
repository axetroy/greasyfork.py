// ==UserScript==
// @name FakeViewPort
// @author JR
// @version 0.1
// @namespace fakeVprtA
// @description Set Fake Viewport
// @exclude *.facebook.*/*
// @exclude *.twitter.*/*
// @exclude *.myspace.*/*
// ==/UserScript==

(function() { // ##################
// #############################
// #############################
// =========================
// ----------------------------------------
// ======== PortView modification
// =========================
// ### Anon function start

var setDefaultViewWidth = 800;
var setDefaultViewHeight = 600;
var setDefaultViewMinZ = 0;
var setDefaultViewMaxZ = 3;
var setDefaultViewZoom = 0.5;
var setDefaultViewDPI = 70;

        var viewPortTagg = "width=" + setDefaultViewWidth + ", height=" + setDefaultViewHeight + ", minimum-scale=" + setDefaultViewMinZ + ", initial-scale=" + setDefaultViewZoom + ", maximum-scale=" + setDefaultViewMaxZ + ", target-densitydpi=" + setDefaultViewDPI + ", user-scalable=1";
        var metaTags=document.getElementsByTagName("meta");
        for (var i = 0; i < metaTags.length; i++) {
            if (metaTags[i].getAttribute("name") == "viewport") {
                //metaTags[i].setAttribute("content", viewPortTagg);
                metaTags[i].setAttribute("id", "viewport");
                //alert(metaTags[i].getAttribute("content"));
                break;
            }
        }

        var metaElement = document.getElementById("viewport");
        if (metaElement) document.head.removeChild(metaElement);

    window.opera.addEventListener("BeforeCSS", function(e) {
        e.cssText = e.cssText.replace(/viewport/g, "nonport");
    }, false);

    var viewPortSet = "width=" + setDefaultViewWidth + ", height=" + setDefaultViewHeight + ", minimum-scale=" + setDefaultViewMinZ + ", initial-scale=" + setDefaultViewZoom + ", maximum-scale=" + setDefaultViewMaxZ + ", target-densitydpi=" + setDefaultViewDPI + ", user-scalable=1";
    var mvp = window.document.getElementsByTagName("viewport");
    if (mvp.content == undefined) {
        var newMetaInfo = window.document.createElement("meta");
        newMetaInfo.name = "viewport";
        newMetaInfo.content = viewPortSet;
        if (window.document.head.firstChild) {
            window.document.head.insertBefore(newMetaInfo, window.document.head.firstChild);
        } else {
            window.document.head.appendChild(newMetaInfo);
        }
    } else {
        //window.alert("viewport tag changed from: " + mvp.content);
        mvp.setAttribute("content", viewPortSet);
    }
    var viewPortCSS = "@viewport {\nwidth: " + setDefaultViewWidth + "px !important;\nheight: " + setDefaultViewHeight + "px !important;\nmin-zoom: " + setDefaultViewMinZ + " !important;\nmax-zoom: '" + setDefaultViewMaxZ + " !important;\nuser-zoom: zoom !important;\nzoom: " + setDefaultViewZoom + " !important;\n JRPTY: on;\n}";
    var jrDynDivC = window.document.createElement("style");
    jrDynDivC.innerHTML = viewPortCSS;
    if (window.document.head.firstChild) {
        window.document.head.insertBefore(jrDynDivC, window.document.head.firstChild);
    } else {
        window.document.head.appendChild(jrDynDivC);
    }

// =========================
// ### Anon function end
// ----------------------------------------
// =========================
// #############################
// #############################
})(); // #########################
