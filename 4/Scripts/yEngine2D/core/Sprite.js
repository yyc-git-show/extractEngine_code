(function () {
    namespace("YE").Sprite = YYC.AClass({
        Init: function (bitmap) {
            this.ye_bitmap = bitmap;

            this.ye_animationFrame = YE.AnimationFrame.create();
        },
        Private: {
            ye_animationFrame: null,
            //精灵的坐标
            ye_x: 0,
            ye_y: 0,
            ye_bitmap: null,

            //更新帧动画
            ye_updateFrame: function (deltaTime) {
                if (this.currentAnim) {
                    this.currentAnim.update(deltaTime);
                }
            }
        },
        Public: {
            currentAnim: null,

            //获得精灵图片对象
            getImg: function () {
                return this.ye_bitmap.img;
            },
            //获得精灵宽度
            getWidth: function () {
                return this.ye_bitmap.width;
            },
            //获得精灵高度
            getHeight: function () {
                return this.ye_bitmap.height;
            },
            getHeight: function () {
                return this.ye_bitmap.height;
            },
            setBitmap: function (bitmap) {
                this.ye_bitmap = bitmap;
            },
            setImg: function (img) {
                this.ye_bitmap.img = img;
            },
            getAnimationFrame: function () {
                return this.ye_animationFrame;
            },
            setAnim: function (animName) {
                this.currentAnim = this.ye_animationFrame.getAnim(animName);
            },
            getCurrentFrame: function () {
                if (this.currentAnim) {
                    return this.currentAnim.getCurrentFrame();
                }

                return null;
            },
            //重置当前帧
            resetCurrentFrame: function (index) {
                this.currentAnim && this.currentAnim.setCurrentFrame(index);
            },

            setPosition: function (x, y) {
                this.ye_x = x;
                this.ye_y = y;
            },
            setPositionX: function (x) {
                this.ye_x = x;
            },
            setPositionY: function (y) {
                this.ye_y = y;
            },
            getPositionX: function () {
                return this.ye_x;
            },
            getPositionY: function () {
                return this.ye_y;
            },
            init: function () {
                this.initData();
            },
            //绘制当前帧
            drawCurrentFrame: function (context) {
                var frame = this.getCurrentFrame();

                context.drawImage(
                    frame.getImg(),
                    frame.getX(), frame.getY(), frame.getWidth(), frame.getHeight(),
                    this.ye_x, this.ye_y, this.ye_bitmap.width, this.ye_bitmap.height
                );
            },
            update: function () {
                this.ye_updateFrame(1000 / YE.Director.getInstance().getFps());
            },

            Virtual: {
                initData: function () {
                },
                draw: function (context) {
                    context.drawImage(this.ye_bitmap.img, this.ye_x, this.ye_y, this.ye_bitmap.width, this.ye_bitmap.height);
                },
                clear: function (context) {
                    context.clearRect(this.getPositionX(), this.getPositionY(), this.getWidth(), this.getHeight());
                }
            }
        },
        Static: {
            create: function (bitmap) {
                var T = YYC.Class(YE.Sprite, {
                    Init: function (bitmap) {
                        this.base(bitmap);
                    },
                    Public: {
                    }
                });

                return new T(bitmap);
            }
        }
    });
}());
