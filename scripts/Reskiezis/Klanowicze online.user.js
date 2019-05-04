// ==UserScript==
// @name         Klanowicze online
// @author       Reskiezis
// @description  Dodatek do gry Margonem
// @version      1.3
// @match        http://*.margonem.pl/
// @match        http://*.margonem.com/
// @grant        none
// @namespace    https://greasyfork.org/users/233329
// ==/UserScript==

((Engine, hero, $) => {
  'use strict'

  const createStorage = () => {
    let storage = {}

    try {
      storage = JSON.parse(
        localStorage.getItem('klanowicze_online')
      )
    } catch(error) {}

    //assigns object to storage
    const setStorage = object => {
      const modifiedStorage = {
        ...storage,
        ...object
      }

      storage = modifiedStorage

      localStorage.setItem(
        'klanowicze_online',
        JSON.stringify(modifiedStorage)
      )
    }

    const getStorage = () => ({
      ...storage
    })

    return { setStorage, getStorage }
  }

  const {
    setStorage,
    getStorage
  } = createStorage()

  let state = {
    wasMembersHidden: false,
    top: '10px',
    left: '200px',
    ...getStorage()
  }

  //assigns object to state
  const setState = object => {
    state = {
      ...state,
      ...object
    }
  }

  //assigns object to state and storage
  const updateMemory = object => {
    setState(object)
    setStorage(object)
  }

  //Start UI

  const appendCorners = element => {
    const cor1 = document.createElement('div')
    Object.assign(cor1.style, { background: 'url(img/tip-cor.png) no-repeat 0px 0px', position: 'absolute', top: '-6px', left: '-6px', width: '35px', height: '23px' })
    const cor2 = document.createElement('div')
    Object.assign(cor2.style, { background: 'url(img/tip-cor.png) no-repeat -35px 0px', position: 'absolute', bottom: '-6px', right: '-6px', width: '35px', height: '23px' })
    element.appendChild(cor1)
    element.appendChild(cor2)
  }

  const container = document.createElement('div')
  container.id = 'klanowicze-online'
  container.classList.add('default-cursor')
  Object.assign(container.style, {
    boxSizing: 'border-box',
    position: 'absolute',
    left: state.left,
    top: state.top,
    border: '3px gold double',
    color: '#eeeeee',
    width: '210px',
    backgroundColor: 'black',
    fontSize: '16px',
    zIndex: 500
  })

  const title = document.createElement('div')
  title.textContent = 'Klanowicze online'
  Object.assign(title.style, {
    fontSize: '1.1em',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: '1px solid gold',
    padding: '2px'
  })
  container.appendChild(title)

  const membersTable = document.createElement('table')
  Object.assign(membersTable.style, {
    fontSize: '0.7em',
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed'
  })

  const membersTableWrapper = document.createElement('div')
  membersTableWrapper.hidden = state.areMembersHidden
  membersTableWrapper.style.padding = '1px'

  membersTableWrapper.appendChild(membersTable)
  container.appendChild(membersTableWrapper)

  const hideMembersButton = document.createElement('div')
  hideMembersButton.classList.add('do-action-cursor')
  hideMembersButton.textContent = state.areMembersHidden
    ? 'Rozwiń'
    : 'Zwiń'
  Object.assign(hideMembersButton.style, {
    fontSize: '0.8rem',
    textAlign: 'center',
    borderTop: '1px solid gold'
  })
  container.appendChild(hideMembersButton)

  appendCorners(container)

  $(container).draggable({
    cancel: 'table', //can't drag membersTable
    stop: function(){
      const { top, left } = container.style
      updateMemory({
        top,
        left
      })
    }
  })

  //style table rows and cells
  const tableStyle = document.createElement('style')
  tableStyle.textContent = `
    .ko-row {
      border: solid;
      border-width: 1px 0;
      border-color: #5d5006;
      height: 1.6em;
    }
    .ko-row:hover {
      background: #3c3c16;
    }
    .ko-row:first-child {
      border-top: none;
    }
    .ko-row:last-child {
      border-bottom: none;
    }
    .ko-row > * {
      vertical-align: middle;
    }

    .ko-add-to-group-cell, .ko-nick-cell {
      user-select: none;
    }
    .ko-add-to-group-cell:hover, .ko-nick-cell:hover {
      color: #eaeb74;
    }

    .ko-add-to-group-cell {
      text-align: center;
      width: 12px;
    }

    .ko-map-cell {
      text-align: right;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `
  document.body.appendChild(tableStyle)

  //End UI

  const startWritingMessageTo = nick => {
    const chatInput = document.querySelector(
      '.chat-tpl .input-wrapper input'
    )

    chatInput.value = `@${nick.replace(/ /g, '_')} `
    chatInput.focus()
  }

  const chatWith = nick =>
    () =>
      startWritingMessageTo(nick)

  const addToGroup = id =>
    () =>
      window._g(`party&a=inv&id=${id}`)

  const fetchMembers = () =>
      new Promise(resolve => {
        //super API bulwo
        const clan = Engine.clan
          ? { ...Engine.clan } //shallow copy
          : Engine.clan

        if(!clan)
          Engine.clan = {
            updateMembers(){}
          }

        _g(`clan&a=members`, ({ members2 }) => {
          Engine.clan = clan

          if(!members2){
            resolve(null)
            return
          }

          resolve(members2)
        })
      })

  // [ id, nick, lvl, prof, map, x, y, ?, onlineStatus, icon ]
  const MEMBER_TUPLE_LENGTH = 10
  const renderOnlineMembers = members => {
    if(members === null)
      return

    const membersTableBody = document.createElement('tbody')

    let onlineMembersCount = 0
    let wasHeroCounted = false
    for(let i = 0; i <= members.length; i += MEMBER_TUPLE_LENGTH){
      const onlineStatus = members[i+8]
      if(onlineStatus !== 'online')
        continue

      onlineMembersCount++

      const nick = members[i+1]
      if(nick === hero.nick){
        wasHeroCounted = true
        continue
      }

      const id = members[i]
      const lvl = members[i+2]
      const prof = members[i+3]
      const map = members[i+4]
      const x = members[i+5]
      const y = members[i+6]

      const row = membersTableBody.insertRow()
      row.classList.add('ko-row')

      const addToGroupCell = row.insertCell()
      addToGroupCell.textContent = '+'
      addToGroupCell.dataset.tip = 'Dodaj do grupy'
      addToGroupCell.classList.add('ko-add-to-group-cell', 'do-action-cursor')
      addToGroupCell.addEventListener('click', addToGroup(id))

      const nickCell = row.insertCell()
      nickCell.textContent = `${nick} (${lvl}${prof})`
      nickCell.classList.add('ko-nick-cell', 'do-action-cursor')
      nickCell.addEventListener('click', chatWith(nick))

      const mapCell = row.insertCell()
      mapCell.textContent = map
      mapCell.dataset.tip = `${map} (${x},${y})`
      mapCell.classList.add('ko-map-cell')
    }

    if(!wasHeroCounted)
      onlineMembersCount++

    title.dataset.tip = onlineMembersCount === 1
      ? 'Jesteś tylko ty'
      : `${onlineMembersCount} klanowiczów (łącznie z tobą)`

    if(membersTable.tBodies.length === 0){
      membersTable.appendChild(membersTableBody)
      return
    }

    membersTable.replaceChild(membersTableBody, membersTable.tBodies[0])
  }

  const fetchAndRenderOnlineMembers = () =>
    fetchMembers().then(renderOnlineMembers)

  let fetchMembersInterval = null
  const startMembersFetching = () => {
    fetchAndRenderOnlineMembers()
    fetchMembersInterval = setInterval(fetchAndRenderOnlineMembers, 10000)
  }

  const stopMembersFetching = () => {
    clearInterval(fetchMembersInterval)
  }

  const handleHideMembersButtonClick = () => {
    const modifiedAreMembersHidden = !state.areMembersHidden
    membersTableWrapper.hidden = modifiedAreMembersHidden
    updateMemory({
      areMembersHidden: modifiedAreMembersHidden
    })

    if(modifiedAreMembersHidden){
      stopMembersFetching()
      hideMembersButton.textContent = 'Rozwiń'
      return
    }

    startMembersFetching()
    hideMembersButton.textContent = 'Zwiń'
  }

  hideMembersButton.addEventListener('click', handleHideMembersButtonClick)

  const getDoggoImage = () => {
    const doggo = new Image
    doggo.src = 'https://i.imgur.com/jti8ksH.png'
    doggo.style.width = '100%'
    return doggo
  }

  const loadQueuePush = fn => {
    if(Engine.allInit){
      fn()
      return
    }

    setTimeout(loadQueuePush, 2000, fn)
  }

  loadQueuePush(() => {
    if(!hero.clan)
      return

    if(state.areMembersHidden || startMembersFetching(),
       hero.clan.id === 13757 &&
       Engine.worldName === 'hutena')
      container.replaceChild(getDoggoImage(), title)

    document.body.appendChild(container)
  })

})(window.Engine, window.Engine.hero.d, window.$)