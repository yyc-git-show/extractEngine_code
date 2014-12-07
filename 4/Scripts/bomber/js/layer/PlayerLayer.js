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
            },
            ___setCanvas: function () {
                this.setCanvasByID("playerLayerCanvas");
                this.setPosition(bomberConfig.canvas.TOP, bomberConfig.canvas.LEFT);
                this.setZIndex(3);
            }
        },
        Public: {
            bombLayer: null,

            initData: function (layers) {
                this.bombLayer = layers.bombLayer;
                this.___setCanvas();
            },
            isChange: function () {
                if (this.___keyDown() || this.___spriteMoving() || this.___spriteStand()) {
                    return true;
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
            onStartLoop: function () {
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