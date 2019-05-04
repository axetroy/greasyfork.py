// ==UserScript==
// @name         Wykop blacklist+
// @namespace    https://www.github.com/rpbyo
// @version      1.1.0
// @description  Rozszerzona czarna lista.
// @author       https://www.github.com/rpbyo
// @match        *://*.wykop.pl/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @require      https://unpkg.com/react@16/umd/react.production.min.js
// @require      https://unpkg.com/react-dom@16/umd/react-dom.production.min.js
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function newf() {
  const wblp = {
    filter: {
      updateWykopSettings() {
        wykop.height.document = Math.round(document.body.getBoundingClientRect().height);
        wykop.bindLazy();
      },
      addHideButton(li) {
        const { type } = li.querySelector('div').dataset;
        const btn = '<a href="#" class="affect hide wblp-hideelement">Ukryj ponownie</a>';
        switch (type) {
          case 'link':
            {
              const row = li.querySelector('.article > .lcontrast > .row.elements');
              if (!row.querySelector('.wblp-hideelement')) {
                row.insertAdjacentHTML('beforeend', btn);
              }
            }
            break;
          default:
            {
              const row = li.querySelector('.wblock .row.elements');
              if (row) {
                if (!row.querySelector('.wblp-hideelement')) {
                  row.insertAdjacentHTML('beforeend', btn);
                }
              } else {
                const text = li.querySelector('.wblock .text');
                if (!text.parentElement.querySelector('.wblp-hideelement')) {
                  text.insertAdjacentHTML('afterend', `<div>${btn}</div>`);
                }
              }
            }
            break;
        }
      },
      toggleFilteredElement({ target }) {
        const closestLi = target.closest('li');
        if (closestLi) {
          closestLi.classList.toggle('wblp-hide');
          this.addHideButton(closestLi);
        }
        this.updateWykopSettings();
      },
      hideElement(element, elementType, reason, { blockingType }) {
        const reasonsList = {
          colorFilter: 'kolor',
          domainFilter: 'domena',
          genderFilter: 'płeć',
          hasTagFilter: 'zawiera tag',
          tagFilter: 'tag',
          timeFilter: 'czas',
          userFilter: 'użytkownik',
          withoutTagFilter: 'brak tagów',
          wordFilter: 'słowo',
        };
        const messagesList = {
          comment: `Komentarz został ukryty (${reasonsList[reason]})`,
          commentsub: `Komentarz został ukryty (${reasonsList[reason]})`,
          entry: `Wpis został ukryty (${reasonsList[reason]})`,
          entrycomment: `Komentarz został ukryty (${reasonsList[reason]})`,
          link: `Znalezisko zostało ukryte (${reasonsList[reason]})`,
        };
        const msg = `<div class="show-message_container"><a href="#" class="show-element_button">${
          messagesList[elementType]
        } - Kliknij, aby zobaczyć</a></div>`;
        switch (blockingType[elementType]) {
          case 0:
            {
              const li = element.closest('li');
              if (elementType === 'link') {
                li.insertAdjacentHTML('beforeend', msg);
              } else {
                element.querySelector('.text').insertAdjacentHTML('afterend', msg);
              }
              this.addHideButton(li);
            }
            break;
          case 1:
            {
              const li = element.closest('li');
              li.classList.add('wblp-hide');
              if (elementType === 'link') {
                li.insertAdjacentHTML('beforeend', msg);
              } else {
                element.querySelector('.text').insertAdjacentHTML('afterend', msg);
              }
            }
            break;
          case 2:
            if (elementType === 'link') {
              element.closest('.link').remove();
            } else {
              element.parentElement.remove();
            }
            break;
          default:
            break;
        }
        this.updateWykopSettings();
      },
      getElementsToFilter({ elementToBlock }) {
        const selectorsList = {
          link: '#itemsStream > .link.iC > div[data-type="link"] > .lcontrast.m-reset-margin',
          comment: '#itemsStream > .iC > div[data-type="comment"]',
          commentsub: '#itemsStream > .iC > .sub > li > div[data-type="comment"]',
          entry: '#itemsStream > .entry.iC > div[data-type="entry"]',
          entrycomment: '#itemsStream > .entry.iC > .sub > li > div[data-type="entrycomment"]',
        };
        let elements = [];
        Object.entries(elementToBlock).forEach((property) => {
          const [key, value] = property;
          if (value) {
            elements = [...elements, ...document.querySelectorAll(selectorsList[key])];
          }
        });
        return elements;
      },
      getTypeOfElement(element) {
        if (element.classList.contains('m-reset-margin')) {
          return element.parentElement.dataset.type;
        }
        const { type } = element.dataset;
        if (type === 'comment' && element.closest('.sub')) {
          return 'commentsub';
        }
        return type;
      },
      filterModules: {
        genderFilter(element, elementType, { genderList }) {
          if (elementType !== 'link' && genderList.length) {
            const elementGenderString = element.querySelector('.avatar.lazy').classList.value;
            let elementGender = elementGenderString.match(/male|female/);
            switch (true) {
              case !elementGender:
                elementGender = 'none';
                break;
              default:
                [elementGender] = elementGender;
                break;
            }
            return genderList.includes(elementGender);
          }
          return false;
        },
        colorFilter(element, elementType, { colorList }) {
          if (colorList.length) {
            let userColorString;
            switch (elementType) {
              case 'link':
                {
                  const em = element.querySelector('.fix-tagline > a > em');
                  userColorString = em.parentElement.classList.value;
                }
                break;
              default:
                {
                  const nickElement = element.querySelector('.author > .showProfileSummary');
                  userColorString = nickElement
                    ? nickElement.classList.value
                    : element.querySelector('.author > b').classList.value;
                }
                break;
            }
            const userColor = userColorString.match(/color-\d+/)[0];
            return colorList.includes(userColor);
          }
          return false;
        },
        userFilter(element, elementType, { userList }) {
          if (userList.length) {
            let userName;
            switch (elementType) {
              case 'link':
                {
                  const em = element.querySelector('.fix-tagline > a > em');
                  const parentText = em.parentElement.innerText;
                  userName = parentText.substr(1).toLowerCase();
                }
                break;
              default:
                {
                  const nickElement = element.querySelector('.author > .showProfileSummary > b');
                  userName = nickElement
                    ? nickElement.innerText.toLowerCase()
                    : element.querySelector('.author > b').innerText.toLowerCase();
                }
                break;
            }
            return userList.includes(userName);
          }
          return false;
        },
        timeFilter(element, elementType, { timeList }) {
          if (elementType === 'entry' && timeList.length) {
            const timeElement = element.querySelector('.author time');
            const timeAttr = timeElement.getAttribute('datetime');
            const date = new Date(timeAttr);
            // eslint-disable-next-line
            const time = date.getHours() * 60 + date.getMinutes();
            for (let i = 0; i < timeList.length; i += 1) {
              const timeArr = timeList[i].split('-').map(e => e.split(':'));
              // eslint-disable-next-line
              const [a, b] = timeArr.map(e => +e[0] * 60 + +e[1]);
              if (a <= b) {
                return time >= a && time <= b;
              }
              return (time >= a && time <= 1439) || (time <= b && time >= 0);
            }
          }
          return false;
        },
        tagFilter(element, elementType, { tagList }) {
          if (tagList.length) {
            const { action, sort } = wykop.params;
            const tagArr = [];
            switch (elementType) {
              case 'link':
                {
                  const tags = [...element.querySelectorAll('.fix-tagline > a.tag.affect.create')];
                  tags.forEach(a =>
                    a.classList.contains('unhide') ||
                      tagArr.push(a.innerText.substr(1).toLowerCase()));
                }
                break;
              default:
                {
                  const tags = [...element.querySelectorAll('.text > p .showTagSummary')];
                  tags.forEach(a => tagArr.push(a.innerText.toLowerCase()));
                }
                break;
            }
            for (let i = 0; i < tagArr.length; i += 1) {
              if (action === 'tag' && tagArr[i] !== sort) {
                if (tagList.includes(tagArr[i])) return true;
              }
            }
          }
          return false;
        },
        withoutTagFilter(element, elementType) {
          if (elementType === 'index' || elementType === 'entry') {
            if (elementType === 'link') {
              return !element.querySelector('.fix-tagline > .tag.affect.create');
            }
            return !element.querySelector('.text > p .showTagSummary');
          }
          return false;
        },
        hasTagFilter(element, elementType) {
          if (elementType === 'link' || elementType === 'entry') {
            if (elementType === 'link') {
              return element.querySelector('.fix-tagline > .tag.affect.create');
            }
            return element.querySelector('.text > p .showTagSummary');
          }
          return false;
        },
        domainFilter(element, elementType, { domainList }) {
          if (elementType === 'link' && domainList.length) {
            const domainElement = element.querySelector('.fix-tagline > .tag.create > a[rel="nofollow"]');
            if (domainElement) {
              const domain = domainElement.innerText;
              return domainList.includes(domain);
            }
          }
          return false;
        },
        wordFilter(element, elementType, { wordList }) {
          if (wordList.length) {
            const clearText = (textToEdit) => {
              let text = textToEdit.toLowerCase();
              text = text.replace(/#[a-z0-9]+/g, '');
              text = text.replace(/\s+/g, ' ');
              text = text.replace(/^\s|,|\s$/g, '');
              text = text.replace(/ą/g, 'a');
              text = text.replace(/ć/g, 'c');
              text = text.replace(/ę/g, 'e');
              text = text.replace(/ń/g, 'n');
              text = text.replace(/ó/g, 'o');
              text = text.replace(/ś/g, 's');
              text = text.replace(/ź|ż/g, 'z');
              return text;
            };
            let textToCompare;
            switch (elementType) {
              case 'link':
                {
                  const title = element.querySelector('h2').innerText;
                  const description = element.querySelector('.description > .text > a').innerText;
                  const text = `${title} ${description}`;
                  textToCompare = clearText(text);
                }
                break;
              default:
                {
                  const text = element.querySelector('.text > p').innerText;
                  textToCompare = clearText(text);
                }
                break;
            }
            for (let i = 0; i < wordList.length; i += 1) {
              if (textToCompare.includes(wordList[i].toLowerCase())) {
                return true;
              }
            }
          }
          return false;
        },
      },
      startFilter({ filterType }, elements) {
        for (let e = 0; e < elements.length; e += 1) {
          const element = elements[e];
          const elementType = this.getTypeOfElement(element);
          for (
            let m = 0, n = Object.entries(filterType);
            m < Object.keys(filterType).length;
            m += 1
          ) {
            if (n[m][1]) {
              if (this.filterModules[n[m][0]](element, elementType, this.data.filtersList)) {
                this.hideElement(element, elementType, n[m][0], this.data.pageOptions);
                break;
              }
            }
          }
        }
      },
      runMutator(element, type, { elementToBlock }) {
        const observer = new MutationObserver((muts) => {
          const newElems = [...muts[0].addedNodes];
          let elements = [];
          newElems.forEach((e) => {
            if (e.classList.contains('link') && elementToBlock.link) {
              elements.push(e.querySelector('div[data-type="link"] > .lcontrast.m-reset-margin'));
            } else if (e.classList.contains('entry')) {
              let sub = [];
              if (elementToBlock.entrycomment) {
                sub = [...sub, ...e.querySelectorAll('.sub > li > div')];
              }
              if (elementToBlock.entry) {
                elements.push(e.querySelector('div'));
              }
              elements = [...elements, ...sub];
            } else if (elementToBlock.entrycomment) {
              elements.push(e.querySelector('div'));
            }
          });
          if (type === 'click') {
            observer.disconnect();
          }
          this.startFilter(this.data.pageOptions, elements);
        });
        observer.observe(element, { childList: true });
      },
      filterEv(event) {
        const { target } = event;
        if (
          target.matches('a.affect.ajax') &&
          target.parentElement.matches('p.more') &&
          target.closest('.sub')
        ) {
          this.runMutator(target.closest('.sub'), 'click', this.data.pageOptions);
        } else if (
          target.matches('a.show-element_button') ||
          target.matches('a.wblp-hideelement')
        ) {
          event.preventDefault();
          this.toggleFilteredElement(event);
        }
      },
      addCss() {
        const css =
          '<style type="text/css">' +
          '.wblp-hide.link > .show-message_container,.wblp-hide > .wblock.lcontrast.dC{opacity:0.3;}' +
          '.wblp-hide.link > .show-message_container:hover,.wblp-hide > .wblock.lcontrast.dC:hover{opacity:1;}' +
          '.wblp-hide > .article,.wblp-hide > .wblock.lcontrast.dC + .sub,.wblp-hide > .wblock.lcontrast.dC > survey,.wblp-hide > .wblock.lcontrast.dC > div > :not(.author):not(.show-message_container),.show-message_container{display:none!important;}' +
          '.wblp-hide .show-message_container{display:block!important;text-align:center;}' +
          '.wblp-hide .show-element_button{zoom:1;cursor:pointer;text-align:center;line-height:2.8rem;display:block;color:#cacecf!important;font-weight:bold;}' +
          '.wblp-hideelement{margin-left:15px;}</style>';
        document.head.insertAdjacentHTML('beforeend', css);
      },
      addEvents({ action, method }) {
        switch (action) {
          case 'stream':
          case 'entries':
          case 'tag':
            if (method !== 'hot') {
              this.runMutator(
                document.querySelector(`${action === 'entries' ? '.sub' : '#itemsStream'}`),
                'auto',
                this.data.pageOptions,
              );
            }
            break;
          default:
            break;
        }
        document.addEventListener('click', event => this.filterEv(event), true);
      },
      async getValue(id) {
        // eslint-disable-next-line
        const data = await GM_getValue(`wblp${id}`);
        return data ? JSON.parse(data) : data;
      },
      mergeFilters(pf, gf, {
        isOn, filter, mainGlobalFilter, globalFilter,
      }) {
        let set;
        if (isOn !== false) {
          if (mainGlobalFilter !== false && globalFilter !== false && filter && pf && gf) {
            set = gf;
            Object.entries(set).forEach((property) => {
              const arr = [...property[1], ...pf[property[0]]];
              set[property[0]] = [...new Set(arr)];
            });
          } else if (mainGlobalFilter !== false && globalFilter !== false && gf) {
            set = gf;
          } else if (filter && pf) {
            set = pf;
          }
        }
        return set;
      },
      mergeOptions(po, go) {
        const pageoptions = po || {};
        const globaloptions = go || {};
        let set = {};
        if (globaloptions.mainGlobalOptions && pageoptions.globalOptions !== false) {
          set = globaloptions;
          set.isOn = pageoptions.isOn;
          set.filter = pageoptions.filter;
          set.globalFilter = pageoptions.globalFilter;
        } else if (pageoptions.isOn) {
          set = pageoptions;
        }
        return set;
      },
      splitData(obj) {
        const { filterList, ...optionsList } = obj;
        return [filterList, optionsList];
      },
      splitAndMerge([info, pageoptions, globaloptions]) {
        let po;
        let pf;
        let go;
        let gf;
        if (pageoptions) [pf, po] = this.splitData(pageoptions);
        if (globaloptions) [gf, go] = this.splitData(globaloptions);
        const options = this.mergeOptions(po, go);
        const filters = this.mergeFilters(pf, gf, options);
        const arr = [info, options, filters];
        return arr;
      },
      async getAndEditOptions({ action, sort }) {
        return Promise.all([
          this.getValue('info'),
          this.getValue(`settings${action}${sort}`),
          this.getValue('settingsglobaloptions'),
        ]).then(data => this.splitAndMerge(data));
      },
      async loadSettings() {
        const [info, pageOptions, filtersList] = await this.getAndEditOptions(wykop.params);
        this.data = { info, pageOptions, filtersList };
      },
      isFilterOn() {
        return this.data.info ? this.data.info.isOn : undefined;
      },
      initialize() {
        (async () => {
          this.loadSettings().then(() => {
            if (
              this.isFilterOn() &&
              this.data.filtersList &&
              this.data.pageOptions.isOn !== false &&
              Object.keys(this.data.pageOptions).length
            ) {
              this.addCss();
              this.addEvents(wykop.params);
              this.startFilter(
                this.data.pageOptions,
                this.getElementsToFilter(this.data.pageOptions),
              );
            }
          });
        })();
      },
    },
    option: {
      navElementsList: {
        global: {
          innerText: 'Opcje globalne',
          pageId: 'globaloptions',
          pageTitle: 'Opcje globalne',
        },
        index: {
          innerText: 'Strona główna',
          sub: [
            { innerText: 'najnowsze', pageId: 'index1', pageTitle: 'Strona główna - najnowsze' },
            { innerText: 'aktywne', pageId: 'index2', pageTitle: 'Strona główna - aktywne' },
          ],
        },
        upcoming: {
          innerText: 'Wykopalisko',
          sub: [
            { innerText: 'aktywne', pageId: 'upcoming1', pageTitle: 'Wykopalisko - aktywne' },
            { innerText: 'najnowsze', pageId: 'upcoming2', pageTitle: 'Wykopalisko - najnowsze' },
            {
              innerText: 'komentowane',
              pageId: 'upcoming3',
              pageTitle: 'Wykopalisko - komentowane',
            },
            {
              innerText: 'wykopywane',
              pageId: 'upcoming4',
              pageTitle: 'Wykopalisko - wykopywane',
            },
          ],
        },
        link: { innerText: 'Znaleziska', pageId: 'link', pageTitle: 'Znaleziska' },
        stream: {
          innerText: 'Mikroblog',
          sub: [
            { innerText: 'najnowsze', pageId: 'streamindex', pageTitle: 'Mikroblog - najnowsze' },
            { innerText: 'aktywne', pageId: 'streamactive', pageTitle: 'Mikroblog - aktywne' },
            { innerText: 'gorące', pageId: 'streamhot', pageTitle: 'Mikroblog - gorące' },
          ],
        },
        entries: { innerText: 'Wpisy', pageId: 'entries', pageTitle: 'Wpisy' },
      },
      getObjectPattern(isGlobalOptions) {
        const pat = {
          blockingType: {
            comment: 1,
            commentsub: 1,
            entry: 1,
            entrycomment: 1,
            link: 1,
          },
          elementToBlock: {
            comment: true,
            commentsub: true,
            entry: true,
            entrycomment: true,
            link: true,
          },
          filterType: {
            colorFilter: false,
            domainFilter: false,
            genderFilter: false,
            hasTagFilter: false,
            tagFilter: false,
            timeFilter: false,
            userFilter: false,
            withoutTagFilter: false,
            wordFilter: false,
          },
          filterList: {
            colorList: [],
            userList: [],
            tagList: [],
            domainList: [],
            timeList: [],
            wordList: [],
            genderList: [],
          },
        };
        if (isGlobalOptions) {
          pat.mainGlobalFilter = true;
          pat.mainGlobalOptions = true;
        } else {
          pat.isOn = true;
          pat.filter = true;
          pat.globalFilter = true;
          pat.globalOptions = true;
        }
        return pat;
      },
      main() {
        const rce = React.createElement;
        const rc = React.Component;
        const toggleSub = (e) => {
          e.preventDefault();
          e.target.classList.toggle('wblp-showsub');
        };
        const removeItemFromArray = (item, array) => {
          const arrayCopy = [...array];
          const index = arrayCopy.indexOf(item);
          if (index < 0) return false;
          arrayCopy.splice(index, 1);
          return arrayCopy;
        };
        const setValue = (id, data) => GM_setValue(`wblp${id}`, JSON.stringify(data));
        const deleteValue = id => GM_deleteValue(`wblp${id}`);
        const getValue = async (id, isGO) => {
          try {
            const response = await GM_getValue(`wblp${id}`);
            const rej = id === 'info' ? null : this.getObjectPattern(isGO);
            const json = (await response) ? JSON.parse(response) : rej;
            return json;
          } catch (error) {
            throw new Error(`Wykop blacklist+ ${error}`);
          }
        };
        const FieldsetList = props =>
          rce(
            'fieldset',
            null,
            rce('h4', null, props.h4Text),
            rce(
              'div',
              { className: 'space' },
              rce(
                'div',
                { className: 'wblp-gridaction' },
                rce('input', {
                  placeholder: props.placeholder,
                  className: 'wblp-input',
                  type: 'text',
                  onChange: props.onChange,
                  value: props.value,
                }),
                rce(
                  'a',
                  {
                    href: '#',
                    className: 'button',
                    onClick: props.addItems,
                  },
                  'dodaj',
                ),
              ),
              rce(
                'div',
                { className: 'wblp-gridfilterlist' },
                props.list.map(item =>
                  rce(
                    'a',
                    {
                      key: item.id,
                      href: '#',
                      title: 'Kliknij, aby usunąć',
                      onClick: e => props.itemRemove(e, item, props.filterListName),
                    },
                    item,
                  )),
              ),
            ),
          );
        const Fieldset = props =>
          rce(
            'fieldset',
            null,
            rce('h4', null, props.h4Text),
            rce(
              'div',
              { className: props.className || 'space' },
              props.rows.map((item) => {
                const {
                  inlineText, checked, title, select, handleChange, selectChange,
                } = item;
                return rce(
                  'div',
                  { key: item.id, className: 'row' },
                  rce('input', {
                    type: 'checkbox',
                    title: title || '',
                    checked,
                    onChange: handleChange,
                  }),
                  rce(
                    'label',
                    { className: `inline ${props.select ? 'wblp-inline' : ''}` },
                    inlineText,
                  ),
                  !!props.select &&
                    rce(
                      'select',
                      { className: 'wblp-select', value: select, onChange: selectChange },
                      rce('option', { value: 0 }, 'Nic'),
                      rce('option', { value: 1 }, 'Zwijaj'),
                      rce('option', { value: 2 }, 'Usuwaj'),
                    ),
                );
              }),
            ),
          );
        const PageFilterList = (props) => {
          const {
            pageId,
            checkboxToggleArr,
            filterList,
            addToFilterList,
            handleChange,
            inputsValues,
            itemRemove,
          } = props;
          const {
            colorList,
            domainList,
            userList,
            wordList,
            tagList,
            timeList,
            genderList,
          } = filterList;
          const {
            users, tags, domains, words, times,
          } = inputsValues;
          return rce(
            'div',
            null,
            rce(
              'h4',
              { className: 'wblp-h4' },
              `Lista filtrów ${pageId === 'globaloptions' ? 'globalnych' : 'lokalnych'}`,
            ),
            rce(Fieldset, {
              h4Text: 'kolor',
              className: 'space wblp-grid',
              rows: [
                {
                  checked: colorList.includes('color-0'),
                  inlineText: 'zielonki',
                  handleChange: e => checkboxToggleArr(e, 'color-0', 'colorList'),
                },
                {
                  checked: colorList.includes('color-1'),
                  inlineText: 'pomarańczowi',
                  handleChange: e => checkboxToggleArr(e, 'color-1', 'colorList'),
                },
                {
                  checked: colorList.includes('color-2'),
                  inlineText: 'bordo',
                  handleChange: e => checkboxToggleArr(e, 'color-2', 'colorList'),
                },
                {
                  checked: colorList.includes('color-5'),
                  inlineText: 'administracja',
                  handleChange: e => checkboxToggleArr(e, 'color-5', 'colorList'),
                },
                {
                  checked: colorList.includes('color-1001'),
                  inlineText: 'zbanowani',
                  handleChange: e => checkboxToggleArr(e, 'color-1001', 'colorList'),
                },
                {
                  checked: colorList.includes('color-1002'),
                  inlineText: 'konta usunięte',
                  handleChange: e => checkboxToggleArr(e, 'color-1002', 'colorList'),
                },
                {
                  checked: colorList.includes('color-2001'),
                  inlineText: 'oficjalne',
                  handleChange: e => checkboxToggleArr(e, 'color-2001', 'colorList'),
                },
              ],
            }),
            rce(Fieldset, {
              h4Text: 'Płeć',
              className: 'space wblp-grid',
              rows: [
                {
                  checked: genderList.includes('male'),
                  inlineText: 'mężczyzna',
                  handleChange: e => checkboxToggleArr(e, 'male', 'genderList'),
                },
                {
                  checked: genderList.includes('female'),
                  inlineText: 'kobieta',
                  handleChange: e => checkboxToggleArr(e, 'female', 'genderList'),
                },
                {
                  checked: genderList.includes('none'),
                  inlineText: 'brak',
                  handleChange: e => checkboxToggleArr(e, 'none', 'genderList'),
                },
              ],
            }),
            rce(FieldsetList, {
              h4Text: 'nazwa użytkownika',
              placeholder: 'np. m__b, moderacja, wykop',
              list: userList,
              onChange: e => handleChange(e, 'users'),
              addItems: e => addToFilterList(e, 'users', 'userList'),
              itemRemove,
              filterListName: 'userList',
              value: users,
            }),
            rce(FieldsetList, {
              h4Text: 'tag',
              placeholder: 'np. gownowpis, patostreamy, nsfw, pilkanozna',
              list: tagList,
              onChange: e => handleChange(e, 'tags'),
              addItems: e => addToFilterList(e, 'tags', 'tagList'),
              itemRemove,
              filterListName: 'tagList',
              value: tags,
            }),
            rce(FieldsetList, {
              h4Text: 'domena',
              placeholder: 'np. wykop.pl, google.pl',
              list: domainList,
              onChange: e => handleChange(e, 'domains'),
              addItems: e => addToFilterList(e, 'domains', 'domainList'),
              itemRemove,
              filterListName: 'domainList',
              value: domains,
            }),
            rce(FieldsetList, {
              h4Text: 'słowo',
              placeholder: 'np. daj plusa, kazdy kto zaplusuje, ile plusow to',
              list: wordList,
              onChange: e => handleChange(e, 'words'),
              addItems: e => addToFilterList(e, 'words', 'wordList'),
              itemRemove,
              filterListName: 'wordList',
              value: words,
            }),
            rce(FieldsetList, {
              h4Text: 'czas',
              placeholder: 'np. 01:00-06:00, 23:00-02:00',
              list: timeList,
              onChange: e => handleChange(e, 'times'),
              addItems: e => addToFilterList(e, 'times', 'timeList'),
              itemRemove,
              filterListName: 'timeList',
              value: times,
            }),
          );
        };
        const PageSettings = (props) => {
          const {
            pageTitle, settings, checkboxToggle, selectChange,
          } = props;
          const isGO = typeof settings.isOn === 'boolean';
          return rce(
            'div',
            null,
            rce(
              'h4',
              { className: 'wblp-h4' },
              `Ustawienia ${isGO ? `dla ${pageTitle}` : 'globalne'}`,
            ),
            rce(Fieldset, {
              h4Text: 'Opcje podstawowe',
              rows: !isGO
                ? [
                  {
                    checked: settings.mainGlobalOptions,
                    inlineText: 'ustawienia globalne',
                    title: 'Ustawienia globalne nadpisują ustawienia lokalne',
                    handleChange: e => checkboxToggle(e, ['mainGlobalOptions']),
                  },
                  {
                    checked: settings.mainGlobalFilter,
                    inlineText: 'filtr globalny',
                    title: 'Filtr globalny łączy się z filtrem lokalnym',
                    handleChange: e => checkboxToggle(e, ['mainGlobalFilter']),
                  },
                ]
                : [
                  {
                    checked: settings.isOn,
                    inlineText: 'filtrowanie na tej stronie',
                    handleChange: e => checkboxToggle(e, ['isOn']),
                  },
                  {
                    checked: settings.filter,
                    inlineText: 'filtr lokalny',
                    handleChange: e => checkboxToggle(e, ['filter']),
                  },
                  {
                    checked: settings.globalOptions,
                    inlineText: 'ustawienia globalne na tej stronie',
                    title: 'Ustawienia globalne nadpisują ustawienia lokalne',
                    handleChange: e => checkboxToggle(e, ['globalOptions']),
                  },
                  {
                    checked: settings.globalFilter,
                    inlineText: 'filtr globalny na tej stronie',
                    title: 'Filtr globalny łączy się z filtrem lokalnym',
                    handleChange: e => checkboxToggle(e, ['globalFilter']),
                  },
                ],
            }),
            rce(Fieldset, {
              h4Text: 'Elementy oraz rodzaj filtrowania',
              select: true,
              rows: [
                {
                  checked: settings.elementToBlock.entry,
                  inlineText: 'wpisy',
                  select: settings.blockingType.entry,
                  handleChange: e => checkboxToggle(e, ['elementToBlock', 'entry']),
                  selectChange: e => selectChange(e, 'entry'),
                },
                {
                  checked: settings.elementToBlock.entrycomment,
                  inlineText: 'komentarze do wpisów',
                  select: settings.blockingType.entrycomment,
                  handleChange: e => checkboxToggle(e, ['elementToBlock', 'entrycomment']),
                  selectChange: e => selectChange(e, 'entrycomment'),
                },
                {
                  checked: settings.elementToBlock.link,
                  inlineText: 'znaleziska',
                  select: settings.blockingType.link,
                  handleChange: e => checkboxToggle(e, ['elementToBlock', 'link']),
                  selectChange: e => selectChange(e, 'link'),
                },
                {
                  checked: settings.elementToBlock.comment,
                  inlineText: 'komentarze',
                  select: settings.blockingType.comment,
                  handleChange: e => checkboxToggle(e, ['elementToBlock', 'comment']),
                  selectChange: e => selectChange(e, 'comment'),
                },
                {
                  checked: settings.elementToBlock.commentsub,
                  inlineText: 'odpowiedzi',
                  select: settings.blockingType.commentsub,
                  handleChange: e => checkboxToggle(e, ['elementToBlock', 'commentsub']),
                  selectChange: e => selectChange(e, 'commentsub'),
                },
              ],
            }),
            rce(Fieldset, {
              h4Text: 'Filtruj przez',
              className: 'space wblp-col',
              rows: [
                {
                  checked: settings.filterType.colorFilter,
                  inlineText: 'kolor użytkownika',
                  handleChange: e => checkboxToggle(e, ['filterType', 'colorFilter']),
                },
                {
                  checked: settings.filterType.domainFilter,
                  inlineText: 'domena',
                  handleChange: e => checkboxToggle(e, ['filterType', 'domainFilter']),
                },
                {
                  checked: settings.filterType.genderFilter,
                  inlineText: 'płeć',
                  handleChange: e => checkboxToggle(e, ['filterType', 'genderFilter']),
                },
                {
                  checked: settings.filterType.hasTagFilter,
                  inlineText: 'zawiera jakikolwiek tag',
                  handleChange: e => checkboxToggle(e, ['filterType', 'hasTagFilter']),
                },
                {
                  checked: settings.filterType.tagFilter,
                  inlineText: 'tagi',
                  handleChange: e => checkboxToggle(e, ['filterType', 'tagFilter']),
                },
                {
                  checked: settings.filterType.timeFilter,
                  inlineText: 'czas',
                  handleChange: e => checkboxToggle(e, ['filterType', 'timeFilter']),
                },
                {
                  checked: settings.filterType.userFilter,
                  inlineText: 'nazwa użytkownika',
                  handleChange: e => checkboxToggle(e, ['filterType', 'userFilter']),
                },
                {
                  checked: settings.filterType.withoutTagFilter,
                  inlineText: 'brak tagów',
                  handleChange: e => checkboxToggle(e, ['filterType', 'withoutTagFilter']),
                },
                {
                  checked: settings.filterType.wordFilter,
                  inlineText: 'słowo',
                  handleChange: e => checkboxToggle(e, ['filterType', 'wordFilter']),
                },
              ],
            }),
          );
        };
        class PageOptions extends rc {
          constructor(props) {
            super(props);
            this.state = {
              pageDetails: {},
              pageData: {},
              showPageOptions: false,
              inputsValues: {
                domains: '',
                tags: '',
                users: '',
                times: '',
                words: '',
              },
            };
            this.itemRemove = this.itemRemove.bind(this);
            this.selectChange = this.selectChange.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.checkboxToggle = this.checkboxToggle.bind(this);
            this.addToFilterList = this.addToFilterList.bind(this);
            this.checkboxToggleArr = this.checkboxToggleArr.bind(this);
          }
          sV() {
            setValue(`settings${this.state.pageDetails.pageId}`, this.state.pageData);
          }
          itemRemove(e, item, prop) {
            e.preventDefault();
            const newFilterElems = removeItemFromArray(item, this.state.pageData.filterList[prop]);
            if (!newFilterElems) return;
            this.setState(
              prevState => ({
                pageData: {
                  ...prevState.pageData,
                  filterList: {
                    ...prevState.pageData.filterList,
                    [prop]: newFilterElems,
                  },
                },
              }),
              () => this.sV(),
            );
          }
          selectChange(e, prop) {
            const { value } = e.target;
            this.setState(
              prevState => ({
                pageData: {
                  ...prevState.pageData,
                  blockingType: {
                    ...prevState.pageData.blockingType,
                    [prop]: +value,
                  },
                },
              }),
              () => this.sV(),
            );
          }
          handleChange(e, prop) {
            const { value } = e.target;
            this.setState(prevState => ({
              inputsValues: { ...prevState.inputsValues, [prop]: value },
            }));
          }
          addToFilterList(e, prop, listName) {
            e.preventDefault();
            const splitted = this.state.inputsValues[prop].split(',');
            const edd = splitted.map(i => i.trim().toLowerCase());
            let filtered = [];
            switch (listName) {
              case 'userList':
                filtered = edd.filter(i => /^[0-9a-z\-_]{4,35}$/.test(i));
                break;
              case 'tagList':
                filtered = edd.filter(i => /^[0-9a-z]{2,50}$/.test(i));
                break;
              case 'domainList':
                filtered = edd.filter(i =>
                  /^((http|https):\/\/)?([a-zA-Z0-9_][-_a-zA-Z0-9]{0,62}\.)+([a-zA-Z0-9]{1,10})$/.test(i));
                break;
              case 'timeList':
                filtered = edd.filter(i => /^\d\d:\d\d-\d\d:\d\d$/.test(i));
                break;
              default:
                filtered = edd.filter(i => /\S+.+/.test(i));
                break;
            }
            const merged = [...this.state.pageData.filterList[listName], ...filtered];
            const newFilterElems = [...new Set(merged)];
            this.setState(
              prevState => ({
                pageData: {
                  ...prevState.pageData,
                  filterList: {
                    ...prevState.pageData.filterList,
                    [listName]: newFilterElems,
                  },
                },
                inputsValues: {
                  ...prevState.inputsValues,
                  [prop]: '',
                },
              }),
              () => this.sV(),
            );
          }
          checkboxToggleArr(e, value, listName) {
            let updatedList = [...this.state.pageData.filterList[listName]];
            if (e.target.checked) updatedList = [...new Set([...updatedList, value])];
            else updatedList = updatedList.filter(item => item !== value);
            this.setState(
              prevState => ({
                pageData: {
                  ...prevState.pageData,
                  filterList: {
                    ...prevState.pageData.filterList,
                    [listName]: updatedList,
                  },
                },
              }),
              () => this.sV(),
            );
          }
          checkboxToggle(e, path) {
            const { checked } = e.target;
            const [a, b] = path;
            if (b) {
              this.setState(
                prevState => ({
                  pageData: {
                    ...prevState.pageData,
                    [a]: { ...prevState.pageData[a], [b]: checked },
                  },
                }),
                () => this.sV(),
              );
            } else {
              this.setState(
                prevState => ({
                  pageData: {
                    ...prevState.pageData,
                    [a]: checked,
                  },
                }),
                () => this.sV(),
              );
            }
          }
          updatePageData() {
            const { pageId } = this.state.pageDetails;
            getValue(`settings${pageId}`, pageId === 'globaloptions').then((resp) => {
              this.setState({ pageData: resp, showPageOptions: true });
            });
          }
          componentWillReceiveProps(nextProps) {
            if (nextProps.pageDetails.pageId !== this.props.pageDetails.pageId) {
              this.setState({ pageDetails: nextProps.pageDetails }, () => this.updatePageData());
            }
          }
          componentDidMount() {
            this.setState(
              (prevState, props) => ({ pageDetails: props.pageDetails }),
              () => this.updatePageData(),
            );
          }
          render() {
            const {
              inputsValues, showPageOptions, pageData, pageDetails,
            } = this.state;
            const { filterList, ...settings } = pageData;
            const { pageTitle, pageId } = pageDetails;
            return rce(
              'div',
              { className: 'rbl-block wblp-pageoptionscontainer space' },
              showPageOptions &&
                rce(PageSettings, {
                  settings,
                  pageTitle,
                  checkboxToggle: this.checkboxToggle,
                  selectChange: this.selectChange,
                }),
              showPageOptions &&
                rce(PageFilterList, {
                  filterList,
                  pageId,
                  inputsValues,
                  handleChange: this.handleChange,
                  checkboxToggleArr: this.checkboxToggleArr,
                  addToFilterList: this.addToFilterList,
                  itemRemove: this.itemRemove,
                }),
            );
          }
        }
        const ScriptOptions = props =>
          rce(
            'div',
            { className: 'rbl-block wblp-scriptoptionscontainer space' },
            rce('h4', { className: 'wblp-h4' }, 'Ustawienia skryptu'),
            rce(Fieldset, {
              h4Text: 'Opcje podstawowe',
              className: 'wblp-space',
              rows: [
                {
                  checked: props.isOn,
                  inlineText: 'włącz/wyłącz blacklist+',
                  handleChange: props.handleChange,
                },
              ],
            }),
          );
        const Options = props =>
          rce(
            'div',
            { className: 'wblp-optionscontainer' },
            rce(ScriptOptions, { isOn: props.isOn, handleChange: props.handleChange }),
            props.showPageOptions && rce(PageOptions, { pageDetails: props.pageDetails }),
          );
        const NavButton = props =>
          rce(
            'div',
            null,
            rce(
              'a',
              {
                href: '#',
                className: 'wblp-navelement',
                onClick: e =>
                  props.updateCurrentPage(e, props.elData.pageId, props.elData.pageTitle),
              },
              props.elData.innerText,
            ),
          );
        const Sub = props =>
          rce(
            'div',
            { className: 'dnone' },
            props.sub.map(item =>
              rce(
                'a',
                {
                  key: item.id,
                  href: '#',
                  className: 'wblp-navelement',
                  onClick: e => props.updateCurrentPage(e, item.pageId, item.pageTitle),
                },
                item.innerText,
              )),
          );
        const NavDropdown = props =>
          rce(
            'div',
            null,
            rce(
              'a',
              {
                href: '#',
                className: 'wblp-navelement',
                onClick: e => toggleSub(e),
              },
              props.elData.innerText,
            ),
            rce(Sub, {
              sub: props.elData.sub,
              updateCurrentPage: props.updateCurrentPage,
            }),
          );
        const TagList = props =>
          rce(
            'div',
            null,
            props.filteredTags.map(item =>
              rce(
                'div',
                { className: 'wblp-navtag' },
                rce(
                  'a',
                  {
                    key: item.id,
                    className: 'wblp-navelement',
                    href: '#',
                    title: `#${item}`,
                    onClick: e => props.updateCurrentPage(e, `tag${item}`, `#${item}`),
                  },
                  item,
                ),
                rce('i', { className: 'fa fa-times', onClick: e => props.removeTag(e, item) }),
              )),
          );
        const NewTagContainer = props =>
          rce(
            'div',
            null,
            rce(
              'div',
              { className: 'wblp-navinputcontainer' },
              rce('input', {
                className: 'wblp-input',
                placeholder: '# dodaj nowy filtr',
                type: 'text',
                value: props.newTag,
                onChange: e => props.handleChange(e),
              }),
              rce(
                'a',
                {
                  href: '#',
                  className: 'button',
                  onClick: e => props.addNewTag(e),
                },
                '+',
              ),
            ),
          );
        const DefaultPagesList = (props) => {
          const eL = this.navElementsList;
          const { updateCurrentPage } = props;
          return rce(
            'div',
            null,
            rce(NavButton, { elData: eL.global, updateCurrentPage }),
            rce(NavDropdown, { elData: eL.index, updateCurrentPage }),
            rce(NavDropdown, { elData: eL.upcoming, updateCurrentPage }),
            rce(NavButton, { elData: eL.link, updateCurrentPage }),
            rce(NavDropdown, { elData: eL.stream, updateCurrentPage }),
            rce(NavButton, { elData: eL.entries, updateCurrentPage }),
          );
        };
        const Nav = props =>
          rce(
            'div',
            { className: 'rbl-block wblp-nav' },
            rce(DefaultPagesList, { updateCurrentPage: props.updateCurrentPage }),
            rce(NewTagContainer, {
              addNewTag: props.addNewTag,
              handleChange: props.handleChange,
              newTag: props.newTag,
            }),
            rce(TagList, {
              filteredTags: props.filteredTags,
              updateCurrentPage: props.updateCurrentPage,
              removeTag: props.removeTag,
            }),
          );
        class Main extends rc {
          constructor(props) {
            super(props);
            this.state = {
              info: {
                isOn: false,
                filteredTags: [],
              },
              newTag: '',
              pageDetails: {
                pageId: '',
                pageTitle: '',
              },
              showPageOptions: false,
            };
            this.addNewTag = this.addNewTag.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.removeTag = this.removeTag.bind(this);
            this.updateCurrentPage = this.updateCurrentPage.bind(this);
          }
          addNewTag(e) {
            e.preventDefault();
            const fT = this.state.info.filteredTags;
            const nT = this.state.newTag.toLowerCase();
            if (!/^[a-z\d]{2,50}$/g.test(nT) || fT.includes(nT)) return;
            this.setState(
              prevState => ({
                info: { ...prevState.info, filteredTags: [...prevState.info.filteredTags, nT] },
                newTag: '',
              }),
              () => setValue('info', this.state.info),
            );
          }
          handleChange(e) {
            const { target } = e;
            const isCheckbox = target.type === 'checkbox';
            const value = isCheckbox ? target.checked : target.value;
            if (isCheckbox) {
              this.setState(
                prevState => ({
                  info: { ...prevState.info, isOn: value },
                }),
                () => setValue('info', this.state.info),
              );
            } else {
              this.setState({ newTag: value });
            }
          }
          removeTag(e, tagToRemove) {
            e.preventDefault();
            const updatedFilteredTags = removeItemFromArray(
              tagToRemove,
              this.state.info.filteredTags,
            );
            if (
              !confirm(`Czy chcecz usunąć tag ${tagToRemove} (oraz jego opcje) z listy filtrów?`) ||
              !updatedFilteredTags
            ) {
              return;
            }
            this.setState(
              prevState => ({
                info: { ...prevState.info, filteredTags: updatedFilteredTags },
              }),
              () => {
                setValue('info', this.state.info);
                deleteValue(`settingstag${tagToRemove}`);
              },
            );
            if (this.state.pageDetails.pageId === `tag${tagToRemove}`) {
              this.setState({
                pageDetails: {
                  pageId: '',
                  pageTitle: '',
                },
                showPageOptions: false,
              });
            }
          }
          updateCurrentPage(e, pageId, pageTitle) {
            e.preventDefault();
            if (this.state.pageDetails.pageId === pageId) return;
            this.setState({ pageDetails: { pageId, pageTitle }, showPageOptions: true });
          }
          componentDidMount() {
            getValue('info', false).then((resp) => {
              if (!resp) return;
              this.setState({ info: resp });
            });
          }
          render() {
            const {
              pageDetails, info, newTag, showPageOptions,
            } = this.state;
            return rce(
              'div',
              { className: 'wblp-maincontainer' },
              rce(Nav, {
                newTag,
                filteredTags: info.filteredTags,
                handleChange: this.handleChange,
                removeTag: this.removeTag,
                updateCurrentPage: this.updateCurrentPage,
                addNewTag: this.addNewTag,
              }),
              rce(Options, {
                isOn: info.isOn,
                pageDetails,
                showPageOptions,
                handleChange: this.handleChange,
              }),
            );
          }
        }
        ReactDOM.render(
          rce(Main, null),
          document.querySelector('#site .grid-main.m-reset-margin > div:not(.nav):not(.tdivider)'),
        );
      },
      addCss() {
        const style =
          '<style type="text/css">' +
          `.wblp-maincontainer {
            display: grid;
            grid-template-columns: 20% auto;
          }` +
          `.wblp-nav {
            margin-bottom: 0;
          }` +
          `.wblp-navelement {
            display: block;
            cursor: pointer;
            font-weight: 700;
            font-size: 1.5rem;
            padding: 10px 13px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }` +
          `.wblp-navelement + div a {
            font-size: 1.2rem !important;
            padding: 8px 13px 8px 15px !important;
          }` +
          `.wblp-navelement.wblp-showsub + div {
            display: block !important;
          }` +
          `.wblp-navinputcontainer {
            display: grid;
            grid-gap: 3px;
            grid-template-columns: 1fr auto;
            padding: 0px 3px;
            margin: 5px 0px;
          }` +
          `.wblp-input {
            margin: -1px 0;
            padding: 0 5px !important;
          }` +
          `.wblp-navtag {
            display: grid;
            grid-template-columns: 1fr 17px;
          }` +
          `.wblp-navtag > a::before {
            content: '#';
          }` +
          `.wblp-navtag > .fa {
            font-size: 1.7rem;
            margin-top: 9px;
            opacity: 0;
            cursor: pointer;
          }` +
          `.wblp-navtag:hover > .fa {
            opacity: 1;
          }` +
          `.wblp-scriptoptionscontainer {
            border-bottom: 1px solid #222222;
          }` +
          `.wblp-pageoptionscontainer {
            border-top: 1px solid #222222;
            border-bottom: 1px solid #222222;
          }` +
          `.wblp-savebuttoncontainer {
            border-top: 1px solid #222222;
            text-align: right;
          }` +
          `.wblp-space {
            padding: 10px 10px 0px 10px;
          }` +
          `.wblp-maincontainer h4,
          .wblp-optionscontainer > div {
            margin-bottom: 0;
          }` +
          `.wblp-maincontainer .row {
            margin: 2px 0px;
          }` +
          `.wblp-h4 {
            font-size: 1.5rem;
            border: none;
          }` +
          `.wblp-inline {
            vertical-align: text-bottom !important;
            display: inline-block;
            min-width: 175px;
          }` +
          `.wblp-select {
            background: #2c2c2c;
            border-radius: 2px;
            color: #dedede;
            border: 1px solid #444;
          }` +
          `.wblp-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }` +
          `.wblp-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, 25%);
          }` +
          `.wblp-gridaction {
            display: grid;
            grid-template-columns: 1fr 100px;
            grid-gap: 5px;
          }` +
          `.wblp-gridfilterlist {
            padding: 3px;
            text-align: justify;
          }` +
          `.wblp-gridfilterlist > *::after {
            content: ', ';
          }` +
          `.wblp-gridfilterlist > *:last-child::after {
            content: '';
          }` +
          '</style>';
        document.head.insertAdjacentHTML('beforeend', style);
      },
      initialize() {
        wykop.params.method = 'blacklistplus';
        this.addCss();
        document.querySelector('#site .grid-main.m-reset-margin .tdivider').remove();
        document
          .querySelector('#site .grid-main.m-reset-margin > div:not(.nav):not(.tdivider)')
          .classList.remove('rbl-block');
        this.main();
      },
    },
    addButtonToMenu() {
      const lastMenuElement = document.querySelector('#nav li.logged-user.ddC ul > li:last-child');
      if (lastMenuElement) {
        const blackListMenuButton =
          '<li><a href="https://www.wykop.pl/ustawienia/blacklistplus/"><i class="fa fa-file"></i><span>&nbsp;&nbsp;blacklist +</span></a></li>';
        lastMenuElement.insertAdjacentHTML('beforebegin', blackListMenuButton);
      }
    },
    addButtonToNavbar(className) {
      const settingsNavbar = document.querySelector('.nav.bspace.rbl-block > ul > li:last-child');
      const blackListOptionButton = `<li class="${className}"><a href="https://www.wykop.pl/ustawienia/blacklistplus/"><span>BlackList+</span></a></li>`;
      if (className) {
        document
          .querySelector('.nav.bspace.rbl-block > ul > li:first-child')
          .classList.remove('active');
      }
      settingsNavbar.insertAdjacentHTML('afterend', blackListOptionButton);
    },
    isAllowedPage({ action, method, settings }) {
      let page;
      switch (action) {
        case 'settings':
          {
            const currPage = window.location.pathname.match(/\/ustawienia\/blacklistplus/);
            page = currPage ? 'blacklist' : 'button';
          }
          break;
        case 'index':
          page = method === 'index' && settings.view === 'list' ? 'filter' : 'none';
          break;
        case 'upcoming':
        case 'link':
        case 'tag':
        case 'entries':
          page = method === 'index' ? 'filter' : 'none';
          break;
        case 'stream':
          {
            const currPage = ['index', 'active', 'hot'].includes(method);
            page = currPage ? 'filter' : 'none';
          }
          break;
        default:
          page = 'none';
          break;
      }
      return page;
    },
    checkSort({
      action, method, settings, tag,
    }) {
      let sort;
      switch (action) {
        case 'index':
          sort = settings.hp_sort;
          break;
        case 'upcoming':
          sort = settings.wykopalisko_sort;
          break;
        case 'tag':
          sort = tag;
          break;
        default:
          sort = method;
          break;
      }
      return sort;
    },
    checkTag({ action, ajaxAutoRefresh }) {
      if (action === 'tag') {
        return ajaxAutoRefresh.url
          .match(/recent\/tag\/[0-9a-zA-Z]*\//)[0]
          .substr(11)
          .replace('/', '');
      }
      return '';
    },
    initialize() {
      if (wykop.params.logged) {
        wykop.params.tag = this.checkTag(wykop.params);
        wykop.params.sort = this.checkSort(wykop.params);
        switch (this.isAllowedPage(wykop.params)) {
          case 'filter':
            this.filter.initialize();
            break;
          case 'blacklist':
            this.option.initialize();
            this.addButtonToNavbar('active');
            break;
          case 'button':
            this.addButtonToNavbar('');
            break;
          default:
            break;
        }
        this.addButtonToMenu();
      }
    },
  };
  wblp.initialize();
}());
