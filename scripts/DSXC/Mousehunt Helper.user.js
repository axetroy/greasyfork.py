// ==UserScript==
// @name        Mousehunt Helper
// @namespace   DSXC
// @description DSXC's Mousehunt helper script.
// @include     http://www.mousehuntgame.com/*
// @include     https://www.mousehuntgame.com/*
// @include     http://apps.facebook.com/mousehunt/*
// @include     https://apps.facebook.com/mousehunt/*
// @version     15.1
// @revision - Removed the need for the travel system as there is no longer a need to determine cheapest route.
// @revision - Added travel path to Hollow Heights zone and regions.
// @revision - Added cheese patterns for Fungal Cavern.
// @revision - Added the charm pattern for Fungal Cavern.
// @revision - Added cheese patterns for Toxic cheese.
// ==/UserScript==
//===============================================================================

var SCRIPT = {
	scripturl:   'https://greasyfork.org/scripts/3770-mousehunt-helper/code/Mousehunt%20Helper.user.js',
	version:     '15.1',
	versionurl:  'https://greasyfork.org/scripts/3770-mousehunt-helper/code/Mousehunt%20Helper.meta.js',
	lastupdate:  DSXC_getValue('Update - Script', 'never')
}

var STATE_OFF = 0, STATE_SOUND = 1, STATE_MESSAGE = 2;
var SETTINGS = {
	horn:        0,
	king:        0,
	cheese:      0,
	washed:      0,
	season:      0,
	tourney:     0,
	direct:      false,
	showall:     false,
	timers:      true,
	buttons:     false,
	auto:        false,
	length:      5
}

var STATE = {
	title:        document.title,
	ready:        false,
	hash:         '',
	level:        -1,
	location:     -1,
	trap:         -1,
	base:         -1,
	cheese:       -1,
	route:        null,
	maintenance:  false,
	king:         false,
	redirect:     '',
	baseurl:      location.protocol + '//www.mousehuntgame.com/',
	hornstate:    0, // 0 = countdown, 1 = ready, 2 = sounding
	userobject:   null,
	errorshown:   false,
	tourney:      -1,
	lastjournal:  0
}

var IMAGE = {
	config:     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oGDwceLTyDBTAAAAS1SURBVDjLTZRPaFRXFMa/c++dNzOdN2PrpCYTpw1xFUKtlHak2diq2KabGgoKLkKlK4m0QlpFQSmktG6qWFrdZNGKSCENWXRRRIjBSEi6SCFiQRo1VSfppPkzmcy/9959954unJHe1YVzOOd+3/fjwloLZoYxBs1TLpfBzIKZFQCEYSistTFjzBZmlswcN8wxZpYAEHh1Ya2VAKCIiIwxpJSyzJycnJzc4bruHAAeGxt7f2FhYVZKuWqtfVEIUfl95NLQ0r07+yxIBvXK01+Hv/kuEo3daQw3goh4enr6lXPnzv14/fr1pdnZ2StEBCLiu3fvto+Pj+cvXrz4W7lc0QCEXf5j8MAbLW+/uyPMvdcd+8hM/3D75++//Dj0gtBaC8HMuHbt2qeHDh062tra6haLxftNKVrr5M6dO2V3d/eBy1cu31rZqERUbQXVB1Pw/n3C9eWn7DoSxcLjd5wXYmytJQEglkgkSpVKBY7jIAzDDiJqGtqmtUYmk7Fevb5ttS4Cy8xBKOEHTH4AspbBEJKZBRFBAfA9z1sKwxCxWIxbW1v3Dw0NXWppaXmqlDqRTqfZGENBoP1a4cEWEwRSg6ANwJZhLAEwHgABwCoi4tOnT5cWFxeRy+Vo7969XKvVPiuXy8hms1BK8c2bN0UY6uWY5EQt0MIHQYcMywKWCUJG4kQUGmNIAMD58+dv5PP5G1evXoXv+5RKpZDNZtHwVxQKhXsnBr/Y15JOUhAEyg8YgRbQAWAsgYQAABARC2tt0lorT548+UFfX9+Rqampejweh5SSJiYmKBqN1vr7+z98dXumSiBlghBaCw4CwA/AbAWIwyoAWGshANSIyNFaq8HBwV/a2trmiYiEEOy6LjKZzGh3d/cCM2Pb9s4nNVDFDyx8X7Pva6rUV2HSrxUAQAgBQUSGiDaVUpGzZ89mlVJZIQRLKSkSiWBtbc00tkeIaNN5q//o7za5sdHVQ49aOvH365//9cmxwW+bAxUzN/VbAJxIJDwpJQFg13VpZWVlrVEPjTFKCHFr8s/C7f37j/StzMz4/tLSwXiUKsxMAJ6xAyAA4FcqFUSjURZCQEoJ13VRKpXKje1MRCERFX3P11IQjDW1f5YW15g5DoABQBARhBAMAJubmyIWi0EpBaUUXNdFtVq1zU+DmQUAVKuVZSklrLW2s7NTArAAiJkhrH3erzzPg+M4cBwHrus2XxhteChso7lcLrtSSpRKpZd2797dS0Q+MztEBCWEgLWWADhhGIpkMomZmRmsr69jz5498H0/x8wJAFoppU+dOnXQdd2jkUgEXV1dYmJioh/AT0TkExFE0x8Alplp69atGB0dRa1WQz6fh9a6DsA0JT18+PB+KpUKHMfh9vZ2hGE41wjtOYdoJO27rqvHx8fVmTNnsGvXLqpWq0in03ki8gBoAGJ0dPTR3NzcvVQqRfPz89ZxnLFGKM9oaV6MMeR5Ho4fP/51sVgciMfjpLVevXDhwpsdHR2bACwRgZkTAwMDX7mue2x1dbXQ29t74PDhw48bdUv/SxANhDAyMvJyoVBwcrlcvaenZ11rTUopMDMTERYWFrYNDw+7SqnSwMDARiaTMU0O/wOkOp5CS37/NAAAAABJRU5ErkJggg==',
	craft:      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oGDwcnBQeyIHAAAAMRSURBVDjLlZNNbxtVFIafOzMZOxM74/FH7DglrkybpIpC0gRSIipFlFSVUlHEAqGKX4AEEhIr+AOAWLBB3cGGFUJi2W0RCkYEDJRClMgB1RX14BgZTzJ27Ik9l0XdEpmkdV/prO65j857PgTHS0xPT5+3LOtKvV4/W61WZwzD2Aaub21tfeH7fgGQvZ/UhwBjlmWtRKNRI5VKXZ2dnQ07jvPE6urqBUVR3ozFYpdt2/4skUi0G43Gf1XQh8Lh8Fw2m/1paWmJUChEJBIhl8vJcrm8nc/nJw7nKv0A6/V6xzRNKpWKrNVq0nEcFhcXhWVZp+bn53f6tfxAUsodz/M80zRXACGEkKqqkslkRDKZNJrN5sVyufwpgEafsm37+87BLgvPLEshBIqiUK1W5dTUlKhUKmtACHAf2cNBDfbbnDqR1DdCAVX721WYmT0n6nXX8zxPn5yc9HVdVzzPI5/Pv9/PULTsWPDueDKY2Gu0RX7TfTedTl8vlUqV0dHRl8Ph8MfpdFpOTEwQj8fFoyyrschAaXJ8KO5LKW4WmhvAe6VSCQDXdW8MDw8D4HmeWF9fX3vYUJSwoX51fi5yRlMU/txpNop/tTKHl9nzvEqr1SqYpvmibdv5XC538ViaEVQ+emk5IV95YcS/8LQlgVf/1wvtnkHTNAfu7/SRloO68sHl5+JvBXRF+h0pfvuj/gnweW9eu90GwHGcg2MvRdN4/dK52LWRaEAi4dtbNXez2EgBjX7Wq/dSriyfjV4bTw3KwIDCnfK+2Cw2FvuF9QIzz86YX06dHJIBXWGv0Ra5X5x3gE0eQ/d7OPbkieDtudNhf9jQ+Mc9EN/crG3st/wPuxcA4B+KTjeOBBpWWP1x4UzEH4npYtftsPZz7eC23ZwGgl0XC8BTgAfsA7uAC9wF7gB7D4C6xhvZtDGSSQblPVhV/Pq7u9IFpYHngThQB74Git23NjAGnOwC94CqpioiNmSoslhuUii64ta2+wPwGnC127/vgI1uVb0qHGX77aFBpWSGVFdVuNFd4NNdu4+tfwEQ0ipmhXPGJwAAAABJRU5ErkJggg==',
	potion:     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oGDwciL6F+HeMAAAOLSURBVDjLhdRPbFRVFMfx77nv37xOHcoUOxApJGoRjYAaIKiRQCQYUwy6YePCpP5JCC5c6E42EBOjBKMLSNyJLowkRiMk/ktEkNjyJyKNWBcISFsozoxtp+3MvPfuPS6ABLQDZ//75NxzT47Qok58+drShYu6dxmR+4zQJurEuTRLm8lotVrZ92DvB3tmy/mtwLHhQbqKfq8XRKi1qEvRLGHi8oXuC+XsLLBn17f9vL5xzU05bzbsrYNHHljxxEuD7TO/C3gifogXFTBBHsXXRRt2Ll/2bJ+/bf3KH/6bldnAz44N6uqehRrUL5E6K+oyrLNkznLx71GSwhJsHT4+da6wv29T7casmQ1UBAPioqKoCVEvwnkx1svR9NrJBRG1pmV/36ba3r17uS04Upl4+7dzI4w3lXIaM5bkGEtCLjVCtG0htWqN0XK1D2Dr1q2tn6yq7DhwZOXau+86XirmtaMtlkaW0cgyUuew1vJPvU6aWc2ayNen/iiVOude2f7M2tk7FBGWloqfFGJfS4V2cQpj9YRyklFJLJOpBYR85FOIfVb1LH73Rux/He7+bmD1igXFgZFcRD6MODMxw8/lcVSERpJSrydMVibJpqZ5qDPWl5f1yIGhv+a9v2VDZdYO58bR5pqgPXMKWIXTE1OIMRgRPBEQwSJMp5bvz1dkuNHg/q6OLS0XuxAFT+eCgKJv8CKPh+OAVBUL1EPDVGioepbLeUM1SfmlOqnrOosrb/HLulg8T5xenWfB95gXBcyPArpyAZ1RQFsYIkZQYGhyWuLA3ApkGKfqGyE0BuTqkK1zOKfotS29XqlTgKAlOJXYA75aVJXUOYwIqsqCfEwpzoGC1eusUoojtU5/bQlemap/3mwkMtZIUGB+nANgJrMkziECmXMgoAqP39khI7X64ZbgG0+tOTk5k/SPVcY1EKN3hD5WlVqSEvsec8KAzCoCap3Te+NccvTspY9agjsPHuXEaPm5IEnkdGUcX0TbfY/MOS7WpinXG1hrdTq1smN5jwyVJ17c19c7c7trI9ve+3DVxnVrB0aMaBz4Mt5MSZ1jqDzO8MS0bu7ukuqf59/c/vzmdwALuFvdw/D4N19Vp+LCp490dy8JRebn0aBohC4jjcfyQf+Ph356ZferL3xx7Yf1Gtr6HgJGxPiqLjH3LO94dP2Tbb5v5NjhQ436mZNVIAZSILtpj4B/ATVLqIW4cZIuAAAAAElFTkSuQmCC',
	refresh:    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHAQYoC7vvJQwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADk0lEQVQ4y52UX0xbVRzHP+f+K7ctLZYNDMPq6GRZxGyJ4MSJE3RkS0zUB+bDYrLsaeqDj5qYmBjjgwu+6ZuJvmwPLD4Q9WHGMAY4I7rMOHBKgcEK0qKFlraU3tue44O0KQjT+H065+acz/nd3+/7+8F/0Lm2Wv632pvs8lK0wKGesH0KMMofIwFR+3QDJwBzp/vGtr1o32ucef+N831KyaPJ+TuNH30+9BkwCmQBzjxz+PzhcOjC8Vu/DLx3Lf4akKwG6NuA2o8JR28T8bfE0lRjNrnM1Vj+SjIvhwEXsE4/2ngpMxetDemi7Ug48NTofHYQyFcA24Cy/+xzvR1dx+vtYC12jUViXS4CJYBjYd/R0kqi+b46L4ZtqkaLJ3v3+14HrB0jPNVS90hve+vAwo0R/YNvlz+JraxHJ/50RoGprrBPjt3NpaeT+TsdDwa6dfA4RUm9QffwUuEyiuV/AM92to6nY9HQ/LqKDt5OvTudci8CcSBzN+2iCQrJgrp9K5H/+fFm30s5p6QXMhvCrjFXZ1LuKCArv9xVr/eofPqhUtFlaCb9FTAJ/AEsAQpAKgDW51LON1Pp0qCQUuSlUrWa7AQCW3J4YF+gO5tKU5RwM77xPZC7h7uyl2c3+i2PiUAJvyWageAWoFF0I5apqWJRshmZ3I12f9Dm96XVSVcTWa/PxDQNG7CrfSgeaPR7jaIUhi4ov7ab4uk8gFNS2pqh636f33RgTVVHKBxXZWRJKk0TnIgEn9jB9NuldF0PeTwmqZybANYrQFMTKivFjJRSFFzJY032i8Cee9Eifg76vJ4aTdOYz7o/AakK0JVK/RDLjiilcEuSgCVae1vrzpXzUt2a1t+R66/29bztFCSJrCuvzma+ADJbfBhbcxItddZJDZqUEOz1mT11Hs0TXSmMvNzqL00mHQCr78i+TyPhBnGoKfRObHZOvzix+mHGVYNAegvQ1ERpOuVMtjXYr3gMoQkUXuQxIQh9PZ8fAoqA/9n9wUsvPH/y9MTYsLi2kP/y12ThYyBa9mrFNq5UMu2omzcSGxcsyxCmqeMgSuPxwvWqc96NzBrfDQ5g6mgO2jjwW7XFtlTSNkTu+uJ6P0LI7gPBNxcLjAE3yhXsjIQeNrQiqy6J1awzo8tig4Cg2hxtAGKXIgaBDo8ufIWSugJsADT4zLblnNux2Y4Lm32e2kzHv8qoHksH91Qawd5hjlb0F9+teenmFNIUAAAAAElFTkSuQmCC',
	travel:     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oGDwcpBgA4XEQAAANuSURBVDjL3ZRvbBN1GMe/v7te/9H2uLVrV6eOplsIDl2E4DI3s5GBMRsQZ6aJjBA3A0bUF2pIjEGDG4MYEzEmxogJEiM6NQgOjYhTzAwLrgbrFljHAsOxbt3Rdru7ttdr7+7nC2JiE/8EX/J99TzfPM/n1fN9gFtCP36+p6QfPPTszUNe3roWlNIS74P+Tt+f9aHe7X+7R/4LfOztHTXlQX8P7/U9brXZPYm5hd71j+5965/mS4AcgKFjezm3x2NLiom1Pr//NYdzWTNhGOTUPKS0DCUlZvSi+lQ8nvzkuQMn6Pt9W7HjlY9LgUff3MWvaagPaKqyEsRstVmtWyg1Q2AYUEogLUpUN0EEwUXldIoUtKKeySjtfS8e/H50EcaHb/Rg++7DN4CnBvavX9e88QVZnKmlphoCKPJqHi63ixaLOliWJVdikwAMMAyBR/DSMn8luTY9WVAzudcf7Nr/KgC8u+cRPL3vC7CtjaurfV5hH1/mFVgGuHxhHAYlKPMKxCwukOTCFHKKBg4GKOeAmMwS0yhS0zQtgtfXtHFNwPnZqejQ18MTONzfBfaesPc6y5C2O0LhClMv0viVScJxDDTKQKhsQDDUiOtiFDY7oBacyGSyuHNFFbE73JRShtGy6VXtzbW5++8NR5/p/dRghyNThfrVVRMenu8M3Ba0uXgBLsEOPtCIvDyP+PQ4QquacOnCEMrcy+CvqIRpFCEvpQkKCmUtnJPQQhtLda6p7vYRFgC+/Wns97qacsntWd5SURGwatkxqiNILsfOITb2A/yVtXDYdGSVeVDDDkNTAMZCObudUFOHIslIpZcaFiU1wnY/XI9oLI5vzpyPrKwqF60c95BPiFsW01epbgkTh5uHlpvFxV+OYLnvblp9VwORZQmpuRmi5IqYm09J09OzAxenxHcmZ5bOEADo2rQOR7+KAACe7960c9u2+ve8wlU6G1chijIRFy5BlqzY3LEbWr6AkeGzS9dm4+czqnFckTJnjwyOTgDIlxz2hvtqMDQ6dSN2uzoOdPdseSkRH6UcpxOHqwaE+BD5OSqei4z3zc0nB5x2S/b46V81HTD/NXpPdDQhq+QsrRse+LJ9c2vb2G+xxMmTp7/LZHOJjwZH+gFI/+vDPNnZEt75WMtB3oKqv/p11cGbh1E6gVtXfwAxKYLl39hF2gAAAABJRU5ErkJggg==',
	journal:    'data:image/gif;base64,R0lGODlhFAAUAPcAAAAAAP///zQTFCsVFnNRUxYLDBsHCTclKGJXWTQrLVRQUQgGB05MTTk4OVpbW4NqSZZ3UYNpSJd6V4tyVIFkRYBmSZN1VZR8Yop2X2xML31mUZmAa5eAb4NfRWlKNn5cSZiFe3xPO3lQPHZJNmc5KIU8LcdBK3MnGrxCLc1LM8pIMr5EL8RKNMZLNcdLNsRKNcdMN8BJNchQOcRNOclPO8hQO7BINoU2KcpUQLxPPMlVQcFSP7UrGMkzHbMvG4EhFLIuHKwwHLUxHqMrG7MxH5wrG8o8JcY6JLUzIa4yIa43JLc5Jqs0JL08KJ8xIro7KLk7KL88Krk6Kbk8Kbc7Kbo9K7o+LLY8K646KcFALrxBLbo+Lbk+LcREMbtAL688LLxDMIkyJMdJNas+Lo41J4gyJqpAMJE3K58+MNFTQKhDNMhTQMZSQL9RP6FCNblPPqBENp4XB4cVCGQPBpodD6MfEKMgEaAiEokcD7UlFaEhE2IWDnQbEV8WDqUoGbouHYkgFakrG6UqGrQvHp4nGoUiFrEvHpQmGYIhFqArHI8lGcM1I60uH5QoG28dFKwwIKMtHpYoHMs6J7UzI6MuIJ0rH4onG7Y3J706KrQ4KKkzJb07K54yJJowI4wsIKk2J4orILU7K7s9Lbs+Lrk+LqY6LLJANL9IOZU4Lr5VSZtHPqNXT655cnYPBaEYCm0PB1wOCIcZEFMSDYsgF3YbFHgcFYQjGZElHG0dFXkfGIIjGnUfGHIgGJYpIJguJIEnH6QzKHklHocuJ5o8M5I6MYo5MVwrJkoHAjwHA1QNCUEMCXAZE2cYE0IQDXMdF4MhG38hGognIGooJJlOSadXUWlbWi0FBDsIBj8MCmZKSUgBADQAACoAACUAACMAACIAABkAABYAABEAADcFBf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAOQALAAAAAAUABQAAAj/AMkJHEhwGcGDCAdKizUroUNVwHbR0oPKIUFiiZJU6cTsUZ1VDqmVuvXsihdSmRwNO2UHIYFWdxr9CsYEyhZMh4qlMkXo4IA5RWo502XJ0xQpk6LBYXWpF0EE3foEAqQIGigsojZp4qXkj6tpBAscK+Snkq9PoaygaOEpmaAecQgyCCdLyKAno7hEycLChS1luPLQIbgAGSJISKho6SJmxpo0kcY1kyNsoANw2CgRWbLiRQ0dbd7QYATL2rZsAxNw4+OkSQwcO9SgsSHDBI9cJD4QFHfNDJscbs6MgZHiSJASHSwcbOCNk7EbX8CoMAIkjIgHGBIaeLXnh6RFhsiMKKBwwaKCb3h8DCkTIsIEEBYFHtB2wkMFCRziExSQAcIG/QdVo4F+AQEAOw==',
	close:      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kFBAYMCW+DdHoAAAN1SURBVDjLXZNNTNt1AIaf37+ltEUGBVaKmEyGCIrMTGogUYgzBi4wFzDFxMTFQHZSonFk6UXNTAzJjAvRA+GAB8UEiJjwMTEjIEbctBOTNkBBvrYCK1DStbT/fv9/HhYP23t+nyfv5YXH0tvbm+fz+a6GwuE/ImrsfjQe3w9HIn+vrKz09ff3lwNMTU09CjmdTgAmJiY+CQQC8mhrU/puLciNX6bk2sRPcv3nSelz/SkP/H65uLj4A8DMzAwA4n/J6OjocEN9nSO65EHGokhNoiUTaMkkmWSCtKqSSCQoePUc8RP5qzUvVFeNjY2hPIRHuurtdkfw93nSoQc89XoTUtNIHOyTDBwgFIXT7W8TXfPi7f2M5NZ6pcvl+ratre3hgrX19UTsr4Usbd8vKi69T47JBEJw59PLRDbWeO37cVKpJGoqzUiZhXg8RfPiv7hu3y7Wzc3NNZQUFXUdTo8LYlFWJ8fIq28gx2Si5FwTJa1vEQ6FCKkxZi9eoMC/jRGJvupFTp2tDehLS0vPxu7vkj7c58h9h/TdVeZ/u0HDjBsFSKfTiCwDy53NnNle5viEgXBSI73llZY3musUKaVZAIFbv5L0bZCrl1R/cAVN00ilUiiKgk5qPH/5Cyy5eqy5OgrNOgzZ2SLLYNArXq83Yn2umuD2DgY9lF7/Dsv5d9AJQTwaYdP9D6FQiIitjNg3s5iLT2LSaeTX1nEcDoeUgYGBDV22keLW84hsI/6sJ1DQ2PPdg4+aqPrqXXZXl7BYLIhCG8EsM8G8k1Q2teB2u+8JgKGhIflmS4ucfPlpUahL8uBiD5U3B6gwpBACohlwv/clRSPXMO5uol2fxlh6ir6+PrsOwGw2Z1XX1DTWdl/BO32DovkfMekUYhlBLANpqWBZGGcvmib44dfkP1Mll5eWXN3d3Vd1AG63e9ZkMrVmm3OebP38GsflZ/BHkgTUFIc6M/7iCu7WXyDd0Y05v0Cqqhrt6el5yeFwxAVATU0NHo+H9vb2Ybvd7mhsbJRlp8uFMScHVVUJHh2x5l2RUkqhquqK0+l8ZWdnJyiEQA/g8XgAsNlsXfPz83t7e3uXrFar2WazYTQaiUQiuFyuTDgcnj4+Pv54d3c3KIR49EwdHR0MDw8D0NnZaQkGg89Go1FbJpPBaDQeWq3W9cHBwYPHu/8B/IeoYeNzxNQAAAAASUVORK5CYII=',
	background: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHBhcQBlLyFLQAAAU8SURBVEjHdZbPb1zVFcc/98d7M7Zngu04sg1xkkZylSBaqXGRKgSLyLYIQgEWqFJ3bRdd9T9A7LuGLTtYIEWpqpZWKSnKJpEKTSgEkWAIjsgPfiQhmWRmPPPuTxb3Ps84pU86uvf9Op/zPefc+57g4aO1Cr338skRxcHlNs7+EqVXmN51iKmJWYiR7uA297uX8fY8RfkRm1f6cMED0F6F7ns73IqdkHXonU7Xp48d5vDB51laPMYvDk3x0/2OVtPjYsR7sE7Q6So2vtJ8eqXDN7f/yub1d+mcupJga9D914+Atm8stjjwzG9Y+9WLrDw+x9LCEGsDxgqsB5/NeQgRYoQQBNe+bXJ58yb/vXyS6ydPAJbWGvQSTCXIeoY8NsfhtVf47QvP8eQTJRMNQ28Aw0pQWTAGjM3moDIwrGBQRQpt2TPTYmb6CN3dB7h3433MJUt7HcwmakRdanPo6Kv84eUVFuYilY1URuxwbt0YxI2uV1ZQWYGxgbIQ7JnZR2dyH/c/P4v5ItBeRWE2gVKyd/V3/PrZY8zvjsmpFSPnLo07zI6pGwMObSrJZHM/D6Yr+hufYK7m1O1a+xnPrPyRJ5Y1xkaMFdvOnU9Orc9A/xCwvu/YTm9lI0IofNhPf+5DzJd3NTyl2Lf4Esv7phlWA7wXhDhW6Agh5LkHn8/rhvB+DG7BeDBGYKxnsrmXR9rrmKNXNQu797B7ZpX21JD+QGwDiBCAGEbAGMGHMVAA/5BKY1OTVBaEHKD1cVqTb2qifIqlhZLeIKkhQuakeX1ew0KC+TCmqK5jBlQOhkZQmYjWs4Twc01RHOGRlqM/EEnJjx0PAWtQXTvrwI3VrbLJhgYq5xHqSc1k8yDOe4Id2y9Etv/l4UNaO/1BUuHdCBzJQDsyKRxKPq6BNr2tiJTJ8TYkmxRpAxFjkMoksFbpvvBATl9dQwFICUpFpJzXbA0VmzdhfhaaZXYus4M8F1masSl1ZZHV5S6s1deprztVZZNCaGLsc+/BJM5HZtrQmgCtczQivSzyqGRSQXbqBMgwSnHdMFqCV6ADeC8Q4q5Giq+Qch7nPd2t1EnNEholFBpUTM6VygHkvTiEFIz3GRR3NorOXSmlQvCZxNkPkbJAyYiSo6KHnAYloShSusoiBdDIY1mkYLROgSg5GqUAJSNSaqy9IHHuLMF7lBTpZn5Q5zRpnZyVRQKUZbIaXuj8XA2SIFVOvZQ420OJ85JG42uMOYeQJVJGlBiLLDso1JiiMSuKFEidWqVGtVUyAk2sPUWIXcmNPzu8O4E1Q5QUCBlzNFlZVlRoKHVS0yjyXI+BajUSpIxIKbHmDtb8g+/+5lNRrn78McPhO/igkSKlUEhGwFpZAQ09Sl2ttgbU604KgfeC4fAvXDt5GUAyvQ5sWD699BZbg4tERF4XMb+UnBQqqaqboa5NHVBad3F7KfT6H3Dp3NtApH0UxXATFo5D78wW35WX2DO7TLO5yEQjonWkKMR2M9Rdp+TYxpq/Wc5HQpAMhorv717gg7N/go0Oc89B53T+8PU+h6WXoHO6wzX/H2ZnC6Rcpj3VpCg8WkUKJbbrAaMN1PmIDwJjJ7hzr8+t70/w73++DhsdFo/Drb+P/ZwAPPgMHnsRume2uP71BaYWLtLvt9D6J+xqlWnxqtQoMYILAuc11jX45lbg2o13uXXnNc6/cQruVcw/D9++83/+6wCm16FzOs1Xfq+5e3+R2fbT7H30CO3WAcpiF4JIZR5wv/cl12+epzc4x2TjNhffyj+QR6F7ZofbHwBbOem8JzJyVgAAAABJRU5ErkJggg=='
}

var AUDIO = {
	cheese:  'data:audio/mid;base64,TVRoZAAAAAYAAQAIAeBNVHJrAAAAGQD/UQMGW5oA/1gEBAIYCAD/WQIAAAD/LwBNVHJrAAAAxQD/Aw9GaW5hbCBGYW50YXN5IDUA/yEBAAD/IAEAALAHfwCwCkAAwAQAkEZkgXCARlAAkEhkgXCASFAAkElkgXCASVAAkEtkgXCAS1AAkE1kAJBEZACQRmQAkDZkg2CATVAAkElkg2CARFAAgEZQAIA2UACASVAAkExkAJA1ZACQRWQAkENkg2CATFAAkEhkgmiAQ1AAkEFkPIBIUACQSGQ8gEVQAJBLZDyANVAAkDFkiWyAQVA8gEhQPIBLUDyAMVAA/y8ATVRyawAAABgA/wMLR29vZCBOaWdodCEA/yEBAAD/LwBNVHJrAAAAJgD/AxlPcmlnaW5hbCBieSBOb2J1byBVZW1hdHN1AP8hAQAA/y8ATVRyawAAACIA/wMVUzNNIGFuZCBtaWRpIGJ5IFlha3JhAP8hAQAA/y8ATVRyawAAAC4A/wMheWFrcmFAbmJyeWFuNzEuZG9ybS51c20ubWFpbmUuZWR1AP8hAQAA/y8ATVRyawAAABsA/wMOQXVndXN0IDQsIDE5OTcA/yEBAAD/LwBNVHJrAAAAKAD/AxtCZXN0IGhlYXJkIGluIEN1YmljIFBsYXllciEA/yEBAAD/LwA=',
	horn:    'data:audio/mid;base64,TVRoZAAAAAYAAQARA8BNVHJrAAAAXQD/AzZGaW5hbCBGYW50YXN5h1iBd4N0g0CDk4N0g0CBW4OMglCBeC9ieSCQX5azltiBmZdGlusvR00A/1EDB6EgAP9YBAQCGAgA8AV+fwkB9wD/WQIEAIG0AP8vAE1UcmsAAAD9nXDAOACwXVoAsFtAALAHf5Y0kDtkWIA7ZDKQPWRWgD1kMZA/ZFaAP2QxkEBkVoBAZDGQQmRWgEJkMZBEZFaARGQxkEVkVoBFZDGQR2QAkERkAJBAZIc8gEdkAIBEZACAQGQAkEdkAJBEZACQQGSBS4BHZACARGQAgEBkc5BHZACQRGQAkEBkgUuAR2QAgERkAIBAZHKQR2QAkERkAJBAZIFLgEdkAIBEZACAQGRykEhkAJBDZACQQGSHPIBIZACAQ2QAgEBkAJBKZACQRWQAkEJkhzyASmQAgEVkAIBCZACQTGQAkEdkAJBEZKUsgExkAIBHZACARGS1EP8vAE1UcmsAAABVnXDBKwCxXWQAsVtAALEHeJ1wkS9khzyBL2QAkS9kgUuBL2RzkS9kgUuBL2RykS9kgUuBL2RykTBkhzyBMGQAkTJkhzyBMmQAkTRkpSyBNGS1CP8vAE1UcmsAAADanXDCLwCyXUYAsltQALIHf51wkiNkhGOCI2SCWJIjZIFLgiNkc5IjZIFLgiNkcpIjZIFLgiNkcpIkaYRjgiRpgliSJm6EY4ImboJYkihzhGOCKHOCWJIjf3qCI39FkiN/eYIjf0WSI395giN/RZIjf3mCI39FkiN/eYIjf0WSI396giN/RZIjf3mCI39FkiN/eYIjf0WSI395giN/RZIjf3mCI39FkiN/eoIjf0WSI395giN/RZIjf3mCI39FkiN/eYIjf0WSI395giN/RZIjf4RjgiN/t3T/LwBNVHJrAAAAyJ1wwzAAs11aALNbQACzB26WNJM7ZFiDO2Qykz1kVoM9ZDGTP2RWgz9kMZNAZFaDQGQxk0JkVoNCZDGTRGRWg0RkMZNFZFaDRWQxk0dkAJNEZIRjg0dkAINEZIJYk0dkAJNEZIFLg0dkAINEZHOTR2QAk0RkgUuDR2QAg0RkcpNHZACTRGSBS4NHZACDRGRyk0hkAJNDZIRjg0hkAINDZIJYk0pkAJNCZIRjg0pkAINCZIJYk0xkAJNEZKJTg0xkAINEZLds/y8ATVRyawAAAAaBtAD/LwBNVHJrAAAABoG0AP8vAE1UcmsAAAAGgbQA/y8ATVRyawAAAAaBtAD/LwBNVHJrAAAABoG0AP8vAE1UcmsAAAA2nXDJAAC5XWQAuVtLALkHf51wyQAAmTFkiUeJMWSFMJkxZIlHiTFkhTCZMWSiU4kxZLdf/y8ATVRyawAAAAaBtAD/LwBNVHJrAAAABoG0AP8vAE1UcmsAAAAGgbQA/y8ATVRyawAAAAaBtAD/LwBNVHJrAAAABoG0AP8vAE1UcmsAAAAGgbQA/y8A',
	reward:  'data:audio/mid;base64,TVRoZAAAAAYAAQAJA8BNVHJrAAAAQAD/AzZGaW5hbCBGYW50YXN5h1iBd4N0g0CDk4N0g0CBW4OMglGBeC9ieSCQX5azltiBmZdGlusvR02B0gD/LwBNVHJrAAAAIwDwBX5/CQH3AP9RAwcK4gD/WAQEAhgIAP9ZAgAAgdIA/y8ATVRyawAAAVEAwTgAsQd/ALEKFACxW0C0QJE5RoEggTlGAJE7SIEggTtIAJE8SoEggTxKAJE+TIEggT5MAJFAToEggUBOAJFBUIEggUFQAJFDZINggUNkAJE8WoFwgTxaAJE+XIFwgT5cAJFAX4FwgUBfgXCRRWSBcIFFZIFwkUNijwCBQ2IAkUZpg2CBRmkAkT5fgXCBPl8AkT9hgXCBP2EAkUFkgXCBQWSBcJFIaYFwgUhpgXCRRmePAIFGZwCRSWSDYIFJZACRQV+BcIFBXwCRQmGBcIFCYQCRRGSBcIFEZIFwkUtpgXCBS2mBcJFMZIFwgUxkgXCRRF+BcIFEX4FwkUVigXCBRWKBcJFJZIFwgUlkgXCRTG6CQIFMbgCRSWmCQIFJaQCRTG6CQIFMbgCRTnOCQIFOcwCRS26CQIFLbgCRTnOCQIFOcwCRUHieAIFQeI8A/y8ATVRyawAAAT0AwkgAsgd/ALIKbgCyW0C0QJJRRoEgglFGAJJTSIEgglNIAJJUSoEgglRKAJJWTIEgglZMAJJYToEgglhOAJJZUIEggllQkmCST2SBcIJPZACSUWaBcIJRZgCSUmiBcIJSaACSUWaBcIJRZgCST2SDYIJPZJJgklJogXCCUmgAklRqgXCCVGoAklVsgXCCVWwAklRqgXCCVGoAklJog2CCUmgAklVpg2CCVWkAkk1kgXCCTWQAkk5mgXCCTmYAklBpgXCCUGmBcJJXboFwgldugXCSWG6BcIJYboFwklNpgXCCU2mBcJJVa4FwglVrgXCSWG6BcIJYboFwklVzgkCCVXMAklFugkCCUW4AklVzgkCCVXMAkld4gkCCV3gAklNzgkCCU3MAkld4gkCCV3gAkll/ngCCWX+PAP8vAE1UcmsAAAHGAMMwALMHeACzCkAAs1tQtECTOWSBIIM5ZACTO2aBIIM7ZgCTPGiBIIM8aACTPmqBIIM+agCTQGyBIINAbACTQW6BIINBbgCTPFoAk0BaAJNDWodAgzxaAINAWgCDQ1oAkzxeAJNCXgCTRV6HQIM8XgCDQl4Ag0Veg2CTP18Ak0NfAJNGX4dAgz9fAINDXwCDRl8Akz9fAJNGXwCTQ1+BcIM/XwCDRl8Ag0NfgXCTP18Ak0NfAJNGX4dAgz9fAINDXwCDRl8Akz9jAJNFYwCTSGOHQIM/YwCDRWMAg0hjg2CTRmQAk0JkAJNJZIdAg0ZkAINCZACDSWQAk0JkAJNGZACTSWSBcINCZACDRmQAg0lkgXCTQloAk0ZaAJNJWodAg0JaAINGWgCDSVoAk0RfAJNIXwCTS1+HQINEXwCDSF8Ag0tfAJNJZACTRWQAk0xkh0CDSWQAg0VkAINMZACTS2kAk05pAJNHaYdAg0tpAINOaQCDR2kAk0lkAJNFZACTTGSHQINJZACDRWQAg0xkAJNOaQCTS2kAk0dph0CDTmkAg0tpAINHaQCTUGkAk0lpAJNNaZ4Ag1BpAINJaQCDTWmPAP8vAE1UcmsAAACgAMQvALQHfwC0CkAAtFtkvACUMG6HQIQwbgCUMG6HQIQwboNglC1ph0CELWkAlC1pgXCELWmBcJQzc4dAhDNzAJQzc4dAhDNzg2CULm6HQIQubgCULm6BcIQuboFwlDZzh0CENnMAlDFuh0CEMW4AlC1ph0CELWkAlDFuh0CEMW4AlC1ph0CELWkAlC9uh0CEL24AlDF0ngCEMXSPAP8vAE1UcmsAAAFRAMU5ALUHeAC1ChQAtVtktECVOVqBIIU5WgCVO1yBIIU7XACVPF6BIIU8XgCVPmCBIIU+YACVQGKBIIVAYgCVQWSBIIVBZACVQ1qDYIVDWgCVPFCBcIU8UACVPlKBcIU+UgCVQFWBcIVAVYFwlUVagXCFRVqBcJVDWI8AhUNYAJVGaYNghUZpAJU+X4FwhT5fAJU/YYFwhT9hAJVBZIFwhUFkgXCVSGmBcIVIaYFwlUZnjwCFRmcAlUlkg2CFSWQAlUFfgXCFQV8AlUJhgXCFQmEAlURkgXCFRGSBcJVLaYFwhUtpgXCVTGSBcIVMZIFwlURfgXCFRF+BcJVFYoFwhUVigXCVSWSBcIVJZIFwlUxugkCFTG4AlUlpgkCFSWkAlUxugkCFTG4AlU5zgkCFTnMAlUtugkCFS24AlU5zgkCFTnMAlVB4ngCFUHiPAP8vAE1UcmsAAAK4AMkAALkHfwC5W2S8AJkmZIEgiSZkAJkmZIEgiSZkAJkmZIEgiSZkAJkmZIEgiSZkAJkmZIEgiSZkAJkmZIEgiSZkAJkmZIEgiSZkAJkmZIEgiSZkAJkmZIEgiSZkAJkmZIEgiSZkAJkmZIEgiSZkAJkmZIEgiSZkg2CZJmSHQIkmZACZJmSBcIkmZIFwmSZkgSCJJmQAmSZkgSCJJmQAmSZkgSCJJmQAmSZkgSCJJmQAmSZkgSCJJmQAmSZkgSCJJmQAmSZkgSCJJmQAmSZkgSCJJmQAmSZkgSCJJmQAmSZkgSCJJmQAmSZkgSCJJmQAmSZkgSCJJmSDYJkmZIdAiSZkAJkmZIFwiSZkgXCZJmSDYIkmZACZJmSBcIkmZACZJmSBcIkmZACZJmSBIIkmZACZJmSBIIkmZACZJmSBIIkmZACZJmSBIIkmZACZJmSBIIkmZACZJmSBIIkmZACZJmSDYIkmZACZJmSBcIkmZACZJmSBcIkmZACZJmSBIIkmZACZJmSBIIkmZACZJmSBIIkmZACZJmSBIIkmZACZJmSBIIkmZACZJmSBIIkmZACZJmSCQIkmZACZJmSCQIkmZACZJmSCQIkmZACZJmSCQIkmZACZJmSCQIkmZACZJmSCQIkmZACZJmSBIIkmZACZJmaBIIkmZgCZJmiBIIkmaACZJmeBIIkmZwCZJmaBIIkmZgCZJmSBIIkmZACZJmKBIIkmYgCZJmCBIIkmYACZJl6BIIkmXgCZJlyBIIkmXACZJlqBIIkmWgCZJliBIIkmWACZJleBIIkmVwCZJlWBIIkmVQCZJlWBIIkmVQCZJlOBIIkmUwCZJlGBIIkmUQCZJk+BIIkmTwCZJk2BIIkmTQCZJkuBIIkmSwCZJkmBIIkmSQCZJkeBIIkmRwCZJkWBIIkmRZAg/y8ATVRyawAAAEW8AJkxc54AiTFzAJkxc54AiTFzAJkxc48AiTFzAJkxc48AiTFzAJkxc4dAiTFzAJkxeIdAiTF4AJkxf54AiTF/jwD/LwA=',
	maxamp:  'data:audio/mid;base64,TVRoZAAAAAYAAQAMAeBNVHJrAAAA1wD/Aw9PcmNoZXN0cmFsIEhhcnAAwC4AsAd/AP9RAwOTh4NgkENggXBDAABHYIFwRwAASmCBcEoAAEdggXBHAABKYIFwSgAAT2CBcE8AAEpggXBKAABPYIFwTwAAU2CBcFMAAE9ggXBPAABTYIFwUwAAVmCBcFYAAFtggXBbAABWYIFwVgAAU2CBcFMAAFZggXBWAABTYIFwUwAAT2CBcE8AAFNggXBTAABPYIFwTwAASmCBcEoAAE9ggXBPAABKYIFwSgAAR2CBcEcAAENggXBDAIkw/y8ATVRyawAAAHwA/wMPU3RyaW5nIEVuc2VtYmxlAMEwiTCRQ2AAO2AAPmCBcEMAADsAAD4AAENgADtgAD5ggXBDAAA7AAA+AABDYAA7YAA+YIFwQwAAOwAAPgAARGAAPGAAP2CLIEQAADwAAD8AAENgADtgAD5gmDBDAAA7AAA+AIkw/y8ATVRyawAAAOkA/wMHVGltcGFuaQDCL4Ngkit/hVArAAArf4FwKwAAK3+BcCsAACt/gXArAAArf4JoKwAAK3+CaCsAACt/gmgrAAArf4JoKwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwAAK394KwCJMP8vAE1UcmsAAAA4AMM4AP8DB1RydW1wZXSJMJNHf4FwRwAAR3+BcEcAAEd/gXBHAABIf4sgSAAAR3+YMEcAiTD/LwBNVHJrAAAACQD/AwC8AP8vAE1UcmsAAAApAP8DIEx1ZmlhIElJOiBSaXNlIG9mIHRoZSBTaW5pc3RyYWxzvAD/LwBNVHJrAAAAGgD/AxFCbHVlIFRyZWFzdXJlIEJveLwA/y8ATVRyawAAAAkA/wMAvAD/LwBNVHJrAAAAGwD/AxJieSBZYXN1bm9yaSBTaGlvbm+8AP8vAE1UcmsAAAAfAP8DFnNlcXVlbmNlZCBieSBTaW5jbGFpckO8AP8vAE1UcmsAAAAcAP8DE3NpbmNsYWlyQGFjcm9zcy5jb228AP8vAE1UcmsAAAAYAP8DD2x1ZjJibHVlYm94Lm1pZLwA/y8A',
	season:  'data:audio/mid;base64,TVRoZAAAAAYAAQAOAeBNVHJrAAAAXgD/UQMFuNgA/wMRUGl6emljYXRvIFN0cmluZ3MAwC2HQLAHcABbUJZAkFRweFQAeEtoeEsAeE9geE8AeEhYeEgAeEtQeEsAeENIeEMAeEhAeEgAeD84eD8Aj3j/LwBNVHJrAAABIwD/Aw9TdHJpbmcgRW5zZW1ibGUAwTCHQLEHcABbUIdAkTxAAD8geDwAAD8AAD1DAEAjeD0AAEAAADxGAD8meDwAAD8AAD1JAEApeD0AAEAAAD9MAEIseD8AAEIAAEBQAEMweEAAAEMAAD9TAEIzeD8AAEIAAEBWAEM2eEAAAEMAAEFZAEQ5eEEAAEQAAEJcAEU8eEIAAEUAAEFgAERAeEEAAEQAAEJjAEVDeEIAAEUAAENmAEZGeEMAAEYAAERpAEdJeEQAAEcAAENsAEZMeEMAAEYAAERwAEdQeEhPACRQAEQAAEcAgXBIAAA/TIFwPwAAQ0iBcEMAADxEgXA8AAA/QIFwPwAANzyBcDcAADw4gXA8AAAzNIFwMwAAJACPAP8vAE1UcmsAAACmAP8DD1N0cmluZyBFbnNlbWJsZQDCMIdAsgdwAFtgh0CSMHCDYDAAACtwg2ArAAAncINgJwAAJHCDYCQAACRweCQAACRgeCQAACRweCQAACRgeCQAACRweCQAACRgeCQAACRweCQAACRgeCQAACRweCQAACRgeCQAACRweCQAACRgeCQAACRweCQAACRgeCQAACRweCQAACRgeCQAh0CyB3CHQP8vAE1UcmsAAAB9AP8DB1RpbXBhbmkAwy+HQLMHcABbYJZAkyR/eCQAACRyeCQAACRoeCQAACRfeCQAACRWeCQAACRNeCQAACRFeCQAACQ/eCQAACQ5eCQAACQzeCQAACQueCQAACQqeCQAACQneCQAACQleCQAACQjeCQAACQieCQAjwD/LwBNVHJrAAAAyADJMAD/AwpQZXJjdXNzaW9uh0C5B3AAW1CHQAcgAJkmcHgmAAAmQBi5ByZgmSYAACZQMLkHLEiZJgAAJmBIuQcyMJkmAAAmcGC5BzgYmSYAACZAeCYAALkHPgCZJlB4JgAAJmAYuQdEYJkmAAAmcDC5B0pImSYAACZASLkHUDCZJgAAJlBguQdWGJkmAAAmYHgmAAC5B1wAmSZweCYAACZAGLkHYmCZJgAAJlAwuQdoSJkmAAAmYEi5B24wmSYAALkHcJ4A/y8ATVRyawAAAAW8AP8vAE1UcmsAAAAbAP8DEk9ncmUgQmF0dGxlIChTTkVTKbwA/y8ATVRyawAAABIA/wMJRGFuZ2Vyb3VzvAD/LwBNVHJrAAAABbwA/y8ATVRyawAAABwA/wMTYnkgSGl0b3NoaSBTYWtpbW90b7wA/y8ATVRyawAAAB8A/wMWc2VxdWVuY2VkIGJ5IFNpbmNsYWlyQ7wA/y8ATVRyawAAABwA/wMTc2luY2xhaXJAYWNyb3NzLmNvbbwA/y8ATVRyawAAAAW8AP8vAE1UcmsAAAAUAP8DC29ibG9zZTIubWlkvAD/LwA=',
	washed:  'data:audio/mid;base64,TVRoZAAAAAYAAAABAYBNVHJrAAAB7wD/AwpES0MyLzNCRk5TAP9YBAQCGAgA/1EDB6EghSOZJmQBkk1kAJVBZHqJJgAAmSNkBMYgBoJNAADDOwCSSmQBk0ZkAcQ7BJRKZAGFQQAAlT5kA8YgA5YiZFeJIwABgkoAAJJNZAGDRgABhT4AAIRKAAGVQWQBhiIAboJNAACZJmQBkk9kAZNEZAGUSmQBhUEAAJVDZACWImRwgk8AAIkmAACSUGQBg0QAAYRKAAWFQwAAlURkbYJQAACZI2QBklFkAZNGZAGFRAAAlExkAZVFZAGGIgAAliRkbokjAAGCUQAAmSZkAJJUZAGDRgABhEwAAYVFAACVSGRxiSYAAJkmZAGCVAAAklZkAZNGZAGFSAAAlExkAZVKZAGGJAAAliRkb4kmAACZKGQBglYAAYNGAACSWWQBk0VkBIRMAAGGJAAAhUoAAJRNZACVTWQAlh1kZ4koAAGCWQB0g0UAAJJWZAGFTQABlUpkAYYdAHGZJmQBglYAAJJXZAGTRWQBhE0AAJRIZAGFSgABlUtkAZYdZGuJJgAAmSZkcokmAHWZMmQciTIAAZkwZByJMAABmS9kHIkvAACZLWQdiS0AAZkrZBuJKwAAmTFkAJkpZB2JKQAAiTEAOoYdAHaDRQAAglcAAYRIAAGFSwCIWv8vAA==',
	tourney: 'data:audio/mid;base64,TVRoZAAAAAYAAQAHAeBNVHJrAAAALQD/WAQBAhgIAP9ZAgAAAP9RAwdTAAD/BgdmYW5mYXJlg2D/WAQEAhgIAP8vAE1UcmsAAABfAP8hAQAA/wMEUEVUMQCwAAEAwDgAsAduALAKP4NgkEhkUEgAUEhkUEgAUEhkUEgAUEhkg2BIAABEZINgRAAARmSDYEYAAEhkgR9IAIEhRmSBH0YAAUhkix9IAAD/LwBNVHJrAAAAXwD/IQEAAP8DBFBFVDIAsQABAME4ALEHbgCxCj+DYJFBZFBBAFBAZFBAAFA+ZFA+AFBAZINgQAAAPGSDYDwAAD5kg2A+AABAZIEfQACBIT5kgR8+AAFAZIsfQAAA/y8ATVRyawAAAF8A/yEBAAD/AwRQRVQzALIAAQDCOACyB24Asgo/g2CSPmRQPgBQPGRQPABQPGRQPABQPGSDYDwAADpkg2A6AAA6ZINgOgAAPGSBHzwAgSE8ZIEfPAABPGSLHzwAAP8vAE1UcmsAAABfAP8hAQAA/wMEUEVUNACzAAEAwzgAswduALMKP4NgkzlkUDkAUDdkUDcAUDVkUDUAUDdkg2A3AAAzZINgMwAANWSDYDUAADdkgR83AIEhNWSBHzUAATdkix83AAD/LwBNVHJrAAAAYQD/IQEAAP8DBlRST01CTwC0AAEAxDkAtAduALQKP4NglDxkUDwAUDxkUDwAUDxkUDwAUDxkg2A8AAA4ZINgOAAAOmSDYDoAADxkgR88AIEhOmSBHzoAATxkix88AAD/LwBNVHJrAAABLAD/IQEAAP8DBVNOQVJFALkAAQDJfwC5B24AuQo/ALkAAQCZKGQ8KAAAKF88KAAAKFo8KAAAKFU8KAAAKFA8KAAAKEs8KAAAKEY8KAAAKEE8KAAAKGSBICgAAChkgSAoAAAoZIEgKAAAKGQ8KAAAKFo8KAAAKFA8KAAAKEY8KAAAKDw8KAAAKDI8KAAAKCg8KAAAKB48KAAAKGSCQCgAACg8gSAoAAAoZIEgKAAAKGSBICgAAChkgSAoAAAoZII/KAABKGSBHygAAShkOygAAShfOygAAShaOygAAShVOygAAShQOygAAShLOygAAShGOygAAShBOygAASg8OygAASg3OygAASgyOygAASgtOygAASgoOygAASgjOygAASgeOygAASgZOygAAP8vAA=='
}

var LEVEL = [ 
	[ 'Novice' ], 
	[ 'Recruit' ], 
	[ 'Apprentice' ], 
	[ 'Initiate' ], 
	[ 'Journeyman' ], 
	[ 'Master' ], 
	[ 'Grandmaster' ], 
	[ 'Legendary' ], 
	[ 'Hero' ], 
	[ 'Knight' ],
	[ 'Lord', 'Lady', 'Lord/Lady' ],
	[ 'Baron', 'Baroness', 'Baron/Baroness' ], 
	[ 'Count', 'Countess', 'Count/Countess' ],
	[ 'Duke', 'Duchess', 'Duke/Duchess' ], 
	[ 'Grand Duke', 'Grand Duchess', 'Grand Duke/Grand Duchess' ], 
	[ 'Archduke', 'Archduchess', 'Archduke/Archduchess' ] 
];

var LNAME = 0, LZONE = 1, LLINK = 2, LLVL = 3, LMAP = 4, LWARNING = 5, LPATH = 6;
var LOCATION = {
	region: [ 'Gnawnia', 'Valour', 'Whisker Woods', 'Burroughs', 'Furoma', 'Bristle Woods', 'Tribal Isles', 'Varmint Valley', 'Rodentia', 'Sandtail Desert', 'Hollow Heights', 'Rift Plane' ],
	detail: [
		[ 'Meadow', 0, 'meadow', 0, 6, false, -1 ], // 0
		[ 'Town of Gnawnia', 0, 'town_of_gnawnia', 1, 6, false, -1 ],
		[ 'Windmill', 0, 'windmill', 2, 6, false, -1 ],
		[ 'Harbour', 0, 'harbour', 3, 6, false, -1 ], 
		[ 'Mountain', 0, 'mountain', 4, 6, false, -1 ], 
		[ 'Slushy Shoreline', 0, 'slushy_shoreline', 10, 856, false, -1 ],
		[ 'King\'s Arms', 1, 'kings_arms', 1, 6, false, -1 ],
		[ 'Tournament Hall', 1, 'tournament_hall', 2, 6, false, -1 ],
		[ 'King\'s Gauntlet', 1, 'kings_gauntlet', 3, 4, false, -1 ],
		[ 'Calm Clearing', 2, 'calm_clearing', 4, 16, false, -1 ],
		[ 'Great Gnarled Tree', 2, 'great_gnarled_tree', 5, 5, false, -1 ], // 10
		[ 'Lagoon', 2, 'lagoon', 6, 10, false, -1 ],
		[ 'Laboratory', 3, 'laboratory', 5, 9, false, -1 ],
		[ 'Toxic Spill', 3, 'pollution_outbreak', LEVEL.length, 9, false, -1 ],
		[ 'Town of Digby', 3, 'town_of_digby', 5, 3, false, -1 ],
		[ 'Mousoleum', 3, 'mousoleum', 5, [ 15, 12 ], false, -1 ], 
		[ 'Bazaar', 3, 'bazaar', 6, 2, false, -1 ],
		[ 'Training Grounds', 4, 'training_grounds', 6, [ 13, 14 ], false, -1 ], 
		[ 'Dojo', 4, 'dojo', 6, 14, false, -1 ], 
		[ 'Meditation Room', 4, 'meditation_room', 6, 14, false, -1 ], 
		[ 'Pinnacle Chamber', 4, 'pinnacle_chamber', 6, 14, false, -1 ], // 20
		[ 'Catacombs', 5, 'catacombs', 7, 12, false, -1 ],
		[ 'Forbidden Grove', 5, 'forbidden_grove', 7, 8, false, -1 ],
		[ 'Acolyte Realm', 5, 'acolyte_realm', 7, -1, true, 22 ], 
		[ 'Cape Clawed', 6, 'cape_clawed', 7, 11, false, -1 ],
		[ 'Elub Shore', 6, 'elub_shore', 7, 11, false, -1 ],
		[ 'Nerg Plains', 6, 'nerg_plains', 7, 11, false, -1 ], 
		[ 'Derr Dunes', 6, 'derr_dunes', 7, 11, false, -1 ],
		[ 'Jungle of Dread', 6, 'jungle_of_dread', 8, 11, false, -1 ],
		[ 'Dracano', 6, 'dracano', 9, 11, false, -1 ], 
		[ 'Balack\'s Cove', 6, 'balacks_cove', 9, 1, false, -1 ], // 30
		[ 'Claw Shot City', 7, 'claw_shot_city', 0, 6, false, -1 ],
		[ 'Gnawnian Express Station', 7, 'train_station', 0, 6, false, -1 ],
		[ 'S.S. Huntington III', 8, 'ss_huntington_ii', 7, 7, false, -1 ],
		[ 'Iceberg', 8, 'iceberg', 10, 856, false, -1 ],
		[ 'Seasonal Garden', 8, 'seasonal_garden', 10, 347, false, -1 ],
		[ 'Zugzwang\'s Tower', 8, 'zugzwang_tower', 10, 348, true, -1 ],
		[ 'Crystal Library', 8, 'zugzwang_library', 10, 646, false, -1 ],
		[ 'Sunken City', 8, 'sunken_city', 12, 1512, false, -1 ],
		[ 'Fiery Warpath', 9, 'desert_warpath', 11, 529, false, -1 ],
		[ 'Muridae Market', 9, 'desert_city', 11, 528, false, -1 ], // 40
		[ [ 'Living Garden', 'Twisted Garden' ], 9, 'desert_oasis', 11, 607, false, -1 ],
		[ [ 'Lost City', 'Cursed City' ], 9, 'lost_city', 11, 607, false, -1 ],
		[ [ 'Sand Dunes', 'Sand Crypts' ], 9, 'sand_dunes', 11, 607, false, -1 ],
		[ 'Fungal Cavern', 10, 'fungal_cavern', 13, 1728, false, -1 ],
		[ 'Labyrinth', 10, 'labyrinth', 13, 1729, false, -1 ],
		[ 'Zokor', 10, 'ancient_city', 13, 1729, true, 46 ],
		[ 'Gnawnia Rift', 11, 'rift_gnawnia', 12, 1422, false, -1 ],
		[ 'Burroughs Rift', 11, 'rift_burroughs', 13, 1422, false, -1 ],
		[ 'Whisker Woods Rift', 11, 'rift_whisker_woods', 13, 1422, false, -1 ],
		[ [ 'King\'s Party Zone', 'Vacant Lot', 'Birthday Party Celebration', 'Chocolate Factory', 'Festive Comet', 'Haunted Terrortories', 'Snow Fortress', 'Great Gnawnian Games', 'MegaBuy Mart', 'Calamity Carl\'s Cozy Cruise', 'Festive Snow Fort', 'Dance Hall', 'Omelette Factory', 'Festive Ice Fortress' ], 0, 'special_event_location', 1, 6, false, -1 ], // 50
		[ 'Ronza\'s Traveling Shoppe', 0, 'ronzas_traveling_shoppe', 1, 6, false, -1 ] // 51
	]
}

var PNAME = 0, PINGREDIENTS = 1;
var PATTERNS = [
	[ 'Base - Dehydration Base', { 'dehydration_base_blueprints_craft_item':'1', 'salt_craft_item':'213', 'splintered_wood_craft_item':'4' } ],
	[ 'Base - Deep Freeze Base', { 'bead_of_slumber_craft_item':'1', 'deep_freeze_base_blueprints_crafting_item':'1', 'steam_nine_crafting_item':'1', 'cold_fusion_crafting_item':'6', 'platinum_bar_crafting_item':'6', 'frosty_metal_crafting_item':'18', 'wire_spool_crafting_item':'20', 'stale_super_brie_craft_item':'22', 'living_shard_crafting_item':'32' } ],
	[ 'Base - Gingerbread Base', { 'candies_craft_item':'5', 'gingerbread_base_blueprints_craft_item':'1', 'icing_sugar_craft_item':'1', 'plank_of_gingerbread_craft_item':'1' } ],
	[ 'Base - Hearthstone Base', { 'hearthstone_base_blueprints_crafting_item':'1', 'wire_spool_crafting_item':'14', 'heating_oil_crafting_item':'8', 'frosty_metal_crafting_item':'8', 'cold_fusion_crafting_item':'10' } ],
	[ 'Base - Magnet Base', { 'magnet_base_blueprints_crafting_item':'1', 'wire_spool_crafting_item':'5', 'heating_oil_crafting_item':'2', 'frosty_metal_crafting_item':'5', 'cold_fusion_crafting_item':'3' } ],
	[ 'Base - Molten Shrapnel Base', { 'dragon_ember':'1', 'platinum_bar_crafting_item':'12', 'scrap_metal_craft_item':'200' } ],
	[ 'Base - Remote Detonator Base', { 'remote_detonator_base_blueprints_crafting_item':'1', 'wire_spool_crafting_item':'8', 'heating_oil_crafting_item':'1', 'frosty_metal_crafting_item':'2', 'cold_fusion_crafting_item':'3' } ],
	[ 'Base - Rift Base', { 'rift_base_blueprints_crafting_item':'1', 'rift_crystal_crafting_item':'1', 'rift_mist_crafting_item':'1', 'rift_stars_crafting_item':'1' } ],
	[ 'Base - Soiled Base', { 'soiled_base_blueprints_crafting_item':'1', 'fresh_living_garden_soil_crafting_item':'3', 'dewthief_petal_crafting_item':'1', 'duskshade_petal_crafting_item':'1', 'graveblossom_petal_crafting_item':'1', 'lunaria_petal_crafting_item':'1' } ],
	[ 'Base - Spellbook Base', { 'spellbook_base_blueprints_crafting_item':'1', 'master_binding_crafting_item':'1', 'technic_page_crafting_item':'3', 'mystic_page_crafting_item':'3', 'platinum_bar_crafting_item':'6' } ],
	[ 'Base - Spiked Base', { 'spiked_base_blueprints_crafting_item':'1', 'wire_spool_crafting_item':'5', 'heating_oil_crafting_item':'10', 'frosty_metal_crafting_item':'5', 'splintered_wood_craft_item':'50', 'cold_fusion_crafting_item':'6' } ],
	[ 'Base - Tiki Base', { 'tiki_base_blueprints_crafting_item':'1', 'tribal_timber_crafting_item':'3' } ],
	[ 'Base - Tribal Base', { 'tribal_timber_crafting_item':'3' } ],
	[ 'Blueprints - Ancient Box Trap', { 'ancient_frayed_blueprint_piece_craft_item':'1', 'ancient_mangled_blueprint_piece_craft_item':'1', 'ancient_ripped_blueprint_piece_craft_item':'1', 'ancient_torn_blueprint_piece_craft_item':'1' } ],
	[ 'Blueprints - Clockwork Portal', { 'essence_f_crafting_item':'1', 'essence_i_crafting_item':'1' } ],
	[ 'Blueprints - Grand Arcanum', { 'essence_g_crafting_item':'1', 'essence_i_crafting_item':'1' } ],
	[ 'Blueprints - Phantasmic Oasis', { 'essence_e_crafting_item':'1', 'essence_f_crafting_item':'1', 'essence_i_crafting_item':'1' } ],
	[ 'Blueprints - Soiled Base', { 'essence_f_crafting_item':'1', 'essence_g_crafting_item':'1', 'essence_h_crafting_item':'1' } ],
	[ 'Charm - Antiskele Charm', { 'radioactive_sludge_craft_item':'1', 'simple_orb_crafting_item':'1', 'charmbit_crafting_item':'36' } ],
	[ 'Charm - Brain Charm', { 'brain_bit_crafting_item':'10', 'simple_orb_crafting_item':'1', 'charmbit_crafting_item':'40' } ],
	[ 'Charm - Cherry Charm', { 'rift_cherries_crafting_item':'1', 'simple_orb_crafting_item':'1', 'calcified_rift_mist_crafting_item':'3', 'charmbit_crafting_item':'45' } ],
	[ 'Charm - Double Sponge Charm', { 'essence_a_crafting_item':'2', 'flawless_orb_crafting_item':'1', 'blue_double_dewdrop_powder_crafting_item':'1' } ],
	[ 'Charm - Dragonbane Charm', { 'frozen_scroll_craft_item':'1', 'perfect_orb':'1', 'charmbit_crafting_item':'120' } ],
	[ 'Charm - Empowered Anchor Charm', { 'scrap_metal_craft_item':'1', 'flawless_orb_crafting_item':'1', 'charmbit_crafting_item':'40' } ],
	[ 'Charm - Gnarled Charm', { 'rift_torn_roots_crafting_item':'1', 'simple_orb_crafting_item':'1', 'calcified_rift_mist_crafting_item':'3', 'charmbit_crafting_item':'45' } ],
	[ 'Charm - Growth Chram', { 'perfect_orb':'1', 'charmbit_crafting_item':'1000', 'essence_d_crafting_item':'1' } ],
	[ 'Charm - Prospector\'s Charm', { 'meteorite_piece_craft_item':'1', 'simple_orb_crafting_item':'1', 'charmbit_crafting_item':'16' } ],
	[ 'Charm - Red Double Sponge Charm', { 'essence_b_crafting_item':'2', 'perfect_orb':'1', 'red_double_dewdrop_powder_crafting_item':'1' } ],
	[ 'Charm - Rift Power Charm', { 'perfect_orb':'1', 'calcified_rift_mist_crafting_item':'5', 'erupting_rift_core_crafting_item':'1', 'charmbit_crafting_item':'25' } ],
	[ 'Charm - Rotten Charm', { 'stale_cheese_craft_item':'1', 'flawed_orb_crafting_item':'1', 'charmbit_crafting_item':'12' } ],
	[ 'Charm - Scientist\'s Charm', { 'living_shard_crafting_item':'1', 'flawless_orb_crafting_item':'1', 'charmbit_crafting_item':'4' } ],
	[ 'Charm - Shattering Charm', { 'aromatic_oil_crafting_item':'1', 'epic_orb_crafting_item':'1', 'essence_i_crafting_item':'1', 'charmbit_crafting_item':'1000' } ],
	[ 'Charm - Soap Charm', { 'soapy_suds_crafting_item':'2', 'flawed_orb_crafting_item':'1', 'charmbit_crafting_item':'10' } ],
	[ 'Charm - Spore Charm', { 'cavern_fungus_crafting_item':'2', 'flawed_orb_crafting_item':'1', 'charmbit_crafting_item':'80' } ],
	[ 'Charm - Stagnant Charm', { 'wicked_thorns_crafting_item':'1', 'simple_orb_crafting_item':'1', 'calcified_rift_mist_crafting_item':'3', 'charmbit_crafting_item':'45' } ],
	[ 'Charm - Super Brain Charm', { 'simple_orb_crafting_item':'1', 'brain_bit_crafting_item':'12', 'charmbit_crafting_item':'50' } ],
	[ 'Charm - Super Rotten Charm', { 'stale_super_brie_craft_item':'1', 'flawed_orb_crafting_item':'1', 'charmbit_crafting_item':'12' } ],
	[ 'Charm - Super Salt Charm', { 'essence_b_crafting_item':'2', 'perfect_orb':'1', 'extra_coarse_salt_crafting_item':'1' } ],
	[ 'Charm - Super Warpath Cavalry Charm', { 'desert_horseshoe_crafting_item':'1', 'magic_essence_craft_item':'1', 'simple_orb_crafting_item':'1', 'charmbit_crafting_item':'2' } ],
	[ 'Charm - Super Warpath Mage Charm', { 'heatproof_mage_cloth_crafting_item':'1', 'magic_essence_craft_item':'1', 'simple_orb_crafting_item':'1', 'charmbit_crafting_item':'2' } ],
	[ 'Charm - Ultimate Charm', { 'epic_orb_crafting_item':'1', 'rift_crystal_crafting_item':'1', 'rift_mist_crafting_item':'1', 'rift_stars_crafting_item':'1', 'charmbit_crafting_item':'2500' } ],
	[ 'Charm - Ultimate Luck Charm', { 'perfect_orb':'1', 'charmbit_crafting_item':'1000', 'essence_f_crafting_item':'1' } ],
	[ 'Charm - Ultimate Power Charm', { 'perfect_orb':'1', 'charmbit_crafting_item':'1000', 'essence_e_crafting_item':'1' } ],
	[ 'Charm - Warpath Cavalry Charm', { 'desert_horseshoe_crafting_item':'1', 'ionized_salt_craft_item':'1', 'simple_orb_crafting_item':'1', 'charmbit_crafting_item':'2' } ],
	[ 'Charm - Warpath Mage Charm', { 'heatproof_mage_cloth_crafting_item':'1', 'ionized_salt_craft_item':'1', 'simple_orb_crafting_item':'1', 'charmbit_crafting_item':'2' } ],
	[ 'Charm - Wild Growth Charm', { 'epic_orb_crafting_item':'1', 'charmbit_crafting_item':'1000', 'essence_e_crafting_item':'1', 'fresh_living_garden_soil_crafting_item':'1' } ],
	[ 'Charm - Yellow Double Sponge Charm', { 'essence_b_crafting_item':'2', 'perfect_orb':'1', 'yellow_double_dewdrop_powder_crafting_item':'1' } ],
	[ 'Cheese - Ancient (3)', { 'ionized_salt_craft_item':'6', 'stale_cheese_craft_item':'3' } ],
	[ 'Cheese - Ancient using SB+ (6)', { 'ionized_salt_craft_item':'6', 'magic_essence_craft_item':'3', 'stale_cheese_craft_item':'3' } ],
	[ 'Cheese - Checkmate (3)', { 'mystic_curd_crafting_item':'1', 'tech_cheese_mould_crafting_item':'1', 'ionized_salt_craft_item':'12' } ],
	[ 'Cheese - Checkmate using SB+ (9)', { 'mystic_curd_crafting_item':'1', 'tech_cheese_mould_crafting_item':'1', 'ionized_salt_craft_item':'12', 'magic_essence_craft_item':'6' } ],
	[ 'Cheese - Combat (3)', { 'curds_and_whey_craft_item':'5', 'paintbrand_paint_craft_item':'1', 'splintered_wood_craft_item':'1', 'token_of_the_cheese_fang_craft_item':'3' } ],
	[ 'Cheese - Creamy Havarti (6)', { 'coconut_milk_craft_item':'10', 'creamy_orange_pepper_craft_item':'6', 'curds_and_whey_craft_item':'18', 'salt_craft_item':'6' } ],
	[ 'Cheese - Crunchy Havarti (6)', { 'coconut_milk_craft_item':'4', 'crunchy_green_pepper_craft_item':'6', 'curds_and_whey_craft_item':'18', 'salt_craft_item':'6' } ],
	[ 'Cheese - Crunchy (15)', { 'coconut_milk_craft_item':'20', 'curds_and_whey_craft_item':'10', 'delicious_stone_craft_item':'30', 'salt_craft_item':'30' } ],
	[ 'Cheese - Crunchy using SB+ (20)', { 'coconut_milk_craft_item':'20', 'curds_and_whey_craft_item':'10', 'delicious_stone_craft_item':'30', 'salt_craft_item':'30', 'magic_essence_craft_item':'5' } ],
	[ 'Cheese - Diamond (1)', { 'diamond_crafting_item':'10', 'mineral_crafting_item':'100', 'ionized_salt_craft_item':'12', 'curds_and_whey_craft_item':'3' } ],
	[ 'Cheese - Gemstone (3)', { 'gemstone_crafting_item':'3', 'mineral_crafting_item':'28', 'ionized_salt_craft_item':'6', 'curds_and_whey_craft_item':'6' } ],
	[ 'Cheese - Gumbo (15)', { 'coconut_milk_craft_item':'15', 'curds_and_whey_craft_item':'90', 'salt_craft_item':'1', 'savoury_vegetables_craft_item':'30' } ],
	[ 'Cheese - Gumbo using SB+ (20)', { 'coconut_milk_craft_item':'15', 'curds_and_whey_craft_item':'90', 'salt_craft_item':'1', 'savoury_vegetables_craft_item':'30', 'magic_essence_craft_item':'5' } ],
	[ 'Cheese - Glowing Gruyere (3)', { 'cavern_fungus_crafting_item':'3', 'cave_nightshade_crafting_item':'1', 'living_shard_crafting_item':'3', 'ionized_salt_craft_item':'6', 'curds_and_whey_craft_item':'30' } ],
	[ 'Cheese - Glowing Gruyere using SB+ (5)', { 'cavern_fungus_crafting_item':'3', 'cave_nightshade_crafting_item':'1', 'living_shard_crafting_item':'3', 'ionized_salt_craft_item':'6', 'curds_and_whey_craft_item':'30', 'magic_essence_craft_item':'2' } ],
	[ 'Cheese - Glutter (3)', { 'cheesy_fluffs_craft_item':'1', 'curds_and_whey_craft_item':'7', 'invisiglu_craft_item':'1', 'token_of_the_cheese_belt_craft_item':'3' } ],
	[ 'Cheese - Inferno Havarti (6)', { 'coconut_milk_craft_item':'16', 'curds_and_whey_craft_item':'18', 'fire_salt_craft_item':'6', 'inferno_pepper_craft_item':'6' } ],
	[ 'Cheese - Limelight (3)', { 'curds_and_whey_craft_item':'30', 'living_shard_crafting_item':'3', 'radioactive_sludge_craft_item':'3' } ],
	[ 'Cheese - Magical Havarti (6)', { 'coconut_milk_craft_item':'2', 'curds_and_whey_craft_item':'18', 'magical_blue_pepper_craft_item':'6', 'salt_craft_item':'6' } ],
	[ 'Cheese - Magical String Cheese (1)', { 'magic_essence_craft_item':'1', 'essence_a_crafting_item':'1', 'rift_cheese_curd_crafting_item':'1' } ],
	[ 'Cheese - Maki (3)', { 'curds_and_whey_craft_item':'3', 'magic_essence_craft_item':'3', 'nori_craft_item':'1' } ],
	[ 'Cheese - Mineral (3)', { 'mineral_crafting_item':'12', 'ionized_salt_craft_item':'6', 'curds_and_whey_craft_item':'18' } ],
	[ 'Cheese - Mineral using SB+ (6)', { 'mineral_crafting_item':'12', 'ionized_salt_craft_item':'6', 'curds_and_whey_craft_item':'18', 'magic_essence_craft_item':'6' } ],
	[ 'Cheese - Moon (1)', { 'curds_and_whey_craft_item':'3', 'magic_essence_craft_item':'2', 'meteorite_piece_craft_item':'1' } ],
	[ 'Cheese - Mountain Cheese (5)', { 'mountain_cheese_ore_crafting_item':'10', 'curds_and_whey_craft_item':'5', 'salt_craft_item':'10' } ],
	[ 'Cheese - Onyx Gorgonzola (3)', { 'curds_and_whey_craft_item':'60', 'ionized_salt_craft_item':'6', 'onyx_stone_craft_item':'1' } ],
	[ 'Cheese - Pungent Havarti (6)', { 'coconut_milk_craft_item':'8', 'curds_and_whey_craft_item':'18', 'pungent_purple_pepper_craft_item':'6', 'salt_craft_item':'6' } ],
	[ 'Cheese - Rancid RB Cheese (1)', { 'radioactive_curd_crafting_item':'2', 'radioactive_sludge_craft_item':'1', 'ionized_salt_craft_item':'1' } ],
	[ 'Cheese - Resonator Cheese (3)', { 'magic_seed_crafting_item':'3', 'riftgrass_crafting_item':'3', 'rift_dust_crafting_item':'3', 'rift_cheese_curd_crafting_item':'1', 'ionized_salt_craft_item':'1' } ],
	[ 'Cheese - Res. Cheese using SB+ (4)', { 'magic_seed_crafting_item':'3', 'riftgrass_crafting_item':'3', 'rift_dust_crafting_item':'3', 'rift_cheese_curd_crafting_item':'1', 'ionized_salt_craft_item':'1', 'magic_essence_craft_item':'1' } ],
	[ 'Cheese - Rumble with Seal (3)', { 'curds_and_whey_craft_item':'20', 'ionized_salt_craft_item':'1', 'masters_seal_craft_item':'1' } ],
	[ 'Cheese - Rumble with Shards (3)', { 'curds_and_whey_craft_item':'20', 'ionized_salt_craft_item':'1', 'master_belt_shard_craft_item':'1', 'master_claw_shard_craft_item':'1', 'master_fang_shard_craft_item':'1' } ],
	[ 'Cheese - Runic (1)', { 'ionized_salt_craft_item':'3', 'rune_craft_item':'1', 'stale_cheese_craft_item':'1' } ],
	[ 'Cheese - Runic using SB+ (2)', { 'ionized_salt_craft_item':'3', 'rune_craft_item':'1', 'stale_cheese_craft_item':'1', 'magic_essence_craft_item':'1' } ],
	[ 'Cheese - Shell (15)', { 'coconut_milk_craft_item':'10', 'curds_and_whey_craft_item':'60', 'salt_craft_item':'40', 'seashell_craft_item':'30' } ],
	[ 'Cheese - Shell using SB+ (20)', { 'coconut_milk_craft_item':'10', 'curds_and_whey_craft_item':'60', 'salt_craft_item':'40', 'seashell_craft_item':'30', 'magic_essence_craft_item':'5' } ],
	[ 'Cheese - Spicy Havarti (6)', { 'coconut_milk_craft_item':'12', 'curds_and_whey_craft_item':'18', 'salt_craft_item':'6', 'spicy_red_pepper_craft_item':'6' } ],
	[ 'Cheese - SUPER|brie+ (1)', { 'curds_and_whey_craft_item':'1', 'magic_essence_craft_item':'1', 'salt_craft_item':'1' } ],
	[ 'Cheese - Susheese (3)', { 'burroughs_salmon_craft_item':'1', 'curds_and_whey_craft_item':'3', 'nori_craft_item':'1', 'token_of_the_cheese_claw_craft_item':'3' } ],
	[ 'Cheese - Sweet Havarti (6)', { 'coconut_milk_craft_item':'6', 'curds_and_whey_craft_item':'18', 'salt_craft_item':'6', 'sweet_yellow_pepper_craft_item':'6' } ],
	[ 'Cheese - Toxic Brie (1)', { 'recycled_essence_crafting_item':'4', 'curds_and_whey_craft_item':'16', 'ionized_salt_craft_item':'1' } ],
	[ 'Cheese - Toxic SUPER|brie+ (1)', { 'recycled_essence_crafting_item':'3', 'curds_and_whey_craft_item':'16', 'ionized_salt_craft_item':'1', 'magic_essence_craft_item':'1' } ],
	[ 'Cheese - Vanilla Stilton (15)', { 'coconut_milk_craft_item':'15', 'curds_and_whey_craft_item':'15', 'salt_craft_item':'15', 'vanilla_bean_crafting_item':'15' } ],
	[ 'Cheese - V. Stilton using SB+ (15)', { 'coconut_milk_craft_item':'15', 'curds_and_whey_craft_item':'15', 'salt_craft_item':'15', 'vanilla_bean_crafting_item':'5', 'magic_essence_craft_item':'15' } ],
	[ 'Cheese - Vengeful Vanilla Stilton (1)', { 'bottled_up_rage_crafting_item':'1', 'coconut_milk_craft_item':'1', 'curds_and_whey_craft_item':'1', 'ionized_salt_craft_item':'1', 'pinch_of_annoyance_crafting_item':'1', 'raisins_of_wrath':'1', 'vanilla_bean_crafting_item':'1' } ],
	[ 'Cheese - Venge V. Stilton using SB+ (3)', { 'bottled_up_rage_crafting_item':'1', 'coconut_milk_craft_item':'1', 'curds_and_whey_craft_item':'1', 'ionized_salt_craft_item':'1', 'magic_essence_craft_item':'3', 'pinch_of_annoyance_crafting_item':'1', 'raisins_of_wrath':'1', 'vanilla_bean_crafting_item':'1' } ],
	[ 'Cheese - White Cheddar (1)', { 'curds_and_whey_craft_item':'1', 'salt_craft_item':'1' } ],
	[ 'Essence - Ber', { 'essence_a_crafting_item':'3', 'essence_prism_crafting_item':'1' } ],
	[ 'Essence - Cynd', { 'essence_b_crafting_item':'3', 'essence_prism_crafting_item':'1' } ],
	[ 'Essence - Dol', { 'essence_c_crafting_item':'3', 'essence_prism_crafting_item':'1' } ],
	[ 'Essence - Est', { 'essence_d_crafting_item':'3', 'essence_prism_crafting_item':'1' } ],
	[ 'Essence - Fel', { 'essence_e_crafting_item':'3', 'essence_prism_crafting_item':'1' } ],
	[ 'Essence - Gur', { 'essence_f_crafting_item':'3', 'essence_prism_crafting_item':'1' } ],
	[ 'Essence - Hix', { 'essence_g_crafting_item':'3', 'essence_prism_crafting_item':'1' } ],
	[ 'Essence - Icuri', { 'essence_h_crafting_item':'3', 'essence_prism_crafting_item':'1' } ],
	[ 'Map - Balack\'s Lantern', { 'dragon_ember':'3', 'old_lantern':'1' } ],
	[ 'Map - Ocean Navigation Kit', { 'compass_craft_item':'1', 'sextant_craft_item':'1', 'telescope_craft_item':'1' } ],
	[ 'Map - S.S. Huntington III', { 'bolt_of_cloth_craft_item':'70', 'kings_reserve_bubbleh_craft_item':'1', 'rope_craft_item':'100', 'scrap_metal_craft_item':'18', 'ship_blueprints_craft_item':'1', 'splintered_wood_craft_item':'900' } ],
	[ 'Map - S.S. Huntington III', { 'kings_reserve_bubbleh_craft_item':'1', 'unchristened_ship_craft_item':'1' } ],
	[ 'Master\'s Seal', { 'master_belt_shard_craft_item':'1', 'master_claw_shard_craft_item':'1', 'master_fang_shard_craft_item':'1' } ],
	[ 'Plant - Creamy Orange Pepper', { 'plant_pot_craft_item':'1', 'red_pepper_seed_craft_item':'1', 'yellow_pepper_seed_craft_item':'1' } ],
	[ 'Plant - Crunchy Green Pepper', { 'plant_pot_craft_item':'1', 'blue_pepper_seed_craft_item':'1', 'yellow_pepper_seed_craft_item':'1' } ],
	[ 'Plant - Inferno Pepper', { 'plant_pot_craft_item':'1', 'blue_pepper_seed_craft_item':'1', 'red_pepper_seed_craft_item':'1', 'yellow_pepper_seed_craft_item':'1' } ],
	[ 'Plant - Magical Blue Pepper', { 'plant_pot_craft_item':'1', 'blue_pepper_seed_craft_item':'2' } ],
	[ 'Plant - Pungent Purple Pepper', { 'plant_pot_craft_item':'1', 'blue_pepper_seed_craft_item':'1', 'red_pepper_seed_craft_item':'1' } ],
	[ 'Plant - Spicy Red Pepper', { 'plant_pot_craft_item':'1', 'red_pepper_seed_craft_item':'2' } ],
	[ 'Plant - Sweet Yellow Pepper', { 'plant_pot_craft_item':'1', 'yellow_pepper_seed_craft_item':'2' } ],
	[ 'Theme - Burroughs Rift', { 'burroughs_rift_theme_scrap_1_crafting_item':'1', 'burroughs_rift_theme_scrap_2_crafting_item':'1', 'burroughs_rift_theme_scrap_3_crafting_item':'1' } ],
	[ 'Theme - Football', { 'football_theme_scrap_1_crafting_item':'1', 'football_theme_scrap_2_crafting_item':'1', 'football_theme_scrap_3_crafting_item':'1' } ],
	[ 'Theme - Halloween', { 'halloween_theme_scrap_1_crafting_item':'1', 'halloween_theme_scrap_2_crafting_item':'1', 'halloween_theme_scrap_3_crafting_item':'1' } ],
	[ 'Theme - Living Garden', { 'living_garden_theme_scrap_1_crafting_item':'1', 'living_garden_theme_scrap_2_crafting_item':'1', 'living_garden_theme_scrap_3_crafting_item':'1' } ],
	[ 'Theme - Polluted', { 'polluted_theme_scrap_1_crafting_item':'1', 'polluted_theme_scrap_2_crafting_item':'1', 'polluted_theme_scrap_3_crafting_item':'1' } ],
	[ 'Theme - Spooky Halloween', { 'halloween_2014_theme_scrap_1_crafting_item':'1', 'halloween_2014_theme_scrap_2_crafting_item':'1', 'halloween_2014_theme_scrap_3_crafting_item':'1' } ],
	[ 'Theme - Undead', { 'halloween_undead_theme_scrap_1_crafting_item':'1', 'halloween_undead_theme_scrap_2_crafting_item':'1', 'halloween_undead_theme_scrap_3_crafting_item':'1' } ],
	[ 'Trap - A.C.R.o.N.Y.M.', { 'magic_essence_craft_item':'3', 'mysterious_blueprints_craft_item':'1', 'obelisk_parts_craft_item':'1', 'onyx_stone_craft_item':'1', 'scrap_metal_craft_item':'12' } ],
	[ 'Trap - A.C.R.o.N.Y.M. (repair)', { 'acronym_parts_crafting_item':'1' } ],
	[ 'Trap - Ambush', { 'ambush_trap_blueprints_craft_item':'1', 'droid_parts_craft_item':'8', 'masters_seal_craft_item':'1', 'rice_paper_craft_item':'3', 'splintered_wood_craft_item':'5' } ],
	[ 'Trap - Ambush (repair)', { 'ambush_trap_parts_crafting_item':'1' } ],
	[ 'Trap - Ancient Box', { 'ancient_box_trap_blueprints_craft_item':'1', 'ancient_relic_staff_craft_item':'1', 'encrusted_metal_of_time_craft_item':'1', 'engraved_solid_stone_slab_craft_item':'1', 'ethereal_rope_craft_item':'1', 'hinge_of_eternity_craft_item':'1', 'timeless_mystic_gem_craft_item':'1' } ],
	[ 'Trap - Ancient Spear Gun', { 'ancient_spear_craft_item':'1', 'ancient_spear_launcher_blueprints_craft_item':'1', 'launcher_parts_craft_item':'1' } ],
	[ 'Trap - Blackstone Pass', { 'blackstone_pass_blueprints_crafting_item':'1', 'coal_craft_item':'4', 'mystic_crystal_crafting_item':'1' } ],
	[ 'Trap - Cackle Lantern (LE)', { 'digby_drillbot_parts_craft_item':'1', 'dragon_ember':'1', 'obelisk_parts_craft_item':'1', 'smashed_pumpkin_crafting_item':'1', 'venus_mouse_trap_husk_craft_item':'1', 'platinum_bar_crafting_item':'24' } ],
	[ 'Trap - Clockapult of Time (repair)', { 'clock_parts_crafting_item':'1' } ],
	[ 'Trap - Clockwork Portal', { 'clockwork_portal_blueprints_crafting_item':'1', 'clock_parts_crafting_item':'1', 'umbral_capacitor_crafting_item':'8' } ],
	[ 'Trap - Chrome MonstroBot', { 'chrome_monstrobot_upgrade_crafting_item':'1', 'sandstorm_monstrobot_parts_crafting_item':'1' } ],
	[ 'Trap - Chrome Nannybot (LE)', { 'chrome_nanite_coating_crafting_item':'1', 'nanny_glasses_crafting_item':'1', 'nannybot_parts_crafting_item':'1', 'timeout_upgrade_crafting_item':'1' } ],
	[ 'Trap - Digby Drillbot (repair)', { 'digby_drillbot_parts_craft_item':'1' } ],
	[ 'Trap - Double Diamond Adventure (LE)', { 'climbing_pitons_crafting_item':'1', 'mine_crafting_item':'1', 'lava_bucket_crafting_item':'1', 'missile_cone_crafting_item':'1', 'ski_sign_crafting_item':'1', 'toboggan_ride_parts_crafting_item':'1', 'platinum_bar_crafting_item':'18' } ],
	[ 'Trap - Enraged RhinoBot', { 'rhinobot_parts_crafting_item':'1', 'rhino_horn_craft_item':'3', 'stale_super_brie_craft_item':'48', 'platinum_bar_crafting_item':'6' } ],
	[ 'Trap - Fluffy DeathBot', { 'fluffy_deathbot_skin_crafting_item':'1', 'deathbot_parts_craft_item':'1' } ],
	[ 'Trap - Gingerbread House Surprise', { 'candies_craft_item':'10', 'gingerbread_house_plans_craft_item':'1', 'icing_sugar_craft_item':'5', 'plank_of_gingerbread_craft_item':'7' } ],
	[ 'Trap - Glacier Gatler (LE)', { 'ice_blaster_parts_crafting_item':'1', 'oasis_bead_crafting_item':'1', 'frosty_metal_crafting_item':'7', 'living_shard_crafting_item':'600' } ],
	[ 'Trap - Grand Arcanum', { 'grand_arcanum_blueprints_crafting_item':'1', 'acronym_parts_crafting_item':'1', 'arcane_crystal_crafting_item':'1', 'platinum_bar_crafting_item':'40' } ],
	[ 'Trap - Grungy DeathBot', { 'grungy_deathbot_skin_crafting_item':'1', 'deathbot_parts_craft_item':'1' } ],
	[ 'Trap - Harpoon Gun (repair)', { 'launcher_parts_craft_item':'1' } ],
	[ 'Trap - Heat Bath', { 'launcher_parts_craft_item':'2', 'heat_bath_blueprints_crafting_item':'1', 'scrap_metal_craft_item':'6', 'coal_craft_item':'36' } ],
	[ 'Trap - High Tension Spring (repair)', { 'high_tension_spring_parts_craft_item':'1' } ],
	[ 'Trap - HitGrab Rainbow Rockin\' Horsey (LE)', { 'rainbow_mohawk_wig_of_awesomeness_craft_item':'1', 'hobby_horse_parts_craft_item':'1', 'invisiglu_craft_item':'1' } ],
	[ 'Trap - Horrific Venus Mouse Trap', { 'radioactive_sludge_craft_item':'20', 'thorned_venus_mouse_trap_husk_craft_item':'1' } ],
	[ 'Trap - Ice Blaster (LE)', { 'ice_blaster_parts_crafting_item':'1' } ],
	[ 'Trap - Ice Maiden', { 'frozen_scroll_craft_item':'1', 'high_tension_spring_parts_craft_item':'1', 'rune_craft_item':'60' } ],
	[ 'Trap - Mouse DeathBot', { 'deathbot_parts_craft_item':'1' } ],
	[ 'Trap - Mutated Venus Mouse Trap', { 'radioactive_sludge_craft_item':'20', 'venus_mouse_trap_husk_craft_item':'1' } ],
	[ 'Trap - Net Cannon Trap', { 'launcher_parts_craft_item':'1', 'rope_craft_item':'1' } ],
	[ 'Trap - Ninja Ambush', { 'ambush_trap_parts_crafting_item':'1', 'ninja_ambush_skin_crafting_item':'1' } ],
	[ 'Trap - Oasis Water Node Trap', { 'oasis_water_node_blueprint_crafting_item':'1', 'oasis_bead_crafting_item':'1', 'living_shard_crafting_item':'1000', 'coconut_milk_craft_item':'1', 'flameshard_crafting_item':'150' } ],
	[ 'Trap - Oasis Water Node Trap (repair)', { 'oasis_water_node_parts_crafting_item':'1' } ],
	[ 'Trap - Obelisk of Incineration', { 'coal_craft_item':'1', 'obelisk_of_incineration_blueprints_craft_item':'1', 'obelisk_parts_craft_item':'1', 'scrap_metal_craft_item':'2', 'splintered_wood_craft_item':'3' } ],
	[ 'Trap - Obelisk of Slumber', { 'obelisk_parts_craft_item':'1', 'bead_of_slumber_craft_item':'1' } ],
	[ 'Trap - Onyx Mallet', { 'onyx_mallet_blueprints_crafting_item':'1', 'onyx_stone_craft_item':'12', 'platinum_bar_crafting_item':'10' } ],
	[ 'Trap - Obvious Ambush', { 'obvious_ambush_blueprints_crafting_item':'1', 'droid_jetpack_crafting_item':'1', 'droid_parts_craft_item':'1' } ],
	[ 'Trap - PartyBot (LE)', { 'deathbot_parts_craft_item':'1', 'party_hat_craft_item':'1' } ],
	[ 'Trap - Phantasmic Oasis', { 'phantasmic_oasis_blueprints_crafting_item':'1', 'oasis_water_node_parts_crafting_item':'1', 'phantasmic_essence_crafting_item':'3' } ],
	[ 'Trap - Pumpkin Pummeler (LE)', { 'evil_pumpkin_seed_crafting_item':'1', 'pumpkin_pummeler_blueprints_crafting_item':'1' } ],
	[ 'Trap - Reaper\'s Perch', { 'droid_parts_craft_item':'1', 'repear_perch_blueprint_crafting_item':'1', 'monolithic_slab_crafting_item':'6', 'onyx_stone_craft_item':'6', 'rune_craft_item':'6' } ],
	[ 'Trap - RhinoBot', { 'digby_drillbot_parts_craft_item':'1', 'rhino_horn_craft_item':'1', 'rhinobot_blueprints_craft_item':'1', 'stale_super_brie_craft_item':'24' } ],
	[ 'Trap - RhinoBot (repair)', { 'rhinobot_parts_crafting_item':'1' } ],
	[ 'Trap - Sandstorm MonstroBot', { 'sandstormbot_weapon_blueprint_crafting_item':'1', 'flameshard_crafting_item':'400', 'sandblasted_metal_crafting_item':'2', 'rhinobot_parts_crafting_item':'1', 'digby_drillbot_parts_craft_item':'1', 'deathbot_parts_craft_item':'1' } ],
	[ 'Trap - Sandstorm MonstroBot (repair)', { 'sandstorm_monstrobot_parts_crafting_item':'1' } ],
	[ 'Trap - Scum Scrubber', { 'scum_scrubber_trap_blueprints_crafting_item':'1', 'recycled_essence_crafting_item':'400', 'scrap_metal_craft_item':'40', 'soapy_suds_crafting_item':'50', 'canister_ring_crafting_item':'4' } ],
	[ 'Trap - Soul Catcher (LE) (repair)', { 'soul_catcher_parts_crafting_item':'1' } ],
	[ 'Trap - Soul Harvester (LE)', { 'soul_catcher_parts_crafting_item':'1', 'onyx_stone_craft_item':'2', 'monolithic_slab_crafting_item':'2', 'platinum_bar_crafting_item':'12', 'living_shard_crafting_item':'12' } ],
	[ 'Trap - Sphynx Wrath', { 'sphynx_weapon_blueprint_crafting_item':'1', 'sphynx_crystal_crafting_item':'1', 'gold_leaf_crafting_item':'28', 'flameshard_crafting_item':'200' } ],
	[ 'Trap - Steam Laser Mk. I (repair)', { 'steam_laser_mk_i_parts_crafting_item':'1' } ],
	[ 'Trap - Steam Laser Mk. II', { 'steam_laser_mk_i_parts_crafting_item':'1', 'well_sealed_canister_crafting_item':'1', 'wire_spool_crafting_item':'15', 'heating_oil_crafting_item':'15', 'frosty_metal_crafting_item':'15', 'cold_fusion_crafting_item':'4' } ],
	[ 'Trap - Steam Laser Mk. II (repair)', { 'steam_laser_mk_ii_parts_crafting_item':'1' } ],
	[ 'Trap - Steam Laser Mk. III', { 'steam_laser_mk_ii_parts_crafting_item':'1', 'steam_nine_crafting_item':'1' } ],
	[ 'Trap - Thorned Venus Mouse Trap', { 'thorned_mouse_trap_plans_craft_item':'1', 'thorned_vine_craft_item':'1', 'venus_mouse_trap_husk_craft_item':'1' } ],
	[ 'Trap - Venus Mouse Trap (repair)', { 'venus_mouse_trap_husk_craft_item':'1' } ],
	[ 'Trap - Zugzwang\'s First Move', { 'magical_feather_crafting_item':'1', 'zugzwangs_first_move_crafting_item':'1', 'chess_pieces_crafting_item':'1' } ],
	[ 'Trap - Zugzwang\'s Last Move (repair)', { 'chess_pieces_crafting_item':'1' } ],
	[ 'Trap - Zurreal\'s Folly', { 'zzl_marchingflameresearch_crafting_item':'1', 'zzl_ripper_nail':'3', 'zzl_ectoplasm':'3', 'zzl_gnawniaresearch_crafting_item':'1', 'zzl_fine_wood_crafting_item':'6', 'zzl_stonework_runes':'3', 'zzl_mesh_netting':'1', 'zzl_lich_jewel':'1', 'zzl_draconic_book':'1' } ],
	[ 'Unchirstened Ship', { 'bolt_of_cloth_craft_item':'70', 'rope_craft_item':'100', 'scrap_metal_craft_item':'18', 'ship_blueprints_craft_item':'1', 'splintered_wood_craft_item':'900' } ],
	[ 'Unstable Curd', { 'curds_and_whey_craft_item':'1', 'ionized_salt_craft_item':'1', 'onyx_stone_craft_item':'1' } ],
	[ 'Unstable Gourd', { 'essence_e_crafting_item':'1', 'plant_pot_craft_item':'1' } ],
	[ 'Zugzwang\'s Tower Key', { 'summer_key_shard_crafting_item':'1', 'fall_key_shard_crafting_item':'1', 'winter_key_shard_crafting_item':'1', 'spring_key_shard_crafting_item':'1' } ]
];

var INVID = 0, INVTYPE = 1, INVNAME = 2, INVDETAIL = 3, INVQTY = 4, INVEXTRA = 5;
var INVENTORY = Array();
var INV_TYPE_BAIT = 0, INV_TYPE_BASE = 1, INV_TYPE_BREAK = 2, INV_TYPE_COLLECTIBLE = 3, INV_TYPE_CONVERT = 4, INV_TYPE_CRAFTING = 5, INV_TYPE_MAPS = 6, INV_TYPE_MESSAGE_ITEM = 7, INV_TYPE_POTION = 8, INV_TYPE_QUEST = 9, INV_TYPE_SKIN = 10, INV_TYPE_STAT = 11, INV_TYPE_TRINKET = 12, INV_TYPE_TORN_PAGE = 13, INV_TYPE_WEAPON = 14, INV_TYPE_NONE = 15;
var INVENTORY_TYPES_TEXT = [ 'bait', 'base', 'breakable', 'collectible', 'covertible', 'crafting_item', 'map_piece', 'message_item', 'potion', 'quest', 'skin', 'stat', 'trinket', 'torn_page', 'weapon', 'none' ];

var CRAFTID = 0, CRAFTNAME = 1, CRAFTDETAIL = 2, CRAFTQTY = 3;
var CRAFTING = Array();

var LOCATION_TIMERS = [
	[ 'Seasonal Garden', { first: 1283616000, length: 288000, breakdown: [ 1, 1, 1, 1 ], name: [ 'Summer', 'Autumn', 'Winter', 'Spring' ], color: [ 'Red', 'Orange', 'Blue', 'Green' ], effective: [ 'tactical', 'shadow', 'hydro', 'physical' ] } ],
	[ 'Balack\'s Cove', { first: 1294680060, length: 1200, breakdown: [ 48, 3, 2, 3 ], name: [ 'Low', 'Medium (in)', 'High', 'Medium (out)' ], color: [ 'Green', 'Orange', 'Red', 'Orange' ] } ],
	[ 'Forbidden Grove', { first: 1285704000, length: 14400, breakdown: [ 4, 1 ], name: [ 'Open', 'Closed' ], color: [ 'Green', 'Red' ] } ],
	[ 'Relic Hunter', { url: 'https://deceptivestudios.com/proxy.php?url=http%3A%2F%2Fhorntracker.com%2Fbackend%2Frelichunter.php%3FfunctionCall%3Drelichunt', length: 86400 } ],
	[ 'Toxic Spill', { url: 'https://deceptivestudios.com/proxy.php?url=http%3A%2F%2Fhorntracker.com%2Fbackend%2Fnew%2Ftoxic.php%3FfunctionCall%3Dspill' } ]
];

function DSXC_setValue(name, value)
{
	localStorage.setItem('MHH ' + name, '' + value);
}

function DSXC_getValue(name, value, full)
{
	var DSXC_getValueReturn = value;
	
	if (typeof(full) != 'boolean') full = false;
	
	var getvalue = localStorage.getItem('MHH ' + name);
	
	if (getvalue)
	{
		if (getvalue == 'true')
			getvalue = true;
		else if (getvalue == 'false')
			getvalue = false;
		
		DSXC_getValueReturn = getvalue;
	}
	
	return DSXC_getValueReturn;
}

function ValueDetail(type, value)
{
	var ValueDetailReturn = '';
	
	switch (type)
	{
		case 'string':
		{
			ValueDetailReturn = value;
		} break;
		
		case 'boolean':
		{
			switch (value)
			{
				case 'true':
				{
					ValueDetailReturn = true;
				} break;
				
				case 'false':
				{
					ValueDetailReturn = false;
				} break;
			}
		} break;
		
		case 'number':
		{
			ValueDetailReturn = Number(value);
		}
	}
	
	return ValueDetailReturn;
}

function DSXC_log(text)
{
	console.log(text);
}

function GetFullDomain(text)
{
	var FullDomainReturn = '';
	var StartPos = text.indexOf('//');
	
	if (StartPos != -1)
	{
		var EndPos = text.indexOf('/', StartPos + 2);
		if (EndPos == -1) EndPos = text.length;
		
		FullDomainReturn = text.substring(StartPos + 2, EndPos);
		
		if (FullDomainReturn.substring((FullDomainReturn.length - 1)) == '/')
		{
			FullDomainReturn = FullDomainReturn.substring(0, (FullDomainReturn.length - 1));
		}
	}
	
	return FullDomainReturn;
}

function DSXC_xmlHttpRequest(options)
{
	var request = new XMLHttpRequest()
	  
	if (request != null)
	{
		request.onload = function() {
	  	var response = {
	      responseText: request.responseText,
	      readyState: request.readyState,
	      responseHeaders: (request.readyState == 4 ? request.getAllResponseHeaders() : ''),
	      status: request.readyState == 4 ? request.status : 0,
	      statusText: request.readyState == 4 ? request.statusText : ''
	    };
	    
			options.onload(response);
		}
		
	  request.open(options.method, options.url, true);
	
		if (options.headers)
		{
			if (!options.headers["X-Requested-With"])
			{
				options.headers["X-Requested-With"] = "XMLHttpRequest";
			}
		}
		
	  // set the headers
	  for (var header in options.headers) {
	    request.setRequestHeader(header, options.headers[header]);
	  }
	  
	  // send the data
	  request.send(options.data);
	}
	
	return request;
}

serialize = function(obj)
{
  var str = [];
  
  for (var item in obj)
  {
  	if (typeof obj[item] === "object")
  	{
  		for (var subitem in obj[item])
  		{
		  	if (typeof obj[item][subitem] !== "function")
	  			str.push(encodeURIComponent(item) + "[" + encodeURIComponent(subitem) + "]=" + encodeURIComponent(obj[item][subitem]));
  		}
  	}
  	else if (typeof obj[item] !== "function")
  	{
    	str.push(encodeURIComponent(item) + "=" + encodeURIComponent(obj[item]));
    }
  }
  
  return str.join("&");
}

function ReadSettings()
{
	SETTINGS.horn = DSXC_getValue('SETTINGS.horn', STATE_OFF);
	SETTINGS.king = DSXC_getValue('SETTINGS.king', STATE_OFF);
	SETTINGS.cheese = DSXC_getValue('SETTINGS.cheese', STATE_OFF);
	SETTINGS.washed = DSXC_getValue('SETTINGS.washed', STATE_OFF);
	SETTINGS.season = DSXC_getValue('SETTINGS.season', STATE_OFF);
	SETTINGS.tourney = DSXC_getValue('SETTINGS.tourney', STATE_OFF);

	SETTINGS.direct = DSXC_getValue('SETTINGS.direct', false);
	SETTINGS.showall = DSXC_getValue('SETTINGS.showall', false);
	SETTINGS.timers = DSXC_getValue('SETTINGS.timers', true);
	SETTINGS.title = DSXC_getValue('SETTINGS.title', true);
	SETTINGS.auto = DSXC_getValue('SETTINGS.auto', false);
	SETTINGS.buttons = DSXC_getValue('SETTINGS.buttons', false);
	SETTINGS.length = DSXC_getValue('SETTINGS.length', 10);
}

function SaveSettings()
{
	DSXC_setValue('SETTINGS.horn', SETTINGS.horn);
	DSXC_setValue('SETTINGS.king', SETTINGS.king);
	DSXC_setValue('SETTINGS.cheese', SETTINGS.cheese);
	DSXC_setValue('SETTINGS.washed', SETTINGS.washed);
	DSXC_setValue('SETTINGS.season', SETTINGS.season);
	DSXC_setValue('SETTINGS.tourney', SETTINGS.tourney);

	DSXC_setValue('SETTINGS.direct', SETTINGS.direct);
	DSXC_setValue('SETTINGS.showall', SETTINGS.showall);
	DSXC_setValue('SETTINGS.timers', SETTINGS.timers);
	DSXC_setValue('SETTINGS.title', SETTINGS.title);
	DSXC_setValue('SETTINGS.auto', SETTINGS.auto);
	DSXC_setValue('SETTINGS.buttons', SETTINGS.buttons);
	DSXC_setValue('SETTINGS.length', SETTINGS.length);
}

function ResetSettings()
{
	SETTINGS.horn = STATE_OFF;
	SETTINGS.king = STATE_OFF;
	SETTINGS.cheese = STATE_OFF;
	SETTINGS.washed = STATE_OFF;
	SETTINGS.season = STATE_OFF;
	SETTINGS.tourney = STATE_OFF;

	SETTINGS.direct = false;
	SETTINGS.showall = false;
	SETTINGS.timers = true;
	SETTINGS.title = true;
	SETTINGS.auto = false;
	SETTINGS.buttons = false;
	SETTINGS.length = 5;
	
	ResetWindows();
}

function Initialize()
{
	DSXC_log('MHH v' + SCRIPT.version + ' - startup');
	
	// initialize the user object
	InitUserObject(document.documentElement.innerHTML);
	
	// determine current base
	DetermineBase();
	// determine current cheese
	DetermineCheese();
	// determine the unique hash
	DetermineHash();
	// determine current level
	DetermineLevel();
	// determine current location
	DetermineLocation();
	// determine current trap
	DetermineTrap();
	
	ReadSettings();

	// read the saved inventory from settings
	LoadCrafting();
	LoadInventory();
	
	InitWindow();

	StartTimers();
}

Initialize();

function InitUserObject(value)
{
	DSXC_log('Init UserObject');
	
	var OldUserObject = STATE.userobject;
	
	if (value != null)
	{
		if (typeof value == "string")
		{
			DSXC_log(' - from HTML');
			
			var StartPos = value.indexOf('user = ');
			var EndPos = value.indexOf('};', StartPos);
			
			if (StartPos != -1)
			{
				var FullObjectText = value.substring(StartPos + 7, EndPos + 1);
				STATE.userobject = JSON.parse(FullObjectText);
			}
		}
		else if (typeof value == "object")
		{
			DSXC_log(' - from javascript');
			STATE.userobject = value;
		}
	}
	
	if (STATE.userobject != null)
	{
		if (OldUserObject != null && OldUserObject.location != STATE.userobject.location)
			DSXC_log('Not at expected location, expected ' + OldUserObject.location + ' but at ' + STATE.userobject.location);
		
		UpdatePercentage(STATE.userobject.title_percentage);
	}
}

function LoadInventory()
{
	var TotalItems = DSXC_getValue('Inventory - Max ID', -1);
	
	DSXC_log('Load Inventory Items');
	
	for (iCount1 = 0; iCount1 <= TotalItems; iCount1++)
	{
		var InventoryDetail = DSXC_getValue('Inventory Item - ' + iCount1, 'INVALID');
		INVENTORY[iCount1] = Array();
		
		if (InventoryDetail != 'INVALID')
		{
			var InvValues = InventoryDetail.split(',');
			
			INVENTORY[iCount1][INVID] = iCount1;
			INVENTORY[iCount1][INVTYPE] = InvValues[0];
			INVENTORY[iCount1][INVNAME] = InvValues[1];
			INVENTORY[iCount1][INVDETAIL] = InvValues[2];
			INVENTORY[iCount1][INVQTY] = Number(InvValues[3]);
			
			if (InvValues.length == 5)
			{
				INVENTORY[iCount1][INVEXTRA] = InvValues[4];
			}
		}
		else
		{
			INVENTORY[iCount1][INVID] = -1;
			INVENTORY[iCount1][INVTYPE] = INVENTORY_TYPES_TEXT[INV_TYPE_NONE];
			INVENTORY[iCount1][INVQTY] = 0;
		}
	}
	
	DSXC_log(' - ' + iCount1 + ' loaded');
}

function LoadCrafting()
{
	var TotalItems = DSXC_getValue('Crafting - Max ID', -1);
	var NextItem = 0;
	
	DSXC_log('Load Crafting Items');
	
	for (iCount1 = 0; iCount1 <= TotalItems; iCount1++)
	{
		var CraftDetail = DSXC_getValue('Crafting Item - ' + iCount1, 'INVALID');
		
		if (CraftDetail != 'INVALID')
		{
			var CraftValues = CraftDetail.split(',');
			
			CRAFTING[NextItem] = Array();
			CRAFTING[NextItem][CRAFTID] = iCount1;
			CRAFTING[NextItem][CRAFTNAME] = CraftValues[0];
			CRAFTING[NextItem][CRAFTDETAIL] = CraftValues[1];
			CRAFTING[NextItem][CRAFTQTY] = Number(CraftValues[2]);
			
			NextItem++;
		}
	}
	
	DSXC_log(' - ' + NextItem + ' loaded');
}

function InitWindow()
{
	// display the windows
	DisplayState();
	DisplayTimers();
	DisplayDetail();
}

function DetermineLevel()
{
	STATE.level = -1;
	
	if (STATE.userobject != null)
	{
		DSXC_log("Determine Level");
		DSXC_log(" - Level is " + STATE.userobject.title_name);
		
		STATE.level = GetLevel(STATE.userobject.title_name);
	}
	
	if (STATE.level == -1)
	{
		setTimeout(DetermineLevel, 500);
	}
}

function GetLevel(title_name)
{
	for (count1 = 0; count1 < LEVEL.length; count1++)
	{
		for (count2 = 0; count2 < LEVEL[count1].length; count2++)
		{
			if (title_name == LEVEL[count1][count2])
				return count1;
		}
	}
	
	return LEVEL.length;
}

function DetermineCheese()
{
	if (STATE.userobject != null && STATE.userobject.bait_item_id != null)
	{
		DSXC_log("Determine Cheese");
		
		STATE.cheese = STATE.userobject.bait_item_id;

		if (STATE.cheese != -1 && STATE.cheese < INVENTORY.length)
		{
			DSXC_log(" - Cheese is " + INVENTORY[STATE.cheese][INVNAME]);
		}
		else
		{
			setTimeout(DetermineCheese, 500);
		}
	}
	else
	{
		setTimeout(DetermineCheese, 500);
	}
}

function DetermineLocation()
{
	STATE.location = -1;
	
	if (STATE.userobject != null)
	{
		DSXC_log("Determine Location");
		STATE.location = GetLocationID(STATE.userobject.location);
	
		if (STATE.location != -1)
		{
			// update expected location, this is updated when the page is loaded or you use travel
			DSXC_setValue('STATE.location', STATE.userobject.location);
			DSXC_log(" - Location is " + LOCATION.detail[STATE.location][LNAME]);
		}
	}
	else
	{
		setTimeout(DetermineLocation, 500);
	}
}

function CalculateRouteCosts()
{
	var TotalLocations = LOCATION.costs.length;

	LOCATION.distance = new Array(TotalLocations);
	LOCATION.previous = new Array(TotalLocations);
	
	for (var iCount1 = 0; iCount1 < TotalLocations; iCount1++)
	{
		LOCATION.distance[iCount1] = new Array(TotalLocations);
		LOCATION.previous[iCount1] = new Array(TotalLocations);
		
		for (var iCount2 = 0; iCount2 < TotalLocations; iCount2++)
		{
			LOCATION.previous[iCount1][iCount2] = -99;
			LOCATION.distance[iCount1][iCount2] = -99;
			
			if (CheckMap(LOCATION.detail[iCount2][LMAP]))
			{
				LOCATION.distance[iCount1][iCount2] = LOCATION.costs[iCount1][iCount2];
			}
		}
	}
	
	for (var iCount1 = 0; iCount1 < TotalLocations; iCount1++)
	{
		for (var iCount2 = 0; iCount2 < TotalLocations; iCount2++)
		{
			for (var iCount3 = 0; iCount3 < TotalLocations; iCount3++)
			{
				if ((LOCATION.distance[iCount2][iCount1] + LOCATION.distance[iCount1][iCount3] < LOCATION.distance[iCount2][iCount3] || LOCATION.distance[iCount2][iCount3] == -99) && LOCATION.distance[iCount2][iCount1] != -99 && LOCATION.distance[iCount1][iCount3] != -99)
				{
					LOCATION.distance[iCount2][iCount3] = LOCATION.distance[iCount2][iCount1] + LOCATION.distance[iCount1][iCount3];
					LOCATION.previous[iCount2][iCount3] = iCount1;
				}
			}
		}
	}
}

function CalculateRoute(wherefrom, whereto, route)
{
	if (route == null)
	{
		route = new Array();
		route.push(whereto);
	}
	
	if (LOCATION.previous[wherefrom][whereto] == -99)
	{
		route.reverse();
		return route;
	}
	else
	{
		route.push(LOCATION.previous[wherefrom][whereto]);
	}
	
	return CalculateRoute(wherefrom, LOCATION.previous[wherefrom][whereto], route);
}

function DetermineHash()
{
	if (STATE.userobject != null)
	{
		DSXC_log('Determine Hash');
	
		STATE.hash = STATE.userobject.unique_hash;
		
		DSXC_setValue('STATE.hash', STATE.hash);
		DSXC_log(' - Hash is ' + STATE.hash);
	}
	else
	{
		setTimeout(DetermineHash, 500);
	}
}

function DetermineTrap()
{
	STATE.trap = -1;
	
	if (STATE.userobject != null)
	{
		DSXC_log("Determine Trap");
		
		STATE.trap = STATE.userobject.weapon_item_id;
		DSXC_log(" - Trap is " + STATE.userobject.weapon_name);
	}
	else
	{
		setTimeout(DetermineTrap, 500);
	}
}

function DetermineBase()
{
	STATE.base = -1;
	
	if (STATE.userobject != null)
	{
		DSXC_log("Determine Base");
	
		STATE.base = STATE.userobject.base_item_id;
		DSXC_log(" - Base is " + STATE.userobject.base_name);
	}
	else
	{
		setTimeout(DetermineBase, 500);
	}
}

function CalculatePower(trap, base)
{
	var total_power = 0;
	var multiplier = 1.0;
	
	if (trap != -1 && base != -1)
	{
		total_power = total_power + TRAPS[trap][TPOWER] + BASES[base][BPOWER];
		multiplier = multiplier + ((TRAPS[trap][TBONUS] + BASES[base][BBONUS]) / 100);
		total_power = Math.round((total_power * multiplier) * 10) / 10; // round to 1 decimal place
		total_power = Math.round(total_power);
	}
	
	return total_power;
}

/************************ Drag n drop*******************************/
function CreatePopupWindow(name, w, h, display)
{
	if (display == null) display = true;
	
	if (document.getElementById(name + '_Message') == null)
	{
		if (display)
		{
			var CloseButton = "<A HREF='#' ID='" + name + "_Close'><IMG SRC='" + IMAGE.close + "' border='0' TITLE='Close' ALT='X' /></A>";
			var PopupWindow = document.createElement("div");
			
			var WindowPosition = DSXC_getValue("Position - " + name, "90px_300px");
			WindowPosition = WindowPosition.split("_");
			
			PopupWindow.style.position = 'absolute';
			PopupWindow.style.top = WindowPosition[0];
			PopupWindow.style.left = WindowPosition[1];	
			PopupWindow.style.zIndex = 910;
			
			PopupWindow.id = name + "_Message";
			PopupWindow.innerHTML = "<DIV STYLE='position:absolute; z-index:911; background: white; padding: 0px 0px; color: black; border: 1px solid; font:10pt Verdana; width: " + w + "px; height: " + h + "px;'><DIV ID='" + name + "_Titlebar' STYLE='background: navy; color: white; cursor:move; font-weight: bold'>&nbsp;" + name + " <DIV STYLE='position:absolute; right:0px; top: 0px'>" + CloseButton + "</DIV></DIV><DIV ID='" + name + "' STYLE='padding: 5px 5px; text-align: left; overflow: auto; height: " + (h - 26) + "px;'></DIV></DIV>";
			
			document.body.appendChild(PopupWindow);
			
			makeDraggable(document.getElementById(name + '_Titlebar'));
			document.getElementById(name + '_Close').addEventListener("click", function() { document.getElementById(name + '_Message').parentNode.removeChild(document.getElementById(name + '_Message')) }, false);
			
			return document.getElementById(name);
		}
	}
	else
	{
		document.getElementById(name + '_Message').parentNode.removeChild(document.getElementById(name + '_Message'));
	}
		
	return null;
}

function CreateSlider(node, width, minimum, maximum, show)
{
	var SliderCtrl = document.getElementById(node);
	
	if (SliderCtrl != null)
	{
		SliderCtrl.setAttribute('SliderCtrl', 'idle');
		SliderCtrl.setAttribute('RangeMin', minimum);
		SliderCtrl.setAttribute('RangeMax', maximum);
		SliderCtrl.setAttribute('SliderTrack', 'Slider_Track_' + node);
		SliderCtrl.setAttribute('SliderThumb', 'Slider_Thumb_' + node);
		
		if (show != null) SliderCtrl.setAttribute('SliderValue', show);
		
		SliderCtrl.innerHTML = '<DIV ID="Slider_Track_' + node + '" STYLE="width: 200px; left: 2px; height: 1px; border: 1px solid black"><DIV ID="Slider_Thumb_' + node + '" STYLE="z-index:100; margin-top: -3px; width: 5px; height: 6px; border: 1px solid black; background-color: white"></DIV></DIV>';
		
		SliderCtrl.addEventListener("mousedown", function(ev) { this.setAttribute('SliderCtrl', 'drag'); return false; }, false);
		SliderCtrl.addEventListener("mouseup", function(ev) { this.setAttribute('SliderCtrl', 'idle'); return false; }, false);
		SliderCtrl.addEventListener("mousemove", function(ev) {
			if (this.getAttribute('SliderCtrl') == 'drag')
			{
				var SliderTrack = document.getElementById(this.getAttribute('SliderTrack'));
				var SliderThumb = document.getElementById(this.getAttribute('SliderThumb'));
				
				var MousePos = mouseCoords(ev);
				var TrackPos = getPosition(SliderTrack);
				var ThumbPos = getPosition(SliderThumb);
				
				var Range = {
					min: (TrackPos.x + 2),
					max: (TrackPos.x + parseFloat(SliderTrack.style.width) - 6)
				};
				
				SliderThumb.style.position = 'relative';

				if (Range.min > MousePos.x)
				{
					SliderThumb.style.left = '0px';
				}
				else if (Range.max < MousePos.x)
				{
					SliderThumb.style.left = (Range.max - Range.min) + 'px';
				}
				else
				{
					SliderThumb.style.left = (MousePos.x - Range.min) + 'px';
				}
				
				if (this.getAttribute('SliderValue') != null && document.getElementById(this.getAttribute('SliderValue')) != null)
				{
					document.getElementById(this.getAttribute('SliderValue')).innerHTML = Math.ceil(((parseFloat(SliderThumb.style.left) + 1) * this.getAttribute('RangeMax')) / parseFloat(SliderTrack.style.width));
				}
				
				return false;
			}
		}, false);
	}
}

var mouseOffset = null;
var mousePos    = [ 0, 0 ];
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;

function mouseCoords(ev)
{
	return { x: ev.pageX, y: ev.pageY };
}

function makeClickable(object)
{
	object.onmousedown = function()
	{
		dragObject = this;
	}
}

function getMouseOffset(target, ev)
{
	var dPos = getPosition(target.parentNode);
	var mPos = mouseCoords(ev);
	
	return { x:mPos.x - dPos.x, y:mPos.y - dPos.y };
}

function getPosition(e)
{
	var border_left;
	var border_top;
	var left = 0;
	var top  = 0;
	
	while (e.offsetParent)
	{
		border_left = (e.currentStyle ? parseInt(e.currentStyle.borderLeftWidth) : 0);
		border_top =  (e.currentStyle ? parseInt(e.currentStyle.borderTopWidth)  : 0);
		
		left += e.offsetLeft + (typeof(border_left) == "number" ? border_left : 0);
		top  += e.offsetTop  + (typeof(border_top)  == "number" ? border_top  : 0);
		e     = e.offsetParent;
	}
	
	border_left = (e.currentStyle ? parseInt(e.currentStyle.borderLeftWidth) : 0);
	border_top =  (e.currentStyle ? parseInt(e.currentStyle.borderTopWidth)  : 0);
	
	left += e.offsetLeft + (typeof(border_left) == "number" ? border_left : 0);
	top  += e.offsetTop  + (typeof(border_top)  == "number" ? border_top  : 0);
	
	return { x: left, y: top };
}

function mouseMove(ev)
{
	var target   = ev.target;
	mousePos = mouseCoords(ev);

	if (dragObject)
	{
		dragObject.parentNode.style.position = 'absolute';
		dragObject.parentNode.style.top      = Math.max(0, (mousePos.y - mouseOffset.y)) +"px";
		dragObject.parentNode.style.left     = Math.max(0, (mousePos.x - mouseOffset.x)) +"px";
	}
	
	lMouseState = iMouseDown;
	
	return false;
}

function mouseUp(ev)
{
	if (dragObject != null)
	{
		if (dragObject.parentNode.id.indexOf('_Message') != -1)
		{
			var item_name = dragObject.parentNode.id.substring(0, dragObject.parentNode.id.indexOf('_Message'));
			DSXC_setValue("Position - " + item_name, dragObject.parentNode.style.top + "_" + dragObject.parentNode.style.left);
		}
		
		dragObject = null;
	}
	
	iMouseDown = false;
}

function mouseDown(ev)
{
	var mousePos = mouseCoords(ev);
	var target = ev.target;
	
	iMouseDown = true;	
	
	if (target.getAttribute('DragObj'))
	{
		return false;
	}	
}

function makeDraggable(item)
{
	if (!item) return;
	
	item.addEventListener("mousedown",
		function(ev)
		{
			dragObject = this.parentNode;
			mouseOffset = getMouseOffset(this.parentNode, ev);
			return false;
		},
		false);
}

document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);

function getElementById(search, node, tag)
{
	var FoundElement = null;
	
	if (node == null) node = document;
	if (tag == null) tag = '*';
	
	var AllElements = node.getElementsByTagName(tag);
	
	for (count = 0; count < AllElements.length && FoundElement == null; count++)
	{
		if (AllElements[count].id != null)
		{
			if (AllElements[count].id.indexOf(search) != -1)
			{
				FoundElement = AllElements[count];
			}
		}
	}
	
	return FoundElement;
}

function getElementsByPartialId(search, node, tag)
{
	var FoundElements = new Array();
	
	if (node == null) node = document;
	if (tag == null) tag = '*';
	
	var AllElements = node.getElementsByTagName(tag);
	
	for (count = 0; count < AllElements.length; count++)
	{
		if (AllElements[count].id != null)
		{
			if (AllElements[count].id.indexOf(search) != -1)
			{
				FoundElements.push(AllElements[count]);
			}
		}
	}
	
	return FoundElements;
}

function getElementsByClass(search, node, tag)
{
	var FoundElements = new Array();
	
	if (node == null) node = document;
	if (tag == null) tag = '*';
	
	var AllElements = node.getElementsByTagName(tag);
	
	for (count = 0; count < AllElements.length; count++)
	{
		if (AllElements[count].className != null)
		{
			if (AllElements[count].className == search)
			{
				FoundElements.push(AllElements[count]);
			}
		}
	}
	
	return FoundElements;
}

function getElementsByPartialClass(search, node, tag)
{
	var FoundElements = new Array();
	
	if (node == null) node = document;
	if (tag == null) tag = '*';
	
	var AllElements = node.getElementsByTagName(tag);
	
	for (count = 0; count < AllElements.length; count++)
	{
		if (AllElements[count].className != null)
		{
			if (AllElements[count].className.indexOf(search) != -1)
			{
				FoundElements.push(AllElements[count]);
			}
		}
	}
	
	return FoundElements;
}

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function (str){
    return this.slice(-str.length) == str;
  };
}

function GetMessageText(text)
{
	var StartPos = text.indexOf('pagemessage');
	var EndPos = text.indexOf('<div id="tabbarContent');

	var MessageText = "";
	
	if (StartPos != -1)
	{
		MessageText = text.substring(StartPos + 53, EndPos);
	}
	
	return MessageText;
}

var MessageTimeout;

function ShowMessageWindow(text, time)
{
	clearTimeout(MessageTimeout);
	
	if (time == null) time = 0;
	
	var CurrentMessage = document.getElementById('pagemessage');
	if (typeof text != 'string') text = '';
	
	if (CurrentMessage != null)
	{
		CurrentMessage.innerHTML = text;
		
		if (time > 0)
		{
			MessageTimeout = setTimeout(ShowMessageWindow, (time * 1000));
		}
	}
}

function ShowConfigWindow(display)
{
	var ConfigWindow = CreatePopupWindow('Configuration', 275, 350, display);
	
	if (ConfigWindow != null)
	{
	  ConfigWindow.innerHTML = "<TABLE HEIGHT='100%'><TR><TD WIDTH='200'>Alerts</TD><TD STYLE='text-align: right; width: 100'><SPAN STYLE='font-size: 8px'>Snd&nbsp;&nbsp;&nbsp;Msg</SPAN></TD></TR><TR><TD WIDTH='200'>&nbsp;&nbsp;&nbsp;Horn Ready</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Hunter_Horn_Sound'><INPUT TYPE='Checkbox' ID='Hunter_Horn_Popup'></TD></TR><TR><TD WIDTH='200'>&nbsp;&nbsp;&nbsp;King's Reward</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Kings_Reward_Sound'><INPUT TYPE='Checkbox' ID='Kings_Reward_Popup'></TD></TR><TR><TD WIDTH='200'>&nbsp;&nbsp;&nbsp;Cheese Empty</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Out_of_Cheese_Sound'><INPUT TYPE='Checkbox' ID='Out_of_Cheese_Popup'></TD></TR><TR><TD WIDTH='200'>&nbsp;&nbsp;&nbsp;Washed Away</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Washed_Away_Sound'><INPUT TYPE='Checkbox' ID='Washed_Away_Popup'></TD></TR><TR><TD WIDTH='200'>&nbsp;&nbsp;&nbsp;Season Change / Tower Amp</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Season_Change_Sound'><INPUT TYPE='Checkbox' ID='Season_Change_Popup'></TD></TR><TR><TD WIDTH='200'>&nbsp;&nbsp;&nbsp;Tournament Soon</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Tourney_Warning_Sound'><INPUT TYPE='Checkbox' ID='Tourney_Warning_Popup'></TD></TR><TR><TD WIDTH='200'>Direct Travel</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Direct_Travel'></TD></TR><TR><TD WIDTH='200'>Display Timers</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Display_Timers'></TD></TR><TR><TD WIDTH='200'>Timer in Title</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Timer_Title'></TD></TR><TR><TD WIDTH='200'>Show All Crafting Items</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Show_All_Craft'></TD></TR><TR><TD WIDTH='200'>Automatic Inventory Update</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Inventory_Update'></TD></TR><TR><TD WIDTH='200'>Change Button Style</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Display_Button'></TD></TR><TR><TD WIDTH='200'>Update Timer Length</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Text' ID='Update_Length' SIZE='3'></TD></TR><TR HEIGHT='100%'><TD COLSPAN='2' style='vertical-align: bottom'>Version " + SCRIPT.version + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"#\" ajaxify=\"/ajax/pages/fan_status.php?fbpage_id=134975893200179&add=1&reload=1&preserve_tab=1&use_primer=1\" rel=\"async-post\">Like</a>&nbsp;&nbsp;&nbsp;&nbsp;<A HREF='#' ID='Reset_to_Default'>Defaults</A></TD></TR></TABLE>";

		document.getElementById('Hunter_Horn_Sound').checked = SETTINGS.horn & STATE_SOUND;
		document.getElementById('Hunter_Horn_Popup').checked = SETTINGS.horn & STATE_MESSAGE;
		document.getElementById('Kings_Reward_Sound').checked = SETTINGS.king & STATE_SOUND;
		document.getElementById('Kings_Reward_Popup').checked = SETTINGS.king & STATE_MESSAGE;
		document.getElementById('Out_of_Cheese_Sound').checked = SETTINGS.cheese & STATE_SOUND;
		document.getElementById('Out_of_Cheese_Popup').checked = SETTINGS.cheese & STATE_MESSAGE;
		document.getElementById('Washed_Away_Sound').checked = SETTINGS.washed & STATE_SOUND;
		document.getElementById('Washed_Away_Popup').checked = SETTINGS.washed & STATE_MESSAGE;
		document.getElementById('Season_Change_Sound').checked = SETTINGS.season & STATE_SOUND;
		document.getElementById('Season_Change_Popup').checked = SETTINGS.season & STATE_MESSAGE;
		document.getElementById('Tourney_Warning_Sound').checked = SETTINGS.tourney & STATE_SOUND;
		document.getElementById('Tourney_Warning_Popup').checked = SETTINGS.tourney & STATE_MESSAGE;
	  
		document.getElementById('Direct_Travel').checked = SETTINGS.direct;
		document.getElementById('Show_All_Craft').checked = SETTINGS.showall;
		document.getElementById('Display_Timers').checked = SETTINGS.timers;
		document.getElementById('Timer_Title').checked = SETTINGS.title;
		document.getElementById('Inventory_Update').checked = SETTINGS.auto;
		document.getElementById('Display_Button').checked = SETTINGS.buttons;
		document.getElementById('Update_Length').value = SETTINGS.length;

		document.getElementById('Hunter_Horn_Sound').addEventListener('click', function () { SETTINGS.horn = SETTINGS.horn ^ STATE_SOUND; SaveSettings(); }, true);
		document.getElementById('Hunter_Horn_Popup').addEventListener('click', function () { SETTINGS.horn = SETTINGS.horn ^ STATE_MESSAGE; SaveSettings(); }, true);
		document.getElementById('Kings_Reward_Sound').addEventListener('click', function () { SETTINGS.king = SETTINGS.king ^ STATE_SOUND; SaveSettings(); }, true);
		document.getElementById('Kings_Reward_Popup').addEventListener('click', function () { SETTINGS.king = SETTINGS.king ^ STATE_MESSAGE; SaveSettings(); }, true);
		document.getElementById('Out_of_Cheese_Sound').addEventListener('click', function () { SETTINGS.cheese = SETTINGS.cheese ^ STATE_SOUND; SaveSettings(); }, true);
		document.getElementById('Out_of_Cheese_Popup').addEventListener('click', function () { SETTINGS.cheese = SETTINGS.cheese ^ STATE_MESSAGE; SaveSettings(); }, true);
		document.getElementById('Washed_Away_Sound').addEventListener('click', function () { SETTINGS.washed = SETTINGS.washed ^ STATE_SOUND; SaveSettings(); }, true);
		document.getElementById('Washed_Away_Popup').addEventListener('click', function () { SETTINGS.washed = SETTINGS.washed ^ STATE_MESSAGE; SaveSettings(); }, true);
		document.getElementById('Season_Change_Sound').addEventListener('click', function () { SETTINGS.season = SETTINGS.season ^ STATE_SOUND; SaveSettings(); }, true);
		document.getElementById('Season_Change_Popup').addEventListener('click', function () { SETTINGS.season = SETTINGS.season ^ STATE_MESSAGE; SaveSettings(); }, true);
		document.getElementById('Tourney_Warning_Sound').addEventListener('click', function () { SETTINGS.tourney = SETTINGS.tourney ^ STATE_SOUND; SaveSettings(); }, true);
		document.getElementById('Tourney_Warning_Popup').addEventListener('click', function () { SETTINGS.tourney = SETTINGS.tourney ^ STATE_MESSAGE; SaveSettings(); }, true);

		document.getElementById('Direct_Travel').addEventListener('click', function () { SETTINGS.direct = !SETTINGS.direct; SaveSettings(); }, true);
		document.getElementById('Show_All_Craft').addEventListener('click', function () { SETTINGS.showall = !SETTINGS.showall; SaveSettings(); }, true);
		document.getElementById('Display_Timers').addEventListener('click', function () { SETTINGS.timers = !SETTINGS.timers; SaveSettings(); }, true);
		document.getElementById('Timer_Title').addEventListener('click', function () { SETTINGS.title = !SETTINGS.title; SaveSettings(); }, true);
		document.getElementById('Inventory_Update').addEventListener('click', function () { SETTINGS.auto = !SETTINGS.auto; SaveSettings(); }, true);
		document.getElementById('Display_Button').addEventListener('click', function () { SETTINGS.buttons = !SETTINGS.buttons; SaveSettings(); }, true);
		document.getElementById('Update_Length').addEventListener('change', function () { SETTINGS.length = parseInt(document.getElementById('Update_Length').value); SaveSettings(); }, true);
		
		document.getElementById('Reset_to_Default').addEventListener('click', function () { ResetSettings(); SaveSettings(); ShowConfigWindow(false); }, true);
	}
}

function DisplayState()
{
	var AllHUDs = getElementsByClass('headsup');
	
	if (AllHUDs.length > 0)
	{
		var HUD = AllHUDs[0];
		var iCount = 1;
	
		if (HUD != null)
		{
			var HUDStatLists = getElementsByClass('hudstatlist');
			
			for (iCount = 1; iCount < HUDStatLists.length; iCount++)
			{
				var Embedded = document.createElement('li');
				Embedded.id = 'MHH_Display_' + (iCount + 1);
				
				HUDStatLists[iCount].firstChild.appendChild(Embedded);
			}
		}	
	}
	else
	{
		var AllHUDs = getElementsByClass('mousehuntHud-userStatBar');
		
		if (AllHUDs.length > 0)
		{
			var HUD = AllHUDs[0];
			
			if (HUD != null)
			{
				var MainDiv = document.createElement('div');
				MainDiv.id = 'MHH_Display';
				MainDiv.style.height = '13px';
				MainDiv.style.padding = '2px';
				
				for (iCount = 1; iCount <= 5; iCount++)
				{
					var Embedded = document.createElement('div');
					Embedded.id = 'MHH_Display_' + iCount;
					Embedded.style.width = '135px';
					Embedded.style.height = '3px';
					Embedded.style.marginLeft = '8px';
					Embedded.style.float = 'left';
					Embedded.innerHTML = '<span></span>';
					
					MainDiv.appendChild(Embedded);
				}
				
				HUD.parentNode.insertBefore(MainDiv, HUD.nextSibling);
			}
		}
	}
	
	if (document.getElementById('header') != null || document.getElementById('mousehuntHud') != null)
	{
		if (DSXC_getValue('Alert - Kings Reward', false))
		{
			ResetTimeout('Update - Kings Reward');
			DSXC_setValue('Alert - Kings Reward', false);
		}
		
		DSXC_setValue('Alert - Cheese', false);
		
		STATE.ready = true;
	}
	else
	{
		STATE.maintenance = true;
		STATE.ready = true;
	}
}

function DisplayTimers()
{
	if (!STATE.maintenance)
	{
		if (SETTINGS.timers)
		{
			var MHHornTimer = getElementsByClass('hunttimer')[0];
			
			if (MHHornTimer != null)
			{
				SetDisplayText(2, '<span class="hudstatlabel">Reward:</span>&nbsp;&nbsp;<span id="MHH_Kings_Reward_Timer"></span>');
				
				MHHornTimer.style.display = 'none';
				
				var HornTimer = document.createElement('div');
				HornTimer.id = 'MHH_Display_1';
				HornTimer.className = 'hunttimer';
				HornTimer.innerHTML = '<span id="timerlabel" class="timerlabel">Next:</span>\n<span id="MHH_Horn_Timer"></span>';
				MHHornTimer.parentNode.insertBefore(HornTimer, MHHornTimer);
			}
			else
			{
				SetDisplayText(2, '<div class="mousehuntHud-userStat"><span class="label" style="width: 36px; display: table-cell; vertical-align: middle; text-align: right; margin-right: 3px; padding: 2px 4px 0 0">Reward</span><span id="MHH_Kings_Reward_Timer" class="value" style="width: 81px; display: table-cell; text-align: right;"></div>');
			}
		}
	}
}

function HeaderDetail(text, stylestart, styleend, link, linktext)
{
	var HeaderText = "<div class='uiHeader uiHeaderTopAndBottomBorder mbs uiSideHeader'><div class='clearfix uiHeaderTop'>";
	
	if (link != null) HeaderText = HeaderText + "<a href='" + link + "' class='uiHeaderActions rfloat'>" + linktext + "</a>";
	HeaderText = HeaderText + "<div>";
	if (stylestart != null) HeaderText = HeaderText + stylestart;
	HeaderText = HeaderText + text;
	if (styleend != null) HeaderText = HeaderText + styleend;
	HeaderText = HeaderText + "</div></div></div>"
	return HeaderText;
}

function DisplayDetail()
{
	var TopBanner = getElementById("hgBanner");
	
	if (TopBanner != null && !STATE.maintenance)
	{
		var sBackground = (SETTINGS.buttons ? " style='padding: 3px; background: url(" + IMAGE.background + ") no-repeat'" : "");
		
		var sConfigOpen = "<a href='#' id='Config_Open' class='config_open_btn'><img" + sBackground + " src='" + IMAGE.config + "' border=0 title='Configuration' /></a>";
		var sRefresh = "<a href='#' id='Refresh_Inventory' class='refresh_btn'><img" + sBackground + " src='" + IMAGE.refresh + "' border=0 title='Refresh Inventory' /></a>";
		var sTravelOpen = "<a href='#' id='Travel_Open' class='config_open_btn'><img" + sBackground + " src='" + IMAGE.travel + "' border=0 title='Travel' /></a>";
		var sCraftingOpen = "<a href='#' id='Crafting_Open' class='crafting_open_btn'><img" + sBackground + " src='" + IMAGE.craft + "' border=0 title='Crafting' /></a>";
		var sPotionsOpen = "<a href='#' id='Potions_Open' class='potion_open_btn'><img" + sBackground + " src='" + IMAGE.potion + "' border=0 title='Potions' /></a>";
		var sJournalOpen = "<a href='#' id='Journal_Open' class='journal_open_btn'><img" + sBackground + " src='" + IMAGE.journal + "' border=0 title='Journal' /></a>";
		
		var sMHHButtons = "<div style=\"float: left\"><table id='MHH_Buttons' style='width: 245px'>";
		sMHHButtons = sMHHButtons + "<tr height=\"25\"><th colspan=\"6\" style=\"text-align: center;\"><b><a target=\"_new\" href=\"http://www.facebook.com/pages/DSXCs-Mousehunt-Helper/134975893200179\">MouseHunt Helper</a></b></th></tr>";
		//sMHHButtons = sMHHButtons + "<tr><td style='width: 20%; text-align: center'>" + sCraftingOpen + "</td><td style='width: 20%; text-align: center'>" + sTravelOpen + "</td><td style='width: 20%; text-align: center'>" + sJournalOpen + "</td><td style='width: 20%; text-align: center'>" + sRefresh + "</td><td style='width: 20%; text-align: center'>" + sConfigOpen + "</td></tr>";
		sMHHButtons = sMHHButtons + "<tr><td style='width: 20%; text-align: center'>" + sCraftingOpen + "</td><td style='width: 20%; text-align: center'>" + sPotionsOpen + "</td><td style='width: 20%; text-align: center'>" + sTravelOpen + "</td><td style='width: 20%; text-align: center'>" + sJournalOpen + "</td><td style='width: 20%; text-align: center'>" + sRefresh + "</td><td style='width: 20%; text-align: center'>" + sConfigOpen + "</td></tr>";
		//sMHHButtons = sMHHButtons + "<tr><td style='font-size: 8px; width: 20%; text-align: center'>Craft</td><td style='font-size: 8px; width: 20%; text-align: center'>Travel</td><td style='font-size: 8px; width: 20%; text-align: center'>Journal</td><td style='font-size: 8px; width: 20%; text-align: center'>Refresh</td><td style='font-size: 8px; width: 20%; text-align: center'>Config</td></tr>";
		sMHHButtons = sMHHButtons + "<tr><td style='font-size: 8px; width: 20%; text-align: center'>Craft</td><td style='font-size: 8px; width: 20%; text-align: center'>Potion</td><td style='font-size: 8px; width: 20%; text-align: center'>Travel</td><td style='font-size: 8px; width: 20%; text-align: center'>Journal</td><td style='font-size: 8px; width: 20%; text-align: center'>Refresh</td><td style='font-size: 8px; width: 20%; text-align: center'>Config</td></tr>";
		sMHHButtons = sMHHButtons + "</table><p /></div>";
		
		var sMHHTimers = "<div style=\"float: right\"><table id='MHH_Buttons' style='width: 450px'>";
		sMHHTimers = sMHHTimers + "<tr height=\"25\"><th colspan=\"5\" style=\"text-align: center; font-size: 9px;\">";
		
		if (STATE.userobject != null && STATE.userobject.has_shield)
		{
			var expiry = new Date(STATE.userobject.shield_expiry);
			var now = new Date();
			
			var days = days_between(expiry, now);
			
			if (days > 0)
				sMHHTimers = sMHHTimers + "Lucky shield expires in " + days + " days";
			else
				sMHHTimers = sMHHTimers + "Lucky shield expires today!";
		}
		
		sMHHTimers = sMHHTimers + "</th></tr><tr>";
				
		var ColumnWidth = 100 / LOCATION_TIMERS.length;

		for (iCount1 = 0; iCount1 < LOCATION_TIMERS.length; iCount1++)
		{
			sMHHTimers = sMHHTimers + "<td style=\"font-size: 9px;\"><b>" + LOCATION_TIMERS[iCount1][0] + "</b><br>";
			sMHHTimers = sMHHTimers + "&nbsp;&nbsp;State: <span id='MHH_Location_" + iCount1 + "_State'></span><br>";
			sMHHTimers = sMHHTimers + "&nbsp;&nbsp;Changes: <span id='MHH_Location_" + iCount1 + "_Change'>the future</span></td>";
		}
		
		sMHHTimers = sMHHTimers + "</tr></table><p /></div>";
		
		TopBanner.innerHTML = sMHHButtons + sMHHTimers + "<div style=\"clear: both\"></div>";
		TopBanner.id = 'MHH_modified';
		
		if (document.getElementById('Crafting_Open') != null) document.getElementById('Crafting_Open').addEventListener("click", ShowCraftingWindow, false);
		if (document.getElementById('Potions_Open') != null) document.getElementById('Potions_Open').addEventListener("click", ShowPotionsWindow, false);
		if (document.getElementById('Travel_Open') != null) document.getElementById('Travel_Open').addEventListener("click", ShowTravelWindow, false);
		if (document.getElementById('Journal_Open') != null) document.getElementById('Journal_Open').addEventListener("click", ShowJournalWindow, false);
		if (document.getElementById('Refresh_Inventory') != null) document.getElementById('Refresh_Inventory').addEventListener("click", ForceRefresh, false);
		if (document.getElementById('Config_Open') != null) document.getElementById('Config_Open').addEventListener("click", ShowConfigWindow, false);
	}
}

function days_between(date1, date2)
{
	// The number of milliseconds in one day
	var ONE_DAY = 1000 * 60 * 60 * 24;
	
	// Convert both dates to milliseconds
	var date1_ms = date1.getTime() + (date2.getTimezoneOffset() * 60 * 1000);
	var date2_ms = date2.getTime();
	
	// Calculate the difference in milliseconds
	var difference_ms = Math.abs(date1_ms - date2_ms);
	
	// Convert back to days and return
	return Math.round(difference_ms / ONE_DAY);
}

function AlertSound(sound)
{
	var SoundAlert = document.createElement("div");
	SoundAlert.innerHTML = '<embed src="' + sound + '" height="50" width="200" hidden=true autostart="true" loop="false"></embed>';
	
	if (document.getElementById('hgAppContainer') != null)
		document.getElementById('hgAppContainer').appendChild(SoundAlert);
	else
		document.body.appendChild(SoundAlert);
}

function SoundHorn()
{
	if (!DSXC_getValue('Alert - Sound', false))
	{
		DSXC_setValue('Alert - Sound', true);
		
		if (SETTINGS.horn & STATE_SOUND)
		{
			AlertSound(AUDIO.horn);
		}
			
		if (SETTINGS.horn & STATE_MESSAGE)
		{
			alert('The horn is ready to be sounded');
		}
	}
}

function UpdateTimer(timeleft, inhours)
{
	var ReturnValue = "";
	
	var FirstPart;
	var SecondPart;
	var Size;
	
	if (timeleft > 0)
	{
		if (inhours != null && inhours == true)
		{
			FirstPart = Math.floor(timeleft / (60 * 60));
			SecondPart = Math.floor(timeleft / 60) % 60;
			Size = 'hrs';
		}
		else
		{
			FirstPart = Math.floor(timeleft / 60);
			SecondPart = timeleft % 60;
			Size = 'mins';
		}
		
		if (SecondPart < 10)
		{
			SecondPart = '0' + SecondPart;
		}
		
		ReturnValue = FirstPart + ':' + SecondPart + ' ' + Size;
	}
	else
	{
		ReturnValue = 'Soon...';
	}
	
	return ReturnValue;
}

function Get(url, callback)
{	
	// DO NOT OPEN OTHER PAGES DURING KINGS REWARD OR MAINTENANCE
	if (!STATE.king && !STATE.maintenance)
	{
		DSXC_log('Get - ' + url);
		
		try
		{
			DSXC_xmlHttpRequest({
				method: 'GET',
				url: url,
				onload: function(result) {
					if (result.status != 200)
					{
						throw("GET failed - " + url + " " + Flatten(result));
					}
					else
					{
						if (url.startsWith(STATE.baseurl))
						{
							InitUserObject(result.responseText);
							DetermineHash();
							
							if (result.responseText.indexOf("Claim Your Reward!") != -1)
							{
								window.location = STATE.baseurl;
							}
							else
							{
								callback(result.responseText);
							}
						}
						else
						{
							callback(result.responseText);
						}
					}
				}
			});
		}
		catch (ex)
		{
			DSXC_log(ex);
		}
	}
}

function Post(url, data, callback)
{
	// DO NOT OPEN OTHER PAGES DURING KINGS REWARD OR MAINTENANCE
	if (!STATE.king && !STATE.maintenance)
	{
		DSXC_log('Post - ' + url + ' - ' + data);
		
		if (!data)
			data = {}
			
		data.hg_is_ajax = 1;
		
		// the window.parent is not accessible by the fb apps page due to cross site 
		// security, this is the only way to check if someone is using the fb version
		try
		{
			window.parent.location.toString();
			data.sn = 'Hitgrab';
		}
		catch (ex)
		{
			data.sn = 'Facebook';
		}
		
		try
		{
			DSXC_xmlHttpRequest({
				method: 'POST',
				data: serialize(data).replace(" ", "+"),
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				url: url,
				onload: function(result) {
					if (result.status != 200)
					{
						throw("POST failed - " + url);
					}
					else
					{
						if (url.startsWith(STATE.baseurl))
						{
							responseData = JSON.parse(result.responseText);
							InitUserObject(responseData.user);
							
							if (document.getElementById('headerTop') != null) 
								document.getElementById('headerTop').style.backgroundImage = "url(\'" + STATE.userobject.location_header + "\')";
							
							DetermineHash();
							
							if (STATE.userobject.has_puzzle)
							{
								window.location = STATE.baseurl;
							}
							else
							{
								callback(responseData);
							}
						}
						else
						{
							callback(responseData);
						}
					}
				}
			});
		}
		catch (ex)
		{
			DSXC_log(ex);
		}
	}
}

function CheckTimeout(timer, minutes, hours)
{
	var Today = new Date();
	
	var iReturnValue = 0;  
	var szLastCheck = DSXC_getValue(timer, 'never');
	
	if (minutes == null) minutes = 0;
	if (hours == null) hours = 0;
	
	var WaitLength = ((minutes * 60) + (hours * 60 * 60));
	
	if (szLastCheck != 'never')
	{
		var CurrentTime = Today.getTime();
		var PreviousTime = new Date(szLastCheck).getTime();
		
		var Interval = Math.floor((CurrentTime - PreviousTime) / 1000);
		
		if (Interval >= WaitLength)
		{
			iReturnValue = 0;
		}
		else
		{
			iReturnValue = (WaitLength - Interval);
		}
	}
	else
	{
		iReturnValue = 0;
	}
	
	return iReturnValue;
}

function ResetTimeout(timer)
{
	var Today = new Date();
	DSXC_setValue(timer, String(Today));
}

function ResetInventory()
{
	var MaxItemID = DSXC_getValue('Inventory - Max ID', -1);
	
	for (iCount1 = 0; iCount1 < MaxItemID; iCount1++)
	{
		var InventoryDetail = DSXC_getValue('Inventory Item - ' + iCount1, 'INVALID');
		
		if (InventoryDetail != 'INVALID')
		{
			var InvValues = InventoryDetail.split(',');
			DSXC_setValue('Inventory Item - ' + iCount1, InvValues[0] + ',' + InvValues[1] + ',' + InvValues[2] + ',0');
		}
	}
}

function ForceRefresh()
{
	CheckInventory(0);
}

function CheckInventory(when)
{
	if (when == 0 || SETTINGS.auto)
	{
		if (CheckTimeout('Update - Inventory', when) == 0)
		{
			ResetTimeout('Update - Inventory');
			ResetInventory();
	
			ShowMessageWindow('<div class="pagemessage s"><div class="messagetop"></div><div class="messagebody"><div class="messagetitle">Updating Inventory</div><div class="messagecontent">This window will disappear once the update has occurred.</div></div><div class="messagebottom"></div></div></div>');
			Get(STATE.baseurl + "inventory.php", UpdateInventory);
		}
	}
}

function UpdateInventoryQuantity(item_id, quantity)
{
	INVENTORY[item_id][INVQTY] = Number(quantity);
	DSXC_setValue('Inventory Item - ' + item_id, INVENTORY[item_id][INVTYPE] + ',' + INVENTORY[item_id][INVNAME] + ',' + INVENTORY[item_id][INVDETAIL] + ',' + INVENTORY[item_id][INVQTY]);
}

function UpdateCraftingQuantity(item_id, quantity)
{
	CRAFTING[item_id][CRAFTQTY] = Number(quantity);
	DSXC_setValue('Crafting Item - ' + item_id, CRAFTING[item_id][CRAFTNAME] + ',' + CRAFTING[item_id][CRAFTDETAIL] + ',' + CRAFTING[item_id][CRAFTQTY]);
}

function UpdateInventory(data)
{
	if (typeof data == "object")
	{
		if (data.items != null)
		{
			for (var detail in data.items)
			{
				UpdateInventoryDetail(data.items[detail]);
			}
		}
		
		if (data.inventory != null)
		{
			for (var detail in data.inventory)
			{
				UpdateInventoryDetail(data.inventory[detail]);
			}
		}

		LoadCrafting();
		LoadInventory();
	}
	else
	{
		params = { "classifications": INVENTORY_TYPES_TEXT, "action": "get_items_by_classification", "uh": STATE.hash };
		Post(STATE.baseurl + "managers/ajax/users/userInventory.php", params, function(response)
		{
			for (var item = 0; item < response.items.length; item++)
			{
				UpdateInventoryDetail(response.items[item]);
			}
			
			ShowMessageWindow('');
			
			LoadCrafting();
		  LoadInventory();
		});
	}
}

function UpdateInventoryDetail(inventory_item)
{
	switch (inventory_item.classification)
	{
		case INVENTORY_TYPES_TEXT[INV_TYPE_POTION]:
		{
			var PotionDetails = inventory_item.produced_item.name;
			
			if (inventory_item.is_enabled)
			{
				for (iCount = 0; iCount < inventory_item.recipe_list.length; iCount++)
				{
					PotionDetails = PotionDetails + "#" + inventory_item.recipe_list[iCount].item.name + "_" + inventory_item.recipe_list[iCount].yield + "_" + inventory_item.recipe_list[iCount].cost;
				}
			}
			else
			{
				PotionDetails = 'disabled';
			}

			DSXC_setValue('Inventory Item - ' + inventory_item.item_id, inventory_item.classification + ',' + inventory_item.name + ',' + inventory_item.type + ',' + inventory_item.quantity + ',' + PotionDetails);
		} break;
		
		case INVENTORY_TYPES_TEXT[INV_TYPE_BASE]:
		case INVENTORY_TYPES_TEXT[INV_TYPE_WEAPON]:
		{
			DSXC_setValue('Inventory Item - ' + inventory_item.item_id, inventory_item.classification + ',' + inventory_item.name + ',' + inventory_item.type + ',' + inventory_item.quantity + ',' + inventory_item.power_type_name + '_' + inventory_item.power + '_' + inventory_item.power_bonus + '_' + inventory_item.attraction_bonus + '_' + inventory_item.luck + '_' + inventory_item.cheese_effect);
		} break;
		
		case INVENTORY_TYPES_TEXT[INV_TYPE_CRAFTING]:
		{
			var mat_id = CraftingLookup(inventory_item.type);
			
			if (mat_id != -1)
			{
				DSXC_setValue('Crafting Item - ' + mat_id, inventory_item.name + ',' + inventory_item.type + ',' + inventory_item.quantity);
			}
			else
			{
				var mat_id = Number(DSXC_getValue('Crafting - Max ID', 0)) + 1;
				
				DSXC_setValue('Crafting Item - ' + mat_id, inventory_item.name + ',' + inventory_item.type + ',' + inventory_item.quantity);
				DSXC_setValue('Crafting - Max ID', mat_id);
			}
		} break;

		default:
		{
			DSXC_setValue('Inventory Item - ' + inventory_item.item_id, inventory_item.classification + ',' + inventory_item.name + ',' + inventory_item.type + ',' + inventory_item.quantity);
		}
	}
	
	var item_id = parseInt(inventory_item.item_id);
	
	if (item_id > DSXC_getValue('Inventory - Max ID', -1))
		DSXC_setValue('Inventory - Max ID', item_id);
}

Array.prototype.indexOf = function(test)
{
	var ReturnValue = -1;
	
	for (iCount = 0; iCount < this.length && ReturnValue == -1; iCount++)
	{
		if (this[iCount] == test)
		{
			ReturnValue = iCount;
		}
	}
	
	return ReturnValue;
}

Array.prototype.has = function(test)
{
	var ReturnValue = false;
	
	for (iCount = 0; iCount < this.length && !ReturnValue; iCount++)
	{
		if (this[iCount] == test)
		{
			ReturnValue = true;
		}
	}
	
	return ReturnValue;
}

function Flatten(obj)
{
  var flat = "{ ";
  
  for (var key in obj) 
  {
  	if (flat != "{ ") flat = flat + ", ";
  	
    if (obj.hasOwnProperty(key)) 
    {
      var value = obj[key];
      
      if (null === value || undefined === value) 
      {
        continue;
      } 
      else
      {
      	if (typeof value == "object")
      	{
        	flat = flat + key + ": " + Flatten(value);
      	}
      	else
      	{
        	flat = flat + key + ": " + value;
        }
      } 
    }
  }
  
  return flat + " }";
}

function Craft()
{
	var crafting_item = this.id.substring(8);
	
	if (crafting_item != -1)
	{
		var total_to_craft = document.getElementById('Craft_Qty').innerHTML;
		ShowCraftingWindow(false);
		
		CraftItem(crafting_item, total_to_craft);
	}
}

function CraftItem(pattern, qty)
{
	params = { "parts": PATTERNS[pattern][PINGREDIENTS], "uh": STATE.hash, "craftQty": qty };
	Post(STATE.baseurl + "managers/ajax/users/crafting.php", params, function(response) 
	{ 
		ShowCraftingMessage(response);
		
		if (response.success == 1)
		{
			if (response.inventory != null || response.items != null)
				UpdateInventory(response);
		}
	});
}

function TravelTo(destination)
{
	if (destination == 0)
	{
		Get(STATE.baseurl + 'travel.php?freeTravel=true?&uh=' + STATE.hash, function() { STATE.location = 0; });
	}
	else
	{
		if (STATE.location == -1)
			STATE.location = 0;

		params = { "origin": LOCATION.detail[STATE.location][LLINK], "destination": LOCATION.detail[destination][LLINK], "uh": STATE.hash };
		Post(STATE.baseurl + "managers/ajax/users/changeenvironment.php", params, function() { STATE.location = destination; });
	}
}

function Travel()
{
	var destination_location = this.className.substring(4);

	if (this.className.indexOf('Buy_') != -1)
		STATE.redirect = 'shops.php?tab=3';
	
	if (destination_location != -1)
	{
		ShowCraftingWindow(false);
		ShowTravelWindow(false);
		
		if (destination_location != STATE.location)
		{
			if (STATE.location != -1 && LOCATION.detail[STATE.location][LWARNING])
			{
				var continue_travel = confirm("WARNING: You are in a special location, are you sure you want to leave?");
				
				if (continue_travel == false)
					return;
			}
			
			if (LOCATION.detail[destination_location][LPATH] != -1)
				STATE.route = [ LOCATION.detail[destination_location][LPATH] ];
			else
				STATE.route = [ destination_location ];
				
			SetDisplayText(3, 'Travelling');
			
			TravelTo(STATE.route[0]);
			setTimeout(AutoTravel, 1000);
		}
	}
}

var auto_count = 0;
	
function AutoTravel()
{
	if (auto_count >= 5)
	{
		auto_count = 0;
		SetDisplayText(3, 'Travelling');
	}
	else
	{
		auto_count++;
		SetDisplayText(3, GetDisplayText(3) + '.');
	}
	
	DetermineLocation();
	
	if (STATE.location == STATE.route[0])
	{
		STATE.route.shift();
		
		if (STATE.route.length == 0)
		{
			SetDisplayText(3, '');
			ShowMessageWindow('<div class="pagemessage s"><div class="messagetop"></div><div class="messagebody"><div class="messagetitle">Travel</div><div class="messagecontent">You have arrived at your destination.</div></div><div class="messagebottom"></div></div></div>', 5);
			
			return;
		}
	}
	
	setTimeout(AutoTravel, 1000);
}

function SortCraftingArray(a, b)
{
	var x = a[CRAFTNAME];
	var y = b[CRAFTNAME];
	
	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function ShowCraftingWindow(display)
{
	var CraftingWindow = CreatePopupWindow('Crafting', 325, 420, display);
	
	if (CraftingWindow != null)
	{
		var WindowTable = "<TABLE CELLSPACING='0' CELLPADDING='1'>";
		var MaxToCraft = 0;
		
		var pattern_is_craftable = new Array();
		var travel_craftable = new Array();
		
		for (count1 = 0; count1 < PATTERNS.length; count1++)
		{
			var can_craft = true;
			var missing_item = -1;
			
			var total_to_craft = 10000000; // 10 million
			var total_mats = 0;
			
			var ingredients = PATTERNS[count1][PINGREDIENTS];
			
			DSXC_log("Cratable State: " + PATTERNS[count1][PNAME]);
			
			for (var key in ingredients)
			{
				if (ingredients.hasOwnProperty(key)) 
				{
					var mat_name = key;
					var mat_id = CraftingLookup(mat_name);
					var mat_qty = Number(ingredients[key]);
					
					total_mats++;
					
					if (mat_id != -1)
					{
						var current_qty = Number(CRAFTING[mat_id][CRAFTQTY]);
		
						if (current_qty < mat_qty)
						{
							DSXC_log(" - low quantity of " + mat_name + " (" + CRAFTING[mat_id][CRAFTQTY] + ")");
							
							total_to_craft = 0;
							can_craft = false;
						}
						else
						{
							mat_to_craft = Math.floor(current_qty / mat_qty);
							total_to_craft = Math.min(mat_to_craft, total_to_craft);
							
							DSXC_log(" - enough of " + mat_name + " (" + mat_to_craft + ")");
						}
					}
					else
					{
						DSXC_log(" - unknown material " + mat_name);
							
						total_to_craft = 0;
						can_craft = false;
					}
				}
			}
			
			if (can_craft || SETTINGS.showall)
			{
				MaxToCraft = Math.max(MaxToCraft, total_to_craft);
				
				if ((STATE.level + 1) >= total_mats)
				{
					pattern_is_craftable.push( [ count1, total_to_craft ] );
				}
			}
		}
		
		if (pattern_is_craftable.length > 0)
		{
			var PatternTable = "<TR><TH COLSPAN='2'><I>Craftable</I><br /><br /></TH></TR>";
			PatternTable += "<TR><TD><DIV ID='Craft_Scroll'></DIV><br /></TD><TD STYLE='text-align: right;'><SPAN ID='Craft_Qty'>1</SPAN><br /></TD></TH></TR>";

			for (count1 = 0; count1 < pattern_is_craftable.length; count1++)
			{
				if (pattern_is_craftable[count1][1] == 0)
				{
					PatternTable += "<TR STYLE='font-size: 8px'><TD WIDTH='240'><A HREF='#' ID='Pattern_" + pattern_is_craftable[count1][0] + "' STYLE='color: red'>" + PATTERNS[pattern_is_craftable[count1][0]][PNAME] + "</A></TD><TD STYLE='text-align: right; font-size: 7px; font-weight: bold' WIDTH='50'>" + pattern_is_craftable[count1][1] + "</TD></TR>";
				}
				else
				{
					PatternTable += "<TR STYLE='font-size: 8px'><TD WIDTH='240'><A HREF='#' ID='Pattern_" + pattern_is_craftable[count1][0] + "'>" + PATTERNS[pattern_is_craftable[count1][0]][PNAME] + "</A></TD><TD STYLE='text-align: right; font-size: 7px; font-weight: bold' WIDTH='50'>" + pattern_is_craftable[count1][1] + "</TD></TR>";
				}
			}			
		
			WindowTable += PatternTable;
			WindowTable += "<TR><TD><BR></TD></TR>";
		}

		var IngredientsTable = "<TR><TH COLSPAN='2'><I>Ingredients</I></TH></TR>";
		total_ingredients = 0;
		
		var SortedArray = CRAFTING.slice(0, CRAFTING.length);
		SortedArray.sort(SortCraftingArray);
		
		for (count1 = 0; count1 < SortedArray.length; count1++)
		{
			if (SortedArray[count1][CRAFTQTY] > 0 || SETTINGS.showall)
			{
				total_ingredients++;
				IngredientsTable += "<TR STYLE='font-size: 8px;'><TD WIDTH='190'><A HREF=\"" + STATE.baseurl + "item.php?item_type=" + SortedArray[count1][CRAFTDETAIL] + "\">" + SortedArray[count1][CRAFTNAME] + "</A></TD><TD STYLE='text-align: right; font-size: 7px; font-weight: bold' WIDTH='50'><SPAN ID='Crafting_Qty_" + SortedArray[count1][CRAFTID] + "'>" + SortedArray[count1][CRAFTQTY] + "</SPAN></TD></TR>";
			}
		}

		if (total_ingredients > 0)
		{
			WindowTable += IngredientsTable;
		}
		
		WindowTable += "</TABLE>";	
		
		CraftingWindow.innerHTML = WindowTable;

		if (document.getElementById('Craft_Scroll') != null)
		{
			CreateSlider('Craft_Scroll', 250, 1, Math.min(MaxToCraft, 100), 'Craft_Qty');
		}

		for (count1 = 0; count1 < pattern_is_craftable.length; count1++)
		{
			var Pattern = document.getElementById('Pattern_' + pattern_is_craftable[count1][0]);
			
			if (Pattern != null)
			{
				Pattern.addEventListener("click", Craft, false);
				Pattern.addEventListener("mouseover", ShowIngredients, false);
				Pattern.addEventListener("mouseout", HideIngredients, false);
			}
		}
	}
	else
	{
		var RecipeWindows = getElementsByPartialId('PatternWindow_');
		
		for (count1 = 0; count1 < RecipeWindows.length; count1++)
		{
			RecipeWindows[count1].parentNode.removeChild(RecipeWindows[count1]);
		}
	}
}

function ShowIngredients()
{
	var pattern_id = -1;
	
	if (this.id.indexOf('Pattern') != -1)
	{
		pattern_id = this.id.substring(8);		
	}
	else if (this.id.indexOf('Cft') != -1)
	{
		pattern_id = this.id.substring(4);		
	}
	
	if (pattern_id != -1)
	{
		if (document.getElementById('PatternWindow_' + pattern_id) == null)
		{
			var PopupWindow = document.createElement("div");
			
			PopupWindow.style.position = 'absolute';
			PopupWindow.style.top = (mousePos.y + 18) + "px";
			PopupWindow.style.left = (mousePos.x) + "px";
			
			PopupWindow.id = "PatternWindow_" + pattern_id;
			
			var pattern_detail = "<B>" + PATTERNS[pattern_id][PNAME] + "</B><BR><TABLE><TR><TH WIDTH=\"180\">Ingredient</TH><TH WIDTH=\"35\" STYLE='text-align: center;'>Needs</TH><TH WIDTH=\"35\" STYLE='text-align: center;'>Stock</TH></TR>";
			var total_mats = 0;
			var ingredients = PATTERNS[pattern_id][PINGREDIENTS];
			
			for (var key in ingredients)
			{
				if (ingredients.hasOwnProperty(key)) 
				{
					total_mats++;

					var mat_name = key;
					var mat_id = CraftingLookup(mat_name);
					var mat_qty = Number(ingredients[key]);
					
					if (mat_id != -1)
					{
						var current_qty = Number(CRAFTING[mat_id][CRAFTQTY]);
						
						if (current_qty < mat_qty)
						{
							pattern_detail = pattern_detail + "<TR><TD STYLE='font: 6pt Verdana; color: red'>" + CRAFTING[mat_id][CRAFTNAME] + "</TD><TD STYLE='font: 6pt Verdana; text-align: center;'>" + mat_qty + "</TD><TD STYLE='font: 6pt Verdana; text-align: center;'>" + current_qty + "</TD></TR>";
						}
						else
						{
							pattern_detail = pattern_detail + "<TR><TD STYLE='font: 6pt Verdana; color: black'>" + CRAFTING[mat_id][CRAFTNAME] + "</TD><TD STYLE='font: 6pt Verdana; text-align: center;'>" + mat_qty + "</TD><TD STYLE='font: 6pt Verdana; text-align: center;'>" + current_qty + "</TD></TR>";
						}
					}
					else
					{
						pattern_detail = pattern_detail + "<TR><TD STYLE='font: 6pt Verdana; color: red'>" + mat_name + "</TD><TD STYLE='font: 6pt Verdana; text-align: center;'>" + mat_qty + "</TD><TD STYLE='font: 6pt Verdana; text-align: center;'>0</TD></TR>";
					}
				}
			}
			
			pattern_detail = pattern_detail + "</TABLE>";
			
			var height = 30 + (total_mats * 10);
			var width = 250;
			
			PopupWindow.innerHTML = "<DIV STYLE='position:absolute; z-index:912; background: white; padding: 0px 0px; color: black; border: 1px solid; font: 6pt Verdana; width: " + width + "px; height: " + height + "px;'><DIV STYLE='padding: 5px 5px; text-align: left; overflow: auto; height: 100%; font: 6pt Verdana;'>" + pattern_detail + "</DIV></DIV>";
			
			document.body.appendChild(PopupWindow);
		}
	}
}

function HideIngredients()
{
	var pattern_id = -1;
	
	if (this.id.indexOf('Pattern') != -1)
	{
		pattern_id = this.id.substring(8);		
	}
	else if (this.id.indexOf('Cft') != -1)
	{
		pattern_id = this.id.substring(4);		
	}
	
	if (pattern_id != -1)
	{
		if (document.getElementById('PatternWindow_' + pattern_id) != null)
		{
			document.getElementById('PatternWindow_' + pattern_id).parentNode.removeChild(document.getElementById('PatternWindow_' + pattern_id));
		}
	}
}

function CraftingLookup(name)
{
	var ReturnValue = -1;

	for (counter = 0; counter < CRAFTING.length && ReturnValue == -1; counter++)
	{
		if (CRAFTING[counter][CRAFTDETAIL] == name)
		{
			ReturnValue = counter
		}
	}
	
	return ReturnValue;
}

function InventoryLookup(name, detail)
{
	var ReturnValue = -1;
	
	for (counter = 0; counter < INVENTORY.length && ReturnValue == -1; counter++)
	{
		if (INVENTORY[counter][INVNAME] == name || INVENTORY[counter][INVDETAIL] == detail)
		{
			ReturnValue = counter;
		}
	}
	
	return ReturnValue;
}

function ShowPotionsWindow(display)
{
	var PotionsWindow = CreatePopupWindow('Potions', 250, 320, display);
	
	if (PotionsWindow != null)
	{
		var PotionsAvailable = new Array();
		
		var WindowTable = "<TABLE CELLSPACING='0' CELLPADDING='1'>";
		var MaxToCraft = 0;
	
		var PotionsTable = "<TR><TH COLSPAN='2'><I>Potions</I></TH></TR><TR><TD><DIV ID='Potion_Scroll'></DIV></TD><TD STYLE='text-align: right;'><SPAN ID='Potion_Qty'>1</SPAN></TD></TH></TR>";
		var TotalPotions = 0;
		
		for (count1 = 0; count1 < INVENTORY.length; count1++)
		{
			if (INVENTORY[count1][INVQTY] > 0 && INVENTORY[count1][INVTYPE] == INVENTORY_TYPES_TEXT[INV_TYPE_POTION])
			{
				MaxToCraft = Math.max(INVENTORY[count1][INVQTY], MaxToCraft);
				
				PotionsTable += "<TR STYLE='font-size: 8px'><TD WIDTH='190'>" + INVENTORY[count1][INVNAME] + "</TD><TD STYLE='text-align: right; font-size: 7px; font-weight: bold' WIDTH='50'>" + INVENTORY[count1][INVQTY] + "</TD></TR>";
				PotionsTable += "<TR><TD STYLE='font-size: 7px; font-weight: bold;'>&nbsp;";

				var PotionDetail = INVENTORY[count1][INVEXTRA];
				
				if (PotionDetail == "disabled")
				{
						PotionsTable += "&nbsp;&nbsp;&nbsp;&nbsp;Not yet available";
				}
				else
				{
					var PotionsArray = PotionDetail.split('#');
					
					for (count2 = 1; count2 < PotionsArray.length; count2++)
					{
						var ConvertDetail = PotionsArray[count2].split('_');
						PotionsTable += "&nbsp;&nbsp;&nbsp;&nbsp;<A HREF='#' ID='Potion_" + count1 + "_" + (count2 - 1) + "' CLASS='" + ConvertDetail[0] + "_" + INVENTORY[count1][INVNAME] + "'>" + ConvertDetail[1] + "x" + ConvertDetail[0] + "</A>";
						
						PotionsAvailable.push( [ count1, (count2 - 1) ] );
					}
				}
				
				PotionsTable += "</TD><TD ID='Potion_Cost_" + count1 +"' STYLE='text-align: right; font-size: 7px; font-weight: bold' WIDTH='50'></TD></TR>";
				
				TotalPotions++;
			}
		}
		
		if (TotalPotions > 0)
		{
			WindowTable += PotionsTable;
			WindowTable += "<TR><TD><BR></TD></TR>";
		}
	
		WindowTable += "</TABLE>";	
		PotionsWindow.innerHTML = WindowTable;
	
		if (document.getElementById('Potion_Scroll') != null)
		{
			CreateSlider('Potion_Scroll', 200, 1, Math.min(MaxToCraft, 50), 'Potion_Qty');
		}
	
		for (count1 = 0; count1 < PotionsAvailable.length; count1++)
		{
			var PotionLink = document.getElementById('Potion_' + PotionsAvailable[count1][0] + '_' + PotionsAvailable[count1][1]);
			
			if (PotionLink != null)
			{
				PotionLink.addEventListener("mouseover", UpdatePotionCost, false);
				PotionLink.addEventListener("mouseout", UpdatePotionCost, false);
				PotionLink.addEventListener("click", CraftPotion, false);
			}
		}
	}
}

function UpdatePotionCost(ev)
{
	var PotionType = Number(this.id.substring(7, this.id.indexOf('_', 7)));
	var CheeseType = Number(this.id.substring(this.id.indexOf('_', 7) + 1));
	
	if (ev.type == 'mouseover')
	{
		var PotionDetail = INVENTORY[PotionType][INVEXTRA];
		
		if (PotionDetail != "disabled")
		{
			var PotionsArray = PotionDetail.split('#');
			var ConvertDetail = PotionsArray[(CheeseType + 1)].split('_');
			
			var ConvPrice = Number(ConvertDetail[2]);
			var TotalCheese = Number(ConvertDetail[1]) * Number(document.getElementById('Potion_Qty').innerHTML);
	
			if (ConvPrice > 0)
			{
				document.getElementById('Potion_Cost_' + PotionType).innerHTML = (TotalCheese * ConvPrice) + 'g';
			}
			else
			{
				document.getElementById('Potion_Cost_' + PotionType).innerHTML = TotalCheese + ' pieces';
			}
		}
	}
	else if (ev.type == 'mouseout')
	{
		if (document.getElementById('Potion_Cost_' + PotionType) != null)
			document.getElementById('Potion_Cost_' + PotionType).innerHTML = '';
	}
}

function CraftPotion()
{
	var PotionType = this.id.substring(7, this.id.indexOf('_', 7));
	var CheeseType = this.id.substring(this.id.indexOf('_', 7) + 1);
	
	if (INVENTORY[PotionType][INVTYPE] == INVENTORY_TYPES_TEXT[INV_TYPE_POTION])
	{
		var TotalToCraft = document.getElementById('Potion_Qty').innerHTML;
		ShowPotionsWindow(false);

		UsePotion(INVENTORY[PotionType][INVDETAIL], CheeseType, TotalToCraft);
	}
}

function UsePotion(potion, cheese, qty)
{
	params = { "tab": 3, "potion": potion, "uh": STATE.hash, "num_potions": qty, "recipe_index": cheese };	
	Post(STATE.baseurl + "managers/ajax/users/usepotion.php", params, function(response) 
	{ 
		ShowCraftingMessage(response);
		
		if (response.success == 1)
		{
			if (response.inventory != null || response.items != null)
				UpdateInventory(response);
		}
	});
}

function ShowCraftingMessage(response)
{
		if (response.success == 1)
		{
			ShowMessageWindow('<div class="pagemessage msgsuccess"><div class="messagetop"></div><div class="messagebody"><div class="messagetitle">' + response.jsDialog.tokens.title.value + '</div><div class="messagecontent">' + response.jsDialog.tokens.content.value + '</div></div><div class="messagebottom"></div></div></div>', 5);
		}
		else
		{
			ShowMessageWindow('<div class="pagemessage msgerror"><div class="messagetop"></div><div class="messagebody"><div class="messagetitle">' + response.jsDialog.tokens.title.value + '</div><div class="messagecontent">' + response.jsDialog.tokens.content.value + '</div></div><div class="messagebottom"></div></div></div>');
		}
}

function ResetWindows()
{
	DSXC_setValue("Position - Configuration", "90px_300px");
	DSXC_setValue("Position - Crafting", "90px_300px");
	DSXC_setValue("Position - Potions", "90px_300px");
	DSXC_setValue("Position - Travel", "90px_300px");
}

function CheckMap(mapdetail)
{
	var MapAvailable = false;
	
	if (mapdetail instanceof Array)
	{
		for (var count = 0; count < mapdetail.length && !MapAvailable; count++)
		{
			MapAvailable = CheckMap(mapdetail[count]);
		}
	}
	else
	{
		if (mapdetail != -1 && INVENTORY[mapdetail] != null && INVENTORY[mapdetail][INVQTY] > 0)
		{
			MapAvailable = true;
		}
	}
	
	return MapAvailable;
}


function GetLocationID(locationname)
{
	var locationid = -1;
	
	for (count = 0; count < LOCATION.detail.length && locationid == -1; count++)
	{
		if (CheckLocation(locationname, LOCATION.detail[count][LNAME]))
		{
			locationid = count;
		}
	}
	
	return locationid;
}

function CheckLocation(locationname, locations)
{
	if (locations instanceof Array)
	{
		for (var count = 0; count < locations.length; count++)
		{
			if (CheckLocation(locationname, locations[count]))
			{
				return true;
			}
		}
	}
	else
	{
		if (locationname == locations)
		{
			return true;
		}
	}
	
	return false;
}

function ShowTravelWindow(display)
{
	var TravelWindow = CreatePopupWindow('Travel', 250, 320, display);
	
	if (TravelWindow != null)
	{
		CalculateRouteCosts();
		
		var newHTML = "<TABLE>";
		var region_name = "None";
		var total_found;
		
		for (count1 = 0; count1 < LOCATION.region.length; count1++)
		{
			newHTML = newHTML + "<TR><TH COLSPAN='2'><I>" + LOCATION.region[count1] + "</I></TH></TR>";
			total_found = 0;
		
			for (count2 = 0; count2 < LOCATION.detail.length; count2++)
			{
				if (LOCATION.detail[count2][LZONE] == count1 && count2 != STATE.location && LOCATION.detail[count2][LLVL] <= STATE.level && CheckMap(LOCATION.detail[count2][LMAP]))
				{
					var LocationName = LOCATION.detail[count2][LNAME];
					
					if (LocationName instanceof Array)
					{
						LocationName = LOCATION.detail[count2][LNAME][0];
					}
					
					var travel_cost = 0;
					
					if (STATE.location == -1)
					{
						// force travel via Meadow
						travel_cost = LOCATION.costs[0][count2];
					}
					else if (SETTINGS.direct)
					{
						travel_cost = LOCATION.costs[STATE.location][count2];
					}
					else
					{
						travel_cost = LOCATION.distance[STATE.location][count2];
					}
					
					if (LOCATION.distance[STATE.location][count2] != -99)
					{
						newHTML = newHTML + "<TR STYLE='font-size: 8px'><TD WIDTH='170'><A HREF='#' ID='Loc_" + count2 + "' CLASS='Loc_" + count2 + "'>" + LocationName + "</A></TD><TD STYLE='text-align: right; font-size: 7px; font-weight: bold' WIDTH='70'>" + travel_cost + " gold</TD></TR>";
						total_found++;
					}
				}
			}
			
			if (total_found == 0)
			{
				newHTML = newHTML + "<TR><TD COLSPAN='2'>Not available<P></TD></TR>";
			}
			else
			{
				newHTML = newHTML + "<TR><TD><BR></TD></TR>";
			}
		}
			
		newHTML = newHTML + "</TABLE>";	
		
		TravelWindow.innerHTML = newHTML;
		
		for (count1 = 0; count1 < LOCATION.detail.length; count1++)
		{
			if (document.getElementById('Loc_' + count1) != null) document.getElementById('Loc_' + count1).addEventListener("click", Travel, false);
		}
	}
}

function CheckHornState()
{
	var HornState = getElementsByPartialClass("hornready");
	
	if (HornState.length > 0)
	{
		if (STATE.hornstate != 1)
		{
			if (SETTINGS.title)
			{
				document.title = 'Now! | ' + STATE.title;
			}
			else
			{
				document.title = STATE.title;
			}
			
			document.getElementById('MHH_Horn_Timer').innerHTML = '<B>Now!</B>';
			SoundHorn();
			
			STATE.hornstate = 1;
		}
	}
	else
	{
		DSXC_setValue('Alert - Sound', false);
		HornState = getElementsByPartialClass("hornsounding");

		if (HornState.length > 0)
		{
			if (STATE.hornstate != 2)
			{
				STATE.hornstate = 2;
			}
		}
		else 
		{
			if (STATE.hornstate != 0)
				setTimeout(ResetUserObject, 10000);
			STATE.hornstate = 0;
		}
	}
	
	setTimeout(CheckHornState, 500);
}

function ResetUserObject()
{
	InitUserObject(unsafeWindow.user);	
}

function GetTimeout()
{
	return new Date().valueOf(); // milliseconds since 1 Jan 1970
}

function KingsRewardTimer()
{
	var TimeLeft = CheckTimeout('Update - Kings Reward', 0, 3);
	var KRTimerString = UpdateTimer(TimeLeft, true);
	
	var KRTimer = document.getElementById('MHH_Kings_Reward_Timer');
	if (KRTimer != null) KRTimer.innerHTML = KRTimerString;
	
	if (TimeLeft > 0)
	{
		setTimeout(KingsRewardTimer, 10000);
	}
}

function InventoryTimer()
{
	CheckInventory(SETTINGS.length);
	setTimeout(InventoryTimer, 30000);
}

function CurrentTimeStamp()
{
	return parseInt(new Date().getTime().toString().substring(0, 10));	
}

function HornCountdownTimer()
{
	var Start = GetTimeout();
	
	if (STATE.hornstate == 0)
	{
		if (STATE.userobject != null)
		{
			if (STATE.userobject.has_puzzle || STATE.userobject.hasReward)
			{
				STATE.king = true;
				DSXC_setValue('Alert - Sound', false);
				
				if (!DSXC_getValue('Alert - Kings Reward', false))
				{
					DSXC_setValue('Alert - Kings Reward', true);
					
					if (SETTINGS.king & STATE_SOUND)
					{
						AlertSound(AUDIO.reward);
					}
					
					if (SETTINGS.king & STATE_MESSAGE)
					{
						alert('Claim a King\'s Reward to continue hunting');
					}
				}
			}
			else
			{
				DSXC_setValue('Alert - Kings Reward', false);
			}

			var TimeRemaining = STATE.userobject.activeturn_wait_seconds - (CurrentTimeStamp() - STATE.userobject.last_activeturn_timestamp);
			var HornTimerString = UpdateTimer(TimeRemaining, false);
			
			if (SETTINGS.title)
			{
				document.title = HornTimerString + ' | ' + STATE.title;
			}
			else
			{
				document.title = STATE.title;
			}
			
			var HornTimer = document.getElementById('MHH_Horn_Timer');
			if (HornTimer != null) HornTimer.innerHTML = HornTimerString;
		}
	}

	var End = GetTimeout();
	setTimeout(HornCountdownTimer, ((SETTINGS.length * 1000) - (End - Start)));
}

function HornSoundedEvent(aEvent)
{
	var newData = JSON.parse(aEvent.newValue);

	if (newData.last_read_journal_entry_id != 0)
		DSXC_setValue('STATE.lastjournal', newData.last_read_journal_entry_id);
	
	if (newData.user != null)
		InitUserObject(newData.user);
}

function BaitTimer()
{
	var BaitValue = document.getElementById('hud_baitName');
	
	if (BaitValue != null)
	{
		if (BaitValue.innerHTML.indexOf('None!') != -1)
		{
			if (!DSXC_getValue('Alert - Cheese', false))
			{
				DSXC_setValue('Alert - Cheese', true);
				
				if (SETTINGS.cheese & STATE_SOUND)
				{
					AlertSound(AUDIO.cheese);
				}
					
				if (SETTINGS.cheese & STATE_MESSAGE)
				{
					alert('You are out of cheese.  Rebait to continue hunting.');
				}
			}
		}
		else
		{
			DSXC_setValue('Alert - Cheese', false);
		}
	}
	
	setTimeout(BaitTimer, (SETTINGS.length * 1000));
}

var CurrentURLTimer = -1;

function LocationCheckTimer()
{
	if (SETTINGS.washed > 0)
	{
		if (STATE.userobject != null)
		{
			var ExpectedLocation = DSXC_getValue('STATE.location', 'None');
			
			if (ExpectedLocation == 'Balack\'s Cove' && ExpectedLocation != STATE.userobject.location)
			{
				if (!DSXC_getValue('Alert - Washed Away', false))
				{
					DSXC_setValue('Alert - Washed Away', true);
					
					if (SETTINGS.washed & STATE_SOUND)
					{
						AlertSound(AUDIO.washed);
					}
						
					if (SETTINGS.washed & STATE_MESSAGE)
					{
						alert('You have been washed away from Balack\'s Cove.  I would recomend changing your bait before continuing to hunt.');
					}
				}
			}
			else
			{
				DSXC_setValue('Alert - Washed Away', false);
			}
		}
	}
	
	var CurrentTime = CurrentTimeStamp();
	
	for (iCount1 = 0; iCount1 < LOCATION_TIMERS.length; iCount1++)
	{
		if (typeof LOCATION_TIMERS[iCount1][1].url != 'undefined')
		{
			// retrieve from script values, check for timeout, request url
			var Remaining = CheckTimeout(LOCATION_TIMERS[iCount1][0] + ' - Last Update', 10, 0)
			
			if (CurrentURLTimer == -1 && Remaining == 0)
			{
				CurrentURLTimer = iCount1;
				ResetTimeout(LOCATION_TIMERS[iCount1][0] + ' - Last Update');
				
				// read from URL
				//Post(LOCATION_TIMERS[iCount1][1].url, null, function(text) {
				Get(LOCATION_TIMERS[iCount1][1].url, function(text) {
					if (text != 'Can\'t connect to MySQL')
					{
						var LocationData = JSON.parse(text);
						
						if (typeof LocationData.next_move != 'undefined')
						{
							var TimeRemaining = LocationData.next_move;
							
							if (LocationData.location == '???')
								TimeRemaining = -1;
			
							DSXC_setValue(LOCATION_TIMERS[CurrentURLTimer][0] + ' - Location', LocationData.location);
							DSXC_setValue(LOCATION_TIMERS[CurrentURLTimer][0] + ' - Next Move', UpdateTimer(TimeRemaining, true));
						}
						else if (typeof LocationData.level != 'undefined')
						{
							// update the current level to be able to travel
							LOCATION.detail[15][LLVL] = GetLevel(LocationData.level);
							DSXC_setValue(LOCATION_TIMERS[CurrentURLTimer][0] + ' - Location', LocationData.level);
							
							if (LocationData.percent == -1)
								DSXC_setValue(LOCATION_TIMERS[CurrentURLTimer][0] + ' - Next Move', 'Unknown');
							else
								DSXC_setValue(LOCATION_TIMERS[CurrentURLTimer][0] + ' - Next Move', (100 - LocationData.percent) + '%');
						}
					}
					else
					{
						DSXC_setValue(LOCATION_TIMERS[CurrentURLTimer][0] + ' - Location', '???');
					}
						
					CurrentURLTimer = -1;
				});
			}

			document.getElementById('MHH_Location_' + iCount1 + '_State').innerHTML = '<font color="green">' + DSXC_getValue(LOCATION_TIMERS[iCount1][0] + ' - Location') + '</font>';
			document.getElementById('MHH_Location_' + iCount1 + '_Change').innerHTML = DSXC_getValue(LOCATION_TIMERS[iCount1][0] + ' - Next Move');
		}
		else
		{
			var CurrentName = -1;
			var CurrentBreakdown = 0;
			var TotalBreakdown = 0;
			
			for (iCount2 = 0; iCount2 < LOCATION_TIMERS[iCount1][1].breakdown.length; iCount2++)
			{
				TotalBreakdown += LOCATION_TIMERS[iCount1][1].breakdown[iCount2];
			}
	
			var CurrentValue = Math.floor((CurrentTime - LOCATION_TIMERS[iCount1][1].first) / LOCATION_TIMERS[iCount1][1].length) % TotalBreakdown;
			
			for (iCount2 = 0; iCount2 < LOCATION_TIMERS[iCount1][1].breakdown.length && CurrentName == -1; iCount2++)
			{
				CurrentBreakdown += LOCATION_TIMERS[iCount1][1].breakdown[iCount2];
				
				if (CurrentValue < CurrentBreakdown)
				{
					CurrentName = iCount2;
				}
			}
	
			var SeasonLength = (LOCATION_TIMERS[iCount1][1].length * LOCATION_TIMERS[iCount1][1].breakdown[CurrentName]);
			var CurrentTimer = (CurrentTime - LOCATION_TIMERS[iCount1][1].first);
			var SeasonRemaining = 0;
			
			while (CurrentTimer > 0)
			{
				for (iCount2 = 0; iCount2 < LOCATION_TIMERS[iCount1][1].breakdown.length && CurrentTimer > 0; iCount2++)
				{
					SeasonRemaining = CurrentTimer;
					CurrentTimer -= (LOCATION_TIMERS[iCount1][1].length * LOCATION_TIMERS[iCount1][1].breakdown[iCount2])
				}
			}
			
			SeasonRemaining = SeasonLength - SeasonRemaining;
			
			document.getElementById('MHH_Location_' + iCount1 + '_State').innerHTML = '<font color="' + LOCATION_TIMERS[iCount1][1].color[CurrentName] + '">' + LOCATION_TIMERS[iCount1][1].name[CurrentName] + '</font>';
			if (LOCATION_TIMERS[iCount1][1].effective != null)
			{
				document.getElementById('MHH_Location_' + iCount1 + '_State').innerHTML += ' (' + LOCATION_TIMERS[iCount1][1].effective[CurrentName] + ')';
			}
			
			document.getElementById('MHH_Location_' + iCount1 + '_Change').innerHTML = UpdateTimer(SeasonRemaining, true);
		}
	}
	
	if (STATE.userobject != null)
	{
		if (STATE.userobject.location == 'Seasonal Garden')
		{
			if (STATE.userobject.viewing_atts.zzt_amplifier == STATE.userobject.viewing_atts.zzt_max_amplifier)
			{
				if (!DSXC_getValue('Alert - Max Amplifier', false))
				{
					DSXC_setValue('Alert - Max Amplifier', true);
					
					if (SETTINGS.season & STATE_SOUND)
					{
						AlertSound(AUDIO.maxamp);
					}
						
					if (SETTINGS.season & STATE_MESSAGE)
					{
						alert('You have reached your maximum for Zugzwang\'s Tower Amplifier.  Time to head inside!');
					}
				}
			}
			else
			{
				DSXC_setValue('Alert - Max Amplifier', false);
			}
		}
		
		var SeasonIcon = document.getElementById('hud_seasonIcon');
		
		if (SeasonIcon != null)
		{
			var CurrentSeason = DSXC_getValue('Current Season', 'none');
			
			if (CurrentSeason != 'none' && CurrentSeason != SeasonIcon.className)
			{
				if (!DSXC_getValue('Alert - Season Change', false))
				{
					DSXC_setValue('Alert - Season Change', true);
					
					if (SETTINGS.season & STATE_SOUND)
					{
						AlertSound(AUDIO.season);
					}
						
					if (SETTINGS.season & STATE_MESSAGE)
					{
						var AlertText = 'The season has changed, make sure you change your trap. ';
						
						switch (SeasonIcon.className)
						{
							case ' seasonicon sr': AlertText = AlertText + 'It is now Summer, using a Tactical trap is most effective.'; break;
							case ' seasonicon fl': AlertText = AlertText + 'It is now Fall, using a Shadow trap is most effective.'; break;
							case ' seasonicon wr': AlertText = AlertText + 'It is now Winter, using a Hydro trap is most effective.'; break;
							case ' seasonicon sg': AlertText = AlertText + 'It is now Spring, using a Physical or Tactical trap is most effective.'; break;
						}
						
						alert(AlertText);
					}
				}
			}
			else
			{
				DSXC_setValue('Alert - Season Change', false);
			}
			
			DSXC_setValue('Current Season', SeasonIcon.className);
		}
	}
	else
	{
		DSXC_setValue('Current Season', 'none');
	}
	
	setTimeout(LocationCheckTimer, 10000);
}

function StartTimers()
{
	if (STATE.maintenance)
	{
		// if in maintenance, do nothing
	}
	else
	{
		// check every 30 seconds
		InventoryTimer();
		UpdateQuestProgress();
		
		// check every 10 seconds
		KingsRewardTimer();
		LocationCheckTimer();
	
		// check every second
		BaitTimer();
		HornCountdownTimer();
		
		TournamentTimer();
		
		// background timer for horn sounding
		CheckHornState();
	}
}

function GetDisplayText(id)
{
	var DisplayWindowText = 'MHH_Display_' + id;
	var DisplayWindow = document.getElementById(DisplayWindowText);
	
	if (DisplayWindow != null)
	{
		return DisplayWindow.innerHTML;
	}
	else
	{
		return '';
	}
}

function SetDisplayText(id, text)
{
	var DisplayWindowText = 'MHH_Display_' + id;
	var DisplayWindow = document.getElementById(DisplayWindowText);
	
	if (DisplayWindow != null)
	{
		DisplayWindow.innerHTML = text;
	}
	else
	{
		DisplayState();
		DisplayTimers();
		
		SetDisplayText(id, text);
	}
}

function UpdatePercentage(percent)
{
	var DisplayProgress = document.getElementById('hud_titlePercentage');
	if (DisplayProgress != null) DisplayProgress.innerHTML = percent;
}

function ShowJournalWindow(display)
{
	var JournalWindow = CreatePopupWindow('Journal Summary', 275, 380, display);
	
	if (JournalWindow != null)
	{
		STATE.lastjournal = DSXC_getValue('STATE.lastjournal', 51);
		
  	JournalWindow.innerHTML = "<B>Catches:</B><BR /><DIV ID=\"MH_Journal_Catches\" STYLE=\"font: 8pt Verdana\"><I>Updating...</I></DIV><BR /><B>Gold and Points:</B><BR /><DIV ID=\"MH_Journal_Gains\" STYLE=\"font: 8pt Verdana\"><I>Updating...</I></DIV><BR /><B>Loot:</B><BR /><DIV ID=\"MH_Journal_Loot\" STYLE=\"font: 8pt Verdana\"><I>Updating...</I></DIV><BR />";
  	JournalSummary();
	}
}

function JournalSummary()
{
	DSXC_log("UpdateJournalSummary");
	
	var journal = STATE.lastjournal - 50;
	
	if (journal < 1)
		journal = 1;
	
	params = { "last_read_journal_entry_id": journal, "uh": STATE.hash };
	Post(STATE.baseurl + "managers/ajax/turns/activeturn.php", params, UpdateJournalSummary);
}

var TotalCatches;
var TotalGold;
var TotalGoldStolen;
var TotalPoints;
var TotalPointsLost;
var TotalWeight;

var ArrayMouse;
var ArrayLoot;

function UpdateJournalSummary(response)
{
	STATE.lastjournal = response.last_read_journal_entry_id;
	DSXC_setValue('STATE.lastjournal', STATE.lastjournal);
	
	DSXC_log(" - last journal read " + response.last_read_journal_entry_id);
	
	if (response.journal_markup != null && response.journal_markup.length > 0)
	{
		DSXC_log(" - found " + response.journal_markup.length + " journal entries");
		
		TotalCatches = 0;
		TotalMisses = 0;
		TotalFailures = 0;
		TotalGold = 0;
		TotalGoldStolen = 0;
		TotalPoints = 0;
		TotalPointsLost = 0;
		TotalWeight = 0;
		
		ArrayMouse = Array();
		ArrayLoot = Array();
		
	  for (var count = 0; count < response.journal_markup.length; count++) 
	  {
	  	var journal_entry = response.journal_markup[count];
	  	
	  	if (journal_entry.publish_data != null)
	  	{
		  	var szJournalType = journal_entry.publish_data.attachment.name;
		  	var szJournalText = journal_entry.publish_data.attachment.description;
		    
		    if (szJournalText.indexOf('lb.') != -1 || szJournalText.indexOf('oz.') != -1)
		    {
		    	TotalCatches++;
		    	
					iJournalStartPos = szJournalText.indexOf('I caught a') + 11;
					iJournalEndPos = szJournalText.indexOf(' lb.', iJournalStartPos);
					
					if (iJournalEndPos != -1)
					{
						TotalWeight = TotalWeight + (Number(szJournalText.substring(iJournalStartPos, iJournalEndPos)) * 16);
						iJournalStartPos = iJournalEndPos + 5;
					}
					
					iJournalEndPos = szJournalText.indexOf(' oz.', iJournalStartPos);
					TotalWeight = TotalWeight + Number(szJournalText.substring(iJournalStartPos, iJournalEndPos));
					
					iJournalStartPos = iJournalEndPos + 5;
					iJournalEndPos = szJournalText.indexOf(' worth', iJournalStartPos);
					
					szCurrentMouse = szJournalText.substring(iJournalStartPos, iJournalEndPos);
					AddMouse(szCurrentMouse);
					
					iJournalStartPos = szJournalText.indexOf(' worth ', iJournalEndPos) + 7;
					iJournalEndPos = szJournalText.indexOf(' points and ', iJournalStartPos);
					TotalPoints = TotalPoints + Number(szJournalText.substring(iJournalStartPos, iJournalEndPos).replace(/,/g, ""));
					
					iJournalStartPos = iJournalEndPos + 12;
					iJournalEndPos = szJournalText.indexOf(' gold', iJournalStartPos);
					TotalGold = TotalGold + Number(szJournalText.substring(iJournalStartPos, iJournalEndPos).replace(/,/g, ""));
					
					iJournalStartPos = szJournalText.indexOf('dropped the following loot:', iJournalEndPos)
					
					if (iJournalStartPos != -1)
				 	{
				 		var LootText = szJournalText.substring(iJournalStartPos + 27);
				 		var LootItems = Array();

						if (LootText.indexOf(" and ") != -1)
						{
					 		var TempLootItems = LootText.split(" and ");
							LootItems.push(TempLootItems[1]);
							
							if (LootText.indexOf(", ") != -1)
						 		LootItems.concat(TempLootItems[0].split(", "));
							else
								LootItems.push(TempLootItems[0]);
						}
						else
						{
							LootItems.push(LootText);
						}
				 		
				 		for (var count2 = 0; count2 < LootItems.length; count2++)
				 		{
				 			iJournalStartPos = LootItems[count2].indexOf(' ');
				 			
							iQuantity = Number(LootItems[count2].substring(0, iJournalStartPos));
							szItemName = LootItems[count2].substring(iJournalStartPos);
				 			
							AddLoot(szItemName, iQuantity);
				 		}
					}
		    }
		    else if (szJournalType.indexOf('I failed to catch ') != -1)
		    {
		    	TotalMisses++;
		    	
					if (szJournalText.indexOf('Additionally, ') != -1)
					{
						iJournalStartPos = szJournalText.indexOf(' pillaged ');
						
						if (iJournalStartPos != -1)
						{
							iJournalStartPos = iJournalStartPos + 10;
							iJournalEndPos = szJournalText.indexOf(' gold');
				    	TotalGoldStolen = TotalGoldStolen + Number(szJournalText.substring(iJournalStartPos, iJournalEndPos).replace(/,/g, ""));
						}
						
						iJournalStartPos = szJournalText.indexOf(' setting me back ');
						
						if (iJournalStartPos != -1)
						{
							iJournalStartPos = iJournalStartPos + 17;
							iJournalEndPos = szJournalText.indexOf(' points!');
				    	TotalPointsLost = TotalPointsLost + Number(szJournalText.substring(iJournalStartPos, iJournalEndPos).replace(/,/g, ""));
						}
					}
				}
		    else if (szJournalType.indexOf('I failed to attract ') != -1)
	    	{
	    		TotalFailures++;
	    	}
	    }
	  }
	  
	  UpdateJournalDisplay();
	}
}

function UpdateJournalDisplay()	
{
	ArrayMouse.sort(compare);
	
	szJournalText = "";
	for (iCount = 0; iCount < ArrayMouse.length; iCount++)
	{
		if (iCount > 0) 
			szJournalText = szJournalText + ", ";
			
		szJournalText = szJournalText + ArrayMouse[iCount].value + " " + ArrayMouse[iCount].name;
	}
	szJournalText = szJournalText + "<BR /><BR />Total catches: " + TotalCatches + "<BR />Total misses: " + TotalMisses + "<BR />FTA / Stale: " + TotalFailures + "<BR />Average weight: " + Math.round(TotalWeight / TotalCatches) + " oz.";
	if (document.getElementById('MH_Journal_Catches') != null) document.getElementById('MH_Journal_Catches').innerHTML = szJournalText;
	
	szJournalText = addCommas(TotalGold) + " gold gained, " + addCommas(TotalGoldStolen) + " gold lost<BR />";
	szJournalText = szJournalText + addCommas(TotalPoints) + " points gained, " + addCommas(TotalPointsLost) + " points lost<BR />";
	szJournalText = szJournalText + addCommas((TotalGold - TotalGoldStolen)) + " net gold, " + addCommas((TotalPoints - TotalPointsLost)) + " net points<BR />";
	if (document.getElementById('MH_Journal_Gains') != null) document.getElementById('MH_Journal_Gains').innerHTML = szJournalText;

	szJournalText = "None";
	if (ArrayLoot.length > 0)
	{
		ArrayLoot.sort(compare);
		
		szJournalText = "";
		for (iCount = 0; iCount < ArrayLoot.length; iCount++)
		{
			szJournalText = szJournalText + ArrayLoot[iCount].name + " (x" + ArrayLoot[iCount].quantity + ")<BR />";
		}
	}
	if (document.getElementById('MH_Journal_Loot') != null) document.getElementById('MH_Journal_Loot').innerHTML = szJournalText;
}

function AddMouse(szMouseName)
{
	var MouseIndex = -1;
	
	for (var count = 0; count < ArrayMouse.length && MouseIndex == -1; count++)
	{
		if (ArrayMouse[count].name == szMouseName)
			MouseIndex = count;
	}
	
	if (MouseIndex == -1)
		ArrayMouse.push({ name: szMouseName, value: 1 });
	else
		ArrayMouse[MouseIndex].value++;
}

function AddLoot(szItemName, iQty)
{
	if (iQty > 1)
	{
		if (szItemName.substr(-3) == "ies")
			szItemName = szItemName.substr(0, szItemName.length - 3)+"y";
		if (szItemName.substr(-2) == "'s")
			szItemName = szItemName.substr(0, szItemName.length - 2);
		if (szItemName.substr(-1) == "s")
			szItemName = szItemName.substr(0, szItemName.length - 1);
	}
	
	var LootIndex = -1;
	
	for (var count = 0; count < ArrayLoot.length && LootIndex == -1; count++)
	{
		if (ArrayLoot[count].name == szItemName)
			LootIndex = count;
	}
	
	if (LootIndex == -1)
		ArrayLoot.push({ name: szItemName, quantity: iQty });
	else
		ArrayLoot[LootIndex].quantity += iQty;
}

function compare(a, b)
{
	if (a.name < b.name)
		return -1;
	if (a.name > b.name)
		return 1;
	return 0;
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function TournamentTimer()
{
	setTimeout(TournamentTimer, 10000);
	
	if (SETTINGS.tourney != STATE_OFF)
	{
		if (STATE.userobject != null && typeof(STATE.userobject.viewing_atts.tournament) != 'undefined')
		{
			var tournament = STATE.userobject.viewing_atts.tournament;
			
			if (STATE.tourney == -1)
				STATE.tourney = tournament.seconds_remaining;
			else
				STATE.tourney = STATE.tourney - 10;
			
			if (tournament.status == "pending" && STATE.tourney > 0)
			{
				if (STATE.tourney < 300)
				{
					var lastAlert = DSXC_getValue("Alert - Tournament", -1);
					
					if (lastAlert != tournament.tournament_id)
					{
						DSXC_setValue('Alert - Tournament', tournament.tournament_id);
						
						if (SETTINGS.tourney & STATE_SOUND)
						{
							AlertSound(AUDIO.tourney);
						}
							
						if (SETTINGS.tourney & STATE_MESSAGE)
						{
							alert('Your tournament is about to start');
						}
					}
				}
				else if (STATE.tourney < 1200)
				{
					var lastAlert = DSXC_getValue("Alert - Tournament Early Warning", -1);
					
					if (lastAlert != tournament.tournament_id)
					{
						DSXC_setValue('Alert - Tournament Early Warning', tournament.tournament_id);
						
						if (SETTINGS.tourney & STATE_SOUND)
						{
							AlertSound(AUDIO.tourney);
						}
							
						if (SETTINGS.tourney & STATE_MESSAGE)
						{
							alert('Your tournament will start in around 20 minutes');
						}
					}
				}
			}
		}
	}
}

function IcebergProgress()
{
	var progress = getElementById('MHH_Iceberg_Progress');
	
	if (progress == null)
	{
		var iceberg = getElementsByPartialClass("depth");
		var depth = iceberg[0];
		
		if (depth != null)
		{
			var progress = document.createElement("div");
			progress.id = "MHH_Iceberg_Progress";
			progress.style.fontSize = "10px";
			
			depth.appendChild(progress);
		}
	}
	
	return progress;
}

function UpdateIcebergProgress()
{
	var quest = STATE.userobject.quests.QuestIceberg;
	
	var turnsTaken = quest.turns_taken;
	var currentDepth = quest.user_progress;
	var maxTurns = quest.max_turns;
	var maxDepth = quest.max_depth;
	
	if (quest.in_bonus)
	{
		var avgPerHunt = currentDepth / turnsTaken;
		var currentRate = turnsTaken + ((2000 - currentDepth) / avgPerHunt);
		
		var status = "Current rate " + avgPerHunt.toFixed(2) + "', complete by #" + Math.ceil(currentRate) + "<BR>";
		
		var color = "Lime";

		if (Math.abs(currentRate - 250) <= 2)
			color = "Yellow";
		else if (avgPerHunt < reqPerHunt)
			color = "Red";
		
		var reqPerHunt = (2000 - currentDepth) / (250 - turnsTaken);
		
		status = "<FONT COLOR='" + color + "'>Hidden Depths: " + reqPerHunt.toFixed(2) + "'</FONT> ";
	}
	else
	{
		var avgPerHunt = currentDepth / turnsTaken;
		var currentRate = turnsTaken + ((maxDepth - currentDepth) / avgPerHunt);
		
		var status = "Current rate " + avgPerHunt.toFixed(2) + "', complete by #" + Math.ceil(currentRate) + "<BR>";
		
		var totalShown = 0;
		
		if (turnsTaken < quest.chests[0].turn)
		{
			if (quest.chests.length < 4)
				quest.chests.push({"id":4,"name":"Hidden Depths","turn":250,"active":(turnsTaken <= 250),"position":400});
			
			for (var count = (quest.chests.length - 1); count >= 0 && totalShown < 2; count--)
			{
				if (turnsTaken < quest.chests[count].turn)
				{
					var reqPerHunt = maxDepth / quest.chests[count].turn;
					var color = "Lime";

					if (Math.abs(avgPerHunt - reqPerHunt) <= 0.1)
						color = "Yellow";
					else if (avgPerHunt < reqPerHunt)
						color = "Red";
					
					status = status + "<FONT COLOR='" + color + "'>" + quest.chests[count].name + ": " + reqPerHunt.toFixed(2) + "'</FONT> ";
					
					totalShown++;
				}
			}
		}
		
		if (totalShown == 0)
		{
			status = status + "<FONT COLOR='Red'><B>Better luck next time!</B></FONT>";
		}
	}
	
	var progress = IcebergProgress();
	
	if (progress != null)
		progress.innerHTML = status;
}

function UpdateEssences(essences, essence)
{
	if (essence == null) essence = 'essence_a_crafting_item';
	
	var addon = 0;
	var prisms = 0;
	var reached = false;
	
	var essence_name = "A";
	
	for (var count = 0; count < essences.length; count++)
	{
		var spanElement = getElementById('MHH_' + essences[count].type);
		
		if (typeof(spanElement) != "undefined")
		{
			if (reached)
			{
				spanElement.innerHTML = essences[count].quantity;
			}
			else
			{
				if (addon > 0)
					essence_name = essences[count].type.substring(8, 9).toUpperCase()
				
				prisms += addon;
				
				if (essences[count].type == essence)
				{
					reached = true;
					
					spanElement.innerHTML = (essences[count].quantity + addon);
					
					if (addon > 0)
						spanElement.parentNode.title = spanElement.parentNode.currentTitle + ' - needs ' + prisms + ' prisms';
					
					addon = 0;
				}
				else
				{
					var quantity = essences[count].quantity + addon;
					
					spanElement.innerHTML = (quantity % 3);
					addon = Math.floor(quantity / 3);
				}
			}
		}
	}
}

function UpdateLivingGardenProgress(quest)
{
	var progress = getElementsByPartialId('MHH_essence_');
	
	if (progress.length == 0)
	{
		var essences = quest.essences;
		
		for (var count = 0; count < essences.length; count++)
		{
			var essence = getElementsByClass("item " + essences[count].type);
			
			if (essence.length == 1)
			{
				if (typeof(essence[0].currentTitle) == "undefined")
					essence[0].currentTitle = essence[0].title;
				
				essence[0].innerHTML = '<span id="MHH_' + essences[count].type + '">' + essences[count].quantity + '</span>';
				essence[0].onmouseover = function() 
				{
					UpdateEssences(essences, this.className.substring(5));
				};
				essence[0].onmouseout = function()
				{
					UpdateEssences(essences);
				};
			}
		}
	}
}

function UpdateQuestProgress()
{
	if (STATE.userobject != null && typeof(STATE.userobject.quests) != "undefined")
	{
		if (typeof(STATE.userobject.quests.QuestIceberg) != "undefined")
		{
			UpdateIcebergProgress();
		}
		else if (typeof(STATE.userobject.quests.QuestLivingGarden) != "undefined")
		{
			UpdateLivingGardenProgress(STATE.userobject.quests.QuestLivingGarden);
		}
		else if (typeof(STATE.userobject.quests.QuestLostCity) != "undefined")
		{
			UpdateLivingGardenProgress(STATE.userobject.quests.QuestLostCity);
		}
		else if (typeof(STATE.userobject.quests.QuestSandDunes) != "undefined")
		{
			UpdateLivingGardenProgress(STATE.userobject.quests.QuestSandDunes);
		}
	}
	
	setTimeout(UpdateQuestProgress, 5000);
}

function UpdateScript()
{
	window.location = SCRIPT.scripturl;
}

function CheckForUpdate()
{
	var szPageText;
	var szOnlineVersion = 'none';
	var fCurrentVersion, fOnlineVersion, fLastVersion;
	
	// check for an update every 30 minutes
	if (CheckTimeout('Update - Script', 30) == 0)
	{
		ResetTimeout('Update - Script');
		
		var today = new Date();
		var current_time = today.getTime();	
		
		Get(SCRIPT.versionurl + '?' + current_time, function(text) {
			szPageText = text;
			
			szOnlineVersion = text.substring(text.indexOf('@version') + 13, text.indexOf('@version') + 17);
			
			fLastVersion = parseFloat(DSXC_getValue('Script - Last Revision', '0.0'));
			fOnlineVersion = parseFloat(szOnlineVersion);
			fCurrentVersion = parseFloat(SCRIPT.version);
	
			if (fOnlineVersion > fCurrentVersion && fOnlineVersion != fLastVersion)
			{
				DSXC_setValue('Script - Last Revision', szOnlineVersion);
				var szMessageText = 'DSXC\'s MouseHunt Helper (' + szOnlineVersion + ') is available!\n\n';
				
				var iStartPos = text.indexOf('@revision');
				var iEndPos;
				
				while (iStartPos != -1)
				{
					iEndPos = text.indexOf('//', iStartPos);
					szMessageText = szMessageText + text.substring(iStartPos + 10, iEndPos);
					
					iStartPos = text.indexOf('@revision', iEndPos);
				}
	
				szMessageText = szMessageText + '\nDo you want to upgrade now?';
				
				if (window.confirm(szMessageText))
				{
					UpdateScript();
				}
			}
		});
	}
}