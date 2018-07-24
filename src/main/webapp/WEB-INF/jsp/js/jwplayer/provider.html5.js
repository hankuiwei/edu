webpackJsonpjwplayer([4], {
    12 : function(e, t, i) {
        var r, a;
        r = [i(1), i(14), i(2), i(19), i(18)],
        a = function(e, t, i, r, a) {
            function n(t) {
                if (this._currentTextTrackIndex = -1, t) {
                    if (this._textTracks ? (this._textTracks = e.reject(this._textTracks,
                    function(e) {
                        if (this.renderNatively && "nativecaptions" === e._id) return delete this._tracksById[e._id],
                        !0
                    },
                    this), delete this._tracksById.nativemetadata) : this._initTextTracks(), t.length) {
                        var r = 0,
                        n = t.length;
                        for (r; r < n; r++) {
                            var s = t[r];
                            if (!s._id) {
                                if ("captions" === s.kind || "metadata" === s.kind) {
                                    if (s._id = "native" + s.kind, !s.label && "captions" === s.kind) {
                                        var c = a.createLabel(s, this._unknownCount);
                                        s.name = c.label,
                                        this._unknownCount = c.unknownCount
                                    }
                                } else s._id = a.createId(s, this._textTracks.length);
                                if (this._tracksById[s._id]) continue;
                                s.inuse = !0
                            }
                            if (s.inuse && !this._tracksById[s._id]) if ("metadata" === s.kind) s.mode = "hidden",
                            s.oncuechange = C.bind(this),
                            this._tracksById[s._id] = s;
                            else if (E(s.kind)) {
                                var o, d = s.mode;
                                if (s.mode = "hidden", !s.cues.length && s.embedded) continue;
                                if (s.mode = d, this._cuesByTrackId[s._id] && !this._cuesByTrackId[s._id].loaded) {
                                    for (var u = this._cuesByTrackId[s._id].cues; o = u.shift();) x(s, o);
                                    s.mode = d,
                                    this._cuesByTrackId[s._id].loaded = !0
                                }
                                A.call(this, s)
                            }
                        }
                    }
                    this.renderNatively && (this.textTrackChangeHandler = this.textTrackChangeHandler || v.bind(this), this.addTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), (i.isEdge() || i.isFF()) && (this.addTrackHandler = this.addTrackHandler || y.bind(this), this.addTracksListener(this.video.textTracks, "addtrack", this.addTrackHandler))),
                    this._textTracks.length && this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    })
                }
            }
            function s(e) {
                if (this.renderNatively) {
                    var t = e === this._itemTracks;
                    t || r.cancelXhr(this._itemTracks),
                    this._itemTracks = e,
                    e && (t || (this.disableTextTrack(), L.call(this), this.addTextTracks(e)))
                }
            }
            function c() {
                return this._currentTextTrackIndex
            }
            function o(t) {
                this._textTracks && (0 === t && e.each(this._textTracks,
                function(e) {
                    e.mode = e.embedded ? "hidden": "disabled"
                }), this._currentTextTrackIndex !== t - 1 && (this.disableTextTrack(), this._currentTextTrackIndex = t - 1, this.renderNatively && (this._textTracks[this._currentTextTrackIndex] && (this._textTracks[this._currentTextTrackIndex].mode = "showing"), this.trigger("subtitlesTrackChanged", {
                    currentTrack: this._currentTextTrackIndex + 1,
                    tracks: this._textTracks
                }))))
            }
            function d(e) {
                if (e.text && e.begin && e.end) {
                    var t = e.trackid.toString(),
                    i = this._tracksById && this._tracksById[t];
                    i || (i = {
                        kind: "captions",
                        _id: t,
                        data: []
                    },
                    this.addTextTracks([i]), this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    }));
                    var a;
                    e.useDTS && (i.source || (i.source = e.source || "mpegts")),
                    a = e.begin + "_" + e.text;
                    var n = this._metaCuesByTextTime[a];
                    if (!n) {
                        n = {
                            begin: e.begin,
                            end: e.end,
                            text: e.text
                        },
                        this._metaCuesByTextTime[a] = n;
                        var s = r.convertToVTTCues([n])[0];
                        i.data.push(s)
                    }
                }
            }
            function u(e) {
                this._tracksById || this._initTextTracks();
                var t = "native" + e.type,
                i = this._tracksById[t],
                r = "captions" === e.type ? "Unknown CC": "ID3 Metadata",
                a = e.cue;
                if (!i) {
                    var n = {
                        kind: e.type,
                        _id: t,
                        label: r,
                        embedded: !0
                    };
                    i = I.call(this, n),
                    this.renderNatively || "metadata" === i.kind ? this.setTextTracks(this.video.textTracks) : _.call(this, [i])
                }
                S.call(this, i, a) && (this.renderNatively || "metadata" === i.kind ? x(i, a) : i.data.push(a))
            }
            function l(e) {
                var t = this._tracksById[e.name];
                if (t) {
                    t.source = e.source;
                    for (var i = e.captions || [], a = [], n = !1, s = 0; s < i.length; s++) {
                        var c = i[s],
                        o = e.name + "_" + c.begin + "_" + c.end;
                        this._metaCuesByTextTime[o] || (this._metaCuesByTextTime[o] = c, a.push(c), n = !0)
                    }
                    n && a.sort(function(e, t) {
                        return e.begin - t.begin
                    });
                    var d = r.convertToVTTCues(a);
                    Array.prototype.push.apply(t.data, d)
                }
            }
            function h(e, t, i) {
                e && (f(e, t, i), this.instreamMode || (e.addEventListener ? e.addEventListener(t, i) : e["on" + t] = i))
            }
            function f(e, t, i) {
                e && (e.removeEventListener ? e.removeEventListener(t, i) : e["on" + t] = null)
            }
            function T() {
                r.cancelXhr(this._itemTracks);
                var e = this._tracksById && this._tracksById.nativemetadata; (this.renderNatively || e) && (b.call(this, this.video.textTracks), e && (e.oncuechange = null)),
                this._itemTracks = null,
                this._textTracks = null,
                this._tracksById = null,
                this._cuesByTrackId = null,
                this._metaCuesByTextTime = null,
                this._unknownCount = 0,
                this._activeCuePosition = null,
                this.renderNatively && (this.removeTracksListener(this.video.textTracks, "change", this.textTrackChangeHandler), b.call(this, this.video.textTracks))
            }
            function k() {
                if (this._textTracks) {
                    var e = this._textTracks[this._currentTextTrackIndex];
                    e && (e.mode = e.embedded || "nativecaptions" === e._id ? "hidden": "disabled")
                }
            }
            function g() {
                if (this._textTracks) {
                    var e = this._textTracks[this._currentTextTrackIndex];
                    e && (e.mode = "showing")
                }
            }
            function v() {
                var t = this.video.textTracks,
                i = e.filter(t,
                function(e) {
                    return (e.inuse || !e._id) && E(e.kind)
                });
                if (!this._textTracks || M.call(this, i)) return void this.setTextTracks(t);
                var r = -1,
                a = 0;
                for (a; a < this._textTracks.length; a++) if ("showing" === this._textTracks[a].mode) {
                    r = a;
                    break
                }
                r !== this._currentTextTrackIndex && this.setSubtitlesTrack(r + 1)
            }
            function y() {
                this.setTextTracks(this.video.textTracks)
            }
            function _(e) {
                if (e) {
                    this._textTracks || this._initTextTracks();
                    for (var t = 0; t < e.length; t++) {
                        var i = e[t];
                        if (!i.kind || E(i.kind)) {
                            var a = I.call(this, i);
                            A.call(this, a),
                            i.file && (i.data = [], r.loadFile(i, this.addVTTCuesToTrack.bind(this, a), R))
                        }
                    } ! this.renderNatively && this._textTracks && this._textTracks.length && this.trigger("subtitlesTracks", {
                        tracks: this._textTracks
                    })
                }
            }
            function m(e, t) {
                if (this.renderNatively) {
                    var i = this._tracksById[e._id];
                    if (!i) return this._cuesByTrackId || (this._cuesByTrackId = {}),
                    void(this._cuesByTrackId[e._id] = {
                        cues: t,
                        loaded: !1
                    });
                    if (!this._cuesByTrackId[e._id] || !this._cuesByTrackId[e._id].loaded) {
                        var r;
                        for (this._cuesByTrackId[e._id] = {
                            cues: t,
                            loaded: !0
                        }; r = t.shift();) x(i, r)
                    }
                }
            }
            function p() {
                var e = this.video.textTracks;
                e && b(e, !0)
            }
            function x(e, t) {
                if (!i.isEdge() || !window.TextTrackCue) return void e.addCue(t);
                var r = new window.TextTrackCue(t.startTime, t.endTime, t.text);
                e.addCue(r)
            }
            function b(t, i) {
                t.length && e.each(t,
                function(e) {
                    e.mode = "disabled",
                    e.mode = "hidden";
                    for (var t = e.cues.length; t--;) e.removeCue(e.cues[t]);
                    e.embedded || (e.mode = "disabled"),
                    i || (e.inuse = !1)
                })
            }
            function E(e) {
                return "subtitles" === e || "captions" === e
            }
            function w() {
                this._textTracks = [],
                this._tracksById = {},
                this._metaCuesByTextTime = {},
                this._cuesByTrackId = {},
                this._cachedVTTCues = {},
                this._unknownCount = 0
            }
            function I(t) {
                var i, r = a.createLabel(t, this._unknownCount),
                n = r.label;
                if (this._unknownCount = r.unknownCount, this.renderNatively || "metadata" === t.kind) {
                    var s = this.video.textTracks;
                    i = e.findWhere(s, {
                        label: n
                    }),
                    i ? (i.kind = t.kind, i.language = t.language || "") : i = this.video.addTextTrack(t.kind, n, t.language || ""),
                    i["default"] = t["default"],
                    i.mode = "disabled",
                    i.inuse = !0
                } else i = t,
                i.data = i.data || [];
                return i._id || (i._id = a.createId(t, this._textTracks.length)),
                i
            }
            function A(e) {
                this._textTracks.push(e),
                this._tracksById[e._id] = e
            }
            function L() {
                if (this._textTracks) {
                    var t = e.filter(this._textTracks,
                    function(e) {
                        return e.embedded || "subs" === e.groupid
                    });
                    this._initTextTracks(),
                    e.each(t,
                    function(e) {
                        this._tracksById[e._id] = e
                    }),
                    this._textTracks = t
                }
            }
            function C(i) {
                var r = i.currentTarget.activeCues;
                if (r && r.length) {
                    var a = r[r.length - 1].startTime;
                    if (this._activeCuePosition !== a) {
                        var n = [];
                        if (e.each(r,
                        function(e) {
                            e.startTime < a || (e.data || e.value ? n.push(e) : e.text && this.trigger("meta", {
                                metadataTime: a,
                                metadata: JSON.parse(e.text)
                            }))
                        },
                        this), n.length) {
                            var s = t.parseID3(n);
                            this.trigger("meta", {
                                metadataTime: a,
                                metadata: s
                            })
                        }
                        this._activeCuePosition = a
                    }
                }
            }
            function S(e, t) {
                var i = e.kind;
                this._cachedVTTCues[e._id] || (this._cachedVTTCues[e._id] = {});
                var r, a = this._cachedVTTCues[e._id];
                switch (i) {
                case "captions":
                    r = Math.floor(20 * t.startTime);
                    var n = Math.floor(20 * t.endTime),
                    s = a[r] || a[r + 1] || a[r - 1];
                    return ! (s && Math.abs(s - n) <= 1) && (a[r] = n, !0);
                case "metadata":
                    var c = t.data ? new Uint8Array(t.data).join("") : t.text;
                    return r = t.startTime + c,
                    !a[r] && (a[r] = t.endTime, !0)
                }
            }
            function M(e) {
                if (e.length > this._textTracks.length) return ! 0;
                for (var t = 0; t < e.length; t++) {
                    var i = e[t];
                    if (!i._id || !this._tracksById[i._id]) return ! 0
                }
                return ! 1
            }
            function R(e) {
                i.log("CAPTIONS(" + e + ")")
            }
            var B = {
                _itemTracks: null,
                _textTracks: null,
                _tracksById: null,
                _cuesByTrackId: null,
                _cachedVTTCues: null,
                _metaCuesByTextTime: null,
                _currentTextTrackIndex: -1,
                _unknownCount: 0,
                _activeCuePosition: null,
                _initTextTracks: w,
                addTracksListener: h,
                clearCues: p,
                clearTracks: T,
                disableTextTrack: k,
                enableTextTrack: g,
                getSubtitlesTrack: c,
                removeTracksListener: f,
                addTextTracks: _,
                setTextTracks: n,
                setupSideloadedTracks: s,
                setSubtitlesTrack: o,
                textTrackChangeHandler: null,
                addTrackHandler: null,
                addCuesToTrack: l,
                addCaptionsCue: d,
                addVTTCue: u,
                addVTTCuesToTrack: m,
                renderNatively: !1
            };
            return B
        }.apply(t, r),
        !(void 0 !== a && (e.exports = a))
    },
    71 : function(e, t, i) {
        var r, a;
        r = [i(133), i(60), i(3), i(1)],
        a = function(e, t, i, r) {
            function a(e, a) {
                function l(i) {
                    var a = i.target,
                    c = i.initData;
                    if (a.webkitKeys || a.webkitSetMediaKeys(new window.WebKitMediaKeys("com.apple.fps.1_0")), !a.webkitKeys) throw new Error("Could not create MediaKeys");
                    var u = e.fairplay;
                    u.initData = c,
                    t.ajax(u.certificateUrl,
                    function(e) {
                        var t = new Uint8Array(e.response),
                        i = u.extractContentId(d(c));
                        r.isString(i) && (i = o(i));
                        var l = n(c, i, t),
                        h = a.webkitKeys.createSession("video/mp4", l);
                        if (!h) throw new Error("Could not create key session");
                        s(h, "webkitkeymessage", f),
                        s(h, "webkitkeyerror", v),
                        u.session = h
                    },
                    g, {
                        responseType: "arraybuffer"
                    })
                }
                function f(t) {
                    var i = e.fairplay,
                    a = t.target,
                    n = t.message,
                    s = new XMLHttpRequest;
                    s.responseType = i.licenseResponseType,
                    s.addEventListener("load", T, !1),
                    s.addEventListener("error", y, !1);
                    var c = "";
                    c = r.isFunction(i.processSpcUrl) ? i.processSpcUrl(d(i.initData)) : i.processSpcUrl,
                    s.open("POST", c, !0),
                    r.each(i.licenseRequestHeaders,
                    function(e) {
                        s.setRequestHeader(e.name, e.value)
                    });
                    var o = i.licenseRequestMessage(n, a);
                    s.send(o)
                }
                function T(t) {
                    var i = t.target,
                    a = e.fairplay.extractKey(i.response);
                    r.isFunction(a.then) ? a.then(k) : k(a)
                }
                function k(t) {
                    var i = e.fairplay.session,
                    a = t;
                    r.isString(a) && (a = u(a)),
                    i.update(a)
                }
                function g() {
                    e.trigger(i.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: Failed to retrieve the server certificate"
                    })
                }
                function v() {
                    e.trigger(i.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: Decryption key error was encountered"
                    })
                }
                function y() {
                    e.trigger(i.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: The license request failed"
                    })
                }
                var _ = a.sources[0];
                if (!e.fairplay || e.fairplay.source !== _) {
                    var m = _.drm;
                    m && m.fairplay ? (e.fairplay = r.extend({},
                    h, m.fairplay), e.fairplay.source = _, e.fairplay.destroy = function() {
                        c(e.video, "webkitneedkey", l);
                        var t = this.session;
                        t && (c(t, "webkitkeymessage", f), c(t, "webkitkeyerror", v)),
                        e.fairplay = null
                    },
                    s(e.video, "webkitneedkey", l)) : e.fairplay && e.fairplay.destroy()
                }
            }
            function n(e, t, i) {
                var r = 0,
                a = new ArrayBuffer(e.byteLength + 4 + t.byteLength + 4 + i.byteLength),
                n = new DataView(a),
                s = new Uint8Array(a, r, e.byteLength);
                s.set(e),
                r += e.byteLength,
                n.setUint32(r, t.byteLength, !0),
                r += 4;
                var c = new Uint16Array(a, r, t.length);
                c.set(t),
                r += c.byteLength,
                n.setUint32(r, i.byteLength, !0),
                r += 4;
                var o = new Uint8Array(a, r, i.byteLength);
                return o.set(i),
                new Uint8Array(a, 0, a.byteLength)
            }
            function s(e, t, i) {
                c(e, t, i),
                e.addEventListener(t, i, !1)
            }
            function c(e, t, i) {
                e && e.removeEventListener(t, i)
            }
            function o(e) {
                for (var t = new ArrayBuffer(2 * e.length), i = new Uint16Array(t), r = 0, a = e.length; r < a; r++) i[r] = e.charCodeAt(r);
                return i
            }
            function d(e) {
                var t = new Uint16Array(e.buffer);
                return String.fromCharCode.apply(null, t)
            }
            function u(e) {
                for (var t = window.atob(e), i = t.length, r = new Uint8Array(new ArrayBuffer(i)), a = 0; a < i; a++) r[a] = t.charCodeAt(a);
                return r
            }
            var l = function(t, i) {
                e.call(this, t, i);
                var r = this.init,
                n = this.load,
                s = this.destroy;
                this.init = function(e) {
                    a(this, e),
                    r.call(this, e)
                },
                this.load = function(e) {
                    a(this, e),
                    n.call(this, e)
                },
                this.destroy = function(e) {
                    this.fairplay && this.fairplay.destroy(),
                    s.call(this, e)
                }
            },
            h = {
                certificateUrl: "",
                processSpcUrl: "",
                licenseResponseType: "arraybuffer",
                licenseRequestHeaders: [],
                licenseRequestMessage: function(e) {
                    return e
                },
                extractContentId: function(e) {
                    return e.split("skd://")[1]
                },
                extractKey: function(e) {
                    return new Uint8Array(e)
                }
            };
            return l.getName = e.getName,
            l
        }.apply(t, r),
        !(void 0 !== a && (e.exports = a))
    },
    133 : function(e, t, i) {
        var r, a;
        r = [i(58), i(23), i(2), i(32), i(1), i(3), i(5), i(13), i(4), i(12), i(27)],
        a = function(e, t, i, r, a, n, s, c, o, d) {
            function u(e, t) {
                i.foreach(e,
                function(e, i) {
                    t.addEventListener(e, i, !1)
                })
            }
            function l(e, t) {
                i.foreach(e,
                function(e, i) {
                    t.removeEventListener(e, i, !1)
                })
            }
            function h(h, w) {
                function I(e, t) {
                    He.setAttribute(e, t || "")
                }
                function A() {
                    Ae && (le(He.audioTracks), pe.setTextTracks(He.textTracks), I("jw-loaded", "data"))
                }
                function L() {
                    Ae && I("jw-loaded", "started")
                }
                function C(e) {
                    pe.trigger("click", e)
                }
                function S() {
                    Ae && !Ce && (F(N()), D(ae(), ye, ve))
                }
                function M() {
                    Ae && D(ae(), ye, ve)
                }
                function R() {
                    f(we),
                    be = !0,
                    Ae && (pe.state === s.STALLED ? pe.setState(s.PLAYING) : pe.state === s.PLAYING && (we = setTimeout(re, T)), Ce && He.duration === 1 / 0 && 0 === He.currentTime || (F(N()), P(He.currentTime), D(ae(), ye, ve), pe.state === s.PLAYING && (pe.trigger(n.JWPLAYER_MEDIA_TIME, {
                        position: ye,
                        duration: ve
                    }), B())))
                }
                function B() {
                    var e = Fe.level;
                    if (e.width !== He.videoWidth || e.height !== He.videoHeight) {
                        if (e.width = He.videoWidth, e.height = He.videoHeight, ke(), !e.width || !e.height || Le === -1) return;
                        Fe.reason = Fe.reason || "auto",
                        Fe.mode = "hls" === me[Le].type ? "auto": "manual",
                        Fe.bitrate = 0,
                        e.index = Le,
                        e.label = me[Le].label,
                        pe.trigger("visualQuality", Fe),
                        Fe.reason = ""
                    }
                }
                function D(e, t, i) {
                    0 === i || e === Ie && i === ve || (Ie = e, pe.trigger(n.JWPLAYER_MEDIA_BUFFER, {
                        bufferPercent: 100 * e,
                        position: t,
                        duration: i
                    }))
                }
                function P(e) {
                    ve < 0 && (e = -(ee() - e)),
                    ye = e
                }
                function N() {
                    var e = He.duration,
                    t = ee();
                    if (e === 1 / 0 && t) {
                        var i = t - $();
                        i !== 1 / 0 && i > k && (e = -i)
                    }
                    return e
                }
                function F(e) {
                    ve = e,
                    Ee && e && e !== 1 / 0 && pe.seek(Ee)
                }
                function O() {
                    var e = N();
                    Ce && e === 1 / 0 && (e = 0),
                    pe.trigger(n.JWPLAYER_MEDIA_META, {
                        duration: e,
                        height: He.videoHeight,
                        width: He.videoWidth
                    }),
                    F(e)
                }
                function j() {
                    Ae && (be = Oe = !0, Ce || ke(), v && pe.setTextTracks(pe._textTracks), W())
                }
                function H() {
                    Ae && (I("jw-loaded", "meta"), O())
                }
                function W() {
                    _e || i.isIOS() && !Oe || (_e = !0, Oe = !1, pe.trigger(n.JWPLAYER_MEDIA_BUFFER_FULL))
                }
                function U() {
                    pe.setState(s.PLAYING),
                    He.hasAttribute("jw-played") || I("jw-played", ""),
                    He.hasAttribute("jw-gesture-required") && He.removeAttribute("jw-gesture-required"),
                    pe.trigger(n.JWPLAYER_PROVIDER_FIRST_FRAME, {})
                }
                function Y() {
                    pe.state !== s.COMPLETE && He.hasAttribute("jw-played") && He.currentTime !== He.duration && pe.setState(s.PAUSED)
                }
                function J() {
                    if (! (Ce || He.paused || He.ended || pe.state === s.LOADING || pe.state === s.ERROR || pe.seeking)) return i.isIOS() && He.duration - He.currentTime <= .1 ? void ne() : void pe.setState(s.STALLED)
                }
                function q() {
                    Ae && pe.trigger(n.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: File could not be played"
                    })
                }
                function V(e) {
                    var t;
                    return "array" === i.typeOf(e) && e.length > 0 && (t = a.map(e,
                    function(e, t) {
                        return {
                            label: e.label || t
                        }
                    })),
                    t
                }
                function K(e) {
                    me = e,
                    Le = G(e);
                    var t = V(e);
                    t && pe.trigger(n.JWPLAYER_MEDIA_LEVELS, {
                        levels: t,
                        currentQuality: Le
                    })
                }
                function G(e) {
                    var t = Math.max(0, Le),
                    i = w.qualityLabel;
                    if (e) for (var r = 0; r < e.length; r++) if (e[r]["default"] && (t = r), i && e[r].label === i) return r;
                    return Fe.reason = "initial choice",
                    Fe.level = {},
                    t
                }
                function Q() {
                    var e = He.play();
                    e && e["catch"] ? e["catch"](function(e) {
                        console.warn(e),
                        "NotAllowedError" === e.name && He.hasAttribute("jw-gesture-required") && pe.trigger("autoplayFailed")
                    }) : He.hasAttribute("jw-gesture-required") && pe.trigger("autoplayFailed")
                }
                function X(e, t) {
                    Ee = 0,
                    f(we);
                    var r = document.createElement("source");
                    r.src = me[Le].file;
                    var a = He.src !== r.src,
                    n = He.getAttribute("jw-loaded"),
                    c = He.hasAttribute("jw-played");
                    a || "none" === n || "started" === n ? (ve = t, z(me[Le]), pe.setupSideloadedTracks(pe._itemTracks), He.load()) : (0 === e && He.currentTime > 0 && (Ee = -1, pe.seek(e)), Q()),
                    ye = He.currentTime,
                    _ && !c && (W(), He.paused || pe.state === s.PLAYING || pe.setState(s.LOADING)),
                    i.isIOS() && pe.getFullScreen() && (He.controls = !0),
                    e > 0 && pe.seek(e)
                }
                function z(t) {
                    De = null,
                    Pe = -1,
                    Ne = -1,
                    Fe.reason || (Fe.reason = "initial choice", Fe.level = {}),
                    be = !1,
                    _e = !1,
                    Ce = e(t),
                    t.preload && t.preload !== He.getAttribute("preload") && I("preload", t.preload);
                    var i = document.createElement("source");
                    i.src = t.file;
                    var r = He.src !== i.src;
                    r && (I("jw-loaded", "none"), He.src = t.file)
                }
                function Z() {
                    He && (pe.disableTextTrack(), He.removeAttribute("preload"), He.removeAttribute("src"), He.removeAttribute("jw-loaded"), He.removeAttribute("jw-played"), r.emptyElement(He), Le = -1, !y && "load" in He && He.load())
                }
                function $() {
                    for (var e = He.seekable ? He.seekable.length: 0, t = 1 / 0; e--;) t = Math.min(t, He.seekable.start(e));
                    return t
                }
                function ee() {
                    for (var e = He.seekable ? He.seekable.length: 0, t = 0; e--;) t = Math.max(t, He.seekable.end(e));
                    return t
                }
                function te() {
                    pe.seeking = !1,
                    pe.trigger(n.JWPLAYER_MEDIA_SEEKED)
                }
                function ie() {
                    pe.trigger("volume", {
                        volume: Math.round(100 * He.volume)
                    }),
                    pe.trigger("mute", {
                        mute: He.muted
                    })
                }
                function re() {
                    He.currentTime === ye && J()
                }
                function ae() {
                    var e = He.buffered,
                    t = He.duration;
                    return ! e || 0 === e.length || t <= 0 || t === 1 / 0 ? 0 : i.between(e.end(e.length - 1) / t, 0, 1)
                }
                function ne() {
                    if (Ae && pe.state !== s.IDLE && pe.state !== s.COMPLETE) {
                        if (f(we), Le = -1, Me = !0, pe.trigger(n.JWPLAYER_MEDIA_BEFORECOMPLETE), !Ae) return;
                        se()
                    }
                }
                function se() {
                    f(we),
                    pe.setState(s.COMPLETE),
                    Me = !1,
                    pe.trigger(n.JWPLAYER_MEDIA_COMPLETE)
                }
                function ce(e) {
                    Re = !0,
                    ue(e),
                    i.isIOS() && (He.controls = !1)
                }
                function oe() {
                    for (var e = -1,
                    t = 0; t < He.audioTracks.length; t++) if (He.audioTracks[t].enabled) {
                        e = t;
                        break
                    }
                    he(e)
                }
                function de(e) {
                    Re = !1,
                    ue(e),
                    i.isIOS() && (He.controls = !1)
                }
                function ue(e) {
                    pe.trigger("fullscreenchange", {
                        target: e.target,
                        jwstate: Re
                    })
                }
                function le(e) {
                    if (De = null, e) {
                        if (e.length) {
                            for (var t = 0; t < e.length; t++) if (e[t].enabled) {
                                Pe = t;
                                break
                            }
                            Pe === -1 && (Pe = 0, e[Pe].enabled = !0),
                            De = a.map(e,
                            function(e) {
                                var t = {
                                    name: e.label || e.language,
                                    language: e.language
                                };
                                return t
                            })
                        }
                        pe.addTracksListener(e, "change", oe),
                        De && pe.trigger("audioTracks", {
                            currentTrack: Pe,
                            tracks: De
                        })
                    }
                }
                function he(e) {
                    He && He.audioTracks && De && e > -1 && e < He.audioTracks.length && e !== Pe && (He.audioTracks[Pe].enabled = !1, Pe = e, He.audioTracks[Pe].enabled = !0, pe.trigger("audioTrackChanged", {
                        currentTrack: Pe,
                        tracks: De
                    }))
                }
                function fe() {
                    return De || []
                }
                function Te() {
                    return Pe
                }
                function ke() {
                    if ("hls" === me[0].type) {
                        var e = "video";
                        0 === He.videoHeight && (e = "audio"),
                        pe.trigger("mediaType", {
                            mediaType: e
                        })
                    }
                }
                this.state = s.IDLE,
                this.seeking = !1,
                a.extend(this, o, d),
                this.renderNatively = i.isChrome() || i.isIOS() || i.isSafari() || i.isEdge(),
                this.trigger = function(e, t) {
                    if (Ae) return o.trigger.call(this, e, t)
                },
                this.setState = function(e) {
                    return c.setState.call(this, e)
                };
                var ge, ve, ye, _e, me, pe = this,
                xe = {
                    click: C,
                    durationchange: S,
                    ended: ne,
                    error: q,
                    loadstart: L,
                    loadeddata: A,
                    loadedmetadata: H,
                    canplay: j,
                    playing: U,
                    progress: M,
                    pause: Y,
                    seeked: te,
                    timeupdate: R,
                    volumechange: ie,
                    webkitbeginfullscreen: ce,
                    webkitendfullscreen: de
                },
                be = !1,
                Ee = 0,
                we = -1,
                Ie = -1,
                Ae = !0,
                Le = -1,
                Ce = null,
                Se = !!w.sdkplatform,
                Me = !1,
                Re = !1,
                Be = i.noop,
                De = null,
                Pe = -1,
                Ne = -1,
                Fe = {
                    level: {}
                },
                Oe = !1,
                je = document.getElementById(h),
                He = je ? je.querySelector("video") : void 0;
                He || (He = document.createElement("video"), _ && I("jw-gesture-required")),
                He.className = "jw-video jw-reset",
                this.isSDK = Se,
                this.video = He,
                a.isObject(w.cast) && w.cast.appid && I("disableRemotePlayback", ""),
                u(xe, He),
                I("x-webkit-airplay", "allow"),
                I("webkit-playsinline"),
                I("playsinline"),
                this.stop = function() {
                    f(we),
                    Ae && (Z(), this.clearTracks(), i.isIE() && He.pause(), this.setState(s.IDLE))
                },
                this.destroy = function() {
                    Be = i.noop,
                    l(xe, He),
                    this.removeTracksListener(He.audioTracks, "change", oe),
                    this.removeTracksListener(He.textTracks, "change", pe.textTrackChangeHandler),
                    this.remove(),
                    this.off()
                },
                this.init = function(e) {
                    Ae && (me = e.sources, Le = G(e.sources), e.sources.length && "hls" !== e.sources[0].type && this.sendMediaType(e.sources), ye = e.starttime || 0, ve = e.duration || 0, Fe.reason = "", z(me[Le]), this.setupSideloadedTracks(e.tracks))
                },
                this.load = function(e) {
                    Ae && (K(e.sources), e.sources.length && "hls" !== e.sources[0].type && this.sendMediaType(e.sources), _ && !He.hasAttribute("jw-played") || pe.setState(s.LOADING), X(e.starttime || 0, e.duration || 0))
                },
                this.play = function() {
                    return pe.seeking ? (pe.setState(s.LOADING), void pe.once(n.JWPLAYER_MEDIA_SEEKED, pe.play)) : (Be(), void Q())
                },
                this.pause = function() {
                    f(we),
                    He.pause(),
                    Be = function() {
                        var e = He.paused && He.currentTime;
                        if (e && He.duration === 1 / 0) {
                            var t = ee(),
                            i = t - $(),
                            r = i < k,
                            a = t - He.currentTime;
                            r && t && (a > 15 || a < 0) && (He.currentTime = Math.max(t - 10, t - i))
                        }
                    },
                    this.setState(s.PAUSED)
                },
                this.seek = function(e) {
                    if (Ae) if (e < 0 && (e += $() + ee()), 0 === Ee && this.trigger(n.JWPLAYER_MEDIA_SEEK, {
                        position: He.currentTime,
                        offset: e
                    }), be || (be = !!ee()), be) {
                        Ee = 0;
                        try {
                            pe.seeking = !0,
                            He.currentTime = e
                        } catch(t) {
                            pe.seeking = !1,
                            Ee = e
                        }
                    } else Ee = e,
                    m && He.paused && Q()
                },
                this.volume = function(e) {
                    e = i.between(e / 100, 0, 1),
                    He.volume = e
                },
                this.mute = function(e) {
                    He.muted = !!e
                },
                this.checkComplete = function() {
                    return Me
                },
                this.detachMedia = function() {
                    return f(we),
                    this.removeTracksListener(He.textTracks, "change", this.textTrackChangeHandler),
                    this.disableTextTrack(),
                    Ae = !1,
                    He
                },
                this.attachMedia = function() {
                    Ae = !0,
                    be = !1,
                    this.seeking = !1,
                    He.loop = !1,
                    this.enableTextTrack(),
                    this.addTracksListener(He.textTracks, "change", this.textTrackChangeHandler),
                    Me && se()
                },
                this.setContainer = function(e) {
                    ge = e,
                    e.appendChild(He)
                },
                this.getContainer = function() {
                    return ge
                },
                this.remove = function() {
                    Z(),
                    f(we),
                    ge === He.parentNode && ge.removeChild(He)
                },
                this.setVisibility = function(e) {
                    e = !!e,
                    e || p ? t.style(ge, {
                        visibility: "visible",
                        opacity: 1
                    }) : t.style(ge, {
                        visibility: "",
                        opacity: 0
                    })
                },
                this.resize = function(e, i, r) {
                    if (! (e && i && He.videoWidth && He.videoHeight)) return ! 1;
                    var a = {
                        objectFit: "",
                        width: "",
                        height: ""
                    };
                    if ("uniform" === r) {
                        var n = e / i,
                        s = He.videoWidth / He.videoHeight;
                        Math.abs(n - s) < .09 && (a.objectFit = "fill", r = "exactfit")
                    }
                    var c = g || p || x || b;
                    if (c) {
                        var o = -Math.floor(He.videoWidth / 2 + 1),
                        d = -Math.floor(He.videoHeight / 2 + 1),
                        u = Math.ceil(100 * e / He.videoWidth) / 100,
                        l = Math.ceil(100 * i / He.videoHeight) / 100;
                        "none" === r ? u = l = 1 : "fill" === r ? u = l = Math.max(u, l) : "uniform" === r && (u = l = Math.min(u, l)),
                        a.width = He.videoWidth,
                        a.height = He.videoHeight,
                        a.top = a.left = "50%",
                        a.margin = 0,
                        t.transform(He, "translate(" + o + "px, " + d + "px) scale(" + u.toFixed(2) + ", " + l.toFixed(2) + ")")
                    }
                    return t.style(He, a),
                    !1
                },
                this.setFullscreen = function(e) {
                    if (e = !!e) {
                        var t = i.tryCatch(function() {
                            var e = He.webkitEnterFullscreen || He.webkitEnterFullScreen;
                            e && e.apply(He)
                        });
                        return ! (t instanceof i.Error) && pe.getFullScreen()
                    }
                    var r = He.webkitExitFullscreen || He.webkitExitFullScreen;
                    return r && r.apply(He),
                    e
                },
                pe.getFullScreen = function() {
                    return Re || !!He.webkitDisplayingFullscreen
                },
                this.setCurrentQuality = function(e) {
                    if (Le !== e && e >= 0 && me && me.length > e) {
                        Le = e,
                        Fe.reason = "api",
                        Fe.level = {},
                        this.trigger(n.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                            currentQuality: e,
                            levels: V(me)
                        }),
                        w.qualityLabel = me[e].label;
                        var t = He.currentTime || 0,
                        i = He.duration || 0;
                        i <= 0 && (i = ve),
                        pe.setState(s.LOADING),
                        X(t, i)
                    }
                },
                this.getCurrentQuality = function() {
                    return Le
                },
                this.getQualityLevels = function() {
                    return V(me)
                },
                this.getName = function() {
                    return {
                        name: E
                    }
                },
                this.setCurrentAudioTrack = he,
                this.getAudioTracks = fe,
                this.getCurrentAudioTrack = Te
            }
            var f = window.clearTimeout,
            T = 256,
            k = 120,
            g = i.isIE(),
            v = i.isIE(9),
            y = i.isMSIE(),
            _ = i.isMobile(),
            m = i.isFF(),
            p = i.isAndroidNative(),
            x = i.isIOS(7),
            b = i.isIOS(8),
            E = "html5",
            w = function() {};
            return w.prototype = c,
            h.prototype = new w,
            h.getName = function() {
                return {
                    name: "html5"
                }
            },
            h
        }.apply(t, r),
        !(void 0 !== a && (e.exports = a))
    }
});