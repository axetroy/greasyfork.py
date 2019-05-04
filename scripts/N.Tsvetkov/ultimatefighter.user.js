// ==UserScript==
// @name        ultimatefighter
// @description Nakurwia hity i je batony, roughly fixed
// @include     *.erepublik.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @version     1.10
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       unsafeWindow
// @namespace https://greasyfork.org/users/2402
// ==/UserScript==

var engine = {
    prefix : 'ultimatefighter_',
    timer : null,
    timer2 : null,
    limithp : 300,
    lasthp : 0,
    hpiter : 0,
    
    startFight : function()
    {
        $('#'+this.prefix+'enable, #'+this.prefix+'disable').hide();
        $('#'+this.prefix+'disable').show();
        unsafeWindow.selectWeapon(7)
        engine.timer = setInterval(function()
        {
            engine.cycleFight();
        }, 550);
        engine.timer2 = setInterval(function()
        {
            engine.recoverHP();
        }, 1500);
        GM_setValue(this.prefix+'enabled', true);
    },
    
    recoverHP : function()
    {
        var en = unsafeWindow.erepublik.citizen.energy;
        if(en < engine.limithp)
        {
            unsafeWindow.smallestFood.use = 1;
            unsafeWindow.energy.eatFood();
        }
    },
    
    
    cycleFight : function()
    {
      
        var en = unsafeWindow.erepublik.citizen.energy;
        if($('div.notifier').is(':visible'))
        {
            setTimeout(function()
            {
                unsafeWindow.window.location = unsafeWindow.window.location;
            }, 15 * 1000);
            engine.tempStopFight();
        }
        else if(en >= engine.limithp)
        {
            unsafeWindow.shoot();
        }
        
        if(engine.lasthp == en)
        {
            engine.hpiter++;
            if(engine.hpiter > 9 && 0)
            {
                engine.tempStopFight();
                unsafeWindow.window.location = unsafeWindow.window.location;
            }
        }
        else
        {
            engine.lasthp = en;
            engine.hpiter = 0;
        }
    },
    
    tempStopFight : function()
    {
        clearTimeout(engine.timer);
        engine.timer = null;
        clearTimeout(engine.timer2);
        engine.timer2 = null;
    },
    
    stopFight : function()
    {
        $('#'+this.prefix+'enable, #'+this.prefix+'disable').hide();
        $('#'+this.prefix+'enable').show();
        clearTimeout(engine.timer);
        engine.timer = null;
        clearTimeout(engine.timer2);
        engine.timer2 = null;
        GM_setValue(this.prefix+'enabled', false);
    },
    
    chooseSide : function()
    {
        var obj = $('a.reversed').attr('href');
        unsafeWindow.window.location = obj;
    },
    
    toggle : function()
    {
        if(engine.timer == null) engine.startFight();
        else engine.stopFight();
    },
    
    setHTML : function()
    {
        var code = '<div style="position: fixed; bottom: 0px; right: 160px; width: 170px; text-align: center; background: white; border: 1px solid black; z-index: 99999;">';
        code += '<div id="'+this.prefix+'enable" style="cursor: pointer; padding: 5px 15px;">Enable ultimatefighter</div>';
        code += '<div id="'+this.prefix+'disable" style="cursor: pointer; padding: 5px 15px; display: none;">Disable ultimatefighter</div>';
        code += '</div>';
        $('body').append(code);
        $('#'+this.prefix+'enable, #'+this.prefix+'disable').click(function() { engine.toggle(); });
    },
    
    checkStart : function()
    {
        GM_setValue(this.prefix+'enabled', false);
        //if(GM_getValue(this.prefix+'enabled', false)) this.startFight();
    },
    
    init : function()
    {
        if(unsafeWindow.window.location.toString().indexOf('military/battlefield') > -1)
        {
            this.setHTML();
            this.checkStart();
        }
        else if(unsafeWindow.window.location.toString().indexOf('wars/show') > -1)
        {
            //this.chooseSide();
        }
    }
};

$(function()
{
    engine.init();
});