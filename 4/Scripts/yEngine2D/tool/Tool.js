(function () {
    var extend = function (destination, source) {
        var property = "";

        for (property in source) {
            destination[property] = source[property];
        }
        return destination;
    };

    //*全局方法
    (function () {
        /**
         * 创建命名空间。
         示例：
         namespace("YE.Collection ");
         */
        var global = {
            namespace: function (str) {
                var parent = window,
                    parts = str.split('.'),
                    i = 0,
                    len = 0;

                if (str.length == 0) {
                    throw new Error("命名空间不能为空");
                }

                for (i = 0, len = parts.length; i < len; i++) {
                    if (typeof parent[parts[i]] === "undefined") {
                        parent[parts[i]] = {};
                    }
                    parent = parent[parts[i]];  //递归增加命名空间
                }

                return parent;
            }
        };

        extend(window, global);


        /**
         * 来自《HTML5 Canvas 核心技术》
         * 不能写到global中，否则会报错“illegal invocation”！
         */
        window.requestNextAnimationFrame = (function () {
            var originalWebkitRequestAnimationFrame = undefined,
                wrapper = undefined,
                callback = undefined,
                geckoVersion = 0,
                userAgent = navigator.userAgent,
                index = 0,
                self = this;

            // Workaround for Chrome 10 bug where Chrome
            // does not pass the time to the animation function

            if (window.webkitRequestAnimationFrame) {
                // Define the wrapper

                wrapper = function (time) {
                    if (time === undefined) {
                        time = +new Date();
                    }
                    self.callback(time);
                };

                // Make the switch

                originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;

                window.webkitRequestAnimationFrame = function (callback, element) {
                    self.callback = callback;

                    // Browser calls the wrapper and wrapper calls the callback

                    originalWebkitRequestAnimationFrame(wrapper, element);
                }
            }

            // Workaround for Gecko 2.0, which has a bug in
            // mozRequestAnimationFrame() that restricts animations
            // to 30-40 fps.

            if (window.mozRequestAnimationFrame) {
                // Check the Gecko version. Gecko is used by browsers
                // other than Firefox. Gecko 2.0 corresponds to
                // Firefox 4.0.

                index = userAgent.indexOf('rv:');

                if (userAgent.indexOf('Gecko') != -1) {
                    geckoVersion = userAgent.substr(index + 3, 3);

                    if (geckoVersion === '2.0') {
                        // Forces the return statement to fall through
                        // to the setTimeout() function.

                        window.mozRequestAnimationFrame = undefined;
                    }
                }
            }

            return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||

                function (callback, element) {
                    var start,
                        finish;

                    window.setTimeout(function () {
                        start = +new Date();
                        callback(start);
                        finish = +new Date();

                        self.timeout = 1000 / 60 - (finish - start);

                    }, self.timeout);
                };
        }());

        window.cancelNextRequestAnimationFrame = window.cancelRequestAnimationFrame
            || window.webkitCancelAnimationFrame
            || window.webkitCancelRequestAnimationFrame
            || window.mozCancelRequestAnimationFrame
            || window.oCancelRequestAnimationFrame
            || window.msCancelRequestAnimationFrame
            || clearTimeout;
    }());


    //*工具类

    namespace("YE.Tool").func = {
        bind: function (object, fun) {
            return function () {
                return fun.apply(object, arguments);
            };
        }
    };

    namespace("YE.Tool").judge = {
        isFunction: function (func) {
            return Object.prototype.toString.call(func) === "[object Function]";
        },
        isArray: function (val) {
            return Object.prototype.toString.call(val) === "[object Array]";
        },
        /**
         * 判断是否为jQuery对象
         */
        isjQuery: function (ob) {
            if (!window.jQuery) {
                return false;
            }

            return ob instanceof window.jQuery;
        },
        /**
         * 检查宿主对象是否可调用
         *
         * 任何对象，如果其语义在ECMAScript规范中被定义过，那么它被称为原生对象；
         环境所提供的，而在ECMAScript规范中没有被描述的对象，我们称之为宿主对象。

         该方法用于特性检测，判断对象是否可用。用法如下：

         MyEngine addEvent():
         if (Tool.judge.isHostMethod(dom, "addEventListener")) {    //判断dom是否具有addEventListener方法
            dom.addEventListener(sEventType, fnHandler, false);
            }
         */
        isHostMethod: (function () {
            function isHostMethod(object, property) {
                var type = typeof object[property];

                return type === "function" ||
                    (type === "object" && !!object[property]) ||
                    type === "unknown";
            }

            return isHostMethod;
        }())
    };

    namespace("YE.Tool").array = {
        /*返回一个新的数组，元素与array相同（地址不同）*/
        clone: function (array) {
            var new_array = new Array(array.length);
            for (var i = 0, _length = array.length; i < _length; i++) {
                new_array[i] = array[i];
            }
            return new_array;
        }
    };

    namespace("YE.Tool").event = (function () {
        return {
            //注意！bindEvent传的参数与BindWithArguments类似，只是第一个参数为event！
            bindEvent: function (object, fun) {
                var args = Array.prototype.slice.call(arguments, 2);
                var self = this;

                return function (event) {
                    return fun.apply(object, [self.wrapEvent(event)].concat(args)); //对事件对象进行包装
                }
            },
            /* oTarget既可以是单个dom元素，也可以使jquery集合。
             如：
             Tool.event.addEvent(document.getElementById("test_div"), "mousedown", _Handle);
             Tool.event.addEvent($("div"), "mousedown", _Handle);
             */
            addEvent: function (oTarget, sEventType, fnHandler) {
                var dom = null,
                    i = 0,
                    len = 0,
                    temp = null;

                if (YE.Tool.judge.isjQuery(oTarget)) {
                    oTarget.each(function () {
                        dom = this;

                        if (YE.Tool.judge.isHostMethod(dom, "addEventListener")) {
                            dom.addEventListener(sEventType, fnHandler, false);
                        }
                        else if (YE.Tool.judge.isHostMethod(dom, "attachEvent")) {
                            dom.attachEvent("on" + sEventType, fnHandler);
                        }
                        else {
                            dom["on" + sEventType] = fnHandler;
                        }
                    });
                }
                else {
                    dom = oTarget;

                    if (YE.Tool.judge.isHostMethod(dom, "addEventListener")) {
                        dom.addEventListener(sEventType, fnHandler, false);
                    }
                    else if (YE.Tool.judge.isHostMethod(dom, "attachEvent")) {
                        dom.attachEvent("on" + sEventType, fnHandler);
                    }
                    else {
                        dom["on" + sEventType] = fnHandler;
                    }
                }
            },
            removeEvent: function (oTarget, sEventType, fnHandler) {
                var dom = null;


                if (YE.Tool.judge.isjQuery(oTarget)) {
                    oTarget.each(function () {
                        dom = this;
                        if (YE.Tool.judge.isHostMethod(dom, "removeEventListener")) {
                            dom.removeEventListener(sEventType, fnHandler, false);
                        }
                        else if (YE.Tool.judge.isHostMethod(dom, "detachEvent")) {
                            dom.detachEvent("on" + sEventType, fnHandler);
                        }
                        else {
                            dom["on" + sEventType] = null;
                        }
                    });
                }
                else {
                    dom = oTarget;
                    if (YE.Tool.judge.isHostMethod(dom, "removeEventListener")) {
                        dom.removeEventListener(sEventType, fnHandler, false);
                    }
                    else if (YE.Tool.judge.isHostMethod(dom, "detachEvent")) {
                        dom.detachEvent("on" + sEventType, fnHandler);
                    }
                    else {
                        dom["on" + sEventType] = null;
                    }
                }
            },
            wrapEvent: function (oEvent) {
                var e = oEvent ? oEvent : global.event,
                    target = e.srcElement || e.target;

                //ie
                if (YE.Tool.judge.browser.isIE()) {
                    e.pageX = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
                    e.pageY = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;

                    e.stopBubble = function () {
                        e.cancelBubble = true;
                    };

                    if (YE.Tool.judge.browser.isIE7() || YE.Tool.judge.browser.isIE8()) {
                        e.preventDefault = function () {
                            e.returnValue = false;
                        };

                        if (e.type == "mouseout") {
                            e.relatedTarget = e.toElement;
                        }
                        else if (e.type == "mouseover") {
                            e.relatedTarget = e.fromElement;
                        }

                        switch (e.button) {
                            case 1:
                                e.mouseButton = 0;
                                break;
                            case 4:
                                e.mouseButton = 1;
                                break;
                            case 2:
                                e.mouseButton = 2;
                                break;
                            default:
                                e.mouseButton = e.button;
                                break;
                        }
                    }
                    else {
                        e.mouseButton = e.button;
                    }
                }
                else {
                    e.stopBubble = e.stopPropagation;

                    e.keyCode = e.which;
                    //注意：firefox没有多个键一起按的事件
                    e.mouseButton = e.button;
                }
                e.target = target;

                return e;
            },
            getEvent: function () {
                //this.getEvent.caller为调用了getEvent方法的函数的引用
                return this.getEvent.caller.arguments[0];
            }
        }
    }());

    namespace("YE.Tool").async = {
        /**
         * 清空序号在index前后timerNum范围中的定时器
         * @param index 其中一个定时器序号（不一定为第一个定时器序号）
         */
        clearAllTimer: function (index) {
            var i = 0,
                num = 0,
                timerNum = 250, //最大定时器个数
                firstIndex = 0;

            //获得最小的定时器序号
            firstIndex = (index - timerNum >= 1) ? (index - timerNum) : 1;
            num = firstIndex + timerNum * 2;    //循环次数

            for (i = firstIndex; i < num; i++) {
                window.clearTimeout(i);
            }
            for (i = firstIndex; i < num; i++) {
                window.clearInterval(i);
            }
        }
    }
}());
