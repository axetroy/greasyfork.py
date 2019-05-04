// ==UserScript==
// @name         steam补充包工具
// @namespace    http://tampermonkey.net/
// @version      2.7
// @description  To dear sbeamer!
// @author       逍遥千寻
// @include		 http*://steamcommunity.com/*tradingcards/boostercreator*
// @icon         https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f4/f41c579d01a4e5fa0f4f91d69cb93896b8478ccf_medium.jpg
// steamcn       https://steamcn.com/suid-457526
// steam         https://steamcommunity.com/id/zhangxuerui/
// ==/UserScript==

//获取cookie，组装存储key
const cookie = document.cookie;
const boosterKey = 'steam_booster';
const sessionId = cookie.split('sessionid=')[1].split(';')[0];
//游戏选择器
let gameSelector = document.getElementById("booster_game_selector");
//下方展示部分
let gameForm = document.getElementsByClassName('booster_creator_right')[0];
//所有游戏
let backUpOptions = [];
//已收藏游戏
let collectOptions = [];
///未收藏游戏
let outOptions = [];
//补充包队列
let boosterOptions = [];
//黑名单游戏
let blackOptions = [];
//当前可以做补充包的游戏，用于一键做包，只会操作补充包队列的游戏
let availableGame = [];
let doneList = [];
//游戏管理页面
let searchInfo = '';
let searchResult = [];
let pageNum = 1;
let totalCount = 0;
let pageSize = 10;
let priceData = {};
//该用户存储的补充包信息，包括默认展示类型、是否自动查询补充包价格等
let boosterInfo = {};
//市场宝珠价格
let gemsSackPrice = 0;
let marketSack = 0;
let customSack = 0;
//所有游戏的信息，包括appid/name/price/series/available_at_time
const GAME_INFO = CBoosterCreatorPage.sm_rgBoosterData;
//按钮样式
const classObj = {
    disableButton:'btnv6_blue_blue_innerfade btn_medium btn_makepack btn_disabled',
    enableButton:'btnv6_blue_blue_innerfade btn_medium btn_makepack',
};
const commonButtonStyle = 'height:26px;width:44px;float:right;margin-top:14px;';
//游戏操作按钮
const operateButton = {
    outToCollect: {
        text: '收藏',
        style: commonButtonStyle
    },
    outToBooster: {
        text: '队列',
        style: commonButtonStyle + 'background:forestgreen'
    },
    collectToBooster: {
        text: '队列',
        style: commonButtonStyle + 'background:forestgreen'
    },
    collectToOut: {
        text: '移出',
        style: commonButtonStyle + 'background:darkgoldenrod'
    },
    boosterToCollect: {
        text: '收藏',
        style: commonButtonStyle + 'background:mediumsla teblue'
    },
    boosterToOut: {
        text: '删除',
        style: commonButtonStyle + 'background:crimson'
    },
    outToBlack: {
        text: '拉黑',
        style: commonButtonStyle + 'background:black'
    },
    blackToOut: {
        text: '移出',
        style: commonButtonStyle + 'background:darkslategrey'
    },
};

//获取市场上一袋宝珠价格
function getGemsSackPrice() {
    if(marketSack > 0){
        return
    }
    $J.get('https://steamcommunity.com/market/listings/753/753-Sack%20of%20Gems',function (data) {
        let nameid = data.match(/Market_LoadOrderSpread\( (\d+)/)[1];
        let currency = parseInt(data.match(/"wallet_currency":(\d+)/)[1]);
        let language = data.match(/g_strLanguage = "([^"]+)"/)[1];
        let country = data.match(/g_strCountryCode = "([^"]+)"/)[1];
        $J.ajax({
            url: 'https://steamcommunity.com/market/itemordershistogram',
            type: 'GET',
            data: {
                country: country,
                language: language,
                currency: currency,
                item_nameid: nameid
            }
        }).success(function (price) {
            let sellOrder = price.sell_order_graph;
            if(sellOrder && sellOrder.length >= 0){
                marketSack = sellOrder[0]['0'];
                generateGameList(pageNum, pageSize, searchResult)
            }
        }).error(function () {
        })
    })
}

//构建补充包市场地址
function buildBoosterUrl(item) {
    if(!item || stringBlank(item.name)){
        return
    }
    //特殊处理名字中带  / 、&的游戏
    let tempName  = item.name.replace(new RegExp('/','g'),"-");
    let url = 'https://steamcommunity.com/market/listings/753/'+item.appid+'-'+encodeURIComponent(tempName)+'%20Booster%20Pack';
    url = url.replace(new RegExp('amp%3B','g'),'');
    return url
}

//查询当前页面的补充包的价格
function getBoosterPrice(gameList) {
    if(!gameList || gameList.length === 0){
        return
    }
    for (let i = 0; i < gameList.length; i++) {
        let item = GAME_INFO[gameList[i]];
        if(priceData[item.appid] && priceData[item.appid].hadBooster){
            continue
        }
        let priceInfo = {};
        if(priceData[item.appid]){
            priceInfo = priceData[item.appid]
        }
        $J.get(buildBoosterUrl(item),function (data) {
            let nameid = data.match(/Market_LoadOrderSpread\( (\d+)/)[1];
            let currency = parseInt(data.match(/"wallet_currency":(\d+)/)[1]);
            let language = data.match(/g_strLanguage = "([^"]+)"/)[1];
            let country = data.match(/g_strCountryCode = "([^"]+)"/)[1];
            $J.ajax({
                url: 'https://steamcommunity.com/market/itemordershistogram',
                type: 'GET',
                data: {
                    country: country,
                    language: language,
                    currency: currency,
                    item_nameid: nameid
                }
            }).success(function (price) {
                let sellOrder = price.sell_order_graph;
                let buyOrder = price.buy_order_graph;
                priceInfo.hadBooster = true;
                if(buyOrder && buyOrder.length >= 0){
                    priceInfo.buyPrice = buyOrder[0]['0']
                }else {
                    priceInfo.buyPrice = '未知';
                }
                if(sellOrder && sellOrder.length >= 0){
                    priceInfo.sellPrice = sellOrder[0]['0']
                }else {
                    priceInfo.sellPrice = '未知';
                }
                generateCreateButton();
                generateGameList(pageNum, pageSize, searchResult)
            }).error(function () {
                generateCreateButton();
                generateGameList(pageNum, pageSize, searchResult)
            })
            //查询销量，请求过多，暂时屏蔽
            // $J.ajax({
            //     url: 'https://steamcommunity.com/market/priceoverview',
            //     type: 'GET',
            //     data: {
            //         country: country,
            //         currency: currency,
            //         appid:753,
            //         market_hash_name: item.appid + '-' + item.name + ' Booster Pack'
            //     }
            // }).success(function (data) {
            //     if(data && data.volume ){
            //         priceInfo.sold = data.volume
            //     }else {
            //         priceInfo.sold = 0
            //     }
            //     generateCreateButton()
            //     generateGameList(pageNum, pageSize, searchResult)
            // }).error(function () {
            //     generateCreateButton()
            //     generateGameList(pageNum, pageSize, searchResult)
            // })
        });
        priceData[item.appid] = priceInfo
    }
}

//根据appid估算拆包后三张卡牌平均总价，按照最低售价计算
function computeCardPrice(appid) {
    let priceInfo = priceData[appid] ? priceData[appid] : {};
    //防重复
    if(priceInfo.hadCard){
        return
    }
    priceInfo.hadCard = true;
    priceData[appid] = priceInfo;
    //获取所有卡牌
    $J.getJSON('https://steamcommunity.com/market/search/render/?start=0&count=20&category_753_cardborder[]=tag_cardborder_0&appid=753&category_753_Game[]=tag_app_' + appid, function (data) {
        //卡牌总数
        let cardCount = data.total_count;
        if (!cardCount) {
            return
        }
        let count = 0;
        let totalPrice = 0;
        let cardList = $J('<div>' + data.results_html + '</div>');
        cardList.find('.market_listing_row_link').each(function () {
            let item = $J(this);
            let link = item.attr('href');
            $J.get(link, function (data) {
                let nameid = data.match(/Market_LoadOrderSpread\( (\d+)/)[1];
                let currency = parseInt(data.match(/"wallet_currency":(\d+)/)[1]);
                let language = data.match(/g_strLanguage = "([^"]+)"/)[1];
                let country = data.match(/g_strCountryCode = "([^"]+)"/)[1];
                $J.ajax({
                    url: 'https://steamcommunity.com/market/itemordershistogram',
                    type: 'GET',
                    data: {
                        country: country,
                        language: language,
                        currency: currency,
                        item_nameid: nameid
                    }
                }).success(function (price) {
                    count++;
                    let sellOrder = price.sell_order_graph;
                    if (sellOrder && sellOrder.length >= 0) {
                        totalPrice += sellOrder[0]['0'];
                    }
                    if (cardCount === count) {
                        priceInfo.cardPrice = 3 * (totalPrice / cardCount);
                        priceData[appid] = priceInfo;
                        generateGameList(pageNum, pageSize, searchResult)
                    }
                }).error(function () {
                    generateGameList(pageNum, pageSize, searchResult)
                })
            });
        });
    });
}

//循环制作补充包
function createBooster(index) {
    if(availableGame.length === 0 ){
        return
    }
    if(index === 0){
        //重复点击直接返回
        if(document.getElementById("createButton").innerHTML === '正在制作'){
            return
        }else {
            document.getElementById("createButton").innerHTML = "正在制作"
        }
    }
    let item = availableGame[index];
    $J.ajax({
        url: 'https://steamcommunity.com/tradingcards/ajaxcreatebooster/',
        type: 'POST',
        data: {
            sessionid: sessionId,
            appid: item.value,
            series: GAME_INFO[item.value].series,
            tradability_preference: 1
        },
        crossDomain: true,
        xhrFields: {withCredentials: true}
    }).success(function () {
        doneList.push(item.value);
        if (index + 1 < availableGame.length) {
            createBooster(index + 1)
        } else {
            setUnavalilable();
            buildOptions();
            generateCreateButton()
        }
    }).error(function () {
        document.getElementById("createButton").innerHTML = "宝石不足或其他原因"
    });
}

//制包成功后将对应option设置为unavalilable
function setUnavalilable() {
    if(doneList && doneList.length > 0){
        for (let i = 0; i < backUpOptions.length; i++) {
            if (doneList.indexOf(backUpOptions[i].value) > -1) {
                backUpOptions[i].setAttribute("class", "unavailable")
            }
        }
    }
}

//判断字符串是否为空，不为空是true，为空是false
function stringNotBlank(value) {
    return !stringBlank(value);
}

//判断字符串是否为空，为空是true，不为空是false
function stringBlank(value) {
    return !value || value.trim() === '';
}

//将所有未收藏游戏移入黑名单
function toBlack() {
    if(!outOptions || outOptions.length === 0){
        return
    }
    outOptions.map(function (item) {
        if(boosterInfo.black.indexOf(item.value) === -1){
            operateGame(item.value,"outToBlack")
        }
    })
}

//执行搜索
function doSearch() {
    let inputValue = document.getElementById('searchInput').value;
    let typeSelect = document.getElementById('typeSelect');
    let pageSizeValue = document.getElementById('pageSizeInput').value;
    let sourceSelect = document.getElementById('sourceSelect');


    if (pageSizeValue && !isNaN(pageSizeValue) && /(^[1-9]\d*$)/.test(pageSizeValue) && pageSizeValue !== boosterInfo.pageSize) {
        pageSize = parseInt(pageSizeValue);
        boosterInfo.pageSize = pageSize;
        saveStorage(boosterKey, boosterInfo)
    }

    if (stringNotBlank(inputValue)) {
        searchInfo = inputValue.trim()
    } else {
        searchInfo = ''
    }
    if (boosterInfo.typeIndex !== typeSelect.selectedIndex) {
        boosterInfo.typeIndex = typeSelect.selectedIndex;
        saveStorage(boosterKey, boosterInfo)
    }

    //如果是自定义价格，保存
    if (sourceSelect.selectedIndex === 1) {
        let gemPriceInputValue = document.getElementById('gemPriceInput').value;
        if (gemPriceInputValue && !isNaN(gemPriceInputValue)) {
            boosterInfo.sourceIndex = 1;
            boosterInfo.customPrice = gemPriceInputValue;
            saveStorage(boosterKey, boosterInfo)
            customSack = gemPriceInputValue
        }
    }else {
        boosterInfo.sourceIndex = 0;
        saveStorage(boosterKey, boosterInfo)
    }

    searchResult = [];
    let tempGameInfo = {};

    if (boosterInfo.typeIndex === 0) {
        backUpOptions.map(function (item) {
            tempGameInfo[item.value] = GAME_INFO[item.value]
        })
    } else if (boosterInfo.typeIndex === 1) {
        boosterOptions.map(function (item) {
            tempGameInfo[item.value] = GAME_INFO[item.value]
        })
    } else if (boosterInfo.typeIndex === 2) {
        collectOptions.map(function (item) {
            tempGameInfo[item.value] = GAME_INFO[item.value]
        })
    } else if (boosterInfo.typeIndex === 3) {
        outOptions.map(function (item) {
            tempGameInfo[item.value] = GAME_INFO[item.value]
        })
    }else if (boosterInfo.typeIndex === 4) {
        blackOptions.map(function (item) {
            tempGameInfo[item.value] = GAME_INFO[item.value]
        })
    }

    if (stringBlank(searchInfo)) {
        for (let key in tempGameInfo) {
            searchResult.push(tempGameInfo[key])
        }
    } else {
        //支持大小写不敏感匹配、appid匹配、多个字符串匹配
        for (let key in tempGameInfo) {
            if (searchInfo.indexOf(' ') !== -1) {
                let match = true;
                let keyWordArray = searchInfo.split(' ');
                for (let i = 0; i < keyWordArray.length; i++) {
                    if (tempGameInfo[key].name.toUpperCase().indexOf(keyWordArray[i].trim().toUpperCase()) === -1) {
                        match = false;
                        break
                    }
                }
                if (match) {
                    searchResult.push(tempGameInfo[key])
                }
            } else if (searchInfo === tempGameInfo[key].appid || tempGameInfo[key].name.toUpperCase().indexOf(searchInfo.toUpperCase()) > -1) {
                searchResult.push(tempGameInfo[key])
            }
        }
    }
    pageNum = 1;
    generateGameList(pageNum, pageSize, searchResult)
}

//构建市场搜索链接
function buildMarketUrl(name) {
    if(stringBlank(name)){
        return 'https://store.steampowered.com/'
    } else {
        let searchUrl = 'https://steamcommunity.com/market/search?q=';
        let keyArray = name.split(' ');
        searchUrl += keyArray[0];
        for (let i = 1; i < keyArray.length; i++) {
            searchUrl = searchUrl + '+' + keyArray[i]
        }
        searchUrl = searchUrl.replace(new RegExp('&amp;','g'),'%26');
        return searchUrl
    }
}

//切换是否自动查询
function autoQuerySwitch() {
    boosterInfo.autoQuery = !boosterInfo.autoQuery;
    saveStorage(boosterKey,boosterInfo);
    generateGameList(pageNum, pageSize, searchResult)
}

//生成游戏列表
function generateGameList(pageNum, pageSize, searchResult) {
    //重新生成，删除旧数据
    for (let i = gameForm.childNodes.length - 1; i >= 0; i--) {
        gameForm.removeChild(gameForm.childNodes[i]);
    }
    gameForm.setAttribute('style', 'width:860px');

    //补充包成本展示
    let gemsDiv = document.createElement('div');
    gemsDiv.setAttribute('style', 'width:100%;margin-bottom:12px');

    //下拉选择使用市场价还是自定义价格
    let sourceSelect = document.createElement('select');
    sourceSelect.setAttribute('style','margin-right:22px;width:130px');
    sourceSelect.setAttribute('id','sourceSelect');

    let customOption = document.createElement('option');
    customOption.setAttribute('value','2');
    customOption.innerHTML = '使用自定义价格';

    let marketOption = document.createElement('option');
    marketOption.setAttribute('value','1');
    marketOption.innerHTML = '使用市场价格';

    sourceSelect.add(marketOption);
    sourceSelect.add(customOption);

    sourceSelect.selectedIndex = boosterInfo.sourceIndex;

    let customPriceInfo =  document.createElement('span');
    customPriceInfo.innerHTML = '自定义： ';
    customPriceInfo.setAttribute('style','margin-left: 12px;')

    //自定义价格输入框
    let gemPriceInput = document.createElement('input');
    gemPriceInput.setAttribute('id', 'gemPriceInput');
    gemPriceInput.setAttribute('style', 'background-color: rgba( 103, 193, 245, 0.2 ); color: #fff; border: 1px solid #000;border-radius: 3px; width: 60px;padding: 5px;');
    gemPriceInput.value = boosterInfo.customPrice;

    let marketPriceInfo = document.createElement('span');
    marketPriceInfo.innerHTML = '市场价格： ' + marketSack;

    let blackButton = document.createElement('button');
    blackButton.innerHTML = '一键移入黑名单';
    blackButton.setAttribute('class', outOptions.length > 0 ? classObj.enableButton : classObj.disableButton);
    blackButton.setAttribute('title', '将所有未收藏游戏移入黑名单');
    blackButton.setAttribute('style', 'margin-left: 30px;width: 120px; height: 26px;');
    blackButton.onclick = function () {
        toBlack()
    };
    gemsDiv.appendChild(sourceSelect)
    gemsDiv.appendChild(marketPriceInfo);
    gemsDiv.appendChild(customPriceInfo);
    gemsDiv.appendChild(gemPriceInput);
    // 0代表使用市场价，1代表使用自定义
    if (boosterInfo.sourceIndex === 1) {
        gemsSackPrice = customSack;
    } else {
        gemsSackPrice = marketSack;
    }
    if(boosterInfo.typeIndex === 3){
        gemsDiv.appendChild(blackButton);
    }

    //搜索输入框
    let searchInput = document.createElement('input');
    searchInput.setAttribute('id', 'searchInput');
    searchInput.setAttribute('style', 'background-color: rgba( 103, 193, 245, 0.2 ); color: #fff; border: 1px solid #000;border-radius: 3px; width: 240px;padding: 5px;');
    if (searchInfo && searchInfo.trim() !== '') {
        searchInput.value = searchInfo
    }

    //要搜索价格的游戏列表
    let gameList = [];

    //搜索类型选择
    let typeSelect = document.createElement('select');
    let allOption = document.createElement('option');
    allOption.setAttribute('value','all');
    allOption.innerHTML = '全部';
    let boosterOption = document.createElement('option');
    boosterOption.setAttribute('value','booster');
    boosterOption.innerHTML = '队列';
    let filterOption = document.createElement('option');
    filterOption.setAttribute('value','filter');
    filterOption.innerHTML = '收藏';
    let outOption = document.createElement('option');
    outOption.setAttribute('value','out');
    outOption.innerHTML = '未收藏';
    let blackOption = document.createElement('option');
    blackOption.setAttribute('value','black');
    blackOption.innerHTML = '黑名单';

    typeSelect.add(allOption);
    typeSelect.add(boosterOption);
    typeSelect.add(filterOption);
    typeSelect.add(outOption);
    typeSelect.add(blackOption);

    typeSelect.selectedIndex = boosterInfo.typeIndex;
    typeSelect.setAttribute('style','margin-left:30px;width:100px');
    typeSelect.setAttribute('id','typeSelect');

    //是否自动查询开关
    let switchSpan = document.createElement('span');
    switchSpan.innerHTML = '自动查询';
    switchSpan.setAttribute('style','margin-left:30px');
    let switcher = document.createElement('input');
    switcher.setAttribute('id', 'switcher');
    switcher.setAttribute('type', 'checkbox');
    switcher.setAttribute('style', 'position: relative;top: 2px');
    switcher.setAttribute('title','开启后过快操作可能会导致社区请求被短时间封禁，请谨慎操作');
    switcher.checked = boosterInfo.autoQuery;
    switcher.onclick = function () {
        autoQuerySwitch()
    };

    //查询当前页按钮
    let queryCurrent = document.createElement('button');
    queryCurrent.innerHTML = '查询当前页价格';
    queryCurrent.setAttribute('class', classObj.enableButton);
    queryCurrent.setAttribute('style', 'margin-left: 30px;width: 110px; height: 26px;');
    queryCurrent.onclick = function () {
        getBoosterPrice(gameList)
    };

    //页面size输入框
    let pageSizeInput = document.createElement('input');
    pageSizeInput.setAttribute('id', 'pageSizeInput');
    pageSizeInput.setAttribute('style', 'margin-left: 30px;background-color: rgba( 103, 193, 245, 0.2 ); color: #fff; border: 1px solid #000;border-radius: 3px; width: 60px;padding: 5px;');
    pageSizeInput.setAttribute('title','输入分页大小，默认10');
    pageSizeInput.value = pageSize;

    //搜索按钮
    let searchButton = document.createElement('button');
    searchButton.setAttribute('id', 'searchButton');
    searchButton.innerHTML = '搜索';
    searchButton.setAttribute('style', 'border-radius: 2px; border: none;padding: 1px;cursor: pointer;color: #67c1f5 !important;background: rgba( 103, 193, 245, 0.2 );height: 26px;width: 100px;float: right;margin-bottom: 32px;');
    searchButton.onclick = function () {
        doSearch()
    };
    gameForm.appendChild(gemsDiv);
    gameForm.appendChild(searchInput);
    gameForm.appendChild(typeSelect);
    gameForm.appendChild(switchSpan);
    gameForm.appendChild(switcher);
    if(!boosterInfo.autoQuery){
        gameForm.appendChild(queryCurrent)
    }
    gameForm.appendChild(pageSizeInput)
    gameForm.appendChild(searchButton);

    let startIndex = (pageNum - 1) * pageSize;

    let table = document.createElement('table');
    table.setAttribute('style', 'width:100%');
    let th1 = document.createElement('th');
    th1.innerHTML = '游戏';
    th1.setAttribute('style','width:122px');
    th1.setAttribute('title','点击可以跳转到市场对应游戏的物品列表');
    let th2 = document.createElement('th');
    th2.innerHTML = '名称';
    th2.setAttribute('style','width:200px');
    let th3 = document.createElement('th');
    th3.innerHTML = '状态';
    th3.setAttribute('style','width:124px');
    let th4 = document.createElement('th');
    th4.innerHTML = '宝石数';
    th4.setAttribute('style','width:49px');
    let th5 = document.createElement('th');
    th5.innerHTML = '成本';
    th5.setAttribute('style','width:34px');
    th5.setAttribute('title','按照直接购买宝石价格计算');
    let th6 = document.createElement('th');
    th6.innerHTML = '均价';
    th6.setAttribute('style','width:36px');
    th6.setAttribute('title','拆包后三张普通卡牌均价，税后 ');
    let th7 = document.createElement('th');
    th7.innerHTML = '卖单';
    th7.setAttribute('style','width:36px');
    th7.setAttribute('title','按最低卖单卖出税后收入，按照15%税率粗略计算，高于成本会变黄');
    let th8 = document.createElement('th');
    th8.innerHTML = '买单';
    th8.setAttribute('style','width:36px');
    th8.setAttribute('title','按买单直接卖出税后收入，按照15%税率粗略计算，高于成本会变黄');
    let th9 = document.createElement('th');
    th9.innerHTML = '利润率';
    th9.setAttribute('style','width:50px');
    th9.setAttribute('title','（最低卖单税后-成本）/ 成本 ');
    let th10 = document.createElement('th');
    th10.innerHTML = '操作';

    let thread = document.createElement('thread');

    thread.appendChild(th1);
    thread.appendChild(th2);
    thread.appendChild(th3);
    thread.appendChild(th4);
    thread.appendChild(th5);
    thread.appendChild(th6);
    thread.appendChild(th7);
    thread.appendChild(th8);
    thread.appendChild(th9);
    thread.appendChild(th10);

    table.appendChild(thread);
    let tbody = document.createElement('tbody');

    if(searchResult.length > 0){
        for (let i = startIndex; i < searchResult.length && i < startIndex + pageSize; i++) {

            let item = searchResult[i];
            let tr = document.createElement('tr');
            tr.setAttribute('style', 'height:60px');

            //游戏缩略图，点击跳转到市场
            let img = document.createElement('img');
            img.setAttribute('src', 'https://steamcdn-a.akamaihd.net/steam/apps/' + item.appid + '/capsule_sm_120.jpg');
            let aTag = document.createElement('a');
            aTag.setAttribute('href', buildMarketUrl(item.name));
            aTag.setAttribute('target', '_blank');
            aTag.appendChild(img);

            //游戏名称
            let name = document.createElement('span');
            name.innerHTML = item.name;
            name.setAttribute('style', 'display: inline-block;overflow: hidden;text-overflow: ellipsis;width: 190px;white-space: nowrap; margin-left: 10px;position: relative;top: -12px;');
            name.setAttribute('title', item.name);

            //制作冷却
            let availableTime = document.createElement('span');
            if(item.available_at_time){
                availableTime.innerHTML = item.available_at_time;
                availableTime.setAttribute('style', 'display: inline-block;width: 122px; margin-left: 8px;position: relative;top: -12px;');
                availableTime.setAttribute('title','下次可制作补充包时间')
            }else {
                availableTime.innerHTML = '当前可制作';
                availableTime.setAttribute('style', 'display: inline-block;width: 122px; margin-left: 8px;position: relative;top: -12px;color:yellow')
            }

            //补充包需要宝石数
            let price = document.createElement('span');
            price.innerHTML = item['price'];
            price.setAttribute('style', 'display: inline-block;width: 40px; margin-left: 8px;position: relative;top: -12px;');

            //制作成本
            let cost = document.createElement('span');
            cost.setAttribute('style', 'display: inline-block;width: 30px; margin-left: 8px;position: relative;top: -12px;');
            let costPrice = 0.00;
            if (gemsSackPrice > 0) {
                let tempCost = item['price'] / 1000 * gemsSackPrice;
                if (!isNaN(tempCost)) {
                    costPrice = parseFloat(tempCost.toFixed(2));
                    cost.innerHTML = costPrice.toString()
                }
            }
            //最低卖单价格
            let sellPrice = document.createElement('span');
            sellPrice.setAttribute('style', 'display: inline-block;width: 30px; margin-left: 8px;position: relative;top: -12px;');
            sellPrice.setAttribute('title','市场最低售价税后收入，高于成本会变黄');

            //最高买单价格
            let buyPrice = document.createElement('span');
            buyPrice.setAttribute('style', 'display: inline-block;width: 30px; margin-left: 8px;position: relative;top: -12px;');
            buyPrice.setAttribute('title','市场最高买价税后收入，高于成本会变黄');

            //利润率，（最低卖单税后-成本）/ 成本
            let profitRate = document.createElement('span');
            profitRate.setAttribute('style', 'display: inline-block;width: 30px; margin-left: 8px;position: relative;top: -12px;');
            profitRate.setAttribute('title','利润率，（最低卖单税后-成本）/ 成本');

            //税后三张卡牌均价如果高于成本，红色
            let cardPrice = document.createElement('span');
            if (priceData[item.appid] && priceData[item.appid].hadCard) {
                let tempCardPrice = priceData[item.appid].cardPrice;
                if(!isNaN(tempCardPrice)){
                    tempCardPrice = (tempCardPrice / 1.15).toFixed(2);
                    cardPrice.innerHTML = tempCardPrice;
                    if (costPrice > 0 && tempCardPrice > costPrice) {
                        cardPrice.setAttribute('style', 'display: inline-block;width: 30px; margin-left: 8px;position: relative;top: -12px;color:red');
                    }else {
                        cardPrice.setAttribute('style', 'display: inline-block;width: 30px; margin-left: 8px;position: relative;top: -12px');
                    }
                }else {
                    cardPrice.innerHTML = '未知';
                    cardPrice.setAttribute('style', 'display: inline-block;width: 30px; margin-left: 8px;position: relative;top: -12px');
                }
            } else {
                cardPrice.innerHTML = '点击';
                cardPrice.setAttribute('title','查询请求较多，点击后需要稍等片刻');
                cardPrice.setAttribute('style', 'display: inline-block;width: 30px; margin-left: 8px;position: relative;top: -12px;text-decoration:underline;cursor: pointer;');
                cardPrice.onclick = function () {
                    computeCardPrice(item.appid)
                };
            }

            //如果已查询补充包价格，渲染
            if (priceData[item.appid] && priceData[item.appid].hadBooster) {
                if(isNaN( priceData[item.appid].sellPrice)){
                    sellPrice.innerHTML = priceData[item.appid].sellPrice
                }else {
                    let tempSellPrice = priceData[item.appid].sellPrice;
                    tempSellPrice = tempSellPrice/1.15;
                    sellPrice.innerHTML = tempSellPrice.toFixed(2);
                    if (costPrice > 0 && !isNaN(tempSellPrice)) {
                        if (costPrice < tempSellPrice) {
                            sellPrice.setAttribute('style', 'display: inline-block;width: 30px; margin-left: 8px;color:yellow;position: relative;top: -12px;')
                        }
                    }
                    if (costPrice > 0) {
                        let rate = (tempSellPrice - costPrice) / costPrice;
                        profitRate.innerHTML = (Math.round(rate * 10000) / 100).toFixed(2) + '%';
                        if (rate > 0) {
                            profitRate.setAttribute('style', profitRate.getAttribute('style') + 'color:red')
                        }
                    }
                }
                if(isNaN(priceData[item.appid].buyPrice)){
                    buyPrice.innerHTML = priceData[item.appid].buyPrice
                }else {
                    let tempBuyPrice = priceData[item.appid].buyPrice;
                    tempBuyPrice = tempBuyPrice/1.15;
                    buyPrice.innerHTML = tempBuyPrice.toFixed(2);
                    if (costPrice > 0 && !isNaN(tempBuyPrice)) {
                        if (costPrice < tempBuyPrice) {
                            buyPrice.setAttribute('style', 'display: inline-block;width: 30px; margin-left: 8px;color:yellow;position: relative;top: -12px;')
                        }
                    }
                }
            } else {
                gameList.push(item.appid)
            }
            //收藏、移除、移入收藏、加入队列、彻底删除等操作
            let button1;
            let button2;
            let button3;
            if (boosterInfo.game.indexOf(item.appid.toString()) > -1) {
                button1 = generateOperateButton(item, 'boosterToCollect');
                button2 = generateOperateButton(item, 'boosterToOut')
            } else if (boosterInfo.collect.indexOf(item.appid.toString()) > -1) {
                button1 = generateOperateButton(item, 'collectToBooster');
                button2 = generateOperateButton(item, 'collectToOut')
            }else if (boosterInfo.black.indexOf(item.appid.toString()) > -1) {
                button3 = generateOperateButton(item, 'blackToOut');
            } else {
                button1 = generateOperateButton(item, 'outToBooster');
                button2 = generateOperateButton(item, 'outToCollect');
                button3 = generateOperateButton(item, 'outToBlack');
            }
            if(button1){
                button1.setAttribute('style', button1.getAttribute('style') + ';margin-right:8px');
            }
            if (button2) {
                button2.setAttribute('style', button2.getAttribute('style') + ';margin-right:8px');
            }
            tr.appendChild(aTag);
            tr.appendChild(name);
            tr.appendChild(availableTime);
            tr.appendChild(price);
            tr.appendChild(cost);
            tr.appendChild(cardPrice)
            tr.appendChild(sellPrice);
            tr.appendChild(buyPrice);
            tr.appendChild(profitRate);
            if(button3){
                tr.appendChild(button3)
            }
            if (button2) {
                tr.appendChild(button2)
            }
            if (button1) {
                tr.appendChild(button1);
            }
            tbody.appendChild(tr)
        }
    }

    table.appendChild(tbody);

    gameForm.appendChild(table);

    //计算页数
    totalCount = Math.ceil(searchResult.length / pageSize);

    //上一页按钮
    let beforeButton = document.createElement('button');
    beforeButton.setAttribute('id', 'beforeButton');
    beforeButton.innerHTML = '上一页';

    beforeButton.setAttribute('class',pageNum === 1 ? classObj.disableButton:classObj.enableButton);
    beforeButton.setAttribute('style', 'height: 25px;margin-right: 30px;width: 80px;');
    beforeButton.onclick = function () {
        beforePage()
    };
    gameForm.appendChild(beforeButton);

    let pageSpan = document.createElement('span');
    pageSpan.innerHTML = '共 '+ searchResult.length +' 个结果， '+pageNum+' / '+totalCount;
    gameForm.appendChild(pageSpan);

    //下一页按钮
    let afterButton = document.createElement('button');
    afterButton.setAttribute('id', 'afterButton');
    afterButton.innerHTML = '下一页';
    afterButton.setAttribute('class',pageNum === totalCount ? classObj.disableButton:classObj.enableButton);
    afterButton.setAttribute('style', 'height: 25px;margin-left: 30px;width: 80px;');
    afterButton.onclick = function () {
        afterPage()
    };
    gameForm.appendChild(afterButton);

    //跳转页输入
    let jumpInput = document.createElement('input');
    jumpInput.setAttribute('id', 'jumpInput');
    jumpInput.setAttribute('style', 'background-color: rgba( 103, 193, 245, 0.2 );color: #fff;border: 1px solid #000;border-radius: 3px;width: 60px;padding: 5px;margin-left: 30px;');
    gameForm.appendChild(jumpInput);
    //跳转按钮
    let jumpButton = document.createElement('button');
    jumpButton.setAttribute('id', 'jumpButton');
    jumpButton.innerHTML = '跳转';
    jumpButton.setAttribute('class',classObj.enableButton);
    jumpButton.setAttribute('style', 'height: 25px;margin-left: 30px;width: 80px;');
    jumpButton.onclick = function () {
        jumpPage()
    };
    gameForm.appendChild(jumpButton);

    if(boosterInfo.autoQuery && gameList.length > 0){
        getBoosterPrice(gameList)
    }
}

//生成操作按钮
function generateOperateButton(item, type) {
    let button = document.createElement('button');
    button.innerHTML = operateButton[type].text;
    button.setAttribute('class', classObj.enableButton);
    button.setAttribute('style', operateButton[type].style);
    button.setAttribute('id', item.appid.toString() + '+' + type);
    button.onclick = function () {
        operateGame(item.appid.toString(), type)
    };
    return button
}

//跳转到指定页
function jumpPage() {
    let jumpNum = document.getElementById('jumpInput').value;
    if(isNaN(jumpNum) || stringBlank(jumpNum) || parseInt(jumpNum) < 1){
        return
    }
    pageNum = parseInt(jumpNum);
    if (pageNum > totalCount) {
        pageNum = 1
    }
    document.getElementById('jumpInput').value ='';
    generateGameList(pageNum,pageSize,searchResult)
}

//上一页
function beforePage() {
    if (pageNum < 2) {
        return
    }
    pageNum = pageNum - 1;
    generateGameList(pageNum, pageSize, searchResult)
}

//下一页
function afterPage() {
    if (pageNum > totalCount - 1) {
        return
    }
    pageNum = pageNum + 1;
    generateGameList(pageNum, pageSize, searchResult)
}

//生成一键做包等
function generateCreateButton() {
    //每次删除后重新创建
    let tempCreate = document.getElementById('createButton');
    if (tempCreate !== null) {
        tempCreate.parentNode.removeChild(tempCreate)
    }
    let tempConvert = document.getElementById('convertButton');
    if (tempConvert !== null) {
        tempConvert.parentNode.removeChild(tempConvert)
    }

    //更新下拉列表
    // noinspection JSAnnotator
    gameSelector.options.length = 0;
    if (boosterInfo.filter) {
        boosterOptions.map((item) => {
            gameSelector.add(item)
        })
    } else {
        backUpOptions.map((item) => {
            gameSelector.add(item)
        })
    }

    //绘制创建按钮
    let createButton = document.createElement('button');
    createButton.setAttribute('title','只操作补充包队列的游戏');
    createButton.setAttribute('id', 'createButton');
    createButton.onclick = function () {
        document.getElementById("createButton").setAttribute('class', classObj.disableButton);
        doneList = [];
        createBooster(0)
    };
    if (availableGame.length === 0) {
        createButton.innerHTML = '队列全部冷却中';
        createButton.setAttribute('class', classObj.disableButton)
    } else {
        let totalCost = countGemsCost();
        createButton.innerHTML = '一键制作 ' + availableGame.length + ' 个补充包' + ' ( ' + totalCost + ' ) ';
        createButton.setAttribute('class', classObj.enableButton)
    }
    createButton.setAttribute('style', 'height: 29px; margin-top: 16px;width: 208px;');
    document.getElementsByClassName('booster_game_selector')[0].appendChild(createButton);
    //绘制转换按钮
    let convertButton = document.createElement('button');
    convertButton.setAttribute('id', 'convertButton');
    convertButton.setAttribute('class', classObj.enableButton);
    convertButton.innerHTML = boosterInfo.filter ? '展示全部' : '展示队列';
    convertButton.setAttribute('style', 'height: 29px; margin-top: 16px;width: 80px;margin-left:12px');
    convertButton.onclick = function () {
        boosterInfo.filter = !boosterInfo.filter;
        saveStorage(boosterKey, boosterInfo);
        generateCreateButton()
    };
    document.getElementsByClassName('booster_game_selector')[0].appendChild(convertButton)
}

//计算一键做包需要的宝石数
function countGemsCost() {
    let totalCost = 0;
    if (availableGame.length > 0) {
        availableGame.map(function (item) {
            if (GAME_INFO[item.value] && GAME_INFO[item.value]['price']) {
                totalCost += parseInt(GAME_INFO[item.value]['price'])
            }
        })
    }
    return totalCost
}

//初始化/收藏/移除等操作时，重新构建下拉数据
function buildOptions() {
    collectOptions = [];
    boosterOptions = [];
    availableGame = [];
    outOptions = [];
    blackOptions = [];
    for (let i = 0; i < backUpOptions.length; i++) {
        let item = backUpOptions[i];
        if (item.value) {
            if (boosterInfo.game.indexOf(item.value) > -1) {
                boosterOptions.push(item);
                if (item.getAttribute("class") === "available") {
                    availableGame.push(item)
                }
            } else if (boosterInfo.collect.indexOf(item.value) > -1) {
                collectOptions.push(item)
            } else if(boosterInfo.black.indexOf(item.value) > -1){
                blackOptions.push(item)
            }else {
                outOptions.push(item)
            }
        }
    }
}

//对游戏的收藏、删除等操作
function operateGame(appid, type) {
    switch (type) {
        case 'outToCollect':
            if (boosterInfo.collect.indexOf(appid) > -1) {
                return
            } else {
                boosterInfo.collect.push(appid)
            }
            break;
        case 'outToBooster':
            if (boosterInfo.game.indexOf(appid) > -1) {
                return
            } else {
                boosterInfo.game.push(appid)
            }
            break;
        case 'collectToOut':
            if (boosterInfo.collect.indexOf(appid) === -1) {
                return
            } else {
                boosterInfo.collect.splice(boosterInfo.collect.indexOf(appid), 1)
            }
            break;
        case 'collectToBooster':
            if (boosterInfo.collect.indexOf(appid) === -1) {
                return
            } else {
                boosterInfo.collect.splice(boosterInfo.collect.indexOf(appid), 1);
                boosterInfo.game.push(appid)
            }
            break;
        case 'boosterToOut':
            if (boosterInfo.game.indexOf(appid) === -1) {
                return
            } else {
                boosterInfo.game.splice(boosterInfo.game.indexOf(appid), 1)
            }
            break;
        case 'boosterToCollect':
            if (boosterInfo.game.indexOf(appid) === -1) {
                return
            } else {
                boosterInfo.game.splice(boosterInfo.game.indexOf(appid), 1);
                boosterInfo.collect.push(appid)
            }
            break;
        case 'outToBlack':
            if (boosterInfo.black.indexOf(appid) > -1) {
                return
            } else {
                boosterInfo.black.push(appid)
            }
            break;
        case 'blackToOut':
            if (boosterInfo.black.indexOf(appid) === -1) {
                return
            } else {
                boosterInfo.black.splice(boosterInfo.black.indexOf(appid), 1);
            }
            break;
        default:
            return
    }
    saveStorage(boosterKey, boosterInfo);
    //刷新下拉列表，重新生成按钮和表单
    buildOptions();
    generateCreateButton();
    generateGameList(pageNum, pageSize, searchResult)
}

//从localStorage取值
function getStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

//将值存入从localStorage
function saveStorage(key, item) {
    localStorage.setItem(key, JSON.stringify(item))
}

//初始化数据
function init() {
    //没有可以做补充包的游戏，直接返回
    if (!gameSelector || gameSelector.length === 0) {
        return
    }
    //查询宝珠价格，用于计算成本
    getGemsSackPrice();
    //删除默认展示
    for (let i = gameForm.childNodes.length - 1; i >= 0; i--) {
        gameForm.removeChild(gameForm.childNodes[i]);
    }
    //删除下拉列表第一个‘请选择’
    if (stringBlank(gameSelector.options[0].value)) {
        gameSelector.options.remove(0)
    }
    //从localStorage取用户自定义值，默认为空
    boosterInfo = getStorage(boosterKey);
    if (!boosterInfo) {
        boosterInfo = {game: [], collect: [], black: [], filter: true, typeIndex: 0, autoQuery: false , sourceIndex: 0 ,customPrice : 1.6}
    }
    if(!boosterInfo.game){
        boosterInfo.game = []
    }
    if(!boosterInfo.collect){
        boosterInfo.collect = []
    }
    if(!boosterInfo.black){
        boosterInfo.black = []
    }
    if(boosterInfo.pageSize){
        pageSize = parseInt(boosterInfo.pageSize)
    }
    if(boosterInfo.customPrice){
        customSack = boosterInfo.customPrice
    }else {
        boosterInfo.customPrice = 1.6
    }
    //默认将所有信息加入搜索结果
    for (let key in GAME_INFO) {
        searchResult.push(GAME_INFO[key])
    }
    //每个游戏都放入backUpOptions
    for (let i = 0; i < gameSelector.length; i++) {
        backUpOptions.push(gameSelector.options[i])
    }
    //构建collectOptions、boosterOptions、availableGame等
    buildOptions();
    //生成一键制作补充包等按钮
    generateCreateButton();
    //生成下部游戏列表展示
    generateGameList(pageNum, pageSize, searchResult);
    //如果保存的搜索类型不是默认，首先执行一次搜索
    if (boosterInfo.typeIndex !== 0) {
        doSearch()
    }
}
//执行初始化工作
init();