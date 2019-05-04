// ==UserScript==
// @name         Community Analysis Extension
// @version      5.3
// @description  Community Analysis Extension(https://catool.azurewebsites.net/)
// @icon         https://www.microsoft.com/favicon.ico?v2
// @license      GPL version 3
// @encoding     utf-8
// @date         12/08/2015
// @modified     08/10/2018
// @author       Myfreedom614 <openszone@gmail.com>
// @supportURL   http://franklin614.com/
// @include      https://social.microsoft.com/Forums/*
// @include      https://social.msdn.microsoft.com/Forums/*
// @include      https://social.technet.microsoft.com/Forums/*
// @include      http*://stackoverflow.com/questions/*
// @include      http*://serverfault.com/questions/*
// @include      http*://superuser.com/questions/*
// @include      http*://community.powerbi.com/t5/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/General-Discussion/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/Connecting-to-Data/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/Creating-Apps/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/Using-PowerApps/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/Connectors/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/Expressions-and-Formulas/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/Mobile-App-iOS/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/PowerApps-Forum/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/General-Flow-Discussion/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/Connecting-To-Data/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/Common-Data-Service-for-Apps/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/Administering-PowerApps/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/Building-Flows/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/Using-Flows/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/Flow-Mobile-App/*/*-p/*
// @include      http*://powerusers.microsoft.com/t5/I-Found-A-Bug/*/*-p/*
// @include      https://support.hockeyapp.net/discussions/problems/*
// @include      http*://forums.asp.net/t/*.aspx*
// @include      http*://forums.iis.net/t/*.aspx*
// @include      http*://forums.hololens.com/discussion/*
// @include      http*://app.intercom.io/*/conversations/*
// @include      http*://app.intercom.io/*/conversation/*
// @include      http*://forums.xamarin.com/discussion/*
// @exclude      https://social.msdn.microsoft.com/Forums/*/home*
// @exclude      https://social.technet.microsoft.com/Forums/*/home*
// @grant        none
// @copyright	 2015-2018, Jeffrey Chen, Franklin Chen
// @namespace	 https://greasyfork.org/en/scripts/14666-easy-analysis-extension
// ==/UserScript==
(function (window) {
    'use strict';
    if (typeof window.addin !== 'undefined') {
        return;
    }

    var rootElement = document.getElementById('eas-iframe');

    if (rootElement !== null) {
        return;
    }

    var platforms = [],
        url = location.href,
        options = {};

    function getByValue(arr, value) {
        for (var i = 0, iLen = arr.length; i < iLen; i++) {
            if (arr[i].getAttribute("rel") == value) return arr[i];
        }
    }

    if (window.location.hostname === 'powerusers.microsoft.com' || window.location.hostname === 'community.powerbi.com') {
        var links = document.head.getElementsByTagName("link");
        var link = getByValue(links, 'canonical');
        url = link.getAttribute("href");
    }

    platforms.push({
        'name': 'msdn_technet',
        'id': 3,
        'exp': new RegExp('social.*.microsoft.com/Forums/.*/({{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}}{0,1})'),
        'instanceIdIndex': 1,
        'render': function () {
            var sidebar = document.getElementById('sidebar');
            sidebar.style.width = "237px";
            var firstChild = sidebar.getElementsByTagName('section')[0];
            var section = document.createElement('section');
            section.innerHTML = '<section id="eas-iframe"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: 1px;">&nbsp;Auto Expand?</label></div><div><a id="eas-collapse-button" title="Load EA iframe" href="#" style="color: #fff;background-color: #1e75bb;line-height: normal;padding: .3em 1em .48em 1em;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></section>';
            sidebar.insertBefore(section, firstChild);
        }
    });

    platforms.push({
        'name': 'stackoverflow',
        'id': 5,
        'exp': new RegExp('stackoverflow.com/questions/([0-9]*)/'),
        'instanceIdIndex': 1,
        'render': function () {
            var sidebar = document.getElementById('sidebar');
            var firstChild = sidebar.getElementsByTagName('div')[0];
            var section = document.createElement('div');
            section.innerHTML = '<div class="module" id="eas-iframe"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: -2px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></div>';
            sidebar.insertBefore(section, firstChild);
        }
    });

    platforms.push({
        'name': 'serverfault',
        'id': 4,
        'exp': new RegExp('serverfault.com/questions/([0-9]*)/'),
        'instanceIdIndex': 1,
        'render': function () {
            var sidebar = document.getElementById('sidebar');
            var firstChild = sidebar.getElementsByTagName('div')[0];
            var section = document.createElement('div');
            section.innerHTML = '<div class="module" id="eas-iframe"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: -2px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></div>';
            sidebar.insertBefore(section, firstChild);
        }
    });

    platforms.push({
        'name': 'superuser',
        'id': 6,
        'exp': new RegExp('superuser.com/questions/([0-9]*)/'),
        'instanceIdIndex': 1,
        'render': function () {
            var sidebar = document.getElementById('sidebar');
            var firstChild = sidebar.getElementsByTagName('div')[0];
            var section = document.createElement('div');
            section.innerHTML = '<div class="module" id="eas-iframe"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: -2px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></div>';
            sidebar.insertBefore(section, firstChild);
        }
    });

    platforms.push({
        'name': 'powerbi',
        'id': 2,
        'exp': new RegExp('community.powerbi.com/t5/.*/*-p/([0-9]+)'),
        'instanceIdIndex': 1,
        'render': function () {
            var body = document.body;
            body.style.paddingRight = '310px';

            var firstChild = body.getElementsByTagName('div')[0];

            var section = document.createElement('div');
            section.style.float = 'right';
            section.style.position = 'fixed';
            section.style.right = '1px';
            section.style.top = '180px';

            section.innerHTML = '<div class="module" id="eas-iframe"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: 1px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></div>';

            body.insertBefore(section, firstChild);
        }
    });

    platforms.push({
        'name': 'powerapps',
        'id': 9,
        'exp': new RegExp('powerusers.microsoft.com/t5/(General-Discussion|Connecting-to-Data|Creating-Apps|Using-PowerApps|Connectors|Expressions-and-Formulas|Mobile-App-iOS|PowerApps-Forum|General-Flow-Discussion|Connecting-To-Data|Common-Data-Service-for-Apps|Administering-PowerApps|Building-Flows|Using-Flows|Flow-Mobile-App|I-Found-A-Bug)/.*/*-p/([0-9]+)'),
        'instanceIdIndex': 2,
        'render': function () {
            var sidebar = document.getElementsByClassName("lia-quilt-column-main-left")[0].getElementsByClassName("lia-component-author")[0].parentNode;

            var firstChild = sidebar.getElementsByTagName('div')[0];

            var section = document.createElement('div');

            section.innerHTML = '<div class="module" id="eas-iframe"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: 1px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></div>';

            sidebar.insertBefore(section, firstChild);
        }
    });

    platforms.push({
        'name': 'hockeyapp',
        'id': 8,
        'exp': new RegExp('https://support.hockeyapp.net/discussions/problems/([0-9]+)'),
        'instanceIdIndex': 1,
        'render': function () {
            var sidebar = document.getElementsByClassName("column sidebar")[0];

            var firstChild = sidebar.getElementsByTagName('div')[0];

            var section = document.createElement('div');

            section.innerHTML = '<div class="module" id="eas-iframe"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: 1px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></div>';

            sidebar.insertBefore(section, firstChild);
        }
    });

    platforms.push({
        'name': 'aspnet',
        'id': 1,
        'exp': new RegExp('forums.asp.net/t/([0-9]*).aspx'),
        'instanceIdIndex': 1,
        'render': function () {
            var wrapper = document.getElementById("content-wrapper");
            wrapper.style.maxWidth= "1220px";

            var navContainer = document.getElementsByClassName('module-nav-container')[0];

            var firstChild = navContainer.getElementsByTagName('div')[0];

            var section = document.createElement('div');

            section.innerHTML = '<section id="eas-iframe" style="width: 215px;"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: -2px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></section>';

            navContainer.insertBefore(section, firstChild);
        }
    });

    platforms.push({
        'name': 'iis',
        'id': 12,
        'exp': new RegExp('forums.iis.net/t/([0-9]*).aspx'),
        'instanceIdIndex': 1,
        'render': function () {
            var wrapper = document.getElementById("content-wrapper");
            wrapper.style.maxWidth= "1220px";

            var navContainer = document.getElementsByClassName('module-nav-container')[0];

            var firstChild = navContainer.getElementsByTagName('div')[0];

            var section = document.createElement('div');

            section.innerHTML = '<section id="eas-iframe" style="width: 215px;"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: -2px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></section>';

            navContainer.insertBefore(section, firstChild);
        }
    });

    platforms.push({
        'name': 'mr',
        'id': 10,
        'exp': new RegExp('forums.hololens.com/discussion/([0-9]*)/'),
        'instanceIdIndex': 1,
        'render': function () {
            var sidebar = document.getElementsByClassName('BoxFilter')[0];
            sidebar.style.width = "220px";
            var firstChild = sidebar.getElementsByTagName('span')[0];
            var section = document.createElement('div');
            section.innerHTML = '<section id="eas-iframe"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: 1px;">&nbsp;Auto Expand?</label></div><div><a id="eas-collapse-button" title="Load EA iframe" href="#" style="color: #fff;background-color: #1e75bb;line-height: normal;padding: .3em 1em .48em 1em;display: block;font-size: 16px;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></section>';
            sidebar.insertBefore(section, firstChild);
        }
    });

    platforms.push({
        'name': 'xamarinForum',
        'id': 10,
        'exp': new RegExp('forums.xamarin.com/discussion/([0-9]*)/'),
        'instanceIdIndex': 1,
        'render': function () {
            var body = document.body;

            var firstChild = body.getElementsByTagName('div')[0];

            var section = document.createElement('div');
            section.style.float = 'right';
            section.style.position = 'fixed';
            section.style.right = '1px';
            section.style.top = '180px';
            section.style.zIndex = "9999";

            section.innerHTML = '<div class="module" id="eas-iframe"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: 1px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></div>';

            body.insertBefore(section, firstChild);
        }
    });

    platforms.push({
        'name': 'intercom',
        'id': 11,
        'exp': new RegExp('app.intercom.io/.*/conversation.?/([0-9]*)'),
        'instanceIdIndex': 1,
        'render': function () {
            var checkExist = setInterval(function() {
                if (document.getElementsByClassName('profile-sidebar-section__current-profile').length) {
                    clearInterval(checkExist);

                    var fireOnHashChangesToo = true;
                    var pageURLCheckTimer = setInterval (
                        function () {
                            if (this.lastPathStr !== location.pathname
                                || this.lastQueryStr !== location.search
                                || (fireOnHashChangesToo && this.lastHashStr !== location.hash)
                               ) {
                                this.lastPathStr = location.pathname;
                                this.lastQueryStr = location.search;
                                this.lastHashStr = location.hash;
                                gmMain();
                            }
                        }
                        , 111
                    );

                    function removeElementsParentById(id) {
                        var elem = document.getElementById(id).parentNode;
                        return elem.parentNode.removeChild(elem);
                    }

                    function gmMain() {
                        if(document.getElementById('eas-iframe') !== null){
                            removeElementsParentById('eas-iframe');
                        }

                        var sidebar = document.getElementsByClassName('profile-sidebar-section__current-profile')[0];
                        var firstChild = sidebar.getElementsByTagName('div')[0];
                        var section = document.createElement('div');
                        section.innerHTML = '<section id="eas-iframe"><div><a id="eas-collapse-button" title="Load EA iframe" style="color: #fff;background-color: #1e75bb;line-height: normal;padding: .3em 1em .48em 1em;display: block;font-size: 16px;text-decoration: none;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></section>';
                        sidebar.insertBefore(section, firstChild);

                        var collapseButton = document.getElementById('eas-collapse-button');
                        var array = platform.exp.exec(location.href);

                        collapseButton.addEventListener("click", function () {
                            var iframeUrl = 'https://cas-ext-app.azurewebsites.net/#/boot/' + platform.id + '/' + array[platform.instanceIdIndex] + '/';
                            //console.log(iframeUrl);
                            window.open(iframeUrl, '_blank', 'location=no,height=570,width=300,scrollbars=yes,status=yes');
                        }, false);
                    }
                }
            }, 100);
        }
    });

    function getCurrentPlatform() {
        for (var name in platforms) {
            if(platforms[name].exp !== undefined){
                if (platforms[name].exp.test(url)) {
                    return platforms[name];
                }
            }
        }

        return null;
    }

    var platform = getCurrentPlatform();

    if (platform === null) {
        console.log("not supported platform");

        return;
    }

    var array = platform.exp.exec(url);

    var indentity = array[platform.instanceIdIndex];

    console.log('indentity = ' + indentity);

    // load options from local storage
    var auto = localStorage.getItem(platform.name + ".auto");

    options.auto = (auto !== undefined && auto === 'true');

    function afterRender(){
        var collapseButton = document.getElementById('eas-collapse-button');

        var autoExpandCheckbox = document.getElementById('auto-expand-checkbox');

        var placeholder = document.getElementById('eas-iframe-placeholder');

        autoExpandCheckbox.checked = options.auto;

        autoExpandCheckbox.addEventListener('change', function () {
            localStorage.setItem(platform.name + ".auto", autoExpandCheckbox.checked);
        });

        collapseButton.addEventListener("click", function () {
            updatePanel();
        }, false);

        function updatePanel() {
            var icon = collapseButton.textContent[0];

            if (icon === '+') {
                var iframeUrl = 'https://cas-ext-app.azurewebsites.net/#/boot/' + platform.id + '/' + indentity + '/';

                var iframeHtml = '<iframe src="' + iframeUrl + '" style="width:100%;height:500px;"></iframe>';

                placeholder.innerHTML = iframeHtml;

                collapseButton.textContent = "- Community Analysis";
            }
            else if (icon === '-') {

                while (placeholder.firstChild) {
                    placeholder.removeChild(placeholder.firstChild);
                }

                collapseButton.textContent = "+ Community Analysis";
            }
        }

        if (options.auto) {
            updatePanel();
        }
    }

    // render the html and bind events
    platform.render();

    afterRender();

    window.addin = this;
})(window);