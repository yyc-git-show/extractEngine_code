(function () {
    var CharacterLayer = YYC.AClass(YE.Layer, {
        Private: {
            ___setDir: function () {
                this.iterator("setDir");
            },
            ___move: function () {
                this.iterator("move");
            }
        },
        Public: {
            onafterDraw: function () {
            },
            onStartLoop: function () {
                this.___setDir();
                this.___move();
            }
        }
    });

    window.CharacterLayer = CharacterLayer;
}());