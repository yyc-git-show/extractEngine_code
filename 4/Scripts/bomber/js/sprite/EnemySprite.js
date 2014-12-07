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
                if (this.getPositionX() % window.bomberConfig.WIDTH || this.getPositionY() % window.bomberConfig.HEIGHT) {
                    throw new Error("当前坐标应该为方格尺寸的整数倍！");
                }

                return[
                    this.getPositionX() / window.bomberConfig.WIDTH,
                    this.getPositionY() / window.bomberConfig.HEIGHT
                ];
            },
            //计算玩家精灵的坐标（玩家精灵的当前坐标向下取整）
            ___computePlayerCoordinate: function () {
                return [
                    Math.floor(this.playerSprite.getPositionX() / window.bomberConfig.WIDTH),
                    Math.floor(this.playerSprite.getPositionY() / window.bomberConfig.HEIGHT)
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
                var obj1 = YE.rect(this.getPositionX(), this.getPositionY(), this.getWidth(), this.getHeight()),
                    obj2 = YE.rect(sprite2.getPositionX(), sprite2.getPositionY(), sprite2.getWidth(), sprite2.getHeight());

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
            },
            initData: function () {
                this.base();

                //一个动作在图片中的宽度
                var width = bomberConfig.enemy.WIDTH,
                //一个动作在图片中的高度
                    height = bomberConfig.enemy.HEIGHT,
                //一个动作的偏移量
                    offset = {
                        x: bomberConfig.enemy.offset.X,
                        y: bomberConfig.enemy.offset.Y
                    },
                //一个动作横向截取的长度
                    sw = bomberConfig.enemy.SW,
                //一个动作纵向截取的长度
                    sh = bomberConfig.enemy.SH;


                var frame1 = YE.Frame.create(this.getImg(), YE.rect(offset.x, offset.y, sw, sh));  //将图片中每一帧利用rect切出来保存到精灵帧中
                var frame2 = YE.Frame.create(this.getImg(), YE.rect(offset.x + width, offset.y, sw, sh));
                var frame3 = YE.Frame.create(this.getImg(), YE.rect(offset.x + 2 * width, offset.y, sw, sh));
                var frame4 = YE.Frame.create(this.getImg(), YE.rect(offset.x + 3 * width, offset.y, sw, sh));

                var frame5 = YE.Frame.create(this.getImg(), YE.rect(offset.x, offset.y + 3 * height, sw, sh));  //将图片中每一帧利用rect切出来保存到精灵帧中
                var frame6 = YE.Frame.create(this.getImg(), YE.rect(offset.x + width, offset.y + 3 * height, sw, sh));
                var frame7 = YE.Frame.create(this.getImg(), YE.rect(offset.x + 2 * width, offset.y + 3 * height, sw, sh));
                var frame8 = YE.Frame.create(this.getImg(), YE.rect(offset.x + 3 * width, offset.y + 3 * height, sw, sh));

                //right
                var frame9 = YE.Frame.create(this.getImg(), YE.rect(offset.x, offset.y + 2 * height, sw, sh));  //将图片中每一帧利用rect切出来保存到精灵帧中
                var frame10 = YE.Frame.create(this.getImg(), YE.rect(offset.x + width, offset.y + 2 * height, sw, sh));
                var frame11 = YE.Frame.create(this.getImg(), YE.rect(offset.x + 2 * width, offset.y + 2 * height, sw, sh));
                var frame12 = YE.Frame.create(this.getImg(), YE.rect(offset.x + 3 * width, offset.y + 2 * height, sw, sh));

                //left
                var frame13 = YE.Frame.create(this.getImg(), YE.rect(offset.x, offset.y + height, sw, sh));  //将图片中每一帧利用rect切出来保存到精灵帧中
                var frame14 = YE.Frame.create(this.getImg(), YE.rect(offset.x + width, offset.y + height, sw, sh));
                var frame15 = YE.Frame.create(this.getImg(), YE.rect(offset.x + 2 * width, offset.y + height, sw, sh));
                var frame16 = YE.Frame.create(this.getImg(), YE.rect(offset.x + 3 * width, offset.y + height, sw, sh));


                //stand
                var frame17 = YE.Frame.create(this.getImg(), YE.rect(offset.x, offset.y + 2 * height, sw, sh));  //将图片中每一帧利用rect切出来保存到精灵帧中
                var frame18 = YE.Frame.create(this.getImg(), YE.rect(offset.x, offset.y + height, sw, sh));
                var frame19 = YE.Frame.create(this.getImg(), YE.rect(offset.x, offset.y + 3 * height, sw, sh));
                var frame20 = YE.Frame.create(this.getImg(), YE.rect(offset.x, offset.y, sw, sh));


                var animFrames1 = [];
                var animFrames2 = [];
                var animFrames3 = [];
                var animFrames4 = [];

                var animFrames5 = [];
                var animFrames6 = [];
                var animFrames7 = [];
                var animFrames8 = [];
//                var animFrames1 = [];
//                var animFrames2 = [];
//                var animFrames1 = [];
//                var animFrames2 = [];

                animFrames1.push(frame1);
                animFrames1.push(frame2);
                animFrames1.push(frame3);
                animFrames1.push(frame4);

                animFrames2.push(frame5);
                animFrames2.push(frame6);
                animFrames2.push(frame7);
                animFrames2.push(frame8);

                animFrames3.push(frame9);
                animFrames3.push(frame10);
                animFrames3.push(frame11);
                animFrames3.push(frame12);

                animFrames4.push(frame13);
                animFrames4.push(frame14);
                animFrames4.push(frame15);
                animFrames4.push(frame16);

                animFrames5.push(frame17);
                animFrames6.push(frame18);
                animFrames7.push(frame19);
                animFrames8.push(frame20);

                var animation1 = YE.Animation.create(animFrames1, 100);
                var animation2 = YE.Animation.create(animFrames2, 100);
                var animation3 = YE.Animation.create(animFrames3, 100);
                var animation4 = YE.Animation.create(animFrames4, 100);

                var animation5 = YE.Animation.create(animFrames5, 100);
                var animation6 = YE.Animation.create(animFrames6, 100);
                var animation7 = YE.Animation.create(animFrames7, 100);
                var animation8 = YE.Animation.create(animFrames8, 100);


//                var animationFrame = YE.AnimationFrame.create({
//                    "walk_down": animation1,
//                    "walk_up": animation2,
//                    "walk_right": animation3,
//                    "walk_left": animation4,
//
//                    "stand_right": animation5,
//                    "stand_left": animation6,
//                    "stand_up": animation7,
//                    "stand_down": animation8
//                });
//
//
//                this.setAnim(animationFrame);
//
//                this.runAnim("walk_down");


                var animationFrame = this.getAnimationFrame();

                animationFrame.addAnim("walk_down", YE.Animate.create(animation1));
                animationFrame.addAnim("walk_up", YE.Animate.create(animation2));
                animationFrame.addAnim("walk_right", YE.Animate.create(animation3));
                animationFrame.addAnim("walk_left", YE.Animate.create(animation4));
                animationFrame.addAnim("stand_right", YE.Animate.create(animation5));
                animationFrame.addAnim("stand_left", YE.Animate.create(animation6));
                animationFrame.addAnim("stand_up", YE.Animate.create(animation7));
                animationFrame.addAnim("stand_down", YE.Animate.create(animation8));

                this.setAnim("walk_down");
            }
        }
    });

    window.EnemySprite = EnemySprite;
}());