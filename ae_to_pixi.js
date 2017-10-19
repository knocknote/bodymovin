function AnimationContainer(data) {
    this.name       = data.nm;
    this.width      = data.w;
    this.height     = data.h;
    this.frameRate  = data.fr;
    this.totalFrame = data.tf;
    this.version    = data.v;
    this.outPoint   = data.op;

    //unknown properties
    this.ip  = data.ip;
    this.ddd = data.ddd;
}

var LAYER_TYPE = {
    COMP:   0,
    SOLID:  1,
    IMAGE:  2,
    SHAPE:  4,
    TEXT:   5,
    CAMERA: 13,
}

function AnimationLayer(data) {
    this.name         = data.nm;
    this.type         = data.ty;
    this.referenceId  = data.refId;
    this.autoOriented = data.ao;
    this.blendMode    = this.blendMode(data.bm);
    this.isCompleted  = data.completed;
    this.index        = data.ind;
    this.outPoint     = data.op;
    this.width        = data.w;
    this.height       = data.h;
    
    //unknown properties
    this.ddd = data.ddd;
    this.ip  = data.ip;
    this.sr  = data.sr || 1;
    this.st  = data.st;
}

AnimationLayer.prototype.blendMode = function(mode) {
    switch(mode) {
    case 0:
        return PIXI.BLEND_MODES.NORMAL;
    case 1:
        return PIXI.BLEND_MODES.MULTI_PLY;
    case 2:
        return PIXI.BLEND_MODES.SCREEN;
    case 3:
        return PIXI.BLEND_MODES.OVERLAY;
    case 4:
        return PIXI.BLEND_MODES.DARKEN;
    case 5:
        return PIXI.BLEND_MODES.LIGHTEN;
    case 6:
        return PIXI.BLEND_MODES.COLOR_DODGE;
    case 7:
        return PIXI.BLEND_MODES.COLOR_BURN;
    case 8:
        return PIXI.BLEND_MODES.HARD_LIGHT;
    case 9:
        return PIXI.BLEND_MODES.SOFT_LIGHT;
    case 10:
        return PIXI.BLEND_MODES.DIFFERENCE;
    case 11:
        return PIXI.BLEND_MODES.EXCLUSION;
    case 12:
        return PIXI.BLEND_MODES.HUE;
    case 13:
        return PIXI.BLEND_MODES.SATURATION;
    case 14:
        return PIXI.BLEND_MODES.COLOR;
    case 15:
        return PIXI.BLEND_MODES.LUMINOSITY;
    }
    return PIXI.BLEND_MODES.NORMAL;
}

function AnimationProperty(property) {
}

function TransformProperty(prop) {
    this.isModified = prop.mdf;
}
