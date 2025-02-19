/*! For license information please see app.js.LICENSE.txt */ ! function() {
	var e, t, n = {
			2585: function(e) {
				! function() {
					"use strict";

					function t(e, n) {
						var o;
						if (n = n || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = n.touchBoundary || 10, this.layer = e, this.tapDelay = n.tapDelay || 200, this.tapTimeout = n.tapTimeout || 700, !t.notNeeded(e)) {
							for (var i = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], a = this, l = 0, s = i.length; l < s; l++) a[i[l]] = c(a[i[l]], a);
							r && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, n, r) {
								var o = Node.prototype.removeEventListener;
								"click" === t ? o.call(e, t, n.hijacked || n, r) : o.call(e, t, n, r)
							}, e.addEventListener = function(t, n, r) {
								var o = Node.prototype.addEventListener;
								"click" === t ? o.call(e, t, n.hijacked || (n.hijacked = function(e) {
									e.propagationStopped || n(e)
								}), r) : o.call(e, t, n, r)
							}), "function" == typeof e.onclick && (o = e.onclick, e.addEventListener("click", (function(e) {
								o(e)
							}), !1), e.onclick = null)
						}

						function c(e, t) {
							return function() {
								return e.apply(t, arguments)
							}
						}
					}
					var n = navigator.userAgent.indexOf("Windows Phone") >= 0,
						r = navigator.userAgent.indexOf("Android") > 0 && !n,
						o = /iP(ad|hone|od)/.test(navigator.userAgent) && !n,
						i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
						a = o && /OS [6-7]_\d/.test(navigator.userAgent),
						l = navigator.userAgent.indexOf("BB10") > 0;
					t.prototype.needsClick = function(e) {
						switch (e.nodeName.toLowerCase()) {
							case "button":
							case "select":
							case "textarea":
								if (e.disabled) return !0;
								break;
							case "input":
								if (o && "file" === e.type || e.disabled) return !0;
								break;
							case "label":
							case "iframe":
							case "video":
								return !0
						}
						return /\bneedsclick\b/.test(e.className)
					}, t.prototype.needsFocus = function(e) {
						switch (e.nodeName.toLowerCase()) {
							case "textarea":
								return !0;
							case "select":
								return !r;
							case "input":
								switch (e.type) {
									case "button":
									case "checkbox":
									case "file":
									case "image":
									case "radio":
									case "submit":
										return !1
								}
								return !e.disabled && !e.readOnly;
							default:
								return /\bneedsfocus\b/.test(e.className)
						}
					}, t.prototype.sendClick = function(e, t) {
						var n, r;
						document.activeElement && document.activeElement !== e && document.activeElement.blur(), r = t.changedTouches[0], (n = document.createEvent("MouseEvents")).initMouseEvent(this.determineEventType(e), !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, e.dispatchEvent(n)
					}, t.prototype.determineEventType = function(e) {
						return r && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
					}, t.prototype.focus = function(e) {
						var t;
						o && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type && "email" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
					}, t.prototype.updateScrollParent = function(e) {
						var t, n;
						if (!(t = e.fastClickScrollParent) || !t.contains(e)) {
							n = e;
							do {
								if (n.scrollHeight > n.offsetHeight) {
									t = n, e.fastClickScrollParent = n;
									break
								}
								n = n.parentElement
							} while (n)
						}
						t && (t.fastClickLastScrollTop = t.scrollTop)
					}, t.prototype.getTargetElementFromEventTarget = function(e) {
						return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
					}, t.prototype.onTouchStart = function(e) {
						var t, n, r, a;
						if (e.timeStamp < 0 ? (a = (new Date).getTime(), this.isTrackingClickStartFromEvent = !1) : (a = e.timeStamp, this.isTrackingClickStartFromEvent = !0), e.targetTouches.length > 1) return !0;
						if (t = this.getTargetElementFromEventTarget(e.target), n = e.targetTouches[0], o) {
							if ((r = window.getSelection()).rangeCount && !r.isCollapsed) return !0;
							if (!i) {
								if (n.identifier && n.identifier === this.lastTouchIdentifier) return e.preventDefault(), !1;
								this.lastTouchIdentifier = n.identifier, this.updateScrollParent(t)
							}
						}
						return this.trackingClick = !0, this.trackingClickStart = a, this.targetElement = t, this.touchStartX = n.pageX, this.touchStartY = n.pageY, a - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
					}, t.prototype.touchHasMoved = function(e) {
						var t = e.changedTouches[0],
							n = this.touchBoundary;
						return Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n
					}, t.prototype.onTouchMove = function(e) {
						return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null), !0)
					}, t.prototype.findControl = function(e) {
						return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
					}, t.prototype.onTouchEnd = function(e) {
						var t, n, l, s, c, u, f = this.targetElement;
						if (u = this.isTrackingClickStartFromEvent ? e.timeStamp : (new Date).getTime(), !this.trackingClick) return !0;
						if (u - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
						if (u - this.trackingClickStart > this.tapTimeout) return !0;
						if (this.cancelNextClick = !1, this.lastClickTime = u, n = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, a && (c = e.changedTouches[0], (f = document.elementFromPoint(c.pageX - window.pageXOffset, c.pageY - window.pageYOffset) || f).fastClickScrollParent = this.targetElement.fastClickScrollParent), "label" === (l = f.tagName.toLowerCase())) {
							if (t = this.findControl(f)) {
								if (this.focus(f), r) return !1;
								f = t
							}
						} else if (this.needsFocus(f)) return u - n > 100 || o && window.top !== window && "input" === l ? (this.targetElement = null, !1) : (this.focus(f), this.sendClick(f, e), o && "select" === l || (this.targetElement = null, e.preventDefault()), !1);
						return !(!o || i || !(s = f.fastClickScrollParent) || s.fastClickLastScrollTop === s.scrollTop) || (this.needsClick(f) || (e.preventDefault(), this.sendClick(f, e)), !1)
					}, t.prototype.onTouchCancel = function() {
						this.trackingClick = !1, this.targetElement = null
					}, t.prototype.onMouse = function(e) {
						return !(this.targetElement && !e.forwardedTouchEvent && e.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) && (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), 1))
					}, t.prototype.onClick = function(e) {
						var t;
						return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail || ((t = this.onMouse(e)) || (this.targetElement = null), t)
					}, t.prototype.destroy = function() {
						var e = this.layer;
						r && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
					}, t.notNeeded = function(e) {
						var t, n, o;
						if (void 0 === window.ontouchstart) return !0;
						if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
							if (!r) return !0;
							if (t = document.querySelector("meta[name=viewport]")) {
								if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
								if (n > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
							}
						}
						if (l && (o = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/))[1] >= 10 && o[2] >= 3 && (t = document.querySelector("meta[name=viewport]"))) {
							if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
							if (document.documentElement.scrollWidth <= window.outerWidth) return !0
						}
						return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction || !!(+(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1] >= 27 && (t = document.querySelector("meta[name=viewport]")) && (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) || "none" === e.style.touchAction || "manipulation" === e.style.touchAction
					}, t.attach = function(e, n) {
						return new t(e, n)
					}, e.exports.y = t
				}()
			},
			2092: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return o
					}
				});
				var r = n(7294);

				function o() {
					return (0, r.useState)(null)
				}
			},
			6895: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return o
					}
				});
				var r = n(7294);

				function o(e) {
					var t = function(e) {
						var t = (0, r.useRef)(e);
						return (0, r.useEffect)((function() {
							t.current = e
						}), [e]), t
					}(e);
					return (0, r.useCallback)((function() {
						return t.current && t.current.apply(t, arguments)
					}), [t])
				}
			},
			4357: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return o
					}
				});
				var r = n(7294);

				function o() {
					return (0, r.useReducer)((function(e) {
						return !e
					}), !1)[1]
				}
			},
			5654: function(e, t, n) {
				"use strict";
				var r = n(7294),
					o = function(e) {
						return e && "function" != typeof e ? function(t) {
							e.current = t
						} : e
					};
				t.Z = function(e, t) {
					return (0, r.useMemo)((function() {
						return function(e, t) {
							var n = o(e),
								r = o(t);
							return function(e) {
								n && n(e), r && r(e)
							}
						}(e, t)
					}), [e, t])
				}
			},
			6454: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return o
					}
				});
				var r = n(7294);

				function o() {
					var e = (0, r.useRef)(!0),
						t = (0, r.useRef)((function() {
							return e.current
						}));
					return (0, r.useEffect)((function() {
						return function() {
							e.current = !1
						}
					}), []), t.current
				}
			},
			2853: function() {
				! function() {
					var e, t, n, r = this || self,
						o = function(e, t) {
							e = e.split(".");
							var n, o = r;
							e[0] in o || void 0 === o.execScript || o.execScript("var " + e[0]);
							for (; e.length && (n = e.shift());) e.length || void 0 === t ? o = o[n] && o[n] !== Object.prototype[n] ? o[n] : o[n] = {} : o[n] = t
						},
						i = {},
						a = function() {
							i.TAGGING = i.TAGGING || [], i.TAGGING[1] = !0
						},
						l = function(e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						},
						s = function(e) {
							for (var t in e)
								if (e.hasOwnProperty(t)) return !0;
							return !1
						},
						c = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
						u = window,
						f = document,
						d = function(e, t) {
							f.addEventListener ? f.addEventListener(e, t, !1) : f.attachEvent && f.attachEvent("on" + e, t)
						},
						h = /:[0-9]+$/,
						p = function(e, t, n) {
							e = e.split("&");
							for (var r = 0; r < e.length; r++) {
								var o = e[r].split("=");
								if (decodeURIComponent(o[0]).replace(/\+/g, " ") === t) return t = o.slice(1).join("="), n ? t : decodeURIComponent(t).replace(/\+/g, " ")
							}
						},
						v = function(e, t) {
							return t && (t = String(t).toLowerCase()), "protocol" !== t && "port" !== t || (e.protocol = g(e.protocol) || g(u.location.protocol)), "port" === t ? e.port = String(Number(e.hostname ? e.port : u.location.port) || ("http" == e.protocol ? 80 : "https" == e.protocol ? 443 : "")) : "host" === t && (e.hostname = (e.hostname || u.location.hostname).replace(h, "").toLowerCase()), m(e, t, void 0, void 0, void 0)
						},
						m = function(e, t, n, r, o) {
							var i = g(e.protocol);
							switch (t && (t = String(t).toLowerCase()), t) {
								case "url_no_fragment":
									r = "", e && e.href && (r = 0 > (r = e.href.indexOf("#")) ? e.href : e.href.substr(0, r)), e = r;
									break;
								case "protocol":
									e = i;
									break;
								case "host":
									e = e.hostname.replace(h, "").toLowerCase(), n && (r = /^www\d*\./.exec(e)) && r[0] && (e = e.substr(r[0].length));
									break;
								case "port":
									e = String(Number(e.port) || ("http" == i ? 80 : "https" == i ? 443 : ""));
									break;
								case "path":
									e.pathname || e.hostname || a();
									e: if (r = r || [], n = (e = (e = "/" == e.pathname.substr(0, 1) ? e.pathname : "/" + e.pathname).split("/"))[e.length - 1], Array.prototype.indexOf) r = r.indexOf(n), r = "number" == typeof r ? r : -1;
										else {
											for (o = 0; o < r.length; o++)
												if (r[o] === n) {
													r = o;
													break e
												} r = -1
										} 0 <= r && (e[e.length - 1] = ""), e = e.join("/");
									break;
								case "query":
									e = e.search.replace("?", ""), o && (e = p(e, o, void 0));
									break;
								case "extension":
									e = (e = 1 < (e = e.pathname.split(".")).length ? e[e.length - 1] : "").split("/")[0];
									break;
								case "fragment":
									e = e.hash.replace("#", "");
									break;
								default:
									e = e && e.href
							}
							return e
						},
						g = function(e) {
							return e ? e.replace(":", "").toLowerCase() : ""
						},
						y = function(e) {
							var t = f.createElement("a");
							e && (t.href = e);
							var n = t.pathname;
							return "/" !== n[0] && (e || a(), n = "/" + n), e = t.hostname.replace(h, ""), {
								href: t.href,
								protocol: t.protocol,
								host: t.host,
								hostname: e,
								pathname: n,
								search: t.search,
								hash: t.hash,
								port: t.port
							}
						};

					function b() {
						for (var t = e, n = {}, r = 0; r < t.length; ++r) n[t[r]] = r;
						return n
					}

					function w() {
						var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
						return (e += e.toLowerCase() + "0123456789-_") + "."
					}

					function x(n) {
						function r(e) {
							for (; i < n.length;) {
								var r = n.charAt(i++),
									o = t[r];
								if (null != o) return o;
								if (!/^[\s\xa0]*$/.test(r)) throw Error("Unknown base64 encoding at char: " + r)
							}
							return e
						}
						e = e || w(), t = t || b();
						for (var o = "", i = 0;;) {
							var a = r(-1),
								l = r(0),
								s = r(64),
								c = r(64);
							if (64 === c && -1 === a) return o;
							o += String.fromCharCode(a << 2 | l >> 4), 64 != s && (o += String.fromCharCode(l << 4 & 240 | s >> 2), 64 != c && (o += String.fromCharCode(s << 6 & 192 | c)))
						}
					}
					var M = function() {
							var e = H,
								t = R,
								n = k(),
								r = function(t) {
									e(t.target || t.srcElement || {})
								};
							if (!n.init) {
								d("mousedown", r), d("keyup", r), d("submit", (function(e) {
									t(e.target || e.srcElement || {})
								}));
								var o = HTMLFormElement.prototype.submit;
								HTMLFormElement.prototype.submit = function() {
									t(this), o.call(this)
								}, n.init = !0
							}
						},
						z = function(e, t, n, r, o) {
							e = {
								callback: e,
								domains: t,
								fragment: 2 === n,
								placement: n,
								forms: r,
								sameHost: o
							}, k().decorators.push(e)
						},
						E = function(e, t, n) {
							for (var r = k().decorators, o = {}, i = 0; i < r.length; ++i) {
								var a, s = r[i];
								if (a = !n || s.forms) e: {
									a = s.domains;
									var c = e,
										u = !!s.sameHost;
									if (a && (u || c !== f.location.hostname))
										for (var d = 0; d < a.length; d++)
											if (a[d] instanceof RegExp) {
												if (a[d].test(c)) {
													a = !0;
													break e
												}
											} else if (0 <= c.indexOf(a[d]) || u && 0 <= a[d].indexOf(c)) {
										a = !0;
										break e
									}
									a = !1
								}
								a && (null == (a = s.placement) && (a = s.fragment ? 2 : 1), a === t && l(o, s.callback()))
							}
							return o
						},
						k = function() {
							var e = {},
								t = u.google_tag_data;
							return u.google_tag_data = void 0 === t ? e : t, (t = (e = u.google_tag_data).gl) && t.decorators || (t = {
								decorators: []
							}, e.gl = t), t
						},
						C = /(.*?)\*(.*?)\*(.*)/,
						S = /([^?#]+)(\?[^#]*)?(#.*)?/;

					function T(e) {
						return new RegExp("(.*?)(^|&)" + e + "=([^&]*)&?(.*)")
					}
					var N = function(n) {
							var r, o = [];
							for (r in n)
								if (n.hasOwnProperty(r)) {
									var i = n[r];
									if (void 0 !== i && i == i && null !== i && "[object Object]" !== i.toString()) {
										o.push(r);
										var a = o,
											l = a.push;
										i = String(i), e = e || w(), t = t || b();
										for (var s = [], c = 0; c < i.length; c += 3) {
											var u = c + 1 < i.length,
												f = c + 2 < i.length,
												d = i.charCodeAt(c),
												h = u ? i.charCodeAt(c + 1) : 0,
												p = f ? i.charCodeAt(c + 2) : 0,
												v = d >> 2;
											d = (3 & d) << 4 | h >> 4, h = (15 & h) << 2 | p >> 6, p &= 63, f || (p = 64, u || (h = 64)), s.push(e[v], e[d], e[h], e[p])
										}
										l.call(a, s.join(""))
									}
								} return n = o.join("*"), ["1", P(n), n].join("*")
						},
						P = function(e, t) {
							if (e = [window.navigator.userAgent, (new Date).getTimezoneOffset(), window.navigator.userLanguage || window.navigator.language, Math.floor((new Date).getTime() / 60 / 1e3) - (void 0 === t ? 0 : t), e].join("*"), !(t = n)) {
								t = Array(256);
								for (var r = 0; 256 > r; r++) {
									for (var o = r, i = 0; 8 > i; i++) o = 1 & o ? o >>> 1 ^ 3988292384 : o >>> 1;
									t[r] = o
								}
							}
							for (n = t, t = 4294967295, r = 0; r < e.length; r++) t = t >>> 8 ^ n[255 & (t ^ e.charCodeAt(r))];
							return ((-1 ^ t) >>> 0).toString(36)
						};

					function A(e, t) {
						if (e = T(e).exec(t)) {
							var n = e[2],
								r = e[4];
							t = e[1], r && (t = t + n + r)
						}
						return t
					}
					var _ = function(e) {
						var t = void 0 === t ? 3 : t;
						try {
							if (e) {
								e: {
									for (var n = 0; 3 > n; ++n) {
										var r = C.exec(e);
										if (r) {
											var o = r;
											break e
										}
										e = decodeURIComponent(e)
									}
									o = void 0
								}
								if (o && "1" === o[1]) {
									var i = o[2],
										a = o[3];
									e: {
										for (o = 0; o < t; ++o)
											if (i === P(a, o)) {
												var l = !0;
												break e
											} l = !1
									}
									if (l) {
										t = {};
										var s = a ? a.split("*") : [];
										for (a = 0; a < s.length; a += 2) t[s[a]] = x(s[a + 1]);
										return t
									}
								}
							}
						} catch (e) {}
					};

					function O(e, t, n, r) {
						function o(t) {
							var n = (t = A(e, t)).charAt(t.length - 1);
							return t && "&" !== n && (t += "&"), t + l
						}
						r = void 0 !== r && r;
						var i = S.exec(n);
						if (!i) return "";
						n = i[1];
						var a = i[2] || "";
						i = i[3] || "";
						var l = e + "=" + t;
						return r ? i = "#" + o(i.substring(1)) : a = "?" + o(a.substring(1)), "" + n + a + i
					}

					function L(e, t) {
						var n = "FORM" === (e.tagName || "").toUpperCase(),
							r = E(t, 1, n),
							o = E(t, 2, n);
						for (var i in t = E(t, 3, n), s(r) && (r = N(r), n ? I("_gl", r, e) : B("_gl", r, e, !1)), !n && s(o) && B("_gl", n = N(o), e, !0), t) t.hasOwnProperty(i) && D(i, t[i], e)
					}

					function D(e, t, n, r) {
						if (n.tagName) {
							if ("a" === n.tagName.toLowerCase()) return B(e, t, n, r);
							if ("form" === n.tagName.toLowerCase()) return I(e, t, n)
						}
						if ("string" == typeof n) return O(e, t, n, r)
					}

					function B(e, t, n, r) {
						n.href && (e = O(e, t, n.href, void 0 !== r && r), c.test(e) && (n.href = e))
					}

					function I(e, t, n) {
						if (n && n.action) {
							var r = (n.method || "").toLowerCase();
							if ("get" === r) {
								r = n.childNodes || [];
								for (var o = !1, i = 0; i < r.length; i++) {
									var a = r[i];
									if (a.name === e) {
										a.setAttribute("value", t), o = !0;
										break
									}
								}
								o || ((r = f.createElement("input")).setAttribute("type", "hidden"), r.setAttribute("name", e), r.setAttribute("value", t), n.appendChild(r))
							} else "post" === r && (e = O(e, t, n.action), c.test(e) && (n.action = e))
						}
					}
					var H = function(e) {
							try {
								e: {
									for (var t = 100; e && 0 < t;) {
										if (e.href && e.nodeName.match(/^a(?:rea)?$/i)) {
											var n = e;
											break e
										}
										e = e.parentNode, t--
									}
									n = null
								}
								if (n) {
									var r = n.protocol;
									"http:" !== r && "https:" !== r || L(n, n.hostname)
								}
							}
							catch (e) {}
						},
						R = function(e) {
							try {
								e.action && L(e, v(y(e.action), "host"))
							} catch (e) {}
						};
					o("google_tag_data.glBridge.auto", (function(e, t, n, r) {
						M(), z(e, t, "fragment" === n ? 2 : 1, !!r, !1)
					})), o("google_tag_data.glBridge.passthrough", (function(e, t, n) {
						M(), z(e, [m(u.location, "host", !0)], t, !!n, !0)
					})), o("google_tag_data.glBridge.decorate", (function(e, t, n) {
						return D("_gl", e = N(e), t, !!n)
					})), o("google_tag_data.glBridge.generate", N), o("google_tag_data.glBridge.get", (function(e, t) {
						var n = function(e) {
							return function(t) {
								var n = y(u.location.href),
									r = n.search.replace("?", ""),
									o = p(r, "_gl", !0);
								t.query = _(o || "") || {};
								var i = (o = v(n, "fragment")).match(T("_gl"));
								t.fragment = _(i && i[3] || "") || {}, e && function(e, t, n) {
									function r(e, t) {
										return (e = A("_gl", e)).length && (e = t + e), e
									}
									if (u.history && u.history.replaceState) {
										var o = T("_gl");
										(o.test(t) || o.test(n)) && (e = v(e, "path"), t = r(t, "?"), n = r(n, "#"), u.history.replaceState({}, void 0, "" + e + t + n))
									}
								}(n, r, o)
							}
						}(!!t);
						return (t = k()).data || (t.data = {
							query: {},
							fragment: {}
						}, n(t.data)), n = {}, (t = t.data) && (l(n, t.query), e && l(n, t.fragment)), n
					}))
				}(window),
				function() {
					function e(e) {
						var t, n = 1;
						if (e)
							for (n = 0, t = e.length - 1; 0 <= t; t--) {
								var r = e.charCodeAt(t);
								n = 0 != (r = 266338304 & (n = (n << 6 & 268435455) + r + (r << 14))) ? n ^ r >> 21 : n
							}
						return n
					}
					var t = function(e) {
						this.C = e || []
					};
					t.prototype.set = function(e) {
						this.C[e] = !0
					}, t.prototype.encode = function() {
						for (var e = [], t = 0; t < this.C.length; t++) this.C[t] && (e[Math.floor(t / 6)] ^= 1 << t % 6);
						for (t = 0; t < e.length; t++) e[t] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(e[t] || 0);
						return e.join("") + "~"
					};
					var n, r, o = window.GoogleAnalyticsObject;
					if ((n = null != o) && (n = -1 < (o.constructor + "").indexOf("String")), r = n) {
						var i = window.GoogleAnalyticsObject;
						r = i ? i.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") : ""
					}
					var a = r || "ga",
						l = /^(?:utma\.)?\d+\.\d+$/,
						s = /^amp-[\w.-]{22,64}$/,
						c = !1,
						u = new t;

					function f(e) {
						u.set(e)
					}
					var d = function(e) {
							e = h(e), e = new t(e);
							for (var n = u.C.slice(), r = 0; r < e.C.length; r++) n[r] = n[r] || e.C[r];
							return new t(n).encode()
						},
						h = function(e) {
							return e = e.get(Vt), v(e) || (e = []), e
						},
						p = function(e) {
							return "function" == typeof e
						},
						v = function(e) {
							return "[object Array]" == Object.prototype.toString.call(Object(e))
						},
						m = function(e) {
							return null != e && -1 < (e.constructor + "").indexOf("String")
						},
						g = function(e, t) {
							return 0 == e.indexOf(t)
						},
						y = function() {
							for (var t = O.navigator.userAgent + (L.cookie ? L.cookie : "") + (L.referrer ? L.referrer : ""), n = t.length, r = O.history.length; 0 < r;) t += r-- ^ n++;
							return [Pe() ^ 2147483647 & e(t), Math.round((new Date).getTime() / 1e3)].join(".")
						},
						b = function() {},
						w = function(e) {
							return encodeURIComponent instanceof Function ? encodeURIComponent(e) : (f(28), e)
						},
						x = function(e, t, n, r) {
							try {
								e.addEventListener ? e.addEventListener(t, n, !!r) : e.attachEvent && e.attachEvent("on" + t, n)
							} catch (e) {
								f(27)
							}
						},
						M = /^[\w\-:/.?=&%!\[\]]+$/,
						z = /^[\w+/_-]+[=]{0,2}$/,
						E = null,
						k = function(e, t, n, r, o) {
							if (!E) {
								E = {
									createScriptURL: function(e) {
										return e
									},
									createHTML: function(e) {
										return e
									}
								};
								try {
									E = window.trustedTypes.createPolicy("google-analytics", E)
								} catch (e) {}
							}
							if (e) {
								var i = L.querySelector && L.querySelector("script[nonce]") || null;
								i = i && (i.nonce || i.getAttribute && i.getAttribute("nonce")) || "", n ? (o = r = "", t && M.test(t) && (r = ' id="' + t + '"'), i && z.test(i) && (o = ' nonce="' + i + '"'), M.test(e) && L.write(E.createHTML("<script" + r + o + ' src="' + e + '"><\/script>'))) : ((n = L.createElement("script")).type = "text/javascript", n.async = !0, n.src = E.createScriptURL(e), r && (n.onload = r), o && (n.onerror = o), t && (n.id = t), i && n.setAttribute("nonce", i), (e = L.getElementsByTagName("script")[0]).parentNode.insertBefore(n, e))
							}
						},
						C = function(e, t) {
							return S(L.location[t ? "href" : "search"], e)
						},
						S = function(e, t) {
							return (e = e.match("(?:&|#|\\?)" + w(t).replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1") + "=([^&#]*)")) && 2 == e.length ? e[1] : ""
						},
						T = function() {
							var e = "" + L.location.hostname;
							return 0 == e.indexOf("www.") ? e.substring(4) : e
						},
						N = function(e, t) {
							var n = e.indexOf(t);
							return !(5 != n && 6 != n || "/" != (e = e.charAt(n + t.length)) && "?" != e && "" != e && ":" != e)
						},
						P = function(e, t) {
							if (1 == t.length && null != t[0] && "object" == typeof t[0]) return t[0];
							for (var n = {}, r = Math.min(e.length + 1, t.length), o = 0; o < r; o++) {
								if ("object" == typeof t[o]) {
									for (var i in t[o]) t[o].hasOwnProperty(i) && (n[i] = t[o][i]);
									break
								}
								o < e.length && (n[e[o]] = t[o])
							}
							return n
						},
						A = function(e, t) {
							for (var n = 0; n < e.length; n++)
								if (t == e[n]) return !0;
							return !1
						},
						_ = function() {
							this.oa = [], this.ea = {}, this.m = {}
						};
					_.prototype.set = function(e, t, n) {
						this.oa.push(e), n ? this.m[":" + e] = t : this.ea[":" + e] = t
					}, _.prototype.get = function(e) {
						return this.m.hasOwnProperty(":" + e) ? this.m[":" + e] : this.ea[":" + e]
					}, _.prototype.map = function(e) {
						for (var t = 0; t < this.oa.length; t++) {
							var n = this.oa[t],
								r = this.get(n);
							r && e(n, r)
						}
					};
					var O = window,
						L = document,
						D = function(e, t) {
							return setTimeout(e, t)
						},
						B = window,
						I = document,
						H = function(e) {
							var t = B._gaUserPrefs;
							if (t && t.ioo && t.ioo() || e && !0 === B["ga-disable-" + e]) return !0;
							try {
								var n = B.external;
								if (n && n._gaUserPrefs && "oo" == n._gaUserPrefs) return !0
							} catch (e) {}
							for (e = [], t = String(I.cookie).split(";"), n = 0; n < t.length; n++) {
								var r = t[n].split("="),
									o = r[0].replace(/^\s*|\s*$/g, "");
								o && "AMP_TOKEN" == o && ((r = r.slice(1).join("=").replace(/^\s*|\s*$/g, "")) && (r = decodeURIComponent(r)), e.push(r))
							}
							for (t = 0; t < e.length; t++)
								if ("$OPT_OUT" == e[t]) return !0;
							return !!I.getElementById("__gaOptOutExtension")
						},
						R = function(e) {
							var t = [],
								n = L.cookie.split(";");
							e = new RegExp("^\\s*" + e + "=\\s*(.*?)\\s*$");
							for (var r = 0; r < n.length; r++) {
								var o = n[r].match(e);
								o && t.push(o[1])
							}
							return t
						},
						q = function(e, t, n, r, o, i, a) {
							if (!(o = !H(o) && !(F.test(L.location.hostname) || "/" == n && Z.test(r)))) return !1;
							if (t && 1200 < t.length && (t = t.substring(0, 1200)), n = e + "=" + t + "; path=" + n + "; ", i && (n += "expires=" + new Date((new Date).getTime() + i).toGMTString() + "; "), r && "none" !== r && (n += "domain=" + r + ";"), a && (n += a + ";"), r = L.cookie, L.cookie = n, !(r = r != L.cookie)) e: {
								for (e = R(e), r = 0; r < e.length; r++)
									if (t == e[r]) {
										r = !0;
										break e
									} r = !1
							}
							return r
						},
						j = function(e) {
							return encodeURIComponent ? encodeURIComponent(e).replace(/\(/g, "%28").replace(/\)/g, "%29") : e
						},
						Z = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
						F = /(^|\.)doubleclick\.net$/i;

					function V(e, t, n) {
						t = function(e) {
							var t = [],
								n = L.cookie.split(";");
							e = new RegExp("^\\s*" + (e || "_gac") + "_(UA-\\d+-\\d+)=\\s*(.+?)\\s*$");
							for (var r = 0; r < n.length; r++) {
								var o = n[r].match(e);
								o && t.push({
									ja: o[1],
									value: o[2],
									timestamp: Number(o[2].split(".")[1]) || 0
								})
							}
							return t.sort((function(e, t) {
								return t.timestamp - e.timestamp
							})), t
						}(t);
						var r = {};
						if (!t || !t.length) return r;
						for (var o = 0; o < t.length; o++) {
							var i = t[o].value.split(".");
							if ("1" !== i[0] || n && 3 > i.length || !n && 3 !== i.length) e && (e.na = !0);
							else if (Number(i[1])) {
								r[t[o].ja] ? e && (e.pa = !0) : r[t[o].ja] = [];
								var a = {
									version: i[0],
									timestamp: 1e3 * Number(i[1]),
									qa: i[2]
								};
								n && 3 < i.length && (a.labels = i.slice(3)), r[t[o].ja].push(a)
							}
						}
						return r
					}
					var Q, U, K, W, $ = /^https?:\/\/[^/]*cdn\.ampproject\.org\//,
						Y = /^(?:www\.|m\.|amp\.)+/,
						G = [],
						X = function(e) {
							var t;
							if (ie(e[On]) && (void 0 === W && (t = (t = Sr.get()) && t._ga || void 0) && (W = t, f(81)), void 0 !== W)) return e[dn] || (e[dn] = W), !1;
							if (e[On]) {
								if (f(67), e[kn] && "cookie" != e[kn]) return !1;
								if (void 0 !== W) e[dn] || (e[dn] = W);
								else {
									e: {
										t = String(e[yn] || T());
										var n = String(e[bn] || "/"),
											r = R(String(e[gn] || "_ga"));
										if (!(t = mr(r, t, n)) || l.test(t)) t = !0;
										else if (0 == (t = R("AMP_TOKEN")).length) t = !0;
										else {
											if (1 == t.length && ("$RETRIEVING" == (t = decodeURIComponent(t[0])) || "$OPT_OUT" == t || "$ERROR" == t || "$NOT_FOUND" == t)) {
												t = !0;
												break e
											}
											t = !1
										}
									}
									if (t && ee(J, String(e[mn]))) return !0
								}
							}
							return !1
						},
						J = function() {
							ko.D([b])
						},
						ee = function(e, t) {
							var n = R("AMP_TOKEN");
							return 1 < n.length ? (f(55), !1) : "$OPT_OUT" == (n = decodeURIComponent(n[0] || "")) || "$ERROR" == n || H(t) ? (f(62), !1) : $.test(L.referrer) || "$NOT_FOUND" != n ? void 0 !== W ? (f(56), D((function() {
								e(W)
							}), 0), !0) : Q ? (G.push(e), !0) : "$RETRIEVING" == n ? (f(57), D((function() {
								ee(e, t)
							}), 1e4), !0) : (Q = !0, n && "$" != n[0] || (re("$RETRIEVING", 3e4), setTimeout(ne, 3e4), n = ""), !!te(n, t) && (G.push(e), !0)) : (f(68), !1)
						},
						te = function(e, t, n) {
							if (!window.JSON) return f(58), !1;
							var r = O.XMLHttpRequest;
							if (!r) return f(59), !1;
							var o = new r;
							return "withCredentials" in o ? (o.open("POST", (n || "https://ampcid.google.com/v1/publisher:getClientId") + "?key=AIzaSyA65lEHUEizIsNtlbNo-l2K18dT680nsaM", !0), o.withCredentials = !0, o.setRequestHeader("Content-Type", "text/plain"), o.onload = function() {
								if (Q = !1, 4 == o.readyState) {
									try {
										200 != o.status && (f(61), oe("", "$ERROR", 3e4));
										var r = JSON.parse(o.responseText);
										r.optOut ? (f(63), oe("", "$OPT_OUT", 31536e6)) : r.clientId ? oe(r.clientId, r.securityToken, 31536e6) : !n && r.alternateUrl ? (U && clearTimeout(U), Q = !0, te(e, t, r.alternateUrl)) : (f(64), oe("", "$NOT_FOUND", 36e5))
									} catch (e) {
										f(65), oe("", "$ERROR", 3e4)
									}
									o = null
								}
							}, r = {
								originScope: "AMP_ECID_GOOGLE"
							}, e && (r.securityToken = e), o.send(JSON.stringify(r)), U = D((function() {
								f(66), oe("", "$ERROR", 3e4)
							}), 1e4), !0) : (f(60), !1)
						},
						ne = function() {
							Q = !1
						},
						re = function(e, t) {
							if (void 0 === K) {
								K = "";
								for (var n = br(), r = 0; r < n.length; r++) {
									var o = n[r];
									if (q("AMP_TOKEN", encodeURIComponent(e), "/", o, "", t)) return void(K = o)
								}
							}
							q("AMP_TOKEN", encodeURIComponent(e), "/", K, "", t)
						},
						oe = function(e, t, n) {
							for (U && clearTimeout(U), t && re(t, n), W = e, t = G, G = [], n = 0; n < t.length; n++) t[n](e)
						},
						ie = function(e) {
							e: {
								if ($.test(L.referrer)) {
									var t = L.location.hostname.replace(Y, "");
									t: {
										var n = L.referrer,
											r = (n = n.replace(/^https?:\/\//, "")).replace(/^[^/]+/, "").split("/"),
											o = r[2];
										if (!(r = (r = "s" == o ? r[3] : o) ? decodeURIComponent(r) : r)) {
											if (0 == n.indexOf("xn--")) {
												n = "";
												break t
											}(n = n.match(/(.*)\.cdn\.ampproject\.org\/?$/)) && 2 == n.length && (r = n[1].replace(/-/g, ".").replace(/\.\./g, "-"))
										}
										n = r ? r.replace(Y, "") : ""
									}
									if ((r = t === n) || (n = "." + n, r = t.substring(t.length - n.length, t.length) === n), r) {
										t = !0;
										break e
									}
									f(78)
								}
								t = !1
							}
							return t && !1 !== e
						},
						ae = function(e) {
							return (e || c || "https:" == L.location.protocol ? "https:" : "http:") + "//www.google-analytics.com"
						},
						le = function(e) {
							switch (e) {
								default:
								case 1:
									return "https://www.google-analytics.com/gtm/js?id=";
								case 2:
									return "https://www.googletagmanager.com/gtag/js?id="
							}
						},
						se = function(e) {
							this.name = "len", this.message = e + "-8192"
						},
						ce = function(e, t, n) {
							if (n = n || b, 2036 >= t.length) fe(e, t, n);
							else {
								if (!(8192 >= t.length)) throw me("len", t.length), new se(t.length);
								ve(e, t, n) || de(e, t, n) || fe(e, t, n)
							}
						},
						ue = function(e, t, n, r) {
							de(e + "?" + t, "", r = r || b, n)
						},
						fe = function(e, t, n) {
							var r = function(e) {
								var t = L.createElement("img");
								return t.width = 1, t.height = 1, t.src = e, t
							}(e + "?" + t);
							r.onload = r.onerror = function() {
								r.onload = null, r.onerror = null, n()
							}
						},
						de = function(e, t, n, r) {
							var o = O.XMLHttpRequest;
							if (!o) return !1;
							var i = new o;
							return "withCredentials" in i && (e = e.replace(/^http:/, "https:"), i.open("POST", e, !0), i.withCredentials = !0, i.setRequestHeader("Content-Type", "text/plain"), i.onreadystatechange = function() {
								if (4 == i.readyState) {
									if (r && "text/plain" === i.getResponseHeader("Content-Type")) try {
										he(r, i.responseText, n)
									} catch (e) {
										me("xhr", "rsp"), n()
									} else n();
									i = null
								}
							}, i.send(t), !0)
						},
						he = function(e, t, n) {
							if (1 > t.length) me("xhr", "ver", "0"), n();
							else if (3 < e.count++) me("xhr", "tmr", "" + e.count), n();
							else {
								var r = t.charAt(0);
								if ("1" === r) pe(e, t.substring(1), n);
								else if (e.V && "2" === r) {
									var o = t.substring(1).split(","),
										i = 0;
									for (t = function() {
											++i === o.length && n()
										}, r = 0; r < o.length; r++) pe(e, o[r], t)
								} else me("xhr", "ver", String(t.length)), n()
							}
						},
						pe = function(e, t, n) {
							if (0 === t.length) n();
							else {
								var r = t.charAt(0);
								switch (r) {
									case "d":
										ue("https://stats.g.doubleclick.net/j/collect", e.U, e, n);
										break;
									case "g":
										fe("https://www.google.com/ads/ga-audiences", e.google, n), (t = t.substring(1)) && (/^[a-z.]{1,6}$/.test(t) ? fe("https://www.google.%/ads/ga-audiences".replace("%", t), e.google, b) : me("tld", "bcc", t));
										break;
									case "G":
										if (e.V) {
											e.V("G-" + t.substring(1)), n();
											break
										}
										case "x":
											if (e.V) {
												e.V(), n();
												break
											}
											default:
												me("xhr", "brc", r), n()
								}
							}
						},
						ve = function(e, t, n) {
							return !!O.navigator.sendBeacon && !!O.navigator.sendBeacon(e, t) && (n(), !0)
						},
						me = function(e, t, n) {
							1 <= 100 * Math.random() || H("?") || (e = ["t=error", "_e=" + e, "_v=j93", "sr=1"], t && e.push("_f=" + t), n && e.push("_m=" + w(n.substring(0, 100))), e.push("aip=1"), e.push("z=" + Pe()), fe(ae(!0) + "/u/d", e.join("&"), b))
						},
						ge = function() {
							return O.gaData = O.gaData || {}
						},
						ye = function(e) {
							var t = ge();
							return t[e] = t[e] || {}
						},
						be = function() {
							this.M = []
						};

					function we(t) {
						if (100 != t.get(Tn) && e(Le(t, dn)) % 1e4 >= 100 * De(t, Tn)) throw "abort"
					}

					function xe(e) {
						if (H(Le(e, mn))) throw "abort"
					}

					function Me() {
						var e = L.location.protocol;
						if ("http:" != e && "https:" != e) throw "abort"
					}

					function ze(e) {
						try {
							O.navigator.sendBeacon ? f(42) : O.XMLHttpRequest && "withCredentials" in new O.XMLHttpRequest && f(40)
						} catch (e) {}
						e.set(Ft, d(e), !0), e.set(Je, De(e, Je) + 1);
						var t = [];
						Ie.map((function(n, r) {
							r.F && null != (n = e.get(n)) && n != r.defaultValue && ("boolean" == typeof n && (n *= 1), t.push(r.F + "=" + w("" + n)))
						})), !1 === e.get(er) && t.push("npa=1"), t.push("z=" + Ae()), e.set(Ye, t.join("&"), !0)
					}

					function Ee(e) {
						var t = Le(e, Xe);
						!t && e.get(Ge) && (t = "beacon");
						var n = Le(e, Wn),
							r = Le(e, Rn),
							o = n || (r || ae(!1) + "") + "/collect";
						"d" === Le(e, Xn) ? (o = n || (r || ae(!1) + "") + "/j/collect", t = e.get(Gn) || void 0, ue(o, Le(e, Ye), t, e.Z($e))) : t ? (n = Le(e, Ye), r = (r = e.Z($e)) || b, "image" == t ? fe(o, n, r) : "xhr" == t && de(o, n, r) || "beacon" == t && ve(o, n, r) || ce(o, n, r)) : ce(o, Le(e, Ye), e.Z($e)), o = Le(e, mn), t = (o = ye(o)).hitcount, o.hitcount = t ? t + 1 : 1, o.first_hit || (o.first_hit = (new Date).getTime()), o = Le(e, mn), delete ye(o).pending_experiments, e.set($e, b, !0)
					}

					function ke(e) {
						ge().expId && e.set(Ot, ge().expId), ge().expVar && e.set(Lt, ge().expVar);
						var t = Le(e, mn);
						if (t = ye(t).pending_experiments) {
							var n = [];
							for (r in t) t.hasOwnProperty(r) && t[r] && n.push(encodeURIComponent(r) + "." + encodeURIComponent(t[r]));
							var r = n.join("!")
						} else r = void 0;
						r && ((t = e.get(Dt)) && (r = t + "!" + r), e.set(Dt, r, !0))
					}

					function Ce() {
						if (O.navigator && "preview" == O.navigator.loadPurpose) throw "abort"
					}

					function Se(e) {
						var t = O.gaDevIds || [];
						if (v(t)) {
							var n = e.get("&did");
							m(n) && 0 < n.length && (t = t.concat(n.split(","))), n = [];
							for (var r = 0; r < t.length; r++) A(n, t[r]) || n.push(t[r]);
							0 != n.length && e.set("&did", n.join(","), !0)
						}
					}

					function Te(e) {
						if (!e.get(mn)) throw "abort"
					}

					function Ne(e) {
						try {
							if (!e.get(Vn) && (e.set(Vn, !0), !e.get("&gtm"))) {
								var t = !1,
									n = O.location.search.split("?")[1];
								if (n && A(n.split("&"), "gtm_debug=x") && (t = !0), !t && g(L.referrer, "https://tagassistant.google.com/") && (t = !0), !t && A(L.cookie.split("; "), "__TAG_ASSISTANT=x") && (t = !0), !t && O.__TAG_ASSISTANT_API && (t = !0), t) {
									O["google.tagmanager.debugui2.queue"] || (O["google.tagmanager.debugui2.queue"] = [], k("https://www.google-analytics.com/debug/bootstrap"));
									var r = L.currentScript;
									O["google.tagmanager.debugui2.queue"].push({
										messageType: "LEGACY_CONTAINER_STARTING",
										data: {
											id: e.get(mn),
											scriptSource: r && r.src || ""
										}
									})
								}
							}
						} catch (e) {}
					}
					be.prototype.add = function(e) {
						this.M.push(e)
					}, be.prototype.D = function(e) {
						try {
							for (var t = 0; t < this.M.length; t++) {
								var n = e.get(this.M[t]);
								n && p(n) && n.call(O, e)
							}
						} catch (e) {}(t = e.get($e)) != b && p(t) && (e.set($e, b, !0), setTimeout(t, 10))
					};
					var Pe = function() {
							return Math.round(2147483647 * Math.random())
						},
						Ae = function() {
							try {
								var e = new Uint32Array(1);
								return O.crypto.getRandomValues(e), 2147483647 & e[0]
							} catch (e) {
								return Pe()
							}
						};

					function _e(e) {
						var t = De(e, Rt);
						500 <= t && f(15);
						var n = Le(e, We);
						if ("transaction" != n && "item" != n) {
							n = De(e, jt);
							var r = (new Date).getTime(),
								o = De(e, qt);
							if (0 == o && e.set(qt, r), 0 < (o = Math.round(2 * (r - o) / 1e3)) && (n = Math.min(n + o, 20), e.set(qt, r)), 0 >= n) throw "abort";
							e.set(jt, --n)
						}
						e.set(Rt, ++t)
					}
					var Oe = function() {
						this.data = new _
					};
					Oe.prototype.get = function(e) {
						var t = qe(e),
							n = this.data.get(e);
						return t && null == n && (n = p(t.defaultValue) ? t.defaultValue() : t.defaultValue), t && t.Z ? t.Z(this, e, n) : n
					};
					var Le = function(e, t) {
							return null == (e = e.get(t)) ? "" : "" + e
						},
						De = function(e, t) {
							return null == (e = e.get(t)) || "" === e ? 0 : Number(e)
						};
					Oe.prototype.Z = function(e) {
						return (e = this.get(e)) && p(e) ? e : b
					}, Oe.prototype.set = function(e, t, n) {
						if (e)
							if ("object" == typeof e)
								for (var r in e) e.hasOwnProperty(r) && Be(this, r, e[r], n);
							else Be(this, e, t, n)
					};
					var Be = function(e, t, n, r) {
							null != n && t === mn && no.test(n);
							var o = qe(t);
							o && o.o ? o.o(e, t, n, r) : e.data.set(t, n, r)
						},
						Ie = new _,
						He = [],
						Re = function(e, t, n, r, o) {
							this.name = e, this.F = t, this.Z = r, this.o = o, this.defaultValue = n
						},
						qe = function(e) {
							var t = Ie.get(e);
							if (!t)
								for (var n = 0; n < He.length; n++) {
									var r = He[n],
										o = r[0].exec(e);
									if (o) {
										t = r[1](o), Ie.set(t.name, t);
										break
									}
								}
							return t
						},
						je = function(e, t, n, r, o) {
							return e = new Re(e, t, n, r, o), Ie.set(e.name, e), e.name
						},
						Ze = function(e, t) {
							He.push([new RegExp("^" + e + "$"), t])
						},
						Fe = function(e, t, n) {
							return je(e, t, n, void 0, Ve)
						},
						Ve = function() {},
						Qe = Fe("apiVersion", "v"),
						Ue = Fe("clientVersion", "_v");
					je("anonymizeIp", "aip");
					var Ke = je("adSenseId", "a"),
						We = je("hitType", "t"),
						$e = je("hitCallback"),
						Ye = je("hitPayload");
					je("nonInteraction", "ni"), je("currencyCode", "cu"), je("dataSource", "ds");
					var Ge = je("useBeacon", void 0, !1),
						Xe = je("transport");
					je("sessionControl", "sc", ""), je("sessionGroup", "sg"), je("queueTime", "qt");
					var Je = je("_s", "_s");
					je("screenName", "cd");
					var et = je("location", "dl", ""),
						tt = je("referrer", "dr"),
						nt = je("page", "dp", "");
					je("hostname", "dh");
					var rt = je("language", "ul"),
						ot = je("encoding", "de");
					je("title", "dt", (function() {
						return L.title || void 0
					})), Ze("contentGroup([0-9]+)", (function(e) {
						return new Re(e[0], "cg" + e[1])
					}));
					var it = je("screenColors", "sd"),
						at = je("screenResolution", "sr"),
						lt = je("viewportSize", "vp"),
						st = je("javaEnabled", "je"),
						ct = je("flashVersion", "fl");
					je("campaignId", "ci"), je("campaignName", "cn"), je("campaignSource", "cs"), je("campaignMedium", "cm"), je("campaignKeyword", "ck"), je("campaignContent", "cc");
					var ut = je("eventCategory", "ec"),
						ft = je("eventAction", "ea"),
						dt = je("eventLabel", "el"),
						ht = je("eventValue", "ev"),
						pt = je("socialNetwork", "sn"),
						vt = je("socialAction", "sa"),
						mt = je("socialTarget", "st"),
						gt = je("l1", "plt"),
						yt = je("l2", "pdt"),
						bt = je("l3", "dns"),
						wt = je("l4", "rrt"),
						xt = je("l5", "srt"),
						Mt = je("l6", "tcp"),
						zt = je("l7", "dit"),
						Et = je("l8", "clt"),
						kt = je("l9", "_gst"),
						Ct = je("l10", "_gbt"),
						St = je("l11", "_cst"),
						Tt = je("l12", "_cbt"),
						Nt = je("timingCategory", "utc"),
						Pt = je("timingVar", "utv"),
						At = je("timingLabel", "utl"),
						_t = je("timingValue", "utt");
					je("appName", "an"), je("appVersion", "av", ""), je("appId", "aid", ""), je("appInstallerId", "aiid", ""), je("exDescription", "exd"), je("exFatal", "exf");
					var Ot = je("expId", "xid"),
						Lt = je("expVar", "xvar"),
						Dt = je("exp", "exp"),
						Bt = je("_utma", "_utma"),
						It = je("_utmz", "_utmz"),
						Ht = je("_utmht", "_utmht"),
						Rt = je("_hc", void 0, 0),
						qt = je("_ti", void 0, 0),
						jt = je("_to", void 0, 20);
					Ze("dimension([0-9]+)", (function(e) {
						return new Re(e[0], "cd" + e[1])
					})), Ze("metric([0-9]+)", (function(e) {
						return new Re(e[0], "cm" + e[1])
					})), je("linkerParam", void 0, void 0, (function(e) {
						if (e.get(Zt)) return f(35), Sr.generate(Ir(e));
						var t = Le(e, dn),
							n = Le(e, An) || "";
						return t = "_ga=2." + w(Ar(n + t, 0) + "." + n + "-" + t), (e = Hr(e)) ? (f(44), e = "&_gac=1." + w([Ar(e.qa, 0), e.timestamp, e.qa].join("."))) : e = "", t + e
					}), Ve);
					var Zt = Fe("_cd2l", void 0, !1),
						Ft = je("usage", "_u"),
						Vt = je("_um");
					je("forceSSL", void 0, void 0, (function() {
						return c
					}), (function(e, t, n) {
						f(34), c = !!n
					}));
					var Qt = je("_j1", "jid"),
						Ut = je("_j2", "gjid");
					Ze("\\&(.*)", (function(e) {
						var t = new Re(e[0], e[1]),
							n = function(e) {
								var t;
								return Ie.map((function(n, r) {
									r.F == e && (t = r)
								})), t && t.name
							}(e[0].substring(1));
						return n && (t.Z = function(e) {
							return e.get(n)
						}, t.o = function(e, t, r, o) {
							e.set(n, r, o)
						}, t.F = void 0), t
					}));
					var Kt = Fe("_oot"),
						Wt = je("previewTask"),
						$t = je("checkProtocolTask"),
						Yt = je("validationTask"),
						Gt = je("checkStorageTask"),
						Xt = je("historyImportTask"),
						Jt = je("samplerTask"),
						en = je("_rlt"),
						tn = je("buildHitTask"),
						nn = je("sendHitTask"),
						rn = je("ceTask"),
						on = je("devIdTask"),
						an = je("timingTask"),
						ln = je("displayFeaturesTask"),
						sn = je("customTask"),
						cn = je("fpsCrossDomainTask"),
						un = Fe("_cta"),
						fn = Fe("name"),
						dn = Fe("clientId", "cid"),
						hn = Fe("clientIdTime"),
						pn = Fe("storedClientId"),
						vn = je("userId", "uid"),
						mn = Fe("trackingId", "tid"),
						gn = Fe("cookieName", void 0, "_ga"),
						yn = Fe("cookieDomain"),
						bn = Fe("cookiePath", void 0, "/"),
						wn = Fe("cookieExpires", void 0, 63072e3),
						xn = Fe("cookieUpdate", void 0, !0),
						Mn = Fe("cookieFlags", void 0, ""),
						zn = Fe("legacyCookieDomain"),
						En = Fe("legacyHistoryImport", void 0, !0),
						kn = Fe("storage", void 0, "cookie"),
						Cn = Fe("allowLinker", void 0, !1),
						Sn = Fe("allowAnchor", void 0, !0),
						Tn = Fe("sampleRate", "sf", 100),
						Nn = Fe("siteSpeedSampleRate", void 0, 1),
						Pn = Fe("alwaysSendReferrer", void 0, !1),
						An = Fe("_gid", "_gid"),
						_n = Fe("_gcn"),
						On = Fe("useAmpClientId"),
						Ln = Fe("_gclid"),
						Dn = Fe("_gt"),
						Bn = Fe("_ge", void 0, 7776e6),
						In = Fe("_gclsrc"),
						Hn = Fe("storeGac", void 0, !0),
						Rn = je("_x_19"),
						qn = je("_fplc", "_fplc"),
						jn = Fe("_cs"),
						Zn = Fe("_useUp", void 0, !1),
						Fn = je("up", "up"),
						Vn = je("_tac", void 0, !1),
						Qn = Fe("_gbraid"),
						Un = Fe("_gbt"),
						Kn = Fe("_gbe", void 0, 7776e6),
						Wn = je("transportUrl"),
						$n = je("_r", "_r"),
						Yn = je("_slc", "_slc"),
						Gn = je("_dp"),
						Xn = je("_jt", void 0, "n"),
						Jn = je("allowAdFeatures", void 0, !0),
						er = je("allowAdPersonalizationSignals", void 0, !0);

					function tr(e, t, n, r) {
						t[e] = function() {
							try {
								return r && f(r), n.apply(this, arguments)
							} catch (t) {
								throw me("exc", e, t && t.name), t
							}
						}
					}
					var nr = function(e) {
							if ("cookie" == e.get(kn)) return 0 < (e = R("FPLC")).length ? e[0] : void 0
						},
						rr = function(e) {
							var t;
							(t = Le(e, Rn) && e.get(Zt)) && (t = !((t = Sr.get(e.get(Sn))) && t._fplc)), t && !nr(e) && e.set(qn, "0")
						},
						or = function(e) {
							var t = {};
							if (ir(t) || ar(t)) {
								var n = t[gt];
								null == n || 1 / 0 == n || isNaN(n) || (0 < n ? (lr(t, bt), lr(t, Mt), lr(t, xt), lr(t, yt), lr(t, wt), lr(t, zt), lr(t, Et), lr(t, kt), lr(t, Ct), lr(t, St), lr(t, Tt), D((function() {
									e(t)
								}), 10)) : x(O, "load", (function() {
									or(e)
								}), !1))
							}
						},
						ir = function(e) {
							var t = O.performance || O.webkitPerformance;
							if (!(t = t && t.timing)) return !1;
							var n = t.navigationStart;
							return 0 != n && (e[gt] = t.loadEventStart - n, e[bt] = t.domainLookupEnd - t.domainLookupStart, e[Mt] = t.connectEnd - t.connectStart, e[xt] = t.responseStart - t.requestStart, e[yt] = t.responseEnd - t.responseStart, e[wt] = t.fetchStart - n, e[zt] = t.domInteractive - n, e[Et] = t.domContentLoadedEventStart - n, e[kt] = Co.L - n, e[Ct] = Co.ya - n, O.google_tag_manager && O.google_tag_manager._li && (t = O.google_tag_manager._li, e[St] = t.cst, e[Tt] = t.cbt), !0)
						},
						ar = function(e) {
							if (O.top != O) return !1;
							var t = O.external,
								n = t && t.onloadT;
							return t && !t.isValidLoadTime && (n = void 0), 2147483648 < n && (n = void 0), 0 < n && t.setPageReadyTime(), null != n && (e[gt] = n, !0)
						},
						lr = function(e, t) {
							var n = e[t];
							(isNaN(n) || 1 / 0 == n || 0 > n) && (e[t] = void 0)
						},
						sr = !1,
						cr = function(e) {
							if ("cookie" == Le(e, kn)) {
								if (e.get(xn) || Le(e, pn) != Le(e, dn)) {
									var t = 1e3 * De(e, wn);
									ur(e, dn, gn, t), e.data.set(pn, Le(e, dn))
								}
								if ((e.get(xn) || fr(e) != Le(e, An)) && ur(e, An, _n, 864e5), e.get(Hn)) {
									if (t = Le(e, Ln)) {
										var n = Math.min(De(e, Bn), 1e3 * De(e, wn));
										n = 0 === n ? 0 : Math.min(n, 1e3 * De(e, Dn) + n - (new Date).getTime()), e.data.set(Bn, n);
										var r = {},
											o = Le(e, Dn),
											i = Le(e, In),
											a = wr(Le(e, bn)),
											l = yr(Le(e, yn)),
											s = Le(e, mn),
											c = Le(e, Mn);
										i && "aw.ds" != i ? r && (r.ua = !0) : (t = ["1", o, j(t)].join("."), 0 <= n && (r && (r.ta = !0), q("_gac_" + j(s), t, a, l, s, n, c))), Mr(r)
									}
								} else f(75);
								e.get(Hn) && (t = Le(e, Qn)) && (n = 0 === (n = Math.min(De(e, Kn), 1e3 * De(e, wn))) ? 0 : Math.min(n, 1e3 * De(e, Un) + n - (new Date).getTime()), e.data.set(Kn, n), r = {}, c = Le(e, Un), a = wr(Le(e, bn)), l = yr(Le(e, yn)), s = Le(e, mn), e = Le(e, Mn), t = ["1", c, j(t)].join("."), 0 <= n && (r && (r.ta = !0), q("_gac_gb_" + j(s), t, a, l, s, n, e)), zr(r))
							}
						},
						ur = function(e, t, n, r) {
							var o = pr(e, t);
							if (o) {
								n = Le(e, n);
								var i = wr(Le(e, bn)),
									a = yr(Le(e, yn)),
									l = Le(e, Mn),
									s = Le(e, mn);
								if ("auto" != a) q(n, o, i, a, s, r, l) && (sr = !0);
								else {
									f(32);
									for (var c = br(), u = 0; u < c.length; u++)
										if (a = c[u], e.data.set(yn, a), o = pr(e, t), q(n, o, i, a, s, r, l)) return void(sr = !0);
									e.data.set(yn, "auto")
								}
							}
						},
						fr = function(e) {
							var t = R(Le(e, _n));
							return vr(e, t)
						},
						dr = function(e) {
							if ("cookie" == Le(e, kn) && !sr && (cr(e), !sr)) throw "abort"
						},
						hr = function(e) {
							if (e.get(En)) {
								var t = Le(e, yn),
									n = Le(e, zn) || T(),
									r = Er("__utma", n, t);
								r && (f(19), e.set(Ht, (new Date).getTime(), !0), e.set(Bt, r.R), (t = Er("__utmz", n, t)) && r.hash == t.hash && e.set(It, t.R))
							}
						},
						pr = function(e, t) {
							t = j(Le(e, t));
							var n = yr(Le(e, yn)).split(".").length;
							return 1 < (e = xr(Le(e, bn))) && (n += "-" + e), t ? ["GA1", n, t].join(".") : ""
						},
						vr = function(e, t) {
							return mr(t, Le(e, yn), Le(e, bn))
						},
						mr = function(e, t, n) {
							if (!e || 1 > e.length) f(12);
							else {
								for (var r = [], o = 0; o < e.length; o++) {
									var i = e[o],
										a = i.split("."),
										l = a.shift();
									("GA1" == l || "1" == l) && 1 < a.length ? (1 == (i = a.shift().split("-")).length && (i[1] = "1"), i[0] *= 1, i[1] *= 1, a = {
										H: i,
										s: a.join(".")
									}) : a = s.test(i) ? {
										H: [0, 0],
										s: i
									} : void 0, a && r.push(a)
								}
								if (1 == r.length) return f(13), r[0].s;
								if (0 != r.length) return f(14), 1 == (r = gr(r, yr(t).split(".").length, 0)).length ? r[0].s : (1 < (r = gr(r, xr(n), 1)).length && f(41), r[0] && r[0].s);
								f(12)
							}
						},
						gr = function(e, t, n) {
							for (var r, o = [], i = [], a = 0; a < e.length; a++) {
								var l = e[a];
								l.H[n] == t ? o.push(l) : null == r || l.H[n] < r ? (i = [l], r = l.H[n]) : l.H[n] == r && i.push(l)
							}
							return 0 < o.length ? o : i
						},
						yr = function(e) {
							return 0 == e.indexOf(".") ? e.substr(1) : e
						},
						br = function() {
							var e = [],
								t = T().split(".");
							if (4 == t.length) {
								var n = t[t.length - 1];
								if (parseInt(n, 10) == n) return ["none"]
							}
							for (n = t.length - 2; 0 <= n; n--) e.push(t.slice(n).join("."));
							return t = L.location.hostname, F.test(t) || Z.test(t) || e.push("none"), e
						},
						wr = function(e) {
							return e ? (1 < e.length && e.lastIndexOf("/") == e.length - 1 && (e = e.substr(0, e.length - 1)), 0 != e.indexOf("/") && (e = "/" + e), e) : "/"
						},
						xr = function(e) {
							return "/" == (e = wr(e)) ? 1 : e.split("/").length
						},
						Mr = function(e) {
							e.ta && f(77), e.na && f(74), e.pa && f(73), e.ua && f(69)
						},
						zr = function(e) {
							e.ta && f(85), e.na && f(86), e.pa && f(87)
						};

					function Er(e, t, n) {
						"none" == t && (t = "");
						var r = [],
							o = R(e);
						e = "__utma" == e ? 6 : 2;
						for (var i = 0; i < o.length; i++) {
							var a = ("" + o[i]).split(".");
							a.length >= e && r.push({
								hash: a[0],
								R: o[i],
								O: a
							})
						}
						if (0 != r.length) return 1 == r.length ? r[0] : kr(t, r) || kr(n, r) || kr(null, r) || r[0]
					}

					function kr(t, n) {
						if (null == t) var r = t = 1;
						else r = e(t), t = e(g(t, ".") ? t.substring(1) : "." + t);
						for (var o = 0; o < n.length; o++)
							if (n[o].hash == r || n[o].hash == t) return n[o]
					}
					var Cr = new RegExp(/^https?:\/\/([^\/:]+)/),
						Sr = O.google_tag_data.glBridge,
						Tr = /(.*)([?&#])(?:_ga=[^&#]*)(?:&?)(.*)/,
						Nr = /(.*)([?&#])(?:_gac=[^&#]*)(?:&?)(.*)/;

					function Pr(t, n) {
						var r = new Date,
							o = O.navigator,
							i = o.plugins || [];
						for (t = [t, o.userAgent, r.getTimezoneOffset(), r.getYear(), r.getDate(), r.getHours(), r.getMinutes() + n], n = 0; n < i.length; ++n) t.push(i[n].description);
						return e(t.join("."))
					}

					function Ar(t, n) {
						var r = new Date,
							o = O.navigator,
							i = r.getHours() + Math.floor((r.getMinutes() + n) / 60);
						return e([t, o.userAgent, o.language || "", r.getTimezoneOffset(), r.getYear(), r.getDate() + Math.floor(i / 24), (24 + i) % 24, (60 + r.getMinutes() + n) % 60].join("."))
					}
					var _r = function(e) {
						f(48), this.target = e, this.T = !1
					};
					_r.prototype.ca = function(e, t) {
						if (e) {
							if (this.target.get(Zt)) return Sr.decorate(Ir(this.target), e, t);
							if (e.tagName) {
								if ("a" == e.tagName.toLowerCase()) return void(e.href && (e.href = Or(this, e.href, t)));
								if ("form" == e.tagName.toLowerCase()) return Lr(this, e)
							}
							if ("string" == typeof e) return Or(this, e, t)
						}
					};
					var Or = function(e, t, n) {
							var r = Tr.exec(t);
							r && 3 <= r.length && (t = r[1] + (r[3] ? r[2] + r[3] : "")), (r = Nr.exec(t)) && 3 <= r.length && (t = r[1] + (r[3] ? r[2] + r[3] : "")), e = e.target.get("linkerParam"), r = t.indexOf("?");
							var o = t.indexOf("#");
							return (t = (t = n ? t + (-1 == o ? "#" : "&") + e : -1 == o ? t + (-1 === r ? "?" : "&") + e : t.substring(0, o) + (-1 === r || r > o ? "?" : "&") + e + t.substring(o)).replace(/&+_ga=/, "&_ga=")).replace(/&+_gac=/, "&_gac=")
						},
						Lr = function(e, t) {
							if (t && t.action)
								if ("get" == t.method.toLowerCase()) {
									e = e.target.get("linkerParam").split("&");
									for (var n = 0; n < e.length; n++) {
										var r = e[n].split("="),
											o = r[1];
										r = r[0];
										for (var i = t.childNodes || [], a = !1, l = 0; l < i.length; l++)
											if (i[l].name == r) {
												i[l].setAttribute("value", o), a = !0;
												break
											} a || ((i = L.createElement("input")).setAttribute("type", "hidden"), i.setAttribute("name", r), i.setAttribute("value", o), t.appendChild(i))
									}
								} else "post" == t.method.toLowerCase() && (t.action = Or(e, t.action))
						};

					function Dr(e, t) {
						if (t == L.location.hostname) return !1;
						for (var n = 0; n < e.length; n++)
							if (e[n] instanceof RegExp) {
								if (e[n].test(t)) return !0
							} else if (0 <= t.indexOf(e[n])) return !0;
						return !1
					}

					function Br(e, t) {
						return t != Pr(e, 0) && t != Pr(e, -1) && t != Pr(e, -2) && t != Ar(e, 0) && t != Ar(e, -1) && t != Ar(e, -2)
					}

					function Ir(e) {
						var t = Hr(e),
							n = {};
						return n._ga = e.get(dn), n._gid = e.get(An) || void 0, n._gac = t ? [t.qa, t.timestamp].join(".") : void 0, t = e.get(qn), e = nr(e), n._fplc = t && "0" !== t ? t : e, n
					}

					function Hr(e) {
						function t(e) {
							return null == e || "" === e ? 0 : Number(e)
						}
						var n = e.get(Ln);
						if (n && e.get(Hn)) {
							var r = t(e.get(Dn));
							if (!(1e3 * r + t(e.get(Bn)) <= (new Date).getTime())) return {
								timestamp: r,
								qa: n
							};
							f(76)
						}
					}
					_r.prototype.S = function(e, t, n) {
						function r(n) {
							try {
								n = n || O.event;
								e: {
									var r = n.target || n.srcElement;
									for (n = 100; r && 0 < n;) {
										if (r.href && r.nodeName.match(/^a(?:rea)?$/i)) {
											var i = r;
											break e
										}
										r = r.parentNode, n--
									}
									i = {}
								}("http:" == i.protocol || "https:" == i.protocol) && Dr(e, i.hostname || "") && i.href && (i.href = Or(o, i.href, t))
							} catch (e) {
								f(26)
							}
						}
						var o = this;
						this.target.get(Zt) ? Sr.auto((function() {
							return Ir(o.target)
						}), e, t ? "fragment" : "", n) : (this.T || (this.T = !0, x(L, "mousedown", r, !1), x(L, "keyup", r, !1)), n && x(L, "submit", (function(t) {
							if ((t = (t = t || O.event).target || t.srcElement) && t.action) {
								var n = t.action.match(Cr);
								n && Dr(e, n[1]) && Lr(o, t)
							}
						})))
					}, _r.prototype.$ = function(e) {
						if (e) {
							var t = this,
								n = t.target.get(jn);
							void 0 !== n && Sr.passthrough((function() {
								if (n("analytics_storage")) return {};
								var e = {};
								return e._ga = t.target.get(dn), e._up = "1", e
							}), 1, !0)
						}
					};
					var Rr = /^(GTM|OPT)-[A-Z0-9]+$/,
						qr = /^G-[A-Z0-9]+$/,
						jr = /;_gaexp=[^;]*/g,
						Zr = /;((__utma=)|([^;=]+=GAX?\d+\.))[^;]*/g,
						Fr = /^https?:\/\/[\w\-.]+\.google.com(:\d+)?\/optimize\/opt-launch\.html\?.*$/,
						Vr = function(e, t, n, r) {
							n = n || {};
							var o = 1;
							qr.test(t) && (o = 2);
							var i = {
									id: t,
									type: o,
									B: n.dataLayer || "dataLayer",
									G: !1
								},
								a = void 0;
							return e.get("&gtm") == t && (i.G = !0), 1 === o ? (i.ia = !!e.get("anonymizeIp"), i.sync = r, "t0" != (t = String(e.get("name"))) && (i.target = t), H(String(e.get("trackingId"))) || (i.clientId = String(e.get(dn)), i.ka = Number(e.get(hn)), n = n.palindrome ? Zr : jr, n = (n = L.cookie.replace(/^|(; +)/g, ";").match(n)) ? n.sort().join("").substring(1) : void 0, i.la = n, i.qa = S(Le(e, et), "gclid"))) : 2 === o && (i.context = "c", a = {
									allow_google_signals: e.get(Jn),
									allow_ad_personalization_signals: e.get(er)
								}),
								function(e, t) {
									var n = (new Date).getTime();
									O[e.B] = O[e.B] || [], n = {
										"gtm.start": n
									}, e.sync || (n.event = "gtm.js"), O[e.B].push(n), 2 === e.type && function(t, n, r) {
										O[e.B].push(arguments)
									}("config", e.id, t)
								}(i, a),
								function(e) {
									function t(e, t) {
										t && (n += "&" + e + "=" + w(t))
									}
									var n = le(e.type) + w(e.id);
									return "dataLayer" != e.B && t("l", e.B), t("cx", e.context), t("t", e.target), t("cid", e.clientId), t("cidt", e.ka), t("gac", e.la), t("aip", e.ia), e.sync && t("m", "sync"), t("cycle", e.G), e.qa && t("gclid", e.qa), Fr.test(L.referrer) && t("cb", String(Pe())), n
								}(i)
						},
						Qr = {},
						Ur = function(e, t) {
							t || (t = (t = Le(e, fn)) && "t0" != t ? Jr.test(t) ? "_gat_" + j(Le(e, mn)) : "_gat_" + j(t) : "_gat"), this.Y = t
						},
						Kr = function(e, t, n) {
							!1 === t.get(Jn) || t.get(n) || ("1" == R(e.Y)[0] ? t.set(n, "", !0) : t.set(n, "" + Pe(), !0))
						},
						Wr = function(e, t) {
							$r(t) && q(e.Y, "1", Le(t, bn), Le(t, yn), Le(t, mn), 6e4, Le(t, Mn))
						},
						$r = function(e) {
							return !!e.get(Qt) && !1 !== e.get(Jn)
						},
						Yr = function(e) {
							return !Qr[Le(e, mn)] && void 0 === e.get("&gtm") && void 0 === e.get(Xe) && void 0 === e.get(Wn) && void 0 === e.get(Rn)
						},
						Gr = function(e, t) {
							var n = new _,
								r = function(t) {
									qe(t).F && n.set(qe(t).F, e.get(t))
								};
							r(Qe), r(Ue), r(mn), r(dn), r(Qt), 1 == t && (r(vn), r(Ut), r(An)), !1 === e.get(er) && n.set("npa", "1"), n.set(qe(Ft).F, d(e));
							var o = "";
							return n.map((function(e, t) {
								o += w(e) + "=", o += w("" + t) + "&"
							})), o += "z=" + Pe(), 1 == t ? o = "t=dc&aip=1&_r=3&" + o : 2 == t && (o = "t=sr&aip=1&_r=4&slf_rd=1&" + o), o
						},
						Xr = function(e) {
							if (Yr(e)) return Qr[Le(e, mn)] = !0,
								function(t) {
									if (t && !Qr[t]) {
										var n = Vr(e, t);
										k(n), Qr[t] = !0
									}
								}
						},
						Jr = /^gtm\d+$/,
						eo = function(e, n) {
							if (!(e = e.model).get("dcLoaded")) {
								var r, o = new t(h(e));
								o.set(29), e.set(Vt, o.C), (n = n || {})[gn] && (r = j(n[gn])),
									function(e, t) {
										var n = t.get(tn);
										t.set(tn, (function(t) {
											Kr(e, t, Qt), Kr(e, t, Ut);
											var r = n(t);
											return Wr(e, t), r
										}));
										var r = t.get(nn);
										t.set(nn, (function(e) {
											var t = r(e);
											if ($r(e)) {
												f(80);
												var n = {
													U: Gr(e, 1),
													google: Gr(e, 2),
													count: 0
												};
												ue("https://stats.g.doubleclick.net/j/collect", n.U, n), e.set(Qt, "", !0)
											}
											return t
										}))
									}(n = new Ur(e, r), e), e.set("dcLoaded", !0)
							}
						},
						to = function(e) {
							if (!e.get("dcLoaded") && "cookie" == e.get(kn)) {
								var t = new Ur(e);
								Kr(t, e, Qt), Kr(t, e, Ut), Wr(t, e), t = $r(e);
								var n = Yr(e);
								t && e.set($n, 1, !0), n && e.set(Yn, 1, !0), (t || n) && (e.set(Xn, "d", !0), f(79), e.set(Gn, {
									U: Gr(e, 1),
									google: Gr(e, 2),
									V: Xr(e),
									count: 0
								}, !0))
							}
						},
						no = /^(UA|YT|MO|GP)-(\d+)-(\d+)$/,
						ro = function(t) {
							function n(e, t) {
								o.model.data.set(e, t)
							}

							function r(e, t) {
								n(e, t), o.filters.add(e)
							}
							var o = this;
							this.model = new Oe, this.filters = new be, n(fn, t[fn]), n(mn, function(e) {
								return e ? e.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") : ""
							}(t[mn])), n(gn, t[gn]), n(yn, t[yn] || T()), n(bn, t[bn]), n(wn, t[wn]), n(xn, t[xn]), n(Mn, t[Mn]), n(zn, t[zn]), n(En, t[En]), n(Cn, t[Cn]), n(Sn, t[Sn]), n(Tn, t[Tn]), n(Nn, t[Nn]), n(Pn, t[Pn]), n(kn, t[kn]), n(vn, t[vn]), n(hn, t[hn]), n(On, t[On]), n(Hn, t[Hn]), n(Zt, t[Zt]), n(Rn, t[Rn]), n(Zn, t[Zn]), n(jn, t[jn]), n(Qe, 1), n(Ue, "j93"), r(un, Ne), r(Kt, xe), r(sn, b), r(Wt, Ce), r($t, Me), r(Yt, Te), r(Gt, dr), r(Xt, hr), r(Jt, we), r(en, _e), r(rn, ke), r(on, Se), r(ln, to), r(cn, rr), r(tn, ze), r(nn, Ee), r(an, function(t) {
								return function(n) {
									if ("pageview" == n.get(We) && !t.I) {
										t.I = !0;
										var r = function(t) {
												var n = Math.min(De(t, Nn), 100);
												return !(e(Le(t, dn)) % 100 >= n)
											}(n),
											o = 0 < S(Le(n, et), "gclid").length,
											i = 0 < S(Le(n, et), "wbraid").length;
										(r || o || i) && or((function(e) {
											r && t.send("timing", e), (o || i) && t.send("adtiming", e)
										}))
									}
								}
							}(this)), co(this.model), so(this.model, t[dn]), this.model.set(Ke, function() {
								var e = O.gaGlobal = O.gaGlobal || {};
								return e.hid = e.hid || Pe()
							}())
						};
					ro.prototype.get = function(e) {
						return this.model.get(e)
					}, ro.prototype.set = function(e, t) {
						this.model.set(e, t)
					}, ro.prototype.send = function(e) {
						if (!(1 > arguments.length)) {
							if ("string" == typeof arguments[0]) var t = arguments[0],
								n = [].slice.call(arguments, 1);
							else t = arguments[0] && arguments[0][We], n = arguments;
							t && ((n = P(uo[t] || [], n))[We] = t, this.model.set(n, void 0, !0), this.filters.D(this.model), this.model.data.m = {})
						}
					}, ro.prototype.ma = function(e, t) {
						var n = this;
						go(e, n, t) || (bo(e, (function() {
							go(e, n, t)
						})), yo(String(n.get(fn)), e, void 0, t, !0))
					};
					var oo, io, ao, lo, so = function(e, t) {
							var n = Le(e, gn);
							if (e.data.set(_n, "_ga" == n ? "_gid" : n + "_gid"), "cookie" == Le(e, kn)) {
								if (sr = !1, n = R(Le(e, gn)), !(n = vr(e, n))) {
									n = Le(e, yn);
									var r = Le(e, zn) || T();
									null != (n = Er("__utma", r, n)) ? (f(10), n = n.O[1] + "." + n.O[2]) : n = void 0
								}
								if (n && (sr = !0), r = n && !e.get(xn))
									if (2 != (r = n.split(".")).length) r = !1;
									else if (r = Number(r[1])) {
									var o = De(e, wn);
									r = r + o < (new Date).getTime() / 1e3
								} else r = !1;
								r && (n = void 0), n && (e.data.set(pn, n), e.data.set(dn, n), (n = fr(e)) && e.data.set(An, n)), e.get(Hn) && (n = e.get(Ln), r = e.get(In), !n || r && "aw.ds" != r) && (n = {}, r = (L ? V(n) : {})[Le(e, mn)], Mr(n), r && 0 != r.length && (n = r[0], e.data.set(Dn, n.timestamp / 1e3), e.data.set(Ln, n.qa))), e.get(Hn) && (n = e.get(Qn), r = {}, o = (L ? V(r, "_gac_gb", !0) : {})[Le(e, mn)], zr(r), o && 0 != o.length && (o = (r = o[0]).qa, n && n !== o || (r.labels && r.labels.length && (o += "." + r.labels.join(".")), e.data.set(Un, r.timestamp / 1e3), e.data.set(Qn, o))))
							}
							if (e.get(xn)) {
								n = C("_ga", !!e.get(Sn));
								var i = C("_gl", !!e.get(Sn));
								if (o = (r = Sr.get(e.get(Sn)))._ga, i && 0 < i.indexOf("_ga*") && !o && f(30), t || !e.get(Zn)) i = !1;
								else if (void 0 === (i = e.get(jn)) || i("analytics_storage")) i = !1;
								else {
									if (f(84), e.data.set(Fn, 1), i = r._up)
										if (i = Cr.exec(L.referrer)) {
											i = i[1];
											var a = L.location.hostname;
											i = a === i || 0 <= a.indexOf("." + i) || 0 <= i.indexOf("." + a)
										} else i = !1;
									i = !!i
								}
								a = r.gclid;
								var s = r._gac;
								if (n || o || a || s)
									if (n && o && f(36), e.get(Cn) || ie(e.get(On)) || i) {
										if (o && (f(38), e.data.set(dn, o), r._gid && (f(51), e.data.set(An, r._gid))), a ? (f(82), e.data.set(Ln, a), r.gclsrc && e.data.set(In, r.gclsrc)) : s && (o = s.split(".")) && 2 === o.length && (f(37), e.data.set(Ln, o[0]), e.data.set(Dn, o[1])), (r = r._fplc) && Le(e, Rn) && (f(83), e.data.set(qn, r)), n) e: if (r = n.indexOf("."), -1 == r) f(22);
											else {
												if (o = n.substring(0, r), r = (i = n.substring(r + 1)).indexOf("."), n = i.substring(0, r), i = i.substring(r + 1), "1" == o) {
													if (Br(r = i, n)) {
														f(23);
														break e
													}
												} else {
													if ("2" != o) {
														f(22);
														break e
													}
													if (o = "", 0 < (r = i.indexOf("-")) ? (o = i.substring(0, r), r = i.substring(r + 1)) : r = i.substring(1), Br(o + r, n)) {
														f(53);
														break e
													}
													o && (f(2), e.data.set(An, o))
												}
												f(11), e.data.set(dn, r), (n = C("_gac", !!e.get(Sn))) && ("1" != (n = n.split("."))[0] || 4 != n.length ? f(72) : Br(n[3], n[1]) ? f(71) : (e.data.set(Ln, n[3]), e.data.set(Dn, n[2]), f(70)))
											}
									} else f(21)
							}
							t && (f(9), e.data.set(dn, w(t))), e.get(dn) || ((t = (t = O.gaGlobal) && t.from_cookie && "cookie" !== Le(e, kn) ? void 0 : (t = t && t.vid) && -1 !== t.search(l) ? t : void 0) ? (f(17), e.data.set(dn, t)) : (f(8), e.data.set(dn, y()))), e.get(An) || (f(3), e.data.set(An, y())), cr(e), t = O.gaGlobal = O.gaGlobal || {}, e = (n = Le(e, dn)) === Le(e, pn), (null == t.vid || e && !t.from_cookie) && (t.vid = n, t.from_cookie = e)
						},
						co = function(e) {
							var t, n = O.navigator,
								r = O.screen,
								o = L.location,
								i = e.set;
							e: {
								var a = !!e.get(Pn),
									l = !!e.get(On),
									s = L.referrer;
								if (/^(https?|android-app):\/\//i.test(s)) {
									if (a) break e;
									if (a = "//" + L.location.hostname, !N(s, a)) {
										if (l && (l = a.replace(/\./g, "-") + ".cdn.ampproject.org", N(s, l))) {
											s = void 0;
											break e
										}
										break e
									}
								}
								s = void 0
							}
							if (i.call(e, tt, s), o && ("/" != (i = o.pathname || "").charAt(0) && (f(31), i = "/" + i), e.set(et, o.protocol + "//" + o.hostname + i + o.search)), r && e.set(at, r.width + "x" + r.height), r && e.set(it, r.colorDepth + "-bit"), r = L.documentElement, s = (i = L.body) && i.clientWidth && i.clientHeight, l = [], r && r.clientWidth && r.clientHeight && ("CSS1Compat" === L.compatMode || !s) ? l = [r.clientWidth, r.clientHeight] : s && (l = [i.clientWidth, i.clientHeight]), r = 0 >= l[0] || 0 >= l[1] ? "" : l.join("x"), e.set(lt, r), r = e.set, (i = (i = O.navigator) ? i.plugins : null) && i.length)
								for (s = 0; s < i.length && !t; s++) - 1 < (l = i[s]).name.indexOf("Shockwave Flash") && (t = l.description);
							if (!t) try {
								var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
								t = c.GetVariable("$version")
							} catch (e) {}
							if (!t) try {
								c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), t = "WIN 6,0,21,0", c.AllowScriptAccess = "always", t = c.GetVariable("$version")
							} catch (e) {}
							if (!t) try {
								t = (c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
							} catch (e) {}
							if (t && (c = t.match(/[\d]+/g)) && 3 <= c.length && (t = c[0] + "." + c[1] + " r" + c[2]), r.call(e, ct, t || void 0), e.set(ot, L.characterSet || L.charset), e.set(st, n && "function" == typeof n.javaEnabled && n.javaEnabled() || !1), e.set(rt, (n && (n.language || n.browserLanguage) || "").toLowerCase()), e.data.set(Ln, C("gclid", !0)), e.data.set(In, C("gclsrc", !0)), e.data.set(Dn, Math.round((new Date).getTime() / 1e3)), e.get(Ln) || (e.data.set(Qn, C("wbraid", !0)), e.data.set(Un, Math.round((new Date).getTime() / 1e3))), o && e.get(Sn) && (n = L.location.hash)) {
								for (n = n.split(/[?&#]+/), o = [], t = 0; t < n.length; ++t)(g(n[t], "utm_id") || g(n[t], "utm_campaign") || g(n[t], "utm_source") || g(n[t], "utm_medium") || g(n[t], "utm_term") || g(n[t], "utm_content") || g(n[t], "gclid") || g(n[t], "dclid") || g(n[t], "gclsrc") || g(n[t], "wbraid")) && o.push(n[t]);
								0 < o.length && (n = "#" + o.join("&"), e.set(et, e.get(et) + n))
							}
						},
						uo = {
							pageview: [nt],
							event: [ut, ft, dt, ht],
							social: [pt, vt, mt],
							timing: [Nt, Pt, _t, At]
						},
						fo = function(e) {
							return "prerender" != L.visibilityState && (e(), !0)
						},
						ho = function(e) {
							if (!fo(e)) {
								f(16);
								var t = !1,
									n = function() {
										if (!t && fo(e)) {
											t = !0;
											var r = n,
												o = L;
											o.removeEventListener ? o.removeEventListener("visibilitychange", r, !1) : o.detachEvent && o.detachEvent("onvisibilitychange", r)
										}
									};
								x(L, "visibilitychange", n)
							}
						},
						po = /^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,
						vo = function(e) {
							if (p(e[0])) this.u = e[0];
							else {
								var t = po.exec(e[0]);
								if (null != t && 4 == t.length && (this.da = t[1] || "t0", this.K = t[2] || "", this.methodName = t[3], this.aa = [].slice.call(e, 1), this.K || (this.A = "create" == this.methodName, this.i = "require" == this.methodName, this.g = "provide" == this.methodName, this.ba = "remove" == this.methodName), this.i && (3 <= this.aa.length ? (this.X = this.aa[1], this.W = this.aa[2]) : this.aa[1] && (m(this.aa[1]) ? this.X = this.aa[1] : this.W = this.aa[1]))), t = e[1], e = e[2], !this.methodName) throw "abort";
								if (this.i && (!m(t) || "" == t)) throw "abort";
								if (this.g && (!m(t) || "" == t || !p(e))) throw "abort";
								if (mo(this.da) || mo(this.K)) throw "abort";
								if (this.g && "t0" != this.da) throw "abort"
							}
						};

					function mo(e) {
						return 0 <= e.indexOf(".") || 0 <= e.indexOf(":")
					}
					oo = new _, ao = new _, lo = new _, io = {
						ec: 45,
						ecommerce: 46,
						linkid: 47
					};
					var go = function(e, t, n) {
							t == Co || t.get(fn);
							var r = oo.get(e);
							return !!p(r) && (t.plugins_ = t.plugins_ || new _, t.plugins_.get(e) || t.plugins_.set(e, new r(t, n || {})), !0)
						},
						yo = function(e, t, n, r, o) {
							if (!p(oo.get(t)) && !ao.get(t)) {
								io.hasOwnProperty(t) && f(io[t]), e = Co.j(e);
								var i = void 0;
								if (Rr.test(t)) {
									if (f(52), !e) return !0;
									n = Vr(e.model, t, r, o), i = function() {
										ko.D(["provide", t, function() {}]);
										var e = O[r && r.dataLayer || "dataLayer"];
										e && e.hide && p(e.hide.end) && e.hide[t] && (e.hide.end(), e.hide.end = void 0)
									}
								}
								if (!n && io.hasOwnProperty(t) ? (f(39), n = t + ".js") : f(43), n) {
									if (e) {
										var a = e.get(Rn);
										m(a) || (a = void 0)
									}
									e = zo(Eo(n, a)), e = !a || Mo(e.protocol) && xo(e) ? e : zo(Eo(n)), Mo(e.protocol) && xo(e) && (k(e.url, void 0, o, void 0, i), ao.set(t, !0))
								}
							}
						},
						bo = function(e, t) {
							var n = lo.get(e) || [];
							n.push(t), lo.set(e, n)
						},
						wo = function(e, t) {
							oo.set(e, t), t = lo.get(e) || [];
							for (var n = 0; n < t.length; n++) t[n]();
							lo.set(e, [])
						},
						xo = function(e) {
							var t = zo(L.location.href);
							return !(!g(e.url, le(1)) && !g(e.url, le(2)) && (e.query || 0 <= e.url.indexOf("?") || 0 <= e.path.indexOf("://") || (e.host != t.host || e.port != t.port) && (t = "http:" == e.protocol ? 80 : 443, "www.google-analytics.com" != e.host || (e.port || t) != t || !g(e.path, "/plugins/"))))
						},
						Mo = function(e) {
							var t = L.location.protocol;
							return "https:" == e || e == t || "http:" == e && "http:" == t
						},
						zo = function(e) {
							function t(e) {
								var t = e.hostname || "",
									n = 0 <= t.indexOf("]");
								return t = t.split(n ? "]" : ":")[0].toLowerCase(), n && (t += "]"), n = (e.protocol || "").toLowerCase(), n = 1 * e.port || ("http:" == n ? 80 : "https:" == n ? 443 : ""), e = e.pathname || "", g(e, "/") || (e = "/" + e), [t, "" + n, e]
							}
							var n = L.createElement("a");
							n.href = L.location.href;
							var r = (n.protocol || "").toLowerCase(),
								o = t(n),
								i = n.search || "",
								a = r + "//" + o[0] + (o[1] ? ":" + o[1] : "");
							return g(e, "//") ? e = r + e : g(e, "/") ? e = a + e : !e || g(e, "?") ? e = a + o[2] + (e || i) : 0 > e.split("/")[0].indexOf(":") && (e = a + o[2].substring(0, o[2].lastIndexOf("/")) + "/" + e), n.href = e, r = t(n), {
								protocol: (n.protocol || "").toLowerCase(),
								host: r[0],
								port: r[1],
								path: r[2],
								query: n.search || "",
								url: e || ""
							}
						},
						Eo = function(e, t) {
							return e && 0 <= e.indexOf("/") ? e : (t || ae(!1)) + "/plugins/ua/" + e
						},
						ko = {
							ga: function() {
								ko.fa = []
							}
						};
					ko.ga(), ko.D = function(e) {
						var t = ko.J.apply(ko, arguments);
						for (t = ko.fa.concat(t), ko.fa = []; 0 < t.length && !ko.v(t[0]) && (t.shift(), !(0 < ko.fa.length)););
						ko.fa = ko.fa.concat(t)
					}, ko.ra = function(e) {
						Co.q && (300 === Co.q.length && (Co.q.shift(), Co.qd++), Co.q.push(e))
					}, ko.J = function(e) {
						for (var t = [], n = 0; n < arguments.length; n++) try {
							var r = new vo(arguments[n]);
							r.g ? wo(r.aa[0], r.aa[1]) : (r.i && (r.ha = yo(r.da, r.aa[0], r.X, r.W)), t.push(r)), ko.ra(arguments[n])
						} catch (e) {}
						return t
					}, ko.v = function(e) {
						try {
							if (e.u) e.u.call(O, Co.j("t0"));
							else {
								var t = e.da == a ? Co : Co.j(e.da);
								if (e.A) {
									if ("t0" == e.da && null === (t = Co.create.apply(Co, e.aa))) return !0
								} else if (e.ba) Co.remove(e.da);
								else if (t)
									if (e.i) {
										if (e.ha && (e.ha = yo(e.da, e.aa[0], e.X, e.W)), !go(e.aa[0], t, e.W)) return !0
									} else if (e.K) {
									var n = e.methodName,
										r = e.aa,
										o = t.plugins_.get(e.K);
									o[n].apply(o, r)
								} else t[e.methodName].apply(t, e.aa)
							}
						} catch (e) {}
					};
					var Co = function(e) {
						f(1), ko.D.apply(ko, [arguments])
					};
					Co.h = {}, Co.P = [], Co.L = 0, Co.ya = 0, Co.answer = 42;
					var So = [mn, yn, fn];
					Co.create = function(e) {
						var t = P(So, [].slice.call(arguments));
						t[fn] || (t[fn] = "t0");
						var n = "" + t[fn];
						if (Co.h[n]) return Co.h[n];
						if (X(t)) return null;
						if (t = new ro(t), Co.h[n] = t, Co.P.push(t), n = ge().tracker_created, p(n)) try {
							n(t)
						} catch (e) {}
						return t
					}, Co.remove = function(e) {
						for (var t = 0; t < Co.P.length; t++)
							if (Co.P[t].get(fn) == e) {
								Co.P.splice(t, 1), Co.h[e] = null;
								break
							}
					}, Co.j = function(e) {
						return Co.h[e]
					}, Co.getAll = function() {
						return Co.P.slice(0)
					}, Co.N = function() {
						"ga" != a && f(49);
						var e = O[a];
						if (!e || 42 != e.answer) {
							Co.L = e && e.l, Co.ya = 1 * new Date, Co.loaded = !0;
							var t = e && e.q,
								n = v(t);
							if (e = [], n ? e = t.slice(0) : f(50), Co.q = n ? t : [], Co.q.splice(0), Co.qd = 0, tr("create", t = O[a] = Co, t.create), tr("remove", t, t.remove), tr("getByName", t, t.j, 5), tr("getAll", t, t.getAll, 6), tr("get", t = ro.prototype, t.get, 7), tr("set", t, t.set, 4), tr("send", t, t.send), tr("requireSync", t, t.ma), tr("get", t = Oe.prototype, t.get), tr("set", t, t.set), "https:" != L.location.protocol && !c) {
								e: {
									for (t = L.getElementsByTagName("script"), n = 0; n < t.length && 100 > n; n++) {
										var r = t[n].src;
										if (r && 0 == r.indexOf(ae(!0) + "/analytics")) {
											t = !0;
											break e
										}
									}
									t = !1
								}
								t && (c = !0)
							}(O.gaplugins = O.gaplugins || {}).Linker = _r, t = _r.prototype, wo("linker", _r), tr("decorate", t, t.ca, 20), tr("autoLink", t, t.S, 25), tr("passthrough", t, t.$, 25), wo("displayfeatures", eo), wo("adfeatures", eo), ko.D.apply(Co, e)
						}
					};
					var To = Co.N,
						No = O[a];
					No && No.r ? To() : ho(To), ho((function() {
						ko.D(["provide", "render", b])
					}))
				}(window)
			},
			3332: function() {
				"document" in self && ((!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) && function(e) {
					"use strict";
					if ("Element" in e) {
						var t = "classList",
							n = e.Element.prototype,
							r = Object,
							o = String.prototype.trim || function() {
								return this.replace(/^\s+|\s+$/g, "")
							},
							i = Array.prototype.indexOf || function(e) {
								for (var t = 0, n = this.length; t < n; t++)
									if (t in this && this[t] === e) return t;
								return -1
							},
							a = function(e, t) {
								this.name = e, this.code = DOMException[e], this.message = t
							},
							l = function(e, t) {
								if ("" === t) throw new a("SYNTAX_ERR", "The token must not be empty.");
								if (/\s/.test(t)) throw new a("INVALID_CHARACTER_ERR", "The token must not contain space characters.");
								return i.call(e, t)
							},
							s = function(e) {
								for (var t = o.call(e.getAttribute("class") || ""), n = t ? t.split(/\s+/) : [], r = 0, i = n.length; r < i; r++) this.push(n[r]);
								this._updateClassName = function() {
									e.setAttribute("class", this.toString())
								}
							},
							c = s.prototype = [],
							u = function() {
								return new s(this)
							};
						if (a.prototype = Error.prototype, c.item = function(e) {
								return this[e] || null
							}, c.contains = function(e) {
								return ~l(this, e + "")
							}, c.add = function() {
								var e, t = arguments,
									n = 0,
									r = t.length,
									o = !1;
								do {
									e = t[n] + "", ~l(this, e) || (this.push(e), o = !0)
								} while (++n < r);
								o && this._updateClassName()
							}, c.remove = function() {
								var e, t, n = arguments,
									r = 0,
									o = n.length,
									i = !1;
								do {
									for (e = n[r] + "", t = l(this, e); ~t;) this.splice(t, 1), i = !0, t = l(this, e)
								} while (++r < o);
								i && this._updateClassName()
							}, c.toggle = function(e, t) {
								var n = this.contains(e),
									r = n ? !0 !== t && "remove" : !1 !== t && "add";
								return r && this[r](e), !0 === t || !1 === t ? t : !n
							}, c.replace = function(e, t) {
								var n = l(e + "");
								~n && (this.splice(n, 1, t), this._updateClassName())
							}, c.toString = function() {
								return this.join(" ")
							}, r.defineProperty) {
							var f = {
								get: u,
								enumerable: !0,
								configurable: !0
							};
							try {
								r.defineProperty(n, t, f)
							} catch (e) {
								void 0 !== e.number && -2146823252 !== e.number || (f.enumerable = !1, r.defineProperty(n, t, f))
							}
						} else r.prototype.__defineGetter__ && n.__defineGetter__(t, u)
					}
				}(self), function() {
					"use strict";
					var e = document.createElement("_");
					if (e.classList.add("c1", "c2"), !e.classList.contains("c2")) {
						var t = function(e) {
							var t = DOMTokenList.prototype[e];
							DOMTokenList.prototype[e] = function(e) {
								var n, r = arguments.length;
								for (n = 0; n < r; n++) e = arguments[n], t.call(this, e)
							}
						};
						t("add"), t("remove")
					}
					if (e.classList.toggle("c3", !1), e.classList.contains("c3")) {
						var n = DOMTokenList.prototype.toggle;
						DOMTokenList.prototype.toggle = function(e, t) {
							return 1 in arguments && !this.contains(e) == !t ? t : n.call(this, e)
						}
					}
					"replace" in document.createElement("_").classList || (DOMTokenList.prototype.replace = function(e, t) {
						var n = this.toString().split(" "),
							r = n.indexOf(e + "");
						~r && (n = n.slice(r), this.remove.apply(this, n), this.add(t), this.add.apply(this, n.slice(1)))
					}), e = null
				}())
			},
			4184: function(e, t) {
				var n;
				! function() {
					"use strict";
					var r = {}.hasOwnProperty;

					function o() {
						for (var e = [], t = 0; t < arguments.length; t++) {
							var n = arguments[t];
							if (n) {
								var i = typeof n;
								if ("string" === i || "number" === i) e.push(n);
								else if (Array.isArray(n)) {
									if (n.length) {
										var a = o.apply(null, n);
										a && e.push(a)
									}
								} else if ("object" === i)
									if (n.toString === Object.prototype.toString)
										for (var l in n) r.call(n, l) && n[l] && e.push(l);
									else e.push(n.toString())
							}
						}
						return e.join(" ")
					}
					e.exports ? (o.default = o, e.exports = o) : void 0 === (n = function() {
						return o
					}.apply(t, [])) || (e.exports = n)
				}()
			},
			1998: function(e, t, n) {
				"use strict";
				n.d(t, {
					ZP: function() {
						return l
					}
				});
				var r = !("undefined" == typeof window || !window.document || !window.document.createElement),
					o = !1,
					i = !1;
				try {
					var a = {
						get passive() {
							return o = !0
						},
						get once() {
							return i = o = !0
						}
					};
					r && (window.addEventListener("test", a, a), window.removeEventListener("test", a, !0))
				} catch (e) {}
				var l = function(e, t, n, r) {
					if (r && "boolean" != typeof r && !i) {
						var a = r.once,
							l = r.capture,
							s = n;
						!i && a && (s = n.__once || function e(r) {
							this.removeEventListener(t, e, l), n.call(this, r)
						}, n.__once = s), e.addEventListener(t, s, o ? r : l)
					}
					e.addEventListener(t, n, r)
				}
			},
			424: function(e, t, n) {
				"use strict";

				function r(e, t) {
					return e.contains ? e.contains(t) : e.compareDocumentPosition ? e === t || !!(16 & e.compareDocumentPosition(t)) : void 0
				}
				n.d(t, {
					Z: function() {
						return r
					}
				})
			},
			3164: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return s
					}
				});
				var r = n(7216);
				var o = /([A-Z])/g,
					i = /^ms-/;

				function a(e) {
					return function(e) {
						return e.replace(o, "-$1").toLowerCase()
					}(e).replace(i, "-ms-")
				}
				var l = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
					s = function(e, t) {
						var n = "",
							o = "";
						if ("string" == typeof t) return e.style.getPropertyValue(a(t)) || function(e, t) {
							return function(e) {
								var t = (0, r.Z)(e);
								return t && t.defaultView || window
							}(e).getComputedStyle(e, t)
						}(e).getPropertyValue(a(t));
						Object.keys(t).forEach((function(r) {
							var i = t[r];
							i || 0 === i ? function(e) {
								return !(!e || !l.test(e))
							}(r) ? o += r + "(" + i + ") " : n += a(r) + ": " + i + ";" : e.style.removeProperty(a(r))
						})), o && (n += "transform: " + o + ";"), e.style.cssText += ";" + n
					}
			},
			1132: function(e, t, n) {
				"use strict";

				function r(e, t) {
					return e.classList ? !!t && e.classList.contains(t) : -1 !== (" " + (e.className.baseVal || e.className) + " ").indexOf(" " + t + " ")
				}
				n.d(t, {
					Z: function() {
						return r
					}
				})
			},
			3299: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return o
					}
				});
				var r = n(1998),
					o = function(e, t, n, o) {
						return (0, r.ZP)(e, t, n, o),
							function() {
								! function(e, t, n, r) {
									var o = r && "boolean" != typeof r ? r.capture : r;
									e.removeEventListener(t, n, o), n.__once && e.removeEventListener(t, n.__once, o)
								}(e, t, n, o)
							}
					}
			},
			7216: function(e, t, n) {
				"use strict";

				function r(e) {
					return e && e.ownerDocument || document
				}
				n.d(t, {
					Z: function() {
						return r
					}
				})
			},
			930: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return o
					}
				});
				var r = Function.prototype.bind.call(Function.prototype.call, [].slice);

				function o(e, t) {
					return r(e.querySelectorAll(t))
				}
			},
			1230: function(e, t, n) {
				"use strict";
				n.r(t), t.default = n.p + "acp-mksap19-logo-horiz-4c.svg"
			},
			1143: function(e) {
				"use strict";
				e.exports = function(e, t, n, r, o, i, a, l) {
					if (!e) {
						var s;
						if (void 0 === t) s = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
						else {
							var c = [n, r, o, i, a, l],
								u = 0;
							(s = new Error(t.replace(/%s/g, (function() {
								return c[u++]
							})))).name = "Invariant Violation"
						}
						throw s.framesToPop = 1, s
					}
				}
			},
			9755: function(e, t) {
				var n;
				! function(t, n) {
					"use strict";
					"object" == typeof e.exports ? e.exports = t.document ? n(t, !0) : function(e) {
						if (!e.document) throw new Error("jQuery requires a window with a document");
						return n(e)
					} : n(t)
				}("undefined" != typeof window ? window : this, (function(r, o) {
					"use strict";
					var i = [],
						a = Object.getPrototypeOf,
						l = i.slice,
						s = i.flat ? function(e) {
							return i.flat.call(e)
						} : function(e) {
							return i.concat.apply([], e)
						},
						c = i.push,
						u = i.indexOf,
						f = {},
						d = f.toString,
						h = f.hasOwnProperty,
						p = h.toString,
						v = p.call(Object),
						m = {},
						g = function(e) {
							return "function" == typeof e && "number" != typeof e.nodeType && "function" != typeof e.item
						},
						y = function(e) {
							return null != e && e === e.window
						},
						b = r.document,
						w = {
							type: !0,
							src: !0,
							nonce: !0,
							noModule: !0
						};

					function x(e, t, n) {
						var r, o, i = (n = n || b).createElement("script");
						if (i.text = e, t)
							for (r in w)(o = t[r] || t.getAttribute && t.getAttribute(r)) && i.setAttribute(r, o);
						n.head.appendChild(i).parentNode.removeChild(i)
					}

					function M(e) {
						return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? f[d.call(e)] || "object" : typeof e
					}
					var z = "3.6.0",
						E = function(e, t) {
							return new E.fn.init(e, t)
						};

					function k(e) {
						var t = !!e && "length" in e && e.length,
							n = M(e);
						return !g(e) && !y(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
					}
					E.fn = E.prototype = {
						jquery: z,
						constructor: E,
						length: 0,
						toArray: function() {
							return l.call(this)
						},
						get: function(e) {
							return null == e ? l.call(this) : e < 0 ? this[e + this.length] : this[e]
						},
						pushStack: function(e) {
							var t = E.merge(this.constructor(), e);
							return t.prevObject = this, t
						},
						each: function(e) {
							return E.each(this, e)
						},
						map: function(e) {
							return this.pushStack(E.map(this, (function(t, n) {
								return e.call(t, n, t)
							})))
						},
						slice: function() {
							return this.pushStack(l.apply(this, arguments))
						},
						first: function() {
							return this.eq(0)
						},
						last: function() {
							return this.eq(-1)
						},
						even: function() {
							return this.pushStack(E.grep(this, (function(e, t) {
								return (t + 1) % 2
							})))
						},
						odd: function() {
							return this.pushStack(E.grep(this, (function(e, t) {
								return t % 2
							})))
						},
						eq: function(e) {
							var t = this.length,
								n = +e + (e < 0 ? t : 0);
							return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
						},
						end: function() {
							return this.prevObject || this.constructor()
						},
						push: c,
						sort: i.sort,
						splice: i.splice
					}, E.extend = E.fn.extend = function() {
						var e, t, n, r, o, i, a = arguments[0] || {},
							l = 1,
							s = arguments.length,
							c = !1;
						for ("boolean" == typeof a && (c = a, a = arguments[l] || {}, l++), "object" == typeof a || g(a) || (a = {}), l === s && (a = this, l--); l < s; l++)
							if (null != (e = arguments[l]))
								for (t in e) r = e[t], "__proto__" !== t && a !== r && (c && r && (E.isPlainObject(r) || (o = Array.isArray(r))) ? (n = a[t], i = o && !Array.isArray(n) ? [] : o || E.isPlainObject(n) ? n : {}, o = !1, a[t] = E.extend(c, i, r)) : void 0 !== r && (a[t] = r));
						return a
					}, E.extend({
						expando: "jQuery" + (z + Math.random()).replace(/\D/g, ""),
						isReady: !0,
						error: function(e) {
							throw new Error(e)
						},
						noop: function() {},
						isPlainObject: function(e) {
							var t, n;
							return !(!e || "[object Object]" !== d.call(e) || (t = a(e)) && ("function" != typeof(n = h.call(t, "constructor") && t.constructor) || p.call(n) !== v))
						},
						isEmptyObject: function(e) {
							var t;
							for (t in e) return !1;
							return !0
						},
						globalEval: function(e, t, n) {
							x(e, {
								nonce: t && t.nonce
							}, n)
						},
						each: function(e, t) {
							var n, r = 0;
							if (k(e))
								for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
							else
								for (r in e)
									if (!1 === t.call(e[r], r, e[r])) break;
							return e
						},
						makeArray: function(e, t) {
							var n = t || [];
							return null != e && (k(Object(e)) ? E.merge(n, "string" == typeof e ? [e] : e) : c.call(n, e)), n
						},
						inArray: function(e, t, n) {
							return null == t ? -1 : u.call(t, e, n)
						},
						merge: function(e, t) {
							for (var n = +t.length, r = 0, o = e.length; r < n; r++) e[o++] = t[r];
							return e.length = o, e
						},
						grep: function(e, t, n) {
							for (var r = [], o = 0, i = e.length, a = !n; o < i; o++) !t(e[o], o) !== a && r.push(e[o]);
							return r
						},
						map: function(e, t, n) {
							var r, o, i = 0,
								a = [];
							if (k(e))
								for (r = e.length; i < r; i++) null != (o = t(e[i], i, n)) && a.push(o);
							else
								for (i in e) null != (o = t(e[i], i, n)) && a.push(o);
							return s(a)
						},
						guid: 1,
						support: m
					}), "function" == typeof Symbol && (E.fn[Symbol.iterator] = i[Symbol.iterator]), E.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function(e, t) {
						f["[object " + t + "]"] = t.toLowerCase()
					}));
					var C = function(e) {
						var t, n, r, o, i, a, l, s, c, u, f, d, h, p, v, m, g, y, b, w = "sizzle" + 1 * new Date,
							x = e.document,
							M = 0,
							z = 0,
							E = se(),
							k = se(),
							C = se(),
							S = se(),
							T = function(e, t) {
								return e === t && (f = !0), 0
							},
							N = {}.hasOwnProperty,
							P = [],
							A = P.pop,
							_ = P.push,
							O = P.push,
							L = P.slice,
							D = function(e, t) {
								for (var n = 0, r = e.length; n < r; n++)
									if (e[n] === t) return n;
								return -1
							},
							B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
							I = "[\\x20\\t\\r\\n\\f]",
							H = "(?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
							R = "\\[[\\x20\\t\\r\\n\\f]*(" + H + ")(?:" + I + "*([*^$|!~]?=)" + I + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + H + "))|)" + I + "*\\]",
							q = ":(" + H + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + R + ")*)|.*)\\)|)",
							j = new RegExp(I + "+", "g"),
							Z = new RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"),
							F = new RegExp("^[\\x20\\t\\r\\n\\f]*,[\\x20\\t\\r\\n\\f]*"),
							V = new RegExp("^[\\x20\\t\\r\\n\\f]*([>+~]|[\\x20\\t\\r\\n\\f])[\\x20\\t\\r\\n\\f]*"),
							Q = new RegExp(I + "|>"),
							U = new RegExp(q),
							K = new RegExp("^" + H + "$"),
							W = {
								ID: new RegExp("^#(" + H + ")"),
								CLASS: new RegExp("^\\.(" + H + ")"),
								TAG: new RegExp("^(" + H + "|[*])"),
								ATTR: new RegExp("^" + R),
								PSEUDO: new RegExp("^" + q),
								CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"),
								bool: new RegExp("^(?:" + B + ")$", "i"),
								needsContext: new RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
							},
							$ = /HTML$/i,
							Y = /^(?:input|select|textarea|button)$/i,
							G = /^h\d$/i,
							X = /^[^{]+\{\s*\[native \w/,
							J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
							ee = /[+~]/,
							te = new RegExp("\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\([^\\r\\n\\f])", "g"),
							ne = function(e, t) {
								var n = "0x" + e.slice(1) - 65536;
								return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
							},
							re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
							oe = function(e, t) {
								return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
							},
							ie = function() {
								d()
							},
							ae = we((function(e) {
								return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
							}), {
								dir: "parentNode",
								next: "legend"
							});
						try {
							O.apply(P = L.call(x.childNodes), x.childNodes), P[x.childNodes.length].nodeType
						} catch (e) {
							O = {
								apply: P.length ? function(e, t) {
									_.apply(e, L.call(t))
								} : function(e, t) {
									for (var n = e.length, r = 0; e[n++] = t[r++];);
									e.length = n - 1
								}
							}
						}

						function le(e, t, r, o) {
							var i, l, c, u, f, p, g, y = t && t.ownerDocument,
								x = t ? t.nodeType : 9;
							if (r = r || [], "string" != typeof e || !e || 1 !== x && 9 !== x && 11 !== x) return r;
							if (!o && (d(t), t = t || h, v)) {
								if (11 !== x && (f = J.exec(e)))
									if (i = f[1]) {
										if (9 === x) {
											if (!(c = t.getElementById(i))) return r;
											if (c.id === i) return r.push(c), r
										} else if (y && (c = y.getElementById(i)) && b(t, c) && c.id === i) return r.push(c), r
									} else {
										if (f[2]) return O.apply(r, t.getElementsByTagName(e)), r;
										if ((i = f[3]) && n.getElementsByClassName && t.getElementsByClassName) return O.apply(r, t.getElementsByClassName(i)), r
									} if (n.qsa && !S[e + " "] && (!m || !m.test(e)) && (1 !== x || "object" !== t.nodeName.toLowerCase())) {
									if (g = e, y = t, 1 === x && (Q.test(e) || V.test(e))) {
										for ((y = ee.test(e) && ge(t.parentNode) || t) === t && n.scope || ((u = t.getAttribute("id")) ? u = u.replace(re, oe) : t.setAttribute("id", u = w)), l = (p = a(e)).length; l--;) p[l] = (u ? "#" + u : ":scope") + " " + be(p[l]);
										g = p.join(",")
									}
									try {
										return O.apply(r, y.querySelectorAll(g)), r
									} catch (t) {
										S(e, !0)
									} finally {
										u === w && t.removeAttribute("id")
									}
								}
							}
							return s(e.replace(Z, "$1"), t, r, o)
						}

						function se() {
							var e = [];
							return function t(n, o) {
								return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = o
							}
						}

						function ce(e) {
							return e[w] = !0, e
						}

						function ue(e) {
							var t = h.createElement("fieldset");
							try {
								return !!e(t)
							} catch (e) {
								return !1
							} finally {
								t.parentNode && t.parentNode.removeChild(t), t = null
							}
						}

						function fe(e, t) {
							for (var n = e.split("|"), o = n.length; o--;) r.attrHandle[n[o]] = t
						}

						function de(e, t) {
							var n = t && e,
								r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
							if (r) return r;
							if (n)
								for (; n = n.nextSibling;)
									if (n === t) return -1;
							return e ? 1 : -1
						}

						function he(e) {
							return function(t) {
								return "input" === t.nodeName.toLowerCase() && t.type === e
							}
						}

						function pe(e) {
							return function(t) {
								var n = t.nodeName.toLowerCase();
								return ("input" === n || "button" === n) && t.type === e
							}
						}

						function ve(e) {
							return function(t) {
								return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ae(t) === e : t.disabled === e : "label" in t && t.disabled === e
							}
						}

						function me(e) {
							return ce((function(t) {
								return t = +t, ce((function(n, r) {
									for (var o, i = e([], n.length, t), a = i.length; a--;) n[o = i[a]] && (n[o] = !(r[o] = n[o]))
								}))
							}))
						}

						function ge(e) {
							return e && void 0 !== e.getElementsByTagName && e
						}
						for (t in n = le.support = {}, i = le.isXML = function(e) {
								var t = e && e.namespaceURI,
									n = e && (e.ownerDocument || e).documentElement;
								return !$.test(t || n && n.nodeName || "HTML")
							}, d = le.setDocument = function(e) {
								var t, o, a = e ? e.ownerDocument || e : x;
								return a != h && 9 === a.nodeType && a.documentElement ? (p = (h = a).documentElement, v = !i(h), x != h && (o = h.defaultView) && o.top !== o && (o.addEventListener ? o.addEventListener("unload", ie, !1) : o.attachEvent && o.attachEvent("onunload", ie)), n.scope = ue((function(e) {
									return p.appendChild(e).appendChild(h.createElement("div")), void 0 !== e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
								})), n.attributes = ue((function(e) {
									return e.className = "i", !e.getAttribute("className")
								})), n.getElementsByTagName = ue((function(e) {
									return e.appendChild(h.createComment("")), !e.getElementsByTagName("*").length
								})), n.getElementsByClassName = X.test(h.getElementsByClassName), n.getById = ue((function(e) {
									return p.appendChild(e).id = w, !h.getElementsByName || !h.getElementsByName(w).length
								})), n.getById ? (r.filter.ID = function(e) {
									var t = e.replace(te, ne);
									return function(e) {
										return e.getAttribute("id") === t
									}
								}, r.find.ID = function(e, t) {
									if (void 0 !== t.getElementById && v) {
										var n = t.getElementById(e);
										return n ? [n] : []
									}
								}) : (r.filter.ID = function(e) {
									var t = e.replace(te, ne);
									return function(e) {
										var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
										return n && n.value === t
									}
								}, r.find.ID = function(e, t) {
									if (void 0 !== t.getElementById && v) {
										var n, r, o, i = t.getElementById(e);
										if (i) {
											if ((n = i.getAttributeNode("id")) && n.value === e) return [i];
											for (o = t.getElementsByName(e), r = 0; i = o[r++];)
												if ((n = i.getAttributeNode("id")) && n.value === e) return [i]
										}
										return []
									}
								}), r.find.TAG = n.getElementsByTagName ? function(e, t) {
									return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
								} : function(e, t) {
									var n, r = [],
										o = 0,
										i = t.getElementsByTagName(e);
									if ("*" === e) {
										for (; n = i[o++];) 1 === n.nodeType && r.push(n);
										return r
									}
									return i
								}, r.find.CLASS = n.getElementsByClassName && function(e, t) {
									if (void 0 !== t.getElementsByClassName && v) return t.getElementsByClassName(e)
								}, g = [], m = [], (n.qsa = X.test(h.querySelectorAll)) && (ue((function(e) {
									var t;
									p.appendChild(e).innerHTML = "<a id='" + w + "'></a><select id='" + w + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|" + B + ")"), e.querySelectorAll("[id~=" + w + "-]").length || m.push("~="), (t = h.createElement("input")).setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || m.push("\\[[\\x20\\t\\r\\n\\f]*name[\\x20\\t\\r\\n\\f]*=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + w + "+*").length || m.push(".#.+[+~]"), e.querySelectorAll("\\\f"), m.push("[\\r\\n\\f]")
								})), ue((function(e) {
									e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
									var t = h.createElement("input");
									t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"), p.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
								}))), (n.matchesSelector = X.test(y = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.oMatchesSelector || p.msMatchesSelector)) && ue((function(e) {
									n.disconnectedMatch = y.call(e, "*"), y.call(e, "[s!='']:x"), g.push("!=", q)
								})), m = m.length && new RegExp(m.join("|")), g = g.length && new RegExp(g.join("|")), t = X.test(p.compareDocumentPosition), b = t || X.test(p.contains) ? function(e, t) {
									var n = 9 === e.nodeType ? e.documentElement : e,
										r = t && t.parentNode;
									return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
								} : function(e, t) {
									if (t)
										for (; t = t.parentNode;)
											if (t === e) return !0;
									return !1
								}, T = t ? function(e, t) {
									if (e === t) return f = !0, 0;
									var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
									return r || (1 & (r = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e == h || e.ownerDocument == x && b(x, e) ? -1 : t == h || t.ownerDocument == x && b(x, t) ? 1 : u ? D(u, e) - D(u, t) : 0 : 4 & r ? -1 : 1)
								} : function(e, t) {
									if (e === t) return f = !0, 0;
									var n, r = 0,
										o = e.parentNode,
										i = t.parentNode,
										a = [e],
										l = [t];
									if (!o || !i) return e == h ? -1 : t == h ? 1 : o ? -1 : i ? 1 : u ? D(u, e) - D(u, t) : 0;
									if (o === i) return de(e, t);
									for (n = e; n = n.parentNode;) a.unshift(n);
									for (n = t; n = n.parentNode;) l.unshift(n);
									for (; a[r] === l[r];) r++;
									return r ? de(a[r], l[r]) : a[r] == x ? -1 : l[r] == x ? 1 : 0
								}, h) : h
							}, le.matches = function(e, t) {
								return le(e, null, null, t)
							}, le.matchesSelector = function(e, t) {
								if (d(e), n.matchesSelector && v && !S[t + " "] && (!g || !g.test(t)) && (!m || !m.test(t))) try {
									var r = y.call(e, t);
									if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
								} catch (e) {
									S(t, !0)
								}
								return le(t, h, null, [e]).length > 0
							}, le.contains = function(e, t) {
								return (e.ownerDocument || e) != h && d(e), b(e, t)
							}, le.attr = function(e, t) {
								(e.ownerDocument || e) != h && d(e);
								var o = r.attrHandle[t.toLowerCase()],
									i = o && N.call(r.attrHandle, t.toLowerCase()) ? o(e, t, !v) : void 0;
								return void 0 !== i ? i : n.attributes || !v ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
							}, le.escape = function(e) {
								return (e + "").replace(re, oe)
							}, le.error = function(e) {
								throw new Error("Syntax error, unrecognized expression: " + e)
							}, le.uniqueSort = function(e) {
								var t, r = [],
									o = 0,
									i = 0;
								if (f = !n.detectDuplicates, u = !n.sortStable && e.slice(0), e.sort(T), f) {
									for (; t = e[i++];) t === e[i] && (o = r.push(i));
									for (; o--;) e.splice(r[o], 1)
								}
								return u = null, e
							}, o = le.getText = function(e) {
								var t, n = "",
									r = 0,
									i = e.nodeType;
								if (i) {
									if (1 === i || 9 === i || 11 === i) {
										if ("string" == typeof e.textContent) return e.textContent;
										for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
									} else if (3 === i || 4 === i) return e.nodeValue
								} else
									for (; t = e[r++];) n += o(t);
								return n
							}, r = le.selectors = {
								cacheLength: 50,
								createPseudo: ce,
								match: W,
								attrHandle: {},
								find: {},
								relative: {
									">": {
										dir: "parentNode",
										first: !0
									},
									" ": {
										dir: "parentNode"
									},
									"+": {
										dir: "previousSibling",
										first: !0
									},
									"~": {
										dir: "previousSibling"
									}
								},
								preFilter: {
									ATTR: function(e) {
										return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
									},
									CHILD: function(e) {
										return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || le.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && le.error(e[0]), e
									},
									PSEUDO: function(e) {
										var t, n = !e[6] && e[2];
										return W.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && U.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
									}
								},
								filter: {
									TAG: function(e) {
										var t = e.replace(te, ne).toLowerCase();
										return "*" === e ? function() {
											return !0
										} : function(e) {
											return e.nodeName && e.nodeName.toLowerCase() === t
										}
									},
									CLASS: function(e) {
										var t = E[e + " "];
										return t || (t = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + e + "(" + I + "|$)")) && E(e, (function(e) {
											return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
										}))
									},
									ATTR: function(e, t, n) {
										return function(r) {
											var o = le.attr(r, e);
											return null == o ? "!=" === t : !t || (o += "", "=" === t ? o === n : "!=" === t ? o !== n : "^=" === t ? n && 0 === o.indexOf(n) : "*=" === t ? n && o.indexOf(n) > -1 : "$=" === t ? n && o.slice(-n.length) === n : "~=" === t ? (" " + o.replace(j, " ") + " ").indexOf(n) > -1 : "|=" === t && (o === n || o.slice(0, n.length + 1) === n + "-"))
										}
									},
									CHILD: function(e, t, n, r, o) {
										var i = "nth" !== e.slice(0, 3),
											a = "last" !== e.slice(-4),
											l = "of-type" === t;
										return 1 === r && 0 === o ? function(e) {
											return !!e.parentNode
										} : function(t, n, s) {
											var c, u, f, d, h, p, v = i !== a ? "nextSibling" : "previousSibling",
												m = t.parentNode,
												g = l && t.nodeName.toLowerCase(),
												y = !s && !l,
												b = !1;
											if (m) {
												if (i) {
													for (; v;) {
														for (d = t; d = d[v];)
															if (l ? d.nodeName.toLowerCase() === g : 1 === d.nodeType) return !1;
														p = v = "only" === e && !p && "nextSibling"
													}
													return !0
												}
												if (p = [a ? m.firstChild : m.lastChild], a && y) {
													for (b = (h = (c = (u = (f = (d = m)[w] || (d[w] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] || [])[0] === M && c[1]) && c[2], d = h && m.childNodes[h]; d = ++h && d && d[v] || (b = h = 0) || p.pop();)
														if (1 === d.nodeType && ++b && d === t) {
															u[e] = [M, h, b];
															break
														}
												} else if (y && (b = h = (c = (u = (f = (d = t)[w] || (d[w] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] || [])[0] === M && c[1]), !1 === b)
													for (;
														(d = ++h && d && d[v] || (b = h = 0) || p.pop()) && ((l ? d.nodeName.toLowerCase() !== g : 1 !== d.nodeType) || !++b || (y && ((u = (f = d[w] || (d[w] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] = [M, b]), d !== t)););
												return (b -= o) === r || b % r == 0 && b / r >= 0
											}
										}
									},
									PSEUDO: function(e, t) {
										var n, o = r.pseudos[e] || r.setFilters[e.toLowerCase()] || le.error("unsupported pseudo: " + e);
										return o[w] ? o(t) : o.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? ce((function(e, n) {
											for (var r, i = o(e, t), a = i.length; a--;) e[r = D(e, i[a])] = !(n[r] = i[a])
										})) : function(e) {
											return o(e, 0, n)
										}) : o
									}
								},
								pseudos: {
									not: ce((function(e) {
										var t = [],
											n = [],
											r = l(e.replace(Z, "$1"));
										return r[w] ? ce((function(e, t, n, o) {
											for (var i, a = r(e, null, o, []), l = e.length; l--;)(i = a[l]) && (e[l] = !(t[l] = i))
										})) : function(e, o, i) {
											return t[0] = e, r(t, null, i, n), t[0] = null, !n.pop()
										}
									})),
									has: ce((function(e) {
										return function(t) {
											return le(e, t).length > 0
										}
									})),
									contains: ce((function(e) {
										return e = e.replace(te, ne),
											function(t) {
												return (t.textContent || o(t)).indexOf(e) > -1
											}
									})),
									lang: ce((function(e) {
										return K.test(e || "") || le.error("unsupported lang: " + e), e = e.replace(te, ne).toLowerCase(),
											function(t) {
												var n;
												do {
													if (n = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
												} while ((t = t.parentNode) && 1 === t.nodeType);
												return !1
											}
									})),
									target: function(t) {
										var n = e.location && e.location.hash;
										return n && n.slice(1) === t.id
									},
									root: function(e) {
										return e === p
									},
									focus: function(e) {
										return e === h.activeElement && (!h.hasFocus || h.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
									},
									enabled: ve(!1),
									disabled: ve(!0),
									checked: function(e) {
										var t = e.nodeName.toLowerCase();
										return "input" === t && !!e.checked || "option" === t && !!e.selected
									},
									selected: function(e) {
										return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
									},
									empty: function(e) {
										for (e = e.firstChild; e; e = e.nextSibling)
											if (e.nodeType < 6) return !1;
										return !0
									},
									parent: function(e) {
										return !r.pseudos.empty(e)
									},
									header: function(e) {
										return G.test(e.nodeName)
									},
									input: function(e) {
										return Y.test(e.nodeName)
									},
									button: function(e) {
										var t = e.nodeName.toLowerCase();
										return "input" === t && "button" === e.type || "button" === t
									},
									text: function(e) {
										var t;
										return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
									},
									first: me((function() {
										return [0]
									})),
									last: me((function(e, t) {
										return [t - 1]
									})),
									eq: me((function(e, t, n) {
										return [n < 0 ? n + t : n]
									})),
									even: me((function(e, t) {
										for (var n = 0; n < t; n += 2) e.push(n);
										return e
									})),
									odd: me((function(e, t) {
										for (var n = 1; n < t; n += 2) e.push(n);
										return e
									})),
									lt: me((function(e, t, n) {
										for (var r = n < 0 ? n + t : n > t ? t : n; --r >= 0;) e.push(r);
										return e
									})),
									gt: me((function(e, t, n) {
										for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
										return e
									}))
								}
							}, r.pseudos.nth = r.pseudos.eq, {
								radio: !0,
								checkbox: !0,
								file: !0,
								password: !0,
								image: !0
							}) r.pseudos[t] = he(t);
						for (t in {
								submit: !0,
								reset: !0
							}) r.pseudos[t] = pe(t);

						function ye() {}

						function be(e) {
							for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
							return r
						}

						function we(e, t, n) {
							var r = t.dir,
								o = t.next,
								i = o || r,
								a = n && "parentNode" === i,
								l = z++;
							return t.first ? function(t, n, o) {
								for (; t = t[r];)
									if (1 === t.nodeType || a) return e(t, n, o);
								return !1
							} : function(t, n, s) {
								var c, u, f, d = [M, l];
								if (s) {
									for (; t = t[r];)
										if ((1 === t.nodeType || a) && e(t, n, s)) return !0
								} else
									for (; t = t[r];)
										if (1 === t.nodeType || a)
											if (u = (f = t[w] || (t[w] = {}))[t.uniqueID] || (f[t.uniqueID] = {}), o && o === t.nodeName.toLowerCase()) t = t[r] || t;
											else {
												if ((c = u[i]) && c[0] === M && c[1] === l) return d[2] = c[2];
												if (u[i] = d, d[2] = e(t, n, s)) return !0
											} return !1
							}
						}

						function xe(e) {
							return e.length > 1 ? function(t, n, r) {
								for (var o = e.length; o--;)
									if (!e[o](t, n, r)) return !1;
								return !0
							} : e[0]
						}

						function Me(e, t, n, r, o) {
							for (var i, a = [], l = 0, s = e.length, c = null != t; l < s; l++)(i = e[l]) && (n && !n(i, r, o) || (a.push(i), c && t.push(l)));
							return a
						}

						function ze(e, t, n, r, o, i) {
							return r && !r[w] && (r = ze(r)), o && !o[w] && (o = ze(o, i)), ce((function(i, a, l, s) {
								var c, u, f, d = [],
									h = [],
									p = a.length,
									v = i || function(e, t, n) {
										for (var r = 0, o = t.length; r < o; r++) le(e, t[r], n);
										return n
									}(t || "*", l.nodeType ? [l] : l, []),
									m = !e || !i && t ? v : Me(v, d, e, l, s),
									g = n ? o || (i ? e : p || r) ? [] : a : m;
								if (n && n(m, g, l, s), r)
									for (c = Me(g, h), r(c, [], l, s), u = c.length; u--;)(f = c[u]) && (g[h[u]] = !(m[h[u]] = f));
								if (i) {
									if (o || e) {
										if (o) {
											for (c = [], u = g.length; u--;)(f = g[u]) && c.push(m[u] = f);
											o(null, g = [], c, s)
										}
										for (u = g.length; u--;)(f = g[u]) && (c = o ? D(i, f) : d[u]) > -1 && (i[c] = !(a[c] = f))
									}
								} else g = Me(g === a ? g.splice(p, g.length) : g), o ? o(null, a, g, s) : O.apply(a, g)
							}))
						}

						function Ee(e) {
							for (var t, n, o, i = e.length, a = r.relative[e[0].type], l = a || r.relative[" "], s = a ? 1 : 0, u = we((function(e) {
									return e === t
								}), l, !0), f = we((function(e) {
									return D(t, e) > -1
								}), l, !0), d = [function(e, n, r) {
									var o = !a && (r || n !== c) || ((t = n).nodeType ? u(e, n, r) : f(e, n, r));
									return t = null, o
								}]; s < i; s++)
								if (n = r.relative[e[s].type]) d = [we(xe(d), n)];
								else {
									if ((n = r.filter[e[s].type].apply(null, e[s].matches))[w]) {
										for (o = ++s; o < i && !r.relative[e[o].type]; o++);
										return ze(s > 1 && xe(d), s > 1 && be(e.slice(0, s - 1).concat({
											value: " " === e[s - 2].type ? "*" : ""
										})).replace(Z, "$1"), n, s < o && Ee(e.slice(s, o)), o < i && Ee(e = e.slice(o)), o < i && be(e))
									}
									d.push(n)
								} return xe(d)
						}
						return ye.prototype = r.filters = r.pseudos, r.setFilters = new ye, a = le.tokenize = function(e, t) {
							var n, o, i, a, l, s, c, u = k[e + " "];
							if (u) return t ? 0 : u.slice(0);
							for (l = e, s = [], c = r.preFilter; l;) {
								for (a in n && !(o = F.exec(l)) || (o && (l = l.slice(o[0].length) || l), s.push(i = [])), n = !1, (o = V.exec(l)) && (n = o.shift(), i.push({
										value: n,
										type: o[0].replace(Z, " ")
									}), l = l.slice(n.length)), r.filter) !(o = W[a].exec(l)) || c[a] && !(o = c[a](o)) || (n = o.shift(), i.push({
									value: n,
									type: a,
									matches: o
								}), l = l.slice(n.length));
								if (!n) break
							}
							return t ? l.length : l ? le.error(e) : k(e, s).slice(0)
						}, l = le.compile = function(e, t) {
							var n, o = [],
								i = [],
								l = C[e + " "];
							if (!l) {
								for (t || (t = a(e)), n = t.length; n--;)(l = Ee(t[n]))[w] ? o.push(l) : i.push(l);
								l = C(e, function(e, t) {
									var n = t.length > 0,
										o = e.length > 0,
										i = function(i, a, l, s, u) {
											var f, p, m, g = 0,
												y = "0",
												b = i && [],
												w = [],
												x = c,
												z = i || o && r.find.TAG("*", u),
												E = M += null == x ? 1 : Math.random() || .1,
												k = z.length;
											for (u && (c = a == h || a || u); y !== k && null != (f = z[y]); y++) {
												if (o && f) {
													for (p = 0, a || f.ownerDocument == h || (d(f), l = !v); m = e[p++];)
														if (m(f, a || h, l)) {
															s.push(f);
															break
														} u && (M = E)
												}
												n && ((f = !m && f) && g--, i && b.push(f))
											}
											if (g += y, n && y !== g) {
												for (p = 0; m = t[p++];) m(b, w, a, l);
												if (i) {
													if (g > 0)
														for (; y--;) b[y] || w[y] || (w[y] = A.call(s));
													w = Me(w)
												}
												O.apply(s, w), u && !i && w.length > 0 && g + t.length > 1 && le.uniqueSort(s)
											}
											return u && (M = E, c = x), b
										};
									return n ? ce(i) : i
								}(i, o)), l.selector = e
							}
							return l
						}, s = le.select = function(e, t, n, o) {
							var i, s, c, u, f, d = "function" == typeof e && e,
								h = !o && a(e = d.selector || e);
							if (n = n || [], 1 === h.length) {
								if ((s = h[0] = h[0].slice(0)).length > 2 && "ID" === (c = s[0]).type && 9 === t.nodeType && v && r.relative[s[1].type]) {
									if (!(t = (r.find.ID(c.matches[0].replace(te, ne), t) || [])[0])) return n;
									d && (t = t.parentNode), e = e.slice(s.shift().value.length)
								}
								for (i = W.needsContext.test(e) ? 0 : s.length; i-- && (c = s[i], !r.relative[u = c.type]);)
									if ((f = r.find[u]) && (o = f(c.matches[0].replace(te, ne), ee.test(s[0].type) && ge(t.parentNode) || t))) {
										if (s.splice(i, 1), !(e = o.length && be(s))) return O.apply(n, o), n;
										break
									}
							}
							return (d || l(e, h))(o, t, !v, n, !t || ee.test(e) && ge(t.parentNode) || t), n
						}, n.sortStable = w.split("").sort(T).join("") === w, n.detectDuplicates = !!f, d(), n.sortDetached = ue((function(e) {
							return 1 & e.compareDocumentPosition(h.createElement("fieldset"))
						})), ue((function(e) {
							return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
						})) || fe("type|href|height|width", (function(e, t, n) {
							if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
						})), n.attributes && ue((function(e) {
							return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
						})) || fe("value", (function(e, t, n) {
							if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
						})), ue((function(e) {
							return null == e.getAttribute("disabled")
						})) || fe(B, (function(e, t, n) {
							var r;
							if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
						})), le
					}(r);
					E.find = C, E.expr = C.selectors, E.expr[":"] = E.expr.pseudos, E.uniqueSort = E.unique = C.uniqueSort, E.text = C.getText, E.isXMLDoc = C.isXML, E.contains = C.contains, E.escapeSelector = C.escape;
					var S = function(e, t, n) {
							for (var r = [], o = void 0 !== n;
								(e = e[t]) && 9 !== e.nodeType;)
								if (1 === e.nodeType) {
									if (o && E(e).is(n)) break;
									r.push(e)
								} return r
						},
						T = function(e, t) {
							for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
							return n
						},
						N = E.expr.match.needsContext;

					function P(e, t) {
						return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
					}
					var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

					function _(e, t, n) {
						return g(t) ? E.grep(e, (function(e, r) {
							return !!t.call(e, r, e) !== n
						})) : t.nodeType ? E.grep(e, (function(e) {
							return e === t !== n
						})) : "string" != typeof t ? E.grep(e, (function(e) {
							return u.call(t, e) > -1 !== n
						})) : E.filter(t, e, n)
					}
					E.filter = function(e, t, n) {
						var r = t[0];
						return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? E.find.matchesSelector(r, e) ? [r] : [] : E.find.matches(e, E.grep(t, (function(e) {
							return 1 === e.nodeType
						})))
					}, E.fn.extend({
						find: function(e) {
							var t, n, r = this.length,
								o = this;
							if ("string" != typeof e) return this.pushStack(E(e).filter((function() {
								for (t = 0; t < r; t++)
									if (E.contains(o[t], this)) return !0
							})));
							for (n = this.pushStack([]), t = 0; t < r; t++) E.find(e, o[t], n);
							return r > 1 ? E.uniqueSort(n) : n
						},
						filter: function(e) {
							return this.pushStack(_(this, e || [], !1))
						},
						not: function(e) {
							return this.pushStack(_(this, e || [], !0))
						},
						is: function(e) {
							return !!_(this, "string" == typeof e && N.test(e) ? E(e) : e || [], !1).length
						}
					});
					var O, L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
					(E.fn.init = function(e, t, n) {
						var r, o;
						if (!e) return this;
						if (n = n || O, "string" == typeof e) {
							if (!(r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : L.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
							if (r[1]) {
								if (t = t instanceof E ? t[0] : t, E.merge(this, E.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : b, !0)), A.test(r[1]) && E.isPlainObject(t))
									for (r in t) g(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
								return this
							}
							return (o = b.getElementById(r[2])) && (this[0] = o, this.length = 1), this
						}
						return e.nodeType ? (this[0] = e, this.length = 1, this) : g(e) ? void 0 !== n.ready ? n.ready(e) : e(E) : E.makeArray(e, this)
					}).prototype = E.fn, O = E(b);
					var D = /^(?:parents|prev(?:Until|All))/,
						B = {
							children: !0,
							contents: !0,
							next: !0,
							prev: !0
						};

					function I(e, t) {
						for (;
							(e = e[t]) && 1 !== e.nodeType;);
						return e
					}
					E.fn.extend({
						has: function(e) {
							var t = E(e, this),
								n = t.length;
							return this.filter((function() {
								for (var e = 0; e < n; e++)
									if (E.contains(this, t[e])) return !0
							}))
						},
						closest: function(e, t) {
							var n, r = 0,
								o = this.length,
								i = [],
								a = "string" != typeof e && E(e);
							if (!N.test(e))
								for (; r < o; r++)
									for (n = this[r]; n && n !== t; n = n.parentNode)
										if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && E.find.matchesSelector(n, e))) {
											i.push(n);
											break
										} return this.pushStack(i.length > 1 ? E.uniqueSort(i) : i)
						},
						index: function(e) {
							return e ? "string" == typeof e ? u.call(E(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
						},
						add: function(e, t) {
							return this.pushStack(E.uniqueSort(E.merge(this.get(), E(e, t))))
						},
						addBack: function(e) {
							return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
						}
					}), E.each({
						parent: function(e) {
							var t = e.parentNode;
							return t && 11 !== t.nodeType ? t : null
						},
						parents: function(e) {
							return S(e, "parentNode")
						},
						parentsUntil: function(e, t, n) {
							return S(e, "parentNode", n)
						},
						next: function(e) {
							return I(e, "nextSibling")
						},
						prev: function(e) {
							return I(e, "previousSibling")
						},
						nextAll: function(e) {
							return S(e, "nextSibling")
						},
						prevAll: function(e) {
							return S(e, "previousSibling")
						},
						nextUntil: function(e, t, n) {
							return S(e, "nextSibling", n)
						},
						prevUntil: function(e, t, n) {
							return S(e, "previousSibling", n)
						},
						siblings: function(e) {
							return T((e.parentNode || {}).firstChild, e)
						},
						children: function(e) {
							return T(e.firstChild)
						},
						contents: function(e) {
							return null != e.contentDocument && a(e.contentDocument) ? e.contentDocument : (P(e, "template") && (e = e.content || e), E.merge([], e.childNodes))
						}
					}, (function(e, t) {
						E.fn[e] = function(n, r) {
							var o = E.map(this, t, n);
							return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (o = E.filter(r, o)), this.length > 1 && (B[e] || E.uniqueSort(o), D.test(e) && o.reverse()), this.pushStack(o)
						}
					}));
					var H = /[^\x20\t\r\n\f]+/g;

					function R(e) {
						return e
					}

					function q(e) {
						throw e
					}

					function j(e, t, n, r) {
						var o;
						try {
							e && g(o = e.promise) ? o.call(e).done(t).fail(n) : e && g(o = e.then) ? o.call(e, t, n) : t.apply(void 0, [e].slice(r))
						} catch (e) {
							n.apply(void 0, [e])
						}
					}
					E.Callbacks = function(e) {
						e = "string" == typeof e ? function(e) {
							var t = {};
							return E.each(e.match(H) || [], (function(e, n) {
								t[n] = !0
							})), t
						}(e) : E.extend({}, e);
						var t, n, r, o, i = [],
							a = [],
							l = -1,
							s = function() {
								for (o = o || e.once, r = t = !0; a.length; l = -1)
									for (n = a.shift(); ++l < i.length;) !1 === i[l].apply(n[0], n[1]) && e.stopOnFalse && (l = i.length, n = !1);
								e.memory || (n = !1), t = !1, o && (i = n ? [] : "")
							},
							c = {
								add: function() {
									return i && (n && !t && (l = i.length - 1, a.push(n)), function t(n) {
										E.each(n, (function(n, r) {
											g(r) ? e.unique && c.has(r) || i.push(r) : r && r.length && "string" !== M(r) && t(r)
										}))
									}(arguments), n && !t && s()), this
								},
								remove: function() {
									return E.each(arguments, (function(e, t) {
										for (var n;
											(n = E.inArray(t, i, n)) > -1;) i.splice(n, 1), n <= l && l--
									})), this
								},
								has: function(e) {
									return e ? E.inArray(e, i) > -1 : i.length > 0
								},
								empty: function() {
									return i && (i = []), this
								},
								disable: function() {
									return o = a = [], i = n = "", this
								},
								disabled: function() {
									return !i
								},
								lock: function() {
									return o = a = [], n || t || (i = n = ""), this
								},
								locked: function() {
									return !!o
								},
								fireWith: function(e, n) {
									return o || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || s()), this
								},
								fire: function() {
									return c.fireWith(this, arguments), this
								},
								fired: function() {
									return !!r
								}
							};
						return c
					}, E.extend({
						Deferred: function(e) {
							var t = [
									["notify", "progress", E.Callbacks("memory"), E.Callbacks("memory"), 2],
									["resolve", "done", E.Callbacks("once memory"), E.Callbacks("once memory"), 0, "resolved"],
									["reject", "fail", E.Callbacks("once memory"), E.Callbacks("once memory"), 1, "rejected"]
								],
								n = "pending",
								o = {
									state: function() {
										return n
									},
									always: function() {
										return i.done(arguments).fail(arguments), this
									},
									catch: function(e) {
										return o.then(null, e)
									},
									pipe: function() {
										var e = arguments;
										return E.Deferred((function(n) {
											E.each(t, (function(t, r) {
												var o = g(e[r[4]]) && e[r[4]];
												i[r[1]]((function() {
													var e = o && o.apply(this, arguments);
													e && g(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this, o ? [e] : arguments)
												}))
											})), e = null
										})).promise()
									},
									then: function(e, n, o) {
										var i = 0;

										function a(e, t, n, o) {
											return function() {
												var l = this,
													s = arguments,
													c = function() {
														var r, c;
														if (!(e < i)) {
															if ((r = n.apply(l, s)) === t.promise()) throw new TypeError("Thenable self-resolution");
															c = r && ("object" == typeof r || "function" == typeof r) && r.then, g(c) ? o ? c.call(r, a(i, t, R, o), a(i, t, q, o)) : (i++, c.call(r, a(i, t, R, o), a(i, t, q, o), a(i, t, R, t.notifyWith))) : (n !== R && (l = void 0, s = [r]), (o || t.resolveWith)(l, s))
														}
													},
													u = o ? c : function() {
														try {
															c()
														} catch (r) {
															E.Deferred.exceptionHook && E.Deferred.exceptionHook(r, u.stackTrace), e + 1 >= i && (n !== q && (l = void 0, s = [r]), t.rejectWith(l, s))
														}
													};
												e ? u() : (E.Deferred.getStackHook && (u.stackTrace = E.Deferred.getStackHook()), r.setTimeout(u))
											}
										}
										return E.Deferred((function(r) {
											t[0][3].add(a(0, r, g(o) ? o : R, r.notifyWith)), t[1][3].add(a(0, r, g(e) ? e : R)), t[2][3].add(a(0, r, g(n) ? n : q))
										})).promise()
									},
									promise: function(e) {
										return null != e ? E.extend(e, o) : o
									}
								},
								i = {};
							return E.each(t, (function(e, r) {
								var a = r[2],
									l = r[5];
								o[r[1]] = a.add, l && a.add((function() {
									n = l
								}), t[3 - e][2].disable, t[3 - e][3].disable, t[0][2].lock, t[0][3].lock), a.add(r[3].fire), i[r[0]] = function() {
									return i[r[0] + "With"](this === i ? void 0 : this, arguments), this
								}, i[r[0] + "With"] = a.fireWith
							})), o.promise(i), e && e.call(i, i), i
						},
						when: function(e) {
							var t = arguments.length,
								n = t,
								r = Array(n),
								o = l.call(arguments),
								i = E.Deferred(),
								a = function(e) {
									return function(n) {
										r[e] = this, o[e] = arguments.length > 1 ? l.call(arguments) : n, --t || i.resolveWith(r, o)
									}
								};
							if (t <= 1 && (j(e, i.done(a(n)).resolve, i.reject, !t), "pending" === i.state() || g(o[n] && o[n].then))) return i.then();
							for (; n--;) j(o[n], a(n), i.reject);
							return i.promise()
						}
					});
					var Z = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
					E.Deferred.exceptionHook = function(e, t) {
						r.console && r.console.warn && e && Z.test(e.name) && r.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
					}, E.readyException = function(e) {
						r.setTimeout((function() {
							throw e
						}))
					};
					var F = E.Deferred();

					function V() {
						b.removeEventListener("DOMContentLoaded", V), r.removeEventListener("load", V), E.ready()
					}
					E.fn.ready = function(e) {
						return F.then(e).catch((function(e) {
							E.readyException(e)
						})), this
					}, E.extend({
						isReady: !1,
						readyWait: 1,
						ready: function(e) {
							(!0 === e ? --E.readyWait : E.isReady) || (E.isReady = !0, !0 !== e && --E.readyWait > 0 || F.resolveWith(b, [E]))
						}
					}), E.ready.then = F.then, "complete" === b.readyState || "loading" !== b.readyState && !b.documentElement.doScroll ? r.setTimeout(E.ready) : (b.addEventListener("DOMContentLoaded", V), r.addEventListener("load", V));
					var Q = function(e, t, n, r, o, i, a) {
							var l = 0,
								s = e.length,
								c = null == n;
							if ("object" === M(n))
								for (l in o = !0, n) Q(e, t, l, n[l], !0, i, a);
							else if (void 0 !== r && (o = !0, g(r) || (a = !0), c && (a ? (t.call(e, r), t = null) : (c = t, t = function(e, t, n) {
									return c.call(E(e), n)
								})), t))
								for (; l < s; l++) t(e[l], n, a ? r : r.call(e[l], l, t(e[l], n)));
							return o ? e : c ? t.call(e) : s ? t(e[0], n) : i
						},
						U = /^-ms-/,
						K = /-([a-z])/g;

					function W(e, t) {
						return t.toUpperCase()
					}

					function $(e) {
						return e.replace(U, "ms-").replace(K, W)
					}
					var Y = function(e) {
						return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
					};

					function G() {
						this.expando = E.expando + G.uid++
					}
					G.uid = 1, G.prototype = {
						cache: function(e) {
							var t = e[this.expando];
							return t || (t = {}, Y(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
								value: t,
								configurable: !0
							}))), t
						},
						set: function(e, t, n) {
							var r, o = this.cache(e);
							if ("string" == typeof t) o[$(t)] = n;
							else
								for (r in t) o[$(r)] = t[r];
							return o
						},
						get: function(e, t) {
							return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][$(t)]
						},
						access: function(e, t, n) {
							return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
						},
						remove: function(e, t) {
							var n, r = e[this.expando];
							if (void 0 !== r) {
								if (void 0 !== t) {
									n = (t = Array.isArray(t) ? t.map($) : (t = $(t)) in r ? [t] : t.match(H) || []).length;
									for (; n--;) delete r[t[n]]
								}(void 0 === t || E.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
							}
						},
						hasData: function(e) {
							var t = e[this.expando];
							return void 0 !== t && !E.isEmptyObject(t)
						}
					};
					var X = new G,
						J = new G,
						ee = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
						te = /[A-Z]/g;

					function ne(e, t, n) {
						var r;
						if (void 0 === n && 1 === e.nodeType)
							if (r = "data-" + t.replace(te, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
								try {
									n = function(e) {
										return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : ee.test(e) ? JSON.parse(e) : e)
									}(n)
								} catch (e) {}
								J.set(e, t, n)
							} else n = void 0;
						return n
					}
					E.extend({
						hasData: function(e) {
							return J.hasData(e) || X.hasData(e)
						},
						data: function(e, t, n) {
							return J.access(e, t, n)
						},
						removeData: function(e, t) {
							J.remove(e, t)
						},
						_data: function(e, t, n) {
							return X.access(e, t, n)
						},
						_removeData: function(e, t) {
							X.remove(e, t)
						}
					}), E.fn.extend({
						data: function(e, t) {
							var n, r, o, i = this[0],
								a = i && i.attributes;
							if (void 0 === e) {
								if (this.length && (o = J.get(i), 1 === i.nodeType && !X.get(i, "hasDataAttrs"))) {
									for (n = a.length; n--;) a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = $(r.slice(5)), ne(i, r, o[r]));
									X.set(i, "hasDataAttrs", !0)
								}
								return o
							}
							return "object" == typeof e ? this.each((function() {
								J.set(this, e)
							})) : Q(this, (function(t) {
								var n;
								if (i && void 0 === t) return void 0 !== (n = J.get(i, e)) || void 0 !== (n = ne(i, e)) ? n : void 0;
								this.each((function() {
									J.set(this, e, t)
								}))
							}), null, t, arguments.length > 1, null, !0)
						},
						removeData: function(e) {
							return this.each((function() {
								J.remove(this, e)
							}))
						}
					}), E.extend({
						queue: function(e, t, n) {
							var r;
							if (e) return t = (t || "fx") + "queue", r = X.get(e, t), n && (!r || Array.isArray(n) ? r = X.access(e, t, E.makeArray(n)) : r.push(n)), r || []
						},
						dequeue: function(e, t) {
							t = t || "fx";
							var n = E.queue(e, t),
								r = n.length,
								o = n.shift(),
								i = E._queueHooks(e, t);
							"inprogress" === o && (o = n.shift(), r--), o && ("fx" === t && n.unshift("inprogress"), delete i.stop, o.call(e, (function() {
								E.dequeue(e, t)
							}), i)), !r && i && i.empty.fire()
						},
						_queueHooks: function(e, t) {
							var n = t + "queueHooks";
							return X.get(e, n) || X.access(e, n, {
								empty: E.Callbacks("once memory").add((function() {
									X.remove(e, [t + "queue", n])
								}))
							})
						}
					}), E.fn.extend({
						queue: function(e, t) {
							var n = 2;
							return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? E.queue(this[0], e) : void 0 === t ? this : this.each((function() {
								var n = E.queue(this, e, t);
								E._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && E.dequeue(this, e)
							}))
						},
						dequeue: function(e) {
							return this.each((function() {
								E.dequeue(this, e)
							}))
						},
						clearQueue: function(e) {
							return this.queue(e || "fx", [])
						},
						promise: function(e, t) {
							var n, r = 1,
								o = E.Deferred(),
								i = this,
								a = this.length,
								l = function() {
									--r || o.resolveWith(i, [i])
								};
							for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(n = X.get(i[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(l));
							return l(), o.promise(t)
						}
					});
					var re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
						oe = new RegExp("^(?:([+-])=|)(" + re + ")([a-z%]*)$", "i"),
						ie = ["Top", "Right", "Bottom", "Left"],
						ae = b.documentElement,
						le = function(e) {
							return E.contains(e.ownerDocument, e)
						},
						se = {
							composed: !0
						};
					ae.getRootNode && (le = function(e) {
						return E.contains(e.ownerDocument, e) || e.getRootNode(se) === e.ownerDocument
					});
					var ce = function(e, t) {
						return "none" === (e = t || e).style.display || "" === e.style.display && le(e) && "none" === E.css(e, "display")
					};

					function ue(e, t, n, r) {
						var o, i, a = 20,
							l = r ? function() {
								return r.cur()
							} : function() {
								return E.css(e, t, "")
							},
							s = l(),
							c = n && n[3] || (E.cssNumber[t] ? "" : "px"),
							u = e.nodeType && (E.cssNumber[t] || "px" !== c && +s) && oe.exec(E.css(e, t));
						if (u && u[3] !== c) {
							for (s /= 2, c = c || u[3], u = +s || 1; a--;) E.style(e, t, u + c), (1 - i) * (1 - (i = l() / s || .5)) <= 0 && (a = 0), u /= i;
							u *= 2, E.style(e, t, u + c), n = n || []
						}
						return n && (u = +u || +s || 0, o = n[1] ? u + (n[1] + 1) * n[2] : +n[2], r && (r.unit = c, r.start = u, r.end = o)), o
					}
					var fe = {};

					function de(e) {
						var t, n = e.ownerDocument,
							r = e.nodeName,
							o = fe[r];
						return o || (t = n.body.appendChild(n.createElement(r)), o = E.css(t, "display"), t.parentNode.removeChild(t), "none" === o && (o = "block"), fe[r] = o, o)
					}

					function he(e, t) {
						for (var n, r, o = [], i = 0, a = e.length; i < a; i++)(r = e[i]).style && (n = r.style.display, t ? ("none" === n && (o[i] = X.get(r, "display") || null, o[i] || (r.style.display = "")), "" === r.style.display && ce(r) && (o[i] = de(r))) : "none" !== n && (o[i] = "none", X.set(r, "display", n)));
						for (i = 0; i < a; i++) null != o[i] && (e[i].style.display = o[i]);
						return e
					}
					E.fn.extend({
						show: function() {
							return he(this, !0)
						},
						hide: function() {
							return he(this)
						},
						toggle: function(e) {
							return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function() {
								ce(this) ? E(this).show() : E(this).hide()
							}))
						}
					});
					var pe, ve, me = /^(?:checkbox|radio)$/i,
						ge = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
						ye = /^$|^module$|\/(?:java|ecma)script/i;
					pe = b.createDocumentFragment().appendChild(b.createElement("div")), (ve = b.createElement("input")).setAttribute("type", "radio"), ve.setAttribute("checked", "checked"), ve.setAttribute("name", "t"), pe.appendChild(ve), m.checkClone = pe.cloneNode(!0).cloneNode(!0).lastChild.checked, pe.innerHTML = "<textarea>x</textarea>", m.noCloneChecked = !!pe.cloneNode(!0).lastChild.defaultValue, pe.innerHTML = "<option></option>", m.option = !!pe.lastChild;
					var be = {
						thead: [1, "<table>", "</table>"],
						col: [2, "<table><colgroup>", "</colgroup></table>"],
						tr: [2, "<table><tbody>", "</tbody></table>"],
						td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
						_default: [0, "", ""]
					};

					function we(e, t) {
						var n;
						return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && P(e, t) ? E.merge([e], n) : n
					}

					function xe(e, t) {
						for (var n = 0, r = e.length; n < r; n++) X.set(e[n], "globalEval", !t || X.get(t[n], "globalEval"))
					}
					be.tbody = be.tfoot = be.colgroup = be.caption = be.thead, be.th = be.td, m.option || (be.optgroup = be.option = [1, "<select multiple='multiple'>", "</select>"]);
					var Me = /<|&#?\w+;/;

					function ze(e, t, n, r, o) {
						for (var i, a, l, s, c, u, f = t.createDocumentFragment(), d = [], h = 0, p = e.length; h < p; h++)
							if ((i = e[h]) || 0 === i)
								if ("object" === M(i)) E.merge(d, i.nodeType ? [i] : i);
								else if (Me.test(i)) {
							for (a = a || f.appendChild(t.createElement("div")), l = (ge.exec(i) || ["", ""])[1].toLowerCase(), s = be[l] || be._default, a.innerHTML = s[1] + E.htmlPrefilter(i) + s[2], u = s[0]; u--;) a = a.lastChild;
							E.merge(d, a.childNodes), (a = f.firstChild).textContent = ""
						} else d.push(t.createTextNode(i));
						for (f.textContent = "", h = 0; i = d[h++];)
							if (r && E.inArray(i, r) > -1) o && o.push(i);
							else if (c = le(i), a = we(f.appendChild(i), "script"), c && xe(a), n)
							for (u = 0; i = a[u++];) ye.test(i.type || "") && n.push(i);
						return f
					}
					var Ee = /^([^.]*)(?:\.(.+)|)/;

					function ke() {
						return !0
					}

					function Ce() {
						return !1
					}

					function Se(e, t) {
						return e === function() {
							try {
								return b.activeElement
							} catch (e) {}
						}() == ("focus" === t)
					}

					function Te(e, t, n, r, o, i) {
						var a, l;
						if ("object" == typeof t) {
							for (l in "string" != typeof n && (r = r || n, n = void 0), t) Te(e, l, n, r, t[l], i);
							return e
						}
						if (null == r && null == o ? (o = n, r = n = void 0) : null == o && ("string" == typeof n ? (o = r, r = void 0) : (o = r, r = n, n = void 0)), !1 === o) o = Ce;
						else if (!o) return e;
						return 1 === i && (a = o, o = function(e) {
							return E().off(e), a.apply(this, arguments)
						}, o.guid = a.guid || (a.guid = E.guid++)), e.each((function() {
							E.event.add(this, t, o, r, n)
						}))
					}

					function Ne(e, t, n) {
						n ? (X.set(e, t, !1), E.event.add(e, t, {
							namespace: !1,
							handler: function(e) {
								var r, o, i = X.get(this, t);
								if (1 & e.isTrigger && this[t]) {
									if (i.length)(E.event.special[t] || {}).delegateType && e.stopPropagation();
									else if (i = l.call(arguments), X.set(this, t, i), r = n(this, t), this[t](), i !== (o = X.get(this, t)) || r ? X.set(this, t, !1) : o = {}, i !== o) return e.stopImmediatePropagation(), e.preventDefault(), o && o.value
								} else i.length && (X.set(this, t, {
									value: E.event.trigger(E.extend(i[0], E.Event.prototype), i.slice(1), this)
								}), e.stopImmediatePropagation())
							}
						})) : void 0 === X.get(e, t) && E.event.add(e, t, ke)
					}
					E.event = {
						global: {},
						add: function(e, t, n, r, o) {
							var i, a, l, s, c, u, f, d, h, p, v, m = X.get(e);
							if (Y(e))
								for (n.handler && (n = (i = n).handler, o = i.selector), o && E.find.matchesSelector(ae, o), n.guid || (n.guid = E.guid++), (s = m.events) || (s = m.events = Object.create(null)), (a = m.handle) || (a = m.handle = function(t) {
										return void 0 !== E && E.event.triggered !== t.type ? E.event.dispatch.apply(e, arguments) : void 0
									}), c = (t = (t || "").match(H) || [""]).length; c--;) h = v = (l = Ee.exec(t[c]) || [])[1], p = (l[2] || "").split(".").sort(), h && (f = E.event.special[h] || {}, h = (o ? f.delegateType : f.bindType) || h, f = E.event.special[h] || {}, u = E.extend({
									type: h,
									origType: v,
									data: r,
									handler: n,
									guid: n.guid,
									selector: o,
									needsContext: o && E.expr.match.needsContext.test(o),
									namespace: p.join(".")
								}, i), (d = s[h]) || ((d = s[h] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, p, a) || e.addEventListener && e.addEventListener(h, a)), f.add && (f.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), o ? d.splice(d.delegateCount++, 0, u) : d.push(u), E.event.global[h] = !0)
						},
						remove: function(e, t, n, r, o) {
							var i, a, l, s, c, u, f, d, h, p, v, m = X.hasData(e) && X.get(e);
							if (m && (s = m.events)) {
								for (c = (t = (t || "").match(H) || [""]).length; c--;)
									if (h = v = (l = Ee.exec(t[c]) || [])[1], p = (l[2] || "").split(".").sort(), h) {
										for (f = E.event.special[h] || {}, d = s[h = (r ? f.delegateType : f.bindType) || h] || [], l = l[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = i = d.length; i--;) u = d[i], !o && v !== u.origType || n && n.guid !== u.guid || l && !l.test(u.namespace) || r && r !== u.selector && ("**" !== r || !u.selector) || (d.splice(i, 1), u.selector && d.delegateCount--, f.remove && f.remove.call(e, u));
										a && !d.length && (f.teardown && !1 !== f.teardown.call(e, p, m.handle) || E.removeEvent(e, h, m.handle), delete s[h])
									} else
										for (h in s) E.event.remove(e, h + t[c], n, r, !0);
								E.isEmptyObject(s) && X.remove(e, "handle events")
							}
						},
						dispatch: function(e) {
							var t, n, r, o, i, a, l = new Array(arguments.length),
								s = E.event.fix(e),
								c = (X.get(this, "events") || Object.create(null))[s.type] || [],
								u = E.event.special[s.type] || {};
							for (l[0] = s, t = 1; t < arguments.length; t++) l[t] = arguments[t];
							if (s.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, s)) {
								for (a = E.event.handlers.call(this, s, c), t = 0;
									(o = a[t++]) && !s.isPropagationStopped();)
									for (s.currentTarget = o.elem, n = 0;
										(i = o.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !1 !== i.namespace && !s.rnamespace.test(i.namespace) || (s.handleObj = i, s.data = i.data, void 0 !== (r = ((E.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, l)) && !1 === (s.result = r) && (s.preventDefault(), s.stopPropagation()));
								return u.postDispatch && u.postDispatch.call(this, s), s.result
							}
						},
						handlers: function(e, t) {
							var n, r, o, i, a, l = [],
								s = t.delegateCount,
								c = e.target;
							if (s && c.nodeType && !("click" === e.type && e.button >= 1))
								for (; c !== this; c = c.parentNode || this)
									if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
										for (i = [], a = {}, n = 0; n < s; n++) void 0 === a[o = (r = t[n]).selector + " "] && (a[o] = r.needsContext ? E(o, this).index(c) > -1 : E.find(o, this, null, [c]).length), a[o] && i.push(r);
										i.length && l.push({
											elem: c,
											handlers: i
										})
									} return c = this, s < t.length && l.push({
								elem: c,
								handlers: t.slice(s)
							}), l
						},
						addProp: function(e, t) {
							Object.defineProperty(E.Event.prototype, e, {
								enumerable: !0,
								configurable: !0,
								get: g(t) ? function() {
									if (this.originalEvent) return t(this.originalEvent)
								} : function() {
									if (this.originalEvent) return this.originalEvent[e]
								},
								set: function(t) {
									Object.defineProperty(this, e, {
										enumerable: !0,
										configurable: !0,
										writable: !0,
										value: t
									})
								}
							})
						},
						fix: function(e) {
							return e[E.expando] ? e : new E.Event(e)
						},
						special: {
							load: {
								noBubble: !0
							},
							click: {
								setup: function(e) {
									var t = this || e;
									return me.test(t.type) && t.click && P(t, "input") && Ne(t, "click", ke), !1
								},
								trigger: function(e) {
									var t = this || e;
									return me.test(t.type) && t.click && P(t, "input") && Ne(t, "click"), !0
								},
								_default: function(e) {
									var t = e.target;
									return me.test(t.type) && t.click && P(t, "input") && X.get(t, "click") || P(t, "a")
								}
							},
							beforeunload: {
								postDispatch: function(e) {
									void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
								}
							}
						}
					}, E.removeEvent = function(e, t, n) {
						e.removeEventListener && e.removeEventListener(t, n)
					}, E.Event = function(e, t) {
						if (!(this instanceof E.Event)) return new E.Event(e, t);
						e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? ke : Ce, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && E.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[E.expando] = !0
					}, E.Event.prototype = {
						constructor: E.Event,
						isDefaultPrevented: Ce,
						isPropagationStopped: Ce,
						isImmediatePropagationStopped: Ce,
						isSimulated: !1,
						preventDefault: function() {
							var e = this.originalEvent;
							this.isDefaultPrevented = ke, e && !this.isSimulated && e.preventDefault()
						},
						stopPropagation: function() {
							var e = this.originalEvent;
							this.isPropagationStopped = ke, e && !this.isSimulated && e.stopPropagation()
						},
						stopImmediatePropagation: function() {
							var e = this.originalEvent;
							this.isImmediatePropagationStopped = ke, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
						}
					}, E.each({
						altKey: !0,
						bubbles: !0,
						cancelable: !0,
						changedTouches: !0,
						ctrlKey: !0,
						detail: !0,
						eventPhase: !0,
						metaKey: !0,
						pageX: !0,
						pageY: !0,
						shiftKey: !0,
						view: !0,
						char: !0,
						code: !0,
						charCode: !0,
						key: !0,
						keyCode: !0,
						button: !0,
						buttons: !0,
						clientX: !0,
						clientY: !0,
						offsetX: !0,
						offsetY: !0,
						pointerId: !0,
						pointerType: !0,
						screenX: !0,
						screenY: !0,
						targetTouches: !0,
						toElement: !0,
						touches: !0,
						which: !0
					}, E.event.addProp), E.each({
						focus: "focusin",
						blur: "focusout"
					}, (function(e, t) {
						E.event.special[e] = {
							setup: function() {
								return Ne(this, e, Se), !1
							},
							trigger: function() {
								return Ne(this, e), !0
							},
							_default: function() {
								return !0
							},
							delegateType: t
						}
					})), E.each({
						mouseenter: "mouseover",
						mouseleave: "mouseout",
						pointerenter: "pointerover",
						pointerleave: "pointerout"
					}, (function(e, t) {
						E.event.special[e] = {
							delegateType: t,
							bindType: t,
							handle: function(e) {
								var n, r = this,
									o = e.relatedTarget,
									i = e.handleObj;
								return o && (o === r || E.contains(r, o)) || (e.type = i.origType, n = i.handler.apply(this, arguments), e.type = t), n
							}
						}
					})), E.fn.extend({
						on: function(e, t, n, r) {
							return Te(this, e, t, n, r)
						},
						one: function(e, t, n, r) {
							return Te(this, e, t, n, r, 1)
						},
						off: function(e, t, n) {
							var r, o;
							if (e && e.preventDefault && e.handleObj) return r = e.handleObj, E(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
							if ("object" == typeof e) {
								for (o in e) this.off(o, t, e[o]);
								return this
							}
							return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Ce), this.each((function() {
								E.event.remove(this, e, n, t)
							}))
						}
					});
					var Pe = /<script|<style|<link/i,
						Ae = /checked\s*(?:[^=]|=\s*.checked.)/i,
						_e = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

					function Oe(e, t) {
						return P(e, "table") && P(11 !== t.nodeType ? t : t.firstChild, "tr") && E(e).children("tbody")[0] || e
					}

					function Le(e) {
						return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
					}

					function De(e) {
						return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
					}

					function Be(e, t) {
						var n, r, o, i, a, l;
						if (1 === t.nodeType) {
							if (X.hasData(e) && (l = X.get(e).events))
								for (o in X.remove(t, "handle events"), l)
									for (n = 0, r = l[o].length; n < r; n++) E.event.add(t, o, l[o][n]);
							J.hasData(e) && (i = J.access(e), a = E.extend({}, i), J.set(t, a))
						}
					}

					function Ie(e, t) {
						var n = t.nodeName.toLowerCase();
						"input" === n && me.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
					}

					function He(e, t, n, r) {
						t = s(t);
						var o, i, a, l, c, u, f = 0,
							d = e.length,
							h = d - 1,
							p = t[0],
							v = g(p);
						if (v || d > 1 && "string" == typeof p && !m.checkClone && Ae.test(p)) return e.each((function(o) {
							var i = e.eq(o);
							v && (t[0] = p.call(this, o, i.html())), He(i, t, n, r)
						}));
						if (d && (i = (o = ze(t, e[0].ownerDocument, !1, e, r)).firstChild, 1 === o.childNodes.length && (o = i), i || r)) {
							for (l = (a = E.map(we(o, "script"), Le)).length; f < d; f++) c = o, f !== h && (c = E.clone(c, !0, !0), l && E.merge(a, we(c, "script"))), n.call(e[f], c, f);
							if (l)
								for (u = a[a.length - 1].ownerDocument, E.map(a, De), f = 0; f < l; f++) c = a[f], ye.test(c.type || "") && !X.access(c, "globalEval") && E.contains(u, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? E._evalUrl && !c.noModule && E._evalUrl(c.src, {
									nonce: c.nonce || c.getAttribute("nonce")
								}, u) : x(c.textContent.replace(_e, ""), c, u))
						}
						return e
					}

					function Re(e, t, n) {
						for (var r, o = t ? E.filter(t, e) : e, i = 0; null != (r = o[i]); i++) n || 1 !== r.nodeType || E.cleanData(we(r)), r.parentNode && (n && le(r) && xe(we(r, "script")), r.parentNode.removeChild(r));
						return e
					}
					E.extend({
						htmlPrefilter: function(e) {
							return e
						},
						clone: function(e, t, n) {
							var r, o, i, a, l = e.cloneNode(!0),
								s = le(e);
							if (!(m.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || E.isXMLDoc(e)))
								for (a = we(l), r = 0, o = (i = we(e)).length; r < o; r++) Ie(i[r], a[r]);
							if (t)
								if (n)
									for (i = i || we(e), a = a || we(l), r = 0, o = i.length; r < o; r++) Be(i[r], a[r]);
								else Be(e, l);
							return (a = we(l, "script")).length > 0 && xe(a, !s && we(e, "script")), l
						},
						cleanData: function(e) {
							for (var t, n, r, o = E.event.special, i = 0; void 0 !== (n = e[i]); i++)
								if (Y(n)) {
									if (t = n[X.expando]) {
										if (t.events)
											for (r in t.events) o[r] ? E.event.remove(n, r) : E.removeEvent(n, r, t.handle);
										n[X.expando] = void 0
									}
									n[J.expando] && (n[J.expando] = void 0)
								}
						}
					}), E.fn.extend({
						detach: function(e) {
							return Re(this, e, !0)
						},
						remove: function(e) {
							return Re(this, e)
						},
						text: function(e) {
							return Q(this, (function(e) {
								return void 0 === e ? E.text(this) : this.empty().each((function() {
									1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
								}))
							}), null, e, arguments.length)
						},
						append: function() {
							return He(this, arguments, (function(e) {
								1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Oe(this, e).appendChild(e)
							}))
						},
						prepend: function() {
							return He(this, arguments, (function(e) {
								if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
									var t = Oe(this, e);
									t.insertBefore(e, t.firstChild)
								}
							}))
						},
						before: function() {
							return He(this, arguments, (function(e) {
								this.parentNode && this.parentNode.insertBefore(e, this)
							}))
						},
						after: function() {
							return He(this, arguments, (function(e) {
								this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
							}))
						},
						empty: function() {
							for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (E.cleanData(we(e, !1)), e.textContent = "");
							return this
						},
						clone: function(e, t) {
							return e = null != e && e, t = null == t ? e : t, this.map((function() {
								return E.clone(this, e, t)
							}))
						},
						html: function(e) {
							return Q(this, (function(e) {
								var t = this[0] || {},
									n = 0,
									r = this.length;
								if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
								if ("string" == typeof e && !Pe.test(e) && !be[(ge.exec(e) || ["", ""])[1].toLowerCase()]) {
									e = E.htmlPrefilter(e);
									try {
										for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (E.cleanData(we(t, !1)), t.innerHTML = e);
										t = 0
									} catch (e) {}
								}
								t && this.empty().append(e)
							}), null, e, arguments.length)
						},
						replaceWith: function() {
							var e = [];
							return He(this, arguments, (function(t) {
								var n = this.parentNode;
								E.inArray(this, e) < 0 && (E.cleanData(we(this)), n && n.replaceChild(t, this))
							}), e)
						}
					}), E.each({
						appendTo: "append",
						prependTo: "prepend",
						insertBefore: "before",
						insertAfter: "after",
						replaceAll: "replaceWith"
					}, (function(e, t) {
						E.fn[e] = function(e) {
							for (var n, r = [], o = E(e), i = o.length - 1, a = 0; a <= i; a++) n = a === i ? this : this.clone(!0), E(o[a])[t](n), c.apply(r, n.get());
							return this.pushStack(r)
						}
					}));
					var qe = new RegExp("^(" + re + ")(?!px)[a-z%]+$", "i"),
						je = function(e) {
							var t = e.ownerDocument.defaultView;
							return t && t.opener || (t = r), t.getComputedStyle(e)
						},
						Ze = function(e, t, n) {
							var r, o, i = {};
							for (o in t) i[o] = e.style[o], e.style[o] = t[o];
							for (o in r = n.call(e), t) e.style[o] = i[o];
							return r
						},
						Fe = new RegExp(ie.join("|"), "i");

					function Ve(e, t, n) {
						var r, o, i, a, l = e.style;
						return (n = n || je(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || le(e) || (a = E.style(e, t)), !m.pixelBoxStyles() && qe.test(a) && Fe.test(t) && (r = l.width, o = l.minWidth, i = l.maxWidth, l.minWidth = l.maxWidth = l.width = a, a = n.width, l.width = r, l.minWidth = o, l.maxWidth = i)), void 0 !== a ? a + "" : a
					}

					function Qe(e, t) {
						return {
							get: function() {
								if (!e()) return (this.get = t).apply(this, arguments);
								delete this.get
							}
						}
					}! function() {
						function e() {
							if (u) {
								c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ae.appendChild(c).appendChild(u);
								var e = r.getComputedStyle(u);
								n = "1%" !== e.top, s = 12 === t(e.marginLeft), u.style.right = "60%", a = 36 === t(e.right), o = 36 === t(e.width), u.style.position = "absolute", i = 12 === t(u.offsetWidth / 3), ae.removeChild(c), u = null
							}
						}

						function t(e) {
							return Math.round(parseFloat(e))
						}
						var n, o, i, a, l, s, c = b.createElement("div"),
							u = b.createElement("div");
						u.style && (u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", m.clearCloneStyle = "content-box" === u.style.backgroundClip, E.extend(m, {
							boxSizingReliable: function() {
								return e(), o
							},
							pixelBoxStyles: function() {
								return e(), a
							},
							pixelPosition: function() {
								return e(), n
							},
							reliableMarginLeft: function() {
								return e(), s
							},
							scrollboxSize: function() {
								return e(), i
							},
							reliableTrDimensions: function() {
								var e, t, n, o;
								return null == l && (e = b.createElement("table"), t = b.createElement("tr"), n = b.createElement("div"), e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t.style.cssText = "border:1px solid", t.style.height = "1px", n.style.height = "9px", n.style.display = "block", ae.appendChild(e).appendChild(t).appendChild(n), o = r.getComputedStyle(t), l = parseInt(o.height, 10) + parseInt(o.borderTopWidth, 10) + parseInt(o.borderBottomWidth, 10) === t.offsetHeight, ae.removeChild(e)), l
							}
						}))
					}();
					var Ue = ["Webkit", "Moz", "ms"],
						Ke = b.createElement("div").style,
						We = {};

					function $e(e) {
						return E.cssProps[e] || We[e] || (e in Ke ? e : We[e] = function(e) {
							for (var t = e[0].toUpperCase() + e.slice(1), n = Ue.length; n--;)
								if ((e = Ue[n] + t) in Ke) return e
						}(e) || e)
					}
					var Ye = /^(none|table(?!-c[ea]).+)/,
						Ge = /^--/,
						Xe = {
							position: "absolute",
							visibility: "hidden",
							display: "block"
						},
						Je = {
							letterSpacing: "0",
							fontWeight: "400"
						};

					function et(e, t, n) {
						var r = oe.exec(t);
						return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
					}

					function tt(e, t, n, r, o, i) {
						var a = "width" === t ? 1 : 0,
							l = 0,
							s = 0;
						if (n === (r ? "border" : "content")) return 0;
						for (; a < 4; a += 2) "margin" === n && (s += E.css(e, n + ie[a], !0, o)), r ? ("content" === n && (s -= E.css(e, "padding" + ie[a], !0, o)), "margin" !== n && (s -= E.css(e, "border" + ie[a] + "Width", !0, o))) : (s += E.css(e, "padding" + ie[a], !0, o), "padding" !== n ? s += E.css(e, "border" + ie[a] + "Width", !0, o) : l += E.css(e, "border" + ie[a] + "Width", !0, o));
						return !r && i >= 0 && (s += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - i - s - l - .5)) || 0), s
					}

					function nt(e, t, n) {
						var r = je(e),
							o = (!m.boxSizingReliable() || n) && "border-box" === E.css(e, "boxSizing", !1, r),
							i = o,
							a = Ve(e, t, r),
							l = "offset" + t[0].toUpperCase() + t.slice(1);
						if (qe.test(a)) {
							if (!n) return a;
							a = "auto"
						}
						return (!m.boxSizingReliable() && o || !m.reliableTrDimensions() && P(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === E.css(e, "display", !1, r)) && e.getClientRects().length && (o = "border-box" === E.css(e, "boxSizing", !1, r), (i = l in e) && (a = e[l])), (a = parseFloat(a) || 0) + tt(e, t, n || (o ? "border" : "content"), i, r, a) + "px"
					}

					function rt(e, t, n, r, o) {
						return new rt.prototype.init(e, t, n, r, o)
					}
					E.extend({
						cssHooks: {
							opacity: {
								get: function(e, t) {
									if (t) {
										var n = Ve(e, "opacity");
										return "" === n ? "1" : n
									}
								}
							}
						},
						cssNumber: {
							animationIterationCount: !0,
							columnCount: !0,
							fillOpacity: !0,
							flexGrow: !0,
							flexShrink: !0,
							fontWeight: !0,
							gridArea: !0,
							gridColumn: !0,
							gridColumnEnd: !0,
							gridColumnStart: !0,
							gridRow: !0,
							gridRowEnd: !0,
							gridRowStart: !0,
							lineHeight: !0,
							opacity: !0,
							order: !0,
							orphans: !0,
							widows: !0,
							zIndex: !0,
							zoom: !0
						},
						cssProps: {},
						style: function(e, t, n, r) {
							if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
								var o, i, a, l = $(t),
									s = Ge.test(t),
									c = e.style;
								if (s || (t = $e(l)), a = E.cssHooks[t] || E.cssHooks[l], void 0 === n) return a && "get" in a && void 0 !== (o = a.get(e, !1, r)) ? o : c[t];
								"string" == (i = typeof n) && (o = oe.exec(n)) && o[1] && (n = ue(e, t, o), i = "number"), null != n && n == n && ("number" !== i || s || (n += o && o[3] || (E.cssNumber[l] ? "" : "px")), m.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (s ? c.setProperty(t, n) : c[t] = n))
							}
						},
						css: function(e, t, n, r) {
							var o, i, a, l = $(t);
							return Ge.test(t) || (t = $e(l)), (a = E.cssHooks[t] || E.cssHooks[l]) && "get" in a && (o = a.get(e, !0, n)), void 0 === o && (o = Ve(e, t, r)), "normal" === o && t in Je && (o = Je[t]), "" === n || n ? (i = parseFloat(o), !0 === n || isFinite(i) ? i || 0 : o) : o
						}
					}), E.each(["height", "width"], (function(e, t) {
						E.cssHooks[t] = {
							get: function(e, n, r) {
								if (n) return !Ye.test(E.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? nt(e, t, r) : Ze(e, Xe, (function() {
									return nt(e, t, r)
								}))
							},
							set: function(e, n, r) {
								var o, i = je(e),
									a = !m.scrollboxSize() && "absolute" === i.position,
									l = (a || r) && "border-box" === E.css(e, "boxSizing", !1, i),
									s = r ? tt(e, t, r, l, i) : 0;
								return l && a && (s -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(i[t]) - tt(e, t, "border", !1, i) - .5)), s && (o = oe.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n, n = E.css(e, t)), et(0, n, s)
							}
						}
					})), E.cssHooks.marginLeft = Qe(m.reliableMarginLeft, (function(e, t) {
						if (t) return (parseFloat(Ve(e, "marginLeft")) || e.getBoundingClientRect().left - Ze(e, {
							marginLeft: 0
						}, (function() {
							return e.getBoundingClientRect().left
						}))) + "px"
					})), E.each({
						margin: "",
						padding: "",
						border: "Width"
					}, (function(e, t) {
						E.cssHooks[e + t] = {
							expand: function(n) {
								for (var r = 0, o = {}, i = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) o[e + ie[r] + t] = i[r] || i[r - 2] || i[0];
								return o
							}
						}, "margin" !== e && (E.cssHooks[e + t].set = et)
					})), E.fn.extend({
						css: function(e, t) {
							return Q(this, (function(e, t, n) {
								var r, o, i = {},
									a = 0;
								if (Array.isArray(t)) {
									for (r = je(e), o = t.length; a < o; a++) i[t[a]] = E.css(e, t[a], !1, r);
									return i
								}
								return void 0 !== n ? E.style(e, t, n) : E.css(e, t)
							}), e, t, arguments.length > 1)
						}
					}), E.Tween = rt, rt.prototype = {
						constructor: rt,
						init: function(e, t, n, r, o, i) {
							this.elem = e, this.prop = n, this.easing = o || E.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = i || (E.cssNumber[n] ? "" : "px")
						},
						cur: function() {
							var e = rt.propHooks[this.prop];
							return e && e.get ? e.get(this) : rt.propHooks._default.get(this)
						},
						run: function(e) {
							var t, n = rt.propHooks[this.prop];
							return this.options.duration ? this.pos = t = E.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : rt.propHooks._default.set(this), this
						}
					}, rt.prototype.init.prototype = rt.prototype, rt.propHooks = {
						_default: {
							get: function(e) {
								var t;
								return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = E.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
							},
							set: function(e) {
								E.fx.step[e.prop] ? E.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !E.cssHooks[e.prop] && null == e.elem.style[$e(e.prop)] ? e.elem[e.prop] = e.now : E.style(e.elem, e.prop, e.now + e.unit)
							}
						}
					}, rt.propHooks.scrollTop = rt.propHooks.scrollLeft = {
						set: function(e) {
							e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
						}
					}, E.easing = {
						linear: function(e) {
							return e
						},
						swing: function(e) {
							return .5 - Math.cos(e * Math.PI) / 2
						},
						_default: "swing"
					}, E.fx = rt.prototype.init, E.fx.step = {};
					var ot, it, at = /^(?:toggle|show|hide)$/,
						lt = /queueHooks$/;

					function st() {
						it && (!1 === b.hidden && r.requestAnimationFrame ? r.requestAnimationFrame(st) : r.setTimeout(st, E.fx.interval), E.fx.tick())
					}

					function ct() {
						return r.setTimeout((function() {
							ot = void 0
						})), ot = Date.now()
					}

					function ut(e, t) {
						var n, r = 0,
							o = {
								height: e
							};
						for (t = t ? 1 : 0; r < 4; r += 2 - t) o["margin" + (n = ie[r])] = o["padding" + n] = e;
						return t && (o.opacity = o.width = e), o
					}

					function ft(e, t, n) {
						for (var r, o = (dt.tweeners[t] || []).concat(dt.tweeners["*"]), i = 0, a = o.length; i < a; i++)
							if (r = o[i].call(n, t, e)) return r
					}

					function dt(e, t, n) {
						var r, o, i = 0,
							a = dt.prefilters.length,
							l = E.Deferred().always((function() {
								delete s.elem
							})),
							s = function() {
								if (o) return !1;
								for (var t = ot || ct(), n = Math.max(0, c.startTime + c.duration - t), r = 1 - (n / c.duration || 0), i = 0, a = c.tweens.length; i < a; i++) c.tweens[i].run(r);
								return l.notifyWith(e, [c, r, n]), r < 1 && a ? n : (a || l.notifyWith(e, [c, 1, 0]), l.resolveWith(e, [c]), !1)
							},
							c = l.promise({
								elem: e,
								props: E.extend({}, t),
								opts: E.extend(!0, {
									specialEasing: {},
									easing: E.easing._default
								}, n),
								originalProperties: t,
								originalOptions: n,
								startTime: ot || ct(),
								duration: n.duration,
								tweens: [],
								createTween: function(t, n) {
									var r = E.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
									return c.tweens.push(r), r
								},
								stop: function(t) {
									var n = 0,
										r = t ? c.tweens.length : 0;
									if (o) return this;
									for (o = !0; n < r; n++) c.tweens[n].run(1);
									return t ? (l.notifyWith(e, [c, 1, 0]), l.resolveWith(e, [c, t])) : l.rejectWith(e, [c, t]), this
								}
							}),
							u = c.props;
						for (function(e, t) {
								var n, r, o, i, a;
								for (n in e)
									if (o = t[r = $(n)], i = e[n], Array.isArray(i) && (o = i[1], i = e[n] = i[0]), n !== r && (e[r] = i, delete e[n]), (a = E.cssHooks[r]) && "expand" in a)
										for (n in i = a.expand(i), delete e[r], i) n in e || (e[n] = i[n], t[n] = o);
									else t[r] = o
							}(u, c.opts.specialEasing); i < a; i++)
							if (r = dt.prefilters[i].call(c, e, u, c.opts)) return g(r.stop) && (E._queueHooks(c.elem, c.opts.queue).stop = r.stop.bind(r)), r;
						return E.map(u, ft, c), g(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), E.fx.timer(E.extend(s, {
							elem: e,
							anim: c,
							queue: c.opts.queue
						})), c
					}
					E.Animation = E.extend(dt, {
							tweeners: {
								"*": [function(e, t) {
									var n = this.createTween(e, t);
									return ue(n.elem, e, oe.exec(t), n), n
								}]
							},
							tweener: function(e, t) {
								g(e) ? (t = e, e = ["*"]) : e = e.match(H);
								for (var n, r = 0, o = e.length; r < o; r++) n = e[r], dt.tweeners[n] = dt.tweeners[n] || [], dt.tweeners[n].unshift(t)
							},
							prefilters: [function(e, t, n) {
								var r, o, i, a, l, s, c, u, f = "width" in t || "height" in t,
									d = this,
									h = {},
									p = e.style,
									v = e.nodeType && ce(e),
									m = X.get(e, "fxshow");
								for (r in n.queue || (null == (a = E._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
										a.unqueued || l()
									}), a.unqueued++, d.always((function() {
										d.always((function() {
											a.unqueued--, E.queue(e, "fx").length || a.empty.fire()
										}))
									}))), t)
									if (o = t[r], at.test(o)) {
										if (delete t[r], i = i || "toggle" === o, o === (v ? "hide" : "show")) {
											if ("show" !== o || !m || void 0 === m[r]) continue;
											v = !0
										}
										h[r] = m && m[r] || E.style(e, r)
									} if ((s = !E.isEmptyObject(t)) || !E.isEmptyObject(h))
									for (r in f && 1 === e.nodeType && (n.overflow = [p.overflow, p.overflowX, p.overflowY], null == (c = m && m.display) && (c = X.get(e, "display")), "none" === (u = E.css(e, "display")) && (c ? u = c : (he([e], !0), c = e.style.display || c, u = E.css(e, "display"), he([e]))), ("inline" === u || "inline-block" === u && null != c) && "none" === E.css(e, "float") && (s || (d.done((function() {
											p.display = c
										})), null == c && (u = p.display, c = "none" === u ? "" : u)), p.display = "inline-block")), n.overflow && (p.overflow = "hidden", d.always((function() {
											p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
										}))), s = !1, h) s || (m ? "hidden" in m && (v = m.hidden) : m = X.access(e, "fxshow", {
										display: c
									}), i && (m.hidden = !v), v && he([e], !0), d.done((function() {
										for (r in v || he([e]), X.remove(e, "fxshow"), h) E.style(e, r, h[r])
									}))), s = ft(v ? m[r] : 0, r, d), r in m || (m[r] = s.start, v && (s.end = s.start, s.start = 0))
							}],
							prefilter: function(e, t) {
								t ? dt.prefilters.unshift(e) : dt.prefilters.push(e)
							}
						}), E.speed = function(e, t, n) {
							var r = e && "object" == typeof e ? E.extend({}, e) : {
								complete: n || !n && t || g(e) && e,
								duration: e,
								easing: n && t || t && !g(t) && t
							};
							return E.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in E.fx.speeds ? r.duration = E.fx.speeds[r.duration] : r.duration = E.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
								g(r.old) && r.old.call(this), r.queue && E.dequeue(this, r.queue)
							}, r
						}, E.fn.extend({
							fadeTo: function(e, t, n, r) {
								return this.filter(ce).css("opacity", 0).show().end().animate({
									opacity: t
								}, e, n, r)
							},
							animate: function(e, t, n, r) {
								var o = E.isEmptyObject(e),
									i = E.speed(t, n, r),
									a = function() {
										var t = dt(this, E.extend({}, e), i);
										(o || X.get(this, "finish")) && t.stop(!0)
									};
								return a.finish = a, o || !1 === i.queue ? this.each(a) : this.queue(i.queue, a)
							},
							stop: function(e, t, n) {
								var r = function(e) {
									var t = e.stop;
									delete e.stop, t(n)
								};
								return "string" != typeof e && (n = t, t = e, e = void 0), t && this.queue(e || "fx", []), this.each((function() {
									var t = !0,
										o = null != e && e + "queueHooks",
										i = E.timers,
										a = X.get(this);
									if (o) a[o] && a[o].stop && r(a[o]);
									else
										for (o in a) a[o] && a[o].stop && lt.test(o) && r(a[o]);
									for (o = i.length; o--;) i[o].elem !== this || null != e && i[o].queue !== e || (i[o].anim.stop(n), t = !1, i.splice(o, 1));
									!t && n || E.dequeue(this, e)
								}))
							},
							finish: function(e) {
								return !1 !== e && (e = e || "fx"), this.each((function() {
									var t, n = X.get(this),
										r = n[e + "queue"],
										o = n[e + "queueHooks"],
										i = E.timers,
										a = r ? r.length : 0;
									for (n.finish = !0, E.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = i.length; t--;) i[t].elem === this && i[t].queue === e && (i[t].anim.stop(!0), i.splice(t, 1));
									for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
									delete n.finish
								}))
							}
						}), E.each(["toggle", "show", "hide"], (function(e, t) {
							var n = E.fn[t];
							E.fn[t] = function(e, r, o) {
								return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ut(t, !0), e, r, o)
							}
						})), E.each({
							slideDown: ut("show"),
							slideUp: ut("hide"),
							slideToggle: ut("toggle"),
							fadeIn: {
								opacity: "show"
							},
							fadeOut: {
								opacity: "hide"
							},
							fadeToggle: {
								opacity: "toggle"
							}
						}, (function(e, t) {
							E.fn[e] = function(e, n, r) {
								return this.animate(t, e, n, r)
							}
						})), E.timers = [], E.fx.tick = function() {
							var e, t = 0,
								n = E.timers;
							for (ot = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
							n.length || E.fx.stop(), ot = void 0
						}, E.fx.timer = function(e) {
							E.timers.push(e), E.fx.start()
						}, E.fx.interval = 13, E.fx.start = function() {
							it || (it = !0, st())
						}, E.fx.stop = function() {
							it = null
						}, E.fx.speeds = {
							slow: 600,
							fast: 200,
							_default: 400
						}, E.fn.delay = function(e, t) {
							return e = E.fx && E.fx.speeds[e] || e, t = t || "fx", this.queue(t, (function(t, n) {
								var o = r.setTimeout(t, e);
								n.stop = function() {
									r.clearTimeout(o)
								}
							}))
						},
						function() {
							var e = b.createElement("input"),
								t = b.createElement("select").appendChild(b.createElement("option"));
							e.type = "checkbox", m.checkOn = "" !== e.value, m.optSelected = t.selected, (e = b.createElement("input")).value = "t", e.type = "radio", m.radioValue = "t" === e.value
						}();
					var ht, pt = E.expr.attrHandle;
					E.fn.extend({
						attr: function(e, t) {
							return Q(this, E.attr, e, t, arguments.length > 1)
						},
						removeAttr: function(e) {
							return this.each((function() {
								E.removeAttr(this, e)
							}))
						}
					}), E.extend({
						attr: function(e, t, n) {
							var r, o, i = e.nodeType;
							if (3 !== i && 8 !== i && 2 !== i) return void 0 === e.getAttribute ? E.prop(e, t, n) : (1 === i && E.isXMLDoc(e) || (o = E.attrHooks[t.toLowerCase()] || (E.expr.match.bool.test(t) ? ht : void 0)), void 0 !== n ? null === n ? void E.removeAttr(e, t) : o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (r = o.get(e, t)) ? r : null == (r = E.find.attr(e, t)) ? void 0 : r)
						},
						attrHooks: {
							type: {
								set: function(e, t) {
									if (!m.radioValue && "radio" === t && P(e, "input")) {
										var n = e.value;
										return e.setAttribute("type", t), n && (e.value = n), t
									}
								}
							}
						},
						removeAttr: function(e, t) {
							var n, r = 0,
								o = t && t.match(H);
							if (o && 1 === e.nodeType)
								for (; n = o[r++];) e.removeAttribute(n)
						}
					}), ht = {
						set: function(e, t, n) {
							return !1 === t ? E.removeAttr(e, n) : e.setAttribute(n, n), n
						}
					}, E.each(E.expr.match.bool.source.match(/\w+/g), (function(e, t) {
						var n = pt[t] || E.find.attr;
						pt[t] = function(e, t, r) {
							var o, i, a = t.toLowerCase();
							return r || (i = pt[a], pt[a] = o, o = null != n(e, t, r) ? a : null, pt[a] = i), o
						}
					}));
					var vt = /^(?:input|select|textarea|button)$/i,
						mt = /^(?:a|area)$/i;

					function gt(e) {
						return (e.match(H) || []).join(" ")
					}

					function yt(e) {
						return e.getAttribute && e.getAttribute("class") || ""
					}

					function bt(e) {
						return Array.isArray(e) ? e : "string" == typeof e && e.match(H) || []
					}
					E.fn.extend({
						prop: function(e, t) {
							return Q(this, E.prop, e, t, arguments.length > 1)
						},
						removeProp: function(e) {
							return this.each((function() {
								delete this[E.propFix[e] || e]
							}))
						}
					}), E.extend({
						prop: function(e, t, n) {
							var r, o, i = e.nodeType;
							if (3 !== i && 8 !== i && 2 !== i) return 1 === i && E.isXMLDoc(e) || (t = E.propFix[t] || t, o = E.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : e[t] = n : o && "get" in o && null !== (r = o.get(e, t)) ? r : e[t]
						},
						propHooks: {
							tabIndex: {
								get: function(e) {
									var t = E.find.attr(e, "tabindex");
									return t ? parseInt(t, 10) : vt.test(e.nodeName) || mt.test(e.nodeName) && e.href ? 0 : -1
								}
							}
						},
						propFix: {
							for: "htmlFor",
							class: "className"
						}
					}), m.optSelected || (E.propHooks.selected = {
						get: function(e) {
							var t = e.parentNode;
							return t && t.parentNode && t.parentNode.selectedIndex, null
						},
						set: function(e) {
							var t = e.parentNode;
							t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
						}
					}), E.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function() {
						E.propFix[this.toLowerCase()] = this
					})), E.fn.extend({
						addClass: function(e) {
							var t, n, r, o, i, a, l, s = 0;
							if (g(e)) return this.each((function(t) {
								E(this).addClass(e.call(this, t, yt(this)))
							}));
							if ((t = bt(e)).length)
								for (; n = this[s++];)
									if (o = yt(n), r = 1 === n.nodeType && " " + gt(o) + " ") {
										for (a = 0; i = t[a++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
										o !== (l = gt(r)) && n.setAttribute("class", l)
									} return this
						},
						removeClass: function(e) {
							var t, n, r, o, i, a, l, s = 0;
							if (g(e)) return this.each((function(t) {
								E(this).removeClass(e.call(this, t, yt(this)))
							}));
							if (!arguments.length) return this.attr("class", "");
							if ((t = bt(e)).length)
								for (; n = this[s++];)
									if (o = yt(n), r = 1 === n.nodeType && " " + gt(o) + " ") {
										for (a = 0; i = t[a++];)
											for (; r.indexOf(" " + i + " ") > -1;) r = r.replace(" " + i + " ", " ");
										o !== (l = gt(r)) && n.setAttribute("class", l)
									} return this
						},
						toggleClass: function(e, t) {
							var n = typeof e,
								r = "string" === n || Array.isArray(e);
							return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : g(e) ? this.each((function(n) {
								E(this).toggleClass(e.call(this, n, yt(this), t), t)
							})) : this.each((function() {
								var t, o, i, a;
								if (r)
									for (o = 0, i = E(this), a = bt(e); t = a[o++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
								else void 0 !== e && "boolean" !== n || ((t = yt(this)) && X.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : X.get(this, "__className__") || ""))
							}))
						},
						hasClass: function(e) {
							var t, n, r = 0;
							for (t = " " + e + " "; n = this[r++];)
								if (1 === n.nodeType && (" " + gt(yt(n)) + " ").indexOf(t) > -1) return !0;
							return !1
						}
					});
					var wt = /\r/g;
					E.fn.extend({
						val: function(e) {
							var t, n, r, o = this[0];
							return arguments.length ? (r = g(e), this.each((function(n) {
								var o;
								1 === this.nodeType && (null == (o = r ? e.call(this, n, E(this).val()) : e) ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = E.map(o, (function(e) {
									return null == e ? "" : e + ""
								}))), (t = E.valHooks[this.type] || E.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
							}))) : o ? (t = E.valHooks[o.type] || E.valHooks[o.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : "string" == typeof(n = o.value) ? n.replace(wt, "") : null == n ? "" : n : void 0
						}
					}), E.extend({
						valHooks: {
							option: {
								get: function(e) {
									var t = E.find.attr(e, "value");
									return null != t ? t : gt(E.text(e))
								}
							},
							select: {
								get: function(e) {
									var t, n, r, o = e.options,
										i = e.selectedIndex,
										a = "select-one" === e.type,
										l = a ? null : [],
										s = a ? i + 1 : o.length;
									for (r = i < 0 ? s : a ? i : 0; r < s; r++)
										if (((n = o[r]).selected || r === i) && !n.disabled && (!n.parentNode.disabled || !P(n.parentNode, "optgroup"))) {
											if (t = E(n).val(), a) return t;
											l.push(t)
										} return l
								},
								set: function(e, t) {
									for (var n, r, o = e.options, i = E.makeArray(t), a = o.length; a--;)((r = o[a]).selected = E.inArray(E.valHooks.option.get(r), i) > -1) && (n = !0);
									return n || (e.selectedIndex = -1), i
								}
							}
						}
					}), E.each(["radio", "checkbox"], (function() {
						E.valHooks[this] = {
							set: function(e, t) {
								if (Array.isArray(t)) return e.checked = E.inArray(E(e).val(), t) > -1
							}
						}, m.checkOn || (E.valHooks[this].get = function(e) {
							return null === e.getAttribute("value") ? "on" : e.value
						})
					})), m.focusin = "onfocusin" in r;
					var xt = /^(?:focusinfocus|focusoutblur)$/,
						Mt = function(e) {
							e.stopPropagation()
						};
					E.extend(E.event, {
						trigger: function(e, t, n, o) {
							var i, a, l, s, c, u, f, d, p = [n || b],
								v = h.call(e, "type") ? e.type : e,
								m = h.call(e, "namespace") ? e.namespace.split(".") : [];
							if (a = d = l = n = n || b, 3 !== n.nodeType && 8 !== n.nodeType && !xt.test(v + E.event.triggered) && (v.indexOf(".") > -1 && (m = v.split("."), v = m.shift(), m.sort()), c = v.indexOf(":") < 0 && "on" + v, (e = e[E.expando] ? e : new E.Event(v, "object" == typeof e && e)).isTrigger = o ? 2 : 3, e.namespace = m.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : E.makeArray(t, [e]), f = E.event.special[v] || {}, o || !f.trigger || !1 !== f.trigger.apply(n, t))) {
								if (!o && !f.noBubble && !y(n)) {
									for (s = f.delegateType || v, xt.test(s + v) || (a = a.parentNode); a; a = a.parentNode) p.push(a), l = a;
									l === (n.ownerDocument || b) && p.push(l.defaultView || l.parentWindow || r)
								}
								for (i = 0;
									(a = p[i++]) && !e.isPropagationStopped();) d = a, e.type = i > 1 ? s : f.bindType || v, (u = (X.get(a, "events") || Object.create(null))[e.type] && X.get(a, "handle")) && u.apply(a, t), (u = c && a[c]) && u.apply && Y(a) && (e.result = u.apply(a, t), !1 === e.result && e.preventDefault());
								return e.type = v, o || e.isDefaultPrevented() || f._default && !1 !== f._default.apply(p.pop(), t) || !Y(n) || c && g(n[v]) && !y(n) && ((l = n[c]) && (n[c] = null), E.event.triggered = v, e.isPropagationStopped() && d.addEventListener(v, Mt), n[v](), e.isPropagationStopped() && d.removeEventListener(v, Mt), E.event.triggered = void 0, l && (n[c] = l)), e.result
							}
						},
						simulate: function(e, t, n) {
							var r = E.extend(new E.Event, n, {
								type: e,
								isSimulated: !0
							});
							E.event.trigger(r, null, t)
						}
					}), E.fn.extend({
						trigger: function(e, t) {
							return this.each((function() {
								E.event.trigger(e, t, this)
							}))
						},
						triggerHandler: function(e, t) {
							var n = this[0];
							if (n) return E.event.trigger(e, t, n, !0)
						}
					}), m.focusin || E.each({
						focus: "focusin",
						blur: "focusout"
					}, (function(e, t) {
						var n = function(e) {
							E.event.simulate(t, e.target, E.event.fix(e))
						};
						E.event.special[t] = {
							setup: function() {
								var r = this.ownerDocument || this.document || this,
									o = X.access(r, t);
								o || r.addEventListener(e, n, !0), X.access(r, t, (o || 0) + 1)
							},
							teardown: function() {
								var r = this.ownerDocument || this.document || this,
									o = X.access(r, t) - 1;
								o ? X.access(r, t, o) : (r.removeEventListener(e, n, !0), X.remove(r, t))
							}
						}
					}));
					var zt = r.location,
						Et = {
							guid: Date.now()
						},
						kt = /\?/;
					E.parseXML = function(e) {
						var t, n;
						if (!e || "string" != typeof e) return null;
						try {
							t = (new r.DOMParser).parseFromString(e, "text/xml")
						} catch (e) {}
						return n = t && t.getElementsByTagName("parsererror")[0], t && !n || E.error("Invalid XML: " + (n ? E.map(n.childNodes, (function(e) {
							return e.textContent
						})).join("\n") : e)), t
					};
					var Ct = /\[\]$/,
						St = /\r?\n/g,
						Tt = /^(?:submit|button|image|reset|file)$/i,
						Nt = /^(?:input|select|textarea|keygen)/i;

					function Pt(e, t, n, r) {
						var o;
						if (Array.isArray(t)) E.each(t, (function(t, o) {
							n || Ct.test(e) ? r(e, o) : Pt(e + "[" + ("object" == typeof o && null != o ? t : "") + "]", o, n, r)
						}));
						else if (n || "object" !== M(t)) r(e, t);
						else
							for (o in t) Pt(e + "[" + o + "]", t[o], n, r)
					}
					E.param = function(e, t) {
						var n, r = [],
							o = function(e, t) {
								var n = g(t) ? t() : t;
								r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
							};
						if (null == e) return "";
						if (Array.isArray(e) || e.jquery && !E.isPlainObject(e)) E.each(e, (function() {
							o(this.name, this.value)
						}));
						else
							for (n in e) Pt(n, e[n], t, o);
						return r.join("&")
					}, E.fn.extend({
						serialize: function() {
							return E.param(this.serializeArray())
						},
						serializeArray: function() {
							return this.map((function() {
								var e = E.prop(this, "elements");
								return e ? E.makeArray(e) : this
							})).filter((function() {
								var e = this.type;
								return this.name && !E(this).is(":disabled") && Nt.test(this.nodeName) && !Tt.test(e) && (this.checked || !me.test(e))
							})).map((function(e, t) {
								var n = E(this).val();
								return null == n ? null : Array.isArray(n) ? E.map(n, (function(e) {
									return {
										name: t.name,
										value: e.replace(St, "\r\n")
									}
								})) : {
									name: t.name,
									value: n.replace(St, "\r\n")
								}
							})).get()
						}
					});
					var At = /%20/g,
						_t = /#.*$/,
						Ot = /([?&])_=[^&]*/,
						Lt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
						Dt = /^(?:GET|HEAD)$/,
						Bt = /^\/\//,
						It = {},
						Ht = {},
						Rt = "*/".concat("*"),
						qt = b.createElement("a");

					function jt(e) {
						return function(t, n) {
							"string" != typeof t && (n = t, t = "*");
							var r, o = 0,
								i = t.toLowerCase().match(H) || [];
							if (g(n))
								for (; r = i[o++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
						}
					}

					function Zt(e, t, n, r) {
						var o = {},
							i = e === Ht;

						function a(l) {
							var s;
							return o[l] = !0, E.each(e[l] || [], (function(e, l) {
								var c = l(t, n, r);
								return "string" != typeof c || i || o[c] ? i ? !(s = c) : void 0 : (t.dataTypes.unshift(c), a(c), !1)
							})), s
						}
						return a(t.dataTypes[0]) || !o["*"] && a("*")
					}

					function Ft(e, t) {
						var n, r, o = E.ajaxSettings.flatOptions || {};
						for (n in t) void 0 !== t[n] && ((o[n] ? e : r || (r = {}))[n] = t[n]);
						return r && E.extend(!0, e, r), e
					}
					qt.href = zt.href, E.extend({
						active: 0,
						lastModified: {},
						etag: {},
						ajaxSettings: {
							url: zt.href,
							type: "GET",
							isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(zt.protocol),
							global: !0,
							processData: !0,
							async: !0,
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							accepts: {
								"*": Rt,
								text: "text/plain",
								html: "text/html",
								xml: "application/xml, text/xml",
								json: "application/json, text/javascript"
							},
							contents: {
								xml: /\bxml\b/,
								html: /\bhtml/,
								json: /\bjson\b/
							},
							responseFields: {
								xml: "responseXML",
								text: "responseText",
								json: "responseJSON"
							},
							converters: {
								"* text": String,
								"text html": !0,
								"text json": JSON.parse,
								"text xml": E.parseXML
							},
							flatOptions: {
								url: !0,
								context: !0
							}
						},
						ajaxSetup: function(e, t) {
							return t ? Ft(Ft(e, E.ajaxSettings), t) : Ft(E.ajaxSettings, e)
						},
						ajaxPrefilter: jt(It),
						ajaxTransport: jt(Ht),
						ajax: function(e, t) {
							"object" == typeof e && (t = e, e = void 0), t = t || {};
							var n, o, i, a, l, s, c, u, f, d, h = E.ajaxSetup({}, t),
								p = h.context || h,
								v = h.context && (p.nodeType || p.jquery) ? E(p) : E.event,
								m = E.Deferred(),
								g = E.Callbacks("once memory"),
								y = h.statusCode || {},
								w = {},
								x = {},
								M = "canceled",
								z = {
									readyState: 0,
									getResponseHeader: function(e) {
										var t;
										if (c) {
											if (!a)
												for (a = {}; t = Lt.exec(i);) a[t[1].toLowerCase() + " "] = (a[t[1].toLowerCase() + " "] || []).concat(t[2]);
											t = a[e.toLowerCase() + " "]
										}
										return null == t ? null : t.join(", ")
									},
									getAllResponseHeaders: function() {
										return c ? i : null
									},
									setRequestHeader: function(e, t) {
										return null == c && (e = x[e.toLowerCase()] = x[e.toLowerCase()] || e, w[e] = t), this
									},
									overrideMimeType: function(e) {
										return null == c && (h.mimeType = e), this
									},
									statusCode: function(e) {
										var t;
										if (e)
											if (c) z.always(e[z.status]);
											else
												for (t in e) y[t] = [y[t], e[t]];
										return this
									},
									abort: function(e) {
										var t = e || M;
										return n && n.abort(t), k(0, t), this
									}
								};
							if (m.promise(z), h.url = ((e || h.url || zt.href) + "").replace(Bt, zt.protocol + "//"), h.type = t.method || t.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(H) || [""], null == h.crossDomain) {
								s = b.createElement("a");
								try {
									s.href = h.url, s.href = s.href, h.crossDomain = qt.protocol + "//" + qt.host != s.protocol + "//" + s.host
								} catch (e) {
									h.crossDomain = !0
								}
							}
							if (h.data && h.processData && "string" != typeof h.data && (h.data = E.param(h.data, h.traditional)), Zt(It, h, t, z), c) return z;
							for (f in (u = E.event && h.global) && 0 == E.active++ && E.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Dt.test(h.type), o = h.url.replace(_t, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(At, "+")) : (d = h.url.slice(o.length), h.data && (h.processData || "string" == typeof h.data) && (o += (kt.test(o) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (o = o.replace(Ot, "$1"), d = (kt.test(o) ? "&" : "?") + "_=" + Et.guid++ + d), h.url = o + d), h.ifModified && (E.lastModified[o] && z.setRequestHeader("If-Modified-Since", E.lastModified[o]), E.etag[o] && z.setRequestHeader("If-None-Match", E.etag[o])), (h.data && h.hasContent && !1 !== h.contentType || t.contentType) && z.setRequestHeader("Content-Type", h.contentType), z.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Rt + "; q=0.01" : "") : h.accepts["*"]), h.headers) z.setRequestHeader(f, h.headers[f]);
							if (h.beforeSend && (!1 === h.beforeSend.call(p, z, h) || c)) return z.abort();
							if (M = "abort", g.add(h.complete), z.done(h.success), z.fail(h.error), n = Zt(Ht, h, t, z)) {
								if (z.readyState = 1, u && v.trigger("ajaxSend", [z, h]), c) return z;
								h.async && h.timeout > 0 && (l = r.setTimeout((function() {
									z.abort("timeout")
								}), h.timeout));
								try {
									c = !1, n.send(w, k)
								} catch (e) {
									if (c) throw e;
									k(-1, e)
								}
							} else k(-1, "No Transport");

							function k(e, t, a, s) {
								var f, d, b, w, x, M = t;
								c || (c = !0, l && r.clearTimeout(l), n = void 0, i = s || "", z.readyState = e > 0 ? 4 : 0, f = e >= 200 && e < 300 || 304 === e, a && (w = function(e, t, n) {
									for (var r, o, i, a, l = e.contents, s = e.dataTypes;
										"*" === s[0];) s.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
									if (r)
										for (o in l)
											if (l[o] && l[o].test(r)) {
												s.unshift(o);
												break
											} if (s[0] in n) i = s[0];
									else {
										for (o in n) {
											if (!s[0] || e.converters[o + " " + s[0]]) {
												i = o;
												break
											}
											a || (a = o)
										}
										i = i || a
									}
									if (i) return i !== s[0] && s.unshift(i), n[i]
								}(h, z, a)), !f && E.inArray("script", h.dataTypes) > -1 && E.inArray("json", h.dataTypes) < 0 && (h.converters["text script"] = function() {}), w = function(e, t, n, r) {
									var o, i, a, l, s, c = {},
										u = e.dataTypes.slice();
									if (u[1])
										for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
									for (i = u.shift(); i;)
										if (e.responseFields[i] && (n[e.responseFields[i]] = t), !s && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), s = i, i = u.shift())
											if ("*" === i) i = s;
											else if ("*" !== s && s !== i) {
										if (!(a = c[s + " " + i] || c["* " + i]))
											for (o in c)
												if ((l = o.split(" "))[1] === i && (a = c[s + " " + l[0]] || c["* " + l[0]])) {
													!0 === a ? a = c[o] : !0 !== c[o] && (i = l[0], u.unshift(l[1]));
													break
												} if (!0 !== a)
											if (a && e.throws) t = a(t);
											else try {
												t = a(t)
											} catch (e) {
												return {
													state: "parsererror",
													error: a ? e : "No conversion from " + s + " to " + i
												}
											}
									}
									return {
										state: "success",
										data: t
									}
								}(h, w, z, f), f ? (h.ifModified && ((x = z.getResponseHeader("Last-Modified")) && (E.lastModified[o] = x), (x = z.getResponseHeader("etag")) && (E.etag[o] = x)), 204 === e || "HEAD" === h.type ? M = "nocontent" : 304 === e ? M = "notmodified" : (M = w.state, d = w.data, f = !(b = w.error))) : (b = M, !e && M || (M = "error", e < 0 && (e = 0))), z.status = e, z.statusText = (t || M) + "", f ? m.resolveWith(p, [d, M, z]) : m.rejectWith(p, [z, M, b]), z.statusCode(y), y = void 0, u && v.trigger(f ? "ajaxSuccess" : "ajaxError", [z, h, f ? d : b]), g.fireWith(p, [z, M]), u && (v.trigger("ajaxComplete", [z, h]), --E.active || E.event.trigger("ajaxStop")))
							}
							return z
						},
						getJSON: function(e, t, n) {
							return E.get(e, t, n, "json")
						},
						getScript: function(e, t) {
							return E.get(e, void 0, t, "script")
						}
					}), E.each(["get", "post"], (function(e, t) {
						E[t] = function(e, n, r, o) {
							return g(n) && (o = o || r, r = n, n = void 0), E.ajax(E.extend({
								url: e,
								type: t,
								dataType: o,
								data: n,
								success: r
							}, E.isPlainObject(e) && e))
						}
					})), E.ajaxPrefilter((function(e) {
						var t;
						for (t in e.headers) "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
					})), E._evalUrl = function(e, t, n) {
						return E.ajax({
							url: e,
							type: "GET",
							dataType: "script",
							cache: !0,
							async: !1,
							global: !1,
							converters: {
								"text script": function() {}
							},
							dataFilter: function(e) {
								E.globalEval(e, t, n)
							}
						})
					}, E.fn.extend({
						wrapAll: function(e) {
							var t;
							return this[0] && (g(e) && (e = e.call(this[0])), t = E(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map((function() {
								for (var e = this; e.firstElementChild;) e = e.firstElementChild;
								return e
							})).append(this)), this
						},
						wrapInner: function(e) {
							return g(e) ? this.each((function(t) {
								E(this).wrapInner(e.call(this, t))
							})) : this.each((function() {
								var t = E(this),
									n = t.contents();
								n.length ? n.wrapAll(e) : t.append(e)
							}))
						},
						wrap: function(e) {
							var t = g(e);
							return this.each((function(n) {
								E(this).wrapAll(t ? e.call(this, n) : e)
							}))
						},
						unwrap: function(e) {
							return this.parent(e).not("body").each((function() {
								E(this).replaceWith(this.childNodes)
							})), this
						}
					}), E.expr.pseudos.hidden = function(e) {
						return !E.expr.pseudos.visible(e)
					}, E.expr.pseudos.visible = function(e) {
						return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
					}, E.ajaxSettings.xhr = function() {
						try {
							return new r.XMLHttpRequest
						} catch (e) {}
					};
					var Vt = {
							0: 200,
							1223: 204
						},
						Qt = E.ajaxSettings.xhr();
					m.cors = !!Qt && "withCredentials" in Qt, m.ajax = Qt = !!Qt, E.ajaxTransport((function(e) {
						var t, n;
						if (m.cors || Qt && !e.crossDomain) return {
							send: function(o, i) {
								var a, l = e.xhr();
								if (l.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
									for (a in e.xhrFields) l[a] = e.xhrFields[a];
								for (a in e.mimeType && l.overrideMimeType && l.overrideMimeType(e.mimeType), e.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"), o) l.setRequestHeader(a, o[a]);
								t = function(e) {
									return function() {
										t && (t = n = l.onload = l.onerror = l.onabort = l.ontimeout = l.onreadystatechange = null, "abort" === e ? l.abort() : "error" === e ? "number" != typeof l.status ? i(0, "error") : i(l.status, l.statusText) : i(Vt[l.status] || l.status, l.statusText, "text" !== (l.responseType || "text") || "string" != typeof l.responseText ? {
											binary: l.response
										} : {
											text: l.responseText
										}, l.getAllResponseHeaders()))
									}
								}, l.onload = t(), n = l.onerror = l.ontimeout = t("error"), void 0 !== l.onabort ? l.onabort = n : l.onreadystatechange = function() {
									4 === l.readyState && r.setTimeout((function() {
										t && n()
									}))
								}, t = t("abort");
								try {
									l.send(e.hasContent && e.data || null)
								} catch (e) {
									if (t) throw e
								}
							},
							abort: function() {
								t && t()
							}
						}
					})), E.ajaxPrefilter((function(e) {
						e.crossDomain && (e.contents.script = !1)
					})), E.ajaxSetup({
						accepts: {
							script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
						},
						contents: {
							script: /\b(?:java|ecma)script\b/
						},
						converters: {
							"text script": function(e) {
								return E.globalEval(e), e
							}
						}
					}), E.ajaxPrefilter("script", (function(e) {
						void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
					})), E.ajaxTransport("script", (function(e) {
						var t, n;
						if (e.crossDomain || e.scriptAttrs) return {
							send: function(r, o) {
								t = E("<script>").attr(e.scriptAttrs || {}).prop({
									charset: e.scriptCharset,
									src: e.url
								}).on("load error", n = function(e) {
									t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
								}), b.head.appendChild(t[0])
							},
							abort: function() {
								n && n()
							}
						}
					}));
					var Ut, Kt = [],
						Wt = /(=)\?(?=&|$)|\?\?/;
					E.ajaxSetup({
						jsonp: "callback",
						jsonpCallback: function() {
							var e = Kt.pop() || E.expando + "_" + Et.guid++;
							return this[e] = !0, e
						}
					}), E.ajaxPrefilter("json jsonp", (function(e, t, n) {
						var o, i, a, l = !1 !== e.jsonp && (Wt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Wt.test(e.data) && "data");
						if (l || "jsonp" === e.dataTypes[0]) return o = e.jsonpCallback = g(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, l ? e[l] = e[l].replace(Wt, "$1" + o) : !1 !== e.jsonp && (e.url += (kt.test(e.url) ? "&" : "?") + e.jsonp + "=" + o), e.converters["script json"] = function() {
							return a || E.error(o + " was not called"), a[0]
						}, e.dataTypes[0] = "json", i = r[o], r[o] = function() {
							a = arguments
						}, n.always((function() {
							void 0 === i ? E(r).removeProp(o) : r[o] = i, e[o] && (e.jsonpCallback = t.jsonpCallback, Kt.push(o)), a && g(i) && i(a[0]), a = i = void 0
						})), "script"
					})), m.createHTMLDocument = ((Ut = b.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Ut.childNodes.length), E.parseHTML = function(e, t, n) {
						return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (m.createHTMLDocument ? ((r = (t = b.implementation.createHTMLDocument("")).createElement("base")).href = b.location.href, t.head.appendChild(r)) : t = b), i = !n && [], (o = A.exec(e)) ? [t.createElement(o[1])] : (o = ze([e], t, i), i && i.length && E(i).remove(), E.merge([], o.childNodes)));
						var r, o, i
					}, E.fn.load = function(e, t, n) {
						var r, o, i, a = this,
							l = e.indexOf(" ");
						return l > -1 && (r = gt(e.slice(l)), e = e.slice(0, l)), g(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), a.length > 0 && E.ajax({
							url: e,
							type: o || "GET",
							dataType: "html",
							data: t
						}).done((function(e) {
							i = arguments, a.html(r ? E("<div>").append(E.parseHTML(e)).find(r) : e)
						})).always(n && function(e, t) {
							a.each((function() {
								n.apply(this, i || [e.responseText, t, e])
							}))
						}), this
					}, E.expr.pseudos.animated = function(e) {
						return E.grep(E.timers, (function(t) {
							return e === t.elem
						})).length
					}, E.offset = {
						setOffset: function(e, t, n) {
							var r, o, i, a, l, s, c = E.css(e, "position"),
								u = E(e),
								f = {};
							"static" === c && (e.style.position = "relative"), l = u.offset(), i = E.css(e, "top"), s = E.css(e, "left"), ("absolute" === c || "fixed" === c) && (i + s).indexOf("auto") > -1 ? (a = (r = u.position()).top, o = r.left) : (a = parseFloat(i) || 0, o = parseFloat(s) || 0), g(t) && (t = t.call(e, n, E.extend({}, l))), null != t.top && (f.top = t.top - l.top + a), null != t.left && (f.left = t.left - l.left + o), "using" in t ? t.using.call(e, f) : u.css(f)
						}
					}, E.fn.extend({
						offset: function(e) {
							if (arguments.length) return void 0 === e ? this : this.each((function(t) {
								E.offset.setOffset(this, e, t)
							}));
							var t, n, r = this[0];
							return r ? r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
								top: t.top + n.pageYOffset,
								left: t.left + n.pageXOffset
							}) : {
								top: 0,
								left: 0
							} : void 0
						},
						position: function() {
							if (this[0]) {
								var e, t, n, r = this[0],
									o = {
										top: 0,
										left: 0
									};
								if ("fixed" === E.css(r, "position")) t = r.getBoundingClientRect();
								else {
									for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === E.css(e, "position");) e = e.parentNode;
									e && e !== r && 1 === e.nodeType && ((o = E(e).offset()).top += E.css(e, "borderTopWidth", !0), o.left += E.css(e, "borderLeftWidth", !0))
								}
								return {
									top: t.top - o.top - E.css(r, "marginTop", !0),
									left: t.left - o.left - E.css(r, "marginLeft", !0)
								}
							}
						},
						offsetParent: function() {
							return this.map((function() {
								for (var e = this.offsetParent; e && "static" === E.css(e, "position");) e = e.offsetParent;
								return e || ae
							}))
						}
					}), E.each({
						scrollLeft: "pageXOffset",
						scrollTop: "pageYOffset"
					}, (function(e, t) {
						var n = "pageYOffset" === t;
						E.fn[e] = function(r) {
							return Q(this, (function(e, r, o) {
								var i;
								if (y(e) ? i = e : 9 === e.nodeType && (i = e.defaultView), void 0 === o) return i ? i[t] : e[r];
								i ? i.scrollTo(n ? i.pageXOffset : o, n ? o : i.pageYOffset) : e[r] = o
							}), e, r, arguments.length)
						}
					})), E.each(["top", "left"], (function(e, t) {
						E.cssHooks[t] = Qe(m.pixelPosition, (function(e, n) {
							if (n) return n = Ve(e, t), qe.test(n) ? E(e).position()[t] + "px" : n
						}))
					})), E.each({
						Height: "height",
						Width: "width"
					}, (function(e, t) {
						E.each({
							padding: "inner" + e,
							content: t,
							"": "outer" + e
						}, (function(n, r) {
							E.fn[r] = function(o, i) {
								var a = arguments.length && (n || "boolean" != typeof o),
									l = n || (!0 === o || !0 === i ? "margin" : "border");
								return Q(this, (function(t, n, o) {
									var i;
									return y(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === o ? E.css(t, n, l) : E.style(t, n, o, l)
								}), t, a ? o : void 0, a)
							}
						}))
					})), E.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function(e, t) {
						E.fn[t] = function(e) {
							return this.on(t, e)
						}
					})), E.fn.extend({
						bind: function(e, t, n) {
							return this.on(e, null, t, n)
						},
						unbind: function(e, t) {
							return this.off(e, null, t)
						},
						delegate: function(e, t, n, r) {
							return this.on(t, e, n, r)
						},
						undelegate: function(e, t, n) {
							return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
						},
						hover: function(e, t) {
							return this.mouseenter(e).mouseleave(t || e)
						}
					}), E.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function(e, t) {
						E.fn[t] = function(e, n) {
							return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
						}
					}));
					var $t = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
					E.proxy = function(e, t) {
						var n, r, o;
						if ("string" == typeof t && (n = e[t], t = e, e = n), g(e)) return r = l.call(arguments, 2), o = function() {
							return e.apply(t || this, r.concat(l.call(arguments)))
						}, o.guid = e.guid = e.guid || E.guid++, o
					}, E.holdReady = function(e) {
						e ? E.readyWait++ : E.ready(!0)
					}, E.isArray = Array.isArray, E.parseJSON = JSON.parse, E.nodeName = P, E.isFunction = g, E.isWindow = y, E.camelCase = $, E.type = M, E.now = Date.now, E.isNumeric = function(e) {
						var t = E.type(e);
						return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
					}, E.trim = function(e) {
						return null == e ? "" : (e + "").replace($t, "")
					}, void 0 === (n = function() {
						return E
					}.apply(t, [])) || (e.exports = n);
					var Yt = r.jQuery,
						Gt = r.$;
					return E.noConflict = function(e) {
						return r.$ === E && (r.$ = Gt), e && r.jQuery === E && (r.jQuery = Yt), E
					}, void 0 === o && (r.jQuery = r.$ = E), E
				}))
			},
			7680: function(e, t, n) {
				"use strict";
				n.r(t)
			},
			7418: function(e) {
				"use strict";
				var t = Object.getOwnPropertySymbols,
					n = Object.prototype.hasOwnProperty,
					r = Object.prototype.propertyIsEnumerable;

				function o(e) {
					if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
					return Object(e)
				}
				e.exports = function() {
					try {
						if (!Object.assign) return !1;
						var e = new String("abc");
						if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
						for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
						if ("0123456789" !== Object.getOwnPropertyNames(t).map((function(e) {
								return t[e]
							})).join("")) return !1;
						var r = {};
						return "abcdefghijklmnopqrst".split("").forEach((function(e) {
							r[e] = e
						})), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
					} catch (e) {
						return !1
					}
				}() ? Object.assign : function(e, i) {
					for (var a, l, s = o(e), c = 1; c < arguments.length; c++) {
						for (var u in a = Object(arguments[c])) n.call(a, u) && (s[u] = a[u]);
						if (t) {
							l = t(a);
							for (var f = 0; f < l.length; f++) r.call(a, l[f]) && (s[l[f]] = a[l[f]])
						}
					}
					return s
				}
			},
			3886: function(e, t, n) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.default = function() {
					for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];

					function r() {
						for (var e = arguments.length, n = Array(e), r = 0; r < e; r++) n[r] = arguments[r];
						var o = null;
						return t.forEach((function(e) {
							if (null == o) {
								var t = e.apply(void 0, n);
								null != t && (o = t)
							}
						})), o
					}
					return (0, o.default)(r)
				};
				var r, o = (r = n(2613)) && r.__esModule ? r : {
					default: r
				};
				e.exports = t.default
			},
			5638: function(e, t) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.default = function(e) {
					return function(t, n, r, o, i) {
						var a = r || "<<anonymous>>",
							l = i || n;
						if (null == t[n]) return new Error("The " + o + " `" + l + "` is required to make `" + a + "` accessible for users of assistive technologies such as screen readers.");
						for (var s = arguments.length, c = Array(s > 5 ? s - 5 : 0), u = 5; u < s; u++) c[u - 5] = arguments[u];
						return e.apply(void 0, [t, n, r, o, i].concat(c))
					}
				}, e.exports = t.default
			},
			2613: function(e, t) {
				"use strict";
				Object.defineProperty(t, "__esModule", {
					value: !0
				}), t.default = function(e) {
					function t(t, n, r, o, i, a) {
						var l = o || "<<anonymous>>",
							s = a || r;
						if (null == n[r]) return t ? new Error("Required " + i + " `" + s + "` was not specified in `" + l + "`.") : null;
						for (var c = arguments.length, u = Array(c > 6 ? c - 6 : 0), f = 6; f < c; f++) u[f - 6] = arguments[f];
						return e.apply(void 0, [n, r, l, i, s].concat(u))
					}
					var n = t.bind(null, !1);
					return n.isRequired = t.bind(null, !0), n
				}, e.exports = t.default
			},
			2330: function(e, t) {
				"use strict";
				t.Z = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;"><defs>\n<symbol id="svg-acp-logo-horizontal-4c" viewBox="0 0 316.169 36.867">\n<g>\n\t<g>\n\t\t<path fill="#008066" d="M128.995,10.642h1.48l4.143,9.616h-1.956l-0.897-2.201h-4.169l-0.869,2.201h-1.915L128.995,10.642z     M131.167,16.59l-1.48-3.912l-1.508,3.912H131.167z"/>\n\t\t<path fill="#008066" d="M135.193,13.738h1.548v1.018h0.027c0.286-0.611,0.91-1.181,1.997-1.181c1.005,0,1.698,0.394,2.037,1.209    c0.476-0.829,1.168-1.209,2.146-1.209c1.739,0,2.35,1.236,2.35,2.798v3.884h-1.629v-3.695c0-0.814-0.245-1.521-1.209-1.521    c-1.019,0-1.398,0.842-1.398,1.685v3.531h-1.631v-3.884c0-0.802-0.325-1.332-1.114-1.332c-1.072,0-1.494,0.788-1.494,1.657v3.559    h-1.629V13.738z"/>\n\t\t<path fill="#008066" d="M147.828,17.568c0.108,0.965,0.842,1.549,1.752,1.549c0.815,0,1.345-0.381,1.752-0.883l1.168,0.883    c-0.762,0.936-1.726,1.303-2.758,1.303c-1.969,0-3.544-1.371-3.544-3.422c0-2.051,1.575-3.423,3.544-3.423    c1.819,0,3.056,1.276,3.056,3.545v0.448H147.828z M151.169,16.346c-0.013-0.95-0.638-1.548-1.656-1.548    c-0.964,0-1.562,0.612-1.685,1.548H151.169z"/>\n\t\t<path fill="#008066" d="M153.771,13.738h1.631v1.032h0.026c0.354-0.747,1.073-1.195,1.929-1.195c0.204,0,0.395,0.041,0.584,0.095    v1.576c-0.271-0.068-0.53-0.123-0.788-0.123c-1.535,0-1.751,1.29-1.751,1.644v3.491h-1.631V13.738z"/>\n\t\t<path fill="#008066" d="M159.607,10.546c0.598,0,1.06,0.421,1.06,0.978c0,0.558-0.462,0.978-1.06,0.978s-1.032-0.461-1.032-0.978    C158.575,11.008,159.01,10.546,159.607,10.546z M158.806,13.738h1.63v6.52h-1.63V13.738z"/>\n\t\t<path fill="#008066" d="M166.219,15.694c-0.381-0.394-0.802-0.652-1.236-0.652c-1.195,0-1.915,0.937-1.915,1.956    c0,1.018,0.72,1.955,1.915,1.955c0.504,0,0.965-0.217,1.264-0.611l1.086,1.17c-0.665,0.664-1.779,0.908-2.35,0.908    c-1.969,0-3.545-1.371-3.545-3.422c0-2.051,1.576-3.423,3.545-3.423c0.829,0,1.738,0.298,2.363,0.991L166.219,15.694z"/>\n\t\t<path fill="#008066" d="M172.108,19.361h-0.04c-0.462,0.732-1.223,1.059-2.092,1.059c-1.209,0-2.377-0.664-2.377-1.955    c0-2.119,2.472-2.268,4.102-2.268h0.407V16.02c0-0.801-0.624-1.223-1.493-1.223c-0.679,0-1.304,0.272-1.738,0.679l-0.855-0.855    c0.719-0.733,1.738-1.046,2.771-1.046c2.783,0,2.783,2.01,2.783,2.934v3.749h-1.468V19.361z M172.014,17.337h-0.338    c-0.898,0-2.445,0.068-2.445,1.004c0,0.598,0.61,0.855,1.14,0.855c1.114,0,1.644-0.584,1.644-1.494V17.337z"/>\n\t\t<path fill="#008066" d="M175.049,13.738h1.551v1.046h0.026c0.298-0.652,0.91-1.209,1.995-1.209c1.752,0,2.377,1.236,2.377,2.567    v4.116h-1.629v-3.301c0-0.719-0.054-1.915-1.195-1.915c-1.072,0-1.494,0.788-1.494,1.657v3.559h-1.631V13.738z"/>\n\t\t<path fill="#008066" d="M191.979,12.896c-0.706-0.747-1.357-0.95-2.023-0.95c-1.983,0-3.301,1.521-3.301,3.436    c0,2.051,1.317,3.572,3.301,3.572c0.773,0,1.521-0.354,2.16-1.168l1.412,1.006c-0.869,1.195-2.174,1.711-3.586,1.711    c-2.961,0-5.08-2.01-5.08-5.012c0-3.083,2.119-5.094,5.08-5.094c1.305,0,2.418,0.422,3.368,1.521L191.979,12.896z"/>\n\t\t<path fill="#008066" d="M197.473,13.575c1.969,0,3.543,1.372,3.543,3.423c0,2.051-1.574,3.422-3.543,3.422    c-1.971,0-3.545-1.371-3.545-3.422C193.928,14.947,195.502,13.575,197.473,13.575z M197.473,18.953    c1.194,0,1.915-0.938,1.915-1.955c0-1.02-0.721-1.956-1.915-1.956c-1.196,0-1.916,0.937-1.916,1.956    C195.557,18.016,196.276,18.953,197.473,18.953z"/>\n\t\t<path fill="#008066" d="M202.016,9.99h1.631v10.268h-1.631V9.99z"/>\n\t\t<path fill="#008066" d="M205.271,9.99h1.629v10.268h-1.629V9.99z"/>\n\t\t<path fill="#008066" d="M209.806,17.568c0.107,0.965,0.843,1.549,1.751,1.549c0.816,0,1.347-0.381,1.753-0.883l1.168,0.883    c-0.762,0.936-1.724,1.303-2.757,1.303c-1.97,0-3.546-1.371-3.546-3.422c0-2.051,1.576-3.423,3.546-3.423    c1.82,0,3.057,1.276,3.057,3.545v0.448H209.806z M213.146,16.346c-0.013-0.95-0.639-1.548-1.656-1.548    c-0.966,0-1.562,0.612-1.685,1.548H213.146z"/>\n\t\t<path fill="#008066" d="M222.458,13.738v5.936c0,2.35-1.141,3.842-3.679,3.842c-1.211,0-2.311-0.258-3.233-1.072l0.976-1.33    c0.653,0.598,1.331,0.938,2.242,0.938c1.576,0,2.064-0.896,2.064-2.188v-0.475h-0.027c-0.474,0.639-1.317,0.951-2.133,0.951    c-1.956,0-3.245-1.496-3.245-3.342c0-1.929,1.208-3.423,3.219-3.423c0.909,0,1.766,0.354,2.242,1.141h0.025v-0.978H222.458z     M217.051,16.984c0,1.031,0.817,1.889,1.917,1.889c1.208,0,1.941-0.83,1.941-1.917c0-1.127-0.746-1.915-1.929-1.915    C217.84,15.042,217.051,15.83,217.051,16.984z"/>\n\t\t<path fill="#008066" d="M225.057,17.568c0.111,0.965,0.844,1.549,1.754,1.549c0.815,0,1.345-0.381,1.752-0.883l1.168,0.883    c-0.76,0.936-1.726,1.303-2.757,1.303c-1.97,0-3.545-1.371-3.545-3.422c0-2.051,1.575-3.423,3.545-3.423    c1.82,0,3.056,1.276,3.056,3.545v0.448H225.057z M228.399,16.346c-0.014-0.95-0.638-1.548-1.656-1.548    c-0.965,0-1.562,0.612-1.687,1.548H228.399z"/>\n\t\t<path fill="#008066" d="M237.693,13.575c1.971,0,3.546,1.372,3.546,3.423c0,2.051-1.575,3.422-3.546,3.422    c-1.968,0-3.542-1.371-3.542-3.422C234.151,14.947,235.726,13.575,237.693,13.575z M237.693,18.953    c1.197,0,1.916-0.938,1.916-1.955c0-1.02-0.719-1.956-1.916-1.956c-1.193,0-1.914,0.937-1.914,1.956    C235.779,18.016,236.5,18.953,237.693,18.953z"/>\n\t\t<path fill="#008066" d="M242.522,15.124h-1.343v-1.385h1.343v-0.923c0-1.807,0.408-2.988,2.432-2.988    c0.354,0,0.693,0.027,1.032,0.095l-0.107,1.385c-0.231-0.054-0.449-0.095-0.681-0.095c-0.909,0-1.045,0.625-1.045,1.345v1.181    h1.508v1.385h-1.508v5.134h-1.631V15.124z"/>\n\t\t<path fill="#008066" d="M250.34,10.642h3.231c1.861,0,3.545,0.652,3.545,2.784c0,2.418-1.806,2.853-3.843,2.853h-1.222v3.979    h-1.712V10.642z M253.083,14.812c0.978,0,2.241-0.055,2.241-1.358c0-1.182-1.128-1.345-2.051-1.345h-1.222v2.703H253.083z"/>\n\t\t<path fill="#008066" d="M259.57,14.648h0.025c0.258-0.543,0.911-1.073,1.914-1.073c1.754,0,2.379,1.236,2.379,2.567v4.116h-1.63    v-3.301c0-0.719-0.055-1.915-1.196-1.915c-1.071,0-1.492,0.788-1.492,1.657v3.559h-1.633V9.99h1.633V14.648z"/>\n\t\t<path fill="#008066" d="M264.304,13.738h1.794l1.818,4.523h0.028l1.629-4.523h1.697l-3.083,7.918    c-0.476,1.223-1.045,1.859-2.485,1.859c-0.421,0-0.843-0.053-1.249-0.162l0.203-1.467c0.259,0.096,0.545,0.164,0.83,0.164    c0.802,0,1.018-0.285,1.289-0.965l0.312-0.775L264.304,13.738z"/>\n\t\t<path fill="#008066" d="M275.164,15.544c-0.312-0.435-0.721-0.666-1.276-0.666c-0.437,0-0.952,0.204-0.952,0.693    c0,1.167,3.52,0.217,3.52,2.756c0,1.549-1.481,2.092-2.813,2.092c-1.004,0-1.874-0.258-2.539-1.004l1.087-1.02    c0.421,0.461,0.855,0.801,1.548,0.801c0.476,0,1.087-0.23,1.087-0.746c0-1.345-3.518-0.285-3.518-2.771    c0-1.453,1.304-2.105,2.621-2.105c0.871,0,1.793,0.272,2.323,0.991L275.164,15.544z"/>\n\t\t<path fill="#008066" d="M278.27,10.546c0.597,0,1.059,0.421,1.059,0.978c0,0.558-0.462,0.978-1.059,0.978    s-1.032-0.461-1.032-0.978C277.237,11.008,277.673,10.546,278.27,10.546z M277.468,13.738h1.628v6.52h-1.628V13.738z"/>\n\t\t<path fill="#008066" d="M284.88,15.694c-0.379-0.394-0.801-0.652-1.235-0.652c-1.195,0-1.916,0.937-1.916,1.956    c0,1.018,0.721,1.955,1.916,1.955c0.503,0,0.965-0.217,1.265-0.611l1.085,1.17c-0.664,0.664-1.779,0.908-2.35,0.908    c-1.969,0-3.545-1.371-3.545-3.422c0-2.051,1.576-3.423,3.545-3.423c0.828,0,1.738,0.298,2.362,0.991L284.88,15.694z"/>\n\t\t<path fill="#008066" d="M287.253,10.546c0.598,0,1.061,0.421,1.061,0.978c0,0.558-0.463,0.978-1.061,0.978    c-0.597,0-1.032-0.461-1.032-0.978C286.221,11.008,286.656,10.546,287.253,10.546z M286.451,13.738h1.631v6.52h-1.631V13.738z"/>\n\t\t<path fill="#008066" d="M293.484,19.361h-0.042c-0.461,0.732-1.223,1.059-2.091,1.059c-1.209,0-2.378-0.664-2.378-1.955    c0-2.119,2.474-2.268,4.103-2.268h0.408V16.02c0-0.801-0.625-1.223-1.495-1.223c-0.68,0-1.303,0.272-1.739,0.679l-0.854-0.855    c0.72-0.733,1.739-1.046,2.771-1.046c2.782,0,2.782,2.01,2.782,2.934v3.749h-1.465V19.361z M293.389,17.337h-0.34    c-0.896,0-2.443,0.068-2.443,1.004c0,0.598,0.611,0.855,1.141,0.855c1.113,0,1.643-0.584,1.643-1.494V17.337z"/>\n\t\t<path fill="#008066" d="M296.427,13.738h1.547v1.046h0.027c0.3-0.652,0.911-1.209,1.998-1.209c1.751,0,2.374,1.236,2.374,2.567    v4.116h-1.628v-3.301c0-0.719-0.055-1.915-1.197-1.915c-1.072,0-1.493,0.788-1.493,1.657v3.559h-1.628V13.738z"/>\n\t\t<path fill="#008066" d="M307.15,15.544c-0.313-0.435-0.72-0.666-1.276-0.666c-0.436,0-0.951,0.204-0.951,0.693    c0,1.167,3.517,0.217,3.517,2.756c0,1.549-1.479,2.092-2.811,2.092c-1.006,0-1.874-0.258-2.54-1.004l1.087-1.02    c0.421,0.461,0.856,0.801,1.549,0.801c0.475,0,1.087-0.23,1.087-0.746c0-1.345-3.519-0.285-3.519-2.771    c0-1.453,1.304-2.105,2.622-2.105c0.868,0,1.792,0.272,2.321,0.991L307.15,15.544z"/>\n\t</g>\n\t<g>\n\t\t<path fill="#008066" d="M125.167,26.779h0.954v6.139h3.228v0.893h-4.182V26.779z"/>\n\t\t<path fill="#008066" d="M130.687,31.787c0,0.822,0.765,1.369,1.589,1.369c0.546,0,0.943-0.279,1.291-0.705l0.676,0.516    c-0.497,0.645-1.182,0.963-2.086,0.963c-1.49,0-2.424-1.072-2.424-2.471c0-1.412,1.023-2.475,2.434-2.475    c1.659,0,2.294,1.271,2.294,2.482v0.32H130.687z M133.507,31.068c-0.02-0.783-0.457-1.369-1.361-1.369    c-0.883,0-1.46,0.744-1.46,1.369H133.507z"/>\n\t\t<path fill="#008066" d="M135.472,29.68c0.497-0.467,1.211-0.695,1.868-0.695c1.39,0,1.966,0.756,1.966,1.568v2.404    c0,0.33,0.01,0.605,0.04,0.854h-0.794c-0.021-0.238-0.03-0.475-0.03-0.715h-0.02c-0.397,0.605-0.933,0.834-1.649,0.834    c-0.874,0-1.628-0.496-1.628-1.41c0-1.211,1.162-1.629,2.592-1.629h0.656v-0.197c0-0.488-0.357-0.994-1.123-0.994    c-0.686,0-1.013,0.289-1.341,0.537L135.472,29.68z M137.994,31.549c-0.844,0-1.877,0.148-1.877,0.902    c0,0.535,0.398,0.764,1.013,0.764c0.993,0,1.341-0.734,1.341-1.369v-0.297H137.994z"/>\n\t\t<path fill="#008066" d="M145.241,33.811h-0.894v-0.674h-0.021c-0.347,0.508-1.003,0.793-1.639,0.793    c-1.46,0-2.394-1.082-2.394-2.471c0-1.412,0.943-2.475,2.394-2.475c0.676,0,1.321,0.309,1.639,0.795h0.021v-3.477h0.894V33.811z     M144.348,31.459c0-0.955-0.596-1.641-1.55-1.641s-1.55,0.686-1.55,1.641c0,0.953,0.596,1.637,1.55,1.637    S144.348,32.412,144.348,31.459z"/>\n\t\t<path fill="#008066" d="M147.025,26.76c0.358,0,0.656,0.297,0.656,0.654s-0.298,0.656-0.656,0.656    c-0.357,0-0.655-0.299-0.655-0.656S146.668,26.76,147.025,26.76z M146.579,29.104h0.894v4.707h-0.894V29.104z"/>\n\t\t<path fill="#008066" d="M148.812,29.104h0.894v0.727h0.02c0.229-0.498,0.825-0.846,1.55-0.846c0.914,0,1.708,0.545,1.708,1.799    v3.027h-0.894v-2.781c0-0.883-0.507-1.211-1.072-1.211c-0.746,0-1.312,0.477-1.312,1.57v2.422h-0.894V29.104z"/>\n\t\t<path fill="#008066" d="M158.771,33.771c0,1.422-1.033,2.424-2.573,2.424c-0.894,0-1.639-0.229-2.304-0.844l0.605-0.754    c0.467,0.496,0.993,0.764,1.678,0.764c1.332,0,1.699-0.836,1.699-1.627v-0.697h-0.029c-0.337,0.566-0.983,0.834-1.629,0.834    c-1.38,0-2.404-1.043-2.394-2.412c0-1.393,0.934-2.475,2.394-2.475c0.635,0,1.292,0.289,1.639,0.795h0.02v-0.676h0.895V33.771z     M154.778,31.459c0,0.953,0.596,1.578,1.55,1.578c0.954,0,1.549-0.625,1.549-1.578c0-0.955-0.595-1.641-1.549-1.641    C155.374,29.818,154.778,30.504,154.778,31.459z"/>\n\t\t<path fill="#008066" d="M162.75,26.779h0.953v7.031h-0.953V26.779z"/>\n\t\t<path fill="#008066" d="M165.201,29.104h0.894v0.727h0.021c0.229-0.498,0.824-0.846,1.549-0.846c0.914,0,1.709,0.545,1.709,1.799    v3.027h-0.895v-2.781c0-0.883-0.506-1.211-1.072-1.211c-0.745,0-1.312,0.477-1.312,1.57v2.422h-0.894V29.104z"/>\n\t\t<path fill="#008066" d="M172.966,29.879h-1.28v2.135c0,0.527,0,1.082,0.675,1.082c0.208,0,0.456-0.029,0.636-0.139v0.814    c-0.209,0.121-0.626,0.158-0.805,0.158c-1.381,0-1.401-0.842-1.401-1.598v-2.453h-1.032v-0.775h1.032v-1.32h0.896v1.32h1.28    V29.879z"/>\n\t\t<path fill="#008066" d="M174.712,31.787c0,0.822,0.765,1.369,1.589,1.369c0.547,0,0.944-0.279,1.291-0.705l0.676,0.516    c-0.496,0.645-1.182,0.963-2.085,0.963c-1.491,0-2.424-1.072-2.424-2.471c0-1.412,1.022-2.475,2.434-2.475    c1.657,0,2.294,1.271,2.294,2.482v0.32H174.712z M177.533,31.068c-0.02-0.783-0.457-1.369-1.361-1.369    c-0.883,0-1.46,0.744-1.46,1.369H177.533z"/>\n\t\t<path fill="#008066" d="M179.278,29.104h0.893v0.727h0.021c0.229-0.498,0.824-0.846,1.411-0.846c0.14,0,0.278,0.021,0.397,0.061    l-0.04,0.963c-0.149-0.041-0.298-0.07-0.437-0.07c-0.875,0-1.353,0.477-1.353,1.51v2.363h-0.893V29.104z"/>\n\t\t<path fill="#008066" d="M182.852,29.104h0.895v0.727h0.02c0.229-0.498,0.824-0.846,1.549-0.846c0.914,0,1.709,0.545,1.709,1.799    v3.027h-0.895v-2.781c0-0.883-0.506-1.211-1.072-1.211c-0.745,0-1.311,0.477-1.311,1.57v2.422h-0.895V29.104z"/>\n\t\t<path fill="#008066" d="M188.113,29.68c0.497-0.467,1.212-0.695,1.867-0.695c1.391,0,1.967,0.756,1.967,1.568v2.404    c0,0.33,0.01,0.605,0.04,0.854h-0.794c-0.021-0.238-0.03-0.475-0.03-0.715h-0.021c-0.396,0.605-0.934,0.834-1.649,0.834    c-0.873,0-1.628-0.496-1.628-1.41c0-1.211,1.162-1.629,2.592-1.629h0.656v-0.197c0-0.488-0.357-0.994-1.123-0.994    c-0.685,0-1.013,0.289-1.34,0.537L188.113,29.68z M190.637,31.549c-0.846,0-1.878,0.148-1.878,0.902    c0,0.535,0.397,0.764,1.013,0.764c0.994,0,1.342-0.734,1.342-1.369v-0.297H190.637z"/>\n\t\t<path fill="#008066" d="M193.234,26.303h0.895v7.508h-0.895V26.303z"/>\n\t\t<path fill="#008066" d="M197.91,26.779h1.42l2.236,5.324h0.038l2.216-5.324h1.42v7.031h-0.953v-5.779h-0.019l-2.376,5.779h-0.634    l-2.376-5.779h-0.019v5.779h-0.954V26.779z"/>\n\t\t<path fill="#008066" d="M207.144,31.787c0,0.822,0.764,1.369,1.587,1.369c0.548,0,0.944-0.279,1.292-0.705l0.677,0.516    c-0.497,0.645-1.183,0.963-2.086,0.963c-1.491,0-2.426-1.072-2.426-2.471c0-1.412,1.024-2.475,2.436-2.475    c1.658,0,2.294,1.271,2.294,2.482v0.32H207.144z M209.964,31.068c-0.019-0.783-0.457-1.369-1.36-1.369    c-0.885,0-1.46,0.744-1.46,1.369H209.964z"/>\n\t\t<path fill="#008066" d="M216.426,33.811h-0.894v-0.674h-0.02c-0.347,0.508-1.005,0.793-1.638,0.793    c-1.46,0-2.395-1.082-2.395-2.471c0-1.412,0.944-2.475,2.395-2.475c0.674,0,1.319,0.309,1.638,0.795h0.02v-3.477h0.894V33.811z     M215.532,31.459c0-0.955-0.596-1.641-1.549-1.641c-0.954,0-1.551,0.686-1.551,1.641c0,0.953,0.597,1.637,1.551,1.637    C214.937,33.096,215.532,32.412,215.532,31.459z"/>\n\t\t<path fill="#008066" d="M218.21,26.76c0.357,0,0.656,0.297,0.656,0.654s-0.299,0.656-0.656,0.656s-0.654-0.299-0.654-0.656    S217.853,26.76,218.21,26.76z M217.764,29.104h0.894v4.707h-0.894V29.104z"/>\n\t\t<path fill="#008066" d="M223.364,30.354c-0.327-0.346-0.677-0.523-1.172-0.523c-0.975,0-1.471,0.783-1.471,1.668    c0,0.883,0.597,1.598,1.52,1.598c0.498,0,0.844-0.178,1.143-0.525l0.636,0.635c-0.467,0.516-1.103,0.725-1.788,0.725    c-1.448,0-2.464-1.002-2.464-2.453c0-1.449,0.994-2.482,2.464-2.482c0.686,0,1.341,0.238,1.809,0.746L223.364,30.354z"/>\n\t\t<path fill="#008066" d="M225.219,26.76c0.357,0,0.655,0.297,0.655,0.654s-0.298,0.656-0.655,0.656    c-0.356,0-0.656-0.299-0.656-0.656S224.862,26.76,225.219,26.76z M224.772,29.104h0.894v4.707h-0.894V29.104z"/>\n\t\t<path fill="#008066" d="M227.003,29.104h0.895v0.727h0.021c0.229-0.498,0.824-0.846,1.551-0.846c0.914,0,1.707,0.545,1.707,1.799    v3.027h-0.894v-2.781c0-0.883-0.506-1.211-1.073-1.211c-0.743,0-1.312,0.477-1.312,1.57v2.422h-0.895V29.104z"/>\n\t\t<path fill="#008066" d="M233.119,31.787c0,0.822,0.767,1.369,1.591,1.369c0.545,0,0.942-0.279,1.291-0.705l0.675,0.516    c-0.495,0.645-1.182,0.963-2.085,0.963c-1.489,0-2.424-1.072-2.424-2.471c0-1.412,1.023-2.475,2.434-2.475    c1.657,0,2.295,1.271,2.295,2.482v0.32H233.119z M235.941,31.068c-0.021-0.783-0.457-1.369-1.36-1.369    c-0.885,0-1.462,0.744-1.462,1.369H235.941z"/>\n\t\t<path fill="#008066" d="M237.904,35.123h-0.814l0.685-2.443h0.964L237.904,35.123z"/>\n\t\t<path fill="#008066" d="M241.289,26.779h0.954v7.031h-0.954V26.779z"/>\n\t\t<path fill="#008066" d="M243.742,29.104h0.834v0.734h0.02c0.09-0.277,0.667-0.854,1.51-0.854c0.695,0,1.172,0.297,1.472,0.873    c0.307-0.576,0.922-0.873,1.489-0.873c1.45,0,1.786,1.033,1.786,2.084v2.742h-0.894v-2.619c0-0.715-0.148-1.373-1.013-1.373    c-0.863,0-1.202,0.586-1.202,1.422v2.57h-0.895V31.35c0-0.895-0.127-1.531-0.99-1.531c-0.646,0-1.224,0.486-1.224,1.551v2.441    h-0.894V29.104z"/>\n\t\t<path fill="#008066" d="M252.12,29.104h0.894v0.676h0.021c0.346-0.506,1.003-0.795,1.638-0.795c1.461,0,2.395,1.082,2.395,2.475    c0,1.408-0.944,2.471-2.395,2.471c-0.674,0-1.32-0.307-1.638-0.793h-0.021v3.477h-0.894V29.104z M253.014,31.459    c0,0.953,0.596,1.637,1.549,1.637c0.954,0,1.551-0.684,1.551-1.637c0-0.955-0.597-1.641-1.551-1.641    C253.609,29.818,253.014,30.504,253.014,31.459z"/>\n\t\t<path fill="#008066" d="M258.104,29.104h0.895v0.727h0.021c0.228-0.498,0.824-0.846,1.41-0.846c0.14,0,0.279,0.021,0.397,0.061    l-0.04,0.963c-0.149-0.041-0.298-0.07-0.437-0.07c-0.874,0-1.352,0.477-1.352,1.51v2.363h-0.895V29.104z"/>\n\t\t<path fill="#008066" d="M263.596,28.984c1.4,0,2.504,1.102,2.504,2.475c0,1.369-1.104,2.471-2.504,2.471    c-1.399,0-2.503-1.102-2.503-2.471C261.093,30.086,262.196,28.984,263.596,28.984z M263.596,33.096c0.953,0,1.55-0.684,1.55-1.637    c0-0.955-0.597-1.641-1.55-1.641c-0.952,0-1.549,0.686-1.549,1.641C262.047,32.412,262.644,33.096,263.596,33.096z"/>\n\t\t<path fill="#008066" d="M266.374,29.104h1.033l1.411,3.605l1.35-3.605h0.954l-1.848,4.707h-0.984L266.374,29.104z"/>\n\t\t<path fill="#008066" d="M272.34,26.76c0.357,0,0.656,0.297,0.656,0.654s-0.299,0.656-0.656,0.656s-0.655-0.299-0.655-0.656    S271.982,26.76,272.34,26.76z M271.894,29.104h0.894v4.707h-0.894V29.104z"/>\n\t\t<path fill="#008066" d="M274.127,29.104h0.893v0.727h0.021c0.228-0.498,0.824-0.846,1.55-0.846c0.914,0,1.708,0.545,1.708,1.799    v3.027h-0.894v-2.781c0-0.883-0.508-1.211-1.072-1.211c-0.745,0-1.312,0.477-1.312,1.57v2.422h-0.893V29.104z"/>\n\t\t<path fill="#008066" d="M284.088,33.771c0,1.422-1.034,2.424-2.574,2.424c-0.894,0-1.64-0.229-2.305-0.844l0.605-0.754    c0.467,0.496,0.994,0.764,1.68,0.764c1.33,0,1.699-0.836,1.699-1.627v-0.697h-0.03c-0.339,0.566-0.985,0.834-1.631,0.834    c-1.379,0-2.403-1.043-2.392-2.412c0-1.393,0.933-2.475,2.392-2.475c0.638,0,1.292,0.289,1.641,0.795h0.021v-0.676h0.895V33.771z     M280.095,31.459c0,0.953,0.595,1.578,1.548,1.578c0.954,0,1.551-0.625,1.551-1.578c0-0.955-0.597-1.641-1.551-1.641    C280.689,29.818,280.095,30.504,280.095,31.459z"/>\n\t\t<path fill="#008066" d="M287.668,26.779h0.953v6.139h3.227v0.893h-4.18V26.779z"/>\n\t\t<path fill="#008066" d="M293.026,26.76c0.358,0,0.657,0.297,0.657,0.654s-0.299,0.656-0.657,0.656    c-0.357,0-0.654-0.299-0.654-0.656S292.669,26.76,293.026,26.76z M292.581,29.104h0.893v4.707h-0.893V29.104z"/>\n\t\t<path fill="#008066" d="M294.247,29.104h1.033l1.411,3.605l1.349-3.605h0.955l-1.848,4.707h-0.983L294.247,29.104z"/>\n\t\t<path fill="#008066" d="M300.373,31.787c0,0.822,0.764,1.369,1.589,1.369c0.545,0,0.942-0.279,1.291-0.705l0.675,0.516    c-0.496,0.645-1.183,0.963-2.085,0.963c-1.49,0-2.424-1.072-2.424-2.471c0-1.412,1.023-2.475,2.433-2.475    c1.66,0,2.295,1.271,2.295,2.482v0.32H300.373z M303.192,31.068c-0.019-0.783-0.455-1.369-1.36-1.369    c-0.883,0-1.459,0.744-1.459,1.369H303.192z"/>\n\t\t<path fill="#008066" d="M307.642,30.285c-0.209-0.258-0.519-0.467-0.965-0.467c-0.417,0-0.784,0.189-0.784,0.527    c0,0.564,0.805,0.646,1.201,0.736c0.774,0.186,1.371,0.484,1.371,1.369c0,1.062-0.974,1.479-1.908,1.479    c-0.773,0-1.35-0.195-1.815-0.834l0.674-0.555c0.288,0.287,0.626,0.555,1.142,0.555c0.458,0,0.954-0.188,0.954-0.596    c0-0.535-0.745-0.635-1.132-0.725c-0.765-0.188-1.44-0.438-1.44-1.34c0-0.984,0.903-1.451,1.789-1.451    c0.625,0,1.271,0.219,1.608,0.775L307.642,30.285z"/>\n\t</g>\n\t<g>\n\t\t<g>\n\t\t\t<path fill="#008066" d="M49.276,0.842h5.097l14.265,33.111h-6.734l-3.088-7.576H44.46l-2.994,7.576h-6.595L49.276,0.842z      M56.759,21.326L51.662,7.857l-5.191,13.469H56.759z"/>\n\t\t\t<path fill="#008066" d="M92.001,8.606c-2.434-2.572-4.678-3.274-6.969-3.274c-6.828,0-11.364,5.238-11.364,11.832     c0,7.063,4.536,12.299,11.364,12.299c2.665,0,5.238-1.215,7.437-4.02l4.864,3.461c-2.993,4.115-7.485,5.893-12.348,5.893     c-10.197,0-17.491-6.922-17.491-17.259C67.494,6.922,74.788,0,84.985,0c4.491,0,8.326,1.45,11.6,5.238L92.001,8.606z"/>\n\t\t\t<path fill="#008066" d="M100.198,0.842h11.13c6.407,0,12.208,2.245,12.208,9.586c0,8.325-6.219,9.821-13.237,9.821h-4.208v13.703     h-5.892V0.842z M109.646,15.199c3.367,0,7.716-0.186,7.716-4.675c0-4.069-3.881-4.632-7.063-4.632h-4.208v9.308H109.646z"/>\n\t\t</g>\n\t\t<g>\n\t\t\t<path fill="#008066" d="M19.203,22.014c-1.593,0.582-4.499,1.436-8.442,2.697c-2.14,0.684-2.461,0.799-3.424,1.18     c-0.737,0.344-0.896,0.479-1.431,1.041c-0.996,1.062-0.991,3.818,0.35,4.996c0.6,0.529,2.121,1.16,3.325,1.297h20.54     c1.8,0,3.267-1.465,3.267-3.266V18.15c-0.299,0.375-0.618,0.74-0.966,1.088C28.825,22.834,23.583,23.768,19.203,22.014z"/>\n\t\t\t<path fill="#008066" d="M15.37,2.188c0.217-0.215,0.443-0.42,0.67-0.618H4.998c-1.804,0-3.27,1.464-3.27,3.267v7.448     c0.37-0.154,0.723-0.267,1.004-0.331c-0.194-0.24-0.314-0.538-0.314-0.869c0-0.773,0.634-1.399,1.418-1.399     c0.783,0,1.417,0.626,1.417,1.399c0,0.331-0.12,0.629-0.315,0.869c0.907,0.207,2.548,0.917,3.179,1.896     c0.892,1.386,1.719,0.273,2.192,1.19c0.163,0.323,0.284,0.457,0.586,1.094c0.152,0.323-0.129,0.708-0.435,0.708     c-0.305,0-6.619,0-6.619,0h-0.01c0,0-0.936,0-2.103,0V18.1c4.476,0.004,8.94,0.008,12.362-0.027     C10.566,13.344,11.004,6.555,15.37,2.188z"/>\n\t\t\t<path fill="#54B848" d="M30.119,1.57H16.04c-0.227,0.198-0.453,0.402-0.67,0.618c-4.366,4.367-4.804,11.156-1.28,15.885     c3.387-0.035,5.756-0.105,6.11-0.247c0.74-0.292,1.372-0.705,1.878-1.363c-2.259-0.794-3.883-2.942-3.883-5.473     c0-3.209,2.6-5.809,5.808-5.809c3.208,0,5.808,2.6,5.808,5.809c0,2.991-2.264,5.455-5.174,5.771     c-0.474,0.957-1.117,1.851-1.869,2.806c-0.842,0.895-1.698,1.748-3.396,2.387c-0.053,0.02-0.111,0.039-0.167,0.061     c4.38,1.754,9.622,0.82,13.217-2.775c0.348-0.348,0.667-0.713,0.966-1.088V4.837C33.386,3.034,31.919,1.57,30.119,1.57z"/>\n\t\t\t<path fill="#A0CF67" d="M29.81,10.99c0-3.209-2.599-5.809-5.808-5.809c-3.208,0-5.808,2.6-5.808,5.809     c0,2.531,1.624,4.678,3.883,5.473c0.173-0.225,0.332-0.476,0.476-0.762c0.171-0.34,0.135-0.236,0.307-0.589     c-1.809-0.501-3.139-2.155-3.139-4.122c0-2.366,1.918-4.284,4.281-4.284c2.365,0,4.283,1.918,4.283,4.284     c0,2.052-1.446,3.766-3.377,4.182c0.121-0.026,0.243-0.057,0.362-0.093h0.015c0,0-0.049,0.182-0.221,0.667     c-0.122,0.349-0.265,0.685-0.428,1.015C27.545,16.445,29.81,13.981,29.81,10.99z"/>\n\t\t\t<g>\n\t\t\t\t<path fill="#FFC325" d="M30.119,0.842H4.998C2.794,0.842,1,2.633,1,4.837v25.122c0,2.203,1.794,3.994,3.998,3.994h25.122      c2.203,0,3.995-1.791,3.995-3.994V4.837C34.114,2.633,32.322,0.842,30.119,0.842z M33.386,18.15v11.809      c0,1.801-1.467,3.266-3.267,3.266H9.58c-1.204-0.137-2.725-0.768-3.325-1.297c-1.34-1.178-1.346-3.934-0.35-4.996      c0.536-0.562,0.694-0.697,1.431-1.041c0.963-0.381,1.285-0.496,3.424-1.18c3.943-1.262,6.85-2.115,8.442-2.697      c0.057-0.021,0.115-0.041,0.167-0.061c1.698-0.639,2.554-1.492,3.396-2.387c0.752-0.955,1.396-1.849,1.869-2.806      c0.164-0.33,0.307-0.666,0.428-1.015c0.172-0.485,0.221-0.667,0.221-0.667H25.27c-0.119,0.036-0.241,0.067-0.362,0.093      c-0.04,0.009-0.079,0.015-0.116,0.022c-0.094,0.016-0.186,0.03-0.279,0.043c-0.04,0.003-0.077,0.01-0.118,0.012      c-0.129,0.012-0.26,0.021-0.393,0.021c-0.124,0-0.247-0.008-0.369-0.018c-0.051-0.005-0.104-0.011-0.156-0.017      c-0.057-0.008-0.114-0.018-0.171-0.027c-0.151-0.025-0.302-0.056-0.447-0.097c-0.171,0.353-0.135,0.249-0.307,0.589      c-0.144,0.286-0.302,0.538-0.476,0.762c-0.506,0.658-1.138,1.071-1.878,1.363c-0.354,0.141-2.723,0.211-6.11,0.247      c-3.422,0.035-7.886,0.031-12.362,0.027v-1.257c1.167,0,2.103,0,2.103,0h0.01c0,0,6.314,0,6.619,0      c0.306,0,0.587-0.385,0.435-0.708c-0.303-0.637-0.423-0.771-0.586-1.094c-0.473-0.917-1.3,0.195-2.192-1.19      c-0.631-0.979-2.272-1.69-3.179-1.896c0.195-0.24,0.315-0.538,0.315-0.869c0-0.773-0.634-1.399-1.417-1.399      c-0.784,0-1.418,0.626-1.418,1.399c0,0.331,0.121,0.629,0.314,0.869c-0.281,0.063-0.634,0.176-1.004,0.331V4.837      c0-1.803,1.466-3.267,3.27-3.267H16.04h14.079c1.8,0,3.267,1.464,3.267,3.267V18.15z"/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon fill="#EE2A24" points="23.991,7.905 23.993,7.908 23.997,7.905     "/>\n\t\t\t\t<polygon fill="#EE2A24" points="23.991,14.043 23.993,14.046 23.997,14.043     "/>\n\t\t\t\t<g>\n\t\t\t\t\t<polygon fill="#E4E76D" points="24.005,10.161 24.007,10.163 24.009,10.161      "/>\n\t\t\t\t\t<polygon fill="#E4E76D" points="23.991,14.043 23.993,14.046 23.997,14.043      "/>\n\t\t\t\t\t<path fill="#E4E76D" d="M24.002,6.706c-2.363,0-4.281,1.918-4.281,4.284c0,1.966,1.331,3.621,3.139,4.122       c0.145,0.041,0.295,0.071,0.447,0.097c0.057,0.009,0.114,0.019,0.171,0.027c0.051,0.005,0.105,0.012,0.156,0.017       c0.122,0.01,0.245,0.018,0.369,0.018c0.132,0,0.263-0.008,0.393-0.021c0.042-0.002,0.079-0.009,0.118-0.012       c0.093-0.013,0.185-0.027,0.279-0.043c0.038-0.008,0.077-0.014,0.116-0.022c1.931-0.416,3.377-2.13,3.377-4.182       C28.285,8.624,26.367,6.706,24.002,6.706z M25.839,12.23c-0.065,0.763-0.79,1.819-1.719,1.819c-0.041,0-0.069,0-0.089,0       c-0.015,0-0.028,0-0.034,0l-0.004-0.003l-0.002,0.003c-0.008,0-0.021,0-0.036,0c-0.021,0-0.048,0-0.09,0       c-0.928,0-1.653-1.056-1.718-1.819c-0.06-0.689,0.064-1.353,0.516-2.265c0.543-1.103,1.328-2.055,1.328-2.055l0.002-0.002       l0.004,0.002c0,0,0.784,0.952,1.327,2.055C25.774,10.877,25.899,11.541,25.839,12.23z"/>\n\t\t\t\t</g>\n\t\t\t\t<polygon fill="#FFC425" points="24.005,13.716 24.007,13.716 24.009,13.716     "/>\n\t\t\t\t<polygon fill="#FFC425" points="24.005,10.161 24.007,10.163 24.009,10.161     "/>\n\t\t\t</g>\n\t\t\t<g>\n\t\t\t\t<polygon fill="#EE2A24" points="23.991,7.905 23.993,7.908 23.997,7.905     "/>\n\t\t\t\t<polygon fill="#EE2A24" points="23.991,14.043 23.993,14.046 23.997,14.043     "/>\n\t\t\t\t<path fill="#EE2A24" d="M25.324,9.965c-0.543-1.103-1.327-2.055-1.327-2.055l-0.004-0.002L23.991,7.91      c0,0-0.785,0.952-1.328,2.055c-0.451,0.912-0.575,1.576-0.516,2.265c0.064,0.763,0.79,1.819,1.718,1.819c0.042,0,0.069,0,0.09,0      c0.015,0,0.028,0,0.036,0l0.002-0.003l-0.002-0.003h0.006l-0.004,0.003l0.004,0.003c0.006,0,0.019,0,0.034,0      c0.021,0,0.049,0,0.089,0c0.929,0,1.654-1.056,1.719-1.819C25.899,11.541,25.774,10.877,25.324,9.965z M25.076,12.664      c-0.038,0.441-0.458,1.052-0.995,1.052c-0.024,0-0.041,0-0.052,0c-0.009,0-0.017,0-0.02,0h-0.002h-0.002      c-0.003,0-0.01,0-0.021,0c-0.01,0-0.026,0-0.05,0c-0.539,0-0.958-0.611-0.995-1.052c-0.036-0.398,0.036-0.784,0.298-1.311      c0.313-0.637,0.769-1.189,0.769-1.189l0.002-0.001l-0.002-0.001h0.004l-0.002,0.001l0.002,0.001c0,0,0.454,0.552,0.769,1.189      C25.039,11.88,25.11,12.266,25.076,12.664z"/>\n\t\t\t\t<polygon fill="#FFC425" points="24.005,13.716 24.007,13.716 24.009,13.716     "/>\n\t\t\t\t<polygon fill="#FFC425" points="24.005,10.161 24.007,10.163 24.009,10.161     "/>\n\t\t\t\t<path fill="#FFC425" d="M24.009,10.164l-0.002-0.001l-0.002,0.001c0,0-0.455,0.552-0.769,1.189      c-0.262,0.527-0.334,0.913-0.298,1.311c0.036,0.441,0.456,1.052,0.995,1.052c0.024,0,0.041,0,0.05,0c0.011,0,0.018,0,0.021,0      h0.002h-0.002h0.004h-0.002h0.002c0.003,0,0.011,0,0.02,0c0.012,0,0.028,0,0.052,0c0.537,0,0.957-0.611,0.995-1.052      c0.034-0.398-0.038-0.784-0.298-1.311C24.463,10.716,24.009,10.164,24.009,10.164z"/>\n\t\t\t</g>\n\t\t</g>\n\t</g>\n\t<g>\n\t\t<path fill="#008066" d="M313.152,9.496c1.661,0,3.017,1.354,3.017,3.017c0,1.662-1.355,3.016-3.017,3.016    c-1.663,0-3.018-1.354-3.018-3.016C310.135,10.851,311.489,9.496,313.152,9.496z M313.152,14.994c1.37,0,2.48-1.111,2.48-2.481    c0-1.371-1.11-2.482-2.48-2.482c-1.371,0-2.48,1.111-2.48,2.482C310.672,13.883,311.781,14.994,313.152,14.994z M311.991,10.77    h1.33c0.828,0,1.217,0.373,1.217,1.038c0,0.599-0.355,0.892-0.827,0.948l0.901,1.459h-0.666l-0.859-1.411h-0.462v1.411h-0.634    V10.77z M312.625,12.269h0.462c0.39,0,0.819-0.024,0.819-0.486c0-0.462-0.43-0.487-0.819-0.479h-0.462V12.269z"/>\n\t</g>\n</g>\n</symbol>\n<symbol id="svg-arrow-back" viewBox="0 0 32 32">\n<title>arrow-back</title>\n<path d="M26.688 14.688v2.625h-16.25l7.438 7.5-1.875 1.875-10.688-10.688 10.688-10.688 1.875 1.875-7.438 7.5h16.25z"/>\n</symbol>\n<symbol id="svg-arrow-downward" viewBox="0 0 32 32">\n<title>arrow-downward</title>\n<path d="M26.688 16l-10.688 10.688-10.688-10.688 1.938-1.875 7.438 7.438v-16.25h2.625v16.25l7.5-7.438z"/>\n</symbol>\n<symbol id="svg-arrow-forward" viewBox="0 0 32 32">\n<title>arrow-forward</title>\n<path d="M16 5.313l10.688 10.688-10.688 10.688-1.875-1.875 7.438-7.5h-16.25v-2.625h16.25l-7.438-7.5z"/>\n</symbol>\n<symbol id="svg-arrow-left-circle-alt" viewBox="0 0 32 32">\n<title>arrow-left-circle-alt</title>\n<path d="M16.015 26.562c-5.907 0-10.726-4.819-10.726-10.726s4.819-10.726 10.726-10.726c5.907 0 10.726 4.819 10.726 10.726s-4.819 10.726-10.726 10.726zM16.015 30.852c8.29 0 15.016-6.726 15.016-15.016s-6.726-15.016-15.016-15.016c-8.29 0-15.016 6.726-15.016 15.016s6.726 15.016 15.016 15.016zM15.389 22.269c0.332 0 0.626-0.293 0.626-0.626v-3.662h6.882c0.332 0 0.626-0.293 0.626-0.626v-3.039c0-0.332-0.293-0.626-0.626-0.626h-6.882v-3.664c0-0.351-0.273-0.626-0.626-0.626-0.176 0-0.332 0.078-0.47 0.195l-5.164 5.79c-0.117 0.117-0.176 0.293-0.176 0.449s0.059 0.332 0.176 0.449l5.183 5.807c0.117 0.117 0.293 0.176 0.45 0.176z"/>\n</symbol>\n<symbol id="svg-arrow-right-circle-alt" viewBox="0 0 32 32">\n<title>arrow-right-circle-alt</title>\n<path d="M16.015 5.11c5.907 0 10.726 4.819 10.726 10.726s-4.819 10.726-10.726 10.726c-5.907 0-10.726-4.819-10.726-10.726s4.819-10.726 10.726-10.726zM16.015 0.82c-8.29 0-15.016 6.726-15.016 15.016s6.726 15.016 15.016 15.016c8.29 0 15.016-6.726 15.016-15.016s-6.726-15.016-15.016-15.016zM16.641 9.403c-0.332 0-0.626 0.293-0.626 0.626v3.662h-6.882c-0.332 0-0.626 0.293-0.626 0.626v3.039c0 0.332 0.293 0.626 0.626 0.626h6.882v3.664c0 0.351 0.273 0.626 0.626 0.626 0.176 0 0.332-0.078 0.47-0.195l5.164-5.79c0.117-0.117 0.176-0.293 0.176-0.449s-0.059-0.332-0.176-0.449l-5.183-5.807c-0.117-0.117-0.293-0.176-0.45-0.176z"/>\n</symbol>\n<symbol id="svg-arrow-slim-down-circle" viewBox="0 0 32 32">\n<title>arrow-slim-down-circle</title>\n<path d="M14.943 20.126l-5.898-5.9-1.61 1.61 8.58 8.58 8.58-8.58-1.608-1.61-5.898 5.9v-12.87h-2.146v12.87zM16.015 30.852c-8.293 0-15.016-6.723-15.016-15.016s6.723-15.016 15.016-15.016c8.293 0 15.016 6.723 15.016 15.016s-6.723 15.016-15.016 15.016z"/>\n</symbol>\n<symbol id="svg-arrow-slim-left-circle" viewBox="0 0 32 32">\n<title>arrow-slim-left-circle</title>\n<path d="M11.725 16.908l5.9 5.898-1.61 1.61-8.58-8.58 8.58-8.58 1.61 1.608-5.9 5.898h12.87v2.146h-12.87zM0.999 15.836c0 8.293 6.723 15.016 15.016 15.016s15.016-6.723 15.016-15.016c0-8.293-6.723-15.016-15.016-15.016s-15.016 6.723-15.016 15.016z"/>\n</symbol>\n<symbol id="svg-arrow-slim-right-circle" viewBox="0 0 32 32">\n<title>arrow-slim-right-circle</title>\n<path d="M20.305 16.908l-5.9 5.898 1.61 1.61 8.58-8.58-8.58-8.58-1.61 1.608 5.9 5.898h-12.87v2.146h12.87zM31.030 15.836c0 8.293-6.723 15.016-15.016 15.016s-15.016-6.723-15.016-15.016c0-8.293 6.723-15.016 15.016-15.016s15.016 6.723 15.016 15.016z"/>\n</symbol>\n<symbol id="svg-arrow-slim-up-circle" viewBox="0 0 32 32">\n<title>arrow-slim-up-circle</title>\n<path d="M14.943 11.546l-5.898 5.9-1.61-1.61 8.58-8.58 8.58 8.58-1.608 1.61-5.898-5.9v12.87h-2.146v-12.87zM16.015 0.82c-8.293 0-15.016 6.723-15.016 15.016s6.723 15.016 15.016 15.016c8.293 0 15.016-6.723 15.016-15.016s-6.723-15.016-15.016-15.016z"/>\n</symbol>\n<symbol id="svg-arrow-upward" viewBox="0 0 32 32">\n<title>arrow-upward</title>\n<path d="M5.313 16l10.688-10.688 10.688 10.688-1.938 1.875-7.438-7.438v16.25h-2.625v-16.25l-7.5 7.438z"/>\n</symbol>\n<symbol id="svg-ask-question" viewBox="0 0 46.01 39.34">\n<title>ask-question</title>\n<path d="M23 0C10.3 0 0 8.28 0 18.49a16.16 16.16 0 004.63 11.12 2.07 2.07 0 01.47 1.67l-1.75 7.39c-.13.53.18.79.68.57l8.38-3.57a2.93 2.93 0 011.85-.06A27.66 27.66 0 0023 36.99c12.7 0 23-8.28 23-18.49S35.7 0 23 0zm.21 28.59a2.31 2.31 0 112.26-2.33 2.32 2.32 0 01-2.26 2.33zm3.48-8.92a3.56 3.56 0 00-1.27 1.38 2 2 0 01-1.88 1.34 2.15 2.15 0 01-2.25-2.14 2.64 2.64 0 01.56-1.64 7.06 7.06 0 011.69-1.46c.63-.45 1.52-1.12 1.51-2.07a1.45 1.45 0 00-.5-1 2.25 2.25 0 00-1.64-.49 2.73 2.73 0 00-2 .76 2.53 2.53 0 00-.5.88 2.06 2.06 0 01-4-.75 4.63 4.63 0 012.34-3.59 8.63 8.63 0 014.18-1.11c3.2-.05 4.48 1.06 5.19 1.76a4.51 4.51 0 011.41 3.42 5.84 5.84 0 01-2.84 4.71z"/></symbol>\n<symbol id="svg-assign-group" viewBox="0 0 23.67 16.78">\n  <title>\n    assign-group\n  </title>\n  <path d="M15.36 13.75a3.64 3.64 0 0 0-1.1-2.58L7.93 4.79a2.29 2.29 0 0 0-1.67-.69 2.13 2.13 0 0 0-2.15 2.15A2.31 2.31 0 0 0 4.8 7.9l4.5 4.5a.32.32 0 0 0 .24.11 1.54 1.54 0 0 0 .85-.85.36.36 0 0 0-.11-.25L5.79 6.9a.92.92 0 0 1-.28-.64.72.72 0 0 1 .74-.74 1 1 0 0 1 .68.26l6.38 6.38a2.33 2.33 0 0 1 .69 1.6 1.58 1.58 0 0 1-1.62 1.62 2.3 2.3 0 0 1-1.6-.69L2.24 6.16a2.85 2.85 0 0 1-.83-2 2.76 2.76 0 0 1 2.76-2.8 2.9 2.9 0 0 1 2 .84l6.64 6.7a.36.36 0 0 0 .25.11 1.52 1.52 0 0 0 .87-.88.34.34 0 0 0-.14-.23L7.16 1.24a4.28 4.28 0 0 0-3-1.24A4.14 4.14 0 0 0 0 4.18a4.3 4.3 0 0 0 1.24 3l8.53 8.52a3.68 3.68 0 0 0 2.57 1.1 3 3 0 0 0 3-3z" data-name="Layer 3"/>\n  <ellipse cx="15.79" cy="7.5" rx="7.63" ry="5.73" stroke="#fff" stroke-miterlimit="10" stroke-width=".5" data-name="Layer 4"/>\n  <g data-name="Layer 2" fill="#fff">\n    <path d="M21.57 9.24a.92.92 0 0 1-.8 1h-3.21a.92.92 0 0 1-.8-1c0-1 .24-2.14 1.23-2.14a1.68 1.68 0 0 0 2.35 0c.99 0 1.23 1.15 1.23 2.14zm-.96-3.34a1.45 1.45 0 1 1-1.45-1.44 1.44 1.44 0 0 1 1.45 1.44zM14.99 9.29a.91.91 0 0 1-.8 1h-3.21a.91.91 0 0 1-.8-1c0-1 .25-2.14 1.23-2.14a1.69 1.69 0 0 0 1.18.49 1.65 1.65 0 0 0 1.17-.49c.99 0 1.23 1.15 1.23 2.14zm-1-3.34a1.45 1.45 0 1 1-1.44-1.44 1.45 1.45 0 0 1 1.48 1.44z"/>\n    <path d="M18.54 10.16a1 1 0 0 1-.89 1.09h-3.54a1 1 0 0 1-.88-1.09c0-1.1.27-2.36 1.35-2.36a1.86 1.86 0 0 0 2.6 0c1.09 0 1.36 1.26 1.36 2.36zm-1.07-3.68a1.59 1.59 0 1 1-1.54-1.58 1.59 1.59 0 0 1 1.54 1.58z" stroke="#000" stroke-miterlimit="10" stroke-width=".5"/>\n  </g>\n</symbol>\n<symbol id="svg-assign-member" viewBox="0 0 22.17 16.78">\n  <title>\n    assign-member\n  </title>\n  <path d="M15.36 13.75a3.64 3.64 0 0 0-1.1-2.58L7.93 4.79a2.29 2.29 0 0 0-1.67-.69 2.13 2.13 0 0 0-2.15 2.15A2.31 2.31 0 0 0 4.8 7.9l4.5 4.5a.32.32 0 0 0 .24.11 1.54 1.54 0 0 0 .85-.85.36.36 0 0 0-.11-.25L5.79 6.9a.92.92 0 0 1-.28-.64.72.72 0 0 1 .74-.74 1 1 0 0 1 .68.26l6.38 6.38a2.33 2.33 0 0 1 .69 1.6 1.58 1.58 0 0 1-1.62 1.62 2.3 2.3 0 0 1-1.6-.69L2.24 6.16a2.85 2.85 0 0 1-.83-2 2.76 2.76 0 0 1 2.76-2.8 2.9 2.9 0 0 1 2 .84l6.64 6.7a.36.36 0 0 0 .25.11 1.52 1.52 0 0 0 .87-.88.34.34 0 0 0-.14-.23L7.16 1.24a4.28 4.28 0 0 0-3-1.24A4.14 4.14 0 0 0 0 4.18a4.3 4.3 0 0 0 1.24 3l8.53 8.52a3.68 3.68 0 0 0 2.57 1.1 3 3 0 0 0 3-3z" data-name="Layer 3"/>\n  <g data-name="Layer 8" stroke-miterlimit="10" stroke-width=".5">\n    <ellipse cx="16.04" cy="7.58" rx="5.88" ry="5.75" stroke="#fff"/>\n    <path d="M19.37 9.9a1.24 1.24 0 0 1-1.08 1.34h-4.36a1.24 1.24 0 0 1-1.07-1.34c0-1.34.33-2.89 1.67-2.89a2.27 2.27 0 0 0 3.18 0c1.33-.05 1.66 1.5 1.66 2.89zm-1.3-4.51a2 2 0 1 1-1.95-2 2 2 0 0 1 1.95 1.95z" fill="#fff" stroke="#000"/>\n  </g>\n</symbol>\n<symbol id="svg-badge-Hospitalist" viewBox="0 0 111 32">\n<title>badge-Hospitalist</title>\n<path d="M49.958 15.34c-1.976 0-3.211 1.421-3.211 3.399 0 1.976 1.235 3.396 3.211 3.396 1.974 0 3.211-1.419 3.211-3.396 0-1.978-1.235-3.399-3.211-3.399zM28.45 15.34c-1.976 0-3.211 1.421-3.211 3.399 0 1.976 1.235 3.396 3.211 3.396s3.213-1.419 3.213-3.396c0-1.978-1.237-3.399-3.213-3.399zM71.093 20.797c0 1.114 0.824 1.585 2.102 1.585 2.059 0 2.78-1.523 2.78-2.838v-0.621h-0.988c-1.75 0-3.894 0.312-3.894 1.875zM105.411 0.002h-99.349c-3.337 0-6.055 2.714-6.055 6.055v19.886c0 3.337 2.716 6.055 6.055 6.055h99.349c3.335 0 6.055-2.716 6.055-6.055v-19.886c0-3.341-2.718-6.055-6.055-6.055zM20.567 23.62h-1.976v-6.672h-7.555v6.672h-1.976v-14.578h1.976v6.053h7.555v-6.053h1.976v14.578zM28.45 23.863c-2.902 0-5.187-2.283-5.187-5.123 0-2.842 2.285-5.131 5.187-5.131s5.187 2.289 5.187 5.131c0 2.84-2.283 5.123-5.187 5.123zM38.804 23.863c-1.606 0-2.799-0.412-3.766-1.728l1.398-1.154c0.597 0.599 1.297 1.154 2.368 1.154 0.947 0 1.976-0.39 1.976-1.235 0-1.111-1.543-1.316-2.347-1.504-1.585-0.39-2.985-0.902-2.985-2.778 0-2.038 1.875-3.010 3.708-3.010 1.295 0 2.635 0.456 3.335 1.609l-1.442 1.092c-0.433-0.536-1.073-0.969-1.999-0.969-0.864 0-1.626 0.392-1.626 1.094 0 1.173 1.67 1.333 2.49 1.523 1.607 0.392 2.84 1.009 2.84 2.84 0 2.202-2.016 3.066-3.951 3.066zM50.183 23.863c-1.4 0-2.739-0.636-3.397-1.643h-0.040v7.205h-1.852v-15.564h1.852v1.397h0.040c0.721-1.050 2.080-1.649 3.397-1.649 3.027 0 4.962 2.247 4.962 5.131 0.002 2.921-1.954 5.123-4.962 5.123zM59.363 23.62h-1.852v-9.759h1.852v9.759zM58.437 11.717c-0.742 0-1.357-0.614-1.357-1.359 0-0.742 0.615-1.359 1.357-1.359 0.745 0 1.361 0.617 1.361 1.359-0.002 0.745-0.619 1.359-1.361 1.359zM67.494 23.535c-0.431 0.247-1.297 0.328-1.666 0.328-2.863 0-2.904-1.747-2.904-3.315v-5.084h-2.142v-1.604h2.142v-2.742h1.85v2.742h2.654v1.604h-2.654v4.429c0 1.088 0 2.242 1.4 2.242 0.431 0 0.945-0.058 1.316-0.286l0.004 1.686zM76.139 23.62c-0.040-0.497-0.060-0.992-0.060-1.485h-0.040c-0.824 1.257-1.933 1.728-3.416 1.728-1.811 0-3.375-1.028-3.375-2.921 0-2.511 2.407-3.377 5.372-3.377h1.359v-0.412c0-1.009-0.745-2.057-2.325-2.057-1.421 0-2.099 0.597-2.782 1.111l-1.112-1.154c1.031-0.967 2.511-1.444 3.874-1.444 2.878 0 4.073 1.568 4.073 3.254v4.98c0 0.679 0.024 1.254 0.083 1.771h-1.649v0.006zM82.294 23.62h-1.854v-15.566h1.854v15.566zM87.131 23.62h-1.854v-9.759h1.854v9.759zM86.207 11.717c-0.743 0-1.361-0.614-1.361-1.359 0-0.742 0.617-1.359 1.361-1.359 0.742 0 1.357 0.617 1.357 1.359-0.002 0.745-0.619 1.359-1.357 1.359zM92.915 23.863c-1.607 0-2.801-0.412-3.768-1.728l1.4-1.154c0.595 0.599 1.297 1.154 2.368 1.154 0.945 0 1.974-0.39 1.974-1.235 0-1.111-1.543-1.316-2.347-1.504-1.585-0.39-2.983-0.902-2.983-2.778 0-2.038 1.875-3.010 3.706-3.010 1.295 0 2.635 0.456 3.333 1.609l-1.442 1.092c-0.431-0.536-1.071-0.969-1.999-0.969-0.866 0-1.626 0.392-1.626 1.094 0 1.173 1.67 1.333 2.488 1.523 1.607 0.392 2.846 1.009 2.846 2.84 0.002 2.202-2.018 3.066-3.951 3.066zM104.297 23.535c-0.433 0.247-1.297 0.328-1.67 0.328-2.863 0-2.902-1.747-2.902-3.315v-5.084h-2.142v-1.604h2.142v-2.742h1.85v2.742h2.656v1.604h-2.656v4.429c0 1.088 0 2.242 1.398 2.242 0.431 0 0.951-0.058 1.319-0.286l0.004 1.686z"/>\n</symbol>\n<symbol id="svg-bar-chart" viewBox="0 0 37 32">\n<title>bar-chart</title>\n<path d="M11.429 16v9.143h-4.571v-9.143h4.571zM18.286 6.857v18.286h-4.571v-18.286h4.571zM36.571 27.429v2.286h-36.571v-27.429h2.286v25.143h34.286zM25.143 11.429v13.714h-4.571v-13.714h4.571zM32 4.571v20.571h-4.571v-20.571h4.571z"/>\n</symbol>\n<symbol id="svg-bar-graph" viewBox="0 0 32 32">\n<title>bar-graph</title>\n<path d="M1.285 24.324v9.821h4.911v-9.821h-4.911zM8.65 9.59v24.555h4.911v-24.555h-4.911zM16.017 16.957v17.266h4.911v-17.266h-4.911zM23.384 2.225v31.921h4.911v-31.921h-4.911z"/>\n</symbol>\n<symbol id="svg-bolt" viewBox="0 0 32 32">\n<title>bolt</title>\n<path d="M24.401 8.423c-0.173-0.173-0.403-0.288-0.653-0.288-0.077 0-0.154 0.019-0.23 0.038l-7.611 1.885 3.286-8.904c0.058-0.115 0.096-0.23 0.096-0.346 0-0.442-0.384-0.808-0.866-0.808v0h-6.303c-0.403 0-0.749 0.25-0.846 0.616l-3.862 15.865c-0.058 0.269 0.019 0.558 0.25 0.75 0.154 0.134 0.384 0.211 0.595 0.211 0.077 0 0.154 0 0.23-0.019l7.803-1.942-3.785 15.539c-0.096 0.403 0.154 0.808 0.576 0.942 0.096 0.019 0.192 0.038 0.269 0.038 0.346 0 0.653-0.192 0.808-0.48l10.378-22.249c0.134-0.288 0.077-0.616-0.134-0.846z"/>\n</symbol>\n<symbol id="svg-book-open" viewBox="0 0 577 576"><path d="M21.73 45C9.78 44.81 0 56.78 0 71.6v392.8c0 14.84 9.63 26.94 21.6 27.12 120.81 1.89 186.67 22.2 219.66 37.75C255.14 535.81 270 523 270 504.6V116c0-10.28-4.69-19.65-12.09-24.25C233.53 76.55 167.84 47.3 21.73 45zM554.27 45c12-.19 21.73 11.78 21.73 26.6v392.8c0 14.84-9.63 26.94-21.6 27.12-120.81 1.89-186.67 22.2-219.66 37.75C320.86 535.81 306 523 306 504.6V116c0-10.28 4.69-19.65 12.09-24.25C342.47 76.55 408.16 47.3 554.27 45z"/></symbol>\n<symbol id="svg-books" viewBox="0 0 576 576"><path d="M120.65 0H14.4A14.4 14.4 0 000 14.4v547.2A14.4 14.4 0 0014.4 576h106.25a14.4 14.4 0 0014.4-14.4V14.4A14.4 14.4 0 00120.65 0zM90 230.7v114.6A14.7 14.7 0 0175.32 360H59.73A14.71 14.71 0 0145 345.3V230.7A14.71 14.71 0 0159.73 216h15.59A14.7 14.7 0 0190 230.7zM291.72.36H185.48a14.39 14.39 0 00-14.4 14.4V562a14.4 14.4 0 0014.4 14.4h106.24a14.4 14.4 0 0014.4-14.4V14.76a14.4 14.4 0 00-14.4-14.4zm-30.62 345.3a14.7 14.7 0 01-14.7 14.7h-15.6a14.7 14.7 0 01-14.7-14.7v-114.6a14.7 14.7 0 0114.7-14.7h15.6a14.7 14.7 0 0114.7 14.7zM576.36 537.73l-8-41.08-3.61-18.51L488 84.18l-3.6-18.52-7.93-40.72c-1.6-8.18-9.22-13.57-17-12L355.17 33.2c-7.81 1.52-12.85 9.39-11.25 17.57l7.93 40.71 3.61 18.52 76.74 394 3.61 18.51 8 41.09c1.6 8.18 9.22 13.58 17 12.05l104.31-20.35c7.8-1.52 12.88-9.39 11.24-17.57zm-94.14-170.91l-15.31 3c-8 1.55-15.75-4-17.37-12.31l-23-117.88c-1.62-8.35 3.52-16.38 11.49-17.93l15.31-3c8-1.55 15.75 4 17.37 12.31l23 117.88c1.62 8.35-3.52 16.38-11.49 17.93z"/></symbol>\n<symbol id="svg-bubble-grid" viewBox="0 0 32 32">\n<title>bubble-grid</title>\n  <path d="M4.34 5.09C1.96 5.09 0 4.34 0 2.54 0 .72 2 0 4.34 0c2.43 0 4.34.72 4.34 2.54 0 1.8-1.91 2.55-4.34 2.55zM4.34 13.34c-2.38 0-4.34-.76-4.34-2.58s2-2.55 4.34-2.55c2.39 0 4.34.73 4.34 2.55 0 1.82-1.91 2.58-4.34 2.58zM4.34 21.52c-2.38 0-4.34-.73-4.34-2.55 0-1.82 2-2.55 4.34-2.55 2.39 0 4.34.73 4.34 2.55 0 1.82-1.91 2.55-4.34 2.55zM15.85 5.09c-2.39 0-4.34-.73-4.34-2.55C11.51.72 13.46 0 15.85 0c2.39 0 4.34.72 4.34 2.54 0 1.8-1.95 2.55-4.34 2.55zM15.85 13.34c-2.39 0-4.34-.72-4.34-2.54s1.95-2.55 4.34-2.55c2.39 0 4.34.73 4.34 2.55 0 1.78-1.95 2.54-4.34 2.54zM15.85 21.52c-2.39 0-4.34-.73-4.34-2.55 0-1.82 1.95-2.55 4.34-2.55 2.39 0 4.34.73 4.34 2.55 0 1.82-1.95 2.55-4.34 2.55zM27.36 5.09c-2.39 0-4.34-.73-4.34-2.55C23.02.72 24.97 0 27.36 0c2.38 0 4.34.72 4.34 2.54 0 1.8-1.93 2.55-4.34 2.55zM27.36 13.34c-2.39 0-4.34-.72-4.34-2.54s1.95-2.55 4.34-2.55c2.38 0 4.34.73 4.34 2.55 0 1.78-1.93 2.54-4.34 2.54zM27.36 21.52c-2.39 0-4.34-.73-4.34-2.55 0-1.82 1.95-2.55 4.34-2.55 2.38 0 4.34.73 4.34 2.55 0 1.82-1.93 2.55-4.34 2.55zM4.34 29.73C1.96 29.73 0 29 0 27.18c0-1.82 2-2.54 4.34-2.54 2.39 0 4.34.72 4.34 2.54s-1.91 2.55-4.34 2.55zM15.85 29.73c-2.39 0-4.34-.73-4.34-2.55 0-1.82 1.95-2.54 4.34-2.54 2.39 0 4.34.72 4.34 2.54s-1.95 2.55-4.34 2.55zM27.36 29.73c-2.39 0-4.34-.73-4.34-2.55 0-1.82 1.95-2.54 4.34-2.54 2.38 0 4.34.72 4.34 2.54s-1.93 2.55-4.34 2.55z"/>\n</symbol>\n<symbol id="svg-bubble-list" viewBox="0 0 574.4 573.41"><rect width="108" height="108" rx="21.6"/><rect y="466" width="108" height="108" rx="21.6"/><rect y="155.33" width="108" height="108" rx="21.6"/><rect y="310.67" width="108" height="108" rx="21.6"/><rect x="153" y="-.35" width="421" height="108" rx="21.6"/><rect x="153" y="465.65" width="421" height="108" rx="21.6"/><rect x="153" y="154.98" width="421" height="108" rx="21.6"/><rect x="153" y="310.32" width="421" height="108" rx="21.6"/></symbol>\n<symbol id="svg-bullet" viewBox="0 0 32 32">\n<title>bullet</title>\n<path d="M11.44 16.892c0-2.527 2.048-4.576 4.576-4.576s4.576 2.048 4.576 4.576c0 2.527-2.048 4.576-4.576 4.576s-4.576-2.048-4.576-4.576z"/>\n</symbol>\n<symbol id="svg-caret-small-down" viewBox="0 0 32 32">\n<title>caret-small-down</title>\n<path d="M24.148 13.333c0-0.556-0.461-1.017-1.017-1.017h-14.233c-0.556 0-1.017 0.461-1.017 1.017 0 0.271 0.111 0.524 0.301 0.714l7.116 7.117c0.191 0.191 0.445 0.301 0.714 0.301s0.524-0.11 0.714-0.301l7.116-7.117c0.191-0.191 0.301-0.445 0.301-0.714z"/>\n</symbol>\n<symbol id="svg-caret-small-left" viewBox="0 0 32 32">\n<title>caret-small-left</title>\n<path d="M19.556 7.875c0.556 0 1.016 0.46 1.016 1.016v14.219c0 0.555-0.46 1.016-1.016 1.016-0.27 0-0.524-0.111-0.714-0.302l-7.111-7.109c-0.19-0.19-0.302-0.444-0.302-0.714s0.111-0.524 0.302-0.714l7.111-7.109c0.19-0.19 0.444-0.301 0.714-0.301z"/>\n</symbol>\n<symbol id="svg-caret-small-right" viewBox="0 0 32 32">\n<title>caret-small-right</title>\n<path d="M12.457 8.759c-0.556 0-1.017 0.461-1.017 1.017v14.233c0 0.556 0.461 1.017 1.017 1.017 0.271 0 0.524-0.11 0.714-0.301l7.117-7.116c0.191-0.191 0.301-0.445 0.301-0.714s-0.11-0.524-0.301-0.714l-7.117-7.116c-0.191-0.191-0.445-0.301-0.714-0.301z"/>\n</symbol>\n<symbol id="svg-caret-small-up" viewBox="0 0 32 32">\n<title>caret-small-up</title>\n<path d="M24.148 20.45c0 0.556-0.461 1.017-1.017 1.017h-14.233c-0.556 0-1.017-0.461-1.017-1.017 0-0.271 0.111-0.524 0.301-0.714l7.116-7.117c0.191-0.191 0.445-0.301 0.714-0.301s0.524 0.111 0.714 0.301l7.116 7.117c0.191 0.191 0.301 0.445 0.301 0.714z"/>\n</symbol>\n<symbol id="svg-certificate" viewBox="0 0 27 32">\n<title>certificate</title>\n<path d="M24.571 16l2.464 2.411c0.339 0.321 0.464 0.804 0.357 1.25-0.125 0.446-0.482 0.804-0.929 0.911l-3.357 0.857 0.946 3.321c0.125 0.446 0 0.929-0.339 1.25-0.321 0.339-0.804 0.464-1.25 0.339l-3.321-0.946-0.857 3.357c-0.107 0.446-0.464 0.804-0.911 0.929-0.107 0.018-0.232 0.036-0.339 0.036-0.339 0-0.679-0.143-0.911-0.393l-2.411-2.464-2.411 2.464c-0.321 0.339-0.804 0.464-1.25 0.357-0.464-0.125-0.804-0.482-0.911-0.929l-0.857-3.357-3.321 0.946c-0.446 0.125-0.929 0-1.25-0.339-0.339-0.321-0.464-0.804-0.339-1.25l0.946-3.321-3.357-0.857c-0.446-0.107-0.804-0.464-0.929-0.911-0.107-0.446 0.018-0.929 0.357-1.25l2.464-2.411-2.464-2.411c-0.339-0.321-0.464-0.804-0.357-1.25 0.125-0.446 0.482-0.804 0.929-0.911l3.357-0.857-0.946-3.321c-0.125-0.446 0-0.929 0.339-1.25 0.321-0.339 0.804-0.464 1.25-0.339l3.321 0.946 0.857-3.357c0.107-0.446 0.464-0.804 0.911-0.911 0.446-0.125 0.929 0 1.25 0.339l2.411 2.482 2.411-2.482c0.321-0.339 0.786-0.464 1.25-0.339 0.446 0.107 0.804 0.464 0.911 0.911l0.857 3.357 3.321-0.946c0.446-0.125 0.929 0 1.25 0.339 0.339 0.321 0.464 0.804 0.339 1.25l-0.946 3.321 3.357 0.857c0.446 0.107 0.804 0.464 0.929 0.911 0.107 0.446-0.018 0.929-0.357 1.25z"/>\n</symbol>\n<symbol id="svg-check-box-outline-blank" viewBox="0 0 32 32">\n<title>check-box-outline-blank</title>\n<path d="M25.313 4c1.438 0 2.688 1.25 2.688 2.688v18.625c0 1.438-1.25 2.688-2.688 2.688h-18.625c-1.438 0-2.688-1.25-2.688-2.688v-18.625c0-1.438 1.25-2.688 2.688-2.688h18.625zM25.313 6.688h-18.625v18.625h18.625v-18.625z"/>\n</symbol>\n<symbol id="svg-check-box" viewBox="0 0 32 32">\n<title>check-box</title>\n<path d="M13.313 22.688l12-12-1.875-1.938-10.125 10.125-4.75-4.75-1.875 1.875zM25.313 4c1.5 0 2.688 1.25 2.688 2.688v18.625c0 1.438-1.188 2.688-2.688 2.688h-18.625c-1.5 0-2.688-1.25-2.688-2.688v-18.625c0-1.438 1.188-2.688 2.688-2.688h18.625z"/>\n</symbol>\n<symbol id="svg-check-circle-small" viewBox="0 0 32 32">\n<title>check-circle</title>\n<path d="M13.313 22.688l12-12-1.875-1.938-10.125 10.125-4.75-4.75-1.875 1.875zM16 2.688c7.375 0 13.313 5.938 13.313 13.313s-5.938 13.313-13.313 13.313-13.313-5.938-13.313-13.313 5.938-13.313 13.313-13.313z"/>\n</symbol>\n<symbol id="svg-check-circle" viewBox="0 0 32 32">\n<title>check-circle</title>\n<path d="M5.286 16.015l3.222-3.195 5.349 5.323 9.667-9.584 3.19 3.155-12.857 12.857-8.571-8.556zM1 16c0 8.284 6.716 15 15 15s15-6.716 15-15c0-8.284-6.716-15-15-15s-15 6.716-15 15z"/>\n</symbol>\n<symbol id="svg-check-small" viewBox="0 0 32 32">\n<title>check-small</title>\n<path d="M12 21.563l14.125-14.125 1.875 1.875-16 16-7.438-7.438 1.875-1.875z"/>\n</symbol>\n<symbol id="svg-check-square-o" viewBox="0 0 30 32">\n<title>check-square-o</title>\n<path d="M25.143 16.607v5.679c0 2.839-2.304 5.143-5.143 5.143h-14.857c-2.839 0-5.143-2.304-5.143-5.143v-14.857c0-2.839 2.304-5.143 5.143-5.143h14.857c0.714 0 1.429 0.143 2.089 0.446 0.161 0.071 0.286 0.232 0.321 0.411 0.036 0.196-0.018 0.375-0.161 0.518l-0.875 0.875c-0.107 0.107-0.268 0.179-0.411 0.179-0.054 0-0.107-0.018-0.161-0.036-0.268-0.071-0.536-0.107-0.804-0.107h-14.857c-1.571 0-2.857 1.286-2.857 2.857v14.857c0 1.571 1.286 2.857 2.857 2.857h14.857c1.571 0 2.857-1.286 2.857-2.857v-4.536c0-0.143 0.054-0.286 0.161-0.393l1.143-1.143c0.125-0.125 0.268-0.179 0.411-0.179 0.071 0 0.143 0.018 0.214 0.054 0.214 0.089 0.357 0.286 0.357 0.518zM29.268 7.875l-14.536 14.536c-0.571 0.571-1.464 0.571-2.036 0l-7.679-7.679c-0.571-0.571-0.571-1.464 0-2.036l1.964-1.964c0.571-0.571 1.464-0.571 2.036 0l4.696 4.696 11.554-11.554c0.571-0.571 1.464-0.571 2.036 0l1.964 1.964c0.571 0.571 0.571 1.464 0 2.036z"/>\n</symbol>\n<symbol id="svg-check" viewBox="0 0 32 32">\n<title>check</title>\n<path d="M0 16.892l4.576-4.576 6.864 6.887 16.016-16.038 4.576 4.576-20.591 20.591-11.44-11.44z"/>\n</symbol>\n<symbol id="svg-chevron-down-thin" viewBox="0 0 32 32">\n<title>chevron-down-thin</title>\n<path d="M4.131 8.962c-0.434-0.429-1.134-0.429-1.566 0-0.432 0.427-0.432 1.122 0 1.55l12.653 12.528c0.434 0.429 1.133 0.429 1.566 0l12.653-12.528c0.432-0.429 0.434-1.122 0-1.55s-1.136-0.429-1.566-0.002l-11.87 11.426-11.869-11.424z"/>\n</symbol>\n<symbol id="svg-chevron-down" viewBox="0 0 32 32">\n<title>chevron-down</title>\n<path d="M32.031 12.319l-4.576-4.579-11.44 11.44-11.44-11.44-4.576 4.576 16.016 16.016 16.016-16.012z"/>\n</symbol>\n<symbol id="svg-chevron-left-circle" viewBox="0 0 32 32">\n<title>chevron-left-circle</title>\n<path d="M31.030 15.84c0-8.29-6.726-15.016-15.016-15.016s-15.016 6.726-15.016 15.016c0 8.29 6.766 15.016 15.056 15.016s14.975-6.726 14.975-15.016zM15.054 15.84l6.174 6.174-3.087 3.087-9.26-9.26 9.26-9.26 3.087 3.087-6.174 6.174z"/>\n</symbol>\n<symbol id="svg-chevron-left" viewBox="0 0 32 32">\n<title>chevron-left</title>\n<path d="M20.588-0.124l4.579 4.576-11.44 11.44 11.44 11.44-4.576 4.576-16.016-16.016 16.012-16.016z"/>\n</symbol>\n<symbol id="svg-chevron-right-circle" viewBox="0 0 32 32">\n<title>chevron-right-circle</title>\n<path d="M0.999 15.84c0 8.29 6.726 15.016 15.016 15.016s15.016-6.726 15.016-15.016c0-8.29-6.766-15.016-15.056-15.016s-14.975 6.726-14.975 15.016zM16.976 15.84l-6.174-6.174 3.087-3.087 9.26 9.26-9.26 9.26-3.087-3.087 6.174-6.174z"/>\n</symbol>\n<symbol id="svg-chevron-right" viewBox="0 0 32 32">\n<title>chevron-right</title>\n<path d="M11.443-0.124l-4.579 4.576 11.44 11.44-11.44 11.44 4.576 4.576 16.016-16.016-16.012-16.016z"/>\n</symbol>\n<symbol id="svg-chevron-up-thin" viewBox="0 0 32 32">\n<title>chevron-up-thin</title>\n<path d="M27.869 23.038c0.434 0.429 1.134 0.429 1.566 0 0.434-0.429 0.434-1.122 0-1.55l-12.653-12.528c-0.432-0.429-1.133-0.429-1.565 0l-12.653 12.528c-0.432 0.429-0.434 1.122 0 1.55s1.133 0.429 1.566 0l11.869-11.426 11.869 11.426z"/>\n</symbol>\n<symbol id="svg-chevron-up" viewBox="0 0 32 32">\n<title>chevron-up</title>\n<path d="M32.031 23.753l-4.576 4.579-11.44-11.44-11.44 11.44-4.576-4.576 16.016-16.016 16.016 16.012z"/>\n</symbol>\n<symbol id="svg-choose-response" viewBox="0 0 30 36">\n  <title>choose-response</title>\n  <path d="M29.45 22.79a1.42 1.42 0 0 0-1-.4h-1.38a1.47 1.47 0 0 0-1.27-1h-1.55a1.8 1.8 0 0 0-1.41-1.22h-1.63v-3a1.51 1.51 0 0 0-.12-.66 11 11 0 0 0 1.4-5.38 11.23 11.23 0 1 0-5.52 9.58v3.59a3.2 3.2 0 0 0-2.13-1.16c-1.67 0-1.92 1-1.92 1.54a4.8 4.8 0 0 0 .24 1.24v.07l4.78 7.57v2.42h9.76l2.29-5.92v-5.73a2 2 0 0 0-.54-1.54zm-16.33-4.68a.46.46 0 0 1-.47.47H9.84a.46.46 0 0 1-.47-.47v-2.78a.47.47 0 0 1 .47-.47h2.86a.46.46 0 0 1 .47.47zm1.12-6.08a2.23 2.23 0 0 0-1.12 1.44.46.46 0 0 1-.46.47H9.84a.46.46 0 0 1-.46-.47v-.52c0-1.41 1.42-2.61 2.46-3.08s1.28-.78 1.28-1.54-.86-1.23-1.8-1.23a2.42 2.42 0 0 0-1.26.35A6.22 6.22 0 0 0 8.8 8.79a.44.44 0 0 1-.36.18.43.43 0 0 1-.28-.09L6.23 7.43a.46.46 0 0 1-.12-.61 5.94 5.94 0 0 1 5.43-3.09c2.52 0 5.33 2 5.33 4.64 0 2.2-1.52 3.04-2.63 3.66zm14.57 17.83l-1.92 5h-7.74v-1.62l-4.87-7.73a3.32 3.32 0 0 1-.16-.81v-.22a1.17 1.17 0 0 1 .68-.13c.6 0 1.61 1.06 2.11 1.78v2h1.19v-8.2a11.45 11.45 0 0 0 1.86-1.82v6.05h1.2v-2.84h1.54c.1 0 .49.17.49.92v1.92h1.19v-1.61h1.32c.13 0 .32.24.32.84v1.92h1.19v-1.74h1.24a.41.41 0 0 1 .15.07 1 1 0 0 1 .18.69z"/>\n</symbol>\n<symbol id="svg-close-xtra-thin" viewBox="0 0 32 32">\n<title>close-xtra-thin</title>\n<path d="M13.869 15.836l-12.87-12.87 2.146-2.146 12.87 12.87 12.87-12.87 2.146 2.146-12.87 12.87 12.87 12.87-2.146 2.146-12.87-12.87-12.87 12.87-2.146-2.146 12.87-12.87z"/>\n</symbol>\n<symbol id="svg-close" viewBox="0 0 32 32">\n<title>close</title>\n<path d="M25.313 8.563l-7.438 7.438 7.438 7.438-1.875 1.875-7.438-7.438-7.438 7.438-1.875-1.875 7.438-7.438-7.438-7.438 1.875-1.875 7.438 7.438 7.438-7.438z"/>\n</symbol>\n<symbol id="svg-cme" viewBox="0 0 576 576"><path d="M452.88 163.47h105.36L447.12 51.57v106.29a5.7 5.7 0 005.76 5.61z"/><path d="M415.12 157.86V36.47H20.73A21.61 21.61 0 00-.88 58.07v386.8a21.61 21.61 0 0021.61 21.6h62.65l45.05-78A133.5 133.5 0 11343.94 394l32.11 72.44h177.47a21.6 21.6 0 0021.6-21.6V195.47H452.88a37.73 37.73 0 01-37.76-37.61z"/><path d="M299.64 382.91a96 96 0 0032.88-72.56C332.44 258 290 215 237.64 214.27a96.21 96.21 0 00-67.12 166.46L98.69 507.64a7.33 7.33 0 008.31 10.68l44.1-11.9 12.72 44.67a7 7 0 0012.84 1.53l55.89-98.76 43.67 99.33a7.09 7.09 0 0013.08-.24l17.08-43 43.24 16.49a7.08 7.08 0 009-9.46z"/></symbol>\n<symbol id="svg-comment" viewBox="0 0 32 32">\n<title>chat-bubble-outline</title>\n<path d="M26.688 21.313v-16h-21.375v18.688l2.688-2.688h18.688zM26.688 2.688c1.438 0 2.625 1.188 2.625 2.625v16c0 1.438-1.188 2.688-2.625 2.688h-18.688l-5.313 5.313v-24c0-1.438 1.188-2.625 2.625-2.625h21.375z"/>\n</symbol>\n<symbol id="svg-copy" viewBox="0 0 28 28">\n<title>copy</title>\n<path d="M26.5 6c0.828 0 1.5 0.672 1.5 1.5v19c0 0.828-0.672 1.5-1.5 1.5h-15c-0.828 0-1.5-0.672-1.5-1.5v-4.5h-8.5c-0.828 0-1.5-0.672-1.5-1.5v-10.5c0-0.828 0.484-1.984 1.062-2.562l6.375-6.375c0.578-0.578 1.734-1.062 2.562-1.062h6.5c0.828 0 1.5 0.672 1.5 1.5v5.125c0.609-0.359 1.391-0.625 2-0.625h6.5zM18 9.328l-4.672 4.672h4.672v-4.672zM8 3.328l-4.672 4.672h4.672v-4.672zM11.062 13.438l4.937-4.937v-6.5h-6v6.5c0 0.828-0.672 1.5-1.5 1.5h-6.5v10h8v-4c0-0.828 0.484-1.984 1.062-2.562zM26 26v-18h-6v6.5c0 0.828-0.672 1.5-1.5 1.5h-6.5v10h14z"/>\n</symbol>\n<symbol id="svg-copyright" viewBox="0 0 32 32">\n<title>copyright</title>\n<path d="M16 26.688c5.875 0 10.688-4.813 10.688-10.688s-4.813-10.688-10.688-10.688-10.688 4.813-10.688 10.688 4.813 10.688 10.688 10.688zM16 2.688c7.375 0 13.313 5.938 13.313 13.313s-5.938 13.313-13.313 13.313-13.313-5.938-13.313-13.313 5.938-13.313 13.313-13.313zM15.813 12.188c-1.923 0-2.5 1.702-2.5 3.625v0.375c0 1.923 0.578 3.625 2.5 3.625 1.174 0 2.188-0.716 2.188-1.875h2.375c0 1.22-0.661 2.138-1.375 2.75-0.806 0.691-1.744 1.125-3.188 1.125-3.412 0-5.125-2.255-5.125-5.625v-0.375c0-1.616 0.454-3.090 1.25-4 0.825-0.943 2.146-1.688 3.875-1.688 1.384 0 2.539 0.477 3.25 1.188 0.688 0.688 1.313 1.749 1.313 3.063h-2.375c0-0.313-0.063-0.563-0.188-0.813s-0.25-0.563-0.438-0.75c-0.339-0.339-0.917-0.625-1.563-0.625z"/>\n</symbol>\n<symbol id="svg-download2" viewBox="0 0 577 576"><path d="M403.61 288H324.5V22.91A22.91 22.91 0 00301.59 0h-26.18a22.91 22.91 0 00-22.91 22.91V288h-78.11c-19.81 0-29.17 24.44-14.43 37.67l43.54 39.1 71.07 63.81a22.14 22.14 0 0028.86 0l71.07-63.81 43.5-39.1c14.78-13.23 5.42-37.67-14.39-37.67z"/><path d="M504 381.6v100.8a21.6 21.6 0 01-21.6 21.6H94.6A21.6 21.6 0 0173 482.4V381.6A21.6 21.6 0 0051.4 360H21.6A21.6 21.6 0 000 381.6v172.8A21.6 21.6 0 0021.6 576h533.8a21.6 21.6 0 0021.6-21.6V381.6a21.6 21.6 0 00-21.6-21.6h-29.8a21.6 21.6 0 00-21.6 21.6z"/></symbol>\n<symbol id="svg-edit" viewBox="0 0 576 576"><path d="M432 270v211.27A22.73 22.73 0 01409.27 504H94.73A22.73 22.73 0 0172 481.27V166.73A22.73 22.73 0 0194.73 144H306a7.29 7.29 0 005.16-2.14l57.4-57.39A7.31 7.31 0 00363.41 72H28.9A28.9 28.9 0 000 100.9v446.2A28.9 28.9 0 0028.9 576h446.2a28.9 28.9 0 0028.9-28.9V212.63a7.31 7.31 0 00-12.47-5.16l-57.39 57.39A7.31 7.31 0 00432 270z"/><path d="M569 49L527 7a21.2 21.2 0 00-30 0L147.65 356.35a21.84 21.84 0 00-5.28 8.55l-29.64 88.9a7.49 7.49 0 009.47 9.47l88.92-29.64a21.76 21.76 0 008.51-5.26L569 79a21.23 21.23 0 000-30z"/></symbol>\n<symbol id="svg-exclamation-circle" viewBox="0 0 32 32">\n<title>exclamation-circle</title>\n<path d="M18.518 22.19v3.715c0 0.351-0.273 0.646-0.607 0.646h-3.754c-0.351 0-0.646-0.293-0.646-0.646v-3.715c0-0.351 0.293-0.646 0.646-0.646h3.754c0.332 0 0.607 0.293 0.607 0.646zM18.836 5.619l-0.357 12.944c-0.020 0.273-0.312 0.488-0.665 0.488h-3.617c-0.371 0-0.665-0.215-0.665-0.488l-0.327-12.944c0-0.137 0.059-0.273 0.195-0.351 0.117-0.098 0.293-0.156 0.47-0.156h4.302c0.176 0 0.351 0.059 0.47 0.156 0.137 0.078 0.195 0.215 0.195 0.351zM16.015 0.82c-8.29 0-15.016 6.726-15.016 15.016s6.726 15.016 15.016 15.016c8.29 0 15.016-6.726 15.016-15.016s-6.726-15.016-15.016-15.016z"/>\n</symbol>\n<symbol id="svg-exclamation" viewBox="0 0 11 32">\n<title>exclamation</title>\n<path d="M9.143 22.286v4c0 0.625-0.518 1.143-1.143 1.143h-4.571c-0.625 0-1.143-0.518-1.143-1.143v-4c0-0.625 0.518-1.143 1.143-1.143h4.571c0.625 0 1.143 0.518 1.143 1.143zM9.679 3.429l-0.5 13.714c-0.018 0.625-0.554 1.143-1.179 1.143h-4.571c-0.625 0-1.161-0.518-1.179-1.143l-0.5-13.714c-0.018-0.625 0.482-1.143 1.107-1.143h5.714c0.625 0 1.125 0.518 1.107 1.143z"/>\n</symbol>\n<symbol id="svg-expand" viewBox="0 0 27 32">\n<title>expand</title>\n<path d="M13.482 18.857c0 0.143-0.071 0.304-0.179 0.411l-5.929 5.929 2.571 2.571c0.214 0.214 0.339 0.5 0.339 0.804 0 0.625-0.518 1.143-1.143 1.143h-8c-0.625 0-1.143-0.518-1.143-1.143v-8c0-0.625 0.518-1.143 1.143-1.143 0.304 0 0.589 0.125 0.804 0.339l2.571 2.571 5.929-5.929c0.107-0.107 0.268-0.179 0.411-0.179s0.304 0.071 0.411 0.179l2.036 2.036c0.107 0.107 0.179 0.268 0.179 0.411zM27.429 3.429v8c0 0.625-0.518 1.143-1.143 1.143-0.304 0-0.589-0.125-0.804-0.339l-2.571-2.571-5.929 5.929c-0.107 0.107-0.268 0.179-0.411 0.179s-0.304-0.071-0.411-0.179l-2.036-2.036c-0.107-0.107-0.179-0.268-0.179-0.411s0.071-0.304 0.179-0.411l5.929-5.929-2.571-2.571c-0.214-0.214-0.339-0.5-0.339-0.804 0-0.625 0.518-1.143 1.143-1.143h8c0.625 0 1.143 0.518 1.143 1.143z"/>\n</symbol>\n<symbol id="svg-eye-blocked" viewBox="0 0 32 32">\n<title>eye-blocked</title>\n<path d="M29.561 0.439c-0.586-0.586-1.535-0.586-2.121 0l-6.318 6.318c-1.623-0.492-3.342-0.757-5.122-0.757-6.979 0-13.028 4.064-16 10 1.285 2.566 3.145 4.782 5.407 6.472l-4.968 4.968c-0.586 0.586-0.586 1.535 0 2.121 0.293 0.293 0.677 0.439 1.061 0.439s0.768-0.146 1.061-0.439l27-27c0.586-0.586 0.586-1.536 0-2.121zM13 10c1.32 0 2.44 0.853 2.841 2.037l-3.804 3.804c-1.184-0.401-2.037-1.521-2.037-2.841 0-1.657 1.343-3 3-3zM3.441 16c1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 1.715 0.54 3.304 1.459 4.607l-1.904 1.904c-1.639-1.151-3.038-2.621-4.114-4.323z"/>\n<path d="M24 13.813c0-0.849-0.133-1.667-0.378-2.434l-10.056 10.056c0.768 0.245 1.586 0.378 2.435 0.378 4.418 0 8-3.582 8-8z"/>\n<path d="M25.938 9.062l-2.168 2.168c0.040 0.025 0.079 0.049 0.118 0.074 1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303-1.208 0-2.403-0.149-3.561-0.439l-2.403 2.403c1.866 0.671 3.873 1.036 5.964 1.036 6.978 0 13.027-4.064 16-10-1.407-2.81-3.504-5.2-6.062-6.938z"/>\n</symbol>\n<symbol id="svg-eye" viewBox="0 0 32 32">\n<title>eye</title>\n<path d="M16 6c-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-2.972-5.936-9.021-10-16-10zM23.889 11.303c1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303s-5.527-0.796-7.889-2.303c-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.962-0.17-1.883-0.482-2.737 0.124 0.074 0.248 0.15 0.371 0.228v0zM16 13c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/>\n</symbol>\n<symbol id="svg-face-dissatisfied" viewBox="0 0 32 32">\n<title>face-dissatisfied</title>\n<path d="M16 18.688c3.125 0 5.75 1.875 6.813 4.625h-2.188c-0.938-1.563-2.625-2.625-4.625-2.625s-3.688 1.063-4.625 2.625h-2.188c1.063-2.75 3.688-4.625 6.813-4.625zM16 26.688c5.875 0 10.688-4.813 10.688-10.688s-4.813-10.688-10.688-10.688-10.688 4.813-10.688 10.688 4.813 10.688 10.688 10.688zM16 2.688c7.375 0 13.313 5.938 13.313 13.313s-5.938 13.313-13.313 13.313-13.313-5.938-13.313-13.313 5.938-13.313 13.313-13.313zM9.313 12.688c0-1.125 0.875-2 2-2s2 0.875 2 2-0.875 2-2 2-2-0.875-2-2zM18.688 12.688c0-1.125 0.875-2 2-2s2 0.875 2 2-0.875 2-2 2-2-0.875-2-2z"/>\n</symbol>\n<symbol id="svg-face-neutral" viewBox="0 0 32 32">\n<title>face-neutral</title>\n<path d="M16 26.688c5.875 0 10.688-4.813 10.688-10.688s-4.813-10.688-10.688-10.688-10.688 4.813-10.688 10.688 4.813 10.688 10.688 10.688zM16 2.688c7.375 0 13.313 5.938 13.313 13.313s-5.938 13.313-13.313 13.313-13.313-5.938-13.313-13.313 5.938-13.313 13.313-13.313zM9.313 12.688c0-1.125 0.875-2 2-2s2 0.875 2 2-0.875 2-2 2-2-0.875-2-2zM18.688 12.688c0-1.125 0.875-2 2-2s2 0.875 2 2-0.875 2-2 2-2-0.875-2-2zM12 18.688h8v2h-8v-2z"/>\n</symbol>\n<symbol id="svg-face-satisfied" viewBox="0 0 32 32">\n<title>face-satisfied</title>\n<path d="M16 21.313c2 0 3.688-1.063 4.625-2.625h2.188c-1.063 2.75-3.688 4.625-6.813 4.625s-5.75-1.875-6.813-4.625h2.188c0.938 1.563 2.625 2.625 4.625 2.625zM16 26.688c5.875 0 10.688-4.813 10.688-10.688s-4.813-10.688-10.688-10.688-10.688 4.813-10.688 10.688 4.813 10.688 10.688 10.688zM16 2.688c7.375 0 13.313 5.938 13.313 13.313s-5.938 13.313-13.313 13.313-13.313-5.938-13.313-13.313 5.938-13.313 13.313-13.313zM9.313 12.688c0-1.125 0.875-2 2-2s2 0.875 2 2-0.875 2-2 2-2-0.875-2-2zM18.688 12.688c0-1.125 0.875-2 2-2s2 0.875 2 2-0.875 2-2 2-2-0.875-2-2z"/>\n</symbol>\n<symbol id="svg-figures" viewBox="0 0 32 32">\n<title>figures</title>\n<path d="M29.727 28.531h-22.854v-11.427h22.854v11.427zM29.729 14.821l-6.858-0.002v-2.286h6.857l0.002 2.288zM25.158 5.715l-6.858-0.002v-2.286h6.857l0.002 2.288zM4.588 19.425h-2.286v-11.427h22.854v2.249h-20.568v9.178zM0.018 1.143v20.568l4.571-0.002v9.108l27.427-0.006-0.003-20.562h-4.569l-0.002-9.106h-27.425z"/>\n</symbol>\n<symbol id="svg-file-doc" viewBox="0 0 32 32">\n<title>file-doc</title>\n<path d="M25.116 6.707v6.792h-2.647v-4.945h-3.584c-0.731 0-1.324 0.138-1.324-0.593v-4.315h-13.915v24.706h21.469v1.324c0 0.731-0.593 1.324-1.324 1.324h-21.469c-0.731 0-1.324-0.593-1.324-1.324v-27.353c0-0.731 0.593-1.324 1.324-1.324h17.017l5.776 5.707z"/>\n<path d="M13.212 20.562c0 1.433-0.408 2.529-1.223 3.289s-1.992 1.14-3.531 1.14h-2.462v-8.7h2.73c1.421 0 2.524 0.374 3.309 1.128 0.785 0.75 1.177 1.797 1.177 3.143zM11.297 20.608c0-1.871-0.826-2.802-2.476-2.802h-0.983v5.663h0.792c1.777 0 2.666-0.955 2.666-2.861z"/>\n<path d="M22.911 20.632c0 1.44-0.355 2.546-1.068 3.321-0.716 0.773-1.735 1.159-3.071 1.159-1.334 0-2.354-0.387-3.069-1.159s-1.071-1.883-1.071-3.334 0.358-2.554 1.073-3.318c0.715-0.764 1.74-1.145 3.079-1.145 1.338 0 2.361 0.385 3.065 1.156 0.709 0.769 1.061 1.876 1.061 3.319zM16.563 20.632c0 0.972 0.184 1.705 0.554 2.195 0.369 0.492 0.919 0.738 1.655 0.738 1.472 0 2.206-0.979 2.206-2.933 0-1.957-0.729-2.94-2.194-2.94-0.734 0-1.287 0.249-1.659 0.741-0.376 0.494-0.563 1.227-0.563 2.199z"/>\n<path d="M28.411 17.705c-0.697 0-1.232 0.261-1.613 0.782-0.383 0.522-0.572 1.249-0.572 2.179 0 1.941 0.729 2.908 2.185 2.908 0.611 0 1.35-0.152 2.22-0.459v1.548c-0.713 0.298-1.512 0.447-2.391 0.447-1.267 0-2.236-0.385-2.905-1.151-0.671-0.769-1.002-1.871-1.002-3.304 0-0.907 0.162-1.699 0.491-2.381 0.332-0.681 0.803-1.202 1.422-1.564 0.618-0.364 1.338-0.545 2.169-0.545 0.845 0 1.692 0.205 2.543 0.612l-0.593 1.5c-0.328-0.155-0.655-0.289-0.985-0.404-0.328-0.113-0.651-0.169-0.969-0.169z"/>\n</symbol>\n<symbol id="svg-file-pdf" viewBox="0 0 32 32">\n<title>file-pdf</title>\n<path d="M25.116 6.707v6.792h-2.647v-4.945h-3.584c-0.731 0-1.324 0.138-1.324-0.593v-4.315h-13.915v24.706h21.469v1.324c0 0.731-0.593 1.324-1.324 1.324h-21.469c-0.731 0-1.324-0.593-1.324-1.324v-27.353c0-0.731 0.593-1.324 1.324-1.324h17.017l5.776 5.707z"/>\n<path d="M13.007 18.407c0 1.041-0.326 1.835-0.978 2.389s-1.576 0.829-2.776 0.829h-0.881v3.443h-2.052v-9.679h3.090c1.174 0 2.066 0.252 2.679 0.757 0.611 0.505 0.918 1.26 0.918 2.261zM8.373 19.942h0.676c0.63 0 1.103-0.124 1.417-0.376 0.312-0.249 0.469-0.611 0.469-1.089s-0.131-0.835-0.394-1.066c-0.263-0.228-0.674-0.341-1.235-0.341h-0.934v2.871z"/>\n<path d="M22.863 20.135c0 1.594-0.454 2.815-1.361 3.662-0.909 0.845-2.218 1.272-3.932 1.272h-2.737v-9.679h3.039c1.581 0 2.806 0.416 3.681 1.249 0.875 0.835 1.309 1.999 1.309 3.496zM20.733 20.188c0-2.079-0.919-3.12-2.756-3.12h-1.091v6.302h0.879c1.978 0.004 2.968-1.059 2.968-3.182z"/>\n<path d="M27.157 25.069h-2.021v-9.679h5.55v1.684h-3.529v2.495h3.284v1.675h-3.284v3.826z"/>\n</symbol>\n<symbol id="svg-file-ppt" viewBox="0 0 32 32">\n<title>file-ppt</title>\n<path d="M25.116 6.707v6.792h-2.647v-4.945h-3.584c-0.731 0-1.324 0.138-1.324-0.593v-4.315h-13.915v24.706h21.469v1.324c0 0.731-0.593 1.324-1.324 1.324h-21.469c-0.731 0-1.324-0.593-1.324-1.324v-27.353c0-0.731 0.593-1.324 1.324-1.324h17.017l5.776 5.707z"/>\n<path d="M13.311 19.189c0 1.080-0.337 1.909-1.013 2.479-0.676 0.574-1.638 0.859-2.884 0.859h-0.914v3.574h-2.132v-10.048h3.21c1.219 0 2.146 0.261 2.781 0.787 0.634 0.524 0.951 1.308 0.951 2.349zM8.5 20.782h0.701c0.655 0 1.145-0.129 1.47-0.39 0.325-0.258 0.487-0.635 0.487-1.133s-0.136-0.868-0.408-1.105c-0.272-0.238-0.701-0.355-1.281-0.355h-0.969v2.982z"/>\n<path d="M22.152 19.189c0 1.080-0.337 1.909-1.017 2.479-0.676 0.574-1.638 0.859-2.882 0.859h-0.914v3.574h-2.132v-10.048h3.212c1.216 0 2.144 0.261 2.778 0.787 0.635 0.524 0.955 1.308 0.955 2.349zM17.339 20.782h0.701c0.655 0 1.144-0.129 1.472-0.39 0.325-0.258 0.485-0.635 0.485-1.133s-0.134-0.868-0.406-1.107-0.699-0.353-1.281-0.353h-0.971v2.982z"/>\n<path d="M27.926 26.103h-2.132v-8.277h-2.728v-1.774h7.59v1.774h-2.73v8.276z"/>\n</symbol>\n<symbol id="svg-file-xls" viewBox="0 0 32 32">\n<title>file-xls</title>\n<path d="M25.116 6.707v6.792h-2.647v-4.945h-3.584c-0.731 0-1.324 0.138-1.324-0.593v-4.315h-13.915v24.706h21.469v1.324c0 0.731-0.593 1.324-1.324 1.324h-21.469c-0.731 0-1.324-0.593-1.324-1.324v-27.353c0-0.731 0.593-1.324 1.324-1.324h17.017l5.776 5.707z"/>\n<path d="M15.035 25.858h-2.502l-2.404-3.909-2.404 3.909h-2.347l3.429-5.331-3.21-5.005h2.418l2.227 3.718 2.185-3.718h2.361l-3.244 5.125 3.491 5.211z"/>\n<path d="M16.335 25.858v-10.336h2.192v8.527h4.191v1.807l-6.383 0.002z"/>\n<path d="M30.614 22.988c0 0.932-0.335 1.666-1.008 2.204s-1.606 0.806-2.802 0.806c-1.103 0-2.081-0.206-2.926-0.625v-2.033c0.699 0.311 1.287 0.529 1.77 0.657 0.484 0.125 0.925 0.191 1.325 0.191 0.48 0 0.849-0.094 1.108-0.275 0.258-0.184 0.387-0.459 0.387-0.821 0-0.203-0.056-0.385-0.173-0.544-0.109-0.157-0.279-0.309-0.496-0.455-0.221-0.146-0.665-0.379-1.341-0.699-0.63-0.3-1.107-0.582-1.422-0.856-0.316-0.272-0.567-0.591-0.757-0.953-0.187-0.364-0.282-0.787-0.282-1.276 0-0.914 0.311-1.632 0.93-2.157 0.619-0.522 1.475-0.784 2.568-0.784 0.538 0 1.052 0.064 1.537 0.191 0.487 0.127 0.997 0.307 1.53 0.538l-0.706 1.703c-0.551-0.228-1.006-0.387-1.366-0.477s-0.715-0.134-1.064-0.134c-0.415 0-0.734 0.097-0.955 0.289-0.224 0.194-0.332 0.448-0.332 0.759 0 0.191 0.042 0.362 0.132 0.506 0.092 0.141 0.235 0.281 0.427 0.415 0.196 0.132 0.658 0.376 1.389 0.724 0.969 0.462 1.631 0.925 1.989 1.389s0.538 1.041 0.538 1.715z"/>\n</symbol>\n<symbol id="svg-flag-canada" viewBox="0 0 1000 500">\n  <title>Canada Flag</title>\n  <path fill="red" d="M0 0h1000v500H0z"/>\n  <path fill="#fff" d="M250 0h500v500H250z"/>\n  <path fill="red" d="M499.9923 46.875l-34.1131 63.6253c-3.8709 6.915-10.8063 6.2736-17.7417 2.4114l-24.697-12.7886 18.407 97.7271c3.8709 17.8542-8.5486 17.8542-14.6776 10.1343l-43.101-48.251-6.9974 24.503c-.807 3.2178-4.3549 6.5975-9.6775 5.7927L312.8922 178.57l14.3152 52.0448c3.0646 11.5805 5.455 16.3753-3.0937 19.4296l-19.4262 9.1302 93.8213 76.2084c3.7135 2.8815 5.5897 8.067 4.2677 12.7621l-8.2114 26.947c32.304-3.7236 61.249-9.3259 93.5694-12.7761 2.8532-.3046 7.6299 4.404 7.6103 7.7106l-4.2803 98.7234h15.7064l-2.4723-98.5117c-.0197-3.3065 4.3137-8.2269 7.1669-7.9223 32.3204 3.4503 61.2654 9.0525 93.5694 12.7762l-8.2113-26.947c-1.322-4.6952.5542-9.8807 4.2677-12.7622l93.8212-76.2084-19.4262-9.1302c-8.5486-3.0543-6.1582-7.849-3.0937-19.4296l14.3152-52.0448-54.5018 11.4592c-5.3226.8048-8.8705-2.5749-9.6775-5.7926l-6.9973-24.503-43.101 48.251c-6.1291 7.7198-18.5486 7.7198-14.6777-10.1344l18.407-97.7271-24.697 12.7886c-6.9356 3.8622-13.8708 4.5036-17.7417-2.4114"/>\n</symbol>\n<symbol id="svg-format-list-bulleted" viewBox="0 0 32 32">\n<title>format-list-bulleted</title>\n<path d="M9.313 6.688h18.688v2.625h-18.688v-2.625zM9.313 17.313v-2.625h18.688v2.625h-18.688zM9.313 25.313v-2.625h18.688v2.625h-18.688zM5.313 22c1.125 0 2 0.938 2 2s-0.938 2-2 2-2-0.938-2-2 0.875-2 2-2zM5.313 6c1.125 0 2 0.875 2 2s-0.875 2-2 2-2-0.875-2-2 0.875-2 2-2zM5.313 14c1.125 0 2 0.875 2 2s-0.875 2-2 2-2-0.875-2-2 0.875-2 2-2z"/>\n</symbol>\n<symbol id="svg-globe" viewBox="0 0 30 30.74">\n  <path d="M16,31.5A14.35,14.35,0,0,1,4.84,26a15,15,0,0,1,3-22.64,13.82,13.82,0,0,1,16.25,0,15,15,0,0,1,3,22.64A14.37,14.37,0,0,1,16,31.5Zm.5-8V30c2.57-.27,4.81-2.66,6.17-6.18C21,23.63,19,23.52,16.47,23.5Zm-7.11.3c1.35,3.5,3.57,5.88,6.11,6.17V23.5C13,23.52,11,23.63,9.36,23.8ZM5.6,25.39a14,14,0,0,0,6.38,4,13.12,13.12,0,0,1-3.62-5.5c-1.91.26-3,.59-3.23.86C5.28,25,5.44,25.2,5.6,25.39Zm18-1.47a13.23,13.23,0,0,1-3.59,5.48,13.94,13.94,0,0,0,6.29-4c.17-.2.33-.4.48-.61C26.68,24.52,25.61,24.19,23.64,23.92ZM24,23a8.26,8.26,0,0,1,3.49,1A13.83,13.83,0,0,0,30,16.5H25A23.15,23.15,0,0,1,24,23ZM2,16.5A13.92,13.92,0,0,0,4.5,24,8.42,8.42,0,0,1,8,23,23.14,23.14,0,0,1,7,16.5Zm14.49,6a63.44,63.44,0,0,1,6.5.35,22.46,22.46,0,0,0,1-6.36H16.47ZM8,16.5a22.39,22.39,0,0,0,1,6.35c1.89-.21,4.15-.32,6.44-.34v-6Zm17-1h5a13.8,13.8,0,0,0-2.4-7.35l-.08.07a7.79,7.79,0,0,1-3.44,1A23.37,23.37,0,0,1,25,15.5Zm-8.53,0H24a22.73,22.73,0,0,0-.95-6.1,62,62,0,0,1-6.58.35ZM8,15.5h7.47V9.75A61.11,61.11,0,0,1,9,9.4,22.34,22.34,0,0,0,8,15.5Zm-6,0H7A23.5,23.5,0,0,1,8,9.27a7.79,7.79,0,0,1-3.49-1l-.08-.07A13.9,13.9,0,0,0,2,15.5Zm7.28-7c1.61.17,3.69.29,6.21.3V2C12.87,2.33,10.6,4.82,9.26,8.46ZM16.47,2V8.76a62.56,62.56,0,0,0,6.26-.31C21.39,4.79,19.1,2.29,16.47,2Zm-8,2.19A14.7,14.7,0,0,0,5.12,7.49c.15.25,1.2.58,3.15.85A13.33,13.33,0,0,1,12,2.58,14,14,0,0,0,8.43,4.21ZM20.05,2.6a13.35,13.35,0,0,1,3.68,5.72c1.82-.25,2.85-.57,3.09-.84a14.82,14.82,0,0,0-3.3-3.27A14.26,14.26,0,0,0,20.05,2.6Z" transform="translate(-0.97 -0.76)"/>\n</symbol>\n<symbol id="svg-graduation-hat" viewBox="0 0 32 32">\n<title>graduation-hat</title>\n<path d="M1.389 17.66c-0.8 0.176-1.389 0.879-1.389 1.719 0 0.688 0.395 1.284 0.971 1.572l0.010 0.005c-0.451 1.216-0.712 2.621-0.712 4.086 0 0.335 0.014 0.666 0.040 0.994l-0.003-0.043h2.905c0.024-0.285 0.038-0.616 0.038-0.951 0-1.465-0.261-2.87-0.739-4.169l0.027 0.084c0.586-0.294 0.981-0.889 0.981-1.577 0-0.84-0.59-1.543-1.378-1.717l-0.012-0.002v-2.501l-0.738-0.386z"/>\n<path d="M8.001 25.434c2.366 1.068 5.129 1.691 8.038 1.691s5.672-0.622 8.164-1.741l-0.126 0.051c0.785-0.352 1.322-1.126 1.322-2.026 0 0 0 0 0 0v0-5.876l-9.36 4.904-9.36-4.896v5.868c0 0.9 0.537 1.674 1.308 2.020l0.014 0.006z"/>\n<path d="M32 13.239l-15.962 8.364-15.989-8.364 15.989-8.364z"/>\n</symbol>\n<symbol id="svg-grid-plus" viewBox="0 0 32 32">\n<title>grid-plus</title>\n  <g data-name="grid">\n    <path d="M.01 0h9.12v9.1H.01zM11.45 0h9.08v9.06h-9.08zM22.91 0h9.16v9.14h-9.16zM0 11.49h9.12v9.08H0zM.01 22.87h9.03V32H.01zM15.07 11.48h-3.65v3.67a11.13 11.13 0 0 1 3.65-3.67zM11.48 26.57v5.4h9v-.11a11.05 11.05 0 0 1-9-5.29zM32.13 11.48h-5.5a11 11 0 0 1 5.24 9.09h.26zM23.01 31.69V32h9v-9.14h-.36a11 11 0 0 1-8.64 8.83z"/>\n  </g>\n  <path data-name="plus" d="M28.78 23.06h-5.67v5.67h-4.53v-5.67H12.9v-4.54h5.68v-5.67h4.53v5.67h5.67v4.54z"/>\n</symbol>\n<symbol id="svg-grid" viewBox="0 0 576 576"><rect x="207" y="414" width="162" height="162" rx="21.6"/><rect y="414" width="162" height="162" rx="21.6"/><rect x="414" y="414" width="162" height="162" rx="21.6"/><rect x="207" y="207" width="162" height="162" rx="21.6"/><rect y="207" width="162" height="162" rx="21.6"/><rect x="414" y="207" width="162" height="162" rx="21.6"/><rect x="207" width="162" height="162" rx="21.6"/><rect width="162" height="162" rx="21.6"/><rect x="414" width="162" height="162" rx="21.6"/></symbol>\n<symbol id="svg-groups" viewBox="0 0 576.31 575.31"><circle cx="285" cy="144" r="108"/><circle cx="474.62" cy="134.1" r="61.43"/><circle cx="101.48" cy="134.43" r="61.43"/><path d="M576 343.74c-3.86-53-18.5-99.31-39.48-130.25a21.62 21.62 0 00-27.16-7.21 82 82 0 01-69.49 0 21.64 21.64 0 00-27.17 7.21c-9.21 13.58-17.19 30.13-23.58 48.9-1.52-2.09-3-4.14-4.59-6.14a21.54 21.54 0 00-27.78-5.38 144.16 144.16 0 01-143.52 0 21.54 21.54 0 00-27.78 5.38c-.18.23-.35.48-.53.71a200.09 200.09 0 00-21.54-43.14 21.63 21.63 0 00-27.17-7.2 82.14 82.14 0 01-69.49 0 21.62 21.62 0 00-27.16 7.2C18.59 244.77 4 291.06.08 344.08a21.63 21.63 0 0021.54 23.25H130.7c-13.74 44.24-22.58 94.86-25 149A21.63 21.63 0 00127.24 539h315.52a21.63 21.63 0 0021.59-22.63C461.88 462.06 453 411.31 439.2 367h115.27A21.62 21.62 0 00576 343.74z"/></symbol>\n<symbol id="svg-hand-cursor" viewBox="0 0 32 32">\n<title>hand-cursor</title>\n  <path d="M21 30H9a1 1 0 01-1-1c0-1.538-.734-2.428-1.847-3.774-.617-.747-1.315-1.593-2.003-2.698C2.256 19.48.617 15.979.21 14.604c-.396-1.34-.13-2.202.222-2.673C.88 11.331 1.615 11 2.5 11c1.169 0 2.447 1.004 3.5 2.301V3c0-1.654 1.346-3 3-3s3 1.346 3 3v4.171a3 3 0 013.528 1.215A2.994 2.994 0 0117 8c1.381 0 2.548.939 2.895 2.211A3.004 3.004 0 0124 13v3c0 2.551-.521 4.659-1.024 6.697C22.474 24.728 22 26.645 22 29a1 1 0 01-1 1zM9.924 28h10.102c.112-2.156.567-3.996 1.008-5.783.497-2.01.966-3.909.966-6.217v-3.2a1.001 1.001 0 00-2 0V14a1 1 0 11-2 0v-3.2a1.001 1.001 0 00-2 0V13a1 1 0 11-2 0V9.8a1.001 1.001 0 00-2 0V12a1 1 0 11-2 0V2.8a1.001 1.001 0 00-2 0V18a1 1 0 11-2 0v-.821C5.121 14.877 3.164 12.9 2.5 12.9c-.232 0-.391.053-.467.228-.056.131-.11.433.025.89.313 1.057 1.843 4.32 3.792 7.454.616.991 1.241 1.748 1.845 2.48C8.737 25.213 9.659 26.33 9.924 28z"/>\n</symbol>\n<symbol id="svg-heart-empty" viewBox="0 0 32 32">\n<title>heart-empty</title>\n<path d="M28.742 11.855c0 3.032-3.066 5.851-3.115 5.9l-9.612 9.264-9.628-9.281c-0.033-0.033-3.099-2.851-3.099-5.883 0-4.657 3.149-5.635 5.8-5.635 2.469 0 5.254 2.668 6.115 3.696 0.398 0.481 1.226 0.481 1.624 0 0.861-1.028 3.645-3.696 6.115-3.696 2.652 0 5.8 0.977 5.8 5.635zM30.864 11.855c0-4.856-2.967-7.756-7.922-7.756-2.9 0-5.617 2.287-6.927 3.58-1.31-1.293-4.027-3.58-6.927-3.58-4.955 0-7.922 2.9-7.922 7.756 0 3.978 3.645 7.309 3.779 7.425l10.341 9.977c0.199 0.199 0.465 0.298 0.729 0.298s0.53-0.099 0.729-0.298l10.325-9.943c0.148-0.148 3.795-3.481 3.795-7.457z"/>\n</symbol>\n<symbol id="svg-heart" viewBox="0 0 32 32">\n<title>heart</title>\n<path d="M16.015 29.554c0.266 0 0.53-0.099 0.729-0.298l10.325-9.943c0.148-0.148 3.795-3.481 3.795-7.457 0-4.856-2.967-7.756-7.922-7.756-2.9 0-5.617 2.287-6.927 3.58-1.31-1.293-4.027-3.58-6.927-3.58-4.955 0-7.922 2.9-7.922 7.756 0 3.978 3.645 7.309 3.779 7.424l10.341 9.977c0.199 0.199 0.465 0.298 0.729 0.298z"/>\n</symbol>\n<symbol id="svg-heartbeat" viewBox="0 0 32 32">\n<title>heartbeat</title>\n<path d="M22.857 18.286h5.446c-0.214 0.232-0.357 0.357-0.393 0.393l-11.125 10.714c-0.214 0.214-0.5 0.321-0.786 0.321s-0.571-0.107-0.786-0.321l-11.143-10.75c-0.036-0.018-0.179-0.143-0.375-0.357h6.589c0.518 0 0.982-0.357 1.107-0.857l1.25-5.018 3.393 11.911c0.143 0.482 0.589 0.821 1.107 0.821v0c0.5 0 0.946-0.339 1.089-0.821l2.607-8.661 1 2c0.196 0.375 0.589 0.625 1.018 0.625zM32 10.643c0 2.054-0.893 3.929-1.839 5.357h-6.589l-1.982-3.946c-0.196-0.411-0.661-0.661-1.107-0.625-0.482 0.054-0.875 0.357-1 0.821l-2.304 7.679-3.5-12.25c-0.143-0.482-0.589-0.821-1.125-0.821-0.518 0-0.964 0.357-1.089 0.857l-2.071 8.286h-7.554c-0.946-1.429-1.839-3.304-1.839-5.357 0-5.232 3.196-8.357 8.536-8.357 3.125 0 6.054 2.464 7.464 3.857 1.411-1.393 4.339-3.857 7.464-3.857 5.339 0 8.536 3.125 8.536 8.357z"/>\n</symbol>\n<symbol id="svg-highlighter" viewBox="0 0 577 576"><rect x=".01" y="503.78" width="576.99" height="72.22" rx="21.6"/><path d="M563.28 88.25l-74.36-74.36a21.6 21.6 0 00-28.92-1.5L206 218.52a21.61 21.61 0 00-8 16.77v55a21.6 21.6 0 01-3.84 12.3l-66.9 96.63a21.59 21.59 0 00-.57 23.68L81.54 468h50.92l19.48-19.48a21.6 21.6 0 0024.88.22l96.63-66.9a21.6 21.6 0 0112.3-3.84h55a21.58 21.58 0 0016.71-7.91l207.25-252.88a21.59 21.59 0 00-1.43-28.96z"/></symbol>\n<symbol id="svg-home" viewBox="0 0 577 576"><path d="M570.46 270.77L304.56 7.47a22.48 22.48 0 00-31.57 0L6.54 271.35a22 22 0 000 31.29l22 21.7a22.47 22.47 0 0031.53 0L73 311.56V556c0 11.07 10.12 20 22.6 20h79.8c12.48 0 22.6-9 22.6-20V340.73c0-11.07 10.12-20 22.6-20h135.8c12.48 0 22.6 9 22.6 20V556c0 11.07 10.12 20 22.6 20h79.8c12.48 0 22.6-9 22.6-20V310.59l13.13 13a22.47 22.47 0 0031.56 0L570.46 302a22 22 0 000-31.23z"/></symbol>\n<symbol id="svg-hospitalist" viewBox="0 0 32 32">\n<title>Hospitalist content</title>\n<path d="M25.158 24.967h-4.571v-6.857h-9.142v6.857h-4.571v-18.286h4.571v6.857h9.144l-0.002-6.857h4.571v18.286zM25.601-0.174h-19.143c-3.537 0-6.406 2.877-6.406 6.413v19.174c0 3.537 2.869 6.413 6.406 6.413h19.143c3.537 0 6.414-2.875 6.414-6.413v-19.174c0-3.536-2.877-6.413-6.414-6.413z"/>\n</symbol>\n<symbol id="svg-hvc" viewBox="0 0 33 33">\n<title>high value care</title>\n<path d="M0.535 9.953v0c0-0.634 0-1.269 0.053-1.905h7.083l-0.389 0.339c0.276-2.019 1.877-3.543 3.79-3.543 0 0 0 0.393 0 0.393v-0.393c1.913 0 3.515 1.524 3.791 3.543l-0.389-0.339h8.202c0.508 0 0.904 0.435 0.904 0.953s-0.396 0.953-0.904 0.953h-8.202l0.389-0.34c-0.209 1.537-1.2 2.821-2.556 3.322l0.257-0.368v12.294c0 2.304 2.063 3.822 5.584 4.673 1.243 0.301 2.579 0.494 3.918 0.6 0.821 0.065 1.473 0.087 1.869 0.086 0.224-0.001 0.402 0.181 0.397 0.402-0.003 0.115-0.007 0.321-0.011 0.594-0 0.035-0.001 0.070-0.002 0.105-2.74 0-5.479-0.001-8.219-0.001-4.012 0-8.025 0.002-12.037-0.003-0.252 0-0.51-0.025-0.757-0.081-0.826-0.185-1.518-0.629-2.005-1.239 0.926-0.11 1.837-0.266 2.703-0.474 3.517-0.845 5.577-2.358 5.577-4.662v-12.294l0.257 0.368c-1.356-0.501-2.347-1.785-2.556-3.322l0.389 0.34c0 0-7.118-0.001-7.136-0.002zM23.55 30.609v0c-0.001-0-0.002-0-0.003-0 0-0.001 0-0.002 0-0.003l0.003 0.003zM23.931 31.007v0c0-0.003 0-0.006 0-0.010l0.009 0.009c-0.003 0-0.006 0-0.009 0zM29.431 19.873c-0.127 3.379-3.395 6.086-7.413 6.086s-7.289-2.707-7.416-6.086h14.829zM22.117 10.16l6.339 9.993c0.155 0.244 0.478 0.316 0.722 0.162s0.316-0.478 0.162-0.722l-6.339-9.993c-0.155-0.244-0.478-0.316-0.722-0.162s-0.316 0.478-0.162 0.722v0zM22.139 9.567l-7.437 9.993c-0.173 0.232-0.125 0.56 0.107 0.732s0.56 0.125 0.732-0.107l7.437-9.993c0.173-0.232 0.125-0.56-0.107-0.732s-0.56-0.125-0.732 0.107v0zM0.219 10.161l6.358 9.993c0.155 0.244 0.479 0.316 0.723 0.161s0.316-0.479 0.161-0.723l-6.358-9.993c-0.155-0.244-0.479-0.316-0.723-0.161s-0.316 0.479-0.161 0.723v0zM3.975 30.958c-0.23 0-0.455-0.023-0.662-0.070-1.454-0.325-2.436-1.559-2.436-3.054 0-6.262 0-9.045 0-12.524 0-4.146 0.001-7.847 0.002-11.386 0-0.155 0.013-0.323 0.038-0.513 0.233-1.637 1.488-2.726 3.147-2.726 1.708 0 1.708 0 3.415-0 5.465-0 7.894-0 10.93 0 3.474 0 6.587 0.001 9.564 0.003 0.245 0 0.49 0.026 0.718 0.077 1.491 0.33 2.462 1.548 2.462 3.084 0 1.653 0 2.975 0 5.95 0 5.84 0 8.435-0 11.68-0 2.177-0.001 4.211-0.002 6.171 0 0.196-0.014 0.403-0.042 0.627-0.199 1.556-1.485 2.685-3.059 2.685-2.23 0.001-4.014 0.001-8.026 0-2.006-0-2.898-0-4.012-0-0.675 0-1.216 0-2.432 0-4.802 0-6.937-0-9.605-0.003h-0.001zM3.975 31.819c2.669 0.003 4.803 0.004 9.606 0.003 1.216-0 1.756-0 2.431-0 1.114 0 2.006 0 4.012 0 4.012 0.001 5.796 0.001 8.026-0 2.007 0 3.66-1.451 3.913-3.44 0.032-0.26 0.048-0.501 0.048-0.734 0.001-1.959 0.001-3.994 0.002-6.171 0.001-3.244 0.001-5.84 0-11.68-0-2.975-0-4.297-0-5.95 0-1.939-1.25-3.506-3.136-3.924-0.289-0.064-0.597-0.097-0.904-0.097-2.977-0.002-6.090-0.003-9.564-0.003-3.036-0-5.465-0-10.93-0-1.708 0-1.708 0-3.415 0-2.088 0-3.706 1.404-4 3.469-0.031 0.229-0.046 0.434-0.046 0.631-0.001 3.539-0.002 7.239-0.002 11.386-0 3.479-0 6.262-0 12.524 0 1.897 1.261 3.481 3.109 3.894 0.271 0.061 0.559 0.091 0.851 0.091h-0.001zM0.319 25.474c0-1.887 0-3.774 0-5.661l7.246-0.041c-0.292 3.233-3.444 5.696-7.246 5.702v0z"/>\n</symbol>\n<symbol id="svg-icon-mksap19-4c" viewBox="0 0 15.58 15.6">\n<title>icon-mksap19-4c</title>\n  <path fill="#1d5693" d="M1.98.5H13.6a1.35 1.35 0 011.11.38 1.38 1.38 0 01.37 1.13v11.58a1.37 1.37 0 01-.35 1.08 1.39 1.39 0 01-1.13.4H1.98a1.39 1.39 0 01-1.11-.38 1.38 1.38 0 01-.37-1.1V2.01A1.37 1.37 0 01.89.87 1.36 1.36 0 011.98.5z"/>\n  <path fill="#b51946" d="M13.79.01h-12A1.8 1.8 0 00-.02 1.78v12a1.8 1.8 0 001.79 1.78h12a1.79 1.79 0 001.76-1.82v-12A1.8 1.8 0 0013.79.01zm1.29 13.78a1.28 1.28 0 01-1.29 1.27H1.78A1.28 1.28 0 01.5 13.79v-12A1.28 1.28 0 011.79.51h12a1.28 1.28 0 011.29 1.27z"/>\n  <path fill="#f0c33b" d="M3.06 4.41l-1.47.42-.29-.64 4-1.67h.59v9.38c0 .47.63.53 1.48.61v.58H1.56v-.58c.84-.08 1.53-.14 1.53-.61zM11.78 11.78a4.46 4.46 0 01-1.14 1.23 6.11 6.11 0 01-1.91.91l.06.18.06.19.07.18.06.19a9.38 9.38 0 003.62-1.5 8.54 8.54 0 001.38-1.26 7.87 7.87 0 001.06-1.55v-6l-.06-.09-.14-.19-.06-.06-.07-.08a3.57 3.57 0 00-.55-.48 3.6 3.6 0 00-.62-.44 5 5 0 00-1-.38 5.55 5.55 0 00-1.15-.13 5.05 5.05 0 00-1.59.27 4.63 4.63 0 00-1.38.79 3.6 3.6 0 00-1 1.29 4.09 4.09 0 00-.37 1.76 4.5 4.5 0 00.2 1.4 3.4 3.4 0 00.61 1.2 3 3 0 001 .79 3.59 3.59 0 001.48.29h.43a5.59 5.59 0 00.59-.11 4.12 4.12 0 00.67-.24 2.48 2.48 0 00.63-.37 6.46 6.46 0 01-.22 1.08 5.14 5.14 0 01-.66 1.13zm.27-3a2.2 2.2 0 01-.62.12 1.2 1.2 0 01-1-.73 4.19 4.19 0 01-.42-2 5.23 5.23 0 01.35-2.16 1 1 0 01.91-.63c.55 0 .92.78 1.14 1.82a13.12 13.12 0 01.21 3.31 2.55 2.55 0 01-.57.27z"/>\n</symbol>\n<symbol id="svg-icon-mksap19-w" viewBox="0 0 299.78 300.17">\n<title id="logo-title">ACP MKSAP 19"</title>\n<desc id="description">MKSAP 19 icon in white</desc>\n  <path fill="none" d="M38.06,9.62H261.71C263,9.45,274.3,8.17,283,16.85s7.37,19.88,7.2,21.19v223.5c.18,1.46,1.32,12.14-6.7,20.66-8.65,9.19-20.52,7.92-21.75,7.77H38.06c-1.29.16-12.72,1.42-21.37-7.39-8.46-8.61-7.24-19.68-7.07-21V38c-.16-1.34-1.28-12.61,7.43-21.22S36.68,9.46,38.06,9.62Z"/>\n  <path fill="#fff" d="M265.33,0H34.44A34.44,34.44,0,0,0,0,34.26V265.92a34.43,34.43,0,0,0,34.44,34.25H265.92a34.43,34.43,0,0,0,33.86-35V34.26A34.44,34.44,0,0,0,265.33,0Zm24.83,265.35v.19A24.62,24.62,0,0,1,265.33,290H34.25A24.61,24.61,0,0,1,9.62,265.35V34.26A24.62,24.62,0,0,1,34.44,9.82l230.89-.2h.21a24.62,24.62,0,0,1,24.62,24.64Z"/>\n  <path fill="#fff" d="M58.88,84.86,30.59,92.94,25,80.63l77-32.14h11.36V229c0,9.06,12.12,10.21,28.47,11.75v11.16H30V240.72C46.18,239.18,59.45,238,59.45,229Z"/>\n  <path fill="#fff" d="M226.66,226.66a86.71,86.71,0,0,1-21.93,23.68A115.36,115.36,0,0,1,168,267.85l1.16,3.46,1.15,3.66,1.34,3.46,1.16,3.67a179.56,179.56,0,0,0,69.66-28.87A164.47,164.47,0,0,0,269.77,229a150,150,0,0,0,20.39-29.82V84.29L288.43,82l-2.69-3.65-1.35-1.54-1.34-1.54A83.08,83.08,0,0,0,272.46,66a69,69,0,0,0-11.94-7.5,90,90,0,0,0-19.24-7.31,102.73,102.73,0,0,0-22.11-2.5,97.12,97.12,0,0,0-30.6,5.19A86.93,86.93,0,0,0,162,69.08a71.12,71.12,0,0,0-19.24,24.83,78.89,78.89,0,0,0-7.12,33.86,90.27,90.27,0,0,0,3.85,27.13,65.27,65.27,0,0,0,11.74,22.32,56.45,56.45,0,0,0,19.24,15.21A68.8,68.8,0,0,0,199,198a51.77,51.77,0,0,0,8.26,0,106.5,106.5,0,0,0,11.35-2.13,86.4,86.4,0,0,0,12.89-4.62,50.78,50.78,0,0,0,12.12-7.1,129.94,129.94,0,0,1-4.22,20.76A92,92,0,0,1,226.66,226.66ZM231.87,169a36.73,36.73,0,0,1-11.93,2.31,23.28,23.28,0,0,1-19.25-14,79.83,79.83,0,0,1-8.08-38.48,98.86,98.86,0,0,1,6.73-41.95,19.24,19.24,0,0,1,17.51-12.12c10.58,0,17.7,15,21.93,35a246,246,0,0,1,4,63.69A42.38,42.38,0,0,1,231.87,169Z"/>\n</symbol>\n<symbol id="svg-image" viewBox="0 0 32 32">\n<title>image</title>\n<path d="M10.987 9.953c0-1.765-1.434-3.197-3.2-3.197s-3.2 1.432-3.2 3.197c0 1.765 1.434 3.197 3.2 3.197s3.2-1.432 3.2-3.197zM27.444 25.032v-9.137l-6.857-6.862-8.303 8.591-3.123-1.734-4.571 4.568v4.574h22.856zM29.196 4.464c0.283 0 0.533 0.25 0.533 0.533v21.789c0 0.283-0.25 0.533-0.533 0.533h-26.36c-0.283 0-0.533-0.25-0.533-0.533v-21.789c0-0.283 0.25-0.533 0.533-0.533h26.36zM32.015 26.786v-21.946c0-1.465-1.2-2.664-2.667-2.664v0h-26.665c-1.467 0-2.667 1.198-2.667 2.664v22.099c0 1.465 1.2 2.664 2.667 2.664h26.665c1.467 0 2.667-1.354 2.667-2.819z"/>\n</symbol>\n<symbol id="svg-images" viewBox="0 0 36 32">\n<title>images</title>\n<path d="M34 4h-2v-2c0-1.1-0.9-2-2-2h-28c-1.1 0-2 0.9-2 2v24c0 1.1 0.9 2 2 2h2v2c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-24c0-1.1-0.9-2-2-2zM4 6v20h-1.996c-0.001-0.001-0.003-0.002-0.004-0.004v-23.993c0.001-0.001 0.002-0.003 0.004-0.004h27.993c0.001 0.001 0.003 0.002 0.004 0.004v1.996h-24c-1.1 0-2 0.9-2 2v0zM34 29.996c-0.001 0.001-0.002 0.003-0.004 0.004h-27.993c-0.001-0.001-0.003-0.002-0.004-0.004v-23.993c0.001-0.001 0.002-0.003 0.004-0.004h27.993c0.001 0.001 0.003 0.002 0.004 0.004v23.993z"/>\n<path d="M30 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/>\n<path d="M32 28h-24v-4l7-12 8 10h2l7-6z"/>\n</symbol>\n<symbol id="svg-info-circle-outline" viewBox="0 0 32 32">\n<title>info-circle-outline</title>\n<path d="M14 9.5c0-0.825 0.675-1.5 1.5-1.5h1c0.825 0 1.5 0.675 1.5 1.5v1c0 0.825-0.675 1.5-1.5 1.5h-1c-0.825 0-1.5-0.675-1.5-1.5v-1z"/>\n<path d="M20 24h-8v-2h2v-6h-2v-2h6v8h2z"/>\n<path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"/>\n</symbol>\n<symbol id="svg-info-circle" viewBox="0 0 27 32">\n<title>info-circle</title>\n<path d="M18.286 24.571v-2.857c0-0.321-0.25-0.571-0.571-0.571h-1.714v-9.143c0-0.321-0.25-0.571-0.571-0.571h-5.714c-0.321 0-0.571 0.25-0.571 0.571v2.857c0 0.321 0.25 0.571 0.571 0.571h1.714v5.714h-1.714c-0.321 0-0.571 0.25-0.571 0.571v2.857c0 0.321 0.25 0.571 0.571 0.571h8c0.321 0 0.571-0.25 0.571-0.571zM16 8.571v-2.857c0-0.321-0.25-0.571-0.571-0.571h-3.429c-0.321 0-0.571 0.25-0.571 0.571v2.857c0 0.321 0.25 0.571 0.571 0.571h3.429c0.321 0 0.571-0.25 0.571-0.571zM27.429 16c0 7.571-6.143 13.714-13.714 13.714s-13.714-6.143-13.714-13.714 6.143-13.714 13.714-13.714 13.714 6.143 13.714 13.714z"/>\n</symbol>\n<symbol id="svg-key" viewBox="0 0 577 576"><path d="M410.5 0a166.52 166.52 0 00-140.8 255.39L13 512.1a18 18 0 000 25.45L38.45 563a18 18 0 0025.45 0l38.19-38.19a18 18 0 0125.45 0l26.59 26.59a18 18 0 0025.46 0L205 526a18 18 0 000-25.46l-26.58-26.59a18 18 0 0125.45-25.45L230.5 475a18 18 0 0025.5 0l25.45-25.45a18 18 0 000-25.46l-26.59-26.59a18 18 0 010-25.45l65.57-65.57A166.5 166.5 0 10410.5 0zm0 259.26a92.76 92.76 0 1192.76-92.76 92.86 92.86 0 01-92.76 92.76z"/></symbol>\n<symbol id="svg-keyboard-arrow-left" viewBox="0 0 24 24">\n<title>keyboard-arrow-left</title>\n<path d="M15.422 16.078l-1.406 1.406-6-6 6-6 1.406 1.406-4.594 4.594z"/>\n</symbol>\n<symbol id="svg-keyboard-arrow-right" viewBox="0 0 24 24">\n<title>keyboard-arrow-right</title>\n<path d="M8.578 16.359l4.594-4.594-4.594-4.594 1.406-1.406 6 6-6 6z"/>\n</symbol>\n<symbol id="svg-lab" viewBox="0 0 32 32">\n<title>lab</title>\n<path d="M29.884 25.14l-9.884-16.47v-6.671h1c0.55 0 1-0.45 1-1s-0.45-1-1-1h-10c-0.55 0-1 0.45-1 1s0.45 1 1 1h1v6.671l-9.884 16.47c-2.264 3.773-0.516 6.86 3.884 6.86h20c4.4 0 6.148-3.087 3.884-6.86zM7.532 20l6.468-10.779v-7.221h4v7.221l6.468 10.779h-16.935z"/>\n</symbol>\n<symbol id="svg-lightbulb" viewBox="0 0 18 32">\n<title>lightbulb</title>\n<path d="M13.143 10.286c0 0.304-0.268 0.571-0.571 0.571s-0.571-0.268-0.571-0.571c0-1.232-1.911-1.714-2.857-1.714-0.304 0-0.571-0.268-0.571-0.571s0.268-0.571 0.571-0.571c1.661 0 4 0.875 4 2.857zM16 10.286c0-3.571-3.625-5.714-6.857-5.714s-6.857 2.143-6.857 5.714c0 1.143 0.464 2.339 1.214 3.214 0.339 0.393 0.732 0.768 1.089 1.179 1.268 1.518 2.339 3.304 2.518 5.321h4.071c0.179-2.018 1.25-3.804 2.518-5.321 0.357-0.411 0.75-0.786 1.089-1.179 0.75-0.875 1.214-2.071 1.214-3.214zM18.286 10.286c0 1.839-0.607 3.429-1.839 4.786s-2.857 3.268-3 5.179c0.518 0.304 0.839 0.875 0.839 1.464 0 0.429-0.161 0.839-0.446 1.143 0.286 0.304 0.446 0.714 0.446 1.143 0 0.589-0.304 1.125-0.804 1.446 0.143 0.25 0.232 0.554 0.232 0.839 0 1.161-0.911 1.714-1.946 1.714-0.464 1.036-1.5 1.714-2.625 1.714s-2.161-0.679-2.625-1.714c-1.036 0-1.946-0.554-1.946-1.714 0-0.286 0.089-0.589 0.232-0.839-0.5-0.321-0.804-0.857-0.804-1.446 0-0.429 0.161-0.839 0.446-1.143-0.286-0.304-0.446-0.714-0.446-1.143 0-0.589 0.321-1.161 0.839-1.464-0.143-1.911-1.768-3.821-3-5.179s-1.839-2.946-1.839-4.786c0-4.857 4.625-8 9.143-8s9.143 3.143 9.143 8z"/>\n</symbol>\n<symbol id="svg-link-ext" viewBox="0 0 32 32">\n<title>link-ext</title>\n<path d="M26.646 17.395l-4.523-4.523-10.774 10.773-3.017-3.017 10.766-10.769-4.515-4.527 12.063-0-0 12.063zM15.827 9.604l0.258 0.259-10.769 10.765 6.031 6.031 10.775-10.772 0.272 0.272-0.006 12.633-19.18-0.001v-19.187h12.618zM28.791 3.209l-19.354-0.006 4.262 4.27h-12.622v23.451l23.444 0.001 0.006-12.633 4.265 4.264v-19.346z"/>\n</symbol>\n<symbol id="svg-link" viewBox="0 0 32 32">\n<title>link</title>\n<path d="M10.722 18.615c-0.338 0.369-0.596 0.781-0.596 1.344 0 0.976 0.791 1.766 1.766 1.766 0.563 0 0.973-0.258 1.344-0.596l7.843-7.837c0.443-0.434 0.824-0.893 0.824-1.578 0-0.976-0.791-1.766-1.766-1.766-0.685 0-1.144 0.381-1.578 0.824l0.003 0.003-7.84 7.84zM10.107 17.289c0.168 0 0.324 0.021 0.472 0.060l2.605-2.605c-0.895-0.625-1.964-0.969-3.077-0.969-1.398 0-2.742 0.533-3.736 1.527l-3.809 3.791c-1.012 0.994-1.565 2.336-1.565 3.754 0 1.398 0.533 2.742 1.527 3.736l2.686 2.704c0.976 0.994 2.336 1.565 3.736 1.565 1.418 0 2.742-0.533 3.754-1.545l3.828-3.828c0.994-0.994 1.545-2.356 1.545-3.754 0-1.113-0.345-2.171-0.968-3.060l-2.617 2.617c0.035 0.14 0.053 0.287 0.053 0.443 0 0.459-0.185 0.921-0.515 1.251l-3.828 3.828c-0.332 0.332-0.773 0.515-1.251 0.515-0.459 0-0.901-0.185-1.233-0.515l-2.686-2.704c-0.312-0.332-0.479-0.791-0.479-1.251s0.165-0.921 0.497-1.251l3.81-3.791c0.332-0.332 0.791-0.515 1.251-0.515zM17.551 10.379c-0.030-0.135-0.045-0.279-0.045-0.431 0-0.459 0.165-0.921 0.497-1.251l3.828-3.828c0.332-0.332 0.773-0.515 1.251-0.515 0.459 0 0.901 0.185 1.233 0.515l2.686 2.704c0.312 0.332 0.497 0.791 0.497 1.251s-0.185 0.921-0.515 1.251l-3.809 3.791c-0.332 0.332-0.791 0.515-1.251 0.515-0.168 0-0.324-0.021-0.471-0.060l-2.605 2.605c0.895 0.625 1.964 0.968 3.077 0.968 1.398 0 2.742-0.533 3.736-1.527l3.809-3.791c1.012-0.994 1.565-2.336 1.565-3.754 0-1.398-0.533-2.742-1.527-3.736l-2.686-2.704c-0.976-0.994-2.336-1.565-3.736-1.565-1.418 0-2.742 0.533-3.754 1.545l-3.828 3.828c-0.994 0.994-1.545 2.356-1.545 3.754 0 1.113 0.345 2.171 0.969 3.060l2.629-2.629z"/>\n</symbol>\n<symbol id="svg-list-item-alt" viewBox="0 0 32 32">\n<title>list-item-alt</title>\n<path d="M9.151 23.756v4.576h20.591v-4.576h-20.591zM2.289 23.756v4.576h4.576v-4.576h-4.576zM9.151 16.892v4.576h20.591v-4.576h-20.591zM2.289 16.892v4.576h4.576v-4.576h-4.576zM9.151 10.027v4.576h20.591v-4.576h-20.591zM2.289 10.027v4.576h4.576v-4.576h-4.576zM9.151 3.164v4.576h20.591v-4.576h-20.591zM2.289 3.164v4.576h4.576v-4.576h-4.576z"/>\n</symbol>\n<symbol id="svg-list-item" viewBox="0 0 32 32">\n<title>list-item</title>\n<path d="M9.697 20.967v6.317h21.057v-6.317h-21.057zM1.275 20.967v6.317h6.317v-6.317h-6.317zM9.697 12.609v6.317h21.057v-6.317h-21.057zM1.275 12.609v6.317h6.317v-6.317h-6.317zM9.697 4.187v6.317h21.057v-6.317h-21.057zM1.275 4.187v6.317h6.317v-6.317h-6.317z"/>\n</symbol>\n<symbol id="svg-lock-blocked" viewBox="0 0 32 32">\n<title>lock-blocked</title>\n<path d="M11.875 8v1.625l-2.438-2.438c0.375-3.313 3.125-5.875 6.563-5.875 3.688 0 6.688 3 6.688 6.688v2.688h1.313c1.438 0 2.688 1.188 2.688 2.625v11.125l-13.813-13.75h7.25v-2.688c0-2.25-1.875-4.125-4.125-4.125s-4.125 1.875-4.125 4.125zM28 29.063l-1.625 1.625-1.5-1.5c-0.25 0.063-0.563 0.125-0.875 0.125h-16c-1.438 0-2.688-1.188-2.688-2.625v-13.375c0-1 0.625-1.875 1.438-2.313l-2.75-2.688 1.625-1.625z"/>\n</symbol>\n<symbol id="svg-lock-open" viewBox="0 0 32 32">\n<title>lock-open</title>\n<path d="M5.348 17.071v12.857c0 0.536 0.536 1.071 1.071 1.071h19.286c0.536 0 1.071-0.536 1.071-1.071v-12.857c0-0.536-0.536-1.071-1.071-1.071h-13.929v-6.395c0-2.367 1.919-4.286 4.286-4.286s4.286 1.919 4.286 4.286c0 1.052 1.052 2.104 2.104 2.104h0.078c1.052 0 2.104-1.052 2.104-2.104v-0.034c0-4.734-3.837-8.571-8.571-8.571s-8.571 3.838-8.571 8.571v6.429h-1.071c-0.536 0-1.071 0.536-1.071 1.071z"/>\n</symbol>\n<symbol id="svg-lock" viewBox="0 0 32 32">\n<title>lock</title>\n<path d="M20.591 14.892h-9.151v-2.289c0-2.527 2.048-4.576 4.576-4.576s4.576 2.048 4.576 4.576v2.289zM4.576 16.035v13.727c0 0.572 0.572 1.144 1.144 1.144h20.591c0.572 0 1.144-0.572 1.144-1.144v-13.727c0-0.572-0.572-1.144-1.144-1.144h-1.144v-2.324c0-5.055-4.097-9.116-9.151-9.116s-9.151 4.062-9.151 9.116v2.324h-1.144c-0.572 0-1.144 0.572-1.144 1.144z"/>\n</symbol>\n<symbol id="svg-logo-acp-horiz-w" viewBox="0 0 275 32">\n<title>logo-acp-logo-horiz-w</title>\n<path d="M20.774 9.935c0.258 0.516 0.258 0.774 0.258 1.161s-0.387 0.903-0.903 0.903c0 0 0 0 0 0s0 0 0 0v0 0 0 0 0c0 0 0 0 0 0s0 0 0 0c-0.516 0-0.774-0.516-0.903-0.903 0-0.387 0-0.645 0.258-1.161s0.645-1.032 0.645-1.032v0 0c0 0 0.387 0.387 0.645 1.032zM28.903 4.129v0 21.935c0 1.935-1.548 3.484-3.484 3.484h-21.935c-1.935 0.129-3.484-1.419-3.484-3.355v-21.935c0-1.935 1.548-3.484 3.484-3.484h21.935c1.935-0.129 3.484 1.548 3.484 3.355zM28.129 4.129c0-1.548-1.161-2.71-2.71-2.71h-11.871l-0.129 0.129c-0.258 0.129-0.387 0.387-0.516 0.516-2.323 2.323-3.355 5.419-3.097 8.516v0.258c0.258 1.806 0.903 3.484 2.065 4.903 2.71 0 4.645-0.129 4.903-0.258 0.516-0.258 1.032-0.516 1.419-0.903-2.065-0.774-3.484-2.839-3.484-5.032 0-2.968 2.452-5.419 5.419-5.419s5.419 2.452 5.419 5.419c0 2.839-2.323 5.29-5.161 5.419-0.387 0.645-0.903 1.419-1.419 2.065-0.645 0.774-1.419 1.419-2.581 1.935 0.774 0.258 1.548 0.387 2.323 0.516 0.387 0 0.774 0 1.161 0 2.71 0 5.419-1.032 7.355-3.097 0.258-0.258 0.516-0.645 0.774-0.903l0.129-0.258v-11.097zM28.129 26.194v-9.548c-0.129 0.129-0.258 0.258-0.387 0.387-2.065 2.065-4.903 3.355-7.871 3.355v0c-1.419 0-2.71-0.258-4.129-0.774l-0.387-0.258c-1.419 0.516-3.742 1.29-6.839 2.194-1.806 0.645-2.194 0.645-2.968 1.032-0.645 0.258-0.774 0.387-1.29 0.903-0.903 0.903-0.903 3.355 0.258 4.387 0.387 0.387 1.29 0.774 2.065 1.032h18.71c1.677 0 2.839-1.29 2.839-2.71zM0.774 15.742c3.613 0 7.226 0 10.194 0-3.097-4.258-2.452-10.323 1.29-14.194 0 0 0.129-0.129 0.129-0.129h-8.903c-1.548 0-2.71 1.161-2.71 2.71v6.452c0.258 0 0.516-0.129 0.774-0.129-0.258-0.258-0.258-0.516-0.258-0.774 0-0.645 0.516-1.161 1.29-1.161s1.29 0.516 1.29 1.161c0 0.258-0.129 0.516-0.258 0.774 0.774 0.129 2.194 0.774 2.839 1.677 0.774 1.161 1.548 0.258 1.935 1.032 0.129 0.258 0.258 0.387 0.516 0.903 0.129 0.258-0.129 0.645-0.387 0.645s-5.806 0-5.806 0v0c0 0-0.774 0-1.677 0v1.032zM20.903 14.194c2.194-0.387 3.871-2.323 3.871-4.645 0-2.581-2.065-4.645-4.645-4.645s-4.645 2.065-4.645 4.645c0 1.935 1.29 3.742 3.097 4.387h0.129c0.129-0.129 0.129-0.258 0.129-0.387 0.129-0.129 0.129-0.129 0.129-0.258-1.677-0.516-2.968-2.065-2.968-3.871 0-2.194 1.806-4 4-4s4 1.806 4 4c0 1.806-1.29 3.484-3.097 3.871 0 0.129 0 0.129-0.129 0.258 0.258 0.387 0.129 0.516 0.129 0.645zM21.677 10.71c0-0.645 0-1.161-0.387-1.935-0.516-0.903-1.161-1.806-1.161-1.806v0 0c0 0-0.645 0.774-1.161 1.806-0.387 0.774-0.516 1.419-0.387 1.935 0 0.645 0.645 1.548 1.548 1.548 0 0 0 0 0.129 0 0 0 0 0 0 0v0 0c0 0 0 0 0 0s0 0 0.129 0c0.645 0 1.29-0.903 1.29-1.548z"/>\n<path d="M111.742 9.29h1.29l3.613 8.387h-1.806l-0.774-1.935h-3.613l-0.774 1.935h-1.677l3.742-8.387zM113.548 14.581l-1.29-3.355-1.29 3.355h2.581z"/>\n<path d="M117.161 12h1.29v0.903c0.258-0.516 0.774-1.032 1.806-1.032 0.903 0 1.548 0.387 1.806 1.032 0.387-0.774 1.032-1.032 1.935-1.032 1.548 0 2.065 1.032 2.065 2.452v3.355h-1.419v-3.226c0-0.774-0.258-1.29-1.032-1.29-0.903 0-1.161 0.774-1.161 1.419v3.097h-1.419v-3.355c0-0.645-0.258-1.161-1.032-1.161-0.903 0-1.29 0.645-1.29 1.419v3.097h-1.419v-5.677z"/>\n<path d="M128.129 15.355c0.129 0.903 0.774 1.29 1.548 1.29s1.161-0.387 1.548-0.774l1.032 0.774c-0.645 0.774-1.548 1.161-2.452 1.161-1.677 0-3.097-1.161-3.097-2.968s1.419-2.968 3.097-2.968c1.548 0 2.71 1.161 2.71 3.097v0.387h-4.387zM131.097 14.323c0-0.774-0.516-1.29-1.419-1.29s-1.419 0.516-1.419 1.29h2.839z"/>\n<path d="M133.29 12h1.419v0.903c0.258-0.645 0.903-1.032 1.677-1.032 0.129 0 0.387 0 0.516 0.129v1.419c-0.258 0-0.516-0.129-0.645-0.129-1.29 0-1.548 1.161-1.548 1.419v3.097h-1.419v-5.806z"/>\n<path d="M138.452 9.29c0.516 0 0.903 0.387 0.903 0.903s-0.387 0.903-0.903 0.903-0.903-0.387-0.903-0.903c0-0.516 0.387-0.903 0.903-0.903zM137.806 12h1.419v5.677h-1.419v-5.677z"/>\n<path d="M144.258 13.677c-0.387-0.387-0.645-0.516-1.032-0.516-1.032 0-1.677 0.774-1.677 1.677s0.645 1.677 1.677 1.677c0.387 0 0.903-0.129 1.161-0.516l0.903 1.032c-0.645 0.645-1.548 0.774-2.065 0.774-1.677 0-3.097-1.161-3.097-2.968s1.419-2.968 3.097-2.968c0.774 0 1.548 0.258 2.065 0.903l-1.032 0.903z"/>\n<path d="M149.419 16.903v0c-0.387 0.645-1.161 0.903-1.806 0.903-1.032 0-2.065-0.645-2.065-1.677 0-1.806 2.194-1.935 3.613-1.935h0.387v-0.129c0-0.645-0.516-1.032-1.29-1.032-0.645 0-1.161 0.258-1.548 0.645l-0.903-0.903c0.645-0.645 1.548-0.903 2.452-0.903 2.452 0 2.452 1.806 2.452 2.581v3.226h-1.29v-0.774zM149.29 15.226h-0.258c-0.774 0-2.194 0-2.194 0.903 0 0.516 0.516 0.774 1.032 0.774 1.032 0 1.419-0.516 1.419-1.29v-0.387z"/>\n<path d="M152 12h1.29v0.903c0.258-0.516 0.774-1.032 1.806-1.032 1.548 0 2.065 1.032 2.065 2.194v3.613h-1.419v-2.839c0-0.645 0-1.677-1.032-1.677-0.903 0-1.29 0.645-1.29 1.419v3.097h-1.419v-5.677z"/>\n<path d="M166.71 11.226c-0.645-0.645-1.161-0.774-1.806-0.774-1.677 0-2.839 1.29-2.839 2.968 0 1.806 1.161 3.097 2.839 3.097 0.645 0 1.29-0.258 1.935-1.032l1.29 0.903c-0.774 1.032-1.935 1.548-3.097 1.548-2.581 0-4.387-1.806-4.387-4.387 0-2.71 1.806-4.516 4.387-4.516 1.161 0 2.065 0.387 2.968 1.29l-1.29 0.903z"/>\n<path d="M171.613 11.871c1.677 0 3.097 1.161 3.097 2.968s-1.419 2.968-3.097 2.968c-1.677 0-3.097-1.161-3.097-2.968s1.29-2.968 3.097-2.968zM171.613 16.645c1.032 0 1.677-0.774 1.677-1.677s-0.645-1.677-1.677-1.677c-1.032 0-1.677 0.774-1.677 1.677 0 0.774 0.516 1.677 1.677 1.677z"/>\n<path d="M175.484 8.774h1.419v9.032h-1.419v-9.032z"/>\n<path d="M178.323 8.774h1.419v9.032h-1.419v-9.032z"/>\n<path d="M182.323 15.355c0.129 0.903 0.774 1.29 1.548 1.29s1.161-0.387 1.548-0.774l1.032 0.774c-0.645 0.774-1.548 1.161-2.452 1.161-1.677 0-3.097-1.161-3.097-2.968s1.419-2.968 3.097-2.968c1.548 0 2.71 1.161 2.71 3.097v0.387h-4.387zM185.29 14.323c0-0.774-0.516-1.29-1.419-1.29s-1.419 0.516-1.419 1.29h2.839z"/>\n<path d="M193.419 12v5.161c0 2.065-1.032 3.355-3.226 3.355-1.032 0-2.065-0.258-2.839-0.903l0.903-1.161c0.516 0.516 1.161 0.774 1.935 0.774 1.419 0 1.806-0.774 1.806-1.935v-0.387c-0.387 0.516-1.161 0.774-1.806 0.774-1.677 0-2.839-1.29-2.839-2.968s1.032-2.968 2.839-2.968c0.774 0 1.548 0.258 1.935 1.032v0-0.774h1.29zM188.645 14.839c0 0.903 0.774 1.677 1.677 1.677 1.032 0 1.677-0.774 1.677-1.677 0-1.032-0.645-1.677-1.677-1.677-0.903 0-1.677 0.645-1.677 1.677z"/>\n<path d="M195.613 15.355c0.129 0.903 0.774 1.29 1.548 1.29s1.161-0.387 1.548-0.774l1.032 0.774c-0.645 0.774-1.548 1.161-2.452 1.161-1.677 0-3.097-1.161-3.097-2.968s1.419-2.968 3.097-2.968c1.548 0 2.71 1.161 2.71 3.097v0.387h-4.387zM198.581 14.323c0-0.774-0.516-1.29-1.419-1.29s-1.419 0.516-1.419 1.29h2.839z"/>\n<path d="M206.71 11.871c1.677 0 3.097 1.161 3.097 2.968s-1.419 2.968-3.097 2.968c-1.677 0-3.097-1.161-3.097-2.968s1.419-2.968 3.097-2.968zM206.71 16.645c1.032 0 1.677-0.774 1.677-1.677s-0.645-1.677-1.677-1.677c-1.032 0-1.677 0.774-1.677 1.677 0 0.774 0.645 1.677 1.677 1.677z"/>\n<path d="M210.968 13.29h-1.161v-1.29h1.161v-0.774c0-1.548 0.387-2.581 2.065-2.581 0.258 0 0.645 0 0.903 0.129l-0.129 1.161c-0.258 0-0.387-0.129-0.645-0.129-0.774 0-0.903 0.516-0.903 1.161v1.032h1.29v1.161h-1.29v4.516h-1.419v-4.387z"/>\n<path d="M217.806 9.29h2.839c1.677 0 3.097 0.516 3.097 2.452 0 2.065-1.548 2.452-3.355 2.452h-1.032v3.484h-1.548v-8.387zM220.129 12.903c0.903 0 1.935 0 1.935-1.161 0-1.032-1.032-1.161-1.806-1.161h-1.032v2.323h0.903z"/>\n<path d="M225.806 12.774v0c0.258-0.516 0.774-0.903 1.677-0.903 1.548 0 2.065 1.032 2.065 2.194v3.613h-1.419v-2.839c0-0.645 0-1.677-1.032-1.677-0.903 0-1.29 0.645-1.29 1.419v3.097h-1.419v-9.032h1.419v4.129z"/>\n<path d="M229.935 12h1.548l1.548 4 1.419-4h1.419l-2.71 6.968c-0.387 1.032-0.903 1.677-2.194 1.677-0.387 0-0.774 0-1.032-0.129l0.129-1.29c0.258 0.129 0.516 0.129 0.774 0.129 0.645 0 0.903-0.258 1.161-0.903l0.258-0.645-2.323-5.806z"/>\n<path d="M239.484 13.548c-0.258-0.387-0.645-0.645-1.161-0.645-0.387 0-0.774 0.129-0.774 0.645 0 1.032 3.097 0.129 3.097 2.452 0 1.29-1.29 1.806-2.452 1.806-0.903 0-1.677-0.258-2.194-0.903l0.903-0.903c0.387 0.387 0.774 0.645 1.29 0.645 0.387 0 0.903-0.258 0.903-0.645 0-1.161-3.097-0.258-3.097-2.452 0-1.29 1.161-1.806 2.323-1.806 0.774 0 1.548 0.258 2.065 0.903l-0.903 0.903z"/>\n<path d="M242.194 9.29c0.516 0 0.903 0.387 0.903 0.903s-0.387 0.903-0.903 0.903-0.903-0.516-0.903-1.032c0-0.387 0.387-0.774 0.903-0.774zM241.419 12h1.419v5.677h-1.419v-5.677z"/>\n<path d="M248 13.677c-0.387-0.387-0.645-0.516-1.032-0.516-1.032 0-1.677 0.774-1.677 1.677s0.645 1.677 1.677 1.677c0.387 0 0.903-0.129 1.161-0.516l0.903 1.032c-0.645 0.645-1.548 0.774-2.065 0.774-1.677 0-3.097-1.161-3.097-2.968s1.419-2.968 3.097-2.968c0.774 0 1.548 0.258 2.065 0.903l-1.032 0.903z"/>\n<path d="M250.065 9.29c0.516 0 0.903 0.387 0.903 0.903s-0.387 0.903-0.903 0.903-0.903-0.387-0.903-0.903c0-0.516 0.387-0.903 0.903-0.903zM249.29 12h1.419v5.677h-1.419v-5.677z"/>\n<path d="M255.484 16.903v0c-0.387 0.645-1.161 0.903-1.806 0.903-1.032 0-2.065-0.645-2.065-1.677 0-1.806 2.194-1.935 3.613-1.935h0.387v-0.129c0-0.645-0.516-1.032-1.29-1.032-0.645 0-1.161 0.258-1.548 0.645l-0.774-0.774c0.645-0.645 1.548-0.903 2.452-0.903 2.452 0 2.452 1.806 2.452 2.581v3.226h-1.29v-0.903zM255.355 15.226h-0.258c-0.774 0-2.194 0-2.194 0.903 0 0.516 0.516 0.774 1.032 0.774 1.032 0 1.419-0.516 1.419-1.29v-0.387z"/>\n<path d="M258.065 12h1.29v0.903c0.258-0.516 0.774-1.032 1.806-1.032 1.548 0 2.065 1.032 2.065 2.194v3.613h-1.419v-2.839c0-0.645 0-1.677-1.032-1.677-0.903 0-1.29 0.645-1.29 1.419v3.097h-1.419v-5.677z"/>\n<path d="M267.484 13.548c-0.258-0.387-0.645-0.645-1.161-0.645-0.387 0-0.774 0.129-0.774 0.645 0 1.032 3.097 0.129 3.097 2.452 0 1.29-1.29 1.806-2.452 1.806-0.903 0-1.677-0.258-2.194-0.903l0.903-0.903c0.387 0.387 0.774 0.645 1.29 0.645 0.387 0 0.903-0.258 0.903-0.645 0-1.161-3.097-0.258-3.097-2.452 0-1.29 1.161-1.806 2.323-1.806 0.774 0 1.548 0.258 2.065 0.903l-0.903 0.903z"/>\n<path d="M108.387 23.484h0.774v5.419h2.839v0.774h-3.613v-6.194z"/>\n<path d="M113.161 27.742c0 0.774 0.645 1.161 1.419 1.161 0.516 0 0.774-0.258 1.161-0.645l0.645 0.516c-0.387 0.516-1.032 0.903-1.806 0.903-1.29 0-2.065-0.903-2.065-2.194s0.903-2.194 2.065-2.194c1.419 0 2.065 1.161 2.065 2.194v0.258h-3.484zM115.613 27.226c0-0.645-0.387-1.161-1.161-1.161s-1.29 0.645-1.29 1.161h2.452z"/>\n<path d="M117.29 25.935c0.387-0.387 1.032-0.645 1.677-0.645 1.161 0 1.677 0.645 1.677 1.419v2.065c0 0.258 0 0.516 0 0.774h-0.645c0-0.258 0-0.387 0-0.645v0c-0.387 0.516-0.774 0.774-1.419 0.774-0.774 0-1.419-0.387-1.419-1.29 0-1.032 1.032-1.419 2.323-1.419h0.516v-0.129c0-0.387-0.258-0.903-1.032-0.903-0.645 0-0.903 0.258-1.161 0.516l-0.516-0.516zM119.613 27.613c-0.774 0-1.677 0.129-1.677 0.774 0 0.516 0.387 0.645 0.903 0.645 0.903 0 1.161-0.645 1.161-1.161v-0.258h-0.387z"/>\n<path d="M125.935 29.548h-0.774v-0.645c-0.258 0.387-0.903 0.645-1.419 0.645-1.29 0-2.065-0.903-2.065-2.194s0.774-2.194 2.065-2.194c0.645 0 1.161 0.258 1.419 0.645v0-3.097h0.774v6.839zM125.161 27.484c0-0.774-0.516-1.419-1.29-1.419s-1.29 0.645-1.29 1.419 0.516 1.419 1.29 1.419 1.29-0.516 1.29-1.419z"/>\n<path d="M127.484 23.355c0.258 0 0.516 0.258 0.516 0.516s-0.258 0.645-0.516 0.645-0.516-0.258-0.516-0.516 0.129-0.645 0.516-0.645zM127.097 25.419h0.774v4.129h-0.774v-4.129z"/>\n<path d="M129.032 25.419h0.774v0.645c0.258-0.387 0.774-0.774 1.29-0.774 0.774 0 1.548 0.516 1.548 1.548v2.71h-0.774v-2.452c0-0.774-0.387-1.032-0.903-1.032-0.645 0-1.161 0.387-1.161 1.419v2.065h-0.774v-4.129z"/>\n<path d="M137.677 29.548c0 1.29-0.903 2.065-2.194 2.065-0.774 0-1.419-0.258-2.065-0.774l0.516-0.645c0.387 0.387 0.903 0.645 1.419 0.645 1.161 0 1.548-0.774 1.548-1.419v-0.645c-0.258 0.516-0.903 0.774-1.419 0.774-1.161 0-2.065-0.903-2.065-2.065s0.774-2.194 2.065-2.194c0.516 0 1.161 0.258 1.419 0.645v0-0.645h0.774v4.258zM134.194 27.484c0 0.774 0.516 1.419 1.29 1.419s1.29-0.516 1.29-1.419-0.516-1.419-1.29-1.419-1.29 0.645-1.29 1.419z"/>\n<path d="M141.161 23.484h0.774v6.194h-0.774v-6.194z"/>\n<path d="M143.355 25.419h0.774v0.645c0.258-0.387 0.774-0.774 1.29-0.774 0.774 0 1.548 0.516 1.548 1.548v2.71h-0.774v-2.452c0-0.774-0.387-1.032-0.903-1.032-0.645 0-1.161 0.387-1.161 1.419v2.065h-0.774v-4.129z"/>\n<path d="M150.194 26.194h-1.161v1.806c0 0.516 0 0.903 0.645 0.903 0.129 0 0.387 0 0.516-0.129v0.774c-0.129 0.129-0.516 0.129-0.645 0.129-1.161 0-1.161-0.774-1.161-1.419v-2.194h-0.903v-0.645h0.903v-1.161h0.774v1.161h1.161v0.774z"/>\n<path d="M151.613 27.742c0 0.774 0.645 1.161 1.419 1.161 0.516 0 0.774-0.258 1.161-0.645l0.645 0.516c-0.387 0.516-1.032 0.903-1.806 0.903-1.29 0-2.065-0.903-2.065-2.194s0.903-2.194 2.065-2.194c1.419 0 2.065 1.161 2.065 2.194v0.258h-3.484zM154.065 27.226c0-0.645-0.387-1.161-1.161-1.161s-1.29 0.645-1.29 1.161h2.452z"/>\n<path d="M155.613 25.419h0.774v0.645c0.258-0.387 0.774-0.774 1.29-0.774 0.129 0 0.258 0 0.387 0v0.903c-0.129 0-0.258 0-0.387 0-0.774 0-1.161 0.387-1.161 1.29v2.065h-0.774v-4.129z"/>\n<path d="M158.71 25.419h0.774v0.645c0.258-0.387 0.774-0.774 1.29-0.774 0.774 0 1.548 0.516 1.548 1.548v2.71h-0.774v-2.452c0-0.774-0.387-1.032-0.903-1.032-0.645 0-1.161 0.387-1.161 1.419v2.065h-0.774v-4.129z"/>\n<path d="M163.355 25.935c0.387-0.387 1.032-0.645 1.677-0.645 1.161 0 1.677 0.645 1.677 1.419v2.065c0 0.258 0 0.516 0 0.774h-0.645c0-0.258 0-0.387 0-0.645v0c-0.387 0.516-0.774 0.774-1.419 0.774-0.774 0-1.419-0.387-1.419-1.29 0-1.032 1.032-1.419 2.323-1.419h0.516v-0.129c0-0.387-0.258-0.903-1.032-0.903-0.645 0-0.903 0.258-1.161 0.516l-0.516-0.516zM165.548 27.613c-0.774 0-1.677 0.129-1.677 0.774 0 0.516 0.387 0.645 0.903 0.645 0.903 0 1.161-0.645 1.161-1.161v-0.258h-0.387z"/>\n<path d="M167.871 22.968h0.774v6.581h-0.774v-6.581z"/>\n<path d="M171.871 23.484h1.29l1.935 4.645 1.935-4.645h1.29v6.194h-0.774v-5.161l-2.065 5.032h-0.516l-2.065-5.032v5.032h-0.774v-6.065z"/>\n<path d="M180 27.742c0 0.774 0.645 1.161 1.419 1.161 0.516 0 0.774-0.258 1.161-0.645l0.645 0.516c-0.387 0.516-1.032 0.903-1.806 0.903-1.29 0-2.065-0.903-2.065-2.194s0.903-2.194 2.065-2.194c1.419 0 2.065 1.161 2.065 2.194v0.258h-3.484zM182.452 27.226c0-0.645-0.387-1.161-1.161-1.161s-1.29 0.645-1.29 1.161h2.452z"/>\n<path d="M188.129 29.548h-0.774v-0.645c-0.258 0.387-0.903 0.645-1.419 0.645-1.29 0-2.065-0.903-2.065-2.194s0.774-2.194 2.065-2.194c0.645 0 1.161 0.258 1.419 0.645v0-3.097h0.774v6.839zM187.355 27.484c0-0.774-0.516-1.419-1.29-1.419s-1.29 0.645-1.29 1.419 0.516 1.419 1.29 1.419 1.29-0.516 1.29-1.419z"/>\n<path d="M189.677 23.355c0.258 0 0.516 0.258 0.516 0.516s-0.258 0.645-0.516 0.645-0.516-0.258-0.516-0.516 0.258-0.645 0.516-0.645zM189.29 25.419h0.774v4.129h-0.774v-4.129z"/>\n<path d="M194.194 26.581c-0.258-0.258-0.645-0.516-1.032-0.516-0.903 0-1.29 0.645-1.29 1.419s0.516 1.419 1.29 1.419c0.387 0 0.774-0.129 1.032-0.516l0.516 0.516c-0.387 0.516-0.903 0.645-1.548 0.645-1.29 0-2.194-0.903-2.194-2.194s0.903-2.194 2.194-2.194c0.645 0 1.161 0.258 1.548 0.645l-0.516 0.774z"/>\n<path d="M195.742 23.355c0.258 0 0.516 0.258 0.516 0.516s-0.129 0.645-0.516 0.645-0.516-0.258-0.516-0.516 0.258-0.645 0.516-0.645zM195.355 25.419h0.774v4.129h-0.774v-4.129z"/>\n<path d="M197.419 25.419h0.774v0.645c0.258-0.387 0.774-0.774 1.29-0.774 0.774 0 1.548 0.516 1.548 1.548v2.71h-0.774v-2.452c0-0.774-0.387-1.032-0.903-1.032-0.645 0-1.161 0.387-1.161 1.419v2.065h-0.774v-4.129z"/>\n<path d="M202.71 27.742c0 0.774 0.645 1.161 1.419 1.161 0.516 0 0.774-0.258 1.161-0.645l0.645 0.516c-0.387 0.516-1.032 0.903-1.806 0.903-1.29 0-2.065-0.903-2.065-2.194s0.903-2.194 2.065-2.194c1.419 0 2.065 1.161 2.065 2.194v0.258h-3.484zM205.161 27.226c0-0.645-0.387-1.161-1.161-1.161s-1.29 0.645-1.29 1.161h2.452z"/>\n<path d="M206.839 30.71h-0.774l0.645-2.194h0.903l-0.774 2.194z"/>\n<path d="M209.806 23.484h0.774v6.194h-0.774v-6.194z"/>\n<path d="M212 25.419h0.774v0.645c0.129-0.258 0.645-0.774 1.29-0.774s1.032 0.258 1.29 0.774c0.258-0.516 0.774-0.774 1.29-0.774 1.29 0 1.548 0.903 1.548 1.806v2.452h-0.774v-2.323c0-0.645-0.129-1.161-0.903-1.161s-1.032 0.516-1.032 1.29v2.194h-0.774v-2.194c0-0.774-0.129-1.29-0.903-1.29-0.516 0-1.032 0.387-1.032 1.29v2.194h-0.774v-4.129z"/>\n<path d="M219.355 25.419h0.774v0.645c0.258-0.387 0.903-0.645 1.419-0.645 1.29 0 2.065 0.903 2.065 2.194s-0.774 2.194-2.065 2.194c-0.645 0-1.161-0.258-1.419-0.645v0 3.097h-0.774v-6.839zM220.129 27.484c0 0.774 0.516 1.419 1.29 1.419s1.29-0.645 1.29-1.419-0.516-1.419-1.29-1.419-1.29 0.645-1.29 1.419z"/>\n<path d="M224.516 25.419h0.774v0.645c0.258-0.387 0.774-0.774 1.29-0.774 0.129 0 0.258 0 0.387 0v0.903c-0.129 0-0.258 0-0.387 0-0.774 0-1.161 0.387-1.161 1.29v2.065h-0.903v-4.129z"/>\n<path d="M229.29 25.29c1.161 0 2.194 0.903 2.194 2.194s-0.903 2.194-2.194 2.194-2.194-0.903-2.194-2.194 1.032-2.194 2.194-2.194zM229.29 28.903c0.774 0 1.29-0.645 1.29-1.419s-0.516-1.419-1.29-1.419-1.29 0.645-1.29 1.419 0.516 1.419 1.29 1.419z"/>\n<path d="M231.742 25.419h0.903l1.29 3.097 1.161-3.097h0.774l-1.677 4.129h-0.903l-1.548-4.129z"/>\n<path d="M237.032 23.355c0.258 0 0.516 0.258 0.516 0.516s-0.258 0.516-0.516 0.516-0.516-0.258-0.516-0.516 0.129-0.516 0.516-0.516zM236.645 25.419h0.774v4.129h-0.774v-4.129z"/>\n<path d="M238.581 25.419h0.774v0.645c0.258-0.387 0.774-0.774 1.29-0.774 0.774 0 1.548 0.516 1.548 1.548v2.71h-0.774v-2.452c0-0.774-0.387-1.032-0.903-1.032-0.645 0-1.161 0.387-1.161 1.419v2.065h-0.774v-4.129z"/>\n<path d="M247.226 29.548c0 1.29-0.903 2.065-2.194 2.065-0.774 0-1.419-0.258-2.065-0.774l0.516-0.645c0.387 0.387 0.903 0.645 1.419 0.645 1.161 0 1.548-0.774 1.548-1.419v-0.645c-0.258 0.516-0.903 0.774-1.419 0.774-1.161 0-2.065-0.903-2.065-2.065s0.774-2.194 2.065-2.194c0.516 0 1.161 0.258 1.419 0.645v0-0.645h0.774v4.258zM243.742 27.484c0 0.774 0.516 1.419 1.29 1.419s1.29-0.516 1.29-1.419-0.516-1.419-1.29-1.419-1.29 0.645-1.29 1.419z"/>\n<path d="M250.452 23.484h0.774v5.419h2.839v0.774h-3.613v-6.194z"/>\n<path d="M255.097 23.355c0.258 0 0.516 0.258 0.516 0.516s-0.258 0.516-0.516 0.516-0.516-0.258-0.516-0.516 0.129-0.516 0.516-0.516zM254.71 25.419h0.774v4.129h-0.774v-4.129z"/>\n<path d="M256.129 25.419h0.903l1.29 3.097 1.161-3.097h0.774l-1.677 4.129h-0.903l-1.548-4.129z"/>\n<path d="M261.548 27.742c0 0.774 0.645 1.161 1.419 1.161 0.516 0 0.774-0.258 1.161-0.645l0.645 0.516c-0.387 0.516-1.032 0.903-1.806 0.903-1.29 0-2.065-0.903-2.065-2.194s0.903-2.194 2.065-2.194c1.419 0 2.065 1.161 2.065 2.194v0.258h-3.484zM264 27.226c0-0.645-0.387-1.161-1.161-1.161s-1.29 0.645-1.29 1.161h2.452z"/>\n<path d="M267.871 26.452c-0.129-0.258-0.516-0.387-0.903-0.387s-0.645 0.129-0.645 0.516c0 0.516 0.645 0.516 1.032 0.645 0.645 0.129 1.161 0.387 1.161 1.161 0 0.903-0.903 1.29-1.677 1.29-0.645 0-1.161-0.129-1.548-0.774l0.645-0.516c0.258 0.258 0.516 0.516 1.032 0.516 0.387 0 0.774-0.129 0.774-0.516 0-0.516-0.645-0.516-1.032-0.645-0.645-0.129-1.29-0.387-1.29-1.161 0-0.903 0.774-1.29 1.548-1.29 0.516 0 1.161 0.129 1.419 0.645l-0.516 0.516z"/>\n<path d="M42.323 0.774h4.516l12.387 28.903h-5.935l-2.71-6.581h-12.516l-2.581 6.581h-5.806l12.645-28.903zM48.903 18.581l-4.516-11.742-4.516 11.742h9.032z"/>\n<path d="M79.613 7.484c-2.065-2.194-4.129-2.839-6.065-2.839-5.935 0-9.935 4.516-9.935 10.323 0 6.194 4 10.71 9.935 10.71 2.323 0 4.516-1.032 6.452-3.484l4.258 2.968c-2.581 3.613-6.581 5.161-10.839 5.161-8.903 0-15.226-6.065-15.226-15.097 0-9.161 6.452-15.226 15.355-15.226 3.871 0 7.226 1.29 10.194 4.516l-4.129 2.968z"/>\n<path d="M86.839 0.774h9.677c5.548 0 10.71 1.935 10.71 8.387 0 7.226-5.419 8.645-11.613 8.645h-3.742v11.871h-5.161v-28.903zM95.097 13.29c2.968 0 6.71-0.129 6.71-4.129 0-3.613-3.355-4-6.194-4h-3.742v8.129h3.226z"/>\n<path d="M269.677 12.129c0.129 0.258 0.387 0.387 0.645 0.387s0.645-0.129 0.645-0.516c0-0.774-1.548-0.258-1.548-1.548 0-0.387 0.258-0.903 1.032-0.903 0.387 0 0.645 0.129 0.903 0.387l-0.387 0.258c-0.129-0.129-0.258-0.258-0.516-0.258-0.516 0-0.645 0.258-0.645 0.516 0 0.774 1.548 0.387 1.548 1.419 0 0.645-0.516 1.032-1.161 1.032-0.387 0-0.774-0.129-1.032-0.387l0.516-0.387z"/>\n<path d="M272 9.677h0.645l1.032 2.452 1.032-2.452h0.645v3.226h-0.387v-2.581l-1.032 2.581h-0.387l-1.032-2.581v2.581h-0.387v-3.226z"/>\n</symbol>\n<symbol id="svg-logo-acp-icon-w" viewBox="0 0 34 32">\n<title>logo-acp-icon-w</title>\n<path d="M23.181 10.27c0.283 0.566 0.283 0.849 0.283 1.273s-0.424 0.99-0.99 0.99v0 0 0c-0.566 0-0.849-0.566-0.99-0.99 0-0.424 0-0.707 0.283-1.273s0.707-1.132 0.707-1.132v0c0 0 0.424 0.424 0.707 1.132v0zM32.094 3.904v0 24.051c0 2.122-1.698 3.82-3.82 3.82h-24.051c-2.122 0.141-3.82-1.556-3.82-3.678v-24.051c0-2.122 1.698-3.82 3.82-3.82h24.051c2.122-0.141 3.82 1.698 3.82 3.678v0zM31.245 3.904c0-1.698-1.273-2.971-2.971-2.971h-13.016l-0.141 0.141c-0.283 0.141-0.424 0.424-0.566 0.566-2.547 2.547-3.678 5.942-3.395 9.337v0.283c0.283 1.981 0.99 3.82 2.264 5.376 2.971 0 5.093-0.141 5.376-0.283 0.566-0.283 1.132-0.566 1.556-0.99-2.264-0.849-3.82-3.112-3.82-5.517 0-3.254 2.688-5.942 5.942-5.942s5.942 2.688 5.942 5.942c0 3.112-2.547 5.8-5.659 5.942-0.424 0.707-0.99 1.556-1.556 2.264-0.707 0.849-1.556 1.556-2.829 2.122 0.849 0.283 1.698 0.424 2.547 0.566h1.273c2.971 0 5.942-1.132 8.064-3.395 0.283-0.283 0.566-0.707 0.849-0.99l0.141-0.283v-12.167zM31.245 28.096v-10.469c-0.141 0.141-0.283 0.283-0.424 0.424-2.264 2.264-5.376 3.678-8.63 3.678v0c-1.556 0-2.971-0.283-4.527-0.849l-0.424-0.283c-1.556 0.566-4.103 1.415-7.498 2.405-1.981 0.707-2.405 0.707-3.254 1.132-0.707 0.283-0.849 0.424-1.415 0.99-0.99 0.99-0.99 3.678 0.283 4.81 0.424 0.424 1.415 0.849 2.264 1.132h20.514c1.839 0 3.112-1.415 3.112-2.971v0zM1.253 16.636h11.176c-3.395-4.669-2.688-11.318 1.415-15.562l0.141-0.141h-9.762c-1.698 0-2.971 1.273-2.971 2.971v7.074c0.283 0 0.566-0.141 0.849-0.141-0.283-0.283-0.283-0.566-0.283-0.849 0-0.707 0.566-1.273 1.415-1.273s1.415 0.566 1.415 1.273c0 0.283-0.141 0.566-0.283 0.849 0.849 0.141 2.405 0.849 3.112 1.839 0.849 1.273 1.698 0.283 2.122 1.132 0.141 0.283 0.283 0.424 0.566 0.99 0.141 0.283-0.141 0.707-0.424 0.707h-8.205v1.132h-0.283zM23.323 14.939c2.405-0.424 4.244-2.547 4.244-5.093 0-2.829-2.264-5.093-5.093-5.093s-5.093 2.264-5.093 5.093c0 2.122 1.415 4.103 3.395 4.81h0.141c0.141-0.141 0.141-0.283 0.141-0.424 0.141-0.141 0.141-0.141 0.141-0.283-1.839-0.566-3.254-2.264-3.254-4.244 0-2.405 1.981-4.386 4.386-4.386s4.386 1.981 4.386 4.386c0 1.981-1.415 3.82-3.395 4.244 0 0.141 0 0.141-0.141 0.283 0.283 0.424 0.141 0.566 0.141 0.707v0zM24.172 11.119c0-0.707 0-1.273-0.424-2.122-0.566-0.99-1.273-1.981-1.273-1.981v0c0 0-0.707 0.849-1.273 1.981-0.424 0.849-0.566 1.556-0.424 2.122 0 0.707 0.707 1.698 1.698 1.698h0.283c0.707 0 1.415-0.99 1.415-1.698v0z"/>\n</symbol>\n<symbol id="svg-logo-acp-mksap-18-4c" viewBox="0 0 251 32">\n<title>logo-acp-mksap-18-4c</title>\n<path fill="#be0f34" d="M88.18 24.244v0l8.81-22.981h6.492v29.933h-4.098v-24.896l-9.901 24.896h-2.738l-9.863-24.896v24.896h-4.118v-29.876h6.492z"/>\n<path fill="#be0f34" d="M114.975 14.458v0l13.402-13.137h5.745l-14.497 13.654 15.32 16.182h-5.975l-13.996-15.416v15.454h-4.098v-29.876h4.175z"/>\n<path fill="#be0f34" d="M153.407 6.836c-1.318-1.696-3.359-2.778-5.652-2.778-0.001 0-0.001 0-0.002 0h-0.090c-2.7 0-5.745 1.474-5.745 4.845s2.739 4.136 6.109 5.228c4 1.264 8.771 2.777 8.771 8.713s-5.018 9.059-10.322 9.059c-0.097 0-0.211 0.004-0.325 0.004-0.005 0-0.010 0-0.016 0-3.778 0-7.164-1.674-9.459-4.32l-0.013-0.016-0.013-0.016 3.236-2.739c1.484 2.125 3.913 3.495 6.663 3.504v0c2.777 0 5.994-1.551 5.994-5.094s-3.294-4.596-7.086-5.745-7.66-2.911-7.66-8.388c0-5.938 5.304-8.5 10.246-8.5 0.089 0 0.195-0.004 0.301-0.004 0.004 0 0.010 0 0.015 0 3.22 0 6.134 1.304 8.245 3.413l-0-0z"/>\n<path fill="#be0f34" d="M163.768 31.195h-4.635l13.022-29.876h3.83l12.678 29.876h-4.711l-3.026-7.335h-14.153zM168.23 20.203h11.165l-5.554-14z"/>\n<path fill="#be0f34" d="M192.494 1.32h9.096c6.454 0 10.667 2.489 10.667 8.292s-4.673 8.426-10.875 8.426h-4.711v13.157h-4.175zM196.669 14.515h4.424c4.079 0 6.951-1.341 6.951-4.883s-2.949-4.768-6.875-4.768h-4.5z"/>\n<path fill="#fc3" d="M60.974 0.091h3.107v31.095h-3.107v-31.095z"/>\n<path fill="#007e66" d="M8.245 12.179h2.93l8.177 19h-3.83l-1.762-4.35h-8.216l-1.723 4.348h-3.83zM12.535 23.938l-2.93-7.659-2.968 7.659z"/>\n<path fill="#007e66" d="M33.773 16.641c-0.993-1.177-2.468-1.919-4.117-1.919-0.001 0-0.002 0-0.003 0h0q-0.11 0-0.219 0.004h-0.021c-3.617 0-6.549 2.932-6.55 6.549v0q0 0.212 0.013 0.421v-0.019c-0.020 0.186-0.031 0.402-0.031 0.621 0 0.004 0 0.008 0 0.012v-0.001c0 3.521 2.854 6.375 6.375 6.375v0h0.089c0.053 0 0.114 0 0.175 0 0.003 0 0.007 0 0.010 0 1.797 0 3.395-0.852 4.412-2.174l0.010-0.013 0.010-0.013 2.719 1.915c-1.658 2.044-4.17 3.339-6.984 3.339-0.001 0-0.001 0-0.002 0h0q-0.193 0-0.384-0.008h0.018c-5.42-0.117-9.768-4.539-9.768-9.976 0-5.463 4.39-9.9 9.835-9.977l0.007-0h0.076c0.101-0.004 0.219-0.006 0.337-0.006 0.003 0 0.006 0 0.010 0 2.588 0 4.917 1.112 6.535 2.884l0.006 0.007 0.006 0.007z"/>\n<path fill="#007e66" d="M38.58 12.179h6.206c4.347 0 7.163 1.532 7.163 5.496s-3.351 5.63-7.375 5.63h-2.642v7.89h-3.371zM44.325 20.471c2.203 0 4.213-0.536 4.213-2.796s-1.915-2.662-4.098-2.662h-2.509v5.438z"/>\n<path fill="#be0f34" d="M215.762 3.121c0 1.058-0.857 1.915-1.915 1.915s-1.915-0.857-1.915-1.915c0-1.058 0.857-1.915 1.915-1.915v0c1.058 0 1.915 0.857 1.915 1.915v0zM212.372 3.121c0 0.018 0 0.038 0 0.058 0 0.804 0.652 1.456 1.456 1.456v0h0.021c0.794 0 1.438-0.644 1.438-1.438v0c0-0.020 0-0.041 0-0.063v0c-0.017-0.791-0.662-1.425-1.455-1.425s-1.438 0.635-1.455 1.424l-0 0.002zM213.54 4.117h-0.438v-1.915c0.109-0.011 0.236-0.018 0.364-0.018s0.255 0.006 0.379 0.019h-0.016c0.030 0 0.063-0.004 0.099-0.004 0.001 0 0.001 0 0.002 0 0.204 0 0.395 0.052 0.561 0.144l-0.006-0.003h-0.006c0.117 0.096 0.192 0.24 0.192 0.402v0c0 0.007 0 0.014 0 0.021v0c-0.015 0.217-0.171 0.393-0.377 0.437l-0.003 0.001h-0.002c0.188 0.078 0.322 0.249 0.344 0.455l0 0.002c0.018 0.18 0.067 0.346 0.141 0.496l-0.004-0.008-0.004-0.009h-0.478c-0.069-0.13-0.122-0.281-0.15-0.44l-0.001-0.010v-0.010c0-0.211-0.153-0.306-0.383-0.306h-0.215zM213.54 3.044h0.211c0.25 0 0.438 0 0.438-0.268s-0.134-0.288-0.402-0.288h-0.25z"/>\n<path fill="#003479" d="M224.686 1.742h23.038c1.618 0 2.93 1.312 2.93 2.93v0 23.038c0 1.618-1.312 2.93-2.93 2.93v0h-23.038c-1.618 0-2.93-1.312-2.93-2.93v0-23.039c0-1.618 1.312-2.93 2.93-2.93v0z"/>\n<path fill="#ffc82e" d="M227.559 9.574l-2.796 0.785-0.556-1.226 7.546-3.159h1.13v17.849c0 0.881 1.359 0.996 2.968 1.149v1.091h-11.222v-1.091c1.609-0.153 2.93-0.268 2.93-1.149z"/>\n<path fill="#ffc82e" d="M242.728 5.572c3.313 0 6.625 1.532 6.625 4.941-0.138 2.276-1.767 4.135-3.916 4.622l-0.067 0.013c2.625 1.283 5.592 2.968 5.592 5.938 0 5.745-4.347 6.683-8.5 6.683-6.511 0-8.216-2.432-8.216-5.496 0.271-2.584 2.216-4.643 4.719-5.084l0.068-0.010c-2.298-1.063-3.875-3.313-3.945-5.947v-0.009c0.038-3.6 3.639-5.649 7.641-5.649zM242.496 25.966c1.63-0.039 2.937-1.37 2.938-3.006v-0q0-0.091-0.006-0.181v0.008c0-2.279-2.509-3.447-4.711-4.673-0.627 1.078-0.996 2.373-0.996 3.754 0 0.008 0 0.016 0 0.024v-0.001q0 0.028 0 0.056v0c0 2.813 1.379 4 2.777 4zM242.764 7.371c-1.276 0.213-2.237 1.309-2.237 2.629 0 0.103 0.006 0.205 0.017 0.305l-0.001-0.012v-0.012c0 2.011 1.456 3.141 3.236 4.098 0.664-1.136 1.066-2.496 1.091-3.949l0-0.007v-0.008c0.058-2.604-1.188-3.063-2.106-3.063z"/>\n<path fill="#be0f34" d="M247.724 31.119h-23.038c-1.882-0.002-3.407-1.527-3.409-3.409v-23.039c0.002-1.882 1.527-3.407 3.409-3.409h23.038c1.882 0.002 3.407 1.527 3.409 3.409v23.039c-0.002 1.882-1.527 3.407-3.409 3.409h-0zM224.686 2.221c-1.354 0-2.451 1.097-2.451 2.451v0 23.038c0.001 1.353 1.098 2.45 2.451 2.451h23.038c1.353-0.001 2.45-1.098 2.451-2.451v-23.039c-0.001-1.353-1.098-2.45-2.451-2.451h-0z"/>\n</symbol>\n<symbol id="svg-logo-acp-mksap-19-4c" viewBox="0 0 131.12 16.71">\n<title>logo-acp-mksap-19-4c</title>\n<path d="M226.15,364.37h0l4.59-12h3.39V368H232V355h0l-5.17,13H225.4l-5.15-13h0v13H218.1V352.4h3.39Z" transform="translate(-180.09 -351.66)" style="fill:#b51946"/>\n<path d="M240.14,359.26h.05l6.95-6.86h3l-7.57,7.13,8,8.45h-3.13l-7.3-8.06h-.05V368H238V352.4h2.18Z" transform="translate(-180.09 -351.66)" style="fill:#b51946"/>\n<path d="M260.21,355.28a3.73,3.73,0,0,0-3-1.45c-1.41,0-3,.77-3,2.53s1.44,2.16,3.2,2.73c2.09.66,4.57,1.45,4.57,4.55s-2.62,4.73-5.39,4.73a6.57,6.57,0,0,1-5.13-2.26l1.7-1.43a4.24,4.24,0,0,0,3.47,1.82c1.46,0,3.13-.81,3.13-2.66s-1.72-2.4-3.7-3-4-1.52-4-4.38c0-3.11,2.78-4.45,5.35-4.45a6.14,6.14,0,0,1,4.47,1.78Z" transform="translate(-180.09 -351.66)" style="fill:#b51946"/>\n<path d="M265.62,368H263.2L270,352.4h2L278.62,368h-2.46l-1.59-3.83h-7.39Zm2.33-5.75h5.83l-2.9-7.3Z" transform="translate(-180.09 -351.66)" style="fill:#b51946"/>\n<path d="M280.62,352.4h4.75c3.37,0,5.57,1.3,5.57,4.33s-2.44,4.4-5.68,4.4H282.8V368h-2.18Zm2.18,6.89h2.31c2.14,0,3.63-.71,3.63-2.56s-1.54-2.48-3.59-2.48H282.8Z" transform="translate(-180.09 -351.66)" style="fill:#b51946"/>\n<line x1="32.59" y1="16.32" x2="32.59" style="fill:none;stroke:#f0c33b;stroke-miterlimit:10;stroke-width:1.5px"/>\n<path d="M184.41,358.07h1.53l4.27,9.92h-2l-.92-2.27H183l-.9,2.27h-2Zm2.24,6.14-1.53-4-1.55,4Z" transform="translate(-180.09 -351.66)" style="fill:#1d7f67"/>\n<path d="M197.74,360.4a2.81,2.81,0,0,0-2.26-1,3.42,3.42,0,0,0-3.43,3.63,3.33,3.33,0,0,0,3.36,3.66,2.89,2.89,0,0,0,2.41-1.15l1.42,1a4.67,4.67,0,0,1-3.84,1.74,5.21,5.21,0,1,1,.08-10.42,4.64,4.64,0,0,1,3.6,1.51Z" transform="translate(-180.09 -351.66)" style="fill:#1d7f67"/>\n<path d="M200.25,358.07h3.24c2.27,0,3.74.8,3.74,2.87s-1.75,2.95-3.85,2.95H202V368h-1.77Zm3,4.33c1.15,0,2.2-.28,2.2-1.46s-1-1.38-2.14-1.38H202v2.84Z" transform="translate(-180.09 -351.66)" style="fill:#1d7f67"/>\n<path d="M292.77,353.34a1,1,0,0,1-1,1,1,1,0,1,1,0-2A1,1,0,0,1,292.77,353.34Zm-1.77,0a.77.77,0,0,0,.77.79.79.79,0,0,0,0-1.57A.77.77,0,0,0,291,353.34Zm.61.52h-.23v-1a1.76,1.76,0,0,1,.38,0,.59.59,0,0,1,.34.08.25.25,0,0,1,.1.21c0,.11-.09.19-.21.23h0a.29.29,0,0,1,.18.24.63.63,0,0,0,.08.25H292a.93.93,0,0,1-.08-.24.18.18,0,0,0-.2-.16h-.11Zm0-.56h.1c.13,0,.23,0,.23-.14s-.06-.15-.21-.15h-.12Z" transform="translate(-180.09 -351.66)" style="fill:#b51946"/>\n<path d="M297.61,352.67h11.62a1.43,1.43,0,0,1,1.11.38,1.35,1.35,0,0,1,.37,1.1v11.62a1.32,1.32,0,0,1-1.48,1.47H297.61a1.35,1.35,0,0,1-1.11-.38,1.37,1.37,0,0,1-.37-1.09V354.15a1.35,1.35,0,0,1,.39-1.1A1.42,1.42,0,0,1,297.61,352.67Z" transform="translate(-180.09 -351.66)" style="fill:#2d588f"/>\n<path d="M309.42,352.17h-12a1.8,1.8,0,0,0-1.79,1.78v12a1.79,1.79,0,0,0,1.79,1.78h12a1.78,1.78,0,0,0,1.76-1.82V354A1.79,1.79,0,0,0,309.42,352.17ZM310.71,366h0a1.27,1.27,0,0,1-1.29,1.27h-12a1.28,1.28,0,0,1-1.28-1.28V354h0a1.29,1.29,0,0,1,1.29-1.27h12a1.28,1.28,0,0,1,1.28,1.28Z" transform="translate(-180.09 -351.66)" style="fill:#b52348"/>\n<path d="M298.69,356.58l-1.47.42-.29-.64,4-1.67h.59v9.38c0,.48.63.53,1.48.61v.58h-5.81v-.58c.84-.08,1.53-.13,1.53-.61Z" transform="translate(-180.09 -351.66)" style="fill:#f0c43e"/>\n<path d="M307.41,364a4.46,4.46,0,0,1-1.14,1.23,5.7,5.7,0,0,1-1.91.91l.06.18.06.19.07.18.06.2a9.38,9.38,0,0,0,3.62-1.5,8.17,8.17,0,0,0,1.42-1.27,7.46,7.46,0,0,0,1.06-1.55v-6l-.09-.12-.14-.19-.07-.08-.07-.08a5.11,5.11,0,0,0-.55-.48,3.6,3.6,0,0,0-.62-.39,5,5,0,0,0-1-.38,6.33,6.33,0,0,0-1.15-.13,5.36,5.36,0,0,0-1.59.27,4.63,4.63,0,0,0-1.38.79,3.81,3.81,0,0,0-1,1.29,4.15,4.15,0,0,0-.37,1.76,4.76,4.76,0,0,0,.2,1.41,3.31,3.31,0,0,0,.61,1.16,2.75,2.75,0,0,0,1,.79,3.43,3.43,0,0,0,1.48.29,1.55,1.55,0,0,0,.43,0,3.84,3.84,0,0,0,.59-.11,4.12,4.12,0,0,0,.67-.24,2.45,2.45,0,0,0,.63-.36,6.56,6.56,0,0,1-.22,1.07A4.71,4.71,0,0,1,307.41,364Zm.27-3a1.67,1.67,0,0,1-.62.12,1.21,1.21,0,0,1-1-.73,4.17,4.17,0,0,1-.42-2,5.26,5.26,0,0,1,.35-2.18,1,1,0,0,1,.91-.63c.55,0,.92.78,1.14,1.82a12.7,12.7,0,0,1,.21,3.31A1.81,1.81,0,0,1,307.68,361Z" transform="translate(-180.09 -351.66)" style="fill:#f0c43e"/>\n</symbol>\n<symbol id="svg-logo-acp-mksap18-horiz-w" viewBox="0 0 139 17.69">\n  <title>acp-mksap18-logo-horiz-w</title>\n  <path d="M48.76 13.46h.05L53.68.78h3.59v16.5H55V3.48l-5.48 13.8H48l-5.48-13.8h-.05v13.8h-2.23V.78h3.59zM63.58 8.05L71 .78h3.19l-8 7.55 8.51 9h-3.34l-7.74-8.58v8.53h-2.35V.78h2.31zM84.82 3.84a4 4 0 0 0-3.21-1.53c-1.49 0-3.22.81-3.22 2.68s1.52 2.27 3.38 2.85c2.21.7 4.85 1.54 4.85 4.83s-2.78 5-5.71 5a7 7 0 0 1-5.43-2.39l1.8-1.52A4.48 4.48 0 0 0 81 15.71c1.53 0 3.3-.86 3.3-2.81s-1.81-2.54-3.91-3.2-4.29-1.6-4.29-4.63c0-3.29 2.94-4.71 5.66-4.71a6.45 6.45 0 0 1 4.73 1.89zM90.55 17.28H88L95.15.78h2.1l7.08 16.5h-2.61L100 13.22h-7.79zM93 11.2h6.17l-3.05-7.74zM106.44.78h5c3.56 0 5.89 1.38 5.89 4.59s-2.58 4.66-6 4.66h-2.61v7.25h-2.3zm2.3 7.29h2.45c2.26 0 3.84-.74 3.84-2.7s-1.63-2.63-3.79-2.63h-2.5zM33.71 0h1.59v17.28h-1.59zM4.57 6.84h1.61l4.53 10.5H8.57l-1-2.4H3l-1 2.4H0zm2.37 6.49L5.32 9.01l-1.64 4.27zM18.68 9.25a3 3 0 0 0-2.39-1.08 3.61 3.61 0 0 0-3.63 3.84c0 2.28 1.39 3.87 3.56 3.87a3.07 3.07 0 0 0 2.55-1.22l1.5 1.06a5 5 0 0 1-4.07 1.84 5.34 5.34 0 0 1-5.6-5.55 5.34 5.34 0 0 1 5.69-5.49 5 5 0 0 1 3.82 1.6zM21.35 6.84h3.42c2.4 0 4 .84 4 3s-1.85 3.11-4.08 3.11h-1.48v4.35h-1.86zm3.17 4.58c1.22 0 2.33-.3 2.33-1.54s-1.11-1.47-2.27-1.47h-1.37v3zM119.3 1.78a1 1 0 0 1-1.06 1.06 1.05 1.05 0 1 1 0-2.1 1 1 0 0 1 1.06 1.04zm-1.87 0a.81.81 0 1 0 1.57.06.81.81 0 1 0-1.61 0zm.64.55h-.24v-1a2 2 0 0 1 .4 0 .65.65 0 0 1 .36.08.28.28 0 0 1 .1.23.27.27 0 0 1-.21.24.32.32 0 0 1 .19.26 1 1 0 0 0 .07.26h-.26a1 1 0 0 1-.08-.26c0-.11-.08-.16-.22-.16h-.11zm0-.59h.11c.13 0 .24 0 .24-.16s-.07-.15-.22-.15h-.13z" fill="#fff"/>\n  <g data-name="Layer 2" fill="#fff">\n    <path d="M135.87 8.37a2.8 2.8 0 0 0 2.22-2.59c0-1.9-1.85-2.75-3.69-2.75-2.24 0-4.25 1.14-4.25 3.14a3.74 3.74 0 0 0 2.19 3.32 3.18 3.18 0 0 0-2.67 2.85 3 3 0 0 0 .33 1.5c-.63-.08-1.1-.21-1.1-.59v-10h-.63l-4.22 1.77.31.68 1.56-.44v8c0 .49-.73.56-1.63.64v.61h6.27a5.66 5.66 0 0 0 3.69.93c2.33 0 4.75-.52 4.75-3.73 0-1.69-1.67-2.62-3.13-3.34zm-1.46-4.35c.52 0 1.19.26 1.19 1.7a4.65 4.65 0 0 1-.6 2.22c-1-.53-1.81-1.16-1.81-2.29a1.49 1.49 0 0 1 1.22-1.63zm-.14 10.39c-.84 0-1.56-.66-1.56-2.24a4.25 4.25 0 0 1 .56-2.14c1.24.68 2.63 1.33 2.63 2.61a1.68 1.68 0 0 1-1.63 1.77z"/>\n    <path d="M137.09 17.43h-12.85a1.91 1.91 0 0 1-1.91-1.91V2.66a1.9 1.9 0 0 1 1.91-1.9h12.85a1.91 1.91 0 0 1 1.91 1.9v12.86a1.92 1.92 0 0 1-1.91 1.91zM124.24 1.29a1.38 1.38 0 0 0-1.38 1.37v12.86a1.38 1.38 0 0 0 1.38 1.38h12.85a1.38 1.38 0 0 0 1.38-1.38V2.66a1.38 1.38 0 0 0-1.38-1.37z"/>\n  </g>\n</symbol>\n<symbol id="svg-logo-acp-mksap18-vert-rgb" viewBox="0 0 59 32">\n<title>logo-acp-mksap18-logo-vert-rgb</title>\n<path fill="#be0f34" d="M24.4 6.891v0l2.377-6.2h1.752v8.076h-1.106v-6.717l-2.671 6.717h-0.739l-2.661-6.717v6.717h-1.111v-8.060h1.752z"/>\n<path fill="#be0f34" d="M31.628 4.25v0l3.617-3.545h1.55l-3.911 3.684 4.134 4.366h-1.612l-3.777-4.159v4.17h-1.106v-8.060h1.126z"/>\n<path fill="#be0f34" d="M41.998 2.194c-0.356-0.458-0.907-0.749-1.525-0.749-0.009 0-0.017 0-0.026 0h0.001c-0.729 0-1.55 0.398-1.55 1.307s0.739 1.116 1.648 1.411c1.080 0.341 2.366 0.749 2.366 2.351s-1.354 2.444-2.785 2.444c-0.026 0.001-0.057 0.001-0.088 0.001-1.022 0-1.939-0.453-2.559-1.17l-0.004-0.004 0.873-0.739c0.4 0.573 1.056 0.943 1.798 0.946h0c0.749 0 1.617-0.419 1.617-1.374s-0.889-1.24-1.912-1.55-2.067-0.785-2.067-2.263c0-1.602 1.431-2.294 2.764-2.294 0.024-0.001 0.053-0.001 0.081-0.001 0.87 0 1.657 0.352 2.228 0.921l-0-0z"/>\n<path fill="#be0f34" d="M44.794 8.766h-1.25l3.514-8.060h1.033l3.42 8.060h-1.271l-0.816-1.979h-3.818zM45.998 5.8h3.012l-1.498-3.777z"/>\n<path fill="#be0f34" d="M52.544 0.706h2.454c1.741 0 2.878 0.672 2.878 2.237s-1.261 2.273-2.935 2.273h-1.271v3.55h-1.126zM53.67 4.266h1.194c1.101 0 1.876-0.362 1.876-1.318s-0.796-1.287-1.855-1.287h-1.214z"/>\n<path fill="#007e66" d="M2.833 3.636h0.791l2.206 5.126h-1.033l-0.475-1.173h-2.217l-0.465 1.173h-1.033zM3.99 6.808l-0.791-2.067-0.801 2.067z"/>\n<path fill="#007e66" d="M9.721 4.839c-0.268-0.317-0.666-0.518-1.111-0.518-0.020 0-0.039 0-0.059 0.001l0.003-0c-0.002 0-0.005-0-0.008-0-0.976 0-1.767 0.791-1.767 1.767 0 0.038 0.001 0.076 0.004 0.114l-0-0.005c-0.005 0.051-0.008 0.111-0.008 0.171 0 0.95 0.77 1.721 1.721 1.721 0.008 0 0.017-0 0.025-0h-0.001c0.014 0 0.031 0.001 0.047 0.001 0.487 0 0.921-0.232 1.195-0.591l0.003-0.004 0.734 0.517c-0.448 0.552-1.126 0.901-1.886 0.901-0.035 0-0.069-0.001-0.104-0.002l0.005 0c-1.478-0.012-2.671-1.212-2.671-2.692 0-1.487 1.205-2.692 2.692-2.692 0.007 0 0.014 0 0.022 0h-0.001c0.027-0.001 0.059-0.002 0.091-0.002 0.7 0 1.33 0.301 1.767 0.78l0.002 0.002z"/>\n<path fill="#007e66" d="M11.017 3.636h1.674c1.173 0 1.932 0.413 1.932 1.483s-0.904 1.519-1.989 1.519h-0.713v2.129h-0.909zM12.568 5.873c0.594 0 1.137-0.145 1.137-0.754s-0.517-0.718-1.106-0.718h-0.677v1.467z"/>\n<path fill="#be0f34" d="M58.822 1.192c0 0.285-0.231 0.517-0.517 0.517s-0.517-0.231-0.517-0.517c0-0.285 0.231-0.517 0.517-0.517v0c0.285 0 0.517 0.231 0.517 0.517v0zM57.907 1.192c-0 0.005-0 0.010-0 0.016 0 0.217 0.176 0.393 0.393 0.393 0.002 0 0.004 0 0.006-0h-0c0 0 0 0 0 0 0.214 0 0.388-0.173 0.388-0.388 0-0.005-0-0.011-0-0.016l0 0.001c0-0.217-0.176-0.393-0.393-0.393s-0.393 0.176-0.393 0.393v0zM58.223 1.46h-0.119v-0.517c0.029-0.003 0.064-0.005 0.098-0.005s0.069 0.002 0.102 0.005l-0.004-0c0.008-0.001 0.017-0.001 0.027-0.001 0.054 0 0.106 0.014 0.15 0.038l-0.002-0.001c0.032 0.026 0.052 0.065 0.052 0.108 0 0.002-0 0.004-0 0.005v-0c-0.004 0.059-0.046 0.107-0.102 0.119l-0.001 0c0.051 0.021 0.087 0.068 0.093 0.123l0 0.001c0.005 0.048 0.018 0.092 0.037 0.131l-0.001-0.002h-0.129c-0.019-0.036-0.033-0.077-0.041-0.121l-0-0.003c0-0.057-0.041-0.083-0.103-0.083h-0.057zM58.223 1.171h0.057c0.067 0 0.119 0 0.119-0.072s-0.036-0.077-0.108-0.077h-0.067z"/>\n<path fill="#003479" d="M22.333 13.587h14.137c0.996 0 1.803 0.807 1.803 1.803v14.142c0 0.996-0.807 1.803-1.803 1.803h-14.137c-0.996 0-1.803-0.807-1.803-1.803v-14.142c0-0.996 0.807-1.803 1.803-1.803z"/>\n<path fill="#ffc82e" d="M24.090 18.403l-1.721 0.486-0.336-0.749 4.65-1.943h0.692v10.959c0 0.517 0.837 0.615 1.824 0.708v0.672h-6.903v-0.651c0.992-0.093 1.793-0.171 1.793-0.708z"/>\n<path fill="#ffc82e" d="M33.406 15.938c2.031 0 4.066 0.935 4.066 3.028 0 1.116-0.754 2.315-2.439 2.847 1.607 0.791 3.436 1.824 3.436 3.617 0 3.539-2.666 4.103-5.224 4.103-3.994 0-5.038-1.498-5.038-3.374 0-1.359 1.157-2.723 2.945-3.131-1.302-0.791-2.418-1.788-2.418-3.658 0-2.17 2.217-3.431 4.671-3.431zM33.266 28.457c1-0.027 1.801-0.845 1.801-1.849 0-0.037-0.001-0.073-0.003-0.109l0 0.005c0-1.4-1.55-2.113-2.899-2.868-0.384 0.665-0.61 1.462-0.61 2.312 0 0.016 0 0.031 0 0.047l-0-0.002c0 1.731 0.796 2.465 1.71 2.465zM33.426 17.039c-0.651 0-1.359 0.713-1.359 1.788 0 1.24 0.894 1.932 1.989 2.521 0.407-0.701 0.655-1.539 0.672-2.434l0-0.005c0-1.591-0.729-1.876-1.302-1.876z"/>\n<path fill="none" stroke="#be0f34" stroke-width="0.5977" stroke-miterlimit="4" stroke-linecap="butt" stroke-linejoin="miter" d="M22.333 13.587h14.137c0.996 0 1.803 0.807 1.803 1.803v14.142c0 0.996-0.807 1.803-1.803 1.803h-14.137c-0.996 0-1.803-0.807-1.803-1.803v-14.142c0-0.996 0.807-1.803 1.803-1.803z"/>\n</symbol>\n<symbol id="svg-logo-acp-mksap19-w" viewBox="0 0 131.12 16.71">\n<title id="logo-title">ACP MKSAP 19"</title>\n<desc id="description">ACP Vertical line MKSAP 19 in white text logo</desc>\n  <defs/>\n  <path fill="#fff" d="M46.06 12.71l4.59-12h3.39v15.63h-2.13v-13l-5.17 13h-1.43l-5.15-13v13h-2.15V.74h3.39z"/>\n  <path fill="#fff" d="M60.05 7.6h.05L67.05.74h3l-7.57 7.13 8 8.45h-3.13l-7.3-8.06H60v8.08h-2.09V.74h2.18z"/>\n  <path fill="#fff" d="M80.12 3.62a3.73 3.73 0 00-3-1.45c-1.41 0-3 .77-3 2.53s1.44 2.16 3.2 2.73c2.09.66 4.57 1.45 4.57 4.55s-2.62 4.73-5.39 4.73a6.57 6.57 0 01-5.13-2.26l1.7-1.43a4.24 4.24 0 003.47 1.82c1.46 0 3.13-.81 3.13-2.66s-1.72-2.4-3.7-3-4-1.52-4-4.38c0-3.11 2.78-4.45 5.35-4.45a6.14 6.14 0 014.47 1.78z"/>\n  <path fill="#fff" d="M85.53 16.34h-2.42l6.8-15.6h2l6.62 15.6h-2.46l-1.59-3.83h-7.39zm2.33-5.75h5.83l-2.9-7.3z"/>\n  <path fill="#fff" d="M100.53.74h4.75c3.37 0 5.57 1.3 5.57 4.33s-2.44 4.4-5.68 4.4h-2.46v6.87h-2.18zm2.18 6.89h2.31c2.14 0 3.63-.71 3.63-2.56s-1.54-2.48-3.59-2.48h-2.35z"/>\n  <path fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="1.5" d="M32.59 16.32V0"/>\n  <path fill="#fff" d="M4.32 6.41h1.53l4.27 9.92h-2l-.92-2.27H2.91l-.9 2.27h-2zm2.24 6.14l-1.53-4-1.55 4z"/>\n  <path fill="#fff" d="M17.65 8.74a2.81 2.81 0 00-2.26-1 3.42 3.42 0 00-3.43 3.63 3.33 3.33 0 003.36 3.66 2.89 2.89 0 002.41-1.15l1.42 1a4.67 4.67 0 01-3.84 1.74 5.2102 5.2102 0 11.08-10.42 4.64 4.64 0 013.6 1.51z"/>\n  <path fill="#fff" d="M20.16 6.41h3.24c2.27 0 3.74.8 3.74 2.87s-1.75 2.95-3.85 2.95h-1.38v4.11h-1.77zm3 4.33c1.15 0 2.2-.28 2.2-1.46s-1-1.38-2.14-1.38h-1.31v2.84z"/>\n  <path fill="#fff" d="M112.68 1.68a1 1 0 01-1 1 1 1 0 110-2 1 1 0 011 1zm-1.77 0a.77.77 0 00.77.79.79.79 0 000-1.57.77.77 0 00-.77.78zm.61.52h-.23v-1a1.76 1.76 0 01.38 0 .59.59 0 01.34.08.25.25 0 01.1.21c0 .11-.09.19-.21.23a.29.29 0 01.18.24.63.63 0 00.08.25h-.25a.93.93 0 01-.08-.24.18.18 0 00-.2-.16h-.11zm0-.56h.1c.13 0 .23 0 .23-.14s-.06-.15-.21-.15h-.12z"/>\n  <path fill="none" d="M117.52 1.01h11.62a1.43 1.43 0 011.11.38 1.35 1.35 0 01.37 1.1v11.62a1.32 1.32 0 01-1.48 1.47h-11.62a1.35 1.35 0 01-1.11-.38 1.37 1.37 0 01-.37-1.09V2.49a1.35 1.35 0 01.39-1.1 1.42 1.42 0 011.09-.38z"/>\n  <path fill="#fff" d="M129.33.51h-12a1.8 1.8 0 00-1.79 1.78v12a1.79 1.79 0 001.79 1.78h12a1.78 1.78 0 001.76-1.82V2.34a1.79 1.79 0 00-1.76-1.83zm1.29 13.83a1.27 1.27 0 01-1.29 1.27h-12a1.28 1.28 0 01-1.28-1.28V2.34a1.29 1.29 0 011.29-1.27h12a1.28 1.28 0 011.28 1.28z"/>\n  <path fill="#fff" d="M118.6 4.92l-1.47.42-.29-.64 4-1.67h.59v9.38c0 .48.63.53 1.48.61v.58h-5.81v-.58c.84-.08 1.53-.13 1.53-.61z"/>\n  <path fill="#fff" d="M127.32 12.34a4.46 4.46 0 01-1.14 1.23 5.7 5.7 0 01-1.91.91l.06.18.06.19.07.18.06.2a9.38 9.38 0 003.62-1.5 8.17 8.17 0 001.42-1.27 7.46 7.46 0 001.06-1.55v-6l-.09-.12-.14-.19-.07-.08-.07-.08a5.11 5.11 0 00-.55-.48 3.6 3.6 0 00-.62-.39 5 5 0 00-1-.38 6.33 6.33 0 00-1.15-.13 5.36 5.36 0 00-1.59.27 4.63 4.63 0 00-1.38.79 3.81 3.81 0 00-1 1.29 4.15 4.15 0 00-.37 1.76 4.76 4.76 0 00.2 1.41 3.31 3.31 0 00.61 1.16 2.75 2.75 0 001 .79 3.43 3.43 0 001.48.29 1.55 1.55 0 00.43 0 3.84 3.84 0 00.59-.11 4.12 4.12 0 00.67-.24 2.45 2.45 0 00.63-.36 6.56 6.56 0 01-.22 1.07 4.71 4.71 0 01-.66 1.16zm.27-3a1.67 1.67 0 01-.62.12 1.21 1.21 0 01-1-.73 4.17 4.17 0 01-.42-2 5.26 5.26 0 01.35-2.18 1 1 0 01.91-.63c.55 0 .92.78 1.14 1.82a12.7 12.7 0 01.21 3.31 1.81 1.81 0 01-.57.29z"/>\n</symbol>\n<symbol id="svg-logo-acp-stack-4c" viewBox="0 0 179.65 90.33">\n\t<title>logo-acp-logo-stack-4c</title>\n\t<path d="M20.55 59.44h1.07l3 6.91h-1.43l-.65-1.58h-3l-.63 1.58h-1.37zm1.56 4.28l-1.06-2.81L20 63.72zM25 61.67h1.11v.73a1.5 1.5 0 0 1 1.44-.85 1.42 1.42 0 0 1 1.46.87 1.63 1.63 0 0 1 1.55-.87c1.25 0 1.69.89 1.69 2v2.79H31.1V63.7c0-.59-.17-1.1-.87-1.1s-1 .61-1 1.22v2.53h-1.17v-2.79c0-.57-.24-1-.8-1a1.06 1.06 0 0 0-1.08 1.2v2.55H25zM34.1 64.42a1.2 1.2 0 0 0 1.25 1.11 1.53 1.53 0 0 0 1.26-.63l.84.63a2.51 2.51 0 1 1-2-4c1.31 0 2.2.92 2.2 2.55v.32zm2.4-.88a1.08 1.08 0 0 0-1.19-1.11 1.16 1.16 0 0 0-1.21 1.11zM38.37 61.67h1.17v.74a1.48 1.48 0 0 1 1.46-.86 1.54 1.54 0 0 1 .42.07v1.13a2.33 2.33 0 0 0-.57-.09 1.18 1.18 0 0 0-1.26 1.18v2.51h-1.22zM42.56 59.37a.71.71 0 1 1-.74.71.73.73 0 0 1 .74-.71zm-.56 2.3h1.17v4.68H42zM47.32 63.07a1.31 1.31 0 0 0-.89-.47 1.41 1.41 0 0 0 0 2.82 1.15 1.15 0 0 0 .91-.44l.78.84a2.64 2.64 0 0 1-1.69.65 2.46 2.46 0 1 1 0-4.92 2.28 2.28 0 0 1 1.7.71zM51.55 65.71a1.66 1.66 0 0 1-1.5.76 1.53 1.53 0 0 1-1.71-1.4c0-1.53 1.78-1.64 2.95-1.64h.29v-.12c0-.58-.45-.88-1.07-.88a1.8 1.8 0 0 0-1.25.49l-.62-.62a2.74 2.74 0 0 1 2-.75c2 0 2 1.45 2 2.11v2.69h-1.09zm-.06-1.46h-.25c-.64 0-1.76 0-1.76.73 0 .43.44.61.82.61.8 0 1.19-.42 1.19-1.07zM53.67 61.67h1.11v.75a1.48 1.48 0 0 1 1.44-.87A1.64 1.64 0 0 1 58 63.4v2.95h-1.23V64c0-.52 0-1.38-.86-1.38s-1.07.57-1.07 1.2v2.55h-1.17zM65.84 61.06a1.87 1.87 0 0 0-1.45-.68A2.35 2.35 0 0 0 62 62.85a2.38 2.38 0 0 0 2.38 2.57 2 2 0 0 0 1.55-.84l1 .72a3 3 0 0 1-2.57 1.23 3.64 3.64 0 1 1 0-7.27 3 3 0 0 1 2.42 1.1zM69.79 61.55A2.46 2.46 0 1 1 67.24 64a2.43 2.43 0 0 1 2.55-2.45zm0 3.87A1.41 1.41 0 1 0 68.41 64a1.36 1.36 0 0 0 1.38 1.42zM73.06 59h1.17v7.38h-1.17zM75.4 59h1.17v7.38H75.4zM78.66 64.42a1.22 1.22 0 0 0 1.26 1.11 1.53 1.53 0 0 0 1.26-.63l.84.63a2.51 2.51 0 1 1-2-4c1.31 0 2.19.92 2.19 2.55v.32zm2.4-.88a1.08 1.08 0 0 0-1.19-1.11 1.17 1.17 0 0 0-1.21 1.11zM87.76 61.67v4.26c0 1.69-.82 2.77-2.65 2.77a3.35 3.35 0 0 1-2.32-.77l.7-1a2.26 2.26 0 0 0 1.61.67c1.13 0 1.49-.64 1.49-1.57v-.34a1.92 1.92 0 0 1-1.54.68 2.43 2.43 0 0 1 0-4.86 1.79 1.79 0 0 1 1.61.82v-.7zM83.87 64a1.36 1.36 0 0 0 1.38 1.36 1.38 1.38 0 1 0 0-2.76 1.33 1.33 0 0 0-1.38 1.4zM89.63 64.42a1.21 1.21 0 0 0 1.26 1.11 1.56 1.56 0 0 0 1.26-.63l.84.63a2.51 2.51 0 1 1-2-4c1.31 0 2.2.92 2.2 2.55v.32zm2.4-.88a1.08 1.08 0 0 0-1.19-1.11 1.17 1.17 0 0 0-1.21 1.11zM98.71 61.55A2.46 2.46 0 1 1 96.16 64a2.43 2.43 0 0 1 2.55-2.45zm0 3.87A1.41 1.41 0 1 0 97.34 64a1.36 1.36 0 0 0 1.37 1.42zM102.19 62.66h-1v-1h1V61c0-1.3.29-2.15 1.74-2.15a3.74 3.74 0 0 1 .75.07l-.08 1a2.07 2.07 0 0 0-.49-.07c-.65 0-.75.45-.75 1v.85h1.08v1h-1.08v3.69h-1.17zM107.81 59.44h2.32c1.34 0 2.55.47 2.55 2 0 1.74-1.3 2.05-2.76 2.05H109v2.86h-1.23zm2 3c.7 0 1.61 0 1.61-1s-.81-1-1.47-1H109v1.94zM114.44 62.32a1.48 1.48 0 0 1 1.38-.77 1.64 1.64 0 0 1 1.71 1.85v2.95h-1.17V64c0-.52 0-1.38-.86-1.38a1.06 1.06 0 0 0-1.08 1.2v2.55h-1.17V59h1.17zM117.85 61.67h1.29l1.3 3.25 1.18-3.25h1.22l-2.22 5.69a1.69 1.69 0 0 1-1.79 1.34 3.48 3.48 0 0 1-.9-.12l.15-1a2 2 0 0 0 .6.11c.57 0 .73-.2.92-.69l.23-.56zM125.66 63a1.06 1.06 0 0 0-.92-.48c-.32 0-.69.14-.69.5 0 .84 2.53.15 2.53 2 0 1.11-1.06 1.5-2 1.5a2.26 2.26 0 0 1-1.82-.72l.78-.73a1.42 1.42 0 0 0 1.11.57c.34 0 .78-.16.78-.53 0-1-2.53-.21-2.53-2 0-1 .94-1.51 1.89-1.51a2.05 2.05 0 0 1 1.67.71zM127.89 59.37a.71.71 0 1 1-.74.71.72.72 0 0 1 .74-.71zm-.58 2.3h1.17v4.68h-1.17zM132.64 63.07a1.29 1.29 0 0 0-.89-.47 1.41 1.41 0 0 0 0 2.82 1.12 1.12 0 0 0 .91-.44l.78.84a2.64 2.64 0 0 1-1.69.65 2.46 2.46 0 1 1 0-4.92 2.28 2.28 0 0 1 1.7.71zM134.35 59.37a.71.71 0 1 1-.74.71.72.72 0 0 1 .74-.71zm-.58 2.3h1.17v4.68h-1.17zM138.83 65.71a1.67 1.67 0 0 1-1.5.76 1.53 1.53 0 0 1-1.71-1.4c0-1.53 1.77-1.64 2.95-1.64h.29v-.12c0-.58-.45-.88-1.08-.88a1.84 1.84 0 0 0-1.25.49l-.61-.62a2.74 2.74 0 0 1 2-.75c2 0 2 1.45 2 2.11v2.69h-1zm-.07-1.46h-.24c-.65 0-1.76 0-1.76.73 0 .43.44.61.82.61.8 0 1.18-.42 1.18-1.07zM140.94 61.67h1.12v.75a1.46 1.46 0 0 1 1.43-.87 1.64 1.64 0 0 1 1.71 1.85v2.95h-1.17V64c0-.52 0-1.38-.86-1.38s-1.07.57-1.07 1.2v2.55h-1.18zM148.65 63a1 1 0 0 0-.91-.48c-.32 0-.69.14-.69.5 0 .84 2.53.15 2.53 2 0 1.11-1.06 1.5-2 1.5a2.29 2.29 0 0 1-1.83-.72l.79-.73a1.42 1.42 0 0 0 1.11.57c.34 0 .78-.16.78-.53 0-1-2.53-.21-2.53-2 0-1 .94-1.51 1.89-1.51a2.05 2.05 0 0 1 1.67.71zM17.8 71h.68v4.42h2.32v.64h-3zM21.77 74.64a1.07 1.07 0 0 0 1.14 1 1.17 1.17 0 0 0 .93-.51l.48.37a1.75 1.75 0 0 1-1.5.69 1.68 1.68 0 0 1-1.74-1.77 1.72 1.72 0 0 1 1.75-1.78 1.61 1.61 0 0 1 1.65 1.78v.23zm2-.51a.91.91 0 0 0-1-1 1 1 0 0 0-1.05 1zM25.21 73.13a2 2 0 0 1 1.34-.5c1 0 1.41.54 1.41 1.13v1.72a5.59 5.59 0 0 0 0 .62h-.57a4.43 4.43 0 0 1 0-.52 1.27 1.27 0 0 1-1.18.6 1 1 0 0 1-1.17-1c0-.87.83-1.17 1.86-1.17h.47v-.14a.74.74 0 0 0-.81-.72 1.4 1.4 0 0 0-1 .39zM27 74.47c-.61 0-1.35.11-1.35.65 0 .39.28.55.73.55a.92.92 0 0 0 1-1v-.21zM32.23 76.1h-.64v-.49a1.43 1.43 0 0 1-1.18.57 1.78 1.78 0 0 1 0-3.55 1.41 1.41 0 0 1 1.18.57v-2.5h.64zm-.64-1.69a1.12 1.12 0 1 0-1.12 1.17 1.09 1.09 0 0 0 1.12-1.17zM33.51 71a.47.47 0 1 1-.47.47.47.47 0 0 1 .47-.47zm-.32 1.68h.64v3.42h-.64zM34.8 72.71h.64v.52a1.21 1.21 0 0 1 1.12-.6 1.16 1.16 0 0 1 1.22 1.29v2.18h-.64v-2c0-.64-.36-.87-.77-.87s-.94.34-.94 1.13v1.74h-.63zM42 76.07a1.71 1.71 0 0 1-1.85 1.74 2.28 2.28 0 0 1-1.65-.6l.43-.55a1.58 1.58 0 0 0 1.21.55A1.08 1.08 0 0 0 41.31 76v-.5a1.33 1.33 0 0 1-1.17.6 1.76 1.76 0 0 1 0-3.51 1.43 1.43 0 0 1 1.18.57v-.49H42zm-2.87-1.66a1.12 1.12 0 1 0 2.23 0 1.12 1.12 0 1 0-2.23 0zM44.81 71h.69v5.1h-.69zM46.58 72.71h.64v.52a1.22 1.22 0 0 1 1.12-.6 1.17 1.17 0 0 1 1.23 1.29v2.18h-.65v-2c0-.64-.36-.87-.77-.87s-.94.34-.94 1.13v1.74h-.64zM52.16 73.27h-.92v1.54c0 .37 0 .77.48.77a.91.91 0 0 0 .46-.1v.59a1.38 1.38 0 0 1-.58.11c-1 0-1-.6-1-1.15v-1.76h-.74v-.56h.74v-.95h.65v.95h.92zM53.41 74.64a1.07 1.07 0 0 0 1.15 1 1.15 1.15 0 0 0 .92-.51l.49.37a1.76 1.76 0 0 1-1.5.69 1.68 1.68 0 0 1-1.74-1.77 1.71 1.71 0 0 1 1.75-1.78 1.61 1.61 0 0 1 1.65 1.78v.23zm2-.51a.92.92 0 0 0-1-1 1.05 1.05 0 0 0-1.05 1zM56.69 72.71h.65v.52a1.16 1.16 0 0 1 1-.6.82.82 0 0 1 .28 0v.69a1.12 1.12 0 0 0-.31 0c-.63 0-1 .35-1 1.09v1.7h-.65zM59.26 72.71h.65v.52a1.19 1.19 0 0 1 1.11-.6 1.17 1.17 0 0 1 1.23 1.29v2.18h-.64v-2c0-.64-.36-.87-.77-.87s-.94.34-.94 1.13v1.74h-.65zM63.05 73.13a2 2 0 0 1 1.34-.5c1 0 1.41.54 1.41 1.13v1.72a5.59 5.59 0 0 0 0 .62h-.57v-.52a1.27 1.27 0 0 1-1.18.6 1 1 0 0 1-1.17-1c0-.87.83-1.17 1.86-1.17h.47v-.14a.73.73 0 0 0-.8-.72 1.41 1.41 0 0 0-1 .39zm1.81 1.34c-.61 0-1.35.11-1.35.65 0 .39.29.55.73.55a.92.92 0 0 0 1-1v-.21zM66.73 70.7h.64v5.4h-.64zM70.09 71h1l1.61 3.83L74.34 71h1v5.1h-.69v-4.16L73 76.1h-.5l-1.71-4.16v4.16h-.68zM76.73 74.64a1.06 1.06 0 0 0 1.14 1 1.17 1.17 0 0 0 .93-.51l.48.37a1.76 1.76 0 0 1-1.5.69A1.68 1.68 0 0 1 76 74.41a1.71 1.71 0 0 1 1.75-1.78 1.61 1.61 0 0 1 1.65 1.78v.23zm2-.51a.92.92 0 0 0-1-1 1 1 0 0 0-1 1zM83.4 76.1h-.64v-.49a1.43 1.43 0 0 1-1.18.57 1.78 1.78 0 0 1 0-3.55 1.41 1.41 0 0 1 1.18.57v-2.5h.64zm-.64-1.69a1.12 1.12 0 1 0-1.12 1.17 1.09 1.09 0 0 0 1.12-1.17zM84.68 71a.47.47 0 1 1-.47.47.47.47 0 0 1 .47-.47zm-.32 1.68H85v3.42h-.64zM88.39 73.61a1.09 1.09 0 0 0-.85-.38 1.18 1.18 0 0 0 0 2.35 1 1 0 0 0 .82-.37l.46.45a1.78 1.78 0 1 1-1.29-3 1.75 1.75 0 0 1 1.3.54zM89.72 71a.47.47 0 1 1-.47.47.47.47 0 0 1 .47-.47zm-.32 1.68h.6v3.42h-.6zM91 72.71h.65v.52a1.19 1.19 0 0 1 1.11-.6A1.17 1.17 0 0 1 94 73.92v2.18h-.64v-2c0-.64-.36-.87-.77-.87s-.94.34-.94 1.13v1.74H91zM95.4 74.64a1.07 1.07 0 0 0 1.14 1 1.17 1.17 0 0 0 .93-.51l.49.37a1.76 1.76 0 0 1-1.5.69 1.68 1.68 0 0 1-1.75-1.77 1.72 1.72 0 0 1 1.75-1.78 1.61 1.61 0 0 1 1.65 1.78v.23zm2-.51a.92.92 0 0 0-1-1 1 1 0 0 0-1 1zM98.84 77h-.59l.5-1.76h.69zM101.27 71h.73v5.1h-.69zM103 72.71h.6v.53a1.2 1.2 0 0 1 1.08-.61 1.09 1.09 0 0 1 1.06.63 1.21 1.21 0 0 1 1.07-.63c1 0 1.29.74 1.29 1.5v2h-.65v-1.92c0-.51-.1-1-.72-1s-.87.42-.87 1v1.89h-.64v-1.77c0-.65-.09-1.1-.71-1.1-.47 0-.88.35-.88 1.11v1.76H103zM109.06 72.71h.64v.49a1.43 1.43 0 0 1 1.18-.57 1.78 1.78 0 0 1 0 3.55 1.43 1.43 0 0 1-1.18-.57v2.5h-.64zm.64 1.7a1.12 1.12 0 1 0 1.11-1.18 1.08 1.08 0 0 0-1.11 1.18zM113.36 72.71h.64v.52a1.14 1.14 0 0 1 1-.6.92.92 0 0 1 .29 0v.69a1.25 1.25 0 0 0-.32 0c-.63 0-1 .35-1 1.09v1.7h-.64zM117.31 72.63a1.78 1.78 0 1 1-1.8 1.78 1.78 1.78 0 0 1 1.8-1.78zm0 3a1.18 1.18 0 1 0-1.12-1.17 1.08 1.08 0 0 0 1.12 1.12zM119.3 72.71h.75l1 2.6 1-2.6h.69l-1.33 3.39h-.71zM123.59 71a.47.47 0 1 1-.47.47.47.47 0 0 1 .47-.47zm-.32 1.68h.64v3.42h-.64zM124.88 72.71h.64v.52a1.22 1.22 0 0 1 1.12-.6 1.17 1.17 0 0 1 1.23 1.29v2.18h-.65v-2c0-.64-.36-.87-.77-.87s-.94.34-.94 1.13v1.74h-.64zM132 76.07a1.72 1.72 0 0 1-1.85 1.74 2.29 2.29 0 0 1-1.66-.6l.44-.55a1.55 1.55 0 0 0 1.2.55 1.08 1.08 0 0 0 1.26-1.21v-.5a1.33 1.33 0 0 1-1.17.6 1.76 1.76 0 0 1 0-3.51 1.43 1.43 0 0 1 1.18.57v-.49h.6zm-2.88-1.66a1.12 1.12 0 1 0 2.23 0 1.12 1.12 0 1 0-2.23 0zM134.61 71h.68v4.42h2.33v.64h-3zM138.46 71a.47.47 0 0 1 0 .94.47.47 0 0 1 0-.94zm-.32 1.68h.64v3.42h-.64zM139.34 72.71h.74l1 2.6 1-2.6h.68l-1.33 3.39h-.7zM143.74 74.64a1.07 1.07 0 0 0 1.15 1 1.15 1.15 0 0 0 .92-.51l.49.37a1.76 1.76 0 0 1-1.5.69 1.68 1.68 0 0 1-1.74-1.77 1.71 1.71 0 0 1 1.75-1.78 1.61 1.61 0 0 1 1.65 1.78v.23zm2-.51a.92.92 0 0 0-1-1 1.05 1.05 0 0 0-1 1zM149 73.56a.87.87 0 0 0-.7-.33c-.3 0-.56.13-.56.38 0 .4.58.46.86.52.56.14 1 .35 1 1s-.7 1.06-1.37 1.06a1.45 1.45 0 0 1-1.31-.6l.49-.4a1.1 1.1 0 0 0 .82.4c.33 0 .68-.13.68-.42s-.53-.46-.81-.53c-.55-.13-1-.31-1-1s.65-1 1.29-1a1.31 1.31 0 0 1 1.16.55zM70.12 18.06h5.54l15.5 36h-7.32l-3.35-8.24H64.88l-3.25 8.24h-7.17zm8.13 22.26l-5.54-14.64-5.64 14.64zM116.56 26.5c-2.65-2.8-5.09-3.56-7.58-3.56-7.42 0-12.35 5.69-12.35 12.86 0 7.67 4.93 13.37 12.35 13.37 2.9 0 5.69-1.32 8.08-4.37l5.29 3.76C119.1 53 114.22 55 108.93 55c-11.08 0-19-7.52-19-18.75 0-11.54 7.93-19.07 19-19.07a15.65 15.65 0 0 1 12.61 5.7zM125.47 18.06h12.09c7 0 13.27 2.44 13.27 10.42 0 9.05-6.76 10.67-14.38 10.67h-4.58v14.9h-6.4zm10.27 15.6c3.66 0 8.38-.2 8.38-5.08 0-4.42-4.22-5-7.67-5h-4.58v10.08zM37.43 41.07c-1.73.63-4.89 1.56-9.18 2.93-2.32.74-2.67.87-3.72 1.28A4 4 0 0 0 23 46.41a4.38 4.38 0 0 0 .38 5.44A8 8 0 0 0 27 53.26h22.29a3.57 3.57 0 0 0 3.56-3.55V36.87a14.74 14.74 0 0 1-1.05 1.18 13.34 13.34 0 0 1-14.37 3.02zM33.26 19.52c.24-.23.48-.46.73-.67H22a3.55 3.55 0 0 0-3.55 3.55v8.1a6.56 6.56 0 0 1 1.09-.36 1.52 1.52 0 0 1-.35-.95 1.55 1.55 0 0 1 3.09 0 1.52 1.52 0 0 1-.35.95 6.27 6.27 0 0 1 3.46 2.06c1 1.5 1.87.29 2.38 1.29.18.35.31.5.64 1.19a.56.56 0 0 1-.47.77h-9.5v1.37h13.43a13.28 13.28 0 0 1 1.39-17.3z" fill="#008066"/>\n\t<path d="M49.29 18.85H34c-.25.21-.49.44-.73.67a13.28 13.28 0 0 0-1.39 17.27 52.06 52.06 0 0 0 6.64-.27 4.61 4.61 0 0 0 2-1.48 6.31 6.31 0 1 1 2.79.32 18 18 0 0 1-2 3 8.86 8.86 0 0 1-3.7 2.64l-.18.07a13.34 13.34 0 0 0 14.37-3 14.74 14.74 0 0 0 1.05-1.18V22.4a3.56 3.56 0 0 0-3.56-3.55z" fill="#54b948"/>\n\t<path d="M49 29.09A6.32 6.32 0 1 0 40.55 35a5.59 5.59 0 0 0 .52-.83c.19-.37.15-.26.33-.64a4.66 4.66 0 1 1 2.23.06l.39-.1s0 .2-.24.73a10.63 10.63 0 0 1-.46 1.1A6.31 6.31 0 0 0 49 29.09z" fill="#a0cf67"/>\n\t<path d="M49.29 18.06H22a4.34 4.34 0 0 0-4.34 4.34v27.31A4.34 4.34 0 0 0 22 54.05h27.3a4.35 4.35 0 0 0 4.35-4.34V22.4a4.35 4.35 0 0 0-4.36-4.34zm3.56 18.81v12.84a3.57 3.57 0 0 1-3.56 3.55H27a8 8 0 0 1-3.61-1.41 4.38 4.38 0 0 1-.39-5.44 4 4 0 0 1 1.55-1.13c1-.41 1.4-.54 3.72-1.28 4.29-1.37 7.45-2.3 9.18-2.93l.18-.07a8.86 8.86 0 0 0 3.69-2.59 18 18 0 0 0 2-3 10.63 10.63 0 0 0 .46-1.1c.19-.53.24-.73.24-.73l-.39.1H41.89a4.26 4.26 0 0 1-.49-.1c-.18.38-.14.27-.33.64a5.59 5.59 0 0 1-.52.83 4.61 4.61 0 0 1-2 1.48 52.06 52.06 0 0 1-6.64.27H18.48v-1.35h9.49a.56.56 0 0 0 .47-.77c-.33-.69-.46-.84-.64-1.19-.51-1-1.41.21-2.38-1.29a6.27 6.27 0 0 0-3.46-2.06 1.51 1.51 0 0 0-1.19-2.47 1.54 1.54 0 0 0-1.55 1.52 1.52 1.52 0 0 0 .35.95 6.56 6.56 0 0 0-1.09.36v-8.1A3.55 3.55 0 0 1 22 18.85h27.3a3.56 3.56 0 0 1 3.56 3.55z" fill="#ffc425"/>\n\t<path fill="#ee2a24" d="M42.63 25.73l.01.01v-.01h-.01zM42.63 32.41h.01-.01z"/>\n\t<path fill="#e2e76d" d="M42.65 28.19zM42.63 32.41h.01-.01zM42.65 24.43a4.65 4.65 0 0 0-1.25 9.14 4.26 4.26 0 0 0 .49.1H43.63a4.65 4.65 0 0 0-1-9.2zm2 6a2.2 2.2 0 0 1-1.87 2h-.28a2.21 2.21 0 0 1-1.87-2 4.38 4.38 0 0 1 .56-2.43 13 13 0 0 1 1.44-2.23A13 13 0 0 1 44.08 28a4.38 4.38 0 0 1 .56 2.43z"/>\n\t<path fill="#ffc425" d="M42.65 32.05zM42.65 28.19z"/>\n\t<path fill="#ee2a24" d="M42.63 25.73l.01.01v-.01h-.01zM42.63 32.41h.01-.01zM44.08 28a13 13 0 0 0-1.44-2.23A13 13 0 0 0 41.19 28a4.38 4.38 0 0 0-.56 2.46 2.21 2.21 0 0 0 1.87 2h.27a2.2 2.2 0 0 0 1.87-2 4.38 4.38 0 0 0-.56-2.46zm-.27 2.94a1.26 1.26 0 0 1-1.08 1.14h-.16a1.27 1.27 0 0 1-1.08-1.14 2.57 2.57 0 0 1 .32-1.43 8.18 8.18 0 0 1 .84-1.29 7.45 7.45 0 0 1 .84 1.29 2.57 2.57 0 0 1 .32 1.4z"/>\n\t<path fill="#ffc425" d="M42.65 32.05zM42.65 28.19zM42.65 28.19a8.18 8.18 0 0 0-.84 1.29 2.57 2.57 0 0 0-.32 1.43 1.27 1.27 0 0 0 1.08 1.14h.16a1.26 1.26 0 0 0 1.08-1.14 2.57 2.57 0 0 0-.32-1.43 7.45 7.45 0 0 0-.84-1.29z"/>\n\t<path d="M153.23 17.82a2.23 2.23 0 1 1-2.23 2.23 2.23 2.23 0 0 1 2.23-2.23zm0 4.07a1.84 1.84 0 1 0-1.83-1.84 1.84 1.84 0 0 0 1.83 1.84zm-.86-3.13h1c.61 0 .9.28.9.77a.64.64 0 0 1-.61.7l.66 1.08h-.49l-.64-1h-.34v1h-.47zm.47 1.11h.34c.29 0 .61 0 .61-.36s-.32-.36-.61-.35h-.34z" fill="#008066"/>\n</symbol>\n<symbol id="svg-logo-acp-stack-w" viewBox="0 0 71 32">\n<title>logo-acp-logo-stack-w</title>\n<path d="M1.524 21.994h0.559l1.524 3.505h-0.762l-0.305-0.813h-1.524l-0.305 0.813h-0.711l1.524-3.505zM2.337 24.178l-0.559-1.422-0.559 1.422h1.117z"/>\n<path d="M3.81 23.111h0.559v0.356c0.102-0.203 0.356-0.406 0.711-0.406s0.61 0.152 0.762 0.457c0.152-0.305 0.406-0.457 0.762-0.457 0.61 0 0.864 0.457 0.864 1.016v1.422h-0.61v-1.371c0-0.305-0.102-0.559-0.457-0.559s-0.508 0.305-0.508 0.61v1.27h-0.61v-1.422c0-0.305-0.102-0.508-0.406-0.508-0.406 0-0.559 0.305-0.559 0.61v1.321h-0.508v-2.337z"/>\n<path d="M8.432 24.533c0.051 0.356 0.305 0.559 0.66 0.559 0.305 0 0.508-0.152 0.66-0.305l0.406 0.305c-0.254 0.356-0.61 0.457-1.016 0.457-0.711 0-1.27-0.508-1.27-1.27s0.559-1.27 1.27-1.27c0.66 0 1.117 0.457 1.117 1.27v0.152h-1.829v0.102zM9.651 24.076c0-0.356-0.254-0.559-0.61-0.559s-0.559 0.203-0.61 0.559h1.219z"/>\n<path d="M10.565 23.111h0.61v0.356c0.152-0.254 0.406-0.457 0.711-0.457 0.051 0 0.152 0 0.203 0.051v0.559c-0.102 0-0.203-0.051-0.305-0.051-0.559 0-0.66 0.457-0.66 0.61v1.27h-0.61v-2.337h0.051z"/>\n<path d="M12.698 21.943c0.203 0 0.406 0.152 0.406 0.356s-0.152 0.356-0.406 0.356c-0.254 0-0.356-0.152-0.356-0.356s0.152-0.356 0.356-0.356v0zM12.444 23.111h0.61v2.387h-0.61v-2.387z"/>\n<path d="M15.136 23.822c-0.152-0.152-0.305-0.254-0.457-0.254-0.457 0-0.711 0.356-0.711 0.711s0.254 0.711 0.711 0.711c0.203 0 0.356-0.102 0.457-0.203l0.406 0.406c-0.254 0.254-0.66 0.356-0.864 0.356-0.711 0-1.27-0.508-1.27-1.27s0.559-1.27 1.27-1.27c0.305 0 0.61 0.102 0.864 0.356l-0.406 0.457z"/>\n<path d="M17.27 25.194v0c-0.203 0.254-0.457 0.406-0.762 0.406-0.457 0-0.864-0.254-0.864-0.711 0-0.762 0.914-0.813 1.473-0.813h0.152v-0.051c0-0.305-0.203-0.457-0.559-0.457-0.254 0-0.457 0.102-0.61 0.254l-0.305-0.305c0.254-0.254 0.61-0.406 1.016-0.406 1.016 0 1.016 0.711 1.016 1.067v1.371h-0.559v-0.356zM17.27 24.432h-0.102c-0.305 0-0.914 0-0.914 0.356 0 0.203 0.203 0.305 0.406 0.305 0.406 0 0.61-0.203 0.61-0.559v-0.102z"/>\n<path d="M18.337 23.111h0.559v0.406c0.102-0.254 0.356-0.457 0.711-0.457 0.66 0 0.863 0.457 0.863 0.914v1.524h-0.61v-1.219c0-0.254 0-0.711-0.457-0.711-0.406 0-0.559 0.305-0.559 0.61v1.321h-0.61v-2.387h0.102z"/>\n<path d="M24.533 22.806c-0.254-0.254-0.508-0.356-0.762-0.356-0.711 0-1.219 0.559-1.219 1.27 0 0.762 0.457 1.321 1.219 1.321 0.305 0 0.559-0.152 0.813-0.406l0.508 0.356c-0.305 0.457-0.813 0.61-1.321 0.61-1.067 0-1.879-0.711-1.879-1.829s0.762-1.879 1.879-1.879c0.457 0 0.863 0.152 1.219 0.559l-0.457 0.356z"/>\n<path d="M26.565 23.060c0.711 0 1.27 0.508 1.27 1.27s-0.559 1.27-1.27 1.27c-0.711 0-1.27-0.508-1.27-1.27s0.508-1.27 1.27-1.27v0zM26.565 25.041c0.457 0 0.711-0.356 0.711-0.711s-0.254-0.711-0.711-0.711c-0.457 0-0.711 0.356-0.711 0.711s0.254 0.711 0.711 0.711v0z"/>\n<path d="M28.19 21.74h0.61v3.759h-0.61v-3.759z"/>\n<path d="M29.41 21.74h0.559v3.759h-0.61v-3.759h0.051z"/>\n<path d="M31.035 24.533c0.051 0.356 0.305 0.559 0.66 0.559 0.305 0 0.508-0.152 0.66-0.305l0.406 0.305c-0.254 0.356-0.61 0.457-1.016 0.457-0.711 0-1.27-0.508-1.27-1.27s0.559-1.27 1.27-1.27c0.66 0 1.117 0.457 1.117 1.27v0.152h-1.829v0.102zM32.254 24.076c0-0.356-0.254-0.559-0.61-0.559s-0.559 0.203-0.61 0.559h1.219z"/>\n<path d="M35.657 23.111v2.184c0 0.863-0.406 1.422-1.321 1.422-0.457 0-0.864-0.102-1.168-0.406l0.356-0.508c0.254 0.203 0.508 0.356 0.813 0.356 0.559 0 0.762-0.305 0.762-0.813v-0.152c-0.152 0.254-0.457 0.356-0.762 0.356-0.711 0-1.168-0.559-1.168-1.219 0-0.711 0.457-1.27 1.168-1.27 0.356 0 0.66 0.152 0.813 0.406v0-0.356h0.508zM33.676 24.33c0 0.356 0.305 0.711 0.711 0.711 0.457 0 0.711-0.305 0.711-0.711s-0.254-0.711-0.711-0.711c-0.406 0-0.711 0.254-0.711 0.711v0z"/>\n<path d="M36.622 24.533c0.051 0.356 0.305 0.559 0.66 0.559 0.305 0 0.508-0.152 0.66-0.305l0.406 0.305c-0.254 0.356-0.61 0.457-1.016 0.457-0.711 0-1.27-0.508-1.27-1.27s0.559-1.27 1.27-1.27c0.66 0 1.117 0.457 1.117 1.27v0.152h-1.829v0.102zM37.841 24.076c0-0.356-0.254-0.559-0.61-0.559s-0.559 0.203-0.61 0.559h1.219z"/>\n<path d="M41.244 23.060c0.711 0 1.27 0.508 1.27 1.27s-0.559 1.27-1.27 1.27c-0.711 0-1.27-0.508-1.27-1.27s0.559-1.27 1.27-1.27v0zM41.244 25.041c0.457 0 0.711-0.356 0.711-0.711s-0.254-0.711-0.711-0.711c-0.457 0-0.711 0.356-0.711 0.711s0.254 0.711 0.711 0.711v0z"/>\n<path d="M43.022 23.619h-0.508v-0.508h0.508v-0.356c0-0.66 0.152-1.067 0.864-1.067 0.152 0 0.254 0 0.356 0.051l-0.051 0.508c-0.102 0-0.152-0.051-0.254-0.051-0.356 0-0.406 0.203-0.406 0.508v0.406h0.559v0.508h-0.559v1.879h-0.61v-1.879h0.102z"/>\n<path d="M45.867 21.994h1.168c0.66 0 1.27 0.254 1.27 1.016 0 0.863-0.66 1.067-1.422 1.067h-0.457v1.473h-0.61v-3.556h0.051zM46.883 23.517c0.356 0 0.813 0 0.813-0.508 0-0.406-0.406-0.508-0.762-0.508h-0.457v0.965h0.406v0.051z"/>\n<path d="M49.219 23.467v0c0.102-0.203 0.356-0.406 0.711-0.406 0.66 0 0.864 0.457 0.864 0.914v1.524h-0.61v-1.219c0-0.254 0-0.711-0.457-0.711-0.406 0-0.559 0.305-0.559 0.61v1.321h-0.61v-3.759h0.61v1.727h0.051z"/>\n<path d="M50.946 23.111h0.66l0.66 1.676 0.61-1.676h0.61l-1.117 2.895c-0.152 0.457-0.406 0.66-0.914 0.66-0.152 0-0.305 0-0.457-0.051l0.051-0.559c0.102 0.051 0.203 0.051 0.305 0.051 0.305 0 0.356-0.102 0.457-0.356l0.102-0.305-0.965-2.337z"/>\n<path d="M54.908 23.771c-0.102-0.152-0.254-0.254-0.457-0.254-0.152 0-0.356 0.051-0.356 0.254 0 0.406 1.27 0.102 1.27 1.016 0 0.559-0.559 0.762-1.016 0.762-0.356 0-0.66-0.102-0.914-0.356l0.406-0.356c0.152 0.152 0.305 0.305 0.559 0.305 0.152 0 0.406-0.102 0.406-0.254 0-0.508-1.27-0.102-1.27-1.016 0-0.508 0.457-0.762 0.965-0.762 0.305 0 0.66 0.102 0.864 0.356l-0.457 0.305z"/>\n<path d="M56.076 21.943c0.203 0 0.406 0.152 0.406 0.356s-0.152 0.356-0.406 0.356c-0.254 0-0.356-0.152-0.356-0.356s0.152-0.356 0.356-0.356v0zM55.771 23.111h0.61v2.387h-0.61v-2.387z"/>\n<path d="M58.464 23.822c-0.152-0.152-0.305-0.254-0.457-0.254-0.457 0-0.711 0.356-0.711 0.711s0.254 0.711 0.711 0.711c0.203 0 0.356-0.102 0.457-0.203l0.406 0.406c-0.254 0.254-0.66 0.356-0.864 0.356-0.711 0-1.27-0.508-1.27-1.27s0.559-1.27 1.27-1.27c0.305 0 0.61 0.102 0.864 0.356l-0.406 0.457z"/>\n<path d="M59.327 21.943c0.203 0 0.406 0.152 0.406 0.356s-0.152 0.356-0.406 0.356c-0.254 0-0.356-0.152-0.356-0.356s0.152-0.356 0.356-0.356v0zM59.073 23.111h0.61v2.387h-0.61v-2.387z"/>\n<path d="M61.613 25.194v0c-0.203 0.254-0.457 0.406-0.762 0.406-0.457 0-0.864-0.254-0.864-0.711 0-0.762 0.914-0.813 1.473-0.813h0.152v-0.051c0-0.305-0.203-0.457-0.559-0.457-0.254 0-0.457 0.102-0.61 0.254l-0.305-0.305c0.254-0.254 0.61-0.406 1.016-0.406 1.016 0 1.016 0.711 1.016 1.067v1.371h-0.559v-0.356zM61.613 24.432h-0.152c-0.305 0-0.914 0-0.914 0.356 0 0.203 0.203 0.305 0.406 0.305 0.406 0 0.61-0.203 0.61-0.559v-0.102h0.051z"/>\n<path d="M62.679 23.111h0.559v0.406c0.102-0.254 0.356-0.457 0.711-0.457 0.66 0 0.864 0.457 0.864 0.914v1.524h-0.61v-1.219c0-0.254 0-0.711-0.457-0.711-0.406 0-0.559 0.305-0.559 0.61v1.321h-0.61v-2.387h0.102z"/>\n<path d="M66.641 23.771c-0.102-0.152-0.254-0.254-0.457-0.254-0.152 0-0.356 0.051-0.356 0.254 0 0.406 1.27 0.102 1.27 1.016 0 0.559-0.559 0.762-1.016 0.762-0.356 0-0.66-0.102-0.914-0.356l0.406-0.356c0.152 0.152 0.305 0.305 0.559 0.305 0.152 0 0.406-0.102 0.406-0.254 0-0.508-1.27-0.102-1.27-1.016 0-0.508 0.457-0.762 0.965-0.762 0.305 0 0.66 0.102 0.864 0.356l-0.457 0.305z"/>\n<path d="M0.152 27.936h0.356v2.235h1.168v0.305h-1.524v-2.54z"/>\n<path d="M2.133 29.765c0 0.305 0.254 0.508 0.559 0.508 0.203 0 0.356-0.102 0.457-0.254l0.254 0.203c-0.203 0.254-0.457 0.356-0.762 0.356-0.559 0-0.864-0.406-0.864-0.914s0.356-0.914 0.864-0.914c0.61 0 0.813 0.457 0.813 0.914v0.102h-1.321zM3.2 29.511c0-0.305-0.152-0.508-0.508-0.508-0.305 0-0.508 0.254-0.508 0.508h1.016z"/>\n<path d="M3.911 29.003c0.152-0.203 0.406-0.254 0.66-0.254 0.508 0 0.711 0.254 0.711 0.559v1.168h-0.254v-0.254c-0.152 0.203-0.356 0.305-0.61 0.305-0.305 0-0.61-0.203-0.61-0.508 0-0.457 0.406-0.61 0.965-0.61h0.254v-0.051c0-0.203-0.152-0.356-0.406-0.356s-0.356 0.102-0.508 0.203l-0.203-0.203zM4.825 29.663c-0.305 0-0.66 0.051-0.66 0.305 0 0.203 0.152 0.305 0.356 0.305 0.356 0 0.508-0.254 0.508-0.508v-0.102h-0.203z"/>\n<path d="M7.467 30.476h-0.356v-0.254c-0.102 0.203-0.356 0.305-0.61 0.305-0.508 0-0.864-0.406-0.864-0.914s0.356-0.914 0.864-0.914c0.254 0 0.457 0.102 0.61 0.305v0-1.27h0.305v2.743h0.051zM7.111 29.663c0-0.356-0.203-0.61-0.559-0.61s-0.559 0.254-0.559 0.61c0 0.356 0.203 0.61 0.559 0.61s0.559-0.305 0.559-0.61v0z"/>\n<path d="M8.127 27.936c0.152 0 0.254 0.102 0.254 0.254s-0.102 0.254-0.254 0.254c-0.152 0-0.254-0.102-0.254-0.254s0.102-0.254 0.254-0.254v0zM7.924 28.8h0.305v1.676h-0.305v-1.676z"/>\n<path d="M8.787 28.8h0.305v0.254c0.102-0.203 0.305-0.305 0.559-0.305 0.356 0 0.61 0.203 0.61 0.66v1.067h-0.305v-1.016c0-0.305-0.203-0.457-0.406-0.457-0.254 0-0.457 0.152-0.457 0.559v0.914h-0.305v-1.676z"/>\n<path d="M12.394 30.476c0 0.508-0.356 0.863-0.914 0.863-0.305 0-0.61-0.102-0.864-0.305l0.203-0.254c0.152 0.203 0.356 0.254 0.61 0.254 0.508 0 0.61-0.305 0.61-0.61v-0.254c-0.102 0.203-0.356 0.305-0.61 0.305-0.508 0-0.864-0.406-0.864-0.863 0-0.508 0.356-0.914 0.864-0.914 0.254 0 0.457 0.102 0.61 0.305v0-0.254h0.305v1.727h0.051zM10.921 29.663c0 0.356 0.203 0.559 0.559 0.559s0.559-0.203 0.559-0.559c0-0.356-0.203-0.61-0.559-0.61s-0.559 0.254-0.559 0.61v0z"/>\n<path d="M13.867 27.936h0.356v2.54h-0.356v-2.54z"/>\n<path d="M14.73 28.8h0.305v0.254c0.102-0.203 0.305-0.305 0.559-0.305 0.356 0 0.61 0.203 0.61 0.66v1.067h-0.305v-1.016c0-0.305-0.203-0.457-0.406-0.457-0.254 0-0.457 0.152-0.457 0.559v0.914h-0.305v-1.676z"/>\n<path d="M17.575 29.054h-0.457v0.762c0 0.203 0 0.406 0.254 0.406 0.051 0 0.152 0 0.254-0.051v0.305c-0.051 0.051-0.203 0.051-0.305 0.051-0.508 0-0.508-0.305-0.508-0.559v-0.914h-0.356v-0.305h0.356v-0.457h0.305v0.457h0.457v0.305z"/>\n<path d="M18.235 29.765c0 0.305 0.254 0.508 0.559 0.508 0.203 0 0.356-0.102 0.457-0.254l0.254 0.203c-0.203 0.254-0.457 0.356-0.762 0.356-0.559 0-0.863-0.406-0.863-0.914s0.356-0.914 0.863-0.914c0.61 0 0.813 0.457 0.813 0.914v0.102h-1.321zM19.251 29.511c0-0.305-0.152-0.508-0.508-0.508-0.305 0-0.508 0.254-0.508 0.508h1.016z"/>\n<path d="M19.911 28.8h0.305v0.254c0.102-0.203 0.305-0.305 0.508-0.305h0.152v0.356c-0.051 0-0.102-0.051-0.152-0.051-0.305 0-0.508 0.152-0.508 0.559v0.863h-0.305v-1.676z"/>\n<path d="M21.181 28.8h0.305v0.254c0.102-0.203 0.305-0.305 0.559-0.305 0.356 0 0.61 0.203 0.61 0.66v1.067h-0.305v-1.016c0-0.305-0.203-0.457-0.406-0.457-0.254 0-0.457 0.152-0.457 0.559v0.914h-0.305v-1.676z"/>\n<path d="M23.111 29.003c0.203-0.152 0.457-0.254 0.66-0.254 0.508 0 0.711 0.254 0.711 0.559v1.168h-0.305v-0.254c-0.152 0.203-0.356 0.305-0.61 0.305-0.305 0-0.61-0.203-0.61-0.508 0-0.457 0.406-0.61 0.965-0.61h0.254v-0.051c0-0.203-0.152-0.356-0.406-0.356s-0.356 0.102-0.508 0.203l-0.152-0.203zM24.025 29.663c-0.305 0-0.66 0.051-0.66 0.305 0 0.203 0.152 0.305 0.356 0.305 0.356 0 0.508-0.254 0.508-0.508v-0.102h-0.203z"/>\n<path d="M24.99 27.733h0.305v2.743h-0.305v-2.743z"/>\n<path d="M26.667 27.936h0.508l0.813 1.93 0.813-1.93h0.508v2.54h-0.356v-2.133l-0.813 2.133h-0.203l-0.863-2.133v2.133h-0.356v-2.54h-0.051z"/>\n<path d="M30.070 29.765c0 0.305 0.254 0.508 0.559 0.508 0.203 0 0.356-0.102 0.457-0.254l0.254 0.203c-0.203 0.254-0.457 0.356-0.762 0.356-0.559 0-0.863-0.406-0.863-0.914s0.356-0.914 0.863-0.914c0.61 0 0.813 0.457 0.813 0.914v0.102h-1.321zM31.086 29.511c0-0.305-0.152-0.508-0.508-0.508-0.305 0-0.508 0.254-0.508 0.508h1.016z"/>\n<path d="M33.473 30.476h-0.305v-0.254c-0.102 0.203-0.356 0.305-0.61 0.305-0.508 0-0.863-0.406-0.863-0.914s0.356-0.914 0.863-0.914c0.254 0 0.457 0.102 0.61 0.305v0-1.27h0.305v2.743zM33.117 29.663c0-0.356-0.203-0.61-0.559-0.61s-0.559 0.254-0.559 0.61c0 0.356 0.203 0.61 0.559 0.61s0.559-0.305 0.559-0.61v0z"/>\n<path d="M34.083 27.936c0.152 0 0.254 0.102 0.254 0.254s-0.102 0.254-0.254 0.254c-0.152 0-0.254-0.102-0.254-0.254 0.051-0.152 0.152-0.254 0.254-0.254v0zM33.93 28.8h0.305v1.676h-0.305v-1.676z"/>\n<path d="M35.962 29.257c-0.102-0.102-0.254-0.203-0.406-0.203-0.356 0-0.559 0.305-0.559 0.61s0.203 0.559 0.559 0.559c0.203 0 0.305-0.051 0.406-0.203l0.254 0.254c-0.152 0.203-0.406 0.254-0.66 0.254-0.508 0-0.914-0.356-0.914-0.914s0.356-0.914 0.914-0.914c0.254 0 0.508 0.102 0.66 0.254l-0.254 0.305z"/>\n<path d="M36.673 27.936c0.152 0 0.254 0.102 0.254 0.254s-0.102 0.254-0.254 0.254c-0.152 0-0.254-0.102-0.254-0.254s0.102-0.254 0.254-0.254v0zM36.521 28.8h0.305v1.676h-0.305v-1.676z"/>\n<path d="M37.333 28.8h0.305v0.254c0.102-0.203 0.305-0.305 0.559-0.305 0.356 0 0.61 0.203 0.61 0.66v1.067h-0.305v-1.016c0-0.305-0.203-0.457-0.406-0.457-0.254 0-0.457 0.152-0.457 0.559v0.914h-0.305v-1.676z"/>\n<path d="M39.568 29.765c0 0.305 0.254 0.508 0.559 0.508 0.203 0 0.356-0.102 0.457-0.254l0.254 0.203c-0.203 0.254-0.457 0.356-0.762 0.356-0.559 0-0.864-0.406-0.864-0.914s0.356-0.914 0.864-0.914c0.61 0 0.813 0.457 0.813 0.914v0.102h-1.321zM40.584 29.511c0-0.305-0.152-0.508-0.508-0.508-0.305 0-0.508 0.254-0.508 0.508h1.016z"/>\n<path d="M41.295 30.984h-0.305l0.254-0.914h0.356l-0.305 0.914z"/>\n<path d="M42.514 27.936h0.356v2.54h-0.356v-2.54z"/>\n<path d="M43.429 28.8h0.305v0.254c0.051-0.102 0.254-0.305 0.559-0.305 0.254 0 0.406 0.102 0.559 0.305 0.102-0.203 0.356-0.305 0.559-0.305 0.508 0 0.66 0.356 0.66 0.762v1.016h-0.356v-0.965c0-0.254-0.051-0.508-0.356-0.508s-0.457 0.203-0.457 0.508v0.914h-0.305v-0.914c0-0.305-0.051-0.559-0.356-0.559-0.254 0-0.457 0.152-0.457 0.559v0.914h-0.305v-1.676h-0.051z"/>\n<path d="M46.476 28.8h0.305v0.254c0.102-0.203 0.356-0.305 0.61-0.305 0.508 0 0.864 0.406 0.864 0.914s-0.356 0.914-0.864 0.914c-0.254 0-0.457-0.102-0.61-0.305v0 1.27h-0.305v-2.743zM46.832 29.663c0 0.356 0.203 0.61 0.559 0.61s0.559-0.254 0.559-0.61c0-0.356-0.203-0.61-0.559-0.61s-0.559 0.254-0.559 0.61v0z"/>\n<path d="M48.66 28.8h0.305v0.254c0.102-0.203 0.305-0.305 0.508-0.305h0.152v0.356c-0.051 0-0.102-0.051-0.152-0.051-0.305 0-0.508 0.152-0.508 0.559v0.863h-0.305v-1.676z"/>\n<path d="M50.692 28.749c0.508 0 0.914 0.406 0.914 0.914s-0.406 0.914-0.914 0.914c-0.508 0-0.914-0.457-0.914-0.914s0.406-0.914 0.914-0.914v0zM50.692 30.222c0.356 0 0.559-0.254 0.559-0.61s-0.203-0.61-0.559-0.61c-0.356 0-0.559 0.254-0.559 0.61s0.203 0.61 0.559 0.61v0z"/>\n<path d="M51.708 28.8h0.356l0.508 1.321 0.508-1.321h0.356l-0.66 1.727h-0.356l-0.711-1.727z"/>\n<path d="M53.841 27.936c0.152 0 0.254 0.102 0.254 0.254s-0.102 0.254-0.254 0.254c-0.152 0-0.254-0.102-0.254-0.254 0.051-0.152 0.152-0.254 0.254-0.254v0zM53.689 28.8h0.305v1.676h-0.305v-1.676z"/>\n<path d="M54.502 28.8h0.305v0.254c0.102-0.203 0.305-0.305 0.559-0.305 0.356 0 0.61 0.203 0.61 0.66v1.067h-0.305v-1.016c0-0.305-0.203-0.457-0.406-0.457-0.254 0-0.457 0.152-0.457 0.559v0.914h-0.305v-1.676z"/>\n<path d="M58.159 30.476c0 0.508-0.356 0.863-0.914 0.863-0.305 0-0.61-0.102-0.864-0.305l0.203-0.254c0.152 0.203 0.356 0.254 0.61 0.254 0.508 0 0.61-0.305 0.61-0.61v-0.254c-0.102 0.203-0.356 0.305-0.61 0.305-0.508 0-0.864-0.406-0.864-0.863 0-0.508 0.356-0.914 0.864-0.914 0.254 0 0.457 0.102 0.61 0.305v0-0.254h0.305v1.727h0.051zM56.686 29.663c0 0.356 0.203 0.559 0.559 0.559s0.559-0.203 0.559-0.559c0-0.356-0.203-0.61-0.559-0.61s-0.559 0.254-0.559 0.61v0z"/>\n<path d="M59.479 27.936h0.356v2.235h1.168v0.305h-1.524v-2.54z"/>\n<path d="M61.41 27.936c0.152 0 0.254 0.102 0.254 0.254s-0.102 0.254-0.254 0.254c-0.152 0-0.254-0.102-0.254-0.254s0.152-0.254 0.254-0.254v0zM61.257 28.8h0.305v1.676h-0.305v-1.676z"/>\n<path d="M61.867 28.8h0.356l0.508 1.321 0.508-1.321h0.356l-0.66 1.727h-0.356l-0.711-1.727z"/>\n<path d="M64.102 29.765c0 0.305 0.254 0.508 0.559 0.508 0.203 0 0.356-0.102 0.457-0.254l0.254 0.203c-0.203 0.254-0.457 0.356-0.762 0.356-0.559 0-0.864-0.406-0.864-0.914s0.356-0.914 0.864-0.914c0.61 0 0.813 0.457 0.813 0.914v0.102h-1.321zM65.117 29.511c0-0.305-0.152-0.508-0.508-0.508-0.305 0-0.508 0.254-0.508 0.508h1.016z"/>\n<path d="M66.743 29.206c-0.051-0.102-0.203-0.152-0.356-0.152s-0.305 0.051-0.305 0.203c0 0.203 0.305 0.254 0.457 0.254 0.305 0.051 0.508 0.203 0.508 0.508 0 0.406-0.356 0.559-0.711 0.559-0.305 0-0.508-0.051-0.66-0.305l0.254-0.203c0.102 0.102 0.203 0.203 0.406 0.203 0.152 0 0.356-0.051 0.356-0.203 0-0.203-0.254-0.254-0.406-0.254-0.254-0.051-0.508-0.152-0.508-0.508s0.305-0.508 0.66-0.508c0.203 0 0.457 0.102 0.61 0.305l-0.305 0.102z"/>\n<path d="M26.717 0.965h2.794l7.873 18.286h-3.708l-1.676-4.165h-7.924l-1.676 4.165h-3.657l7.975-18.286zM30.832 12.292l-2.794-7.467-2.844 7.416h5.638v0.051z"/>\n<path d="M50.286 5.283c-1.321-1.422-2.59-1.829-3.86-1.829-3.759 0-6.298 2.895-6.298 6.552 0.051 3.86 2.54 6.756 6.349 6.756 1.473 0 2.895-0.66 4.114-2.235l2.692 1.93c-1.676 2.286-4.114 3.251-6.806 3.251-5.638 0-9.651-3.81-9.651-9.549-0.051-5.841 3.962-9.651 9.6-9.651 2.489 0 4.622 0.813 6.4 2.895l-2.54 1.879z"/>\n<path d="M54.857 0.965h6.146c3.556 0 6.756 1.219 6.756 5.283 0 4.622-3.454 5.435-7.314 5.435h-2.337v7.568h-3.251v-18.286zM60.038 8.889c1.879 0 4.267-0.102 4.267-2.59 0-2.235-2.133-2.54-3.911-2.54h-2.337v5.13h1.981z"/>\n<path d="M12.749 6.095v0z"/>\n<path d="M12.749 6.146v0c0 0-0.254 0.305-0.406 0.66-0.152 0.305-0.203 0.508-0.152 0.711 0 0.254 0.254 0.559 0.559 0.559h0.102c0.305 0 0.508-0.356 0.559-0.559 0-0.203 0-0.457-0.152-0.711-0.254-0.356-0.508-0.66-0.508-0.66v0z"/>\n<path d="M13.206 6.756c0.152 0.305 0.203 0.508 0.152 0.711 0 0.254-0.254 0.559-0.559 0.559 0 0 0 0-0.051 0v0 0 0c0 0 0 0-0.051 0-0.305 0-0.508-0.356-0.559-0.559 0-0.203 0-0.457 0.152-0.711 0.152-0.356 0.406-0.66 0.406-0.66v0c0.051 0.051 0.305 0.356 0.508 0.66v0zM18.337 3.2v0 13.867c0 1.219-0.965 2.184-2.184 2.184h-13.917c-1.219 0-2.184-0.965-2.184-2.184v-13.867c0-1.219 0.965-2.184 2.184-2.184h13.867c1.27-0.051 2.235 0.965 2.235 2.184v0zM17.829 3.2c0-0.965-0.762-1.727-1.727-1.727h-7.467l-0.102 0.102c-0.152 0.102-0.254 0.203-0.356 0.305-1.422 1.422-2.083 3.352-1.879 5.384v0.152c0.152 1.117 0.559 2.184 1.27 3.098 1.727 0 2.895-0.051 3.098-0.152 0.356-0.152 0.61-0.305 0.864-0.559-1.321-0.508-2.235-1.778-2.235-3.2 0-1.879 1.524-3.454 3.454-3.454 1.879 0 3.454 1.524 3.454 3.454 0 1.829-1.422 3.302-3.251 3.454-0.254 0.457-0.559 0.864-0.914 1.321-0.406 0.457-0.864 0.864-1.625 1.219 0.457 0.152 0.965 0.254 1.473 0.305 0.254 0 0.457 0.051 0.711 0.051 1.727 0 3.403-0.711 4.622-1.93 0.152-0.152 0.356-0.356 0.508-0.559l0.102-0.152v-7.111zM17.829 17.067v-6.044c-0.102 0.102-0.152 0.203-0.254 0.254-1.321 1.321-3.098 2.083-4.978 2.083v0c-0.864 0-1.727-0.152-2.59-0.508l-0.254-0.102c-0.914 0.305-2.387 0.762-4.317 1.371-1.168 0.406-1.371 0.457-1.879 0.66-0.406 0.203-0.508 0.254-0.813 0.559-0.559 0.61-0.559 2.133 0.203 2.743 0.254 0.203 0.813 0.457 1.321 0.61h11.835c0.965 0.051 1.727-0.711 1.727-1.625v0zM0.559 10.514h6.4c-1.879-2.743-1.575-6.552 0.864-8.99l0.051-0.051h-5.638c-0.965 0-1.727 0.762-1.727 1.727v4.064c0.203-0.051 0.356-0.102 0.508-0.152-0.102-0.152-0.152-0.305-0.152-0.457 0-0.406 0.356-0.762 0.762-0.762 0.457 0 0.762 0.356 0.762 0.762 0 0.203-0.051 0.356-0.152 0.457 0.508 0.102 1.422 0.508 1.778 1.067 0.508 0.762 0.965 0.152 1.219 0.66 0.102 0.203 0.152 0.254 0.305 0.61 0.102 0.152-0.051 0.406-0.254 0.406h-4.724v0.66zM13.206 9.498c1.422-0.254 2.489-1.473 2.489-2.895 0-1.625-1.321-2.946-2.946-2.946s-2.946 1.321-2.946 2.946c0 1.27 0.813 2.387 1.981 2.794h0.051c0.051-0.051 0.102-0.152 0.102-0.203 0.051-0.102 0.051-0.102 0.102-0.152-1.067-0.305-1.829-1.321-1.829-2.438 0-1.422 1.168-2.54 2.54-2.54 1.422 0 2.59 1.168 2.59 2.54 0 1.168-0.813 2.184-1.93 2.489 0 0.051-0.051 0.102-0.051 0.152-0.051 0.051-0.102 0.152-0.152 0.254v0zM13.765 7.263c0.051-0.356-0.051-0.762-0.305-1.27-0.305-0.61-0.711-1.117-0.711-1.117v0c0 0-0.457 0.508-0.711 1.117-0.254 0.508-0.305 0.864-0.305 1.27 0.051 0.406 0.457 1.016 0.965 1.016h0.102c0.559 0 0.914-0.61 0.965-1.016v0z"/>\n<path d="M69.841 2.533c0.698 0 1.263-0.566 1.263-1.263s-0.566-1.263-1.263-1.263c-0.698 0-1.263 0.566-1.263 1.263s0.566 1.263 1.263 1.263zM69.841 2.277c-0.556 0-1.007-0.451-1.007-1.007s0.451-1.007 1.007-1.007c0.556 0 1.007 0.451 1.007 1.007s-0.451 1.007-1.007 1.007z"/>\n<path d="M69.628 1.402v0.5h-0.341v-1.322h0.521c0.174 0 0.302 0.029 0.383 0.088s0.122 0.151 0.122 0.277c0 0.087-0.021 0.159-0.064 0.215s-0.105 0.097-0.19 0.124c0.047 0.011 0.088 0.035 0.125 0.073s0.075 0.094 0.112 0.17l0.185 0.376h-0.363l-0.161-0.329c-0.032-0.066-0.066-0.111-0.099-0.136s-0.077-0.036-0.133-0.036h-0.097zM69.771 1.167c0.071 0 0.123-0.013 0.153-0.040s0.047-0.070 0.047-0.131c0-0.060-0.016-0.103-0.047-0.129s-0.082-0.039-0.153-0.039h-0.144v0.339h0.144z"/>\n</symbol>\n<symbol id="svg-logo-acp-tracker18-4c" viewBox="0 0 139 31.8">\n  <style>.st0{fill:#be0f34}.st1{fill:#ffc82e}.st2{fill:#007e66}</style>\n  <switch>\n    <g>\n      <title>logo-acp-tracker18-4c</title>\n      <g id="mksap">\n        <path class="st0" d="M48.8 13.5L53.7.8h3.6v16.5H55V3.5l-5.6 13.8H48L42.5 3.5v13.8h-2.2V.8h3.6l4.9 12.7zM63.6 8L71 .8h3.2l-8 7.5 8.5 9h-3.3l-7.7-8.6v8.5h-2.4V.8h2.3V8zM84.8 3.8c-.8-1-2-1.6-3.2-1.5-1.5 0-3.2.8-3.2 2.7s1.5 2.3 3.4 2.9c2.2.7 4.8 1.5 4.8 4.8s-2.8 5-5.7 5c-2.1 0-4.1-.8-5.4-2.4l1.8-1.5c.8 1.2 2.2 2 3.7 1.9 1.5 0 3.3-.9 3.3-2.8s-1.8-2.5-3.9-3.2-4.3-1.6-4.3-4.6c0-3.3 2.9-4.7 5.7-4.7 1.8 0 3.5.6 4.7 1.9l-1.7 1.5zM90.6 17.3H88L95.1.8h2.1l7.1 16.5h-2.6l-1.7-4h-7.8l-1.6 4zm2.4-6.1h6.2l-3-7.7-3.2 7.7zM106.4.8h5c3.6 0 5.9 1.4 5.9 4.6s-2.6 4.7-6 4.7h-2.6v7.3h-2.3V.8zm2.3 7.3h2.4c2.3 0 3.8-.8 3.8-2.7s-1.6-2.6-3.8-2.6h-2.5l.1 5.3z"/>\n      </g>\n      <path id="divider" class="st1" d="M33.7 0h1.6v31.8h-1.6z"/>\n      <g id="acp">\n        <path class="st2" d="M4.6 6.8h1.6l4.5 10.5H8.6l-1-2.4H3l-1 2.4H0L4.6 6.8zm2.3 6.5L5.3 9l-1.6 4.3h3.2zM18.7 9.2c-.6-.7-1.5-1.1-2.4-1.1-2 0-3.6 1.6-3.6 3.6v.2c0 2.3 1.4 3.9 3.6 3.9 1 0 1.9-.4 2.5-1.2l1.5 1.1c-1 1.2-2.5 1.9-4.1 1.8-2.9.1-5.5-2.1-5.6-5.1v-.5c-.1-2.9 2.2-5.4 5.2-5.5h.5c1.4-.1 2.8.5 3.8 1.6l-1.4 1.2zM21.4 6.8h3.4c2.4 0 4 .9 4 3s-1.9 3.1-4.1 3.1h-1.5v4.3h-1.9V6.8zm3.1 4.6c1.2 0 2.3-.3 2.3-1.5s-1.1-1.5-2.3-1.5h-1.4v3h1.4z"/>\n      </g>\n      <path class="st0" d="M119.3 1.8c0 .6-.4 1-.9 1.1h-.1c-.6 0-1.1-.5-1.1-1s.5-1 1.1-1c.6 0 1 .4 1.1.9-.1-.1-.1-.1-.1 0zm-1.9 0c0 .4.3.8.7.9.4 0 .8-.3.9-.7v-.2c0-.4-.3-.8-.7-.9s-.8.3-.9.7v.2zm.7.5h-.2v-1h.4c.1 0 .2 0 .4.1.1.1.1.1.1.2s-.1.2-.2.2c.1 0 .2.1.2.2s0 .2.1.3h-.3c0-.1-.1-.2-.1-.2 0-.1-.1-.2-.2-.2h-.1v.4zm0-.6h.1c.1 0 .2 0 .2-.2s-.1-.2-.2-.2h-.1v.4z" id="registered"/>\n      <g id="_18">\n        <path d="M124 .8h12.9c.9 0 1.6.7 1.6 1.7v13.1c0 .9-.7 1.7-1.6 1.7H124c-.9 0-1.6-.7-1.6-1.7V2.4c-.1-.9.7-1.6 1.6-1.6z" fill="#003479"/>\n        <path class="st1" d="M135.9 8.4c1.2-.3 2.2-1.3 2.2-2.6 0-1.9-1.9-2.8-3.7-2.8-2.2 0-4.2 1.1-4.2 3.1 0 1.4.9 2.7 2.2 3.3-1.4.2-2.5 1.4-2.7 2.8 0 .5.1 1 .3 1.5-.6-.1-1.1-.2-1.1-.6v-10h-.6L124.1 5l.3.7 1.6-.4v8c0 .5-.7.6-1.6.6v.6h6.3c1.1.7 2.4 1 3.7.9 2.3 0 4.8-.5 4.8-3.7-.2-1.7-1.9-2.6-3.3-3.3zM134.4 4c.5 0 1.2.3 1.2 1.7 0 .8-.2 1.6-.6 2.2-1-.5-1.8-1.2-1.8-2.3-.1-.7.4-1.5 1.2-1.6zm-.1 10.4c-.8 0-1.6-.7-1.6-2.2 0-.8.2-1.5.6-2.1 1.2.7 2.6 1.3 2.6 2.6.1.8-.6 1.6-1.6 1.7z"/>\n        <path class="st0" d="M137.1 17.4h-12.8c-1 0-1.9-.8-1.9-1.9V2.7c0-1.1.9-1.9 1.9-1.9h12.8c1.1 0 1.9.9 1.9 1.9v12.9c0 1-.9 1.8-1.9 1.8zM124.2 1.3c-.8 0-1.4.6-1.4 1.4v12.9c0 .8.6 1.4 1.4 1.4H137c.8 0 1.4-.6 1.4-1.4V2.7c0-.8-.6-1.4-1.4-1.4h-12.8z"/>\n      </g>\n      <g id="tracker">\n        <path class="st0" d="M44 31.3h-1v-8h-2.9v-.9h6.7v.9H44v8zM52 24.5c.3 0 .5 0 .8.1l-.1.9c-.2-.1-.5-.1-.7-.1-.5 0-1.1.2-1.4.7-.4.5-.6 1-.5 1.6v3.6h-1v-6.7h.8l.1 1.2c.2-.4.5-.7.9-1 .3-.2.7-.3 1.1-.3zM59.1 31.3l-.2-1c-.3.4-.6.7-1 .8-.4.2-.8.2-1.2.2-.6 0-1.1-.2-1.6-.5-.4-.4-.6-.9-.6-1.5 0-1.4 1.1-2.1 3.2-2.1h1.1v-.4c0-.4-.1-.8-.3-1.2-.3-.3-.7-.4-1.1-.4-.7 0-1.3.2-1.9.5l-.3-.7c.3-.2.7-.3 1.1-.4.4-.1.8-.1 1.2-.1.6 0 1.3.1 1.8.5.4.5.6 1.1.6 1.7v4.6h-.8zm-2.3-.7c.6 0 1.1-.2 1.5-.6.4-.4.6-.9.5-1.5V28h-1c-.6 0-1.2.1-1.8.4-.3.2-.5.6-.5 1 0 .3.1.6.3.8.3.2.7.4 1 .4zM65.6 31.4c-.8.1-1.7-.3-2.2-.9-.6-.7-.9-1.6-.8-2.5-.1-.9.2-1.9.8-2.6.6-.6 1.4-1 2.3-.9.3 0 .7 0 1 .1.3.1.5.1.8.2l-.3.9c-.2-.1-.5-.2-.7-.2-.2-.1-.5-.1-.7-.1-1.3 0-2 .9-2 2.6 0 .7.1 1.3.5 1.9.4.5.9.7 1.5.7s1.2-.1 1.7-.4v.9c-.7.2-1.3.3-1.9.3zM70.8 27.9c.2-.3.5-.7.8-1l2.2-2.3H75l-2.7 2.9 2.9 3.9h-1.3l-2.4-3.2-.8.7v2.5h-1v-9.5h1v5c.1.1.1.5.1 1zM80.1 31.4c-.9 0-1.7-.3-2.3-.9-.6-.7-.9-1.6-.9-2.5 0-.9.2-1.8.8-2.6.5-.6 1.3-1 2.1-1s1.5.3 2 .8c.5.6.8 1.4.7 2.2v.6H78c0 .6.2 1.3.6 1.8.4.4 1 .6 1.6.6.7 0 1.5-.2 2.1-.5V31c-.3.1-.7.3-1 .3-.4.1-.8.1-1.2.1zm-.3-6.1c-.5 0-1 .2-1.3.5-.3.4-.5.9-.6 1.4h3.5c0-.5-.1-1-.4-1.5-.2-.2-.7-.4-1.2-.4zM88.3 24.5c.3 0 .5 0 .8.1l-.1.9c-.2-.1-.5-.1-.7-.1-.5 0-1.1.2-1.4.7-.4.5-.6 1-.6 1.6v3.6h-1v-6.7h.8l.1 1.2c.2-.4.5-.7.9-1 .4-.2.8-.3 1.2-.3z"/>\n      </g>\n    </g>\n  </switch>\n</symbol>\n<symbol id="svg-logo-acp-tracker19-w" viewBox="0 0 792.89 181.34"><path d="M197.18,6.66h6V188h-6Z" transform="translate(-3.11 -6.66)" style="fill:#fff"/><path d="M253.91,185.15h-5.7V139.53H231.67V134.4h38.21v5.13h-16Zm45.62-38.78a12.55,12.55,0,0,1,4.56.57l-.57,5.13a9.7,9.7,0,0,0-4-.57c-2.85,0-6.27,1.14-8,4-2.28,2.85-3.42,5.7-2.85,9.12v20.53H283V146.94h4.57l.57,6.84a16.17,16.17,0,0,1,5.13-5.7A11.49,11.49,0,0,1,299.53,146.37ZM340,185.15l-1.14-5.7c-1.71,2.28-3.42,4-5.7,4.56a14.5,14.5,0,0,1-6.85,1.14,17.22,17.22,0,0,1-9.12-2.85,11.61,11.61,0,0,1-3.42-8.56c0-8,6.27-12,18.25-12h6.27v-2.28a15.25,15.25,0,0,0-1.71-6.85,8.57,8.57,0,0,0-6.27-2.28,23.58,23.58,0,0,0-10.84,2.85l-1.71-4a20.42,20.42,0,0,1,6.27-2.28,27.79,27.79,0,0,1,6.85-.57c3.42,0,7.41.57,10.26,2.85a15.51,15.51,0,0,1,3.42,9.7v26.23Zm-13.12-4a11.61,11.61,0,0,0,8.56-3.42,9.44,9.44,0,0,0,2.85-8.56v-2.85h-5.7a22.4,22.4,0,0,0-10.27,2.28,7,7,0,0,0-2.85,5.7,6.5,6.5,0,0,0,1.71,4.57C322.91,180,325.19,181.16,326.9,181.16Zm50.19,4.56a14.92,14.92,0,0,1-12.55-5.13A18.8,18.8,0,0,1,360,166.33a20.13,20.13,0,0,1,4.56-14.83c3.42-3.42,8-5.7,13.12-5.13a19.39,19.39,0,0,1,5.7.57c1.71.57,2.85.57,4.56,1.14l-1.71,5.13a10.57,10.57,0,0,0-4-1.14,9.7,9.7,0,0,0-4-.57c-7.42,0-11.41,5.14-11.41,14.83,0,4,.57,7.41,2.85,10.84a10.27,10.27,0,0,0,8.56,4,18.73,18.73,0,0,0,9.69-2.28V184A38.73,38.73,0,0,1,377.09,185.72Zm29.65-20a39.93,39.93,0,0,1,4.56-5.7l12.55-13.12h6.84l-15.4,16.54,16.54,22.24h-7.41l-13.69-18.25-4.56,4v14.26h-5.7V131.54h5.7v28.52C406.74,160.63,406.74,162.91,406.74,165.76Zm53,20a18.06,18.06,0,0,1-13.11-5.13,22,22,0,0,1-5.14-14.26,24,24,0,0,1,4.57-14.83,15.94,15.94,0,0,1,23.38-1.14,16.71,16.71,0,0,1,4,12.55v3.42H447.8a17.08,17.08,0,0,0,3.42,10.26,12.91,12.91,0,0,0,9.12,3.43,28.45,28.45,0,0,0,12-2.85v6.27c-1.71.57-4,1.71-5.7,1.71A27.83,27.83,0,0,1,459.77,185.72Zm-1.71-34.79a10.84,10.84,0,0,0-7.41,2.85,20.09,20.09,0,0,0-3.42,8h20a16.14,16.14,0,0,0-2.28-8.56A10.87,10.87,0,0,0,458.06,150.93Zm48.47-4.56a12.6,12.6,0,0,1,4.57.57l-.57,5.13a9.75,9.75,0,0,0-4-.57c-2.85,0-6.27,1.14-8,4a14,14,0,0,0-3.42,9.12v20.53h-5.7V146.94H494l.57,6.84a16.17,16.17,0,0,1,5.13-5.7A15.18,15.18,0,0,1,506.53,146.37Z" transform="translate(-3.11 -6.66)" style="fill:#fff"/><path d="M282.24,83.73h.27l27.87-72.54h20.54V105.6H317.71V26.66h-.26L286.11,105.6h-8.4l-31.2-78.94h-.27V105.6h-12.8V11.19H254Z" transform="translate(-3.11 -6.66)" style="fill:#fff"/><path d="M367,52.79h.26l42.14-41.6h18.27l-45.87,43.2,48.67,51.21H411.58L367.3,56.79H367V105.6h-13.2V11.19H367Z" transform="translate(-3.11 -6.66)" style="fill:#fff"/><path d="M488.64,28.66c-3.73-5.2-10.53-8.8-18.4-8.8-8.54,0-18.41,4.66-18.41,15.33,0,10.27,8.68,13.07,19.34,16.54,12.67,4,27.74,8.8,27.74,27.6,0,19.6-15.87,28.67-32.68,28.67-11.86,0-23.86-4.67-31.06-13.73l10.27-8.67A25.74,25.74,0,0,0,466.5,96.67c8.81,0,18.94-4.94,18.94-16.14C485.44,69.06,475,66,463,62.26s-24.54-9.2-24.54-26.54c0-18.8,16.8-26.93,32.4-26.93,10.94,0,21.2,4.27,27.07,10.8Z" transform="translate(-3.11 -6.66)" style="fill:#fff"/><path d="M521.43,105.6H506.76L547.7,11.19h12l40.54,94.41H585.31L575.7,82.4H530.9Zm14.13-34.8H570.9L553.3,26.52Z" transform="translate(-3.11 -6.66)" style="fill:#fff"/><path d="M612.36,11.19h28.8c20.41,0,33.74,7.87,33.74,26.27,0,18.93-14.8,26.67-34.4,26.67H625.56V105.6h-13.2Zm13.2,41.74h14c12.94,0,22-4.27,22-15.47s-9.34-15.07-21.74-15.07H625.56Z" transform="translate(-3.11 -6.66)" style="fill:#fff"/><path d="M29.26,45.57h9.25l25.9,60.11H52.18l-5.6-13.75H20.52l-5.44,13.75h-12ZM42.84,82.76,33.59,58.31,24.17,82.76Z" transform="translate(-3.11 -6.66)" style="fill:#fff"/><path d="M110.05,59.66c-3.15-4.33-8.83-6.19-13.67-6.19-12.4,0-20.8,9.59-20.8,22,0,13.08,8,22.16,20.37,22.16a17.66,17.66,0,0,0,14.61-7l8.57,6c-5.26,6.62-13.07,10.52-23.26,10.52-18.76,0-32.09-13-32.09-31.75,0-19.27,14.09-31.4,32.6-31.4,7.81,0,17.06,2.88,21.82,9.16Z" transform="translate(-3.11 -6.66)" style="fill:#fff"/><path d="M125.3,45.57h19.61c13.75,0,22.66,4.84,22.66,17.41,0,13.24-10.61,17.82-23.34,17.82H136v24.88H125.3Zm18.16,26.24c7,0,13.33-1.7,13.33-8.83s-6.36-8.41-13-8.41H136V71.81Z" transform="translate(-3.11 -6.66)" style="fill:#fff"/><path d="M686,16.91a6,6,0,0,1-6.1,6,6,6,0,1,1,0-12A6,6,0,0,1,686,16.91Zm-10.72,0a4.62,4.62,0,0,0,4.65,4.76A4.56,4.56,0,0,0,684.47,17a4.6,4.6,0,1,0-9.19,0ZM679,20h-1.38v-6a11.92,11.92,0,0,1,2.29-.19,3.72,3.72,0,0,1,2.07.44,1.64,1.64,0,0,1,.58,1.31A1.52,1.52,0,0,1,681.28,17v.07a1.79,1.79,0,0,1,1.09,1.46A4.82,4.82,0,0,0,682.8,20h-1.49a5.21,5.21,0,0,1-.47-1.46c-.11-.65-.47-.94-1.24-.94H679Zm0-3.38h.65c.76,0,1.38-.26,1.38-.87s-.4-.91-1.27-.91A3.1,3.1,0,0,0,679,15Z" transform="translate(-3.11 -6.66)" style="fill:#fff"/><path d="M785.11,11.59h-73a10.9,10.9,0,0,0-10.89,10.83V95.67A10.9,10.9,0,0,0,712.1,106.5h73.19A10.89,10.89,0,0,0,796,95.43v-73A10.89,10.89,0,0,0,785.11,11.59ZM793,95.49v.06a7.78,7.78,0,0,1-7.85,7.72H712a7.78,7.78,0,0,1-7.78-7.78V22.42a7.77,7.77,0,0,1,7.84-7.72l73-.07h.06A7.79,7.79,0,0,1,793,22.42Z" transform="translate(-3.11 -6.66)" style="fill:#fff"/><path d="M719.83,38.42,710.89,41l-1.77-3.89,24.34-10.17h3.59V84c0,2.86,3.83,3.22,9,3.71v3.53H710.71V87.7c5.11-.49,9.3-.85,9.3-3.71Z" transform="translate(-3.11 -6.66)" style="fill:#fff"/><path d="M772.88,83.26A27.31,27.31,0,0,1,766,90.74a36.5,36.5,0,0,1-11.62,5.54l.36,1.09.37,1.16.42,1.1.37,1.15a56.66,56.66,0,0,0,22-9.12A51.68,51.68,0,0,0,786.51,84,47.85,47.85,0,0,0,793,74.56V38.24l-.55-.73-.85-1.16-.43-.48-.42-.49a25.87,25.87,0,0,0-3.35-2.92,21.71,21.71,0,0,0-3.77-2.37,28,28,0,0,0-6.09-2.31,32.22,32.22,0,0,0-7-.79,30.3,30.3,0,0,0-9.67,1.64,27.41,27.41,0,0,0-8.4,4.8,22.33,22.33,0,0,0-6.08,7.85A24.9,24.9,0,0,0,744.1,52a28.67,28.67,0,0,0,1.22,8.58A20.89,20.89,0,0,0,749,67.63a17.82,17.82,0,0,0,6.09,4.8,21.59,21.59,0,0,0,9,1.77,16.37,16.37,0,0,0,2.62,0,34.32,34.32,0,0,0,3.59-.67,27.1,27.1,0,0,0,4.07-1.47,16,16,0,0,0,3.83-2.24,40.79,40.79,0,0,1-1.33,6.56A29.11,29.11,0,0,1,772.88,83.26ZM774.53,65a11.69,11.69,0,0,1-3.78.73,7.36,7.36,0,0,1-6.08-4.44,25.25,25.25,0,0,1-2.55-12.17,31.12,31.12,0,0,1,2.12-13.26A6.07,6.07,0,0,1,769.78,32c3.34,0,5.6,4.74,6.93,11.07A77.67,77.67,0,0,1,778,63.24,13.32,13.32,0,0,1,774.53,65Z" transform="translate(-3.11 -6.66)" style="fill:#fff"/></symbol>\n<symbol id="svg-logo-mksap-18-icon-w" viewBox="0 0 32 32">\n<title>logo-mksap-18-icon-w</title>\n<path d="M6.926 9.079l-2.938 0.829-0.573-1.279 7.94-3.317h1.182v18.712c0 0.882 1.429 1.050 3.114 1.209v1.147h-11.778v-1.112c1.694-0.159 3.061-0.291 3.061-1.209z"/>\n<path d="M22.833 4.862c3.467 0 6.943 1.597 6.943 5.17 0 1.906-1.288 3.952-4.164 4.861 2.744 1.35 5.867 3.114 5.867 6.176 0 6.043-4.552 7.005-8.919 7.005-6.82 0-8.602-2.558-8.602-5.761 0-2.32 1.976-4.649 5.029-5.346-2.223-1.35-4.129-3.053-4.129-6.246 0-3.705 3.785-5.858 7.975-5.858zM22.595 26.238c1.706-0.049 3.071-1.444 3.071-3.157 0-0.028-0-0.057-0.001-0.085l0 0.004s0-0.062 0-0.097c0-2.391-2.647-3.608-4.949-4.896-0.655 1.135-1.041 2.496-1.041 3.947 0 0.027 0 0.053 0 0.080l-0-0.004c0 2.955 1.359 4.208 2.92 4.208zM22.868 6.741c-1.112 0-2.32 1.218-2.32 3.053 0 2.117 1.526 3.3 3.397 4.305 0.696-1.197 1.118-2.628 1.147-4.156l0-0.008c0-2.717-1.244-3.203-2.223-3.203z"/>\n<path fill="none" stroke="#000" stroke-width="1.0219" stroke-miterlimit="4" stroke-linecap="butt" stroke-linejoin="miter" d="M3.927 0.848h24.138c1.701 0 3.079 1.379 3.079 3.079v24.147c0 1.7-1.379 3.079-3.079 3.079h-24.138c-1.7 0-3.079-1.379-3.079-3.079v-24.147c0-1.7 1.379-3.079 3.079-3.079z"/>\n</symbol>\n<symbol id="svg-logo-mksap-18-w" viewBox="0 0 176.19 30.93"><title>logo-mksap-18-w</title>\n  <path d="M15.23 23.37l8.7-22.7h6.41v29.56h-4.05V5.64l-9.78 24.59h-2.7L4.05 5.64v24.59h-4V.72h6.36zM41.69 13.7L54.93.7h5.67L46.28 14.21l15.14 16h-5.91L41.69 14.97v15.26h-4V.72h4.12zM79.65 6.17a7.07 7.07 0 0 0-5.6-2.72h-.09c-2.66 0-5.67 1.46-5.67 4.78s2.71 4.09 6 5.17c4 1.25 8.67 2.74 8.67 8.6s-5 9-10.2 9h-.32a12.35 12.35 0 0 1-9.37-4.29l3.2-2.71a8 8 0 0 0 6.58 3.46c2.74 0 5.92-1.53 5.92-5s-3.25-4.54-7-5.67-7.54-2.98-7.54-8.34c0-5.91 5.24-8.44 10.12-8.44h.3a11.54 11.54 0 0 1 8.16 3.37zM89.88 30.23H85.3L98.17.72h3.78l12.52 29.51h-4.65l-3-7.24h-14zm4.41-10.86h11L99.83 5.55zM118.25.72h9c6.37 0 10.53 2.46 10.53 8.19s-4.61 8.33-10.74 8.33h-4.65v13h-4.14zm4.13 13h4.37c4 0 6.86-1.33 6.86-4.83s-2.91-4.71-6.79-4.71h-4.44zM141.23 2.5a1.89 1.89 0 1 1-1.89-1.89 1.89 1.89 0 0 1 1.89 1.89zm-3.34 0v.06A1.44 1.44 0 0 0 139.32 4a1.42 1.42 0 0 0 1.42-1.42v-.06a1.44 1.44 0 1 0-2.87 0zm1.16.95h-.43V1.6H139.43a1.12 1.12 0 0 1 .55.14.53.53 0 0 1 .19.4.48.48 0 0 1-.38.43.55.55 0 0 1 .34.45 1.32 1.32 0 0 0 .14.49h-.48a1.59 1.59 0 0 1-.15-.45c0-.2-.15-.3-.38-.3h-.21zm0-1h.21c.24 0 .43 0 .43-.27s-.13-.28-.39-.28h-.25z"/>\n  <path d="M172.8 30.17h-22.75a3.38 3.38 0 0 1-3.38-3.38V4.03a3.38 3.38 0 0 1 3.38-3.38h22.75a3.39 3.39 0 0 1 3.39 3.38v22.76a3.39 3.39 0 0 1-3.39 3.38zM150.05 1.63a2.41 2.41 0 0 0-2.41 2.4v22.76a2.41 2.41 0 0 0 2.41 2.41h22.75a2.41 2.41 0 0 0 2.41-2.41V4.03a2.41 2.41 0 0 0-2.41-2.4zm2.84 7.25l-2.77.77-.54-1.2 7.47-3.13h1.11v17.63c0 .87 1.35 1 2.94 1.13v1.08h-11.11v-1.08c1.59-.15 2.9-.26 2.9-1.13zm15-4c3.27 0 6.54 1.52 6.54 4.88a5 5 0 0 1-3.9 4.58c2.52 1.31 5.52 2.97 5.52 5.9 0 5.68-4.29 6.6-8.4 6.6-6.43 0-8.11-2.4-8.11-5.42a5.67 5.67 0 0 1 4.69-5 6.65 6.65 0 0 1-3.9-5.87c0-3.55 3.59-5.58 7.55-5.58zm-.23 20.15a3 3 0 0 0 2.9-3 1.09 1.09 0 0 0 0-.18c0-2.25-2.47-3.41-4.65-4.62a7.49 7.49 0 0 0-1 3.73v.06c0 2.78 1.36 4 2.74 4zm.26-18.37a2.63 2.63 0 0 0-2.2 2.6v.29c0 2 1.44 3.1 3.2 4a8.15 8.15 0 0 0 1.08-3.9c.05-2.57-1.18-3-2.09-3z" fill="#231f20"/>\n</symbol>\n<symbol id="svg-loupe" viewBox="0 0 24 24">\n<title>loupe</title>\n<path d="M12 20.016c4.406 0 8.016-3.609 8.016-8.016s-3.609-8.016-8.016-8.016-8.016 3.609-8.016 8.016 3.609 8.016 8.016 8.016zM12 2.016c5.531 0 9.984 4.453 9.984 9.984v8.016c0 1.078-0.891 1.969-1.969 1.969h-8.016c-5.531 0-9.984-4.453-9.984-9.984s4.453-9.984 9.984-9.984zM12.984 6.984v4.031h4.031v1.969h-4.031v4.031h-1.969v-4.031h-4.031v-1.969h4.031v-4.031h1.969z"/>\n</symbol>\n<symbol id="svg-mail-outline" viewBox="0 0 577 576"><path d="M313.17 315.63a37.51 37.51 0 01-48.35-.08L.22 92.66A22 22 0 000 95.6v393.8A21.6 21.6 0 0021.6 511h533.8a21.6 21.6 0 0021.6-21.6V95.6v-.68z"/><path d="M292.64 291.09L552.09 74H27.74l257.7 217.08a5.59 5.59 0 007.2.01z"/></symbol>\n<symbol id="svg-menu" viewBox="0 0 32 32">\n<title>menu</title>\n<path d="M1.4 13.914v4.171h29.2v-4.171h-29.2zM1.4 5.571v4.171h29.2v-4.171h-29.2zM1.4 22.257v4.171h29.2v-4.171h-29.2z"/>\n</symbol>\n<symbol id="svg-minus-circle" viewBox="0 0 32 32">\n<title>minus-circle</title>\n<path d="M7.435 13.69h17.161v4.29h-17.161v-4.29zM0.999 15.836c0 8.293 6.723 15.016 15.016 15.016s15.016-6.723 15.016-15.016c0-8.293-6.723-15.016-15.016-15.016s-15.016 6.723-15.016 15.016z"/>\n</symbol>\n<symbol id="svg-minus" viewBox="0 0 32 32">\n<title>minus</title>\n<path d="M0 12.316v9.151h32.031v-9.151h-32.031z"/>\n</symbol>\n<symbol id="svg-more-horiz" viewBox="0 0 32 32">\n<title>more-horiz</title>\n<path d="M16 11.977c2.152 0 4.023 1.871 4.023 4.023s-1.871 4.023-4.023 4.023-4.023-1.871-4.023-4.023 1.871-4.023 4.023-4.023zM27.976 11.977c2.152 0 4.023 1.871 4.023 4.023s-1.871 4.023-4.023 4.023-4.023-1.871-4.023-4.023 1.871-4.023 4.023-4.023zM4.024 11.977c2.152 0 4.023 1.871 4.023 4.023s-1.871 4.023-4.023 4.023-4.023-1.871-4.023-4.023 1.871-4.023 4.023-4.023z"/>\n</symbol>\n<symbol id="svg-more-vert" viewBox="0 0 32 32">\n<title>more-vert</title>\n<path d="M16 23.953c2.152 0 4.023 1.871 4.023 4.023s-1.871 4.023-4.023 4.023-4.023-1.871-4.023-4.023 1.871-4.023 4.023-4.023zM16 11.977c2.152 0 4.023 1.871 4.023 4.023s-1.871 4.023-4.023 4.023-4.023-1.871-4.023-4.023 1.871-4.023 4.023-4.023zM16 8.047c-2.152 0-4.023-1.871-4.023-4.023s1.871-4.023 4.023-4.023 4.023 1.871 4.023 4.023-1.871 4.023-4.023 4.023z"/>\n</symbol>\n<symbol id="svg-new-window-square" viewBox="0 0 32 32">\n<title>new-window-square</title>\n<path d="M28.629 14.050c0.162 0.162 0.257 0.378 0.257 0.608s-0.095 0.446-0.257 0.608l-6.855 6.913c-0.162 0.162-0.378 0.257-0.608 0.257-0.473 0-0.863-0.392-0.863-0.863l0.003-3.457c0 0-4.141-0.656-6.662 0.468-4.026 1.796-6.933 5.99-6.933 5.99s-0.371 0.248-0.601 0.248c-0.473 0-0.865-0.29-0.865-0.863 0.002-0.904 0.658-5.798 4.793-9.676 3.376-3.167 7.942-3.008 10.048-3.080h0.216v-3.457c0-0.473 0.392-0.863 0.863-0.863 0.23 0 0.446 0.095 0.608 0.257l6.855 6.913zM4.753 1.82c-2.074 0-3.754 1.68-3.754 3.754v22.524c0 2.074 1.68 3.754 3.754 3.754h22.524c2.074 0 3.754-1.68 3.754-3.754v-22.524c0-2.074-1.68-3.754-3.754-3.754h-22.524z"/>\n</symbol>\n<symbol id="svg-niu" viewBox="0 0 32 32">\n<title>niu</title>\n  <path d="M31.56 18.72l-2.88-2.82 2.88-2.82c.4-.38.54-.94.42-1.46-.15-.52-.56-.94-1.08-1.06l-3.92-1 1.11-3.88c.15-.52 0-1.08-.4-1.46-.38-.4-.94-.54-1.46-.4l-3.88 1.11-1-3.92a1.43 1.43 0 0 0-1.06-1.06c-.54-.15-1.08 0-1.46.4L16 3.24 13.18.34c-.38-.4-.94-.54-1.46-.4-.52.12-.94.54-1.06 1.06l-1 3.92-3.88-1.1c-.52-.15-1.08 0-1.46.4-.4.38-.54.94-.4 1.46l1.1 3.88-3.92 1c-.52.12-.94.54-1.08 1.06-.12.52.02 1.08.42 1.46l2.88 2.82-2.88 2.82c-.4.38-.54.94-.42 1.46.15.52.56.94 1.08 1.06l3.92 1-1.1 3.88c-.15.52 0 1.08.4 1.46.38.4.94.54 1.46.4l3.88-1.11 1 3.92c.12.52.52.94 1.06 1.08.52.12 1.08-.02 1.46-.42L16 28.58l2.82 2.88c.27.29.67.46 1.06.46.12 0 .27-.02.4-.04.52-.15.94-.56 1.06-1.08l1-3.92 3.88 1.1c.52.15 1.08 0 1.46-.4.4-.38.54-.94.4-1.46l-1.11-3.88 3.92-1c.52-.12.94-.54 1.08-1.06.13-.52-.02-1.08-.41-1.46zm-14.1-3.59l-.37 3.03c-.13 1.02-.37 3.06-.52 4.49l.88.23-.13 1.06h-4.88l.13-1.06 1.02-.26c.2-1.43.45-3.45.58-4.46l.13-1.09c.15-1.25.22-1.96.3-2.87l-1.11-.21.11-.9 4.03-1.52.29.24-.46 3.32zm.93-7.05c-.13 1.06-.91 1.81-1.78 1.81s-1.46-.76-1.33-1.81c.13-1.06.91-1.81 1.78-1.81s1.46.75 1.33 1.81z"/>\n</symbol>\n<symbol id="svg-note-add" viewBox="0 0 577 576"><path d="M572.84 298.36l-28.12-28.12a14.19 14.19 0 00-20.08 0L290.73 504.15a14.73 14.73 0 00-3.54 5.72l-19.84 59.53a5 5 0 006.34 6.33l59.54-19.84a14.61 14.61 0 005.7-3.52l233.91-233.91a14.21 14.21 0 000-20.1zM437 326.82V21.6A21.6 21.6 0 00415.4 0H21.6A21.6 21.6 0 000 21.6v393.8A21.6 21.6 0 0021.6 437h305.22zM100.79 110.61h235.42a17.69 17.69 0 010 35.37H100.79a17.69 17.69 0 010-35.37zm0 90.21h235.42a17.69 17.69 0 010 35.37H100.79a17.69 17.69 0 010-35.37zM83.11 308.71A17.68 17.68 0 01100.79 291h235.42a17.69 17.69 0 010 35.37H100.79a17.67 17.67 0 01-17.68-17.66z"/></symbol>\n<symbol id="svg-note-image" viewBox="0 0 27 32">\n<title>note-image</title>\n<path d="M26.214 6.786c0.661 0.661 1.214 1.982 1.214 2.929v20.571c0 0.946-0.768 1.714-1.714 1.714h-24c-0.946 0-1.714-0.768-1.714-1.714v-28.571c0-0.946 0.768-1.714 1.714-1.714h16c0.946 0 2.268 0.554 2.929 1.214zM18.286 2.429v6.714h6.714c-0.107-0.304-0.268-0.607-0.393-0.732l-5.589-5.589c-0.125-0.125-0.429-0.286-0.732-0.393zM25.143 29.714v-18.286h-7.429c-0.946 0-1.714-0.768-1.714-1.714v-7.429h-13.714v27.429h22.857zM22.857 21.714v5.714h-18.286v-3.429l3.429-3.429 2.286 2.286 6.857-6.857zM8 18.286c-1.893 0-3.429-1.536-3.429-3.429s1.536-3.429 3.429-3.429 3.429 1.536 3.429 3.429-1.536 3.429-3.429 3.429z"/>\n</symbol>\n<symbol id="svg-note-text-empty" viewBox="0 0 27 32">\n<title>note-text-empty</title>\n<path d="M26.214 6.786c0.661 0.661 1.214 1.982 1.214 2.929v20.571c0 0.946-0.768 1.714-1.714 1.714h-24c-0.946 0-1.714-0.768-1.714-1.714v-28.571c0-0.946 0.768-1.714 1.714-1.714h16c0.946 0 2.268 0.554 2.929 1.214zM18.286 2.429v6.714h6.714c-0.107-0.304-0.268-0.607-0.393-0.732l-5.589-5.589c-0.125-0.125-0.429-0.286-0.732-0.393zM25.143 29.714v-18.286h-7.429c-0.946 0-1.714-0.768-1.714-1.714v-7.429h-13.714v27.429h22.857zM6.857 14.286c0-0.321 0.25-0.571 0.571-0.571h12.571c0.321 0 0.571 0.25 0.571 0.571v1.143c0 0.321-0.25 0.571-0.571 0.571h-12.571c-0.321 0-0.571-0.25-0.571-0.571v-1.143zM20 18.286c0.321 0 0.571 0.25 0.571 0.571v1.143c0 0.321-0.25 0.571-0.571 0.571h-12.571c-0.321 0-0.571-0.25-0.571-0.571v-1.143c0-0.321 0.25-0.571 0.571-0.571h12.571zM20 22.857c0.321 0 0.571 0.25 0.571 0.571v1.143c0 0.321-0.25 0.571-0.571 0.571h-12.571c-0.321 0-0.571-0.25-0.571-0.571v-1.143c0-0.321 0.25-0.571 0.571-0.571h12.571z"/>\n</symbol>\n<symbol id="svg-note-text" viewBox="0 0 27 32">\n<title>note-text</title>\n<path d="M26.214 8.5c0.179 0.179 0.339 0.393 0.5 0.643h-8.429v-8.429c0.25 0.161 0.464 0.321 0.643 0.5zM17.714 11.429h9.714v18.857c0 0.946-0.768 1.714-1.714 1.714h-24c-0.946 0-1.714-0.768-1.714-1.714v-28.571c0-0.946 0.768-1.714 1.714-1.714h14.286v9.714c0 0.946 0.768 1.714 1.714 1.714zM20.571 24.571v-1.143c0-0.321-0.25-0.571-0.571-0.571h-12.571c-0.321 0-0.571 0.25-0.571 0.571v1.143c0 0.321 0.25 0.571 0.571 0.571h12.571c0.321 0 0.571-0.25 0.571-0.571zM20.571 20v-1.143c0-0.321-0.25-0.571-0.571-0.571h-12.571c-0.321 0-0.571 0.25-0.571 0.571v1.143c0 0.321 0.25 0.571 0.571 0.571h12.571c0.321 0 0.571-0.25 0.571-0.571zM20.571 15.429v-1.143c0-0.321-0.25-0.571-0.571-0.571h-12.571c-0.321 0-0.571 0.25-0.571 0.571v1.143c0 0.321 0.25 0.571 0.571 0.571h12.571c0.321 0 0.571-0.25 0.571-0.571z"/>\n</symbol>\n<symbol id="svg-note" viewBox="0 0 27 32">\n<title>note</title>\n<path d="M18.286 9.143v-8.429c0.25 0.161 0.464 0.321 0.643 0.5l7.286 7.286c0.179 0.179 0.339 0.393 0.5 0.643h-8.429zM16 9.714c0 0.946 0.768 1.714 1.714 1.714h9.714v18.857c0 0.946-0.768 1.714-1.714 1.714h-24c-0.946 0-1.714-0.768-1.714-1.714v-28.571c0-0.946 0.768-1.714 1.714-1.714h14.286v9.714z"/>\n</symbol>\n<symbol id="svg-open-modal" viewBox="0 0 16 20">\n<title>open-modal</title>\n  <path d="M11.5137 2.2716V4.59c-2.8221 0-5.2168 2.0831-5.2168 5.0586 1.728-2.1532 2.3753-2.7403 5.2168-2.7403v2.3184l3.996-3.4785zM1 4v11h11v-5h-1v4H2V5h6V4z"/>\n</symbol>\n<symbol id="svg-organize" viewBox="0 0 30 27">\n  <title>organize</title>\n  <path d="M30 19.69v5.62A1.65 1.65 0 0 1 28.39 27h-5.36a1.65 1.65 0 0 1-1.6-1.69v-5.62a1.65 1.65 0 0 1 1.6-1.69h1.61v-3.38h-8.57V18h1.61a1.65 1.65 0 0 1 1.6 1.69v5.62a1.65 1.65 0 0 1-1.6 1.69h-5.36a1.65 1.65 0 0 1-1.61-1.69v-5.62A1.65 1.65 0 0 1 12.32 18h1.61v-3.38H5.36V18h1.6a1.65 1.65 0 0 1 1.61 1.69v5.62A1.65 1.65 0 0 1 6.96 27H1.61A1.65 1.65 0 0 1 0 25.31v-5.62A1.65 1.65 0 0 1 1.61 18h1.6v-3.38a2.21 2.21 0 0 1 2.15-2.25h8.57V9h-1.61a1.65 1.65 0 0 1-1.61-1.69V1.69A1.65 1.65 0 0 1 12.32 0h5.36a1.65 1.65 0 0 1 1.6 1.69v5.62A1.65 1.65 0 0 1 17.68 9h-1.61v3.37h8.57a2.21 2.21 0 0 1 2.13 2.25V18h1.61A1.65 1.65 0 0 1 30 19.69z"/>\n</symbol>\n<symbol id="svg-paper-clip" viewBox="0 0 32 32">\n<title>paper-clip</title>\n<path d="M30.643 26.241c0-1.843-0.774-3.622-2.091-4.921l-12.154-12.169c-0.816-0.838-1.946-1.32-3.117-1.32-2.301 0-4.101 1.802-4.101 4.104 0 1.152 0.482 2.304 1.318 3.12l8.577 8.588c0.125 0.126 0.293 0.21 0.461 0.21 0.44 0 1.632-1.194 1.632-1.634 0-0.168-0.083-0.334-0.21-0.461l-8.577-8.586c-0.314-0.334-0.523-0.774-0.523-1.235 0-0.816 0.606-1.403 1.402-1.403 0.461 0 0.92 0.189 1.254 0.502l12.154 12.169c0.795 0.795 1.318 1.885 1.318 3.037 0 1.781-1.318 3.099-3.096 3.099-1.13 0-2.238-0.523-3.033-1.32l-16.232-16.272c-1.005-1.005-1.59-2.366-1.59-3.79 0-2.953 2.301-5.361 5.272-5.361 1.422 0 2.782 0.629 3.785 1.613l12.677 12.712c0.125 0.126 0.293 0.21 0.482 0.21 0.44 0 1.611-1.173 1.611-1.613 0-0.168-0.083-0.334-0.21-0.461l-12.656-12.692c-1.526-1.507-3.577-2.366-5.71-2.366-4.435 0-7.928 3.539-7.928 7.979 0 2.115 0.878 4.168 2.363 5.675l16.253 16.251c1.298 1.299 3.075 2.094 4.915 2.094 3.264 0 5.752-2.493 5.752-5.758z"/>\n</symbol>\n<symbol id="svg-paper-plane-o" viewBox="0 0 32 32">\n<title>paper-plane-o</title>\n<path d="M31.5 0.196c0.375 0.268 0.554 0.696 0.482 1.143l-4.571 27.429c-0.054 0.339-0.268 0.625-0.571 0.804-0.161 0.089-0.357 0.143-0.554 0.143-0.143 0-0.286-0.036-0.429-0.089l-9.411-3.839-5.321 5.839c-0.214 0.25-0.518 0.375-0.839 0.375-0.143 0-0.286-0.018-0.411-0.071-0.446-0.179-0.732-0.607-0.732-1.071v-8.071l-8.429-3.446c-0.411-0.161-0.679-0.536-0.714-0.982-0.036-0.429 0.196-0.839 0.571-1.054l29.714-17.143c0.375-0.232 0.857-0.214 1.214 0.036zM25.393 26.964l3.946-23.625-25.607 14.768 6 2.446 15.411-11.411-8.536 14.232z"/>\n</symbol>\n<symbol id="svg-paper-plane" viewBox="0 0 32 32">\n<title>paper-plane</title>\n<path d="M31.5 0.196c0.375 0.268 0.554 0.696 0.482 1.143l-4.571 27.429c-0.054 0.339-0.268 0.625-0.571 0.804-0.161 0.089-0.357 0.143-0.554 0.143-0.143 0-0.286-0.036-0.429-0.089l-8.089-3.304-4.321 5.268c-0.214 0.268-0.536 0.411-0.875 0.411-0.125 0-0.268-0.018-0.393-0.071-0.446-0.161-0.75-0.589-0.75-1.071v-6.232l15.429-18.911-19.089 16.518-7.054-2.893c-0.411-0.161-0.679-0.536-0.714-0.982-0.018-0.429 0.196-0.839 0.571-1.054l29.714-17.143c0.179-0.107 0.375-0.161 0.571-0.161 0.232 0 0.464 0.071 0.643 0.196z"/>\n</symbol>\n<symbol id="svg-pencil" viewBox="0 0 32 32">\n<title>pencil</title>\n<path d="M25.312 6.42l-16.231 16.317 1.363 1.365-0.087 1.925-0.844 0.801-1.904 0.52-2.034-2.056 0.498-1.883 17.724-17.811c-1.017-0.196-1.754 0-2.033 0.087l-16.709 16.706-1.874 6.421 0.567 0.57 6.696-1.45 16.984-16.994c0 0 0.354-1.862-1.598-4.020-0.258-0.281-0.258-0.281-0.518-0.498zM29.938 2.929c-1.45-1.45-4.142-1.325-5.634 0.211l-1.226 1.24c0 0 2.107-1.002 4.176 1.233 1.874 2.024 1.517 4.013 1.517 4.013l1.256-1.296c1.623-1.623 1.597-3.821-0.089-5.401z"/>\n</symbol>\n<symbol id="svg-pharmacy" viewBox="0 0 32 32">\n<title>pharmacy</title>\n<path d="M21.313 18.688v-2.688h-4v-4h-2.625v4h-4v2.688h4v4h2.625v-4h4zM28 6.688v2.625l-2.688 8 2.688 8v2.688h-24v-2.688l2.688-8-2.688-8v-2.625h16.938l1.938-5.375 3.125 1.188-1.5 4.188h3.5z"/>\n</symbol>\n<symbol id="svg-phone" viewBox="0 0 24 24">\n<title>phone</title>\n<path d="M6.609 10.781c1.453 2.813 3.797 5.156 6.609 6.609l2.203-2.203c0.281-0.281 0.703-0.375 1.031-0.234 1.125 0.375 2.344 0.563 3.563 0.563 0.563 0 0.984 0.422 0.984 0.984v3.516c0 0.563-0.422 0.984-0.984 0.984-9.375 0-17.016-7.641-17.016-17.016 0-0.563 0.422-0.984 0.984-0.984h3.516c0.563 0 0.984 0.422 0.984 0.984 0 1.266 0.188 2.438 0.563 3.563 0.094 0.328 0.047 0.75-0.234 1.031z"/>\n</symbol>\n<symbol id="svg-pictures" viewBox="0 0 33 32">\n<title>Pictures</title>\n<path d="M26.604 29.587l-2.624-0.72-0.006-7.258 2.51 0.706 3.619-13.509-18.332-4.912-1.208 4.506h-2.068l1.863-6.952 22.193 5.946-5.947 22.193zM23.039 32h-23.039v-22.977h23.039v22.977zM21.041 11.021h-19.043v13.985h19.043v-13.985zM7.849 20.993l2.283-3.692 2.283 2.301 3.139-4.727 3.283 8.134h-14.556l1.855-3.71 1.713 1.694zM6.484 17.086c-0.828 0-1.499-0.67-1.499-1.498s0.671-1.498 1.499-1.498 1.498 0.67 1.498 1.498-0.67 1.498-1.498 1.498z"/>\n</symbol>\n<symbol id="svg-plus-circle" viewBox="0 0 32 32">\n<title>plus-circle</title>\n<path d="M13.869 7.256h4.29v6.436h6.436v4.29h-6.436v6.436h-4.29v-6.436h-6.436v-4.29h6.436v-6.436zM0.999 15.836c0 8.293 6.723 15.016 15.016 15.016s15.016-6.723 15.016-15.016c0-8.293-6.723-15.016-15.016-15.016s-15.016 6.723-15.016 15.016z"/>\n</symbol>\n<symbol id="svg-plus-minus" viewBox="0 0 32 32">\n<title>plus-minus</title>\n<path d="M23.93,9.29H18V3.36a2.16,2.16,0,0,0-4.31,0V9.29H7.76a2.16,2.16,0,1,0,0,4.31h5.93v5.93a2.16,2.16,0,1,0,4.31,0V13.6h5.93a2.16,2.16,0,0,0,0-4.31" transform="translate(-5.6 -1.21)"/>\n<path d="M22.66,25.35H9a2.16,2.16,0,1,0,0,4.32H22.66a2.16,2.16,0,0,0,0-4.32" transform="translate(-5.6 -1.21)"/>\n</symbol>\n<symbol id="svg-plus" viewBox="0 0 32 32">\n<title>plus</title>\n<path d="M0 11.429v9.143h11.429v11.429h9.143v-11.429h11.429v-9.143h-11.429v-11.429h-9.143v11.429h-11.429z"/>\n</symbol>\n<symbol id="svg-pointer" viewBox="0 0 28.42 31.31"><path d="M12.39.34A.45.45,0,0,0,12,.76l-.46,5.43a.46.46,0,1,0,.91.08h0L13,.83a.47.47,0,0,0-.41-.5h-.16ZM5.51,2.53a.46.46,0,0,0-.37.53.61.61,0,0,0,.11.23L8.77,7.46a.46.46,0,0,0,.76-.52l-.07-.08L6,2.69a.49.49,0,0,0-.41-.17Zm13.3,1.14a.44.44,0,0,0-.19.1L14.46,7.28a.46.46,0,0,0,.59.71l4.16-3.52a.46.46,0,0,0,.06-.65.47.47,0,0,0-.42-.16ZM2.18,9a.46.46,0,0,0-.34.56.45.45,0,0,0,.4.35l5.43.46a.46.46,0,0,0,.2-.9H7.74L2.32,9a.66.66,0,0,0-.14,0Zm13.4,1.14a.46.46,0,0,0-.34.55.48.48,0,0,0,.4.36l5.43.46a.46.46,0,0,0,.21-.9h-.13l-5.42-.46Zm-7,2.23a.52.52,0,0,0-.19.11L4.17,16a.46.46,0,0,0,.59.71h0l4.18-3.5a.46.46,0,0,0-.37-.82Zm5.64.49a.46.46,0,0,0-.34.55v0l4.87,15.78a.44.44,0,0,0,.57.31.43.43,0,0,0,.3-.3L21,24.81l5.63,6.67a.45.45,0,0,0,.64.05h0l2.84-2.4a.46.46,0,0,0,.06-.64h0l-5.62-6.67,4.54-.63a.45.45,0,0,0,.4-.51.44.44,0,0,0-.25-.35L14.48,12.86a.5.5,0,0,0-.27,0Zm-2.91.92a.46.46,0,0,0-.36.42l-.46,5.44a.46.46,0,0,0,.92.07l.46-5.44a.47.47,0,0,0-.41-.5h-.15Z" transform="translate(-1.83 -0.33)"/></symbol>\n<symbol id="svg-practice-exam" viewBox="0 0 576 576"><path d="M421.84 267.67A153.67 153.67 0 10575.5 421.34a153.67 153.67 0 00-153.66-153.67zm101.08 168.69h-93.39a16.58 16.58 0 01-3.25-.33 16.32 16.32 0 01-4.44.64 16 16 0 01-16-16V313a16 16 0 0132 0v91.36h85.08a16 16 0 010 32zM303.49 88.37L227.2 12.61v75.78z"/><path d="M227.16 120.36a32 32 0 01-32-32.07V0H16.2A16.2 16.2 0 000 16.2v399.6A16.2 16.2 0 0016.2 432h218.1c-.19-3.48-.3-7-.3-10.5a187.37 187.37 0 0188.5-159.25V120.36z"/><path d="M422.34 268.67A153.67 153.67 0 10576 422.34a153.67 153.67 0 00-153.66-153.67zm101.08 168.69H430a16.58 16.58 0 01-3.25-.33 16.32 16.32 0 01-4.44.64 16 16 0 01-16-16V314a16 16 0 0132 0v91.36h85.08a16 16 0 010 32z"/></symbol>\n<symbol id="svg-print" viewBox="0 0 32 32">\n<title>print</title>\n<path d="M26.688 15.766c0-0.587 0.475-1.060 1.060-1.060s1.060 0.475 1.060 1.060c0 0.587-0.475 1.060-1.060 1.060s-1.060-0.475-1.060-1.060zM7.53 21.036h14.849v4.275h-14.849v-4.275zM7.53 4.099h8.485v6.364h6.364v6.364h-14.849v-12.727zM1.165 15.899v9.413h4.242v2.122h19.091v-2.122h6.364v-9.413c0-1.657-1.657-3.314-3.314-3.314h-3.050v-4.242l-6.364-6.364h-12.727v10.607h-0.928c-1.657 0-3.314 1.657-3.314 3.314z"/>\n</symbol>\n<symbol id="svg-question-circle" viewBox="0 0 32 32">\n<title>question-circle</title>\n<path d="M18.551 25.958c0 0.332-0.293 0.626-0.626 0.626h-3.754c-0.332 0-0.626-0.293-0.626-0.626v-3.754c0-0.332 0.293-0.626 0.626-0.626h3.754c0.332 0 0.626 0.293 0.626 0.626v3.754zM23.523 11.378c0 1.955-1.075 3.676-2.64 4.79-0.449 0.293-0.899 0.509-1.368 0.763-0.616 0.315-0.829 0.706-0.937 1.054-0.050 0.156-0.077 1.544-0.111 1.673-0.074 0.278-0.176 0.468-0.574 0.468h-3.754c-0.477 0-0.598-0.332-0.623-0.698-0.014-0.189-0.002-1.628-0.002-1.793 0-4.008 4.985-3.578 4.985-5.963 0-1.056-1.682-1.545-2.484-1.545-0.938 0-1.799 0.568-2.287 1.348-0.098 0.137-0.215 0.351-0.215 0.529 0 0.351-0.273 0.626-0.626 0.626h-3.754c-0.724 0-0.626-0.763-0.626-1.251 0-3.988 3.91-6.257 7.508-6.257s7.508 2.287 7.508 6.257zM31.030 15.836c0-8.29-6.726-15.016-15.016-15.016s-15.016 6.726-15.016 15.016c0 8.29 6.726 15.016 15.016 15.016s15.016-6.726 15.016-15.016z"/>\n</symbol>\n<symbol id="svg-question" viewBox="0 0 20 32">\n<title>question</title>\n<path d="M12.571 22.429v4.286c0 0.393-0.321 0.714-0.714 0.714h-4.286c-0.393 0-0.714-0.321-0.714-0.714v-4.286c0-0.393 0.321-0.714 0.714-0.714h4.286c0.393 0 0.714 0.321 0.714 0.714zM18.214 11.714c0 3.393-2.304 4.696-4 5.643-1.054 0.607-1.714 1.839-1.714 2.357v0c0 0.393-0.304 0.857-0.714 0.857h-4.286c-0.393 0-0.643-0.607-0.643-1v-0.804c0-2.161 2.143-4.018 3.714-4.732 1.375-0.625 1.946-1.214 1.946-2.357 0-1-1.304-1.893-2.75-1.893-0.804 0-1.536 0.25-1.929 0.518-0.429 0.304-0.857 0.732-1.911 2.054-0.143 0.179-0.357 0.286-0.554 0.286-0.161 0-0.304-0.054-0.446-0.143l-2.929-2.232c-0.304-0.232-0.375-0.625-0.179-0.946 1.929-3.196 4.643-4.75 8.286-4.75 3.821 0 8.107 3.054 8.107 7.143z"/>\n</symbol>\n<symbol id="svg-quick-q" viewBox="0 0 577 576"><path d="M390.34 373.83c96.7-25.54 150.52-66.2 167.79-115.26 2.34-6.64-4.51-12.69-10.25-9C473.51 297 417.6 297 417.6 297c102.68-61.25 141.28-139.85 155.8-190.36 8.47-29.47.21-34.28-18.58-10.72-34 42.68-102.41 110-219 153.07-95.62 35.4-114.17 176.17-117.52 242.95-.53 10.55 11.63 16.16 18.55 8.53 22.83-25.15 69-60.1 153.49-69 76.45-8.08 120.74-36.55 138.27-62.54 3.22-4.77-1.29-11.09-6.56-9.25-90.43 31.6-131.71 14.15-131.71 14.15zM88.53 357.38a17.18 17.18 0 01-17.18-17.18v-4q0-27.49 11.74-47.82t43-43.24q30.08-21.48 39.67-34.94a50.61 50.61 0 009.59-30.07q0-18.6-13.75-28.35T123.18 142q-37 0-82.94 20.83a17.21 17.21 0 01-22.55-8L1.53 122.46a17.17 17.17 0 017.79-23.08 271.15 271.15 0 01120.16-27.79q59 0 93.78 28.35t34.8 75.6q0 31.5-14.32 54.41t-54.41 51.55q-27.5 20.33-34.79 30.92t-7.3 27.78a17.19 17.19 0 01-17.19 17.18zm-26.34 97.94q0-24.06 12.88-36.37t37.52-12.31q23.76 0 36.79 12.6t13 36.08q0 22.62-13.17 35.65t-36.65 13q-24.06 0-37.23-12.74t-13.14-35.91z"/></symbol>\n<symbol id="svg-random" viewBox="0 0 122.88 105.71">\n<title>random</title>\n  <path fill-rule="evenodd" d="M0 79.45c-.02-1.95.76-3.06 2.51-3.18h14.08c5.98 0 8.89.16 13.98-3.91 1.08-.86 2.1-1.86 3.06-3 4.55-5.41 6.17-11.96 7.87-18.9C44.79 37 50.03 22.78 63.98 17.15c7.94-3.2 18.82-2.59 27.41-2.59h5.27l.01-10.05c0-5.01 1.18-5.88 4.79-2.45l19.55 18.58c2.36 2.24 2.03 3.7-.22 5.86L101.49 45c-3.37 3.41-4.89 2.45-4.82-2.26v-11.8c-34-.52-32.57 1.67-42.05 34.09-3.5 10.04-8.81 17.08-15.59 21.69-7.09 4.82-13.68 6.39-22.02 6.39H6.65C.71 93.11 0 92.83 0 86.75v-7.3zm.23-53.19c-.02 1.95.76 3.06 2.51 3.18h14.7c5.98 0 8.89-.16 13.98 3.91 1.08.86 2.1 1.86 3.06 3 1.16 1.38 2.13 2.84 2.96 4.35 1.5-4.69 3.36-9.29 5.82-13.5.7-1.19 1.44-2.35 2.23-3.48-1.74-1.8-3.61-3.37-5.61-4.73-7.09-4.82-13.68-6.39-22.02-6.39H6.88c-5.94 0-6.65.28-6.65 6.36v7.3zm53.34 54.19c2.96 3.42 6.63 6.24 11.27 8.11 7.94 3.2 18.21 2.59 26.8 2.59h5.27l.01 10.05c0 5.01 1.18 5.88 4.79 2.45l19.55-18.58c2.36-2.24 2.03-3.7-.22-5.86l-19.3-18.5c-3.37-3.41-4.89-2.45-4.82 2.26v11.8c-24.78.38-30.42-.69-35.32-13.84-.27.94-.64 2.23-1.93 6.65-.03.1-.06.19-.09.28-1.67 4.76-3.68 8.93-6.01 12.59z" clip-rule="evenodd"/>\n</symbol>\n<symbol id="svg-redo2" viewBox="0 0 32 32">\n<title>redo2</title>\n<path d="M18 7.762v-7.762l12 12-12 12v-7.932c-13.961-0.328-13.362 9.493-9.808 15.932-8.772-9.482-6.909-24.674 9.808-24.238z"/>\n</symbol>\n<symbol id="svg-refresh" viewBox="0 0 32 32">\n<title>refresh</title>\n<path d="M22.529 4.883c-3.173-0.771-5.76-1.351-10.4-0.372-6.432 1.358-9.014 6.774-9.052 7.657-0.023 0.561 0.424 0.857 0.976 0.874 0.269 0.008 0.712-0.222 0.712-0.222s2.725-2.416 6.793-2.536c2.777-0.082 6.271 0.205 9.003 1.66v0zM18.352 11.743l-2.382 2.311c-0.187 0.476 0.12 1.003 0.677 1.163 0.271 0.078 0.562 0.055 0.817-0.053l12.904-2.464c0.255-0.108 0.452-0.294 0.543-0.526s0.065-0.481-0.062-0.699l-8.044-9.964c-0.127-0.218-0.344-0.386-0.615-0.464-0.557-0.16-1.173 0.102-1.36 0.579l-0.011 3.706c0.409 2.996-2.467 6.41-2.467 6.41zM9.438 27.084c3.173 0.771 5.76 1.352 10.4 0.372 6.432-1.358 9.014-6.774 9.052-7.657 0.023-0.561-0.424-0.857-0.976-0.874-0.269-0.008-0.712 0.221-0.712 0.221s-2.725 2.416-6.793 2.536c-2.777 0.082-6.271-0.205-9.003-1.66v0zM13.614 20.223l2.382-2.311c0.187-0.476-0.12-1.003-0.677-1.163-0.271-0.078-0.562-0.055-0.818 0.053l-12.904 2.464c-0.255 0.108-0.452 0.294-0.542 0.526s-0.065 0.481 0.062 0.699l8.044 9.964c0.127 0.218 0.344 0.386 0.615 0.464 0.557 0.16 1.173-0.102 1.36-0.579l0.011-3.706c-0.409-2.996 2.467-6.41 2.467-6.41z"/>\n</symbol>\n<symbol id="svg-related-study" viewBox="0 0 37 30">\n  <title>related-study</title>\n  <path d="M36.66 27.99l-4.65-4.68a7.08 7.08 0 0 0-3.14-10.68V4.31C28.4 3.2 27.45 1.62 27.14.99c-3.63-.95-10.57-2.37-12.63 1.9-2-4.27-9.15-2.85-12.78-1.9C1.42 1.62.47 3.2 0 4.31v17.7c6.78-2 10.25-1.42 14.51.47a18.57 18.57 0 0 1 4.87-1.57 7.08 7.08 0 0 0 6.86 5.4 7 7 0 0 0 4.1-1.31l4.65 4.66a1.18 1.18 0 0 0 1.65 0 1.18 1.18 0 0 0 .02-1.67zm-22.62-8c-3-2.53-7.89-2.22-11.36-1.43V1.64C6.47.69 14.04-.69 14.04 5.31zm.79-14.68c0-6 7.57-4.59 11.36-3.64v10.5a7.06 7.06 0 0 0-6.93 6 8.69 8.69 0 0 0-4.43 1.84zm11.36 8.52v4.75a21.54 21.54 0 0 0-5.22-.56 5.44 5.44 0 0 1 5.22-4.22zm.05 10.84a5.4 5.4 0 0 1-5.13-3.9 23.93 23.93 0 0 1 7.81 1.26v-7.54a5.42 5.42 0 0 1-2.63 10.15z"/>\n</symbol>\n<symbol id="svg-remove-circle" viewBox="0 0 32 32">\n<title>remove-circle</title>\n<path d="M20.56 8.261l3.030 3.030-4.545 4.545 4.545 4.545-3.030 3.030-4.545-4.545-4.545 4.545-3.030-3.030 4.545-4.545-4.545-4.545 3.030-3.030 4.545 4.545 4.545-4.545zM1.015 15.836c0 8.284 6.715 15 15 15s15-6.715 15-15c0-8.284-6.715-15-15-15s-15 6.715-15 15z"/>\n</symbol>\n<symbol id="svg-remove" viewBox="0 0 32 32">\n<title>remove</title>\n<path d="M0.999 25.847l5.005 5.005 10.011-10.011 10.011 10.011 5.005-5.005-10.011-10.011 10.011-10.011-5.005-5.005-10.011 10.011-10.011-10.011-5.005 5.005 10.011 10.011-10.011 10.011z"/>\n</symbol>\n<symbol id="svg-replay" viewBox="0 0 32 32">\n<title>replay</title>\n<path d="M16 6.688c5.875 0 10.688 4.75 10.688 10.625s-4.813 10.688-10.688 10.688-10.688-4.813-10.688-10.688h2.688c0 4.438 3.563 8 8 8s8-3.563 8-8-3.563-8-8-8v5.375l-6.688-6.688 6.688-6.688v5.375z"/>\n</symbol>\n<symbol id="svg-save" viewBox="0 0 32 32">\n<title>save</title>\n<path d="M22.88 28.331h-13.727v-6.864h13.727v6.864zM27.456 28.331h-2.289v-7.436c0-0.948-0.769-1.715-1.715-1.715h-14.872c-0.948 0-1.715 0.769-1.715 1.715v7.436h-2.289v-22.88h2.289v7.436c0 0.948 0.769 1.715 1.715 1.715h10.296c0.948 0 1.715-0.769 1.715-1.715v-7.436c0.357 0 1.054 0.287 1.305 0.537l5.023 5.022c0.232 0.232 0.537 0.966 0.537 1.305v16.016zM18.304 11.744c0 0.304-0.267 0.572-0.572 0.572h-3.432c-0.304 0-0.572-0.267-0.572-0.572v-5.719c0-0.304 0.267-0.572 0.572-0.572h3.432c0.304 0 0.572 0.267 0.572 0.572v5.719zM29.743 28.903v-16.587c0-0.948-0.537-2.252-1.216-2.931l-5.005-5.005c-0.679-0.679-1.984-1.216-2.931-1.216h-16.587c-0.948 0-1.715 0.769-1.715 1.715v24.023c0 0.948 0.769 1.715 1.715 1.715h24.023c0.948 0 1.715-0.769 1.715-1.715z"/>\n</symbol>\n<symbol id="svg-search" viewBox="0 0 32 32">\n<title>search</title>\n<path d="M21.712 13.375c0 4.454-3.623 8.077-8.077 8.077s-8.077-3.623-8.077-8.077c0-4.454 3.623-8.077 8.077-8.077s8.077 3.623 8.077 8.077zM30.943 28.375c0-0.612-0.252-1.208-0.667-1.622l-6.184-6.184c1.46-2.11 2.236-4.633 2.236-7.193 0-7.014-5.68-12.692-12.692-12.692s-12.692 5.68-12.692 12.692c0 7.014 5.68 12.692 12.692 12.692 2.56 0 5.084-0.775 7.193-2.236l6.184 6.166c0.415 0.433 1.010 0.685 1.622 0.685 1.279 0 2.308-1.027 2.308-2.308z"/>\n</symbol>\n<symbol id="svg-settings" viewBox="0 0 576 576"><path d="M382.25 288.41a95.81 95.81 0 11-95.81-95.8 96 96 0 0195.81 95.8zM573.9 330.7v-83.1c0-6.36-4.49-12.37-10.87-13.48l-68.51-10.5a207.08 207.08 0 00-15.35-36.68c12.75-17.59 26.6-34.05 39.31-51.29a14.09 14.09 0 003-8.59 12.69 12.69 0 00-2.62-8.21c-15.73-22.07-41.91-45.31-61.75-63.64a14.77 14.77 0 00-9.37-3.74 12.87 12.87 0 00-9 3.36l-53.16 40A220.61 220.61 0 00351.86 81l-10.49-68.87C340.61 5.79 334.64.9 327.89.9h-83.1a13.72 13.72 0 00-13.48 10.49c-6 22.45-8.22 46.8-10.88 69.63a222.25 222.25 0 00-34.05 14.23l-51.65-40a16.63 16.63 0 00-9.73-3.78c-12.74 0-63.27 54.65-72.24 67-1.87 2.62-3.36 5.23-3.36 8.63a13.87 13.87 0 003.73 9C67 153 80.43 169.82 93.16 187.77a197.49 197.49 0 00-14.62 34.44L8.92 232.7c-5.61 1.11-10.12 7.85-10.12 13.48v83.1c0 6.36 4.5 12.37 10.88 13.48l68.51 10.12a199.23 199.23 0 0015.34 37.06c-12.74 17.59-26.59 34.06-39.3 51.29a14.09 14.09 0 00-3 8.59 14.73 14.73 0 002.62 8.63c15.72 21.71 41.91 44.89 61.75 62.86a13.37 13.37 0 009.36 4.12 14.36 14.36 0 009.35-3.36l52.8-40.07a220.06 220.06 0 0033.7 13.86l10.5 68.89c.75 6.36 6.72 11.23 13.48 11.23h83.1a13.73 13.73 0 0013.48-10.5c6-22.44 8.21-46.79 10.87-69.62a222.78 222.78 0 0034.06-14.23l51.7 40.44c3 1.87 6.36 3.36 9.74 3.36 12.74 0 63.28-55 72.24-67a12.47 12.47 0 003.37-8.63 14.71 14.71 0 00-3.74-9.34c-13.86-16.84-27.32-33.32-40-51.65a213.65 213.65 0 0014.61-34.06l69.24-10.5c6-1.11 10.5-7.85 10.5-13.47z"/></symbol>\n<symbol id="svg-shape-circle-empty" viewBox="0 0 32 32">\n<title>shape-circle-empty</title>\n<path d="M28.885 15.852c0 7.105-5.731 12.87-12.837 12.87s-12.904-5.765-12.904-12.87c0-7.105 5.765-12.87 12.87-12.87s12.87 5.765 12.87 12.87zM31.030 15.84c0-8.29-6.726-15.016-15.016-15.016s-15.016 6.726-15.016 15.016c0 8.29 6.766 15.016 15.056 15.016s14.975-6.726 14.975-15.016z"/>\n</symbol>\n<symbol id="svg-shape-circle" viewBox="0 0 32 32">\n<title>shape-circle</title>\n<path d="M31.030 15.84c0-8.29-6.726-15.016-15.016-15.016s-15.016 6.726-15.016 15.016c0 8.29 6.766 15.016 15.056 15.016s14.975-6.726 14.975-15.016z"/>\n</symbol>\n<symbol id="svg-shape-square-correct" viewBox="0 0 24 24">\n<title>shape-square-correct</title>\n<rect width="24" height="24" style="fill:#2eb135;stroke-width:1;stroke:rgb(0,0,0)"/>\n</symbol>\n<symbol id="svg-shape-square-empty" viewBox="0 0 32 32">\n<title>shape-square-empty</title>\n<path d="M26.371 2.966c1.257 0 2.514 1.257 2.514 2.514v20.714c0 1.257-1.257 2.514-2.514 2.514h-20.714c-1.257 0-2.514-1.257-2.514-2.514v-20.714c0-1.257 1.257-2.514 2.514-2.514h20.714zM4.753 0.82c-2.074 0-3.754 1.68-3.754 3.754v22.524c0 2.074 1.68 3.754 3.754 3.754h22.524c2.074 0 3.754-1.68 3.754-3.754v-22.524c0-2.074-1.68-3.754-3.754-3.754h-22.524z"/>\n</symbol>\n<symbol id="svg-shape-square-incorrect" viewBox="0 0 24 24">\n<title>shape-square-incorrect</title>\n<rect width="24" height="24" style="fill:#c8291e;stroke-width:1;stroke:rgb(0,0,0)"/>\n</symbol>\n<symbol id="svg-shape-square-unsure" viewBox="0 0 24 24">\n<title>shape-square-unsure</title>\n<rect width="24" height="24" style="fill:#f1a403;stroke-width:1;stroke:rgb(0,0,0)"/>\n</symbol>\n<symbol id="svg-shape-square" viewBox="0 0 32 32">\n<title>shape-square</title>\n<path d="M4.753 0.82h22.524c2.074 0 3.754 1.68 3.754 3.754v22.524c0 2.074-1.68 3.754-3.754 3.754h-22.524c-2.074 0-3.754-1.68-3.754-3.754v-22.524c0-2.074 1.68-3.754 3.754-3.754z"/>\n</symbol>\n<symbol id="svg-share" viewBox="0 0 32 32">\n<title>share</title>\n<path d="M30.634 10.616l-6.777-6.848c-0.161-0.161-0.375-0.254-0.602-0.254-0.469 0-0.855 0.388-0.855 0.855v3.424h-0.214c-2.085 0.071-6.624-0.085-9.967 3.051-4.096 3.842-4.746 8.69-4.748 9.585 0 0.57 0.388 0.855 0.857 0.855 0.228 0 0.595-0.245 0.595-0.245s2.881-4.154 6.867-5.933c2.497-1.114 6.613-0.464 6.613-0.464l-0.003 3.424c0 0.469 0.388 0.855 0.855 0.855 0.228 0 0.442-0.094 0.602-0.254l6.777-6.848c0.161-0.161 0.254-0.375 0.254-0.602s-0.094-0.442-0.254-0.602v0zM1.14 9.031v15.566c0 2.49 2.491 4.981 4.983 4.981h15.532c2.491 0 4.983-2.49 4.983-4.981l0.001-4.763c-0.332 0.332-1.166 1.181-1.349 1.361-0.229 0.225-1.040 0.779-1.993 0.763s-0.906-0.132-0.906-0.132h-0.001v1.013c0 1.245-1.246 2.49-2.491 2.49h-12.014c-1.245 0-2.491-1.245-2.491-2.49v-12.018c0-1.245 1.245-2.487 2.491-2.49h2.902c0.422-0.292 2.203-1.437 4.224-1.996 2.317-0.641 4.242-0.631 4.242-0.631v-1.623h-13.128c-2.491 0-4.983 2.462-4.983 4.953v0z"/>\n</symbol>\n<symbol id="svg-slash-circle" viewBox="0 0 32 32">\n<title>slash-circle</title>\n<path d="M31.84,16A15.84,15.84,0,1,1,16,.16,15.84,15.84,0,0,1,31.84,16Zm-7-6.75L22.75,7.13,7.13,22.75l2.12,2.12Z"/>\n</symbol>\n<symbol id="svg-sliders" viewBox="0 0 27 32">\n<title>sliders</title>\n<path d="M6.286 25.143v2.286h-6.286v-2.286h6.286zM12.571 22.857c0.625 0 1.143 0.518 1.143 1.143v4.571c0 0.625-0.518 1.143-1.143 1.143h-4.571c-0.625 0-1.143-0.518-1.143-1.143v-4.571c0-0.625 0.518-1.143 1.143-1.143h4.571zM15.429 16v2.286h-15.429v-2.286h15.429zM4 6.857v2.286h-4v-2.286h4zM27.429 25.143v2.286h-13.143v-2.286h13.143zM10.286 4.571c0.625 0 1.143 0.518 1.143 1.143v4.571c0 0.625-0.518 1.143-1.143 1.143h-4.571c-0.625 0-1.143-0.518-1.143-1.143v-4.571c0-0.625 0.518-1.143 1.143-1.143h4.571zM21.714 13.714c0.625 0 1.143 0.518 1.143 1.143v4.571c0 0.625-0.518 1.143-1.143 1.143h-4.571c-0.625 0-1.143-0.518-1.143-1.143v-4.571c0-0.625 0.518-1.143 1.143-1.143h4.571zM27.429 16v2.286h-4v-2.286h4zM27.429 6.857v2.286h-15.429v-2.286h15.429z"/>\n</symbol>\n<symbol id="svg-sort-down" viewBox="0 0 32 32">\n<title>sort-down</title>\n<path d="M24.059 20.224c0-0.553-0.458-1.009-1.011-1.009h-14.139c-0.553 0-1.011 0.456-1.011 1.009 0 0.267 0.111 0.52 0.299 0.709l7.069 7.063c0.189 0.189 0.442 0.299 0.71 0.299s0.521-0.11 0.71-0.299l7.069-7.063c0.189-0.189 0.299-0.442 0.299-0.709z"/>\n</symbol>\n<symbol id="svg-sort-up" viewBox="0 0 32 32">\n<title>sort-up</title>\n<path d="M24.059 13.488c0-0.267-0.11-0.521-0.299-0.71l-7.069-7.063c-0.189-0.189-0.442-0.299-0.71-0.299s-0.521 0.111-0.71 0.299l-7.069 7.063c-0.189 0.189-0.299 0.442-0.299 0.71 0 0.553 0.458 1.009 1.011 1.009h14.139c0.553 0 1.011-0.456 1.011-1.009z"/>\n</symbol>\n<symbol id="svg-sort" viewBox="0 0 32 32">\n<title>sort</title>\n<path d="M24.059 20.224c0-0.553-0.458-1.009-1.011-1.009h-14.139c-0.553 0-1.011 0.456-1.011 1.009 0 0.267 0.111 0.52 0.299 0.709l7.069 7.063c0.189 0.189 0.442 0.299 0.71 0.299s0.521-0.11 0.71-0.299l7.069-7.063c0.189-0.189 0.299-0.442 0.299-0.709zM24.059 13.488c0-0.267-0.11-0.521-0.299-0.71l-7.069-7.063c-0.189-0.189-0.442-0.299-0.71-0.299s-0.521 0.111-0.71 0.299l-7.069 7.063c-0.189 0.189-0.299 0.442-0.299 0.71 0 0.553 0.458 1.009 1.011 1.009h14.139c0.553 0 1.011-0.456 1.011-1.009z"/>\n</symbol>\n<symbol id="svg-spinner6" viewBox="0 0 32 32">\n<title>spinner6</title>\n<path d="M12 4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM24.719 16c0 0 0 0 0 0 0-1.812 1.469-3.281 3.281-3.281s3.281 1.469 3.281 3.281c0 0 0 0 0 0 0 1.812-1.469 3.281-3.281 3.281s-3.281-1.469-3.281-3.281zM21.513 24.485c0-1.641 1.331-2.972 2.972-2.972s2.972 1.331 2.972 2.972c0 1.641-1.331 2.972-2.972 2.972s-2.972-1.331-2.972-2.972zM13.308 28c0-1.487 1.205-2.692 2.692-2.692s2.692 1.205 2.692 2.692c0 1.487-1.205 2.692-2.692 2.692s-2.692-1.205-2.692-2.692zM5.077 24.485c0-1.346 1.092-2.438 2.438-2.438s2.438 1.092 2.438 2.438c0 1.346-1.092 2.438-2.438 2.438s-2.438-1.092-2.438-2.438zM1.792 16c0-1.22 0.989-2.208 2.208-2.208s2.208 0.989 2.208 2.208c0 1.22-0.989 2.208-2.208 2.208s-2.208-0.989-2.208-2.208zM5.515 7.515c0 0 0 0 0 0 0-1.105 0.895-2 2-2s2 0.895 2 2c0 0 0 0 0 0 0 1.105-0.895 2-2 2s-2-0.895-2-2zM28.108 7.515c0 2.001-1.622 3.623-3.623 3.623s-3.623-1.622-3.623-3.623c0-2.001 1.622-3.623 3.623-3.623s3.623 1.622 3.623 3.623z"/>\n</symbol>\n<symbol id="svg-star-empty" viewBox="0 0 32 32">\n<title>star-empty</title>\n<path d="M27.75 13.723l-5.885 5.707 1.384 8.090-7.249-3.824-7.268 3.824 1.403-8.090-5.885-5.707 8.114-1.192 3.635-7.34 3.635 7.34 8.114 1.192zM31.998 12.57c0-0.576-0.616-0.808-1.077-0.885l-9.654-1.403-4.326-8.744c-0.173-0.365-0.5-0.787-0.942-0.787s-0.769 0.423-0.942 0.787l-4.326 8.744-9.654 1.403c-0.48 0.077-1.077 0.307-1.077 0.885 0 0.346 0.25 0.672 0.479 0.923l7 6.803-1.654 9.609c-0.019 0.135-0.038 0.25-0.038 0.384 0 0.499 0.25 0.962 0.808 0.962 0.269 0 0.52-0.096 0.769-0.231l8.635-4.535 8.635 4.535c0.231 0.135 0.5 0.231 0.769 0.231 0.558 0 0.789-0.442 0.789-0.962 0-0.135 0-0.25-0.019-0.384l-1.654-9.609 6.981-6.803c0.25-0.25 0.5-0.576 0.5-0.923z"/>\n</symbol>\n<symbol id="svg-star-half" viewBox="0 0 32 32">\n<title>star-half</title>\n<path d="M16.748 26.999v-26.999c-0.463 0-0.806 0.443-0.987 0.826l-4.529 9.174-10.105 1.473c-0.503 0.081-1.128 0.322-1.128 0.929 0 0.363 0.262 0.705 0.503 0.968l7.327 7.137-1.73 10.082c-0.020 0.142-0.040 0.262-0.040 0.402 0 0.524 0.262 1.009 0.846 1.009 0.282 0 0.544-0.101 0.806-0.242l9.039-4.758z"/>\n</symbol>\n<symbol id="svg-star" viewBox="0 0 32 32">\n<title>star</title>\n<path d="M31.998 12.57c0-0.576-0.616-0.808-1.077-0.885l-9.654-1.403-4.326-8.744c-0.173-0.365-0.5-0.787-0.942-0.787s-0.769 0.423-0.942 0.787l-4.326 8.744-9.654 1.403c-0.48 0.077-1.077 0.307-1.077 0.885 0 0.346 0.25 0.672 0.479 0.923l7 6.803-1.654 9.609c-0.019 0.135-0.038 0.25-0.038 0.384 0 0.499 0.25 0.962 0.808 0.962 0.269 0 0.52-0.096 0.769-0.231l8.635-4.535 8.635 4.535c0.231 0.135 0.5 0.231 0.769 0.231 0.558 0 0.789-0.46 0.789-0.962 0-0.135 0-0.25-0.019-0.384l-1.654-9.609 6.981-6.803c0.25-0.25 0.5-0.576 0.5-0.923z"/>\n</symbol>\n<symbol id="svg-stethoscope" viewBox="0 0 32 32">\n<title>stethoscope</title>\n<path d="M27.26 12.086c0 0.684-0.566 1.249-1.249 1.249s-1.249-0.567-1.249-1.249c0-0.684 0.566-1.249 1.249-1.249s1.249 0.567 1.249 1.249zM29.759 12.086c0-2.070-1.678-3.75-3.748-3.75s-3.748 1.68-3.748 3.75c0 1.641 1.035 3.007 2.499 3.535v7.714c0 2.754-2.811 4.999-6.247 4.999s-6.247-2.245-6.247-4.999v-2.578c4.236-0.528 7.497-3.652 7.497-7.422v-10c0-0.684-0.566-1.249-1.249-1.249-0.117 0-0.214 0.019-0.312 0.039-0.429-0.762-1.249-1.288-2.187-1.288-1.386 0-2.499 1.113-2.499 2.5s1.113 2.5 2.499 2.5c0.448 0 0.879-0.137 1.249-0.351v7.851c0 2.754-2.811 4.999-6.247 4.999s-6.247-2.245-6.247-4.999v-7.851c0.37 0.214 0.801 0.351 1.249 0.351 1.386 0 2.499-1.113 2.499-2.5s-1.113-2.5-2.499-2.5c-0.937 0-1.756 0.528-2.187 1.288-0.098-0.019-0.195-0.039-0.312-0.039-0.684 0-1.249 0.567-1.249 1.249v10c0 3.769 3.261 6.894 7.497 7.422v2.578c0 4.14 3.924 7.5 8.746 7.5s8.746-3.36 8.746-7.5v-7.714c1.464-0.528 2.499-1.895 2.499-3.535z"/>\n</symbol>\n<symbol id="svg-study-mode" viewBox="0 0 577 576"><path d="M372.91 123.78h113.14L367.64 6.19v112.17a5.36 5.36 0 005.27 5.42z"/><path d="M372.91 155.78a37.39 37.39 0 01-37.27-37.42V-2H95.37a21.57 21.57 0 00-21.58 21.58v532.07a21.58 21.58 0 0021.58 21.57h386.26a21.58 21.58 0 0021.58-21.57V155.78zm45.75 116.59l-147.2 147.19a16 16 0 01-22.63 0L171 341.76a16 16 0 0122.63-22.63l66.49 66.49L396 249.74a16 16 0 1122.63 22.63z"/></symbol>\n<symbol id="svg-tables" viewBox="0 0 32 32">\n<title>tables</title>\n<path d="M12.452 13.544h6.842v6.842h-6.842v-6.842zM3.33 20.386v-6.842h6.842v6.842h-6.842zM10.17 29.508h-6.842v-6.842h6.842v6.842zM19.294 29.508h-6.842v-6.842h6.842v6.842zM28.415 22.668v6.842h-6.842v-6.842h6.842zM28.415 13.544v6.842h-6.842v-6.842h6.842zM21.573 4.423h6.842v6.842h-6.842v-6.842zM12.452 4.423h6.842v6.842h-6.842v-6.842zM3.33 4.423h6.842v6.842h-6.842v-6.842zM1.049-0.138v31.927h9.121v0.072h2.281v-0.072h18.245v-31.927h-29.646z"/>\n</symbol>\n<symbol id="svg-tablet" viewBox="0 0 24.48 32"><path d="M25.76,0H6.24A2.48,2.48,0,0,0,3.76,2.48v27A2.48,2.48,0,0,0,6.24,32H25.76a2.48,2.48,0,0,0,2.48-2.48v-27A2.48,2.48,0,0,0,25.76,0ZM13.87,1.91h4.26a.22.22,0,1,1,0,.44H13.87a.22.22,0,1,1,0-.44ZM16,30.17a1.44,1.44,0,1,1,1.43-1.43A1.43,1.43,0,0,1,16,30.17Zm11.15-4.43H4.85V4.87h22.3Z" transform="translate(-3.76)"/></symbol>\n<symbol id="svg-target" viewBox="0 0 576 576"><path d="M569.22 46.37l-20.79-3.61a21.59 21.59 0 01-17.5-17.15L527 5.71A7.19 7.19 0 00514.89 2l-45.63 45.62A21.38 21.38 0 00463 62.74v27.63l-44.71 44.71A251.5 251.5 0 0074.47 501.86a251.5 251.5 0 00366.47-344.17L488 110.62l27.09-2a21.58 21.58 0 0013.55-6.16l44.41-43.83a7.2 7.2 0 00-3.83-12.26zM439.81 324c0 103.39-84.12 187.5-187.5 187.5S64.81 427.42 64.81 324s84.11-187.5 187.5-187.5a186.63 186.63 0 01120.53 44l-24.52 24.52a152.23 152.23 0 00-96-34c-84.35 0-153 68.62-153 153s68.61 153 153 153 153-68.62 153-153A152.26 152.26 0 00371 227.64l24.52-24.51A186.69 186.69 0 01439.81 324zm-98.54 0a89 89 0 11-38.62-73.31l-24.33 24.33a55.4 55.4 0 1022.74 22.52l24.28-24.28A88.49 88.49 0 01341.27 324z"/></symbol>\n<symbol id="svg-text-read" viewBox="0 0 36 32"><path d="M7.3 3.4H1c-.6 0-1 .5-1 1v23.1c0 .6.5 1 1 1h6.3c.6 0 1-.5 1-1v-23c.1-.6-.4-1.1-1-1.1zm-1 6.3H2.1V7.6h4.2v2.1zM13.4 18.8c0-3.6 1.8-6.8 4.5-8.8V4.5c0-.6-.5-1-1-1h-6.3c-.6 0-1 .5-1 1v23.1c0 .6.5 1 1 1h6.3c.6 0 1-.4 1-1-2.8-2-4.5-5.2-4.5-8.8zM11.6 7.6h4.2v2.1h-4.2V7.6z"/><path d="M17.5 18.8l2-2 3.3 3.3 6-6 2 2-8 8-5.3-5.3zm-2.7 0c0 5.2 4.2 9.4 9.4 9.4s9.4-4.2 9.4-9.4-4.2-9.4-9.4-9.4-9.4 4.2-9.4 9.4z"/></symbol>\n<symbol id="svg-time-reset" viewBox="0 0 32 32">\n<title>time-reset</title>\n<path d="M13.869 9.4l0.009 6.192-0.009 2.387 8.58 0.006 0.006-2.15h-6.44v-6.436h-2.146zM5.336 16.84c-0.047-0.5-0.55-1.005-1.051-1.005h-2.279c-0.503 0-1.006 0.503-0.973 1.005 0.517 7.825 7.027 14.011 14.983 14.011 8.293 0 15.016-6.723 15.016-15.016s-6.723-15.016-15.016-15.016c-4.74 0-8.967 2.197-11.718 5.626l-2.051-2.048c-0.275-0.275-0.73-0.275-1.005 0-0.134 0.134-0.204 0.314-0.204 0.502v8.029c0 0.188 0.071 0.368 0.204 0.502s0.314 0.204 0.503 0.204h8.039c0.188 0 0.369-0.071 0.503-0.204 0.275-0.275 0.275-0.73 0-1.003l-2.913-2.91c1.952-2.653 5.098-4.374 8.643-4.374 5.924 0 10.726 4.802 10.726 10.726s-4.802 10.726-10.726 10.726c-5.586 0-10.173-4.299-10.679-9.756z"/>\n</symbol>\n<symbol id="svg-time" viewBox="0 0 32 32">\n<title>time</title>\n<path d="M5.284 15.869c0-5.944 4.819-10.764 10.764-10.764s10.764 4.819 10.764 10.764c0 5.944-4.819 10.764-10.764 10.764s-10.764-4.819-10.764-10.764zM0.992 15.937c0 8.352 6.771 15.123 15.123 15.123s15.123-6.771 15.123-15.123c0-8.352-6.771-15.123-15.123-15.123s-15.123 6.771-15.123 15.123zM13.868 9.398l0.009 6.195-0.009 2.389 8.584 0.006 0.006-2.151h-6.443v-6.439h-2.147z"/>\n</symbol>\n<symbol id="svg-timer-off" viewBox="0 0 24 24">\n<title>timer-off</title>\n<path d="M12 20.016c1.266 0 2.484-0.375 3.516-0.984l-9.563-9.563c-0.609 1.031-0.938 2.25-0.938 3.516 0 3.891 3.094 7.031 6.984 7.031zM3 3.984l17.766 17.766-1.266 1.266-2.531-2.531c-1.453 0.938-3.141 1.5-4.969 1.5-4.969 0-9-4.031-9-9 0-1.828 0.563-3.563 1.5-4.969l-2.766-2.766zM11.016 9.422v-1.406h1.969v3.422zM15 0.984v2.016h-6v-2.016h6zM19.031 4.547l1.406 1.406-1.406 1.453c1.219 1.547 1.969 3.469 1.969 5.578 0 1.828-0.563 3.563-1.5 4.969l-1.453-1.453c0.609-1.031 0.938-2.25 0.938-3.516 0-3.891-3.094-6.984-6.984-6.984-1.266 0-2.438 0.328-3.469 0.938l-1.5-1.453c1.406-0.938 3.141-1.5 4.969-1.5 2.109 0 4.078 0.75 5.625 1.969z"/>\n</symbol>\n<symbol id="svg-timer" viewBox="0 0 576 576"><path d="M423.93 128.79l5.5-10.62a32 32 0 10-56.84-29.42l-5.92 11.43A241.29 241.29 0 00319 89.08V62.74h15.88a32 32 0 000-64h-94.79a32 32 0 100 64H255v26.47a.76.76 0 000 .15C136.66 105.45 45.47 206.87 45.47 329.61 45.47 463.53 154 572.1 288 572.1s242.46-108.57 242.46-242.49a242.24 242.24 0 00-106.53-200.82zM288 363.15A33.54 33.54 0 01256.15 319l-73.45-73.43a16 16 0 1122.63-22.63l74.2 74.2a33.54 33.54 0 118.44 66z"/></symbol>\n<symbol id="svg-tools" viewBox="0 0 574.4 573.41"><path d="M430.6 311.15a81.62 81.62 0 00-95.6-14.57l.11-.12-120.34-120.34v-62.89a22.21 22.21 0 00-9-17.83L83.35 4.39a22.21 22.21 0 00-29 2.12L6.74 54.16a22.22 22.22 0 00-2 29.18L97 204.4a22.23 22.23 0 0017.67 8.75h63.06l120.35 120.34.12-.11A81.6 81.6 0 00312.77 429l137.49 137.47a22.21 22.21 0 0031.42 0l86.41-86.41a22.21 22.21 0 000-31.42z"/><path d="M350.6 257l-.12.11a79.36 79.36 0 0192.95 14.17l36.47 36.47a161.18 161.18 0 0084.54-203.15 7.21 7.21 0 00-11.85-2.6l-89.84 89.84a21.59 21.59 0 01-18.77 6l-50.41-8.27a21.6 21.6 0 01-17.95-18.68l-5.79-47.16a21.58 21.58 0 016.17-17.86l87.06-87.07a7.2 7.2 0 00-3-12A161.09 161.09 0 00252.62 159zM271.21 359.39l-.11.11-78.17-78.16A739841.5 739841.5 0 0120.14 454.05a69.6 69.6 0 000 98.47 69.55 69.55 0 0098.36 0L263 408a79.43 79.43 0 018.21-48.61zM80.1 519.5a27 27 0 1127-27 27 27 0 01-27 27z"/></symbol>\n<symbol id="svg-top-match-arrow" viewBox="0 0 129.32 44.04">\n<title>top match</title>\n  <path fill="#c5edf9" d="M19.4 5.68L4.72 22.02 19.4 38.36h105.2V5.68H19.4z"/>\n  <circle cx="38.18" cy="19.36" r="3.54" class="st1"/>\n  <path d="M42.58 23.5a6.026 6.026 0 0 0-4.4-10.14c-3.33 0-6.02 2.68-6.02 6.02 0 1.53.57 3 1.62 4.12l-1.88 5.73 2.89-1.3 1.56 2.74 1.75-5.26h.18l1.75 5.26 1.56-2.74 2.89 1.3c0 .01-1.9-5.73-1.9-5.73zm-8.73-4.14c0-2.4 1.93-4.32 4.32-4.32 2.4 0 4.32 1.93 4.32 4.32s-1.93 4.32-4.32 4.32a4.3 4.3 0 0 1-4.32-4.28v-.04z" class="st1"/>\n  <path fill="none" d="M52.92 16.08h59.18v11.88H52.92z"/>\n</symbol>\n<symbol id="svg-transcribe" viewBox="0 0 562.69 559.14">\n<title>transcribe</title>\n  <path d="M342.53,559.14H17.25C7.72,559.14,0,551.89,0,542.94V143.34c0-9,7.72-16.2,17.25-16.2H207.84V414.43c0,17.68,15.27,32.07,34,32.07H343.39v76.89m199.09-435L461.43,12.61V88.29s0,.07,0,.1Zm-81.09,32c-18.73,0-34-14.39-34-32.07V0H237.25C227.74,0,220,7.25,220,16.2V415.79c0,8.95,7.7,16.2,17.21,16.2h314.6c-.21-3.47,10-9.14,10-9.14s0-26,.84-26.6V120.36Z"/>\n</symbol>\n<symbol id="svg-trash" viewBox="0 0 32 32">\n<title>trash</title>\n<path d="M12.44 3.164h6.864v2.289h-6.864v-2.289zM10.151 0.876v4.576h-6.864v2.289h25.167v-2.289h-6.864v-4.576h-11.44zM21.591 30.619v-18.304h2.289v18.304h-2.289zM17.016 30.619v-18.304h2.289v18.304h-2.289zM12.44 30.619v-18.304h2.289v18.304h-2.289zM7.864 30.619v-18.304h2.289v18.304h-2.289zM5.576 10.027v22.88h20.591v-22.88h-20.591z"/>\n</symbol>\n<symbol id="svg-trophy" viewBox="0 0 32 32">\n<title>trophy</title>\n<path d="M26 6v-4h-20v4h-6v4c0 3.314 2.686 6 6 6 0.627 0 1.232-0.096 1.801-0.275 1.443 2.063 3.644 3.556 6.199 4.075v6.2h-2c-2.209 0-4 1.791-4 4h16c0-2.209-1.791-4-4-4h-2v-6.2c2.555-0.519 4.756-2.012 6.199-4.075 0.568 0.179 1.173 0.275 1.801 0.275 3.314 0 6-2.686 6-6v-4h-6zM6 13.625c-1.999 0-3.625-1.626-3.625-3.625v-2h3.625v2c0 1.256 0.232 2.457 0.655 3.565-0.213 0.039-0.431 0.060-0.655 0.060zM29.625 10c0 1.999-1.626 3.625-3.625 3.625-0.224 0-0.442-0.021-0.655-0.060 0.423-1.107 0.655-2.309 0.655-3.565v-2h3.625v2z"/>\n</symbol>\n<symbol id="svg-type-bold" viewBox="0 0 32 32">\n<title>type-bold</title>\n<path d="M9.948 17.821h7.62c3.145 0 4.878 1.276 4.878 4.044s-1.103 4.464-5.159 4.464h-7.342v-8.508zM9.948 5.501h7.063c3.89 0 4.832 1.315 4.832 2.976s-0.207 3.998-4.089 3.998h-7.806v-6.973zM4-0.124v32.031h14.869c4.88 0 10.083-3.181 10.083-9.438s-4.646-7.718-4.646-7.718c0 0 3.717-1.568 3.717-6.277 0-1.819-0.549-4.363-2.138-5.951s-3.696-2.651-7.016-2.651h-14.869z"/>\n</symbol>\n<symbol id="svg-type-light" viewBox="0 0 32 32">\n<title>type-light</title>\n<path d="M6.289 15.935l8.232-0.043c4.492 0 7.784 2.662 7.784 6.864 0 5.41-4.22 6.864-7.612 6.864h-8.403v-13.685zM6.289 2.164h7.76c5.195 0 7.428 2.434 7.428 6.041 0 2.644-3.038 5.453-7.085 5.453l-8.102-0.054v-11.44zM4-0.124v32.031h12.42c5.055 0 9.177-3.315 9.177-9.151 0-6.435-6.956-7.981-6.956-7.981s5.95-1.201 5.95-6.57c0-6.912-6.318-8.33-9.151-8.373l-11.44 0.043z"/>\n</symbol>\n<symbol id="svg-type-regular" viewBox="0 0 32 32">\n<title>type-regular</title>\n<path d="M8.196 17.27h7.181c4.492 0 7.776 1.589 7.776 5.019 0 3.434-2.538 5.718-7.713 5.718h-7.252l0.010-10.739zM8.185 3.699h7.255c3.746 0 6.267 1.63 6.267 4.611 0 2.644-2.22 4.958-6.267 4.958l-7.258-0.016 0.003-9.553zM4-0.124v32.031h12.42c8.576 0 11.281-3.539 11.281-9.377 0-6.618-5.63-7.84-5.63-7.84s4.134-2.087 4.154-6.259c0.010-1.819-0.157-3.857-1.603-5.577-2.045-2.431-4.681-2.979-8.697-2.979h-11.927z"/>\n</symbol>\n<symbol id="svg-type-scale" viewBox="0 0 32 32">\n<title>type-scale</title>\n<path d="M32.031 30.464c-0.37-0.011-0.815-0.085-1.358-0.224-0.543-0.128-0.979-0.299-1.315-0.503-0.5-0.331-0.881-0.674-1.163-1.017s-0.522-0.793-0.738-1.36l-10.346-26.375h-1.749l-5.043 12.78c-1.88 4.789-3.597 9.095-5.162 12.929-0.304 0.75-0.62 1.339-0.945 1.757-0.327 0.429-0.772 0.836-1.347 1.222-0.37 0.235-0.847 0.418-1.413 0.546-0.565 0.139-1.033 0.224-1.413 0.247v1.371h11.52v-1.371c-1.163-0.053-2.207-0.235-3.129-0.546-0.935-0.311-1.392-0.75-1.392-1.318 0-0.235 0.032-0.546 0.109-0.932 0.066-0.386 0.195-0.878 0.391-1.489 0.195-0.621 0.413-1.296 0.674-2.036 0.25-0.729 0.577-1.597 0.979-2.593h10.9l2.521 6.749c0.054 0.151 0.098 0.311 0.13 0.493s0.054 0.331 0.054 0.461c0 0.322-0.381 0.578-1.142 0.793s-1.717 0.354-2.859 0.418v1.371h13.237v-1.371zM10.013 19.495l4.564-11.741 4.651 11.741h-9.215z"/>\n</symbol>\n<symbol id="svg-undo" viewBox="0 0 32 32">\n<title>undo</title>\n<path d="M16 2c-4.418 0-8.418 1.791-11.313 4.687l-4.686-4.687v12h12l-4.485-4.485c2.172-2.172 5.172-3.515 8.485-3.515 6.627 0 12 5.373 12 12 0 3.584-1.572 6.801-4.063 9l2.646 3c3.322-2.932 5.417-7.221 5.417-12 0-8.837-7.163-16-16-16z"/>\n</symbol>\n<symbol id="svg-user-edit" viewBox="0 0 32 32">\n<title>user-edit</title>\n<path d="M29.843 14.214c-1.271-1.228-2.050-1.112-3.696 0.52l-0.649 0.664c0 0 0.707-0.304 1.948 0.765 0.88 0.765 1.414 2.080 1.414 2.080l0.548-0.549c1.573-1.633 1.573-2.384 0.433-3.481zM26.726 16.612l-9.223 9.272 0.794 0.779-0.058 1.069-0.476 0.491-1.112 0.288-1.112-1.156 0.274-1.097 10.061-10.11c-0.592-0.101-1.011 0-1.154 0.044l-9.483 9.474-1.068 3.683 0.332 0.318 3.797-0.809 9.946-9.981c0 0-0.129-0.751-1.213-1.993-0.145-0.159-0.145-0.159-0.304-0.274zM24.778 26.981c-0.649-0.318-1.328-0.693-1.905-1.011l-3.853 3.87h7.751c0 0-0.346-2.022-1.992-2.859zM17.734 21.132c0 0-0.072-1.863-0.028-2.138 0.072-0.346 0.62-0.65 0.924-1.097 0.159-0.26 0.462-0.606 0.62-1.661 0 0 0.679 0.087 0.751-0.346 0.187-0.968 0.548-1.285 0.534-1.907-0.028-0.246 0-0.592-0.044-0.852-0.072-0.159 0.159-0.982-0.014-1.127-0.217-0.187-0.679 0.087-0.679 0.087s0.014-0.375 0.043-1.025c0.014-0.246 0.101-0.52 0.187-0.723 0.072-0.304 0.62-1.863 0.375-2.672-0.231-0.809-1.241-2.123-1.646-2.195-0.39-0.087-2.064-1.458-4.792-1.488-1.299-0.028-3.017 1.271-3.017 1.271-0.129-0.044-0.419-0.115-0.808 0.101-0.534 0.187-2.179 1.17-2.324 2.368-0.145 0.838 0.028 2.209 0.145 2.47 0.028 0.217 0.131 0.564 0.173 0.852 0.014 0.636 0.058 1.011 0.058 1.011s-0.462-0.246-0.664-0.087c-0.216 0.173 0 0.982-0.043 1.126-0.058 0.288-0.043 0.636-0.043 0.823-0.014 0.664 0.375 0.953 0.548 1.965 0.072 0.419 0.707 0.346 0.707 0.346 0.159 1.025 0.461 1.401 0.65 1.617 0.346 0.477 0.808 0.779 0.938 1.126 0.072 0.332 0 2.152 0 2.152s-1.285 1.271-1.501 1.502c-0.246 0.202-1.213 1.907-1.213 1.907l-0.822 0.549c0 0-1.877 1.055-3.507 1.878-1.631 0.852-1.964 2.874-1.964 2.874h11.388l1.386-4.911 3.753-3.755c-0.028-0.028-0.072-0.044-0.072-0.044z"/>\n</symbol>\n<symbol id="svg-user-group-add" viewBox="0 0 32 32">\n<title>user-group-add</title>\n<path d="M17.313 17.313c2.688 0 8 1.313 8 4v2.688h-16v-2.688c0-2.688 5.313-4 8-4zM26.188 17.563c2.688 0.438 5.813 1.688 5.813 3.75v2.688h-4v-2.688c0-1.563-0.688-2.75-1.813-3.75zM17.313 14.688c-2.188 0-4-1.813-4-4s1.813-4 4-4 4 1.813 4 4-1.813 4-4 4zM24 14.688c-0.438 0-0.813-0.063-1.188-0.188 0.75-1.063 1.188-2.375 1.188-3.813s-0.438-2.75-1.188-3.813c0.375-0.125 0.75-0.188 1.188-0.188 2.188 0 4 1.813 4 4s-1.813 4-4 4zM10.688 13.313v2.688h-4v4h-2.688v-4h-4v-2.688h4v-4h2.688v4h4z"/>\n</symbol>\n<symbol id="svg-user-group" viewBox="0 0 22.79 16.79">\n  <title>\n    user-group\n  </title>\n  <path d="M8.78 11.01a1.67 1.67 0 0 1-1.46 1.82H1.47A1.67 1.67 0 0 1 0 11.01C0 9.2.45 7.12 2.25 7.12a3.05 3.05 0 0 0 4.29 0c1.8 0 2.24 2.08 2.24 3.89zM7.03 4.92a2.64 2.64 0 1 1-2.64-2.63 2.64 2.64 0 0 1 2.64 2.63zM22.79 10.92a1.68 1.68 0 0 1-1.46 1.82h-5.86a1.68 1.68 0 0 1-1.46-1.82c0-1.8.45-3.89 2.25-3.89a3.05 3.05 0 0 0 4.29 0c1.8 0 2.24 2.09 2.24 3.89zm-1.75-6.09a2.64 2.64 0 1 1-2.64-2.64 2.64 2.64 0 0 1 2.64 2.64z"/>\n  <path d="M17.98 13.56a2.51 2.51 0 0 1-2.19 2.73H7.01a2.5 2.5 0 0 1-2.19-2.73c0-2.7.66-5.82 3.36-5.82a4.6 4.6 0 0 0 6.43 0c2.7 0 3.37 3.09 3.37 5.82zm-2.64-9.11A3.95 3.95 0 1 1 11.4.5a3.94 3.94 0 0 1 3.94 3.95z" stroke="#fff" stroke-miterlimit="10"/>\n</symbol>\n<symbol id="svg-user" viewBox="0 0 20 28">\n<title>user</title>\n<path d="M20 21.859c0 2.281-1.5 4.141-3.328 4.141h-13.344c-1.828 0-3.328-1.859-3.328-4.141 0-4.109 1.016-8.859 5.109-8.859 1.266 1.234 2.984 2 4.891 2s3.625-0.766 4.891-2c4.094 0 5.109 4.75 5.109 8.859zM16 8c0 3.313-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6z"/>\n</symbol>\n<symbol id="svg-video-backward" viewBox="0 0 32 32">\n<title>video-backward</title>\n<path d="M30.148 2.121l-13.881 13.843c-0.117 0.117-0.195 0.234-0.254 0.371v-13.843c0-0.683-0.389-0.857-0.877-0.371l-13.777 13.843c-0.486 0.488-0.486 1.267 0 1.755l13.777 13.843c0.486 0.488 0.877 0.312 0.877-0.371v-13.843c0.059 0.137 0.137 0.254 0.254 0.371l13.881 13.843c0.486 0.488 0.877 0.312 0.877-0.371v-28.7c0-0.683-0.389-0.857-0.877-0.371z"/>\n</symbol>\n<symbol id="svg-video-fast-backward" viewBox="0 0 32 32">\n<title>video-fast-backward</title>\n<path d="M30.12 4.313l-11.768 11.765c-0.099 0.099-0.166 0.199-0.215 0.315v-11.765c0-0.581-0.331-0.729-0.745-0.315l-11.768 11.765c-0.099 0.099-0.166 0.199-0.215 0.315v-11.235c0-0.581-0.481-1.060-1.060-1.060h-2.122c-0.581 0-1.060 0.481-1.060 1.060v23.338c0 0.581 0.481 1.060 1.060 1.060h2.122c0.581 0 1.060-0.481 1.060-1.060v-11.235c0.049 0.116 0.116 0.215 0.215 0.315l11.768 11.765c0.414 0.414 0.745 0.266 0.745-0.315v-11.765c0.049 0.116 0.116 0.215 0.215 0.315l11.768 11.765c0.414 0.414 0.745 0.266 0.745-0.315v-24.399c0-0.581-0.331-0.729-0.745-0.315z"/>\n</symbol>\n<symbol id="svg-video-fast-forward" viewBox="0 0 32 32">\n<title>video-fast-forward</title>\n<path d="M1.982 4.313l11.768 11.765c0.099 0.099 0.166 0.199 0.215 0.315v-11.765c0-0.581 0.331-0.729 0.745-0.315l11.768 11.765c0.099 0.099 0.166 0.199 0.215 0.315v-11.235c0-0.581 0.481-1.060 1.060-1.060h2.122c0.581 0 1.060 0.481 1.060 1.060v23.338c0 0.581-0.481 1.060-1.060 1.060h-2.122c-0.581 0-1.060-0.481-1.060-1.060v-11.235c-0.049 0.116-0.116 0.215-0.215 0.315l-11.768 11.765c-0.414 0.414-0.745 0.266-0.745-0.315v-11.765c-0.049 0.116-0.116 0.215-0.215 0.315l-11.768 11.765c-0.414 0.414-0.746 0.266-0.746-0.315v-24.399c0-0.581 0.331-0.729 0.746-0.315z"/>\n</symbol>\n<symbol id="svg-video-forward" viewBox="0 0 32 32">\n<title>video forward</title>\n<path d="M1.872 1.121l13.881 13.843c0.117 0.117 0.195 0.234 0.254 0.371v-13.843c0-0.683 0.389-0.857 0.877-0.371l13.777 13.843c0.486 0.488 0.486 1.267 0 1.755l-13.777 13.843c-0.486 0.488-0.877 0.312-0.877-0.371v-13.843c-0.059 0.137-0.137 0.254-0.254 0.371l-13.881 13.843c-0.486 0.488-0.877 0.312-0.877-0.371v-28.7c0-0.683 0.389-0.857 0.877-0.371z"/>\n</symbol>\n<symbol id="svg-video-pause" viewBox="0 0 32 32">\n<title>video-pause</title>\n<path d="M31.030 29.601v-27.528c0-0.685-0.568-1.251-1.251-1.251h-10.011c-0.685 0-1.251 0.568-1.251 1.251v27.528c0 0.685 0.568 1.251 1.251 1.251h10.011c0.685 0 1.251-0.568 1.251-1.251zM13.512 29.601v-27.528c0-0.685-0.568-1.251-1.251-1.251h-10.011c-0.685 0-1.251 0.568-1.251 1.251v27.528c0 0.685 0.568 1.251 1.251 1.251h10.011c0.685 0 1.251-0.568 1.251-1.251z"/>\n</symbol>\n<symbol id="svg-video-play" viewBox="0 0 32 32">\n<title>video-play</title>\n<path d="M3.311 31.716l24.175-14.28c0.619-0.332 0.608-0.871 0-1.2l-24.175-14.28c-0.599-0.329-1.083-0.039-1.083 0.638v28.483c0 0.677 0.483 0.967 1.083 0.638z"/>\n</symbol>\n<symbol id="svg-video" viewBox="0 0 32 32">\n<title>video</title>\n<path d="M0 4v24h32v-24h-32zM6 26h-4v-4h4v4zM6 18h-4v-4h4v4zM6 10h-4v-4h4v4zM24 26h-16v-20h16v20zM30 26h-4v-4h4v4zM30 18h-4v-4h4v4zM30 10h-4v-4h4v4zM12 10v12l8-6z"/>\n</symbol>\n<symbol id="svg-warning-outline" viewBox="0 0 32 32">\n<title>warning-outline</title>\n<path d="M16 2.899l13.409 26.726h-26.819l13.409-26.726zM16 0c-0.69 0-1.379 0.465-1.903 1.395l-13.659 27.222c-1.046 1.86-0.156 3.383 1.978 3.383h27.166c2.134 0 3.025-1.522 1.978-3.383h0l-13.659-27.222c-0.523-0.93-1.213-1.395-1.903-1.395v0z"/>\n<path d="M18 26c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z"/>\n<path d="M16 22c-1.105 0-2-0.895-2-2v-6c0-1.105 0.895-2 2-2s2 0.895 2 2v6c0 1.105-0.895 2-2 2z"/>\n</symbol>\n<symbol id="svg-warning" viewBox="0 0 32 32">\n<title>warning</title>\n<path d="M18.145 24.953c0 0.3-0.233 0.55-0.533 0.55h-3.201c-0.3 0-0.533-0.249-0.533-0.55v-3.169c0-0.3 0.233-0.55 0.533-0.55h3.201c0.3 0 0.533 0.249 0.533 0.55v3.169zM18.412 11.064l-0.3 7.653c-0.016 0.217-0.267 0.384-0.568 0.384h-3.085c-0.317 0-0.568-0.167-0.568-0.384l-0.284-7.619c0-0.1 0.049-0.267 0.167-0.35 0.1-0.084 0.249-0.184 0.4-0.184h3.669c0.149 0 0.3 0.1 0.4 0.184 0.117 0.084 0.167 0.217 0.167 0.317zM30.684 26.62l-12.805-23.475c-0.367-0.684-1.085-1.117-1.867-1.117s-1.501 0.433-1.867 1.117l-12.805 23.475c-0.367 0.65-0.35 1.451 0.033 2.1s1.085 1.050 1.834 1.050h25.612c0.75 0 1.451-0.4 1.834-1.050s0.4-1.451 0.033-2.1z"/>\n</symbol>\n<symbol id="svg-zoom-in" viewBox="0 0 32 32">\n<title>zoom-in</title>\n<path d="M20.283 15.298v-1.067c0-0.284-0.249-0.533-0.533-0.533h-3.735v-3.735c0-0.284-0.249-0.533-0.533-0.533h-1.067c-0.284 0-0.533 0.249-0.533 0.533v3.735h-3.735c-0.284 0-0.533 0.249-0.533 0.533v1.067c0 0.284 0.249 0.533 0.533 0.533h3.735v3.735c0 0.284 0.249 0.533 0.533 0.533h1.067c0.284 0 0.533-0.249 0.533-0.533v-3.735h3.735c0.284 0 0.533-0.249 0.533-0.533zM22.417 14.765c0 4.119-3.351 7.469-7.469 7.469s-7.469-3.351-7.469-7.469c0-4.119 3.351-7.469 7.469-7.469s7.469 3.351 7.469 7.469zM30.953 28.636c0-0.566-0.233-1.117-0.617-1.5l-5.719-5.719c1.35-1.951 2.068-4.284 2.068-6.652 0-6.486-5.252-11.737-11.737-11.737s-11.737 5.252-11.737 11.737c0 6.486 5.252 11.737 11.737 11.737 2.368 0 4.701-0.717 6.652-2.068l5.719 5.702c0.384 0.4 0.934 0.633 1.5 0.633 1.183 0 2.135-0.95 2.135-2.135z"/>\n</symbol>\n<symbol id="svg-zoom-out" viewBox="0 0 32 32">\n<title>zoom-out</title>\n<path d="M20.283 15.298v-1.067c0-0.284-0.249-0.533-0.533-0.533h-9.604c-0.284 0-0.533 0.249-0.533 0.533v1.067c0 0.284 0.249 0.533 0.533 0.533h9.604c0.284 0 0.533-0.249 0.533-0.533zM22.417 14.765c0 4.119-3.351 7.469-7.469 7.469s-7.469-3.351-7.469-7.469c0-4.119 3.351-7.469 7.469-7.469s7.469 3.351 7.469 7.469zM30.953 28.636c0-0.566-0.233-1.117-0.617-1.5l-5.719-5.719c1.35-1.951 2.068-4.284 2.068-6.652 0-6.486-5.252-11.737-11.737-11.737s-11.737 5.252-11.737 11.737c0 6.486 5.252 11.737 11.737 11.737 2.368 0 4.701-0.717 6.652-2.068l5.719 5.702c0.384 0.4 0.934 0.633 1.5 0.633 1.183 0 2.135-0.95 2.135-2.135z"/>\n</symbol></defs></svg>\n'
			},
			5005: function(e, t, n) {
				"use strict";
				var r = n(7462),
					o = n(3366),
					i = n(4184),
					a = n.n(i),
					l = n(7294),
					s = n(6792),
					c = n(8358),
					u = ["bsPrefix", "variant", "size", "active", "className", "block", "type", "as"],
					f = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.variant,
							f = e.size,
							d = e.active,
							h = e.className,
							p = e.block,
							v = e.type,
							m = e.as,
							g = (0, o.Z)(e, u),
							y = (0, s.vE)(n, "btn"),
							b = a()(h, y, d && "active", i && y + "-" + i, p && y + "-block", f && y + "-" + f);
						if (g.href) return l.createElement(c.Z, (0, r.Z)({}, g, {
							as: m,
							ref: t,
							className: a()(b, g.disabled && "disabled")
						}));
						t && (g.ref = t), v ? g.type = v : m || (g.type = "button");
						var w = m || "button";
						return l.createElement(w, (0, r.Z)({}, g, {
							className: b
						}))
					}));
				f.displayName = "Button", f.defaultProps = {
					variant: "primary",
					active: !1,
					disabled: !1
				}, t.Z = f
			},
			5881: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return S
					}
				});
				var r = n(7462),
					o = n(3366),
					i = n(4184),
					a = n.n(i),
					l = n(7294),
					s = n(6792),
					c = n(4680),
					u = n(9602),
					f = n(8154),
					d = ["bsPrefix", "className", "variant", "as"],
					h = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.className,
							c = e.variant,
							u = e.as,
							f = void 0 === u ? "img" : u,
							h = (0, o.Z)(e, d),
							p = (0, s.vE)(n, "card-img");
						return l.createElement(f, (0, r.Z)({
							ref: t,
							className: a()(c ? p + "-" + c : p, i)
						}, h))
					}));
				h.displayName = "CardImg", h.defaultProps = {
					variant: null
				};
				var p = h,
					v = ["bsPrefix", "className", "bg", "text", "border", "body", "children", "as"],
					m = (0, u.Z)("h5"),
					g = (0, u.Z)("h6"),
					y = (0, c.Z)("card-body"),
					b = (0, c.Z)("card-title", {
						Component: m
					}),
					w = (0, c.Z)("card-subtitle", {
						Component: g
					}),
					x = (0, c.Z)("card-link", {
						Component: "a"
					}),
					M = (0, c.Z)("card-text", {
						Component: "p"
					}),
					z = (0, c.Z)("card-header"),
					E = (0, c.Z)("card-footer"),
					k = (0, c.Z)("card-img-overlay"),
					C = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.className,
							c = e.bg,
							u = e.text,
							d = e.border,
							h = e.body,
							p = e.children,
							m = e.as,
							g = void 0 === m ? "div" : m,
							b = (0, o.Z)(e, v),
							w = (0, s.vE)(n, "card"),
							x = (0, l.useMemo)((function() {
								return {
									cardHeaderBsPrefix: w + "-header"
								}
							}), [w]);
						return l.createElement(f.Z.Provider, {
							value: x
						}, l.createElement(g, (0, r.Z)({
							ref: t
						}, b, {
							className: a()(i, w, c && "bg-" + c, u && "text-" + u, d && "border-" + d)
						}), h ? l.createElement(y, null, p) : p))
					}));
				C.displayName = "Card", C.defaultProps = {
					body: !1
				}, C.Img = p, C.Title = b, C.Subtitle = w, C.Body = y, C.Link = x, C.Text = M, C.Header = z, C.Footer = E, C.ImgOverlay = k;
				var S = C
			},
			8154: function(e, t, n) {
				"use strict";
				var r = n(7294).createContext(null);
				r.displayName = "CardContext", t.Z = r
			},
			9966: function(e, t, n) {
				"use strict";
				var r, o = n(7462),
					i = n(3366),
					a = n(4184),
					l = n.n(a),
					s = n(3164),
					c = n(7294),
					u = n(1138),
					f = n(492),
					d = n(6833),
					h = n(4509),
					p = ["onEnter", "onEntering", "onEntered", "onExit", "onExiting", "className", "children", "dimension", "getDimensionValue"],
					v = {
						height: ["marginTop", "marginBottom"],
						width: ["marginLeft", "marginRight"]
					};

				function m(e, t) {
					var n = t["offset" + e[0].toUpperCase() + e.slice(1)],
						r = v[e];
					return n + parseInt((0, s.Z)(t, r[0]), 10) + parseInt((0, s.Z)(t, r[1]), 10)
				}
				var g = ((r = {})[u.Wj] = "collapse", r[u.Ix] = "collapsing", r[u.d0] = "collapsing", r[u.cn] = "collapse show", r),
					y = {
						in: !1,
						timeout: 300,
						mountOnEnter: !1,
						unmountOnExit: !1,
						appear: !1,
						getDimensionValue: m
					},
					b = c.forwardRef((function(e, t) {
						var n = e.onEnter,
							r = e.onEntering,
							a = e.onEntered,
							s = e.onExit,
							v = e.onExiting,
							y = e.className,
							b = e.children,
							w = e.dimension,
							x = void 0 === w ? "height" : w,
							M = e.getDimensionValue,
							z = void 0 === M ? m : M,
							E = (0, i.Z)(e, p),
							k = "function" == typeof x ? x() : x,
							C = (0, c.useMemo)((function() {
								return (0, d.Z)((function(e) {
									e.style[k] = "0"
								}), n)
							}), [k, n]),
							S = (0, c.useMemo)((function() {
								return (0, d.Z)((function(e) {
									var t = "scroll" + k[0].toUpperCase() + k.slice(1);
									e.style[k] = e[t] + "px"
								}), r)
							}), [k, r]),
							T = (0, c.useMemo)((function() {
								return (0, d.Z)((function(e) {
									e.style[k] = null
								}), a)
							}), [k, a]),
							N = (0, c.useMemo)((function() {
								return (0, d.Z)((function(e) {
									e.style[k] = z(k, e) + "px", (0, h.Z)(e)
								}), s)
							}), [s, z, k]),
							P = (0, c.useMemo)((function() {
								return (0, d.Z)((function(e) {
									e.style[k] = null
								}), v)
							}), [k, v]);
						return c.createElement(u.ZP, (0, o.Z)({
							ref: t,
							addEndListener: f.Z
						}, E, {
							"aria-expanded": E.role ? E.in : null,
							onEnter: C,
							onEntering: S,
							onEntered: T,
							onExit: N,
							onExiting: P
						}), (function(e, t) {
							return c.cloneElement(b, (0, o.Z)({}, t, {
								className: l()(y, b.props.className, g[e], "width" === k && "width")
							}))
						}))
					}));
				b.defaultProps = y, t.Z = b
			},
			3818: function(e, t, n) {
				"use strict";
				var r = n(7462),
					o = n(3366),
					i = n(4184),
					a = n.n(i),
					l = n(7294),
					s = n(1513),
					c = n.n(s),
					u = ["as", "className", "type", "tooltip"],
					f = {
						type: c().string,
						tooltip: c().bool,
						as: c().elementType
					},
					d = l.forwardRef((function(e, t) {
						var n = e.as,
							i = void 0 === n ? "div" : n,
							s = e.className,
							c = e.type,
							f = void 0 === c ? "valid" : c,
							d = e.tooltip,
							h = void 0 !== d && d,
							p = (0, o.Z)(e, u);
						return l.createElement(i, (0, r.Z)({}, p, {
							ref: t,
							className: a()(s, f + "-" + (h ? "tooltip" : "feedback"))
						}))
					}));
				d.displayName = "Feedback", d.propTypes = f, t.Z = d
			},
			8182: function(e, t, n) {
				"use strict";
				var r = n(7462),
					o = n(3366),
					i = n(4184),
					a = n.n(i),
					l = (n(3886), n(7294)),
					s = n(3818),
					c = n(6558),
					u = n(1780),
					f = n(1377),
					d = n(6792),
					h = ["id", "bsPrefix", "bsCustomPrefix", "inline", "disabled", "isValid", "isInvalid", "feedbackTooltip", "feedback", "className", "style", "title", "type", "label", "children", "custom", "as"],
					p = l.forwardRef((function(e, t) {
						var n = e.id,
							i = e.bsPrefix,
							p = e.bsCustomPrefix,
							v = e.inline,
							m = void 0 !== v && v,
							g = e.disabled,
							y = void 0 !== g && g,
							b = e.isValid,
							w = void 0 !== b && b,
							x = e.isInvalid,
							M = void 0 !== x && x,
							z = e.feedbackTooltip,
							E = void 0 !== z && z,
							k = e.feedback,
							C = e.className,
							S = e.style,
							T = e.title,
							N = void 0 === T ? "" : T,
							P = e.type,
							A = void 0 === P ? "checkbox" : P,
							_ = e.label,
							O = e.children,
							L = e.custom,
							D = e.as,
							B = void 0 === D ? "input" : D,
							I = (0, o.Z)(e, h),
							H = "switch" === A || L,
							R = H ? [p, "custom-control"] : [i, "form-check"],
							q = R[0],
							j = R[1];
						i = (0, d.vE)(q, j);
						var Z = (0, l.useContext)(f.Z).controlId,
							F = (0, l.useMemo)((function() {
								return {
									controlId: n || Z,
									custom: H
								}
							}), [Z, H, n]),
							V = H || null != _ && !1 !== _ && !O,
							Q = l.createElement(c.Z, (0, r.Z)({}, I, {
								type: "switch" === A ? "checkbox" : A,
								ref: t,
								isValid: w,
								isInvalid: M,
								isStatic: !V,
								disabled: y,
								as: B
							}));
						return l.createElement(f.Z.Provider, {
							value: F
						}, l.createElement("div", {
							style: S,
							className: a()(C, i, H && "custom-" + A, m && i + "-inline")
						}, O || l.createElement(l.Fragment, null, Q, V && l.createElement(u.Z, {
							title: N
						}, _), (w || M) && l.createElement(s.Z, {
							type: w ? "valid" : "invalid",
							tooltip: E
						}, k))))
					}));
				p.displayName = "FormCheck", p.Input = c.Z, p.Label = u.Z, t.Z = p
			},
			6558: function(e, t, n) {
				"use strict";
				var r = n(7462),
					o = n(3366),
					i = n(4184),
					a = n.n(i),
					l = n(7294),
					s = n(1377),
					c = n(6792),
					u = ["id", "bsPrefix", "bsCustomPrefix", "className", "type", "isValid", "isInvalid", "isStatic", "as"],
					f = l.forwardRef((function(e, t) {
						var n = e.id,
							i = e.bsPrefix,
							f = e.bsCustomPrefix,
							d = e.className,
							h = e.type,
							p = void 0 === h ? "checkbox" : h,
							v = e.isValid,
							m = void 0 !== v && v,
							g = e.isInvalid,
							y = void 0 !== g && g,
							b = e.isStatic,
							w = e.as,
							x = void 0 === w ? "input" : w,
							M = (0, o.Z)(e, u),
							z = (0, l.useContext)(s.Z),
							E = z.controlId,
							k = z.custom ? [f, "custom-control-input"] : [i, "form-check-input"],
							C = k[0],
							S = k[1];
						return i = (0, c.vE)(C, S), l.createElement(x, (0, r.Z)({}, M, {
							ref: t,
							type: p,
							id: n || E,
							className: a()(d, i, m && "is-valid", y && "is-invalid", b && "position-static")
						}))
					}));
				f.displayName = "FormCheckInput", t.Z = f
			},
			1780: function(e, t, n) {
				"use strict";
				var r = n(7462),
					o = n(3366),
					i = n(4184),
					a = n.n(i),
					l = n(7294),
					s = n(1377),
					c = n(6792),
					u = ["bsPrefix", "bsCustomPrefix", "className", "htmlFor"],
					f = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.bsCustomPrefix,
							f = e.className,
							d = e.htmlFor,
							h = (0, o.Z)(e, u),
							p = (0, l.useContext)(s.Z),
							v = p.controlId,
							m = p.custom ? [i, "custom-control-label"] : [n, "form-check-label"],
							g = m[0],
							y = m[1];
						return n = (0, c.vE)(g, y), l.createElement("label", (0, r.Z)({}, h, {
							ref: t,
							htmlFor: d || v,
							className: a()(f, n)
						}))
					}));
				f.displayName = "FormCheckLabel", t.Z = f
			},
			1377: function(e, t, n) {
				"use strict";
				var r = n(7294).createContext({
					controlId: void 0
				});
				t.Z = r
			},
			4716: function(e, t, n) {
				"use strict";
				var r = n(7462),
					o = n(3366),
					i = n(4184),
					a = n.n(i),
					l = (n(3886), n(7294)),
					s = (n(2473), n(3818)),
					c = n(1377),
					u = n(6792),
					f = ["bsPrefix", "bsCustomPrefix", "type", "size", "htmlSize", "id", "className", "isValid", "isInvalid", "plaintext", "readOnly", "custom", "as"],
					d = l.forwardRef((function(e, t) {
						var n, i, s = e.bsPrefix,
							d = e.bsCustomPrefix,
							h = e.type,
							p = e.size,
							v = e.htmlSize,
							m = e.id,
							g = e.className,
							y = e.isValid,
							b = void 0 !== y && y,
							w = e.isInvalid,
							x = void 0 !== w && w,
							M = e.plaintext,
							z = e.readOnly,
							E = e.custom,
							k = e.as,
							C = void 0 === k ? "input" : k,
							S = (0, o.Z)(e, f),
							T = (0, l.useContext)(c.Z).controlId,
							N = E ? [d, "custom"] : [s, "form-control"],
							P = N[0],
							A = N[1];
						if (s = (0, u.vE)(P, A), M)(i = {})[s + "-plaintext"] = !0, n = i;
						else if ("file" === h) {
							var _;
							(_ = {})[s + "-file"] = !0, n = _
						} else if ("range" === h) {
							var O;
							(O = {})[s + "-range"] = !0, n = O
						} else if ("select" === C && E) {
							var L;
							(L = {})[s + "-select"] = !0, L[s + "-select-" + p] = p, n = L
						} else {
							var D;
							(D = {})[s] = !0, D[s + "-" + p] = p, n = D
						}
						return l.createElement(C, (0, r.Z)({}, S, {
							type: h,
							size: v,
							ref: t,
							readOnly: z,
							id: m || T,
							className: a()(g, n, b && "is-valid", x && "is-invalid")
						}))
					}));
				d.displayName = "FormControl", t.Z = Object.assign(d, {
					Feedback: s.Z
				})
			},
			6986: function(e, t, n) {
				"use strict";
				var r = n(7462),
					o = n(3366),
					i = n(4184),
					a = n.n(i),
					l = n(7294),
					s = n(1377),
					c = n(6792),
					u = ["bsPrefix", "className", "children", "controlId", "as"],
					f = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.className,
							f = e.children,
							d = e.controlId,
							h = e.as,
							p = void 0 === h ? "div" : h,
							v = (0, o.Z)(e, u);
						n = (0, c.vE)(n, "form-group");
						var m = (0, l.useMemo)((function() {
							return {
								controlId: d
							}
						}), [d]);
						return l.createElement(s.Z.Provider, {
							value: m
						}, l.createElement(p, (0, r.Z)({}, v, {
							ref: t,
							className: a()(i, n)
						}), f))
					}));
				f.displayName = "FormGroup", t.Z = f
			},
			9848: function(e, t, n) {
				"use strict";
				var r = n(7462),
					o = n(3366),
					i = n(4184),
					a = n.n(i),
					l = n(7294),
					s = n(6792),
					c = ["bsPrefix", "className", "as", "muted"],
					u = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.className,
							u = e.as,
							f = void 0 === u ? "small" : u,
							d = e.muted,
							h = (0, o.Z)(e, c);
						return n = (0, s.vE)(n, "form-text"), l.createElement(f, (0, r.Z)({}, h, {
							ref: t,
							className: a()(i, n, d && "text-muted")
						}))
					}));
				u.displayName = "FormText", t.Z = u
			},
			590: function(e, t, n) {
				"use strict";
				var r = n(7294).createContext(null);
				r.displayName = "NavContext", t.Z = r
			},
			4819: function(e, t, n) {
				"use strict";
				var r = n(7294).createContext(null);
				r.displayName = "NavbarContext", t.Z = r
			},
			8358: function(e, t, n) {
				"use strict";
				var r = n(7462),
					o = n(3366),
					i = n(7294),
					a = n(6833),
					l = ["as", "disabled", "onKeyDown"];

				function s(e) {
					return !e || "#" === e.trim()
				}
				var c = i.forwardRef((function(e, t) {
					var n = e.as,
						c = void 0 === n ? "a" : n,
						u = e.disabled,
						f = e.onKeyDown,
						d = (0, o.Z)(e, l),
						h = function(e) {
							var t = d.href,
								n = d.onClick;
							(u || s(t)) && e.preventDefault(), u ? e.stopPropagation() : n && n(e)
						};
					return s(d.href) && (d.role = d.role || "button", d.href = d.href || "#"), u && (d.tabIndex = -1, d["aria-disabled"] = !0), i.createElement(c, (0, r.Z)({
						ref: t
					}, d, {
						onClick: h,
						onKeyDown: (0, a.Z)((function(e) {
							" " === e.key && (e.preventDefault(), h(e))
						}), f)
					}))
				}));
				c.displayName = "SafeAnchor", t.Z = c
			},
			5017: function(e, t, n) {
				"use strict";
				n.d(t, {
					h: function() {
						return o
					}
				});
				var r = n(7294).createContext(null),
					o = function(e, t) {
						return void 0 === t && (t = null), null != e ? String(e) : t || null
					};
				t.Z = r
			},
			6792: function(e, t, n) {
				"use strict";
				n.d(t, {
					vE: function() {
						return i
					}
				});
				var r = n(7294),
					o = r.createContext({});

				function i(e, t) {
					var n = (0, r.useContext)(o);
					return e || n[t] || t
				}
				o.Consumer, o.Provider
			},
			6833: function(e, t) {
				"use strict";
				t.Z = function() {
					for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
					return t.filter((function(e) {
						return null != e
					})).reduce((function(e, t) {
						if ("function" != typeof t) throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");
						return null === e ? t : function() {
							for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
							e.apply(this, r), t.apply(this, r)
						}
					}), null)
				}
			},
			4680: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return f
					}
				});
				var r = n(7462),
					o = n(3366),
					i = n(4184),
					a = n.n(i),
					l = /-(.)/g,
					s = n(7294),
					c = n(6792),
					u = ["className", "bsPrefix", "as"];

				function f(e, t) {
					var n, i, f = void 0 === t ? {} : t,
						d = f.displayName,
						h = void 0 === d ? (n = e)[0].toUpperCase() + (i = n, i.replace(l, (function(e, t) {
							return t.toUpperCase()
						}))).slice(1) : d,
						p = f.Component,
						v = f.defaultProps,
						m = s.forwardRef((function(t, n) {
							var i = t.className,
								l = t.bsPrefix,
								f = t.as,
								d = void 0 === f ? p || "div" : f,
								h = (0, o.Z)(t, u),
								v = (0, c.vE)(l, e);
							return s.createElement(d, (0, r.Z)({
								ref: n,
								className: a()(i, v)
							}, h))
						}));
					return m.defaultProps = v, m.displayName = h, m
				}
			},
			9602: function(e, t, n) {
				"use strict";
				var r = n(7462),
					o = n(7294),
					i = n(4184),
					a = n.n(i);
				t.Z = function(e) {
					return o.forwardRef((function(t, n) {
						return o.createElement("div", (0, r.Z)({}, t, {
							ref: n,
							className: a()(t.className, e)
						}))
					}))
				}
			},
			492: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return l
					}
				});
				var r = n(3164),
					o = n(3299);

				function i(e, t, n, i) {
					var a, l, s;
					null == n && (a = e, s = -1 === (l = (0, r.Z)(a, "transitionDuration") || "").indexOf("ms") ? 1e3 : 1, n = parseFloat(l) * s || 0);
					var c = function(e, t, n) {
							void 0 === n && (n = 5);
							var r = !1,
								i = setTimeout((function() {
									r || function(e, t, n, r) {
										if (void 0 === n && (n = !1), void 0 === r && (r = !0), e) {
											var o = document.createEvent("HTMLEvents");
											o.initEvent("transitionend", n, r), e.dispatchEvent(o)
										}
									}(e, 0, !0)
								}), t + n),
								a = (0, o.Z)(e, "transitionend", (function() {
									r = !0
								}), {
									once: !0
								});
							return function() {
								clearTimeout(i), a()
							}
						}(e, n, i),
						u = (0, o.Z)(e, "transitionend", t);
					return function() {
						c(), u()
					}
				}

				function a(e, t) {
					var n = (0, r.Z)(e, t) || "",
						o = -1 === n.indexOf("ms") ? 1e3 : 1;
					return parseFloat(n) * o
				}

				function l(e, t) {
					var n = a(e, "transitionDuration"),
						r = a(e, "transitionDelay"),
						o = i(e, (function(n) {
							n.target === e && (o(), t(n))
						}), n + r)
				}
			},
			4509: function(e, t, n) {
				"use strict";

				function r(e) {
					e.offsetHeight
				}
				n.d(t, {
					Z: function() {
						return r
					}
				})
			},
			3509: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return l
					}
				});
				var r = n(7294),
					o = n(1132),
					i = n(6792);

				function a(e) {
					var t = window.getComputedStyle(e);
					return {
						top: parseFloat(t.marginTop) || 0,
						right: parseFloat(t.marginRight) || 0,
						bottom: parseFloat(t.marginBottom) || 0,
						left: parseFloat(t.marginLeft) || 0
					}
				}

				function l() {
					var e = (0, r.useRef)(null),
						t = (0, r.useRef)(null),
						n = (0, r.useRef)(null),
						l = (0, i.vE)(void 0, "popover"),
						s = (0, i.vE)(void 0, "dropdown-menu");
					return [(0, r.useCallback)((function(n) {
						n && ((0, o.Z)(n, l) || (0, o.Z)(n, s)) && (t.current = a(n), n.style.margin = "0", e.current = n)
					}), [l, s]), [(0, r.useMemo)((function() {
						return {
							name: "offset",
							options: {
								offset: function(e) {
									var n = e.placement;
									if (!t.current) return [0, 0];
									var r = t.current,
										o = r.top,
										i = r.left,
										a = r.bottom,
										l = r.right;
									switch (n.split("-")[0]) {
										case "top":
											return [0, a];
										case "left":
											return [0, l];
										case "bottom":
											return [0, o];
										case "right":
											return [0, i];
										default:
											return [0, 0]
									}
								}
							}
						}
					}), [t]), (0, r.useMemo)((function() {
						return {
							name: "arrow",
							options: {
								padding: function() {
									if (!n.current) return 0;
									var e = n.current,
										t = e.top,
										r = e.right,
										o = t || r;
									return {
										top: o,
										left: o,
										right: o,
										bottom: o
									}
								}
							}
						}
					}), [n]), (0, r.useMemo)((function() {
						return {
							name: "popoverArrowMargins",
							enabled: !0,
							phase: "main",
							fn: function() {},
							requiresIfExists: ["arrow"],
							effect: function(t) {
								var r = t.state;
								if (e.current && r.elements.arrow && (0, o.Z)(e.current, l)) {
									if (r.modifiersData["arrow#persistent"]) {
										var i = a(r.elements.arrow),
											s = i.top,
											c = i.right,
											u = s || c;
										r.modifiersData["arrow#persistent"].padding = {
											top: u,
											left: u,
											right: u,
											bottom: u
										}
									} else n.current = a(r.elements.arrow);
									return r.elements.arrow.style.margin = "0",
										function() {
											r.elements.arrow && (r.elements.arrow.style.margin = "")
										}
								}
							}
						}
					}), [l])]]
				}
			},
			4429: function(e, t, n) {
				"use strict";
				var r = n(8897);

				function o() {}

				function i() {}
				i.resetWarningCache = o, e.exports = function() {
					function e(e, t, n, o, i, a) {
						if (a !== r) {
							var l = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
							throw l.name = "Invariant Violation", l
						}
					}

					function t() {
						return e
					}
					e.isRequired = e;
					var n = {
						array: e,
						bigint: e,
						bool: e,
						func: e,
						number: e,
						object: e,
						string: e,
						symbol: e,
						any: e,
						arrayOf: t,
						element: e,
						elementType: e,
						instanceOf: t,
						node: e,
						objectOf: t,
						oneOf: t,
						oneOfType: t,
						shape: t,
						exact: t,
						checkPropTypes: i,
						resetWarningCache: o
					};
					return n.PropTypes = n, n
				}
			},
			1513: function(e, t, n) {
				e.exports = n(4429)()
			},
			8897: function(e) {
				"use strict";
				e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
			},
			1138: function(e, t, n) {
				"use strict";
				n.d(t, {
					cn: function() {
						return f
					},
					d0: function() {
						return u
					},
					Wj: function() {
						return c
					},
					Ix: function() {
						return d
					},
					ZP: function() {
						return v
					}
				});
				var r = n(3366),
					o = n(1721),
					i = (n(8949), n(7294)),
					a = n(3935),
					l = i.createContext(null),
					s = "unmounted",
					c = "exited",
					u = "entering",
					f = "entered",
					d = "exiting",
					h = function(e) {
						function t(t, n) {
							var r;
							r = e.call(this, t, n) || this;
							var o, i = n && !n.isMounting ? t.enter : t.appear;
							return r.appearStatus = null, t.in ? i ? (o = c, r.appearStatus = u) : o = f : o = t.unmountOnExit || t.mountOnEnter ? s : c, r.state = {
								status: o
							}, r.nextCallback = null, r
						}(0, o.Z)(t, e), t.getDerivedStateFromProps = function(e, t) {
							return e.in && t.status === s ? {
								status: c
							} : null
						};
						var n = t.prototype;
						return n.componentDidMount = function() {
							this.updateStatus(!0, this.appearStatus)
						}, n.componentDidUpdate = function(e) {
							var t = null;
							if (e !== this.props) {
								var n = this.state.status;
								this.props.in ? n !== u && n !== f && (t = u) : n !== u && n !== f || (t = d)
							}
							this.updateStatus(!1, t)
						}, n.componentWillUnmount = function() {
							this.cancelNextCallback()
						}, n.getTimeouts = function() {
							var e, t, n, r = this.props.timeout;
							return e = t = n = r, null != r && "number" != typeof r && (e = r.exit, t = r.enter, n = void 0 !== r.appear ? r.appear : t), {
								exit: e,
								enter: t,
								appear: n
							}
						}, n.updateStatus = function(e, t) {
							void 0 === e && (e = !1), null !== t ? (this.cancelNextCallback(), t === u ? this.performEnter(e) : this.performExit()) : this.props.unmountOnExit && this.state.status === c && this.setState({
								status: s
							})
						}, n.performEnter = function(e) {
							var t = this,
								n = this.props.enter,
								r = this.context ? this.context.isMounting : e,
								o = this.props.nodeRef ? [r] : [a.findDOMNode(this), r],
								i = o[0],
								l = o[1],
								s = this.getTimeouts(),
								c = r ? s.appear : s.enter;
							e || n ? (this.props.onEnter(i, l), this.safeSetState({
								status: u
							}, (function() {
								t.props.onEntering(i, l), t.onTransitionEnd(c, (function() {
									t.safeSetState({
										status: f
									}, (function() {
										t.props.onEntered(i, l)
									}))
								}))
							}))) : this.safeSetState({
								status: f
							}, (function() {
								t.props.onEntered(i)
							}))
						}, n.performExit = function() {
							var e = this,
								t = this.props.exit,
								n = this.getTimeouts(),
								r = this.props.nodeRef ? void 0 : a.findDOMNode(this);
							t ? (this.props.onExit(r), this.safeSetState({
								status: d
							}, (function() {
								e.props.onExiting(r), e.onTransitionEnd(n.exit, (function() {
									e.safeSetState({
										status: c
									}, (function() {
										e.props.onExited(r)
									}))
								}))
							}))) : this.safeSetState({
								status: c
							}, (function() {
								e.props.onExited(r)
							}))
						}, n.cancelNextCallback = function() {
							null !== this.nextCallback && (this.nextCallback.cancel(), this.nextCallback = null)
						}, n.safeSetState = function(e, t) {
							t = this.setNextCallback(t), this.setState(e, t)
						}, n.setNextCallback = function(e) {
							var t = this,
								n = !0;
							return this.nextCallback = function(r) {
								n && (n = !1, t.nextCallback = null, e(r))
							}, this.nextCallback.cancel = function() {
								n = !1
							}, this.nextCallback
						}, n.onTransitionEnd = function(e, t) {
							this.setNextCallback(t);
							var n = this.props.nodeRef ? this.props.nodeRef.current : a.findDOMNode(this),
								r = null == e && !this.props.addEndListener;
							if (n && !r) {
								if (this.props.addEndListener) {
									var o = this.props.nodeRef ? [this.nextCallback] : [n, this.nextCallback],
										i = o[0],
										l = o[1];
									this.props.addEndListener(i, l)
								}
								null != e && setTimeout(this.nextCallback, e)
							} else setTimeout(this.nextCallback, 0)
						}, n.render = function() {
							var e = this.state.status;
							if (e === s) return null;
							var t = this.props,
								n = t.children,
								o = (t.in, t.mountOnEnter, t.unmountOnExit, t.appear, t.enter, t.exit, t.timeout, t.addEndListener, t.onEnter, t.onEntering, t.onEntered, t.onExit, t.onExiting, t.onExited, t.nodeRef, (0, r.Z)(t, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]));
							return i.createElement(l.Provider, {
								value: null
							}, "function" == typeof n ? n(e, o) : i.cloneElement(i.Children.only(n), o))
						}, t
					}(i.Component);

				function p() {}
				h.contextType = l, h.propTypes = {}, h.defaultProps = {
					in: !1,
					mountOnEnter: !1,
					unmountOnExit: !1,
					appear: !1,
					enter: !0,
					exit: !0,
					onEnter: p,
					onEntering: p,
					onEntered: p,
					onExit: p,
					onExiting: p,
					onExited: p
				}, h.UNMOUNTED = s, h.EXITED = c, h.ENTERING = u, h.ENTERED = f, h.EXITING = d;
				var v = h
			},
			5278: function(e, t, n) {
				"use strict";
				var r = n(6604);

				function o() {}

				function i() {}
				i.resetWarningCache = o, e.exports = function() {
					function e(e, t, n, o, i, a) {
						if (a !== r) {
							var l = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
							throw l.name = "Invariant Violation", l
						}
					}

					function t() {
						return e
					}
					e.isRequired = e;
					var n = {
						array: e,
						bool: e,
						func: e,
						number: e,
						object: e,
						string: e,
						symbol: e,
						any: e,
						arrayOf: t,
						element: e,
						elementType: e,
						instanceOf: t,
						node: e,
						objectOf: t,
						oneOf: t,
						oneOfType: t,
						shape: t,
						exact: t,
						checkPropTypes: i,
						resetWarningCache: o
					};
					return n.PropTypes = n, n
				}
			},
			8949: function(e, t, n) {
				e.exports = n(5278)()
			},
			6604: function(e) {
				"use strict";
				e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
			},
			4448: function(e, t, n) {
				"use strict";
				var r = n(7294),
					o = n(7418),
					i = n(4142);

				function a(e) {
					for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
					return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
				}
				if (!r) throw Error(a(227));
				var l = new Set,
					s = {};

				function c(e, t) {
					u(e, t), u(e + "Capture", t)
				}

				function u(e, t) {
					for (s[e] = t, e = 0; e < t.length; e++) l.add(t[e])
				}
				var f = !("undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement),
					d = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
					h = Object.prototype.hasOwnProperty,
					p = {},
					v = {};

				function m(e, t, n, r, o, i, a) {
					this.acceptsBooleans = 2 === t || 3 === t || 4 === t, this.attributeName = r, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = a
				}
				var g = {};
				"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e) {
					g[e] = new m(e, 0, !1, e, null, !1, !1)
				})), [
					["acceptCharset", "accept-charset"],
					["className", "class"],
					["htmlFor", "for"],
					["httpEquiv", "http-equiv"]
				].forEach((function(e) {
					var t = e[0];
					g[t] = new m(t, 1, !1, e[1], null, !1, !1)
				})), ["contentEditable", "draggable", "spellCheck", "value"].forEach((function(e) {
					g[e] = new m(e, 2, !1, e.toLowerCase(), null, !1, !1)
				})), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach((function(e) {
					g[e] = new m(e, 2, !1, e, null, !1, !1)
				})), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e) {
					g[e] = new m(e, 3, !1, e.toLowerCase(), null, !1, !1)
				})), ["checked", "multiple", "muted", "selected"].forEach((function(e) {
					g[e] = new m(e, 3, !0, e, null, !1, !1)
				})), ["capture", "download"].forEach((function(e) {
					g[e] = new m(e, 4, !1, e, null, !1, !1)
				})), ["cols", "rows", "size", "span"].forEach((function(e) {
					g[e] = new m(e, 6, !1, e, null, !1, !1)
				})), ["rowSpan", "start"].forEach((function(e) {
					g[e] = new m(e, 5, !1, e.toLowerCase(), null, !1, !1)
				}));
				var y = /[\-:]([a-z])/g;

				function b(e) {
					return e[1].toUpperCase()
				}

				function w(e, t, n, r) {
					var o = g.hasOwnProperty(t) ? g[t] : null;
					(null !== o ? 0 === o.type : !r && 2 < t.length && ("o" === t[0] || "O" === t[0]) && ("n" === t[1] || "N" === t[1])) || (function(e, t, n, r) {
						if (null == t || function(e, t, n, r) {
								if (null !== n && 0 === n.type) return !1;
								switch (typeof t) {
									case "function":
									case "symbol":
										return !0;
									case "boolean":
										return !r && (null !== n ? !n.acceptsBooleans : "data-" !== (e = e.toLowerCase().slice(0, 5)) && "aria-" !== e);
									default:
										return !1
								}
							}(e, t, n, r)) return !0;
						if (r) return !1;
						if (null !== n) switch (n.type) {
							case 3:
								return !t;
							case 4:
								return !1 === t;
							case 5:
								return isNaN(t);
							case 6:
								return isNaN(t) || 1 > t
						}
						return !1
					}(t, n, o, r) && (n = null), r || null === o ? function(e) {
						return !!h.call(v, e) || !h.call(p, e) && (d.test(e) ? v[e] = !0 : (p[e] = !0, !1))
					}(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : o.mustUseProperty ? e[o.propertyName] = null === n ? 3 !== o.type && "" : n : (t = o.attributeName, r = o.attributeNamespace, null === n ? e.removeAttribute(t) : (n = 3 === (o = o.type) || 4 === o && !0 === n ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
				}
				"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e) {
					var t = e.replace(y, b);
					g[t] = new m(t, 1, !1, e, null, !1, !1)
				})), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e) {
					var t = e.replace(y, b);
					g[t] = new m(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
				})), ["xml:base", "xml:lang", "xml:space"].forEach((function(e) {
					var t = e.replace(y, b);
					g[t] = new m(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
				})), ["tabIndex", "crossOrigin"].forEach((function(e) {
					g[e] = new m(e, 1, !1, e.toLowerCase(), null, !1, !1)
				})), g.xlinkHref = new m("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach((function(e) {
					g[e] = new m(e, 1, !1, e.toLowerCase(), null, !0, !0)
				}));
				var x = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
					M = 60103,
					z = 60106,
					E = 60107,
					k = 60108,
					C = 60114,
					S = 60109,
					T = 60110,
					N = 60112,
					P = 60113,
					A = 60120,
					_ = 60115,
					O = 60116,
					L = 60121,
					D = 60128,
					B = 60129,
					I = 60130,
					H = 60131;
				if ("function" == typeof Symbol && Symbol.for) {
					var R = Symbol.for;
					M = R("react.element"), z = R("react.portal"), E = R("react.fragment"), k = R("react.strict_mode"), C = R("react.profiler"), S = R("react.provider"), T = R("react.context"), N = R("react.forward_ref"), P = R("react.suspense"), A = R("react.suspense_list"), _ = R("react.memo"), O = R("react.lazy"), L = R("react.block"), R("react.scope"), D = R("react.opaque.id"), B = R("react.debug_trace_mode"), I = R("react.offscreen"), H = R("react.legacy_hidden")
				}
				var q, j = "function" == typeof Symbol && Symbol.iterator;

				function Z(e) {
					return null === e || "object" != typeof e ? null : "function" == typeof(e = j && e[j] || e["@@iterator"]) ? e : null
				}

				function F(e) {
					if (void 0 === q) try {
						throw Error()
					} catch (e) {
						var t = e.stack.trim().match(/\n( *(at )?)/);
						q = t && t[1] || ""
					}
					return "\n" + q + e
				}
				var V = !1;

				function Q(e, t) {
					if (!e || V) return "";
					V = !0;
					var n = Error.prepareStackTrace;
					Error.prepareStackTrace = void 0;
					try {
						if (t)
							if (t = function() {
									throw Error()
								}, Object.defineProperty(t.prototype, "props", {
									set: function() {
										throw Error()
									}
								}), "object" == typeof Reflect && Reflect.construct) {
								try {
									Reflect.construct(t, [])
								} catch (e) {
									var r = e
								}
								Reflect.construct(e, [], t)
							} else {
								try {
									t.call()
								} catch (e) {
									r = e
								}
								e.call(t.prototype)
							}
						else {
							try {
								throw Error()
							} catch (e) {
								r = e
							}
							e()
						}
					} catch (e) {
						if (e && r && "string" == typeof e.stack) {
							for (var o = e.stack.split("\n"), i = r.stack.split("\n"), a = o.length - 1, l = i.length - 1; 1 <= a && 0 <= l && o[a] !== i[l];) l--;
							for (; 1 <= a && 0 <= l; a--, l--)
								if (o[a] !== i[l]) {
									if (1 !== a || 1 !== l)
										do {
											if (a--, 0 > --l || o[a] !== i[l]) return "\n" + o[a].replace(" at new ", " at ")
										} while (1 <= a && 0 <= l);
									break
								}
						}
					} finally {
						V = !1, Error.prepareStackTrace = n
					}
					return (e = e ? e.displayName || e.name : "") ? F(e) : ""
				}

				function U(e) {
					switch (e.tag) {
						case 5:
							return F(e.type);
						case 16:
							return F("Lazy");
						case 13:
							return F("Suspense");
						case 19:
							return F("SuspenseList");
						case 0:
						case 2:
						case 15:
							return Q(e.type, !1);
						case 11:
							return Q(e.type.render, !1);
						case 22:
							return Q(e.type._render, !1);
						case 1:
							return Q(e.type, !0);
						default:
							return ""
					}
				}

				function K(e) {
					if (null == e) return null;
					if ("function" == typeof e) return e.displayName || e.name || null;
					if ("string" == typeof e) return e;
					switch (e) {
						case E:
							return "Fragment";
						case z:
							return "Portal";
						case C:
							return "Profiler";
						case k:
							return "StrictMode";
						case P:
							return "Suspense";
						case A:
							return "SuspenseList"
					}
					if ("object" == typeof e) switch (e.$$typeof) {
						case T:
							return (e.displayName || "Context") + ".Consumer";
						case S:
							return (e._context.displayName || "Context") + ".Provider";
						case N:
							var t = e.render;
							return t = t.displayName || t.name || "", e.displayName || ("" !== t ? "ForwardRef(" + t + ")" : "ForwardRef");
						case _:
							return K(e.type);
						case L:
							return K(e._render);
						case O:
							t = e._payload, e = e._init;
							try {
								return K(e(t))
							} catch (e) {}
					}
					return null
				}

				function W(e) {
					switch (typeof e) {
						case "boolean":
						case "number":
						case "object":
						case "string":
						case "undefined":
							return e;
						default:
							return ""
					}
				}

				function $(e) {
					var t = e.type;
					return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t)
				}

				function Y(e) {
					e._valueTracker || (e._valueTracker = function(e) {
						var t = $(e) ? "checked" : "value",
							n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
							r = "" + e[t];
						if (!e.hasOwnProperty(t) && void 0 !== n && "function" == typeof n.get && "function" == typeof n.set) {
							var o = n.get,
								i = n.set;
							return Object.defineProperty(e, t, {
								configurable: !0,
								get: function() {
									return o.call(this)
								},
								set: function(e) {
									r = "" + e, i.call(this, e)
								}
							}), Object.defineProperty(e, t, {
								enumerable: n.enumerable
							}), {
								getValue: function() {
									return r
								},
								setValue: function(e) {
									r = "" + e
								},
								stopTracking: function() {
									e._valueTracker = null, delete e[t]
								}
							}
						}
					}(e))
				}

				function G(e) {
					if (!e) return !1;
					var t = e._valueTracker;
					if (!t) return !0;
					var n = t.getValue(),
						r = "";
					return e && (r = $(e) ? e.checked ? "true" : "false" : e.value), (e = r) !== n && (t.setValue(e), !0)
				}

				function X(e) {
					if (void 0 === (e = e || ("undefined" != typeof document ? document : void 0))) return null;
					try {
						return e.activeElement || e.body
					} catch (t) {
						return e.body
					}
				}

				function J(e, t) {
					var n = t.checked;
					return o({}, t, {
						defaultChecked: void 0,
						defaultValue: void 0,
						value: void 0,
						checked: null != n ? n : e._wrapperState.initialChecked
					})
				}

				function ee(e, t) {
					var n = null == t.defaultValue ? "" : t.defaultValue,
						r = null != t.checked ? t.checked : t.defaultChecked;
					n = W(null != t.value ? t.value : n), e._wrapperState = {
						initialChecked: r,
						initialValue: n,
						controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value
					}
				}

				function te(e, t) {
					null != (t = t.checked) && w(e, "checked", t, !1)
				}

				function ne(e, t) {
					te(e, t);
					var n = W(t.value),
						r = t.type;
					if (null != n) "number" === r ? (0 === n && "" === e.value || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
					else if ("submit" === r || "reset" === r) return void e.removeAttribute("value");
					t.hasOwnProperty("value") ? oe(e, t.type, n) : t.hasOwnProperty("defaultValue") && oe(e, t.type, W(t.defaultValue)), null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked)
				}

				function re(e, t, n) {
					if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
						var r = t.type;
						if (!("submit" !== r && "reset" !== r || void 0 !== t.value && null !== t.value)) return;
						t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t
					}
					"" !== (n = e.name) && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, "" !== n && (e.name = n)
				}

				function oe(e, t, n) {
					"number" === t && X(e.ownerDocument) === e || (null == n ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
				}

				function ie(e, t) {
					return e = o({
						children: void 0
					}, t), (t = function(e) {
						var t = "";
						return r.Children.forEach(e, (function(e) {
							null != e && (t += e)
						})), t
					}(t.children)) && (e.children = t), e
				}

				function ae(e, t, n, r) {
					if (e = e.options, t) {
						t = {};
						for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
						for (n = 0; n < e.length; n++) o = t.hasOwnProperty("$" + e[n].value), e[n].selected !== o && (e[n].selected = o), o && r && (e[n].defaultSelected = !0)
					} else {
						for (n = "" + W(n), t = null, o = 0; o < e.length; o++) {
							if (e[o].value === n) return e[o].selected = !0, void(r && (e[o].defaultSelected = !0));
							null !== t || e[o].disabled || (t = e[o])
						}
						null !== t && (t.selected = !0)
					}
				}

				function le(e, t) {
					if (null != t.dangerouslySetInnerHTML) throw Error(a(91));
					return o({}, t, {
						value: void 0,
						defaultValue: void 0,
						children: "" + e._wrapperState.initialValue
					})
				}

				function se(e, t) {
					var n = t.value;
					if (null == n) {
						if (n = t.children, t = t.defaultValue, null != n) {
							if (null != t) throw Error(a(92));
							if (Array.isArray(n)) {
								if (!(1 >= n.length)) throw Error(a(93));
								n = n[0]
							}
							t = n
						}
						null == t && (t = ""), n = t
					}
					e._wrapperState = {
						initialValue: W(n)
					}
				}

				function ce(e, t) {
					var n = W(t.value),
						r = W(t.defaultValue);
					null != n && ((n = "" + n) !== e.value && (e.value = n), null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)), null != r && (e.defaultValue = "" + r)
				}

				function ue(e) {
					var t = e.textContent;
					t === e._wrapperState.initialValue && "" !== t && null !== t && (e.value = t)
				}
				var fe = "http://www.w3.org/1999/xhtml";

				function de(e) {
					switch (e) {
						case "svg":
							return "http://www.w3.org/2000/svg";
						case "math":
							return "http://www.w3.org/1998/Math/MathML";
						default:
							return "http://www.w3.org/1999/xhtml"
					}
				}

				function he(e, t) {
					return null == e || "http://www.w3.org/1999/xhtml" === e ? de(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e
				}
				var pe, ve, me = (ve = function(e, t) {
					if ("http://www.w3.org/2000/svg" !== e.namespaceURI || "innerHTML" in e) e.innerHTML = t;
					else {
						for ((pe = pe || document.createElement("div")).innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = pe.firstChild; e.firstChild;) e.removeChild(e.firstChild);
						for (; t.firstChild;) e.appendChild(t.firstChild)
					}
				}, "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function(e, t, n, r) {
					MSApp.execUnsafeLocalFunction((function() {
						return ve(e, t)
					}))
				} : ve);

				function ge(e, t) {
					if (t) {
						var n = e.firstChild;
						if (n && n === e.lastChild && 3 === n.nodeType) return void(n.nodeValue = t)
					}
					e.textContent = t
				}
				var ye = {
						animationIterationCount: !0,
						borderImageOutset: !0,
						borderImageSlice: !0,
						borderImageWidth: !0,
						boxFlex: !0,
						boxFlexGroup: !0,
						boxOrdinalGroup: !0,
						columnCount: !0,
						columns: !0,
						flex: !0,
						flexGrow: !0,
						flexPositive: !0,
						flexShrink: !0,
						flexNegative: !0,
						flexOrder: !0,
						gridArea: !0,
						gridRow: !0,
						gridRowEnd: !0,
						gridRowSpan: !0,
						gridRowStart: !0,
						gridColumn: !0,
						gridColumnEnd: !0,
						gridColumnSpan: !0,
						gridColumnStart: !0,
						fontWeight: !0,
						lineClamp: !0,
						lineHeight: !0,
						opacity: !0,
						order: !0,
						orphans: !0,
						tabSize: !0,
						widows: !0,
						zIndex: !0,
						zoom: !0,
						fillOpacity: !0,
						floodOpacity: !0,
						stopOpacity: !0,
						strokeDasharray: !0,
						strokeDashoffset: !0,
						strokeMiterlimit: !0,
						strokeOpacity: !0,
						strokeWidth: !0
					},
					be = ["Webkit", "ms", "Moz", "O"];

				function we(e, t, n) {
					return null == t || "boolean" == typeof t || "" === t ? "" : n || "number" != typeof t || 0 === t || ye.hasOwnProperty(e) && ye[e] ? ("" + t).trim() : t + "px"
				}

				function xe(e, t) {
					for (var n in e = e.style, t)
						if (t.hasOwnProperty(n)) {
							var r = 0 === n.indexOf("--"),
								o = we(n, t[n], r);
							"float" === n && (n = "cssFloat"), r ? e.setProperty(n, o) : e[n] = o
						}
				}
				Object.keys(ye).forEach((function(e) {
					be.forEach((function(t) {
						t = t + e.charAt(0).toUpperCase() + e.substring(1), ye[t] = ye[e]
					}))
				}));
				var Me = o({
					menuitem: !0
				}, {
					area: !0,
					base: !0,
					br: !0,
					col: !0,
					embed: !0,
					hr: !0,
					img: !0,
					input: !0,
					keygen: !0,
					link: !0,
					meta: !0,
					param: !0,
					source: !0,
					track: !0,
					wbr: !0
				});

				function ze(e, t) {
					if (t) {
						if (Me[e] && (null != t.children || null != t.dangerouslySetInnerHTML)) throw Error(a(137, e));
						if (null != t.dangerouslySetInnerHTML) {
							if (null != t.children) throw Error(a(60));
							if ("object" != typeof t.dangerouslySetInnerHTML || !("__html" in t.dangerouslySetInnerHTML)) throw Error(a(61))
						}
						if (null != t.style && "object" != typeof t.style) throw Error(a(62))
					}
				}

				function Ee(e, t) {
					if (-1 === e.indexOf("-")) return "string" == typeof t.is;
					switch (e) {
						case "annotation-xml":
						case "color-profile":
						case "font-face":
						case "font-face-src":
						case "font-face-uri":
						case "font-face-format":
						case "font-face-name":
						case "missing-glyph":
							return !1;
						default:
							return !0
					}
				}

				function ke(e) {
					return (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e
				}
				var Ce = null,
					Se = null,
					Te = null;

				function Ne(e) {
					if (e = no(e)) {
						if ("function" != typeof Ce) throw Error(a(280));
						var t = e.stateNode;
						t && (t = oo(t), Ce(e.stateNode, e.type, t))
					}
				}

				function Pe(e) {
					Se ? Te ? Te.push(e) : Te = [e] : Se = e
				}

				function Ae() {
					if (Se) {
						var e = Se,
							t = Te;
						if (Te = Se = null, Ne(e), t)
							for (e = 0; e < t.length; e++) Ne(t[e])
					}
				}

				function _e(e, t) {
					return e(t)
				}

				function Oe(e, t, n, r, o) {
					return e(t, n, r, o)
				}

				function Le() {}
				var De = _e,
					Be = !1,
					Ie = !1;

				function He() {
					null === Se && null === Te || (Le(), Ae())
				}

				function Re(e, t) {
					var n = e.stateNode;
					if (null === n) return null;
					var r = oo(n);
					if (null === r) return null;
					n = r[t];
					e: switch (t) {
						case "onClick":
						case "onClickCapture":
						case "onDoubleClick":
						case "onDoubleClickCapture":
						case "onMouseDown":
						case "onMouseDownCapture":
						case "onMouseMove":
						case "onMouseMoveCapture":
						case "onMouseUp":
						case "onMouseUpCapture":
						case "onMouseEnter":
							(r = !r.disabled) || (r = !("button" === (e = e.type) || "input" === e || "select" === e || "textarea" === e)), e = !r;
							break e;
						default:
							e = !1
					}
					if (e) return null;
					if (n && "function" != typeof n) throw Error(a(231, t, typeof n));
					return n
				}
				var qe = !1;
				if (f) try {
					var je = {};
					Object.defineProperty(je, "passive", {
						get: function() {
							qe = !0
						}
					}), window.addEventListener("test", je, je), window.removeEventListener("test", je, je)
				} catch (ve) {
					qe = !1
				}

				function Ze(e, t, n, r, o, i, a, l, s) {
					var c = Array.prototype.slice.call(arguments, 3);
					try {
						t.apply(n, c)
					} catch (e) {
						this.onError(e)
					}
				}
				var Fe = !1,
					Ve = null,
					Qe = !1,
					Ue = null,
					Ke = {
						onError: function(e) {
							Fe = !0, Ve = e
						}
					};

				function We(e, t, n, r, o, i, a, l, s) {
					Fe = !1, Ve = null, Ze.apply(Ke, arguments)
				}

				function $e(e) {
					var t = e,
						n = e;
					if (e.alternate)
						for (; t.return;) t = t.return;
					else {
						e = t;
						do {
							0 != (1026 & (t = e).flags) && (n = t.return), e = t.return
						} while (e)
					}
					return 3 === t.tag ? n : null
				}

				function Ye(e) {
					if (13 === e.tag) {
						var t = e.memoizedState;
						if (null === t && null !== (e = e.alternate) && (t = e.memoizedState), null !== t) return t.dehydrated
					}
					return null
				}

				function Ge(e) {
					if ($e(e) !== e) throw Error(a(188))
				}

				function Xe(e) {
					if (e = function(e) {
							var t = e.alternate;
							if (!t) {
								if (null === (t = $e(e))) throw Error(a(188));
								return t !== e ? null : e
							}
							for (var n = e, r = t;;) {
								var o = n.return;
								if (null === o) break;
								var i = o.alternate;
								if (null === i) {
									if (null !== (r = o.return)) {
										n = r;
										continue
									}
									break
								}
								if (o.child === i.child) {
									for (i = o.child; i;) {
										if (i === n) return Ge(o), e;
										if (i === r) return Ge(o), t;
										i = i.sibling
									}
									throw Error(a(188))
								}
								if (n.return !== r.return) n = o, r = i;
								else {
									for (var l = !1, s = o.child; s;) {
										if (s === n) {
											l = !0, n = o, r = i;
											break
										}
										if (s === r) {
											l = !0, r = o, n = i;
											break
										}
										s = s.sibling
									}
									if (!l) {
										for (s = i.child; s;) {
											if (s === n) {
												l = !0, n = i, r = o;
												break
											}
											if (s === r) {
												l = !0, r = i, n = o;
												break
											}
											s = s.sibling
										}
										if (!l) throw Error(a(189))
									}
								}
								if (n.alternate !== r) throw Error(a(190))
							}
							if (3 !== n.tag) throw Error(a(188));
							return n.stateNode.current === n ? e : t
						}(e), !e) return null;
					for (var t = e;;) {
						if (5 === t.tag || 6 === t.tag) return t;
						if (t.child) t.child.return = t, t = t.child;
						else {
							if (t === e) break;
							for (; !t.sibling;) {
								if (!t.return || t.return === e) return null;
								t = t.return
							}
							t.sibling.return = t.return, t = t.sibling
						}
					}
					return null
				}

				function Je(e, t) {
					for (var n = e.alternate; null !== t;) {
						if (t === e || t === n) return !0;
						t = t.return
					}
					return !1
				}
				var et, tt, nt, rt, ot = !1,
					it = [],
					at = null,
					lt = null,
					st = null,
					ct = new Map,
					ut = new Map,
					ft = [],
					dt = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");

				function ht(e, t, n, r, o) {
					return {
						blockedOn: e,
						domEventName: t,
						eventSystemFlags: 16 | n,
						nativeEvent: o,
						targetContainers: [r]
					}
				}

				function pt(e, t) {
					switch (e) {
						case "focusin":
						case "focusout":
							at = null;
							break;
						case "dragenter":
						case "dragleave":
							lt = null;
							break;
						case "mouseover":
						case "mouseout":
							st = null;
							break;
						case "pointerover":
						case "pointerout":
							ct.delete(t.pointerId);
							break;
						case "gotpointercapture":
						case "lostpointercapture":
							ut.delete(t.pointerId)
					}
				}

				function vt(e, t, n, r, o, i) {
					return null === e || e.nativeEvent !== i ? (e = ht(t, n, r, o, i), null !== t && null !== (t = no(t)) && tt(t), e) : (e.eventSystemFlags |= r, t = e.targetContainers, null !== o && -1 === t.indexOf(o) && t.push(o), e)
				}

				function mt(e) {
					var t = to(e.target);
					if (null !== t) {
						var n = $e(t);
						if (null !== n)
							if (13 === (t = n.tag)) {
								if (null !== (t = Ye(n))) return e.blockedOn = t, void rt(e.lanePriority, (function() {
									i.unstable_runWithPriority(e.priority, (function() {
										nt(n)
									}))
								}))
							} else if (3 === t && n.stateNode.hydrate) return void(e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null)
					}
					e.blockedOn = null
				}

				function gt(e) {
					if (null !== e.blockedOn) return !1;
					for (var t = e.targetContainers; 0 < t.length;) {
						var n = Xt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
						if (null !== n) return null !== (t = no(n)) && tt(t), e.blockedOn = n, !1;
						t.shift()
					}
					return !0
				}

				function yt(e, t, n) {
					gt(e) && n.delete(t)
				}

				function bt() {
					for (ot = !1; 0 < it.length;) {
						var e = it[0];
						if (null !== e.blockedOn) {
							null !== (e = no(e.blockedOn)) && et(e);
							break
						}
						for (var t = e.targetContainers; 0 < t.length;) {
							var n = Xt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
							if (null !== n) {
								e.blockedOn = n;
								break
							}
							t.shift()
						}
						null === e.blockedOn && it.shift()
					}
					null !== at && gt(at) && (at = null), null !== lt && gt(lt) && (lt = null), null !== st && gt(st) && (st = null), ct.forEach(yt), ut.forEach(yt)
				}

				function wt(e, t) {
					e.blockedOn === t && (e.blockedOn = null, ot || (ot = !0, i.unstable_scheduleCallback(i.unstable_NormalPriority, bt)))
				}

				function xt(e) {
					function t(t) {
						return wt(t, e)
					}
					if (0 < it.length) {
						wt(it[0], e);
						for (var n = 1; n < it.length; n++) {
							var r = it[n];
							r.blockedOn === e && (r.blockedOn = null)
						}
					}
					for (null !== at && wt(at, e), null !== lt && wt(lt, e), null !== st && wt(st, e), ct.forEach(t), ut.forEach(t), n = 0; n < ft.length; n++)(r = ft[n]).blockedOn === e && (r.blockedOn = null);
					for (; 0 < ft.length && null === (n = ft[0]).blockedOn;) mt(n), null === n.blockedOn && ft.shift()
				}

				function Mt(e, t) {
					var n = {};
					return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n
				}
				var zt = {
						animationend: Mt("Animation", "AnimationEnd"),
						animationiteration: Mt("Animation", "AnimationIteration"),
						animationstart: Mt("Animation", "AnimationStart"),
						transitionend: Mt("Transition", "TransitionEnd")
					},
					Et = {},
					kt = {};

				function Ct(e) {
					if (Et[e]) return Et[e];
					if (!zt[e]) return e;
					var t, n = zt[e];
					for (t in n)
						if (n.hasOwnProperty(t) && t in kt) return Et[e] = n[t];
					return e
				}
				f && (kt = document.createElement("div").style, "AnimationEvent" in window || (delete zt.animationend.animation, delete zt.animationiteration.animation, delete zt.animationstart.animation), "TransitionEvent" in window || delete zt.transitionend.transition);
				var St = Ct("animationend"),
					Tt = Ct("animationiteration"),
					Nt = Ct("animationstart"),
					Pt = Ct("transitionend"),
					At = new Map,
					_t = new Map,
					Ot = ["abort", "abort", St, "animationEnd", Tt, "animationIteration", Nt, "animationStart", "canplay", "canPlay", "canplaythrough", "canPlayThrough", "durationchange", "durationChange", "emptied", "emptied", "encrypted", "encrypted", "ended", "ended", "error", "error", "gotpointercapture", "gotPointerCapture", "load", "load", "loadeddata", "loadedData", "loadedmetadata", "loadedMetadata", "loadstart", "loadStart", "lostpointercapture", "lostPointerCapture", "playing", "playing", "progress", "progress", "seeking", "seeking", "stalled", "stalled", "suspend", "suspend", "timeupdate", "timeUpdate", Pt, "transitionEnd", "waiting", "waiting"];

				function Lt(e, t) {
					for (var n = 0; n < e.length; n += 2) {
						var r = e[n],
							o = e[n + 1];
						o = "on" + (o[0].toUpperCase() + o.slice(1)), _t.set(r, t), At.set(r, o), c(o, [r])
					}
				}(0, i.unstable_now)();
				var Dt = 8;

				function Bt(e) {
					if (0 != (1 & e)) return Dt = 15, 1;
					if (0 != (2 & e)) return Dt = 14, 2;
					if (0 != (4 & e)) return Dt = 13, 4;
					var t = 24 & e;
					return 0 !== t ? (Dt = 12, t) : 0 != (32 & e) ? (Dt = 11, 32) : 0 != (t = 192 & e) ? (Dt = 10, t) : 0 != (256 & e) ? (Dt = 9, 256) : 0 != (t = 3584 & e) ? (Dt = 8, t) : 0 != (4096 & e) ? (Dt = 7, 4096) : 0 != (t = 4186112 & e) ? (Dt = 6, t) : 0 != (t = 62914560 & e) ? (Dt = 5, t) : 67108864 & e ? (Dt = 4, 67108864) : 0 != (134217728 & e) ? (Dt = 3, 134217728) : 0 != (t = 805306368 & e) ? (Dt = 2, t) : 0 != (1073741824 & e) ? (Dt = 1, 1073741824) : (Dt = 8, e)
				}

				function It(e, t) {
					var n = e.pendingLanes;
					if (0 === n) return Dt = 0;
					var r = 0,
						o = 0,
						i = e.expiredLanes,
						a = e.suspendedLanes,
						l = e.pingedLanes;
					if (0 !== i) r = i, o = Dt = 15;
					else if (0 != (i = 134217727 & n)) {
						var s = i & ~a;
						0 !== s ? (r = Bt(s), o = Dt) : 0 != (l &= i) && (r = Bt(l), o = Dt)
					} else 0 != (i = n & ~a) ? (r = Bt(i), o = Dt) : 0 !== l && (r = Bt(l), o = Dt);
					if (0 === r) return 0;
					if (r = n & ((0 > (r = 31 - Ft(r)) ? 0 : 1 << r) << 1) - 1, 0 !== t && t !== r && 0 == (t & a)) {
						if (Bt(t), o <= Dt) return t;
						Dt = o
					}
					if (0 !== (t = e.entangledLanes))
						for (e = e.entanglements, t &= r; 0 < t;) o = 1 << (n = 31 - Ft(t)), r |= e[n], t &= ~o;
					return r
				}

				function Ht(e) {
					return 0 != (e = -1073741825 & e.pendingLanes) ? e : 1073741824 & e ? 1073741824 : 0
				}

				function Rt(e, t) {
					switch (e) {
						case 15:
							return 1;
						case 14:
							return 2;
						case 12:
							return 0 === (e = qt(24 & ~t)) ? Rt(10, t) : e;
						case 10:
							return 0 === (e = qt(192 & ~t)) ? Rt(8, t) : e;
						case 8:
							return 0 === (e = qt(3584 & ~t)) && 0 === (e = qt(4186112 & ~t)) && (e = 512), e;
						case 2:
							return 0 === (t = qt(805306368 & ~t)) && (t = 268435456), t
					}
					throw Error(a(358, e))
				}

				function qt(e) {
					return e & -e
				}

				function jt(e) {
					for (var t = [], n = 0; 31 > n; n++) t.push(e);
					return t
				}

				function Zt(e, t, n) {
					e.pendingLanes |= t;
					var r = t - 1;
					e.suspendedLanes &= r, e.pingedLanes &= r, (e = e.eventTimes)[t = 31 - Ft(t)] = n
				}
				var Ft = Math.clz32 ? Math.clz32 : function(e) {
						return 0 === e ? 32 : 31 - (Vt(e) / Qt | 0) | 0
					},
					Vt = Math.log,
					Qt = Math.LN2,
					Ut = i.unstable_UserBlockingPriority,
					Kt = i.unstable_runWithPriority,
					Wt = !0;

				function $t(e, t, n, r) {
					Be || Le();
					var o = Gt,
						i = Be;
					Be = !0;
					try {
						Oe(o, e, t, n, r)
					} finally {
						(Be = i) || He()
					}
				}

				function Yt(e, t, n, r) {
					Kt(Ut, Gt.bind(null, e, t, n, r))
				}

				function Gt(e, t, n, r) {
					var o;
					if (Wt)
						if ((o = 0 == (4 & t)) && 0 < it.length && -1 < dt.indexOf(e)) e = ht(null, e, t, n, r), it.push(e);
						else {
							var i = Xt(e, t, n, r);
							if (null === i) o && pt(e, r);
							else {
								if (o) {
									if (-1 < dt.indexOf(e)) return e = ht(i, e, t, n, r), void it.push(e);
									if (function(e, t, n, r, o) {
											switch (t) {
												case "focusin":
													return at = vt(at, e, t, n, r, o), !0;
												case "dragenter":
													return lt = vt(lt, e, t, n, r, o), !0;
												case "mouseover":
													return st = vt(st, e, t, n, r, o), !0;
												case "pointerover":
													var i = o.pointerId;
													return ct.set(i, vt(ct.get(i) || null, e, t, n, r, o)), !0;
												case "gotpointercapture":
													return i = o.pointerId, ut.set(i, vt(ut.get(i) || null, e, t, n, r, o)), !0
											}
											return !1
										}(i, e, t, n, r)) return;
									pt(e, r)
								}
								Lr(e, t, r, null, n)
							}
						}
				}

				function Xt(e, t, n, r) {
					var o = ke(r);
					if (null !== (o = to(o))) {
						var i = $e(o);
						if (null === i) o = null;
						else {
							var a = i.tag;
							if (13 === a) {
								if (null !== (o = Ye(i))) return o;
								o = null
							} else if (3 === a) {
								if (i.stateNode.hydrate) return 3 === i.tag ? i.stateNode.containerInfo : null;
								o = null
							} else i !== o && (o = null)
						}
					}
					return Lr(e, t, r, o, n), null
				}
				var Jt = null,
					en = null,
					tn = null;

				function nn() {
					if (tn) return tn;
					var e, t, n = en,
						r = n.length,
						o = "value" in Jt ? Jt.value : Jt.textContent,
						i = o.length;
					for (e = 0; e < r && n[e] === o[e]; e++);
					var a = r - e;
					for (t = 1; t <= a && n[r - t] === o[i - t]; t++);
					return tn = o.slice(e, 1 < t ? 1 - t : void 0)
				}

				function rn(e) {
					var t = e.keyCode;
					return "charCode" in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : e = t, 10 === e && (e = 13), 32 <= e || 13 === e ? e : 0
				}

				function on() {
					return !0
				}

				function an() {
					return !1
				}

				function ln(e) {
					function t(t, n, r, o, i) {
						for (var a in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = o, this.target = i, this.currentTarget = null, e) e.hasOwnProperty(a) && (t = e[a], this[a] = t ? t(o) : o[a]);
						return this.isDefaultPrevented = (null != o.defaultPrevented ? o.defaultPrevented : !1 === o.returnValue) ? on : an, this.isPropagationStopped = an, this
					}
					return o(t.prototype, {
						preventDefault: function() {
							this.defaultPrevented = !0;
							var e = this.nativeEvent;
							e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1), this.isDefaultPrevented = on)
						},
						stopPropagation: function() {
							var e = this.nativeEvent;
							e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0), this.isPropagationStopped = on)
						},
						persist: function() {},
						isPersistent: on
					}), t
				}
				var sn, cn, un, fn = {
						eventPhase: 0,
						bubbles: 0,
						cancelable: 0,
						timeStamp: function(e) {
							return e.timeStamp || Date.now()
						},
						defaultPrevented: 0,
						isTrusted: 0
					},
					dn = ln(fn),
					hn = o({}, fn, {
						view: 0,
						detail: 0
					}),
					pn = ln(hn),
					vn = o({}, hn, {
						screenX: 0,
						screenY: 0,
						clientX: 0,
						clientY: 0,
						pageX: 0,
						pageY: 0,
						ctrlKey: 0,
						shiftKey: 0,
						altKey: 0,
						metaKey: 0,
						getModifierState: Sn,
						button: 0,
						buttons: 0,
						relatedTarget: function(e) {
							return void 0 === e.relatedTarget ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
						},
						movementX: function(e) {
							return "movementX" in e ? e.movementX : (e !== un && (un && "mousemove" === e.type ? (sn = e.screenX - un.screenX, cn = e.screenY - un.screenY) : cn = sn = 0, un = e), sn)
						},
						movementY: function(e) {
							return "movementY" in e ? e.movementY : cn
						}
					}),
					mn = ln(vn),
					gn = ln(o({}, vn, {
						dataTransfer: 0
					})),
					yn = ln(o({}, hn, {
						relatedTarget: 0
					})),
					bn = ln(o({}, fn, {
						animationName: 0,
						elapsedTime: 0,
						pseudoElement: 0
					})),
					wn = o({}, fn, {
						clipboardData: function(e) {
							return "clipboardData" in e ? e.clipboardData : window.clipboardData
						}
					}),
					xn = ln(wn),
					Mn = ln(o({}, fn, {
						data: 0
					})),
					zn = {
						Esc: "Escape",
						Spacebar: " ",
						Left: "ArrowLeft",
						Up: "ArrowUp",
						Right: "ArrowRight",
						Down: "ArrowDown",
						Del: "Delete",
						Win: "OS",
						Menu: "ContextMenu",
						Apps: "ContextMenu",
						Scroll: "ScrollLock",
						MozPrintableKey: "Unidentified"
					},
					En = {
						8: "Backspace",
						9: "Tab",
						12: "Clear",
						13: "Enter",
						16: "Shift",
						17: "Control",
						18: "Alt",
						19: "Pause",
						20: "CapsLock",
						27: "Escape",
						32: " ",
						33: "PageUp",
						34: "PageDown",
						35: "End",
						36: "Home",
						37: "ArrowLeft",
						38: "ArrowUp",
						39: "ArrowRight",
						40: "ArrowDown",
						45: "Insert",
						46: "Delete",
						112: "F1",
						113: "F2",
						114: "F3",
						115: "F4",
						116: "F5",
						117: "F6",
						118: "F7",
						119: "F8",
						120: "F9",
						121: "F10",
						122: "F11",
						123: "F12",
						144: "NumLock",
						145: "ScrollLock",
						224: "Meta"
					},
					kn = {
						Alt: "altKey",
						Control: "ctrlKey",
						Meta: "metaKey",
						Shift: "shiftKey"
					};

				function Cn(e) {
					var t = this.nativeEvent;
					return t.getModifierState ? t.getModifierState(e) : !!(e = kn[e]) && !!t[e]
				}

				function Sn() {
					return Cn
				}
				var Tn = o({}, hn, {
						key: function(e) {
							if (e.key) {
								var t = zn[e.key] || e.key;
								if ("Unidentified" !== t) return t
							}
							return "keypress" === e.type ? 13 === (e = rn(e)) ? "Enter" : String.fromCharCode(e) : "keydown" === e.type || "keyup" === e.type ? En[e.keyCode] || "Unidentified" : ""
						},
						code: 0,
						location: 0,
						ctrlKey: 0,
						shiftKey: 0,
						altKey: 0,
						metaKey: 0,
						repeat: 0,
						locale: 0,
						getModifierState: Sn,
						charCode: function(e) {
							return "keypress" === e.type ? rn(e) : 0
						},
						keyCode: function(e) {
							return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
						},
						which: function(e) {
							return "keypress" === e.type ? rn(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
						}
					}),
					Nn = ln(Tn),
					Pn = ln(o({}, vn, {
						pointerId: 0,
						width: 0,
						height: 0,
						pressure: 0,
						tangentialPressure: 0,
						tiltX: 0,
						tiltY: 0,
						twist: 0,
						pointerType: 0,
						isPrimary: 0
					})),
					An = ln(o({}, hn, {
						touches: 0,
						targetTouches: 0,
						changedTouches: 0,
						altKey: 0,
						metaKey: 0,
						ctrlKey: 0,
						shiftKey: 0,
						getModifierState: Sn
					})),
					_n = ln(o({}, fn, {
						propertyName: 0,
						elapsedTime: 0,
						pseudoElement: 0
					})),
					On = o({}, vn, {
						deltaX: function(e) {
							return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
						},
						deltaY: function(e) {
							return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
						},
						deltaZ: 0,
						deltaMode: 0
					}),
					Ln = ln(On),
					Dn = [9, 13, 27, 32],
					Bn = f && "CompositionEvent" in window,
					In = null;
				f && "documentMode" in document && (In = document.documentMode);
				var Hn = f && "TextEvent" in window && !In,
					Rn = f && (!Bn || In && 8 < In && 11 >= In),
					qn = String.fromCharCode(32),
					jn = !1;

				function Zn(e, t) {
					switch (e) {
						case "keyup":
							return -1 !== Dn.indexOf(t.keyCode);
						case "keydown":
							return 229 !== t.keyCode;
						case "keypress":
						case "mousedown":
						case "focusout":
							return !0;
						default:
							return !1
					}
				}

				function Fn(e) {
					return "object" == typeof(e = e.detail) && "data" in e ? e.data : null
				}
				var Vn = !1,
					Qn = {
						color: !0,
						date: !0,
						datetime: !0,
						"datetime-local": !0,
						email: !0,
						month: !0,
						number: !0,
						password: !0,
						range: !0,
						search: !0,
						tel: !0,
						text: !0,
						time: !0,
						url: !0,
						week: !0
					};

				function Un(e) {
					var t = e && e.nodeName && e.nodeName.toLowerCase();
					return "input" === t ? !!Qn[e.type] : "textarea" === t
				}

				function Kn(e, t, n, r) {
					Pe(r), 0 < (t = Br(t, "onChange")).length && (n = new dn("onChange", "change", null, n, r), e.push({
						event: n,
						listeners: t
					}))
				}
				var Wn = null,
					$n = null;

				function Yn(e) {
					Tr(e, 0)
				}

				function Gn(e) {
					if (G(ro(e))) return e
				}

				function Xn(e, t) {
					if ("change" === e) return t
				}
				var Jn = !1;
				if (f) {
					var er;
					if (f) {
						var tr = "oninput" in document;
						if (!tr) {
							var nr = document.createElement("div");
							nr.setAttribute("oninput", "return;"), tr = "function" == typeof nr.oninput
						}
						er = tr
					} else er = !1;
					Jn = er && (!document.documentMode || 9 < document.documentMode)
				}

				function rr() {
					Wn && (Wn.detachEvent("onpropertychange", or), $n = Wn = null)
				}

				function or(e) {
					if ("value" === e.propertyName && Gn($n)) {
						var t = [];
						if (Kn(t, $n, e, ke(e)), e = Yn, Be) e(t);
						else {
							Be = !0;
							try {
								_e(e, t)
							} finally {
								Be = !1, He()
							}
						}
					}
				}

				function ir(e, t, n) {
					"focusin" === e ? (rr(), $n = n, (Wn = t).attachEvent("onpropertychange", or)) : "focusout" === e && rr()
				}

				function ar(e) {
					if ("selectionchange" === e || "keyup" === e || "keydown" === e) return Gn($n)
				}

				function lr(e, t) {
					if ("click" === e) return Gn(t)
				}

				function sr(e, t) {
					if ("input" === e || "change" === e) return Gn(t)
				}
				var cr = "function" == typeof Object.is ? Object.is : function(e, t) {
						return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t
					},
					ur = Object.prototype.hasOwnProperty;

				function fr(e, t) {
					if (cr(e, t)) return !0;
					if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
					var n = Object.keys(e),
						r = Object.keys(t);
					if (n.length !== r.length) return !1;
					for (r = 0; r < n.length; r++)
						if (!ur.call(t, n[r]) || !cr(e[n[r]], t[n[r]])) return !1;
					return !0
				}

				function dr(e) {
					for (; e && e.firstChild;) e = e.firstChild;
					return e
				}

				function hr(e, t) {
					var n, r = dr(e);
					for (e = 0; r;) {
						if (3 === r.nodeType) {
							if (n = e + r.textContent.length, e <= t && n >= t) return {
								node: r,
								offset: t - e
							};
							e = n
						}
						e: {
							for (; r;) {
								if (r.nextSibling) {
									r = r.nextSibling;
									break e
								}
								r = r.parentNode
							}
							r = void 0
						}
						r = dr(r)
					}
				}

				function pr(e, t) {
					return !(!e || !t) && (e === t || (!e || 3 !== e.nodeType) && (t && 3 === t.nodeType ? pr(e, t.parentNode) : "contains" in e ? e.contains(t) : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t))))
				}

				function vr() {
					for (var e = window, t = X(); t instanceof e.HTMLIFrameElement;) {
						try {
							var n = "string" == typeof t.contentWindow.location.href
						} catch (e) {
							n = !1
						}
						if (!n) break;
						t = X((e = t.contentWindow).document)
					}
					return t
				}

				function mr(e) {
					var t = e && e.nodeName && e.nodeName.toLowerCase();
					return t && ("input" === t && ("text" === e.type || "search" === e.type || "tel" === e.type || "url" === e.type || "password" === e.type) || "textarea" === t || "true" === e.contentEditable)
				}
				var gr = f && "documentMode" in document && 11 >= document.documentMode,
					yr = null,
					br = null,
					wr = null,
					xr = !1;

				function Mr(e, t, n) {
					var r = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
					xr || null == yr || yr !== X(r) || (r = "selectionStart" in (r = yr) && mr(r) ? {
						start: r.selectionStart,
						end: r.selectionEnd
					} : {
						anchorNode: (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection()).anchorNode,
						anchorOffset: r.anchorOffset,
						focusNode: r.focusNode,
						focusOffset: r.focusOffset
					}, wr && fr(wr, r) || (wr = r, 0 < (r = Br(br, "onSelect")).length && (t = new dn("onSelect", "select", null, t, n), e.push({
						event: t,
						listeners: r
					}), t.target = yr)))
				}
				Lt("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0), Lt("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1), Lt(Ot, 2);
				for (var zr = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), Er = 0; Er < zr.length; Er++) _t.set(zr[Er], 0);
				u("onMouseEnter", ["mouseout", "mouseover"]), u("onMouseLeave", ["mouseout", "mouseover"]), u("onPointerEnter", ["pointerout", "pointerover"]), u("onPointerLeave", ["pointerout", "pointerover"]), c("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), c("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), c("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), c("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), c("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), c("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
				var kr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
					Cr = new Set("cancel close invalid load scroll toggle".split(" ").concat(kr));

				function Sr(e, t, n) {
					var r = e.type || "unknown-event";
					e.currentTarget = n,
						function(e, t, n, r, o, i, l, s, c) {
							if (We.apply(this, arguments), Fe) {
								if (!Fe) throw Error(a(198));
								var u = Ve;
								Fe = !1, Ve = null, Qe || (Qe = !0, Ue = u)
							}
						}(r, t, void 0, e), e.currentTarget = null
				}

				function Tr(e, t) {
					t = 0 != (4 & t);
					for (var n = 0; n < e.length; n++) {
						var r = e[n],
							o = r.event;
						r = r.listeners;
						e: {
							var i = void 0;
							if (t)
								for (var a = r.length - 1; 0 <= a; a--) {
									var l = r[a],
										s = l.instance,
										c = l.currentTarget;
									if (l = l.listener, s !== i && o.isPropagationStopped()) break e;
									Sr(o, l, c), i = s
								} else
									for (a = 0; a < r.length; a++) {
										if (s = (l = r[a]).instance, c = l.currentTarget, l = l.listener, s !== i && o.isPropagationStopped()) break e;
										Sr(o, l, c), i = s
									}
						}
					}
					if (Qe) throw e = Ue, Qe = !1, Ue = null, e
				}

				function Nr(e, t) {
					var n = io(t),
						r = e + "__bubble";
					n.has(r) || (Or(t, e, 2, !1), n.add(r))
				}
				var Pr = "_reactListening" + Math.random().toString(36).slice(2);

				function Ar(e) {
					e[Pr] || (e[Pr] = !0, l.forEach((function(t) {
						Cr.has(t) || _r(t, !1, e, null), _r(t, !0, e, null)
					})))
				}

				function _r(e, t, n, r) {
					var o = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0,
						i = n;
					if ("selectionchange" === e && 9 !== n.nodeType && (i = n.ownerDocument), null !== r && !t && Cr.has(e)) {
						if ("scroll" !== e) return;
						o |= 2, i = r
					}
					var a = io(i),
						l = e + "__" + (t ? "capture" : "bubble");
					a.has(l) || (t && (o |= 4), Or(i, e, o, t), a.add(l))
				}

				function Or(e, t, n, r) {
					var o = _t.get(t);
					switch (void 0 === o ? 2 : o) {
						case 0:
							o = $t;
							break;
						case 1:
							o = Yt;
							break;
						default:
							o = Gt
					}
					n = o.bind(null, t, n, e), o = void 0, !qe || "touchstart" !== t && "touchmove" !== t && "wheel" !== t || (o = !0), r ? void 0 !== o ? e.addEventListener(t, n, {
						capture: !0,
						passive: o
					}) : e.addEventListener(t, n, !0) : void 0 !== o ? e.addEventListener(t, n, {
						passive: o
					}) : e.addEventListener(t, n, !1)
				}

				function Lr(e, t, n, r, o) {
					var i = r;
					if (0 == (1 & t) && 0 == (2 & t) && null !== r) e: for (;;) {
						if (null === r) return;
						var a = r.tag;
						if (3 === a || 4 === a) {
							var l = r.stateNode.containerInfo;
							if (l === o || 8 === l.nodeType && l.parentNode === o) break;
							if (4 === a)
								for (a = r.return; null !== a;) {
									var s = a.tag;
									if ((3 === s || 4 === s) && ((s = a.stateNode.containerInfo) === o || 8 === s.nodeType && s.parentNode === o)) return;
									a = a.return
								}
							for (; null !== l;) {
								if (null === (a = to(l))) return;
								if (5 === (s = a.tag) || 6 === s) {
									r = i = a;
									continue e
								}
								l = l.parentNode
							}
						}
						r = r.return
					}! function(e, t, n) {
						if (Ie) return e();
						Ie = !0;
						try {
							De(e, t, n)
						} finally {
							Ie = !1, He()
						}
					}((function() {
						var r = i,
							o = ke(n),
							a = [];
						e: {
							var l = At.get(e);
							if (void 0 !== l) {
								var s = dn,
									c = e;
								switch (e) {
									case "keypress":
										if (0 === rn(n)) break e;
									case "keydown":
									case "keyup":
										s = Nn;
										break;
									case "focusin":
										c = "focus", s = yn;
										break;
									case "focusout":
										c = "blur", s = yn;
										break;
									case "beforeblur":
									case "afterblur":
										s = yn;
										break;
									case "click":
										if (2 === n.button) break e;
									case "auxclick":
									case "dblclick":
									case "mousedown":
									case "mousemove":
									case "mouseup":
									case "mouseout":
									case "mouseover":
									case "contextmenu":
										s = mn;
										break;
									case "drag":
									case "dragend":
									case "dragenter":
									case "dragexit":
									case "dragleave":
									case "dragover":
									case "dragstart":
									case "drop":
										s = gn;
										break;
									case "touchcancel":
									case "touchend":
									case "touchmove":
									case "touchstart":
										s = An;
										break;
									case St:
									case Tt:
									case Nt:
										s = bn;
										break;
									case Pt:
										s = _n;
										break;
									case "scroll":
										s = pn;
										break;
									case "wheel":
										s = Ln;
										break;
									case "copy":
									case "cut":
									case "paste":
										s = xn;
										break;
									case "gotpointercapture":
									case "lostpointercapture":
									case "pointercancel":
									case "pointerdown":
									case "pointermove":
									case "pointerout":
									case "pointerover":
									case "pointerup":
										s = Pn
								}
								var u = 0 != (4 & t),
									f = !u && "scroll" === e,
									d = u ? null !== l ? l + "Capture" : null : l;
								u = [];
								for (var h, p = r; null !== p;) {
									var v = (h = p).stateNode;
									if (5 === h.tag && null !== v && (h = v, null !== d && null != (v = Re(p, d)) && u.push(Dr(p, v, h))), f) break;
									p = p.return
								}
								0 < u.length && (l = new s(l, c, null, n, o), a.push({
									event: l,
									listeners: u
								}))
							}
						}
						if (0 == (7 & t)) {
							if (s = "mouseout" === e || "pointerout" === e, (!(l = "mouseover" === e || "pointerover" === e) || 0 != (16 & t) || !(c = n.relatedTarget || n.fromElement) || !to(c) && !c[Jr]) && (s || l) && (l = o.window === o ? o : (l = o.ownerDocument) ? l.defaultView || l.parentWindow : window, s ? (s = r, null !== (c = (c = n.relatedTarget || n.toElement) ? to(c) : null) && (c !== (f = $e(c)) || 5 !== c.tag && 6 !== c.tag) && (c = null)) : (s = null, c = r), s !== c)) {
								if (u = mn, v = "onMouseLeave", d = "onMouseEnter", p = "mouse", "pointerout" !== e && "pointerover" !== e || (u = Pn, v = "onPointerLeave", d = "onPointerEnter", p = "pointer"), f = null == s ? l : ro(s), h = null == c ? l : ro(c), (l = new u(v, p + "leave", s, n, o)).target = f, l.relatedTarget = h, v = null, to(o) === r && ((u = new u(d, p + "enter", c, n, o)).target = h, u.relatedTarget = f, v = u), f = v, s && c) e: {
									for (d = c, p = 0, h = u = s; h; h = Ir(h)) p++;
									for (h = 0, v = d; v; v = Ir(v)) h++;
									for (; 0 < p - h;) u = Ir(u),
									p--;
									for (; 0 < h - p;) d = Ir(d),
									h--;
									for (; p--;) {
										if (u === d || null !== d && u === d.alternate) break e;
										u = Ir(u), d = Ir(d)
									}
									u = null
								}
								else u = null;
								null !== s && Hr(a, l, s, u, !1), null !== c && null !== f && Hr(a, f, c, u, !0)
							}
							if ("select" === (s = (l = r ? ro(r) : window).nodeName && l.nodeName.toLowerCase()) || "input" === s && "file" === l.type) var m = Xn;
							else if (Un(l))
								if (Jn) m = sr;
								else {
									m = ar;
									var g = ir
								}
							else(s = l.nodeName) && "input" === s.toLowerCase() && ("checkbox" === l.type || "radio" === l.type) && (m = lr);
							switch (m && (m = m(e, r)) ? Kn(a, m, n, o) : (g && g(e, l, r), "focusout" === e && (g = l._wrapperState) && g.controlled && "number" === l.type && oe(l, "number", l.value)), g = r ? ro(r) : window, e) {
								case "focusin":
									(Un(g) || "true" === g.contentEditable) && (yr = g, br = r, wr = null);
									break;
								case "focusout":
									wr = br = yr = null;
									break;
								case "mousedown":
									xr = !0;
									break;
								case "contextmenu":
								case "mouseup":
								case "dragend":
									xr = !1, Mr(a, n, o);
									break;
								case "selectionchange":
									if (gr) break;
								case "keydown":
								case "keyup":
									Mr(a, n, o)
							}
							var y;
							if (Bn) e: {
								switch (e) {
									case "compositionstart":
										var b = "onCompositionStart";
										break e;
									case "compositionend":
										b = "onCompositionEnd";
										break e;
									case "compositionupdate":
										b = "onCompositionUpdate";
										break e
								}
								b = void 0
							}
							else Vn ? Zn(e, n) && (b = "onCompositionEnd") : "keydown" === e && 229 === n.keyCode && (b = "onCompositionStart");
							b && (Rn && "ko" !== n.locale && (Vn || "onCompositionStart" !== b ? "onCompositionEnd" === b && Vn && (y = nn()) : (en = "value" in (Jt = o) ? Jt.value : Jt.textContent, Vn = !0)), 0 < (g = Br(r, b)).length && (b = new Mn(b, e, null, n, o), a.push({
								event: b,
								listeners: g
							}), (y || null !== (y = Fn(n))) && (b.data = y))), (y = Hn ? function(e, t) {
								switch (e) {
									case "compositionend":
										return Fn(t);
									case "keypress":
										return 32 !== t.which ? null : (jn = !0, qn);
									case "textInput":
										return (e = t.data) === qn && jn ? null : e;
									default:
										return null
								}
							}(e, n) : function(e, t) {
								if (Vn) return "compositionend" === e || !Bn && Zn(e, t) ? (e = nn(), tn = en = Jt = null, Vn = !1, e) : null;
								switch (e) {
									case "paste":
									default:
										return null;
									case "keypress":
										if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
											if (t.char && 1 < t.char.length) return t.char;
											if (t.which) return String.fromCharCode(t.which)
										}
										return null;
									case "compositionend":
										return Rn && "ko" !== t.locale ? null : t.data
								}
							}(e, n)) && 0 < (r = Br(r, "onBeforeInput")).length && (o = new Mn("onBeforeInput", "beforeinput", null, n, o), a.push({
								event: o,
								listeners: r
							}), o.data = y)
						}
						Tr(a, t)
					}))
				}

				function Dr(e, t, n) {
					return {
						instance: e,
						listener: t,
						currentTarget: n
					}
				}

				function Br(e, t) {
					for (var n = t + "Capture", r = []; null !== e;) {
						var o = e,
							i = o.stateNode;
						5 === o.tag && null !== i && (o = i, null != (i = Re(e, n)) && r.unshift(Dr(e, i, o)), null != (i = Re(e, t)) && r.push(Dr(e, i, o))), e = e.return
					}
					return r
				}

				function Ir(e) {
					if (null === e) return null;
					do {
						e = e.return
					} while (e && 5 !== e.tag);
					return e || null
				}

				function Hr(e, t, n, r, o) {
					for (var i = t._reactName, a = []; null !== n && n !== r;) {
						var l = n,
							s = l.alternate,
							c = l.stateNode;
						if (null !== s && s === r) break;
						5 === l.tag && null !== c && (l = c, o ? null != (s = Re(n, i)) && a.unshift(Dr(n, s, l)) : o || null != (s = Re(n, i)) && a.push(Dr(n, s, l))), n = n.return
					}
					0 !== a.length && e.push({
						event: t,
						listeners: a
					})
				}

				function Rr() {}
				var qr = null,
					jr = null;

				function Zr(e, t) {
					switch (e) {
						case "button":
						case "input":
						case "select":
						case "textarea":
							return !!t.autoFocus
					}
					return !1
				}

				function Fr(e, t) {
					return "textarea" === e || "option" === e || "noscript" === e || "string" == typeof t.children || "number" == typeof t.children || "object" == typeof t.dangerouslySetInnerHTML && null !== t.dangerouslySetInnerHTML && null != t.dangerouslySetInnerHTML.__html
				}
				var Vr = "function" == typeof setTimeout ? setTimeout : void 0,
					Qr = "function" == typeof clearTimeout ? clearTimeout : void 0;

				function Ur(e) {
					(1 === e.nodeType || 9 === e.nodeType && null != (e = e.body)) && (e.textContent = "")
				}

				function Kr(e) {
					for (; null != e; e = e.nextSibling) {
						var t = e.nodeType;
						if (1 === t || 3 === t) break
					}
					return e
				}

				function Wr(e) {
					e = e.previousSibling;
					for (var t = 0; e;) {
						if (8 === e.nodeType) {
							var n = e.data;
							if ("$" === n || "$!" === n || "$?" === n) {
								if (0 === t) return e;
								t--
							} else "/$" === n && t++
						}
						e = e.previousSibling
					}
					return null
				}
				var $r = 0,
					Yr = Math.random().toString(36).slice(2),
					Gr = "__reactFiber$" + Yr,
					Xr = "__reactProps$" + Yr,
					Jr = "__reactContainer$" + Yr,
					eo = "__reactEvents$" + Yr;

				function to(e) {
					var t = e[Gr];
					if (t) return t;
					for (var n = e.parentNode; n;) {
						if (t = n[Jr] || n[Gr]) {
							if (n = t.alternate, null !== t.child || null !== n && null !== n.child)
								for (e = Wr(e); null !== e;) {
									if (n = e[Gr]) return n;
									e = Wr(e)
								}
							return t
						}
						n = (e = n).parentNode
					}
					return null
				}

				function no(e) {
					return !(e = e[Gr] || e[Jr]) || 5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag ? null : e
				}

				function ro(e) {
					if (5 === e.tag || 6 === e.tag) return e.stateNode;
					throw Error(a(33))
				}

				function oo(e) {
					return e[Xr] || null
				}

				function io(e) {
					var t = e[eo];
					return void 0 === t && (t = e[eo] = new Set), t
				}
				var ao = [],
					lo = -1;

				function so(e) {
					return {
						current: e
					}
				}

				function co(e) {
					0 > lo || (e.current = ao[lo], ao[lo] = null, lo--)
				}

				function uo(e, t) {
					lo++, ao[lo] = e.current, e.current = t
				}
				var fo = {},
					ho = so(fo),
					po = so(!1),
					vo = fo;

				function mo(e, t) {
					var n = e.type.contextTypes;
					if (!n) return fo;
					var r = e.stateNode;
					if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
					var o, i = {};
					for (o in n) i[o] = t[o];
					return r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i
				}

				function go(e) {
					return null != e.childContextTypes
				}

				function yo() {
					co(po), co(ho)
				}

				function bo(e, t, n) {
					if (ho.current !== fo) throw Error(a(168));
					uo(ho, t), uo(po, n)
				}

				function wo(e, t, n) {
					var r = e.stateNode;
					if (e = t.childContextTypes, "function" != typeof r.getChildContext) return n;
					for (var i in r = r.getChildContext())
						if (!(i in e)) throw Error(a(108, K(t) || "Unknown", i));
					return o({}, n, r)
				}

				function xo(e) {
					return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || fo, vo = ho.current, uo(ho, e), uo(po, po.current), !0
				}

				function Mo(e, t, n) {
					var r = e.stateNode;
					if (!r) throw Error(a(169));
					n ? (e = wo(e, t, vo), r.__reactInternalMemoizedMergedChildContext = e, co(po), co(ho), uo(ho, e)) : co(po), uo(po, n)
				}
				var zo = null,
					Eo = null,
					ko = i.unstable_runWithPriority,
					Co = i.unstable_scheduleCallback,
					So = i.unstable_cancelCallback,
					To = i.unstable_shouldYield,
					No = i.unstable_requestPaint,
					Po = i.unstable_now,
					Ao = i.unstable_getCurrentPriorityLevel,
					_o = i.unstable_ImmediatePriority,
					Oo = i.unstable_UserBlockingPriority,
					Lo = i.unstable_NormalPriority,
					Do = i.unstable_LowPriority,
					Bo = i.unstable_IdlePriority,
					Io = {},
					Ho = void 0 !== No ? No : function() {},
					Ro = null,
					qo = null,
					jo = !1,
					Zo = Po(),
					Fo = 1e4 > Zo ? Po : function() {
						return Po() - Zo
					};

				function Vo() {
					switch (Ao()) {
						case _o:
							return 99;
						case Oo:
							return 98;
						case Lo:
							return 97;
						case Do:
							return 96;
						case Bo:
							return 95;
						default:
							throw Error(a(332))
					}
				}

				function Qo(e) {
					switch (e) {
						case 99:
							return _o;
						case 98:
							return Oo;
						case 97:
							return Lo;
						case 96:
							return Do;
						case 95:
							return Bo;
						default:
							throw Error(a(332))
					}
				}

				function Uo(e, t) {
					return e = Qo(e), ko(e, t)
				}

				function Ko(e, t, n) {
					return e = Qo(e), Co(e, t, n)
				}

				function Wo() {
					if (null !== qo) {
						var e = qo;
						qo = null, So(e)
					}
					$o()
				}

				function $o() {
					if (!jo && null !== Ro) {
						jo = !0;
						var e = 0;
						try {
							var t = Ro;
							Uo(99, (function() {
								for (; e < t.length; e++) {
									var n = t[e];
									do {
										n = n(!0)
									} while (null !== n)
								}
							})), Ro = null
						} catch (t) {
							throw null !== Ro && (Ro = Ro.slice(e + 1)), Co(_o, Wo), t
						} finally {
							jo = !1
						}
					}
				}
				var Yo = x.ReactCurrentBatchConfig;

				function Go(e, t) {
					if (e && e.defaultProps) {
						for (var n in t = o({}, t), e = e.defaultProps) void 0 === t[n] && (t[n] = e[n]);
						return t
					}
					return t
				}
				var Xo = so(null),
					Jo = null,
					ei = null,
					ti = null;

				function ni() {
					ti = ei = Jo = null
				}

				function ri(e) {
					var t = Xo.current;
					co(Xo), e.type._context._currentValue = t
				}

				function oi(e, t) {
					for (; null !== e;) {
						var n = e.alternate;
						if ((e.childLanes & t) === t) {
							if (null === n || (n.childLanes & t) === t) break;
							n.childLanes |= t
						} else e.childLanes |= t, null !== n && (n.childLanes |= t);
						e = e.return
					}
				}

				function ii(e, t) {
					Jo = e, ti = ei = null, null !== (e = e.dependencies) && null !== e.firstContext && (0 != (e.lanes & t) && (Ba = !0), e.firstContext = null)
				}

				function ai(e, t) {
					if (ti !== e && !1 !== t && 0 !== t)
						if ("number" == typeof t && 1073741823 !== t || (ti = e, t = 1073741823), t = {
								context: e,
								observedBits: t,
								next: null
							}, null === ei) {
							if (null === Jo) throw Error(a(308));
							ei = t, Jo.dependencies = {
								lanes: 0,
								firstContext: t,
								responders: null
							}
						} else ei = ei.next = t;
					return e._currentValue
				}
				var li = !1;

				function si(e) {
					e.updateQueue = {
						baseState: e.memoizedState,
						firstBaseUpdate: null,
						lastBaseUpdate: null,
						shared: {
							pending: null
						},
						effects: null
					}
				}

				function ci(e, t) {
					e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
						baseState: e.baseState,
						firstBaseUpdate: e.firstBaseUpdate,
						lastBaseUpdate: e.lastBaseUpdate,
						shared: e.shared,
						effects: e.effects
					})
				}

				function ui(e, t) {
					return {
						eventTime: e,
						lane: t,
						tag: 0,
						payload: null,
						callback: null,
						next: null
					}
				}

				function fi(e, t) {
					if (null !== (e = e.updateQueue)) {
						var n = (e = e.shared).pending;
						null === n ? t.next = t : (t.next = n.next, n.next = t), e.pending = t
					}
				}

				function di(e, t) {
					var n = e.updateQueue,
						r = e.alternate;
					if (null !== r && n === (r = r.updateQueue)) {
						var o = null,
							i = null;
						if (null !== (n = n.firstBaseUpdate)) {
							do {
								var a = {
									eventTime: n.eventTime,
									lane: n.lane,
									tag: n.tag,
									payload: n.payload,
									callback: n.callback,
									next: null
								};
								null === i ? o = i = a : i = i.next = a, n = n.next
							} while (null !== n);
							null === i ? o = i = t : i = i.next = t
						} else o = i = t;
						return n = {
							baseState: r.baseState,
							firstBaseUpdate: o,
							lastBaseUpdate: i,
							shared: r.shared,
							effects: r.effects
						}, void(e.updateQueue = n)
					}
					null === (e = n.lastBaseUpdate) ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t
				}

				function hi(e, t, n, r) {
					var i = e.updateQueue;
					li = !1;
					var a = i.firstBaseUpdate,
						l = i.lastBaseUpdate,
						s = i.shared.pending;
					if (null !== s) {
						i.shared.pending = null;
						var c = s,
							u = c.next;
						c.next = null, null === l ? a = u : l.next = u, l = c;
						var f = e.alternate;
						if (null !== f) {
							var d = (f = f.updateQueue).lastBaseUpdate;
							d !== l && (null === d ? f.firstBaseUpdate = u : d.next = u, f.lastBaseUpdate = c)
						}
					}
					if (null !== a) {
						for (d = i.baseState, l = 0, f = u = c = null;;) {
							s = a.lane;
							var h = a.eventTime;
							if ((r & s) === s) {
								null !== f && (f = f.next = {
									eventTime: h,
									lane: 0,
									tag: a.tag,
									payload: a.payload,
									callback: a.callback,
									next: null
								});
								e: {
									var p = e,
										v = a;
									switch (s = t, h = n, v.tag) {
										case 1:
											if ("function" == typeof(p = v.payload)) {
												d = p.call(h, d, s);
												break e
											}
											d = p;
											break e;
										case 3:
											p.flags = -4097 & p.flags | 64;
										case 0:
											if (null == (s = "function" == typeof(p = v.payload) ? p.call(h, d, s) : p)) break e;
											d = o({}, d, s);
											break e;
										case 2:
											li = !0
									}
								}
								null !== a.callback && (e.flags |= 32, null === (s = i.effects) ? i.effects = [a] : s.push(a))
							} else h = {
								eventTime: h,
								lane: s,
								tag: a.tag,
								payload: a.payload,
								callback: a.callback,
								next: null
							}, null === f ? (u = f = h, c = d) : f = f.next = h, l |= s;
							if (null === (a = a.next)) {
								if (null === (s = i.shared.pending)) break;
								a = s.next, s.next = null, i.lastBaseUpdate = s, i.shared.pending = null
							}
						}
						null === f && (c = d), i.baseState = c, i.firstBaseUpdate = u, i.lastBaseUpdate = f, Hl |= l, e.lanes = l, e.memoizedState = d
					}
				}

				function pi(e, t, n) {
					if (e = t.effects, t.effects = null, null !== e)
						for (t = 0; t < e.length; t++) {
							var r = e[t],
								o = r.callback;
							if (null !== o) {
								if (r.callback = null, r = n, "function" != typeof o) throw Error(a(191, o));
								o.call(r)
							}
						}
				}
				var vi = (new r.Component).refs;

				function mi(e, t, n, r) {
					n = null == (n = n(r, t = e.memoizedState)) ? t : o({}, t, n), e.memoizedState = n, 0 === e.lanes && (e.updateQueue.baseState = n)
				}
				var gi = {
					isMounted: function(e) {
						return !!(e = e._reactInternals) && $e(e) === e
					},
					enqueueSetState: function(e, t, n) {
						e = e._reactInternals;
						var r = cs(),
							o = us(e),
							i = ui(r, o);
						i.payload = t, null != n && (i.callback = n), fi(e, i), fs(e, o, r)
					},
					enqueueReplaceState: function(e, t, n) {
						e = e._reactInternals;
						var r = cs(),
							o = us(e),
							i = ui(r, o);
						i.tag = 1, i.payload = t, null != n && (i.callback = n), fi(e, i), fs(e, o, r)
					},
					enqueueForceUpdate: function(e, t) {
						e = e._reactInternals;
						var n = cs(),
							r = us(e),
							o = ui(n, r);
						o.tag = 2, null != t && (o.callback = t), fi(e, o), fs(e, r, n)
					}
				};

				function yi(e, t, n, r, o, i, a) {
					return "function" == typeof(e = e.stateNode).shouldComponentUpdate ? e.shouldComponentUpdate(r, i, a) : !(t.prototype && t.prototype.isPureReactComponent && fr(n, r) && fr(o, i))
				}

				function bi(e, t, n) {
					var r = !1,
						o = fo,
						i = t.contextType;
					return "object" == typeof i && null !== i ? i = ai(i) : (o = go(t) ? vo : ho.current, i = (r = null != (r = t.contextTypes)) ? mo(e, o) : fo), t = new t(n, i), e.memoizedState = null !== t.state && void 0 !== t.state ? t.state : null, t.updater = gi, e.stateNode = t, t._reactInternals = e, r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = o, e.__reactInternalMemoizedMaskedChildContext = i), t
				}

				function wi(e, t, n, r) {
					e = t.state, "function" == typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r), "function" == typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && gi.enqueueReplaceState(t, t.state, null)
				}

				function xi(e, t, n, r) {
					var o = e.stateNode;
					o.props = n, o.state = e.memoizedState, o.refs = vi, si(e);
					var i = t.contextType;
					"object" == typeof i && null !== i ? o.context = ai(i) : (i = go(t) ? vo : ho.current, o.context = mo(e, i)), hi(e, n, o, r), o.state = e.memoizedState, "function" == typeof(i = t.getDerivedStateFromProps) && (mi(e, t, i, n), o.state = e.memoizedState), "function" == typeof t.getDerivedStateFromProps || "function" == typeof o.getSnapshotBeforeUpdate || "function" != typeof o.UNSAFE_componentWillMount && "function" != typeof o.componentWillMount || (t = o.state, "function" == typeof o.componentWillMount && o.componentWillMount(), "function" == typeof o.UNSAFE_componentWillMount && o.UNSAFE_componentWillMount(), t !== o.state && gi.enqueueReplaceState(o, o.state, null), hi(e, n, o, r), o.state = e.memoizedState), "function" == typeof o.componentDidMount && (e.flags |= 4)
				}
				var Mi = Array.isArray;

				function zi(e, t, n) {
					if (null !== (e = n.ref) && "function" != typeof e && "object" != typeof e) {
						if (n._owner) {
							if (n = n._owner) {
								if (1 !== n.tag) throw Error(a(309));
								var r = n.stateNode
							}
							if (!r) throw Error(a(147, e));
							var o = "" + e;
							return null !== t && null !== t.ref && "function" == typeof t.ref && t.ref._stringRef === o ? t.ref : (t = function(e) {
								var t = r.refs;
								t === vi && (t = r.refs = {}), null === e ? delete t[o] : t[o] = e
							}, t._stringRef = o, t)
						}
						if ("string" != typeof e) throw Error(a(284));
						if (!n._owner) throw Error(a(290, e))
					}
					return e
				}

				function Ei(e, t) {
					if ("textarea" !== e.type) throw Error(a(31, "[object Object]" === Object.prototype.toString.call(t) ? "object with keys {" + Object.keys(t).join(", ") + "}" : t))
				}

				function ki(e) {
					function t(t, n) {
						if (e) {
							var r = t.lastEffect;
							null !== r ? (r.nextEffect = n, t.lastEffect = n) : t.firstEffect = t.lastEffect = n, n.nextEffect = null, n.flags = 8
						}
					}

					function n(n, r) {
						if (!e) return null;
						for (; null !== r;) t(n, r), r = r.sibling;
						return null
					}

					function r(e, t) {
						for (e = new Map; null !== t;) null !== t.key ? e.set(t.key, t) : e.set(t.index, t), t = t.sibling;
						return e
					}

					function o(e, t) {
						return (e = Fs(e, t)).index = 0, e.sibling = null, e
					}

					function i(t, n, r) {
						return t.index = r, e ? null !== (r = t.alternate) ? (r = r.index) < n ? (t.flags = 2, n) : r : (t.flags = 2, n) : n
					}

					function l(t) {
						return e && null === t.alternate && (t.flags = 2), t
					}

					function s(e, t, n, r) {
						return null === t || 6 !== t.tag ? ((t = Ks(n, e.mode, r)).return = e, t) : ((t = o(t, n)).return = e, t)
					}

					function c(e, t, n, r) {
						return null !== t && t.elementType === n.type ? ((r = o(t, n.props)).ref = zi(e, t, n), r.return = e, r) : ((r = Vs(n.type, n.key, n.props, null, e.mode, r)).ref = zi(e, t, n), r.return = e, r)
					}

					function u(e, t, n, r) {
						return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? ((t = Ws(n, e.mode, r)).return = e, t) : ((t = o(t, n.children || [])).return = e, t)
					}

					function f(e, t, n, r, i) {
						return null === t || 7 !== t.tag ? ((t = Qs(n, e.mode, r, i)).return = e, t) : ((t = o(t, n)).return = e, t)
					}

					function d(e, t, n) {
						if ("string" == typeof t || "number" == typeof t) return (t = Ks("" + t, e.mode, n)).return = e, t;
						if ("object" == typeof t && null !== t) {
							switch (t.$$typeof) {
								case M:
									return (n = Vs(t.type, t.key, t.props, null, e.mode, n)).ref = zi(e, null, t), n.return = e, n;
								case z:
									return (t = Ws(t, e.mode, n)).return = e, t
							}
							if (Mi(t) || Z(t)) return (t = Qs(t, e.mode, n, null)).return = e, t;
							Ei(e, t)
						}
						return null
					}

					function h(e, t, n, r) {
						var o = null !== t ? t.key : null;
						if ("string" == typeof n || "number" == typeof n) return null !== o ? null : s(e, t, "" + n, r);
						if ("object" == typeof n && null !== n) {
							switch (n.$$typeof) {
								case M:
									return n.key === o ? n.type === E ? f(e, t, n.props.children, r, o) : c(e, t, n, r) : null;
								case z:
									return n.key === o ? u(e, t, n, r) : null
							}
							if (Mi(n) || Z(n)) return null !== o ? null : f(e, t, n, r, null);
							Ei(e, n)
						}
						return null
					}

					function p(e, t, n, r, o) {
						if ("string" == typeof r || "number" == typeof r) return s(t, e = e.get(n) || null, "" + r, o);
						if ("object" == typeof r && null !== r) {
							switch (r.$$typeof) {
								case M:
									return e = e.get(null === r.key ? n : r.key) || null, r.type === E ? f(t, e, r.props.children, o, r.key) : c(t, e, r, o);
								case z:
									return u(t, e = e.get(null === r.key ? n : r.key) || null, r, o)
							}
							if (Mi(r) || Z(r)) return f(t, e = e.get(n) || null, r, o, null);
							Ei(t, r)
						}
						return null
					}

					function v(o, a, l, s) {
						for (var c = null, u = null, f = a, v = a = 0, m = null; null !== f && v < l.length; v++) {
							f.index > v ? (m = f, f = null) : m = f.sibling;
							var g = h(o, f, l[v], s);
							if (null === g) {
								null === f && (f = m);
								break
							}
							e && f && null === g.alternate && t(o, f), a = i(g, a, v), null === u ? c = g : u.sibling = g, u = g, f = m
						}
						if (v === l.length) return n(o, f), c;
						if (null === f) {
							for (; v < l.length; v++) null !== (f = d(o, l[v], s)) && (a = i(f, a, v), null === u ? c = f : u.sibling = f, u = f);
							return c
						}
						for (f = r(o, f); v < l.length; v++) null !== (m = p(f, o, v, l[v], s)) && (e && null !== m.alternate && f.delete(null === m.key ? v : m.key), a = i(m, a, v), null === u ? c = m : u.sibling = m, u = m);
						return e && f.forEach((function(e) {
							return t(o, e)
						})), c
					}

					function m(o, l, s, c) {
						var u = Z(s);
						if ("function" != typeof u) throw Error(a(150));
						if (null == (s = u.call(s))) throw Error(a(151));
						for (var f = u = null, v = l, m = l = 0, g = null, y = s.next(); null !== v && !y.done; m++, y = s.next()) {
							v.index > m ? (g = v, v = null) : g = v.sibling;
							var b = h(o, v, y.value, c);
							if (null === b) {
								null === v && (v = g);
								break
							}
							e && v && null === b.alternate && t(o, v), l = i(b, l, m), null === f ? u = b : f.sibling = b, f = b, v = g
						}
						if (y.done) return n(o, v), u;
						if (null === v) {
							for (; !y.done; m++, y = s.next()) null !== (y = d(o, y.value, c)) && (l = i(y, l, m), null === f ? u = y : f.sibling = y, f = y);
							return u
						}
						for (v = r(o, v); !y.done; m++, y = s.next()) null !== (y = p(v, o, m, y.value, c)) && (e && null !== y.alternate && v.delete(null === y.key ? m : y.key), l = i(y, l, m), null === f ? u = y : f.sibling = y, f = y);
						return e && v.forEach((function(e) {
							return t(o, e)
						})), u
					}
					return function(e, r, i, s) {
						var c = "object" == typeof i && null !== i && i.type === E && null === i.key;
						c && (i = i.props.children);
						var u = "object" == typeof i && null !== i;
						if (u) switch (i.$$typeof) {
							case M:
								e: {
									for (u = i.key, c = r; null !== c;) {
										if (c.key === u) {
											if (7 === c.tag) {
												if (i.type === E) {
													n(e, c.sibling), (r = o(c, i.props.children)).return = e, e = r;
													break e
												}
											} else if (c.elementType === i.type) {
												n(e, c.sibling), (r = o(c, i.props)).ref = zi(e, c, i), r.return = e, e = r;
												break e
											}
											n(e, c);
											break
										}
										t(e, c), c = c.sibling
									}
									i.type === E ? ((r = Qs(i.props.children, e.mode, s, i.key)).return = e, e = r) : ((s = Vs(i.type, i.key, i.props, null, e.mode, s)).ref = zi(e, r, i), s.return = e, e = s)
								}
								return l(e);
							case z:
								e: {
									for (c = i.key; null !== r;) {
										if (r.key === c) {
											if (4 === r.tag && r.stateNode.containerInfo === i.containerInfo && r.stateNode.implementation === i.implementation) {
												n(e, r.sibling), (r = o(r, i.children || [])).return = e, e = r;
												break e
											}
											n(e, r);
											break
										}
										t(e, r), r = r.sibling
									}(r = Ws(i, e.mode, s)).return = e,
									e = r
								}
								return l(e)
						}
						if ("string" == typeof i || "number" == typeof i) return i = "" + i, null !== r && 6 === r.tag ? (n(e, r.sibling), (r = o(r, i)).return = e, e = r) : (n(e, r), (r = Ks(i, e.mode, s)).return = e, e = r), l(e);
						if (Mi(i)) return v(e, r, i, s);
						if (Z(i)) return m(e, r, i, s);
						if (u && Ei(e, i), void 0 === i && !c) switch (e.tag) {
							case 1:
							case 22:
							case 0:
							case 11:
							case 15:
								throw Error(a(152, K(e.type) || "Component"))
						}
						return n(e, r)
					}
				}
				var Ci = ki(!0),
					Si = ki(!1),
					Ti = {},
					Ni = so(Ti),
					Pi = so(Ti),
					Ai = so(Ti);

				function _i(e) {
					if (e === Ti) throw Error(a(174));
					return e
				}

				function Oi(e, t) {
					switch (uo(Ai, t), uo(Pi, e), uo(Ni, Ti), e = t.nodeType) {
						case 9:
						case 11:
							t = (t = t.documentElement) ? t.namespaceURI : he(null, "");
							break;
						default:
							t = he(t = (e = 8 === e ? t.parentNode : t).namespaceURI || null, e = e.tagName)
					}
					co(Ni), uo(Ni, t)
				}

				function Li() {
					co(Ni), co(Pi), co(Ai)
				}

				function Di(e) {
					_i(Ai.current);
					var t = _i(Ni.current),
						n = he(t, e.type);
					t !== n && (uo(Pi, e), uo(Ni, n))
				}

				function Bi(e) {
					Pi.current === e && (co(Ni), co(Pi))
				}
				var Ii = so(0);

				function Hi(e) {
					for (var t = e; null !== t;) {
						if (13 === t.tag) {
							var n = t.memoizedState;
							if (null !== n && (null === (n = n.dehydrated) || "$?" === n.data || "$!" === n.data)) return t
						} else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
							if (0 != (64 & t.flags)) return t
						} else if (null !== t.child) {
							t.child.return = t, t = t.child;
							continue
						}
						if (t === e) break;
						for (; null === t.sibling;) {
							if (null === t.return || t.return === e) return null;
							t = t.return
						}
						t.sibling.return = t.return, t = t.sibling
					}
					return null
				}
				var Ri = null,
					qi = null,
					ji = !1;

				function Zi(e, t) {
					var n = js(5, null, null, 0);
					n.elementType = "DELETED", n.type = "DELETED", n.stateNode = t, n.return = e, n.flags = 8, null !== e.lastEffect ? (e.lastEffect.nextEffect = n, e.lastEffect = n) : e.firstEffect = e.lastEffect = n
				}

				function Fi(e, t) {
					switch (e.tag) {
						case 5:
							var n = e.type;
							return null !== (t = 1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t) && (e.stateNode = t, !0);
						case 6:
							return null !== (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) && (e.stateNode = t, !0);
						default:
							return !1
					}
				}

				function Vi(e) {
					if (ji) {
						var t = qi;
						if (t) {
							var n = t;
							if (!Fi(e, t)) {
								if (!(t = Kr(n.nextSibling)) || !Fi(e, t)) return e.flags = -1025 & e.flags | 2, ji = !1, void(Ri = e);
								Zi(Ri, n)
							}
							Ri = e, qi = Kr(t.firstChild)
						} else e.flags = -1025 & e.flags | 2, ji = !1, Ri = e
					}
				}

				function Qi(e) {
					for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;) e = e.return;
					Ri = e
				}

				function Ui(e) {
					if (e !== Ri) return !1;
					if (!ji) return Qi(e), ji = !0, !1;
					var t = e.type;
					if (5 !== e.tag || "head" !== t && "body" !== t && !Fr(t, e.memoizedProps))
						for (t = qi; t;) Zi(e, t), t = Kr(t.nextSibling);
					if (Qi(e), 13 === e.tag) {
						if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(a(317));
						e: {
							for (e = e.nextSibling, t = 0; e;) {
								if (8 === e.nodeType) {
									var n = e.data;
									if ("/$" === n) {
										if (0 === t) {
											qi = Kr(e.nextSibling);
											break e
										}
										t--
									} else "$" !== n && "$!" !== n && "$?" !== n || t++
								}
								e = e.nextSibling
							}
							qi = null
						}
					} else qi = Ri ? Kr(e.stateNode.nextSibling) : null;
					return !0
				}

				function Ki() {
					qi = Ri = null, ji = !1
				}
				var Wi = [];

				function $i() {
					for (var e = 0; e < Wi.length; e++) Wi[e]._workInProgressVersionPrimary = null;
					Wi.length = 0
				}
				var Yi = x.ReactCurrentDispatcher,
					Gi = x.ReactCurrentBatchConfig,
					Xi = 0,
					Ji = null,
					ea = null,
					ta = null,
					na = !1,
					ra = !1;

				function oa() {
					throw Error(a(321))
				}

				function ia(e, t) {
					if (null === t) return !1;
					for (var n = 0; n < t.length && n < e.length; n++)
						if (!cr(e[n], t[n])) return !1;
					return !0
				}

				function aa(e, t, n, r, o, i) {
					if (Xi = i, Ji = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Yi.current = null === e || null === e.memoizedState ? _a : Oa, e = n(r, o), ra) {
						i = 0;
						do {
							if (ra = !1, !(25 > i)) throw Error(a(301));
							i += 1, ta = ea = null, t.updateQueue = null, Yi.current = La, e = n(r, o)
						} while (ra)
					}
					if (Yi.current = Aa, t = null !== ea && null !== ea.next, Xi = 0, ta = ea = Ji = null, na = !1, t) throw Error(a(300));
					return e
				}

				function la() {
					var e = {
						memoizedState: null,
						baseState: null,
						baseQueue: null,
						queue: null,
						next: null
					};
					return null === ta ? Ji.memoizedState = ta = e : ta = ta.next = e, ta
				}

				function sa() {
					if (null === ea) {
						var e = Ji.alternate;
						e = null !== e ? e.memoizedState : null
					} else e = ea.next;
					var t = null === ta ? Ji.memoizedState : ta.next;
					if (null !== t) ta = t, ea = e;
					else {
						if (null === e) throw Error(a(310));
						e = {
							memoizedState: (ea = e).memoizedState,
							baseState: ea.baseState,
							baseQueue: ea.baseQueue,
							queue: ea.queue,
							next: null
						}, null === ta ? Ji.memoizedState = ta = e : ta = ta.next = e
					}
					return ta
				}

				function ca(e, t) {
					return "function" == typeof t ? t(e) : t
				}

				function ua(e) {
					var t = sa(),
						n = t.queue;
					if (null === n) throw Error(a(311));
					n.lastRenderedReducer = e;
					var r = ea,
						o = r.baseQueue,
						i = n.pending;
					if (null !== i) {
						if (null !== o) {
							var l = o.next;
							o.next = i.next, i.next = l
						}
						r.baseQueue = o = i, n.pending = null
					}
					if (null !== o) {
						o = o.next, r = r.baseState;
						var s = l = i = null,
							c = o;
						do {
							var u = c.lane;
							if ((Xi & u) === u) null !== s && (s = s.next = {
								lane: 0,
								action: c.action,
								eagerReducer: c.eagerReducer,
								eagerState: c.eagerState,
								next: null
							}), r = c.eagerReducer === e ? c.eagerState : e(r, c.action);
							else {
								var f = {
									lane: u,
									action: c.action,
									eagerReducer: c.eagerReducer,
									eagerState: c.eagerState,
									next: null
								};
								null === s ? (l = s = f, i = r) : s = s.next = f, Ji.lanes |= u, Hl |= u
							}
							c = c.next
						} while (null !== c && c !== o);
						null === s ? i = r : s.next = l, cr(r, t.memoizedState) || (Ba = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = s, n.lastRenderedState = r
					}
					return [t.memoizedState, n.dispatch]
				}

				function fa(e) {
					var t = sa(),
						n = t.queue;
					if (null === n) throw Error(a(311));
					n.lastRenderedReducer = e;
					var r = n.dispatch,
						o = n.pending,
						i = t.memoizedState;
					if (null !== o) {
						n.pending = null;
						var l = o = o.next;
						do {
							i = e(i, l.action), l = l.next
						} while (l !== o);
						cr(i, t.memoizedState) || (Ba = !0), t.memoizedState = i, null === t.baseQueue && (t.baseState = i), n.lastRenderedState = i
					}
					return [i, r]
				}

				function da(e, t, n) {
					var r = t._getVersion;
					r = r(t._source);
					var o = t._workInProgressVersionPrimary;
					if (null !== o ? e = o === r : (e = e.mutableReadLanes, (e = (Xi & e) === e) && (t._workInProgressVersionPrimary = r, Wi.push(t))), e) return n(t._source);
					throw Wi.push(t), Error(a(350))
				}

				function ha(e, t, n, r) {
					var o = Pl;
					if (null === o) throw Error(a(349));
					var i = t._getVersion,
						l = i(t._source),
						s = Yi.current,
						c = s.useState((function() {
							return da(o, t, n)
						})),
						u = c[1],
						f = c[0];
					c = ta;
					var d = e.memoizedState,
						h = d.refs,
						p = h.getSnapshot,
						v = d.source;
					d = d.subscribe;
					var m = Ji;
					return e.memoizedState = {
						refs: h,
						source: t,
						subscribe: r
					}, s.useEffect((function() {
						h.getSnapshot = n, h.setSnapshot = u;
						var e = i(t._source);
						if (!cr(l, e)) {
							e = n(t._source), cr(f, e) || (u(e), e = us(m), o.mutableReadLanes |= e & o.pendingLanes), e = o.mutableReadLanes, o.entangledLanes |= e;
							for (var r = o.entanglements, a = e; 0 < a;) {
								var s = 31 - Ft(a),
									c = 1 << s;
								r[s] |= e, a &= ~c
							}
						}
					}), [n, t, r]), s.useEffect((function() {
						return r(t._source, (function() {
							var e = h.getSnapshot,
								n = h.setSnapshot;
							try {
								n(e(t._source));
								var r = us(m);
								o.mutableReadLanes |= r & o.pendingLanes
							} catch (e) {
								n((function() {
									throw e
								}))
							}
						}))
					}), [t, r]), cr(p, n) && cr(v, t) && cr(d, r) || ((e = {
						pending: null,
						dispatch: null,
						lastRenderedReducer: ca,
						lastRenderedState: f
					}).dispatch = u = Pa.bind(null, Ji, e), c.queue = e, c.baseQueue = null, f = da(o, t, n), c.memoizedState = c.baseState = f), f
				}

				function pa(e, t, n) {
					return ha(sa(), e, t, n)
				}

				function va(e) {
					var t = la();
					return "function" == typeof e && (e = e()), t.memoizedState = t.baseState = e, e = (e = t.queue = {
						pending: null,
						dispatch: null,
						lastRenderedReducer: ca,
						lastRenderedState: e
					}).dispatch = Pa.bind(null, Ji, e), [t.memoizedState, e]
				}

				function ma(e, t, n, r) {
					return e = {
						tag: e,
						create: t,
						destroy: n,
						deps: r,
						next: null
					}, null === (t = Ji.updateQueue) ? (t = {
						lastEffect: null
					}, Ji.updateQueue = t, t.lastEffect = e.next = e) : null === (n = t.lastEffect) ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e
				}

				function ga(e) {
					return e = {
						current: e
					}, la().memoizedState = e
				}

				function ya() {
					return sa().memoizedState
				}

				function ba(e, t, n, r) {
					var o = la();
					Ji.flags |= e, o.memoizedState = ma(1 | t, n, void 0, void 0 === r ? null : r)
				}

				function wa(e, t, n, r) {
					var o = sa();
					r = void 0 === r ? null : r;
					var i = void 0;
					if (null !== ea) {
						var a = ea.memoizedState;
						if (i = a.destroy, null !== r && ia(r, a.deps)) return void ma(t, n, i, r)
					}
					Ji.flags |= e, o.memoizedState = ma(1 | t, n, i, r)
				}

				function xa(e, t) {
					return ba(516, 4, e, t)
				}

				function Ma(e, t) {
					return wa(516, 4, e, t)
				}

				function za(e, t) {
					return wa(4, 2, e, t)
				}

				function Ea(e, t) {
					return "function" == typeof t ? (e = e(), t(e), function() {
						t(null)
					}) : null != t ? (e = e(), t.current = e, function() {
						t.current = null
					}) : void 0
				}

				function ka(e, t, n) {
					return n = null != n ? n.concat([e]) : null, wa(4, 2, Ea.bind(null, t, e), n)
				}

				function Ca() {}

				function Sa(e, t) {
					var n = sa();
					t = void 0 === t ? null : t;
					var r = n.memoizedState;
					return null !== r && null !== t && ia(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
				}

				function Ta(e, t) {
					var n = sa();
					t = void 0 === t ? null : t;
					var r = n.memoizedState;
					return null !== r && null !== t && ia(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e)
				}

				function Na(e, t) {
					var n = Vo();
					Uo(98 > n ? 98 : n, (function() {
						e(!0)
					})), Uo(97 < n ? 97 : n, (function() {
						var n = Gi.transition;
						Gi.transition = 1;
						try {
							e(!1), t()
						} finally {
							Gi.transition = n
						}
					}))
				}

				function Pa(e, t, n) {
					var r = cs(),
						o = us(e),
						i = {
							lane: o,
							action: n,
							eagerReducer: null,
							eagerState: null,
							next: null
						},
						a = t.pending;
					if (null === a ? i.next = i : (i.next = a.next, a.next = i), t.pending = i, a = e.alternate, e === Ji || null !== a && a === Ji) ra = na = !0;
					else {
						if (0 === e.lanes && (null === a || 0 === a.lanes) && null !== (a = t.lastRenderedReducer)) try {
							var l = t.lastRenderedState,
								s = a(l, n);
							if (i.eagerReducer = a, i.eagerState = s, cr(s, l)) return
						} catch (e) {}
						fs(e, o, r)
					}
				}
				var Aa = {
						readContext: ai,
						useCallback: oa,
						useContext: oa,
						useEffect: oa,
						useImperativeHandle: oa,
						useLayoutEffect: oa,
						useMemo: oa,
						useReducer: oa,
						useRef: oa,
						useState: oa,
						useDebugValue: oa,
						useDeferredValue: oa,
						useTransition: oa,
						useMutableSource: oa,
						useOpaqueIdentifier: oa,
						unstable_isNewReconciler: !1
					},
					_a = {
						readContext: ai,
						useCallback: function(e, t) {
							return la().memoizedState = [e, void 0 === t ? null : t], e
						},
						useContext: ai,
						useEffect: xa,
						useImperativeHandle: function(e, t, n) {
							return n = null != n ? n.concat([e]) : null, ba(4, 2, Ea.bind(null, t, e), n)
						},
						useLayoutEffect: function(e, t) {
							return ba(4, 2, e, t)
						},
						useMemo: function(e, t) {
							var n = la();
							return t = void 0 === t ? null : t, e = e(), n.memoizedState = [e, t], e
						},
						useReducer: function(e, t, n) {
							var r = la();
							return t = void 0 !== n ? n(t) : t, r.memoizedState = r.baseState = t, e = (e = r.queue = {
								pending: null,
								dispatch: null,
								lastRenderedReducer: e,
								lastRenderedState: t
							}).dispatch = Pa.bind(null, Ji, e), [r.memoizedState, e]
						},
						useRef: ga,
						useState: va,
						useDebugValue: Ca,
						useDeferredValue: function(e) {
							var t = va(e),
								n = t[0],
								r = t[1];
							return xa((function() {
								var t = Gi.transition;
								Gi.transition = 1;
								try {
									r(e)
								} finally {
									Gi.transition = t
								}
							}), [e]), n
						},
						useTransition: function() {
							var e = va(!1),
								t = e[0];
							return ga(e = Na.bind(null, e[1])), [e, t]
						},
						useMutableSource: function(e, t, n) {
							var r = la();
							return r.memoizedState = {
								refs: {
									getSnapshot: t,
									setSnapshot: null
								},
								source: e,
								subscribe: n
							}, ha(r, e, t, n)
						},
						useOpaqueIdentifier: function() {
							if (ji) {
								var e = !1,
									t = function(e) {
										return {
											$$typeof: D,
											toString: e,
											valueOf: e
										}
									}((function() {
										throw e || (e = !0, n("r:" + ($r++).toString(36))), Error(a(355))
									})),
									n = va(t)[1];
								return 0 == (2 & Ji.mode) && (Ji.flags |= 516, ma(5, (function() {
									n("r:" + ($r++).toString(36))
								}), void 0, null)), t
							}
							return va(t = "r:" + ($r++).toString(36)), t
						},
						unstable_isNewReconciler: !1
					},
					Oa = {
						readContext: ai,
						useCallback: Sa,
						useContext: ai,
						useEffect: Ma,
						useImperativeHandle: ka,
						useLayoutEffect: za,
						useMemo: Ta,
						useReducer: ua,
						useRef: ya,
						useState: function() {
							return ua(ca)
						},
						useDebugValue: Ca,
						useDeferredValue: function(e) {
							var t = ua(ca),
								n = t[0],
								r = t[1];
							return Ma((function() {
								var t = Gi.transition;
								Gi.transition = 1;
								try {
									r(e)
								} finally {
									Gi.transition = t
								}
							}), [e]), n
						},
						useTransition: function() {
							var e = ua(ca)[0];
							return [ya().current, e]
						},
						useMutableSource: pa,
						useOpaqueIdentifier: function() {
							return ua(ca)[0]
						},
						unstable_isNewReconciler: !1
					},
					La = {
						readContext: ai,
						useCallback: Sa,
						useContext: ai,
						useEffect: Ma,
						useImperativeHandle: ka,
						useLayoutEffect: za,
						useMemo: Ta,
						useReducer: fa,
						useRef: ya,
						useState: function() {
							return fa(ca)
						},
						useDebugValue: Ca,
						useDeferredValue: function(e) {
							var t = fa(ca),
								n = t[0],
								r = t[1];
							return Ma((function() {
								var t = Gi.transition;
								Gi.transition = 1;
								try {
									r(e)
								} finally {
									Gi.transition = t
								}
							}), [e]), n
						},
						useTransition: function() {
							var e = fa(ca)[0];
							return [ya().current, e]
						},
						useMutableSource: pa,
						useOpaqueIdentifier: function() {
							return fa(ca)[0]
						},
						unstable_isNewReconciler: !1
					},
					Da = x.ReactCurrentOwner,
					Ba = !1;

				function Ia(e, t, n, r) {
					t.child = null === e ? Si(t, null, n, r) : Ci(t, e.child, n, r)
				}

				function Ha(e, t, n, r, o) {
					n = n.render;
					var i = t.ref;
					return ii(t, o), r = aa(e, t, n, r, i, o), null === e || Ba ? (t.flags |= 1, Ia(e, t, r, o), t.child) : (t.updateQueue = e.updateQueue, t.flags &= -517, e.lanes &= ~o, nl(e, t, o))
				}

				function Ra(e, t, n, r, o, i) {
					if (null === e) {
						var a = n.type;
						return "function" != typeof a || Zs(a) || void 0 !== a.defaultProps || null !== n.compare || void 0 !== n.defaultProps ? ((e = Vs(n.type, null, r, t, t.mode, i)).ref = t.ref, e.return = t, t.child = e) : (t.tag = 15, t.type = a, qa(e, t, a, r, o, i))
					}
					return a = e.child, 0 == (o & i) && (o = a.memoizedProps, (n = null !== (n = n.compare) ? n : fr)(o, r) && e.ref === t.ref) ? nl(e, t, i) : (t.flags |= 1, (e = Fs(a, r)).ref = t.ref, e.return = t, t.child = e)
				}

				function qa(e, t, n, r, o, i) {
					if (null !== e && fr(e.memoizedProps, r) && e.ref === t.ref) {
						if (Ba = !1, 0 == (i & o)) return t.lanes = e.lanes, nl(e, t, i);
						0 != (16384 & e.flags) && (Ba = !0)
					}
					return Fa(e, t, n, r, i)
				}

				function ja(e, t, n) {
					var r = t.pendingProps,
						o = r.children,
						i = null !== e ? e.memoizedState : null;
					if ("hidden" === r.mode || "unstable-defer-without-hiding" === r.mode)
						if (0 == (4 & t.mode)) t.memoizedState = {
							baseLanes: 0
						}, bs(0, n);
						else {
							if (0 == (1073741824 & n)) return e = null !== i ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
								baseLanes: e
							}, bs(0, e), null;
							t.memoizedState = {
								baseLanes: 0
							}, bs(0, null !== i ? i.baseLanes : n)
						}
					else null !== i ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, bs(0, r);
					return Ia(e, t, o, n), t.child
				}

				function Za(e, t) {
					var n = t.ref;
					(null === e && null !== n || null !== e && e.ref !== n) && (t.flags |= 128)
				}

				function Fa(e, t, n, r, o) {
					var i = go(n) ? vo : ho.current;
					return i = mo(t, i), ii(t, o), n = aa(e, t, n, r, i, o), null === e || Ba ? (t.flags |= 1, Ia(e, t, n, o), t.child) : (t.updateQueue = e.updateQueue, t.flags &= -517, e.lanes &= ~o, nl(e, t, o))
				}

				function Va(e, t, n, r, o) {
					if (go(n)) {
						var i = !0;
						xo(t)
					} else i = !1;
					if (ii(t, o), null === t.stateNode) null !== e && (e.alternate = null, t.alternate = null, t.flags |= 2), bi(t, n, r), xi(t, n, r, o), r = !0;
					else if (null === e) {
						var a = t.stateNode,
							l = t.memoizedProps;
						a.props = l;
						var s = a.context,
							c = n.contextType;
						c = "object" == typeof c && null !== c ? ai(c) : mo(t, c = go(n) ? vo : ho.current);
						var u = n.getDerivedStateFromProps,
							f = "function" == typeof u || "function" == typeof a.getSnapshotBeforeUpdate;
						f || "function" != typeof a.UNSAFE_componentWillReceiveProps && "function" != typeof a.componentWillReceiveProps || (l !== r || s !== c) && wi(t, a, r, c), li = !1;
						var d = t.memoizedState;
						a.state = d, hi(t, r, a, o), s = t.memoizedState, l !== r || d !== s || po.current || li ? ("function" == typeof u && (mi(t, n, u, r), s = t.memoizedState), (l = li || yi(t, n, l, r, d, s, c)) ? (f || "function" != typeof a.UNSAFE_componentWillMount && "function" != typeof a.componentWillMount || ("function" == typeof a.componentWillMount && a.componentWillMount(), "function" == typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount()), "function" == typeof a.componentDidMount && (t.flags |= 4)) : ("function" == typeof a.componentDidMount && (t.flags |= 4), t.memoizedProps = r, t.memoizedState = s), a.props = r, a.state = s, a.context = c, r = l) : ("function" == typeof a.componentDidMount && (t.flags |= 4), r = !1)
					} else {
						a = t.stateNode, ci(e, t), l = t.memoizedProps, c = t.type === t.elementType ? l : Go(t.type, l), a.props = c, f = t.pendingProps, d = a.context, s = "object" == typeof(s = n.contextType) && null !== s ? ai(s) : mo(t, s = go(n) ? vo : ho.current);
						var h = n.getDerivedStateFromProps;
						(u = "function" == typeof h || "function" == typeof a.getSnapshotBeforeUpdate) || "function" != typeof a.UNSAFE_componentWillReceiveProps && "function" != typeof a.componentWillReceiveProps || (l !== f || d !== s) && wi(t, a, r, s), li = !1, d = t.memoizedState, a.state = d, hi(t, r, a, o);
						var p = t.memoizedState;
						l !== f || d !== p || po.current || li ? ("function" == typeof h && (mi(t, n, h, r), p = t.memoizedState), (c = li || yi(t, n, c, r, d, p, s)) ? (u || "function" != typeof a.UNSAFE_componentWillUpdate && "function" != typeof a.componentWillUpdate || ("function" == typeof a.componentWillUpdate && a.componentWillUpdate(r, p, s), "function" == typeof a.UNSAFE_componentWillUpdate && a.UNSAFE_componentWillUpdate(r, p, s)), "function" == typeof a.componentDidUpdate && (t.flags |= 4), "function" == typeof a.getSnapshotBeforeUpdate && (t.flags |= 256)) : ("function" != typeof a.componentDidUpdate || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), "function" != typeof a.getSnapshotBeforeUpdate || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 256), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = s, r = c) : ("function" != typeof a.componentDidUpdate || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), "function" != typeof a.getSnapshotBeforeUpdate || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 256), r = !1)
					}
					return Qa(e, t, n, r, i, o)
				}

				function Qa(e, t, n, r, o, i) {
					Za(e, t);
					var a = 0 != (64 & t.flags);
					if (!r && !a) return o && Mo(t, n, !1), nl(e, t, i);
					r = t.stateNode, Da.current = t;
					var l = a && "function" != typeof n.getDerivedStateFromError ? null : r.render();
					return t.flags |= 1, null !== e && a ? (t.child = Ci(t, e.child, null, i), t.child = Ci(t, null, l, i)) : Ia(e, t, l, i), t.memoizedState = r.state, o && Mo(t, n, !0), t.child
				}

				function Ua(e) {
					var t = e.stateNode;
					t.pendingContext ? bo(0, t.pendingContext, t.pendingContext !== t.context) : t.context && bo(0, t.context, !1), Oi(e, t.containerInfo)
				}
				var Ka, Wa, $a, Ya = {
					dehydrated: null,
					retryLane: 0
				};

				function Ga(e, t, n) {
					var r, o = t.pendingProps,
						i = Ii.current,
						a = !1;
					return (r = 0 != (64 & t.flags)) || (r = (null === e || null !== e.memoizedState) && 0 != (2 & i)), r ? (a = !0, t.flags &= -65) : null !== e && null === e.memoizedState || void 0 === o.fallback || !0 === o.unstable_avoidThisFallback || (i |= 1), uo(Ii, 1 & i), null === e ? (void 0 !== o.fallback && Vi(t), e = o.children, i = o.fallback, a ? (e = Xa(t, e, i, n), t.child.memoizedState = {
						baseLanes: n
					}, t.memoizedState = Ya, e) : "number" == typeof o.unstable_expectedLoadTime ? (e = Xa(t, e, i, n), t.child.memoizedState = {
						baseLanes: n
					}, t.memoizedState = Ya, t.lanes = 33554432, e) : ((n = Us({
						mode: "visible",
						children: e
					}, t.mode, n, null)).return = t, t.child = n)) : (e.memoizedState, a ? (o = function(e, t, n, r, o) {
						var i = t.mode,
							a = e.child;
						e = a.sibling;
						var l = {
							mode: "hidden",
							children: n
						};
						return 0 == (2 & i) && t.child !== a ? ((n = t.child).childLanes = 0, n.pendingProps = l, null !== (a = n.lastEffect) ? (t.firstEffect = n.firstEffect, t.lastEffect = a, a.nextEffect = null) : t.firstEffect = t.lastEffect = null) : n = Fs(a, l), null !== e ? r = Fs(e, r) : (r = Qs(r, i, o, null)).flags |= 2, r.return = t, n.return = t, n.sibling = r, t.child = n, r
					}(e, t, o.children, o.fallback, n), a = t.child, i = e.child.memoizedState, a.memoizedState = null === i ? {
						baseLanes: n
					} : {
						baseLanes: i.baseLanes | n
					}, a.childLanes = e.childLanes & ~n, t.memoizedState = Ya, o) : (n = function(e, t, n, r) {
						var o = e.child;
						return e = o.sibling, n = Fs(o, {
							mode: "visible",
							children: n
						}), 0 == (2 & t.mode) && (n.lanes = r), n.return = t, n.sibling = null, null !== e && (e.nextEffect = null, e.flags = 8, t.firstEffect = t.lastEffect = e), t.child = n
					}(e, t, o.children, n), t.memoizedState = null, n))
				}

				function Xa(e, t, n, r) {
					var o = e.mode,
						i = e.child;
					return t = {
						mode: "hidden",
						children: t
					}, 0 == (2 & o) && null !== i ? (i.childLanes = 0, i.pendingProps = t) : i = Us(t, o, 0, null), n = Qs(n, o, r, null), i.return = e, n.return = e, i.sibling = n, e.child = i, n
				}

				function Ja(e, t) {
					e.lanes |= t;
					var n = e.alternate;
					null !== n && (n.lanes |= t), oi(e.return, t)
				}

				function el(e, t, n, r, o, i) {
					var a = e.memoizedState;
					null === a ? e.memoizedState = {
						isBackwards: t,
						rendering: null,
						renderingStartTime: 0,
						last: r,
						tail: n,
						tailMode: o,
						lastEffect: i
					} : (a.isBackwards = t, a.rendering = null, a.renderingStartTime = 0, a.last = r, a.tail = n, a.tailMode = o, a.lastEffect = i)
				}

				function tl(e, t, n) {
					var r = t.pendingProps,
						o = r.revealOrder,
						i = r.tail;
					if (Ia(e, t, r.children, n), 0 != (2 & (r = Ii.current))) r = 1 & r | 2, t.flags |= 64;
					else {
						if (null !== e && 0 != (64 & e.flags)) e: for (e = t.child; null !== e;) {
							if (13 === e.tag) null !== e.memoizedState && Ja(e, n);
							else if (19 === e.tag) Ja(e, n);
							else if (null !== e.child) {
								e.child.return = e, e = e.child;
								continue
							}
							if (e === t) break e;
							for (; null === e.sibling;) {
								if (null === e.return || e.return === t) break e;
								e = e.return
							}
							e.sibling.return = e.return, e = e.sibling
						}
						r &= 1
					}
					if (uo(Ii, r), 0 == (2 & t.mode)) t.memoizedState = null;
					else switch (o) {
						case "forwards":
							for (n = t.child, o = null; null !== n;) null !== (e = n.alternate) && null === Hi(e) && (o = n), n = n.sibling;
							null === (n = o) ? (o = t.child, t.child = null) : (o = n.sibling, n.sibling = null), el(t, !1, o, n, i, t.lastEffect);
							break;
						case "backwards":
							for (n = null, o = t.child, t.child = null; null !== o;) {
								if (null !== (e = o.alternate) && null === Hi(e)) {
									t.child = o;
									break
								}
								e = o.sibling, o.sibling = n, n = o, o = e
							}
							el(t, !0, n, null, i, t.lastEffect);
							break;
						case "together":
							el(t, !1, null, null, void 0, t.lastEffect);
							break;
						default:
							t.memoizedState = null
					}
					return t.child
				}

				function nl(e, t, n) {
					if (null !== e && (t.dependencies = e.dependencies), Hl |= t.lanes, 0 != (n & t.childLanes)) {
						if (null !== e && t.child !== e.child) throw Error(a(153));
						if (null !== t.child) {
							for (n = Fs(e = t.child, e.pendingProps), t.child = n, n.return = t; null !== e.sibling;) e = e.sibling, (n = n.sibling = Fs(e, e.pendingProps)).return = t;
							n.sibling = null
						}
						return t.child
					}
					return null
				}

				function rl(e, t) {
					if (!ji) switch (e.tailMode) {
						case "hidden":
							t = e.tail;
							for (var n = null; null !== t;) null !== t.alternate && (n = t), t = t.sibling;
							null === n ? e.tail = null : n.sibling = null;
							break;
						case "collapsed":
							n = e.tail;
							for (var r = null; null !== n;) null !== n.alternate && (r = n), n = n.sibling;
							null === r ? t || null === e.tail ? e.tail = null : e.tail.sibling = null : r.sibling = null
					}
				}

				function ol(e, t, n) {
					var r = t.pendingProps;
					switch (t.tag) {
						case 2:
						case 16:
						case 15:
						case 0:
						case 11:
						case 7:
						case 8:
						case 12:
						case 9:
						case 14:
							return null;
						case 1:
						case 17:
							return go(t.type) && yo(), null;
						case 3:
							return Li(), co(po), co(ho), $i(), (r = t.stateNode).pendingContext && (r.context = r.pendingContext, r.pendingContext = null), null !== e && null !== e.child || (Ui(t) ? t.flags |= 4 : r.hydrate || (t.flags |= 256)), null;
						case 5:
							Bi(t);
							var i = _i(Ai.current);
							if (n = t.type, null !== e && null != t.stateNode) Wa(e, t, n, r), e.ref !== t.ref && (t.flags |= 128);
							else {
								if (!r) {
									if (null === t.stateNode) throw Error(a(166));
									return null
								}
								if (e = _i(Ni.current), Ui(t)) {
									r = t.stateNode, n = t.type;
									var l = t.memoizedProps;
									switch (r[Gr] = t, r[Xr] = l, n) {
										case "dialog":
											Nr("cancel", r), Nr("close", r);
											break;
										case "iframe":
										case "object":
										case "embed":
											Nr("load", r);
											break;
										case "video":
										case "audio":
											for (e = 0; e < kr.length; e++) Nr(kr[e], r);
											break;
										case "source":
											Nr("error", r);
											break;
										case "img":
										case "image":
										case "link":
											Nr("error", r), Nr("load", r);
											break;
										case "details":
											Nr("toggle", r);
											break;
										case "input":
											ee(r, l), Nr("invalid", r);
											break;
										case "select":
											r._wrapperState = {
												wasMultiple: !!l.multiple
											}, Nr("invalid", r);
											break;
										case "textarea":
											se(r, l), Nr("invalid", r)
									}
									for (var c in ze(n, l), e = null, l) l.hasOwnProperty(c) && (i = l[c], "children" === c ? "string" == typeof i ? r.textContent !== i && (e = ["children", i]) : "number" == typeof i && r.textContent !== "" + i && (e = ["children", "" + i]) : s.hasOwnProperty(c) && null != i && "onScroll" === c && Nr("scroll", r));
									switch (n) {
										case "input":
											Y(r), re(r, l, !0);
											break;
										case "textarea":
											Y(r), ue(r);
											break;
										case "select":
										case "option":
											break;
										default:
											"function" == typeof l.onClick && (r.onclick = Rr)
									}
									r = e, t.updateQueue = r, null !== r && (t.flags |= 4)
								} else {
									switch (c = 9 === i.nodeType ? i : i.ownerDocument, e === fe && (e = de(n)), e === fe ? "script" === n ? ((e = c.createElement("div")).innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : "string" == typeof r.is ? e = c.createElement(n, {
											is: r.is
										}) : (e = c.createElement(n), "select" === n && (c = e, r.multiple ? c.multiple = !0 : r.size && (c.size = r.size))) : e = c.createElementNS(e, n), e[Gr] = t, e[Xr] = r, Ka(e, t), t.stateNode = e, c = Ee(n, r), n) {
										case "dialog":
											Nr("cancel", e), Nr("close", e), i = r;
											break;
										case "iframe":
										case "object":
										case "embed":
											Nr("load", e), i = r;
											break;
										case "video":
										case "audio":
											for (i = 0; i < kr.length; i++) Nr(kr[i], e);
											i = r;
											break;
										case "source":
											Nr("error", e), i = r;
											break;
										case "img":
										case "image":
										case "link":
											Nr("error", e), Nr("load", e), i = r;
											break;
										case "details":
											Nr("toggle", e), i = r;
											break;
										case "input":
											ee(e, r), i = J(e, r), Nr("invalid", e);
											break;
										case "option":
											i = ie(e, r);
											break;
										case "select":
											e._wrapperState = {
												wasMultiple: !!r.multiple
											}, i = o({}, r, {
												value: void 0
											}), Nr("invalid", e);
											break;
										case "textarea":
											se(e, r), i = le(e, r), Nr("invalid", e);
											break;
										default:
											i = r
									}
									ze(n, i);
									var u = i;
									for (l in u)
										if (u.hasOwnProperty(l)) {
											var f = u[l];
											"style" === l ? xe(e, f) : "dangerouslySetInnerHTML" === l ? null != (f = f ? f.__html : void 0) && me(e, f) : "children" === l ? "string" == typeof f ? ("textarea" !== n || "" !== f) && ge(e, f) : "number" == typeof f && ge(e, "" + f) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (s.hasOwnProperty(l) ? null != f && "onScroll" === l && Nr("scroll", e) : null != f && w(e, l, f, c))
										} switch (n) {
										case "input":
											Y(e), re(e, r, !1);
											break;
										case "textarea":
											Y(e), ue(e);
											break;
										case "option":
											null != r.value && e.setAttribute("value", "" + W(r.value));
											break;
										case "select":
											e.multiple = !!r.multiple, null != (l = r.value) ? ae(e, !!r.multiple, l, !1) : null != r.defaultValue && ae(e, !!r.multiple, r.defaultValue, !0);
											break;
										default:
											"function" == typeof i.onClick && (e.onclick = Rr)
									}
									Zr(n, r) && (t.flags |= 4)
								}
								null !== t.ref && (t.flags |= 128)
							}
							return null;
						case 6:
							if (e && null != t.stateNode) $a(0, t, e.memoizedProps, r);
							else {
								if ("string" != typeof r && null === t.stateNode) throw Error(a(166));
								n = _i(Ai.current), _i(Ni.current), Ui(t) ? (r = t.stateNode, n = t.memoizedProps, r[Gr] = t, r.nodeValue !== n && (t.flags |= 4)) : ((r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(r))[Gr] = t, t.stateNode = r)
							}
							return null;
						case 13:
							return co(Ii), r = t.memoizedState, 0 != (64 & t.flags) ? (t.lanes = n, t) : (r = null !== r, n = !1, null === e ? void 0 !== t.memoizedProps.fallback && Ui(t) : n = null !== e.memoizedState, r && !n && 0 != (2 & t.mode) && (null === e && !0 !== t.memoizedProps.unstable_avoidThisFallback || 0 != (1 & Ii.current) ? 0 === Dl && (Dl = 3) : (0 !== Dl && 3 !== Dl || (Dl = 4), null === Pl || 0 == (134217727 & Hl) && 0 == (134217727 & Rl) || vs(Pl, _l))), (r || n) && (t.flags |= 4), null);
						case 4:
							return Li(), null === e && Ar(t.stateNode.containerInfo), null;
						case 10:
							return ri(t), null;
						case 19:
							if (co(Ii), null === (r = t.memoizedState)) return null;
							if (l = 0 != (64 & t.flags), null === (c = r.rendering))
								if (l) rl(r, !1);
								else {
									if (0 !== Dl || null !== e && 0 != (64 & e.flags))
										for (e = t.child; null !== e;) {
											if (null !== (c = Hi(e))) {
												for (t.flags |= 64, rl(r, !1), null !== (l = c.updateQueue) && (t.updateQueue = l, t.flags |= 4), null === r.lastEffect && (t.firstEffect = null), t.lastEffect = r.lastEffect, r = n, n = t.child; null !== n;) e = r, (l = n).flags &= 2, l.nextEffect = null, l.firstEffect = null, l.lastEffect = null, null === (c = l.alternate) ? (l.childLanes = 0, l.lanes = e, l.child = null, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = c.childLanes, l.lanes = c.lanes, l.child = c.child, l.memoizedProps = c.memoizedProps, l.memoizedState = c.memoizedState, l.updateQueue = c.updateQueue, l.type = c.type, e = c.dependencies, l.dependencies = null === e ? null : {
													lanes: e.lanes,
													firstContext: e.firstContext
												}), n = n.sibling;
												return uo(Ii, 1 & Ii.current | 2), t.child
											}
											e = e.sibling
										}
									null !== r.tail && Fo() > Fl && (t.flags |= 64, l = !0, rl(r, !1), t.lanes = 33554432)
								}
							else {
								if (!l)
									if (null !== (e = Hi(c))) {
										if (t.flags |= 64, l = !0, null !== (n = e.updateQueue) && (t.updateQueue = n, t.flags |= 4), rl(r, !0), null === r.tail && "hidden" === r.tailMode && !c.alternate && !ji) return null !== (t = t.lastEffect = r.lastEffect) && (t.nextEffect = null), null
									} else 2 * Fo() - r.renderingStartTime > Fl && 1073741824 !== n && (t.flags |= 64, l = !0, rl(r, !1), t.lanes = 33554432);
								r.isBackwards ? (c.sibling = t.child, t.child = c) : (null !== (n = r.last) ? n.sibling = c : t.child = c, r.last = c)
							}
							return null !== r.tail ? (n = r.tail, r.rendering = n, r.tail = n.sibling, r.lastEffect = t.lastEffect, r.renderingStartTime = Fo(), n.sibling = null, t = Ii.current, uo(Ii, l ? 1 & t | 2 : 1 & t), n) : null;
						case 23:
						case 24:
							return ws(), null !== e && null !== e.memoizedState != (null !== t.memoizedState) && "unstable-defer-without-hiding" !== r.mode && (t.flags |= 4), null
					}
					throw Error(a(156, t.tag))
				}

				function il(e) {
					switch (e.tag) {
						case 1:
							go(e.type) && yo();
							var t = e.flags;
							return 4096 & t ? (e.flags = -4097 & t | 64, e) : null;
						case 3:
							if (Li(), co(po), co(ho), $i(), 0 != (64 & (t = e.flags))) throw Error(a(285));
							return e.flags = -4097 & t | 64, e;
						case 5:
							return Bi(e), null;
						case 13:
							return co(Ii), 4096 & (t = e.flags) ? (e.flags = -4097 & t | 64, e) : null;
						case 19:
							return co(Ii), null;
						case 4:
							return Li(), null;
						case 10:
							return ri(e), null;
						case 23:
						case 24:
							return ws(), null;
						default:
							return null
					}
				}

				function al(e, t) {
					try {
						var n = "",
							r = t;
						do {
							n += U(r), r = r.return
						} while (r);
						var o = n
					} catch (e) {
						o = "\nError generating stack: " + e.message + "\n" + e.stack
					}
					return {
						value: e,
						source: t,
						stack: o
					}
				}

				function ll(e, t) {
					try {
						console.error(t.value)
					} catch (e) {
						setTimeout((function() {
							throw e
						}))
					}
				}
				Ka = function(e, t) {
					for (var n = t.child; null !== n;) {
						if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
						else if (4 !== n.tag && null !== n.child) {
							n.child.return = n, n = n.child;
							continue
						}
						if (n === t) break;
						for (; null === n.sibling;) {
							if (null === n.return || n.return === t) return;
							n = n.return
						}
						n.sibling.return = n.return, n = n.sibling
					}
				}, Wa = function(e, t, n, r) {
					var i = e.memoizedProps;
					if (i !== r) {
						e = t.stateNode, _i(Ni.current);
						var a, l = null;
						switch (n) {
							case "input":
								i = J(e, i), r = J(e, r), l = [];
								break;
							case "option":
								i = ie(e, i), r = ie(e, r), l = [];
								break;
							case "select":
								i = o({}, i, {
									value: void 0
								}), r = o({}, r, {
									value: void 0
								}), l = [];
								break;
							case "textarea":
								i = le(e, i), r = le(e, r), l = [];
								break;
							default:
								"function" != typeof i.onClick && "function" == typeof r.onClick && (e.onclick = Rr)
						}
						for (f in ze(n, r), n = null, i)
							if (!r.hasOwnProperty(f) && i.hasOwnProperty(f) && null != i[f])
								if ("style" === f) {
									var c = i[f];
									for (a in c) c.hasOwnProperty(a) && (n || (n = {}), n[a] = "")
								} else "dangerouslySetInnerHTML" !== f && "children" !== f && "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (s.hasOwnProperty(f) ? l || (l = []) : (l = l || []).push(f, null));
						for (f in r) {
							var u = r[f];
							if (c = null != i ? i[f] : void 0, r.hasOwnProperty(f) && u !== c && (null != u || null != c))
								if ("style" === f)
									if (c) {
										for (a in c) !c.hasOwnProperty(a) || u && u.hasOwnProperty(a) || (n || (n = {}), n[a] = "");
										for (a in u) u.hasOwnProperty(a) && c[a] !== u[a] && (n || (n = {}), n[a] = u[a])
									} else n || (l || (l = []), l.push(f, n)), n = u;
							else "dangerouslySetInnerHTML" === f ? (u = u ? u.__html : void 0, c = c ? c.__html : void 0, null != u && c !== u && (l = l || []).push(f, u)) : "children" === f ? "string" != typeof u && "number" != typeof u || (l = l || []).push(f, "" + u) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && (s.hasOwnProperty(f) ? (null != u && "onScroll" === f && Nr("scroll", e), l || c === u || (l = [])) : "object" == typeof u && null !== u && u.$$typeof === D ? u.toString() : (l = l || []).push(f, u))
						}
						n && (l = l || []).push("style", n);
						var f = l;
						(t.updateQueue = f) && (t.flags |= 4)
					}
				}, $a = function(e, t, n, r) {
					n !== r && (t.flags |= 4)
				};
				var sl = "function" == typeof WeakMap ? WeakMap : Map;

				function cl(e, t, n) {
					(n = ui(-1, n)).tag = 3, n.payload = {
						element: null
					};
					var r = t.value;
					return n.callback = function() {
						Kl || (Kl = !0, Wl = r), ll(0, t)
					}, n
				}

				function ul(e, t, n) {
					(n = ui(-1, n)).tag = 3;
					var r = e.type.getDerivedStateFromError;
					if ("function" == typeof r) {
						var o = t.value;
						n.payload = function() {
							return ll(0, t), r(o)
						}
					}
					var i = e.stateNode;
					return null !== i && "function" == typeof i.componentDidCatch && (n.callback = function() {
						"function" != typeof r && (null === $l ? $l = new Set([this]) : $l.add(this), ll(0, t));
						var e = t.stack;
						this.componentDidCatch(t.value, {
							componentStack: null !== e ? e : ""
						})
					}), n
				}
				var fl = "function" == typeof WeakSet ? WeakSet : Set;

				function dl(e) {
					var t = e.ref;
					if (null !== t)
						if ("function" == typeof t) try {
							t(null)
						} catch (t) {
							Is(e, t)
						} else t.current = null
				}

				function hl(e, t) {
					switch (t.tag) {
						case 0:
						case 11:
						case 15:
						case 22:
						case 5:
						case 6:
						case 4:
						case 17:
							return;
						case 1:
							if (256 & t.flags && null !== e) {
								var n = e.memoizedProps,
									r = e.memoizedState;
								t = (e = t.stateNode).getSnapshotBeforeUpdate(t.elementType === t.type ? n : Go(t.type, n), r), e.__reactInternalSnapshotBeforeUpdate = t
							}
							return;
						case 3:
							return void(256 & t.flags && Ur(t.stateNode.containerInfo))
					}
					throw Error(a(163))
				}

				function pl(e, t, n) {
					switch (n.tag) {
						case 0:
						case 11:
						case 15:
						case 22:
							if (null !== (t = null !== (t = n.updateQueue) ? t.lastEffect : null)) {
								e = t = t.next;
								do {
									if (3 == (3 & e.tag)) {
										var r = e.create;
										e.destroy = r()
									}
									e = e.next
								} while (e !== t)
							}
							if (null !== (t = null !== (t = n.updateQueue) ? t.lastEffect : null)) {
								e = t = t.next;
								do {
									var o = e;
									r = o.next, 0 != (4 & (o = o.tag)) && 0 != (1 & o) && (Ls(n, e), Os(n, e)), e = r
								} while (e !== t)
							}
							return;
						case 1:
							return e = n.stateNode, 4 & n.flags && (null === t ? e.componentDidMount() : (r = n.elementType === n.type ? t.memoizedProps : Go(n.type, t.memoizedProps), e.componentDidUpdate(r, t.memoizedState, e.__reactInternalSnapshotBeforeUpdate))), void(null !== (t = n.updateQueue) && pi(n, t, e));
						case 3:
							if (null !== (t = n.updateQueue)) {
								if (e = null, null !== n.child) switch (n.child.tag) {
									case 5:
									case 1:
										e = n.child.stateNode
								}
								pi(n, t, e)
							}
							return;
						case 5:
							return e = n.stateNode, void(null === t && 4 & n.flags && Zr(n.type, n.memoizedProps) && e.focus());
						case 6:
						case 4:
						case 12:
						case 19:
						case 17:
						case 20:
						case 21:
						case 23:
						case 24:
							return;
						case 13:
							return void(null === n.memoizedState && (n = n.alternate, null !== n && (n = n.memoizedState, null !== n && (n = n.dehydrated, null !== n && xt(n)))))
					}
					throw Error(a(163))
				}

				function vl(e, t) {
					for (var n = e;;) {
						if (5 === n.tag) {
							var r = n.stateNode;
							if (t) "function" == typeof(r = r.style).setProperty ? r.setProperty("display", "none", "important") : r.display = "none";
							else {
								r = n.stateNode;
								var o = n.memoizedProps.style;
								o = null != o && o.hasOwnProperty("display") ? o.display : null, r.style.display = we("display", o)
							}
						} else if (6 === n.tag) n.stateNode.nodeValue = t ? "" : n.memoizedProps;
						else if ((23 !== n.tag && 24 !== n.tag || null === n.memoizedState || n === e) && null !== n.child) {
							n.child.return = n, n = n.child;
							continue
						}
						if (n === e) break;
						for (; null === n.sibling;) {
							if (null === n.return || n.return === e) return;
							n = n.return
						}
						n.sibling.return = n.return, n = n.sibling
					}
				}

				function ml(e, t) {
					if (Eo && "function" == typeof Eo.onCommitFiberUnmount) try {
						Eo.onCommitFiberUnmount(zo, t)
					} catch (e) {}
					switch (t.tag) {
						case 0:
						case 11:
						case 14:
						case 15:
						case 22:
							if (null !== (e = t.updateQueue) && null !== (e = e.lastEffect)) {
								var n = e = e.next;
								do {
									var r = n,
										o = r.destroy;
									if (r = r.tag, void 0 !== o)
										if (0 != (4 & r)) Ls(t, n);
										else {
											r = t;
											try {
												o()
											} catch (e) {
												Is(r, e)
											}
										} n = n.next
								} while (n !== e)
							}
							break;
						case 1:
							if (dl(t), "function" == typeof(e = t.stateNode).componentWillUnmount) try {
								e.props = t.memoizedProps, e.state = t.memoizedState, e.componentWillUnmount()
							} catch (e) {
								Is(t, e)
							}
							break;
						case 5:
							dl(t);
							break;
						case 4:
							Ml(e, t)
					}
				}

				function gl(e) {
					e.alternate = null, e.child = null, e.dependencies = null, e.firstEffect = null, e.lastEffect = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.return = null, e.updateQueue = null
				}

				function yl(e) {
					return 5 === e.tag || 3 === e.tag || 4 === e.tag
				}

				function bl(e) {
					e: {
						for (var t = e.return; null !== t;) {
							if (yl(t)) break e;
							t = t.return
						}
						throw Error(a(160))
					}
					var n = t;
					switch (t = n.stateNode, n.tag) {
						case 5:
							var r = !1;
							break;
						case 3:
						case 4:
							t = t.containerInfo, r = !0;
							break;
						default:
							throw Error(a(161))
					}
					16 & n.flags && (ge(t, ""), n.flags &= -17);e: t: for (n = e;;) {
						for (; null === n.sibling;) {
							if (null === n.return || yl(n.return)) {
								n = null;
								break e
							}
							n = n.return
						}
						for (n.sibling.return = n.return, n = n.sibling; 5 !== n.tag && 6 !== n.tag && 18 !== n.tag;) {
							if (2 & n.flags) continue t;
							if (null === n.child || 4 === n.tag) continue t;
							n.child.return = n, n = n.child
						}
						if (!(2 & n.flags)) {
							n = n.stateNode;
							break e
						}
					}
					r ? wl(e, n, t) : xl(e, n, t)
				}

				function wl(e, t, n) {
					var r = e.tag,
						o = 5 === r || 6 === r;
					if (o) e = o ? e.stateNode : e.stateNode.instance, t ? 8 === n.nodeType ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (8 === n.nodeType ? (t = n.parentNode).insertBefore(e, n) : (t = n).appendChild(e), null != (n = n._reactRootContainer) || null !== t.onclick || (t.onclick = Rr));
					else if (4 !== r && null !== (e = e.child))
						for (wl(e, t, n), e = e.sibling; null !== e;) wl(e, t, n), e = e.sibling
				}

				function xl(e, t, n) {
					var r = e.tag,
						o = 5 === r || 6 === r;
					if (o) e = o ? e.stateNode : e.stateNode.instance, t ? n.insertBefore(e, t) : n.appendChild(e);
					else if (4 !== r && null !== (e = e.child))
						for (xl(e, t, n), e = e.sibling; null !== e;) xl(e, t, n), e = e.sibling
				}

				function Ml(e, t) {
					for (var n, r, o = t, i = !1;;) {
						if (!i) {
							i = o.return;
							e: for (;;) {
								if (null === i) throw Error(a(160));
								switch (n = i.stateNode, i.tag) {
									case 5:
										r = !1;
										break e;
									case 3:
									case 4:
										n = n.containerInfo, r = !0;
										break e
								}
								i = i.return
							}
							i = !0
						}
						if (5 === o.tag || 6 === o.tag) {
							e: for (var l = e, s = o, c = s;;)
								if (ml(l, c), null !== c.child && 4 !== c.tag) c.child.return = c, c = c.child;
								else {
									if (c === s) break e;
									for (; null === c.sibling;) {
										if (null === c.return || c.return === s) break e;
										c = c.return
									}
									c.sibling.return = c.return, c = c.sibling
								}r ? (l = n, s = o.stateNode, 8 === l.nodeType ? l.parentNode.removeChild(s) : l.removeChild(s)) : n.removeChild(o.stateNode)
						}
						else if (4 === o.tag) {
							if (null !== o.child) {
								n = o.stateNode.containerInfo, r = !0, o.child.return = o, o = o.child;
								continue
							}
						} else if (ml(e, o), null !== o.child) {
							o.child.return = o, o = o.child;
							continue
						}
						if (o === t) break;
						for (; null === o.sibling;) {
							if (null === o.return || o.return === t) return;
							4 === (o = o.return).tag && (i = !1)
						}
						o.sibling.return = o.return, o = o.sibling
					}
				}

				function zl(e, t) {
					switch (t.tag) {
						case 0:
						case 11:
						case 14:
						case 15:
						case 22:
							var n = t.updateQueue;
							if (null !== (n = null !== n ? n.lastEffect : null)) {
								var r = n = n.next;
								do {
									3 == (3 & r.tag) && (e = r.destroy, r.destroy = void 0, void 0 !== e && e()), r = r.next
								} while (r !== n)
							}
							return;
						case 1:
						case 12:
						case 17:
							return;
						case 5:
							if (null != (n = t.stateNode)) {
								r = t.memoizedProps;
								var o = null !== e ? e.memoizedProps : r;
								e = t.type;
								var i = t.updateQueue;
								if (t.updateQueue = null, null !== i) {
									for (n[Xr] = r, "input" === e && "radio" === r.type && null != r.name && te(n, r), Ee(e, o), t = Ee(e, r), o = 0; o < i.length; o += 2) {
										var l = i[o],
											s = i[o + 1];
										"style" === l ? xe(n, s) : "dangerouslySetInnerHTML" === l ? me(n, s) : "children" === l ? ge(n, s) : w(n, l, s, t)
									}
									switch (e) {
										case "input":
											ne(n, r);
											break;
										case "textarea":
											ce(n, r);
											break;
										case "select":
											e = n._wrapperState.wasMultiple, n._wrapperState.wasMultiple = !!r.multiple, null != (i = r.value) ? ae(n, !!r.multiple, i, !1) : e !== !!r.multiple && (null != r.defaultValue ? ae(n, !!r.multiple, r.defaultValue, !0) : ae(n, !!r.multiple, r.multiple ? [] : "", !1))
									}
								}
							}
							return;
						case 6:
							if (null === t.stateNode) throw Error(a(162));
							return void(t.stateNode.nodeValue = t.memoizedProps);
						case 3:
							return void((n = t.stateNode).hydrate && (n.hydrate = !1, xt(n.containerInfo)));
						case 13:
							return null !== t.memoizedState && (Zl = Fo(), vl(t.child, !0)), void El(t);
						case 19:
							return void El(t);
						case 23:
						case 24:
							return void vl(t, null !== t.memoizedState)
					}
					throw Error(a(163))
				}

				function El(e) {
					var t = e.updateQueue;
					if (null !== t) {
						e.updateQueue = null;
						var n = e.stateNode;
						null === n && (n = e.stateNode = new fl), t.forEach((function(t) {
							var r = Rs.bind(null, e, t);
							n.has(t) || (n.add(t), t.then(r, r))
						}))
					}
				}

				function kl(e, t) {
					return null !== e && (null === (e = e.memoizedState) || null !== e.dehydrated) && null !== (t = t.memoizedState) && null === t.dehydrated
				}
				var Cl = Math.ceil,
					Sl = x.ReactCurrentDispatcher,
					Tl = x.ReactCurrentOwner,
					Nl = 0,
					Pl = null,
					Al = null,
					_l = 0,
					Ol = 0,
					Ll = so(0),
					Dl = 0,
					Bl = null,
					Il = 0,
					Hl = 0,
					Rl = 0,
					ql = 0,
					jl = null,
					Zl = 0,
					Fl = 1 / 0;

				function Vl() {
					Fl = Fo() + 500
				}
				var Ql, Ul = null,
					Kl = !1,
					Wl = null,
					$l = null,
					Yl = !1,
					Gl = null,
					Xl = 90,
					Jl = [],
					es = [],
					ts = null,
					ns = 0,
					rs = null,
					os = -1,
					is = 0,
					as = 0,
					ls = null,
					ss = !1;

				function cs() {
					return 0 != (48 & Nl) ? Fo() : -1 !== os ? os : os = Fo()
				}

				function us(e) {
					if (0 == (2 & (e = e.mode))) return 1;
					if (0 == (4 & e)) return 99 === Vo() ? 1 : 2;
					if (0 === is && (is = Il), 0 !== Yo.transition) {
						0 !== as && (as = null !== jl ? jl.pendingLanes : 0), e = is;
						var t = 4186112 & ~as;
						return 0 == (t &= -t) && 0 == (t = (e = 4186112 & ~e) & -e) && (t = 8192), t
					}
					return e = Vo(), e = Rt(0 != (4 & Nl) && 98 === e ? 12 : e = function(e) {
						switch (e) {
							case 99:
								return 15;
							case 98:
								return 10;
							case 97:
							case 96:
								return 8;
							case 95:
								return 2;
							default:
								return 0
						}
					}(e), is)
				}

				function fs(e, t, n) {
					if (50 < ns) throw ns = 0, rs = null, Error(a(185));
					if (null === (e = ds(e, t))) return null;
					Zt(e, t, n), e === Pl && (Rl |= t, 4 === Dl && vs(e, _l));
					var r = Vo();
					1 === t ? 0 != (8 & Nl) && 0 == (48 & Nl) ? ms(e) : (hs(e, n), 0 === Nl && (Vl(), Wo())) : (0 == (4 & Nl) || 98 !== r && 99 !== r || (null === ts ? ts = new Set([e]) : ts.add(e)), hs(e, n)), jl = e
				}

				function ds(e, t) {
					e.lanes |= t;
					var n = e.alternate;
					for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e;) e.childLanes |= t, null !== (n = e.alternate) && (n.childLanes |= t), n = e, e = e.return;
					return 3 === n.tag ? n.stateNode : null
				}

				function hs(e, t) {
					for (var n = e.callbackNode, r = e.suspendedLanes, o = e.pingedLanes, i = e.expirationTimes, l = e.pendingLanes; 0 < l;) {
						var s = 31 - Ft(l),
							c = 1 << s,
							u = i[s];
						if (-1 === u) {
							if (0 == (c & r) || 0 != (c & o)) {
								u = t, Bt(c);
								var f = Dt;
								i[s] = 10 <= f ? u + 250 : 6 <= f ? u + 5e3 : -1
							}
						} else u <= t && (e.expiredLanes |= c);
						l &= ~c
					}
					if (r = It(e, e === Pl ? _l : 0), t = Dt, 0 === r) null !== n && (n !== Io && So(n), e.callbackNode = null, e.callbackPriority = 0);
					else {
						if (null !== n) {
							if (e.callbackPriority === t) return;
							n !== Io && So(n)
						}
						15 === t ? (n = ms.bind(null, e), null === Ro ? (Ro = [n], qo = Co(_o, $o)) : Ro.push(n), n = Io) : 14 === t ? n = Ko(99, ms.bind(null, e)) : (n = function(e) {
							switch (e) {
								case 15:
								case 14:
									return 99;
								case 13:
								case 12:
								case 11:
								case 10:
									return 98;
								case 9:
								case 8:
								case 7:
								case 6:
								case 4:
								case 5:
									return 97;
								case 3:
								case 2:
								case 1:
									return 95;
								case 0:
									return 90;
								default:
									throw Error(a(358, e))
							}
						}(t), n = Ko(n, ps.bind(null, e))), e.callbackPriority = t, e.callbackNode = n
					}
				}

				function ps(e) {
					if (os = -1, as = is = 0, 0 != (48 & Nl)) throw Error(a(327));
					var t = e.callbackNode;
					if (_s() && e.callbackNode !== t) return null;
					var n = It(e, e === Pl ? _l : 0);
					if (0 === n) return null;
					var r = n,
						o = Nl;
					Nl |= 16;
					var i = zs();
					for (Pl === e && _l === r || (Vl(), xs(e, r));;) try {
						Cs();
						break
					} catch (t) {
						Ms(e, t)
					}
					if (ni(), Sl.current = i, Nl = o, null !== Al ? r = 0 : (Pl = null, _l = 0, r = Dl), 0 != (Il & Rl)) xs(e, 0);
					else if (0 !== r) {
						if (2 === r && (Nl |= 64, e.hydrate && (e.hydrate = !1, Ur(e.containerInfo)), 0 !== (n = Ht(e)) && (r = Es(e, n))), 1 === r) throw t = Bl, xs(e, 0), vs(e, n), hs(e, Fo()), t;
						switch (e.finishedWork = e.current.alternate, e.finishedLanes = n, r) {
							case 0:
							case 1:
								throw Error(a(345));
							case 2:
							case 5:
								Ns(e);
								break;
							case 3:
								if (vs(e, n), (62914560 & n) === n && 10 < (r = Zl + 500 - Fo())) {
									if (0 !== It(e, 0)) break;
									if (((o = e.suspendedLanes) & n) !== n) {
										cs(), e.pingedLanes |= e.suspendedLanes & o;
										break
									}
									e.timeoutHandle = Vr(Ns.bind(null, e), r);
									break
								}
								Ns(e);
								break;
							case 4:
								if (vs(e, n), (4186112 & n) === n) break;
								for (r = e.eventTimes, o = -1; 0 < n;) {
									var l = 31 - Ft(n);
									i = 1 << l, (l = r[l]) > o && (o = l), n &= ~i
								}
								if (n = o, 10 < (n = (120 > (n = Fo() - n) ? 120 : 480 > n ? 480 : 1080 > n ? 1080 : 1920 > n ? 1920 : 3e3 > n ? 3e3 : 4320 > n ? 4320 : 1960 * Cl(n / 1960)) - n)) {
									e.timeoutHandle = Vr(Ns.bind(null, e), n);
									break
								}
								Ns(e);
								break;
							default:
								throw Error(a(329))
						}
					}
					return hs(e, Fo()), e.callbackNode === t ? ps.bind(null, e) : null
				}

				function vs(e, t) {
					for (t &= ~ql, t &= ~Rl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
						var n = 31 - Ft(t),
							r = 1 << n;
						e[n] = -1, t &= ~r
					}
				}

				function ms(e) {
					if (0 != (48 & Nl)) throw Error(a(327));
					if (_s(), e === Pl && 0 != (e.expiredLanes & _l)) {
						var t = _l,
							n = Es(e, t);
						0 != (Il & Rl) && (n = Es(e, t = It(e, t)))
					} else n = Es(e, t = It(e, 0));
					if (0 !== e.tag && 2 === n && (Nl |= 64, e.hydrate && (e.hydrate = !1, Ur(e.containerInfo)), 0 !== (t = Ht(e)) && (n = Es(e, t))), 1 === n) throw n = Bl, xs(e, 0), vs(e, t), hs(e, Fo()), n;
					return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ns(e), hs(e, Fo()), null
				}

				function gs(e, t) {
					var n = Nl;
					Nl |= 1;
					try {
						return e(t)
					} finally {
						0 === (Nl = n) && (Vl(), Wo())
					}
				}

				function ys(e, t) {
					var n = Nl;
					Nl &= -2, Nl |= 8;
					try {
						return e(t)
					} finally {
						0 === (Nl = n) && (Vl(), Wo())
					}
				}

				function bs(e, t) {
					uo(Ll, Ol), Ol |= t, Il |= t
				}

				function ws() {
					Ol = Ll.current, co(Ll)
				}

				function xs(e, t) {
					e.finishedWork = null, e.finishedLanes = 0;
					var n = e.timeoutHandle;
					if (-1 !== n && (e.timeoutHandle = -1, Qr(n)), null !== Al)
						for (n = Al.return; null !== n;) {
							var r = n;
							switch (r.tag) {
								case 1:
									null != (r = r.type.childContextTypes) && yo();
									break;
								case 3:
									Li(), co(po), co(ho), $i();
									break;
								case 5:
									Bi(r);
									break;
								case 4:
									Li();
									break;
								case 13:
								case 19:
									co(Ii);
									break;
								case 10:
									ri(r);
									break;
								case 23:
								case 24:
									ws()
							}
							n = n.return
						}
					Pl = e, Al = Fs(e.current, null), _l = Ol = Il = t, Dl = 0, Bl = null, ql = Rl = Hl = 0
				}

				function Ms(e, t) {
					for (;;) {
						var n = Al;
						try {
							if (ni(), Yi.current = Aa, na) {
								for (var r = Ji.memoizedState; null !== r;) {
									var o = r.queue;
									null !== o && (o.pending = null), r = r.next
								}
								na = !1
							}
							if (Xi = 0, ta = ea = Ji = null, ra = !1, Tl.current = null, null === n || null === n.return) {
								Dl = 1, Bl = t, Al = null;
								break
							}
							e: {
								var i = e,
									a = n.return,
									l = n,
									s = t;
								if (t = _l, l.flags |= 2048, l.firstEffect = l.lastEffect = null, null !== s && "object" == typeof s && "function" == typeof s.then) {
									var c = s;
									if (0 == (2 & l.mode)) {
										var u = l.alternate;
										u ? (l.updateQueue = u.updateQueue, l.memoizedState = u.memoizedState, l.lanes = u.lanes) : (l.updateQueue = null, l.memoizedState = null)
									}
									var f = 0 != (1 & Ii.current),
										d = a;
									do {
										var h;
										if (h = 13 === d.tag) {
											var p = d.memoizedState;
											if (null !== p) h = null !== p.dehydrated;
											else {
												var v = d.memoizedProps;
												h = void 0 !== v.fallback && (!0 !== v.unstable_avoidThisFallback || !f)
											}
										}
										if (h) {
											var m = d.updateQueue;
											if (null === m) {
												var g = new Set;
												g.add(c), d.updateQueue = g
											} else m.add(c);
											if (0 == (2 & d.mode)) {
												if (d.flags |= 64, l.flags |= 16384, l.flags &= -2981, 1 === l.tag)
													if (null === l.alternate) l.tag = 17;
													else {
														var y = ui(-1, 1);
														y.tag = 2, fi(l, y)
													} l.lanes |= 1;
												break e
											}
											s = void 0, l = t;
											var b = i.pingCache;
											if (null === b ? (b = i.pingCache = new sl, s = new Set, b.set(c, s)) : void 0 === (s = b.get(c)) && (s = new Set, b.set(c, s)), !s.has(l)) {
												s.add(l);
												var w = Hs.bind(null, i, c, l);
												c.then(w, w)
											}
											d.flags |= 4096, d.lanes = t;
											break e
										}
										d = d.return
									} while (null !== d);
									s = Error((K(l.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")
								}
								5 !== Dl && (Dl = 2),
								s = al(s, l),
								d = a;do {
									switch (d.tag) {
										case 3:
											i = s, d.flags |= 4096, t &= -t, d.lanes |= t, di(d, cl(0, i, t));
											break e;
										case 1:
											i = s;
											var x = d.type,
												M = d.stateNode;
											if (0 == (64 & d.flags) && ("function" == typeof x.getDerivedStateFromError || null !== M && "function" == typeof M.componentDidCatch && (null === $l || !$l.has(M)))) {
												d.flags |= 4096, t &= -t, d.lanes |= t, di(d, ul(d, i, t));
												break e
											}
									}
									d = d.return
								} while (null !== d)
							}
							Ts(n)
						} catch (e) {
							t = e, Al === n && null !== n && (Al = n = n.return);
							continue
						}
						break
					}
				}

				function zs() {
					var e = Sl.current;
					return Sl.current = Aa, null === e ? Aa : e
				}

				function Es(e, t) {
					var n = Nl;
					Nl |= 16;
					var r = zs();
					for (Pl === e && _l === t || xs(e, t);;) try {
						ks();
						break
					} catch (t) {
						Ms(e, t)
					}
					if (ni(), Nl = n, Sl.current = r, null !== Al) throw Error(a(261));
					return Pl = null, _l = 0, Dl
				}

				function ks() {
					for (; null !== Al;) Ss(Al)
				}

				function Cs() {
					for (; null !== Al && !To();) Ss(Al)
				}

				function Ss(e) {
					var t = Ql(e.alternate, e, Ol);
					e.memoizedProps = e.pendingProps, null === t ? Ts(e) : Al = t, Tl.current = null
				}

				function Ts(e) {
					var t = e;
					do {
						var n = t.alternate;
						if (e = t.return, 0 == (2048 & t.flags)) {
							if (null !== (n = ol(n, t, Ol))) return void(Al = n);
							if (24 !== (n = t).tag && 23 !== n.tag || null === n.memoizedState || 0 != (1073741824 & Ol) || 0 == (4 & n.mode)) {
								for (var r = 0, o = n.child; null !== o;) r |= o.lanes | o.childLanes, o = o.sibling;
								n.childLanes = r
							}
							null !== e && 0 == (2048 & e.flags) && (null === e.firstEffect && (e.firstEffect = t.firstEffect), null !== t.lastEffect && (null !== e.lastEffect && (e.lastEffect.nextEffect = t.firstEffect), e.lastEffect = t.lastEffect), 1 < t.flags && (null !== e.lastEffect ? e.lastEffect.nextEffect = t : e.firstEffect = t, e.lastEffect = t))
						} else {
							if (null !== (n = il(t))) return n.flags &= 2047, void(Al = n);
							null !== e && (e.firstEffect = e.lastEffect = null, e.flags |= 2048)
						}
						if (null !== (t = t.sibling)) return void(Al = t);
						Al = t = e
					} while (null !== t);
					0 === Dl && (Dl = 5)
				}

				function Ns(e) {
					var t = Vo();
					return Uo(99, Ps.bind(null, e, t)), null
				}

				function Ps(e, t) {
					do {
						_s()
					} while (null !== Gl);
					if (0 != (48 & Nl)) throw Error(a(327));
					var n = e.finishedWork;
					if (null === n) return null;
					if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(a(177));
					e.callbackNode = null;
					var r = n.lanes | n.childLanes,
						o = r,
						i = e.pendingLanes & ~o;
					e.pendingLanes = o, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= o, e.mutableReadLanes &= o, e.entangledLanes &= o, o = e.entanglements;
					for (var l = e.eventTimes, s = e.expirationTimes; 0 < i;) {
						var c = 31 - Ft(i),
							u = 1 << c;
						o[c] = 0, l[c] = -1, s[c] = -1, i &= ~u
					}
					if (null !== ts && 0 == (24 & r) && ts.has(e) && ts.delete(e), e === Pl && (Al = Pl = null, _l = 0), 1 < n.flags ? null !== n.lastEffect ? (n.lastEffect.nextEffect = n, r = n.firstEffect) : r = n : r = n.firstEffect, null !== r) {
						if (o = Nl, Nl |= 32, Tl.current = null, qr = Wt, mr(l = vr())) {
							if ("selectionStart" in l) s = {
								start: l.selectionStart,
								end: l.selectionEnd
							};
							else e: if (s = (s = l.ownerDocument) && s.defaultView || window, (u = s.getSelection && s.getSelection()) && 0 !== u.rangeCount) {
								s = u.anchorNode, i = u.anchorOffset, c = u.focusNode, u = u.focusOffset;
								try {
									s.nodeType, c.nodeType
								} catch (e) {
									s = null;
									break e
								}
								var f = 0,
									d = -1,
									h = -1,
									p = 0,
									v = 0,
									m = l,
									g = null;
								t: for (;;) {
									for (var y; m !== s || 0 !== i && 3 !== m.nodeType || (d = f + i), m !== c || 0 !== u && 3 !== m.nodeType || (h = f + u), 3 === m.nodeType && (f += m.nodeValue.length), null !== (y = m.firstChild);) g = m, m = y;
									for (;;) {
										if (m === l) break t;
										if (g === s && ++p === i && (d = f), g === c && ++v === u && (h = f), null !== (y = m.nextSibling)) break;
										g = (m = g).parentNode
									}
									m = y
								}
								s = -1 === d || -1 === h ? null : {
									start: d,
									end: h
								}
							} else s = null;
							s = s || {
								start: 0,
								end: 0
							}
						} else s = null;
						jr = {
							focusedElem: l,
							selectionRange: s
						}, Wt = !1, ls = null, ss = !1, Ul = r;
						do {
							try {
								As()
							} catch (e) {
								if (null === Ul) throw Error(a(330));
								Is(Ul, e), Ul = Ul.nextEffect
							}
						} while (null !== Ul);
						ls = null, Ul = r;
						do {
							try {
								for (l = e; null !== Ul;) {
									var b = Ul.flags;
									if (16 & b && ge(Ul.stateNode, ""), 128 & b) {
										var w = Ul.alternate;
										if (null !== w) {
											var x = w.ref;
											null !== x && ("function" == typeof x ? x(null) : x.current = null)
										}
									}
									switch (1038 & b) {
										case 2:
											bl(Ul), Ul.flags &= -3;
											break;
										case 6:
											bl(Ul), Ul.flags &= -3, zl(Ul.alternate, Ul);
											break;
										case 1024:
											Ul.flags &= -1025;
											break;
										case 1028:
											Ul.flags &= -1025, zl(Ul.alternate, Ul);
											break;
										case 4:
											zl(Ul.alternate, Ul);
											break;
										case 8:
											Ml(l, s = Ul);
											var M = s.alternate;
											gl(s), null !== M && gl(M)
									}
									Ul = Ul.nextEffect
								}
							} catch (e) {
								if (null === Ul) throw Error(a(330));
								Is(Ul, e), Ul = Ul.nextEffect
							}
						} while (null !== Ul);
						if (x = jr, w = vr(), b = x.focusedElem, l = x.selectionRange, w !== b && b && b.ownerDocument && pr(b.ownerDocument.documentElement, b)) {
							null !== l && mr(b) && (w = l.start, void 0 === (x = l.end) && (x = w), "selectionStart" in b ? (b.selectionStart = w, b.selectionEnd = Math.min(x, b.value.length)) : (x = (w = b.ownerDocument || document) && w.defaultView || window).getSelection && (x = x.getSelection(), s = b.textContent.length, M = Math.min(l.start, s), l = void 0 === l.end ? M : Math.min(l.end, s), !x.extend && M > l && (s = l, l = M, M = s), s = hr(b, M), i = hr(b, l), s && i && (1 !== x.rangeCount || x.anchorNode !== s.node || x.anchorOffset !== s.offset || x.focusNode !== i.node || x.focusOffset !== i.offset) && ((w = w.createRange()).setStart(s.node, s.offset), x.removeAllRanges(), M > l ? (x.addRange(w), x.extend(i.node, i.offset)) : (w.setEnd(i.node, i.offset), x.addRange(w))))), w = [];
							for (x = b; x = x.parentNode;) 1 === x.nodeType && w.push({
								element: x,
								left: x.scrollLeft,
								top: x.scrollTop
							});
							for ("function" == typeof b.focus && b.focus(), b = 0; b < w.length; b++)(x = w[b]).element.scrollLeft = x.left, x.element.scrollTop = x.top
						}
						Wt = !!qr, jr = qr = null, e.current = n, Ul = r;
						do {
							try {
								for (b = e; null !== Ul;) {
									var z = Ul.flags;
									if (36 & z && pl(b, Ul.alternate, Ul), 128 & z) {
										w = void 0;
										var E = Ul.ref;
										if (null !== E) {
											var k = Ul.stateNode;
											Ul.tag, w = k, "function" == typeof E ? E(w) : E.current = w
										}
									}
									Ul = Ul.nextEffect
								}
							} catch (e) {
								if (null === Ul) throw Error(a(330));
								Is(Ul, e), Ul = Ul.nextEffect
							}
						} while (null !== Ul);
						Ul = null, Ho(), Nl = o
					} else e.current = n;
					if (Yl) Yl = !1, Gl = e, Xl = t;
					else
						for (Ul = r; null !== Ul;) t = Ul.nextEffect, Ul.nextEffect = null, 8 & Ul.flags && ((z = Ul).sibling = null, z.stateNode = null), Ul = t;
					if (0 === (r = e.pendingLanes) && ($l = null), 1 === r ? e === rs ? ns++ : (ns = 0, rs = e) : ns = 0, n = n.stateNode, Eo && "function" == typeof Eo.onCommitFiberRoot) try {
						Eo.onCommitFiberRoot(zo, n, void 0, 64 == (64 & n.current.flags))
					} catch (e) {}
					if (hs(e, Fo()), Kl) throw Kl = !1, e = Wl, Wl = null, e;
					return 0 != (8 & Nl) || Wo(), null
				}

				function As() {
					for (; null !== Ul;) {
						var e = Ul.alternate;
						ss || null === ls || (0 != (8 & Ul.flags) ? Je(Ul, ls) && (ss = !0) : 13 === Ul.tag && kl(e, Ul) && Je(Ul, ls) && (ss = !0));
						var t = Ul.flags;
						0 != (256 & t) && hl(e, Ul), 0 == (512 & t) || Yl || (Yl = !0, Ko(97, (function() {
							return _s(), null
						}))), Ul = Ul.nextEffect
					}
				}

				function _s() {
					if (90 !== Xl) {
						var e = 97 < Xl ? 97 : Xl;
						return Xl = 90, Uo(e, Ds)
					}
					return !1
				}

				function Os(e, t) {
					Jl.push(t, e), Yl || (Yl = !0, Ko(97, (function() {
						return _s(), null
					})))
				}

				function Ls(e, t) {
					es.push(t, e), Yl || (Yl = !0, Ko(97, (function() {
						return _s(), null
					})))
				}

				function Ds() {
					if (null === Gl) return !1;
					var e = Gl;
					if (Gl = null, 0 != (48 & Nl)) throw Error(a(331));
					var t = Nl;
					Nl |= 32;
					var n = es;
					es = [];
					for (var r = 0; r < n.length; r += 2) {
						var o = n[r],
							i = n[r + 1],
							l = o.destroy;
						if (o.destroy = void 0, "function" == typeof l) try {
							l()
						} catch (e) {
							if (null === i) throw Error(a(330));
							Is(i, e)
						}
					}
					for (n = Jl, Jl = [], r = 0; r < n.length; r += 2) {
						o = n[r], i = n[r + 1];
						try {
							var s = o.create;
							o.destroy = s()
						} catch (e) {
							if (null === i) throw Error(a(330));
							Is(i, e)
						}
					}
					for (s = e.current.firstEffect; null !== s;) e = s.nextEffect, s.nextEffect = null, 8 & s.flags && (s.sibling = null, s.stateNode = null), s = e;
					return Nl = t, Wo(), !0
				}

				function Bs(e, t, n) {
					fi(e, t = cl(0, t = al(n, t), 1)), t = cs(), null !== (e = ds(e, 1)) && (Zt(e, 1, t), hs(e, t))
				}

				function Is(e, t) {
					if (3 === e.tag) Bs(e, e, t);
					else
						for (var n = e.return; null !== n;) {
							if (3 === n.tag) {
								Bs(n, e, t);
								break
							}
							if (1 === n.tag) {
								var r = n.stateNode;
								if ("function" == typeof n.type.getDerivedStateFromError || "function" == typeof r.componentDidCatch && (null === $l || !$l.has(r))) {
									var o = ul(n, e = al(t, e), 1);
									if (fi(n, o), o = cs(), null !== (n = ds(n, 1))) Zt(n, 1, o), hs(n, o);
									else if ("function" == typeof r.componentDidCatch && (null === $l || !$l.has(r))) try {
										r.componentDidCatch(t, e)
									} catch (e) {}
									break
								}
							}
							n = n.return
						}
				}

				function Hs(e, t, n) {
					var r = e.pingCache;
					null !== r && r.delete(t), t = cs(), e.pingedLanes |= e.suspendedLanes & n, Pl === e && (_l & n) === n && (4 === Dl || 3 === Dl && (62914560 & _l) === _l && 500 > Fo() - Zl ? xs(e, 0) : ql |= n), hs(e, t)
				}

				function Rs(e, t) {
					var n = e.stateNode;
					null !== n && n.delete(t), 0 == (t = 0) && (0 == (2 & (t = e.mode)) ? t = 1 : 0 == (4 & t) ? t = 99 === Vo() ? 1 : 2 : (0 === is && (is = Il), 0 === (t = qt(62914560 & ~is)) && (t = 4194304))), n = cs(), null !== (e = ds(e, t)) && (Zt(e, t, n), hs(e, n))
				}

				function qs(e, t, n, r) {
					this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.flags = 0, this.lastEffect = this.firstEffect = this.nextEffect = null, this.childLanes = this.lanes = 0, this.alternate = null
				}

				function js(e, t, n, r) {
					return new qs(e, t, n, r)
				}

				function Zs(e) {
					return !(!(e = e.prototype) || !e.isReactComponent)
				}

				function Fs(e, t) {
					var n = e.alternate;
					return null === n ? ((n = js(e.tag, t, e.key, e.mode)).elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.nextEffect = null, n.firstEffect = null, n.lastEffect = null), n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = null === t ? null : {
						lanes: t.lanes,
						firstContext: t.firstContext
					}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n
				}

				function Vs(e, t, n, r, o, i) {
					var l = 2;
					if (r = e, "function" == typeof e) Zs(e) && (l = 1);
					else if ("string" == typeof e) l = 5;
					else e: switch (e) {
						case E:
							return Qs(n.children, o, i, t);
						case B:
							l = 8, o |= 16;
							break;
						case k:
							l = 8, o |= 1;
							break;
						case C:
							return (e = js(12, n, t, 8 | o)).elementType = C, e.type = C, e.lanes = i, e;
						case P:
							return (e = js(13, n, t, o)).type = P, e.elementType = P, e.lanes = i, e;
						case A:
							return (e = js(19, n, t, o)).elementType = A, e.lanes = i, e;
						case I:
							return Us(n, o, i, t);
						case H:
							return (e = js(24, n, t, o)).elementType = H, e.lanes = i, e;
						default:
							if ("object" == typeof e && null !== e) switch (e.$$typeof) {
								case S:
									l = 10;
									break e;
								case T:
									l = 9;
									break e;
								case N:
									l = 11;
									break e;
								case _:
									l = 14;
									break e;
								case O:
									l = 16, r = null;
									break e;
								case L:
									l = 22;
									break e
							}
							throw Error(a(130, null == e ? e : typeof e, ""))
					}
					return (t = js(l, n, t, o)).elementType = e, t.type = r, t.lanes = i, t
				}

				function Qs(e, t, n, r) {
					return (e = js(7, e, r, t)).lanes = n, e
				}

				function Us(e, t, n, r) {
					return (e = js(23, e, r, t)).elementType = I, e.lanes = n, e
				}

				function Ks(e, t, n) {
					return (e = js(6, e, null, t)).lanes = n, e
				}

				function Ws(e, t, n) {
					return (t = js(4, null !== e.children ? e.children : [], e.key, t)).lanes = n, t.stateNode = {
						containerInfo: e.containerInfo,
						pendingChildren: null,
						implementation: e.implementation
					}, t
				}

				function $s(e, t, n) {
					this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.pendingContext = this.context = null, this.hydrate = n, this.callbackNode = null, this.callbackPriority = 0, this.eventTimes = jt(0), this.expirationTimes = jt(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = jt(0), this.mutableSourceEagerHydrationData = null
				}

				function Ys(e, t, n) {
					var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
					return {
						$$typeof: z,
						key: null == r ? null : "" + r,
						children: e,
						containerInfo: t,
						implementation: n
					}
				}

				function Gs(e, t, n, r) {
					var o = t.current,
						i = cs(),
						l = us(o);
					e: if (n) {
						t: {
							if ($e(n = n._reactInternals) !== n || 1 !== n.tag) throw Error(a(170));
							var s = n;do {
								switch (s.tag) {
									case 3:
										s = s.stateNode.context;
										break t;
									case 1:
										if (go(s.type)) {
											s = s.stateNode.__reactInternalMemoizedMergedChildContext;
											break t
										}
								}
								s = s.return
							} while (null !== s);
							throw Error(a(171))
						}
						if (1 === n.tag) {
							var c = n.type;
							if (go(c)) {
								n = wo(n, c, s);
								break e
							}
						}
						n = s
					}
					else n = fo;
					return null === t.context ? t.context = n : t.pendingContext = n, (t = ui(i, l)).payload = {
						element: e
					}, null !== (r = void 0 === r ? null : r) && (t.callback = r), fi(o, t), fs(o, l, i), l
				}

				function Xs(e) {
					return (e = e.current).child ? (e.child.tag, e.child.stateNode) : null
				}

				function Js(e, t) {
					if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
						var n = e.retryLane;
						e.retryLane = 0 !== n && n < t ? n : t
					}
				}

				function ec(e, t) {
					Js(e, t), (e = e.alternate) && Js(e, t)
				}

				function tc(e, t, n) {
					var r = null != n && null != n.hydrationOptions && n.hydrationOptions.mutableSources || null;
					if (n = new $s(e, t, null != n && !0 === n.hydrate), t = js(3, null, null, 2 === t ? 7 : 1 === t ? 3 : 0), n.current = t, t.stateNode = n, si(t), e[Jr] = n.current, Ar(8 === e.nodeType ? e.parentNode : e), r)
						for (e = 0; e < r.length; e++) {
							var o = (t = r[e])._getVersion;
							o = o(t._source), null == n.mutableSourceEagerHydrationData ? n.mutableSourceEagerHydrationData = [t, o] : n.mutableSourceEagerHydrationData.push(t, o)
						}
					this._internalRoot = n
				}

				function nc(e) {
					return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
				}

				function rc(e, t, n, r, o) {
					var i = n._reactRootContainer;
					if (i) {
						var a = i._internalRoot;
						if ("function" == typeof o) {
							var l = o;
							o = function() {
								var e = Xs(a);
								l.call(e)
							}
						}
						Gs(t, a, e, o)
					} else {
						if (i = n._reactRootContainer = function(e, t) {
								if (t || (t = !(!(t = e ? 9 === e.nodeType ? e.documentElement : e.firstChild : null) || 1 !== t.nodeType || !t.hasAttribute("data-reactroot"))), !t)
									for (var n; n = e.lastChild;) e.removeChild(n);
								return new tc(e, 0, t ? {
									hydrate: !0
								} : void 0)
							}(n, r), a = i._internalRoot, "function" == typeof o) {
							var s = o;
							o = function() {
								var e = Xs(a);
								s.call(e)
							}
						}
						ys((function() {
							Gs(t, a, e, o)
						}))
					}
					return Xs(a)
				}

				function oc(e, t) {
					var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
					if (!nc(t)) throw Error(a(200));
					return Ys(e, t, null, n)
				}
				Ql = function(e, t, n) {
					var r = t.lanes;
					if (null !== e)
						if (e.memoizedProps !== t.pendingProps || po.current) Ba = !0;
						else {
							if (0 == (n & r)) {
								switch (Ba = !1, t.tag) {
									case 3:
										Ua(t), Ki();
										break;
									case 5:
										Di(t);
										break;
									case 1:
										go(t.type) && xo(t);
										break;
									case 4:
										Oi(t, t.stateNode.containerInfo);
										break;
									case 10:
										r = t.memoizedProps.value;
										var o = t.type._context;
										uo(Xo, o._currentValue), o._currentValue = r;
										break;
									case 13:
										if (null !== t.memoizedState) return 0 != (n & t.child.childLanes) ? Ga(e, t, n) : (uo(Ii, 1 & Ii.current), null !== (t = nl(e, t, n)) ? t.sibling : null);
										uo(Ii, 1 & Ii.current);
										break;
									case 19:
										if (r = 0 != (n & t.childLanes), 0 != (64 & e.flags)) {
											if (r) return tl(e, t, n);
											t.flags |= 64
										}
										if (null !== (o = t.memoizedState) && (o.rendering = null, o.tail = null, o.lastEffect = null), uo(Ii, Ii.current), r) break;
										return null;
									case 23:
									case 24:
										return t.lanes = 0, ja(e, t, n)
								}
								return nl(e, t, n)
							}
							Ba = 0 != (16384 & e.flags)
						}
					else Ba = !1;
					switch (t.lanes = 0, t.tag) {
						case 2:
							if (r = t.type, null !== e && (e.alternate = null, t.alternate = null, t.flags |= 2), e = t.pendingProps, o = mo(t, ho.current), ii(t, n), o = aa(null, t, r, e, o, n), t.flags |= 1, "object" == typeof o && null !== o && "function" == typeof o.render && void 0 === o.$$typeof) {
								if (t.tag = 1, t.memoizedState = null, t.updateQueue = null, go(r)) {
									var i = !0;
									xo(t)
								} else i = !1;
								t.memoizedState = null !== o.state && void 0 !== o.state ? o.state : null, si(t);
								var l = r.getDerivedStateFromProps;
								"function" == typeof l && mi(t, r, l, e), o.updater = gi, t.stateNode = o, o._reactInternals = t, xi(t, r, e, n), t = Qa(null, t, r, !0, i, n)
							} else t.tag = 0, Ia(null, t, o, n), t = t.child;
							return t;
						case 16:
							o = t.elementType;
							e: {
								switch (null !== e && (e.alternate = null, t.alternate = null, t.flags |= 2), e = t.pendingProps, o = (i = o._init)(o._payload), t.type = o, i = t.tag = function(e) {
										if ("function" == typeof e) return Zs(e) ? 1 : 0;
										if (null != e) {
											if ((e = e.$$typeof) === N) return 11;
											if (e === _) return 14
										}
										return 2
									}(o), e = Go(o, e), i) {
									case 0:
										t = Fa(null, t, o, e, n);
										break e;
									case 1:
										t = Va(null, t, o, e, n);
										break e;
									case 11:
										t = Ha(null, t, o, e, n);
										break e;
									case 14:
										t = Ra(null, t, o, Go(o.type, e), r, n);
										break e
								}
								throw Error(a(306, o, ""))
							}
							return t;
						case 0:
							return r = t.type, o = t.pendingProps, Fa(e, t, r, o = t.elementType === r ? o : Go(r, o), n);
						case 1:
							return r = t.type, o = t.pendingProps, Va(e, t, r, o = t.elementType === r ? o : Go(r, o), n);
						case 3:
							if (Ua(t), r = t.updateQueue, null === e || null === r) throw Error(a(282));
							if (r = t.pendingProps, o = null !== (o = t.memoizedState) ? o.element : null, ci(e, t), hi(t, r, null, n), (r = t.memoizedState.element) === o) Ki(), t = nl(e, t, n);
							else {
								if ((i = (o = t.stateNode).hydrate) && (qi = Kr(t.stateNode.containerInfo.firstChild), Ri = t, i = ji = !0), i) {
									if (null != (e = o.mutableSourceEagerHydrationData))
										for (o = 0; o < e.length; o += 2)(i = e[o])._workInProgressVersionPrimary = e[o + 1], Wi.push(i);
									for (n = Si(t, null, r, n), t.child = n; n;) n.flags = -3 & n.flags | 1024, n = n.sibling
								} else Ia(e, t, r, n), Ki();
								t = t.child
							}
							return t;
						case 5:
							return Di(t), null === e && Vi(t), r = t.type, o = t.pendingProps, i = null !== e ? e.memoizedProps : null, l = o.children, Fr(r, o) ? l = null : null !== i && Fr(r, i) && (t.flags |= 16), Za(e, t), Ia(e, t, l, n), t.child;
						case 6:
							return null === e && Vi(t), null;
						case 13:
							return Ga(e, t, n);
						case 4:
							return Oi(t, t.stateNode.containerInfo), r = t.pendingProps, null === e ? t.child = Ci(t, null, r, n) : Ia(e, t, r, n), t.child;
						case 11:
							return r = t.type, o = t.pendingProps, Ha(e, t, r, o = t.elementType === r ? o : Go(r, o), n);
						case 7:
							return Ia(e, t, t.pendingProps, n), t.child;
						case 8:
						case 12:
							return Ia(e, t, t.pendingProps.children, n), t.child;
						case 10:
							e: {
								r = t.type._context,
								o = t.pendingProps,
								l = t.memoizedProps,
								i = o.value;
								var s = t.type._context;
								if (uo(Xo, s._currentValue), s._currentValue = i, null !== l)
									if (s = l.value, 0 == (i = cr(s, i) ? 0 : 0 | ("function" == typeof r._calculateChangedBits ? r._calculateChangedBits(s, i) : 1073741823))) {
										if (l.children === o.children && !po.current) {
											t = nl(e, t, n);
											break e
										}
									} else
										for (null !== (s = t.child) && (s.return = t); null !== s;) {
											var c = s.dependencies;
											if (null !== c) {
												l = s.child;
												for (var u = c.firstContext; null !== u;) {
													if (u.context === r && 0 != (u.observedBits & i)) {
														1 === s.tag && ((u = ui(-1, n & -n)).tag = 2, fi(s, u)), s.lanes |= n, null !== (u = s.alternate) && (u.lanes |= n), oi(s.return, n), c.lanes |= n;
														break
													}
													u = u.next
												}
											} else l = 10 === s.tag && s.type === t.type ? null : s.child;
											if (null !== l) l.return = s;
											else
												for (l = s; null !== l;) {
													if (l === t) {
														l = null;
														break
													}
													if (null !== (s = l.sibling)) {
														s.return = l.return, l = s;
														break
													}
													l = l.return
												}
											s = l
										}
								Ia(e, t, o.children, n),
								t = t.child
							}
							return t;
						case 9:
							return o = t.type, r = (i = t.pendingProps).children, ii(t, n), r = r(o = ai(o, i.unstable_observedBits)), t.flags |= 1, Ia(e, t, r, n), t.child;
						case 14:
							return i = Go(o = t.type, t.pendingProps), Ra(e, t, o, i = Go(o.type, i), r, n);
						case 15:
							return qa(e, t, t.type, t.pendingProps, r, n);
						case 17:
							return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : Go(r, o), null !== e && (e.alternate = null, t.alternate = null, t.flags |= 2), t.tag = 1, go(r) ? (e = !0, xo(t)) : e = !1, ii(t, n), bi(t, r, o), xi(t, r, o, n), Qa(null, t, r, !0, e, n);
						case 19:
							return tl(e, t, n);
						case 23:
						case 24:
							return ja(e, t, n)
					}
					throw Error(a(156, t.tag))
				}, tc.prototype.render = function(e) {
					Gs(e, this._internalRoot, null, null)
				}, tc.prototype.unmount = function() {
					var e = this._internalRoot,
						t = e.containerInfo;
					Gs(null, e, null, (function() {
						t[Jr] = null
					}))
				}, et = function(e) {
					13 === e.tag && (fs(e, 4, cs()), ec(e, 4))
				}, tt = function(e) {
					13 === e.tag && (fs(e, 67108864, cs()), ec(e, 67108864))
				}, nt = function(e) {
					if (13 === e.tag) {
						var t = cs(),
							n = us(e);
						fs(e, n, t), ec(e, n)
					}
				}, rt = function(e, t) {
					return t()
				}, Ce = function(e, t, n) {
					switch (t) {
						case "input":
							if (ne(e, n), t = n.name, "radio" === n.type && null != t) {
								for (n = e; n.parentNode;) n = n.parentNode;
								for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
									var r = n[t];
									if (r !== e && r.form === e.form) {
										var o = oo(r);
										if (!o) throw Error(a(90));
										G(r), ne(r, o)
									}
								}
							}
							break;
						case "textarea":
							ce(e, n);
							break;
						case "select":
							null != (t = n.value) && ae(e, !!n.multiple, t, !1)
					}
				}, _e = gs, Oe = function(e, t, n, r, o) {
					var i = Nl;
					Nl |= 4;
					try {
						return Uo(98, e.bind(null, t, n, r, o))
					} finally {
						0 === (Nl = i) && (Vl(), Wo())
					}
				}, Le = function() {
					0 == (49 & Nl) && (function() {
						if (null !== ts) {
							var e = ts;
							ts = null, e.forEach((function(e) {
								e.expiredLanes |= 24 & e.pendingLanes, hs(e, Fo())
							}))
						}
						Wo()
					}(), _s())
				}, De = function(e, t) {
					var n = Nl;
					Nl |= 2;
					try {
						return e(t)
					} finally {
						0 === (Nl = n) && (Vl(), Wo())
					}
				};
				var ic = {
						Events: [no, ro, oo, Pe, Ae, _s, {
							current: !1
						}]
					},
					ac = {
						findFiberByHostInstance: to,
						bundleType: 0,
						version: "17.0.2",
						rendererPackageName: "react-dom"
					},
					lc = {
						bundleType: ac.bundleType,
						version: ac.version,
						rendererPackageName: ac.rendererPackageName,
						rendererConfig: ac.rendererConfig,
						overrideHookState: null,
						overrideHookStateDeletePath: null,
						overrideHookStateRenamePath: null,
						overrideProps: null,
						overridePropsDeletePath: null,
						overridePropsRenamePath: null,
						setSuspenseHandler: null,
						scheduleUpdate: null,
						currentDispatcherRef: x.ReactCurrentDispatcher,
						findHostInstanceByFiber: function(e) {
							return null === (e = Xe(e)) ? null : e.stateNode
						},
						findFiberByHostInstance: ac.findFiberByHostInstance || function() {
							return null
						},
						findHostInstancesForRefresh: null,
						scheduleRefresh: null,
						scheduleRoot: null,
						setRefreshHandler: null,
						getCurrentFiber: null
					};
				if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
					var sc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
					if (!sc.isDisabled && sc.supportsFiber) try {
						zo = sc.inject(lc), Eo = sc
					} catch (ve) {}
				}
				t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ic, t.createPortal = oc, t.findDOMNode = function(e) {
					if (null == e) return null;
					if (1 === e.nodeType) return e;
					var t = e._reactInternals;
					if (void 0 === t) {
						if ("function" == typeof e.render) throw Error(a(188));
						throw Error(a(268, Object.keys(e)))
					}
					return null === (e = Xe(t)) ? null : e.stateNode
				}, t.flushSync = function(e, t) {
					var n = Nl;
					if (0 != (48 & n)) return e(t);
					Nl |= 1;
					try {
						if (e) return Uo(99, e.bind(null, t))
					} finally {
						Nl = n, Wo()
					}
				}, t.hydrate = function(e, t, n) {
					if (!nc(t)) throw Error(a(200));
					return rc(null, e, t, !0, n)
				}, t.render = function(e, t, n) {
					if (!nc(t)) throw Error(a(200));
					return rc(null, e, t, !1, n)
				}, t.unmountComponentAtNode = function(e) {
					if (!nc(e)) throw Error(a(40));
					return !!e._reactRootContainer && (ys((function() {
						rc(null, null, e, !1, (function() {
							e._reactRootContainer = null, e[Jr] = null
						}))
					})), !0)
				}, t.unstable_batchedUpdates = gs, t.unstable_createPortal = function(e, t) {
					return oc(e, t, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null)
				}, t.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
					if (!nc(n)) throw Error(a(200));
					if (null == e || void 0 === e._reactInternals) throw Error(a(38));
					return rc(e, t, n, !1, r)
				}, t.version = "17.0.2"
			},
			3935: function(e, t, n) {
				"use strict";
				! function e() {
					if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
						__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)
					} catch (e) {
						console.error(e)
					}
				}(), e.exports = n(4448)
			},
			4203: function(e, t) {
				"use strict";
				var n, r, o, i;
				if ("object" == typeof performance && "function" == typeof performance.now) {
					var a = performance;
					t.unstable_now = function() {
						return a.now()
					}
				} else {
					var l = Date,
						s = l.now();
					t.unstable_now = function() {
						return l.now() - s
					}
				}
				if ("undefined" == typeof window || "function" != typeof MessageChannel) {
					var c = null,
						u = null,
						f = function() {
							if (null !== c) try {
								var e = t.unstable_now();
								c(!0, e), c = null
							} catch (e) {
								throw setTimeout(f, 0), e
							}
						};
					n = function(e) {
						null !== c ? setTimeout(n, 0, e) : (c = e, setTimeout(f, 0))
					}, r = function(e, t) {
						u = setTimeout(e, t)
					}, o = function() {
						clearTimeout(u)
					}, t.unstable_shouldYield = function() {
						return !1
					}, i = t.unstable_forceFrameRate = function() {}
				} else {
					var d = window.setTimeout,
						h = window.clearTimeout;
					if ("undefined" != typeof console) {
						var p = window.cancelAnimationFrame;
						"function" != typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), "function" != typeof p && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")
					}
					var v = !1,
						m = null,
						g = -1,
						y = 5,
						b = 0;
					t.unstable_shouldYield = function() {
						return t.unstable_now() >= b
					}, i = function() {}, t.unstable_forceFrameRate = function(e) {
						0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : y = 0 < e ? Math.floor(1e3 / e) : 5
					};
					var w = new MessageChannel,
						x = w.port2;
					w.port1.onmessage = function() {
						if (null !== m) {
							var e = t.unstable_now();
							b = e + y;
							try {
								m(!0, e) ? x.postMessage(null) : (v = !1, m = null)
							} catch (e) {
								throw x.postMessage(null), e
							}
						} else v = !1
					}, n = function(e) {
						m = e, v || (v = !0, x.postMessage(null))
					}, r = function(e, n) {
						g = d((function() {
							e(t.unstable_now())
						}), n)
					}, o = function() {
						h(g), g = -1
					}
				}

				function M(e, t) {
					var n = e.length;
					e.push(t);
					e: for (;;) {
						var r = n - 1 >>> 1,
							o = e[r];
						if (!(void 0 !== o && 0 < k(o, t))) break e;
						e[r] = t, e[n] = o, n = r
					}
				}

				function z(e) {
					return void 0 === (e = e[0]) ? null : e
				}

				function E(e) {
					var t = e[0];
					if (void 0 !== t) {
						var n = e.pop();
						if (n !== t) {
							e[0] = n;
							e: for (var r = 0, o = e.length; r < o;) {
								var i = 2 * (r + 1) - 1,
									a = e[i],
									l = i + 1,
									s = e[l];
								if (void 0 !== a && 0 > k(a, n)) void 0 !== s && 0 > k(s, a) ? (e[r] = s, e[l] = n, r = l) : (e[r] = a, e[i] = n, r = i);
								else {
									if (!(void 0 !== s && 0 > k(s, n))) break e;
									e[r] = s, e[l] = n, r = l
								}
							}
						}
						return t
					}
					return null
				}

				function k(e, t) {
					var n = e.sortIndex - t.sortIndex;
					return 0 !== n ? n : e.id - t.id
				}
				var C = [],
					S = [],
					T = 1,
					N = null,
					P = 3,
					A = !1,
					_ = !1,
					O = !1;

				function L(e) {
					for (var t = z(S); null !== t;) {
						if (null === t.callback) E(S);
						else {
							if (!(t.startTime <= e)) break;
							E(S), t.sortIndex = t.expirationTime, M(C, t)
						}
						t = z(S)
					}
				}

				function D(e) {
					if (O = !1, L(e), !_)
						if (null !== z(C)) _ = !0, n(B);
						else {
							var t = z(S);
							null !== t && r(D, t.startTime - e)
						}
				}

				function B(e, n) {
					_ = !1, O && (O = !1, o()), A = !0;
					var i = P;
					try {
						for (L(n), N = z(C); null !== N && (!(N.expirationTime > n) || e && !t.unstable_shouldYield());) {
							var a = N.callback;
							if ("function" == typeof a) {
								N.callback = null, P = N.priorityLevel;
								var l = a(N.expirationTime <= n);
								n = t.unstable_now(), "function" == typeof l ? N.callback = l : N === z(C) && E(C), L(n)
							} else E(C);
							N = z(C)
						}
						if (null !== N) var s = !0;
						else {
							var c = z(S);
							null !== c && r(D, c.startTime - n), s = !1
						}
						return s
					} finally {
						N = null, P = i, A = !1
					}
				}
				var I = i;
				t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(e) {
					e.callback = null
				}, t.unstable_continueExecution = function() {
					_ || A || (_ = !0, n(B))
				}, t.unstable_getCurrentPriorityLevel = function() {
					return P
				}, t.unstable_getFirstCallbackNode = function() {
					return z(C)
				}, t.unstable_next = function(e) {
					switch (P) {
						case 1:
						case 2:
						case 3:
							var t = 3;
							break;
						default:
							t = P
					}
					var n = P;
					P = t;
					try {
						return e()
					} finally {
						P = n
					}
				}, t.unstable_pauseExecution = function() {}, t.unstable_requestPaint = I, t.unstable_runWithPriority = function(e, t) {
					switch (e) {
						case 1:
						case 2:
						case 3:
						case 4:
						case 5:
							break;
						default:
							e = 3
					}
					var n = P;
					P = e;
					try {
						return t()
					} finally {
						P = n
					}
				}, t.unstable_scheduleCallback = function(e, i, a) {
					var l = t.unstable_now();
					switch (a = "object" == typeof a && null !== a && "number" == typeof(a = a.delay) && 0 < a ? l + a : l, e) {
						case 1:
							var s = -1;
							break;
						case 2:
							s = 250;
							break;
						case 5:
							s = 1073741823;
							break;
						case 4:
							s = 1e4;
							break;
						default:
							s = 5e3
					}
					return e = {
						id: T++,
						callback: i,
						priorityLevel: e,
						startTime: a,
						expirationTime: s = a + s,
						sortIndex: -1
					}, a > l ? (e.sortIndex = a, M(S, e), null === z(C) && e === z(S) && (O ? o() : O = !0, r(D, a - l))) : (e.sortIndex = s, M(C, e), _ || A || (_ = !0, n(B))), e
				}, t.unstable_wrapCallback = function(e) {
					var t = P;
					return function() {
						var n = P;
						P = t;
						try {
							return e.apply(this, arguments)
						} finally {
							P = n
						}
					}
				}
			},
			4142: function(e, t, n) {
				"use strict";
				e.exports = n(4203)
			},
			2343: function(e, t, n) {
				"use strict";
				n.d(t, {
					ZP: function() {
						return o
					}
				});
				var r = n(7462);

				function o(e) {
					var t, n, o, i, a, l = e.enabled,
						s = e.enableEvents,
						c = e.placement,
						u = e.flip,
						f = e.offset,
						d = e.fixed,
						h = e.containerPadding,
						p = e.arrowElement,
						v = e.popperConfig,
						m = void 0 === v ? {} : v,
						g = function(e) {
							var t = {};
							return Array.isArray(e) ? (null == e || e.forEach((function(e) {
								t[e.name] = e
							})), t) : e || t
						}(m.modifiers);
					return (0, r.Z)({}, m, {
						placement: c,
						enabled: l,
						strategy: d ? "fixed" : m.strategy,
						modifiers: (a = (0, r.Z)({}, g, {
							eventListeners: {
								enabled: s
							},
							preventOverflow: (0, r.Z)({}, g.preventOverflow, {
								options: h ? (0, r.Z)({
									padding: h
								}, null == (t = g.preventOverflow) ? void 0 : t.options) : null == (n = g.preventOverflow) ? void 0 : n.options
							}),
							offset: {
								options: (0, r.Z)({
									offset: f
								}, null == (o = g.offset) ? void 0 : o.options)
							},
							arrow: (0, r.Z)({}, g.arrow, {
								enabled: !!p,
								options: (0, r.Z)({}, null == (i = g.arrow) ? void 0 : i.options, {
									element: p
								})
							}),
							flip: (0, r.Z)({
								enabled: !!u
							}, g.flip)
						}), void 0 === a && (a = {}), Array.isArray(a) ? a : Object.keys(a).map((function(e) {
							return a[e].name = e, a[e]
						})))
					})
				}
			},
			6390: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return o
					}
				});
				var r = n(3935);

				function o(e) {
					return e && "setState" in e ? r.findDOMNode(e) : null != e ? e : null
				}
			},
			4789: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return oe
					}
				});
				var r = n(7462),
					o = n(3366),
					i = n(7294),
					a = n(6454);

				function l(e) {
					return e.split("-")[0]
				}

				function s(e) {
					if (null == e) return window;
					if ("[object Window]" !== e.toString()) {
						var t = e.ownerDocument;
						return t && t.defaultView || window
					}
					return e
				}

				function c(e) {
					return e instanceof s(e).Element || e instanceof Element
				}

				function u(e) {
					return e instanceof s(e).HTMLElement || e instanceof HTMLElement
				}

				function f(e) {
					return "undefined" != typeof ShadowRoot && (e instanceof s(e).ShadowRoot || e instanceof ShadowRoot)
				}
				var d = Math.max,
					h = Math.min,
					p = Math.round;

				function v(e, t) {
					void 0 === t && (t = !1);
					var n = e.getBoundingClientRect(),
						r = 1,
						o = 1;
					if (u(e) && t) {
						var i = e.offsetHeight,
							a = e.offsetWidth;
						a > 0 && (r = p(n.width) / a || 1), i > 0 && (o = p(n.height) / i || 1)
					}
					return {
						width: n.width / r,
						height: n.height / o,
						top: n.top / o,
						right: n.right / r,
						bottom: n.bottom / o,
						left: n.left / r,
						x: n.left / r,
						y: n.top / o
					}
				}

				function m(e) {
					var t = v(e),
						n = e.offsetWidth,
						r = e.offsetHeight;
					return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
						x: e.offsetLeft,
						y: e.offsetTop,
						width: n,
						height: r
					}
				}

				function g(e, t) {
					var n = t.getRootNode && t.getRootNode();
					if (e.contains(t)) return !0;
					if (n && f(n)) {
						var r = t;
						do {
							if (r && e.isSameNode(r)) return !0;
							r = r.parentNode || r.host
						} while (r)
					}
					return !1
				}

				function y(e) {
					return e ? (e.nodeName || "").toLowerCase() : null
				}

				function b(e) {
					return s(e).getComputedStyle(e)
				}

				function w(e) {
					return ["table", "td", "th"].indexOf(y(e)) >= 0
				}

				function x(e) {
					return ((c(e) ? e.ownerDocument : e.document) || window.document).documentElement
				}

				function M(e) {
					return "html" === y(e) ? e : e.assignedSlot || e.parentNode || (f(e) ? e.host : null) || x(e)
				}

				function z(e) {
					return u(e) && "fixed" !== b(e).position ? e.offsetParent : null
				}

				function E(e) {
					for (var t = s(e), n = z(e); n && w(n) && "static" === b(n).position;) n = z(n);
					return n && ("html" === y(n) || "body" === y(n) && "static" === b(n).position) ? t : n || function(e) {
						var t = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
						if (-1 !== navigator.userAgent.indexOf("Trident") && u(e) && "fixed" === b(e).position) return null;
						var n = M(e);
						for (f(n) && (n = n.host); u(n) && ["html", "body"].indexOf(y(n)) < 0;) {
							var r = b(n);
							if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== ["transform", "perspective"].indexOf(r.willChange) || t && "filter" === r.willChange || t && r.filter && "none" !== r.filter) return n;
							n = n.parentNode
						}
						return null
					}(e) || t
				}

				function k(e) {
					return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
				}

				function C(e, t, n) {
					return d(e, h(t, n))
				}

				function S(e) {
					return Object.assign({}, {
						top: 0,
						right: 0,
						bottom: 0,
						left: 0
					}, e)
				}

				function T(e, t) {
					return t.reduce((function(t, n) {
						return t[n] = e, t
					}), {})
				}
				var N = n(890);

				function P(e) {
					return e.split("-")[1]
				}
				var A = {
					top: "auto",
					right: "auto",
					bottom: "auto",
					left: "auto"
				};

				function _(e) {
					var t, n = e.popper,
						r = e.popperRect,
						o = e.placement,
						i = e.variation,
						a = e.offsets,
						l = e.position,
						c = e.gpuAcceleration,
						u = e.adaptive,
						f = e.roundOffsets,
						d = e.isFixed,
						h = a.x,
						v = void 0 === h ? 0 : h,
						m = a.y,
						g = void 0 === m ? 0 : m,
						y = "function" == typeof f ? f({
							x: v,
							y: g
						}) : {
							x: v,
							y: g
						};
					v = y.x, g = y.y;
					var w = a.hasOwnProperty("x"),
						M = a.hasOwnProperty("y"),
						z = N.t$,
						k = N.we,
						C = window;
					if (u) {
						var S = E(n),
							T = "clientHeight",
							P = "clientWidth";
						S === s(n) && "static" !== b(S = x(n)).position && "absolute" === l && (T = "scrollHeight", P = "scrollWidth"), S = S, (o === N.we || (o === N.t$ || o === N.F2) && i === N.ut) && (k = N.I, g -= (d && S === C && C.visualViewport ? C.visualViewport.height : S[T]) - r.height, g *= c ? 1 : -1), o !== N.t$ && (o !== N.we && o !== N.I || i !== N.ut) || (z = N.F2, v -= (d && S === C && C.visualViewport ? C.visualViewport.width : S[P]) - r.width, v *= c ? 1 : -1)
					}
					var _, O = Object.assign({
							position: l
						}, u && A),
						L = !0 === f ? function(e) {
							var t = e.x,
								n = e.y,
								r = window.devicePixelRatio || 1;
							return {
								x: p(t * r) / r || 0,
								y: p(n * r) / r || 0
							}
						}({
							x: v,
							y: g
						}) : {
							x: v,
							y: g
						};
					return v = L.x, g = L.y, c ? Object.assign({}, O, ((_ = {})[k] = M ? "0" : "", _[z] = w ? "0" : "", _.transform = (C.devicePixelRatio || 1) <= 1 ? "translate(" + v + "px, " + g + "px)" : "translate3d(" + v + "px, " + g + "px, 0)", _)) : Object.assign({}, O, ((t = {})[k] = M ? g + "px" : "", t[z] = w ? v + "px" : "", t.transform = "", t))
				}
				var O = {
						passive: !0
					},
					L = {
						left: "right",
						right: "left",
						bottom: "top",
						top: "bottom"
					};

				function D(e) {
					return e.replace(/left|right|bottom|top/g, (function(e) {
						return L[e]
					}))
				}
				var B = {
					start: "end",
					end: "start"
				};

				function I(e) {
					return e.replace(/start|end/g, (function(e) {
						return B[e]
					}))
				}

				function H(e) {
					var t = s(e);
					return {
						scrollLeft: t.pageXOffset,
						scrollTop: t.pageYOffset
					}
				}

				function R(e) {
					return v(x(e)).left + H(e).scrollLeft
				}

				function q(e) {
					var t = b(e),
						n = t.overflow,
						r = t.overflowX,
						o = t.overflowY;
					return /auto|scroll|overlay|hidden/.test(n + o + r)
				}

				function j(e) {
					return ["html", "body", "#document"].indexOf(y(e)) >= 0 ? e.ownerDocument.body : u(e) && q(e) ? e : j(M(e))
				}

				function Z(e, t) {
					var n;
					void 0 === t && (t = []);
					var r = j(e),
						o = r === (null == (n = e.ownerDocument) ? void 0 : n.body),
						i = s(r),
						a = o ? [i].concat(i.visualViewport || [], q(r) ? r : []) : r,
						l = t.concat(a);
					return o ? l : l.concat(Z(M(a)))
				}

				function F(e) {
					return Object.assign({}, e, {
						left: e.x,
						top: e.y,
						right: e.x + e.width,
						bottom: e.y + e.height
					})
				}

				function V(e, t) {
					return t === N.Pj ? F(function(e) {
						var t = s(e),
							n = x(e),
							r = t.visualViewport,
							o = n.clientWidth,
							i = n.clientHeight,
							a = 0,
							l = 0;
						return r && (o = r.width, i = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (a = r.offsetLeft, l = r.offsetTop)), {
							width: o,
							height: i,
							x: a + R(e),
							y: l
						}
					}(e)) : c(t) ? function(e) {
						var t = v(e);
						return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t
					}(t) : F(function(e) {
						var t, n = x(e),
							r = H(e),
							o = null == (t = e.ownerDocument) ? void 0 : t.body,
							i = d(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0),
							a = d(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0),
							l = -r.scrollLeft + R(e),
							s = -r.scrollTop;
						return "rtl" === b(o || n).direction && (l += d(n.clientWidth, o ? o.clientWidth : 0) - i), {
							width: i,
							height: a,
							x: l,
							y: s
						}
					}(x(e)))
				}

				function Q(e) {
					var t, n = e.reference,
						r = e.element,
						o = e.placement,
						i = o ? l(o) : null,
						a = o ? P(o) : null,
						s = n.x + n.width / 2 - r.width / 2,
						c = n.y + n.height / 2 - r.height / 2;
					switch (i) {
						case N.we:
							t = {
								x: s,
								y: n.y - r.height
							};
							break;
						case N.I:
							t = {
								x: s,
								y: n.y + n.height
							};
							break;
						case N.F2:
							t = {
								x: n.x + n.width,
								y: c
							};
							break;
						case N.t$:
							t = {
								x: n.x - r.width,
								y: c
							};
							break;
						default:
							t = {
								x: n.x,
								y: n.y
							}
					}
					var u = i ? k(i) : null;
					if (null != u) {
						var f = "y" === u ? "height" : "width";
						switch (a) {
							case N.BL:
								t[u] = t[u] - (n[f] / 2 - r[f] / 2);
								break;
							case N.ut:
								t[u] = t[u] + (n[f] / 2 - r[f] / 2)
						}
					}
					return t
				}

				function U(e, t) {
					void 0 === t && (t = {});
					var n = t,
						r = n.placement,
						o = void 0 === r ? e.placement : r,
						i = n.boundary,
						a = void 0 === i ? N.zV : i,
						l = n.rootBoundary,
						s = void 0 === l ? N.Pj : l,
						f = n.elementContext,
						p = void 0 === f ? N.k5 : f,
						m = n.altBoundary,
						w = void 0 !== m && m,
						z = n.padding,
						k = void 0 === z ? 0 : z,
						C = S("number" != typeof k ? k : T(k, N.mv)),
						P = p === N.k5 ? N.YP : N.k5,
						A = e.rects.popper,
						_ = e.elements[w ? P : p],
						O = function(e, t, n) {
							var r = "clippingParents" === t ? function(e) {
									var t = Z(M(e)),
										n = ["absolute", "fixed"].indexOf(b(e).position) >= 0 && u(e) ? E(e) : e;
									return c(n) ? t.filter((function(e) {
										return c(e) && g(e, n) && "body" !== y(e)
									})) : []
								}(e) : [].concat(t),
								o = [].concat(r, [n]),
								i = o[0],
								a = o.reduce((function(t, n) {
									var r = V(e, n);
									return t.top = d(r.top, t.top), t.right = h(r.right, t.right), t.bottom = h(r.bottom, t.bottom), t.left = d(r.left, t.left), t
								}), V(e, i));
							return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a
						}(c(_) ? _ : _.contextElement || x(e.elements.popper), a, s),
						L = v(e.elements.reference),
						D = Q({
							reference: L,
							element: A,
							strategy: "absolute",
							placement: o
						}),
						B = F(Object.assign({}, A, D)),
						I = p === N.k5 ? B : L,
						H = {
							top: O.top - I.top + C.top,
							bottom: I.bottom - O.bottom + C.bottom,
							left: O.left - I.left + C.left,
							right: I.right - O.right + C.right
						},
						R = e.modifiersData.offset;
					if (p === N.k5 && R) {
						var q = R[o];
						Object.keys(H).forEach((function(e) {
							var t = [N.F2, N.I].indexOf(e) >= 0 ? 1 : -1,
								n = [N.we, N.I].indexOf(e) >= 0 ? "y" : "x";
							H[e] += q[n] * t
						}))
					}
					return H
				}

				function K(e, t, n) {
					return void 0 === n && (n = {
						x: 0,
						y: 0
					}), {
						top: e.top - t.height - n.y,
						right: e.right - t.width + n.x,
						bottom: e.bottom - t.height + n.y,
						left: e.left - t.width - n.x
					}
				}

				function W(e) {
					return [N.we, N.F2, N.I, N.t$].some((function(t) {
						return e[t] >= 0
					}))
				}

				function $(e, t, n) {
					void 0 === n && (n = !1);
					var r, o, i = u(t),
						a = u(t) && function(e) {
							var t = e.getBoundingClientRect(),
								n = p(t.width) / e.offsetWidth || 1,
								r = p(t.height) / e.offsetHeight || 1;
							return 1 !== n || 1 !== r
						}(t),
						l = x(t),
						c = v(e, a),
						f = {
							scrollLeft: 0,
							scrollTop: 0
						},
						d = {
							x: 0,
							y: 0
						};
					return (i || !i && !n) && (("body" !== y(t) || q(l)) && (f = (r = t) !== s(r) && u(r) ? {
						scrollLeft: (o = r).scrollLeft,
						scrollTop: o.scrollTop
					} : H(r)), u(t) ? ((d = v(t, !0)).x += t.clientLeft, d.y += t.clientTop) : l && (d.x = R(l))), {
						x: c.left + f.scrollLeft - d.x,
						y: c.top + f.scrollTop - d.y,
						width: c.width,
						height: c.height
					}
				}

				function Y(e) {
					var t = new Map,
						n = new Set,
						r = [];

					function o(e) {
						n.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach((function(e) {
							if (!n.has(e)) {
								var r = t.get(e);
								r && o(r)
							}
						})), r.push(e)
					}
					return e.forEach((function(e) {
						t.set(e.name, e)
					})), e.forEach((function(e) {
						n.has(e.name) || o(e)
					})), r
				}
				var G = {
					placement: "bottom",
					modifiers: [],
					strategy: "absolute"
				};

				function X() {
					for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
					return !t.some((function(e) {
						return !(e && "function" == typeof e.getBoundingClientRect)
					}))
				}
				var J = function(e) {
						void 0 === e && (e = {});
						var t = e,
							n = t.defaultModifiers,
							r = void 0 === n ? [] : n,
							o = t.defaultOptions,
							i = void 0 === o ? G : o;
						return function(e, t, n) {
							void 0 === n && (n = i);
							var o, a, l = {
									placement: "bottom",
									orderedModifiers: [],
									options: Object.assign({}, G, i),
									modifiersData: {},
									elements: {
										reference: e,
										popper: t
									},
									attributes: {},
									styles: {}
								},
								s = [],
								u = !1,
								f = {
									state: l,
									setOptions: function(n) {
										var o = "function" == typeof n ? n(l.options) : n;
										d(), l.options = Object.assign({}, i, l.options, o), l.scrollParents = {
											reference: c(e) ? Z(e) : e.contextElement ? Z(e.contextElement) : [],
											popper: Z(t)
										};
										var a, u, h = function(e) {
											var t = Y(e);
											return N.xs.reduce((function(e, n) {
												return e.concat(t.filter((function(e) {
													return e.phase === n
												})))
											}), [])
										}((a = [].concat(r, l.options.modifiers), u = a.reduce((function(e, t) {
											var n = e[t.name];
											return e[t.name] = n ? Object.assign({}, n, t, {
												options: Object.assign({}, n.options, t.options),
												data: Object.assign({}, n.data, t.data)
											}) : t, e
										}), {}), Object.keys(u).map((function(e) {
											return u[e]
										}))));
										return l.orderedModifiers = h.filter((function(e) {
											return e.enabled
										})), l.orderedModifiers.forEach((function(e) {
											var t = e.name,
												n = e.options,
												r = void 0 === n ? {} : n,
												o = e.effect;
											if ("function" == typeof o) {
												var i = o({
													state: l,
													name: t,
													instance: f,
													options: r
												});
												s.push(i || function() {})
											}
										})), f.update()
									},
									forceUpdate: function() {
										if (!u) {
											var e = l.elements,
												t = e.reference,
												n = e.popper;
											if (X(t, n)) {
												l.rects = {
													reference: $(t, E(n), "fixed" === l.options.strategy),
													popper: m(n)
												}, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach((function(e) {
													return l.modifiersData[e.name] = Object.assign({}, e.data)
												}));
												for (var r = 0; r < l.orderedModifiers.length; r++)
													if (!0 !== l.reset) {
														var o = l.orderedModifiers[r],
															i = o.fn,
															a = o.options,
															s = void 0 === a ? {} : a,
															c = o.name;
														"function" == typeof i && (l = i({
															state: l,
															options: s,
															name: c,
															instance: f
														}) || l)
													} else l.reset = !1, r = -1
											}
										}
									},
									update: (o = function() {
										return new Promise((function(e) {
											f.forceUpdate(), e(l)
										}))
									}, function() {
										return a || (a = new Promise((function(e) {
											Promise.resolve().then((function() {
												a = void 0, e(o())
											}))
										}))), a
									}),
									destroy: function() {
										d(), u = !0
									}
								};
							if (!X(e, t)) return f;

							function d() {
								s.forEach((function(e) {
									return e()
								})), s = []
							}
							return f.setOptions(n).then((function(e) {
								!u && n.onFirstUpdate && n.onFirstUpdate(e)
							})), f
						}
					}({
						defaultModifiers: [{
							name: "hide",
							enabled: !0,
							phase: "main",
							requiresIfExists: ["preventOverflow"],
							fn: function(e) {
								var t = e.state,
									n = e.name,
									r = t.rects.reference,
									o = t.rects.popper,
									i = t.modifiersData.preventOverflow,
									a = U(t, {
										elementContext: "reference"
									}),
									l = U(t, {
										altBoundary: !0
									}),
									s = K(a, r),
									c = K(l, o, i),
									u = W(s),
									f = W(c);
								t.modifiersData[n] = {
									referenceClippingOffsets: s,
									popperEscapeOffsets: c,
									isReferenceHidden: u,
									hasPopperEscaped: f
								}, t.attributes.popper = Object.assign({}, t.attributes.popper, {
									"data-popper-reference-hidden": u,
									"data-popper-escaped": f
								})
							}
						}, {
							name: "popperOffsets",
							enabled: !0,
							phase: "read",
							fn: function(e) {
								var t = e.state,
									n = e.name;
								t.modifiersData[n] = Q({
									reference: t.rects.reference,
									element: t.rects.popper,
									strategy: "absolute",
									placement: t.placement
								})
							},
							data: {}
						}, {
							name: "computeStyles",
							enabled: !0,
							phase: "beforeWrite",
							fn: function(e) {
								var t = e.state,
									n = e.options,
									r = n.gpuAcceleration,
									o = void 0 === r || r,
									i = n.adaptive,
									a = void 0 === i || i,
									s = n.roundOffsets,
									c = void 0 === s || s,
									u = {
										placement: l(t.placement),
										variation: P(t.placement),
										popper: t.elements.popper,
										popperRect: t.rects.popper,
										gpuAcceleration: o,
										isFixed: "fixed" === t.options.strategy
									};
								null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, _(Object.assign({}, u, {
									offsets: t.modifiersData.popperOffsets,
									position: t.options.strategy,
									adaptive: a,
									roundOffsets: c
								})))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, _(Object.assign({}, u, {
									offsets: t.modifiersData.arrow,
									position: "absolute",
									adaptive: !1,
									roundOffsets: c
								})))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
									"data-popper-placement": t.placement
								})
							},
							data: {}
						}, {
							name: "eventListeners",
							enabled: !0,
							phase: "write",
							fn: function() {},
							effect: function(e) {
								var t = e.state,
									n = e.instance,
									r = e.options,
									o = r.scroll,
									i = void 0 === o || o,
									a = r.resize,
									l = void 0 === a || a,
									c = s(t.elements.popper),
									u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
								return i && u.forEach((function(e) {
										e.addEventListener("scroll", n.update, O)
									})), l && c.addEventListener("resize", n.update, O),
									function() {
										i && u.forEach((function(e) {
											e.removeEventListener("scroll", n.update, O)
										})), l && c.removeEventListener("resize", n.update, O)
									}
							},
							data: {}
						}, {
							name: "offset",
							enabled: !0,
							phase: "main",
							requires: ["popperOffsets"],
							fn: function(e) {
								var t = e.state,
									n = e.options,
									r = e.name,
									o = n.offset,
									i = void 0 === o ? [0, 0] : o,
									a = N.Ct.reduce((function(e, n) {
										return e[n] = function(e, t, n) {
											var r = l(e),
												o = [N.t$, N.we].indexOf(r) >= 0 ? -1 : 1,
												i = "function" == typeof n ? n(Object.assign({}, t, {
													placement: e
												})) : n,
												a = i[0],
												s = i[1];
											return a = a || 0, s = (s || 0) * o, [N.t$, N.F2].indexOf(r) >= 0 ? {
												x: s,
												y: a
											} : {
												x: a,
												y: s
											}
										}(n, t.rects, i), e
									}), {}),
									s = a[t.placement],
									c = s.x,
									u = s.y;
								null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = a
							}
						}, {
							name: "flip",
							enabled: !0,
							phase: "main",
							fn: function(e) {
								var t = e.state,
									n = e.options,
									r = e.name;
								if (!t.modifiersData[r]._skip) {
									for (var o = n.mainAxis, i = void 0 === o || o, a = n.altAxis, s = void 0 === a || a, c = n.fallbackPlacements, u = n.padding, f = n.boundary, d = n.rootBoundary, h = n.altBoundary, p = n.flipVariations, v = void 0 === p || p, m = n.allowedAutoPlacements, g = t.options.placement, y = l(g), b = c || (y !== g && v ? function(e) {
											if (l(e) === N.d7) return [];
											var t = D(e);
											return [I(e), t, I(t)]
										}(g) : [D(g)]), w = [g].concat(b).reduce((function(e, n) {
											return e.concat(l(n) === N.d7 ? function(e, t) {
												void 0 === t && (t = {});
												var n = t,
													r = n.placement,
													o = n.boundary,
													i = n.rootBoundary,
													a = n.padding,
													s = n.flipVariations,
													c = n.allowedAutoPlacements,
													u = void 0 === c ? N.Ct : c,
													f = P(r),
													d = f ? s ? N.bw : N.bw.filter((function(e) {
														return P(e) === f
													})) : N.mv,
													h = d.filter((function(e) {
														return u.indexOf(e) >= 0
													}));
												0 === h.length && (h = d);
												var p = h.reduce((function(t, n) {
													return t[n] = U(e, {
														placement: n,
														boundary: o,
														rootBoundary: i,
														padding: a
													})[l(n)], t
												}), {});
												return Object.keys(p).sort((function(e, t) {
													return p[e] - p[t]
												}))
											}(t, {
												placement: n,
												boundary: f,
												rootBoundary: d,
												padding: u,
												flipVariations: v,
												allowedAutoPlacements: m
											}) : n)
										}), []), x = t.rects.reference, M = t.rects.popper, z = new Map, E = !0, k = w[0], C = 0; C < w.length; C++) {
										var S = w[C],
											T = l(S),
											A = P(S) === N.BL,
											_ = [N.we, N.I].indexOf(T) >= 0,
											O = _ ? "width" : "height",
											L = U(t, {
												placement: S,
												boundary: f,
												rootBoundary: d,
												altBoundary: h,
												padding: u
											}),
											B = _ ? A ? N.F2 : N.t$ : A ? N.I : N.we;
										x[O] > M[O] && (B = D(B));
										var H = D(B),
											R = [];
										if (i && R.push(L[T] <= 0), s && R.push(L[B] <= 0, L[H] <= 0), R.every((function(e) {
												return e
											}))) {
											k = S, E = !1;
											break
										}
										z.set(S, R)
									}
									if (E)
										for (var q = function(e) {
												var t = w.find((function(t) {
													var n = z.get(t);
													if (n) return n.slice(0, e).every((function(e) {
														return e
													}))
												}));
												if (t) return k = t, "break"
											}, j = v ? 3 : 1; j > 0 && "break" !== q(j); j--);
									t.placement !== k && (t.modifiersData[r]._skip = !0, t.placement = k, t.reset = !0)
								}
							},
							requiresIfExists: ["offset"],
							data: {
								_skip: !1
							}
						}, {
							name: "preventOverflow",
							enabled: !0,
							phase: "main",
							fn: function(e) {
								var t = e.state,
									n = e.options,
									r = e.name,
									o = n.mainAxis,
									i = void 0 === o || o,
									a = n.altAxis,
									s = void 0 !== a && a,
									c = n.boundary,
									u = n.rootBoundary,
									f = n.altBoundary,
									p = n.padding,
									v = n.tether,
									g = void 0 === v || v,
									y = n.tetherOffset,
									b = void 0 === y ? 0 : y,
									w = U(t, {
										boundary: c,
										rootBoundary: u,
										padding: p,
										altBoundary: f
									}),
									x = l(t.placement),
									M = P(t.placement),
									z = !M,
									S = k(x),
									T = "x" === S ? "y" : "x",
									A = t.modifiersData.popperOffsets,
									_ = t.rects.reference,
									O = t.rects.popper,
									L = "function" == typeof b ? b(Object.assign({}, t.rects, {
										placement: t.placement
									})) : b,
									D = "number" == typeof L ? {
										mainAxis: L,
										altAxis: L
									} : Object.assign({
										mainAxis: 0,
										altAxis: 0
									}, L),
									B = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
									I = {
										x: 0,
										y: 0
									};
								if (A) {
									if (i) {
										var H, R = "y" === S ? N.we : N.t$,
											q = "y" === S ? N.I : N.F2,
											j = "y" === S ? "height" : "width",
											Z = A[S],
											F = Z + w[R],
											V = Z - w[q],
											Q = g ? -O[j] / 2 : 0,
											K = M === N.BL ? _[j] : O[j],
											W = M === N.BL ? -O[j] : -_[j],
											$ = t.elements.arrow,
											Y = g && $ ? m($) : {
												width: 0,
												height: 0
											},
											G = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
												top: 0,
												right: 0,
												bottom: 0,
												left: 0
											},
											X = G[R],
											J = G[q],
											ee = C(0, _[j], Y[j]),
											te = z ? _[j] / 2 - Q - ee - X - D.mainAxis : K - ee - X - D.mainAxis,
											ne = z ? -_[j] / 2 + Q + ee + J + D.mainAxis : W + ee + J + D.mainAxis,
											re = t.elements.arrow && E(t.elements.arrow),
											oe = re ? "y" === S ? re.clientTop || 0 : re.clientLeft || 0 : 0,
											ie = null != (H = null == B ? void 0 : B[S]) ? H : 0,
											ae = Z + ne - ie,
											le = C(g ? h(F, Z + te - ie - oe) : F, Z, g ? d(V, ae) : V);
										A[S] = le, I[S] = le - Z
									}
									if (s) {
										var se, ce = "x" === S ? N.we : N.t$,
											ue = "x" === S ? N.I : N.F2,
											fe = A[T],
											de = "y" === T ? "height" : "width",
											he = fe + w[ce],
											pe = fe - w[ue],
											ve = -1 !== [N.we, N.t$].indexOf(x),
											me = null != (se = null == B ? void 0 : B[T]) ? se : 0,
											ge = ve ? he : fe - _[de] - O[de] - me + D.altAxis,
											ye = ve ? fe + _[de] + O[de] - me - D.altAxis : pe,
											be = g && ve ? function(e, t, n) {
												var r = C(e, t, n);
												return r > n ? n : r
											}(ge, fe, ye) : C(g ? ge : he, fe, g ? ye : pe);
										A[T] = be, I[T] = be - fe
									}
									t.modifiersData[r] = I
								}
							},
							requiresIfExists: ["offset"]
						}, {
							name: "arrow",
							enabled: !0,
							phase: "main",
							fn: function(e) {
								var t, n = e.state,
									r = e.name,
									o = e.options,
									i = n.elements.arrow,
									a = n.modifiersData.popperOffsets,
									s = l(n.placement),
									c = k(s),
									u = [N.t$, N.F2].indexOf(s) >= 0 ? "height" : "width";
								if (i && a) {
									var f = function(e, t) {
											return S("number" != typeof(e = "function" == typeof e ? e(Object.assign({}, t.rects, {
												placement: t.placement
											})) : e) ? e : T(e, N.mv))
										}(o.padding, n),
										d = m(i),
										h = "y" === c ? N.we : N.t$,
										p = "y" === c ? N.I : N.F2,
										v = n.rects.reference[u] + n.rects.reference[c] - a[c] - n.rects.popper[u],
										g = a[c] - n.rects.reference[c],
										y = E(i),
										b = y ? "y" === c ? y.clientHeight || 0 : y.clientWidth || 0 : 0,
										w = v / 2 - g / 2,
										x = f[h],
										M = b - d[u] - f[p],
										z = b / 2 - d[u] / 2 + w,
										P = C(x, z, M),
										A = c;
									n.modifiersData[r] = ((t = {})[A] = P, t.centerOffset = P - z, t)
								}
							},
							effect: function(e) {
								var t = e.state,
									n = e.options.element,
									r = void 0 === n ? "[data-popper-arrow]" : n;
								null != r && ("string" != typeof r || (r = t.elements.popper.querySelector(r))) && g(t.elements.popper, r) && (t.elements.arrow = r)
							},
							requires: ["popperOffsets"],
							requiresIfExists: ["preventOverflow"]
						}]
					}),
					ee = function(e) {
						return {
							position: e,
							top: "0",
							left: "0",
							opacity: "0",
							pointerEvents: "none"
						}
					},
					te = {
						name: "applyStyles",
						enabled: !1
					},
					ne = {
						name: "ariaDescribedBy",
						enabled: !0,
						phase: "afterWrite",
						effect: function(e) {
							var t = e.state;
							return function() {
								var e = t.elements,
									n = e.reference,
									r = e.popper;
								if ("removeAttribute" in n) {
									var o = (n.getAttribute("aria-describedby") || "").split(",").filter((function(e) {
										return e.trim() !== r.id
									}));
									o.length ? n.setAttribute("aria-describedby", o.join(",")) : n.removeAttribute("aria-describedby")
								}
							}
						},
						fn: function(e) {
							var t, n = e.state.elements,
								r = n.popper,
								o = n.reference,
								i = null == (t = r.getAttribute("role")) ? void 0 : t.toLowerCase();
							if (r.id && "tooltip" === i && "setAttribute" in o) {
								var a = o.getAttribute("aria-describedby");
								if (a && -1 !== a.split(",").indexOf(r.id)) return;
								o.setAttribute("aria-describedby", a ? a + "," + r.id : r.id)
							}
						}
					},
					re = [],
					oe = function(e, t, n) {
						var l, s, c = void 0 === n ? {} : n,
							u = c.enabled,
							f = void 0 === u || u,
							d = c.placement,
							h = void 0 === d ? "bottom" : d,
							p = c.strategy,
							v = void 0 === p ? "absolute" : p,
							m = c.modifiers,
							g = void 0 === m ? re : m,
							y = (0, o.Z)(c, ["enabled", "placement", "strategy", "modifiers"]),
							b = (0, i.useRef)(),
							w = (0, i.useCallback)((function() {
								var e;
								null == (e = b.current) || e.update()
							}), []),
							x = (0, i.useCallback)((function() {
								var e;
								null == (e = b.current) || e.forceUpdate()
							}), []),
							M = (l = (0, i.useState)({
								placement: h,
								update: w,
								forceUpdate: x,
								attributes: {},
								styles: {
									popper: ee(v),
									arrow: {}
								}
							}), s = (0, a.Z)(), [l[0], (0, i.useCallback)((function(e) {
								if (s()) return l[1](e)
							}), [s, l[1]])]),
							z = M[0],
							E = M[1],
							k = (0, i.useMemo)((function() {
								return {
									name: "updateStateModifier",
									enabled: !0,
									phase: "write",
									requires: ["computeStyles"],
									fn: function(e) {
										var t = e.state,
											n = {},
											r = {};
										Object.keys(t.elements).forEach((function(e) {
											n[e] = t.styles[e], r[e] = t.attributes[e]
										})), E({
											state: t,
											styles: n,
											attributes: r,
											update: w,
											forceUpdate: x,
											placement: t.placement
										})
									}
								}
							}), [w, x, E]);
						return (0, i.useEffect)((function() {
							b.current && f && b.current.setOptions({
								placement: h,
								strategy: v,
								modifiers: [].concat(g, [k, te])
							})
						}), [v, h, k, f]), (0, i.useEffect)((function() {
							if (f && null != e && null != t) return b.current = J(e, t, (0, r.Z)({}, y, {
									placement: h,
									strategy: v,
									modifiers: [].concat(g, [ne, k])
								})),
								function() {
									null != b.current && (b.current.destroy(), b.current = void 0, E((function(e) {
										return (0, r.Z)({}, e, {
											attributes: {},
											styles: {
												popper: ee(v)
											}
										})
									})))
								}
						}), [f, e, t]), z
					}
			},
			3676: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return h
					}
				});
				var r = n(424),
					o = n(3299),
					i = n(7294),
					a = n(6895),
					l = n(2473),
					s = n.n(l),
					c = n(7216),
					u = n(6390),
					f = function() {},
					d = function(e) {
						return e && ("current" in e ? e.current : e)
					},
					h = function(e, t, n) {
						var l = void 0 === n ? {} : n,
							h = l.disabled,
							p = l.clickTrigger,
							v = void 0 === p ? "click" : p,
							m = (0, i.useRef)(!1),
							g = t || f,
							y = (0, i.useCallback)((function(t) {
								var n, o = d(e);
								s()(!!o, "RootClose captured a close event but does not have a ref to compare it to. useRootClose(), should be passed a ref that resolves to a DOM node"), m.current = !(o && (n = t, !(n.metaKey || n.altKey || n.ctrlKey || n.shiftKey)) && function(e) {
									return 0 === e.button
								}(t) && !(0, r.Z)(o, t.target))
							}), [e]),
							b = (0, a.Z)((function(e) {
								m.current || g(e)
							})),
							w = (0, a.Z)((function(e) {
								27 === e.keyCode && g(e)
							}));
						(0, i.useEffect)((function() {
							if (!h && null != e) {
								var t, n = window.event,
									r = (t = d(e), (0, c.Z)((0, u.Z)(t))),
									i = (0, o.Z)(r, v, y, !0),
									a = (0, o.Z)(r, v, (function(e) {
										e !== n ? b(e) : n = void 0
									})),
									l = (0, o.Z)(r, "keyup", (function(e) {
										e !== n ? w(e) : n = void 0
									})),
									s = [];
								return "ontouchstart" in r.documentElement && (s = [].slice.call(r.body.children).map((function(e) {
										return (0, o.Z)(e, "mousemove", f)
									}))),
									function() {
										i(), a(), l(), s.forEach((function(e) {
											return e()
										}))
									}
							}
						}), [e, h, v, y, b, w])
					}
			},
			890: function(e, t, n) {
				"use strict";
				n.d(t, {
					we: function() {
						return r
					},
					I: function() {
						return o
					},
					F2: function() {
						return i
					},
					t$: function() {
						return a
					},
					d7: function() {
						return l
					},
					mv: function() {
						return s
					},
					BL: function() {
						return c
					},
					ut: function() {
						return u
					},
					zV: function() {
						return f
					},
					Pj: function() {
						return d
					},
					k5: function() {
						return h
					},
					YP: function() {
						return p
					},
					bw: function() {
						return v
					},
					Ct: function() {
						return m
					},
					xs: function() {
						return g
					}
				});
				var r = "top",
					o = "bottom",
					i = "right",
					a = "left",
					l = "auto",
					s = [r, o, i, a],
					c = "start",
					u = "end",
					f = "clippingParents",
					d = "viewport",
					h = "popper",
					p = "reference",
					v = s.reduce((function(e, t) {
						return e.concat([t + "-" + c, t + "-" + u])
					}), []),
					m = [].concat(s, [l]).reduce((function(e, t) {
						return e.concat([t, t + "-" + c, t + "-" + u])
					}), []),
					g = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"]
			},
			7881: function(e, t, n) {
				"use strict";
				var r = n(2055);

				function o() {}

				function i() {}
				i.resetWarningCache = o, e.exports = function() {
					function e(e, t, n, o, i, a) {
						if (a !== r) {
							var l = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
							throw l.name = "Invariant Violation", l
						}
					}

					function t() {
						return e
					}
					e.isRequired = e;
					var n = {
						array: e,
						bigint: e,
						bool: e,
						func: e,
						number: e,
						object: e,
						string: e,
						symbol: e,
						any: e,
						arrayOf: t,
						element: e,
						elementType: e,
						instanceOf: t,
						node: e,
						objectOf: t,
						oneOf: t,
						oneOfType: t,
						shape: t,
						exact: t,
						checkPropTypes: i,
						resetWarningCache: o
					};
					return n.PropTypes = n, n
				}
			},
			9085: function(e, t, n) {
				e.exports = n(7881)()
			},
			2055: function(e) {
				"use strict";
				e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
			},
			2408: function(e, t, n) {
				"use strict";
				var r = n(7418),
					o = 60103,
					i = 60106;
				t.Fragment = 60107, t.StrictMode = 60108, t.Profiler = 60114;
				var a = 60109,
					l = 60110,
					s = 60112;
				t.Suspense = 60113;
				var c = 60115,
					u = 60116;
				if ("function" == typeof Symbol && Symbol.for) {
					var f = Symbol.for;
					o = f("react.element"), i = f("react.portal"), t.Fragment = f("react.fragment"), t.StrictMode = f("react.strict_mode"), t.Profiler = f("react.profiler"), a = f("react.provider"), l = f("react.context"), s = f("react.forward_ref"), t.Suspense = f("react.suspense"), c = f("react.memo"), u = f("react.lazy")
				}
				var d = "function" == typeof Symbol && Symbol.iterator;

				function h(e) {
					for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
					return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
				}
				var p = {
						isMounted: function() {
							return !1
						},
						enqueueForceUpdate: function() {},
						enqueueReplaceState: function() {},
						enqueueSetState: function() {}
					},
					v = {};

				function m(e, t, n) {
					this.props = e, this.context = t, this.refs = v, this.updater = n || p
				}

				function g() {}

				function y(e, t, n) {
					this.props = e, this.context = t, this.refs = v, this.updater = n || p
				}
				m.prototype.isReactComponent = {}, m.prototype.setState = function(e, t) {
					if ("object" != typeof e && "function" != typeof e && null != e) throw Error(h(85));
					this.updater.enqueueSetState(this, e, t, "setState")
				}, m.prototype.forceUpdate = function(e) {
					this.updater.enqueueForceUpdate(this, e, "forceUpdate")
				}, g.prototype = m.prototype;
				var b = y.prototype = new g;
				b.constructor = y, r(b, m.prototype), b.isPureReactComponent = !0;
				var w = {
						current: null
					},
					x = Object.prototype.hasOwnProperty,
					M = {
						key: !0,
						ref: !0,
						__self: !0,
						__source: !0
					};

				function z(e, t, n) {
					var r, i = {},
						a = null,
						l = null;
					if (null != t)
						for (r in void 0 !== t.ref && (l = t.ref), void 0 !== t.key && (a = "" + t.key), t) x.call(t, r) && !M.hasOwnProperty(r) && (i[r] = t[r]);
					var s = arguments.length - 2;
					if (1 === s) i.children = n;
					else if (1 < s) {
						for (var c = Array(s), u = 0; u < s; u++) c[u] = arguments[u + 2];
						i.children = c
					}
					if (e && e.defaultProps)
						for (r in s = e.defaultProps) void 0 === i[r] && (i[r] = s[r]);
					return {
						$$typeof: o,
						type: e,
						key: a,
						ref: l,
						props: i,
						_owner: w.current
					}
				}

				function E(e) {
					return "object" == typeof e && null !== e && e.$$typeof === o
				}
				var k = /\/+/g;

				function C(e, t) {
					return "object" == typeof e && null !== e && null != e.key ? function(e) {
						var t = {
							"=": "=0",
							":": "=2"
						};
						return "$" + e.replace(/[=:]/g, (function(e) {
							return t[e]
						}))
					}("" + e.key) : t.toString(36)
				}

				function S(e, t, n, r, a) {
					var l = typeof e;
					"undefined" !== l && "boolean" !== l || (e = null);
					var s = !1;
					if (null === e) s = !0;
					else switch (l) {
						case "string":
						case "number":
							s = !0;
							break;
						case "object":
							switch (e.$$typeof) {
								case o:
								case i:
									s = !0
							}
					}
					if (s) return a = a(s = e), e = "" === r ? "." + C(s, 0) : r, Array.isArray(a) ? (n = "", null != e && (n = e.replace(k, "$&/") + "/"), S(a, t, n, "", (function(e) {
						return e
					}))) : null != a && (E(a) && (a = function(e, t) {
						return {
							$$typeof: o,
							type: e.type,
							key: t,
							ref: e.ref,
							props: e.props,
							_owner: e._owner
						}
					}(a, n + (!a.key || s && s.key === a.key ? "" : ("" + a.key).replace(k, "$&/") + "/") + e)), t.push(a)), 1;
					if (s = 0, r = "" === r ? "." : r + ":", Array.isArray(e))
						for (var c = 0; c < e.length; c++) {
							var u = r + C(l = e[c], c);
							s += S(l, t, n, u, a)
						} else if (u = function(e) {
								return null === e || "object" != typeof e ? null : "function" == typeof(e = d && e[d] || e["@@iterator"]) ? e : null
							}(e), "function" == typeof u)
							for (e = u.call(e), c = 0; !(l = e.next()).done;) s += S(l = l.value, t, n, u = r + C(l, c++), a);
						else if ("object" === l) throw t = "" + e, Error(h(31, "[object Object]" === t ? "object with keys {" + Object.keys(e).join(", ") + "}" : t));
					return s
				}

				function T(e, t, n) {
					if (null == e) return e;
					var r = [],
						o = 0;
					return S(e, r, "", "", (function(e) {
						return t.call(n, e, o++)
					})), r
				}

				function N(e) {
					if (-1 === e._status) {
						var t = e._result;
						t = t(), e._status = 0, e._result = t, t.then((function(t) {
							0 === e._status && (t = t.default, e._status = 1, e._result = t)
						}), (function(t) {
							0 === e._status && (e._status = 2, e._result = t)
						}))
					}
					if (1 === e._status) return e._result;
					throw e._result
				}
				var P = {
					current: null
				};

				function A() {
					var e = P.current;
					if (null === e) throw Error(h(321));
					return e
				}
				var _ = {
					ReactCurrentDispatcher: P,
					ReactCurrentBatchConfig: {
						transition: 0
					},
					ReactCurrentOwner: w,
					IsSomeRendererActing: {
						current: !1
					},
					assign: r
				};
				t.Children = {
					map: T,
					forEach: function(e, t, n) {
						T(e, (function() {
							t.apply(this, arguments)
						}), n)
					},
					count: function(e) {
						var t = 0;
						return T(e, (function() {
							t++
						})), t
					},
					toArray: function(e) {
						return T(e, (function(e) {
							return e
						})) || []
					},
					only: function(e) {
						if (!E(e)) throw Error(h(143));
						return e
					}
				}, t.Component = m, t.PureComponent = y, t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = _, t.cloneElement = function(e, t, n) {
					if (null == e) throw Error(h(267, e));
					var i = r({}, e.props),
						a = e.key,
						l = e.ref,
						s = e._owner;
					if (null != t) {
						if (void 0 !== t.ref && (l = t.ref, s = w.current), void 0 !== t.key && (a = "" + t.key), e.type && e.type.defaultProps) var c = e.type.defaultProps;
						for (u in t) x.call(t, u) && !M.hasOwnProperty(u) && (i[u] = void 0 === t[u] && void 0 !== c ? c[u] : t[u])
					}
					var u = arguments.length - 2;
					if (1 === u) i.children = n;
					else if (1 < u) {
						c = Array(u);
						for (var f = 0; f < u; f++) c[f] = arguments[f + 2];
						i.children = c
					}
					return {
						$$typeof: o,
						type: e.type,
						key: a,
						ref: l,
						props: i,
						_owner: s
					}
				}, t.createContext = function(e, t) {
					return void 0 === t && (t = null), (e = {
						$$typeof: l,
						_calculateChangedBits: t,
						_currentValue: e,
						_currentValue2: e,
						_threadCount: 0,
						Provider: null,
						Consumer: null
					}).Provider = {
						$$typeof: a,
						_context: e
					}, e.Consumer = e
				}, t.createElement = z, t.createFactory = function(e) {
					var t = z.bind(null, e);
					return t.type = e, t
				}, t.createRef = function() {
					return {
						current: null
					}
				}, t.forwardRef = function(e) {
					return {
						$$typeof: s,
						render: e
					}
				}, t.isValidElement = E, t.lazy = function(e) {
					return {
						$$typeof: u,
						_payload: {
							_status: -1,
							_result: e
						},
						_init: N
					}
				}, t.memo = function(e, t) {
					return {
						$$typeof: c,
						type: e,
						compare: void 0 === t ? null : t
					}
				}, t.useCallback = function(e, t) {
					return A().useCallback(e, t)
				}, t.useContext = function(e, t) {
					return A().useContext(e, t)
				}, t.useDebugValue = function() {}, t.useEffect = function(e, t) {
					return A().useEffect(e, t)
				}, t.useImperativeHandle = function(e, t, n) {
					return A().useImperativeHandle(e, t, n)
				}, t.useLayoutEffect = function(e, t) {
					return A().useLayoutEffect(e, t)
				}, t.useMemo = function(e, t) {
					return A().useMemo(e, t)
				}, t.useReducer = function(e, t, n) {
					return A().useReducer(e, t, n)
				}, t.useRef = function(e) {
					return A().useRef(e)
				}, t.useState = function(e) {
					return A().useState(e)
				}, t.version = "17.0.2"
			},
			7294: function(e, t, n) {
				"use strict";
				e.exports = n(2408)
			},
			2772: function(e, t, n) {
				"use strict";
				n.d(t, {
					y: function() {
						return u
					}
				});
				var r = n(3642),
					o = n(979),
					i = n(3142),
					a = n(2174),
					l = n(5050),
					s = n(2561),
					c = n(150),
					u = function() {
						function e(e) {
							this._isScalar = !1, e && (this._subscribe = e)
						}
						return e.prototype.lift = function(t) {
							var n = new e;
							return n.source = this, n.operator = t, n
						}, e.prototype.subscribe = function(e, t, n) {
							var r = this.operator,
								l = function(e, t, n) {
									if (e) {
										if (e instanceof o.L) return e;
										if (e[i.b]) return e[i.b]()
									}
									return e || t || n ? new o.L(e, t, n) : new o.L(a.c)
								}(e, t, n);
							if (r ? l.add(r.call(l, this.source)) : l.add(this.source || c.v.useDeprecatedSynchronousErrorHandling && !l.syncErrorThrowable ? this._subscribe(l) : this._trySubscribe(l)), c.v.useDeprecatedSynchronousErrorHandling && l.syncErrorThrowable && (l.syncErrorThrowable = !1, l.syncErrorThrown)) throw l.syncErrorValue;
							return l
						}, e.prototype._trySubscribe = function(e) {
							try {
								return this._subscribe(e)
							} catch (t) {
								c.v.useDeprecatedSynchronousErrorHandling && (e.syncErrorThrown = !0, e.syncErrorValue = t), (0, r._)(e) ? e.error(t) : console.warn(t)
							}
						}, e.prototype.forEach = function(e, t) {
							var n = this;
							return new(t = f(t))((function(t, r) {
								var o;
								o = n.subscribe((function(t) {
									try {
										e(t)
									} catch (e) {
										r(e), o && o.unsubscribe()
									}
								}), r, t)
							}))
						}, e.prototype._subscribe = function(e) {
							var t = this.source;
							return t && t.subscribe(e)
						}, e.prototype[l.L] = function() {
							return this
						}, e.prototype.pipe = function() {
							for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
							return 0 === e.length ? this : (0, s.U)(e)(this)
						}, e.prototype.toPromise = function(e) {
							var t = this;
							return new(e = f(e))((function(e, n) {
								var r;
								t.subscribe((function(e) {
									return r = e
								}), (function(e) {
									return n(e)
								}), (function() {
									return e(r)
								}))
							}))
						}, e.create = function(t) {
							return new e(t)
						}, e
					}();

				function f(e) {
					if (e || (e = c.v.Promise || Promise), !e) throw new Error("no Promise impl found");
					return e
				}
			},
			2174: function(e, t, n) {
				"use strict";
				n.d(t, {
					c: function() {
						return i
					}
				});
				var r = n(150),
					o = n(1644),
					i = {
						closed: !0,
						next: function(e) {},
						error: function(e) {
							if (r.v.useDeprecatedSynchronousErrorHandling) throw e;
							(0, o.z)(e)
						},
						complete: function() {}
					}
			},
			211: function(e, t, n) {
				"use strict";
				n.d(t, {
					Yc: function() {
						return u
					},
					xQ: function() {
						return f
					}
				});
				var r = n(5987),
					o = n(2772),
					i = n(979),
					a = n(8760),
					l = n(1016),
					s = n(8253),
					c = n(3142),
					u = function(e) {
						function t(t) {
							var n = e.call(this, t) || this;
							return n.destination = t, n
						}
						return r.ZT(t, e), t
					}(i.L),
					f = function(e) {
						function t() {
							var t = e.call(this) || this;
							return t.observers = [], t.closed = !1, t.isStopped = !1, t.hasError = !1, t.thrownError = null, t
						}
						return r.ZT(t, e), t.prototype[c.b] = function() {
							return new u(this)
						}, t.prototype.lift = function(e) {
							var t = new d(this, this);
							return t.operator = e, t
						}, t.prototype.next = function(e) {
							if (this.closed) throw new l.N;
							if (!this.isStopped)
								for (var t = this.observers, n = t.length, r = t.slice(), o = 0; o < n; o++) r[o].next(e)
						}, t.prototype.error = function(e) {
							if (this.closed) throw new l.N;
							this.hasError = !0, this.thrownError = e, this.isStopped = !0;
							for (var t = this.observers, n = t.length, r = t.slice(), o = 0; o < n; o++) r[o].error(e);
							this.observers.length = 0
						}, t.prototype.complete = function() {
							if (this.closed) throw new l.N;
							this.isStopped = !0;
							for (var e = this.observers, t = e.length, n = e.slice(), r = 0; r < t; r++) n[r].complete();
							this.observers.length = 0
						}, t.prototype.unsubscribe = function() {
							this.isStopped = !0, this.closed = !0, this.observers = null
						}, t.prototype._trySubscribe = function(t) {
							if (this.closed) throw new l.N;
							return e.prototype._trySubscribe.call(this, t)
						}, t.prototype._subscribe = function(e) {
							if (this.closed) throw new l.N;
							return this.hasError ? (e.error(this.thrownError), a.w.EMPTY) : this.isStopped ? (e.complete(), a.w.EMPTY) : (this.observers.push(e), new s.W(this, e))
						}, t.prototype.asObservable = function() {
							var e = new o.y;
							return e.source = this, e
						}, t.create = function(e, t) {
							return new d(e, t)
						}, t
					}(o.y),
					d = function(e) {
						function t(t, n) {
							var r = e.call(this) || this;
							return r.destination = t, r.source = n, r
						}
						return r.ZT(t, e), t.prototype.next = function(e) {
							var t = this.destination;
							t && t.next && t.next(e)
						}, t.prototype.error = function(e) {
							var t = this.destination;
							t && t.error && this.destination.error(e)
						}, t.prototype.complete = function() {
							var e = this.destination;
							e && e.complete && this.destination.complete()
						}, t.prototype._subscribe = function(e) {
							return this.source ? this.source.subscribe(e) : a.w.EMPTY
						}, t
					}(f)
			},
			8253: function(e, t, n) {
				"use strict";
				n.d(t, {
					W: function() {
						return o
					}
				});
				var r = n(5987),
					o = function(e) {
						function t(t, n) {
							var r = e.call(this) || this;
							return r.subject = t, r.subscriber = n, r.closed = !1, r
						}
						return r.ZT(t, e), t.prototype.unsubscribe = function() {
							if (!this.closed) {
								this.closed = !0;
								var e = this.subject,
									t = e.observers;
								if (this.subject = null, t && 0 !== t.length && !e.isStopped && !e.closed) {
									var n = t.indexOf(this.subscriber); - 1 !== n && t.splice(n, 1)
								}
							}
						}, t
					}(n(8760).w)
			},
			979: function(e, t, n) {
				"use strict";
				n.d(t, {
					L: function() {
						return u
					}
				});
				var r = n(5987),
					o = n(4156),
					i = n(2174),
					a = n(8760),
					l = n(3142),
					s = n(150),
					c = n(1644),
					u = function(e) {
						function t(n, r, o) {
							var a = e.call(this) || this;
							switch (a.syncErrorValue = null, a.syncErrorThrown = !1, a.syncErrorThrowable = !1, a.isStopped = !1, arguments.length) {
								case 0:
									a.destination = i.c;
									break;
								case 1:
									if (!n) {
										a.destination = i.c;
										break
									}
									if ("object" == typeof n) {
										n instanceof t ? (a.syncErrorThrowable = n.syncErrorThrowable, a.destination = n, n.add(a)) : (a.syncErrorThrowable = !0, a.destination = new f(a, n));
										break
									}
									default:
										a.syncErrorThrowable = !0, a.destination = new f(a, n, r, o)
							}
							return a
						}
						return r.ZT(t, e), t.prototype[l.b] = function() {
							return this
						}, t.create = function(e, n, r) {
							var o = new t(e, n, r);
							return o.syncErrorThrowable = !1, o
						}, t.prototype.next = function(e) {
							this.isStopped || this._next(e)
						}, t.prototype.error = function(e) {
							this.isStopped || (this.isStopped = !0, this._error(e))
						}, t.prototype.complete = function() {
							this.isStopped || (this.isStopped = !0, this._complete())
						}, t.prototype.unsubscribe = function() {
							this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this))
						}, t.prototype._next = function(e) {
							this.destination.next(e)
						}, t.prototype._error = function(e) {
							this.destination.error(e), this.unsubscribe()
						}, t.prototype._complete = function() {
							this.destination.complete(), this.unsubscribe()
						}, t.prototype._unsubscribeAndRecycle = function() {
							var e = this._parentOrParents;
							return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = e, this
						}, t
					}(a.w),
					f = function(e) {
						function t(t, n, r, a) {
							var l, s = e.call(this) || this;
							s._parentSubscriber = t;
							var c = s;
							return (0, o.m)(n) ? l = n : n && (l = n.next, r = n.error, a = n.complete, n !== i.c && (c = Object.create(n), (0, o.m)(c.unsubscribe) && s.add(c.unsubscribe.bind(c)), c.unsubscribe = s.unsubscribe.bind(s))), s._context = c, s._next = l, s._error = r, s._complete = a, s
						}
						return r.ZT(t, e), t.prototype.next = function(e) {
							if (!this.isStopped && this._next) {
								var t = this._parentSubscriber;
								s.v.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe() : this.__tryOrUnsub(this._next, e)
							}
						}, t.prototype.error = function(e) {
							if (!this.isStopped) {
								var t = this._parentSubscriber,
									n = s.v.useDeprecatedSynchronousErrorHandling;
								if (this._error) n && t.syncErrorThrowable ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe()) : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
								else if (t.syncErrorThrowable) n ? (t.syncErrorValue = e, t.syncErrorThrown = !0) : (0, c.z)(e), this.unsubscribe();
								else {
									if (this.unsubscribe(), n) throw e;
									(0, c.z)(e)
								}
							}
						}, t.prototype.complete = function() {
							var e = this;
							if (!this.isStopped) {
								var t = this._parentSubscriber;
								if (this._complete) {
									var n = function() {
										return e._complete.call(e._context)
									};
									s.v.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? (this.__tryOrSetError(t, n), this.unsubscribe()) : (this.__tryOrUnsub(n), this.unsubscribe())
								} else this.unsubscribe()
							}
						}, t.prototype.__tryOrUnsub = function(e, t) {
							try {
								e.call(this._context, t)
							} catch (e) {
								if (this.unsubscribe(), s.v.useDeprecatedSynchronousErrorHandling) throw e;
								(0, c.z)(e)
							}
						}, t.prototype.__tryOrSetError = function(e, t, n) {
							if (!s.v.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
							try {
								t.call(this._context, n)
							} catch (t) {
								return s.v.useDeprecatedSynchronousErrorHandling ? (e.syncErrorValue = t, e.syncErrorThrown = !0, !0) : ((0, c.z)(t), !0)
							}
							return !1
						}, t.prototype._unsubscribe = function() {
							var e = this._parentSubscriber;
							this._context = null, this._parentSubscriber = null, e.unsubscribe()
						}, t
					}(u)
			},
			8760: function(e, t, n) {
				"use strict";
				n.d(t, {
					w: function() {
						return l
					}
				});
				var r = n(9026),
					o = n(2009),
					i = n(4156),
					a = n(8782),
					l = function() {
						function e(e) {
							this.closed = !1, this._parentOrParents = null, this._subscriptions = null, e && (this._ctorUnsubscribe = !0, this._unsubscribe = e)
						}
						var t;
						return e.prototype.unsubscribe = function() {
							var t;
							if (!this.closed) {
								var n = this,
									l = n._parentOrParents,
									c = n._ctorUnsubscribe,
									u = n._unsubscribe,
									f = n._subscriptions;
								if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, l instanceof e) l.remove(this);
								else if (null !== l)
									for (var d = 0; d < l.length; ++d) l[d].remove(this);
								if ((0, i.m)(u)) {
									c && (this._unsubscribe = void 0);
									try {
										u.call(this)
									} catch (e) {
										t = e instanceof a.B ? s(e.errors) : [e]
									}
								}
								if ((0, r.k)(f)) {
									d = -1;
									for (var h = f.length; ++d < h;) {
										var p = f[d];
										if ((0, o.K)(p)) try {
											p.unsubscribe()
										} catch (e) {
											t = t || [], e instanceof a.B ? t = t.concat(s(e.errors)) : t.push(e)
										}
									}
								}
								if (t) throw new a.B(t)
							}
						}, e.prototype.add = function(t) {
							var n = t;
							if (!t) return e.EMPTY;
							switch (typeof t) {
								case "function":
									n = new e(t);
								case "object":
									if (n === this || n.closed || "function" != typeof n.unsubscribe) return n;
									if (this.closed) return n.unsubscribe(), n;
									if (!(n instanceof e)) {
										var r = n;
										(n = new e)._subscriptions = [r]
									}
									break;
								default:
									throw new Error("unrecognized teardown " + t + " added to Subscription.")
							}
							var o = n._parentOrParents;
							if (null === o) n._parentOrParents = this;
							else if (o instanceof e) {
								if (o === this) return n;
								n._parentOrParents = [o, this]
							} else {
								if (-1 !== o.indexOf(this)) return n;
								o.push(this)
							}
							var i = this._subscriptions;
							return null === i ? this._subscriptions = [n] : i.push(n), n
						}, e.prototype.remove = function(e) {
							var t = this._subscriptions;
							if (t) {
								var n = t.indexOf(e); - 1 !== n && t.splice(n, 1)
							}
						}, e.EMPTY = ((t = new e).closed = !0, t), e
					}();

				function s(e) {
					return e.reduce((function(e, t) {
						return e.concat(t instanceof a.B ? t.errors : t)
					}), [])
				}
			},
			150: function(e, t, n) {
				"use strict";
				n.d(t, {
					v: function() {
						return o
					}
				});
				var r = !1,
					o = {
						Promise: void 0,
						set useDeprecatedSynchronousErrorHandling(e) {
							e && (new Error).stack, r = e
						},
						get useDeprecatedSynchronousErrorHandling() {
							return r
						}
					}
			},
			5050: function(e, t, n) {
				"use strict";
				n.d(t, {
					L: function() {
						return r
					}
				});
				var r = function() {
					return "function" == typeof Symbol && Symbol.observable || "@@observable"
				}()
			},
			3142: function(e, t, n) {
				"use strict";
				n.d(t, {
					b: function() {
						return r
					}
				});
				var r = function() {
					return "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random()
				}()
			},
			1016: function(e, t, n) {
				"use strict";
				n.d(t, {
					N: function() {
						return r
					}
				});
				var r = function() {
					function e() {
						return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this
					}
					return e.prototype = Object.create(Error.prototype), e
				}()
			},
			8782: function(e, t, n) {
				"use strict";
				n.d(t, {
					B: function() {
						return r
					}
				});
				var r = function() {
					function e(e) {
						return Error.call(this), this.message = e ? e.length + " errors occurred during unsubscription:\n" + e.map((function(e, t) {
							return t + 1 + ") " + e.toString()
						})).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = e, this
					}
					return e.prototype = Object.create(Error.prototype), e
				}()
			},
			3642: function(e, t, n) {
				"use strict";
				n.d(t, {
					_: function() {
						return o
					}
				});
				var r = n(979);

				function o(e) {
					for (; e;) {
						var t = e,
							n = t.closed,
							o = t.destination,
							i = t.isStopped;
						if (n || i) return !1;
						e = o && o instanceof r.L ? o : null
					}
					return !0
				}
			},
			1644: function(e, t, n) {
				"use strict";

				function r(e) {
					setTimeout((function() {
						throw e
					}), 0)
				}
				n.d(t, {
					z: function() {
						return r
					}
				})
			},
			3608: function(e, t, n) {
				"use strict";

				function r(e) {
					return e
				}
				n.d(t, {
					y: function() {
						return r
					}
				})
			},
			9026: function(e, t, n) {
				"use strict";
				n.d(t, {
					k: function() {
						return r
					}
				});
				var r = function() {
					return Array.isArray || function(e) {
						return e && "number" == typeof e.length
					}
				}()
			},
			4156: function(e, t, n) {
				"use strict";

				function r(e) {
					return "function" == typeof e
				}
				n.d(t, {
					m: function() {
						return r
					}
				})
			},
			2009: function(e, t, n) {
				"use strict";

				function r(e) {
					return null !== e && "object" == typeof e
				}
				n.d(t, {
					K: function() {
						return r
					}
				})
			},
			2561: function(e, t, n) {
				"use strict";
				n.d(t, {
					z: function() {
						return o
					},
					U: function() {
						return i
					}
				});
				var r = n(3608);

				function o() {
					for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
					return i(e)
				}

				function i(e) {
					return 0 === e.length ? r.y : 1 === e.length ? e[0] : function(t) {
						return e.reduce((function(e, t) {
							return t(e)
						}), t)
					}
				}
			},
			5987: function(e, t, n) {
				"use strict";
				n.d(t, {
					ZT: function() {
						return o
					}
				});
				var r = function(e, t) {
					return r = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(e, t) {
						e.__proto__ = t
					} || function(e, t) {
						for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
					}, r(e, t)
				};

				function o(e, t) {
					function n() {
						this.constructor = e
					}
					r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
				}
			},
			5243: function() {
				"scrollingElement" in document || function() {
					function e(e) {
						return window.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle
					}
					var t;

					function n(e) {
						return "none" != e.display && !("collapse" == e.visibility && /^table-(.+-group|row|column)$/.test(e.display))
					}
					var r = function() {
						if (function() {
								if (!/^CSS1/.test(document.compatMode)) return !1;
								if (void 0 === t) {
									var e = document.createElement("iframe");
									e.style.height = "1px", (document.body || document.documentElement || document).appendChild(e);
									var n = e.contentWindow.document;
									n.write('<!DOCTYPE html><div style="height:9999em">x</div>'), n.close(), t = n.documentElement.scrollHeight > n.body.scrollHeight, e.parentNode.removeChild(e)
								}
								return t
							}()) return document.documentElement;
						var r = document.body;
						return (r = r && !/body/i.test(r.tagName) ? function(e) {
							for (var t, n = e; n = n.nextSibling;)
								if (1 == n.nodeType && (t = n, window.HTMLBodyElement ? t instanceof HTMLBodyElement : /body/i.test(t.tagName))) return n;
							return null
						}(r) : r) && function(t) {
							var r = e(t),
								o = e(document.documentElement);
							return "visible" != r.overflow && "visible" != o.overflow && n(r) && n(o)
						}(r) ? null : r
					};
					Object.defineProperty ? Object.defineProperty(document, "scrollingElement", {
						get: r
					}) : document.__defineGetter__ ? document.__defineGetter__("scrollingElement", r) : (document.scrollingElement = r(), document.attachEvent && document.attachEvent("onpropertychange", (function() {
						"activeElement" == window.event.propertyName && (document.scrollingElement = r())
					})))
				}()
			},
			4391: function(e, t, n) {
				"use strict";
				n.d(t, {
					U: function() {
						return d
					}
				});
				var r, o = (r = function(e, t) {
					return r = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function(e, t) {
						e.__proto__ = t
					} || function(e, t) {
						for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
					}, r(e, t)
				}, function(e, t) {
					if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

					function n() {
						this.constructor = e
					}
					r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
				});
				window.PRODUCTION = window.PRODUCTION, window.AJAX_PREFIX = window.AJAX_PREFIX;
				var i = function() {
						this.mksapEdition = 19, this.production = !0, this.remoteBaseFigureUrl = "https://d24q9ddxruqo1a.cloudfront.net/hashed_figures/", this.forceLoadVideosRemotely = !1, this.ajaxPrefix = "", this.apiPrefix = this.ajaxPrefix + "/api"
					},
					a = function(e) {
						function t() {
							var t = null !== e && e.apply(this, arguments) || this;
							return t.native = !1, t.historyOptions = t.getHistoryOptions(), t.historyType = "browser", t.baseFigureUrl = t.remoteBaseFigureUrl, t.serverUrl = "", t.inCordova = !1, t.inElectron = !1, t.syncEnabled = !1, t
						}
						return o(t, e), t.prototype.getContentPrefix = function() {
							//soheilvb
                            return "content"
                            //return "cdvfile://localhost/bundle/www/content"
						}, t.prototype.getHistoryOptions = function() {
							var e = !1;
							return "undefined" != typeof history && (e = !!history.pushState), e ? {
								root: "/app/",
								pushState: !0
							} : {
								root: "/app/#",
								pushState: !1
							}
						}, t
					}(i),
					l = function(e) {
						function t() {
							var t = null !== e && e.apply(this, arguments) || this;
							return t.native = !0, t.syncEnabled = !0, t.appVersion = "5.0.0", t.historyType = "hash", t.baseFigureUrl = "figure-images/", t.serverUrl = t.getServerUrl(), t.ajaxPrefix = t.getAjaxPrefix(), t.apiPrefix = t.ajaxPrefix + "/api", t.gaTrackingId = t.getGaTrackingId(), t.gaTrackingHostname = "mksap19-native", t
						}
						return o(t, e), t.prototype.getServerUrl = function() {
							return this.production, "https:///"
						}, t.prototype.getAjaxPrefix = function() {
							return this.production, "https:///"
						}, t.prototype.getGaTrackingId = function() {
							return "UA-2003141-34"
						}, t
					}(i),
					s = function(e) {
						function t() {
							var t = null !== e && e.apply(this, arguments) || this;
							return t.historyOptions = {
								root: "index.html#",
								pushState: !1
							}, t.inCordova = !0, t.inElectron = !1, t.hideStoreLinks = !0, t
						}
						return o(t, e), t
					}(l),
					c = function(e) {
						function t() {
							var t = null !== e && e.apply(this, arguments) || this;
							return t.inIOSApp = !0, t
						}
						return o(t, e), t.prototype.getContentPrefix = function() {
							return "cdvfile://localhost/bundle/www/content"
						}, t
					}(s),
					u = function(e) {
						function t() {
							var t = null !== e && e.apply(this, arguments) || this;
							return t.forceLoadVideosRemotely = !0, t
						}
						return o(t, e), t.prototype.getContentPrefix = function() {
							var e = cordova.file.applicationDirectory;
							return e || (e = "file:///android_asset/"), e + "www/content"
						}, t
					}(s),
					f = function(e) {
						function t() {
							var t = null !== e && e.apply(this, arguments) || this;
							return t.historyOptions = {
								root: "/index.html#",
								pushState: !1
							}, t.inCordova = !1, t.inElectron = !0, t
						}
						return o(t, e), t.prototype.getContentPrefix = function() {
							return "content"
						}, t
					}(l),
					d = window.NATIVE_APP ? "undefined" != typeof cordova ? /android/i.exec(window.navigator.userAgent) ? new u : new c : new f : new a
			},
			1147: function(e, t, n) {
				"use strict";
				var r, o = n(4391),
					i = n(1150);
				r = o.U.native ? new(function() {
					function e() {}
					return e.prototype.logIn = function(e, t) {
						return n = this, r = void 0, l = function() {
							var n, r, a, l, s;
							return function(e, t) {
								var n, r, o, i, a = {
									label: 0,
									sent: function() {
										if (1 & o[0]) throw o[1];
										return o[1]
									},
									trys: [],
									ops: []
								};
								return i = {
									next: l(0),
									throw: l(1),
									return: l(2)
								}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
									return this
								}), i;

								function l(i) {
									return function(l) {
										return function(i) {
											if (n) throw new TypeError("Generator is already executing.");
											for (; a;) try {
												if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
												switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
													case 0:
													case 1:
														o = i;
														break;
													case 4:
														return a.label++, {
															value: i[1],
															done: !1
														};
													case 5:
														a.label++, r = i[1], i = [0];
														continue;
													case 7:
														i = a.ops.pop(), a.trys.pop();
														continue;
													default:
														if (!((o = (o = a.trys).length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
															a = 0;
															continue
														}
														if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
															a.label = i[1];
															break
														}
														if (6 === i[0] && a.label < o[1]) {
															a.label = o[1], o = i;
															break
														}
														if (o && a.label < o[2]) {
															a.label = o[2], a.ops.push(i);
															break
														}
														o[2] && a.ops.pop(), a.trys.pop();
														continue
												}
												i = t.call(e, a)
											} catch (e) {
												i = [6, e], r = 0
											} finally {
												n = o = 0
											}
											if (5 & i[0]) throw i[1];
											return {
												value: i[0] ? i[1] : void 0,
												done: !0
											}
										}([i, l])
									}
								}
							}(this, (function(c) {
						
								switch (c.label) {
									case 0:

										return c.trys.push([0, 2, , 3]), [4, (0, i.jF)({
											url: o.U.ajaxPrefix + "/api/signin.json",
											type: "POST",
											data: JSON.stringify({
												username: e,
												password: t,
												generate_token: !0
											})
										})];
									case 1:
										//soheilvb
                                     //  var t = JSON.stringify(e);
                                        var userData = JSON.parse("{\"ownsProduct\":true,\"username\":\"\",\"firstName\":\"\",\"lastName\":\"\",\"acpNumber\":\"\",\"phoneNumber\":null,\"email\":\"\",\"hasComplete\":true,\"feedback\":{\"id\":null,\"user_id\":1,\"score\":null,\"prompt\":null,\"complete\":null,\"dismissed_on\":null,\"dismissed_completely\":null,\"dismissed_count\":0,\"dismissed_response_count\":null,\"created_at\":null,\"updated_at\":null},\"hasRated\":false,\"authToken\":\"\",\"starredQuestionIds\":[],\"overallSubmissionsInfo\":{\"cmeClaimed\":0,\"cmeEligible\":0,\"cmeIneligible\":200,\"cmeMaxPossible\":200,\"mocClaimed\":0,\"mocEligible\":0,\"mocIneligible\":200,\"mocMaxPossible\":200,\"pointsTotal\":200}}");
                                        n = userData;
                                        try {
                                            r = JSON.stringify(n), localStorage.setItem("loggedInUser", n)
                                        } catch(e) {}
                                        return [2, n];
									case 2:
  										var userData = JSON.parse("{\"ownsProduct\":true,\"username\":\"\",\"firstName\":\"\",\"lastName\":\"\",\"acpNumber\":\"\",\"phoneNumber\":null,\"email\":\"\",\"hasComplete\":true,\"feedback\":{\"id\":null,\"user_id\":1,\"score\":null,\"prompt\":null,\"complete\":null,\"dismissed_on\":null,\"dismissed_completely\":null,\"dismissed_count\":0,\"dismissed_response_count\":null,\"created_at\":null,\"updated_at\":null},\"hasRated\":false,\"authToken\":\"\",\"starredQuestionIds\":[],\"overallSubmissionsInfo\":{\"cmeClaimed\":0,\"cmeEligible\":0,\"cmeIneligible\":200,\"cmeMaxPossible\":200,\"mocClaimed\":0,\"mocEligible\":0,\"mocIneligible\":200,\"mocMaxPossible\":200,\"pointsTotal\":200}}");
                                        n = userData;
                                        try {
                                            r = JSON.stringify(n), localStorage.setItem("loggedInUser", n)
                                        } catch(e) {}
                                        return [2, n];
										throw a = c.sent(), l = a.response, window.hresponse = l, s = "There was an error logging in.", l ? 0 === l.status ? new Error("Could not reach MKSAP 19 servers. Please ensure you are connected to the internet and try again.") : a.friendlyErrorMessage ? a : new Error(s) : new Error(s);
									case 3:
										return [2]
								}
							}))
						}, new((a = void 0) || (a = Promise))((function(e, t) {
							function o(e) {
								try {
									s(l.next(e))
								} catch (e) {
									t(e)
								}
							}

							function i(e) {
								try {
									s(l.throw(e))
								} catch (e) {
									t(e)
								}
							}

							function s(t) {
								var n;
								t.done ? e(t.value) : (n = t.value, n instanceof a ? n : new a((function(e) {
									e(n)
								}))).then(o, i)
							}
							s((l = l.apply(n, r || [])).next())
						}));
						var n, r, a, l
					}, e.prototype.logOut = function() {
						//soheilvb
						//localStorage.removeItem("loggedInUser"), window.location = "index.html"
					}, e.prototype.getSavedLoggedInUser = function() {
						return ;
						var userData = JSON.parse("{\"ownsProduct\":true,\"username\":\"\",\"firstName\":\"\",\"lastName\":\"\",\"acpNumber\":\"\",\"phoneNumber\":null,\"email\":\"\",\"hasComplete\":true,\"feedback\":{\"id\":null,\"user_id\":1,\"score\":null,\"prompt\":null,\"complete\":null,\"dismissed_on\":null,\"dismissed_completely\":null,\"dismissed_count\":0,\"dismissed_response_count\":null,\"created_at\":null,\"updated_at\":null},\"hasRated\":false,\"authToken\":\"\",\"starredQuestionIds\":[],\"overallSubmissionsInfo\":{\"cmeClaimed\":0,\"cmeEligible\":0,\"cmeIneligible\":200,\"cmeMaxPossible\":200,\"mocClaimed\":0,\"mocEligible\":0,\"mocIneligible\":200,\"mocMaxPossible\":200,\"pointsTotal\":200}}");
                         return userData;
						//soheilvb

                                        var userData = JSON.parse("{\"ownsProduct\":true,\"username\":\"\",\"firstName\":\"\",\"lastName\":\"\",\"acpNumber\":\"\",\"phoneNumber\":null,\"email\":\"\",\"hasComplete\":true,\"feedback\":{\"id\":null,\"user_id\":1,\"score\":null,\"prompt\":null,\"complete\":null,\"dismissed_on\":null,\"dismissed_completely\":null,\"dismissed_count\":0,\"dismissed_response_count\":null,\"created_at\":null,\"updated_at\":null},\"hasRated\":false,\"authToken\":\"\",\"starredQuestionIds\":[],\"overallSubmissionsInfo\":{\"cmeClaimed\":0,\"cmeEligible\":0,\"cmeIneligible\":200,\"cmeMaxPossible\":200,\"mocClaimed\":0,\"mocEligible\":0,\"mocIneligible\":200,\"mocMaxPossible\":200,\"pointsTotal\":200}}");
                                        n = userData;
                                        try {
                                            r = JSON.stringify(n), localStorage.setItem("loggedInUser", n)
                                        } catch(e) {}
						try {
							var e = localStorage.getItem("loggedInUser");
							if (e) return JSON.parse(e)
						} catch (e) {}
					}, e
				}()) : new(function() {
					function e() {}
					return e.prototype.logOut = function() {
						window.location = "/signout"
					}, e.prototype.logIn = function() {
						throw new Error("Not implemented in WebLoginBackend")
					}, e.prototype.getSavedLoggedInUser = function() {

						var userData = JSON.parse("{\"ownsProduct\":true,\"username\":\"\",\"firstName\":\"\",\"lastName\":\"\",\"acpNumber\":\"\",\"phoneNumber\":null,\"email\":\"\",\"hasComplete\":true,\"feedback\":{\"id\":null,\"user_id\":1,\"score\":null,\"prompt\":null,\"complete\":null,\"dismissed_on\":null,\"dismissed_completely\":null,\"dismissed_count\":0,\"dismissed_response_count\":null,\"created_at\":null,\"updated_at\":null},\"hasRated\":false,\"authToken\":\"\",\"starredQuestionIds\":[],\"overallSubmissionsInfo\":{\"cmeClaimed\":0,\"cmeEligible\":0,\"cmeIneligible\":200,\"cmeMaxPossible\":200,\"mocClaimed\":0,\"mocEligible\":0,\"mocIneligible\":200,\"mocMaxPossible\":200,\"pointsTotal\":200}}");
                         return userData;
						throw new Error("Not implemented in WebLoginBackend")
					}, e
				}()), t.Z = r
			},
			897: function(e, t, n) {
				"use strict";
				n.d(t, {
					V: function() {
						return o
					}
				});
				var r = n(7294);

				function o(e) {
					return {
						onKeyDown: (0, r.useCallback)((function(t) {
							e.current && document.activeElement === e.current && (" " === t.key ? t.preventDefault() : "Enter" === t.key && e.current.click())
						}), [e]),
						onKeyUp: (0, r.useCallback)((function(t) {
							e.current && document.activeElement === e.current && " " === t.key && e.current.click()
						}), [e])
					}
				}
			},
			3427: function(e, t, n) {
				"use strict";
				n.d(t, {
					x: function() {
						return o
					}
				});
				var r = n(7294);

				function o(e) {
					void 0 === e && (e = !1);
					var t = (0, r.useState)(e),
						n = t[0],
						o = t[1],
						i = (0, r.useCallback)((function() {
							o(!0)
						}), [o]),
						a = (0, r.useCallback)((function() {
							o(!1)
						}), [o]),
						l = (0, r.useCallback)((function() {
							o(!n)
						}), [n, o]);
					return {
						showing: n,
						show: i,
						hide: a,
						toggle: l
					}
				}
			},
			3356: function(e, t, n) {
				"use strict";
				n.d(t, {
					L: function() {
						return i
					}
				});
				var r = n(6749),
					o = n(7294);

				function i(e) {
					return (0, o.useState)((function() {
						return (0, r.Z)(e)
					}))[0]
				}
			},
			8801: function(e, t, n) {
				"use strict";
				n.d(t, {
					zx: function() {
						return f
					},
					X4: function() {
						return d
					},
					PO: function() {
						return h
					},
					iK: function() {
						return p
					},
					on: function() {
						return v
					},
					bt: function() {
						return m
					}
				});
				var r = n(4184),
					o = n.n(r),
					i = n(7294),
					a = n(8784),
					l = n(8765),
					s = n(5005),
					c = n(897),
					u = function() {
						return u = Object.assign || function(e) {
							for (var t, n = 1, r = arguments.length; n < r; n++)
								for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
							return e
						}, u.apply(this, arguments)
					},
					f = function(e) {
						var t = e.mkStyle,
							n = e.icon,
							r = e.iconPosition,
							a = e.loading,
							f = e.loadingMessage,
							h = e.children,
							p = e.className,
							v = e.disabled,
							m = function(e, t) {
								var n = {};
								for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
								if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
									var o = 0;
									for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
								}
								return n
							}(e, ["mkStyle", "icon", "iconPosition", "loading", "loadingMessage", "children", "className", "disabled"]),
							g = (0, i.useRef)(),
							y = t,
							b = n && "start" === r,
							w = n && "end" === r,
							x = {};
						"_blank" !== m.target || m.rel || (x.rel = "noopener noreferrer");
						var M = (v = v || a) ? "disabled-button" : "enabled-button";
						void 0 === m.as && void 0 !== m.href && (x.as = "a");
						var z = (0, c.V)(g),
							E = z.onKeyDown,
							k = z.onKeyUp;
						"a" !== m.as && "a" !== x.as || "button" !== m.role || (x.onKeyDown = m.onKeyDown || E, x.onKeyDown = m.onKeyUp || k, x.tabIndex = m.tabIndex || 0);
						var C = a && f ? f : h;
						return i.createElement(s.Z, u({
							key: M,
							ref: g
						}, m, x, {
							disabled: v,
							variant: y,
							className: o()(p)
						}), a ? i.createElement(d, null) : b && i.createElement(l.ZP, {
							name: n,
							className: "svg-icon__first"
						}), C, w && i.createElement(l.ZP, {
							name: n,
							className: "svg-icon__last"
						}))
					};
				f.defaultProps = {
					iconPosition: "end"
				};
				var d = function(e) {
					return i.createElement("svg", {
						className: "button-spinner svg-icon svg-icon__first",
						viewBox: "25 25 50 50"
					}, i.createElement("circle", {
						className: "button-spinner__path",
						cx: "50",
						cy: "50",
						r: "20",
						fill: "none",
						strokeWidth: "2",
						strokeMiterlimit: "10"
					}))
				};
				a.C.buttons.start.label, a.C.buttons.resume.label, a.C.buttons.completed.label, a.C.buttons.delete.label;
				var h = function(e) {
					return i.createElement(f, u({}, e))
				};
				h.defaultProps = {
					mkStyle: "outline-primary",
					children: a.C.buttons.cancel.label
				};
				var p = function(e) {
					return i.createElement(f, u({}, e))
				};
				p.defaultProps = {
					mkStyle: "outline-primary",
					children: "Close"
				};
				var v = function(e) {
					return i.createElement(f, u({}, e))
				};
				v.defaultProps = {
					mkStyle: "danger",
					children: a.C.buttons.dialogDelete.label
				};
				var m = function(e) {
					return i.createElement(f, u({}, e))
				};
				m.defaultProps = {
					mkStyle: "primary",
					children: a.C.buttons.dialogConfirm.label
				}
			},
			5667: function(e, t, n) {
				"use strict";
				n.d(t, {
					h: function() {
						return c
					}
				});
				var r = n(7294),
					o = n(3427),
					i = n(3356),
					a = n(9933),
					l = n(9266),
					s = function() {
						return s = Object.assign || function(e) {
							for (var t, n = 1, r = arguments.length; n < r; n++)
								for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
							return e
						}, s.apply(this, arguments)
					},
					c = function(e) {
						var t = e.content,
							n = e.children,
							c = e.onShow,
							u = e.onHide,
							f = e.className,
							d = (0, o.x)(),
							h = d.showing,
							p = d.show,
							v = d.hide,
							m = (0, r.useRef)(null),
							g = (0, i.L)(),
							y = (0, r.useRef)(null),
							b = (0, r.useRef)("top"),
							w = (0, r.useCallback)((function() {
								return v()
							}), [v]),
							x = (0, r.useCallback)((function() {
								m.current && (m.current.getBoundingClientRect().top < 170 ? b.current = "bottom" : b.current = "top"), p()
							}), [m, p, b]),
							M = (0, r.useCallback)((function() {
								y.current = (0, l.oq)(m.current, ".modal-body"), y.current || (y.current = document.querySelector("main")), y.current && y.current.addEventListener("scroll", w)
							}), [y, w, m]),
							z = (0, r.useCallback)((function() {
								u && u(), y.current && y.current.removeEventListener("scroll", w), b.current = "top"
							}), [u, y, w, b]);
						return r.createElement(r.Fragment, null, r.createElement("span", {
							onClick: x,
							className: f,
							ref: m
						}, n), r.createElement(a.aV, {
							show: h,
							target: m.current,
							rootClose: !0,
							onEnter: c,
							onHide: v,
							onEntered: M,
							onExit: z,
							placement: b.current
						}, (function(e) {
							return r.createElement(a.u, s({
								id: g
							}, e), t)
						})))
					}
			},
			8765: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return d
					},
					JO: function() {
						return f
					},
					Ad: function() {
						return h
					},
					J4: function() {
						return p
					}
				});
				var r = n(7294),
					o = n(4184),
					i = n.n(o),
					a = n(6704),
					l = n(5667),
					s = n(6749),
					c = function() {
						return c = Object.assign || function(e) {
							for (var t, n = 1, r = arguments.length; n < r; n++)
								for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
							return e
						}, c.apply(this, arguments)
					},
					u = function(e, t) {
						var n = {};
						for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
						if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
							var o = 0;
							for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
						}
						return n
					},
					f = function(e) {
						var t = e.name,
							n = e.className,
							o = (e.children, e["aria-hidden"]),
							l = e["aria-label"],
							s = e["aria-labelledby"],
							f = u(e, ["name", "className", "children", "aria-hidden", "aria-label", "aria-labelledby"]),
							d = i()("svg-icon", "svg-".concat(t), n);
						return void 0 === o && void 0 === l && void 0 === s && (o = !0), r.createElement("svg", c({
							className: d
						}, f, {
							"aria-hidden": o,
							"aria-label": l,
							"aria-labelledby": s
						}), r.createElement("use", {
							xlinkHref: (0, a.b)(t)
						}))
					},
					d = function(e) {
						var t = e.name,
							n = e.title,
							o = e.className,
							l = u(e, ["name", "title", "className"]),
							f = i()("svg-icon", "svg-".concat(t), o),
							d = (0, s.Z)("iconImage-");
						return r.createElement("svg", c({
							"aria-labelledby": d,
							role: "img",
							className: f
						}, l), r.createElement("title", {
							id: d
						}, n), r.createElement("use", {
							xlinkHref: (0, a.b)(t)
						}))
					},
					h = function() {
						return r.createElement(l.h, {
							content: r.createElement(r.Fragment, null, "Contains hospitalist content")
						}, r.createElement(f, {
							name: "hospitalist"
						}))
					},
					p = function() {
						return r.createElement(l.h, {
							content: r.createElement(r.Fragment, null, "High Value Care Recommendation")
						}, r.createElement(f, {
							name: "hvc"
						}))
					};
				t.ZP = f
			},
			9933: function(e, t, n) {
				"use strict";
				n.d(t, {
					UQ: function() {
						return tn
					},
					bZ: function() {
						return nn
					},
					Ct: function() {
						return rn
					},
					hE: function() {
						return on
					},
					Zb: function() {
						return wn
					},
					eW: function() {
						return Tn
					},
					Ol: function() {
						return Sn
					},
					ll: function() {
						return Nn
					},
					PZ: function() {
						return kn
					},
					JX: function() {
						return hn
					},
					W2: function() {
						return fn
					},
					l0: function() {
						return an
					},
					NI: function() {
						return cn
					},
					cw: function() {
						return sn
					},
					lX: function() {
						return ln
					},
					p7: function() {
						return Cn
					},
					R9: function() {
						return un
					},
					Ks: function() {
						return xn
					},
					NX: function() {
						return vn
					},
					WI: function() {
						return mn
					},
					JL: function() {
						return gn
					},
					LY: function() {
						return yn
					},
					OL: function() {
						return bn
					},
					aV: function() {
						return zn
					},
					X2: function() {
						return dn
					},
					OK: function() {
						return Mn
					},
					u: function() {
						return En
					}
				});
				var r = n(7462),
					o = n(3366),
					i = n(4184),
					a = n.n(i),
					l = n(7294),
					s = n(4289),
					c = n(6792),
					u = n(5017),
					f = l.createContext(null);
				f.displayName = "AccordionContext";
				var d = f,
					h = ["as", "children", "eventKey", "onClick"],
					p = l.forwardRef((function(e, t) {
						var n = e.as,
							i = void 0 === n ? "button" : n,
							a = e.children,
							s = e.eventKey,
							c = e.onClick,
							f = (0, o.Z)(e, h),
							p = function(e, t) {
								var n = (0, l.useContext)(d),
									r = (0, l.useContext)(u.Z);
								return function(o) {
									r && r(e === n ? null : e, o), t && t(o)
								}
							}(s, c);
						return "button" === i && (f.type = "button"), l.createElement(i, (0, r.Z)({
							ref: t,
							onClick: p
						}, f), a)
					})),
					v = n(9966),
					m = ["children", "eventKey"],
					g = l.forwardRef((function(e, t) {
						var n = e.children,
							i = e.eventKey,
							a = (0, o.Z)(e, m),
							s = (0, l.useContext)(d);
						return l.createElement(u.Z.Provider, {
							value: null
						}, l.createElement(v.Z, (0, r.Z)({
							ref: t,
							in: s === i
						}, a), l.createElement("div", null, l.Children.only(n))))
					}));
				g.displayName = "AccordionCollapse";
				var y = g,
					b = ["as", "activeKey", "bsPrefix", "children", "className", "onSelect"],
					w = l.forwardRef((function(e, t) {
						var n = (0, s.Ch)(e, {
								activeKey: "onSelect"
							}),
							i = n.as,
							f = void 0 === i ? "div" : i,
							h = n.activeKey,
							p = n.bsPrefix,
							v = n.children,
							m = n.className,
							g = n.onSelect,
							y = (0, o.Z)(n, b),
							w = a()(m, (0, c.vE)(p, "accordion"));
						return l.createElement(d.Provider, {
							value: h || null
						}, l.createElement(u.Z.Provider, {
							value: g || null
						}, l.createElement(f, (0, r.Z)({
							ref: t
						}, y, {
							className: w
						}), v)))
					}));
				w.displayName = "Accordion", w.Toggle = p, w.Collapse = y;
				var x, M = w,
					z = n(6895),
					E = n(1138),
					k = n(492),
					C = n(4509),
					S = ["className", "children"],
					T = ((x = {})[E.d0] = "show", x[E.cn] = "show", x),
					N = l.forwardRef((function(e, t) {
						var n = e.className,
							i = e.children,
							s = (0, o.Z)(e, S),
							c = (0, l.useCallback)((function(e) {
								(0, C.Z)(e), s.onEnter && s.onEnter(e)
							}), [s]);
						return l.createElement(E.ZP, (0, r.Z)({
							ref: t,
							addEndListener: k.Z
						}, s, {
							onEnter: c
						}), (function(e, t) {
							return l.cloneElement(i, (0, r.Z)({}, t, {
								className: a()("fade", n, i.props.className, T[e])
							}))
						}))
					}));
				N.defaultProps = {
					in: !1,
					timeout: 300,
					mountOnEnter: !1,
					unmountOnExit: !1,
					appear: !1
				}, N.displayName = "Fade";
				var P = N,
					A = n(1513),
					_ = n.n(A),
					O = ["label", "onClick", "className"],
					L = {
						label: _().string.isRequired,
						onClick: _().func
					},
					D = l.forwardRef((function(e, t) {
						var n = e.label,
							i = e.onClick,
							s = e.className,
							c = (0, o.Z)(e, O);
						return l.createElement("button", (0, r.Z)({
							ref: t,
							type: "button",
							className: a()("close", s),
							onClick: i
						}, c), l.createElement("span", {
							"aria-hidden": "true"
						}, "×"), l.createElement("span", {
							className: "sr-only"
						}, n))
					}));
				D.displayName = "CloseButton", D.propTypes = L, D.defaultProps = {
					label: "Close"
				};
				var B = D,
					I = n(9602),
					H = n(4680),
					R = n(8358),
					q = ["bsPrefix", "show", "closeLabel", "className", "children", "variant", "onClose", "dismissible", "transition"],
					j = (0, I.Z)("h4");
				j.displayName = "DivStyledAsH4";
				var Z = (0, H.Z)("alert-heading", {
						Component: j
					}),
					F = (0, H.Z)("alert-link", {
						Component: R.Z
					}),
					V = {
						show: !0,
						transition: P,
						closeLabel: "Close alert"
					},
					Q = l.forwardRef((function(e, t) {
						var n = (0, s.Ch)(e, {
								show: "onClose"
							}),
							i = n.bsPrefix,
							u = n.show,
							f = n.closeLabel,
							d = n.className,
							h = n.children,
							p = n.variant,
							v = n.onClose,
							m = n.dismissible,
							g = n.transition,
							y = (0, o.Z)(n, q),
							b = (0, c.vE)(i, "alert"),
							w = (0, z.Z)((function(e) {
								v && v(!1, e)
							})),
							x = !0 === g ? P : g,
							M = l.createElement("div", (0, r.Z)({
								role: "alert"
							}, x ? void 0 : y, {
								ref: t,
								className: a()(d, b, p && b + "-" + p, m && b + "-dismissible")
							}), m && l.createElement(B, {
								onClick: w,
								label: f
							}), h);
						return x ? l.createElement(x, (0, r.Z)({
							unmountOnExit: !0
						}, y, {
							ref: void 0,
							in: u
						}), M) : u ? M : null
					}));
				Q.displayName = "Alert", Q.defaultProps = V, Q.Link = F, Q.Heading = Z;
				var U = Q,
					K = ["bsPrefix", "variant", "pill", "className", "as"],
					W = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.variant,
							s = e.pill,
							u = e.className,
							f = e.as,
							d = void 0 === f ? "span" : f,
							h = (0, o.Z)(e, K),
							p = (0, c.vE)(n, "badge");
						return l.createElement(d, (0, r.Z)({
							ref: t
						}, h, {
							className: a()(u, p, s && p + "-pill", i && p + "-" + i)
						}))
					}));
				W.displayName = "Badge", W.defaultProps = {
					pill: !1
				};
				var $ = W,
					Y = ["bsPrefix", "size", "toggle", "vertical", "className", "as"],
					G = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.size,
							s = e.toggle,
							u = e.vertical,
							f = e.className,
							d = e.as,
							h = void 0 === d ? "div" : d,
							p = (0, o.Z)(e, Y),
							v = (0, c.vE)(n, "btn-group"),
							m = v;
						return u && (m = v + "-vertical"), l.createElement(h, (0, r.Z)({}, p, {
							ref: t,
							className: a()(f, m, i && v + "-" + i, s && v + "-toggle")
						}))
					}));
				G.displayName = "ButtonGroup", G.defaultProps = {
					vertical: !1,
					toggle: !1,
					role: "group"
				};
				var X = G,
					J = n(8182),
					ee = (n(3886), n(3818)),
					te = n(1377),
					ne = ["id", "bsPrefix", "bsCustomPrefix", "className", "isValid", "isInvalid", "lang", "as"],
					re = l.forwardRef((function(e, t) {
						var n = e.id,
							i = e.bsPrefix,
							s = e.bsCustomPrefix,
							u = e.className,
							f = e.isValid,
							d = e.isInvalid,
							h = e.lang,
							p = e.as,
							v = void 0 === p ? "input" : p,
							m = (0, o.Z)(e, ne),
							g = (0, l.useContext)(te.Z),
							y = g.controlId,
							b = g.custom ? [s, "custom-file-input"] : [i, "form-control-file"],
							w = b[0],
							x = b[1];
						return i = (0, c.vE)(w, x), l.createElement(v, (0, r.Z)({}, m, {
							ref: t,
							id: n || y,
							type: "file",
							lang: h,
							className: a()(u, i, f && "is-valid", d && "is-invalid")
						}))
					}));
				re.displayName = "FormFileInput";
				var oe = re,
					ie = ["bsPrefix", "bsCustomPrefix", "className", "htmlFor"],
					ae = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.bsCustomPrefix,
							s = e.className,
							u = e.htmlFor,
							f = (0, o.Z)(e, ie),
							d = (0, l.useContext)(te.Z),
							h = d.controlId,
							p = d.custom ? [i, "custom-file-label"] : [n, "form-file-label"],
							v = p[0],
							m = p[1];
						return n = (0, c.vE)(v, m), l.createElement("label", (0, r.Z)({}, f, {
							ref: t,
							htmlFor: u || h,
							className: a()(s, n),
							"data-browse": f["data-browse"]
						}))
					}));
				ae.displayName = "FormFileLabel";
				var le = ae,
					se = ["id", "bsPrefix", "bsCustomPrefix", "disabled", "isValid", "isInvalid", "feedbackTooltip", "feedback", "className", "style", "label", "children", "custom", "lang", "data-browse", "as", "inputAs"],
					ce = l.forwardRef((function(e, t) {
						var n = e.id,
							i = e.bsPrefix,
							s = e.bsCustomPrefix,
							u = e.disabled,
							f = void 0 !== u && u,
							d = e.isValid,
							h = void 0 !== d && d,
							p = e.isInvalid,
							v = void 0 !== p && p,
							m = e.feedbackTooltip,
							g = void 0 !== m && m,
							y = e.feedback,
							b = e.className,
							w = e.style,
							x = e.label,
							M = e.children,
							z = e.custom,
							E = e.lang,
							k = e["data-browse"],
							C = e.as,
							S = void 0 === C ? "div" : C,
							T = e.inputAs,
							N = void 0 === T ? "input" : T,
							P = (0, o.Z)(e, se),
							A = z ? [s, "custom"] : [i, "form-file"],
							_ = A[0],
							O = A[1];
						i = (0, c.vE)(_, O);
						var L = (0, l.useContext)(te.Z).controlId,
							D = (0, l.useMemo)((function() {
								return {
									controlId: n || L,
									custom: z
								}
							}), [L, z, n]),
							B = null != x && !1 !== x && !M,
							I = l.createElement(oe, (0, r.Z)({}, P, {
								ref: t,
								isValid: h,
								isInvalid: v,
								disabled: f,
								as: N,
								lang: E
							}));
						return l.createElement(te.Z.Provider, {
							value: D
						}, l.createElement(S, {
							style: w,
							className: a()(b, i, z && "custom-file")
						}, M || l.createElement(l.Fragment, null, z ? l.createElement(l.Fragment, null, I, B && l.createElement(le, {
							"data-browse": k
						}, x)) : l.createElement(l.Fragment, null, B && l.createElement(le, null, x), I), (h || v) && l.createElement(ee.Z, {
							type: h ? "valid" : "invalid",
							tooltip: g
						}, y))))
					}));
				ce.displayName = "FormFile", ce.Input = oe, ce.Label = le;
				var ue = ce,
					fe = n(4716),
					de = n(6986),
					he = (n(2473), ["bsPrefix", "className", "as"]),
					pe = ["xl", "lg", "md", "sm", "xs"],
					ve = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.className,
							s = e.as,
							u = void 0 === s ? "div" : s,
							f = (0, o.Z)(e, he),
							d = (0, c.vE)(n, "col"),
							h = [],
							p = [];
						return pe.forEach((function(e) {
							var t, n, r, o = f[e];
							if (delete f[e], "object" == typeof o && null != o) {
								var i = o.span;
								t = void 0 === i || i, n = o.offset, r = o.order
							} else t = o;
							var a = "xs" !== e ? "-" + e : "";
							t && h.push(!0 === t ? "" + d + a : "" + d + a + "-" + t), null != r && p.push("order" + a + "-" + r), null != n && p.push("offset" + a + "-" + n)
						})), h.length || h.push(d), l.createElement(u, (0, r.Z)({}, f, {
							ref: t,
							className: a().apply(void 0, [i].concat(h, p))
						}))
					}));
				ve.displayName = "Col";
				var me = ve,
					ge = ["as", "bsPrefix", "column", "srOnly", "className", "htmlFor"],
					ye = l.forwardRef((function(e, t) {
						var n = e.as,
							i = void 0 === n ? "label" : n,
							s = e.bsPrefix,
							u = e.column,
							f = e.srOnly,
							d = e.className,
							h = e.htmlFor,
							p = (0, o.Z)(e, ge),
							v = (0, l.useContext)(te.Z).controlId;
						s = (0, c.vE)(s, "form-label");
						var m = "col-form-label";
						"string" == typeof u && (m = m + " " + m + "-" + u);
						var g = a()(d, s, f && "sr-only", u && m);
						return h = h || v, u ? l.createElement(me, (0, r.Z)({
							ref: t,
							as: "label",
							className: g,
							htmlFor: h
						}, p)) : l.createElement(i, (0, r.Z)({
							ref: t,
							className: g,
							htmlFor: h
						}, p))
					}));
				ye.displayName = "FormLabel", ye.defaultProps = {
					column: !1,
					srOnly: !1
				};
				var be = ye,
					we = n(9848),
					xe = l.forwardRef((function(e, t) {
						return l.createElement(J.Z, (0, r.Z)({}, e, {
							ref: t,
							type: "switch"
						}))
					}));
				xe.displayName = "Switch", xe.Input = J.Z.Input, xe.Label = J.Z.Label;
				var Me = xe,
					ze = ["bsPrefix", "inline", "className", "validated", "as"],
					Ee = (0, H.Z)("form-row"),
					ke = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.inline,
							s = e.className,
							u = e.validated,
							f = e.as,
							d = void 0 === f ? "form" : f,
							h = (0, o.Z)(e, ze);
						return n = (0, c.vE)(n, "form"), l.createElement(d, (0, r.Z)({}, h, {
							ref: t,
							className: a()(s, u && "was-validated", i && n + "-inline")
						}))
					}));
				ke.displayName = "Form", ke.defaultProps = {
					inline: !1
				}, ke.Row = Ee, ke.Group = de.Z, ke.Control = fe.Z, ke.Check = J.Z, ke.File = ue, ke.Switch = Me, ke.Label = be, ke.Text = we.Z;
				var Ce = ke,
					Se = ["bsPrefix", "fluid", "as", "className"],
					Te = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.fluid,
							s = e.as,
							u = void 0 === s ? "div" : s,
							f = e.className,
							d = (0, o.Z)(e, Se),
							h = (0, c.vE)(n, "container"),
							p = "string" == typeof i ? "-" + i : "-fluid";
						return l.createElement(u, (0, r.Z)({
							ref: t
						}, d, {
							className: a()(f, i ? "" + h + p : h)
						}))
					}));
				Te.displayName = "Container", Te.defaultProps = {
					fluid: !1
				};
				var Ne = Te,
					Pe = ["bsPrefix", "className", "noGutters", "as"],
					Ae = ["xl", "lg", "md", "sm", "xs"],
					_e = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.className,
							s = e.noGutters,
							u = e.as,
							f = void 0 === u ? "div" : u,
							d = (0, o.Z)(e, Pe),
							h = (0, c.vE)(n, "row"),
							p = h + "-cols",
							v = [];
						return Ae.forEach((function(e) {
							var t, n = d[e];
							delete d[e];
							var r = "xs" !== e ? "-" + e : "";
							null != (t = null != n && "object" == typeof n ? n.cols : n) && v.push("" + p + r + "-" + t)
						})), l.createElement(f, (0, r.Z)({
							ref: t
						}, d, {
							className: a().apply(void 0, [i, h, s && "no-gutters"].concat(v))
						}))
					}));
				_e.displayName = "Row", _e.defaultProps = {
					noGutters: !1
				};
				var Oe = _e,
					Le = ["bsPrefix", "className", "as"],
					De = (0, H.Z)("media-body"),
					Be = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.className,
							s = e.as,
							u = void 0 === s ? "div" : s,
							f = (0, o.Z)(e, Le),
							d = (0, c.vE)(n, "media");
						return l.createElement(u, (0, r.Z)({}, f, {
							ref: t,
							className: a()(i, d)
						}))
					}));
				Be.displayName = "Media", Be.Body = De;
				var Ie = Be,
					He = n(930),
					Re = n(4357),
					qe = n(5654),
					je = n(590),
					Ze = l.createContext(null),
					Fe = ["as", "onSelect", "activeKey", "role", "onKeyDown"],
					Ve = function() {},
					Qe = l.forwardRef((function(e, t) {
						var n, i, a = e.as,
							s = void 0 === a ? "ul" : a,
							c = e.onSelect,
							f = e.activeKey,
							d = e.role,
							h = e.onKeyDown,
							p = (0, o.Z)(e, Fe),
							v = (0, Re.Z)(),
							m = (0, l.useRef)(!1),
							g = (0, l.useContext)(u.Z),
							y = (0, l.useContext)(Ze);
						y && (d = d || "tablist", f = y.activeKey, n = y.getControlledId, i = y.getControllerId);
						var b = (0, l.useRef)(null),
							w = function(e) {
								var t = b.current;
								if (!t) return null;
								var n = (0, He.Z)(t, "[data-rb-event-key]:not(.disabled)"),
									r = t.querySelector(".active");
								if (!r) return null;
								var o = n.indexOf(r);
								if (-1 === o) return null;
								var i = o + e;
								return i >= n.length && (i = 0), i < 0 && (i = n.length - 1), n[i]
							},
							x = function(e, t) {
								null != e && (c && c(e, t), g && g(e, t))
							};
						(0, l.useEffect)((function() {
							if (b.current && m.current) {
								var e = b.current.querySelector("[data-rb-event-key].active");
								e && e.focus()
							}
							m.current = !1
						}));
						var M = (0, qe.Z)(t, b);
						return l.createElement(u.Z.Provider, {
							value: x
						}, l.createElement(je.Z.Provider, {
							value: {
								role: d,
								activeKey: (0, u.h)(f),
								getControlledId: n || Ve,
								getControllerId: i || Ve
							}
						}, l.createElement(s, (0, r.Z)({}, p, {
							onKeyDown: function(e) {
								var t;
								switch (h && h(e), e.key) {
									case "ArrowLeft":
									case "ArrowUp":
										t = w(-1);
										break;
									case "ArrowRight":
									case "ArrowDown":
										t = w(1);
										break;
									default:
										return
								}
								t && (e.preventDefault(), x(t.dataset.rbEventKey, e), m.current = !0, v())
							},
							ref: M,
							role: d
						}))))
					})),
					Ue = ["active", "className", "eventKey", "onSelect", "onClick", "as"],
					Ke = l.forwardRef((function(e, t) {
						var n = e.active,
							i = e.className,
							s = e.eventKey,
							c = e.onSelect,
							f = e.onClick,
							d = e.as,
							h = (0, o.Z)(e, Ue),
							p = (0, u.h)(s, h.href),
							v = (0, l.useContext)(u.Z),
							m = (0, l.useContext)(je.Z),
							g = n;
						if (m) {
							h.role || "tablist" !== m.role || (h.role = "tab");
							var y = m.getControllerId(p),
								b = m.getControlledId(p);
							h["data-rb-event-key"] = p, h.id = y || h.id, h["aria-controls"] = b || h["aria-controls"], g = null == n && null != p ? m.activeKey === p : n
						}
						"tab" === h.role && (h.disabled && (h.tabIndex = -1, h["aria-disabled"] = !0), h["aria-selected"] = g);
						var w = (0, z.Z)((function(e) {
							f && f(e), null != p && (c && c(p, e), v && v(p, e))
						}));
						return l.createElement(d, (0, r.Z)({}, h, {
							ref: t,
							onClick: w,
							className: a()(i, g && "active")
						}))
					}));
				Ke.defaultProps = {
					disabled: !1
				};
				var We = Ke,
					$e = ["bsPrefix", "active", "disabled", "className", "variant", "action", "as", "onClick"],
					Ye = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.active,
							s = e.disabled,
							u = e.className,
							f = e.variant,
							d = e.action,
							h = e.as,
							p = e.onClick,
							v = (0, o.Z)(e, $e);
						n = (0, c.vE)(n, "list-group-item");
						var m = (0, l.useCallback)((function(e) {
							if (s) return e.preventDefault(), void e.stopPropagation();
							p && p(e)
						}), [s, p]);
						return s && void 0 === v.tabIndex && (v.tabIndex = -1, v["aria-disabled"] = !0), l.createElement(We, (0, r.Z)({
							ref: t
						}, v, {
							as: h || (d ? v.href ? "a" : "button" : "div"),
							onClick: m,
							className: a()(u, n, i && "active", s && "disabled", f && n + "-" + f, d && n + "-action")
						}))
					}));
				Ye.defaultProps = {
					variant: void 0,
					active: !1,
					disabled: !1
				}, Ye.displayName = "ListGroupItem";
				var Ge = Ye,
					Xe = ["className", "bsPrefix", "variant", "horizontal", "as"],
					Je = l.forwardRef((function(e, t) {
						var n, i = (0, s.Ch)(e, {
								activeKey: "onSelect"
							}),
							u = i.className,
							f = i.bsPrefix,
							d = i.variant,
							h = i.horizontal,
							p = i.as,
							v = void 0 === p ? "div" : p,
							m = (0, o.Z)(i, Xe),
							g = (0, c.vE)(f, "list-group");
						return n = h ? !0 === h ? "horizontal" : "horizontal-" + h : null, l.createElement(Qe, (0, r.Z)({
							ref: t
						}, m, {
							as: v,
							className: a()(u, g, d && g + "-" + d, n && g + "-" + n)
						}))
					}));
				Je.defaultProps = {
					variant: void 0,
					horizontal: void 0
				}, Je.displayName = "ListGroup", Je.Item = Ge;
				var et = Je,
					tt = n(4819),
					nt = n(8154),
					rt = ["bsPrefix", "className", "children", "as"],
					ot = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.className,
							s = e.children,
							u = e.as,
							f = void 0 === u ? "div" : u,
							d = (0, o.Z)(e, rt);
						return n = (0, c.vE)(n, "nav-item"), l.createElement(f, (0, r.Z)({}, d, {
							ref: t,
							className: a()(i, n)
						}), s)
					}));
				ot.displayName = "NavItem";
				var it = ot,
					at = ["bsPrefix", "disabled", "className", "href", "eventKey", "onSelect", "as"],
					lt = {
						disabled: !1,
						as: R.Z
					},
					st = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.disabled,
							s = e.className,
							u = e.href,
							f = e.eventKey,
							d = e.onSelect,
							h = e.as,
							p = (0, o.Z)(e, at);
						return n = (0, c.vE)(n, "nav-link"), l.createElement(We, (0, r.Z)({}, p, {
							href: u,
							ref: t,
							eventKey: f,
							as: h,
							disabled: i,
							onSelect: d,
							className: a()(s, n, i && "disabled")
						}))
					}));
				st.displayName = "NavLink", st.defaultProps = lt;
				var ct = st,
					ut = ["as", "bsPrefix", "variant", "fill", "justify", "navbar", "navbarScroll", "className", "children", "activeKey"],
					ft = l.forwardRef((function(e, t) {
						var n, i, u, f = (0, s.Ch)(e, {
								activeKey: "onSelect"
							}),
							d = f.as,
							h = void 0 === d ? "div" : d,
							p = f.bsPrefix,
							v = f.variant,
							m = f.fill,
							g = f.justify,
							y = f.navbar,
							b = f.navbarScroll,
							w = f.className,
							x = f.children,
							M = f.activeKey,
							z = (0, o.Z)(f, ut),
							E = (0, c.vE)(p, "nav"),
							k = !1,
							C = (0, l.useContext)(tt.Z),
							S = (0, l.useContext)(nt.Z);
						return C ? (i = C.bsPrefix, k = null == y || y) : S && (u = S.cardHeaderBsPrefix), l.createElement(Qe, (0, r.Z)({
							as: h,
							ref: t,
							activeKey: M,
							className: a()(w, (n = {}, n[E] = !k, n[i + "-nav"] = k, n[i + "-nav-scroll"] = k && b, n[u + "-" + v] = !!u, n[E + "-" + v] = !!v, n[E + "-fill"] = m, n[E + "-justified"] = g, n))
						}, z), x)
					}));
				ft.displayName = "Nav", ft.defaultProps = {
					justify: !1,
					fill: !1
				}, ft.Item = it, ft.Link = ct;
				var dt = ft,
					ht = ["as", "className", "fluid", "bsPrefix"],
					pt = l.forwardRef((function(e, t) {
						var n, i = e.as,
							s = void 0 === i ? "div" : i,
							u = e.className,
							f = e.fluid,
							d = e.bsPrefix,
							h = (0, o.Z)(e, ht),
							p = ((n = {})[d = (0, c.vE)(d, "jumbotron")] = !0, n[d + "-fluid"] = f, n);
						return l.createElement(s, (0, r.Z)({
							ref: t
						}, h, {
							className: a()(u, p)
						}))
					}));
				pt.defaultProps = {
					fluid: !1
				}, pt.displayName = "Jumbotron";
				var vt = pt,
					mt = n(1721),
					gt = function(e) {
						var t = (0, s.Ch)(e, {
								activeKey: "onSelect"
							}),
							n = t.id,
							r = t.generateChildId,
							o = t.onSelect,
							i = t.activeKey,
							a = t.transition,
							c = t.mountOnEnter,
							f = t.unmountOnExit,
							d = t.children,
							h = (0, l.useMemo)((function() {
								return r || function(e, t) {
									return n ? n + "-" + t + "-" + e : null
								}
							}), [n, r]),
							p = (0, l.useMemo)((function() {
								return {
									onSelect: o,
									activeKey: i,
									transition: a,
									mountOnEnter: c || !1,
									unmountOnExit: f || !1,
									getControlledId: function(e) {
										return h(e, "tabpane")
									},
									getControllerId: function(e) {
										return h(e, "tab")
									}
								}
							}), [o, i, a, c, f, h]);
						return l.createElement(Ze.Provider, {
							value: p
						}, l.createElement(u.Z.Provider, {
							value: o || null
						}, d))
					},
					yt = ["bsPrefix", "as", "className"],
					bt = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.as,
							s = void 0 === i ? "div" : i,
							u = e.className,
							f = (0, o.Z)(e, yt),
							d = (0, c.vE)(n, "tab-content");
						return l.createElement(s, (0, r.Z)({
							ref: t
						}, f, {
							className: a()(u, d)
						}))
					})),
					wt = ["activeKey", "getControlledId", "getControllerId"],
					xt = ["bsPrefix", "className", "active", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "mountOnEnter", "unmountOnExit", "transition", "as", "eventKey"],
					Mt = l.forwardRef((function(e, t) {
						var n = function(e) {
								var t = (0, l.useContext)(Ze);
								if (!t) return e;
								var n = t.activeKey,
									i = t.getControlledId,
									a = t.getControllerId,
									s = (0, o.Z)(t, wt),
									c = !1 !== e.transition && !1 !== s.transition,
									f = (0, u.h)(e.eventKey);
								return (0, r.Z)({}, e, {
									active: null == e.active && null != f ? (0, u.h)(n) === f : e.active,
									id: i(e.eventKey),
									"aria-labelledby": a(e.eventKey),
									transition: c && (e.transition || s.transition || P),
									mountOnEnter: null != e.mountOnEnter ? e.mountOnEnter : s.mountOnEnter,
									unmountOnExit: null != e.unmountOnExit ? e.unmountOnExit : s.unmountOnExit
								})
							}(e),
							i = n.bsPrefix,
							s = n.className,
							f = n.active,
							d = n.onEnter,
							h = n.onEntering,
							p = n.onEntered,
							v = n.onExit,
							m = n.onExiting,
							g = n.onExited,
							y = n.mountOnEnter,
							b = n.unmountOnExit,
							w = n.transition,
							x = n.as,
							M = void 0 === x ? "div" : x,
							z = (n.eventKey, (0, o.Z)(n, xt)),
							E = (0, c.vE)(i, "tab-pane");
						if (!f && !w && b) return null;
						var k = l.createElement(M, (0, r.Z)({}, z, {
							ref: t,
							role: "tabpanel",
							"aria-hidden": !f,
							className: a()(s, E, {
								active: f
							})
						}));
						return w && (k = l.createElement(w, {
							in: f,
							onEnter: d,
							onEntering: h,
							onEntered: p,
							onExit: v,
							onExiting: m,
							onExited: g,
							mountOnEnter: y,
							unmountOnExit: b
						}, k)), l.createElement(Ze.Provider, {
							value: null
						}, l.createElement(u.Z.Provider, {
							value: null
						}, k))
					}));
				Mt.displayName = "TabPane";
				var zt = Mt,
					Et = function(e) {
						function t() {
							return e.apply(this, arguments) || this
						}
						return (0, mt.Z)(t, e), t.prototype.render = function() {
							throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly")
						}, t
					}(l.Component);
				Et.Container = gt, Et.Content = bt, Et.Pane = zt;
				var kt = Et;

				function Ct(e, t) {
					var n = 0;
					return l.Children.map(e, (function(e) {
						return l.isValidElement(e) ? t(e, n++) : e
					}))
				}
				n(5638);
				var St = ["id", "onSelect", "transition", "mountOnEnter", "unmountOnExit", "children", "activeKey"];

				function Tt(e) {
					var t;
					return function(e, n) {
						l.Children.forEach(e, (function(e) {
							l.isValidElement(e) && function(e) {
								null == t && (t = e.props.eventKey)
							}(e)
						}))
					}(e), t
				}

				function Nt(e) {
					var t = e.props,
						n = t.title,
						r = t.eventKey,
						o = t.disabled,
						i = t.tabClassName,
						a = t.id;
					return null == n ? null : l.createElement(it, {
						as: ct,
						eventKey: r,
						disabled: o,
						id: a,
						className: i
					}, n)
				}
				var Pt = function(e) {
					var t = (0, s.Ch)(e, {
							activeKey: "onSelect"
						}),
						n = t.id,
						i = t.onSelect,
						a = t.transition,
						c = t.mountOnEnter,
						u = t.unmountOnExit,
						f = t.children,
						d = t.activeKey,
						h = void 0 === d ? Tt(f) : d,
						p = (0, o.Z)(t, St);
					return l.createElement(gt, {
						id: n,
						activeKey: h,
						onSelect: i,
						transition: a,
						mountOnEnter: c,
						unmountOnExit: u
					}, l.createElement(dt, (0, r.Z)({}, p, {
						role: "tablist",
						as: "nav"
					}), Ct(f, Nt)), l.createElement(bt, null, Ct(f, (function(e) {
						var t = (0, r.Z)({}, e.props);
						return delete t.title, delete t.disabled, delete t.tabClassName, l.createElement(zt, t)
					}))))
				};
				Pt.defaultProps = {
					variant: "tabs",
					mountOnEnter: !1,
					unmountOnExit: !1
				}, Pt.displayName = "Tabs";
				var At = n(9085),
					_t = n.n(At),
					Ot = n(3935),
					Lt = n(2092),
					Dt = n(890),
					Bt = n(4789),
					It = n(3676),
					Ht = n(7216),
					Rt = function(e) {
						var t;
						return "undefined" == typeof document ? null : null == e ? (0, Ht.Z)().body : ("function" == typeof e && (e = e()), e && "current" in e && (e = e.current), null != (t = e) && t.nodeType && e || null)
					};

				function qt(e, t) {
					var n = (0, l.useState)((function() {
							return Rt(e)
						})),
						r = n[0],
						o = n[1];
					if (!r) {
						var i = Rt(e);
						i && o(i)
					}
					return (0, l.useEffect)((function() {
						t && r && t(r)
					}), [t, r]), (0, l.useEffect)((function() {
						var t = Rt(e);
						t !== r && o(t)
					}), [e, r]), r
				}
				var jt = n(2343),
					Zt = l.forwardRef((function(e, t) {
						var n = e.flip,
							i = e.offset,
							a = e.placement,
							s = e.containerPadding,
							c = void 0 === s ? 5 : s,
							u = e.popperConfig,
							f = void 0 === u ? {} : u,
							d = e.transition,
							h = (0, Lt.Z)(),
							p = h[0],
							v = h[1],
							m = (0, Lt.Z)(),
							g = m[0],
							y = m[1],
							b = (0, qe.Z)(v, t),
							w = qt(e.container),
							x = qt(e.target),
							M = (0, l.useState)(!e.show),
							z = M[0],
							E = M[1],
							k = (0, Bt.Z)(x, p, (0, jt.ZP)({
								placement: a,
								enableEvents: !!e.show,
								containerPadding: c || 5,
								flip: n,
								offset: i,
								arrowElement: g,
								popperConfig: f
							})),
							C = k.styles,
							S = k.attributes,
							T = (0, o.Z)(k, ["styles", "attributes"]);
						e.show ? z && E(!1) : e.transition || z || E(!0);
						var N = e.show || d && !z;
						if ((0, It.Z)(p, e.onHide, {
								disabled: !e.rootClose || e.rootCloseDisabled,
								clickTrigger: e.rootCloseEvent
							}), !N) return null;
						var P = e.children((0, r.Z)({}, T, {
							show: !!e.show,
							props: (0, r.Z)({}, S.popper, {
								style: C.popper,
								ref: b
							}),
							arrowProps: (0, r.Z)({}, S.arrow, {
								style: C.arrow,
								ref: y
							})
						}));
						if (d) {
							var A = e.onExit,
								_ = e.onExiting,
								O = e.onEnter,
								L = e.onEntering,
								D = e.onEntered;
							P = l.createElement(d, {
								in: e.show,
								appear: !0,
								onExit: A,
								onExiting: _,
								onExited: function() {
									E(!0), e.onExited && e.onExited.apply(e, arguments)
								},
								onEnter: O,
								onEntering: L,
								onEntered: D
							}, P)
						}
						return w ? Ot.createPortal(P, w) : null
					}));
				Zt.displayName = "Overlay", Zt.propTypes = {
					show: _t().bool,
					placement: _t().oneOf(Dt.Ct),
					target: _t().any,
					container: _t().any,
					flip: _t().bool,
					children: _t().func.isRequired,
					containerPadding: _t().number,
					popperConfig: _t().object,
					rootClose: _t().bool,
					rootCloseEvent: _t().oneOf(["click", "mousedown"]),
					rootCloseDisabled: _t().bool,
					onHide: function(e) {
						for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
						var o;
						return e.rootClose ? (o = _t().func).isRequired.apply(o, [e].concat(n)) : _t().func.apply(_t(), [e].concat(n))
					},
					transition: _t().elementType,
					onEnter: _t().func,
					onEntering: _t().func,
					onEntered: _t().func,
					onExit: _t().func,
					onExiting: _t().func,
					onExited: _t().func
				};
				var Ft = Zt,
					Vt = n(6390),
					Qt = n(3509),
					Ut = ["children", "transition", "popperConfig"],
					Kt = ["props", "arrowProps", "show", "update", "forceUpdate", "placement", "state"],
					Wt = {
						transition: P,
						rootClose: !1,
						show: !1,
						placement: "top"
					};

				function $t(e) {
					var t = e.children,
						n = e.transition,
						i = e.popperConfig,
						s = void 0 === i ? {} : i,
						c = (0, o.Z)(e, Ut),
						u = (0, l.useRef)({}),
						f = (0, Qt.Z)(),
						d = f[0],
						h = f[1],
						p = !0 === n ? P : n || null;
					return l.createElement(Ft, (0, r.Z)({}, c, {
						ref: d,
						popperConfig: (0, r.Z)({}, s, {
							modifiers: h.concat(s.modifiers || [])
						}),
						transition: p
					}), (function(e) {
						var i, s = e.props,
							c = e.arrowProps,
							f = e.show,
							d = e.update,
							h = (e.forceUpdate, e.placement),
							p = e.state,
							v = (0, o.Z)(e, Kt);
						! function(e, t) {
							var n = e.ref,
								r = t.ref;
							e.ref = n.__wrapped || (n.__wrapped = function(e) {
								return n((0, Vt.Z)(e))
							}), t.ref = r.__wrapped || (r.__wrapped = function(e) {
								return r((0, Vt.Z)(e))
							})
						}(s, c);
						var m = Object.assign(u.current, {
							state: p,
							scheduleUpdate: d,
							placement: h,
							outOfBoundaries: (null == p || null == (i = p.modifiersData.hide) ? void 0 : i.isReferenceHidden) || !1
						});
						return "function" == typeof t ? t((0, r.Z)({}, v, s, {
							placement: h,
							show: f
						}, !n && f && {
							className: "show"
						}, {
							popper: m,
							arrowProps: c
						})) : l.cloneElement(t, (0, r.Z)({}, v, s, {
							placement: h,
							arrowProps: c,
							popper: m,
							className: a()(t.props.className, !n && f && "show"),
							style: (0, r.Z)({}, t.props.style, s.style)
						}))
					}))
				}
				$t.defaultProps = Wt;
				var Yt = $t;
				n(424), n(6454);
				Math.pow(2, 31);
				l.Component;
				var Gt = ["bsPrefix", "placement", "className", "style", "children", "arrowProps", "popper", "show"],
					Xt = l.forwardRef((function(e, t) {
						var n = e.bsPrefix,
							i = e.placement,
							s = e.className,
							u = e.style,
							f = e.children,
							d = e.arrowProps,
							h = (e.popper, e.show, (0, o.Z)(e, Gt));
						n = (0, c.vE)(n, "tooltip");
						var p = ((null == i ? void 0 : i.split("-")) || [])[0];
						return l.createElement("div", (0, r.Z)({
							ref: t,
							style: u,
							role: "tooltip",
							"x-placement": p,
							className: a()(s, n, "bs-tooltip-" + p)
						}, h), l.createElement("div", (0, r.Z)({
							className: "arrow"
						}, d)), l.createElement("div", {
							className: n + "-inner"
						}, f))
					}));
				Xt.defaultProps = {
					placement: "right"
				}, Xt.displayName = "Tooltip";
				var Jt = Xt,
					en = n(5881),
					tn = M,
					nn = U,
					rn = $,
					on = X,
					an = Ce,
					ln = be,
					sn = de.Z,
					cn = fe.Z,
					un = we.Z,
					fn = Ne,
					dn = Oe,
					hn = me,
					pn = Ie,
					vn = et,
					mn = Ge,
					gn = dt,
					yn = it,
					bn = ct,
					wn = en.Z,
					xn = vt,
					Mn = kt,
					zn = Yt,
					En = Jt,
					kn = B,
					Cn = (pn.Body, an.Row),
					Sn = wn.Header,
					Tn = wn.Body,
					Nn = wn.Title
			},
			4487: function(e, t, n) {
				"use strict";
				var r = n(7294),
					o = n(6986),
					i = function() {
						return i = Object.assign || function(e) {
							for (var t, n = 1, r = arguments.length; n < r; n++)
								for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
							return e
						}, i.apply(this, arguments)
					};
				t.Z = function(e) {
					return r.createElement(o.Z, i({}, e))
				}
			},
			1320: function(e, t, n) {
				"use strict";
				n.d(t, {
					n: function() {
						return a
					}
				});
				var r = n(7294),
					o = n(4716),
					i = function() {
						return i = Object.assign || function(e) {
							for (var t, n = 1, r = arguments.length; n < r; n++)
								for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
							return e
						}, i.apply(this, arguments)
					},
					a = function(e) {
						e.box, e.outlined, e.fullWidth, e.dense, e.iconPosition, e.icon, e.labelFor, e.label;
						var t = e.onChange,
							n = e.inputRef,
							a = function(e, t) {
								var n = {};
								for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
								if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
									var o = 0;
									for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
								}
								return n
							}(e, ["box", "outlined", "fullWidth", "dense", "iconPosition", "icon", "labelFor", "label", "onChange", "inputRef"]),
							l = (0, r.useCallback)((function(e) {
								if (t) return t(e.target.value)
							}), [t]);
						return r.createElement(o.Z, i({}, a, {
							type: "text",
							onChange: l,
							ref: n
						}))
					};
				t.Z = a
			},
			3268: function(e, t, n) {
				"use strict";
				var r = n(7294),
					o = n(9203),
					i = n(140),
					a = {
						products: {
							mksap18: {
								questionSetName: "Questions"
							},
							vdx: {
								questionSetName: "Virtual Dx"
							},
							qq: {
								questionSetName: "MKSAP Quick Qs"
							},
							x1: {
								questionSetName: "Extension Questions Set 1"
							},
							x2: {
								questionSetName: "Extension Questions Set 2"
							},
							x3: {
								questionSetName: "Extension Questions Set 3"
							},
							x4: {
								questionSetName: "Extension Questions Set 4"
							}
						},
						buttons: {
							cancel: {
								label: "Cancel"
							},
							close: {
								label: "Close",
								ariaLabel: "Close"
							},
							start: {
								label: "Start"
							},
							resume: {
								label: "Resume"
							},
							completed: {
								label: "Completed"
							},
							delete: {
								label: "Delete"
							},
							dialogCancel: {
								label: "Cancel"
							},
							dialogConfirm: {
								label: "OK"
							},
							dialogDelete: {
								label: "Delete"
							},
							star: {
								ariaLabel: "Star"
							},
							search: {
								title: "Search",
								ariaLabel: "Search"
							},
							up: {
								title: "Upward",
								ariaLabel: "Upward"
							},
							menu: {
								title: "Menu",
								ariaLabel: "Toggle navigation"
							}
						},
						appDrawer: {
							nav: {
								home: "Home",
								subspecialties: "Subspecialties",
								learningPlan: "Learning Plan",
								flashcards: "Flashcards",
								assignments: "Assignments",
								quizzes: "Custom Quizzes",
								settings: "Settings",
								submissions: "CME/MOC/CPD",
								questionBank: "Question Bank",
								help: "Help"
							},
							greeting: {
								label: function(e) {
									var t = e.name;
									return "Hello, ".concat(t)
								}
							},
							signOutButton: {
								lg: {
									label: "Not you? Sign Out"
								},
								sm: {
									label: "Sign Out"
								}
							},
							trackerButton: {
								label: "Looking for Tracker?"
							}
						},
						dashboard: {
							pageTitle: "Home",
							title: "",
							greeting: function(e) {
								var t = e.name;
								return "Welcome, ".concat(t)
							},
							hero: {
								tagline: "Medical Knowledge Self-Assessment Program"
							},
							quizPrompt: {
								prompt: "Not sure where to start? Start with a custom quiz.",
								startButton: {
									label: "Start Custom Quiz"
								}
							},
							trackerInvitation: {
								message: function(e) {
									var t = e.programName;
									return "You have been invited to share your progress with <strong>".concat(t, "</strong>")
								},
								button: {
									label: "View Invitation"
								}
							},
							cards: {
								recentlyViewed: {
									label: "Recently Viewed:",
									flashcards: "Flashcards"
								},
								topics: {
									title: "Text",
									intro: "All new content written by 200 expert physicians across 11 subspecialties."
								},
								questions: {
									title: "Questions",
									questionCount: function(e) {
										var t = e.totalQuestions;
										return "".concat(t, " total questions")
									},
									intro: "Over 1,200 new multiple choice questions across 11 specialties.",
									recent: {
										label: function(e) {
											var t = e.questionNum;
											return "Question ".concat(t)
										}
									},
									buttons: {
										progressOverview: {
											label: "Reports"
										}
									}
								},
								qq: {
									title: "MKSAP Quick Qs",
									intro: "",
									recent: {
										label: function(e) {
											var t = e.questionNum;
											return "Question ".concat(t)
										}
									}
								},
								vdx: {
									title: "Virtual Dx",
									intro: "Over 1,200 new multiple choice questions across 11 specialties.",
									recent: {
										label: function(e) {
											var t = e.questionNum;
											return "Question ".concat(t)
										}
									}
								},
								flashcards: {
									title: "Flashcards",
									intro: "Reinforce your knowledge through repeated exposure using adaptive learning technology."
								},
								quizzes: {
									title: "Custom Quizzes",
									intro: "Create personalized quizzes or timed practice exams using MKSAP 19 questions."
								},
								submissions: {
									title: "CME/MOC",
									intro: "Earn same-day, simultaneous CME credits and MOC points through December 2021."
								},
								assignments: {
									title: "Assignments",
									incomplete: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "You have ".concat(t, " incomplete assignment"), "You have ".concat(t, " incomplete assignments"))
									},
									complete: "You have completed all of your assignments",
									button: {
										label: "View Assignments"
									}
								},
								niu: {
									title: "New Information Updates",
									intro: "Targeted revisions to MKSAP content to reflect important practice-changing information. March 2020 now available.",
									button: {
										label: "View Index"
									}
								}
							},
							faqsLinks: {
								title: "Using MKSAP 19",
								getStarted: "Getting Started",
								answeringQuestions: "Answering Questions",
								cmeMocCpd: "Submitting for CME/MOC/CPD",
								errata: "Errata and Revisions",
								everythingElse: "Everything Else"
							},
							resourceLinks: {
								title: "MKSAP 19 Resources",
								hvc: "High Value Care Recommendations",
								forum: "ACP Forums: MKSAP",
								boardbasics: "Board Basics E-book",
								tracker: "MKSAP Tracker",
								app: "Download the App",
								resource: "MKSAP 19 Resource Site"
							},
							aboutLinks: {
								title: "About MKSAP 19",
								about: "About MKSAP 19",
								contributors: "Contributors/Disclosures",
								letter: "Letter from the Editor",
								eula: "License Agreement",
								submissions: "CME Information & Disclosures",
								facebook: "MKSAP on Facebook",
								contactUs: "Contact Us"
							},
							disclaimer: "The information included herein should never be used as a substitute for clinical judgment and does not represent an official position of the ACP.",
							copyright: "© Copyright 2021 American College of Physicians. All Rights Reserved.",
							address: "190 North Independence Mall West, Philadelphia, PA 19106-1572",
							highlightingSurvey: {
								banner: {
									message: "Have you tried Highlighting? Tell us about your experience so we can better serve you.",
									link: {
										label: "Start Quick Survey"
									}
								}
							}
						},
						subspecialtiesIndex: {
							title: "Subspecialties",
							pageTitle: "Subspecialties"
						},
						subspecialty: {
							title: function(e) {
								var t = e.subspecialtyName;
								return "".concat(t)
							},
							pageTitle: function(e) {
								var t = e.subspecialtyName;
								return "".concat(t)
							}
						},
						learningPlanIndex: {
							title: "Learning Plan",
							pageTitle: "Learning Plan"
						},
						learningPlanSubspecialtyIndex: {
							title: function(e) {
								var t = e.subspecialtyName;
								return "Learning Plan: ".concat(t)
							},
							pageTitle: function(e) {
								var t = e.subspecialtyName;
								return "Learning Plan: ".concat(t)
							},
							breadcrumbs: {
								index: {
									label: "Learning Plan"
								}
							},
							buttons: {
								targetedTopicsButton: {
									label: function(e) {
										var t = e.count;
										return (0, i._)(t, "".concat(t, " Targeted Topic"), "".concat(t, " Targeted Topics"))
									}
								}
							}
						},
						frontMatter: {
							loading: "Loading front matter...",
							about: {
								toolbar: {
									title: "About MKSAP 19"
								}
							},
							contributors: {
								index: {
									toolbar: {
										title: "Contributors/Disclosures"
									},
									title: "Contributors and Disclosures"
								},
								bookIndex: {
									toolbar: {
										title: function(e) {
											var t = e.bookName;
											return "".concat(t, " Contributors")
										}
									}
								}
							},
							eicLetter: {
								toolbar: {
									title: "Welcome to MKSAP 19 Digital!"
								}
							},
							eula: {
								toolbar: {
									title: "MKSAP 19 End User License Agreement"
								}
							}
						},
						search: {
							errorMessage: "MKSAP 19 search is currently unavailable.  Please try later.",
							searchingMessage: "Searching MKSAP 19...",
							buttons: {
								search: "Search",
								searchFilters: "search with filters",
								filter: "Filter"
							},
							term: {
								label: "Search MKSAP 19"
							},
							results: {
								instructions: "Search MKSAP text and questions using keywords or phrases",
								summary: {
									searchMessage: "Searching...",
									title: function(e) {
										var t = e.count,
											n = e.term,
											o = e.bookFilter,
											i = e.phraseFilter;
										return r.createElement(r.Fragment, null, t, " for", " ", r.createElement("em", null, r.createElement("strong", null, n)), r.createElement("em", null, o), r.createElement("em", null, i))
									},
									topicCount: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "Showing ".concat(t, " Text result"), "Showing ".concat(t, " Text results"))
									},
									questionCount: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "Showing ".concat(t, " Question result"), "Showing ".concat(t, " Question results"))
									},
									bookFilter: function(e) {
										var t = e.bookFilter;
										return " in ".concat(t)
									},
									phraseFilter: " using this exact word or phrase"
								},
								filters: {
									title: "Add Filters to your search",
									subspecialties: {
										label: "Narrow results by subspecialty:",
										all: "All subspecialties"
									},
									type: {
										label: "Find pages with...",
										all: "All these words",
										any: "Any of these words",
										phrase: "This exact word or phrase"
									}
								},
								suggestion: {
									title: function(e) {
										var t = e.term;
										return r.createElement(r.Fragment, null, "Your search for - ", r.createElement("strong", null, t), " - did not match any documents.")
									},
									help: function(e) {
										var t = e.suggestion;
										return r.createElement(r.Fragment, null, "Did you mean ", t, "?")
									}
								},
								noneFound: {
									title: function(e) {
										var t = e.term;
										return r.createElement(r.Fragment, null, "Your search for - ", r.createElement("strong", null, t), " - did not match any documents.")
									},
									help: {
										title: "Suggestions:",
										content: function() {
											return r.createElement("ul", null, r.createElement("li", null, "Make sure all words are spelled correctly."), r.createElement("li", null, "Try selecting a different subspecialty filter above."), r.createElement("li", null, "Check or uncheck exact word or phrase filter."), r.createElement("li", null, "Choose to search within Text or Questions."), r.createElement("li", null, "Try more general keywords."))
										}
									}
								}
							}
						},
						quizzes: {
							createQuizDialog: {
								title: "Review Your Custom Quiz Options",
								confirmButton: {
									label: "Start Quiz"
								}
							},
							createQuizSuccessDialog: {
								title: "Quiz Created!",
								subTitle: "Quiz Created!",
								confirmButton: {
									label: "Start Quiz"
								}
							},
							deleteQuizDialog: {
								title: "Delete this Quiz?",
								warningMessage: "Are you sure you want to delete this quiz? This action cannot be undone.",
								confirmButton: {
									label: "Delete Quiz"
								}
							},
							duplicateQuizDialog: {
								title: "Duplicate this Quiz?",
								warningMessage: "Really copy this quiz?.",
								quizName: {
									label: "Enter New Quiz Name:"
								},
								confirmButton: {
									label: "Duplicate Quiz"
								}
							},
							quizCompleteDialog: {
								practiceExam: {
									title: "Practice Exam Complete",
									body: function(e) {
										var t = e.percentCorrect,
											n = e.totalAnswered;
										return "Practice exam complete! You scored ".concat(t, "% correct of ").concat(n, " questions answered.")
									}
								},
								customQuiz: {
									title: "Quiz Complete",
									body: function(e) {
										var t = e.percentCorrect,
											n = e.totalAnswered;
										return "Quiz complete! You scored ".concat(t, "% correct of ").concat(n, " questions answered.")
									}
								},
								resultsButton: {
									label: "Review your results"
								}
							},
							timer: {
								paused: "Timer paused",
								remaining: "Time remaining",
								overtime: "Time's up"
							},
							quizPausedDialog: {
								title: "Quiz Timer Paused",
								body: "Your quiz timer is paused. Resume the timer to continue the quiz.",
								offlineWarning: "<b>You are offline:</b> Pausing while offline may cause quiz timer inconsistency if you resume this quiz on another device.",
								resumeButton: {
									label: "Resume Timer"
								}
							},
							index: {
								pageTitle: "Custom Quizzes",
								toolbar: {
									title: "Custom Quizzes"
								},
								buttons: {
									startQuiz: {
										label: "Start"
									},
									resumeQuiz: {
										label: "Resume"
									},
									newQuiz: {
										label: "Create New Quiz"
									},
									practiceExam: {
										label: "New Practice Exam"
									}
								},
								active: "Quizzes in Progress",
								completed: "Completed Quizzes",
								noActiveQuizzes: "You currently have no quizzes in progress.",
								createQuiz: {
									title: "Create a custom quiz in 5 easy steps",
									instructions: {
										title: "How to create a custom quiz",
										subTitle: "Follow these easy steps to create your own randomized tests using a subset of MKSAP 19 questions.",
										step1: " Choose study mode or exam mode",
										step2: " Select one or more subspecialties",
										step3: " Add and limit by question type",
										step4: " Choose the number of questions in your quiz",
										step5: " Name your quiz so that you can refer back to it later"
									}
								},
								quiz: {
									studyMode: "Study Mode:",
									examMode: "Exam Mode:",
									practiceExamMode: "Practice Exam:",
									totalQuestions: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "".concat(t, " Question"), "".concat(t, " Questions"))
									},
									percentCorrect: function(e) {
										var t = e.smart_count,
											n = e.percentCorrect;
										return (0, i._)(t, "<span class='correct'>".concat(n, "%</span> Correct of ").concat(t, " Question Answered"), "<span class='correct'>".concat(n, "%</span> Correct of ").concat(t, " Questions Answered"))
									},
									examProgress: function(e) {
										var t = e.smart_count,
											n = e.answeredCount;
										return (0, i._)(t, "".concat(n, " Answered of ").concat(t, " Question"), "".concat(n, " Answered of ").concat(t, " Questions"))
									},
									notStarted: "Not yet started"
								}
							},
							emptyIndex: {
								title: "You have no Custom Quizzes just yet.",
								startButton: {
									label: "Create a Custom Quiz"
								},
								practiceExamButton: {
									label: "Create a Practice Exam"
								},
								instructions: {
									title: "There are two ways to test your knowledge using a subset of MKSAP 19 questions. Here’s how it works:",
									practice: "Take a practice exam. Work through a set of 60 random questions, based on the ABIM blueprint, with a 2-hour time limit.",
									quizzes: "Create your own randomized test. Choose exam mode (timed) or study mode (untimed) and apply filters to include the content you want to study.",
									summary: "Upon completion, view your results, evaluate your progress, and study the relevant questions and related text through the answer sheet details view."
								}
							},
							show: {
								pageTitle: function(e) {
									var t = e.quizName;
									return "".concat(t, " - Custom Quizzes")
								},
								toolbar: {
									title: function(e) {
										var t = e.quizName;
										return "Custom Quizzes: ".concat(t)
									}
								},
								buttons: {
									duplicateQuiz: {
										label: "Duplicate Quiz"
									},
									deleteQuiz: {
										label: "Delete Quiz"
									}
								},
								loadingQuiz: {
									label: "Loading Quiz..."
								},
								answersheet: {
									title: "Answer Sheet"
								}
							},
							newQuiz: {
								pageTitle: "New Custom Quiz",
								toolbar: {
									title: "Custom Quizzes"
								},
								buttons: {
									continue: {
										label: "Continue"
									},
									back: {
										label: "Back"
									},
									createAndReview: {
										label: "Confirm Your Quiz Options"
									}
								},
								errorMessage: "An error occurred while creating your quiz.",
								title: "Create a randomized quiz.",
								subTitle: "Complete the 5 steps to create your custom quiz.",
								offlineDialog: {
									title: "Offline",
									message: "You are currently offline. You must be connected to the Internet to create a Custom Quiz.",
									returnToIndexButton: {
										label: "Return to Quiz Index"
									}
								},
								step1: {
									title: "Study mode or exam mode?",
									summary: {
										timeLimit: function(e) {
											var t = e.duration;
											return "".concat(t, " minute time limit")
										}
									},
									studyMode: {
										label: "Study Mode",
										description: "Untimed quiz, see answers instantly, and compare to your peers."
									},
									examMode: {
										label: "Exam Mode",
										description: "Timed exam, see the answers upon completion, and simulate testing conditions."
									},
									timeLimit: {
										label: "Enter number of minutes:",
										help: "Enter a time limit between 1 and 1440 minutes (24 hours)"
									},
									errors: {
										mode: "Please choose a quiz mode",
										timeLimit: "Please enter a time limit between 1 minute and 1440 minutes (24 hours)"
									}
								},
								step2: {
									title: "Which subspecialties?",
									summary: {
										allSubspecialties: "All subspecialties selected"
									},
									description: "Questions will be chosen randomly from the subjects you select.",
									selectAll: "Select All",
									clearAll: "Clear All",
									errors: {
										subspecialties: "Please choose one or more subspecialties"
									}
								},
								step3: {
									title: "Which questions?",
									sources: {
										label: "Add question sources:",
										mksap: function(e) {
											var t = e.smart_count;
											return "".concat(t, " MKSAP questions")
										},
										quickQs: function(e) {
											var t = e.smart_count;
											return "".concat(t, " MKSAP Quick Qs")
										},
										updates: function(e) {
											var t = e.smart_count;
											return "".concat(t, " MKSAP 19 Extension questions")
										},
										vdx: function(e) {
											var t = e.smart_count;
											return "".concat(t, " Virtual Dx questions")
										}
									},
									answerType: {
										label: "Limit by answer type:",
										unanswered: function(e) {
											var t = e.smart_count;
											return "".concat(t, " Unanswered")
										},
										correct: function(e) {
											var t = e.smart_count;
											return "".concat(t, " Correct")
										},
										incorrect: function(e) {
											var t = e.smart_count;
											return "".concat(t, " Incorrect")
										}
									},
									questionType: {
										label: "Limit by question type:",
										hospitalist: function(e) {
											var t = e.smart_count;
											return "".concat(t, " Hospitalist questions")
										},
										hvc: function(e) {
											var t = e.smart_count;
											return "".concat(t, " High Value Care questions")
										},
										starred: function(e) {
											var t = e.smart_count;
											return "".concat(t, " Starred questions")
										}
									},
									totalQuestions: function(e) {
										var t = e.smart_count;
										return "".concat(t, " Total selected questions available")
									},
									errors: {
										availableQuestions: "No questions match the filters. Please try again"
									},
									summary: {
										unanswered: "Unanswered",
										correct: "Correct",
										incorrect: "Incorrect",
										hvc: "High Value Care",
										hospitalist: "Hospitalist",
										starred: "Starred"
									}
								},
								step4: {
									title: "How many questions?",
									summary: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "".concat(t, " question"), "".concat(t, " questions"))
									},
									availableQuestions: function(e) {
										var t = e.smart_count;
										return "of a possible ".concat(t, " maximum number of questions")
									},
									help: function(e) {
										var t = e.smart_count;
										return "Enter a number of questions between 1 and ".concat(t)
									},
									error: function(e) {
										var t = e.smart_count;
										return "Please enter a number of questions between 1 and ".concat(t)
									}
								},
								step5: {
									title: "Name of the quiz?",
									name: {
										label: "Enter quiz name"
									},
									error: "Please enter a name"
								},
								summary: {
									mode: {
										label: "Mode:",
										study: "Study Mode",
										exam: "Exam Mode"
									},
									duration: {
										label: "Time limit:",
										value: function(e) {
											var t = e.smart_count;
											return (0, i._)(t, "".concat(t, " minute"), "".concat(t, " minutes"))
										}
									},
									subspecialties: {
										label: "Subspecialties:",
										all: "All"
									},
									questionSets: {
										label: "Question sources:",
										mksap: "MKSAP 19",
										quickQs: "Quick Qs",
										vdx: "Virtual Dx",
										updates: "MKSAP 19 Extension Questions",
										value: function(e) {
											var t = e.questionSets;
											return "".concat(t, " questions")
										}
									},
									questionResponseTypes: {
										label: "Answer type:",
										unanswered: "Unanswered",
										incorrect: "Incorrect",
										correct: "Correct",
										value: function(e) {
											var t = e.questionResponseTypes;
											return "".concat(t, " questions")
										}
									},
									questionTags: {
										label: "Limited to:",
										hospitalist: "Hospitalist",
										hvc: "High Value Care",
										starred: "Starred",
										value: function(e) {
											var t = e.questionTags;
											return "".concat(t, " questions")
										}
									},
									numberOfQuestions: {
										label: "Number of questions:",
										warning: "Please review"
									},
									name: {
										label: "Quiz name:"
									}
								}
							},
							showQuestion: {
								pageTitle: function(e) {
									var t = e.num,
										n = e.quizName;
									return "Question ".concat(t, " - ").concat(n, " - Custom Quizzes")
								},
								toolbar: {
									title: function(e) {
										var t = e.quizName;
										return "Custom Quizzes: ".concat(t)
									}
								}
							},
							results: {
								title: "Quiz Results"
							},
							newPracticeExamDialog: {
								title: "Practice Exam",
								details: function() {
									return r.createElement("div", null, r.createElement("span", null, "MKSAP 19 Practice Exams are excellent preparation for the ABIM exam.", " ", r.createElement("br", null), r.createElement("br", null), "Your practice exam will include:"), r.createElement("br", null))
								},
								instructions: {
									questions: {
										label: "60 randomized questions from across 11 subspecialties based on the ABIM exam blueprint"
									},
									time: {
										label: "2-hour time limit (with the ability to pause the timer, unlike the ABIM exam)."
									},
									cme: {
										label: "Correct answers will count toward your CME/MOC progress and overall completion of MKSAP 19."
									},
									results: {
										label: "After the practice exam, evaluate your results, study relevant questions, and read related text."
									},
									luck: {
										label: "Good Luck!"
									}
								},
								confirmButton: {
									label: "Start Practice Exam"
								}
							}
						},
						assignments: {
							quizCompleteDialog: {
								title: "Assignment Completed",
								body: "Congratulations! You have completed this assignment. Your results will be sent to your program.",
								resultsButton: {
									label: "Review Results"
								}
							},
							index: {
								pageTitle: "Assignments",
								toolbar: {
									title: "Assignments"
								},
								buttons: {
									startQuiz: {
										label: "Start"
									},
									resumeQuiz: {
										label: "Resume"
									}
								},
								instructions: "Your residency program uses MKSAP 19 Tracker. In order to receive credit towards the assignment, your must access it via assignments. Answering the question elsewhere (e.g. the Questions or Custom Quizzes) will not count towards your assignment progress.",
								active: "Assignments in Progress",
								completed: "Completed Assignments",
								noAssignments: "You have not yet received any assignments.",
								noActiveQuizzes: "You currently have no assignments in progress.",
								quiz: {
									totalQuestions: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "".concat(t, " Question"), "".concat(t, " Questions"))
									},
									percentCorrect: function(e) {
										var t = e.smart_count,
											n = e.percentCorrect;
										return (0, i._)(t, "<span class='correct'>".concat(n, "%</span> Correct of ").concat(t, " Question Answered"), "<span class='correct'>".concat(n, "%</span> Correct of ").concat(t, " Questions Answered"))
									},
									examProgress: function(e) {
										var t = e.smart_count,
											n = e.answeredCount;
										return (0, i._)(t, "".concat(n, " Answered of ").concat(t, " Questions"), "".concat(n, " Answered of ").concat(t, " Questions"))
									},
									notStarted: "Not yet started"
								}
							},
							emptyIndex: {
								title: "You have no assignments just yet.",
								subTitle: function(e) {
									var t = e.residencyProgramName;
									return "Assignments are provided by ".concat(t, ".")
								},
								instructions: {
									title: "The Assignments feature allows your residency program to design personalized learning. Here’s how it works:",
									intro: {
										label: "Your residency program uses MKSAP 19 Tracker, a companion application for residency programs to help monitor and facilitate your progress. The Assignments feature allows your residency program to select MKSAP 19 questions for you to complete."
									},
									credit: {
										label: "In order to receive credit towards an assignment, you must access it via the Assignments tab. Answering the question elsewhere (e.g., through Questions or Custom Quizzes) will not count towards your assignment progress."
									},
									communication: {
										label: "You will be alerted to new assignments on the dashboard and here on the assignments home page. Assignments in progress and completed assignments are available for your and your program coordinator’s review."
									}
								}
							},
							show: {
								pageTitle: function(e) {
									var t = e.quizName;
									return "".concat(t, " - Assignments")
								},
								toolbar: {
									title: function(e) {
										var t = e.quizName;
										return "Assignments: ".concat(t)
									}
								},
								loadingQuiz: {
									label: "Loading Assignment..."
								},
								answersheet: {
									title: "Answer Sheet"
								},
								comments: "Assignment Instructions"
							},
							showQuestion: {
								pageTitle: function(e) {
									var t = e.num,
										n = e.quizName;
									return "Question ".concat(t, " - ").concat(n, " - Assignments")
								},
								toolbar: {
									title: function(e) {
										var t = e.quizName;
										return "Assignments: ".concat(t)
									}
								}
							}
						},
						settings: {
							pageTitle: "Settings",
							title: "Settings",
							account: {
								title: "Account Profile",
								fullName: {
									label: "Full Name:"
								},
								email: {
									label: "Email:"
								},
								username: {
									label: "Account Login:"
								},
								acpNumber: {
									label: "ACP Number:"
								},
								password: {
									label: "Account Password:",
									button: "Edit Password"
								},
								edit: {
									label: "All changes to your account will be handled through acponline.org in a new window. To see your changes simply refresh this page.",
									button: "Edit Account Profile"
								}
							},
							display: {
								title: "Display Settings",
								nightMode: {
									label: "Night Mode:"
								},
								fontSize: {
									label: "Font Size:",
									buttons: {
										increase: {
											title: "Increase Font Size"
										},
										decrease: {
											title: "Decrease Font Size"
										},
										reset: {
											title: "Reset Font Size"
										}
									}
								},
								fontWeight: {
									label: "Font Weight:"
								}
							},
							rating: {
								form: {
									title: "Ratings and Reviews"
								},
								completed: {
									title: "Thank you for rating MKSAP 19"
								}
							}
						},
						boardBasics: {
							bookIndex: {
								pageTitle: function(e) {
									var t = e.bookName;
									return "".concat(t, " Board Basics")
								},
								toolbar: {
									title: function(e) {
										var t = e.bookName;
										return "".concat(t, " Board Basics")
									}
								},
								title: "Table of Contents"
							},
							modal: {
								title: "Board Basics E-book",
								img: {
									alt: "Board Basics"
								},
								button: {
									label: "Board Basic E-book Info"
								},
								body: function() {
									return r.createElement(r.Fragment, null, r.createElement("p", null, "Count on Board Basics for an intensive ABIM Board review. Board Basics is derived from MKSAP 19 content, but presented in a succinct digest-style with key facts, tables, and test-taking tips to help you pass your Boards. Available in print format with accompanying e-book."), r.createElement("p", null, "Board Basics is included for free with your purchase of MKSAP 19 Complete or if you are an ACP Resident/Fellow Member purchasing any MKSAP 19 format. MKSAP 19 Print or Digital subscribers can purchase Board Basics as an enhancement for $119."))
								}
							}
						},
						dyl: {
							pageTitle: function() {
								return "Document Your Learning"
							},
							title: function() {
								return "Document Your Learning"
							},
							desc: "Intended for residents and program directors, create and send custom progress reports to demonstrate Medical Knowledge self assessment learning.",
							about: {
								aboutButton: {
									label: "About Document Your Learning"
								}
							},
							residents: {
								button: {
									label: "For Residents"
								}
							},
							directors: {
								button: {
									label: "For Program Directors"
								}
							},
							step1: {
								stepLabel: "Step 1",
								title: "Select the questions to include in your report.",
								desc: {
									text: function(e) {
										var t = e.link;
										return r.createElement("span", null, "Only objectives from answered questions can be included in your report. To include other objectives in your report, ", t)
									},
									link: function(e) {
										var t = e.bookName;
										return "continue working through ".concat(t, ".")
									}
								}
							},
							step2: {
								stepLabel: "Step 2",
								noEOs: {
									title: function() {
										return "No questions included"
									},
									desc: "No educational objectives will be included in this report."
								},
								answeredEOs: {
									title: function(e) {
										var t = e.count,
											n = e.bookName;
										return (0, i._)(t, "Review your 1 answered ".concat(n, " question"), "Review your ".concat(t, " answered ").concat(n, " questions"))
									},
									desc: "The learning objectives for each question will be included in your report."
								},
								correctEOs: {
									title: function(e) {
										var t = e.count,
											n = e.bookName;
										return (0, i._)(t, "Review your 1 correctly answered ".concat(n, " question"), "Review your ".concat(t, " correctly answered ").concat(n, " questions"))
									},
									desc: "The learning objectives for each question will be included in your report."
								},
								incorrectEOs: {
									title: function(e) {
										var t = e.count,
											n = e.bookName;
										return (0, i._)(t, "Review your 1 incorrectly answered ".concat(n, " question"), "Review your ".concat(t, " incorrectly answered ").concat(n, " questions"))
									},
									desc: "The learning objectives for each question will be included in your report."
								}
							},
							step3: {
								stepLabel: "Step 3 ",
								title: " Include a personal reflection or description of your progress.",
								desc: " Optional",
								comments: {
									label: "Describe the progress you've made."
								}
							},
							step4: {
								stepLabel: "Step 4",
								title: "Download to save or print, or share your report by email.",
								downloadButton: {
									label: "Download Report"
								},
								emailButton: {
									label: "Email Report"
								}
							},
							instructions: {
								title: "Document Your Learning instructions:",
								residentsButton: {
									label: "For Residents"
								},
								residents: {
									title: "Instructions For Residents",
									subTitle: "This feature lets you create and send progress reports to your program director or others.",
									content: function() {
										return r.createElement(r.Fragment, null, r.createElement("p", null, "The reports present your current progress on questions you have answered and your reflection on your learning experience. The resulting documentation can be used to demonstrate medical knowledge, one of six general competencies endorsed by the Accreditation Council for Graduate Medical Education (ACGME)."), r.createElement("p", null, "To use this feature, click on the appropriate section name and follow the instructions to create your documentation report for the section."), r.createElement("p", null, "Note that while your report will not be permanently stored on MKSAP, you will have the option to email the report to yourself and others and/or save the PDF file to your hard drive or another location you choose. There is no limit on the number of reports you can create and share."))
									}
								},
								directorsButton: {
									label: "For Program Directors"
								},
								directors: {
									title: "Instructions For Directors",
									subTitle: "You can ask your residents to use this feature to demonstrate medical knowledge.",
									content: function() {
										return r.createElement(r.Fragment, null, r.createElement("p", null, "Reports will be emailed to you in PDF format, or your residents can submit a printed form. Reports may also be saved and uploaded to any portfolio systems that support the PDF format."), r.createElement("p", null, "The reports document the MKSAP 19 questions that residents have answered and will include their reflections on their learning experiences. The form also has the option to include the educational objectives for the questions answered."), r.createElement("p", null, "Please instruct your residents on the process you would like them to follow to submit these reports to you. There is no limit on the number of reports they can create and share with you, so you may opt to have them create and share reports on a set frequency or following their completion of each section. You can then save their reports as documentation that demonstrates medical knowledge residents in your program have gained."))
									}
								}
							},
							form: {
								title: "Choose which objectives to include in your report",
								desc: {
									text: function(e) {
										var t = e.link;
										return r.createElement("span", null, "Only objectives from answered questions can be included in your report. To include other objectives in your report, ", t)
									},
									link: function(e) {
										var t = e.bookName;
										return "continue working through ".concat(t, ".")
									}
								},
								objectiveTypes: {
									label: "Objectives for...",
									none: "No questions",
									all: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "".concat(t, " answered question"), "".concat(t, " answered questions"))
									},
									correct: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "".concat(t, " correctly answered question"), "".concat(t, " correctly answered questions"))
									},
									incorrect: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "".concat(t, " incorrectly answered question"), "".concat(t, " incorrectly answered questions"))
									}
								},
								objectiveList: {
									label: "Objectives for this report",
									empty: "No objectives chosen for this report",
									item: {
										prefix: function(e) {
											var t = e.num;
											return "Question ".concat(t, ": ")
										}
									}
								},
								comments: {
									desc: "Your report can include a personal reflection or description of your progress.",
									label: "Describe the progress you've made."
								},
								downloadButton: {
									label: "Download Report"
								},
								emailButton: {
									label: "Email Report"
								}
							},
							email: {
								title: "Email Report",
								hd: "Send to yourself and others",
								desc: "A copy of this e-mail will be automatically sent to your e-mail address. To send an e-mail to multiple addresses, type the recipients' addresses separated by commas in the To: field (e.g., john@yahoo.com, jane@gmail.com).",
								sendEmailError: "There was an error sending your report. Please try again.",
								to: {
									label: "To:",
									error: "Enter one or more valid email addresses separated by commas"
								},
								subject: {
									label: "Subject:",
									value: function(e) {
										var t = e.bookName;
										return "MKSAP 19: ".concat(t)
									}
								},
								cc: {
									label: "CC:"
								},
								editUser: {
									label: "Not you?"
								},
								body: {
									label: "Message:",
									value: function(e) {
										var t = e.bookName,
											n = e.firstName,
											r = e.lastName;
										return "Hello,\n\nThe attached PDF file is documentation of my learning to date in the following ACP product: MKSAP 19: ".concat(t, "\n\nSincerely,\n").concat(n, " ").concat(r)
									}
								},
								attachment: {
									label: "Attachment:",
									value: function(e) {
										var t = e.bookId,
											n = e.firstName,
											r = e.lastName;
										return "MKSAP19-".concat(t, "-sa-").concat(n, "-").concat(r, ".pdf")
									}
								},
								sendButton: {
									label: "Send Report"
								},
								editUserButton: {
									label: "Edit Info"
								}
							},
							emailDialog: {
								success: {
									message: "Report successfully emailed",
									actionText: "OK"
								}
							},
							noProgress: {
								title: function(e) {
									var t = e.bookName;
									return "You have nothing to document in ".concat(t, " yet.")
								},
								startButton: {
									label: "Start answering questions"
								},
								instructions: {
									title: "Document Your Learning presents your current progress on questions you have answered so you can reflect on your learning experience. Here's how it works:",
									form: {
										label: "Choose question types to include in your report: answered, correctly answered, incorrectly answered, or none. Review the listing of the associated objectives. Write an optional personal reflection or description of your progress."
									},
									export: {
										label: "Although your report will not be permanently saved within MKSAP, you have the option to email the report to yourself or others, and/or save the PDF file."
									},
									limits: {
										label: "There is no limit on the number of reports you can create and share. The report can be used to demonstrate medical knowledge, one of six general competencies endorsed by the Accreditation Council for Graduate Medical Education (ACGME)."
									}
								}
							}
						},
						submissions: {
							loading: function(e) {
								var t = e.name;
								return "Loading ".concat(t, " CME/MOC")
							},
							index: {
								pageTitle: "CME/MOC/CPD",
								toolbar: {
									title: "CME/MOC/CPD"
								},
								accountInfo: {
									title: "Changes to your CME/MOC account can be made through ACPONLINE.",
									accountButton: {
										label: "Edit Account"
									}
								},
								contextMenu: {
									royalCollege: "Royal College MOC Credits",
									racp: "RACP CPD Credits",
									help: "Help with CME/MOC/CPD",
									info: "CME Information & Disclosures"
								},
								submissionDeadline: {
									partA: function() {
										return r.createElement(r.Fragment, null, "To receive ", r.createElement("em", null, "AMA PRA Category 1 Credits"), "™ and MOC points, answer all of the provided questions, achieving a score of at least 50% correct. The progress shown here reflects your best effort across all attempts to answer a question. Clearing your answers will not impact your progress towards CME and MOC.")
									}
								},
								submission: {
									title: function(e) {
										var t = e.name;
										return "".concat(t)
									},
									subTitle: function(e) {
										var t = e.smart_count;
										return "up to ".concat(t, " CME credits/MOC points")
									},
									partADates: "Available July 31, 2018 - July 31, 2021",
									partBDates: "Available December 31, 2018 - December 31, 2021",
									vdxDates: "Available March 29, 2019 - March 29, 2022",
									x1Dates: "Available July 31, 2019 - July 31, 2022",
									x2Dates: "Available January 15, 2020 - January 15, 2023",
									x3Dates: "Available July 31, 2020 - July 31, 2023",
									x4Dates: "Available January 15, 2021 - January 16, 2024",
									cmeCredits: {
										unclaimed: function() {
											return "CME not yet eligible"
										},
										available: function() {
											return "CME unclaimed"
										},
										claimed: function(e) {
											var t = e.smart_count;
											return (0, i._)(t, "CME claimed (".concat(t, ")"), "CME claimed (".concat(t, ")"))
										}
									},
									mocCredits: {
										unclaimed: function() {
											return "MOC not yet eligible"
										},
										available: function() {
											return "MOC unclaimed"
										},
										claimed: function(e) {
											var t = e.smart_count;
											return (0, i._)(t, "MOC claimed (".concat(t, ")"), "MOC claimed (".concat(t, ")"))
										}
									}
								}
							},
							show: {
								pageTitle: function(e) {
									var t = e.bookName;
									return "".concat(t, " CME/MOC")
								},
								toolbar: {
									title: function(e) {
										var t = e.name;
										return "CME/MOC: ".concat(t)
									}
								},
								progress: {
									notEligible: "Not Yet Eligible",
									eligible: "Eligible",
									mocEligible: "MOC Eligible/CME Completed",
									completed: "Completed",
									correctGoal: "50% correct goal",
									completeGoal: "100% complete goal",
									help: {
										title: "About CME/MOC Progress",
										body: "The progress shown here reflects your best effort across all attempts to answer a question.  Clearing your answers will not impact your progress towards CME and MOC."
									}
								},
								path: {
									title: "Path to CME/MOC",
									step1: "All questions answered at least once",
									step2: "Achieve a score of at least 50% correct",
									step3: "Submit CME Credits claim form",
									step4: "Submit MOC Points claim form"
								},
								incompleteAnswersheet: {
									step: "1",
									title: "CME",
									subTitle: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "Up to ".concat(t, " credit"), "Up to ".concat(t, " credits"))
									},
									partAdates: "Available July 31, 2018 - July 31, 2021",
									partBdates: "Available December 31, 2018 - December 31, 2021",
									vdxDates: "Available March 29, 2019 - March 29, 2022",
									x1Dates: "Available July 31, 2019 - July 31, 2022",
									x2Dates: "Available January 15, 2020 - January 15, 2023",
									x3Dates: "Available July 31, 2020 - July 31, 2023",
									x4Dates: "Available January 15, 2021 - January 16, 2024",
									instructions: function(e) {
										var t = e.name;
										return "You are not yet eligible to submit for ".concat(t, " CME credits. To become eligible, all questions must be answered at least once.")
									},
									action: {
										label: function(e) {
											var t = e.name;
											return "Complete all unanswered ".concat(t, " questions ")
										},
										button: {
											label: "Answer Sheet"
										}
									}
								},
								invalidScore: {
									step: "2",
									title: "CME",
									subTitle: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "".concat(t, " Credit Available"), "".concat(t, " Credits Available"))
									},
									partAdates: "Available July 31, 2018 - July 31, 2021",
									partBdates: "Available December 31, 2018 - December 31, 2021",
									vdxDates: "Available March 29, 2019 - March 29, 2022",
									x1Dates: "Available July 31, 2019 - July 31, 2022",
									x2Dates: "Available January 15, 2020 - January 15, 2023",
									x3Dates: "Available July 31, 2020 - July 31, 2023",
									x4Dates: "Available January 15, 2021 - January 16, 2024",
									instructions: function(e) {
										var t = e.name;
										return "You are not yet eligible to submit for ".concat(t, " CME credits. To become eligible, achieve a score of at least 50%")
									},
									action: {
										label: "Create a new custom quiz to retry all incorrect questions ",
										button: {
											label: "Create Quiz"
										}
									}
								},
								cmeForm: {
									step: "3",
									title: "CME Submission Form",
									requiredNote: " * Required fields",
									buttons: {
										editAccount: {
											label: "Edit account info"
										},
										submitCme: {
											label: "Submit for CME"
										}
									},
									instructions: {
										eligible: function(e) {
											var t = e.smart_count;
											return (0, i._)(t, "You are eligible to submit for ".concat(t, " CME credit."), "You are eligible to submit for ".concat(t, " CME credits."))
										},
										claim: "Claim your CME credits by filling out the submission form."
									},
									name: {
										label: "*Name:"
									},
									acpNumber: {
										label: "*ACP Number:"
									},
									email: {
										label: "Email:",
										error: "Please enter a valid email address."
									},
									sendEmail: {
										label: "Send a confirmation email"
									},
									credits: {
										label: "*Select Time & Credits",
										help: "Time & Credits should commensurate with the extent of your particiation in activity to the nearest quarter hour.",
										error: "Please select your credits."
									},
									defaultErrorMessage: "There was an error submitting for CME. Please try again later."
								},
								cmeCompleted: {
									buttons: {
										certificate: {
											label: "View/Print Certificate PDF"
										}
									},
									title: "CME Claimed",
									content: function(e) {
										var t = e.name;
										return "Congrats! You have completed submission for ".concat(t, " CME credits. You are now eligible for MOC points.")
									},
									submissionDate: {
										label: function(e) {
											var t = e.date;
											return "Submitted on ".concat(t)
										}
									},
									creditsClaimed: {
										label: function(e) {
											var t = e.smart_count;
											return (0, i._)(t, "".concat(t, " Credit"), "".concat(t, " Credits"))
										}
									}
								},
								mocIneligible: {
									title: "MOC",
									content: function(e) {
										var t = e.name;
										return "You are not yet eligible to submit for ".concat(t, " MOC points. To become eligible, complete the path to CME first.")
									}
								},
								mocForm: {
									step: "4",
									title: "MOC Submission Form",
									requiredNote: "*All fields are required",
									firstName: {
										label: "*First Name:",
										error: "Please enter your first name."
									},
									lastName: {
										label: "*Last Name:",
										error: "Please enter your last name."
									},
									abimNumber: {
										label: "*ABIM Number:",
										error: "Please enter your six digit ABIM number",
										help: "How to find your ABIM number",
										warning: "The ABIM number you entered matches your ACP number.  Please make sure you've entered your ABIM number before continuing."
									},
									dateOfBirth: {
										label: "*Date of Birth:",
										help: "Enter your birth date using mm/dd/yyyy format"
									},
									creditsAvailable: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "".concat(t, " Point Available"), "".concat(t, " Points Available"))
									},
									defaultErrorMessage: "There was an error submitting for MOC. Please confirm the information you entered above and try again.",
									submitButton: {
										label: "Submit for MOC"
									}
								},
								mocCompleted: {
									title: "MOC Claimed",
									content: function(e) {
										var t = e.name;
										return "Congrats! You have completed submission for ".concat(t, " MOC points.")
									},
									submissionDate: {
										label: function(e) {
											var t = e.date;
											return "Submitted on ".concat(t)
										}
									},
									creditsClaimed: {
										label: function(e) {
											var t = e.smart_count;
											return (0, i._)(t, "".concat(t, " Point"), "".concat(t, " Points"))
										}
									}
								}
							},
							newCmeQuizDialog: {
								title: "New Custom Quiz",
								quizName: {
									label: "Name"
								},
								confirmButton: {
									label: "Create Quiz"
								}
							}
						},
						relatedContent: {
							questions: {
								section: {
									title: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "Related Question", "Related Questions")
									}
								},
								chapter: {
									title: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "".concat(t, " Related Question:"), "Related Questions:")
									}
								},
								link: function(e) {
									var t = e.num;
									return "Question ".concat(t)
								}
							},
							question: {
								title: function(e) {
									var t = e.title;
									return r.createElement(r.Fragment, null, "Related Questions: ", t)
								},
								link: "Jump to this question"
							},
							text: {
								shortTitle: "Related Text",
								title: function(e) {
									var t = e.num;
									return "Related Text: Question ".concat(t)
								},
								button: "Read Related Text",
								link: "View the full text"
							}
						},
						nlv: {
							title: "Reference Ranges",
							download: "View Reference Ranges PDF",
							form: {
								title: "Search for a reference range",
								term: {
									label: "Filter by name:"
								},
								category: {
									label: "Filter by category:",
									all: "All"
								}
							},
							results: {
								titles: {
									noFilter: "All Reference Ranges",
									filtered: "Filtered Reference Ranges"
								},
								empty: "No Reference Ranges match filters above"
							}
						},
						figures: {
							loading: function(e) {
								var t = e.smart_count;
								return (0, i._)(t, "Loading Figure...", "Loading Figures...")
							},
							bookIndex: {
								toolbar: {
									title: function(e) {
										var t = e.bookName;
										return "".concat(t, " Figures")
									}
								},
								figure: {
									title: function(e) {
										var t = e.num;
										return "Figure ".concat(t)
									}
								}
							},
							show: {
								toolbar: {
									title: function(e) {
										var t = e.bookName;
										return "".concat(t, " Figures")
									}
								},
								title: function(e) {
									var t = e.num;
									return "Figure ".concat(t, ".")
								},
								inQuestion: {
									title: function(e) {
										var t = e.num;
										return "Question ".concat(t)
									}
								},
								zoomInButton: {
									label: "Zoom In"
								},
								zoomOutButton: {
									label: "Zoom Out"
								}
							}
						},
						tables: {
							loading: function(e) {
								var t = e.smart_count;
								return (0, i._)(t, "Loading Table...", "Loading Tables...")
							},
							bookIndex: {
								toolbar: {
									title: function(e) {
										var t = e.bookName;
										return "".concat(t, " Tables")
									}
								},
								table: {
									title: function(e) {
										var t = e.num;
										return "Table ".concat(t, ": ")
									}
								}
							},
							show: {
								toolbar: {
									title: function(e) {
										var t = e.bookName;
										return "".concat(t, " Tables")
									}
								}
							}
						},
						recentlyViewed: {
							title: "Recently Viewed",
							getStartedButton: {
								label: "Get Started"
							},
							question: {
								label: function(e) {
									var t = e.number;
									return "Question ".concat(t)
								}
							}
						},
						questions: {
							loading: function(e) {
								var t = e.smart_count;
								return (0, i._)(t, "Loading Question...", "Loading Questions...")
							},
							charts: {
								correctnessDonut: {
									label: function(e) {
										var t = e.percentage;
										return "<span>".concat(t, "%</span><span>Correct</span>")
									}
								},
								completenessDonut: {
									label: function(e) {
										var t = e.percentage;
										return "<span>".concat(t, "%</span><span>Complete</span>")
									}
								}
							},
							index: {
								pageTitle: "Questions",
								vdxPageTitle: "Virtual Dx",
								qqPageTitle: "MKSAP Quick Qs",
								extensionQuestionsPageTitle: "Extension Questions",
								toolbar: {
									title: "Questions",
									vdxTitle: "Virtual Dx",
									qqTitle: "MKSAP Quick Qs",
									extensionQuestionsTitle: "Extension Questions"
								},
								extensionQuestionsTabs: {
									tabLabel: function(e) {
										var t = e.setNumber;
										return "Set ".concat(t)
									}
								},
								progress: {
									questionsTitle: "Overview",
									vdxTitle: "Virtual Dx Overview",
									x1Title: "Set 1 Overview",
									x2Title: "Set 2 Overview",
									x3Title: "Set 3 Overview",
									x4Title: "Set 4 Overview"
								},
								nav: {
									notes: function(e) {
										var t = e.smart_count;
										return "Notes Index (".concat(t, ")")
									},
									highlights: function(e) {
										var t = e.count;
										return "Highlight Index (".concat(t, ")")
									},
									contributors: "Contributors/Disclosures",
									hvc: "High Value Care"
								},
								book: {
									totalQuestions: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "".concat(t, " Question"), "".concat(t, " Questions"))
									},
									percentCorrect: function(e) {
										var t = e.smart_count,
											n = e.percentCorrect;
										return (0, i._)(t, "<span class='correct'>".concat(n, "% Correct</span> <span class='completed'>of ").concat(t, " Question Answered</span>"), "<span class='correct'>".concat(n, "% Correct</span> <span class='completed'>of ").concat(t, " Questions Answered</span>"))
									},
									notStarted: "Not yet started"
								}
							},
							bookIndex: {
								pageTitle: function(e) {
									var t = e.bookName;
									return "".concat(t, " Questions")
								},
								vdxPageTitle: function(e) {
									var t = e.bookName;
									return "Virtual Dx: ".concat(t)
								},
								qqPageTitle: function(e) {
									return "MKSAP Quick Qs"
								},
								x1PageTitle: function(e) {
									var t = e.bookName;
									return "Extension Questions Set 1: ".concat(t)
								},
								x2PageTitle: function(e) {
									var t = e.bookName;
									return "Extension Questions Set 2: ".concat(t)
								},
								x3PageTitle: function(e) {
									var t = e.bookName;
									return "Extension Questions Set 3: ".concat(t)
								},
								x4PageTitle: function(e) {
									var t = e.bookName;
									return "Extension Questions Set 4: ".concat(t)
								},
								toolbar: {
									title: function(e) {
										var t = e.bookName;
										return "Questions: ".concat(t)
									},
									vdxTitle: function(e) {
										var t = e.bookName;
										return "Virtual Dx: ".concat(t)
									},
									qqTitle: function(e) {
										return "MKSAP Quick Qs"
									},
									x1Title: function(e) {
										var t = e.bookName;
										return "Extension Questions Set 1: ".concat(t)
									},
									x2Title: function(e) {
										var t = e.bookName;
										return "Extension Questions Set 2: ".concat(t)
									},
									x3Title: function(e) {
										var t = e.bookName;
										return "Extension Questions Set 3: ".concat(t)
									},
									x4Title: function(e) {
										var t = e.bookName;
										return "Extension Questions Set 4: ".concat(t)
									}
								},
								answersheetDetailsButton: {
									label: "Answer Sheet Details"
								},
								nav: {
									notCmeEligible: "Not Yet Eligible for CME",
									cmeEligible: "Eligible for CME",
									mocEligible: "Eligible for MOC",
									completedMoc: "Completed CME/MOC",
									notes: function(e) {
										var t = e.smart_count;
										return "Notes Index (".concat(t, ")")
									},
									highlights: function(e) {
										var t = e.count;
										return "Highlight Index (".concat(t, ")")
									},
									dyl: "Document Your Learning"
								},
								productLinks: {
									title: function(e) {
										var t = e.subspecialty;
										return "More ".concat(t)
									},
									text: "Text",
									questions: "Questions",
									vdx: "Virtual Dx",
									qq: "MKSAP Quick Qs",
									flashcards: "Flashcards"
								}
							},
							answersheet: {
								title: "Answer Sheet",
								clearAnswersheetButton: {
									label: function(e) {
										var t = e.filter;
										return r.createElement(r.Fragment, null, "Clear ", t, " Answers")
									}
								},
								vdxBibliography: function(e) {
									var t = e.bookName,
										n = e.href;
									return r.createElement(r.Fragment, null, "References pertaining to Virtual Dx ", t, " content can be found in", " ", r.createElement("a", {
										href: n
									}, "MKSAP 19 ", t, " text"), ", with a bibliography section at the end of each chapter.")
								},
								filter: {
									all: {
										label: "Show All Questions",
										name: "All"
									},
									answered: {
										label: "Show Answered Questions",
										name: "Answered"
									},
									correct: {
										label: "Show Correct Questions",
										name: "Correct"
									},
									incorrect: {
										label: "Show Incorrect Questions",
										name: "Incorrect"
									},
									unanswered: {
										label: "Show Unanswered Questions",
										name: "Unanswered"
									},
									starred: {
										label: "Show Starred Questions",
										name: "Starred"
									}
								},
								noFilterMatch: "No questions match your filter"
							},
							clearAnswersheetDialog: {
								title: "Clear your answers?",
								warningMessage: {
									all: function(e) {
										var t = e.answersheetName;
										return "Are you sure you want to clear all your answers in ".concat(t, "? This action cannot be undone but will not erase your progress towards CME/MOC. Highlights in the clinical scenario (purple highlights) will also be cleared.")
									},
									filtered: function(e) {
										var t = e.filter,
											n = e.answersheetName;
										return "Are you sure you want to clear your ".concat(t, " answers in ").concat(n, "? This action cannot be undone but will not erase your progress towards CME/MOC. Highlights in the clinical scenario (purple highlights) will also be cleared.")
									}
								},
								confirmButton: {
									label: "Clear Answers"
								}
							},
							progress: {
								totalQuestions: {
									label: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "".concat(t, " total question"), "".concat(t, " total questions"))
									}
								},
								percentCorrect: {
									label: function(e) {
										var t = e.percentage;
										return "".concat(t, "% correct")
									}
								},
								questionsAnswered: {
									label: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "of ".concat(t, " question completed"), "of ".concat(t, " questions completed"))
									}
								}
							},
							bookDetails: {
								pageTitle: function(e) {
									var t = e.bookName;
									return "".concat(t, " Question Details")
								},
								toolbar: {
									title: function(e) {
										var t = e.bookName;
										return "Questions: ".concat(t)
									}
								},
								answersheetButton: {
									label: "Answer Sheet"
								},
								noDetails: {
									title: "We have no details to show you just yet",
									startBtn: {
										label: "Start answering questions"
									},
									instructions: {
										title: "Use the Answer Sheet Details to review your completed questions and study the relevant content. Here’s how it works:",
										filtering: "All completed questions are listed with the educational objective and your last response answer. Use the filter to narrow your view to focus on incorrect, correct, or starred questions.",
										navigating: "Click on the list item to view the question, answer, and critique. Click on the Related Text link to open the section’s related text for additional study."
									}
								}
							},
							answersheetDetails: {
								title: "Answer Sheet Details",
								filter: {
									answered: "Show All Answered Questions",
									correct: "Show All Correct Questions",
									incorrect: "Show All Incorrect Questions",
									starred: "Show All Starred Questions"
								},
								noFilterMatch: "No questions match your filter.",
								educationalObjective: {
									label: "Educational Objective:"
								},
								relatedTopicButton: {
									label: "Related Text"
								},
								relatedQuestion: {
									title: function(e) {
										var t = e.num;
										return "Question ".concat(t)
									}
								}
							},
							show: {
								pageTitle: function(e) {
									var t = e.bookName,
										n = e.num;
									return "Question ".concat(n, " - ").concat(t, " Questions")
								},
								vdxPageTitle: function(e) {
									var t = e.bookName,
										n = e.num;
									return "Question ".concat(n, " - ").concat(t, " - Virtual Dx")
								},
								qqPageTitle: function(e) {
									var t = e.num;
									return "Question ".concat(t, " - MKSAP Quick Qs")
								},
								x1PageTitle: function(e) {
									var t = e.bookName,
										n = e.num;
									return "Question ".concat(n, " - ").concat(t, " - Extension Questions Set 1")
								},
								x2PageTitle: function(e) {
									var t = e.bookName,
										n = e.num;
									return "Question ".concat(n, " - ").concat(t, " - Extension Questions Set 2")
								},
								x3PageTitle: function(e) {
									var t = e.bookName,
										n = e.num;
									return "Question ".concat(n, " - ").concat(t, " - Extension Questions Set 3")
								},
								x4PageTitle: function(e) {
									var t = e.bookName,
										n = e.num;
									return "Question ".concat(n, " - ").concat(t, " - Extension Questions Set 4")
								},
								toolbar: {
									title: function(e) {
										var t = e.bookName;
										return "Questions: ".concat(t)
									},
									vdxTitle: function(e) {
										var t = e.bookName;
										return "Virtual Dx: ".concat(t)
									},
									qqTitle: function(e) {
										return "MKSAP Quick Qs"
									},
									x1Title: function(e) {
										var t = e.bookName;
										return "Extension Questions Set 1: ".concat(t)
									},
									x2Title: function(e) {
										var t = e.bookName;
										return "Extension Questions Set 2: ".concat(t)
									},
									x3Title: function(e) {
										var t = e.bookName;
										return "Extension Questions Set 3: ".concat(t)
									},
									x4Title: function(e) {
										var t = e.bookName;
										return "Extension Questions Set 4: ".concat(t)
									}
								},
								contextMenu: {
									nlv: "Reference Ranges",
									relatedTopic: "Related Text",
									highlightIndex: "Highlight Index"
								},
								source: {
									label: function(e) {
										var t = e.questionSetName,
											n = e.bookName,
											r = e.questionNumber;
										return "Question source: ".concat(t, " > ").concat(n, " > Question ").concat(r)
									}
								},
								critique: {
									title: "Answer & Critique",
									correctAnswer: function(e) {
										var t = e.correctAnswer;
										return "Correct Answer: ".concat(t)
									},
									educationalObjective: "Educational Objective: ",
									bibliography: {
										title: "Bibliography"
									}
								},
								hiddenHighlights: {
									label: "You have cleared the answer to this question since creating a highlight in the critique section. The correct answer and critique section are shown so that you can see your highlights."
								},
								missingHighlights: {
									notice: {
										message: "Due to a content update, some highlights in this section have been cleared."
									}
								}
							},
							nextQuestionButton: {
								label: "Next Question"
							},
							questionPagination: {
								start: "Answer Sheet",
								end: "Answer Sheet"
							},
							unsavedQuestionDialog: {
								warningMessage: "You didn't submit your last answer",
								confirmButton: {
									label: "Back"
								}
							},
							vdx: {
								notAuthorized: {
									pageTitle: "Virtual Dx",
									toolbar: {
										title: "Virtual Dx"
									},
									title: "You don't have access to Virtual Dx",
									instructions: "To unlock this feature, upgrade to MKSAP 19 Complete.<br/>Contact Member and Product Support: 800-227-1915 (Monday-Friday 9am-5pm EST)",
									about: {
										title: " Virtual Dx",
										p1: "Over 400 Image-based self-assessment questions that are both fun and challenging. Useful for Board prep or to gauge the strength of your visual diagnostic skills. Quiz yourself in 11 major categories spanning internal medicine and the subspecialties. Earn up to 10 PRA Category 1 CME credits and MOC points."
									},
									promo: {
										title: "When you unlock Virtual Dx, you also receive Board Basics, Flashcards, and all 11 full-color MKSAP 19 books!"
									},
									contactInfo: {
										productName: "Virtual Dx"
									}
								}
							}
						},
						topics: {
							loading: function(e) {
								var t = e.smart_count;
								return (0, i._)(t, "Loading Topic...", "Loading Topics...")
							},
							index: {
								pageTitle: "Text",
								toolbar: {
									title: "Text"
								},
								book: {
									chapters: {
										label: function(e) {
											var t = e.count;
											return (0, i._)(t, "".concat(t, " Chapter"), "".concat(t, " Chapters"))
										}
									}
								},
								nav: {
									notes: function(e) {
										var t = e.smart_count;
										return "Notes Index (".concat(t, ")")
									},
									highlights: function(e) {
										var t = e.count;
										return "Highlight Index (".concat(t, ")")
									},
									contributors: "Contributors/Disclosures",
									hvc: "High Value Care",
									niu: "New Information Updates Index"
								}
							},
							bookIndex: {
								pageTitle: function(e) {
									var t = e.bookName;
									return "".concat(t, " Text")
								},
								toolbar: {
									title: function(e) {
										var t = e.bookName;
										return "".concat(t, " Text")
									}
								},
								title: "Table of Contents:",
								chapter: function(e) {
									var t = e.num;
									return "Chapter ".concat(t)
								},
								nav: {
									notes: function(e) {
										var t = e.smart_count;
										return "Notes Index (".concat(t, ")")
									},
									highlights: function(e) {
										var t = e.count;
										return "Highlight Index (".concat(t, ")")
									},
									contributors: "Contributors/Disclosures",
									hvc: "High Value Care",
									tables: "Table Index",
									figures: "Figure Index",
									hospitalist: "About Hospitalist Content",
									niu: function(e) {
										var t = e.smart_count;
										return "New Information Updates (".concat(t, ")")
									}
								}
							},
							hospitalistDialog: {
								title: "About Hospitalist Content",
								message: "For the convenience of subscribers, content that is specific to the hospital setting has been highlighted in blue. Hospital icons highlight where the hospital-based content begins, continues over more than one section and ends.",
								confirmButton: {
									label: "Close"
								}
							}
						},
						content: {
							lastUpdated: {
								content: {
									label: "This content was last updated in"
								}
							},
							keypoints: {
								title: function(e) {
									var t = e.smart_count;
									return (0, i._)(t, "Key Point", "Key Points")
								}
							},
							bibliography: {
								show: {
									label: "View Bibliography"
								},
								hide: {
									label: "Hide Bibliography"
								}
							}
						},
						notes: {
							topicIndex: {
								toolbar: {
									title: "Text Notes"
								},
								title: "Text Notes Index",
								content: function(e) {
									var t = e.notesIcon;
									return r.createElement(r.Fragment, null, "Add custom notes while reading text by selecting the notes icon", " ", t, ". Saved notes are stored and organized by subspecialty and topic.")
								},
								bookNotes: {
									title: function(e) {
										var t = e.bookName;
										return "".concat(t)
									},
									count: function(e) {
										var t = e.count;
										return (0, i._)(t, "".concat(t, " Note"), "".concat(t, " Notes"))
									}
								}
							},
							topicBookIndex: {
								toolbar: {
									title: "Text Notes"
								},
								title: function(e) {
									var t = e.smart_count,
										n = e.bookName;
									return (0, i._)(t, "".concat(t, " ").concat(n, " Text Note"), "".concat(t, " ").concat(n, " Text Notes"))
								},
								empty: {
									label: "No notes found! Create a note in Text and we'll store it here."
								},
								chapter: {
									label: function(e) {
										var t = e.chapterNum;
										return "Chapter ".concat(t)
									}
								},
								noteMenuItems: {
									noteSource: "Note Source"
								}
							},
							questionIndex: {
								toolbar: {
									title: "Question Bank: MKSAP Question Notes",
									vdxTitle: "Virtual Dx Notes",
									qqTitle: "MKSAP Quick Qs Notes",
									x1Title: "Extension Questions Set 1 Notes",
									x2Title: "Extension Questions Set 2 Notes",
									x3Title: "Extension Questions Set 3 Notes",
									x4Title: "Extension Questions Set 4 Notes"
								},
								title: "MKSAP Question Note Index",
								vdxTitle: "Virtual Dx Notes Index",
								qqTitle: "MKSAP Quick Qs Notes Index",
								x1Title: "Extension Questions Set 1 Notes",
								x2Title: "Extension Questions Set 2 Notes",
								x3Title: "Extension Questions Set 3 Notes",
								x4Title: "Extension Questions Set 4 Notes",
								content: function(e) {
									var t = e.notesIcon;
									return r.createElement(r.Fragment, null, "Add custom notes while answering questions by selecting the notes icon", " ", t, ". Saved notes are stored and organized by question.")
								},
								bookNotes: {
									title: function(e) {
										var t = e.bookName;
										return "".concat(t)
									},
									count: function(e) {
										var t = e.count;
										return (0, i._)(t, "".concat(t, " Note"), "".concat(t, " Notes"))
									}
								}
							},
							questionBookIndex: {
								toolbar: {
									title: "Question Bank: MKSAP Question Notes",
									vdxTitle: "Virtual Dx Notes",
									qqTitle: "MKSAP Quick Qs Notes",
									x1Title: "Extension Questions Set 1 Notes",
									x2Title: "Extension Questions Set 2 Notes",
									x3Title: "Extension Questions Set 3 Notes",
									x4Title: "Extension Questions Set 4 Notes"
								},
								title: function(e) {
									var t = e.smart_count,
										n = e.bookName;
									return (0, i._)(t, "".concat(t, " ").concat(n, " Question Note"), "".concat(t, " ").concat(n, " Question Notes"))
								},
								vdxTitle: function(e) {
									var t = e.smart_count,
										n = e.bookName;
									return (0, i._)(t, "".concat(t, " ").concat(n, " Virtual Dx Note"), "".concat(t, " ").concat(n, " Virtual Dx Notes"))
								},
								qqTitle: function(e) {
									var t = e.smart_count,
										n = e.bookName;
									return (0, i._)(t, "".concat(t, " ").concat(n, " MKSAP Quick Qs Note"), "".concat(t, " ").concat(n, " MKSAP Quick Qs Notes"))
								},
								x1Title: function() {
									return "Extension Questions Set 1 Notes"
								},
								x2Title: function() {
									return "Extension Questions Set 2 Notes"
								},
								x3Title: function() {
									return "Extension Questions Set 3 Notes"
								},
								x4Title: function() {
									return "Extension Questions Set 4 Notes"
								},
								empty: {
									label: "No notes found! Create a note in Questions and we'll store it here."
								},
								question: {
									title: function(e) {
										var t = e.questionNum;
										return "Question ".concat(t)
									}
								},
								noteMenuItems: {
									noteSource: "Note Source"
								}
							},
							emptyBookNoteIndex: {
								title: "Compose some notes to see them listed here.",
								instructions: {
									title: "The Notes feature is a convenient tool for adding and saving custom text and bookmarks. Here’s how it works:",
									location: {
										label: "The Notes tool appears on all text and question pages. Open the Notes tool using the Add Note icon found in the upper bar, on the right. If available, associate your note with a section using the dropdown menu before you save your note."
									},
									save: {
										label: "A yellow badge on the corresponding page indicates a saved note. Saved notes are time-stamped and can be deleted. You can add additional notes, and notes will be stored until you delete them."
									},
									list: {
										label: "The Add Note tool lists notes that are saved and related to the current page. To view all notes, visit the Text Notes Index on the Text Index page. Notes are organized by subspecialty, topic, and then section. Each note has an associated note source that can be viewed for reference."
									}
								}
							},
							newNoteDialog: {
								title: "Add a Note",
								addNoteButton: {
									label: "Save Note"
								},
								noteText: {
									label: "Type note here",
									error: "Please enter a note in the field above"
								},
								sectionId: {
									label: "Choose a section"
								}
							},
							topicNotes: {
								addNote: "Add Note",
								title: function(e) {
									var t = e.smart_count;
									return (0, i._)(t, "".concat(t, " Saved Note"), "".concat(t, " Saved Notes"))
								},
								noteIndexButton: {
									label: "Notes Index"
								}
							},
							questionNotes: {
								addNote: "Add Note",
								title: function(e) {
									var t = e.smart_count;
									return (0, i._)(t, "".concat(t, " Saved Note"), "".concat(t, " Saved Notes"))
								},
								noteIndexButton: {
									label: "Notes Index"
								}
							},
							deleteNote: "Delete Note",
							deleteNoteDialog: {
								title: "Delete this note?",
								warningMessage: "Are you sure you want to delete this note? This action cannot be undone.",
								confirmButton: {
									label: "Delete Note"
								}
							},
							notesDialog: {
								title: "Notes"
							},
							moreNotes: {
								title: function(e) {
									var t = e.bookName;
									return t ? "More ".concat(t, " Notes") : "More Notes"
								},
								text: {
									label: function() {
										return "Text Notes"
									}
								},
								questions: {
									mksap19: {
										label: function() {
											return "MKSAP Question Notes"
										}
									},
									vdx: {
										label: function() {
											return "Virtual Dx Notes"
										}
									},
									qq: {
										label: function() {
											return "Quick Qs Notes"
										}
									}
								},
								boardBasics: {
									label: function() {
										return "Board Basics Notes"
									}
								}
							}
						},
						flashcards: {
							deckIndex: {
								pageTitle: "Flashcards",
								progress: {
									title: "Flashcard Overview"
								},
								toolbar: {
									title: "Flashcards"
								},
								about: {
									label: function(e) {
										var t = e.handleClick;
										return r.createElement(r.Fragment, null, "The MKSAP 19 adaptive learning flashcard algorithm is designed to help you learn more efficiently by showing you the cards you don't know more often. With the flashcard's periodic check-in feature, you can evaluate your progress as you study. Continue drilling until you have reached your goals.", " ", r.createElement("a", {
											href: "#",
											onClick: t
										}, "Learn more"))
									}
								}
							},
							showDeck: {
								pageTitle: function(e) {
									var t = e.deckName;
									return "".concat(t, " Flashcards")
								},
								toolbar: {
									title: function(e) {
										var t = e.deckName;
										return "Flashcards: ".concat(t)
									}
								},
								cardsViewed: {
									label: function(e) {
										var t = e.smart_count;
										return (0, i._)(t, "".concat(t, " unique flashcard viewed"), "".concat(t, " unique flashcards viewed"))
									}
								},
								details: {
									title: "Flashcard Review"
								},
								noProgress: {
									label: "Get started on flashcards to see your progress here.",
									startButton: {
										label: "Get started on flashcards"
									},
									tutorial: {
										title: "About Flashcards",
										subtitle: "Our flashcards use an adaptive learning method. Here's how it works:",
										answering: {
											label: 'Upon clicking the "Reveal answer" link, the question and answer are shown along with three button options. Choose the most appropriate response for how well you feel you know the answer.'
										},
										answerOptions: {
											incorrect: "I don't know the answer",
											unsure: "I partially or nearly know the answer",
											correct: "I know the answer"
										},
										checkIn: {
											label: "Continue through 15 flashcards until you’ve reached your periodic check-in to evaluate your progress. Behind the scenes, the flashcard algorithm will shuffle and reorganize cards according to your responses. You’ll see cards that need more review more often and those that you’ve marked as known less frequently."
										},
										progress: {
											label: "Keep going until you feel you have reached a good break point. Return later, and you can track your cumulative progress over time. Your overall progress report will show your most recent self-reported responses and links to related MKSAP content for additional study."
										}
									}
								},
								well: {
									studyButton: {
										label: "Resume Flashcards"
									},
									startButton: {
										label: "Start Flashcards"
									}
								},
								productLinks: {
									title: function(e) {
										var t = e.subspecialty;
										return "More ".concat(t)
									},
									text: "Text",
									questions: "Questions",
									vdx: "Virtual Dx"
								}
							},
							clearDeck: {
								menuItem: {
									label: "Reset Deck Progress"
								},
								dialog: {
									title: "Reset Deck Progress?",
									body: function(e) {
										var t = e.deckName;
										return "Are you sure you would like to clear all your Flashcard progress in ".concat(t, "? This cannot be undone.")
									},
									confirmButton: {
										label: "Reset Responses"
									}
								}
							},
							studyDeck: {
								pageTitle: function(e) {
									var t = e.deckName;
									return "".concat(t, " Flashcards")
								},
								toolbar: {
									title: function(e) {
										var t = e.deckName;
										return "Flashcards: ".concat(t)
									}
								},
								checkIn: {
									title: function(e) {
										var t = e.deckName;
										return "".concat(t, " Check-in")
									},
									details: {
										title: "Check-in Details"
									},
									stats: {
										title: function(e) {
											var t = e.smart_count;
											return "In the past ".concat(t, " cards, you had:")
										},
										correct: function(e) {
											var t = e.smart_count;
											return "".concat(t, " Correct")
										},
										unsure: function(e) {
											var t = e.smart_count;
											return "".concat(t, " Unsure")
										},
										incorrect: function(e) {
											var t = e.smart_count;
											return "".concat(t, " Incorrect")
										}
									},
									keepStudyingButton: {
										label: function(e) {
											var t = e.smart_count;
											return "Next ".concat(t, " Flashcards")
										}
									},
									progressBar: {
										label: function(e) {
											var t = e.percentage,
												n = e.count;
											return "".concat(t, "% completed of ").concat(n, " flashcards")
										}
									}
								},
								flashcard: {
									contextMenu: {
										relatedTopic: {
											label: "Related Text"
										},
										relatedQuestion: {
											label: "Related Question"
										},
										displaySettings: {
											label: "Display Settings"
										}
									}
								}
							},
							progress: {
								flashcardCount: {
									label: function(e) {
										var t = e.smart_count;
										return "".concat(t, " total flashcards")
									}
								},
								percentComplete: {
									simple: function(e) {
										var t = e.percent;
										return "<span>".concat(t, "%</span><span>Complete</span>")
									},
									label: function(e) {
										var t = e.percentageAnswered,
											n = e.totalFlashcards;
										return "".concat(t, "% completed of ").concat(n, " flashcards")
									}
								},
								notStarted: {
									label: function(e) {
										var t = e.smart_count;
										return "".concat(t, " flashcards")
									}
								},
								numCorrect: {
									label: function(e) {
										var t = e.smart_count;
										return "".concat(t, " Correct")
									}
								},
								numUnsure: {
									label: function(e) {
										var t = e.smart_count;
										return "".concat(t, " Unsure")
									}
								},
								numIncorrect: {
									label: function(e) {
										var t = e.smart_count;
										return "".concat(t, " Incorrect")
									}
								}
							},
							progressTowardCheckIn: {
								completedGoal: {
									label: function(e) {
										var t = e.smart_count;
										return "".concat(t, " until next check-in")
									}
								}
							},
							detailsList: {
								filter: {
									answered: "Show All Answered Flashcards",
									correct: "Show All Correct Flashcards",
									incorrect: "Show All Incorrect Flashcards",
									unsure: "Show All Unsure Flashcards"
								},
								relatedQuestion: {
									title: "Related Question"
								}
							},
							notAuthorized: {
								pageTitle: "Flashcards",
								toolbar: {
									title: "Flashcards"
								},
								title: "You don't have access to Flashcards",
								instructions: "To unlock this feature, upgrade to MKSAP 19 Complete.<br/>Contact Member and Product Support: 800-227-1915 (Monday-Friday 9am-5pm EST)",
								about: {
									title: "Digital Flashcards",
									p1: "A quick and easy way to reinforce learning of MKSAP 19 concepts. Designed with adaptive learning technology to enhance active recall, exposure to the flashcards is customized based on your confidence level.",
									p2: "Your progress report will show your most recent self-reported responses and provide links to related MKSAP content for additional study. Flashcards work in a continuous study algorithm, personalizing your study materials.",
									p2Link: "Watch video to learn more."
								},
								promo: {
									title: "When you unlock Flashcards, you also receive Board Basics, Virtual Dx, and all 11 full-color MKSAP 19 books!"
								},
								contactInfo: {
									productName: "Flashcards"
								}
							}
						},
						errors: {
							dialogError: {
								title: "Error"
							},
							notFound: {
								caption: "Well ma'am, there doesn't appear to be anything grossly wrong with you, but if you like we can do some digging.",
								title: "Oops, we can't find the page you requested.",
								credit: "ACP Internist Weekly",
								content: "We'll keep digging.",
								link: "Return to MKSAP 19 Dashboard"
							},
							defaultError: {
								message: "We're sorry, but something went wrong. We've logged the issue and our\n\t\t\ttechnical team will take a look. In the meantime, you may be able to\n\t\t\tresolve some issues by refreshing the page."
							}
						},
						notAuthorizedDialog: {
							title: "Not Authorized",
							body: "Your session has expired.",
							loginButton: {
								label: "Return to Login Form"
							}
						},
						forceUpdateDialog: {
							defaultTitle: "Update Required",
							defaultMessage: "This version of the MKSAP 19 app is no longer supported. Please update to the latest version to continue using the app.",
							defaultButtonLabel: "Update Now"
						},
						nativeAppLogin: {
							instructions: "Log in below with your ACP Online username and password.",
							username: {
								label: "Username"
							},
							password: {
								label: "Password"
							}
						},
						rating: {
							prompt: {
								question: "Do you have time to rate your experience with MKSAP?",
								dismiss: function(e) {
									var t = e.link;
									return r.createElement(r.Fragment, null, "Ok, we'll ask another time. Meanwhile, you can visit the ", t, " to provide your rating.")
								},
								dismissLink: "Settings page"
							},
							form: {
								scoreHelp: {
									label: "Please select a star rating 1 (poor) - 5 (great)"
								},
								score: {
									label: function(e) {
										var t = e.score;
										return "Selected: ".concat(t, " out of 5 stars")
									}
								},
								comments: {
									label: "Type your review here (optional)"
								},
								submissionError: {
									label: "Uh oh, something went wrong! Please try to submit your rating and review again."
								},
								submitButton: {
									label: "Submit"
								}
							},
							complete: {
								successMsg: "Thanks for taking the time to review! Your feedback is greatly appreciated. Your response is saved and can be viewed in Settings."
							}
						},
						completeUpgrade: {
							cards: {
								boardBasics: {
									title: "Board Basics Print and E-book",
									desc: "An intensive ABIM Board review derived from MKSAP 19 content, but presented in a succinct, digest-style with key facts, tables, and test-taking tips to help you pass your Boards."
								},
								vdx: {
									title: "Virtual Dx Image-Based Questions",
									desc: "Over 400 images and videos for Board prep or to gauge the strength of your visual diagnostic skills. Earn up to 10 PRA Category 1 CME credits and MOC points."
								},
								printBooks: {
									title: "MKSAP 19 Print Books",
									desc: "Eleven comprehensive text sections, including High Value Care recommendations, Hospitalist-focused content, tables, full-color images, and index"
								},
								flashcards: {
									title: "Digital Flashcards",
									desc: "Designed with adaptive learning technology to enhance active recall, exposure to the flashcards is customized based on your confidence level."
								}
							},
							contactInfo: {
								desc: function(e) {
									var t = e.productName;
									return "Contact Member and Product Support today to add ".concat(t, " and get the best package value!")
								},
								info: "800-227-1915 (Monday-Friday 9am-5pm EST)"
							}
						},
						niu: {
							loading: "Loading new information updates",
							index: {
								title: "New Information Updates",
								desc: "Targeted revisions to the text to reflect important practice-changing information, guidelines, and expert recommendations."
							},
							bookIndex: {
								title: function() {
									return "New Information Updates"
								},
								desc: "Targeted revisions to the text to reflect important practice-changing information, guidelines, and expert recommendations.",
								indexButton: {
									label: "View All New Info Updates"
								}
							},
							modal: {
								title: function(e) {
									var t = e.smart_count;
									return (0, i._)(t, "".concat(t, " New Info Update"), "".concat(t, " New Info Updates"))
								},
								titleWithPageTitle: function(e) {
									var t = e.smart_count,
										n = e.pageTitle;
									return r.createElement(r.Fragment, null, (0, i._)(t, "".concat(t, " New Info Update:"), "".concat(t, " New Info Updates:")), " ", r.createElement("span", {
										dangerouslySetInnerHTML: n
									}))
								},
								jumpToNiuIndex: "View the full New Info Update index"
							},
							contextMenuLabel: "New Info Updates",
							show: {
								affectedContent: {
									title: function(e) {
										var t = e.bookName;
										return "Changes the following ".concat(t, " content:")
									},
									links: {
										table: {
											label: function(e) {
												var t = e.num;
												return r.createElement(r.Fragment, null, "Table ", t)
											}
										},
										figure: {
											label: function(e) {
												var t = e.num;
												return r.createElement(r.Fragment, null, "Figure ", t)
											}
										}
									}
								}
							}
						},
						highlighting: {
							addHighlight: {
								errorSnackbar: {
									message: "Error saving highlight",
									actionText: "Close"
								}
							},
							moreHighlights: {
								title: function(e) {
									var t = e.bookName;
									return t ? "More ".concat(t, " Highlights") : "More Highlights"
								},
								text: {
									label: function() {
										return "Text Highlights"
									}
								},
								boardBasics: {
									label: function() {
										return "Board Basics Highlights"
									}
								},
								extensionQuestionHeading: "Extension Question Highlights:",
								questions: {
									mksap19: {
										label: function() {
											return "Question Highlights"
										}
									},
									vdx: {
										label: function() {
											return "Virtual Dx Highlights"
										}
									},
									x1: {
										label: function() {
											return "Set 1"
										}
									},
									x2: {
										label: function() {
											return "Set 2"
										}
									},
									x3: {
										label: function() {
											return "Set 3"
										}
									},
									x4: {
										label: function() {
											return "Set 4"
										}
									},
									qq: {
										label: function() {
											return "Quick Qs Highlights"
										}
									}
								}
							},
							textIndex: {
								toolbar: {
									title: "Text Highlights"
								},
								pageTitle: "Text Highlights",
								title: "Text Highlight Index",
								listItem: {
									label: function(e) {
										var t = e.count;
										return (0, i._)(t, "Highlight", "Highlights")
									}
								},
								about: {
									title: "About Highlighting",
									body: function() {
										return r.createElement(r.Fragment, null, "Content that you highlight within the text sections of MKSAP will be collected here, organized by subspecialty and chapter. Keep in mind that unlike a traditional text-book, MKSAP 19 Digital content is updated over time. In the event that content you have highlighted changes, those highlights may become unavailable. The Notes feature is not affected by changes to the underlying content and may be a better option for some learners.")
									}
								}
							},
							textBookIndex: {
								toolbar: {
									title: function(e) {
										var t = e.bookName;
										return "".concat(t, " Highlights")
									}
								},
								pageTitle: function(e) {
									var t = e.bookName;
									return "".concat(t, " Highlights")
								},
								title: function(e) {
									var t = e.bookName;
									return "".concat(t, " Highlights")
								},
								listItem: {
									highlightCountLabel: function(e) {
										var t = e.count;
										return (0, i._)(t, "Highlight", "Highlights")
									}
								},
								empty: {
									title: "Create text highlights to see them listed here.",
									tutorial: {
										title: function() {
											return r.createElement(r.Fragment, null, "The Highlighting feature is a convenient tool to draw attention to important information. Here’s how it works:")
										},
										selecting: function() {
											return r.createElement(r.Fragment, null, "Selecting text within the text and questions sections will display a highlighting button at the bottom right of your screen. Clicking on the button will highlight your selection.")
										},
										editing: function() {
											return r.createElement(r.Fragment, null, "You can delete or change the color of existing highlights by clicking on a highlighted section.")
										},
										reviewing: function() {
											return r.createElement(r.Fragment, null, "Review all of your highlights by visiting the text highlight index.")
										},
										video: function(e) {
											var t = e.link;
											return r.createElement(r.Fragment, null, "To learn more about highlighting, watch this ", t, ".")
										},
										videoLink: "how-to-video"
									}
								}
							},
							textChapterIndex: {
								toolbar: {
									title: function(e) {
										var t = e.bookName;
										return "".concat(t, " Highlights")
									}
								},
								pageTitle: function(e) {
									var t = e.bookName;
									return "".concat(t, " Highlights")
								},
								title: function(e) {
									var t = e.bookName;
									return "".concat(t, " Highlights")
								},
								empty: {
									title: "Create chapter text highlights to see them listed here."
								},
								missingHighlightsNotice: {
									title: "Due to a content update, some highlights in this chapter have been cleared.",
									message: function() {
										return r.createElement(r.Fragment, null, "Unlike a traditional text-book, MKSAP 19 Digital content is updated over time to reflect important practice-changing information. In some cases, this results in the need to invalidate old highlights whose content is no longer present.")
									},
									action: {
										label: "Review chapter"
									}
								}
							},
							questionIndex: {
								toolbar: {
									title: function(e) {
										return {
											mksap19: "Question Bank: MKSAP Question Highlights",
											vdx: "Question Bank: Virtual Dx Highlights",
											x1: "Question Bank: Extension Questions Set 1 Highlights",
											x2: "Question Bank: Extension Questions Set 2 Highlights",
											x3: "Question Bank: Extension Questions Set 3 Highlights",
											x4: "Question Bank: Extension Questions Set 4 Highlights"
										} [e.productId]
									}
								},
								pageTitle: function(e) {
									return {
										mksap19: "Question Bank: MKSAP Question Highlights",
										vdx: "Question Bank: Virtual Dx Highlights",
										x1: "Question Bank: Extension Questions Set 1 Highlights",
										x2: "Question Bank: Extension Questions Set 2 Highlights",
										x3: "Question Bank: Extension Questions Set 3 Highlights",
										x4: "Question Bank: Extension Questions Set 4 Highlights"
									} [e.productId]
								},
								title: function(e) {
									return {
										mksap19: "MKSAP Question Highlight Index",
										vdx: "Question Bank: Virtual Dx Highlight Index",
										x1: "Extension Questions Set 1 Highlight Index",
										x2: "Extension Questions Set 2 Highlight Index",
										x3: "Extension Questions Set 3 Highlight Index",
										x4: "Extension Questions Set 4 Highlight Index"
									} [e.productId]
								},
								listItem: {
									label: function(e) {
										var t = e.count;
										return (0, i._)(t, "Highlight", "Highlights")
									}
								},
								about: {
									title: "About Highlighting",
									body: function() {
										return r.createElement(r.Fragment, null, "Content that you highlight within the critique section of questions will be collected here, organized by subspecialty. Keep in mind that unlike a traditional text-book, MKSAP 19 Digital content is updated over time. In the event that content you have highlighted changes, those highlights may become unavailable. The Notes feature is not affected by changes to the underlying content and may be a better option for some learners.")
									}
								}
							},
							questionBookIndex: {
								toolbar: {
									title: function(e) {
										return {
											mksap19: "Question Bank: MKSAP Question Highlights",
											vdx: "Question Bank: Virtual Dx Highlights",
											x1: "Question Bank: Extension Questions Set 1 Highlights",
											x2: "Question Bank: Extension Questions Set 2 Highlights",
											x3: "Question Bank: Extension Questions Set 3 Highlights",
											x4: "Question Bank: Extension Questions Set 4 Highlights"
										} [e.productId]
									}
								},
								pageTitle: function(e) {
									return {
										mksap19: "Question Bank: MKSAP Question Highlights",
										vdx: "Question Bank: Virtual Dx Highlights",
										x1: "Question Bank: Extension Questions Set 1 Highlights",
										x2: "Question Bank: Extension Questions Set 2 Highlights",
										x3: "Question Bank: Extension Questions Set 3 Highlights",
										x4: "Question Bank: Extension Questions Set 4 Highlights"
									} [e.productId]
								},
								title: function(e) {
									var t = e.bookName;
									return "".concat(t, " Highlights")
								},
								listGroup: {
									question: {
										label: function(e) {
											var t = e.num;
											return "Question ".concat(t, ":")
										}
									}
								},
								empty: {
									title: "Create question highlights to see them listed here.",
									tutorial: {
										title: function() {
											return r.createElement(r.Fragment, null, "The Highlighting feature is a convenient tool to draw attention to important information. Here’s how it works:")
										},
										selecting: function() {
											return r.createElement(r.Fragment, null, "Selecting text within the text and questions sections will display a highlighting button at the bottom right of your screen. Clicking on the button will highlight your selection.")
										},
										editing: function() {
											return r.createElement(r.Fragment, null, "As you work through a question, content in the clinical scenario can be highlighted using the distinct purple highlighter. If you clear your answers, these highlights will not be shown. In critiques, you can delete or change the color of existing highlights by clicking on a highlighted section.")
										},
										reviewing: function() {
											return r.createElement(r.Fragment, null, "Review all of your highlights by visiting the question highlight index.")
										}
									}
								},
								missingQuestionHighlightNotice: {
									message: "Due to a content update, some highlights in this question have been cleared.",
									moreMenu: {
										showQuestion: "Show Question",
										dismiss: "Clear Notification"
									}
								}
							},
							missingHighlightsDialog: {
								title: "Cleared highlights?",
								body: "Unlike a traditional text-book, MKSAP 19 Digital content is updated over time to reflect important practice-changing information. In some cases, this results in the need to invalidate old highlights whose content is no longer present.",
								actions: {
									confirm: {
										label: "Close and Hide Notification"
									},
									close: {
										label: "Close"
									}
								}
							},
							questionStemHighlightModal: {
								title: "What is this?",
								body: function() {
									return r.createElement(r.Fragment, null, "Content visible before you answer a question can be highlighted, but these highlights will not be shown to you again if you clear your answer and try again. These highlights are shown in a distinct color (purple) to distinguish them from highlights in question critiques and in the text.", r.createElement("br", null), r.createElement("br", null))
								}
							},
							emptyBookHighlightsCard: {
								title: "Create question highlights to see them listed here.",
								tutorial: {
									title: function() {
										return r.createElement(r.Fragment, null, "The Highlighting feature is a convenient tool to draw attention to important information. Here’s how it works:")
									},
									selecting: function() {
										return r.createElement(r.Fragment, null, "Selecting text within the text and questions sections will display a highlighting button at the bottom right of your screen. Clicking on the button will highlight your selection.")
									},
									editing: function() {
										return r.createElement(r.Fragment, null, "As you work through a question, content in the clinical scenario can be highlighted using the distinct purple highlighter. If you clear your answers, these highlights will not be shown. In critiques, you can delete or change the color of existing highlights by clicking on a highlighted section.")
									},
									reviewing: function() {
										return r.createElement(r.Fragment, null, "Review all of your highlights by visiting the question highlight index.")
									}
								}
							},
							highlight: {
								source: {
									label: "Highlight Source"
								},
								menu: {
									source: "Show Highlight Source",
									delete: "Delete Highlight"
								}
							},
							invalidHighlightModal: {
								title: "Invalid highlight selection",
								body: function() {
									return r.createElement(r.Fragment, null, r.createElement("p", null, "Limit your selection to content within a paragraph or try a different selection. Some content, including certain labels, tables, and figures, cannot be highlighted."))
								}
							},
							confirmDeleteModal: {
								title: "Delete Highlight?",
								body: function() {
									return r.createElement(r.Fragment, null, "Are you sure you want to delete this highlight? This action cannot be undone.")
								}
							}
						},
						help: {
							index: {
								pageTitle: "Help",
								toolbar: {
									title: "Help"
								},
								title: "MKSAP 19 Help",
								desc: "Use these quick links to find answers to questions, view tutorials, and more on the MKSAP Resource site.",
								updateCard: {
									title: "New Update",
									heroImg: {
										alt: "How to highlight"
									},
									text: {
										title: "Highlighting Beta is here!",
										instructions: {
											one: "Open a text or question page in MKSAP 19 Digital",
											two: "Select the content you wish to highlight",
											three: "Click the highlighter icon at the bottom of the screen",
											four: "To remove a highlight or change its color, click or tap on your highlighted text. The highlight menu will appear on the lower center of your screen."
										},
										button: {
											label: "Watch the Video"
										}
									}
								},
								cards: {
									gettingStarted: {
										title: "Getting Started",
										links: {
											account: "Account and Settings",
											navigate: "How to Navigate",
											taxonomy: "Taxonomy"
										}
									},
									features: {
										title: "Features",
										links: {
											answering: "Answering Questions",
											reading: "Reading the Text",
											adaptive: "Adaptive Learning Flashcards",
											quizzes: "Custom Quiz and Practice Exam",
											nius: "New Information Updates"
										}
									},
									tools: {
										title: "Tools",
										links: {
											searching: "Searching MKSAP",
											nlv: "Normal Lab Values or Reference Ranges",
											notes: "Notes",
											highlights: "Highlights",
											dyl: "Document Your Learning"
										}
									},
									submissions: {
										title: "CME/MOC/CPD",
										links: {
											submit: "Submit for credit/points",
											history: "Submission history"
										}
									},
									other: {
										title: "Everything Else",
										links: {
											errata: "Errata and Revisions",
											app: "Download the App",
											forums: "MKSAP Member Discussion Forums",
											contact: "Contact Member and Product Support"
										}
									}
								},
								items: {
									getStarted: "Getting Started",
									answeringQuestions: "Answering Questions",
									cmeMocCpd: "Submitting for CME/MOC/CPD",
									errata: "Errata and Revisions",
									everythingElse: "Everything Else",
									app: "Download the App"
								}
							}
						}
					};
				(0, o.Z)(a), t.Z = a
			},
			8784: function(e, t, n) {
				"use strict";
				n.d(t, {
					C: function() {
						return r
					}
				});
				var r = n(3268).Z;
				t.Z = r
			},
			140: function(e, t, n) {
				"use strict";

				function r(e, t, n) {
					var r = 1 === e ? t : n;
					return "string" == typeof r ? r.replace("{}", String(e)) : r
				}
				n.d(t, {
					_: function() {
						return r
					}
				})
			},
			9266: function(e, t, n) {
				"use strict";
				n.d(t, {
					cv: function() {
						return i
					},
					oq: function() {
						return a
					},
					bf: function() {
						return l
					},
					iv: function() {
						return s
					},
					pv: function() {
						return c
					},
					cn: function() {
						return u
					},
					IV: function() {
						return f
					},
					on: function() {
						return d
					},
					S1: function() {
						return h
					},
					pn: function() {
						return p
					},
					Pb: function() {
						return v
					},
					E0: function() {
						return m
					}
				});
				var r = n(9755),
					o = n.n(r),
					i = function(e) {
						return o()(e).offset()
					},
					a = function(e, t) {
						return o()(e).closest(t)[0]
					},
					l = function(e) {
						return o()(e).width()
					},
					s = function(e, t) {
						var n = o()(e).css(t);
						if ("string" == typeof t) return n
					},
					c = function(e, t) {
						return e.classList ? e.classList.contains(t) : new RegExp("(^| )" + t + "( |$)", "gi").test(e.className)
					},
					u = function(e, t) {
						o()(e).addClass(t)
					},
					f = function(e, t) {
						o()(e).removeClass(t)
					},
					d = function(e, t, n) {
						o()(e).on(t, n)
					},
					h = function(e, t, n) {
						o()(e).off(t, null, n)
					},
					p = function(e) {
						return o()(e).is(":visible")
					},
					v = function(e) {
						return o()(e).outerHeight()
					},
					m = function(e) {
						o()(e)
					}
			},
			1150: function(e, t, n) {
				"use strict";
				n.d(t, {
					qP: function() {
						return s
					},
					ZP: function() {
						return u
					},
					jF: function() {
						return c
					}
				});
				var r, o = n(4391),
					i = n(211),
					a = (r = function(e, t) {
						return r = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function(e, t) {
							e.__proto__ = t
						} || function(e, t) {
							for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
						}, r(e, t)
					}, function(e, t) {
						if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

						function n() {
							this.constructor = e
						}
						r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
					}),
					l = function(e) {
						function t(t, n) {
							var r = e.call(this, "HTTP Error ".concat(t.status, ": ").concat(n || t.statusText)) || this;
							return r.response = t, r.friendlyErrorMessage = n, r
						}
						return a(t, e), t
					}(Error),
					s = new i.xQ,
					c = function(e) {
						var t = e.url,
							n = function(e) {
								var t = {
									credentials: "same-origin",
									headers: {
										"Content-Type": e.contentType || "application/json"
									}
								};
								if (o.U.native) 0 === e.url.indexOf(o.U.ajaxPrefix) && (window.authToken && (t.headers["X-Auth-Token"] = window.authToken), o.U.inCordova ? t.headers["X-App-Platform"] = "cordova" : o.U.inElectron && (t.headers["X-App-Platform"] = "electron"), t.headers["X-App-Version"] = o.U.appVersion);
								else {
									var n = document.querySelector('meta[name="csrf-token"]');
									if (n) {
										var r = n.getAttribute("content");
										t.headers["X-CSRF-Token"] = r
									}
								}
								return e.type && (t.method = e.type), e.data && (t.body = e.data), t
							}(e),
							r = e.dataType || "application/json";
						return fetch(t, n).then((function(e) {
							if (s.next({
									type: "SERVER_RESPONSE",
									response: e
								}), e.ok) {
								var t = e.headers.get("content-type");
								return /^application\/json;?/.exec(t) || "application/json" === r || "text/json" === r ? e.json() : e.text()
							}
							return e.clone().json().then((function(t) {
								var n = t.errorMessage || t.error;
								throw new l(e, n)
							})).catch((function(t) {
								throw new l(e, t.friendlyErrorMessage)
							}))
						}), (function(e) {
							throw s.next({
								type: "NETWORK_ERROR"
							}), e
						}))
					},
					u = c
			},
			7510: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return o
					}
				});
				var r = n(6378);

				function o(e) {
					(0, r.Z)(e) && (e = new Error(e)), console.error(e), "undefined" != typeof NREUM && NREUM.noticeError(e)
				}
			},
			6704: function(e, t, n) {
				"use strict";

				function r(e) {
					return "#svg-".concat(e)
				}
				n.d(t, {
					b: function() {
						return r
					},
					V: function() {
						return i
					}
				});
				var o = "svg-icon-definitions";

				function i() {
					if (!document.getElementById(o)) {
						var e = n(2330).Z,
							t = document.createElement("div");
						t.innerHTML = e;
						var r = t.firstElementChild;
						r.id = o, document.body.insertBefore(r, document.body.firstChild)
					}
				}
			},
			4289: function(e, t, n) {
				"use strict";
				n.d(t, {
					Ch: function() {
						return c
					},
					$c: function() {
						return s
					}
				});
				var r = n(7462),
					o = n(3366),
					i = n(7294);

				function a(e) {
					return "default" + e.charAt(0).toUpperCase() + e.substr(1)
				}

				function l(e) {
					var t = function(e, t) {
						if ("object" != typeof e || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var r = n.call(e, t);
							if ("object" != typeof r) return r;
							throw new TypeError("@@toPrimitive must return a primitive value.")
						}
						return String(e)
					}(e, "string");
					return "symbol" == typeof t ? t : String(t)
				}

				function s(e, t, n) {
					var r = (0, i.useRef)(void 0 !== e),
						o = (0, i.useState)(t),
						a = o[0],
						l = o[1],
						s = void 0 !== e,
						c = r.current;
					return r.current = s, !s && c && a !== t && l(t), [s ? e : a, (0, i.useCallback)((function(e) {
						for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) r[o - 1] = arguments[o];
						n && n.apply(void 0, [e].concat(r)), l(e)
					}), [n])]
				}

				function c(e, t) {
					return Object.keys(t).reduce((function(n, i) {
						var c, u = n,
							f = u[a(i)],
							d = u[i],
							h = (0, o.Z)(u, [a(i), i].map(l)),
							p = t[i],
							v = s(d, f, e[p]),
							m = v[0],
							g = v[1];
						return (0, r.Z)({}, h, ((c = {})[i] = m, c[p] = g, c))
					}), e)
				}
				n(1143)
			},
			2473: function(e) {
				"use strict";
				e.exports = function() {}
			},
			7462: function(e, t, n) {
				"use strict";

				function r() {
					return r = Object.assign || function(e) {
						for (var t = 1; t < arguments.length; t++) {
							var n = arguments[t];
							for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
						}
						return e
					}, r.apply(this, arguments)
				}
				n.d(t, {
					Z: function() {
						return r
					}
				})
			},
			1721: function(e, t, n) {
				"use strict";

				function r(e, t) {
					return r = Object.setPrototypeOf || function(e, t) {
						return e.__proto__ = t, e
					}, r(e, t)
				}

				function o(e, t) {
					e.prototype = Object.create(t.prototype), e.prototype.constructor = e, r(e, t)
				}
				n.d(t, {
					Z: function() {
						return o
					}
				})
			},
			3366: function(e, t, n) {
				"use strict";

				function r(e, t) {
					if (null == e) return {};
					var n, r, o = {},
						i = Object.keys(e);
					for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
					return o
				}
				n.d(t, {
					Z: function() {
						return r
					}
				})
			},
			7685: function(e, t, n) {
				"use strict";
				var r = n(6092).Z.Symbol;
				t.Z = r
			},
			4073: function(e, t) {
				"use strict";
				t.Z = function(e, t) {
					for (var n = -1, r = null == e ? 0 : e.length, o = Array(r); ++n < r;) o[n] = t(e[n], n, e);
					return o
				}
			},
			3243: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return u
					}
				});
				var r = n(7685),
					o = Object.prototype,
					i = o.hasOwnProperty,
					a = o.toString,
					l = r.Z ? r.Z.toStringTag : void 0,
					s = Object.prototype.toString,
					c = r.Z ? r.Z.toStringTag : void 0,
					u = function(e) {
						return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : c && c in Object(e) ? function(e) {
							var t = i.call(e, l),
								n = e[l];
							try {
								e[l] = void 0;
								var r = !0
							} catch (e) {}
							var o = a.call(e);
							return r && (t ? e[l] = n : delete e[l]), o
						}(e) : function(e) {
							return s.call(e)
						}(e)
					}
			},
			3413: function(e, t) {
				"use strict";
				var n = "object" == typeof global && global && global.Object === Object && global;
				t.Z = n
			},
			6092: function(e, t, n) {
				"use strict";
				var r = n(3413),
					o = "object" == typeof self && self && self.Object === Object && self,
					i = r.Z || o || Function("return this")();
				t.Z = i
			},
			9203: function(e, t) {
				"use strict";
				t.Z = function(e) {
					return e
				}
			},
			7771: function(e, t) {
				"use strict";
				var n = Array.isArray;
				t.Z = n
			},
			8533: function(e, t) {
				"use strict";
				t.Z = function(e) {
					return null != e && "object" == typeof e
				}
			},
			6378: function(e, t, n) {
				"use strict";
				var r = n(3243),
					o = n(7771),
					i = n(8533);
				t.Z = function(e) {
					return "string" == typeof e || !(0, o.Z)(e) && (0, i.Z)(e) && "[object String]" == (0, r.Z)(e)
				}
			},
			2714: function(e, t, n) {
				"use strict";
				var r = n(3243),
					o = n(8533);
				t.Z = function(e) {
					return "symbol" == typeof e || (0, o.Z)(e) && "[object Symbol]" == (0, r.Z)(e)
				}
			},
			2054: function(e, t) {
				"use strict";
				t.Z = function() {}
			},
			2402: function(e, t, n) {
				"use strict";
				n.d(t, {
					Z: function() {
						return u
					}
				});
				var r = n(7685),
					o = n(4073),
					i = n(7771),
					a = n(2714),
					l = r.Z ? r.Z.prototype : void 0,
					s = l ? l.toString : void 0,
					c = function e(t) {
						if ("string" == typeof t) return t;
						if ((0, i.Z)(t)) return (0, o.Z)(t, e) + "";
						if ((0, a.Z)(t)) return s ? s.call(t) : "";
						var n = t + "";
						return "0" == n && 1 / t == -1 / 0 ? "-0" : n
					},
					u = function(e) {
						return null == e ? "" : c(e)
					}
			},
			6749: function(e, t, n) {
				"use strict";
				var r = n(2402),
					o = 0;
				t.Z = function(e) {
					var t = ++o;
					return (0, r.Z)(e) + t
				}
			}
		},
		r = {};

	function o(e) {
		var t = r[e];
		if (void 0 !== t) return t.exports;
		var i = r[e] = {
			id: e,
			loaded: !1,
			exports: {}
		};
		return n[e].call(i.exports, i, i.exports, o), i.loaded = !0, i.exports
	}
	o.m = n, o.n = function(e) {
			var t = e && e.__esModule ? function() {
				return e.default
			} : function() {
				return e
			};
			return o.d(t, {
				a: t
			}), t
		}, o.d = function(e, t) {
			for (var n in t) o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, {
				enumerable: !0,
				get: t[n]
			})
		}, o.f = {}, o.e = function(e) {
			return Promise.all(Object.keys(o.f).reduce((function(t, n) {
				return o.f[n](e, t), t
			}), []))
		}, o.u = function(e) {
			return ({
				359: "PrintAnswerSheetsApp",
				460: "MksapApplication"
			} [e] || e) + ".js"
		}, o.miniCssF = function(e) {
			return "app.css"
		}, o.g = function() {
			if ("object" == typeof globalThis) return globalThis;
			try {
				return this || new Function("return this")()
			} catch (e) {
				if ("object" == typeof window) return window
			}
		}(), o.hmd = function(e) {
			return (e = Object.create(e)).children || (e.children = []), Object.defineProperty(e, "exports", {
				enumerable: !0,
				set: function() {
					throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " + e.id)
				}
			}), e
		}, o.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}, e = {}, t = "mksap17:", o.l = function(n, r, i, a) {
			if (e[n]) e[n].push(r);
			else {
				var l, s;
				if (void 0 !== i)
					for (var c = document.getElementsByTagName("script"), u = 0; u < c.length; u++) {
						var f = c[u];
						if (f.getAttribute("src") == n || f.getAttribute("data-webpack") == t + i) {
							l = f;
							break
						}
					}
				l || (s = !0, (l = document.createElement("script")).charset = "utf-8", l.timeout = 120, o.nc && l.setAttribute("nonce", o.nc), l.setAttribute("data-webpack", t + i), l.src = n), e[n] = [r];
				var d = function(t, r) {
						l.onerror = l.onload = null, clearTimeout(h);
						var o = e[n];
						if (delete e[n], l.parentNode && l.parentNode.removeChild(l), o && o.forEach((function(e) {
								return e(r)
							})), t) return t(r)
					},
					h = setTimeout(d.bind(null, void 0, {
						type: "timeout",
						target: l
					}), 12e4);
				l.onerror = d.bind(null, l.onerror), l.onload = d.bind(null, l.onload), s && document.head.appendChild(l)
			}
		}, o.r = function(e) {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
				value: "Module"
			}), Object.defineProperty(e, "__esModule", {
				value: !0
			})
		}, o.nmd = function(e) {
			return e.paths = [], e.children || (e.children = []), e
		}, o.p = "assets/",
		function() {
			var e = {
				143: 0
			};
			o.f.j = function(t, n) {
				var r = o.o(e, t) ? e[t] : void 0;
				if (0 !== r)
					if (r) n.push(r[2]);
					else {
						var i = new Promise((function(n, o) {
							r = e[t] = [n, o]
						}));
						n.push(r[2] = i);
						var a = o.p + o.u(t),
							l = new Error;
						o.l(a, (function(n) {
							if (o.o(e, t) && (0 !== (r = e[t]) && (e[t] = void 0), r)) {
								var i = n && ("load" === n.type ? "missing" : n.type),
									a = n && n.target && n.target.src;
								l.message = "Loading chunk " + t + " failed.\n(" + i + ": " + a + ")", l.name = "ChunkLoadError", l.type = i, l.request = a, r[1](l)
							}
						}), "chunk-" + t, t)
					}
			};
			var t = function(t, n) {
					var r, i, a = n[0],
						l = n[1],
						s = n[2],
						c = 0;
					if (a.some((function(t) {
							return 0 !== e[t]
						}))) {
						for (r in l) o.o(l, r) && (o.m[r] = l[r]);
						s && s(o)
					}
					for (t && t(n); c < a.length; c++) i = a[c], o.o(e, i) && e[i] && e[i][0](), e[i] = 0
				},
				n = self.webpackChunkmksap17 = self.webpackChunkmksap17 || [];
			n.forEach(t.bind(null, 0)), n.push = t.bind(null, n.push.bind(n))
		}(),
		function() {
			"use strict";
			var e = o(2054);
			void 0 !== window.console && void 0 !== window.console.log || (window.console = {
				log: e.Z,
				warn: e.Z,
				error: e.Z
			}), o(5243), o(3332), window.performance || (window.performance = {
				mark: function(e) {},
				measure: function(e) {}
			});
			var t = o(2585),
				n = o(9266);
			n.E0((function() {
				var e = document.querySelector("body"),
					t = null;

				function r() {
					n.cn(e, "app-allow-hover")
				}
				r(), n.on(e, "touchstart", (function() {
					t && window.clearTimeout(t), n.S1(e, "mousemove", r), n.IV(e, "app-allow-hover")
				})), n.on(e, "touchend", (function() {
					t = window.setTimeout((function() {
						n.on(e, "mousemove", r)
					}), 100)
				}))
			}));
			var r = o(7510),
				i = o(9755),
				a = o.n(i),
				l = o(6704);

			function s(e, t) {
				! function() {
					if (!window.CSS || !CSS.supports("color", "var(--primary)")) throw a()((function() {
						a()(document.body).html('\n\t\t\t<div style="margin:auto;padding:30px;text-align:center;width:700px;">\n<p><strong>Please upgrade your browser to use MKSAP 19</strong></p>\n<p>We built MKSAP 19 using the latest techniques and technologies. This makes MKSAP 19 faster and easier to use. Unfortunately, your browser doesn\'t support those technologies.</p>\n<p>Visit <a href="https://browsehappy.com/">https://browsehappy.com/</a>  to download or upgrade to the latest browsers.</p>\n</div>\n')
					})), new Error("browser isn't supported")
				}(), Promise.all([o.e(383), o.e(78), o.e(63), o.e(460)]).then(o.bind(o, 9823)).then((function(n) {
					var r = new(0, n.MksapApplication);
					window.mksapApplication = r, r.start(e, t)
				}))
			}
			o(7680), window.addEventListener("load", (function() {
				t.y.attach(document.body)
			})), window.addEventListener("unhandledrejection", (function(e) {
				e.preventDefault(), (0, r.Z)(e.reason)
			}));
			var c = {
				startMksap: s,
				startLandingPage: function() {},
				ensureEulaIsAccepted: function() {
					a()((function() {
						var e = a()("#license-accept"),
							t = a()("#agreement-check"),
							n = e.find("button");
						t.on("change", (function() {
							var e = !t.is(":checked");
							n.attr("disabled", e)
						})), e.on("submit", (function(e) {
							t.is(":checked") || e.preventDefault()
						}))
					}))
				},
				startPrintAnswerSheets: function(e, t) {
					return n = this, r = void 0, a = function() {
						return function(e, t) {
							var n, r, o, i, a = {
								label: 0,
								sent: function() {
									if (1 & o[0]) throw o[1];
									return o[1]
								},
								trys: [],
								ops: []
							};
							return i = {
								next: l(0),
								throw: l(1),
								return: l(2)
							}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
								return this
							}), i;

							function l(i) {
								return function(l) {
									return function(i) {
										if (n) throw new TypeError("Generator is already executing.");
										for (; a;) try {
											if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
											switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
												case 0:
												case 1:
													o = i;
													break;
												case 4:
													return a.label++, {
														value: i[1],
														done: !1
													};
												case 5:
													a.label++, r = i[1], i = [0];
													continue;
												case 7:
													i = a.ops.pop(), a.trys.pop();
													continue;
												default:
													if (!((o = (o = a.trys).length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
														a = 0;
														continue
													}
													if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
														a.label = i[1];
														break
													}
													if (6 === i[0] && a.label < o[1]) {
														a.label = o[1], o = i;
														break
													}
													if (o && a.label < o[2]) {
														a.label = o[2], a.ops.push(i);
														break
													}
													o[2] && a.ops.pop(), a.trys.pop();
													continue
											}
											i = t.call(e, a)
										} catch (e) {
											i = [6, e], r = 0
										} finally {
											n = o = 0
										}
										if (5 & i[0]) throw i[1];
										return {
											value: i[0] ? i[1] : void 0,
											done: !0
										}
									}([i, l])
								}
							}
						}(this, (function(n) {
							switch (n.label) {
								case 0:
									return [4, Promise.all([o.e(383), o.e(63), o.e(359)]).then(o.bind(o, 9435))];
								case 1:
									return [4, (new(0, n.sent().PrintAnswerSheetsApp)).start(e, t)];
								case 2:
									return n.sent(), [2]
							}
						}))
					}, new((i = void 0) || (i = Promise))((function(e, t) {
						function o(e) {
							try {
								s(a.next(e))
							} catch (e) {
								t(e)
							}
						}

						function l(e) {
							try {
								s(a.throw(e))
							} catch (e) {
								t(e)
							}
						}

						function s(t) {
							var n;
							t.done ? e(t.value) : (n = t.value, n instanceof i ? n : new i((function(e) {
								e(n)
							}))).then(o, l)
						}
						s((a = a.apply(n, r || [])).next())
					}));
					var n, r, i, a
				},
				addSvgDefinitionsToBody: l.V
			};
			window.MksapEntryPoints = c;
			var u = o(7294),
				f = o(3935),
				d = o(1147),
				h = o(8801),
				p = o(1320),
				v = o(4716),
				m = function() {
					return m = Object.assign || function(e) {
						for (var t, n = 1, r = arguments.length; n < r; n++)
							for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
						return e
					}, m.apply(this, arguments)
				},
				g = function(e) {
					var t = e.onChange,
						n = (e.label, e.helperTextId, function(e, t) {
							var n = {};
							for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
							if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
								var o = 0;
								for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
							}
							return n
						}(e, ["onChange", "label", "helperTextId"])),
						r = (0, u.useCallback)((function(e) {
							t && t(e.target.value)
						}), [t]);
					return u.createElement(v.Z, m({}, n, {
						type: "password",
						onChange: r
					}))
				},
				y = o(9933),
				b = o(4487),
				w = o(8784),
				x = function(e) {
					var t = e.onLogIn,
						n = (0, u.useState)(!1),
						r = n[0],
						i = n[1],
						a = (0, u.useState)(void 0),
						s = a[0],
						c = a[1],
						f = (0, u.useState)(""),
						v = f[0],
						m = f[1],
						x = (0, u.useState)(""),
						M = x[0],
						z = x[1],
						E = (0, u.useCallback)((function(e) {
							return n = void 0, o = void 0, l = function() {
								var n, o;
								return function(e, t) {
									var n, r, o, i, a = {
										label: 0,
										sent: function() {
											if (1 & o[0]) throw o[1];
											return o[1]
										},
										trys: [],
										ops: []
									};
									return i = {
										next: l(0),
										throw: l(1),
										return: l(2)
									}, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
										return this
									}), i;

									function l(i) {
										return function(l) {
											return function(i) {
												if (n) throw new TypeError("Generator is already executing.");
												for (; a;) try {
													if (n = 1, r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, i[1])).done) return o;
													switch (r = 0, o && (i = [2 & i[0], o.value]), i[0]) {
														case 0:
														case 1:
															o = i;
															break;
														case 4:
															return a.label++, {
																value: i[1],
																done: !1
															};
														case 5:
															a.label++, r = i[1], i = [0];
															continue;
														case 7:
															i = a.ops.pop(), a.trys.pop();
															continue;
														default:
															if (!((o = (o = a.trys).length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
																a = 0;
																continue
															}
															if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
																a.label = i[1];
																break
															}
															if (6 === i[0] && a.label < o[1]) {
																a.label = o[1], o = i;
																break
															}
															if (o && a.label < o[2]) {
																a.label = o[2], a.ops.push(i);
																break
															}
															o[2] && a.ops.pop(), a.trys.pop();
															continue
													}
													i = t.call(e, a)
												} catch (e) {
													i = [6, e], r = 0
												} finally {
													n = o = 0
												}
												if (5 & i[0]) throw i[1];
												return {
													value: i[0] ? i[1] : void 0,
													done: !0
												}
											}([i, l])
										}
									}
								}(this, (function(a) {
									switch (a.label) {
										case 0:
											if (e.preventDefault(), !0 === r) return [2];
											i(!0), a.label = 1;
										case 1:
											return a.trys.push([1, 3, , 4]), [4, d.Z.logIn(v, M)];
										case 2:
											return n = a.sent(), t(n), [3, 4];
										case 3:
											return (o = a.sent()).friendlyErrorMessage ? c(o.friendlyErrorMessage) : c(o.message), i(!1), [3, 4];
										case 4:
											return [2]
									}
								}))
							}, new((a = void 0) || (a = Promise))((function(e, t) {
								function r(e) {
									try {
										s(l.next(e))
									} catch (e) {
										t(e)
									}
								}

								function i(e) {
									try {
										s(l.throw(e))
									} catch (e) {
										t(e)
									}
								}

								function s(t) {
									var n;
									t.done ? e(t.value) : (n = t.value, n instanceof a ? n : new a((function(e) {
										e(n)
									}))).then(r, i)
								}
								s((l = l.apply(n, o || [])).next())
							}));
							var n, o, a, l
						}), [t, r, i, v, M, c]);
					return (0, u.useLayoutEffect)((function() {
						return (0, l.V)()
					}), []), u.createElement("div", {
						className: "native-app-login-form container-fluid"
					}, u.createElement("div", {
						className: "d-flex align-items-center justify-content-center"
					}, u.createElement("div", {
						className: "card"
					}, u.createElement("div", {
						className: "card-body"
					}, u.createElement("form", {
						onSubmit: E
					}, u.createElement("img", {
						className: "mksap-acp-brand",
						src: o(1230).default
					}), u.createElement("p", null, w.C.nativeAppLogin.instructions), u.createElement("div", {
						className: "form-group field horz fill"
					}, s && u.createElement(y.bZ, {
						variant: "danger"
					}, u.createElement("div", {
						className: "ui-alert alert-danger"
					}, u.createElement("div", {
						className: "ui-alert-icon"
					}), u.createElement("div", {
						className: "ui-alert-message"
					}, s))), u.createElement(b.Z, null, u.createElement("label", {
						htmlFor: "password"
					}, "User Name"), u.createElement(p.Z, {
						id: "username",
						name: "username",
						autoCapitalize: "none",
						autoCorrect: "off",
						value: v,
						onChange: m
					}))), u.createElement("div", {
						className: "form-group field horz fill"
					}, u.createElement("label", {
						htmlFor: "password"
					}, "Password"), u.createElement(g, {
						id: "password",
						name: "password",
						value: M,
						onChange: z
					})), u.createElement("div", {
						className: "field actions"
					}, u.createElement(h.zx, {
						as: "button",
						type: "submit",
						mkStyle: "home-theme",
						disabled: r,
						loading: r,
						loadingMessage: "Submitting..."
					}, "Sign In")))))))
				},
				M = o(4391);
			o(2853), o(7680);
			var z = window;
			! function(e, t) {
				e.ga && t.gaTrackingId && (e.ga("create", t.gaTrackingId, "auto"), e.ga("set", "checkProtocolTask", (function() {})), e.ga("set", "checkStorageTask", (function() {})), e.ga("set", "historyImportTask", null), t.gaTrackingHostname && e.ga("set", "hostname", t.gaTrackingHostname))
			}(z, M.U);
			var E = new Promise((function(e) {
				console.log(E);
                console.log(e());
               
				document.addEventListener("deviceready", e, !1), M.U.inCordova || e(null)
			}));
			z.handleSwipeBack = function() {
				window.history.go(-1)
			};
			var k = new Promise((function(e) {
				n.E0(e)
			}));
			z.shouldRotateToOrientation = function(e) {
				return !0
			}, Promise.all([E, k]).then((function() {
				//var e = d.Z.getSavedLoggedInUser();
				  var userData = JSON.parse("{\"ownsProduct\":true,\"username\":\"\",\"firstName\":\"\",\"lastName\":\"\",\"acpNumber\":\"\",\"phoneNumber\":null,\"email\":\"\",\"hasComplete\":true,\"feedback\":{\"id\":null,\"user_id\":1,\"score\":null,\"prompt\":null,\"complete\":null,\"dismissed_on\":null,\"dismissed_completely\":null,\"dismissed_count\":0,\"dismissed_response_count\":null,\"created_at\":null,\"updated_at\":null},\"hasRated\":false,\"authToken\":\"\",\"starredQuestionIds\":[],\"overallSubmissionsInfo\":{\"cmeClaimed\":0,\"cmeEligible\":0,\"cmeIneligible\":200,\"cmeMaxPossible\":200,\"mocClaimed\":0,\"mocEligible\":0,\"mocIneligible\":200,\"mocMaxPossible\":200,\"pointsTotal\":200}}");
                   e = userData;     
				if (e) r(e);
				else {
				
				
				}

				function r(e) {
					n.IV(document.documentElement, "loading"), z.authToken = e.authToken, document.querySelector("body").innerHTML = '\n\t\t\t<div id="app-layout"></div>\n\t\t', s(e, {})
				}! function e() {
					var t = navigator;
					t.splashscreen ? t.splashscreen.hide() : setTimeout(e, 100)
				}()
			}))
		}()
}();