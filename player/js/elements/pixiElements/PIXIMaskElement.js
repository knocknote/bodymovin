function PIXIMaskElement(t, e, r) {
    this.dynamicProperties = [],
    this.data = t,
    this.element = e,
    this.globalData = r,
    this.paths = [],
    this.storedData = [],
    this.masksProperties = this.data.masksProperties,
    this.viewData = new Array(this.masksProperties.length),
    this.maskElement = null,
    this.PMaskElement = null,
    this.firstFrame = !0;
    var i, s, n, a, o, h, l, p, c, u = this.globalData.defs, d = this.masksProperties.length, f = this.masksProperties, m = 0, y = [], g = [], v = randomString(10), b = "clipPath", x = "clip-path";
    for (i = 0; d > i; i++)
        if (("a" !== f[i].mode && "n" !== f[i].mode || f[i].inv) && (b = "mask",
                                                                     x = "mask"),
            "s" != f[i].mode && "i" != f[i].mode || 0 != m ? h = null : (h = document.createElementNS(svgNS, "rect"),
                                                                         h.setAttribute("fill", "#ffffff"),
                                                                         h.setAttribute("width", this.element.comp.data ? this.element.comp.data.w : this.element.globalData.compSize.w),
                                                                         h.setAttribute("height", this.element.comp.data ? this.element.comp.data.h : this.element.globalData.compSize.h),
                                                                         y.push(h)),
            s = document.createElementNS(svgNS, "path"),
            n = new PIXI.Graphics,
            "n" != f[i].mode && f[i].cl !== !1) {
            if (m += 1,
                f[i].cl ? "s" == f[i].mode ? s.setAttribute("fill", "#000000") : s.setAttribute("fill", "#ffffff") : (s.setAttribute("fill", "none"),
                                                                                                                      "s" == f[i].mode ? s.setAttribute("fill", "#000000") : s.setAttribute("fill", "#ffffff"),
                                                                                                                      s.setAttribute("stroke-width", "1"),
                                                                                                                      s.setAttribute("stroke-miterlimit", "10")),
                s.setAttribute("clip-rule", "nonzero"),
                0 !== f[i].x.k) {
                b = "mask",
                x = "mask",
                c = PropertyFactory.getProp(this.element, f[i].x, 0, null, this.dynamicProperties);
                var E = "fi_" + randomString(10);
                l = document.createElementNS(svgNS, "filter"),
                l.setAttribute("id", E),
                p = document.createElementNS(svgNS, "feMorphology"),
                p.setAttribute("operator", "dilate"),
                p.setAttribute("in", "SourceGraphic"),
                p.setAttribute("radius", "0"),
                l.appendChild(p),
                u.appendChild(l),
                "s" == f[i].mode ? s.setAttribute("stroke", "#000000") : s.setAttribute("stroke", "#ffffff")
            } else
                p = null,
            c = null;
            if (this.storedData[i] = {
                elem: s,
                PElem: n,
                x: c,
                expan: p,
                lastPath: "",
                lastOperator: "",
                filterId: E,
                lastRadius: 0
            },
                "i" == f[i].mode) {
                o = y.length;
                var T = document.createElementNS(svgNS, "g");
                for (a = 0; o > a; a += 1)
                    T.appendChild(y[a]);
                var _ = document.createElementNS(svgNS, "mask");
                _.setAttribute("mask-type", "alpha"),
                _.setAttribute("id", v + "_" + m),
                _.appendChild(s),
                u.appendChild(_),
                T.setAttribute("mask", "url(#" + v + "_" + m + ")"),
                y.length = 0,
                y.push(T)
            } else
                y.push(s),
            g.push(n);
            f[i].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()),
            this.viewData[i] = {
                elem: s,
                PElem: n,
                lastPath: "",
                prop: ShapePropertyFactory.getShapeProp(this.element, f[i], 3, this.dynamicProperties, null)
            },
            h && (this.viewData[i].invRect = h),
            this.viewData[i].prop.k || this.drawPath(f[i], this.viewData[i].prop.v, this.viewData[i])
        } else
            this.viewData[i] = {
                prop: ShapePropertyFactory.getShapeProp(this.element, f[i], 3, this.dynamicProperties, null),
                elem: s
            },
    u.appendChild(s);
    for (this.maskElement = document.createElementNS(svgNS, b),
         this.PMaskElement = new PIXI.DisplayObjectContainer,
         d = y.length,
         i = 0; d > i; i += 1)
        this.maskElement.appendChild(y[i]);
    this.maskElement.setAttribute("id", v),
    m > 0 && (this.element.maskedElement.setAttribute(x, "url(#" + v + ")"),
              this.element.PMaskedElement.mask = g[0],
              this.element.PMaskedElement.addChild(g[0])),
    u.appendChild(this.maskElement)
};

PIXIMaskElement.prototype.getMaskProperty = function(t) {
    return this.viewData[t].prop
};

PIXIMaskElement.prototype.prepareFrame = function() {
    var t, e = this.dynamicProperties.length;
    for (t = 0; e > t; t += 1)
        this.dynamicProperties[t].getValue()
};

PIXIMaskElement.prototype.renderFrame = function(t) {
    var e, r = this.masksProperties.length;
    for (e = 0; r > e; e++)
        if ((this.viewData[e].prop.mdf || this.firstFrame) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]),
            "n" !== this.masksProperties[e].mode && this.masksProperties[e].cl !== !1 && (this.viewData[e].invRect && (this.element.finalTransform.mProp.mdf || this.firstFrame) && (this.viewData[e].invRect.setAttribute("x", -t.props[12]),
                                                                                                                                                                                     this.viewData[e].invRect.setAttribute("y", -t.props[13])),
                                                                                          this.storedData[e].x && (this.storedData[e].x.mdf || this.firstFrame))) {
            var i = this.storedData[e].expan;
            this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode",
                                                                                          this.storedData[e].elem.setAttribute("filter", "url(#" + this.storedData[e].filterId + ")")),
                                          i.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate",
                                                                                                                                                 this.storedData[e].elem.setAttribute("filter", null)),
                                                                                                this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v))
        }
    this.firstFrame = !1
};

PIXIMaskElement.prototype.getMaskelement = function() {
    return this.maskElement
};

PIXIMaskElement.prototype.createLayerSolidPath = function() {
    var t = "M0,0 ";
    return t += " h" + this.globalData.compSize.w,
    t += " v" + this.globalData.compSize.h,
    t += " h-" + this.globalData.compSize.w,
    t += " v-" + this.globalData.compSize.h + " "
};

PIXIMaskElement.prototype.drawPath = function(t, e, r) {
    var i, s, n = "";
    for (s = e.v.length,
         r.PElem.clear(),
         r.PElem.beginFill(16777215),
         i = 1; s > i; i += 1)
        1 == i && (n += " M" + bm_rnd(e.v[0][0]) + "," + bm_rnd(e.v[0][1]),
                   r.PElem.moveTo(e.v[0][0], e.v[0][1])),
    n += " C" + bm_rnd(e.o[i - 1][0]) + "," + bm_rnd(e.o[i - 1][1]) + " " + bm_rnd(e.i[i][0]) + "," + bm_rnd(e.i[i][1]) + " " + bm_rnd(e.v[i][0]) + "," + bm_rnd(e.v[i][1]),
    r.PElem.bezierCurveTo(e.o[i - 1][0], e.o[i - 1][1], e.i[i][0], e.i[i][1], e.v[i][0], e.v[i][1]);
    t.cl && (n += " C" + bm_rnd(e.o[i - 1][0]) + "," + bm_rnd(e.o[i - 1][1]) + " " + bm_rnd(e.i[0][0]) + "," + bm_rnd(e.i[0][1]) + " " + bm_rnd(e.v[0][0]) + "," + bm_rnd(e.v[0][1]),
             r.PElem.bezierCurveTo(e.o[i - 1][0], e.o[i - 1][1], e.i[0][0], e.i[0][1], e.v[0][0], e.v[0][1])),
    r.PElem.endFill(),
    r.lastPath !== n && (r.elem && (t.inv ? r.elem.setAttribute("d", this.solidPath + n) : r.elem.setAttribute("d", n)),
                         r.lastPath = n)
};

PIXIMaskElement.prototype.getMask = function(t) {
    for (var e = 0, r = this.masksProperties.length; r > e; ) {
        if (this.masksProperties[e].nm === t)
            return {
                maskPath: this.viewData[e].prop.pv
            };
        e += 1
    }
};

PIXIMaskElement.prototype.destroy = function() {
    this.element = null,
    this.globalData = null,
    this.maskElement = null,
    this.data = null,
    this.paths = null,
    this.masksProperties = null
};
