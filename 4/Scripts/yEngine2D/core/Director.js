(function () {
    namespace("YE").Director = YYC.Class({
        Private: {
            ye_startTime: 0,
            ye_lastTime: 0,
            ye_timerIndex:0,

            ye_fps: 60,

            ye_scene: null,
            //内部游戏状态
            ye_gameState: null,


            ye_getTimeNow: function () {
                return +new Date();
            },
            ye_run: function (time) {
                var self = this;

                this.ye_loopBody(time);

                if (this.ye_gameState === YE.Director.GameState.STOP) {
                    return;
                }

                window.requestNextAnimationFrame(function (time) {
                    self.ye_run(time);
                });
            },
            ye_loopBody: function (time) {
                this.ye_tick(time);

                this.ye_scene.onStartLoop();
                this.ye_scene.run();
                this.ye_scene.onEndLoop();
            },
            ye_tick: function (time) {
                this.ye_updateFps(time);
                this.gameTime = this.ye_getTimeNow() - this.ye_startTime;
                this.ye_lastTime = time;
            },
            ye_updateFps: function (time) {
                if (this.ye_lastTime === 0) {
                    this.ye_fps = YE.Director.STARTING_FPS;
                }
                else {
                    this.ye_fps = 1000 / (time - this.ye_lastTime);
                }
            }
        },
        Public: {
            gameTime: null,

            runWithScene: function (scene) {
                var self = this;

                scene.init();
                this.setScene(scene);
                this.ye_startTime = this.ye_getTimeNow();

                window.requestNextAnimationFrame(function (time) {
                    self.ye_run(time);
                });
            },
            setScene: function (scene) {
                this.ye_scene = scene;
            },
            getFps: function () {
                return this.ye_fps;
            },
            stop: function () {
                this.ye_gameState = YE.Director.GameState.STOP;
                YE.Tool.async.clearAllTimer(this.ye_timerIndex);
            },
            setTimerIndex: function (index) {
                this.ye_timerIndex = index;
            }
        },


        Static: {
            _instance: null,
            STARTING_FPS:60,
            GameState: {
                NORMAL: 0,
                STOP: 1
            },

            getInstance: function () {
                if (this._instance === null) {
                    this._instance = new this();
                }
                return this._instance;
            }
        }
    });
}());
