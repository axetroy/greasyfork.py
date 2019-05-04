// ==UserScript==
// @name         百度首页清凉版
// @namespace    http://tampermonkey.net/
// @version      1.0.3 beta
// @description  Custom Your Baidu Home Page
// @author       ShaoFan
// @match        https://www.baidu.com/
// @require      https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.js
// @require      https://greasyfork.org/scripts/47911-font-awesome-all-js/code/Font-awesome%20AllJs.js?version=275337
// @resource     semantic https://cdn.jsdelivr.net/npm/semantic-ui@2.3.1/dist/semantic.min.css
// @run-at       document-start
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    var init_Config = {
        weather:true,
        debug:false,
        bookmark:true,
        backgroundImg:'',
        defaultbackgroundImg:'https://i0.hdslb.com/bfs/vc/c8422da75ab12a5776fe4647d352665df16c6a21.jpg',
        styleList:[
            'semantic'
        ],
        searchPath:'https://www.baidu.com/s?wd=',
        mainStyle:function(element){
            $(element).attr('style', ($(element).attr('style')!=undefined?$(element).attr('style'):"") + 'text-align:left;font-family:Microsoft YaHei');
            return element;
        },
        cardModel:function(option){
            var outter = document.createElement('div');
            $(outter).attr('class','ui card');
            if(option.width != undefined)
                outter.style.width = option.width;
            var content = document.createElement('div');
            $(content).css('padding','1em');
            $(content).append(`<strong class="header">${option.header}  ${option.weather}</strong><div class="meta"><a>${option.currenttemp}</a></div><div class="description">${option.content}</div>`);
            $(outter).append(content);
            return this.mainStyle(outter);
        },
        menuList:{
            '登陆':{expression:'typeof($(".user-name").html()) != "undefined"',in:'$(".user-name").html()',out:'"登陆".toString()',i_f:'window.open("http://i.baidu.com/")',o_f:'bds.se.login.open()'},
            '网盘':{expression:'true',in:'"网盘".toString()',i_f:'window.open("https://pan.baidu.com/")'},
            '设置':{expression:'true',in:'"设置".toString()',out:''},
            '退出':{expression:'typeof($(".user-name").html()) != "undefined"',in:'"退出".toString()',out:'',i_f:'window.location.href="https://passport.baidu.com/?logout&u=https://www.baidu.com"'},
        },
        searchContent:[],
        bookMarkList:{},
        loadLocalData:function(){
            var _temp_s = GM_getValue('searchContent');
            if(_temp_s != 'undefined')
                this.searchContent = _temp_s;
            var _temp_b = GM_getValue('bookMarkList');
            if(_temp_b != 'undefined')
                this.bookMarkList = _temp_b;
            var self = this;
            window.onbeforeunload = function(){
                GM_setValue('searchContent',self.searchContent);
                GM_setValue('bookMarkList',self.bookMarkList);
            }
            var _img = GM_getValue('backgroundImg');
            if(_img != 'undefined')
                this.backgroundImg = _img;
        },
        divFolderTample:function(title,path){
            var out = document.createElement('div');
            out.className = 'ui image label';
            out.innerHTML += `<span name='mark-item-key' data-title='${title}' data-path='${path}' style="cursor:pointer;">${title}</span>`;
            var icon_span = document.createElement('span');
            $(icon_span).attr("name","delete_mark");
            icon_span.style.margin = '0 5px';
            icon_span.style.cursor = "pointer";
            var icon = document.createElement("i");
            icon.style.display = 'inline-block';
            icon.style.width = '0.75em';
            icon.className = 'fas fa-times delete icon';
            icon_span.appendChild(icon);
            out.appendChild(icon_span);

            return out;
        },
        body:'#new-body-wapper',
        leftbody:'#left-body-wapper',
        rightbody:'#right-body-wapper',
        newWapper:function(){
            $('body').children().hide();
            var wapper = document.createElement('div');
            wapper.id = 'new-body-wapper';
            wapper.className = 'ui grid'
            wapper.style.textAlign = 'left';
            wapper.style.width = '100%';
            wapper.style.height = '100%';
            wapper.style.margin = '0';
            if(typeof(this.backgroundImg) != 'undefined' && this.backgroundImg != '')
                wapper.style.backgroundImage = `url("${this.backgroundImg}")`;
            else
                wapper.style.backgroundImage = `url("${this.defaultbackgroundImg}")`;
            wapper.style.backgroundSize = 'cover';
            wapper.style.backgroundRepeat="no-repeat"
            var left = document.createElement('div');
            left.id = 'left-body-wapper';
            left.className = 'three wide column';
            left.style.background = 'inherit';
            left.style.backgroundPosition = 'center top';
            left.style.ebackgroundSize = 'cover';
            left.style.backgroundAttachment = 'fixed';

            wapper.appendChild(left);

            var right = document.createElement('div');
            right.id = 'right-body-wapper';
            right.className = 'thirteen wide column';
            right.style.paddingLeft = '3%';
            wapper.appendChild(right);
            document.querySelector('body').appendChild(wapper);
        },
    };

    var Debug = {
        printDebugInfo:function(name,message){
            if(init_Config.debug){
                console[name](message);
            }
        },
        group:function(message){
            this.printDebugInfo("group",message);
        },
        groupEnd:function(message){
            this.printDebugInfo("groupEnd",message);
        },
        log:function(message){
            this.printDebugInfo("log",message);
        },
        info:function(message){
            this.printDebugInfo("info",message);
        },
        error:function(message){
            this.printDebugInfo("error",message);
        },
        count:function(message){
            this.printDebugInfo("count",message);
        }
    };

    var function_center = {
        run:function(){
            //require
            init_Config.loadLocalData();
            init_Config.newWapper();
            this._loadStyle();
            this._leftSkyscraperTheme();
            this._leftSkyscraper();
            this.settingModel();
            this._searchFunc();
            this.loadBookMark();
            this.refurbishBookMarkOnPage();


            //custom
            var self = this;
            setTimeout(function(){
                if(init_Config.weather)self._weatherGet();
            },500);
        },
        _ajax:function(option){
            var xhr;
            if(window.ActiveXObject)
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            else if (window.XMLHttpRequest)
                xhr = new XMLHttpRequest();

            xhr.onload = option.onload;
            xhr.timeout = option.timeout != undefined?option.timeout:3000;

            if(option.method.toLowerCase() == 'get' && option.data != null){
                var parameters = '';
                for(var key in option.data)
                    parameters = parameters.concat(`&${key}=${option.data[key]}`);
                parameters = parameters.substring(1);
                xhr.open(option.method,`${option.url}?${parameters}`,option.async);
            }else{
                xhr.open(option.method,option.url,option.async);
            }

            if(option.header != undefined){
                var head = option.header.split(':');
                xhr.setRequestHeader(head[0],head[1]);
            }

            xhr.send(option.data);
        },
        _loadStyle:function(){
            for(var item in init_Config.styleList){
                Debug.log(`import style ${init_Config.styleList[item]} : ${GM_getResourceText(init_Config.styleList[item])!=null}`);
                GM_addStyle(GM_getResourceText(init_Config.styleList[item]));
            }
        },
        _weatherGet:function(){
            var city = document.querySelector('.show-city-name');
            var card = document.createElement("div");
            card.setAttribute('id','wearher-card');
            if(city!= null && typeof(city) != 'undefined' && city.getAttribute('data-key') != ''){
                this._ajax({
                    url:'https://www.baidu.com/home/other/data/weatherInfo',
                    method:'get',
                    async:true,
                    data:{
                        city:city.getAttribute('data-key'),
                        indextype:'manht',
                    },
                    onload:function(responseData){
                        var data = JSON.parse(responseData.target.response).data.weather.content;
                        card.appendChild(init_Config.cardModel({
                            header:data.city,
                            currenttemp:data.currenttemp,
                            weather:data.today.condition,
                            content:'',
                            width:$('#leftSkyscraper').width() + 'px',
                        }));
                        $(card).attr("style","position:absolute;bottom:5%;left:-1%;z-index:999;")
                        $(init_Config.body).append(card);
                    }
                });
            }else{
                card.appendChild(init_Config.cardModel({
                    header:'未登录',
                    currenttemp:'无法获取天气信息',
                    weather:'',
                    content:'',
                    width:$('#leftSkyscraper').width() + 'px',
                }));
                $(card).attr("style","position:absolute;bottom:5%;left:-1%;z-index:999;")
                $(init_Config.body).append(card);
            }
        },
        _leftSkyscraper:function(){
            var leftSkyscraper = document.createElement('div');
            leftSkyscraper.id = 'leftSkyscraper';
            leftSkyscraper.className = 'ui inverted left fixed vertical menu';
            leftSkyscraper.style.width = 'inherit';
            leftSkyscraper.style.zIndex = '15';
            leftSkyscraper.style.background = 'rgba(0,0,0,0.75)';
            leftSkyscraper.style.boxShadow = '0 10px 20px rgba(0,0,0,0.5)';
            $(leftSkyscraper).append('<div class="item"><img class="ui image" src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white.png"></div>');
            for(var item in init_Config.menuList){
                if(eval(init_Config.menuList[item].expression)){
                    $(leftSkyscraper).append(`<a class="item" onclick='eval(${init_Config.menuList[item].i_f})'>${eval(init_Config.menuList[item].in)}</a>`);
                }else{
                    if(init_Config.menuList[item].out != ''){
                        $(leftSkyscraper).append(`<a class="item" onclick='eval(${init_Config.menuList[item].o_f})'>${eval(init_Config.menuList[item].out)}</a>`);
                    }
                }
            }
            $(init_Config.leftbody).append(init_Config.mainStyle($(leftSkyscraper)));
        },
        _leftSkyscraperTheme:function(){
            var frostedGlass = document.createElement('div');
            frostedGlass.id = 'frostedGlass';
            frostedGlass.className = 'ui left fixed vertical menu';
            frostedGlass.style.width = 'inherit';
            frostedGlass.style.zIndex = '10';
            frostedGlass.style.background = 'inherit';
            frostedGlass.style.filter = 'blur(15px)';
            $(init_Config.leftbody).append($(frostedGlass));
        },
        _searchFunc:function(){
            var search = document.createElement('div');
            search.className = 'ui search';
            search.id = 'search'
            search.style.paddingTop = '20px';
            search.style.width = '100%';
            search.innerHTML = `<div class="ui icon input" style="width:95%;"><input class="prompt" type="text" placeholder="Search"><div id="search_btn">百度一下</div></div><div class="results"></div>`;
            $(init_Config.rightbody).append(search);
            if(init_Config.bookmark)
                $(init_Config.rightbody).append(`<div id="mark_wapper" class="ui grid" style="margin-top:40px;"></div>`);
            $("#search input").css('box-shadow','2px 2px 3px rgba(86,86,86,0.7)');
            var searchBtn = document.querySelector('#search_btn');
            searchBtn.style.lineHeight = '38px';
            searchBtn.style.borderRadius = '500rem';
            searchBtn.style.position = 'relative';
            searchBtn.style.left = '-96px';
            searchBtn.style.color = '#fff';
            searchBtn.style.padding = '0 20px';
            searchBtn.style.cursor = 'pointer';
            searchBtn.style.background = 'RGB(49,126,243)';
            var self = this;
            search.onkeydown=function(event){
                var e = event || window.event;
                if(e && e.keyCode==13 && $('#search input').val() != ''){
                    window.open(init_Config.searchPath + encodeURIComponent($('#search input').val()));
                    self._checkSearchContain($('#search input').val());
                    Debug.log(init_Config.searchContent);
                }
            };
            $(searchBtn).bind("click",function(){
                if($("#earch input").val() != ''){
                    window.open(init_Config.searchPath + encodeURIComponent($('#search input').val()));
                    self._checkSearchContain($('#search input').val());
                    Debug.log(init_Config.searchContent);
                }
            });
            $(search).search({source: init_Config.searchContent});
        },
        _checkSearchContain:function(title){
            for(var item in init_Config.searchContent){
                if(init_Config.searchContent[item]['title'] == title){
                    return false;
                }
            }
            init_Config.searchContent.push({title:title});
            $("#search").search({source: init_Config.searchContent});
            return true;
        },
        _showModel:function(modalName){
            $(`#${modalName}`).modal('show');
        },
        loadBookMark:function(){
            var button = document.createElement('div');
            button.className = 'ui big blue compact icon button';
            button.title = '添加书签';
            button.style.boxShadow = '0 2px 2px #444';
            button.style.position = 'absolute';
            button.style.right = '2%';
            button.style.bottom = '2%';
            button.innerHTML = `<i class="pause far fa-bookmark"></i>`;
            $(init_Config.rightbody).append(button);


            var modal = document.createElement('div');
            modal.className = 'ui modal parent_';
            modal.id = 'setting';
            modal.innerHTML = `<i style="font-size:2em" class="fas fa-times close"></i><div class="header">书签</div>`;
            var content = document.createElement('div');
            content.className = 'content';
            content.style.margin = '0';
            var divFolder = document.createElement('div');
            content.appendChild(divFolder);
            divFolder.innerHTML += `<button id="add-mark" class="mini blue ui icon button"><i class="cloud fas fa-plus"></i></button>`;
            modal.appendChild(content);
            $(init_Config.body).append(modal);

            var data_set = document.createElement('div');
            data_set.className = 'ui tiny modal';
            data_set.id = 'data-put';
            data_set.innerHTML = `<div class="header">编辑书签</div>`;
            var content_data = document.createElement('div');
            content_data.className = 'ui grid content';
            content_data.style.margin = '0';
            content_data.innerHTML += `<div class='row'><div class="twelve wide column"><div class="ui fluid input"><input type="text" name="title" placeholder="title..."></div></div></div>`;
            content_data.innerHTML += `<div class='row'><div class="twelve wide column"><div class="ui fluid labeled input"><div class="ui dropdown label"><div class="text">http://</div><i style="margin-left:10px;" class="dropdown fas fa-angle-down"></i><div class="menu"><div class="item">http://</div><div class="item">https://</div></div></div><input type="text" name="path" placeholder="path..."></div></div></div>`;
            data_set.appendChild(content_data);
            var actions_2 = document.createElement('div');
            actions_2.className = 'actions';
            actions_2.innerHTML = `<div class="ui black deny button">取消</div><div class="ui positive right icon button" id="save_mark">保存&nbsp;<i class="checkmark fas fa-check"></i></div>`;
            data_set.appendChild(actions_2);
            $(modal).append(data_set);

            $('.ui.dropdown').dropdown()

            var self = this;
            $(modal).modal({
                onShow:function(){
                    $("#add-mark").siblings().remove();
                    for(var item in init_Config.bookMarkList){
                        var target = init_Config.divFolderTample(item,init_Config.bookMarkList[item]);
                        $("#add-mark").before(target);
                        $(target).find("[name='delete_mark']").click(function(){
                            delete init_Config.bookMarkList[$(this).parent().find("[name='mark-item-key']").attr("data-title")];
                            $(this).parent().remove();
                            self.refurbishBookMarkOnPage();
                            var lokdok = document.createElement('div')
                            lokdok.className = 'ui inline cookie nag';
                            lokdok.style.zIndex = '9999';
                            lokdok.innerHTML = `<span class="title">书签已删除</span><i style="color:#fff" class="close fas fa-times"></i>`;
                            $(modal).append(lokdok);
                            $(lokdok).nag('show');
                            setTimeout(function(){
                                $(lokdok).nag('clear');
                                setTimeout(function(){
                                    $(lokdok).remove();
                                },3000);
                            },3000);
                        });
                        $(target).find("[name='mark-item-key']").click(function(){
                            var i_title = $(data_set).find("input[name='title']");
                            var i_path = $(data_set).find("input[name='path']");
                            $("#data-put .header").html('编辑书签');
                            var title = $(this).attr("data-title");
                            $(i_title).attr("origin-title",title);
                            var path = $(this).attr("data-path");
                            i_title.val(title);
                            var str = path.match(/[^(http:\/\/|https:\/\/)]\S+/)
                            i_path.val(str);
                            $(data_set).modal({
                                onApprove:function(e){
                                    var title = $(data_set).find("input[name='title']");
                                    var path = $(data_set).find("input[name='path']");
                                    var prefix = $("input[name='path']").siblings(".dropdown").find(".text").html();
                                    if(title[0].value == '' || path[0].value == ''){
                                        var lokdok = document.createElement('div')
                                        lokdok.className = 'ui inline cookie nag';
                                        lokdok.style.zIndex = '9999';
                                        lokdok.innerHTML = `<span class="title">请补全数据</span><i style="color:#fff" class="close fas fa-times"></i>`;
                                        $(data_set).append(lokdok);
                                        $(lokdok).nag('show');
                                        setTimeout(function(){
                                            $(lokdok).nag('clear');
                                            setTimeout(function(){
                                                $(lokdok).remove();
                                            },3000);
                                        },3000);
                                        return false;
                                    }else{
                                        debugger;
                                        delete init_Config.bookMarkList[$(title).attr('origin-title')];
                                        init_Config.bookMarkList[title[0].value] = prefix + path[0].value;
                                        $(modal).modal('show');
                                        self.refurbishBookMarkOnPage();
                                    }
                                }
                            });
                            $(data_set).modal('show');
                        });
                    }
                }
            });

            $(button).click(function(){
                $(modal).modal('show');
            });

            $("#add-mark,[name='mark-item-key']").click(function(){
                var i_title = $(data_set).find("input[name='title']");
                var i_path = $(data_set).find("input[name='path']");
                $("#data-put .header").html('添加书签');
                i_title[0].value = '';
                i_path[0].value = '';
                $(data_set).modal({
                    onApprove:function(e){
                        var title = $(data_set).find("input[name='title']");
                        var path = $(data_set).find("input[name='path']");
                        var prefix = $("input[name='path']").siblings(".dropdown").find(".text").html();
                        if(title[0].value == '' || path[0].value == ''){
                            var lokdok = document.createElement('div')
                            lokdok.className = 'ui inline cookie nag';
                            lokdok.style.zIndex = '9999';
                            lokdok.innerHTML = `<span class="title">请补全数据</span><i style="color:#fff" class="close fas fa-times"></i>`;
                            $(data_set).append(lokdok);
                            $(lokdok).nag('show');
                            setTimeout(function(){
                                $(lokdok).nag('clear');
                                setTimeout(function(){
                                    $(lokdok).remove();
                                },3000);
                            },3000);
                            return false;
                        }else{
                            init_Config.bookMarkList[title[0].value] = prefix + path[0].value;
                            $(modal).modal('show');
                            self.refurbishBookMarkOnPage();
                        }
                    }
                });
                $(data_set).modal('show');
            });
        },
        refurbishBookMarkOnPage:function(){
            $("#mark_wapper").empty();
            var mark_container = document.createElement('div');
            mark_container.className = 'ui large blue labels';
            for(var item in init_Config.bookMarkList){
                mark_container.innerHTML += `<a class="ui label" style="box-shadow:0 2px 2px RGBA(160,160,160,0.7)" onClick="eval(window.open('${init_Config.bookMarkList[item]}'))">${item}</a>`;
            }
            $("#mark_wapper").append(mark_container);
        },
        settingModel:function(){
            var modal = document.createElement('div');
            modal.className = 'ui modal';
            modal.id = 'setting';
            modal.innerHTML = `<i style="font-size:2em" class="fas fa-times close"></i><div class="header">设置</div>`;
            var content = document.createElement('div');
            content.className = 'ui content grid';
            content.style.margin = '0';
            content.innerHTML += `<div class='row'><div class="twelve wide column"><div class='ui labeled fluid input'><div class="ui green label">背景</div><input id='newbackground' type="text" placeholder="Image Path Here..."/></div></div></div>`;
            content.innerHTML += `<div class='row'><div class="twelve wide column"><div class="ui left labeled button" tabindex="0"><div class="ui basic right pointing label">清除搜索记录</div><div class="ui green button" id="clearSearchContent"><i class="heart fab fa-envira"></i> Clear </div></div></div></div>`;
            modal.appendChild(content);
            var actions = document.createElement('div');
            actions.className = 'actions';
            actions.innerHTML = `<div class="ui black deny button">取消</div><div class="ui positive right icon button" id="save_setting">保存&nbsp;<i class="checkmark fas fa-check"></i></div>`;
            modal.appendChild(actions);
            var self = init_Config;
            document.querySelector(init_Config.body).appendChild(modal);
            $("#clearSearchContent").click(function(){
                self.searchContent = [];
                GM_setValue('searchContent',self.searchContent);
                $("#search").search({source: self.searchContent});
                var lokdok = document.createElement('div')
                lokdok.className = 'ui inline cookie nag';
                lokdok.style.zIndex = '9999';
                lokdok.innerHTML = `<span class="title">搜索记录已清除完成</span><i style="color:#fff" class="close fas fa-times"></i>`;
                $(modal).append(lokdok);
                $(lokdok).nag('show');
                setTimeout(function(){
                    $(lokdok).nag('clear');
                    setTimeout(function(){
                        $(lokdok).remove();
                    },3000);
                },3000);
            });
            $("#save_setting").click(function(){
                if($("#newbackground").val()!=''){
                    self.backgroundImg = $("#newbackground").val();
                    GM_setValue('backgroundImg',self.backgroundImg);
                    console.log(self.backgroundImg);
                    document.querySelector(self.body).style.backgroundImage = `url("${self.backgroundImg}")`;
                }
            });
            if($("#leftSkyscraper").find('a:contains("设置")') != undefined){
                $("#leftSkyscraper").find('a:contains("设置")').click(function(){
                    if(self.backgroundImg != ''){
                        $('#newbackground').val(self.backgroundImg);
                    }
                    $(modal).modal('show');
                });
            }
        }
    };

    try{
        function_center.run();
    }catch(error){
        console.error(error)
    }
})();