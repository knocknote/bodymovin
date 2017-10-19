var CompExpressionInterface = (function (){
    return function(t) {
            function e(e) {
                for (var r = 0, i = t.layers.length; i > r; ) {
                    if (t.layers[r].nm === e)
                        return t.elements[r].layerInterface;
                    r += 1
                }
            }
            return e.layer = e,
            e.pixelAspect = 1,
            e.height = t.globalData.compSize.h,
            e.width = t.globalData.compSize.w,
            e.pixelAspect = 1,
            e.frameDuration = 1 / t.globalData.frameRate,
            e
    }
}());
