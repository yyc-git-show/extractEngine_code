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