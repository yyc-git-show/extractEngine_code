/**YEngine2D 入口Main
 * 作者：YYC
 * 日期：2013-12-21
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
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

