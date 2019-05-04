// ==UserScript==
// @name                github: jsdelivr button
// @namespace           https://github.com/Cologler/
// @version             0.2.4.1
// @description         add CDN-jsdelivr button on js/css file
// @author              Cologler (skyoflw@gmail.com)
// @match               https://github.com/*
// @grant               none
// @noframes
// @license             MIT
// @require             https://greasyfork.org/scripts/369577/code/event-emitter.js
// @require             https://greasyfork.org/scripts/369578/code/dom.js
// @require             https://cdn.jsdelivr.net/gh/Cologler/dom-builder-typescript@0.1.0/dist/dom-builder.js
// @require             https://cdn.jsdelivr.net/gh/Cologler/monkey-in-zoo-javascript@0.1.3/src/lib-github.js
// ==/UserScript==

// hosting on:

// let type script auto-completion work.
(function() { function require(){}; require("greasemonkey"); })();

if (typeof Components === 'undefined') {
    var Components = {};
}

(function(factory) {
    'use strict';
    const ScriptName = 'github: jsdelivr button';
    const component = factory();
    Components[component.name] = component;
    if (GM_info.script.name === ScriptName) {
        component.main();
    }
})(function() {
    'use strict';
    const component = {
        name: 'jsdelivr-button',
        desc: 'github: jsdelivr button',
    };
    const TAG = Symbol.for(GM_info.script.namespace + component.name);

    function parseGithubUrl(pathname) {
        //: /Cologler/dom-builder-typescript/blob/master/dist/dom-builder.js

        pathname = pathname.substr(1);
        const result = {};
        /** @type {string[]} */
        const parts = pathname.split(/\//g);
        result.owner = parts.shift();
        result.repo = parts.shift();
        result.mode = parts.shift(); // blob
        result.branch = parts.shift(); // master
        result.path = parts.join('/');
        return result;
    }

    function getJsdelivrUrl(githubUrl) {
        // https://cdn.jsdelivr.net/gh/Cologler/dom-builder-typescript/dist/dom-builder.js
        // https://cdn.jsdelivr.net/gh/Cologler/dom-builder-typescript@0.1.0/dist/dom-builder.js

        const parts = ['https://cdn.jsdelivr.net', 'gh'];
        parts.push(githubUrl.owner);
        let repo = githubUrl.repo;
        if (githubUrl.branch !== 'master') {
            repo += '@' + githubUrl.branch;
        }
        parts.push(repo);
        parts.push(githubUrl.path);
        return parts.join('/');
    }

    const db = DomBuilder;

    function main() {
        github.file({ type: ['css', 'javascript'] }).addAnchor('CDN-jsdelivr', () => {
            return getJsdelivrUrl(parseGithubUrl(location.pathname));
        }).apply();
    }

    return Object.assign(component, {
        main,
    });
});
