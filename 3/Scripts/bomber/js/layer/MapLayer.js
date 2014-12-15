(function () {
    var MapLayer = YYC.Class(YE.Layer, {
        Private: {
            ___canvasBuffer: null,
            ___contextBuffer: null,

            ___getCanvasBuffer: function () {
                //缓冲的canvas也要在html中创建并设置width、height！
                this.___canvasBuffer = document.getElementById("mapLayerCanvas_buffer");
            },
            ___getContextBuffer: function () {
                this.___contextBuffer = this.___canvasBuffer.getContext("2d");
            },
            ___drawBuffer: function () {
                this.P_iterator("draw", this.___contextBuffer);
            }
        },
        Public: {
            setCanvas: function () {
                this.P_canvas = document.getElementById("mapLayerCanvas");
                //width、height在html中设置！
                var css = {
                    "position": "absolute",
                    "top": bomberConfig.canvas.TOP,
                    "left": bomberConfig.canvas.LEFT,
                    "border": "1px solid blue",
                    "z-index": 0
                };

                $("#mapLayerCanvas").css(css);
                //缓冲canvas的css也要设置！
                $("#mapLayerCanvas_buffer").css(css);
            },
            init: function () {
                this.base();

                //*双缓冲

                //获得缓冲canvas
                this.___getCanvasBuffer();
                //获得缓冲context
                this.___getContextBuffer();
            },
            draw: function () {
                this.___drawBuffer();
                this.P_context.drawImage(this.___canvasBuffer, 0, 0);
            },
            clear: function () {
                this.P_context.clearRect(0, 0, bomberConfig.canvas.WIDTH, bomberConfig.canvas.HEIGHT);
                this.___contextBuffer.clearRect(0, 0, bomberConfig.canvas.WIDTH, bomberConfig.canvas.HEIGHT);
            },
            change: function () {
                this.setStateNormal();
            },
            changeSpriteImg: function (x, y, img) {
                var index = y * window.bomberConfig.map.COL + x;
                this.getChildAt(index).bitmap.img = img;
            },
            run: function () {
                if (this.P_isChange()) {
                    this.clear();
                    this.draw();
                }
            }
        }
    });

    window.MapLayer = MapLayer;
}());