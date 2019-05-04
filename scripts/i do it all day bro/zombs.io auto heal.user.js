// ==UserScript==
// @name        zombs.io auto heal
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://zombs.io/
// @grant        none
// ==/UserScript==
(function() {
	heal =  document.getElementsByClassName('hud-shop-item')[9];
	petHeal = document.getElementsByClassName('hud-shop-item')[10];
	useHeal = document.getElementsByClassName('hud-toolbar-item')[4];
	usePetHeal = document.getElementsByClassName('hud-toolbar-item')[5];
	healthBar = document.getElementsByClassName('hud-health-bar-inner')[0];
	up = new Event('mouseup');
	healLevel = 70

	HEAL = function(){
		heal.attributes.class.value = 'hud-shop-item';
		petHeal.attributes.class.value = 'hud-shop-item';
		useHeal.dispatchEvent(up);
		usePetHeal.dispatchEvent(up);
		heal.click();
		petHeal.click();
	};

	script = function(e){
		if(e.keyCode == 82){
			HEAL();
		}
	};
	document.addEventListener('keydown',function(e){
		script(e);
	});
	observer = new MutationObserver(function(mutations) {
	    mutations.forEach(function(mutationRecord) {
	        if(parseInt(mutations[0].target.style.width) < healLevel){
	        	HEAL();
	        }
	    });
	});
	observer.observe(healthBar, { attributes : true, attributeFilter : ['style'] });
})();

})();