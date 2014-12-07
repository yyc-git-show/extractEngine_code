(function () {
    var FireLayer = YYC.Class(YE.Layer, {
        Private: {
            ___hasFire: function () {
                return this.getChilds().length > 0;
            },
            ___setCanvas: function () {
                this.setCanvasByID("fireLayerCanvas");
                this.setPosition(bomberConfig.canvas.TOP, bomberConfig.canvas.LEFT);
                this.setZIndex(2);
            }
        },
        Public: {
            initData: function (layers) {
                this.___setCanvas();
            },
//            clear: function () {
//                this.iterator("clear", this.getContext());
//            },
            isChange: function () {
                if (this.___hasFire()) {
                    return true;
                }

                return false;
            }
        }
    });

    window.FireLayer = FireLayer;
}());