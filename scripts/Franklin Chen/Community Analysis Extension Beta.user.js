// ==UserScript==
// @name         Community Analysis Extension Beta
// @version      3.6.1
// @description  Community Analysis Extension(https://catool.azurewebsites.net/)
// @icon         https://www.microsoft.com/favicon.ico?v2
// @license      GPL version 3
// @encoding     utf-8
// @date         12/08/2015
// @modified     11/14/2016
// @author       Myfreedom614 <openszone@gmail.com>
// @supportURL   http://openszone.com/
// @include        https://social.msdn.microsoft.com/Forums/*
// @include        https://social.technet.microsoft.com/Forums/*
// @include        http*://stackoverflow.com/questions/*
// @include        http*://serverfault.com/questions/*
// @include        http*://superuser.com/questions/*
// @include        http*://community.powerbi.com/t5/*/*-p/*
// @include        http*://powerusers.microsoft.com/t5/PowerApps-Forum/*/*-p/*
// @include        http*://powerusers.microsoft.com/t5/Flow-Forum/*/*-p/*
// @include        https://support.hockeyapp.net/discussions/problems/*
// @include        http*://forums.asp.net/t/*.aspx*
// @include        http*://forums.iis.net/t/*.aspx*
// @exclude      https://social.msdn.microsoft.com/Forums/*/home*
// @exclude      https://social.technet.microsoft.com/Forums/*/home*
// @grant        none
// @copyright	 2015-2016, Jeffrey Chen, Franklin Chen
// @namespace	 https://greasyfork.org/en/scripts/24834-community-analysis-extension-beta
// ==/UserScript==
(function (window) {
    'use strict';
    if (typeof window.addin !== 'undefined') {
        return;
    }

    var rootElement = document.getElementById('eas-iframe');

    if (rootElement !== null)
    {
        return;
    }

    var _globalSession = {
        url: location.href,
        host: location.host,
        platform: null,
        context: {},
        options: {}
    };
    
    var rules = {
        'mt': {
            'exp': new RegExp('social..*.microsoft.com/Forums/.*/({{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}}{0,1})'),
            'instanceIdIndex': 1,
            'render': function () {
                var sidebar = document.getElementById('sidebar');

                var firstChild = sidebar.getElementsByTagName('section')[0];

                var section = document.createElement('section');

                section.innerHTML = '<section id="eas-iframe"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: 1px;">&nbsp;Auto Expand?</label></div><div><a id="eas-collapse-button" title="Load EA iframe" href="#" style="color: #fff;background-color: #1e75bb;line-height: normal;padding: .3em 1em .48em 1em;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></section>';

                sidebar.insertBefore(section, firstChild);
            }
        },
        'powerbi': {
            'exp': new RegExp('community.powerbi.com/t5/.*/*-p/([0-9]+)'),
            'instanceIdIndex': 1,
            'render': function () {
                var body = document.body;
                body.style.paddingRight = '310px';

                var firstChild = body.getElementsByTagName('div')[0];
                
                var section = document.createElement('div');
                section.style.float='right';
                section.style.position='fixed';
                section.style.right='1px';
                section.style.top='180px';

                section.innerHTML = '<div class="module" id="eas-iframe"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: 1px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></div>';

                body.insertBefore(section, firstChild);
            }
        },
        'powerapps': {
            'exp': new RegExp('powerusers.microsoft.com/t5/(PowerApps-Forum|Flow-Forum)/.*/*-p/([0-9]+)'),
            'instanceIdIndex': 2,
            'render': function () {
                var sidebar = document.getElementsByClassName("lia-quilt-column-main-left")[0].getElementsByClassName("lia-component-author")[0].parentNode;

                var firstChild = sidebar.getElementsByTagName('div')[0];

                var section = document.createElement('div');

                section.innerHTML = '<div class="module" id="eas-iframe"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: 1px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></div>';

                sidebar.insertBefore(section, firstChild);
            }
        },
        'hockeyapp': {
            'exp': new RegExp('https://support.hockeyapp.net/discussions/problems/([0-9]+)'),
            'instanceIdIndex': 1,
            'render': function () {
                var sidebar = document.getElementsByClassName("column sidebar")[0];

                var firstChild = sidebar.getElementsByTagName('div')[0];

                var section = document.createElement('div');

                section.innerHTML = '<div class="module" id="eas-iframe"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: 1px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></div>';

                sidebar.insertBefore(section, firstChild);
            }
        },
        'sotool': {
            'exp': new RegExp('(stackoverflow.com|serverfault.com|superuser.com)/questions/([0-9]*)/'),
            'instanceIdIndex': 2,
            'render': function () {
                var sidebar = document.getElementById('sidebar');

                var firstChild = sidebar.getElementsByTagName('div')[0];

                var section = document.createElement('div');

                section.innerHTML = '<div class="module" id="eas-iframe"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: -2px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></div>';

                sidebar.insertBefore(section, firstChild);
            }
        },
        'aspnet': {
            'exp': new RegExp('forums.asp.net/t/([0-9]*).aspx'),
            'instanceIdIndex': 1,
            'render': function () {
                var navContainer = document.getElementsByClassName('module-nav-container')[0];

                var firstChild = navContainer.getElementsByTagName('div')[0];

                var section = document.createElement('div');

                section.innerHTML = '<section id="eas-iframe" style="width: 165px;"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: -2px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></section>';
                
                navContainer.insertBefore(section, firstChild);
            }
        },
        'iis': {
            'exp': new RegExp('forums.iis.net/t/([0-9]*).aspx'),
            'instanceIdIndex': 1,
            'render': function () {
                var navContainer = document.getElementsByClassName('module-nav-container')[0];

                var firstChild = navContainer.getElementsByTagName('div')[0];

                var section = document.createElement('div');

                section.innerHTML = '<section id="eas-iframe" style="width: 165px;"><div><label style="font-size: 80%;color: red;"><input type="checkbox" id="auto-expand-checkbox" style="vertical-align: middle;position: relative;bottom: -2px;">&nbsp;Auto Expand?</label><a id="eas-collapse-button" href="#" style="color: #FFFFFF;background: #1e75bb;padding: 4px 10px 5px;font-size: 14px;line-height: 1.3;display: block;">+ Community Analysis</a></div><div id="eas-iframe-placeholder"></div></section>';
                
                navContainer.insertBefore(section, firstChild);
            }
        }
    };

    for(var name in rules)
    {
        if (rules[name].exp.test(_globalSession.url))
        {
            _globalSession.platform = name;

            console.log('platform: ' + name);
        }
    }

    if(_globalSession.platform === null)
    {
        console.log("not supported platform");

        return;
    }

    // set instance id
    var array = rules[_globalSession.platform].exp.exec(_globalSession.url);

    _globalSession.context.instanceId = array[rules[_globalSession.platform].instanceIdIndex];

    console.log('instanceId: ' + _globalSession.context.instanceId);

    // load options from local storage
    var auto = localStorage.getItem(_globalSession.platform + ".auto");

    _globalSession.options.auto = (auto !== undefined && auto === 'true');

    // render the html and bind events
    rules[_globalSession.platform].render();

    var collapseButton = document.getElementById('eas-collapse-button');

    var autoExpandCheckbox = document.getElementById('auto-expand-checkbox');

    var placeholder = document.getElementById('eas-iframe-placeholder');

    autoExpandCheckbox.checked = _globalSession.options.auto;

    autoExpandCheckbox.addEventListener('change', function () {
        localStorage.setItem(_globalSession.platform + ".auto", autoExpandCheckbox.checked);
    });

    collapseButton.addEventListener("click", function () {
        updatePanel();
    }, false);

    function updatePanel() {
        var icon = collapseButton.textContent[0];

        if (icon === '+') {
            
            var iframeUrl = 'https://analyzeit.azurewebsites.net/bootframe.html#/' + _globalSession.context.instanceId + '/' + _globalSession.platform+ '/' + _globalSession.host;
            
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

    if (_globalSession.options.auto)
    {
        updatePanel();
    }

    window.addin = this;
})(window);