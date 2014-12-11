/**YEngine2D 层类
 * 作者：YYC
 * 日期：2013-12-28
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    /**
     * 枚举量移到Layer外面。
     * 因为如果放到Layer中，则在定义属性__state时，this.__State.CHANGE为undefined！
     * @type {{NORMAL: number, CHANGE: number}}
     */
    var State = {
        NORMAL: 0,
        CHANGE: 1
    };

    namespace("YE").Layer = YYC.AClass(YE.Collection, {
        Init: function () {
        },
        Private: {
            __state: State.CHANGE,   //默认为change

            __getContext: function () {
                this.P_context = this.P_canvas.getContext("2d");
            }
        },
        Protected: {
            //*共用的变量（可读、写）

            P_canvas: null,
            P_context: null,

            //*共用的方法（可读）

            P_isChange: function () {
                return this.__state === State.CHANGE;
            },
            P_isNormal: function () {
                return this.__state === State.NORMAL;
            },
            P_iterator: function (handler) {
                var args = Array.prototype.slice.call(arguments, 1),
                    nextElement = null;

                while (this.hasNext()) {
                    nextElement = this.next();
                    nextElement[handler].apply(nextElement, args);  //要指向nextElement
                }
                this.resetCursor();
            },
            P_render: function () {
                if (this.P_isChange()) {
                    this.clear();
                    this.draw();
                    this.setStateNormal();
                }
            }
        },
        Public: {
            remove: function (sprite) {
                this.base(function (e, obj) {
                    if (e.x === obj.x && e.y === obj.y) {
                        return true;
                    }
                    return false;
                }, sprite);
            },
            setStateNormal: function () {
                this.__state = State.NORMAL;
            },
            setStateChange: function () {
                this.__state = State.CHANGE;
            },
            Virtual: {
                init: function () {
                    this.__getContext();
                },
                clear: function (sprite) {
                    if (arguments.length === 0) {
                        this.P_iterator("clear", this.P_context);
                    }
                    else if (arguments.length === 1) {
                        sprite.clear(this.P_context);
                    }
                }
            }
        },
        Abstract: {
            setCanvas: function () {
            },
            change: function () {
            },
            //统一绘制
            draw: function () {
            },
            //游戏主循环调用的方法
            run: function () {
            }
        }
    });
}());