(function () {
    namespace("YE").Scene = YYC.AClass({
        Init: function () {
            this.ye_layers = YE.Hash.create();
        },
        Private: {
            ye_layers: null,

            ye_getLayers: function () {
                return this.ye_layers.getChilds();
            },
            ye_initLayer: function () {
                this.ye_layers.iterator("init", this.ye_getLayers());
            }
        },
        Public: {
            addLayer: function (name, layer) {
                this.ye_layers.add(name, layer);

                return this;
            },
            getLayer: function (name) {
                return this.ye_layers.getValue(name);
            },
            run: function () {
                this.ye_layers.iterator("onStartLoop");

                this.ye_layers.iterator("run");
                this.ye_layers.iterator("change");

                this.ye_layers.iterator("onEndLoop");
            },
            init: function () {
                this.initData();

                this.ye_initLayer();
            },

            Virtual: {
                initData: function () {
                },
                onStartLoop: function () {
                },
                onEndLoop: function () {
                }
            }
        },
        Static: {
            create: function () {
                var T = YYC.Class(YE.Scene, {
                    Init: function () {
                        this.base();
                    },
                    Public: {
                    }
                });

                return new T();
            }
        }
    });
}());
