//this.app = new PIXI.Application(2000, 600, {backgroundColor : 0x1099bb});
//this.globalData.stage = this.app.stage;
//document.body.appendChild(this.app.view);
function PIXIRenderer(t, e) {
    this.animationItem = t,
    this.layers = null,
    this.renderedFrame = -1,
    this.globalData = {
        frameNum: -1
    },
    this.renderConfig = {
        preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
        progressiveLoad: e && e.progressiveLoad || !1
    },
    this.elements = [],
    this.destroyed = !1
};

extendPrototype(BaseRenderer, PIXIRenderer);

PIXIRenderer.prototype.createBase = function(t) {
    return new PIXIBaseElement(t,this.layerElement,this.globalData,this)
};

PIXIRenderer.prototype.createShape = function(t) {
    return new PIXIShapeElement(t,this.layerElement,this.globalData,this)
};

PIXIRenderer.prototype.createText = function(t) {
    return new SVGTextElement(t,this.layerElement,this.globalData,this)
};

PIXIRenderer.prototype.createImage = function(t) {
    return new IImageElement(t,this.layerElement,this.globalData,this)
};

PIXIRenderer.prototype.createComp = function(t) {
    return new PIXICompElement(t,this.layerElement,this.globalData,this)
};

PIXIRenderer.prototype.createSolid = function(t) {
    return null;// new PIXISolidElement(t,this.layerElement,this.globalData,this)
};

PIXIRenderer.prototype.configAnimation = function(t) {
    this.layerElement = document.createElementNS(svgNS, "svg"),
    this.layerElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
    this.layerElement.setAttribute("width", t.w),
    this.layerElement.setAttribute("height", t.h),
    this.layerElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h),
    this.layerElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio),
    this.layerElement.style.width = "100%",
    this.layerElement.style.height = "100%",
    this.layerElement.style.transform = "translate3d(0,0,0)",
    this.layerElement.style.transformOrigin = this.layerElement.style.mozTransformOrigin = this.layerElement.style.webkitTransformOrigin = this.layerElement.style["-webkit-transform"] = "0px 0px 0px",
    this.animationItem.wrapper.appendChild(this.layerElement),
    this.renderer = new PIXI.WebGLRenderer(t.w,t.h,{
        antialias: !0,
        transparent: !0
    }),
    this.animationItem.wrapper.appendChild(this.renderer.view),
    this.stage = new PIXI.Container,
    this.PLayerElement = this.stage;
    var e = document.createElementNS(svgNS, "defs");
    this.globalData.defs = e,
    this.layerElement.appendChild(e),
    this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem),
    this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem),
    this.globalData.progressiveLoad = this.renderConfig.progressiveLoad,
    this.globalData.frameId = 0,
    this.globalData.compSize = {
        w: t.w,
        h: t.h
    },
    this.globalData.frameRate = t.fr;
    var r = document.createElementNS(svgNS, "clipPath")
    , i = document.createElementNS(svgNS, "rect");
    i.setAttribute("width", t.w),
    i.setAttribute("height", t.h),
    i.setAttribute("x", 0),
    i.setAttribute("y", 0);
    var s = "animationMask_" + randomString(10);
    r.setAttribute("id", s),
    r.appendChild(i);
    var n = document.createElementNS(svgNS, "g");
    n.setAttribute("clip-path", "url(#" + s + ")"),
    this.layerElement.appendChild(n),
    e.appendChild(r),
    this.layerElement = n,
    this.layers = t.layers,
    this.globalData.fontManager = new FontManager,
    this.globalData.fontManager.addChars(t.chars),
    this.globalData.fontManager.addFonts(t.fonts, e),
    this.elements = Array.apply(null, {
        length: t.layers.length
    })
};

PIXIRenderer.prototype.destroy = function() {
    this.animationItem.wrapper.innerHTML = "",
    this.layerElement = null,
    this.globalData.defs = null;
    var t, e = this.layers ? this.layers.length : 0;
    for (t = 0; e > t; t++)
        this.elements[t] && this.elements[t].destroy();
    this.elements.length = 0,
    this.destroyed = !0,
    this.animationItem = null
};

PIXIRenderer.prototype.updateContainerSize = function() {};

PIXIRenderer.prototype.buildItem = function(t) {
    var e = this.elements;
    if (!e[t] && 99 != this.layers[t].ty) {
        var r = this.createItem(this.layers[t]);
        e[t] = r,
        expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(r),
                              r.initExpressions()),
        this.appendElementInPos(r, t),
        this.layers[t].tt && (this.buildItem(t - 1),
                              r.setMatte(e[t - 1].layerId))
    }
};

PIXIRenderer.prototype.renderFrame = function(t) {
    if (this.renderedFrame != t && !this.destroyed) {
        null === t ? t = this.renderedFrame : this.renderedFrame = t,
        this.globalData.frameNum = t,
        this.globalData.frameId += 1,
        this.globalData.projectInterface.currentFrame = t;
        var e, r = this.layers.length;
        for (this.completeLayers || this.checkLayers(t),
             e = r - 1; e >= 0; e--)
            (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
        for (e = r - 1; e >= 0; e--)
            (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
        this.renderer.render(this.stage)
    }
};

PIXIRenderer.prototype.appendElementInPos = function(t, e) {
    var r = t.getBaseElement()
    , i = t.getPBaseElement();
    if (i || console.log(t),
        r) {
        for (var s, n, a = 0; e > a; )
            this.elements[a] && this.elements[a].getBaseElement() && (s = this.elements[a].getBaseElement(),
                                                                      n = this.elements[a].getPBaseElement()),
        a += 1;
        if (s) {
            this.layerElement.insertBefore(r, s);
            var o = this.PLayerElement.getChildIndex(n);
            this.PLayerElement.addChildAt(i, o)
        } else
            this.layerElement.appendChild(r),
        this.PLayerElement.addChild(i)
    }
};

PIXIRenderer.prototype.hide = function() {
    this.layerElement.style.display = "none"
};

PIXIRenderer.prototype.show = function() {
    this.layerElement.style.display = "block"
};

PIXIRenderer.prototype.searchExtraCompositions = function(t) {
    var e, r = t.length, i = document.createElementNS(svgNS, "g");
    for (e = 0; r > e; e += 1)
        if (t[e].xt) {
            var s = this.createComp(t[e], i, this.globalData.comp, null);
            s.initExpressions(),
            this.globalData.projectInterface.registerComposition(s)
        }
};
