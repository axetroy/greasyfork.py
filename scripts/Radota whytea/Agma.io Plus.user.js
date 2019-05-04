// ==UserScript==
// @name         Agma.io Plus
// @namespace    http://tampermonkey.net/
// @version      2.0.1
// @description  Fastest Mass Ejector & Split Macro
// @author       ZeWoxiCYT
// @match        agma.io
// @grant        none
// @run-at       document-end
// ==/UserScript==




<div id="modal" data-izimodal-title="Agma.io Plus <small>v1.2.0</small>" data-izimodal-subtitle="Created with <span class='text-danger'><i class='fa fa-heart'></i></span> by ZeWoxiC / YoTe" data-izimodal-icon="icon-home" aria-hidden="false" aria-labelledby="modal" role="dialog" class="iziModal dark" style="background: rgb(18, 18, 18); z-index: 999; border-radius: 3px; border-bottom: 3px solid rgb(34, 34, 34); overflow: hidden; max-width: 800px; display: block; height: 377px;"><div class="iziModal-header" style="background: rgb(34, 34, 34); padding-right: 44px;"><i class="iziModal-header-icon icon-home"></i><h2 class="iziModal-header-title">Agma.io Plus <small>v1.2.0</small></h2><p class="iziModal-header-subtitle">Created with <span class="text-danger"><i class="fa fa-heart"></i></span>by ZeWoxiCYT / YoTe</p><div class="iziModal-header-buttons"><a href="javascript:void(0)" class="iziModal-button iziModal-button-close" data-izimodal-close=""></a></div></div><div class="iziModal-wrap" style="height: auto;"><div class="iziModal-content" style="padding: 0px;">
  <div class="iziModal-content" style="padding: 0px;">
    <div class="aplus-modal">
      <ul class="nav nav-tabs" role="tablist" style="background: #282828;">
          <li role="presentation" class=""><a href="#aplus_modules" role="tab" data-toggle="tab" aria-expanded="false">Modules</a></li>
          <li role="presentation" class="active"><a href="#aplus_keybinds" role="tab" data-toggle="tab" aria-expanded="true">Keybinds</a></li>
          <li role="presentation"><a href="#aplus_settings" role="tab" data-toggle="tab">Settings</a></li>
          <li role="presentation" class="pull-right"><a href="#aplus_profiles" role="tab" data-toggle="tab">Profiles</a></li>
      </ul>
      <div class="tab-content">
          <div role="tabpanel" class="tab-pane" id="aplus_modules">

            <h4 class="aplus-modal-subcat">General</h4>
            <div class="row" id="APlus_category">
                <!-- Row #1: -->
                <div class="funkyradio col-sm-4">
                    <div class="funkyradio-success">

                        <input type="checkbox" name="checkbox" id="APlus_respawnOnKey" data-aplus-variable="respawnOnKey" data-aplus-help="Press a <span>key</span> to respawn. Use the <span>Keybinds</span> menu to change the key.">

                        <label for="APlus_respawnOnKey">Respawn on key</label>
                    </div>
                    <div class="funkyradio-success">

                        <input type="checkbox" name="checkbox" id="APlus_autoAccept" data-aplus-variable="autoAccept" data-aplus-help="Automatically <span>accepts</span> incoming party invites.">

                        <label for="APlus_autoAccept">Auto Accept</label>
                    </div>
                </div>

                <!-- Row #2: -->
                <div class="funkyradio col-sm-4">
                    <div class="funkyradio-success">

                        <input type="checkbox" name="checkbox" id="APlus_randomName" data-aplus-variable="randomName" data-aplus-help="Generates a <span>random name</span> when you die.">

                        <label for="APlus_randomName">Random Name</label>
                    </div>
                    <div class="funkyradio-success">

                        <input type="checkbox" name="checkbox" id="APlus_skipDeathScreen" data-aplus-variable="skipDeathScreen" data-aplus-help="Automatically <span>skips</span> past the death screen, allowing a faster respawn.">

                        <label for="APlus_skipDeathScreen">Skip Death Screen</label>
                    </div>
                </div>

                <!-- Row #3: -->
                <div class="funkyradio col-sm-4">
                    <div class="funkyradio-success">
                        <input type="checkbox" name="checkbox" id="APlus_autoDecline" data-aplus-variable="autoDecline" data-aplus-help="Automatically <span>declines</span> incoming party invites.">

                        <label for="APlus_autoDecline">Auto Decline</label>
                    </div>
                    <div class="funkyradio-success">
                        <input type="checkbox" name="checkbox" id="APlus_bypassAntiPaste" data-aplus-variable="bypassAntiPaste" data-aplus-help="Allows you to <span>paste</span> stuff in the chat.">
                        <label for="APlus_bypassAntiPaste">Bypass Anti-Paste</label>
                    </div>
                </div>
            </div>

            <h4 class="aplus-modal-subcat">Exploits</h4>
            <div class="row" id="APlus_category">

                <!-- Row #1: -->
                <div class="funkyradio col-sm-4">
                    <div class="funkyradio-success">
                        <input type="checkbox" name="checkbox" id="APlus_nameStealer" data-aplus-variable="nameStealer" data-aplus-help="Allows you to <span>steal</span> other players' names. <span style='color: red'>(DISABLED)</span>" disabled="">

                        <label for="APlus_nameStealer">Name Stealer</label>
                    </div>
                </div>
                
                <!-- Row #2: -->
                <div class="funkyradio col-sm-4">
                    <div class="funkyradio-success">
                        <input type="checkbox" name="checkbox" id="APlus_coinSpoofer" data-aplus-variable="coinSpoofer" data-aplus-help="Allows you to <span>spoof</span> your coins.">
                        <!--data-aplus-help="Allows you to <span>spoof</span> your coins. Use the <span>Settings</span> menu to change the speed.">-->
                        <label for="APlus_coinSpoofer">Coin Spoofer</label>
                    </div>
                </div>

            </div>

            <h4 class="aplus-modal-subcat">Other</h4>
            <div class="row" id="APlus_category">
                <!-- Row #1: -->
                <div class="funkyradio col-sm-4">
                    <div class="funkyradio-success">
                        <input type="checkbox" name="checkbox" id="APlus_displayNotifications" data-aplus-variable="displayNotifications" data-aplus-help="Toggle the <span>notifications</span> from <span>modules</span> (e.g: Auto Declines / Accepts, Name Stealer)" checked="">
                        <label for="APlus_displayNotifications">Module Notifications</label>
                    </div>
                </div>
            </div>
            </div>

            <div role="tabpanel" class="tab-pane active" id="aplus_keybinds">

            <h4 class="aplus-modal-subcat">General</h4>
            <div class="row" id="APlus_category">

                <!-- Row #1: -->
                <div class="col-sm-4">
                    <div class="input-group">
                        <span class="ap-input-group-addon">Respawn Key:</span>
                        <input id="APlus_bind_respawnKey" type="text" class="ap-form-control ap-keybind-input" name="msg" value="X" data-aplus-keybind="respawnKey" readonly="">
                    </div>
                </div>

            </div>

            <h4 class="aplus-modal-subcat">Other</h4>
            <div class="row" id="APlus_category">

                <!-- Row #1: -->
                <div class="col-sm-4">
                    <div class="input-group">
                        <span class="ap-input-group-addon">Menu Key:</span>
                        <input id="APlus_bind_menuKey" type="text" class="ap-form-control ap-keybind-input" name="msg" value="INSERT" data-aplus-keybind="menuKey" readonly="">
                    </div>
                </div>

            </div>
        </div>

        <div role="tabpanel" class="tab-pane" id="aplus_settings">
            <br>
            <h4 class="aplus-modal-subcat">Coming Soon <img src="emotes/1f604.png" width="20" height="20"></h4>
            <!--
            <h4 class="aplus-modal-subcat">Exploits</h4>
            <div class="row" id="APlus_category">

                <!-- Row #1:
                <div class="col-sm-4">
                    <div class="input-group">
                        <span class="ap-input-group-addon">Coin Spoof Delay (ms):</span>
                        <input id="APlus_setting_coinSpoofDelay" type="text" class="ap-form-control" name="msg" value="1000" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
                    </div>
                </div>

            </div>-->
        </div>

        <div role="tabpanel" class="tab-pane" id="aplus_profiles">
            <br>
            <h4 class="aplus-modal-subcat">Coming Soon <img src="emotes/1f604.png" width="20" height="20"></h4>
        </div>
      </div>
    </div>
    
    <div class="aplus-modal-helptext text-center">
        <p id="APlus_helptext"></p>
    </div>

    <div class="aplus-modal-footer">
        <a href="https://discord.gg/8CjNujY" target="_blank">Discord</a> <span class="pull-right">v1.2.0</span>
    </div>
  </div>
</div></div></div>