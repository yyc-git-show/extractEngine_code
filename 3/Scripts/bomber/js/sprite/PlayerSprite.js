(function () {
    var PlayerSprite = YYC.Class(MoveSprite, {
        Init: function (data, bitmap) {
            this.base(data, bitmap);
            this.P_context = new Context(this);
        },
        Private: {
            __allKeyUp: function () {
                return window.keyState[YE.Event.KeyCodeMap.A] === false && window.keyState[YE.Event.KeyCodeMap.D] === false
                    && window.keyState[YE.Event.KeyCodeMap.W] === false && window.keyState[YE.Event.KeyCodeMap.S] === false;
            },
            __judgeAndSetDir: function () {
                if (window.keyState[YE.Event.KeyCodeMap.A] === true) {
                    this.P_context.walkLeft();
                }
                else if (window.keyState[YE.Event.KeyCodeMap.D] === true) {
                    this.P_context.walkRight();
                }
                else if (window.keyState[YE.Event.KeyCodeMap.W] === true) {
                    this.P_context.walkUp();
                }
                else if (window.keyState[YE.Event.KeyCodeMap.S] === true) {
                    this.P_context.walkDown();
                }
            },
            __changeTerrainData: function () {
                var stop = bomberConfig.map.terrain.stop,
                    position = this.getCurrentCellPosition();

                terrainDataOperate.setTerrainData(position.x, position.y, stop);
            }
        },
        Public: {
            //已放置的炸弹数（未爆炸）
            bombNum: 0,

            move: function () {
                this.P_context.move();
            },
            setDir: function () {
                if (this.moving) {
                    return;
                }
                if (this.__allKeyUp()) {
                    this.P_context.stand();
                }
                else {
                    this.__judgeAndSetDir();
                }
            },
            createBomb: function () {
                if (this.bombNum === 3) {
                    return null;
                }

                return this.P_context.createBomb();
            }
        }
    });

    window.PlayerSprite = PlayerSprite;
}());