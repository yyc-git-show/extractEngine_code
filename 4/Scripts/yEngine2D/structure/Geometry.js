/**YEngine2D 几何类
 * 作者：YYC
 * 日期：2014-01-11
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    namespace("YE").rect = function (x, y, w, h) {
        return { origin: {x: x, y: y}, size: {width: w, height: h} };
    };
}());
