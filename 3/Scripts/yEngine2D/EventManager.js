(function () {
    var _keyListeners = {};

    namespace("YE").EventManager = {
        _getEventType: function (event) {
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
        addListener: function (event, handler) {
            var eventType = "";

            eventType = this._getEventType(event);

            YE.Tool.event.addEvent(window, eventType, handler);
            this._registerEvent(eventType, handler);
        },
        _registerEvent: function (eventType, handler) {
            if (_keyListeners[eventType] === undefined) {
                _keyListeners[eventType] = [handler];
            }
            else {
                _keyListeners[eventType].push(handler);
            }
        },
        removeListener: function (event) {
            var eventType = "";

            eventType = this._getEventType(event);

            if (_keyListeners[eventType]) {
                _keyListeners[eventType].forEach(function (e, i) {
                    YE.Tool.event.removeEvent(window, eventType, e);
                })
            }

        }
    };
}());
