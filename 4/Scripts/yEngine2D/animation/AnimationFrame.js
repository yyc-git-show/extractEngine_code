/**YEngine2D 精灵动画帧类
 * 存储精灵所有的动画帧信息，它为hash结构，元素为Animation
 *
 * 作者：YYC
 * 日期：2014-01-11
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    namespace("YE").AnimationFrame = YYC.Class({
        Init: function () {
            this._spriteFrames = YE.Hash.create();
        },
        Private: {
            _spriteFrames: null
        },
        Public: {
            getAnims: function () {
                return this._spriteFrames.getChilds();
            },
            getAnim: function (animName) {
                return this._spriteFrames.getValue(animName);
            },
            addAnim: function (animName, anim) {
                anim.init();
                this._spriteFrames.add(animName, anim);
            }
        },
        Static: {
            create: function () {
                return new this();
            }
        }
    });
}());