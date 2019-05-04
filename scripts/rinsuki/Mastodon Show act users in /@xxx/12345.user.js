// ==UserScript==
// @name         Mastodon Show act users in /@xxx/12345
// @namespace    https://rinsuki.net
// @version      0.1.1
// @description  Mastodonの投稿詳細画面でBT/favしたユーザー一覧を見れるようにする
// @author       rinsuki
// @match        https://*/@*/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/react/16.7.0/umd/react.production.min.js#sha256=2a9e6614914b203b2c94326ae9a17088c8c89c43d8bc6188bfdbc90b83950ca5
// @require      https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.7.0/umd/react-dom.production.min.js#sha256=c62c658243dff42ccf37f11452d1a01818c8e35d6ab3276bae00d32b066f237b
// ==/UserScript==
(function () {
    'use strict';
    // Mastodonかどうかを確かめる
    const regex = /^\/@[A-Za-z0-9_]+\/(\d+)/;
    const matchedUrl = regex.exec(location.pathname);
    if (matchedUrl == null)
        return; // URLがそれっぽくない
    if (location.pathname.includes("/embed"))
        return; // 埋め込みでは動かないようにする
    // これログインしてるとひっかかることに気づいたので無効化
    // if (document.querySelector('a[href="https://joinmastodon.org/#getting-started"]') == null) return // Mastodonっぽくなさそう
    if (document.querySelector('a[href^="/interact/"]') == null)
        return; // 新しいMastodonを使え
    const statusId = matchedUrl[1];
    const statusMetaDiv = document.querySelector(".detailed-status__meta");
    if (statusMetaDiv == null)
        return; // UIを出すところがないので帰る
    const boostButton = parent(document.querySelector('a[href^="/interact/"] > .fa-retweet'));
    const favButton = parent(document.querySelector('a[href^="/interact/"] > .detailed-status__favorites'));
    const isNicoru = favButton && favButton.querySelector(".fa-nicoru--status");
    class RootComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
            if (boostButton) {
                boostButton.addEventListener("click", e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.setState({
                        active: "reblog"
                    });
                });
            }
            if (favButton) {
                favButton.addEventListener("click", e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.setState({
                        active: "favourite"
                    });
                });
            }
        }
        render() {
            const { active } = this.state;
            if (active == null)
                return React.createElement("div", null,
                    React.createElement("i", { className: "fa fa-retweet" }),
                    " \u304B ",
                    isNicoru ? React.createElement("i", { className: "fa fa-nicoru--status" }) : React.createElement("i", { className: "fa fa-star" }),
                    " \u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u30D6\u30FC\u30B9\u30C8\u3057\u305F/\u3075\u3041\u307C\u3063\u305F\u30E6\u30FC\u30B6\u30FC\u304C\u8868\u793A\u3055\u308C\u307E\u3059");
            const [name, icon] = {
                "favourite": isNicoru ? ["ニコる", "nicoru"] : ["ふぁぼ", "star"],
                "reblog": ["ブースト", "retweet"]
            }[active];
            return React.createElement("div", { style: { margin: "15px -15px -15px" } },
                React.createElement("div", { style: {
                        backgroundColor: document.body.style.backgroundColor || "#17191f",
                        fontSize: 16,
                        padding: 15,
                        color: "white",
                    } },
                    React.createElement("i", { className: `fa fa-${icon}`, style: { marginRight: 5 } }),
                    name),
                React.createElement("div", null,
                    React.createElement(ListComponent, { type: active, key: active })));
        }
    }
    class ListComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: false,
                users: [],
            };
        }
        componentDidMount() {
            this.load();
        }
        render() {
            const { error, loading, users } = this.state;
            const centeringStyle = {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                padding: "30px 15px"
            };
            if (error) {
                return React.createElement("div", { style: centeringStyle },
                    React.createElement("span", { style: { color: "hsl(0, 100%, 60%)", whiteSpace: "pre-wrap" } }, error.stack));
            }
            else if (loading) {
                return React.createElement("div", { style: centeringStyle },
                    React.createElement("span", null, "Loading..."));
            }
            else {
                return React.createElement("div", null, users.map(user => React.createElement(UserComponent, { user: user, key: user.id })));
            }
        }
        async load() {
            this.setState({ loading: true });
            try {
                const res = await fetch(`/api/v1/statuses/${statusId}/${this.props.type === "favourite" ? "favourited_by" : "reblogged_by"}`);
                const text = await res.text();
                try {
                    const json = JSON.parse(text);
                    const error = json.error;
                    if (error)
                        throw new Error(`API: ${error}`);
                    this.setState({
                        loading: false,
                        error: undefined,
                        users: json
                    });
                }
                catch (e) {
                    throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
                }
            }
            catch (e) {
                this.setState({
                    loading: false,
                    error: e,
                });
            }
        }
    }
    class UserComponent extends React.Component {
        render() {
            const { user } = this.props;
            return React.createElement("div", { style: { backgroundColor: "#282c37", marginBottom: 1, display: "flex" } },
                React.createElement("a", { href: user.url, style: { padding: 10, display: "flex", textDecoration: "none" } },
                    React.createElement("img", { src: user.avatar_static, style: { width: 36, height: 36, paddingRight: 10 } }),
                    React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column" } },
                        React.createElement("bdi", { style: { flex: 1, color: "#ffffff" } }, user.display_name),
                        React.createElement("span", { style: { flex: 1, color: "#ffffff9f" } },
                            "@",
                            user.acct))));
        }
    }
    function parent(dom) {
        if (dom == null)
            return dom;
        return dom.parentElement;
    }
    // Reactをマウント
    const myDiv = document.createElement("div");
    const component = ReactDOM.render(React.createElement(RootComponent, null), myDiv);
    statusMetaDiv.appendChild(myDiv);
})();
