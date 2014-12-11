(function () {
    var EnemySprite = YYC.Class(MoveSprite, {
        Init: function (data, bitmap) {
            this.P_context = new Context(this);
            YE.AStar.setDirection(4);

            this.base(data, bitmap);
        },
        Private: {
            ___findPath: function () {
                return YE.AStar.aCompute(window.terrainData, this.___computeCurrentCoordinate(), this.___computePlayerCoordinate()).path
            },
            //计算敌人精灵当前坐标
            ___computeCurrentCoordinate: function () {
                if (this.x % window.bomberConfig.WIDTH || this.y % window.bomberConfig.HEIGHT) {
                    throw new Error("当前坐标应该为方格尺寸的整数倍！");
                }

                return[
                    this.x / window.bomberConfig.WIDTH,
                    this.y / window.bomberConfig.HEIGHT
                ];
            },
            //计算玩家精灵的坐标（玩家精灵的当前坐标向下取整）
            ___computePlayerCoordinate: function () {
                return [
                    Math.floor(this.playerSprite.x / window.bomberConfig.WIDTH),
                   Math.floor(this.playerSprite.y / window.bomberConfig.HEIGHT)
                ];
            },
            ___getAndRemoveTarget: function () {
                return this.path.shift();
            },
            ___judgeAndSetDir: function (target) {
                //当前坐标
                var current = this.___computeCurrentCoordinate();

                //判断要移动的方向，调用相应的方法
                if (target[0] > current[0]) {
                    this.P_context.walkRight();
                }
                else if (target[0] < current[0]) {
                    this.P_context.walkLeft();
                }
                else if (target[1] > current[1]) {
                    this.P_context.walkDown();
                }
                else if (target[1] < current[1]) {
                    this.P_context.walkUp();
                }
                else {
                    this.P_context.stand();
                }
            }
        },
        Public: {
            //寻找的路径
            path: [],
            playerSprite: null,

            //判断是否和玩家人物精灵碰撞
            collideWithPlayer: function (sprite2) {
                var obj1 = {
                        x: this.x,
                        y: this.y,
                        width: this.bitmap.width,
                        height: this.bitmap.height
                    },
                    obj2 = {
                        x: sprite2.x,
                        y: sprite2.y,
                        width: sprite2.bitmap.width,
                        height: sprite2.bitmap.height
                    };

                if (YE.collision.col_Between_Rects(obj1, obj2)) {
                    throw new Error();
                }
            },
            setPlayerSprite: function (sprite) {
                this.playerSprite = sprite;
            },
            move: function () {
                this.P_context.move();
            },
            setDir: function () {
                //如果正在移动或者找不到路径，则返回
                if (this.moving || this.path.length === 0) {
                    return;
                }

                this.___judgeAndSetDir(this.___getAndRemoveTarget());
            },
            getPath: function () {
                if (this.moving) {
                    return;
                }
                if (this.path.length == 0) {
                    this.path = this.___findPath();
                }
            }
        }
    });

    window.EnemySprite = EnemySprite;
}());