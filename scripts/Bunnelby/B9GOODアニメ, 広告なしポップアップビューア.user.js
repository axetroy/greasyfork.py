// ==UserScript==
// @name         B9GOODアニメ, 広告なしポップアップビューア
// @description  広告を取り除いてコンテンツのみをポップアップで表示します
// @namespace    http://tampermonkey.net/
// @version      2.0.0
// @author       You
// @match        *://b9good.com/*
// @match        *://*.b9dm.com/*
// @grant        GM.xmlHttpRequest
// @runat        document-start
// @nowrap
// ==/UserScript==

(function () {
    var timer = setInterval(function() {
        'use strict';

        if (!jQuery) return;
        clearInterval(timer);

        var myHistory = [];
        var $$ = jQuery;
        var $wrapper, $prev, $close;

        function popup(response, url) {
            $wrapper.html("");

            var pathname = url.split("/").splice(3).join("/");
            var $response = $(response);

            if (pathname.match(/^(new|riju|hd|wj)/) || pathname.match(/index\.php\/video\/index/)) {
                $wrapper.append($$(".content .caption", $response));
                $wrapper.append($$(".content .vinfol", $response).css({ width: "200px", marginRight: "5px" }));
                $wrapper.append($$(".content .vinfor", $response).css({ float: "left" }));
            }
            if (pathname.match(/list/) || pathname.match(/index\.php\/video\/show\/cid/)) {
                var $content = $$(".content", $response);
                $content.find("script,iframe").remove();
                $wrapper.append($content);

                var $sidebar = $$(".sidebar", $response);
                $sidebar.find("script,iframe").remove();
                $wrapper.append($sidebar);
            } else {

            }

            $$("a", $wrapper).click(onGoto);
            showPopup();
        }

        function onGoto(event, url) {

            url = url || $$(event.currentTarget).attr("href");

            if (url.indexOf("://") > 0 && url.match(/(:\/\/b9good\.com\/|:\/\/up\.b9dm\.com\/)/) == null) {
                window.open(url);
                return;
            }

            showPopup();
            $wrapper.html("loading ...");

            GM.xmlHttpRequest({
                url: url,
                method: "GET",
                onload: function (xhr) {
                    myHistory.push(xhr.finalUrl);
                    console.log(xhr.finalUrl);
                    popup(xhr.response, xhr.finalUrl);
                }
            });

            return false;
        }

        function onBack() {
            if (myHistory.length > 1) {
                myHistory.pop();
                onGoto(null, myHistory.pop());
            } else {
                onClose();
            }
        }

        function onClose() {
            myHistory = [];
            hidePopup();
        }

        function showPopup() {
            $wrapper.show();
            $prev.show();
            $close.show();
        }
        function hidePopup() {
            $wrapper.hide();
            $prev.hide();
            $close.hide();
        }

        $$(function () {
            $wrapper = $$("<div />").addClass("wrapper").css({
                position: "fixed",
                zIndex: 100000,
                background: "#fffe",
                padding: "5px",
                top: "20px",
                left: "20px",
                bottom: "20px",
                right: "20px",
                overflowY: "scroll",
            })
                .hide()
                .appendTo("body");

            $prev = $$("<div />").css({
                position: "absolute",
                right: "140px",
                top: "30px",
                height: "20px",
                width: "40px",
                fontSize: "20px",
                cursor: "pointer",
                zIndex: 100000000
            })
                .text("BACK")
                .hide()
                .appendTo("body")
                .click(onBack);

            $close = $$("<div />").css({
                position: "absolute",
                right: "80px",
                top: "30px",
                height: "20px",
                width: "40px",
                fontSize: "20px",
                cursor: "pointer",
                zIndex: 100000000
            })
                .text("CLOSE")
                .hide()
                .appendTo("body")
                .click(onClose);

            $$("a").click(onGoto);
            $$("nav").css("backgroundColor", "#117FD4");
        });
    }, 100);
})();
