/**YEngine2D 图片预加载类
 * 作者：YYC
 * 日期：2013-12-21
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
namespace("YE").ImgLoader = YYC.Class({
    Init: function () {
    },
    Private: {
        _images: [],
        _imgs: {},

        _checkImages: function (images) {
            var i = 0,
                len = 0;

            if (YE.Tool.judge.isArray(images)) {
                for (len = images.length; i < len; i++) {
                    if (images[i].id === undefined || images[i].url === undefined) {
                        throw new Error("应该包含id和url属性");
                    }
                }
            }
            else {
                if (images.id === undefined || images.url === undefined) {
                    throw new Error("应该包含id和url属性");
                }
            }
        },
        _onload: function (i) {
            //        console.log("加载图片完成");
            clearTimeout(this.timerID);
            this.currentLoad++;
//            this.config.onstep(this.currentLoad, this.imgCount);
            this.onloading(this.currentLoad, this.imgCount);

            if (this.currentLoad === this.imgCount) {
//                this.config.onload(this.imgCount);
                this.onload(this.imgCount);
                this.onload_game();

                //this.dispose();   //如果加载完毕后调用dispose，则加载完毕后_imgs就为空了！（用get获取不到了！）
            }
        },
        _loadImg: function () {
            var img = null,
                i = 0,
                len = this._images.length,
            //_imgs = this._imgs,
                self = this,
                image = null;

            for (i = 0;i < len; i++) {
                img = this._images[i];
                image = this._imgs[img.id] = new Image();
                //_imgs.push(new Image());
                /*
                 经过对多个浏览器版本的测试，发现ie、opera下，当图片加载过一次以后，如果再有对该图片的请求时，由于浏览器已经缓存住这张图

                 片了，不会再发起一次新的请求，而是直接从缓存中加载过来。对于 firefox和safari，它们试图使这两种加载方式对用户透明，同样

                 会引起图片的onload事件，而ie和opera则忽略了这种同一性，不会引起图片的onload事件，因此上边的代码在它们里边不能得以实现效果。

                 确实，在ie，opera下，对于缓存图片的初始状态，与firefox和safari，chrome下是不一样的（有兴趣的话，可以在不同浏览器下，测试一下在给img的src赋值缓存图片的url之前，img的状态），
                 但是对onload事件的触发，却是一致的，不管是什么浏览器。

                 产生这个问题的根本原因在于，img的src赋值与 onload事件的绑定，顺序不对（在ie和opera下，先赋值src，再赋值onload，因为是缓存图片，就错过了onload事件的触发）。
                 应该先绑定onload事件，然后再给src赋值。
                 */
                image.onload = function () {
                    this.onload = null;     //解决ie内存泄露  此处this指代_imgs[i]

                    YE.Tool.func.bind(self, self._onload)();
                };
                //_imgs[i].src = c.images[i];
                image.src = img.url;

                this.timerID = (function (i) {
                    return setTimeout(function () {
                        if (i == self.currentLoad) {
                            //_imgs[i].src = c.images[i];
                            image.src = img.url;
                        }
                    }, 500);
                })(i);
            }
        }
    },
    Public: {
        imgCount: 0,
        currentLoad: 0,
        timerID: 0,

        get: function (id) {
            return this._imgs[id];
        },

        done: function () {
            this._loadImg();

        },
        load: function (images) {
            this._checkImages(images);

            if (YE.Tool.judge.isArray(images)) {
                this._images = this._images.concat(images);
            }
            else {
                this._images.push(images);
            }
            this.imgCount = this._images.length;
        },

        dispose: function () {
            var i, _imgs = this._imgs;
            //for (i = 0; i < _imgs.length; i++) {
            for (i in _imgs) {
                _imgs[i].onload = null;
                _imgs[i] = null;
            }
            //_imgs.length = 0;
            this.config = null;
        },

        //*内部钩子

        onload_game: function () {
        },

        //*外部钩子

        onloading: function (currentLoad, imgCount) {
        },
        onload: function (imgCount) {
        }
    }  ,
    Static: {
        create: function(){
            return new this();
        }
    }
})
;
