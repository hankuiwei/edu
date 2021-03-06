webpackJsonpjwplayer([3], {
    70 : function(t, e, i) {
        var s, n;
        s = [i(75), i(25), i(45), i(164), i(165), i(163), i(28), i(2), i(5), i(1)],
        n = function(t, e, i, s, n, a, o, r, l, d) {
            var c = r.noop,
            h = {},
            u = function(u, p) {
                function g() {
                    return ! d.isUndefined(u._instreamAdapter)
                }
                function m(t, e) {
                    o.log("send command", t, e);
                    var i = {
                        command: t
                    };
                    void 0 !== e && (i.args = e),
                    L.sendMessage(o.NS, i, c,
                    function(t) {
                        o.log("error message", t),
                        "Invalid namespace" === t.description && x.stopCasting()
                    })
                }
                function f(t) {
                    var e = o.available(t.availability);
                    S(e)
                }
                function v(t, e) {
                    var i = JSON.parse(e);
                    if (!i) throw "Message not proper JSON";
                    if (i.reconcile) {
                        k.removeMessageListener(o.NS, this.listenForHandshakeHandler);
                        var s = i.diff,
                        n = k;
                        s.id && i.appid && i.pageUrl || (s.id = window.jwplayer().id, i.appid = A.appid, i.pageUrl = P, k = L = null),
                        s.id === p.get("id") && i.appid === A.appid && i.pageUrl === P && (L || (g() && u.instreamDestroy(), this.sessionStarted(n), this.castModel.set("state", l.IDLE)), this.handleMessage(i)),
                        k = null
                    }
                }
                function S(t) {
                    var e = !!t;
                    N.available !== e && (N.available = e, p.set("castAvailable", e))
                }
                function y() {
                    return L && L.receiver ? L.receiver.friendlyName: ""
                }
                function C(t) {
                    o.log("Cast Session Error:", t, L);
                    var e = window.chrome;
                    t.code !== e.cast.ErrorCode.CANCEL && (o.log("Cast Session Error:", t, L), t.code === e.cast.ErrorCode.SESSION_ERROR && this.stopCasting())
                }
                function E(t) {
                    var e = window.chrome;
                    t.code !== e.cast.ErrorCode.CANCEL && (o.log("Cast Session Error:", t, L), t.code === e.cast.ErrorCode.SESSION_ERROR && this.stopCasting())
                }
                function M(t) {
                    t /= 100,
                    t = Math.max(0, Math.min(t, 1)),
                    L.setReceiverVolumeLevel(t, x.mirrorVolume.bind(x),
                    function(t) {
                        o.error("set volume error", t)
                    })
                }
                function w(t) {
                    L.setReceiverMuted(t, x.mirrorVolume.bind(x),
                    function(t) {
                        o.error("set muted error", t)
                    })
                }
                function b(t, e) {
                    function i(t) {
                        return function() {
                            e.sendCommand(t)
                        }
                    }
                    return {
                        getContainer: function() {
                            return document.createElement("div")
                        },
                        on: c,
                        onAdPlay: c,
                        onAdSkipped: c,
                        onAdComplete: c,
                        onAdError: c,
                        onCaptionsList: c,
                        onCaptionsChange: c,
                        onPlaylistItem: c,
                        onPlaylistComplete: c,
                        onError: c,
                        onResize: c,
                        onReady: c,
                        onFullscreen: c,
                        getState: c,
                        castToggle: c,
                        setFullscreen: c,
                        setVolume: M,
                        setMute: function() {
                            w(!t.get("mute"))
                        },
                        play: e.play.bind(e),
                        pause: e.pause.bind(e),
                        seek: e.seek.bind(e),
                        playlistNext: i("next"),
                        playlistPrev: i("prev"),
                        load: e.load.bind(e)
                    }
                }
                var A, L = null,
                N = {
                    available: !1,
                    active: !1,
                    deviceName: ""
                },
                P = r.getAbsolutePath(window.location.href),
                R = null,
                k = null,
                I = null;
                A = d.extend({},
                h, p.get("cast"));
                var x = this;
                this.onExistingSession = function(t) {
                    o.log("existing session", t),
                    L || k || (k = t.session, k.addMessageListener(o.NS, this.listenForHandshakeHandler))
                },
                this.setActive = function(t) {
                    N.active = !!t,
                    N.deviceName = y(),
                    this.castModel.set("castActive", !!t),
                    this.castModel.set("deviceName", y()),
                    this.castModel.set("castState", N)
                },
                this.startCasting = function() {
                    if (!L && !g()) {
                        var t = window.chrome;
                        t.cast.requestSession(this.sessionStarted.bind(this), C)
                    }
                },
                this.openExtension = function() {
                    if (!g()) {
                        var t = window.chrome;
                        t.cast.requestSession(this.sessionStarted.bind(this), E)
                    }
                },
                this.stopCasting = function() {
                    return L ? (this.removeSessionListeners(), void L.stop(this.sessionStopped.bind(this), this.sessionStopError.bind(this))) : void this.sessionStopped()
                },
                this.resumePlayback = function() {
                    u.showView(u._view.element()),
                    u.getProvider().name.indexOf("flash") >= 0 && p.resetProvider(),
                    u.load(this.castModel.get("item")),
                    u.play()
                },
                this.sessionStopError = function(t) {
                    o.error("Cast Session Stop error:", t, L),
                    this.sessionStopped()
                },
                this.sessionStarted = function(t) {
                    if (o.log("Session started:", t), L) this.stopCasting(),
                    I = t;
                    else if (L = t, L.addMessageListener(o.NS, this.onMessageHandler), L.addUpdateListener(this.sessionStatusHandler), this.setupControllerForCasting(), t !== k) {
                        var e = a.setupCastConfig(this.castModel, A);
                        R.setup(e),
                        s.sendDummyMedia(t)
                    }
                },
                this.sessionStatus = function(t) {
                    o.log("Cast Session status", t),
                    t ? this.mirrorVolume() : (this.castModel.set("state", l.BUFFERING), this.sessionStopped())
                },
                this.sessionStopped = function() {
                    o.log("_sessionStopped"),
                    L && (this.removeSessionListeners(), L = null),
                    R && (R.destroy(), R = null),
                    this.setActive(!1),
                    null !== I && (this.sessionStarted(I), I = null),
                    this.resumePlayback()
                },
                this.removeSessionListeners = function() {
                    L.removeUpdateListener(this.sessionStatusHandler),
                    L.removeMessageListener(o.NS, this.onMessageHandler)
                },
                this.onMessage = function(t, e) {
                    var i = JSON.parse(e);
                    if (!i) throw "Message not proper JSON";
                    this.handleMessage(i)
                },
                this.handleMessage = function(t) {
                    switch (t.type) {
                    case "state":
                        this.handleMessageState(t);
                        break;
                    case "ad":
                        this.handleMessageAd(t);
                        break;
                    case "connection":
                        this.handleMessageConnection(t);
                        break;
                    default:
                        o.error("received unhandled message", t.type, t)
                    }
                },
                this.handleMessageState = function(t) {
                    this.castModel.get("castAdPlaying") && (t.diff.newstate || t.diff.position) && this.castModel.set("castAdPlaying", !1),
                    R.updateState(t.diff)
                },
                this.handleMessageAd = function(t) {
                    this.castModel.set("castAdPlaying", !0),
                    R.updateState(t.diff)
                },
                this.handleMessageConnection = function(t) {
                    t.closed === !0 && this.stopCasting()
                },
                this.mirrorVolume = function() {
                    if (L && L.receiver) {
                        var t = L.receiver.volume;
                        if (t) {
                            var e = 100 * t.level | 0,
                            i = !!t.muted;
                            this.castModel.set("mute", i),
                            this.castModel.set("volume", e)
                        }
                    }
                },
                this.castToggle = function() {
                    N.active ? this.openExtension() : this.startCasting()
                },
                this.setupControllerForCasting = function() {
                    u.pause(),
                    u.setFullscreen(!1);
                    var s = d.extend(d.pick(p.getConfiguration(), ["id", "key", "edition", "playlist", "playlistItem", "containerWidth", "containerHeight", "width", "height", "aspectratio", "stretching", "skin"]), {
                        castAvailable: !0,
                        item: 0,
                        state: "playing"
                    }),
                    a = new i(s);
                    a.playlist = d.filter(d.map(a.playlist,
                    function(t) {
                        return r = d.extend({},
                        t),
                        r.sources = d.filter(t.allSources,
                        function(t) {
                            return "dash" !== t.type
                        }),
                        r
                    }),
                    function(t) {
                        return 0 !== t.sources.length
                    });
                    var o = new e;
                    this.castModel = o,
                    o.setup(a);
                    var r = o.get("playlist")[0];
                    o.set("playlistItem", r),
                    o.trigger("itemReady", r),
                    o.changeVideoProvider(n),
                    R = o.getVideo(),
                    R.init(m, this.castModel);
                    var l = b(o, R);
                    l.castToggle = function() {
                        this.openExtension()
                    }.bind(this);
                    var c = new t(l, o);
                    c.setup(),
                    u.showView(c.element()),
                    this.mirrorVolume(),
                    this.setActive(!0)
                },
                this.onExistingSessionHandler = this.onExistingSession.bind(this),
                this.sessionStatusHandler = this.sessionStatus.bind(this),
                this.onMessageHandler = this.onMessage.bind(this),
                this.listenForHandshakeHandler = v.bind(this),
                !A.appid || window.cast && window.cast.receiver || (s.on("availability", f), s.on("session", this.onExistingSessionHandler), s.initialize(A.appid))
            };
            return u
        }.apply(e, s),
        !(void 0 !== n && (t.exports = n))
    },
    95 : function(t, e, i) {
        var s = i(9);
        t.exports = (s["default"] || s).template({
            compiler: [7, ">= 4.0.0"],
            main: function(t, e, i, s, n) {
                var a = t.lambda,
                o = t.escapeExpression;
                return '<div class="jw-cast jw-reset" style="display: block;">\n    <div class="jw-cast-label jw-reset">\n        <span class="jw-reset">' + o(a(null != e ? e.message: e, e)) + '</span>\n        <span class="jw-cast-name jw-reset">' + o(a(null != e ? e.deviceName: e, e)) + "</span>\n    </div>\n</div>"
            },
            useData: !0
        })
    },
    163 : function(t, e, i) {
        var s, n;
        s = [i(2), i(1), i(24)],
        n = function(t, e, i) {
            function s(t, s) {
                var a = e.pick(t.getConfiguration(), ["displaytitle", "id", "item", "key", "mute", "playlist", "position", "repeat", "volume"]);
                return a.cast = e.extend({
                    pageUrl: r
                },
                s),
                n(a),
                a.edition = t.get("edition"),
                a.playerVersion = i,
                "LIVE" === t.get("streamType") && "shaka" === t.getVideo().getName().name && (a.position = 0),
                a
            }
            function n(t) {
                var e = t.plugins;
                delete t.plugins;
                for (var i in e) if (e.hasOwnProperty(i)) {
                    var s = e[i];
                    s.client && (/[\.\/]/.test(s.client) && o(s, "client"), s.client.indexOf("vast") > -1 && (t.advertising = a(s)))
                }
            }
            function a(t) {
                var i = e.extend({},
                t);
                if (i.client = "vast", delete i.companiondiv, i.schedule) for (var s in i.schedule) if (i.schedule.hasOwnProperty(s)) {
                    var n = i.schedule[s].ad || i.schedule[s];
                    o(n, "tag")
                }
                return o(i, "tag"),
                i
            }
            function o(e, i) {
                e[i] && (e[i] = t.getAbsolutePath(e[i]))
            }
            var r = window.location.href;
            return {
                setupCastConfig: s
            }
        }.apply(e, s),
        !(void 0 !== n && (t.exports = n))
    },
    164 : function(t, e, i) {
        var s, n;
        s = [i(28), i(3), i(15), i(4), i(1)],
        n = function(t, e, i, s, n) {
            function a(s) {
                y = s,
                null !== t.availability ? C.trigger("availability", {
                    availability: t.availability
                }) : m && m.cast ? r() : p || (p = new i(f), p.addEventListener(e.ERROR, l), p.addEventListener(e.COMPLETE, r), p.load())
            }
            function o(t) {
                var e = new m.cast.media.MediaInfo("");
                e.contentType = "video/mp4";
                var i = new m.cast.media.LoadRequest(e);
                i.autoplay = !1,
                t.loadMedia(i)
            }
            function r() {
                m && m.cast && m.cast.isAvailable && !g ? (g = new m.cast.ApiConfig(new m.cast.SessionRequest(y), h, u, m.cast.AutoJoinPolicy.ORIGIN_SCOPED), m.cast.initialize(g, c, d)) : S++<15 && (v = setTimeout(r, 1e3))
            }
            function l() {
                p && (p.resetEventListeners(), p = null)
            }
            function d() {
                g = null
            }
            function c() {}
            function h(e) {
                C.trigger("session", {
                    session: e
                }),
                e.sendMessage(t.NS, {
                    whoami: 1
                }),
                0 === e.media.length && o(e)
            }
            function u(e) {
                t.availability = e,
                C.trigger("availability", {
                    availability: e
                })
            }
            var p, g, m = window.chrome,
            f = "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js",
            v = -1,
            S = 0,
            y = null,
            C = n.extend({
                initialize: a,
                sendDummyMedia: o
            },
            s);
            return C
        }.apply(e, s),
        !(void 0 !== n && (t.exports = n))
    },
    165 : function(t, e, i) {
        var s, n;
        s = [i(2), i(95), i(3), i(4), i(5), i(1), i(28)],
        n = function(t, e, i, s, n, a, o) {
            function r(i) {
                var s, n = i.get("castLoading"),
                a = i.get("playlistItem"),
                o = a ? a.title: "";
                s = n ? o ? "Loading " + o + " on ": "Loading on ": o ? "Casting " + o + " to ": "Casting to";
                var r = {
                    message: s,
                    deviceName: i.get("deviceName") || "Google Cast"
                };
                return t.createElement(e(r))
            }
            var l = function() {
                var e, l = -1,
                d = t.noop;
                a.extend(this, s, {
                    lastPosition: 0,
                    lastDuration: null
                }),
                this.setState = function(t) {
                    this.trigger(i.JWPLAYER_PLAYER_STATE, {
                        newstate: t
                    }),
                    this.model.set("state", t)
                },
                this.destroy = function() {
                    clearTimeout(l)
                },
                this.updateState = function(t) {
                    if (t.item) {
                        this.setState(n.BUFFERING);
                        var e = this.model.get("playlist"),
                        s = e[t.item];
                        this.model.set("item", t.item),
                        this.model.set("playlistItem", s),
                        this.model.trigger("itemReady", s)
                    }
                    if (void 0 !== t.position && (this.lastPosition = t.position), void 0 !== t.duration && (this.lastDuration = t.duration), t.newstate) {
                        var o = t.newstate.toLowerCase();
                        o === n.IDLE && this.lastPosition && this.lastPosition === this.lastDuration && (o = n.COMPLETE),
                        this.setState(o)
                    }
                    if (void 0 === t.position && void 0 === t.duration || (this.model.get("state") === n.BUFFERING && this.setState(n.PLAYING), null !== this.lastDuration && this.trigger(i.JWPLAYER_MEDIA_TIME, {
                        position: this.lastPosition,
                        duration: this.lastDuration
                    })), void 0 !== t.buffer && this.trigger(i.JWPLAYER_MEDIA_BUFFER, {
                        bufferPercent: t.buffer
                    }), t.tag) {
                        this.model.set("adMode", t.complete);
                        var r = ["clickthrough", "companions", "message", "podMessage", "podCount", "sequence", "skipMessage", "skipText", "skipOffset", "tag"];
                        a.each(r,
                        function(e) {
                            a.isUndefined(t[e]) || this.model.set(e, t[e])
                        },
                        this)
                    }
                },
                this.supportsFullscreen = function() {
                    return ! 1
                },
                this.init = function(t, e) {
                    d = t,
                    this.model = e,
                    this.model.on("itemReady", this.updateScreen, this),
                    this.model.on("change:deviceName", this.updateScreen, this),
                    this._castingScreen = r(this.model)
                },
                this.setup = function(t) {
                    this.setState(n.BUFFERING),
                    this.sendCommand("setup", t)
                },
                this.playlistItem = function(t) {
                    this.setState(n.BUFFERING),
                    this.sendCommand("item", t)
                },
                this.load = function(t) {
                    this.setState(n.BUFFERING),
                    this.sendCommand("load", t)
                },
                this.stop = function() {
                    clearTimeout(l),
                    l = setTimeout(function() {
                        this.setState(n.IDLE),
                        this.sendCommand("stop")
                    }.bind(this), 0)
                },
                this.play = function() {
                    this.sendCommand("play")
                },
                this.pause = function() {
                    this.setState(n.PAUSED),
                    this.sendCommand("pause")
                },
                this.seek = function(t) {
                    this.setState(n.BUFFERING),
                    this.trigger(i.JWPLAYER_MEDIA_SEEK, {
                        position: this.model.get("position"),
                        offset: t
                    }),
                    this.sendCommand("seek", t)
                },
                this.skipAd = function(t) {
                    this.sendCommand("skipAd", {
                        tag: t.tag
                    })
                },
                this.clickAd = function(t) {
                    this.sendCommand("clickAd", {
                        tag: t.tag
                    })
                },
                this.audioMode = function() {
                    return this.model.get("audioMode")
                },
                this.sendCommand = function(t, e) {
                    d(t, e)
                },
                this.detachMedia = function() {
                    return o.error("detachMedia called while casting"),
                    document.createElement("video")
                },
                this.attachMedia = function() {
                    o.error("attachMedia called while casting")
                },
                this.updateScreen = function() {
                    e.innerHTML = r(this.model).innerHTML
                },
                this.setContainer = function(t) {
                    e = t,
                    t.appendChild(this._castingScreen)
                },
                this.getContainer = function() {
                    return e
                },
                this.remove = function() {
                    e === this._castingScreen.parentNode && e.removeChild(this._castingScreen)
                },
                this.volume = this.mute = this.setControls = this.setCurrentQuality = this.resize = this.seekDrag = this.addCaptions = this.resetCaptions = this.setVisibility = this.fsCaptions = t.noop,
                this.setFullScreen = this.getFullScreen = this.checkComplete = a.constant(!1),
                this.getWidth = this.getHeight = this.getCurrentQuality = a.constant(0),
                this.getQualityLevels = a.constant(["Auto"])
            };
            return l.prototype = {
                getName: function() {
                    return {
                        name: "chromecast"
                    }
                }
            },
            l
        }.apply(e, s),
        !(void 0 !== n && (t.exports = n))
    }
});