// ==UserScript==
// @name        NWP helper in GuangDong
// @description 广东省气象业务网数值预报页面增强
// @namespace   minhill.com
// @include     http://10.148.8.228/to_fore_homepage.action*
// @version     1.4.11
// @require     https://cdnjs.cloudflare.com/ajax/libs/echarts/4.1.0/echarts.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.23.0/moment.min.js
// @grant       GM_addStyle
// @grant       @grant unsafeWindow
// @grant       GM_openInTab
// @grant       GM_xmlhttpRequest
// @license     The MIT License (MIT); http://opensource.org/licenses/MIT
// @connect     172.22.1.175
// @connect     api.map.baidu.com
// @compatible  firefox
// @compatible  chrome
// @note        2018/01/08 增加时效转换按钮
// @note        2018/01/15 增加经纬度功能
// @supportURL  https://greasyfork.org/scripts/26259
// @author      Hanchy Hill
// TODO 数据格式错误时显示提示。
// ==/UserScript==

// @require https://cdn.bootcss.com/lodash.js/4.17.11/lodash.min.js
// select the target node

let userConfig = { // 用户设置
  alterDate : false, // 默认不修改时次
  timelineMove: false,//是否启用滑动时间触发
};

let $ = unsafeWindow.$;

const elemsConfig = {
  latLonInput: undefined,
  showJMA:false,
  $doc:()=>unsafeWindow.$doc,
  $settings:()=>unsafeWindow.$settings,
  $home:unsafeWindow.$home,
  fixPoint: undefined,
  point01: undefined,
  point02: undefined,
  state:'timeseries',//'vertical','skewT'
  compareImgDOM:{img:[],info:[]},//前后预报时次对比DOM引用
};

const helperConfig = {
  region:{
    hn:{//华南
      isMap: true,// 是否是等经纬地图
      projection:'Equidistant',// 投影
      latLon:{
        xRight:636.98, xLeft:172.56,
        yTop:56.516, yBottom:547.576,
        lon0:105.0, lon1:120.0,
        lat0:15.0, lat1:30.0,
      },
    },
    cn:{//中国
      isMap: true,// 是否是等经纬地图
      projection:'Lambert',
      latLon:{
        refLon0:110.25,refLat0:20,
        m0:342.98333,n0:382.51666,
        // refLon0:110,refLat0:20,
        // m0:338.98,n0:382.51,
        refLat1:1.001,refLat2:25.0,
        lonr : 80,latr :40,
        mr:94.983,nr:167.51,
      },

    },
    oy:{//欧亚
      isMap: true,// 是否是等经纬地图
      projection:'Mercator',
      latLon:{
        xRight:692.9833, xLeft:156.9833,
        yTop:54.51666, yBottom:533.51666,
        lon0:60.0, lon1:160.0,
        lat0:10.0, lat1:70.0,
      },
    },
    gd:{//广东
      isMap: true,// 是否是等经纬地图
      projection:'Equidistant',// 投影
      latLon:{
        xRight:589.98334, xLeft:124.98334,
        yTop:104.51666, yBottom:437.51666,
        lon0:110, lon1:116,
        lat0:21.0, lat1:25.0,
      },
    },
    hy:{//海洋
      isMap: true,// 是否是等经纬地图
      projection:'Lambert',// 投影
      latLon:{
        refLon0:110,refLat0:0,
        m0:274.983,n0:490.51666,
        refLat1:1.001,refLat2:25.0,
        lonr : 100,latr: 20,
        mr:171.983,nr:270.51666,
      },
    },
    '86st':{//单站
      isMap: false,
    },
    rainnest:{//雨涡
      isMap: false,
    },

  },
  currentRegion:'hn',
  matchLoc:()=>{},// 获取经纬度的函数
  matchParam:'',// 调用上式的第二参数
};


//
/**
 * unsafeWindow函数
 * selectProItem
 */

const utils = {
  changeRegion(region){
    helperConfig.currentRegion = region;
    return helperConfig.region[region].isMap;// 返回是否是地图
  },
  projection:{
    Mercator:{// 墨卡托投影
      calBasicInfo(lat1=0,lat2=0,n1=0,n2=0){
        /*参数lat 纬度, n坐标数值
        n0 赤道，d0放大系数
        */
        const y1 = Math.log(Math.tan(lat1)+1/Math.cos(lat1));
        const y2 = Math.log(Math.tan(lat2)+1/Math.cos(lat2));
        const n0 = (n1 - (y1/y2) * n2) / (1.0 - y1/y2);
        const d0 = y1/(n0 - n1);
        return {n0,d0};
      },
      calLatLon(mouseXY,dims){
        // console.log(dims);
        const n0 = dims.n0;
        const d0 = dims.d0;
        // console.log(Math.sinh((n0-mouseXY.y)*d0));
        const lat = Math.atan(Math.sinh((n0-mouseXY.y)*d0));
        ///---------------//
        const r = dims.xLeft;
        const o = dims.xRight;
        const s = (dims.lon1 - dims.lon0) / (o - r);
        const u = dims.lon0 + (mouseXY.x - r) * s;
        return {lat:lat*180/Math.PI,lon:u};
      },
    },
    Equidistant:{//等经纬度
      calBasicInfo(){
        return helperConfig.region[helperConfig.currentRegion].latLon
      },
      calLatLon(mouseXY,dims){
        // console.log(dims);
        const r = dims.xLeft;
        const o = dims.xRight;
        const i = dims.yTop;
        const l = dims.yBottom;
        const s = (dims.lon1 - dims.lon0) / (o - r); // o - r 内框宽度 -> s = lon/height
        const d = (dims.lat1 - dims.lat0) / (i - l);// i - l 内框高度  -> d = lat/width
        const u = dims.lon0 + (mouseXY.x - r) * s;
        const m = dims.lat1 + (mouseXY.y - i) * d;
        return {lat:m,lon:u};
      },

    },
    Lambert:{// 兰伯特投影
      calBasicInfo({refLon0,refLat0,m0,n0, refLat1,refLat2,lonr,latr,mr,nr}){
        /*
        refLat0,refLon0，m0,n0 参考纬度、经度，屏幕X坐标，Y坐标；
        屏幕坐标与实际坐标映射：
          x = (m-m0)*dx // dx为x方向比例系数
          y = (n0-n)*dy // dy为y方向比例系数，y方向屏幕坐标反向，所以取反
        refLat1,refLat2  2个平行纬度
        latr,lonr,mr,nr 选取的另外一个点的经纬度和屏幕坐标

        phi 纬度,lambda经度

         */
        const ang2rad = (x=0)=> Math.PI * x/180.0;
        const [phi0,phi1,phi2] = [ang2rad(refLat0),ang2rad(refLat1),ang2rad(refLat2)];
        //console.log(phi0,phi1,phi2);
        const lambda0 = ang2rad(refLon0);
        const [tan,cos,sin,pow,PI,ln] = [Math.tan,Math.cos,Math.sin,Math.pow,Math.PI,Math.log];
        const cot = (x=0)=> Math.cos(x)/Math.sin(x);// 余切
        const sec = (x=0)=> 1/Math.cos(x);// 正割

        const n = ln(cos(phi1)*sec(phi2))/ln(tan(0.25*PI+0.5*phi2)*cot(0.25*PI+0.5*phi1));
        const F = (cos(phi1)*pow(tan(0.25*PI+0.5*phi1),n))/n;
        // n,F常量参数
        let rho = (phi=0)=>F*pow(cot(0.25*PI+0.5*phi),n); // rho变量
        let rho0 = rho(phi0);
        let fx = (phi,lambda)=>rho(phi)*sin(n*(lambda-lambda0));
        let fy = (phi,lambda)=>rho0 - rho(phi)*cos(n*(lambda-lambda0));
        const dx = fx(ang2rad(latr),ang2rad(lonr))/(mr-m0);
        const dy = fy(ang2rad(latr),ang2rad(lonr))/(n0-nr);
        // console.log(dx,dy);
        return {dx, dy, F, n, rho0, lambda0, m0, n0};
      },
      calLatLon(mouseXY,{dx,dy,F,n,rho0, lambda0, m0,n0}){
        const x = (mouseXY.x - m0)*dx;
        const y = (n0-mouseXY.y)*dy;

        let rho = (x,y)=>Math.sign(n)*Math.sqrt(Math.pow(x,2)+Math.pow((rho0-y),2));

        let theta = (x,y)=>Math.atan(x/(rho0-y));
        let phi = (rho)=>2*Math.atan(Math.pow(F/rho,1/n))-0.5*Math.PI;
        let lambda = (theta)=>lambda0 + theta/n;
        const lat = phi(rho(x,y))*180/Math.PI;
        const lon = lambda(theta(x,y))*180/Math.PI;
        // console.log(mouseXY.x-m0,n0-mouseXY.y);
        //console.log(mouseXY.x - m0,n0-mouseXY.y);
        return {lat,lon};
      },
    }

  },
  debounce:(fn, delay, scope)=>{
    let timer = null;
    // 返回函数对debounce作用域形成闭包
    return function () {
        // setTimeout()中用到函数环境总是window,故需要当前环境的副本；
        let context = scope || this, args = arguments;
        // 如果事件被触发，清除timer并重新开始计时
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
  },
  throttle(fn, threshold, scope) {
      let timer;
      let prev = Date.now();
      return function () {
          let context = scope || this, args = arguments;
          let now = Date.now();
          if (now - prev > threshold) {
              prev = now;
              fn.apply(context, args);
          }
      }
  },
  showSkewT(point={lat:21,lon:120},runtime='2019012018',fcHour='18'){
    const latRange = [point.lat-0.125*2,point.lat+0.125*2];
    const lonRange = [point.lon-0.125*2,point.lon+0.125*2];
    let fcTime = utils.getFcTime();
    const initTime = moment(fcTime.date+fcTime.hr,'YYYY-MM-DDHH');
    runtime = initTime.format('YYYYMMDDHH');
    fcHour = fcTime.fcHour;
    GM_openInTab(`https://www.tropicaltidbits.com/analysis/models/sounding/?model=gfs&runtime=${runtime}&fh=${fcHour}&domain=${lonRange[0].toFixed(2)},${lonRange[1].toFixed(2)},${latRange[0].toFixed(2)},${latRange[1].toFixed(2)}&stationID=&tc=&mode=regular`);
    //            https://www.tropicaltidbits.com/analysis/models/sounding/?model=gfs&runtime=2018122418&fh=18&domain=120,122.5,20,22.5&stationID=&tc=&mode=regular
  },
  showVertical(p0={lat:21,lon:120},p1={lat:23,lon:130},runtime='2019012018',fcHour='18'){
    let fcTime = utils.getFcTime();
    const initTime = moment(fcTime.date+fcTime.hr,'YYYY-MM-DDHH');
    runtime = initTime.format('YYYYMMDDHH');
    fcHour = fcTime.fcHour;
    let type = 'RH_and_Omega';//[FGEN,_%CE%B8%E2%82%91,_Omega,RH_and_Omega,Normal_Wind,In-Plane_Wind]
    GM_openInTab(`https://www.tropicaltidbits.com/analysis/models/xsection/?model=gfs&runtime=${runtime}&fh=${fcHour}&p0=${p0.lat.toFixed(2)},${p0.lon.toFixed(2)}&p1=${p1.lat.toFixed(2)},${p1.lon.toFixed(2)}&type=${type}&tc=`);
    //  https://www.tropicaltidbits.com/analysis/models/xsection/?model=gfs&runtime=2018122500&fh=6&p0=31.23,-113.14&p1=39.72,-95.24&type=FGEN,_%CE%B8%E2%82%91,_Omega&tc=
  },
  showTimeSeries(point={lat:21,lon:120}){
    const fcTime = utils.getFcTime();
    const initTime = moment(fcTime.date+fcTime.hr,'YYYY-MM-DDHH');
    const sT = initTime.format('YYYY-MM-DD%20HH:mm:ss');
    const eT = moment(initTime).add(10*24,'hours').format('YYYY-MM-DD%20HH:mm:ss');
    point.lat = utils.fix2Grid(point.lat);
    point.lon = utils.fix2Grid(point.lon);//取格点位置
    getTimeSeries(model='ecmwfthin',
    sT,eT,
    lon=point.lon,lat=point.lat,
    eles=['t2mm','mn2t','mx2t','u10m','v10m','tcco','lcco','tppm']);
  },
  fix2Grid(number,interval=0.125){
    let fixNum = Math.round(number/interval)*interval;
    return fixNum;
  },
  getFcTime(){
    const fcHour = typeof(unsafeWindow.forecastHour)==='string'?unsafeWindow.forecastHour:unsafeWindow.forecastHour[0];
    let idate = unsafeWindow.$settings.date;
    if(!idate.length) throw new Error('日期为空错误');
    if(idate[6]=='-') idate = idate.slice(0,5)+'0'+idate.slice(5);
    if(idate.length===9) idate = idate.slice(0,8)+'0'+idate.slice(8);
    const hr = unsafeWindow.$settings.HH;
    return {date:idate,hr,fcHour};//format->date:'2019-01-22;, hr:'12';fcHour:'000'
  },
  getTimeSeries(point={lat:21,lon:115},model='giftdaily',eles=[t2mm,tmax,tmin],start='2014-11-22%2000:00:00'){

    //http://172.22.1.175/di/grid.action?userId=sqxt&pwd=shengqxt123&interfaceId=intGetMultElesDataTimeSerial&dataFormat=xml2&modelid=giftdaily&element=t2mm%20tmax%20tmin&level=1000&starttime=2014-11-22%2000:00:00&endtime=2014-11-25%2000:00:00&lon=113.5&lat=24.5
  },
  calWind(u10,v10){
    const iSpeed = Math.sqrt(Math.pow(u10,2)+Math.pow(v10,2));//风速
    const iR = Math.sign(v10)*Math.acos(u10/iSpeed);//标准坐标系弧度
    const arrowR = iR - Math.PI/2;//矢量箭头偏移弧度
    let northDir =  -(iR + Math.PI - Math.PI/2);//与北向的角度差
    if(northDir<0){
      northDir = northDir + Math.PI*2;
    }
    const dir = northDir/Math.PI*180;
    if(dir>360) dir = dir - 360;
    return {speed:iSpeed,rotation:arrowR,northDir:northDir};
  },
  renderArrow(param, api) {
    let arrowSize = 10;
    var point = api.coord([
        api.value(2),//dims.timeIndex
        api.value(0)//5//api.value(dims.windSpeed)
    ]);

    return {
      type: 'path',
      shape: {
        //pathData: 'M31 16l-15-15v9h-26v12h26v9z',
        pathData:'M250 0 L140 350 L250 250 L360 350 Z',
        x: -arrowSize / 2,
        y: -arrowSize / 2,
        width: arrowSize,
        height: arrowSize
      },
      rotation: api.value(1),//api.value(dims.R),//Math.PI / 8 * index;
      position: point,
      style: api.style({
        stroke: '#555',
        lineWidth: 1,
        fill:'green',
      })
    };
  },
  createElement(type='div',props={}){
    let newEle = document.createElement(type);
    for(let attr in props){
      newEle.setAttribute(attr,props[attr]);
    }
    return newEle;
  },
  getImgNow(imgSrc){
    let fcTime = utils.getFcTime();
    //const initTime = moment(fcTime.date+fcTime.hr,'YYYY-MM-DDHH');
    // runtime = initTime.format('YYYYMMDDHH');
    fcHour = fcTime.fcHour;
    let url = imgSrc||unsafeWindow.imgSrc[fcHour];
    if(!url) throw new Error('无法获取初始图像');
    
    // url = 'http://10.148.8.228/files_home/znwp/ecmwffine_b/hn/20190128/ecmwffine_hn_mslp_000_2019012800.png';
    const reg = /(http:.*?\/)(\d{8})(.*?_)(\d+)_(\d+)(.*?$)/;
    const matchUrl = url.match(reg);
    /*0: "http://10.148.8.228/files_home/znwp/ecmwffine_b/hn/20190128/ecmwffine_hn_mslp_030_2019012800.png"
1: "http://10.148.8.228/files_home/znwp/ecmwffine_b/hn/"
2: "20190128"
3: "/ecmwffine_hn_mslp_"
4: "030"
5: "2019012800"
6: ".png"
index: 0
input: "http://10.148.8.228/files_home/znwp/ecmwffine_b/hn/20190128/ecmwffine_hn_mslp_030_2019012800.png"
length: 7 */
    const base = [matchUrl[1],matchUrl[3],matchUrl[6]];
    const imgInfo = {
      url:url,
      date:matchUrl[2],
      base,
      hour:matchUrl[4],
      initDate:matchUrl[5],
      getUrl(date=this.date,hour=this.hour,initDate=this.initDate){
        return base[0]+date+base[1]+hour+'_'+initDate+base[2];
      }
    }
    return imgInfo;
  },
  paddingInt(num, length) {
    //这里用slice和substr均可
    return (Array(length).join("0") + num).slice(-length);
  },
};


var NWP_init = function(){
    var fcHour = document.getElementById('forecast_hour');
    var iniTime = document.getElementById('create_day');
    var infoBar = document.getElementById('pic_info');
    var referNode = document.getElementById('to_contrast');
    var divTime = document.createElement('span');
    divTime.textContent = 'hello world';
    divTime.setAttribute('class', 'lcTime');
    divTime.style.position = 'relative';
    divTime.style.float = 'right';
    divTime.style.right = '120px';
    infoBar.insertBefore(divTime, referNode);
    // document.querySelector("#forecast_hours div").textContent = "日期";

    // create an observer instance
    var UTC8 = new MutationObserver(function (mutations) {
      var dateString = iniTime.textContent.match(/(\d+).*?(\d+).*?(\d+).*?(\d+)/);
      var fcDate = [];
      fcDate[0] = Number(dateString[1]);
      fcDate[1] = Number(dateString[2]);
      fcDate[2] = Number(dateString[3]);
      fcDate[3] = Number(dateString[4]);
      fcDate[4] = Number(fcHour.textContent.match(/\d+/));
      fcDate[5] = new Date(fcDate[0], fcDate[1] - 1, fcDate[2], fcDate[3] + fcDate[4] + 8);
      var localTime = String(fcDate[5].getMonth() + 1) + '月' + fcDate[5].getDate() +
      '日' + fcDate[5].getHours() + '时 GMT+8';
      divTime.textContent = localTime;
    });
    // configuration of the observer:
    var config = {
      attributes: true,
      childList: true,
      characterData: true
    };
    UTC8.observe(fcHour, config);
    // later, you can stop observing
    //observer.disconnect();
    //
    //
    /////////////////////////////////////////////////////////////


    //
    ///
    ////////////////////修改时效列/////////////////////////////////////////
    var alterTimelist = function (mutations) {
      //alert(timeBar.length);
      if(userConfig.timelineMove){
        timeMoveOver();//是否启用滑动时间触发
      }
      if(!userConfig.alterDate) return; // 不修改则直接返回
      var dateString = iniTime.textContent.match(/(\d+).*?(\d+).*?(\d+).*?(\d+)/);
      var fcDate = [];
        fcDate[0] = Number(dateString[1]);
        fcDate[1] = Number(dateString[2]);
        fcDate[2] = Number(dateString[3]);
        fcDate[3] = Number(dateString[4]);
      for (let i = 0; i < timeBar.length; i++) {
        let oValue = timeBar[i].value;
        fcDate[4] = Number(timeBar[i].value);

        fcDate[5] = new Date(fcDate[0], fcDate[1] - 1, fcDate[2], fcDate[3] + fcDate[4] + 8);

        let iday = String(fcDate[5].getDate());
        iday = Array(2 > iday.length ? 2 - iday.length + 1 || 0 : 0).join(0) + iday;

        let ihour = String(fcDate[5].getHours());
        ihour = Array(2 > ihour.length ? 2 - ihour.length + 1 || 0 : 0).join(0) + ihour;

        let localTime = iday+' ' + ihour+'     ;';
        let styleText = '#'+timeBar[i].getAttribute("id")+':before{white-space:pre;content: "  '+localTime+'  "}';
        GM_addStyle(styleText);

        switch(fcDate[5].getHours()){
          case 5:
            timeBar[i].style.cssText = "border-left:2px solid #9B30FF";
            break;
          case 14:
            timeBar[i].style.cssText = "border-left:2px solid #EE3B3B";
            break;
          case 20:
            timeBar[i].style.cssText = "border-bottom:1px dotted #8E8E8E;border-left:2px solid #ffffff;";
            break;
          default:
            timeBar[i].style.cssText = "border-left:2px solid #ffffff;";
        }
      }
    };
    /////////////////////////////////////////////////////////////
    ///
    var selectObserver = new MutationObserver(alterTimelist);
    // configuration of the observer:
    var timeBar = document.querySelector("#forecast_hours select");
    var config2 = {
      attributes: false,
      childList: true,
      characterData: false,
    };
    selectObserver.observe(timeBar, config2);
    GM_addStyle("#forecast_hours option{width: 50px!important; overflow: hidden!important;}");

    //-----------------------------------------------------------------------------//
    let imgObserver = new MutationObserver(fitImgLoc);
    imgObserver.observe(timeBar, config2);
    //-----------------------------------绑定坐标-----------------------------------//
    function fitImgLoc(){ // 绑定img包含的div元素
      // console.log(unsafeWindow._region);
      // TODO
      const isMap = utils.changeRegion(unsafeWindow._region); // 改变地图;
      if(!isMap) return; // 如果不是地图直接返回
      /////TODO 判断地图逻辑分离
      const currMap = helperConfig.region[helperConfig.currentRegion];
      const currProjection = currMap.projection;
      //let matchLoc = ({});
      //let param = ({});
      switch (currProjection) {
        case 'Mercator':{const dims = currMap.latLon;
          const lat1 = Math.PI/180.0 * dims.lat0;
          const lat2 = Math.PI/180.0 *dims.lat1;
          const n1 = dims.yBottom;
          const n2 = dims.yTop;
          // console.log(dims);
          const param1 = utils.projection.Mercator.calBasicInfo(
            lat1, lat2, n1, n2
          );
          helperConfig.matchParam = {...param1,
                  xRight:dims.xRight,
                  xLeft:dims.xLeft,
                  lon0:dims.lon0,
                  lon1:dims.lon1,
                  };
          // console.log(helperConfig.matchParam);
          helperConfig.matchLoc = utils.projection.Mercator.calLatLon;
          break;
         }
        case 'Lambert':{
          const LamDim = currMap.latLon;
/*           const LamParam1 =
                [ LamDim.refLon0, LamDim.refLat0, LamDim.m0, LamDim.n0,
                  LamDim.refLat1, LamDim.refLat2,
                  LamDim.lonr, LamDim.latr, LamDim.mr, LamDim.nr]; */
          const LamParam2 = utils.projection.Lambert.calBasicInfo(LamDim);
          // console.log(LamParam2);
          helperConfig.matchParam = LamParam2;
          helperConfig.matchLoc = utils.projection.Lambert.calLatLon;
          break;
        }
        default:
          helperConfig.matchParam = currMap.latLon;
          helperConfig.matchLoc = utils.projection.Equidistant.calLatLon;
          break;
      }

      //let wrapDiv = document.querySelector('#pic_frame div');
      let wrapDiv = document.querySelector('#pic_frame');
      // document.addEventListener('keyup', console.log(elemsConfig.fixPoint));
      if(wrapDiv){
        wrapDiv.addEventListener('mousemove', utils.debounce(getMouseLatLon,100));
        // console.log(wrapDiv.clientWidth);// offsetWidth , clientWidth, scrollWidth
      }
    }

     function getElemRelPos (e, t, n) {// e.target, e.clientX, e.clientY
      var a = e.getBoundingClientRect(),
          r = getComputedStyle(e);
      return {
          x: t - (a.left + parseFloat(r.paddingLeft) + parseFloat(r.borderLeftWidth)),
          y: n - (a.top + parseFloat(r.paddingTop) + parseFloat(r.borderTopWidth))
      };
    }

    function getMouseLatLon(event){
      let target = event.target;//
      const mouseXY = getElemRelPos(target, event.clientX, event.clientY); // 相对图像的像素位置{x,y}
      const loc = helperConfig.matchLoc(mouseXY, helperConfig.matchParam);
      elemsConfig.latLonInput.lat.innerHTML = loc.lat;
      elemsConfig.latLonInput.lon.innerHTML = loc.lon;
      elemsConfig.fixPoint = {lat: loc.lat, lon: loc.lon};
      return {lat: loc.lat, lon: loc.lon};
    }
    //------------------------------24小时跳跃-------------------------------------//
    const timeJump = function(){
      //var hourBar = document.getElementById('from_hour');float-l
      var jumpParent = document.querySelector('.float-l');
      var pre24 = document.createElement('button');
      pre24.addEventListener("click", function(){timeTrigger(-24);});
      pre24.textContent = "-24";
      jumpParent.appendChild(pre24);

      var next24 = document.createElement('button');
      next24.addEventListener("click", function(){timeTrigger(24);});
      next24.textContent = "+24";
      jumpParent.appendChild(next24);

      var timeTrigger = function(timer){
        let selectedVal = timeBar[timeBar.selectedIndex].getAttribute("data-hour");
        let nextVal = String(Number(selectedVal) + timer);
        var posi = 3;
        nextVal = Array(posi > nextVal.length ? posi - nextVal.length + 1 || 0 : 0).join(0) + nextVal;
        let nextopt = timeBar.querySelector("#option_"+nextVal);
        //alert(nextopt);
        if(!nextopt) return;
        timeBar[timeBar.selectedIndex].selected = false;
        nextopt.selected = true;
        //var oitem = document.getElementById('option_018');
        //oitem.selected = true;
        var changeEvt = document.createEvent('HTMLEvents');
        changeEvt.initEvent('change',true,true);
        timeBar.dispatchEvent(changeEvt);
      };
    };

    timeJump();
    /////切换时效

    function switchDate(){
      userConfig.alterDate = !userConfig.alterDate;
      if(userConfig.alterDate){
        switchDateBtn.textContent = "切换成时效";
        alterTimelist();
      }
      else{
        switchDateBtn.textContent = "切换成日期";
        for(let ele of timeBar){
          ele.style.cssText = '';
          let styleText = '#'+ele.getAttribute("id")+':before{white-space:pre;content: ""}';
        GM_addStyle(styleText);
        }
      }
    }

    var switchParent = document.querySelector('.float-l');
    let switchDateBtn = document.createElement('button');
    switchDateBtn.addEventListener("click", switchDate);
    switchDateBtn.textContent = "切换成日期";
    switchParent.appendChild(switchDateBtn);
    /////end 切换时效 /////

    //设置鼠标事件//
    document.onkeydown = function(evt){
      if(evt.key=='x'&&!evt.ctrlKey){
        console.log(utils.showSkewT(elemsConfig.fixPoint));
      }
      else if(evt.key=='x'&&evt.ctrlKey){
        if(!elemsConfig.point01){
          elemsConfig.point01 = Object.assign({},elemsConfig.fixPoint);
        }
        else{
          elemsConfig.point02 = Object.assign({},elemsConfig.fixPoint);
          console.log(elemsConfig.point01,elemsConfig.point02);
          utils.showVertical(elemsConfig.point01,elemsConfig.point02);
          elemsConfig.point01 = null;
          elemsConfig.point02 = null;
        }
      }
      if(evt.key=='c'&&!evt.ctrlKey&&!evt.altKey){
        utils.showTimeSeries(elemsConfig.fixPoint);
      }
    }
    //设置鼠标事件//

    /**
     * 时间鼠标滑过
     */
    function timeMoveOver(){
      var changeEvent = document.createEvent('HTMLEvents');
      changeEvent.initEvent("change", true, true);
      var clickOpt = (evt)=>{
        console.log(evt.target);
        timeBar[timeBar.selectedIndex].selected = false;
        evt.target.selected = true;
        timeBar.dispatchEvent(changeEvent);
      }
      var timeBar = document.querySelector("#forecast_hours select");
      var opts = document.querySelectorAll('#forecast_hours option');
      opts.forEach(item => {
        item.addEventListener('mouseover',clickOpt);
      });
    }
  };

function showJMA(){
  var getXML = function(_url, callback, errorcall){
  return $.ajax({
   type: "GET",
   url: _url,
   dataType: "text",
   success: function(xml){
        var alterString = xml.replace(/<!-- <Products name="jmathin_d"/,'<Products name="jmathin_d"')
                             .replace(/<\/Products>-->\n\s+<Pro.*?专业/,`</Products><Products comparable="flase" show="true" item="专业`);
                             //.replace(/<!--<Products name="ecmwf_b"/,`<Products name="ecmwf_b"`)
                             //.replace(/<\/Products>-->\n\s+<Pro.*?ec/,`</Products><Products name="ec`);
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(alterString, "text/xml");
    var $xml = $(xmlDoc);

    callback($xml);
   },
   error: function(XMLHttpRequest, textStatus, errorThrown)
   {
    $.holdReady(false);
    if(errorcall && $.isFunction(errorcall))
     errorcall(XMLHttpRequest, textStatus, errorThrown);
   }
  });
 };
// 加载XML配置文件

/**
 * 加载左侧菜单
 */
  function reloadMenu(){
    document.getElementById('items').innerHTML = '';
    //doSetLeftMenu();
    //let products=[];
    var span = '<span class="lm_item lm_item_ex lm_item_ep"></span>';
    var titleSpan='<a class="lm_item_a"></a>'
   // 添加对比菜单项
   unsafeWindow.$doc.find('Comparison[show="true"]').each(
     function(i, pros) {
      $(span).attr("id", $(pros).attr("name")).attr("name",
        $(pros).attr("item")).text($(pros).attr("item")).click(
        function() {
         doComparClick(this.id);
        }).appendTo($("#leftMenu #items")).attr("title",$(pros).attr("item"))
        .addClass("lm_item_a").removeClass('lm_item_ep')
        .css({'height':'30px','line-height':'30px','font-size':'14px','text-indent':'8px','text-align':'left','cursor': 'pointer'});
     });

      // 添加预报模式
 //var o = $doc.find('Products[show="true"]');
    let options="";
    $doc.find('Products[show="true"]').each(
      function(i, pros) {
       if(!$(pros).attr("name")){
        var ts = $(titleSpan).text($(pros).attr("item")).appendTo($("#leftMenu #items")).attr("title",$(pros).attr("item"));
        if($(pros).attr("close") == "true"){
         ts.addClass("menu-close");
        }
        return;
       }
       var formatItem=$(pros).attr("item");
       options+="<option value='"+formatItem+"'>"+formatItem+"</option>";
       $(span).attr("id", $(pros).attr("name")).attr("name",
         $(pros).attr("item")).attr(
         "path",
         undefined == ($(pros).attr("path")) ? null : $(pros)
           .attr("path")).text($(pros).attr("item"))
         .click(
           function() {
           unsafeWindow.doClickPors(this.id);
           }).appendTo($("#leftMenu #items")).attr("title",$(pros).attr("item"));
      });
    // console.log(options);
    var impLabWeb = "<a id='rdszdsys'"+
     "href='http://www.grapes-trams.org.cn/Products.aspx?mode=1'"+
     " target='_blank' "+
     " style=' width: 104px;  height: 32px; line-height: 32px; text-align: center; background: none repeat scroll 0 0 #3381CF; color: #FFFFFF; z-index: 10;display:block'>重点实验室外网</a>"
     $("#leftMenu #items").append(impLabWeb);
     $('#jmathin_d').click()
  };

  getXML(unsafeWindow.$home + '/data/forecastInfo.xml', function($xml) {

    unsafeWindow.$doc = $xml;
    reloadMenu();
    }, function() {
   alert("加载XML配置文件失败!");
  });
  elemsConfig.showJMA = !elemsConfig.showJMA;
}

function showNotification(text='测试'){
  // 先检查浏览器是否支持
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // 检查用户是否同意接受通知
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(text);
  }

  // 否则我们需要向用户获取权限
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // 如果用户同意，就可以向他们发送通知
      if (permission === "granted") {
        var notification = new Notification(text);
      }
    });
  }
}

function toggleSelectMode(){

  let bodyDOM = document.getElementsByTagName('body')[0];
  let linePanel = document.getElementById('line_panel');
  let selectModePanel = document.getElementById('select-mode-panel');
  if(bodyDOM.classList.contains("full-screen-mode")){
    bodyDOM.classList.remove("full-screen-mode");
    linePanel.style.display='none';
    selectModePanel.style.display='none';
    return;
  }else{
    bodyDOM.classList.add("full-screen-mode");
    let contentWidth = window.innerWidth - document.body.clientWidth - 40;
    if(contentWidth<200){
      linePanel.style.width='220px';
    }else{
      linePanel.style.width=contentWidth+'px';
    }
    linePanel.style.display='block';
    selectModePanel.style.display='block';
  }
  utils.showTimeSeries({lon:'113.375',lat:'23.125'});
}
// http://172.22.1.175/di/grid.action?userId=idc&pwd=U3cuYV&interfaceId=intGetMultElesDataTimeSerial&dataFormat=xml2&modelid=giftdaily&element=t2mm%20tmax%20tmin&level=1000&starttime=2014-11-22%2000:00:00&endtime=2014-11-25%2000:00:00&lon=113.5&lat=24.5
function getTimeSeries(model='ecmwfthin',sT='2019-01-22%2012:00:00',eT='2019-02-01%2012:00:00',lon='113.0',lat='23.5',eles=['t2mm','mn2t','mx2t','u10m','v10m','tcco','lcco','tppm']){

  const url = `http://172.22.1.175/di/grid.action?userId=sqxt&pwd=shengqxt123&dataFormat=json&interfaceId=intGetMultElesDataTimeSerial&modelid=${model}&element=${eles.join('%20')}&level=0&starttime=${sT}&endtime=${eT}&lon=${lon}&lat=${lat}`;
  console.log('获取数据');
  showNotification('正在从数据中心获取数据');
  console.log(url);
  GM_xmlhttpRequest({ //获取时间序列
    method : 'GET',
    synchronous : false,
    url : url,
    onload : function (reDetails) {
      if (reDetails.status !== 200&&reDetails.status !== 304){
        console.error('获取URL错误');
        showNotification('数据中心数据获取异常');
        return;
      }
      getLocation(lat,lon);
      const data = JSON.parse(reDetails.responseText);
      //console.log(data.DATA);
      if(data.DATA.length==0){
        console.error('此时次数据为空,请等待更新');
        showNotification('此时次数据为空,请等待更新');
        return;
      }
      let series = decodeSeries(data.DATA, 241);
      series[1] = mixUndefined(series[0].map(v=>v[1]),series[1]);
      series[2] = mixUndefined(series[0].map(v=>v[1]),series[2]);
      //console.log(series[1]);
      drawLine(series);
    }
  });
}

function getLocation(lat,lon){
  let ak = 'kMW5fXfhhsMat6Ud9jYPqnxCRQGbl2eV';
  let url = `http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${lat},${lon}&output=json&pois=1&ak=${ak}`;
  let latlonSpan = document.querySelectorAll('#line_info > span');
  latlonSpan[0].innerHTML = lat;
  latlonSpan[1].innerHTML = lon;
  latlonSpan[2].innerHTML = '';
  console.log(url);
  GM_xmlhttpRequest({ //获取时间序列
    method : 'GET',
    synchronous : false,
    url : url,
    onload : function (reDetails) {
      if (reDetails.status !== 200&&reDetails.status !== 304){
        console.error('获取百度地址异常');
        //showNotification('数据中心数据获取异常');
        return;
      }
      let raw = reDetails.responseText.replace('renderReverse&&renderReverse(','').slice(0,-1);
      const addreJSON = JSON.parse(raw);
      if(addreJSON.result.formatted_address==''){
        return;
      }else{
        latlonSpan[2].innerHTML = '&nbsp;&nbsp;&nbsp; 地址: '+ addreJSON.result.formatted_address;
      }
      //console.log(data);
    }
  });
}

function mixUndefined(index,data){
  let newData = [];
  for(let i of index){
    let value = data.find(v=>v[1]==i);
    if(value===undefined){
      newData.push([undefined,i]);
    }else{
      newData.push([value[0],i]);
    }
  }
  return newData
}

/**解析数据 */
function decodeSeries(data=[], len=241){
  if(!data.length) return [];
  let splitData = [];
  let eles = data.length/len;//元素个数
  for(let ie=0;ie<eles;ie++){//看有几个要素
    splitData.push(data.slice(ie*len,(ie+1)*len));
  }
  splitData = splitData.map(data=>data.map((v,i)=>[Number(v),i]).filter(v=>v[0]>-999));//分离出[数值,时效]//-999.900024
  // console.log(splitData);
  return splitData;
}

function drawLine(series=[]){
  // getTimeSeries();
  console.log('绘图');
  if(series.length==0) return console.log('空数据');
  const tempChart = echarts.init(document.getElementById('show-temp'));
  let fcTime = utils.getFcTime();
  let initTime = moment(fcTime.date+fcTime.hr,'YYYY-MM-DDHH').add(8,'hours');//北京时
  let temp = series[0].map(v=>(v[0]-273.15).toFixed(2));
  let mn2t = series[1].map(v=>{
    if(v[0]===undefined){
      return undefined;
    }else{
      return (v[0]-273.15).toFixed(2);
    }
  });
  let mx2t = series[2].map(v=>{
    if(v[0]===undefined){
      return undefined;
    }else{
      return (v[0]-273.15).toFixed(2);
    }
  });
  let xTime = series[0].map(v=>{
    const hour = v[1];
    return moment(initTime).add(hour,'hours').format('DD-HH');
  });
  // console.log(mn2t);
  // 指定图表的配置项和数据
  const OptionTemp = {
    /* title: {
      text: 'Temp.',
      // left: 'center'
    }, */
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      feature: {
          dataZoom: {
              yAxisIndex: 'none'
          },
          restore: {},
          //saveAsImage: {}
      }
    },
    dataZoom: [
      {
          show: true,
          realtime: true,
          start: 0,
          end: 60,
      },
      {
          type: 'inside',
          realtime: true,
          start: 0,
          end: 60,
      }
    ],
    legend: {
        data:['Temp','Pre6min',,'Pre6max']
    },
    xAxis: {
      type : 'category',
      data: xTime,
      // boundaryGap : false,
      //splitArea : {show : true},
      splitLine:{show: true},
      axisLine: {onZero: true},
      
    },
    yAxis: [{
      name:'℃',
      type: 'value',
      scale:true,
      axisLabel: {
        formatter: '{value}'
      },
    },
    ],
    series: [
       {
        name: 'Temp',
        smooth: true,
        //symbol: 'triangle',
        //symbolSize: 5,
        lineStyle: {normal: {color: 'green',width: 2,}},//type: 'dashed'
        //itemStyle: {normal: {borderWidth: 1,borderColor: 'green',color: 'green'}},
        type: 'line',
        data: temp,
      }, 
      {
        name: 'Pre6min',
        smooth: true,
        connectNulls: true,
        symbolSize: 0,
        lineStyle: {normal: {color: 'blue',width: 1,type: 'dashed'}},//type: 'dashed'
        type: 'line',
        data: mn2t,
      },
      {
        name: 'Pre6max',
        smooth: true,
        connectNulls: true,
        symbolSize: 0,
        lineStyle: {normal: {color: 'red',width: 1,type: 'dashed'}},//type: 'dashed'
        type: 'line',
        data: mx2t,
      },
    ]
  };
    // 使用刚指定的配置项和数据显示图表。
  tempChart.setOption(OptionTemp);
  /**
   * 风
   */
  const windChart = echarts.init(document.getElementById('show-wind'));
  let wind = series[3].map((v,i)=>utils.calWind(v[0],series[4][i][0]));
  let speed = wind.map(v=>v.speed);
  let rotation = wind.map(v=>v.rotation);
  let windData = speed.map((v,i)=>[v,rotation[i],i]);
  let dims = {
    speed:0,
    rotation:1,
    timeIndex:2,
  }
  const optionWind = {
    grid: {
    show:true,
    },
    /* title: {
      text: 'Wind',
    }, */
    tooltip: {
      trigger: 'axis',
    },
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      feature: {
          dataZoom: {
              yAxisIndex: 'none'
          },
          // restore: {},
          //saveAsImage: {}
      }
    },
    dataZoom: [
      {
          show: true,
          realtime: true,
          start: 0,
          end: 60,
      },
      {
          type: 'inside',
          realtime: true,
          start: 0,
          end: 60,
      }
    ],
    legend: {
        data:['w10m'],
    },
    xAxis: {
      type : 'category',
      data: xTime,
      splitLine:{show: true},
      axisLine: {onZero: true},
    },
    yAxis: {
      name:'m/s',
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      },
    },
    series: [
      {
        name: 'w10m',
        type: 'line',
        smooth: true,
        lineStyle: {normal: {width: 2,}},//type: 'dashed'
        itemStyle: {normal: {borderWidth: 1,borderColor: 'black',color: 'black'}},
        data: speed,
      },
      {
      type: 'custom',
      name:'dir',
      renderItem: utils.renderArrow,
      encode: {
        x: dims.timeIndex,
        y: dims.speed,
      },
        data: windData,
        z: 10
      },
    ]
  };
  windChart.setOption(optionWind);
  /**
   * 云
   */
  const cloudChart = echarts.init(document.getElementById('show-cloud'));
  let totalCloud = series[5].map(v=>v[0]*100);
  let lowCloud = series[6].map(v=>v[0]*100);
  const optionCloud = {
    grid: {
    show:true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'shadow'
      }
    },
    toolbox: {
      feature: {
          dataZoom: {
              yAxisIndex: 'none'
          },
          // restore: {},//saveAsImage: {}
      }
    },
    dataZoom: [
      {
          show: true,
          realtime: true,
          start: 0,
          end: 60,
      },
      {
          type: 'inside',
          realtime: true,
          start: 0,
          end: 60,
      }
    ],
    legend: {
        data:['中高云','低云'],
    },
    xAxis: {
      type : 'category',
      data: xTime,
      splitLine:{show: true},
      axisLine: {onZero: true},
    },
    yAxis: {
      name:'%',
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      },
    },
    series: [
      {
        name: '低云',
        type: 'bar',
        stack: '云量',
        data: lowCloud,
      },
      {
        name: '中高云',
        type: 'bar',
        stack: '云量',
        data: totalCloud.map((v,i)=>v-lowCloud[i]),
      },
    ]
  };
  cloudChart.setOption(optionCloud);
  /**
   * 降水
   */
  const preChart = echarts.init(document.getElementById('show-pre'));
  let precipitaion = series[7].map(v=>v[0].toFixed(1));
  //let lowCloud = series[6].map(v=>v[0]);
  const optionPre = {
    grid: {
    show:true,
    },
/*     title: {
      text: 'Wind',
    }, */
    tooltip: {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    toolbox: {
      feature: {
          dataZoom: {
              yAxisIndex: 'none'
          },
      }
    },
    dataZoom: [
      {
          show: true,
          realtime: true,
          start: 0,
          end: 60,
      },
      {
          type: 'inside',
          realtime: true,
          start: 0,
          end: 60,
      }
    ],
    legend: {
        data:['Precipitaion'],
    },
    xAxis: {
      type : 'category',
      data: xTime,
      splitLine:{show: true},
      axisLine: {onZero: true},
    },
    yAxis: {
      name:'mm',
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      },
    },
    series: [
      {
        name: 'Precipitaion',
        type: 'bar',
        stack: 'Rain',
        data: precipitaion,
      },
    ]
  };
  preChart.setOption(optionPre);
}

function createPanel(){
  //-创建面板-//
  const panelWrap = document.createElement("div");
  
  panelWrap.setAttribute("id","helper_panel");
  panelWrap.setAttribute("class","show_panel");

  /* 设置添加JMA*/
  const addJMA = document.createElement('span');
  addJMA.innerHTML = `<div id="show-jma" class="jma-button not-active">显示JMA</div>`;
  panelWrap.appendChild(addJMA);
  addJMA.addEventListener('click', showJMA);
  
  /* 设置添加点选模式*/
  const pointMode = document.createElement('div');
  pointMode.innerHTML = `<span class="jma-button">点选模式</span>`;
  panelWrap.appendChild(pointMode);
  pointMode.addEventListener('click', ()=>toggleSelectMode());
  /* 设置添加点选模式*/
  const compareMode = document.createElement('div');
  compareMode.innerHTML = `<span class="jma-button" id="open-compare">对比</span>`;
  panelWrap.appendChild(compareMode);
  // pointMode.addEventListener('click', ()=>toggleSelectMode());
  /* 设置Lat lon面板*/
  const latLonWarp = document.createElement("span");
  latLonWarp.setAttribute("id","helper_latLon");
  latLonWarp.setAttribute("class","show_latLon");
  latLonWarp.innerHTML = '<span>Lat <span class="fixLoc" id="helper_lat"></span> Lon <span class="fixLoc" id="helper_lon"></span></span>';
  panelWrap.appendChild(latLonWarp);
  //
  const ibody = document.getElementsByTagName("body")[0];
  ibody.appendChild(panelWrap);
  //-------//
  //-注册到全局变量-//
  elemsConfig.latLonInput = {
    lat:document.getElementById('helper_lat'),
    lon:document.getElementById('helper_lon'),
  };
}
// 添加面板样式
function createTlinePanel(){
  //-创建面板-//
  const fragment = document.createDocumentFragment();
  const panelWrap = document.createElement("div");
  
  panelWrap.setAttribute("id","line_panel");
  panelWrap.setAttribute("class","show_panel");
  panelWrap.style.display='none';

  const infoWrap = document.createElement('div');
  infoWrap.setAttribute("id","line_info");
  infoWrap.innerHTML = '纬度:<span></span> 经度:<span></span><span></span>';
  panelWrap.appendChild(infoWrap);
  /* 设置添加temp*/
  const tempWrap = document.createElement('div');
  tempWrap.innerHTML = `温度<div id="show-temp"></div>`;
  panelWrap.appendChild(tempWrap);

  const windWrap = document.createElement('div');
  windWrap.innerHTML = `风MSLP<div id="show-wind"></div>`;
  panelWrap.appendChild(windWrap);

  const preWrap = document.createElement('div');
  preWrap.innerHTML = `降水<div id="show-pre"></div>`;
  panelWrap.appendChild(preWrap);

  const cloudWrap = document.createElement('div');
  cloudWrap.innerHTML = `云量<div id="show-cloud"></div>`;
  panelWrap.appendChild(cloudWrap);
  // tempWrap.addEventListener('click', showJMA);
  
  fragment.appendChild(panelWrap);
  const ibody = document.getElementsByTagName("body")[0];
  ibody.appendChild(fragment);
  //-------//
}

function createSelectModePanel(){
  //-创建面板-//
  const fragment = document.createDocumentFragment();
  const panelWrap = document.createElement("div");
  
  panelWrap.setAttribute("id","select-mode-panel");
  panelWrap.setAttribute("class","show_panel");
  panelWrap.style.display='none';
  /* 设置添加JMA*/
  panelWrap.innerHTML = `快捷键[c] -> 单点时间序列<br>
  [x] -> 垂直探空; 两次[ctrl+x] -> 垂直剖面`;
  
  fragment.appendChild(panelWrap);
  const ibody = document.getElementsByTagName("body")[0];
  ibody.appendChild(fragment);
  //-------//
}


//console.log(compareMode.imgDOM);
// compareMode.forward();

GM_addStyle(`.show_panel{z-index:11;}
  #helper_panel{
      position:absolute; top:5px;left:740px;
      background-color: rgb(45,53,63);
      border-bottom: 0px solid rgb(20,20,20); padding:5px;
      border-bottom: 0px solid rgb(20,20,20);border-radius: 4px;border: 1px solid rgb(22,25,28);
      box-shadow:0 1px 0 rgba(162,184,204,0.25) inset,0 0 4px hsla(0,0%,0%,0.95);
      color: white;}
  .jma-button{
    cursor:pointer;
  }
  #select-mode-panel{
    position:absolute; top:5px;left:450px;
    background-color: rgb(45,53,63);
    border-bottom: 0px solid rgb(20,20,20); padding:5px;
    border-bottom: 0px solid rgb(20,20,20);border-radius: 4px;border: 1px solid rgb(22,25,28);
    box-shadow:0 1px 0 rgba(162,184,204,0.25) inset,0 0 4px hsla(0,0%,0%,0.95);
    color: white;}
    `);
/**暂时隐藏按钮 */
 GM_addStyle(`#helper_latLon .fixLoc{display:inline-block;width:40px;height:15px;overflow:hidden;}`);
//GM_addStyle(`#helper_latLon{display:none;}`);
/**重要添加十字鼠标 */
 // GM_addStyle('#pic_frame div{border:1px solid !important;cursor:crosshair !important;}');
createPanel();
NWP_init();
createTlinePanel();
createSelectModePanel();

//创建对比框
function createComparePanel(){
  const panel = document.createDocumentFragment();
  const mainWrapper = utils.createElement('div',{id:'compare-main',class:'display-none'});
  const controlWrapper = utils.createElement('div',{class:'compare-warpper'});
  controlWrapper.innerHTML = `<div id="compare-backward" class="my-button">step -6</div><div class="my-button" id="compare-foreward">step +6</div>`;
  controlWrapper.innerHTML += `<select id="compare-interval"><option value="48">间隔48小时</option>
  <option selected="selected" value="24">间隔24小时</option>
  <option value="12">间隔12小时</option></select>
  <div id="close-compare" class="my-button">关闭对比</div>
  <span class="info"></span>`;

  const imgWrapper = utils.createElement('div',{class:'compare-img-main'});
  imgWrapper.innerHTML = 
  `<div class="compare-img-wrapper"><img class="compare-img" src=""><div class="compare-img-info">init Time</div></div>
  <div class="compare-img-wrapper"><img class="compare-img" src=""><div class="compare-img-info">init Time</div></div>
  <div class="compare-img-wrapper"><img class="compare-img" src=""><div class="compare-img-info">init Time</div></div>
  <div class="compare-img-wrapper"><img class="compare-img" src=""><div class="compare-img-info">init Time</div></div>`;
  panel.append(mainWrapper);
  mainWrapper.append(controlWrapper,imgWrapper);
  //mainWrapper.append(forewardBut,backwardBut,intervalInput);
  
  document.body.append(panel);
}

function createCompareMode(){
  const compareHandler = {
    set(obj, prop, value,receiver){
      if(prop === 'interval'){
        obj.interval = value;
        receiver.firstImg = obj.firstImg;
        //obj.img[1] = obj.img[0] + value;
        //obj.img[2] = obj.img[0] + value*2;
        //obj.img[3] = obj.img[0] + value*3;
      }else if(prop === 'firstHr'){
        // console.log(obj.imgInfo.toSource());
        // const initURL = obj.imgInfo.url;
        const date = obj.imgInfo.date;
        const initDate = obj.imgInfo.initDate;
        const hour = utils.paddingInt(value,3);
        const url = obj.imgInfo.getUrl(date,hour,initDate)
        receiver.firstImg = url;
        //receiver.interval = obj.interval;
      }else if(prop === 'imgInfo'){
        
        console.log('设置初始图像为:'+value.url);
      }else if(prop === 'firstImg'){
        const imgList = obj.fit2sameday(value);
        // console.log(imgList);
        obj.showInfo(value);
        imgList.forEach((imgSrc,i)=>{
          receiver.img[i] = imgSrc;
        })
        //obj.img[0] = imgList;
        // obj.img[1] = ;
      }
      Reflect.set(obj,prop,value);
    },
  };

  const imgHandler = {
    set(obj, prop, value,receiver){
      console.log(`第${Number(prop)+1}个图像地址为${value}`);
      elemsConfig.compareImgDOM.img[prop].src = value;

      const initTime = moment(utils.getImgNow(value).initDate,'YYYYMMDDHH');
      elemsConfig.compareImgDOM.info[prop].innerHTML = 
        `initTime: ${initTime.format('MM-DD HH')} UTC`;
      //console.log(value);
      //let imgDom = document.querySelectorAll('.compare .imgSrc');
      //imgDom[prop].src = value; 
      Reflect.set(obj,prop,value);
    },
  };
  let imgSrc = new Proxy([1,2,3,4], imgHandler);
  const modeProto = {
    img:imgSrc,
    firstImg:'',
    interval:24,
    foreward(step=6){
      this.firstHr = this.firstHr + step;
      console.log('步进');
    },
    backward(step=6){
      if(this.firstHr - step>=0){
        this.firstHr = this.firstHr - step;
      }else{
        alert('不能再退了');
      }
    },
    firstHr:1,
    urlMode(base='http://10.148'){
      let url = base;
      return url;
    },
    initIMG(){
      let DOMs = document.querySelectorAll('.compare-img');
      let imgDOM = [];
      for(let img of DOMs){
        imgDOM.push(img);
      };
      elemsConfig.compareImgDOM.img = imgDOM;

      let infoDOMs = document.querySelectorAll('.compare-img-info');
      let infoList = [];
      for(let ele of infoDOMs){
        infoList.push(ele);
      };
      elemsConfig.compareImgDOM.info = infoList;
      //return imgDOM;
    },
    imgInfo:{},
    openCompare(){
      const wrapper = document.getElementById('compare-main');
      //if(wrapper.classList.contains('display-none')) wrapper.classList.remove('display-none')
      wrapper.classList.remove('display-none');
      try{
        this.imgInfo = utils.getImgNow();
        this.firstHr = Number.parseInt(this.imgInfo.hour);
      }catch(err){
        alert(err.message);
        console.error(err);
      }
    },
    closeCompare(){
      const wrapper = document.getElementById('compare-main');
      //if(wrapper.classList.contains('display-none')) wrapper.classList.remove('display-none')
      wrapper.classList.add('display-none');
      // this.imgInfo = utils.getImgNow();
    },
    fit2sameday(firstImg){
      const interval = this.interval;
      const firstInfo = utils.getImgNow(firstImg);
      // console.log(firstImg);
      // console.log(firstInfo);
      const imgList = [firstImg];
      const iniTime = moment(firstInfo.initDate,'YYYYMMDDHH');
      for (let i = 1; i < 4; i++){
        const fitTime = moment(iniTime).add(-1*interval*i,'hours');
        const iDate = moment(fitTime).format('YYYYMMDD');
        const iInit = moment(fitTime).format('YYYYMMDDHH');
        const hour = Number.parseInt(firstInfo.hour)+interval*i;
        // console.log('预报时效'+hour);
        const iHour = utils.paddingInt(hour,3);
        const url = firstInfo.getUrl(iDate,iHour,iInit);
        imgList.push(url);
      }
      return imgList;
    },
    changeInterval(evt){
      this.interval = Number.parseInt(evt.target.value);
      console.log(evt);
    },
    showInfo(img){
      const controlInfo = document.querySelector('.compare-warpper .info');
      const imgInfo = utils.getImgNow(img);
      const nowTime = moment(imgInfo.initDate,'YYYYMMDDHH').add(Number.parseInt(imgInfo.hour)+8,'hours');
      controlInfo.innerHTML = ' UTC+8 '+ nowTime.format('YYYY年MM月DD日HH时');
      controlInfo.innerHTML += ' | GMT'+ nowTime.add(-8,'hours').format('YYYY-MM-DD HH:00');
    },
  };
  
  const compareMode = new Proxy(modeProto,compareHandler);
  return compareMode;
}

createComparePanel();//创建对比DOM框架
const compareMode = createCompareMode();
compareMode.hook = function(selector='', listener='',callback=()=>{},bindObj=compareMode) {
  var targetEle = document.querySelector(selector);
  targetEle.addEventListener(listener,()=>callback.call(bindObj),false);
};
compareMode.hook('#compare-backward','click',compareMode.backward,compareMode);
compareMode.hook('#compare-foreward','click',compareMode.foreward,compareMode);
compareMode.hook('#open-compare','click',compareMode.openCompare,compareMode);
compareMode.hook('#close-compare','click',compareMode.closeCompare,compareMode);
//compareMode.hook('#compare-interval','change',(evt)=>compareMode.changeInterval(evt),compareMode);
document.getElementById('compare-interval').addEventListener('change',(evt)=>compareMode.changeInterval(evt));

compareMode.initIMG();
//compareMode.imgInfo = utils.getImgNow();


GM_addStyle(`
#line_panel {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #f5f5f5;
  border-bottom: 0px solid rgb(20, 20, 20);
  padding: 5px;
  border-radius: 4px;
  border: 1px solid rgb(22, 25, 28);
  box-shadow: 0 1px 0 rgba(162, 184, 204, 0.25) inset, 0 0 4px hsla(0, 0%, 0%, 0.95);
  color: black;
  width: 0px;
}
#show-temp,#show-wind,#show-pre,#show-cloud{
  width: 100%;
  height:250px;
}
#show-pre{
  display:none;
}
.full-screen-mode{
  float:left;
  padding-left:10px;
}
.full-screen-mode #float_icons{
  display:none!important;
}
.full-screen-mode #pic_frame div{
  border:1px solid !important;cursor:crosshair !important;
}
#helper_panel div{
  display:inline-block;
  margin-left:5px;
  margin-right:5px;
  padding:2px;
  border: 1px solid white;
}
#helper_panel div:hover{
  background-color:orange;
}
#compare-main{
  z-index:12;
  position:absolute;
  top:1%;
  right:1%;
  bottom:1%;
  left:1%;
  border:solid 1px;
  background-color:white;
}
#float_icons{
  display:none!important;
}
.compare-warpper {
  display: flex;
  justify-content: center;
}
.compare-img-main {
  border: 1px dotted red;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.compare-img-main .compare-img-wrapper {
  border: 2px solid blue;
  overflow: hidden;
  position:relative;
}
.compare-img-main .compare-img {
  border: 2px solid yellow;
  position: relative;
  top: -50px;
  height: 120%;
}
.my-button{
  cursor:pointer;
  margin-left:2px;
  margin-right:2px;
  padding:1px;
  background-color: rgb(45,53,63);
  border-bottom: 0px solid rgb(20,20,20); padding:5px;
  border-bottom: 0px solid rgb(20,20,20);border-radius: 4px;border: 1px solid rgb(22,25,28);
  box-shadow:0 1px 0 rgba(162,184,204,0.25) inset,0 0 4px hsla(0,0%,0%,0.95);
  color: white;
}
.my-button:hover{
  background-color:orange;
}
.display-none{
  display:none!important;
}
.compare-img-info {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 152, 50, 0.7);
  color: white;
  padding:2px;
  font-size:20px;
}
`)
