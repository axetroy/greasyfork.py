// ==UserScript==
// @name         pr0p0ll-notifications
// @namespace    rapsoft/pr0p0ll-notifications
// @version      0.3.3
// @esversion    6
// @description  token based notification system for pr0p0ll
// @author       rapsoft
// @match        http*://pr0gramm.com/*
// @connect      pr0p0ll.com
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

let tokenID;

let pollingLink = "https://pr0p0ll.com/?p=notify&token=";

let linkTarget = "https://pr0p0ll.com/";

let refreshTimeout = 180000;

(function() {
    'use strict';
    let $profileName;
    let $pollLink;
    let $pollLinkImage;
    let $pollLinkAmount;

    let $tokenInput;
    let $tokenInputToggleSwitch;
    let $tokenInputContainer;
    let $tokenInputBox;
    let $tokenInputSaveButton;

    let timeoutHandle;

    function doRequest(url, data, onSuccess, onError) {
        if(!checkLoginState() || !tokenID) {onError("login or token error"); return;}

        let response = GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onerror: onError,
            responseType: 'json',
            timeout: 10000,
            onload: function(data) {
                if(data.status === 200) {
                    try {
                        let jsonData = JSON.parse(data.responseText);
                        if(jsonData.error) {throw new Error(jsonData.error);}
                        onSuccess(jsonData);
                    } catch(err) {
                        onError(err);
                    }
                } else {
                    onError(data.status);
                }
            },
            ontimeout: onError,
            anonymous: true
        });
    }

    function checkLoginState() {
        $profileName = document.getElementById('user-profile-name');
        if($profileName.innerHTML && $profileName.innerHTML.length) {return true;}
        return false;
    }

    function addIcon() {
        if(checkLoginState()) {
            let $inboxLink = document.getElementById('settings-link');
            $pollLink = document.createElement('a');
            $pollLinkImage = document.createElement('span');
            $pollLinkAmount = document.createElement('span');

            $tokenInput = document.createElement('a');
            $tokenInput.setAttribute('class', "empty head-link");

            $tokenInputToggleSwitch = document.createElement('span');
            $tokenInputToggleSwitch.innerHTML = '▾';
            $tokenInputToggleSwitch.setAttribute('class', 'pict');
            $tokenInputToggleSwitch.setAttribute('style', 'cursor: pointer; position: relative;');
            $tokenInputToggleSwitch.onclick = toggleTokenInput;

            $tokenInputContainer = document.createElement('div');
            $tokenInputContainer.onclick = function() {};
            $tokenInputContainer.style.display = 'none';
            $tokenInputContainer.innerHTML = "";
            $tokenInputContainer.setAttribute('style', 'position: absolute; top: 50px; right: 0; height: 38px; width: 250px; background-color: black; border: 1px solid white; padding: 5px; display: none;');

            $tokenInputBox = document.createElement('input');
            $tokenInputBox.type = 'text';
            $tokenInputBox.style.width = '210px';
            $tokenInputContainer.appendChild($tokenInputBox);

            $tokenInputSaveButton = document.createElement('input');
            $tokenInputSaveButton.type = 'button';
            $tokenInputSaveButton.value = '✔';
            $tokenInputSaveButton.onclick = saveToken;

            $tokenInputContainer.appendChild($tokenInputSaveButton);

            $tokenInput.appendChild($tokenInputToggleSwitch);
            $tokenInput.appendChild($tokenInputContainer);

            $pollLink.setAttribute('class', "empty head-link");
            $pollLink.setAttribute('href', linkTarget);
            $pollLink.setAttribute('target', "_blank");
            $pollLink.setAttribute('style', "margin: 0 5px 0 25px;");

            $pollLinkImage.innerHTML = 'c';
            $pollLinkImage.setAttribute('class', 'pict');
            $pollLinkImage.setAttribute('style', 'margin-right: 3px;');

            $pollLinkAmount.innerHTML = '0';

            $pollLink.appendChild($pollLinkImage);
            $pollLink.appendChild($pollLinkAmount);

            $inboxLink.parentNode.insertBefore($pollLink, $inboxLink.nextSibling);
            $pollLink.parentNode.insertBefore($tokenInput, $pollLink.nextSibling);
        }
    }

    function toggleTokenInput() {
        if($tokenInputContainer.style.display == 'none') {
            $tokenInputContainer.style.display = 'block';
            $tokenInputToggleSwitch.innerHTML = '▴';
            $tokenInputBox.focus();
        } else {
            $tokenInputContainer.style.display = 'none';
            $tokenInputToggleSwitch.innerHTML = '▾';
        }
    }

    function saveToken() {
        let input = $tokenInputBox.value.trim();
        if(input.length && input.length == 64) {
            clearTimeout(timeoutHandle);
            tokenID = input;
            updateLinkValues(function(hadSuccess, msg) {
                if(hadSuccess === true) {
                    GM_setValue('tokenID', tokenID);
                    toggleTokenInput();
                } else {
                    clearTimeout(timeoutHandle);
                    alert("Da hat was nicht geklappt. "+msg);
                }
            });
        } else {
            alert("Bitte gültiges 64-stelliges Token eingeben");
            $tokenInputBox.focus();
        }
    }

    function init() {
      if(checkLoginState()) {
        tokenID = GM_getValue('tokenID', null);

        addIcon();

        if(tokenID) {$tokenInputBox.value = tokenID;}

        updateLinkValues();
      }
    }

    function updateLinkValues(callback) {
        doRequest(
            pollingLink + "" + tokenID,
            null,
            function(jsonData) {
                if(jsonData.openPolls <= 0) {
                    $pollLinkAmount.innerHTML = "0";
                    $pollLink.style.color = "#F5F7F6";
                    $pollLinkImage.style.color = "#F5F7F6";
                } else {
                    $pollLinkAmount.innerHTML = jsonData.openPolls;
                    $pollLink.style.color = "#ee4d2e";
                    $pollLinkImage.style.color = "#ee4d2e";
                }
                if(typeof callback === 'function') {callback(true);}
            },
            function(err) {
                $pollLinkAmount.innerHTML = "n/a";
                $pollLink.style.color = "#F5F7F6";
                $pollLinkImage.style.color = "#F5F7F6";
                if(typeof callback === 'function') {callback(false, err);}
            }
        );

        timeoutHandle = setTimeout(updateLinkValues, refreshTimeout);
    }

    init();
})();