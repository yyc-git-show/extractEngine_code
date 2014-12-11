(function () {
    var FireLayer = YYC.Class(YE.Layer, {
        Private: {
            ___hasFire: function () {
                return this.getChilds().length > 0;
            }
        },
        Public: {
            setCanvas: function () {
                this.P_canvas = document.getElementById("fireLayerCanvas");
                //width、height在html中设置！
                var css = {
                    "position": "absolute",
                    "top": bomberConfig.canvas.TOP,
                    "left": bomberConfig.canvas.LEFT,
                    "z-index": 2
                };

                $("#fireLayerCanvas").css(css);
            },
            draw: function () {
                this.P_iterator("draw", this.P_context);
            },
            change: function () {
                if (this.___hasFire()) {
                    this.setStateChange();
                }
            },
            run: function () {
                this.P_render();
            }
        }
    });

    window.FireLayer = FireLayer;
}());