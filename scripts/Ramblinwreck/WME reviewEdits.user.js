// ==UserScript==
// @name         WME reviewEdits
// @namespace    https://greasyfork.org/en/scripts/382070-wme-reviewedits
// @version      2019.04.29
// @description  copies information from WME and adds to google sheet for record of reviewed edits.
// @author       ramblinwreck_81
// @include      https://www.waze.com/en-US/editor*
// @exclude      https://www.waze.com/user/editor*
// @grant        none
// @require      https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js?version=229392


// ==/UserScript==

(function() {
    'use strict';
    var RE_Name = GM_info.script.name;
    var RE_Version = GM_info.script.version;
    var settings = {};
    function bootstrap(tries) {
        console.log('reviewEdits: bootstrap');
        tries = tries || 1;

        if (W && W.map &&
            W.model && W.loginManager.user &&
            $ ) {
            RE_init();
//            tabBuilder();
        } else if (tries < 1000) {
            setTimeout(function () {bootstrap(tries++);}, 200);
        }
    }
    function RE_log(message) {
        if (typeof message === "string") {
            console.log("Review Edits: " + message);
        } else {
            console.log("Review Edits: ", message);
        }
    }

    function RE_init() {
        // Check document elements are ready
        var userInfo = document.getElementById("user-info");
        if (userInfo === null) {
            window.setTimeout(RE_init, 500);
            return;
        }
        var userTabs = document.getElementById("user-tabs");
        if (userTabs === null) {
            window.setTimeout(RE_init, 500);
            return;
        }
        var navTab = userInfo.getElementsByTagName("ul");
        if (navTab.length === 0) {
            window.setTimeout(RE_init, 500);
            return;
        }
        if (typeof navTab[0] === "undefined") {
            window.setTimeout(RE_init, 500);
            return;
        }
        var tabContent = userInfo.getElementsByTagName("div");
        if (tabContent.length === 0) {
            window.setTimeout(RE_init, 500);
            return;
        }
        if (typeof tabContent[0] === "undefined") {
            window.setTimeout(RE_init, 500);
            return;
        }
        var editorURL = '';
        RE_addUserTab();
        RE_addFormBtn();
        function RE_addFormBtn() {
            RE_log('adding form button');
            var selection = W.selectionManager.getSelectedFeatures();
            var REDiv = document.createElement("div"),
                REMnu = document.createElement("select"),
                REBtn = document.createElement("button");
            var formWindowName = "Review Edits result",
                formWindowSpecs = "resizable=1,menubar=0,scrollbars=1,status=0,toolbar=0";
            var editPanel,
                selElem,
                formLink;
           REDiv.id = "reviewEditsDiv";
            editPanel = document.getElementById("edit-panel");
            selElem = editPanel.getElementsByClassName("selection");
            if (selection.length === 0) { // || selection[0].model.type !== "segment") {
                //formfiller_log("No segments selected.");
                return;
            }
            if (document.getElementById("reviewEditsDiv")) {
                //formfiller_log("Div already created");
                return;
            }

           var forms = [{
                name: "SER Editor Review",
                url: "https://docs.google.com/forms/d/e/1FAIpQLSepKZpDjeHySl95eArUn5iwTuOTUPvpz0ZvqaHg7LbvmBB1Lw/viewform",
                fields: {
                    editDate: "233607996",
                    specificPermalink: "906461981",
                    reviewingEditor: "605955152",
                    sentToEditorPL: "76560122",
                    editorName: "1493012276"
                }
            }];

            forms.forEach(function (key, i) {
                REMnu.options.add(new Option(forms[i].name, i));
            });
            REBtn.innerHTML = "Go to Form";
            REBtn.onclick = function () {
                //alert(ffMnu.options[ffMnu.selectedIndex].value+": "+forms[ffMnu.options[ffMnu.selectedIndex].value].name);
                RE_saveSettings();
                formLink = RE_createFormLink(forms[REMnu.options[REMnu.selectedIndex].value]);
                if (typeof formLink === "undefined") {
                    return;
                }

                if ($("#RE-open-in-tab").prop("checked")) {
                    window.open(formLink, "_blank");
                } else {
                    window.open(formLink, formWindowName, formWindowSpecs);
                }
            };
            REDiv.appendChild(REMnu);
            REDiv.appendChild(REBtn);
            selElem[0].appendChild(REDiv);

            return;
    } // end of RE_addFormBtn
        function createURL(selection)
        {
        var permalink = "https://www.waze.com/en-US/editor?",
            segIDs = [];
        var latLon = W.map.center.clone().transform(W.map.projection.projCode, W.map.displayProjection.projCode);
        var lat = latLon.lat,
            lon = latLon.lon;
        var env = W.location ? W.location.code : W.app.getAppRegionCode();
        var zoom = W.map.zoom;
        var latOffset;
        var lonOffset;
        var zoomOffset;
        if (W.selectionManager.getSelectedFeatures()[0].model.type === "venue") {  // code for selection is a place venue
            latLon = selection[0].geometry.transform(W.map.projection.projCode, W.map.displayProjection.projCode);
            lat = latLon.y;
            lon = latLon.x;
            console.log('lon is: ' + lon);
           // lon = selection[0].geometry.transform(W.map.displayProjection.projCode).x;
            console.log('lat is: ' + lat);
            console.log('lon is: ' + lon);
            permalink += "env=" + env + "&lon=" + lon + "&lat=" + lat + "&zoom=" + zoom.toString() + "&venues=" + W.selectionManager.getSelectedFeatures()[0].model.attributes.id;
            latOffset = lat + 0.003;
            lonOffset = lon - 0.003;
            zoomOffset = W.map.zoom - 2;
        } else {   // code for if selection is a segment(s)
            var type = "segments";
            var zoomToRoadType = W.Config.segments.zoomToRoadType;
            var i;
        //To get lat and long centered on segment
            if (selection.length === 1) {
                latLon = selection[0].model.getCenter().clone();
                latLon.transform(W.map.projection.projCode, W.map.displayProjection.projCode);
                lat = latLon.y;
                lon = latLon.x;
                latOffset = lat + 0.003;
                lonOffset = lon - 0.003;
                zoomOffset = W.map.zoom - 2;
            }

            for (i = 0; i < selection.length; i += 1) {
                var segment = selection[i].model;
                if (segment.type === "segment") {
                    segIDs.push(segment.attributes.id);
                    if (zoomToRoadType[zoom] !== -1 && zoomToRoadType[zoom].indexOf(segment.attributes.roadType) === -1) {
                        alert("This zoom level (" + zoom.toString() + ") cannot be used for this road type! Please increase your zoom:\n" +
                              "Streets: 4+\nOther drivable and Non-drivable: 3+\nHighways and PS: 2+");
                        formfiller_log("Zoom level not correct for segment: " + zoom.toString() + " " + segment.attributes.roadType.toString());
                        return;
                    }
                }
            }
            permalink += "env=" + env + "&lon=" + lon + "&lat=" + lat + "&zoom=" + zoom.toString() + "&" + type + "=" + segIDs.join();
        } // end of if(test)
        var strStartURL = 'https://www.waze.com/en-US/editor?env=usa&lon=';
        var correctURL;
        var newURL;
        editorURL = strStartURL + lonOffset + '&lat=' + latOffset + '&zoom=' + zoomOffset;
        return permalink;
        } // end of createURL function
        function RE_getLastEditor(selection) {
            var eID;
            var editorNames = "";
            var newEdName = "";
            selection.forEach(function (selected) {
                eID = selected.model.attributes.updatedBy;
                if (typeof eID !== "undefined") {
                    RE_log("Unable to get updatedBy on " + selected.model.attributes.id);
                    eID = selected.model.attributes.createdBy;
                }
                newEdName = W.model.users.getObjectById(eID).userName;
                if (editorNames.indexOf(newEdName) === -1) {
                    editorNames += ", " + newEdName;
                }

            });
            editorNames = editorNames.substr(2);
            return editorNames;
        }
        function RE_createFormLink(formSel) {
        var selection = W.selectionManager.getSelectedFeatures();
        var formValues = {};
        var formFields = formSel.fields;
        var formLink = formSel.url + "?entry.";
        var formArgs = [];
        if (selection.length === 0) { // || selection[0].model.type !== "segment") {
            RE_log("No segments selected.");
            return;
        }
        Object.keys(formFields).forEach(function (key, index) {
            switch (key) {

            case "reviewingEditor":
                formValues[key] = W.loginManager.user.userName;
                break;
            case "specificPermalink":
                formValues[key] = createURL(selection);
                if (typeof formValues.specificPermalink === "undefined") {
                    RE_log("No permalink generated");
                    return;
                }
                break;
             case "sentToEditorPL":
                 formValues[key] = editorURL;
                 break;
            case "editDate":
                    var a = selection[0].model.attributes.updatedOn;
                    var b = new Date(a).toLocaleDateString();
                 formValues[key] = b;
                 break;
            case "editorName":
                formValues[key] = RE_getLastEditor(selection);
                break;
            default:
                RE_log("Nothing defined for " + key);
                break;
            }

            //Add entry to form URL, if there's something to add
            if (typeof formValues[key] !== "undefined" && formValues[key] !== "") {
                formArgs[index] = formFields[key] + "=" + encodeURIComponent(formValues[key]);
            }
        });
        formLink += formArgs.join("&entry.");

        RE_log(formLink);
        return formLink;
    }  // end of createFormLink

        var reviewEditsObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                // Mutation is a NodeList and doesn't support forEach like an array
                for (var i = 0; i < mutation.addedNodes.length; i += 1) {
                    var addedNode = mutation.addedNodes[i];

                    // Only fire up if it's a node
                    if (addedNode.nodeType === Node.ELEMENT_NODE) {
                        var selectionDiv = addedNode.querySelector("div.selection");

                        if (selectionDiv) {
                            RE_addFormBtn();
                        }
                    }
                }
            });
        });
        reviewEditsObserver.observe(document.getElementById("edit-panel"), {
            childList: true,
            subtree: true
        });
        if (W.app.modeController) {
            W.app.modeController.model.bind("change:mode", function (model, modeId) {
                if (modeId === 0) {
                   RE_addUserTab();
                }
            });
        }

        // Unit switched (imperial/metric)
        if (W.prefs) {
            W.prefs.on("change:isImperial", RE_addUserTab);
        }

        if (!W.selectionManager.getSelectedFeatures) {
            W.selectionManager.getSelectedFeatures = W.selectionManager.getSelectedItems;
        }
        RE_log("Init done");
        return;
    } //end of RE_init

    function tabBuilder()
    {
        console.log('initiating WME ReviewEdits')
        var $section = $("<div>");
        $section.html([
            '<div>',
            '<h2>RE_Tab</h2>',
            '<input type="checkbox" id="RE_Enabled" class="RE_SettingsCheckbox"><label for="RE_Enabled">Enable This Script</label>',
            '<hr>',
            '<hr>',
            '<div>',
            '</div>',
            '</div>'
        ].join(' '));
    } // end of tabBuilder function
    function RE_addUserTab() {
        RE_log('adding tab');
        var userInfo = document.getElementById("user-info"),
            userTabs = document.getElementById("user-tabs"),
            navTabs = userTabs.getElementsByClassName("nav-tabs"),
            tabContent = userInfo.getElementsByClassName("tab-content");
        var RETab = document.createElement("li"),
            REPanel = document.createElement("div"),
            RENewTabBox = document.createElement("input"),
            RENewTabLabel = document.createElement("label"),
            RETabInfo = document.createElement("div");

        RETab.innerHTML = '<a title="Review Edits" href="#sidepanel-reviewEdits" data-toggle="tab">Review Edits</a>';
        REPanel.id = "sidepanel-reviewEdits";
        REPanel.className = "tab-pane";
        RE_log('name: ' + RE_Name + ', Version: ' + RE_Version);
        RETabInfo.innerHTML = '<b>' + RE_Name + '</b> v' + RE_Version;
        RENewTabBox.id = "RE-open-in-tab";
        RENewTabBox.type = "checkbox";
        RENewTabBox.name = "RE_open_tab";
        RENewTabLabel.innerHTML = "Open form in new tab";
        RENewTabLabel.for = "RE_open_tab";
        REPanel.appendChild(RETabInfo);
        REPanel.appendChild(RENewTabBox);
        REPanel.appendChild(RENewTabLabel);
        navTabs[0].appendChild(RETab);
        tabContent[0].appendChild(REPanel);
        RE_loadSettings();

    }
    function RE_loadSettings() {

        var REOpenInTab = localStorage.getItem("RE-open-in-tab");
        if (REOpenInTab === "1") {
            $("#RE-open-in-tab").trigger("click");
        }
        return;
    }

    function RE_saveSettings() {
        if ($("#RE-open-in-tab").prop("checked")) {
            localStorage.setItem("RE-open-in-tab", "1");
        } else {
            localStorage.setItem("RE-open-in-tab", "0");
        }
        return;
    }
    bootstrap();
})();
