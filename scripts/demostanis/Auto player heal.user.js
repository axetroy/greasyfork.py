// ==UserScript==
// @name         Auto player heal
// @namespace    https://www.youtube.com/channel/UCC4Q28czyJPjSPtYQerbPGw
// @version      v1.3.1
// @description  Script made by demostanis, https://discord.gg/eAYrFvy
// @author       demostanis
// @match        http://zombs.io/*
// @grant        none
// ==/UserScript==

(() => {
	const onEnterWorld = () => {
		const script = document.createElement("script")
		script.src = "https://cdn.jsdelivr.net/gh/demostanis/auto-player-heal@master/index.min.js"
		script.onload = e => console.log("%cAuto player heal by demostanis, https://discord.gg/eAYrFvy",
			"font-size: 15px; padding: 10px; color: #eee; background-color: #030303; border-radius: 5px;")
		document.body.appendChild(script)
	}
	if (Game.currentGame.world.inWorld) {
		onEnterWorld()
	} else {
		Game.currentGame.network.addEnterWorldHandler(onEnterWorld)
	}
})()
