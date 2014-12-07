/**YEngine2D 单个动画帧类
 * 序列帧动画信息，它存储了所有的单帧信息，
 * 它存储一个动画的所有帧信息
 * 可以对该动画的单帧信息进行管理（如设置循环次数，设置延迟时间等）。
 *
 * 作者：YYC
 * 日期：2014-01-11
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    namespace("YE").Animation = YYC.Class({
        Init: function (frames, durationPerFrame) {
            this.ye_frames = frames;
            this.ye_durationPerFrame = durationPerFrame;
        },
        Private: {
            ye_frames: null,
            ye_durationPerFrame: null
        },
        Public: {
            getFrames: function () {
                return this.ye_frames;
            },
            getDurationPerFrame: function () {
                return this.ye_durationPerFrame;
            }
        } ,
        Static: {
            create: function(frames, durationPerFrame){
                return new this(frames, durationPerFrame);
            }
        }
    });
}());