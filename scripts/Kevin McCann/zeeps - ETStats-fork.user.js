// ==UserScript==
// @name         zeeps - ETStats-fork
// @namespace    http://tampermonkey.net/
// @version      0.5-fork
// @description  Client-side data gathering for eternitytower.net as well as public drop gathering for etstats.com/debug.html
// @author       Mefail ft. Julepalme (w/ minor edits by zeep)
// @grant        none
// @run-at       document-idle
// @match        http://eternitytower.net/*
// @match        https://eternitytower.net/*

// ==/UserScript==
(function() {
    'use strict';

    window.etstats = {
      cache: true, // cache between visits
      logToServer: true, // send to etstats.com/debug.html
      rewardsStore: {},
      usersStore: {},
      enemiesStore: {}
    }

    let msgCount = 0; // NOTE: Can Bug. The server will send [up to] 25 messages for your battle log.  If you have a shorter, or no, battle log, this will skip the first 25 battles...
    window.etstats.rewardsStore = window.etstats.cache ? JSON.parse(localStorage.getItem('etstats_rewards')) : {}; // mutable
    window.etstats.usersStore = window.etstats.cache ? JSON.parse(localStorage.getItem('etstats_users')) : {}; // mutable
    window.etstats.enemiesStore = window.etstats.cache ? JSON.parse(localStorage.getItem('etstats_enemies')) : {}; // mutable

    const lookupUser = (owner) => window.etstats.usersStore[owner] && window.etstats.usersStore[owner].username || owner

    // because this should be native
    Object.filter = (obj, predicate) =>
      Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {} );


    window.etstats.clear = () => {
      localStorage.removeItem('etstats_users');
      localStorage.removeItem('etstats_rewards');
    };

    window.etstats.loot = (user) => {
      if (user === undefined) user = localStorage.getItem('Meteor.userId');
      const username = lookupUser(user) || null
      const userId = Object.keys(window.etstats.usersStore).filter(key => window.etstats.usersStore[key].username === username)[0]

      if (!user || !username || !userId || !window.etstats.rewardsStore[userId] || !Object.keys(window.etstats.rewardsStore[userId]).length) {
        console.info(`ETStats: No loot found${user && ` for ${username}` || ''}.`)
      } else {
        const rewards = window.etstats.rewardsStore[userId]
        console.group(`ETStats: Loading ${username}'s rewards...`)
        Object.keys(rewards).forEach(reward => {
          console.info(`ETStats: ${rewards[reward]} ${reward}`)
        })
        console.groupEnd();
      }
    }

    Meteor.connection._stream.on('message', message => {
    	const frame = JSON.parse(message)

      // watch for your own id
      if(frame.msg === 'added' && frame.collection === 'users' && frame.id && frame.fields && frame.fields.username)	{
        if (!window.etstats.usersStore[frame.id]) window.etstats.usersStore[frame.id] = { username: frame.fields.username }

        console.info(`ETStats: Welcome, ${frame.fields.username}.`)
      }

      // watch for grouping
      else if(frame.msg === 'added' && frame.collection === 'combat' && frame.fields && frame.fields.owner && frame.fields.username)	{
        if (!window.etstats.usersStore[frame.fields.owner]) window.etstats.usersStore[frame.fields.owner] = { username: frame.fields.username }
        window.etstats.usersStore[frame.fields.owner].foughtBoss = frame.fields.foughtBoss
        window.etstats.usersStore[frame.fields.owner].towerContributionsToday = frame.fields.towerContributionsToday
        console.info(`ETStats: ${frame.fields.username} has${frame.fields.foughtBoss ? '' : `n't`} fought boss and has done ${frame.fields.towerContributionsToday} officials.`)
        window.etstats.displayBoss()
        window.etstats.displayCooldowns()
      }

      // watch for battle rewards
    	else if(frame.msg === 'added' && frame.collection === 'battles' && frame.fields && frame.fields.finalTickEvents) {
        if (msgCount >= 25) {
          let rewards = frame.fields.finalTickEvents.filter(reward => ['item', 'gold'].includes(reward.type))
          rewards.forEach(reward => {
            if (!window.etstats.rewardsStore[reward.owner]) window.etstats.rewardsStore[reward.owner] = {}
            window.etstats.rewardsStore[reward.owner][reward.itemId || reward.icon] = (window.etstats.rewardsStore[reward.owner][reward.itemId || reward.icon] || 0) + reward.amount

            console.info(`ETStats: ${lookupUser(reward.owner)} received ${reward.amount > 1 ? reward.amount : 'a'} ${reward.itemId || reward.icon}`)
          })

          if (frame.fields.win && window.etstats.logToServer) ETStatsLog(frame) // log to etstats here
        }

        msgCount++;
    	}

      // look for enemy stats
      else if (frame.id && frame.id.includes('battles') && frame.fields && frame.fields.value) {
        let value = JSON.parse(frame.fields.value) || {}

        if (value.enemies && value.enemies.length) {
          value.enemies.forEach(enemy => {
            const identifier = (value.floor && value.room && `-f${value.floor}r${value.room}`)
              || (value.level && value.wave && `-PQ${value.level}.${value.wave}`)
              || '-unknown' // needs testing, how do we recognize a boss?  ask jule.
            const enemyName = `${enemy.icon}${identifier}${value.isExplorationRun ? '-exploration' : ''}`
            if (!window.etstats.enemiesStore[enemyName]) {
              window.etstats.enemiesStore[enemyName] = {}

              if (enemy.stats && Object.keys(enemy.stats).length) {
                Object.keys(enemy.stats).forEach(stat => {
                  window.etstats.enemiesStore[enemyName][stat] = Math.round(enemy.stats[stat] * 100) / 100
                })
              }

              console.info(`ETStats, new enemy found! ${enemyName}`, window.etstats.enemiesStore[enemyName])
            }
          })
        }}
    }


    function ETStatsLog (data) {
      const socket = new WebSocket(`${document.location.protocol === 'https:' ? 'wss' : 'ws'}://ws.etstats.com`);

      socket.addEventListener('open', event => {
        socket.send(JSON.stringify(data))
        socket.close()
      })
    }

    if (window.etstats.cache) {
      window.onbeforeunload = () => {
        localStorage.setItem('etstats_users', JSON.stringify(window.etstats.usersStore))
        localStorage.setItem('etstats_rewards', JSON.stringify(window.etstats.rewardsStore))
        localStorage.setItem('etstats_enemies', JSON.stringify(window.etstats.enemiesStore))
      }
    }
  })
}