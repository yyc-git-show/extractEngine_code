(function () {
    namespace("YE").Frame = YYC.Class({
        Init: function (img, rect) {
            this.ye_img = img;
            this.ye_rect = rect;
        },
        Private: {
            ye_img: null,
            ye_rect: null
        },
        Public: {
            getImg: function () {
                return this.ye_img;
            },
            getX: function () {
                return this.ye_rect.origin.x;
            },
            getY: function () {
                return this.ye_rect.origin.y;
            },
            getWidth: function () {
                return this.ye_rect.size.width;
            },
            getHeight: function () {
                return this.ye_rect.size.height;
            }
        },
        Static: {
            create: function (bitmap, rect) {
                return new this(bitmap, rect);
            }
        }
    });
}());
