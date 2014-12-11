(function () {
    var PlayerLayer = YYC.Class(CharacterLayer, {
        Init: function (deltaTime) {
            this.base(deltaTime);
        },
        Private: {
            ___keyDown: function () {
                if (keyState[YE.Event.KeyCodeMap.A] === true || keyState[YE.Event.KeyCodeMap.D] === true
                    || keyState[YE.Event.KeyCodeMap.W] === true || keyState[YE.Event.KeyCodeMap.S] === true) {
                    return true;
                }
                else {
                    return false;
                }
            },
            ___spriteMoving: function () {
                return this.getChildAt(0).moving
            },
            ___spriteStand: function () {
                if (this.getChildAt(0).stand) {
                    this.getChildAt(0).stand = false;
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        Public: {
            bombLayer: null,

            setCanvas: function () {
                this.P_canvas = document.getElementById("playerLayerCanvas");

                $("#playerLayerCanvas").css({
                    "position": "absolute",
                    "top": bomberConfig.canvas.TOP,
                    "left": bomberConfig.canvas.LEFT,
                    "border": "1px solid red",
                    "z-index": 3
                });
            },
            init: function (layers) {
                this.base();

                this.bombLayer = layers.bombLayer;
            },
            change: function () {
                if (this.___keyDown() || this.___spriteMoving() || this.___spriteStand()) {
                    this.base();
                }
            },
            createAndAddBomb: function () {
                var bomb = this.getChildAt(0).createBomb();
                var self = this;

                if (!bomb) {
                    return false;
                }

                this.bombLayer.addChild(bomb);
                //3s后炸弹爆炸
                setTimeout(function () {
                    if (!bomb.exploded) {
                        self.bombLayer.explode(bomb);
                    }
                }, 3000);

                return bomb;
            },
            run: function () {
                if (keyState[YE.Event.KeyCodeMap.SPACE]) {
                    this.createAndAddBomb();
                    keyState[YE.Event.KeyCodeMap.SPACE] = false;
                }

                this.base();
            }
        }
    });

    window.PlayerLayer = PlayerLayer;
}());