// ==UserScript==
// @name         DHM Fixed
// @namespace    FileFace
// @version      1.0.4
// @description  Improve the desktop experience of Diamond Hunt Mobile
// @author       kape142
// @match        *.diamondhunt.app/
// @grant        none
// ==/UserScript==
/*jshint multistr: true */
/*jslint es5: true */

/*
TODO

Main:

Shortcuts:
More shortcuts
Documentation, either in-game or off site
Combat/potion: one row for pots, one for spells


Fixes:
Set standard values for menus manually, find good standards for this option
option to filter out loot from monsters unless they contain e.g. chests/sword/bow
automatic replant on research proc?

ActivityLog:
Design work to make it less ugly
add timestamp
filter before saving
filter search saved data
combat data?

*/

(function() {
    'use strict';

    var Program = {};

    //Main
    Program.Main = {};

    Program.Main.IDs = {}

    Program.Main.initialToggle = 1;

    Program.Main.dialogueID = "";

    Program.Main.toggle = (Module, key) => {
        if(window.localStorage.getItem(key) == 1){
            window.localStorage.setItem(key, 0);
            Module.destroy?Module.destroy():{};
            return false;
        }else{
            window.localStorage.setItem(key, 1);
            Module.init?Module.init():{};
            return true;
        }
    }

    Program.Main.decamelize = (str, separator) => {
        separator = typeof separator === 'undefined' ? '_' : separator;

        return str
            .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
            .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
            .toLowerCase()
            .replace(/^\w/, c => c.toUpperCase());
    }

    Program.Main.showDimmer = (id) => {
        let dimmer = document.getElementById("timeMachine-dimmer");
        dimmer.style.display = "";
        dimmer.style.opacity = "0.7";
        dimmer.style.backgroundColor = "black";
        window.lastDialogueOpenedIdGlobal = id;
    }

    Program.Main.createSettingsDialogue = (Module, key, title) => {
        let buttons = []
        for(let i in Module){
            let submodule = Module[i].Module
            if(submodule){
                buttons.push(Program.Main.createButtonModule(i, submodule, key, submodule.title, submodule.image));
            }
        }
        let dialogue = Program.Main.createDialogue(key, title, buttons)
        Program.Main.IDs[key] = dialogue.id;
        dialogue.style.display = "none"
        let dp = document.getElementById("dialogue-profile");
        let gs = dp.parentNode;
        gs.insertBefore(dialogue, dp);
    }

    Program.Main.showSettingsDialogue = (parentID, ID) => {
        window.closeSmittysDialogue(parentID)
        Program.Main.showDimmer(ID);
        document.getElementById(ID).style.display = "";
    }

    Program.Main.createDialogue = (key, title, elements, onClose) =>{
        let div = document.createElement("div");
        let id = `dialogue-${key}`
        div.id = id;
        div.className = "smittys-dialogues";
        div.style.width = "400px";
        div.style.top = "0px";

        let center = document.createElement("center");
        let h1 = document.createElement("h1");
        h1.textContent = title;
        center.appendChild(h1);
        div.appendChild(center);

        div.appendChild(document.createElement("hr"));

        for(let i in elements){
            div.appendChild(elements[i]);
        }

        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));

        let input = document.createElement("input");
        input.onclick = onClose?onClose:() => {window.closeSmittysDialogueGlobal()};
        input.type = "button";
        input.value = "Close";
        input.style.cursor = "pointer";
        div.appendChild(input);

        return div;
    }

    Program.Main.createButtonModule = (key, Parent, parentID, title, imageURL) => {
        let imgId = `img-${key}`;
        let callback = undefined;
        if(Parent.Submenu){
            Program.Main.createSettingsDialogue(Parent.Submenu,key, title);
            callback = () => Program.Main.showSettingsDialogue(Program.Main.IDs[parentID],Program.Main.IDs[key]);
        }else{
            callback = () => {document.getElementById(imgId).src = Program.Main.toggle(Parent, key)?imageURL:"images/stone.png"};
        }
        return Program.Main.createButton(key, title, Parent.description, (Parent.Submenu || window.localStorage.getItem(key)==1)?imageURL:"images/stone.png", callback);
    }

    Program.Main.createButton = (key, title, description, imageURL, callback) => {
        let div = document.createElement("div");
        let imgId = `img-${key}`;
        div.onclick = callback;
        div.className = "main-button";
        div.style.cursor = "pointer";
        if(description){
            div.title = description;
        }

        let table = document.createElement("table");
        let tbody = document.createElement("tbody");
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        let img = document.createElement("img");
        img.src = imageURL;
        img.className = "img-medium";
        img.id = imgId;
        td1.appendChild(img);
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.style.textAlign = "right";
        td2.style.paddingRight = "20px";
        let textNode = document.createTextNode(title.toUpperCase());
        td2.appendChild(textNode);
        tr.appendChild(td2);

        tbody.appendChild(tr);
        table.appendChild(tbody);
        div.appendChild(table);
        return div;
    }

    Program.Main.addButtonToSettings = () => {
        let div = Program.Main.createButton("dhmfixed", "DHM Fixed", undefined, "images/miningEngineer.png", ()=> Program.Main.showSettingsDialogue("dialogue-profile",Program.Main.IDs.dhmfixed));
        let parent = document.getElementById("dialogue-profile");
        parent.insertBefore(div, parent.children[8]);
    }

    Program.Main.init = () => {
        Program.Main.addButtonToSettings();
        Program.Main.createSettingsDialogue(Program, "dhmfixed", "DHM Fixed");
    }

    //ActivityLog

    Program.ActivityLog = {}

    Program.ActivityLog.visible = false;

    Program.ActivityLog.saveHistory = (data) => {
        if(!localStorage.getItem("ActivityLog")){
            return;
        }
        let historyString = localStorage.getItem("ActivityLog.history."+window.username)
        if(!historyString){
            historyString = "[]";
        }
        let history = JSON.parse(historyString);
        history.push(data);
        if(history.length > 200){
            history = history.slice(100,history.length);
        }
        localStorage.setItem("ActivityLog.history."+window.username, JSON.stringify(history));

        let div = Program.ActivityLog.dataToDiv(data);
        let parent = document.getElementById("dialogue-activityLogDisplay");
        let first = parent.children[2];
        parent.insertBefore(div,first);
    }

    Program.ActivityLog.dataToDiv = (data) => {
        let array = data.split("~");
        if(array.length<4){
            return document.createElement("div");
        }
        let title = array[0];
        let items = [];
        for(let i = 1; i < array.length; i+=4){
            items.push({
                name: array[i],
                amount: array[i+1],
                backgroundColor: array[i+2],
                borderColor: array[i+3]
            });
        }

        let div = document.createElement("div");
        div.style.color = "black";
        div.style.border = "solid grey 1px";
        div.style.backgroundColor = "white";
        div.style.margin = "10px";

        let h1 = document.createElement("h1");
        h1.style.textAlign = "center";
        h1.textContent = title;
        div.appendChild(h1);

        for(let key in items){
            let item = items[key];
            let span = document.createElement("span");
            span.className = "loot-span";
            span.style.backgroundColor = item.backgroundColor;
            span.style.border = `1px solid ${item.borderColor}`;

            let img = document.createElement("img");
            img.className = "img-small-medium";
            img.src = `images/${item.name}.png`;
            let decamName = Program.Main.decamelize(item.name," ")
            img.alt = decamName;
            img.title = decamName;
            span.appendChild(img);

            let text = document.createTextNode(item.amount);
            span.appendChild(text);
            div.appendChild(span);
        }
        return div;
    }

    Program.ActivityLog.toggleLog = (event) => {
        if(event.keyCode == 9 &&
           !event.altKey &&
           !event.ctrlKey &&
           window.username){
            event.preventDefault();
            if(Program.ActivityLog.visible){
                Program.ActivityLog.hideLog()
            }else{
                Program.ActivityLog.showLog();
            }
        }
    }

    Program.ActivityLog.createLog = () => {
        let history = JSON.parse(localStorage.getItem("ActivityLog.history."+window.username));
        if(!history){
            history = [];
        }
        let elements = [];
        for(let i = history.length-1; i >= 0; i--){
            elements.push(Program.ActivityLog.dataToDiv(history[i]))
        }
        let dialogue = Program.Main.createDialogue("activityLogDisplay", "Activity Log", elements, Program.ActivityLog.hideLog);
        dialogue.style.display = "none";
        Program.ActivityLog.dialogueId = dialogue.id;
        Program.ActivityLog.visible = false;
        let dp = document.getElementById("dialogue-profile");
        let gs = dp.parentNode;
        gs.insertBefore(dialogue, dp);
    }

    Program.ActivityLog.showLog = () => {
        window.closeSmittysDialogueGlobal()
        Program.ActivityLog.visible = true;
        Program.Main.showDimmer(Program.ActivityLog.dialogueId);
        document.getElementById(Program.ActivityLog.dialogueId).style.display = "";
    }

    Program.ActivityLog.hideLog = () => {
        Program.ActivityLog.visible = false;
        document.getElementById("timeMachine-dimmer").style.display = "none";
        document.getElementById(Program.ActivityLog.dialogueId).style.display = "none";
    }

    Program.ActivityLog.init = () => {
        Program.WindowExtensions.add("lootDialogue", {
            module: "ActivityLog",
            func: Program.ActivityLog.saveHistory,
            priority: 2
        });
        const func = () => {
            if(window.username){
                //console.log("ok");
                Program.ActivityLog.createLog();
            }else{
                //console.log("waiting");
                setTimeout(func,1000);
            }
        }
        func();
        const toggleVisible = ()=>{
            if(window.lastDialogueOpenedIdGlobal == Program.ActivityLog.dialogueId){
                Program.ActivityLog.visible = !Program.ActivityLog.visible;
            }
            //Program.WindowExtensions._functions.closeSmittysDialogueGlobal();
        };
        Program.WindowExtensions.add("closeSmittysDialogueGlobal", {
            module: "ActivityLog",
            func: toggleVisible,
            priority: 1,
        });
        document.addEventListener("keydown", Program.ActivityLog.toggleLog);
    }

    Program.ActivityLog.destroy = () => {
        document.removeEventListener("keydown", Program.ActivityLog.toggleLog);
        document.getElementById(Program.ActivityLog.dialogueId).remove();
    }

    Program.ActivityLog.Module = {
        title: "Activity Log",
        image: "images/titanium.png",
        init: Program.ActivityLog.init,
        destroy: Program.ActivityLog.destroy,
        description: `Press "tab" to open`,
        initialToggle: 1,
    }


    //Fixes
    Program.Fixes = {}

    Program.Fixes.filterLootDialogue = (data) => {
        if(localStorage.getItem("filterLoot")==1){
           let parts = data.split("~");
            if(parts[0]=="Harvest All" || parts[0] == "Chop All"){
                return {error: `Ignored loot dialogue: ${parts[0]}`};
            }
        }
    }

    Program.Fixes.keepAlive = (data) => {
        if(localStorage.getItem("keepAlive")==1){
            if(data.includes("PAUSE_DATA")){
                return {modifications: ["PAUSE_DATA=0"]};
            }
        }
    }

    Program.Fixes.tenBuckets = (recipe, tab) => {
        if(localStorage.getItem("tenBuckets")==1){
            if(recipe.itemName.includes("ironBucket")){
                window.amountWidgetAmountInputElementGlobal.value = 10;
            }
        }
    }

    Program.Fixes.disableSell = (data) => {
        if(localStorage.getItem("disableSell") == 1){
            return {error: `Selling items to NPCs is disabled, not selling ${data}`}
        }
    }

    /*Program.Fixes.formatNumber = (data) => {
        console.log(data);
        if(localStorage.getItem("formatNumber") == 1){
            if(data.includes(",") && data.includes("M")){
                return {modifications: [data.replace(",",".").replace("M","B")]}
            }
        }
    }*/

    Program.Fixes.instantTeleport = () => {
        if(localStorage.getItem("instantTeleport") == 1){
            window.sendBytes("CAST_COMBAT_SPELL=teleportSpell");
            return {error: `Teleported without confirmation dialogue`}
        }
    }

    Program.Fixes.bloodCrystalDisplay = {}

    Program.Fixes.bloodCrystalDisplay.init = () => {
        document.querySelector("#top-status-bar br").remove()
        document.querySelector("#top-status-bar img[src='images/bloodCrystals.png']").style.marginLeft = "20px";
    }

    Program.Fixes.bloodCrystalDisplay.destroy = () => {
        let bc = document.querySelector("#top-status-bar img[src='images/bloodCrystals.png']")
        let br = document.createElement("br")
        bc.parentElement.insertBefore(br,bc)
        document.querySelector("#top-status-bar img[src='images/bloodCrystals.png']").style.marginLeft = "inherit";
    }

    Program.Fixes.resetCombatPotion = {}

    Program.Fixes.resetCombatPotion.init = () => {
        let sendstring = "DRINK=resetFightingPotion";
        let td = document.createElement("td");
        td.width = "40px";
        td.id = "combat-resetFightingPotion-button";
        td.onclick = ()=>window.clicksItem('resetFightingPotion');
        td.style.textAlign = "right";
        td.style.borderLeft = "1px solid silver";
        td.style.cursor = "pointer";
        let img = document.createElement("img");
        img.src = "images/resetFightingPotion.png";
        img.id = "img-combatResetFightingPotion";
        img.className = "img-small";
        td.appendChild(img);
        document.getElementById("combat-information-button").parentElement.insertBefore(td, document.getElementById("combat-information-button"));
    }

    Program.Fixes.resetCombatPotion.destroy = () => {
        document.getElementById("combat-resetFightingPotion-button").remove();
    }

    Program.Fixes.init = ()=>{
        Program.WindowExtensions.add("lootDialogue", {
            module: "Fixes",
            func: Program.Fixes.filterLootDialogue,
            priority: 1
        });

        Program.WindowExtensions.add("sendBytes", {
            module: "Fixes",
            func: Program.Fixes.keepAlive,
            priority: 1
        });

        Program.WindowExtensions.add("confirmRecipeDialogue", {
            module: "Fixes",
            func: Program.Fixes.tenBuckets,
            priority: -1
        });

        Program.WindowExtensions.add("openSellDialogue", {
            module: "Fixes",
            func: Program.Fixes.disableSell,
            priority: 1
        });

        Program.WindowExtensions.add("confirmTeleportSpell", {
            module: "Fixes",
            func: Program.Fixes.instantTeleport,
            priority: 1
        });

        /*Program.WindowExtensions.add("formatNumber", {
            module: "Fixes",
            func: Program.Fixes.formatNumber,
            priority: -1
        });*/
    }

    Program.Fixes.destroy = ()=>{
    }

    Program.Fixes.Module = {
        title: "Fixes",
        image: "images/promethium.png",
        init: Program.Fixes.init,
        destroy: Program.Fixes.destroy,
        description: `Various toggleable fixes`,
        initialToggle: 1,
        Submenu: {
            filterLoot: {
                Module: {
                    title: "Filter loot",
                    image: "images/promethium.png",
                    description: `Hides "Chop All" and "Harvest All" loot dialogues. They are still added to the activity log`,
                    initialToggle: 0
                }
            },
            keepAlive: {
                Module: {
                    title: "Keep alive",
                    image: "images/promethium.png",
                    description: `Keeps the connection to the server alive even if the game loses focus`,
                    initialToggle: 1
                }
            },
            tenBuckets: {
                Module: {
                    title: "Ten buckets",
                    image: "images/promethium.png",
                    description: `Sets the default amount of buckets to craft to 10 instead of 1`,
                    initialToggle: 1
                }
            },
            disableSell: {
                Module: {
                    title: "Disable selling",
                    image: "images/promethium.png",
                    description: `Disables all selling`,
                    initialToggle: 0
                }
            },
            instantTeleport: {
                Module: {
                    title: "Instant teleport",
                    image: "images/promethium.png",
                    description: `Teleports without confirmation dialogue`,
                    initialToggle: 0
                }
            },
            bloodCrystalDisplay: {
                Module: {
                    title: "BC display",
                    image: "images/promethium.png",
                    description: `Move Blood Crystal icon to the same horizontal level as coins`,
                    initialToggle: 0,
                    init: Program.Fixes.bloodCrystalDisplay.init,
                    destroy: Program.Fixes.bloodCrystalDisplay.destroy
                }
            },
            resetCombatPotion: {
                Module: {
                    title: "CD Reset pot",
                    image: "images/promethium.png",
                    description: `Add a shortcut for Reset Fighting Potion to the exploration menu`,
                    initialToggle: 0,
                    init: Program.Fixes.resetCombatPotion.init,
                    destroy: Program.Fixes.resetCombatPotion.destroy
                }
            }
        }
    }

    //Shortcuts

    Program.Shortcuts = {}

    Program.Shortcuts.functions = [];
    Program.Shortcuts.keyheld = [];

    Program.Shortcuts.firstInit = true;

    Program.Shortcuts.keyup = (event)=>{
        Program.Shortcuts.keyheld[event.keyCode] = false;
        return false;
    };

    Program.Shortcuts.keydown = (event)=>{
        //console.log(String.fromCharCode(event.keyCode));
        if(!Program.Shortcuts.keyheld[event.keyCode] &&
           Program.Shortcuts.functions[event.keyCode] &&
           document.getElementById("dialogue-tradingPost-tradeRequest").style.display=="none" &&
           !event.ctrlKey &&
           window.username){
            if(Program.Shortcuts.functions[event.keyCode]()){
                //console.log("ok");
                event.preventDefault();
                Program.Shortcuts.keyheld[event.keyCode] = true;
            }
        }
        return false;
    };

    Program.Shortcuts.add = (letter, func) => {
        let code = letter.charCodeAt(0);
        if(Program.Shortcuts.functions[code]){
            let _func = Program.Shortcuts.functions[code];
            Program.Shortcuts.functions[code] = ()=>{return _func() || func()};
        }else{
            Program.Shortcuts.functions[code] = func;
        }
    }

    Program.Shortcuts.init = ()=>{
        document.addEventListener("keyup", Program.Shortcuts.keyup);

        document.addEventListener("keydown", Program.Shortcuts.keydown);

        if(Program.Shortcuts.firstInit){
            Program.Shortcuts.firstInit = false;
            Program.Shortcuts.add("M", ()=>{
                window.navigate('mining');
                return true;
            });
            Program.Shortcuts.add("C", ()=>{
                if(document.getElementById("tab-crafting").style.display != "none"){
                    window.setCraftList('default');
                    window.navigate('craftingItems');
                    return true;
                }
                window.navigate('crafting');
                return true;
            });
            Program.Shortcuts.add("W", ()=>{
                window.navigate('woodcutting');
                return true;
            });
            Program.Shortcuts.add("F", ()=>{
                window.navigate('farming');
                return true;
            });
            Program.Shortcuts.add("B", ()=>{
                if(document.getElementById("dialogue-furnace1").style.display != "none"){
                    window.chooseOreForFurnace('copper');
                    window.closeSmittysDialogue('dialogue-furnace1');
                    return true;
                }
                window.navigate('brewing')
                return true;
            });
            Program.Shortcuts.add("E", ()=>{
                if(document.getElementById("tab-exploring").style.display != "none"){
                    window.navigate('explore');
                    return true;
                }
                window.navigate('exploring');
                return true;
            });
            Program.Shortcuts.add("O", ()=>{
                if(document.getElementById("dialogue-bob").style.display != "none"){
                    window.sendBytes('HARVEST_ALL');
                    window.closeSmittysDialogueGlobal();
                    return true;
                }
                if(document.getElementById("tab-cooking").style.display != "none"){
                    if(window.goldOven == 1){
                        window.clicksItem('goldOven');
                    }else if(window.silverOven == 1){
                        window.clicksItem('silverOven');
                    }else if(window.ironOven == 1){
                        window.clicksItem('ironOven');
                    }else if(window.bronzeOven == 1){
                        window.clicksItem('bronzeOven');
                    }else{
                        return false;
                    }
                    return true;
                }
                window.navigate('cooking');
                return true;
            });
            Program.Shortcuts.add(" ", ()=>{
                if(document.getElementById("dialogue-confirm").style.display != "none"){
                    document.getElementById("dialogue-confirm-yes").click();
                    return true;
                }
                if(document.getElementById("tab-explore").style.display != "none"){
                    document.getElementById("exploring-area-button").click();
                    document.getElementById("dialogue-confirm-no").blur();
                    return true;
                }
                if(document.getElementById("dialogue-exploring-openloot").style.display != "none"){
                    document.getElementById("open-one-loot-button").click();
                    return true;
                }
                if(document.getElementById("tab-craftingAnItem").style.display != "none"){
                    document.getElementById("tab-craftingAnItem").children[1].children[3].firstElementChild.click();
                    return true;
                }
                if(document.getElementById("dialogue-multi-craft").style.display != "none"){
                    document.querySelector("#dialogue-multi-craft input[value='Craft']").click();
                    return true;
                }
            });
            Program.Shortcuts.add("D", ()=>{
                if(document.getElementById("dialogue-bob").style.display != "none"){
                    window.setBobsAutoReplantSeed("dottedGreenLeafSeeds")
                    return true;
                }
                if(document.getElementById("tab-farming").style.display != "none"){
                    window.clicksItem('dottedGreenLeafSeeds');
                    return true;
                }
                if(document.getElementById("tab-explore").style.display != "none"){
                    window.loadNextExploringArea();
                    return true;
                }
            });
            Program.Shortcuts.add("A", ()=>{
                if(document.getElementById("tab-explore").style.display != "none"){
                    window.loadPreviousExploringArea();
                    return true;
                }
            });
            Program.Shortcuts.add("S", ()=>{
                if(document.getElementById("dialogue-sellItem").style.display != "none"){
                    window.sendWidgetSellToServer();
                    window.closeSmittysDialogue('dialogue-sellItem');
                    return true;
                }
                if(document.getElementById("dialogue-convertArtifact").style.display != "none"){
                    window.sendBytes(window.amountWidgetGetCommand());
                    window.closeSmittysDialogue('dialogue-convertArtifact');
                    return true;
                }
                if(document.getElementById("dialogue-furnace2").style.display != "none"){
                    window.startSmelting();
                    window.closeSmittysDialogue('dialogue-furnace2');
                    return true;
                }
                if(document.getElementById("dialogue-furnace1").style.display != "none"){
                    window.chooseOreForFurnace('silver');
                    window.closeSmittysDialogue('dialogue-furnace1');
                    return true;
                }
                if(document.getElementById("dialogue-cook").style.display != "none"){
                    window.sendBytes(window.amountWidgetGetCommand());
                    window.closeSmittysDialogue('dialogue-cook');
                    return true;
                }
                if(document.getElementById("dialogue-oven2").style.display != "none"){
                    window.sendBytes(window.amountWidgetGetCommand());
                    window.closeSmittysDialogue('dialogue-oven2');
                    return true;
                }
                if(document.getElementById("dialogue-eat").style.display != "none"){
                    window.sendBytes(window.amountWidgetGetCommand());
                    window.closeSmittysDialogue('dialogue-eat');
                    return true;
                }
                if(document.getElementById("tab-crafting").style.display != "none"){
                    if(window.goldFurnace == 1){
                        window.clicksItem('goldFurnace');
                    }else if(window.silverFurnace == 1){
                        window.clicksItem('silverFurnace');
                    }else if(window.ironFurnace == 1){
                        window.clicksItem('ironFurnace');
                    }else if(window.bronzeFurnace == 1){
                        window.clicksItem('bronzeFurnace');
                    }else if(window.stoneFurnace == 1){
                        window.clicksItem('stoneFurnace');
                    }else{
                        return false;
                    }
                    return true;
                }
                if(document.getElementById("tab-woodcutting").style.display != "none"){
                    window.clicksItem('lumberjack');
                    return true;
                }
                if(document.getElementById("tab-exploring").style.display != "none"){
                    window.lookForFight();
                    return true;
                }
                if(document.getElementById("tab-craftingItems").style.display != "none"){
                    document.getElementById("item-section-crafting-3").firstElementChild.click();
                    return true;
                }
            });
            Program.Shortcuts.add("L", ()=>{
                if(document.getElementById("dialogue-bob").style.display != "none"){
                    window.setBobsAutoReplantSeed("limeLeafSeeds")
                    return true;
                }
                if(document.getElementById("tab-farming").style.display != "none"){
                    window.clicksItem('limeLeafSeeds');
                    return true;
                }
            });
            Program.Shortcuts.add("I", ()=>{
                if(document.getElementById("dialogue-furnace1").style.display != "none"){
                    window.chooseOreForFurnace('iron');
                    window.closeSmittysDialogue('dialogue-furnace1');
                    return true;
                }
            });
            Program.Shortcuts.add("Q", ()=>{
                if(document.getElementById("tab-exploring").style.display != "none"){
                    window.navigate('equipment');
                    return true;
                }
            });
            Program.Shortcuts.add("G", ()=>{
                if(document.getElementById("dialogue-bob").style.display != "none"){
                    window.setBobsAutoReplantSeed("greenLeafSeeds")
                    return true;
                }
                if(document.getElementById("dialogue-furnace1").style.display != "none"){
                    window.chooseOreForFurnace('gold');
                    window.closeSmittysDialogue('dialogue-furnace1');
                    return true;
                }
                if(document.getElementById("tab-farming").style.display != "none"){
                    window.clicksItem('greenLeafSeeds');
                    return true;
                }
            });
            Program.Shortcuts.add("H", ()=>{
                if(document.getElementById("dialogue-confirm").style.display != "none" &&
                   document.getElementById("dialogue-confirm-text").firstElementChild.children[2].textContent == "Your farming patch automatically grows."){
                    document.getElementById("dialogue-confirm-yes").click();
                    return true;
                }
                if(document.getElementById("dialogue-bob").style.display != "none"){
                    window.sendBytes('HARVEST_AND_PLANT_ALL');
                    window.closeSmittysDialogueGlobal();
                    return true;
                }
                if(document.getElementById("tab-farming").style.display != "none"){
                    window.clicksItem('farmer');
                    return true;
                }
            });
            for(let i = 1; i <=9;i++){
                Program.Shortcuts.add(""+i, ()=>{
                    if(document.getElementById("tab-farmingPlant").style.display != "none"){
                        window.sendBytes('PLANT='+window.selectedSeedToPlantGlobal+'~'+i);
                        return true;
                    }
                    if(document.getElementById("dialogue-oven1").style.display != "none"){
                        document.getElementById("dialogue-oven1").children[i-1].firstElementChild.firstElementChild.firstElementChild.click();
                        return true;
                    }
                });
            }
            Program.Shortcuts.add("R", ()=>{
                if(document.getElementById("dialogue-bob").style.display != "none"){
                    window.setBobsAutoReplantSeed("redMushroomSeeds")
                    return true;
                }
                if(document.getElementById("tab-farming").style.display != "none"){
                    window.clicksItem('redMushroomSeeds');
                    return true;
                }
                if(document.getElementById("tab-woodcutting").style.display != "none"){
                    window.clicksItem('treeRoots');
                    return true;
                }
            });
        }
    }

    Program.Shortcuts.destroy = ()=>{
        document.removeEventListener("keyup", Program.Shortcuts.keyup);
        document.removeEventListener("keydown", Program.Shortcuts.keydown);
    }

    Program.Shortcuts.Module = {
        title: "Shortcuts",
        image: "images/gold.png",
        init: Program.Shortcuts.init,
        destroy: Program.Shortcuts.destroy,
        description: `Shortcuts for many common actions. Documentation is coming soon.`,
        initialToggle: 1,
    }


    //WindowExtensions

    Program.WindowExtensions = {}

    Program.WindowExtensions.functions = {}
    Program.WindowExtensions._functions = {}
    Program.WindowExtensions.added = {}
    Program.WindowExtensions.initiated = {}
    Program.WindowExtensions.first = true;


    Program.WindowExtensions.add = (key, funcData) => {
        if(Program.WindowExtensions.added[funcData.module+"."+key]){
            console.log(funcData, key, " added already");
            return;
        }
        Program.WindowExtensions.added[funcData.module+"."+key] = true;
        if(Program.WindowExtensions.functions[key]){
            Program.WindowExtensions.functions[key].push(funcData);
        }else{
            let oldFunc = {
                module: funcData.module,
                func: window[key],
                priority: 0
            }
            Program.WindowExtensions.functions[key] = [oldFunc, funcData];
        }
        if(!Program.WindowExtensions.first){
            Program.WindowExtensions.init();
        }
    }

    Program.WindowExtensions.init = () => {
        for(let key in Program.WindowExtensions.functions){
            let sorted = Program.WindowExtensions.functions[key].sort((a,b)=>b.priority-a.priority);
            let funcs = undefined
            for(let i in sorted){
                console.log(key, i, sorted[i], funcs?"":"first");
                if(funcs){
                    funcs.push((data) => {return sorted[i].func(data)})
                }else{
                    funcs = [sorted[i].func]
                }
            }
            window[key] = (a,b,c,d,e,f,g,h,i,j,k,l,m) => {
                let data = [a,b,c,d,e,f,g,h,i,j,k,l,m]
                for(let i in funcs){
                    let result = funcs[i](data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9],data[10],data[11],data[12])
                    if(result){
                        if(result.error){
                            console.log(result.error);
                            break;
                        }
                        if(result.modifications){
                            for(let j in result.modifications){
                                data[j] = result.modifications[j];
                            }
                        }
                    }
                }
            }
        }
        Program.WindowExtensions.first = false;
    }

    function initiate(Module){
        for(let key in Module){
            let module = Module[key].Module
            if(!module){
                //Module[key].init?Module[key].init():{}
                continue;
            }
            if(module.Submenu){
                initiate(module.Submenu);
            }
            let stored = window.localStorage.getItem(key);
            if(stored == 1){
                module.init?module.init():{}
                console.log(`Module ${key} initiated`);
            }else if(stored == 0){
                console.log(`Module ${key} not initiated, toggled off`);
            }else{
                window.localStorage.setItem(key, module.initialToggle);
                module.initialToggle?(module.init?module.init():{}):{};
                console.log(`Module ${key} initiated, first time`);
            }
        }
    }
    initiate(Program);
    Program.Main.init();
    Program.WindowExtensions.init();

})();
