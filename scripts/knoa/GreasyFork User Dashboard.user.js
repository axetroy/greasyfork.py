// ==UserScript==
// @name        GreasyFork User Dashboard
// @name:ja     GreasyFork User Dashboard
// @namespace   knoa.jp
// @description It redesigns user pages to improve the browsability.
// @description:ja 一覧性に優れた新しいユーザーページを提供します。
// @include     https://greasyfork.org/*/users/*
// @version     1.3.0
// @grant       none
// ==/UserScript==

(function(){
  const SCRIPTNAME = 'GreasyForkUserDashboard';
  const DEBUG = false;/*
    [update] 
    
    [bug]

    [to do]

    [possible]
    3カラムのレイアウト崩れる(スクリプト未使用でも発生する)
    グラフ数字の日付追加時くるりんぱは位置がズレるので労力に見合わないか

    [not to do]
  */
  if(window === top && console.time) console.time(SCRIPTNAME);
  const INTERVAL = 1000;/* for fetch */
  const DRAWINGDELAY = 125;/* for drawing each charts */
  const UPDATELINKTEXT = '+';/* for update link text */
  const DEFAULTMAX = 10;/* for chart scale */
  const DAYS = 180;/* for chart length */
  const STATSUPDATE = 1000*60*60;/* stats update interval of greasyfork.org */
  const TRANSLATIONEXPIRE = 1000*60*60*24*30;/* cache time for translations */
  const STATSEXPIRE = 1000*60*60*24*10;/* cache time for stats */
  const EASING = 'cubic-bezier(0,.75,.5,1)';/* quick easing */
  let site = {
    targets: {
      userSection: () => $('body > header + div > section:nth-of-type(1)'),
      userName: () => $('body > header + div > section:nth-of-type(1) > h2'),
      userProfile: () => $('#user-profile'),
      controlPanel: () => $('#control-panel'),
      newScriptSetLink: () => $('a[href$="/sets/new"]'),
      discussionList: () => $('ul.discussion-list'),
      scriptSets: () => $('body > header + div > section:nth-of-type(2)'),
      scripts: () => $('body > header + div > div:nth-of-type(1)'),
      userScriptSets: () => $('#user-script-sets'),
      userScriptList: () => $('#user-script-list'),
    },
    get: {
      language: (d) => d.documentElement.lang,
      firstScript: (list) => list.querySelector('li h2 > a'),
      translation: (d, t) => {
        let es = {
          info:        d.querySelector('#script-links > li.current'),
          code:        d.querySelector('#script-links > li > a[href$="/code"]'),
          history:     d.querySelector('#script-links > li > a[href$="/versions"]'),
          feedback:    d.querySelector('#script-links > li > a[href$="/feedback"]'),
          stats:       d.querySelector('#script-links > li > a[href$="/stats"]'),
          derivatives: d.querySelector('#script-links > li > a[href$="/derivatives"]'),
          update:      d.querySelector('#script-links > li > a[href$="/versions/new"]'),
          delete:      d.querySelector('#script-links > li > a[href$="/delete"]'),
          admin:       d.querySelector('#script-links > li > a[href$="/admin"]'),
          version:     d.querySelector('#script-stats > dt.script-show-version'),
        }
        Object.keys(es).forEach((key) => t[key] = es[key] ? es[key].textContent : t[key]);
        t.feedback = t.feedback.replace(/\s\(\d+\)/, '');
        return t;
      },
      translationOnStats: (d, t) => {
        t.installs     = d.querySelector('table.stats-table > thead > tr > th:nth-child(2)').textContent || t.installs;
        t.updateChecks = d.querySelector('table.stats-table > thead > tr > th:nth-child(3)').textContent || t.updateChecks;
        return t;
      },
      props: (li) => {return {
        name: li.querySelector('h2 > a'),
        description: li.querySelector('.description'),
        stats: li.querySelector('dl.inline-script-stats'),
        dailyInstalls: li.querySelector('dd.script-list-daily-installs'),
        totalInstalls: li.querySelector('dd.script-list-total-installs'),
        ratings: li.querySelector('dd.script-list-ratings'),
        createdDate: li.querySelector('dd.script-list-created-date'),
        updatedDate: li.querySelector('dd.script-list-updated-date'),
        scriptVersion: li.dataset.scriptVersion,
      }},
      scriptUrl: (li) => li.querySelector('h2 > a').href,
    },
  };
  const DEFAULTTRANSLATION = {
    info:         'Info',
    code:         'Code',
    history:      'History',
    feedback:     'Feedback',
    stats:        'Stats',
    derivatives:  'Derivatives',
    update:       'Update',
    delete:       'Delete',
    admin:        'Admin',
    version:      'Version',
    installs:     'Installs',
    updateChecks: 'Update checks',
    scriptSets:   'Script Sets',
    scripts:      'Scripts',
  };
  let translation = {};
  let elements = {}, storages = {}, timers = {};
  let core = {
    initialize: function(){
      core.getElements();
      core.read();
      core.clearOldData();
      core.addStyle();
      core.prepareTranslations();
      core.hideUserSection();
      core.hideProfile();
      core.hideControlPanel();
      core.addTabNavigation();
      core.addNewScriptSetLink();
      core.rebuildScriptList();
      core.addChartSwitcher();
    },
    getElements: function(){
      for(let i = 0, keys = Object.keys(site.targets); keys[i]; i++){
        let element = site.targets[keys[i]]();
        if(!element) log(`Not found: ${keys[i]}`);
        else{
          element.dataset.selector = keys[i];
          elements[keys[i]] = element;
        }
      }
    },
    read: function(){
      storages.translations = Storage.read('translations') || {};
      storages.shown = Storage.read('shown') || {};
      storages.stats = Storage.read('stats') || {};
      storages.chartKey = Storage.read('chartKey') || 'updateChecks';
    },
    clearOldData: function(){
      let now = Date.now();
      Object.keys(storages.stats).forEach((key) => {
        if(storages.stats[key].updated < now - STATSEXPIRE) delete storages.stats[key];
      });
      Storage.save('stats', storages.stats);
    },
    prepareTranslations: function(){
      let language = site.get.language(document);
      translation = storages.translations[language] || DEFAULTTRANSLATION;
      if(!Object.keys(DEFAULTTRANSLATION).every((key) => translation[key])){/* some change in translation keys */
        Object.keys(DEFAULTTRANSLATION).forEach((key) => translation[key] = translation[key] || DEFAULTTRANSLATION[key]);
        core.getTranslations();
      }else{
        if(site.get.language(document) === 'en') return;
        if(Date.now() < (Storage.saved('translations') || 0) + TRANSLATIONEXPIRE) return;
        core.getTranslations();
      }
    },
    getTranslations: function(){
      let firstScript = site.get.firstScript(elements.userScriptList);
      fetch(firstScript.href, {credentials: 'include'})
        .then(response => response.text())
        .then(text => new DOMParser().parseFromString(text, 'text/html'))
        .then(d => translation = storages.translations[site.get.language(d)] = site.get.translation(d, translation))
        .then(() => wait(INTERVAL))
        .then(() => fetch(firstScript.href + '/stats'))
        .then(response => response.text())
        .then(text => new DOMParser().parseFromString(text, 'text/html'))
        .then(d => {
          translation = storages.translations[site.get.language(d)] = site.get.translationOnStats(d, translation);
          Storage.save('translations', storages.translations);
        });
    },
    hideUserSection: function(){
      if(!elements.userProfile && !elements.discussionList && !elements.controlPanel) return;/* thin enough */
      let userSection = elements.userSection, more = createElement(core.html.more());
      if(!storages.shown.userSection) userSection.classList.add('hidden');
      more.addEventListener('click', function(e){
        userSection.classList.toggle('hidden');
        storages.shown.userSection = !userSection.classList.contains('hidden');
        Storage.save('shown', storages.shown);
      });
      userSection.appendChild(more);
    },
    hideProfile: function(){
      /* use userName.hidden instead of userProfile.hidden for CSS */
      let controlPanel = elements.controlPanel, userName = elements.userName, userProfile = elements.userProfile;
      if(!controlPanel) return;/* may not be own user page */
      if(!userProfile) return;/* no profile text */
      let more = createElement(core.html.more());
      if(!storages.shown.userProfile) userName.classList.add('hidden');
      more.addEventListener('click', function(e){
        userName.classList.toggle('hidden');
        storages.shown.userProfile = !userName.classList.contains('hidden');
        Storage.save('shown', storages.shown);
      });
      userName.appendChild(more);
    },
    hideControlPanel: function(){
      let controlPanel = elements.controlPanel;
      if(!controlPanel) return;/* may be not own user page */
      document.documentElement.dataset.owner = 'true';/* user owner flag */
      let header = controlPanel.firstElementChild;
      if(!storages.shown.controlPanel) controlPanel.classList.add('hidden');
      setTimeout(function(){elements.userSection.style.minHeight = controlPanel.offsetHeight + controlPanel.offsetTop + 'px'}, 250);/* needs delay */
      header.addEventListener('click', function(e){
        controlPanel.classList.toggle('hidden');
        storages.shown.controlPanel = !controlPanel.classList.contains('hidden');
        Storage.save('shown', storages.shown);
        elements.userSection.style.minHeight = controlPanel.offsetHeight + controlPanel.offsetTop + 'px';
      });
    },
    addTabNavigation: function(){
      let scriptSets = elements.scriptSets, scripts = elements.scripts;
      let userScriptSets = elements.userScriptSets, userScriptList = elements.userScriptList;
      const keys = [{
        label: scriptSets ? scriptSets.querySelector('header').textContent : translation.scriptSets,
        selector: 'scriptSets',
        count: userScriptSets ? userScriptSets.children.length : 0,
      }, {
        label: scripts ? scripts.querySelector('header').textContent : translation.scripts,
        selector: 'scripts',
        count: userScriptList ? userScriptList.children.length : 0,
        selected: true
      }];
      let nav = createElement(core.html.tabNavigation()), anchor = (scriptSets || scripts);
      let template = nav.querySelector('li.template');
      if(anchor) anchor.parentNode.insertBefore(nav, anchor);
      for(let i = 0; keys[i]; i++){
        let li = template.cloneNode(true);
        li.classList.remove('template');
        li.textContent = keys[i].label + ` (${keys[i].count})`;
        li.dataset.target = keys[i].selector;
        li.dataset.count = keys[i].count;
        li.addEventListener('click', function(e){
          /* close tab */
          li.parentNode.querySelector('[data-selected="true"]').dataset.selected = 'false';
          let openedTarget = $('[data-tabified][data-selected="true"]');
          if(openedTarget) openedTarget.dataset.selected = 'false';
          /* open tab */
          li.dataset.selected = 'true';
          let openingTarget = $(`[data-selector="${li.dataset.target}"]`);
          if(openingTarget) openingTarget.dataset.selected = 'true';
        });
        let target = elements[keys[i].selector];
        if(target){
          target.dataset.tabified = 'true';
          if(keys[i].selected) li.dataset.selected = target.dataset.selected = 'true';
          else li.dataset.selected = target.dataset.selected = 'false';
        }else{
          if(keys[i].selected) li.dataset.selected = 'true';
          else li.dataset.selected = 'false';
        }
        template.parentNode.insertBefore(li, template);
      }
    },
    addNewScriptSetLink: function(){
      let newScriptSetLink = elements.newScriptSetLink;
      if(!newScriptSetLink) return;/* may be not own user page */
      let link = newScriptSetLink.cloneNode(true), list = elements.userScriptSets, li = document.createElement('li');
      li.appendChild(link);
      list.appendChild(li);
    },
    rebuildScriptList: function(){
      if(!elements.userScriptList) return;
      for(let i = 0, list = elements.userScriptList, li; li = list.children[i]; i++){
        let more = createElement(core.html.more()), props = site.get.props(li), key = li.dataset.scriptName, isLibrary = li.dataset.scriptType === 'library';
        if(!storages.shown[key]) li.classList.add('hidden');
        more.addEventListener('click', function(e){
          li.classList.toggle('hidden');
          if(li.classList.contains('hidden')) delete storages.shown[key];/* prevent from getting fat storage */
          else storages.shown[key] = true;
          Storage.save('shown', storages.shown);
        });
        li.dataset.scriptUrl = props.name.href;
        li.appendChild(more);
        if(isLibrary) continue;/* not so critical to skip below by continue */
        /* attatch titles */
        props.dailyInstalls.previousElementSibling.title = props.dailyInstalls.previousElementSibling.textContent;
        props.totalInstalls.previousElementSibling.title = props.totalInstalls.previousElementSibling.textContent;
        props.ratings.previousElementSibling.title       = props.ratings.previousElementSibling.textContent;
        props.createdDate.previousElementSibling.title   = props.createdDate.previousElementSibling.textContent;
        props.updatedDate.previousElementSibling.title   = props.updatedDate.previousElementSibling.textContent;
        /* wrap the description to make it an inline element */
        let span = document.createElement('span');
        span.textContent = props.description.textContent.trim();
        props.description.replaceChild(span, props.description.firstChild);
        /* Link to Code */
        let versionLabel = createElement(core.html.dt('script-list-version', translation.version));
        let versionDd = createElement(core.html.ddLink('script-list-version', props.scriptVersion, props.name.href + '/code', translation.code));
        versionLabel.title = versionLabel.textContent;
        props.stats.insertBefore(versionLabel, props.createdDate.previousElementSibling);
        props.stats.insertBefore(versionDd, props.createdDate.previousElementSibling);
        /* Link to Version up */
        if(elements.controlPanel){
          let updateLink = document.createElement('a');
          updateLink.href = props.name.href + '/versions/new';
          updateLink.textContent = UPDATELINKTEXT;
          updateLink.title = translation.update;
          updateLink.classList.add('update');
          versionDd.appendChild(updateLink);
        }
        /* Link to Stats from Total installs */
        let statsDd = createElement(core.html.ddLink('script-list-total-installs', props.totalInstalls.textContent, props.name.href + '/stats', translation.stats));
        props.stats.replaceChild(statsDd, props.totalInstalls);
        /* Link to History from Updated date */
        let historyDd = createElement(core.html.ddLink('script-list-updated-date', props.updatedDate.textContent, props.name.href + '/versions', translation.history));
        props.stats.replaceChild(historyDd, props.updatedDate);
      }
    },
    addChartSwitcher: function(){
      let userScriptList = elements.userScriptList;
      if(!userScriptList) return;
      const keys = [
        {label: translation.installs,     selector: 'installs'},
        {label: translation.updateChecks, selector: 'updateChecks'},
      ];
      let nav = createElement(core.html.chartSwitcher());
      let template = nav.querySelector('li.template');
      userScriptList.parentNode.appendChild(nav);/* less affected on dom */
      for(let i = 0; keys[i]; i++){
        let li = template.cloneNode(true);
        li.classList.remove('template');
        li.textContent = keys[i].label;
        li.dataset.key = keys[i].selector;
        li.addEventListener('click', function(e){
          li.parentNode.querySelector('[data-selected="true"]').dataset.selected = 'false';
          li.dataset.selected = 'true';
          storages.chartKey = li.dataset.key;
          Storage.save('chartKey', storages.chartKey);
          core.drawCharts();
        });
        if(keys[i].selector === storages.chartKey) li.dataset.selected = 'true';
        else li.dataset.selected = 'false';
        template.parentNode.insertBefore(li, template);
      }
      core.drawCharts();
    },
    drawCharts: function(){
      let promises = [];
      if(timers.charts && timers.charts.length) timers.charts.forEach((id) => clearTimeout(id));/* stop all the former timers */
      timers.charts = [];
      for(let i = 0, list = elements.userScriptList, li; li = list.children[i]; i++){
        if(li.dataset.scriptType === 'library') continue;
        /* Draw chart of daily update checks */
        let chart = li.querySelector('.chart') || createElement(core.html.chart()), key = li.dataset.scriptName;
        if(storages.stats[key] && storages.stats[key].data){
          timers.charts[i] = setTimeout(function(){
            core.drawChart(chart, storages.stats[key].data.slice(-DAYS));
            if(!chart.isConnected) li.appendChild(chart);
          }, i * DRAWINGDELAY);/* CPU friendly */
        }
        let now = Date.now(), updated = (storages.stats[key]) ? storages.stats[key].updated || 0 : 0, past = updated % STATSUPDATE, expire = updated - past + STATSUPDATE;
        if(now < expire) continue;/* still up-to-date */
        promises.push(new Promise(function(resolve, reject){
          timers.charts[i] = setTimeout(function(){
            fetch(li.dataset.scriptUrl + '/stats.csv', {credentials: 'include'}/* for sensitive scripts */)/* less file size than json */
              .then(response => response.text())
              .then(csv => {
                let lines = csv.split('\n');
                lines = lines.slice(1, -1);/* cut the labels + blank line */
                storages.stats[key] = {data: [], updated: now};
                for(let i = 0; lines[i]; i++){
                  let p = lines[i].split(',');
                  storages.stats[key].data[i] = {
                    date: p[0],
                    installs: parseInt(p[1]),
                    updateChecks: parseInt(p[2]),
                  };
                }
                core.drawChart(chart, storages.stats[key].data.slice(-DAYS));
                if(!chart.isConnected) li.appendChild(chart);
                resolve();
              });
          }, i * INTERVAL);/* server friendly */
        }));
      }
      if(promises.length) Promise.all(promises).then((values) => Storage.save('stats', storages.stats));
    },
    drawChart: function(chart, stats){
      let dl = chart.querySelector('dl'), dt = dl.querySelector('dt.template'), dd = dl.querySelector('dd.template'), hasBars = (2 < dl.children.length);
      let chartKey = storages.chartKey, max = Math.max(DEFAULTMAX, ...stats.map(s => s[chartKey]));
      for(let i = last = stats.length - 1; stats[i]; i--){/* from last */
        let date = stats[i].date, count = stats[i][chartKey];
        let dateDt = dl.querySelector(`dt[data-date="${date}"]`) || dt.cloneNode();
        let countDd = dateDt.nextElementSibling || dd.cloneNode();
        if(!dateDt.isConnected){
          dateDt.classList.remove('template');
          countDd.classList.remove('template');
          dateDt.dataset.date = dateDt.textContent = date;
          if(hasBars){
            countDd.style.width = '0px';
            dl.insertBefore(dateDt, (i === last) ? dl.lastElementChild.previousElementSibling : dl.querySelector(`dt[data-date="${stats[i + 1].date}"]`));
          }else{
            dl.insertBefore(dateDt, dl.firstElementChild);
          }
          dl.insertBefore(countDd, dateDt.nextElementSibling);
        }else{
          if(dl.dataset.chartKey === chartKey && dl.dataset.max === max && countDd.dataset.count === count && i < last) break;/* it doesn't need update any more. */
        }
        countDd.title = date + ': ' + count;
        countDd.dataset.count = count;
        if(i === last - 1){
          let label = countDd.querySelector('span') || document.createElement('span');
          label.textContent = toMetric(count);
          if(!label.isConnected) countDd.appendChild(label);
        }
      }
      dl.dataset.chartKey = chartKey, dl.dataset.max = max;
      /* for animation */
      animate(function(){
        for(let i = 0, dds = dl.querySelectorAll('dd.count:not(.template)'), dd; dd = dds[i]; i++){
          dd.style.height = ((dd.dataset.count / max) * 100) + '%';
          if(hasBars) dd.style.width = '';
        }
      });
    },
    addStyle: function(name = 'style'){
      let style = createElement(core.html[name]());
      document.head.appendChild(style);
      if(elements[name] && elements[name].isConnected) document.head.removeChild(elements[name]);
      elements[name] = style;
    },
    html: {
      more: () => `
        <button class="more"></button>
      `,
      tabNavigation: () => `
        <nav id="tabNavigation">
          <ul>
            <li class="template"></li>
          </ul>
        </nav>
      `,
      chartSwitcher: () => `
        <nav id="chartSwitcher">
          <ul>
            <li class="template"></li>
          </ul>
        </nav>
      `,
      dt: (className, textContent) => `
        <dt class="${className}"><span>${textContent}</span></dt>
      `,
      ddLink: (className, textContent, href, title) => `
        <dd class="${className}"><a href="${href}" title="${title}">${textContent}</a></dd>
      `,
      chart: () => `
        <div class="chart">
          <dl>
            <dt class="template date"></dt>
            <dd class="template count"></dd>
          </dl>
        </div>
      `,
      style: () => `
        <style type="text/css">
          /* red scale: 103-206 */
          /* gray scale: 119-153-187-221 */
          /* coommon */
          h2, h3{
            margin: 0;
          }
          ul, ol{
            margin: 0;
            padding: 0 0 0 2em;
          }
          a:hover,
          a:focus{
            color: rgb(206,0,0);
          }
          .template{
            display: none !important;
          }
          section.text-content{
            position: relative;
            padding: 0;
          }
          section.text-content > *{
            margin: 14px;
          }
          section.text-content h2{
            text-align: left !important;
            margin-bottom: 0;
          }
          section > header + *{
            margin: 0 0 14px !important;
          }
          button.more{
            color: rgb(153,153,153);
            border: 1px solid rgb(187,187,187);
            background: white;
            padding: 0;
            cursor: pointer;
          }
          button.more::-moz-focus-inner{
            border: none;
          }
          button.more::after{
            font-size: medium;
            content: "▴";
          }
          .hidden > button.more{
            background: rgb(221, 221, 221);
          }
          .hidden > button.more::after{
            content: "▾";
          }
          /* User panel */
          section[data-selector="userSection"] > h2:only-child{
            margin-bottom: 14px;/* no content in user panel */
          }
          section[data-selector="userSection"].hidden{
            min-height: 5em;
            max-height: 10em;
            overflow: hidden;
          }
          section[data-selector="userSection"] > button.more{
            position: relative;
            bottom: 0;
            width: 100%;
            margin: 0;
            border: none;
            border-top: 1px solid rgba(187, 187, 187);
            border-radius: 0 0 5px 5px;
          }
          section[data-selector="userSection"].hidden > button.more{
            position: absolute;
          }
          /* User Name + Profile */
          h2[data-selector="userName"]{
            display: flex;
            align-items: center;
          }
          h2[data-selector="userName"] > button.more{
            background: rgb(242, 229, 229);
            border: 1px solid rgb(230, 221, 214);
            border-radius: 5px;
            padding: 0 .5em;
            margin: 0 .5em;
          }
          h2[data-selector="userName"].hidden + [data-selector="userProfile"]{
            display: none;
          }
          /* Control panel */
          section#control-panel{
            font-size: smaller;
            width: 200px;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1;
          }
          section#control-panel h3{
            font-size: 1em;
            padding: .25em 1em;
            border-radius: 5px 5px 0 0;
            background: rgb(103, 0, 0);
            color: white;
            cursor: pointer;
          }
          section#control-panel.hidden h3{
            border-radius: 5px 5px 5px 5px;
          }
          section#control-panel h3::after{
            content: " ▴";
            margin-left: .25em;
          }
          section#control-panel.hidden h3::after{
            content: " ▾";
          }
          ul#user-control-panel{
            list-style-type: square;
            color: rgb(187, 187, 187);
            width: 100%;
            margin: .5em 0;
            padding: .5em .5em .5em 1.5em;
            -webkit-padding-start: 25px;/* ajustment for Chrome */
            background: white;
            border-radius: 0 0 5px 5px;
            border: 1px solid rgb(187, 187, 187);
            border-top: none;
            box-sizing: border-box;
          }
          section#control-panel.hidden > ul#user-control-panel{
            display: none;
          }
          /* Discussions on your scripts */
          #user-discussions-on-scripts-written{
            margin-top: 0;
          }
          /* tabs */
          #tabNavigation{
            display: inline-block;
          }
          #tabNavigation > ul{
            list-style-type: none;
            padding: 0;
            display: flex;
          }
          #tabNavigation > ul > li{
            font-weight: bold;
            background: white;
            padding: .25em 1em;
            border: 1px solid rgb(187, 187, 187);
            border-bottom: none;
            border-radius: 5px 5px 0 0;
            box-shadow: 0 0 5px rgb(221, 221, 221);
          }
          #tabNavigation > ul > li[data-selected="false"]{
            color: rgb(153,153,153);
            background: rgb(221, 221, 221);
            cursor: pointer;
          }
          [data-selector="scriptSets"] > section,
          [data-tabified] #user-script-list{
            border-radius: 0 5px 5px 5px;
          }
          [data-tabified] header{
            display: none;
          }
          [data-tabified][data-selected="false"]{
            display: none;
          }
          /* Scripts */
          [data-selector="scripts"] > div > section > header + p/* no scripts */{
            background: white;
            border: 1px solid rgb(187, 187, 187);
            border-radius: 0 5px 5px 5px;
            box-shadow: 0 0 5px rgb(221, 221, 221);
            padding: 14px;
          }
          #user-script-list li{
            padding: .25em 1em;
            position: relative;
          }
          #user-script-list li:last-child{
            border-bottom: none;/* missing in greasyfork.org */
          }
          #user-script-list li article{
            position: relative;
            z-index: 1;/* over the .chart */
            pointer-events: none;
          }
          #user-script-list li article h2 > a{
            margin-right: 4em;/* for preventing from hiding chart's count number */
            display: inline-block;
          }
          #user-script-list li article h2 > a + .script-type{
            margin-left: -4em;/* trick */
          }
          #user-script-list li article h2 > a,
          #user-script-list li article h2 > .description/* it's block! */ > span,
          #user-script-list li article dl > dt > *,
          #user-script-list li article dl > dd > *{
            pointer-events: auto;/* apply on inline elements */
          }
          #user-script-list li button.more{
            border-radius: 5px;
            position: absolute;
            top: 0;
            right: 0;
            margin: 5px;
            width: 2em;
            z-index: 1;/* over the .chart */
          }
          #user-script-list li .description{
            font-size: small;
            margin: 0 0 0 .1em;/* ajust first letter position */
          }
          #user-script-list li dl.inline-script-stats{
            margin-top: .25em;
            column-count: 3;
            max-height: 4em;/* Firefox bug? */
          }
          #user-script-list li dl.inline-script-stats dt{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 200px;/* stretching column mystery on long-lettered languages such as fr-CA */
          }
          #user-script-list li dl.inline-script-stats .script-list-author{
            display: none;
          }
          #user-script-list li dl.inline-script-stats dd.script-list-version a.update{
            padding: 0 .75em 0 .25em;/* enough space for right side */
            margin: 0 .25em;
          }
          #user-script-list li dl.inline-script-stats dt{
            width: 55%;
          }
          #user-script-list li dl.inline-script-stats dd{
            width: 45%;
          }
          #user-script-list li dl.inline-script-stats dt.script-list-daily-installs,
          #user-script-list li dl.inline-script-stats dt.script-list-total-installs{
            width: 65%;
          }
          #user-script-list li dl.inline-script-stats dd.script-list-daily-installs,
          #user-script-list li dl.inline-script-stats dd.script-list-total-installs{
            width: 35%;
          }
          #user-script-list li.hidden .description,
          #user-script-list li.hidden .inline-script-stats{
            display: none;
          }
          /* chartSwitcher */
          [data-selector="scripts"] > div > section{
            position: relative;/* position anchor */
          }
          #chartSwitcher{
            display: inline-block;
            position: absolute;
            top: -1.5em;
            right: 0;
            line-height: 1.25em;
          }
          #chartSwitcher > ul{
            list-style-type: none;
            font-size: small;
            padding: 0;
            margin: 0;
          }
          #chartSwitcher > ul > li{
            color: rgb(187,187,187);
            font-weight: bold;
            display: inline-block;
            border-right: 1px solid rgb(187,187,187);
            padding: 0 1em;
            margin: 0;
            cursor: pointer;
          }
          #chartSwitcher > ul > li[data-selected="true"]{
            color: black;
            cursor: auto;
          }
          #chartSwitcher > ul > li:nth-last-child(2)/* 2nd including template */{
            border-right: none;
          }
          /* chart */
          .chart{
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            mask-image: linear-gradient(to right, rgba(0,0,0,.5), black);
            -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,.5), black);
          }
          .chart > dl{
            position: absolute;
            bottom: 0;
            right: 2em;
            margin: 0;
            height: calc(100% - 5px);
            display: flex;
            align-items: flex-end;
          }
          .chart > dl > dt.date{
            display: none;
          }
          .chart > dl > dd.count{
            background: rgb(221,221,221);
            border-left: 1px solid white;
            margin: 0;
            width: 3px;
            height: 0%;/* will stretch */
            transition: height 250ms ${EASING}, width 250ms ${EASING};
          }
          .chart > dl > dd.count:nth-last-of-type(3)/* 3rd including template */,
          .chart > dl > dd.count:hover{
            background: rgb(187,187,187);
          }
          .chart > dl > dd.count:nth-last-of-type(3):hover{
            background: rgb(153,153,153);
          }
          .chart > dl > dd.count > span{
            display: none;/* default */
          }
          .chart > dl > dd.count:nth-last-of-type(3) > span{
            display: inline;/* overwrite */
            font-weight: bold;
            color: rgb(153,153,153);
            position: absolute;
            top: 5px;
            right: 10px;
            pointer-events: none;
          }
          .chart > dl > dd.count:nth-last-of-type(3)[data-count="0"] > span{
            color: rgb(221,221,221);
          }
          .chart > dl > dd.count:nth-last-of-type(3):hover > span{
            color: rgb(119,119,119);
          }
          /* sidebar */
          .sidebar{
            padding-top: 0;
          }
          [data-owner="true"] .ad/* excuse me, it disappears only in my own user page :-) */,
          [data-owner="true"] #script-list-filter{
            display: none !important;
          }
        </style>
      `,
    },
  };
  class Storage{
    static key(key){
      return (SCRIPTNAME) ? (SCRIPTNAME + '-' + key) : key;
    }
    static save(key, value, expire = null){
      key = Storage.key(key);
      localStorage[key] = JSON.stringify({
        value: value,
        saved: Date.now(),
        expire: expire,
      });
    }
    static read(key){
      key = Storage.key(key);
      if(localStorage[key] === undefined) return undefined;
      let data = JSON.parse(localStorage[key]);
      if(data.value === undefined) return data;
      if(data.expire === undefined) return data;
      if(data.expire === null) return data.value;
      if(data.expire < Date.now()) return localStorage.removeItem(key);
      return data.value;
    }
    static delete(key){
      key = Storage.key(key);
      delete localStorage.removeItem(key);
    }
    static saved(key){
      key = Storage.key(key);
      if(localStorage[key] === undefined) return undefined;
      let data = JSON.parse(localStorage[key]);
      if(data.saved) return data.saved;
      else return undefined;
    }
  }
  const $ = function(s){return document.querySelector(s)};
  const $$ = function(s){return document.querySelectorAll(s)};
  const animate = function(callback, ...params){requestAnimationFrame(() => requestAnimationFrame(() => callback(...params)))};
  const wait = function(ms){return new Promise((resolve) => setTimeout(resolve, ms))};
  const createElement = function(html){
    let outer = document.createElement('div');
    outer.innerHTML = html;
    return outer.firstElementChild;
  };
  const toMetric = function(number, fixed = 1){
    switch(true){
      case(number <  1e3): return (number);
      case(number <  1e6): return (number/ 1e3).toFixed(fixed) + 'K';
      case(number <  1e9): return (number/ 1e6).toFixed(fixed) + 'M';
      case(number < 1e12): return (number/ 1e9).toFixed(fixed) + 'G';
      default:             return (number/1e12).toFixed(fixed) + 'T';
    }
  };
  const log = function(){
    if(!DEBUG) return;
    let l = log.last = log.now || new Date(), n = log.now = new Date();
    let error = new Error(), line = log.format.getLine(error), callers = log.format.getCallers(error);
    //console.log(error.stack);
    console.log(
      SCRIPTNAME + ':',
      /* 00:00:00.000  */ n.toLocaleTimeString() + '.' + n.getTime().toString().slice(-3),
      /* +0.000s       */ '+' + ((n-l)/1000).toFixed(3) + 's',
      /* :00           */ ':' + line,
      /* caller.caller */ (callers[2] ? callers[2] + '() => ' : '') +
      /* caller        */ (callers[1] || '') + '()',
      ...arguments
    );
  };
  log.formats = [{
      name: 'Firefox Scratchpad',
      detector: /MARKER@Scratchpad/,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1],
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Firefox Console',
      detector: /MARKER@debugger/,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1],
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Firefox Greasemonkey 3',
      detector: /\/gm_scripts\//,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1],
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Firefox Greasemonkey 4+',
      detector: /MARKER@user-script:/,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1] - 500,
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Firefox Tampermonkey',
      detector: /MARKER@moz-extension:/,
      getLine: (e) => e.stack.split('\n')[1].match(/([0-9]+):[0-9]+$/)[1] - 6,
      getCallers: (e) => e.stack.match(/^[^@]*(?=@)/gm),
    }, {
      name: 'Chrome Console',
      detector: /at MARKER \(<anonymous>/,
      getLine: (e) => e.stack.split('\n')[2].match(/([0-9]+):[0-9]+\)$/)[1],
      getCallers: (e) => e.stack.match(/[^ ]+(?= \(<anonymous>)/gm),
    }, {
      name: 'Chrome Tampermonkey',
      detector: /at MARKER \((userscript\.html|chrome-extension:)/,
      getLine: (e) => e.stack.split('\n')[2].match(/([0-9]+)\)$/)[1] - 6,
      getCallers: (e) => e.stack.match(/[^ ]+(?= \((userscript\.html|chrome-extension:))/gm),
    }, {
      name: 'Edge Console',
      detector: /at MARKER \(eval/,
      getLine: (e) => e.stack.split('\n')[2].match(/([0-9]+):[0-9]+\)$/)[1],
      getCallers: (e) => e.stack.match(/[^ ]+(?= \(eval)/gm),
    }, {
      name: 'Edge Tampermonkey',
      detector: /at MARKER \(Function/,
      getLine: (e) => e.stack.split('\n')[2].match(/([0-9]+):[0-9]+\)$/)[1] - 4,
      getCallers: (e) => e.stack.match(/[^ ]+(?= \(Function)/gm),
    }, {
      name: 'Safari',
      detector: /^MARKER$/m,
      getLine: (e) => 0,/*e.lineが用意されているが最終呼び出し位置のみ*/
      getCallers: (e) => e.stack.split('\n'),
    }, {
      name: 'Default',
      detector: /./,
      getLine: (e) => 0,
      getCallers: (e) => [],
    }];
  log.format = log.formats.find(function MARKER(f){
    if(!f.detector.test(new Error().stack)) return false;
    //console.log('//// ' + f.name + '\n' + new Error().stack);
    return true;
  });
  core.initialize();
  if(window === top && console.timeEnd) console.timeEnd(SCRIPTNAME);
})();