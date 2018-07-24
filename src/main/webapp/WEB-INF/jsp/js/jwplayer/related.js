!
function(e) {
    function t(a) {
        if (i[a]) return i[a].exports;
        var r = i[a] = {
            exports: {},
            id: a,
            loaded: !1
        };
        return e[a].call(r.exports, r, r.exports, t),
        r.loaded = !0,
        r.exports
    }
    var i = {};
    return t.m = e,
    t.c = i,
    t.p = "",
    t(0)
} ([function(e, t, i) {
    var a, r;
    a = [i(3), i(30), i(4), i(5), i(6), i(7), i(2), i(31), i(32), i(33), i(34)],
    r = function(e, t, i, a, r, n, o, l, s, p) {
        function d(e) {
            var t;
            return e ? "click" !== e.type && "tap" !== e.type || (t = "interaction") : t = "api",
            t
        }
        function c(e, t) {
            var i = null;
            return e && (e.indexOf("MEDIAID") >= 0 ? t && (i = e.replace("MEDIAID", t)) : i = e),
            i
        }
        function u(e, t) {
            var i = {},
            a = function(e) {
                return function() {
                    t.dispatch(e.apply(null, arguments))
                }
            };
            return f.each(f.keys(e),
            function(t) {
                i[t] = a(e[t])
            }),
            i
        }
        function h(e, t) {
            var i = {
                interactionMethod: !0
            };
            return f.every(f.keys(e),
            function(a) {
                return !! i[a] || e[a] === t[a]
            })
        }
        function w(e, t) {
            var i = {
                feed: c(e.recommendations, e.mediaid),
                recommendation: c(t.recommendations, e.mediaid),
                file: c(t.file, e.mediaid)
            };
            return i.isValid = i.feed || i.recommendation || i.file,
            i
        }
        var m, f, g = function(e, p, d) {
            m = e.utils,
            f = e._,
            f.extend(this, e.Events),
            this.player_ = e,
            this.config_ = p,
            this.localization_ = e.getConfig().localization,
            this.div_ = d,
            this.loader_ = new t(m, f),
            this.analyticsEvents_ = new a(p, f),
            this.autoplay_ = new r,
            this.playlistReducer_ = new l(m, f).reduce,
            this.relatedReducer_ = new s(m, f).reduce,
            this.store_ = new i(this.playlistReducer_),
            this.action_ = u(o, this.store_),
            this.view_ = new n(d, e, m, f, this.action_.resize),
            this.store_.subscribe(this.onStateChange.bind(this)),
            e.on("ready", this.ready, this),
            e.on("playlist", this.onPlaylist, this),
            e.on("playlistItem", this.onPlaylistItem, this),
            e.on("beforePlay", this.close, this),
            e.on("resize", this.view_.resize, this.view_),
            m.toggleClass(this.div_, "jw-plugin-related", !0)
        };
        g.prototype.open = function(e) {
            var t = d(e) || "complete";
            this.action_.open(e, t, this.player_.getState())
        },
        g.prototype.close = function(e) {
            var t = d(e) || "play";
            this.action_.close(e, t, this.player_.getState())
        },
        g.prototype.nextUp = function() {
            return this.store_.getState().nextUp
        },
        g.prototype.next = function() {
            var e = this.nextUp();
            e && this.playItem(e)
        },
        g.prototype.playItem = function(e, t) {
            this.action_.selectItem(e, t || "manual"),
            this.autoplay_.clear();
            var i = this.store_.getState();
            if ("related" === i.type) if ("link" === i.onClick) window.top.location = e.link,
            this.close({
                type: "play"
            });
            else {
                this.player_.load(e);
                var a = "auto" === i.interactionMethod ? "related-auto": "related-interaction";
                this.player_.play(!0, {
                    reason: a
                })
            } else this.player_.playlistItem(e.index)
        },
        g.prototype.ready = function() {
            this.setupPlaylist(),
            setTimeout(function() {
                this.triggerAnalyticsEvent("setup", {
                    onClick: this.config_.onclick
                })
            }.bind(this), 0)
        },
        g.prototype.setupRelated = function(e) {
            this.player_.off("playlistComplete", this.open, this),
            "hide" !== this.config_.oncomplete && this.config_.oncomplete !== !1 && this.player_.getConfig().repeat !== !0 && this.player_.on("playlistComplete", this.open, this),
            this.action_.setupRelated("autoplay" === this.config_.oncomplete, this.config_.autoplaymessage, this.config_.autoplaytimer, this.localization_.nextUp, this.config_.onclick, this.player_.getState(), e, this.config_.showDockButton)
        },
        g.prototype.setupPlaylist = function() {
            this.action_.setupPlaylist(this.localization_.nextUp, this.config_.showDockButton)
        },
        g.prototype.onPlaylistItem = function(e) {
            var t = this.player_.getPlaylist(),
            i = this.store_.getReducer();
            if (e.index === t.length - 1) {
                var a = w(e.item, this.config_); ! this.config_.disableRelated && a.isValid ? (i !== this.relatedReducer_ && (this.loader_.clearCache(), this.store_.replaceReducer(this.relatedReducer_), this.setupRelated(t)), this.action_.loading(), this.loadRelatedPlaylist(a)) : i === this.relatedReducer_ ? (this.action_.loading(), this.action_.cached()) : t.length > 1 && this.action_.resetPagePosition()
            } else {
                i !== this.playlistReducer_ && (this.store_.replaceReducer(this.playlistReducer_), this.setupPlaylist(t), this.action_.loaded(t));
                var r = e.item;
                r.index = e.index,
                this.action_.selectItem(r)
            }
        },
        g.prototype.onPlaylist = function(e) {
            this.store_.getReducer() === this.playlistReducer_ && this.action_.loaded(e.playlist)
        },
        g.prototype.loadRelatedPlaylist = function(e) {
            var t = e.feed,
            i = e.recommendation,
            a = e.file,
            r = this.action_.loaded.bind(this),
            n = this.action_.loadFailed.bind(this),
            o = this.action_.cached.bind(this);
            t ? this.loader_.load(t, r, n, o) : i ? this.loader_.loadRecommendation(i, a, r, n, o) : a ? this.loader_.load(a, r, n, o) : n("No valid feed found")
        },
        g.prototype.onStateChange = function(e, t) {
            if (!h(e, t)) switch (this.view_.removeInterface(this.div_), this.view_.removeDockButton(this.player_), this.view_.toggleClasses(!1), e.type) {
            case "related":
                this.onRelatedStateChange(e, t);
                break;
            case "playlist":
                this.onPlaylistStateChange(e, t)
            }
        },
        g.prototype.onRelatedStateChange = function(e, t) {
            if (e.itemsLoaded && !t.itemsLoaded && this.triggerAnalyticsEvent("playlist", e), e.nextUp !== t.nextUp && this.trigger("nextUp", e.nextUp), e.error) this.autoplay_.clear();
            else if (e.selectedItem && e.selectedItem !== t.selectedItem) this.triggerAnalyticsEvent("play", e),
            this.triggerAnalyticsEvent("close", f.extend(e, {
                interactionMethod: "play"
            }));
            else if (e.open && e.itemsLoaded) {
                this.player_.pause(!0);
                var i = s.unplayedItems(e),
                a = e.nextUp,
                r = Math.max(f.indexOf(i, a, 0)),
                n = p(i, e.page, e.itemsPerPage, r);
                if (!a && !n.center.length) return void this.action_.resetPagePosition();
                var o = this.playItem.bind(this),
                l = a && e.autoplay && "complete" === e.interactionMethod;
                if (l && 0 === e.autoplayTimeout) return void o(a, "auto");
                if (this.view_.toggleClasses(!0), this.view_.renderInterface(n, e.page, a, this.localization_.nextUp, o, this.close.bind(this), this.action_.page.bind(this)), t.open) e.page !== t.page && this.autoplay_.clear();
                else {
                    if (l) {
                        var d = this.div_.querySelector(".jw-related-next-up-text"),
                        c = e.autoplayMessage.replace(/__title__/i, a.title),
                        u = function(e) {
                            d.innerHTML = c.replace(/xx/i, e)
                        };
                        this.autoplay_.start(a, e.autoplayTimeout, o, u),
                        setTimeout(function() {
                            this.view_.renderAutoplayAnimation(Math.max(0, e.autoplayTimeout - .25))
                        }.bind(this), 250)
                    }
                    this.triggerAnalyticsEvent("open", e)
                }
            } else ! e.open && t.open ? (this.autoplay_.clear(), e.showDockButton && this.view_.renderDockButton(this.open.bind(this), this.localization_.related), "paused" === this.player_.getState() && "playing" === e.stateWhenOpened && "link" !== e.onClick && this.player_.play(!0, {
                reason: "related-interaction"
            }), this.triggerAnalyticsEvent("close", e)) : e.showDockButton && !e.open && e.itemsLoaded && this.view_.renderDockButton(this.open.bind(this), this.localization_.related)
        },
        g.prototype.onPlaylistStateChange = function(e, t) {
            if (e.nextUp !== t.nextUp && this.trigger("nextUp", e.nextUp), !e.error) if (e.open) {
                this.player_.pause(!0);
                var i = e.nextUp,
                a = p(e.items, e.page, e.itemsPerPage, i.index),
                r = this.playItem.bind(this);
                this.view_.toggleClasses(!0),
                this.view_.renderInterface(a, e.page, i, this.localization_.nextUp, r, this.close.bind(this), this.action_.page.bind(this))
            } else e.showDockButton && this.view_.renderDockButton(this.open.bind(this), this.localization_.playlist),
            "paused" === this.player_.getState() && "playing" === e.stateWhenOpened && this.player_.play(!0, {
                reason: "interaction"
            })
        },
        g.prototype.triggerAnalyticsEvent = function(e, t) {
            this.trigger(e, this.analyticsEvents_.createEventData(e, t))
        },
        g.version = e.version;
        var j = window.jwplayerPluginJsonp || window.jwplayer().registerPlugin;
        j("related", e.minPlayerVersion, g)
    }.apply(t, a),
    !(void 0 !== r && (e.exports = r))
},
,
function(e, t, i) {
    var a, r;
    a = [],
    r = function() {
        var e = function() {
            return {
                type: "PLAYLIST_CACHED",
                payload: {}
            }
        },
        t = function(e, t, i) {
            return {
                type: "RELATED_CLOSED",
                payload: {
                    event: e,
                    method: t,
                    playerState: i
                }
            }
        },
        i = function(e, t, i) {
            return {
                type: "RELATED_OPENED",
                payload: {
                    event: e,
                    method: t,
                    playerState: i,
                    stateWhenOpened: i
                }
            }
        },
        a = function(e, t, i) {
            return {
                type: "PLAYLIST_LOADED",
                payload: {
                    items: e,
                    relatedFile: t,
                    recommendationParams: i
                }
            }
        },
        r = function(e) {
            return {
                type: "PLAYLIST_LOADED_FAILED",
                payload: {
                    errorMessage: e
                }
            }
        },
        n = function() {
            return {
                type: "PLAYLIST_LOADING"
            }
        },
        o = function(e) {
            return {
                type: "PAGED",
                payload: {
                    direction: e
                }
            }
        },
        l = function(e) {
            return {
                type: "RESIZED",
                payload: {
                    itemsPerPage: e
                }
            }
        },
        s = function() {
            return {
                type: "RESET_PAGE_POSITION",
                payload: {}
            }
        },
        p = function(e, t) {
            return {
                type: "ITEM_SELECTED",
                payload: {
                    selectedItem: e,
                    method: t
                }
            }
        },
        d = function(e, t, i, a, r, n, o, l) {
            return {
                type: "SETUP_RELATED",
                payload: {
                    playerState: n,
                    playlist: o,
                    heading: a,
                    onClick: r,
                    autoplay: e,
                    autoplayMessage: t,
                    autoplayTimeout: i,
                    showDockButton: l
                }
            }
        },
        c = function(e, t) {
            return {
                type: "SETUP_PLAYLIST",
                payload: {
                    heading: e,
                    showDockButton: t
                }
            }
        };
        return {
            cached: e,
            close: t,
            open: i,
            loaded: a,
            loadFailed: r,
            loading: n,
            page: o,
            resetPagePosition: s,
            resize: l,
            selectItem: p,
            setupPlaylist: c,
            setupRelated: d
        }
    }.apply(t, a),
    !(void 0 !== r && (e.exports = r))
},
function(e, t) {
    e.exports = {
        version: "2.0.0",
        minPlayerVersion: "7.0.0"
    }
},
function(e, t, i) {
    var a, r;
    a = [],
    r = function() {
        var e = function(e) {
            this.subscribers = [],
            this.reducer = e,
            this.state = e(void 0, {})
        };
        return e.prototype.dispatch = function(e) {
            setTimeout(function() {
                var t = this.state;
                this.state = this.reducer(this.state, e),
                this.subscribers.forEach(function(e) {
                    e(this.state, t)
                }.bind(this))
            }.bind(this), 0)
        },
        e.prototype.subscribe = function(e) {
            this.subscribers.push(e)
        },
        e.prototype.getState = function() {
            return this.state
        },
        e.prototype.getReducer = function() {
            return this.reducer
        },
        e.prototype.replaceReducer = function(e) {
            setTimeout(function() {
                this.reducer = e
            }.bind(this), 0),
            this.dispatch({
                type: "REDUCER_REPLACED"
            })
        },
        e
    }.apply(t, a),
    !(void 0 !== r && (e.exports = r))
},
function(e, t, i) {
    var a, r;
    a = [],
    r = function() {
        function e(e, t, i, a) {
            var r = a;
            return "auto" !== r && (r = "play" === i ? "manual": "link"),
            {
                item: e,
                feedid: e.feedid || "",
                autoplaytimer: t || -1,
                position: e.index,
                method: r
            }
        }
        function t(e) {
            return {
                playlist: e,
                feedid: a(e)
            }
        }
        function i(e, t, i, r) {
            var o = {
                visible: e,
                method: r
            };
            return e && (o.feed = i, o.items = t, o.autoplay = "autoplay" === n.oncomplete, o.feedid = a(t)),
            o
        }
        function a(e) {
            var t = "";
            return e && e.length && e[0].feedid && (t = e[0].feedid),
            t
        }
        function r() {
            return {}
        }
        var n, o, l = function(e, t) {
            n = e,
            o = t
        };
        return l.prototype.createEventData = function(a, n) {
            var l, s = n.interactionMethod;
            switch (a) {
            case "setup":
                l = r();
                break;
            case "play":
                l = e(n.selectedItem, n.autoplayTimeout, n.onClick, s);
                break;
            case "playlist":
                l = t(n.relatedItems, n.params);
                break;
            case "open":
                l = i(!0, n.relatedItems, n.relatedFile, s);
                break;
            case "close":
                l = i(!1, n.relatedItems, n.relatedFile, s);
                break;
            default:
                l = {}
            }
            return n.relatedFile && (l.relatedFile = n.relatedFile),
            n.recommendationParams && (l = o.extend(l, n.recommendationParams)),
            l.onclick = "play" === n.onClick ? "play": "link",
            l
        },
        l
    }.apply(t, a),
    !(void 0 !== r && (e.exports = r))
},
function(e, t, i) {
    var a, r;
    a = [],
    r = function() {
        var e = function() {
            this.timer = null,
            this.interval = null
        };
        return e.prototype.start = function(e, t, i, a) {
            this.timer = window.setTimeout(function() {
                this.clear(),
                i(e, "auto")
            }.bind(this), 1e3 * t);
            var r = t;
            this.interval = window.setInterval(function() {
                a(Math.max(0, r -= 1))
            },
            1e3),
            a(Math.max(0, t))
        },
        e.prototype.clear = function() {
            window.clearTimeout(this.timer),
            window.clearInterval(this.interval)
        },
        e
    }.apply(t, a),
    !(void 0 !== r && (e.exports = r))
},
function(e, t, i) {
    var a, r;
    a = [i(8), i(28), i(29)],
    r = function(e, t, i) {
        function a(e) {
            if (e) {
                var t = e.getBoundingClientRect(),
                i = 2 * t.height + 2 * t.width;
                e.style.strokeDasharray = i,
                e.style.strokeDashoffset = i
            }
        }
        function r(t, i) {
            var a = s.createElement(e(t));
            return a.setAttribute("aria-label", "Video - " + t.title || "Untitled Video"),
            new p(a).on("click tap",
            function() {
                i(t, "manual")
            },
            {
                directSelect: !0
            }),
            a
        }
        function n(e, i, a) {
            var r = s.createElement(t({
                upNext: e,
                nextUpHeading: i
            }));
            return r.setAttribute("aria-label", "Video - " + e.title || "Untitled Video"),
            new p(r).on("click tap",
            function() {
                a(e, "manual")
            },
            {
                directSelect: !0
            }),
            r
        }
        function o(e, t) {
            var i = document.createElement("button");
            return i.className = "jw-related-page-" + t,
            i.setAttribute("aria-label", "Page " + t),
            new p(i).on("click tap",
            function() {
                e(t)
            },
            {
                directSelect: !0
            }),
            i
        }
        function l(e) {
            var t = document.createElement("button");
            return t.className = "jw-related-close",
            t.setAttribute("aria-label", "Close"),
            new p(t).on("click tap",
            function() {
                e({
                    type: "click"
                })
            },
            {
                directSelect: !0
            }),
            t
        }
        var s, p, d, c = function(e, t, i, a, r) {
            this.div = e,
            this.player = t,
            this.resizeAction = r,
            s = i,
            p = s.UI,
            d = a
        };
        return c.prototype.renderInterface = function(e, t, i, a, s, p, c) {
            var u = e.center,
            h = document.createElement("div");
            h.className = "jw-related jw-overlay jw-overlay-open";
            var w = l(p);
            if (h.appendChild(w), e.left.length) {
                var m = o(c, "left");
                h.appendChild(m)
            }
            if (e.right.length) {
                var f = o(c, "right");
                h.appendChild(f)
            }
            var g = document.createElement("div");
            if (g.className = "jw-related-container", 0 === t && i) {
                var j = n(i, a, s);
                g.appendChild(j)
            }
            var v = document.createElement("div");
            v.className = "jw-related-item-group",
            d.forEach(u,
            function(e) {
                var t = r(e, s);
                v.appendChild(t)
            }),
            g.appendChild(v),
            h.appendChild(g),
            this.div.appendChild(h)
        },
        c.prototype.renderDockButton = function(e, t) {
            this.player.addButton(void 0, t, e, "related", "jw-related-dock-btn")
        },
        c.prototype.renderAutoplayAnimation = function(e) {
            var t = this.div.querySelector(".jw-related-item-content");
            if (t) {
                var r = s.createElement(i()),
                n = r.querySelector(".jw-related-autoplay-frame-progress");
                t.appendChild(r),
                a(n),
                n.style.animation = e + "s linear forwards jw-dash"
            }
        },
        c.prototype.removeInterface = function() {
            s.emptyElement(this.div)
        },
        c.prototype.removeDockButton = function() {
            this.player.removeButton("related")
        },
        c.prototype.toggleClasses = function(e) {
            s.toggleClass(this.div, "jw-plugin-related-open", e),
            s.toggleClass(this.player.getContainer(), "jw-flag-overlay-open-related", e)
        },
        c.prototype.resize = function() {
            var e, t, i = this.player.getContainer().className.match(/jw-breakpoint-\d+/);
            switch (i && (t = i[0]), t) {
            case "jw-breakpoint-7":
                e = 9;
                break;
            case "jw-breakpoint-6":
                e = 9;
                break;
            case "jw-breakpoint-5":
                e = 9;
                break;
            case "jw-breakpoint-4":
                e = 9;
                break;
            case "jw-breakpoint-3":
                e = 6;
                break;
            case "jw-breakpoint-2":
                e = 4;
                break;
            case "jw-breakpoint-1":
                e = 1;
                break;
            case "jw-breakpoint-0":
                e = 1;
                break;
            default:
                e = 1
            }
            a(this.div.querySelector(".jw-related-autoplay-frame-progress")),
            this.resizeAction(e)
        },
        c
    }.apply(t, a),
    !(void 0 !== r && (e.exports = r))
},
function(e, t, i) {
    var a = i(9);
    e.exports = (a["default"] || a).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, i, a, r) {
            var n = e.lambda,
            o = e.escapeExpression;
            return '<div class="jw-related-item">\n    <div class="jw-related-item-container">\n        <div class="jw-related-item-content jw-color-active-hover" role="button" tabindex="0">\n            <div class="jw-related-item-poster" style="">\n                <div class="jw-related-item-poster-content">\n                    <div class="jw-related-item-duration">\n                        ' + o(n(null != t ? t.duration: t, t)) + '\n                    </div>\n                </div>\n            </div>\n            <div class="jw-related-item-title">\n                <div class="jw-related-item-title-content">\n                    <span class="jw-item-index-text">' + o(n(null != t ? t.indexText: t, t)) + "<em>" + o(n(null != t ? t.title: t, t)) + "</em></span>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"
        },
        useData: !0
    })
},
function(e, t, i) {
    e.exports = i(10)["default"]
},
function(e, t, i) {
    "use strict";
    function a(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e,
        t
    }
    function n() {
        var e = new l.HandlebarsEnvironment;
        return h.extend(e, l),
        e.SafeString = p["default"],
        e.Exception = c["default"],
        e.Utils = h,
        e.escapeExpression = h.escapeExpression,
        e.VM = m,
        e.template = function(t) {
            return m.template(t, e)
        },
        e
    }
    t.__esModule = !0;
    var o = i(11),
    l = r(o),
    s = i(25),
    p = a(s),
    d = i(13),
    c = a(d),
    u = i(12),
    h = r(u),
    w = i(26),
    m = r(w),
    f = i(27),
    g = a(f),
    j = n();
    j.create = n,
    g["default"](j),
    j["default"] = j,
    t["default"] = j,
    e.exports = t["default"]
},
function(e, t, i) {
    "use strict";
    function a(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function r(e, t, i) {
        this.helpers = e || {},
        this.partials = t || {},
        this.decorators = i || {},
        s.registerDefaultHelpers(this),
        p.registerDefaultDecorators(this)
    }
    t.__esModule = !0,
    t.HandlebarsEnvironment = r;
    var n = i(12),
    o = i(13),
    l = a(o),
    s = i(14),
    p = i(22),
    d = i(24),
    c = a(d),
    u = "4.0.5";
    t.VERSION = u;
    var h = 7;
    t.COMPILER_REVISION = h;
    var w = {
        1 : "<= 1.0.rc.2",
        2 : "== 1.0.0-rc.3",
        3 : "== 1.0.0-rc.4",
        4 : "== 1.x.x",
        5 : "== 2.0.0-alpha.x",
        6 : ">= 2.0.0-beta.1",
        7 : ">= 4.0.0"
    };
    t.REVISION_CHANGES = w;
    var m = "[object Object]";
    r.prototype = {
        constructor: r,
        logger: c["default"],
        log: c["default"].log,
        registerHelper: function(e, t) {
            if (n.toString.call(e) === m) {
                if (t) throw new l["default"]("Arg not supported with multiple helpers");
                n.extend(this.helpers, e)
            } else this.helpers[e] = t
        },
        unregisterHelper: function(e) {
            delete this.helpers[e]
        },
        registerPartial: function(e, t) {
            if (n.toString.call(e) === m) n.extend(this.partials, e);
            else {
                if ("undefined" == typeof t) throw new l["default"]('Attempting to register a partial called "' + e + '" as undefined');
                this.partials[e] = t
            }
        },
        unregisterPartial: function(e) {
            delete this.partials[e]
        },
        registerDecorator: function(e, t) {
            if (n.toString.call(e) === m) {
                if (t) throw new l["default"]("Arg not supported with multiple decorators");
                n.extend(this.decorators, e)
            } else this.decorators[e] = t
        },
        unregisterDecorator: function(e) {
            delete this.decorators[e]
        }
    };
    var f = c["default"].log;
    t.log = f,
    t.createFrame = n.createFrame,
    t.logger = c["default"]
},
function(e, t) {
    "use strict";
    function i(e) {
        return d[e]
    }
    function a(e) {
        for (var t = 1; t < arguments.length; t++) for (var i in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], i) && (e[i] = arguments[t][i]);
        return e
    }
    function r(e, t) {
        for (var i = 0,
        a = e.length; i < a; i++) if (e[i] === t) return i;
        return - 1
    }
    function n(e) {
        if ("string" != typeof e) {
            if (e && e.toHTML) return e.toHTML();
            if (null == e) return "";
            if (!e) return e + "";
            e = "" + e
        }
        return u.test(e) ? e.replace(c, i) : e
    }
    function o(e) {
        return ! e && 0 !== e || !(!m(e) || 0 !== e.length)
    }
    function l(e) {
        var t = a({},
        e);
        return t._parent = e,
        t
    }
    function s(e, t) {
        return e.path = t,
        e
    }
    function p(e, t) {
        return (e ? e + ".": "") + t
    }
    t.__esModule = !0,
    t.extend = a,
    t.indexOf = r,
    t.escapeExpression = n,
    t.isEmpty = o,
    t.createFrame = l,
    t.blockParams = s,
    t.appendContextPath = p;
    var d = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;",
        "=": "&#x3D;"
    },
    c = /[&<>"'`=]/g,
    u = /[&<>"'`=]/,
    h = Object.prototype.toString;
    t.toString = h;
    var w = function(e) {
        return "function" == typeof e
    };
    w(/x/) && (t.isFunction = w = function(e) {
        return "function" == typeof e && "[object Function]" === h.call(e)
    }),
    t.isFunction = w;
    var m = Array.isArray ||
    function(e) {
        return ! (!e || "object" != typeof e) && "[object Array]" === h.call(e)
    };
    t.isArray = m
},
function(e, t) {
    "use strict";
    function i(e, t) {
        var r = t && t.loc,
        n = void 0,
        o = void 0;
        r && (n = r.start.line, o = r.start.column, e += " - " + n + ":" + o);
        for (var l = Error.prototype.constructor.call(this, e), s = 0; s < a.length; s++) this[a[s]] = l[a[s]];
        Error.captureStackTrace && Error.captureStackTrace(this, i),
        r && (this.lineNumber = n, this.column = o)
    }
    t.__esModule = !0;
    var a = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
    i.prototype = new Error,
    t["default"] = i,
    e.exports = t["default"]
},
function(e, t, i) {
    "use strict";
    function a(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function r(e) {
        o["default"](e),
        s["default"](e),
        d["default"](e),
        u["default"](e),
        w["default"](e),
        f["default"](e),
        j["default"](e)
    }
    t.__esModule = !0,
    t.registerDefaultHelpers = r;
    var n = i(15),
    o = a(n),
    l = i(16),
    s = a(l),
    p = i(17),
    d = a(p),
    c = i(18),
    u = a(c),
    h = i(19),
    w = a(h),
    m = i(20),
    f = a(m),
    g = i(21),
    j = a(g)
},
function(e, t, i) {
    "use strict";
    t.__esModule = !0;
    var a = i(12);
    t["default"] = function(e) {
        e.registerHelper("blockHelperMissing",
        function(t, i) {
            var r = i.inverse,
            n = i.fn;
            if (t === !0) return n(this);
            if (t === !1 || null == t) return r(this);
            if (a.isArray(t)) return t.length > 0 ? (i.ids && (i.ids = [i.name]), e.helpers.each(t, i)) : r(this);
            if (i.data && i.ids) {
                var o = a.createFrame(i.data);
                o.contextPath = a.appendContextPath(i.data.contextPath, i.name),
                i = {
                    data: o
                }
            }
            return n(t, i)
        })
    },
    e.exports = t["default"]
},
function(e, t, i) {
    "use strict";
    function a(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    t.__esModule = !0;
    var r = i(12),
    n = i(13),
    o = a(n);
    t["default"] = function(e) {
        e.registerHelper("each",
        function(e, t) {
            function i(t, i, n) {
                p && (p.key = t, p.index = i, p.first = 0 === i, p.last = !!n, d && (p.contextPath = d + t)),
                s += a(e[t], {
                    data: p,
                    blockParams: r.blockParams([e[t], t], [d + t, null])
                })
            }
            if (!t) throw new o["default"]("Must pass iterator to #each");
            var a = t.fn,
            n = t.inverse,
            l = 0,
            s = "",
            p = void 0,
            d = void 0;
            if (t.data && t.ids && (d = r.appendContextPath(t.data.contextPath, t.ids[0]) + "."), r.isFunction(e) && (e = e.call(this)), t.data && (p = r.createFrame(t.data)), e && "object" == typeof e) if (r.isArray(e)) for (var c = e.length; l < c; l++) l in e && i(l, l, l === e.length - 1);
            else {
                var u = void 0;
                for (var h in e) e.hasOwnProperty(h) && (void 0 !== u && i(u, l - 1), u = h, l++);
                void 0 !== u && i(u, l - 1, !0)
            }
            return 0 === l && (s = n(this)),
            s
        })
    },
    e.exports = t["default"]
},
function(e, t, i) {
    "use strict";
    function a(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    t.__esModule = !0;
    var r = i(13),
    n = a(r);
    t["default"] = function(e) {
        e.registerHelper("helperMissing",
        function() {
            if (1 !== arguments.length) throw new n["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"')
        })
    },
    e.exports = t["default"]
},
function(e, t, i) {
    "use strict";
    t.__esModule = !0;
    var a = i(12);
    t["default"] = function(e) {
        e.registerHelper("if",
        function(e, t) {
            return a.isFunction(e) && (e = e.call(this)),
            !t.hash.includeZero && !e || a.isEmpty(e) ? t.inverse(this) : t.fn(this)
        }),
        e.registerHelper("unless",
        function(t, i) {
            return e.helpers["if"].call(this, t, {
                fn: i.inverse,
                inverse: i.fn,
                hash: i.hash
            })
        })
    },
    e.exports = t["default"]
},
function(e, t) {
    "use strict";
    t.__esModule = !0,
    t["default"] = function(e) {
        e.registerHelper("log",
        function() {
            for (var t = [void 0], i = arguments[arguments.length - 1], a = 0; a < arguments.length - 1; a++) t.push(arguments[a]);
            var r = 1;
            null != i.hash.level ? r = i.hash.level: i.data && null != i.data.level && (r = i.data.level),
            t[0] = r,
            e.log.apply(e, t)
        })
    },
    e.exports = t["default"]
},
function(e, t) {
    "use strict";
    t.__esModule = !0,
    t["default"] = function(e) {
        e.registerHelper("lookup",
        function(e, t) {
            return e && e[t]
        })
    },
    e.exports = t["default"]
},
function(e, t, i) {
    "use strict";
    t.__esModule = !0;
    var a = i(12);
    t["default"] = function(e) {
        e.registerHelper("with",
        function(e, t) {
            a.isFunction(e) && (e = e.call(this));
            var i = t.fn;
            if (a.isEmpty(e)) return t.inverse(this);
            var r = t.data;
            return t.data && t.ids && (r = a.createFrame(t.data), r.contextPath = a.appendContextPath(t.data.contextPath, t.ids[0])),
            i(e, {
                data: r,
                blockParams: a.blockParams([e], [r && r.contextPath])
            })
        })
    },
    e.exports = t["default"]
},
function(e, t, i) {
    "use strict";
    function a(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function r(e) {
        o["default"](e)
    }
    t.__esModule = !0,
    t.registerDefaultDecorators = r;
    var n = i(23),
    o = a(n)
},
function(e, t, i) {
    "use strict";
    t.__esModule = !0;
    var a = i(12);
    t["default"] = function(e) {
        e.registerDecorator("inline",
        function(e, t, i, r) {
            var n = e;
            return t.partials || (t.partials = {},
            n = function(r, n) {
                var o = i.partials;
                i.partials = a.extend({},
                o, t.partials);
                var l = e(r, n);
                return i.partials = o,
                l
            }),
            t.partials[r.args[0]] = r.fn,
            n
        })
    },
    e.exports = t["default"]
},
function(e, t, i) {
    "use strict";
    t.__esModule = !0;
    var a = i(12),
    r = {
        methodMap: ["debug", "info", "warn", "error"],
        level: "info",
        lookupLevel: function(e) {
            if ("string" == typeof e) {
                var t = a.indexOf(r.methodMap, e.toLowerCase());
                e = t >= 0 ? t: parseInt(e, 10)
            }
            return e
        },
        log: function(e) {
            if (e = r.lookupLevel(e), "undefined" != typeof console && r.lookupLevel(r.level) <= e) {
                var t = r.methodMap[e];
                console[t] || (t = "log");
                for (var i = arguments.length,
                a = Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++) a[n - 1] = arguments[n];
                console[t].apply(console, a)
            }
        }
    };
    t["default"] = r,
    e.exports = t["default"]
},
function(e, t) {
    "use strict";
    function i(e) {
        this.string = e
    }
    t.__esModule = !0,
    i.prototype.toString = i.prototype.toHTML = function() {
        return "" + this.string
    },
    t["default"] = i,
    e.exports = t["default"]
},
function(e, t, i) {
    "use strict";
    function a(e) {
        return e && e.__esModule ? e: {
            "default": e
        }
    }
    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e,
        t
    }
    function n(e) {
        var t = e && e[0] || 1,
        i = g.COMPILER_REVISION;
        if (t !== i) {
            if (t < i) {
                var a = g.REVISION_CHANGES[i],
                r = g.REVISION_CHANGES[t];
                throw new f["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + a + ") or downgrade your runtime to an older version (" + r + ").")
            }
            throw new f["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + e[1] + ").")
        }
    }
    function o(e, t) {
        function i(i, a, r) {
            r.hash && (a = w.extend({},
            a, r.hash), r.ids && (r.ids[0] = !0)),
            i = t.VM.resolvePartial.call(this, i, a, r);
            var n = t.VM.invokePartial.call(this, i, a, r);
            if (null == n && t.compile && (r.partials[r.name] = t.compile(i, e.compilerOptions, t), n = r.partials[r.name](a, r)), null != n) {
                if (r.indent) {
                    for (var o = n.split("\n"), l = 0, s = o.length; l < s && (o[l] || l + 1 !== s); l++) o[l] = r.indent + o[l];
                    n = o.join("\n")
                }
                return n
            }
            throw new f["default"]("The partial " + r.name + " could not be compiled when running in runtime-only mode")
        }
        function a(t) {
            function i(t) {
                return "" + e.main(r, t, r.helpers, r.partials, o, s, l)
            }
            var n = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1],
            o = n.data;
            a._setup(n),
            !n.partial && e.useData && (o = c(t, o));
            var l = void 0,
            s = e.useBlockParams ? [] : void 0;
            return e.useDepths && (l = n.depths ? t !== n.depths[0] ? [t].concat(n.depths) : n.depths: [t]),
            (i = u(e.main, i, r, n.depths || [], o, s))(t, n)
        }
        if (!t) throw new f["default"]("No environment passed to template");
        if (!e || !e.main) throw new f["default"]("Unknown template object: " + typeof e);
        e.main.decorator = e.main_d,
        t.VM.checkRevision(e.compiler);
        var r = {
            strict: function(e, t) {
                if (! (t in e)) throw new f["default"]('"' + t + '" not defined in ' + e);
                return e[t]
            },
            lookup: function(e, t) {
                for (var i = e.length,
                a = 0; a < i; a++) if (e[a] && null != e[a][t]) return e[a][t]
            },
            lambda: function(e, t) {
                return "function" == typeof e ? e.call(t) : e
            },
            escapeExpression: w.escapeExpression,
            invokePartial: i,
            fn: function(t) {
                var i = e[t];
                return i.decorator = e[t + "_d"],
                i
            },
            programs: [],
            program: function(e, t, i, a, r) {
                var n = this.programs[e],
                o = this.fn(e);
                return t || r || a || i ? n = l(this, e, o, t, i, a, r) : n || (n = this.programs[e] = l(this, e, o)),
                n
            },
            data: function(e, t) {
                for (; e && t--;) e = e._parent;
                return e
            },
            merge: function(e, t) {
                var i = e || t;
                return e && t && e !== t && (i = w.extend({},
                t, e)),
                i
            },
            noop: t.VM.noop,
            compilerInfo: e.compiler
        };
        return a.isTop = !0,
        a._setup = function(i) {
            i.partial ? (r.helpers = i.helpers, r.partials = i.partials, r.decorators = i.decorators) : (r.helpers = r.merge(i.helpers, t.helpers), e.usePartial && (r.partials = r.merge(i.partials, t.partials)), (e.usePartial || e.useDecorators) && (r.decorators = r.merge(i.decorators, t.decorators)))
        },
        a._child = function(t, i, a, n) {
            if (e.useBlockParams && !a) throw new f["default"]("must pass block params");
            if (e.useDepths && !n) throw new f["default"]("must pass parent depths");
            return l(r, t, e[t], i, 0, a, n)
        },
        a
    }
    function l(e, t, i, a, r, n, o) {
        function l(t) {
            var r = arguments.length <= 1 || void 0 === arguments[1] ? {}: arguments[1],
            l = o;
            return o && t !== o[0] && (l = [t].concat(o)),
            i(e, t, e.helpers, e.partials, r.data || a, n && [r.blockParams].concat(n), l)
        }
        return l = u(i, l, e, o, a, n),
        l.program = t,
        l.depth = o ? o.length: 0,
        l.blockParams = r || 0,
        l
    }
    function s(e, t, i) {
        return e ? e.call || i.name || (i.name = e, e = i.partials[e]) : e = "@partial-block" === i.name ? i.data["partial-block"] : i.partials[i.name],
        e
    }
    function p(e, t, i) {
        i.partial = !0,
        i.ids && (i.data.contextPath = i.ids[0] || i.data.contextPath);
        var a = void 0;
        if (i.fn && i.fn !== d && (i.data = g.createFrame(i.data), a = i.data["partial-block"] = i.fn, a.partials && (i.partials = w.extend({},
        i.partials, a.partials))), void 0 === e && a && (e = a), void 0 === e) throw new f["default"]("The partial " + i.name + " could not be found");
        if (e instanceof Function) return e(t, i)
    }
    function d() {
        return ""
    }
    function c(e, t) {
        return t && "root" in t || (t = t ? g.createFrame(t) : {},
        t.root = e),
        t
    }
    function u(e, t, i, a, r, n) {
        if (e.decorator) {
            var o = {};
            t = e.decorator(t, o, i, a && a[0], r, n, a),
            w.extend(t, o)
        }
        return t
    }
    t.__esModule = !0,
    t.checkRevision = n,
    t.template = o,
    t.wrapProgram = l,
    t.resolvePartial = s,
    t.invokePartial = p,
    t.noop = d;
    var h = i(12),
    w = r(h),
    m = i(13),
    f = a(m),
    g = i(11)
},
function(e, t) { (function(i) {
        "use strict";
        t.__esModule = !0,
        t["default"] = function(e) {
            var t = "undefined" != typeof i ? i: window,
            a = t.Handlebars;
            e.noConflict = function() {
                return t.Handlebars === e && (t.Handlebars = a),
                e
            }
        },
        e.exports = t["default"]
    }).call(t,
    function() {
        return this
    } ())
},
function(e, t, i) {
    var a = i(9);
    e.exports = (a["default"] || a).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, i, a, r) {
            var n, o = e.lambda,
            l = e.escapeExpression;
            return '<div class="jw-related-item jw-related-item-next-up">\n    <div class="jw-related-item-container">\n        <div class="jw-related-item-content jw-color-active-hover" role="button" tabindex="0">\n            <div class="jw-related-item-content-container">\n                <div class="jw-related-item-poster" style="">\n                    <div class="jw-related-item-poster-content">\n                        <div class="jw-related-item-duration">' + l(o(null != (n = null != t ? t.upNext: t) ? n.duration: n, t)) + '</div>\n                        <div class="jw-related-item-play">\n                            <div class="jw-icon-display"></div>\n                        </div>\n                    </div>\n                </div>\n                <div class="jw-related-item-title">\n                    <div class="jw-related-item-title-content">\n                        <strong class="jw-related-next-up-text jw-color-active">' + l(o(null != t ? t.nextUpHeading: t, t)) + "</strong>\n                        <span>" + l(o(null != (n = null != t ? t.upNext: t) ? n.title: n, t)) + '</span>\n                    </div>\n                </div>\n                <div class="jw-related-item-description">\n                    <div class="jw-related-item-description-content">\n                        ' + l(o(null != (n = null != t ? t.upNext: t) ? n.description: n, t)) + '\n                    </div>\n                </div>\n            </div>\n            <div class="jw-related-item-countdown" id="countdown"></div>\n        </div>\n    </div>\n</div>'
        },
        useData: !0
    })
},
function(e, t, i) {
    var a = i(9);
    e.exports = (a["default"] || a).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, i, a, r) {
            return '<svg xmlns="" class="jw-related-autoplay-svg">\n    <rect class="jw-related-autoplay-frame" width="100%" height="100%"/>\n    <rect class="jw-related-autoplay-frame-progress jw-color-active jw-color-inactive-hover" width="100%" height="100%"/>\n</svg>'
        },
        useData: !0
    })
},
function(e, t, i) {
    var a, r;
    a = [],
    r = function() {
        function e(e) {
            var t = JSON.parse(e.responseText);
            return t.playlist || t
        }
        function t(t) {
            var a;
            try {
                a = t.responseXML && t.responseXML.firstChild ? i.rssparser.parse(t.responseXML.firstChild) : e(t)
            } catch(r) {
                a = null
            }
            return a
        }
        var i, a = function(e) {
            i = e,
            this.currentRequest = null
        };
        return a.prototype.load = function(e, a, r, n) {
            this.currentRequest && this.abort();
            var o = function(e) {
                if (this.currentRequest = null, this.lastResponseText === e.responseText) return void n();
                var i = t(e);
                i ? (this.lastResponseText = e.responseText, a(i, e.responseURL)) : (this.lastResponseText = null, r("Playlist is not valid"))
            }.bind(this);
            this.currentRequest = i.ajax(e, o, r)
        },
        a.prototype.loadRecommendation = function(e, a, r, n, o) {
            this.currentRequest && this.abort();
            var l = function(e) {
                this.currentRequest = null;
                var i = t(e);
                if (!i) return void n();
                var l = i.file || a;
                if (l) {
                    var s = function(e, t) {
                        r(e, t, i.params)
                    };
                    this.load(l, s, n, o)
                } else n(i)
            }.bind(this);
            this.currentRequest = i.ajax(e, l, n)
        },
        a.prototype.clearCache = function() {
            this.lastResponseText = null
        },
        a.prototype.abort = function() {
            this.currentRequest.onload = null,
            this.currentRequest.onreadystatechange = null,
            this.currentRequest.onerror = null,
            this.currentRequest.abort && this.currentRequest.abort(),
            this.currentRequest = null,
            this.lastResponseText = null
        },
        a
    }.apply(t, a),
    !(void 0 !== r && (e.exports = r))
},
function(e, t, i) {
    var a, r;
    a = [],
    r = function() {
        function e(e) {
            return e ? r.createElement(e).textContent: ""
        }
        function t(t) {
            return a.map(t,
            function(t, i) {
                var n = t,
                o = n.duration;
                return (a.isNumber(o) && o > 0 || a.isString(o) && o.indexOf(":") < 0) && (n.duration = r.timeFormat(o)),
                n.index = i,
                n.indexText = i + 1 + ". ",
                n.title = e(n.title),
                n
            })
        }
        function i(e, t) {
            return a.extend({},
            e, t)
        }
        var a, r, n = Object.freeze({
            open: !1,
            error: !1,
            errorMessage: "",
            items: [],
            itemsPerPage: 9,
            nextUp: null,
            nextUpHeading: "Next Up",
            page: 0,
            selectedItem: null,
            selecting: !1,
            showDockButton: !0,
            stateWhenOpened: "",
            type: "playlist"
        }),
        o = function(e, t) {
            r = e,
            a = t
        };
        return o.prototype.reduce = function(e, r) {
            var o = e,
            l = r.payload;
            switch (o || (o = a.extend({},
            n)), r.type) {
            case "SETUP_PLAYLIST":
                return i(o, {
                    nextUpHeading: l.nextUpHeading || n.nextUpHeading,
                    showDockButton: l.showDockButton
                });
            case "PLAYLIST_LOADED":
                var s, p = l.items;
                return s = p.length > 1 ? {
                    items: t(p),
                    error: n.error,
                    errorMessage: n.errorMessage,
                    page: 0,
                    nextUp: p[1]
                }: {
                    error: !0,
                    errorMessage: "Not enough items in the playlist (need at least 2)",
                    nextUp: n.nextUp,
                    open: !1
                },
                s.selectedItem = n.selectedItem,
                i(o, s);
            case "RELATED_OPENED":
                return i(o, {
                    open: !0,
                    stateWhenOpened: l.playerState
                });
            case "RELATED_CLOSED":
                return i(o, {
                    open: !1,
                    interactionMethod: l.method,
                    page: 0
                });
            case "ITEM_SELECTED":
                var d = r.payload.selectedItem,
                c = d.index,
                u = o.items[(c + 1) % o.items.length];
                return i(o, {
                    nextUp: u,
                    selectedItem: d,
                    interactionMethod: r.payload.method,
                    selecting: !1,
                    open: !1
                });
            case "PAGED":
                return i(o, {
                    page: "right" === l.direction ? o.page + 1 : o.page - 1
                });
            case "RESET_PAGE_POSITION":
                return i(o, {
                    page: 0,
                    nextUp: o.items[0],
                    selectedItem: n.selectedItem
                });
            case "RESIZED":
                return i(o, {
                    itemsPerPage: l.itemsPerPage,
                    page: 0
                });
            case "REDUCER_REPLACED":
                return i(n, {
                    itemsPerPage: o.itemsPerPage
                });
            default:
                return o
            }
        },
        o
    }.apply(t, a),
    !(void 0 !== r && (e.exports = r))
},
function(e, t, i) {
    var a, r;
    a = [],
    r = function() {
        function e(e, t) {
            return n.filter(e,
            function(e) {
                var i = n.isArray(e.sources) && e.sources[0] ? e.sources[0] : {};
                return e.image && e.title && ("play" === t && (i.file || e.file) || "play" !== t && e.link)
            })
        }
        function t(e, t) {
            return n.filter(e,
            function(e) {
                return ! t[e.mediaid || e.file]
            })
        }
        function i(e) {
            return n.map(e,
            function(e, t) {
                var i = e;
                return i.duration = i.duration ? o.timeFormat(i.duration) : "",
                i.index = t,
                i
            })
        }
        function a(e) {
            var t = {};
            return n.forEach(e,
            function(e) {
                t[e.mediaid || e.file] = !0
            }),
            t
        }
        function r(e, t) {
            return n.extend({},
            e, t)
        }
        var n, o, l = Object.freeze({
            autoplay: !1,
            autoplayMessage: "Next up in xx",
            autoplayTimeout: 10,
            cached: !1,
            error: !1,
            errorMessage: "",
            nextUpHeading: "Next Up",
            interactionMethod: null,
            itemsLoaded: !1,
            itemsPerPage: 9,
            nextUp: null,
            onClick: null,
            open: !1,
            page: 0,
            playedRecs: {},
            recommendationParams: null,
            relatedFile: "",
            relatedItems: [],
            selectedItem: null,
            showDockButton: !0,
            stateWhenOpened: "",
            type: "related"
        }),
        s = function(e, t) {
            o = e,
            n = t
        };
        return s.prototype.reduce = function(o, p) {
            var d = o,
            c = p.payload;
            switch (d || (d = n.extend({},
            l)), p.type) {
            case "SETUP_RELATED":
                var u = c.autoplayMessage;
                u || "" === u || (u = l.autoplayMessage);
                var h = parseFloat(c.autoplayTimeout); (n.isNaN(h) || h < 0) && (h = l.autoplayTimeout);
                var w = c.autoplay ? "play": c.onClick;
                return r(d, {
                    nextUpHeading: c.nextUpHeading || l.nextUpHeading,
                    onClick: w,
                    playedRecs: a(c.playlist),
                    autoplay: c.autoplay || l.autoplay,
                    autoplayTimeout: h,
                    autoplayMessage: u,
                    showDockButton: p.payload.showDockButton
                });
            case "PLAYLIST_LOADING":
                return r(d, {
                    itemsLoaded: l.itemsLoaded,
                    cached: l.cached
                });
            case "PLAYLIST_LOADED":
                var m = i(e(c.items, d.onClick)),
                f = t(m, d.playedRecs),
                g = {};
                if (m.length) {
                    var j = m[0],
                    v = l.playedRecs;
                    f.length && (j = f[0], v = d.playedRecs),
                    g = {
                        itemsLoaded: !0,
                        relatedItems: m,
                        selectedItem: l.selectedItem,
                        error: l.error,
                        errorMessage: l.errorMessage,
                        recommendationParams: d.recommendationParams || c.recommendationParams,
                        page: l.page,
                        playedRecs: v,
                        nextUp: j
                    }
                } else g = {
                    itemsLoaded: !1,
                    error: !0,
                    errorMessage: "No related items",
                    nextUp: l.nextUp
                };
                return g.relatedFile = c.relatedFile,
                g.selectedItem = l.selectedItem,
                r(d, g);
            case "PLAYLIST_LOADED_FAILED":
                return r(d, {
                    itemsLoaded: !0,
                    error: !0,
                    errorMessage: c.errorMessage,
                    relatedItems: l.relatedItems
                });
            case "PLAYLIST_CACHED":
                var x = {};
                return s.unplayedItems(d).length || (x = {
                    playedRecs: l.playedRecs,
                    selectedItem: l.selectedItem,
                    page: l.page,
                    nextUp: l.nextUp
                }),
                x.itemsLoaded = !0,
                x.cached = !0,
                r(d, x);
            case "RELATED_OPENED":
                return r(d, {
                    open: !0,
                    interactionMethod: c.method,
                    stateWhenOpened: c.playerState
                });
            case "RELATED_CLOSED":
                return r(d, {
                    open: !1,
                    interactionMethod: c.method,
                    page: 0
                });
            case "ITEM_SELECTED":
                var b, y = c.selectedItem,
                k = s.unplayedItems(d),
                _ = n.clone(d.playedRecs);
                return _[y.mediaid || y.file] = !0,
                k.length && (b = k[n.indexOf(k, c.selectedItem) + 1]),
                r(d, {
                    selectedItem: y,
                    interactionMethod: c.method,
                    playedRecs: _,
                    nextUp: b,
                    open: !1
                });
            case "PAGED":
                return r(d, {
                    page: "right" === c.direction ? d.page + 1 : d.page - 1
                });
            case "RESIZED":
                return r(d, {
                    itemsPerPage: c.itemsPerPage,
                    page: 0
                });
            case "RESET_PAGE_POSITION":
                return r(d, {
                    page: 0,
                    selectedItem: l.selectedItem
                });
            case "REDUCER_REPLACED":
                return r(l, {
                    itemsPerPage: d.itemsPerPage
                });
            default:
                return d
            }
        },
        s.unplayedItems = function(e) {
            return t(e.relatedItems, e.playedRecs)
        },
        s
    }.apply(t, a),
    !(void 0 !== r && (e.exports = r))
},
function(e, t, i) {
    var a, r;
    a = [],
    r = function() {
        function e(e) {
            switch (e) {
            case 9:
                return 2;
            case 6:
                return 1;
            case 4:
                return 1;
            default:
                return 0
            }
        }
        function t(e, t, i) {
            return e.slice(Math.max(0, t), Math.max(0, i))
        }
        function i(e, i, a) {
            return {
                left: t(e, a - i, a),
                center: t(e, a, i + a),
                right: t(e, i + a, 2 * i + a)
            }
        }
        return function(a, r, n, o) {
            var l, s = r * n + o,
            p = e(n);
            if (0 === r) {
                var d = t.bind(null, a);
                l = {
                    left: d(s - n, s),
                    center: d(s + 1, n + s - p),
                    right: d(n + s - p, 2 * n + s - p)
                }
            } else l = r > 0 ? i(a, n, s - p) : i(a, n, s);
            return l
        }
    }.apply(t, a),
    !(void 0 !== r && (e.exports = r))
},
function(e, t, i) {
    var a = i(35);
    "string" == typeof a && (a = [["all-players", a, ""]]),
    i(37).style(a, "all-players"),
    a.locals && (e.exports = a.locals)
},
function(e, t, i) {
    t = e.exports = i(36)(),
    t.push([e.id, ".jw-related-icon-close{}.jw-related-icon-related{}.jw-related-icon-arrow-left{}.jw-related-icon-arrow-right{}.jw-related-dock-btn .jw-dock-image{fill:#fff;background-size:20px}.jw-related-icon-related{fill:#fff}.jw-plugin-related{background-color:rgba(34,34,34,.9);bottom:0;display:block;left:0;opacity:0;right:0;top:0;visibility:hidden}.jw-plugin-related-open{opacity:1;visibility:visible}.jw-related{-webkit-font-smoothing:antialiased;-moz-font-smoothing:antialiased;height:100%;line-height:normal;position:relative;width:100%}.jw-related-container{box-sizing:border-box;height:100%;overflow:hidden;padding:20px 50px;width:100%}.jw-breakpoint-2 .jw-related-container,.jw-breakpoint-4 .jw-related-container{padding:25px 44px}.jw-breakpoint-3 .jw-related-container{padding:50px 44px}.jw-breakpoint-5 .jw-related-container{padding:25px 50px}.jw-breakpoint-6 .jw-related-container{padding:30px 60px}.jw-breakpoint-7 .jw-related-container{padding:40px 70px}.jw-orientation-portrait .jw-related-container{-webkit-box-align:center;align-items:center;display:-webkit-box;display:flex}.jw-related-close{background-size:14px;background-position:50%;background-color:transparent;display:block;height:50px;opacity:.5;position:absolute;right:0;top:0;-webkit-transition:opacity .25s ease-in-out;transition:opacity .25s ease-in-out;width:50px;border:none;cursor:pointer}.jw-related-close:focus,.jw-related-close:hover{outline:none;opacity:1}.jw-breakpoint-5 .jw-related-close{background-size:16px;height:60px;width:60px}.jw-breakpoint-6 .jw-related-close{background-size:18px;height:70px;width:70px}.jw-breakpoint-7 .jw-related-close{background-size:20px;height:85px;width:85px}.jw-related-item-group{float:left;height:100%;overflow:hidden;position:relative;width:100%}.jw-related-item-next-up+.jw-related-item-group{display:none}[class*=jw-breakpoint-]:not(.jw-breakpoint-0):not(.jw-breakpoint-1) .jw-related-item-group{display:block}[class*=jw-breakpoint-]:not(.jw-breakpoint-0):not(.jw-breakpoint-2) .jw-related-item-next-up+.jw-related-item-group{width:66.66666667%}.jw-breakpoint-2 .jw-related-item-next-up+.jw-related-item-group{width:50%}@media (orientation:portrait){.jw-orientation-portrait .jw-related-item.jw-related-item-next-up{width:100%}}@media (orientation:landscape){.jw-flag-fullscreen .jw-orientation-portrait .jw-related-item-group{display:block}}.jw-related-item{float:left;height:100%;overflow:hidden;width:100%}.jw-breakpoint-2 .jw-related-item,.jw-breakpoint-3 .jw-related-item,.jw-breakpoint-4 .jw-related-item{padding:6px}.jw-breakpoint-2 .jw-related-item-group .jw-related-item{display:none;height:50%;width:50%}.jw-breakpoint-2 .jw-related-item-group .jw-related-item:nth-child(-n+4){display:block}.jw-breakpoint-2 .jw-related-item-next-up+.jw-related-item-group .jw-related-item:nth-child(-n+2){display:block;width:100%}.jw-breakpoint-3 .jw-related-item-group .jw-related-item{display:none;height:50%;width:33.33333333%}.jw-breakpoint-4 .jw-related-item-group .jw-related-item{display:none;height:33.33333333%;width:33.33333333%}.jw-breakpoint-3 .jw-related-item-group .jw-related-item:nth-child(-n+6),.jw-breakpoint-4 .jw-related-item-group .jw-related-item:nth-child(-n+9){display:block}.jw-breakpoint-3 .jw-related-item-next-up+.jw-related-item-group .jw-related-item:nth-child(-n+4),.jw-breakpoint-4 .jw-related-item-next-up+.jw-related-item-group .jw-related-item:nth-child(-n+6),.jw-breakpoint-5 .jw-related-item-next-up+.jw-related-item-group .jw-related-item:nth-child(-n+6),.jw-breakpoint-6 .jw-related-item-next-up+.jw-related-item-group .jw-related-item:nth-child(-n+6),.jw-breakpoint-7 .jw-related-item-next-up+.jw-related-item-group .jw-related-item:nth-child(-n+6){display:block;width:50%}.jw-breakpoint-4 .jw-related-item-group .jw-related-item,.jw-breakpoint-5 .jw-related-item-group .jw-related-item,.jw-breakpoint-6 .jw-related-item-group .jw-related-item,.jw-breakpoint-7 .jw-related-item-group .jw-related-item{display:block;height:33.33333333%;width:33.33333333%}.jw-breakpoint-5 .jw-related-item,.jw-breakpoint-6 .jw-related-item{padding:10px}.jw-breakpoint-7 .jw-related-item{padding:15px}@-webkit-keyframes relatedItem{0%{opacity:0;-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9);visibility:hidden}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);visibility:visible}}@keyframes relatedItem{0%{opacity:0;-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9);visibility:hidden}to{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);visibility:visible}}.jw-plugin-related-open .jw-related-item{-webkit-animation:relatedItem .25s ease-in-out both;animation:relatedItem .25s ease-in-out both}.jw-plugin-related-open .jw-related-item:nth-child(1){-webkit-animation-delay:50ms;animation-delay:50ms}.jw-plugin-related-open .jw-related-item:nth-child(2){-webkit-animation-delay:.1s;animation-delay:.1s}.jw-plugin-related-open .jw-related-item:nth-child(3){-webkit-animation-delay:.15s;animation-delay:.15s}.jw-plugin-related-open .jw-related-item:nth-child(4){-webkit-animation-delay:.2s;animation-delay:.2s}.jw-plugin-related-open .jw-related-item:nth-child(5){-webkit-animation-delay:.25s;animation-delay:.25s}.jw-plugin-related-open .jw-related-item:nth-child(6){-webkit-animation-delay:.3s;animation-delay:.3s}.jw-plugin-related-open .jw-related-item.jw-related-item-next-up{-webkit-animation-delay:0ms;animation-delay:0ms}.jw-related-item-container{height:100%;width:100%}.jw-related-item-content{background-color:#111;border:1px solid transparent;box-sizing:border-box;cursor:pointer;display:block;height:100%;overflow:hidden;position:relative;text-decoration:none;-webkit-transition:border-color .2s ease-in-out;transition:border-color .2s ease-in-out;width:100%}.jw-related-item-content:hover{background-color:#000;border-color:#fff}.jw-related-item-content-container{height:100%;overflow:hidden;position:relative;width:100%}.jw-related-item-poster{background-position:50%;background-repeat:no-repeat;background-size:cover;height:100%;overflow:hidden;width:100%}.jw-related-item-poster-content{height:100%;overflow:hidden;position:relative}.jw-related-item-duration{color:#fff;font-size:12px;font-weight:700;letter-spacing:.3px;position:absolute;right:15px;text-align:right;text-shadow:-1px -1px 20px rgba(0,0,0,.5),1px 1px 20px rgba(0,0,0,.5);top:15px}.jw-breakpoint-2 .jw-related-item-duration,.jw-breakpoint-3 .jw-related-item-duration{right:10px;top:10px}.jw-breakpoint-6 .jw-related-item-duration,.jw-breakpoint-7 .jw-related-item-duration{right:20px;top:20px}.jw-breakpoint-6 .jw-related-item-duration{font-size:14px}.jw-breakpoint-7 .jw-related-item-duration{font-size:15px}.jw-related-item-play{color:#fff;display:none;font-size:48px;left:50%;margin:-24px 0 0 -24px;position:absolute;text-shadow:0 0 2px hsla(0,0%,7%,.5);top:50%}.jw-related-item-content:hover .jw-related-item-play{display:block}.jw-breakpoint-2 .jw-related-item-play{font-size:36px;margin:-18px 0 0 -18px}.jw-breakpoint-5 .jw-related-item-play{font-size:48px;margin:-24px 0 0 -24px}.jw-related-item-title{bottom:0;left:0;overflow:hidden;position:absolute;text-decoration:none;text-shadow:0 0 2px hsla(0,0%,7%,.5);width:100%}.jw-related-item-title strong{color:#fff;display:none;font-size:13px;padding:0 15px}.jw-related-item-title span{background-image:-webkit-linear-gradient(top,hsla(0,0%,50%,0),#111);background-image:linear-gradient(-180deg,hsla(0,0%,50%,0),#111);box-sizing:border-box;color:hsla(0,0%,100%,.8);display:block;font-size:13px;font-weight:700;line-height:1.4;max-height:104.6px;padding:50px 15px 12px;position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.jw-related-item-title .jw-item-index-text em{font-style:normal;font-weight:700}.jw-breakpoint-5 .jw-related-item-title span{max-height:122.8px}.jw-breakpoint-6 .jw-related-item-title span{max-height:141px}.jw-breakpoint-7 .jw-related-item-title span{max-height:159.2px}.jw-breakpoint-2 .jw-related-item-title span,.jw-breakpoint-2 .jw-related-item-title strong,.jw-breakpoint-3 .jw-related-item-title span,.jw-breakpoint-3 .jw-related-item-title strong,.jw-breakpoint-4 .jw-related-item-title span,.jw-breakpoint-4 .jw-related-item-title strong{padding:50px 10px 7px}.jw-breakpoint-6 .jw-related-item-title span,.jw-breakpoint-6 .jw-related-item-title strong,.jw-breakpoint-7 .jw-related-item-title span,.jw-breakpoint-7 .jw-related-item-title strong{padding:50px 20px 17px}.jw-breakpoint-2 .jw-related-item-title span,.jw-breakpoint-3 .jw-related-item-title span{line-height:1.3}.jw-breakpoint-6 .jw-related-item-title span{font-size:15px}.jw-breakpoint-7 .jw-related-item-title span{font-size:16px;line-height:1.5}.jw-related-item-content:hover .jw-related-item-title span{background-image:-webkit-linear-gradient(top,hsla(0,0%,50%,0),#000);background-image:linear-gradient(-180deg,hsla(0,0%,50%,0),#000);color:#fff;visibility:visible;white-space:normal}.jw-related-item-content:hover .jw-related-item-title span:before{background-image:-webkit-linear-gradient(top,hsla(0,0%,7%,0),#111);background-image:linear-gradient(-180deg,hsla(0,0%,7%,0),#111);bottom:0;content:'';height:30px;left:0;position:absolute;width:100%}.jw-related-item-description{color:hsla(0,0%,100%,.8);display:none;font-size:13px;line-height:1.5;overflow:hidden}.jw-related-item-description-content{box-sizing:border-box;padding:0 15px}.jw-breakpoint-4 .jw-related-item-description-content{padding:0 10px}.jw-breakpoint-6 .jw-related-item-description-content,.jw-breakpoint-7 .jw-related-item-description-content{padding:0 20px}.jw-related-item-description span{display:block}.jw-related-item-content:hover .jw-related-item-description span{color:#fff}.jw-related-item-next-up{display:block;width:100%}.jw-related-item.jw-related-item-next-up{height:100%}[class*=jw-breakpoint-]:not(.jw-breakpoint-0):not(.jw-breakpoint-1) .jw-related-item-next-up .jw-related-item-content-container:after{background-image:-webkit-linear-gradient(top,hsla(0,0%,7%,0),#111);background-image:linear-gradient(-180deg,hsla(0,0%,7%,0),#111);bottom:0;content:'';height:50px;left:0;position:absolute;width:100%}.jw-breakpoint-2 .jw-related-item-next-up .jw-related-item-content:after{height:75px}.jw-breakpoint-3 .jw-related-item-next-up .jw-related-item-content:after{height:100px}.jw-breakpoint-4 .jw-related-item-next-up .jw-related-item-content:after{height:125px}.jw-breakpoint-5 .jw-related-item-next-up .jw-related-item-content:after{height:150px}.jw-breakpoint-6 .jw-related-item-next-up .jw-related-item-content:after{height:175px}.jw-breakpoint-7 .jw-related-item-next-up .jw-related-item-content:after{height:200px}[class*=jw-breakpoint-]:not(.jw-breakpoint-0):not(.jw-breakpoint-1) .jw-related-item-next-up .jw-related-item-content:hover .jw-related-item-content-container:after{background-image:-webkit-linear-gradient(top,transparent,#000);background-image:linear-gradient(-180deg,transparent,#000)}[class*=jw-breakpoint-]:not(.jw-breakpoint-0):not(.jw-breakpoint-1) .jw-related-item-next-up .jw-related-item-poster-content:before{background-image:-webkit-linear-gradient(top,hsla(0,0%,50%,0),#111);background-image:linear-gradient(-180deg,hsla(0,0%,50%,0),#111);content:'';height:100%;left:0;position:absolute;top:0;width:100%}[class*=jw-breakpoint-]:not(.jw-breakpoint-0):not(.jw-breakpoint-1) .jw-related-item-next-up .jw-related-item-content:hover .jw-related-item-poster-content:before{background-image:-webkit-linear-gradient(top,hsla(0,0%,50%,0),#000);background-image:linear-gradient(-180deg,hsla(0,0%,50%,0),#000)}.jw-related-item-next-up .jw-related-item-title{text-shadow:none}.jw-related-item-next-up .jw-related-item-title strong{display:block;margin-bottom:5px}.jw-related-item-next-up .jw-related-item-title span{color:#fff}[class*=jw-breakpoint-]:not(.jw-breakpoint-0):not(.jw-breakpoint-1) .jw-related-item-next-up .jw-related-item-title span{background:none;max-height:none}[class*=jw-breakpoint-]:not(.jw-breakpoint-0):not(.jw-breakpoint-1) .jw-related-item-next-up .jw-related-item-title span:before{display:none}.jw-breakpoint-2 .jw-related-item-next-up{width:50%}.jw-breakpoint-3 .jw-related-item-next-up,.jw-breakpoint-4 .jw-related-item-next-up,.jw-breakpoint-5 .jw-related-item-next-up,.jw-breakpoint-6 .jw-related-item-next-up,.jw-breakpoint-7 .jw-related-item-next-up{width:33.33333333%}.jw-related-item-next-up .jw-related-item-title span{padding:0 15px 15px}.jw-breakpoint-2 .jw-related-item-next-up .jw-related-item-poster,.jw-breakpoint-3 .jw-related-item-next-up .jw-related-item-poster,.jw-breakpoint-4 .jw-related-item-next-up .jw-related-item-poster,.jw-breakpoint-5 .jw-related-item-next-up .jw-related-item-poster,.jw-breakpoint-6 .jw-related-item-next-up .jw-related-item-poster,.jw-breakpoint-7 .jw-related-item-next-up .jw-related-item-poster{height:42.85714286%}[class*=jw-breakpoint-]:not(.jw-breakpoint-0):not(.jw-breakpoint-1) .jw-related-item-next-up .jw-related-item-title{bottom:auto;height:auto;left:auto;position:relative;text-shadow:none}[class*=jw-breakpoint-]:not(.jw-breakpoint-0):not(.jw-breakpoint-1) .jw-related-item-next-up .jw-related-item-title strong{position:static}[class*=jw-breakpoint-]:not(.jw-breakpoint-0):not(.jw-breakpoint-1) .jw-related-item-next-up .jw-related-item-title span{font-weight:400;position:static;overflow:visible;white-space:normal}.jw-breakpoint-2 .jw-related-item-next-up .jw-related-item-title,.jw-breakpoint-3 .jw-related-item-next-up .jw-related-item-title{margin-top:-10px}.jw-breakpoint-4 .jw-related-item-next-up .jw-related-item-title{margin:-15px 0 5px}.jw-breakpoint-5 .jw-related-item-next-up .jw-related-item-title{margin:-20px 0 10px}.jw-breakpoint-6 .jw-related-item-next-up .jw-related-item-title{margin:-25px 0 10px}.jw-breakpoint-7 .jw-related-item-next-up .jw-related-item-title{margin:-30px 0 15px}.jw-breakpoint-2 .jw-related-item-next-up .jw-related-item-title span,.jw-breakpoint-2 .jw-related-item-next-up .jw-related-item-title strong,.jw-breakpoint-3 .jw-related-item-next-up .jw-related-item-title span,.jw-breakpoint-3 .jw-related-item-next-up .jw-related-item-title strong,.jw-breakpoint-4 .jw-related-item-next-up .jw-related-item-title span,.jw-breakpoint-4 .jw-related-item-next-up .jw-related-item-title strong{padding:0 10px}.jw-breakpoint-5 .jw-related-item-next-up .jw-related-item-title span,.jw-breakpoint-5 .jw-related-item-next-up .jw-related-item-title strong{padding:0 15px}.jw-breakpoint-6 .jw-related-item-next-up .jw-related-item-title span,.jw-breakpoint-6 .jw-related-item-next-up .jw-related-item-title strong,.jw-breakpoint-7 .jw-related-item-next-up .jw-related-item-title span,.jw-breakpoint-7 .jw-related-item-next-up .jw-related-item-title strong{padding:0 20px}.jw-breakpoint-4 .jw-related-item-next-up .jw-related-item-title strong,.jw-breakpoint-5 .jw-related-item-next-up .jw-related-item-title strong{font-size:15px}.jw-breakpoint-6 .jw-related-item-next-up .jw-related-item-title strong{font-size:16px}.jw-breakpoint-7 .jw-related-item-next-up .jw-related-item-title strong{font-size:18px}.jw-breakpoint-4 .jw-related-item-next-up .jw-related-item-title strong{margin-bottom:5px}.jw-breakpoint-5 .jw-related-item-next-up .jw-related-item-title strong,.jw-breakpoint-6 .jw-related-item-next-up .jw-related-item-title strong,.jw-breakpoint-7 .jw-related-item-next-up .jw-related-item-title strong{margin-bottom:10px}.jw-breakpoint-2 .jw-related-item-next-up .jw-related-item-title span,.jw-breakpoint-3 .jw-related-item-next-up .jw-related-item-title span{font-size:15px}.jw-breakpoint-4 .jw-related-item-next-up .jw-related-item-title span{font-size:16px}.jw-breakpoint-5 .jw-related-item-next-up .jw-related-item-title span{font-size:18px}.jw-breakpoint-6 .jw-related-item-next-up .jw-related-item-title span{font-size:20px}.jw-breakpoint-7 .jw-related-item-next-up .jw-related-item-title span{font-size:24px;line-height:1.3}.jw-breakpoint-4 .jw-related-item-next-up .jw-related-item-description,.jw-breakpoint-5 .jw-related-item-next-up .jw-related-item-description,.jw-breakpoint-6 .jw-related-item-next-up .jw-related-item-description,.jw-breakpoint-7 .jw-related-item-next-up .jw-related-item-description{display:block}.jw-breakpoint-5 .jw-related-item-next-up .jw-related-item-description{font-size:14px}.jw-breakpoint-6 .jw-related-item-next-up .jw-related-item-description,.jw-breakpoint-7 .jw-related-item-next-up .jw-related-item-description{font-size:16px}.jw-orientation-portrait .jw-related-item-group,.jw-orientation-portrait .jw-related-item-next-up{height:40%}@media (orientation:landscape){.jw-flag-fullscreen .jw-orientation-portrait .jw-related-item-next-up{display:block;height:100%;vertical-align:inherit}}.jw-related-autoplay-svg{position:absolute;width:100%;bottom:0;height:100%;left:0;right:0;top:0}.jw-related-autoplay-frame{fill:none;stroke:transparent;stroke-width:2px}.jw-related-autoplay-frame-progress{fill:none;stroke:#fff;stroke-width:2px;-webkit-transition:stroke .2s ease-in-out;transition:stroke .2s ease-in-out}.jw-breakpoint-2 .jw-related-autoplay-frame,.jw-breakpoint-2 .jw-related-autoplay-frame-progress,.jw-breakpoint-3 .jw-related-autoplay-frame,.jw-breakpoint-3 .jw-related-autoplay-frame-progress,.jw-breakpoint-4 .jw-related-autoplay-frame,.jw-breakpoint-4 .jw-related-autoplay-frame-progress{stroke-width:4px}.jw-breakpoint-5 .jw-related-autoplay-frame,.jw-breakpoint-5 .jw-related-autoplay-frame-progress,.jw-breakpoint-6 .jw-related-autoplay-frame,.jw-breakpoint-6 .jw-related-autoplay-frame-progress,.jw-breakpoint-7 .jw-related-autoplay-frame,.jw-breakpoint-7 .jw-related-autoplay-frame-progress{stroke-width:8px}.jw-related-item-content:hover .jw-related-autoplay-frame-progress{stroke:hsla(0,0%,100%,.6)}@-webkit-keyframes jw-dash{to{stroke-dashoffset:0}}@keyframes jw-dash{to{stroke-dashoffset:0}}[class*=jw-related-page-]{background-color:transparent;background-size:18px;background-position:50%;border:none;cursor:pointer;display:block;height:50px;left:0;margin-top:-25px;opacity:.5;outline:none;position:absolute;top:50%;-webkit-transition:opacity .25s ease-in-out;transition:opacity .25s ease-in-out;width:50px}[class*=jw-related-page-]:hover{opacity:1}.jw-related-page-right{left:auto;right:0}.jw-breakpoint-5 [class*=jw-related-page-]{background-size:20px;height:60px;margin-top:-30px;width:60px}.jw-breakpoint-6 [class*=jw-related-page-]{background-size:24px;height:70px;margin-top:-35px;width:70px}.jw-breakpoint-7 [class*=jw-related-page-]{background-size:32px;height:85px;margin-top:-42.5px;width:85px}", ""])
},
function(e, t) {
    e.exports = function() {
        var e = [];
        return e.toString = function() {
            for (var e = [], t = 0; t < this.length; t++) {
                var i = this[t];
                i[2] ? e.push("@media " + i[2] + "{" + i[1] + "}") : e.push(i[1])
            }
            return e.join("")
        },
        e.i = function(t, i) {
            "string" == typeof t && (t = [[null, t, ""]]);
            for (var a = {},
            r = 0; r < this.length; r++) {
                var n = this[r][0];
                "number" == typeof n && (a[n] = !0)
            }
            for (r = 0; r < t.length; r++) {
                var o = t[r];
                "number" == typeof o[0] && a[o[0]] || (i && !o[2] ? o[2] = i: i && (o[2] = "(" + o[2] + ") and (" + i + ")"), e.push(o))
            }
        },
        e
    }
},
function(e, t, i) {
    var a;
    a = function(e, t, i) {
        function a(e, t) {
            n(t, o(e))
        }
        function r(e) {
            var t = c[e];
            if (t) {
                for (var i = Object.keys(t), a = 0; a < i.length; a += 1) for (var r = t[i[a]], n = 0; n < r.parts.length; n += 1) r.parts[n]();
                delete c[e]
            }
        }
        function n(e, t) {
            for (var i = 0; i < t.length; i++) {
                var a = t[i],
                r = (c[e] || {})[a.id];
                if (r) {
                    for (var n = 0; n < r.parts.length; n++) r.parts[n](a.parts[n]);
                    for (; n < a.parts.length; n++) r.parts.push(p(e, a.parts[n]))
                } else {
                    for (var o = [], n = 0; n < a.parts.length; n++) o.push(p(e, a.parts[n]));
                    c[e] = c[e] || {},
                    c[e][a.id] = {
                        id: a.id,
                        parts: o
                    }
                }
            }
        }
        function o(e) {
            for (var t = [], i = {},
            a = 0; a < e.length; a++) {
                var r = e[a],
                n = r[0],
                o = r[1],
                l = r[2],
                s = {
                    css: o,
                    media: l
                };
                i[n] ? i[n].parts.push(s) : t.push(i[n] = {
                    id: n,
                    parts: [s]
                })
            }
            return t
        }
        function l(e) {
            w().appendChild(e)
        }
        function s(e) {
            var t = document.createElement("style");
            return t.type = "text/css",
            t.setAttribute("data-jwplayer-id", e),
            l(t),
            t
        }
        function p(e, t) {
            var i, a, r, n = u[e];
            n || (n = u[e] = {
                element: s(e),
                counter: 0
            });
            var o = n.counter++;
            return i = n.element,
            a = d.bind(null, i, o, !1),
            r = d.bind(null, i, o, !0),
            a(t),
            function(e) {
                if (e) {
                    if (e.css === t.css && e.media === t.media) return;
                    a(t = e)
                } else r()
            }
        }
        function d(e, t, i, a) {
            var r = i ? "": a.css;
            if (e.styleSheet) e.styleSheet.cssText = m(t, r);
            else {
                var n = document.createTextNode(r),
                o = e.childNodes;
                o[t] && e.removeChild(o[t]),
                o.length ? e.insertBefore(n, o[t]) : e.appendChild(n)
            }
        }
        var c = {},
        u = {},
        h = function(e) {
            var t;
            return function() {
                return "undefined" == typeof t && (t = e.apply(this, arguments)),
                t
            }
        },
        w = h(function() {
            return document.head || document.getElementsByTagName("head")[0]
        });
        i.exports = {
            style: a,
            clear: r
        };
        var m = function() {
            var e = [];
            return function(t, i) {
                return e[t] = i,
                e.filter(Boolean).join("\n")
            }
        } ()
    }.call(t, i, t, e),
    !(void 0 !== a && (e.exports = a))
}]);