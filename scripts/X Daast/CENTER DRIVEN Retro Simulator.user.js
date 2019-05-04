// ==UserScript==
// @name            CENTER DRIVEN Retro Simulator
// @description     CENTER DRIVEN's Old School Combat Simulator and Combat Stats
// @author          XDAAST.XDaast.KingCrimson | Thanks to Topper42, Eferz98, KRS_L, PythEch, MrHIDEn, Panavia2, Deyhak, CodeEcho, Matthias Fuchs, Enceladus, TheLuminary, Da Xue, Quor, WildKatana, Peluski17, Eistee
// @version         6.0
// @namespace       http*://*.alliances.commandandconquer.com/*/index.aspx*
// @include         http*://*.alliances.commandandconquer.com/*/index.aspx*
// @icon            https://www.openmerchantaccount.com/img/cdCNCTALOGObigger.png
// @grant           GM_getValue
// @grant           GM_log
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// ==/UserScript==
(function() {
  var t = document.createElement("script");
  t.innerHTML = "(" + function() {
    function t() {
      qx.Class.define("Simulator", {type:"singleton", extend:qx.core.Object, construct:function() {
        try {
          this.armyBar = qx.core.Init.getApplication().getArmySetupAttackBar();
          this.playArea = qx.core.Init.getApplication().getMainOverlay();
          this.replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
          this.isSimButtonDisabled = !1;
          this.armyTempFormations = [];
          this.armyTempIdx = 0;
          this.isSimulation = !1;
          this.hideArmyTooltips();
          var d;
          this.simBtn = (new qx.ui.form.Button("", "https://image.ibb.co/ckFQKa/069de63e72bddaf4b06ba9f0955ef7ef.png")).set({toolTipText:"<center>SIMULATE BATTLE!</center><br>Note: update loot table with 'Update' button in stats window.", width:50, height:50, alignY:"middle", appearance:"button-text-small"});
          this.simBtn.addListener("click", function() {
            this.__openSimulatorWindow();
            Simulator.StatWindow.getInstance().simulateStats();
          }, this);
          this.simBtn.getChildControl("icon").set({width:50, height:50, scale:!0});
          this.simBtn.hide();
          this.playArea.add(this.simBtn, {left:null, right:3, bottom:130});
          this.statBtn = (new qx.ui.form.Button("", "https://image.ibb.co/fBpkKa/stats.png")).set({toolTipText:"STATS MENU OF GLORY", show:"icon", width:25, height:25, alignY:"middle", appearance:"button-text-small"});
          this.statBtn.getChildControl("icon").set({width:15, height:15, scale:!0});
          this.statBtn.addListener("click", function() {
            Simulator.StatWindow.getInstance().simulateStats();
            this.__openStatWindow();
            
          }, this);
          this.statBtn.hide();
          this.playArea.add(this.statBtn, {left:null, right:33, bottom:389});
          this.optionBtn = (new qx.ui.form.Button("", "https://image.ibb.co/c76bQF/optionssmall.png")).set({toolTipText:"THE OPTIONS BRO", width:45, height:45, alignY:"middle", appearance:"button-text-small"});
          this.optionBtn.addListener("click", function() {
            this.__openOptionWindow();
          }, this);
          this.optionBtn.getChildControl("icon").set({width:45, height:45, scale:!0});
          this.optionBtn.hide();
          this.playArea.add(this.optionBtn, {left:null, right:3, bottom:414});
          this.layoutBtn = (new qx.ui.form.Button("", "https://image.ibb.co/jFNO4v/layoutbtn.png")).set({toolTipText:"YOUR PRETTY LAYOUTS, GET 'em SAVED", show:"icon", width:25, height:25, alignY:"middle", appearance:"button-text-small"});
          this.layoutBtn.getChildControl("icon").set({width:15, height:15, scale:!0});
          this.layoutBtn.addListener("click", function() {
            this.__openLayoutWindow();
          }, this);
          this.layoutBtn.hide();
          this.playArea.add(this.layoutBtn, {left:null, right:3, bottom:389});
         /*
          
          this.unlockCmtBtn = (new qx.ui.form.Button("Unlock")).set({toolTipText:"UNLOCK MOFO!", width:50, height:50, opacity:0.7, alignY:"middle", appearance:"button-text-small"});
          this.unlockCmtBtn.addListener("click", function() {
            this.timeoutCmtBtn();
          }, this);
          this.armyBar.add(this.unlockCmtBtn, {left:null, right:7, bottom:5});
          this.unlockRTBtn = (new qx.ui.form.Button("Unlock")).set({toolTipText:"REPAIR YOUR SH!T", width:50, height:50, opacity:0.7, alignY:"middle", appearance:"button-text-small"});
          this.unlockRTBtn.addListener("click", function() {
            this.timeoutRTBtn();
          }, this);
          this.armyBar.add(this.unlockRTBtn, {left:null, right:7, bottom:97});
          */
         
          this.shiftUpBtn = (new qx.ui.form.Button("", "https://image.ibb.co/dLTO5F/shiftu.png")).set({toolTipText:"MOVE ALL THEM F*CKIN UNITS ONE SPACE UP!", width:20, height:20, center:!0, gap:0, alignY:"middle", appearance:"button-text-small", iconPosition:"top", show:"icon"});
          this.shiftUpBtn.addListener("click", function() {
            this.shiftFormation("u", 0);
            Simulator.StatWindow.getInstance().simulateStats();
          }, this);
          this.shiftUpBtn.hide();
          this.playArea.add(this.shiftUpBtn, {left:null, right:25, bottom:214});
          
          this.shiftDownBtn = (new qx.ui.form.Button("", "https://image.ibb.co/eK2GQF/shiftd.png")).set({toolTipText:"MOVE ALL THEM F*CKIN UNITS ONE SPACE DOWN!", width:20, height:20, center:!0, gap:0, alignY:"middle", appearance:"button-text-small", iconPosition:"top", show:"icon"});
          this.shiftDownBtn.addListener("click", function() {
            this.shiftFormation("d", 0);
            Simulator.StatWindow.getInstance().simulateStats();
          }, this);
          this.shiftDownBtn.hide();
          this.playArea.add(this.shiftDownBtn, {left:null, right:25, bottom:189});
          this.shiftLeftBtn = (new qx.ui.form.Button("", "https://image.ibb.co/cdmMsv/shiftl.png")).set({toolTipText:"MOVE ALL THEM F*CKIN UNITS ONE SPACE LEFT!", width:20, height:20, center:!0, gap:0, alignY:"middle", appearance:"button-text-small", iconPosition:"top", show:"icon"});
          this.shiftLeftBtn.addListener("click", function() {
            this.shiftFormation("l", 0);
            Simulator.StatWindow.getInstance().simulateStats();
          }, this);
          this.shiftLeftBtn.hide();
          this.playArea.add(this.shiftLeftBtn, {left:null, right:50, bottom:203});
          this.shiftRightBtn = (new qx.ui.form.Button("", "https://image.ibb.co/cvpVkF/shiftr.png")).set({toolTipText:"MOVE ALL THEM F*CKIN UNITS ONE SPACE RIGHT!", width:20, height:20, center:!0, gap:0, alignY:"middle", appearance:"button-text-small", iconPosition:"top", show:"icon"});
          this.shiftRightBtn.addListener("click", function() {
            this.shiftFormation("r", 0);
            Simulator.StatWindow.getInstance().simulateStats();
          }, this);
          this.shiftRightBtn.hide();
          this.playArea.add(this.shiftRightBtn, {left:null, right:3, bottom:203});
          /*
          for (d = 0; d < ClientLib.Base.Util.get_ArmyMaxSlotCountY(); d++) {
            var b = (new qx.ui.form.Button(d + 1, "https://image.ibb.co/cdmMsv/shiftl.png")).set({toolTipText:"SHIFTS YOUR UNITZ ONE SPACE LEFT!", maxWidth:35, maxHeight:24, center:!0, alignY:"middle", show:"icon", iconPosition:"top"});
            b.addListener("click", function(b) {
              this.shiftFormation("l", parseInt(b.getTarget().getLabel(), 10));
            }, this);
            var e = (new qx.ui.form.Button(d + 1, "https://image.ibb.co/cvpVkF/shiftr.png")).set({toolTipText:"SHIFTS YOUR UNITZ ONE SPACE RIGHT!", maxWidth:35, maxHeight:24, center:!0, alignY:"middle", show:"icon", iconPosition:"top"});
            e.addListener("click", function(b) {
              this.shiftFormation("r", parseInt(b.getTarget().getLabel(), 10));
            }, this);
            var g = this.armyBar.getChildren()[1].getChildren()[d + 4];
            g.removeAll();
            g.setLayout(new qx.ui.layout.HBox);
            g.add(new qx.ui.core.Spacer, {flex:1});
            g.add(b);
            g.add(e);
            g.add(new qx.ui.core.Spacer, {flex:1});
          }
          */
          this.mirrorBtnH = (new qx.ui.form.Button("", "https://image.ibb.co/cKf35F/mirror.png")).set({toolTipText:"FLIP", show:"icon", width:25, height:25, center:!0, alignY:"middle", appearance:"button-text-small"});
          this.mirrorBtnH.getChildControl("icon").set({width:15, height:15, scale:!0});
          this.mirrorBtnH.addListener("click", function() {
            this.mirrorFormation("h");
            Simulator.StatWindow.getInstance().simulateStats();
          }, this);
          this.mirrorBtnH.hide();
          this.playArea.add(this.mirrorBtnH, {left:null, right:3, bottom:289.5});
          this.mirrorBtnV = (new qx.ui.form.Button("", "https://image.ibb.co/jHVgsv/flip.png")).set({toolTipText:"MIRROR", show:"icon", width:25, height:25, center:!0, alignY:"middle", appearance:"button-text-small"});
          this.mirrorBtnV.getChildControl("icon").set({width:15, height:15, scale:!0});
          this.mirrorBtnV.addListener("click", function() {
            this.mirrorFormation("v");
            Simulator.StatWindow.getInstance().simulateStats();
          }, this);
          this.mirrorBtnV.hide();
          this.playArea.add(this.mirrorBtnV, {left:null, right:33, bottom:289.5});
          this.mirrorBtnC = (new qx.ui.form.Button("3-4", "https://image.ibb.co/gW3ZCv/swap3_4.png")).set({toolTipText:"F*CKIN FLIPS LINES 3&4", show:"icon", width:20, height:10, center:!0, alignY:"middle", appearance:"button-text-small"});
          this.mirrorBtnC.getChildControl("icon").set({width:19, height:23, scale:!0});
          this.mirrorBtnC.addListener("click", function() {
            this.mirrorFormation("c");
            Simulator.StatWindow.getInstance().simulateStats();
          }, this);
          this.mirrorBtnC.hide();
          this.playArea.add(this.mirrorBtnC, {left:null, right:3, bottom:239.5});
          this.mirrorBtnK = (new qx.ui.form.Button("1-2", "https://image.ibb.co/csjKea/swap1_2.png")).set({toolTipText:"F*CKIN FLIPS LINES 1&2", show:"icon", width:20, height:10, center:!0, alignY:"middle", appearance:"button-text-small"});
          this.mirrorBtnK.getChildControl("icon").set({width:19, height:23, scale:!0});
          this.mirrorBtnK.addListener("click", function() {
            this.swapFormation("k");
            Simulator.StatWindow.getInstance().simulateStats();
          }, this);
          this.mirrorBtnK.hide();
          this.playArea.add(this.mirrorBtnK, {left:null, right:18.5, bottom:264.5});
          this.mirrorBtnU = (new qx.ui.form.Button("2-3", "https://image.ibb.co/kNmAkF/swap2_3.png")).set({toolTipText:"F*CKIN FLIPS LINES 2&3", show:"icon", width:20, height:10, center:!0, alignY:"middle", appearance:"button-text-small"});
          this.mirrorBtnU.getChildControl("icon").set({width:19, height:23, scale:!0});
          this.mirrorBtnU.addListener("click", function() {
            this.swapFormationz("z");
            Simulator.StatWindow.getInstance().simulateStats();
          }, this);
          this.mirrorBtnU.hide();
          this.playArea.add(this.mirrorBtnU, {left:null, right:34, bottom:239.5});
          this.disableAllUnitsBtn = new qx.ui.form.ToggleButton("", "https://image.ibb.co/iiaECv/disableall.png");
          this.disableAllUnitsBtn.set({width:25, height:25, appearance:"button-text-small", show:"icon", toolTipText:"F*CKIN TURNS IT ALL OFF!"});
          this.disableAllUnitsBtn.getChildControl("icon").set({width:15, height:15, scale:!0});
          this.disableAllUnitsBtn.addListener("changeValue", function() {
            var b = this.disableAllUnitsBtn;
            b.getValue() ? (b.setOpacity(0.75), b.setToolTipText("F*CKIN TURNS IT ALL ON!")) : (b.setOpacity(1), b.setToolTipText("F*CKIN TURNS IT ALL OFF!"));
            Simulator.StatWindow.getInstance().simulateStats();
          }, this);
          this.disableAllUnitsBtn.addListener("execute", function() {
            var b = this.disableAllUnitsBtn;
            this.ainfBtn.getValue() !== b.getValue() && this.ainfBtn.setValue(b.getValue());
            this.avehBtn.getValue() !== b.getValue() && this.avehBtn.setValue(b.getValue());
            this.aairBtn.getValue() !== b.getValue() && this.aairBtn.setValue(b.getValue());
            Simulator.StatWindow.getInstance().simulateStats();
          }, this);
          this.playArea.add(this.disableAllUnitsBtn, {left:null, right:33, bottom:364});
          this.disableAllUnitsBtn.hide();
          this.ainfBtn = new qx.ui.form.ToggleButton("", "https://image.ibb.co/kUFECv/icon_inf.png");
          this.ainfBtn.set({width:25, height:25, appearance:"button-text-small", show:"icon", toolTipText:"TURNS OFF YOUR G*D@MN FOOTSOLDIERS!"});
          this.ainfBtn.getChildControl("icon").set({width:15, height:15, scale:!0});
          this.ainfBtn.addListener("changeValue", function() {
            Simulator.StatWindow.getInstance().simulateStats();
            var b = this.ainfBtn;
            b.getValue() === this.avehBtn.getValue() && b.getValue() === this.aairBtn.getValue() && this.disableAllUnitsBtn.setValue(b.getValue());
            this.activateUnits("inf", !b.getValue());
            b.getValue() ? (b.setOpacity(0.75), b.setToolTipText("TURNS ON YOUR G*D@MN FOOTSOLDIERS!")) : (b.setOpacity(1), b.setToolTipText("TURNS OFF YOUR G*D@MN FOOTSOLDIERS!"));
          }, this);
          this.playArea.add(this.ainfBtn, {left:null, right:3, bottom:364});
          this.ainfBtn.hide();
          this.avehBtn = new qx.ui.form.ToggleButton("", "https://image.ibb.co/d0FQKa/icon_tnk.png");
          this.avehBtn.set({width:25, height:25, appearance:"button-text-small", show:"icon", toolTipText:"TURNS OFF YOUR G*D@MN VEHICULAR OBJECTS!"});
          this.avehBtn.getChildControl("icon").set({width:15, height:15, scale:!0});
          this.avehBtn.addListener("changeValue", function() {
            Simulator.StatWindow.getInstance().simulateStats();
            var b = this.avehBtn;
            b.getValue() === this.ainfBtn.getValue() && b.getValue() === this.aairBtn.getValue() && this.disableAllUnitsBtn.setValue(b.getValue());
            this.activateUnits("veh", !b.getValue());
            b.getValue() ? (b.setOpacity(0.75), b.setToolTipText("TURNS ON YOUR G*D@MN VEHICULAR OBJECTS!")) : (b.setOpacity(1), b.setToolTipText("TURNS OFF YOUR G*D@MN VEHICULAR OBJECTS!"));
          }, this);
          this.playArea.add(this.avehBtn, {left:null, right:33, bottom:339.5});
          this.avehBtn.hide();
          this.aairBtn = new qx.ui.form.ToggleButton("", "https://image.ibb.co/eYYeea/icon_air.png");
          this.aairBtn.set({width:25, height:25, appearance:"button-text-small", show:"icon", toolTipText:"TURNS OFF YOUR G*D@MN AIRCRAFT THANGS!"});
          this.aairBtn.getChildControl("icon").set({width:15, height:15, scale:!0});
          this.aairBtn.addListener("changeValue", function() {
            Simulator.StatWindow.getInstance().simulateStats();
            var b = this.aairBtn;
            b.getValue() === this.ainfBtn.getValue() && b.getValue() === this.avehBtn.getValue() && this.disableAllUnitsBtn.setValue(b.getValue());
            this.activateUnits("air", !b.getValue());
            b.getValue() ? (b.setOpacity(0.75), b.setToolTipText("TURNS ON YOUR G*D@MN AIRCRAFT THANGS!")) : (b.setOpacity(1), b.setToolTipText("TURNS OFF YOUR G*D@MN AIRCRAFT THANGS!"));
          }, this);
          this.playArea.add(this.aairBtn, {left:null, right:3, bottom:339.5});
          this.aairBtn.hide();
          this.armyUndoBtn = (new qx.ui.form.Button("", "https://image.ibb.co/bVu7Xv/icon_refresh.png")).set({toolTipText:"Undo's formation to previous saved formation.<br>Save formations by hitting<br>the Update or Simulate button.", show:"icon", width:25, height:25, center:!0, alignY:"middle", appearance:"button-text-small"});
          this.armyUndoBtn.getChildControl("icon").set({width:15, height:15, scale:!0});
          this.armyUndoBtn.addListener("click", function() {
            this.undoCurrentFormation();
            Simulator.StatWindow.getInstance().simulateStats();
          }, this);
          this.armyUndoBtn.setEnabled(!1);
          this.armyUndoBtn.hide();
          this.playArea.add(this.armyUndoBtn, {left:null, right:33, bottom:314.5});
          this.quickSaveBtn = (new qx.ui.form.Button("", "https://image.ibb.co/ksNGQF/map.gif")).set({toolTipText:"Saves the current layout<br>without having to open<br>the Formation Saver window.<br>Does not make persistent.", width:15, height:25, show:"icon", alignY:"middle", appearance:"button-text-small"});
          this.quickSaveBtn.getChildControl("icon").set({width:15, height:15, scale:!0});
          this.quickSaveBtn.addListener("click", function() {
            Simulator.LayoutWindow.getInstance().saveNewLayout(!0);
          }, this);
          this.quickSaveBtn.hide();
          this.playArea.add(this.quickSaveBtn, {left:null, right:3, bottom:314.5});
          this.backBtn = (new qx.ui.form.Button("Back")).set({toolTipText:"RETURN TO F*CK 'em UP SETUP", width:50, height:24, appearance:"button-text-small"});
          this.backBtn.addListener("click", function() {
            this.backToCombatSetup();
          }, this);
          this.replayBar.add(this.backBtn, {top:37, left:200});
          this.replayStatBtn = (new qx.ui.form.Button("Stats")).set({toolTipText:"OPENS OR CLOSES THE STAT MENU OF GLORY!", width:50, height:24, appearance:"button-text-small"});
          this.replayStatBtn.addListener("click", function() {
            this.__openStatWindow();
            Simulator.StatWindow.getInstance().simulateStats();
          }, this);
          this.replayBar.add(this.replayStatBtn, {top:7, left:200});
        } catch (f) {
          console.log("Error setting up Simulator Constructor: "), console.log(f.toString());
        }
      }, destruct:function() {
      }, members:{armyBar:null, playArea:null, replayBar:null, isSimButtonDisabled:null, armyTempFormations:null, armyTempIdx:null, isSimulation:null, simBtn:null, optionBtn:null, statBtn:null, layoutBtn:null, unlockCmtBtn:null, unlockRTBtn:null, shiftUpBtn:null, shiftDownBtn:null, shiftLeftBtn:null, shiftRightBtn:null, disableAllUnitsBtn:null, aairBtn:null, avehBtn:null, ainfBtn:null, mirrorBtnH:null, mirrorBtnV:null, mirrorBtnC:null, mirrorBtnK:null, mirrorBtnU:null, armyUndoBtn:null, quickSaveBtn:null, 
      backBtn:null, replayStatBtn:null, __openSimulatorWindow:function() {
        var d = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
        if (null != d) {
          var b = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
          this.isSimulation = !0;
          this.saveTempFormation();
          localStorage.ta_sim_last_city = d.get_Id();
          b.get_CityArmyFormationsManager().set_CurrentTargetBaseId(d.get_Id());
          ClientLib.API.Battleground.GetInstance().SimulateBattle();
          qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, d.get_Id(), 0, 0);
          d = localStorage.autoSimulate;
          if (void 0 !== d && "yes" == d) {
            var e = localStorage.simulateSpeed;
            setTimeout(function() {
              var b = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
              b.RestartReplay();
              b.set_ReplaySpeed(parseInt(e, 10));
            }, 1E3);
          }
          !1 == this.isSimButtonDisabled && (this.disableSimulateButtonTimer(1E3), "function" === typeof Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer && Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(1E4));
          setTimeout(function() {
            var b = ClientLib.Vis.VisMain.GetInstance().get_Battleground().get_BattleDuration(), b = phe.cnc.Util.getTimespanString(b);
            Simulator.StatWindow.getInstance().sim[Simulator.StatWindow.getInstance().simSelected].Label.Battle.Duration.setValue(b);
          }, 10);
          !1 == Simulator.StatWindow.getInstance().simReplayBtn.getEnabled() && Simulator.StatWindow.getInstance().simReplayBtn.setEnabled(!0);
        }
      }, __openOptionWindow:function() {
        try {
          Simulator.OptionWindow.getInstance().isVisible() ? (console.log("Closing Option Window"), Simulator.OptionWindow.getInstance().close()) : (console.log("Opening Option Window"), Simulator.OptionWindow.getInstance().open());
        } catch (d) {
          console.log("Error Opening or Closing Option Window"), console.log(d.toString());
        }
      }, __openStatWindow:function() {
        try {
          Simulator.StatWindow.getInstance().isVisible() ? (console.log("Closing Stat Window"), Simulator.StatWindow.getInstance().close()) : (console.log("Opening Stat Window"), Simulator.StatWindow.getInstance().open(), Simulator.StatWindow.getInstance().calcResources());
          Simulator.StatWindow.getInstance().simulateStats();
        } catch (d) {
          console.log("Error Opening or Closing Stat Window"), console.log(d.toString());
        }
      }, __openLayoutWindow:function() {
        try {
          Simulator.LayoutWindow.getInstance().isVisible() ? (console.log("Closing Layout Window"), Simulator.LayoutWindow.getInstance().close()) : (console.log("Opening LayoutWindow"), Simulator.LayoutWindow.getInstance().updateLayoutList(), Simulator.LayoutWindow.getInstance().layoutTextBox.setValue(""), Simulator.LayoutWindow.getInstance().persistentCheck.setValue(!1), Simulator.LayoutWindow.getInstance().open());
        } catch (d) {
          console.log("Error Opening or Closing Layout Window"), console.log(d.toString());
        }
      }, saveTempFormation:function() {
        try {
          var d = this.getCityPreArmyUnits().get_ArmyUnits().l;
          if (0 != this.armyTempFormations.length) {
            for (var b = 0; b < d.length; b++) {
              var e = this.armyTempFormations[this.armyTempIdx][b];
              if (d[b].get_CoordX() != e.x || d[b].get_CoordY() != e.y) {
                break;
              } else {
                if (b + 1 == d.length) {
                  return;
                }
              }
            }
          }
          e = [];
          for (b = 0; b < d.length; b++) {
            var g = d[b], f = {};
            f.x = g.get_CoordX();
            f.y = g.get_CoordY();
            f.id = g.get_Id();
            f.enabled = g.get_Enabled();
            e.push(f);
          }
          this.armyTempFormations.push(e);
          this.armyTempIdx = this.armyTempFormations.length - 1;
          1 < this.armyTempFormations.length && this.armyUndoBtn.setEnabled(!0);
        } catch (h) {
          console.log("Error Saving Temp Formation"), console.log(h.toString());
        }
      }, undoCurrentFormation:function() {
        try {
          this.restoreFormation(this.armyTempFormations[this.armyTempIdx - 1]), this.armyTempFormations.splice(this.armyTempIdx, 1), this.armyTempIdx--, 1 == this.armyTempFormations.length && this.armyUndoBtn.setEnabled(!1);
        } catch (d) {
          console.log("Error undoing formation"), console.log(d.toString());
        }
      }, mirrorFormation:function(d) {
        try {
          console.log("Shifting Unit Formation");
          for (var b = this.getCityPreArmyUnits().get_ArmyUnits().l, e = [], g = 0; g < b.length; g++) {
            var f = b[g], h = {}, l = f.get_CoordX(), k = f.get_CoordY();
            "h" == d && (l = Math.abs(l - 8));
            "v" == d && (k = Math.abs(k - 3));
            "c" == d && (k = Math.abs(k - 5));
            h.x = l;
            h.y = k;
            h.id = f.get_Id();
            h.enabled = f.get_Enabled();
            e.push(h);
          }
          this.restoreFormation(e);
        } catch (m) {
          console.log("Error Mirroring Formation"), console.log(m.toString());
        }
      }, swapFormation:function(d, b) {
        try {
          console.log("Swaping Unit Formation: direction:" + d + ", sel:" + b);
          var e = 0, g = 0;
          "z" == d && (e = 2);
          "k" == d && (e = 1);
          "l" == d && (g = -1);
          "r" == d && (g = 1);
          if (0 != e || 0 != g || "n" == d) {
            for (var f = this.getCityPreArmyUnits().get_ArmyUnits().l, h = [], l = 0; l < f.length; l++) {
              var k = f[l], m = {}, q = k.get_CoordX() + g;
              switch(q) {
                case 9:
                  q = 0;
                  break;
                case -1:
                  q = 8;
              }
              var n = k.get_CoordY() + e;
              switch(n) {
                case 2:
                  n = 0;
                  break;
                case 3:
                  n = 2;
                  break;
                case -1:
                  n = 3;
              }
              0 == b || k.get_CoordX() == b - 1 || "u" != d && "d" != d ? m.y = n : m.y = k.get_CoordY();
              0 == b || k.get_CoordY() == b - 1 || "l" != d && "r" != d ? m.x = q : m.x = k.get_CoordX();
              m.id = k.get_Id();
              "n" == d && (m.enabled = void 0 !== localStorage.allUnitsDisabled ? "yes" == localStorage.allUnitsDisabled ? k.set_Enabled(!0) : k.set_Enabled(!1) : k.set_Enabled(!1));
              m.enabled = k.get_Enabled();
              h.push(m);
            }
            "n" == d && (localStorage.allUnitsDisabled = "yes" == localStorage.allUnitsDisabled ? "no" : "yes");
            this.restoreFormation(h);
          }
        } catch (p) {
          console.log("Error Swapping Units"), console.log(p.toString());
        }
      }, swapFormationz:function(d, b) {
        try {
          console.log("Swaping Unit Formation: direction:" + d + ", sel:" + b);
          var e = 0, g = 0;
          "z" == d && (e = 2);
          "k" == d && (e = 1);
          "l" == d && (g = -1);
          "r" == d && (g = 1);
          if (0 != e || 0 != g || "n" == d) {
            for (var f = this.getCityPreArmyUnits().get_ArmyUnits().l, h = [], l = 0; l < f.length; l++) {
              var k = f[l], m = {}, q = k.get_CoordX() + g;
              switch(q) {
                case 9:
                  q = 0;
                  break;
                case -1:
                  q = 8;
              }
              var n = k.get_CoordY() + e;
              switch(n) {
                case 2:
                  n = 0;
                  break;
                case 3:
                  n = 2;
                  break;
                case 4:
                  n = 1;
                  break;
                case -1:
                  n = 3;
              }
              0 == b || k.get_CoordX() == b - 1 || "u" != d && "d" != d ? m.y = n : m.y = k.get_CoordY();
              0 == b || k.get_CoordY() == b - 1 || "l" != d && "r" != d ? m.x = q : m.x = k.get_CoordX();
              m.id = k.get_Id();
              "n" == d && (m.enabled = void 0 !== localStorage.allUnitsDisabled ? "yes" == localStorage.allUnitsDisabled ? k.set_Enabled(!0) : k.set_Enabled(!1) : k.set_Enabled(!1));
              m.enabled = k.get_Enabled();
              h.push(m);
            }
            "n" == d && (localStorage.allUnitsDisabled = "yes" == localStorage.allUnitsDisabled ? "no" : "yes");
            this.restoreFormation(h);
          }
        } catch (p) {
          console.log("Error Swapping Units"), console.log(p.toString());
        }
      }, shiftFormation:function(d, b) {
        try {
          console.log("Shifting Unit Formation: direction:" + d + ", sel:" + b);
          var e = 0, g = 0;
          "u" == d && (e = -1);
          "d" == d && (e = 1);
          "l" == d && (g = -1);
          "r" == d && (g = 1);
          if (0 != e || 0 != g || "n" == d) {
            for (var f = this.getCityPreArmyUnits().get_ArmyUnits().l, h = [], l = 0; l < f.length; l++) {
              var k = f[l], m = {}, q = k.get_CoordX() + g;
              switch(q) {
                case 9:
                  q = 0;
                  break;
                case -1:
                  q = 8;
              }
              var n = k.get_CoordY() + e;
              switch(n) {
                case 4:
                  n = 0;
                  break;
                case -1:
                  n = 3;
              }
              0 == b || k.get_CoordX() == b - 1 || "u" != d && "d" != d ? m.y = n : m.y = k.get_CoordY();
              0 == b || k.get_CoordY() == b - 1 || "l" != d && "r" != d ? m.x = q : m.x = k.get_CoordX();
              m.id = k.get_Id();
              "n" == d && (m.enabled = void 0 !== localStorage.allUnitsDisabled ? "yes" == localStorage.allUnitsDisabled ? k.set_Enabled(!0) : k.set_Enabled(!1) : k.set_Enabled(!1));
              m.enabled = k.get_Enabled();
              h.push(m);
            }
            "n" == d && (localStorage.allUnitsDisabled = "yes" == localStorage.allUnitsDisabled ? "no" : "yes");
            this.restoreFormation(h);
          }
        } catch (p) {
          console.log("Error Shifting Units"), console.log(p.toString());
        }
      }, restoreFormation:function(d) {
        try {
          for (var b = this.getCityPreArmyUnits(), e = b.get_ArmyUnits().l, g = 0; g < d.length; g++) {
            for (var f = d[g], h = f.id, l = 0; l < e.length; l++) {
              e[l].get_Id() === h && (e[l].MoveBattleUnit(f.x, f.y), void 0 === f.enabled ? e[l].get_Enabled(!0) : e[l].get_Enabled(f.enabled));
            }
          }
          b.UpdateFormation(!0);
        } catch (k) {
          console.log("Error Restoring Formation"), console.log(k.toString());
        }
      }, getCityPreArmyUnits:function() {
        var d = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), b = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(), e = b.get_CityArmyFormationsManager();
        b.get_CityArmyFormationsManager().set_CurrentTargetBaseId(d.get_Id());
        return e.GetFormationByTargetBaseId(e.get_CurrentTargetBaseId());
      }, activateUnits:function(d, b) {
        try {
          for (var e = this.getCityPreArmyUnits().get_ArmyUnits().l, g = [], f = 0; f < e.length; f++) {
            var h = e[f], l = {};
            switch(d) {
              case "air":
                h.get_UnitGameData_Obj().mt !== ClientLib.Base.EUnitMovementType.Air && h.get_UnitGameData_Obj().mt !== ClientLib.Base.EUnitMovementType.Air2 || h.set_Enabled(b);
                break;
              case "inf":
                h.get_UnitGameData_Obj().mt === ClientLib.Base.EUnitMovementType.Feet && h.set_Enabled(b);
                break;
              case "veh":
                h.get_UnitGameData_Obj().mt !== ClientLib.Base.EUnitMovementType.Wheel && h.get_UnitGameData_Obj().mt !== ClientLib.Base.EUnitMovementType.Track || h.set_Enabled(b);
            }
            l.x = h.get_CoordX();
            l.y = h.get_CoordY();
            l.e = h.get_Enabled();
            l.id = h.get_Id();
            g.push(l);
          }
          this.restoreFormation(g);
        } catch (k) {
          console.log(k);
        }
      }, timeoutCmtBtn:function() {
       /*
        this.armyBar.remove(this.unlockCmtBtn);
        setTimeout(function() {
          Simulator.getInstance().armyBar.add(Simulator.getInstance().unlockCmtBtn, {left:null, right:7, bottom:5});
        }, 2E3);
      }, timeoutRTBtn:function() {
        this.armyBar.remove(this.unlockRTBtn);
        setTimeout(function() {
          Simulator.getInstance().armyBar.add(Simulator.getInstance().unlockRTBtn, {left:null, right:7, bottom:97});
        }, 2E3);
        */
      }, backToCombatSetup:function() {
        try {
          var d = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
          null != d && qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, d.get_Id(), 0, 0);
        } catch (b) {
          console.log("Error closing Simulation Window"), console.log(b.toString());
        }
      }, disableSimulateButtonTimer:function(d) {
        try {
          1E3 <= d ? (this.isSimButtonDisabled = !0, this.simBtn.setEnabled(!1), d -= 1E3, setTimeout(function() {
            Simulator.getInstance().disableSimulateButtonTimer(d);
          }, 1E3)) : (setTimeout(function() {
            Simulator.getInstance().simBtn.setEnabled(!0);
            //Simulator.OptionWindow.getInstance()._buttonSizeCB.getValue() ? Simulator.getInstance().simBtn.setLabel("Simulate") : Simulator.getInstance().simBtn.setLabel("S");
          }, d), this.isSimButtonDisabled = !1);
        } catch (b) {
          console.log("Error disabling simulator button"), console.log(b.toString());
        }
      }, hideArmyTooltips:function() {
        try {
          void 0 === localStorage.ArmyUnitTooltipDisabled && (localStorage.ArmyUnitTooltipDisabled = "yes");
          for (var d in ClientLib.Vis.BaseView.BaseView.prototype) {
            if ("function" === typeof ClientLib.Vis.BaseView.BaseView.prototype[d] && -1 < ClientLib.Vis.BaseView.BaseView.prototype[d].toString().indexOf(ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip.toString())) {
              Function("", "ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip_Original = ClientLib.Vis.BaseView.BaseView.prototype." + d)();
              Function("", "ClientLib.Vis.BaseView.BaseView.prototype." + d + " = function (a) { if(ClientLib.Vis.VisMain.GetInstance().get_Mode()==7 && localStorage['ArmyUnitTooltipDisabled']=='yes') { return; } else { this.ShowToolTip_Original(a); } };")();
              break;
            }
          }
          qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original = qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility;
          qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility = function(b) {
            "yes" == localStorage.ArmyUnitTooltipDisabled ? qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original(!1) : qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original(b);
          };
        } catch (b) {
          console.log("Error hideArmyUnitTooltips()"), console.log(b.toString());
        }
      }}});
      
      qx.Class.define("Simulator.StatWindow", {type:"singleton", extend:qx.ui.window.Window, construct:function() {
        try {
          this.base(arguments);
          this.set({layout:(new qx.ui.layout.VBox).set({spacing:0}), caption:"STATS OF GLORY", icon:"FactionUI/icons/icon_res_plinfo_command_points.png", contentPadding:5, contentPaddingTop:0, allowMaximize:!1, showMaximize:!1, allowMinimize:!1, showMinimize:!1, resizable:!0, resizableTop:!1, resizableBottom:!1});
          this.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          if (void 0 !== localStorage.statWindowPosLeft) {
            var d = parseInt(localStorage.statWindowPosLeft, 10), b = parseInt(localStorage.statWindowPosTop, 10);
            this.moveTo(d, b);
          } else {
            this.moveTo(124, 31);
          }
          this.simViews = void 0 !== localStorage.simViews ? parseInt(localStorage.simViews, 10) : 2;
          var e = qx.core.Init.getApplication();
          this.isSimStatButtonDisabled = !1;
          this.Battle = (new qx.ui.container.Composite(new qx.ui.layout.HBox(-3))).set({decorator:"pane-light-plain", allowGrowX:!0, marginLeft:0, marginRight:0});
          var g = (new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:29, padding:5, allowGrowX:!0, marginLeft:0, marginRight:0}), f = (new qx.ui.basic.Label("O")).set({toolTipText:e.tr("tnf:combat report"), alignX:"center", alignY:"middle"}), h = (new qx.ui.basic.Label("D")).set({toolTipText:e.tr("tnf:combat timer npc: %1", ""), alignX:"center", alignY:"middle"}), l = (new qx.ui.basic.Label("B")).set({toolTipText:e.tr("tnf:base"), alignX:"center", alignY:"middle"});
          g.add(f);
          g.add(h);
          g.add(l);
          this.Battle.add(g);
          this.add(this.Battle);
          var k = (new qx.ui.container.Composite(new qx.ui.layout.VBox(5))).set({decorator:"pane-light-opaque"});
          k.add((new qx.ui.basic.Label(e.tr("tnf:combat target"))).set({alignX:"center", alignY:"middle", paddingBottom:5, font:"font_size_13_bold"}));
          this.add(k);
          this.EnemyHealth = (new qx.ui.container.Composite(new qx.ui.layout.HBox(-3))).set({decorator:"pane-light-plain", allowGrowX:!0, marginLeft:0, marginRight:0});
          var m = (new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:29, padding:5, allowGrowX:!0, marginLeft:0, marginRight:0}), q = (new qx.ui.basic.Atom(" ", "FactionUI/icons/icon_arsnl_show_all.png")).set({toolTipText:e.tr("tnf:total"), toolTipIcon:"FactionUI/icons/icon_arsnl_show_all.png", alignX:"center", alignY:"middle", gap:0, iconPosition:"top"}), n = (new qx.ui.basic.Atom(" ", "FactionUI/icons/icon_arsnl_base_buildings.png")).set({toolTipText:e.tr("tnf:base"), toolTipIcon:"FactionUI/icons/icon_arsnl_base_buildings.png", 
          alignX:"center", alignY:"middle", gap:0, iconPosition:"top"}), p = (new qx.ui.basic.Atom(" ", "FactionUI/icons/icon_def_army_points.png")).set({toolTipText:e.tr("tnf:defense"), toolTipIcon:"FactionUI/icons/icon_def_army_points.png", alignX:"center", alignY:"middle", gap:0, iconPosition:"top"}), r = (new qx.ui.basic.Label("CY")).set({toolTipText:GAMEDATA.Tech[1].dn, alignX:"center", alignY:"middle"}), s = (new qx.ui.basic.Label("DF")).set({toolTipText:GAMEDATA.Tech[42].dn, alignX:"center", 
          alignY:"middle"}), v = (new qx.ui.basic.Label("CC")).set({toolTipText:GAMEDATA.Tech[24].dn, alignX:"center", alignY:"middle"});
          q.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          n.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          p.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          m.add(q);
          m.add(n);
          m.add(p);
          m.add(r);
          m.add(s);
          m.add(v);
          this.EnemyHealth.add(m);
          this.add(this.EnemyHealth);
          var z = (new qx.ui.container.Composite(new qx.ui.layout.VBox(5))).set({decorator:"pane-light-opaque"});
          z.add((new qx.ui.basic.Label(e.tr("tnf:own repair cost"))).set({alignX:"center", alignY:"middle", paddingBottom:5, font:"font_size_13_bold"}));
          this.add(z);
          this.Repair = (new qx.ui.container.Composite(new qx.ui.layout.HBox(-3))).set({decorator:"pane-light-plain", allowGrowX:!0, marginLeft:0, marginRight:0});
          var u = (new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:29, padding:5, allowGrowX:!0, marginLeft:0, marginRight:0}), G = (new qx.ui.basic.Atom(" ", "webfrontend/ui/icons/icn_repair_points.png")).set({toolTipText:e.tr("tnf:offense repair time"), toolTipIcon:"webfrontend/ui/icons/icn_repair_points.png", alignX:"center", alignY:"middle", gap:0, iconPosition:"top"}), w = (new qx.ui.basic.Atom(" ", "webfrontend/ui/icons/icn_repair_off_points.png")).set({toolTipText:e.tr("tnf:repair points"), 
          toolTipIcon:"webfrontend/ui/icons/icn_repair_off_points.png", alignX:"center", alignY:"middle", gap:0, iconPosition:"top"}), A = (new qx.ui.basic.Atom(" ", "webfrontend/ui/icons/icon_res_repair_inf.png")).set({toolTipText:e.tr("tnf:infantry repair title"), toolTipIcon:"webfrontend/ui/icons/icon_res_repair_inf.png", alignX:"center", alignY:"middle", gap:0, iconPosition:"top"}), H = (new qx.ui.basic.Atom(" ", "webfrontend/ui/icons/icon_res_repair_tnk.png")).set({toolTipText:e.tr("tnf:vehicle repair title"), 
          toolTipIcon:"webfrontend/ui/icons/icon_res_repair_tnk.png", alignX:"center", alignY:"middle", gap:0, iconPosition:"top"}), B = (new qx.ui.basic.Atom(" ", "webfrontend/ui/icons/icon_res_repair_air.png")).set({toolTipText:e.tr("tnf:aircraft repair title"), toolTipIcon:"webfrontend/ui/icons/icon_res_repair_air.png", alignX:"center", alignY:"middle", gap:0, iconPosition:"top"});
          G.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          w.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          A.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          H.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          B.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          u.add(G);
          u.add(w);
          u.add(A);
          u.add(H);
          u.add(B);
          this.Repair.add(u);
          this.add(this.Repair);
          var C = (new qx.ui.container.Composite(new qx.ui.layout.VBox(5))).set({decorator:"pane-light-opaque"});
          C.add((new qx.ui.basic.Label(e.tr("tnf:lootable resources:"))).set({alignX:"center", alignY:"middle", paddingBottom:5, font:"font_size_13_bold"}));
          this.add(C);
          this.Loot = (new qx.ui.container.Composite(new qx.ui.layout.HBox(-3))).set({decorator:"pane-light-plain", allowGrowX:!0, marginLeft:0, marginRight:0});
          var x = (new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:29, padding:5, allowGrowX:!0, marginLeft:0, marginRight:0}), t = (new qx.ui.basic.Atom(" ", "webfrontend/ui/common/icn_res_tiberium.png")).set({toolTipText:e.tr("tnf:tiberium"), toolTipIcon:"webfrontend/ui/common/icn_res_tiberium.png", alignX:"center", alignY:"middle", gap:0, iconPosition:"top"}), D = (new qx.ui.basic.Atom(" ", "webfrontend/ui/common/icn_res_chrystal.png")).set({toolTipText:e.tr("tnf:crystals"), toolTipIcon:"webfrontend/ui/common/icn_res_chrystal.png", 
          alignX:"center", alignY:"middle", gap:0, iconPosition:"top"}), y = (new qx.ui.basic.Atom(" ", "webfrontend/ui/common/icn_res_dollar.png")).set({toolTipText:e.tr("tnf:credits"), toolTipIcon:"webfrontend/ui/common/icn_res_dollar.png", alignX:"center", alignY:"middle", gap:0, iconPosition:"top"}), I = (new qx.ui.basic.Atom(" ", "webfrontend/ui/common/icn_res_research_mission.png")).set({toolTipText:e.tr("tnf:research points"), toolTipIcon:"webfrontend/ui/common/icn_res_research_mission.png", 
          alignX:"center", alignY:"middle", gap:0, iconPosition:"top"}), J = (new qx.ui.basic.Atom(" ", "FactionUI/icons/icon_transfer_resource.png")).set({toolTipText:e.tr("tnf:total") + " " + e.tr("tnf:loot"), toolTipIcon:"FactionUI/icons/icon_transfer_resource.png", alignX:"center", alignY:"middle", gap:0, iconPosition:"top"});
          t.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          D.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          y.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          I.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          J.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          x.add(t);
          x.add(D);
          x.add(y);
          x.add(I);
          x.add(J);
          this.Loot.add(x);
          this.add(this.Loot);
          var F = (new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({decorator:"pane-light-opaque", allowGrowX:!0, marginLeft:0, marginRight:0, padding:5});
          this.add(F);
          this.simStatBtn = (new qx.ui.form.Button(e.tr("tnf:update"))).set({allowGrowX:!1});
          this.simStatBtn.setToolTipText("Updates Simulation Stats & LOOT");
          this.simStatBtn.addListener("click", this.simulateStats, this);
          this.simReplayBtn = (new qx.ui.form.Button(e.tr("tnf:show combat"))).set({allowGrowX:!1});
          this.simReplayBtn.setToolTipText(e.tr("tnf:show battle replay"));
          this.simReplayBtn.addListener("click", this.doSimReplay, this);
          this.simReplayBtn.setEnabled(!1);
          F.add(this.simStatBtn, {width:"50%"});
          F.add(this.simReplayBtn, {width:"50%"});
          k.addListener("click", function() {
            this.EnemyHealth.isVisible() ? this.EnemyHealth.exclude() : this.EnemyHealth.show();
          }, this);
          z.addListener("click", function() {
            this.Repair.isVisible() ? this.Repair.exclude() : this.Repair.show();
          }, this);
          C.addListener("click", function() {
            this.Loot.isVisible() ? this.Loot.exclude() : this.Loot.show();
          }, this);
          void 0 !== localStorage.hideHealth && "yes" == localStorage.hideHealth && this.EnemyHealth.exclude();
          void 0 !== localStorage.hideRepair && "yes" == localStorage.hideRepair && this.Repair.exclude();
          void 0 !== localStorage.hideLoot && "yes" == localStorage.hideLoot && this.Loot.exclude();
          for (d = 0; d < this.simViews; d++) {
            this.sim[d] = new this.Simulation(d), this.sim[d].Select(this.simSelected), this.Battle.add(this.sim[d].Label.Battle.container, {flex:1}), this.EnemyHealth.add(this.sim[d].Label.EnemyHealth.container, {flex:1}), this.Repair.add(this.sim[d].Label.Repair.container, {flex:1}), this.Loot.add(this.sim[d].Label.Loot.container, {flex:1});
          }
          phe.cnc.Util.attachNetEvent(ClientLib.API.Battleground.GetInstance(), "OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished, this, this.__OnSimulateBattleFinished);
          phe.cnc.base.Timer.getInstance().addListener("uiTick", this._onTick, this);
        } catch (E$0) {
          console.log("Error setting up Simulator.StatWindow Constructor: "), console.log(E$0.toString());
        }
      }, destruct:function() {
      }, members:{Battle:null, EnemyHealth:null, Repair:null, Loot:null, simStatBtn:null, simReplayBtn:null, isSimStatButtonDisabled:null, simSelected:0, simViews:3, sim:[], Simulation:function(d) {
        try {
          var b = !1, e = this.OwnCity = this.TargetCity = null, g = null;
          this.Label = {Battle:{container:(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:65, padding:5, allowGrowX:!0, marginLeft:0, marginRight:0, decorator:"pane-light-opaque"}), Outcome:(new qx.ui.basic.Atom("-", null)).set({alignX:"center", alignY:"middle", gap:0, iconPosition:"top", show:"label"}), Duration:(new qx.ui.basic.Label("-:--")).set({alignX:"center", alignY:"middle"}), OwnCity:(new qx.ui.basic.Label("-")).set({alignX:"center", alignY:"middle"})}, EnemyHealth:{container:(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:65, 
          padding:5, allowGrowX:!0, marginLeft:0, marginRight:0, decorator:"pane-light-opaque"}), Overall:(new qx.ui.basic.Label("-")).set({alignX:"right", alignY:"middle"}), Base:(new qx.ui.basic.Label("-")).set({alignX:"right", alignY:"middle"}), Defense:(new qx.ui.basic.Label("-")).set({alignX:"right", alignY:"middle"}), CY:(new qx.ui.basic.Label("-")).set({alignX:"right", alignY:"middle"}), DF:(new qx.ui.basic.Label("-")).set({alignX:"right", alignY:"middle"}), CC:(new qx.ui.basic.Label("-")).set({alignX:"right", 
          alignY:"middle"})}, Repair:{container:(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:65, padding:5, allowGrowX:!0, marginLeft:0, marginRight:0, decorator:"pane-light-opaque"}), Storage:(new qx.ui.basic.Label("-")).set({alignX:"right", alignY:"middle"}), Overall:(new qx.ui.basic.Label("-")).set({alignX:"right", alignY:"middle"}), Inf:(new qx.ui.basic.Label("-")).set({alignX:"right", alignY:"middle"}), Vehi:(new qx.ui.basic.Label("-")).set({alignX:"right", alignY:"middle"}), 
          Air:(new qx.ui.basic.Label("-")).set({alignX:"right", alignY:"middle"})}, Loot:{container:(new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({width:65, padding:5, allowGrowX:!0, marginLeft:0, marginRight:0, decorator:"pane-light-opaque"}), Tib:(new qx.ui.basic.Label("-")).set({alignX:"right", alignY:"middle"}), Cry:(new qx.ui.basic.Label("-")).set({alignX:"right", alignY:"middle"}), Cred:(new qx.ui.basic.Label("-")).set({alignX:"right", alignY:"middle"}), RP:(new qx.ui.basic.Label("-")).set({alignX:"right", 
          alignY:"middle"}), Overall:(new qx.ui.basic.Label("-")).set({alignX:"right", alignY:"middle"})}};
          var f = function() {
            this.RT = this.Cry = this.Tib = this.MaxHealth = this.EndHealth = this.StartHealth = 0;
            this.getHP = function() {
              return 0 == this.EndHealth && 0 == this.StartHealth ? 0 : 0 == this.MaxHealth ? 100 : this.EndHealth / this.MaxHealth * 100;
            };
            this.getHPrel = function() {
              return 0 == this.StartHealth ? 0 : 0 == this.MaxHealth ? -100 : (this.StartHealth - this.EndHealth) / this.MaxHealth * -100;
            };
          }, h = function() {
            this.Battle = this.Base = 0;
          };
          this.Stats = {Battle:{Outcome:0, Duration:0, OwnCity:""}, EnemyHealth:{Overall:new f, Base:new f, Defense:new f, CY:new f, DF:new f, CC:new f}, Repair:{Storage:0, Overall:new f, Inf:new f, Vehi:new f, Air:new f}, Loot:{Tib:new h, Cry:new h, Cred:new h, RP:new h, Overall:new h}};
          this.setSimulation = function(d) {
            b = !0;
            this.TargetCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
            this.OwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
            this.Stats.Battle.OwnCity = this.OwnCity.get_Name();
            this.saveFormation();
            g = [];
            for (var e = 0; e < d.length; e++) {
              g.push(d[e].Value);
            }
          };
          this.UpdateLabels = function() {
            var d = qx.core.Init.getApplication(), e = function(b) {
              return phe.cnc.Util.getTimespanString(b);
            }, f = function(b, d) {
              25 > d ? b.setTextColor("red") : 75 > d ? b.setTextColor("orangered") : b.setTextColor("darkgreen");
            }, g = function(b, d) {
              25 > d ? b.setTextColor("darkgreen") : 75 > d ? b.setTextColor("orangered") : b.setTextColor("red");
            };
            if (b) {
              switch(this.Stats.Battle.Outcome) {
                case 1:
                  this.Label.Battle.Outcome.resetLabel();
                  this.Label.Battle.Outcome.set({show:"icon"});
                  this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_total_defeat.png");
                  this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_total_defeat.png");
                  this.Label.Battle.Outcome.setToolTipText(d.tr("tnf:total defeat"));
                  break;
                case 2:
                  this.Label.Battle.Outcome.resetLabel();
                  this.Label.Battle.Outcome.set({show:"icon"});
                  this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_victory.png");
                  this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_victory.png");
                  this.Label.Battle.Outcome.setToolTipText(d.tr("tnf:victory"));
                  break;
                case 3:
                  this.Label.Battle.Outcome.resetLabel(), this.Label.Battle.Outcome.set({show:"icon"}), this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_total_victory.png"), this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_total_victory.png"), this.Label.Battle.Outcome.setToolTipText(d.tr("tnf:total victory"));
              }
              this.Label.Battle.Duration.setValue(e(this.Stats.Battle.Duration / 1E3));
              null != this.OwnCity && (this.Stats.Battle.OwnCity = this.OwnCity.get_Name());
              this.Label.Battle.OwnCity.setValue(this.Stats.Battle.OwnCity);
              switch(localStorage.getEHSelection) {
                case "hp rel":
                  this.Label.EnemyHealth.Overall.setValue(this.Stats.EnemyHealth.Overall.getHPrel().toFixed(2) + "%");
                  this.Label.EnemyHealth.Overall.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.EnemyHealth.Overall.RT) + "<br>" + d.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Tib) + "<br>" + d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Cry));
                  this.Label.EnemyHealth.Base.setValue(this.Stats.EnemyHealth.Base.getHPrel().toFixed(2) + "%");
                  this.Label.EnemyHealth.Base.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.EnemyHealth.Base.RT) + "<br>" + d.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Base.Tib));
                  this.Label.EnemyHealth.Defense.setValue(this.Stats.EnemyHealth.Defense.getHPrel().toFixed(2) + "%");
                  this.Label.EnemyHealth.Defense.setToolTipText(d.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Tib) + "<br>" + d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Cry));
                  this.Label.EnemyHealth.CY.setValue(this.Stats.EnemyHealth.CY.getHPrel().toFixed(2) + "%");
                  this.Label.EnemyHealth.CY.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.EnemyHealth.CY.RT) + "<br>" + d.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CY.Tib));
                  this.Label.EnemyHealth.DF.setValue(this.Stats.EnemyHealth.DF.getHPrel().toFixed(2) + "%");
                  this.Label.EnemyHealth.DF.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.EnemyHealth.DF.RT) + "<br>" + d.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.DF.Tib));
                  this.Label.EnemyHealth.CC.setValue(this.Stats.EnemyHealth.CC.getHPrel().toFixed(2) + "%");
                  this.Label.EnemyHealth.CC.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.EnemyHealth.CC.RT) + "<br>" + d.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CC.Tib));
                  break;
                default:
                  this.Label.EnemyHealth.Overall.setValue(this.Stats.EnemyHealth.Overall.getHP().toFixed(2) + "%"), this.Label.EnemyHealth.Overall.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.EnemyHealth.Overall.RT) + "<br>" + d.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Tib) + "<br>" + d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Cry)), this.Label.EnemyHealth.Base.setValue(this.Stats.EnemyHealth.Base.getHP().toFixed(2) + 
                  "%"), this.Label.EnemyHealth.Base.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.EnemyHealth.Base.RT) + "<br>" + d.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Base.Tib)), this.Label.EnemyHealth.Defense.setValue(this.Stats.EnemyHealth.Defense.getHP().toFixed(2) + "%"), this.Label.EnemyHealth.Defense.setToolTipText(d.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Tib) + 
                  "<br>" + d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Cry)), this.Label.EnemyHealth.CY.setValue(this.Stats.EnemyHealth.CY.getHP().toFixed(2) + "%"), this.Label.EnemyHealth.CY.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.EnemyHealth.CY.RT) + "<br>" + d.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CY.Tib)), this.Label.EnemyHealth.DF.setValue(this.Stats.EnemyHealth.DF.getHP().toFixed(2) + 
                  "%"), this.Label.EnemyHealth.DF.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.EnemyHealth.DF.RT) + "<br>" + d.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.DF.Tib)), this.Label.EnemyHealth.CC.setValue(this.Stats.EnemyHealth.CC.getHP().toFixed(2) + "%"), this.Label.EnemyHealth.CC.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.EnemyHealth.CC.RT) + "<br>" + d.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CC.Tib));
              }
              g(this.Label.EnemyHealth.Overall, this.Stats.EnemyHealth.Overall.getHP());
              g(this.Label.EnemyHealth.Base, this.Stats.EnemyHealth.Base.getHP());
              g(this.Label.EnemyHealth.Defense, this.Stats.EnemyHealth.Defense.getHP());
              g(this.Label.EnemyHealth.CY, this.Stats.EnemyHealth.CY.getHP());
              g(this.Label.EnemyHealth.DF, this.Stats.EnemyHealth.DF.getHP());
              g(this.Label.EnemyHealth.CC, this.Stats.EnemyHealth.CC.getHP());
              null != this.OwnCity && (this.Stats.Repair.Storage = Math.min(this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf), this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh), this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir)));
              this.Label.Repair.Storage.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(this.Stats.Repair.Storage)));
              this.Label.Repair.Storage.setTextColor(this.Stats.Repair.Storage > this.Stats.Repair.Overall.RT ? "darkgreen" : "red");
              switch(localStorage.getRTSelection) {
                case "cry":
                  this.Label.Repair.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry));
                  this.Label.Repair.Overall.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.Repair.Overall.RT) + "</br>" + d.tr("tnf:health") + ": " + this.Stats.Repair.Overall.getHP().toFixed(2) + "%");
                  this.Label.Repair.Inf.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));
                  this.Label.Repair.Inf.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.Repair.Inf.RT) + "</br>" + d.tr("tnf:health") + ": " + this.Stats.Repair.Inf.getHP().toFixed(2) + "%");
                  this.Label.Repair.Vehi.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));
                  this.Label.Repair.Vehi.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.Repair.Vehi.RT) + "</br>" + d.tr("tnf:health") + ": " + this.Stats.Repair.Vehi.getHP().toFixed(2) + "%");
                  this.Label.Repair.Air.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));
                  this.Label.Repair.Air.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.Repair.Air.RT) + "</br>" + d.tr("tnf:health") + ": " + this.Stats.Repair.Air.getHP().toFixed(2) + "%");
                  break;
                case "hp":
                  this.Label.Repair.Overall.setValue(this.Stats.Repair.Overall.getHP().toFixed(2) + "%");
                  this.Label.Repair.Overall.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.Repair.Overall.RT) + "</br>" + d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry));
                  this.Label.Repair.Inf.setValue(this.Stats.Repair.Inf.getHP().toFixed(2) + "%");
                  this.Label.Repair.Inf.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.Repair.Inf.RT) + "</br>" + d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));
                  this.Label.Repair.Vehi.setValue(this.Stats.Repair.Vehi.getHP().toFixed(2) + "%");
                  this.Label.Repair.Vehi.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.Repair.Vehi.RT) + "</br>" + d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));
                  this.Label.Repair.Air.setValue(this.Stats.Repair.Air.getHP().toFixed(2) + "%");
                  this.Label.Repair.Air.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.Repair.Air.RT) + "</br>" + d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));
                  break;
                case "hp rel":
                  this.Label.Repair.Overall.setValue(this.Stats.Repair.Overall.getHPrel().toFixed(2) + "%");
                  this.Label.Repair.Overall.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.Repair.Overall.RT) + "</br>" + d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry));
                  this.Label.Repair.Inf.setValue(this.Stats.Repair.Inf.getHPrel().toFixed(2) + "%");
                  this.Label.Repair.Inf.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.Repair.Inf.RT) + "</br>" + d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));
                  this.Label.Repair.Vehi.setValue(this.Stats.Repair.Vehi.getHPrel().toFixed(2) + "%");
                  this.Label.Repair.Vehi.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.Repair.Vehi.RT) + "</br>" + d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));
                  this.Label.Repair.Air.setValue(this.Stats.Repair.Air.getHPrel().toFixed(2) + "%");
                  this.Label.Repair.Air.setToolTipText(d.tr("tnf:repair points") + ": " + e(this.Stats.Repair.Air.RT) + "</br>" + d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));
                  break;
                default:
                  this.Label.Repair.Overall.setValue(e(this.Stats.Repair.Overall.RT)), this.Label.Repair.Overall.setToolTipText(d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry) + "</br>" + d.tr("tnf:health") + ": " + this.Stats.Repair.Overall.getHP().toFixed(2) + "%"), this.Label.Repair.Inf.setValue(e(this.Stats.Repair.Inf.RT)), this.Label.Repair.Inf.setToolTipText(d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry) + 
                  "</br>" + d.tr("tnf:health") + ": " + this.Stats.Repair.Inf.getHP().toFixed(2) + "%"), this.Label.Repair.Vehi.setValue(e(this.Stats.Repair.Vehi.RT)), this.Label.Repair.Vehi.setToolTipText(d.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry) + "</br>" + d.tr("tnf:health") + ": " + this.Stats.Repair.Vehi.getHP().toFixed(2) + "%"), this.Label.Repair.Air.setValue(e(this.Stats.Repair.Air.RT)), this.Label.Repair.Air.setToolTipText(d.tr("tnf:crystals") + 
                  ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry) + "</br>" + d.tr("tnf:health") + ": " + this.Stats.Repair.Air.getHP().toFixed(2) + "%");
              }
              f(this.Label.Repair.Overall, this.Stats.Repair.Overall.getHP());
              f(this.Label.Repair.Inf, this.Stats.Repair.Inf.getHP());
              this.Stats.Repair.Inf.RT === this.Stats.Repair.Overall.RT && 100 > this.Stats.Repair.Inf.getHP() && this.Label.Repair.Inf.setTextColor("black");
              f(this.Label.Repair.Vehi, this.Stats.Repair.Vehi.getHP());
              this.Stats.Repair.Vehi.RT === this.Stats.Repair.Overall.RT && 100 > this.Stats.Repair.Vehi.getHP() && this.Label.Repair.Vehi.setTextColor("black");
              f(this.Label.Repair.Air, this.Stats.Repair.Air.getHP());
              this.Stats.Repair.Air.RT === this.Stats.Repair.Overall.RT && 100 > this.Stats.Repair.Air.getHP() && this.Label.Repair.Air.setTextColor("black");
              this.Label.Loot.Tib.setToolTipText((this.Stats.Loot.Tib.Battle / this.Stats.Loot.Tib.Base * 100).toFixed(2) + "%<br>" + d.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Base));
              this.Label.Loot.Tib.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Battle));
              this.Label.Loot.Cry.setToolTipText((this.Stats.Loot.Cry.Battle / this.Stats.Loot.Cry.Base * 100).toFixed(2) + "%<br>" + d.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Base));
              this.Label.Loot.Cry.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Battle));
              this.Label.Loot.Cred.setToolTipText((this.Stats.Loot.Cred.Battle / this.Stats.Loot.Cred.Base * 100).toFixed(2) + "%<br>" + d.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Base));
              this.Label.Loot.Cred.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Battle));
              this.Label.Loot.RP.setToolTipText((this.Stats.Loot.RP.Battle / this.Stats.Loot.RP.Base * 100).toFixed(2) + "%<br>" + d.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Base));
              this.Label.Loot.RP.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Battle));
              this.Label.Loot.Overall.setToolTipText((this.Stats.Loot.Overall.Battle / this.Stats.Loot.Overall.Base * 100).toFixed(2) + "%<br>" + d.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Base));
              this.Label.Loot.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Battle));
            } else {
              if (0 < this.Stats.Loot.Tib.Base || 0 < this.Stats.Loot.Cry.Base || 0 < this.Stats.Loot.Cred.Base || 0 < this.Stats.Loot.RP.Base || 0 < this.Stats.Loot.Overall.Base) {
                this.Label.Loot.Tib.resetToolTipText(), this.Label.Loot.Tib.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Base)), this.Label.Loot.Cry.resetToolTipText(), this.Label.Loot.Cry.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Base)), this.Label.Loot.Cred.resetToolTipText(), this.Label.Loot.Cred.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Base)), this.Label.Loot.RP.resetToolTipText(), this.Label.Loot.RP.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Base)), 
                this.Label.Loot.Overall.resetToolTipText(), this.Label.Loot.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Base));
              }
            }
          };
          this.ResetStats = function() {
            this.Stats.Battle.Outcome = 0;
            this.Stats.Battle.Duration = 0;
            this.Stats.Battle.OwnCity = "";
            this.Stats.EnemyHealth.Overall = new f;
            this.Stats.EnemyHealth.Base = new f;
            this.Stats.EnemyHealth.Defense = new f;
            this.Stats.EnemyHealth.CY = new f;
            this.Stats.EnemyHealth.DF = new f;
            this.Stats.EnemyHealth.CC = new f;
            this.Stats.Repair.Storage = 0;
            this.Stats.Repair.Overall = new f;
            this.Stats.Repair.Inf = new f;
            this.Stats.Repair.Vehi = new f;
            this.Stats.Repair.Air = new f;
            this.Stats.Loot.Tib.Battle = 0;
            this.Stats.Loot.Cry.Battle = 0;
            this.Stats.Loot.Cred.Battle = 0;
            this.Stats.Loot.RP.Battle = 0;
            this.Stats.Loot.Overall.Battle = 0;
          };
          this.ResetLabels = function() {
            this.Label.Battle.Outcome.resetIcon();
            this.Label.Battle.Outcome.resetToolTipIcon();
            this.Label.Battle.Outcome.resetToolTipText();
            this.Label.Battle.Outcome.setShow("label");
            this.Label.Battle.Outcome.setLabel("-");
            this.Label.Battle.Duration.setValue("-:--");
            this.Label.Battle.OwnCity.setValue("-");
            this.Label.EnemyHealth.Overall.setValue("-");
            this.Label.EnemyHealth.Overall.resetToolTipText();
            this.Label.EnemyHealth.Overall.resetTextColor();
            this.Label.EnemyHealth.Base.setValue("-");
            this.Label.EnemyHealth.Base.resetToolTipText();
            this.Label.EnemyHealth.Base.resetTextColor();
            this.Label.EnemyHealth.Defense.setValue("-");
            this.Label.EnemyHealth.Defense.resetToolTipText();
            this.Label.EnemyHealth.Defense.resetTextColor();
            this.Label.EnemyHealth.CY.setValue("-");
            this.Label.EnemyHealth.CY.resetToolTipText();
            this.Label.EnemyHealth.CY.resetTextColor();
            this.Label.EnemyHealth.DF.setValue("-");
            this.Label.EnemyHealth.DF.resetToolTipText();
            this.Label.EnemyHealth.DF.resetTextColor();
            this.Label.EnemyHealth.CC.setValue("-");
            this.Label.EnemyHealth.CC.resetToolTipText();
            this.Label.EnemyHealth.CC.resetTextColor();
            this.Label.Repair.Storage.setValue("-");
            this.Label.Repair.Storage.resetToolTipText();
            this.Label.Repair.Storage.resetTextColor();
            this.Label.Repair.Overall.setValue("-");
            this.Label.Repair.Overall.resetToolTipText();
            this.Label.Repair.Overall.resetTextColor();
            this.Label.Repair.Inf.setValue("-");
            this.Label.Repair.Inf.resetToolTipText();
            this.Label.Repair.Inf.resetTextColor();
            this.Label.Repair.Vehi.setValue("-");
            this.Label.Repair.Vehi.resetToolTipText();
            this.Label.Repair.Vehi.resetTextColor();
            this.Label.Repair.Air.setValue("-");
            this.Label.Repair.Air.resetToolTipText();
            this.Label.Repair.Air.resetTextColor();
            this.Label.Loot.Tib.setValue("-");
            this.Label.Loot.Tib.resetToolTipText();
            this.Label.Loot.Tib.resetTextColor();
            this.Label.Loot.Cry.setValue("-");
            this.Label.Loot.Cry.resetToolTipText();
            this.Label.Loot.Cry.resetTextColor();
            this.Label.Loot.Cred.setValue("-");
            this.Label.Loot.Cred.resetToolTipText();
            this.Label.Loot.Cred.resetTextColor();
            this.Label.Loot.RP.setValue("-");
            this.Label.Loot.RP.resetToolTipText();
            this.Label.Loot.RP.resetTextColor();
            this.Label.Loot.Overall.setValue("-");
            this.Label.Loot.Overall.resetToolTipText();
            this.Label.Loot.Overall.resetTextColor();
          };
          this.Reset = function() {
            var d = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
            if (null === this.TargetCity || d.get_CityArmyFormationsManager().get_CurrentTargetBaseId() != this.TargetCity.get_Id()) {
              b = !1, this.OwnCity = this.TargetCity = null, this.ResetStats(), this.Stats.Loot.Tib.Base = 0, this.Stats.Loot.Cry.Base = 0, this.Stats.Loot.Cred.Base = 0, this.Stats.Loot.RP.Base = 0, this.Stats.Loot.Overall.Base = 0, this.ResetLabels();
            }
          };
          this.Select = function(b) {
            if (b == d) {
              b = "pane-light-opaque";
              var e = 1;
            } else {
              b = "pane-light-plain", e = 0.6;
            }
            this.Label.Battle.container.set({decorator:b, opacity:e});
            this.Label.EnemyHealth.container.set({decorator:b, opacity:e});
            this.Label.Repair.container.set({decorator:b, opacity:e});
            this.Label.Loot.container.set({decorator:b, opacity:e});
          };
          this.saveFormation = function() {
            try {
              e = [];
              for (var b = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l, d = 0; d < b.length; d++) {
                var f = b[d], g = {};
                g.x = f.get_CoordX();
                g.y = f.get_CoordY();
                g.id = f.get_Id();
                g.enabled = f.get_Enabled();
                e.push(g);
              }
            } catch (h$1) {
              console.log("Error Saving Stat Formation"), console.log(h$1.toString());
            }
          };
          this.loadFormation = function() {
            try {
              ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId(this.OwnCity.get_Id()), Simulator.getInstance().restoreFormation(e);
            } catch (b$2) {
              console.log("Error loading Stat Formation"), console.log(b$2.toString());
            }
          };
          this.Label.Battle.Outcome.getChildControl("icon").set({width:18, height:18, scale:!0, alignY:"middle"});
          this.Label.Battle.container.add(this.Label.Battle.Outcome);
          this.Label.Battle.container.add(this.Label.Battle.Duration);
          this.Label.Battle.container.add(this.Label.Battle.OwnCity);
          this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Overall);
          this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Base);
          this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Defense);
          this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.CY);
          this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.DF);
          this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.CC);
          this.Label.Repair.container.add(this.Label.Repair.Storage);
          this.Label.Repair.container.add(this.Label.Repair.Overall);
          this.Label.Repair.container.add(this.Label.Repair.Inf);
          this.Label.Repair.container.add(this.Label.Repair.Vehi);
          this.Label.Repair.container.add(this.Label.Repair.Air);
          this.Label.Loot.container.add(this.Label.Loot.Tib);
          this.Label.Loot.container.add(this.Label.Loot.Cry);
          this.Label.Loot.container.add(this.Label.Loot.Cred);
          this.Label.Loot.container.add(this.Label.Loot.RP);
          this.Label.Loot.container.add(this.Label.Loot.Overall);
          this.Label.Battle.container.addListener("click", function() {
            Simulator.StatWindow.getInstance().simSelected = d;
            for (var b = 0; b < Simulator.StatWindow.getInstance().sim.length; b++) {
              Simulator.StatWindow.getInstance().sim[b].Select(d);
            }
          }, this);
          this.Label.EnemyHealth.container.addListener("click", function() {
            Simulator.StatWindow.getInstance().simSelected = d;
            for (var b = 0; b < Simulator.StatWindow.getInstance().sim.length; b++) {
              Simulator.StatWindow.getInstance().sim[b].Select(d);
            }
          }, this);
          this.Label.Repair.container.addListener("click", function() {
            Simulator.StatWindow.getInstance().simSelected = d;
            for (var b = 0; b < Simulator.StatWindow.getInstance().sim.length; b++) {
              Simulator.StatWindow.getInstance().sim[b].Select(d);
            }
          }, this);
          this.Label.Loot.container.addListener("click", function() {
            Simulator.StatWindow.getInstance().simSelected = d;
            for (var b = 0; b < Simulator.StatWindow.getInstance().sim.length; b++) {
              Simulator.StatWindow.getInstance().sim[b].Select(d);
            }
          }, this);
          this.Label.Battle.container.addListener("dblclick", function() {
            this.loadFormation();
          }, this);
          this.Label.EnemyHealth.container.addListener("dblclick", function() {
            this.loadFormation();
          }, this);
          this.Label.Repair.container.addListener("dblclick", function() {
            this.loadFormation();
          }, this);
          this.Label.Loot.container.addListener("dblclick", function() {
            this.loadFormation();
          }, this);
          this.Label.EnemyHealth.container.addListener("contextmenu", function() {
            localStorage.getEHSelection = "hp rel" == localStorage.getEHSelection ? "hp" : "hp rel";
          }, this);
          this.Label.Repair.container.addListener("contextmenu", function() {
            localStorage.getRTSelection = "cry" == localStorage.getRTSelection ? "rt" : "hp" == localStorage.getRTSelection ? "hp rel" : "hp rel" == localStorage.getRTSelection ? "cry" : "hp";
          }, this);
        } catch (l) {
          console.log("Error init Simulation"), console.log(l.toString());
        }
      }, simulateStats:function() {
        console.log("Simulating Stats");
        var d = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
        null != d && (Simulator.getInstance().isSimulation = !0, Simulator.getInstance().saveTempFormation(), localStorage.ta_sim_last_city = d.get_Id(), ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_CityArmyFormationsManager().set_CurrentTargetBaseId(d.get_Id()), ClientLib.API.Battleground.GetInstance().SimulateBattle());
      }, doSimReplay:function() {
        try {
          if (Simulator.getInstance().isSimulation = !0, qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, localStorage.ta_sim_last_city, 0, 0), void 0 !== localStorage.autoSimulate && "yes" == localStorage.autoSimulate) {
            var d = localStorage.simulateSpeed;
            setTimeout(function() {
              var b = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
              b.RestartReplay();
              b.set_ReplaySpeed(parseInt(d, 10));
            }, 1E3);
          }
        } catch (b) {
          console.log("Error attempting to show Simulation Replay"), console.log(b.toString());
        }
      }, calculateRepairCosts:function(d, b, e, g, f) {
        var h = {RT:0, Cry:0, Tib:0};
        if (e != g) {
          for (d = ClientLib.API.Util.GetUnitRepairCosts(b, d, (e - g) / f), b = 0; b < d.length; b++) {
            switch(e = d[b], parseInt(e.Type, 10)) {
              case ClientLib.Base.EResourceType.Tiberium:
                h.Tib += e.Count;
                break;
              case ClientLib.Base.EResourceType.Crystal:
                h.Cry += e.Count;
                break;
              case ClientLib.Base.EResourceType.RepairChargeBase:
              case ClientLib.Base.EResourceType.RepairChargeInf:
              case ClientLib.Base.EResourceType.RepairChargeVeh:
              case ClientLib.Base.EResourceType.RepairChargeAir:
                h.RT += e.Count;
            }
          }
        }
        return h;
      }, _onTick:function() {
        for (var d = 0; d < this.sim.length; d++) {
          this.sim[d].UpdateLabels();
        }
      }, __OnSimulateBattleFinished:function(d) {
        !1 == this.isSimStatButtonDisabled && (this.disableSimulateStatButtonTimer(3), "function" === typeof Simulator.getInstance().disableSimulateButtonTimer && Simulator.getInstance().disableSimulateButtonTimer(3));
        !1 == this.simReplayBtn.getEnabled() && this.simReplayBtn.setEnabled(!0);
        this.getSimulationInfo(d, this.sim[this.simSelected]);
        this.sim[this.simSelected].setSimulation(d);
      }, getSimulationInfo:function(d, b) {
        console.log("Getting Player Unit Damage");
        try {
          b.ResetStats();
          for (var e = {}, g = [], f = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), h = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(), l = f.get_CityFaction(), f = 0; f < d.length; f++) {
            var k = d[f].Value, m = k.t, q = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(m), n = k.l, p = Math.floor(k.sh), r = Math.floor(k.h), s = Math.floor(16 * ClientLib.API.Util.GetUnitMaxHealthByLevel(n, q, !1)), v = q.pt, z = q.mt;
            g.push(k);
            switch(l) {
              case ClientLib.Base.EFactionType.GDIFaction:
              case ClientLib.Base.EFactionType.NODFaction:
                switch(v) {
                  case ClientLib.Base.EPlacementType.Defense:
                  case ClientLib.Base.EPlacementType.Structure:
                    s = Math.floor(16 * ClientLib.API.Util.GetUnitMaxHealthByLevel(n, q, !0));
                }
            }
            e = this.calculateRepairCosts(m, n, p, r, s);
            switch(v) {
              case ClientLib.Base.EPlacementType.Defense:
                b.Stats.EnemyHealth.Overall.StartHealth += p;
                b.Stats.EnemyHealth.Overall.EndHealth += r;
                b.Stats.EnemyHealth.Overall.MaxHealth += s;
                b.Stats.EnemyHealth.Overall.Tib += e.Tib;
                b.Stats.EnemyHealth.Overall.Cry += e.Cry;
                b.Stats.EnemyHealth.Defense.StartHealth += p;
                b.Stats.EnemyHealth.Defense.EndHealth += r;
                b.Stats.EnemyHealth.Defense.MaxHealth += s;
                b.Stats.EnemyHealth.Defense.Tib += e.Tib;
                b.Stats.EnemyHealth.Defense.Cry += e.Cry;
                break;
              case ClientLib.Base.EPlacementType.Offense:
                b.Stats.Repair.Overall.StartHealth += p;
                b.Stats.Repair.Overall.EndHealth += r;
                b.Stats.Repair.Overall.MaxHealth += s;
                b.Stats.Repair.Overall.Tib += e.Tib;
                b.Stats.Repair.Overall.Cry += e.Cry;
                switch(z) {
                  case ClientLib.Base.EUnitMovementType.Feet:
                    b.Stats.Repair.Inf.StartHealth += p;
                    b.Stats.Repair.Inf.EndHealth += r;
                    b.Stats.Repair.Inf.MaxHealth += s;
                    b.Stats.Repair.Inf.RT += e.RT;
                    b.Stats.Repair.Inf.Tib += e.Tib;
                    b.Stats.Repair.Inf.Cry += e.Cry;
                    break;
                  case ClientLib.Base.EUnitMovementType.Wheel:
                  case ClientLib.Base.EUnitMovementType.Track:
                    b.Stats.Repair.Vehi.StartHealth += p;
                    b.Stats.Repair.Vehi.EndHealth += r;
                    b.Stats.Repair.Vehi.MaxHealth += s;
                    b.Stats.Repair.Vehi.RT += e.RT;
                    b.Stats.Repair.Vehi.Tib += e.Tib;
                    b.Stats.Repair.Vehi.Cry += e.Cry;
                    break;
                  case ClientLib.Base.EUnitMovementType.Air:
                  case ClientLib.Base.EUnitMovementType.Air2:
                    b.Stats.Repair.Air.StartHealth += p, b.Stats.Repair.Air.EndHealth += r, b.Stats.Repair.Air.MaxHealth += s, b.Stats.Repair.Air.RT += e.RT, b.Stats.Repair.Air.Tib += e.Tib, b.Stats.Repair.Air.Cry += e.Cry;
                }break;
              case ClientLib.Base.EPlacementType.Structure:
                switch(b.Stats.EnemyHealth.Overall.StartHealth += p, b.Stats.EnemyHealth.Overall.EndHealth += r, b.Stats.EnemyHealth.Overall.MaxHealth += s, b.Stats.EnemyHealth.Overall.RT += e.RT, b.Stats.EnemyHealth.Overall.Tib += e.Tib, b.Stats.EnemyHealth.Overall.Cry += e.Cry, b.Stats.EnemyHealth.Base.StartHealth += p, b.Stats.EnemyHealth.Base.EndHealth += r, b.Stats.EnemyHealth.Base.MaxHealth += s, b.Stats.EnemyHealth.Base.RT += e.RT, b.Stats.EnemyHealth.Base.Tib += e.Tib, b.Stats.EnemyHealth.Base.Cry += 
                e.Cry, m) {
                  case 112:
                  case 151:
                  case 177:
                  case 233:
                    b.Stats.EnemyHealth.CY.StartHealth += p;
                    b.Stats.EnemyHealth.CY.EndHealth += r;
                    b.Stats.EnemyHealth.CY.MaxHealth += s;
                    b.Stats.EnemyHealth.CY.RT += e.RT;
                    b.Stats.EnemyHealth.CY.Tib += e.Tib;
                    b.Stats.EnemyHealth.CY.Cry += e.Cry;
                    break;
                  case 131:
                  case 158:
                  case 195:
                    b.Stats.EnemyHealth.DF.StartHealth += p;
                    b.Stats.EnemyHealth.DF.EndHealth += r;
                    b.Stats.EnemyHealth.DF.MaxHealth += s;
                    b.Stats.EnemyHealth.DF.RT += e.RT;
                    b.Stats.EnemyHealth.DF.Tib += e.Tib;
                    b.Stats.EnemyHealth.DF.Cry += e.Cry;
                    break;
                  case 111:
                  case 196:
                  case 159:
                    b.Stats.EnemyHealth.CC.StartHealth += p, b.Stats.EnemyHealth.CC.EndHealth += r, b.Stats.EnemyHealth.CC.MaxHealth += s, b.Stats.EnemyHealth.CC.RT += e.RT, b.Stats.EnemyHealth.CC.Tib += e.Tib, b.Stats.EnemyHealth.CC.Cry += e.Cry;
                }
            }
          }
          b.Stats.Repair.Overall.RT = Math.max(b.Stats.Repair.Inf.RT, b.Stats.Repair.Vehi.RT, b.Stats.Repair.Air.RT);
          b.Stats.Battle.Outcome = 0 === b.Stats.Repair.Overall.EndHealth ? 1 : 0 === b.Stats.EnemyHealth.CY.EndHealth ? 3 : 2;
          b.Stats.Repair.Storage = Math.min(h.GetResourceCount(8), h.GetResourceCount(9), h.GetResourceCount(10));
          this.calcResources(g, b);
          setTimeout(function() {
            var b = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
            Simulator.StatWindow.getInstance().sim[Simulator.StatWindow.getInstance().simSelected].Stats.Battle.Duration = b.get_BattleDuration();
          }, 1);
        } catch (u) {
          console.log("Error Getting Player Unit Damage"), console.log(u.toString());
        }
      }, calcResources:function(d, b) {
        try {
          var e = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_CityFaction(), g = {1:0, 2:0, 3:0, 6:0}, f, h, l, k = -1, m = -1;
          for (h = 0; 9 > h; h++) {
            for (l = 0; 8 > l; l++) {
              var q = ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth(), n = ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight(), p = ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(h * q, l * n);
              if (null !== p && "function" === typeof p.get_BuildingName) {
                try {
                  if (void 0 !== d) {
                    for (f = 0; f < d.length; f++) {
                      var r = d[f], s = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(r.t);
                      if (s.dn == p.get_BuildingName()) {
                        var v = Math.floor(16 * ClientLib.API.Util.GetUnitMaxHealthByLevel(r.l, s, !1));
                        switch(e) {
                          case ClientLib.Base.EFactionType.GDIFaction:
                          case ClientLib.Base.EFactionType.NODFaction:
                            switch(s.pt) {
                              case ClientLib.Base.EPlacementType.Defense:
                              case ClientLib.Base.EPlacementType.Structure:
                                v = Math.floor(16 * ClientLib.API.Util.GetUnitMaxHealthByLevel(r.l, s, !0));
                            }
                        }
                        k = (r.sh - r.h) / v;
                        "Harvester" == s.dn && (m = p.get_BuildingDetails().get_HitpointsPercent(), Math.round(100 * m) != Math.round(100 * k) && (k = m));
                        d.splice(f, 1);
                        break;
                      }
                    }
                  }
                } catch (z) {
                  console.log("Error Calculating Resources 2"), console.log(z), console.log(z.name + " " + z.message);
                }
                try {
                  var u = p.get_BuildingDetails();
                  -1 == k && (k = u.get_HitpointsPercent(), "Harvester" == p.get_BuildingName() && (m = p.get_BuildingDetails().get_HitpointsPercent(), Math.round(100 * m) != Math.round(100 * k) && (k = m)));
                } catch (t$3) {
                  console.log("Error Calculating Resources 3"), console.log(t$3), console.log(t$3.name + " " + t$3.message);
                }
                var w = u.get_UnitLevelRepairRequirements();
                for (f = 0; f < w.length; f++) {
                  var A = w[f].Type, y = w[f].Count;
                  g[A] += Math.round(k * y - 0.5);
                }
                k = -1;
              }
            }
          }
          for (h = 0; 9 > h; h++) {
            for (l = 8; 16 > l; l++) {
              try {
                q = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridWidth();
                n = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridHeight();
                8 == l && (q += 1, n += 1);
                var B = ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(h * q, l * n);
                if (null !== B && B.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.CityBuildingType && "function" === typeof B.get_UnitDetails) {
                  if (void 0 !== d) {
                    for (f = 0; f < d.length; f++) {
                      if (r = d[f], s = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(r.t), s.dn == B.get_UnitName()) {
                        v = Math.floor(16 * ClientLib.API.Util.GetUnitMaxHealthByLevel(r.l, s, !1));
                        switch(e) {
                          case ClientLib.Base.EFactionType.GDIFaction:
                          case ClientLib.Base.EFactionType.NODFaction:
                            switch(s.pt) {
                              case ClientLib.Base.EPlacementType.Defense:
                              case ClientLib.Base.EPlacementType.Structure:
                                v = Math.floor(16 * ClientLib.API.Util.GetUnitMaxHealthByLevel(r.l, s, !0));
                            }
                        }
                        k = (r.sh - r.h) / v;
                        d.splice(f, 1);
                        break;
                      }
                    }
                  }
                  var C = B.get_UnitDetails();
                  -1 == k && (k = C.get_HitpointsPercent());
                  w = C.get_UnitLevelRepairRequirements();
                  for (f = 0; f < w.length; f++) {
                    A = w[f].Type, y = w[f].Count, g[A] += Math.round(k * y - 0.5);
                  }
                  k = -1;
                }
              } catch (x) {
                console.log("Error Calculating Resources 4"), console.log(x), console.log(x.name + " " + x.message);
              }
            }
          }
          var E = g[1] + g[2] + g[3] + g[6];
          if (void 0 === d) {
            for (f = 0; f < this.sim.length; f++) {
              this.sim[f].Reset(), this.sim[f].Stats.Loot.Overall.Base = E, this.sim[f].Stats.Loot.Tib.Base = g[1], this.sim[f].Stats.Loot.Cry.Base = g[2], this.sim[f].Stats.Loot.Cred.Base = g[3], this.sim[f].Stats.Loot.RP.Base = g[6];
            }
          } else {
            3 === b.Stats.Battle.Outcome ? (b.Stats.Loot.Overall.Battle = b.Stats.Loot.Overall.Base, b.Stats.Loot.Tib.Battle = b.Stats.Loot.Tib.Base, b.Stats.Loot.Cry.Battle = b.Stats.Loot.Cry.Base, b.Stats.Loot.Cred.Battle = b.Stats.Loot.Cred.Base, b.Stats.Loot.RP.Battle = b.Stats.Loot.RP.Base) : (b.Stats.Loot.Overall.Battle = E, b.Stats.Loot.Tib.Battle = g[1], b.Stats.Loot.Cry.Battle = g[2], b.Stats.Loot.Cred.Battle = g[3], b.Stats.Loot.RP.Battle = g[6]);
          }
        } catch (D) {
          console.log("Error Calculating Resources"), console.log(D), console.log(D.name + " " + D.message);
        }
      }, disableSimulateStatButtonTimer:function(d) {
        try {
          1E4 <= d ? (this.isSimStatButtonDisabled = !0, this.simStatBtn.setEnabled(!1), this.simStatBtn.setLabel(Math.floor(d / 1E4)), d -= 1E4, setTimeout(function() {
            Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(d);
          }, 1E4)) : (setTimeout(function() {
            Simulator.StatWindow.getInstance().simStatBtn.setEnabled(!0);
            Simulator.StatWindow.getInstance().simStatBtn.setLabel("Update");
          }, d), this.isSimStatButtonDisabled = !1);
        } catch (b) {
          console.log("Error disabling simulator button"), console.log(b.toString());
        }
      }}});
      qx.Class.define("Simulator.OptionWindow", {type:"singleton", extend:qx.ui.window.Window, construct:function() {
        this.base(arguments);
        this.setLayout(new qx.ui.layout.VBox(5));
        this.addListener("resize", function() {
          this.center();
        }, this);
        this.set({caption:"THE OPTIONS BRO!", allowMaximize:!1, showMaximize:!1, allowMinimize:!1, showMinimize:!1});
        var d = qx.core.Init.getApplication(), b = new qx.ui.tabview.TabView, e = new qx.ui.tabview.Page("General");
        genLayout = new qx.ui.layout.VBox(5);
        e.setLayout(genLayout);
        var g = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
        g.setThemedFont("bold");
        var f = new qx.ui.basic.Label("Button Layouts:");
        g.add(f);
        e.add(g);
        g = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
        this._buttonLocCB = new qx.ui.form.CheckBox("Right/Left Sim Window");
        this._buttonLocCB.set({toolTipText:"SWITCHES BETWEEN THE RIGHT AND LEFT SIDE OF THE SIM WINDOW!"});
        /*
        this._buttonLoc2CB = new qx.ui.form.CheckBox("CombatBar/Right");
        this._buttonLoc2CB.set({toolTipText:"RECOMMENDED FOR HD DISPLAYS ONLY! SWITCHES BETWEEN RIDE SIDE AND COMBAT BAR."});
        this._buttonSizeCB = new qx.ui.form.CheckBox("Change SimBtn Size");
         this._buttonLoc2CB.addListener("changeValue", this._onButtonLocChange2, this);
        this._buttonSizeCB.addListener("changeValue", this._onButtonSizeChange, this);
        void 0 !== localStorage.isBtnCmd && ("yes" == localStorage.isBtnCmd ? this._buttonLoc2CB.setValue(!0) : this._buttonLoc2CB.setValue(!1));
        void 0 !== localStorage.isBtnNorm && ("yes" == localStorage.isBtnNorm ? this._buttonSizeCB.setValue(!0) : this._buttonSizeCB.setValue(!1), this.setButtonSize());
        this._disableRTBtnCB = new qx.ui.form.CheckBox("Disable Repair Button");
        this._disableRTBtnCB.addListener("changeValue", this._onDisableRTBtnChange, this);
        void 0 !== localStorage.isRTBtnDisabled && ("yes" == localStorage.isRTBtnDisabled ? this._disableRTBtnCB.setValue(!0) : this._disableRTBtnCB.setValue(!1));
        this._disableCmtBtnCB = new qx.ui.form.CheckBox("Disable Combat Button");
        this._disableCmtBtnCB.addListener("changeValue", this._onDisableCmtBtnChange, this);
        void 0 !== localStorage.isCmtBtnDisabled && ("yes" == localStorage.isCmtBtnDisabled ? this._disableCmtBtnCB.setValue(!0) : this._disableCmtBtnCB.setValue(!1));
        */
        this._buttonLocCB.addListener("changeValue", this._onButtonLocChange, this);
        void 0 !== localStorage.isBtnRight && ("yes" == localStorage.isBtnRight ? this._buttonLocCB.setValue(!0) : this._buttonLocCB.setValue(!1));
        
        
        this._ArmyUnitTooltip = new qx.ui.form.CheckBox("Disable Army Unit Tooltip");
        this._ArmyUnitTooltip.addListener("changeValue", this._onArmyUnitTooltipChange, this);
        void 0 !== localStorage.ArmyUnitTooltipDisabled && ("yes" == localStorage.ArmyUnitTooltipDisabled ? this._ArmyUnitTooltip.setValue(!0) : this._ArmyUnitTooltip.setValue(!1));
       // g.add(this._buttonSizeCB);
        g.add(this._buttonLocCB);
       // g.add(this._buttonLoc2CB);
       // g.add(this._disableRTBtnCB);
       // g.add(this._disableCmtBtnCB);
        g.add(this._ArmyUnitTooltip);
        e.add(g);
        g = (new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});
        g.setThemedFont("bold");
        f = new qx.ui.basic.Label("Simulator:");
        g.add(f);
        e.add(g);
        g = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
        this._autoSimulateCB = new qx.ui.form.CheckBox("Auto Start Simulation");
        void 0 !== localStorage.autoSimulate && "yes" == localStorage.autoSimulate && this._autoSimulateCB.setValue(!0);
        var h = (new qx.ui.container.Composite(new qx.ui.layout.Grid(5))).set({marginLeft:20}), l = new qx.ui.form.RadioButton("x1"), k = new qx.ui.form.RadioButton("x2"), m = new qx.ui.form.RadioButton("x4");
        this._simSpeedGroup = new qx.ui.form.RadioGroup(l, k, m);
        this._simSpeedGroup.addListener("changeSelection", this._onSimSpeedChange, this);
        this._autoSimulateCB.addListener("changeValue", this._onAutoSimulateChange, this);
        void 0 !== localStorage.simulateSpeed && (f = this._simSpeedGroup.getSelectables(!1), "2" == localStorage.simulateSpeed ? f[1].setValue(!0) : "4" == localStorage.simulateSpeed ? f[2].setValue(!0) : f[0].setValue(!0));
        !1 == this._autoSimulateCB.getValue() && this._simSpeedGroup.setEnabled(!1);
        h.add(l, {row:0, column:0});
        h.add(k, {row:0, column:1});
        h.add(m, {row:0, column:2});
        g.add(this._autoSimulateCB);
        g.add(h);
        e.add(g);
        g = new qx.ui.tabview.Page("Stats");
        statsLayout = new qx.ui.layout.VBox(5);
        g.setLayout(statsLayout);
        f = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
        f.setThemedFont("bold");
        h = new qx.ui.basic.Label("Stat Window:");
        f.add(h);
        g.add(f);
        f = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
        this._autoOpenCB = new qx.ui.form.CheckBox("Auto Open");
        this._autoOpenCB.addListener("changeValue", this._onAutoOpenStatsChange, this);
        void 0 !== localStorage.autoOpenStat && ("yes" == localStorage.autoOpenStat ? this._autoOpenCB.setValue(!0) : this._autoOpenCB.setValue(!1));
        f.add(this._autoOpenCB);
        g.add(f);
        f = (new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});
        f.setThemedFont("bold");
        h = new qx.ui.basic.Label(d.tr("tnf:combat target"));
        f.add(h);
        g.add(f);
        h = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
        l = new qx.ui.form.RadioButton("HP abs");
        k = new qx.ui.form.RadioButton("HP rel");
        this._EnemyHealthSecGroup = new qx.ui.form.RadioGroup(l, k);
        this._EnemyHealthSecGroup.addListener("changeSelection", this._onEnemyHealthSelectionChange, this);
        void 0 !== localStorage.getEHSelection && (f = this._EnemyHealthSecGroup.getSelectables(!1), "hp" == localStorage.getEHSelection ? f[0].setValue(!0) : "hp rel" == localStorage.getEHSelection ? f[1].setValue(!0) : f[0].setValue(!0));
        h.add(l);
        h.add(k);
        g.add(h);
        f = (new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});
        f.setThemedFont("bold");
        d = new qx.ui.basic.Label(d.tr("tnf:own repair cost"));
        f.add(d);
        g.add(f);
        d = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
        h = new qx.ui.form.RadioButton("RT");
        l = new qx.ui.form.RadioButton("C");
        k = new qx.ui.form.RadioButton("HP abs");
        m = new qx.ui.form.RadioButton("HP rel");
        this._repairSecGroup = new qx.ui.form.RadioGroup(h, l, k, m);
        this._repairSecGroup.addListener("changeSelection", this._onRepairSelectionChange, this);
        void 0 !== localStorage.getRTSelection && (f = this._repairSecGroup.getSelectables(!1), "rt" == localStorage.getRTSelection ? f[0].setValue(!0) : "cry" == localStorage.getRTSelection ? f[1].setValue(!0) : "hp" == localStorage.getRTSelection ? f[2].setValue(!0) : "hp rel" == localStorage.getRTSelection ? f[3].setValue(!0) : f[0].setValue(!0));
        d.add(h);
        d.add(l);
        d.add(k);
        d.add(m);
        g.add(d);
        d = (new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});
        d.setThemedFont("bold");
         /*
        f = new qx.ui.basic.Label("Simulations shown");
        d.add(f);
        g.add(d);
        d = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
        this._simViews = (new qx.ui.form.Spinner).set({minimum:2});
        void 0 !== localStorage.simViews && (isNaN(parseInt(localStorage.simViews, 10)) ? this._simViews.setValue(Simulator.StatWindow.getInstance().simViews) : this._simViews.setValue(parseInt(localStorage.simViews, 10)));
        this._simViews.addListener("changeValue", this._onSimViewsChanged, this);
        d.add(this._simViews);
        g.add(d);
        */
        d = (new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});
        d.setThemedFont("bold");
        f = new qx.ui.basic.Label("Hide Sections (on Startup):");
        d.add(f);
        g.add(d);
        d = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
        this._hideHealthCB = new qx.ui.form.CheckBox("Health");
        this._hideRepairCB = new qx.ui.form.CheckBox("Repair");
        this._hideLootCB = new qx.ui.form.CheckBox("Loot");
        this._hideHealthCB.addListener("changeValue", this._onHideEHChange, this);
        this._hideRepairCB.addListener("changeValue", this._onHideRTChange, this);
        this._hideLootCB.addListener("changeValue", this._onHideLootChange, this);
        void 0 !== localStorage.hideHealth && ("yes" == localStorage.hideHealth ? this._hideHealthCB.setValue(!0) : this._hideHealthCB.setValue(!1));
        void 0 !== localStorage.hideRepair && ("yes" == localStorage.hideRepair ? this._hideRepairCB.setValue(!0) : this._hideRepairCB.setValue(!1));
        void 0 !== localStorage.hideLoot && ("yes" == localStorage.hideLoot ? this._hideLootCB.setValue(!0) : this._hideLootCB.setValue(!1));
        d.add(this._hideHealthCB);
        d.add(this._hideRepairCB);
        d.add(this._hideLootCB);
        g.add(d);
        d = (new qx.ui.container.Composite(new qx.ui.layout.HBox(5))).set({marginTop:10});
        f = (new qx.ui.basic.Label("Set Stat Window Position:")).set({alignY:"middle"});
        f.setFont("bold");
        h = (new qx.ui.form.Button("Set")).set({allowGrowX:!1, allowGrowY:!1, height:20});
        h.addListener("click", this._onSetStatWindowPositionChange, this);
        d.add(f);
        d.add(h);
        g.add(d);
        b.add(e);
        b.add(g);
        this.add(b);
      }, destruct:function() {
      }, members:{_buttonSizeCB:null, _buttonLocCB:null, _buttonLoc2CB:null, _disableRTBtnCB:null, _disableCmtBtnCB:null, _autoOpenCB:null, _autoSimulateCB:null, _simSpeedGroup:null, _repairSecGroup:null, _EnemyHealthSecGroup:null, _simViews:null, _hideHealthCB:null, _hideRepairCB:null, _hideLootCB:null, _ArmyUnitTooltip:null, _onButtonSizeChange:function() {
        try {
          !0 == this._buttonSizeCB.getValue() ? localStorage.isBtnNorm = "yes" : localStorage.isBtnNorm = "no", this.setButtonSize();
        } catch (d) {
          console.log("Error Button Size Change: " + d.toString());
        }
      }, _onButtonLocChange:function() {
        try {
          !0 == this._buttonLocCB.getValue() ? localStorage.isBtnRight = "yes" : localStorage.isBtnRight = "no", this.setButtonLoc();
        } catch (d) {
          console.log("Error Button Location Change: " + d.toString());
        }
      }, _onButtonLocChange2:function() {
        try {
          !0 == this._buttonLoc2CB.getValue() ? localStorage.isBtnCmd = "yes" : localStorage.isBtnCmd = "no", this.setButtonLoc2();
        } catch (d) {
          console.log("Error Button Location Change: " + d.toString());
        }
      }, _onDisableRTBtnChange:function() {
        try {
          var d = this._disableRTBtnCB.getValue();
          localStorage.isRTBtnDisabled = !0 == d ? "yes" : "no";
          this.setRTBtn(d);
        } catch (b) {
          console.log("Error Disable RT Button Change: " + b.toString());
        }
      }, _onDisableCmtBtnChange:function() {
        try {
          var d = this._disableCmtBtnCB.getValue();
          localStorage.isCmtBtnDisabled = !0 == d ? "yes" : "no";
          this.setCmtBtn(d);
        } catch (b) {
          console.log("Error Disable Cmt Button Change: " + b.toString());
        }
      }, _onEnemyHealthSelectionChange:function(d) {
        try {
          var b = d.getData()[0].getLabel();
          localStorage.getEHSelection = "HP abs" == b ? "hp" : "HP rel" == b ? "hp rel" : "hp";
        } catch (e) {
          console.log("Error Enemy Health Section Selection Change: " + e.toString());
        }
      }, _onRepairSelectionChange:function(d) {
        try {
          var b = d.getData()[0].getLabel();
          localStorage.getRTSelection = "RT" == b ? "rt" : "HP abs" == b ? "hp" : "HP rel" == b ? "hp rel" : "C" == b ? "cry" : "rt";
        } catch (e) {
          console.log("Error Repair Section Selection Change: " + e.toString());
        }
      }, _onAutoOpenStatsChange:function() {
        try {
          !1 == this._autoOpenCB.getValue() ? localStorage.autoOpenStat = "no" : localStorage.autoOpenStat = "yes";
        } catch (d) {
          console.log("Error Auto Open Stats Change: " + d.toString());
        }
      }, _onArmyUnitTooltipChange:function() {
        try {
          !1 == this._ArmyUnitTooltip.getValue() ? localStorage.ArmyUnitTooltipDisabled = "no" : localStorage.ArmyUnitTooltipDisabled = "yes";
        } catch (d) {
          console.log("Error Army Unit Tooltip Change: " + d.toString());
        }
      }, _onAutoSimulateChange:function() {
        try {
          !1 == this._autoSimulateCB.getValue() ? (this._simSpeedGroup.setEnabled(!1), localStorage.autoSimulate = "no") : (this._simSpeedGroup.setEnabled(!0), localStorage.autoSimulate = "yes");
        } catch (d) {
          console.log("Error Auto Simulate Change: " + d.toString());
        }
      }, _onSimSpeedChange:function(d) {
        try {
          var b = d.getData()[0].getLabel();
          localStorage.simulateSpeed = "x1" == b ? "1" : "x2" == b ? "2" : "4";
        } catch (e) {
          console.log("Error Sim Speed Change: " + e.toString());
        }
      }, _onSimViewsChanged:function() {
        try {
          var d = parseInt(this._simViews.getValue(), 10);
          if (!isNaN(d) && 0 < d) {
            localStorage.simViews = d.toString();
            Simulator.StatWindow.getInstance().simViews = d;
            for (var b = Simulator.StatWindow.getInstance().sim.length - 1; 0 <= b; b--) {
              b > d - 1 && (Simulator.StatWindow.getInstance().Battle.remove(Simulator.StatWindow.getInstance().sim[b].Label.Battle.container), Simulator.StatWindow.getInstance().EnemyHealth.remove(Simulator.StatWindow.getInstance().sim[b].Label.EnemyHealth.container), Simulator.StatWindow.getInstance().Repair.remove(Simulator.StatWindow.getInstance().sim[b].Label.Repair.container), Simulator.StatWindow.getInstance().Loot.remove(Simulator.StatWindow.getInstance().sim[b].Label.Loot.container), Simulator.StatWindow.getInstance().sim.pop());
            }
            for (b = 0; b < d; b++) {
              b == Simulator.StatWindow.getInstance().sim.length && (Simulator.StatWindow.getInstance().sim.push(new (Simulator.StatWindow.getInstance().Simulation)(b)), Simulator.StatWindow.getInstance().Battle.add(Simulator.StatWindow.getInstance().sim[b].Label.Battle.container, {flex:1}), Simulator.StatWindow.getInstance().EnemyHealth.add(Simulator.StatWindow.getInstance().sim[b].Label.EnemyHealth.container, {flex:1}), Simulator.StatWindow.getInstance().Repair.add(Simulator.StatWindow.getInstance().sim[b].Label.Repair.container, 
              {flex:1}), Simulator.StatWindow.getInstance().Loot.add(Simulator.StatWindow.getInstance().sim[b].Label.Loot.container, {flex:1}), Simulator.StatWindow.getInstance().sim[b].Select(Simulator.StatWindow.getInstance().simSelected));
            }
            if (d - 1 < Simulator.StatWindow.getInstance().simSelected) {
              for (b = Simulator.StatWindow.getInstance().simSelected = 0; b < Simulator.StatWindow.getInstance().sim.length; b++) {
                Simulator.StatWindow.getInstance().sim[b].Select(0);
              }
            }
          }
        } catch (e) {
          console.log("Error Simulation Views Change: " + e.toString());
        }
      }, _onHideEHChange:function() {
        try {
          !0 == this._hideHealthCB.getValue() ? localStorage.hideHealth = "yes" : localStorage.hideHealth = "no";
        } catch (d) {
          console.log("Error Hide Enemy Base Health Change: " + d.toString());
        }
      }, _onHideRTChange:function() {
        try {
          !0 == this._hideRepairCB.getValue() ? localStorage.hideRepair = "yes" : localStorage.hideRepair = "no";
        } catch (d) {
          console.log("Error Hide Repair Times Change: " + d.toString());
        }
      }, _onHideLootChange:function() {
        try {
          !0 == this._hideLootCB.getValue() ? localStorage.hideLoot = "yes" : localStorage.hideLoot = "no";
        } catch (d) {
          console.log("Error Hide Loot Change: " + d.toString());
        }
      }, _onSetStatWindowPositionChange:function() {
        try {
          var d = Simulator.StatWindow.getInstance().getLayoutProperties();
          localStorage.statWindowPosLeft = d.left;
          localStorage.statWindowPosTop = d.top;
        } catch (b) {
          console.log("Error Stat Window Position Change: " + b.toString());
        }
      },
      /*
      setRTBtn:function(d) {
        !0 == d ? Simulator.getInstance().unlockRTBtn.hide() : Simulator.getInstance().unlockRTBtn.show();
      }, setCmtBtn:function(d) {
        !0 == d ? Simulator.getInstance().unlockCmtBtn.hide() : Simulator.getInstance().unlockCmtBtn.show();
      },
      */
      setButtonLoc:function() {
        try {
          !0 == this._buttonLocCB.getValue() ? (a = null, Simulator.getInstance().playArea.add(Simulator.getInstance().simBtn, {left:a, right:3, bottom:130}), Simulator.getInstance().playArea.add(Simulator.getInstance().statBtn, {left:a, right:33, bottom:389}), Simulator.getInstance().playArea.add(Simulator.getInstance().optionBtn, {left:a, right:3, bottom:414}), Simulator.getInstance().playArea.add(Simulator.getInstance().layoutBtn, {left:a, right:3, bottom:389}), Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn, 
          {left:a, right:25, bottom:214}), Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn, {left:a, right:25, bottom:189}), Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn, {left:a, right:50, bottom:203}), Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn, {left:a, right:3, bottom:203}), Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn, {left:a, right:33, bottom:364}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH, 
          {left:a, right:3, bottom:289.5}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV, {left:a, right:33, bottom:289.5}), Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn, {left:a, right:33, bottom:314.5}), Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn, {left:a, right:3, bottom:314.5}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnC, {left:a, right:3, bottom:239.5}), Simulator.getInstance().mirrorBtnC.getChildControl("icon").set({width:19, 
          height:23, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnK, {left:a, right:18.5, bottom:264.5}), Simulator.getInstance().mirrorBtnK.getChildControl("icon").set({width:19, height:23, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnU, {left:a, right:35, bottom:239.5}), Simulator.getInstance().mirrorBtnU.getChildControl("icon").set({width:19, height:23, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().ainfBtn, 
          {left:a, right:3, bottom:364}), Simulator.getInstance().ainfBtn.set({width:25, height:25}), Simulator.getInstance().ainfBtn.getChildControl("icon").set({width:15, height:15, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().avehBtn, {left:a, right:33, bottom:339.5}), Simulator.getInstance().avehBtn.set({width:25, height:25}), Simulator.getInstance().avehBtn.getChildControl("icon").set({width:15, height:15, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().aairBtn, 
          {left:a, right:3, bottom:339.5}), Simulator.getInstance().aairBtn.set({width:25, height:25}), Simulator.getInstance().aairBtn.getChildControl("icon").set({width:15, height:15, scale:!0})) : (c = null, Simulator.getInstance().playArea.add(Simulator.getInstance().simBtn, {right:c, left:3, bottom:130}), Simulator.getInstance().playArea.add(Simulator.getInstance().statBtn, {right:c, left:33, bottom:389}), Simulator.getInstance().playArea.add(Simulator.getInstance().optionBtn, {right:c, left:3, 
          bottom:414}), Simulator.getInstance().playArea.add(Simulator.getInstance().layoutBtn, {right:c, left:3, bottom:389}), Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn, {right:c, left:25, bottom:214}), Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn, {right:c, left:25, bottom:189}), Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn, {right:c, left:3, bottom:203}), Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn, 
          {right:c, left:50, bottom:203}), Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn, {right:c, left:33, bottom:364}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH, {right:c, left:3, bottom:289.5}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV, {right:c, left:33, bottom:289.5}), Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn, {right:c, left:33, bottom:314.5}), Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn, 
          {right:c, left:3, bottom:314.5}), Simulator.getInstance().playArea.add(Simulator.getInstance().ainfBtn, {right:c, left:3, bottom:364}), Simulator.getInstance().ainfBtn.set({width:25, height:25}), Simulator.getInstance().ainfBtn.getChildControl("icon").set({width:15, height:15, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().avehBtn, {right:c, left:33, bottom:339.5}), Simulator.getInstance().avehBtn.set({width:25, height:25}), Simulator.getInstance().avehBtn.getChildControl("icon").set({width:15, 
          height:15, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().aairBtn, {right:c, left:3, bottom:339.5}), Simulator.getInstance().aairBtn.set({width:25, height:25}), Simulator.getInstance().aairBtn.getChildControl("icon").set({width:15, height:15, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnC, {right:c, left:3, bottom:239.5}), Simulator.getInstance().mirrorBtnC.getChildControl("icon").set({width:19, height:23, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnK, 
          {right:c, left:18.5, bottom:264.5}), Simulator.getInstance().mirrorBtnK.getChildControl("icon").set({width:19, height:23, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnU, {right:c, left:35, bottom:239.5}), Simulator.getInstance().mirrorBtnU.getChildControl("icon").set({width:19, height:23, scale:!0}));
        } catch (d) {
          console.log("Error Setting Button Location: " + d.toString());
        }
      },
      setButtonLoc2:function() {
        try {
          !0 == this._buttonLoc2CB.getValue() ? (a = null, Simulator.getInstance().playArea.add(Simulator.getInstance().simBtn, {left:a, right:3, bottom:136}), Simulator.getInstance().playArea.add(Simulator.getInstance().statBtn, {left:a, right:30, bottom:389}), Simulator.getInstance().playArea.add(Simulator.getInstance().optionBtn, {left:a, right:3, bottom:414}), Simulator.getInstance().playArea.add(Simulator.getInstance().layoutBtn, {left:a, right:3, bottom:389}), Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn, 
          {left:a, right:19, bottom:219.2}), Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn, {left:a, right:19, bottom:192.9}), Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn, {left:a, right:36.5, bottom:206}), Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn, {left:a, right:5, bottom:206}), Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn, {left:a, right:30, bottom:364}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH, 
          {left:a, right:3, bottom:289.5}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV, {left:a, right:30, bottom:289.5}), Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn, {left:a, right:30, bottom:314.5}), Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn, {left:a, right:3, bottom:314.5}), Simulator.getInstance().playArea.add(Simulator.getInstance().ainfBtn, {left:a, right:3, bottom:364}), Simulator.getInstance().ainfBtn.set({width:25, 
          height:25}), Simulator.getInstance().ainfBtn.getChildControl("icon").set({width:15, height:15, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().avehBtn, {left:a, right:30, bottom:339.5}), Simulator.getInstance().avehBtn.set({width:25, height:25}), Simulator.getInstance().avehBtn.getChildControl("icon").set({width:15, height:15, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().aairBtn, {left:a, right:3, bottom:339.5}), Simulator.getInstance().aairBtn.set({width:25, 
          height:25}), Simulator.getInstance().aairBtn.getChildControl("icon").set({width:15, height:15, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnC, {left:a, right:3, bottom:239.5}), Simulator.getInstance().mirrorBtnC.getChildControl("icon").set({width:19, height:23, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnK, {left:a, right:18.5, bottom:264.5}), Simulator.getInstance().mirrorBtnK.getChildControl("icon").set({width:19, 
          height:23, scale:!0}), Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnU, {left:a, right:35, bottom:239.5}), Simulator.getInstance().mirrorBtnU.getChildControl("icon").set({width:19, height:23, scale:!0})) : (a = null, Simulator.getInstance().armyBar.add(Simulator.getInstance().quickSaveBtn, {left:82, right:a, bottom:45}), Simulator.getInstance().playArea.add(Simulator.getInstance().statBtn, {left:a, right:3, bottom:181}), Simulator.getInstance().playArea.add(Simulator.getInstance().optionBtn, 
          {left:a, right:3, bottom:134}), Simulator.getInstance().armyBar.add(Simulator.getInstance().layoutBtn, {left:82, right:a, bottom:7}), Simulator.getInstance().armyBar.add(Simulator.getInstance().simBtn, {left:a, right:60, bottom:13}), Simulator.getInstance().armyBar.add(Simulator.getInstance().armyUndoBtn, {left:82, right:a, bottom:121.5}), Simulator.getInstance().armyBar.add(Simulator.getInstance().disableAllUnitsBtn, {left:82, right:a, bottom:83}), Simulator.getInstance().armyBar.add(Simulator.getInstance().shiftUpBtn, 
          {left:a, right:78.5, bottom:134}), Simulator.getInstance().armyBar.add(Simulator.getInstance().shiftDownBtn, {left:50, right:78.5, bottom:108}), Simulator.getInstance().armyBar.add(Simulator.getInstance().shiftLeftBtn, {left:a, right:95.7, bottom:121}), Simulator.getInstance().armyBar.add(Simulator.getInstance().shiftRightBtn, {left:a, right:64.5, bottom:121}), Simulator.getInstance().armyBar.add(Simulator.getInstance().mirrorBtnH, {left:a, right:63, bottom:83}), Simulator.getInstance().armyBar.add(Simulator.getInstance().mirrorBtnV, 
          {left:a, right:90, bottom:83}), Simulator.getInstance().armyBar.add(Simulator.getInstance().ainfBtn, {right:a, left:61, bottom:106}), Simulator.getInstance().ainfBtn.set({width:12, height:12}), Simulator.getInstance().armyBar.add(Simulator.getInstance().avehBtn, {right:a, left:61, bottom:68}), Simulator.getInstance().avehBtn.set({width:12, height:12}), Simulator.getInstance().armyBar.add(Simulator.getInstance().aairBtn, {right:a, left:61, bottom:30}), Simulator.getInstance().aairBtn.set({width:12, 
          height:12}), Simulator.getInstance().armyBar.add(Simulator.getInstance().mirrorBtnC, {left:32, right:a, bottom:29}), Simulator.getInstance().mirrorBtnC.getChildControl("icon").set({width:12, height:18, scale:!0}), Simulator.getInstance().armyBar.add(Simulator.getInstance().mirrorBtnK, {left:32, right:a, bottom:105}), Simulator.getInstance().mirrorBtnK.getChildControl("icon").set({width:12, height:18, scale:!0}), Simulator.getInstance().armyBar.add(Simulator.getInstance().mirrorBtnU, {left:32, 
          right:a, bottom:67}), Simulator.getInstance().mirrorBtnU.getChildControl("icon").set({width:12, height:18, scale:!0}));
        } catch (d) {
          console.log("Error Setting Button Location: " + d.toString());
        }
      } /*setButtonSize:function() {
        try {
          value = this._buttonSizeCB.getValue(), !0 == value ? (Simulator.getInstance().simBtn.setLabel("S", "https://www.openmerchantaccount.com/img/simbtnlarge.png"), Simulator.getInstance().simBtn.getChildControl("icon").set({width:45, height:45, scale:!0}), Simulator.getInstance().simBtn.setWidth(45)) : (Simulator.getInstance().simBtn.setLabel("S", "https://www.openmerchantaccount.com/img/simbtnlarge.png"), Simulator.getInstance().simBtn.getChildControl("icon").set({width:72, height:46, scale:!0}), 
          Simulator.getInstance().simBtn.setWidth(72)), Simulator.getInstance().statBtn.setLabel("", "https://www.openmerchantaccount.com/img/stats.png"), Simulator.getInstance().statBtn.setWidth(25), Simulator.getInstance().statBtn.setHeight(25), Simulator.getInstance().optionBtn.setLabel("Options"), Simulator.getInstance().optionBtn.setWidth(45), Simulator.getInstance().layoutBtn.setLabel(""), Simulator.getInstance().layoutBtn.setWidth(25), Simulator.getInstance().layoutBtn.setHeight(25);
        } catch (d) {
          console.log("Error Setting Button Size: " + d.toString());
        }
      }*/}});
      qx.Class.define("Simulator.LayoutWindow", {type:"singleton", extend:webfrontend.gui.CustomWindow, construct:function() {
        this.base(arguments);
        this.setLayout(new qx.ui.layout.VBox);
        this.set({width:200, caption:"YOUR PRETTY LAYOUTS", padding:2, allowMaximize:!1, showMaximize:!1, allowMinimize:!1, showMinimize:!1});
        var d = (new qx.ui.container.Composite(new qx.ui.layout.VBox(5))).set({decorator:"pane-light-opaque"}), b = (new qx.ui.basic.Label("SAVED FORMATIONS")).set({alignX:"center", alignY:"top", font:"font_size_14_bold"});
        d.add(b);
        this.add(d);
        this.layoutList = new qx.ui.form.List;
        this.layoutList.set({selectionMode:"one", height:100, width:150, margin:5});
        this.add(this.layoutList);
        d = new qx.ui.container.Composite;
        b = new qx.ui.layout.HBox(5, "center");
        d.setLayout(b);
        var b = new qx.ui.form.Button("Load"), e = new qx.ui.form.Button("Delete");
        b.set({height:15, width:70, alignX:"center"});
        b.addListener("click", this.loadLayout, this);
        e.set({height:15, width:70, alignX:"center"});
        e.addListener("click", this.deleteLayout, this);
        d.add(b);
        d.add(e);
        this.add(d);
        d = (new qx.ui.container.Composite((new qx.ui.layout.HBox).set({spacing:10}))).set({marginTop:20, marginLeft:5});
        this.layoutTextBox = (new qx.ui.form.TextField("")).set({width:75, maxLength:15});
        b = new qx.ui.form.Button("Save");
        b.set({height:10, width:70, alignX:"center"});
        b.addListener("click", this.saveNewLayout, this);
        d.add(this.layoutTextBox);
        d.add(b);
        this.add(d);
        d = (new qx.ui.container.Composite((new qx.ui.layout.HBox).set({spacing:10}))).set({marginTop:10, marginLeft:5});
        this.persistentCheck = new qx.ui.form.CheckBox("Make Persistent");
        this.persistentCheck.setTextColor("white");
        this.persistentCheck.setFont("bold");
        this.persistentCheck.setToolTipText("If checked, formation will be saved and can be used by this city in any other city");
        d.add(this.persistentCheck);
        this.add(d);
        d = (new qx.ui.container.Composite(new qx.ui.layout.HBox)).set({marginTop:5, marginLeft:5});
        b = (new qx.ui.basic.Label("")).set({alignX:"center", alignY:"top"});
        b.setValue(" <align='justify'><b>If formation does not change on load, try moving one unit first, then try again.</b></p>");
        b.set({rich:!0, wrap:!0, width:165, textColor:"white"});
        d.add(b);
        this.add(d);
        d = (new qx.ui.container.Composite(new qx.ui.layout.VBox)).set({alignX:"center", marginTop:5, marginLeft:5, allowGrowX:!1});
        b = (new qx.ui.form.Button("Clear All")).set({alignX:"center", width:70});
        b.addListener("click", this.clearAllLayouts, this);
        d.add(b);
        this.add(d);
        this.layoutsArray = [];
      }, destruct:function() {
      }, members:{layoutList:null, layoutTextBox:null, layoutsArray:null, persistentCheck:null, saveNewLayout:function(d) {
        try {
          console.log("Saving Layout");
          if (void 0 !== d && !0 == d || "" == this.layoutTextBox.getValue()) {
            var b = new Date, e = b.getDate(), g = b.getMonth() + 1, f = 10 > b.getHours() ? "0" + b.getHours() : b.getHours(), h = 10 > b.getMinutes() ? "0" + b.getMinutes() : b.getMinutes(), l = 10 > b.getSeconds() ? "0" + b.getSeconds() : b.getSeconds(), k = g + "/" + e + "@" + f + ":" + h + ":" + l;
          } else {
            k = this.layoutTextBox.getValue();
          }
          var m = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId(), q = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId() + "." + m + "." + k, n = this.layoutList.getChildren();
          for (d = 0; d < n.length; d++) {
            if (thisItem = n[d].getModel(), thisItem == q) {
              alert("Save Failed: Duplicate Name");
              return;
            }
          }
          var p = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l, p = this.prepareLayout(p), n = {}, n = !0 == this.persistentCheck.getValue() ? {id:q, label:k, formation:p, pers:"yes"} : {id:q, label:k, formation:p, pers:"no"};
          this.layoutsArray.push(n);
          this.layoutList.add(new qx.ui.form.ListItem(n.label, null, n.id));
          this.layoutTextBox.setValue("");
          Simulator.getInstance().quickSaveBtn.setLabel("?");
          setTimeout(function() {
            Simulator.getInstance().quickSaveBtn.setLabel("QS");
          }, 2E3);
          this.updateStorage();
        } catch (r) {
          console.log("Error Saving Layout"), console.log(r);
        }
      }, loadLayout:function() {
        try {
          console.log("Loading Layout");
          ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
          var d = this.layoutList.getSelection()[0].getModel(), b;
          for (b in this.layoutsArray) {
            if (this.layoutsArray[b].id == d) {
              Simulator.getInstance().restoreFormation(this.layoutsArray[b].formation);
              break;
            }
          }
        } catch (e) {
          console.log("Error Loading Layout"), console.log(e);
        }
      }, deleteLayout:function() {
        try {
          if (console.log("Deleting Layout"), confirm("Are you sure you want to delete this layout?")) {
            for (var d in this.layoutsArray) {
              this.layoutsArray[d].id == this.layoutList.getSelection()[0].getModel() && (this.layoutsArray.splice(d, 1), this.updateStorage());
            }
            this.updateLayoutList();
          }
        } catch (b) {
          console.log("Error Deleting Layout"), console.log(b);
        }
      }, updateStorage:function() {
        try {
          console.log("Updating Storage"), localStorage.savedFormations = JSON.stringify(this.layoutsArray);
        } catch (d) {
          console.log("Error updating localStorage"), console.log(d);
        }
      }, updateLayoutList:function() {
        try {
          console.log("Updating Layout List");
          var d = localStorage.savedFormations;
          void 0 !== d && (this.layoutsArray = JSON.parse(d));
          this.layoutList.removeAll();
          var b = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId(), e = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId(), d = e + "." + b, g;
          for (g in this.layoutsArray) {
            var f = this.layoutsArray[g].label, b = d + "." + f, h = this.layoutsArray[g].pers, l = this.layoutsArray[g].id.match(e.toString());
            (b == this.layoutsArray[g].id || void 0 !== h && "yes" == h && null != l) && this.layoutList.add(new qx.ui.form.ListItem(f, null, this.layoutsArray[g].id));
          }
        } catch (k) {
          console.log("Error Updating Layout List"), console.log(k);
        }
      }, prepareLayout:function(d) {
        try {
          console.log("Preparing Layout for Saving");
          saved_units = [];
          for (var b = 0; b < d.length; b++) {
            var e = d[b], g = {};
            g.x = e.get_CoordX();
            g.y = e.get_CoordY();
            g.id = e.get_Id();
            g.enabled = e.get_Enabled();
            saved_units.push(g);
          }
          return saved_units;
        } catch (f) {
          console.log("Error Preparing Unit Layout"), console.log(f);
        }
      }, clearAllLayouts:function() {
        try {
          console.log("Clearing All Layouts"), confirm("Clicking OK will delete all of your saved layouts from every base!") ? (localStorage.removeItem("savedFormations"), this.layoutsArray = [], alert("All saved layouts have been deleted."), this.updateLayoutList()) : alert("No layouts were deleted.");
        } catch (d) {
          console.log("Error Clearing All Layouts"), console.log(d);
        }
      }}});
    }
    function E(d, b) {
      setTimeout(function() {
        try {
          if (console.log("View Changed"), Simulator.OptionWindow.getInstance().close(), Simulator.LayoutWindow.getInstance().close(), b != ClientLib.Vis.Mode.CombatSetup && b != ClientLib.Vis.Mode.Battleground ? (Simulator.StatWindow.getInstance().close(), Simulator.getInstance().armyTempFormations = [], Simulator.getInstance().armyTempIdx = 0, Simulator.getInstance().armyUndoBtn.setEnabled(!1), Simulator.getInstance().isSimulation = !1) : b == ClientLib.Vis.Mode.CombatSetup && (void 0 !== localStorage.autoOpenStat ? 
          "yes" == localStorage.autoOpenStat ? Simulator.StatWindow.getInstance().open() : Simulator.StatWindow.getInstance().close() : (Simulator.StatWindow.getInstance().open(), localStorage.autoOpenStat = "yes"), localStorage.allUnitsDisabled = "no", !1 == Simulator.getInstance().isSimulation ? setTimeout(function() {
            Simulator.StatWindow.getInstance().calcResources();
          }, 2E3) : Simulator.getInstance().isSimulation = !1, d != ClientLib.Vis.Mode.Battleground && Simulator.getInstance().saveTempFormation()), null != ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity()) {
            var e = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Name(), g = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Name();
            b == ClientLib.Vis.Mode.Battleground || e == g ? (Simulator.getInstance().simBtn.hide(), Simulator.getInstance().shiftUpBtn.hide(), Simulator.getInstance().shiftDownBtn.hide(), Simulator.getInstance().shiftLeftBtn.hide(), Simulator.getInstance().shiftRightBtn.hide(), Simulator.getInstance().disableAllUnitsBtn.hide(), Simulator.getInstance().mirrorBtnH.hide(), Simulator.getInstance().mirrorBtnV.hide(), Simulator.getInstance().mirrorBtnC.hide(), Simulator.getInstance().mirrorBtnK.hide(), 
            Simulator.getInstance().mirrorBtnU.hide(), Simulator.getInstance().layoutBtn.hide(), Simulator.getInstance().optionBtn.hide(), Simulator.getInstance().statBtn.hide(), Simulator.getInstance().quickSaveBtn.hide(), Simulator.getInstance().armyUndoBtn.hide(), Simulator.getInstance().ainfBtn.hide(), Simulator.getInstance().avehBtn.hide(), Simulator.getInstance().aairBtn.hide()) : e != g && (Simulator.getInstance().simBtn.show(), Simulator.getInstance().shiftUpBtn.show(), Simulator.getInstance().shiftDownBtn.show(), 
            Simulator.getInstance().shiftLeftBtn.show(), Simulator.getInstance().shiftRightBtn.show(), Simulator.getInstance().mirrorBtnH.show(), Simulator.getInstance().mirrorBtnV.show(), Simulator.getInstance().mirrorBtnC.show(), Simulator.getInstance().mirrorBtnK.show(), Simulator.getInstance().mirrorBtnU.show(), Simulator.getInstance().armyUndoBtn.show(), Simulator.getInstance().layoutBtn.show(), Simulator.getInstance().optionBtn.show(), Simulator.getInstance().statBtn.show(), Simulator.getInstance().quickSaveBtn.show(), 
            Simulator.getInstance().disableAllUnitsBtn.show(), Simulator.getInstance().ainfBtn.show(), Simulator.getInstance().avehBtn.show(), Simulator.getInstance().aairBtn.show());
          }
        } catch (f) {
          console.log("Error closing windows or hiding buttons on view change"), console.log(f.toString());
        }
      }, 500);
    }
    function y() {
      try {
        if ("undefined" !== typeof qx && "undefined" !== typeof qx.core && "undefined" !== typeof qx.core.Init && "undefined" !== typeof ClientLib && "undefined" !== typeof phe) {
          if (!0 == qx.core.Init.getApplication().initDone) {
            try {
              console.log("CENTER DRIVEN - Tiberium Alliances Combat Simulator: Loading");
              t();
              if (392583 <= PerforceChangelist) {
                var d = "" + ClientLib.Data.Cities.prototype.get_CurrentCity, b;
                for (b in ClientLib.Data.Cities.prototype) {
                  if (ClientLib.Data.Cities.prototype.hasOwnProperty(b) && "function" == typeof ClientLib.Data.Cities.prototype[b] && -1 < ("" + ClientLib.Data.Cities.prototype[b]).indexOf(d) && 6 == b.length) {
                    d = b;
                    break;
                  }
                }
                var e = "" + ClientLib.Data.Cities.prototype.get_CurrentOwnCity, g;
                for (g in ClientLib.Data.Cities.prototype) {
                  if (ClientLib.Data.Cities.prototype.hasOwnProperty(g) && "function" == typeof ClientLib.Data.Cities.prototype[g] && -1 < ("" + ClientLib.Data.Cities.prototype[g]).indexOf(e) && 6 == g.length) {
                    e = g;
                    break;
                  }
                }
                var f = "" + ClientLib.API.Util.GetUnitRepairCosts, f = f.replace(d, e), h = f.substring(f.indexOf("{") + 1, f.lastIndexOf("}")), l = Function("a,b,c", h);
                ClientLib.API.Util.GetUnitRepairCosts = l;
              }
              Simulator.getInstance();
              Simulator.StatWindow.getInstance();
              Simulator.OptionWindow.getInstance();
              Simulator.LayoutWindow.getInstance();
              phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, E);
              console.log("CENTER DRIVEN - Tiberium Alliances Combat Simulator: Loaded");
            } catch (k) {
              console.log("CENTER DRIVEN - Tiberium Alliances Combat Simulator initialization error:"), console.log(k);
            }
          } else {
            window.setTimeout(y, 1E3);
          }
        } else {
          window.setTimeout(y, 1E3);
        }
      } catch (m) {
        console.log(m);
      }
    }
    window.setTimeout(y, 1E3);
  }.toString() + ")();";
  t.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(t);
})();
