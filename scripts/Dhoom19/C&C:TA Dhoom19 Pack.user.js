// ==UserScript==
// @name        C&C:TA Dhoom19 Pack
// @namespace   https://greasyfork.org
// @description Altes Korki45/DLwarez007 Complete Pack. Neugemacht,und überarbeitet.
// @author      Korki45,DLwarez007,(Dhoom19-aka-FuckerMaker)
// @include     http*://*.alliances.commandandconquer.com/*
// @icon        http://s3.amazonaws.com/uso_ss/icon/172683/large.png
// @version     2.9
// @grant       none

// ==UserScript==
// @name infernal wrapper
// @description Supplies some wrapper functions for public use 
// @namespace infernal_wrapper
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @author infernal_me, KRS_L, krisan
// ==/UserScript==
(function () {
    var CCTAWrapper_main = function () {
        try {
            _log = function () {
                if (typeof console != 'undefined') console.log(arguments);
                else if (window.opera) opera.postError(arguments);
                else GM_log(arguments);
            }

            function createCCTAWrapper() {
                console.log('CCTAWrapper loaded');
                _log('wrapper loading' + PerforceChangelist);
                System = $I;
                SharedLib = $I;
                var strFunction;
                
                // SharedLib.Combat.CbtSimulation.prototype.DoStep
                for (var x in $I) {
                    for (var key in $I[x].prototype) {
                        if ($I[x].prototype.hasOwnProperty(key) && typeof($I[x].prototype[key]) === 'function') {  // reduced iterations from 20K to 12K
                            strFunction = $I[x].prototype[key].toString();
                            if (strFunction.indexOf("().l;var b;for (var d = 0 ; d < c.length ; d++){b = c[d];if((b.") > -1) {
                                $I[x].prototype.DoStep = $I[x].prototype[key];
                                console.log("SharedLib.Combat.CbtSimulation.prototype.DoStep = $I." + x + ".prototype." + key);
                                break;
                            }
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.CanRepair
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("DefenseSetup") > -1 && strFunction.indexOf("DamagedEntity") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("Type==7") > -1 && strFunction.indexOf("var a=0;if") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityUnits.prototype.get_OffenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                var searchString = "for (var b in {d:this.";
                var startPos = strFunction.indexOf(searchString) + searchString.length;
                var fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                var fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_OffenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_OffenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Data.CityUnits.prototype.get_DefenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                searchString = "for (var c in {d:this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_DefenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation
                strFunction = ClientLib.Vis.Battleground.Battleground.prototype.StartBattle.toString();
                searchString = "=0;for(var a=0; (a<9); a++){this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = fn;
                console.log("ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = function(){return this." + fn_name + ";}");

                // GetNerfBoostModifier
                if (typeof ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier == 'undefined') ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier = ClientLib.Base.Util.GetNerfAndBoostModifier;

                _log('wrapper loaded');
            }
        } catch (e) {
            console.log("createCCTAWrapper: ", e);
        }

        function CCTAWrapper_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined') {
                    createCCTAWrapper();
                } else {
                    window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
                }
            } catch (e) {
                CCTAWrapper_IsInstalled = false;
                console.log("CCTAWrapper_checkIfLoaded: ", e);
            }
        }

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
        }
    }

    try {
        var CCTAWrapper = document.createElement("script");
        CCTAWrapper.innerHTML = "var CCTAWrapper_IsInstalled = true; (" + CCTAWrapper_main.toString() + ")();";
        CCTAWrapper.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(CCTAWrapper);
        }
    } catch (e) {
        console.log("CCTAWrapper: init error: ", e);
    }
})();

// ==UserScript==
// @name        MaelstromTools Dev
// @namespace   MaelstromTools
// @description Just a set of statistics & summaries about repair time and base resources. Mainly for internal use, but you are free to test and comment it.
// @version     0.1.4.4
// @author      Maelstrom, HuffyLuf, KRS_L and Krisan
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==
//var offense_units = own_city.get_CityArmyFormationsManager().GetFormationByTargetBaseId(current_city.get_Id()).get_ArmyUnits().l;
//System.Int64 GetForumIdByType (ClientLib.Data.Forum.EForumType eForumType)
//static ClientLib.Data.Forum.EForumType NormalForum
//System.Collections.Generic.List$1 get_ForumsAlliance ()
//System.Void CreateThread (System.Int64 forumId ,System.String threadTitle ,System.String threadPost ,System.Boolean autoSubscribe)
//System.Void CreatePost (System.Int64 forumId ,System.Int64 threadId ,System.String postMessage)
//System.Void StartGetForumThreadData (System.Int64 forumId ,System.Int32 skip ,System.Int32 take)
//System.Void OnForumThreadDataReceived (System.Object context ,System.Object result)
//System.Void add_ThreadsFetched (ClientLib.Data.ForumThreadsFetched value)
//System.Void MarkThreadsAsRead (System.Int64 forumId ,System.Int64[] threadIds)
//
//var score = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(lvl);
//var scoreNext = ClientLib.Base.PointOfInterestTypes.GetNextScore(score);
//var resBonus = ClientLib.Base.PointOfInterestTypes.GetBonusByType(ClientLib.Base.EPOIType.TiberiumBonus, score);
//var unitBonus = ClientLib.Base.PointOfInterestTypes.GetBonusByType(ClientLib.Base.EPOIType.InfanteryBonus, score);
//console.log("POI lvl" + lvl + "gives " + score + "points, next lvl at " + scoreNext + " points. Resource bonus: " + resBonus + " Unit bonus: " + unitBonus + "%");
/*
 ClientLib.Data.Player
 get_ResearchPoints
 GetCreditsCount
 GetCreditsGrowth
ClientLib.Data.PlayerResearch get_PlayerResearch ()
ClientLib.Data.PlayerResearchItem GetResearchItemFomMdbId (System.Int32 _mdbId)
ClientLib.Data.PlayerResearchItem.System.Object get_NextLevelInfo_Obj ()

var cw=ClientLib.Data.MainData.GetInstance().get_Player().get_Faction();
var cj=ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound,cw);
var cd=cr.GetResearchItemFomMdbId(cj);
 */
(function () {
  var MaelstromTools_main = function () {
    try {
      function CCTAWrapperIsInstalled() {
        return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
      }

      function createMaelstromTools() {
        console.log('MaelstromTools loaded');

        qx.Class.define("MaelstromTools.Language", {
          type: "singleton",
          extend: qx.core.Object,
          construct: function (language) {
            this.Languages = ['de', 'pt', 'fr', 'tr']; // en is default, not needed in here!
            if (language != null) {
              this.MyLanguage = language;
            }
          },
          members: {
            MyLanguage: "en",
            Languages: null,
            Data: null,

            loadData: function (language) {
              var l = this.Languages.indexOf(language);

              if (l < 0) {
                this.Data = null;
                return;
              }

              this.Data = {};
              this.Data["Collect all packages"] = ["Alle Pakete einsammeln", "Recolher todos os pacotes", "Récupérez tous les paquets", "Tüm paketleri topla"][l];
              this.Data["Overall production"] = ["Produktionsübersicht", "Produção global", "La production globale", "Genel üretim"][l];
              this.Data["Army overview"] = ["Truppenübersicht", "Vista Geral de Exército", "Armée aperçu", "Ordu önizlemesi"][l];
              this.Data["Base resources"] = ["Basis Ressourcen", "Recursos base", "ressources de base", "Üs önizlemesi"][l];
              this.Data["Main menu"] = ["Hauptmenü", "Menu Principal", "menu principal", "Ana menü"][l];
              this.Data["Repair all units"] = ["Alle Einheiten reparieren", "Reparar todas as unidades", "Réparer toutes les unités", "Tüm üniteleri onar"][l];
              this.Data["Repair all defense buildings"] = ["Alle Verteidigungsgebäude reparieren", "Reparar todos os edifícios de defesa", "Réparer tous les bâtiments de défense", "Tüm savunma binalarını onar"][l];
              this.Data["Repair all buildings"] = ["Alle Gebäurde reparieren", "Reparar todos os edifícios", "Réparer tous les bâtiments", "Tüm binaları onar"][l];
              this.Data["Base status overview"] = ["Basisübersicht", "Estado geral da base", "aperçu de l'état de base", "Üs durumu önizlemesi"][l];
              this.Data["Upgrade priority overview"] = ["Upgrade Übersicht", "Prioridade de upgrades", "aperçu des priorités de mise à niveau", "Yükseltme önceliği önizlemesi"][l];
              this.Data["MaelstromTools Preferences"] = ["MaelstromTools Einstellungen", "Preferências de MaelstromTools", "Préférences MaelstromTools", "MaelstromTools Ayarları"][l];
              this.Data["Options"] = ["Einstellungen", "Opções", "Options", "Seçenekler"][l];
              this.Data["Target out of range, no resource calculation possible"] = ["Ziel nicht in Reichweite, kann die plünderbaren Ressourcen nicht berechnen", "Alvo fora do alcance, não é possivel calcular os recursos", "Cible hors de portée, pas de calcul de ressources possible",
			  "Hedef menzil dışında, kaynak hesaplaması olanaksız"][l];
              this.Data["Lootable resources"] = ["Plünderbare Ressourcen", "Recursos roubáveis", "Ressources à piller", "Yağmalanabilir kaynaklar"][l];
              this.Data["per CP"] = ["pro KP", "por PC", "par PC", "KP başına"][l];
              this.Data["2nd run"] = ["2. Angriff", "2º ataque", "2° attaque", "2. saldırı"][l];
              this.Data["3rd run"] = ["3. Angriff", "3º ataque", "3° attaque", "3. saldırı"][l];
              this.Data["Calculating resources..."] = ["Berechne plünderbare Ressourcen...", "A calcular recursos...", "calcul de ressources ...", "Kaynaklar hesaplanıyor..."][l];
              this.Data["Next MCV"] = ["MBF", "MCV", "VCM"][l];
              this.Data["Show time to next MCV"] = ["Zeige Zeit bis zum nächsten MBF", "Mostrar tempo restante até ao próximo MCV", "Afficher l'heure pour le prochain VCM ", "Sırdaki MCV için gereken süreyi göster"][l];
              this.Data["Show lootable resources (restart required)"] = ["Zeige plünderbare Ressourcen (Neustart nötig)", "Mostrar recursos roubáveis (é necessário reiniciar)", "Afficher les ressources fouiller (redémarrage nécessaire)", "Yağmalanabilir kaynakları göster (yeniden başlatma gerekli)"][l];
              this.Data["Use dedicated Main Menu (restart required)"] = ["Verwende extra Hauptmenü (Neustart nötig)", "Usar botão para o Menu Principal (é necessário reiniciar)", "Utiliser dédiée du menu principal (redémarrage nécessaire)", "Ana menü tuşunu kullan (yeniden başlatma gerekli)"][l];
              this.Data["Autocollect packages"] = ["Sammle Pakete automatisch", "Auto recolher pacotes", "paquets autocollecté", "Paketleri otomatik topla"][l];
              this.Data["Autorepair units"] = ["Repariere Einheiten automatisch", "Auto reparar o exército", "unités autoréparé", "Üniteleri otomatik onar"][l];
              this.Data["Autorepair defense (higher prio than buildings)"] = ["Repariere Verteidigung automatisch (höhere Prio als Gebäude)", "Auto reparar defesa (maior prioridade do que os edifícios)", "réparation automatique la défense (priorité plus élevé que les bâtiments) ", "Savunmayı otomatik onar (binalardan daha yüksek öncelikli olarak)"][l];
              this.Data["Autorepair buildings"] = ["Repariere Gebäude automatisch", "Auto reparar edifícios", "bâtiments autoréparé", "Binaları otomatik onar"][l];
              this.Data["Automatic interval in minutes"] = ["Auto-Intervall in Minuten", "Intervalo de tempo automático (em minutos)", "intervalle automatique en quelques minutes", "Otomatik toplama aralığı (dk)"][l];
              this.Data["Apply changes"] = ["Speichern", "Confirmar", "Appliquer changements", "Uygula"][l];
              this.Data["Discard changes"] = ["Abbrechen", "Cancelar", "Annuler changements", "İptal"][l];
              this.Data["Reset to default"] = ["Auf Standard zurücksetzen", "Definições padrão", "Réinitialiser", "Sıfırla"][l];
              this.Data["Continuous"] = ["Kontinuierlich", "Contínua", "continue", "Sürekli"][l];
              this.Data["Bonus"] = ["Pakete", "Bónus", "Bonus", "Bonus"][l];
              this.Data["POI"] = ["POI", "POI", "POI", "POI"][l];
              this.Data["Total / h"] = ["Gesamt / h", "Total / h", "Total / h", "Toplam / sa."][l];
              this.Data["Repaircharges"] = ["Reparaturzeiten", "Custo de reparação", "frais de réparation", "Onarım maliyeti"][l];
              this.Data["Repairtime"] = ["Max. verfügbar", "Tempo de reparação", "Temps de réparation", "Onarım süresi"][l];
              this.Data["Attacks"] = ["Angriffe", "Ataques", "Attaques", "Saldırılar"][l];
              this.Data[MaelstromTools.Statics.Infantry] = ["Infanterie", "Infantaria", "Infanterie", "Piyade"][l];
              this.Data[MaelstromTools.Statics.Vehicle] = ["Fahrzeuge", "Veículos", "Vehicule", "Motorlu B."][l];
              this.Data[MaelstromTools.Statics.Aircraft] = ["Flugzeuge", "Aeronaves", "Aviation", "Hava A."][l];
              this.Data[MaelstromTools.Statics.Tiberium] = ["Tiberium", "Tibério", "Tiberium", "Tiberium"][l];
              this.Data[MaelstromTools.Statics.Crystal] = ["Kristalle", "Cristal", "Cristal", "Kristal"][l];
              this.Data[MaelstromTools.Statics.Power] = ["Strom", "Potência", "Energie", "Güç"][l];
              this.Data[MaelstromTools.Statics.Dollar] = ["Credits", "Créditos", "Crédit", "Kredi"][l];
              this.Data[MaelstromTools.Statics.Research] = ["Forschung", "Investigação", "Recherche", "Araştırma"][l];
              this.Data["Base"] = ["Basis", "Base", "Base", "Üs"][l];
              this.Data["Defense"] = ["Verteidigung", "Defesa", "Défense", "Savunma"][l];
              this.Data["Army"] = ["Armee", "Exército", "Armée", "Ordu"][l];
              this.Data["Level"] = ["Stufe", "Nível", "Niveau", "Seviye"][l];
              this.Data["Buildings"] = ["Gebäude", "Edifícios", "Bâtiments", "Binalar"][l];
              this.Data["Health"] = ["Leben", "Vida", "Santé", "Sağlık"][l];
              this.Data["Units"] = ["Einheiten", "Unidades", "Unités", "Üniteler"][l];
              this.Data["Hide Mission Tracker"] = ["Missionsfenster ausblenden", "Esconder janela das Missões", "Cacher la fenêtre de mission", "Görev İzleyicisini Gizle"][l];
              this.Data["none"] = ["keine", "nenhum", "aucun", "hiçbiri"][l];
              this.Data["Cooldown"] = ["Cooldown", "Relocalização", "Recharge", "Cooldown"][l];
              this.Data["Protection"] = ["Geschützt bis", "Protecção", "Protection", "Koruma"][l];
              this.Data["Available weapon"] = ["Verfügbare Artillerie", "Apoio disponível", "arme disponible", "Mevcut silah"][l];
              this.Data["Calibrated on"] = ["Kalibriert auf", "Calibrado em", "Calibré sur ", "Kalibreli"][l];
              this.Data["Total resources"] = ["Gesamt", "Total de recursos", "Ressources totales", "Toplam kaynaklar"][l];
              this.Data["Max. storage"] = ["Max. Kapazität", "Armazenamento Máx.", "Max. de stockage", "Maks. Depo"][l];
              this.Data["Storage full!"] = ["Lager voll!", "Armazenamento cheio!", "Stockage plein", "Depo dolu!"][l];
              this.Data["Storage"] = ["Lagerstand", "Armazenamento", "Stockage", "Depo"][l];
              this.Data["display only top buildings"] = ["Nur Top-Gebäude anzeigen", "Mostrar apenas melhores edifícios", "afficher uniquement les bâtiments principaux", "yalnızca en iyi binaları göster"][l];
              this.Data["display only affordable buildings"] = ["Nur einsetzbare Gebäude anzeigen", "Mostrar apenas edíficios acessíveis", "afficher uniquement les bâtiments abordables", "yalnızca satın alınabilir binaları göster"][l];
              this.Data["City"] = ["Stadt", "Base", "Base", "Şehir"][l];
              this.Data["Type (coord)"] = ["Typ (Koord.)", "Escrever (coord)", "Type (coord)", "Tip (koord.)"][l];
              this.Data["to Level"] = ["Auf Stufe", "para nível", "à Niveau ", "Seviye için"][l];
              this.Data["Gain/h"] = ["Zuwachs/h", "Melhoria/h", "Gain / h", "Kazanç / sa."][l];
              this.Data["Factor"] = ["Faktor", "Factor", "Facteur", "Faktör"][l];
              this.Data["Tib/gain"] = ["Tib./Zuwachs", "Tib/melhoria", "Tib / gain", "Tib/Kazanç"][l];
              this.Data["Pow/gain"] = ["Strom/Zuwachs", "Potencia/melhoria", "Puissance / Gain", "Güç/Kazanç"][l];
              this.Data["ETA"] = ["Verfügbar in", "Tempo restante", "Temps restant", "Kalan Zaman"][l];
              this.Data["Upgrade"] = ["Aufrüsten", "Upgrade", "Upgrade", "Yükselt"][l];
              this.Data["Powerplant"] = ["Kratfwerk", "Central de Energia", "Centrale", "Güç Santrali"][l];
              this.Data["Refinery"] = ["Raffinerie", "Refinaria", "Raffinerie", "Rafineri"][l];
              this.Data["Harvester"] = ["Sammler", "Harvester", "Collecteur", "Biçerdöver"][l];
              this.Data["Silo"] = ["Silo", "Silo", "Silo", "Silo"][l];
              this.Data["Accumulator"] = ["Akkumulator", "Acumulador", "Accumulateur", "Akümülatör"][l];
              this.Data["Calibrate support"] = ["Artillerie kalibrieren", "Calibrar apoio", "Calibrer soutien", "Takviyeyi kalibre et"][l];
              this.Data["Access"] = ["Öffne", "Aceder", "Accès ", "Aç"][l];
              this.Data["Focus on"] = ["Zentriere auf", "Concentrar em", "Centré sur", "Odaklan"][l];
              this.Data["Possible attacks from this base (available CP)"] = ["Mögliche Angriffe (verfügbare KP)", "Possible attacks from this base (available CP)","Possible attacks from this base (available CP)", "Bu üsten yapılması mümkün olan saldırılar (mevcut KP)"][l];
              //this.Data[""] = [""][l];
            },
            get: function (ident) {
              return this.gt(ident);
            },
            gt: function (ident) {
              if (!this.Data || !this.Data[ident]) {
                /*if(!parseInt(ident.substr(0, 1), 10) && ident != "0") {
                  console.log("missing language data: " + ident);
                }*/
                return ident;
              }
              return this.Data[ident];
            }
          }
        }),

        // define Base
        qx.Class.define("MaelstromTools.Base", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            /* Desktop */
            timerInterval: 1500,
            mainTimerInterval: 5000,
            lootStatusInfoInterval: null,
            images: null,
            mWindows: null,
            mainMenuWindow: null,

            itemsOnDesktop: null,
            itemsOnDesktopCount: null,
            itemsInMainMenu: null,
            itemsInMainMenuCount: null,
            buttonCollectAllResources: null,
            buttonRepairAllUnits: null,
            buttonRepairAllBuildings: null,

            lootWidget: null,

            initialize: function () {
              try {
                //console.log(qx.locale.Manager.getInstance().getLocale());
                Lang.loadData(qx.locale.Manager.getInstance().getLocale());
                //console.log("Client version: " + MaelstromTools.Wrapper.GetClientVersion());
                this.itemsOnDesktopCount = [];
                this.itemsOnDesktop = {};
                this.itemsInMainMenuCount = [];
                this.itemsInMainMenu = {};

                var fileManager = ClientLib.File.FileManager.GetInstance();
                //ui/icons/icon_mainui_defense_button
                //ui/icons/icon_mainui_base_button
                //ui/icons/icon_army_points
                //icon_def_army_points
                var factionText = ClientLib.Base.Util.GetFactionGuiPatchText();
                this.createNewImage(MaelstromTools.Statics.Tiberium, "ui/common/icn_res_tiberium.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Crystal, "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Power, "ui/common/icn_res_power.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Dollar, "ui/common/icn_res_dollar.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Research, "ui/common/icn_res_research.png", fileManager);
                this.createNewImage("Sum", "ui/common/icn_build_slots.png", fileManager);
                this.createNewImage("AccessBase", "ui/" + factionText + "/icons/icon_mainui_enterbase.png", fileManager);
                this.createNewImage("FocusBase", "ui/" + factionText + "/icons/icon_mainui_focusbase.png", fileManager);
                this.createNewImage("Packages", "ui/" + factionText + "/icons/icon_collect_packages.png", fileManager);
                this.createNewImage("RepairAllUnits", "ui/" + factionText + "/icons/icon_army_points.png", fileManager);
                this.createNewImage("RepairAllBuildings", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("ResourceOverviewMenu", "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage("ProductionMenu", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("RepairTimeMenu", "ui/" + factionText + "/icons/icon_repair_all_button.png", fileManager);
                this.createNewImage("Crosshair", "ui/icons/icon_support_tnk_white.png", fileManager);
                this.createNewImage("UpgradeBuilding", "ui/" + factionText + "/icons/icon_building_detail_upgrade.png", fileManager);

                this.createNewWindow("MainMenu", "R", 125, 140, 120, 100, "B");
                this.createNewWindow("Production", "L", 120, 60, 340, 140);
                this.createNewWindow("RepairTime", "L", 120, 60, 340, 140);
                this.createNewWindow("ResourceOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("BaseStatusOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("Preferences", "L", 120, 60, 440, 140);
                this.createNewWindow("UpgradePriority", "L", 120, 60, 870, 400);

                if (!this.mainMenuWindow) {
                  this.mainMenuWindow = new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set({
                    //backgroundColor: "#303030",
                    padding: 5,
                    paddingRight: 0
                  });
                  if (MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.mainMenuWindow.setPlaceMethod("mouse");
                    this.mainMenuWindow.setPosition("top-left");
                  } else {
                    this.mainMenuWindow.setPlaceMethod("widget");
                    this.mainMenuWindow.setPosition("bottom-right");
                    this.mainMenuWindow.setAutoHide(false);
                    this.mainMenuWindow.setBackgroundColor("transparent");
                    //this.mainMenuWindow.setShadow(null);
                    this.mainMenuWindow.setDecorator(new qx.ui.decoration.Background());
                  }
                }

                var desktopPositionModifier = 0;

                this.buttonCollectAllResources = this.createDesktopButton(Lang.gt("Collect all packages"), "Packages", true, this.desktopPosition(desktopPositionModifier));
                this.buttonCollectAllResources.addListener("execute", this.collectAllPackages, this);

                var openProductionWindowButton = this.createDesktopButton(Lang.gt("Overall production"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openProductionWindowButton.addListener("execute", function () {
                  MaelstromTools.Production.getInstance().openWindow("Production", Lang.gt("Overall production"));
                }, this);

                var openResourceOverviewWindowButton = this.createDesktopButton(Lang.gt("Base resources"), "ResourceOverviewMenu", false, this.desktopPosition(desktopPositionModifier));
                openResourceOverviewWindowButton.addListener("execute", function () {
                  MaelstromTools.ResourceOverview.getInstance().openWindow("ResourceOverview", Lang.gt("Base resources"));
                }, this);

                desktopPositionModifier++;
                var openMainMenuButton = this.createDesktopButton(Lang.gt("Main menu"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openMainMenuButton.addListener("click", function (e) {
                  this.mainMenuWindow.placeToMouse(e);
                  this.mainMenuWindow.show();
                }, this);

                this.buttonRepairAllUnits = this.createDesktopButton(Lang.gt("Repair all units"), "RepairAllUnits", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllUnits.addListener("execute", this.repairAllUnits, this);

                this.buttonRepairAllBuildings = this.createDesktopButton(Lang.gt("Repair all buildings"), "RepairAllBuildings", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllBuildings.addListener("execute", this.repairAllBuildings, this);

                var openRepairTimeWindowButton = this.createDesktopButton(Lang.gt("Army overview"), "RepairTimeMenu", false, this.desktopPosition(desktopPositionModifier));
                openRepairTimeWindowButton.addListener("execute", function () {
                  MaelstromTools.RepairTime.getInstance().openWindow("RepairTime", Lang.gt("Army overview"));
                }, this);

                var openBaseStatusOverview = this.createDesktopButton(Lang.gt("Base status overview"), "Crosshair", false, this.desktopPosition(desktopPositionModifier));
                openBaseStatusOverview.addListener("execute", function () {
                  MaelstromTools.BaseStatus.getInstance().openWindow("BaseStatusOverview", Lang.gt("Base status overview"));
                }, this);

                desktopPositionModifier++;
                var openHuffyUpgradeOverview = this.createDesktopButton(Lang.gt("Upgrade priority overview"), "UpgradeBuilding", false, this.desktopPosition(desktopPositionModifier));
                openHuffyUpgradeOverview.addListener("execute", function () {
                  HuffyTools.UpgradePriorityGUI.getInstance().openWindow("UpgradePriority", Lang.gt("Upgrade priority overview"));
                }, this);

                desktopPositionModifier++;
                var preferencesButton = new qx.ui.form.Button(Lang.gt("Options")).set({
                  appearance: "button-text-small",
                  width: 100,
                  minWidth: 100,
                  maxWidth: 100
                });
                preferencesButton.setUserData("desktopPosition", this.desktopPosition(desktopPositionModifier));
                preferencesButton.addListener("execute", function () {
                  MaelstromTools.Preferences.getInstance().openWindow("Preferences", Lang.gt("MaelstromTools Preferences"), true);
                }, this);

                if (MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop("MainMenu", openMainMenuButton);
                }
                this.addToMainMenu("ResourceOverviewMenu", openResourceOverviewWindowButton);
                this.addToMainMenu("ProductionMenu", openProductionWindowButton);
                this.addToMainMenu("BaseStatusMenu", openBaseStatusOverview);
                this.addToMainMenu("RepairTimeMenu", openRepairTimeWindowButton);
                this.addToMainMenu("UpgradeBuilding", openHuffyUpgradeOverview);

                this.addToMainMenu("PreferencesMenu", preferencesButton);

                if (!MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.mainMenuWindow.show();
                  var target = qx.core.Init.getApplication().getOptionsBar(); //getServerBar(); //qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_APPOINTMENTS);
                  this.mainMenuWindow.placeToWidget(target, true);
                }

                phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, function () {
                  MaelstromTools.Cache.getInstance().SelectedBaseForLoot=null;
                });

                webfrontend.gui.chat.ChatWidget.recvbufsize = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 64);
                this.runSecondlyTimer();
                this.runMainTimer();
                this.runAutoCollectTimer();
              } catch (e) {
                console.log("MaelstromTools.initialize: ", e);
              }
            },

            desktopPosition: function (modifier) {
              if (!modifier) modifier = 0;
              return modifier;
            },

            createDesktopButton: function (title, imageName, isNotification, desktopPosition) {
              try {
                if (!isNotification) {
                  isNotification = false;
                }
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                var desktopButton = new qx.ui.form.Button(null, this.images[imageName]).set({
                  toolTipText: title,
                  width: 50,
                  height: 40,
                  maxWidth: 50,
                  maxHeight: 40,
                  appearance: (isNotification ? "button-standard-nod" : "button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
                  center: true
                });

                desktopButton.setUserData("isNotification", isNotification);
                desktopButton.setUserData("desktopPosition", desktopPosition);
                return desktopButton;
              } catch (e) {
                console.log("MaelstromTools.createDesktopButton: ", e);
              }
            },

            createNewImage: function (name, path, fileManager) {
              try {
                if (!this.images) {
                  this.images = {};
                }
                if (!fileManager) {
                  return;
                }

                this.images[name] = fileManager.GetPhysicalPath(path);
              } catch (e) {
                console.log("MaelstromTools.createNewImage: ", e);
              }
            },

            createNewWindow: function (name, align, x, y, w, h, alignV) {
              try {
                if (!this.mWindows) {
                  this.mWindows = {};
                }
                this.mWindows[name] = {};
                this.mWindows[name]["Align"] = align;
                this.mWindows[name]["AlignV"] = alignV;
                this.mWindows[name]["x"] = x;
                this.mWindows[name]["y"] = y;
                this.mWindows[name]["w"] = w;
                this.mWindows[name]["h"] = h;
              } catch (e) {
                console.log("MaelstromTools.createNewWindow: ", e);
              }
            },

            addToMainMenu: function (name, button) {
              try {
                /*if(!this.useDedicatedMainMenu) {
                  return;
                }*/
                if (this.itemsInMainMenu[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                var isNotification = button.getUserData("isNotification");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                if (!isNotification) {
                  isNotification = false;
                }

                if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop(name, button);
                } else {
                  if (!this.itemsInMainMenuCount[desktopPosition]) {
                    this.itemsInMainMenuCount[desktopPosition] = 0;
                  }
                  this.mainMenuWindow.add(button, {
                    right: 5 + (52 * this.itemsInMainMenuCount[desktopPosition]),
                    top: 0 + (42 * (desktopPosition)) //bottom: 0 - (42 * (desktopPosition - 1))
                  });

                  this.itemsInMainMenu[name] = button;
                  this.itemsInMainMenuCount[desktopPosition]++;
                }
              } catch (e) {
                console.log("MaelstromTools.addToMainMenu: ", e);
              }
            },

            removeFromMainMenu: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                if (this.itemsOnDesktop[name] != null) {
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!isNotification) {
                    isNotification = false;
                  }
                  if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.removeFromDesktop(name, rearrange);
                  }
                } else if (this.itemsInMainMenu[name] != null) {
                  var desktopPosition = this.itemsInMainMenu[name].getUserData("desktopPosition");
                  var isNotification = this.itemsInMainMenu[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  this.mainMenuWindow.remove(this.itemsInMainMenu[name]);
                  this.itemsInMainMenu[name] = null;
                  this.itemsInMainMenuCount[desktopPosition]--;

                  if (rearrange && this.itemsInMainMenu[desktopPosition] > 1) {
                    var tmpItems = {};
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsInMainMenu[itemName] == null) {
                        continue;
                      }
                      if (!isNotification) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsInMainMenu[itemName];
                      this.removeFromMainMenu(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            addToDesktop: function (name, button) {
              try {
                if (this.itemsOnDesktop[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }

                if (!this.itemsOnDesktopCount[desktopPosition]) {
                  this.itemsOnDesktopCount[desktopPosition] = 0;
                }

                var app = qx.core.Init.getApplication();
                //var navBar = app.getNavigationBar();

                // console.log("add to Desktop at pos: " + this.itemsOnDesktopCount);
                app.getDesktop().add(button, {
                  //right: navBar.getBounds().width + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: 42 * (desktopPosition - 1)
                  right: 5 + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: this.initialAppointmentBarHeight + 125 + (42 * (desktopPosition - 1))
                  bottom: 140 - (42 * (desktopPosition - 1))
                });

                this.itemsOnDesktop[name] = button;
                this.itemsOnDesktopCount[desktopPosition]++;
              } catch (e) {
                console.log("MaelstromTools.addToDesktop: ", e);
              }
            },

            removeFromDesktop: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                var app = qx.core.Init.getApplication();

                if (this.itemsOnDesktop[name] != null) {
                  var desktopPosition = this.itemsOnDesktop[name].getUserData("desktopPosition");
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  app.getDesktop().remove(this.itemsOnDesktop[name]);
                  this.itemsOnDesktop[name] = null;
                  this.itemsOnDesktopCount[desktopPosition]--;

                  if (rearrange && this.itemsOnDesktopCount[desktopPosition] > 1) {
                    var tmpItems = {};
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsOnDesktop[itemName] == null) {
                        continue;
                      }
                      if (!this.itemsOnDesktop[itemName].getUserData("isNotification")) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsOnDesktop[itemName];
                      this.removeFromDesktop(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            runSecondlyTimer: function () {
              try {
                this.calculateCostsForNextMCV();

                var self = this;
                setTimeout(function () {
                  self.runSecondlyTimer();
                }, 1000);
              } catch (e) {
                console.log("MaelstromTools.runSecondlyTimer: ", e);
              }
            },

            runMainTimer: function () {
              try {
                this.checkForPackages();
                this.checkRepairAllUnits();
                this.checkRepairAllBuildings();

                var missionTracker = typeof (qx.core.Init.getApplication().getMissionsBar) === 'function' ? qx.core.Init.getApplication().getMissionsBar() : qx.core.Init.getApplication().getMissionTracker(); //fix for PerforceChangelist>=376877
                if (MT_Preferences.Settings.autoHideMissionTracker) {
                  if (missionTracker.isVisible()) {
                    missionTracker.hide();
                  }
                  if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                    if (qx.core.Init.getApplication().getMissionsBar().getSizeHint().height != 0) {
                      qx.core.Init.getApplication().getMissionsBar().getSizeHint().height = 0;
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                } else {
                  if (!missionTracker.isVisible()) {
                    missionTracker.show();
                    if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                      qx.core.Init.getApplication().getMissionsBar().initHeight();
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                }
                
                var self = this;
                setTimeout(function () {
                  self.runMainTimer();
                }, this.mainTimerInterval);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            runAutoCollectTimer: function () {
              try {
                //console.log("runAutoCollectTimer ", MT_Preferences.Settings.AutoCollectTimer);
                if (!CCTAWrapperIsInstalled()) return; // run timer only then wrapper is running
                if (this.checkForPackages() && MT_Preferences.Settings.autoCollectPackages) {
                  this.collectAllPackages();
                }
                if (this.checkRepairAllUnits() && MT_Preferences.Settings.autoRepairUnits) {
                  this.repairAllUnits();
                }
                if (this.checkRepairAllBuildings() && MT_Preferences.Settings.autoRepairBuildings) {
                  this.repairAllBuildings();
                }

                var self = this;
                setTimeout(function () {
                  self.runAutoCollectTimer();
                }, MT_Preferences.Settings.AutoCollectTimer * 60000);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            openWindow: function (windowObj, windowName, skipMoveWindow) {
              try {
                if (!windowObj.isVisible()) {
                  if (windowName == "MainMenu") {
                    windowObj.show();
                  } else {
                    if (!skipMoveWindow) {
                      this.moveWindow(windowObj, windowName);
                    }
                    windowObj.open();
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.openWindow: ", e);
              }
            },

            moveWindow: function (windowObj, windowName) {
              try {
                var x = this.mWindows[windowName]["x"];
                var y = this.mWindows[windowName]["y"];
                if (this.mWindows[windowName]["Align"] == "R") {
                  x = qx.bom.Viewport.getWidth(window) - this.mWindows[windowName]["x"];
                }
                if (this.mWindows[windowName]["AlignV"] == "B") {
                  y = qx.bom.Viewport.getHeight(window) - this.mWindows[windowName]["y"] - windowObj.height;
                }
                windowObj.moveTo(x, y);
                if (windowName != "MainMenu") {
                  windowObj.setHeight(this.mWindows[windowName]["h"]);
                  windowObj.setWidth(this.mWindows[windowName]["w"]);
                }
              } catch (e) {
                console.log("MaelstromTools.moveWindow: ", e);
              }
            },

            checkForPackages: function () {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings() && !ncity.get_IsGhostMode()) {
                    this.addToMainMenu("CollectAllResources", this.buttonCollectAllResources);
                    return true;
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkForPackages: ", e);
                return false;
              }
            },

            collectAllPackages: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    ncity.CollectAllResources();
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
              } catch (e) {
                console.log("MaelstromTools.collectAllPackages: ", e);
              }
            },

            checkRepairAll: function (visMode, buttonName, button) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (!ncity.get_IsGhostMode() && ncity.get_CityRepairData().CanRepairAll(visMode)) {
                    this.addToMainMenu(buttonName, button);
                    return true;
                  }
                }

                this.removeFromMainMenu(buttonName);
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkRepairAll: ", e);
                return false;
              }
            },

            checkRepairAllUnits: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits", this.buttonRepairAllUnits);
            },

            checkRepairAllBuildings: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings", this.buttonRepairAllBuildings);
            },

            repairAll: function (visMode, buttonName) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (!ncity.get_IsGhostMode() && ncity.get_CityRepairData().CanRepairAll(visMode)) {
                    ncity.get_CityRepairData().RepairAll(visMode);
                  }

                }
                this.removeFromMainMenu(buttonName);
              } catch (e) {
                console.log("MaelstromTools.repairAll: ", e);
              }
            },

            //ClientLib.Data.City.prototype.get_CityRepairData
            //ClientLib.Data.CityRepair.prototype.CanRepairAll
            //ClientLib.Data.CityRepair.prototype.RepairAll
            repairAllUnits: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits");
              } catch (e) {
                console.log("MaelstromTools.repairAllUnits: ", e);
              }
            },

            repairAllBuildings: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings");
              } catch (e) {
                console.log("MaelstromTools.repairAllBuildings: ", e);
              }
            },

            updateLoot: function (ident, visCity, widget) {
              try {
                clearInterval(this.lootStatusInfoInterval);
                if (!MT_Preferences.Settings.showLoot) {
                  if (this.lootWidget[ident]) {
                    this.lootWidget[ident].removeAll();
                  }
                  return;
                }

                var baseLoadState = MT_Cache.updateLoot(visCity);
                if (baseLoadState == -2) { // base already cached and base not changed
                  return;
                }

                if (!this.lootWidget) {
                  this.lootWidget = {};
                }
                if (!this.lootWidget[ident]) {
                  this.lootWidget[ident] = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                  this.lootWidget[ident].setTextColor("white");
                  widget.add(this.lootWidget[ident]);
                }
                var lootWidget = this.lootWidget[ident];

                var rowIdx = 1;
                var colIdx = 1;
                lootWidget.removeAll();
                switch (baseLoadState) {
                  case -1:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Target out of range, no resource calculation possible", null, null, 'bold', null);
                      break;
                    }
                  case 1:
                    {
                      var Resources = MT_Cache.SelectedBaseResources;
                      this.createResourceLabels(lootWidget, ++rowIdx, "Possible attacks from this base (available CP)", Resources, - 1);
                      this.createResourceLabels(lootWidget, ++rowIdx, "Lootable resources", Resources, 1);
                      this.createResourceLabels(lootWidget, ++rowIdx, "per CP", Resources, 1 * Resources.CPNeeded);
                      this.createResourceLabels(lootWidget, ++rowIdx, "2nd run", Resources, 2 * Resources.CPNeeded);
                      this.createResourceLabels(lootWidget, ++rowIdx, "3rd run", Resources, 3 * Resources.CPNeeded);
                      break;
                    }
                  default:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Calculating resources...", null, null, 'bold', null);
                      this.lootStatusInfoInterval = setInterval(function () {
                        MaelstromTools.Base.getInstance().updateLoot(ident, visCity, widget);
                      }, 100);
                      break;
                    }
                }
              } catch (e) {
                console.log("MaelstromTools.updateLoot: ", e);
              }
            },

            createResourceLabels: function (lootWidget, rowIdx, Label, Resources, Modifier) {
              var colIdx = 1;
              var font = (Modifier > 1 ? null : 'bold');

              if (Modifier == -1 && Resources.CPNeeded > 0) {
                Label = Lang.gt(Label) + ": " + Math.floor(ClientLib.Data.MainData.GetInstance().get_Player().GetCommandPointCount() / Resources.CPNeeded);
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Label, null, 'left', font, null, 9);
                return;
              }
              colIdx = 1;
              if (Modifier > 0) {
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Lang.gt(Label) + ":", null, null, font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Research));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Research] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Tiberium] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Crystal] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Dollar));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Dollar] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage("Sum"));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources["Total"] / Modifier), 50, 'right', font);
              }
            },

            mcvPopup: null,
            mcvPopupX : 0,
            mcvPopupY : 0,
            mcvTimerLabel: null,
            calculateCostsForNextMCV: function () {
              try {
                if (!MT_Preferences.Settings.showCostsForNextMCV) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }
                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                var cw = player.get_Faction();
                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                var cr = player.get_PlayerResearch();
                var cd = cr.GetResearchItemFomMdbId(cj);
                if (cd == null) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                if (!this.mcvPopup) {
                  this.mcvPopup = new qx.ui.window.Window("").set({
                    contentPadding : 0,
                    showMinimize : false,
                    showMaximize : false,
                    showClose : false,
                    resizable : false
                  });
                  this.mcvPopup.setLayout(new qx.ui.layout.VBox());
                  this.mcvPopup.addListener("move", function (e) {
                    var base = MaelstromTools.Base.getInstance();
                    var size = qx.core.Init.getApplication().getRoot().getBounds();
                    var value = size.width - e.getData().left;
                    base.mcvPopupX = value < 0 ? 150 : value;
                    value = size.height - e.getData().top;
                    base.mcvPopupY = value < 0 ? 70 : value;
                    MaelstromTools.LocalStorage.set("mcvPopup", {
                      x : base.mcvPopupX,
                      y : base.mcvPopupY
                    });
                  });
                  var font = qx.bom.Font.fromString('bold').set({
                    size: 20
                  });

                  this.mcvTimerLabel = new qx.ui.basic.Label().set({
                    font: font,
                    textColor: 'red',
                    width: 155,
                    textAlign: 'center',
                    marginBottom : 5
                  });
                  this.mcvPopup.add(this.mcvTimerLabel);
                  var serverBar = qx.core.Init.getApplication().getServerBar().getBounds();
                  var pos = MaelstromTools.LocalStorage.get("mcvPopup", {
                      x : serverBar.width + 150,
                      y : 70
                    });
                  this.mcvPopupX = pos.x;
                  this.mcvPopupY = pos.y;
                  this.mcvPopup.open();
                }
                var size = qx.core.Init.getApplication().getRoot().getBounds();
                this.mcvPopup.moveTo(size.width - this.mcvPopupX, size.height - this.mcvPopupY);

                var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                var resourcesNeeded = [];
                for (var i in nextLevelInfo.rr) {
                  if (nextLevelInfo.rr[i].t > 0) {
                    resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                  }
                }
                //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                //var currentResearchPoints = player.get_ResearchPoints();

                var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                var creditsResourceData = player.get_Credits();
                var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;

                if (creditGrowthPerHour == 0 || creditTimeLeftInHours <= 0) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                this.mcvPopup.setCaption(Lang.gt("Next MCV") + " ($ " + MaelstromTools.Wrapper.FormatNumbersCompact(creditsNeeded) + ")");
                this.mcvTimerLabel.setValue(MaelstromTools.Wrapper.FormatTimespan(creditTimeLeftInHours * 60 * 60));

                if (!this.mcvPopup.isVisible()) {
                  this.mcvPopup.open();
                }
              } catch (e) {
                console.log("calculateCostsForNextMCV", e);
              }
            }
          }
        });

        // define Preferences
        qx.Class.define("MaelstromTools.Preferences", {
          type: "singleton",
          extend: qx.core.Object,

          statics: {
            USEDEDICATEDMAINMENU: "useDedicatedMainMenu",
            AUTOCOLLECTPACKAGES: "autoCollectPackages",
            AUTOREPAIRUNITS: "autoRepairUnits",
            AUTOREPAIRBUILDINGS: "autoRepairBuildings",
            AUTOHIDEMISSIONTRACKER: "autoHideMissionTracker",
            AUTOCOLLECTTIMER: "AutoCollectTimer",
            SHOWLOOT: "showLoot",
            SHOWCOSTSFORNEXTMCV: "showCostsForNextMCV",
            CHATHISTORYLENGTH: "ChatHistoryLength"
          },

          members: {
            Window: null,
            Widget: null,
            Settings: null,
            FormElements: null,

            readOptions: function () {
              try {
                if (!this.Settings) {
                  this.Settings = {};
                }

                /*
                if(MaelstromTools.LocalStorage.get("useDedicatedMainMenu") == null) {
                  if(qx.bom.Viewport.getWidth(window) > 1800) {
                    this.Settings["useDedicatedMainMenu"] = false;
                  }
                } else {
                  this.Settings["useDedicatedMainMenu"] = (MaelstromTools.LocalStorage.get("useDedicatedMainMenu", 1) == 1);
                }*/
                this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRUNITS, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 60);
                this.Settings[MaelstromTools.Preferences.SHOWLOOT] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWLOOT, 1) == 1);
                this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, 1) == 1);
                this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 64);

                if (!CCTAWrapperIsInstalled()) {
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = false;
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = false;
                  //this.Settings[MaelstromTools.Preferences.SHOWLOOT] = false;
                }
                //console.log(this.Settings);

              } catch (e) {
                console.log("MaelstromTools.Preferences.readOptions: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  //this.Window = new qx.ui.window.Window(WindowTitle).set({
                  this.Window = new webfrontend.gui.OverlayWindow().set({
                    autoHide: false,
                    title: WindowTitle,
                    minHeight: 350

                    //resizable: false,
                    //showMaximize:false,
                    //showMinimize:false,
                    //allowMaximize:false,
                    //allowMinimize:false,
                    //showStatusbar: false
                  });
                  this.Window.clientArea.setPadding(10);
                  this.Window.clientArea.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid().set({
                    spacingX: 5,
                    spacingY: 5
                  }));

                  //this.Widget.setTextColor("white");

                  this.Window.clientArea.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.setWidgetLabels();
                }
              } catch (e) {
                console.log("MaelstromTools.Preferences.openWindow: ", e);
              }
            },

            addFormElement: function (name, element) {
              this.FormElements[name] = element;
            },

            setWidgetLabels: function () {
              try {
                this.readOptions();

                this.FormElements = {};
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 1;

                var chkAutoHideMissionTracker = new qx.ui.form.CheckBox(Lang.gt("Hide Mission Tracker")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] == 1
                });
                var chkUseDedicatedMainMenu = new qx.ui.form.CheckBox(Lang.gt("Use dedicated Main Menu (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] == 1
                });
                var chkShowLoot = new qx.ui.form.CheckBox(Lang.gt("Show lootable resources (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWLOOT] == 1/*,
                  enabled: CCTAWrapperIsInstalled()*/
                });
                var chkCostsNextMCV = new qx.ui.form.CheckBox(Lang.gt("Show time to next MCV")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] == 1
                });
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoHideMissionTracker, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkUseDedicatedMainMenu, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkShowLoot, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkCostsNextMCV, 2);

                var chkAutoCollectPackages = new qx.ui.form.CheckBox(Lang.gt("Autocollect packages")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] == 1
                });
                var chkAutoRepairUnits = new qx.ui.form.CheckBox(Lang.gt("Autorepair units")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });
                var chkAutoRepairBuildings = new qx.ui.form.CheckBox(Lang.gt("Autorepair buildings")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });

                var spinnerChatHistoryLength = new qx.ui.form.Spinner().set({
                  minimum: 64,
                  maximum: 512,
                  value: this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Chat history length") + " (" + spinnerChatHistoryLength.getMinimum() + " - " + spinnerChatHistoryLength.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerChatHistoryLength);

                var spinnerAutoCollectTimer = new qx.ui.form.Spinner().set({
                  minimum: 5,
                  maximum: 60 * 6,
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Automatic interval in minutes") + " (" + spinnerAutoCollectTimer.getMinimum() + " - " + spinnerAutoCollectTimer.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerAutoCollectTimer);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoCollectPackages, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairUnits, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairBuildings, 2);

                var applyButton = new qx.ui.form.Button(Lang.gt("Apply changes")).set({
                  appearance: "button-addpoints",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                applyButton.addListener("execute", this.applyChanges, this);

                var cancelButton = new qx.ui.form.Button(Lang.gt("Discard changes")).set({
                  appearance: "button-addpoints",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                cancelButton.addListener("execute", function () {
                  this.Window.close();
                }, this);

                var resetButton = new qx.ui.form.Button(Lang.gt("Reset to default")).set({
                  appearance: "button-addpoints",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                resetButton.addListener("execute", this.resetToDefault, this);

                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, resetButton);
                colIdx = 1;
                MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, cancelButton);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, applyButton);

                this.addFormElement(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, chkAutoHideMissionTracker);
                this.addFormElement(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, chkUseDedicatedMainMenu);
                this.addFormElement(MaelstromTools.Preferences.SHOWLOOT, chkShowLoot);
                this.addFormElement(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, chkCostsNextMCV);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, chkAutoCollectPackages);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRUNITS, chkAutoRepairUnits);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, chkAutoRepairBuildings);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTTIMER, spinnerAutoCollectTimer);
                this.addFormElement(MaelstromTools.Preferences.CHATHISTORYLENGTH, spinnerChatHistoryLength);
              } catch (e) {
                console.log("MaelstromTools.Preferences.setWidgetLabels: ", e);
              }
            },

            applyChanges: function () {
              try {
                var autoRunNeeded = false;
                for (var idx in this.FormElements) {
                  var element = this.FormElements[idx];
                  if (idx == MaelstromTools.Preferences.AUTOCOLLECTTIMER) {
                    autoRunNeeded = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 0) != element.getValue());
                  }
                  if (idx == MaelstromTools.Preferences.CHATHISTORYLENGTH) {
                    webfrontend.gui.chat.ChatWidget.recvbufsize = element.getValue();
                  }
                  MaelstromTools.LocalStorage.set(idx, element.getValue());
                }
                this.readOptions();
                if (autoRunNeeded) {
                  MT_Base.runAutoCollectTimer();
                }
                this.Window.close();
              } catch (e) {
                console.log("MaelstromTools.Preferences.applyChanges: ", e);
              }
            },

            resetToDefault: function () {
              try {
                MaelstromTools.LocalStorage.clearAll();
                this.setWidgetLabels();
              } catch (e) {
                console.log("MaelstromTools.Preferences.resetToDefault: ", e);
              }
            }
          }
        });

        // define DefaultObject
        qx.Class.define("MaelstromTools.DefaultObject", {
          type: "abstract",
          extend: qx.core.Object,
          members: {
            Window: null,
            Widget: null,
            Cache: {}, //k null
            IsTimerEnabled: true,

            calc: function () {
              try {
                if (this.Window.isVisible()) {
                  this.updateCache();
                  this.setWidgetLabels();
                  if (this.IsTimerEnabled) {
                    var self = this;
                    setTimeout(function () {
                      self.calc();
                    }, MT_Base.timerInterval);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.calc: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  this.Window = new qx.ui.window.Window(WindowTitle).set({
                    resizable: false,
                    showMaximize: false,
                    showMinimize: false,
                    allowMaximize: false,
                    allowMinimize: false,
                    showStatusbar: false
                  });
                  this.Window.setPadding(10);
                  this.Window.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid());
                  this.Widget.setTextColor("white");

                  this.Window.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.calc();
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.openWindow: ", e);
              }
            }
          }
        });

        // define Production
        qx.Class.define("MaelstromTools.Production", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            updateCache: function (onlyForCity) {
              try {
                MT_Cache.updateCityCache();
                var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                //this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  if (onlyForCity != null && onlyForCity != cname) {
                    continue;
                  }
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (typeof (this.Cache[cname]) !== 'object') this.Cache[cname] = {};
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Tiberium]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Tiberium] = {}; // all have to be checked, 
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Crystal]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Crystal] = {}; // this.Cache[cname] can be created inside different namespaces
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Power]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Power] = {}; // like the RepairTime etc... without those objs
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Dollar]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Dollar] = {};

                  this.Cache[cname]["ProductionStopped"] = ncity.get_IsGhostMode();
                  this.Cache[cname]["PackagesStopped"] = (ncity.get_hasCooldown() || ncity.get_IsGhostMode());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false); // (production.d[ClientLib.Base.EResourceType.Tiberium]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium); //(production.d[ClientLib.Base.EResourceType.Tiberium]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false); //(production.d[ClientLib.Base.EResourceType.Crystal]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal); //(production.d[ClientLib.Base.EResourceType.Crystal]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Power]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false); //(production.d[ClientLib.Base.EResourceType.Power]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power); // (production.d[ClientLib.Base.EResourceType.Power]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["Delta"] = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["ExtraBonusDelta"] = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["POI"] = 0;
                  this.Cache[cname]["BaseLevel"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  if (onlyForCity != null && onlyForCity == cname) return this.Cache[cname];
                }
              } catch (e) {
                console.log("MaelstromTools.Production.updateCache: ", e);
              }
            },

            createProductionLabels2: function (rowIdx, colIdx, cityName, resourceType) {
              try {
                if (cityName == "-Total-") {
                  var Totals = Object();
                  Totals["Delta"] = 0;
                  Totals["ExtraBonusDelta"] = 0;
                  Totals["POI"] = 0;
                  Totals["Total"] = 0;

                  for (var cname in this.Cache) {
                    Totals["Delta"] += this.Cache[cname][resourceType]['Delta'];
                    Totals["ExtraBonusDelta"] += this.Cache[cname][resourceType]['ExtraBonusDelta'];
                    Totals["POI"] += this.Cache[cname][resourceType]['POI'];
                  }
                  Totals["Total"] = Totals['Delta'] + Totals['ExtraBonusDelta'] + Totals['POI'];

                  rowIdx++;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Delta']), 80, 'right', 'bold');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['ExtraBonusDelta']), 80, 'right', 'bold');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['POI']), 80, 'right', 'bold');
                  } else {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Total']), 80, 'right', 'bold');
                } else if (cityName == "-Labels-") {
                  MaelstromTools.Util.addImage(this.Widget, rowIdx++, colIdx, MaelstromTools.Util.getImage(resourceType));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Continuous", 100, 'left');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Bonus", 100, 'left');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "POI", 100, 'left');
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / BaseLevel", 100, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / h", 100, 'left');
                } else {
                  var cityCache = this.Cache[cityName];
                  if (rowIdx > 2) {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta']), 80, 'right', null, ((cityCache["ProductionStopped"] || cityCache[resourceType]['Delta'] == 0) ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['ExtraBonusDelta']), 80, 'right', null, ((cityCache["PackagesStopped"] || cityCache[resourceType]['ExtraBonusDelta'] == 0) ? "red" : "white"));
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['POI']), 80, 'right', null, (cityCache[resourceType]['POI'] == 0 ? "red" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact((cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']) / cityCache["BaseLevel"]), 80, 'right');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']), 80, 'right', 'bold');
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.Production.createProductionLabels2: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var rowIdx = 1;
                var colIdx = 1;

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Dollar);

                colIdx++;
                for (var cityName in this.Cache) {
                  rowIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, cityName, 80, 'right');

                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Tiberium);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Crystal);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Power);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Dollar);

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                }

                rowIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Total / h", 80, 'right', 'bold');

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Dollar);
              } catch (e) {
                console.log("MaelstromTools.Production.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define RepairTime
        qx.Class.define("MaelstromTools.RepairTime", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var RepLargest = '';

                  this.Cache[cname] = Object();
                  this.Cache[cname]["RepairTime"] = Object();
                  this.Cache[cname]["Repaircharge"] = Object();
                  this.Cache[cname]["Repaircharge"]["Smallest"] = 999999999;
                  this.Cache[cname]["RepairTime"]["Largest"] = 0;

                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                  this.Cache[cname]["RepairTime"]["Maximum"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);

                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft];
                  }

                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry];
                    RepLargest = "Infantry";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle];
                    RepLargest = "Vehicle";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft];
                    RepLargest = "Aircraft";
                  }

                  //PossibleAttacks and MaxAttacks fixes
                  var offHealth = ncity.GetOffenseConditionInPercent();
                  if (RepLargest !== '') {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = this.Cache[cname]["RepairTime"][RepLargest];
                    var i = Math.ceil(this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv); //fix
                    var j = this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv;
                    if (offHealth !== 100) { i--; i += '*';} // Decrease number of attacks by 1 when unit unhealthy. Additional visual info: asterisk when units aren't healthy
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = i;
                    var k = this.Cache[cname]["RepairTime"].Maximum / this.Cache[cname]["RepairTime"].LargestDiv;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = Math.ceil(k); //fix
                  } else {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = 0;
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = 0;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = 0;
                  }

                  var unitsData = ncity.get_CityUnitsData();
                  this.Cache[cname]["Base"] = Object();
                  this.Cache[cname]["Base"]["Level"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  this.Cache[cname]["Base"]["UnitLimit"] = ncity.GetBuildingSlotLimit(); //ncity.GetNumBuildings();
                  this.Cache[cname]["Base"]["TotalHeadCount"] = ncity.GetBuildingSlotCount();
                  this.Cache[cname]["Base"]["FreeHeadCount"] = this.Cache[cname]["Base"]["UnitLimit"] - this.Cache[cname]["Base"]["TotalHeadCount"];
                  this.Cache[cname]["Base"]["HealthInPercent"] = ncity.GetBuildingsConditionInPercent();

                  this.Cache[cname]["Offense"] = Object();
                  this.Cache[cname]["Offense"]["Level"] = (Math.floor(ncity.get_LvlOffense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Offense"]["UnitLimit"] = unitsData.get_UnitLimitOffense();
                  this.Cache[cname]["Offense"]["TotalHeadCount"] = unitsData.get_TotalOffenseHeadCount();
                  this.Cache[cname]["Offense"]["FreeHeadCount"] = unitsData.get_FreeOffenseHeadCount();
                  this.Cache[cname]["Offense"]["HealthInPercent"] = offHealth > 0 ? offHealth : 0;

                  this.Cache[cname]["Defense"] = Object();
                  this.Cache[cname]["Defense"]["Level"] = (Math.floor(ncity.get_LvlDefense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Defense"]["UnitLimit"] = unitsData.get_UnitLimitDefense();
                  this.Cache[cname]["Defense"]["TotalHeadCount"] = unitsData.get_TotalDefenseHeadCount();
                  this.Cache[cname]["Defense"]["FreeHeadCount"] = unitsData.get_FreeDefenseHeadCount();
                  this.Cache[cname]["Defense"]["HealthInPercent"] = ncity.GetDefenseConditionInPercent() > 0 ? ncity.GetDefenseConditionInPercent() : 0;

                  //console.log(ncity.get_CityUnitsData().get_UnitLimitOffense() + " / " + ncity.get_CityUnitsData().get_TotalOffenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeOffenseHeadCount());
                  //console.log(ncity.get_CityUnitsData().get_UnitLimitDefense() + " / " + ncity.get_CityUnitsData().get_TotalDefenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeDefenseHeadCount());
                }
              } catch (e) {
                console.log("MaelstromTools.RepairTime.updateCache: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;

                rowIdx = this.createOverviewLabels(rowIdx);
                rowIdx = this.createRepairchargeLabels(rowIdx);
              } catch (e) {
                console.log("MaelstromTools.RepairTime.setWidgetLabels: ", e);
              }
            },

            createRepairchargeLabels: function (rowIdx) {
              try {
                var colIdx = 2;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx++, "Repaircharges", null, 'left', null, null, 3);
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Infantry, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Vehicle, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Aircraft, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Repairtime", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Attacks", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Next at", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Max+1 at", 80, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  if (cityCache.Offense.UnitLimit == 0) {
                    continue;
                  }
                  colIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Infantry), 60, 'right', null, (cityCache.RepairTime.Infantry == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Vehicle), 60, 'right', null, (cityCache.RepairTime.Vehicle == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Aircraft), 60, 'right', null, (cityCache.RepairTime.Aircraft == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.Repaircharge.Smallest), 80, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.RepairTime.PossibleAttacks + " / " + cityCache.RepairTime.MaxAttacks, 60, 'right', null, (cityCache.Offense.HealthInPercent !== 100 ? 'red' : null)); // mark red when unhealthy
                    var i = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.PossibleAttacks;
                    var j = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.MaxAttacks;
                    (i>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(i), 80, 'right', null, (i > cityCache.RepairTime.Maximum ? "yellow" : "white")) : colIdx++; /// yellow if more than Maximum RT
                    (j>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(j), 80, 'right') : colIdx++;
                  } else {
                    colIdx += 7;
                  }

                  colIdx += 4;
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName, PerforceChangelist >= 376877 ? ClientLib.Data.PlayerAreaViewMode.pavmPlayerOffense : webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerOffense));
                  rowIdx += 2;
                }

                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createRepairchargeLabels: ", e);
              }
            },

            createOverviewLabels: function (rowIdx) {
              try {
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Base", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Defense", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Army", 60, 'right');

                rowIdx++;
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Units", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.Level, 60, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.TotalHeadCount + " / " + cityCache.Base.UnitLimit, 60, 'right', null, (cityCache.Base.FreeHeadCount >= 1 ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.HealthInPercent + "%", 60, 'right', null, (cityCache.Base.HealthInPercent < 25 ? "red" : (cityCache.Base.HealthInPercent < 100 ? "yellow" : "white")));

                  if (cityCache.Defense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.TotalHeadCount + " / " + cityCache.Defense.UnitLimit, 60, 'right', null, (cityCache.Defense.FreeHeadCount >= 5 ? "red" : (cityCache.Defense.FreeHeadCount >= 3 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.HealthInPercent + "%", 60, 'right', null, (cityCache.Defense.HealthInPercent < 25 ? "red" : (cityCache.Defense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.TotalHeadCount + " / " + cityCache.Offense.UnitLimit, 60, 'right', null, (cityCache.Offense.FreeHeadCount >= 10 ? "red" : (cityCache.Offense.FreeHeadCount >= 5 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.HealthInPercent + "%", 60, 'right', null, (cityCache.Offense.HealthInPercent < 25 ? "red" : (cityCache.Offense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx += 2;
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createOverviewLabels: ", e);
              }
            }

          }
        });

        // define ResourceOverview
        qx.Class.define("MaelstromTools.ResourceOverview", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            Table: null,
            Model: null,

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var mtime = ClientLib.Data.MainData.GetInstance().get_Time();

                  this.Cache[cname] = Object();
                  this.Cache[cname][MaelstromTools.Statics.Tiberium] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Tiberium));
                  this.Cache[cname][MaelstromTools.Statics.Crystal] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Crystal));
                  this.Cache[cname][MaelstromTools.Statics.Power] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Power));
                }

              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.updateCache: ", e);
              }
            },
/*
            setWidgetLabelsTable: function () {
              try {
                if (!this.Table) {
                  this.Widget.setLayout(new qx.ui.layout.HBox());

                  this.Model = new qx.ui.table.model.Simple();
                  this.Model.setColumns(["City", "Tib. Storage", "Tiberium", "Full", "Crystal", "Full", "Power", "Storage", "Full"]);
                  this.Table = new qx.ui.table.Table(this.Model);
                  this.Widget.add(this.Table, {
                    flex: 1
                  });
                }

                var Totals = Object();
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                var rowData = [];

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];

                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  rowData.push([
                    cityName,
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full'])
                    ]);
                }
                rowData.push([
                  'Total resources',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']),
                  ''
                  ]);

                this.Model.setData(rowData);
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            },

            */
            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var first = true;
                var rowIdx = 2;
                var Totals = Object();
                var colIdx = 1;
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left');
                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Max. storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right');

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= cityCache[MaelstromTools.Statics.Tiberium + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Tiberium] < cityCache[MaelstromTools.Statics.Tiberium + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }
                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= cityCache[MaelstromTools.Statics.Crystal + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Crystal] < cityCache[MaelstromTools.Statics.Crystal + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Power));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= cityCache[MaelstromTools.Statics.Power + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white")));

                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']), 80, 'right');

                  if (cityCache[MaelstromTools.Statics.Power] < cityCache[MaelstromTools.Statics.Power + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }


                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx++;
                  first = false;
                }

                colIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Total resources", 100, 'left', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Tiberium] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Crystal] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Power] / Totals[MaelstromTools.Statics.Power + 'Max'] * 100) + '%', 100, 'center', 'bold');
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define BaseStatus
        qx.Class.define("MaelstromTools.BaseStatus", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            CityMenuButtons: null,

            //City.SetDedicatedSupport
            //City.RecallDedicatedSupport
            //City.get_SupportDedicatedBaseId
            //System.String get_SupportDedicatedBaseName ()
            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var player = ClientLib.Data.MainData.GetInstance().get_Player();
                  var supportData = ncity.get_SupportData();
                  //System.String get_PlayerName ()
                  this.Cache[cname] = Object();
                  // Movement lock
                  this.Cache[cname]["HasCooldown"] = ncity.get_hasCooldown();
                  this.Cache[cname]["CooldownEnd"] = Math.max(ncity.get_MoveCooldownEndStep(), ncity.get_MoveRestictionEndStep());
                  this.Cache[cname]["MoveCooldownEnd"] = ncity.get_MoveCooldownEndStep();
                  this.Cache[cname]["MoveLockdownEnd"] = ncity.get_MoveRestictionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_isProtected();
                  this.Cache[cname]["ProtectionEnd"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsAlerted"] = ncity.get_isAlerted();

                  // Supportweapon
                  if (supportData == null) {
                    this.Cache[cname]["HasSupportWeapon"] = false;
                  } else {
                    this.Cache[cname]["HasSupportWeapon"] = true;
                    if (ncity.get_SupportDedicatedBaseId() > 0) {
                      this.Cache[cname]["SupportedCityId"] = ncity.get_SupportDedicatedBaseId();
                      this.Cache[cname]["SupportedCityName"] = ncity.get_SupportDedicatedBaseName();
                      var coordId = ncity.get_SupportDedicatedBaseCoordId();
                      this.Cache[cname]["SupportedCityX"] = (coordId & 0xffff);
                      this.Cache[cname]["SupportedCityY"] = ((coordId >> 0x10) & 0xffff);
                      /*
                      var cityX = ncity.get_PosX();
                      var cityY = ncity.get_PosY();
                      
                      var mainData = ClientLib.Data.MainData.GetInstance();
                      var visRegion = ClientLib.Vis.VisMain.GetInstance().get_Region();

                      var gridW = visRegion.get_GridWidth();
                      var gridH = visRegion.get_GridHeight();
                      //console.log(cname);
                      //console.log("x: " + cityX + " y: " + cityY);

                      var worldObj = visRegion.GetObjectFromPosition((this.Cache[cname]["SupportedCityX"]*gridW), (this.Cache[cname]["SupportedCityY"]*gridH));
                      
                      //ClientLib.Vis.Region.RegionCity
                      if (worldObj == null) {
                        this.Cache[cname]["SupportTime"] = "";
                      } else {
                        console.log(cname);
                        //console.log(worldObj.CalibrationSupportDuration());
                        var weaponState = worldObj.get_SupportWeaponStatus();
                        
                        //console.log(this.calcDuration(ncity, worldObj));
                        var cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                        cities.set_CurrentOwnCityId(ncity.get_Id());
                        var status = worldObj.get_SupportWeaponStatus();
                        var server = mainData.get_Server();
                        //console.log(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()));
                        console.log(status);
                        console.log(currStep);
                        this.Cache[cname]["SupportTime"] = mainData.get_Time().GetTimespanString(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()), currStep);
                        //status.Status&ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating)==ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating
                        var currStep = ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep();
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, status.CalibrationEndStep) - currStep), false);
                        //this.Cache[cname]["SupportTime"] = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(weaponState.CalibrationEndStep, currStep);
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()) - currStep)), false);
                      //console.log(this.Cache[cname]["SupportTime"]);
                      }
                       */
                    } else { // prevent reference to undefined property ReferenceError
                      this.Cache[cname]["SupportedCityId"] = null;
                      this.Cache[cname]["SupportedCityName"] = null;
                      this.Cache[cname]["SupportedCityX"] = null;
                      this.Cache[cname]["SupportedCityY"] = null;
                    }
                    this.Cache[cname]["SupportRange"] = MaelstromTools.Wrapper.GetSupportWeaponRange(ncity.get_SupportWeapon());
                    var techName = ClientLib.Base.Tech.GetTechNameFromTechId(supportData.get_Type(), player.get_Faction());
                    this.Cache[cname]["SupportName"] = ClientLib.Base.Tech.GetProductionBuildingNameFromFaction(techName, player.get_Faction());
                    this.Cache[cname]["SupportLevel"] = supportData.get_Level();
                    //this.Cache[cname]["SupportBuilding"] = ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName);
                    //console.log(this.Cache[cname]["SupportBuilding"]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.updateCache: ", e);
              }
            },
            /*
            calcDuration: function(currOwnCity, regionCity) {
              var targetCity = MaelstromTools.Wrapper.GetCity(regionCity.get_Id());
              
              var supportBase=regionCity.get_SupportData();
              if(supportBase == null)
              {
                return -1;
              }
              var weapon=regionCity.get_SupportWeapon();
              if(weapon == null)
              {
                return -1;
              }
              if(currOwnCity.get_Id() == regionCity.get_Id())
              {
                if(supportBase.get_Magnitude() == 0) {
                  return -1;
                }
                return 0;
              }
              var dx=(currOwnCity.get_X() - targetCity.get_PosX());
              var dy=(currOwnCity.get_Y() - targetCity.get_PosY());
              var distance=((dx * dx) + (dy * dy));
              return Math.floor((weapon.pt + (weapon.tpf * Math.floor((Math.sqrt(distance) + 0.5)))));
            },*/

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Cooldown", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Protection", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Available weapon", 140, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Calibrated on", 140, 'left');

                //colIdx++;
                var rowIdxRecall = rowIdx;
                var colIdxRecall = 0;
                var supportWeaponCount = 0;

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left', null, (cityCache.IsAlerted ? 'red' : null));

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.CooldownEnd), 70, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.ProtectionEnd), 70, 'right');

                  if (!cityCache.HasSupportWeapon) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "none", 140, 'left');
                    colIdx += 2;
                  } else {
                    supportWeaponCount++;
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportName + " (" + cityCache.SupportLevel + ")", 140, 'left');

                    if (cityCache.SupportedCityId > 0) {
                      MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportedCityName, 140, 'left');
                      colIdxRecall = colIdx;
                      MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, this.getRecallButton(cityName));
                    } else {
                      colIdx += 2;
                    }
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getFocusBaseButton(cityName));

                  rowIdx++;
                }

                if (supportWeaponCount > 0 && colIdxRecall > 0) {
                  MaelstromTools.Util.addElement(this.Widget, rowIdxRecall, colIdxRecall, this.getRecallAllButton());
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.setWidgetLabels: ", e);
              }
            },

            getRecallAllButton: function () {
              var button = new qx.ui.form.Button("Recall all").set({
                appearance: "button-text-small",
                toolTipText: "Recall all support weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallAllSupport();
              }, this);
              return button;
            },

            getRecallButton: function (cityName) {
              var button = new qx.ui.form.Button("Recall").set({
                appearance: "button-text-small",
                toolTipText: "Recall support to " + cityName,
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallSupport(cityName);
              }, this);
              return button;
            }
            /*
            getCalibrateAllOnSelectedBaseButton: function() {
              var button = new qx.ui.form.Button("Calibrate all weapons on selected base").set({
                appearance: "button-text-small",
                toolTipText: "Calibrate all weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function(e){
                Util.calibrateWholeSupport(ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId());
              }, this);
              return button;
            }*/


          }
        });

        // define Statics
        qx.Class.define("MaelstromTools.Statics", {
          type: "static",
          statics: {
            Tiberium: 'Tiberium',
            Crystal: 'Crystal',
            Power: 'Power',
            Dollar: 'Dollar',
            Research: 'Research',
            Vehicle: "Vehicle",
            Aircraft: "Aircraft",
            Infantry: "Infantry",

            LootTypeName: function (ltype) {
              switch (ltype) {
                case ClientLib.Base.EResourceType.Tiberium:
                  return MaelstromTools.Statics.Tiberium;
                  break;
                case ClientLib.Base.EResourceType.Crystal:
                  return MaelstromTools.Statics.Crystal;
                  break;
                case ClientLib.Base.EResourceType.Power:
                  return MaelstromTools.Statics.Power;
                  break;
                case ClientLib.Base.EResourceType.Gold:
                  return MaelstromTools.Statics.Dollar;
                  break;
                default:
                  return "";
                  break;
              }
            }
          }
        });

        // define Util
        //ClientLib.Data.Cities.prototype.GetCityByCoord
        //ClientLib.Data.City.prototype.get_HasIncommingAttack
        qx.Class.define("MaelstromTools.Util", {
          type: "static",
          statics: {
            ArrayUnique: function (array) {
              var o = {};
              var l = array.length;
              r = [];
              for (var i = 0; i < l; i++) o[array[i]] = array[i];
              for (var i in o) r.push(o[i]);
              return r;
            },

            ArraySize: function (array) {
              var size = 0;
              for (var key in array)
              if (array.hasOwnProperty(key)) size++;
              return size;
            },

            addLabel: function (widget, rowIdx, colIdx, value, width, textAlign, font, color, colSpan) {
              try {
                var label = new qx.ui.basic.Label().set({
                  value: Lang.gt(value)
                });
                if (width) {
                  label.setWidth(width);
                }
                if (textAlign) {
                  label.setTextAlign(textAlign);
                }
                if (color) {
                  label.setTextColor(color);
                }
                if (font) {
                  label.setFont(font);
                }
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }

                widget.add(label, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addLabel: ", e);
              }
            },

            addElement: function (widget, rowIdx, colIdx, element, colSpan) {
              try {
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }
                widget.add(element, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addElement: ", e);
              }
            },

            addImage: function (widget, rowIdx, colIdx, image) {
              try {
                widget.add(image, {
                  row: rowIdx,
                  column: colIdx
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addImage: ", e);
              }
            },

            getImage: function (name) {
              var image = new qx.ui.basic.Image(MT_Base.images[name]);
              image.setScale(true);
              image.setWidth(20);
              image.setHeight(20);
              return image;
            },

            getAccessBaseButton: function (cityName, viewMode) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["AccessBase"]).set({
                  appearance: "button-addpoints",
                  toolTipText: Lang.gt("Access") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.setUserData("viewMode", viewMode);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.accessBase(e.getTarget().getUserData("cityId"), e.getTarget().getUserData("viewMode"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getAccessBaseButton: ", e);
              }
            },

            getFocusBaseButton: function (cityName) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["FocusBase"]).set({
                  appearance: "button-addpoints",
                  toolTipText: Lang.gt("Focus on") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.focusBase(e.getTarget().getUserData("cityId"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getFocusBaseButton: ", e);
              }
            },

            accessBase: function (cityId, viewMode) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    if (viewMode) {
                      webfrontend.gui.UtilView.openVisModeInMainWindow(viewMode, cityId, false);
                    } else {
                      webfrontend.gui.UtilView.openCityInMainWindow(cityId);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.accessBase: ", e);
              }
            },
            focusBase: function (cityId) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    webfrontend.gui.UtilView.centerCityOnRegionViewWindow(cityId);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.focusBase: ", e);
              }
            },

            recallSupport: function (cityName) {
              try {
                var ncity = MT_Cache.Cities[cityName]["Object"];
                ncity.RecallDedicatedSupport();
              } catch (e) {
                console.log("MaelstromTools.Util.recallSupport: ", e);
              }
            },

            recallAllSupport: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  ncity.RecallDedicatedSupport();
                }
              } catch (e) {
                console.log("MaelstromTools.Util.recallAllSupport: ", e);
              }
            },

            checkIfSupportIsAllowed: function (selectedBase) {
              try {
                if (selectedBase.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.RegionCityType) {
                  return false;
                }
                if (selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Own && selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance) {
                  return false;
                }
                return true;
              } catch (e) {
                console.log("MaelstromTools.Util.checkIfSupportIsAllowed: ", e);
                return false;
              }
            },

            calibrateWholeSupportOnSelectedBase: function () {
              if (this.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu)) {
                this.calibrateWholeSupport(MT_Cache.SelectedBaseForMenu);
              }
            },

            calibrateWholeSupport: function (targetRegionCity) {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  //var targetCity = MaelstromTools.Wrapper.GetCity(targetCityId);
                  var weapon = ncity.get_SupportWeapon();

                  //console.log("checking support weapon for " + ncity.get_Name() + " calibrating on " + targetRegionCity.get_Name());

                  if (targetRegionCity != null && weapon != null) {
                    //console.log("city at " + ncity.get_X() + " / " + ncity.get_Y());
                    //console.log("targetRegionCity at " + targetRegionCity.get_RawX() + " / " + targetRegionCity.get_RawY());
                    //var distance = ClientLib.Base.Util.CalculateDistance(ncity.get_X(), ncity.get_Y(), targetRegionCity.get_RawX(), targetRegionCity.get_RawY());
                    var dx = (ncity.get_X() - targetRegionCity.get_RawX());
                    var dy = (ncity.get_Y() - targetRegionCity.get_RawY());
                    var distance = ((dx * dx) + (dy * dy));
                    var range = MaelstromTools.Wrapper.GetSupportWeaponRange(weapon);
                    //console.log("distance is " + distance);
                    //console.log("range isy " + range*range);
                    if (distance <= (range * range)) {
                      ncity.SetDedicatedSupport(targetRegionCity.get_Id());
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.calibrateWholeSupport: ", e);
              }
            },

            // visCity : ClientLib.Vis.Region.RegionObject
            getResources: function (visCity) { // to verifier against PerforceChangelist>=376877
              try {
                var loot = {};
                if (visCity.get_X() < 0 || visCity.get_Y() < 0) {
                  loot["LoadState"] = 0;
                  return loot;
                }
                var currentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                var distance = ClientLib.Base.Util.CalculateDistance(currentOwnCity.get_X(), currentOwnCity.get_Y(), visCity.get_RawX(), visCity.get_RawY());
                var maxAttackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();
                if (distance > maxAttackDistance) {
                  loot["LoadState"] = -1;
                  return loot;
                }

                var ncity = MaelstromTools.Wrapper.GetCity(visCity.get_Id());
                /* ClientLib.Data.CityBuildings */
                //var cityBuildings = ncity.get_CityBuildingsData();
                var cityUnits = ncity.get_CityUnitsData();

                //var buildings = MaelstromTools.Wrapper.GetBuildings(cityBuildings);
                var buildings = ncity.get_Buildings().d;
                var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits(cityUnits);
                //var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits();

                /*for(var u in buildings) {
              console.log(buildings[u].get_MdbBuildingId());
              console.log("----------------");
            }*/

                var buildingLoot = MaelstromTools.Util.getResourcesPart(buildings);
                //var buildingLoot2 = MaelstromTools.Util.getResourcesPart(this.collectBuildings(ncity));

                var unitLoot = MaelstromTools.Util.getResourcesPart(defenseUnits);

                loot[MaelstromTools.Statics.Tiberium] = buildingLoot[ClientLib.Base.EResourceType.Tiberium] + unitLoot[ClientLib.Base.EResourceType.Tiberium];
                loot[MaelstromTools.Statics.Crystal] = buildingLoot[ClientLib.Base.EResourceType.Crystal] + unitLoot[ClientLib.Base.EResourceType.Crystal];
                loot[MaelstromTools.Statics.Dollar] = buildingLoot[ClientLib.Base.EResourceType.Gold] + unitLoot[ClientLib.Base.EResourceType.Gold];
                loot[MaelstromTools.Statics.Research] = buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + unitLoot[ClientLib.Base.EResourceType.ResearchPoints];
                loot["Factor"] = loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar] + loot[MaelstromTools.Statics.Research];
                loot["CPNeeded"] = currentOwnCity.CalculateAttackCommandPointCostToCoord(ncity.get_X(), ncity.get_Y());
                loot["LoadState"] = (loot["Factor"] > 0 ? 1 : 0);
                loot["Total"] = loot[MaelstromTools.Statics.Research] + loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar];

                /*console.log("Building loot");
                console.log( buildingLoot[ClientLib.Base.EResourceType.Tiberium] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Tiberium]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Crystal] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Crystal]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Gold] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Gold]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.ResearchPoints]);
                console.log("-------------");*/
                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResources", e);
              }
            },
            /*
            collectBuildings: function(ncity) {
              var cityBuildings = ncity.get_CityBuildingsData();
              var buildings = [];
              var count = 0;
              // ncity.GetNumBuildings()
              for(var i = 0; i < 100000; i++) {
                var building = cityBuildings.GetBuildingByMDBId(i);
                if(!building) {
                  continue;
                }
                
                //console.log(building.get_TechName() + " - " + ncity.get_CityFaction() + " - " + ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(building.get_TechName(), ncity.get_CityFaction()) + " at lvl " + building.get_CurrentLevel());
                buildings.push(building);
              //buildings[count++] = building;
              }
              return buildings; //MaelstromTools.Util.ArrayUnique(buildings);
            },*/

            getResourcesPart: function (cityEntities) {
              try {
                var loot = [0, 0, 0, 0, 0, 0, 0, 0];
                if (cityEntities == null) {
                  return loot;
                }

                var objcityEntities = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in cityEntities) objcityEntities.push(cityEntities[o]);
                } else { //old
                  for (var i = 0; i < cityEntities.length; i++) objcityEntities.push(cityEntities[i]);
                }

                for (var i = 0; i < objcityEntities.length; i++) {
                  var cityEntity = objcityEntities[i];
                  var unitLevelRequirements = MaelstromTools.Wrapper.GetUnitLevelRequirements(cityEntity);

                  for (var x = 0; x < unitLevelRequirements.length; x++) {
                    loot[unitLevelRequirements[x].Type] += unitLevelRequirements[x].Count * cityEntity.get_HitpointsPercent();
                    if (cityEntity.get_HitpointsPercent() < 1.0) {
                      // destroyed

                    }
                  }
                }

                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResourcesPart", e);
              }
            }

            /*
            findBuildings: function(city) {
              for (var k in city) {
                if ((typeof(city[k]) == "object") && city[k] && city[k] && 0 in city[k]) {
                  if ((typeof(city[k][0]) == "object")  && city[k][0] && "BuildingDBId" in city[k][0]) {
                    return city[k];
                  }
                }
              }
              return [];
            }*/
          }
        });

        // define Wrapper
        qx.Class.define("MaelstromTools.Wrapper", {
          type: "static",
          statics: {
            GetStepTime: function (step, defaultString) {
              if (!defaultString) {
                defaultString = "";
              }
              var endTime = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(step, ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep());
              if (endTime == "00:00") {
                return defaultString;
              }
              return endTime;
            },

            FormatNumbersCompact: function (value) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(value);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(value);
              }
            },

            GetDateTimeString: function (value) {
                return phe.cnc.Util.getDateTimeString(value);
            },

            FormatTimespan: function (value) {
              return ClientLib.Vis.VisMain.FormatTimespan(value);
            },

            GetSupportWeaponRange: function (weapon) {
              return weapon.r;
            },

            GetCity: function (cityId) {
              return ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cityId);
            },

            GetDefenseUnits: function (cityUnits) {
            //GetDefenseUnits: function () {
              if (PerforceChangelist >= 392583) { //endgame patch
                return (cityUnits.get_DefenseUnits() != null ? cityUnits.get_DefenseUnits().d : null);
              } else { //old
                var defenseObjects = [];
                for (var x = 0; x < 9; x++) {
                  for (var y = 0; y < 8; y++) {
                    var defenseObject = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().GetDefenseObjectFromPosition((x * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth()),(y * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight()));
                    if (defenseObject !== null && defenseObject.get_CityEntity() !== null) {
                      defenseObjects.push(defenseObject.get_UnitDetails());
                    }
                  }
                }
                return defenseObjects;
              }
            },
            GetUnitLevelRequirements: function (cityEntity) {
              if (PerforceChangelist >= 376877) { //new
                return (cityEntity.get_UnitLevelRepairRequirements() != null ? cityEntity.get_UnitLevelRepairRequirements() : null);
              } else { //old
                return (cityEntity.get_UnitLevelRequirements() != null ? cityEntity.get_UnitLevelRequirements() : null);
              }
            },

            GetBaseLevel: function (ncity) {
              return (Math.floor(ncity.get_LvlBase() * 100) / 100).toFixed(2);
            }
            /*,
            
            GetPointsByLevelWithThresholds: function (_levelThresholds,_levelFactors,_iLevel) {
              var result=0;
              var lastLevel=_iLevel;
              if(_levelThresholds.length != _levelFactors.length) {
                return 0;
              }
              for (var i=(_levelThresholds.length - 1); (i >= 0); i--) {
                var threshold=(_levelThresholds[i] - 1);
                if(lastLevel >= threshold) {
                  result += ((lastLevel - threshold) * _levelFactors[i]);
                  lastLevel=threshold;
                }
              }
              return result;
            },
            GetArmyPoints: function(_iLevel) {
              var server = ClientLib.Data.MainData.GetInstance().get_Server();
              var m_iArmyPointsPerLevelThresholds = server.get_ArmyPointsPerLevelThresholds();
              var m_fArmyPointsPerLevel = server.get_ArmyPointsPerLevel();
              _iLevel += 4;
              var armyPoints = MaelstromTools.Wrapper.GetPointsByLevelWithThresholds(m_iArmyPointsPerLevelThresholds, m_fArmyPointsPerLevel, _iLevel);
              return Math.min(armyPoints, server.get_MaxArmyPoints());
            },
            
            GetBuilding: function(ncity, techName) {
              return ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName)
            },
            
            GetCommandCenter: function(ncity) {
              //var techName = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Command_Center, ClientLib.Data.MainData.GetInstance().get_Player().get_Faction());

              return MaelstromTools.Wrapper.GetBuilding(ncity, ClientLib.Base.ETechName.Command_Center);
            // conyard return this.GetBuildingCondition$0(ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction$0(0, ClientLib.Data.MainData.GetInstance$9().get_Player$2().get_Faction$2()));
            // ClientLib.Data.City.prototype.GetOffenseConditionInPercent=ClientLib.Data.City.prototype.GetOffenseConditionInPercent$0;
            }*/
          }
        });

        // define LocalStorage
        qx.Class.define("MaelstromTools.LocalStorage", {
          type: "static",
          statics: {
            isSupported: function () {
              return typeof (Storage) !== "undefined";
            },
            set: function (key, value) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  localStorage["CCTA_MaelstromTools_" + key] = JSON.stringify(value);
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.set: ", e);
              }
            },
            get: function (key, defaultValueIfNotSet) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  if (localStorage["CCTA_MaelstromTools_" + key] != null && localStorage["CCTA_MaelstromTools_" + key] != 'undefined') {
                    return JSON.parse(localStorage["CCTA_MaelstromTools_" + key]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.get: ", e);
              }
              return defaultValueIfNotSet;
            },
            clearAll: function () {
              try {
                if (!MaelstromTools.LocalStorage.isSupported()) {
                  return;
                }
                for (var key in localStorage) {
                  if (key.indexOf("CCTA_MaelstromTools_") == 0) {
                    localStorage.removeItem(key);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.clearAll: ", e);
              }
            }
          }
        });

        // define Cache
        qx.Class.define("MaelstromTools.Cache", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            CityCount: 0,
            Cities: null,
            SelectedBaseForMenu: null,
            SelectedBaseResources: null,
            SelectedBaseForLoot: null,

            updateCityCache: function () {
              try {
                this.CityCount = 0;
                this.Cities = Object();

                var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
                for (var cindex in cities.d) {
                  this.CityCount++;
                  var ncity = MaelstromTools.Wrapper.GetCity(cindex);
                  var ncityName = ncity.get_Name();
                  this.Cities[ncityName] = Object();
                  this.Cities[ncityName]["ID"] = cindex;
                  this.Cities[ncityName]["Object"] = ncity;
                }
              } catch (e) {
                console.log("MaelstromTools.Cache.updateCityCache: ", e);
              }
            },

            updateLoot: function (visCity) {
              var cityId = visCity.get_Id();

              if (this.SelectedBaseForLoot != null && cityId == this.SelectedBaseForLoot.get_Id() && this.SelectedBaseResources != null && this.SelectedBaseResources["LoadState"] > 0) {
                return -2;
              }
              this.SelectedBaseForLoot = visCity;
              this.SelectedBaseResources = MaelstromTools.Util.getResources(visCity);
              return this.SelectedBaseResources["LoadState"];
            }
          }
        });

        // define HuffyTools.ImageRender
        qx.Class.define("HuffyTools.ImageRender", {
          extend: qx.ui.table.cellrenderer.AbstractImage,
          construct: function (width, height) {
            this.base(arguments);
            if (width) {
              this.__imageWidth = width;
            }
            if (height) {
              this.__imageHeight = height;
            }
            this.__am = qx.util.AliasManager.getInstance();
          },
          members: {
            __am: null,
            __imageHeight: 16,
            __imageWidth: 16,
            // overridden
            _identifyImage: function (cellInfo) {
              var imageHints = {
                imageWidth: this.__imageWidth,
                imageHeight: this.__imageHeight
              };
              if (cellInfo.value == "") {
                imageHints.url = null;
              } else {
                imageHints.url = this.__am.resolve(cellInfo.value);
              }
              imageHints.tooltip = cellInfo.tooltip;
              return imageHints;
            }
          },
          destruct: function () {
            this.__am = null;
          }
        });

        // define HuffyTools.ReplaceRender
        qx.Class.define("HuffyTools.ReplaceRender", {
          extend: qx.ui.table.cellrenderer.Default,
          properties: {
            replaceFunction: {
              check: "Function",
              nullable: true,
              init: null
            }
          },
          members: {
            // overridden
            _getContentHtml: function (cellInfo) {
              var value = cellInfo.value;
              var replaceFunc = this.getReplaceFunction();
              // use function
              if (replaceFunc) {
                cellInfo.value = replaceFunc(value);
              }
              return qx.bom.String.escape(this._formatValue(cellInfo));
            }
          }
        });

        qx.Class.define("HuffyTools.CityCheckBox", {
          extend: qx.ui.form.CheckBox,
          members: {
            HT_CityID: null
          }
        });

        // define HuffyTools.UpgradePriorityGUI
        qx.Class.define("HuffyTools.UpgradePriorityGUI", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            HT_TabView: null,
            HT_Options: null,
            HT_ShowOnlyTopBuildings: null,
            HT_ShowOnlyAffordableBuildings: null,
            HT_CityBuildings: null,
            HT_Pages: null,
            HT_Tables: null,
            HT_Models: null,
            HT_SelectedResourceType: null,
            BuildingList: null,
            upgradeInProgress: null,
			upgradeToDoType: null,
			upgradeToDo: null,
            init: function () {
              /*
              Done:
              - Added cost per gain to the lists
              - Added building coordinates to the lists
              - Only display the top affordable and not affordable building
              - Persistent filter by city, top and affordable per resource type
              - Reload onTabChange for speed optimization
              - Estimated time until upgrade is affordable
              
              ToDo:
              - let the user decide to sort by colums he like i.e. timefactor or cost/gain and save it in the configuration
              - integrate buttons to transfer resources ?

               */
              try {
                this.HT_SelectedResourceType = -1;
                this.IsTimerEnabled = false;
                this.upgradeInProgress = false;

                this.HT_TabView = new qx.ui.tabview.TabView();
                this.HT_TabView.set({
                  contentPadding: 0,
                  appearance: "tabview",
                  margin: 5,
                  barPosition: 'left'
                });
                this.Widget = new qx.ui.tabview.Page("UpgradePriority");
                this.Widget.setPadding(0);
                this.Widget.setMargin(0);
                this.Widget.setBackgroundColor("#BEC8CF");
                this.Widget.setLayout(new qx.ui.layout.VBox(2));
                //this.Widget.add(this.HT_Options);
                this.Widget.add(this.HT_TabView, {
                  flex: 1
                });
                this.Window.setPadding(0);
                this.Window.set({
                  resizable: true
                });

                this.Window.removeAll();
                this.Window.add(this.Widget);

                this.BuildingList = [];
                this.HT_Models = [];
                this.HT_Tables = [];
                this.HT_Pages = [];

				if (PerforceChangelist >= 436669) { // 15.3 patch
					var eventType = "cellTap";
				} else { //old
					var eventType = "cellClick";
				}
				
                this.createTabPage(ClientLib.Base.EResourceType.Tiberium);
                this.createTable(ClientLib.Base.EResourceType.Tiberium);
                this.HT_Tables[ClientLib.Base.EResourceType.Tiberium].addListener(eventType, function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Tiberium);
                }, this);


                this.createTabPage(ClientLib.Base.EResourceType.Crystal);
                this.createTable(ClientLib.Base.EResourceType.Crystal);
                this.HT_Tables[ClientLib.Base.EResourceType.Crystal].addListener(eventType, function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Crystal);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Power);
                this.createTable(ClientLib.Base.EResourceType.Power);
                this.HT_Tables[ClientLib.Base.EResourceType.Power].addListener(eventType, function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Power);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Gold);
                this.createTable(ClientLib.Base.EResourceType.Gold);
                this.HT_Tables[ClientLib.Base.EResourceType.Gold].addListener(eventType, function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Gold);
                }, this);


                MT_Cache.updateCityCache();
                this.HT_Options = [];
                this.HT_ShowOnlyTopBuildings = [];
                this.HT_ShowOnlyAffordableBuildings = [];
                this.HT_CityBuildings = [];
                for (var mPage in this.HT_Pages) {
                  this.createOptions(mPage);
                  this.HT_Pages[mPage].add(this.HT_Options[mPage]);
                  this.HT_Pages[mPage].add(this.HT_Tables[mPage], {
                    flex: 1
                  });
                  this.HT_TabView.add(this.HT_Pages[mPage]);
                }

                // Zeigen wir Dollars an !
                this.HT_TabView.setSelection([this.HT_TabView.getChildren()[2]]);
                this.HT_SelectedResourceType = ClientLib.Base.EResourceType.Gold;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.init: ", e);
              }
            },
            createOptions: function (eType) {
              var oBox = new qx.ui.layout.Flow();
              var oOptions = new qx.ui.container.Composite(oBox);
              oOptions.setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only top buildings"));
              this.HT_ShowOnlyTopBuildings[eType].setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_TOPBUILDINGS_" + eType, true));
              this.HT_ShowOnlyTopBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyTopBuildings[eType], {
                left: 10,
                top: 10
              });
              this.HT_ShowOnlyAffordableBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only affordable buildings"));
              this.HT_ShowOnlyAffordableBuildings[eType].setMargin(5);
              this.HT_ShowOnlyAffordableBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_AFFORDABLE_" + eType, true));
              this.HT_ShowOnlyAffordableBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyAffordableBuildings[eType], {
                left: 10,
                top: 10,
                lineBreak: true
              });
              this.HT_CityBuildings[eType] = [];
              for (var cname in MT_Cache.Cities) {
                var oCity = MT_Cache.Cities[cname].Object;
                var oCityBuildings = new HuffyTools.CityCheckBox(cname);
                oCityBuildings.HT_CityID = oCity.get_Id();
                oCityBuildings.setMargin(5);
                oCityBuildings.setValue(MaelstromTools.LocalStorage.get("UGL_CITYFILTER_" + eType + "_" + oCity.get_Id(), true));
                oCityBuildings.addListener("execute", this.CBChanged, this);
                oOptions.add(oCityBuildings, {
                  left: 10,
                  top: 10
                });
                this.HT_CityBuildings[eType][cname] = oCityBuildings;
              }
              var buttonUpgradeAll = new qx.ui.form.Button("UpgradeAll").set({
                width : 80,
                appearance : "button-text-small",
                toolTipText : "Upgrade all filtered buildings"
              });
              buttonUpgradeAll.addListener("execute", function (e) {
                  this.upgradeAll(e, eType);
                }, this);
              oOptions.add(buttonUpgradeAll, {
                  left: 10,
                  top: 10
                });
              this.HT_Options[eType] = oOptions;
            },
            createTable: function (eType) {
              try {
                this.HT_Models[eType] = new qx.ui.table.model.Simple();
                this.HT_Models[eType].setColumns(["ID", Lang.gt("City"), Lang.gt("Type (coord)"), Lang.gt("to Level"), Lang.gt("Gain/h"), Lang.gt("Factor"), Lang.gt("Tiberium"), Lang.gt("Power"), Lang.gt("Tib/gain"), Lang.gt("Pow/gain"), Lang.gt("ETA"), Lang.gt("Upgrade"), "State"]);
                this.HT_Tables[eType] = new qx.ui.table.Table(this.HT_Models[eType]);
                this.HT_Tables[eType].setColumnVisibilityButtonVisible(false);
                this.HT_Tables[eType].setColumnWidth(0, 0);
                this.HT_Tables[eType].setColumnWidth(1, 90);
                this.HT_Tables[eType].setColumnWidth(2, 120);
                this.HT_Tables[eType].setColumnWidth(3, 55);
                this.HT_Tables[eType].setColumnWidth(4, 70);
                this.HT_Tables[eType].setColumnWidth(5, 60);
                this.HT_Tables[eType].setColumnWidth(6, 70);
                this.HT_Tables[eType].setColumnWidth(7, 70);
                this.HT_Tables[eType].setColumnWidth(8, 70);
                this.HT_Tables[eType].setColumnWidth(9, 70);
                this.HT_Tables[eType].setColumnWidth(10, 70);
                this.HT_Tables[eType].setColumnWidth(11, 40);
                this.HT_Tables[eType].setColumnWidth(12, 0);
                var tcm = this.HT_Tables[eType].getTableColumnModel();
                tcm.setColumnVisible(0, false);
                tcm.setColumnVisible(12, false);
                tcm.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }));
                tcm.setDataCellRenderer(5, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 5,
                    minimumFractionDigits: 5
                  })
                }));
                tcm.setDataCellRenderer(6, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(7, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(11, new HuffyTools.ImageRender(40, 20));
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTable: ", e);
              }
            },
            createTabPage: function (resource_type) {
              try {
                var sName = MaelstromTools.Statics.LootTypeName(resource_type);
                var oRes = new qx.ui.tabview.Page(Lang.gt(sName), MT_Base.images[sName]);
                oRes.setLayout(new qx.ui.layout.VBox(2));
                oRes.setPadding(5);
                var btnTab = oRes.getChildControl("button");
                btnTab.resetWidth();
                btnTab.resetHeight();
                btnTab.set({
                  show: "icon",
                  margin: 0,
                  padding: 0,
                  toolTipText: sName
                });
                btnTab.addListener("execute", this.TabChanged, [this, resource_type]);
                this.HT_Pages[resource_type] = oRes;
                return oRes;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTabPage: ", e);
              }
            },

            TabChanged: function (e) {
              try {
                this[0].HT_SelectedResourceType = this[1];
                this[0].UpgradeCompleted(null, null);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.TabChanged: ", e);
              }
            },
            upgradeAll: function (e, eResourceType) {
              try {
                if (this.upgradeToDo == null) {
                  this.upgradeToDoType = parseInt(eResourceType);
                  this.upgradeToDo = this.HT_Models[eResourceType].getData();
                }
                if (this.upgradeToDo.length > 0) {
                  this.upgradeInProgress = true;
                  var current = this.upgradeToDo.pop();
                  var buildingID = current[0];
                  var iState = parseInt(current[12]);
                  if (iState != 1) {
                    return;
                  }
                  if (buildingID in this.BuildingList) {
                    if (PerforceChangelist >= 382917) { //new
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.upgradeAllCompleted), null, true);
                    } else { //old
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], webfrontend.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.upgradeAllCompleted), null, true);
                    }
                  }
                } else {
                  this.upgradeToDo = null;
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.upgradeBuilding: ", e);
              }
            },
            upgradeAllCompleted: function (context, result) {
              var self = this;
              if (this.upgradeToDo.length > 0) {
                setTimeout(function () {
                  self.upgradeAll(self.upgradeToDoType);
                }, 100);
              } else {
                this.upgradeToDoType = null;
                this.upgradeToDo = null;
                setTimeout(function () {
                  self.calc();
                }, 100);
                this.upgradeInProgress = false;
              }
            },
            upgradeBuilding: function (e, eResourceType) {
              if (this.upgradeInProgress == true) {
                console.log("upgradeBuilding:", "upgrade in progress !");
                return;
              }
              try {
                if (e.getColumn() == 11) {
                  var buildingID = this.HT_Models[eResourceType].getValue(0, e.getRow());
                  var iState = parseInt(this.HT_Models[eResourceType].getValue(12, e.getRow()));
                  if (iState != 1) {
                    return;
                  }
                  if (buildingID in this.BuildingList) {
                    this.upgradeInProgress = true;
                    if (PerforceChangelist >= 382917) { //new
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    } else { //old
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], webfrontend.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    }
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.upgradeBuilding: ", e);
              }
            },
            UpgradeCompleted: function (context, result) {
              /* Dodgy solution to get upgrade priority working.
                 Upgrades in the game were reworked in the February patch and again in the March patch.
                 In the past resources were deducted from the base immediately when the upgrade command was sent, but now it is done moments after the upgrade has been completed.
                 When running updateCache() immediately after the upgrade it will still return with the pre-upgrade resource amounts.
                 A one second delay will work as a temporary solution giving the base enough time to update to reflect the new resource amounts.
                 A better solution could be to monitor for the reduction in resources after an upgrade and once it takes place only then update the cache.
              */
              var self = this;
              setTimeout(function () {
                self.calc();
              }, 1000);
              //this.calc();
              this.upgradeInProgress = false;
            },
            CBChanged: function (e) {
              this.UpgradeCompleted(null, null);
            },
            formatTiberiumAndPower: function (oValue) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(oValue);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(oValue);
              }
            },
            updateCache: function () {
              try {
                if (!this.HT_TabView) {
                  this.init();
                }
                var eType = this.HT_SelectedResourceType;
                var bTop = this.HT_ShowOnlyTopBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_TOPBUILDINGS_" + eType, bTop);
                var bAffordable = this.HT_ShowOnlyAffordableBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_AFFORDABLE_" + eType, bAffordable);
                var oCityFilter = [];
                for (var cname in this.HT_CityBuildings[eType]) {
                  var oCityBuildings = this.HT_CityBuildings[eType][cname];
                  var bFilterBuilding = oCityBuildings.getValue();
                  MaelstromTools.LocalStorage.set("UGL_CITYFILTER_" + eType + "_" + oCityBuildings.HT_CityID, bFilterBuilding);
                  oCityFilter[cname] = bFilterBuilding;
                }
                HuffyTools.UpgradePriority.getInstance().collectData(bTop, bAffordable, oCityFilter, eType);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.updateCache: ", e);
              }
            },
            setWidgetLabels: function () {
              try {
                var HuffyCalc = HuffyTools.UpgradePriority.getInstance();
                var UpgradeList = HuffyCalc.Cache;

                for (var eResourceType in UpgradeList) {
                  //var eResourceType = MaelstromTools.Statics.LootTypeName(eResourceName);
                  var rowData = [];

                  this.HT_Models[eResourceType].setData([]);

                  for (var mCity in UpgradeList[eResourceType]) {
                    for (var mBuilding in UpgradeList[eResourceType][mCity]) {
                      var UpItem = UpgradeList[eResourceType][mCity][mBuilding];
                      if (typeof (UpItem.Type) == "undefined") {
                        continue;
                      }
                      if (!(mBuilding in this.BuildingList)) {
                        this.BuildingList[UpItem.ID] = UpItem.Building;
                      }
                      var iTiberiumCosts = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumCosts = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium];
                      }
                      var iTiberiumPerGain = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium] / UpItem.GainPerHour;
                      }
                      var iPowerCosts = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerCosts = UpItem.Costs[ClientLib.Base.EResourceType.Power];
                      }
                      var iPowerPerGain = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Power] / UpItem.GainPerHour;
                      }
                      var img = MT_Base.images["UpgradeBuilding"];
                      if (UpItem.Affordable == false) {
                        img = "";
                      }
                      var sType = UpItem.Type;
                      sType = sType + "(" + UpItem.PosX + ":" + UpItem.PosY + ")";
                      var iETA = 0;
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium] > 0) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium];
                      }
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power] > iETA) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power];
                      }
                      var sETA = "";
                      if (iETA > 0) {
                        sETA = ClientLib.Vis.VisMain.FormatTimespan(iETA);
                      }
                      var iState = 0;
                      if (UpItem.Affordable == true) {
                        iState = 1;
                      } else if (UpItem.AffordableByTransfer == true) {
                        iState = 2;
                      } else {
                        iState = 3;
                      }
                      rowData.push([UpItem.ID, mCity, sType, UpItem.Level, UpItem.GainPerHour, UpItem.Ticks, iTiberiumCosts, iPowerCosts, iTiberiumPerGain, iPowerPerGain, sETA, img, iState]);
                    }
                  }
                  this.HT_Models[eResourceType].setData(rowData);
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define HuffyTools.UpgradePriority
        qx.Class.define("HuffyTools.UpgradePriority", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            list_units: null,
            list_buildings: null,

            comparePrio: function (elem1, elem2) {
              if (elem1.Ticks < elem2.Ticks) return -1;
              if (elem1.Ticks > elem2.Ticks) return 1;
              return 0;
            },
            getPrioList: function (city, arTechtypes, eModPackageSize, eModProduction, bOnlyTopBuildings, bOnlyAffordableBuildings) {
              try {
                var RSI = MaelstromTools.ResourceOverview.getInstance();
                RSI.updateCache();
                var TotalTiberium = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  var i = cityCache[MaelstromTools.Statics.Tiberium];
                  if (typeof (i) !== 'undefined') {
                    TotalTiberium += i;
                    //but never goes here during test.... // to optimize - to do
                  }
                }
                var resAll = [];
                var prod = MaelstromTools.Production.getInstance().updateCache(city.get_Name());
                //var buildings = MaelstromTools.Wrapper.GetBuildings(city.get_CityBuildingsData());
                var buildings = city.get_Buildings().d;

                // 376877 & old fixes 
                var objbuildings = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in buildings) objbuildings.push(buildings[o]);
                } else { //old
                  for (var i = 0; i < buildings.length; i++) objbuildings.push(buildings[i]);
                }


                for (var i = 0; i < objbuildings.length; i++) {
                  var city_building = objbuildings[i];

                  // TODO: check for destroyed building

                  var iTechType = city_building.get_TechName();
                  var bSkip = true;
                  for (var iTypeKey in arTechtypes) {
                    if (arTechtypes[iTypeKey] == iTechType) {
                      bSkip = false;
                      break;
                    }
                  }
                  if (bSkip == true) {
                    continue;
                  }
                  var city_buildingdetailview = city.GetBuildingDetailViewInfo(city_building);
                  if (city_buildingdetailview == null) {
                    continue;
                  }
                  var bindex = city_building.get_Id();
                  var resbuilding = [];
                  resbuilding["ID"] = bindex;
                  resbuilding["Type"] = this.TechTypeName(parseInt(iTechType, 10));
                  resbuilding["PosX"] = city_building.get_CoordX();
                  resbuilding["PosY"] = city_building.get_CoordY();

                  resbuilding["Building"] = {
                    cityid: city.get_Id(),
                    posX: resbuilding["PosX"],
                    posY: resbuilding["PosY"],
                    isPaid: true
                  };

                  resbuilding["GainPerHour"] = 0;
                  resbuilding["Level"] = city_building.get_CurrentLevel() + 1;
                  for (var ModifierType in city_buildingdetailview.OwnProdModifiers.d) {
                    switch (parseInt(ModifierType, 10)) {
                      case eModPackageSize:
                        {
                          var ModOj = city_buildingdetailview.OwnProdModifiers.d[city_building.get_MainModifierTypeId()];
                          var Mod = (ModOj.TotalValue + ModOj.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                          resbuilding["GainPerHour"] += (city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta / Mod);
                          break;
                        }
                      case eModProduction:
                        {
                          resbuilding["GainPerHour"] += city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta;
                          break;
                        }
                    }
                  }
                  // Nutzen ins VerhÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¤ltnis zu den Kosten setzten
                  var TechLevelData = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(city_building.get_CurrentLevel() + 1, city_building.get_TechGameData_Obj());
                  var RatioPerCostType = {};
                  var sRatio = "";
                  var sCosts = "";
                  var lTicks = 0;
                  var bHasPower = true;
                  var bHasTiberium = true;
                  var bAffordableByTransfer = true;
                  var oCosts = [];
                  var oTimes = [];
                  for (var costtype in TechLevelData) {
                    if (typeof (TechLevelData[costtype]) == "function") {
                      continue;
                    }
                    if (TechLevelData[costtype].Type == "0") {
                      continue;
                    }

                    oCosts[TechLevelData[costtype].Type] = TechLevelData[costtype].Count;
                    if (parseInt(TechLevelData[costtype].Count) <= 0) {
                      continue;
                    }
                    RatioPerCostType[costtype] = TechLevelData[costtype].Count / resbuilding["GainPerHour"];
                    if (sCosts.length > 0) {
                      sCosts = sCosts + ", ";
                    }
                    sCosts = sCosts + MaelstromTools.Wrapper.FormatNumbersCompact(TechLevelData[costtype].Count) + " " + MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);
                    if (sRatio.length > 0) {
                      sRatio = sRatio + ", ";
                    }
                    // Upgrade affordable ?
                    if (city.GetResourceCount(TechLevelData[costtype].Type) < TechLevelData[costtype].Count) {
                      switch (TechLevelData[costtype].Type) {
                        case ClientLib.Base.EResourceType.Tiberium:
                          {
                            bHasTiberium = false;
                            if (TotalTiberium < TechLevelData[costtype].Count) {
                              bAffordableByTransfer = false;
                            }
                          }
                          break;
                        case ClientLib.Base.EResourceType.Power:
                          {
                            bHasPower = false;
                          }
                          break;
                      }
                    }
                    sRatio = sRatio + MaelstromTools.Wrapper.FormatNumbersCompact(RatioPerCostType[costtype]);

                    var techlevelData = MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);

                    var dCityProduction = prod[techlevelData].Delta + prod[techlevelData].ExtraBonusDelta + prod[techlevelData].POI;
                    if (dCityProduction > 0) {
                      if (lTicks < (3600 * RatioPerCostType[costtype] / dCityProduction)) {
                        lTicks = (3600 * RatioPerCostType[costtype] / dCityProduction);
                      }
                    }
                    oTimes[TechLevelData[costtype].Type] = 0;
                    if (oCosts[TechLevelData[costtype].Type] > city.GetResourceCount(TechLevelData[costtype].Type)) {
                      oTimes[TechLevelData[costtype].Type] = (3600 * (oCosts[TechLevelData[costtype].Type] - city.GetResourceCount(TechLevelData[costtype].Type))) / dCityProduction;
                    }
                  }
                  resbuilding["Ticks"] = lTicks;
                  resbuilding["Time"] = ClientLib.Vis.VisMain.FormatTimespan(lTicks);
                  resbuilding["Costtext"] = sCosts;
                  resbuilding["Costs"] = oCosts;
                  resbuilding["TimeTillUpgradable"] = oTimes;
                  resbuilding["Ratio"] = sRatio;
                  resbuilding["Affordable"] = bHasTiberium && bHasPower;
                  resbuilding["AffordableByTransfer"] = bHasPower && bAffordableByTransfer;
                  if (resbuilding["GainPerHour"] > 0 && (bOnlyAffordableBuildings == false || resbuilding["Affordable"] == true)) {
                    resAll[bindex] = resbuilding;
                  }
                }


                resAll = resAll.sort(this.comparePrio);
                if (!bOnlyTopBuildings) {
                  return resAll;
                }
                var res2 = [];
                if (MaelstromTools.Util.ArraySize(resAll) > 0) {
                  var iTopNotAffordable = -1;
                  var iTopAffordable = -1;
                  var iNextNotAffordable = -1;
                  var iLastIndex = -1;
                  for (var iNewIndex in resAll) {
                    if (resAll[iNewIndex].Affordable == true) {
                      if (iTopAffordable == -1) {
                        iTopAffordable = iNewIndex;
                        iNextNotAffordable = iLastIndex;
                      }
                    } else {
                      if (iTopNotAffordable == -1) {
                        iTopNotAffordable = iNewIndex;
                      }
                    }
                    iLastIndex = iNewIndex;
                  }
                  if (iTopAffordable == -1) {
                    iNextNotAffordable = iLastIndex;
                  }
                  var iIndex = 0;
                  if (iTopNotAffordable != -1) {
                    res2[iIndex++] = resAll[iTopNotAffordable];
                  }
                  if (iNextNotAffordable != -1) {
                    res2[iIndex++] = resAll[iNextNotAffordable];
                  }
                  if (iTopAffordable != -1) {
                    res2[iIndex++] = resAll[iTopAffordable];
                  }
                }
                res2 = res2.sort(this.comparePrio);
                return res2;
              } catch (e) {
                console.log("HuffyTools.getPrioList: ", e);
              }
            },
            TechTypeName: function (iTechType) {
              switch (iTechType) {
                case ClientLib.Base.ETechName.PowerPlant:
                  {
                    return Lang.gt("Powerplant");
                    break;
                  }
                case ClientLib.Base.ETechName.Refinery:
                  {
                    return Lang.gt("Refinery");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester_Crystal:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Silo:
                  {
                    return Lang.gt("Silo");
                    break;
                  }
                case ClientLib.Base.ETechName.Accumulator:
                  {
                    return Lang.gt("Accumulator");
                    break;
                  }
              }
              return "?";
            },
            collectData: function (bOnlyTopBuildings, bOnlyAffordableBuildings, oCityFilter, eSelectedResourceType) {
              try {
                MT_Cache.updateCityCache();
                this.Cache = {};
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                  this.Cache[ClientLib.Base.EResourceType.Tiberium] = {};
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                  this.Cache[ClientLib.Base.EResourceType.Crystal] = {};
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                  this.Cache[ClientLib.Base.EResourceType.Power] = {};
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                  this.Cache[ClientLib.Base.EResourceType.Gold] = {};
                }
                for (var cname in MT_Cache.Cities) {
                  var city = MT_Cache.Cities[cname].Object;
                  if (oCityFilter[cname] == false) {
                    continue;
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                    this.Cache[ClientLib.Base.EResourceType.Tiberium][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.TiberiumPackageSize, ClientLib.Base.EModifierType.TiberiumProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                    this.Cache[ClientLib.Base.EResourceType.Crystal][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.CrystalPackageSize, ClientLib.Base.EModifierType.CrystalProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                    this.Cache[ClientLib.Base.EResourceType.Power][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.PowerPlant, ClientLib.Base.ETechName.Accumulator], ClientLib.Base.EModifierType.PowerPackageSize, ClientLib.Base.EModifierType.PowerProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                    this.Cache[ClientLib.Base.EResourceType.Gold][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Refinery, ClientLib.Base.ETechName.PowerPlant], ClientLib.Base.EModifierType.CreditsPackageSize, ClientLib.Base.EModifierType.CreditsProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.collectData: ", e);
              }
            }
          }
        });

        var __MTCity_initialized = false; //k undeclared

        var Lang = MaelstromTools.Language.getInstance();
        var MT_Cache = MaelstromTools.Cache.getInstance();
        var MT_Base = MaelstromTools.Base.getInstance();
        var MT_Preferences = MaelstromTools.Preferences.getInstance();
        MT_Preferences.readOptions();

        if (!webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {

          MT_Cache.SelectedBaseForMenu = selectedVisObject;
          var baseStatusOverview = MaelstromTools.BaseStatus.getInstance();

          if (__MTCity_initialized == false) {
            //console.log(selectedBase.get_Name());
            __MTCity_initialized = true;
            baseStatusOverview.CityMenuButtons = [];

            for (var k in this) {
              try {
                if (this.hasOwnProperty(k)) {
                  if (this[k] && this[k].basename == "Composite") {
                    var button = new qx.ui.form.Button(Lang.gt("Calibrate support"));
                    button.addListener("execute", function (e) {
                      MaelstromTools.Util.calibrateWholeSupportOnSelectedBase();
                    }, this);

                    this[k].add(button);
                    baseStatusOverview.CityMenuButtons.push(button);
                  }
                }
              } catch (e) {
                console.log("webfrontend.gui.region.RegionCityMenu.prototype.showMenu: ", e);
              }
            }
          }

          var isAllowed = MaelstromTools.Util.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu);

          for (var x = 0; x < baseStatusOverview.CityMenuButtons.length; ++x) {
            baseStatusOverview.CityMenuButtons[x].setVisibility(isAllowed ? 'visible' : 'excluded');
          }
          this.__MTCity_showMenu(selectedVisObject);
        };

        if (MT_Preferences.Settings.showLoot) {
          // Wrap onCitiesChange method
          if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp) {
            webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(1, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance());
            return this.__MTCity_NPCCamp();
          };

          if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase) {
            webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(2, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            //MT_Base.updateLoot(2, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            return this.__MTCity_NPCBase();
          };

          if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City) {
            webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(3, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            //MT_Base.updateLoot(3, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            return this.__MTCity_City();
          };
        }

      }
    } catch (e) {
      console.log("createMaelstromTools: ", e);
    }

    function MaelstromTools_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
          createMaelstromTools();
          MaelstromTools.Base.getInstance().initialize();
        } else {
          setTimeout(MaelstromTools_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("MaelstromTools_checkIfLoaded: ", e);
      }
    }
    setTimeout(MaelstromTools_checkIfLoaded, 1000);
  };

  try {
    var MaelstromScript = document.createElement("script");
    MaelstromScript.innerHTML = "(" + MaelstromTools_main.toString() + ")();";
    MaelstromScript.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(MaelstromScript);
  } catch (e) {
    console.log("MaelstromTools: init error: ", e);
  }
})();

// ==UserScript==
// @name        Maelstrom Tools ADDON Basescanner
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Maelstrom ADDON Basescanner
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.8.5
// @author      BlinDManX
// @grant       none
// @copyright   2012+, Claus Neumann
// @license     CC BY-NC-ND 3.0 - http://creativecommons.org/licenses/by-nc-nd/3.0/
// ==/UserScript==
(function () {
	var MaelstromTools_Basescanner = function () {
		window.__msbs_version = "1.8.5";
		function createMaelstromTools_Basescanner() {

			qx.Class.define("Addons.BaseScannerGUI", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function () {
					try {
						this.base(arguments);
						console.info("Addons.BaseScannerGUI " + window.__msbs_version);
						this.T = Addons.Language.getInstance();
						this.setWidth(820);
						this.setHeight(400);
						this.setContentPadding(10);
						this.setShowMinimize(true);
						this.setShowMaximize(true);
						this.setShowClose(true);
						this.setResizable(true);
						this.setAllowMaximize(true);
						this.setAllowMinimize(true);
						this.setAllowClose(true);
						this.setShowStatusbar(false);
						this.setDecorator(null);
						this.setPadding(5);
						this.setLayout(new qx.ui.layout.VBox(3));
						this.stats.src = 'http://goo.gl/DrJ2x'; //1.5

						this.FI();
						this.FH();
						this.FD();
						if (this.ZE == null) {
							this.ZE = [];
						}
						this.setPadding(0);
						this.removeAll();

						this.add(this.ZF);
						this.add(this.ZN);

						this.add(this.ZP);
						this.ZL.setData(this.ZE);							

					} catch (e) {
						console.debug("Addons.BaseScannerGUI.construct: ", e);
					}
				},
				members : {
					// pictures
					stats : document.createElement('img'),
					T : null,
					ZA : 0,
					ZB : null,
					ZC : null,
					ZD : null,
					ZE : null,
					ZF : null,
					ZG : null,
					ZH : false,
					ZI : true,
					ZJ : null,
					ZK : null,
					ZL : null,
					ZM : null,
					ZN : null,
					ZO : null,
					ZP : null,
					ZQ : null,
					ZR : [],
					ZT : true,
					ZU : null,
					ZV : null,
					ZX : null,
					ZY : null,
					ZZ : [],
					ZS : {},
					YZ : null,
					YY : null,
					
					openWindow : function (title) {
						try {
							this.setCaption(title);
							if (this.isVisible()) {
								this.close();
							} else {
								MT_Cache.updateCityCache();
								MT_Cache = window.MaelstromTools.Cache.getInstance();
								var cname;								
								this.ZC.removeAll();
								for (cname in MT_Cache.Cities) {
									var item = new qx.ui.form.ListItem(cname, null, MT_Cache.Cities[cname].Object);
									this.ZC.add(item);
									if (Addons.LocalStorage.getserver("Basescanner_LastCityID") == MT_Cache.Cities[cname].Object.get_Id()) {
										this.ZC.setSelection([item]);
									}
								}							
								this.open();
								this.moveTo(100, 100);
							}
						} catch (e) {
							console.log("MaelstromTools.DefaultObject.openWindow: ", e);
						}
					},
					FI : function () {
						try {
							this.ZL = new qx.ui.table.model.Simple();
							this.ZL.setColumns(["ID", "LoadState", this.T.get("City"), this.T.get("Location"), this.T.get("Level"), this.T.get("Tiberium"), this.T.get("Crystal"), this.T.get("Dollar"), this.T.get("Research"), "Crystalfields", "Tiberiumfields", this.T.get("Building state"), this.T.get("Defense state"), this.T.get("CP"), "Def.HP/Off.HP", "Sum Tib+Cry+Cre", "(Tib+Cry+Cre)/CP", "CY", "DF", this.T.get("base set up at")]);
							this.YY = ClientLib.Data.MainData.GetInstance().get_Player();
							this.ZN = new qx.ui.table.Table(this.ZL);
							this.ZN.setColumnVisibilityButtonVisible(false);
							this.ZN.setColumnWidth(0, 0);
							this.ZN.setColumnWidth(1, 0);
							this.ZN.setColumnWidth(2, Addons.LocalStorage.getserver("Basescanner_ColWidth_2", 120));
							this.ZN.setColumnWidth(3, Addons.LocalStorage.getserver("Basescanner_ColWidth_3", 60));
							this.ZN.setColumnWidth(4, Addons.LocalStorage.getserver("Basescanner_ColWidth_4", 50));
							this.ZN.setColumnWidth(5, Addons.LocalStorage.getserver("Basescanner_ColWidth_5", 60));
							this.ZN.setColumnWidth(6, Addons.LocalStorage.getserver("Basescanner_ColWidth_6", 60));
							this.ZN.setColumnWidth(7, Addons.LocalStorage.getserver("Basescanner_ColWidth_7", 60));
							this.ZN.setColumnWidth(8, Addons.LocalStorage.getserver("Basescanner_ColWidth_8", 60));
							this.ZN.setColumnWidth(9, Addons.LocalStorage.getserver("Basescanner_ColWidth_9", 30));
							this.ZN.setColumnWidth(10, Addons.LocalStorage.getserver("Basescanner_ColWidth_10", 30));
							this.ZN.setColumnWidth(11, Addons.LocalStorage.getserver("Basescanner_ColWidth_11", 50));
							this.ZN.setColumnWidth(12, Addons.LocalStorage.getserver("Basescanner_ColWidth_12", 50));
							this.ZN.setColumnWidth(13, Addons.LocalStorage.getserver("Basescanner_ColWidth_13", 30));
							this.ZN.setColumnWidth(14, Addons.LocalStorage.getserver("Basescanner_ColWidth_14", 60));
							this.ZN.setColumnWidth(15, Addons.LocalStorage.getserver("Basescanner_ColWidth_15", 60));
							this.ZN.setColumnWidth(16, Addons.LocalStorage.getserver("Basescanner_ColWidth_16", 60));
							this.ZN.setColumnWidth(17, Addons.LocalStorage.getserver("Basescanner_ColWidth_17", 50));
							this.ZN.setColumnWidth(18, Addons.LocalStorage.getserver("Basescanner_ColWidth_18", 50));
							this.ZN.setColumnWidth(19, Addons.LocalStorage.getserver("Basescanner_ColWidth_19", 40));
							var c = 0;
							var tcm = this.ZN.getTableColumnModel();
							for (c = 0; c < this.ZL.getColumnCount(); c++) {
								if (c == 0 || c == 1 || c == 11 || c == 12) {
									tcm.setColumnVisible(c, Addons.LocalStorage.getserver("Basescanner_Column_" + c, false));
								} else {
									tcm.setColumnVisible(c, Addons.LocalStorage.getserver("Basescanner_Column_" + c, true));
								}
							}

							tcm.setColumnVisible(1, false);
							tcm.setHeaderCellRenderer(9, new qx.ui.table.headerrenderer.Icon(MT_Base.images[MaelstromTools.Statics.Crystal]), "Crystalfields");
							tcm.setHeaderCellRenderer(10, new qx.ui.table.headerrenderer.Icon(MT_Base.images[MaelstromTools.Statics.Tiberium], "Tiberiumfields"));
							tcm.setDataCellRenderer(5, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(6, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(7, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(8, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(15, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(16, new qx.ui.table.cellrenderer.Replace().set({
									ReplaceFunction : this.FA
								}));
							tcm.setDataCellRenderer(19, new qx.ui.table.cellrenderer.Boolean());

							
							if (PerforceChangelist >= 436669) { // 15.3 patch
								var eventType = "cellDbltap";
							} else { //old
								var eventType = "cellDblclick";
							}
				
							this.ZN.addListener(eventType, function (e) {
								Addons.BaseScannerGUI.getInstance().FB(e);
							}, this);

							
							tcm.addListener("widthChanged", function (e) {
								//console.log(e, e.getData());
								var col = e.getData().col;
								var width = e.getData().newWidth;
								Addons.LocalStorage.setserver("Basescanner_ColWidth_" + col, width);
							}, tcm);

						} catch (e) {
							console.debug("Addons.BaseScannerGUI.FI: ", e);
						}
					},
					FB : function (e) {
						try {
							console.log("e",e.getRow(),this.ZE);
							var cityId = this.ZE[e.getRow()][0];
							var posData = this.ZE[e.getRow()][3];
							/* center screen */
							if (posData != null && posData.split(':').length == 2) {
								var posX = parseInt(posData.split(':')[0]);
								var posY = parseInt(posData.split(':')[1]);
								ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(posX, posY);
							}
							/* and highlight base */
							if (cityId && !(this.ZK[4].getValue())) {
								//ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(cityId);
								//webfrontend.gui.UtilView.openCityInMainWindow(cityId);
								//webfrontend.gui.UtilView.openVisModeInMainWindow(1, cityId, false);
								var bk = qx.core.Init.getApplication();
								bk.getBackgroundArea().closeCityInfo();
								bk.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, cityId, 0, 0);
							}

							var q = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							if (q != null)
								q.get_CityArmyFormationsManager().set_CurrentTargetBaseId(cityId);

						} catch (ex) {
							console.debug("Addons.BaseScannerGUI FB error: ", ex);
						}
					},
					FN : function (e) {
						this.ZG.setLabel(this.T.get("Scan"));
						this.ZH = false;
					},
					CBChanged : function (e) {
						this.ZH = false;
					},
					FA : function (oValue) {
						var f = new qx.util.format.NumberFormat();
						f.setGroupingUsed(true);
						f.setMaximumFractionDigits(3);
						if (!isNaN(oValue)) {
							if (Math.abs(oValue) < 100000)
								oValue = f.format(Math.floor(oValue));
							else if (Math.abs(oValue) >= 100000 && Math.abs(oValue) < 1000000)
								oValue = f.format(Math.floor(oValue / 100) / 10) + "k";
							else if (Math.abs(oValue) >= 1000000 && Math.abs(oValue) < 10000000)
								oValue = f.format(Math.floor(oValue / 1000) / 1000) + "M";
							else if (Math.abs(oValue) >= 10000000 && Math.abs(oValue) < 100000000)
								oValue = f.format(Math.floor(oValue / 10000) / 100) + "M";
							else if (Math.abs(oValue) >= 100000000 && Math.abs(oValue) < 1000000000)
								oValue = f.format(Math.floor(oValue / 100000) / 10) + "M";
							else if (Math.abs(oValue) >= 1000000000 && Math.abs(oValue) < 10000000000)
								oValue = f.format(Math.floor(oValue / 1000000) / 1000) + "G";
							else if (Math.abs(oValue) >= 10000000000 && Math.abs(oValue) < 100000000000)
								oValue = f.format(Math.floor(oValue / 10000000) / 100) + "G";
							else if (Math.abs(oValue) >= 100000000000 && Math.abs(oValue) < 1000000000000)
								oValue = f.format(Math.floor(oValue / 100000000) / 10) + "G";
							else if (Math.abs(oValue) >= 1000000000000 && Math.abs(oValue) < 10000000000000)
								oValue = f.format(Math.floor(oValue / 1000000000) / 1000) + "T";
							else if (Math.abs(oValue) >= 10000000000000 && Math.abs(oValue) < 100000000000000)
								oValue = f.format(Math.floor(oValue / 10000000000) / 100) + "T";
							else if (Math.abs(oValue) >= 100000000000000 && Math.abs(oValue) < 1000000000000000)
								oValue = f.format(Math.floor(oValue / 100000000000) / 10) + "T";
							else if (Math.abs(oValue) >= 1000000000000000)
								oValue = f.format(Math.floor(oValue / 1000000000000)) + "T";
						};
						return oValue.toString();
					},
					// updateCache : function () {
					// try {}
					// catch (e) {
					// console.debug("Addons.BaseScannerGUI.updateCache: ", e);
					// }
					// },
					// setWidgetLabels : function () {
					// try {
					// if (!this.ZL) {
					// this.FC();
					// }
					// this.ZL.setData(this.ZE);
					// } catch (e) {
					// console.debug("Addons.BaseScannerGUI.setWidgetLabels: ", e);
					// }
					// },
					FH : function () {
						try {
							var oBox = new qx.ui.layout.Flow();
							var oOptions = new qx.ui.container.Composite(oBox);
							this.ZC = new qx.ui.form.SelectBox();
							this.ZC.setHeight(25);
							this.ZC.setMargin(5);
							MT_Cache.updateCityCache();
							MT_Cache = window.MaelstromTools.Cache.getInstance();
							var cname;							
							for (cname in MT_Cache.Cities) {
								var item = new qx.ui.form.ListItem(cname, null, MT_Cache.Cities[cname].Object);
								this.ZC.add(item);
								if (Addons.LocalStorage.getserver("Basescanner_LastCityID") == MT_Cache.Cities[cname].Object.get_Id()) {
									this.ZC.setSelection([item]);
								}
							}
							this.ZC.addListener("changeSelection", function (e) {								
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZC);

							var l = new qx.ui.basic.Label().set({
									value : this.T.get("CP Limit"),
									textColor : "white",
									margin : 5
								});
							oOptions.add(l);

							this.ZQ = new qx.ui.form.SelectBox();
							this.ZQ.setWidth(50);
							this.ZQ.setHeight(25);
							this.ZQ.setMargin(5);
							var limiter = Addons.LocalStorage.getserver("Basescanner_Cplimiter", 25);
							for (var m = 11; m < 42; m += 1) {
								item = new qx.ui.form.ListItem("" + m, null, m);
								this.ZQ.add(item);
								if (limiter == m) {
									this.ZQ.setSelection([item]);
								}
							}
							this.ZQ.addListener("changeSelection", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZQ);

							var la = new qx.ui.basic.Label().set({
									value : this.T.get("min Level"),
									textColor : "white",
									margin : 5
								});
							oOptions.add(la);
							var minlevel = Addons.LocalStorage.getserver("Basescanner_minLevel", "1");
							this.ZY = new qx.ui.form.TextField(minlevel).set({
									width : 50
								});
							oOptions.add(this.ZY);

							this.ZK = [];
							this.ZK[0] = new qx.ui.form.CheckBox(this.T.get("Player"));
							this.ZK[0].setMargin(5);
							this.ZK[0].setTextColor("white");
							this.ZK[0].setValue(Addons.LocalStorage.getserver("Basescanner_Show0", false));
							this.ZK[0].addListener("changeValue", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZK[0]);
							this.ZK[1] = new qx.ui.form.CheckBox(this.T.get("Bases"));
							this.ZK[1].setMargin(5);
							this.ZK[1].setTextColor("white");
							this.ZK[1].setValue(Addons.LocalStorage.getserver("Basescanner_Show1", false));
							this.ZK[1].addListener("changeValue", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZK[1]);
							this.ZK[2] = new qx.ui.form.CheckBox(this.T.get("Outpost"));
							this.ZK[2].setMargin(5);
							this.ZK[2].setTextColor("white");
							this.ZK[2].setValue(Addons.LocalStorage.getserver("Basescanner_Show2", false));
							this.ZK[2].addListener("changeValue", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZK[2]);
							this.ZK[3] = new qx.ui.form.CheckBox(this.T.get("Camp"));
							this.ZK[3].setMargin(5);
							this.ZK[3].setTextColor("white");
							this.ZK[3].setValue(Addons.LocalStorage.getserver("Basescanner_Show3", true));
							this.ZK[3].addListener("changeValue", function (e) {
								this.ZE = [];
								this.FP(0, 1, 200);
								this.ZH = false;
								this.ZG.setLabel(this.T.get("Scan"));
							}, this);
							oOptions.add(this.ZK[3], {
								lineBreak : true
							});

							this.ZG = new qx.ui.form.Button(this.T.get("Scan")).set({
									width : 100,
									minWidth : 100,
									maxWidth : 100,
									height : 25,
									margin : 5
								});
							this.ZG.addListener("execute", function () {

								this.FE();
							}, this);
							oOptions.add(this.ZG);

							var border = new qx.ui.decoration.Single(2, "solid", "blue");
							this.ZV = new qx.ui.container.Composite(new qx.ui.layout.Basic()).set({
									decorator : border,
									backgroundColor : "red",
									allowGrowX : false,
									height : 20,
									width : 200
								});
							this.ZU = new qx.ui.core.Widget().set({
									decorator : null,
									backgroundColor : "green",
									width : 0
								});
							this.ZV.add(this.ZU);
							this.ZX = new qx.ui.basic.Label("").set({
									decorator : null,
									textAlign : "center",
									width : 200
								});
							this.ZV.add(this.ZX, {
								left : 0,
								top : -3
							});
							oOptions.add(this.ZV);

							this.YZ = new qx.ui.form.Button(this.T.get("clear Cache")).set({
									minWidth : 100,
									height : 25,
									margin : 5
								});
							this.YZ.addListener("execute", function () {
								this.ZZ = [];
							}, this);
							oOptions.add(this.YZ);

							this.ZK[4] = new qx.ui.form.CheckBox(this.T.get("Only center on World"));
							this.ZK[4].setMargin(5);
							this.ZK[4].setTextColor("white");
							oOptions.add(this.ZK[4], {
								lineBreak : true
							});

							this.ZJ = new qx.ui.form.SelectBox();
							this.ZJ.setWidth(150);
							this.ZJ.setHeight(25);
							this.ZJ.setMargin(5);
							var item = new qx.ui.form.ListItem("7 " + this.T.get(MaelstromTools.Statics.Tiberium) + " 5 " + this.T.get(MaelstromTools.Statics.Crystal), null, 7);
							this.ZJ.add(item);
							item = new qx.ui.form.ListItem("6 " + this.T.get(MaelstromTools.Statics.Tiberium) + " 6 " + this.T.get(MaelstromTools.Statics.Crystal), null, 6);
							this.ZJ.add(item);
							item = new qx.ui.form.ListItem("5 " + this.T.get(MaelstromTools.Statics.Tiberium) + " 7 " + this.T.get(MaelstromTools.Statics.Crystal), null, 5);
							this.ZJ.add(item);
							oOptions.add(this.ZJ);
							this.ZD = new qx.ui.form.Button(this.T.get("Get Layouts")).set({
									width : 120,
									minWidth : 120,
									maxWidth : 120,
									height : 25,
									margin : 5
								});
							this.ZD.addListener("execute", function () {
								var layout = window.Addons.BaseScannerLayout.getInstance();
								layout.openWindow(this.T.get("BaseScanner Layout"));
							}, this);
							this.ZD.setEnabled(false);
							oOptions.add(this.ZD);

							this.ZB = new qx.ui.container.Composite();
							this.ZB.setLayout(new qx.ui.layout.Flow());
							this.ZB.setWidth(750);
							//oOptions.add(this.ZB, {flex:1});

							var J = webfrontend.gui.layout.Loader.getInstance();
							//var L = J.getLayout("playerbar", this);
							//this._ZZ = J.getElement(L, "objid", 'lblplayer');


							//this.tableSettings = new qx.ui.groupbox.GroupBox("Visable Columns");
							//box.add(this.tableSettings, {flex:1});
							var k = 2;
							for (k = 2; k < this.ZL.getColumnCount(); k++) {
								var index = k - 2;

								this.ZR[index] = new qx.ui.form.CheckBox(this.ZL.getColumnName(k));
								this.ZR[index].setValue(this.ZN.getTableColumnModel().isColumnVisible(k));
								this.ZR[index].setTextColor("white");
								this.ZR[index].index = k;
								this.ZR[index].table = this.ZN;
								this.ZR[index].addListener("changeValue", function (e) {
									//console.log("click", e, e.getData(), this.index);
									var tcm = this.table.getTableColumnModel();
									tcm.setColumnVisible(this.index, e.getData());
									Addons.LocalStorage.setserver("Basescanner_Column_" + this.index, e.getData());
								});
								this.ZB.add(this.ZR[index]);
								//this.tableSettings.add( this.ZR[index] );
							}

							this.ZO = new qx.ui.form.Button("+").set({
									margin : 5
								});
							this.ZO.addListener("execute", function () {
								if (this.ZI) {
									oOptions.addAfter(this.ZB, this.ZO);
									this.ZO.setLabel("-");
								} else {
									oOptions.remove(this.ZB);
									this.ZO.setLabel("+");
								}
								this.ZI = !this.ZI;
							}, this);
							this.ZO.setAlignX("right");
							oOptions.add(this.ZO, {
								lineBreak : true
							});

							this.ZF = oOptions;

						} catch (e) {
							console.debug("Addons.BaseScannerGUI.createOptions: ", e);
						}
					},
					FD : function () {
						//0.7
						//var n = ClientLib.Data.MainData.GetInstance().get_Cities();
						//var i = n.get_CurrentOwnCity();
						var st = '<a href="https://sites.google.com/site/blindmanxdonate" target="_blank">Support Development of BlinDManX Addons</a>';
						var l = new qx.ui.basic.Label().set({
								value : st,
								rich : true,
								width : 800
							});
						this.ZP = l;
					},
					FE : function () {
						var selectedBase = this.ZC.getSelection()[0].getModel();
						ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(selectedBase.get_PosX(), selectedBase.get_PosY()); //Load data of region
						ClientLib.Vis.VisMain.GetInstance().Update();
						ClientLib.Vis.VisMain.GetInstance().ViewUpdate();
						ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(selectedBase.get_Id());

						if (this.ZT) {
							var obj = ClientLib.Data.WorldSector.WorldObjectCity.prototype;
							// var fa = foundfnkstring(obj['$ctor'], /=0;this\.(.{6})=g>>7&255;.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectCity", 2);
							var fa = foundfnkstring(obj['$ctor'], /this\.(.{6})=\(?\(?g>>8\)?\&.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectCity", 2);
							if (fa != null && fa[1].length == 6) {
								obj.getLevel = function () {
									return this[fa[1]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectCity.Level undefined");
							}
							if (fa != null && fa[2].length == 6) {
								obj.getID = function () {
									return this[fa[2]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectCity.ID undefined");
							}

							obj = ClientLib.Data.WorldSector.WorldObjectNPCBase.prototype;
							//var fb = foundfnkstring(obj['$ctor'], /100;this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCBase", 2);
							var fb = foundfnkstring(obj['$ctor'], /100\){0,1};this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCBase", 2);
							if (fb != null && fb[1].length == 6) {
								obj.getLevel = function () {
									return this[fb[1]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.Level undefined");
							}
							if (fb != null && fb[2].length == 6) {
								obj.getID = function () {
									return this[fb[2]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.ID undefined");
							}

							obj = ClientLib.Data.WorldSector.WorldObjectNPCCamp.prototype;
							//var fc = foundfnkstring(obj['$ctor'], /100;this\.(.{6})=Math.floor.*=-1;\}this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCCamp", 2);
							var fc = foundfnkstring(obj['$ctor'], /100\){0,1};this\.(.{6})=Math.floor.*this\.(.{6})=\(*g\>\>(22|0x16)\)*\&.*=-1;\}this\.(.{6})=\(/, "ClientLib.Data.WorldSector.WorldObjectNPCCamp", 4);
							if (fc != null && fc[1].length == 6) {
								obj.getLevel = function () {
									return this[fc[1]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.Level undefined");
							}
							if (fc != null && fc[2].length == 6) {
								obj.getCampType = function () {
									return this[fc[2]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.CampType undefined");
							}

							if (fc != null && fc[4].length == 6) {
								obj.getID = function () {
									return this[fc[4]];
								};
							} else {
								console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.ID undefined");
							}
							this.ZT = false;
						}

						//Firstscan
						if (this.ZE == null) {
							this.ZH = false;
							this.ZG.setLabel("Pause");
							this.ZD.setEnabled(false);
							window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FJ()", 1000);
							return;
						}
						//After Pause
						var c = 0;
						for (i = 0; i < this.ZE.length; i++) {
							if (this.ZE[i][1] == -1) {
								c++;
							}
						}

						if (!this.ZH) {
							this.ZG.setLabel("Pause");
							this.ZD.setEnabled(false);
							if (c > 0) {
								this.ZH = true;
								window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FG()", 1000);
								return;
							} else {
								this.ZH = false;
								window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FJ()", 1000);
							}
						} else {
							this.ZH = false;
							this.ZG.setLabel(this.T.get("Scan"));
						}

					},
					FP : function (value, max, maxwidth) {
						if (this.ZU != null && this.ZX != null) {
							this.ZU.setWidth(parseInt(value / max * maxwidth, 10));
							this.ZX.setValue(value + "/" + max);
						}
					},
					FJ : function () {
						try {
							this.ZM = {};
							this.ZE = [];
							var selectedBase = this.ZC.getSelection()[0].getModel();
							Addons.LocalStorage.setserver("Basescanner_LastCityID", selectedBase.get_Id());
							var ZQ = this.ZQ.getSelection()[0].getModel();
							Addons.LocalStorage.setserver("Basescanner_Cplimiter", ZQ);
							Addons.LocalStorage.setserver("Basescanner_minLevel", this.ZY.getValue());

							var c1 = this.ZK[0].getValue();
							var c2 = this.ZK[1].getValue();
							var c3 = this.ZK[2].getValue();
							var c4 = this.ZK[3].getValue();
							var c5 = parseInt(this.ZY.getValue(), 10);
							//console.log("Select", c1, c2, c3,c4,c5);
							Addons.LocalStorage.setserver("Basescanner_Show0", c1);
							Addons.LocalStorage.setserver("Basescanner_Show1", c2);
							Addons.LocalStorage.setserver("Basescanner_Show2", c3);
							Addons.LocalStorage.setserver("Basescanner_Show3", c4);
							var posX = selectedBase.get_PosX();
							var posY = selectedBase.get_PosY();
							var scanX = 0;
							var scanY = 0;
							var world = ClientLib.Data.MainData.GetInstance().get_World();
							console.info("Scanning from: " + selectedBase.get_Name());

							// world.CheckAttackBase (System.Int32 targetX ,System.Int32 targetY) -> ClientLib.Data.EAttackBaseResult
							// world.CheckAttackBaseRegion (System.Int32 targetX ,System.Int32 targetY) -> ClientLib.Data.EAttackBaseResult
							var t1 = true;
							var t2 = true;
							var t3 = true;

							var maxAttackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();
							for (scanY = posY - Math.floor(maxAttackDistance + 1); scanY <= posY + Math.floor(maxAttackDistance + 1); scanY++) {
								for (scanX = posX - Math.floor(maxAttackDistance + 1); scanX <= posX + Math.floor(maxAttackDistance + 1); scanX++) {
									var distX = Math.abs(posX - scanX);
									var distY = Math.abs(posY - scanY);
									var distance = Math.sqrt((distX * distX) + (distY * distY));
									if (distance <= maxAttackDistance) {
										var object = world.GetObjectFromPosition(scanX, scanY);
										var loot = {};
										if (object) {
											//console.log(object);

											if (object.Type == 1 && t1) {
												//console.log("object typ 1");
												//objfnkstrON(object);
												//t1 = !t1;
											}
											if (object.Type == 2 && t2) {
												//console.log("object typ 2");
												//objfnkstrON(object);
												//t2 = !t2;
											}

											if (object.Type == 3 && t3) {

												//console.log("object typ 3");
												//objfnkstrON(object);
												//t3 = !t3;
											}

											if (object.Type == 3) {
												if (c5 <= parseInt(object.getLevel(), 10)) {
													//console.log(object);
												}
											}

											//if(object.ConditionBuildings>0){
											var needcp = selectedBase.CalculateAttackCommandPointCostToCoord(scanX, scanY);
											if (needcp <= ZQ && typeof object.getLevel == 'function') {
												if (c5 <= parseInt(object.getLevel(), 10)) {
													// 0:ID , 1:Scanned, 2:Name, 3:Location, 4:Level, 5:Tib, 6:Kristal, 7:Credits, 8:Forschung, 9:Kristalfelder, 10:Tiberiumfelder,
													// 11:ConditionBuildings,12:ConditionDefense,13: CP pro Angriff , 14: defhp/offhp , 15:sum tib,krist,credits, 16: sum/cp
													var d = this.FL(object.getID(), 0);
													var e = this.FL(object.getID(), 1);
													if (e != null) {
														this.ZM[object.getID()] = e;
													}

													if (object.Type == 1 && c1) { //User
														//console.log("object ID LEVEL", object.getID() ,object.getLevel() );
														if (d != null) {
															this.ZE.push(d);
														} else {
															this.ZE.push([object.getID(),  - 1, this.T.get("Player"), scanX + ":" + scanY, object.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, needcp, 0, 0, 0, 0]);
														}
													}
													if (object.Type == 2 && c2) { //basen
														//console.log("object ID LEVEL", object.getID() ,object.getLevel() );
														if (d != null) {
															this.ZE.push(d);
														} else {
															this.ZE.push([object.getID(),  - 1, this.T.get("Bases"), scanX + ":" + scanY, object.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, needcp, 0, 0, 0, 0]);
														}
													}
													if (object.Type == 3 && (c3 || c4)) { //Lager Vposten
														//console.log("object ID LEVEL", object.getID() ,object.getLevel() );
														if (d != null) {
															if (object.getCampType() == 2 && c4) {
																this.ZE.push(d);
															}
															if (object.getCampType() == 3 && c3) {
																this.ZE.push(d);
															}

														} else {
															if (object.getCampType() == 2 && c4) {
																this.ZE.push([object.getID(),  - 1, this.T.get("Camp"), scanX + ":" + scanY, object.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, needcp, 0, 0, 0, 0]);
															}
															if (object.getCampType() == 3 && c3) {
																this.ZE.push([object.getID(),  - 1, this.T.get("Outpost"), scanX + ":" + scanY, object.getLevel(), 0, 0, 0, 0, 0, 0, 0, 0, needcp, 0, 0, 0, 0]);
															}
														}
													}
												}
											}
											//}
										}
									}
								}
							}
							this.ZH = true;
							this.ZL.setData(this.ZE);
							this.FP(0, this.ZE.length, 200);
							this.ZL.sortByColumn(4, false); //Sort form Highlevel to Lowlevel
							if (this.YY.name != "DR01D")
								window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FG()", 50);
						} catch (ex) {
							console.debug("Maelstrom_Basescanner FJ error: ", ex);
						}
					},
					FG : function () {
						try {
							var retry = false;
							var loops = 0;
							var maxLoops = 10;
							var i = 0;
							var sleeptime = 150;
							while (!retry) {
								var ncity = null;
								var selectedid = 0;
								var id = 0;
								if (this.ZE == null) {
									console.warn("data null: ");
									this.ZH = false;
									break;
								}
								for (i = 0; i < this.ZE.length; i++) {
									// 1= "LoadState"
									if (this.ZE[i][1] == -1) {
										break;
									}
								}

								if (i == this.ZE.length) {
									this.ZH = false;
								}
								this.FP(i, this.ZE.length, 200); //Progressbar
								if (this.ZE[i] == null) {
									console.warn("data[i] null: ");
									this.ZH = false;
									this.ZG.setLabel(this.T.get("Scan"));
									this.ZD.setEnabled(true);
									break;
								}
								posData = this.ZE[i][3];
								/* make sure coordinates are well-formed enough */
								if (posData != null && posData.split(':').length == 2) {
									posX = parseInt(posData.split(':')[0]);
									posY = parseInt(posData.split(':')[1]);
									/* check if there is any base */
									var playerbase = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
									var world = ClientLib.Data.MainData.GetInstance().get_World();
									var foundbase = world.CheckFoundBase(posX, posY, playerbase.get_PlayerId(), playerbase.get_AllianceId());
									//console.log("foundbase",foundbase);
									this.ZE[i][19] = (foundbase == 0) ? true : false;
									//var obj = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
									//console.log("obj", obj);
									id = this.ZE[i][0];
									ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(id);
									ncity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(id);
									//console.log("ncity", ncity);
									if (ncity != null) {
										if (!ncity.get_IsGhostMode()) {
											//if(ncity.get_Name() != null)
											//console.log("ncity.get_Name ", ncity.get_Name() , ncity.get_CityBuildingsData().get_Buildings());
											//var cityBuildings = ncity.get_CityBuildingsData();
											var cityUnits = ncity.get_CityUnitsData();
											if (cityUnits != null) { // cityUnits !=null können null sein
												//console.log("ncity.cityUnits", cityUnits );

												var selectedBase = this.ZC.getSelection()[0].getModel();
												var buildings = ncity.get_Buildings().d;
												var defenseUnits = cityUnits.get_DefenseUnits().d;
												var offensivUnits = selectedBase.get_CityUnitsData().get_OffenseUnits().d;
												//console.log(buildings,defenseUnits,offensivUnits);

												if (buildings != null) //defenseUnits !=null können null sein
												{
													var buildingLoot = getResourcesPart(buildings);
													var unitLoot = getResourcesPart(defenseUnits);

													//console.log("buildingLoot", buildingLoot);
													//console.log("unitLoot", unitLoot);
													this.ZE[i][2] = ncity.get_Name();
													this.ZE[i][5] = buildingLoot[ClientLib.Base.EResourceType.Tiberium] + unitLoot[ClientLib.Base.EResourceType.Tiberium];
													this.ZE[i][6] = buildingLoot[ClientLib.Base.EResourceType.Crystal] + unitLoot[ClientLib.Base.EResourceType.Crystal];
													this.ZE[i][7] = buildingLoot[ClientLib.Base.EResourceType.Gold] + unitLoot[ClientLib.Base.EResourceType.Gold];
													this.ZE[i][8] = buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + unitLoot[ClientLib.Base.EResourceType.ResearchPoints];
													//console.log(posX,posY,"GetBuildingsConditionInPercent", ncity.GetBuildingsConditionInPercent() );
													if (ncity.GetBuildingsConditionInPercent() != 0) {
														this.ZA = 0;
														if (this.ZE[i][5] != 0) {
															var c = 0;
															var t = 0;
															var m = 0;
															var k = 0;
															var l = 0;
															this.ZM[id] = new Array(9);
															for (m = 0; m < 9; m++) {
																this.ZM[id][m] = new Array(8);
															}
															for (k = 0; k < 9; k++) {
																for (l = 0; l < 8; l++) {
																	//console.log( ncity.GetResourceType(k,l) );
																	switch (ncity.GetResourceType(k, l)) {
																	case 1:
																		/* Crystal */
																		this.ZM[id][k][l] = 1;
																		c++;
																		break;
																	case 2:
																		/* Tiberium */
																		this.ZM[id][k][l] = 2;
																		t++;
																		break;
																	default:
																		//none
																		break;
																	}
																}
															}
															//console.log( c,t );


															this.ZE[i][9] = c;
															this.ZE[i][10] = t;
															this.ZE[i][11] = ncity.GetBuildingsConditionInPercent();
															this.ZE[i][12] = ncity.GetDefenseConditionInPercent();

															try {
																var u = offensivUnits;
																//console.log("OffenseUnits",u);
																var offhp = 0;
																var defhp = 0;
																for (var g in u) {
																	offhp += u[g].get_Health();
																}

																u = defenseUnits;
																//console.log("DefUnits",u);
																for (var g in u) {
																	defhp += u[g].get_Health();
																}

																u = buildings;
																//console.log("DefUnits",u);
																for (var g in u) {
																	//var id=0;
																	//console.log("MdbUnitId",u[g].get_MdbUnitId());
																	var mid = u[g].get_MdbUnitId();
																	//DF
																	if (mid == 158 || mid == 131 || mid == 195) {
																		this.ZE[i][18] = 8 - u[g].get_CoordY();
																	}
																	//CY
																	if (mid == 112 || mid == 151 || mid == 177) {
																		this.ZE[i][17] = 8 - u[g].get_CoordY();
																	}
																}

																//console.log("HPs",offhp,defhp, (defhp/offhp) );
															} catch (x) {
																console.debug("HPRecord", x);
															}
															this.ZE[i][14] = (defhp / offhp);

															this.ZE[i][15] = this.ZE[i][5] + this.ZE[i][6] + this.ZE[i][7];
															this.ZE[i][16] = this.ZE[i][15] / this.ZE[i][13];

															this.ZE[i][1] = 0;
															retry = true;
															console.info(ncity.get_Name(), " finish");
															this.ZA = 0;
															this.countlastidchecked = 0;
															//console.log(this.ZE[i],this.ZM[id],id);
															this.FK(this.ZE[i], this.ZM[id], id);
															//update table
															this.ZL.setData(this.ZE);
														}
													} else {
														if (this.ZA > 250) {
															console.info(this.ZE[i][2], " on ", posX, posY, " removed (GetBuildingsConditionInPercent == 0)");
															this.ZE.splice(i, 1); //entfernt element aus array
															this.ZA = 0;
															this.countlastidchecked = 0;
															break;
														}
														this.ZA++;
													}
												}
											}
										} else {
											console.info(this.ZE[i][2], " on ", posX, posY, " removed (IsGhostMode)");
											this.ZE.splice(i, 1); //entfernt element aus array
											break;
										}
									}
								}
								loops++;
								if (loops >= maxLoops) {
									retry = true;
									break;
								}
							}

							//console.log("getResourcesByID end ", this.ZH, Addons.BaseScannerGUI.getInstance().isVisible());
							if (this.lastid != i) {
								this.lastid = i;
								this.countlastidchecked = 0;
								this.ZA = 0;
							} else {
								if (this.countlastidchecked > 16) {
									console.info(this.ZE[i][2], " on ", posX, posY, " removed (found no data)");
									this.ZE.splice(i, 1); //entfernt element aus array
									this.countlastidchecked = 0;
								} else if (this.countlastidchecked > 10) {
									sleeptime = 500;
								} else if (this.countlastidchecked > 4) {
									sleeptime = 250;
								}
								this.countlastidchecked++;
							}
							//console.log("this.ZH", this.ZH);
							if (this.ZH && Addons.BaseScannerGUI.getInstance().isVisible()) {
								//console.log("loop");
								window.setTimeout("window.Addons.BaseScannerGUI.getInstance().FG()", sleeptime);
							} else {
								this.ZG.setLabel(this.T.get("Scan"));
								this.ZH = false;
							}
						} catch (e) {
							console.debug("MaelstromTools_Basescanner getResources", e);
						}
					},
					FK : function (dataa, datab, id) {
						this.ZZ.push(dataa);
						this.ZS[id] = datab;
					},
					FL : function (id, t) {
						if (t == 0) {
							for (var i = 0; i < this.ZZ.length; i++) {
								if (this.ZZ[i][0] == id) {
									return this.ZZ[i];
								}
							}
						} else {
							if (this.ZS[id]) {
								return this.ZS[id];
							}
						}
						return null;
					}

				}
			});

			qx.Class.define("Addons.BaseScannerLayout", {
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function () {
					try {
						this.base(arguments);
						console.info("Addons.BaseScannerLayout " + window.__msbs_version);
						this.setWidth(820);
						this.setHeight(400);
						this.setContentPadding(10);
						this.setShowMinimize(false);
						this.setShowMaximize(true);
						this.setShowClose(true);
						this.setResizable(true);
						this.setAllowMaximize(true);
						this.setAllowMinimize(false);
						this.setAllowClose(true);
						this.setShowStatusbar(false);
						this.setDecorator(null);
						this.setPadding(10);
						this.setLayout(new qx.ui.layout.Grow());

						this.ZW = [];
						this.removeAll();
						this.ZZ = new qx.ui.container.Scroll();
						this.ZY = new qx.ui.container.Composite(new qx.ui.layout.Flow());
						this.add(this.ZZ, {
							flex : 3
						});
						this.ZZ.add(this.ZY);
						//this.FO();
					} catch (e) {
						console.debug("Addons.BaseScannerLayout.construct: ", e);
					}
				},
				members : {
					ZW : null,
					ZZ : null,
					ZY : null,
					ZX : null,
					openWindow : function (title) {
						try {
							this.setCaption(title);
							if (this.isVisible()) {
								this.close();
							} else {
								this.open();
								this.moveTo(100, 100);
								this.FO();
							}
						} catch (e) {
							console.log("Addons.BaseScannerLayout.openWindow: ", e);
						}
					},
					FO : function () {
						var ZM = window.Addons.BaseScannerGUI.getInstance().ZM;
						var ZE = window.Addons.BaseScannerGUI.getInstance().ZE;
						this.ZX = [];
						var selectedtype = window.Addons.BaseScannerGUI.getInstance().ZJ.getSelection()[0].getModel();
						//console.log("FO: " , ZM.length);
						var rowDataLine = null;
						if (ZE == null) {
							console.info("ZE null: ");
							return;
						}
						//console.log("FO: " , ZM);
						this.ZW = [];
						var id;
						var i;
						var x;
						var y;
						var a;
						for (id in ZM) {
							for (i = 0; i < ZE.length; i++) {
								if (ZE[i][0] == id) {
									rowDataLine = ZE[i];
								}
							}

							if (rowDataLine == null) {
								continue;
							}
							//console.log("ST",selectedtype,rowDataLine[10]);
							if (selectedtype > 4 && selectedtype < 8) {
								if (selectedtype != rowDataLine[10]) {
									continue;
								}
							} else {
								continue;
							}

							posData = rowDataLine[3];
							if (posData != null && posData.split(':').length == 2) {
								posX = parseInt(posData.split(':')[0]);
								posY = parseInt(posData.split(':')[1]);
							}
							var st = '<table border="2" cellspacing="0" cellpadding="0">';
							var link = rowDataLine[2] + " - " + rowDataLine[3];
							st = st + '<tr><td colspan="9"><font color="#FFF">' + link + '</font></td></tr>';
							for (y = 0; y < 8; y++) {
								st = st + "<tr>";
								for (x = 0; x < 9; x++) {
									var img = "";
									var res = ZM[id][x][y];
									//console.log("Res ",res);
									switch (res == undefined ? 0 : res) {
									case 2:
										//console.log("Tiberium " , MT_Base.images[MaelstromTools.Statics.Tiberium] );
										img = '<img width="14" height="14" src="' + MT_Base.images[MaelstromTools.Statics.Tiberium] + '">';
										break;
									case 1:
										//console.log("Crystal ");
										img = '<img width="14" height="14" src="' + MT_Base.images[MaelstromTools.Statics.Crystal] + '">';
										break;
									default:
										img = '<img width="14" height="14" src="' + MT_Base.images["Emptypixels"] + '">';
										break;
									}
									st = st + "<td>" + img + "</td>";
								}
								st = st + "</tr>";
							}
							st = st + "</table>";
							//console.log("setWidgetLabels ", st);
							var l = new qx.ui.basic.Label().set({
									backgroundColor : "#303030",
									value : st,
									rich : true
								});
							l.cid = id;
							this.ZX.push(id);
							l.addListener("click", function (e) {

								//console.log("clickid ", this.cid, );
								//webfrontend.gui.UtilView.openCityInMainWindow(this.cid);
								var bk = qx.core.Init.getApplication();
								bk.getBackgroundArea().closeCityInfo();
								bk.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, this.cid, 0, 0);
								var q = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
								if (q != null)
									q.get_CityArmyFormationsManager().set_CurrentTargetBaseId(this.cid);

							});
							l.setReturnValue = id;
							this.ZW.push(l);
						}
						this.ZY.removeAll();
						var b = 0;
						var c = 0;
						//console.log("this.ZW.length",this.ZW.length);
						for (a = 0; a < this.ZW.length; a++) {
							this.ZY.add(this.ZW[a], {
								row : b,
								column : c
							});
							c++;
							if (c > 4) {
								c = 0;
								b++;
							}
						}
					}
				}
			});

			qx.Class.define("Addons.LocalStorage", {
				type : "static",
				extend : qx.core.Object,
				statics : {
					isSupported : function () {
						return typeof(localStorage) !== "undefined";
					},
					isdefined : function (key) {
						return (localStorage[key] !== "undefined" && localStorage[key] != null);
					},
					isdefineddata : function (data, key) {
						return (data[key] !== "undefined" && data[key] != null);
					},
					setglobal : function (key, value) {
						try {
							if (Addons.LocalStorage.isSupported()) {
								localStorage[key] = JSON.stringify(value);
							}
						} catch (e) {
							console.debug("Addons.LocalStorage.setglobal: ", e);
						}
					},
					getglobal : function (key, defaultValue) {
						try {
							if (Addons.LocalStorage.isSupported()) {
								if (Addons.LocalStorage.isdefined(key)) {
									return JSON.parse(localStorage[key]);
								}
							}
						} catch (e) {
							console.log("Addons.LocalStorage.getglobal: ", e);
						}
						return defaultValue;
					},
					setserver : function (key, value) {
						try {
							if (Addons.LocalStorage.isSupported()) {
								var sn = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
								var data;
								if (Addons.LocalStorage.isdefined(sn)) {
									try {
										data = JSON.parse(localStorage[sn]);
										if (!(typeof data === "object")) {
											data = {};
											console.debug("LocalStorage data from server not null, but not object");
										}
									} catch (e) {
										console.debug("LocalStorage data from server not null, but parsererror", e);
										data = {};
									}
								} else {
									data = {};
								}
								data[key] = value;
								localStorage[sn] = JSON.stringify(data);
							}
						} catch (e) {
							console.debug("Addons.LocalStorage.setserver: ", e);
						}
					},
					getserver : function (key, defaultValue) {
						try {
							if (Addons.LocalStorage.isSupported()) {
								var sn = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
								if (Addons.LocalStorage.isdefined(sn)) {
									var data = JSON.parse(localStorage[sn]);
									if (Addons.LocalStorage.isdefineddata(data, key)) {
										return data[key];
									}
								}
							}
						} catch (e) {
							console.log("Addons.LocalStorage.getserver: ", e);
						}
						return defaultValue;
					}
				}
			});
			
			if(typeof Addons.Language === 'undefined'){
				qx.Class.define("Addons.Language", {
					type : "singleton",
					extend : qx.core.Object,
					members : {
						d : {},
						debug : false,
						addtranslateobj : function (o) {
							if ( o.hasOwnProperty("main") ){
								this.d[o.main.toString()] = o;								
								if(this.debug){
									console.log("Translate Added ", o.main.toString() );
								}
								delete o.main;								
							} else {
								console.debug("Addons.Language.addtranslateobj main not define");
							}
						},
						get : function (t) {
							var locale = qx.locale.Manager.getInstance().getLocale();
							var loc = locale.split("_")[0];
							if ( this.d.hasOwnProperty(t) ){
								if ( this.d[t].hasOwnProperty(loc) ){
									return this.d[t][loc];
								}
							}
							if(this.debug){
								console.debug("Addons.Language.get ", t, " not translate for locale ", loc);
							}
							return t;
						}
					}
				});
			}
			
			qx.Class.define("qx.ui.table.cellrenderer.Replace", {
				extend : qx.ui.table.cellrenderer.Default,

				properties : {

					replaceMap : {
						check : "Object",
						nullable : true,
						init : null
					},
					replaceFunction : {
						check : "Function",
						nullable : true,
						init : null
					}
				},
				members : {
					// overridden
					_getContentHtml : function (cellInfo) {
						var value = cellInfo.value;
						var replaceMap = this.getReplaceMap();
						var replaceFunc = this.getReplaceFunction();
						var label;

						// use map
						if (replaceMap) {
							label = replaceMap[value];
							if (typeof label != "undefined") {
								cellInfo.value = label;
								return qx.bom.String.escape(this._formatValue(cellInfo));
							}
						}

						// use function
						if (replaceFunc) {
							cellInfo.value = replaceFunc(value);
						}
						return qx.bom.String.escape(this._formatValue(cellInfo));
					},

					addReversedReplaceMap : function () {
						var map = this.getReplaceMap();
						for (var key in map) {
							var value = map[key];
							map[value] = key;
						}
						return true;
					}
				}
			});
			
			
			console.info("Maelstrom_Basescanner initalisiert");
			
			var T = Addons.Language.getInstance();
			T.debug = false;
			T.addtranslateobj( {main:"Point", de: "Position", pt: "Position", fr: "Position"} );
			T.addtranslateobj( {main:"BaseScanner Overview", de: "Basescanner Übersicht", pt: "Visão geral do scanner de base", fr: "Aperçu du scanner de base"} );
			T.addtranslateobj( {main:"Scan", de: "Scannen", pt: "Esquadrinhar", fr: "Balayer"} );
			T.addtranslateobj( {main:"Location", de: "Lage", pt: "localização", fr: "Emplacement"} );
			T.addtranslateobj( {main:"Player", de: "Spieler", pt: "Jogador", fr: "Joueur"} );
			T.addtranslateobj( {main:"Bases", de: "Bases", pt: "Bases", fr: "Bases"} );
			T.addtranslateobj( {main:"Camp,Outpost", de: "Lager,Vorposten", pt: "Camp,posto avançado", fr: "Camp,avant-poste"} );
			T.addtranslateobj( {main:"Camp", de: "Lager", pt: "Camp", fr: "Camp"} );						
			T.addtranslateobj( {main:"Outpost", de: "Vorposten", pt: "posto avançado", fr: "avant-poste"} );
			T.addtranslateobj( {main:"BaseScanner Layout", de: "BaseScanner Layout", pt: "Layout da Base de Dados de Scanner", fr: "Mise scanner de base"} );
			T.addtranslateobj( {main:"Show Layouts", de: "Layouts anzeigen", pt: "Mostrar Layouts", fr: "Voir Layouts"} );						
			T.addtranslateobj( {main:"Building state", de: "Gebäudezustand", pt: "construção do Estado", fr: "construction de l'État"} );
			T.addtranslateobj( {main:"Defense state", de: "Verteidigungszustand", pt: "de Defesa do Estado", fr: "défense de l'Etat"} );
			T.addtranslateobj( {main:"CP", de: "KP", pt: "CP", fr: "CP"} );
			T.addtranslateobj( {main:"CP Limit", de: "KP begrenzen", pt: "CP limitar", fr: "CP limiter"} );						
			T.addtranslateobj( {main:"min Level", de: "min. Level", pt: "nível mínimo", fr: "niveau minimum"} );
			T.addtranslateobj( {main:"clear Cache", de: "Cache leeren", pt: "limpar cache", fr: "vider le cache"} );
			T.addtranslateobj( {main:"Only center on World", de: "Nur auf Welt zentrieren", pt: "Único centro no Mundial", fr: "Seul centre sur World"} );
			T.addtranslateobj( {main:"base set up at", de: "Basis errichtbar", pt: "base de configurar a", fr: "mis en place à la base"} );	
			T.addtranslateobj( {main:"Infantry", de: "Infanterie", pt: "Infantaria", fr: "Infanterie"} );
			T.addtranslateobj( {main:"Vehicle", de: "Fahrzeuge", pt: "Veículos", fr: "Vehicule"} );
			T.addtranslateobj( {main:"Aircraft", de: "Flugzeuge", pt: "Aeronaves", fr: "Aviation"} );
			T.addtranslateobj( {main:"Tiberium", de: "Tiberium", pt: "Tibério", fr: "Tiberium"} );
			T.addtranslateobj( {main:"Crystal", de: "Kristalle", pt: "Cristal", fr: "Cristal"} );
			T.addtranslateobj( {main:"Power", de: "Strom", pt: "Potência", fr: "Energie"} );
			T.addtranslateobj( {main:"Dollar", de: "Credits", pt: "Créditos", fr: "Crédit"} );
			T.addtranslateobj( {main:"Research", de: "Forschung", pt: "Investigação", fr: "Recherche"} );
			T.addtranslateobj( {main:"-----", de: "--", pt: "--", fr: "--"} );
			

			
			
			var MT_Lang = null;
			var MT_Cache = null;
			var MT_Base = null;
			var fileManager = null;
			var lastid = 0;
			var countlastidchecked = 0;
			fileManager = ClientLib.File.FileManager.GetInstance();
			MT_Lang = window.MaelstromTools.Language.getInstance();
			MT_Cache = window.MaelstromTools.Cache.getInstance();
			MT_Base = window.MaelstromTools.Base.getInstance();

			MT_Base.createNewImage("BaseScanner", "ui/icons/icon_item.png", fileManager);
			MT_Base.createNewImage("Emptypixels", "ui/menues/main_menu/misc_empty_pixel.png", fileManager);
			var openBaseScannerOverview = MT_Base.createDesktopButton(T.get("BaseScanner Overview") + "version " + window.__msbs_version, "BaseScanner", false, MT_Base.desktopPosition(2));
			openBaseScannerOverview.addListener("execute", function () {
				Addons.BaseScannerGUI.getInstance().openWindow(T.get("BaseScanner Overview") + " version " + window.__msbs_version);
			}, this);
			Addons.BaseScannerGUI.getInstance().addListener("close", Addons.BaseScannerGUI.getInstance().FN, Addons.BaseScannerGUI.getInstance());
			//this.addListener("resize", function(){ }, this );
			
			MT_Base.addToMainMenu("BaseScanner", openBaseScannerOverview);
			
			if(typeof Addons.AddonMainMenu !== 'undefined'){
				var addonmenu = Addons.AddonMainMenu.getInstance();
				addonmenu.AddMainMenu("Basescanner", function () {
					Addons.BaseScannerGUI.getInstance().openWindow(T.get("BaseScanner Overview") + " version " + window.__msbs_version);
				},"ALT+B");
			}
			
		}

		function getResourcesPart(cityEntities) {
			try {
				var loot = [0, 0, 0, 0, 0, 0, 0, 0];
				if (cityEntities == null) {
					return loot;
				}

				for (var i in cityEntities) {
					var cityEntity = cityEntities[i];
					var unitLevelRequirements = MaelstromTools.Wrapper.GetUnitLevelRequirements(cityEntity);

					for (var x = 0; x < unitLevelRequirements.length; x++) {
						loot[unitLevelRequirements[x].Type] += unitLevelRequirements[x].Count * cityEntity.get_HitpointsPercent();
						if (cityEntity.get_HitpointsPercent() < 1.0) {
							// destroyed

						}
					}
				}
				return loot;
			} catch (e) {
				console.debug("MaelstromTools_Basescanner getResourcesPart", e);
			}
		}

		function objfnkstrON(obj) {
			var key;
			for (key in obj) {
				if (typeof(obj[key]) == "function") {
					var s = obj[key].toString();
					console.debug(key, s);
					//var protostring = s.replace(/\s/gim, "");
					//console.log(key, protostring);
				}
			}
		}

		function foundfnkstring(obj, redex, objname, n) {
			var redexfounds = [];
			var s = obj.toString();
			var protostring = s.replace(/\s/gim, "");
			redexfounds = protostring.match(redex);
			var i;
			for (i = 1; i < (n + 1); i++) {
				if (redexfounds != null && redexfounds[i].length == 6) {
					console.debug(objname, i, redexfounds[i]);
				} else if (redexfounds != null && redexfounds[i].length > 0) {
					console.warn(objname, i, redexfounds[i]);
				} else {
					console.error("Error - ", objname, i, "not found");
					console.warn(objname, protostring);
				}
			}
			return redexfounds;
		}

		function MaelstromTools_Basescanner_checkIfLoaded() {
			try {
				if (typeof qx != 'undefined' && typeof MaelstromTools != 'undefined') {
					createMaelstromTools_Basescanner();
				} else {
					window.setTimeout(MaelstromTools_Basescanner_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.debug("MaelstromTools_Basescanner_checkIfLoaded: ", e);
			}
		}
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(MaelstromTools_Basescanner_checkIfLoaded, 10000);
		}
	};
	try {
		var MaelstromScript_Basescanner = document.createElement("script");
		MaelstromScript_Basescanner.innerHTML = "(" + MaelstromTools_Basescanner.toString() + ")();";
		MaelstromScript_Basescanner.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(MaelstromScript_Basescanner);
		}
	} catch (e) {
		console.debug("MaelstromTools_Basescanner: init error: ", e);
	}
})();

// ==UserScript==
// @name            WarChiefs - Tiberium Alliances Sector HUD
// @description     Displays a tiny HUD with the Sector you are viewing.
// @author          Eistee
// @version         13.12.18
// @namespace       https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include         https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @icon            http://eistee82.github.io/ta_simv2/icon.png
// ==/UserScript==
/**
 *  License: CC-BY-NC-SA 3.0
 */
(function () {
	var injectFunction = function () {
		function createClasses() {
			qx.Class.define("SectorHUD", {
				type: "singleton",
				extend: qx.core.Object,
				construct: function () {
					this.SectorText = new qx.ui.basic.Label("").set({
						textColor : "#FFFFFF",
						font : "font_size_11"
					});
					var HUD = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
						decorator : new qx.ui.decoration.Background().set({
							backgroundRepeat : "no-repeat",
							backgroundImage : "webfrontend/ui/menues/notifications/bgr_ticker_container.png",
							backgroundPositionX : "center"
						}),
						padding : 2,
						opacity: 0.8
					});
					HUD.add(this.SectorText);
					HUD.addListener("click", function (e) {
						if (e.getButton() == "left") this.paste_Coords();
						if (e.getButton() == "right") this.jump_Coords();
					}, this);
					this.__refresh = false;
					qx.core.Init.getApplication().getDesktop().add(HUD, {left: 128, top: 0});
					phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this._update);
				},
				destruct: function () {},
				members: {
					__refresh: null,
					SectorText: null,
					get_SectorText: function (i) {
						var qxApp = qx.core.Init.getApplication();
						switch (i) {
						case 0:
							return qxApp.tr("tnf:south abbr");
						case 1:
							return qxApp.tr("tnf:southwest abbr");
						case 2:
							return qxApp.tr("tnf:west abbr");
						case 3:
							return qxApp.tr("tnf:northwest abbr");
						case 4:
							return qxApp.tr("tnf:north abbr");
						case 5:
							return qxApp.tr("tnf:northeast abbr");
						case 6:
							return qxApp.tr("tnf:east abbr");
						case 7:
							return qxApp.tr("tnf:southeast abbr");
						}
					},
					get_SectorNo: function (x, y) {
						var WorldX2 = Math.floor(ClientLib.Data.MainData.GetInstance().get_Server().get_WorldWidth() / 2),
							WorldY2 = Math.floor(ClientLib.Data.MainData.GetInstance().get_Server().get_WorldHeight() / 2),
							SectorCount = ClientLib.Data.MainData.GetInstance().get_Server().get_SectorCount(),
							WorldCX = (WorldX2 - x),
							WorldCY = (y - WorldY2),
							WorldCa = ((Math.atan2(WorldCX, WorldCY) * SectorCount) / 6.2831853071795862) + (SectorCount + 0.5);
						return (Math.floor(WorldCa) % SectorCount);
					},
					get_Coords: function () {
						var Region = ClientLib.Vis.VisMain.GetInstance().get_Region();
							GridWidth = Region.get_GridWidth(),
							GridHeight = Region.get_GridHeight(),
							RegionPosX = Region.get_PosX(),
							RegionPosY = Region.get_PosY(),
							ViewWidth = Region.get_ViewWidth(),
							ViewHeight = Region.get_ViewHeight(),
							ZoomFactor = Region.get_ZoomFactor(),
							ViewCoordX = Math.floor((RegionPosX + ViewWidth / 2 / ZoomFactor) / GridWidth - 0.5),
							ViewCoordY = Math.floor((RegionPosY + ViewHeight / 2 / ZoomFactor) / GridHeight - 0.5);
						return {X: ViewCoordX, Y: ViewCoordY};
					},
					paste_Coords: function(){
						var Coords = this.get_Coords(),
							input = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(),
							inputDOM = input.getContentElement().getDomElement(),
							text = [];
						text.push(inputDOM.value.substring(0, inputDOM.selectionStart));
						text.push("[coords]" + Coords.X + ':' + Coords.Y + "[/coords]");
						text.push(inputDOM.value.substring(inputDOM.selectionEnd, inputDOM.value.length));
						input.setValue(text.join(' '));
					},
					jump_Coords: function(){
						var coords = prompt("Jump to Coords:");
						if (coords) {
							coords.replace(/(\[coords\])?([#])?(\d{1,4})\D(\d{1,4})(\D\w+)?(\[\/coords\])?/gi, function () {
								if (arguments.length >= 5) {
									ClientLib.Vis.VisMain.GetInstance().get_Region().CenterGridPosition(parseInt(arguments[3], 10), parseInt(arguments[4], 10));
								}
							});
						}
					},
					_update: function () {
						if (this.__refresh === false) {
							this.__refresh = true;
							setTimeout(this.__update.bind(this), 500);
						}
					},
					__update: function () {
						var Coords = this.get_Coords();
						this.SectorText.setValue(Coords.X + ":" + Coords.Y + " [" + this.get_SectorText(this.get_SectorNo(Coords.X, Coords.Y)) + "]");
						this.__refresh = false;
					}
				}
			});
		}
		function waitForGame() {
			try {
				if (typeof qx !== "undefined" && typeof qx.core !== "undefined" && typeof qx.core.Init !== "undefined" && typeof ClientLib !== "undefined" && typeof phe !== "undefined") {
					var app = qx.core.Init.getApplication();
					if (app.initDone === true) {
						try {
							console.time("loaded in");
							createClasses();
							SectorHUD.getInstance();
							console.group("WarChiefs - Sector HUD");
							console.timeEnd("loaded in");
							console.groupEnd();
						} catch (e) {
							console.group("WarChiefs - Sector HUD");
							console.error("Error in waitForGame", e);
							console.groupEnd();
						}
					} else
						window.setTimeout(waitForGame, 1000);
				} else {
					window.setTimeout(waitForGame, 1000);
				}
			} catch (e) {
				console.group("WarChiefs - Sector HUD");
				console.error("Error in waitForGame", e);
				console.groupEnd();
			}
		}
		window.setTimeout(waitForGame, 1000);
	};
	var script = document.createElement("script");
	var txt = injectFunction.toString();
	script.innerHTML = "(" + txt + ")();";
	script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);
})();

// ==UserScript==
// @version       CNCOpt 1.7.6b
// @updateURL     https://userscripts.org/scripts/source/131289.meta.js
// @downloadURL   https://userscripts.org/scripts/source/131289.user.js
// @name          C&C:TA CNCOpt Link Button for SC
// @namespace     http://cncopt.com/
// @icon          http://cncopt.com/favicon.ico
// @description   Creates a "CNCOpt" button when selecting a base in Command & Conquer: Tiberium Alliances. The share button takes you to http://cncopt.com/ and fills in the selected base information so you can analyze or share the base.
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include       http*://*.cncopt.com/*
// @include       http*://cncopt.com/*
// @grant         GM_log
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @grant         GM_updatingEnabled
// @grant         unsafeWindow
// @contributor   PythEch (http://http://userscripts.org/users/220246)
// @contributor   jerbri (http://userscripts.org/users/507954)
// @contributor   Der_Flake
// ==/UserScript==
/* 

2013-03-03: Special thanks to jerbri for fixing this up so it worked again!
2012-11-25: Special thanks to PythEch for fixing this up so it worked again!

*/
var scity = null;
var tcity = null;
var tbase = null;
try {
  unsafeWindow.__cncopt_version = "1.7.6";
  (function () {
    var cncopt_main = function () {

      var defense_unit_map = {
        /* GDI Defense Units */"GDI_Wall": "w",
        "GDI_Cannon": "c",
        "GDI_Antitank Barrier": "t",
        "GDI_Barbwire": "b",
        "GDI_Turret": "m",
        "GDI_Flak": "f",
        "GDI_Art Inf": "r",
        "GDI_Art Air": "e",
        "GDI_Art Tank": "a",
        "GDI_Def_APC Guardian": "g",
        "GDI_Def_Missile Squad": "q",
        "GDI_Def_Pitbull": "p",
        "GDI_Def_Predator": "d",
        "GDI_Def_Sniper": "s",
        "GDI_Def_Zone Trooper": "z",
        /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
        "NOD_Def_Art Air": "e",
        "NOD_Def_Art Inf": "r",
        "NOD_Def_Art Tank": "a",
        "NOD_Def_Attack Bike": "p",
        "NOD_Def_Barbwire": "b",
        "NOD_Def_Black Hand": "z",
        "NOD_Def_Cannon": "c",
        "NOD_Def_Confessor": "s",
        "NOD_Def_Flak": "f",
        "NOD_Def_MG Nest": "m",
        "NOD_Def_Militant Rocket Soldiers": "q",
        "NOD_Def_Reckoner": "g",
        "NOD_Def_Scorpion Tank": "d",
        "NOD_Def_Wall": "w",

        /* Forgotten Defense Units */"FOR_Wall": "w",
        "FOR_Barbwire_VS_Inf": "b",
        "FOR_Barrier_VS_Veh": "t",
        "FOR_Inf_VS_Inf": "g",
        "FOR_Inf_VS_Veh": "r",
        "FOR_Inf_VS_Air": "q",
        "FOR_Sniper": "n",
        "FOR_Mammoth": "y",
        "FOR_Veh_VS_Inf": "o",
        "FOR_Veh_VS_Veh": "s",
        "FOR_Veh_VS_Air": "u",
        "FOR_Turret_VS_Inf": "m",
        "FOR_Turret_VS_Inf_ranged": "a",
        "FOR_Turret_VS_Veh": "v",
        "FOR_Turret_VS_Veh_ranged": "d",
        "FOR_Turret_VS_Air": "f",
        "FOR_Turret_VS_Air_ranged": "e",
        "": ""
      };

      var offense_unit_map = {
        /* GDI Offense Units */"GDI_APC Guardian": "g",
        "GDI_Commando": "c",
        "GDI_Firehawk": "f",
        "GDI_Juggernaut": "j",
        "GDI_Kodiak": "k",
        "GDI_Mammoth": "m",
        "GDI_Missile Squad": "q",
        "GDI_Orca": "o",
        "GDI_Paladin": "a",
        "GDI_Pitbull": "p",
        "GDI_Predator": "d",
        "GDI_Riflemen": "r",
        "GDI_Sniper Team": "s",
        "GDI_Zone Trooper": "z",

        /* Nod Offense Units */"NOD_Attack Bike": "b",
        "NOD_Avatar": "a",
        "NOD_Black Hand": "z",
        "NOD_Cobra": "r",
        "NOD_Commando": "c",
        "NOD_Confessor": "s",
        "NOD_Militant Rocket Soldiers": "q",
        "NOD_Militants": "m",
        "NOD_Reckoner": "k",
        "NOD_Salamander": "l",
        "NOD_Scorpion Tank": "o",
        "NOD_Specter Artilery": "p",
        "NOD_Venom": "v",
        "NOD_Vertigo": "t",
        "": ""
      };


      function findTechLayout(city) {
        for (var k in city) {
          //console.log(typeof(city[k]), "1.city[", k, "]", city[k])
          if ((typeof (city[k]) == "object") && city[k] && 0 in city[k] && 8 in city[k]) {
            if ((typeof (city[k][0]) == "object") && city[k][0] && city[k][0] && 0 in city[k][0] && 15 in city[k][0]) {
              if ((typeof (city[k][0][0]) == "object") && city[k][0][0] && "BuildingIndex" in city[k][0][0]) {
                return city[k];
              }
            }
          }
        }
        return null;
      }

      function findBuildings(city) {
        var cityBuildings = city.get_CityBuildingsData();
        for (var k in cityBuildings) {
          if (PerforceChangelist >= 376877) {
            if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "d" in cityBuildings[k] && "c" in cityBuildings[k] && cityBuildings[k].c > 0) {
              return cityBuildings[k].d;
            }
          } else {
            if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "l" in cityBuildings[k]) {
              return cityBuildings[k].l;
            }
          }
        }
      }

      function isOffenseUnit(unit) {
        return (unit.get_UnitGameData_Obj().n in offense_unit_map);
      }

      function isDefenseUnit(unit) {
        return (unit.get_UnitGameData_Obj().n in defense_unit_map);
      }

      function getUnitArrays(city) {
        var ret = [];
        for (var k in city) {
          if ((typeof (city[k]) == "object") && city[k]) {
            for (var k2 in city[k]) {
              if (PerforceChangelist >= 376877) {
                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "d" in city[k][k2]) {
                  var lst = city[k][k2].d;
                  if ((typeof (lst) == "object") && lst) {
                    for (var i in lst) {
                      if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                        ret.push(lst);
                      }
                    }
                  }
                }
              } else {
                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "l" in city[k][k2]) {
                  var lst = city[k][k2].l;
                  if ((typeof (lst) == "object") && lst) {
                    for (var i in lst) {
                      if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                        ret.push(lst);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return ret;
      }

      function getDefenseUnits(city) {
        var arr = getUnitArrays(city);
        for (var i = 0; i < arr.length; ++i) {
          for (var j in arr[i]) {
            if (isDefenseUnit(arr[i][j])) {
              return arr[i];
            }
          }
        }
        return [];
      }

      function getOffenseUnits(city) {
        var arr = getUnitArrays(city);
        for (var i = 0; i < arr.length; ++i) {
          for (var j in arr[i]) {
            if (isOffenseUnit(arr[i][j])) {
              return arr[i];
            }
          }
        }
        return [];
      }


      function cncopt_create() {
        console.log("CNCOpt Link Button v" + window.__cncopt_version + " loaded");
        var cncopt = {
          selected_base: null,
          keymap: {
            /* GDI Buildings */"GDI_Accumulator": "a",
            "GDI_Refinery": "r",
            "GDI_Trade Center": "u",
            "GDI_Silo": "s",
            "GDI_Power Plant": "p",
            "GDI_Construction Yard": "y",
            "GDI_Airport": "d",
            "GDI_Barracks": "b",
            "GDI_Factory": "f",
            "GDI_Defense HQ": "q",
            "GDI_Defense Facility": "w",
            "GDI_Command Center": "e",
            "GDI_Support_Art": "z",
            "GDI_Support_Air": "x",
            "GDI_Support_Ion": "i",
            /* Forgotten Buildings */"FOR_Silo": "s",
            "FOR_Refinery": "r",
            "FOR_Tiberium Booster": "b",
            "FOR_Crystal Booster": "v",
            "FOR_Trade Center": "u",
            "FOR_Defense Facility": "w",
            "FOR_Construction Yard": "y",
            "FOR_Harvester_Tiberium": "h",
            "FOR_Defense HQ": "q",
            "FOR_Harvester_Crystal": "n",
            /* Nod Buildings */"NOD_Refinery": "r",
            "NOD_Power Plant": "p",
            "NOD_Harvester": "h",
            "NOD_Construction Yard": "y",
            "NOD_Airport": "d",
            "NOD_Trade Center": "u",
            "NOD_Defense HQ": "q",
            "NOD_Barracks": "b",
            "NOD_Silo": "s",
            "NOD_Factory": "f",
            "NOD_Harvester_Crystal": "n",
            "NOD_Command Post": "e",
            "NOD_Support_Art": "z",
            "NOD_Support_Ion": "i",
            "NOD_Accumulator": "a",
            "NOD_Support_Air": "x",
            "NOD_Defense Facility": "w",
            //"NOD_Tech Lab": "",
            //"NOD_Recruitment Hub": "X",
            //"NOD_Temple of Nod": "X",

            /* GDI Defense Units */"GDI_Wall": "w",
            "GDI_Cannon": "c",
            "GDI_Antitank Barrier": "t",
            "GDI_Barbwire": "b",
            "GDI_Turret": "m",
            "GDI_Flak": "f",
            "GDI_Art Inf": "r",
            "GDI_Art Air": "e",
            "GDI_Art Tank": "a",
            "GDI_Def_APC Guardian": "g",
            "GDI_Def_Missile Squad": "q",
            "GDI_Def_Pitbull": "p",
            "GDI_Def_Predator": "d",
            "GDI_Def_Sniper": "s",
            "GDI_Def_Zone Trooper": "z",
            /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
            "NOD_Def_Art Air": "e",
            "NOD_Def_Art Inf": "r",
            "NOD_Def_Art Tank": "a",
            "NOD_Def_Attack Bike": "p",
            "NOD_Def_Barbwire": "b",
            "NOD_Def_Black Hand": "z",
            "NOD_Def_Cannon": "c",
            "NOD_Def_Confessor": "s",
            "NOD_Def_Flak": "f",
            "NOD_Def_MG Nest": "m",
            "NOD_Def_Militant Rocket Soldiers": "q",
            "NOD_Def_Reckoner": "g",
            "NOD_Def_Scorpion Tank": "d",
            "NOD_Def_Wall": "w",

            /* Forgotten Defense Units */"FOR_Wall": "w",
            "FOR_Barbwire_VS_Inf": "b",
            "FOR_Barrier_VS_Veh": "t",
            "FOR_Inf_VS_Inf": "g",
            "FOR_Inf_VS_Veh": "r",
            "FOR_Inf_VS_Air": "q",
            "FOR_Sniper": "n",
            "FOR_Mammoth": "y",
            "FOR_Veh_VS_Inf": "o",
            "FOR_Veh_VS_Veh": "s",
            "FOR_Veh_VS_Air": "u",
            "FOR_Turret_VS_Inf": "m",
            "FOR_Turret_VS_Inf_ranged": "a",
            "FOR_Turret_VS_Veh": "v",
            "FOR_Turret_VS_Veh_ranged": "d",
            "FOR_Turret_VS_Air": "f",
            "FOR_Turret_VS_Air_ranged": "e",

            /* GDI Offense Units */"GDI_APC Guardian": "g",
            "GDI_Commando": "c",
            "GDI_Firehawk": "f",
            "GDI_Juggernaut": "j",
            "GDI_Kodiak": "k",
            "GDI_Mammoth": "m",
            "GDI_Missile Squad": "q",
            "GDI_Orca": "o",
            "GDI_Paladin": "a",
            "GDI_Pitbull": "p",
            "GDI_Predator": "d",
            "GDI_Riflemen": "r",
            "GDI_Sniper Team": "s",
            "GDI_Zone Trooper": "z",

            /* Nod Offense Units */"NOD_Attack Bike": "b",
            "NOD_Avatar": "a",
            "NOD_Black Hand": "z",
            "NOD_Cobra": "r",
            "NOD_Commando": "c",
            "NOD_Confessor": "s",
            "NOD_Militant Rocket Soldiers": "q",
            "NOD_Militants": "m",
            "NOD_Reckoner": "k",
            "NOD_Salamander": "l",
            "NOD_Scorpion Tank": "o",
            "NOD_Specter Artilery": "p",
            "NOD_Venom": "v",
            "NOD_Vertigo": "t",

            "<last>": "."
          },
          make_sharelink: function () {
            try {
              var selected_base = cncopt.selected_base;
              var city_id = selected_base.get_Id();
              var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
              var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
              var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
              var server = ClientLib.Data.MainData.GetInstance().get_Server();
              var doLinkCity = (city.get_CityFaction() > 2 ? own_city.get_CityFaction() : city.get_CityFaction());
              var doCity = (city.get_CityFaction() > 2 ? own_city : city);
              tbase = selected_base;
              tcity = city;
              scity = own_city;
              //console.log("Target City: ", city);
              //console.log("Own City: ", own_city);
              var link = "http://cncopt.com/?map=";
              link += "3|"; /* link version */
              switch (city.get_CityFaction()) {
                case 1:
                  /* GDI */
                  link += "G|";
                  break;
                case 2:
                  /* NOD */
                  link += "N|";
                  break;
                case 3:
                  /* FOR faction - unseen, but in GAMEDATA */
                case 4:
                  /* Forgotten Bases */
                case 5:
                  /* Forgotten Camps */
                case 6:
                  /* Forgotten Outposts */
                  link += "F|";
                  break;
                default:
                  console.log("cncopt: Unknown faction: " + city.get_CityFaction());
                  link += "E|";
                  break;
              }
              //switch (own_city.get_CityFaction()) {
              switch (doLinkCity) {
                case 1:
                  /* GDI */
                  link += "G|";
                  break;
                case 2:
                  /* NOD */
                  link += "N|";
                  break;
                case 3:
                  /* FOR faction - unseen, but in GAMEDATA */
                case 4:
                  /* Forgotten Bases */
                case 5:
                  /* Forgotten Camps */
                case 6:
                  /* Forgotten Outposts */
                  link += "F|";
                  break;
                default:
                  console.log("cncopt: Unknown faction: " + own_city.get_CityFaction());
                  link += "E|";
                  break;
              }
              link += city.get_Name() + "|";
              defense_units = []
              for (var i = 0; i < 20; ++i) {
                var col = [];
                for (var j = 0; j < 9; ++j) {
                  col.push(null);
                }
                defense_units.push(col)
              }
              var defense_unit_list = getDefenseUnits(city);
              if (PerforceChangelist >= 376877) {
                for (var i in defense_unit_list) {
                  var unit = defense_unit_list[i];
                  defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                }
              } else {
                for (var i = 0; i < defense_unit_list.length; ++i) {
                  var unit = defense_unit_list[i];
                  defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                }
              }

              offense_units = []
              for (var i = 0; i < 20; ++i) {
                var col = [];
                for (var j = 0; j < 9; ++j) {
                  col.push(null);
                }
                offense_units.push(col)
              }

              //var offense_unit_list = getOffenseUnits(own_city);
              var offense_unit_list = getOffenseUnits(doCity);
              if (PerforceChangelist >= 376877) {
                for (var i in offense_unit_list) {
                  var unit = offense_unit_list[i];
                  offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                }
              } else {
                for (var i = 0; i < offense_unit_list.length; ++i) {
                  var unit = offense_unit_list[i];
                  offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                }
              }

              var techLayout = findTechLayout(city);
              var buildings = findBuildings(city);
              for (var i = 0; i < 20; ++i) {
                row = [];
                for (var j = 0; j < 9; ++j) {
                  var spot = i > 16 ? null : techLayout[j][i];
                  var level = 0;
                  var building = null;
                  if (spot && spot.BuildingIndex >= 0) {
                    building = buildings[spot.BuildingIndex];
                    level = building.get_CurrentLevel();
                  }
                  var defense_unit = defense_units[j][i];
                  if (defense_unit) {
                    level = defense_unit.get_CurrentLevel();
                  }
                  var offense_unit = offense_units[j][i];
                  if (offense_unit) {
                    level = offense_unit.get_CurrentLevel();
                  }
                  if (level > 1) {
                    link += level;
                  }

                  switch (i > 16 ? 0 : city.GetResourceType(j, i)) {
                    case 0:
                      if (building) {
                        var techId = building.get_MdbBuildingId();
                        if (GAMEDATA.Tech[techId].n in cncopt.keymap) {
                          link += cncopt.keymap[GAMEDATA.Tech[techId].n];
                        } else {
                          console.log("cncopt [5]: Unhandled building: " + techId, building);
                          link += ".";
                        }
                      } else if (defense_unit) {
                        if (defense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                          link += cncopt.keymap[defense_unit.get_UnitGameData_Obj().n];
                        } else {
                          console.log("cncopt [5]: Unhandled unit: " + defense_unit.get_UnitGameData_Obj().n);
                          link += ".";
                        }
                      } else if (offense_unit) {
                        if (offense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                          link += cncopt.keymap[offense_unit.get_UnitGameData_Obj().n];
                        } else {
                          console.log("cncopt [5]: Unhandled unit: " + offense_unit.get_UnitGameData_Obj().n);
                          link += ".";
                        }
                      } else {
                        link += ".";
                      }
                      break;
                    case 1:
                      /* Crystal */
                      if (spot.BuildingIndex < 0) link += "c";
                      else link += "n";
                      break;
                    case 2:
                      /* Tiberium */
                      if (spot.BuildingIndex < 0) link += "t";
                      else link += "h";
                      break;
                    case 4:
                      /* Woods */
                      link += "j";
                      break;
                    case 5:
                      /* Scrub */
                      link += "h";
                      break;
                    case 6:
                      /* Oil */
                      link += "l";
                      break;
                    case 7:
                      /* Swamp */
                      link += "k";
                      break;
                    default:
                      console.log("cncopt [4]: Unhandled resource type: " + city.GetResourceType(j, i));
                      link += ".";
                      break;
                  }
                }
              }
              /* Tack on our alliance bonuses */
              if (alliance && scity.get_AllianceId() == tcity.get_AllianceId()) {
                link += "|" + alliance.get_POITiberiumBonus();
                link += "|" + alliance.get_POICrystalBonus();
                link += "|" + alliance.get_POIPowerBonus();
                link += "|" + alliance.get_POIInfantryBonus();
                link += "|" + alliance.get_POIVehicleBonus();
                link += "|" + alliance.get_POIAirBonus();
                link += "|" + alliance.get_POIDefenseBonus();
              }
              if (server.get_TechLevelUpgradeFactorBonusAmount() != 1.20) {
                  link += "|newEconomy";
              }

              //console.log(link);
              window.open(link, "_blank");
            } catch (e) {
              console.log("cncopt [1]: ", e);
            }
          }
        };
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }

        var check_ct = 0;
        var check_timer = null;
        var button_enabled = 123456;
        /* Wrap showMenu so we can inject our Sharelink at the end of menus and
         * sync Base object to our cncopt.selected_base variable  */
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selected_base) {
          try {
            var self = this;
            //console.log(selected_base);
            cncopt.selected_base = selected_base;
            if (this.__cncopt_initialized != 1) {
              this.__cncopt_initialized = 1;
              this.__cncopt_links = [];
              for (var i in this) {
                try {
                  if (this[i] && this[i].basename == "Composite") {
                    var link = new qx.ui.form.Button("CNCOpt", "http://cncopt.com/favicon.ico");
                    link.addListener("execute", function () {
                      var bt = qx.core.Init.getApplication();
                      bt.getBackgroundArea().closeCityInfo();
                      cncopt.make_sharelink();
                    });
                    this[i].add(link);
                    this.__cncopt_links.push(link)
                  }
                } catch (e) {
                  console.log("cncopt [2]: ", e);
                }
              }
            }
            var tf = false;
            switch (selected_base.get_VisObjectType()) {
              case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                switch (selected_base.get_Type()) {
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Own:
                    tf = true;
                    break;
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance:
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Enemy:
                    tf = true;
                    break;
                }
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionGhostCity:
                tf = false;
                console.log("cncopt: Ghost City selected.. ignoring because we don't know what to do here");
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                tf = true;
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                tf = true;
                break;
            }

            var orig_tf = tf;

            function check_if_button_should_be_enabled() {
              try {
                tf = orig_tf;
                var selected_base = cncopt.selected_base;
                var still_loading = false;
                if (check_timer != null) {
                  clearTimeout(check_timer);
                }

                /* When a city is selected, the data for the city is loaded in the background.. once the 
                 * data arrives, this method is called again with these fields set, but until it does
                 * we can't actually generate the link.. so this section of the code grays out the button
                 * until the data is ready, then it'll light up. */
                if (selected_base && selected_base.get_Id) {
                  var city_id = selected_base.get_Id();
                  var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                  //if (!city || !city.m_CityUnits || !city.m_CityUnits.m_DefenseUnits) {
                  //console.log("City", city);
                  //console.log("get_OwnerId", city.get_OwnerId());
                  if (!city || city.get_OwnerId() == 0) {
                    still_loading = true;
                    tf = false;
                  }
                } else {
                  tf = false;
                }
                if (tf != button_enabled) {
                  button_enabled = tf;
                  for (var i = 0; i < self.__cncopt_links.length; ++i) {
                    self.__cncopt_links[i].setEnabled(tf);
                  }
                }
                if (!still_loading) {
                  check_ct = 0;
                } else {
                  if (check_ct > 0) {
                    check_ct--;
                    check_timer = setTimeout(check_if_button_should_be_enabled, 100);
                  } else {
                    check_timer = null;
                  }
                }
              } catch (e) {
                console.log("cncopt [3]: ", e);
                tf = false;
              }
            }

            check_ct = 50;
            check_if_button_should_be_enabled();
          } catch (e) {
            console.log("cncopt [3]: ", e);
          }
          this.__cncopt_real_showMenu(selected_base);
        }
      }


      /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
      function cnc_check_if_loaded() {
        try {
          if (typeof qx != 'undefined') {
            a = qx.core.Init.getApplication(); // application
            if (a) {
              cncopt_create();
            } else {
              window.setTimeout(cnc_check_if_loaded, 1000);
            }
          } else {
            window.setTimeout(cnc_check_if_loaded, 1000);
          }
        } catch (e) {
          if (typeof console != 'undefined') console.log(e);
          else if (window.opera) opera.postError(e);
          else GM_log(e);
        }
      }
      if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(cnc_check_if_loaded, 1000);
    }

    // injecting because we can't seem to hook into the game interface via unsafeWindow 
    //   (Ripped from AmpliDude's LoU Tweak script)
    var script_block = document.createElement("script");
    txt = cncopt_main.toString();
    script_block.innerHTML = "(" + txt + ")();";
    script_block.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(script_block);
  })();
} catch (e) {
  GM_log(e);
}

// ==UserScript==
// @name            WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army
// @description     Upgrade your Base,Defense Army to a specific Level.
// @author          Eistee
// @version         13.11.11
// @namespace       https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include         https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @icon            http://eistee82.github.io/ta_simv2/icon.png
// ==/UserScript==
/**
 *  License: CC-BY-NC-SA 3.0
 *
 *  thx to TheStriker for his API knowledge.
 *
 */
(function () {
	var injectFunction = function () {
		function createClasses() {
			qx.Class.define("Upgrade", {
				type: "singleton",
				extend: qx.core.Object,
				construct: function () {
					try {
						var qxApp = qx.core.Init.getApplication();

						var stats = document.createElement('img');
						stats.src = "http://goo.gl/BuvwKs"; // http://goo.gl/#analytics/goo.gl/BuvwKs/all_time

						var btnUpgrade = new qx.ui.form.Button(qxApp.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png").set({
							toolTipText: qxApp.tr("tnf:toggle upgrade mode"),
							alignY: "middle",
							show: "icon",
							width : 60,
							allowGrowX : false,
							allowGrowY : false,
							appearance : "button"
						});
						btnUpgrade.addListener("click", this.toggleWindow, this);

						var btnTrade = qx.core.Init.getApplication().getPlayArea().getHUD().getUIItem(ClientLib.Data.Missions.PATH.WDG_TRADE);
						btnTrade.getLayoutParent().addAfter(btnUpgrade, btnTrade);
					} catch (e) {
						console.log("Error setting up Upgrade Constructor: ");
						console.log(e.toString());
					}
				},
				destruct: function () {},
				members: {
					toggleWindow: function () {
						if (Upgrade.Window.getInstance().isVisible()) Upgrade.Window.getInstance().close();
						else Upgrade.Window.getInstance().open();
					}
				}
			});
			qx.Class.define("Upgrade.Window", {
				type: "singleton",
				extend: qx.ui.window.Window,
				construct: function () {
					try {
						this.base(arguments);
						this.set({
							layout: new qx.ui.layout.VBox().set({ spacing: 0 }),
							contentPadding: 5,
							contentPaddingTop: 0,
							allowMaximize: false,
							showMaximize: false,
							allowMinimize: false,
							showMinimize: false,
							resizable: false
						});
						this.moveTo(124, 31);
						this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" });

						this.add(new Upgrade.Current());
						this.add(new Upgrade.All());
						this.add(new Upgrade.Repairtime());

						this.addListener("appear", this.onOpen, this);
						this.addListener("close", this.onClose, this);
					} catch (e) {
						console.log("Error setting up Upgrade.Window Constructor: ");
						console.log(e.toString());
					}
				},
				destruct: function () {},
				members: {
					onOpen: function () {
						phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
						this.onViewModeChanged(null, ClientLib.Vis.VisMain.GetInstance().get_Mode());
					},
					onClose: function () {
						phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
					},
					onViewModeChanged: function (oldMode, newMode) {
						if (oldMode !== newMode) {
							var qxApp = qx.core.Init.getApplication();
							switch (newMode) {
							case ClientLib.Vis.Mode.City:
								this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:base"));
								this.setIcon("FactionUI/icons/icon_arsnl_base_buildings.png");
								break;
							case ClientLib.Vis.Mode.DefenseSetup:
								this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:defense"));
								this.setIcon("FactionUI/icons/icon_def_army_points.png");
								break;
							case ClientLib.Vis.Mode.ArmySetup:
								this.setCaption(qxApp.tr("tnf:toggle upgrade mode") + ": " + qxApp.tr("tnf:offense"));
								this.setIcon("FactionUI/icons/icon_army_points.png");
								break;
							default:
								this.close();
								break;
							}
						}
					}
				}
			});
			qx.Class.define("Upgrade.All", {
				extend: qx.ui.container.Composite,
				construct: function () {
					try {
						qx.ui.container.Composite.call(this);
						this.set({
							layout : new qx.ui.layout.VBox(5),
							padding: 5,
							decorator: "pane-light-opaque"
						});
						this.add(this.title = new qx.ui.basic.Label("").set({ alignX: "center", font: "font_size_14_bold" }));

						var level = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
						level.add(new qx.ui.basic.Label(this.tr("tnf:level:")).set({ alignY: "middle" }));
						level.add(this.txtLevel = new qx.ui.form.Spinner(1).set({ maximum: 150, minimum: 1 }));
						this.txtLevel.addListener("changeValue", this.onInput, this);
						level.add(this.btnLevel = new qx.ui.form.Button(this.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"));
						this.btnLevel.addListener("execute", this.onUpgrade, this);
						this.add(level);

						var requires = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
						requires.add(new qx.ui.basic.Label(this.tr("tnf:requires:")));
						var resource = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
						resource.add(this.resTiberium = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
						this.resTiberium.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
						this.resTiberium.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						resource.add(this.resChrystal = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
						this.resChrystal.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
						this.resChrystal.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						resource.add(this.resPower = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
						this.resPower.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
						this.resPower.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						requires.add(resource);
						this.add(requires);

						this.addListener("appear", this.onAppear, this);
						this.addListener("disappear", this.onDisappear, this);
					} catch (e) {
						console.log("Error setting up Upgrade.All Constructor: ");
						console.log(e.toString());
					}
				},
				destruct: function () {},
				members: {
					title: null,
					txtLevel: null,
					btnLevel: null,
					resTiberium: null,
					resChrystal: null,
					resPower: null,
					onAppear: function () {
						phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
						phe.cnc.base.Timer.getInstance().addListener("uiTick", this.onTick, this);
						this.onViewModeChanged(null, ClientLib.Vis.VisMain.GetInstance().get_Mode());
					},
					onDisappear: function () {
						phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
						phe.cnc.base.Timer.getInstance().removeListener("uiTick", this.onTick, this);
					},
					onViewModeChanged: function (oldViewMode, newViewMode) {
						if (oldViewMode !== newViewMode) {
							switch (newViewMode) {
							case ClientLib.Vis.Mode.City:
								this.title.setValue(this.tr("All buildings"));
								this.reset();
								break;
							case ClientLib.Vis.Mode.DefenseSetup:
								this.title.setValue(this.tr("All defense units"));
								this.reset();
								break;
							case ClientLib.Vis.Mode.ArmySetup:
								this.title.setValue(this.tr("All army units"));
								this.reset();
								break;
							}
						}
					},
					onCurrentCityChange: function (oldCurrentCity, newCurrentCity) {
						if (oldCurrentCity !== newCurrentCity) {
							this.reset();
						}
					},
					getResTime: function (need, type) {
						var CurrentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var Alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
						need -= CurrentOwnCity.GetResourceCount(type);
						need = Math.max(0, need);
						var Con = CurrentOwnCity.GetResourceGrowPerHour(type);
						var Bonus = CurrentOwnCity.get_hasCooldown() ? 0 : CurrentOwnCity.GetResourceBonusGrowPerHour(type);
						var POI = CurrentOwnCity.get_IsGhostMode() ? 0 : Alliance.GetPOIBonusFromResourceType(type);
						return (need <= 0 ? 0 : need / (Con + Bonus + POI) * 3600);
					},
					getUpgradeCostsToLevel: function (newLevel) {
						if (newLevel > 0) {
							switch (ClientLib.Vis.VisMain.GetInstance().get_Mode()) {
							case ClientLib.Vis.Mode.City:
								return ClientLib.API.City.GetInstance().GetUpgradeCostsForAllBuildingsToLevel(newLevel);
							case ClientLib.Vis.Mode.DefenseSetup:
								return ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
							case ClientLib.Vis.Mode.ArmySetup:
								return ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
							}
						}
						return null;
					},
					getLowLevel: function () {
						for (var newLevel = 1, Tib = 0, Cry = 0, Pow = 0; Tib === 0 && Cry === 0 && Pow === 0 && newLevel < 1000; newLevel++) {
							var costs = this.getUpgradeCostsToLevel(newLevel);
							if (costs !== null) {
								for (var i = 0; i < costs.length; i++) {
									var uCosts = costs[i];
									var cType = parseInt(uCosts.Type, 10);
									switch (cType) {
									case ClientLib.Base.EResourceType.Tiberium:
										Tib += uCosts.Count;
										break;
									case ClientLib.Base.EResourceType.Crystal:
										Cry += uCosts.Count;
										break;
									case ClientLib.Base.EResourceType.Power:
										Pow += uCosts.Count;
										break;
									}
								}
							}
						}
						return (newLevel === 1000?0:(newLevel - 1));
					},
					reset: function () {
						var LowLevel = this.getLowLevel();
						if (LowLevel > 0) {
							this.txtLevel.setMinimum(LowLevel);
							this.txtLevel.setMaximum(LowLevel + 50);
							this.txtLevel.setValue(LowLevel);
							this.txtLevel.setEnabled(true);
							this.btnLevel.setEnabled(true);
						} else {
							this.txtLevel.setMinimum(0);
							this.txtLevel.setMaximum(0);
							this.txtLevel.resetValue();
							this.txtLevel.setEnabled(false);
							this.btnLevel.setEnabled(false);
						}
						this.onInput();
					},
					onTick: function () {
						this.onInput();
					},
					onInput: function () {
						var newLevel = parseInt(this.txtLevel.getValue(), 10);
						var costs = this.getUpgradeCostsToLevel(newLevel);
						if (newLevel > 0 && costs !== null) {
							for (var i = 0, Tib = 0, Cry = 0, Pow = 0, TibTime = 0, CryTime = 0, PowTime = 0; i < costs.length; i++) {
								var uCosts = costs[i];
								switch (parseInt(uCosts.Type, 10)) {
								case ClientLib.Base.EResourceType.Tiberium:
									Tib += uCosts.Count;
									TibTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Tiberium);
									break;
								case ClientLib.Base.EResourceType.Crystal:
									Cry += uCosts.Count;
									CryTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Crystal);
									break;
								case ClientLib.Base.EResourceType.Power:
									Pow += uCosts.Count;
									PowTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Power);
									break;
								}
							}
							this.resTiberium.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib) + (TibTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(TibTime) : ""));
							this.resTiberium.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
							if (Tib === 0) this.resTiberium.exclude();
							else this.resTiberium.show();
							this.resChrystal.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry) + (CryTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(CryTime) : ""));
							this.resChrystal.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
							if (Cry === 0) this.resChrystal.exclude();
							else this.resChrystal.show();
							this.resPower.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow) + (PowTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(PowTime) : ""));
							this.resPower.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
							if (Pow === 0) this.resPower.exclude();
							else this.resPower.show();
						} else {
							this.resTiberium.setLabel("-");
							this.resTiberium.resetToolTipText();
							this.resTiberium.show();
							this.resChrystal.setLabel("-");
							this.resChrystal.resetToolTipText();
							this.resChrystal.show();
							this.resPower.setLabel("-");
							this.resPower.resetToolTipText();
							this.resPower.show();
						}
					},
					onUpgrade: function () {
						var newLevel = parseInt(this.txtLevel.getValue(), 10);
						if (newLevel > 0) {
							switch (ClientLib.Vis.VisMain.GetInstance().get_Mode()) {
							case ClientLib.Vis.Mode.City:
								ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel);
								this.reset();
								break;
							case ClientLib.Vis.Mode.DefenseSetup:
								ClientLib.API.Defense.GetInstance().UpgradeAllUnitsToLevel(newLevel);
								this.reset();
								break;
							case ClientLib.Vis.Mode.ArmySetup:
								ClientLib.API.Army.GetInstance().UpgradeAllUnitsToLevel(newLevel);
								this.reset();
								break;
							}
						}
					}
				}
			});
			qx.Class.define("Upgrade.Current", {
				extend: qx.ui.container.Composite,
				construct: function () {
					try {
						qx.ui.container.Composite.call(this);
						this.set({
							layout : new qx.ui.layout.VBox(5),
							padding: 5,
							decorator: "pane-light-opaque"
						});
						this.add(this.title = new qx.ui.basic.Label("").set({ alignX: "center", font: "font_size_14_bold" }));
						this.add(this.txtSelected = new qx.ui.basic.Label("").set({ alignX: "center" }));

						var level = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
						level.add(new qx.ui.basic.Label(this.tr("tnf:level:")).set({ alignY: "middle" }));
						level.add(this.txtLevel = new qx.ui.form.Spinner(1).set({ maximum: 150, minimum: 1 }));
						this.txtLevel.addListener("changeValue", this.onInput, this);
						level.add(this.btnLevel = new qx.ui.form.Button(this.tr("tnf:toggle upgrade mode"), "FactionUI/icons/icon_building_detail_upgrade.png"));
						this.btnLevel.addListener("execute", this.onUpgrade, this);
						this.add(level);

						var requires = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
						requires.add(new qx.ui.basic.Label(this.tr("tnf:requires:")));
						var resource = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
						resource.add(this.resTiberium = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_tiberium.png"));
						this.resTiberium.setToolTipIcon("webfrontend/ui/common/icn_res_tiberium.png");
						this.resTiberium.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						resource.add(this.resChrystal = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_chrystal.png"));
						this.resChrystal.setToolTipIcon("webfrontend/ui/common/icn_res_chrystal.png");
						this.resChrystal.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						resource.add(this.resPower = new qx.ui.basic.Atom("-", "webfrontend/ui/common/icn_res_power.png"));
						this.resPower.setToolTipIcon("webfrontend/ui/common/icn_res_power.png");
						this.resPower.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						requires.add(resource);
						this.add(requires);

						this.addListener("appear", this.onAppear, this);
						this.addListener("disappear", this.onDisappear, this);
					} catch (e) {
						console.log("Error setting up Upgrade.Current Constructor: ");
						console.log(e.toString());
					}
				},
				destruct: function () {},
				members: {
					title: null,
					txtSelected: null,
					txtLevel: null,
					btnLevel: null,
					resTiberium: null,
					resChrystal: null,
					resPower: null,
					Selection: null,
					onAppear: function () {
						phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
						phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
						phe.cnc.base.Timer.getInstance().addListener("uiTick", this.onTick, this);
						this.onViewModeChanged(null, ClientLib.Vis.VisMain.GetInstance().get_Mode());
					},
					onDisappear: function () {
						phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.onViewModeChanged);
						phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
						phe.cnc.base.Timer.getInstance().removeListener("uiTick", this.onTick, this);
					},
					onViewModeChanged: function (oldViewMode, newViewMode) {
						if (oldViewMode !== newViewMode) {
							switch (newViewMode) {
							case ClientLib.Vis.Mode.City:
								this.title.setValue(this.tr("Selected building"));
								this.reset();
								break;
							case ClientLib.Vis.Mode.DefenseSetup:
								this.title.setValue(this.tr("Selected defense unit"));
								this.reset();
								break;
							case ClientLib.Vis.Mode.ArmySetup:
								this.title.setValue(this.tr("Selected army unit"));
								this.reset();
								break;
							}
						}
					},
					onSelectionChange: function (oldSelection, newSelection) {
						if (newSelection !== null) {
							var name, level;
							switch (newSelection.get_VisObjectType()) {
							case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
								this.Selection = newSelection;
								name = newSelection.get_BuildingName();
								level = newSelection.get_BuildingLevel();
								this.txtSelected.setValue(name + " (" + level + ")");
								this.txtLevel.setMinimum(level + 1);
								this.txtLevel.setMaximum(level + 51);
								this.txtLevel.setValue(level + 1);
								this.txtLevel.setEnabled(true);
								this.btnLevel.setEnabled(true);
								this.onInput();
								break;
							case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
							case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
								this.Selection = newSelection;
								name = newSelection.get_UnitName();
								level = newSelection.get_UnitLevel();
								this.txtSelected.setValue(name + " (" + level + ")");
								this.txtLevel.setMinimum(level + 1);
								this.txtLevel.setMaximum(level + 51);
								this.txtLevel.setValue(level + 1);
								this.txtLevel.setEnabled(true);
								this.btnLevel.setEnabled(true);
								this.onInput();
								break;
							}
						}
					},
					onCurrentCityChange: function (oldCurrentCity, newCurrentCity) {
						if (oldCurrentCity !== newCurrentCity) {
							this.reset();
						}
					},
					getResTime: function (need, type) {
						var CurrentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var Alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
						need -= CurrentOwnCity.GetResourceCount(type);
						need = Math.max(0, need);
						var Con = CurrentOwnCity.GetResourceGrowPerHour(type);
						var Bonus = CurrentOwnCity.get_hasCooldown() ? 0 : CurrentOwnCity.GetResourceBonusGrowPerHour(type);
						var POI = CurrentOwnCity.get_IsGhostMode() ? 0 : Alliance.GetPOIBonusFromResourceType(type);
						return (need <= 0 ? 0 : need / (Con + Bonus + POI) * 3600);
					},
					getUpgradeCostsToLevel: function (unit, newLevel) {
						var costs = null;
						if (unit !== null && newLevel > 0) {
							switch (unit.get_VisObjectType()) {
							case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
								if (newLevel > unit.get_BuildingLevel())
									costs = ClientLib.API.City.GetInstance().GetUpgradeCostsForBuildingToLevel(unit.get_BuildingDetails(), newLevel);
								break;
							case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
								if (newLevel > unit.get_UnitLevel())
									costs = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForUnitToLevel(unit.get_UnitDetails(), newLevel);
								break;
							case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
								if (newLevel > unit.get_UnitLevel())
									costs = ClientLib.API.Army.GetInstance().GetUpgradeCostsForUnitToLevel(unit.get_UnitDetails(), newLevel);
								break;
							}
						}
						return costs;
					},
					reset: function () {
						this.Selection = null;
						this.txtSelected.setValue("-");
						this.txtLevel.setMinimum(0);
						this.txtLevel.setMaximum(0);
						this.txtLevel.resetValue();
						this.txtLevel.setEnabled(false);
						this.btnLevel.setEnabled(false);
						this.onInput();
					},
					onTick: function () {
						this.onInput();
					},
					onInput: function () {
						var costs = this.getUpgradeCostsToLevel(this.Selection, parseInt(this.txtLevel.getValue(), 10));
						if (costs !== null) {
							for (var i = 0, Tib = 0, Cry = 0, Pow = 0, TibTime = 0, CryTime = 0, PowTime = 0; i < costs.length; i++) {
								var uCosts = costs[i];
								switch (parseInt(uCosts.Type, 10)) {
								case ClientLib.Base.EResourceType.Tiberium:
									Tib += uCosts.Count;
									TibTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Tiberium);
									break;
								case ClientLib.Base.EResourceType.Crystal:
									Cry += uCosts.Count;
									CryTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Crystal);
									break;
								case ClientLib.Base.EResourceType.Power:
									Pow += uCosts.Count;
									PowTime += this.getResTime(uCosts.Count, ClientLib.Base.EResourceType.Power);
									break;
								}
							}
							this.resTiberium.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Tib) + (TibTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(TibTime) : ""));
							this.resTiberium.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Tib));
							if (Tib === 0) this.resTiberium.exclude();
							else this.resTiberium.show();
							this.resChrystal.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Cry) + (CryTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(CryTime) : ""));
							this.resChrystal.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Cry));
							if (Cry === 0) this.resChrystal.exclude();
							else this.resChrystal.show();
							this.resPower.setLabel(phe.cnc.gui.util.Numbers.formatNumbersCompact(Pow) + (PowTime > 0 ? " @ " + phe.cnc.Util.getTimespanString(PowTime) : ""));
							this.resPower.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(Pow));
							if (Pow === 0) this.resPower.exclude();
							else this.resPower.show();
						} else {
							this.resTiberium.setLabel("-");
							this.resTiberium.resetToolTipText();
							this.resTiberium.show();
							this.resChrystal.setLabel("-");
							this.resChrystal.resetToolTipText();
							this.resChrystal.show();
							this.resPower.setLabel("-");
							this.resPower.resetToolTipText();
							this.resPower.show();
						}
					},
					onUpgrade: function() {
						var newLevel = parseInt(this.txtLevel.getValue(), 10);
						if (newLevel > 0 && this.Selection !== null) {
							switch (this.Selection.get_VisObjectType()) {
							case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
								if (newLevel > this.Selection.get_BuildingLevel()) {
									ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(this.Selection.get_BuildingDetails(), newLevel);
									this.onSelectionChange(null, this.Selection);
								}
								break;
							case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
								if (newLevel > this.Selection.get_UnitLevel()) {
									ClientLib.API.Defense.GetInstance().UpgradeUnitToLevel(this.Selection.get_UnitDetails(), newLevel);
									this.onSelectionChange(null, this.Selection);
								}
								break;
							case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
								if (newLevel > this.Selection.get_UnitLevel()) {
									ClientLib.API.Army.GetInstance().UpgradeUnitToLevel(this.Selection.get_UnitDetails(), newLevel);
									this.onSelectionChange(null, this.Selection);
								}
								break;
							}
						}
					}
				}
			});
			qx.Class.define("Upgrade.Repairtime", {
				extend: qx.ui.container.Composite,
				construct: function () {
					try {
						qx.ui.container.Composite.call(this);
						this.set({
							layout : new qx.ui.layout.VBox(5),
							padding: 5,
							decorator: "pane-light-opaque"
						});
						this.add(this.title = new qx.ui.basic.Label(this.tr("tnf:repair points")).set({ alignX: "center", font: "font_size_14_bold" }));
						this.add(this.grid = new qx.ui.container.Composite(new qx.ui.layout.Grid()));

						this.grid.add(this.basRT = new qx.ui.basic.Atom("", "FactionUI/icons/icon_arsnl_base_buildings.png").set({toolTipText: this.tr("tnf:base")}), {row: 0, column: 0});
						this.basRT.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 0, column: 2});
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 0, column: 4});
						this.grid.add(this.btnBuildings = new qx.ui.form.Button(null, "FactionUI/icons/icon_building_detail_upgrade.png").set({toolTipText: this.tr("tnf:toggle upgrade mode"), width: 25, maxHeight: 17, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}), {row: 0, column: 6});
						this.btnBuildings.getChildControl("icon").set({width: 14, height: 14, scale: true});
						this.btnBuildings.addListener("execute", function () { this.upgradeBuilding(ClientLib.Base.ETechName.Construction_Yard); }, this);

						this.grid.add(this.infRT = new qx.ui.basic.Atom("", "FactionUI/icons/icon_arsnl_off_squad.png").set({toolTipText: this.tr("tnf:infantry repair title")}), {row: 1, column: 0});
						this.infRT.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 1, column: 2});
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 1, column: 4});
						this.grid.add(this.btnInfantry = new qx.ui.form.Button(null, "FactionUI/icons/icon_building_detail_upgrade.png").set({toolTipText: this.tr("tnf:toggle upgrade mode"), width: 25, maxHeight: 17, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}), {row: 1, column: 6});
						this.btnInfantry.getChildControl("icon").set({width: 14, height: 14, scale: true});
						this.btnInfantry.addListener("execute", function () { this.upgradeBuilding(ClientLib.Base.ETechName.Barracks); }, this);

						this.grid.add(this.vehRT = new qx.ui.basic.Atom("", "FactionUI/icons/icon_arsnl_off_vehicle.png").set({toolTipText: this.tr("tnf:vehicle repair title")}), {row: 2, column: 0});
						this.vehRT.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 2, column: 2});
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 2, column: 4});
						this.grid.add(this.btnVehicle = new qx.ui.form.Button(null, "FactionUI/icons/icon_building_detail_upgrade.png").set({toolTipText: this.tr("tnf:toggle upgrade mode"), width: 25, maxHeight: 17, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}), {row: 2, column: 6});
						this.btnVehicle.getChildControl("icon").set({width: 14, height: 14, scale: true});
						this.btnVehicle.addListener("execute", function () { this.upgradeBuilding(ClientLib.Base.ETechName.Factory); }, this);

						this.grid.add(this.airRT = new qx.ui.basic.Atom("", "FactionUI/icons/icon_arsnl_off_plane.png").set({toolTipText: this.tr("tnf:aircraft repair title")}), {row: 3, column: 0});
						this.airRT.getChildControl("icon").set({ width: 18, height: 18, scale: true, alignY: "middle" });
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 3, column: 2});
						this.grid.add(new qx.ui.basic.Label("").set({ alignX: "right", alignY: "middle" }), {row: 3, column: 4});
						this.grid.add(this.btnAircraft = new qx.ui.form.Button(null, "FactionUI/icons/icon_building_detail_upgrade.png").set({toolTipText: this.tr("tnf:toggle upgrade mode"), width: 25, maxHeight: 17, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"}), {row: 3, column: 6});
						this.btnAircraft.getChildControl("icon").set({width: 14, height: 14, scale: true});
						this.btnAircraft.addListener("execute", function () { this.upgradeBuilding(ClientLib.Base.ETechName.Airport); }, this);

						this.grid.getLayout().setRowFlex(0, 0);
						this.grid.getLayout().setRowFlex(1, 0);
						this.grid.getLayout().setRowFlex(2, 0);
						this.grid.getLayout().setRowFlex(3, 0);
						this.grid.getLayout().setColumnFlex(1, 200);
						this.grid.getLayout().setColumnFlex(3, 200);
						this.grid.getLayout().setColumnFlex(5, 200);

						this.addListener("appear", this.onAppear, this);
						this.addListener("disappear", this.onDisappear, this);
					} catch (e) {
						console.log("Error setting up Upgrade.Repairtime Constructor: ");
						console.log(e.toString());
					}
				},
				destruct: function () {},
				members: {
					title: null,
					grid: null,
					btnBuildings: null,
					btnInfantry: null,
					btnVehicle: null,
					btnAircraft: null,
					onAppear: function () {
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
						phe.cnc.base.Timer.getInstance().addListener("uiTick", this.onTick, this);
						this.getInfo();
					},
					onDisappear: function () {
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.onCurrentCityChange);
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.onCurrentCityChange);
						phe.cnc.base.Timer.getInstance().removeListener("uiTick", this.onTick, this);
					},
					onTick: function () {
						this.getInfo();
					},
					onCurrentCityChange: function (oldCurrentCity, newCurrentCity) {
						if (oldCurrentCity !== newCurrentCity) {
							this.getInfo();
						}
					},
					canUpgradeBuilding: function (ETechName) {
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var building = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ETechName);
						if (building) {
							var ResourceRequirements_Obj = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(building.get_CurrentLevel() + 1, building.get_UnitGameData_Obj());
							return (building.get_CurrentDamage() === 0 && !city.get_IsLocked() && city.HasEnoughResources(ResourceRequirements_Obj));
						} else return false;
					},
					upgradeBuilding: function (ETechName) {
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var building = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ETechName);
						if (building) {
							ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", {
								cityid : city.get_Id(),
								posX : building.get_CoordX(),
								posY : building.get_CoordY()
							}, null, null, true);
						}
					},
					getInfo: function () {
						try {
							var lvl, win, city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

							lvl = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard).get_CurrentLevel();
							win = (city.get_CityBuildingsData().GetFullRepairTime(true) - city.get_CityBuildingsData().GetFullRepairTime(false)) * -1;
							this.grid.getLayout().getCellWidget(0, 0).setLabel("("+ lvl +")");
							this.grid.getLayout().getCellWidget(0, 2).setValue(phe.cnc.Util.getTimespanString(city.get_CityBuildingsData().GetFullRepairTime()));
							this.grid.getLayout().getCellWidget(0, 4).setValue("-"+ phe.cnc.Util.getTimespanString(win));

							if (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false) > 0) {
								lvl = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Barracks).get_CurrentLevel();
								win = (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, true) - city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false)) * -1;
								this.grid.getLayout().getCellWidget(1, 0).setLabel("("+ lvl +")");
								this.grid.getLayout().getCellWidget(1, 2).setValue(phe.cnc.Util.getTimespanString(city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false)));
								this.grid.getLayout().getCellWidget(1, 4).setValue("-"+ phe.cnc.Util.getTimespanString(win));
								this.grid.getLayout().setRowHeight(1, 18);
							} else {
								this.grid.getLayout().setRowHeight(1, 0);
							}

							if (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false) > 0) {
								lvl = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Factory).get_CurrentLevel();
								win = (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, true) - city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false)) * -1;
								this.grid.getLayout().getCellWidget(2, 0).setLabel("("+ lvl +")");
								this.grid.getLayout().getCellWidget(2, 2).setValue(phe.cnc.Util.getTimespanString(city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false)));
								this.grid.getLayout().getCellWidget(2, 4).setValue("-"+ phe.cnc.Util.getTimespanString(win));
								this.grid.getLayout().setRowHeight(2, 18);
							} else {
								this.grid.getLayout().setRowHeight(2, 0);
							}

							if (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false) > 0) {
								lvl = city.get_CityBuildingsData().GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Airport).get_CurrentLevel();
								win = (city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, true) - city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false)) * -1;
								this.grid.getLayout().getCellWidget(3, 0).setLabel("("+ lvl +")");
								this.grid.getLayout().getCellWidget(3, 2).setValue(phe.cnc.Util.getTimespanString(city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false)));
								this.grid.getLayout().getCellWidget(3, 4).setValue("-"+ phe.cnc.Util.getTimespanString(win));
								this.grid.getLayout().setRowHeight(3, 18);
							} else {
								this.grid.getLayout().setRowHeight(3, 0);
							}

							if (this.canUpgradeBuilding(ClientLib.Base.ETechName.Construction_Yard)) this.btnBuildings.setEnabled(true);
							else this.btnBuildings.setEnabled(false);
							if (this.canUpgradeBuilding(ClientLib.Base.ETechName.Barracks)) this.btnInfantry.setEnabled(true);
							else this.btnInfantry.setEnabled(false);
							if (this.canUpgradeBuilding(ClientLib.Base.ETechName.Factory)) this.btnVehicle.setEnabled(true);
							else this.btnVehicle.setEnabled(false);
							if (this.canUpgradeBuilding(ClientLib.Base.ETechName.Airport)) this.btnAircraft.setEnabled(true);
							else this.btnAircraft.setEnabled(false);
						} catch (e) {
							console.log("Error in Upgrade.Repairtime.getInfo: ");
							console.log(e.toString());
						}
					}
				}
			});

		}
		function translation() {
			var localeManager = qx.locale.Manager.getInstance();

			// Default language is english (en)
			// Available Languages are: ar,ce,cs,da,de,en,es,fi,fr,hu,id,it,nb,nl,pl,pt,ro,ru,sk,sv,ta,tr,uk
			// You can send me translations so I can include them in the Script.

			// German
			localeManager.addTranslation("de", {
				"Selected building": "Markiertes Gebäude",
				"All buildings": "Alle Gebäude",
				"Selected defense unit": "Markierte Abwehrstellung",
				"All defense units": "Alle Abwehrstellungen",
				"Selected army unit": "Markierte Armee-Einheit",
				"All army units": "Alle Armee-Einheiten"
			});

			// Hungarian
			localeManager.addTranslation("hu", {
				"Selected building": "Kiválasztott létesítmény",
				"All buildings": "Összes létesítmény",
				"Selected defense unit": "Kiválasztott védelmi egység",
				"All defense units": "Minden védelmi egység",
				"Selected army unit": "Kiválasztott katonai egység",
				"All army units": "Minden katonai egység"
			});

			// Russian
			localeManager.addTranslation("ru", {
				"Selected building": "Вывбранное здание",
				"All buildings": "Все здания",
				"Selected defense unit": "Выбранный оборонный юнит",
				"All defense units": "Все оборонные юниты",
				"Selected army unit": "Выделенный юнит атаки",
				"All army units": "Все юниты атаки"
			});
		}
		function waitForGame() {
			try {
				if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') {
					var app = qx.core.Init.getApplication();
					if (app.initDone === true) {
						try {
							console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loading");
							translation();
							createClasses();
							Upgrade.getInstance();
							console.log("WarChiefs - Tiberium Alliances Upgrade Base/Defense/Army: Loaded");
						} catch (e) {
							console.log(e);
						}
					} else {
						window.setTimeout(waitForGame, 1000);
					}
				} else {
					window.setTimeout(waitForGame, 1000);
				}
			} catch (e) {
				console.log(e);
			}
		}
		window.setTimeout(waitForGame, 1000);
	};

	var script = document.createElement("script");
	var txt = injectFunction.toString();
	script.innerHTML = "(" + txt + ")();";
	script.type = "text/javascript";

	document.getElementsByTagName("head")[0].appendChild(script);
})();

// ==UserScript==
// @name          CnC: MHTools Tiberium Alliances Available Loot Summary + Info
// @namespace     MHTools.Loot
// @description   CROSS SERVERS Loot & troops & bases & distance info.
// @author        MrHIDEn based on Yaeger & Panavia code. Totaly recoded.
// @grant         none
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version       1.8.3
// ==/UserScript==

 

(function () {
  var MHLootMain = function () {    
    function MHToolsLootCreate() {        
      //console.log('MHToolsLootCreate');
      // Classes
      //=======================================================      
      //Extending webfrontend.gui.options.OptionsPage with new ManagementOptionsPage
      function OptionsPage() {
        try {
          qx.Class.define("MHTools.OptionsPage", {
            type: 'singleton',
            extend: webfrontend.gui.options.OptionsPage,
            construct: function() {
              console.log('Create MHTools.OptionsPage at Loot+Info');
              this.base(arguments);
              this.setLabel('MHTools');
              
              this.extendOptionsWindow();
              
              //Add Content
              var container = this.getContentContainer(); 
              this.tabView = new qx.ui.tabview.TabView();
              container.add(this.tabView);//, {left:40, top:40});
              
              this.removeButtons();
              this.addPageAbout();
              console.log('MHTools: OptionsPage loaded.'); 
            },
            statics: {
              VERSION: '1.0.0',
              AUTHOR: 'MrHIDEn',
              CLASS: 'OptionsPage'
            },
            members: {
              pageCreated: null,
              tabView: null,
              getTabView: function() {
                return this.tabView;
              },
              addPage: function(name) {
                var c = this.tabView.getChildren();
                this.tabView.remove(c[c.length-1]);//remove PageAbout
                var page = new qx.ui.tabview.Page(name);
                page.set({height:220});
                this.tabView.add(page);
                this.addPageAbout();
                return page;
              },
              addPageAbout: function() {
                var page = new qx.ui.tabview.Page("About");
                page.set({height:220});
                this.tabView.add(page);
                page.setLayout(new qx.ui.layout.VBox());
                page.add(new qx.ui.basic.Label("<b>MHTools</b>").set({rich: true}));//, textColor: red
                page.add(new qx.ui.basic.Label("Created: <span style='color:blue'>2012</span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Author: <span style='color:blue'><b>MrHIDEn</b></span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Email: <a href='mailto:mrhiden@outlook.com'>mrhiden@outlook.com</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Public: <a href='https://userscripts.org/users/471241'>userscripts.org - MrHIDEn</a></br> ").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Scripts:</b>").set({rich: true,marginTop:5}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137978'>Aviable Loot +Info</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/135806'>Shortcuts +Coords</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Shorten Scripts:</b>").set({rich: true,marginTop:5}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/136743'>Coords 500:500</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/145657'>Pure Loot summary</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137955'>Login x9 + Logout</a>").set({rich: true,marginLeft:10}));
              },
              removeButtons: function() {
                this.getChildren()[2].removeAll();
              },
              getContentContainer: function() {
                  if(!this.contentCnt) {
                      this.contentCnt = this.getChildren()[0].getChildren()[0];
                  }
                  return this.contentCnt;
              },
              extendOptionsWindow: function() {
                var self = this;
                if(!webfrontend.gui.options.OptionsWidget.prototype.baseShow) {
                  webfrontend.gui.options.OptionsWidget.prototype.baseShow = webfrontend.gui.options.OptionsWidget.prototype.show;
                }
                webfrontend.gui.options.OptionsWidget.prototype.show = function() {
                  try {
                    var tabView = this.clientArea.getChildren()[0];
                    tabView.add(self);
                    webfrontend.gui.options.OptionsWidget.prototype.show = webfrontend.gui.options.OptionsWidget.prototype.baseShow;
                    self.pageCreated = true;
                    this.show();
                  } catch (e) {            
                    console.warn("MHTools.OptionsPage.extendOptionsWindow: ", e);
                  }
                };
              }
            }
          });
        } catch (e) {
          console.warn("qx.Class.define(MHTools.OptionsPage: ", e);      
        }
      }
      //=======================================================  
      try {
        qx.Class.define("MHTools.Loot", {
          type: 'singleton',
          extend: qx.core.Object,
          construct: function() {         
            console.log('Create MHTools.Loot');
            this.stats.src = 'http://goo.gl/m9I3B';//1.8.0
            //this.base(arguments);
            for(var k in this.resPaths) {
              this.resImages.push(new qx.ui.basic.Image("webfrontend/ui/common/"+this.resPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            for(var k in this.troopPaths) {
              this.troopImages.push(new qx.ui.basic.Image("https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/"+this.troopPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            //this.reloadList();
            this.lootList.reloadList();
            //console.log(this.lootList);
            // extend
            this.extendOwnBase();   
            this.extendAllianceBase();
            this.extendForgottenCamp();
            this.extendForgottenBase();
            this.extendPlayerBase();
            //this.extendOptionsWindow();
            this.extendPOI();
            this.extendHUB();
            this.extendHUBServer();
            this.extendRUIN();
            this.extendSelectionChange();
            this.addLootPage();
            //bypass
            this.loadBypass();
            //rdy
            console.log('MHTools: Loot+Info loaded.'); 
          },
          statics : {
            VERSION: '1.8.3',
            AUTHOR: 'MrHIDEn',
            CLASS: 'Loot',
            DATA: this.Data
          },
          properties: {
          },
          members : {
            // setttings
            settings: {
              showLoot:                {v:true,  d:true,  l:'Shows Loot resources info'},
              showTroops:              {v:false, d:false, l:'Shows overall Hitpoints for Troops'},
              showTroopsExtra:         {v:false, d:false, l:'Shows Troops Hitpoints for Vehicles/Aircrafts/Infantry'},
              showInfo:                {v:true,  d:true,  l:'Shows HP/HC/DF/CY info'},
              showColumnCondition:     {v:false, d:false, l:'Shows your progress against DF/CY'},
              showRepairTime:          {v:true,  d:true,  l:'Shows Repair Times info for Enemy Base/Camp/Outpost'},
              showAllyRepairTimeInfo:  {v:true,  d:true,  l:'Shows Ally/Your Repair Times info'},
              showLevels:              {v:true,  d:true,  l:'Shows Levels of Base/Defence/Offence info'},
              showColumnLetter:        {v:false, d:false, l:'Shows columns letters for DF/CY position Ex A-1 or E-4. If \'false\' shows only 1 or 4'},
              showDistance:            {v:true,  d:true,  l:'Shows distance from selected base to the selected object'}
            },
            // pictures
            stats: document.createElement('img'),
            resPaths: [
              "icn_res_research_mission.png",
              "icn_res_tiberium.png",
              "icn_res_chrystal.png",
              "icn_res_dollar.png"
            ],
            resImages: [],
            troopPaths: [
              "d8d4e71d9de051135a7f5baf1f799d77.png",//inf
              "af8d7527e441e1721ee8953d73287e9e.png",//veh
              "5f889719f06aad76f06d51863f8eb524.png",//stu
              "6962b667bd797fc2e9e74267e1b3e7c3.png" //air
            ],
            troopImages: [],
            
            // store v2 - compact
            //UNDERCONSTRUCTION
            lootList: {
              list: {
                l: [],
                max: 50,//na
                idx: 0,//na
              },
              storeName: 'MHToolsLootList2',
              getIndex: function() {//in use
                var res = -1;
                try {
                  var l = this.list.l;
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  for(i=0;i<this.list.max;i++) {
                    if(typeof(l[i])=='undefined') continue;
                    if(l[i]===null) continue;
                    if(l[i].id == id) {
                      res = i;
                      break;
                    }
                  }
                } catch (e) {
                  console.warn("save: ", e);
                }
                return res;
              },
              reloadList: function() {//in use
                var S = ClientLib.Base.LocalStorage;
                var l;
                if (S.get_IsSupported()) l = S.GetItem(this.storeName);
                if(l!==null) this.list = l;
                console.log('MHTools: LootList reloaded/created');
              },
              save: function(d) {//in use
                try {
                  var l = this.list.l;
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  var c = {id:id, Data:d};
                  var S = ClientLib.Base.LocalStorage;
                  for(var i=0;i<this.list.max;i++) {
                    if(typeof(l[i])=='undefined') continue;
                    if(l[i]===null) continue;
                    if(l[i].id == id) 
                    {
                      // found
                      l[i] = c;
                      // JSON
                      if (S.get_IsSupported()) S.SetItem(this.storeName, this.list);
                      // done
                      return;
                    }
                  }
                  // new
                  l[this.list.idx] = c;
                  if(++this.list.idx >= this.list.max) this.list.idx = 0;
                  // JSON
                  if (S.get_IsSupported()) S.SetItem(this.storeName, this.list);   
                } catch (e) {
                  console.warn("save: ", e);
                }
              },
              load: function() {//in use
                try {
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  var i = this.getIndex();
                  if(i>=0) return this.list.l[i];
                  return {id:id,Data:{}};     
                } catch (e) {
                  console.warn("load: ", e);
                }
              },
              store: function(k, d) {//in use
                try {
                  var mem = this.load().Data;
                  mem[k] = d;
                  this.save(mem);        
                } catch (e) {
                  console.warn("store: ", e);
                }
              },
              restore: function(k) {//?? not in use
                console.log('this.lootList.restore');
                try {
                  var mem = this.load().Data;
                  if(typeof(mem[k])=='undefined') return 'undefined';
                  return mem[k];    
                } catch (e) {
                  console.warn("restore: ", e);
                }
              }              
            },
            // store   
            /*         
            // list: [],
            // listStoreName: 'MHToolsLootList',
            // reloadList: function() {
              // var S = ClientLib.Base.LocalStorage;
              // var l;
              // if (S.get_IsSupported()) l = S.GetItem(this.listStoreName);
              // if(l!==null) this.list = l;
              // this.list.max = 50;
              // this.list.idx = 0;
              // for(var i=0;i<this.list.max;i++) {
                // this.list.idx = i;
                // if(typeof(this.list[i])=='undefined') break;
              // }
              // console.log('MHTools: LootList reloaded/created');
            // },
            // getIndex: function() {
              // var l = this.list;
              // var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
              // //console.log('getIndex id=',id);
              // for(i=0;i<this.list.max;i++) {
                // if(typeof(l[i])=='undefined') continue;
                // if(l[i]===null) continue;
                // if(l[i].id == id) return i;
              // }
              // return -1;
            // },
            // save: function(d) {
            // //TODO some problems with refreshing
              // try {
                // var l = this.list;
                // var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                // var c = {id:id, Data:d};
                // var S = ClientLib.Base.LocalStorage;
                // for(var i=0;i<l.max;i++) {
                  // if(typeof(l[i])=='undefined') continue;
                  // if(l[i]===null) continue;
                  // if(l[i].id == id) 
                  // {
                    // // found
                    // l[i] = c;
                    // // JSON
                    // if (S.get_IsSupported()) S.SetItem(this.listStoreName, l);
                    // // done
                    // return;
                  // }
                // }
                // // new
                // l[l.idx] = c;
                // if(++l.idx >= l.max) l.idx = 0;
                // // JSON
                // if (S.get_IsSupported()) S.SetItem(this.listStoreName, l);   
              // } catch (e) {
                // console.warn("save: ", e);
              // }
            // },
            // load: function() {
              // try {
                // var l = this.list;
                // var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                // for(var i=0;i<l.max;i++) {
                  // if(typeof(l[i])=='undefined') continue;
                  // if(l[i]===null) continue;
                  // if(l[i].id == id) return l[i];
                // }
                // return {id:id,Data:{}};     
              // } catch (e) {
                // console.warn("load: ", e);
              // }
            // },
            // store: function(k, d) {
              // try {
                // var mem = this.load().Data;
                // mem[k] = d;
                // this.save(mem);        
              // } catch (e) {
                // console.warn("store: ", e);
              // }
            // },
            // restore: function(k) {//?? not in use
              // try {
                // var mem = this.load().Data;
                // if(typeof(mem[k])=='undefined') return 'undefined';
                // return mem[k];    
              // } catch (e) {
                // console.warn("restore: ", e);
              // }
            // },
            */
            // bases
            Data: {},
            // display containers
            lootWindowPlayer: null,
            lootWindowBase: null,
            lootWindowCamp: null,
            lootWindowOwn: null,
            lootWindowAlly: null,
            lootWindowPOI: null,
            lootWindowRUIN: null,
            lootWindowHUBServer: null,
            //waiting: [1,'','.','..','...','...?'],          
            waiting: [1,'>-','->','--','-<','<-','??'],          
            Display: {
              troopsArray: [],
              lootArray: [],
              iconArrays: [],
              infoArrays: [],
              twoLineInfoArrays: [],
              distanceArray: []
            },
            // HELPERS
            kMG: function(v) {
              var t = [ '', 'k', 'M', 'G', 'T', 'P' ];
              var i = 0;
              while (v > 1000 && i < t.length) {
                v = (v / 1000).toFixed(1);
                i++;
              }
              return v.toString().replace('.',',') + t[i];
            },
            numberFormat: function(val,fixed) {
              return val.toFixed(fixed).replace('.',',');
            },
            hms: function(s) {
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            dhms: function(s) {
              var d = Math.floor(s/86400); s%=86400;
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (d<1?"":d.toString() + ":");
              r += (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            dhms2: function(s) {
              var d = Math.floor(s/86400); s%=86400;
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (d<1?"":d.toString() + "d ");//  3:01:23:45
              r += (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString()) + "";
              return r;
            },
            hmsRT: function(city, type) {
              var nextLevelFlag = false;
              var s = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(type, nextLevelFlag);
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            // BYPASS
            getBypass: function(c,d) {
              try {
                function getKeys(obj, d) {
                  for (var k in obj) {
                    var o = obj[k];
                    if (o === null) continue;
                    if (typeof(o.c) == 'undefined') continue;//count
                    if (o.c === 0) continue;//empty
                    if (typeof(o.d) == 'undefined') continue;//data {}
                    var ks = Object.keys(o.d);
                    if (ks.length != o.c) continue;
                    var u = o.d[ks[0]];
                    if(typeof(u) != 'object') continue;                  
                    if(typeof(u.get_UnitLevelRepairRequirements) != 'function') continue;
                    if(typeof(u.GetUnitGroupType) ==  'undefined') {
                      // buildings
                      d.Keys.Buildings = k;
                      //c.GetNumBuildings.toString()==return this.XUQAIB.YYZSYN().c; //YYZSYN()==return this.GBZDQJ; //==this.XUQAIB.GBZDQJ.c
                    } else {
                      // units 3-attack
                      if(u.GetUnitGroupType()) {
                        d.Keys.Offences = k;
                      } else {
                        // units 0-defend
                        d.Keys.Defences = k;
                      }
                    }
                  }
                  if(typeof(d.Keys.Buildings)!='undefined') {
                    //ClientLib.Data.CityBuildings.prototype.kBuildings = d.Keys.Buildings;
                    //ClientLib.Data.CityBuildings.prototype.get_Buildings = function(){return this[this.kBuildings];};
                    ClientLib.Data.City.prototype.kBuildings = d.Keys.Buildings;
                    ClientLib.Data.City.prototype.get_Buildings = function(){return this.get_CityBuildingsData()[this.kBuildings];};
                  }
                  if(typeof(d.Keys.Offences)!='undefined') {
                    //ClientLib.Data.CityUnits.prototype.kOffenseUnits = d.Keys.Offences;
                    //ClientLib.Data.CityUnits.prototype.get_OffenseUnits = function(){return this[this.kOffenseUnits];};
                    ClientLib.Data.City.prototype.kOffenseUnits = d.Keys.Offences;
                    ClientLib.Data.City.prototype.get_OffenseUnits = function(){return this.get_CityUnitsData()[this.kOffenseUnits];};
                  }
                  if(typeof(d.Keys.Defences)!='undefined') {
                    //ClientLib.Data.CityUnits.prototype.kDefenseUnits = d.Keys.Defences;
                    //ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function(){return this[this.kDefenseUnits];};
                    ClientLib.Data.City.prototype.kDefenseUnits = d.Keys.Defences;
                    ClientLib.Data.City.prototype.get_DefenseUnits = function(){return this.get_CityUnitsData()[this.kDefenseUnits];};
                  }
                }
                if(typeof(d.Keys)=='undefined') d.Keys={};
                getKeys(c.get_CityBuildingsData(), d);
                getKeys(c.get_CityUnitsData(), d);
                var cnt=Object.keys(d.Keys).length;
                if(cnt==3) {
                  //console.log('MHTools.Loot Helpers are ready');
                  //console.log('MHTools.Loot Helpers are ready:',d.Keys.Buildings,d.Keys.Defences,d.Keys.Offences);
                  console.log('MHTools.Loot Helpers are ready:');
                  console.log(d.Keys);
                  delete d.Keys;
                  this.getBypass = function(){return true;};
                  return true;
                }
                else console.log('#Keys(!=3): ',cnt);
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }
              //return d.Bypass.Rdy;
              return false;
            },
            loadBypass: function(self) {
              try {                
                if(typeof(self)=='undefined') self = this;
                var ac=ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                if(Object.keys(ac).length<1) {
                  window.setTimeout(self.loadBypass, 5000, self); // check again
                  return;
                }
                for(k in ac) if(self.getBypass(ac[k],self.Data)) break;
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }
            },
            getData: function(city) {
              try {   
                var l = {};  
                if(!this.getBypass(city,this.Data)) return l;
                
                l.Buildings = city.get_Buildings();
                l.Defences = city.get_DefenseUnits();
                l.Offences = city.get_OffenseUnits();
                
                l.rdy = true;              
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }               
              return l;
            },
            loadBase: function() {
                try {
                  if (typeof(this.Data.lastSelectedBaseId)=='undefined') this.Data.lastSelectedBaseId = -1;//, Bypass: {}};
                  
                  var d = this.Data;         
                              
                  d.selectedBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  d.selectedOwnBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                  
                  if (d.lastSelectedBaseId !== d.selectedBaseId) d.loaded = false;
                  d.lastSelectedBaseId = d.selectedBaseId;  
                  
                  d.IsOwnBase = d.selectedBaseId === d.selectedOwnBaseId;
                              
                  d.cc = ClientLib.Data.MainData.GetInstance().get_Cities();
                  
                  //d.ec = d.cc.GetCity(d.selectedBaseId);// this is very nice function
                  d.ec = d.cc.get_CurrentCity();
                  if(d.ec === null) return false;
                  if(d.ec.get_CityBuildingsData() === null) return false;         
                  if(d.ec.get_CityUnitsData() === null) return false;         
                  
                  d.oc = d.cc.get_CurrentOwnCity();            
                  if(d.oc === null) return false;
                  if(d.oc.get_CityBuildingsData() === null) return false;
                  if(d.oc.get_CityUnitsData() === null) return false;
                  
                  d.ol = this.getData(d.oc);
                  d.el = this.getData(d.ec);// Buildings Defence Offence               
                  if(typeof(d.ol)=='undefined') return false;
                  if(typeof(d.el)=='undefined') return false;

                  if(d.el.Buildings.c === 0) return false;
                  if(d.ol.Buildings.c === 0) return false;
                  
                  //TEST
                  //console.log('loadBase.el:',d.el);
                  //console.log('loadBase.ol:',d.ol);
                  
                  d.loaded = true;
                  return true;
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
                console.dir("MHTools.Loot.Data: ",this.Data);
                return false;
              }
            },
            getImportants: function(list) {         
              list.Support = {Condition: '-',Row: '-',Column: '-'};
              list.CY = {Condition: '-',Row: '-',Column: '-'};
              list.DF = {Condition: '-',Row: '-',Column: '-'};
              if(!this.settings.showInfo.v) return;
              for (var j in list.Buildings.d) {
                var building = list.Buildings.d[j];
                var mod = building.get_HitpointsPercent();
                var id = building.get_MdbUnitId();
                if(id >= 200 && id <= 205) {
                  list.Support.Condition = 100*mod;
                  list.Support.Row = 8-parseInt(building.get_CoordY());
                  list.Support.Column = building.get_CoordX();
                } 
                else {
                  switch (id) {
                    case 112: // CONSTRUCTION YARD
                    case 151:
                    case 177:
                      list.CY.Condition = 100*mod;
                      list.CY.Row = 8-parseInt(building.get_CoordY());
                      list.CY.Column = building.get_CoordX();
                      break;
                    case 158: // DEFENSE FACILITY
                    case 131:
                    case 195:
                      list.DF.Condition = 100*mod;
                      list.DF.Row = 8-parseInt(building.get_CoordY());
                      list.DF.Column = building.get_CoordX();
                      break;
                    default:
                      break;
                  }
                }
              }
            },
            getLoots: function (ul,r) { 
              if(typeof(r)=='undefined') r={}; 
              //console.log('r',r);
              var t={1:'T',2:'C',3:'G',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};//translate, ClientLib.Base.EResourceType.XXX
              for (var j in ul.d) {
                var u = ul.d[j];// unit/building
                //here are key infos about units ranges and behavior and more 
                //console.log(u.get_UnitGameData_Obj().n,u.get_UnitGameData_Obj());// unit/building
                var p = u.get_HitpointsPercent();// 0-1 , 1 means 100%               
                var cl = u.get_UnitLevelRepairRequirements();// EA API Resources/Repair Costs                
                for (var i in cl) {
                  var c = cl[i];//Requirement/Cost
                  if(typeof(c)!='object') continue;                
                  var k = (typeof(t[c.Type])=='undefined')?c.Type:t[c.Type];//translate if possible
                  if(typeof(r[k])=='undefined') r[k] = 0;//add branch
                  r[k] += p * c.Count;                 
                }
              }
              return r;
            },
            calcResources: function () {
              try {          
                if (!this.settings.showLoot.v) return;

                if (!this.Data.loaded) return;
                
                this.Display.lootArray = [];            
                
                var el = this.Data.el;
                var ec = this.Data.ec;
                
                var loots = {RP:0, T:0, C:0, G:0};//for getLoots
                
                this.getLoots(el.Buildings,loots);
                this.getLoots(el.Defences,loots);
                
                if(el.Offences.c>0) {
                  var off = this.getLoots(el.Offences);                  
                  //console.log('Offences: ',off);
                }
                
                this.Display.lootArray[0] = loots.RP;
                this.Display.lootArray[1] = loots.T;
                this.Display.lootArray[2] = loots.C;
                this.Display.lootArray[3] = loots.G;
                            
                this.lootList.store('lootArray',this.Display.lootArray);
              } catch (e) {
                console.warn("MHTools.Loot.calcResources: ", e);
                console.dir("MHTools.Loot.~.Data:",this.Data);
              }
            },
            calcTroops: function () {
              try {
                if (!this.settings.showTroops.v) return;            

                if (!this.Data.loaded) return;            
                
                var troops = [0, 0, 0, 0, 0]; 
                
                var el = this.Data.el; 
                  
                // enemy defence units
                for (var j in el.Defences.d) {
                  var unit = el.Defences.d[j];
                  var current_hp = unit.get_Health();//EA API
                  troops[0] += current_hp;
                  if (this.settings.showTroopsExtra.v) {
                    switch (unit.get_UnitGameData_Obj().mt) {//keyTroop // TODO check .mt
                      case ClientLib.Base.EUnitMovementType.Feet:
                        troops[1] += current_hp;
                        break;
                      case ClientLib.Base.EUnitMovementType.Track:
                      case ClientLib.Base.EUnitMovementType.Wheel:
                        troops[2] += current_hp;
                        break;
                      case ClientLib.Base.EUnitMovementType.Structure:
                        troops[3] += current_hp;
                        break;
                      case ClientLib.Base.EUnitMovementType.Air:
                      case ClientLib.Base.EUnitMovementType.Air2:
                        troops[4] += current_hp;
                        break;
                    }
                  }
                }
                this.Display.troopsArray = troops;
                this.lootList.store('troopsArray',this.Display.troopsArray);
              } catch (e) {
                console.warn("MHTools.Loot.calcTroops: ", e);
                console.dir("MHTools.Loot.~.Data:",this.Data);
              }
            },
            calcInfo: function () { 
              this.Display.infoArrays = [];
              this.Display.twoLineInfoArrays = [];
              
              if (!this.Data.loaded) return;
              
              var hp;
              var t;         
              
              //var cc = this.Data.cc;
              var oc = this.Data.oc;
              var ec = this.Data.ec; 
              
              var ol = this.Data.ol;
              var el = this.Data.el; 
              
              if(this.settings.showInfo.v) { 
                try {                   
                  var ohp=0, dhp=0;
                  for (var k in ol.Offences.d) ohp += ol.Offences.d[k].get_Health();//own of units
                  for (var k in el.Defences.d) dhp += el.Defences.d[k].get_Health();//ene df units
                                  
                  // find CY & DF row/line
                  this.getImportants(el);
                  
                  hp = {};
                  hp.name = '<b>Info</b> (HP,HC - D/O ratio. Row.)';
                  hp.lbs = ['HP:','HC:','DF:','CY:'];
                  t = [];
                  t.push(this.numberFormat(dhp/ohp, 2));
                  t.push(this.numberFormat(ec.get_TotalDefenseHeadCount()/oc.get_TotalOffenseHeadCount(), 2));
                  var abc = "ABCDEFGHI";//abc[column]
                  if(this.settings.showColumnLetter.v) {
                    if(el.DF !== undefined) {t.push(abc[el.DF.Column]+ '-' + el.DF.Row);} else { t.push('??');}  
                    if(el.CY !== undefined) {t.push(abc[el.CY.Column]+ '-' + el.CY.Row);} else { t.push('??');}  
                  } else {
                    if(el.DF !== undefined) {t.push(el.DF.Row);} else { t.push('??');}  
                    if(el.CY !== undefined) {t.push(el.CY.Row);} else { t.push('??');}   
                  }                
                  hp.val = t;
                  this.Display.infoArrays.push(hp);
                  // store
                  this.lootList.store('infoArrays',this.Display.infoArrays);                           
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 1: ", e);
                }
              }            
              if(this.settings.showColumnCondition.v) { 
                try {   
                  var bl = el.Buildings.d;
                  var dl = el.Defences.d;
                  
                  for(var k in bl) {
                    var b = bl[k];
                    if(b.get_TechName() == ClientLib.Base.ETechName.Defense_Facility) df = b;
                    if(b.get_TechName() == ClientLib.Base.ETechName.Construction_Yard) cy = b;
                  }

                  var tb;
                  var tbhp;
                  var cnt;
                  var mi;
                  var ma;
                  var dc;
                  
                  // CY
                  tb = cy;
                  cnt = 0;
                  tbhp = 0;
                  dc = 1;
                  mi = tb.get_CoordX() - dc;
                  ma = tb.get_CoordX() + dc;
                  // scan
                  for(var k in bl) {
                    var o = bl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  for(var k in dl) {
                    var o = dl[k];  
                    //if(o.get_CoordX() == tb.get_CoordX()) {
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  tbhp = 100 * tbhp / cnt;
                  var cyhp = tbhp;

                  // DF
                  tb = df;
                  cnt = 0;
                  tbhp = 0;
                  dc = 1;
                  mi = tb.get_CoordX() - dc;
                  ma = tb.get_CoordX() + dc;
                  for(var k in bl) {
                    var o = bl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  for(var k in dl) {
                    var o = dl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  tbhp = 100 * tbhp / cnt;
                  var dfhp = tbhp;               
                  
                  hp = {};
                  hp.name = '<b>CY & DF column HP [%]</b>';
                  hp.lbs = ['CY:','DF:'];
                  t = [];
                  t.push(this.numberFormat(cyhp, 0));
                  t.push(this.numberFormat(dfhp, 0));        
                  hp.val = t;
                  this.Display.infoArrays.push(hp);
                  //this.Display.twoLineInfoArrays.push(hp);
                  // store
                  this.lootList.store('infoArrays',this.Display.infoArrays);                       
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 2: ", e);
                }
              }
              if(this.settings.showRepairTime.v) { 
                try {                 
                  var a = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                  var v = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                  var i = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                  var m = Math.max(a,v,i);
                  
                  var aa = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                  var av = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  var ai = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                  var am = Math.min(aa,av,ai);
                  
                  var ohp=0;
                  //CHECK
                  //my
                  //for (var k in ol.Offences.d) ohp += ol.Offences.d[k].get_HitpointsPercent();//0-1 means 0-100%
                  //ohp = 100.0 * ohp / ol.Offences.c;
                  //console.log('Health',ohp,oc.GetOffenseConditionInPercent());
                  //ohp = this.numberFormat(ohp, 0);
                  //ea
                  ohp = oc.GetOffenseConditionInPercent();
                  
                  var ool = this.numberFormat(oc.get_LvlOffense(), 1);
                  //console.log('oc',oc,'oc.get_LvlOffense()',oc.get_LvlOffense());
                  
                  hp = {};
                  hp.name = '<b>Repair time (Your offence)</b>';
                  hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                  t = [];
                  t.push(this.hms(m)); 
                  t.push(this.hms(am));
                  t.push(ohp);
                  t.push(ool);                 
                  hp.val = t;
                  //this.Display.infoArrays.push(hp);
                  this.Display.twoLineInfoArrays.push(hp);              
                  // store
                  this.lootList.store('twoLineInfoArrays',this.Display.twoLineInfoArrays);                       
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 3: ", e);
                }
              }
            },
            calcFriendlyInfo: function() {
              this.Display.twoLineInfoArrays = [];
              if(!this.settings.showLevels.v && !this.settings.showAllyRepairTimeInfo.v) return;
                          
              try { 
                if (!this.Data.loaded) return;            
                
                
                //var cc = this.Data.cc;
                var oc = this.Data.oc;
                var ec = this.Data.ec;
                
                var ol = this.Data.ol;
                var el = this.Data.el;            
                
                var IsOwn = this.Data.IsOwnBase;
                
                
                
                if(this.settings.showLevels.v) { 
                  var sd = ec.get_SupportData();
                  var sn;
                  var sl;
                  if(sd !== null) {
                    sl = sd.get_Level();
                    sn = ec.get_SupportWeapon().dn; 
                  }
                
                  hp = {};
                  hp.name = '<b>Levels</b>';
                  hp.lbs = ['Base:','Defence:','Offence:','Support:'];
                  t = [];
                  if(el.Buildings.c>0) t.push(this.numberFormat(ec.get_LvlBase(), 1)); else t.push('--');  
                  if(el.Defences.c>0) t.push(this.numberFormat(ec.get_LvlDefense(), 1)); else t.push('--');  
                  if(el.Offences.c>0) t.push(this.numberFormat(ec.get_LvlOffense(), 1)); else t.push('--'); 
                  if(sd !== null) t.push(this.numberFormat(sl, 1)); else t.push('--'); 
                  hp.val = t;
                  this.Display.twoLineInfoArrays.push(hp);
                }
              
                if(this.settings.showAllyRepairTimeInfo.v) {
                  
                  var a = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                  var v = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                  var i = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                  var m = Math.max(a,v,i);
                  
                  var aa = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                  var av = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  var ai = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                  var am = Math.min(aa,av,ai);
                  
                  var ofl;              
                  var ohp=0;
                  if(el.Offences.c>0) {
                    //my
                    //for (var k in el.Offences.d) ohp += el.Offences.d[k].get_HitpointsPercent();//get_Health();//Health - hitpoints
                    //ohp = 100.0 * ohp / el.Offences.c;
                    //console.log('Health',ohp,ec.GetOffenseConditionInPercent());
                    //ohp = this.numberFormat(ohp, 0);
                    //ea
                    ohp = ec.GetOffenseConditionInPercent();
                    //ohp = ec.GetOffenseConditionInPercent();//GetOffenseConditionInPercent ()
                    ofl = this.numberFormat(ec.get_LvlOffense(), 1);
                    //console.log('ec',ec,'ec.get_LvlOffense()',ec.get_LvlOffense());
                  } else {
                    ohp = '---';
                    ofl = '---';
                  }
                  
                  hp = {};
                  hp.name = IsOwn?'<b>Repair time (Your offence)</b>':'<b>Repair time (Ally offence)</b>';
                  hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                  t = [];
                  t.push(this.hms(m)); 
                  //t.push('---');
                  t.push(this.hms(am));
                  t.push(ohp); 
                  t.push(ofl);       
                  hp.val = t;
                  this.Display.twoLineInfoArrays.push(hp);
                } 
                //this.Display.twoLineInfoArrays = twoLineInfoArrays;
                this.lootList.store('twoLineInfoArrays',this.Display.twoLineInfoArrays); 
              } catch (e) {
                console.warn("MHTools.Loot.calcFriendlyInfo: ", e);
              }
            },
            calcDistance: function () {
              this.Display.distanceArray = [];
              
              if(!this.settings.showDistance.v) return;
              //console.log('calcDistance');              
              try {                
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject != null)// && visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType)
                {
                  //if (this.Data === null) this.Data = {};
                  var t = visObject.get_VisObjectType();
                  
                  var LObjectType = [];
                  for(k in ClientLib.Vis.VisObject.EObjectType) 
                    LObjectType[ClientLib.Vis.VisObject.EObjectType[k]] = k;
                  //console.log('Vis Object Type:',t,', ',LObjectType[t]);                  

                  var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                  switch (t) {    
                    /* RegionCityType
                    RegionSuperWeaponType
                    RegionTerrainType
                    RegionMoveTarget
                    RegionFreeSlotType
                    RegionNPCBase
                    RegionNPCCamp
                    RegionPointOfInterest
                    RegionRuin
                    RegionGhostCity
                    RegionNewPlayerSpot
                    RegionHub  */               
                    case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    case ClientLib.Vis.VisObject.EObjectType.RegionRuin:  
                      //var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                      //var pixelX = visObject.get_X();
                      //var pixelY = visObject.get_Y();
                      var ser = ClientLib.Data.MainData.GetInstance().get_Server();
                      var ecX = visObject.get_RawX();
                      var ecY = visObject.get_RawY();
                      var ocX = oc.get_X();
                      var ocY = oc.get_Y();          
                      var cenX = ser.get_ContinentWidth() / 2;
                      var cenY = ser.get_ContinentHeight() / 2;                      

                      var dis = ClientLib.Base.Util.CalculateDistance(ocX, ocY, ecX, ecY);
                      var cen = ClientLib.Base.Util.CalculateDistance(cenX, cenY, ecX, ecY);
                      var cdt = oc.GetCityMoveCooldownTime(ecX,ecY);//cool down time
                      var stp = dis / 20;//steps
                      this.Data.Distance = dis;
                      //console.log('Distance:',dis,'EMT:',this.dhms2(cdt),'Steps:',stp);
                      hp = {};
                      hp.name = '<b>Movement</b>';
                      hp.lbs = ['Distance:','EMT:','Steps:','To center:'];
                      t = [];
                      t.push(dis);
                      t.push(this.dhms2(cdt));
                      t.push(stp);       
                      t.push(cen);       
                      hp.val = t;
                      this.Display.distanceArray.push(hp);
//NOTE
//ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition
//ClientLib.Data.WorldSector.WorldObject GetObjectFromPosition (System.Int32 x ,System.Int32 y)
//ClientLib.Vis.City.CityObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.Region.RegionObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.VisObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Data.Hub GetObjectFromPosition (System.Int32 x ,System.Int32 y)
                      break;
                    default:
                      break;
                  } 
                }
                //DISABLED this.lootList.store('distanceArray',this.Display.distanceArray);               
              } catch (e) {
                console.warn("MHTools.Loot.calcDistance: ", e);
              }
            },
            onSelectionChange: function(last,curr) {
              //return;
              try {
                //
                //TODO I rather move this to calcDistance and call it from extended widgets.
                //
                
                //ClientLib.Vis.SelectionChange
                //console.clear();
                //console.log('onSelectionChange, curr:',curr);
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject != null) {
                  var t = visObject.get_VisObjectType();
                  //ClientLib.Vis.VisObject.EObjectType
                  var LObjectType = [];
                  for(k in ClientLib.Vis.VisObject.EObjectType) 
                    LObjectType[ClientLib.Vis.VisObject.EObjectType[k]] = k;
                  console.log('Vis Object Type:',t,', ',LObjectType[t]);
                  //window.MHTools.visObject = visObject;
                  this.Data.visObject = visObject;
                  /* NOTE             
                  UnknownType
                  CityBuildingType
                  CityResourceFieldType
                  CityWallType
                  RegionCityType
                  RegionSuperWeaponType
                  RegionTerrainType
                  BattlegroundUnit
                  ArmyUnitType
                  ArmyDismissArea
                  DefenseUnitType
                  DefenseTerrainFieldType
                  RegionMoveTarget
                  RegionFreeSlotType
                  RegionNPCBase
                  RegionNPCCamp
                  RegionPointOfInterest
                  RegionRuin
                  RegionGhostCity
                  RegionNewPlayerSpot
                  DefenseTerrainFieldAdditionalSlosType
                  DefenseOffScreenUnit
                  WorldObject
                  WorldMapMarker
                  RegionHub
                   */
                  switch (t) {  
                    /* NOTE
                    RegionCityType
                    RegionSuperWeaponType
                    RegionTerrainType
                    RegionMoveTarget
                    RegionFreeSlotType
                    RegionNPCBase
                    RegionNPCCamp
                    RegionPointOfInterest
                    RegionRuin
                    RegionGhostCity
                    RegionNewPlayerSpot
                    RegionHub  */               
                    // case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
                      // this.calcDistance();
                      // break;
                    // TEST
                    case ClientLib.Vis.VisObject.EObjectType.RegionHub:
                      //console.log('Vis Object Type:',t,', ',LObjectType[t],visObject);
                      //console.log(visObject.get_BuildingName());
                      //window.visObject = visObject;                    
                      break;                      
                    // // TEST
                    // case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                      // console.log('Vis Object Type:',t,', ',LObjectType[t],visObject);
                      // console.log(visObject.get_BuildingName());
                      // window.visObject = visObject;                    
                      // break;
                    // // TEST
                    // case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                      // console.log('Vis Object Type:',t,', ',LObjectType[t],visObject);
                      // console.log(visObject.get_BuildingName());
                      // window.visObject = visObject;
                      // break;
                    default:
                      break;
                  }
                }
              } catch (e) {
                console.warn('MHTools.Loot.onSelectionChange: ', e);
              }
            },
            extendSelectionChange: function() {
              return;//disabled
              //webfrontend.Util.attachNetEvent(/*instance of object which calls the event*/, /*name of the event*/, /*type of the event*/, /*context object*/, /*callback function*/);
              webfrontend.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
            },
            restoreDisplay: function() {
              //var idx = this.getIndex();  
              var idx = this.lootList.getIndex();  
              if(idx > -1) { 
                var d = this.lootList.list.l[idx].Data;            
                var da = this.Display.distanceArray;
                this.Display={};
                for(var k in d) this.Display[k] = d[k];
                this.Display.distanceArray = da;
                return true;
              }
              return false;
            },
            // DISPLAY data
            addLoadingLabel: function(widget) {
              //console.log('addLoadingLabel');
              try {
                widget.removeAll();
                var r=0, c=0;
                var a;
                      
                // DISTANCE
                //console.log('DISTANCE');
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 230, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // AWAITING
                //console.log('AWAITING');
                // a = this.Data.Distance;
                // if(typeof(a)!='undefined' && a<=10) {
                  c=0;
                  var w = this.waiting[this.waiting[0]];
                  if(++this.waiting[0] >= this.waiting.length) this.waiting[0]=1;
                  //if (this.settings.showLoot.v) widget.add(new qx.ui.basic.Label('<b>Lootable Resources</b>').set({width: 230, rich: true, allowGrowX: true}), {row: r++,column: c, colSpan: 6});
                  widget.add(new qx.ui.basic.Label('Transmission ' + w).set({rich: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true, colSpan: 6
                // } else {
                  // c=0;
                  // widget.add(new qx.ui.basic.Label('<span style="color:yellow">Base is out of range.</span>').set({width: 230, rich: true, allowGrowX: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true
                // } 
              } catch (e) {
                console.warn('MHTools.Loot.addLoadingLabel: ', e);
              }
            }, 
            addResourcesLabel: function(widget) {
              //console.log('addResourcesLabel');
              try {
                widget.removeAll();
                var r=0, c=0;                
                var hp;
                var a;                
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // LOOT
                if (this.settings.showLoot.v) {
                  a = this.Display.lootArray;
                  if(typeof(a)!='undefined' && a.length>0) {
                    hp = {};
                    hp.name = '<b>Lootable Resources</b>';
                    hp.img = this.resImages;
                    t = [];  
                    t.push(this.Display.lootArray[0]);//Research 6  
                    t.push(this.Display.lootArray[1]);//Tiberium 1
                    t.push(this.Display.lootArray[2]);//Crystal 2
                    t.push(this.Display.lootArray[3]);//Credits 3           
                    hp.val = t;
                    //iconArrays.push(hp);  //store !!
                    
                    // draw icon's info              
                    c=0;
                    widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    //console.log('A) i',i);   
                    for(var j in hp.val) {
                      //console.log('B) i',i,'j',j);
                      widget.add(hp.img[j], {row: r, column: c++}); 
                      widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // TROOP
                if (this.settings.showTroops.v) { //to do  
                  a = this.Display.troopsArray;
                  if(typeof(a)!='undefined' && a.length>0) {   
                    hp = {};
                    hp.name = '<b>Troop Strength</b>';
                    hp.img = this.troopImages;
                    t = [];
                    t.push(this.Display.troopsArray[0]);
                    if (this.settings.showTroopsExtra.v) {
                      t.push(this.Display.troopsArray[1]);//inf
                      t.push(this.Display.troopsArray[2]);//veh
                      t.push(this.Display.troopsArray[3]);//stu
                      //t.push(this.Display.troopsArray[4]);//air
                    }              
                    hp.val = t;
                    // draw icon's info                            
                    c=0;
                    widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});  
                    widget.add(new qx.ui.basic.Label(this.kMG(hp.val[0])).set({textAlign:'left'}), {row: r, column: c++});  
                    //console.log('A) i',i);
                    c=2;
                    for(var j=1;j<hp.val.length;j++) {
                      //console.log('B) i',i,'j',j);
                      widget.add(hp.img[j-1], {row: r,column: c++}); 
                      widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // INFO
                a = this.Display.infoArrays;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.infoArrays) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.infoArrays[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].lbs[j]+' '+this.Display.infoArrays[i].val[j]), {row: r, column: c});
                      c+=2;
                    }
                    r++;
                  }
                } 
                
                // 2 lines INFO
                a = this.Display.twoLineInfoArrays;
                if(typeof(a)!='undefined' && a.length>0) {       
                  for(var i in this.Display.twoLineInfoArrays) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }
                
              } catch (e) {
                console.warn('MHTools.Loot.addResourcesLabel(): ', e);
              }
            },       
            addFriendlyLabel: function(widget) {
              //console.log('addFriendlyLabel');
              try {              
                widget.removeAll();
                var a;
                var r=0, c=0;
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) {    
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // 2 lines INFO
                a = this.Display.twoLineInfoArrays;
                if(typeof(a)!='undefined' && a.length>0) {  
                  c=0;
                  for(var i in this.Display.twoLineInfoArrays) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }

              } catch (e) {
                console.warn('MHTools.Loot.addFriendlyLabel: ', e);
              }
            },
            // EXTEND UI
            /* NOTE
            RegionCityMenu
            RegionCityFoundInfo
            RegionGhostStatusInfo
            RegionCityStatusInfo
            RegionNPCBaseStatusInfo
            RegionHubStatusInfo
            RegionPointOfInterestStatusInfo
            RegionCityStatusInfoEnemy
            RegionCityList
            RegionCityInfo
            RegionNewPlayerSpotStatusInfo
            RegionRuinStatusInfo
            RegionCityStatusInfoOwn
            RegionCitySupportInfo
            RegionCityStatusInfoAlliance
            RegionCityMoveInfo
            RegionNPCCampStatusInfo
            */            
            extendOwnBase: function() {// BASE - Own
              var self = this;
              if (!webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.__mhloot_showLootOwnBase) {
                webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.__mhloot_showLootOwnBase = webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.onCitiesChange = function () {
                try {            
                  if (!self.lootWindowOwn) {
                    self.lootWindowOwn = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowOwn.setTextColor('yellow');//yellow white            

                    var w = webfrontend.gui.region.RegionCityStatusInfoOwn.getInstance();              
                    w.add(self.lootWindowOwn);
                  }
                  //clear                  
                  self.Display.distanceArray = [];
                  if(self.loadBase()) {           
                    self.calcFriendlyInfo();
                    self.addFriendlyLabel(self.lootWindowOwn);
                  } else {
                    self.addLoadingLabel(self.lootWindowOwn);
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionCityStatusInfoOwn: ", e);
                }              
                this.__mhloot_showLootOwnBase();// run base function
              }
            },
            extendAllianceBase: function() {// BASE - Alliance
              var self = this;
              if (!webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.__mhloot_showLootAllianceBase) {
                webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.__mhloot_showLootAllianceBase = webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.onCitiesChange;
              }// ^inject
              webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.onCitiesChange = function () {
                //console.log('RegionCityStatusInfoAlliance:');
                try {  
        //todo wrap in function        
                  if (!self.lootWindowAlly) {
                    self.lootWindowAlly = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowAlly.setTextColor('yellow');//yellow             

                    var w = webfrontend.gui.region.RegionCityStatusInfoAlliance.getInstance();              
                    w.add(self.lootWindowAlly);
                  }           
                  self.calcDistance();
                  if(self.loadBase()) {           
                    self.calcFriendlyInfo();
                    self.calcDistance();
                    self.addFriendlyLabel(self.lootWindowAlly);
                  } else {
                    self.addLoadingLabel(self.lootWindowAlly);
                  }
                } catch (e) {
                  console.warn("MHTools.Loot.RegionCityStatusInfoAlliance: ", e);
                }              
                this.__mhloot_showLootAllianceBase();
              }  
            },
            extendForgottenCamp: function() {// CAMP - Forgotten
              var self = this;          
              if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__mhloot_showLootNPCCamp) {
                webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__mhloot_showLootNPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionNPCCampStatusInfo:');
                try {
                  if (!self.lootWindowCamp) {
//TODO does it have , allowGrowX: true property?
                    self.lootWindowCamp = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowCamp.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance();
                    widget.add(self.lootWindowCamp);
                  }                 
                  self.calcDistance();
                  if (self.loadBase()) {
                    self.calcResources();
                    self.calcTroops();
                    self.calcInfo();
                    self.addResourcesLabel(self.lootWindowCamp);
                  } else {          
                    if(self.restoreDisplay()) {
                      self.addResourcesLabel(self.lootWindowCamp);
                    } else {        
                      self.addLoadingLabel(self.lootWindowCamp);
                    }
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionNPCCampStatusInfo: ", e);
                }
                this.__mhloot_showLootNPCCamp();
              }
            },
            extendForgottenBase: function() {// BASE - Forgotten
              var self = this;  
              if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__mhloot_showLootNPCBase) {
                webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__mhloot_showLootNPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionNPCBaseStatusInfo:');
                try {
                  if (!self.lootWindowBase) {
                    self.lootWindowBase = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowBase.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance();
                    widget.add(self.lootWindowBase);
                  }      
                  self.calcDistance();
                  if (self.loadBase()) {
                    self.calcResources();
                    self.calcTroops();
                    self.calcInfo();
                    self.addResourcesLabel(self.lootWindowBase);
                  } else {           
                    if(self.restoreDisplay()) {
                      self.addResourcesLabel(self.lootWindowBase);
                    } else {           
                      self.addLoadingLabel(self.lootWindowBase);
                    }
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionNPCBaseStatusInfo: ", e);
                }
                this.__mhloot_showLootNPCBase();
              }
            },            
            extendPlayerBase: function() {// BASE - PvP
              var self = this; 
              if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__mhloot_showLootPlayerBase) {
                webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__mhloot_showLootPlayerBase = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function () {
                //console.log('RegionCityStatusInfoEnemy:');
                try {
                  if (!self.lootWindowPlayer) {
                    self.lootWindowPlayer = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowPlayer.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance();
                    widget.add(self.lootWindowPlayer);
                  }
                  self.calcDistance();
                  if (self.loadBase()) {  
                    self.calcResources();
                    self.calcTroops();
                    self.calcInfo(); 
                    self.addResourcesLabel(self.lootWindowPlayer);
                  } else {           
                    if(self.restoreDisplay()) {
                      self.addResourcesLabel(self.lootWindowPlayer);
                    } else {          
                      self.addLoadingLabel(self.lootWindowPlayer);
                    }      
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionCityStatusInfoEnemy: ", e);
                }

                this.__mhloot_showLootPlayerBase();
              }
            },            
            extendPOI: function() {// POI
              var self = this; 
              if (!webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.__mhloot_showLootPOI) {
                webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.__mhloot_showLootPOI = webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionPointOfInterestStatusInfo:');
                try {
                  if (!self.lootWindowPOI) {
                    self.lootWindowPOI = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowPOI.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionPointOfInterestStatusInfo.getInstance();
                    widget.add(self.lootWindowPOI);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowPOI);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionPointOfInterestStatusInfo: ", e);
                }
                this.__mhloot_showLootPOI();
              }
            },
            extendHUB: function() {// HUB
              var self = this; 
              if (!webfrontend.gui.region.RegionHubStatusInfo.prototype.__mhloot_showLootHUB) {
                webfrontend.gui.region.RegionHubStatusInfo.prototype.__mhloot_showLootHUB = webfrontend.gui.region.RegionHubStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionHubStatusInfo.prototype.onCitiesChange = function () {
                console.log('RegionHubStatusInfo:');
                try {
                  if (!self.lootWindowHUB) {
                    self.lootWindowHUB = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowHUB.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionHubStatusInfo.getInstance();
                    widget.add(self.lootWindowHUB);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowHUB);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionHubStatusInfo: ", e);
                }
                this.__mhloot_showLootHUB();
              }
            },
            extendHUBServer: function() {
              var self = this; 
              if (!webfrontend.gui.region.RegionHubServerStatusInfo.prototype.__mhloot_showLootHUB) {
                webfrontend.gui.region.RegionHubServerStatusInfo.prototype.__mhloot_showLootHUB = webfrontend.gui.region.RegionHubServerStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionHubServerStatusInfo.prototype.onCitiesChange = function () {
                console.log('RegionHubServerStatusInfo:');
                try {
                  if (!self.lootWindowHUBServer) {
                    self.lootWindowHUBServer = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowHUBServer.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionHubServerStatusInfo.getInstance();
                    widget.add(self.lootWindowHUBServer);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowHUBServer);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionHubStatusInfo: ", e);
                }
                this.__mhloot_showLootHUB();
              }
            },
            extendRUIN: function() {// RUIN
              var self = this; 
              if (!webfrontend.gui.region.RegionRuinStatusInfo.prototype.__mhloot_showLootRUIN) {
                webfrontend.gui.region.RegionRuinStatusInfo.prototype.__mhloot_showLootRUIN = webfrontend.gui.region.RegionRuinStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionRuinStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionRuinStatusInfo:');
                try {
                  if (!self.lootWindowRUIN) {
                    self.lootWindowRUIN = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowRUIN.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionRuinStatusInfo.getInstance();
                    widget.add(self.lootWindowRUIN);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowRUIN);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionRuinStatusInfo: ", e);
                }
                this.__mhloot_showLootRUIN();
              }
            },
            // OPTIONS
            optionsTab: null,
            optionsPage: null,
            btnApply: null,
            optionsStoreName: 'MHToolLootOptions',
            addLootPage: function() {            
              //console.log('addLootPage');
              try {
                if(!MHTools.OptionsPage) OptionsPage();
                
                if(!this.optionsTab) {
                  //Create Tab
                  this.optionsTab = MHTools.OptionsPage.getInstance();
                }
                this.optionsPage = this.optionsTab.addPage("Loot");
                this.optionsPage.setLayout(new qx.ui.layout.VBox());
                // ...
                this.optionsPage.add(new qx.ui.basic.Label("<b>Options:</b></br>").set({rich: true}));//, textColor: red
                var i = 0;
                for(var k in this.settings) {
                  this.settings[k].cb = new qx.ui.form.CheckBox(this.settings[k].l).set({
                    value: this.settings[k].v,
                    paddingLeft: 10
                  });
                  this.settings[k].cb.addListener("execute", this.optionsChanged, this);
                  this.optionsPage.add(this.settings[k].cb);//, {row:1+i++, column:3});
                }
                //typeGet
                //this.optionsPage.add(new qx.ui.basic.Label("<b>Obf:"+this.typeGet()+"</b>").set({rich: true}));//, textColor: red
                //  container.add(new qx.ui.core.Spacer(50));
                this.loadOptions();
                this.addButtons();               
              } catch (e) {
                console.warn("MHTool.Loot.addLootPage: ", e);
              }           
            },
            addButtons: function() {
              try {
                this.btnApply = new qx.ui.form.Button("Apply");
                this.btnApply.set({ width:150, height:30, toolTipText: "Apply changes.", allowGrowX:false, enabled:false});//, marginTop:20});
                
                var c = new qx.ui.container.Composite(new qx.ui.layout.HBox(0,'right'));
                c.setMarginTop(20);
                c.add(this.btnApply);
                this.optionsPage.add(c);
                
                this.btnApply.addListener("execute", this.applyOptions, this); 
                this.btnApply.setEnabled(false);
              } catch (e) {
                console.warn("MHTool.Loot.addButtons: ", e);
              }
            },
            optionsChanged: function() {
              var c = false;
              for(var k in this.settings) {
                c = c || (this.settings[k].v != this.settings[k].cb.getValue());
              }
              this.btnApply.setEnabled(c);
            },
            applyOptions: function(e) {
              //console.log("applyOptions e:",e);
              this.saveOptions();
              this.btnApply.setEnabled(false); 
            },
            saveOptions: function() {   
              var c = {};
              var i = 0;
              for(var k in this.settings) {
                c[k] = this.settings[k].cb.getValue();
                this.settings[k].v = c[k];
              }
              var S = ClientLib.Base.LocalStorage;
              if (S.get_IsSupported()) S.SetItem(this.optionsStoreName, c);
            },
            loadOptions: function() {
              try {
                var c = {};            
                var S = ClientLib.Base.LocalStorage;
                if (S.get_IsSupported()) c = S.GetItem(this.optionsStoreName);
                //console.log('loadOptions c:',c);
                if(c===null) c = {};
                var i = 0;              
                for(var k in this.settings) {
                  if(typeof(c[k])!='undefined') {
                    this.settings[k].cb.setValue(c[k]);
                    this.settings[k].v = c[k];
                  } else {
                    this.settings[k].cb.setValue(this.settings[k].d);
                    this.settings[k].v = this.settings[k].d;
                  }
                }             
                //console.log('loadOptions settings:',this.settings);
              } catch (e) {
                  console.warn("MHTool.Loot.loadOptions: ", e);
              }
            }
          }//members
        });      
      } catch (e) {
        console.warn("qx.Class.define(MHTools.Loot: ", e);      
      }
      //======================================================= 
      // START
      MHTools.Loot.getInstance();
    }//function MHToolsLootCreate
    //=======================================================   
    function LoadExtension() {
      try {
        if (typeof(qx) != 'undefined') {
          //if (qx.core.Init.getApplication().getMenuBar() !== null) {
          if (!!qx.core.Init.getApplication().getMenuBar()) {
            MHToolsLootCreate();
            return; // done
          } 
        }
      } catch (e) {
        if (typeof(console) != 'undefined') console.log('LoadExtension:',e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
      window.setTimeout(LoadExtension, 1000); // force it
    }
    LoadExtension();
  }
  //=======================================================
  function Inject() {
    var script = document.createElement('script');
    txt = MHLootMain.toString();
    script.innerHTML = '(' + txt + ')();';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  Inject();
})();

// ==UserScript==
// @name        C&C:TA Compass
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Creates compass poiting to the currently selected base (compass points from itself).
// @version     1.0.1
// @author      Caine
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==

(function () {
var CompassMain = function () {
try {
function createCompass() {
console.log('Compass loaded');qx.Class.define('Compass', {
type: 'singleton',
extend: qx.core.Object,
members: {
needle: null,
ctx: null,
background: null,
size: 50,
initialize: function () {
try {
this.background = new Image();this.background.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABaCAYAAAAFOiBkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACnNJREFUeNrsXV1sHFcVPnf+9sdrp3Ucp60QogHRSFFbVdCkrSKhSCBICVASGqdVSVIKUop45Y1H3pEQDzwArdKfUNM2pGkShERDgdQlrQQEKSUgNwgJUWo7tde7O7vzdznnzL27d9drtyDh2Os7yXh25s7cmfvdc77zMzN3xCN7dwBNjYV3wJjcg1/7dvLpLx2GLE0gyyQkSb4EELjMACT+FgL/43qaQSYzcF0X1x0sklQEvDeuUx2AS9riOA7XQfVxWZbwOtXDSyyXWZpXz/sCr9O+tI9Dx+A/R7i4T8Ln9nyPzwW0n+PyMWkS4zYB+VUAnteHQjHg48+cfBLOnXvO0YUfu/U2s+2C9wc79Z08/ePwt76DPe5AHKeIvEx2fuoBqC9W815BAYnjGHsZexKlxg8CiFotxpZ6K8scSLBcotT4fsCSlaUtcP0iS1aK27GvscwDV2TQaCUsEQ4en6QSuw1PgP89T0tTzF1JdZGUkHSRpHm+DzJNIaELQungc6cpS5aH0kqSnOH2JEEp8jw8Fs+d5hLpuR40Qx/8Qgn2fOYAhJH8bdJo7B7fWsFrrMKlS9MaCpYiQap04JFvcCUKGPmJ+/Zhw5sQRS1uLF1co9HAk2RQKATcqDAMoVQq4XqB1aYVxQyelsZWK8Yyn4HEpvGFOk6GdQDUGnjhWI+LDXI9F/dtIUgCz48qIYBBTKIQG4wreM5UqQk1ClhBPAQnBg/LCVZEC+vx8RwBNOp1blmAINKUxC0gBggCl8Fz3AIrSmV4CF7+2VMXEJjdBIxTvAn+ePFCR59OT34PDxYaGHnnzr0QIghXfvIj+Pf58wOpJlvvvx8+OjGBHVuG11/9+Q8RmMcJGBlL+NMfXutWJeqKO+7ei1LShL8efxKiM2dh+8Iio58tM+uytvz1Wf4/J6GZ0vitZ6dnFspQUNnM8y/AP1Citj14EO7dc+DY1CtPUBWP058/v9kNjLxj5+egVqvC1RPPQHTqJdiyWIOmENzAdAVg+gEiV6nne4HR1kT0LPXsytxOba414NqJn8I0rn94/364Z89jxy5OnWmDo4F5++7dX4BqdR7ePvEshJOTUJl9F2ZRMUOZNzKRHXDaS9mRGLmGJEYD4goFBnSWnsjLSvinWHeh9tRxmI4i2H7kMdh1795jr//mLFX1Ta7vX//8u1ysVuFvKCn1Z56G4bkZaCDh1Ylge4BJTel5P2BWARkh/ndghnAuI/Evjo7B8JFH4SMH9iPnDMMvz76Y13d1+i1JTP7a0SNw27vXoIUmr4EFIc4t1VATkBS6Acl6LvZ6SQz0UaUuNVIzlZFdIvtWpt9oGa+Mj8Lu409AUBiG8tBIrkrkfwhVe4K2lADRwIR9gPmg5AuryDPLccxywOjOZclKU3XhLvtEURzlwLDrnuWF1eosLGBLF3Guoa40ZIdPElYfuYRj5BoDRvRTJSGYTD21jVSpgj5QhCsZbbh5C8ToRLp+Af2sVEkMbqCZG+WX8obJbn2VGm3ZfRHyOgKyEkCih1scYZhtMw4SneumjiYHNtBWSWAw5qjAq1wZyV1xnIsGxyznx8AaBQb6qJIJjOYYzTOg/BxqlVQt8SgGiZXE1HG5iMua4pmmanCyAsdcb0CWI+R+HOOpMt3pSZeFEzlVKCy8FANDDlAIkIU5qGKLq8gvZK47HCMVxyw112sWGNGtSh7zjuBtZVyPBPGLyLMht4xjnBdxoCmEo4BB4k2zXDEKlRsYzdTQ034SI9eJxIhlJEarUFGpFUlPyjkl9IxdBQwllSjZQ9MNpSLvWFFqFPXxWZYz02sJmH5m2wQrUKBonqkqVSKnVCrP1KNUg+Pm5Pte2GxzTH0FjlnvEkOgDCkBGFbHxTFapEByzknFSkIliFCkavMQYovrSCA1FRK0OUb2kO864Rg9kw+jOSZRO7m4U8BNv5lVidUpM6ySUAJY3rS5zS++ErN+nu96lRjXkJiykpqyogxtmYiAFTCIWiHPdm3GAm3jBzkk0Nyi1Wke5y2jw+Ch56uxsCGBDQlsSGBDAhsS2JDAhgQ2JLAhgQ0JNkhIQJ4ePdtC05DvaTFirokMYN7vDuRa45h+ZtvtwzFDKiTQB7b9GH0/l831YpWJiEx13XDw2hwjl95XWusSo821yTEFBUikPd8tozkGiEWpkPOtRyYqU+YaopBbLBWBZLLDJ713H7WPKNcYMp27kzmfZAotvp+keIdDAZOI1IHCkBxPZp2WbfYdKOJqRRFvywBiCcfINW6uxVKOaYcEIg8ky+pW7QLkPSyN1rAfo3t9JhjZsOZa97KrXBePfjjqHu1GNtcG+yqJgY4IbWhzLXJznarclEfS4ujHRpuNtjSkRuPTdW6VVIzcLmt3spGPyTnGlBjZoZzK8Ejbzpc2kB+zoNuBWISt1OSYXGLqcZ6PqffkYwZVlZIe4s2PF8qPyTpZq8bCHNRUPmaQyZdMdUxqhDu5Kh+TCwy2M0209y/5gWGdjykp6dChwSCb65IR+lCWgTMNjtCxUsZPEtF0Y6nIB220fAzRh+/noHie24mVHJW1mg+beawEncfNBjmDR1Iz0jZK+YshQvl0nuu4/Oi6dvCaysEb5JxvqmIlcvAKysFjNaIsnspmevQsv75hVEEHTyqEA8PBG8S7BGVFGRWVRaAXOji4VCkYtkq+l+dhhrzufMxGuK9E6jSnVIlf9NAYSJnyqyxsrmt5Pqam8jHhMvkY83nf9XIn0pSYsvZjdIpifFQlwTvZTI9el0kVSiIOQShxoHSEmYfJgVk/967N269S5VoyxTuZQULKt+V73cQzWSftAO3X5UZGxtr8UoaN87TDDHEMvfgFRtohwjCg2Qh5ZXZhlu9E6icdQuNph9TM5K2DDJ6jMniOoUqu8bRDWT3x0FRPO8zO16CCSI2Vi0ujawhKeeWyG/22yij1cQzpWBd+jOgOIsFQN7DRtY2ubXRto2sbXdvo2kbXNrq20bWNrm10baNrG13b6NpG1za6ttG1ja5tdG2jaxtd2+jaRtc2urbRtY2ubXRto+vVi65pxNMoinR8ACX2hLtfFh3U4d5KHEUrkREpvwIZ+Pkr6V6xWII4iuGWffvgHR4gcA7d4gwibFlzQAcIpON8GjIXLfJ7o2PwoQe+jBs9Hh329ItP58C8eeFkcteuL3q3PngQpuMYFief4yElqeVOH3O9nOQsAUasrsT810NKqlETCxOHYNvEwxDg+tSrL18+9ez3b9eW2X/jd6flnbs+C9seehiuYtPCk6dgbLHGUjNQg5CqbaQ+1yplqBya4EFIfc+H30+duYxFO8CIE7neSxd/Ie+65/Ow/eij8BZKy8ypl2DroA5bi6AMPXSIh60NkEqmXvnxZad40w6zbnM8X3HpjXM80PHHDx+FK0kCfxnggY5ZUoIAps6/0CUpt3/yvhyMDT40dnV8a2VT36Gx9fD7X/nq183B1CUNpp6m8UANpk7HE7gOXs/ZM89Xk0ZjU5/B1LtV6fgPvmtuL0RR3FrpuwQF6j3zuwTFD/5dgkL5+n+X4Ne/mrxRN7bnuwQOgP0uwbLTfwQYAIY7xh+Wjkp8AAAAAElFTkSuQmCC'
this.needle = new Image();this.needle.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAAG6ElEQVRogd2aXYxdVRXHf+ucc8/QoU6mHWyfNEPVjpYQjSJJB4PEUH3R+kaAQHhQjFJCKCEMOv3I1DTFFBI0ITUmfVKjLz5YTYwfD5Bg+yAhIU0glI+hEm2GMjPF1jsz52v7sNe++9zpnTvn3DkIYSU795x11l57/dfea+119rlijOGjQMEHbUBTFNXvUnsGpX5HWV9kFQ0ApP4g/w+qAcQAAukiJPMgERWdfK3+XukvJmAyiMegtcWPV5Hqz0gyD1degWCIdYCEQA4cVIseK/F6kECxAps/p0DqUX0gEloQQUwfIAHW4E8D31feL4DX9VnRQ7HXPwANmLVM1XYYzIi2w9X6DEbvR/oNsR6/HbgHb+E9yitUplF6P4C4ZXOwdN+L1yg1DSTEev87wK1477tZulWfGRqelSaBCDbAtwMHSjy3tFwuPaAyOQ1uSk0CcboeBcbxaVbwBuf67NGmx29KkUu3nwceKPEF+LO2svf3qWzelA1Nx8gRYBjI8DEwpQ3lZcAmlW2MmgDiAnmvtvJmcAJ4SduJEt+U5BtJxxsF4gI8pju1RsAc8ERJ9pjyIrrTcUwDgb9RIK7/PuAmuuuonwD/xBoeAW8rz1GuffY1YctGOrvZGMfHANhl8gLwjN7neIDP6LPyUprCZ7mBZ2WjQAAex+4LWUnfISDR61u0obxDpbEz7fvDVTpr06BAXAU7Cdxf4gtwCvgT3uvH8LES6rNTdBv9XWC36hzIpkGBuMw0g/dsBLTxHs+BO4CvYGfkDvwSO6SyEX4mXToeqAQeBIh7NbwbX806+hk21QowggeFXo/os5dU1pGrlu9W3bXfk+oCEawHR4Bp5bmBZ4GnSryHgBvwwX6D8pzHn9I+5XfmadWdUTNe6gJx8o8Au+jONEeBd/X6s8D+Hv336zNU9qhe2wwowS6y9x7RGrOWbXWEtZ4qdiEdI43ynwNOlvT9CNiKL1VcabJVnzl9J7VvAMYgEaxc2E97Vp1kKttXA4iASWH53weQaMQeeXTW8mH9LYCvAfdaQ4iA32mLlHevyhSr+kZgMoJ4hOV/HcSk1FldUu3I1IQgOe3Z22mf+ysSGzDO0F+pcYGO/Cw2UxlgGfiSKnkRGFKZ54HbVKYAfol9Fc5AQkwiDO/cw/D1f+uMvQ5VmBEDSE66ELA0O4O0AOPqqQV82iyA+xREogb/HHhF2wnlJSpzH35WjqiuCEyBtGBpdoZ0IbAg1nd2BSBil0/7rfsx2eQq7zwJvKbX2/CZLAbOA8dLsseVF+v9tPZBdTxZGjPHZJO03/pelw2DAzE23SYXt5MuPK6zATZ4zwJPl4QfA3YAqd7/GLiAD/YLykNldmgfR0+rzhAMSAvShSmSi1r+mL4Bsw4QCTAZXH55CmRcA9z1eQJY0vubgR8oyhZwBvg11vstbbHyzui90T43q44lfCkT2LFknMsvT9lh+6fjPsFuApCC9uxNtM/9HYljMO4QIQfexL/ibgNG8YcMc8Alujc7t5mOYgtFJ3sJeAf/graDzmmMCCZJGN55C8PXv9CxqR4QBJMaFs/8HpPu1dho/GBtHcrBhEjrFFt2fxtpuVOZq2gtIPaw+fLZb7EydwqJUr85dcnLql/nrX7nn+VTFbdcTPdvORykwGQthrbv5WM3/oE1DsJ7ADECYkje2cKlf5whiCYwpfJagvJBc/m8qt53gLX6m1yze4cKhIAie5XRL+8m3rbYsbFEa6c1CUfZPHEComU7G8ZmweRdIZ1fQaJPgJku6Xgdm3mqluECPAx8Rm9zTHaU1tjbxNcNYTJTmvACsmuQcBRY7KWsBxBF2hqbpTX2U89X55k8ILlYIBzT/ik2Cx0CfkvfbyAdcjILwG86OkwxRGvLSTZ9MrDTstYEy1XO6pe1hK7gNkAQ0n5zhfZrX0XiZ7VMCYG/AN9QYGsGZHlclcmwh3df1xkJiT9+GyNfeA7MEFc7JO8FAvruI2JAsu5GYmels4MLNsBnSvc5/gR+rVYu/2cszwgSQnJxmmQekMQC7bKh75eliiQ2t2fv3YkEe/CvqMeB03qdVgDhWqp9TmPLk0CdtYel83dig7Jyuq9a/Womm9/Kf148jYQT+IOCP2Jfkvp+i1trfGwReR3wTatTAkz2KiNfnCQeW+iVoXpRxXdjsTv48vl9wARIastrCjWgCXI5NwUmWD7/IPHYkc7Y61m4/oy4UuWNG/nvudME12yGYpA9oyoZCIRi+QrX7pxk+FNn+5UmjirMiNjktDJ3F+HwIsgbEA7wR4NalBEOb2Vl7i42jZ+tEioVYwTBZEMMcLqxAbKnMxKtUCH2qgL50FOdJfJB/AmlspfrAPlQT91H5v9a/wMJbneLG5+XVwAAAABJRU5ErkJggg==';var ec = document.createElement('canvas');document.body.appendChild(ec);ec.width = 70;ec.height = 90;ec.style.position = 'absolute';ec.style.top = '35px';ec.style.left = '140px';ec.style.zIndex = 999999;this.ctx = ec.getContext('2d');phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.displayCompass);} catch (e) {
console.log("Compass.initialize: ", e);}
},
displayCompass: function () {
try {
var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();var	cityCoordX = currentCity.get_PosX();var	cityCoordY = currentCity.get_PosY();var region = ClientLib.Vis.VisMain.GetInstance().get_Region();var zoom = region.get_ZoomFactor();var targetCoordX = 175;var targetCoordY = 80;var gridW = region.get_GridWidth();var gridH = region.get_GridHeight();var viewCoordX = (region.get_PosX() + targetCoordX / zoom - zoom * gridW / 2) / gridW;var viewCoordY = (region.get_PosY() + targetCoordY / zoom - zoom * gridH / 2) / gridH;var dx = viewCoordX - cityCoordX;var dy = cityCoordY - viewCoordY;var distance = Math.sqrt(dx * dx + dy * dy);var ctx = this.ctx;ctx.clearRect(0, 0, 70, 90);ctx.save();ctx.font = '18px Tahoma';ctx.fillStyle = '#FCDE7E';ctx.translate(35, 35);ctx.drawImage(this.background, -35, -35);var dtext = Math.round(10 * distance) / 10;ctx.fillText(dtext, -dtext.toString().length * 9 / 2, 40);ctx.rotate(dy > 0 ? Math.asin(dx / distance) + Math.PI : -Math.asin(dx / distance));ctx.drawImage(this.needle, - this.size / 2, - this.size / 2);ctx.restore();} catch (e) {
console.log("displayCompass", e);}
}
}
});}
} catch (e) {
console.log('createCompass: ', e);}
function CompassCheckLoaded() {
try {
if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
createCompass();window.Compass.getInstance().initialize();} else {
window.setTimeout(CompassCheckLoaded, 1000);}
} catch (e) {
console.log('CompassCheckLoaded: ', e);}
}
if (/commandandconquer\.com/i.test(document.domain)) {
window.setTimeout(CompassCheckLoaded, 1000);}
}
try {
var CompassScript = document.createElement('script');CompassScript.innerHTML = "(" + CompassMain.toString() + ')();';CompassScript.type = 'text/javascript';if (/commandandconquer\.com/i.test(document.domain)) {
document.getElementsByTagName('head')[0].appendChild(CompassScript);}
} catch (e) {
console.log('Compass: init error: ', e);}
})();

// ==UserScript==
// @name       Tiberium Alliances Info Sticker
// @namespace  TAInfoSticker
// @version    1.11.1
// @description  Based on Maelstrom Dev Tools. Modified MCV timer, repair time label, resource labels.
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @author unicode
// ==/UserScript==
(function () {
    var InfoSticker_main = function () {
        try {
            function createInfoSticker() {
                console.log('InfoSticker loaded');
                // define Base
                qx.Class.define("InfoSticker.Base", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        /* Desktop */
                        dataTimerInterval: 1000,
                        positionInterval: 500,
                        tibIcon: null,
                        cryIcon: null,
                        powIcon: null,
                        creditIcon: null,
                        repairIcon: null,
                        hasStorage: false,

                        initialize: function () {
                            try {
                                this.hasStorage = 'localStorage' in window && window['localStorage'] !== null;
                            } catch (se) {}
                            try {
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.tibIcon = fileManager.GetPhysicalPath("ui/common/icn_res_tiberium.png");
                                this.cryIcon = fileManager.GetPhysicalPath("ui/common/icn_res_chrystal.png");
                                this.powIcon = fileManager.GetPhysicalPath("ui/common/icn_res_power.png");
                                this.creditIcon = fileManager.GetPhysicalPath("ui/common/icn_res_dollar.png");
								this.repairIcon = fileManager.GetPhysicalPath("ui/icons/icn_repair_off_points.png");
                                
								if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
									this.attachEvent = webfrontend.gui.Util.attachNetEvent;
								else
									this.attachEvent = phe.cnc.Util.attachNetEvent;
                                
                                this.runMainTimer();
                            } catch (e) {
                                console.log("InfoSticker.initialize: ", e.toString());
                            }
                        },
                        runMainTimer: function () {
                            try {
                                var self = this;
                                this.calculateInfoData();
                                window.setTimeout(function () {
                                    self.runMainTimer();
                                }, this.dataTimerInterval);
                            } catch (e) {
                                console.log("InfoSticker.runMainTimer: ", e.toString());
                            }
                        },
                        runPositionTimer: function () {
                            try {
                                var self = this;
                                this.repositionSticker();
                                window.setTimeout(function () {
                                    self.runPositionTimer();
                                }, this.positionInterval);
                            } catch (e) {
                                console.log("InfoSticker.runPositionTimer: ", e.toString());
                            }
                        },
                        infoSticker: null,
                        mcvPopup: null,
                        mcvTimerLabel: null,
                        mcvInfoLabel: null,
                        mcvPane: null,
                        
                        repairPopup: null,
                        repairTimerLabel: null,

                        resourcePane: null,
                        resourceHidden: false,
                        resourceTitleLabel: null,
                        resourceHideButton: null,
                        resourceLabel1: null,
                        resourceLabel2: null,
                        resourceLabel3: null,

                        resourceLabel1per: null,
                        resourceLabel2per: null,
                        resourceLabel3per: null,

                        productionTitleLabel: null,
                        productionLabelPower: null,
                        productionLabelCredit: null,

                        repairInfoLabel: null,

                        lastButton: null,

                        top_image: null,
                        bot_image: null,

                        toFlipH: [],

                        pinButton: null,
                        pinned: false,

                        pinTop: 130,
                        pinButtonDecoration: null,
                        pinPane: null,

                        pinIconFix: false,
                        
                        lockButton: null,
                        locked: false,

                        lockButtonDecoration: null,
                        lockPane: null,

                        lockIconFix: false,
                        
                        mcvHide: false,
                        repairHide: false,
                        resourceHide: false,
                        productionHide: false,
                        stickerBackground: null,
                        
                        mcvPane: null,
                        
                        pinLockPos: 0,
                        
                        attachEvent: function() {},
                        
                        isNull: function(e) {
                            return typeof e == "undefined" || e == null;
                        },
                        
                        getApp: function() {
                            return qx.core.Init.getApplication();
                        },
                        
                        getBaseListBar: function() {
                            var app = this.getApp();
                            var b;
                            if(!this.isNull(app)) {
                                b = app.getBaseNavigationBar();
                                if(!this.isNull(b)) {
                                    if(b.getChildren().length > 0) {
                                        b = b.getChildren()[0];
                                        if(b.getChildren().length > 0) {
                                            b = b.getChildren()[0];
                                            return b;
                                        }
                                    }
                                }
                            }
                            return null;
                        },
                        
                        repositionSticker: function () {
                            try {
                            	var i;
                                
                                if (this.infoSticker && !this.mcvInfoLabel.isDisposed() && !this.mcvPopup.isDisposed()) {
                                    var dele;

                                    try {
                                        if (this.top_image != null) {
                                            dele = this.top_image.getContentElement().getDomElement();
                                            if (dele != null) {
                                                dele.style["-moz-transform"] = "scaleY(-1)";
                                                dele.style["-o-transform"] = "scaleY(-1)";
                                                dele.style["-webkit-transform"] = "scaleY(-1)";
                                                dele.style.transform = "scaleY(-1)";
                                                dele.style.filter = "FlipV";
                                                dele.style["-ms-filter"] = "FlipV";
                                                this.top_image = null;
                                            }
                                        }
                                        for (i = this.toFlipH.length - 1; i >= 0; i--) {
                                            var e = this.toFlipH[i];
                                            if(e.isDisposed()) this.toFlipH.splice(i, 1);
                                            else {
                                                dele = e.getDecoratorElement().getDomElement();
                                                if (dele != null) {
                                                    dele.style["-moz-transform"] = "scaleX(-1)";
                                                    dele.style["-o-transform"] = "scaleX(-1)";
                                                    dele.style["-webkit-transform"] = "scaleX(-1)";
                                                    dele.style.transform = "scaleX(-1)";
                                                    dele.style.filter = "FlipH";
                                                    dele.style["-ms-filter"] = "FlipH";
                                                    this.toFlipH.splice(i, 1);
                                                }
                                            }
                                        }
                                    } catch (e2) {
                                        console.log("Error flipping images.", e2.toString());
                                    }
                                    var baseListBar = this.getBaseListBar();
                                    if(baseListBar!=null) {
                                        var baseCont = baseListBar.getChildren();
                                        for (i = 0; i < baseCont.length; i++) {
                                            var baseButton = baseCont[i];
                                            if(typeof baseButton.getBaseId === 'function') {
                                                if(baseButton.getBaseId() == ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id()
                                                    && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                            //var baseButtonDecorator = baseButton.getDecorator();
                                            //if (baseButton!=this.mcvPopup && baseButtonDecorator != null && typeof baseButtonDecorator === "string" && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                                //if (baseButtonDecorator.indexOf("focused") >= 0 || baseButtonDecorator.indexOf("pressed") >= 0) {
                                                    if(this.locked) {
                                                        if(!this.pinned) {
                                                            if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                                baseListBar.remove(this.mcvPopup);
                                                            }
                                                            this.pinLockPos = baseListBar.indexOf(baseButton)+1;
                                                            baseListBar.addAt(this.mcvPopup, this.pinLockPos);
                                                        } else if(baseListBar.indexOf(this.mcvPopup)<0) {
                                                            baseListBar.addAt(this.mcvPopup, Math.max(0, Math.min(this.pinLockPos, baseCont.length)));
                                                        }
                                                    } else {
                                                        if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                            baseListBar.remove(this.mcvPopup);
                                                        }
                                                        if (!this.pinned) {
                                                            var top = baseButton.getBounds().top;
                                                            var infoTop;
                                                            try {
                                                                var stickerHeight = this.infoSticker.getContentElement().getDomElement().style.height;
                                                                stickerHeight = stickerHeight.substring(0, stickerHeight.indexOf("px"));
                                                                infoTop = Math.min(130 + top, Math.max(660, window.innerHeight) - parseInt(stickerHeight, 10) - 130);
                                                            } catch (heighterror) {
                                                                infoTop = 130 + top;
                                                            }
                                                            if(this.infoSticker.getContentElement().getDomElement()!=null)
                                                                this.infoSticker.setDomTop(infoTop);
                                                            
                                                            this.pinTop = infoTop;
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    
                                }
                            } catch (ex) {
                                console.log("InfoSticker.repositionSticker: ", ex.toString());
                            }
                        },
                        toLock: function (e) {
                            try {
                                this.locked = !this.locked;
                                if(!this.locked) {
                                    this.infoSticker.show();
                                    this.stickerBackground.add(this.mcvPopup);
                                }
                                else this.infoSticker.hide();
                                this.lockButton.setIcon(this.locked ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png");
                                this.updateLockButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.locked) {
                                        localStorage["infoSticker-locked"] = "true";
                                        if(this.pinned) localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                    } else {
                                        localStorage["infoSticker-locked"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                                this.repositionSticker();
                            } catch(e) {
                                console.log("InfoSticker.toLock: ", e.toString());
                            }
                        },
                        updateLockButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.lockPane.setDecorator(null);
                            this.lockButtonDecoration = new qx.ui.decoration.Background();
                            this.lockButtonDecoration.setBackgroundColor(this.locked ? dark : light);
                            this.lockPane.setDecorator(this.lockButtonDecoration);
                        },
                        toPin: function (e) {
                            try {
                                this.pinned = !this.pinned;
                                this.pinButton.setIcon(this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png");
                                this.updatePinButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.pinned) {
                                        localStorage["infoSticker-pinned"] = "true";
                                        localStorage["infoSticker-top"] = this.pinTop.toString();
                                        if(this.locked) {
                                            localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                        }
                                    } else {
                                        localStorage["infoSticker-pinned"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                            } catch(e) {
                                console.log("InfoSticker.toPin: ", e.toString());
                            }
                        },
                        updatePinButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.pinPane.setDecorator(null);
                            this.pinButtonDecoration = new qx.ui.decoration.Background().set({
                                //innerOpacity: 0.5
                            });
                            //this.pinButtonDecoration.setInnerColor(this.pinned ? mid : light);
                            //this.pinButtonDecoration.setOuterColor(this.pinned ? light : mid);
                            this.pinButtonDecoration.setBackgroundColor(this.pinned ? dark : light);
                            this.pinPane.setDecorator(this.pinButtonDecoration);
                        },
                        hideResource: function () {
                            try {
                                //if(this.resourceHidden) 
                                if (this.resourcePane.isVisible()) {
                                    //this.resourcePane.hide();
                                    this.resourcePane.exclude();
                                    this.resourceHideButton.setLabel("+");
                                } else {
                                    this.resourcePane.show();
                                    this.resourceHideButton.setLabel("-");
                                }
                            } catch(e) {
                                console.log("InfoSticker.hideResource: ", e.toString());
                            }
                        },
                        lastPane: null,
                        createSection: function (parent, titleLabel, visible, visibilityStorageName) {
							try {
								var pane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
									padding: [5, 0, 5, 5],
									width: 124,
									decorator: new qx.ui.decoration.Background().set({
										backgroundImage: "decoration/pane_messaging_item/messaging_items_pane.png",
										backgroundRepeat: "scale",
									}),
									alignX: "right"
								});
								
								var labelStyle = {
									font: qx.bom.Font.fromString('bold').set({
										size: 12
									}),
									textColor: '#595969'
								};
								titleLabel.set(labelStyle);
								
								var hidePane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
									width: 124,
                                    alignX: "right"
								});
								
								var hideButton = new qx.ui.form.Button("-").set({
									//decorator: new qx.ui.decoration.Single(1, "solid", "black"),
									maxWidth: 15,
									maxHeight: 10,
									//textColor: "black"
								});
                                var self = this;
								//resourceHideButton.addListener("execute", this.hideResource, this);
								hideButton.addListener("execute", function () {
									if (hidePane.isVisible()) {
										hidePane.exclude();
										hideButton.setLabel("+");
									} else {
										hidePane.show();
										hideButton.setLabel("-");
									}
									if(self.hasStorage)
										localStorage["infoSticker-"+visibilityStorageName] = !hidePane.isVisible();
								});

								var titleBar = new qx.ui.container.Composite(new qx.ui.layout.HBox(0));
								titleBar.add(hideButton);
								titleBar.add(titleLabel);
								pane.add(titleBar);
								pane.add(hidePane);
								
                                if(!visible) hidePane.exclude();
                                
								this.toFlipH.push(pane);

                                this.lastPane = pane;
								parent.add(pane);
								
								return hidePane;
							} catch(e) {
								console.log("InfoSticker.createSection: ", e.toString());
								throw e;
							}
                        },
						createHBox: function (ele1, ele2, ele3) {
							var cnt;
							cnt = new qx.ui.container.Composite();
							cnt.setLayout(new qx.ui.layout.HBox(0));
							if (ele1 != null) {
								cnt.add(ele1);
								ele1.setAlignY("middle");
							}
							if (ele2 != null) {
								cnt.add(ele2);
								ele2.setAlignY("bottom");
							}
							if (ele3 != null) {
								cnt.add(ele3);
								ele3.setAlignY("bottom");
							}

							return cnt;
						},
                        
                        formatCompactTime: function (time) {
                            var comps = time.split(":");
                            
                            var i = 0;
                            var value = Math.round(parseInt(comps[i], 10)).toString();
                            var len = comps.length;
                            while(value==0) {
                                value = Math.round(parseInt(comps[++i], 10)).toString();
                                len--;
                            }
                            var unit;
                            switch(len) {
                                case 1: unit = "s"; break;
                                case 2: unit = "m"; break;
                                case 3: unit = "h"; break;
                                case 4: unit = "d"; break;
                            }
                            return value+unit;
                        },
                        createImage: function(icon) {
                            var image = new qx.ui.basic.Image(icon);
                            image.setScale(true);
                            image.setWidth(20);
                            image.setHeight(20);
                            return image;
                        },

                        createMCVPane: function() {
                            try {
                                this.mcvInfoLabel = new qx.ui.basic.Label();
                                this.mcvTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 18
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center'
                                });
                                this.mcvTimerCreditProdLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('normal').set({
                                        size: 12
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center',
                                    marginTop: 4,
                                    marginBottom: -4
                                });
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                
                                
                                var pane = this.createSection(b3, this.mcvInfoLabel, !this.mcvHide, "mcvHide");
                                pane.add(this.mcvTimerLabel);
                                pane.add(this.mcvTimerCreditProdLabel);
                                this.mcvPane = this.lastPane;
                                this.lastPane.setMarginLeft(7);
                                
                            } catch(e) {
                                console.log("InfoSticker.createMCVPopup", e.toString());
                            }
                        },
                        moveStickerUp: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.max(0, this.pinLockPos-1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerUp", e.toString());
                            }
                        },
                        moveStickerDown: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.min(baseListBar.getChildren().length, this.pinLockPos+1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerDown", e.toString());
                            }
                        },
                        menuUpButton: null,
                        menuDownButton: null,
                        createMCVPopup: function() {
                            try {
                                var self = this;
                                this.mcvPopup = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                    spacing: 3})).set({
                                    paddingLeft: 5,
                                    width: 105,
                                    decorator: new qx.ui.decoration.Background()
                                });
                                
                                var menu = new qx.ui.menu.Menu();
                                var menuPinButton = new qx.ui.menu.Button("Pin", "FactionUI/icons/icn_thread_pin_inactive.png");
                                menuPinButton.addListener("execute", this.toPin, this);
                                menu.add(menuPinButton);
                                var menuLockButton = new qx.ui.menu.Button("Lock", "FactionUI/icons/icn_thread_locked_inactive.png");
                                menuLockButton.addListener("execute", this.toLock, this);
                                menu.add(menuLockButton);
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.menuUpButton = new qx.ui.menu.Button("Move up", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_up.png"));
                                //ui/icons/icon_tracker_arrow_up.png ui/gdi/icons/cht_opt_arrow_down.png
                                this.menuUpButton.addListener("execute", this.moveStickerUp, this);
                                menu.add(this.menuUpButton);
                                this.menuDownButton = new qx.ui.menu.Button("Move down", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_down.png"));
                                this.menuDownButton.addListener("execute", this.moveStickerDown, this);
                                menu.add(this.menuDownButton);
                                this.mcvPopup.setContextMenu(menu);
                                if(!this.locked) {
                                    this.stickerBackground.add(this.mcvPopup);
                                }
    
    ////////////////////////////----------------------------------------------------------
                                this.pinButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.pinButton.addListener("execute", this.toPin, this);
                                
                                this.pinPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updatePinButtonDecoration();
                                
                                this.pinPane.setDecorator(this.pinButtonDecoration);
                                this.pinPane.add(this.pinButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                var icon = this.pinButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.lockButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.lockButton.addListener("execute", this.toLock, this);
                                
                                this.lockPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updateLockButtonDecoration();
                                
                                this.lockPane.setDecorator(this.lockButtonDecoration);
                                this.lockPane.add(this.lockButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                icon = this.lockButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.resourceTitleLabel = new qx.ui.basic.Label();
                                this.resourceTitleLabel.setValue("Base");
                                var resStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 14
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 65,
                                    marginLeft: -10,
                                    textAlign: 'right'
                                };
                                
                                this.resourceLabel1 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel2 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel3 = new qx.ui.basic.Label().set(resStyle);
                                
                                var perStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 9
                                    }),
                                    textColor: '#282828',
                                    height: 18,
                                    width: 33,
                                    textAlign: 'right'
                                };
                                this.resourceLabel1per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel2per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel3per = new qx.ui.basic.Label().set(perStyle);
                                
                                
                                var pane3 = this.createSection(this.mcvPopup, this.resourceTitleLabel, !this.resourceHide, "resourceHide");
                                
                                
                                this.repairTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 16
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    marginLeft: 0,
                                    textAlign: 'center'
                                });
                                pane3.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimerLabel));
                                
                                pane3.add(this.createHBox(this.createImage(this.tibIcon), this.resourceLabel1, this.resourceLabel1per));
                                pane3.add(this.createHBox(this.createImage(this.cryIcon), this.resourceLabel2, this.resourceLabel2per));
                                pane3.add(this.createHBox(this.createImage(this.powIcon), this.resourceLabel3, this.resourceLabel3per));
                                
                                var mcvC = this.mcvPopup.getChildren();
                                mcvC[mcvC.length-1].getChildren()[0].add(this.pinPane);
                                mcvC[mcvC.length-1].getChildren()[0].add(this.lockPane);
    ////////////////////////////----------------------------------------------------------
    
                                this.productionTitleLabel = new qx.ui.basic.Label();
                                this.productionTitleLabel.setValue("Productions");
                                
                                var productionStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 60,
                                    textAlign: 'right',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
                                this.productionLabelPower = new qx.ui.basic.Label().set(productionStyle);
                                this.productionLabelCredit = new qx.ui.basic.Label().set(productionStyle);
                                
                                var pane4 = this.createSection(this.mcvPopup, this.productionTitleLabel, !this.productionHide, "productionHide");
                                pane4.add(this.createHBox(this.createImage(this.powIcon), this.productionLabelPower));
                                pane4.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------
                            } catch(e) {
                                console.log("InfoSticker: createMCVPopup", e.toString());
                            }
                        },
                        currentCityChange: function() {
                            this.calculateInfoData();
                            this.repositionSticker();
                        },
                        disposeRecover: function() {
                            
                            try {
                                if(this.mcvPane.isDisposed()) {
                                    this.createMCVPane();
                                }
                                
                                if(this.mcvPopup.isDisposed()) {
                                    this.createMCVPopup();
                                    
                                    this.repositionSticker();
                                }
                                this.waitingRecovery = false;
                            } catch(e) {
                                console.log("InfoSticker: disposeRecover", e.toString());
                            }
                            
                        },
                        waitingRecovery: false,
                        citiesChange: function() {
                            try {
                                var self = this;
                                var baseListBar = this.getBaseListBar();
                                this.disposeRecover();
                                
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                    this.mcvPopup.dispose();
                                }
                                
                                if(baseListBar.indexOf(this.mcvPane)>=0) {
                                    baseListBar.remove(this.mcvPane);
                                    this.mcvPane.dispose();
                                }
                                if(!this.waitingRecovery) {
                                    this.waitingRecovery = true;
                                    window.setTimeout(function () {
                                        self.disposeRecover();
                                    }, 10);
                                }
                            } catch(e) {
                                console.log("InfoSticker: citiesChange", e.toString());
                            }
                        },
                        calculateInfoData: function () {
                            try {
                                var self = this;
                                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                                var cw = player.get_Faction();
                                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                                var cr = player.get_PlayerResearch();
                                var cd = cr.GetResearchItemFomMdbId(cj);
                                
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                if(b3.getChildren().length==0) return;
                                if (!this.infoSticker) {
                                    this.infoSticker = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                        alignX: "right"
                                    })).set({
                                        width: 105,
                                    });

                                    var top = 130;
                                    if (this.hasStorage) {
                                        var l = localStorage["infoSticker-locked"] == "true";
                                        if (l != null) {
                                            this.locked = l;
                                            var pl = localStorage["infoSticker-pinLock"];
                                            if(pl!=null) {
                                                try {
                                                	this.pinLockPos = parseInt(pl, 10);
                                                } catch(etm) {}
                                            }
                                        }
                                        
                                        var p = localStorage["infoSticker-pinned"];
                                        var t = localStorage["infoSticker-top"];
                                        if (p != null && t != null) {
                                            var tn;
                                            try {
                                                this.pinned = p == "true";
                                                if (this.pinned) {
                                                    tn = parseInt(t, 10);
                                                    top = tn;
                                                }
                                            } catch (etn) {}
                                        }
                                        this.mcvHide = localStorage["infoSticker-mcvHide"] == "true";
                                        this.repairHide = localStorage["infoSticker-repairHide"] == "true";
                                        this.resourceHide = localStorage["infoSticker-resourceHide"] == "true";
                                        this.productionHide = localStorage["infoSticker-productionHide"] == "true";
                                    }
                                    
                                    
                                    app.getDesktop().add(this.infoSticker, {
                                        right: 124,
                                        top: top
                                    });
                                    if(this.locked) {
                                        this.infoSticker.hide();
                                    }

                                    this.stickerBackground = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                        //paddingLeft: 5,
                                        width: 105,
                                        decorator: new qx.ui.decoration.Background().set({
                                            backgroundImage: "webfrontend/ui/common/bgr_region_world_select_scaler.png",
                                            backgroundRepeat: "scale",
                                        })
                                    });
                                    
                                    this.createMCVPane();
                                    this.createMCVPopup();
									
                                    if(this.locked && this.pinned) {
                                        this.menuUpButton.setEnabled(true);
                                        this.menuDownButton.setEnabled(true);
                                    } else {
                                        this.menuUpButton.setEnabled(false);
                                        this.menuDownButton.setEnabled(false);
                                    }
                                    
                                    this.top_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.top_image);

                                    this.infoSticker.add(this.stickerBackground);
                                    //this.infoSticker.add(this.mcvPopup);

                                    this.bot_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.bot_image);

                                    this.runPositionTimer();

                                    try {
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.currentCityChange);
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "Change", ClientLib.Data.CitiesChange, this, this.citiesChange);
                                    } catch(eventError) {
                                        console.log("InfoSticker.EventAttach:", eventError);
                                        console.log("The script will continue to run, but with slower response speed.");
                                    }
                                }
                                this.disposeRecover();
                                
                                if (cd == null) {
                                    if (this.mcvPopup) {
                                        //this.mcvInfoLabel.setValue("MCV ($???)");
                                        this.mcvInfoLabel.setValue("MCV<br>$???");
                                        this.mcvTimerLabel.setValue("Loading");
                                    }
                                } else {
                                    var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                                    var resourcesNeeded = [];
                                    for (var i in nextLevelInfo.rr) {
                                        if (nextLevelInfo.rr[i].t > 0) {
                                            resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                                        }
                                    }
                                    //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                                    //var currentResearchPoints = player.get_ResearchPoints();
                                    var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                                    var creditsResourceData = player.get_Credits();
                                    var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                                    var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;
                                    this.mcvInfoLabel.setValue("MCV ($ " + this.formatNumbersCompact(creditsNeeded) + ")");
                                    //this.mcvInfoLabel.setValue("MCV<br>$" + this.formatNumbersCompact(creditsNeeded));
                                    this.mcvTimerCreditProdLabel.setValue("at " + this.formatNumbersCompact(creditGrowthPerHour) + "/h");
                                    if (creditTimeLeftInHours <= 0) {
                                        this.mcvTimerLabel.setValue("Ready");
                                    } else if (creditGrowthPerHour == 0) {
                                        this.mcvTimerLabel.setValue("Never");
                                    } else {
                                        if(creditTimeLeftInHours >= 24 * 100) {
                                            this.mcvTimerLabel.setValue("> 99 days");
                                        } else {
                                            this.mcvTimerLabel.setValue(this.FormatTimespan(creditTimeLeftInHours * 60 * 60));
                                        }
                                    }
                                }

                                var ncity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                                if (ncity == null) {
                                    if (this.mcvPopup) {
                                        this.repairTimerLabel.setValue("Select a base");

                                        this.resourceLabel1.setValue("N/A");
                                        this.resourceLabel2.setValue("N/A");
                                        this.resourceLabel3.setValue("N/A");
                                    }
                                } else {

                                    var rt = Math.min(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir));
                                    if (ncity.get_CityUnitsData().get_UnitLimitOffense() == 0) {
                                        this.repairTimerLabel.setValue("No army");
                                    } else {
                                        this.repairTimerLabel.setValue(this.FormatTimespan(rt));
                                    }

                                    var tib = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                                    var tibMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                                    var tibRatio = tib / tibMax;
                                    this.resourceLabel1.setTextColor(this.formatNumberColor(tib, tibMax));
                                    this.resourceLabel1.setValue(this.formatNumbersCompact(tib));
                                    this.resourceLabel1per.setValue(this.formatPercent(tibRatio));

                                    var cry = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                                    var cryMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                                    var cryRatio = cry / cryMax;
                                    this.resourceLabel2.setTextColor(this.formatNumberColor(cry, cryMax));
                                    this.resourceLabel2.setValue(this.formatNumbersCompact(cry));
                                    this.resourceLabel2per.setValue(this.formatPercent(cryRatio));

                                    var power = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                                    var powerMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                                    var powerRatio = power / powerMax;
                                    this.resourceLabel3.setTextColor(this.formatNumberColor(power, powerMax));
                                    this.resourceLabel3.setValue(this.formatNumbersCompact(power));
                                    this.resourceLabel3per.setValue(this.formatPercent(powerRatio));

                                    var powerCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false);
                                    var powerBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power);
                                    var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var powerAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                    var powerProd = powerCont + powerBonus + powerAlly;

                                    var creditCont = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditBonus = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditProd = creditCont + creditBonus;

                                    this.productionLabelPower.setValue(this.formatNumbersCompact(powerProd) + "/h");
                                    this.productionLabelCredit.setValue(this.formatNumbersCompact(creditProd) + "/h");
                                }
                            } catch (e) {
                                console.log("InfoSticker.calculateInfoData", e.toString());
                            }
                        },
                        formatPercent: function (value) {
                            return value > 999 / 100 ? ">999%" : this.formatNumbersCompact(value * 100, 0) + "%";
                            //return this.formatNumbersCompact(value*100, 0) + "%";
                        },
                        formatNumberColor: function (value, max) {
                            var ratio = value / max;

                            var color;
                            var black = [40, 180, 40];
                            var yellow = [181, 181, 0];
                            var red = [187, 43, 43];

                            if (ratio < 0.5) color = black;
                            else if (ratio < 0.75) color = this.interpolateColor(black, yellow, (ratio - 0.5) / 0.25);
                            else if (ratio < 1) color = this.interpolateColor(yellow, red, (ratio - 0.75) / 0.25);
                            else color = red;

                            //console.log(qx.util.ColorUtil.rgbToHexString(color));
                            return qx.util.ColorUtil.rgbToHexString(color);
                        },
                        interpolateColor: function (color1, color2, s) {
                            //console.log("interp "+s+ " " + color1[1]+" " +color2[1]+" " +(color1[1]+s*(color2[1]-color1[1])));
                            return [Math.floor(color1[0] + s * (color2[0] - color1[0])),
                            Math.floor(color1[1] + s * (color2[1] - color1[1])),
                            Math.floor(color1[2] + s * (color2[2] - color1[2]))];
                        },
                        formatNumbersCompact: function (value, decimals) {
                            if (decimals == undefined) decimals = 2;
                            var valueStr;
                            var unit = "";
                            if (value < 1000) valueStr = value.toString();
                            else if (value < 1000 * 1000) {
                                valueStr = (value / 1000).toString();
                                unit = "k";
                            } else if (value < 1000 * 1000 * 1000) {
                                valueStr = (value / 1000000).toString();
                                unit = "M";
                            } else {
                                valueStr = (value / 1000000000).toString();
                                unit = "G";
                            }
                            if (valueStr.indexOf(".") >= 0) {
                                var whole = valueStr.substring(0, valueStr.indexOf("."));
                                if (decimals === 0) {
                                    valueStr = whole;
                                } else {
                                    var fraction = valueStr.substring(valueStr.indexOf(".") + 1);
                                    if (fraction.length > decimals) fraction = fraction.substring(0, decimals);
                                    valueStr = whole + "." + fraction;
                                }
                            }

                            valueStr = valueStr + unit;
                            return valueStr;
                        },
                        FormatTimespan: function (value) {
                            var i;
                            var t = ClientLib.Vis.VisMain.FormatTimespan(value);
                            var colonCount = 0;
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') colonCount++;
                            }
                            var r = "";
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') {
                                    if (colonCount > 2) {
                                        r += "d ";
                                    } else {
                                        r += t.charAt(i);
                                    }
                                    colonCount--;
                                } else {
                                    r += t.charAt(i);
                                }
                            }
                            return r;
                        }
                    }
                });
            }
        } catch (e) {
            console.log("InfoSticker: createInfoSticker: ", e.toString());
        }

        function InfoSticker_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
                    createInfoSticker();
                    window.InfoSticker.Base.getInstance().initialize();
                } else {
                    window.setTimeout(InfoSticker_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log("InfoSticker_checkIfLoaded: ", e.toString());
            }
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(InfoSticker_checkIfLoaded, 1000);
        }
    }
    try {
        var InfoStickerScript = document.createElement("script");
        InfoStickerScript.innerHTML = "(" + InfoSticker_main.toString() + ")();";
        InfoStickerScript.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(InfoStickerScript);
        }
    } catch (e) {
        console.log("InfoSticker: init error: ", e.toString());
    }
})();

// ==UserScript==
// @name Tiberium Alliances - New Resource Trade Window
// @description Implements a new TradeOverlay class, allowing you to select individual, multiple or all bases to transfer resources from
// @namespace NewTradeOverlay
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.4.9
// @author Chiantii
// ==/UserScript==
(function () {
	var NewTradeOverlay_main = function () {
		console.log('NewTradeOverlay loaded');
		function CreateNewTradeOverlay() {
			qx.Class.undefine("webfrontend.gui.trade.TradeOverlay");
			qx.Class.define("webfrontend.gui.trade.TradeOverlay", {
				type : "singleton",
				extend : webfrontend.gui.OverlayWindow,
				construct : function () {
					webfrontend.gui.OverlayWindow.call(this);
					this.set({
						autoHide : false
					});
					this.clientArea.setLayout(new qx.ui.layout.HBox());
					this.clientArea.setMargin(0);
					this.clientArea.setWidth(464);
					this.setTitle(qx.locale.Manager.tr("tnf:trade window title"));
					this.clientArea.add(new qx.ui.core.Spacer(), {
						flex : 1
					});
					this.clientArea.add(this.tradeWindow());
					this.clientArea.add(new qx.ui.core.Spacer(), {
						flex : 1
					});
					this.tradeConfirmationWidget = new webfrontend.gui.widgets.confirmationWidgets.TradeConfirmationWidget();
				},
				members : {
					activated : false,
					transferWindowTableSelectedRows : null,
					modifier : null,
					tradeWindowTable : null,
					tableColumnModel : null,
					resourceTransferType : null,
					transferAmountTextField : null,
					largeTiberiumImage : null,
					costToTradeLabel : null,
					transferFromBaseLabel : null,
					totalResourceAmount : null,
					selectedRowData : null,
					selectedRow : null,
					tradeButton : null,
					tenPercentButton : null,
					twentyFivePercentButton : null,
					fiftyPercentButton : null,
					seventyFivePercentButton : null,
					oneHundredPercentButton : null,
					resourceSelectionRadioButtons : null,
					selectAllNoneButton : null,
					userDefinedMinimumAmount : -1,
					userDefinedMaxDistance : -1,
					tradeConfirmationWidget : null,
					activate : function () {
						if (!this.activated) {
							ClientLib.Vis.VisMain.GetInstance().PlayUISound("audio/ui/OpenWindow");
							phe.cnc.base.Timer.getInstance().addListener("uiTick", this._onTick, this);
							this.selectedRowData = null;
							this.selectedRow = null;
							this.transferWindowTableSelectedRows = [];
							this.transferAmountTextField.setValue("");
							this.costToTradeLabel.setValue("0");
							this.userDefinedMinimumAmount = -1;
							this.userDefinedMaxDistance = -1;
							this.resourceTransferType = ClientLib.Base.EResourceType.Tiberium;
							this.tradeWindowTable.resetCellFocus();
							this.tradeWindowTable.resetSelection();
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:select base for transfer"));
							this.resourceSelectionRadioButtons.resetSelection();
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_tiberium.png");
							this.TableRowFilter();
							this.tableColumnModel.sortByColumn(2, true);
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:select all" : "Select All"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:select none" : "Select None"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:cannot manually modify" : "Cannot be modified with multiple rows selected"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:trading with multiple bases" : "Trading with multiple bases"
							});
							qx.locale.Manager.getInstance().addTranslation("en_US", {
								"tnf:percent buttons" : "Please use one of the Percent buttons"
							});
							this.activated = true;
						}
					},
					deactivate : function () {
						if (this.activated) {
							phe.cnc.base.Timer.getInstance().removeListener("uiTick", this._onTick, this);
							this.tradeWindowTable.resetSelection();
							this.tradeWindowTable.resetCellFocus();
							this.transferAmountTextField.setValue("");
							this.transferWindowTableSelectedRows = [];
							this.costToTradeLabel.setValue("");
							this.selectedRow = null;
							this.selectedRowData = null;
							this.modifier = 1;
							this.activated = false;
						}
					},
					getFilterMinimimAmount : function () {
						return this.userDefinedMinimumAmount;
					},
					getFilterDistanceLimit : function () {
						return this.userDefinedMaxDistance;
					},
					tradeWindow : function () {
						var tradeWindowContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(2)).set({
							marginTop : 10,
							marginBottom : 10,
							marginLeft : 4
						});

						tradeWindowContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});

						var selectResourcesLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:select resources:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13"
						});
						var resourceSelectionContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
							height : 26
						});
						var tiberiumToggleButton = new qx.ui.form.ToggleButton(null, "webfrontend/ui/common/icon_res_large_tiberium.png").set({
							appearance : "button-toggle",
							width : 84
						});
						tiberiumToggleButton.setUserData("key", ClientLib.Base.EResourceType.Tiberium);
						var tiberiumImage = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_tiberium.png").set({
							width : 24,
							height : 24,
							scale : true
						});
						var crystalToggleButton = new qx.ui.form.ToggleButton(null, "webfrontend/ui/common/icon_res_large_crystal.png").set({
							appearance : "button-toggle",
							width : 84
						});
						crystalToggleButton.setUserData("key", ClientLib.Base.EResourceType.Crystal);
						var crystalImage = new qx.ui.basic.Image("webfrontend/ui/common/icn_res_chrystal.png").set({
							width : 24,
							height : 24,
							scale : true
						});
						resourceSelectionContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						resourceSelectionContainer.add(selectResourcesLabel);
						resourceSelectionContainer.add(tiberiumToggleButton);
						resourceSelectionContainer.add(new qx.ui.core.Spacer().set({
							width : 2
						}));
						resourceSelectionContainer.add(crystalToggleButton);
						resourceSelectionContainer.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						this.resourceSelectionRadioButtons = new qx.ui.form.RadioGroup(tiberiumToggleButton, crystalToggleButton);
						this.resourceSelectionRadioButtons.addListener("changeSelection", this.ChangeResourceType, this);

						tradeWindowContainer.add(resourceSelectionContainer);

						var currentServer = ClientLib.Data.MainData.GetInstance().get_Server();
						var tradeCostToolTip = qx.locale.Manager.tr("tnf:trade costs %1 (+%2 per field)", currentServer.get_TradeCostMinimum(), currentServer.get_TradeCostPerField());
						var searchContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(2));
						var searchBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
						var minimumAmountLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:minimum amount:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13"
						});
						this.minimumAmountTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed")
						});
						this.minimumAmountTextField.setFilter(/[0-9]/);
						this.minimumAmountTextField.setMaxLength(12);
						var maxDistanceLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:distance limit:")).set({
							textColor : "text-label",
							alignY : "middle",
							font : "font_size_13",
							toolTipText : tradeCostToolTip
						});
						this.maxDistanceTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed")
						});
						this.maxDistanceTextField.setFilter(/[0-9]/);
						this.maxDistanceTextField.setMaxLength(3);
						searchBox.add(minimumAmountLabel);
						searchBox.add(this.minimumAmountTextField);
						searchBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						searchBox.add(maxDistanceLabel);
						searchBox.add(this.maxDistanceTextField);
						searchBox.add(new qx.ui.core.Spacer(), {
							flex : 2
						});

						searchContainer.add(searchBox);

						var searchButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:search")).set({
							width : 300,
							maxWidth : 300,
							marginBottom : 8,
							marginTop : 4,
							alignX : "center"
						});
						searchButton.addListener("execute", this.TableRowFilter, this);
						searchContainer.add(searchButton);

						//tradeWindowContainer.add(searchContainer);

						this.selectAllNoneButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:select all")).set({
							enabled : true,
							//appearance: "button-forum-light",
							//textColor: "text-label",
							width : 160
						});

						this.selectAllNoneButton.addListener("click", this.SelectAllRows, this);

						tradeWindowContainer.add(this.selectAllNoneButton);

						this.tableColumnModel = new webfrontend.data.SimpleColFormattingDataModel();
						this.tableColumnModel.setColumns([qx.locale.Manager.tr("tnf:base"), qx.locale.Manager.tr("tnf:distance"), qx.locale.Manager.tr("tnf:$ / 1000"), qx.locale.Manager.tr("tnf:amount"), "Amount", "Max", "ID"], ["Base", "Distance", "Credits", "AmountDesc", "Amount", "Max", "ID"]);
						this.tableColumnModel.setColumnSortable(0, true);
						this.tableColumnModel.setColumnSortable(1, true);
						this.tableColumnModel.setColumnSortable(2, true);
						this.tableColumnModel.setColumnSortable(3, true);
						this.tableColumnModel.setSortMethods(3, this.AmountSort);
						this.tradeWindowTable = new webfrontend.gui.trade.TradeBaseTable(this.tableColumnModel).set({
							statusBarVisible : false,
							columnVisibilityButtonVisible : false,
							maxHeight : 300
						});
						
						if (PerforceChangelist >= 436669) { // 15.3 patch
							var eventType = "cellTap";
						} else { //old
							var eventType = "cellClick";
						}
						this.tradeWindowTable.addListener(eventType, this.TradeWindowTableCellClick, this);
						this.tradeWindowTable.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
						this.tradeWindowTable.setDataRowRenderer(new webfrontend.gui.trade.TradeBaseTableRowRenderer(this.tradeWindowTable));
						this.tradeWindowTable.showCellToolTip = true;
						var tradeWindowTableColumnModel = this.tradeWindowTable.getTableColumnModel();
						tradeWindowTableColumnModel.setDataCellRenderer(0, new qx.ui.table.cellrenderer.String());
						tradeWindowTableColumnModel.setDataCellRenderer(1, new qx.ui.table.cellrenderer.Number());
						tradeWindowTableColumnModel.setDataCellRenderer(2, new qx.ui.table.cellrenderer.Number());
						tradeWindowTableColumnModel.setHeaderCellRenderer(2, new qx.ui.table.headerrenderer.Default());
						tradeWindowTableColumnModel.getHeaderCellRenderer(2).setToolTip(tradeCostToolTip);
						tradeWindowTableColumnModel.setDataCellRenderer(3, new webfrontend.gui.trade.TradeBaseTableCellRenderer());
						tradeWindowTableColumnModel.setColumnWidth(0, 160);
						tradeWindowTableColumnModel.setColumnWidth(1, 60);
						tradeWindowTableColumnModel.setColumnWidth(2, 100);
						tradeWindowTableColumnModel.setColumnVisible(4, false);
						tradeWindowTableColumnModel.setColumnVisible(5, false);
						tradeWindowTableColumnModel.setColumnVisible(6, false);
						tradeWindowContainer.add(this.tradeWindowTable);

						var transferAmountContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());
						var transferAmountBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(2)).set({
							minHeight : 36
						});
						this.largeTiberiumImage = new qx.ui.basic.Image("webfrontend/ui/common/icon_res_large_tiberium.png").set({
							alignY : "middle",
							width : 22,
							height : 20,
							scale : true
						});
						this.transferFromBaseLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:select base for transfer")).set({
							rich : true,
							textColor : "text-label",
							marginBottom : 2,
							alignY : "middle",
							maxWidth : 182
						});
						this.transferAmountTextField = new qx.ui.form.TextField("").set({
							toolTipText : qx.locale.Manager.tr("tnf:only numbers allowed"),
							enabled : false,
							width : 208,
							marginRight : 1
						});
						this.transferAmountTextField.setFilter(/[0-9]/);
						this.transferAmountTextField.setMaxLength(20);
						this.transferAmountTextField.addListener("input", this.ResourceAmountChanged, this);
						transferAmountBox.add(this.largeTiberiumImage);
						transferAmountBox.add(this.transferFromBaseLabel);
						var percentButtonsBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
							marginTop : 2
						});
						this.tenPercentButton = new webfrontend.ui.SoundButton("10%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.tenPercentButton.addListener("execute", this.TenPercent, this);
						this.twentyFivePercentButton = new webfrontend.ui.SoundButton("25%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.twentyFivePercentButton.addListener("execute", this.TwentyFivePercent, this);
						this.fiftyPercentButton = new webfrontend.ui.SoundButton("50%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.fiftyPercentButton.addListener("execute", this.FiftyPercent, this);
						this.seventyFivePercentButton = new webfrontend.ui.SoundButton("75%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.seventyFivePercentButton.addListener("execute", this.SeventyFivePercent, this);
						this.oneHundredPercentButton = new webfrontend.ui.SoundButton("100%").set({
							enabled : false,
							appearance : "button-forum-light",
							textColor : "text-label",
							width : 42
						});
						this.oneHundredPercentButton.addListener("execute", this.OneHundredPercent, this);
						percentButtonsBox.add(this.tenPercentButton);
						percentButtonsBox.add(this.twentyFivePercentButton);
						percentButtonsBox.add(this.fiftyPercentButton);
						percentButtonsBox.add(this.seventyFivePercentButton);
						percentButtonsBox.add(this.oneHundredPercentButton);
						transferAmountContainer.add(transferAmountBox);
						transferAmountContainer.add(this.transferAmountTextField);
						transferAmountContainer.add(percentButtonsBox);
						var tradeCostContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
							alignX : "center",
							maxWidth : 148
						});
						var tradeCostLabel = new qx.ui.basic.Label(qx.locale.Manager.tr("tnf:costs:")).set({
							textColor : "text-label",
							marginBottom : 2,
							font : "font_size_13_bold",
							width : 148,
							textAlign : "center"
						});
						var tradeCostBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
							alignX : "center",
							allowGrowX : true,
							marginTop : 10
						});
						this.costToTradeLabel = new qx.ui.basic.Label().set({
							textColor : "text-value",
							alignY : "middle",
							font : "font_size_14_bold",
							marginLeft : 3
						});
						var dollarImage = new qx.ui.basic.Image("webfrontend/ui/common/icon_res_large_credits.png").set({
							width : 18,
							height : 20,
							scale : true,
							AutoFlipH : false
						});
						tradeCostBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						tradeCostBox.add(dollarImage);
						tradeCostBox.add(this.costToTradeLabel);
						tradeCostBox.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						this.tradeButton = new webfrontend.ui.SoundButton(qx.locale.Manager.tr("tnf:trade")).set({
							width : 196,
							enabled : false
						});
						this.tradeButton.addListener("execute", this.TradeWithBases, this);
						tradeCostContainer.add(tradeCostLabel);
						tradeCostContainer.add(tradeCostBox);
						tradeCostContainer.add(this.tradeButton);
						var tradeWindowCanvas = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({
							decorator : new qx.ui.decoration.Background().set({
								backgroundRepeat : 'no-repeat',
								backgroundImage : "webfrontend/ui/menues/resource_transfer/bgr_restransfer_summary.png"
							})
						});
						tradeWindowCanvas.add(transferAmountContainer, {
							left : 50,
							top : 5
						});
						tradeWindowCanvas.add(tradeCostContainer, {
							left : 285,
							top : 18
						});
						tradeWindowCanvas.add(this.tradeButton, {
							left : 134,
							top : 100
						});
						tradeWindowContainer.add(tradeWindowCanvas);
						return tradeWindowContainer;
					},
					TableRowFilter : function () {
						var tableArray = [];
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null) {
							this.userDefinedMaxDistance = this.maxDistanceTextField.getValue() == "" ? -1 : parseInt(this.maxDistanceTextField.getValue(), 10);
							this.userDefinedMinimumAmount = this.minimumAmountTextField.getValue() == "" ? -1 : parseInt(this.minimumAmountTextField.getValue(), 10);
							var allCities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
							for (var currentBase in allCities.d) {
								if (currentCity.get_Id() != currentBase && allCities.d[currentBase].IsOwnBase()) {
									var otherCity = allCities.d[currentBase];
									var currentBaseID = currentBase;
									var otherCityName = otherCity.get_Name();
									var distance = ClientLib.Base.Util.CalculateDistance(currentCity.get_X(), currentCity.get_Y(), otherCity.get_X(), otherCity.get_Y());
									var costToTrade = currentCity.CalculateTradeCostToCoord(otherCity.get_X(), otherCity.get_Y(), 1000);
									var resourceAmount = Math.floor(otherCity.GetResourceCount(this.resourceTransferType));
									var maxResources = Math.floor(otherCity.GetResourceMaxStorage(this.resourceTransferType));
									var disqualifyDistance = false;
									var disqualifyAmount = false;
									if (this.userDefinedMaxDistance != -1 && this.userDefinedMaxDistance < distance)
										disqualifyDistance = true;
									if (this.userDefinedMinimumAmount != -1 && this.userDefinedMinimumAmount > resourceAmount)
										disqualifyAmount = true;
									if (!disqualifyDistance && !disqualifyAmount) {
										var formattedAmount = phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount);
										tableArray.push({
											Base : otherCityName,
											Distance : distance,
											Credits : costToTrade,
											AmountDesc : formattedAmount,
											Amount : resourceAmount,
											Max : maxResources.toString(),
											ID : currentBaseID
										});
									}
								}
							}
							this.tableColumnModel.setDataAsMapArray(tableArray, true);
							this.selectedRow = null;
							this.selectedRowData = null;
							this.tradeWindowTable.resetCellFocus();
							this.MaintainTradeWindow();
						}
					},
					SelectAllRows : function () {
						if (this.tradeWindowTable.getSelectionModel().getSelectedCount() != this.tableColumnModel.getRowCount()) {
							this.tradeWindowTable.getSelectionModel().setSelectionInterval(0, this.tableColumnModel.getRowCount() - 1);
							this.transferAmountTextField.setValue("");
							this.totalResourceAmount = 0;
							this.costToTradeLabel.setValue("0");
							this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select none"));
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trading with multiple bases"));
							this.UpdateSelectedRows(this.tableColumnModel.getRowData(0));
							this.selectedRowData = this.tableColumnModel.getRowData(0);
						} else {
							this.tradeWindowTable.resetSelection();
							this.tradeWindowTable.resetCellFocus();
							this.transferAmountTextField.setValue("");
							this.transferWindowTableSelectedRows = [];
							this.SetCostLabel();
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:only numbers allowed"));
							this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:select base for transfer"));
							this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
						}
					},
					AmountSort : function (bI, bJ) {
						if (bI[4] < bJ[4])
							return -1;
						if (bI[4] > bJ[4])
							return 1;
						return 0;
					},
					UpdateSelectedRows : function (rowData) {
						this.transferWindowTableSelectedRows = [];

						var localRows = [];
						var colModel = this.tableColumnModel;

						this.tradeWindowTable.getSelectionModel().iterateSelection(function (index) {
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(colModel.getRowData(index).ID);
							if (city != null && city.CanTrade() == ClientLib.Data.ETradeError.None)
								localRows.push(colModel.getRowData(index));
						});
						this.transferWindowTableSelectedRows = localRows;

					},
					TradeWindowTableCellClick : function (e) {

						var rowData = this.tableColumnModel.getRowData(e.getRow());
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(rowData.ID);

						this.modifier = 0;
						this.transferAmountTextField.setValue("");
						this.SetCostLabel();

						if (city != null && city.CanTrade() == ClientLib.Data.ETradeError.None) {
							this.selectedRow = e.getRow();
							this.selectedRowData = rowData;

							this.UpdateSelectedRows();

							if (this.transferWindowTableSelectedRows.length == 1)
								this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trade with %1", "<b>" + rowData.Base + "</b>"));
							if (this.transferWindowTableSelectedRows.length > 1)
								this.transferFromBaseLabel.setValue(qx.locale.Manager.tr("tnf:trading with multiple bases"));

						}

						this.MaintainTradeWindow();

					},
					ChangeResourceType : function (e) {
						var userObject = e.getData()[0];
						this.transferAmountTextField.setValue("");
						this.transferWindowTableSelectedRows = [];
						this.SetCostLabel();
						this.tradeWindowTable.resetSelection();
						this.tradeWindowTable.resetCellFocus();
						this.resourceTransferType = userObject.getUserData("key");
						if (this.resourceTransferType == ClientLib.Base.EResourceType.Tiberium) {
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_tiberium.png");
						} else {
							this.largeTiberiumImage.setSource("webfrontend/ui/common/icon_res_large_crystal.png");
						}
						this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
						this.MaintainTradeWindow();
					},
					ResourceAmountChanged : function () {
						this.modifier = 1;
						this.SetCostLabel();
					},
					CalculateTradeCost : function () {
						this.totalTransferAmount = 0;

						if (this.transferWindowTableSelectedRows.length > 0) {

							var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
							var selectedCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

							if (this.transferWindowTableSelectedRows.length > 1) {
								for (var base in this.transferWindowTableSelectedRows) {
									this.totalTransferAmount += cities[this.transferWindowTableSelectedRows[base].ID].CalculateTradeCostToCoord(selectedCity.get_PosX(), selectedCity.get_PosY(), this.transferWindowTableSelectedRows[base].Amount * this.modifier);
								}
							} else {
								this.totalTransferAmount += cities[this.selectedRowData.ID].CalculateTradeCostToCoord(selectedCity.get_PosX(), selectedCity.get_PosY(), parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, '')));
							}
							return this.totalTransferAmount;
						}
						return 0;
					},
					ModifyResourceAmount : function (modifier) {
						this.totalResourceAmount = 0;

						this.UpdateSelectedRows(this.selectedRowData);

						if (this.transferWindowTableSelectedRows.length > 0) {
							for (var base in this.transferWindowTableSelectedRows) {
								this.totalResourceAmount += Math.floor(this.transferWindowTableSelectedRows[base].Amount * modifier);
							}
							return this.totalResourceAmount;
						}
						return 0;
					},
					SetCostLabel : function () {
						var tradeCost = this.CalculateTradeCost();
						if (this.transferAmountTextField.getValue() == "")
							tradeCost = 0;
						this.costToTradeLabel.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompactAfterMillion(tradeCost).toString());
						this.costToTradeLabel.setToolTipText(phe.cnc.gui.util.Numbers.formatNumbers(tradeCost).toString());
						//this.MaintainTradeWindow();
					},
					TenPercent : function () {
						this.modifier = 0.1;
						var resourceAmount = this.ModifyResourceAmount(0.1);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					TwentyFivePercent : function () {
						this.modifier = 0.25;
						var resourceAmount = this.ModifyResourceAmount(0.25);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					FiftyPercent : function () {
						this.modifier = 0.5;
						var resourceAmount = this.ModifyResourceAmount(0.5);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					SeventyFivePercent : function () {
						this.modifier = 0.75;
						var resourceAmount = this.ModifyResourceAmount(0.75);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					OneHundredPercent : function () {
						this.modifier = 1;
						var resourceAmount = this.ModifyResourceAmount(1);
						this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
						this.SetCostLabel();
					},
					TradeWithBases : function () {
						var transferAmount = 0;
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (this.transferWindowTableSelectedRows.length > 0) {
							if (currentCity != null && this.transferAmountTextField.getValue() != "") {
								for (var base in this.transferWindowTableSelectedRows) {
									var currentBase = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.transferWindowTableSelectedRows[base].ID);
									if (currentBase != null && currentBase.CanTrade() == ClientLib.Data.ETradeError.None && currentCity.CanTrade() == ClientLib.Data.ETradeError.None) {
										this.tradeButton.setEnabled(false);
										if (this.transferWindowTableSelectedRows.length == 1) {
											transferAmount = parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, ''));
										} else {
											transferAmount = parseInt(this.transferWindowTableSelectedRows[base].Amount * this.modifier, 10);
										}
										ClientLib.Data.MainData.GetInstance().get_Player().AddCredits(-currentCity.CalculateTradeCostToCoord(currentBase.get_X(), currentBase.get_Y(), transferAmount));
										currentCity.AddResources(this.resourceTransferType, transferAmount);
										currentBase.AddResources(this.resourceTransferType, -transferAmount);
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("SelfTrade", {
											targetCityId : currentCity.get_Id(),
											sourceCityId : currentBase.get_Id(),
											resourceType : this.resourceTransferType,
											amount : transferAmount
										}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.TradeResult), null);
									}
								}

								this.tradeWindowTable.resetSelection();
								this.tradeWindowTable.resetCellFocus();
								this.transferWindowTableSelectedRows = [];
								this.transferAmountTextField.setValue("");
								this.selectAllNoneButton.setLabel(qx.locale.Manager.tr("tnf:select all"));
								this.SetCostLabel();
							}
						}
					},
					TradeResult : function (ce, result) {
						if (result != ClientLib.Base.EErrorCode.Success) {
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.selectedRowData.ID);
							this.tradeConfirmationWidget.showTradeError(this, null, city.get_Name());
						} else {
							this.SetCostLabel();
						}
						this.tradeButton.setEnabled(true);
					},
					UpdateTradeTableData : function () {
						var updatedResourceCount = [];
						var otherCity = null;
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null) {
							var transferWindowsTableData = this.tableColumnModel.getDataAsMapArray();
							for (var row in transferWindowsTableData) {
								otherCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(transferWindowsTableData[row].ID);
								if (otherCity != null && currentCity.get_Id() != otherCity.get_Id() && otherCity.IsOwnBase()) {
									var otherCityID = otherCity.get_Id();
									var otherCityName = otherCity.get_Name();
									var otherCityDistance = ClientLib.Base.Util.CalculateDistance(currentCity.get_X(), currentCity.get_Y(), otherCity.get_X(), otherCity.get_Y());
									var otherCityTradeCost = currentCity.CalculateTradeCostToCoord(otherCity.get_X(), otherCity.get_Y(), 1000);
									var otherCityResourceCount = Math.floor(otherCity.GetResourceCount(this.resourceTransferType));
									var otherCityMaxStorage = Math.floor(otherCity.GetResourceMaxStorage(this.resourceTransferType));
									var otherCityResourceCountFormatted = phe.cnc.gui.util.Numbers.formatNumbers(otherCityResourceCount);
									updatedResourceCount.push({
										Base : otherCityName,
										Distance : otherCityDistance,
										Credits : otherCityTradeCost,
										AmountDesc : otherCityResourceCountFormatted,
										Amount : otherCityResourceCount,
										Max : otherCityMaxStorage.toString(),
										ID : otherCityID
									});
								} else {
									updatedResourceCount.push(transferWindowsTableData[row]);
								}
							}
							this.tableColumnModel.setDataAsMapArray(updatedResourceCount, true, false);
							if (this.selectedRow != null) {
								var selectedRowData = this.tableColumnModel.getRowData(this.selectedRow);
								otherCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(selectedRowData.ID);
								if (otherCity != null && currentCity.get_Id() != otherCity.get_Id() && otherCity.IsOwnBase() && otherCity.CanTrade() != ClientLib.Data.ETradeError.None) {
									this.selectedRowData = null;
									this.selectedRow = null;
									this.tradeWindowTable.resetCellFocus();
								} else {
									this.selectedRowData = selectedRowData;
								}
							}
						}
					},
					MaintainTradeWindow : function () {

						var hasEnoughtCredits = false;
						var validResourceAmount = true;

						if (this.transferWindowTableSelectedRows.length > 0) {

							var resourcesInTextField = parseInt(this.transferAmountTextField.getValue().replace(/[^0-9]/g, ''));
							var tradeCost = this.CalculateTradeCost();
							var playerCreditCount = ClientLib.Data.MainData.GetInstance().get_Player().GetCreditsCount();

							if (playerCreditCount < tradeCost) {
								this.costToTradeLabel.setTextColor("text-error");
							} else {
								this.costToTradeLabel.resetTextColor();
							}

							var selectedBaseResourceAmount = parseInt(this.selectedRowData.Amount, 10);

							if (this.transferAmountTextField.getValue() != "" && this.transferWindowTableSelectedRows.length > 1) {
								//Automatically update the text field with the new resource amount each tick
								var resourceAmount = this.ModifyResourceAmount(this.modifier);
								this.transferAmountTextField.setValue(phe.cnc.gui.util.Numbers.formatNumbers(resourceAmount));
								this.SetCostLabel();
							}

							if (this.transferWindowTableSelectedRows.length == 1) {
								if (resourcesInTextField == 0 || selectedBaseResourceAmount < resourcesInTextField) {
									this.transferAmountTextField.setTextColor("text-error");
								} else {
									this.transferAmountTextField.resetTextColor();
								}
								validResourceAmount = resourcesInTextField > 0 && resourcesInTextField <= selectedBaseResourceAmount;
							}

							hasEnoughtCredits = playerCreditCount >= tradeCost;

						}

						this.tradeButton.setEnabled(this.transferWindowTableSelectedRows.length > 0 && hasEnoughtCredits && validResourceAmount && this.transferAmountTextField.getValue() != "");
						this.transferAmountTextField.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.tenPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.twentyFivePercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.fiftyPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.seventyFivePercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);
						this.oneHundredPercentButton.setEnabled(this.transferWindowTableSelectedRows.length > 0);

						this.transferAmountTextField.setReadOnly(this.transferWindowTableSelectedRows.length > 1);

						if (this.tradeWindowTable.getSelectionModel().getSelectedCount() > 1) {
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:percent buttons"));
						} else {
							this.transferAmountTextField.setToolTipText(qx.locale.Manager.tr("tnf:only numbers allowed"));
						}

					},
					_onTick : function () {
						var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						if (currentCity != null && currentCity.get_HasIncommingAttack()) {
							this.onBtnClose();
						}
						this.UpdateTradeTableData();
						this.MaintainTradeWindow();
					}
				}
			});
		}

		function NewTradeOverlay_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined' && typeof webfrontend.gui.trade.TradeOverlay !== 'undefined') {
					CreateNewTradeOverlay();
				} else {
					window.setTimeout(NewTradeOverlay_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("NewTradeOverlay_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(NewTradeOverlay_checkIfLoaded, 1000);
		}
	};

	try {
		var NewTradeOverlay = document.createElement("script");
		NewTradeOverlay.innerHTML = "(" + NewTradeOverlay_main.toString() + ")();";
		NewTradeOverlay.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(NewTradeOverlay);
		}
	} catch (e) {
		console.log("NewTradeOverlay: init error: ", e);
	}

})();

// ==UserScript==
// @name           Tiberium Alliances ReplayShare
// @version        0.3.4
// @namespace      https://openuserjs.org/users/petui
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @author         petui
// @description    Share combat reports with your friends in other alliances and worlds
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==
'use strict';

(function() {
	var main = function() {
		'use strict';

		function createReplayShare() {
			console.log('ReplayShare loaded');

			Parse.initialize('PmNW9dH7wrTFQmYgInbDVgGqagUOVPIzENRwzfWu', 'ajepOC4n9K44jh89s5WKtEa4v0hh3OMokxNqLqt0');
			var Replay = Parse.Object.extend('Replay', {
				/**
				 * @returns {Object}
				 */
				getData: function() {
					return this.get('data');
				},
				/**
				 * @param {Object} data
				 * @returns {Replay}
				 */
				setData: function(data) {
					this.set('data', data);
					return this;
				},
				/**
				 * @param {Object} data
				 * @returns {Boolean}
				 */
				equals: function(data) {
					return JSON.stringify(this.getData()) === JSON.stringify(data);
				}
			});

			qx.Class.define('ReplayShare', {
				type: 'singleton',
				extend: qx.core.Object,
				events: {
					lastReplayDataChange: 'qx.event.type.Data'
				},
				members: {
					lastReplayData: null,
					window: null,

					initialize: function() {
						this.initializeHacks();
						this.initializeEntryPoints();
					},

					initializeHacks: function() {
						if (ClientLib.Vis.Battleground.Battleground.prototype.LoadCombatDirect === undefined) {
							var onSimulateBattleMethodName = ClientLib.API.Battleground.prototype.SimulateBattle.toString()
								.match(/"SimulateBattle",\s?\{battleSetup:[a-z]+\},\s?\(new \$I\.[A-Z]{6}\)\.[A-Z]{6}\(this,this\.([A-Z]{6})\),\s?this\);/)[1];

							var loadCombatDirectMethodName = ClientLib.API.Battleground.prototype[onSimulateBattleMethodName].toString()
								.match(/\$I\.[A-Z]{6}\.[A-Z]{6}\(\)\.[A-Z]{6}\(\)\.([A-Z]{6})\(b\.d\);/)[1];

							ClientLib.Vis.Battleground.Battleground.prototype.LoadCombatDirect = ClientLib.Vis.Battleground.Battleground.prototype[loadCombatDirectMethodName];
						}

						var source = ClientLib.Vis.Battleground.Battleground.prototype.LoadCombatDirect.toString();
						var initCombatMethodName = source.match(/this\.([A-Z]{6})\(null,[a-z]\);}$/)[1];

						var context = this;
						var originalInitCombat = ClientLib.Vis.Battleground.Battleground.prototype[initCombatMethodName];

						ClientLib.Vis.Battleground.Battleground.prototype[initCombatMethodName] = function(extra, data) {
							originalInitCombat.call(this, extra, data);
							context.lastReplayData = data;
							context.fireDataEvent('lastReplayDataChange', data);
						};

						var originalOpenLink = webfrontend.gui.Util.openLink;
						webfrontend.gui.Util.openLink = function(url) {
							if (!context.handleLink(url)) {
								originalOpenLink.apply(this, arguments);
							}
						};
					},

					initializeEntryPoints: function() {
						var scriptsButton = qx.core.Init.getApplication().getMenuBar().getScriptsButton();
						scriptsButton.Add('ReplayShare', 'FactionUI/icons/icn_replay_speedup.png');

						var children = scriptsButton.getMenu().getChildren();
						var lastChild = children[children.length - 1];
						lastChild.addListener('execute', this.openWindow, this);

						var shareButton = new qx.ui.form.Button('Share').set({
							appearance: 'button-text-small',
							toolTipText: 'Open in ReplayShare',
							width: 80
						});
						shareButton.addListener('execute', this.onClickShare, this);
						qx.core.Init.getApplication().getReportReplayOverlay().add(shareButton, {
							right: 150,
							top: 12
						});
					},

					/**
					 * @param {String} key
					 * @returns {Object}
					 */
					getConfig: function(key) {
						var config = JSON.parse(localStorage.getItem('ReplayShare')) || {};
						return key in config ? config[key] : null;
					},

					/**
					 * @param {String} key
					 * @param {Object} value
					 */
					setConfig: function(key, value) {
						var config = JSON.parse(localStorage.getItem('ReplayShare')) || {};
						config[key] = value;
						localStorage.setItem('ReplayShare', JSON.stringify(config));
					},

					/**
					 * @param {String} url
					 * @returns {Boolean}
					 */
					handleLink: function(url) {
						var matches = url.match(/^https?:\/\/replayshare\.parseapp\.com\/([A-Za-z0-9]+)/);

						if (matches !== null) {
							var id = matches[1];

							if (this.getConfig('dontAsk')) {
								this.openWindow();
								this.window.download(id);
							}
							else {
								var context = this;
								var widget = new ReplayShare.ConfirmationWidget(url, function(dontAskAgain) {
									context.openWindow();
									context.window.download(id);

									if (dontAskAgain) {
										context.setConfig('dontAsk', true);
									}
								});
								widget.open();
							}

							return true;
						}

						return false;
					},

					openWindow: function() {
						if (this.window === null) {
							this.window = new ReplayShare.Window(this);
						}

						this.window.open();
					},

					onClickShare: function() {
						this.openWindow();
						this.window.onClickFetchReplayData();
					},

					/**
					 * @param {Object} replayData
					 * @returns {Boolean}
					 */
					tryPlay: function(replayData) {
						qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, -1, 0, 0);

						try {
							ClientLib.Vis.VisMain.GetInstance().get_Battleground().LoadCombatDirect(replayData);
						}
						catch (e) {
							console.log('ReplayShare::tryPlay', e.toString());
							return false;
						}

						return true;
					},

					/**
					 * @returns {Boolean}
					 */
					hasLastReplayData: function() {
						return this.lastReplayData !== null;
					},

					/**
					 * @returns {Object}
					 */
					getLastReplayData: function() {
						return this.lastReplayData;
					}
				}
			});

			qx.Class.define('ReplayShare.Window', {
				extend: qx.ui.window.Window,
				construct: function(replayShare) {
					qx.ui.window.Window.call(this);
					this.replayShare = replayShare;

					this.set({
						caption: 'ReplayShare',
						icon: 'FactionUI/icons/icn_replay_speedup.png',
						contentPaddingTop: 0,
						contentPaddingBottom: 2,
						contentPaddingRight: 6,
						contentPaddingLeft: 6,
						showMaximize: false,
						showMinimize: false,
						allowMaximize: false,
						allowMinimize: false,
						resizable: true
					});
					this.getChildControl('icon').set({
						scale: true,
						width: 20,
						height: 12,
						alignY: 'middle'
					});

					this.initializePosition();
					this.addListener('move', this.onWindowMove, this);
					this.setLayout(new qx.ui.layout.VBox());

					this.add(this.errorMessageLabel = new qx.ui.basic.Label().set({
						font: 'font_size_13',
						textColor: '#e44',
						visibility: 'excluded'
					}));

					var createPlayerGroupBox = function(legend, factionImage, nameLabel, baseLabel, allianceLabel) {
						var nameContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(4));
						nameContainer.add(factionImage.set({
							width: 18,
							height: 18,
							scale: true
						}));
						nameContainer.add(nameLabel);

						var groupBox = new qx.ui.groupbox.GroupBox(legend);
						groupBox.setLayout(new qx.ui.layout.Grid(2, 2)
							.setColumnFlex(0, 1)
							.setColumnFlex(1, 9)
						);
						groupBox.add(new qx.ui.basic.Label('Name:').set({ font: 'font_size_13_bold' }), { row: 0, column: 0 });
						groupBox.add(nameContainer, { row: 0, column: 1 });
						groupBox.add(new qx.ui.basic.Label('Base:').set({ font: 'font_size_13_bold' }), { row: 1, column: 0 });
						groupBox.add(baseLabel, { row: 1, column: 1 });
						groupBox.add(new qx.ui.basic.Label('Alliance:').set({ font: 'font_size_13_bold' }), { row: 2, column: 0 });
						groupBox.add(allianceLabel, { row: 2, column: 1 });

						return groupBox;
					};

					var detailsContainer = new qx.ui.container.Composite(new qx.ui.layout.Flow()).set({
						font: 'font_size_13',
						textColor: '#111'
					});
					this.add(detailsContainer);
					detailsContainer.add(createPlayerGroupBox('Attacker',
						this.attackerFactionImage = new qx.ui.basic.Image(),
						this.attackerNameLabel = new qx.ui.basic.Label(),
						this.attackerBaseLabel = new qx.ui.basic.Label(),
						this.attackerAllianceLabel = new qx.ui.basic.Label()
					).set({ width: 290 }));
					detailsContainer.add(createPlayerGroupBox('Defender',
						this.defenderFactionImage = new qx.ui.basic.Image(),
						this.defenderNameLabel = new qx.ui.basic.Label(),
						this.defenderBaseLabel = new qx.ui.basic.Label(),
						this.defenderAllianceLabel = new qx.ui.basic.Label()
					).set({ width: 290 }));

					this.add(this.timeOfAttackLabel = new qx.ui.basic.Label().set({
						alignX: 'right',
						textColor: '#aaa'
					}));

					var controlsContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(4)).set({
						marginBottom: 4,
						marginLeft: 2,
						marginTop: 4
					});
					this.add(controlsContainer);

					this.fetchReplayDataButton = new qx.ui.form.Button('Fetch').set({
						enabled: this.replayShare.hasLastReplayData(),
						toolTipText: 'Fetch most recently viewed replay or simulation'
					});
					this.fetchReplayDataButton.addListener('execute', this.onClickFetchReplayData, this);
					controlsContainer.add(this.fetchReplayDataButton, { flex: 1 });

					if (!this.replayShare.hasLastReplayData()) {
						this.replayShare.addListenerOnce('lastReplayDataChange', this.onLastReplayDataChanged, this);
					}

					this.watchReplayButton = new qx.ui.form.Button('Play').set({
						enabled: false,
						toolTipText: 'Watch loaded replay'
					});
					this.watchReplayButton.addListener('execute', this.onClickWatchReplay, this);
					controlsContainer.add(this.watchReplayButton, { flex: 1 });

					this.uploadButton = new qx.ui.form.Button('Get link').set({
						enabled: false,
						toolTipText: 'Get share link for loaded replay'
					});
					this.uploadButton.addListener('execute', this.onClickUpload, this);
					controlsContainer.add(this.uploadButton, { flex: 1 });
				},
				statics: {
					DefaultWidth: 300,
					DefaultHeight: null
				},
				members: {
					replayShare: null,
					sharePopup: null,
					errorMessageLabel: null,
					attackerFactionImage: null,
					attackerNameLabel: null,
					attackerBaseLabel: null,
					attackerAllianceLabel: null,
					defenderFactionImage: null,
					defenderNameLabel: null,
					defenderBaseLabel: null,
					defenderAllianceLabel: null,
					timeOfAttackLabel: null,
					fetchReplayDataButton: null,
					watchReplayButton: null,
					uploadButton: null,
					replay: null,

					initializePosition: function() {
						var bounds = this.replayShare.getConfig('bounds');

						if (bounds === null) {
							var baseNavBarX = qx.core.Init.getApplication().getBaseNavigationBar().getLayoutParent().getBounds().left;

							bounds = {
								left: baseNavBarX - ReplayShare.Window.DefaultWidth - 16,
								top: 75,
								width: ReplayShare.Window.DefaultWidth,
								height: ReplayShare.Window.DefaultHeight
							};
						}

						this.moveTo(bounds.left, bounds.top);
						this.setWidth(bounds.width);
						this.setHeight(bounds.height);
					},

					/**
					 * @param {qx.event.type.Data} event
					 */
					onWindowMove: function(event) {
						this.replayShare.setConfig('bounds', event.getData());
					},

					onLastReplayDataChanged: function() {
						this.fetchReplayDataButton.setEnabled(true);
					},

					onClickFetchReplayData: function() {
						var replayData = this.replayShare.getLastReplayData();
						replayData = JSON.parse(JSON.stringify(replayData));	// clone

						if (this.replay === null || !this.replay.equals(replayData)) {
							this.setReplay(new Replay().setData(replayData));
						}
					},

					onClickWatchReplay: function() {
						var replayData = this.replay.getData();

						if (!this.replayShare.tryPlay(replayData)) {
							this.errorMessageLabel.setValue('Error: Invalid replay data');
							this.errorMessageLabel.show();
						}
						else {
							this.errorMessageLabel.exclude();
						}
					},

					onClickUpload: function() {
						this.openSharePopup();

						if (this.replay.isNew()) {
							var context = this;

							this.replay.save(null, {
								success: function(replay) {
									context.sharePopup.setLinkURL('https://replayshare.parseapp.com/' + replay.id);
								},
								error: function(replay, error) {
									context.sharePopup.setError(error.message);
								}
							});
						}
						else {
							this.sharePopup.setLinkURL('https://replayshare.parseapp.com/' + this.replay.id);
						}
					},

					/**
					 * @param {Object} replayData
					 */
					setDetailsFromReplayData: function(replayData) {
						var isForgottenAttacker = replayData.af !== ClientLib.Base.EFactionType.GDIFaction && replayData.af !== ClientLib.Base.EFactionType.NODFaction;
						this.attackerFactionImage.setSource(phe.cnc.gui.util.Images.getFactionIcon(replayData.af));
						this.attackerNameLabel.setValue(isForgottenAttacker ? this.tr('tnf:mutants') : replayData.apn);
						this.attackerBaseLabel.setValue(this.getReplayAttackerBaseName(replayData));
						this.attackerAllianceLabel.setValue(isForgottenAttacker ? this.tr('tnf:mutants') : (replayData.aan || '-'));

						var isForgottenDefender = replayData.df !== ClientLib.Base.EFactionType.GDIFaction && replayData.df !== ClientLib.Base.EFactionType.NODFaction;
						this.defenderFactionImage.setSource(phe.cnc.gui.util.Images.getFactionIcon(isForgottenDefender ? ClientLib.Base.EFactionType.FORFaction : replayData.df));
						this.defenderNameLabel.setValue(isForgottenDefender ? this.tr('tnf:mutants') : replayData.dpn);
						this.defenderBaseLabel.setValue(this.getReplayDefenderBaseName(replayData));
						this.defenderAllianceLabel.setValue(isForgottenDefender ? this.tr('tnf:mutants') : (replayData.dan || '-'));

						this.timeOfAttackLabel.setValue(phe.cnc.Util.getDateTimeString(new Date(replayData.toa)));
					},

					/**
					 * @param {Object} replayData
					 * @returns {String}
					 */
					getReplayAttackerBaseName: function(replayData) {
						var attackerBaseName;

						switch (replayData.af) {
							case ClientLib.Base.EFactionType.FORFaction:
							case ClientLib.Base.EFactionType.NPCBase:
							case ClientLib.Base.EFactionType.NPCCamp:
							case ClientLib.Base.EFactionType.NPCOutpost:
								attackerBaseName = this.tr(replayData.an) + ' (' + replayData.abl + ')';
								break;
							default:
								attackerBaseName = replayData.an;
						}

						return attackerBaseName;
					},

					/**
					 * @param {Object} replayData
					 * @returns {String}
					 */
					getReplayDefenderBaseName: function(replayData) {
						var defenderBaseName;

						switch (replayData.df) {
							case ClientLib.Base.EFactionType.FORFaction:
							case ClientLib.Base.EFactionType.NPCBase:
							case ClientLib.Base.EFactionType.NPCCamp:
							case ClientLib.Base.EFactionType.NPCOutpost:
							case ClientLib.Base.EFactionType.NPCFortress:
								var defenderPlayerId = replayData.dpi;
								var type;

								switch (Math.abs(defenderPlayerId) % 100) {
									case ClientLib.Data.WorldSector.WorldObjectNPCCamp.ECampType.Beginner:
									case ClientLib.Data.WorldSector.WorldObjectNPCCamp.ECampType.Random:
										type = 'tnf:mutants camp';
										break;
									case ClientLib.Data.WorldSector.WorldObjectNPCCamp.ECampType.Cluster:
										type = 'tnf:mutants outpost';
										break;
									case ClientLib.Data.WorldSector.WorldObjectNPCCamp.ECampType.Fortress:
										type = 'tnf:centerhub short';
										break;
									default:
										type = 'tnf:mutants base';
								}

								defenderBaseName = this.tr(type) + ' (' + Math.floor(Math.abs(defenderPlayerId) / 100) + ')';
								break;
							default:
								defenderBaseName = replayData.dn;
						}

						return defenderBaseName;
					},

					/**
					 * @param {String} id
					 */
					download: function(id) {
						this.errorMessageLabel.exclude();
						this.resetFields('Loading...');

						var context = this;
						var query = new Parse.Query(Replay);
						query.get(id, {
							success: function(replay) {
								context.setReplay(replay);
							},
							error: function(replay, error) {
								context.errorMessageLabel.setValue('Error: ' + error.message);
								context.errorMessageLabel.show();

								if (context.replay !== null) {
									context.setDetailsFromReplayData(context.replay.getData());
								}
								else {
									context.resetFields(null);
								}
							}
						});
					},

					/**
					 * @param {Replay} replay
					 */
					setReplay: function(replay) {
						this.replay = replay;
						this.setDetailsFromReplayData(replay.getData());
						this.watchReplayButton.setEnabled(true);
						this.uploadButton.setEnabled(true);
					},

					openSharePopup: function() {
						if (this.sharePopup === null) {
							var bounds = this.getBounds();
							this.sharePopup = new ReplayShare.Window.ShareLink();
							this.sharePopup.moveTo(
								bounds.left - (this.sharePopup.getWidth() - bounds.width) / 2,
								bounds.top - (this.sharePopup.getHeight() - bounds.height) / 2
							);
						}

						this.sharePopup.open();
					},

					/**
					 * @param {String} label
					 */
					resetFields: function(label) {
						this.attackerFactionImage.setSource(null);
						this.attackerNameLabel.setValue(label);
						this.attackerBaseLabel.setValue(label);
						this.attackerAllianceLabel.setValue(label);
						this.defenderFactionImage.setSource(null);
						this.defenderNameLabel.setValue(label);
						this.defenderBaseLabel.setValue(label);
						this.defenderAllianceLabel.setValue(label);
						this.timeOfAttackLabel.setValue(label);
					}
				}
			});

			qx.Class.define('ReplayShare.Window.ShareLink', {
				extend: qx.ui.window.Window,
				construct: function() {
					qx.ui.window.Window.call(this);

					this.set({
						caption: 'Share link',
						allowMaximize: false,
						allowMinimize: false,
						showMinimize: false,
						showMaximize: false,
						showClose: true,
						resizable: false,
						padding: 1,
						textColor: '#aaa',
						width: 378,
						height: 98
					});
					this.setLayout(new qx.ui.layout.VBox());

					this.add(new qx.ui.basic.Label('Copy the link to share this replay with others'));
					this.add(this.linkField = new qx.ui.form.TextField().set({
						readOnly: true,
						focusable: true,
						placeholder: 'Loading...'
					}));
					this.add(this.errorMessageLabel = new qx.ui.basic.Label().set({
						textColor: '#e44',
						visibility: 'excluded'
					}));

					this.linkField.addListener('click', this.linkField.selectAllText, this.linkField);
					this.addListener('changeActive', this.onChangeActive, this);
				},
				members: {
					linkField: null,
					errorMessageLabel: null,

					/**
					 * @param {qx.event.type.Data} event
					 */
					onChangeActive: function(event) {
						if (!event.getData()) {
							this.close();
						}
					},

					open: function() {
						this.linkField.setValue(null);
						this.errorMessageLabel.exclude();
						qx.ui.window.Window.prototype.open.call(this);
					},

					/**
					 * @param {String} url
					 */
					setLinkURL: function(url) {
						this.linkField.setValue('[url]' + url + '[/url]');

						new qx.util.DeferredCall(function() {
							this.linkField.focus();
							this.linkField.selectAllText();
						}, this).schedule();
					},

					/**
					 * @param {String} error
					 */
					setError: function(error) {
						this.errorMessageLabel.setValue(error);
						this.errorMessageLabel.show();
					}
				}
			});

			qx.Class.define('ReplayShare.ConfirmationWidget', {
				extend: webfrontend.gui.CustomWindow,
				construct: function(url, callback) {
					webfrontend.gui.CustomWindow.call(this);
					this.callback = callback;
					this.url = url;

					this.set({
						caption: 'Open link',
						allowMaximize: false,
						allowMinimize: false,
						showMaximize: false,
						showMinimize: false,
						showClose: false,
						resizable: false,
						modal: true
					});
					this.setLayout(new qx.ui.layout.VBox(10));
					this.addListenerOnce('resize', this.center, this);

					this.add(new qx.ui.basic.Label('Would you like to open this link with ReplayShare?').set({
						rich: true,
						maxWidth: 360,
						wrap: true,
						textColor: 'white'
					}));

					var buttonContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(10).set({
						alignX: 'right'
					}));

					var yesDontAskButton = new webfrontend.ui.SoundButton('Yes and don\'t ask again');
					yesDontAskButton.addListener('execute', this.openReplayShareAndDontAsk, this);

					var yesButton = new webfrontend.ui.SoundButton('Yes');
					yesButton.addListener('execute', this.openReplayShare, this);

					var noButton = new webfrontend.ui.SoundButton('No');
					noButton.addListener('execute', this.openExternal, this);

					var cancelButton = new webfrontend.ui.SoundButton('Cancel');
					cancelButton.addListener('execute', this.close, this);

					buttonContainer.add(yesDontAskButton);
					buttonContainer.add(yesButton);
					buttonContainer.add(noButton);
					buttonContainer.add(cancelButton);
					this.add(buttonContainer);
				},
				members: {
					callback: null,
					url: null,

					openExternal: function() {
						this.close();
						qx.core.Init.getApplication().showExternal(this.url);
					},

					openReplayShareAndDontAsk: function() {
						this.close();
						this.callback.call(null, true);
					},

					openReplayShare: function() {
						this.close();
						this.callback.call(null, false);
					}
				}
			});
		}

		function waitForGame() {
			try {
				if (typeof Parse !== 'undefined' && typeof qx !== 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().initDone) {
					createReplayShare();
					ReplayShare.getInstance().initialize();
				}
				else {
					setTimeout(waitForGame, 1000);
				}
			}
			catch (e) {
				console.log('ReplayShare: ', e.toString());
			}
		}

		setTimeout(waitForGame, 1000);
	};

	var parseScript = document.createElement('script');
	parseScript.src = 'https://www.parsecdn.com/js/parse-1.2.19.min.js';
	parseScript.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(parseScript);

	var script = document.createElement('script');
	script.innerHTML = '(' + main.toString() + ')();';
	script.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(script);
})();

// ==UserScript==
// @name            Tiberium Alliances Battle Simulator V2
// @description     Allows you to simulate combat before actually attacking.
// @author          Eistee & TheStriker & VisiG & Lobotommi & XDaast
// @version         16.03.21
// @namespace       https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include         https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @icon            http://eistee82.github.io/ta_simv2/icon.png
// ==/UserScript==

(function () {
	var script = document.createElement("script");
	script.innerHTML = "(" + function () {
		function createClasses() {
			qx.Class.define("qx.ui.form.ModelButton", {					//				qx.ui.form.Button with model property
				extend : qx.ui.form.Button,
				include : [qx.ui.form.MModelProperty],
				implement : [qx.ui.form.IModel]
			});
			qx.Class.define("TABS", {									// [singleton]	Main Class
				type : "singleton",
				extend : qx.core.Object,
				construct : function () {
					try {
                        this.base(arguments);
						this.self(arguments).Init();
						document.createElement('img').src = "http://goo.gl/hPdG3K"; // http://goo.gl/#analytics/goo.gl/hPdG3K/month			please don't remove this Stats Counter
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up TABS constructor", e);
						console.groupEnd();
					}
				},
				statics : {
					_Init : [],
					addInit : function (func) {
						this._Init.push(func);
					},
					Init : function () {
						for (var i in this._Init)
							qx.Class.getByName(this._Init[i]).getInstance();
					}
				}
			});
			qx.Class.define("TABS.RES", {								// [static]		Ressources
				type : "static",
				statics : {
					getDisplayName : function (ETechName, EFactionType) {
						return ClientLib.Base.Tech.GetTechDisplayNameFromTechId(ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ETechName, EFactionType));
					}
				}
			});
			qx.Class.define("TABS.RES.IMG", {							// [static]		Ressources: Images
				type : "static",
				statics : {
					Menu : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAADAFBMVEUAAAAAAAAAAAAABgAAAgACDQAAAAAAAAAAAAAAAAAAAAAAAQCV3icGGAETNwQIDAIAAAABBgBwsi9KghoUKwZFih0YVQlpph4iZAksYg8AAQACCABlmxmr0ieayiuM3SFMsBR/wymM0CFtsSQ5bhVFfRgRNQaY1DOLzCZYiRVJqhSDuylc2RiQzCSb2S9epyqVzjOi4TgWZQwecxIGLQQEFgJJgB07exh3niGHwCSv0zG01y////9RkhuX+yaR/iGd2zj///2hpEb//vNllSRijx9yoS5s2RdpmyhorB6GpDjE5GKL2Spjoh9y5h1hqRd36h9nniGm/Stv6Rhc2BNn7hGs/yhwzh6ttUvy5Z24sFvD01vo3Y2zvk61r2X9+emoqEvHuXytqFv58cmswFG9x1JS3Q3DuXCTmkSgvUL49L6LqEaWr09osh2P/idTpxV3pym2ymr1/NqPuje3vV2ewFB2tSWWrEN8mjZupyv7+9iCsy3z+rpplCZs3hqjyUaFnDHY63uJzi6AvivP3W6On0KRrDlcsRDK32CY/yeS9SJitRSHwzHc5Y+Ot0JlmiOg7TWAozB4rSqC4huWp0qz2E1bxxNanR6s2Ex/+hZi4Q9zySKc0EB5zyFgqCOq8jJ4+xKf+yVVnRpMsBJooyij4D6F0iqr0lNt9BlzwyFz9hSM/Rt72CJo+g+ysVF3rivWxmyEqzLt3qJwvCPMw4O6r3BJihSwzE/Bw3fXzYja2I3QwHqpuFnj6Zd7oTCCmC+0ymbl04zLv2zx3qHz8Kzs3pehrUjK33ieskrp7ax99CK502j7/tDI2GdajhpHkhFquCNj1xSnsE/M6G7i8KJXkxl4nSajq1qz9jW+6FLL9Fjb9W2530+btEJhwxiS2jRsrx9/2yZGvQxy1h3L5mW24U1foRtSzg2oyVZWrhZevxFLnheO9x+B+xxo5hac4TyVyTt/yy5f0Bej9jGu/TS5/zJxqymF4ix86xxvwx168RNW0hGh4Cqb3yl69R2T+iQ+CJL9AAAAPHRSTlMAERguJDYNAQgEFSn2P1dIHDytf0uNaLV4iB8ypdnX6Lbe3sJ2gVDp6ZKoxufO9ann+JScbl2lpMXW4/FzYe/CAAACJklEQVQoz2IAA3YOAV4TYzNzI1NWLk4GBOBkEtE3/BIWFvb1s4EoKxs7TJyDRXRC59rQAL+A4BULgtTFmDih6pmFOlfVLVvmsNThvc/jYPv5qgLsYHEWoby02U1Nc2ZM9X7y1MHHfeYNFS6QDKPw/5DNPc3126NTzrZ03Lm11N1ughoHUANArDxpuWXVxZnREamxqS2Ntx18/Oy1WdgZ2IS78j3Xb0yJjViXEJN1ssP75tyHM+fzcTCw6D73rSwoL3Fyiop0trEpuux9f827hTJcDIKTFz8L3Od1LCFqQ7wNEFyZOmPu919yLAz8bxYF9ruVnig5FOkIkqhZPmf2mlBraQb+t7bTfUsLG48cPWwDAlUvPvwM//dXEDAG/tWv51X2HT9jE38wGajFubdv+crwVX+AEisWz1uSc7rIxjlm96bkrN671T0fw9daMTMw6zya7pJ9oMaxamdiemL6pbb65lefVltIMTBp+dl6uGQX7t21ZWtcklPDteL2lbOCJBkZOPhO5bvVuubs2RGXlJGxvy2zrPveAj1WTgZ2KYUAWw/XiorWKddbG8onTsrtBmkAxQavvPs2l3OutVO8vLwKPP3bL9orc4NjhI2PZ/L5q/1uHoG+kx74X6jLU+TlgEQ4o4hS17RFtkv8v3m+nBa6UJwVKA6RYZPW5LH7EfI7JNjeTkOChQMpNXCxSojLycpayogxM4LjFSHFJsDNzc3CxAZLPQCSE8MJTTlJqQAAAABJRU5ErkJggg==",
					Stats : "FactionUI/icons/icn_build_slots.png",
					Stop : "FactionUI/icons/icon_replay_stop_button.png",
					Arrange : {
						Left : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAMAAABBPP0LAAAA+VBMVEUAAABkZGT19fX39/fj4+MVFRXc3NwZGRlLS0sVFRXd3d0LCwvu7u7JycmioqKIiIgkJCSIiIj///9WVlb7+/vW1tbx8fHo6Ohqampubm7MzMx1dXX///+tra0eHh6srKyzs7N6enrNzc309PS7u7v7+/vQ0NC/v7/ExMT7+/tgYGChoaHu7u5bW1vs7OzAwMB0dHSsrKzS0tJ1dXWsrKxFRUUpKSkmJiahoaHAwMCampomJibV1dWJiYm5ubk0NDQ3Nzfp6en///+vr69BQUGTk5NBQUHj4+PX19f+/v7Jycnj4+PR0dHc3NyXl5eMjIz09PSCgoIyMjIoy70QAAAAU3RSTlMADweHhxMFCgIDhwUbAgsODh4UHoeHh4cFCgQUChQeD4cchw6HDw8ehx4vOoc8hzw6PDwKhxQaKB4UGh4ZKCgyHhQoNSgyOSiHNYc8hzU8PDw8EBrmavEAAACkSURBVAjXJYtVFoJQAEQfgoh0iYggIgJSit3dHftfjI/D/M3cO4DBddtxbNc1TY7rqwTQdJH2fZr2vIlgVSsEyImyjKKK0i5jZKmBqHDYXT/3XqcbHpeZQaNQiFIeSMNCEeS25yfkr28SHOb5dFgoUfZvNeuDHwXw6WofvpM4Pq3HtdTADQwjL48b5LBTBGBYYyZYkrQZpRiG0ViWQxCE5yGG/Q+LDRO5PtzwzwAAAABJRU5ErkJggg==",
						Center : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAMAAABBPP0LAAAA51BMVEU6OjpTU1P///9MTEz39/f8/Pz+/v7///9TU1MAAADv7+/7+/uVlZWDg4MvLy/39/fj4+MvLy/9/f3e3t7X19c9PT3U1NStra2ZmZlkZGTo6Oj09PRxcXGVlZXOzs7Ly8t+fn7c3NyZmZnc3NyysrL8/Pyenp6JiYlZWVm/v7/Pz8+7u7vo6Oj4+PiTk5Pj4+PT09Ps7Ozv7+/JycnT09PAwMB+fn7b29t1dXWTk5P////j4+M+Pj5PT0////+kpKSFhYWenp7Kysq1tbX////+/v62trbBwcHf39/CwsLk5ORubm5TU1MeHJAiAAAATXRSTlMCHocFAgoPAw0AhwUNDw8NDR4eh4c7Hjs8O4eHCgoFChkDDxOHhx4eLw+Hhx6HOoeHhzqHOjw8hxQUFBkSGhoaIy8vhy8jHocvh4c8PH2ldZMAAACpSURBVAjXHYzXAkIAFECvvUIUJRWZmYnS3nv8//dEz2cAzhEiSYrNILAsvo8BUMR6L8uxqt4931z2ATjSdZNEZ6e9Sasd8hhQonzN89m80+2mJ69RJeQN1XW29261M/TIA4ya8bPm5UfTxggNMLTZul9kYfGInC1WGeq5k5baV1GUv4ETG7TaF6/o4qDmAIChCPvgI4gkSbuVQTHA4JzR4GlaEAR6MMSZHypxEyTcEZPmAAAAAElFTkSuQmCC",
						Right : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAMAAABBPP0LAAAA9lBMVEXw8PAODg7s7OzW1tbs7OxgYGD9/f0AAABPT08VFRUBAQHU1NTk5OQAAABwcHD9/f38/PxfX1/7+/v9/f3S0tKjo6MRERE/Pz/AwMDp6enIyMh0dHRubm709PTR0dGSkpKmpqZBQUFubm66urro6OjOzs6xsbH19fXd3d3Hx8dBQUGhoaGGhobw8PBWVlb///8AAAB1dXWenp6vr69nZ2cAAAAKCgoiIiIHBwetra1dXV2hoaFnZ2e1tbUpKSmxsbEVFRX39/fPz8+MjIw3Nze6uropKSnY2NjY2Njj4+NkZGTQ0NDe3t6ysrKvr6/R0dGXl5fDw8OkAsOLAAAAUnRSTlMCDoeHBQUKAAIGCQqHFAoPFBSHHg8PHhyHh4c7DQ4UHocPGh4ehyiHhx48OjyHPBoaFIcSCigZFDWHKB41hyiHPCiHMjWHPB4tMjyHhzI8OTw8yAOJWAAAAKdJREFUCNcli1UCgkAABVcBWVBBGglJQULs7u66/2UEfZ/zZgBACzpN6zwvCIJGYRCAQqXFce4pcGaG3aEgQGmWZX2/ma+WGkidwTKD21xen2cUq/PpH7jn7L8jN0WWCACKtcB7RO9YTcL9ckQAlM9nd9or8mIyJDPD8XbqNQmP6/GgnCZosWcgW0U+rEyzmwIcxyHF2JIkimK7TMIfwPqaZeXSkQT8Aiw9E02m3A8KAAAAAElFTkSuQmCC"
					},
					Arrows : {
						Up : "webfrontend/theme/arrows/up.png",
						Down : "webfrontend/theme/arrows/down.png",
						Left : "webfrontend/theme/arrows/left.png",
						Right : "webfrontend/theme/arrows/right.png"
					},
					Flip : {
						H : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvgAADr4B6kKxwAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAACo0lEQVQ4T2PABkJq+rjmH7nUdPrV119nXn/9s+7S/R1NCzc4rTx1a8ay41c7WuYsl5WRkWGEKicM4honSux7+Pb42Tdf/4LwwacfP7Wv3pOz8sydVavO3lk5f9cx15jCGhaocsJgys7jAUeffXiGZODn1lW7Claeub16xelb64C4Ma+lnx+qHD/wySpjXnnqeifQq79RDFy5qxBq4PqVp25Ombxmhw4QQHXhAdH1fWL77r++DDToD04Dz9xeteDAuajc1gn4ve0UkciU3zvT4vTrb79ghmEzEOTtNefvL8pomyrExsYG1Y0FxNT18my4dH8KKGYJGLgeGDkrJqzeoR9ZWMMM1Y4Jercctjr46N1NZMNwGQhy5YpTN/PzWvu5oNpRgUdGGdOc/WfST736guJdPAauX3HiekfH4vXyUCNQQVhtn8D2W8+2nEGKDEIGgrw9a+cxeyUlJdRE7pldxZjcOlXj6LOPj9ENw2cgkL9m2dHL2TGljZxQoyAgrKaHdfmZWxVA734jxUAQXnXm9tS6yXMlTG2doKYBQWrrZIHNVx4sBWrG8C4I4zNw5enbi+ftPuGSVNGMiO2edXstjz3/9BabYSBMwMC1y09cr2pbvFEIbJh/RinrlI1744CRAc9q6BifgSC8+tzdpT1rdmuAE3l80yTZ/UglCzZMyECQ+MID58NiyprYGGbuO5t1/MWn99gMgmFCBoLwytO3Wir6ZggzLDpycQJyyYINH3r66WP7mj25wPDCZ+DsSRv2WTAsPHCmChgh7068/PwTGz4OlFtz+npX7/p9LstP3WwA4hZseMXp2w3Td56wYyho6lSdsfNY6YzdJydM330CBYPEQHIVnROVIzMLOIvb+oVq+meIVPVOQ8EgsYqeqUJJpfWcAKWymA2EsiGlAAAAAElFTkSuQmCC",
						V : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvgAADr4B6kKxwAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAClklEQVQ4T2MgB/iVd7CH1/SI9G3YF7D4+JUlR59/+nH61dff8w6cnQBVgh+EN01hjGqZxpY9eYlI39YjNvMOni888Ojd0aNP3z8+8/rr77Nvvv498+brn/n7T0+HasEOIlpnMIc1TBIJq+vX3HjtSd/ma4/WnHj59TtQM9gQZAwycO7ekzOhWhHAo6CRKaymh6d69krVWfvOpO19+O700WcfYS75g24QDGMYCPQWS1TzFKmktmkmO26/XLHv3sujwHD5CVSM0xBkDDcwqLJLcMHxa/FLT17rOPz04/PTb779wqaBEIYbOHv/2ZxjLz6/BglgU0gshhu44MDZaUABigwDYbCB+07NZJi29WDFvrsvLu+78/waDnwdixgmBpoxbduhMgav6ETZyNxSm+j8creoPPJwdH4FkC6z9o1NlWaYsnGf0ZpzdyeuOnt3GSUYZMZUoFkMk7ceDV555s6KFadvrQPi9eRioBmrpu44EcLQvHijweJDFzJWnrrRu/LM7VVASbIMBupdPWX78TAGt8Bw1oSsfL6qCbMUp2855Lvk+LXGFaduTgcpACpci64RF4YbCALe3t6MLi4uTC6BEZwhqXnC3Us3ms7acSxi+YlrLaDwgRqO1SAYRjEQGYAMB2JmN08v9vCMAuGWafPVFu4/E7H8+NWaVWduz11x+vYakgyEAaChDEBXM3r5+rOGJmVwlzZ1Svav2m656NDFghWnbk0FGrAEaBAoSMBhTtBAdAByuZOrO4t7eDxfWlWz7IztR70WHDiXA3T1jFVn76wE4hVTtx8PhionDoBc7eDgwODq4ckcFJPEHp9TJNA0e5n6tPU77ZcfvZLaNnupClQpeQDkaktLS2Y3Hz9Ov8h4XltnV3YAMTRvewY5T1wAAAAASUVORK5CYII="
					},
					DisableUnit : "FactionUI/icons/icon_disable_unit.png",
					Undo : "FactionUI/icons/icon_refresh_funds.png",
					Outcome : {
						total_defeat : "FactionUI/icons/icon_reports_total_defeat.png",
						victory : "FactionUI/icons/icon_reports_victory.png",
						total_victory : "FactionUI/icons/icon_reports_total_victory.png"
					},
					Enemy : {
						All : "FactionUI/icons/icon_arsnl_show_all.png",
						Base : "FactionUI/icons/icon_arsnl_base_buildings.png",
						Defense : "FactionUI/icons/icon_def_army_points.png"
					},
					Defense : {
						Infantry : "FactionUI/icons/icon_arsnl_def_squad.png",
						Vehicle : "FactionUI/icons/icon_arsnl_def_vehicle.png",
						Building : "FactionUI/icons/icon_arsnl_def_building.png"
					},
					Offense : {
						Infantry : "FactionUI/icons/icon_arsnl_off_squad.png",
						Vehicle : "FactionUI/icons/icon_arsnl_off_vehicle.png",
						Aircraft : "FactionUI/icons/icon_arsnl_off_plane.png"
					},
					RepairCharge : {
						Base : "webfrontend/ui/icons/icn_repair_points.png",
						Offense : "webfrontend/ui/icons/icn_repair_off_points.png",
						Infantry : "webfrontend/ui/icons/icon_res_repair_inf.png",
						Vehicle : "webfrontend/ui/icons/icon_res_repair_tnk.png",
						Aircraft : "webfrontend/ui/icons/icon_res_repair_air.png"
					},
					Resource : {
						Tiberium : "webfrontend/ui/common/icn_res_tiberium.png",
						Crystal : "webfrontend/ui/common/icn_res_chrystal.png",
						Credits : "webfrontend/ui/common/icn_res_dollar.png",
						Power : "webfrontend/ui/common/icn_res_power.png",
						ResearchPoints : "webfrontend/ui/common/icn_res_research_mission.png",
						Transfer : "FactionUI/icons/icon_transfer_resource.png"
					},
					Simulate : "FactionUI/icons/icon_attack_simulate_combat.png",
					CNCOpt : "http://cncopt.com/favicon.ico",
					one:"https://www.openmerchantaccount.com/img/swap1_2.png",
					two:"https://www.openmerchantaccount.com/img/swap2_3.png",
					three:"https://www.openmerchantaccount.com/img/swap3_4.png"
				}
			});
			qx.Class.define("TABS.SETTINGS", {							// [static]		Settings
				type : "static",
				statics : {
					__name : null,
					__store : null,
					__upload : null,
					__file : null,
					__reader : null,
					_Init : function () {
						var localStorage = ClientLib.Base.LocalStorage,
							player = ClientLib.Data.MainData.GetInstance().get_Player(),
							server = ClientLib.Data.MainData.GetInstance().get_Server();
						this.__name = "TABS.SETTINGS." + player.get_Id() + "." + server.get_WorldId();
						if (this.__store === null) {
							if (localStorage.get_IsSupported() && localStorage.GetItem(this.__name) !== null)
								this.__store = localStorage.GetItem(this.__name);
							else
								this.__store = {};
						}
						this.__store.$$Player = player.get_Name();
						this.__store.$$Server = server.get_Name();
						this.__store.$$Update = Date.now();
						if (localStorage.get_IsSupported())
							localStorage.SetItem(this.__name, this.__store);
					},
					get : function (prop, init) { //get or initialize a prop
						this._Init();
						if (this.__store[prop] === undefined && init !== undefined) {
							this.__store[prop] = init;
							this._Init();
						}
						return this.__store[prop];
					},
					set : function (prop, value) {
						this._Init();
						this.__store[prop] = value;
						this._Init();
						return value;
					},
					"delete" : function (prop) {
						this._Init();
						delete this.__store[prop];
						this._Init();
						return true;
					},
					reset : function () {
						var player = ClientLib.Data.MainData.GetInstance().get_Player(),
							server = ClientLib.Data.MainData.GetInstance().get_Server();
						this.__name = "TABS.SETTINGS." + player.get_Id() + "." + server.get_WorldId();
						window.localStorage.removeItem(this.__name);
						this.__store = null;
						this.__name = null;
						this._Init();
					},
					save : function () {
						var textFileAsBlob = new Blob([JSON.stringify(this.__store)], {
								type : 'text/plain'
							}),
							downloadLink = document.createElement("a");
						downloadLink.download = "TABS_Backup.json";
						if (window.webkitURL !== undefined)
							downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
						else {
							downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
							downloadLink.style.display = "none";
							document.body.appendChild(downloadLink);
						}
						downloadLink.click();
					},
					load : function () {
						if (this.__upload === null) {
							this.__upload = document.createElement("input");
							this.__upload.type = "file";
							this.__upload.id = "files";
							this.__upload.addEventListener('change', (function (e) {
									var files = e.target.files;
									if (files.length > 0)
										this.__reader.readAsText(files[0], 'UTF-8');
								}).bind(this), false);
							this.__upload.style.display = "none";
							document.body.appendChild(this.__upload);
						}
						if (this.__reader === null) {
							this.__reader = new FileReader();
							this.__reader.addEventListener("load", (function (e) {
									var fileText = e.target.result;
									try {
										var fileObject = JSON.parse(fileText);
										this.reset();
										for (var i in fileObject)
											this.set(i, fileObject[i]);
										alert("Game will reload now.");
										window.location.reload();
									} catch (f) {
										console.group("Tiberium Alliances Battle Simulator V2");
										console.error("Error loading file", f);
										console.groupEnd();
									}
								}).bind(this), false);
						}
						this.__upload.click();
					}
				}
			});
			qx.Class.define("TABS.UTIL.Formation", {					// [static]		Utilities for Army Formation
				type : "static",
				statics : {
					GetFormation : function (cityid, ownid) {
						var CityId = ((cityid !== undefined && cityid !== null) ? cityid : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId()),
							OwnCity = ((ownid !== undefined && ownid !== null) ? ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(ownid) : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity());
						if (OwnCity !== null)
							return OwnCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(CityId);
						else
							return null;
					},
					GetUnits : function (cityid, ownid) {
						var formation = this.GetFormation(cityid, ownid);
						if (formation !== null) {
							var units = formation.get_ArmyUnits();
							if (units !== null)
								return units.l;
						}
						return null;
					},
					GetUnitById : function (id, cityid, ownid) {
						var units = this.GetUnits(cityid, ownid);
						if (units !== null)
							for (var i = 0; i < units.length; i++)
								if (units[i].get_Id() == id)
									return units[i];
						return null;
					},
					Get : function (cityid, ownid) {
						/**
						 *	[{
						 *		id: [Number],		// UnitId (internal)
						 *		gid: [Number],		// Garnison Id (internal)
						 *		gs: [Number],		// Garnison State
						 *		i: [Number],		// MdbId
						 *		l: [Number],		// Level
						 *		h: [Number],		// Health
						 *		enabled: [Bool],	// Enabled (internal)
						 *		x: [Number],		// CoordX
						 *		y: [Number],		// CoordY
						 *		t: [Bool]			// IsTransportedCityEntity (internal/todo:kommt weg)
						 *	},{...}]
						 */
						var units = this.GetUnits(cityid, ownid),
							formation = [];
						if (units !== null) {
							for (var i = 0; i < units.length; i++) {
								formation.push({
									id : units[i].get_Id(),
									gid : (units[i].get_IsTransportedCityEntity() ? units[i].get_TransporterCityEntity().get_Id() : (units[i].get_TransportedCityEntity() !== null ? units[i].get_TransportedCityEntity().get_Id() : 0)),
									gs : (units[i].get_IsTransportedCityEntity() ? 2 : (units[i].get_TransportedCityEntity() !== null ? 1 : 0)),
									i : units[i].get_MdbUnitId(),
									l : units[i].get_CurrentLevel(),
									h : Math.ceil(units[i].get_Health()),
									enabled : units[i].get_Enabled(),
									x : units[i].get_CoordX(),
									y : units[i].get_CoordY(),
									t : units[i].get_IsTransportedCityEntity()
								});
							}
							return formation;
						}
						return null;
					},
					Set : function (formation, cityid, ownid) {
						/**
						 *	[{
						 *		id: [Number],		// UnitId
						 *		enabled: [Bool],	// Enabled
						 *		x: [Number],		// CoordX
						 *		y: [Number],		// CoordY
						 *		t: [Bool]			// IsTransportedCityEntity
						 *	},{...}]
						 */
						var CityId = ((cityid !== undefined && cityid !== null) ? cityid : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId()),
							OwnId = ((ownid !== undefined && ownid !== null) ? ownid : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId()),
							unit,
							target,
							freePos,
							transported = [],
							i,
							targetFormation = this.GetFormation(CityId, OwnId),
							getFreePos = function (formation) {
								for (var x = 0; x < ClientLib.Base.Util.get_ArmyMaxSlotCountX(); x++) {
									for (var y = 0; y < ClientLib.Base.Util.get_ArmyMaxSlotCountY(); y++) {
										if (formation.GetUnitByCoord(x, y) === null)
											return {
												x : x,
												y : y
											};
									}
								}
								return null;
							},
							freeTransported = function (unit, freePos) {
								if (unit.get_TransportedCityEntity() !== null)
									unit = unit.get_TransportedCityEntity();
								if (unit.get_IsTransportedCityEntity() && freePos !== null)
									unit.MoveBattleUnit(freePos.x, freePos.y);
							};
						if (targetFormation !== null) {
							for (i = 0; i < formation.length; i++) {
								unit = this.GetUnitById(formation[i].id, CityId, OwnId);
								if (formation[i].gs == 2) {
									transported.push(formation[i]);
									continue;
								}

								target = targetFormation.GetUnitByCoord(formation[i].x, formation[i].y);
								freePos = getFreePos(targetFormation);
								if (freePos !== null && target !== null)
									freeTransported(target, freePos);

								freePos = getFreePos(targetFormation);
								if (freePos !== null)
									freeTransported(unit, freePos);

								unit.set_Enabled(formation[i].enabled);
								target = targetFormation.GetUnitByCoord(formation[i].x, formation[i].y);
								if (target !== null && ClientLib.Base.Unit.CanBeTransported(target.get_UnitGameData_Obj(), unit.get_UnitGameData_Obj()))
									target.MoveBattleUnit(unit.get_CoordX(), unit.get_CoordY());
								else
									unit.MoveBattleUnit(formation[i].x, formation[i].y);
							}
							//transported units
							for (i = 0; i < transported.length; i++) {
								unit = this.GetUnitById(transported[i].id, CityId, OwnId);
								target = targetFormation.GetUnitByCoord(transported[i].x, transported[i].y);

								freePos = getFreePos(targetFormation);
								if (freePos !== null && target !== null)
									freeTransported(target, freePos);

								freePos = getFreePos(targetFormation);
								if (freePos !== null)
									freeTransported(unit, freePos);

								target = targetFormation.GetUnitByCoord(transported[i].x, transported[i].y);
								if (target !== null)
									target.set_Enabled(true);

								unit.set_Enabled(true);
								unit.MoveBattleUnit(transported[i].x, transported[i].y);
								if (target !== null)
									target.set_Enabled(transported[i].enabled);
                                else
                                    unit.set_Enabled(transported[i].enabled);
								if (target !== null)
                                    target.MoveBattleUnit(transported[i].x, transported[i].y);
							}
						}
					},
					Merge : function (formation, attacker) {
						for (var i in formation) {
							for (var j in attacker) {
								if (formation[i].gs == attacker[j].gs &&
									formation[i].i == attacker[j].i &&
									formation[i].l == attacker[j].l &&
									formation[i].x == attacker[j].x &&
									formation[i].y == attacker[j].y) {
									for (var k in attacker[j])
										formation[i][k] = attacker[j][k];
								}
							}
						}
						return formation;
					},
					IsFormationInCache : function () {
						var cache = TABS.CACHE.getInstance().check(this.Get());
						return (cache.result !== null);
					},
					Mirror : function (formation, pos, sel) {
						switch (pos) {
						case "h":
						case "v":
							break;
						default:
							return;
						}

						for (var i = 0; i < formation.length; i++) {
							if ((sel === null || formation[i].y == sel) && pos == "h")
								formation[i].x = Math.abs(formation[i].x - ClientLib.Base.Util.get_ArmyMaxSlotCountX() + 1);

							if ((sel === null || formation[i].x == sel) && pos == "v")
								formation[i].y = Math.abs(formation[i].y - ClientLib.Base.Util.get_ArmyMaxSlotCountY() + 1);
						}
						return formation;
					},
					SwapLines:function(formation, lineA, lineB) {
						lineAZoroBasedIndex = lineA - 1;
						lineBZeroBasedIndex = lineB - 1;
						for (var f = 0;f < formation.length;f++) {
							  
							 switch(formation[f].y) {
								case lineAZoroBasedIndex:
									formation[f].y = lineBZeroBasedIndex;
									break;
								case lineBZeroBasedIndex:
									formation[f].y = lineAZoroBasedIndex;
									break;							    
							}
						}
						return formation;
					},
					Shift : function (formation, pos, sel) {
						var v_shift = 0,
							h_shift = 0;

						switch (pos) {
						case "u":
							v_shift = -1;
							break;
						case "d":
							v_shift = 1;
							break;
						case "l":
							h_shift = -1;
							break;
						case "r":
							h_shift = 1;
							break;
						default:
							return;
						}

						for (var i = 0; i < formation.length; i++) {
							if ((sel === null || formation[i].y === sel) && (pos == "l" || pos == "r"))
								formation[i].x += h_shift;

							if ((sel === null || formation[i].x === sel) && (pos == "u" || pos == "d"))
								formation[i].y += v_shift;

							switch (formation[i].x) {
							case ClientLib.Base.Util.get_ArmyMaxSlotCountX():
								formation[i].x = 0;
								break;
							case -1:
								formation[i].x = ClientLib.Base.Util.get_ArmyMaxSlotCountX() - 1;
								break;
							}

							switch (formation[i].y) {
							case ClientLib.Base.Util.get_ArmyMaxSlotCountY():
								formation[i].y = 0;
								break;
							case -1:
								formation[i].y = ClientLib.Base.Util.get_ArmyMaxSlotCountY() - 1;
								break;
							}
						}
						return formation;
					},
					set_Enabled : function (formation, set, EUnitGroup) {
						if (set === null)
							set = true;
						var all = (EUnitGroup != ClientLib.Data.EUnitGroup.Infantry && EUnitGroup != ClientLib.Data.EUnitGroup.Vehicle && EUnitGroup != ClientLib.Data.EUnitGroup.Aircraft);
						for (var i = 0; i < formation.length; i++) {
							var unitGroup = this.GetUnitGroupTypeFromUnit(ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(formation[i].i));
							if (all || (EUnitGroup == unitGroup && formation[i].gs === 0))
								formation[i].enabled = set;
						}

						return formation;
					},
					toggle_Enabled : function (formation, EUnitGroup) {
						var all = (EUnitGroup != ClientLib.Data.EUnitGroup.Infantry && EUnitGroup != ClientLib.Data.EUnitGroup.Vehicle && EUnitGroup != ClientLib.Data.EUnitGroup.Aircraft);
						for (var i = 0, num_total = 0, num_enabled = 0; i < formation.length; i++) {
							var unitGroup = this.GetUnitGroupTypeFromUnit(ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(formation[i].i));
							if (all || (EUnitGroup == unitGroup && formation[i].gs === 0)) {
								num_total++;
								if (formation[i].enabled)
									num_enabled++;
							}
						}

						return this.set_Enabled(formation, (num_enabled < (num_total / 2)), EUnitGroup);
					},
					GetUnitGroupTypeFromUnit : function (unit) {
						if (unit === null)
							return ClientLib.Data.EUnitGroup.None;
						if (unit.pt == ClientLib.Base.EPlacementType.Offense)
							switch (unit.mt) {
							case ClientLib.Base.EUnitMovementType.Feet:
								return ClientLib.Data.EUnitGroup.Infantry;
							case ClientLib.Base.EUnitMovementType.Wheel:
							case ClientLib.Base.EUnitMovementType.Track:
								return ClientLib.Data.EUnitGroup.Vehicle;
							case ClientLib.Base.EUnitMovementType.Air:
							case ClientLib.Base.EUnitMovementType.Air2:
								return ClientLib.Data.EUnitGroup.Aircraft;
							}
						else if (unit.pt == ClientLib.Base.EPlacementType.Defense)
							return ClientLib.Data.EUnitGroup.Defense;
						else
							return ClientLib.Data.EUnitGroup.None;
					}
				}
			});
			qx.Class.define("TABS.UTIL.Stats", {						// [static]		Utilities for Stats calculation
				type : "static",
				statics : {
					get_LootFromCurrentCity : function () {
						var LootFromCurrentCity = ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity(),
							LootClass = new TABS.STATS.Entity.Resource(),
							Loot = LootClass.getAny();
						if (LootFromCurrentCity !== null) {
							for (var i = 0; i < LootFromCurrentCity.length; i++)
								Loot[LootFromCurrentCity[i].Type] = LootFromCurrentCity[i].Count;
							LootClass.setAny(Loot);
							return LootClass;
						} else
							return null;
					},
					get_RepairCosts : function (mdbId, level, HealthPoints, AttackCounter) {
						var ResourcesClass = new TABS.STATS.Entity.Resource(),
							Resources = ResourcesClass.getAny(),
							unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(mdbId),
							Health,
							dmgRatio,
							costs;
						AttackCounter = (AttackCounter !== undefined && AttackCounter !== null ? AttackCounter : 0);

						if (HealthPoints instanceof TABS.STATS.Entity.HealthPoints)
							Health = HealthPoints;
						else
							Health = new TABS.STATS.Entity.HealthPoints(HealthPoints);

						if (Health.getStart() != Health.getEnd()) {
							dmgRatio = (Health.getStart() - Health.getEnd()) / Health.getMax();
							if (unit.pt !== ClientLib.Base.EPlacementType.Offense || ClientLib.API.Util.GetOwnUnitRepairCosts === undefined)
								costs = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() !== null ? ClientLib.API.Util.GetUnitRepairCosts(level, mdbId, dmgRatio) : null;
							else
								costs = ClientLib.API.Util.GetOwnUnitRepairCosts(level, mdbId, dmgRatio);

							for (var i = 0; costs !== null && i < costs.length; i++)
								switch (costs[i].Type) {
								case ClientLib.Base.EResourceType.Tiberium:
								case ClientLib.Base.EResourceType.Crystal:
								case ClientLib.Base.EResourceType.Gold:
								case ClientLib.Base.EResourceType.ResearchPoints:
									Resources[costs[i].Type] = costs[i].Count * Math.pow(0.7, AttackCounter);
									break;
								default:
									Resources[costs[i].Type] = costs[i].Count;
									break;
								}
						}

						if (Resources[ClientLib.Base.EResourceType.ResearchPoints] > 0)
							Resources[ClientLib.Base.EResourceType.ResearchPoints] = Math.max(1, Math.floor(Resources[ClientLib.Base.EResourceType.ResearchPoints] * dmgRatio));

						ResourcesClass.setAny(Resources);
						return ResourcesClass;
					},
					get_BuildingInfo : function (cityid) {
						var BuildingInfo = {},
							City = ((cityid !== undefined && cityid !== null) ? ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cityid) : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity());
						if (City !== null) {
							var CityBuildingsData = City.get_CityBuildingsData(),
								get_BuildingInfo = function (Building) {
									if (Building !== null)
										return {
											MdbId : Building.get_TechGameData_Obj().c,
											x : Building.get_CoordX(),
											y : Building.get_CoordY()
										};
									else
										return null;
								};

							BuildingInfo.Construction_Yard = get_BuildingInfo(CityBuildingsData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard) || CityBuildingsData.GetBuildingByMDBId(ClientLib.Base.ETech.FOR_Fortress_ConstructionYard));
							BuildingInfo.Command_Center = get_BuildingInfo(CityBuildingsData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Command_Center));
							BuildingInfo.Barracks = get_BuildingInfo(CityBuildingsData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Barracks));
							BuildingInfo.Factory = get_BuildingInfo(CityBuildingsData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Factory));
							BuildingInfo.Airport = get_BuildingInfo(CityBuildingsData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Airport));
							BuildingInfo.Defense_Facility = get_BuildingInfo(CityBuildingsData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility));
							BuildingInfo.Defense_HQ = get_BuildingInfo(CityBuildingsData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_HQ));
							BuildingInfo.Support = get_BuildingInfo(CityBuildingsData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Air) || CityBuildingsData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Art) || CityBuildingsData.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Support_Ion));
						}
						return BuildingInfo;
					},
					_GetModuleByType : function (modules, type) {
						for (var i = 0; i < modules.length; i++) {
							if (modules[i].t == type)
								return modules[i];
						}
						return null;
					},
					_patchUnitLifePoints : function (unit, activeModules) {
						var newUnit = qx.lang.Object.clone(unit, true),
							module = this._GetModuleByType(newUnit.m, ClientLib.Base.EUnitModuleType.HitpointOverride);

						if (module !== null && activeModules.indexOf(module.i) != -1)
							newUnit.lp = module.h;

						return newUnit;
					},
					get_UnitMaxHealthByLevel : function (level, unit, bonus, activeModules) {
						return Math.floor(ClientLib.API.Util.GetUnitMaxHealthByLevel(level, this._patchUnitLifePoints(unit, activeModules), bonus)) * 16;
					},
					get_Stats : function (data) {
						try {
							var StatsClass = new TABS.STATS(),
								Stats = StatsClass.getAny(),
								sim = {},
								buildings = data.d.s,
								buildingInfo = this.get_BuildingInfo(data.d.di),
								efficiency = 0,
								ve_level = 1,
								defender = data.d.d,
								attacker = data.d.a,
								unit,
								unitHealthPoints = new TABS.STATS.Entity.HealthPoints(),
								unitRepairCosts,
								unitMaxHealthPoints,
								i;

							function addObject(a, b) {
								for (var i in a)
									a[i] += b[i];
								return a;
							}

							//simulation
							for (i = 0; i < data.e.length; i++)
								sim[data.e[i].Key] = data.e[i].Value;

							//BattleDuration
							Stats.BattleDuration = (data.d.cs * 100) + (data.d.cs < (data.d.md * 10) ? 3000 : 0);

							for (i = 0; i < buildings.length; i++) {
								unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(buildings[i].i);

								//maxHealth
								switch (data.d.df) {
								case ClientLib.Base.EFactionType.GDIFaction:
								case ClientLib.Base.EFactionType.NODFaction:
									unitMaxHealthPoints = this.get_UnitMaxHealthByLevel(buildings[i].l, unit, true, data.d.dm);
                                    unitHealthPoints.setMax(sim[buildings[i].ci].mh);
                                    unitHealthPoints.setStart(sim[buildings[i].ci].h);
									break;
								default:
									unitMaxHealthPoints = this.get_UnitMaxHealthByLevel(buildings[i].l, unit, false, data.d.dm);
                                    unitHealthPoints.setMax(Math.max(unitMaxHealthPoints, buildings[i].h * 16));
                                    unitHealthPoints.setStart(buildings[i].h * 16);
									break;
								}
                                
								unitHealthPoints.setEnd(sim[buildings[i].ci].h);
								unitRepairCosts = this.get_RepairCosts(buildings[i].i, buildings[i].l, unitHealthPoints);

								addObject(Stats.Enemy.Overall.HealthPoints, unitHealthPoints.getAny());
								addObject(Stats.Enemy.Overall.Resource, unitRepairCosts.getAny());

								addObject(Stats.Enemy.Structure.HealthPoints, unitHealthPoints.getAny());
								addObject(Stats.Enemy.Structure.Resource, unitRepairCosts.getAny());

								switch (parseInt(ClientLib.Base.Tech.GetTechNameFromTechId(unit.tl, unit.f), 10)) {
								case ClientLib.Base.ETechName.Construction_Yard:
									addObject(Stats.Enemy.Construction_Yard.HealthPoints, unitHealthPoints.getAny());
									addObject(Stats.Enemy.Construction_Yard.Resource, unitRepairCosts.getAny());
									break;
								case ClientLib.Base.ETechName.Command_Center:
									addObject(Stats.Enemy.Command_Center.HealthPoints, unitHealthPoints.getAny());
									addObject(Stats.Enemy.Command_Center.Resource, unitRepairCosts.getAny());
									break;
								case ClientLib.Base.ETechName.Barracks:
									addObject(Stats.Enemy.Barracks.HealthPoints, unitHealthPoints.getAny());
									addObject(Stats.Enemy.Barracks.Resource, unitRepairCosts.getAny());
									break;
								case ClientLib.Base.ETechName.Factory:
									addObject(Stats.Enemy.Factory.HealthPoints, unitHealthPoints.getAny());
									addObject(Stats.Enemy.Factory.Resource, unitRepairCosts.getAny());
									break;
								case ClientLib.Base.ETechName.Airport:
									addObject(Stats.Enemy.Airport.HealthPoints, unitHealthPoints.getAny());
									addObject(Stats.Enemy.Airport.Resource, unitRepairCosts.getAny());
									break;
								case ClientLib.Base.ETechName.Defense_Facility:
									addObject(Stats.Enemy.Defense_Facility.HealthPoints, unitHealthPoints.getAny());
									addObject(Stats.Enemy.Defense_Facility.Resource, unitRepairCosts.getAny());
									efficiency = 0.7 * (unitHealthPoints.getEnd() / unitHealthPoints.getMax());
									ve_level = buildings[i].l;
									break;
								case ClientLib.Base.ETechName.Defense_HQ:
									addObject(Stats.Enemy.Defense_HQ.HealthPoints, unitHealthPoints.getAny());
									addObject(Stats.Enemy.Defense_HQ.Resource, unitRepairCosts.getAny());
									break;
								case ClientLib.Base.ETechName.Support_Air:
								case ClientLib.Base.ETechName.Support_Ion:
								case ClientLib.Base.ETechName.Support_Art:
									addObject(Stats.Enemy.Support.HealthPoints, unitHealthPoints.getAny());
									addObject(Stats.Enemy.Support.Resource, unitRepairCosts.getAny());
									break;
								}

								if (buildingInfo.Construction_Yard !== undefined) {
									if (buildingInfo.Construction_Yard !== null && buildingInfo.Construction_Yard.x == buildings[i].x && buildingInfo.Construction_Yard.y < buildings[i].y) {
										Stats.Enemy.Construction_Yard.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Construction_Yard.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Construction_Yard.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
									if (buildingInfo.Command_Center !== null && buildingInfo.Command_Center.x == buildings[i].x && buildingInfo.Command_Center.y < buildings[i].y) {
										Stats.Enemy.Command_Center.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Command_Center.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Command_Center.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
									if (buildingInfo.Barracks !== null && buildingInfo.Barracks.x == buildings[i].x && buildingInfo.Barracks.y < buildings[i].y) {
										Stats.Enemy.Barracks.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Barracks.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Barracks.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
									if (buildingInfo.Factory !== null && buildingInfo.Factory.x == buildings[i].x && buildingInfo.Factory.y < buildings[i].y) {
										Stats.Enemy.Factory.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Factory.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Factory.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
									if (buildingInfo.Airport !== null && buildingInfo.Airport.x == buildings[i].x && buildingInfo.Airport.y < buildings[i].y) {
										Stats.Enemy.Airport.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Airport.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Airport.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
									if (buildingInfo.Defense_Facility !== null && buildingInfo.Defense_Facility.x == buildings[i].x && buildingInfo.Defense_Facility.y < buildings[i].y) {
										Stats.Enemy.Defense_Facility.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Defense_Facility.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Defense_Facility.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
									if (buildingInfo.Defense_HQ !== null && buildingInfo.Defense_HQ.x == buildings[i].x && buildingInfo.Defense_HQ.y < buildings[i].y) {
										Stats.Enemy.Defense_HQ.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Defense_HQ.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Defense_HQ.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
									if (buildingInfo.Support !== null && buildingInfo.Support.x == buildings[i].x && buildingInfo.Support.y < buildings[i].y) {
										Stats.Enemy.Support.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Support.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Support.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
								}
							}
							for (i = 0; i < defender.length; i++) {
								unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(defender[i].i);

								//maxHealth
								switch (data.d.df) {
								case ClientLib.Base.EFactionType.GDIFaction:
								case ClientLib.Base.EFactionType.NODFaction:
									unitMaxHealthPoints = this.get_UnitMaxHealthByLevel(defender[i].l, unit, true, data.d.dm);
									break;
								default:
									unitMaxHealthPoints = this.get_UnitMaxHealthByLevel(defender[i].l, unit, false, data.d.dm);
									break;
								}

								unitHealthPoints.setMax(Math.max(unitMaxHealthPoints, defender[i].h * 16));
								unitHealthPoints.setStart(defender[i].h * 16);
								unitHealthPoints.setEnd(sim[defender[i].ci].h);
								unitHealthPoints.setRep((((defender[i].h * 16) - (sim[defender[i].ci].h)) * efficiency * ve_level) / Math.max(ve_level, defender[i].l));
								unitRepairCosts = this.get_RepairCosts(defender[i].i, defender[i].l, unitHealthPoints, defender[i].ac);

								addObject(Stats.Enemy.Overall.HealthPoints, unitHealthPoints.getAny());
								addObject(Stats.Enemy.Overall.Resource, unitRepairCosts.getAny());
								addObject(Stats.Enemy.Defense.HealthPoints, unitHealthPoints.getAny());
								addObject(Stats.Enemy.Defense.Resource, unitRepairCosts.getAny());
								if (unit.ptt == ClientLib.Base.EArmorType.NONE) {
									addObject(Stats.Enemy.DefenseNonArmored.HealthPoints, unitHealthPoints.getAny());
									addObject(Stats.Enemy.DefenseNonArmored.Resource, unitRepairCosts.getAny());
								} else {
									addObject(Stats.Enemy.DefenseArmored.HealthPoints, unitHealthPoints.getAny());
									addObject(Stats.Enemy.DefenseArmored.Resource, unitRepairCosts.getAny());
								}

								if (buildingInfo.Construction_Yard !== undefined && unit.mt == ClientLib.Base.EUnitMovementType.Structure) {
									if (buildingInfo.Construction_Yard !== null && buildingInfo.Construction_Yard.x == defender[i].x) {
										Stats.Enemy.Construction_Yard.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Construction_Yard.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Construction_Yard.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
									if (buildingInfo.Command_Center !== null && buildingInfo.Command_Center.x == defender[i].x) {
										Stats.Enemy.Command_Center.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Command_Center.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Command_Center.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
									if (buildingInfo.Barracks !== null && buildingInfo.Barracks.x == defender[i].x) {
										Stats.Enemy.Barracks.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Barracks.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Barracks.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
									if (buildingInfo.Factory !== null && buildingInfo.Factory.x == defender[i].x) {
										Stats.Enemy.Factory.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Factory.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Factory.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
									if (buildingInfo.Airport !== null && buildingInfo.Airport.x == defender[i].x) {
										Stats.Enemy.Airport.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Airport.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Airport.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
									if (buildingInfo.Defense_Facility !== null && buildingInfo.Defense_Facility.x == defender[i].x) {
										Stats.Enemy.Defense_Facility.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Defense_Facility.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Defense_Facility.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
									if (buildingInfo.Defense_HQ !== null && buildingInfo.Defense_HQ.x == defender[i].x) {
										Stats.Enemy.Defense_HQ.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Defense_HQ.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Defense_HQ.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
									if (buildingInfo.Support !== null && buildingInfo.Support.x == defender[i].x) {
										Stats.Enemy.Support.HealthPoints.maxFront += unitHealthPoints.getMax();
										Stats.Enemy.Support.HealthPoints.startFront += unitHealthPoints.getStart();
										Stats.Enemy.Support.HealthPoints.endFront += unitHealthPoints.getEnd();
									}
								}
							}

							if (ClientLib.API.Util.GetOwnUnitRepairCosts === undefined)
								ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(data.d.ai);

							for (i = 0; i < attacker.length; i++) {
								unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(attacker[i].i);

								//maxHealth
								unitMaxHealthPoints = this.get_UnitMaxHealthByLevel(attacker[i].l, unit, false, data.d.am);

								unitHealthPoints.setMax(Math.max(unitMaxHealthPoints, attacker[i].h * 16));
								unitHealthPoints.setStart(attacker[i].h * 16);
								if (sim[attacker[i].ci] !== undefined)
									unitHealthPoints.setEnd(sim[attacker[i].ci].h);
								else
									unitHealthPoints.setEnd(attacker[i].h * 16);
								unitRepairCosts = this.get_RepairCosts(attacker[i].i, attacker[i].l, unitHealthPoints);

								addObject(Stats.Offense.Overall.HealthPoints, unitHealthPoints.getAny());
								addObject(Stats.Offense.Overall.Resource, unitRepairCosts.getAny());
								switch (unit.mt) {
								case ClientLib.Base.EUnitMovementType.Feet:
									addObject(Stats.Offense.Infantry.HealthPoints, unitHealthPoints.getAny());
									addObject(Stats.Offense.Infantry.Resource, unitRepairCosts.getAny());
									break;
								case ClientLib.Base.EUnitMovementType.Wheel:
								case ClientLib.Base.EUnitMovementType.Track:
									addObject(Stats.Offense.Vehicle.HealthPoints, unitHealthPoints.getAny());
									addObject(Stats.Offense.Vehicle.Resource, unitRepairCosts.getAny());
									break;
								case ClientLib.Base.EUnitMovementType.Air:
								case ClientLib.Base.EUnitMovementType.Air2:
									addObject(Stats.Offense.Aircraft.HealthPoints, unitHealthPoints.getAny());
									addObject(Stats.Offense.Aircraft.Resource, unitRepairCosts.getAny());
									break;
								}
							}

							if (ClientLib.API.Util.GetOwnUnitRepairCosts === undefined)
								ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(data.d.di);

							StatsClass.setAny(Stats);
							return StatsClass;
						} catch (e) {
							console.group("Tiberium Alliances Battle Simulator V2");
							console.error("Error in TABS.UTIL.Stats.get_Stats()", e);
							console.groupEnd();
						}
					},
					patchGetUnitRepairCosts : function () {
						try {
							for (var i in ClientLib.Data.Cities.prototype) {
								if (typeof ClientLib.Data.Cities.prototype[i] === "function" &&
									ClientLib.Data.Cities.prototype[i] == ClientLib.Data.Cities.prototype.get_CurrentCity &&
									i !== "get_CurrentCity")
									break;
							}
							var GetOwnUnitRepairCosts = ClientLib.API.Util.GetUnitRepairCosts.toString().replace(i, "get_CurrentOwnCity"),
								args = GetOwnUnitRepairCosts.substring(GetOwnUnitRepairCosts.indexOf("(") + 1, GetOwnUnitRepairCosts.indexOf(")")),
								body = GetOwnUnitRepairCosts.substring(GetOwnUnitRepairCosts.indexOf("{") + 1, GetOwnUnitRepairCosts.lastIndexOf("}"));
							/*jslint evil: true */
							ClientLib.API.Util.GetOwnUnitRepairCosts = Function(args, body);
							/*jslint evil: false */
						} catch (e) {
							console.group("Tiberium Alliances Battle Simulator V2");
							console.error("Error setting up ClientLib.API.Util.GetOwnUnitRepairCosts", e);
							console.groupEnd();
						}
					}
				},
				defer : function (statics) {
					try {
						statics.patchGetUnitRepairCosts();
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up UTIL.Stats defer", e);
						console.groupEnd();
					}
				}
			});
            qx.Class.define("TABS.UTIL.Battleground", {					// [static]		Battleground
				type : "static",
				statics : {
                    StartReplay : function (cityid, combat) {
                        qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, cityid, 0, 0);
                        ClientLib.Vis.VisMain.GetInstance().get_Battleground().Init();
                        ClientLib.Vis.VisMain.GetInstance().get_Battleground().LoadCombatDirect(combat);
                        qx.event.Timer.once(function () {
                            ClientLib.Vis.VisMain.GetInstance().get_Battleground().RestartReplay();
                            ClientLib.Vis.VisMain.GetInstance().get_Battleground().set_ReplaySpeed(1);
                        }, this, 0);
                    }
                }
			});
			qx.Class.define("TABS.UTIL.CNCOpt", {						// [static]		CNCOpt
				type : "static",
				statics : {
					keymap : {
						"GDI_Accumulator" : "a",
						"GDI_Refinery" : "r",
						"GDI_Trade Center" : "u",
						"GDI_Silo" : "s",
						"GDI_Power Plant" : "p",
						"GDI_Construction Yard" : "y",
						"GDI_Airport" : "d",
						"GDI_Barracks" : "b",
						"GDI_Factory" : "f",
						"GDI_Defense HQ" : "q",
						"GDI_Defense Facility" : "w",
						"GDI_Command Center" : "e",
						"GDI_Support_Art" : "z",
						"GDI_Support_Air" : "x",
						"GDI_Support_Ion" : "i",
						"GDI_Harvester" : "h",
						"GDI_Harvester_Crystal" : "n",
						"FOR_Silo" : "s",
						"FOR_Refinery" : "r",
						"FOR_Tiberium Booster" : "b",
						"FOR_Crystal Booster" : "v",
						"FOR_Trade Center" : "u",
						"FOR_Defense Facility" : "w",
						"FOR_Construction Yard" : "y",
						"FOR_Harvester_Tiberium" : "h",
						"FOR_Defense HQ" : "q",
						"FOR_Harvester_Crystal" : "n",
						"NOD_Refinery" : "r",
						"NOD_Power Plant" : "p",
						"NOD_Harvester" : "h",
						"NOD_Construction Yard" : "y",
						"NOD_Airport" : "d",
						"NOD_Trade Center" : "u",
						"NOD_Defense HQ" : "q",
						"NOD_Barracks" : "b",
						"NOD_Silo" : "s",
						"NOD_Factory" : "f",
						"NOD_Harvester_Crystal" : "n",
						"NOD_Command Post" : "e",
						"NOD_Support_Art" : "z",
						"NOD_Support_Ion" : "i",
						"NOD_Accumulator" : "a",
						"NOD_Support_Air" : "x",
						"NOD_Defense Facility" : "w",
						"GDI_Wall" : "w",
						"GDI_Cannon" : "c",
						"GDI_Antitank Barrier" : "t",
						"GDI_Barbwire" : "b",
						"GDI_Turret" : "m",
						"GDI_Flak" : "f",
						"GDI_Art Inf" : "r",
						"GDI_Art Air" : "e",
						"GDI_Art Tank" : "a",
						"GDI_Def_APC Guardian" : "g",
						"GDI_Def_Missile Squad" : "q",
						"GDI_Def_Pitbull" : "p",
						"GDI_Def_Predator" : "d",
						"GDI_Def_Sniper" : "s",
						"GDI_Def_Zone Trooper" : "z",
						"NOD_Def_Antitank Barrier" : "t",
						"NOD_Def_Art Air" : "e",
						"NOD_Def_Art Inf" : "r",
						"NOD_Def_Art Tank" : "a",
						"NOD_Def_Attack Bike" : "p",
						"NOD_Def_Barbwire" : "b",
						"NOD_Def_Black Hand" : "z",
						"NOD_Def_Cannon" : "c",
						"NOD_Def_Confessor" : "s",
						"NOD_Def_Flak" : "f",
						"NOD_Def_MG Nest" : "m",
						"NOD_Def_Militant Rocket Soldiers" : "q",
						"NOD_Def_Reckoner" : "g",
						"NOD_Def_Scorpion Tank" : "d",
						"NOD_Def_Wall" : "w",
						"FOR_Wall" : "w",
						"FOR_Barbwire_VS_Inf" : "b",
						"FOR_Barrier_VS_Veh" : "t",
						"FOR_Inf_VS_Inf" : "g",
						"FOR_Inf_VS_Veh" : "r",
						"FOR_Inf_VS_Air" : "q",
						"FOR_Sniper" : "n",
						"FOR_Mammoth" : "y",
						"FOR_Veh_VS_Inf" : "o",
						"FOR_Veh_VS_Veh" : "s",
						"FOR_Veh_VS_Air" : "u",
						"FOR_Turret_VS_Inf" : "m",
						"FOR_Turret_VS_Inf_ranged" : "a",
						"FOR_Turret_VS_Veh" : "v",
						"FOR_Turret_VS_Veh_ranged" : "d",
						"FOR_Turret_VS_Air" : "f",
						"FOR_Turret_VS_Air_ranged" : "e",
						"GDI_APC Guardian" : "g",
						"GDI_Commando" : "c",
						"GDI_Firehawk" : "f",
						"GDI_Juggernaut" : "j",
						"GDI_Kodiak" : "k",
						"GDI_Mammoth" : "m",
						"GDI_Missile Squad" : "q",
						"GDI_Orca" : "o",
						"GDI_Paladin" : "a",
						"GDI_Pitbull" : "p",
						"GDI_Predator" : "d",
						"GDI_Riflemen" : "r",
						"GDI_Sniper Team" : "s",
						"GDI_Zone Trooper" : "z",
						"NOD_Attack Bike" : "b",
						"NOD_Avatar" : "a",
						"NOD_Black Hand" : "z",
						"NOD_Cobra" : "r",
						"NOD_Commando" : "c",
						"NOD_Confessor" : "s",
						"NOD_Militant Rocket Soldiers" : "q",
						"NOD_Militants" : "m",
						"NOD_Reckoner" : "k",
						"NOD_Salamander" : "l",
						"NOD_Scorpion Tank" : "o",
						"NOD_Specter Artilery" : "p",
						"NOD_Venom" : "v",
						"NOD_Vertigo" : "t",
						"<last>" : "."
					},
					createLink : function (city, own_city) {
						city = ((city !== undefined && city !== null) ? city : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity());
						own_city = ((own_city !== undefined && own_city !== null) ? own_city : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity());

						function findTechLayout(city) {
							for (var k in city)
								if ((typeof(city[k]) == "object") && city[k] && 0 in city[k] && 8 in city[k])
									if ((typeof(city[k][0]) == "object") && city[k][0] && city[k][0] && 0 in city[k][0] && 15 in city[k][0])
										if ((typeof(city[k][0][0]) == "object") && city[k][0][0] && "BuildingIndex" in city[k][0][0])
											return city[k];
							return null;
						}
						function findBuildings(city) {
							var cityBuildings = city.get_CityBuildingsData();
							for (var k in cityBuildings) {
								if ((typeof(cityBuildings[k]) === "object") && cityBuildings[k] && "d" in cityBuildings[k] && "c" in cityBuildings[k] && cityBuildings[k].c > 0)
									return cityBuildings[k].d;
							}
						}
						function getUnitArrays(city) {
							var ret = [];
							for (var k in city)
								if ((typeof(city[k]) == "object") && city[k])
									for (var k2 in city[k])
										if ((typeof(city[k][k2]) == "object") && city[k][k2] && "d" in city[k][k2]) {
											var lst = city[k][k2].d;
											if ((typeof(lst) == "object") && lst)
												for (var i in lst)
													if (typeof(lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i])
														ret.push(lst);
										}
							return ret;
						}
						function getDefenseUnits(city) {
							var arr = getUnitArrays(city);
							for (var i = 0; i < arr.length; ++i)
								for (var j in arr[i])
									if (TABS.UTIL.Formation.GetUnitGroupTypeFromUnit(arr[i][j].get_UnitGameData_Obj()) == ClientLib.Data.EUnitGroup.Defense)
										return arr[i];
							return [];
						}
						function getFactionKey (faction) {
							switch (faction) {
							case ClientLib.Base.EFactionType.GDIFaction:
								return "G";
							case ClientLib.Base.EFactionType.NODFaction:
								return "N";
							case ClientLib.Base.EFactionType.FORFaction:
							case ClientLib.Base.EFactionType.NPCBase:
							case ClientLib.Base.EFactionType.NPCCamp:
							case ClientLib.Base.EFactionType.NPCOutpost:
							case ClientLib.Base.EFactionType.NPCFortress:
								return "F";
							default:
								console.log("cncopt: Unknown faction: " + city.get_CityFaction());
								return "E";
							}
						}
						function getUnitKey (unit) {
							if (typeof TABS.UTIL.CNCOpt.keymap[unit.n] !== "undefined") {
								return TABS.UTIL.CNCOpt.keymap[unit.n];
							} else {
								return ".";
							}
						}

						var link = "http://cncopt.com/?map=",
							defense_units = [],
							offense_units = [],
							defense_unit_list = getDefenseUnits(city),
							army = own_city.get_CityArmyFormationsManager().GetFormationByTargetBaseId(city.get_Id()),
							offense_unit_list,
							techLayout = findTechLayout(city),
							buildings = findBuildings(city),
							row,
							spot,
							level,
							building,
							defense_unit,
							offense_unit,
							alliance = ClientLib.Data.MainData.GetInstance().get_Alliance(),
							i;

						link += "3|"; // link version
						link += getFactionKey(city.get_CityFaction()) + "|";
						link += getFactionKey(own_city.get_CityFaction()) + "|";
						link += city.get_Name() + "|";

						for (i = 0; i < 20; ++i) {
							defense_units.push([null, null, null, null, null, null, null, null, null]);
							offense_units.push([null, null, null, null, null, null, null, null, null]);
						}
						for (i in defense_unit_list)
							defense_units[defense_unit_list[i].get_CoordX()][defense_unit_list[i].get_CoordY() + 8] = defense_unit_list[i];
						if (army.get_ArmyUnits() !== null)
							offense_unit_list = army.get_ArmyUnits().l;
						else
							offense_unit_list = city.get_CityUnitsData().get_OffenseUnits().d;
						for (i in offense_unit_list)
							if (offense_unit_list[i].get_Enabled() && !offense_unit_list[i].get_IsTransportedCityEntity())
								offense_units[offense_unit_list[i].get_CoordX()][offense_unit_list[i].get_CoordY() + 16] = offense_unit_list[i];

						for (i = 0; i < 20; ++i) {
							row = [];
							for (var j = 0; j < 9; ++j) {
								spot = i > 16 ? null : techLayout[j][i];
								level = 0;
								building = null;
								if (spot && spot.BuildingIndex >= 0) {
									building = buildings[spot.BuildingIndex];
									level = building.get_CurrentLevel();
								}
								defense_unit = defense_units[j][i];
								if (defense_unit) {
									level = defense_unit.get_CurrentLevel();
								}
								offense_unit = offense_units[j][i];
								if (offense_unit) {
									level = offense_unit.get_CurrentLevel();
								}
								if (level > 1) {
									link += level;
								}

								switch (i > 16 ? 0 : city.GetResourceType(j, i)) {
								case ClientLib.Data.ECityTerrainType.NONE:
									if (building) {
										link += getUnitKey(GAMEDATA.Tech[building.get_MdbBuildingId()]);
									} else if (defense_unit) {
										link += getUnitKey(defense_unit.get_UnitGameData_Obj());
									} else if (offense_unit) {
										link += getUnitKey(offense_unit.get_UnitGameData_Obj());
									} else {
										link += ".";
									}
									break;
								case ClientLib.Data.ECityTerrainType.CRYSTAL:
									if (spot.BuildingIndex < 0)
										link += "c";
									else
										link += "n";
									break;
								case ClientLib.Data.ECityTerrainType.TIBERIUM:
									if (spot.BuildingIndex < 0)
										link += "t";
									else
										link += "h";
									break;
								case ClientLib.Data.ECityTerrainType.FOREST:
									link += "j";
									break;
								case ClientLib.Data.ECityTerrainType.BRIAR:
									link += "h";
									break;
								case ClientLib.Data.ECityTerrainType.SWAMP:
									link += "l";
									break;
								case ClientLib.Data.ECityTerrainType.WATER:
									link += "k";
									break;
								default:
									console.log("cncopt [4]: Unhandled resource type: " + city.GetResourceType(j, i));
									link += ".";
									break;
								}
							}
						}
						if (alliance) {
							link += "|" + alliance.get_POITiberiumBonus();
							link += "|" + alliance.get_POICrystalBonus();
							link += "|" + alliance.get_POIPowerBonus();
							link += "|" + alliance.get_POIInfantryBonus();
							link += "|" + alliance.get_POIVehicleBonus();
							link += "|" + alliance.get_POIAirBonus();
							link += "|" + alliance.get_POIDefenseBonus();
						}
						if (ClientLib.Data.MainData.GetInstance().get_Server().get_TechLevelUpgradeFactorBonusAmount() != 1.20) {
							link += "|newEconomy";
						}
						return link;
					},
					parseLink : function (link) {
						var formation = TABS.UTIL.Formation.Get();
						function getFaction(faction) {
							switch (faction) {
							case "G":
								return ClientLib.Base.EFactionType.GDIFaction;
							case "N":
								return ClientLib.Base.EFactionType.NODFaction;
							case "F":
								return ClientLib.Base.EFactionType.FORFaction;
							default:
								return ClientLib.Base.EFactionType.NotInitialized;
							}
						}
						function initMapRev() {
							var units = GAMEDATA.units,
								keys = Object.keys(GAMEDATA.units),
								len = keys.length,
								unit,
								data = {
									1 : {
										0 : {},
										1 : {},
										2 : {}
									},
									2 : {
										0 : {},
										1 : {},
										2 : {}
									},
									3 : {
										0 : {},
										1 : {},
										2 : {}
									}
								};
							while (len--) {
								unit = units[keys[len]];
								if (typeof TABS.UTIL.CNCOpt.keymap[unit.n] !== "undefined") {
									switch (unit.pt) {
									case ClientLib.Base.EPlacementType.Offense:
										data[unit.f][2][TABS.UTIL.CNCOpt.keymap[unit.n]] = parseInt(keys[len], 10);
										break;
									case ClientLib.Base.EPlacementType.Defense:
										data[unit.f][1][TABS.UTIL.CNCOpt.keymap[unit.n]] = parseInt(keys[len], 10);
										break;
									case ClientLib.Base.EPlacementType.Structure:
										data[unit.f][0][TABS.UTIL.CNCOpt.keymap[unit.n]] = parseInt(keys[len], 10);
										break;
									default:
										console.log("Unknown map: " + unit.n);
										break;
									}
								}
							}
							return data;
						}
						function findFreePos(formation) {
							var x, y, i, map = [];
							for (x = 0; x < ClientLib.Base.Util.get_ArmyMaxSlotCountX(); x++) {
								map[x] = [];
								for (y = 0; y < ClientLib.Base.Util.get_ArmyMaxSlotCountY(); y++) {
									map[x][y] = false;
									for (i = 0; i < formation.length; i++) {
										if (formation[i].x === x && formation[i].y === y)
											map[x][y] = true;
									}
								}
							}
							for (x = 0; x < ClientLib.Base.Util.get_ArmyMaxSlotCountX(); x++) {
								for (y = 0; y < ClientLib.Base.Util.get_ArmyMaxSlotCountY(); y++) {
									if (map[x][y] === false) {
										return {
											'x': x,
											'y': y
										};
									}
								}
							}
							return null;
						}
						if (link !== null && link.indexOf("|") != -1) {
							var parts = link.split("|");
							if (parts === null | parts.length < 5) {
								console.log("Corrupt link");
								return formation;
							}
							var keymapRev = initMapRev(),
								faction1 = getFaction(parts[1]),
								faction2 = getFaction(parts[2]),
								re = /[chjklnt.]|[\d]+[^.]/g,
								count = -1,
								step,
								type,
								id,
								level,
								section,
								i,
								j,
								x,
								y,
								result,
								units = [],
								freePos;
							while ((result = re.exec(parts[4]))) {
								result = result ? result[0] : null;
								step = ++count % 72;
								x = step % 9;
								y = Math.floor(step / 9);
								if (result.length !== 1) {
									type = result.substr(-1);
									level = parseInt(result.slice(0, -1), 10);
									section = Math.floor(count / 72);
									if (typeof keymapRev[section == 2 ? faction2 : faction1][section][type] === "undefined") {
										console.log("Unknown key: " + result + " at pos: " + count);
										continue;
									}
									id = keymapRev[section == 2 ? faction2 : faction1][section][type];
									switch (id) {
									case 175:
										id = 115;
										break;
									case 176:
										id = 155;
										break;
									}
									if (GAMEDATA.units[id].pt == ClientLib.Base.EPlacementType.Offense) {
										units.push({
											i : id,
											l : level,
											x : x,
											y : y
										});
									}
								}
							}
							
							formation = TABS.UTIL.Formation.set_Enabled(formation, false);
							for (i = 0; i < formation.length; i++) {
								for (j = 0; j < units.length; j++) {
									if (units[j] !== null && formation[i].i == units[j].i && formation[i].l == units[j].l) {
										formation[i].x = units[j].x;
										formation[i].y = units[j].y;
										formation[i].enabled = true;
										units.splice(j, 1);
										break;
									}
								}
							}
							for (i = 0; i < formation.length; i++) {
								if (formation[i].enabled === false) {
									freePos = findFreePos(formation);
									if (freePos !== null) {
										formation[i].x = freePos.x;
										formation[i].y = freePos.y;
									}
								}
							}
						}
						return formation;
					}
				}
			});
			qx.Class.define("TABS.MENU", {								// [singleton]	Menu
				type : "singleton",
				extend : qx.core.Object,
				include : [qx.locale.MTranslation],
				construct : function () {
                    this.base(arguments);
					var ScriptsButton = qx.core.Init.getApplication().getMenuBar().getScriptsButton();

					this.Menu = new qx.ui.menu.Menu();
					ScriptsButton.Add("Battle Simulator V2", TABS.RES.IMG.Menu, this.Menu);

					//SETTINGS
					var settingsMenu = new qx.ui.menu.Menu(),
						settingsLoad = new qx.ui.menu.Button(this.tr("load"), null, null),
						settingsSave = new qx.ui.menu.Button(this.tr("save"), null, null),
						settingsReset = new qx.ui.menu.Button(this.tr("reset"), null, null);
					settingsLoad.addListener("execute", function () {
						TABS.SETTINGS.load();
					}, this);
					settingsSave.addListener("execute", function () {
						TABS.SETTINGS.save();
					}, this);
					settingsReset.addListener("execute", function () {
						TABS.SETTINGS.reset();
						alert(this.tr("Game will reload now."));
						window.location.reload();
					}, this);
					settingsMenu.add(settingsLoad);
					settingsMenu.add(settingsSave);
					settingsMenu.add(settingsReset);
					this.Menu.add(new qx.ui.menu.Button("Settings", null, null, settingsMenu));

					//Info
					this.Menu.add(new qx.ui.menu.Separator());
					var infoMenu = new qx.ui.menu.Menu(),
						infoHomepage = new qx.ui.menu.Button(this.tr("Homepage"), "https://github.global.ssl.fastly.net/favicon.ico", null),
						infoFacebook = new qx.ui.menu.Button(this.tr("Facebook"), "https://fbstatic-a.akamaihd.net/rsrc.php/yl/r/H3nktOa7ZMg.ico", null);
					infoHomepage.addListener("execute", function () {
						qx.core.Init.getApplication().showExternal("http://eistee82.github.io/ta_simv2");
					}, this);
					infoFacebook.addListener("execute", function () {
						qx.core.Init.getApplication().showExternal("https://www.facebook.com/tasimv2");
					}, this);
					infoMenu.add(infoHomepage);
					infoMenu.add(infoFacebook);
					this.Menu.add(new qx.ui.menu.Button("Info", null, null, infoMenu));
				},
				members : {
					Menu : null
				},
				defer : function () {
					TABS.addInit("TABS.MENU");
				}
			});
			qx.Class.define("TABS.STATS", {								//				Stats Object
				extend : qx.core.Object,
				statics : {
					Prio : {
						Click : 0,
						Enemy : 1,
						Structure : 2,
						Construction_Yard : 3,
						Command_Center : 4,
						Barracks : 5,
						Factory : 6,
						Airport : 7,
						Defense_Facility : 8,
						Defense_HQ : 9,
						Support : 10,
						Defense : 11,
						DefenseArmored : 12,
						DefenseNonArmored : 13,
						Offense : 14,
						Infantry : 15,
						Vehicle : 16,
						Aircraft : 17,
						BattleDuration : 18,
						AutoRepair : 19
					},
					Type : {
						Click : 0,
						HealthPointPercent : 1,
						RepairChargeBase : 2,
						RepairChargeOffense : 3,
						RepairCosts : 4,
						Loot : 5,
						HealthPointAutoRepairPercent : 6
					},
					getPreset : function (num) {
						switch (num) {
						case 1: // Construction_Yard
							return {
								Name : "CY",
								Description : "Most priority to construction yard including all in front of it.<br>After this the best total enemy health from the cached simulations is selected.<br>If no better simulation is found, the best offence unit repair charge and<br>battle duration from the cached simulations is selected.",
								Prio : [
									[TABS.STATS.Prio.Construction_Yard, TABS.STATS.Type.HealthPointPercent, false, 0, false],
									[TABS.STATS.Prio.Enemy, TABS.STATS.Type.HealthPointPercent, false, 0, false],
									[TABS.STATS.Prio.Offense, TABS.STATS.Type.RepairChargeOffense, false, 0, false],
									[TABS.STATS.Prio.Offense, TABS.STATS.Type.HealthPointPercent, false, 0, false],
									[TABS.STATS.Prio.BattleDuration, null, false, 0, false]
								]
							};
						case 2: // Defense_Facility
							return {
								Name : "DF",
								Description : "Most priority to defense facility including all in front of it.<br>After this the best armored defense health from the cached simulations is selected.<br>If no better simulation is found, the best offence unit repair charge and<br>battle duration from the cached simulations is selected.",
								Prio : [
									[TABS.STATS.Prio.Defense_Facility, TABS.STATS.Type.HealthPointPercent, false, 0, false],
									[TABS.STATS.Prio.DefenseArmored, TABS.STATS.Type.HealthPointPercent, false, 0, false],
									[TABS.STATS.Prio.Offense, TABS.STATS.Type.RepairChargeOffense, false, 0, false],
									[TABS.STATS.Prio.Offense, TABS.STATS.Type.HealthPointPercent, false, 0, false],
									[TABS.STATS.Prio.BattleDuration, null, false, 0, false]
								]
							};
						case 3: // Defense
							return {
								Name : "Deff",
								Description : "Most priority to defense health including the auto repair after the battle.<br>If no better simulation is found, the best offence unit repair charge and<br>battle duration from the cached simulations is selected.",
								Prio : [
									[TABS.STATS.Prio.AutoRepair, TABS.STATS.Type.HealthPointAutoRepairPercent, false, 0, false],
									[TABS.STATS.Prio.Offense, TABS.STATS.Type.RepairChargeOffense, false, 0, false],
									[TABS.STATS.Prio.Offense, TABS.STATS.Type.HealthPointPercent, false, 0, false],
									[TABS.STATS.Prio.BattleDuration, null, false, 0, false]
								]
							};
						case 4: // Command_Center
							return {
								Name : "CC",
								Description : "Most priority to command center including all in front of it.<br>After this the best total enemy health from the cached simulations is selected.<br>If no better simulation is found, the best offence unit repair charge and<br>battle duration from the cached simulations is selected.",
								Prio : [
									[TABS.STATS.Prio.Command_Center, TABS.STATS.Type.HealthPointPercent, false, 0, false],
									[TABS.STATS.Prio.Enemy, TABS.STATS.Type.HealthPointPercent, false, 0, false],
									[TABS.STATS.Prio.Offense, TABS.STATS.Type.RepairChargeOffense, false, 0, false],
									[TABS.STATS.Prio.Offense, TABS.STATS.Type.HealthPointPercent, false, 0, false],
									[TABS.STATS.Prio.BattleDuration, null, false, 0, false]
								]
							};
						case 5: // Construction_Yard nokill 10%
							return {
								Name : "CY*",
								Description : "NoKill (farming) priorety.<br>Not working correctly yet.",
								Prio : [
									[TABS.STATS.Prio.DefenseArmored, TABS.STATS.Type.HealthPointPercent, false, 0, false],
									[TABS.STATS.Prio.Defense_Facility, TABS.STATS.Type.HealthPointPercent, false, 0, false],
									[TABS.STATS.Prio.Construction_Yard, TABS.STATS.Type.HealthPointPercent, false, 0.1, true],
									[TABS.STATS.Prio.Enemy, TABS.STATS.Type.HealthPointPercent, true, 0.8, true],
									[TABS.STATS.Prio.Offense, TABS.STATS.Type.RepairChargeOffense, false, 0, false],
									[TABS.STATS.Prio.Offense, TABS.STATS.Type.HealthPointPercent, false, 0, false],
									[TABS.STATS.Prio.BattleDuration, null, false, 0, false]
								]
							};
						default:
							return {
								Name : "live",
								Description : "Shows the current army formation.",
								Prio : []
							};
						}
					},
					selectPrio : function (stats, prio /*[this.Prio, this.Type, Negate/Boolean, Limit/0.0-1.0/%, NoKill/Boolean]*/) {
						switch (prio[0]) {
						case this.Prio.Enemy:
							return this._selectType(stats.Enemy.Overall, prio);
						case this.Prio.Structure:
							return this._selectType(stats.Enemy.Structure, prio);
						case this.Prio.Construction_Yard:
							return this._selectType(stats.Enemy.Construction_Yard, prio);
						case this.Prio.Command_Center:
							return this._selectType(stats.Enemy.Command_Center, prio);
						case this.Prio.Barracks:
							return this._selectType(stats.Enemy.Barracks, prio);
						case this.Prio.Factory:
							return this._selectType(stats.Enemy.Factory, prio);
						case this.Prio.Airport:
							return this._selectType(stats.Enemy.Airport, prio);
						case this.Prio.Defense_Facility:
							return this._selectType(stats.Enemy.Defense_Facility, prio);
						case this.Prio.Defense_HQ:
							return this._selectType(stats.Enemy.Defense_HQ, prio);
						case this.Prio.Support:
							return this._selectType(stats.Enemy.Support, prio);
						case this.Prio.Defense:
							return this._selectType(stats.Enemy.Defense, prio);
						case this.Prio.DefenseArmored:
							return this._selectType(stats.Enemy.DefenseArmored, prio);
						case this.Prio.DefenseNonArmored:
							return this._selectType(stats.Enemy.DefenseNonArmored, prio);
						case this.Prio.Offense:
							return this._selectType(stats.Offense.Overall, prio);
						case this.Prio.Infantry:
							return this._selectType(stats.Offense.Infantry, prio);
						case this.Prio.Vehicle:
							return this._selectType(stats.Offense.Vehicle, prio);
						case this.Prio.Aircraft:
							return this._selectType(stats.Offense.Aircraft, prio);
						case this.Prio.BattleDuration:
							return this._calcBattleDuration(stats.BattleDuration, prio);
						case this.Prio.AutoRepair:
							return this._selectType(stats.Enemy.DefenseArmored, prio);
						default:
							return Number.MAX_VALUE;
						}
					},
					_selectType : function (entity, prio) {
						switch (prio[1]) {
						case this.Type.HealthPointPercent:
							return this._calcHealthPoints(entity.HealthPoints, prio);
						case this.Type.RepairChargeBase:
							return entity.Resource[ClientLib.Base.EResourceType.RepairChargeBase] * (prio[2] ? -1 : 1); // Negate
						case this.Type.RepairChargeOffense:
							return Math.max(
								entity.Resource[ClientLib.Base.EResourceType.RepairChargeAir],
								entity.Resource[ClientLib.Base.EResourceType.RepairChargeInf],
								entity.Resource[ClientLib.Base.EResourceType.RepairChargeVeh]) * (prio[2] ? -1 : 1); // Negate
						case this.Type.RepairCosts:
						case this.Type.Loot:
							return this._calcCosts(entity.Resource, prio);
						case this.Type.HealthPointAutoRepairPercent:
							return this._calcHealthPointsAutoRepair(entity.HealthPoints, prio);
						default:
							return Number.MAX_VALUE;
						}
					},
					_calcCosts : function (Resource /*{ ClientLib.Base.EResourceType.Tiberium: 0, ClientLib.Base.EResourceType.Crystal: 0, ClientLib.Base.EResourceType.Credits: 0, ClientLib.Base.EResourceType.ResearchPoints: 0 }*/, prio) {
						var costs = Resource[ClientLib.Base.EResourceType.Tiberium] +
							Resource[ClientLib.Base.EResourceType.Crystal] +
							Resource[ClientLib.Base.EResourceType.Credits] +
							Resource[ClientLib.Base.EResourceType.ResearchPoints];
						return costs * (prio[2] ? -1 : 1); // Negate
					},
					_calcHealthPoints : function (HealthPoints /*{ max: 0, end: 0 }*/, prio) { //Todo: better front value selection
						var result = HealthPoints.end + HealthPoints.endFront;
						if (HealthPoints.end < (prio[3] * HealthPoints.max)) // Limit
							result = (prio[3] * (HealthPoints.max + HealthPoints.maxFront));
						if (prio[4] === true && !HealthPoints.end) // NoKill
							result = HealthPoints.max + HealthPoints.maxFront;
						if (result > (HealthPoints.max + HealthPoints.maxFront)) // max 1
							result = (HealthPoints.max + HealthPoints.maxFront);
						if (result < 0) // min 0
							result = 0;
						switch (prio[0]) { // Negate Offense
						case this.Prio.Offense:
						case this.Prio.Infantry:
						case this.Prio.Vehicle:
						case this.Prio.Aircraft:
							result = -1 * result;
							break;
						}
						return result * (prio[2] ? -1 : 1); // Negate
					},
					_calcHealthPointsAutoRepair : function (HealthPoints /*{ max: 0, end: 0 }*/, prio) { //Todo: better front value selection
						var result = HealthPoints.end + HealthPoints.rep + HealthPoints.endFront;
						if ((HealthPoints.end + HealthPoints.rep) < (prio[3] * HealthPoints.max)) // Limit
							result = (prio[3] * (HealthPoints.max + HealthPoints.maxFront));
						if (prio[4] === true && (HealthPoints.end + HealthPoints.rep) !== 0) // NoKill
							result = HealthPoints.max + HealthPoints.maxFront;
						if (result > (HealthPoints.max + HealthPoints.maxFront)) // max 1
							result = (HealthPoints.max + HealthPoints.maxFront);
						if (result < 0) // min 0
							result = 0;
						switch (prio[0]) { // Negate Offense
						case this.Prio.Offense:
						case this.Prio.Infantry:
						case this.Prio.Vehicle:
						case this.Prio.Aircraft:
							result = -1 * result;
							break;
						}
						return result * (prio[2] ? -1 : 1); // Negate
					},
					_calcBattleDuration : function (BattleDuration /*int*/, prio) {
						var result = BattleDuration,
							max = 120000;
						if (result < (prio[3] * max)) // Limit
							result = (prio[3] * max);
						if (result > max) // max 1
							result = max;
						if (result < 0) // min 0
							result = 0;
						return result * (prio[2] ? -1 : 1); // Negate
					}
				},
				properties : {
					BattleDuration : {
						check : "Number",
						init : 0,
						event : "changeBattleDuration"
					}
				},
				members : {
					Enemy : null,
					Offense : null,
					setAny : function (data) {
						if (data.BattleDuration !== undefined && data.BattleDuration !== this.getBattleDuration())
							this.setBattleDuration(data.BattleDuration);
						//Entity.HealthPoints
						if (data.Enemy.Overall.HealthPoints !== undefined)
							this.Enemy.Overall.HealthPoints.setAny(data.Enemy.Overall.HealthPoints);
						if (data.Enemy.Structure.HealthPoints !== undefined)
							this.Enemy.Structure.HealthPoints.setAny(data.Enemy.Structure.HealthPoints);
						if (data.Enemy.Construction_Yard.HealthPoints !== undefined)
							this.Enemy.Construction_Yard.HealthPoints.setAny(data.Enemy.Construction_Yard.HealthPoints);
						if (data.Enemy.Command_Center.HealthPoints !== undefined)
							this.Enemy.Command_Center.HealthPoints.setAny(data.Enemy.Command_Center.HealthPoints);
						if (data.Enemy.Barracks.HealthPoints !== undefined)
							this.Enemy.Barracks.HealthPoints.setAny(data.Enemy.Barracks.HealthPoints);
						if (data.Enemy.Factory.HealthPoints !== undefined)
							this.Enemy.Factory.HealthPoints.setAny(data.Enemy.Factory.HealthPoints);
						if (data.Enemy.Airport.HealthPoints !== undefined)
							this.Enemy.Airport.HealthPoints.setAny(data.Enemy.Airport.HealthPoints);
						if (data.Enemy.Defense_Facility.HealthPoints !== undefined)
							this.Enemy.Defense_Facility.HealthPoints.setAny(data.Enemy.Defense_Facility.HealthPoints);
						if (data.Enemy.Defense_HQ.HealthPoints !== undefined)
							this.Enemy.Defense_HQ.HealthPoints.setAny(data.Enemy.Defense_HQ.HealthPoints);
						if (data.Enemy.Support.HealthPoints !== undefined)
							this.Enemy.Support.HealthPoints.setAny(data.Enemy.Support.HealthPoints);
						if (data.Enemy.Defense.HealthPoints !== undefined)
							this.Enemy.Defense.HealthPoints.setAny(data.Enemy.Defense.HealthPoints);
						if (data.Enemy.DefenseArmored.HealthPoints !== undefined)
							this.Enemy.DefenseArmored.HealthPoints.setAny(data.Enemy.DefenseArmored.HealthPoints);
						if (data.Enemy.DefenseNonArmored.HealthPoints !== undefined)
							this.Enemy.DefenseNonArmored.HealthPoints.setAny(data.Enemy.DefenseNonArmored.HealthPoints);
						if (data.Offense.Overall.HealthPoints !== undefined)
							this.Offense.Overall.HealthPoints.setAny(data.Offense.Overall.HealthPoints);
						if (data.Offense.Infantry.HealthPoints !== undefined)
							this.Offense.Infantry.HealthPoints.setAny(data.Offense.Infantry.HealthPoints);
						if (data.Offense.Vehicle.HealthPoints !== undefined)
							this.Offense.Vehicle.HealthPoints.setAny(data.Offense.Vehicle.HealthPoints);
						if (data.Offense.Aircraft.HealthPoints !== undefined)
							this.Offense.Aircraft.HealthPoints.setAny(data.Offense.Aircraft.HealthPoints);
						if (data.Offense.Crystal.HealthPoints !== undefined)
							this.Offense.Crystal.HealthPoints.setAny(data.Offense.Overall.HealthPoints);
						//Entity.Resource
						if (data.Enemy.Overall.Resource !== undefined)
							this.Enemy.Overall.Resource.setAny(data.Enemy.Overall.Resource);
						if (data.Enemy.Structure.Resource !== undefined)
							this.Enemy.Structure.Resource.setAny(data.Enemy.Structure.Resource);
						if (data.Enemy.Construction_Yard.Resource !== undefined)
							this.Enemy.Construction_Yard.Resource.setAny(data.Enemy.Construction_Yard.Resource);
						if (data.Enemy.Command_Center.Resource !== undefined)
							this.Enemy.Command_Center.Resource.setAny(data.Enemy.Command_Center.Resource);
						if (data.Enemy.Barracks.Resource !== undefined)
							this.Enemy.Barracks.Resource.setAny(data.Enemy.Barracks.Resource);
						if (data.Enemy.Factory.Resource !== undefined)
							this.Enemy.Factory.Resource.setAny(data.Enemy.Factory.Resource);
						if (data.Enemy.Airport.Resource !== undefined)
							this.Enemy.Airport.Resource.setAny(data.Enemy.Airport.Resource);
						if (data.Enemy.Defense_Facility.Resource !== undefined)
							this.Enemy.Defense_Facility.Resource.setAny(data.Enemy.Defense_Facility.Resource);
						if (data.Enemy.Defense_HQ.Resource !== undefined)
							this.Enemy.Defense_HQ.Resource.setAny(data.Enemy.Defense_HQ.Resource);
						if (data.Enemy.Support.Resource !== undefined)
							this.Enemy.Support.Resource.setAny(data.Enemy.Support.Resource);
						if (data.Enemy.Defense.Resource !== undefined)
							this.Enemy.Defense.Resource.setAny(data.Enemy.Defense.Resource);
						if (data.Enemy.DefenseArmored.Resource !== undefined)
							this.Enemy.DefenseArmored.Resource.setAny(data.Enemy.DefenseArmored.Resource);
						if (data.Enemy.DefenseNonArmored.Resource !== undefined)
							this.Enemy.DefenseNonArmored.Resource.setAny(data.Enemy.DefenseNonArmored.Resource);
						if (data.Offense.Overall.Resource !== undefined)
							this.Offense.Overall.Resource.setAny(data.Offense.Overall.Resource);
						if (data.Offense.Infantry.Resource !== undefined)
							this.Offense.Infantry.Resource.setAny(data.Offense.Infantry.Resource);
						if (data.Offense.Vehicle.Resource !== undefined)
							this.Offense.Vehicle.Resource.setAny(data.Offense.Vehicle.Resource);
						if (data.Offense.Aircraft.Resource !== undefined)
							this.Offense.Aircraft.Resource.setAny(data.Offense.Aircraft.Resource);
						if (data.Offense.Crystal.Resource !== undefined)
							this.Offense.Crystal.Resource.setAny(data.Offense.Overall.Resource);
					},
					getAny : function () {
						return {
							BattleDuration : this.getBattleDuration(),
							Enemy : {
								Overall : {
									HealthPoints : this.Enemy.Overall.HealthPoints.getAny(),
									Resource : this.Enemy.Overall.Resource.getAny()
								},
								Structure : {
									HealthPoints : this.Enemy.Structure.HealthPoints.getAny(),
									Resource : this.Enemy.Structure.Resource.getAny()
								},
								Construction_Yard : {
									HealthPoints : this.Enemy.Construction_Yard.HealthPoints.getAny(),
									Resource : this.Enemy.Construction_Yard.Resource.getAny()
								},
								Command_Center : {
									HealthPoints : this.Enemy.Command_Center.HealthPoints.getAny(),
									Resource : this.Enemy.Command_Center.Resource.getAny()
								},
								Barracks : {
									HealthPoints : this.Enemy.Barracks.HealthPoints.getAny(),
									Resource : this.Enemy.Barracks.Resource.getAny()
								},
								Factory : {
									HealthPoints : this.Enemy.Factory.HealthPoints.getAny(),
									Resource : this.Enemy.Factory.Resource.getAny()
								},
								Airport : {
									HealthPoints : this.Enemy.Airport.HealthPoints.getAny(),
									Resource : this.Enemy.Airport.Resource.getAny()
								},
								Defense_Facility : {
									HealthPoints : this.Enemy.Defense_Facility.HealthPoints.getAny(),
									Resource : this.Enemy.Defense_Facility.Resource.getAny()
								},
								Defense_HQ : {
									HealthPoints : this.Enemy.Defense_HQ.HealthPoints.getAny(),
									Resource : this.Enemy.Defense_HQ.Resource.getAny()
								},
								Support : {
									HealthPoints : this.Enemy.Support.HealthPoints.getAny(),
									Resource : this.Enemy.Support.Resource.getAny()
								},
								Defense : {
									HealthPoints : this.Enemy.Defense.HealthPoints.getAny(),
									Resource : this.Enemy.Defense.Resource.getAny()
								},
								DefenseArmored : {
									HealthPoints : this.Enemy.DefenseArmored.HealthPoints.getAny(),
									Resource : this.Enemy.DefenseArmored.Resource.getAny()
								},
								DefenseNonArmored : {
									HealthPoints : this.Enemy.DefenseNonArmored.HealthPoints.getAny(),
									Resource : this.Enemy.DefenseNonArmored.Resource.getAny()
								}
							},
							Offense : {
								Overall : {
									HealthPoints : this.Offense.Overall.HealthPoints.getAny(),
									Resource : this.Offense.Overall.Resource.getAny()
								},
								Infantry : {
									HealthPoints : this.Offense.Infantry.HealthPoints.getAny(),
									Resource : this.Offense.Infantry.Resource.getAny()
								},
								Vehicle : {
									HealthPoints : this.Offense.Vehicle.HealthPoints.getAny(),
									Resource : this.Offense.Vehicle.Resource.getAny()
								},
								Aircraft : {
									HealthPoints : this.Offense.Aircraft.HealthPoints.getAny(),
									Resource : this.Offense.Aircraft.Resource.getAny()
								},
                                Crystal : {
                                    HealthPoints : this.Offense.Overall.HealthPoints.getAny(),
                                    Resource : this.Offense.Overall.Resource.getAny()
                                }
							}
						};
					}
				},
				construct : function (data) {
					try {
                        this.base(arguments);
						this.Enemy = {
							Overall : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							Structure : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							Construction_Yard : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							Command_Center : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							Barracks : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							Factory : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							Airport : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							Defense_Facility : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							Defense_HQ : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							Support : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							Defense : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							DefenseArmored : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							DefenseNonArmored : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							}
						};
						this.Offense = {
							Overall : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							Infantry : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							Vehicle : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							Aircraft : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
							Crystal : {
								HealthPoints : new TABS.STATS.Entity.HealthPoints(),
								Resource : new TABS.STATS.Entity.Resource()
							},
						};

						if (data !== undefined)
							this.setAny(data);
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up STATS constructor", e);
						console.groupEnd();
					}
				},
				events : {
					"changeBattleDuration" : "qx.event.type.Data"
				}
			});
			qx.Class.define("TABS.STATS.Entity.HealthPoints", {			//				Entity HealthPoints Objekt
				extend : qx.core.Object,
				properties : {
					max : {
						check : "Number",
						init : 0,
						event : "changeMax"
					},
					start : {
						check : "Number",
						init : 0,
						event : "changeStart"
					},
					end : {
						check : "Number",
						init : 0,
						event : "changeEnd"
					},
					rep : {
						check : "Number",
						init : 0,
						event : "changeRep"
					},
					maxFront : {
						check : "Number",
						init : 0,
						event : "changeMaxFront"
					},
					startFront : {
						check : "Number",
						init : 0,
						event : "changeStartFront"
					},
					endFront : {
						check : "Number",
						init : 0,
						event : "changeEndFront"
					}
				},
				members : {
					setAny : function (data) {
						if (data.max !== undefined && data.max !== this.getMax())
							this.setMax(data.max);
						if (data.start !== undefined && data.start !== this.getStart())
							this.setStart(data.start);
						if (data.end !== undefined && data.end !== this.getEnd())
							this.setEnd(data.end);
						if (data.rep !== undefined && data.rep !== this.getRep())
							this.setRep(data.rep);
						if (data.maxFront !== undefined && data.maxFront !== this.getMaxFront())
							this.setMaxFront(data.maxFront);
						if (data.startFront !== undefined && data.startFront !== this.getStartFront())
							this.setStartFront(data.startFront);
						if (data.endFront !== undefined && data.endFront !== this.getEndFront())
							this.setEndFront(data.endFront);
					},
					getAny : function () {
						return {
							max : this.getMax(),
							start : this.getStart(),
							end : this.getEnd(),
							rep : this.getRep(),
							maxFront : this.getMaxFront(),
							startFront : this.getStartFront(),
							endFront : this.getEndFront()
						};
					}
				},
				construct : function (data) {
					try {
                        this.base(arguments);
						if (data !== undefined)
							this.setAny(data);
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up STATS.Entity.HealthPoints constructor", e);
						console.groupEnd();
					}
				},
				events : {
					"changeMax" : "qx.event.type.Data",
					"changeStart" : "qx.event.type.Data",
					"changeEnd" : "qx.event.type.Data",
					"changeMaxFront" : "qx.event.type.Data",
					"changeStartFront" : "qx.event.type.Data",
					"changeEndFront" : "qx.event.type.Data"
				}
			});
			qx.Class.define("TABS.STATS.Entity.Resource", {				//				Entity Ressouce Object
				extend : qx.core.Object,
				properties : { //ClientLib.Base.EResourceType
					Tiberium : {
						check : "Number",
						init : 0,
						event : "changeTiberium"
					},
					Crystal : {
						check : "Number",
						init : 0,
						event : "changeCrystal"
					},
					Credits : {
						check : "Number",
						init : 0,
						event : "changeCredits"
					},
					ResearchPoints : {
						check : "Number",
						init : 0,
						event : "changeResearchPoints"
					},
					RepairChargeBase : {
						check : "Number",
						init : 0,
						event : "changeRepairChargeBase"
					},
					RepairChargeAir : {
						check : "Number",
						init : 0,
						event : "changeRepairChargeAir"
					},
					RepairChargeInf : {
						check : "Number",
						init : 0,
						event : "changeRepairChargeInf"
					},
					RepairChargeVeh : {
						check : "Number",
						init : 0,
						event : "changeRepairChargeVeh"
					}
				},
				members : {
					setAny : function (data) {
						if (data[1] !== undefined && data[1] !== this.getTiberium())
							this.setTiberium(data[1]);
						if (data[2] !== undefined && data[2] !== this.getCrystal())
							this.setCrystal(data[2]);
						if (data[3] !== undefined && data[3] !== this.getCredits())
							this.setCredits(data[3]);
						if (data[6] !== undefined && data[6] !== this.getResearchPoints())
							this.setResearchPoints(data[6]);
						if (data[7] !== undefined && data[7] !== this.getRepairChargeBase())
							this.setRepairChargeBase(data[7]);
						if (data[8] !== undefined && data[8] !== this.getRepairChargeAir())
							this.setRepairChargeAir(data[8]);
						if (data[9] !== undefined && data[9] !== this.getRepairChargeInf())
							this.setRepairChargeInf(data[9]);
						if (data[10] !== undefined && data[10] !== this.getRepairChargeVeh())
							this.setRepairChargeVeh(data[10]);
					},
					getAny : function () {
						return {
							1 : this.getTiberium(),
							2 : this.getCrystal(),
							3 : this.getCredits(),
							6 : this.getResearchPoints(),
							7 : this.getRepairChargeBase(),
							8 : this.getRepairChargeAir(),
							9 : this.getRepairChargeInf(),
							10 : this.getRepairChargeVeh()
						};
					}
				},
				construct : function (data) {
					try {
                        this.base(arguments);
						if (data !== undefined)
							this.setAny(data);
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up STATS.Entity.Resource constructor", e);
						console.groupEnd();
					}
				},
				events : {
					"changeTiberium" : "qx.event.type.Data",
					"changeCrystal" : "qx.event.type.Data",
					"changeCredits" : "qx.event.type.Data",
					"changeResearchPoints" : "qx.event.type.Data",
					"changeRepairCrystal" : "qx.event.type.Data",
					"changeRepairChargeBase" : "qx.event.type.Data",
					"changeRepairChargeAir" : "qx.event.type.Data",
					"changeRepairChargeInf" : "qx.event.type.Data",
					"changeRepairChargeVeh" : "qx.event.type.Data"
				}
			});
			qx.Class.define("TABS.CACHE", {								// [singleton]	Cache for simulations
				type : "singleton",
				extend : qx.core.Object,
				construct : function () {
					try {
						this.base(arguments);
						this.cities = {};
						this.__Table = new Uint32Array(256);
						var tmp;
						for (var i = 256; i--; ) {
							tmp = i;
							for (var k = 8; k--; ) {
								tmp = tmp & 1 ? 0xEDB88320^(tmp >>> 1) : tmp >>> 1;
							}
							this.__Table[i] = tmp;
						}
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up CACHE constructor", e);
						console.groupEnd();
					}
				},
				members : {
					__Table : null,
					cities : null,
					sortByPosition : function (a, b) {
						return a.x - b.x || a.y - b.y || a.i - b.i; // using id as third because of garrison (both units at same position)
					},
					_Crc32 : function (data) { // data = array of bytes 0-255
						var crc = 0xFFFFFFFF;
						for (var i = 0, l = data.length; i < l; i++) {
							crc = (crc >>> 8)^this.__Table[(crc^data[i]) & 0xFF];
						}
						return crc^-1;
					},
					calcUnitsHash : function (units, ownid) { // units = TABS.UTIL.Formation.Get()
						if (units !== null) {
							units.sort(this.sortByPosition);
							var OwnCityId = ((ownid !== undefined && ownid !== null) ? ownid : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId()),
								i,
								data = [];
							for (i = 0; i < units.length; i++)
								if (units[i].enabled && units[i].h > 0)
									data.push(units[i].x, units[i].y, units[i].i, units[i].l);
							return OwnCityId.toString() + this._Crc32(data);
						}
						return null;
					},
					check : function (units, cityid, ownid) { // returns { key : "", result : { ownid : 0, cityid: 0, stats : {}, formation : [], combat : {}, valid: true } }
						var CityId = ((cityid !== undefined && cityid !== null) ? cityid : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId()),
							OwnCityId = ((ownid !== undefined && ownid !== null) ? ownid : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId()),
							Hash = this.calcUnitsHash(units, OwnCityId);
						if (CityId !== null && OwnCityId !== null && Hash !== null) {
							this.__validate(CityId, OwnCityId, Hash);
							return {
								key : Hash,
								result : this.get(Hash, CityId)
							};
						}
						return {
							key : null,
							result : null
						};
					},
					getAll : function (cityid) {
						var CityId = ((cityid !== undefined && cityid !== null) ? cityid : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId());
						if (typeof this.cities[CityId] === "undefined")
							this.cities[CityId] = {
								data : {},
								caches : {}
							};
						return this.cities[CityId];
					},
					get : function (key, cityid) { // returns { ownid : 0, cityid: 0, stats : {}, formation : [], combat : {}, valid: true }
						var CityId = ((cityid !== undefined && cityid !== null) ? cityid : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId()),
							caches = this.getAll(CityId).caches;
						if (typeof caches[key] !== "undefined" && caches[key].valid)
							return caches[key];
						return null;
					},
					getPrio : function (prios, cityid, ownid) {
						var CityId = ((cityid !== undefined && cityid !== null) ? cityid : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId()),
							caches = this.getAll(CityId).caches,
							results = [];
						for (var key in caches) {
							if (ownid === null || ownid === undefined || (ownid !== null && ownid !== undefined && caches[key].ownid == ownid))
								results.push({
									"key" : key,
									result : caches[key]
								});
						}
						results.sort(function (a, b) {
							var result = 0;
							for (var i = 0; i < prios.length; i++) {
								a.diff = result;
								b.diff = result;
								if (result)
									return result;
								else
									result = TABS.STATS.selectPrio(a.result.stats, prios[i]) - TABS.STATS.selectPrio(b.result.stats, prios[i]);
							}
							return result;
						});
						return results;
					},
					getPrio1 : function (prios, cityid, ownid) {
						var result = this.getPrio(prios, cityid, ownid);
						if (result.length === 0)
							result = {
								key : null,
								result : null
							};
						else {
							for (i = 0; i < result.length; i++) {
								if (result[i].result.valid === true) {
									result = result[i];
									break;
								}
							}
							if (Object.prototype.toString.call(result) === "[object Array]")
								result = result[0];
						}
						return result;
					},
					add : function (data, cityid, ownid) { // { key : "", result : { stats : {}, formation : [], combat : {} } }
						var CityId = ((cityid !== undefined && cityid !== null) ? cityid : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId()),
							OwnCityId = ((ownid !== undefined && ownid !== null) ? ownid : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId()),
							OwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(OwnCityId),
							caches = this.getAll(CityId).caches;
						caches[data.key] = data.result;
						caches[data.key].cityid = CityId;
						caches[data.key].ownid = OwnCityId;
						if (OwnCity !== null)
							caches[data.key].recovery = OwnCity.get_hasRecovery();
						caches[data.key].valid = true;
						this.onAdd();
					},
					clearAll : function () {
						this.cities = {};
					},
					clear : function (cityid) {
						if (typeof this.cities[cityid] !== "undefined")
							return delete this.cities[cityid];
						return false;
					},
					merge : function (cityid, ownid, data, caches) {
						try {
							var CityId = ((cityid !== undefined && cityid !== null) ? cityid : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId()),
								OwnCityId = ((ownid !== undefined && ownid !== null) ? ownid : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId()),
								key,
								sim = {
									data : data,
									caches : caches
								};
							for (key in sim.caches) {
								sim.caches[key].cityid = CityId;
								sim.caches[key].ownid = OwnCityId;
								sim.caches[key].recovery = sim.data.recovery;
								sim.caches[key].valid = true;
							}
							this.__validate(CityId, OwnCityId, sim);
							qx.lang.Object.mergeWith(this.getAll(CityId).caches, sim.caches); // overwrite = false?
							this.onAdd();
						} catch (e) {
							console.group("Tiberium Alliances Battle Simulator V2");
							console.error("Error in TABS.CACHE.merge", e);
							console.groupEnd();
						}
					},
					getCitySimAmount : function (cityid) {
						var CityId = ((cityid !== undefined && cityid !== null) ? cityid : ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId());
						if (typeof this.cities[CityId] !== "undefined" && typeof this.cities[CityId]["caches"] !== "undefined")
							return Object.keys(this.cities[CityId].caches).length;
						return 0;
					},
					__validate : function (cityid, ownid, hash) {
						var targetCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cityid),
							ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(ownid),
							city = (typeof hash != "object" ? this.getAll(cityid) : hash),
							key;

						if (targetCity !== null && targetCity.get_Version() !== -1) {
							var version = targetCity.get_Version();
							if (city.data.version != version) {
								city.data.version = version;
								//invalidate
								for (key in city.caches)
									city.caches[key].valid = false;
							}
						}

						if (ownCity !== null && ownCity.get_Version() !== -1) {
							var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance(),
								recovery = ownCity.get_hasRecovery();

							if (typeof hash != "object" && typeof city.caches[hash] !== "undefined" && city.caches[hash].recovery != recovery)
								city.caches[hash].valid = false;

							if (typeof hash == "object" && city.data.recovery != recovery)
								for (key in city.caches)
									city.caches[key].valid = false;

							if (alliance !== null) {
								if ((city.data.air != alliance.get_POIAirBonus() ||
										city.data.inf != alliance.get_POIInfantryBonus() ||
										city.data.veh != alliance.get_POIVehicleBonus()) &&
									recovery === false) {
									city.data.air = alliance.get_POIAirBonus();
									city.data.inf = alliance.get_POIInfantryBonus();
									city.data.veh = alliance.get_POIVehicleBonus();
									if (targetCity !== null)
										city.data.version = targetCity.get_Version();
									//invalidate
									for (key in city.caches)
										city.caches[key].valid = false;
								}
							}
						}
					},
					onAdd : function () {
						phe.cnc.base.Timer.getInstance().removeListener("uiTick", this.onUiTick, this);
						phe.cnc.base.Timer.getInstance().addListener("uiTick", this.onUiTick, this);
					},
					onUiTick : function () {
						phe.cnc.base.Timer.getInstance().removeListener("uiTick", this.onUiTick, this);
						this.fireEvent("addSimulation");
					}
				},
				events : {
					"addSimulation" : "qx.event.type.Event"
				}
			});
			qx.Class.define("TABS.APISimulation", {						// [singleton]	API Simulation
				type : "singleton",
				extend : qx.core.Object,
				properties : {
					data : {
						check : "Array",
						init : [],
						event : "OnData"
					},
					formation : {
						check : "Array",
						init : []
					},
					formationHash : {
						check : "Array",
						init : []
					},
					lock : {
						check : "Boolean",
						init : false,
						event : "OnLock"
					},
					request : {
						check : "Boolean",
						init : false
					},
					time : {
						check : "Number",
						init : 0,
						event : "OnTime"
					}
				},
				construct : function () {
					try {
                        this.base(arguments);
						this.addListener("OnSimulateBattleFinished", this._OnSimulateBattleFinished, this);
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up APISimulation constructor", e);
						console.groupEnd();
					}
				},
				members : {
					__Timeout : null,
					__TimerStart : null,
					SimulateBattle : function () {
						if (!this.getLock()) {
							var CurrentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(),
								CurrentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
							if (CurrentOwnCity !== null && CurrentCity !== null && CurrentCity.CheckInvokeBattle(CurrentOwnCity, true) == ClientLib.Data.EAttackBaseResult.OK) {
								clearTimeout(this.__Timeout);
                                if(PerforceChangelist >= 448942) { // patch 16.2
                                    this.__Timeout = setTimeout(this._reset.bind(this), 3000);
                                }
                                else
                                {
                                    this.__Timeout = setTimeout(this._reset.bind(this), 10000);
                                }
								this.resetData();
								this.setLock(true);
								var formation = TABS.UTIL.Formation.Get(),
									armyUnits = [];
								for (var i in formation)
									if (formation[i].enabled && formation[i].h > 0)
										armyUnits.push({
											i : formation[i].id,
											x : formation[i].x,
											y : formation[i].y
										});

								this.setFormation(formation);

								ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("SimulateBattle", {
									battleSetup : {
										d : CurrentCity.get_Id(),
										a : CurrentOwnCity.get_Id(),
										u : armyUnits,
										s : 0
									}
								}, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, function (a, b) {
									this.__TimerStart = Date.now();
									this._updateTime();
									this.fireDataEvent("OnSimulateBattleFinished", b);
								}), null);
							}
						} else
							this.setRequest(true);
					},
					_OnSimulateBattleFinished : function (e) {
                        if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() === null)
                            return;
						var data = e.getData();
                        if (data === null) return;
                        var	mergedformation = TABS.UTIL.Formation.Merge(this.getFormation(), data.d.a),
							cache = TABS.CACHE.getInstance().check(mergedformation, data.d.di, data.d.ai);
						this.setData(data.e);
						cache.result = {
							stats : TABS.UTIL.Stats.get_Stats(data).getAny(),
							formation : mergedformation,
							combat : data.d
						};
						TABS.CACHE.getInstance().add(cache, data.d.di, data.d.ai);
					},
					_updateTime : function () {
						clearTimeout(this.__Timeout);
                        var time = 0;
                        if(PerforceChangelist >= 448942) { // patch 16.2
                            time = this.__TimerStart + 3000 - Date.now();
                        }
                        else
                        {
                            time = this.__TimerStart + 10000 - Date.now();
                        }
                        
						if (time > 0) {
							if (time > 100)
								this.__Timeout = setTimeout(this._updateTime.bind(this), 100);
							else
								this.__Timeout = setTimeout(this._updateTime.bind(this), time);
						} else
							this.__TimerStart = time = 0;
						this.setTime(time);
						if (this.getTime() === 0)
							this._reset();
					},
					_reset : function () {
						this.resetLock();
						this.resetData();
						this.resetTime();
						if (this.getRequest()) {
							this.resetRequest();
							this.SimulateBattle();
						}
					}
				},
				events : {
					"OnData" : "qx.event.type.Data",
					"OnLock" : "qx.event.type.Data",
					"OnSimulateBattleFinished" : "qx.event.type.Data",
					"OnTime" : "qx.event.type.Data"
				}
			});
			qx.Class.define("TABS.PreArmyUnits", {						// [singleton]	Event: OnCityPreArmyUnitsChanged
				type : "singleton",
				extend : qx.core.Object,
				construct : function () {
					try {
                        this.base(arguments);
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.__CurrentOwnCityChange);
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.__CurrentCityChange);
						phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this.__ViewModeChange);
						if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity() !== null)
							this.__CurrentOwnCityChange(0, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id());
						if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() !== null)
							this.__CurrentCityChange(0, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id());
						this.patchSetEnabled();
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up PreArmyUnits constructor", e);
						console.groupEnd();
					}
				},
				events : {
					"OnCityPreArmyUnitsChanged" : "qx.event.type.Event"
				},
				members : {
					CurrentCity : null,
					CurrentOwnCity : null,
					CityPreArmyUnits : null,
					__Timeout : null,
					__CurrentOwnCityChange : function (oldId, newId) {
						if (this.CurrentOwnCity !== null && this.CurrentCity !== null && this.CityPreArmyUnits !== null)
							phe.cnc.Util.detachNetEvent(this.CityPreArmyUnits, "ArmyChanged", ClientLib.Data.CityPreArmyUnitsChanged, this, this.__CityPreArmyUnitsChanged);
						var CurrentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(newId);
						if (CurrentOwnCity !== null && CurrentOwnCity.IsOwnBase()) {
							this.CurrentOwnCity = CurrentOwnCity;
							if (this.CurrentCity !== null && ClientLib.Vis.VisMain.GetInstance().get_Mode() === ClientLib.Vis.Mode.CombatSetup) {
								this.CityPreArmyUnits = CurrentOwnCity.get_CityArmyFormationsManager().GetUpdatedFormationByTargetBaseId(this.CurrentCity.get_Id());
								phe.cnc.Util.attachNetEvent(this.CityPreArmyUnits, "ArmyChanged", ClientLib.Data.CityPreArmyUnitsChanged, this, this.__CityPreArmyUnitsChanged);
								this.__CityPreArmyUnitsChanged();
							}
						}
					},
					__CurrentCityChange : function (oldId, newId) {
						if (this.CurrentOwnCity !== null && this.CurrentCity !== null && this.CityPreArmyUnits !== null)
							phe.cnc.Util.detachNetEvent(this.CityPreArmyUnits, "ArmyChanged", ClientLib.Data.CityPreArmyUnitsChanged, this, this.__CityPreArmyUnitsChanged);
						var CurrentCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(newId);
						if (CurrentCity !== null && !CurrentCity.IsOwnBase()) {
							this.CurrentCity = CurrentCity;
							if (this.CurrentOwnCity !== null && ClientLib.Vis.VisMain.GetInstance().get_Mode() === ClientLib.Vis.Mode.CombatSetup) {
								this.CityPreArmyUnits = this.CurrentOwnCity.get_CityArmyFormationsManager().GetUpdatedFormationByTargetBaseId(CurrentCity.get_Id());
								phe.cnc.Util.attachNetEvent(this.CityPreArmyUnits, "ArmyChanged", ClientLib.Data.CityPreArmyUnitsChanged, this, this.__CityPreArmyUnitsChanged);
								this.__CityPreArmyUnitsChanged();
							}
						}
					},
					__ViewModeChange : function (oldMode, newMode) {
						if (newMode == ClientLib.Vis.Mode.CombatSetup && this.CurrentCity !== null && this.CurrentOwnCity !== null) {
							this.CityPreArmyUnits = this.CurrentOwnCity.get_CityArmyFormationsManager().GetUpdatedFormationByTargetBaseId(this.CurrentCity.get_Id());
							phe.cnc.Util.attachNetEvent(this.CityPreArmyUnits, "ArmyChanged", ClientLib.Data.CityPreArmyUnitsChanged, this, this.__CityPreArmyUnitsChanged);
							this.__CityPreArmyUnitsChanged();
						} else if (oldMode == ClientLib.Vis.Mode.CombatSetup && this.CityPreArmyUnits !== null) {
							phe.cnc.Util.detachNetEvent(this.CityPreArmyUnits, "ArmyChanged", ClientLib.Data.CityPreArmyUnitsChanged, this, this.__CityPreArmyUnitsChanged);
							this.CityPreArmyUnits = null;
						}
					},
					__CityPreArmyUnitsChanged : function () {
						clearTimeout(this.__Timeout);
						if (this.CurrentCity.get_Version() >= 0 && ClientLib.Vis.VisMain.GetInstance().GetActiveView().get_VisAreaComplete()) {
							this.__Timeout = setTimeout(this._onCityPreArmyUnitsChanged.bind(this), 100);
						} else if (this.CurrentCity.get_Version() == -1 || (this.CurrentCity.get_Version() >= 0 && !ClientLib.Vis.VisMain.GetInstance().GetActiveView().get_VisAreaComplete())) {
							this.__Timeout = setTimeout(this.__CityPreArmyUnitsChanged.bind(this), 100);
						}
					},
					_onCityPreArmyUnitsChanged : function () {
						this.fireEvent("OnCityPreArmyUnitsChanged");
					},
					patchSetEnabled : function () {
						try {
							var set_Enabled = ClientLib.Data.CityPreArmyUnit.prototype.set_Enabled.toString(),
								args = set_Enabled.substring(set_Enabled.indexOf("(") + 1, set_Enabled.indexOf(")")),
								body = set_Enabled.substring(set_Enabled.indexOf("{") + 1, set_Enabled.lastIndexOf("}"));
							body = body + "TABS.PreArmyUnits.getInstance().__CityPreArmyUnitsChanged();";
							/*jslint evil: true */
							ClientLib.Data.CityPreArmyUnit.prototype.set_Enabled = Function(args, body);
							/*jslint evil: false */
						} catch (e) {
							console.group("Tiberium Alliances Battle Simulator V2");
							console.error("Error setting up ClientLib.Data.CityPreArmyUnit.prototype.set_Enabled", e);
							console.groupEnd();
						}
					}
				},
				defer : function () {
					TABS.addInit("TABS.PreArmyUnits");
				}
			});
			qx.Class.define("TABS.PreArmyUnits.AutoSimulate", {			// [singleton]	Auto simulate battle
				type : "singleton",
				extend : qx.core.Object,
				construct : function () {
					try {
                        this.base(arguments);
						if (this.getEnabled())
							TABS.PreArmyUnits.getInstance().addListener("OnCityPreArmyUnitsChanged", this.SimulateBattle, this);
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up PreArmyUnits.AutoSimulate constructor", e);
						console.groupEnd();
					}
				},
				properties : {
					enabled : {
						check : "Boolean",
						init : TABS.SETTINGS.get("PreArmyUnits.AutoSimulate", true),
						apply : "_applyEnabled",
						event : "changeEnabled"
					}
				},
				members : {
					_applyEnabled : function (newValue) {
						TABS.SETTINGS.set("PreArmyUnits.AutoSimulate", newValue);
						if (newValue === true)
							TABS.PreArmyUnits.getInstance().addListener("OnCityPreArmyUnitsChanged", this.SimulateBattle, this);
						else
							TABS.PreArmyUnits.getInstance().removeListener("OnCityPreArmyUnitsChanged", this.SimulateBattle, this);
					},
					SimulateBattle : function () {
						var formation = TABS.UTIL.Formation.Get();
						if (formation !== null && formation.length > 0) {
							var cache = TABS.CACHE.getInstance().check(formation);
							if (cache.result === null)
								TABS.APISimulation.getInstance().SimulateBattle();
						}
					}
				},
				events : {
					"changeEnabled" : "qx.event.type.Data"
				},
				defer : function () {
					TABS.addInit("TABS.PreArmyUnits.AutoSimulate");
				}
			});
			qx.Class.define("TABS.GUI.ArmySetupAttackBar", {			// [singleton]	Shift and Mirror Buttons
				type : "singleton",
				extend : qx.core.Object,
				include : [qx.locale.MTranslation],
				construct : function () {
					try {
						this.base(arguments);
						this.ArmySetupAttackBar = qx.core.Init.getApplication().getArmySetupAttackBar();

						// Mirror and Shift Buttons left Side (Rows/Wave)
						var i,
							cntWave;
						for (i = 0; i < ClientLib.Base.Util.get_ArmyMaxSlotCountY(); i++) {
						
							if (PerforceChangelist >= 441469) { // 15.4 patch
								cntWave = this.ArmySetupAttackBar.getMainContainer().getChildren()[(i + 3)];
							} else { //old
								   cntWave = this.ArmySetupAttackBar.getMainContainer().getChildren()[(i + 4)];
							}
							cntWave._removeAll();
							cntWave._setLayout(new qx.ui.layout.HBox());
							cntWave._add(this.newSideButton(TABS.RES.IMG.Flip.H, this.tr("Mirrors units horizontally."), this.onClick_btnMirror, "h", i));
							cntWave._add(new qx.ui.core.Spacer(), {
								flex : 1
							});
							cntWave._add(this.newSideButton(TABS.RES.IMG.Arrows.Left, this.tr("Shifts units one space left."), this.onClick_btnShift, "l", i));
							cntWave._add(this.newSideButton(TABS.RES.IMG.Arrows.Right, this.tr("Shifts units one space right."), this.onClick_btnShift, "r", i));
							
						}

						// Mirror and Shift Buttons top
						var formation = this.ArmySetupAttackBar.getMainContainer().getChildren()[1].getChildren()[0],
							btnHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()),
							btnHBoxouter = new qx.ui.container.Composite(new qx.ui.layout.HBox());
						btnHBoxouter.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						btnHBoxouter.add(btnHBox);
						btnHBoxouter.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						this.ArmySetupAttackBar.getChildren()[2].addAt(btnHBoxouter, 0, {
							left : 16,
							top : 2,
							right : 0
						});
                        var formationContainer = this.ArmySetupAttackBar.getMainContainer();
                        formationContainer.setMarginTop(formationContainer.getMarginTop() + 20);
						
						formation.bind("changeWidth", btnHBox, "width");

						for (i = 0; i < ClientLib.Base.Util.get_ArmyMaxSlotCountX(); i++) {
							btnHBox.add(new qx.ui.core.Spacer(), {
								flex : 1
							});
							btnHBox.add(this.newTopButton(TABS.RES.IMG.Flip.V, this.tr("Mirrors units vertically."), this.onClick_btnMirror, "v", i));
							btnHBox.add(new qx.ui.core.Spacer().set({
									width : 2
								}));
							btnHBox.add(this.newTopButton(TABS.RES.IMG.Arrows.Up, this.tr("Shifts units one space up."), this.onClick_btnShift, "u", i));
							btnHBox.add(this.newTopButton(TABS.RES.IMG.Arrows.Down, this.tr("Shifts units one space down."), this.onClick_btnShift, "d", i));
							btnHBox.add(new qx.ui.core.Spacer(), {
								flex : 1
							});
						}
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up GUI.ArmySetupAttackBar constructor", e);
						console.groupEnd();
					}
				},
				destruct : function () {},
				members : {
					ArmySetupAttackBar : null,
					newSideButton : function (icon, text, onClick, pos, sel) {
						var btn = new qx.ui.form.ModelButton(null, icon).set({
								toolTipText : text,
								width : 20,
								maxHeight : 25,
								alignY : "middle",
								show : "icon",
								iconPosition : "top",
								appearance : "button-addpoints",
								model : [pos, sel]
							});
						btn.getChildControl("icon").set({
							maxWidth : 16,
							maxHeight : 16,
							scale : true
						});
						btn.addListener("click", onClick, this);
						return btn;
					},
					newTopButton : function (icon, text, onClick, pos, sel) {
						var btn = new qx.ui.form.ModelButton(null, icon).set({
								toolTipText : text,
								width : 25,
								maxHeight : 20,
								alignY : "middle",
								show : "icon",
								iconPosition : "top",
								appearance : "button-addpoints",
								opacity : 0.3,
								model : [pos, sel]
							});
						btn.getChildControl("icon").set({
							maxWidth : 14,
							maxHeight : 14,
							scale : true
						});
						btn.addListener("click", onClick, this);
						btn.addListener("mouseover", function (e) {
							e.getTarget().set({
								opacity : 1.0
							});
						}, this);
						btn.addListener("mouseout", function (e) {
							e.getTarget().set({
								opacity : 0.3
							});
						}, this);
						return btn;
					},
					onClick_btnMirror : function (e) {
						var formation = TABS.UTIL.Formation.Get();
						formation = TABS.UTIL.Formation.Mirror(formation, e.getTarget().getModel()[0], e.getTarget().getModel()[1]);
						TABS.UTIL.Formation.Set(formation);
					},
					onClick_btnShift : function (e) {
						var formation = TABS.UTIL.Formation.Get();
						formation = TABS.UTIL.Formation.Shift(formation, e.getTarget().getModel()[0], e.getTarget().getModel()[1]);
						TABS.UTIL.Formation.Set(formation);
					}
				},
				defer : function () {
					TABS.addInit("TABS.GUI.ArmySetupAttackBar");
				}
			});
			
            qx.Class.define("TABS.GUI.MovableBox", {
                extend : qx.ui.container.Composite,
                include : qx.ui.core.MMovable,
                construct : function(layout)
                {
                    this.base(arguments);
                    try
                    {
                        this.setLayout(layout);
                        this._activateMoveHandle(this);
                        //resizer.setLayout(new qx.ui.layout.HBox());
                    }
                    catch(e)
                    {
                        console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up GUI.MovableBox constructor", e);
						console.groupEnd();
                    }
                }
            });
			
			qx.Class.define("TABS.GUI.PlayArea", {						// [singleton]	View Simulation, Open Stats Window
				type : "singleton",
				extend : qx.core.Object,
				include : [qx.locale.MTranslation],
				construct : function () {
					try {
                        this.base(arguments);
						this.PlayArea = qx.core.Init.getApplication().getPlayArea();
						this.HUD = this.PlayArea.getHUD();
						var WDG_COMBATSWAPVIEW = this.HUD.getUIItem(ClientLib.Data.Missions.PATH.WDG_COMBATSWAPVIEW);

						//View Simulation
						this.btnSimulation = new webfrontend.ui.SoundButton(null, TABS.RES.IMG.Simulate).set({
								toolTipText : this.tr("View Simulation") + " [NUM 0]",
								width : 44,
								height : 44,
								allowGrowX : false,
								allowGrowY : false,
								appearance : "button-baseviews",
								marginRight : 6
							});
						this.btnSimulation.addListener("click", function () {
							this.onClick_btnSimulation();
						}, this);
						TABS.APISimulation.getInstance().bind("time", this.btnSimulation, "label", {
							converter : function (data) {
								return (data / 1000).toFixed(1);
							}
						});
						TABS.APISimulation.getInstance().addListener("OnSimulateBattleFinished", function () {
							this._updateBtnSimulation();
						}, this);
						TABS.APISimulation.getInstance().addListener("OnTimeChange", function () {
							this._updateBtnSimulation();
						}, this);
						TABS.PreArmyUnits.getInstance().addListener("OnCityPreArmyUnitsChanged", function () {
							this._updateBtnSimulation();
						}, this);
						WDG_COMBATSWAPVIEW.getLayoutParent().addAfter(this.btnSimulation, WDG_COMBATSWAPVIEW);

						//Move Box
						this.boxMove = new TABS.GUI.MovableBox(new qx.ui.layout.Grid()).set({
							decorator : "pane-light-plain",
				            opacity : 0.7,
				            paddingTop : 0,
				            paddingLeft : 2,
				            paddingRight : 1,
				            paddingBottom : 3,
                            allowGrowX : false,
                            allowGrowY : false,
						});

						this.boxMove.add(this.newButton(TABS.RES.IMG.Stats, this.tr("Statistic") + " [NUM 7]", this.onClick_btnStats, null, null), {
							row : 0,
							column : 0
						});
						this.boxMove.add(this.newButton(TABS.RES.IMG.Arrows.Up, this.tr("Shifts units one space up.") + " [NUM 8]", this.onClick_btnShift, "u", null), {
							row : 0,
							column : 1
						});
						this.boxMove.add(this.newButton(TABS.RES.IMG.CNCOpt, this.tr("Show current formation with CNCOpt") + " [NUM 9]<br>" + this.tr("Right click: Set formation from CNCOpt Long Link") + "<br>" + this.tr("Remember transported units are not supported."), this.onClick_CNCOpt, null, null), {
							row : 0,
							column : 2
						});
						this.boxMove.add(this.newButton(TABS.RES.IMG.Arrows.Left, this.tr("Shifts units one space left.") + " [NUM 4]", this.onClick_btnShift, "l", null), {
							row : 1,
							column : 0
						});
						this.boxMove.add(this.newButton(TABS.RES.IMG.DisableUnit, this.tr("Enables/Disables all units.") + " [NUM 5]", this.onClick_btnDisable, null, null), {
							row : 1,
							column : 1
						});
						this.boxMove.add(this.newButton(TABS.RES.IMG.Arrows.Right, this.tr("Shifts units one space right.") + " [NUM 6]", this.onClick_btnShift, "r", null), {
							row : 1,
							column : 2
						});
						this.boxMove.add(this.newButton(TABS.RES.IMG.Flip.H, this.tr("Mirrors units horizontally.") + " [NUM 1]", this.onClick_btnMirror, "h", null), {
							row : 2,
							column : 0
						});
						this.boxMove.add(this.newButton(TABS.RES.IMG.Arrows.Down, this.tr("Shifts units one space down.") + " [NUM 2]", this.onClick_btnShift, "d", null), {
							row : 2,
							column : 1
						});
						this.boxMove.add(this.newButton(TABS.RES.IMG.Flip.V, this.tr("Mirrors units vertically.") + " [NUM 3]", this.onClick_btnMirror, "v", null), {
							row : 2,
							column : 2
						});
						this.boxMove.add(this.newButton(TABS.RES.IMG.Offense.Infantry, this.tr("Enables/Disables all infantry units.") + " [NUM *]", this.onClick_btnDisable, ClientLib.Data.EUnitGroup.Infantry, null), {
							row : 3,
							column : 0
						});
						this.boxMove.add(this.newButton(TABS.RES.IMG.Offense.Vehicle, this.tr("Enables/Disables all vehicles.") + " [NUM -]", this.onClick_btnDisable, ClientLib.Data.EUnitGroup.Vehicle, null), {
							row : 3,
							column : 1
						});
						this.boxMove.add(this.newButton(TABS.RES.IMG.Offense.Aircraft, this.tr("Enables/Disables all aircrafts.") + " [NUM +]", this.onClick_btnDisable, ClientLib.Data.EUnitGroup.Aircraft, null), {
							row : 3,
							column : 2
						});
						this.boxMove.add(this.newButton(TABS.RES.IMG.one, this.tr("Swaps lines 1 & 2."), this.onClick_btnSwap_1_2, "k", null), {
							row:4,
							column:0
						});
						this.boxMove.add(this.newButton(TABS.RES.IMG.two, this.tr("Swaps lines 2 & 3."), this.onClick_btnSwap_2_3, "z", null), {
							row:4,
							column:1
						});
						this.boxMove.add(this.newButton(TABS.RES.IMG.three, this.tr("Swaps lines 3 & 4."), this.onClick_btnSwap_3_4, "c", null), {
							row:4,
							column:2
						});
						this.PlayArea.add(this.boxMove, {
                            top : 400,
							left : 65
							//left : 65,
							//right : 7,
							//bottom : 170
						});

						phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this._onViewChanged);
						this._onViewChanged(ClientLib.Vis.Mode.CombatSetup, null);
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up GUI.PlayArea constructor", e);
						console.groupEnd();
					}
				},
				destruct : function () {},
				members : {
					PlayArea : null,
					HUD : null,
					btnSimulation : null,
					btnStats : null,
					boxMove : null,
					onHotKeyPress : function (key) {
						if (!phe.cnc.Util.isEventTargetInputField(key)) {
							var formation = TABS.UTIL.Formation.Get();
							switch (key.getNativeEvent().keyCode) {
							case 96: // NUM 0
								this.onClick_btnSimulation();
								break;
							case 97: // NUM 1
								formation = TABS.UTIL.Formation.Mirror(formation, "h", null);
								TABS.UTIL.Formation.Set(formation);
								break;
							case 98: // NUM 2
								//formation = TABS.UTIL.Formation.Shift(formation, "d", null);
								//TABS.UTIL.Formation.Set(formation);
								break;
							case 99: // NUM 3
								formation = TABS.UTIL.Formation.Mirror(formation, "v", null);
								TABS.UTIL.Formation.Set(formation);
								break;
							case 100: // NUM 4
								//formation = TABS.UTIL.Formation.Shift(formation, "l", null);
								//TABS.UTIL.Formation.Set(formation);
								break;
							case 101: // NUM 5
								formation = TABS.UTIL.Formation.toggle_Enabled(formation);
								TABS.UTIL.Formation.Set(formation);
								break;
							case 102: // NUM 6
								//formation = TABS.UTIL.Formation.Shift(formation, "r", null);
								//TABS.UTIL.Formation.Set(formation);
								break;
							case 103: // NUM 7
								//this.onClick_btnStats();
								break;
							case 104: // NUM 8
								//formation = TABS.UTIL.Formation.Shift(formation, "u", null);
								//TABS.UTIL.Formation.Set(formation);
								break;
							case 105: // NUM 9
								//this.onClick_CNCOpt();
								break;
							case 106: // NUM *
								formation = TABS.UTIL.Formation.toggle_Enabled(formation, ClientLib.Data.EUnitGroup.Infantry);
								TABS.UTIL.Formation.Set(formation);
								break;
							case 107: // NUM +
								formation = TABS.UTIL.Formation.toggle_Enabled(formation, ClientLib.Data.EUnitGroup.Aircraft);
								TABS.UTIL.Formation.Set(formation);
								break;
							case 109: // NUM -
								formation = TABS.UTIL.Formation.toggle_Enabled(formation, ClientLib.Data.EUnitGroup.Vehicle);
								TABS.UTIL.Formation.Set(formation);
								break;
							case 110: // NUM ,
								break;
							case 111: // NUM /
								break;
							}
						}
					},
					_onViewChanged : function (oldMode, newMode) {
						if (newMode == ClientLib.Vis.Mode.CombatSetup) {
							this.btnSimulation.show();
							this.boxMove.show();
							qx.bom.Element.addListener(document, "keydown", this.onHotKeyPress, this);
						}
						if (oldMode == ClientLib.Vis.Mode.CombatSetup) {
							this.btnSimulation.hide();
							this.boxMove.hide();
							qx.bom.Element.removeListener(document, "keydown", this.onHotKeyPress, this);
							TABS.APISimulation.getInstance().removeListener("OnSimulateBattleFinished", this.OnSimulateBattleFinished, this);
						}
						if ((newMode == ClientLib.Vis.Mode.CombatSetup || newMode == ClientLib.Vis.Mode.Battleground) && TABS.SETTINGS.get("GUI.Window.Stats.open", true) && !TABS.GUI.Window.Stats.getInstance().isVisible())
							TABS.GUI.Window.Stats.getInstance().open();
					},
					_updateBtnSimulation : function () {
						var formation = TABS.UTIL.Formation.Get();
						if (formation !== null) {
							if (TABS.UTIL.Formation.IsFormationInCache()) {
								this.btnSimulation.setEnabled(true);
								this.btnSimulation.setShow("icon");
							} else {
								this.btnSimulation.setEnabled(!TABS.APISimulation.getInstance().getLock() && TABS.UTIL.Formation.Get().length > 0);
								if (TABS.APISimulation.getInstance().getData().length === 0 || TABS.UTIL.Formation.Get().length === 0)
									this.btnSimulation.setShow("icon");
								else if (this.btnSimulation.getShow() !== "label") {
									this.btnSimulation.setShow("label");
								}
							}
						} else {
							this.btnSimulation.setEnabled(false);
							this.btnSimulation.setShow("icon");
						}
					},
					onClick_btnSimulation : function () {
						var cache = TABS.CACHE.getInstance().check(TABS.UTIL.Formation.Get());
						if (cache.result === null || cache.result.combat === undefined) {
							TABS.APISimulation.getInstance().addListener("OnSimulateBattleFinished", this.OnSimulateBattleFinished, this);
							TABS.APISimulation.getInstance().SimulateBattle();
						} else {
							var CurrentCityId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
                            TABS.UTIL.Battleground.StartReplay(CurrentCityId, cache.result.combat);
						}
					},
					OnSimulateBattleFinished : function (data) {
						TABS.APISimulation.getInstance().removeListener("OnSimulateBattleFinished", this.OnSimulateBattleFinished, this);
						var CurrentCityId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
                        TABS.UTIL.Battleground.StartReplay(CurrentCityId, data.getData().d);
					},
					onClick_btnStats : function () {
						if (TABS.GUI.Window.Stats.getInstance().isVisible()) {
							TABS.SETTINGS.set("GUI.Window.Stats.open", false);
							TABS.GUI.Window.Stats.getInstance().close();
						} else {
							TABS.SETTINGS.set("GUI.Window.Stats.open", true);
							TABS.GUI.Window.Stats.getInstance().open();
						}
					},
					newButton : function (icon, text, onClick, pos, sel) {
						var btn = new qx.ui.form.ModelButton(null, icon).set({
								toolTipText : text,
								width : 22,
								height : 22,
								show : "icon",
								iconPosition : "top",
								appearance : "button-addpoints",
								model : [pos, sel]
							});
						btn.getChildControl("icon").set({
							maxWidth : 16,
							maxHeight : 16,
							scale : true
						});
						btn.addListener("click", onClick, this);
						return btn;
					},
					onClick_btnMirror : function (e) {
						var formation = TABS.UTIL.Formation.Get();
						formation = TABS.UTIL.Formation.Mirror(formation, e.getTarget().getModel()[0], e.getTarget().getModel()[1]);
						TABS.UTIL.Formation.Set(formation);
					},
					onClick_btnShift : function (e) {
						var formation = TABS.UTIL.Formation.Get();
						formation = TABS.UTIL.Formation.Shift(formation, e.getTarget().getModel()[0], e.getTarget().getModel()[1]);
						TABS.UTIL.Formation.Set(formation);
					},
					onClick_btnSwap_1_2 : function (e) {
						var formation = TABS.UTIL.Formation.Get(),
						formation = TABS.UTIL.Formation.SwapLines(formation, 1, 2);
						TABS.UTIL.Formation.Set(formation);
					},
					onClick_btnSwap_2_3 : function (e) {
						var formation = TABS.UTIL.Formation.Get(),
						formation = TABS.UTIL.Formation.SwapLines(formation, 2, 3);
						TABS.UTIL.Formation.Set(formation);
					},
					onClick_btnSwap_3_4 : function (e) {
						var formation = TABS.UTIL.Formation.Get(),
						formation = TABS.UTIL.Formation.SwapLines(formation, 3, 4);
						TABS.UTIL.Formation.Set(formation);
					},
					onClick_btnDisable : function (e) {
						var formation = TABS.UTIL.Formation.Get();
						formation = TABS.UTIL.Formation.toggle_Enabled(formation, e.getTarget().getModel()[0]);
						TABS.UTIL.Formation.Set(formation);
					},
					onClick_CNCOpt : function (e) {
						if (e && e.isRightPressed())
							TABS.UTIL.Formation.Set(TABS.UTIL.CNCOpt.parseLink(prompt(this.tr("Enter CNCOpt Long Link:"))));
						else
							qx.core.Init.getApplication().showExternal(TABS.UTIL.CNCOpt.createLink());
					}
				},
				defer : function () {
					TABS.addInit("TABS.GUI.PlayArea");
				}
			});
			qx.Class.define("TABS.GUI.ReportReplayOverlay", {			// [singleton]	Back Button
				type : "singleton",
				extend : qx.core.Object,
				include : [qx.locale.MTranslation],
				construct : function () {
					try {
                        this.base(arguments);
						var qxApp = qx.core.Init.getApplication();
						this.ReportReplayOverlay = qx.core.Init.getApplication().getReportReplayOverlay();

						this.btnBack = new qx.ui.form.Button(qxApp.tr("tnf:back")).set({
								toolTipText : qxApp.tr("tnf:back"),
								width : 53,
								height : 24,
								appearance : "button-friendlist-scroll"
							});
						this.btnBack.addListener("click", this.onClick_btnBack, this);
						this.ReportReplayOverlay.add(this.btnBack, {
							top : 10,
							right : 540
						});

						this.btnSkip = new qx.ui.form.Button(qxApp.tr("Skip")).set({
								toolTipText : qxApp.tr("Skip"),
								width : 52,
								height : 24,
								appearance : "button-friendlist-scroll"
							});
						this.btnSkip.addListener("click", this.onClick_btnSkip, this);
						this.ReportReplayOverlay.add(this.btnSkip, {
							top : 10,
							left : 542
						});
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up GUI.ReportReplayOverlay constructor", e);
						console.groupEnd();
					}
				},
				destruct : function () {},
				members : {
					ReportReplayOverlay : null,
					btnBack : null,
					btnSkip : null,
					onClick_btnBack : function () {
						try {
                        				var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
			                            	if (city !== null) {
				                           	qx.core.Init.getApplication().getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, city.get_Id(), 0, 0);
				                           	ClientLib.Vis.VisMain.GetInstance().get_CombatSetup().SetPosition(0, qx.core.Init.getApplication().getPlayArea().getHUD().getCombatSetupOffset(ClientLib.Vis.CombatSetup.CombatSetupViewMode.Defense));
				                    	}
				                }
				                catch(e)
				                {
				                        console.group("Tiberium Alliances Battle Simulator V2");
				                        console.error("Error onClick_btnBack", e);
				                        console.groupEnd();
				                }
					},
					onClick_btnSkip : function () {
						if (ClientLib.Vis.VisMain.GetInstance().get_Battleground().get_Simulation !== undefined && ClientLib.Vis.VisMain.GetInstance().get_Battleground().get_Simulation().DoStep !== undefined) {
							while (ClientLib.Vis.VisMain.GetInstance().get_Battleground().get_Simulation().DoStep(false)) {}
							ClientLib.Vis.VisMain.GetInstance().get_Battleground().set_ReplaySpeed(1);
						} else {
							var BattleDuration = ClientLib.Vis.VisMain.GetInstance().get_Battleground().get_BattleDuration(),
								LastBattleTime = ClientLib.Vis.VisMain.GetInstance().get_Battleground().get_LastBattleTime();
							if (LastBattleTime >= BattleDuration)
								ClientLib.Vis.VisMain.GetInstance().get_Battleground().RestartReplay();
							ClientLib.Vis.VisMain.GetInstance().get_Battleground().set_ReplaySpeed(10000);
							phe.cnc.base.Timer.getInstance().addListener("uiTick", this.onTick_btnSkip, this);
						}
					},
					onTick_btnSkip : function () {
						var BattleDuration = ClientLib.Vis.VisMain.GetInstance().get_Battleground().get_BattleDuration(),
							LastBattleTime = ClientLib.Vis.VisMain.GetInstance().get_Battleground().get_LastBattleTime();
						if (LastBattleTime >= BattleDuration) {
							phe.cnc.base.Timer.getInstance().removeListener("uiTick", this.onTick_btnSkip, this);
							ClientLib.Vis.VisMain.GetInstance().get_Battleground().set_ReplaySpeed(1);
						}
					}
				},
				defer : function () {
					TABS.addInit("TABS.GUI.ReportReplayOverlay");
				}
			});
			qx.Class.define("TABS.GUI.Window.Stats", {					// [singleton]	Stats Window
				type : "singleton",
				extend : qx.ui.window.Window,
				construct : function () {
					try {
						this.base(arguments);
						this.set({
							layout : new qx.ui.layout.VBox(),
							caption : "TABS: " + this.tr("Statistic"),
							icon : TABS.RES.IMG.Stats,
							minWidth : 175,
							contentPadding : 4,
							contentPaddingTop : 0,
							contentPaddingBottom : 3,
							allowMaximize : false,
							showMaximize : false,
							allowMinimize : false,
							showMinimize : false,
							resizable : true,
							resizableTop : false,
							resizableBottom : false,
							useResizeFrame : false
						});
						this.moveTo(
							TABS.SETTINGS.get("GUI.Window.Stats.position", [124, 31])[0],
							TABS.SETTINGS.get("GUI.Window.Stats.position", [124, 31])[1]);
						this.addListener("move", function () {
							TABS.SETTINGS.set("GUI.Window.Stats.position", [this.getBounds().left, this.getBounds().top]);
						}, this);
						this.addListener("resize", function () {
							TABS.SETTINGS.set("GUI.Window.Stats.width", this.getWidth());
							this.makeSimView();
						}, this);
						this.addListener("changeHeight", function () {
							if (this.getHeight() !== null)
								this.resetHeight();
						});
						this.addListener("appear", this.onAppear, this);
						this.addListener("close", this.onClose, this);
						this.setWidth(TABS.SETTINGS.get("GUI.Window.Stats.width", 175));
						this.getChildControl("close-button").addListener("execute", function () {
							TABS.SETTINGS.set("GUI.Window.Stats.open", false);
						}, this);
						this.getChildControl("icon").set({
							width : 20,
							height : 20,
							scale : true,
							alignY : "middle"
						});
						this.setStatus("0 " + this.tr("simulations in cache"));
                        
                        //Enemy Health Section//
						this.EnemyHeader = this.makeHeader(this.tr("tnf:combat target"));
						this.EnemyHeader.addListener("click", function () {
							if (this.GUI.Enemy.isVisible()) {
								this.GUI.Enemy.exclude();
								TABS.SETTINGS.set("GUI.Window.Stats.Enemy.visible", false);
							} else {
								this.GUI.Enemy.show();
								TABS.SETTINGS.set("GUI.Window.Stats.Enemy.visible", true);
							}
						}, this);

						//Repair Section//
						this.RepairHeader = this.makeHeader(this.tr("tnf:own repair cost").replace(":", ""));
						this.RepairHeader.addListener("click", function () {
							if (this.GUI.Repair.isVisible()) {
								this.GUI.Repair.exclude();
								TABS.SETTINGS.set("GUI.Window.Stats.Repair.visible", false);
							} else {
								this.GUI.Repair.show();
								TABS.SETTINGS.set("GUI.Window.Stats.Repair.visible", true);
							}
						}, this);

						//Loot Section//
						this.LootHeader = this.makeHeader(this.tr("tnf:lootable resources:").replace(":", ""));
						this.LootHeader.addListener("click", function () {
							if (this.GUI.Loot.isVisible()) {
								this.GUI.Loot.exclude();
								TABS.SETTINGS.set("GUI.Window.Stats.Loot.visible", false);
							} else {
								this.GUI.Loot.show();
								TABS.SETTINGS.set("GUI.Window.Stats.Loot.visible", true);
							}
						}, this);
						this.GUI = {
							Battle : new qx.ui.container.Composite(new qx.ui.layout.HBox(-2)).set({
								decorator : "pane-light-plain",
								allowGrowX : true,
								marginLeft : 0,
								marginRight : 0
							}),
							Enemy : new qx.ui.container.Composite(new qx.ui.layout.HBox(-2)).set({
								decorator : "pane-light-plain",
								allowGrowX : true,
                                marginTop : -18,
								marginLeft : 0,
								marginRight : 0
							}),
							Repair : new qx.ui.container.Composite(new qx.ui.layout.HBox(-2)).set({
								decorator : "pane-light-plain",
								allowGrowX : true,
                                marginTop : -18,
                                marginLeft : 0,
								marginRight : 0
							}),
							Loot : new qx.ui.container.Composite(new qx.ui.layout.HBox(-2)).set({
								decorator : "pane-light-plain",
								allowGrowX : true,
                                marginTop : -18,
								marginLeft : 0,
								marginRight : 0
							}),
							Buttons : new qx.ui.container.Composite(new qx.ui.layout.HBox(-2)).set({
								decorator : "pane-light-plain",
								allowGrowX : true,
								marginLeft : 0,
								marginRight : 0
							})
						};
						this.LabelsVBox = {
							Battle : new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
								width : 29,
								padding : 9,
								allowGrowX : true,
								marginLeft : 0,
								marginRight : 0
							}),
							Enemy : new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
								width : 29,
								padding : 9,
                                marginTop : 10,
								allowGrowX : true,
								marginLeft : 0,
								marginRight : 0
							}),
							Repair : new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
								width : 29,
								padding : 9,
                                marginTop : 10,
								allowGrowX : true,
								marginLeft : 0,
								marginRight : 0
							}),
							Loot : new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
								width : 29,
								padding : 9,
                                marginTop : 10,
								allowGrowX : true,
								marginLeft : 0,
								marginRight : 0
							}),
							Buttons : new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
								width : 29,
								padding : 9,
								allowGrowX : true,
								marginLeft : 0,
								marginRight : 0
							})
						};
						this.Label = {
							Battle : {
								Preset : new TABS.GUI.Window.Stats.Atom("P", null, this.tr("Preset")),
								Outcome : new TABS.GUI.Window.Stats.Atom("O", null, this.tr("tnf:combat report")),
								Duration : new TABS.GUI.Window.Stats.Atom("D", null, this.tr("tnf:combat timer npc: %1", "")),
								OwnCity : new TABS.GUI.Window.Stats.Atom("B", null, this.tr("tnf:base")),
								Morale : new TABS.GUI.Window.Stats.Atom("M", null, this.tr("Morale"))
							},
							Enemy : {
								Overall : new TABS.GUI.Window.Stats.Atom(this.tr("tnf:total"), TABS.RES.IMG.Enemy.All),
								Defense : new TABS.GUI.Window.Stats.Atom(this.tr("tnf:defense"), TABS.RES.IMG.Enemy.Defense),
								Structure : new TABS.GUI.Window.Stats.Atom(this.tr("tnf:base"), TABS.RES.IMG.Enemy.Base),
								Construction_Yard : new TABS.GUI.Window.Stats.Atom("CY", null, TABS.RES.getDisplayName(ClientLib.Base.ETechName.Construction_Yard, ClientLib.Base.EFactionType.GDIFaction)),
								Defense_Facility : new TABS.GUI.Window.Stats.Atom("DF", null, TABS.RES.getDisplayName(ClientLib.Base.ETechName.Defense_Facility, ClientLib.Base.EFactionType.GDIFaction)),
								Command_Center : new TABS.GUI.Window.Stats.Atom("CC", null, TABS.RES.getDisplayName(ClientLib.Base.ETechName.Command_Center, ClientLib.Base.EFactionType.GDIFaction)),
								Barracks : new TABS.GUI.Window.Stats.Atom("B", TABS.RES.IMG.Offense.Infantry, TABS.RES.getDisplayName(ClientLib.Base.ETechName.Barracks, ClientLib.Base.EFactionType.GDIFaction)),
								Factory : new TABS.GUI.Window.Stats.Atom("F", TABS.RES.IMG.Offense.Vehicle, TABS.RES.getDisplayName(ClientLib.Base.ETechName.Factory, ClientLib.Base.EFactionType.GDIFaction)),
								Airport : new TABS.GUI.Window.Stats.Atom("A", TABS.RES.IMG.Offense.Aircraft, TABS.RES.getDisplayName(ClientLib.Base.ETechName.Airport, ClientLib.Base.EFactionType.GDIFaction)),
								Support : new TABS.GUI.Window.Stats.Atom("S", null, this.tr("tnf:support"))
							},
							Repair : {
								Storage : new TABS.GUI.Window.Stats.Atom(this.tr("tnf:offense repair time"), TABS.RES.IMG.RepairCharge.Base),
								Overall : new TABS.GUI.Window.Stats.Atom(this.tr("tnf:repair points"), TABS.RES.IMG.RepairCharge.Offense),
								Crystal : new TABS.GUI.Window.Stats.Atom(this.tr("tnf:crystals"), TABS.RES.IMG.Resource.Crystal),
								Infantry : new TABS.GUI.Window.Stats.Atom(this.tr("tnf:infantry repair title"), TABS.RES.IMG.RepairCharge.Infantry),
								Vehicle : new TABS.GUI.Window.Stats.Atom(this.tr("tnf:vehicle repair title"), TABS.RES.IMG.RepairCharge.Vehicle),
								Aircraft : new TABS.GUI.Window.Stats.Atom(this.tr("tnf:aircraft repair title"), TABS.RES.IMG.RepairCharge.Aircraft)
							},
							Loot : {
								Tiberium : new TABS.GUI.Window.Stats.Atom(this.tr("tnf:tiberium"), TABS.RES.IMG.Resource.Tiberium),
								Crystal : new TABS.GUI.Window.Stats.Atom(this.tr("tnf:crystals"), TABS.RES.IMG.Resource.Crystal),
								Credits : new TABS.GUI.Window.Stats.Atom(this.tr("tnf:credits"), TABS.RES.IMG.Resource.Credits),
								ResearchPoints : new TABS.GUI.Window.Stats.Atom(this.tr("tnf:research points"), TABS.RES.IMG.Resource.ResearchPoints),
								Overall : new TABS.GUI.Window.Stats.Atom(this.tr("tnf:total") + " " + this.tr("tnf:loot"), TABS.RES.IMG.Resource.Transfer)
							},
							Buttons : {
								View : new TABS.GUI.Window.Stats.Atom(this.tr("View Simulation"), TABS.RES.IMG.Simulate).set({
									marginTop : 1,
									marginBottom : 5
								})
							}
						};
						for (var i in this.GUI) {
							for (var j in this.Label[i])
								this.LabelsVBox[i].add(this.Label[i][j]);
							this.GUI[i].add(this.LabelsVBox[i], {
								flex : 0
							});
						}
						
						this.add(this.GUI.Battle);
						this.add(this.EnemyHeader);
						this.add(this.GUI.Enemy);
						this.add(this.RepairHeader);
						this.add(this.GUI.Repair);
						this.add(this.LootHeader);
						this.add(this.GUI.Loot);
						this.add(this.GUI.Buttons);
						this.add(this.getChildControl("statusbar"));
						this.getChildControl("statusbar-text").set({
							textColor : "#BBBBBB"
						});
						this.getChildControl("statusbar").add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						var fontsize = qx.theme.manager.Font.getInstance().resolve(this.getChildControl("statusbar-text").getFont()).getSize(),
							lblReset = new qx.ui.basic.Label(this.tr("Reset")).set({
								textColor : "#115274",
								font : new qx.bom.Font("statusbar-text").set({
									size : fontsize,
									decoration : "underline"
								})
							});
						lblReset.addListener("click", function () {
							var CurrentCityId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
							if (CurrentCityId)
								TABS.CACHE.getInstance().clear(CurrentCityId);
						}, this);
						this.getChildControl("statusbar").add(lblReset);

						if (TABS.SETTINGS.get("GUI.Window.Stats.Enemy.visible", true) === false)
							this.GUI.Enemy.exclude();
						if (TABS.SETTINGS.get("GUI.Window.Stats.Repair.visible", true) === false)
							this.GUI.Repair.exclude();
						if (TABS.SETTINGS.get("GUI.Window.Stats.Loot.visible", true) === false)
							this.GUI.Loot.exclude();

						this.simViews = [];

						phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this._onViewChanged);
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up TABS.GUI.Window.Stats constructor", e);
						console.groupEnd();
					}
				},
				destruct : function () {},
				members : {
					GUI : null,
					LabelsVBox : null,
					Label : null,
					EnemyHeader : null,
					RepairHeader : null,
					LootHeader : null,
					simViews : null,
                    StatsChanged : false,
					onAppear : function () {
						phe.cnc.base.Timer.getInstance().addListener("uiTick", this.__onTick, this);
                        TABS.CACHE.getInstance().addListener("addSimulation", this.__updateStats, this);
						TABS.PreArmyUnits.getInstance().addListener("OnCityPreArmyUnitsChanged", this.__updateStats, this);
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.__CurrentCityChange);
						phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.__CurrentCityChange);
                        this.__updateStats();
					},
					onClose : function () {
						phe.cnc.base.Timer.getInstance().removeListener("uiTick", this.__onTick, this);
                        TABS.CACHE.getInstance().removeListener("addSimulation", this.__updateStats, this);
						TABS.PreArmyUnits.getInstance().removeListener("OnCityPreArmyUnitsChanged", this.__updateStats, this);
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.__CurrentCityChange);
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentChange", ClientLib.Data.CurrentCityChange, this, this.__CurrentCityChange);
                        for (var i in this.simViews) {
                            this.simViews[i].resetStats();
                            this.simViews[i].__onTick();
                        }
					},
					__onTick : function () {
                        var CurrentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
						if (!ClientLib.Vis.VisMain.GetInstance().GetActiveView().get_VisAreaComplete() || CurrentCity === null || CurrentCity.get_Version() < 0) return;
                        if (this.StatsChanged) {
                            this.StatsChanged = false;
                            for (var i in this.simViews) {
                                this.simViews[i].updateStats();
                                this.simViews[i].__onTick();
                            }
                        } else {
                            for (var i in this.simViews) {
                                this.simViews[i].__onTick();
                            }
                        }
						this.setStatus(TABS.CACHE.getInstance().getCitySimAmount().toString() + " " + this.tr("simulations in cache"));
					},
                    __updateStats : function () {
                        this.StatsChanged = true;
                    },
                    __CurrentCityChange : function (oldId, newId) {
						if (ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(newId) === null) {
                            for (var i in this.simViews) {
                                this.simViews[i].resetStats();
                            }
                        }
					},
					_onViewChanged : function (oldMode, newMode) {
						if (newMode != ClientLib.Vis.Mode.CombatSetup && newMode != ClientLib.Vis.Mode.Battleground)
							this.close();
					},
					makeHeader : function (text) {  
                        var Header = new qx.ui.container.Composite(new qx.ui.layout.Grow()).set({
                            alignX : "center",
                            alignY : "middle", 
                            zIndex : 11
                        });
                        Header.add(new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({
								decorator : "pane-light-opaque",
                            allowGrowX : true,
                            allowGrowY : true,
							}));
                        Header.add(new qx.ui.basic.Label(text).set({
                            paddingLeft : 9,
                            allowGrowX : true,
                            allowGrowY : true,
                            paddingBottom : 2,
							font : "font_size_13_bold_shadow"
							}));
						return Header;
					},
					makeSimView : function () {
						var i,
							num = Math.round((this.getWidth() - 30) / 75);
						if (this.simViews.length != num) {
							for (i = 0; i < num; i++) {
								if (this.simViews[i] === undefined) {
									this.simViews[i] = new TABS.GUI.Window.Stats.SimView(i, this);
									this.GUI.Battle.add(this.simViews[i].GUI.Battle, {
										flex : 1,
										width : "100%"
									});
									this.GUI.Enemy.add(this.simViews[i].GUI.Enemy, {
										flex : 1,
										width : "100%"
									});
									this.GUI.Repair.add(this.simViews[i].GUI.Repair, {
										flex : 1,
										width : "100%"
									});
									this.GUI.Loot.add(this.simViews[i].GUI.Loot, {
										flex : 1,
										width : "100%"
									});
									this.GUI.Buttons.add(this.simViews[i].GUI.Buttons, {
										flex : 1,
										width : "100%"
									});
								}
							}
							for (i = 0; i < this.simViews.length; i++) {
								if (i >= num) {
									this.GUI.Battle.remove(this.simViews[i].GUI.Battle);
									this.GUI.Enemy.remove(this.simViews[i].GUI.Enemy);
									this.GUI.Repair.remove(this.simViews[i].GUI.Repair);
									this.GUI.Loot.remove(this.simViews[i].GUI.Loot);
									this.GUI.Buttons.remove(this.simViews[i].GUI.Buttons);
								}
							}
							while (this.simViews.length > num)
								this.simViews.splice(num, 1);
							this.__updateLabels();
                            this.__updateStats();
						}
					},
					__updateLabels : function () {
						if (this.simViews.length > 0) {
							var i,
								visibility;

							//Label.Battle.Morale
							visibility = "excluded";
							for (i in this.simViews) {
								if (this.simViews[i].Label.Battle.Morale.getValue() != "100%") {
									visibility = "visible";
									break;
								}
							}
							for (i in this.simViews)
								this.simViews[i].Label.Battle.Morale.setVisibility(visibility);
							this.Label.Battle.Morale.setVisibility(visibility);

							//Label.Enemy.Defense
							visibility = "excluded";
							if (this.simViews[0].Stats.Enemy.Defense.HealthPoints.getMax() > 0)
								visibility = "visible";
							for (i in this.simViews)
								this.simViews[i].Label.Enemy.Defense.setVisibility(visibility);
							this.Label.Enemy.Defense.setVisibility(visibility);

							//Label.Enemy.Defense_Facility
							visibility = "excluded";
							if (this.simViews[0].Stats.Enemy.Defense_Facility.HealthPoints.getMax() > 0)
								visibility = "visible";
							for (i in this.simViews)
								this.simViews[i].Label.Enemy.Defense_Facility.setVisibility(visibility);
							this.Label.Enemy.Defense_Facility.setVisibility(visibility);

							//Label.Enemy.Command_Center
							visibility = "excluded";
							if (this.simViews[0].Stats.Enemy.Command_Center.HealthPoints.getMax() > 0)
								visibility = "visible";
							for (i in this.simViews)
								this.simViews[i].Label.Enemy.Command_Center.setVisibility(visibility);
							this.Label.Enemy.Command_Center.setVisibility(visibility);

							//Label.Enemy.Barracks
							visibility = "excluded";
							if (this.simViews[0].Stats.Enemy.Barracks.HealthPoints.getMax() > 0)
								visibility = "visible";
							for (i in this.simViews)
								this.simViews[i].Label.Enemy.Barracks.setVisibility(visibility);
							this.Label.Enemy.Barracks.setVisibility(visibility);

							//Label.Enemy.Factory
							visibility = "excluded";
							if (this.simViews[0].Stats.Enemy.Factory.HealthPoints.getMax() > 0)
								visibility = "visible";
							for (i in this.simViews)
								this.simViews[i].Label.Enemy.Factory.setVisibility(visibility);
							this.Label.Enemy.Factory.setVisibility(visibility);

							//Label.Enemy.Airport
							visibility = "excluded";
							if (this.simViews[0].Stats.Enemy.Airport.HealthPoints.getMax() > 0)
								visibility = "visible";
							for (i in this.simViews)
								this.simViews[i].Label.Enemy.Airport.setVisibility(visibility);
							this.Label.Enemy.Airport.setVisibility(visibility);

							//Label.Enemy.Support
							visibility = "excluded";
							if (this.simViews[0].Stats.Enemy.Support.HealthPoints.getMax() > 0)
								visibility = "visible";
							for (i in this.simViews)
								this.simViews[i].Label.Enemy.Support.setVisibility(visibility);
							this.Label.Enemy.Support.setVisibility(visibility);
						}
					}
				}
			});
			qx.Class.define("TABS.GUI.Window.Stats.Atom", {				//				Stats Window Atom
				extend : qx.ui.basic.Atom,
				include : [qx.locale.MTranslation],
				construct : function (label, icon, toolTipText, toolTipIcon) {
					try {
						this.base(arguments, label, icon);
						if (label === undefined)
							label = null;
						if (icon === undefined)
							icon = null;
						if (toolTipText === undefined)
							toolTipText = null;
						if (toolTipIcon === undefined)
							toolTipIcon = null;
						var _toolTipText = (toolTipText !== null ? toolTipText : (label !== null ? label : "")),
							_toolTipIcon = (toolTipIcon !== null ? toolTipIcon : (icon !== null ? icon : "")),
							_show = (toolTipIcon !== null || icon !== null ? "icon" : (toolTipText !== null || label !== null ? "label" : "both"));
						this.initAlignX("center");
						this.initAlignY("middle");
						this.initGap(0);
						this.initIconPosition("top");
						this.initMinHeight(18);
						this.initToolTipText(_toolTipText);
						this.initToolTipIcon(_toolTipIcon);
						this.initShow(_show);
						this.setAlignX("center");
						this.setAlignY("middle");
						this.setGap(0);
						this.setIconPosition("top");
						this.setMinHeight(18);
						this.setToolTipText(_toolTipText);
						this.setToolTipIcon(_toolTipIcon);
						this.setShow(_show);
						this.getChildControl("icon").set({
							width : 18,
							height : 18,
							scale : true,
							alignY : "middle"
						});
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up TABS.GUI.Window.Stats.Atom constructor", e);
						console.groupEnd();
					}
				}
			});
			qx.Class.define("TABS.GUI.Window.Stats.SimView", {			//				Simulation View Objekt
				extend : qx.core.Object,
				include : [qx.locale.MTranslation],
				construct : function (num, window) {
					try {
                        this.base(arguments);
						var i,
							j,
							defaultPreset = TABS.SETTINGS.get("GUI.Window.Stats.SimView." + num, TABS.STATS.getPreset(num));
						if (defaultPreset.Name === undefined)
							defaultPreset = TABS.SETTINGS.set("GUI.Window.Stats.SimView." + num, TABS.STATS.getPreset(num)); // Reset Settings (if no Name)
						if (defaultPreset.Description === undefined)
							defaultPreset = TABS.SETTINGS.set("GUI.Window.Stats.SimView." + num, TABS.STATS.getPreset(num)); // Reset Settings (if no Description)
						this.Num = num;
						this.Window = window;
						this.Cache = {};
						this.Stats = new TABS.STATS();
						this.Name = defaultPreset.Name;
						this.Description = defaultPreset.Description;
						this.Prio = defaultPreset.Prio;
						this.GUI = {
							Battle : new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
								//padding : 5,
								allowGrowX : true,
								marginLeft : 0,
								marginRight : 0,
								decorator : "pane-light-opaque"
							}),
							Enemy : new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
								//padding : 5,
								allowGrowX : true,
                                marginTop : 10,
								marginLeft : 0,
								marginRight : 0,
								decorator : "pane-light-opaque"
							}),
							Repair : new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
								//padding : 5,
								allowGrowX : true,
                                marginTop : 10,
								marginLeft : 0,
								marginRight : 0,
								decorator : "pane-light-opaque"
							}),
							Loot : new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
								//padding : 5,
								allowGrowX : true,
                                marginTop : 10,
								marginLeft : 0,
								marginRight : 0,
								decorator : "pane-light-opaque"
							}),
							Buttons : new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
								//padding : 5,
								allowGrowX : true,
								marginLeft : 0,
								marginRight : 0,
								decorator : "pane-light-opaque"
							})
						};
						this.Label = {
							Battle : {
								Preset : new qx.ui.basic.Label(this.tr(this.Name)).set({
									alignX : "center",
									alignY : "middle",
									minHeight : 18,
									toolTipText : this.tr(this.Description)
								}),
								Outcome : new qx.ui.basic.Atom("-", null).set({
									alignX : "center",
									alignY : "middle",
									gap : 0,
									iconPosition : "top",
									minHeight : 18,
									show : "label"
								}),
								Duration : new qx.ui.basic.Label("-:--").set({
									alignX : "center",
									alignY : "middle",
									minHeight : 18
								}),
								OwnCity : new qx.ui.basic.Label("-").set({
									alignX : "center",
									alignY : "middle",
									minHeight : 18
								}),
								Morale : new qx.ui.basic.Label("-").set({
									alignX : "center",
									alignY : "middle",
									minHeight : 18
								})
							},
							Enemy : {
								Overall : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Enemy",
									subType : "HealthPointsAbs"
								}),
								Defense : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Enemy",
									subType : "HealthPointsAbs"
								}),
								Structure : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Enemy",
									subType : "HealthPointsAbs"
								}),
								Construction_Yard : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Enemy",
									subType : "HealthPointsAbs"
								}),
								Defense_Facility : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Enemy",
									subType : "HealthPointsAbs"
								}),
								Command_Center : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Enemy",
									subType : "HealthPointsAbs"
								}),
								Barracks : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Enemy",
									subType : "HealthPointsAbs"
								}),
								Factory : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Enemy",
									subType : "HealthPointsAbs"
								}),
								Airport : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Enemy",
									subType : "HealthPointsAbs"
								}),
								Support : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Enemy",
									subType : "HealthPointsAbs"
								})
							},
							Repair : {
								Storage : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Repair",
									subType : "RepairStorage"
								}),
								Overall : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Repair",
									subType : "RepairCharge"
								}),
								Crystal : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Repair",
									subType : "Resource"
								}),
								Infantry : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Repair",
									subType : "RepairChargeInf"
								}),
								Vehicle : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Repair",
									subType : "RepairChargeVeh"
								}),
								Aircraft : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Repair",
									subType : "RepairChargeAir"
								})
							},
							Loot : {
								Tiberium : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Loot",
									subType : "Tiberium"
								}),
								Crystal : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Loot",
									subType : "Crystal"
								}),
								Credits : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Loot",
									subType : "Credits"
								}),
								ResearchPoints : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Loot",
									subType : "ResearchPoints"
								}),
								Overall : new TABS.GUI.Window.Stats.SimView.Label("-").set({
									type : "Loot",
									subType : "Resource"
								})
							},
							Buttons : {
								View : new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
									allowGrowX : true,
									marginLeft : 0,
									marginRight : 0
								})
							}
						};
						this.Label.Battle.Outcome.getChildControl("icon").set({
							width : 18,
							height : 18,
							scale : true,
							alignY : "middle"
						});
						this.Label.Repair.Overall.getContentElement().setStyle("text-shadow", "0 0 3pt");
						for (i in this.GUI) {
							for (j in this.Label[i]) {
								this.GUI[i].add(this.Label[i][j], {
									flex : 1,
									right : 0
								});
							}
							this.GUI[i].addListener("dblclick", this.loadFormation, this);
						}
						this.Stats.addListener("changeBattleDuration", this.__updateBattleDuration.bind(this, this.Label.Battle.Duration));
						for (i in this.Stats.Enemy) {
							if (this.Label.Enemy.hasOwnProperty(i)) {
								if (this.Stats.Enemy[i].hasOwnProperty("HealthPoints")) {
									this.Stats.Enemy[i].HealthPoints.bind("max", this.Label.Enemy[i].HealthPoints, "max");
									this.Stats.Enemy[i].HealthPoints.bind("start", this.Label.Enemy[i].HealthPoints, "start");
									this.Stats.Enemy[i].HealthPoints.bind("end", this.Label.Enemy[i].HealthPoints, "end");
									if (i == "Overall") {
										for (j in this.Label.Loot) {
											this.Stats.Enemy[i].HealthPoints.bind("max", this.Label.Loot[j].HealthPoints, "max");
											this.Stats.Enemy[i].HealthPoints.bind("start", this.Label.Loot[j].HealthPoints, "start");
											this.Stats.Enemy[i].HealthPoints.bind("end", this.Label.Loot[j].HealthPoints, "end");
										}
									}
								}
								if (this.Stats.Enemy[i].hasOwnProperty("Resource")) {
									this.Stats.Enemy[i].Resource.bind("Tiberium", this.Label.Enemy[i].Resource, "Tiberium");
									this.Stats.Enemy[i].Resource.bind("Crystal", this.Label.Enemy[i].Resource, "Crystal");
									this.Stats.Enemy[i].Resource.bind("Credits", this.Label.Enemy[i].Resource, "Credits");
									this.Stats.Enemy[i].Resource.bind("ResearchPoints", this.Label.Enemy[i].Resource, "ResearchPoints");
									this.Stats.Enemy[i].Resource.bind("RepairChargeBase", this.Label.Enemy[i].Resource, "RepairChargeBase");
									this.Stats.Enemy[i].Resource.bind("RepairChargeAir", this.Label.Enemy[i].Resource, "RepairChargeAir");
									this.Stats.Enemy[i].Resource.bind("RepairChargeInf", this.Label.Enemy[i].Resource, "RepairChargeInf");
									this.Stats.Enemy[i].Resource.bind("RepairChargeVeh", this.Label.Enemy[i].Resource, "RepairChargeVeh");
									if (i == "Overall") {
										for (j in this.Label.Loot) {
											this.Stats.Enemy[i].Resource.bind("Tiberium", this.Label.Loot[j].Resource, "Tiberium");
											this.Stats.Enemy[i].Resource.bind("Crystal", this.Label.Loot[j].Resource, "Crystal");
											this.Stats.Enemy[i].Resource.bind("Credits", this.Label.Loot[j].Resource, "Credits");
											this.Stats.Enemy[i].Resource.bind("ResearchPoints", this.Label.Loot[j].Resource, "ResearchPoints");
											this.Stats.Enemy[i].Resource.bind("RepairChargeBase", this.Label.Loot[j].Resource, "RepairChargeBase");
											this.Stats.Enemy[i].Resource.bind("RepairChargeAir", this.Label.Loot[j].Resource, "RepairChargeAir");
											this.Stats.Enemy[i].Resource.bind("RepairChargeInf", this.Label.Loot[j].Resource, "RepairChargeInf");
											this.Stats.Enemy[i].Resource.bind("RepairChargeVeh", this.Label.Loot[j].Resource, "RepairChargeVeh");
										}
									}
								}
							}
						}
						for (i in this.Stats.Offense) {
							if (this.Label.Repair.hasOwnProperty(i)) {
								if (this.Stats.Offense[i].hasOwnProperty("HealthPoints")) {
									this.Stats.Offense[i].HealthPoints.bind("max", this.Label.Repair[i].HealthPoints, "max");
									this.Stats.Offense[i].HealthPoints.bind("start", this.Label.Repair[i].HealthPoints, "start");
									this.Stats.Offense[i].HealthPoints.bind("end", this.Label.Repair[i].HealthPoints, "end");
								}
								if (this.Stats.Offense[i].hasOwnProperty("Resource")) {
									this.Stats.Offense[i].Resource.bind("Tiberium", this.Label.Repair[i].Resource, "Tiberium");
									this.Stats.Offense[i].Resource.bind("Crystal", this.Label.Repair[i].Resource, "Crystal");
									this.Stats.Offense[i].Resource.bind("Credits", this.Label.Repair[i].Resource, "Credits");
									this.Stats.Offense[i].Resource.bind("ResearchPoints", this.Label.Repair[i].Resource, "ResearchPoints");
									this.Stats.Offense[i].Resource.bind("RepairChargeBase", this.Label.Repair[i].Resource, "RepairChargeBase");
									this.Stats.Offense[i].Resource.bind("RepairChargeAir", this.Label.Repair[i].Resource, "RepairChargeAir");
									this.Stats.Offense[i].Resource.bind("RepairChargeInf", this.Label.Repair[i].Resource, "RepairChargeInf");
									this.Stats.Offense[i].Resource.bind("RepairChargeVeh", this.Label.Repair[i].Resource, "RepairChargeVeh");
                                    if (i == "Crystal") {
										for (j in this.Label.Repair) {
											this.Stats.Offense[i].Resource.bind("Tiberium", this.Label.Repair[j].Resource, "Tiberium");
											this.Stats.Offense[i].Resource.bind("Crystal", this.Label.Repair[j].Resource, "Crystal");
											this.Stats.Offense[i].Resource.bind("Credits", this.Label.Repair[j].Resource, "Credits");
											this.Stats.Offense[i].Resource.bind("ResearchPoints", this.Label.Repair[j].Resource, "ResearchPoints");
											this.Stats.Offense[i].Resource.bind("RepairChargeBase", this.Label.Repair[j].Resource, "RepairChargeBase");
											this.Stats.Offense[i].Resource.bind("RepairChargeAir", this.Label.Repair[j].Resource, "RepairChargeAir");
											this.Stats.Offense[i].Resource.bind("RepairChargeInf", this.Label.Repair[j].Resource, "RepairChargeInf");
											this.Stats.Offense[i].Resource.bind("RepairChargeVeh", this.Label.Repair[j].Resource, "RepairChargeVeh");
										}
									}
								}
							}
						}

						var ButtonAPISim = new qx.ui.form.ModelButton(null, TABS.RES.IMG.Simulate).set({
								maxHeight : 22,
								minWidth : 22,
								toolTipText : this.tr("tnf:refresh"),
								show : "icon",
								iconPosition : "top",
								appearance : "button-addpoints"
							});
						ButtonAPISim.getChildControl("icon").set({
							maxWidth : 16,
							maxHeight : 16,
							scale : true
						});
						ButtonAPISim.addListener("click", function () {
							this.loadFormation();
							TABS.APISimulation.getInstance().SimulateBattle();
						}, this);
						this.Label.Buttons.View.add(ButtonAPISim);

						var ButtonPlay = new qx.ui.form.ModelButton(null, TABS.RES.IMG.Arrows.Right).set({
								maxHeight : 22,
								minWidth : 22,
								toolTipText : this.tr("View Simulation"),
								show : "icon",
								iconPosition : "top",
								appearance : "button-addpoints"
							});
						ButtonPlay.getChildControl("icon").set({
							maxWidth : 16,
							maxHeight : 16,
							scale : true
						});
						ButtonPlay.addListener("click", this.playReplay, this);
						this.Label.Buttons.View.add(ButtonPlay);
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up GUI.Window.Stats.SimView constructor", e);
						console.groupEnd();
					}
				},
				destruct : function () {},
				members : {
					Num : null,
					Window : null,
					GUI : null,
					Label : null,
					Cache : null,
					Stats : null,
                    StatsChanged : false,
					Prio : null,
					Name : null,
					Description : null,
					updateStats : function () {
						var i,
							cache = null,
							CurrentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
						if (CurrentCity !== null && CurrentCity.get_Version() !== -1 && ClientLib.Vis.VisMain.GetInstance().GetActiveView().get_VisAreaComplete()) {
							if (this.Prio.length === 0)
								cache = TABS.CACHE.getInstance().check(TABS.UTIL.Formation.Get());
							else
								cache = TABS.CACHE.getInstance().getPrio1(this.Prio);
						}

						if (cache !== null && cache.result !== null) {
							this.Cache = cache;
							this.Stats.setAny(cache.result.stats);
                            this.StatsChanged = true;
							this.__updateBattleOutcome();
							this.__updateBattleOwnCity();
							this.__updateBattleMoral();
							this.Window.__updateLabels();
						}

						if (typeof this.Cache["key"] !== "undefined" && typeof this.Cache["result"] !== "undefined" && typeof this.Cache.result["ownid"] !== "undefined") {
							if (CurrentCity !== null &&
								CurrentCity.get_Version() !== -1 &&
								ClientLib.Vis.VisMain.GetInstance().GetActiveView().get_VisAreaComplete() &&
								this.Cache.key === TABS.CACHE.getInstance().calcUnitsHash(TABS.UTIL.Formation.Get(), this.Cache.result.ownid)) {
								for (i in this.GUI) {
									this.GUI[i].setDecorator("pane-light-opaque");
									this.GUI[i].setOpacity(1);
								}
							} else {
								for (i in this.GUI) {
									this.GUI[i].setDecorator("pane-light-plain");
									this.GUI[i].setOpacity(0.7);
								}
							}
						}
					},
					resetStats : function () {
						this.Cache = {};
						this.Stats.setAny((new TABS.STATS()).getAny());
                        this.StatsChanged = true;
						this.__updateBattleOutcome();
						this.__updateBattleOwnCity();
						this.__updateBattleMoral();
						this.Window.__updateLabels();
						for (var i in this.GUI) {
							this.GUI[i].setDecorator("pane-light-opaque");
							this.GUI[i].setOpacity(1);
						}
					},
					loadFormation : function () {
						if (typeof this.Cache["result"] !== "undefined" && typeof this.Cache.result["formation"] !== "undefined" && typeof this.Cache.result["ownid"] !== "undefined") {
							ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId(this.Cache.result.ownid);
							TABS.UTIL.Formation.Set(this.Cache.result.formation);
						}
					},
					playReplay : function () {
                        TABS.UTIL.Battleground.StartReplay(this.Cache.result.cityid, this.Cache.result.combat);
					},
					__updateBattleOutcome : function () {
						if (Object.getOwnPropertyNames(this.Cache).length === 0) {
							this.Label.Battle.Outcome.setShow("label");
							this.Label.Battle.Outcome.resetIcon();
							this.Label.Battle.Outcome.resetToolTipIcon();
							this.Label.Battle.Outcome.resetToolTipText();
						} else if (this.Label.Repair.Overall.HealthPoints.getEnd() <= 0) {
							this.Label.Battle.Outcome.setIcon(TABS.RES.IMG.Outcome.total_defeat);
							this.Label.Battle.Outcome.setToolTipIcon(TABS.RES.IMG.Outcome.total_defeat);
							this.Label.Battle.Outcome.setToolTipText(this.tr("tnf:total defeat"));
							this.Label.Battle.Outcome.setShow("icon");
						} else if (this.Label.Enemy.Overall.HealthPoints.getEnd() <= 0) {
							this.Label.Battle.Outcome.setIcon(TABS.RES.IMG.Outcome.total_victory);
							this.Label.Battle.Outcome.setToolTipIcon(TABS.RES.IMG.Outcome.total_victory);
							this.Label.Battle.Outcome.setToolTipText(this.tr("tnf:total victory"));
							this.Label.Battle.Outcome.setShow("icon");
						} else {
							this.Label.Battle.Outcome.setIcon(TABS.RES.IMG.Outcome.victory);
							this.Label.Battle.Outcome.setToolTipIcon(TABS.RES.IMG.Outcome.victory);
							this.Label.Battle.Outcome.setToolTipText(this.tr("tnf:victory"));
							this.Label.Battle.Outcome.setShow("icon");
						}
					},
					__updateBattleDuration : function (label, e) {
						label.setValue(e.getData() > 0 ? phe.cnc.Util.getTimespanString(e.getData() / 1000) : "-:--");
					},
					__updateBattleOwnCity : function () {
						if (typeof this.Cache["result"] !== "undefined" && typeof this.Cache.result["ownid"] !== "undefined") {
							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.Cache.result.ownid);
							if (ownCity !== null)
								this.Label.Battle.OwnCity.setValue(ownCity.get_Name());
							else
								this.Label.Battle.OwnCity.resetValue();
						} else
							this.Label.Battle.OwnCity.resetValue();
					},
					__updateBattleMoral : function () {
						if (typeof this.Cache["result"] !== "undefined" && typeof this.Cache.result["cityid"] !== "undefined" && typeof this.Cache.result["ownid"] !== "undefined") {
							var CurrentCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.Cache.result.cityid),
								OwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.Cache.result.ownid);
							if (CurrentCity !== null && OwnCity !== null) {
								var MoralSignType = ClientLib.Base.Util.GetMoralSignType(OwnCity.get_LvlOffense(), CurrentCity.get_LvlBase()),
									moral = 100;
								if (ClientLib.Data.MainData.GetInstance().get_Server().get_CombatUseMoral() && CurrentCity.IsNPC() && CurrentCity.get_Id() != ClientLib.Data.MainData.GetInstance().get_EndGame().GetCenter().get_CombatId() && (MoralSignType.k == 1 || MoralSignType.k == 2)) {
									moral = "~" + (moral - MoralSignType.v) + "%";
									if (MoralSignType.k == 1) {
										this.Label.Battle.Morale.setTextColor(webfrontend.theme.Color.colors["res-orange"]);
										this.Label.Battle.Morale.setToolTipText(this.tr("tnf:region moral warning %1", MoralSignType.v));
										this.Label.Battle.Morale.setToolTipIcon("resource/webfrontend/ui/common/icon_moral_alert_orange.png");
									} else if (MoralSignType.k == 2) {
										this.Label.Battle.Morale.setTextColor(webfrontend.theme.Color.colors["res-red"]);
										this.Label.Battle.Morale.setToolTipText(this.tr("tnf:region moral error %1", MoralSignType.v));
										this.Label.Battle.Morale.setToolTipIcon("resource/webfrontend/ui/common/icon_moral_alert_red.png");
									}
								} else {
									moral = moral + "%";
									this.Label.Battle.Morale.resetTextColor();
									this.Label.Battle.Morale.resetToolTipText();
									this.Label.Battle.Morale.resetToolTipIcon();
								}
								this.Label.Battle.Morale.setValue(moral);
							} else {
								this.Label.Battle.Morale.setValue("-");
								this.Label.Battle.Morale.resetTextColor();
								this.Label.Battle.Morale.resetToolTipText();
								this.Label.Battle.Morale.resetToolTipIcon();
							}
						}
					},
					__onTick : function () {
						if (typeof this.Cache["result"] !== "undefined" && typeof this.Cache.result["ownid"] !== "undefined") {
							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(this.Cache.result.ownid);
                            if (ownCity !== null) {
                                var RepairCharge = Math.min(
                                        ownCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
                                        ownCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),
                                        ownCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir));
                                this.Label.Repair.Storage.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(RepairCharge)));
                            } else
                                this.Label.Repair.Storage.resetValue();
						} else
							this.Label.Repair.Storage.resetValue();
                        if (this.StatsChanged) {
                            this.StatsChanged = false;
                            for (var i in this.Label.Enemy) {
                                this.Label.Enemy[i].__update();
                            }
                            for (i in this.Label.Repair) {
                                this.Label.Repair[i].__update();
                            }
                            for (i in this.Label.Loot) {
                                this.Label.Loot[i].__update();
                            }
                        }
					}
				}
			});
			qx.Class.define("TABS.GUI.Window.Stats.SimView.Label", {	//				Simulation View Label
				extend : qx.ui.basic.Label,
				include : [qx.locale.MTranslation],
				construct : function (label) {
					try {
                        this.base(arguments, label);
						this.initAlignX("right");
						this.initAlignY("middle");
						this.initMinHeight(18);
						this.setAlignX("right");
						this.setAlignY("middle");
						this.setMinHeight(18);
						this.HealthPoints = new TABS.STATS.Entity.HealthPoints();
						this.Resource = new TABS.STATS.Entity.Resource();
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up TABS.GUI.Window.Stats.SimView.Label constructor", e);
						console.groupEnd();
					}
				},
				properties : {
					type : {
						init : "Enemy",
						check : ["Enemy", "Repair", "Loot"]
					},
					subType : {
						init : "HealthPointsAbs",
						check : ["HealthPointsAbs", "HealthPointsRel", "RepairCharge", "RepairStorage", "RepairCrystal", "Resource", "Tiberium", "Crystal", "Credits", "ResearchPoints"]
					}
				},
				members : {
					HealthPoints : null,
					Resource : null,
					__update : function () {
						var value = null;
						if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() !== null) {
							switch (this.getType()) {
							case "Enemy":
								switch (this.getSubType()) {
								case "HealthPointsAbs":
									value = this.HealthPointsAbs();
									break;
								case "HealthPointsRel":
									value = this.HealthPointsRel();
									break;
								case "RepairCharge":
									value = this.RepairCharge();
									break;
								default:
									break;
								}
								break;
							case "Repair":
								switch (this.getSubType()) {
								case "HealthPointsAbs":
									value = this.HealthPointsAbs();
									break;
								case "HealthPointsRel":
									value = this.HealthPointsRel();
									break;
								case "RepairCharge":
								case "RepairChargeInf":
								case "RepairChargeVeh":
								case "RepairChargeAir":
									value = this.RepairCharge();
									break;
								case "RepairStorage":
                                    return;
								case "Resource":
									value = this.RepairCharge();
									break;
								default:
									break;
								}
								break;
							case "Loot":
								switch (this.getSubType()) {
								case "Resource":
								case "Tiberium":
								case "Crystal":
								case "Credits":
								case "ResearchPoints":
									value = this.Loot();
									break;
								default:
									break;
								}
								break;
							default:
								break;
							}
						}

						if (this.HealthPoints.getMax() > 0 && value !== null) {
							this.setValue(value.text);
							this.setTextColor(value.color);
						} else {
							this.resetValue();
							this.resetTextColor();
						}
					},
					HealthPointsAbs : function () {
						if (this.HealthPoints.getMax() > 0) {
							var percent = (this.HealthPoints.getEnd() / this.HealthPoints.getMax()) * 100,
								digits = (percent <= 0 || percent >= 100 ? 0 : (percent >= 10 ? 1 : 2));
							percent = Math.round(percent * Math.pow(10, digits)) / Math.pow(10, digits);
							return {
								text : percent.toFixed(digits) + " %",
								color : this.getColorFromPercent(this.HealthPoints.getEnd() / this.HealthPoints.getMax())
							};
						}
						return null;
					},
					HealthPointsRel : function () {
						if (this.HealthPoints.getMax() > 0) {
							var percent = ((this.HealthPoints.getStart() - this.HealthPoints.getEnd()) / this.HealthPoints.getMax()) * 100,
								digits = (percent <= 0 || percent >= 100 ? 0 : (percent >= 10 ? 1 : 2));
							percent = Math.round(percent * Math.pow(10, digits)) / Math.pow(10, digits);
							return {
								text : percent.toFixed(digits) + " %",
								color : this.getColorFromPercent(this.HealthPoints.getEnd() / this.HealthPoints.getMax())
							};
						}
						return null;
					},
					RepairCharge : function () {
                        if(this.getSubType() == "Resource")
                        {
                            res = 0;
                            res = this.Resource.getCrystal();
                            
                            return {
								text : phe.cnc.gui.util.Numbers.formatNumbersCompact(res),
								color : this.getColorFromPercent(1)
							};
                        }
                        else
                        {
                            res = 0;
                            if (this.HealthPoints.getMax() > 0) {
                                switch (this.getSubType()) {
                                    case "RepairChargeInf":
                                         res = this.Resource.getRepairChargeInf();
                                        break;
                                    case "RepairChargeVeh":
                                         res = this.Resource.getRepairChargeVeh();
                                        break;
                                    case "RepairChargeAir":
                                         res = this.Resource.getRepairChargeAir();
                                        break;
                                    case "RepairCharge":
                                         res = Math.max(this.Resource.getRepairChargeBase(), this.Resource.getRepairChargeAir(), this.Resource.getRepairChargeInf(), this.Resource.getRepairChargeVeh());
                                        break;
                                }
                                return {
                                    text : phe.cnc.Util.getTimespanString(res),
                                    color : this.getColorFromPercent(1 - (this.HealthPoints.getEnd() / this.HealthPoints.getMax()))
                                };
                            }
                        }
						return null;
					},
					Loot : function () {
						var res = 0,
							lootFromCurrentCity = TABS.UTIL.Stats.get_LootFromCurrentCity(),
							loot;
						if (this.HealthPoints.getMax() > 0 && lootFromCurrentCity !== null) {
							switch (this.getSubType()) {
							case "Resource":
								res = this.Resource.getTiberium() + this.Resource.getCrystal() + this.Resource.getCredits() + this.Resource.getResearchPoints();
								loot = lootFromCurrentCity.getTiberium() + lootFromCurrentCity.getCrystal() + lootFromCurrentCity.getCredits() + lootFromCurrentCity.getResearchPoints();
								break;
							case "Tiberium":
								res = this.Resource.getTiberium();
								loot = lootFromCurrentCity.getTiberium();
								break;
							case "Crystal":
								res = this.Resource.getCrystal();
								loot = lootFromCurrentCity.getCrystal();
								break;
							case "Credits":
								res = this.Resource.getCredits();
								loot = lootFromCurrentCity.getCredits();
								break;
							case "ResearchPoints":
								res = this.Resource.getResearchPoints();
								loot = lootFromCurrentCity.getResearchPoints();
								break;
							}
							return {
								text : phe.cnc.gui.util.Numbers.formatNumbersCompact(res),
								color : this.getColorFromPercent(1 - (res / loot))
							};
						}
						return null;
					},
					getColorFromPercent : function (value) { // 1 = red, 0.5 = yellow, 0 = green
						return "hsl(" + ((120 - ((100 - ((1 - value) * 100)) * 1.2)) - 0) + ", 100%, " + (25 + Math.round(((Math.abs(Math.max(value - 0.4, 0)) * 2) + (Math.abs(Math.max((1 - value) - 0.6, 0)))) * 25)) + "%)";
					}
				}
			});
			qx.Class.define("TABS.GUI.Window.Prios", {					// [singleton]	Prios Window
				extend : qx.ui.window.Window,
				construct : function (prios) {
					try {
						this.base(arguments);
						this.set({
							layout : new qx.ui.layout.Grid(),
							caption : this.tr("Priority Setup"),
							allowMaximize : false,
							showMaximize : false,
							allowMinimize : false,
							showMinimize : false,
							resizable : false
						});
						this.center();
						this.Prios = prios;
					} catch (e) {
						console.group("Tiberium Alliances Battle Simulator V2");
						console.error("Error setting up TABS.GUI.Window.Prios constructor", e);
						console.groupEnd();
					}
				},
				members : {
					Prios : null
				}
			});
		}
		function translation() {
			var localeManager = qx.locale.Manager.getInstance();

			// Default language is english (en)
			// Available Languages are: ar,ce,cs,da,de,en,es,fi,fr,hu,id,it,nb,nl,pl,pt,ro,ru,sk,sv,ta,tr,uk
			// You can send me translations so I can include them in the Script.

			// German
			localeManager.addTranslation("de", {
				"Shifts units one space up." : "Verschiebt Einheiten einen Platz nach oben.", //GUI.ArmySetupAttackBar
				"Shifts units one space down." : "Verschiebt die Einheiten einen Platz nach unten.", //GUI.ArmySetupAttackBar
				"Shifts units one space left." : "Verschiebt die Einheiten einen Platz nach links.", //GUI.ArmySetupAttackBar
				"Shifts units one space right." : "Verschiebt die Einheiten einen Platz nach rechts.", //GUI.ArmySetupAttackBar
				"Mirrors units horizontally." : "Spiegelt die Einheiten horizontal.", //GUI.ArmySetupAttackBar
				"Mirrors units vertically." : "Spiegelt die Einheiten vertikal.", //GUI.ArmySetupAttackBar
				"View Simulation" : "Simulation anzeigen", //GUI.PlayArea + GUI.Window.Stats.SimView
				"Statistic" : "Statistik", //GUI.PlayArea + GUI.Window.Stats
				"Show current formation with CNCOpt" : "Zeigt die aktuelle Formation mit CNCOpt an", //GUI.PlayArea
				"Right click: Set formation from CNCOpt Long Link" : "Rechtsklick: Formation von CNCOpt Long Link laden", //GUI.PlayArea
				"Remember transported units are not supported." : "Denk daran das transportierte Einheiten nicht unterstützt werden.", //GUI.PlayArea
				"Enter CNCOpt Long Link:" : "CNCOpt Long Link eingeben:", //GUI.PlayArea
				"simulations in cache" : "Simulationen im Cache", //GUI.Window.Stats
				"Most priority to construction yard including all in front of it.<br>After this the best total enemy health from the cached simulations is selected.<br>If no better simulation is found, the best offence unit repair charge and<br>battle duration from the cached simulations is selected." : "Die größte Priorität liegt auf dem Bauhof mit allem was vor ihm liegt.<br>Danach wird die Simulation aus dem Cache herausgesucht die den meisten<br>Schaden am Gegner verursacht.<br>Wenn keine bessere Formation gefunden wird, wird die Simulation mit der<br>niedrigsten Offensiv Reperaturzeit und besten Kampfdauer aus dem Cache herausgesucht.", //STATS
				"Most priority to defense facility including all in front of it.<br>After this the best armored defense health from the cached simulations is selected.<br>If no better simulation is found, the best offence unit repair charge and<br>battle duration from the cached simulations is selected." : "Die größte Priorität liegt auf der Verteidigungseinrichtung mit allem was vor ihr liegt.<br>Danach wird die Simulation aus dem Cache herausgesucht die den meisten<br>Schaden an bewaffneten Defensiveinheiten verursacht.<br>Wenn keine bessere Formation gefunden wird, wird die Simulation mit der<br>niedrigsten Offensiv Reperaturzeit und besten Kampfdauer aus dem Cache herausgesucht.", //STATS
				"Most priority to defense health including the auto repair after the battle.<br>If no better simulation is found, the best offence unit repair charge and<br>battle duration from the cached simulations is selected." : "Die größte Priorität liegt auf dem verursachtem Schaden an Defensiveinheiten<br>unter Berücksichtigung der automatischen Reperatur nach dem Kampf.<br>Wenn keine bessere Formation gefunden wird, wird die Simulation mit der<br>niedrigsten Offensiv Reperaturzeit und besten Kampfdauer aus dem Cache herausgesucht.", //STATS
				"Most priority to command center including all in front of it.<br>After this the best total enemy health from the cached simulations is selected.<br>If no better simulation is found, the best offence unit repair charge and<br>battle duration from the cached simulations is selected." : "Die größte Priorität liegt auf der Komandozentrale mit allem was vor ihr liegt.<br>Danach wird die Simulation aus dem Cache herausgesucht die den meisten<br>Schaden am Gegner verursacht.<br>Wenn keine bessere Formation gefunden wird, wird die Simulation mit der<br>niedrigsten Offensiv Reperaturzeit und besten Kampfdauer aus dem Cache herausgesucht.", //STATS
				"NoKill (farming) priorety.<br>Not working correctly yet." : "Vorschießen (farmen) Priorität.<br>Funktioniert noch nicht sehr gut.", //STATS
				"Shows the current army formation." : "Zeigt die aktuelle Armeeformation an." //STATS
			});
		}
		function waitForGame() {
			try {
				if (typeof qx != 'undefined' &&
					typeof qx.core != 'undfined' &&
					typeof qx.core.Init != 'undefined') {
					var app = qx.core.Init.getApplication();
					if (app !== null && app.initDone === true &&
						ClientLib.Data.MainData.GetInstance().get_Player().get_Id() !== 0 &&
						ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId() !== 0) {
						try {
							console.time("loaded in");
							
							// replacing LoadCombatDirect
							if (ClientLib.Vis.Battleground.Battleground.prototype.LoadCombatDirect === undefined) {
							var sBString = ClientLib.API.Battleground.prototype.SimulateBattle.toString();
							var targetMethod = sBString.match(/\{battleSetup:[a-z]+\},\s?\(new \$I\.[A-Z]{6}\)\.[A-Z]{6}\(this,this\.([A-Z]{6})\),\s?this\);/)[1];
							var lCString = ClientLib.API.Battleground.prototype[targetMethod].toString();
							var methodLoadDirect = lCString.match(/\$I\.[A-Z]{6}\.[A-Z]{6}\(\)\.[A-Z]{6}\(\)\.([A-Z]{6})\(b\.d\);/)[1];
							console.log(methodLoadDirect);
							ClientLib.Vis.Battleground.Battleground.prototype.LoadCombatDirect = ClientLib.Vis.Battleground.Battleground.prototype[methodLoadDirect];
							}
                            translation();
                            createClasses();
                            TABS.getInstance();
							console.group("Tiberium Alliances Battle Simulator V2");
							console.timeEnd("loaded in");
							console.groupEnd();
						} catch (e) {
							console.group("Tiberium Alliances Battle Simulator V2");
							console.error("Error in waitForGame", e);
							console.groupEnd();
						}
					} else {
						window.setTimeout(waitForGame, 1000);
					}
				} else {
					window.setTimeout(waitForGame, 1000);
				}
			} catch (e) {
				console.group("Tiberium Alliances Battle Simulator V2");
				console.error("Error in waitForGame", e);
				console.groupEnd();
			}
		}
		window.setTimeout(waitForGame, 1000);
	}
	.toString() + ")();";
	script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);
})();
// ==UserScript==
// @name           Tiberium Alliances Report Stats
// @version        0.5.3
// @namespace      https://openuserjs.org/users/petui
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @author         petui
// @description    Calculates combined RT and CP costs and loot of multiple combat reports
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==
'use strict';
(function() {
	var main = function() {
		'use strict';

		function createReportStats() {
			console.log('ReportStats loaded');

			qx.Class.define('ReportStats', {
				type: 'singleton',
				extend: qx.core.Object,
				statics: {
					BaseInfoExtraWidth: 6,	// width to add to BaseInfoWindow to get rid of horizontal scroll bar
					StatusbarHeight: 35,	// height to add to BaseInfoWindow to accomodate statusbar being visible
					CheckboxColumnWidth: 28,
					ResourceTypes: {}
				},
				defer: function(statics) {
					var fileManager = ClientLib.File.FileManager.GetInstance();
					statics.ResourceTypes[ClientLib.Base.EResourceType.Tiberium] = fileManager.GetPhysicalPath('ui/common/icn_res_tiberium.png');
					statics.ResourceTypes[ClientLib.Base.EResourceType.Crystal] = fileManager.GetPhysicalPath('ui/common/icn_res_chrystal.png');
					statics.ResourceTypes[ClientLib.Base.EResourceType.Gold] = fileManager.GetPhysicalPath('ui/common/icn_res_dollar.png');
					statics.ResourceTypes[ClientLib.Base.EResourceType.Power] = fileManager.GetPhysicalPath('ui/common/icn_res_power.png');
					statics.ResourceTypes[ClientLib.Base.EResourceType.ResearchPoints] = fileManager.GetPhysicalPath('ui/common/icn_res_research.png');
				},
				members: {
					reportsLoading: [],
					reportsLoaded: [],
					skipBaseInfoReportsReload: 0,

					initialize: function() {
						this.initializeHacks();
						this.initializeUserInterface();
					},

					initializeHacks: function() {
						var source;

						if (typeof qx.ui.table.model.Abstract.prototype.addColumn !== 'function') {
							source = qx.ui.table.model.Abstract.prototype.getColumnId.toString();
							var columnIdsMemberName = source.match(/return this\.([A-Za-z_]+)\[[A-Z]\];/)[1];
							source = qx.ui.table.model.Abstract.prototype.getColumnName.toString();
							var columnNamesMemberName = source.match(/return this\.([A-Za-z_]+)\[[A-Z]\];/)[1];

							/**
							 * @param {String} id
							 * @param {String} name
							 * @returns {Number}
							 */
							qx.ui.table.model.Abstract.prototype.addColumn = function(id, name) {
								var columnIndex = this[columnIdsMemberName].push(id) - 1;
								this[columnNamesMemberName].push(name);
								this.fireEvent('metaDataChanged');

								return columnIndex;
							};
						}

						if (typeof qx.ui.table.columnmodel.Basic.prototype.addColumn !== 'function') {
							source = qx.ui.table.columnmodel.Basic.prototype.getColumnWidth.toString();
							var columnsMemberName = source.match(/return this\.([A-Za-z_]+)\[[A-Z]\]\.width;/)[1];
							source = qx.ui.table.columnmodel.Basic.prototype.getOverallColumnCount.toString();
							var columnOrderMemberName = source.match(/return this\.([A-Za-z_]+)\.length;/)[1];
							source = qx.ui.table.columnmodel.Basic.prototype.getVisibleColumnAtX.toString();
							var columnVisibilityMemberName = source.match(/return this\.([A-Za-z_]+)\[[A-Z]\];/)[1];
							source = qx.ui.table.columnmodel.Basic.prototype._getColToXPosMap.toString();
							var columnToXPosMapMemberName = source.match(/return this\.([A-Za-z_]+);\}$/)[1];

							source = qx.ui.table.columnmodel.Basic.prototype.init.toString();
							var matches = source.match(/this\.([A-Za-z_]+)\|\|\(this\.\1=new qx\.ui\.table\.columnmodel\.Basic\.DEFAULT_HEADER_RENDERER\(\)\);.+this\.([A-Za-z_]+)\|\|\(this\.\2=new qx\.ui\.table\.columnmodel\.Basic\.DEFAULT_DATA_RENDERER\(\)\);.+this\.([A-Za-z_]+)\|\|\(this\.\3=new qx\.ui\.table\.columnmodel\.Basic\.DEFAULT_EDITOR_FACTORY\(\)\);/);
							var headerRendererMemberName = matches[1];
							var dataRendererMemberName = matches[2];
							var editorFactoryMemberName = matches[3];

							/**
							 * @param {Boolean} visible
							 * @returns {Number}
							 */
							qx.ui.table.columnmodel.Basic.prototype.addColumn = function(visible) {
								var columnIndex = this[columnsMemberName].push({
									width: qx.ui.table.columnmodel.Basic.DEFAULT_WIDTH,
									headerRenderer: this[headerRendererMemberName],
									dataRenderer: this[dataRendererMemberName],
									editorFactory: this[editorFactoryMemberName]
								}) - 1;

								this[columnToXPosMapMemberName] = null;
								this[columnOrderMemberName].push(columnIndex);

								if (!visible) {
									this[columnVisibilityMemberName].push(columnIndex);
								}

								this.setColumnVisible(columnIndex, visible);

								return columnIndex;
							};
						}

						if (typeof webfrontend.gui.info.BaseInfoWindow.prototype.onCellClick !== 'function') {
							source = Function.prototype.toString.call(webfrontend.gui.info.BaseInfoWindow.constructor);
							var createOutgoingTabMethodName = source.match(/;[A-Za-z]+\.add\(this\.([A-Za-z_]+)\(\)\);this\.[A-Za-z_]+=new webfrontend\.gui\.widgets\.confirmationWidgets\.ProtectionConfirmationWidget\(\);/)[1];
							source = webfrontend.gui.info.BaseInfoWindow.prototype[createOutgoingTabMethodName].toString();
							var onCellClickMethodName = source.match(/([A-Za-z]+)\.set\(\{statusBarVisible:false,columnVisibilityButtonVisible:false\}\);\1\.addListener\([A-Za-z]+,this\.([A-Za-z_]+),this\.[A-Za-z_]+\);/)[2];
							webfrontend.gui.info.BaseInfoWindow.prototype.onCellClick = webfrontend.gui.info.BaseInfoWindow.prototype[onCellClickMethodName];
						}

						if (typeof webfrontend.gui.info.BaseInfoWindow.prototype.onTotalUnreadCountUpdated !== 'function') {
							source = webfrontend.gui.info.BaseInfoWindow.prototype._onClose.toString();
							var onTotalUnreadCountUpdatedMethodName = source.match(/ClientLib\.Data\.Reports\.TotalUnreadCountUpdated,this,this\.([A-Za-z_]+)\);/)[1];
							webfrontend.gui.info.BaseInfoWindow.prototype.onTotalUnreadCountUpdated = webfrontend.gui.info.BaseInfoWindow.prototype[onTotalUnreadCountUpdatedMethodName];

							var context = this;
							webfrontend.gui.info.BaseInfoWindow.prototype[onTotalUnreadCountUpdatedMethodName] = function() {
								return context.onTotalUnreadCountUpdated(this, arguments);
							};
						}

						/* Detect and fix bug described in http://forum.alliances.commandandconquer.com/showthread.php?tid=30346 */ {
							source = ClientLib.Data.Reports.Reports.prototype.AddReport.toString();
							var initMethodName = source.match(/break;\}\}[a-z]\.([A-Z]{6})\([a-z]\);if/)[1];

							source = ClientLib.Data.Reports.CombatReport.prototype[initMethodName].toString();
							var setDataMethodName = source.match(/this\.([A-Z]{6})\([A-Za-z]+\);/)[1];

							source = ClientLib.Data.Reports.CombatReport.prototype[setDataMethodName].toString();
							var matches = source.match(/this\.([A-Z]{6})=([a-z])\.abl;this\.[A-Z]{6}=\2\.abl;/);

							if (matches !== null) {
								var attackerBaseIdMemberName = matches[1];
								var original = ClientLib.Data.Reports.CombatReport.prototype[setDataMethodName];

								ClientLib.Data.Reports.CombatReport.prototype[setDataMethodName] = function(data) {
									original.call(this, data);
									this[attackerBaseIdMemberName] = data.d.abi;
								};
							}
							else {
								console.warn('ReportStats::initializeHacks', 'Unable to patch ClientLib.Data.Reports.CombatReport.prototype.' + setDataMethodName + '. Its likely already fixed in the game code.');
							}
						}

						if (typeof qx.ui.table.Table.prototype.getLastFocusedRow !== 'function') {
							qx.ui.table.Table.prototype.lastFocusedRow = null;
							var originalSetFocusedCell = qx.ui.table.Table.prototype.setFocusedCell;

							qx.ui.table.Table.prototype.setFocusedCell = function() {
								this.lastFocusedRow = this.getFocusedRow();
								originalSetFocusedCell.apply(this, arguments);
							};

							/**
							 * @returns {Number}
							 */
							qx.ui.table.Table.prototype.getLastFocusedRow = function() {
								return this.lastFocusedRow;
							};
						}
					},

					initializeUserInterface: function() {
						var baseInfoWindow = webfrontend.gui.info.BaseInfoWindow.getInstance();
						var tabs = baseInfoWindow.getChildren()[0].getChildren();

						for (var tabIndex = 1; tabIndex <= 2; tabIndex++) {
							var table = tabs[tabIndex].getChildren()[0];

							var tableModel = table.getTableModel();
							var tableModelIndex = tableModel.addColumn('ReportStatsCheckbox', '');
							tableModel.setColumnSortable(tableModelIndex, false);
							tableModel.addListener('dataChanged', this.onTableModelDataChange, this);
							tableModel.setUserData('checkboxColumnIndex', tableModelIndex);

							var columnModel = table.getTableColumnModel();
							var columnModelIndex = columnModel.addColumn(true);
							columnModel.setDataCellRenderer(columnModelIndex, new qx.ui.table.cellrenderer.Boolean());
							columnModel.setColumnWidth(columnModelIndex, ReportStats.CheckboxColumnWidth);
							columnModel.moveColumn(columnModelIndex, 0);

							var cellClickEventName = PerforceChangelist >= 434241 ? 'cellTap' : 'cellClick';
							table.removeListener(cellClickEventName, baseInfoWindow.onCellClick, tableModel);
							table.addListener(cellClickEventName, this.onCellClickDelegate, this);
							table.getChildControl('statusbar').set({
								height: ReportStats.StatusbarHeight,
								rich: true,
								toolTip: new qx.ui.tooltip.ToolTip().set({
									label: '<div>"Loot" is the sum of resources gained from destruction, plunder and own repair costs.</div><br/>'
										+ '<div>Tip: You can select multiple reports at once by holding down the Shift key.</div>',
									rich: true
								})
							});
						}

						baseInfoWindow.setWidth(baseInfoWindow.getWidth() + ReportStats.CheckboxColumnWidth + ReportStats.BaseInfoExtraWidth);
						baseInfoWindow.setHeight(baseInfoWindow.getHeight() + ReportStats.StatusbarHeight);
					},

					/**
					 * Sets checkbox value to false for rows being initialized
					 * @param {qx.event.type.Data} event
					 */
					onTableModelDataChange: function(event) {
						var data = event.getData();

						if (data.firstColumn !== 0) {
							return;
						}

						var tableModel = event.getTarget();
						var columnIndex = tableModel.getUserData('checkboxColumnIndex');
						var columnId = tableModel.getColumnId(columnIndex);

						for (var row = data.firstRow; row <= data.lastRow; row++) {
							var rowData = tableModel.getRowData(row);

							if (rowData && rowData[columnId] === undefined) {
								rowData[columnId] = false;
							}
						}

						tableModel.fireDataEvent('dataChanged', {
							firstRow: data.firstRow,
							lastRow: data.lastRow,
							firstColumn: columnIndex,
							lastColumn: columnIndex
						});

						if (this.isReportTab(this.getCurrentBaseInfoTab())) {
							this.calculateCombinedRepairCosts(tableModel);
						}
					},

					/**
					 * @param {qx.ui.table.pane.CellEvent} event
					 */
					onCellClickDelegate: function(event) {
						var tableModel = event.getTarget().getTable().getTableModel();

						if (event.getColumn() === tableModel.getUserData('checkboxColumnIndex') && tableModel.getRowData(event.getRow())) {
							this.onCheckboxClick(event);
						}
						else {
							webfrontend.gui.info.BaseInfoWindow.prototype.onCellClick.call(tableModel, event);
						}
					},

					/**
					 * @param {qx.ui.table.pane.CellEvent} event
					 */
					onCheckboxClick: function(event) {
						var table = event.getTarget().getTable();
						var tableModel = table.getTableModel();
						var newValue = !tableModel.getValue(event.getColumn(), event.getRow());

						if (event.isShiftPressed() && table.getLastFocusedRow() !== null) {
							var start = Math.min(event.getRow(), table.getLastFocusedRow());
							var end = Math.max(event.getRow(), table.getLastFocusedRow());

							for (var row = start; row <= end; row++) {
								tableModel.setValue(event.getColumn(), row, newValue);
							}
						}
						else {
							tableModel.setValue(event.getColumn(), event.getRow(), newValue);
						}

						this.calculateCombinedRepairCosts(tableModel);
					},

					/**
					 * @param {webfrontend.data.ReportHeaderDataModel} tableModel
					 */
					calculateCombinedRepairCosts: function(tableModel) {
						var wasLoading = this.reportsLoading.length > 0;
						this.reportsLoading = [];
						this.reportsLoaded = [];

						var rowCount = tableModel.getRowCount();
						
						for (var row = 0; row < rowCount; row++) {
							var rowData = tableModel.getRowData(row);

							if (rowData && rowData.ReportStatsCheckbox) {
								this.reportsLoading.push(rowData.Id);
							}
						}

						if (this.reportsLoading.length > 0) {
							var reports = ClientLib.Data.MainData.GetInstance().get_Reports();

							if (!wasLoading) {
								phe.cnc.Util.attachNetEvent(reports, 'ReportDelivered', ClientLib.Data.Reports.ReportDelivered, this, this.onReportDelivered);
							}

							for (var i = this.reportsLoading.length - 1; i >= 0; i--) {
								reports.RequestReportData(this.reportsLoading[i]);
							}

							if (this.reportsLoading.length > 0) {
								var table = this.getCurrentBaseInfoTab().getChildren()[0];
								table.getChildControl('statusbar').setValue('Please wait...');
							}
						}
						else {
							this.onAllReportsLoaded();
						}
					},

					/**
					 * @param {webfrontend.gui.info.BaseInfoWindow} baseInfoWindow
					 * @param {Object} parameters
					 */
					onTotalUnreadCountUpdated: function(baseInfoWindow, parameters) {
						if (!this.skipBaseInfoReportsReload) {
							baseInfoWindow.onTotalUnreadCountUpdated.apply(baseInfoWindow, parameters);
						}
						else {
							this.skipBaseInfoReportsReload--;
						}
					},

					/**
					 * @param {ClientLib.Data.Reports.CombatReport} report
					 */
					onReportDelivered: function(report) {
						var index = this.reportsLoading.indexOf(report.get_Id());

						if (index !== -1) {
							this.reportsLoading.splice(index, 1);
							this.reportsLoaded.push(report);

							if (!this.reportsLoading.length) {
								this.onAllReportsLoaded();
							}
						}

						if (!report.get_IsRead()) {
							report.set_IsRead(true);
							this.skipBaseInfoReportsReload++;
						}
					},

					onAllReportsLoaded: function() {
						phe.cnc.Util.detachNetEvent(ClientLib.Data.MainData.GetInstance().get_Reports(), 'ReportDelivered', ClientLib.Data.Reports.ReportDelivered, this, this.onReportDelivered);

						var hasSelectedReports = this.reportsLoaded.length > 0;
						var table = this.getCurrentBaseInfoTab().getChildren()[0];
						table.setStatusBarVisible(hasSelectedReports);

						if (hasSelectedReports) {
							var attackerBaseIds = [];
							var defenderBaseIds = [];
							var repairTimeCosts = 0;
							var minCommandPointCosts = 0;
							var maxCommandPointCosts = 0;
							var firstAttack = null;
							var lastAttack = 0;

							var loot = {};
							var getTotalLootMethod, getRepairCostsMethod;

							if (this.reportsLoaded[0].get_PlayerReportType() === ClientLib.Data.Reports.EPlayerReportType.CombatOffense) {
								getTotalLootMethod = ClientLib.Data.Reports.CombatReport.prototype.GetAttackerTotalResourceReceived;
								getRepairCostsMethod = ClientLib.Data.Reports.CombatReport.prototype.GetAttackerRepairCosts;
							}
							else {
								getTotalLootMethod = ClientLib.Data.Reports.CombatReport.prototype.GetDefenderTotalResourceCosts;
								getRepairCostsMethod = ClientLib.Data.Reports.CombatReport.prototype.GetDefenderRepairCosts;
							}

							var server = ClientLib.Data.MainData.GetInstance().get_Server();
							var combatCostMinimum = server.get_CombatCostMinimum();
							var combatCostMinimumPvP = server.get_UsesRebalancingI() ? server.get_PvPCombatCostMinimum() : combatCostMinimum;
							var combatCostPerFieldInside = server.get_CombatCostPerField();
							var combatCostPerFieldOutside = server.get_CombatCostPerFieldOutsideTerritory();

							for (var i = 0; i < this.reportsLoaded.length; i++) {
								var report = this.reportsLoaded[i];

								if (!(report instanceof ClientLib.Data.Reports.CombatReport)) {
									continue;
								}

								if (attackerBaseIds.indexOf(report.get_AttackerBaseId()) === -1) {
									attackerBaseIds.push(report.get_AttackerBaseId());
								}

								if (defenderBaseIds.indexOf(report.get_DefenderBaseId()) === -1) {
									defenderBaseIds.push(report.get_DefenderBaseId());
								}

								repairTimeCosts += report.GetAttackerMaxRepairTime();

								var distance = Math.sqrt(
									Math.pow(report.get_AttackerBaseXCoord() - report.get_DefenderBaseXCoord(), 2) +
									Math.pow(report.get_AttackerBaseYCoord() - report.get_DefenderBaseYCoord(), 2)
								);

								switch (report.get_Type()) {
									case ClientLib.Data.Reports.EReportType.Combat:
										var isFriendlyTerritory = report.get_AttackerAllianceName() === report.get_DefenderAllianceName();
										var cost = Math.floor(combatCostMinimumPvP + (isFriendlyTerritory ? combatCostPerFieldInside : combatCostPerFieldOutside) * distance);
										minCommandPointCosts += cost;
										maxCommandPointCosts += cost;
										break;
									case ClientLib.Data.Reports.EReportType.NPCRaid:
										switch (parseInt(report.get_DefenderBaseName(), 10)) {
											case ClientLib.Data.Reports.ENPCCampType.Base:
											case ClientLib.Data.Reports.ENPCCampType.Fortress:
												var cost = Math.floor(combatCostMinimum + combatCostPerFieldOutside * distance);
												minCommandPointCosts += cost;
												maxCommandPointCosts += cost;
												break;
											default:
												minCommandPointCosts += Math.floor(combatCostMinimum + combatCostPerFieldInside * distance);
												maxCommandPointCosts += Math.floor(combatCostMinimum + combatCostPerFieldOutside * distance);
										}
										break;
									case ClientLib.Data.Reports.EReportType.NPCPlayerCombat:
										// No repair time or command point cost for Forgotten attacks
										break;
									default:
										throw 'Unexpected report type (' + report.get_Type() + ')';
								}

								if (firstAttack === null || report.get_Time() < firstAttack) {
									firstAttack = report.get_Time();
								}

								if (report.get_Time() > lastAttack) {
									lastAttack = report.get_Time();
								}

								for (var resourceType in ReportStats.ResourceTypes) {
									var resourceCount = getTotalLootMethod.call(report, resourceType) - getRepairCostsMethod.call(report, resourceType);

									if (resourceCount !== 0) {
										if (!(resourceType in loot)) {
											loot[resourceType] = 0;
										}

										loot[resourceType] += resourceCount;
									}
								}
							}

							var lootRow = 'Loot:';

							for (var resourceType in loot) {
								lootRow += ' <img width="17" height="17" src="' + ReportStats.ResourceTypes[resourceType] + '" style="vertical-align: text-bottom;"/>';

								if (loot[resourceType] < 0) {
									lootRow += '<span style="color: #d00;">' + phe.cnc.gui.util.Numbers.formatNumbersCompact(loot[resourceType]) + '</span>';
								}
								else {
									lootRow += phe.cnc.gui.util.Numbers.formatNumbersCompact(loot[resourceType]);
								}
							}

							table.getChildControl('statusbar').setValue(
								attackerBaseIds.length + ' attacker' + (attackerBaseIds.length === 1 ? '' : 's') + ', ' +
								defenderBaseIds.length + ' defender' + (defenderBaseIds.length === 1 ? '' : 's') + ', ' +
								this.reportsLoaded.length + ' attack' + (this.reportsLoaded.length === 1 ? '' : 's') + ', ' +
								phe.cnc.Util.getTimespanString(repairTimeCosts) + ' RT and ' + (minCommandPointCosts === maxCommandPointCosts
									? minCommandPointCosts
									: (minCommandPointCosts + '-' + maxCommandPointCosts)
								) + ' CPs spent' + (this.reportsLoaded.length > 1
									? ' in ' + phe.cnc.Util.getTimespanString((lastAttack - firstAttack) / 1000)
									: ''
								) + '<br/>' + lootRow
							);
						}
					},

					/**
					 * @returns {qx.ui.tabview.Page}
					 */
					getCurrentBaseInfoTab: function() {
						return webfrontend.gui.info.BaseInfoWindow.getInstance().getChildren()[0].getSelection()[0];
					},

					/**
					 * @param {qx.ui.tabview.Page} tab
					 * @returns {Boolean}
					 */
					isReportTab: function(tab) {
						var tabView = webfrontend.gui.info.BaseInfoWindow.getInstance().getChildren()[0];
						var tabIndex = tabView.getChildren().indexOf(tab);

						return 1 <= tabIndex && tabIndex <= 2;
					}
				}
			});
		}

		function waitForGame() {
			try {
				if (typeof qx !== 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().initDone) {
					createReportStats();
					ReportStats.getInstance().initialize();
				}
				else {
					setTimeout(waitForGame, 1000);
				}
			}
			catch (e) {
				console.log('ReportStats: ', e.toString());
			}
		}

		setTimeout(waitForGame, 1000);
	};

	var script = document.createElement('script');
	script.innerHTML = '(' + main.toString() + ')();';
	script.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(script);
})();