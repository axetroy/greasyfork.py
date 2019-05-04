// ==UserScript==
// @name         Liveleak Speed Slider
// @version      0.1.3
// @namespace    http://lukaszmical.pl/
// @description  Liveleak Player Speed Slider
// @author       Łukasz
// @include      https://www.liveleak.com/ll_embed*
// @include      https://www.liveleak.com/view*
// @grant        none
// ==/UserScript==
var liv = {};
liv.el ={};

liv.init = function () {
    var menu_item =  liv.$('.vjs-speed');
    if(menu_item){
        liv.el.menu = menu_item.parentNode;
        liv.el.player = liv.$('video');
        liv.menu();
    }
    else {
        setTimeout(liv.init, 1000);
    }
};

liv.menu = function () {
    liv.el.menu.innerHTML = '';
    liv.$.style(liv.el.menu.parentNode, 'width', '185px');
    liv.$.style(liv.el.menu.parentNode, 'top', '0');

    var li = liv.$.new('li',{
        className: "vjs-speed",
        style:{
            "height" : "35px"
        }
    });

    var box = liv.$.new('div');

    var initSpeed = liv.initSpeed();

    box.appendChild(liv.check(liv.data('liv_r')));
    box.appendChild(liv.slider(initSpeed));
    box.appendChild(liv.label(initSpeed));

    li.appendChild(box);

    liv.el.menu.appendChild(li);
    liv.duration(initSpeed);
};




liv.initSpeed = function () {
    if(liv.data('liv_r') && liv.data('liv_s')){
        return liv.data('liv_s');
    }
    return 1;
};

liv.check = function (isCheck) {
    var check = liv.$.new('input', {
        'type': 'checkbox',
        title: 'Remember Speed',
        style:{
            height: '20px',
            margin: '8px 8px 0 0',
            width: '20px'
        },
        onchange: liv.remember
    });
    if(isCheck){
        liv.$.attr(check, 'checked', 'checked');
    }
    return check;

};
liv.label = function () {
    liv.el.label =  liv.$.new('div', {
        style:{
            height: '35px',
            width: '30px',
            float: 'right',
            'text-align': 'center',
            'margin-left': '5px',
            'font-size': '16px',
            'line-height': '35px'
        }
    });
    return liv.el.label;
};

liv.slider = function (initSpeed) {
    return liv.$.new('input', {
        'type': 'range',
        'min': 0.5,
        'max': 4,
        'step': 0.1,
        'value': initSpeed,
        style:{
            'width': '100px'
        },
        onchange : liv.change,
        oninput: liv.move,
        onwheel:liv.onwheel
    });
};


liv.move = function (event) {
    liv.updateLabel(event.target.value);
};

liv.onwheel = function (event) {
    var val = parseFloat(event.target.value) + (event.wheelDelta > 0 ? 0.1 : -0.1);
    val = val < 0.5 ? 0.5 : (val > 4 ? 4 : val);
    if(event.target.value != val){
        event.target.value = val;
        liv.duration(val);
    }
    return false;
};

liv.remember = function (event) {
    liv.data('liv_r', event.target.checked ? 1 :0);
};

liv.change = function (event) {
    liv.duration(event.target.value);
};


liv.duration = function(value){
    liv.updateLabel(value);
    liv.data('liv_s', value);
    liv.el.player.playbackRate = value;
};

liv.updateLabel = function(value){
    liv.el.label.innerHTML = parseFloat(value).toFixed(1);
};



liv.setStyle = function () {
    liv.addCss({
        ".video-js .vjs-cog-menu-button .vjs-menu-cog" :{
            "left" : "0"
        },
        ".video-js .vjs-cog-menu-button .vjs-menu-cog .vjs-menu-content .vjs-extend .vjs-extend-menu" :{
            "right" : "80px !important",
            "left" : "auto"
        }
    })
};

liv.$ = function (tselector, all) {
    all = all || false;
    var type = tselector.substring(0, 1);
    var selector = tselector.substring(1);
    var elements;
    if (type == "#")return document.getElementById(selector);
    else if (type == ".") elements = document.getElementsByClassName(selector);
    else elements = document.querySelectorAll(tselector);
    if (all) return elements;
    else return elements.length ? elements[0] : null;
};

liv.$.new = function (tag, option) {
    var element = document.createElement(tag);
    for (var param in option) {
        if(param == 'data' || param == 'style'|| param == 'attr'){
            for(var data in option[param]){
                liv.$[param](element, data, option[param][data]);
            }
        }
        else{
            element[param] = option[param];
        }
    }
    return element;
};


liv.$.data = function (elem, key, val) {
    key = key.replace(/-(\w)/gi, function(x){return x.charAt(1).toUpperCase()});
    if(typeof val !== 'undefined'){
        elem.dataset[key] = val;
    }
    return elem.dataset[key];
};

liv.$.style = function (elem, key, val, priority) {
    priority = priority || '';
    if(typeof val !== 'undefined'){
        elem.style.setProperty(key, val, priority);
    }
    return elem.style.getPropertyValue(key);
};

liv.$.attr = function (elem, key, val) {
    if(typeof val !== 'undefined'){
        elem.setAttribute(key, val);
    }
    return elem.getAttribute(key);
};


liv.data = function (key, val) {
    if(typeof val !== 'undefined'){
        localStorage.setItem(key, val);
    }
    return localStorage.getItem(key);
};


liv.addCss = function(styles){
    var css = '';
    for(var elem in styles){
        css += elem + "{";
        var props = styles[elem];
        for(var prop in props){
            css += prop + ":" + props[prop] + ";";
        }
        css += "}";
    }
    var sheet = document.createElement('style');
    sheet.innerHTML = css;
    document.body.appendChild(sheet);
};

liv.setStyle();
liv.init();