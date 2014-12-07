/**YEngine2D 帧管理类
 * 作者：YYC
 * 日期：2014-01-11
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    namespace("YE").Animate = YYC.Class({
        Init: function (animation) {
            this.ye_anim = animation;

            this.ye_frames = YE.Collection.create();
        },
        Private: {
            ye_anim: null,
            ye_frames: null,
            ye_frameCount: 0,
            ye_duration: 0,
            ye_currentFrame: null,
            ye_currentFrameIndex: 0,
            ye_currentFramePlayed: 0
        },
        Public: {
            /**
             * 更新当前帧
             * @param deltaTime 主循环的持续时间
             */
            update: function (deltaTime) {
                //判断当前帧是否播放完成,
                if (this.ye_currentFramePlayed >= this.ye_duration) {
                    if (this.ye_currentFrameIndex >= this.ye_frameCount - 1) {
                        //当前是最后一帧,则播放第0帧
                        this.ye_currentFrameIndex = 0;
                    }
                    else {
                        //播放下一帧
                        this.ye_currentFrameIndex++;
                    }
                    //设置当前帧
                    this.setCurrentFrame(this.ye_currentFrameIndex);

                }
                else {
                    //增加当前帧的已播放时间.
                    this.ye_currentFramePlayed += deltaTime;
                }
            },
            getCurrentFrame: function () {
                return this.ye_currentFrame;
            },
            init: function () {
                this.ye_frames.addChilds(this.ye_anim.getFrames());
                this.ye_duration = this.ye_anim.getDurationPerFrame();

                this.ye_frameCount = this.ye_frames.getCount();

                this.setCurrentFrame(0);
            },
            setCurrentFrame: function (index) {
                this.ye_currentFrameIndex = index;
                this.ye_currentFrame = this.ye_frames.getChildAt(index);
                this.ye_currentFramePlayed = 0;
            }
        },
        Static: {
            create: function (animationFrame) {
                return new this(animationFrame);
            }
        }
    });
}());