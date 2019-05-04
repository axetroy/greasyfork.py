// ==UserScript==
// @name         去除淘宝链接 SPM (Beta)
// @namespace    http://misakamikoto.example.org/
// @version      0.1.1
// @description  去除淘宝链接的跟踪参数，保护隐私（注意：不能去除从 URL 栏直接访问的链接中的参数）
// @author       MisakaMikoto
// @match        https://*.taobao.com/*
// @match        https://*.tmall.com/*
// @match        https://*.aliyun.com/*
// @match        https://*.fliggy.com/*
// @match        http://*.fliggy.com/*
// @match        https://*.1688.com/*
// @match        http://*.1688.com/*
// @match        https://*.youku.com/*
// @match        http://*.youku.com/*
// @grant        none
// ==/UserScript==

clearSpmClickEventListener = function(event) {
    setTimeout('clearSpmValue();', 1);
};

mouseUpEventListener = function(event) {
    if (event.button == 2) { return; }
    console.log(event);
    var atag;
    try {
        atag = event.originalTarget;
    } catch (Exception) {
        var eventPathLength = event.path.length;
        for (var i = 0; i < eventPathLength; i++) {
            atag = event.path[i];
            if (atag.tagName == 'A') {
                break;
            }
        }
    }
    console.log(atag);
    var url = atag.getAttribute('data-no-spm-href');
    if (url == null) { return; }
    event.stopPropagation();
    console.log('open ' + url);
    window.open(url, atag.getAttribute('data-real-target'));
};

clearSpmValueInterval = setInterval('clearSpmValue()', 1000);

clearSpmValue = function() {
    var spmParam = [
        'spm',
        'acm',
        'scm',
        'scm',
        'pvid',
        'uid',
        'trackInfo',
        'wh_weex',
        'wh_biz',
        'abtest',
        'pos',
        'alg_bts',
        'lygClk',
        'impid',
        'wh_pid',
        'sourceId',
        'initiative_id',
        'stats_click',
        'bftRwd',
        'bftTag',
        'bftFlag',
        'from',
        'cat',
        'ssid',
        'cps',
        'ppath',
        'app',
        'algArgs',
        'rpos',
        'appid',
        'scene',
        't_trace_id',
        'lwfrom',
        'utparam'
        ];
    var spmParamLength = spmParam.length;

    var tmpNodes = document.all;
    var nodes = [];
    var nodesListLength = tmpNodes.length;
    for (var ii = 0; ii < nodesListLength; ii++) {
        var inode = tmpNodes[ii];
        nodes[ii] = inode;
    }
    tmpNodes = undefined;
    for (var i = 0; i < nodesListLength; i++) {
        var node = nodes[i];
        node.setAttribute('data-spm', '');
        node.setAttribute('data-clicked', '');
        node.setAttribute('data-spm-anchor-id', '');
        if (node.getAttribute('listener-added') != undefined) {
            continue;
        }
        node.setAttribute('listener-added', '');
        if (node.tagName == 'A') {
            var link = node.getAttribute('href');
            if (link == null || link == '#') {
                continue;
            }
            node.addEventListener('mousedown', clearSpmClickEventListener);
            link = removeSpmParam(link);
            node.setAttribute('href', link);
            /* force use script open
            node.addEventListener('mouseup', mouseUpEventListener);
            node.setAttribute('data-no-spm-href', link);
            node.setAttribute('data-real-target', node.target);
            node.href = '#';
            node.target = '_self';
            */
        }
    }

    function removeSpmParam(link) {
        if (link == null) {
            return;
        }
        var qPath = link.indexOf('?');
        var cleanLink = link.substring(0, qPath + 1);
        var textParam = link.substring(qPath + 1);
        var paramsList = textParam.split('&');
        var paramsListLength = paramsList.length;
        for (var i = 0; i < paramsListLength; i++) {
            var param = paramsList[i];
            if (checkIsSpm(param.split('=')[0])) { continue; }
            cleanLink += param + '&';
        }
        return cleanLink.substring(0, cleanLink.length - 1);
    }

    function checkIsSpm(key) {
        for (var i = 0; i < spmParamLength; i++) {
            var k = spmParam[i];
            if (k == key) {
                return true;
            }
        }
        return false;
    }
};

clearSpmValue();