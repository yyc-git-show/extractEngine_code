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
            }    ,
            initData: function () {
                this.base();

                //一个动作在图片中的宽度
                var width = bomberConfig.player.WIDTH,
                //一个动作在图片中的高度
                    height = bomberConfig.player.HEIGHT,
                //一个动作的偏移量
                    offset = {
                        x: bomberConfig.player.offset.X,
                        y: bomberConfig.player.offset.Y
                    },
                //一个动作横向截取的长度
                    sw = bomberConfig.player.SW,
                //一个动作纵向截取的长度
                    sh = bomberConfig.player.SH;


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

    window.PlayerSprite = PlayerSprite;
}());