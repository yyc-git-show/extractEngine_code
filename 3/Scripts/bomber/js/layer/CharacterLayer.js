(function () {
    var CharacterLayer = YYC.AClass(YE.Layer, {
        Init: function (deltaTime) {
            this.___deltaTime = deltaTime;
        },
        Private: {
            ___deltaTime: 0,

            ___update: function (deltaTime) {
                this.P_iterator("update", deltaTime);
            },
            ___setDir: function () {
                this.P_iterator("setDir");
            },
            ___move: function () {
                this.P_iterator("move");
            },
            ___render: function () {
                //判断__state是否为change状态，如果是则调用canvas绘制精灵。
                if (this.P_isChange()) {
                    this.clear();
                    this.___update(this.___deltaTime);
                    this.draw();
                    this.setStateNormal();
                }
            }
        },
        Public: {
            draw: function () {
                this.P_iterator("draw", this.P_context);
            },
            Virtual: {
                change: function () {
                    this.setStateChange();
                },
                run: function () {
                    this.___setDir();
                    this.___move();
                    this.___render();
                }
            }
        }
    });

    window.CharacterLayer = CharacterLayer;
}());