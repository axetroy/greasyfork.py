// ==UserScript==
// @name         GitHub Advanced
// @namespace    https://github.com/mdawsondev/github-advanced
// @version      1.2.1
// @description  Adds various enhancements to GitHub.
// @author       Matt Dawson | https://mdawsondev.com
// @icon         https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @include      *github.com/**
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    (function() {
        'use strict';

        const thisURL = window.location.href;

        if (thisURL.includes("/blob/")) {
            // Add "Download" button to individual files.
            const rawBtn = document.querySelector("#raw-url"),
                  dlBtn  = rawBtn.cloneNode();
            dlBtn.setAttribute("download", "");
            dlBtn.text = "Download";
            rawBtn.insertAdjacentElement("afterend", dlBtn);
        }

        if (thisURL.includes("/settings")) {
            // Add repository name to archive and delete fields.
            const inputFields = document.querySelectorAll(".input-block"),
                  repoField   = document.querySelector(".js-repo-name"),
                  repoName    = repoField.value;
            inputFields.forEach(node => node.value = repoName);
        }

        if (thisURL.includes("/tree/")) {
            // Add "Download" button to subfolders.
            const dlFolder = document.createElement("A"),
                  btnGroup = document.querySelector(".BtnGroup");
            dlFolder.href = `https://git.io/vbRmK#home?url=${thisURL}`;
            dlFolder.text = "Download Folder";
            dlFolder.classList = "btn btn-sm BtnGroup-item";
            btnGroup.append(dlFolder);
        }

    })();

/* jshint ignore:start */
]]></>).toString();
                  var c = Babel.transform(inline_src, { presets: [ 'es2015', 'es2016' ] });
eval(c.code);
/* jshint ignore:end */