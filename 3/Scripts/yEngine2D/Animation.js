(function () {
    namespace("YE").Animation = YYC.Class({
        Init: function (config) {
            this._frames = YE.Tool.array.clone(config);
            this._init();
        },
        Private: {
            //帧数据
            _frames: null,
            _frameCount: -1,
            _img: null,
            _currentFrame: null,
            _currentFrameIndex: -1,
            _currentFramePlayed: -1,

            _init: function () {
                this._frameCount = this._frames.length;

                this.setCurrentFrame(0);
            }
        },
        Public: {
            setCurrentFrame: function (index) {
                this._currentFrameIndex = index;
                this._currentFrame = this._frames[index];
                this._currentFramePlayed = 0;
            },
            /**
             * 更新当前帧
             * @param deltaTime 主循环的持续时间
             */
            update: function (deltaTime) {
                //如果没有duration属性（表示动画只有一帧），则返回（因为不需要更新当前帧）
                if (this._currentFrame.duration === undefined) {
                    return;
                }

                //判断当前帧是否播放完成
                if (this._currentFramePlayed >= this._currentFrame.duration) {
                    //播放下一帧

                    if (this._currentFrameIndex >= this._frameCount - 1) {
                        //当前是最后一帧,则播放第0帧
                        this._currentFrameIndex = 0;
                    } else {
                        //播放下一帧
                        this._currentFrameIndex++;
                    }
                    //设置当前帧
                    this.setCurrentFrame(this._currentFrameIndex);

                } else {
                    //增加当前帧的已播放时间.
                    this._currentFramePlayed += deltaTime;
                }
            },
            getCurrentFrame: function () {
                return this._currentFrame;
            }
        },

        Static: {
            create: function(config){
                return new this(config);
            }
        }

    });
}());
