(function () {
    var EnemyLayer = YYC.Class(CharacterLayer, {
        Init: function (deltaTime) {
            this.base(deltaTime);
        },
        Private: {
            __getPath: function () {
                this.iterator("getPath");
            },
            __setCanvas: function () {
                this.setCanvasByID("enemyLayerCanvas");
                this.setPosition(bomberConfig.canvas.TOP, bomberConfig.canvas.LEFT);
                this.setZIndex(3);
            }
        },
        Public: {
            playerLayer: null,

            initData: function (layers) {
                this.playerLayer = layers.playerLayer;
                //传入玩家人物精灵类
                this.iterator("setPlayerSprite", this.playerLayer.getChildAt(0));
                this.__setCanvas();
            },
            collideWithPlayer: function () {
                try {
                    this.iterator("collideWithPlayer", this.playerLayer.getChildAt(0));
                    return false;
                }
                catch (e) {
                    return true;
                }
            },

            onStartLoop: function () {
                if (this.collideWithPlayer()) {
                    window.gameState = window.bomberConfig.game.state.OVER;
                    return;
                }

                this.__getPath();

                this.base();
            }
        }
    });

    window.EnemyLayer = EnemyLayer;
}());