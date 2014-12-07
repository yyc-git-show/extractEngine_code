(function () {
    namespace("YE").EventManager = {
        ye_keyListeners: {},

        ye_getEventType: function (event) {
            var eventType = "",
                e = YE.Event;

            switch (event) {
                case e.KEY_DOWN:
                    eventType = "keydown";
                    break;
                case e.KEY_UP:
                    eventType = "keyup";
                    break;
                case e.KEY_PRESS:
                    eventType = "keypress";
                    break;
                default:
                    throw new Error("事件类型错误");
            }

            return eventType;
        },
        addListener: function (event, handler, target, handlerContext) {
            var eventType = "",
                _handler = null;

            eventType = this.ye_getEventType(event);

            if (handlerContext) {
                _handler = YE.Tool.event.bindEvent(handlerContext, handler);
            }
            else {
                _handler = handler;
            }

            YE.Tool.event.addEvent(target || window, eventType, _handler);
            this.ye_registerEvent(eventType, _handler, target || window);
        },
        ye_registerEvent: function (eventType, handler, target) {
            if (this.ye_keyListeners[eventType] === undefined) {
                this.ye_keyListeners[eventType] = [
                    [handler, target]
                ];
            }
            else {
                this.ye_keyListeners[eventType].push([handler, target]);
            }
        },
        removeListener: function (event) {
            var eventType = "";

            eventType = this.ye_getEventType(event);

            if (_keyListeners[eventType]) {
                _keyListeners[eventType].forEach(function (e, i) {
                    YE.Tool.event.removeEvent(window, eventType, e);
                })
            }

        }
    };
}());
