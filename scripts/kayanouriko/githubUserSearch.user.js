// ==UserScript==
// @name         githubUserSearch
// @namespace    https://github.com/kayanouriko
// @version      0.1
// @description  搜搜给星的G友活动
// @author       kayanouriko
// @include      https://github.com/*/stargazers
// @include      https://github.com/*/stargazers/you_know
// @grant        none
// @run-at document-end
// ==/UserScript==

(function addBtn() {
	var starUserNameArr = document.querySelectorAll('.follow-list-name span');
	for(var i = 0;i < starUserNameArr.length; i++) {
		var subAele = starUserNameArr[i].childNodes[0];
		var userName = subAele.textContent;
		var aEle = document.createElement("A");
		aEle.href = "/search?q=" + userName;
		aEle.innerHTML = "<img width='12px' height='12px' style='margin-left:5px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcBhIODQkalPejAAAA/klEQVQ4y5WT4VnEIAyGX7pAR8ANuA28Dc4N6iaOcCPgBr0R3KCPE1Qn6DkB/mhAQvCxJj8KH/mSryG4xI+5iTMPsnnjNX1iLYlzYS2b7JGxhfInmuDdN4IGXAJc5FkKfnDjDpx4EuTOOb0rSVxKtqkq7ZlluTSSRLspXgmtEzFZsDrek601IbaQIuR0PiOD9P1G3zKeb4eh9KJr6atFBv5pmXDqH7tgsZf2t3qNrbvkZTV3wkOeKX1x0cISvtnqJBjLwcq0zydBjaOuoHL95lEREgSWYxQ9BvUT2oh4K6zti+dxdzOxQvlDh6FcDxAUZT5EKJSF8SAhwZWZMfENVTebCODmECYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDktMTdUMTU6MTc6NTgrMDg6MDCxXVWUAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEyLTA2LTE4VDE0OjEzOjA5KzA4OjAwaz7z8wAAAE10RVh0c29mdHdhcmUASW1hZ2VNYWdpY2sgNy4wLjEtNiBRMTYgeDg2XzY0IDIwMTYtMDktMTcgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmfd2aVOAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAAyNNiMbIAAAAAWdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMjQgI6wNAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADEzMzk5OTk5ODm6TA0MAAAAEHRFWHRUaHVtYjo6U2l6ZQAzOTVCyZcEMgAAAF90RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC9zaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTA3MzUvMTA3MzUwMi5wbmezG0axAAAAAElFTkSuQmCC'>";
		starUserNameArr[i].appendChild(aEle);
	}
})();
