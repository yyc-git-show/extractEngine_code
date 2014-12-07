(function () {
    namespace("YE").Collection = YYC.Class({
        Private: {
            //当前游标
            ye_cursor: 0,
            //容器
            ye_childs: [],

            ye_hasNext: function () {
                if (this.ye_cursor === this.ye_childs.length) {
                    return false;
                }
                else {
                    return true;
                }
            },
            ye_next: function () {
                var result = null;

                if (this.ye_hasNext()) {
                    result = this.ye_childs[this.ye_cursor];
                    this.ye_cursor += 1;
                }
                else {
                    result = null;
                }

                return result;
            },
            ye_resetCursor: function () {
                this.ye_cursor = 0;
            }
        },
        Public: {
            getCount: function () {
                return this.ye_childs.length;
            },
            getChilds: function () {
                return YE.Tool.array.clone(this.ye_childs);
            },
            getChildAt: function (index) {
                return this.ye_childs[index];
            },
            addChild: function (child) {
                this.ye_childs.push(child);
                return this;
            },
            addChilds: function (childs) {
                var i = 0,
                    len = 0;

                for (i = 0, len = childs.length; i < len; i++) {
                    this.addChild(childs[i]);
                }
            },
            removeAll: function () {
                this.ye_childs = [];
            },
            iterator: function (handler, args) {
                var args = Array.prototype.slice.call(arguments, 1),
                    nextElement = null;

                this.ye_resetCursor();

                if (YE.Tool.judge.isFunction(arguments[0])) {
                    while (this.ye_hasNext()) {
                        nextElement = this.ye_next();
                        handler.apply(nextElement, [nextElement].concat(args));
                    }
                    this.ye_resetCursor();
                }
                else {
                    while (this.ye_hasNext()) {
                        nextElement = this.ye_next();
                        nextElement[handler].apply(nextElement, args);
                    }
                    this.ye_resetCursor();
                }
            },

            Virtual: {
                remove: function (func, child) {
                    this.ye_childs.remove(func, child);
                }
            }
        },
        Static: {
            create: function () {
                return new this();
            }
        }
    });
}());
