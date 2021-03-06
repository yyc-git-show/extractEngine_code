(function () {
    var _instance = null;

    namespace("YE").Main = YYC.Class({
        Init: function () {
            this._imgLoader = new YE.ImgLoader();
        },
        Private: {
            _imgLoader: null,

            _prepare: function () {
                this.loadResource();

                this._imgLoader.onloading = this.onloading;
                this._imgLoader.onload = this.onload;

                this._imgLoader.onload_game = function () {
                    var director = YE.Director.getInstance();

                    director.init();
                    director.start();
                }
            }
        },
        Public: {
            init: function () {
                this._prepare();
                this._imgLoader.done();
            },
            getImg: function (id) {
                return this._imgLoader.get(id);
            },
            load: function (images) {
                this._imgLoader.load(images);
            },

            //* 钩子

            loadResource: function () {
            },
            onload: function () {
            },
            onloading: function (currentLoad, imgCount) {
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

