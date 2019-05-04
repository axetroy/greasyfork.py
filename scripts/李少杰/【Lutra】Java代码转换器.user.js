// ==UserScript==
// @name         【Lutra】Java代码转换器
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        http://lutra.sankuai.com/*
// @grant        none
// ==/UserScript==

(function() {

    const javaPrimTypes = {
        'string': 'String'
    };

    function toCamelCase(name) {
        const segs = name.split('_');
        if (segs.length === 1) return name;
        return segs.reduce(((previousValue, currentValue) => previousValue + currentValue.substr(0, 1).toUpperCase() + currentValue.substr(1)));
    }

    function generateJavaField(field, modelDict, pendingClass) {
        let result = '';
        if (field.desc) {
            result +=
                `    /**
     * ${field.desc}
     */
`;
        }
        let typeName = field.type;
        if (modelDict[typeName]) {
            typeName = modelDict[typeName].name;
            pendingClass.push(field.type);
        } else if (javaPrimTypes[typeName]) {
            typeName = javaPrimTypes[typeName];
        }
        result +=
            `    @SerializedName("${field.name}")
    public ${typeName} ${toCamelCase(field.name)};

`;
        return result;
    }

    function generateJavaClass(typeName, modelDict) {
        const typeModel = modelDict[typeName];
        let pendingClass = [];
        let result =
            `class ${typeModel.name} {
`;
        for (const f in typeModel.fields) {
            if (typeModel.fields.hasOwnProperty(f)) {
                result += generateJavaField(typeModel.fields[f], modelDict, pendingClass);
            }
        }
        result +=
            `}
`;
        pendingClass.forEach(c => {
            result += generateJavaClass(c, modelDict);
        });
        return result;
    }

    function findApi(data, path) {
        for (const key in data.api) {
            if (data.api.hasOwnProperty(key)) {
                const apiModel = data.api[key];
                if (apiModel.path instanceof Array && apiModel.path.find(p => path.indexOf(p) === 0)) {
                    for (const apiKey in apiModel.apis) {
                        if (apiModel.apis.hasOwnProperty(apiKey)) {
                            if (path.endsWith(apiKey)) {
                                return apiModel.apis[apiKey];
                            }
                        }
                    }
                }
            }
        }
    }

    function findReturnBlock() {
        document.querySelectorAll('.dataBlock').forEach(el => {
            if (el.title == '返回') {
                if (!el.isJava) {
                    const btn = document.createElement('button');
                    el.isJava = true;
                    btn.textContent = '生成Java Model';
                    btn.style.fontSize = '120%';
                    btn.addEventListener('click', async () => {
                        const query = new URLSearchParams(location.search);
                        let path;
                        if (query.get('branchId') == 'all') {
                            path = "/" + window.pid + "/result";
                        } else {
                            path = "/" + window.pid + "/api/branchData/" + query.get('branchId');
                        }
                        let data = await (await fetch(path)).json();
                        const current = query.get('anchor');
                        let api = findApi(data, current);
                        if (api) {
                            el.removeChild(btn);
                            el.firstChild.style.flex = 1;
                            el.style.display = 'flex';
                            el.innerHTML += '<pre style="flex:1; overflow-x:scroll;">' + generateJavaClass(api.returnType.wrapperData.data.type, data.model) + '</pre>';
                        } else {
                            console.warn('api not found');
                        }
                    });
                    el.insertBefore(btn, el.firstChild);
                }
            }
        });
    }

    setInterval(findReturnBlock, 1000);
    findReturnBlock();
})();