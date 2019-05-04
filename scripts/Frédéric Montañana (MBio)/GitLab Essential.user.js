// ==UserScript==
// @name         GitLab Essential
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Allow to toggle the issue and merge request informations to show only the discussion and comments. Add a sumarry on Wiki pages
// @author       MuyBien
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        http://gitlab.mbiolims.fr/*
// @match        https://gitlab.com/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    const sidebar = document.querySelector('.sidebar-container');
    const firstChild = document.querySelector('.sidebar-container').childNodes[0];

                       const summaryWrapper = document.createElement('div');
                       summaryWrapper.classList = 'summary-wrapper';
                       sidebar.insertBefore(summaryWrapper, firstChild);

                       const summaryTitle = document.createElement('h1');
                       summaryTitle.innerHTML = 'Sommaire';
                       summaryWrapper.appendChild(summaryTitle);

                       const titles = document.querySelectorAll('.wiki h1, .wiki h2, .wiki h3, .wiki h4, .wiki h5, .wiki h6');
                       titles.forEach(function(title) {
                       var summaryLink = title.firstElementChild.cloneNode(true);
                       summaryLink.innerHTML = title.textContent;
                       summaryLink.classList = title.tagName.toLowerCase();
                       summaryWrapper.appendChild(summaryLink);
                       });

                       addGlobalStyle('.summary-wrapper { margin-bottom: 10px; padding: 0 16px 1vh; border-bottom: 1px solid #e8e8e8; }');
                       addGlobalStyle('.summary-wrapper h1 { margin-top: 1vh; }');
                       addGlobalStyle('.summary-wrapper a { display: block;font-size: 1em; margin: 10px; }');
                       addGlobalStyle('.summary-wrapper a.h2 { padding-left: 10px; }');
                       addGlobalStyle('.summary-wrapper a.h3 { padding-left: 20px; }');
                       addGlobalStyle('.summary-wrapper a.h4 { padding-left: 30px; }');
                       addGlobalStyle('.summary-wrapper a.h5 { padding-left: 40px; }');
                       addGlobalStyle('.summary-wrapper a.h6 { padding-left: 50px; }');


                       /* jshint ignore:start */
                      ]]></>).toString();
                  var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */