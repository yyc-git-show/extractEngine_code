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
                this.iterator("draw", this.___contextBuffer);
            },
            ___setCanvas: function () {
                //width、height在html中设置！
                var css = {
                    "position": "absolute",
                    "top": bomberConfig.canvas.TOP,
                    "left": bomberConfig.canvas.LEFT,
                    "border": "1px solid blue",
                    "z-index": 0
                };

                //缓冲canvas的css也要设置！
                $("#mapLayerCanvas_buffer").css(css);

                this.setCanvasByID("mapLayerCanvas");
                this.setPosition(bomberConfig.canvas.TOP, bomberConfig.canvas.LEFT);
                this.setZIndex(0);
            }
        },
        Public: {
            initData: function (layers) {
                //*双缓冲

                //获得缓冲canvas
                this.___getCanvasBuffer();
                //获得缓冲context
                this.___getContextBuffer();

                this.___setCanvas();
            },
            draw: function () {
                this.___drawBuffer();
                this.getContext().drawImage(this.___canvasBuffer, 0, 0);

            },
            clear: function () {
                this.base();

                this.___contextBuffer.clearRect(0, 0, bomberConfig.canvas.WIDTH, bomberConfig.canvas.HEIGHT);
            },
            isChange: function () {
                return false;
            },
            changeSpriteImg: function (x, y, img) {
                var index = y * window.bomberConfig.map.COL + x;
                this.getChildAt(index).setImg(img);
            }
        }
    });

    window.MapLayer = MapLayer;
}());