(function () {
    namespace("YE").Main = YYC.AClass({
        Init: function () {
            this.imgLoader = new YE.ImgLoader();
        },
        Private: {
            ye_prepare: function () {
                this.loadResource();
            }
        },
        Public: {
            imgLoader: null,

            init: function () {
                this.ye_prepare();
                this.imgLoader.done();
            },
            //* 钩子

            Virtual:{
                loadResource: function () {
                }
            }
        }
    });
}());

