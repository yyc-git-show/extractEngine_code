(function () {
    var MoveSprite = YYC.AClass(YE.Sprite, {
        Init: function (data, bitmap) {
            this.base(bitmap);
            //x/y坐标的最大值和最小值, 可用来限定移动范围.
            this.minX = data.minX;
            this.maxX = data.maxX;
            this.minY = data.minY;
            this.maxY = data.maxY;
            this.walkSpeed = data.walkSpeed;
            this.speedX = data.walkSpeed;
            this.speedY = data.walkSpeed;

            this.defaultAnimId = data.defaultAnimId;
            this.setPosition(data.x, data.y);
        },
        Protected: {
            //状态模式上下文类
            P_context: null
        },
        Private: {
            __getCurrentState: function () {
                var currentState = null;

                switch (this.defaultAnimId) {
                    case "stand_right":
                        currentState = new StandRightState();
                        break;
                    case "stand_left":
                        currentState = new StandLeftState();
                        break;
                    case "stand_down":
                        currentState = new StandDownState();
                        break;
                    case "stand_up":
                        currentState = new StandUpState();
                        break;
                    case "walk_down":
                        currentState = new WalkDownState();
                        break;
                    case "walk_up":
                        currentState = new WalkUpState();
                        break;
                    case "walk_right":
                        currentState = new WalkRightState();
                        break;
                    case "walk_left":
                        currentState = new WalkLeftState();
                        break;
                    default:
                        throw new Error("未知的状态");
                        break;
                }

                return currentState;
            },
            //计算移动次数
            __computeStep: function () {
                this.stepX = Math.ceil(bomberConfig.WIDTH / this.speedX);
                this.stepY = Math.ceil(bomberConfig.HEIGHT / this.speedY);
            },
            __isMoving: function () {
                return this.getPositionX() % bomberConfig.WIDTH !== 0 || this.getPositionY() % bomberConfig.HEIGHT !== 0
            }
        },
        Public: {
            //精灵的速度
            speedX: 0,
            speedY: 0,

            //精灵的坐标区间
            minX: 0,
            maxX: 9999,
            minY: 0,
            maxY: 9999,

            //精灵的方向系数：
            //往下走dirY为正数，往上走dirY为负数；
            //往右走dirX为正数，往左走dirX为负数。
            dirX: 0,
            dirY: 0,

            //定义sprite走路速度的绝对值
            walkSpeed: 0,

            //一次移动步长中的需要移动的次数
            stepX: 0,
            stepY: 0,

            //一次移动步长中已经移动的次数
            moveIndex_x: 0,
            moveIndex_y: 0,

            //是否正在移动标志（坐标移动标志）
            moving: false,

            //站立标志
            stand: false,

            //默认的Animation的Id , string类型
            defaultAnimId: null,

            initData: function () {
                this.P_context.setPlayerState(this.__getCurrentState());
                this.__computeStep();
            },
            draw: function (context) {
                this.drawCurrentFrame(context);
            },

            //获得当前坐标对应的方格坐标
            getCurrentCellPosition: function () {
                if (this.__isMoving()) {
                    throw new Error("精灵正在移动且未完成一个移动步长");
                }

                return this.getCellPosition(this.getPositionX(), this.getPositionY());
            }     ,
            //获得坐标对应的方格坐标（向下取值）
            getCellPosition: function (x, y) {
                return {
                    x: Math.floor(x / bomberConfig.WIDTH),
                    y: Math.floor(y / bomberConfig.HEIGHT)
                }
            }
        },
        Abstract: {
            //移动
            //负责计算精灵的坐标x、y；实现移动的特殊限制（如一次移动一个移动步长）等。
            move: function () {
            },
            //设置方向
            //监听keyEvent，设置方向；进行碰撞检测，判断是否可移动；
            setDir: function () {
            }
        }
    });

    window.MoveSprite = MoveSprite;
}());