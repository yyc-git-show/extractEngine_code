(function () {
    namespace("YE").collision = (function () {
        //获得精灵的碰撞区域,
        function _getCollideRect(obj) {
            return {
                x1: obj.origin.x,
                y1: obj.origin.y,
                x2: obj.origin.x + obj.size.width,
                y2: obj.origin.y + obj.size.height
            }
        }

        return {
            /**
             *矩形间的碰撞检测
             **/
            col_Between_Rects: function (rect1, rect2) {
                var rect1 = _getCollideRect(rect1),
                    rect2 = _getCollideRect(rect2);

                if (rect1 && rect2 && !(rect1.x1 >= rect2.x2 || rect1.y1 >= rect2.y2 || rect1.x2 <= rect2.x1 || rect1.y2 <= rect2.y1)) {
                    return true;
                }
                return false;
            }
        };
    }());
}());
