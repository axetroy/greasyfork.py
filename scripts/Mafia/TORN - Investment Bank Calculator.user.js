// ==UserScript==
// @name         TORN - Investment Bank Calculator
// @namespace    bank
// @version      1.1
// @description  Calculate your city bank realtime rate
// @author       Mafia[610357]
// @match        https://www.torn.com/bank.php
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    
    var observer = new MutationObserver(function(mutations) {
        if($("div.invest-wrap").length) observer.disconnect();

        var baseRate = parseFloat($(".base-rate").text().match('(\s[0-9]*.[0-9]+|[0-9]+).([0-9]*)'));
        var rate = baseRate / 52;
        var merit = 0;
        var tcb = 1;
        var length = 1;
        var days = 7;
        var money;
        var status = baseRate.toFixed(2).toString().split('').pop() == "0" ? "<strong style='color: green;'>ACCURATE</strong>" : "<strong style='color: red;'>APPROXIMATE</strong>";
                                        
        $(".delimiter-999").delay(500).after(`
        <div class="calc-wrap">
            <div class="title-black top-round" role="heading" aria-level="5">CALCULATOR (Realtime Rate)</div>
            <div class="invest-cont cont-gray bottom-round">
                <div class="invest-head-wrap">
                    <div class="length-cont left">
                        <div class="name bold left">Merit Upgrades:</div>
                        <div class="select-length-wrap left" style="display: block; margin: 17px 10px 0; width:130px;">
                            <select id="select-merit" title="What is your Bank Interest merit upgrade?">
                                <option value="0">No upgrade</option>
                                <option value="1">1 upgrade</option>
                                <option value="2">2 upgrades</option>
                                <option value="3">3 upgrades</option>
                                <option value="4">4 upgrades</option>
                                <option value="5">5 upgrades</option>
                                <option value="6">6 upgrades</option>
                                <option value="7">7 upgrades</option>
                                <option value="8">8 upgrades</option>
                                <option value="9">9 upgrades</option>
                                <option value="10">10 upgrades</option>
    
                            </select>
                        </div>
                        <div style="margin: 20px 0px 0px;">
                            <span class="name bold" style=" vertical-align: middle;">TCB :</span>
                            <input type="checkbox" id="tcb" style="vertical-align: middle;" title="If you own 1,500,000 shares of TCB stocks">
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="money-wrap left" style="margin: 7px 0px 0;">
                        <span class="name bold">Amount of money:</span>                            
                        <input id="uimoney" placeholder="0" title="use shortcuts like <br/> 5k, 1.5m, 2b, 3b" style="height: 10px;width: 110px;border: 1px solid #CCC;border-radius: 5px;padding: 5px;text-align: right;">
                        <input id="money" value="0" type="hidden">
                    </div>
                    <div class="inv left" style="margin: 22px 9px 0px;">
    
                            <div class="name bold left">Length:</div>
                            <div class="select-length-wrap left" style="display: block; margin: -4px 11px 0; width:2px;">
                                <select id="length">
                                    <option days="7" value="1">1 week</option>
                                    <option days="14" value="2.3">2 weeks</option>
                                    <option days="30" value="5">1 month</option>
                                    <option days="60" value="11">2 months</option>
                                    <option days="90" value="16">3 months</option>    
                                </select>
                            </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="diagram-cont" aria-hidden="true">
                    <div class="base-rate-wrap right">
                        <div class="base-rate" style="line-height: 20px;">
                            Investment calculation status : ${status}<br/>
                            <div id="result" style="display: none;">
                            Rate : <span id="timerate"></span><br/>
                            You invest : <span id="invest"></span><br/>
                            Profit : <span id="profit"></span><br/>
                            Profit per day : <span id="dailyprofit"></span><br/>
                            Total to withdraw : <span id="total"></span><br/>
                            </div>
                        </div>
                    </div>
                    <div class="inv btn-wrap silver right" style="float: right;margin: -80px 150px;" title="Accurate calculation but it depends if you have TCB stocks and a number of merit upgrades">
                        <div id="viewrate" class="btn" role="button">
                            Official Counter
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
    
            </div>
        </div>
        
        <hr class="delimiter-999 m-top10 m-bottom10">
        `);
        
        if($(".invest-head-wrap").is(":hidden")) {           
            $("#viewrate").fadeIn().click(function() {
                $(".invest-success").fadeOut();
                $(".invest-head-wrap,.calc-wrap").slideDown();
                $(".diagram-cont").removeClass("hide");
                $("div.btn").fadeOut();
                getProfit();
            });
        }

        $("#viewrate").fadeIn().click(function() {
            $(".invest-success").fadeOut();
            $(".invest-head-wrap,.calc-wrap").slideDown();
            $(".diagram-cont").removeClass("hide");
            $("div.btn").fadeOut();
            getProfit();
        });

        $("#select-merit,#tcb,#length").change(function() {
            getProfit();
        });


        $("#uimoney").keyup(function(){
            getProfit();
        });

        var getProfit = function() {
            var moneylast = $("#uimoney").val().toUpperCase().toString().split('').pop();                
            var zero = moneylast == "B" ? "000000000" : moneylast == "M" ? "000000" : moneylast == "K" ? "000" : "";
            money = parseInt($("#uimoney").val().replace(/\D+/g, '') + zero);
            merit = parseInt($("#select-merit").val());
            tcb = $("#tcb").prop("checked") ? 1.1 : 1;
            length = parseFloat($("#length").val());
            days = $("option:selected",$("#length")).attr("days");

            money = isNaN(money) ? 0 : money;
            var uimoney = money ? commaSeparateNumber(money) : "";
            var timeRate = parseFloat((((rate * length) + ((length / 10) * merit)) * tcb).toFixed(2));
            var profit = parseInt(money * (timeRate / 100));
            var dailyprofit = parseInt(profit / days);
            var total = money + profit;

            $("#uimoney").val(uimoney);
            $("#money").val(money);
            $("#invest").hide().text("$" + commaSeparateNumber(money)).fadeIn();
            $("#timerate").hide().text(timeRate + "%").fadeIn();
            $("#profit").hide().text("$" + commaSeparateNumber(profit)).fadeIn();
            $("#dailyprofit").hide().text("$" + commaSeparateNumber(dailyprofit)).fadeIn();
            $("#total").hide().text("$" + commaSeparateNumber(total)).fadeIn();
            $("#result").slideDown();
            console.log(days);
        };
    });

    var observerTarget = $(".content-wrapper")[0];
    var observerConfig = { attributes: false, childList: true, characterData: false, subtree: true };
    observer.observe(observerTarget, observerConfig);

    function commaSeparateNumber(val){
        while (/(\d+)(\d{3})/.test(val.toString())){
            val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
        }
        return val;
    }
})();