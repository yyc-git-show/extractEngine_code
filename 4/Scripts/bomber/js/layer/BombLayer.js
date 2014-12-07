(function () {
    var BombLayer = YYC.Class(YE.Layer, {
        Private: {
            ___hasBomb: function () {
                return this.getChilds().length > 0;
            },
            ___removeBomb: function (bomb) {
                //*注意顺序！

                bomb.clear(this.getContext());
                this.remove(bomb);
            },
            ___removeAllFire: function () {
                //*注意顺序！

                this.fireLayer.clear();
                this.fireLayer.removeAll();
            },
            ___removeEnemy: function (enemy) {
                //*注意顺序！

                enemy.clear(this.enemyLayer.getContext());
                this.enemyLayer.remove(enemy);
            },
            ___mapChange: function (mapChange) {
                if (mapChange) {
                    this.mapLayer.setStateChange();
                }
            },
            ___collideFireWithPlayer: function (bomb) {
                if (bomb.collideFireWithCharacter(this.playerLayer.getChildAt(0))) {
                    window.gameState = window.bomberConfig.game.state.OVER;
                }
            },
            ___collideFireWithEnemy: function (bomb) {
                var i = 0,
                    len = 0,
                    enemySprites = this.enemyLayer.getChilds();

                for (i = 0, len = enemySprites.length; i < len; i++) {
                    if (bomb.collideFireWithCharacter(enemySprites[i])) {
                        this.___removeEnemy(enemySprites[i]);
                    }
                }

                //如果敌人都被炸死了，则游戏胜利！
                if (this.enemyLayer.getChilds().length === 0) {
                    window.gameState = window.bomberConfig.game.state.WIN;
                }
            },
            ___handleCollid: function (bomb) {
                this.___collideFireWithPlayer(bomb)
                this.___collideFireWithEnemy(bomb);
            },
            ___explodeInEffectiveRange: function (bomb) {
                var self = this;

                this.iterator(function(eachBomb){
                    if (eachBomb.isInEffectiveRange.call(eachBomb, bomb)) {
                        self.explode(eachBomb);
                    }
                });
            } ,
            ___setCanvas: function () {
                this.setCanvasByID("bombLayerCanvas");
                this.setPosition(bomberConfig.canvas.TOP, bomberConfig.canvas.LEFT);
                this.setZIndex(1);
            }
        },
        Public: {
            fireLayer: null,
            mapLayer: null,
            playerLayer: null,
            enemyLayer: null,

            initData: function (layers) {
                this.fireLayer = layers.fireLayer;
                this.mapLayer = layers.mapLayer;
                this.playerLayer = layers.playerLayer;
                this.enemyLayer = layers.enemyLayer;
                this.___setCanvas();
            },
            explode: function (bomb) {
                var self = this,
                    result = null,
                    index = 0;

                //处理碰撞
                this.___handleCollid(bomb);

                result = bomb.explode();
                this.fireLayer.addChilds(result.fires);
                this.___mapChange(result.mapChange);
                this.___removeBomb(bomb);


                //炸弹爆炸时会引爆在火力范围内的炸弹。
                this.___explodeInEffectiveRange(bomb);

                //定时清空fireLayer（火焰消失）
                index = setTimeout(function () {
                    self.___removeAllFire();
                }, 300);

                YE.Director.getInstance().setTimerIndex(index);
            },
            isChange: function () {
                if (this.___hasBomb()) {
                    return true;
                }
            }
        }
    });

    window.BombLayer = BombLayer;
}());