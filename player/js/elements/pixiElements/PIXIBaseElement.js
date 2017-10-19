function PIXIBaseElement(t, e, r, i, s) {
    this.globalData = r,
    this.comp = i,
    this.data = t,
    this.matteElement = null,
    this.parentContainer = e,
    this.layerId = s ? s.layerId : "ly_" + randomString(10),
    this.placeholder = s,
    this.init()
};

createElement(BaseElement, PIXIBaseElement);

PIXIBaseElement.prototype.createElements = function() {
    if (this.data.td) {
        if (3 == this.data.td)
            this.layerElement = document.createElementNS(svgNS, "mask"),
        this.layerElement.setAttribute("id", this.layerId),
        this.layerElement.setAttribute("mask-type", "luminance"),
        this.globalData.defs.appendChild(this.layerElement);
        else if (2 == this.data.td) {
            var t = document.createElementNS(svgNS, "mask");
            t.setAttribute("id", this.layerId),
            t.setAttribute("mask-type", "alpha");
            var e = document.createElementNS(svgNS, "g");
            t.appendChild(e),
            this.layerElement = document.createElementNS(svgNS, "g");
            var r = document.createElementNS(svgNS, "filter")
            , i = randomString(10);
            r.setAttribute("id", i),
            r.setAttribute("filterUnits", "objectBoundingBox"),
            r.setAttribute("x", "0%"),
            r.setAttribute("y", "0%"),
            r.setAttribute("width", "100%"),
            r.setAttribute("height", "100%");
            var s = document.createElementNS(svgNS, "feComponentTransfer");
            s.setAttribute("in", "SourceGraphic"),
            r.appendChild(s);
            var n = document.createElementNS(svgNS, "feFuncA");
            n.setAttribute("type", "table"),
            n.setAttribute("tableValues", "1.0 0.0"),
            s.appendChild(n),
            this.globalData.defs.appendChild(r);
            var a = document.createElementNS(svgNS, "rect");
            a.setAttribute("width", this.comp.data ? this.comp.data.w : this.globalData.compSize.w),
            a.setAttribute("height", this.comp.data ? this.comp.data.h : this.globalData.compSize.h),
            a.setAttribute("x", "0"),
            a.setAttribute("y", "0"),
            a.setAttribute("fill", "#ffffff"),
            a.setAttribute("opacity", "0"),
            e.setAttribute("filter", "url(#" + i + ")"),
            e.appendChild(a),
            e.appendChild(this.layerElement),
            this.globalData.defs.appendChild(t)
        } else {
            this.layerElement = document.createElementNS(svgNS, "g");
            var o = document.createElementNS(svgNS, "mask");
            o.setAttribute("id", this.layerId),
            o.setAttribute("mask-type", "alpha"),
            o.appendChild(this.layerElement),
            this.globalData.defs.appendChild(o)
        }
        this.data.hasMask && (this.maskedElement = this.layerElement)
    } else
        this.data.hasMask || this.data.tt ? (this.layerElement = document.createElementNS(svgNS, "g"),
                                             this.PLayerElement = new PIXI.DisplayObjectContainer,
                                             this.data.tt ? (this.matteElement = document.createElementNS(svgNS, "g"),
                                                             this.matteElement.appendChild(this.layerElement),
                                                             this.baseElement = this.matteElement) : (this.baseElement = this.layerElement,
                                                                                                      this.PBaseElement = this.PLayerElement),
                                             this.data.hasMask && (this.maskedElement = this.layerElement,
                                                                   this.PMaskedElement = this.PLayerElement)) : (this.layerElement = document.createElementNS(svgNS, "g"),
                                                                                                                 this.baseElement = this.layerElement,
                                                                                                                 this.PLayerElement = new PIXI.DisplayObjectContainer,
                                                                                                                 this.PBaseElement = this.PLayerElement);
    if (!this.data.ln && !this.data.cl || 4 !== this.data.ty && 0 !== this.data.ty || (this.data.ln && this.layerElement.setAttribute("id", this.data.ln),
                                                                                       this.data.cl && this.layerElement.setAttribute("class", this.data.cl)),
        0 === this.data.ty && !this.checkMasks()) {
        var h = document.createElementNS(svgNS, "clipPath")
        , l = document.createElementNS(svgNS, "path");
        l.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
        var p = "cp_" + randomString(8);
        h.setAttribute("id", p),
        this.layerElement.setAttribute("clip-path", "url(#" + p + ")"),
        h.appendChild(l),
        this.globalData.defs.appendChild(h)
    }
    0 !== this.data.bm && this.setBlendMode(),
    this.layerElement !== this.parentContainer && (this.placeholder = null),
    this.data.ef && (this.effectsManager = new SVGEffects(this)),
    this.checkParenting()
};

PIXIBaseElement.prototype.setBlendMode = BaseElement.prototype.setBlendMode;

PIXIBaseElement.prototype.renderFrame = function(t) {
    if (3 === this.data.ty || this.data.hd)
        return !1;
    if (!this.isVisible)
        return this.isVisible;
    this.lastNum = this.currentFrameNum,
    this.finalTransform.opMdf = this.finalTransform.op.mdf,
    this.finalTransform.matMdf = this.finalTransform.mProp.mdf,
    this.finalTransform.opacity = this.finalTransform.op.v,
    this.firstFrame && (this.finalTransform.opMdf = !0,
                        this.finalTransform.matMdf = !0);
    var e, r = this.finalTransform.mat;
    if (this.hierarchy) {
        var i, s = this.hierarchy.length;
        for (e = this.finalTransform.mProp.v.props,
             r.cloneFromProps(e),
             i = 0; s > i; i += 1)
            this.finalTransform.matMdf = this.hierarchy[i].finalTransform.mProp.mdf ? !0 : this.finalTransform.matMdf,
        e = this.hierarchy[i].finalTransform.mProp.v.props,
        r.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15])
    } else
        this.isVisible && r.cloneFromProps(this.finalTransform.mProp.v.props);
    t && (e = t.mat.props,
          r.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]),
          this.finalTransform.opacity *= t.opacity,
          this.finalTransform.opMdf = t.opMdf ? !0 : this.finalTransform.opMdf,
          this.finalTransform.matMdf = t.matMdf ? !0 : this.finalTransform.matMdf),
    this.finalTransform.matMdf && this.layerElement && this.layerElement.setAttribute("transform", r.to2dCSS());
    var n = new PIXI.Matrix;
    return n.a = r.props[0],
    n.b = r.props[1],
    n.c = r.props[4],
    n.d = r.props[5],
    n.tx = r.props[12],
    n.ty = r.props[13],
    this.PLayerElement.transform.setFromMatrix(n),
    this.finalTransform.opMdf && this.layerElement && (this.layerElement.setAttribute("opacity", this.finalTransform.opacity),
                                                       this.PLayerElement.alpha = this.finalTransform.opacity),
    this.data.hasMask && this.maskManager.renderFrame(r),
    this.effectsManager && this.effectsManager.renderFrame(this.firstFrame),
    this.isVisible
};

PIXIBaseElement.prototype.destroy = function() {
    this.layerElement = null,
    this.parentContainer = null,
    this.matteElement && (this.matteElement = null),
    this.maskManager && this.maskManager.destroy()
};

PIXIBaseElement.prototype.getBaseElement = function() {
    return this.baseElement
};

PIXIBaseElement.prototype.getPBaseElement = function() {
    return this.PBaseElement
};

PIXIBaseElement.prototype.addMasks = function(t) {
    this.maskManager = new PIXIMaskElement(t,this,this.globalData)
};

PIXIBaseElement.prototype.setMatte = function(t) {
    this.matteElement && this.matteElement.setAttribute("mask", "url(#" + t + ")")
};

PIXIBaseElement.prototype.setMatte = function(t) {
    this.matteElement && this.matteElement.setAttribute("mask", "url(#" + t + ")")
};

PIXIBaseElement.prototype.hide = function() {};
