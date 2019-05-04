// ==UserScript==
// @name           TACS (Tiberium Alliances Combat Simulator)
// @description    Allows you to simulate combat before actually attacking.
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        3.01b
// @author         WildKatana | Updated by CodeEcho, PythEch, Matthias Fuchs, Enceladus, KRS_L, TheLuminary, Panavia2, Da Xue, MrHIDEn, TheStriker, JDuarteDJ, null
// @translator     TR: PythEch | DE: Matthias Fuchs & Leafy | PT: JDuarteDJ & Contosbarbudos | IT: Hellcco | NL: SkeeterPan | HU: Mancika | FR: Pyroa & NgXAlex | FI: jipx
// @grant none
// ==/UserScript==
(function () {
  var t = document.createElement('script');
  t.innerHTML = '(' + function () {
    function d(b) {
      try {
        if ( - 1 < C.indexOf(v)) {
          var a = G[b][C.indexOf(v)];
          return '' !== a ? a : b
        }
        return b
      } catch (c) {
        return console.log(c),
        b
      }
    }
    function t() {
      qx.Class.define('TACS', {
        type: 'singleton',
        extend: qx.core.Object,
        members: {
          saveObj: {
            section: {
              option: 'foo'
            },
            bounds: {
              battleResultsBoxLeft: 125,
              battleResultsBoxTop: 125
            },
            checkbox: {
              showStatsDuringAttack: !0,
              showStatsDuringSimulation: !0,
              skipVictoryPopup: !1,
              disableArmyFormationManagerTooltips: !1,
              disableAttackPreparationTooltips: !1
            },
            audio: {
              playRepairSound: !0
            },
            slider: {
              statsOpacity: 100
            }
          },
          buttons: {
            attack: {
              layout: {
                save: null,
                load: null
              },
              simulate: null,
              unlock: null,
              repair: null,
              unlockReset: null,
              tools: null,
              formationReset: null,
              flipVertical: null,
              flipHorizontal: null,
              activateInfantry: null,
              activateVehicles: null,
              activateAir: null,
              activateAll: null,
              repairMode: null,
              toolbarRefreshStats: null,
              toolbarShowStats: null,
              toolbarUndo: null,
              toolbarRedo: null,
              options: null
            },
            simulate: {
              back: null,
              skip: null
            },
            shiftFormationUp: null,
            shiftFormationDown: null,
            shiftFormationLeft: null,
            shiftFormationRight: null,
            optionStats: null
          },
          stats: {
            spoils: {
              tiberium: null,
              crystal: null,
              credit: null,
              research: null
            },
            health: {
              infantry: null,
              vehicle: null,
              aircraft: null,
              overall: null
            },
            repair: {
              infantry: null,
              vehicle: null,
              aircraft: null,
              overall: null,
              available: null,
              max: null
            },
            attacks: {
              availableCP: null,
              attackCost: null,
              availableAttacksCP: null,
              availableAttacksAtFullStrength: null,
              availableAttacksWithCurrentRepairCharges: null
            },
            damage: {
              units: {
                overall: null
              },
              structures: {
                construction: null,
                defense: null,
                command: null,
                support: null,
                overall: null
              },
              overall: null
            },
            time: null,
            supportLevel: null
          },
          labels: {
            health: {
              infantry: null,
              vehicle: null,
              aircraft: null,
              overall: null
            },
            repair: {
              available: null
            },
            repairinfos: {
              infantry: null,
              vehicle: null,
              aircraft: null,
              available: null
            },
            attacks: {
              available: null
            },
            damage: {
              units: {
                overall: null
              },
              structures: {
                construction: null,
                defense: null,
                command: null,
                support: null,
                overall: null
              },
              overall: null,
              outcome: null
            },
            time: null,
            supportLevel: null,
            countDown: null
          },
          view: {
            playerCity: null,
            playerCityDefenseBonus: null,
            ownCity: null,
            ownCityId: null,
            targetCityId: null,
            lastUnits: null,
            lastUnitList: null
          },
          layouts: {
            label: null,
            list: null,
            all: null,
            current: null,
            restore: null
          },
          options: {
            autoDisplayStats: null,
            showShift: null,
            sideLabel: null,
            locksLabel: null,
            leftSide: null,
            rightSide: null,
            attackLock: null,
            repairLock: null,
            markSavedTargets: null,
            dblClick2DeActivate: null,
            showStatsDuringAttack: null,
            showStatsDuringSimulation: null,
            skipVictoryPopup: null,
            statsOpacityLabel: null,
            statsOpacity: null,
            statsOpacityOutput: null,
            disableArmyFormationManagerTooltips: null,
            disableAttackPreparationTooltips: null
          },
          audio: {
            soundRepairImpact: null,
            soundRepairReload: null
          },
          _Application: null,
          _MainData: null,
          _Cities: null,
          _VisMain: null,
          _ActiveView: null,
          _PlayArea: null,
          _armyBarContainer: null,
          _armyBar: null,
          attacker_modules: null,
          defender_modules: null,
          battleResultsBox: null,
          optionsWindow: null,
          statsPage: null,
          lastSimulation: null,
          count: null,
          counter: null,
          statsOnly: null,
          simulationWarning: null,
          warningIcon: null,
          userInterface: null,
          infantryActivated: null,
          vehiclesActivated: null,
          airActivated: null,
          allActivated: null,
          toolBar: null,
          TOOL_BAR_LOW: 113,
          TOOL_BAR_HIGH: 155,
          TOOL_BAR_WIDTH: 740,
          repairInfo: null,
          repairButtons: [
          ],
          repairButtonsRedrawTimer: null,
          armybarClickCount: null,
          armybarClearnClickCounter: null,
          repairModeTimer: null,
          curPAVM: null,
          curViewMode: null,
          DEFAULTS: null,
          undoCache: [
          ],
          ts1: null,
          ts2: null,
          attackUnitsLoaded: null,
          loadData: function () {
            var b = localStorage.getItem('TACS');
            if (null != b) {
              var b = JSON.parse(b),
              a;
              for (a in this.saveObj) if ('object' == typeof b[a]) for (var c in this.saveObj[a]) 'object' != typeof b[a][c] && 'undefined' == typeof b[a][c] && (console.log('Creating missing save option: ' +
              a + '.' + c), b[a][c] = this.saveObj[a][c]);
               else 'undefined' == typeof b[a] && (console.log('Creating missing option section: ' + a), b[a] = this.saveObj[a]);
              this.saveObj = b;
              this.saveData()
            }
          },
          saveData: function () {
            var b = this.saveObj || window.TACS.getInstance().saveObj,
            b = JSON.stringify(b);
            localStorage.setItem('TACS', b)
          },
          initialize: function () {
            try {
              this.loadData();
              v = qx.locale.Manager.getInstance().getLocale();
              this.targetCityId = '0';
              this._Application = qx.core.Init.getApplication();
              this._MainData = ClientLib.Data.MainData.GetInstance();
              this._VisMain = ClientLib.Vis.VisMain.GetInstance();
              this._ActiveView = this._VisMain.GetActiveView();
              this._PlayArea = this._Application.getPlayArea();
              this._armyBarContainer = this._Application.getArmySetupAttackBar();
              this._armyBar = this._Application.getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
              phe.cnc.Util.attachNetEvent(ClientLib.API.Battleground.GetInstance(), 'OnSimulateBattleFinished', ClientLib.API.OnSimulateBattleFinished, this, this.onSimulateBattleFinishedEvent);
              phe.cnc.Util.attachNetEvent(this._VisMain, 'ViewModeChange', ClientLib.Vis.ViewModeChange, this, this.viewChangeHandler);
              phe.cnc.Util.attachNetEvent(this._MainData.get_Cities(), 'CurrentOwnChange', ClientLib.Data.CurrentOwnCityChange, this, this.ownCityChangeHandler);
              this.buttons.simulate.back = new qx.ui.form.Button(d('Setup'));
              this.buttons.simulate.back.set({
                width: 80,
                appearance: 'button-text-small',
                toolTipText: d('Return to Combat Setup')
              });
              this.buttons.simulate.back.addListener('click', this.returnSetup, this);
              this.buttons.simulate.skip = new qx.ui.form.Button(d('SKIP'));
              this.buttons.simulate.skip.set({
                width: 50,
                height: 21,
                appearance: 'button-text-small',
                toolTipText: d('Skip to end')
              });
              this.buttons.simulate.skip.addListener('click', this.skipSimulation, this);
              var b = this._Application.getReportReplayOverlay();
              b.add(this.buttons.simulate.back, {
                top: 12,
                left: 150
              });
              'undefined' != typeof CCTAWrapper_IsInstalled && CCTAWrapper_IsInstalled && b.add(this.buttons.simulate.skip, {
                top: 38,
                left: 460
              });
              this.buttons.attack.unlock = new qx.ui.form.Button(d('Unlock'));
              this.buttons.attack.unlock.set({
                width: 45,
                height: 45,
                padding: 0,
                appearance: 'button-text-small',
                toolTipText: d('Unlock Attack Button')
              });
              this.buttons.attack.unlock.addListener('click', this.unlockAttacks, this);
              this.buttons.attack.unlock.setOpacity(0.5);
              var a = localStorage.ta_sim_attackLock;
              (a = a ? JSON.parse(localStorage.ta_sim_attackLock)  : !0) && this._armyBar.add(this.buttons.attack.unlock, {
                top: 108,
                right: 9
              });
              this.buttons.attack.repair = new qx.ui.form.Button(d('Unlock'));
              this.buttons.attack.repair.set({
                width: 45,
                height: 45,
                padding: 0,
                appearance: 'button-text-small',
                toolTipText: d('Unlock Repair Button')
              });
              this.buttons.attack.repair.addListener('click', this.unlockRepairs, this);
              this.buttons.attack.repair.setOpacity(0.5);
              (a = (a = localStorage.ta_sim_repairLock) ? JSON.parse(localStorage.ta_sim_repairLock)  : !0) && this._armyBar.add(this.buttons.attack.repair, {
                top: 16,
                right: 9
              });
              var c = ClientLib.Data.CityPreArmyUnit.prototype;
              c.set_Enabled_Original || (c.set_Enabled_Original = c.set_Enabled);
              c.set_Enabled = function (a) {
                this.set_Enabled_Original(a);
                window.TACS.getInstance().formationChangeHandler()
              };
              c.MoveBattleUnit_Original || (c.MoveBattleUnit_Original = c.MoveBattleUnit);
              c.MoveBattleUnit = function (a, b) {
                var c = window.TACS.getInstance();
                if (c.options.dblClick2DeActivate.getValue() && 2 <= c.armybarClickCount && this.get_CoordX() === a && this.get_CoordY() === b) {
                  var e = this.get_Enabled();
                  this.set_Enabled_Original(e ^ 1)
                }
                this.MoveBattleUnit_Original(a, b);
                c.formationChangeHandler();
                c.armybarClickCount = 0;
                clearInterval(c.armybarClearnClickCounter)
              };
              this.loadLayouts();
              this.optionsWindow = (new qx.ui.window.Window(d('Options'), 'FactionUI/icons/icon_forum_properties.png')).set({
                contentPaddingTop: 1,
                contentPaddingBottom: 8,
                contentPaddingRight: 8,
                contentPaddingLeft: 8,
                width: 400,
                height: 400,
                showMaximize: !1,
                showMinimize: !1,
                allowMaximize: !1,
                allowMinimize: !1,
                resizable: !1
              });
              this.optionsWindow.getChildControl('icon').set({
                scale: !0,
                width: 25,
                height: 25
              });
              this.optionsWindow.setLayout(new qx.ui.layout.VBox);
              var e = localStorage.ta_sim_options_top;
              if (e) {
                var e = JSON.parse(localStorage.ta_sim_options_top),
                l = JSON.parse(localStorage.ta_sim_options_left);
                this.optionsWindow.moveTo(l, e)
              } else this.optionsWindow.center();
              this.optionsWindow.addListener('close', function () {
                localStorage.ta_sim_options_top = JSON.stringify(this.optionsWindow.getLayoutProperties().top);
                localStorage.ta_sim_options_left = JSON.stringify(this.optionsWindow.getLayoutProperties().left);
                this.saveData()
              }, this);
              this.battleResultsBox = (new qx.ui.window.Window('TACS', 'FactionUI/icons/icon_res_plinfo_command_points.png')).set({
                contentPaddingTop: 0,
                contentPaddingBottom: 2,
                contentPaddingRight: 2,
                contentPaddingLeft: 6,
                showMaximize: !1,
                showMinimize: !1,
                allowMaximize: !1,
                allowMinimize: !1,
                resizable: !1
              });
              this.battleResultsBox.getChildControl('icon').set({
                scale: !0,
                width: 20,
                height: 20,
                alignY: 'middle'
              });
              this.battleResultsBox.setLayout(new qx.ui.layout.HBox);
              this.battleResultsBox.moveTo(this.saveObj.bounds.battleResultsBoxLeft, this.saveObj.bounds.battleResultsBoxTop);
              this.battleResultsBox.addListener('move', function () {
                this.saveObj.bounds.battleResultsBoxLeft = this.battleResultsBox.getBounds().left;
                this.saveObj.bounds.battleResultsBoxTop =
                this.battleResultsBox.getBounds().top;
                this.saveData()
              }, this);
              this.battleResultsBox.addListener('appear', function () {
                this.battleResultsBox.setOpacity(this.saveObj.slider.statsOpacity / 100)
              }, this);
              var f = (new qx.ui.tabview.TabView).set({
                contentPaddingTop: 3,
                contentPaddingBottom: 6,
                contentPaddingRight: 7,
                contentPaddingLeft: 3
              });
              this.battleResultsBox.add(f);
              this.initializeStats(f);
              this.initializeLayout(f);
              this.initializeInfo(f);
              this.initializeOptions();
              this.setupInterface();
              this.createBasePlateFunction(ClientLib.Vis.Region.RegionNPCCamp);
              this.createBasePlateFunction(ClientLib.Vis.Region.RegionNPCBase);
              this.createBasePlateFunction(ClientLib.Vis.Region.RegionCity);
              this.gameOverlaysToFront()
            } catch (g) {
              console.log(g)
            }
          },
          initializeStats: function (b) {
            try {
              this.statsPage = new qx.ui.tabview.Page(d('Stats'));
              this.statsPage.setLayout(new qx.ui.layout.VBox(1));
              b.add(this.statsPage);
              var a = new qx.ui.container.Composite,
              c = new qx.ui.layout.Grid;
              c.setColumnAlign(0, 'left', 'middle');
              c.setColumnAlign(1, 'right', 'middle');
              c.setColumnFlex(0, 1);
              c.setRowHeight(0, 15);
              a.setLayout(c);
              a.setThemedFont('bold');
              a.setThemedBackgroundColor('#eef');
              this.statsPage.add(a);
              this.labels.countDown = new qx.ui.basic.Label('');
              this.labels.countDown.set({
                width: 0,
                height: 10,
                marginLeft: 5,
                backgroundColor: '#B40404'
              });
              a.add(this.labels.countDown, {
                row: 0,
                column: 0
              });
              a = new qx.ui.container.Composite;
              c = new qx.ui.layout.Grid;
              c.setColumnAlign(1, 'right', 'middle');
              c.setColumnFlex(0, 1);
              a.setLayout(c);
              a.setThemedFont('bold');
              a.setThemedBackgroundColor('#eef');
              this.statsPage.add(a);
              a.add(new qx.ui.basic.Label(d('Enemy Base:')), {
                row: 0,
                column: 0
              });
              this.labels.damage.overall = new qx.ui.basic.Label('100');
              a.add(this.labels.damage.overall, {
                row: 0,
                column: 1
              });
              a.add(new qx.ui.basic.Label(d('Defences:')), {
                row: 1,
                column: 0
              });
              this.labels.damage.units.overall = new qx.ui.basic.Label('100');
              a.add(this.labels.damage.units.overall, {
                row: 1,
                column: 1
              });
              a.add(new qx.ui.basic.Label(d('Buildings:')), {
                row: 2,
                column: 0
              });
              this.labels.damage.structures.overall = new qx.ui.basic.Label('100');
              a.add(this.labels.damage.structures.overall, {
                row: 2,
                column: 1
              });
              a.add(new qx.ui.basic.Label(d('Construction Yard:')), {
                row: 3,
                column: 0
              });
              this.labels.damage.structures.construction = new qx.ui.basic.Label('100');
              a.add(this.labels.damage.structures.construction, {
                row: 3,
                column: 1
              });
              a.add(new qx.ui.basic.Label(d('Defense Facility:')), {
                row: 4,
                column: 0
              });
              this.labels.damage.structures.defense = new qx.ui.basic.Label('100');
              a.add(this.labels.damage.structures.defense, {
                row: 4,
                column: 1
              });
              a.add(new qx.ui.basic.Label(d('Command Center:')), {
                row: 5,
                column: 0
              });
              this.labels.damage.structures.command = new qx.ui.basic.Label('100');
              a.add(this.labels.damage.structures.command, {
                row: 5,
                column: 1
              });
              this.labels.supportLevel = new qx.ui.basic.Label('');
              a.add(this.labels.supportLevel, {
                row: 6,
                column: 0
              });
              this.labels.damage.structures.support = new qx.ui.basic.Label('');
              a.add(this.labels.damage.structures.support, {
                row: 6,
                column: 1
              });
              a = new qx.ui.container.Composite;
              c = new qx.ui.layout.Grid;
              c.setColumnAlign(1, 'right', 'middle');
              c.setColumnFlex(0, 1);
              a.setLayout(c);
              a.setThemedFont('bold');
              a.setThemedBackgroundColor('#eef');
              this.statsPage.add(a);
              a.add(new qx.ui.basic.Label(d('Overall:')), {
                row: 0,
                column: 0
              });
              this.labels.health.overall = new qx.ui.basic.Label('100');
              a.add(this.labels.health.overall, {
                row: 0,
                column: 1
              });
              a.add(new qx.ui.basic.Label(d('Infantry:')), {
                row: 1,
                column: 0
              });
              this.labels.health.infantry = new qx.ui.basic.Label('100');
              a.add(this.labels.health.infantry, {
                row: 1,
                column: 1
              });
              a.add(new qx.ui.basic.Label(d('Vehicle:')), {
                row: 2,
                column: 0
              });
              this.labels.health.vehicle = new qx.ui.basic.Label('100');
              a.add(this.labels.health.vehicle, {
                row: 2,
                column: 1
              });
              a.add(new qx.ui.basic.Label(d('Aircraft:')), {
                row: 3,
                column: 0
              });
              this.labels.health.aircraft = new qx.ui.basic.Label('100');
              a.add(this.labels.health.aircraft, {
                row: 3,
                column: 1
              });
              a = new qx.ui.container.Composite;
              c = new qx.ui.layout.Grid;
              c.setColumnAlign(1, 'right', 'middle');
              c.setColumnFlex(0, 1);
              a.setLayout(c);
              a.setThemedFont('bold');
              a.setThemedBackgroundColor('#eef');
              this.statsPage.add(a);
              a.add(new qx.ui.basic.Label(d('Outcome:')), {
                row: 0,
                column: 0
              });
              this.labels.damage.outcome = new qx.ui.basic.Label(d('Unknown'));
              a.add(this.labels.damage.outcome, {
                row: 0,
                column: 1
              });
              a.add(new qx.ui.basic.Label(d('Battle Time:')), {
                row: 1,
                column: 0
              });
              this.labels.time = new qx.ui.basic.Label('120');
              a.add(this.labels.time, {
                row: 1,
                column: 1
              });
              a = new qx.ui.container.Composite;
              c = new qx.ui.layout.Grid;
              c.setColumnAlign(1, 'right', 'middle');
              c.setColumnFlex(0, 1);
              a.setLayout(c);
              a.setThemedFont('bold');
              a.setThemedBackgroundColor('#eef');
              this.statsPage.add(a);
              a.add(new qx.ui.basic.Label(d('Available Repair:')), {
                row: 0,
                column: 0
              });
              this.labels.repair.available = new qx.ui.basic.Label('00:00:00');
              a.add(this.labels.repair.available, {
                row: 0,
                column: 1
              });
              a.add(new qx.ui.basic.Label(d('Available Attacks:')), {
                row: 1,
                column: 0
              });
              this.labels.attacks.available = new qx.ui.basic.Label('CP:- / FR:- / CFR:-');
              a.add(this.labels.attacks.available, {
                row: 1,
                column: 1
              })
            } catch (e) {
              console.log(e)
            }
          },
          initializeLayout: function (b) {
            try {
              var a = new qx.ui.tabview.Page(d('Layouts'));
              a.setLayout(new qx.ui.layout.VBox);
              b.add(a);
              this.layouts.list = new qx.ui.form.List;
              this.layouts.list.set({
                height: 174,
                selectionMode: 'one'
              });
              a.add(this.layouts.list);
              var c = new qx.ui.container.Composite;
              c.setLayout(new qx.ui.layout.HBox(5));
              this.buttons.attack.layout.load = new qx.ui.form.Button(d('Load'));
              this.buttons.attack.layout.load.set({
                width: 80,
                appearance: 'button-text-small',
                toolTipText: d('Load this saved layout.')
              });
              this.buttons.attack.layout.load.addListener('click', this.loadCityLayout, this);
              c.add(this.buttons.attack.layout.load);
              this.buttonLayoutDelete = new qx.ui.form.Button(d('Delete'));
              this.buttonLayoutDelete.set({
                width: 80,
                appearance: 'button-text-small',
                toolTipText: d('Delete this saved layout.')
              });
              this.buttonLayoutDelete.addListener('click', this.deleteCityLayout, this);
              c.add(this.buttonLayoutDelete);
              a.add(c);
              var e = new qx.ui.container.Composite;
              e.setLayout(new qx.ui.layout.VBox(1));
              e.setThemedFont('bold');
              e.setThemedPadding(2);
              e.setThemedBackgroundColor('#eef');
              var l = new qx.ui.container.Composite;
              l.setLayout(new qx.ui.layout.HBox(5));
              l.add(new qx.ui.basic.Label(d('Name: ')));
              this.layouts.label = new qx.ui.form.TextField;
              this.layouts.label.setValue('');
              l.add(this.layouts.label);
              e.add(l);
              this.buttons.attack.layout.save = new qx.ui.form.Button(d('Save'));
              this.buttons.attack.layout.save.set({
                width: 80,
                appearance: 'button-text-small',
                toolTipText: d('Save this layout.')
              });
              this.buttons.attack.layout.save.addListener('click', this.saveCityLayout, this);
              e.add(this.buttons.attack.layout.save);
              a.add(e)
            } catch (f) {
              console.log(f)
            }
          },
          initializeInfo: function (b) {
            try {
              var a = new qx.ui.tabview.Page(d('Info'));
              a.setLayout(new qx.ui.layout.VBox(1));
              b.add(a);
              var c = new qx.ui.container.Composite;
              c.setLayout(new qx.ui.layout.VBox(1));
              c.setThemedFont('bold');
              c.setThemedPadding(2);
              c.setThemedBackgroundColor('#eef');
              a.add(c);
              var e = (new qx.ui.basic.Label).set({
                value: '<a target=\'_blank\' href=\'http://userscripts.org/scripts/discuss/138212\'>' + d('Forums') + '</a>',
                rich: !0
              });
              c.add(e);
              var l = new qx.ui.container.Composite;
              l.setLayout(new qx.ui.layout.VBox(1));
              l.setThemedFont('bold');
              l.setThemedPadding(2);
              l.setThemedBackgroundColor('#eef');
              a.add(l);
              l.add(new qx.ui.basic.Label(d('Spoils')));
              this.stats.spoils.tiberium =
              new qx.ui.basic.Atom('0', 'webfrontend/ui/common/icn_res_tiberium.png');
              l.add(this.stats.spoils.tiberium);
              this.stats.spoils.crystal = new qx.ui.basic.Atom('0', 'webfrontend/ui/common/icn_res_chrystal.png');
              l.add(this.stats.spoils.crystal);
              this.stats.spoils.credit = new qx.ui.basic.Atom('0', 'webfrontend/ui/common/icn_res_dollar.png');
              l.add(this.stats.spoils.credit);
              this.stats.spoils.research = new qx.ui.basic.Atom('0', 'webfrontend/ui/common/icn_res_research_mission.png');
              l.add(this.stats.spoils.research);
              var f = new qx.ui.container.Composite,
              g = new qx.ui.layout.Grid;
              f.setLayout(g);
              f.setThemedFont('bold');
              f.setThemedBackgroundColor('#eef');
              a.add(f);
              this.buttons.optionStats = (new qx.ui.form.Button).set({
                height: 25,
                width: 160,
                margin: 15,
                alignX: 'center',
                label: d('Options'),
                appearance: 'button-text-small',
                icon: 'FactionUI/icons/icon_forum_properties.png',
                toolTipText: d('TACS Options')
              });
              this.buttons.optionStats.addListener('click', this.toggleOptionsWindow, this);
              f.add(this.buttons.optionStats, {
                row: 0,
                column: 0
              });
              this.battleResultsBox.add(b)
            } catch (k) {
              console.log(k)
            }
          },
          initializeOptions: function () {
            try {
              var b = new qx.ui.container.Composite;
              b.setLayout(new qx.ui.layout.VBox(1));
              b.setThemedPadding(10);
              b.setThemedBackgroundColor('#eef');
              this.optionsWindow.add(b);
              var a = new qx.ui.container.Composite,
              c = new qx.ui.layout.Grid(5, 5);
              c.setColumnFlex(2, 1);
              a.setLayout(c);
              a.setThemedFont('bold');
              a.setThemedBackgroundColor('#eef');
              b.add(a);
              a.add(new qx.ui.basic.Label(d('Version: ') + '3.01b'), {
                row: 0,
                column: 0,
                colSpan: 3
              });
              this.options.autoDisplayStats = new qx.ui.form.CheckBox(d('Auto display stats'));
              var e = localStorage.ta_sim_popup;
              e ? (e = JSON.parse(localStorage.ta_sim_popup), this.options.autoDisplayStats.setValue(e))  : this.options.autoDisplayStats.setValue(!0);
              this.options.autoDisplayStats.addListener('click', this.optionPopup, this);
              a.add(this.options.autoDisplayStats, {
                row: 1,
                column: 0,
                colSpan: 3
              });
              this.options.markSavedTargets = new qx.ui.form.CheckBox(d('Mark saved targets on region map'));
              (e = localStorage.ta_sim_marksavedtargets) ? (e = JSON.parse(localStorage.ta_sim_marksavedtargets), this.options.markSavedTargets.setValue(e))  :
              this.options.markSavedTargets.setValue(!0);
              this.options.markSavedTargets.addListener('click', function () {
                localStorage.ta_sim_marksavedtargets = JSON.stringify(this.options.markSavedTargets.getValue())
              }, this);
              a.add(this.options.markSavedTargets, {
                row: 2,
                column: 0,
                colSpan: 3
              });
              this.options.dblClick2DeActivate = new qx.ui.form.CheckBox(d('Enable \'Double-click to (De)activate units\''));
              (e = localStorage.ta_sim_dblClick2DeActivate) ? (e = JSON.parse(localStorage.ta_sim_dblClick2DeActivate), this.options.dblClick2DeActivate.setValue(e))  :
              this.options.dblClick2DeActivate.setValue(!0);
              this.options.dblClick2DeActivate.addListener('click', function () {
                localStorage.ta_sim_dblClick2DeActivate = JSON.stringify(this.options.dblClick2DeActivate.getValue())
              }, this);
              a.add(this.options.dblClick2DeActivate, {
                row: 3,
                column: 0,
                colSpan: 3
              });
              this.options.showShift = new qx.ui.form.CheckBox(d('Show shift buttons'));
              (e = localStorage.ta_sim_showShift) ? (e = JSON.parse(localStorage.ta_sim_showShift), this.options.showShift.setValue(e))  : this.options.showShift.setValue(!0);
              this.options.showShift.addListener('click', this.optionShowShift, this);
              a.add(this.options.showShift, {
                row: 4,
                column: 0,
                colSpan: 3
              });
              this.options.sideLabel = new qx.ui.basic.Label(d('Side:'));
              this.options.leftSide = new qx.ui.form.RadioButton(d('Left'));
              this.options.rightSide = new qx.ui.form.RadioButton(d('Right'));
              var l = new qx.ui.form.RadioGroup;
              l.add(this.options.leftSide, this.options.rightSide);
              (e = localStorage.ta_sim_side) ? (e = JSON.parse(localStorage.ta_sim_side), this.options.leftSide.setValue(e))  : this.options.leftSide.setValue(!0);
              l.addListener('changeSelection', this.setupInterface, this);
              a.add(this.options.sideLabel, {
                row: 5,
                column: 0
              });
              a.add(this.options.leftSide, {
                row: 5,
                column: 1
              });
              a.add(this.options.rightSide, {
                row: 5,
                column: 2
              });
              this.options.locksLabel = new qx.ui.basic.Label(d('Locks:'));
              this.options.attackLock = new qx.ui.form.CheckBox(d('Attack'));
              (e = localStorage.ta_sim_attackLock) ? (e = JSON.parse(localStorage.ta_sim_attackLock), this.options.attackLock.setValue(e))  : this.options.attackLock.setValue(!0);
              this.options.repairLock = new qx.ui.form.CheckBox(d('Repair'));
              (e = localStorage.ta_sim_repairLock) ? (e = JSON.parse(localStorage.ta_sim_repairLock), this.options.repairLock.setValue(e))  : this.options.repairLock.setValue(!0);
              this.options.attackLock.addListener('click', this.optionAttackLock, this);
              this.options.repairLock.addListener('click', this.optionRepairLock, this);
              a.add(this.options.locksLabel, {
                row: 6,
                column: 0
              });
              a.add(this.options.attackLock, {
                row: 6,
                column: 1
              });
              a.add(this.options.repairLock, {
                row: 6,
                column: 2
              });
              this.options.showStatsDuringAttack = new qx.ui.form.CheckBox(d('Show Stats During Attack'));
              this.options.showStatsDuringAttack.saveLocation = 'showStatsDuringAttack';
              this.options.showStatsDuringAttack.setValue(this.saveObj.checkbox.showStatsDuringAttack);
              this.options.showStatsDuringAttack.addListener('click', this.toggleCheckboxOption, this);
              a.add(this.options.showStatsDuringAttack, {
                row: 7,
                column: 0,
                colSpan: 3
              });
              this.options.showStatsDuringSimulation = new qx.ui.form.CheckBox(d('Show Stats During Simulation'));
              this.options.showStatsDuringSimulation.saveLocation = 'showStatsDuringSimulation';
              this.options.showStatsDuringSimulation.setValue(this.saveObj.checkbox.showStatsDuringSimulation);
              this.options.showStatsDuringSimulation.addListener('click', this.toggleCheckboxOption, this);
              a.add(this.options.showStatsDuringSimulation, {
                row: 8,
                column: 0,
                colSpan: 3
              });
              this.options.skipVictoryPopup = new qx.ui.form.CheckBox(d('Skip Victory-Popup After Battle'));
              this.options.skipVictoryPopup.saveLocation = 'skipVictoryPopup';
              this.options.skipVictoryPopup.setValue(this.saveObj.checkbox.skipVictoryPopup);
              this.options.skipVictoryPopup.addListener('click', this.toggleCheckboxOption, this);
              a.add(this.options.skipVictoryPopup, {
                row: 9,
                column: 0,
                colSpan: 3
              });
              webfrontend.gui.reports.CombatVictoryPopup.getInstance().addListener('appear', function () {
                this.saveObj.checkbox.skipVictoryPopup && webfrontend.gui.reports.CombatVictoryPopup.getInstance()._onBtnClose()
              }, this);
              this.options.disableAttackPreparationTooltips = new qx.ui.form.CheckBox(d('Disable Tooltips In Attack Preparation View'));
              this.options.disableAttackPreparationTooltips.saveLocation = 'disableAttackPreparationTooltips';
              this.options.disableAttackPreparationTooltips.setValue(this.saveObj.checkbox.disableAttackPreparationTooltips);
              this.options.disableAttackPreparationTooltips.addListener('click', this.toggleCheckboxOption, this);
              a.add(this.options.disableAttackPreparationTooltips, {
                row: 10,
                column: 0,
                colSpan: 3
              });
              this.options.disableArmyFormationManagerTooltips = new qx.ui.form.CheckBox(d('Disable Unit Tooltips In Army Formation Manager'));
              this.options.disableArmyFormationManagerTooltips.saveLocation = 'disableArmyFormationManagerTooltips';
              this.options.disableArmyFormationManagerTooltips.setValue(this.saveObj.checkbox.disableArmyFormationManagerTooltips);
              this.options.disableArmyFormationManagerTooltips.addListener('click', this.toggleCheckboxOption, this);
              a.add(this.options.disableArmyFormationManagerTooltips, {
                row: 11,
                column: 0,
                colSpan: 3
              });
              this.options.statsOpacityLabel = new qx.ui.basic.Label(d('Stats Window Opacity'));
              this.options.statsOpacityLabel.setMarginTop(10);
              a.add(this.options.statsOpacityLabel, {
                row: 12,
                column: 0,
                colSpan: 3
              });
              this.options.statsOpacity = new qx.ui.form.Slider;
              a.add(this.options.statsOpacity, {
                row: 13,
                column: 1,
                colSpan: 2
              });
              this.options.statsOpacity.setValue(this.saveObj.slider.statsOpacity);
              this.options.statsOpacityOutput = new qx.ui.basic.Label(String(this.saveObj.slider.statsOpacity));
              a.add(this.options.statsOpacityOutput, {
                row: 13,
                column: 0
              });
              this.options.statsOpacity.addListener('changeValue', function () {
                var a = this.options.statsOpacity.getValue();
                this.battleResultsBox.setOpacity(a / 100);
                this.options.statsOpacityOutput.setValue(String(a) + '%');
                this.saveObj.slider.statsOpacity = a
              }, this);
              var f = new qx.ui.container.Composite;
              f.setLayout(new qx.ui.layout.VBox(1));
              f.setThemedFont('bold');
              f.setThemedPadding(10);
              f.setThemedBackgroundColor('#eef');
              b.add(f);
              var g = (new qx.ui.basic.Label).set({
                value: '<a target=\'_blank\' href=\'http://userscripts.org/scripts/discuss/138212\'>' + d('Forums') + '</a>',
                rich: !0
              });
              f.add(g)
            } catch (k) {
              console.log(k)
            }
          },
          toggleCheckboxOption: function (b) {
            b = b.getTarget();
            var a = b.getValue();
            this.saveObj.checkbox[b.saveLocation] = a;
            this.saveData()
          },
          createBasePlateFunction: function (b) {
            try {
              var a = b.prototype,
              c;
              for (c in a) if ('function' === typeof a[c] && (e = a[c].toString(), - 1 < e.indexOf('region_city_owner'))) {
                c =
                /[A-Z]{6}\=\(new \$I.[A-Z]{6}\).[A-Z]{6}\(\$I.[A-Z]{6}.Black/;
                var e = e.match(c).toString(),
                d = e.slice(0, 6);
                if (b === ClientLib.Vis.Region.RegionNPCCamp) {
                  var f = 'return ' + e.slice(12, 21) + '.prototype.' + e.slice(23, 29) + '.toString();',
                  g = Function('', f),
                  e = g();
                  c = /.I.[A-Z]{6}.prototype.[A-Z]{6}/;
                  var k = e.match(/.I.[A-Z]{6}.prototype/).toString(),
                  e = e.match(c).toString(),
                  f = 'return ' + e + '.toString();',
                  g = Function('', f),
                  e = g(),
                  h = e.match(/this.[A-Z]{6}=a/).toString(),
                  h = 'this.' + h.slice(5, 11) + '=a;',
                  n = e.match(/this.[A-Z]{6}\(\)/).toString(),
                  n = 'this.' + n.slice(5, 13) + ';',
                  m = k + '.setPlateColor = function(a){' + h + n + '};regionObject.get_BasePlate = function(){return this.' + d + ';}'
                } else m = 'regionObject.get_BasePlate = function(){return this.' + d + ';}';
                g = Function('regionObject', m);
                g(a);
                break
              }
            } catch (q) {
              console.log(q)
            }
          },
          initToolBarListeners: function () {
            try {
              var b = this._PlayArea.getLayoutParent().getBounds(),
              a = this._PlayArea.getLayoutParent().getBounds().width;
              this._PlayArea.addListener('mouseover', function () {
                this.toolBar.isVisible() && (this.toolBarMouse.show(), this.toolBar.setLayoutProperties({
                  bottom: this.TOOL_BAR_LOW
                }), this.toolBar.setZIndex(1))
              }, this);
              this._armyBarContainer.addListener('appear', function () {
                this._armyBarContainer.setZIndex(3);
                this.toolBar.show();
                this.toolBarMouse.show()
              }, this);
              this._armyBarContainer.addListener('changeVisibility', function () {
                this._armyBarContainer.isVisible() ? (this.toolBar.show(), this.toolBarMouse.show())  : (this.toolBar.hide(), this.toolBarMouse.hide())
              }, this);
              this.toolBarMouse.addListener('mouseover', function () {
                var c = b.width;
                a !== c && (a = c, c = this._armyBarContainer.getBounds()) && (this.toolBar.setDomLeft(c.left + (c.width - this.TOOL_BAR_WIDTH) / 2), this.toolBarMouse.setDomLeft(c.left + (c.width - this.TOOL_BAR_WIDTH) / 2));
                this.toolBarMouse.hide();
                this.toolBar.setZIndex(11);
                this.toolBar.setLayoutProperties({
                  bottom: this.TOOL_BAR_HIGH
                })
              }, this);
              this.toolBar.addListener('appear', function () {
                this.toolBar.setZIndex(1)
              }, this);
              this._armyBar.addListener('mouseover', function () {
                this.toolBarMouse.show();
                this.toolBar.setZIndex(1);
                this.toolBar.setLayoutProperties({
                  bottom: this.TOOL_BAR_LOW
                })
              }, this);
              this._armyBar.addListener('click', function () {
                this.armybarClickCount += 1;
                1 == this.armybarClickCount && (this.armybarClearnClickCounter = setInterval(this.resetDblClick, 500))
              }, this)
            } catch (c) {
              console.log(c)
            }
          },
          setupInterface: function () {
            try {
              localStorage.ta_sim_side = JSON.stringify(this.options.rightSide.getValue());
              var b = this._Application.getUIItem(ClientLib.Data.Missions.PATH.OVL_PLAYAREA),
              a = this._Application.getUIItem(ClientLib.Data.Missions.PATH.OVL_PLAYAREA).getLayoutParent().getLayoutParent().getBounds().width;
              this.armybarClickCount = 0;
              switch (this._MainData.get_Player().get_Faction()) {
                case ClientLib.Base.EFactionType.GDIFaction:
                  var c = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFTElEQVR4XtWVW28bRRTHz5nZ9Xrt2IlzKUlanJReiEhLpUpFPAQJBIUH4K1IXEQf+AZIfIE+9oXPgAChPlb0DVGFXlBBlFJoaakobVVCkxbiJI7ttdfeOfwnySo18UXIlRBnd+X1zP/8/mfO7tj0v4lvStKDtseYfVAiGxeCBt8Q8a5Hkj67JGkRYVyEe/2LwSWioNnMeZRx4so1vhLK0Km7xbdO3Fw6fnYpOvr+ye9e/uDzi4NnlqIdGJvC3PjVUNzPfrr66IzP/ylk47pI4tTc6psnbi3/cPmvslxalZPvfjz74dFPZnfj/hDGXsPcc9CMQ8txbrdQ3QQzI0xn7ghXyjRKrJ59aiA5dWAoRa6mEWau4zKOogTGGHN90OTKZUoix+b2XoCNTJ7U/EppplKrHx7w9BpViEwsEHsiMEfQDC+slHLZCbK63gs4VxGqBpR3tDs9PZDMu0p7QSTEQg34xhCxY5jT0PjQZoMK+cjtvQAlolbLwcFSJTjiOUosUta5EW2GyEYboCFox5CTVdJDAefLGy5GdpLwwcmsNzzqu5mFqgi3aK4ds3PQuNC6yBlAbipm/esCZtJMXwfiSGSmqtXakX7PcSuRkOKmZysPf7Nz0Ai0jJwx5PaBwWC1L6DT6o0x+XK5drg/6aZ3pt3MPaxQNbOEpKkAshpoE8jRyB0Bw+/UBdVu9ecC8VzhPVFkXnoy6w0CTA63fLObyFYDrezFY0DuMBhpsFS7Lqh2q1ck4w8Kq28orf3RpPYLoV09dzS3YTVWO5bUWuEEY1yxeO26oNqs3nci3stKP/3CY37+Rqnl6hmXMG2tymptDnJTYGScBveBqVt1QbVavato273F4juseMDX7IRGhLllC0Vo616zWpuDXAbDAWs7mIlWXVAPm9sKz1clFVWjfVrrna+O+buvFI1YDrWLNjM2x+aCkQbLMjNg2y5Yr60FxO3xFA09WCkf6XPV9lq0JmhvTiw4AGj7hrNlgJUEcxRsN/ZqKiCu6EJd/GKx9oyQmnx+JDnxa5m4w+LbGDc/CssAywczBXYOHk2eKq5oVoQSQsOlIHwxn3KmCnWK93wnfxZEpyZZBlgEZh/YQ/BIfIWUuAsqriRDlLi/WJlBy/ZP9bu5Qkga7G5L7NYiEgRYDGaiZigLj0F4cdwFZSs5EwhTSKPG0MHpfndfsaHcxrp15/6LqG41ItiywOTprJuBR7/UKAlPst6KEP1JUvOLpZnVavhKznPcSEgZibdepxCbz93eA8sCk8FmeIzMF0o5eK7Blf3PrlQo7ypnen8u+YSjdHqlLtQdvEZXpKxF12DLBNuBRwpeGXj61lu5ZHi5WDqwVCy/5zqarLVsPr8tV/xzO7e6QMaIE0WRvbdjHXNiLjwYXnl4ZuBNjkTAsdufz8jg4/gXu1sWSur2azIb7/z2vlGl+LpmxHhm1Nqzp7jjzlkKiSbSrrOYSVCRXRfeKEAMaUUVY/Q1T1FmV4al1QYXEaqbBtrowFL05T/uBJGIz4T7udvRrt0TtR0+SWjqktAuKVbUIthhotW6UZETrRXrOKwkCMKb399d+PTcbxpANoKTpPnXFmAuBMs84GVVKHWZm1vZI0LfGkO10xfnwt+Xq/MeJ6hQXZbh1CAldOIf6+D1A67LK8X05LahYHIkRSygHPvicvbSrfn9IiYkhDAsTfMLp5hZ44hMxICwh4epFF+AYAgML6xHYsDSrMTeIVr8d8oGT6m940P3j79+qM7UY7z90WlX4i2LE9a0vrvtZ1wEPuNvwsQs9OPte42fjx3t2bzH/C/pP4+/ARzr/zZI4lPKAAAAAElFTkSuQmCC',
                  e = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEz0lEQVR4XsWX3W8U5RfHz3lmd2Z2drftdinQjRhKE02MV7SIhZYLSUyIMcZ45wVeatQ/4BfwlxiF+A8Yb8WXC68QiBFjIEYwigQiYFEoFVBCX3ZL931nd555zvFkQnphu11Td/VMJvMkm8l8crLn+/0ehDXqXIkxbhECKgBFPOFZDD2qNQHOl2hbzff3C4BWSHOZAe8axqG4SyH9OwBF8xo16h8YpsZik34eSLnHLQsvZwfcKy2G6h4bdW8Blun/kxl850HAXPB1I+8HQSHg722Fl/tT7lkvFZtuGqhNuRj0qAN0eKIfjtyoAmx1EUKikNno6VKwXCe4CGRubR3sO6kcmBGQ8j4XdVcBzhXDQ3v71dHpKgMCsKsQXQsgabG2kfmbRf8uI94Ephu5bPp4GIM7oYLCVAypSx3Qh/f0W0euC4CFCMwMDMC2gCAAbEtAyMz01YJ/ywKetxRcHMqkvtAIdycTON8FgFAA1ArAw4pApFg4UMnh8TTwckD++ULzLhhT8pz4l17K/pZR3Z5KqrnuAayula4kY4gjHsLtmi7PVIOlZissD6QTn7IFP9m2fXMyifPdAmgLEjLwsIu42UG4WgqWykHYKjSCxcE+7xNN5peBVOJqTEFhzEH6WwBf52uH929KCgCtAHQqYgbNwKOewoQFcL3SetDShv+o6dk+zzkFQFeGB7xLTR2UdqcdvS7Ah7dnDx3cPnp0NUDnMsxADDySVMhyXvB1pdQM+Z5vrsYVXEi59ulMyrk05mGtLcDpxcpbzw6l371WEQCEDZVhAAWRjsgZmMjo36pBuFAPvsumvbf7U/aFXR7ymgCn8oX/PT+06T3fMKBcLNdGixkgrkBuBJLzmXvlkOLuwcG089nudBuA1z+/8NFLUzseybpZKDZLvNkbjF6W6tQPbjNpFiPEhAPqmu+0CD4GwDP7Mm0AXj529jlLwQEEDAkgVIgEzAaiJ0YDiIgMUa10EVfuiAPVWgNHRM7EEzvef2PX9lmQagfwmGUBICtiBFaoonlDRGCIvg+IEXvEg5FiI0a/yTGCih6re0GG1eSTo3Ov7ny00RbgzZM/7nxx74iddbKw3CzBluQgELfrdscpiXjlRkvOtZD9gODevoxaagtwYiE//sKWoZxvmHvwJzQUd64cyCXm1hvDcRnDYRlD7uIYsowhyRgWN6W9mf2bneJ6QjT2yshobloAuiBEWoQIRIgq0oViyo3nRYjKIkRmPSkeFykeFiXkDUoxihS3RIpBpLguUrwIQGWR4rJIsRYp5k5mNC55YDVAZzNCMaOWmBGJGbXEjO5rMhUxo+ruBLZWUW8IoL0da7HjQOw4FDu+zxaUxI7rYscrH94YQOdAQhJIGmBMKIEkL4FkiVH5Ekia/ySSCUAsAmgTyYiZQSJZ3QJuWgpKEsnyGqExKa3uRigdk1Cak1DKfwmlZCODhNIGI9aBqSahdCGMQX3CxqCbsVw6AMO/VoEfxnJiNiyxPKgTlIFMTWL5onKhLhOmJZZzV2P5D2Uee7oPcrKYUMHXRhYTKgRcikurJV4tJdOxqh+CmXKRerKYHLs+/8xoJulqIpLVrCqr2bxlYVlWs0qLIZTVjHu6mp34vbLFcWLxyA+RmrKcVp5yUPdmO/6P609VRf8/TUkZ4wAAAABJRU5ErkJggg%3D%3D',
                  l = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFfUlEQVR4Xu2Va2wUVRTHz9zZme6zpbQVSgxU21r64hUSUIkPFFPhCx/kFTEkkhYwNYX4ICFRoTFEKomhIajBICRNSgSifrBWHpaAChUhPFtqIVKUAm63y86+ZmfmzvXcnWWxBaoy+9Gb/DJ7956Z//+ee8+9AmSw1XZpIj5kxIm4EAcSRFTE2F4hs+ECjgwJ84lISDZSgIxF8lJGTiA3EQW5ywDJkLicEizLl4QXnxvt2Lx4rNTycqG0c4pPrAEALyIWVMyuwHiSQshUBkQkBymp9pJl1V5xGRHufJdZ5kh77ZIlotNZ2/F2/SfPNm39hi8LmkjYN2AJjBnvJLMn+8TlfCCo0f7j3b8NXLr4q6fwmTlHTzY3VRBJXpUzplAun1T93sU9LdkTFyzlJvwE7LcCpBRn/yrv9EfUa1t27o1917qbXDi0Xzm+bYt7sLdn/ahHSzwL65ZPWNNQV/rEtOrGKwfalgLAQ5kwMAGpzJWE8bzT0nZE0CJhoKp6XvL41gd6uqpyi0u7Zy94Kf78jCl5PGburOn5MyZXLASAYttl+OWf5kH+odGSUGSYptnddz2e7XGrntxR7e0DxjoeU+Uli3Ezbhou0BszP7Zt4LNrdFupm6waPnA6TNeej5i7eacm37ExGrxVo0RjzvIJhS4HIWRQZ1cA4LLtJegM0b0HzvSe+fvAV8fP/rzz/Y3lh9asmN/Z1Dhlw1vviJ+27At+e+JCiIvzmLYBYwfSSMB+u9x5puuLth9+GeCdg52nA9/v2esKXu4tzyurOK9Hw+ux/Kpkrw+Wzn2KJatEZ1fxcQHpu28ZzmrY+kokFn/XZOye40QQwOdxr8bOsaI5c1t+2tMS7Dl5ak332XNhdTCg5U2s3DDztYbY9cMHsksmPhadWf6IO1cWx3GBcxFzB98CiP++e+Dx+uZmg9LXix8eCyIR0meogBjUhJ6+a+B2OddVrlyx6fb5j4fMvEj/Hysll2t7zfbWw3guLMLybIJUMxkY5yJ0FxrYhd0eZHCkJUgwlG2smw9b3lgEH622aH5zEaxdNg9ww3MzGl4wJo9FFDzhWrH8VqB4K9fj4wyAGgwS1xPs1P6AsRbFPweAS0gIof94EiaoCQkDI00rBxRldWoOibFuuXSSuhCCRLAS2pFA6jbkzxuIH1EQnb83ogHG0DoKq5RBSh+owE0xPjbiq0gU6UeOIAYSTxnhWaP/5jpGFbRpchOQTDlLvkBAH1E8nRE9RXikWMcIsxe4gzhlIFGTG0hffSr2UxmwTdrA1NoPO4NKeOrtfr/fL1aWFMPur4+C5CDgcTuhZs4McDqz0kuAZM5AQtcLqkqKpKenlQH/bpYkgRdFCZjQdzOEBCGiUaAiTe4Jg1IQBCGYMQOMMeoQCZ5W0yGVbS4AWRjRceoqXOoPWKlH+LMwPw8CIaVhWt3mGr5chAhElqTOY1sbmh7UQHKd/RFrvbk4b7JMIKzqIACDmGECReI6hXEFeZCb7ZoUjcUn8YyFonEIhpTpAPBgBtBB8oQLaUa65DhZKK1Syk2lDagYQCmD+oUvQFlRLuBrUP9BKyjRuGZnCcBAkcEEHRIgA4GYbmUlblAwdAoqAgxjUe9GGE2Z1p5gGGPLAEWRIDcgDDUQRWF2x0A6IyGNgj9h/Tas0rRngM8ipNMhH5KYgBmwRPixTBENAezfQgMyN8D/t8rSfgYUfehMHGCCapjJDKi6AQ4igpYyxPcLiRupDFD7BpjJQIkl+O90GRIUi6MwRQxNTwKSAxivCkaAmAIwhJo2M2AyJuuJBBxp3Tc8xtpcKPB7ekxIbpOb+ztAlCQMADSm8UzID2wgx+vtCITCT95rFoKVjruNKeEhMTk+34//Uf9/4C/OeihXxgLfsQAAAABJRU5ErkJggg%3D%3D',
                  f = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAACgCAMAAAC7f4tPAAABklBMVEUAAAD///8bfqbc3Nyhop/T09PZ2dnY2Njx8fHy8vLz8/Oen5t2d3XW1tZyc3C5ubnJycnLy8ugoZ6hoZ7X19bX19eKioiXmJTa2tqXmJXg4ODh4eHi4uLr6+ucnZmcnZqdnpr09PTR0dHS0tLV1dV0dXPj4+Pq6uqen52LjIrK09eMjIvOzs3Q0NC3t7e4uLiRko9qa2iWl5NtbmsbfqZ0dHK9vr3b29t2dnTf39/IyMifoJygoZ3CwsLo6Ojp6enDw8Pu7u7w8PCGh4OIiYewsLC0tLR1dnRnoblsbWqpqairq6irrKmsrKutrq2ur6xub22zs7OHiISHiIW4uLZub26Jioi5uri6urq7vLtvb22Ki4dvb27FxcVra2nIz9KNjoqOjouQkY5zc3HOzs7O1djPz8+Sk4+TlJCVlpNpamd0dXJubmyYmJaZmpeam5ibm5l1dnNqpbxubm2enptub2x4eXd6enh8fXuCgoGEhYKEhYOioqHt7e2io6Hv7++jo6OkpaKlpaOlpqOmp6Wnp6Um7BAdAAAAA3RSTlMAAH5Ny5jlAAACu0lEQVR4Xu3b1Y/bQBDA4Wtm1+wgM8MhMzOUmZmZmfH/rtc5K6kq9SGbac/qjnSv38NPymmccbr2oM3vtKC7nPGMdXRaaM/THuAZSZLYX9kBmrRnqwekDkyZQpyacUmyaEe+5MjcNFj0xEdGN2rcAO5p0ABxaz6/ZLQj80+DZjYcfsdoVoPJS+sDg+2Pz+cHp7VJ4X6O0awzkzf8k8npdieZTEERbDoepxRO6Ixu1Fg6EqiuaGq7o2kFJV0CgDLLYR7wzlr0jrwRSH9SeEbVlORNRgPI3a+Ozln0mP1JWfdXmcxlFzIli6YgR18cexRiNLAZmFxReEfLSIw2T05dHso36cGkxk/XGA2bUwkSDJEmPa1y0+qiTY8HCQkRDJoO6yR2W/9LtMI/Ng0VwsY9NGKQ/6a1aC1ai9Z3rSC3cFpfzJPYUB4lSOQQWmuQfxAdJwhA//MYFk37TtVxgrBZw6O9WEEoJl1BC/JHWrQWrfv2YtH9b58gfdDlXiNRR6EjUSOB9P96+14Caw8ZDZJYzG3LAnh1QnS3LWZ0lLirNT8t9mvRWrQWrQ281uH9aK1B/obVmj3dfSFINIQn6nhL8Coe7XXlfl35N0FEa9E6fBCrtdz7eg0niBw9ey6LQoejxhWkPcQwEijLgnMDQ6HFHiJ2PtFatBatRettJBr/BkaIG29gx7O75QYm9mvxLCNau/EGdm3VdTewbvac5LYb2HB+F+0hYucTrUVrzHeC3UNjBnF/a4x33cfJr1/G+TpAqws2vWm5wVALnSpwF1lO2UHMfaGR1pf/Z0DROO0P6YhNg/x15GquSUOxqhQ0jt9wqMtpU4KdG9h3Mhts0lBKZTK1xXantpCKSODQcCY710LDdSrxjMxkOwgUKbzRbbqT4+zXz3IItA0Ezj/GomcePMQKcuH9HSx6fv70T0KzcLgY6GqkAAAAAElFTkSuQmCC',
                  g = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACgCAMAAACL85puAAAAn1BMVEX////c3Nzr6+vw8PDT09PFxcXp6enV1dWdnpro6Ojt7e2en5v29vb39/fq6uqhop+kpaOdnpvs7OyhoZ7g4ODOzs7Q0NDX19eam5ecnZq9vb3CwsK6urrGxsbv7+/Hx8fy8vKPkIyTlJC2tLGSk5DLy8ubnJiWl5TR0dGdnpwbfqafoJzZ2dna2trIyMj19fXd3d3e3t74+Pj5+fn6+voyWnv7AAAAAXRSTlMAQObYZgAAAR9JREFUeF7tmkduxTAMREnJvf/ea3qv9z9bYuQE0XyAXswDuJ3FA2XPgkJEHkFEQSRSjZDBAxQED7hCHTzgARhyqz3++7MOQ1a9A18d/T4MyVSj8ZsvnGv+cM2/kImqr7xL8kCk1enXsUjyUKTUae1dDgVU+wYIaM0DyssE0AEd0EGGO+Aqj9CAMxpwQgOuzQNOeAAdnM1XuVUFn7N5QKtKB8MLSFAHiYlELpJ9wajZE9mVl9YtjSWLDnrkzqCl8XswZAd0QAd0QAd0MLrIz5UdiQ7M6/6S/YD9YEAO6IAO6GDy8oGdUGTP79gRx2qxcNAZyVOapgVyyFJGv4yBU5puPj8c7l34MU83m+12wMgNiLyCSBzH6zUwst1stsj8AK74lmQgdGoWAAAAAElFTkSuQmCC';
                  break;
                case ClientLib.Base.EFactionType.NODFaction:
                  c = 'data:image/png;base64,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%3D',
                  e = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFMElEQVR4XsWXXWwUZRfHz5nZ7213u91u2W26RRFfaoCgiSDbxpiYKIitcueFGKM3mhhD64WJ0Qgx75WxkBATjRdcCBdyIYlEJNF4gdrlI6AUiNBCtFK3Le2W3S3dnZl9nnnOe7ZbQJp2obDre+bZZDMXk9+cc+Z//gdhgaCxIwhKIAAf0glbtxDUKBYEyJ3bu8Kpw5MAKIkco75w01nQtQxGNql/BWDohx37w/FHXyJZtOT0lXOBYONB1N2nPeHIGRDyOrY8L2oKMHZi9/7ohp6XwRwnMztSsHIjRciPJEH3nK4LhH/U6+vPkyFmtLbuYk0ARo/t2hfbuH0bTJ0A8D8AyhbSlkoYqeQ1XWROWkq71Ngc/wZc+pA0VM65vEtUFSCV7PuyJdH7CqT7gVAj1H0IDh8oLSBI81Bh6MAwgj0oleNiQzR+EED9WRSuSXfbs6o6GejnDHT0bIN0EkBzABABXwzimQUm/ypJpFThwt5LipxjpLlOBiPRb0HZw9j64tj990By975oYvstgHLMgQAh6giIQKHHSRXGDfPy18NFW8t6vHXfef11R5n6D2zbOno/JfisJdHzJqSP3Q4AMA9GETqDCIHVIKfO5qzxX9OmVcgFg+H9iPCb7vQOYhtnZMklSO76PJbY/sY8gMVBVJHQ/yCCLw7F0aNpkU9bRjZ1NRSK7BO2/N0TCA+A1zWJoWfUXfZA3x7ugbfnAVQOshlEEAbXIDjrwEr1TwnLIuva4GV/XcMhBXjG1xw/BcLIYqxL3KEEn+xs2di7A6bKAEsKJculCaxGJgIrOzxdnEmTnb04AJr7uM/fcMTV1HgKw5tnFgfo7/u0paPnLZj8GQArAVTOCKAG4F/OfyVJYQtzckAamSu/1DdGdnqDDcdxWTct1gPvxxK9/wW7UCZChHsOUgCaCwCdAKBg6vxXps8pX/OGIgdw2ZaFAQa///DdSHztKiVFOyJeI6ViCFB+AmDpENwKJJq9hYu1Oc4FoE65iWGtMRx5rz4SO4zRzQsDHNrV1e30eLodqBEBSNRKnKjKPyBAPogAxIeonCKkOQbCf/bXPFSwTNO9sn3dx+2bPrq0aA8c3rN1ldvrAx21Ej6V4G++eYkZae4eAdGNGtHshbcSgTRHgEQ3y2gaBj78yLqRh57+YLa+i5VgZaR1jV/Zog5QK4Kt3ICkISAt1BM0R1F+XYTb3lwr39G0ErgO2YlhDIcjFwJrX5+oIER9a2OJd1ZwE6oaNKHkJhzwtb86WukzXN/S0RuFyZ+oap+htMmcGFBG5q9MoHHZkPc/2zKVhGgdj+M2VkKqghAJFiJgIZpmIcqwEE2wEOVYiOxKUrw+VspAOkn3KMVopZKWsExgKc6zFF9VgDmW4hwIQ7AU052G0ROxRE+EAZY6jLCYOmqJQlrxMLJCjZGUkHKah1HJR1pLGccbuATNDLCEcXxOWOOnizyOJY/jFCJkeRzneRxb92JIOtmQhO7SkCg2JAU2JJINyYS3rj4NhAYbEvN+LFknj+NQBUumiBSwJcsrcpqku7LBpugEKFXA1hesapjSTi5BaAFTqkjzAJvSAoKdl8ox0xBtHQegPDdWsZq2vDO2kTMwdfyGLVe2VMS2vKiLbM5SOMO2/Cq49LxtKOFY3kXVXkw6eDEJgzmmzOzfNi8miheTLOieLC8maV5MrpMhbF5MVK1Ws6ea4o/5lbQUr2bXA8HwGOquHK9m0yCk5E+KarqaZc580ex2O1ygkAgcJi+n0xh9TtRmO/4/x/8AHKjlP9O9djoAAAAASUVORK5CYII%3D',
                  l = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFmklEQVR4Xu2VfWxT5QLGn3P6tbasU9nGAO+GczjQOUaAuyioSPxjSC6BmAiEixjMEEz4UiJxfs2PoJL9gyFeVDJGgID4gd443R8oRByyTRBwiDg23YAxVrvSru1pT895j4+n/WMyGHHtnz7Lr+3es/M+z/u8Z28lpFFG/WwLADvJIE5iJX4SJZo050sDV8maJmMJgI14SA7JIyOTQVrIZRIkgwLIaTK3Jw2L4c6ZjcI5NSip3IW7V9Qhb1oFgBHEMuku550MKyeR0tWAhWSRIuSULUVe+VJI8oB5DYaDPLO6cZHDKlU+UtO09eP15fUAogwRk5G67GQUssbNwuh7njDNI5e7zx7dd+rDujfa4W09/MzOH++026SVhaNcrvKyopc3159bBCCXZKQjQA4Zj9ypy0DF/R0Xt71XE3n3o4PyZ43nglW7j7nOXAhVj89zu9cu+U/Bs0+/MH7KtH+/uvtw53/BEOkIUEDugjMnH9QXn9ZJgYgGJS5aPW5rdWtXsKR4jPvMsrnTlfKZ80eCmvHQgmyGeBTA7RJSlPHLtgPgRHDmjoMWE+c7TigjMrOiN3tuakD7/qpER5MWYvS9b+Fq9bX+L/UAJze+g1tKVuJqXTqyAd6TewEw3vyN/uCVilB/IONfhWVOWB0ylN7fALSnvgUXDn/0c/MnJzFAx77a2byuZufEuZu+m/dU7YmylVUvW2q3v+s/3lgfMM0ptH1cS16Vkbraj7U07/v2wAe/g2o6tN9X+/9G59nu8MSSfE9rMKxVO21ySZbLiofnPW6AguLtAnCadFpxHb22pmhJNBx5SRgC15IsyXCOcK8F8PXi+wp2ba5v9h851bbuh9Md/b5QXL07P/OVjYunRD5s6fGUTrg9XFz6gAuuUWNAoff7WrAD4pVwHb2y6ra3dU1fNTa/AJJkAYxEeP4CITSc7+iAw5lR9WJF8ZsAHCSDh8ycC33RFU679f1D1dMPIW/qAuRO24SkYPDGnqYd8J7YAeAs6RtqC2KGMLBk+WZUrt6DyrW7Eqzei4WPvQ5dCDCMmvyCiZEgT7g9Mc14kuZ7AAhAUhlch9BiCHUdR8cnG2i+HcA5EiC6FTeQoUUBKICIJxuw01zFQCVDEFM/EZmE0NPSQHwAosRHeoiXBEmc4Y0hAxis3YjTXAsDEEhIMFSE14bOTcKkm3xDNKIkg6g01pGUdchJJEDoMUAoMHSdIxyS4wylYiglG4kn6ccQsg6xeskQoFkYRtSe2HPKIlkg2AqvIwUNDvBc5dimULB/MpLq7fFZ7phQiIYDdZBlG1wZbsyaMQ9Wp5ttRM0AJH0BNFXNKRxfZCuZNNNs3+50wOn0QBcy/L52+Ho7occC0CXNfAZ0XYckSf60BWCjuixbcf+DqwBJgAINOO7Eubb98F5qg87qhcSVqwqyc7MR8AfWPL/81grB7ZIhyTaHral6y6+bhhnAgBACQrtovtM8EcJwQIsFYQiZxmEwJ7R4BDl5eXC5biqNRCKlgEAkFELwSv9UAMMNANaqIR72AQOOX5stgwEU8yHU1RDt4wwSMc+X+QvXI3vkZAAatm5ZDKUrrIIafgOaBhHpveogcrD6UKIdGgvEE1thANFQLwxPJz/rHOO9HEwhAEwTXfEBA+YRNgdElAEYUGMADTY2EmUjBsf7oPd3m+0IoZlzpNSAxga0SB+MASuRbHYah01DXaUxNPNwoif0iB96iAENwXsIE6S2BToniV4ZOBHDWCHiUZoaiHPlNlgZVDXbiocZwCVB530Mn3oA/kBRgubn5L8h65aJAk3oUGlCGAJmS1Y9DEmRIJmHUuoN2KOqhtqGo7haggZCAmrPdyeCyeYrPvd5YbPKHABUVQe3yT7sAO5M98FQIDD9Wi3SHBYMVsj4699ketyNQAB/R//oD9nHCW2twSEjAAAAAElFTkSuQmCC',
                  f = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAACgCAMAAAC7f4tPAAABj1BMVEX///+hop/p6el0dXOXmJSTlJBqa2jY2NihoZ6XmJV2d3XX19egoZ6dnprOzs3X19aIiYeKiojQ0NDr6+vq6uqen51sbWqnp6WRko+cnZl0dHKMjIuur6yLjIro6Oh2dnTIyMh1dnRtbmupqajCwsLu7u6enpuWl5OGh4OgoZ2EhYJ0dXKHiIWHiIR6eniSk49ub2yam5hpameJioiNjoqlpqOkpaK9vr25uritrq18fXtvb22Ki4d1dnOOjou4uLZzc3Fra2mrq6irrKnPz8/t7e2lpaOQkY6mp6W7vLvOzs6CgoFubm1vb26bm5mYmJaZmpfFxcWVlpO6urrc3NzZ2dnT09PV1dXa2trg4ODz8/PW1tbJycnLy8u0tLTi4uLSvbq5ubnDw8OwsLC3t7fb29vw8PDR0dHv7+/f39+uRDqvRTzj4+Px8fGcnZrh4eGsrKv09PSioqHTwL2mGxvW19by8vJyc3Czs7Ojo6KfoJxubmyEhYPOuri4uLjS0tK9vb2en5tub254eXdub21rpm98AAAAAXRSTlMAQObYZgAAAr9JREFUeF7s0MUOwzAURNF+5DxTEIrMzPDhjRtZztqx1E2vNNuzmNZv+rf2Wl0epWgSEelxA9TkYQryEGcQLBBENfkC8kSjpO9L+8YKjatoQJQdXj5loKK1jffZvKHlvGhf3cuyEObrgOE0NT9rOQ47cuCalDP08KWFYAzPh30j30fjrtq6ptRiktwAcH3HZr47WjmOkv6nffPsbRoKozBva+oRO6NJS5OSpIWWTubee+/xxqgOqCBGQaobpUKOxIdW/udwrUgOX/jA7UGxeM8PeBQ90rWOc65DnURBuHZHoZnN+rGjS+oMJifl49tNRdZid8u7v9A+m6UTqycthWaVT5+/hLoJyi2Fbp9unpnyUvTOWqCPrig0zzZtci1K0d8ibXQ0kqBrLpFFCLQ/FpOxP/5H6FA/CZpHSSU7aKCQ/8a1uBbX4vpUTMZxjOubHhlTHkRI7iDMNZsHKMYIYR4/YqDQfv7CBEaIShGH7qGE+Ej0KEzIH9HiWlznD6PQ48tXQQfdnHZszOMpV3Js0PN6csVG9ZBDLhlG1soC92KiGFbMYK4J63r40NKvxbW4FtcOznXhNsw1m2dRrtXb3TkCoblwfgJXghfh1R3fr/FovBBxLa4LF1GuzelLRYwQs3T5ShWCLpSca6Ae4jg2oCykGxgELT1EOp+4FtfiWlxPgtD4DYwoixvY9eqwbGDSr+VdRlxncQO7sZi5Dazu2ERZ28DGvCHqIdL5xLW4Rt4Jzg4aKST7rhF33Wv0+4X0D3uAjhoJetYicq0BdKerbWS+kwhp37IWBi//z3AYaLLvruf6G9i9hftbKZo3NsNuoPENRzS/3m5xfwN7QD/cFM27nXK5MvK3qTQ66jf30fywujSA5kd+SyemIidCeMPnx3GC3tP0+/WTLQCaVd49fYZCzzx/gRLycvsVCj039/onvUF9K+HA7eQAAAAASUVORK5CYII%3D',
                  g = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACgCAMAAACL85puAAAAolBMVEX////o6Ojg4ODLy8vIyMien5uhop/FxcXCwsLOzs66urrGxsa9vb2Sk5CPkIyTlJCdnpvV1dXHx8eWl5T5+fmkpaPQ0NCam5fX19fR0dHa2trZ2dnd3d3e3t6foJzc3Nzr6+vw8PDT09P29vbq6ur19fWmGxvp6ent7e339/ehoZ7y8vKdnpqlGxu2tLHv7++bnJj4+PicnZrs7Oydnpz6+voBl3AiAAAAAXRSTlMAQObYZgAAAS9JREFUeNrtmttuwjAQRDe0JNxDuPcCayehSSCUFtr//7US8QX1IBmhGcmvR+zBseZhhRE5fGARBSOpaoocHKBgcMAnOsIPDsAiX9rE/n5XbpFT81NstrdHt0h9AZy3tjQmv8bk/4rsVG1mTRE4RkJtzfZlETgD2tqqrAkgQHbMAUDoHXAdgQ7ogA7gEWr+jfgIYxQQo4ARChh6B4zoAB8h9n6VQ1X0c8YB8Ah0cH+AAnVQ8CJ5uUj+C0bFnsiuvEQBMQsGS9YtAFO4pfE94JtIB3RAB3TwWA7GKGDKjsSe2AC81/0l3wO+iXRAB3RwRw52r2tshaJ+e8eWOE6rlYHWSDZJkpTIIks7veQMrNLMF4vJ5MW4L/PMu91+HzjyBEaewUgURYMBcKTX6fSQ8wfrkQWdCN/EzwAAAABJRU5ErkJggg%3D%3D'
              }
              this.toolBar &&
              this._armyBar.getLayoutParent().getLayoutParent().remove(this.toolBar);
              this.repairInfo && b.remove(this.repairInfo);
              this.repairInfo = new qx.ui.container.Composite;
              var k = new qx.ui.layout.Grid;
              k.setColumnAlign(0, 'right', 'middle');
              this.repairInfo.setLayout(k);
              this.repairInfo.setThemedFont('bold');
              this.repairInfo.set({
                visibility: !1
              });
              this.repairInfo.add(new qx.ui.basic.Image('webfrontend/ui/icons/icn_repair_off_points.png'), {
                row: 0,
                column: 1
              });
              this.labels.repairinfos.available = (new qx.ui.basic.Label('100')).set({
                textColor: 'white'
              });
              this.repairInfo.add(this.labels.repairinfos.available, {
                row: 0,
                column: 0
              });
              this.repairInfo.add(new qx.ui.basic.Image('webfrontend/ui/icons/icon_res_repair_inf.png'), {
                row: 1,
                column: 1
              });
              this.labels.repairinfos.infantry = (new qx.ui.basic.Label('100')).set({
                textColor: 'white'
              });
              this.repairInfo.add(this.labels.repairinfos.infantry, {
                row: 1,
                column: 0
              });
              this.repairInfo.add(new qx.ui.basic.Image('webfrontend/ui/icons/icon_res_repair_tnk.png'), {
                row: 2,
                column: 1
              });
              this.labels.repairinfos.vehicle = (new qx.ui.basic.Label('100')).set({
                textColor: 'white'
              });
              this.repairInfo.add(this.labels.repairinfos.vehicle, {
                row: 2,
                column: 0
              });
              this.repairInfo.add(new qx.ui.basic.Image('webfrontend/ui/icons/icon_res_repair_air.png'), {
                row: 3,
                column: 1
              });
              this.labels.repairinfos.aircraft = (new qx.ui.basic.Label('100')).set({
                textColor: 'white'
              });
              this.repairInfo.add(this.labels.repairinfos.aircraft, {
                row: 3,
                column: 0
              });
              b.add(this.repairInfo, {
                bottom: 130,
                right: 3
              });
              this.toolBar = new qx.ui.container.Composite;
              this.toolBar.setLayout(new qx.ui.layout.Canvas);
              this.toolBar.setHeight(53);
              this.toolBar.setWidth(this.TOOL_BAR_WIDTH);
              this.toolBar.set({
                decorator: (new qx.ui.decoration.Background).set({
                  backgroundImage: 'FactionUI/menues/victory_screen/bgr_victscr_header.png'
                }),
                visibility: !1
              });
              this._armyBar.getLayoutParent().getLayoutParent().add(this.toolBar, {
                bottom: this.TOOL_BAR_HIGH,
                left: (a - this.TOOL_BAR_WIDTH) / 2,
                visibility: !1
              });
              this.toolBarMouse = new qx.ui.container.Composite;
              this.toolBarMouse.setLayout(new qx.ui.layout.Canvas);
              this.toolBarMouse.setHeight(25);
              this.toolBarMouse.setWidth(740);
              this._armyBar.getLayoutParent().getLayoutParent().add(this.toolBarMouse, {
                bottom: 155,
                left: (a - this.TOOL_BAR_WIDTH) / 2
              });
              this.toolBarMouse.hide();
              this.toolBarMouse.setBackgroundColor('#FF0000');
              this.toolBarMouse.setOpacity(0);
              this.toolBarMouse.setZIndex(10);
              this.initToolBarListeners();
              this.buttons.attack.activateAll = new qx.ui.form.ToggleButton('', 'FactionUI/icons/icon_disable_unit_active.png');
              this.buttons.attack.activateAll.set({
                width: 44,
                height: 40,
                padding: 0,
                show: 'icon',
                appearance: 'button-text-small',
                toolTipText: '<strong>' + d('Deactivate All') + '</strong>'
              });
              this.buttons.attack.activateAll.addListener('changeValue', function () {
                var a = this.buttons.attack.activateAll;
                a.getValue() ? (a.setOpacity(0.75), a.setToolTipText('<strong>' + d('Activate All') + '</strong>'))  : (a.setOpacity(1), a.setToolTipText('<strong>' + d('Deactivate All') + '</strong>'))
              }, this);
              this.buttons.attack.activateAll.addListener('execute', function () {
                var a = this.buttons.attack.activateAll;
                this.buttons.attack.activateInfantry.getValue() !== a.getValue() && this.buttons.attack.activateInfantry.setValue(a.getValue());
                this.buttons.attack.activateVehicles.getValue() !==
                a.getValue() && this.buttons.attack.activateVehicles.setValue(a.getValue());
                this.buttons.attack.activateAir.getValue() !== a.getValue() && this.buttons.attack.activateAir.setValue(a.getValue())
              }, this);
              this.buttons.attack.activateInfantry = new qx.ui.form.ToggleButton('', 'FactionUI/icons/icon_alliance_bonus_inf.png');
              this.buttons.attack.activateInfantry.set({
                width: 44,
                height: 40,
                appearance: 'button-text-small',
                toolTipText: '<strong>' + d('Deactivate Infantry') + '</strong>'
              });
              this.buttons.attack.activateInfantry.addListener('changeValue', function () {
                var a = this.buttons.attack.activateInfantry;
                a.getValue() === this.buttons.attack.activateVehicles.getValue() && a.getValue() === this.buttons.attack.activateAir.getValue() && this.buttons.attack.activateAll.setValue(a.getValue());
                this.activateUnits('infantry', !a.getValue());
                a.getValue() ? (a.setOpacity(0.75), a.setToolTipText('<strong>' + d('Activate Infantry') + '</strong>'))  : (a.setOpacity(1), a.setToolTipText('<strong>' + d('Deactivate Infantry') + '</strong>'))
              }, this);
              this.buttons.attack.activateVehicles =
              new qx.ui.form.ToggleButton('', 'FactionUI/icons/icon_alliance_bonus_tnk.png');
              this.buttons.attack.activateVehicles.set({
                width: 44,
                height: 40,
                appearance: 'button-text-small',
                toolTipText: '<strong>' + d('Deactivate Vehicles') + '</strong>'
              });
              this.buttons.attack.activateVehicles.addListener('changeValue', function () {
                var a = this.buttons.attack.activateVehicles;
                a.getValue() === this.buttons.attack.activateInfantry.getValue() && a.getValue() === this.buttons.attack.activateAir.getValue() && this.buttons.attack.activateAll.setValue(a.getValue());
                this.activateUnits('vehicles', !a.getValue());
                a.getValue() ? (a.setOpacity(0.75), a.setToolTipText('<strong>' + d('Activate Vehicles') + '</strong>'))  : (a.setOpacity(1), a.setToolTipText('<strong>' + d('Deactivate Vehicles') + '</strong>'))
              }, this);
              this.buttons.attack.activateAir = new qx.ui.form.ToggleButton('', 'FactionUI/icons/icon_alliance_bonus_air.png');
              this.buttons.attack.activateAir.set({
                width: 44,
                height: 40,
                appearance: 'button-text-small',
                toolTipText: '<strong>' + d('Deactivate Air') + '</strong>'
              });
              this.buttons.attack.activateAir.addListener('changeValue', function () {
                var a = this.buttons.attack.activateAir;
                a.getValue() === this.buttons.attack.activateInfantry.getValue() && a.getValue() === this.buttons.attack.activateVehicles.getValue() && this.buttons.attack.activateAll.setValue(a.getValue());
                this.activateUnits('air', !a.getValue());
                a.getValue() ? (a.setOpacity(0.75), a.setToolTipText('<strong>' + d('Activate Air') + '</strong>'))  : (a.setOpacity(1), a.setToolTipText('<strong>' + d('Deactivate Air') + '</strong>'))
              }, this);
              this.buttons.attack.formationReset = new qx.ui.form.Button('', 'data:image/png;base64,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');
              this.buttons.attack.formationReset.set({
                width: 44,
                height: 40,
                appearance: 'button-text-small',
                toolTipText: '<strong>' + d('Reset Formation') + '</strong>'
              });
              this.buttons.attack.formationReset.addListener('click', this.resetFormation, this);
              this.buttons.attack.flipHorizontal = new qx.ui.form.Button('', c);
              this.buttons.attack.flipHorizontal.set({
                width: 44,
                height: 40,
                padding: 0,
                show: 'icon',
                appearance: 'button-text-small',
                toolTipText: '<strong>' + d('Flip Horizontal') + '</strong>'
              });
              this.buttons.attack.flipHorizontal.addListener('click', function () {
                this.flipFormation('horizontal')
              }, this);
              this.buttons.attack.flipVertical = new qx.ui.form.Button('', e);
              this.buttons.attack.flipVertical.set({
                width: 44,
                height: 40,
                padding: 0,
                show: 'icon',
                appearance: 'button-text-small',
                toolTipText: '<strong>' + d('Flip Vertical') + '</strong>'
              });
              this.buttons.attack.flipVertical.addListener('click', function () {
                this.flipFormation('vertical')
              }, this);
              this.buttons.attack.repairMode = new qx.ui.form.ToggleButton('', 'FactionUI/icons/icon_mode_repair_active.png');
              this.buttons.attack.repairMode.set({
                width: 44,
                height: 40,
                padding: 0,
                show: 'icon',
                appearance: 'button-text-small',
                toolTipText: '<strong>' + d('Activate Repair Mode') + '</strong>'
              });
              this.buttons.attack.repairMode.addListener('execute', this.toggleRepairMode, this);
              this.buttons.attack.repairMode.addListener('changeValue', function () {
                var a = this.buttons.attack.repairMode;
                a.getValue() ? a.setToolTipText('<strong>' + d('Activate Repair Mode') + '</strong>')  : a.setToolTipText('<strong>' + d('Deactivate Repair Mode') + '</strong>')
              }, this);
              this.buttons.attack.toolbarRefreshStats =
              new qx.ui.form.Button('', l);
              this.buttons.attack.toolbarRefreshStats.addListener('click', this.refreshStatistics, this);
              this.buttons.attack.toolbarRefreshStats.set({
                width: 44,
                height: 40,
                padding: 0,
                show: 'icon',
                appearance: 'button-text-small',
                toolTipText: '<strong>' + d('Refresh Stats') + '</strong>'
              });
              this.buttons.attack.toolbarShowStats = new qx.ui.form.Button('', 'data:image/png;base64,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');
              this.buttons.attack.toolbarShowStats.addListener('click', this.toggleTools, this);
              this.buttons.attack.toolbarShowStats.set({
                width: 44,
                height: 40,
                padding: 0,
                show: 'icon',
                appearance: 'button-text-small',
                toolTipText: '<strong>' + d('Open Stats Window') + '</strong>'
              });
              this.buttons.attack.toolbarUndo = new qx.ui.form.Button('', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAzdJREFUeNq8ll2ITGEYx+edj901i2UNaaiVyFdK3PgohUJSyo3ykVsXeyFy7+NOElfkjpBy5Yoil5S4EclolfK5YwfL7JwzX8f/af5Hj9eZs2P3nD3165yZc877/N//857nfUwi5PA8T05GLo0xiTiO5DjBe8BaMIDfZsoEMHg32Akug00gNZUOSLD14CQYAu9BMw4B6YDZi9WrwGnQC56A161bf9Lg6Xcmsz7SAcHz4BTIge+gClaA5QxcBqO8Fn7hvTGcXVAXp/5HkLHyPhucAdvAGAV2B6RHjmGKk+c+gLfgKd0qiiAI8ToSwOAzwVFwGPxgzvUAnvXbv29IimI/g0fgNiiAWpgjvgB5eR+tL9PKoOA2TXXWgqZxnEvgrrjUTkRSnXO03Jtg8AaFO2CEv0+AI6CPLrcVUANXwXUwS+XZn1FSYRSJABH+ucy1sB8MyrhBIuxF2AeOgUOgRCEVDtYMcKeXC1dm/ZPP1pUbDcYQd2+BG/KMTkdaf8sQIYvvPBfTHg58H9zkqrfFT6eIzWALWMxZV5UI4RPYC16Bx7qope2CQhEXafdusJIDD+F+3aobJV6+AXfALnCA/5WUAIfjyb0C3iv6LvxTinlDPqULnL0UoNWg386hPEvqfEecOsfUZRi8Rke+ggUsaiZ0L2ABEdvOsrAsA9nQgtISLjN9CK6BebS6RiEVitwIutruBVoEDhFxnIvoy3gllimUkvwAbOf4dTpQowuLWPSKof0AB5QZvAPPcF3pqLa3REqge3StpigzPTk/nclOBpzAbifCn6sU+OvAUXtMZwImcVSt4FXumA47LRO6BiJqdhpW8Cq38mzcDhh+OQ4Du0pIimlIxOlAF+vHNxXcVRWy4pf0yB3g6s6z4Iyo4C7XQ4bOxJYCcXUDv/+yCu6oDW20bSmOYPZSbreym66o4C5TM0ZhsTggu+gOBhu2gksq5qr/oxWA2SfZzq8DLzlLx7J/DrfkRqQCaP18cBB8ZDvvWg7MkBaeW7cXtQOG3ZTMrB+sAUs5Y/9TXwJe6AX4V0sWUQqy7CnlMxwAC/lfhuKu2LuqiakO+I1sD3vGPHvGAoI39PO/BRgAhgJgQiBnZrUAAAAASUVORK5CYII=');
              this.buttons.attack.toolbarUndo.addListener('click', function () {
                console.log('Undo')
              }, this);
              this.buttons.attack.toolbarUndo.set({
                width: 44,
                height: 40,
                padding: 0,
                show: 'icon',
                appearance: 'button-text-small',
                toolTipText: '<strong>' + d('Undo') + '</strong>'
              });
              this.buttons.attack.toolbarRedo = new qx.ui.form.Button('', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAx9JREFUeNq8l8uPDFEUxvtWV8/o7hmPTCeeC4bJYIhHIhZYiNjZ2CEidlYWHrEwEyxn7x+wtbSxFqyJiEeEeGS0kU4YY3qobt3lO/HdOK6q6mrd5Sa/VLoe93zn3HPuPZ3LZTTCMDSg43teRsZ9XDaD1SLkvwvAKIFT4DqoJEUiKwFN8A5sB+fB0jgRXo+hdjEMeQM8BE/BCXAWlKNE+N0mFi55UABLwDAY4GO5N8LnOT6vglFwEnwBNzDHgjG/08Kk8ZKREmMbwU4wAVaBNfKKhBgsA21i5/0BAjoqeXEJ3JZ7VoRJ4bFMvgMcB7s5mUzccpbSOE7puQ0jJblxDtyHgHaiABiXUG4CZ8B+ehIog54ybK9RaBFFUAPHwKxEwU8wLnV8lWGuMdR5tcba+3ZCQmsRErUyGIxNQhiXibayfIbAR06Sj5nYJEQiR+F2Cb6CKUlOmwN+xJqvBRcZrk807DtrOcTnkvnv6ZlxRA3QW8OKmGc5PoLxVlwEilyfYRr3nVAv57274A54xYkbEdHZA06DbUy+C67xPwTQ+w1gnyQIQxcq4yvAGzANXjMhf2WyqmuWrZTkGPNInLoCHrjG3QjIi0fo0aIT9gpFXZaQY6Kww/myBexisk2y9htRL/tK9Up+NMM6t6PMj6eZPJ3OWBGwHoyDa+CW3njiIuDxAzG0oDLecN1vgud28+gwWsyRl+BJknEtwOem8wF8V/v7IH/fiwvhX0Vv5DwKq7rUkoavDo5KREbLDJ/lfprJlIjU71oBeWZ0nSWTU5tILa33/zJ8Z+0CJwHrjE4hKwGe8jSkp4G6LvI0LKZpMHsR0KTnniOizjIcS9M79CKgwUOnwKy3R+837vUHuFFlJqBFASUVgYBiZtgJjXZqsXvNgSrXu+VEYZ4cUvtDJgJmmQcF5b1dhhc81db1Oxk9tXHMsZevOEsQ8JnkwlFZpn6K8Jw/E4/ZgrWdZQjUH42D3bbzqQTwlHvGtmmEZVeioAl2xHW24/l+CTAR/eBecFhtvxL+t2xGava86Ga/70aA/WM5TsNz3A2bUd1PP8ZPAQYA6tkaX3nBq4MAAAAASUVORK5CYII=');
              this.buttons.attack.toolbarRedo.addListener('click', function () {
                console.log('Redo')
              }, this);
              this.buttons.attack.toolbarRedo.set({
                width: 44,
                height: 40,
                padding: 0,
                show: 'icon',
                appearance: 'button-text-small',
                toolTipText: '<strong>' + d('Redo') + '</strong>'
              });
              this.buttons.attack.options = (new qx.ui.form.Button).set({
                width: 44,
                height: 40,
                appearance: 'button-text-small',
                icon: 'FactionUI/icons/icon_forum_properties.png',
                toolTipText: '<strong>' + d('Options') + '</strong>'
              });
              this.buttons.attack.options.addListener('click', this.toggleOptionsWindow, this);
              this.toolBar.add(this.buttons.attack.flipVertical, {
                top: 10,
                left: 10
              });
              this.toolBar.add(this.buttons.attack.flipHorizontal, {
                top: 10,
                left: 60
              });
              this.toolBar.add(this.buttons.attack.activateAll, {
                top: 10,
                left: 130
              });
              this.toolBar.add(this.buttons.attack.activateInfantry, {
                top: 10,
                left: 180
              });
              this.toolBar.add(this.buttons.attack.activateVehicles, {
                top: 10,
                left: 230
              });
              this.toolBar.add(this.buttons.attack.activateAir, {
                top: 10,
                left: 280
              });
              this.toolBar.add(this.buttons.attack.toolbarRefreshStats, {
                top: 10,
                left: 349
              });
              this.toolBar.add(this.buttons.attack.options, {
                top: 10,
                right: 10
              });
              this.toolBar.add(this.buttons.attack.repairMode, {
                top: 10,
                right: 60
              });
              this.toolBar.add(this.buttons.attack.toolbarShowStats, {
                top: 10,
                right: 110
              });
              this.toolBar.add(this.buttons.attack.toolbarRedo, {
                top: 10,
                right: 175
              });
              this.toolBar.add(this.buttons.attack.toolbarUndo, {
                top: 10,
                right: 225
              });
              this.toolBar.add(this.buttons.attack.formationReset, {
                top: 10,
                right: 275
              });
              this.userInterface && this._armyBar.remove(this.userInterface);
              if (this.options.rightSide.getValue()) var h =
              64,
              n = g,
              m = 5,
              q = 0,
              s = 30,
              w = 15,
              x = 15;
               else h = 90,
              n = f,
              m = 15,
              q = 16,
              s = 46,
              x = w = 30;
              this.userInterface = new qx.ui.container.Composite;
              this.userInterface.setLayout(new qx.ui.layout.Canvas);
              this.userInterface.setHeight(160);
              this.userInterface.setWidth(h);
              this.userInterface.set({
                decorator: (new qx.ui.decoration.Background).set({
                  backgroundImage: n
                })
              });
              this.options.rightSide.getValue() ? this._armyBar.add(this.userInterface, {
                top: 0,
                right: 53
              })  : this._armyBar.add(this.userInterface, {
                top: 0,
                left: 0
              });
              this.buttons.attack.simulate = new qx.ui.form.Button(d('Simulate'));
              this.buttons.attack.simulate.set({
                width: 58,
                appearance: 'button-text-small',
                toolTipText: d('Start Combat Simulation')
              });
              this.buttons.attack.simulate.addListener('click', this.startSimulation, this);
              this.buttons.attack.tools = new qx.ui.form.Button(d('Stats'));
              this.buttons.attack.tools.set({
                width: 58,
                appearance: 'button-text-small',
                toolTipText: d('Open Simulator Tools')
              });
              this.buttons.attack.tools.addListener('click', this.toggleTools, this);
              this.buttons.shiftFormationLeft = new qx.ui.form.Button('<');
              this.buttons.shiftFormationLeft.set({
                width: 30,
                appearance: 'button-text-small',
                toolTipText: d('Shift units left')
              });
              this.buttons.shiftFormationLeft.addListener('click', function () {
                this.shiftFormation('l')
              }, this);
              this.buttons.shiftFormationRight = new qx.ui.form.Button('>');
              this.buttons.shiftFormationRight.set({
                width: 30,
                appearance: 'button-text-small',
                toolTipText: d('Shift units right')
              });
              this.buttons.shiftFormationRight.addListener('click', function () {
                this.shiftFormation('r')
              }, this);
              this.buttons.shiftFormationUp = new qx.ui.form.Button('^');
              this.buttons.shiftFormationUp.set({
                width: 30,
                appearance: 'button-text-small',
                toolTipText: d('Shift units up')
              });
              this.buttons.shiftFormationUp.addListener('click', function () {
                this.shiftFormation('u')
              }, this);
              this.buttons.shiftFormationDown = new qx.ui.form.Button('v');
              this.buttons.shiftFormationDown.set({
                width: 30,
                appearance: 'button-text-small',
                toolTipText: d('Shift units down')
              });
              this.buttons.shiftFormationDown.addListener('click', function () {
                this.shiftFormation('d')
              }, this);
              var y = localStorage.ta_sim_showShift;
              if (y = y ? JSON.parse(localStorage.ta_sim_showShift)  :
              !0) this.userInterface.add(this.buttons.shiftFormationUp, {
                top: 16,
                right: w
              }),
              this.userInterface.add(this.buttons.shiftFormationLeft, {
                top: 35,
                right: s
              }),
              this.userInterface.add(this.buttons.shiftFormationRight, {
                top: 35,
                right: q
              }),
              this.userInterface.add(this.buttons.shiftFormationDown, {
                top: 54,
                right: x
              });
              this.userInterface.add(this.buttons.attack.tools, {
                top: 77,
                left: m
              });
              this.userInterface.add(this.buttons.attack.simulate, {
                top: 100,
                left: m
              })
            } catch (B) {
              console.log(B)
            }
          },
          getAttackUnits: function () {
            try {
              var b = this._MainData.get_Cities().get_CurrentOwnCity(),
              a = this._MainData.get_Cities().get_CurrentCity();
              if (null != a) {
                var c = a.get_Id(),
                e = b.get_CityArmyFormationsManager().GetFormationByTargetBaseId(c);
                this.view.lastUnits = e;
                this.view.lastUnitList = e.get_ArmyUnits().l
              }
              this.attackUnitsLoaded = !0
            } catch (d) {
              console.log(d)
            }
          },
          optionPopup: function () {
            localStorage.ta_sim_popup = JSON.stringify(this.options.autoDisplayStats.getValue())
          },
          optionShowShift: function () {
            localStorage.ta_sim_showShift = JSON.stringify(this.options.showShift.getValue());
            this.options.showShift.getValue() ?
            this.setupInterface()  : (this.userInterface.remove(this.buttons.shiftFormationUp), this.userInterface.remove(this.buttons.shiftFormationLeft), this.userInterface.remove(this.buttons.shiftFormationRight), this.userInterface.remove(this.buttons.shiftFormationDown))
          },
          optionAttackLock: function () {
            try {
              localStorage.ta_sim_attackLock = JSON.stringify(this.options.attackLock.getValue()),
              this.options.attackLock.getValue() ? this._armyBar.add(this.buttons.attack.unlock, {
                top: 108,
                right: 9
              })  : this._armyBar.remove(this.buttons.attack.unlock)
            } catch (b) {
              console.log(b)
            }
          },
          optionRepairLock: function () {
            try {
              localStorage.ta_sim_repairLock = JSON.stringify(this.options.repairLock.getValue()),
              this.options.repairLock.getValue() ? this._armyBar.add(this.buttons.attack.repair, {
                top: 16,
                right: 9
              })  : this._armyBar.remove(this.buttons.attack.repair)
            } catch (b) {
              console.log(b)
            }
          },
          toggleTools: function () {
            this.battleResultsBox.isVisible() ? this.battleResultsBox.close()  : this.battleResultsBox.open()
          },
          toggleOptionsWindow: function () {
            this.optionsWindow.isVisible() ? this.optionsWindow.close()  : this.optionsWindow.open()
          },
          getAllUnitsDeactivated: function () {
            for (var b = this.getFormation(), a = !1, c = 0; c < b.length; c++) if (b[c].e) {
              a = !0;
              break
            }
            return a ? !1 : !0
          },
          refreshStatistics: function () {
            try {
              var b = this._MainData.get_Cities().get_CurrentOwnCity();
              !this.getAllUnitsDeactivated() && 0 < b.GetOffenseConditionInPercent() && (this.timerStart(), ClientLib.API.Battleground.GetInstance().SimulateBattle(), this.buttons.attack.toolbarRefreshStats.setEnabled(!1), this.buttons.attack.simulate.setEnabled(!1), this.labels.countDown.setWidth(110), this.count =
              10, this.statsOnly = !0)
            } catch (a) {
              console.log(a)
            }
          },
          countDownToNextSimulation: function () {
            try {
              var b = window.TACS.getInstance();
              b.count -= 1;
              b.labels.countDown.setWidth(b.labels.countDown.getWidth() - 11);
              0 >= b.count && (clearInterval(b.counter), b.buttons.attack.toolbarRefreshStats.setEnabled(!0), b.warningIcon && (b._armyBar.remove(b.simulationWarning), b.warningIcon = !1))
            } catch (a) {
              console.log(a)
            }
          },
          formationChangeHandler: function () {
            try {
              0 == this.labels.countDown.getWidth() || this.warningIcon || (this.simulationWarning =
              new qx.ui.basic.Image('https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/d75cf9c68c248256dfb416d8b7a86037.png'), this.simulationWarning.set({
                toolTipText: d('Simulation will be based on most recently refreshed stats!')
              }), this.options.rightSide.getValue() ? this._armyBar.add(this.simulationWarning, {
                top: 122,
                right: 67
              })  : this._armyBar.add(this.simulationWarning, {
                top: 122,
                left: 27
              }), this.warningIcon = !0)
            } catch (b) {
              console.log(b)
            }
          },
          calculateLoot: function () {
            try {
              var b = {
                1: 0,
                2: 0,
                3: 0,
                6: 0,
                7: 0
              },
              a = ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity(),
              c;
              for (c in a) b[a[c].Type] += a[c].Count;
              this.stats.spoils.tiberium.setLabel(this.formatNumberWithCommas(b[1]));
              this.stats.spoils.crystal.setLabel(this.formatNumberWithCommas(b[2]));
              this.stats.spoils.credit.setLabel(this.formatNumberWithCommas(b[3]));
              this.stats.spoils.research.setLabel(this.formatNumberWithCommas(b[6]))
            } catch (e) {
              console.log(e)
            }
          },
          getRepairCost: function (b, a, c, e, d) {
            if (b != a) {
              b = ClientLib.API.Util.GetUnitRepairCosts(e, d, 0 < a ? (b - a) / 16 / c : b / 16 / c);
              for (c = a = 0; c < b.length; c++) switch (e = b[c], parseInt(e.Type)) {
                case ClientLib.Base.EResourceType.RepairChargeBase:
                case ClientLib.Base.EResourceType.RepairChargeInf:
                case ClientLib.Base.EResourceType.RepairChargeVeh:
                case ClientLib.Base.EResourceType.RepairChargeAir:
                  a +=
                  e.Count
              }
              return a
            }
            return 0
          },
          setLabelColor: function (b, a, c) {
            var e = [
              'green',
              'blue',
              'black',
              'red'
            ],
            d = e[0];
            0 <= c && (a = 100 - a);
            99.99 < a ? d = e[3] : 50 < a ? d = e[2] : 0 < a && (d = e[1]);
            b.setTextColor(d)
          },
          updateLabel100: function (b, a, c) {
            this.setLabelColor(b, a, c);
            a = Math.ceil(100 * a) / 100;
            b.setValue(a.toFixed(2).toString())
          },
          updateLabel100time: function (b, a, c, e) {
            e = a.toFixed(2).toString() + ' @ ' + phe.cnc.Util.getTimespanString(e);
            this.setLabelColor(b, a, c);
            b.setValue(e)
          },
          updateStatsWindow: function () {
            var b = this,
            a = '',
            c = 0;
            0 === this.stats.damage.structures.construction ? (a = d('Total Victory'), c = 0)  : 100 > this.stats.damage.structures.overall ? (a = d('Victory'), c = 1)  : (a = d('Total Defeat'), c = 3);
            this.labels.damage.outcome.setValue(a);
            this.labels.damage.outcome.setTextColor(['black',
            'blue',
            'green',
            'red'][c]);
            this.updateLabel100(this.labels.damage.overall, this.stats.damage.overall, - 1);
            this.updateLabel100(this.labels.damage.units.overall, this.stats.damage.units.overall, - 1);
            this.updateLabel100(this.labels.damage.structures.overall, this.stats.damage.structures.overall, - 1);
            this.updateLabel100(this.labels.damage.structures.construction, this.stats.damage.structures.construction, - 1);
            this.updateLabel100(this.labels.damage.structures.defense, this.stats.damage.structures.defense, - 1);
            this.view.playerCity ? this.updateLabel100(this.labels.damage.structures.command, this.stats.damage.structures.command, - 1)  : (this.labels.damage.structures.command.setValue('--'), this.labels.damage.structures.command.setTextColor('green'));
            a = 0 < this.stats.supportLevel ? this.stats.supportLevel.toString()  : '--';
            this.labels.supportLevel.setValue(d('Support lvl ') + a +
            ': ');
            this.updateLabel100(this.labels.damage.structures.support, this.stats.damage.structures.support, - 1);
            this.labels.repair.available.setValue(phe.cnc.Util.getTimespanString(this.stats.repair.available));
            this.labels.attacks.available.setValue('CP:' + this.stats.attacks.availableAttacksCP + ' / F:' + this.stats.attacks.availableAttacksAtFullStrength + '/ C:' + this.stats.attacks.availableAttacksWithCurrentRepairCharges);
            this.updateLabel100time(this.labels.health.overall, this.stats.health.overall, 1, this.stats.repair.overall);
            this.updateLabel100time(this.labels.health.infantry, this.stats.health.infantry, 1, this.stats.repair.infantry);
            this.updateLabel100time(this.labels.health.vehicle, this.stats.health.vehicle, 1, this.stats.repair.vehicle);
            this.updateLabel100time(this.labels.health.aircraft, this.stats.health.aircraft, 1, this.stats.repair.aircraft);
            setTimeout(function () {
              b.stats.time = b._VisMain.get_Battleground().get_BattleDuration() / 1000;
              b.setLabelColor(b.labels.time, b.stats.time / 120, - 1);
              b.labels.time.setValue(b.stats.time.toFixed(2).toString())
            }, 1)
          },
          formatNumberWithCommas: function (b) {
            return Math.floor(b).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          },
          unlockAttacks: function () {
            this._armyBar.remove(this.buttons.attack.unlock);
            var b = this;
            setTimeout(function () {
              b._armyBar.add(b.buttons.attack.unlock)
            }, 2000)
          },
          unlockRepairs: function () {
            this._armyBar.remove(this.buttons.attack.repair);
            var b = this;
            setTimeout(function () {
              b._armyBar.add(b.buttons.attack.repair)
            }, 5000)
          },
          calculateDefenseBonus: function (b, a) {
            try {
              this.view.playerCityDefenseBonus = Math.round(ClientLib.Base.PointOfInterestTypes.GetTotalBonusByType(ClientLib.Base.EPOIType.DefenseBonus, a.rpois[6].r, a.rpois[6].s))
            } catch (c) {
              console.log(c)
            }
          },
          hideAll: function () {
            this.buttons.attack.repairMode.getValue() && this.buttons.attack.repairMode.execute();
            this.battleResultsBox.isVisible() && this.battleResultsBox.close()
          },
          gameOverlaysToFront: function () {
            webfrontend.gui.reports.ReportsOverlay.getInstance().setZIndex(20);
            webfrontend.gui.mail.MailOverlay.getInstance().setZIndex(20);
            webfrontend.gui.alliance.AllianceOverlay.getInstance().setZIndex(20);
            webfrontend.gui.forum.ForumOverlay.getInstance().setZIndex(20);
            webfrontend.gui.research.ResearchOverlay.getInstance().setZIndex(20);
            webfrontend.gui.monetization.ShopOverlay.getInstance().setZIndex(20);
            webfrontend.gui.ranking.RankingOverlay.getInstance().setZIndex(20)
          },
          ownCityChangeHandler: function (b, a) {
            console.log('CurrentOwnChange event');
            this._armyBarContainer.isVisible() && (this.buttons.attack.toolbarRefreshStats.setEnabled(!1), this.buttons.attack.simulate.setEnabled(!1), this.onCityLoadComplete(), this.resetDisableButtons());
            this.updateSaveMarkers()
          },
          viewChangeHandler: function (b, a) {
            this.curViewMode = a;
            this.buttons.attack.simulate.setEnabled(!1);
            this.buttons.attack.toolbarRefreshStats.setEnabled(!1);
            try {
              switch (this.hideAll(), a) {
                case ClientLib.Vis.Mode.Battleground:
                  this.curPAVM = qx.core.Init.getApplication().getPlayArea().getViewMode();
                  this.onCityLoadComplete();
                  break;
                case ClientLib.Vis.Mode.CombatSetup:
                  this.curPAVM = qx.core.Init.getApplication().getPlayArea().getViewMode(),
                  this.onCityLoadComplete()
              }
            } catch (c) {
              console.log(c)
            }
          },
          resetDisableButtons: function () {
            try {
              this.buttons.attack.activateInfantry.getValue(!0) &&
              this.buttons.attack.activateInfantry.setValue(!1),
              this.buttons.attack.activateVehicles.getValue(!0) && this.buttons.attack.activateVehicles.setValue(!1),
              this.buttons.attack.activateAir.getValue(!0) && this.buttons.attack.activateAir.setValue(!1)
            } catch (b) {
              console.log(b)
            }
          },
          onCityLoadComplete: function () {
            try {
              var b = this;
              if (this._VisMain.GetActiveView().get_VisAreaComplete()) {
                if (setTimeout(function () {
                  var a = ClientLib.Vis.VisMain.GetInstance().get_CombatSetup();
                  a.SetPosition(0, a.get_MinYPosition() + a.get_DefenseOffsetY() *
                  a.get_GridHeight())
                }, 500), this.checkAttackRange(), 3 < this.curPAVM) {
                  this.showCombatTools();
                  var a = this._MainData.get_Cities().get_CurrentCity();
                  if (null != a) {
                    var c = this._MainData.get_Cities().get_CurrentOwnCity();
                    this.stats.attacks.attackCost = c.CalculateAttackCommandPointCostToCoord(a.get_PosX(), a.get_PosY());
                    this.getAvailableRepairAndCP();
                    this.calculateLoot();
                    this.updateLayoutsList();
                    this.getAttackUnits();
                    if (null != this.targetCityId && this.targetCityId !== a.get_Id()) {
                      this.labels.repair.available.setValue(phe.cnc.Util.getTimespanString(this.stats.repair.available));
                      this.labels.attacks.available.setValue('CP:' + this.stats.attacks.availableAttacksCP + ' / F:' + this.stats.attacks.availableAttacksAtFullStrength + '/ C:-');
                      this.resetDisableButtons();
                      var e = a.get_CityFaction();
                      this.view.playerCity = e === ClientLib.Base.EFactionType.GDIFaction || e === ClientLib.Base.EFactionType.NODFaction;
                      if (this.view.playerCity) {
                        var d = a.get_OwnerAllianceId();
                        ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand('GetPublicAllianceInfo', {
                          id: d
                        }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.calculateDefenseBonus), null)
                      }
                    }
                    this.targetCityId = a.get_Id()
                  }
                }
              } else setTimeout(function () {
                b.onCityLoadComplete()
              }, 200)
            } catch (f) {
              console.log(f)
            }
          },
          showCombatTools: function () {
            this.curPAVM = qx.core.Init.getApplication().getPlayArea().getViewMode();
            switch (this.curPAVM) {
              case ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupBase:
                console.log('!!!\n TACS Warning\n!!!\n onCityLoadComplete, unexpected case pavmCombatSetupBase');
                break;
              case ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense:
                this.options.autoDisplayStats.getValue() &&
                this.battleResultsBox.open();
                break;
              case ClientLib.Data.PlayerAreaViewMode.pavmCombatAttacker:
                this.options.autoDisplayStats.getValue() && this.saveObj.checkbox.showStatsDuringAttack && this.battleResultsBox.open();
                break;
              case ClientLib.Data.PlayerAreaViewMode.pavmCombatViewerAttacker:
                console.log('pavmCombatViewerAttacker');
                break;
              case ClientLib.Data.PlayerAreaViewMode.pavmCombatViewerDefender:
                console.log('pavmCombatViewerDefender');
                break;
              case ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay:
                this.saveObj.checkbox.showStatsDuringSimulation && (console.log('simulation case 10'), this.battleResultsBox.open())
            }
          },
          getAvailableRepairAndCP: function () {
            try {
              var b = this._MainData.get_Cities().get_CurrentOwnCity(),
              a = b.GetOffenseConditionInPercent(),
              c = b.get_CityUnitsData(),
              e = c.GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, !1),
              d = c.GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, !1),
              f = c.GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, !1);
              this.stats.repair.available = ClientLib.Base.Resource.GetResourceCount(b.get_RepairOffenseResources().get_RepairChargeOffense());
              this.stats.repair.max = this._MainData.get_Time().GetTimeSpan(Math.max(e, f, d));
              this.stats.attacks.availableCP = this._MainData.get_Player().GetCommandPointCount();
              this.stats.attacks.availableAttacksCP = Math.floor(this.stats.attacks.availableCP / this.stats.attacks.attackCost);
              this.stats.attacks.availableAttacksAtFullStrength = Math.floor(this.stats.repair.available / this.stats.repair.max) + 1;
              this.stats.attacks.availableAttacksWithCurrentRepairCharges = Math.floor(this.stats.repair.available / this.stats.repair.overall) +
              1;
              100 !== a && (this.stats.attacks.availableAttacksAtFullStrength--, this.stats.attacks.availableAttacksAtFullStrength += '*')
            } catch (g) {
              console.log(g)
            }
          },
          returnSetup: function () {
            try {
              this._Application.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, localStorage.ta_sim_last_city, 0, 0)
            } catch (b) {
              this._Application.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, localStorage.ta_sim_last_city, 0, 0),
              console.log(b)
            }
          },
          checkAttackRange: function () {
            try {
              var b =
              this._MainData.get_Cities(),
              a = b.get_CurrentCity();
              if (null != a) {
                var c = b.get_CurrentOwnCity();
                10 >= ClientLib.Base.Util.CalculateDistance(a.get_PosX(), a.get_PosY(), c.get_PosX(), c.get_PosY()) && (this.buttons.attack.simulate.setEnabled(!0), 0 >= this.count && this.buttons.attack.toolbarRefreshStats.setEnabled(!0))
              }
            } catch (e) {
              console.log(e)
            }
          },
          skipSimulation: function () {
            try {
              for (; this._VisMain.get_Battleground().get_Simulation().DoStep(!1); );
              this._VisMain.get_Battleground().set_ReplaySpeed(1)
            } catch (b) {
              console.log(b)
            }
          },
          startSimulation: function () {
            try {
              if (10000 < Date.now() - this.lastSimulation) {
                var b = this._MainData.get_Cities().get_CurrentOwnCity();
                !this.getAllUnitsDeactivated() && 0 < b.GetOffenseConditionInPercent() && (ClientLib.API.Battleground.GetInstance().SimulateBattle(), this.buttons.attack.toolbarRefreshStats.setEnabled(!1), this.buttons.attack.simulate.setEnabled(!1), this.labels.countDown.setWidth(110), this.count = 10, this.statsOnly = !1)
              } else this.enterSimulationView(),
              this._VisMain.get_Battleground().RestartReplay(),
              this._VisMain.get_Battleground().set_ReplaySpeed(1)
            } catch (a) {
              console.log(a)
            }
          },
          onSimulateBattleFinishedEvent: function (b) {
            this.timerEnd('onSimulateBattleFinishedEvent');
            try {
              this.statsOnly || (this.enterSimulationView(), setTimeout(function () {
                ClientLib.Vis.VisMain.GetInstance().get_Battleground().set_ReplaySpeed(1)
              }, 1));
              var a = 0,
              c = 0,
              e = 0,
              d = 0,
              f = 0,
              g = 0,
              k = 0,
              h = 0,
              n = 0,
              m = 0,
              q = 0,
              s = 0,
              w = 0,
              x = 0,
              y = 0,
              B = 0,
              t = 0;
              this.stats.damage.structures.defense = 0;
              this.stats.damage.structures.construction = 0;
              this.stats.damage.structures.command =
              0;
              this.stats.supportLevel = 0;
              this.stats.damage.structures.support = 0;
              this.stats.repair.infantry = 0;
              this.stats.repair.vehicle = 0;
              this.stats.repair.aircraft = 0;
              this.lastSimulation = Date.now();
              10 == this.count && (this.counter = setInterval(this.countDownToNextSimulation, 1000));
              for (var u = 0; u < b.length; u++) {
                var D = b[u].Value,
                z = D.t,
                v = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(z),
                C = v.pt,
                F = v.mt,
                A = D.l,
                E = D.sh,
                r = D.h,
                p = ClientLib.API.Util.GetUnitMaxHealthByLevel(A, v, !1);
                switch (C) {
                  case ClientLib.Base.EPlacementType.Defense:
                    if (this.view.playerCity) var H =
                    this.view.playerCityDefenseBonus,
                    I = ClientLib.Base.Util.GetNerfAndBoostModifier(A, H),
                    p = Math.floor(p * I / 100 * 16) / 16;
                    k += p;
                    h += r;
                    e += p;
                    d += r;
                    break;
                  case ClientLib.Base.EPlacementType.Offense:
                    a += p;
                    c += r;
                    switch (F) {
                      case ClientLib.Base.EUnitMovementType.Feet:
                        x += p;
                        n += r;
                        y += this.getRepairCost(E, r, p, A, z);
                        break;
                      case ClientLib.Base.EUnitMovementType.Wheel:
                      case ClientLib.Base.EUnitMovementType.Track:
                        s += p;
                        m += r;
                        t += this.getRepairCost(E, r, p, A, z);
                        break;
                      case ClientLib.Base.EUnitMovementType.Air:
                      case ClientLib.Base.EUnitMovementType.Air2:
                        w +=
                        p,
                        q += r,
                        B += this.getRepairCost(E, r, p, A, z)
                    }
                    break;
                  case ClientLib.Base.EPlacementType.Structure:
                    this.view.playerCity && (H = this.view.playerCityDefenseBonus, I = ClientLib.Base.Util.GetNerfAndBoostModifier(A, H), p = Math.floor(p * I / 100 * 16) / 16),
                    f += p,
                    g += r,
                    e += p,
                    d += r
                  }
                  if (200 <= z && 205 >= z) this.stats.supportLevel = A,
                  this.stats.damage.structures.support = r / 16 / p * 100;
                   else switch (z) {
                    case 131:
                    case 158:
                    case 195:
                      this.stats.damage.structures.defense = 0 < E ? r / 16 / p * 100 : 0;
                      break;
                    case 112:
                    case 151:
                    case 177:
                      this.stats.damage.structures.construction =
                      r / 16 / p * 100;
                      break;
                    case 111:
                    case 159:
                      this.stats.damage.structures.command = r / 16 / p * 100
                  }
                }
                this.stats.health.infantry = x ? n / 16 / x * 100 : 100;
                this.stats.health.vehicle = s ? m / 16 / s * 100 : 100;
                this.stats.health.aircraft = w ? q / 16 / w * 100 : 100;
                this.stats.damage.units.overall = k ? h / 16 / k * 100 : 0;
                this.stats.damage.structures.overall = g / 16 / f * 100;
                this.stats.damage.overall = d / 16 / e * 100;
                this.stats.health.overall = c ? c / 16 / a * 100 : 0;
                this.stats.repair.infantry = this._MainData.get_Time().GetTimeSpan(y);
                this.stats.repair.aircraft = this._MainData.get_Time().GetTimeSpan(B);
                this.stats.repair.vehicle = this._MainData.get_Time().GetTimeSpan(t);
                this.stats.repair.overall = this._MainData.get_Time().GetTimeSpan(Math.max(y, B, t));
                this.getAvailableRepairAndCP();
                this.updateStatsWindow();
                this.buttons.attack.simulate.setEnabled(!0)
            } catch (G) {
              console.log('onSimulateBattleFinishedEvent()\n check getRepairCost()', G)
          }
        },
        enterSimulationView: function () {
          try {
            var b = this._MainData.get_Cities().get_CurrentCity();
            this._MainData.get_Cities().get_CurrentOwnCity().get_CityArmyFormationsManager().set_CurrentTargetBaseId(b.get_Id());
            localStorage.ta_sim_last_city = b.get_Id();
            this._Application.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, b.get_Id(), 0, 0)
          } catch (a) {
            console.log(a)
          }
        },
        saveUndoState: function () {
          var b = this.getFormation(),
          a = this.getTimestamp(),
          c = this.badClone(this.stats);
          this.undoCache[0] = {
            f: b,
            t: a,
            s: c
          };
          console.log(this.undoCache[0])
        },
        wipeUndoStateAfter: function (b) {
          var a;
          for (a = 0; a < this.undoCache.length && !(this.undoCache[a].t > b); a++);
          this.undoCache = this.undoCache.slice(0, a)
        },
        updateLayoutsList: function () {
          try {
            if (this.layouts.list.removeAll(), this.loadCityLayouts(), this.layouts.current) for (var b in this.layouts.current) {
              var a = this.layouts.current[b],
              c = new qx.ui.form.ListItem(a.label, null, a.id);
              this.layouts.list.add(c)
            }
          } catch (e) {
            console.log(e)
          }
        },
        deleteCityLayout: function () {
          try {
            var b = this.layouts.list.getSelection();
            if (null != b && 0 < b.length) {
              var a = b[0].getModel();
              this.layouts.current && 'undefined' !== typeof this.layouts.current[a] && (delete this.layouts.current[a], this.saveLayouts(), this.updateLayoutsList(), this.updateSaveMarkers())
            }
          } catch (c) {
            console.log(c)
          }
        },
        loadCityLayout: function (b) {
          try {
            var a = this.layouts.list.getSelection();
            if (null != a && 0 < a.length) {
              var c = 'object' === typeof b ? a[0].getModel()  : b;
              this.layouts.current && 'undefined' !== typeof this.layouts.current[c] && this.loadFormation(this.layouts.current[c].layout)
            }
          } catch (e) {
            console.log(e)
          }
        },
        saveCityLayout: function () {
          var b = [
          ],
          a,
          c;
          try {
            b = this.getFormation(),
            a = (new Date).getTime().toString(),
            c = null !== this.stats.damage.structures.construction ? this.layouts.label.getValue() + ' (' + this.stats.damage.structures.construction.toFixed(0).toString() +
            ':' + this.stats.damage.structures.defense.toFixed(0).toString() + ':' + this.stats.damage.units.overall.toFixed(0).toString() + ')' : this.layouts.label.getValue() + ' (??:??:??)',
            this.layouts.current[a] = {
              id: a,
              label: c,
              layout: b
            },
            this.saveLayouts(),
            this.updateLayoutsList(),
            this.updateSaveMarkers(),
            this.layouts.label.setValue('')
          } catch (e) {
            console.log(e)
          }
          return a
        },
        loadCityLayouts: function () {
          try {
            if (null != this._MainData.get_Cities().get_CurrentCity()) {
              var b = this._MainData.get_Cities().get_CurrentCity().get_Id(),
              a =
              this._MainData.get_Cities().get_CurrentOwnCity().get_Id();
              this.layouts.all.hasOwnProperty(b) || (this.layouts.all[b] = {
              });
              this.layouts.all[b].hasOwnProperty(a) || (this.layouts.all[b][a] = {
              });
              this.layouts.current = this.layouts.all[b][a]
            }
          } catch (c) {
            console.log(c)
          }
        },
        loadLayouts: function () {
          try {
            var b = localStorage.ta_sim_layouts;
            this.layouts.all = b ? JSON.parse(b)  : {
            }
          } catch (a) {
            console.log(a)
          }
        },
        saveLayouts: function () {
          try {
            localStorage.ta_sim_layouts = JSON.stringify(this.layouts.all)
          } catch (b) {
            console.log(b)
          }
        },
        loadFormation: function (b) {
          try {
            this.layouts.restore =
            !0;
            for (var a = 0; a < b.length; a++) {
              var c = b[a];
              a == b.length - 1 && (this.layouts.restore = !1);
              for (var e = 0; e < this.view.lastUnitList.length; e++) this.view.lastUnitList[e].get_Id() === c.id && (this.view.lastUnitList[e].MoveBattleUnit(c.x, c.y), void 0 === c.e ? this.view.lastUnitList[e].set_Enabled(!0)  : this.view.lastUnitList[e].set_Enabled(c.e))
            }
          } catch (d) {
            console.log(d)
          }
        },
        getFormation: function () {
          var b = [
          ];
          try {
            for (var a = 0; a < this.view.lastUnitList.length; a++) {
              var c = this.view.lastUnitList[a],
              e = {
              };
              e.x = c.get_CoordX();
              e.y = c.get_CoordY();
              e.id = c.get_Id();
              e.e = c.get_Enabled();
              b.push(e)
            }
          } catch (d) {
            console.log(d)
          }
          return b
        },
        shiftFormation: function (b) {
          var a = [
          ],
          c = 0,
          e = 0;
          'u' === b && (c = - 1);
          'd' === b && (c = 1);
          'l' === b && (e = - 1);
          'r' === b && (e = 1);
          for (b = 0; b < this.view.lastUnitList.length; b++) {
            var d = this.view.lastUnitList[b],
            f = {
            },
            g = d.get_CoordX() + e;
            switch (g) {
              case 9:
                g = 0;
                break;
              case - 1:
                g = 8
            }
            var k = d.get_CoordY() + c;
            switch (k) {
              case 4:
                k = 0;
                break;
              case - 1:
                k = 3
            }
            f.x = g;
            f.y = k;
            f.id = d.get_Id();
            f.e = d.get_Enabled();
            a.push(f)
        }
        this.loadFormation(a)
      },
      flipFormation: function (b) {
        var a =
        [
        ];
        try {
          for (var c = 0; c < this.view.lastUnitList.length; c++) {
            var e = this.view.lastUnitList[c],
            d = {
            },
            f = e.get_CoordX(),
            g = e.get_CoordY();
            'horizontal' === b ? f = Math.abs(f - 8)  : 'vertical' === b && (g = Math.abs(g - 3));
            d.x = f;
            d.y = g;
            d.id = e.get_Id();
            d.e = e.get_Enabled();
            a.push(d)
          }
          this.loadFormation(a)
        } catch (k) {
          console.log(k)
        }
      },
      activateUnits: function (b, a) {
        var c = [
        ];
        try {
          for (var e = 0; e < this.view.lastUnitList.length; e++) {
            var d = this.view.lastUnitList[e],
            f = {
            };
            switch (b) {
              case 'air':
                d.get_UnitGameData_Obj().mt !== ClientLib.Base.EUnitMovementType.Air &&
                d.get_UnitGameData_Obj().mt !== ClientLib.Base.EUnitMovementType.Air2 || d.set_Enabled(a);
                break;
              case 'infantry':
                d.get_UnitGameData_Obj().mt === ClientLib.Base.EUnitMovementType.Feet && d.set_Enabled(a);
                break;
              case 'vehicles':
                d.get_UnitGameData_Obj().mt !== ClientLib.Base.EUnitMovementType.Wheel && d.get_UnitGameData_Obj().mt !== ClientLib.Base.EUnitMovementType.Track || d.set_Enabled(a)
            }
            f.x = d.get_CoordX();
            f.y = d.get_CoordY();
            f.e = d.get_Enabled();
            f.id = d.get_Id();
            c.push(f)
          }
          this.loadFormation(c)
        } catch (g) {
          console.log(g)
        }
      },
      resetFormation: function () {
        var b = [
        ];
        try {
          for (var a = 0; a < this.view.lastUnitList.length; a++) {
            var c = this.view.lastUnitList[a],
            e = {
            };
            e.x = c.GetCityUnit().get_CoordX();
            e.y = c.GetCityUnit().get_CoordY();
            e.id = c.get_Id();
            b.push(e)
          }
          this.loadFormation(b);
          this.buttons.attack.activateInfantry.getValue(!0) && this.buttons.attack.activateInfantry.setValue(!1);
          this.buttons.attack.activateVehicles.getValue(!0) && this.buttons.attack.activateVehicles.setValue(!1);
          this.buttons.attack.activateAir.getValue(!0) && this.buttons.attack.activateAir.setValue(!1)
        } catch (d) {
          console.log(d)
        }
      },
      playSound: function (b, a) {
        var c = a.audio[b].cloneNode(!0);
        c.volume = a.getAudioSettings().ui / 100;
        c.play()
      },
      getAudioSettings: function () {
        return JSON.parse(localStorage.getItem('CNC_Audio'))
      },
      repairUnit: function () {
        try {
          ClientLib.Net.CommunicationManager.GetInstance().SendCommand('Repair', {
            cityid: this.ownCityId,
            entityId: this.unitId,
            mode: 4
          }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, window.TACS.getInstance().repairResult), this.buttonId, !0)
        } catch (b) {
          console.log(b)
        }
      },
      repairResult: function (b, a) {
        try {
          if (a) {
            var c = window.TACS.getInstance();
            c.saveObj.audio.playRepairSound && ('Inf' == c.repairButtons[b].unitType ? c.playSound('soundRepairReload', c)  : c.playSound('soundRepairImpact', c));
            c._armyBar.remove(c.repairButtons[b]);
            delete c.repairButtons[b]
          }
        } catch (e) {
          console.log(e)
        }
      },
      removeAllRepairButtons: function () {
        for (var b in this.repairButtons) this._armyBar.remove(this.repairButtons[b]);
        this.repairButtons = [
        ]
      },
      setResizeTimer: function () {
        var b = this;
        this.repairButtonsRedrawTimer && clearTimeout(b.repairButtonsRedrawTimer);
        this.repairButtonsRedrawTimer = setTimeout(function () {
          b.redrawRepairButtons(b)
        }, 500)
      },
      redrawRepairButtons: function (b) {
        b = b || this;
        var a = b._MainData.get_Cities().get_CurrentOwnCity().get_Id();
        0 < b.repairButtons.length && b.removeAllRepairButtons();
        for (var c = b._VisMain.get_CombatSetup(), e = c.get_ZoomFactor(), d = Math.round(c.get_MinXPosition() * e * - 1) + 10, c = Math.round(c.get_GridWidth() * e), e = 0; e < b.view.lastUnitList.length; e++) {
          var f = b.view.lastUnitList[e];
          if (1 > f.get_HitpointsPercent()) {
            var g = f.GetCityUnit().GetResourceCostForFullRepair().d,
            k,
            h,
            n,
            m;
            for (m in g) switch (m = parseInt(m), m) {
              case ClientLib.Base.EResourceType.Crystal:
                k = g[m];
                break;
              case ClientLib.Base.EResourceType.RepairChargeInf:
                h = g[m];
                n = 'Inf';
                break;
              case ClientLib.Base.EResourceType.RepairChargeVeh:
                h = g[m];
                n = 'Veh';
                break;
              case ClientLib.Base.EResourceType.RepairChargeAir:
                h = g[m],
                n = 'Air'
            }
            h = phe.cnc.Util.getTimespanString(b._MainData.get_Time().GetTimeSpan(h));
            k = b.formatNumberWithCommas(k);
            b.repairButtons[e] = new qx.ui.form.Button('', 'data:image/png;base64,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%3D%3D');
            b.repairButtons[e].set({
              decorator: (new qx.ui.decoration.Background).set({
                backgroundColor: 'transparent'
              }),
              width: c,
              height: 38,
              show: 'icon',
              center: !1,
              padding: 3,
              appearance: 'button-text-small',
              cursor: 'pointer',
              toolTipText: 'Crystal: ' + k + ' / Time: ' + h + ' / Type: ' + n
            });
            b.repairButtons[e].addListener('execute', b.repairUnit, {
              ownCityId: a,
              unitId: f.get_Id(),
              buttonId: e,
              frm: b
            });
            b.repairButtons[e].unitType = n;
            b._armyBar.add(b.repairButtons[e], {
              left: d + c * f.get_CoordX(),
              top: 7 + 38 * f.get_CoordY()
            })
          }
        }
      },
      toggleRepairMode: function () {
        try {
          this.audio.soundRepairImpact || (this.audio.soundRepairImpact = new Audio(window.soundRepairImpact.d), this.audio.soundRepairReload = new Audio(window.soundRepairReload.d), this.audio.soundRepairImpact.volume = this.getAudioSettings().ui / 100, this.audio.soundRepairReload.volume = this.getAudioSettings().ui / 100),
          this._armyBar.getLayoutParent().toggleEnabled(),
          this._armyBar.setEnabled(!0),
          this.userInterface.toggleEnabled(),
          this.battleResultsBox.toggleEnabled(),
          this.buttons.attack.repairMode.getValue() ? (this.redrawRepairButtons(), this._armyBar.addListener('resize', this.setResizeTimer, this), this.repairInfo.show(), this.updateRepairTimeInfobox(), this.repairModeTimer = setInterval(this.updateRepairTimeInfobox, 1000))  : (this.removeAllRepairButtons(), this._armyBar.removeListener('resize', this.setResizeTimer, this), this.repairInfo.hide(), clearInterval(this.repairModeTimer))
        } catch (b) {
          console.log(b)
        }
      },
      updateRepairTimeInfobox: function () {
        try {
          var b = window.TACS.getInstance(),
          a = b._MainData.get_Cities().get_CurrentOwnCity(),
          c = a.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
          e = a.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),
          d = a.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
          b.stats.repair.available = ClientLib.Base.Resource.GetResourceCount(a.get_RepairOffenseResources().get_RepairChargeOffense());
          b.labels.repairinfos.available.setValue(phe.cnc.Util.getTimespanString(b.stats.repair.available));
          b.labels.repairinfos.infantry.setValue(phe.cnc.Util.getTimespanString(c - b.stats.repair.available));
          b.labels.repairinfos.vehicle.setValue(phe.cnc.Util.getTimespanString(e -
          b.stats.repair.available));
          b.labels.repairinfos.aircraft.setValue(phe.cnc.Util.getTimespanString(d - b.stats.repair.available))
        } catch (f) {
          console.log(f)
        }
      },
      resetDblClick: function () {
        try {
          var b = window.TACS.getInstance();
          clearInterval(b.armybarClearnClickCounter);
          b.armybarClickCount = 0
        } catch (a) {
          console.log(a)
        }
      },
      updateSaveMarkers: function () {
        try {
          if (this.options.markSavedTargets.getValue()) {
            var b = this._MainData.get_Cities().get_CurrentOwnCity(),
            a = b.get_Id(),
            c = b.get_X(),
            d = b.get_Y(),
            l = this._VisMain.get_Region(),
            f = this._MainData.get_Server().get_MaxAttackDistance() + 0.1;
            switch (this._MainData.get_Player().get_Faction()) {
              case ClientLib.Base.EFactionType.GDIFaction:
                var g = ClientLib.Vis.EBackgroundPlateColor.Orange;
                break;
              case ClientLib.Base.EFactionType.NODFaction:
                g = ClientLib.Vis.EBackgroundPlateColor.Cyan
            }
            for (b = c - f; b < c + f; b++) for (var k = d - f; k < d + f; k++) {
              var h = l.GetObjectFromPosition(b * l.get_GridWidth(), k * l.get_GridHeight());
              if (!(null == h || h.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp && h.get_VisObjectType() !=
              ClientLib.Vis.VisObject.EObjectType.RegionCityType && h.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.RegionNPCBase || h.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp && h.get_IsDestroyed() || h.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType && h.IsOwnBase())) {
                h.get_BasePlate().setPlateColor(ClientLib.Vis.EBackgroundPlateColor.Black);
                var n = h.get_Id();
                if (this.layouts.all.hasOwnProperty(n) && this.layouts.all[n].hasOwnProperty(a)) {
                  var m = 0,
                  q;
                  for (q in this.layouts.all[n][a]) this.layouts.all[n][a].hasOwnProperty(q) &&
                  m++;
                  0 < m && h.get_BasePlate().setPlateColor(g)
                }
              }
          }
        }
      } catch (s) {
        console.log(s)
      }
    },
    getDateFromMillis: function (b) {
      return new Date(b)
    },
    getTimestamp: function () {
      return (new Date).getTime()
    },
    timerStart: function () {
      this.ts1 = this.getTimestamp()
    },
    timerEnd: function (b) {
      b = b || 'nullName';
      this.ts2 = this.getTimestamp();
      console.log(this.ts2 - this.ts1 + 'ms to run ' + b)
    },
    badClone: function (b) {
      return JSON.stringify(b)
    }
  }
})
}
function u() {
try {
  if ('undefined' !== typeof qx) {
    var b = qx.core.Init.getApplication(),
    a = qx.core.Init.getApplication().getMenuBar(),
    c = ClientLib.Vis.VisMain.GetInstance(),
    d = ClientLib.Data.MainData.GetInstance();
    if (b && a && c && d && 'undefined' !== typeof PerforceChangelist) if (10 < F || 'undefined' !== typeof CCTAWrapper_IsInstalled) {
      t();
      window.TACS.getInstance().initialize();
      if (392583 <= PerforceChangelist) {
        var l = ClientLib.Data.Cities.prototype.get_CurrentCity.toString(),
        f;
        for (f in ClientLib.Data.Cities.prototype) if (ClientLib.Data.Cities.prototype.hasOwnProperty(f) && 'function' === typeof ClientLib.Data.Cities.prototype[f] && - 1 < ClientLib.Data.Cities.prototype[f].toString().indexOf(l) &&
        6 == f.length) {
          l = f;
          break
        }
        var g = ClientLib.Data.Cities.prototype.get_CurrentOwnCity.toString(),
        k;
        for (k in ClientLib.Data.Cities.prototype) if (ClientLib.Data.Cities.prototype.hasOwnProperty(k) && 'function' === typeof ClientLib.Data.Cities.prototype[k] && - 1 < ClientLib.Data.Cities.prototype[k].toString().indexOf(g) && 6 == k.length) {
          g = k;
          break
        }
        var h = ClientLib.API.Util.GetUnitRepairCosts.toString(),
        h = h.replace(l, g),
        n = h.substring(h.indexOf('{') + 1, h.lastIndexOf('}')),
        m = Function('a,b,c', n);
        ClientLib.API.Util.GetUnitRepairCosts =
        m
      }
      for (var q in ClientLib.Vis.BaseView.BaseView.prototype) if ('function' === typeof ClientLib.Vis.BaseView.BaseView.prototype[q] && (h = ClientLib.Vis.BaseView.BaseView.prototype[q].toString(), - 1 < h.indexOf(ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip.toString()))) {
        console.log('ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip_Original = ClientLib.Vis.BaseView.BaseView.prototype.' + q);
        Function('', 'ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip_Original = ClientLib.Vis.BaseView.BaseView.prototype.' +
        q) ();
        b = 'ClientLib.Vis.BaseView.BaseView.prototype.' + q + '=function (a){if(ClientLib.Vis.VisMain.GetInstance().get_Mode()==7&&window.TACS.getInstance().saveObj.checkbox.disableAttackPreparationTooltips){return;}else{this.ShowToolTip_Original(a);}}';
        Function('', b) ();
        console.log(b);
        break
      }
      qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original = qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility;
      qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility =
      function (a) {
        window.TACS.getInstance().saveObj.checkbox.disableArmyFormationManagerTooltips ? qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original(!1)  : qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original(a)
      }
    } else F++,
    window.setTimeout(u, 1000);
     else window.setTimeout(u, 1000)
  } else window.setTimeout(u, 1000)
} catch (s) {
  'undefined' !== typeof console ? console.log(s)  : window.opera ? opera.postError(s)  : GM_log(s)
}
}
console.log('TACS: Simulator loaded');
var v = null,
C =
'tr_TR de_DE pt_PT it_IT nl_NL hu_HU fr_FR fi_FI'.split(' '),
G = {
Stats: 'İstatistik Statistik Estatística Statistiche Statistieken Statisztika Statistiques Tiedot'.split(' '),
'Enemy Base:': 'Düşman Üssü:;Feindliche Basis:;Base Inimiga:;Base Nemica:;Vijandelijke Basis:;Ellenséges bázis:;Base Ennemie:;Vihollisen tukikohta:'.split(';'),
'Defences:': 'Savunma Üniteleri:;Verteidigung:;Defesas:;Difesa:;Verdediging:;Védelem:;Défenses:;Puolustus:'.split(';'),
'Buildings:': 'Binalar: Gebäude: Edifícios: Strutture: Gebouwen: Épületek: Bâtiments: Rakennelmat:'.split(' '),
'Construction Yard:': 'Şantiye:;Bauhof:;Estaleiro:;Cantiere:;Bouwplaats:;Központ:;Chantier De Construction:;Rakennustukikohta:'.split(';'),
'Defense Facility:': 'Savunma Tesisi:;Verteidigungseinrichtung:;Instalações de Defesa:;Stazione di Difesa:;Defensiefaciliteit:;Védelmi Bázis:;Complexe De Défense:;Puolustuslaitos:'.split(';'),
'Command Center:': 'Komuta Merkezi:;Kommandozentrale:;Centro de Comando:;Centro di Comando:;Commandocentrum:;Parancsnoki központ:;Centre De Commandement:;Komentokeskus:'.split(';'),
'Available Repair:': 'Mevcut Onarım:;;;;;;;Korjausaikaa jäljellä:'.split(';'),
'Available Attacks:': 'Mevcut Saldırılar:;;;;;;;Hyökkäyksiä:'.split(';'),
'Overall:': 'Tüm Birlikler:;Gesamt:;Geral:;Totale:;Totaal:;Áttekintés:;Total:;Yhteensä:'.split(';'),
'Infantry:': 'Piyadeler: Infanterie: Infantaria: Fanteria: Infanterie: Gyalogság: Infanterie: Jalkaväki:'.split(' '),
'Vehicle:': 'Motorlu Birlikler:;Fahrzeuge:;Veículos:;Veicoli:;Voertuigen:;Jármu:;Véhicules:;Ajoneuvot:'.split(';'),
'Aircraft:': 'Hava Araçları:;Flugzeuge:;Aviões:;Velivoli:;Vliegtuigen:;Légiero:;Avions:;Lentokoneet:'.split(';'),
'Outcome:': 'Sonuç: Ergebnis: Resultado: Esito: Uitkomst: Eredmény: Résultat: Lopputulos:'.split(' '),
Unknown: 'Bilinmiyor Unbekannt Desconhecido Sconosciuto Onbekend Ismeretlen Inconnu Tuntematon'.split(' '),
'Battle Time:': 'Savaş Süresi:;Kampfdauer:;Tempo de Batalha:;Tempo di Battaglia:;Gevechtsduur:;Csata ideje:;Durée Du Combat:;Taistelun kesto:'.split(';'),
Layouts: 'Diziliş Layouts Formações Formazione Indelingen Elrendezés Dispositions Asetelmat'.split(' '),
Load: 'Yükle Laden Carregar Carica Laad Töltés Charger Lataa'.split(' '),
'Load this saved layout.': 'Kayıtlı dizilişi yükle.;Gespeichertes Layout laden.;Carregar esta formação guardada.;Carica questa formazione salvata.;Laad deze opgeslagen indeling.;Töltsd be ezt az elmentett elrendezést.;Charger Cette Disposition.;Lataa valittu asetelma.'.split(';'),
Delete: 'Sil Löschen Apagar Cancella Verwijder Törlés Effacer Poista'.split(' '),
'Name: ': 'İsim: ;Name: ;Nome: ;Nome: ;Naam: ;Név: ;Nom: ;Nimi: '.split(';'),
'Delete this saved layout.': 'Kayıtlı dizilişi sil.;Gewähltes Layout löschen.;Apagar esta formação guardada.;Cancella questa formazione salvata.;Verwijder deze opgeslagen indeling.;Töröld ezt az elmentett elrendezést.;Effacer Cette Disposition.;Poista valittu asetelma.'.split(';'),
Save: 'Kaydet Speichern Guardar Salva Opslaan Mentés Sauvegarder Tallenna'.split(' '),
'Save this layout.': 'Bu dizilişi kaydet.;Layout speichern.;Guardar esta formação.;Salva questa formazione.;Deze indeling opslaan.;Mentsd el ezt az elrendezést.;Sauvegarder Cette Disposition.;Tallenna nykyinen asetelma.'.split(';'),
Info: 'Bilgi Info Info Info Info Info Infos Tietoa'.split(' '),
Forums: 'Forum Forum Fóruns Forum Forums Fórum Forums Keskustelupalsta'.split(' '),
Spoils: 'Ganimetler Rohstoffausbeute Espólios Bottino Opbrengst Zsákmény Butin Sotasaalis'.split(' '),
Options: 'Seçenekler Optionen Opções: Opzioni: Opties: Opciók: Options: Asetukset'.split(' '),
'TACS Options': 'TACS Seçenekleri;;;;;;;'.split(';'),
'Auto display stats': 'İstatistik penceresini otomatik olarak göster;Dieses Fenster automatisch öffnen;Mostrar esta caixa automaticamente;Apri automaticamente la finestra Strumenti;Dit venster automatisch weergeven;Ezen ablak autómatikus megjelenítése;Affich. Auto. de cette Fenêtre;Näytä simuloinnin tiedot automaattisesti'.split(';'),
'Show shift buttons': 'Kaydırma tuşlarını göster;Bewegungstasten anzeigen;Mostrar botões de deslocamento;Mostra i pulsanti di spostamento;Verschuifknoppen weergeven;Eltoló gombok megjelenítése;Affich. Auto. Boutons de Déplacement;Näytä armeijan siirtopainikkeet'.split(';'),
'Warning!': 'Uyarı! Warnung! Aviso! Attenzione! Waarschuwing! Figyelem! Attention! Varoitus!'.split(' '),
Simulate: 'Simule et;Simulieren;Simular;Simula;Simuleer;Szimuláció;Simuler;Simuloi'.split(';'),
'Start Combat Simulation': 'Savaş Simulasyonunu Başlat;Kampfsimulation starten;Começar a simalação de combate;Avvia simulazione;Start Gevechtssimulatie;Csata szimuláció elindítása;Démarrer La Simulation Du Combat;Aloita taistelun simulaatio'.split(';'),
Setup: 'Düzen Aufstellung Configuração Setup Opzet Elrendezés Organisation Takaisin'.split(' '),
'Return to Combat Setup': 'Ordu düzenini göster;Zurück zur Einheitenaufstellung;Voltar à configuração de combate;Ritorna alla configurazione;Keer terug naar Gevechtsopzet;Vissza az egységek elrendezéséhez;Retourner à l\'Organisation Des Troupes;Return to Combat Setup'.split(';'),
Unlock: 'Kilidi aç;Freigabe;Desbloquear;Sblocca;Ontgrendel;Felold;Debloquer;Avaa'.split(';'),
'Open Simulator Tools': 'Simulatör Araçlarını Göster;Extras öffnen;Abrir as ferramentas do simulador;Apri strumenti;Open Simulator Gereedschap;Megnyitja a szimulátor információs ablakát;Ouvrir Les Réglages Du Simulateur;Avaa simulaattorin työkalut'.split(';'),
'Shift units left': 'Birlikleri sola kaydır;Einheiten nach links bewegen;Deslocar as unidades para a esquerda;Spostare le unità a sinistra;Verschuif eenheden links;Egységek eltolása balra;Déplacer Les Unités Vers La Gauche;Siirtää yksikköjä vasemmalle'.split(';'),
'Shift units right': 'Birlikleri sağa kaydır;Einheiten nach rechts bewegen;Deslocar as unidades para a direita;Spostare le unità a destra;Verschuif eenheden rechts;Egységek eltolása jobbra;Déplacer Les Unités Vers La Droite;Siirtää yksikköjä oikealle'.split(';'),
'Shift units up': 'Birlikleri yukarı kaydır;Einheiten nach oben bewegen;Deslocar as unidades para cima;Spostare le unità in alto;Verschuif eenheden omhoog;Egységek eltolása fel;Déplacer Les Unités Vers Le Haut;Siirtää yksikköjä ylös'.split(';'),
'Shift units down': 'Birlikleri aşağı kaydır;Einheiten nach unten bewegen;Deslocar as unidades para baixo;Spostare le unità in basso;Verschuif eenheden omlaag;Egységek eltolása le;Déplacer Les Unités Vers Le Bas;Siirtää yksikköjä alas'.split(';'),
'Total Victory': 'Mutlak Zafer;Gesamtsieg;Vitória Total;Vittoria Totale;Totale Overwinning;Teljes gyozelem;Victoire Totale;Totaalinen Voitto'.split(';'),
Victory: 'Zafer Sieg Vitória Vittoria Overwinning Gyozelem Victoire Voitto'.split(' '),
'Total Defeat': 'Mutlak Yenilgi;Totale Niederlage;Derrota total;Sconfitta Totale;Totale Nederlaag;Teljes vereség;Défaite Totale;Total Tappio'.split(';'),
'Support lvl ': 'Takviye seviyesi ;Stufe Supportwaffe ;Nível do Suporte ;Supporto lvl ;Ondersteuningsniveau ;"Support" épület szintje ;Lvl. Du Support ;Tukitykistön taso '.split(';'),
Refresh: 'Yenile Erfrischen Actualizar Rinfrescare Verversen Felfrissít Actualiser Päivitä'.split(' '),
'Refresh Stats': 'İstatistikleri Yenile;Erfrischen Statistik;Estatística;Rinfrescare Statistiche;Verversen Statistieken;Frissítés Stats;Actualiser Les Stats;Päivitä tiedot'.split(';'),
'Side:': 'Taraf: Seite Lado:  Zijde  Côté Sijainti:'.split(' '),
Left: 'Sol Links Esquerda  Links  Gauche Vasen'.split(' '),
Right: 'Sağ Rechts Direita  Rechts  Droite Oikea'.split(' '),
'Locks:': 'Kilitler: Freigabe Bloquear:  Vergrendelingen:  Vérouiller: Varmistimet:'.split(' '),
Attack: 'Saldırı Angriff Atacar  Aanvallen  Attaquer Hyökkäys'.split(' '),
Repair: 'Onarım Reparatur Reparar  Repareren  Réparer Korjaus'.split(' '),
Reset: 'Sıfırla       Palauta'.split(' '),
'Simulation will be based on most recently refreshed stats!': 'Simulasyon en son güncellenen istatistiklere göre yapılacaktır!;Die Simulation basiert auf den zuletzt aktualisierten Stand;A simulação vai ser baseada na mais recente data!;;Simulatie zal gebaseerd worden op meest recentelijke ververste statistieken!;;La Simulation sera basée en fonction des dernières stats actualisées !;Simulaatio suoritetaan viimeisimmän päivityksen tiedoilla!'.split(';'),
'Unlock Attack Button': 'Saldırı Düğmesinin Kilidini Aç;Angriffsbutton freigeben;Desbloquear o botão de ataque;Sblocca pulsante d\'attacco;Ontgrendel Aanvalsknop;a Támadás gomb feloldása;Débloquer Le Bouton d\'Attaque;Poista hyökkäusnapin lukitus'.split(';'),
'Unlock Repair Button': 'Onarım Düğmesinin Kilidini Aç;Reparaturbutton freigeben;Desbloquear botão de reparação;;Ontgrendel Repareerknop;;Débloquer Le Bouton de Réparation;Poista korjausnapin lukitus'.split(';'),
'Unlock Reset Button': 'Sıfırlama Düğmesinin Kilidini Aç;;;;;;;Avaa Tyhjennä nappi'.split(';'),
SKIP: 'ATLA       '.split(' '),
'Skip to end': 'Simulasyonu atla;Zum Ende Vorspringen;;;;;;Mene loppuun'.split(';'),
'Reset Formation': 'Dizilişi Sıfırla;;;;;;;Palauta armeijan oletusasetelma'.split(';'),
'Flip Horizontal': 'Yatay Çevir;Horizontal Spiegeln;;;;;;Käännä vaakasuunnassa'.split(';'),
'Flip Vertical': 'Dikey Çevir;Vertikal Spiegeln;;;;;;Käännä pystysuunnassa'.split(';'),
'Activate All': 'Hepsini Aktifleştir;Alle Aktivieren;;;;;;Aktivoi kaikki'.split(';'),
'Deactivate All': 'Hepsini Deaktifleştir;Alle Deaktivieren;;;;;;Poista kaikki käytöstä'.split(';'),
'Activate Infantry': 'Piyadeleri Aktifleştir;Infanterie Aktivieren;;;;;;Aktivoi jalkaväki'.split(';'),
'Deactivate Infantry': 'Piyadeleri Deaktifleştir;Infanterie Deaktivieren;;;;;;Poista jalkaväki käytöstä'.split(';'),
'Activate Vehicles': 'Motorlu Birlikleri Aktifleştir;Fahrzeuge Aktivieren;;;;;;Aktivoi ajoneuvot'.split(';'),
'Deactivate Vehicles': 'Motorlu Birlikleri Deaktifleştir;Fahrzeuge Deaktivieren;;;;;;Poista ajoneuvot käytöstä'.split(';'),
'Activate Air': 'Hava Araçlarını Aktifleştir;Flugzeuge Aktivieren;;;;;;Aktivoi lentokoneet'.split(';'),
'Deactivate Air': 'Hava Araçlarını Deaktifleştir;Flugzeuge Deaktivieren;;;;;;Poista lentokoneet käytöstä'.split(';'),
'Activate Repair Mode': 'Onarım Modunu Aç;Reparatur Modus Aktivieren;;;;;;Aktivoi korjaustila'.split(';'),
'Deactivate Repair Mode': 'Onarım Modunu Kapat;Reparatur Modus Deaktivieren;;;;;;Poista korjaustila käytöstä'.split(';'),
'Version: ': 'Sürüm: ;;;;;;;Versio: '.split(';'),
'Mark saved targets on region map': 'Kaydedilmiş hedefleri haritada işaretle;Gespeicherte Ziele auf der Karte Markieren;;;;;;Merkitse tallennetut kohteet alue kartalle'.split(';'),
'Enable \'Double-click to (De)activate units\'': 'Çift-tıklama ile birlikleri (de)aktifleştirmeyi etkinleştir;Doppel-Klick zum Einheiten (De)-Aktivieren ;;;;;;Tuplaklikkaus aktivoi/deaktivoi yksiköt'.split(';'),
'Show Stats During Attack': 'İstatistikleri saldırı sırasında göster;;;;;;;Näytä tiedot -ikkuna hyökkäyksen aikana'.split(';'),
'Show Stats During Simulation': 'İstatistikleri simulasyondayken göster;;;;;;;Näytä tiedot -ikkuna simuloinnin aikana'.split(';'),
'Skip Victory-Popup After Battle': 'Savaş Bitiminde Zafer Bildirimini Atla;;;;;;;Ohita taistelun jälkeinen voittoruutu'.split(';'),
'Stats Window Opacity': 'İstatistik Penceresi Saydamlığı;;;;;;;Tiedot -ikkunan läpinäkyvyys'.split(';'),
'Disable Unit Tooltips In Army Formation Manager': 'Ordu Dizilişi Yöneticisinde Birlik İpuçlarını Gizle;;;;;;;Poista käytöstä yksiköiden työkaluvihjeet armeijan muodostamisikkunassa'.split(';'),
'Disable Tooltips In Attack Preparation View': 'Saldırı Hazırlık Görünümünde İpuçlarını Gizle;;;;;;;Poista työkaluvihjeet käytöstä hyökkäyksen valmisteluikkunassa'.split(';'),
Undo: 'Geri Al;;;;;;;Kumoa'.split(';'),
Redo: 'İleri Al;;;;;;;Tee uudelleen'.split(';'),
'Open Stats Window': 'İstatistik Penceresini Aç;;;;;;;Avaa tiedot -ikkuna'.split(';')
},
F = 0;
/commandandconquer\.com/i.test(document.domain) && window.setTimeout(u, 1000)
}.toString() + ')();';
t.type = 'text/javascript';
/commandandconquer\.com/i.test(document.domain) && document.getElementsByTagName('head') [0].appendChild(t);
window.soundRepairImpact = {
info: 'Impact Wrench Sound; Used in TACS; courtesy of: http://www.freesfx.co.uk',
d: 'data:video/ogg;base64,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'
};
window.soundRepairReload = {
info: 'Reload sound; Used in TACS; courtesy of: http://www.freesfx.co.uk; 7806 bytes',
d: 'data:video/ogg;base64,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'
}
}) ();
