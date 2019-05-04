    // ==UserScript==
    // @name         Vault Sharing
    // @namespace    mafia.vaultsharing
    // @version      1.7
    // @description  Keep track your own balance when you sharing your vault with spouse
    // @author       Mafia [610357]
    // @match        https://www.torn.com/properties.php
    // @require      https://greasyfork.org/scripts/39572/code/helper.js
    // @require      https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js
    // @grant        GM_addStyle
    // ==/UserScript==


    (function() {
        'use strict';

        xhr("properties.php", 'p=options&tab=vault&step=options', 'POST', vaultext);

        function vaultext(response) {
            var mytime;
            var spousetime;
            var me = parseInt($("script[src^='/js/chat/chat']").attr('uid'));
            var vaultID = parseInt($(".options-list").attr("data-id"));
            var key = localStorage.vaultKey || 111;

            $.getJSON('https://torn.gq/vault', {id: vaultID, userid: me, vaultKey: key}, function(data) {

                GM_addStyle('.me { background-color: #fffbce;');

                if(!(!data)) {
                    var mytransaction = {balance: data.balance, timestamp: data.timestamp};
                    var spousetransaction = {balance: data.spousebalance, timestamp: data.spousetime};
                }
                else {
                    var mytransaction = {balance: 0, timestamp: 0};
                    var spousetransaction = {balance: 0, timestamp: 0};
                }

                $.each($(".vault-trans-list li:not(.title) .transaction"), function() {
                    var time = moment.utc($(this).find('.transaction-date').text().trim() + ' ' + $(this).find('.transaction-time').text().trim().replace(' AM','').replace(' PM','')).unix();
                    var username = $(this).find(".t-hide .user.name").text();
                    var userid = parseInt(getParameterByName('XID', $(this).find(".t-hide .user.name").attr("href")));
                    var amount = parseInt($(this).find(".amount").text().match(/\d+/g).join(''));
                    var balance = parseInt($(this).find(".balance").text().match(/\d+/g).join(''));
                    var mode = $(this).find(".type").text().trim();
                    $(this).attr("id",time);


                    if(time > mytransaction.timestamp && userid == me) {
                        mytransaction.balance += mode == 'Deposit' ? amount : -amount;
                    }
                    if(time > spousetransaction.timestamp && userid != me) {
                        spousetransaction.balance += mode == 'Deposit' ? amount : -amount;
                    }
                });

                var mytemp = mytransaction.balance;
                var spousetemp = spousetransaction.balance;
                var mybalance;
                var spousebalance;

                $.each($(".vault-trans-list li:not(.title) .transaction"), function() {
                    var time = moment.utc($(this).find('.transaction-date').text().trim() + ' ' + $(this).find('.transaction-time').text().trim().replace(' AM','').replace(' PM','')).unix();
                    var userid = parseInt(getParameterByName('XID', $(this).find(".t-hide .user.name").attr("href")));
                    var amount = parseInt($(this).find(".amount").text().match(/\d+/g).join(''));
                    var mode = $(this).find(".type").text().trim();

                    if(userid == me) {
                        $(this).find(".balance").addClass("total").after('<li class="balance individual t-overflow" style="display: none;">'+("$"+commaSeparateNumber(mytemp)).replace('$-','-$')+'</li>').parent().addClass('me');
                        if(typeof mytime == 'undefined') {
                            $(this).find(".balance.individual").css("font-weight",800);
                            mytime = time;
                            mybalance = mytemp;
                        }
                        mytemp += mode == 'Deposit' ? -amount : amount;
                    }
                    if(userid != me) {
                        $(this).find(".balance").addClass("total").after('<li class="balance individual t-overflow" style="display: none;">'+("$"+commaSeparateNumber(spousetemp)).replace('$-','-$')+'</li>');
                        if(typeof spousetime == 'undefined') {
                            $(this).find(".balance.individual").css("font-weight",800);
                            spousetime = time;
                            spousebalance = spousetemp;
                        }
                        spousetemp += mode == 'Deposit' ? -amount : amount;
                    }
                });
                if(!(!data)) {

                    if(!$("#myvault").length) {
                        $(".vault-cont.left .m-top10").after(('<p id="myvault">Yours : $'+commaSeparateNumber(typeof mybalance !== 'undefined' ? mybalance : mytemp)+'</p><p id="spousevault">Spouse : $'+commaSeparateNumber(typeof spousebalance !== 'undefined' ? spousebalance : spousetemp)+'</p>').replace('$-','-$'));
                        $(".vault-cont.right .m-bottom10").after("<p style='height: 26px;'>&nbsp;</p>");
                    }
                    else $("#myvault").html(('Yours : $' + commaSeparateNumber(typeof mybalance !== 'undefined' ? mybalance : mytemp)).replace('$-','-$'));

                    $(".vault-trans-list li.title .balance").text("Total Balance").addClass("total").after('<li class="balance individual" style="display: none;">Individual Balance</li>');
                    $(".vault-trans-list li.title .balance").css({"cursor":"pointer","color":"#51a6ef"}).click(function(){
                        $(".balance.total").toggle();
                        $(".balance.individual").toggle();
                    });
                    $.post('https://torn.gq/vault', {
                        id: vaultID,
                        userid: me,
                        vaultKey: key,
                        mybalance: typeof mybalance !== 'undefined' ? mybalance : mytemp,
                        mytime: mytime || spousetime,
                        spousebalance: typeof spousebalance !== 'undefined' ? spousebalance : spousetemp,
                        spousetime: spousetime  || mytime
                    });
                }

                $("li.empty:first .desc").text("Reset Vault Sharing balance").parent().attr("id","vaultExt").removeClass("empty").click(function(){
                    var totalbalance = parseInt(parseInt($(".wvalue").text().match(/\d+/g).join('')));
                    var mybalance = parseInt(prompt("Your balance is $"+$(".wvalue").text()+". Please enter how much you own of this balance ? (The number can be negative if you lend your spouse money from vault)").replace(/,/g,'').replace('$',''));
                    var key = prompt("Please set your Vault Key");
                    if(!isNaN(mybalance)) {
                        var spousebalance = totalbalance - mybalance;

                        $.post('https://torn.gq/vault', {
                            id: vaultID,
                            userid: me,
                            vaultKey: key,
                            mybalance: typeof mybalance !== 'undefined' ? mybalance : mytemp,
                            mytime: mytime || spousetime,
                            spousebalance: spousebalance,
                            spousetime: spousetime  || mytime,
                            reset: 1
                        }, function(data) {
                            setTimeout(function(){location.reload();}, 800);
                        });

                        localStorage.vaultKey = key;
                    }
                })
                .next().removeClass("empty").click(function(){
                    var key = prompt("Please set your Vault Key (Make sure its same key as key that you already set on another device). Or please reset you vault balance and set your new Vault Key");
                    localStorage.vaultKey = key;
                    setTimeout(function(){location.reload();}, 800);
                }).find(".desc").text("Set Vault Key Only (if you already set on another device)");

            });
        }

    })();