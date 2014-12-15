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