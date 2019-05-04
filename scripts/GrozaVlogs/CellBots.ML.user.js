// ==UserScript==
// @name         CellBots.ML
// @namespace    Agar Clones Bots
// @version      1.0.6
// @description  Free bots 
// @author       GrozaVlogs,CellBots ML
// @match        http://cellcraft.io/*
// @match        http://agar.red/*
// @match        http://play.agario0.com/*
// @match        http://galx.io/*
// @match        http://nbk.io/*
// @match        http://dual-agar.online/*
// @match        http://fanix.io/*
// @match        http://agar.bio/*
// @match        http://cellcraft.io/*
// @match        http://bomb.agar.bio/*
// @match       *.agma.io/*
// @match        http://agariohub.net/*  
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.js
// @require      https://unpkg.com/sweetalert/dist/sweetalert.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.4/socket.io.min.js
// @grant        none
// ==/UserScript==

window.socket = io.connect('ws://79.118.188.129:8081'); 


/* Please do not edit the script if you don't know what are you doing */
//sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvdXJjZU1hcCJdLCJuYW1lcyI6WyIkIiwic3dhbCIsInNldFRpbWVvdXQiLCJfMHgxZWU0OTAiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIldlYlNvY2tldCIsIl8weDRjMjcwZSIsInNvY2tldCIsImJvdHMiLCJfMHg5Y2FlMDAiLCJvcmlnaW4iLCJEYXRhVmlldyIsImFyZ3VtZW50cyIsImRvY3VtZW50IiwiXzB4NTkwNzY5IiwiXzB4MjJhMjFmIiwicHJvbXB0IiwiY29uc29sZSIsIl8weDMwNDgyMCIsIl8weDI2Njc2NCIsIl8weDIxMmZjOSIsIl8weDIwOWNmZSIsIl8weDQ1Yjk2MiIsIkRhdGUiLCJfMHg0ZTExZjAiLCJfMHg0MjViMDciLCJfMHgxOTFlMzIiLCJsb29wIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY291bnRGUFMiLCJzZXRJbnRlcnZhbCIsIl8weDRjZjg0OCIsImNsZWFySW50ZXJ2YWwiLCJfMHgzOGZiOTIiXSwibWFwcGluZ3MiOiIrd2FBQ0FBLENBQUEsQyxjQUFBLEUsY0FBQSxFLDBzakJBQUEsRUFFQUMsSUFBQSxDQUFLLEMsT0FDRCxDLDhIQURDLEMsTUFFRCxDLGNBRkMsQyxNQUdELEMsOEJBSEMsQyxRQUlELEMsVUFKQyxDQUFMLEVBT0FELENBQUEsQyxjQUFBLEVBQVEsQyxTQUNKLEMsOENBREksQyxNQUVKLEMsY0FGSSxDLE1BR0osQyxjQUhJLEMsb0JBSUosQyxjQUpJLEMsUUFLSixDLElBTEksQyxVQU1KLEMsY0FOSSxDQUFSLEVBU0FFLFVBQUEsQ0FBVyxJQUFNLEMsODdDQUNiLElBQUlDLFNBQUEsQ0FBWSxJQUFoQixDQUVBQyxNQUFBLEMsZUFBQSxFQUFjLEMsUUFDVixDQUFRLEMsR0FDSixDLEdBREksQyxHQUVKLEMsR0FGSSxDLFlBR0osQyxHQUhJLENBREUsQyxJQU1WLENBQUksSUFOTSxDLFFBT1YsQ0FBUUMsUUFBQSxDLGVBQUEsQ0FQRSxDLFVBUVYsQyxHQVJVLENBQWQsQ0FXQUMsU0FBQSxDLHNDQUFB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QkFDQUQsVyxDQUFZLFVBQVcsQywyQkFDbkJHLFMsQ0FBQSxDQURtQixDLE1BQXZCLENBeEphLENBQWpCLEMsS0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qTG9hZCB0b2FzdCBwbHVnaW4gY3NzKi9cbiQoJ2JvZHknKS5hcHBlbmQoYDxzdHlsZT4uanEtdG9hc3Qtd3JhcHtkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjI1MHB4O3BvaW50ZXItZXZlbnRzOm5vbmUhaW1wb3J0YW50O21hcmdpbjowO3BhZGRpbmc6MDtsZXR0ZXItc3BhY2luZzpub3JtYWw7ei1pbmRleDo5MDAwIWltcG9ydGFudH0uanEtdG9hc3Qtd3JhcCAqe21hcmdpbjowO3BhZGRpbmc6MH0uanEtdG9hc3Qtd3JhcC5ib3R0b20tbGVmdHtib3R0b206MjBweDtsZWZ0OjIwcHh9LmpxLXRvYXN0LXdyYXAuYm90dG9tLXJpZ2h0e2JvdHRvbToyMHB4O3JpZ2h0OjQwcHh9LmpxLXRvYXN0LXdyYXAudG9wLWxlZnR7dG9wOjIwcHg7bGVmdDoyMHB4fS5qcS10b2FzdC13cmFwLnRvcC1yaWdodHt0b3A6MjBweDtyaWdodDo0MHB4fS5qcS10b2FzdC1zaW5nbGV7ZGlzcGxheTpibG9jazt3aWR0aDoxMDAlO3BhZGRpbmc6MTBweDttYXJnaW46MCAwIDVweDtib3JkZXItcmFkaXVzOjRweDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTphcmlhbCxzYW5zLXNlcmlmO2xpbmUtaGVpZ2h0OjE3cHg7cG9zaXRpb246cmVsYXRpdmU7cG9pbnRlci1ldmVudHM6YWxsIWltcG9ydGFudDtiYWNrZ3JvdW5kLWNvbG9yOiM0NDQ7Y29sb3I6I2ZmZn0uanEtdG9hc3Qtc2luZ2xlIGgye2ZvbnQtZmFtaWx5OmFyaWFsLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7bWFyZ2luOjAgMCA3cHg7YmFja2dyb3VuZDpub25lO2NvbG9yOmluaGVyaXQ7bGluZS1oZWlnaHQ6aW5oZXJpdDtsZXR0ZXItc3BhY2luZzpub3JtYWx9LmpxLXRvYXN0LXNpbmdsZSBhe2NvbG9yOiNlZWU7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Zm9udC13ZWlnaHQ6NzAwO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNmZmY7cGFkZGluZy1ib3R0b206M3B4O2ZvbnQtc2l6ZToxMnB4fS5qcS10b2FzdC1zaW5nbGUgdWx7bWFyZ2luOjAgMCAwIDE1cHg7YmFja2dyb3VuZDpub25lO3BhZGRpbmc6MH0uanEtdG9hc3Qtc2luZ2xlIHVsIGxpe2xpc3Qtc3R5bGUtdHlwZTpkaXNjIWltcG9ydGFudDtsaW5lLWhlaWdodDoxN3B4O2JhY2tncm91bmQ6bm9uZTttYXJnaW46MDtwYWRkaW5nOjA7bGV0dGVyLXNwYWNpbmc6bm9ybWFsfS5jbG9zZS1qcS10b2FzdC1zaW5nbGV7cG9zaXRpb246YWJzb2x1dGU7dG9wOjNweDtyaWdodDo3cHg7Zm9udC1zaXplOjE0cHg7Y3Vyc29yOnBvaW50ZXJ9LmpxLXRvYXN0LWxvYWRlcntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDotMnB4O2hlaWdodDo1cHg7d2lkdGg6MDtsZWZ0OjA7Ym9yZGVyLXJhZGl1czo1cHg7YmFja2dyb3VuZDpyZWR9LmpxLXRvYXN0LWxvYWRlZHt3aWR0aDoxMDAlfS5qcS1oYXMtaWNvbntwYWRkaW5nOjEwcHggMTBweCAxMHB4IDUwcHg7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtcG9zaXRpb246MTBweH0uanEtaWNvbi1pbmZve2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQmdBQUFBWUNBWUFBQURnZHozNEFBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQUFKY0VoWmN3QUFEc01BQUE3REFjZHZxR1FBQUFHd1NVUkJWRWhMdFphOVNnTkJFTWM5c1V4eFJjb1VLU3pTV0loWHBGTWhoWVdGaGFCZzR5UFlpV0NYWnhCTEVSc0xSUzNFUWtFZndDS2RqV0pBd1NLQ2dvS0NjdWR2NE81WUxydDdFemdYaGlVMy80K2IyY2ttd1ZqSlNwS2tRNndBaTRnd2hUK3ozd1JCY0V6MHlqU3NlVVRyY1J5ZnNIc1htRDBBbWJIT0M5SWk4VkltbnVYQlBnbEhwUTV3d1NWTTdzTm5URzdaYTRKd0RkQ2p4eUFpSDNueUEybXRhVEp1ZmlEWjVkQ2FxbEl0SUxoMU5IYXRmTjVza3ZqeDlaMzhtNjlDZ3p1WG1aZ1ZyUElHRTc2M0p4OXFLc1JveldZdzZ4T0hkRVIrbm4yS2tPK0JiK1VWNUNCTjZXQzZRdEJnYlJWb3pyYWhBYm1tNkh0VXNndFBDMTl0RmR4WFpZQk9ma2JtRkoxVmFIQTFWQUhqZDBwcDcwb1RaenZSK0VWcngyWWdmZHNxNmV1NTVCSFlSOGhsY2tpK24ra0VSVUZHOEJyQTBCd2plQXYyTThXTFFCdGN5K1NENmZOc21uQjNBbEJMcmdUdFZXMWMyUU40YlZXTEFUYUlTNjBKMkR1NXkxVGlKZ2pTQnZGVlpnVG13Q1UrZEFaRm9QeEdFRXM4bnlIQzlCd2UyR3ZFSnYyV1haYjB2amR5RlQ0Q3hrM2Uva0lxbE9Hb1ZMd3dQZXZwWUhUKzAwVCtoV3dYRGY0QUpBT1VxV2NEaGJ3QUFBQUFTVVZPUks1Q1lJST0pO2JhY2tncm91bmQtY29sb3I6IzMxNzA4Zjtjb2xvcjojZDllZGY3O2JvcmRlci1jb2xvcjojYmNlOGYxfS5qcS1pY29uLXdhcm5pbmd7YmFja2dyb3VuZC1pbWFnZTp1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCZ0FBQUFZQ0FZQUFBRGdkejM0QUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFBQUpjRWhaY3dBQURzTUFBQTdEQWNkdnFHUUFBQUdZU1VSQlZFaEw1WlN2VHNOUUZNYlhaR0lDTVlHWW1KaEFRSUpBSUNZUVBBQUNpU0RCOEFpSUNRUUpUNENxUUV3Z0p2WUFTQVFDaVppWW1KaEFJQkFUQ0FSSnkrOXJUc2xkZDhzS3UxTTArZExiMDU3djYvbGJxLzJySzBtUy9UUk5qOWNXTkFLUFlJSklJN2dJeENjUTUxY3ZxSUQrR0lFWDhBU0c0QjFiSzVnSVpGZVFmb0pkRVhPZmdYNFFBUWc3a0gyQTY1eVE4N2x5eGIyN3NnZ2tBekF1RmhiYmcxSzJrZ0NrQjFiVnd5SVI5bTJMN1BSUEloRFVJWGdHdHlLdzU3NXl6M2xUTnM2WDRKWG5qVitMS00vbTNNeWRuVGJ0T0tJanR6NlZoQ0JxNHZTbTNuY2RyRDJsazBWZ1VYU1ZLalZESlhKemlqVzFSUWRzVTdGNzdIZTh1Njhrb05aVHo4T3o1eUdhNkozSDNsWjB4WWdYQksyUXltbFdXQStSV25ZaHNrTEJ2MnZtRStoQk1DdGJBN0tYNWRyV3lSVC8ySnNxWjJJdmZCOVk0YldETk1GYkpSRm1DOUU3NFNvUzBDcXVsd2prQzArNWJwY1YxQ1o4Tk1lajRwankwVStkb0RRc0d5bzFoelZKdHRJamhRN0duQnRSRk4xVWFyVWxIOEYzeGljdCtIWTA3ckV6b1VHUGxXY2pSRlJyNC9nQ2haZ2MzWkwyZDhvQUFBQUFTVVZPUks1Q1lJST0pO2JhY2tncm91bmQtY29sb3I6IzhhNmQzYjtjb2xvcjojZmNmOGUzO2JvcmRlci1jb2xvcjojZmFlYmNjfS5qcS1pY29uLWVycm9ye2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQmdBQUFBWUNBWUFBQURnZHozNEFBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQUFKY0VoWmN3QUFEc01BQUE3REFjZHZxR1FBQUFIT1NVUkJWRWhMclphL1NnTkJFTVp6aDBXS0NDbFNDS2FJWU9FRCtBQUtlUVFMRzhIV3p0TENJbUJyWWFkZ0lkWStnSUtOWWtCRlN3dTdDQW9xQ2dra29HQkkvRTI4UGRiTFptZURMZ3paemN4ODMveloyU1NYQzFqOWZyK0kxSHE5M2cyeXhINGl3TTF2a29CV0FkeENtcHpUeGZrTjJSY3laTmFIRklrU28xMCs4a2d4a1hJVVJWNUhHeFRtRnVjNzVCMlJmUWtweEhHOGFBZ2FBRmEwdEFIcVlGZlE3SXdlMnloT0RrOCtKNEM3eUFvUlRXSTN3LzRrbEdSZ1I0bE83UnBuOStndk15V3ArdXhGaDgrSCtBUmxnTjFuSnVKdVFBWXZOa0Vud0dGY2sxOEVyNHEzZWdFYy9vTyttaExkS2dSeWhkTkZpYWNDMHJsT0NiaE5WejRIOUZuQVlnREJ2VTNRSWlvWmxKRkxKdHNvSFlSRGZpWm9VeUl4cUN0UnBWbEFOcTBFVTRkQXBqcnRnZXpQRmFkNVMxOVdnamtjMGhOVm51RjRIalZBNkM3UXJTSWJ5bEIrb1plM2FIZ0JzcWxOcUtZSDQ4alh5SktNdUFiaXlWSjhLemFCM2VSYzBwZzlWd1E0bmlGcnlJNjhxaU9pM0Fiandkc2ZuQXRrMGJDalRMSktyNm1yRDlnOGlxL1MvQjgxaGd1T01sUVRuVnlHNDB3QWNqbm1nc0NORVNEcmptZTd3ZmZ0UDRQN1NQNE4zQ0paZHZ6b055R3EyYy9IV09YSkdzdlZnK1JBL2syTUMvd042STJZQTJQdDhHa0FBQUFBU1VWT1JLNUNZSUk9KTtiYWNrZ3JvdW5kLWNvbG9yOiNhOTQ0NDI7Y29sb3I6I2YyZGVkZTtib3JkZXItY29sb3I6I2ViY2NkMX0uanEtaWNvbi1zdWNjZXNze2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQmdBQUFBWUNBWUFBQURnZHozNEFBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQUFKY0VoWmN3QUFEc01BQUE3REFjZHZxR1FBQUFEc1NVUkJWRWhMWTJBWUJmUU1nZi8vLzNQOCsvZXZBSWd2QS9Gc0lGK0JhdllERFdNQkdyb2FTTU1CaUU4VkM3QVpEcklGYU1GbmlpM0FaVGpVZ3NVVVdVREE4T2RBSDZpUWJRRWh3NEh5R3NQRWNLQlhCSUM0QVJoZXg0RzRCc2ptd2VVMXNvSUZhR2cvV3RvRlpSSVpkRXZJTWh4a0NDalhJVnNBVFY2Z0ZHQUNzNFJzdzBFR2dJSUgzUUpZSmdIU0FSUVpEcldBQitqYXd6Z3MrUTJVTzQ5RDdqblJTUkdvRUZSSUxjZG1FTVdHSTBjbTBKSjJRcFlBMVJEdmNtekpFV2hBQmhEL3BxckwwUzBDV3VBQktnblJraTlsTHNlUzdnMkFscXdIV1FTS0g0b0tMcklMcFJHaEVRQ3cyTGlSVUlhNGx3QUFBQUJKUlU1RXJrSmdnZz09KTtjb2xvcjojZGZmMGQ4O2JhY2tncm91bmQtY29sb3I6IzNjNzYzZDtib3JkZXItY29sb3I6I2Q2ZTljNn08L3N0eWxlPmApO1xuXG5zd2FsKHtcbiAgICB0aXRsZTogXCJUcmFwQm90cyBFeHRlbnNpb24gaXMgYWN0aXZhdGVkXCIsXG4gICAgdGV4dDogXCJFbmpveSB5b3VyIGJvdHNcIixcbiAgICBpY29uOiBcInN1Y2Nlc3NcIixcbiAgICBidXR0b246IFwiT2tcIixcbn0pO1xuXG4kLnRvYXN0KHtcbiAgICBoZWFkaW5nOiAnSW5mb3JtYXRpb24nLFxuICAgIHRleHQ6ICdCb3RzIGF1dGhvcjogTXJUcmFwJyxcbiAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgc2hvd0hpZGVUcmFuc2l0aW9uIDogJ3NsaWRlJyxcbiAgICBsb2FkZXI6IHRydWUsICAgICAgICAvLyBDaGFuZ2UgaXQgdG8gZmFsc2UgdG8gZGlzYWJsZSBsb2FkZXJcbiAgICBsb2FkZXJCZzogJyM5RUM2MDAnICAvLyBUbyBjaGFuZ2UgdGhlIGJhY2tncm91bmRcbn0pO1xuXG5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsZXQgc2VydmVyX2lwID0gbnVsbDtcblxuICAgIHdpbmRvdy5ib3RzID0ge1xuICAgICAgICBwbGF5ZXI6IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgYnl0ZUxlbmd0aDogMFxuICAgICAgICB9LFxuICAgICAgICBpcDogbnVsbCxcbiAgICAgICAgb3JpZ2luOiBsb2NhdGlvbi5vcmlnaW4sXG4gICAgICAgIGludGVydmFsOiAwXG4gICAgfTtcblxuICAgIFdlYlNvY2tldC5wcm90b3R5cGUuX3NlbmQgPSBXZWJTb2NrZXQucHJvdG90eXBlLnNlbmQ7XG4gICAgV2ViU29ja2V0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oYSkge1xuICAgICAgICB0aGlzLl9zZW5kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBtc2c7XG4gICAgICAgIHN3aXRjaChvcmlnaW4pIHtcbiAgICAgICAgICAgIGNhc2UgXCJodHRwOi8vbmJrLmlvXCI6XG4gICAgICAgICAgICAgICAgbXNnID0gbmV3IERhdGFWaWV3KGEuYnVmZmVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJodHRwOi8vZmFuaXguaW9cIjpcbiAgICAgICAgICAgICAgICBtc2cgPSBuZXcgRGF0YVZpZXcoYS5idWZmZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBtc2cgPSAgbmV3IERhdGFWaWV3KGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtc2cuZ2V0SW50OCgwLCB0cnVlKSAhPT0gMTYgfHwgbXNnLmdldFVpbnQ4KDAsIHRydWUpICE9PSAxNikgcmV0dXJuO1xuICAgICAgICBzd2l0Y2ggKG1zZy5ieXRlTGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDIxOlxuICAgICAgICAgICAgICAgIGJvdHMucGxheWVyLnggPSBtc2cuZ2V0RmxvYXQ2NCgxLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBib3RzLnBsYXllci55ID0gbXNnLmdldEZsb2F0NjQoOSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgIGJvdHMucGxheWVyLnggPSBtc2cuZ2V0SW50MzIoMSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgYm90cy5wbGF5ZXIueSA9IG1zZy5nZXRJbnQzMig1LCB0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vYnl0ZUxlbmd0aCA1IDQgb3IgOVxuICAgICAgICAgICAgICAgIGJvdHMucGxheWVyLnggPSBtc2cuZ2V0SW50MTYoMSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgYm90cy5wbGF5ZXIueSA9IG1zZy5nZXRJbnQxNig1LCB0cnVlKTsvL29yIDNcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVybC5tYXRjaCgnbG9jYWxob3N0JykgfHwgdGhpcy51cmwubWF0Y2goJzEyNy4wLjAuMScpKSByZXR1cm47XG4gICAgICAgIGJvdHMucGxheWVyLmJ5dGVMZW5ndGggPSBtc2cuYnl0ZUxlbmd0aDtcbiAgICAgICAgYm90cy5pcCA9IHRoaXMudXJsO1xuICAgICAgICBzb2NrZXQuZW1pdCgnbW92ZW1lbnQnLCB7XG4gICAgICAgICAgICB4OiBib3RzLnBsYXllci54LFxuICAgICAgICAgICAgeTogYm90cy5wbGF5ZXIueSxcbiAgICAgICAgICAgIHo6IGJvdHMucGxheWVyLmJ5dGVMZW5ndGhcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcbiAgICAgICAgaWYoZS5rZXkgPT09IFwiZVwiKSBzb2NrZXQuZW1pdCgnc3BsaXQnKTtcbiAgICAgICAgaWYoZS5rZXkgPT09IFwiclwiKSBzb2NrZXQuZW1pdCgnZWplY3QnKTtcbiAgICAgICAgaWYoZS5rZXkgPT09IFwicFwiKSBzb2NrZXQuZW1pdCgnYWlfdHJ1ZScpO1xuICAgICAgICBpZihlLmtleSA9PT0gXCJvXCIpIHNvY2tldC5lbWl0KCdhaV9mYWxzZScpO1xuICAgICAgICBpZihlLmtleSA9PT0gXCJjXCIpIHtcbiAgICAgICAgICAgIHZhciBtc2cgPSBwcm9tcHQoJ1BsZWFzZSBwdXQgdGhlIG1zZyB5b3Ugd2FudCB0byBzcGFtLicsICcnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgICAgICBzb2NrZXQuZW1pdCgnc3BhbScsIHtcbiAgICAgICAgICAgICAgICBtc2c6IG1zZ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHNvY2tldC5vbignYm90Q291bnQnLCAoY291bnQsIHNwYXduZWQsIG1heENvdW50KSA9PiB7XG4gICAgICAgICQoJyNtaW5pb25Db3VudCcpLmh0bWwoYCR7Y291bnR9LyR7c3Bhd25lZH0vJHttYXhDb3VudH1gKTtcbiAgICB9KTtcblxuICAgIHZhciBodG1sID0gYGA7XG4gICAgaHRtbCArPSBgPHN0eWxlPi5mcHMxIHt6LWluZGV4Ojk5OTk5OTk7IGRpc3BsYXk6IGlubGluZS1ibG9jaztiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO3BhZGRpbmc6IDZweCAxMnB4O21hcmdpbi1ib3R0b206IDA7Zm9udC1zaXplOiAxNXB4O2ZvbnQtd2VpZ2h0OiAzMDA7dGV4dC1hbGlnbjogY2VudGVyO3doaXRlLXNwYWNlOiBub3dyYXA7dmVydGljYWwtYWxpZ246IG1pZGRsZTstbXMtdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247dG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247Y3Vyc29yOiBwb2ludGVyOy13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7LW1vei11c2VyLXNlbGVjdDogbm9uZTstbXMtdXNlci1zZWxlY3Q6IG5vbmU7dXNlci1zZWxlY3Q6IG5vbmU7IGJvcmRlcjogMnB4IHNvbGlkICMwMDAwMDA7IGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtib3gtc2hhZG93OiAwIDFweCA2cHggMCByZ2JhKDAsIDAsIDAsIDAuMTIpLCAwIDFweCA2cHggMCByZ2JhKDAsIDAsIDAsIDAuMTIpOyBsZWZ0OiAyMHB4O3RyYW5zaXRpb246YWxsIDAuM3MgZWFzZTtsaW5lLWhlaWdodDogMS40Mjg1NzE0Mzt9LmZwczE6aG92ZXIge2Rpc3BsYXk6IGlubGluZS1ibG9jaztwYWRkaW5nOiA2cHggMTJweDtiYWNrZ3JvdW5kLWNvbG9yOiAjM0Y1MUI1O21hcmdpbi1ib3R0b206IDA7Y29sb3I6ICNmZmY7Zm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZTogMTVweDtmb250LXdlaWdodDogMzAwO3RleHQtYWxpZ246IGNlbnRlcjt3aGl0ZS1zcGFjZTogbm93cmFwO3ZlcnRpY2FsLWFsaWduOiBtaWRkbGU7LW1zLXRvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO3RvdWNoLWFjdGlvbjogbWFuaXB1bGF0aW9uO2N1cnNvcjogcG9pbnRlcjstd2Via2l0LXVzZXItc2VsZWN0OiBub25lOy1tb3otdXNlci1zZWxlY3Q6IG5vbmU7LW1zLXVzZXItc2VsZWN0OiBub25lO3VzZXItc2VsZWN0OiBub25lO2JvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yYWRpdXM6IDI1cHg7Ym94LXNoYWRvdzogMCAxcHggNnB4IDAgcmdiYSgwLCAwLCAwLCAwLjQyKSwgMCAxcHggNnB4IDAgcmdiYSgwLCAwLCAwLCAwLjQyKTsgbGVmdDogMjBweDtsZWZ0OiAxMjAlO3RyYW5zaXRpb246IGFsbCA1NTBtcyBjdWJpYy1iZXppZXIoMC4xOSwgMSwgMC4yMiwgMSk7fTwvc3R5bGU+YDtcbiAgICBodG1sICs9IGA8ZGl2IGlkPSdidXR0b24xJyBjbGFzcz1cImZwczFcIiBzdHlsZT1cImNvbG9yOiBibGFjaztwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogNzBweDsgbGVmdDogMTBweDsgZm9udC1mYW1pbHk6ICdQYWNpZmljbycsIGN1cnNpdmU7XCI+SGlkZSBJbmZvPC9kaXY+YDtcbiAgICBodG1sICs9IGA8ZGl2IGlkPSdidXR0b24yJyBjbGFzcz1cImZwczFcIiBzdHlsZT1cImNvbG9yOiBibGFjaztwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMTUwcHg7IGxlZnQ6IDEwcHg7IGZvbnQtZmFtaWx5OiAnUGFjaWZpY28nLCBjdXJzaXZlOyBcIj5TaG93IEluZm88L2Rpdj5gO1xuICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJmcHMxXCIgc3R5bGU9XCJjb2xvcjogYmxhY2s7cG9zaXRpb246IGFic29sdXRlOyB0b3A6IDExMHB4OyBsZWZ0OiAxMHB4OyBmb250LWZhbWlseTogJ1BhY2lmaWNvJywgY3Vyc2l2ZTsgXCI+RlBTIDogPHNwYW4gaWQ9XCJmcHNcIj4wPC9zcGFuPjwvZGl2PmA7XG4gICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cImZwczFcIiBzdHlsZT1cImNvbG9yOiBibGFjaztwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMTkwcHg7IGxlZnQ6IDEwcHg7ICBmb250LWZhbWlseTogJ1BhY2lmaWNvJywgY3Vyc2l2ZTsgXCI+U3RhdHVzPC9iPjogPHNwYW4gaWQ9XCJzdGF0dXNcIiBjbGFzcz1cImxhYmVsIGxhYmVsLWRlZmF1bHQgcHVsbC1yaWdodFwiPkNvbm5lY3RpbmcuLjwvc3Bhbj48L2Rpdj48YnI+YDtcbiAgICBodG1sICs9IGA8c3BhbiBpZD1cImJvdHNcIiBjbGFzcz1cImZwczFcIiBzdHlsZT1cImNvbG9yOiBibGFjaztwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMjMwcHg7IGxlZnQ6IDEwcHg7IGZvbnQtZmFtaWx5OiAnUGFjaWZpY28nLCBjdXJzaXZlO1wiPiBCb3RzOiA8ZGl2IHN0eWxlPVwiY29sb3I6IGJsYWNrO1wiIGlkPVwibWluaW9uQ291bnRcIj5XYWl0aW5nLi4uPC9kaXY+PC9zcGFuPmA7XG4gICAgaHRtbCArPSBgPHNwYW4gaWQ9XCJwYW5lbFwiIGNsYXNzPVwiZnBzMVwiIHN0eWxlPVwiY29sb3I6IGJsYWNrO3Bvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAzMDBweDsgbGVmdDogMTBweDsgZm9udC1mYW1pbHk6ICdQYWNpZmljbycsIGN1cnNpdmU7XCI+IEluZm86IDxicj5FIC0gU3BsaXRCb3RzPGJyPlIgLSBFamVjdEJvdHM8YnI+QyAtIENoYXRTcGFtPGJyPlAgLSBQZWxsZXQgT248YnI+TyAtIFBlbGxldCBPZmY8L3NwYW4+YDtcbiAgICAkKCdib2R5JykuYXBwZW5kKGh0bWwpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbjEnKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAkKCcjcGFuZWwnKS5mYWRlT3V0KCk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b24yJykub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgJCgnI3BhbmVsJykuZmFkZUluKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5jb3VudEZQUyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxhc3RMb29wID0gKG5ldyBEYXRlKCkpLmdldE1pbGxpc2Vjb25kcygpO1xuICAgICAgICB2YXIgY291bnQgPSAxO1xuICAgICAgICB2YXIgZnBzID0gMDtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudExvb3AgPSAobmV3IERhdGUoKSkuZ2V0TWlsbGlzZWNvbmRzKCk7XG4gICAgICAgICAgICBpZiAobGFzdExvb3AgPiBjdXJyZW50TG9vcCkge1xuICAgICAgICAgICAgICAgIGZwcyA9IGNvdW50O1xuICAgICAgICAgICAgICAgIGNvdW50ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RMb29wID0gY3VycmVudExvb3A7XG4gICAgICAgICAgICByZXR1cm4gZnBzO1xuICAgICAgICB9O1xuICAgIH0oKSk7XG5cbiAgICAoZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgICQoJyNmcHMnKS5odG1sKGNvdW50RlBTKCkpO1xuICAgICAgICAgICAgbG9vcCgpO1xuICAgICAgICB9KTtcbiAgICB9KCkpO1xuXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBzd2l0Y2goc29ja2V0LmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICAgICQoXCIjc3RhdHVzXCIpLmh0bWwoXCJDb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgJChcIiNzdGF0dXNcIikuYWRkQ2xhc3MoXCJsYWJlbC1zdWNjZXNzXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAkKFwiI3N0YXR1c1wiKS5odG1sKFwiV2FpdGluZy4uLlwiKTtcbiAgICAgICAgICAgICAgICAkKFwiI3N0YXR1c1wiKS5yZW1vdmVDbGFzcyhcImxhYmVsLXN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHRyYW5zbWl0X2dhbWVfc2VydmVyKCkge1xuICAgICAgICBzZXJ2ZXJfaXAgPSBib3RzLmlwO1xuICAgICAgICBpZihib3RzLmludGVydmFsKSBjbGVhckludGVydmFsKGJvdHMuaW50ZXJ2YWwpO1xuICAgICAgICBpZihzZXJ2ZXJfaXAgJiYgYm90cy5pcCAhPT0gdm9pZCgwKSB8fCBudWxsKSB7XG4gICAgICAgICAgICBzb2NrZXQuZW1pdCgnc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgaXA6IHNlcnZlcl9pcCxcbiAgICAgICAgICAgICAgICBvcmlnaW46IGJvdHMub3JpZ2luXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbWl0X2dhbWVfc2VydmVyX2lmX2NoYW5nZWQoKSB7XG4gICAgICAgIGlmIChzZXJ2ZXJfaXAgIT0gYm90cy5pcCkge1xuICAgICAgICAgICAgc2VydmVyX2lwID0gYm90cy5pcDtcbiAgICAgICAgICAgIGlmKGJvdHMuaW50ZXJ2YWwpIGNsZWFySW50ZXJ2YWwoYm90cy5pbnRlcnZhbCk7XG4gICAgICAgICAgICBzb2NrZXQuZW1pdCgnc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgaXA6IHNlcnZlcl9pcCxcbiAgICAgICAgICAgICAgICBvcmlnaW46IGJvdHMub3JpZ2luXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYW5zbWl0X2dhbWVfc2VydmVyKCk7XG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRyYW5zbWl0X2dhbWVfc2VydmVyX2lmX2NoYW5nZWQoKTtcbiAgICB9LCAyMDApO1xufSwgMjUwMCk7Il19