// ==UserScript==
// @name               Amazon S3 Images gallery
// @name:zh-CN         Amazon S3 图片概览
// @namespace          https://github.com/cologler/
// @version            0.1.0.1
// @description        show images gallery on amazon s3 when your files is images.
// @description:zh-CN  在 Amazon S3 上显示图片概览
// @author             cologler
// @match              https://console.aws.amazon.com/s3/*
// @match              https://s3.console.aws.amazon.com/s3/*
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_addStyle
// @grant              GM_getResourceText
// @grant              GM_registerMenuCommand
// @grant              unsafeWindow
// @require            https://cdn.jsdelivr.net/blueimp-gallery/2.15.0/js/blueimp-gallery.min.js
// @resource           blueimp_css    https://cdn.jsdelivr.net/blueimp-gallery/2.15.0/css/blueimp-gallery.min.css
// ==/UserScript==

// just let type script work.
(function() { function require(){}; require("greasemonkey"); })();

(function() {
    'use strict';

    // init blueimp
    GM_addStyle(GM_getResourceText('blueimp_css'));
    (function () {
        let blueimpDiv = document.createElement('div');
        blueimpDiv.id = 'blueimp-gallery';
        blueimpDiv.classList.add('blueimp-gallery');
        blueimpDiv.innerHTML =
        `
        <div class="slides"></div>
        <h3 class="title"></h3>
        <a class="prev">‹</a>
        <a class="next">›</a>
        <a class="close">×</a>
        <a class="play-pause"></a>
        <ol class="indicator"></ol>
        `;
        blueimpDiv.style.zIndex = '1000';
        document.documentElement.appendChild(blueimpDiv);
    })();
    // end

    const bucketEndpointMap = GM_getValue('bucketEndpointMap', {});
    let root = null;

    let bigImage = document.createElement('img');
    bigImage.id = 'big-image';
    bigImage.style.display = 'none';
    bigImage.style.maxWidth = '500px';
    bigImage.style.top = '10%';
    bigImage.style.left = '48%';
    bigImage.style.position = 'fixed';
    bigImage.style.zIndex = '999';
    document.documentElement.appendChild(bigImage);

    let lineHeight = null;
    function onNode(node) {
        if (root === null) return;
        if (node.dataset.fileUrl) return; // handled

        let nameElement = node.querySelector('.list-view-item-name');
        let url = root + nameElement.innerText.trim();
        node.dataset.fileUrl = url;

        if (url.endsWith('.jpg') ||
            url.endsWith('.png') ||
            url.endsWith('.bmp')) {
            node.dataset.isImage = true;
        }

        lineHeight = lineHeight || getComputedStyle(node).height || '40px';

        if (node.dataset.isImage) {
            let img = document.createElement('img');
            img.classList.add('image');
            img.setAttribute('data-src', url);
            img.src = url;
            img.style.height = 'inherit';
            img.style.float = 'right';
            img.setAttribute('async', '');
            $(img).hover(
                () => {
                    bigImage.src = url;
                    $(bigImage).show();
                },
                () => $(bigImage).hide()
            );
            node.appendChild(img);
        }
    }

    let url = null;
    let bucketName = null;
    function onPageLoaded() {
        if (url == location.href) {
            return;
        }
        url = location.href;
        bucketName = location.pathname.substr(11).match(/[^\/]+/)[0];
        let storage = bucketEndpointMap[bucketName];
        root = storage ? `https://${storage}.amazonaws.com` + location.pathname.substr(11) : null;
    }

    function onFilePanel(panel) {
        let a = panel.querySelector('.link a');
        if (a){
            let href = panel.querySelector('.link a').href;
            let storage = href.match(/:\/\/([^\.]+)\./)[1];
            bucketEndpointMap[bucketName] = storage;
            GM_setValue('bucketEndpointMap', bucketEndpointMap);
        }
    }

    let observer = new MutationObserver(mrs => {
        onPageLoaded();
        mrs.forEach(mr => {
            mr.addedNodes.forEach(z => {
                if (!bucketEndpointMap[bucketName]) {
                    if (z.classList && z.classList.contains('storage-console-config-panel')) {
                        onFilePanel(z);
                    }
                }
                if (z.querySelectorAll) {
                    z.querySelectorAll('td.truncate').forEach(onNode);
                }
            });
        });
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });

    let commandName = 'show images gallary';
    GM_registerMenuCommand(commandName, () => {
        let table = document.querySelector('table.table tbody');
        if (table) {
            blueimp.Gallery(table.querySelectorAll('.image'), {
                urlProperty: 'src',
                indicatorContainer: 'ol',
                activeIndicatorClass: 'active',
                thumbnailProperty: 'src',
                thumbnailIndicators: true
            });
        }
    });
})();