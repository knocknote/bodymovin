function PIXIShapeElement(t, e, r, i, s) {
    this.shapes = [],
    this.shapesData = t.shapes,
    this.stylesList = [],
    this.viewData = [],
    this.shapeModifiers = [],
    this._parent.constructor.call(this, t, e, r, i, s)
};

createElement(PIXIBaseElement, PIXIShapeElement);

PIXIShapeElement.prototype.lcEnum = {
    1: "butt",
    2: "round",
    3: "butt"
};
PIXIShapeElement.prototype.ljEnum = {
    1: "miter",
    2: "round",
    3: "butt"
};
PIXIShapeElement.prototype.buildExpressionInterface = function() {}

PIXIShapeElement.prototype.createElements = function() {
    this._parent.createElements.call(this),
    this.searchShapes(this.shapesData, this.viewData, this.layerElement, this.PLayerElement, this.dynamicProperties, 0),
    (!this.data.hd || this.data.td) && styleUnselectableDiv(this.layerElement)
};

PIXIShapeElement.prototype.setGradientData = function(t, e, r) {
    var i, s = "gr_" + randomString(10);
    i = 1 === e.t ? document.createElementNS(svgNS, "linearGradient") : document.createElementNS(svgNS, "radialGradient"),
    i.setAttribute("id", s),
    i.setAttribute("spreadMethod", "pad"),
    i.setAttribute("gradientUnits", "userSpaceOnUse");
    var n, a, o, h = [];
    for (o = 4 * e.g.p,
         a = 0; o > a; a += 4)
        n = document.createElementNS(svgNS, "stop"),
    i.appendChild(n),
    h.push(n);
    t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(#" + s + ")"),
    this.globalData.defs.appendChild(i),
    r.gf = i,
    r.cst = h
};

PIXIShapeElement.prototype.setGradientOpacity = function(t, e, r) {
    if (t.g.k.k[0].s && t.g.k.k[0].s.length > 4 * t.g.p || t.g.k.k.length > 4 * t.g.p) {
        var i, s, n, a, o = document.createElementNS(svgNS, "mask"), h = document.createElementNS(svgNS, "path");
        o.appendChild(h);
        var l = "op_" + randomString(10)
        , p = "mk_" + randomString(10);
        o.setAttribute("id", p),
        i = 1 === t.t ? document.createElementNS(svgNS, "linearGradient") : document.createElementNS(svgNS, "radialGradient"),
        i.setAttribute("id", l),
        i.setAttribute("spreadMethod", "pad"),
        i.setAttribute("gradientUnits", "userSpaceOnUse"),
        a = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
        var c = [];
        for (n = 4 * t.g.p; a > n; n += 2)
            s = document.createElementNS(svgNS, "stop"),
        s.setAttribute("stop-color", "rgb(255,255,255)"),
        i.appendChild(s),
        c.push(s);
        return h.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(#" + l + ")"),
        this.globalData.defs.appendChild(i),
        this.globalData.defs.appendChild(o),
        e.of = i,
        e.ost = c,
        r.msElem = h,
        p
    }
};

PIXIShapeElement.prototype.searchShapes = function(t, e, r, i, s, n) {
    var a, o, h, l, p, c = t.length - 1, u = [], d = [];
    for (a = c; a >= 0; a -= 1)
        if ("fl" == t[a].ty || "st" == t[a].ty || "gf" == t[a].ty || "gs" == t[a].ty) {
            e[a] = {},
            l = {
                type: t[a].ty,
                d: "",
                PD: [],
                ld: "",
                lvl: n,
                transformers: [],
                mdf: !1
            };
            var f = document.createElementNS(svgNS, "path")
            , m = new PIXI.Graphics;
            if (e[a].o = PropertyFactory.getProp(this, t[a].o, 0, .01, s),
                ("st" == t[a].ty || "gs" == t[a].ty) && (f.setAttribute("stroke-linecap", this.lcEnum[t[a].lc] || "round"),
                                                         f.setAttribute("stroke-linejoin", this.ljEnum[t[a].lj] || "round"),
                                                         f.setAttribute("fill-opacity", "0"),
                                                         1 == t[a].lj && f.setAttribute("stroke-miterlimit", t[a].ml),
                                                         e[a].w = PropertyFactory.getProp(this, t[a].w, 0, null, s),
                                                         t[a].d)) {
                var y = PropertyFactory.getDashProp(this, t[a].d, "svg", s);
                y.k || (f.setAttribute("stroke-dasharray", y.dasharray),
                        f.setAttribute("stroke-dashoffset", y.dashoffset)),
                e[a].d = y
            }
            if ("fl" == t[a].ty || "st" == t[a].ty)
                e[a].c = PropertyFactory.getProp(this, t[a].c, 1, 255, s),
            r.appendChild(f),
            i.addChild(m);
            else {
                e[a].g = PropertyFactory.getGradientProp(this, t[a].g, s),
                2 == t[a].t && (e[a].h = PropertyFactory.getProp(this, t[a].h, 1, .01, s),
                                e[a].a = PropertyFactory.getProp(this, t[a].a, 1, degToRads, s)),
                e[a].s = PropertyFactory.getProp(this, t[a].s, 1, null, s),
                e[a].e = PropertyFactory.getProp(this, t[a].e, 1, null, s),
                this.setGradientData(f, t[a], e[a], l);
                var g = this.setGradientOpacity(t[a], e[a], l);
                g && f.setAttribute("mask", "url(#" + g + ")"),
                e[a].elem = f,
                r.appendChild(f),
                i.addChild(m)
            }
            t[a].ln && f.setAttribute("id", t[a].ln),
            t[a].cl && f.setAttribute("class", t[a].cl),
            l.pElem = f,
            l.PPElem = m,
            this.stylesList.push(l),
            e[a].style = l,
            u.push(l)
        } else if ("gr" == t[a].ty) {
            e[a] = {
                it: []
            };
            var v = document.createElementNS(svgNS, "g");
            r.appendChild(v);
            var b = new PIXI.DisplayObjectContainer;
            i.addChild(b),
            e[a].PGr = b,
            e[a].gr = v,
            this.searchShapes(t[a].it, e[a].it, v, b, s, n + 1)
        } else if ("tr" == t[a].ty)
            for (e[a] = {
                transform: {
                    op: PropertyFactory.getProp(this, t[a].o, 0, .01, s),
                    mProps: PropertyFactory.getProp(this, t[a], 2, null, s)
                },
                elements: []
            },
                 p = e[a].transform,
                 h = this.stylesList.length,
                 o = 0; h > o; o += 1)
                this.stylesList[o].closed || this.stylesList[o].transformers.push(p);
    else if ("sh" == t[a].ty || "rc" == t[a].ty || "el" == t[a].ty || "sr" == t[a].ty) {
        e[a] = {
            elements: [],
            caches: [],
            PCaches: [],
            styles: [],
            lStr: ""
        };
        var x = 4;
        for ("rc" == t[a].ty ? x = 5 : "el" == t[a].ty ? x = 6 : "sr" == t[a].ty && (x = 7),
             e[a].sh = ShapePropertyFactory.getShapeProp(this, t[a], x, s),
             e[a].lvl = n,
             this.shapes.push(e[a].sh),
             this.addShapeToModifiers(e[a].sh),
             h = this.stylesList.length,
             o = 0; h > o; o += 1)
            this.stylesList[o].closed || e[a].elements.push({
                ty: this.stylesList[o].type,
                st: this.stylesList[o]
            })
    } else if ("tm" == t[a].ty || "rd" == t[a].ty || "ms" == t[a].ty) {
        var E = ShapeModifiers.getModifier(t[a].ty);
        E.init(this, t[a], s),
        this.shapeModifiers.push(E),
        d.push(E),
        e[a] = E
    }
    for (c = u.length,
         a = 0; c > a; a += 1)
        u[a].closed = !0;
    for (c = d.length,
         a = 0; c > a; a += 1)
        d[a].closed = !0
};

PIXIShapeElement.prototype.addShapeToModifiers = function(t) {
    var e, r = this.shapeModifiers.length;
    for (e = 0; r > e; e += 1)
        this.shapeModifiers[e].addShape(t)
};

PIXIShapeElement.prototype.renderModifiers = function() {
    if (this.shapeModifiers.length) {
        var t, e = this.shapes.length;
        for (t = 0; e > t; t += 1)
            this.shapes[t].reset();
        for (e = this.shapeModifiers.length,
             t = e - 1; t >= 0; t -= 1)
            this.shapeModifiers[t].processShapes(this.firstFrame)
    }
};

PIXIShapeElement.prototype.renderFrame = function(t) {
    var e = this._parent.renderFrame.call(this, t);
    return e === !1 ? void this.hide() : (this.PLayerElement.visible = !0,
                                          this.globalToLocal([0, 0, 0]),
                                          this.hidden = !1,
                                          this.renderModifiers(),
                                          void this.renderShape(null, null, !0, null))
};

PIXIShapeElement.prototype.hide = function() {
    if (!this.hidden) {
        this.PLayerElement.visible = !1;
        var t, e = this.stylesList.length;
        for (t = e - 1; t >= 0; t -= 1)
            "0" !== this.stylesList[t].ld && (this.stylesList[t].ld = "0",
                                              this.stylesList[t].pElem.style.display = "none",
                                              this.stylesList[t].pElem.parentNode && (this.stylesList[t].parent = this.stylesList[t].pElem.parentNode));
        this.hidden = !0
    }
};

PIXIShapeElement.prototype.renderShape = function(t, e, r, i, s) {
    var n, a;
    if (!t)
        for (t = this.shapesData,
             a = this.stylesList.length,
             n = 0; a > n; n += 1)
            this.stylesList[n].d = "",
    this.stylesList[n].PD.length = 0,
    this.stylesList[n].mdf = !1;
    e || (e = this.viewData),
    a = t.length - 1;
    var o;
    for (n = a; n >= 0; n -= 1)
        if (o = t[n].ty,
            "tr" == o) {
            if ((this.firstFrame || e[n].transform.op.mdf && i) && (i.setAttribute("opacity", e[n].transform.op.v),
                                                                    s.alpha = e[n].transform.op.v),
                this.firstFrame || e[n].transform.mProps.mdf && i) {
                i.setAttribute("transform", e[n].transform.mProps.v.to2dCSS());
                var h = e[n].transform.mProps.v.props
                , l = new PIXI.Matrix;
                l.a = h[0],
                l.b = h[1],
                l.c = h[4],
                l.d = h[5],
                l.tx = h[12],
                l.ty = h[13],
                s.transform.setFromMatrix(l)
            }
        } else
            "sh" == o || "el" == o || "rc" == o || "sr" == o ? this.renderPath(t[n], e[n]) : "fl" == o ? this.renderFill(t[n], e[n]) : "gf" == o ? this.renderGradient(t[n], e[n]) : "gs" == o ? (this.renderGradient(t[n], e[n]),
                                                                                                                                                                                                  this.renderStroke(t[n], e[n])) : "st" == o ? this.renderStroke(t[n], e[n]) : "gr" == o && this.renderShape(t[n].it, e[n].it, !1, e[n].gr, e[n].PGr);
    if (r) {
        for (a = this.stylesList.length,
             n = 0; a > n; n += 1) {
            "0" === this.stylesList[n].ld && (this.stylesList[n].ld = "1",
                                              this.stylesList[n].pElem.style.display = "block"),
            (this.stylesList[n].mdf || this.firstFrame) && (this.stylesList[n].pElem.setAttribute("d", this.stylesList[n].d),
                                                            this.stylesList[n].msElem && this.stylesList[n].msElem.setAttribute("d", this.stylesList[n].d));
            var p, c = this.stylesList[n].PD.length;
            for (p = 0; c > p; p += 1)
                "m" === this.stylesList[n].PD[p].t ? this.stylesList[n].PPElem.moveTo(this.stylesList[n].PD[p].c[0], this.stylesList[n].PD[p].c[1]) : this.stylesList[n].PPElem.bezierCurveTo(this.stylesList[n].PD[p].c[0], this.stylesList[n].PD[p].c[1], this.stylesList[n].PD[p].c[2], this.stylesList[n].PD[p].c[3], this.stylesList[n].PD[p].c[4], this.stylesList[n].PD[p].c[5]);
            this.stylesList[n].PPElem.endFill()
        }
        this.firstFrame && (this.firstFrame = !1)
    }
};

PIXIShapeElement.prototype.renderPath = function(t, e) {
    var r, i, s, n, a, o, h, l, p, c = e.elements.length, u = e.lvl;
    for (p = 0; c > p; p += 1) {
        h = e.sh.mdf || this.firstFrame,
        a = "",
        o = [];
        var d = e.sh.paths;
        n = d.length;
        var f, m, y;
        if (e.elements[p].st.lvl < u) {
            var g, v, b = this.mHelper.reset(), x = e.elements[p].st.lvl;
            for (v = u - 1; v >= x; v -= 1)
                h = e.elements[p].st.transformers[v - x].mProps.mdf || h,
            g = e.elements[p].st.transformers[v - x].mProps.v.props,
            b.transform(g[0], g[1], g[2], g[3], g[4], g[5], g[6], g[7], g[8], g[9], g[10], g[11], g[12], g[13], g[14], g[15]);
            if (h) {
                for (s = 0; n > s; s += 1)
                    if (l = d[s],
                        l && l.v) {
                        for (r = l.v.length,
                             i = 1; r > i; i += 1)
                            1 == i && (a += " M" + b.applyToPointStringified(l.v[0][0], l.v[0][1]),
                                       f = b.applyToPointArray(l.v[0][0], l.v[0][1], 0),
                                       o.push({
                                           t: "m",
                                           c: [f[0], f[1]]
                                       })),
                        a += " C" + b.applyToPointStringified(l.o[i - 1][0], l.o[i - 1][1]) + " " + b.applyToPointStringified(l.i[i][0], l.i[i][1]) + " " + b.applyToPointStringified(l.v[i][0], l.v[i][1]),
                        f = b.applyToPointArray(l.v[i][0], l.v[i][1], 0),
                        y = b.applyToPointArray(l.o[i - 1][0], l.o[i - 1][1], 0),
                        m = b.applyToPointArray(l.i[i][0], l.i[i][1], 0),
                        o.push({
                            t: "c",
                            c: [y[0], y[1], m[0], m[1], f[0], f[1]]
                        });
                        1 == r && (a += " M" + b.applyToPointStringified(l.v[0][0], l.v[0][1]),
                                   f = b.applyToPointArray(l.v[0][0], l.v[0][1], 0),
                                   o.push({
                                       t: "m",
                                       c: [f[0], f[1]]
                                   })),
                        l.c && (a += " C" + b.applyToPointStringified(l.o[i - 1][0], l.o[i - 1][1]) + " " + b.applyToPointStringified(l.i[0][0], l.i[0][1]) + " " + b.applyToPointStringified(l.v[0][0], l.v[0][1]),
                                a += "z",
                                f = b.applyToPointArray(l.v[0][0], l.v[0][1], 0),
                                y = b.applyToPointArray(l.o[i - 1][0], l.o[i - 1][1], 0),
                                m = b.applyToPointArray(l.i[0][0], l.i[0][1], 0),
                                o.push({
                                    t: "c",
                                    c: [y[0], y[1], m[0], m[1], f[0], f[1]]
                                }))
                    }
                e.caches[p] = a,
                e.PCaches[p] = o
            } else
                a = e.caches[p],
            o = e.PCaches[p]
        } else if (h) {
            for (s = 0; n > s; s += 1)
                if (l = d[s],
                    l && l.v) {
                    for (r = l.v.length,
                         i = 1; r > i; i += 1)
                        1 == i && (a += " M" + l.v[0].join(","),
                                   o.push({
                                       t: "m",
                                       c: [l.v[0][0], l.v[0][1]]
                                   })),
                    a += " C" + l.o[i - 1].join(",") + " " + l.i[i].join(",") + " " + l.v[i].join(","),
                    o.push({
                        t: "c",
                        c: [l.o[i - 1][0], l.o[i - 1][1], l.i[i][0], l.i[i][1], l.v[i][0], l.v[i][1]]
                    });
                    1 == r && (a += " M" + l.v[0].join(","),
                               o.push({
                                   t: "m",
                                   c: [l.v[0][0], l.v[0][1]]
                               })),
                    l.c && (a += " C" + l.o[i - 1].join(",") + " " + l.i[0].join(",") + " " + l.v[0].join(","),
                            a += "z",
                            o.push({
                                t: "c",
                                c: [l.o[i - 1][0], l.o[i - 1][1], l.i[0][0], l.i[0][1], l.v[0][0], l.v[0][1]]
                            }))
                }
            e.caches[p] = a,
            e.PCaches[p] = o
        } else
            a = e.caches[p],
        o = e.PCaches[p];
        2 === o.length && o[0].c[0] === o[1].c[0] && o[0].c[1] === o[1].c[1] && o[0].c[0] === o[1].c[2] && o[0].c[1] === o[1].c[3] && o[0].c[0] === o[1].c[4] && o[0].c[1] === o[1].c[5] && (o[1].c[4] += .1,
                                                                                                                                                                                             o[1].c[5] += .1),
        e.elements[p].st.d += a,
        e.elements[p].st.PD = e.elements[p].st.PD.concat(o),
        e.elements[p].st.mdf = h || e.elements[p].st.mdf
    }
};

PIXIShapeElement.prototype.renderFill = function(t, e) {
    var r = e.style;
    (e.c.mdf || this.firstFrame) && r.pElem.setAttribute("fill", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"),
    r.PPElem.clear(),
    r.PPElem.beginFill(rgbToHex(bm_floor(e.c.v[0]), bm_floor(e.c.v[1]), bm_floor(e.c.v[2]), "0x")),
    (e.o.mdf || this.firstFrame) && r.pElem.setAttribute("fill-opacity", e.o.v)
};

PIXIShapeElement.prototype.renderGradient = function(t, e) {
    var r = e.gf
    , i = e.of
    , s = e.s.v
    , n = e.e.v;
    if (e.o.mdf || this.firstFrame) {
        var a = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
        e.elem.setAttribute(a, e.o.v)
    }
    if (e.s.mdf || this.firstFrame) {
        var o = 1 === t.t ? "x1" : "cx"
        , h = "x1" === o ? "y1" : "cy";
        r.setAttribute(o, s[0]),
        r.setAttribute(h, s[1]),
        i && (i.setAttribute(o, s[0]),
              i.setAttribute(h, s[1]))
    }
    var l, p, c, u;
    if (e.g.cmdf || this.firstFrame) {
        l = e.cst;
        var d = e.g.c;
        for (c = l.length,
             p = 0; c > p; p += 1)
            u = l[p],
        u.setAttribute("offset", d[4 * p] + "%"),
        u.setAttribute("stop-color", "rgb(" + d[4 * p + 1] + "," + d[4 * p + 2] + "," + d[4 * p + 3] + ")")
    }
    if (i && (e.g.omdf || this.firstFrame)) {
        l = e.ost;
        var f = e.g.o;
        for (c = l.length,
             p = 0; c > p; p += 1)
            u = l[p],
        u.setAttribute("offset", f[2 * p] + "%"),
        u.setAttribute("stop-opacity", f[2 * p + 1])
    }
    if (1 === t.t)
        (e.e.mdf || this.firstFrame) && (r.setAttribute("x2", n[0]),
                                         r.setAttribute("y2", n[1]),
                                         i && (i.setAttribute("x2", n[0]),
                                               i.setAttribute("y2", n[1])));
    else {
        var m;
        if ((e.s.mdf || e.e.mdf || this.firstFrame) && (m = Math.sqrt(Math.pow(s[0] - n[0], 2) + Math.pow(s[1] - n[1], 2)),
                                                        r.setAttribute("r", m),
                                                        i && i.setAttribute("r", m)),
            e.e.mdf || e.h.mdf || e.a.mdf || this.firstFrame) {
            m || (m = Math.sqrt(Math.pow(s[0] - n[0], 2) + Math.pow(s[1] - n[1], 2)));
            var y = Math.atan2(n[1] - s[1], n[0] - s[0])
            , g = e.h.v >= 1 ? .99 : e.h.v <= -1 ? -.99 : e.h.v
            , v = m * g
            , b = Math.cos(y + e.a.v) * v + s[0]
            , x = Math.sin(y + e.a.v) * v + s[1];
            r.setAttribute("fx", b),
            r.setAttribute("fy", x),
            i && (i.setAttribute("fx", b),
                  i.setAttribute("fy", x))
        }
    }
};

PIXIShapeElement.prototype.renderStroke = function(t, e) {
    var r = e.style
    , i = e.d;
    i && i.k && (i.mdf || this.firstFrame) && (r.pElem.setAttribute("stroke-dasharray", i.dasharray),
                                               r.pElem.setAttribute("stroke-dashoffset", i.dashoffset)),
    r.PPElem.clear(),
    e.c && (e.c.mdf || this.firstFrame) && r.pElem.setAttribute("stroke", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"),
    (e.o.mdf || this.firstFrame) && r.pElem.setAttribute("stroke-opacity", e.o.v),
    (e.w.mdf || this.firstFrame) && (r.pElem.setAttribute("stroke-width", e.w.v),
                                     r.msElem && r.msElem.setAttribute("stroke-width", e.w.v)),
    r.PPElem.lineStyle(e.w.v, rgbToHex(bm_floor(e.c.v[0]), bm_floor(e.c.v[1]), bm_floor(e.c.v[2]), "0x"))
};

PIXIShapeElement.prototype.destroy = function() {
    this._parent.destroy.call(),
    this.shapeData = null,
    this.viewData = null,
    this.parentContainer = null,
    this.placeholder = null
};
