import { f as Ve, R as mt, h as xn, D as _, C as yn, i as Wt, j as ft, k as bt, l as Kt, F as bn, m as vn, n as Mn, o as Sn, H as Dt, q as Tn, r as An, s as qt, t as kn, u as ve, L as Me, b as Cn, O as Pn, v as gt, w as Se, p as Te, x as Rn } from "./config-CpFTOurB.js";
import { r as c, j as u, u as vt, a as Mt, T as En, C as Ln, A as jn, O as Fn, c as In } from "./fiber-D1tVm3tX.js";
import { E as Nn, B as zn } from "./post-Bq06d-T5.js";
import { r as rt, c as K, ad as At, ae as ne, u as Ae, aa as We, ab as tt, a3 as Ke, af as fe, ag as qe, t as Dn, D as _t, ah as Ue, F as Ze, ai as Je, x as ae } from "./three-CbMnaw2G.js";
const Bt = "./assets/intro/"
    , _n = "http://www.w3.org/2000/svg"
    , j = (t, e, n) => {
        const a = document.createElementNS(_n, t);
        for (const r in e)
            a.setAttribute(r, e[r]);
        return n && n.appendChild(a),
            a
    }
    , nt = (t, e) => t + Math.random() * (e - t)
    , On = t => Array.isArray(t) ? nt(t[0], t[1]) : t;
function $n() {
    const t = new Set;
    return {
        cancelled: !1,
        after(e, n) {
            if (this.cancelled)
                return 0;
            const a = setTimeout(() => {
                t.delete(a),
                    this.cancelled || e()
            }
                , n);
            return t.add(a),
                a
        },
        clear() {
            this.cancelled = !0;
            for (const e of t)
                clearTimeout(e);
            t.clear()
        }
    }
}
function wt(t) {
    const e = t.placement;
    if (e.mode === "box")
        return e.boxPx;
    const n = e.targetContentBoxPx
        , a = t.asset
        , r = a.alphaContentRectPx;
    if (e.mode === "alpha-content-box-stretch") {
        const i = n.width / r.width
            , s = n.height / r.height;
        return {
            x: n.x - r.x * i,
            y: n.y - r.y * s,
            width: a.width * i,
            height: a.height * s
        }
    }
    const o = Math.min(n.width / r.width, n.height / r.height);
    return {
        x: n.x + (n.width - r.width * o) / 2 - r.x * o,
        y: n.y + (n.height - r.height * o) / 2 - r.y * o,
        width: a.width * o,
        height: a.height * o
    }
}
function oe(t, e) {
    return j("image", {
        href: Bt + t.file,
        x: e.x,
        y: e.y,
        width: e.width,
        height: e.height,
        preserveAspectRatio: "none",
        "data-layer": t.id
    })
}
function ke(t, e, n) {
    if (n)
        return;
    const a = e.animation || {}
        , r = wt(e);
    if (a.transformOrigin) {
        const [l, p] = a.transformOrigin.split(" ").map(parseFloat);
        t.style.transformOrigin = `${r.x + r.width * l / 100}px ${r.y + r.height * p / 100}px`
    } else
        t.style.transformOrigin = `${r.x + r.width / 2}px ${r.y + r.height / 2}px`;
    const o = On(a.durationSeconds || 6) * 1e3
        , i = (a.delaySeconds || 0) * 1e3
        , s = {
            duration: o,
            iterations: 1 / 0,
            direction: "alternate",
            easing: "ease-in-out",
            delay: i
        }
        , f = () => a.translateXPx ? a.translateXPx : a.translateXPercent ? [r.width * a.translateXPercent[0] / 100, r.width * a.translateXPercent[1] / 100] : [0, 0];
    switch (a.preset) {
        case "lantern-float":
            {
                const [l, p] = a.translateYPx
                    , [g, d] = a.rotateDegrees;
                t.animate([{
                    transform: `translateY(${l}px) rotate(${g}deg)`
                }, {
                    transform: `translateY(${p}px) rotate(${d}deg)`
                }], s);
                break
            }
        case "glow-pulse":
            t.animate([{
                transform: `scale(${a.scale[0]})`,
                opacity: a.opacity[0]
            }, {
                transform: `scale(${a.scale[1]})`,
                opacity: a.opacity[1]
            }], s);
            break;
        case "twinkle":
            t.animate([{
                opacity: a.opacity[1]
            }, {
                opacity: a.opacity[0]
            }], {
                ...s,
                duration: 3e3
            });
            break;
        case "slow-drift":
        case "parallax-x":
        case "cloud-drift":
            {
                const [l, p] = f();
                t.animate([{
                    transform: `translateX(${l}px)`
                }, {
                    transform: `translateX(${p}px)`
                }], s);
                break
            }
        case "branch-sway":
            {
                const [l, p] = a.rotateDegrees;
                t.animate([{
                    transform: `rotate(${l}deg)`
                }, {
                    transform: `rotate(${p}deg)`
                }], s);
                break
            }
        case "rabbit-breathe":
            {
                const [l, p] = a.translateYPx
                    , [g, d] = a.scale;
                t.animate([{
                    transform: `translateY(${l}px) scale(${g})`
                }, {
                    transform: `translateY(${p}px) scale(${d})`
                }], s);
                break
            }
    }
}
function Bn(t, e, n, { reduced: a, timers: r }) {
    const o = t.repeat
        , i = wt(t)
        , s = i.x + i.width / 2
        , f = i.y + i.height / 2
        , l = /flower/.test(t.id)
        , p = n.bloomSpots || []
        , g = n.fallFloor || n.scene.referenceCanvas.height
        , d = n.scene.referenceCanvas.width / 551
        , m = h => {
            if (r.cancelled || !h.isConnected)
                return;
            const x = p[Math.floor(Math.random() * p.length)]
                , b = x.x + nt(-14, 14) * d
                , v = x.y + nt(-6, 10) * d
                , M = nt(o.randomScale[0], o.randomScale[1])
                , C = nt(0, 360)
                , w = Math.min(nt(150, 300) * d, g - v)
                , A = nt(-40, 40) * d
                , N = nt(8, 22) * d * (Math.random() < .5 ? -1 : 1)
                , E = nt(90, 260) * (Math.random() < .5 ? -1 : 1)
                , P = nt(l ? 6500 : 5500, l ? 10500 : 9500);
            h.style.transformOrigin = `${s}px ${f}px`;
            const F = (T, z) => {
                const D = b - s + A * T + N * Math.sin(z)
                    , lt = v - f + w * (T * T * .35 + T * .65);
                return `translate(${D}px, ${lt}px) scale(${M}) rotate(${C + E * T}deg)`
            }
                , I = []
                , O = 8;
            for (let T = 0; T <= O; T++) {
                const z = T / O
                    , D = z < .12 ? z / .12 : z > .72 ? Math.max(0, 1 - (z - .72) / .28) : 1;
                I.push({
                    transform: F(z, z * Math.PI * 2.2),
                    opacity: D * .95,
                    offset: z
                })
            }
            h.animate(I, {
                duration: P,
                easing: "linear",
                fill: "forwards"
            }).finished.then(() => {
                r.cancelled || !h.isConnected || r.after(() => m(h), nt(300, 4500))
            }
            ).catch(() => { }
            )
        }
        ;
    for (let h = 0; h < o.recommendedCount; h++) {
        const x = j("g", {}, e);
        x.appendChild(oe(t, i)),
            x.style.opacity = "0",
            !(a || !p.length) && r.after(() => m(x), nt(0, 6e3))
    }
}
const Ut = new Map;
function Gn(t) {
    const e = Bt + t.file;
    if (Ut.has(e))
        return Ut.get(e);
    const n = new Promise((a, r) => {
        const o = new Image;
        o.onload = () => {
            try {
                const i = o.naturalWidth
                    , s = o.naturalHeight
                    , f = document.createElement("canvas");
                f.width = i,
                    f.height = s;
                const l = f.getContext("2d");
                l.drawImage(o, 0, 0);
                const p = l.getImageData(0, 0, i, s).data
                    , g = t.asset.alphaContentRectPx
                    , d = g.x + g.width / 2
                    , m = g.y + g.height / 2
                    , h = 360
                    , x = 3
                    , b = [];
                let v = 1e9
                    , M = 1e9
                    , C = -1e9
                    , w = -1e9;
                for (let N = 0; N < h; N++) {
                    const E = N / h * Math.PI * 2
                        , P = Math.cos(E)
                        , F = Math.sin(E);
                    let I = 0;
                    for (; I < i; I++) {
                        const z = Math.round(d + P * I)
                            , D = Math.round(m + F * I);
                        if (z < 0 || D < 0 || z >= i || D >= s || p[(D * i + z) * 4 + 3] > 40)
                            break
                    }
                    const O = Math.max(0, I - x)
                        , S = d + P * O
                        , T = m + F * O;
                    b.push([S, T]),
                        S < v && (v = S),
                        S > C && (C = S),
                        T < M && (M = T),
                        T > w && (w = T)
                }
                const A = b.map(([N, E], P) => (P ? "L" : "M") + N.toFixed(1) + " " + E.toFixed(1)).join(" ") + " Z";
                a({
                    d: A,
                    bbox: {
                        x: v,
                        y: M,
                        width: C - v,
                        height: w - M
                    }
                })
            } catch (i) {
                r(i)
            }
        }
            ,
            o.onerror = () => r(new Error("Không đọc được ảnh khung")),
            o.src = e
    }
    );
    return Ut.set(e, n),
        n
}
async function Hn({ root: t, layout: e, kind: n, flags: a, timers: r, reg: o, isCancelled: i, onStart: s, onHide: f, markDone: l }) {
    const { reduced: p, skyBlue: g, hiddenLayers: d } = a
        , m = e.scene.referenceCanvas
        , h = e.layers.find(y => y.id === "window-frame");
    let x = null;
    try {
        x = await Gn(h)
    } catch (y) {
        console.warn("Dùng đường cắt trong layout vì không suy được từ ảnh khung:", y)
    }
    if (i())
        return;
    const b = n === "d";
    t.classList.toggle("desktop", b),
        t.style.backgroundColor = e.scene.backgroundColor || "#050a14";
    const v = j("svg", {
        class: "poster " + n,
        viewBox: m.viewBox,
        role: "img",
        "aria-label": "Thiệp Trung thu",
        preserveAspectRatio: b ? "xMidYMid slice" : "xMidYMid meet"
    }, t);
    let M = null
        , C = null
        , w = {
            x: 0,
            y: 0,
            width: m.width,
            height: m.height
        };
    const A = () => {
        if (b)
            return;
        const y = Math.min(innerWidth / m.width, innerHeight / m.height)
            , R = innerWidth / y
            , L = innerHeight / y;
        let st = (e.scene.portraitFocusY || m.height / 2) - L / 2;
        L >= m.height && (st = Math.max(m.height - L, Math.min(0, st))),
            w = {
                x: (m.width - R) / 2,
                y: st,
                width: R,
                height: L
            },
            v.setAttribute("viewBox", `${w.x} ${w.y} ${R} ${L}`);
        const B = e.scene.moonHint;
        C && B && (C.setAttribute("x", w.x + R / 2),
            C.setAttribute("y", w.y + L - (B.screenBottomPx || 38) / y),
            C.setAttribute("font-size", (B.screenFontPx || 14) / y)),
            M && (M.setAttribute("x", w.x),
                M.setAttribute("y", w.y),
                M.setAttribute("width", w.width),
                M.setAttribute("height", w.height))
    }
        ;
    A(),
        window.addEventListener("resize", A),
        o(() => window.removeEventListener("resize", A));
    const N = j("defs", {}, v)
        , E = j("clipPath", {
            id: "window-aperture",
            clipPathUnits: "userSpaceOnUse"
        }, N);
    let P;
    if (x) {
        const y = wt(h)
            , R = y.width / h.asset.width
            , L = y.height / h.asset.height;
        E.setAttribute("transform", `translate(${y.x} ${y.y}) scale(${R} ${L})`),
            j("path", {
                d: x.d
            }, E),
            P = {
                x: y.x + x.bbox.x * R,
                y: y.y + x.bbox.y * L,
                width: x.bbox.width * R,
                height: x.bbox.height * L
            }
    } else {
        const R = j("path", {
            d: e.clipPaths["window-aperture"].d
        }, E).getBBox();
        P = {
            x: R.x,
            y: R.y,
            width: R.width,
            height: R.height
        }
    }
    const F = j("radialGradient", {
        id: "moon-halo-gradient"
    }, N);
    j("stop", {
        offset: "0%",
        "stop-color": "#fff6d6",
        "stop-opacity": "0.9"
    }, F),
        j("stop", {
            offset: "35%",
            "stop-color": "#ffe7a8",
            "stop-opacity": "0.45"
        }, F),
        j("stop", {
            offset: "70%",
            "stop-color": "#ffd98a",
            "stop-opacity": "0.12"
        }, F),
        j("stop", {
            offset: "100%",
            "stop-color": "#ffd98a",
            "stop-opacity": "0"
        }, F);
    const I = j("filter", {
        id: "moon-soft",
        x: "-50%",
        y: "-50%",
        width: "200%",
        height: "200%"
    }, N);
    j("feGaussianBlur", {
        stdDeviation: String(6 * m.width / 551)
    }, I);
    const O = j("radialGradient", {
        id: "dark-sky-gradient",
        cx: "32%",
        cy: "28%",
        r: "85%"
    }, N);
    j("stop", {
        offset: "0%",
        "stop-color": "#171326"
    }, O),
        j("stop", {
            offset: "45%",
            "stop-color": "#08070f"
        }, O),
        j("stop", {
            offset: "100%",
            "stop-color": "#000000"
        }, O);
    const S = [...e.layers].sort((y, R) => y.zIndex - R.zIndex)
        , T = S.find(y => y.id === "full-moon")
        , z = T.placement.targetContentBoxPx
        , D = {
            cx: z.x + z.width / 2,
            cy: z.y + z.height / 2,
            r: Math.min(z.width, z.height) / 2
        }
        , lt = T.interactive && T.interactive.hitSlopPx || 14
        , dt = T.interactive && T.interactive.holdDurationMs || 1500
        , $ = P
        , q = {
            cx: $.x + $.width / 2,
            cy: $.y + $.height / 2,
            w: $.width,
            h: $.height
        }
        , G = {}
        , k = j("g", {
            id: "window-group"
        })
        , H = j("g", {
            "clip-path": "url(#window-aperture)"
        }, k);
    let X = !1;
    for (const y of S) {
        if (d.has(y.id))
            continue;
        if (y.group === "particles") {
            const L = j("g", {
                id: "g-" + y.id
            }, v);
            G[y.id] = L,
                Bn(y, L, e, {
                    reduced: p,
                    timers: r
                });
            continue
        }
        const R = j("g", {
            id: "g-" + y.id
        });
        if (!b && y.placement.mode === "box" && y.zIndex === 0) {
            M = j("image", {
                href: Bt + y.file,
                x: w.x,
                y: w.y,
                width: w.width,
                height: w.height,
                preserveAspectRatio: "xMidYMid slice"
            }),
                R.appendChild(M),
                G[y.id] = R,
                v.appendChild(R);
            continue
        }
        if (y.id === "night-sky" && !g) {
            const L = wt(y);
            j("rect", {
                x: L.x - L.width,
                y: L.y - L.height,
                width: L.width * 3,
                height: L.height * 3,
                fill: "url(#dark-sky-gradient)"
            }, R)
        } else
            R.appendChild(oe(y, wt(y)));
        if (G[y.id] = R,
            y.group === "window-content") {
            H.appendChild(R);
            continue
        }
        if (y.id === "window-frame") {
            k.appendChild(R),
                v.appendChild(k),
                X = !0;
            continue
        }
        v.appendChild(R),
            ke(R, y, p)
    }
    for (const y of S)
        y.group === "window-content" && G[y.id] && ke(G[y.id], y, p);
    X || v.appendChild(k);
    const V = Math.max(m.width, m.height) * 4
        , U = j("rect", {
            id: "intro-dim",
            x: -V,
            y: -V,
            width: V * 2 + m.width,
            height: V * 2 + m.height,
            fill: "#1a0208",
            opacity: "0",
            "pointer-events": "none"
        }, v)
        , Y = j("g", {
            id: "moon-ui"
        }, v)
        , Z = j("circle", {
            class: "moon-hit",
            cx: D.cx,
            cy: D.cy,
            r: D.r + lt,
            tabindex: "0",
            role: "button",
            "aria-label": T.interactive && T.interactive.ariaLabel || "Ấn và giữ mặt trăng để mở thiệp"
        }, Y)
        , J = j("circle", {
            class: "moon-halo",
            cx: D.cx,
            cy: D.cy,
            r: D.r * 1.9,
            filter: "url(#moon-soft)",
            "pointer-events": "none"
        }, Y);
    J.style.transformOrigin = `${D.cx}px ${D.cy}px`,
        p || J.animate([{
            opacity: .32,
            transform: "scale(1)"
        }, {
            opacity: .55,
            transform: "scale(1.06)"
        }], {
            duration: 3200,
            iterations: 1 / 0,
            direction: "alternate",
            easing: "ease-in-out"
        });
    const Pt = j("g", {
        "clip-path": "url(#window-aperture)",
        opacity: "0",
        "pointer-events": "none"
    }, Y);
    Pt.appendChild(oe(T, wt(T))),
        Pt.style.transformOrigin = `${D.cx}px ${D.cy}px`;
    const ge = G["full-moon"];
    ge.style.transformOrigin = `${D.cx}px ${D.cy}px`;
    const it = e.scene.moonHint;
    let Rt = null;
    it && it.text && (Rt = j("g", {
        class: "moon-hint",
        "pointer-events": "none"
    }, Y),
        C = j("text", {
            x: it.centerX != null ? it.centerX : D.cx,
            y: it.baselineY != null ? it.baselineY : 0,
            "font-size": it.fontSizePx != null ? it.fontSizePx : 16,
            "text-anchor": "middle"
        }, Rt),
        C.textContent = it.text,
        p || C.animate([{
            opacity: .62
        }, {
            opacity: 1
        }], {
            duration: 2200,
            iterations: 1 / 0,
            direction: "alternate",
            easing: "ease-in-out"
        }),
        A()),
        function () {
            if (p)
                return;
            const R = m.height / 100
                , L = "cubic-bezier(.2,.75,.25,1)"
                , Q = (B, at, ot, Et, ct) => {
                    if (!B || !B.parentNode)
                        return;
                    const Tt = j("g", {
                        class: "intro-enter"
                    });
                    B.parentNode.insertBefore(Tt, B),
                        Tt.appendChild(B),
                        Tt.animate([{
                            opacity: 0,
                            transform: `translate(${at}px, ${ot}px)`
                        }, {
                            opacity: 1,
                            transform: "translate(0px, 0px)"
                        }], {
                            duration: ct,
                            delay: Et,
                            easing: L,
                            fill: "backwards"
                        })
                }
                , st = S.find(B => B.zIndex === 0);
            st && Q(G[st.id], 0, 0, 0, 850),
                Q(k, 0, -2.2 * R, 120, 950);
            for (const B of S) {
                const at = G[B.id];
                if (!at || B.zIndex === 0 || B.id === "window-frame" || B.group === "window-content")
                    continue;
                const ot = B.id;
                ot.startsWith("lantern") ? Q(at, 0, 5.5 * R, 430, 1050) : ot.startsWith("cloud") ? Q(at, (ot.includes("left") ? -4 : 4) * R, 0, 330, 1050) : ot.includes("branch") ? Q(at, 0, 4.5 * R, 520, 1050) : ot === "jade-rabbit" ? Q(at, 0, 2.8 * R, 700, 950) : B.group === "particles" ? Q(at, 0, 0, 950, 800) : Q(at, 0, 0, 500, 900)
            }
            Q(Y, 0, 0, 1020, 850)
        }();
    let ut = !1
        , St = !1
        , et = 0
        , we = 0
        , pt = 0;
    const hn = () => {
        et > 0 ? (J.getAnimations().forEach(y => y.cancel()),
            J.style.opacity = String(.4 + .6 * et),
            J.style.transform = `scale(${1 + .9 * et})`) : (J.style.opacity = "",
                J.style.transform = ""),
            U.setAttribute("opacity", String(.6 * et)),
            Pt.setAttribute("opacity", String(et)),
            Z.style.transform = ge.style.transform = Pt.style.transform = `scale(${1 + .06 * et})`,
            Rt && Rt.setAttribute("opacity", String(1 - et))
    }
        , Xt = y => {
            if (!St) {
                if (et = ut ? Math.min(1, (y - we) / dt) : Math.max(0, et - .04),
                    hn(),
                    ut && et >= 1)
                    return mn();
                (ut || et > 0) && (pt = requestAnimationFrame(Xt))
            }
        }
        , Yt = y => {
            St || ut || (y && y.preventDefault && y.preventDefault(),
                ut = !0,
                we = performance.now() - et * dt,
                t.classList.add("holding"),
                cancelAnimationFrame(pt),
                pt = requestAnimationFrame(Xt))
        }
        , ht = () => {
            St || !ut || (ut = !1,
                t.classList.remove("holding"),
                cancelAnimationFrame(pt),
                pt = requestAnimationFrame(Xt))
        }
        , xe = y => y.preventDefault()
        , ye = y => {
            (y.code === "Space" || y.code === "Enter") && !y.repeat && Yt(y)
        }
        , be = y => {
            (y.code === "Space" || y.code === "Enter") && ht()
        }
        ;
    Z.addEventListener("pointerdown", Yt),
        window.addEventListener("pointerup", ht),
        window.addEventListener("pointercancel", ht),
        window.addEventListener("blur", ht),
        Z.addEventListener("contextmenu", xe),
        Z.addEventListener("keydown", ye),
        Z.addEventListener("keyup", be),
        o(() => {
            St = !0,
                cancelAnimationFrame(pt),
                window.removeEventListener("pointerup", ht),
                window.removeEventListener("pointercancel", ht),
                window.removeEventListener("blur", ht),
                Z.removeEventListener("pointerdown", Yt),
                Z.removeEventListener("contextmenu", xe),
                Z.removeEventListener("keydown", ye),
                Z.removeEventListener("keyup", be)
        }
        );
    function mn() {
        St = !0,
            ut = !1,
            l(),
            t.classList.remove("holding"),
            t.classList.add("done"),
            Y.animate([{
                opacity: 1
            }, {
                opacity: 0
            }], {
                duration: 500,
                fill: "forwards"
            }),
            U.animate([{
                opacity: .6
            }, {
                opacity: 0
            }], {
                duration: 700,
                fill: "forwards"
            });
        const y = "cubic-bezier(.4,0,.2,1)"
            , R = m.width / 551
            , L = (ct, Tt, pn, gn) => {
                const Vt = G[ct];
                Vt && (Vt.getAnimations().forEach(wn => wn.cancel()),
                    Vt.animate([{
                        transform: "translateY(0px)",
                        opacity: 1
                    }, {
                        transform: `translateY(${Tt * R}px)`,
                        opacity: 0
                    }], {
                        duration: pn,
                        delay: gn,
                        easing: y,
                        fill: "forwards"
                    }))
            }
            ;
        L("lantern-large-over-frame", -260, 1500, 0),
            L("lantern-medium-center", -220, 1400, 80),
            L("lantern-medium", -220, 1400, 80),
            L("lantern-small-right", -180, 1300, 160),
            L("lantern-distant", -140, 1200, 220),
            L("osmanthus-branch", 120, 1100, 0),
            L("osmanthus-branch-desktop", 120, 1100, 0),
            L("jade-rabbit", 120, 1100, 0);
        for (const ct of ["cloud-left", "cloud-right", "cloud-left-desktop", "cloud-right-desktop"])
            L(ct, 0, 700, 0);
        for (const ct of S)
            ct.group === "particles" && G[ct.id] && G[ct.id].animate([{
                opacity: 1
            }, {
                opacity: 0
            }], {
                duration: 600,
                fill: "forwards"
            });
        const Q = G["red-background"] || G["desktop-background"];
        Q && Q.animate([{
            opacity: 1
        }, {
            opacity: 0
        }], {
            duration: 900,
            delay: 700,
            fill: "forwards"
        }),
            t.animate([{
                backgroundColor: t.style.backgroundColor
            }, {
                backgroundColor: "#000"
            }], {
                duration: 1200,
                delay: 500,
                fill: "forwards"
            }),
            t.animate([{
                opacity: 1
            }, {
                opacity: 1,
                offset: .42
            }, {
                opacity: 0
            }], {
                duration: 3e3,
                easing: "linear",
                fill: "forwards"
            });
        const st = v.getScreenCTM()
            , B = st.a
            , at = Math.max(innerWidth / (q.w * B), innerHeight / (q.h * B)) * 1.25
            , ot = v.createSVGPoint();
        ot.x = innerWidth / 2,
            ot.y = innerHeight / 2;
        const Et = ot.matrixTransform(st.inverse());
        k.style.transformOrigin = `${q.cx}px ${q.cy}px`,
            k.animate([{
                transform: "translate(0px, 0px) scale(1)"
            }, {
                transform: `translate(${Et.x - q.cx}px, ${Et.y - q.cy}px) scale(${at})`
            }], {
                duration: 2e3,
                delay: 350,
                easing: "cubic-bezier(.55,0,.3,1)",
                fill: "forwards"
            }),
            G["window-frame"].animate([{
                opacity: 1
            }, {
                opacity: 0
            }], {
                duration: 900,
                delay: 900,
                fill: "forwards"
            }),
            H.animate([{
                opacity: 1
            }, {
                opacity: 1,
                offset: .55
            }, {
                opacity: 0
            }], {
                duration: 2e3,
                delay: 900,
                fill: "forwards"
            }),
            r.after(s, 1e3),
            r.after(f, 3100)
    }
}
function Xn({ rootRef: t, enabled: e, onStart: n, onHide: a }) {
    const r = c.useMemo(() => {
        const d = new URLSearchParams(location.search);
        return {
            force: d.get("layout"),
            skyBlue: d.get("sky") === "blue",
            hiddenLayers: new Set(d.get("mountains") === "1" ? [] : ["mountains"]),
            reduced: Ve()
        }
    }
        , [])
        , o = c.useMemo(() => window.matchMedia("(min-width: 900px) and (min-aspect-ratio: 4/3)"), [])
        , i = () => r.force === "desktop" ? "desktop" : r.force === "mobile" ? "mobile" : o.matches ? "desktop" : "mobile"
        , [s, f] = c.useState(i)
        , l = c.useRef(!1)
        , p = c.useRef(n)
        , g = c.useRef(a);
    p.current = n,
        g.current = a,
        c.useEffect(() => {
            if (r.force)
                return;
            const d = () => {
                l.current || f(i())
            }
                ;
            return o.addEventListener("change", d),
                () => o.removeEventListener("change", d)
        }
            , [o, r.force]),
        c.useEffect(() => {
            const d = t.current;
            if (!e || !d)
                return;
            let m = !1;
            const h = () => m
                , x = $n()
                , b = []
                , v = w => b.push(w)
                , M = new AbortController;
            return fetch(Bt + "layout.desktop.json", {
                signal: M.signal
            }).then(w => w.json()).then(w => {
                if (!m)
                    return Hn({
                        root: d,
                        layout: w,
                        kind: s,
                        flags: r,
                        timers: x,
                        reg: v,
                        isCancelled: h,
                        onStart: () => p.current && p.current(),
                        onHide: () => g.current && g.current(),
                        markDone: () => {
                            l.current = !0
                        }
                    })
            }
            ).catch(w => {
                m || w.name === "AbortError" || (console.error("Không dựng được màn mở đầu:", w),
                    l.current = !0,
                    p.current && p.current(),
                    g.current && g.current())
            }
            ),
                () => {
                    m = !0,
                        M.abort(),
                        x.clear();
                    for (const w of b)
                        try {
                            w()
                        } catch { }
                    d.getAnimations && d.getAnimations().forEach(w => w.cancel()),
                        d.replaceChildren(),
                        d.classList.remove("desktop", "holding", "done"),
                        d.style.backgroundColor = "",
                        d.style.opacity = ""
                }
        }
            , [s, e])
}
function Yn({ onStart: t, skip: e = !1 }) {
    const n = c.useRef(null)
        , [a, r] = c.useState(!0)
        , o = c.useRef(!1)
        , i = c.useRef(t);
    i.current = t;
    const s = c.useCallback(() => {
        o.current || (o.current = !0,
            i.current && i.current())
    }
        , [])
        , f = c.useCallback(() => r(!1), [])
        , [l] = c.useState(() => e || new URLSearchParams(location.search).get("autostart") === "1");
    return c.useEffect(() => {
        l && (s(),
            r(!1))
    }
        , [l, s]),
        Xn({
            rootRef: n,
            enabled: a && !l,
            onStart: s,
            onHide: f
        }),
        !a || l ? null : u.jsx("div", {
            className: "intro",
            ref: n
        })
}
const de = {
    paragraphs: ["Hé lu cô nàng của anh nhó. Lời đầu tiên, anh cảm ơn em vì chúng ta tìm thấy nhau nì xong rùi như bây giờ nè :)). Có thể đôi lúc 2 đứa hơi vụng về nhưng mờ anh cảm ơn em vì em luôn ở lại đồng hành cùng anh. Nhân tiện mùa Trung Thu anh chúc em bình an vui vẻ càng ngày càng như những bông hoa thanh cúc nở rộ vào mùa thu. Anh chúc em 1 kì trung thu hạnh phúc. Anh Yêu Em"],
}
    , Lt = {
        speedMs: 42,
        minSpeedMs: 28,
        maxTotalMs: 22e3
    }
    , Zt = "./assets/nguyet-thu"
    , Vn = 620
    , Wn = 300;
function Kn(t) {
    try {
        if (typeof Intl < "u" && Intl.Segmenter)
            return Array.from(new Intl.Segmenter("vi", {
                granularity: "grapheme"
            }).segment(t), e => e.segment)
    } catch { }
    return Array.from(t)
}
function Qe(t) {
    const e = ((t == null ? void 0 : t.text) ?? de.paragraphs.join(`
`)).replace(/\r\n?/g, `
`).trim()
        , n = Kn(e)
        , a = n.length ? Math.max(Lt.minSpeedMs, Math.min(Lt.speedMs, Lt.maxTotalMs / n.length)) : Lt.speedMs;
    return {
        fullText: e,
        graphemes: n,
        msPerChar: a
    }
}
const tn = Qe({
    text: de.paragraphs.join(`
`)
})
    , Ce = /https?:\/\/[^\s<>"']+/g;
function qn(t, e) {
    t.textContent = "";
    let n = 0, a;
    for (Ce.lastIndex = 0; (a = Ce.exec(e)) !== null;) {
        let r = a[0]
            , o = "";
        const i = r.match(/[.,;:!?)\]]+$/);
        if (i && (o = i[0],
            r = r.slice(0, -o.length)),
            !r)
            continue;
        a.index > n && t.appendChild(document.createTextNode(e.slice(n, a.index)));
        const s = document.createElement("a");
        s.href = r,
            s.textContent = r,
            s.target = "_blank",
            s.rel = "noopener noreferrer",
            t.appendChild(s),
            o && t.appendChild(document.createTextNode(o)),
            n = a.index + a[0].length
    }
    n < e.length && t.appendChild(document.createTextNode(e.slice(n)))
}
function Un({ active: t, runId: e, typedRef: n, cursorRef: a, boxRef: r, onDone: o, noiDung: i }) {
    const s = c.useRef(null);
    return c.useEffect(() => {
        let f = !1;
        if (!t)
            return;
        const { fullText: l, graphemes: p, msPerChar: g } = i || tn
            , d = n.current
            , m = a.current
            , h = r.current;
        if (!d || !h)
            return;
        let x = null
            , b = 0
            , v = 0
            , M = 0
            , C = 0;
        function w() {
            d.textContent = "",
                x = document.createTextNode(""),
                d.appendChild(x),
                b = 0,
                h.scrollTop = 0,
                m && (m.hidden = !1)
        }
        function A(I) {
            !x || I <= b || (x.appendData(p.slice(b, I).join("")),
                b = I,
                h.scrollTop = 1e9)
        }
        function N(I) {
            if (A(p.length),
                qn(d, l),
                x = null,
                m && (m.hidden = !0),
                f || (f = !0,
                    o == null || o()),
                !I) {
                h.scrollTop = 0;
                return
            }
            h.scrollTop = 1e9,
                M = requestAnimationFrame(() => {
                    M = 0,
                        h.scrollTop = h.scrollHeight
                }
                )
        }
        function E() {
            v && (cancelAnimationFrame(v),
                v = 0),
                C && (clearTimeout(C),
                    C = 0)
        }
        function P() {
            E(),
                !(!x && b >= p.length) && N(!1)
        }
        function F() {
            const I = performance.now()
                , O = () => {
                    v = 0;
                    const S = Math.min(p.length, Math.floor((performance.now() - I) / g));
                    if (A(S),
                        b >= p.length) {
                        N(!0);
                        return
                    }
                    v = requestAnimationFrame(O)
                }
                ;
            v = requestAnimationFrame(O)
        }
        return s.current = P,
            w(),
            C = setTimeout(() => {
                C = 0,
                    F()
            }
                , Vn),
            () => {
                E(),
                    M && (cancelAnimationFrame(M),
                        M = 0),
                    s.current = null
            }
    }
        , [t, e, n, a, r, o, i]),
        c.useCallback(() => {
            s.current && s.current()
        }
            , [])
}
function Zn({ open: t, onClose: e, onOpenHeart: n, showHeart: a = !0, noiDung: r = tn }) {
    const [o, i] = c.useState(!1)
        , [s, f] = c.useState(!1)
        , [l, p] = c.useState(0)
        , g = c.useRef(!1)
        , d = c.useRef(null)
        , m = c.useRef(null)
        , h = c.useRef(null)
        , x = c.useRef(null)
        , b = c.useRef(null)
        , [v, M] = c.useState(!1)
        , C = c.useRef(null)
        , w = o && !s && v
        , [A, N] = c.useState(!1)
        , E = c.useCallback(() => N(!0), [])
        , P = Un({
            active: w,
            runId: l,
            typedRef: h,
            cursorRef: x,
            boxRef: m,
            onDone: E,
            noiDung: r
        });
    c.useEffect(() => {
        if (t) {
            g.current = !0,
                d.current = document.activeElement,
                i(!0),
                f(!1),
                p(T => T + 1),
                N(!1),
                M(!1);
            return
        }
        if (!g.current)
            return;
        f(!0);
        const S = setTimeout(() => {
            i(!1),
                f(!1)
        }
            , Wn);
        return () => clearTimeout(S)
    }
        , [t]),
        c.useEffect(() => {
            if (o)
                return;
            const S = d.current;
            S && typeof S.focus == "function" && S.focus(),
                d.current = null
        }
            , [o]),
        c.useEffect(() => {
            w && b.current && b.current.focus()
        }
            , [w, l]),
        c.useEffect(() => {
            if (!w)
                return;
            const S = T => {
                T.key === "Escape" && e()
            }
                ;
            return window.addEventListener("keydown", S),
                () => window.removeEventListener("keydown", S)
        }
            , [w, e]),
        c.useEffect(() => {
            if (!o || v)
                return;
            const S = C.current;
            if (!S)
                return;
            const T = () => M(!0);
            if (S.complete && S.naturalWidth > 0) {
                T();
                return
            }
            S.addEventListener("load", T),
                S.addEventListener("error", T);
            const z = setTimeout(T, 6e3);
            return () => {
                S.removeEventListener("load", T),
                    S.removeEventListener("error", T),
                    clearTimeout(z)
            }
        }
            , [o, v, l]);
    const F = c.useCallback(S => {
        S.target === S.currentTarget && e()
    }
        , [e])
        , I = c.useCallback(S => {
            S.target.closest(".nt-close") || S.target.closest(".nt-toheart") || S.target.closest("a") || P()
        }
            , [P])
        , O = c.useCallback(() => {
            e(),
                n == null || n()
        }
            , [e, n]);
    return o ? u.jsx("div", {
        className: s ? "nt-backdrop nt-closing" : "nt-backdrop",
        onMouseDown: F,
        children: u.jsxs("section", {
            className: v ? "nt-dialog nt-san" : "nt-dialog",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "Lá thư",
            onClick: I,
            children: [u.jsxs("picture", {
                className: "nt-sheet",
                "aria-hidden": "true",
                children: [u.jsx("source", {
                    media: "(max-width: 767px)",
                    srcSet: `${Zt}/paper-straight.webp`
                }), u.jsx("img", {
                    ref: C,
                    src: `${Zt}/paper.webp`,
                    alt: ""
                })]
            }), u.jsx("button", {
                ref: b,
                className: "nt-close",
                type: "button",
                "aria-label": "Đóng lá thư",
                onClick: e,
                children: u.jsx("svg", {
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    focusable: "false",
                    children: u.jsx("path", {
                        d: "M8.4 8.4 15.6 15.6M15.6 8.4 8.4 15.6"
                    })
                })
            }), u.jsx("div", {
                className: "nt-letter",
                ref: m,
                "aria-live": "polite",
                children: u.jsx("div", {
                    className: "nt-letter-inner",
                    children: u.jsxs("p", {
                        className: "nt-copy",
                        children: [u.jsx("span", {
                            className: "nt-typed",
                            ref: h
                        }), u.jsx("b", {
                            className: "nt-cursor",
                            ref: x,
                            "aria-hidden": "true"
                        })]
                    })
                })
            }), u.jsx("img", {
                className: "nt-rabbit",
                src: `${Zt}/rabbit-cloud.webp`,
                alt: "Thỏ ngọc trên mây"
            }), a && A ? u.jsx("button", {
                type: "button",
                className: "nt-toheart",
                onClick: O,
                title: "Mở trái tim",
                "aria-label": "Mở trái tim",
                children: u.jsx("img", {
                    src: "./assets/ui/btn-heart.webp",
                    alt: "",
                    draggable: !1
                })
            }) : null]
        })
    }, l) : null
}
const Gt = {
    started: _.autostart
};
function Jn() {
    Gt.started = !0
}
const re = new rt(mt.hong.a)
    , ie = new rt(mt.hong.b);
function en(t) {
    const e = mt[t] || mt.hong;
    re.set(e.a),
        ie.set(e.b)
}
let Ot = "hong";
function Qn(t) {
    Ot = mt[t] ? t : "hong",
        en(Ot)
}
function ta(t) {
    Ot = mt[t] ? t : "hong",
        en(Ot)
}
try {
    localStorage.removeItem(xn)
} catch { }
const xt = {
    open: !1,
    since: 0
};
function Pe(t) {
    xt.open = !!t,
        xt.since = performance.now()
}
function ea() {
    if (!xt.open && !xt.since)
        return 1;
    const t = Math.min(1, (performance.now() - xt.since) / 1e3 / yn)
        , e = t * t * (3 - 2 * t);
    return xt.open ? 1 - (1 - Wt) * e : Wt + (1 - Wt) * e
}
const kt = {
    startedAt: -1
};
function na() {
    return kt.startedAt >= 0 ? !1 : (kt.startedAt = performance.now(),
        !0)
}
function aa() {
    kt.startedAt = -1
}
function nn() {
    return kt.startedAt < 0 ? 0 : Math.min(1, (performance.now() - kt.startedAt) / 1e3 / _.flySecs)
}
const $t = t => Math.min(Number.isFinite(t) && t > 0 ? t : 1 / 60, 1 / 30)
    , se = t => t < 0 ? 0 : t > 1 ? 1 : t
    , an = t => {
        const e = se(t);
        return e * e * (3 - 2 * e)
    }
    ;
function oa(t, e, n) {
    let a = t + Kt * e * n;
    return (Kt > 0 ? a > bt : a < ft) && (a = Kt > 0 ? ft : bt),
        a
}
function Re(t) {
    const e = se((t - ft) / (bn - ft))
        , n = se((bt - t) / (bt - vn));
    return an(e * n)
}
const Ee = (t, e, n) => Math.sin(t * .55 + n) * e
    , on = () => ft + Math.random() * (bt - ft);
function ra({ onDone: t }) {
    const e = vt(a => a.camera)
        , n = c.useRef({
            t: 0,
            done: !1,
            from: new K(...Sn),
            to: new K(...Mn)
        });
    return c.useEffect(() => {
        n.current.done || e.position.copy(n.current.from)
    }
        , [e]),
        Mt((a, r) => {
            const o = n.current;
            if (o.done)
                return;
            if (!Gt.started) {
                e.position.copy(o.from);
                return
            }
            o.t += $t(r);
            const i = Math.min(1, o.t / An)
                , s = 1 - Math.pow(1 - i, 3);
            e.position.lerpVectors(o.from, o.to, s),
                i >= 1 && (o.done = !0,
                    t == null || t())
        }
            , -2),
        null
}
function ia({ onDone: t }) {
    const e = vt(a => a.camera)
        , n = c.useRef({
            done: !1,
            from: null,
            to: new K(...Tn),
            lookFrom: new K(0, 0, 0),
            lookTo: new K(...Dt),
            look: new K
        });
    return Mt(() => {
        const a = n.current;
        if (a.done)
            return;
        a.from || (a.from = e.position.clone());
        const r = nn()
            , o = r * r * r * (r * (r * 6 - 15) + 10);
        e.position.lerpVectors(a.from, a.to, o),
            a.look.lerpVectors(a.lookFrom, a.lookTo, o),
            e.lookAt(a.look),
            r >= 1 && (a.done = !0,
                e.position.copy(a.to),
                e.lookAt(a.lookTo),
                t == null || t())
    }
        , -2),
        null
}
const Le = 12
    , sa = 7
    , ca = 26
    , je = .55
    , Fe = .12
    , Ie = t => t * 180 / Math.PI
    , Ne = (t, e) => e * Math.tanh(t / e);
function la({ imgRef: t, active: e }) {
    const n = vt(s => s.camera)
        , a = c.useMemo(() => new K(...Dt), [])
        , r = c.useMemo(() => new K, [])
        , o = c.useRef(null)
        , i = c.useRef({
            yaw: 0,
            pitch: 0
        });
    return Mt(() => {
        const s = t == null ? void 0 : t.current;
        if (!s)
            return;
        if (!e) {
            o.current && (o.current = null,
                s.style.transform = "");
            return
        }
        r.subVectors(n.position, a);
        const f = r.length() || 1
            , l = Math.atan2(r.x, r.z)
            , p = Math.asin(At.clamp(r.y / f, -1, 1));
        o.current || (o.current = {
            az: l,
            el: p
        });
        let g = l - o.current.az;
        for (; g > Math.PI;)
            g -= Math.PI * 2;
        for (; g < -Math.PI;)
            g += Math.PI * 2;
        const d = p - o.current.el
            , m = Ne(-Ie(g) * je, Le)
            , h = Ne(Ie(d) * je, sa);
        i.current.yaw += (m - i.current.yaw) * Fe,
            i.current.pitch += (h - i.current.pitch) * Fe;
        const x = i.current.yaw / Le * ca;
        s.style.transform = `translateX(${x.toFixed(2)}px) rotateY(${i.current.yaw.toFixed(2)}deg) rotateX(${i.current.pitch.toFixed(2)}deg)`
    }
    ),
        null
}
const Ct = {
    seed: 20260915,
    shape: {
        width: 21,
        aspect: 1.25,
        thicknessRatio: .32,
        notch: .15,
        lobe: .72
    },
    particles: {
        countDesktop: 22e3,
        countMobile: 1e4,
        innerRatio: .02,
        baseSize: .36,
        sizeJitter: .5,
        sparkRatio: .015,
        sparkSize: 1.8,
        maxPixelSize: 9,
        opacity: 1,
        gain: 1.7,
        densityNoise: {
            freq: .18,
            min: .55
        },
        brightJitter: .18
    },
    colors: {
        champagne: "#FFD58A",
        amber: "#FFB454",
        coral: "#FF756D",
        warmRed: "#D94B58",
        rim: "#FFE7B0",
        hueJitter: .025,
        coralBoost: 1.32
    },
    lighting: {
        keyDir: [-.6, .72, .45],
        fillDir: [.75, -.1, .55],
        ambient: .42,
        key: .7,
        fill: .22,
        backDim: .3,
        rim: .35,
        rimPower: 3,
        innerDim: .4
    },
    motion: {
        breathAmp: .015,
        breathSpeed: 1.25,
        wobbleAmp: .05,
        twinkleSpeed: 2.6,
        swayDeg: 8,
        swaySpeed: .18
    },
    orbit: {
        radiusX: .92,
        radiusZ: .4,
        tiltDeg: 26,
        rollDeg: -6,
        dustCount: {
            desktop: 3200,
            mobile: 1600
        },
        dustSize: .46,
        dustColor: "#FFD98A",
        dustOpacity: .8,
        sparkRatio: .03,
        speed: .09,
        thickness: .09,
        radialSpread: .16,
        yOffset: -.36
    }
};
function rn(t) {
    let e = t >>> 0;
    return function () {
        e = e + 1831565813 >>> 0;
        let n = e;
        return n = Math.imul(n ^ n >>> 15, n | 1),
            n ^= n + Math.imul(n ^ n >>> 7, n | 61),
            ((n ^ n >>> 14) >>> 0) / 4294967296
    }
}
function sn() {
    const e = new URLSearchParams(location.search).get("quality");
    if (e === "low" || e === "high")
        return e === "low" ? "mobile" : "desktop";
    const n = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        , a = Math.min(innerWidth, innerHeight) < 700
        , r = (navigator.hardwareConcurrency || 8) <= 4;
    return n || a || r ? "mobile" : "desktop"
}
function ua(t) {
    const e = (a, r, o) => {
        let i = Math.imul(a, 374761393) + Math.imul(r, 668265263) + Math.imul(o, 1274126177) + Math.imul(t | 0, 97) | 0;
        return i = Math.imul(i ^ i >>> 13, 1103515245),
            i = (i ^ i >>> 16) >>> 0,
            i / 4294967296
    }
        , n = a => a * a * (3 - 2 * a);
    return (a, r, o) => {
        const i = Math.floor(a)
            , s = Math.floor(r)
            , f = Math.floor(o)
            , l = n(a - i)
            , p = n(r - s)
            , g = n(o - f);
        let d = 0;
        for (let m = 0; m <= 1; m++)
            for (let h = 0; h <= 1; h++)
                for (let x = 0; x <= 1; x++)
                    d += (x ? l : 1 - l) * (h ? p : 1 - p) * (m ? g : 1 - g) * e(i + x, s + h, f + m);
        return d
    }
}
function fa(t, e, n, a = .22, r = 1) {
    if (a > 0 && n > 0) {
        const s = Math.min(1, n / .7);
        n += a * Math.exp(-(t * t) / (.42 * .42)) * s * s
    }
    const o = t * t + 2.25 * e * e + n * n - 1;
    return o * o * o - r * (t * t + .1125 * e * e) * n * n * n
}
function* da(t, e = Ct) {
    const n = e.shape
        , a = e.particles
        , r = rn(e.seed)
        , o = n.notch ?? .22
        , i = n.lobe ?? 1
        , s = ua(e.seed)
        , f = a.densityNoise || {
            freq: 0,
            min: 1
        }
        , l = 1.3
        , p = -1.15
        , g = 1.3
        , d = .75
        , m = .001
        , h = .035
        , x = (k, H, X) => fa(k, H, X, o, i)
        , b = new K
        , v = (k, H, X, V) => (b.set((x(k + m, H, X) - V) / m, (x(k, H + m, X) - V) / m, (x(k, H, X + m) - V) / m),
            b)
        , M = Math.round(t * a.innerRatio)
        , C = t - M
        , w = new Float32Array(t * 3)
        , A = new Float32Array(t * 3)
        , N = new Float32Array(t);
    let E = 0
        , P = 0;
    for (; E < C && P < C * 400;) {
        P++,
            P & 255 || (yield);
        let k = (r() * 2 - 1) * l
            , H = (r() * 2 - 1) * d
            , X = p + r() * (g - p)
            , V = x(k, H, X)
            , U = v(k, H, X, V)
            , Y = U.length() + 1e-6;
        if (!(Math.abs(V / Y) > h)) {
            for (let Z = 0; Z < 3; Z++) {
                const J = V / (Y * Y);
                k -= J * U.x,
                    H -= J * U.y,
                    X -= J * U.z,
                    V = x(k, H, X),
                    U = v(k, H, X, V),
                    Y = U.length() + 1e-6
            }
            if (!(Math.abs(V / Y) > .005)) {
                if (f.freq > 0) {
                    const Z = s(k * f.freq * 10 + 7.1, X * f.freq * 10 + 3.3, H * f.freq * 10 + 5.7);
                    if (r() > f.min + (1 - f.min) * Z)
                        continue
                }
                w.set([k, X, H], E * 3),
                    A.set([U.x / Y, U.z / Y, U.y / Y], E * 3),
                    E++
            }
        }
    }
    const F = E;
    let I = 0;
    for (P = 0; I < M && P < M * 400;) {
        P++,
            P & 255 || (yield);
        const k = (r() * 2 - 1) * l
            , H = (r() * 2 - 1) * d
            , X = p + r() * (g - p)
            , V = x(k, H, X);
        if (V >= 0)
            continue;
        const U = v(k, H, X, V)
            , Y = U.length() + 1e-6;
        if (V / Y > -.05)
            continue;
        const J = F + I;
        w.set([k, X, H], J * 3),
            A.set([U.x / Y, U.z / Y, U.y / Y], J * 3),
            N[J] = 1,
            I++
    }
    const O = F + I
        , S = new Ae
        , T = new K;
    for (let k = 0; k < F; k++)
        S.expandByPoint(T.fromArray(w, k * 3));
    const z = new K
        , D = new K;
    S.getSize(z),
        S.getCenter(D);
    const lt = n.width / z.x
        , dt = n.width / n.aspect / z.y
        , $ = n.width * n.thicknessRatio / z.z
        , q = new K;
    for (let k = 0; k < O; k++)
        w[k * 3] = (w[k * 3] - D.x) * lt,
            w[k * 3 + 1] = (w[k * 3 + 1] - D.y) * dt,
            w[k * 3 + 2] = (w[k * 3 + 2] - D.z) * $,
            q.fromArray(A, k * 3),
            q.set(q.x / lt, q.y / dt, q.z / $).normalize(),
            A.set([q.x, q.y, q.z], k * 3);
    const G = new Ae(new K(-n.width / 2, -(n.width / n.aspect) / 2, -(n.width * n.thicknessRatio) / 2), new K(n.width / 2, n.width / n.aspect / 2, n.width * n.thicknessRatio / 2));
    return {
        count: O,
        positions: w.subarray(0, O * 3),
        normals: A.subarray(0, O * 3),
        inner: N.subarray(0, O),
        rng: r,
        box: G
    }
}
const ha = `
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpark;
  attribute float aInner;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSizeScale;
  uniform float uMaxSize;
  uniform float uBreathAmp;
  uniform float uBreathSpeed;
  uniform float uWobble;
  uniform float uPulse;
  varying vec3 vColor;
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  varying float vSpark;
  varying float vPhase;
  varying float vInner;
  void main() {
    float breath = 1.0 + uBreathAmp * sin(uTime * uBreathSpeed) + uPulse;
    vec3 p = position * breath;
    p += normal * (uWobble * sin(uTime * 1.7 + aPhase * 6.2831));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float sizePx = aSize * uSizeScale * uPixelRatio * (320.0 / -mv.z);
    gl_PointSize = clamp(sizePx, 1.2, uMaxSize * uPixelRatio);
    vColor = aColor;
    vNormalV = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    vSpark = aSpark;
    vPhase = aPhase;
    vInner = aInner;
  }
`
    , ma = `
  uniform float uTime;
  uniform vec3 uLightDir;
  uniform vec3 uFillDir;
  uniform float uAmbient;
  uniform float uKey;
  uniform float uFill;
  uniform float uBackDim;
  uniform float uRim;
  uniform float uRimPower;
  uniform vec3 uRimColor;
  uniform float uInnerDim;
  uniform float uOpacity;
  uniform float uGain;
  uniform float uTwinkleSpeed;
  uniform float uPulse;
  varying vec3 vColor;
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  varying float vSpark;
  varying float vPhase;
  varying float vInner;
  void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float d2 = dot(uv, uv);
    if (d2 > 1.0) discard;
    float r = sqrt(d2);
    float core = exp(-d2 * 10.0);
    float halo = pow(1.0 - r, 3.0);
    float shapeA = core * 0.9 + halo * 0.3;

    vec3 N = normalize(vNormalV);
    vec3 L = normalize(uLightDir);
    vec3 V = normalize(vViewDir);
    float ndl = dot(N, L);
    float wrap = clamp((ndl + 0.4) / 1.4, 0.0, 1.0);
    float fill = clamp(dot(N, normalize(uFillDir)), 0.0, 1.0);
    float diffuse = uAmbient + uKey * wrap + uFill * fill;
    float facing = dot(N, V);
    float back = mix(uBackDim, 1.0, smoothstep(-0.5, 0.3, facing));
    float fres = pow(1.0 - clamp(facing, 0.0, 1.0), uRimPower);
    float rim = fres * uRim * (0.45 + 0.55 * wrap);
    vec3 H = normalize(L + V);
    float specular = pow(max(dot(N, H), 0.0), 28.0) * (0.12 + vSpark * 0.25) * wrap;

    vec3 col = vColor * diffuse * back + uRimColor * (rim + specular);
    col *= mix(1.0, uInnerDim, vInner);
    float tw = 1.0 + vSpark * (0.35 * sin(uTime * uTwinkleSpeed + vPhase * 6.2831) + 0.2);
    col *= tw;
    col *= uGain;
    col *= 1.0 + uPulse * 6.0;

    float alpha = shapeA * uOpacity * (1.0 + vSpark * 0.25);
    gl_FragColor = vec4(col, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;
function pa() {
    return new Promise(t => {
        let e = !1;
        const n = () => {
            e || (e = !0,
                t())
        }
            ;
        requestAnimationFrame(n),
            setTimeout(n, 50)
    }
    )
}
async function ga(t, e = Ct, n = 4) {
    const a = da(t, e);
    let r = a.next()
        , o = 0;
    for (; !r.done;) {
        const i = performance.now();
        for (; !r.done && performance.now() - i < n;)
            r = a.next();
        r.done || (o++,
            await pa())
    }
    return {
        ...r.value,
        soLo: o
    }
}
function wa(t, e = Ct, n = 1) {
    const { count: a, positions: r, normals: o, inner: i, rng: s, box: f } = t
        , l = f.max.x - f.min.x
        , p = f.max.y - f.min.y
        , g = e.colors
        , d = new rt(g.champagne)
        , m = new rt(g.amber)
        , h = new rt(g.coral)
        , x = new rt(g.warmRed)
        , b = new rt
        , v = {
            h: 0,
            s: 0,
            l: 0
        }
        , M = At.clamp
        , C = new Float32Array(a * 3)
        , w = new Float32Array(a)
        , A = new Float32Array(a)
        , N = new Float32Array(a)
        , E = e.particles;
    for (let T = 0; T < a; T++) {
        const z = r[T * 3]
            , D = r[T * 3 + 1]
            , lt = M((z - f.min.x) / l, 0, 1)
            , dt = M((D - f.min.y) / p, 0, 1);
        let $ = M(.58 * lt + .42 * (1 - dt), 0, 1);
        $ = $ * $ * (3 - 2 * $),
            $ < .32 ? b.copy(d).lerp(m, $ / .32) : $ < .64 ? b.copy(m).lerp(h, ($ - .32) / .32) : b.copy(h).lerp(x, ($ - .64) / .36 * .7);
        const q = g.coralBoost || 1;
        $ > .45 && b.multiplyScalar(1 + (q - 1) * Math.min(1, ($ - .45) / .3)),
            b.getHSL(v),
            b.setHSL(v.h + (s() - .5) * g.hueJitter, v.s, M(v.l + (s() - .5) * .06, 0, 1));
        const G = 1 + (s() - .5) * 2 * (E.brightJitter || 0);
        C.set([b.r * G, b.g * G, b.b * G], T * 3);
        const k = s() < E.sparkRatio ? 1 : 0;
        N[T] = k,
            w[T] = E.baseSize * (1 + (s() * 2 - 1) * E.sizeJitter) * (k ? E.sparkSize : 1),
            A[T] = s()
    }
    const P = new We;
    P.setAttribute("position", new tt(r, 3)),
        P.setAttribute("normal", new tt(o, 3)),
        P.setAttribute("aColor", new tt(C, 3)),
        P.setAttribute("aSize", new tt(w, 1)),
        P.setAttribute("aPhase", new tt(A, 1)),
        P.setAttribute("aSpark", new tt(N, 1)),
        P.setAttribute("aInner", new tt(i, 1)),
        P.boundingBox = f.clone(),
        P.computeBoundingSphere();
    const F = e.lighting
        , I = e.motion
        , O = new Ke({
            vertexShader: ha,
            fragmentShader: ma,
            transparent: !0,
            depthTest: !0,
            depthWrite: !1,
            blending: fe,
            uniforms: {
                uTime: {
                    value: 0
                },
                uPixelRatio: {
                    value: n
                },
                uSizeScale: {
                    value: 1
                },
                uMaxSize: {
                    value: E.maxPixelSize
                },
                uBreathAmp: {
                    value: I.breathAmp
                },
                uBreathSpeed: {
                    value: I.breathSpeed
                },
                uWobble: {
                    value: I.wobbleAmp
                },
                uPulse: {
                    value: 0
                },
                uLightDir: {
                    value: new K(...F.keyDir).normalize()
                },
                uFillDir: {
                    value: new K(...F.fillDir).normalize()
                },
                uAmbient: {
                    value: F.ambient
                },
                uKey: {
                    value: F.key
                },
                uFill: {
                    value: F.fill ?? 0
                },
                uBackDim: {
                    value: F.backDim
                },
                uRim: {
                    value: F.rim
                },
                uRimPower: {
                    value: F.rimPower
                },
                uRimColor: {
                    value: new rt(g.rim)
                },
                uInnerDim: {
                    value: F.innerDim
                },
                uOpacity: {
                    value: 0
                },
                uGain: {
                    value: E.gain ?? 1
                },
                uTwinkleSpeed: {
                    value: I.twinkleSpeed
                }
            }
        })
        , S = new qe(P, O);
    return S.frustumCulled = !1,
        S.name = "heartParticles",
        S
}
const xa = `
  attribute float aAngle;
  attribute float aRadial;
  attribute float aLift;
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uRx;
  uniform float uRz;
  uniform float uPixelRatio;
  uniform float uSizeScale;
  varying float vFade;
  void main() {
    float ang = aAngle + uTime * uSpeed;
    vec3 p = vec3(cos(ang) * uRx * aRadial, aLift, sin(ang) * uRz * aRadial);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp(aSize * uSizeScale * uPixelRatio * (320.0 / -mv.z), 1.0, 10.0 * uPixelRatio);
    float spark = step(2.0, aPhase);
    vFade = mix(0.5 + 0.35 * sin(uTime * 1.3 + aPhase * 6.2831), 1.3 + 0.3 * sin(uTime * 2.1 + aPhase * 6.2831), spark);
  }
`
    , ya = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vFade;
  void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float d2 = dot(uv, uv);
    if (d2 > 1.0) discard;
    float a = pow(1.0 - sqrt(d2), 2.0) * uOpacity * vFade;
    gl_FragColor = vec4(uColor, a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;
function ba(t, e, n = Ct, a = 1) {
    const r = n.orbit
        , o = rn(n.seed ^ 1540483477)
        , i = e === "mobile" ? r.dustCount.mobile : r.dustCount.desktop
        , s = new Float32Array(i)
        , f = new Float32Array(i)
        , l = new Float32Array(i)
        , p = new Float32Array(i)
        , g = new Float32Array(i)
        , d = new Float32Array(i * 3)
        , m = r.thickness * t;
    for (let w = 0; w < i; w++) {
        s[w] = o() * Math.PI * 2,
            f[w] = 1 + (o() - .5) * (r.radialSpread || .1),
            l[w] = (o() - .5) * m;
        const A = o() < (r.sparkRatio || 0);
        p[w] = r.dustSize * (.45 + o() * .9) * (A ? 2.2 : 1),
            g[w] = A ? 2 + o() : o()
    }
    const h = new We;
    h.setAttribute("position", new tt(d, 3)),
        h.setAttribute("aAngle", new tt(s, 1)),
        h.setAttribute("aRadial", new tt(f, 1)),
        h.setAttribute("aLift", new tt(l, 1)),
        h.setAttribute("aSize", new tt(p, 1)),
        h.setAttribute("aPhase", new tt(g, 1));
    const x = r.radiusX * t
        , b = r.radiusZ * t;
    h.boundingSphere = new Dn(new K, Math.max(x, b) * 1.2);
    const v = new Ke({
        vertexShader: xa,
        fragmentShader: ya,
        transparent: !0,
        depthWrite: !1,
        depthTest: !0,
        blending: fe,
        uniforms: {
            uTime: {
                value: 0
            },
            uSpeed: {
                value: r.speed
            },
            uRx: {
                value: x
            },
            uRz: {
                value: b
            },
            uPixelRatio: {
                value: a
            },
            uSizeScale: {
                value: 1
            },
            uColor: {
                value: new rt(r.dustColor)
            },
            uOpacity: {
                value: 0
            }
        }
    })
        , M = new qe(h, v);
    M.frustumCulled = !1,
        M.name = "orbitDust";
    const C = new ne;
    return C.name = "orbit",
        C.rotation.x = At.degToRad(r.tiltDeg),
        C.rotation.z = At.degToRad(r.rollDeg),
        C.position.y = r.yOffset * t,
        C.add(M),
        C.userData.dust = M,
        C
}
function va(t, e, n, a, r) {
    const o = wa(t, a, n)
        , i = a.shape.width
        , s = ba(i, e, a, n)
        , f = new ne;
    f.name = "heartGroup",
        f.add(o);
    const l = new ne;
    l.name = "heartGalaxy",
        l.add(f, s);
    const p = At.degToRad(a.motion.swayDeg)
        , g = o.material.uniforms
        , d = s.userData.dust.material.uniforms;
    return console.log(`Trái tim: ${t.count} hạt, chất lượng ${e}, dựng trong ${(performance.now() - r).toFixed(0)} ms` + (t.soLo ? ` chia thành ${t.soLo} lô` : " một hơi")),
    {
        group: l,
        heartPoints: o,
        orbit: s,
        heartWidth: i,
        quality: e,
        update(m, h = 1, x = 0, b) {
            b && (g.uPixelRatio.value = b,
                d.uPixelRatio.value = b),
                g.uTime.value = m,
                g.uPulse.value = x,
                g.uOpacity.value = a.particles.opacity * h,
                f.rotation.y = Math.sin(m * a.motion.swaySpeed) * p,
                d.uTime.value = m,
                d.uOpacity.value = a.orbit.dustOpacity * h
        },
        dispose() {
            l.traverse(m => {
                var h, x, b, v;
                (x = (h = m.geometry) == null ? void 0 : h.dispose) == null || x.call(h),
                    (v = (b = m.material) == null ? void 0 : b.dispose) == null || v.call(b)
            }
            )
        }
    }
}
function Ma(t, e) {
    return t === "mobile" ? e.particles.countMobile : e.particles.countDesktop
}
async function Sa({ quality: t = sn(), pixelRatio: e = 1, cfg: n = Ct } = {}) {
    const a = performance.now()
        , r = await ga(Ma(t, n), n);
    return va(r, t, e, n, a)
}
let Nt = null
    , jt = null;
function cn(t) {
    return Nt ? Promise.resolve(Nt) : (jt || (jt = Sa({
        quality: sn(),
        pixelRatio: t || 1
    }).then(e => (Nt = e,
        e)).catch(e => (console.error("Không dựng được trái tim:", e),
            jt = null,
            null))),
        jt)
}
function Ta() {
    const t = Math.min(window.devicePixelRatio || 1, 2)
        , e = () => cn(t);
    setTimeout(() => {
        typeof requestIdleCallback == "function" ? requestIdleCallback(e, {
            timeout: 2e3
        }) : e()
    }
        , 1500)
}
function Aa() {
    const t = vt(r => r.gl)
        , [e, n] = c.useState(Nt);
    c.useEffect(() => {
        if (e)
            return;
        let r = !0;
        return cn(t.getPixelRatio()).then(o => {
            r && o && n(o)
        }
        ),
            () => {
                r = !1
            }
    }
        , [e, t]);
    const a = c.useMemo(() => t.getPixelRatio(), [t]);
    return Mt(r => {
        if (!e)
            return;
        const o = an((nn() - ve) / (1 - ve));
        e.update(r.clock.elapsedTime, o, 0, a)
    }
    ),
        e ? u.jsx("primitive", {
            object: e.group,
            position: kn,
            scale: [qt, qt, qt]
        }) : null
}
const ln = 0
    , un = 1
    , ka = 2
    , ze = 2.5
    , yt = []
    , Jt = new rt
    , De = new rt;
function he(t) {
    return yt.push(t),
        () => {
            const e = yt.indexOf(t);
            e >= 0 && yt.splice(e, 1)
        }
}
function Ca(t, e) {
    if (!Gt.started || yt.length === 0)
        return;
    const n = $t(e)
        , a = ea()
        , r = !_.noColorCycle;
    if (r) {
        const o = (Math.sin(t / ze) + 1) / 2;
        De.lerpColors(re, ie, o)
    }
    for (let o = 0; o < yt.length; o++) {
        const i = yt[o]
            , s = i.ref.current;
        if (s)
            if (i.y = oa(i.y, i.speed * a, n),
                s.position.y = i.y,
                i.kind === ln) {
                const f = t + i.phase;
                s.position.x = i.startX + Ee(f, .45, i.phase * 3.1);
                const l = i.matRef.current;
                if (l && (l.opacity = Re(i.y),
                    r)) {
                    const p = (Math.sin(f / ze) + 1) / 2;
                    Jt.lerpColors(re, ie, p),
                        l.color.set(Jt),
                        l.emissive && l.emissive.set(Jt)
                }
            } else if (i.kind === un) {
                s.position.x = i.startX + Ee(t, i.amp, i.phase),
                    s.rotation.z = Math.cos(t * .55 + i.phase) * .04;
                const f = i.matRef.current;
                f && (f.opacity = Re(i.y),
                    r && f.emissive.set(De))
            } else
                i.t += n,
                    s.position.x = i.startX + Math.sin(i.t * .6) * i.amp,
                    s.rotation.z = Math.sin(i.t * .8 + 1) * .12
    }
}
const Qt = new Map;
function Pa(t) {
    if (Qt.has(t.url))
        return Qt.get(t.url);
    const e = new Promise((n, a) => {
        const r = new Image;
        r.onload = () => {
            const o = t.crop
                , s = Math.min(1, 512 / Math.max(o.w, o.h))
                , f = document.createElement("canvas");
            f.width = Math.round(o.w * s),
                f.height = Math.round(o.h * s),
                f.getContext("2d").drawImage(r, o.x, o.y, o.w, o.h, 0, 0, f.width, f.height);
            const l = new Ue(f);
            l.colorSpace = Ze,
                l.generateMipmaps = !0,
                l.minFilter = Je,
                l.magFilter = ae,
                n(l)
        }
            ,
            r.onerror = () => a(new Error("Không tải được " + t.url)),
            r.src = t.url
    }
    );
    return Qt.set(t.url, e),
        e
}
function Ra({ def: t, startX: e, startZ: n, speed: a, size: r, swayAmp: o, phase: i }) {
    const s = c.useRef()
        , [f, l] = c.useState(null);
    c.useEffect(() => {
        let h = !0;
        return Pa(t).then(x => {
            h && l(x)
        }
        ).catch(x => console.error(x)),
            () => {
                h = !1
            }
    }
        , [t]);
    const p = c.useMemo(() => on(), [])
        , g = t.crop.w / t.crop.h
        , d = r * g
        , m = r;
    return c.useEffect(() => he({
        kind: ka,
        ref: s,
        matRef: {
            current: null
        },
        y: p,
        t: i,
        startX: e,
        speed: a,
        amp: o
    }), [p, i, e, a, o]),
        f ? u.jsxs("mesh", {
            ref: s,
            position: [e, p, n],
            children: [u.jsx("planeGeometry", {
                args: [d, m]
            }), u.jsx("meshStandardMaterial", {
                map: f,
                emissiveMap: f,
                emissive: t.emissive || "#ffb347",
                emissiveIntensity: t.emissiveIntensity ?? .9,
                toneMapped: !1,
                transparent: !0,
                alphaTest: .05,
                depthWrite: !1,
                side: _t,
                metalness: 0,
                roughness: .8
            })]
        }) : null
}
function Ea() {
    return c.useMemo(() => {
        const e = [];
        for (let n = 0; n < _.lanternCount; n++) {
            const a = Me[n % Me.length];
            e.push({
                key: "lantern-" + n,
                def: a,
                startX: -32 + (n + .5) * (64 / _.lanternCount) + (Math.random() - .5) * 6,
                startZ: -12 + Math.random() * 26,
                speed: (3 + Math.random() * 3) * (a.speedMul || 1),
                size: (3.2 + Math.random() * 2.8) * (a.scale || 1),
                swayAmp: .8 + Math.random() * 1.6,
                phase: Math.random() * 20
            })
        }
        return e
    }
        , []).map(({ key: e, ...n }) => u.jsx(Ra, {
            ...n
        }, e))
}
const te = new Map;
function La(t, e, n, a) {
    t.beginPath(),
        t.moveTo(a, 0),
        t.lineTo(e - a, 0),
        t.quadraticCurveTo(e, 0, e, a),
        t.lineTo(e, n - a),
        t.quadraticCurveTo(e, n, e - a, n),
        t.lineTo(a, n),
        t.quadraticCurveTo(0, n, 0, n - a),
        t.lineTo(0, a),
        t.quadraticCurveTo(0, 0, a, 0),
        t.closePath()
}
function ja(t, e) {
    const n = `${t}@${_.imgMax}`;
    if (te.has(n))
        return te.get(n);
    const a = new Promise((r, o) => {
        const i = new Image;
        i.crossOrigin = "Anonymous",
            i.onload = () => {
                const s = document.createElement("canvas")
                    , f = s.getContext("2d")
                    , l = _.imgMax;
                let p = i.width
                    , g = i.height;
                (p > l || g > l) && (p > g ? (g = Math.floor(g / p * l),
                    p = l) : (p = Math.floor(p / g * l),
                        g = l)),
                    s.width = p,
                    s.height = g,
                    La(f, p, g, p * .05),
                    f.clip(),
                    f.drawImage(i, 0, 0, p, g);
                const d = new Ue(s);
                _.imgFix ? (d.colorSpace = Ze,
                    d.generateMipmaps = !0,
                    d.minFilter = Je,
                    d.magFilter = ae,
                    d.anisotropy = e != null && e.capabilities ? e.capabilities.getMaxAnisotropy() : 1) : (d.generateMipmaps = !1,
                        d.minFilter = ae),
                    r(d)
            }
            ,
            i.onerror = () => o(new Error("Không tải được ảnh: " + t)),
            i.src = t
    }
    );
    return te.set(n, a),
        a
}
function Fa({ imageUrl: t, startX: e, startZ: n, speed: a }) {
    const r = c.useRef()
        , o = c.useRef()
        , [i, s] = c.useState(null)
        , f = vt(m => m.gl);
    c.useEffect(() => {
        if (!t)
            return;
        let m = !0;
        return ja(t, f).then(h => {
            m && s(h)
        }
        ).catch(h => console.error(h)),
            () => {
                m = !1
            }
    }
        , [t, f]);
    const [l, p] = c.useMemo(() => {
        if (i != null && i.image) {
            const m = i.image.width / i.image.height
                , h = 10;
            return m > 1 ? [h, h / m] : [h * m, h]
        }
        return [3, 3]
    }
        , [i])
        , g = c.useMemo(() => on(), [])
        , d = c.useMemo(() => ({
            phase: Math.random() * Math.PI * 2,
            amp: .8 + Math.random() * .8
        }), []);
    return c.useEffect(() => he({
        kind: un,
        ref: r,
        matRef: o,
        y: g,
        startX: e,
        speed: a,
        phase: d.phase,
        amp: d.amp
    }), [g, e, a, d]),
        i ? u.jsxs("mesh", {
            ref: r,
            position: [e, g, n],
            children: [u.jsx("planeGeometry", {
                args: [l, p]
            }), u.jsx("meshStandardMaterial", {
                ref: o,
                map: i,
                emissiveMap: i,
                emissive: "#EE66A6",
                emissiveIntensity: _.imgGlow,
                toneMapped: !1,
                transparent: !0,
                side: _t,
                metalness: 0,
                roughness: .7
            })]
        }) : null
}
function Ia({ images: t }) {
    return c.useMemo(() => {
        if (!Array.isArray(t) || t.length === 0)
            return [];
        const n = [];
        let a = 0;
        for (let r = 0; r < 4; r++)
            for (let o = 0; o < 4; o++)
                n.push({
                    key: `image-${r}-${o}`,
                    imageUrl: t[a % t.length],
                    startX: (o - 1.5) * 18,
                    startZ: -10 + r * 10,
                    speed: 4 + Math.random() * 5
                }),
                    a++;
        return n
    }
        , [t]).map(({ key: n, ...a }) => u.jsx(Fa, {
            ...a
        }, n))
}
function Na({ text: t, startX: e, startY: n, startZ: a, speed: r, phase: o, color: i, font: s }) {
    const f = c.useRef()
        , l = c.useRef();
    c.useEffect(() => he({
        kind: ln,
        ref: f,
        matRef: l,
        y: n,
        startX: e,
        speed: r,
        phase: o
    }), [e, n, r, o]);
    const p = c.useMemo(() => {
        const g = t.split(/(\s+)/);
        let d = 0
            , m = "";
        return g.forEach(h => {
            h.trim().length > 0 && d++,
                m += h,
                d >= 8 && h.match(/\s+/) && (m = m.trimEnd() + `
`,
                    d = 0)
        }
        ),
            m.trim()
    }
        , [t]);
    return u.jsxs(En, {
        ref: f,
        font: s,
        fontSize: 1.5,
        letterSpacing: -.1,
        position: [e, n, a],
        anchorX: "center",
        anchorY: "middle",
        textAlign: "center",
        children: [p, _.textMaterial === "basic" ? u.jsx("meshBasicMaterial", {
            ref: l,
            color: i,
            toneMapped: !1,
            transparent: !0,
            side: _t
        }) : u.jsx("meshStandardMaterial", {
            ref: l,
            color: i,
            emissive: i,
            emissiveIntensity: 1.5,
            toneMapped: !1,
            transparent: !0,
            side: _t
        })]
    })
}
function za({ messages: t, color: e, fontName: n }) {
    return c.useMemo(() => {
        const r = (Array.isArray(t) ? t : []).map(Cn).filter(Boolean);
        if (r.length === 0)
            return [];
        const o = [];
        let i = 0;
        for (let s = 0; s < _.rows; s++)
            for (let f = 0; f < _.cols; f++) {
                const l = r[i % r.length]
                    , g = l.length > 20 ? 6 : 3;
                o.push({
                    key: `text-${s}-${f}`,
                    text: l,
                    startX: (f - (_.cols - 1) / 2) * g,
                    startY: ft + Math.random() * (bt - ft),
                    startZ: -10 + s * g * 1.5,
                    speed: 7 + Math.random() * 2,
                    phase: Math.random() * 2,
                    color: e ?? "#EE66A6",
                    font: n ? `./font/${n}.ttf` : "./assets/font/Mali.ttf"
                }),
                    i++
            }
        return o
    }
        , [t, e, n]).map(({ key: r, ...o }) => u.jsx(Na, {
            ...o
        }, r))
}
function Da() {
    return Mt((t, e) => Ca(t.clock.elapsedTime, e), -1),
        null
}
const _a = `
attribute float aSize;
attribute float aPhase;
attribute float aSpeed;
attribute vec3 aColor;
uniform float uTime;
uniform float uPixelRatio;
varying vec3 vColor;
varying float vTwinkle;
varying float vSize;
void main() {
    vColor = aColor;
    // Lấp lánh: hai sóng sin lệch pha, nâng bậc để đa số sao dịu, thi thoảng bừng sáng.
    float w = 0.5 + 0.5 * sin(uTime * aSpeed + aPhase);
    float w2 = 0.5 + 0.5 * sin(uTime * aSpeed * 1.7 + aPhase * 2.3);
    vTwinkle = 0.45 + 0.75 * pow(w * 0.7 + w2 * 0.3, 2.0);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float att = 260.0 / max(1.0, -mv.z);
    float size = aSize * uPixelRatio * (0.75 + 0.25 * vTwinkle) * att;
    vSize = size;
    gl_PointSize = clamp(size, 1.2 * uPixelRatio, 26.0 * uPixelRatio);
    gl_Position = projectionMatrix * mv;
}`
    , Oa = `
varying vec3 vColor;
varying float vTwinkle;
varying float vSize;
void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p);
    if (d > 0.5) discard;
    // Lõi sáng + quầng mờ
    float core = smoothstep(0.5, 0.0, d);
    core = core * core;
    float halo = exp(-d * d * 18.0) * 0.55;
    // Tia chữ thập nhẹ cho các sao lớn
    float cross = exp(-abs(p.x) * 40.0) * exp(-abs(p.y) * 6.0) + exp(-abs(p.y) * 40.0) * exp(-abs(p.x) * 6.0);
    cross *= smoothstep(6.0, 14.0, vSize) * 0.35;
    float a = (core + halo + cross) * vTwinkle;
    // Lõi ngả trắng ấm để sao vàng trông rực chứ không bệt
    vec3 col = mix(vColor, vec3(1.0, 0.98, 0.9), core * 0.5);
    gl_FragColor = vec4(col * a, a);
}`
    , _e = [[1, .84, .25], [1, .9, .45], [1, .95, .7], [1, .78, .2], [1, .93, .6], [1, .72, .3]];
function $a() {
    const t = c.useRef()
        , e = c.useRef()
        , n = vt(i => i.gl)
        , a = c.useMemo(() => {
            const i = _.starCount
                , s = new Float32Array(i * 3)
                , f = new Float32Array(i * 3)
                , l = new Float32Array(i)
                , p = new Float32Array(i)
                , g = new Float32Array(i);
            for (let d = 0; d < i; d++) {
                const m = Math.random() * 2 - 1
                    , h = Math.random() * Math.PI * 2
                    , x = 70 + Math.pow(Math.random(), .6) * 150
                    , b = Math.sqrt(1 - m * m);
                s[d * 3] = x * b * Math.cos(h),
                    s[d * 3 + 1] = x * m,
                    s[d * 3 + 2] = x * b * Math.sin(h);
                const v = _e[Math.floor(Math.random() * _e.length)];
                f[d * 3] = v[0],
                    f[d * 3 + 1] = v[1],
                    f[d * 3 + 2] = v[2];
                const M = Math.random();
                l[d] = M < .75 ? 1.2 + Math.random() * 1.3 : M < .94 ? 2.6 + Math.random() * 1.8 : 4.4 + Math.random() * 2.6,
                    p[d] = Math.random() * Math.PI * 2,
                    g[d] = .6 + Math.random() * 2.2
            }
            return {
                pos: s,
                col: f,
                size: l,
                phase: p,
                speed: g
            }
        }
            , [])
        , r = c.useMemo(() => ({
            uTime: {
                value: 0
            },
            uPixelRatio: {
                value: Math.min(n ? n.getPixelRatio() : 1, 2)
            }
        }), [n]);
    Mt((i, s) => {
        e.current && (e.current.uniforms.uTime.value = i.clock.elapsedTime),
            t.current && (t.current.position.copy(i.camera.position),
                t.current.rotation.y += $t(s) * .006,
                t.current.rotation.x += $t(s) * .0015)
    }
    );
    const o = _.starCount;
    return u.jsx("group", {
        ref: t,
        position: [-10, 0, 30],
        children: u.jsxs("points", {
            frustumCulled: !1,
            children: [u.jsxs("bufferGeometry", {
                children: [u.jsx("bufferAttribute", {
                    attach: "attributes-position",
                    array: a.pos,
                    count: o,
                    itemSize: 3
                }), u.jsx("bufferAttribute", {
                    attach: "attributes-aColor",
                    array: a.col,
                    count: o,
                    itemSize: 3
                }), u.jsx("bufferAttribute", {
                    attach: "attributes-aSize",
                    array: a.size,
                    count: o,
                    itemSize: 1
                }), u.jsx("bufferAttribute", {
                    attach: "attributes-aPhase",
                    array: a.phase,
                    count: o,
                    itemSize: 1
                }), u.jsx("bufferAttribute", {
                    attach: "attributes-aSpeed",
                    array: a.speed,
                    count: o,
                    itemSize: 1
                })]
            }), u.jsx("shaderMaterial", {
                ref: e,
                uniforms: r,
                vertexShader: _a,
                fragmentShader: Oa,
                transparent: !0,
                depthWrite: !1,
                depthTest: !0,
                blending: fe,
                toneMapped: !1
            })]
        })
    })
}
function Ba({ content: t, started: e, goHeartRef: n, onHeartBegin: a, coupleImgRef: r }) {
    const [o, i] = c.useState(e ? "run" : "wait")
        , [s, f] = c.useState(!1)
        , [l, p] = c.useState(!0)
        , g = c.useRef();
    c.useEffect(() => {
        aa()
    }
        , []);
    const d = c.useCallback(() => {
        if (!na())
            return;
        a == null || a(),
            i("exit");
        const h = setTimeout(() => p(!1), _.flySecs * Pn * 1e3)
            , x = setTimeout(() => i("heart"), _.flySecs * 1e3 + 150);
        return () => {
            clearTimeout(h),
                clearTimeout(x)
        }
    }
        , [a]);
    c.useEffect(() => {
        n && (n.current = d)
    }
        , [d, n]),
        c.useEffect(() => {
            !e || o !== "wait" || (Gt.started = !0,
                i("intro"))
        }
            , [e, o]);
    const m = o === "run" || o === "heart" && s;
    return u.jsxs(Ln, {
        style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "black"
        },
        camera: {
            position: [-10, 0, 30],
            fov: 100
        },
        dpr: _.dpr || [1, _.dprMax],
        gl: {
            antialias: _.antialias,
            powerPreference: "high-performance"
        },
        performance: {
            min: .6,
            max: 1,
            debounce: 250
        },
        children: [u.jsx(jn, {
            pixelated: !1
        }), u.jsx("color", {
            attach: "background",
            args: ["#000"]
        }), u.jsx("ambientLight", {
            intensity: 1
        }), u.jsx("pointLight", {
            position: [10, 10, 0],
            color: "#ff00ff",
            intensity: .5,
            distance: 20
        }), u.jsx(ra, {
            onDone: () => i("run")
        }), (o === "exit" || o === "heart") && !s ? u.jsx(ia, {
            onDone: () => {
                var x;
                const h = g.current;
                h != null && h.target && (h.target.set(...Dt),
                    (x = h.update) == null || x.call(h)),
                    f(!0)
            }
        }) : null, u.jsx(Da, {}), gt.has("particles") ? null : u.jsx($a, {}), u.jsx(la, {
            imgRef: r,
            active: o === "heart" && s
        }), gt.has("controls") ? null : u.jsx(Fn, {
            ref: g,
            enabled: m,
            target: o === "run" || o === "wait" || o === "intro" ? [0, 0, 0] : Dt,
            enableZoom: !0,
            enablePan: !0,
            enableRotate: !0,
            minDistance: 10,
            maxDistance: 50
        }), u.jsxs("group", {
            children: [l && !gt.has("images") ? u.jsx(Ia, {
                images: t.images
            }) : null, l && !gt.has("text") ? u.jsx(za, {
                messages: t.messages,
                color: t.color,
                fontName: t.fontName
            }) : null, l && !gt.has("lanterns") ? u.jsx(Ea, {}) : null, o === "exit" || o === "heart" ? u.jsx(Aa, {}, "heart-scene") : null]
        }), gt.has("bloom") ? null : u.jsx(Nn, {
            multisampling: _.multisampling,
            children: u.jsx(zn, {
                mipmapBlur: !1,
                intensity: _.bloomIntensity,
                luminanceThreshold: _.bloomThreshold,
                luminanceSmoothing: .5,
                height: _.bloomHeight,
                kernelSize: 4
            })
        })]
    })
}
const fn = "./assets/music/bongtrang.mp3"
    , Ga = .55
    , Ha = 3e3
    , Xa = 700;
let zt = fn
    , W = null
    , Ft = 0;
const ce = new Set;
function le() {
    for (const t of ce)
        t(pe())
}
function Ht() {
    return W || (W = new Audio(zt),
        W.loop = !0,
        W.preload = "auto",
        W.volume = 0,
        W.addEventListener("play", le),
        W.addEventListener("pause", le),
        W)
}
function Ya(t) {
    var a;
    const e = t && String(t).trim() || fn;
    if (e === zt || (zt = e,
        !W))
        return;
    const n = !W.paused;
    W.src = zt,
        W.load(),
        n && ((a = W.play()) == null || a.catch(() => { }
        ))
}
function Va() {
    Ht()
}
let Oe = !1
    , It = !1
    , me = !1;
function Wa() {
    if (Oe || It)
        return;
    It = !0;
    const t = Ht();
    t.volume = 0;
    const e = () => {
        me || (t.pause(),
            t.currentTime = 0),
            Oe = !0,
            It = !1
    }
        , n = t.play();
    n && typeof n.then == "function" ? n.then(e).catch(() => {
        It = !1
    }
    ) : e()
}
function pe() {
    return !!W && !W.paused
}
function Ka(t) {
    return ce.add(t),
        () => ce.delete(t)
}
const qa = 40;
function dn(t, e, n) {
    const a = Ht();
    clearInterval(Ft);
    const r = performance.now()
        , o = a.volume;
    Ft = setInterval(() => {
        const i = Math.min(1, (performance.now() - r) / e)
            , s = i * i * (3 - 2 * i);
        a.volume = o + (t - o) * s,
            i >= 1 && (clearInterval(Ft),
                Ft = 0,
                n == null || n())
    }
        , qa)
}
function ue() {
    var e;
    const t = Ht();
    t.paused && (me = !0,
        t.volume = 0,
        (e = t.play()) == null || e.catch(() => { }
        ),
        dn(Ga, Ha))
}
function Ua() {
    W && (me = !1,
        dn(0, Xa, () => {
            W.pause(),
                le()
        }
        ))
}
function Za() {
    pe() ? Ua() : ue()
}
function Ja({ visible: t, onOpenHeart: e, onOpenLetter: n, showHeart: a, showLetter: r }) {
    const [o, i] = c.useState(pe);
    return c.useEffect(() => Ka(i), []),
        t ? u.jsxs("div", {
            className: "topbar",
            children: [r ? u.jsx("button", {
                type: "button",
                className: "topbar-btn topbar-letter",
                onClick: n,
                title: "Mở lá thư",
                "aria-label": "Mở lá thư",
                children: u.jsx("img", {
                    src: "./assets/nguyet-thu/btn-letter.webp",
                    alt: "",
                    draggable: !1
                })
            }) : null, a ? u.jsx("button", {
                type: "button",
                className: "topbar-btn topbar-heart",
                onClick: e,
                title: "Mở trái tim",
                "aria-label": "Mở trái tim",
                children: u.jsx("img", {
                    src: "./assets/ui/btn-heart.webp",
                    alt: "",
                    draggable: !1
                })
            }) : null, u.jsx("button", {
                type: "button",
                className: "topbar-btn topbar-music",
                onClick: Za,
                title: o ? "Tắt nhạc" : "Bật nhạc",
                "aria-label": "Bật hoặc tắt nhạc",
                children: u.jsxs("svg", {
                    viewBox: "0 0 24 24",
                    width: "26",
                    height: "26",
                    fill: "none",
                    stroke: "#fff",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [u.jsx("path", {
                        d: "M11 5 6 9H2v6h4l5 4z"
                    }), o ? u.jsxs(u.Fragment, {
                        children: [u.jsx("path", {
                            d: "M15.5 8.5a5 5 0 0 1 0 7"
                        }), u.jsx("path", {
                            d: "M18.5 5.5a9 9 0 0 1 0 13"
                        })]
                    }) : u.jsxs(u.Fragment, {
                        children: [u.jsx("path", {
                            d: "m17 9 5 6"
                        }), u.jsx("path", {
                            d: "m22 9-5 6"
                        })]
                    })]
                })
            })]
        }) : null
}
const $e = {
    dangTai: {
        icon: "🌕",
        tieuDe: "Đang mở thiệp…",
        mo: "Chờ một chút, trăng đang lên."
    },
    expired: {
        icon: "🍂",
        tieuDe: "Thiệp này đã hết hạn",
        mo: "Người gửi có thể gia hạn để mở lại."
    },
    payment_required: {
        icon: "🏮",
        tieuDe: "Thiệp chưa được kích hoạt",
        mo: "Đơn hàng của thiệp này chưa hoàn tất thanh toán."
    },
    not_found: {
        icon: "🐰",
        tieuDe: "Không tìm thấy thiệp",
        mo: "Đường dẫn có thể đã sai hoặc thiệp đã bị gỡ."
    },
    loi: {
        icon: "☁️",
        tieuDe: "Không tải được thiệp",
        mo: "Kiểm tra kết nối rồi thử lại."
    }
};
function Be({ loai: t, thongDiep: e, onThuLai: n, linkTao: a }) {
    const r = $e[t] || $e.loi
        , o = t === "dangTai";
    return u.jsx("div", {
        className: o ? "mtb mtb-tai" : "mtb",
        role: o ? "status" : "alert",
        children: u.jsxs("div", {
            className: "mtb-hop",
            children: [u.jsx("div", {
                className: "mtb-icon",
                "aria-hidden": "true",
                children: r.icon
            }), u.jsx("h1", {
                className: "mtb-tieude",
                children: r.tieuDe
            }), u.jsx("p", {
                className: "mtb-mo",
                children: e || r.mo
            }), o ? null : u.jsxs("div", {
                className: "mtb-nut",
                children: [n ? u.jsx("button", {
                    type: "button",
                    className: "mtb-btn",
                    onClick: n,
                    children: "Thử lại"
                }) : null, a ? u.jsx("a", {
                    className: "mtb-btn mtb-btn-phu",
                    href: a,
                    children: "Tạo thiệp của bạn"
                }) : null]
            })]
        })
    })
}
const Ge = {
    messages: ["Iu em" ,"ILY","23/02", "iu nhất trên đời", "iu bé m55"],
    images: ["./assets/images/1.jpg", "./assets/images/2.jpg", "./assets/images/3.jpg"]
}
    , Qa = 20
    , to = 10;
function ee(t, e = "") {
    return typeof t == "string" ? t : e
}
function He(t, e) {
    return Array.isArray(t) ? t.filter(n => typeof n == "string" && n.trim()).map(n => n.trim()).slice(0, e) : []
}
function eo() {
    return {
        enableLetter: !0,
        enableHeart: !0,
        flyingTexts: Ge.messages.slice(),
        flyingImages: Ge.images.map(t => t.replace(/^\//, "")),
        couplePhoto: "./assets/couple/couple.webp",
        letter: {
            text: de.paragraphs.join(`
`)
        },
        bgMusic: "./assets/music/bongtrang.mp3",
        palette: "hong",
        showWatermark: !1
    }
}
function Xe(t) {
    var l;
    const e = t && typeof t == "object" ? t : {}
        , n = e.palette === "vang" ? "vang" : "hong"
        , a = He(e.flyingTexts, Qa)
        , r = He(e.flyingImages, to).map(Se)
        , o = Se(ee(e.couplePhoto))
        , i = ee((l = e.letter) == null ? void 0 : l.text).trim()
        , s = (e.enableLetter ?? !1) === !0 && i.length > 0
        , f = (e.enableHeart ?? !1) === !0 && o.length > 0;
    return {
        enableLetter: s,
        enableHeart: f,
        flyingTexts: a.length ? a : ["Trung thu vui vẻ"],
        flyingImages: r,
        couplePhoto: o,
        letter: {
            text: i
        },
        musicUrl: Te(e.bgMusic) || Te("./assets/music/bongtrang.mp3"),
        palette: n,
        color: mt[n].a,
        showWatermark: e.showWatermark === !0,
        websiteId: ee(e.websiteId),
        expiresAt: e.expiresAt ?? null
    }
}
const no = 800
    , ao = 3300
    , Ye = "/config.html"
    , oo = _.autostart || new URLSearchParams(location.search).get("demo") === "1";
function ro() {
    const [t, e] = c.useState({
        trangThai: "dangTai"
    })
        , [n, a] = c.useState(0);
    return c.useEffect(() => {
        let r = !0;
        return e({
            trangThai: "dangTai"
        }),
            Rn().then(o => {
                if (r) {
                    if (o.trangThai === "trong") {
                        e({
                            trangThai: "ok",
                            cauHinh: Xe(eo()),
                            diaChi: o.diaChi,
                            mau: !0
                        });
                        return
                    }
                    if (o.trangThai === "ok" || o.trangThai === "preview") {
                        e({
                            trangThai: "ok",
                            cauHinh: Xe(o.config),
                            diaChi: o.diaChi,
                            preview: o.trangThai === "preview"
                        });
                        return
                    }
                    e({
                        trangThai: o.trangThai,
                        thongDiep: o.thongDiep,
                        diaChi: o.diaChi
                    })
                }
            }
            ),
            () => {
                r = !1
            }
    }
        , [n]),
        t.trangThai === "dangTai" ? u.jsx(Be, {
            loai: "dangTai"
        }) : t.trangThai !== "ok" ? u.jsx(Be, {
            loai: t.trangThai,
            thongDiep: t.thongDiep,
            onThuLai: t.trangThai === "loi" ? () => a(r => r + 1) : null,
            linkTao: Ye
        }) : u.jsx(io, {
            cauHinh: t.cauHinh,
            diaChi: t.diaChi,
            preview: !!t.preview
        })
}
function io({ cauHinh: t, diaChi: e, preview: n }) {
    const a = n && (e == null ? void 0 : e.scene) || ""
        , r = _.autostart || !!a
        , [o, i] = c.useState(r)
        , [s, f] = c.useState(!1)
        , [l, p] = c.useState(!1)
        , g = c.useRef(null)
        , d = c.useRef(null);
    c.useMemo(() => {
        Qn(t.palette),
            Ya(t.musicUrl)
    }
        , [t]);
    const m = c.useMemo(() => ({
        fontName: "Mali",
        color: t.color,
        messages: t.flyingTexts,
        images: t.flyingImages
    }), [t])
        , h = c.useMemo(() => Qe(t.letter), [t]);
    c.useEffect(() => {
        Va();
        let w = 0;
        const A = () => {
            w && (clearTimeout(w),
                w = 0)
        }
            , N = E => {
                var P, F;
                Wa(),
                    (F = (P = E.target) == null ? void 0 : P.closest) != null && F.call(P, ".moon-hit") && (A(),
                        w = setTimeout(() => {
                            w = 0,
                                ue()
                        }
                            , no))
            }
            ;
        return window.addEventListener("pointerdown", N, !0),
            window.addEventListener("pointerup", A, !0),
            window.addEventListener("pointercancel", A, !0),
            () => {
                A(),
                    window.removeEventListener("pointerdown", N, !0),
                    window.removeEventListener("pointerup", A, !0),
                    window.removeEventListener("pointercancel", A, !0)
            }
    }
        , []);
    const x = c.useCallback(() => {
        Jn(),
            i(!0),
            ue(),
            t.enableHeart && Ta()
    }
        , [t.enableHeart]);
    c.useEffect(() => {
        if (!o)
            return;
        const w = window.matchMedia("(max-width: 767px)").matches
            , A = [];
        t.enableLetter && (A.push(w ? "./assets/nguyet-thu/paper-straight.webp" : "./assets/nguyet-thu/paper.webp"),
            A.push("./assets/nguyet-thu/rabbit-cloud.webp")),
            t.enableHeart && A.push("./assets/ui/btn-heart.webp", t.couplePhoto),
            A.filter(Boolean).forEach(N => {
                const E = new Image;
                E.src = N
            }
            )
    }
        , [o, t]);
    const b = c.useCallback(() => {
        f(!0),
            Pe(!0)
    }
        , [])
        , v = c.useCallback(() => {
            f(!1),
                Pe(!1)
        }
            , [])
        , M = c.useCallback(() => {
            var w;
            (w = g.current) == null || w.call(g),
                p(!0)
        }
            , []);
    c.useEffect(() => {
        if (!o || !a)
            return;
        const w = setTimeout(() => {
            a === "letter" && t.enableLetter ? b() : a === "heart" && t.enableHeart && M()
        }
            , ao);
        return () => clearTimeout(w)
    }
        , [o, a, t, b, M]),
        c.useEffect(() => {
            if (!n)
                return;
            const w = A => {
                A.origin === window.location.origin && (!A.data || A.data.type !== "loverain:doi-mau" || ta(A.data.palette))
            }
                ;
            return window.addEventListener("message", w),
                () => window.removeEventListener("message", w)
        }
            , [n]),
        c.useEffect(() => {
            if (!(!n || window.parent === window))
                try {
                    window.parent.postMessage({
                        type: "loverain:canh",
                        chuBay: o && !l
                    }, window.location.origin)
                } catch { }
        }
            , [n, o, l]);
    const C = !!(e != null && e.embed);
    return u.jsxs(u.Fragment, {
        children: [u.jsx(Ba, {
            content: m,
            started: o,
            goHeartRef: g,
            coupleImgRef: d
        }), t.enableHeart ? u.jsx("div", {
            id: "couple-wrap",
            className: l ? "on" : void 0,
            children: u.jsx("img", {
                id: "couple",
                ref: d,
                src: t.couplePhoto,
                alt: "",
                "aria-hidden": "true",
                draggable: !1
            })
        }) : null, u.jsx(Ja, {
            visible: o,
            showHeart: t.enableHeart && !l,
            showLetter: t.enableLetter,
            onOpenHeart: M,
            onOpenLetter: b
        }), t.enableLetter ? u.jsx(Zn, {
            open: s,
            onClose: v,
            onOpenHeart: M,
            showHeart: t.enableHeart && !l,
            noiDung: h
        }) : null, n && !C ? u.jsx("div", {
            className: "nhan-xemthu",
            children: "Chế độ xem thử"
        }) : null, t.showWatermark ? u.jsxs("a", {
            className: "dau-dlove",
            href: "https://dlove.vn",
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": "Tạo món quà của bạn tại DLove.vn",
            children: [u.jsx("img", {
                alt: "",
                width: "22",
                height: "24",
                draggable: !1
            }), u.jsx("span", {
                children: "DLove.vn"
            })]
        }) : null, u.jsx(Yn, {
            onStart: x,
            skip: r
        })]
    })
}
Ve() && document.documentElement.classList.add("giam-chuyen-dong");
In(document.getElementById("root")).render(u.jsx(c.StrictMode, {
    children: u.jsx(ro, {})
}));
