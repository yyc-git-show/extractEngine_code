(function () {
    //*使用迭代器模式

    var IIterator = YYC.Interface("hasNext", "next", "resetCursor");


    namespace("YE").Collection = YYC.AClass({Interface: IIterator}, {
        Private: {
            //当前游标
            _cursor: 0,
            //容器
            _childs: []
        },
        Public: {
            getChilds: function () {
                return YE.Tool.array.clone(this._childs);
            },
            getChildAt: function (index) {
                return this._childs[index];
            },
            addChild: function (child) {
                this._childs.push(child);
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
                this._childs = [];
            },
            hasNext: function () {
                if (this._cursor === this._childs.length) {
                    return false;
                }
                else {
                    return true;
                }
            },
            next: function () {
                var result = null;

                if (this.hasNext()) {
                    result = this._childs[this._cursor];
                    this._cursor += 1;
                }
                else {
                    result = null;
                }

                return result;
            },
            resetCursor: function () {
                this._cursor = 0;
            },
            Virtual: {
                remove: function (func, child) {
                    this._childs.remove(func, child);
                }
            }
        }
    });
}());
