/**YEngine2D 层类
 * 作者：YYC
 * 日期：2013-12-28
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    namespace("YE").Layer = YYC.AClass({
        Init: function (id, zIndex, position) {
            if (arguments.length === 3) {
                this.setCanvasByID(id);
                this.setZIndex(zIndex);
                this.setPosition(position.x, position.y);
            }

            this.ye_state =  YE.Layer.State.CHANGE; //默认为change

            this.ye_childs = YE.Collection.create();
        },
        Private: {
            ye_canvas: null,
            ye_context: null,
            ye_state: null,
            ye_childs: null,

            ye_getContext: function () {
                this.ye_context = this.ye_canvas.getContext("2d");
            },
            ye_initCanvas: function () {
                //画布设置为绝对定位
                this.ye_canvas.style.position = "absolute";
            },
            ye_isChange: function () {
                return this.ye_state === YE.Layer.State.CHANGE;
            },
            ye_isNormal: function () {
                return this.ye_state === YE.Layer.State.NORMAL;
            }
        },
        Public: {
            remove: function (sprite) {
                this.ye_childs.remove(function (e, obj) {
                    if (e.getPositionX() === obj.getPositionX() && e.getPositionY() === obj.getPositionY()) {
                        return true;
                    }
                    return false;
                }, sprite);
            },
            removeAll: function () {
                this.ye_childs.removeAll();
            },
            addChild: function (element) {
                this.ye_childs.addChild(element);
                element.init();
            },
            addChilds: function (elements) {
                this.ye_childs.addChilds(elements);
                elements.forEach(function (e) {
                    e.init();
                });
            },
            getChildAt: function (index) {
                return this.ye_childs.getChildAt(index);
            },
            setStateNormal: function () {
                this.ye_state = YE.Layer.State.NORMAL;
            },
            setStateChange: function () {
                this.ye_state = YE.Layer.State.CHANGE;
            },
            setCanvasByID: function (canvasID) {
                this.ye_canvas = document.getElementById(canvasID);
            },
            //设置画布宽度
            setWidth: function (width) {
                this.ye_canvas.width = width;
            },
            //设置画布高度
            setHeight: function (height) {
                this.ye_canvas.height = height;
            },
            //设置画布层级顺序
            setZIndex: function (zIndex) {
                this.ye_canvas.style.zIndex = zIndex;
            },
            //设置画布坐标
            setPosition: function (x, y) {
                this.ye_canvas.style.top = x.toString() + "px";
                this.ye_canvas.style.left = y.toString() + "px";
            },
            init: function (layers) {
                this.initData(layers);

                this.ye_getContext();
                this.ye_initCanvas();
            },
            getContext: function () {
                return this.ye_context;
            },
            //游戏主循环调用的方法
            run: function () {
                this.update();

                if (this.ye_isChange()) {
                    this.clear();
                    this.draw();
                    this.onafterDraw();
                    this.setStateNormal();
                }
            },
            change: function () {
                if (this.isChange() === true) {
                    this.setStateChange();
                }
                else {
                    this.setStateNormal();
                }
            },
            update: function () {
                this.iterator("update");
            },
            iterator: function (handler, args) {
                this.ye_childs.iterator.apply(this.ye_childs, arguments);
            },
            getChilds: function () {
                return this.ye_childs.getChilds();
            },
            getCanvasWidth: function () {
                return this.ye_canvas.width;
            },
            getCanvasHeight: function () {
                return this.ye_canvas.height;
            },

            Virtual: {
                initData: function (layers) {
                },
                clear: function () {
                    this.ye_context.clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
                },
                draw: function () {
                    this.iterator("draw", this.getContext());
                },
                isChange: function () {
                    return true;
                },
                onafterDraw: function () {
                },
                onStartLoop: function () {
                },
                onEndLoop: function () {
                }
            }
        },
        Static: {
            State: {
                NORMAL: 0,
                CHANGE: 1
            },
            
            create: function (id, zIndex, position) {
                if (arguments.length === 3) {
                    var T = YYC.Class(YE.Layer, {
                        Init: function (id, zIndex, position) {
                            this.base(id, zIndex, position);
                        }
                    });
                    return new T(id, zIndex, position);
                }
                else {
                    var T = YYC.Class(YE.Layer, {
                        Init: function () {
                            this.base();
                        }
                    });
                    return new T();
                }
            }
        }
    });
}());