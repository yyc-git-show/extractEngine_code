(function () {
    var MapElementSprite = YYC.Class(YE.Sprite, {
        Init: function (data, bitmap) {
            this.base(bitmap);

            if (data) {
                this.setPosition(data.x, data.y);
            }
        },
        Protected: {
        },
        Private: {
        },
        Public: {
        }
    });

    window.MapElementSprite = MapElementSprite;
}());