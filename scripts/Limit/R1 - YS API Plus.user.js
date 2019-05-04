// ==UserScript==
// @name         R1 - YS API Plus
// @version      2.0.7
// @description  Add several enhancements to YS API on R1
// @author       Limit
// @exclude      *://*.rewards1.com/forums/*
// @match        *://*.rewards1.com/*
// @grant        none
// @namespace    https://greasyfork.org/users/141657
// ==/UserScript==

var surveys = [
    {
        payout: 1000,
        id: 9629824
    },
    {
        payout: 875,
        id: 9199581
    },
    {
        payout: 750,
        id: 9199582
    },
    {
        payout: 625,
        id: 9128884
    },
    {
        payout: 600,
        id: 11168891
    },
    {
        payout: 500,
        id: 9141040
    },
    {
        payout: 450,
        id: 9152765
    },
    {
        payout: 400,
        id: 9186978
    },
    {
        payout: 350,
        id: 9168340
    },
    {
        payout: 300,
        id: 11339079
    },
    {
        payout: 225,
        id: 9144310
    },
    {
        payout: 200,
        id: 9141239
    },
    {
        payout: 150,
        id: 11650340
    },
    {
        payout: 137.5,
        id: 13219678
    },
    {
        payout: 120,
        id: 11584420
    },
    {
        payout: 100,
        id: 12012613
    },
    {
        payout: 85,
        id: 11997560
    },
];

function update() {
    if (localStorage.ysPlusNewestVersion && versionCompare(GM_info.script.version, localStorage.ysPlusNewestVersion) === -1) {
        spAlertHTML('[YS-API+] why won\'t you <a href=\'https://greasyfork.org/scripts/40941-r1-ys-api-plus/code/R1%20-%20YS%20API%20Plus.user.js\'>update</a> ;_;');
        return;
    }
    if (!localStorage.ysPlusLastUpdateCheck) localStorage.ysPlusLastUpdateCheck = 0;
    // check for updates with a minimum of a 1 hr delay
    // hrs * mins * secs * ms
    if (Date.now() - localStorage.ysPlusLastUpdateCheck > 1 * 60 * 60 * 1000) {
        localStorage.ysPlusLastUpdateCheck = Date.now();
        fetch('https://greasyfork.org/scripts/40941-r1-ys-api-plus/code/R1%20-%20YS%20API%20Plus.meta.js').then(res => res.text()).then(text => {
            var newVersion = text.split('@version')[1].split('\n')[0].trim();
            if (versionCompare(GM_info.script.version, newVersion) === -1) {
                localStorage.ysPlusNewestVersion = newVersion;
                spAlertHTML('[YS-API+] New version available! <a href=\'https://greasyfork.org/scripts/40941-r1-ys-api-plus/code/R1%20-%20YS%20API%20Plus.user.js\'>Please update to version ' + newVersion + '.</a>');
            }
        });
    }
}

function init() {
    clearTimeout(readyTimer);
    spRemoveListener('ready', init);

    //spAlert('(ysapi+) sp detected!');

    // every 5 mins (won't actually check until 1hr+ has elapsed since last update check)
    setInterval(update, 5 * 60 * 1000);
    update();

    spListen('ysLoaded', onYsLoad);
    spListen('ysUnloaded', onYsUnload);
}

function onYsLoad() {
    //spAlert('(ysapi+) ys loaded!');

    // ==================================
    // === ADD SURVEY ID & STRIP LINK ===
    // ==================================
    // Element array with max length 21 (1 router + 20 api's)
    var surveyList = document.getElementsByClassName('ys-api')[0].children[0].children[0].children;
    // Starting at 1 instead of 0 to skip the router entry
    for (var i = 1, l = surveyList.length; i < l; i++) {
        var surveyId = parseInt(surveyList[i].children[0].children[0].children[0].id.split('-')[2], 10);
        var titles = surveyList[i].getElementsByTagName('h3');
        for (var j = 0, tl = titles.length; j < tl; j++) {
            titles[j].innerHTML = '<span onclick="return false;" style="user-select: all; cursor: text; background: #728e8e;color: #fff;text-shadow: 1px 1px #222;padding: 2px 5px;font-size: 14px;border-radius: 3px;margin-right: 5px;display: inline-block;">' + surveyId + '</span>' + titles[j].innerHTML.trim();
        }
        var links = surveyList[i].getElementsByTagName('a');
        for (var k = 0, ll = links.length; k < ll; k++) {
            links[k].href = 'https://www.your-surveys.com/?si=157&ssi=' + spGet('userId') + '&offer_id=' + surveyId;
        }
    }
    // ==================================
    // ======= ADD CUSTOM ENTRIES =======
    // ==================================

    //
    // --- LARGE SCREEN / DESKTOP ENTRY ---
    //
    var customEntry = surveyList[1].cloneNode(true);
    customEntry.children[0].children[0].style.transition = 'opacity ease-in 0.25s';
    surveyList[1].parentNode.insertBefore(customEntry, surveyList[1]);
    setTimeout(() => { customEntry.children[0].children[0].style.opacity = 1; }, 0);

    customEntry.getElementsByTagName('a')[0].id = 'ys_custom_link_desktop';

    var customTitles = customEntry.getElementsByClassName('title');
    customTitles[0].onclick = () => { return false; };
    customTitles[0].innerHTML = '<input id="ys_custom_input_desktop" maxlength="8" style="width:140px;margin:0 auto;display:block;cursor:text;font-family:Lato;font-size:28px;box-sizing:content-box;padding:5px 15px;outline:0;border:none;user-select:all;text-align:center;background:#728e8e;color:#fff;text-shadow:2px 2px #222;border-radius:3px">';

    var customMetaData = customEntry.getElementsByClassName('meta-data-list')[0];
    customMetaData.children[0].title = '';
    customMetaData.children[0].innerHTML = 'YS-API+&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;By Limit';
    customMetaData.removeChild(customMetaData.children[1]);
    customMetaData.removeChild(customMetaData.children[1]);

    customEntry.getElementsByClassName('payout')[0].children[0].outerHTML = '<select id="ys_custom_select_desktop" class="points" style="height:20px;outline:0;border:none;background:0 0;font-family:\'Roboto Mono\',sans-serif;font-size: 16px;cursor:pointer;margin-right: 3px;color: #fff;"></select>';

    customEntry.getElementsByClassName('payout-holder')[0].style.background = 'url("data:image/svg+xml,%3Csvg xmlns:dc=\'http://purl.org/dc/elements/1.1/\' xmlns:cc=\'http://creativecommons.org/ns%23\' xmlns:rdf=\'http://www.w3.org/1999/02/22-rdf-syntax-ns%23\' xmlns:svg=\'http://www.w3.org/2000/svg\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' xmlns:sodipodi=\'http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\' xmlns:inkscape=\'http://www.inkscape.org/namespaces/inkscape\' width=\'200\' height=\'50\' viewBox=\'0 0 52.916666 13.229167\' version=\'1.1\' id=\'svg5002\' inkscape:version=\'0.92.2 (5c3e80d, 2017-08-06)\' sodipodi:docname=\'out4.svg\'%3E%3Cdefs id=\'defs4996\'%3E%3ClinearGradient inkscape:collect=\'always\' id=\'linearGradient5012\'%3E%3Cstop style=\'stop-color:%23001717;stop-opacity:1;\' offset=\'0\' id=\'stop5008\'/%3E%3Cstop style=\'stop-color:%23007070;stop-opacity:1\' offset=\'1\' id=\'stop5010\'/%3E%3C/linearGradient%3E%3ClinearGradient inkscape:collect=\'always\' xlink:href=\'%23linearGradient5012\' id=\'linearGradient5014\' x1=\'217.00558\' y1=\'286.51117\' x2=\'206.89645\' y2=\'286.29794\' gradientUnits=\'userSpaceOnUse\'/%3E%3ClinearGradient inkscape:collect=\'always\' xlink:href=\'%23linearGradient5012\' id=\'linearGradient5595\' gradientUnits=\'userSpaceOnUse\' x1=\'217.00558\' y1=\'286.51117\' x2=\'204.29391\' y2=\'286.47543\'/%3E%3C/defs%3E%3Csodipodi:namedview id=\'base\' pagecolor=\'%23ffffff\' bordercolor=\'%23666666\' borderopacity=\'1.0\' inkscape:pageopacity=\'0.0\' inkscape:pageshadow=\'2\' inkscape:zoom=\'11.2\' inkscape:cx=\'131.86532\' inkscape:cy=\'45.500371\' inkscape:document-units=\'mm\' inkscape:current-layer=\'g5593\' showgrid=\'true\' showborder=\'true\' inkscape:snap-grids=\'false\' inkscape:window-width=\'2560\' inkscape:window-height=\'1377\' inkscape:window-x=\'2552\' inkscape:window-y=\'-8\' inkscape:window-maximized=\'1\' inkscape:pagecheckerboard=\'false\' units=\'px\'%3E%3Cinkscape:grid type=\'xygrid\' id=\'grid5004\'/%3E%3C/sodipodi:namedview%3E%3Cmetadata id=\'metadata4999\'%3E%3Crdf:RDF%3E%3Ccc:Work rdf:about=\'\'%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource=\'http://purl.org/dc/dcmitype/StillImage\'/%3E%3Cdc:title/%3E%3C/cc:Work%3E%3C/rdf:RDF%3E%3C/metadata%3E%3Cg inkscape:label=\'Layer 1\' inkscape:groupmode=\'layer\' id=\'layer1\' transform=\'translate(0,-283.77083)\'/%3E%3Cg id=\'g5593\' inkscape:groupmode=\'layer\' inkscape:label=\'Layer 1 copy\' transform=\'translate(0,-283.77083)\'%3E%3Cg id=\'g5631\' transform=\'matrix(0.07261701,0,0,0.06654827,22.47618,266.39705)\'%3E%3Cg transform=\'translate(53.483632,14.363096)\' id=\'g5563\'%3E%3Cg id=\'g5583\'%3E%3Cpath sodipodi:nodetypes=\'ccscc\' inkscape:connector-curvature=\'0\' id=\'path5006\' d=\'M 0,296.73272 200.18487,297 c 0,0 20.17525,0.18899 19.98626,-10.20535 -0.18899,-10.39437 -20.22173,-9.82739 -20.22173,-9.82739 V 297\' style=\'fill:url(%23linearGradient5014);fill-opacity:1;stroke:%23000000;stroke-width:5.88349977;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\'/%3E%3Cpath inkscape:connector-curvature=\'0\' id=\'path5559\' d=\'m 0,396.95879 200.05124,0.13364 c 0,0 19.91158,0.13364 19.91158,-10.0226 0,-10.15624 0.11382,-100.13344 0.11382,-100.13344\' style=\'fill:none;stroke:%23000000;stroke-width:5.88349977;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\'/%3E%3C/g%3E%3C/g%3E%3Cg id=\'g5591\' transform=\'matrix(-1,0,0,1,53.483631,14.363095)\'%3E%3Cg id=\'g5589\'%3E%3Cpath sodipodi:nodetypes=\'ccscc\' style=\'fill:url(%23linearGradient5595);fill-opacity:1;stroke:%23000000;stroke-width:5.88349977;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\' d=\'M 0,296.73272 200.18487,297 c 0,0 20.17525,0.18899 19.98626,-10.20535 -0.18899,-10.39437 -20.22173,-9.82739 -20.22173,-9.82739 V 297\' id=\'path5585\' inkscape:connector-curvature=\'0\'/%3E%3Cpath style=\'fill:none;stroke:%23000000;stroke-width:5.88349977;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\' d=\'m 0,396.95879 200.05124,0.13364 c 0,0 19.91158,0.13364 19.91158,-10.0226 0,-10.15624 0.11382,-100.13344 0.11382,-100.13344\' id=\'path5587\' inkscape:connector-curvature=\'0\'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Cpath style=\'opacity:1;fill:%23009090;fill-opacity:1;stroke-width:1.92377955;stroke-miterlimit:4;stroke-dasharray:none\' d=\'m 42.067209,37.227156 c -1.159816,-0.282393 -2.061416,-0.8078 -2.343848,-1.365875 -0.168942,-0.333825 -0.221602,-3.242222 -0.223614,-12.350274 l -0.0026,-11.913621 0.580357,0.342052 c 1.631208,0.961406 -2.048908,0.90521 59.423933,0.907411 41.696823,0.0015 56.959473,-0.05174 57.678573,-0.201167 0.53781,-0.111759 1.31937,-0.390398 1.73678,-0.619199 l 0.75893,-0.416 v 12.105936 12.105935 l -0.45791,0.457903 c -0.25184,0.251847 -0.83443,0.604322 -1.29464,0.783279 -0.80269,0.312134 -3.15868,0.326604 -57.89031,0.35553 -44.961181,0.02376 -57.246877,-0.01691 -57.965618,-0.19191 z\' id=\'path5633\' inkscape:connector-curvature=\'0\' transform=\'matrix(0.26458333,0,0,0.26458333,0,283.77083)\'/%3E%3C/g%3E%3C/svg%3E") center 40%/cover no-repeat';

    var customInput = document.getElementById('ys_custom_input_desktop');
    var customSelect = document.getElementById('ys_custom_select_desktop');

    var option = document.createElement('option');
    option.style.background = '#1f1f1f';
    option.style.color = '#ccc';
    option.innerHTML = '????';
    option.value = '';
    option.default = true;
    option.hidden = true;
    customSelect.appendChild(option);

    for (let i = 0, l = surveys.length; i < l; i++) {
        let opt = option.cloneNode();
        opt.default = false;
        opt.hidden = false;
        opt.innerHTML = surveys[i].payout;
        opt.value = surveys[i].id;
        customSelect.appendChild(opt);
    }

    customInput.addEventListener('input', updateDesktopSelect);
    customSelect.addEventListener('change', updateDesktopInput);

    customInput.value = customSelect.value = surveys[0].id;
    updateDesktopLink(surveys[0].id);

    //
    // --- SMALL SCREEN / MOBILE ENTRY ---
    //
    customTitles[1].innerHTML = '<span onclick="return false;" style="user-select: all; cursor: text; background: #728e8e;color: #fff;text-shadow: 1px 1px #222;padding: 2px 5px;font-size: 14px;border-radius: 3px;margin-right: 5px;display: inline-block;">12345678</span>Custom entry not yet supported on screen size.';
}

function onYsUnload() {
    //spAlert('(ysapi+) ys unloaded!');
}

function updateDesktopInput() {
    var customInput = document.getElementById('ys_custom_input_desktop');
    var customSelect = document.getElementById('ys_custom_select_desktop');

    customInput.value = customSelect.value;

    updateDesktopLink(customInput.value);
}

function updateDesktopSelect() {
    var customInput = document.getElementById('ys_custom_input_desktop');
    var customSelect = document.getElementById('ys_custom_select_desktop');

    customInput.value = customInput.value.replace(/[^\d]+/g, '');

    if (surveys.find(s => s.id === parseInt(customInput.value, 10))) {
        customSelect.value = customInput.value;
    } else {
        customSelect.value = '';
    }

    updateDesktopLink(customInput.value);
}

function updateDesktopLink(surveyId) {
    var customLink = document.getElementById('ys_custom_link_desktop');
    customLink.href = 'https://www.your-surveys.com/?si=157&ssi=' + spGet('userId') + '&offer_id=' + surveyId;
}

// https://gist.github.com/pc035860/ccb58a02f5085db0c97d
function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');

    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }

        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}

// Getter method, cause why not
function spGet(k) {
    return window.sp[k];
}

// Setter method, cause why not
function spSet(k, v) {
    return (window.sp[k] = v);
}

// Shorter calls to window.sp.alert
function spAlert(msg) {
    return window.sp.alert(msg);
}

// Shorter calls to window.sp.alertHTML
function spAlertHTML(msg) {
    return window.sp.alertHTML(msg);
}

// Wrapper for sp event listeners
function spListen(e, c) {
    window.addEventListener('sp' + e[0].toUpperCase() + e.substr(1), c);
}

// Wrapper to delete sp event listeners
function spRemoveListener(e, c) {
    window.removeEventListener('sp' + e[0].toUpperCase() + e.substr(1), c);
}

// Start a 10 second timer, which should later be cancelled by the init event
// If it doesn't get cancelled, sp hasn't dispatched the ready event for over 10 secs, and so likely isn't present
var readyTimer = setTimeout(() => {
    if (window.sp.userId) {
        alert('[YS-API+] Script engine doesn\'t seem to be present (or took longer than 10 seconds to initialize). Make sure it\'s installed and contact Limit if you still have problems.');
    }
}, 10000);

// If sp is already ready, run init, else add a listener for the 'spReady' event
(window.sp && window.sp.ready) ? init() : spListen('ready', init);