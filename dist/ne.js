'use strict';

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

// Ensure the module is loaded
if (typeof window.ne == 'undefined') {
    window.ne = {};
}
ne.Loader = (function () {

    var _cache = {
        audio: {},
        bitmaps: {},
        json: {}
    };

    return (function () {
        function Loader() {
            _classCallCheck(this, Loader);
        }

        _createClass(Loader, [{
            key: 'loadPixmaps',
            value: function loadPixmaps(url) {}
        }, {
            key: 'loadAudio',
            value: function loadAudio(url) {}
        }, {
            key: 'loadJson',
            value: function loadJson(url) {}
        }, {
            key: 'pixmap',
            value: function pixmap(url) {}
        }, {
            key: 'audio',
            value: function audio(url) {}
        }, {
            key: 'json',
            value: function json(url) {}
        }], [{
            key: 'clear',
            value: function clear() {
                this.clearPixmaps();
                this.clearAudio();
                this.clearJson();
            }
        }, {
            key: 'clearPixmaps',
            value: function clearPixmaps() {}
        }, {
            key: 'clearAudio',
            value: function clearAudio() {}
        }, {
            key: 'clearJson',
            value: function clearJson() {}
        }]);

        return Loader;
    })();
})();
//# sourceMappingURL=ne.js.map
//# sourceMappingURL=ne.js.map
