function PIXICompElement(t, e, r, i, s) {
    this._parent.constructor.call(this, t, e, r, i, s),
    this.layers = t.layers,
    this.supports3d = !0,
    this.completeLayers = !1,
    this.elements = Array.apply(null, {
        length: this.layers.length
    }),
    this.data.tm && (this.tm = PropertyFactory.getProp(this, this.data.tm, 0, r.frameRate, this.dynamicProperties)),
    this.data.xt ? (this.layerElement = document.createElementNS(svgNS, "g"),
                    this.buildAllItems()) : r.progressiveLoad || this.buildAllItems()
}

createElement(PIXIBaseElement, PIXICompElement);

PIXICompElement.prototype.hide = function() {
    if (!this.hidden) {
        var t, e = this.elements.length;
        for (t = 0; e > t; t += 1)
            this.elements[t] && this.elements[t].hide();
        this.hidden = !0
    }
};

PIXICompElement.prototype.prepareFrame = function(t) {
    if (this._parent.prepareFrame.call(this, t),
        this.isVisible !== !1 || this.data.xt) {
        var e = t;
        this.tm && (e = this.tm.v,
                    e === this.data.op && (e = this.data.op - 1)),
        this.renderedFrame = e / this.data.sr;
        var r, i = this.elements.length;
        for (this.completeLayers || this.checkLayers(this.renderedFrame),
             r = 0; i > r; r += 1)
            (this.completeLayers || this.elements[r]) && this.elements[r].prepareFrame(e / this.data.sr - this.layers[r].st)
    }
};

PIXICompElement.prototype.renderFrame = function(t) {
    var e, r = this._parent.renderFrame.call(this, t), i = this.layers.length;
    if (r === !1)
        return void this.hide();
    for (this.hidden = !1,
         e = 0; i > e; e += 1)
        (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
    this.firstFrame && (this.firstFrame = !1)
};

PIXICompElement.prototype.setElements = function(t) {
    this.elements = t
};

PIXICompElement.prototype.getElements = function() {
    return this.elements
};

PIXICompElement.prototype.destroy = function() {
    this._parent.destroy.call();
    var t, e = this.layers.length;
    for (t = 0; e > t; t += 1)
        this.elements[t] && this.elements[t].destroy()
};

PIXICompElement.prototype.checkLayers = PIXIRenderer.prototype.checkLayers;
PIXICompElement.prototype.buildItem = PIXIRenderer.prototype.buildItem;
PIXICompElement.prototype.buildAllItems = PIXIRenderer.prototype.buildAllItems;
PIXICompElement.prototype.buildElementParenting = PIXIRenderer.prototype.buildElementParenting;
PIXICompElement.prototype.createItem = PIXIRenderer.prototype.createItem;
PIXICompElement.prototype.createImage = PIXIRenderer.prototype.createImage;
PIXICompElement.prototype.createComp = PIXIRenderer.prototype.createComp;
PIXICompElement.prototype.createSolid = PIXIRenderer.prototype.createSolid;
PIXICompElement.prototype.createShape = PIXIRenderer.prototype.createShape;
PIXICompElement.prototype.createText = PIXIRenderer.prototype.createText;
PIXICompElement.prototype.createBase = PIXIRenderer.prototype.createBase;
PIXICompElement.prototype.appendElementInPos = PIXIRenderer.prototype.appendElementInPos;
