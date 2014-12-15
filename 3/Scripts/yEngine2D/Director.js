(function () {
    var _instance = null;
    var GameState = {
        NORMAL: 0,
        STOP: 1
    };
    var  STARTING_FPS = 60;

    namespace("YE").Director = YYC.Class({
        Private: {
            _startTime: 0,
            _lastTime: 0,

            _fps: 60,

            _scene: null,
            //内部游戏状态
            _gameState: null,


            _getTimeNow: function () {
                return +new Date();
            },
            _run: function (time) {
                var self = this;

                this._loopBody(time);

                if (this._gameState === GameState.STOP) {
                    return;
                }

                window.requestNextAnimationFrame(function (time) {
                    self._run(time);
                });
            },
            _loopBody: function (time) {
                this._tick(time);

                this.onStartLoop();
                this._scene.run();
                this._scene.change();

                this.onEndLoop();
            },
            _tick: function (time) {
                this._updateFps(time);
                this.gameTime = this._getTimeNow() - this._startTime;
                this._lastTime = time;
            },
            _updateFps: function (time) {
                if (this._lastTime === 0) {
                    this._fps = STARTING_FPS;
                }
                else {
                    this._fps = 1000 / (time - this._lastTime);
                }
            }
        },
        Public: {
            gameTime: null,


            start: function () {
                var self = this;

                this._startTime = this._getTimeNow();

                window.requestNextAnimationFrame(function (time) {
                    self._run(time);
                });
            },
            setScene: function (scene) {
                this._scene = scene;
            },
            getFps: function () {
                return this._fps;
            },
            stop: function () {
                this._gameState = GameState.STOP;
            },


            //*钩子

            init: function () {
            },
            onStartLoop: function () {
            },
            onEndLoop: function () {
            }

        },


        Static: {
            getInstance: function () {
                if (_instance === null) {
                    _instance = new this();
                }
                return _instance;
            }
        }
    });
}());
