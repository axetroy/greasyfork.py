// ==UserScript==
// @name         Account Settings Dropdown
// @namespace    Superior Silicon
// @version      1.0
// @description  Enumerates all the account settings in the sidebar
// @author       superiorSilicon
// @include      *worldwidetorrents.to*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var accountSettingElement = document.querySelector('.w3-card-2.w3-round.w3-white.w3-padding-large a[href="/account.php"]');
    accountSettingElement.dataset.toggle = "off";
    accountSettingElement.addEventListener('click', toggleSettings);
    accountSettingElement.innerHTML = accountSettingElement.innerHTML + ' <span class="arrow-right"></span>';

    var accountSettingDropdownCode = `<div style="text-align: center;" id="account-settings-dropdown">
<a href="https://worldwidetorrents.to/account.php" target="_blank" class="account-setting-item">Your Settings</a>
<a href="https://worldwidetorrents.to/account.php?action=edit_settings&do=edit" target="_blank" class="account-setting-item">Your Profile</a>
<a href="https://worldwidetorrents.to/account.php?action=changepw" target="_blank" class="account-setting-item">Change Password</a>
<a href="https://worldwidetorrents.to/account.php?action=mytorrents" target="_blank" class="account-setting-item">Your Torrents</a>
<a href="https://worldwidetorrents.to/mailbox.php" target="_blank" class="account-setting-item">Your Messages</a>
<a href="https://worldwidetorrents.to/account.php?action=mycomments" target="_blank" class="account-setting-item">Your Comments</a>
<a href="https://worldwidetorrents.to/account.php?action=myposts" target="_blank" class="account-setting-item">Your Posts</a>
<a href="https://worldwidetorrents.to/account.php?action=mythreads" target="_blank" class="account-setting-item">Your Threads</a>
<a href="https://worldwidetorrents.to/friends.php" target="_blank" class="account-setting-item">Your Friends</a>
<a href="https://worldwidetorrents.to/reputation_member.php" target="_blank" class="account-setting-item">Reputation</a>
<a href="https://worldwidetorrents.to/account.php?action=subs" target="_blank" class="account-setting-item">Subscriptions</a>

<style>.account-setting-item { display: block; font-family: unset !important; }
#account-settings-dropdown { display: none; }
.arrow-right:before { content: "\\27A4" }
.arrow-down:before { content: "\\27A4"; display: inline-block; -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg); }
</style></div>`;

    var range = document.createRange();
    var accountSettingsDropdownElement = range.createContextualFragment(accountSettingDropdownCode);
    accountSettingElement.parentElement.appendChild(accountSettingsDropdownElement);

    function toggleSettings(e) {
        e.preventDefault();
        if (accountSettingElement.dataset.toggle == "off") {
            accountSettingElement.dataset.toggle = "on";
            document.querySelector('#account-settings-dropdown').style.display = "block";
            document.querySelector('.arrow-right').classList.add('arrow-down');
            document.querySelector('.arrow-right').classList.remove('arrow-right');
        } else {
            accountSettingElement.dataset.toggle = "off";
            document.querySelector('#account-settings-dropdown').style.display = "none";
            document.querySelector('.arrow-down').classList.add('arrow-right');
            document.querySelector('.arrow-down').classList.remove('arrow-down');
        }
    }
})();