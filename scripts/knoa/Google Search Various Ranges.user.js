// ==UserScript==
// @name        Google Search Various Ranges
// @name:ja     Google Search Various Ranges
// @namespace   knoa.jp
// @description Add more time ranges on Google search.
// @description:ja Google検索の期間指定の選択肢を増やします。
// @include     https://www.google.*/search?*
// @version     1.3
// @grant       none
// ==/UserScript==

(function(){
  const SCRIPTNAME = 'GoogleSearchVariousRanges';
  const DEBUG = false;/**/
  if(window === top) console.time(SCRIPTNAME);
  const LANGS = ['en', 'ja', 'fr', 'ru', 'zh', 'es', 'ar'];
  const RANGES = {
    qdr_h: {
      h:  ["Past hour",     "1 時間以内",  "Moins d'une heure",   "За час",      "过去 1 小时内",  "Última hora",       "آخر ساعة"],
      h2: ["Past 2 hours",  "2 時間以内",  "Moins de 2 heures",   "За 2 часа",   "过去 2 小时内",  "Últimas 2 horas",   "آخر ساعتين"],
      h12:["Past 12 hours", "12 時間以内", "Moins de 12 heures",  "За 12 часов", "过去 12 小时内", "Últimas 12 horas",  "آخر ١٢ ساعة"],
    },
    qdr_d: {
      d:  ["Past day",      "1 日以内",    "Moins d'un jour",     "За 1 дня",    "过去 1 天内",    "Último 1 día",      "آخر 24 ساعة"],
      d2: ["Past 2 days",   "2 日以内",    "Moins de 2 jours",    "За 2 дня",    "过去 2 天内",    "Últimos 2 días",    "آخر يومين"],
      d3: ["Past 3 days",   "3 日以内",    "Moins de 3 jours",    "За 3 дня",    "过去 3 天内",    "Últimos 3 días",    "آخر ٣ أيام"],
    },
    qdr_w: {
      w:  ["Past week",     "1 週間以内",  "Moins d'une semaine", "За неделю",   "过去 1 周内",    "Última semana",     "آخر أسبوع"],
      w2: ["Past 2 weeks",  "2 週間以内",  "Moins de 2 semaines", "За 2 недели", "过去 2 周内",    "Últimas 2 semanas", "آخر أسبوعين"],
    },
    qdr_m: {
      m:  ["Past month",    "1 か月以内",  "Moins d'un mois",     "За месяц",    "过去 1 个月内",  "Último mes",        "آخر شهر"],
      m2: ["Past 2 months", "2 か月以内",  "Moins de 2 mois",     "За 2 месяца", "过去 2 个月内",  "Últimos 2 meses",   "آخر شهرين"],
      m6: ["Past 6 months", "6 か月以内",  "Moins de 6 mois",     "За 6 месяца", "过去 6 个月内",  "Últimos 6 meses",   "آخر ٦ شهور"],
    },
    qdr_y: {
      y:  ["Past year",     "1 年以内",    "Moins d'une an",      "За год",      "过去 1 年内",    "Último año",        "آخر سنة"],
      y2: ["Past 2 years",  "2 年以内",    "Moins de 2 ans",      "За 2 года",   "过去 2 年内",    "Últimos 2 años",    "آخر سنتين"],
      y5: ["Past 5 years",  "5 年以内",    "Moins de 5 ans",      "За 5 года",   "过去 5 年内",    "Últimos 5 años",    "آخر ٥ سنوات"],
    },
  };
  const PERIODS = [
    // You can edit or add below.
    //{
    //  "in '90s": ['1/1/1990', '12/31/1999'],
    //  "in '00s": ['1/1/2000', '12/31/2009'],
    //  "in '10s": ['1/1/2010', '12/31/2019'],
    //},
    //{
    //  "Before 2000": ['', '12/31/1999'],
    //  "After 2000" : ['1/1/2000', ''],
    //},
  ];
  const PADDING = 30 + 44;/*default left+right padding size of each range items*/
  let globals = {};
  let core = {
    initialize: function(){
      window.addEventListener('load', setTimeout.bind(null, function(){
        globals.ul = document.querySelector('#qdr_').parentNode;
        globals.a = globals.ul.querySelector('li[id^="qdr_"] a[href*="qdr:"]');
        /* for calculating width */
        globals.ul.style.visibility = 'hidden';
        globals.ul.style.display = 'block';
        globals.maxwidth = 0;
        /* DOM operations */
        core.rebuildRanges();
        core.addCustomPeriods();
        core.replaceSelectedCheckmark();
        core.addStyle();
        /* restore */
        globals.ul.style.visibility = '';
        globals.ul.style.display = '';
      }, 100));
    },
    rebuildRanges: function(){
      let lang = document.documentElement.lang.split('-')[0];
      let lindex = (LANGS.includes(lang)) ? LANGS.indexOf(lang) : 0;
      let lis = globals.ul.querySelectorAll('li[id^="qdr_"]');
      for(let i=1; lis[i]; i++){
        if(RANGES[lis[i].id]){
          lis[i].innerHTML = '';
          for(let range in RANGES[lis[i].id]){
            let a = globals.a.cloneNode(true);
            a.href = a.href.replace(/(qdr:)[a-z][0-9]*/, '$1' + range);
            a.textContent = RANGES[lis[i].id][range][lindex];
            lis[i].appendChild(a);
            if(globals.maxwidth < a.offsetWidth) globals.maxwidth = a.offsetWidth;
          }
        }else{
          lis[i].style.display = 'none';
        }
      }
    },
    addCustomPeriods: function(){
      let cdr = globals.ul.querySelector('#cdrlnk');/*Custom range...*/
      for(let i = 0; PERIODS[i]; i++){
        let line = document.createElement('div');
        for(let key in PERIODS[i]){
          let a = globals.a.cloneNode(true);
          a.href = a.href.replace(/(qdr:)[a-z][0-9]*/, `cdr:1,cd_min:${PERIODS[i][key][0]},cd_max:${PERIODS[i][key][1]}`);
          a.textContent = key;
          line.appendChild(a);
          if(globals.maxwidth < a.offsetWidth) globals.maxwidth = a.offsetWidth;
        }
        cdr.parentNode.appendChild(line);
      }
    },
    replaceSelectedCheckmark: function(){
      let sel = globals.ul.querySelector('li[id*="dr_"].hdtbSel');
      if(sel && sel.id !== 'qdr_'/*Any time*/){
        let a, cdruri = location.href.match(/cdr:1,cd_min:[0-9\/]*,cd_max:[0-9\/]*/);
        if(cdruri){/*has period*/
          a = globals.ul.querySelector(`li[id^="cdr_"] a[href*="${cdruri[0]}"]`);
        }else{
          let qdr = sel.id.split('_')[1];
          a = globals.ul.querySelector(`li[id^="qdr_"] a[href*="qdr:${qdr}&"]`);
        }
        if(a){
          a.classList.add('hdtbSel');
          sel.classList.remove('hdtbSel');
        }
      }
    },
    addStyle: function(){
      (function(css){
        let head = document.querySelector('head');
        let style = document.createElement('style');
        style.type = 'text/css';
        style.textContent = css;
        head.appendChild(style);
      })(`
        #hdtb li[id^="qdr_"].hdtbItm a,
        #hdtb li[id^="cdr_"].hdtbItm a{
          display: inline-block !important;
          width: ${globals.maxwidth - PADDING}px !important;
          padding-right: 20px !important;
        }
      `);
    },
  };
  let log = (DEBUG) ? console.log.bind(null, SCRIPTNAME + ':') : function(){};
  core.initialize();
  if(window === top) console.timeEnd(SCRIPTNAME);
})();
