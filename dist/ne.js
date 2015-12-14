var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60, new Date().getTime());
        };
})();
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ne;
(function (ne) {
    ne.WEBGL = 1;
    ne.CANVAS2D = 2;
    var LoadScene = (function (_super) {
        __extends(LoadScene, _super);
        function LoadScene() {
            _super.apply(this, arguments);
        }
        return LoadScene;
    })(ne.scene.Scene);
    ne.LoadScene = LoadScene;
    var Game = (function () {
        function Game(_a) {
            var _b = _a.width, width = _b === void 0 ? 480 : _b, _c = _a.height, height = _c === void 0 ? 320 : _c, _d = _a.mode, mode = _d === void 0 ? ne.WEBGL : _d, _e = _a.loadScene, loadScene = _e === void 0 ? LoadScene : _e;
            this._sceneManager = new ne.scene.SceneManager(loadScene);
            this.createRender({ width: width, height: height, mode: mode });
        }
        Game.prototype.createRender = function (options) {
            if (options.mode === ne.WEBGL) {
                this._render = new ne.graphics.WebGLRender(options.width, options.height);
            }
            else {
                this._render = new ne.graphics.Canvas2DRender(options.width, options.height);
            }
        };
        Game.prototype.start = function (scene) {
            this._time = performance.now();
            this._updateBind = this.update.bind(this);
            this._sceneManager.goto(scene);
            requestAnimationFrame(this._updateBind);
        };
        Game.prototype.update = function (timestamp) {
            var delta = timestamp - this._time;
            this._render.render(this._sceneManager.instance);
            this._sceneManager.update(delta);
            requestAnimationFrame(this._updateBind);
            this._time = timestamp;
        };
        Object.defineProperty(Game.prototype, "view", {
            get: function () {
                return this._render.canvas;
            },
            enumerable: true,
            configurable: true
        });
        return Game;
    })();
    ne.Game = Game;
})(ne || (ne = {}));
var ne;
(function (ne) {
    var audio;
    (function (audio) {
        var Buffer = (function () {
            function Buffer() {
            }
            Buffer.prototype.stream = function () {
                return null;
            };
            Object.defineProperty(Buffer.prototype, "length", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            return Buffer;
        })();
        audio.Buffer = Buffer;
    })(audio = ne.audio || (ne.audio = {}));
})(ne || (ne = {}));
/// <reference path="./Buffer.ts" />
var ne;
(function (ne) {
    var audio;
    (function (audio) {
        var LegacyBuffer = (function (_super) {
            __extends(LegacyBuffer, _super);
            function LegacyBuffer(tag) {
                _super.call(this);
                this._tag = tag;
            }
            LegacyBuffer.prototype.stream = function () {
                return new audio.LegacyStream(this);
            };
            Object.defineProperty(LegacyBuffer.prototype, "length", {
                get: function () {
                    return this._tag.duration;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LegacyBuffer.prototype, "src", {
                get: function () {
                    return this._tag;
                },
                enumerable: true,
                configurable: true
            });
            return LegacyBuffer;
        })(audio.Buffer);
        audio.LegacyBuffer = LegacyBuffer;
    })(audio = ne.audio || (ne.audio = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var audio;
    (function (audio) {
        var Stream = (function () {
            function Stream() {
            }
            Stream.prototype.play = function (loop) {
                if (loop === void 0) { loop = false; }
            };
            Stream.prototype.stop = function () {
            };
            Stream.prototype.pause = function () {
            };
            Object.defineProperty(Stream.prototype, "position", {
                get: function () {
                    return 0;
                },
                set: function (value) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stream.prototype, "loopStart", {
                get: function () {
                    return 0;
                },
                set: function (value) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stream.prototype, "loopEnd", {
                get: function () {
                    return 0;
                },
                set: function (value) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Stream.prototype, "playbackRate", {
                get: function () {
                    return 1;
                },
                set: function (value) {
                },
                enumerable: true,
                configurable: true
            });
            return Stream;
        })();
        audio.Stream = Stream;
    })(audio = ne.audio || (ne.audio = {}));
})(ne || (ne = {}));
/// <reference path="./Stream.ts" />
var ne;
(function (ne) {
    var audio;
    (function (audio) {
        var LegacyStream = (function (_super) {
            __extends(LegacyStream, _super);
            function LegacyStream(buffer) {
                _super.call(this);
                this._buffer = buffer;
                this._tag = buffer.src.cloneNode();
            }
            LegacyStream.prototype.play = function (loop) {
                if (loop === void 0) { loop = false; }
                this._tag.loop = loop;
                this._tag.play();
            };
            LegacyStream.prototype.stop = function () {
                this._tag.pause();
                this._tag.currentTime = 0;
            };
            LegacyStream.prototype.pause = function () {
                this._tag.pause();
            };
            Object.defineProperty(LegacyStream.prototype, "position", {
                get: function () {
                    return this._tag.currentTime;
                },
                set: function (value) {
                    this._tag.currentTime = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LegacyStream.prototype, "playbackRate", {
                get: function () {
                    return this._tag.playbackRate;
                },
                set: function (value) {
                    this._tag.playbackRate = value;
                },
                enumerable: true,
                configurable: true
            });
            return LegacyStream;
        })(audio.Stream);
        audio.LegacyStream = LegacyStream;
    })(audio = ne.audio || (ne.audio = {}));
})(ne || (ne = {}));
/// <reference path="./Buffer.ts" />
var ne;
(function (ne) {
    var audio;
    (function (audio) {
        var WebAudioBuffer = (function (_super) {
            __extends(WebAudioBuffer, _super);
            function WebAudioBuffer(context, buffer) {
                _super.call(this);
                this._context = context;
                this._buffer = buffer;
            }
            Object.defineProperty(WebAudioBuffer.prototype, "src", {
                get: function () {
                    return this._buffer;
                },
                enumerable: true,
                configurable: true
            });
            WebAudioBuffer.prototype.stream = function () {
                return new audio.WebAudioStream(this._context, this);
            };
            Object.defineProperty(WebAudioBuffer.prototype, "length", {
                get: function () {
                    return this._buffer.length;
                },
                enumerable: true,
                configurable: true
            });
            return WebAudioBuffer;
        })(audio.Buffer);
        audio.WebAudioBuffer = WebAudioBuffer;
    })(audio = ne.audio || (ne.audio = {}));
})(ne || (ne = {}));
/// <reference path="./Stream.ts" />
var ne;
(function (ne) {
    var audio;
    (function (audio) {
        var WebAudioStream = (function (_super) {
            __extends(WebAudioStream, _super);
            function WebAudioStream(context, buffer) {
                _super.call(this);
                this._context = context;
                this._source = null;
                this._position = 0;
                this._playTime = 0;
                this._buffer = buffer;
                this._playPosition = null;
                this._playbackRate = 1;
            }
            WebAudioStream.prototype.play = function (loop) {
                if (loop === void 0) { loop = false; }
                this.pause();
                this._createSource(loop);
                this._playTime = Date.now();
                this._playPosition = this._position;
                this._source.start(0, this._position);
            };
            WebAudioStream.prototype._createSource = function (loop) {
                this._source = this._context.createBufferSource();
                this._source.buffer = this._buffer.src;
                this._source.loop = loop;
                this._source.playbackRate.value = this._playbackRate;
                this._source.connect(this._context.destination);
            };
            WebAudioStream.prototype.stop = function () {
                if (this._playPosition === null)
                    return;
                this._source.stop();
                this._source.disconnect();
                this._position = 0;
                this._playPosition = null;
                this._source = null;
            };
            WebAudioStream.prototype.pause = function () {
                if (this._playPosition === null)
                    return;
                this._source.stop();
                this._setCurrentPosition();
                this._source.disconnect();
                this._playPosition = null;
                this._source = null;
            };
            WebAudioStream.prototype._setCurrentPosition = function () {
                var pbr = this._source.playbackRate.value / this._source.playbackRate.defaultValue;
                var d = (Date.now() - this._playTime) * pbr + this._playPosition;
                var t = Math.max(1, this.loopEnd - this.loopStart);
                this._position = this.loopStart + d % t;
            };
            Object.defineProperty(WebAudioStream.prototype, "context", {
                get: function () {
                    return this._context;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebAudioStream.prototype, "position", {
                get: function () {
                    if (this._playPosition !== null) {
                        this._setCurrentPosition();
                    }
                    return this._position;
                },
                set: function (value) {
                    this._position = value;
                    if (this._playPosition !== null) {
                        var loop = this._source.loop;
                        this._source.stop();
                        this._source.disconnect();
                        this.play(loop);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebAudioStream.prototype, "loopStart", {
                get: function () {
                    return this._source.loopStart;
                },
                set: function (value) {
                    this._source.loopStart = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebAudioStream.prototype, "loopEnd", {
                get: function () {
                    return this._source.loopEnd;
                },
                set: function (value) {
                    this._source.loopEnd = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebAudioStream.prototype, "playbackRate", {
                get: function () {
                    return this._playbackRate;
                },
                set: function (value) {
                    if (this._source) {
                        this._source.playbackRate.value = value;
                    }
                    this._playbackRate = value;
                },
                enumerable: true,
                configurable: true
            });
            return WebAudioStream;
        })(audio.Stream);
        audio.WebAudioStream = WebAudioStream;
    })(audio = ne.audio || (ne.audio = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var Render = (function () {
            function Render(width, height) {
                this._canvas = document.createElement('canvas');
                this._canvas.width = width;
                this._canvas.height = height;
            }
            Object.defineProperty(Render.prototype, "canvas", {
                get: function () {
                    return this._canvas;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Render.prototype, "width", {
                get: function () {
                    return this._canvas.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Render.prototype, "height", {
                get: function () {
                    return this._canvas.height;
                },
                enumerable: true,
                configurable: true
            });
            Render.prototype.resize = function (width, height) {
                this._canvas.width = width;
                this._canvas.height = height;
            };
            Render.prototype.render = function (object) {
            };
            return Render;
        })();
        graphics.Render = Render;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
/// <reference path="./Render.ts" />
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var Canvas2DRender = (function (_super) {
            __extends(Canvas2DRender, _super);
            function Canvas2DRender() {
                _super.apply(this, arguments);
            }
            return Canvas2DRender;
        })(graphics.Render);
        graphics.Canvas2DRender = Canvas2DRender;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var math;
    (function (math) {
        // n -> [a] -> [[a]]
        function combinator(n, lst) {
            return n ? (lst.length ? combinator(n - 1, lst).map(function (t) {
                return [lst[0]].concat(t);
            }).concat(combinator(n, lst.slice(1))) : []) : [[]];
        }
        math.combinator = combinator;
        ;
        // If needed, we can derive a significantly faster version of
        // the simple recursive function above by memoizing it
        // f -> f
        function memoized(fn) {
            var m = {};
            return function (x) {
                var args = [].slice.call(arguments), strKey = args.join('-');
                var v = m[strKey];
                if ('u' === (typeof v)[0])
                    m[strKey] = v = fn.apply(null, args);
                return v;
            };
        }
        // [m..n]
        function range(m, n) {
            return Array.apply(null, Array(n - m + 1)).map(function (x, i) {
                return m + i;
            });
        }
    })(math = ne.math || (ne.math = {}));
})(ne || (ne = {}));
/// <reference path="./combinator.ts" />
var ne;
(function (ne) {
    var math;
    (function (math) {
        function makePropertyAccessor(slice) {
            var length = slice.length;
            return {
                get: function () {
                    var _this = this;
                    var map = slice.map(function (i) { return _this[i]; });
                    return new ne.math.Vector4(map[0], map[1], map[2] || 0, map[3] || 0);
                },
                set: function (value) {
                    for (var index = 0; index < length; ++index) {
                        var p = slice[index];
                        this[p] = value[index];
                    }
                },
                configurable: true
            };
        }
        function makePropertiesOfSize(result, permutations, length) {
            permutations.forEach(function (i) {
                var slice = i.slice(0, length + 1);
                var name = slice.join('');
                if (typeof result[name] == 'undefined') {
                    result[name] = makePropertyAccessor(slice);
                }
            });
        }
        function makeProperties(properties) {
            var result = {};
            //var permutations = permutator(properties);
            var permutations = math.combinator(properties.length, properties);
            for (var length = 1; length <= properties.length; ++length) {
                makePropertiesOfSize(result, permutations, length);
            }
            return result;
        }
        function vectorFields(object) {
            var properties = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                properties[_i - 1] = arguments[_i];
            }
            Object.defineProperties(object, makeProperties(properties));
        }
        math.vectorFields = vectorFields;
    })(math = ne.math || (ne.math = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var math;
    (function (math) {
        var Vector = (function () {
            function Vector(x, y) {
                this._data = new Float32Array(this.length);
                this[0] = x;
                this[1] = y;
            }
            Object.defineProperty(Vector.prototype, "length", {
                get: function () {
                    return 2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "data", {
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, 0, {
                get: function () {
                    return this._data[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, 0, {
                set: function (value) {
                    this._data[0] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, 1, {
                get: function () {
                    return this._data[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, 1, {
                set: function (value) {
                    this._data[1] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, 2, {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, 2, {
                set: function (value) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, 3, {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, 3, {
                set: function (value) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "x", {
                get: function () {
                    return this[0];
                },
                set: function (value) {
                    this[0] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "r", {
                get: function () {
                    return this[0];
                },
                set: function (value) {
                    this[0] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "y", {
                get: function () {
                    return this[1];
                },
                set: function (value) {
                    this[1] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "g", {
                get: function () {
                    return this[1];
                },
                set: function (value) {
                    this[1] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "z", {
                get: function () {
                    return this[2];
                },
                set: function (value) {
                    this[2] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "b", {
                get: function () {
                    return this[2];
                },
                set: function (value) {
                    this[2] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "w", {
                get: function () {
                    return this[3];
                },
                set: function (value) {
                    this[3] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "a", {
                get: function () {
                    return this[3];
                },
                set: function (value) {
                    this[3] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "s", {
                get: function () {
                    return this[0];
                },
                set: function (value) {
                    this[0] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "u", {
                get: function () {
                    return this[0];
                },
                set: function (value) {
                    this[0] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "t", {
                get: function () {
                    return this[1];
                },
                set: function (value) {
                    this[1] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "v", {
                get: function () {
                    return this[1];
                },
                set: function (value) {
                    this[1] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "p", {
                get: function () {
                    return this[2];
                },
                set: function (value) {
                    this[2] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector.prototype, "q", {
                get: function () {
                    return this[3];
                },
                set: function (value) {
                    this[3] = value;
                },
                enumerable: true,
                configurable: true
            });
            return Vector;
        })();
        math.Vector = Vector;
    })(math = ne.math || (ne.math = {}));
})(ne || (ne = {}));
/// <reference path="./vectorFields.ts" />
/// <reference path="./Vector.ts" />
var ne;
(function (ne) {
    var math;
    (function (math) {
        var Vector2 = (function (_super) {
            __extends(Vector2, _super);
            function Vector2(x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                _super.call(this, x, y);
            }
            Vector2.prototype.clone = function () {
                var vec = new Vector2();
                return vec.copyFrom(this);
            };
            Vector2.prototype.copyFrom = function (vec) {
                var length = this.length;
                var a = this.data;
                var b = vec.data;
                for (var i = 0; i < length; ++i) {
                    a[i] = b[i];
                }
                return this;
            };
            Vector2.prototype.copyTo = function (vec) {
                return vec.copyFrom(this);
            };
            Vector2.prototype.add = function (vec) {
                var length = this.length;
                var a = this.data;
                var b = vec.data;
                for (var i = 0; i < length; ++i) {
                    a[i] += b[i];
                }
                return this;
            };
            Vector2.prototype.sub = function (vec) {
                var length = this.length;
                var a = this.data;
                var b = vec.data;
                for (var i = 0; i < length; ++i) {
                    a[i] -= b[i];
                }
                return this;
            };
            Vector2.prototype.mul = function (vec) {
                var length = this.length;
                var a = this.data;
                var b = vec.data;
                for (var i = 0; i < length; ++i) {
                    a[i] *= b[i];
                }
                return this;
            };
            Vector2.prototype.div = function (vec) {
                var length = this.length;
                var a = this.data;
                var b = vec.data;
                for (var i = 0; i < length; ++i) {
                    a[i] /= b[i];
                }
                return this;
            };
            Vector2.prototype.mod = function (vec) {
                var length = this.length;
                var a = this.data;
                var b = vec.data;
                for (var i = 0; i < length; ++i) {
                    a[i] %= b[i];
                }
                return this;
            };
            Vector2.prototype.set = function (x, y) {
                var data = this.data;
                data[0] = x;
                data[1] = y;
            };
            Vector2.prototype.normalize = function () {
                var data = this.data;
                var sum = 0;
                var length = this.length;
                for (var i = 0; i < length; ++i) {
                    sum += data[i] * data[i];
                }
                var vec = Math.sqrt(sum);
                for (var i = 0; i < length; ++i) {
                    data[i] = data[i] / vec || 0;
                }
                return this;
            };
            return Vector2;
        })(math.Vector);
        math.Vector2 = Vector2;
        math.vectorFields(Vector2.prototype, 's', 't', 'p', 'q');
        math.vectorFields(Vector2.prototype, 'u', 'v');
        math.vectorFields(Vector2.prototype, 'x', 'y', 'z', 'w');
        math.vectorFields(Vector2.prototype, 'r', 'g', 'b', 'a');
    })(math = ne.math || (ne.math = {}));
})(ne || (ne = {}));
/// <reference path="./Vector2.ts" />
var ne;
(function (ne) {
    var math;
    (function (math) {
        var Vector3 = (function (_super) {
            __extends(Vector3, _super);
            function Vector3(x, y, z) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                _super.call(this, x, y);
                this[2] = z;
            }
            Object.defineProperty(Vector3.prototype, "length", {
                get: function () {
                    return 3;
                },
                enumerable: true,
                configurable: true
            });
            Vector3.prototype.clone = function () {
                var vec = new Vector3();
                return vec.copyFrom(this);
            };
            Object.defineProperty(Vector3.prototype, 2, {
                get: function () {
                    return this._data[2];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector3.prototype, 2, {
                set: function (value) {
                    this._data[2] = value;
                },
                enumerable: true,
                configurable: true
            });
            Vector3.prototype.set = function (x, y, z) {
                if (z === void 0) { z = 0; }
                _super.prototype.set.call(this, x, y);
                var data = this.data;
                data[2] = z;
            };
            Vector3.prototype.cross = function (vec) {
                var data = this.data;
                var vd = vec.data;
                var x = data[1] * vd[2] - data[2] * vd[1];
                var y = data[2] * vd[0] - data[0] * vd[2];
                var z = data[0] * vd[1] - data[1] * vd[0];
                data[0] = x;
                data[1] = y;
                data[2] = z;
                return this;
            };
            return Vector3;
        })(math.Vector2);
        math.Vector3 = Vector3;
    })(math = ne.math || (ne.math = {}));
})(ne || (ne = {}));
/// <reference path="./Vector3.ts" />
var ne;
(function (ne) {
    var math;
    (function (math) {
        var Vector4 = (function (_super) {
            __extends(Vector4, _super);
            function Vector4(x, y, z, w) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                if (w === void 0) { w = 0; }
                _super.call(this, x, y, z);
                this[3] = w;
            }
            Object.defineProperty(Vector4.prototype, "length", {
                get: function () {
                    return 4;
                },
                enumerable: true,
                configurable: true
            });
            Vector4.prototype.clone = function () {
                var vec = new Vector4();
                return vec.copyFrom(this);
            };
            Object.defineProperty(Vector4.prototype, 3, {
                get: function () {
                    return this._data[3];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector4.prototype, 3, {
                set: function (value) {
                    this._data[3] = value;
                },
                enumerable: true,
                configurable: true
            });
            Vector4.prototype.set = function (x, y, z, w) {
                if (z === void 0) { z = 0; }
                if (w === void 0) { w = 0; }
                _super.prototype.set.call(this, x, y, z);
                var data = this.data;
                data[2] = z;
                data[3] = w;
            };
            return Vector4;
        })(math.Vector3);
        math.Vector4 = Vector4;
    })(math = ne.math || (ne.math = {}));
})(ne || (ne = {}));
/// <reference path="../math/Vector4.ts" />
/// <reference path="./Color.ts" />
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var ColorBase = (function (_super) {
            __extends(ColorBase, _super);
            function ColorBase() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(ColorBase.prototype, 0, {
                get: function () {
                    return this._data[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorBase.prototype, 0, {
                set: function (value) {
                    this._data[0] = Math.min(255, Math.max(0, value));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorBase.prototype, 1, {
                get: function () {
                    return this._data[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorBase.prototype, 1, {
                set: function (value) {
                    this._data[1] = Math.min(255, Math.max(0, value));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorBase.prototype, 2, {
                get: function () {
                    return this._data[2];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorBase.prototype, 2, {
                set: function (value) {
                    this._data[2] = Math.min(255, Math.max(0, value));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorBase.prototype, 3, {
                get: function () {
                    return this._data[3];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorBase.prototype, 3, {
                set: function (value) {
                    this._data[3] = Math.min(255, Math.max(0, value));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorBase.prototype, "red", {
                get: function () {
                    return this.r;
                },
                set: function (value) {
                    this.r = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorBase.prototype, "green", {
                get: function () {
                    return this.g;
                },
                set: function (value) {
                    this.g = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorBase.prototype, "blue", {
                get: function () {
                    return this.b;
                },
                set: function (value) {
                    this.b = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorBase.prototype, "alpha", {
                get: function () {
                    return this.a;
                },
                set: function (value) {
                    this.a = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorBase.prototype, "hue", {
                get: function () {
                    return this.toHsl()[0];
                },
                set: function (value) {
                    var hsla = this.toHsla();
                    hsla[0] = value;
                    var c = graphics.Color.fromHsla(hsla);
                    this.set(c.red, c.green, c.blue, c.alpha);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorBase.prototype, "saturation", {
                get: function () {
                    return this.toHsl()[1];
                },
                set: function (value) {
                    var hsla = this.toHsla();
                    hsla[1] = value;
                    var c = graphics.Color.fromHsla(hsla);
                    this.set(c.red, c.green, c.blue, c.alpha);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColorBase.prototype, "luminance", {
                get: function () {
                    return this.toHsl()[2];
                },
                set: function (value) {
                    var hsla = this.toHsla();
                    hsla[2] = value;
                    var c = graphics.Color.fromHsla(hsla);
                    this.set(c.red, c.green, c.blue, c.alpha);
                },
                enumerable: true,
                configurable: true
            });
            ColorBase.prototype.toHsla = function () {
                var r = this.red / 255, g = this.green / 255, b = this.blue / 255;
                var max = Math.max(r, g, b), min = Math.min(r, g, b);
                var h, s, l = (max + min) / 2;
                if (max == min) {
                    h = s = 0; // achromatic
                }
                else {
                    var d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }
                    h /= 6;
                }
                return [h, s, l, this.alpha];
            };
            ColorBase.prototype.toHsl = function () {
                var r = this.red / 255, g = this.green / 255, b = this.blue / 255;
                var max = Math.max(r, g, b), min = Math.min(r, g, b);
                var h, s, l = (max + min) / 2;
                if (max == min) {
                    h = s = 0; // achromatic
                }
                else {
                    var d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }
                    h /= 6;
                }
                return [h, s, l];
            };
            return ColorBase;
        })(ne.math.Vector4);
        graphics.ColorBase = ColorBase;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
/// <reference path="./ColorBase.ts" />
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var Color = (function (_super) {
            __extends(Color, _super);
            function Color(r, g, b, a) {
                if (r === void 0) { r = 0; }
                if (g === void 0) { g = 0; }
                if (b === void 0) { b = 0; }
                if (a === void 0) { a = 255; }
                _super.call(this, r, g, b, a);
            }
            Color._hue2rgb = function (p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            Color._hslToRgb = function (h, s, l, a) {
                var r, g, b;
                if (s == 0) {
                    r = g = b = l; // achromatic
                }
                else {
                    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    var p = 2 * l - q;
                    r = this._hue2rgb(p, q, h + 1 / 3);
                    g = this._hue2rgb(p, q, h);
                    b = this._hue2rgb(p, q, h - 1 / 3);
                }
                return new Color(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a);
            };
            Color.fromRgba = function (rgba) {
                var r = (rgba >> 24) && 0xFF;
                var g = (rgba >> 16) && 0xFF;
                var b = (rgba >> 8) && 0xFF;
                var a = (rgba >> 0) && 0xFF;
                return new Color(r, g, b, a);
            };
            Color.fromRgb = function (rgb) {
                var r = (rgb >> 16) && 0xFF;
                var g = (rgb >> 8) && 0xFF;
                var b = (rgb >> 0) && 0xFF;
                return new Color(r, g, b);
            };
            Color.fromArgb = function (argb) {
                var a = (argb >> 24) && 0xFF;
                var r = (argb >> 16) && 0xFF;
                var g = (argb >> 8) && 0xFF;
                var b = (argb >> 0) && 0xFF;
                return new Color(r, g, b, a);
            };
            Color.fromHsla = function (hsla) {
                var h = hsla[0], s = hsla[1], l = hsla[2], a = hsla[3];
                return this._hslToRgb(h, s, l, a);
            };
            Color.fromHsl = function (hsl) {
                var h = hsl[0], s = hsl[1], l = hsl[2];
                return this._hslToRgb(h, s, l, 255);
            };
            Color.prototype.clone = function () {
                return new Color(this.red, this.green, this.blue, this.alpha);
            };
            Color.prototype.complement = function () {
                this.hue = (0.5 + this.hue) % 1;
                return this;
            };
            Color.prototype.toCss = function () {
                var a = this.alpha / 255;
                return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + a + ")";
            };
            Color.prototype.toStyle = function (w, h, context) {
                return this.toCss();
            };
            Color.prototype.toArgb = function () {
                return this.alpha << 24 + this.red << 16 + this.green << 8 + this.blue;
            };
            Color.prototype.toRgba = function () {
                return this.red << 24 + this.green << 16 + this.blue << 8 + this.alpha;
            };
            Color.prototype.toRgb = function () {
                return this.red << 16 + this.green << 8 + this.blue;
            };
            Color.prototype.grayscale = function () {
                var avg = 0.21 * this.red + 0.72 * this.green + 0.07 * this.blue;
                return this.set(avg, avg, avg);
            };
            Color.prototype.average = function () {
                var avg = (this.red + this.green + this.blue) / 3;
                return this.set(avg, avg, avg);
            };
            Color.prototype.lightnessAverage = function () {
                var args = [this.red, this.green, this.blue];
                var avg = (Math.max.apply(Math, args) + Math.min.apply(Math, args)) / 2;
                return this.set(avg, avg, avg);
            };
            Color.prototype.invert = function (alpha) {
                if (alpha === void 0) { alpha = false; }
                var a = alpha ? 255 - this.alpha : this.alpha;
                return this.set(255 - this.red, 255 - this.green, 255 - this.blue, a);
            };
            Object.defineProperty(Color, "WHITE", {
                get: function () {
                    return new Color(255, 255, 255);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "BLACK", {
                get: function () {
                    return new Color();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "RED", {
                get: function () {
                    return new Color(255, 0, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "GREEN", {
                get: function () {
                    return new Color(0, 128, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "BLUE", {
                get: function () {
                    return new Color(0, 0, 255);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "YELLOW", {
                get: function () {
                    return new Color(255, 255, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "MAGENTA", {
                get: function () {
                    return new Color(255, 0, 255);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "CYAN", {
                get: function () {
                    return new Color(0, 255, 255);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "GRAY", {
                get: function () {
                    return new Color(128, 128, 128);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "DARK_GRAY", {
                get: function () {
                    return new Color(169, 169, 169);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "LIGHT_GRAY", {
                get: function () {
                    return new Color(211, 211, 211);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "ORANGE", {
                get: function () {
                    return new Color(255, 165, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "BROWN", {
                get: function () {
                    return new Color(165, 42, 42);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "LIME", {
                get: function () {
                    return new Color(0, 255, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "LIGHT_BLUE", {
                get: function () {
                    return new Color(173, 216, 230);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "PINK", {
                get: function () {
                    return new Color(255, 192, 203);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "TRANSPARENT", {
                get: function () {
                    return new Color(0, 0, 0, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Color, "RANDOM", {
                get: function () {
                    var r = Math.floor(Math.random() * 255);
                    var g = Math.floor(Math.random() * 255);
                    var b = Math.floor(Math.random() * 255);
                    return new Color(r, g, b);
                },
                enumerable: true,
                configurable: true
            });
            return Color;
        })(graphics.ColorBase);
        graphics.Color = Color;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var Filter = (function () {
            function Filter() {
                this._gl = null;
                this._vertex = new graphics.Shader(this);
                this._fragment = new graphics.Shader(this, true);
                this._attributes = this.makeAttributes();
                this._uniforms = this._formatUniforms(this.makeUniforms());
                this._varying = this.makeVarying();
                this._glProgram = null;
                this._locations = { uniforms: {}, attributes: {} };
            }
            Object.defineProperty(Filter.prototype, "vertex", {
                get: function () {
                    return this._vertex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Filter.prototype, "fragment", {
                get: function () {
                    return this._fragment;
                },
                enumerable: true,
                configurable: true
            });
            Filter.prototype.destroy = function () {
                if (this._gl) {
                    this.vertex.destroy(this._gl);
                    this.fragment.destroy(this._gl);
                    if (this._glProgram) {
                        this._gl.deleteProgram(this._glProgram);
                        this._glProgram = null;
                    }
                }
            };
            Filter.prototype.makeAttributes = function () {
                return {};
            };
            Filter.prototype.makeUniforms = function () {
                return {};
            };
            Filter.prototype.makeVarying = function () {
                return {};
            };
            Filter.prototype.use = function (gl) {
                if (!this._glProgram) {
                    this._compile(gl);
                }
                gl.useProgram(this._glProgram);
            };
            Filter.prototype._compile = function (gl) {
                try {
                    this._gl = gl;
                    this._makeProgram(gl);
                }
                catch (e) {
                    this.destroy();
                    throw e;
                }
            };
            Filter.prototype._makeProgram = function (gl) {
                this._glProgram = gl.createProgram();
                gl.attachShader(this._glProgram, this._vertex.compile(gl));
                gl.attachShader(this._glProgram, this._fragment.compile(gl));
                gl.linkProgram(this._glProgram);
                this._checkProgram(gl);
                this._getLocations(gl);
            };
            Filter.prototype._getLocations = function (gl) {
                this._getUniformLocations(gl);
                this._getAttributeLocations(gl);
            };
            Filter.prototype._getUniformLocations = function (gl) {
                var _this = this;
                Object.keys(this.uniforms).forEach(function (u) {
                    _this._locations.uniforms[u] = gl.getUniformLocation(_this._glProgram, u);
                });
            };
            Filter.prototype._getAttributeLocations = function (gl) {
                var _this = this;
                Object.keys(this.attributes).forEach(function (a) {
                    _this._locations.attributes[a] = gl.getAttribLocation(_this._glProgram, a);
                });
            };
            Filter.prototype._checkProgram = function (gl) {
                var success = gl.getProgramParameter(this._glProgram, gl.LINK_STATUS);
                if (!success) {
                    throw new Error("program filed to link:" + gl.getProgramInfoLog(this._glProgram));
                }
            };
            Filter.prototype._formatUniforms = function (u) {
                var result = {};
                Object.keys(u)
                    .forEach(function (key) {
                    var type = u[key];
                    result[key] = { type: Filter.TYPES[type], value: Filter.DEFAULTS[type]() };
                });
                return result;
            };
            Object.defineProperty(Filter.prototype, "uniforms", {
                get: function () {
                    return this._uniforms;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Filter.prototype, "attributes", {
                get: function () {
                    return this._attributes;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Filter.prototype, "varying", {
                get: function () {
                    return this._varying;
                },
                enumerable: true,
                configurable: true
            });
            Filter.TYPES = {
                number: 'float',
                float: 'float',
                vec2: 'vec2',
                vec3: 'vec3',
                vec4: 'vec4',
                mat2: 'mat2',
                mat3: 'mat3',
                mat4: 'mat4',
                color: 'vec4',
                rect: 'vec4',
                point: 'vec3',
                sampler2d: 'sampler2d',
                texture: 'sampler2d'
            };
            Filter.DEFAULTS = {
                number: function () { return 0; },
                float: function () { return 0; },
                mat2: function () { return new ne.math.Matrix2(); },
                mat3: function () { return new ne.math.Matrix3(); },
                mat4: function () { return new ne.math.Matrix4(); },
                vec2: function () { return new ne.math.Vector2(); },
                vec3: function () { return new ne.math.Vector3(); },
                vec4: function () { return new ne.math.Vector4(); },
                color: function () { return new graphics.Color(); },
                rect: function () { return new graphics.Rect(); },
                point: function () { return new graphics.Point(); },
                sampler2d: function () { return null; },
                texture: function () { return null; },
            };
            Filter.UPDATE = {
                number: function (gl, location, value) {
                    gl.uniform1f(location, value);
                },
                float: function (gl, location, value) {
                    gl.uniform1f(location, value);
                },
                mat2: function (gl, location, value) {
                    gl.uniformMatrix2fv(location, false, value.data);
                },
                mat3: function (gl, location, value) {
                    gl.uniformMatrix3fv(location, false, value.data);
                },
                mat4: function (gl, location, value) {
                    gl.uniformMatrix4fv(location, false, value.data);
                },
                vec2: function (gl, location, value) {
                    gl.uniform2fv(location, value.data);
                },
                vec3: function (gl, location, value) {
                    gl.uniform3fv(location, value.data);
                },
                vec4: function (gl, location, value) {
                    gl.uniform4fv(location, value.data);
                },
                color: function (gl, location, value) {
                    gl.uniform4fv(location, value.data);
                },
                rect: function (gl, location, value) {
                    gl.uniform4fv(location, value.data);
                },
                point: function (gl, location, value) {
                    gl.uniform3fv(location, value.data);
                },
                sampler2d: function (gl, location, value) {
                    if (value) {
                    }
                },
                texture: function (gl, location, value) {
                    if (value) {
                    }
                }
            };
            return Filter;
        })();
        graphics.Filter = Filter;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var Font = (function () {
            function Font(family, size) {
                if (family === void 0) { family = Font.DEFAULT_FAMILY; }
                if (size === void 0) { size = Font.DEFAULT_SIZE; }
                this.strokeStyle = Font.DEFAULT_STROKE_STYLE;
                this.fillStyle = Font.DEFAULT_FILL_STYLE;
                this.family = family;
                this.size = size;
            }
            Object.defineProperty(Font.prototype, "family", {
                get: function () {
                    return this._family.split(' ');
                },
                set: function (value) {
                    if (typeof value == 'string') {
                        this._family = value;
                    }
                    else {
                        this._family = value.join(' ');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Font.DEFAULT_STROKE_STYLE = graphics.Color.TRANSPARENT;
            Font.DEFAULT_FILL_STYLE = graphics.Color.BLACK;
            Font.DEFAULT_SIZE = 24;
            Font.DEFAULT_FAMILY = 'monospace';
            return Font;
        })();
        graphics.Font = Font;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
/// <reference path="./Color.ts" />
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var Gradient = (function () {
            function Gradient() {
                this.__stops = [];
            }
            Object.defineProperty(Gradient.prototype, "_stops", {
                get: function () {
                    return this._stops;
                },
                enumerable: true,
                configurable: true
            });
            Gradient.prototype.addColorStop = function (percent, color) {
                this._stops.push({ color: color, percent: percent });
            };
            Gradient.prototype.toStyle = function (w, h, context) {
                var style = this.createGradient(w, h, context);
                this._stops.forEach(function (c) {
                    style.addColorStop(c.percent, c.color.toCss());
                });
                return style;
            };
            Gradient.prototype.createGradient = function (w, h, context) {
                return null;
            };
            return Gradient;
        })();
        graphics.Gradient = Gradient;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
/// <reference path="./Color.ts" />
/// <reference path="./Gradient.ts" />
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var LinearGradient = (function (_super) {
            __extends(LinearGradient, _super);
            function LinearGradient(angle) {
                if (angle === void 0) { angle = 0; }
                _super.call(this);
                this.angle = angle;
            }
            LinearGradient.prototype.createGradient = function (w, h, context) {
                var a = this.angle * Math.PI / 180;
                var s = Math.sin(a);
                var c = Math.cos(a);
                var x = w * c * c + h * s * s;
                var y = h * c * c + w * s * s;
                return context.createLinearGradient(0, 0, x, y);
            };
            return LinearGradient;
        })(graphics.Gradient);
        graphics.LinearGradient = LinearGradient;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var PatternRepeat;
        (function (PatternRepeat) {
            PatternRepeat.BOTH = 'repeat';
            PatternRepeat.X = 'repeat-x';
            PatternRepeat.Y = 'repeat-y';
            PatternRepeat.NONE = 'no-repeat';
        })(PatternRepeat = graphics.PatternRepeat || (graphics.PatternRepeat = {}));
        var Pattern = (function () {
            function Pattern(pixmap, repeat) {
                if (repeat === void 0) { repeat = PatternRepeat.BOTH; }
                this.pixmap = pixmap;
                this.repeat = repeat;
            }
            Pattern.prototype.toStyle = function (w, h, context) {
                var repeat = '';
                context.createPattern(this.pixmap.canvas, repeat);
                return null;
            };
            return Pattern;
        })();
        graphics.Pattern = Pattern;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var Pixmap = (function () {
            function Pixmap(width, height) {
                this._canvas = document.createElement('canvas');
                this._canvas.width = width;
                this._canvas.height = height;
                this._context = this._canvas.getContext('2d');
            }
            Pixmap.fromImage = function (img) {
                var px = new Pixmap(img.width, img.height);
                px.context.drawImage(img, 0, 0);
                return px;
            };
            Object.defineProperty(Pixmap.prototype, "canvas", {
                get: function () {
                    return this._canvas;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Pixmap.prototype, "context", {
                get: function () {
                    return this._context;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Pixmap.prototype, "width", {
                get: function () {
                    return this._canvas.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Pixmap.prototype, "height", {
                get: function () {
                    return this._canvas.height;
                },
                enumerable: true,
                configurable: true
            });
            return Pixmap;
        })();
        graphics.Pixmap = Pixmap;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var Point = (function (_super) {
            __extends(Point, _super);
            function Point() {
                _super.apply(this, arguments);
            }
            return Point;
        })(ne.math.Vector3);
        graphics.Point = Point;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var Position;
        (function (Position) {
            Position.TOP = function (w, h) { return [w / 2, 0]; };
            Position.LEFT = function (w, h) { return [0, h / 2]; };
            Position.RIGHT = function (w, h) { return [w, h / 2]; };
            Position.BOTTOM = function (w, h) { return [w / 2, h]; };
            Position.TOP_LEFT = function (w, h) { return [0, 0]; };
            Position.TOP_RIGHT = function (w, h) { return [w, 0]; };
            Position.BOTTOM_LEFT = function (w, h) { return [0, h]; };
            Position.BOTTOM_RIGHT = function (w, h) { return [w, h]; };
            Position.MIDDLE = function (w, h) { return [w / 2, h / 2]; };
            function percent(x, y) {
                return function (w, h) { return [w * x, h * y]; };
            }
            Position.percent = percent;
            function absolute(x, y) {
                return function (w, h) { return [x, y]; };
            }
            Position.absolute = absolute;
        })(Position = graphics.Position || (graphics.Position = {}));
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
/// <reference path="./Color.ts" />
/// <reference path="./Gradient.ts" />
/// <reference path="./Position.ts" />
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var RadialGradient = (function (_super) {
            __extends(RadialGradient, _super);
            function RadialGradient(startRadius, endRadius, position) {
                if (startRadius === void 0) { startRadius = 0; }
                if (endRadius === void 0) { endRadius = 1; }
                if (position === void 0) { position = graphics.Position.MIDDLE; }
                _super.call(this);
                this.startRadius = startRadius;
                this.endRadius = endRadius;
                this.position = position;
            }
            RadialGradient.prototype.createGradient = function (w, h, context) {
                var _a = this.position(w, h), x = _a[0], y = _a[1];
                return context.createRadialGradient(x, y, this.startRadius * x, w, h, this.endRadius * y);
            };
            RadialGradient.prototype.getAngle = function () {
                switch (graphics.Position) {
                    default:
                }
            };
            return RadialGradient;
        })(graphics.Gradient);
        graphics.RadialGradient = RadialGradient;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
/// <reference path="../math/Vector4.ts" />
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var Rect = (function (_super) {
            __extends(Rect, _super);
            function Rect() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(Rect.prototype, "z", {
                get: function () {
                    return this[3];
                },
                set: function (value) {
                    this[3] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "w", {
                get: function () {
                    return this[2];
                },
                set: function (value) {
                    this[2] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "h", {
                get: function () {
                    return this[3];
                },
                set: function (value) {
                    this[3] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "width", {
                get: function () {
                    return this.w;
                },
                set: function (value) {
                    this.w = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "height", {
                get: function () {
                    return this.h;
                },
                set: function (value) {
                    this.h = value;
                },
                enumerable: true,
                configurable: true
            });
            Rect.prototype.clone = function () {
                return new Rect(this.x, this.y, this.w, this.h);
            };
            return Rect;
        })(ne.math.Vector4);
        graphics.Rect = Rect;
        ne.math.vectorFields(Rect.prototype, 'x', 'y', 'w', 'h');
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var Shader = (function () {
            function Shader(filter, fragment) {
                if (fragment === void 0) { fragment = false; }
                this.src = '';
                this._glShader = null;
                this._fragment = fragment;
                this._filter = filter;
            }
            Object.defineProperty(Shader.prototype, "fragment", {
                get: function () {
                    return this._fragment;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Shader.prototype, "generatedSource", {
                get: function () {
                    var head = this._makeHead();
                    var vars = this._makeVariables();
                    return "" + head + vars + "\nvoid main(void) {\n" + this.src + "\n}";
                },
                enumerable: true,
                configurable: true
            });
            Shader.prototype.destroy = function (gl) {
                if (this._glShader) {
                    gl.deleteShader(this._glShader);
                    this._glShader = null;
                }
            };
            Shader.prototype.compile = function (gl) {
                if (this._glShader === null) {
                    var type = this.fragment ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER;
                    this._glShader = gl.createShader(type);
                    gl.shaderSource(this._glShader, this.generatedSource);
                    gl.compileShader(this._glShader);
                }
                this._validateShader(gl);
                return this._glShader;
            };
            Shader.prototype._validateShader = function (gl) {
                var success = gl.getShaderParameter(this._glShader, gl.COMPILE_STATUS);
                if (!success) {
                    // Something went wrong during compilation; get the error
                    var err = "Could not compile shader: " + gl.getShaderInfoLog(this._glShader);
                    this.destroy(gl);
                    throw new Error(err);
                }
            };
            Shader.prototype._makeHead = function () {
                return 'precision mediump float;\n';
            };
            Shader.prototype._makeVariables = function () {
                if (this.fragment) {
                    return this._mapFragmentVariables();
                }
                return this._mapVertexVariables();
            };
            Shader.prototype._mapAttributes = function () {
                var attr = this._filter.attributes;
                return Object.keys(attr)
                    .map(function (k) {
                    return attr[k] + " " + k + ";";
                })
                    .join('\n');
            };
            Shader.prototype._mapUniforms = function () {
                var attr = this._filter.uniforms;
                return Object.keys(attr)
                    .map(function (k) {
                    return attr[k].type + " " + k + ";";
                })
                    .join('\n');
            };
            Shader.prototype._mapVarying = function () {
                var attr = this._filter.varying;
                return Object.keys(attr)
                    .map(function (k) {
                    return attr[k] + " " + k + ";";
                })
                    .join('\n');
            };
            Shader.prototype._mapVertexVariables = function () {
                return this._mapAttributes() + this._mapUniforms() + this._mapVarying();
            };
            Shader.prototype._mapFragmentVariables = function () {
                return this._mapUniforms() + this._mapVarying();
            };
            return Shader;
        })();
        graphics.Shader = Shader;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var Texture = (function () {
            function Texture(pixmap) {
                this._pixmap = pixmap;
                this._gl = null;
                this._glTexture = null;
                this._glBuffer = null;
                this._buffer = new Float32Array(12);
            }
            Texture.prototype.destroy = function () {
                if (this._gl !== null) {
                    this._destroyGlTexture();
                    this._destroyGlBuffer();
                }
            };
            Texture.prototype._destroyGlTexture = function () {
                if (this._glTexture !== null) {
                    this._gl.deleteTexture(this._glTexture);
                }
                this._glTexture = null;
            };
            Texture.prototype._destroyGlBuffer = function () {
                if (this._glBuffer !== null) {
                    this._gl.deleteBuffer(this._glTexture);
                }
                this._glBuffer = null;
            };
            Texture.prototype.generate = function (gl) {
                this._gl = gl;
                this._generateGlBuffer();
                this.bind(new graphics.Rect(0, 0, this.width, this.height));
                this._generateGlTexture();
                return this._glTexture;
            };
            Texture.prototype.update = function () {
                this.destroy();
            };
            Texture.prototype.check = function (gl) {
                if (!this._glTexture) {
                    this.generate(gl);
                }
            };
            Texture.prototype.bind = function (rect) {
                this._bindGlBuffer(this._buffer, rect);
                this._bindGlTexture();
            };
            Texture.prototype.bindAll = function (rects) {
                var buffer = new Float32Array(rects.length * 12);
                var length = rects.length;
                for (var i = 0; i < length; ++i) {
                    this.calculateRect(buffer, rects[i], i * 12);
                }
                this._bindGlTexture();
            };
            Texture.prototype._generateGlTexture = function () {
                var gl = this._gl;
                gl.bindTexture(gl.TEXTURE_2D, this._glTexture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._pixmap.canvas);
            };
            Texture.prototype._generateGlBuffer = function () {
                this._glBuffer = this._gl.createBuffer();
            };
            Texture.prototype._bindGlBuffer = function (buffer, rect) {
                this.calculateRect(buffer, rect);
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._glBuffer);
                this._gl.bufferData(this._gl.ARRAY_BUFFER, buffer, this._gl.STATIC_DRAW);
            };
            Texture.prototype._bindGlTexture = function () {
                var gl = this._gl;
                gl.bindTexture(gl.TEXTURE_2D, this._glTexture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            };
            Texture.prototype.calculateRect = function (buffer, rect, offset) {
                if (offset === void 0) { offset = 0; }
                var x = rect.x / this.width, y = rect.y / this.height;
                var w = rect.width / this.width, h = rect.height / this.height;
                buffer[offset + 0] = buffer[offset + 4] = buffer[offset + 6] = x;
                buffer[offset + 1] = buffer[offset + 3] = buffer[offset + 9] = y;
                buffer[offset + 2] = buffer[offset + 8] = buffer[offset + 10] = w + x;
                buffer[offset + 5] = buffer[offset + 7] = buffer[offset + 11] = h + y;
            };
            Object.defineProperty(Texture.prototype, "width", {
                get: function () {
                    return this._pixmap.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Texture.prototype, "height", {
                get: function () {
                    return this._pixmap.height;
                },
                enumerable: true,
                configurable: true
            });
            return Texture;
        })();
        graphics.Texture = Texture;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var Tone = (function (_super) {
            __extends(Tone, _super);
            function Tone() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(Tone.prototype, 0, {
                get: function () {
                    return this._data[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tone.prototype, 0, {
                set: function (value) {
                    this._data[0] = Math.min(255, Math.max(-255, value));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tone.prototype, 1, {
                get: function () {
                    return this._data[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tone.prototype, 1, {
                set: function (value) {
                    this._data[1] = Math.min(255, Math.max(-255, value));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tone.prototype, 2, {
                get: function () {
                    return this._data[2];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tone.prototype, 2, {
                set: function (value) {
                    this._data[2] = Math.min(255, Math.max(-255, value));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tone.prototype, 3, {
                get: function () {
                    return this._data[3];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tone.prototype, "red", {
                get: function () {
                    return this.r;
                },
                set: function (value) {
                    this.r = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tone.prototype, "green", {
                get: function () {
                    return this.g;
                },
                set: function (value) {
                    this.g = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tone.prototype, "blue", {
                get: function () {
                    return this.b;
                },
                set: function (value) {
                    this.b = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tone.prototype, "gray", {
                get: function () {
                    return this.a;
                },
                set: function (value) {
                    this.a = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tone.prototype, "grey", {
                get: function () {
                    return this.a;
                },
                set: function (value) {
                    this.a = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tone.prototype, 3, {
                set: function (value) {
                    this._data[3] = Math.min(255, Math.max(0, value));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Tone, "RANDOM", {
                get: function () {
                    var red = Math.floor(Math.random() * 512 - 255);
                    var green = Math.floor(Math.random() * 512 - 255);
                    var blue = Math.floor(Math.random() * 512 - 255);
                    var gray = Math.floor(Math.random() * 256);
                    return new Tone(red, green, blue, gray);
                },
                enumerable: true,
                configurable: true
            });
            return Tone;
        })(ne.math.Vector4);
        graphics.Tone = Tone;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
/// <reference path="./Render.ts" />
var ne;
(function (ne) {
    var graphics;
    (function (graphics) {
        var WebGLRender = (function (_super) {
            __extends(WebGLRender, _super);
            function WebGLRender(width, height) {
                _super.call(this, width, height);
                this._gl = this.canvas.getContext('webgl');
                if (!this._gl) {
                    this._gl = this.canvas.getContext('experimental-webgl');
                }
                if (!this._gl) {
                    throw new Error("Your browser doesn't support WebGL.");
                }
            }
            Object.defineProperty(WebGLRender.prototype, "gl", {
                get: function () {
                    return this._gl;
                },
                enumerable: true,
                configurable: true
            });
            WebGLRender.prototype.render = function (object) {
                object.render(this._gl);
            };
            return WebGLRender;
        })(graphics.Render);
        graphics.WebGLRender = WebGLRender;
    })(graphics = ne.graphics || (ne.graphics = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var math;
    (function (math) {
        var Matrix2 = (function () {
            function Matrix2() {
                this._data = new Float32Array(this.width * this.height);
            }
            Object.defineProperty(Matrix2.prototype, "width", {
                get: function () {
                    return 2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix2.prototype, "height", {
                get: function () {
                    return this.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix2.prototype, "data", {
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix2.prototype, '0', {
                get: function () {
                    return this._data[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix2.prototype, '0', {
                set: function (value) {
                    this._data[0] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix2.prototype, '1', {
                get: function () {
                    return this._data[1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix2.prototype, '1', {
                set: function (value) {
                    this._data[1] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix2.prototype, '2', {
                get: function () {
                    return this._data[2];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix2.prototype, '2', {
                set: function (value) {
                    this._data[2] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix2.prototype, '3', {
                get: function () {
                    return this._data[3];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix2.prototype, '3', {
                set: function (value) {
                    this._data[3] = value;
                },
                enumerable: true,
                configurable: true
            });
            Matrix2.prototype.at = function (x, y) {
                return this[x % this.width + Math.floor(y / this.width)];
            };
            Matrix2.prototype.set = function (x, y, value) {
                this[x % this.width + Math.floor(y / this.width)] = value;
            };
            Matrix2.prototype.copyFrom = function (mat) {
                var length = this.width * this.height;
                var a = this.data;
                var b = mat.data;
                for (var i = 0; i < length; ++i) {
                    a[i] = b[i];
                }
                return this;
            };
            Matrix2.prototype.copyTo = function (mat) {
                return mat.copyFrom(this);
            };
            Object.defineProperty(Matrix2, "IDENTITY", {
                get: function () {
                    var mat = new Matrix2();
                    mat[0] = mat[3] = 1;
                    return mat;
                },
                enumerable: true,
                configurable: true
            });
            return Matrix2;
        })();
        math.Matrix2 = Matrix2;
    })(math = ne.math || (ne.math = {}));
})(ne || (ne = {}));
/// <reference path="./Matrix2.ts" />
var ne;
(function (ne) {
    var math;
    (function (math) {
        var Matrix3 = (function (_super) {
            __extends(Matrix3, _super);
            function Matrix3() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(Matrix3.prototype, '4', {
                get: function () {
                    return this._data[4];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3.prototype, '4', {
                set: function (value) {
                    this._data[4] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3.prototype, '5', {
                get: function () {
                    return this._data[5];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3.prototype, '5', {
                set: function (value) {
                    this._data[5] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3.prototype, '6', {
                get: function () {
                    return this._data[6];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3.prototype, '6', {
                set: function (value) {
                    this._data[6] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3.prototype, '7', {
                get: function () {
                    return this._data[7];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3.prototype, '7', {
                set: function (value) {
                    this._data[7] = value;
                },
                enumerable: true,
                configurable: true
            });
            Matrix3.prototype.mul = function (other) {
                var a = this.data;
                var b = other.data;
                var a00 = a[0], a01 = a[1], a02 = a[2];
                var a10 = a[3], a11 = a[4], a12 = a[5];
                var a20 = a[6], a21 = a[7], a22 = a[8];
                var b00 = b[0], b01 = b[1], b02 = b[2];
                var b10 = b[3], b11 = b[4], b12 = b[5];
                var b20 = b[6], b21 = b[7], b22 = b[8];
                a[0] = a00 * b00 + a01 * b10 + a02 * b20;
                a[1] = a00 * b01 + a01 * b11 + a02 * b21;
                a[2] = a00 * b02 + a01 * b12 + a02 * b22;
                a[3] = a10 * b00 + a11 * b10 + a12 * b20;
                a[4] = a10 * b01 + a11 * b11 + a12 * b21;
                a[5] = a10 * b02 + a11 * b12 + a12 * b22;
                a[6] = a20 * b00 + a21 * b10 + a22 * b20;
                a[7] = a20 * b01 + a21 * b11 + a22 * b21;
                a[8] = a20 * b02 + a21 * b12 + a22 * b22;
                return this;
            };
            Matrix3.prototype.translate = function (x, y) {
                return this.mul(Matrix3.translation(x, y));
            };
            Matrix3.prototype.rotate = function (angle) {
                return this.mul(Matrix3.rotation(angle));
            };
            Matrix3.prototype.scale = function (x, y) {
                return this.mul(Matrix3.scale(x, y));
            };
            Object.defineProperty(Matrix3, "IDENTITY", {
                get: function () {
                    var mat = new Matrix3();
                    var data = mat.data;
                    data[0] = data[4] = data[8] = 1;
                    return mat;
                },
                enumerable: true,
                configurable: true
            });
            Matrix3.translation = function (x, y) {
                var mat = new Matrix3();
                var data = mat.data;
                data[0] = data[4] = data[8] = 1;
                data[6] = x;
                data[7] = y;
                return mat;
            };
            Matrix3.rotation = function (angle) {
                var mat = new Matrix3();
                var data = mat.data;
                var c = Math.cos(angle);
                var s = Math.sin(angle);
                data[0] = data[4] = c;
                data[1] = -s;
                data[3] = s;
                data[8] = 1;
                return mat;
            };
            Matrix3.scale = function (x, y) {
                var mat = new Matrix3();
                var data = mat.data;
                data[0] = x;
                data[4] = y;
                data[8] = 1;
                return mat;
            };
            Matrix3.projection = function (w, h) {
                var mat = new Matrix3();
                var data = mat.data;
                data[0] = 2 / w;
                data[4] = -2 / h;
                data[6] = -1;
                data[7] = mat[8] = 1;
                return mat;
            };
            return Matrix3;
        })(math.Matrix2);
        math.Matrix3 = Matrix3;
    })(math = ne.math || (ne.math = {}));
})(ne || (ne = {}));
/// <reference path="./Matrix3.ts" />
var ne;
(function (ne) {
    var math;
    (function (math) {
        var Matrix4 = (function (_super) {
            __extends(Matrix4, _super);
            function Matrix4() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(Matrix4.prototype, '8', {
                get: function () {
                    return this._data[8];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '8', {
                set: function (value) {
                    this._data[8] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '9', {
                get: function () {
                    return this._data[9];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '9', {
                set: function (value) {
                    this._data[9] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '10', {
                get: function () {
                    return this._data[10];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '10', {
                set: function (value) {
                    this._data[10] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '11', {
                get: function () {
                    return this._data[11];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '11', {
                set: function (value) {
                    this._data[11] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '12', {
                get: function () {
                    return this._data[12];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '12', {
                set: function (value) {
                    this._data[12] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '13', {
                get: function () {
                    return this._data[13];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '13', {
                set: function (value) {
                    this._data[13] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '14', {
                get: function () {
                    return this._data[14];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '14', {
                set: function (value) {
                    this._data[14] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '15', {
                get: function () {
                    return this._data[15];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4.prototype, '15', {
                set: function (value) {
                    this._data[15] = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix4, "IDENTITY", {
                get: function () {
                    var mat = new Matrix4();
                    var data = mat.data;
                    data[0] = data[5] = data[10] = data[15] = 1;
                    return mat;
                },
                enumerable: true,
                configurable: true
            });
            Matrix4.translation = function (x, y, z) {
                if (z === void 0) { z = 0; }
                var mat = this.IDENTITY;
                var data = mat.data;
                data[12] = x;
                data[13] = y;
                data[14] = z;
                return mat;
            };
            Matrix4.xRotation = function (angle) {
                var c = Math.cos(angle);
                var s = Math.sin(angle);
                var mat = this.IDENTITY;
                var data = mat.data;
                data[5] = data[10] = c;
                data[6] = s;
                data[9] = -s;
                return mat;
            };
            ;
            Matrix4.yRotation = function (angle) {
                var c = Math.cos(angle);
                var s = Math.sin(angle);
                var mat = this.IDENTITY;
                var data = mat.data;
                data[0] = c;
                data[2] = -s;
                data[8] = s;
                data[10] = c;
                return mat;
            };
            ;
            Matrix4.zRotation = function (angle) {
                var c = Math.cos(angle);
                var s = Math.sin(angle);
                var mat = this.IDENTITY;
                var data = mat.data;
                data[0] = data[5] = c;
                data[1] = s;
                data[4] = -s;
                return mat;
            };
            Matrix4.rotation = function (angle) {
                return this.zRotation(angle);
            };
            Matrix4.scale = function (x, y, z) {
                if (z === void 0) { z = 1; }
                var mat = this.IDENTITY;
                var data = mat.data;
                data[0] = x;
                data[5] = y;
                data[10] = z;
                return mat;
            };
            Matrix4.camera = function (cam) {
                var mat = new Matrix4();
                return mat.camera(cam);
            };
            Matrix4.prototype.camera = function (cam) {
                return this.lookAt(cam.origin, cam.destination, cam.up);
            };
            Matrix4.prototype.lookAt = function (from, to, up) {
                var pos = from.clone();
                var zAxis = pos.sub(to).normalize();
                var xAxis = up.clone().cross(zAxis);
                var yAxis = zAxis.clone().cross(xAxis);
                var d = this.data, dx = xAxis.data, dy = yAxis.data, dz = zAxis.data, pd = pos.data;
                d[0] = dx[0];
                d[1] = dx[1];
                d[2] = dx[2];
                d[3] = 0;
                d[4] = dy[0];
                d[5] = dy[1];
                d[6] = dy[2];
                d[7] = 0;
                d[8] = dz[0];
                d[9] = dz[1];
                d[10] = dz[2];
                d[11] = 0;
                d[12] = pd[0];
                d[13] = pd[1];
                d[14] = pd[2];
                d[15] = 0;
                return this;
            };
            Matrix4.prototype.translate = function (x, y, z) {
                if (z === void 0) { z = 0; }
                return this.mul(Matrix4.translation(x, y, z));
            };
            Matrix4.prototype.rotate = function (angle) {
                return this.zRotate(angle);
            };
            Matrix4.prototype.xRotate = function (angle) {
                return this.mul(Matrix4.xRotation(angle));
            };
            Matrix4.prototype.yRotate = function (angle) {
                return this.mul(Matrix4.yRotation(angle));
            };
            Matrix4.prototype.zRotate = function (angle) {
                return this.mul(Matrix4.zRotation(angle));
            };
            Matrix4.prototype.scale = function (x, y, z) {
                if (z === void 0) { z = 1; }
                return this.mul(Matrix4.scale(x, y, z));
            };
            Matrix4.prototype.mul = function (other) {
                var a = this.data;
                var b = other.data;
                var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
                var b00 = b[0], b01 = b[1], b02 = b[2], b03 = b[3], b10 = b[4], b11 = b[5], b12 = b[6], b13 = b[7], b20 = b[8], b21 = b[9], b22 = b[10], b23 = b[11], b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];
                a[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
                a[1] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
                a[2] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
                a[3] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
                a[4] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
                a[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
                a[6] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
                a[7] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
                a[8] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
                a[9] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
                a[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
                a[11] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
                a[12] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
                a[13] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
                a[14] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
                a[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
                return this;
            };
            Matrix4.prototype.inverse = function () {
                var m = this.data;
                var m00 = m[0], m01 = m[1], m02 = m[2], m03 = m[3];
                var m10 = m[4], m11 = m[5], m12 = m[6], m13 = m[7];
                var m20 = m[8], m21 = m[9], m22 = m[10], m23 = m[11];
                var m30 = m[12], m31 = m[13], m32 = m[14], m33 = m[15];
                var t0 = m22 * m33, t1 = m32 * m23, t2 = m12 * m33, t3 = m32 * m13;
                var t4 = m12 * m23, t5 = m22 * m13, t6 = m02 * m33, t7 = m32 * m03;
                var t8 = m02 * m23, t9 = m22 * m03, t10 = m02 * m13, t11 = m12 * m03;
                var t12 = m20 * m31, t13 = m30 * m21, t14 = m10 * m31, t15 = m30 * m11;
                var t16 = m10 * m21, t17 = m20 * m11, t18 = m00 * m31, t19 = m30 * m01;
                var t20 = m00 * m21, t21 = m20 * m01, t22 = m00 * m11, t23 = m10 * m01;
                var t0 = (t0 * m11 + t3 * m21 + t4 * m31) -
                    (t1 * m11 + t2 * m21 + t5 * m31);
                var t1 = (t1 * m01 + t6 * m21 + t9 * m31) -
                    (t0 * m01 + t7 * m21 + t8 * m31);
                var t2 = (t2 * m01 + t7 * m11 + t10 * m31) -
                    (t3 * m01 + t6 * m11 + t11 * m31);
                var t3 = (t5 * m01 + t8 * m11 + t11 * m21) -
                    (t4 * m01 + t9 * m11 + t10 * m21);
                var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
                m[0] = d * t0;
                m[1] = d * t1;
                m[2] = d * t2;
                m[3] = d * t3;
                m[4] = d * ((t1 * m10 + t2 * m20 + t5 * m30) - (t0 * m10 + t3 * m20 + t4 * m30));
                m[5] = d * ((t0 * m00 + t7 * m20 + t8 * m30) - (t1 * m00 + t6 * m20 + t9 * m30));
                m[6] = d * ((t3 * m00 + t6 * m10 + t11 * m30) - (t2 * m00 + t7 * m10 + t10 * m30));
                m[7] = d * ((t4 * m00 + t9 * m10 + t10 * m20) - (t5 * m00 + t8 * m10 + t11 * m20));
                m[8] = d * ((t12 * m13 + t15 * m23 + t16 * m33) - (t13 * m13 + t14 * m23 + t17 * m33));
                m[9] = d * ((t13 * m03 + t18 * m23 + t21 * m33) - (t12 * m03 + t19 * m23 + t20 * m33));
                m[10] = d * ((t14 * m03 + t19 * m13 + t22 * m33) - (t15 * m03 + t18 * m13 + t23 * m33));
                m[11] = d * ((t17 * m03 + t20 * m13 + t23 * m23) - (t16 * m03 + t21 * m13 + t22 * m23));
                m[12] = d * ((t14 * m22 + t17 * m32 + t13 * m12) - (t16 * m32 + t12 * m12 + t15 * m22));
                m[13] = d * ((t20 * m32 + t12 * m02 + t19 * m22) - (t18 * m22 + t21 * m32 + t13 * m02));
                m[14] = d * ((t18 * m12 + t23 * m32 + t15 * m02) - (t22 * m32 + t14 * m02 + t19 * m12));
                m[15] = d * ((t22 * m22 + t16 * m02 + t21 * m12) - (t20 * m12 + t23 * m22 + t17 * m02));
                return this;
            };
            return Matrix4;
        })(math.Matrix3);
        math.Matrix4 = Matrix4;
    })(math = ne.math || (ne.math = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var math;
    (function (math) {
        function permutator(inputArr) {
            var results = [];
            function permute(arr, memo) {
                if (memo === void 0) { memo = []; }
                var cur;
                for (var i = 0; i < arr.length; i++) {
                    cur = arr.splice(i, 1);
                    if (arr.length === 0) {
                        results.push(memo.concat(cur));
                    }
                    permute(arr.slice(), memo.concat(cur));
                    arr.splice(i, 0, cur[0]);
                }
                return results;
            }
            return permute(inputArr);
        }
        math.permutator = permutator;
    })(math = ne.math || (ne.math = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var scene;
    (function (scene) {
        var Camera = (function () {
            function Camera() {
                this._origin = new ne.math.Vector3();
                this._destination = new ne.math.Vector3();
                this._up = new ne.math.Vector3();
                this._view = new ne.math.Matrix4();
            }
            Object.defineProperty(Camera.prototype, "origin", {
                get: function () {
                    return this._origin;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "destination", {
                get: function () {
                    return this._destination;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "up", {
                get: function () {
                    return this._up;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "matrix", {
                get: function () {
                    return this._view.camera(this);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Camera.prototype, "view", {
                get: function () {
                    return this.matrix.inverse();
                },
                enumerable: true,
                configurable: true
            });
            return Camera;
        })();
        scene.Camera = Camera;
    })(scene = ne.scene || (ne.scene = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var scene;
    (function (scene) {
        var Scene = (function () {
            function Scene(manager) {
                this._eventManager = new ne.utils.EventManager(this);
                this._manager = manager;
            }
            Scene.prototype.defaultEvent = function (name, event) {
            };
            Object.defineProperty(Scene.prototype, "manager", {
                get: function () {
                    return this._manager;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scene.prototype, "events", {
                get: function () {
                    return this._eventManager;
                },
                enumerable: true,
                configurable: true
            });
            Scene.prototype.load = function (loader) {
            };
            Scene.prototype.start = function (loader) {
            };
            Scene.prototype.destroy = function () {
            };
            Scene.prototype.update = function (delta) {
            };
            Scene.prototype.render = function (gl) {
            };
            return Scene;
        })();
        scene.Scene = Scene;
    })(scene = ne.scene || (ne.scene = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var scene;
    (function (scene_1) {
        var SceneManager = (function () {
            function SceneManager(loadScene) {
                if (loadScene === void 0) { loadScene = null; }
                this._sceneStack = [null];
                this._lastScene = null;
                this._instance = null;
                this.setupLoadScene(loadScene);
            }
            SceneManager.prototype.setupLoadScene = function (scene) {
                var _this = this;
                this._isReady = false;
                var loader = new ne.utils.Loader();
                this._loadScene = new (scene || scene_1.Scene)(this);
                this._instance.load(loader);
                loader.done(function () { return _this._isReady = true; });
                loader.start();
            };
            Object.defineProperty(SceneManager.prototype, "ready", {
                get: function () {
                    return this._isReady;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SceneManager.prototype, "scene", {
                get: function () {
                    return this._sceneStack[this._sceneStack.length - 1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SceneManager.prototype, "events", {
                get: function () {
                    return this._instance ? this._instance.events : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SceneManager.prototype, "instance", {
                get: function () {
                    return this._instance;
                },
                enumerable: true,
                configurable: true
            });
            SceneManager.prototype.goto = function (scene) {
                this.clear();
                this.call(scene);
            };
            SceneManager.prototype.call = function (scene) {
                this._sceneStack.push(scene);
            };
            SceneManager.prototype.back = function () {
            };
            SceneManager.prototype.clear = function () {
                this._sceneStack = [null];
            };
            SceneManager.prototype.update = function (delta) {
                if (!this.ready)
                    return;
                var scene = this.scene;
                if (this._lastScene !== scene) {
                    this._swapScene(scene);
                    return;
                }
                this._updateInstance(delta);
            };
            SceneManager.prototype._swapScene = function (scene) {
                this._lastScene = scene;
                this._terminate();
                this._instance = new scene(this);
                var loader = new ne.utils.Loader();
                loader.done(this._afterLoad.bind(this));
                this._instance.load(loader);
                loader.start();
                this._loadScene.start(loader.cache);
            };
            SceneManager.prototype._afterLoad = function (loader) {
                this._loadScene.destroy();
                this._instance.start(loader.cache);
            };
            SceneManager.prototype._terminate = function () {
                if (this._instance) {
                    this._instance.destroy();
                }
            };
            SceneManager.prototype._updateInstance = function (delta) {
                if (this._instance) {
                    this._instance.update(delta);
                }
                else {
                    this._loadScene.update(delta);
                }
            };
            return SceneManager;
        })();
        scene_1.SceneManager = SceneManager;
    })(scene = ne.scene || (ne.scene = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var utils;
    (function (utils) {
        var EventManager = (function () {
            function EventManager(target) {
                this._target = target;
                this._events = {};
            }
            EventManager.prototype.on = function (type, callback) {
                this._events[type] = this._events[type] || [];
                this._events[type].push(callback);
            };
            EventManager.prototype.off = function (type, callback) {
                this._events[type] = this._events[type] || [];
            };
            EventManager.prototype.fire = function (type, event) {
                this._events[type] = this._events[type] || [];
                this._events[type].forEach(function (callback) {
                    callback(this._target, event);
                });
                if (!event.defaultPrevented) {
                    this._target.defaultEvent(type, event);
                }
            };
            return EventManager;
        })();
        utils.EventManager = EventManager;
    })(utils = ne.utils || (ne.utils = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    var utils;
    (function (utils) {
        var _pixmapCache = {};
        var _fontCache = {};
        var _audioCache = {};
        var _jsonCache = {};
        var cls = AudioContext || window.AudioContext || window.webkitAudioContext;
        var AC = null;
        if (cls) {
            AC = new cls();
        }
        var CacheFinder = (function () {
            function CacheFinder(loader) {
            }
            CacheFinder.prototype.pixmap = function (url) {
                return _pixmapCache[url];
            };
            CacheFinder.prototype.font = function (url) {
                return _fontCache[url];
            };
            CacheFinder.prototype.audio = function (url) {
                return _audioCache[url];
            };
            CacheFinder.prototype.json = function (url) {
                return _jsonCache[url];
            };
            return CacheFinder;
        })();
        utils.CacheFinder = CacheFinder;
        var Loader = (function () {
            function Loader() {
                this._loadStart = false;
                this._toLoad = 0;
                this._callbacks = [];
            }
            Loader.prototype.done = function (callback) {
                this._callbacks.push(callback);
            };
            Loader.prototype.start = function () {
                this._loadStart = true;
                if (this.isDone()) {
                    this.callDone();
                }
                return this;
            };
            Loader.prototype.isDone = function () {
                return this._loadStart && this._toLoad <= 0;
            };
            Loader.prototype.callDone = function () {
                var _this = this;
                this._callbacks.forEach(function (callback) { return callback(_this); });
                return this;
            };
            Loader.prototype.pixmap = function (url) {
                if (_pixmapCache[url]) {
                    return;
                }
                ++this._toLoad;
                this._prepareImage(url);
            };
            Loader.prototype._prepareImage = function (url) {
                var _this = this;
                var img = new Image();
                img.onload = function () {
                    _this._checkLoad();
                    _pixmapCache[url] = ne.graphics.Pixmap.fromImage(img);
                };
                img.onerror = function () {
                    _this._checkLoad();
                    _pixmapCache[url] = null;
                    console.error("Could not load image: '" + url + "'");
                };
                img.src = url;
            };
            Loader.prototype.font = function (url) {
                if (_fontCache[url]) {
                    return;
                }
                ++this._toLoad;
                this._prepareFont(url);
            };
            Loader.prototype._prepareFont = function (url) {
                var _this = this;
                opentype.load(url, function (err, font) {
                    if (err) {
                        console.error("Could not load font: '" + url + "'.\n" + err);
                        _fontCache[url] = null;
                    }
                    else {
                        _fontCache[url] = font;
                    }
                    _this._checkLoad();
                });
            };
            Loader.prototype.audio = function (url) {
                if (_audioCache[url]) {
                    return;
                }
                ++this._toLoad;
                if (AC) {
                    this._prepareWebAudioRequest(url);
                }
                else {
                    this._prepareLegacyAudioRequest(url);
                }
            };
            Loader.prototype.json = function (url) {
                var _this = this;
                var request = new XMLHttpRequest();
                request.open('GET', url, true);
                request.onload = function () {
                    _jsonCache[url] = JSON.parse(request.responseText);
                    _this._checkLoad();
                };
                request.onerror = function () {
                    console.error("Could not load json file: '" + url + "'.\n");
                    _jsonCache[url] = null;
                    _this._checkLoad();
                };
                request.send();
            };
            Loader.prototype._prepareLegacyAudioRequest = function (url) {
                var audioTag = document.createElement('audio');
                audioTag.onload = function () {
                    _audioCache[url] = new ne.audio.LegacyBuffer(audioTag);
                    this._checkLoad();
                };
                audioTag.onerror = function () {
                    console.error("Could not load audio file: '" + url + "'.\n");
                    _audioCache[url] = null;
                    this._checkLoad();
                };
                audioTag.src = url;
            };
            Loader.prototype._prepareWebAudioRequest = function (url) {
                var _this = this;
                var request = new XMLHttpRequest();
                request.open('GET', url, true);
                request.responseType = 'arraybuffer';
                request.onload = function () {
                    AC.decodeAudioData(request.response, function (buffer) {
                        _audioCache[url] = new ne.audio.WebAudioBuffer(AC, buffer);
                        this._checkLoad();
                    });
                };
                request.onerror = function () {
                    console.error("Could not load audio file: '" + url + "'.\n");
                    _audioCache[url] = null;
                    _this._checkLoad();
                };
                request.send();
            };
            Object.defineProperty(Loader.prototype, "cache", {
                get: function () {
                    return new CacheFinder(this);
                },
                enumerable: true,
                configurable: true
            });
            Loader.prototype._checkLoad = function () {
                --this._toLoad;
                if (this.isDone()) {
                    this.callDone();
                }
            };
            Loader.clear = function () {
                this.clearPixmaps();
                this.clearFonts();
                this.clearAudio();
                this.clearJson();
            };
            Loader.clearPixmaps = function () {
                _pixmapCache = {};
            };
            Loader.clearFonts = function () {
                _fontCache = {};
            };
            Loader.clearAudio = function () {
                _audioCache = {};
            };
            Loader.clearJson = function () {
                _jsonCache = {};
            };
            return Loader;
        })();
        utils.Loader = Loader;
    })(utils = ne.utils || (ne.utils = {}));
})(ne || (ne = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbHlmaWxsLnRzIiwibmUvR2FtZS50cyIsIm5lL2F1ZGlvL0J1ZmZlci50cyIsIm5lL2F1ZGlvL0xlZ2FjeUJ1ZmZlci50cyIsIm5lL2F1ZGlvL1N0cmVhbS50cyIsIm5lL2F1ZGlvL0xlZ2FjeVN0cmVhbS50cyIsIm5lL2F1ZGlvL1dlYkF1ZGlvQnVmZmVyLnRzIiwibmUvYXVkaW8vV2ViQXVkaW9TdHJlYW0udHMiLCJuZS9ncmFwaGljcy9SZW5kZXIudHMiLCJuZS9ncmFwaGljcy9DYW52YXMyRFJlbmRlci50cyIsIm5lL21hdGgvY29tYmluYXRvci50cyIsIm5lL21hdGgvdmVjdG9yRmllbGRzLnRzIiwibmUvbWF0aC9WZWN0b3IudHMiLCJuZS9tYXRoL1ZlY3RvcjIudHMiLCJuZS9tYXRoL1ZlY3RvcjMudHMiLCJuZS9tYXRoL1ZlY3RvcjQudHMiLCJuZS9ncmFwaGljcy9Db2xvckJhc2UudHMiLCJuZS9ncmFwaGljcy9Db2xvci50cyIsIm5lL2dyYXBoaWNzL0ZpbHRlci50cyIsIm5lL2dyYXBoaWNzL0ZvbnQudHMiLCJuZS9ncmFwaGljcy9HcmFkaWVudC50cyIsIm5lL2dyYXBoaWNzL0xpbmVhckdyYWRpZW50LnRzIiwibmUvZ3JhcGhpY3MvUGF0dGVybi50cyIsIm5lL2dyYXBoaWNzL1BpeG1hcC50cyIsIm5lL2dyYXBoaWNzL1BvaW50LnRzIiwibmUvZ3JhcGhpY3MvUG9zaXRpb24udHMiLCJuZS9ncmFwaGljcy9SYWRpYWxHcmFkaWVudC50cyIsIm5lL2dyYXBoaWNzL1JlY3QudHMiLCJuZS9ncmFwaGljcy9TaGFkZXIudHMiLCJuZS9ncmFwaGljcy9UZXh0dXJlLnRzIiwibmUvZ3JhcGhpY3MvVG9uZS50cyIsIm5lL2dyYXBoaWNzL1dlYkdMUmVuZGVyLnRzIiwibmUvbWF0aC9NYXRyaXgyLnRzIiwibmUvbWF0aC9NYXRyaXgzLnRzIiwibmUvbWF0aC9NYXRyaXg0LnRzIiwibmUvbWF0aC9wZXJtdXRhdG9yLnRzIiwibmUvc2NlbmUvQ2FtZXJhLnRzIiwibmUvc2NlbmUvU2NlbmUudHMiLCJuZS9zY2VuZS9TY2VuZU1hbmFnZXIudHMiLCJuZS91dGlscy9FdmVudE1hbmFnZXIudHMiLCJuZS91dGlscy9Mb2FkZXIudHMiXSwibmFtZXMiOlsibmUiLCJuZS5Mb2FkU2NlbmUiLCJuZS5Mb2FkU2NlbmUuY29uc3RydWN0b3IiLCJuZS5HYW1lIiwibmUuR2FtZS5jb25zdHJ1Y3RvciIsIm5lLkdhbWUuY3JlYXRlUmVuZGVyIiwibmUuR2FtZS5zdGFydCIsIm5lLkdhbWUudXBkYXRlIiwibmUuR2FtZS52aWV3IiwibmUuYXVkaW8iLCJuZS5hdWRpby5CdWZmZXIiLCJuZS5hdWRpby5CdWZmZXIuY29uc3RydWN0b3IiLCJuZS5hdWRpby5CdWZmZXIuc3RyZWFtIiwibmUuYXVkaW8uQnVmZmVyLmxlbmd0aCIsIm5lLmF1ZGlvLkxlZ2FjeUJ1ZmZlciIsIm5lLmF1ZGlvLkxlZ2FjeUJ1ZmZlci5jb25zdHJ1Y3RvciIsIm5lLmF1ZGlvLkxlZ2FjeUJ1ZmZlci5zdHJlYW0iLCJuZS5hdWRpby5MZWdhY3lCdWZmZXIubGVuZ3RoIiwibmUuYXVkaW8uTGVnYWN5QnVmZmVyLnNyYyIsIm5lLmF1ZGlvLlN0cmVhbSIsIm5lLmF1ZGlvLlN0cmVhbS5jb25zdHJ1Y3RvciIsIm5lLmF1ZGlvLlN0cmVhbS5wbGF5IiwibmUuYXVkaW8uU3RyZWFtLnN0b3AiLCJuZS5hdWRpby5TdHJlYW0ucGF1c2UiLCJuZS5hdWRpby5TdHJlYW0ucG9zaXRpb24iLCJuZS5hdWRpby5TdHJlYW0ubG9vcFN0YXJ0IiwibmUuYXVkaW8uU3RyZWFtLmxvb3BFbmQiLCJuZS5hdWRpby5TdHJlYW0ucGxheWJhY2tSYXRlIiwibmUuYXVkaW8uTGVnYWN5U3RyZWFtIiwibmUuYXVkaW8uTGVnYWN5U3RyZWFtLmNvbnN0cnVjdG9yIiwibmUuYXVkaW8uTGVnYWN5U3RyZWFtLnBsYXkiLCJuZS5hdWRpby5MZWdhY3lTdHJlYW0uc3RvcCIsIm5lLmF1ZGlvLkxlZ2FjeVN0cmVhbS5wYXVzZSIsIm5lLmF1ZGlvLkxlZ2FjeVN0cmVhbS5wb3NpdGlvbiIsIm5lLmF1ZGlvLkxlZ2FjeVN0cmVhbS5wbGF5YmFja1JhdGUiLCJuZS5hdWRpby5XZWJBdWRpb0J1ZmZlciIsIm5lLmF1ZGlvLldlYkF1ZGlvQnVmZmVyLmNvbnN0cnVjdG9yIiwibmUuYXVkaW8uV2ViQXVkaW9CdWZmZXIuc3JjIiwibmUuYXVkaW8uV2ViQXVkaW9CdWZmZXIuc3RyZWFtIiwibmUuYXVkaW8uV2ViQXVkaW9CdWZmZXIubGVuZ3RoIiwibmUuYXVkaW8uV2ViQXVkaW9TdHJlYW0iLCJuZS5hdWRpby5XZWJBdWRpb1N0cmVhbS5jb25zdHJ1Y3RvciIsIm5lLmF1ZGlvLldlYkF1ZGlvU3RyZWFtLnBsYXkiLCJuZS5hdWRpby5XZWJBdWRpb1N0cmVhbS5fY3JlYXRlU291cmNlIiwibmUuYXVkaW8uV2ViQXVkaW9TdHJlYW0uc3RvcCIsIm5lLmF1ZGlvLldlYkF1ZGlvU3RyZWFtLnBhdXNlIiwibmUuYXVkaW8uV2ViQXVkaW9TdHJlYW0uX3NldEN1cnJlbnRQb3NpdGlvbiIsIm5lLmF1ZGlvLldlYkF1ZGlvU3RyZWFtLmNvbnRleHQiLCJuZS5hdWRpby5XZWJBdWRpb1N0cmVhbS5wb3NpdGlvbiIsIm5lLmF1ZGlvLldlYkF1ZGlvU3RyZWFtLmxvb3BTdGFydCIsIm5lLmF1ZGlvLldlYkF1ZGlvU3RyZWFtLmxvb3BFbmQiLCJuZS5hdWRpby5XZWJBdWRpb1N0cmVhbS5wbGF5YmFja1JhdGUiLCJuZS5ncmFwaGljcyIsIm5lLmdyYXBoaWNzLlJlbmRlciIsIm5lLmdyYXBoaWNzLlJlbmRlci5jb25zdHJ1Y3RvciIsIm5lLmdyYXBoaWNzLlJlbmRlci5jYW52YXMiLCJuZS5ncmFwaGljcy5SZW5kZXIud2lkdGgiLCJuZS5ncmFwaGljcy5SZW5kZXIuaGVpZ2h0IiwibmUuZ3JhcGhpY3MuUmVuZGVyLnJlc2l6ZSIsIm5lLmdyYXBoaWNzLlJlbmRlci5yZW5kZXIiLCJuZS5ncmFwaGljcy5DYW52YXMyRFJlbmRlciIsIm5lLmdyYXBoaWNzLkNhbnZhczJEUmVuZGVyLmNvbnN0cnVjdG9yIiwibmUubWF0aCIsIm5lLm1hdGguY29tYmluYXRvciIsIm5lLm1hdGgubWVtb2l6ZWQiLCJuZS5tYXRoLnJhbmdlIiwibmUubWF0aC5tYWtlUHJvcGVydHlBY2Nlc3NvciIsIm5lLm1hdGgubWFrZVByb3BlcnRpZXNPZlNpemUiLCJuZS5tYXRoLm1ha2VQcm9wZXJ0aWVzIiwibmUubWF0aC52ZWN0b3JGaWVsZHMiLCJuZS5tYXRoLlZlY3RvciIsIm5lLm1hdGguVmVjdG9yLmNvbnN0cnVjdG9yIiwibmUubWF0aC5WZWN0b3IubGVuZ3RoIiwibmUubWF0aC5WZWN0b3IuZGF0YSIsIm5lLm1hdGguVmVjdG9yWzBdIiwibmUubWF0aC5WZWN0b3JbMV0iLCJuZS5tYXRoLlZlY3RvclsyXSIsIm5lLm1hdGguVmVjdG9yWzNdIiwibmUubWF0aC5WZWN0b3IueCIsIm5lLm1hdGguVmVjdG9yLnIiLCJuZS5tYXRoLlZlY3Rvci55IiwibmUubWF0aC5WZWN0b3IuZyIsIm5lLm1hdGguVmVjdG9yLnoiLCJuZS5tYXRoLlZlY3Rvci5iIiwibmUubWF0aC5WZWN0b3IudyIsIm5lLm1hdGguVmVjdG9yLmEiLCJuZS5tYXRoLlZlY3Rvci5zIiwibmUubWF0aC5WZWN0b3IudSIsIm5lLm1hdGguVmVjdG9yLnQiLCJuZS5tYXRoLlZlY3Rvci52IiwibmUubWF0aC5WZWN0b3IucCIsIm5lLm1hdGguVmVjdG9yLnEiLCJuZS5tYXRoLlZlY3RvcjIiLCJuZS5tYXRoLlZlY3RvcjIuY29uc3RydWN0b3IiLCJuZS5tYXRoLlZlY3RvcjIuY2xvbmUiLCJuZS5tYXRoLlZlY3RvcjIuY29weUZyb20iLCJuZS5tYXRoLlZlY3RvcjIuY29weVRvIiwibmUubWF0aC5WZWN0b3IyLmFkZCIsIm5lLm1hdGguVmVjdG9yMi5zdWIiLCJuZS5tYXRoLlZlY3RvcjIubXVsIiwibmUubWF0aC5WZWN0b3IyLmRpdiIsIm5lLm1hdGguVmVjdG9yMi5tb2QiLCJuZS5tYXRoLlZlY3RvcjIuc2V0IiwibmUubWF0aC5WZWN0b3IyLm5vcm1hbGl6ZSIsIm5lLm1hdGguVmVjdG9yMyIsIm5lLm1hdGguVmVjdG9yMy5jb25zdHJ1Y3RvciIsIm5lLm1hdGguVmVjdG9yMy5sZW5ndGgiLCJuZS5tYXRoLlZlY3RvcjMuY2xvbmUiLCJuZS5tYXRoLlZlY3RvcjNbMl0iLCJuZS5tYXRoLlZlY3RvcjMuc2V0IiwibmUubWF0aC5WZWN0b3IzLmNyb3NzIiwibmUubWF0aC5WZWN0b3I0IiwibmUubWF0aC5WZWN0b3I0LmNvbnN0cnVjdG9yIiwibmUubWF0aC5WZWN0b3I0Lmxlbmd0aCIsIm5lLm1hdGguVmVjdG9yNC5jbG9uZSIsIm5lLm1hdGguVmVjdG9yNFszXSIsIm5lLm1hdGguVmVjdG9yNC5zZXQiLCJuZS5ncmFwaGljcy5Db2xvckJhc2UiLCJuZS5ncmFwaGljcy5Db2xvckJhc2UuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5Db2xvckJhc2VbMF0iLCJuZS5ncmFwaGljcy5Db2xvckJhc2VbMV0iLCJuZS5ncmFwaGljcy5Db2xvckJhc2VbMl0iLCJuZS5ncmFwaGljcy5Db2xvckJhc2VbM10iLCJuZS5ncmFwaGljcy5Db2xvckJhc2UucmVkIiwibmUuZ3JhcGhpY3MuQ29sb3JCYXNlLmdyZWVuIiwibmUuZ3JhcGhpY3MuQ29sb3JCYXNlLmJsdWUiLCJuZS5ncmFwaGljcy5Db2xvckJhc2UuYWxwaGEiLCJuZS5ncmFwaGljcy5Db2xvckJhc2UuaHVlIiwibmUuZ3JhcGhpY3MuQ29sb3JCYXNlLnNhdHVyYXRpb24iLCJuZS5ncmFwaGljcy5Db2xvckJhc2UubHVtaW5hbmNlIiwibmUuZ3JhcGhpY3MuQ29sb3JCYXNlLnRvSHNsYSIsIm5lLmdyYXBoaWNzLkNvbG9yQmFzZS50b0hzbCIsIm5lLmdyYXBoaWNzLkNvbG9yIiwibmUuZ3JhcGhpY3MuQ29sb3IuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5Db2xvci5faHVlMnJnYiIsIm5lLmdyYXBoaWNzLkNvbG9yLl9oc2xUb1JnYiIsIm5lLmdyYXBoaWNzLkNvbG9yLmZyb21SZ2JhIiwibmUuZ3JhcGhpY3MuQ29sb3IuZnJvbVJnYiIsIm5lLmdyYXBoaWNzLkNvbG9yLmZyb21BcmdiIiwibmUuZ3JhcGhpY3MuQ29sb3IuZnJvbUhzbGEiLCJuZS5ncmFwaGljcy5Db2xvci5mcm9tSHNsIiwibmUuZ3JhcGhpY3MuQ29sb3IuY2xvbmUiLCJuZS5ncmFwaGljcy5Db2xvci5jb21wbGVtZW50IiwibmUuZ3JhcGhpY3MuQ29sb3IudG9Dc3MiLCJuZS5ncmFwaGljcy5Db2xvci50b1N0eWxlIiwibmUuZ3JhcGhpY3MuQ29sb3IudG9BcmdiIiwibmUuZ3JhcGhpY3MuQ29sb3IudG9SZ2JhIiwibmUuZ3JhcGhpY3MuQ29sb3IudG9SZ2IiLCJuZS5ncmFwaGljcy5Db2xvci5ncmF5c2NhbGUiLCJuZS5ncmFwaGljcy5Db2xvci5hdmVyYWdlIiwibmUuZ3JhcGhpY3MuQ29sb3IubGlnaHRuZXNzQXZlcmFnZSIsIm5lLmdyYXBoaWNzLkNvbG9yLmludmVydCIsIm5lLmdyYXBoaWNzLkNvbG9yLldISVRFIiwibmUuZ3JhcGhpY3MuQ29sb3IuQkxBQ0siLCJuZS5ncmFwaGljcy5Db2xvci5SRUQiLCJuZS5ncmFwaGljcy5Db2xvci5HUkVFTiIsIm5lLmdyYXBoaWNzLkNvbG9yLkJMVUUiLCJuZS5ncmFwaGljcy5Db2xvci5ZRUxMT1ciLCJuZS5ncmFwaGljcy5Db2xvci5NQUdFTlRBIiwibmUuZ3JhcGhpY3MuQ29sb3IuQ1lBTiIsIm5lLmdyYXBoaWNzLkNvbG9yLkdSQVkiLCJuZS5ncmFwaGljcy5Db2xvci5EQVJLX0dSQVkiLCJuZS5ncmFwaGljcy5Db2xvci5MSUdIVF9HUkFZIiwibmUuZ3JhcGhpY3MuQ29sb3IuT1JBTkdFIiwibmUuZ3JhcGhpY3MuQ29sb3IuQlJPV04iLCJuZS5ncmFwaGljcy5Db2xvci5MSU1FIiwibmUuZ3JhcGhpY3MuQ29sb3IuTElHSFRfQkxVRSIsIm5lLmdyYXBoaWNzLkNvbG9yLlBJTksiLCJuZS5ncmFwaGljcy5Db2xvci5UUkFOU1BBUkVOVCIsIm5lLmdyYXBoaWNzLkNvbG9yLlJBTkRPTSIsIm5lLmdyYXBoaWNzLkZpbHRlciIsIm5lLmdyYXBoaWNzLkZpbHRlci5jb25zdHJ1Y3RvciIsIm5lLmdyYXBoaWNzLkZpbHRlci52ZXJ0ZXgiLCJuZS5ncmFwaGljcy5GaWx0ZXIuZnJhZ21lbnQiLCJuZS5ncmFwaGljcy5GaWx0ZXIuZGVzdHJveSIsIm5lLmdyYXBoaWNzLkZpbHRlci5tYWtlQXR0cmlidXRlcyIsIm5lLmdyYXBoaWNzLkZpbHRlci5tYWtlVW5pZm9ybXMiLCJuZS5ncmFwaGljcy5GaWx0ZXIubWFrZVZhcnlpbmciLCJuZS5ncmFwaGljcy5GaWx0ZXIudXNlIiwibmUuZ3JhcGhpY3MuRmlsdGVyLl9jb21waWxlIiwibmUuZ3JhcGhpY3MuRmlsdGVyLl9tYWtlUHJvZ3JhbSIsIm5lLmdyYXBoaWNzLkZpbHRlci5fZ2V0TG9jYXRpb25zIiwibmUuZ3JhcGhpY3MuRmlsdGVyLl9nZXRVbmlmb3JtTG9jYXRpb25zIiwibmUuZ3JhcGhpY3MuRmlsdGVyLl9nZXRBdHRyaWJ1dGVMb2NhdGlvbnMiLCJuZS5ncmFwaGljcy5GaWx0ZXIuX2NoZWNrUHJvZ3JhbSIsIm5lLmdyYXBoaWNzLkZpbHRlci5fZm9ybWF0VW5pZm9ybXMiLCJuZS5ncmFwaGljcy5GaWx0ZXIudW5pZm9ybXMiLCJuZS5ncmFwaGljcy5GaWx0ZXIuYXR0cmlidXRlcyIsIm5lLmdyYXBoaWNzLkZpbHRlci52YXJ5aW5nIiwibmUuZ3JhcGhpY3MuRmlsdGVyLm51bWJlciIsIm5lLmdyYXBoaWNzLkZpbHRlci5mbG9hdCIsIm5lLmdyYXBoaWNzLkZpbHRlci5tYXQyIiwibmUuZ3JhcGhpY3MuRmlsdGVyLm1hdDMiLCJuZS5ncmFwaGljcy5GaWx0ZXIubWF0NCIsIm5lLmdyYXBoaWNzLkZpbHRlci52ZWMyIiwibmUuZ3JhcGhpY3MuRmlsdGVyLnZlYzMiLCJuZS5ncmFwaGljcy5GaWx0ZXIudmVjNCIsIm5lLmdyYXBoaWNzLkZpbHRlci5jb2xvciIsIm5lLmdyYXBoaWNzLkZpbHRlci5yZWN0IiwibmUuZ3JhcGhpY3MuRmlsdGVyLnBvaW50IiwibmUuZ3JhcGhpY3MuRmlsdGVyLnNhbXBsZXIyZCIsIm5lLmdyYXBoaWNzLkZpbHRlci50ZXh0dXJlIiwibmUuZ3JhcGhpY3MuRm9udCIsIm5lLmdyYXBoaWNzLkZvbnQuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5Gb250LmZhbWlseSIsIm5lLmdyYXBoaWNzLkdyYWRpZW50IiwibmUuZ3JhcGhpY3MuR3JhZGllbnQuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5HcmFkaWVudC5fc3RvcHMiLCJuZS5ncmFwaGljcy5HcmFkaWVudC5hZGRDb2xvclN0b3AiLCJuZS5ncmFwaGljcy5HcmFkaWVudC50b1N0eWxlIiwibmUuZ3JhcGhpY3MuR3JhZGllbnQuY3JlYXRlR3JhZGllbnQiLCJuZS5ncmFwaGljcy5MaW5lYXJHcmFkaWVudCIsIm5lLmdyYXBoaWNzLkxpbmVhckdyYWRpZW50LmNvbnN0cnVjdG9yIiwibmUuZ3JhcGhpY3MuTGluZWFyR3JhZGllbnQuY3JlYXRlR3JhZGllbnQiLCJuZS5ncmFwaGljcy5QYXR0ZXJuUmVwZWF0IiwibmUuZ3JhcGhpY3MuUGF0dGVybiIsIm5lLmdyYXBoaWNzLlBhdHRlcm4uY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5QYXR0ZXJuLnRvU3R5bGUiLCJuZS5ncmFwaGljcy5QaXhtYXAiLCJuZS5ncmFwaGljcy5QaXhtYXAuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5QaXhtYXAuZnJvbUltYWdlIiwibmUuZ3JhcGhpY3MuUGl4bWFwLmNhbnZhcyIsIm5lLmdyYXBoaWNzLlBpeG1hcC5jb250ZXh0IiwibmUuZ3JhcGhpY3MuUGl4bWFwLndpZHRoIiwibmUuZ3JhcGhpY3MuUGl4bWFwLmhlaWdodCIsIm5lLmdyYXBoaWNzLlBvaW50IiwibmUuZ3JhcGhpY3MuUG9pbnQuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5Qb3NpdGlvbiIsIm5lLmdyYXBoaWNzLlBvc2l0aW9uLnBlcmNlbnQiLCJuZS5ncmFwaGljcy5Qb3NpdGlvbi5hYnNvbHV0ZSIsIm5lLmdyYXBoaWNzLlJhZGlhbEdyYWRpZW50IiwibmUuZ3JhcGhpY3MuUmFkaWFsR3JhZGllbnQuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5SYWRpYWxHcmFkaWVudC5jcmVhdGVHcmFkaWVudCIsIm5lLmdyYXBoaWNzLlJhZGlhbEdyYWRpZW50LmdldEFuZ2xlIiwibmUuZ3JhcGhpY3MuUmVjdCIsIm5lLmdyYXBoaWNzLlJlY3QuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5SZWN0LnoiLCJuZS5ncmFwaGljcy5SZWN0LnciLCJuZS5ncmFwaGljcy5SZWN0LmgiLCJuZS5ncmFwaGljcy5SZWN0LndpZHRoIiwibmUuZ3JhcGhpY3MuUmVjdC5oZWlnaHQiLCJuZS5ncmFwaGljcy5SZWN0LmNsb25lIiwibmUuZ3JhcGhpY3MuU2hhZGVyIiwibmUuZ3JhcGhpY3MuU2hhZGVyLmNvbnN0cnVjdG9yIiwibmUuZ3JhcGhpY3MuU2hhZGVyLmZyYWdtZW50IiwibmUuZ3JhcGhpY3MuU2hhZGVyLmdlbmVyYXRlZFNvdXJjZSIsIm5lLmdyYXBoaWNzLlNoYWRlci5kZXN0cm95IiwibmUuZ3JhcGhpY3MuU2hhZGVyLmNvbXBpbGUiLCJuZS5ncmFwaGljcy5TaGFkZXIuX3ZhbGlkYXRlU2hhZGVyIiwibmUuZ3JhcGhpY3MuU2hhZGVyLl9tYWtlSGVhZCIsIm5lLmdyYXBoaWNzLlNoYWRlci5fbWFrZVZhcmlhYmxlcyIsIm5lLmdyYXBoaWNzLlNoYWRlci5fbWFwQXR0cmlidXRlcyIsIm5lLmdyYXBoaWNzLlNoYWRlci5fbWFwVW5pZm9ybXMiLCJuZS5ncmFwaGljcy5TaGFkZXIuX21hcFZhcnlpbmciLCJuZS5ncmFwaGljcy5TaGFkZXIuX21hcFZlcnRleFZhcmlhYmxlcyIsIm5lLmdyYXBoaWNzLlNoYWRlci5fbWFwRnJhZ21lbnRWYXJpYWJsZXMiLCJuZS5ncmFwaGljcy5UZXh0dXJlIiwibmUuZ3JhcGhpY3MuVGV4dHVyZS5jb25zdHJ1Y3RvciIsIm5lLmdyYXBoaWNzLlRleHR1cmUuZGVzdHJveSIsIm5lLmdyYXBoaWNzLlRleHR1cmUuX2Rlc3Ryb3lHbFRleHR1cmUiLCJuZS5ncmFwaGljcy5UZXh0dXJlLl9kZXN0cm95R2xCdWZmZXIiLCJuZS5ncmFwaGljcy5UZXh0dXJlLmdlbmVyYXRlIiwibmUuZ3JhcGhpY3MuVGV4dHVyZS51cGRhdGUiLCJuZS5ncmFwaGljcy5UZXh0dXJlLmNoZWNrIiwibmUuZ3JhcGhpY3MuVGV4dHVyZS5iaW5kIiwibmUuZ3JhcGhpY3MuVGV4dHVyZS5iaW5kQWxsIiwibmUuZ3JhcGhpY3MuVGV4dHVyZS5fZ2VuZXJhdGVHbFRleHR1cmUiLCJuZS5ncmFwaGljcy5UZXh0dXJlLl9nZW5lcmF0ZUdsQnVmZmVyIiwibmUuZ3JhcGhpY3MuVGV4dHVyZS5fYmluZEdsQnVmZmVyIiwibmUuZ3JhcGhpY3MuVGV4dHVyZS5fYmluZEdsVGV4dHVyZSIsIm5lLmdyYXBoaWNzLlRleHR1cmUuY2FsY3VsYXRlUmVjdCIsIm5lLmdyYXBoaWNzLlRleHR1cmUud2lkdGgiLCJuZS5ncmFwaGljcy5UZXh0dXJlLmhlaWdodCIsIm5lLmdyYXBoaWNzLlRvbmUiLCJuZS5ncmFwaGljcy5Ub25lLmNvbnN0cnVjdG9yIiwibmUuZ3JhcGhpY3MuVG9uZVswXSIsIm5lLmdyYXBoaWNzLlRvbmVbMV0iLCJuZS5ncmFwaGljcy5Ub25lWzJdIiwibmUuZ3JhcGhpY3MuVG9uZVszXSIsIm5lLmdyYXBoaWNzLlRvbmUucmVkIiwibmUuZ3JhcGhpY3MuVG9uZS5ncmVlbiIsIm5lLmdyYXBoaWNzLlRvbmUuYmx1ZSIsIm5lLmdyYXBoaWNzLlRvbmUuZ3JheSIsIm5lLmdyYXBoaWNzLlRvbmUuZ3JleSIsIm5lLmdyYXBoaWNzLlRvbmUuUkFORE9NIiwibmUuZ3JhcGhpY3MuV2ViR0xSZW5kZXIiLCJuZS5ncmFwaGljcy5XZWJHTFJlbmRlci5jb25zdHJ1Y3RvciIsIm5lLmdyYXBoaWNzLldlYkdMUmVuZGVyLmdsIiwibmUuZ3JhcGhpY3MuV2ViR0xSZW5kZXIucmVuZGVyIiwibmUubWF0aC5NYXRyaXgyIiwibmUubWF0aC5NYXRyaXgyLmNvbnN0cnVjdG9yIiwibmUubWF0aC5NYXRyaXgyLndpZHRoIiwibmUubWF0aC5NYXRyaXgyLmhlaWdodCIsIm5lLm1hdGguTWF0cml4Mi5kYXRhIiwibmUubWF0aC5NYXRyaXgyWycwJ10iLCJuZS5tYXRoLk1hdHJpeDJbJzEnXSIsIm5lLm1hdGguTWF0cml4MlsnMiddIiwibmUubWF0aC5NYXRyaXgyWyczJ10iLCJuZS5tYXRoLk1hdHJpeDIuYXQiLCJuZS5tYXRoLk1hdHJpeDIuc2V0IiwibmUubWF0aC5NYXRyaXgyLmNvcHlGcm9tIiwibmUubWF0aC5NYXRyaXgyLmNvcHlUbyIsIm5lLm1hdGguTWF0cml4Mi5JREVOVElUWSIsIm5lLm1hdGguTWF0cml4MyIsIm5lLm1hdGguTWF0cml4My5jb25zdHJ1Y3RvciIsIm5lLm1hdGguTWF0cml4M1snNCddIiwibmUubWF0aC5NYXRyaXgzWyc1J10iLCJuZS5tYXRoLk1hdHJpeDNbJzYnXSIsIm5lLm1hdGguTWF0cml4M1snNyddIiwibmUubWF0aC5NYXRyaXgzLm11bCIsIm5lLm1hdGguTWF0cml4My50cmFuc2xhdGUiLCJuZS5tYXRoLk1hdHJpeDMucm90YXRlIiwibmUubWF0aC5NYXRyaXgzLnNjYWxlIiwibmUubWF0aC5NYXRyaXgzLklERU5USVRZIiwibmUubWF0aC5NYXRyaXgzLnRyYW5zbGF0aW9uIiwibmUubWF0aC5NYXRyaXgzLnJvdGF0aW9uIiwibmUubWF0aC5NYXRyaXgzLnByb2plY3Rpb24iLCJuZS5tYXRoLk1hdHJpeDQiLCJuZS5tYXRoLk1hdHJpeDQuY29uc3RydWN0b3IiLCJuZS5tYXRoLk1hdHJpeDRbJzgnXSIsIm5lLm1hdGguTWF0cml4NFsnOSddIiwibmUubWF0aC5NYXRyaXg0WycxMCddIiwibmUubWF0aC5NYXRyaXg0WycxMSddIiwibmUubWF0aC5NYXRyaXg0WycxMiddIiwibmUubWF0aC5NYXRyaXg0WycxMyddIiwibmUubWF0aC5NYXRyaXg0WycxNCddIiwibmUubWF0aC5NYXRyaXg0WycxNSddIiwibmUubWF0aC5NYXRyaXg0LklERU5USVRZIiwibmUubWF0aC5NYXRyaXg0LnRyYW5zbGF0aW9uIiwibmUubWF0aC5NYXRyaXg0LnhSb3RhdGlvbiIsIm5lLm1hdGguTWF0cml4NC55Um90YXRpb24iLCJuZS5tYXRoLk1hdHJpeDQuelJvdGF0aW9uIiwibmUubWF0aC5NYXRyaXg0LnJvdGF0aW9uIiwibmUubWF0aC5NYXRyaXg0LnNjYWxlIiwibmUubWF0aC5NYXRyaXg0LmNhbWVyYSIsIm5lLm1hdGguTWF0cml4NC5sb29rQXQiLCJuZS5tYXRoLk1hdHJpeDQudHJhbnNsYXRlIiwibmUubWF0aC5NYXRyaXg0LnJvdGF0ZSIsIm5lLm1hdGguTWF0cml4NC54Um90YXRlIiwibmUubWF0aC5NYXRyaXg0LnlSb3RhdGUiLCJuZS5tYXRoLk1hdHJpeDQuelJvdGF0ZSIsIm5lLm1hdGguTWF0cml4NC5tdWwiLCJuZS5tYXRoLk1hdHJpeDQuaW52ZXJzZSIsIm5lLm1hdGgucGVybXV0YXRvciIsIm5lLm1hdGgucGVybXV0YXRvci5wZXJtdXRlIiwibmUuc2NlbmUiLCJuZS5zY2VuZS5DYW1lcmEiLCJuZS5zY2VuZS5DYW1lcmEuY29uc3RydWN0b3IiLCJuZS5zY2VuZS5DYW1lcmEub3JpZ2luIiwibmUuc2NlbmUuQ2FtZXJhLmRlc3RpbmF0aW9uIiwibmUuc2NlbmUuQ2FtZXJhLnVwIiwibmUuc2NlbmUuQ2FtZXJhLm1hdHJpeCIsIm5lLnNjZW5lLkNhbWVyYS52aWV3IiwibmUuc2NlbmUuU2NlbmUiLCJuZS5zY2VuZS5TY2VuZS5jb25zdHJ1Y3RvciIsIm5lLnNjZW5lLlNjZW5lLmRlZmF1bHRFdmVudCIsIm5lLnNjZW5lLlNjZW5lLm1hbmFnZXIiLCJuZS5zY2VuZS5TY2VuZS5ldmVudHMiLCJuZS5zY2VuZS5TY2VuZS5sb2FkIiwibmUuc2NlbmUuU2NlbmUuc3RhcnQiLCJuZS5zY2VuZS5TY2VuZS5kZXN0cm95IiwibmUuc2NlbmUuU2NlbmUudXBkYXRlIiwibmUuc2NlbmUuU2NlbmUucmVuZGVyIiwibmUuc2NlbmUuU2NlbmVNYW5hZ2VyIiwibmUuc2NlbmUuU2NlbmVNYW5hZ2VyLmNvbnN0cnVjdG9yIiwibmUuc2NlbmUuU2NlbmVNYW5hZ2VyLnNldHVwTG9hZFNjZW5lIiwibmUuc2NlbmUuU2NlbmVNYW5hZ2VyLnJlYWR5IiwibmUuc2NlbmUuU2NlbmVNYW5hZ2VyLnNjZW5lIiwibmUuc2NlbmUuU2NlbmVNYW5hZ2VyLmV2ZW50cyIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlci5pbnN0YW5jZSIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlci5nb3RvIiwibmUuc2NlbmUuU2NlbmVNYW5hZ2VyLmNhbGwiLCJuZS5zY2VuZS5TY2VuZU1hbmFnZXIuYmFjayIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlci5jbGVhciIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlci51cGRhdGUiLCJuZS5zY2VuZS5TY2VuZU1hbmFnZXIuX3N3YXBTY2VuZSIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlci5fYWZ0ZXJMb2FkIiwibmUuc2NlbmUuU2NlbmVNYW5hZ2VyLl90ZXJtaW5hdGUiLCJuZS5zY2VuZS5TY2VuZU1hbmFnZXIuX3VwZGF0ZUluc3RhbmNlIiwibmUudXRpbHMiLCJuZS51dGlscy5FdmVudE1hbmFnZXIiLCJuZS51dGlscy5FdmVudE1hbmFnZXIuY29uc3RydWN0b3IiLCJuZS51dGlscy5FdmVudE1hbmFnZXIub24iLCJuZS51dGlscy5FdmVudE1hbmFnZXIub2ZmIiwibmUudXRpbHMuRXZlbnRNYW5hZ2VyLmZpcmUiLCJuZS51dGlscy5DYWNoZUZpbmRlciIsIm5lLnV0aWxzLkNhY2hlRmluZGVyLmNvbnN0cnVjdG9yIiwibmUudXRpbHMuQ2FjaGVGaW5kZXIucGl4bWFwIiwibmUudXRpbHMuQ2FjaGVGaW5kZXIuZm9udCIsIm5lLnV0aWxzLkNhY2hlRmluZGVyLmF1ZGlvIiwibmUudXRpbHMuQ2FjaGVGaW5kZXIuanNvbiIsIm5lLnV0aWxzLkxvYWRlciIsIm5lLnV0aWxzLkxvYWRlci5jb25zdHJ1Y3RvciIsIm5lLnV0aWxzLkxvYWRlci5kb25lIiwibmUudXRpbHMuTG9hZGVyLnN0YXJ0IiwibmUudXRpbHMuTG9hZGVyLmlzRG9uZSIsIm5lLnV0aWxzLkxvYWRlci5jYWxsRG9uZSIsIm5lLnV0aWxzLkxvYWRlci5waXhtYXAiLCJuZS51dGlscy5Mb2FkZXIuX3ByZXBhcmVJbWFnZSIsIm5lLnV0aWxzLkxvYWRlci5mb250IiwibmUudXRpbHMuTG9hZGVyLl9wcmVwYXJlRm9udCIsIm5lLnV0aWxzLkxvYWRlci5hdWRpbyIsIm5lLnV0aWxzLkxvYWRlci5qc29uIiwibmUudXRpbHMuTG9hZGVyLl9wcmVwYXJlTGVnYWN5QXVkaW9SZXF1ZXN0IiwibmUudXRpbHMuTG9hZGVyLl9wcmVwYXJlV2ViQXVkaW9SZXF1ZXN0IiwibmUudXRpbHMuTG9hZGVyLmNhY2hlIiwibmUudXRpbHMuTG9hZGVyLl9jaGVja0xvYWQiLCJuZS51dGlscy5Mb2FkZXIuY2xlYXIiLCJuZS51dGlscy5Mb2FkZXIuY2xlYXJQaXhtYXBzIiwibmUudXRpbHMuTG9hZGVyLmNsZWFyRm9udHMiLCJuZS51dGlscy5Mb2FkZXIuY2xlYXJBdWRpbyIsIm5lLnV0aWxzLkxvYWRlci5jbGVhckpzb24iXSwibWFwcGluZ3MiOiJBQUNBLElBQUksZ0JBQWdCLEdBQW1DLENBQUM7SUFDdEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUI7UUFDN0IsTUFBTyxDQUFDLDJCQUEyQjtRQUNuQyxNQUFPLENBQUMsd0JBQXdCO1FBQ2hDLE1BQU8sQ0FBQyxzQkFBc0I7UUFDcEMsTUFBTSxDQUFDLHVCQUF1QjtRQUM5QixVQUFTLFFBQVE7WUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsRUFBRSxDQUFDOzs7Ozs7QUNWTCxJQUFPLEVBQUUsQ0EwRFI7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QU1BLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO29CQUNoQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2ZBLENBQUNBO2dCQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUVETCxxQkFBR0EsR0FBSEEsVUFBSUEsR0FBR0E7Z0JBQ0xNLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO2dCQUN6QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2xCQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDakJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLE1BQU1BLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO29CQUNoQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2ZBLENBQUNBO2dCQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUVETixxQkFBR0EsR0FBSEEsVUFBSUEsR0FBR0E7Z0JBQ0xPLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO2dCQUN6QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2xCQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDakJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLE1BQU1BLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO29CQUNoQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2ZBLENBQUNBO2dCQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUVEUCxxQkFBR0EsR0FBSEEsVUFBSUEsR0FBR0E7Z0JBQ0xRLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO2dCQUN6QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2xCQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDakJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLE1BQU1BLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO29CQUNoQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2ZBLENBQUNBO2dCQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUVEUixxQkFBR0EsR0FBSEEsVUFBSUEsR0FBR0E7Z0JBQ0xTLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO2dCQUN6QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2xCQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDakJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLE1BQU1BLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO29CQUNoQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2ZBLENBQUNBO2dCQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFD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QUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDbEVBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2dCQUNyREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRTlCQSxFQUFFQSxDQUFBQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFBQSxDQUFDQTtvQkFDWEEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsYUFBYUE7Z0JBQzVCQSxDQUFDQTtnQkFBQUEsSUFBSUEsQ0FBQUEsQ0FBQ0E7b0JBQ0ZBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO29CQUNsQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3BEQSxNQUFNQSxDQUFBQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFBQSxDQUFDQTt3QkFDUkEsS0FBS0EsQ0FBQ0E7NEJBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdB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QUVaQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDWEEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsYUFBYUE7Z0JBQzlCQSxDQUFDQTtnQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ05BLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUM5Q0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xCQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDakNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO29CQUMzQkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25DQSxDQUFDQTtnQkFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDckZBLENBQUNBO1lBRU1ILGNBQVFBLEdBQWZBLFVBQWdCQSxJQUFXQTtnQkFDekJJLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLElBQUlBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBO2dCQUM3QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsSUFBSUEsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQzdCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxJQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDN0JBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLElBQUtBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBO2dCQUM3QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDL0JBLENBQUNBO1lBRU1KLGFBQU9BLEdBQWRBLFVBQWVBLEdBQVVBO2dCQUN2QkssSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQzVCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDNUJBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLElBQUtBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBO2dCQUM1QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUJBLENBQUNBO1lBRU1MLGNBQVFBLEdBQWZBLFVBQWdCQSxJQUFJQTtnQkFDakJNLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLElBQUlBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBO2dCQUM3QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsSUFBSUEsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQzdCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxJQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDN0JBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLElBQUtBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBO2dCQUM3QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDL0JBLENBQUNBO1lBRU1OLGNBQVFBLEdBQWZBLFVBQWdCQSxJQUFjQTtnQkFDNUJPLElBQUtBLENBQUNBLEdBQWFBLElBQUlBLEtBQWZBLENBQUNBLEdBQVVBLElBQUlBLEtBQVpBLENBQUNBLEdBQU9BLElBQUlBLEtBQVRBLENBQUNBLEdBQUlBLElBQUlBLEdBQUFBLENBQUNBO2dCQUN4QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDcENBLENBQUNBO1lBRU1QLGFBQU9BLEdBQWRBLFVBQWVBLEdBQWFBO2dCQUMxQlEsSUFBS0EsQ0FBQ0EsR0FBVUEsR0FBR0EsS0FBWEEsQ0FBQ0EsR0FBT0EsR0FBR0EsS0FBUkEsQ0FBQ0EsR0FBSUEsR0FBR0EsR0FBQUEsQ0FBQ0E7Z0JBQ3BCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN0Q0EsQ0FBQ0E7WUFFRFIscUJBQUtBLEdBQUxBO2dCQUNHUyxNQUFNQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUNoRUEsQ0FBQ0E7WUFFRFQsMEJBQVVBLEdBQVZBO2dCQUNHVSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDaENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1lBQ2RBLENBQUNBO1lBRURWLHFCQUFLQSxHQUFMQTtnQkFDRVcsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3pCQSxNQUFNQSxDQUFDQSxVQUFRQSxJQUFJQSxDQUFDQSxHQUFHQSxVQUFLQSxJQUFJQSxDQUFDQSxLQUFLQSxVQUFLQSxJQUFJQSxDQUFDQSxJQUFJQSxVQUFLQSxDQUFDQSxNQUFHQSxDQUFDQTtZQUNoRUEsQ0FBQ0E7WUFFRFgsdUJBQU9BLEdBQVBBLFVBQVFBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLE9BQWdDQTtnQkFDMURZLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1lBQ3RCQSxDQUFDQTtZQUVEWixzQkFBTUEsR0FBTkE7Z0JBQ0VhLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1lBQ3pFQSxDQUFDQTtZQUVEYixzQkFBTUEsR0FBTkE7Z0JBQ0VjLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3pFQSxDQUFDQTtZQUVEZCxxQkFBS0EsR0FBTEE7Z0JBQ0VlLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO1lBQ3REQSxDQUFDQTtZQUdEZix5QkFBU0EsR0FBVEE7Z0JBQ0VnQixJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDakVBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2pDQSxDQUFDQTtZQUVEaEIsdUJBQU9BLEdBQVBBO2dCQUNFaUIsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNqQ0EsQ0FBQ0E7WUFFRGpCLGdDQUFnQkEsR0FBaEJBO2dCQUNFa0IsSUFBSUEsSUFBSUEsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzdDQSxJQUFJQSxHQUFHQSxHQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxPQUFSQSxJQUFJQSxFQUFRQSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxPQUFSQSxJQUFJQSxFQUFRQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDdkRBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2pDQSxDQUFDQTtZQUVEbEIsc0JBQU1BLEdBQU5BLFVBQU9BLEtBQVdBO2dCQUFYbUIscUJBQVdBLEdBQVhBLGFBQVdBO2dCQUNoQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsS0FBS0EsR0FBR0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBQzlDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN4RUEsQ0FBQ0E7WUFFRG5CLHNCQUFXQSxjQUFLQTtxQkFBaEJBO29CQUNFb0IsTUFBTUEsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xDQSxDQUFDQTs7O2VBQUFwQjtZQUVEQSxzQkFBV0EsY0FBS0E7cUJBQWhCQTtvQkFDRXFCLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLEVBQUVBLENBQUNBO2dCQUNyQkEsQ0FBQ0E7OztlQUFBckI7WUFFREEsc0JBQVdBLFlBQUdBO3FCQUFkQTtvQkFDRXNCLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2dCQUM5QkEsQ0FBQ0E7OztlQUFBdEI7WUFFREEsc0JBQVdBLGNBQUtBO3FCQUFoQkE7b0JBQ0V1QixNQUFNQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDOUJBLENBQUNBOzs7ZUFBQXZCO1lBRURBLHNCQUFXQSxhQUFJQTtxQkFBZkE7b0JBQ0V3QixNQUFNQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDOUJBLENBQUNBOzs7ZUFBQXhCO1lBRURBLHNCQUFXQSxlQUFNQTtxQkFBakJBO29CQUNFeUIsTUFBTUEsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hDQSxDQUFDQTs7O2VBQUF6QjtZQUVEQSxzQkFBV0EsZ0JBQU9BO3FCQUFsQkE7b0JBQ0UwQixNQUFNQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDaENBLENBQUNBOzs7ZUFBQTFCO1lBRURBLHNCQUFXQSxhQUFJQTtxQkFBZkE7b0JBQ0UyQixNQUFNQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDaENBLENBQUNBOzs7ZUFBQTNCO1lBRURBLHNCQUFXQSxhQUFJQTtxQkFBZkE7b0JBQ0U0QixNQUFNQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDbENBLENBQUNBOzs7ZUFBQTVCO1lBRURBLHNCQUFXQSxrQkFBU0E7cUJBQXBCQTtvQkFDRTZCLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNsQ0EsQ0FBQ0E7OztlQUFBN0I7WUFFREEsc0JBQVdBLG1CQUFVQTtxQkFBckJBO29CQUNFOEIsTUFBTUEsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xDQSxDQUFDQTs7O2VBQUE5QjtZQUVEQSxzQkFBV0EsZUFBTUE7cUJBQWpCQTtvQkFDRStCLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoQ0EsQ0FBQ0E7OztlQUFBL0I7WUFFREEsc0JBQVdBLGNBQUtBO3FCQUFoQkE7b0JBQ0VnQyxNQUFNQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDaENBLENBQUNBOzs7ZUFBQWhDO1lBRURBLHNCQUFXQSxhQUFJQTtxQkFBZkE7b0JBQ0VpQyxNQUFNQSxDQUFDQSxJQUFJQSxLQUFLQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDOUJBLENBQUNBOzs7ZUFBQWpDO1lBRURBLHNCQUFXQSxtQkFBVUE7cUJBQXJCQTtvQkFDRWtDLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNsQ0EsQ0FBQ0E7OztlQUFBbEM7WUFFREEsc0JBQVdBLGFBQUlBO3FCQUFmQTtvQkFDRW1DLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNsQ0EsQ0FBQ0E7OztlQUFBbkM7WUFFREEsc0JBQVdBLG9CQUFXQTtxQkFBdEJBO29CQUNFb0MsTUFBTUEsQ0FBQ0EsSUFBSUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQy9CQSxDQUFDQTs7O2VBQUFwQztZQUVEQSxzQkFBV0EsZUFBTUE7cUJBQWpCQTtvQkFDRXFDLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBO29CQUN4Q0EsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3hDQSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDeENBLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2dCQUM1QkEsQ0FBQ0E7OztlQUFBckM7WUFFTkEsWUFBQ0E7UUFBREEsQ0E5TEFoRixBQThMQ2dGLEVBOUwwQmhGLGtCQUFTQSxFQThMbkNBO1FBOUxZQSxjQUFLQSxRQThMakJBLENBQUFBO0lBRUhBLENBQUNBLEVBbE1TcEQsUUFBUUEsR0FBUkEsV0FBUUEsS0FBUkEsV0FBUUEsUUFrTWpCQTtBQUFEQSxDQUFDQSxFQWxNTSxFQUFFLEtBQUYsRUFBRSxRQWtNUjtBQ3BNRCxJQUFPLEVBQUUsQ0FnT1I7QUFoT0QsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFFBQVFBLENBZ09qQkE7SUFoT1NBLFdBQUFBLFFBQVFBLEVBQUNBLENBQUNBO1FBbUJsQm9EO1lBV0VzSDtnQkFDRUMsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBQ2hCQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxlQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDaENBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLGVBQU1BLENBQUNBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO2dCQUN4Q0EsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7Z0JBQ3pDQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFLQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDN0RBLElBQUlBLENBQUNBLFFBQVFBLEdBQU1BLElBQUlBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO2dCQUN0Q0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBSUEsSUFBSUEsQ0FBQ0E7Z0JBQ3hCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFJQSxFQUFFQSxRQUFRQSxFQUFFQSxFQUFFQSxFQUFFQSxVQUFVQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtZQUN0REEsQ0FBQ0E7WUFFREQsc0JBQUlBLDBCQUFNQTtxQkFBVkE7b0JBQ0VFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO2dCQUN0QkEsQ0FBQ0E7OztlQUFBRjtZQUVEQSxzQkFBSUEsNEJBQVFBO3FCQUFaQTtvQkFDRUcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7Z0JBQ3hCQSxDQUFDQTs7O2VBQUFIO1lBRURBLHdCQUFPQSxHQUFQQTtnQkFDRUksRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2JBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUM5QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2hDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDcEJBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO3dCQUN4Q0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7b0JBQ3pCQSxDQUFDQTtnQkFDSEEsQ0FBQ0E7WUFDSEEsQ0FBQ0E7WUFFREosK0JBQWNBLEdBQWRBO2dCQUNFSyxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNaQSxDQUFDQTtZQUVETCw2QkFBWUEsR0FBWkE7Z0JBQ0VNLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBO1lBQ1pBLENBQUNBO1lBRUROLDRCQUFXQSxHQUFYQTtnQkFDRU8sTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDWkEsQ0FBQ0E7WUFFRFAsb0JBQUdBLEdBQUhBLFVBQUlBLEVBQXlCQTtnQkFDM0JRLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO29CQUNyQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQTtnQkFDREEsRUFBRUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7WUFDakNBLENBQUNBO1lBRU9SLHlCQUFRQSxHQUFoQkEsVUFBaUJBLEVBQXlCQTtnQkFDeENTLElBQUlBLENBQUNBO29CQUNIQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQTtvQkFDZEEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hCQSxDQUFFQTtnQkFBQUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ1hBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO29CQUNmQSxNQUFNQSxDQUFDQSxDQUFDQTtnQkFDVkEsQ0FBQ0E7WUFDSEEsQ0FBQ0E7WUFFT1QsNkJBQVlBLEdBQXBCQSxVQUFxQkEsRUFBeUJBO2dCQUM1Q1UsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0E7Z0JBQ3JDQSxFQUFFQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDM0RBLEVBQUVBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2dCQUM3REEsRUFBRUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDdkJBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQ3pCQSxDQUFDQTtZQUVPViw4QkFBYUEsR0FBckJBLFVBQXNCQSxFQUF5QkE7Z0JBQzdDVyxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO2dCQUM5QkEsSUFBSUEsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUNsQ0EsQ0FBQ0E7WUFFT1gscUNBQW9CQSxHQUE1QkEsVUFBNkJBLEVBQXlCQTtnQkFBdERZLGlCQUlDQTtnQkFIQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQUEsQ0FBQ0E7b0JBQ2hDQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxrQkFBa0JBLENBQUNBLEtBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2dCQUM1RUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDTEEsQ0FBQ0E7WUFFT1osdUNBQXNCQSxHQUE5QkEsVUFBK0JBLEVBQXlCQTtnQkFBeERhLGlCQUlDQTtnQkFIQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQUEsQ0FBQ0E7b0JBQ2xDQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxpQkFBaUJBLENBQUNBLEtBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2dCQUM3RUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDTEEsQ0FBQ0E7WUFFT2IsOEJBQWFBLEdBQXJCQSxVQUFzQkEsRUFBeUJBO2dCQUM3Q2MsSUFBSUEsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxFQUFFQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtnQkFDdEVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO29CQUNaQSxNQUFNQSxJQUFJQSxLQUFLQSxDQUFDQSx3QkFBd0JBLEdBQUdBLEVBQUVBLENBQUNBLGlCQUFpQkEsQ0FBRUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RGQSxDQUFDQTtZQUNIQSxDQUFDQTtZQUVPZCxnQ0FBZUEsR0FBdkJBLFVBQXdCQSxDQUE0QkE7Z0JBQ2xEZSxJQUFJQSxNQUFNQSxHQUFZQSxFQUFFQSxDQUFDQTtnQkFDekJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO3FCQUNYQSxPQUFPQSxDQUFDQSxVQUFDQSxHQUFHQTtvQkFDWEEsSUFBSUEsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xCQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxLQUFLQSxFQUFFQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDN0VBLENBQUNBLENBQUNBLENBQUVBO2dCQUNOQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUNoQkEsQ0FBQ0E7WUFFRGYsc0JBQUlBLDRCQUFRQTtxQkFBWkE7b0JBQ0VnQixNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtnQkFDeEJBLENBQUNBOzs7ZUFBQWhCO1lBRURBLHNCQUFJQSw4QkFBVUE7cUJBQWRBO29CQUNFaUIsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7Z0JBQzFCQSxDQUFDQTs7O2VBQUFqQjtZQUVEQSxzQkFBSUEsMkJBQU9BO3FCQUFYQTtvQkFDRWtCLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBO2dCQUN2QkEsQ0FBQ0E7OztlQUFBbEI7WUFFYUEsWUFBS0EsR0FBR0E7Z0JBQ3BCQSxNQUFNQSxFQUFFQSxPQUFPQTtnQkFDZkEsS0FBS0EsRUFBR0EsT0FBT0E7Z0JBQ2ZBLElBQUlBLEVBQUlBLE1BQU1BO2dCQUNkQSxJQUFJQSxFQUFJQSxNQUFNQTtnQkFDZEEsSUFBSUEsRUFBSUEsTUFBTUE7Z0JBQ2RBLElBQUlBLEVBQUlBLE1BQU1BO2dCQUNkQSxJQUFJQSxFQUFJQSxNQUFNQTtnQkFDZEEsSUFBSUEsRUFBSUEsTUFBTUE7Z0JBQ2RBLEtBQUtBLEVBQUdBLE1BQU1BO2dCQUNkQSxJQUFJQSxFQUFJQSxNQUFNQTtnQkFDZEEsS0FBS0EsRUFBR0EsTUFBTUE7Z0JBQ2RBLFNBQVNBLEVBQUVBLFdBQVdBO2dCQUN0QkEsT0FBT0EsRUFBSUEsV0FBV0E7YUFDdkJBLENBQUFBO1lBRWFBLGVBQVFBLEdBQUdBO2dCQUN2QkEsTUFBTUEsRUFBS0EsY0FBTUEsT0FBQUEsQ0FBQ0EsRUFBREEsQ0FBQ0E7Z0JBQ2xCQSxLQUFLQSxFQUFNQSxjQUFNQSxPQUFBQSxDQUFDQSxFQUFEQSxDQUFDQTtnQkFDbEJBLElBQUlBLEVBQU9BLGNBQU1BLE9BQUFBLElBQUlBLE9BQUlBLENBQUNBLE9BQU9BLEVBQUVBLEVBQWxCQSxDQUFrQkE7Z0JBQ25DQSxJQUFJQSxFQUFPQSxjQUFNQSxPQUFBQSxJQUFJQSxPQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxFQUFsQkEsQ0FBa0JBO2dCQUNuQ0EsSUFBSUEsRUFBT0EsY0FBTUEsT0FBQUEsSUFBSUEsT0FBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsRUFBbEJBLENBQWtCQTtnQkFDbkNBLElBQUlBLEVBQU9BLGNBQU1BLE9BQUFBLElBQUlBLE9BQUlBLENBQUNBLE9BQU9BLEVBQUVBLEVBQWxCQSxDQUFrQkE7Z0JBQ25DQSxJQUFJQSxFQUFPQSxjQUFNQSxPQUFBQSxJQUFJQSxPQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxFQUFsQkEsQ0FBa0JBO2dCQUNuQ0EsSUFBSUEsRUFBT0EsY0FBTUEsT0FBQUEsSUFBSUEsT0FBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsRUFBbEJBLENBQWtCQTtnQkFDbkNBLEtBQUtBLEVBQU1BLGNBQU1BLE9BQUFBLElBQUlBLGNBQUtBLEVBQUVBLEVBQVhBLENBQVdBO2dCQUM1QkEsSUFBSUEsRUFBT0EsY0FBTUEsT0FBQUEsSUFBSUEsYUFBSUEsRUFBRUEsRUFBVkEsQ0FBVUE7Z0JBQzNCQSxLQUFLQSxFQUFNQSxjQUFNQSxPQUFBQSxJQUFJQSxjQUFLQSxFQUFFQSxFQUFYQSxDQUFXQTtnQkFDNUJBLFNBQVNBLEVBQUVBLGNBQU1BLE9BQUFBLElBQUlBLEVBQUpBLENBQUlBO2dCQUNyQkEsT0FBT0EsRUFBSUEsY0FBTUEsT0FBQUEsSUFBSUEsRUFBSkEsQ0FBSUE7YUFDdEJBLENBQUNBO1lBRVlBLGFBQU1BLEdBQUdBO2dCQUNyQkEsTUFBTUEsWUFBQ0EsRUFBeUJBLEVBQUVBLFFBQThCQSxFQUFFQSxLQUFhQTtvQkFDN0VtQixFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtnQkFDaENBLENBQUNBO2dCQUNEbkIsS0FBS0EsWUFBQ0EsRUFBeUJBLEVBQUVBLFFBQThCQSxFQUFFQSxLQUFhQTtvQkFDNUVvQixFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtnQkFDaENBLENBQUNBO2dCQUNEcEIsSUFBSUEsWUFBQ0EsRUFBeUJBLEVBQUVBLFFBQThCQSxFQUFFQSxLQUFtQkE7b0JBQ2pGcUIsRUFBRUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxRQUFRQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDbkRBLENBQUNBO2dCQUNEckIsSUFBSUEsWUFBQ0EsRUFBeUJBLEVBQUVBLFFBQThCQSxFQUFFQSxLQUFtQkE7b0JBQ2pGc0IsRUFBRUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxRQUFRQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDbkRBLENBQUNBO2dCQUNEdEIsSUFBSUEsWUFBQ0EsRUFBeUJBLEVBQUVBLFFBQThCQSxFQUFFQSxLQUFtQkE7b0JBQ2pGdUIsRUFBRUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxRQUFRQSxFQUFFQSxLQUFLQSxFQUFFQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDbkRBLENBQUNBO2dCQUNEdkIsSUFBSUEsWUFBQ0EsRUFBeUJBLEVBQUVBLFFBQThCQSxFQUFFQSxLQUFtQkE7b0JBQ2pGd0IsRUFBRUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsUUFBUUEsRUFBRUEsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RDQSxDQUFDQTtnQkFDRHhCLElBQUlBLFlBQUNBLEVBQXlCQSxFQUFFQSxRQUE4QkEsRUFBRUEsS0FBbUJBO29CQUNqRnlCLEVBQUVBLENBQUNBLFVBQVVBLENBQUNBLFFBQVFBLEVBQUVBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUN0Q0EsQ0FBQ0E7Z0JBQ0R6QixJQUFJQSxZQUFDQSxFQUF5QkEsRUFBRUEsUUFBOEJBLEVBQUVBLEtBQW1CQTtvQkFDakYwQixFQUFFQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxFQUFFQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDdENBLENBQUNBO2dCQUNEMUIsS0FBS0EsWUFBQ0EsRUFBeUJBLEVBQUVBLFFBQThCQSxFQUFFQSxLQUFtQkE7b0JBQ2xGMkIsRUFBRUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsUUFBUUEsRUFBRUEsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RDQSxDQUFDQTtnQkFDRDNCLElBQUlBLFlBQUNBLEVBQXlCQSxFQUFFQSxRQUE4QkEsRUFBRUEsS0FBbUJBO29CQUNqRjRCLEVBQUVBLENBQUNBLFVBQVVBLENBQUNBLFFBQVFBLEVBQUVBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUN0Q0EsQ0FBQ0E7Z0JBQ0Q1QixLQUFLQSxZQUFDQSxFQUF5QkEsRUFBRUEsUUFBOEJBLEVBQUVBLEtBQW1CQTtvQkFDbEY2QixFQUFFQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxFQUFFQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDdENBLENBQUNBO2dCQUNEN0IsU0FBU0EsWUFBQ0EsRUFBeUJBLEVBQUVBLFFBQThCQSxFQUFFQSxLQUFjQTtvQkFDakY4QixFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDWkEsQ0FBQ0E7Z0JBQ0hBLENBQUNBO2dCQUNEOUIsT0FBT0EsWUFBQ0EsRUFBeUJBLEVBQUVBLFFBQThCQSxFQUFFQSxLQUFjQTtvQkFDL0UrQixFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDWkEsQ0FBQ0E7Z0JBQ0hBLENBQUNBO2FBQ0YvQixDQUFBQTtZQUVIQSxhQUFDQTtRQUFEQSxDQXpNQXRILEFBeU1Dc0gsSUFBQXRIO1FBek1ZQSxlQUFNQSxTQXlNbEJBLENBQUFBO0lBSUhBLENBQUNBLEVBaE9TcEQsUUFBUUEsR0FBUkEsV0FBUUEsS0FBUkEsV0FBUUEsUUFnT2pCQTtBQUFEQSxDQUFDQSxFQWhPTSxFQUFFLEtBQUYsRUFBRSxRQWdPUjtBQ2hPRCxJQUFPLEVBQUUsQ0FtQ1I7QUFuQ0QsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFFBQVFBLENBbUNqQkE7SUFuQ1NBLFdBQUFBLFFBQVFBLEVBQUNBLENBQUNBO1FBRWxCb0Q7WUFZRXNKLGNBQVlBLE1BQTJCQSxFQUFFQSxJQUFzQkE7Z0JBQW5EQyxzQkFBMkJBLEdBQTNCQSxTQUFRQSxJQUFJQSxDQUFDQSxjQUFjQTtnQkFBRUEsb0JBQXNCQSxHQUF0QkEsT0FBS0EsSUFBSUEsQ0FBQ0EsWUFBWUE7Z0JBQzdEQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBO2dCQUM3Q0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBS0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQTtnQkFDM0NBLElBQUlBLENBQUNBLE1BQU1BLEdBQVFBLE1BQU1BLENBQUNBO2dCQUMxQkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBVUEsSUFBSUEsQ0FBQ0E7WUFDMUJBLENBQUNBO1lBRURELHNCQUFJQSx3QkFBTUE7cUJBQVZBO29CQUNFRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDakNBLENBQUNBO3FCQUVERixVQUFXQSxLQUF1QkE7b0JBQ2hDRSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxLQUFLQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDN0JBLElBQUlBLENBQUNBLE9BQU9BLEdBQVdBLEtBQUtBLENBQUNBO29CQUMvQkEsQ0FBQ0E7b0JBQUNBLElBQUlBLENBQUNBLENBQUNBO3dCQUNOQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFjQSxLQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDN0NBLENBQUNBO2dCQUNIQSxDQUFDQTs7O2VBUkFGO1lBbkJNQSx5QkFBb0JBLEdBQUdBLGNBQUtBLENBQUNBLFdBQVdBLENBQUNBO1lBQ3pDQSx1QkFBa0JBLEdBQUtBLGNBQUtBLENBQUNBLEtBQUtBLENBQUNBO1lBQ25DQSxpQkFBWUEsR0FBV0EsRUFBRUEsQ0FBQ0E7WUFDMUJBLG1CQUFjQSxHQUFTQSxXQUFXQSxDQUFDQTtZQTBCNUNBLFdBQUNBO1FBQURBLENBL0JBdEosQUErQkNzSixJQUFBdEo7UUEvQllBLGFBQUlBLE9BK0JoQkEsQ0FBQUE7SUFFSEEsQ0FBQ0EsRUFuQ1NwRCxRQUFRQSxHQUFSQSxXQUFRQSxLQUFSQSxXQUFRQSxRQW1DakJBO0FBQURBLENBQUNBLEVBbkNNLEVBQUUsS0FBRixFQUFFLFFBbUNSO0FDbkNELG1DQUFtQztBQUVuQyxJQUFPLEVBQUUsQ0FxQ1I7QUFyQ0QsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFFBQVFBLENBcUNqQkE7SUFyQ1NBLFdBQUFBLFFBQVFBLEVBQUNBLENBQUNBO1FBT2xCb0Q7WUFJRXlKO2dCQUNFQyxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNwQkEsQ0FBQ0E7WUFFREQsc0JBQWNBLDRCQUFNQTtxQkFBcEJBO29CQUNFRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFDckJBLENBQUNBOzs7ZUFBQUY7WUFFREEsK0JBQVlBLEdBQVpBLFVBQWFBLE9BQWNBLEVBQUVBLEtBQVlBO2dCQUN2Q0csSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBQ0EsT0FBQUEsS0FBS0EsRUFBRUEsU0FBQUEsT0FBT0EsRUFBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDckNBLENBQUNBO1lBRURILDBCQUFPQSxHQUFQQSxVQUFRQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxPQUFnQ0E7Z0JBQzFESSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtnQkFDL0NBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLENBQUNBO29CQUM3QixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLENBQUNBLENBQUNBO2dCQUNIQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNmQSxDQUFDQTtZQUVESixpQ0FBY0EsR0FBZEEsVUFBZUEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsT0FBZ0NBO2dCQUNqRUssTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDZEEsQ0FBQ0E7WUFFSEwsZUFBQ0E7UUFBREEsQ0E1QkF6SixBQTRCQ3lKLElBQUF6SjtRQTVCWUEsaUJBQVFBLFdBNEJwQkEsQ0FBQUE7SUFFSEEsQ0FBQ0EsRUFyQ1NwRCxRQUFRQSxHQUFSQSxXQUFRQSxLQUFSQSxXQUFRQSxRQXFDakJBO0FBQURBLENBQUNBLEVBckNNLEVBQUUsS0FBRixFQUFFLFFBcUNSO0FDdkNELG1DQUFtQztBQUNuQyxzQ0FBc0M7QUFFdEMsSUFBTyxFQUFFLENBc0JSO0FBdEJELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxRQUFRQSxDQXNCakJBO0lBdEJTQSxXQUFBQSxRQUFRQSxFQUFDQSxDQUFDQTtRQUVsQm9EO1lBQW9DK0osa0NBQVFBO1lBSTFDQSx3QkFBWUEsS0FBY0E7Z0JBQWRDLHFCQUFjQSxHQUFkQSxTQUFjQTtnQkFDeEJBLGlCQUFPQSxDQUFBQTtnQkFDUEEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDckJBLENBQUNBO1lBRURELHVDQUFjQSxHQUFkQSxVQUFlQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxPQUFnQ0E7Z0JBQ2pFRSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDbkNBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNwQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDOUJBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUM5QkEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsREEsQ0FBQ0E7WUFFSEYscUJBQUNBO1FBQURBLENBbEJBL0osQUFrQkMrSixFQWxCbUMvSixpQkFBUUEsRUFrQjNDQTtRQWxCWUEsdUJBQWNBLGlCQWtCMUJBLENBQUFBO0lBRUhBLENBQUNBLEVBdEJTcEQsUUFBUUEsR0FBUkEsV0FBUUEsS0FBUkEsV0FBUUEsUUFzQmpCQTtBQUFEQSxDQUFDQSxFQXRCTSxFQUFFLEtBQUYsRUFBRSxRQXNCUjtBQ3pCRCxJQUFPLEVBQUUsQ0EyQlI7QUEzQkQsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFFBQVFBLENBMkJqQkE7SUEzQlNBLFdBQUFBLFFBQVFBLEVBQUNBLENBQUNBO1FBRWxCb0QsSUFBY0EsYUFBYUEsQ0FLMUJBO1FBTERBLFdBQWNBLGFBQWFBLEVBQUNBLENBQUNBO1lBQ2hCa0ssa0JBQUlBLEdBQUdBLFFBQVFBLENBQUNBO1lBQ2hCQSxlQUFDQSxHQUFNQSxVQUFVQSxDQUFDQTtZQUNsQkEsZUFBQ0EsR0FBTUEsVUFBVUEsQ0FBQ0E7WUFDbEJBLGtCQUFJQSxHQUFHQSxXQUFXQSxDQUFDQTtRQUNoQ0EsQ0FBQ0EsRUFMYWxLLGFBQWFBLEdBQWJBLHNCQUFhQSxLQUFiQSxzQkFBYUEsUUFLMUJBO1FBRURBO1lBS0VtSyxpQkFBWUEsTUFBY0EsRUFBRUEsTUFBZ0NBO2dCQUFoQ0Msc0JBQWdDQSxHQUFoQ0EsU0FBY0EsYUFBYUEsQ0FBQ0EsSUFBSUE7Z0JBQzFEQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQTtnQkFDckJBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLE1BQU1BLENBQUNBO1lBQ3ZCQSxDQUFDQTtZQUVERCx5QkFBT0EsR0FBUEEsVUFBUUEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsT0FBZ0NBO2dCQUMxREUsSUFBSUEsTUFBTUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ2hCQSxPQUFPQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtnQkFDbERBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1lBQ2RBLENBQUNBO1lBRUhGLGNBQUNBO1FBQURBLENBaEJBbkssQUFnQkNtSyxJQUFBbks7UUFoQllBLGdCQUFPQSxVQWdCbkJBLENBQUFBO0lBRUhBLENBQUNBLEVBM0JTcEQsUUFBUUEsR0FBUkEsV0FBUUEsS0FBUkEsV0FBUUEsUUEyQmpCQTtBQUFEQSxDQUFDQSxFQTNCTSxFQUFFLEtBQUYsRUFBRSxRQTJCUjtBQzNCRCxJQUFPLEVBQUUsQ0F3Q1I7QUF4Q0QsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFFBQVFBLENBd0NqQkE7SUF4Q1NBLFdBQUFBLFFBQVFBLEVBQUNBLENBQUNBO1FBRWxCb0Q7WUFPRXNLLGdCQUFZQSxLQUFhQSxFQUFFQSxNQUFjQTtnQkFDdkNDLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLFFBQVFBLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO2dCQUNoREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQzNCQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQTtnQkFDN0JBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ2hEQSxDQUFDQTtZQUVNRCxnQkFBU0EsR0FBaEJBLFVBQWlCQSxHQUFxQkE7Z0JBQ3BDRSxJQUFJQSxFQUFFQSxHQUFHQSxJQUFJQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtnQkFDM0NBLEVBQUVBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDWkEsQ0FBQ0E7WUFFREYsc0JBQUlBLDBCQUFNQTtxQkFBVkE7b0JBQ0VHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO2dCQUN0QkEsQ0FBQ0E7OztlQUFBSDtZQUVEQSxzQkFBSUEsMkJBQU9BO3FCQUFYQTtvQkFDRUksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7Z0JBQ3ZCQSxDQUFDQTs7O2VBQUFKO1lBRURBLHNCQUFJQSx5QkFBS0E7cUJBQVRBO29CQUNFSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFDNUJBLENBQUNBOzs7ZUFBQUw7WUFFREEsc0JBQUlBLDBCQUFNQTtxQkFBVkE7b0JBQ0VNLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBO2dCQUM3QkEsQ0FBQ0E7OztlQUFBTjtZQUVIQSxhQUFDQTtRQUFEQSxDQXBDQXRLLEFBb0NDc0ssSUFBQXRLO1FBcENZQSxlQUFNQSxTQW9DbEJBLENBQUFBO0lBRUhBLENBQUNBLEVBeENTcEQsUUFBUUEsR0FBUkEsV0FBUUEsS0FBUkEsV0FBUUEsUUF3Q2pCQTtBQUFEQSxDQUFDQSxFQXhDTSxFQUFFLEtBQUYsRUFBRSxRQXdDUjtBQ3hDRCxJQUFPLEVBQUUsQ0FRUjtBQVJELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxRQUFRQSxDQVFqQkE7SUFSU0EsV0FBQUEsUUFBUUEsRUFBQ0EsQ0FBQ0E7UUFFbEJvRDtZQUEyQjZLLHlCQUFZQTtZQUF2Q0E7Z0JBQTJCQyw4QkFBWUE7WUFJdkNBLENBQUNBO1lBQURELFlBQUNBO1FBQURBLENBSkE3SyxBQUlDNkssRUFKMEI3SyxPQUFJQSxDQUFDQSxPQUFPQSxFQUl0Q0E7UUFKWUEsY0FBS0EsUUFJakJBLENBQUFBO0lBRUhBLENBQUNBLEVBUlNwRCxRQUFRQSxHQUFSQSxXQUFRQSxLQUFSQSxXQUFRQSxRQVFqQkE7QUFBREEsQ0FBQ0EsRUFSTSxFQUFFLEtBQUYsRUFBRSxRQVFSO0FDUkQsSUFBTyxFQUFFLENBeUJSO0FBekJELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxRQUFRQSxDQXlCakJBO0lBekJTQSxXQUFBQSxRQUFRQSxFQUFDQSxDQUFDQTtRQUlsQm9ELElBQWNBLFFBQVFBLENBbUJyQkE7UUFuQkRBLFdBQWNBLFFBQVFBLEVBQUNBLENBQUNBO1lBQ1grSyxZQUFHQSxHQUE0QkEsVUFBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBS0EsT0FBQUEsQ0FBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBSUEsQ0FBQ0EsQ0FBSUEsRUFBaEJBLENBQWdCQSxDQUFDQTtZQUMxREEsYUFBSUEsR0FBMkJBLFVBQUNBLENBQUNBLEVBQUVBLENBQUNBLElBQUtBLE9BQUFBLENBQUlBLENBQUNBLEVBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUVBLEVBQWhCQSxDQUFnQkEsQ0FBQ0E7WUFDMURBLGNBQUtBLEdBQTBCQSxVQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFLQSxPQUFBQSxDQUFJQSxDQUFDQSxFQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFFQSxFQUFoQkEsQ0FBZ0JBLENBQUNBO1lBQzFEQSxlQUFNQSxHQUF5QkEsVUFBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBS0EsT0FBQUEsQ0FBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBSUEsQ0FBQ0EsQ0FBSUEsRUFBaEJBLENBQWdCQSxDQUFDQTtZQUMxREEsaUJBQVFBLEdBQXVCQSxVQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFLQSxPQUFBQSxDQUFJQSxDQUFDQSxFQUFNQSxDQUFDQSxDQUFJQSxFQUFoQkEsQ0FBZ0JBLENBQUNBO1lBQzFEQSxrQkFBU0EsR0FBc0JBLFVBQUNBLENBQUNBLEVBQUVBLENBQUNBLElBQUtBLE9BQUFBLENBQUlBLENBQUNBLEVBQU1BLENBQUNBLENBQUlBLEVBQWhCQSxDQUFnQkEsQ0FBQ0E7WUFDMURBLG9CQUFXQSxHQUFvQkEsVUFBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBS0EsT0FBQUEsQ0FBSUEsQ0FBQ0EsRUFBTUEsQ0FBQ0EsQ0FBSUEsRUFBaEJBLENBQWdCQSxDQUFDQTtZQUMxREEscUJBQVlBLEdBQW1CQSxVQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFLQSxPQUFBQSxDQUFJQSxDQUFDQSxFQUFNQSxDQUFDQSxDQUFJQSxFQUFoQkEsQ0FBZ0JBLENBQUNBO1lBQzFEQSxlQUFNQSxHQUF5QkEsVUFBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBS0EsT0FBQUEsQ0FBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBRUEsRUFBaEJBLENBQWdCQSxDQUFDQTtZQUVyRUEsaUJBQXdCQSxDQUFRQSxFQUFFQSxDQUFRQTtnQkFDeENDLE1BQU1BLENBQUNBLFVBQUNBLENBQUNBLEVBQUVBLENBQUNBLElBQUtBLE9BQUFBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQWRBLENBQWNBLENBQUNBO1lBQ2xDQSxDQUFDQTtZQUZlRCxnQkFBT0EsVUFFdEJBLENBQUFBO1lBRURBLGtCQUF5QkEsQ0FBUUEsRUFBRUEsQ0FBUUE7Z0JBQ3pDRSxNQUFNQSxDQUFDQSxVQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFLQSxPQUFBQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFOQSxDQUFNQSxDQUFDQTtZQUMxQkEsQ0FBQ0E7WUFGZUYsaUJBQVFBLFdBRXZCQSxDQUFBQTtRQUVIQSxDQUFDQSxFQW5CYS9LLFFBQVFBLEdBQVJBLGlCQUFRQSxLQUFSQSxpQkFBUUEsUUFtQnJCQTtJQUVIQSxDQUFDQSxFQXpCU3BELFFBQVFBLEdBQVJBLFdBQVFBLEtBQVJBLFdBQVFBLFFBeUJqQkE7QUFBREEsQ0FBQ0EsRUF6Qk0sRUFBRSxLQUFGLEVBQUUsUUF5QlI7QUN6QkQsbUNBQW1DO0FBQ25DLHNDQUFzQztBQUN0QyxzQ0FBc0M7QUFFdEMsSUFBTyxFQUFFLENBNEJSO0FBNUJELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxRQUFRQSxDQTRCakJBO0lBNUJTQSxXQUFBQSxRQUFRQSxFQUFDQSxDQUFDQTtRQUVsQm9EO1lBQW9Da0wsa0NBQVFBO1lBTTFDQSx3QkFBWUEsV0FBYUEsRUFBRUEsU0FBV0EsRUFBRUEsUUFBMEJBO2dCQUF0REMsMkJBQWFBLEdBQWJBLGVBQWFBO2dCQUFFQSx5QkFBV0EsR0FBWEEsYUFBV0E7Z0JBQUVBLHdCQUEwQkEsR0FBMUJBLFdBQVdBLGlCQUFRQSxDQUFDQSxNQUFNQTtnQkFDaEVBLGlCQUFPQSxDQUFBQTtnQkFDUEEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsV0FBV0EsQ0FBQ0E7Z0JBQy9CQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFLQSxTQUFTQSxDQUFDQTtnQkFDN0JBLElBQUlBLENBQUNBLFFBQVFBLEdBQU1BLFFBQVFBLENBQUNBO1lBQzlCQSxDQUFDQTtZQUVERCx1Q0FBY0EsR0FBZEEsVUFBZUEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsT0FBZ0NBO2dCQUNqRUUsSUFBSUEsS0FBU0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBM0JBLENBQUNBLFVBQUVBLENBQUNBLFFBQXVCQSxDQUFDQTtnQkFDakNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUZBLENBQUNBO1lBRURGLGlDQUFRQSxHQUFSQTtnQkFDRUcsTUFBTUEsQ0FBQ0EsQ0FBQ0EsaUJBQVFBLENBQUNBLENBQUNBLENBQUNBO29CQUNqQkEsUUFBUUE7Z0JBQ1ZBLENBQUNBO1lBQ0hBLENBQUNBO1lBRUhILHFCQUFDQTtRQUFEQSxDQXhCQWxMLEFBd0JDa0wsRUF4Qm1DbEwsaUJBQVFBLEVBd0IzQ0E7UUF4QllBLHVCQUFjQSxpQkF3QjFCQSxDQUFBQTtJQUVIQSxDQUFDQSxFQTVCU3BELFFBQVFBLEdBQVJBLFdBQVFBLEtBQVJBLFdBQVFBLFFBNEJqQkE7QUFBREEsQ0FBQ0EsRUE1Qk0sRUFBRSxLQUFGLEVBQUUsUUE0QlI7QUNoQ0QsMkNBQTJDO0FBRTNDLElBQU8sRUFBRSxDQW9EUjtBQXBERCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsUUFBUUEsQ0FvRGpCQTtJQXBEU0EsV0FBQUEsUUFBUUEsRUFBQ0EsQ0FBQ0E7UUFFbEJvRDtZQUEwQnNMLHdCQUFZQTtZQUF0Q0E7Z0JBQTBCQyw4QkFBWUE7WUE4Q3RDQSxDQUFDQTtZQTVDQ0Qsc0JBQUlBLG1CQUFDQTtxQkFBTEE7b0JBQ0VFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNqQkEsQ0FBQ0E7cUJBRURGLFVBQU1BLEtBQUtBO29CQUNURSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtnQkFDbEJBLENBQUNBOzs7ZUFKQUY7WUFNREEsc0JBQUlBLG1CQUFDQTtxQkFBTEE7b0JBQ0VHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNqQkEsQ0FBQ0E7cUJBRURILFVBQU1BLEtBQUtBO29CQUNURyxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtnQkFDbEJBLENBQUNBOzs7ZUFKQUg7WUFNREEsc0JBQUlBLG1CQUFDQTtxQkFBTEE7b0JBQ0VJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNqQkEsQ0FBQ0E7cUJBRURKLFVBQU1BLEtBQUtBO29CQUNUSSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtnQkFDbEJBLENBQUNBOzs7ZUFKQUo7WUFNREEsc0JBQUlBLHVCQUFLQTtxQkFBVEE7b0JBQ0VLLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoQkEsQ0FBQ0E7cUJBRURMLFVBQVVBLEtBQUtBO29CQUNiSyxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtnQkFDakJBLENBQUNBOzs7ZUFKQUw7WUFNREEsc0JBQUlBLHdCQUFNQTtxQkFBVkE7b0JBQ0VNLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoQkEsQ0FBQ0E7cUJBRUROLFVBQVdBLEtBQUtBO29CQUNkTSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtnQkFDakJBLENBQUNBOzs7ZUFKQU47WUFNREEsb0JBQUtBLEdBQUxBO2dCQUNFTyxNQUFNQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsREEsQ0FBQ0E7WUFFSFAsV0FBQ0E7UUFBREEsQ0E5Q0F0TCxBQThDQ3NMLEVBOUN5QnRMLE9BQUlBLENBQUNBLE9BQU9BLEVBOENyQ0E7UUE5Q1lBLGFBQUlBLE9BOENoQkEsQ0FBQUE7UUFFREEsT0FBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7SUFFeERBLENBQUNBLEVBcERTcEQsUUFBUUEsR0FBUkEsV0FBUUEsS0FBUkEsV0FBUUEsUUFvRGpCQTtBQUFEQSxDQUFDQSxFQXBETSxFQUFFLEtBQUYsRUFBRSxRQW9EUjtBQ3RERCxJQUFPLEVBQUUsQ0FzR1I7QUF0R0QsV0FBTyxFQUFFO0lBQUNBLElBQUFBLFFBQVFBLENBc0dqQkE7SUF0R1NBLFdBQUFBLFFBQVFBLEVBQUNBLENBQUNBO1FBRWxCb0Q7WUFPRThMLGdCQUFZQSxNQUFjQSxFQUFFQSxRQUFjQTtnQkFBZEMsd0JBQWNBLEdBQWRBLGdCQUFjQTtnQkFDeENBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUNkQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQTtnQkFDdEJBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFFBQVFBLENBQUNBO2dCQUMxQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBS0EsTUFBTUEsQ0FBQ0E7WUFDMUJBLENBQUNBO1lBRURELHNCQUFJQSw0QkFBUUE7cUJBQVpBO29CQUNFRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtnQkFDeEJBLENBQUNBOzs7ZUFBQUY7WUFFREEsc0JBQUlBLG1DQUFlQTtxQkFBbkJBO29CQUNFRyxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtvQkFDNUJBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO29CQUNqQ0EsTUFBTUEsQ0FBQ0EsS0FBR0EsSUFBSUEsR0FBR0EsSUFBSUEsNkJBQXlCQSxJQUFJQSxDQUFDQSxHQUFHQSxRQUFNQSxDQUFDQTtnQkFDL0RBLENBQUNBOzs7ZUFBQUg7WUFFREEsd0JBQU9BLEdBQVBBLFVBQVFBLEVBQXlCQTtnQkFDL0JJLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO29CQUNuQkEsRUFBRUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2hDQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQTtnQkFDeEJBLENBQUNBO1lBQ0hBLENBQUNBO1lBRURKLHdCQUFPQSxHQUFQQSxVQUFRQSxFQUF5QkE7Z0JBQy9CSyxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxLQUFLQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDNUJBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEVBQUVBLENBQUNBLGVBQWVBLEdBQUdBLEVBQUVBLENBQUNBLGFBQWFBLENBQUNBO29CQUNqRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsRUFBRUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZDQSxFQUFFQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtvQkFDdERBLEVBQUVBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO2dCQUNuQ0EsQ0FBQ0E7Z0JBQ0RBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO2dCQUN6QkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7WUFDeEJBLENBQUNBO1lBRU9MLGdDQUFlQSxHQUF2QkEsVUFBd0JBLEVBQXlCQTtnQkFDL0NNLElBQUlBLE9BQU9BLEdBQUdBLEVBQUVBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsRUFBRUEsRUFBRUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDYkEseURBQXlEQTtvQkFDekRBLElBQUlBLEdBQUdBLEdBQUdBLDRCQUE0QkEsR0FBR0EsRUFBRUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtvQkFDN0VBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO29CQUNqQkEsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZCQSxDQUFDQTtZQUNIQSxDQUFDQTtZQUVPTiwwQkFBU0EsR0FBakJBO2dCQUNFTyxNQUFNQSxDQUFDQSw0QkFBNEJBLENBQUNBO1lBQ3RDQSxDQUFDQTtZQUVPUCwrQkFBY0EsR0FBdEJBO2dCQUNFUSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDbEJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLHFCQUFxQkEsRUFBRUEsQ0FBQ0E7Z0JBQ3RDQSxDQUFDQTtnQkFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxFQUFFQSxDQUFDQTtZQUNwQ0EsQ0FBQ0E7WUFFT1IsK0JBQWNBLEdBQXRCQTtnQkFDRVMsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQ25DQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtxQkFDckJBLEdBQUdBLENBQUNBLFVBQUNBLENBQUNBO29CQUNMQSxNQUFNQSxDQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxTQUFJQSxDQUFDQSxNQUFHQSxDQUFDQTtnQkFDNUJBLENBQUNBLENBQUNBO3FCQUNEQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNoQkEsQ0FBQ0E7WUFFT1QsNkJBQVlBLEdBQXBCQTtnQkFDRVUsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0E7Z0JBQ2pDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtxQkFDckJBLEdBQUdBLENBQUNBLFVBQUNBLENBQUNBO29CQUNMQSxNQUFNQSxDQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxTQUFJQSxDQUFDQSxNQUFHQSxDQUFDQTtnQkFDakNBLENBQUNBLENBQUNBO3FCQUNEQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNoQkEsQ0FBQ0E7WUFFT1YsNEJBQVdBLEdBQW5CQTtnQkFDRVcsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7Z0JBQ2hDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtxQkFDckJBLEdBQUdBLENBQUNBLFVBQUNBLENBQUNBO29CQUNMQSxNQUFNQSxDQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxTQUFJQSxDQUFDQSxNQUFHQSxDQUFDQTtnQkFDNUJBLENBQUNBLENBQUNBO3FCQUNEQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNoQkEsQ0FBQ0E7WUFFT1gsb0NBQW1CQSxHQUEzQkE7Z0JBQ0VZLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO1lBQzFFQSxDQUFDQTtZQUVPWixzQ0FBcUJBLEdBQTdCQTtnQkFDRWEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7WUFDbERBLENBQUNBO1lBRUhiLGFBQUNBO1FBQURBLENBbEdBOUwsQUFrR0M4TCxJQUFBOUw7UUFsR1lBLGVBQU1BLFNBa0dsQkEsQ0FBQUE7SUFFSEEsQ0FBQ0EsRUF0R1NwRCxRQUFRQSxHQUFSQSxXQUFRQSxLQUFSQSxXQUFRQSxRQXNHakJBO0FBQURBLENBQUNBLEVBdEdNLEVBQUUsS0FBRixFQUFFLFFBc0dSO0FDdEdELElBQU8sRUFBRSxDQXVIUjtBQXZIRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsUUFBUUEsQ0F1SGpCQTtJQXZIU0EsV0FBQUEsUUFBUUEsRUFBQ0EsQ0FBQ0E7UUFFbEJvRDtZQVFFNE0saUJBQVlBLE1BQWVBO2dCQUN6QkMsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBTUEsTUFBTUEsQ0FBQ0E7Z0JBQ3pCQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQTtnQkFDdkJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO2dCQUN2QkEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBSUEsSUFBSUEsQ0FBQ0E7Z0JBQ3ZCQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFNQSxJQUFJQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUN6Q0EsQ0FBQ0E7WUFFREQseUJBQU9BLEdBQVBBO2dCQUNFRSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxLQUFLQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDdEJBLElBQUlBLENBQUNBLGlCQUFpQkEsRUFBRUEsQ0FBQ0E7b0JBQ3pCQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLENBQUNBO2dCQUMxQkEsQ0FBQ0E7WUFDSEEsQ0FBQ0E7WUFFT0YsbUNBQWlCQSxHQUF6QkE7Z0JBQ0VHLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEtBQUtBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO29CQUM3QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzFDQSxDQUFDQTtnQkFDREEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDekJBLENBQUNBO1lBRU9ILGtDQUFnQkEsR0FBeEJBO2dCQUNFSSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxLQUFLQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDNUJBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO2dCQUN6Q0EsQ0FBQ0E7Z0JBQ0RBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3hCQSxDQUFDQTtZQUVESiwwQkFBUUEsR0FBUkEsVUFBU0EsRUFBeUJBO2dCQUNoQ0ssSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ2RBLElBQUlBLENBQUNBLGlCQUFpQkEsRUFBRUEsQ0FBQ0E7Z0JBQ3pCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxhQUFJQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkRBLElBQUlBLENBQUNBLGtCQUFrQkEsRUFBRUEsQ0FBQ0E7Z0JBQzFCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUN6QkEsQ0FBQ0E7WUFFREwsd0JBQU1BLEdBQU5BO2dCQUNFTSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtZQUNqQkEsQ0FBQ0E7WUFFRE4sdUJBQUtBLEdBQUxBLFVBQU1BLEVBQXlCQTtnQkFDN0JPLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO29CQUNyQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQTtZQUNIQSxDQUFDQTtZQUVEUCxzQkFBSUEsR0FBSkEsVUFBS0EsSUFBVUE7Z0JBQ2JRLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO2dCQUN2Q0EsSUFBSUEsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0E7WUFDeEJBLENBQUNBO1lBRURSLHlCQUFPQSxHQUFQQSxVQUFRQSxLQUFjQTtnQkFDcEJTLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBO2dCQUNqREEsSUFBSUEsTUFBTUEsR0FBR0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQzFCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxNQUFNQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtvQkFDaENBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBO2dCQUMvQ0EsQ0FBQ0E7Z0JBQ0RBLElBQUlBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO1lBQ3hCQSxDQUFDQTtZQUVPVCxvQ0FBa0JBLEdBQTFCQTtnQkFDRVUsSUFBSUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7Z0JBQ2xCQSxFQUFFQSxDQUFDQSxXQUFXQSxDQUFDQSxFQUFFQSxDQUFDQSxVQUFVQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtnQkFDL0NBLEVBQUVBLENBQUNBLGFBQWFBLENBQUNBLEVBQUVBLENBQUNBLFVBQVVBLEVBQUVBLEVBQUVBLENBQUNBLGNBQWNBLEVBQUVBLEVBQUVBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO2dCQUNyRUEsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsVUFBVUEsRUFBRUEsRUFBRUEsQ0FBQ0EsY0FBY0EsRUFBRUEsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3JFQSxFQUFFQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxDQUFDQSxVQUFVQSxFQUFFQSxFQUFFQSxDQUFDQSxrQkFBa0JBLEVBQUVBLEVBQUVBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2dCQUNuRUEsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsVUFBVUEsRUFBRUEsRUFBRUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxFQUFFQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtnQkFDbkVBLEVBQUVBLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLElBQUlBLEVBQUVBLEVBQUVBLENBQUNBLElBQUlBLEVBQUVBLEVBQUVBLENBQUNBLGFBQWFBLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQzNGQSxDQUFDQTtZQUVPVixtQ0FBaUJBLEdBQXpCQTtnQkFDRVcsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsWUFBWUEsRUFBRUEsQ0FBQ0E7WUFDM0NBLENBQUNBO1lBRU9YLCtCQUFhQSxHQUFyQkEsVUFBc0JBLE1BQW9CQSxFQUFFQSxJQUFVQTtnQkFDcERZLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO2dCQUNqQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsWUFBWUEsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzNEQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxZQUFZQSxFQUFFQSxNQUFNQSxFQUFFQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUMzRUEsQ0FBQ0E7WUFFT1osZ0NBQWNBLEdBQXRCQTtnQkFDRWEsSUFBSUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7Z0JBQ2xCQSxFQUFFQSxDQUFDQSxXQUFXQSxDQUFDQSxFQUFFQSxDQUFDQSxVQUFVQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtnQkFDL0NBLEVBQUVBLENBQUNBLGFBQWFBLENBQUNBLEVBQUVBLENBQUNBLFVBQVVBLEVBQUVBLEVBQUVBLENBQUNBLGNBQWNBLEVBQUVBLEVBQUVBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO2dCQUNyRUEsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsVUFBVUEsRUFBRUEsRUFBRUEsQ0FBQ0EsY0FBY0EsRUFBRUEsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3JFQSxFQUFFQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxDQUFDQSxVQUFVQSxFQUFFQSxFQUFFQSxDQUFDQSxrQkFBa0JBLEVBQUVBLEVBQUVBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2dCQUNuRUEsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsVUFBVUEsRUFBRUEsRUFBRUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxFQUFFQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtZQUNyRUEsQ0FBQ0E7WUFFT2IsK0JBQWFBLEdBQXJCQSxVQUFzQkEsTUFBb0JBLEVBQUVBLElBQVdBLEVBQUVBLE1BQWtCQTtnQkFBbEJjLHNCQUFrQkEsR0FBbEJBLFVBQWtCQTtnQkFDekVBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQVFBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQVFBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO2dCQUNoRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQ2hFQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDbEVBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNsRUEsTUFBTUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsR0FBR0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RFQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN4RUEsQ0FBQ0E7WUFFRGQsc0JBQUlBLDBCQUFLQTtxQkFBVEE7b0JBQ0VlLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBO2dCQUM1QkEsQ0FBQ0E7OztlQUFBZjtZQUVEQSxzQkFBSUEsMkJBQU1BO3FCQUFWQTtvQkFDRWdCLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBO2dCQUM3QkEsQ0FBQ0E7OztlQUFBaEI7WUFFSEEsY0FBQ0E7UUFBREEsQ0FuSEE1TSxBQW1IQzRNLElBQUE1TTtRQW5IWUEsZ0JBQU9BLFVBbUhuQkEsQ0FBQUE7SUFFSEEsQ0FBQ0EsRUF2SFNwRCxRQUFRQSxHQUFSQSxXQUFRQSxLQUFSQSxXQUFRQSxRQXVIakJBO0FBQURBLENBQUNBLEVBdkhNLEVBQUUsS0FBRixFQUFFLFFBdUhSO0FDdkhELElBQU8sRUFBRSxDQXNGUjtBQXRGRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsUUFBUUEsQ0FzRmpCQTtJQXRGU0EsV0FBQUEsUUFBUUEsRUFBQ0EsQ0FBQ0E7UUFFbEJvRDtZQUEwQjZOLHdCQUFZQTtZQUF0Q0E7Z0JBQTBCQyw4QkFBWUE7WUFrRnRDQSxDQUFDQTtZQWhGQ0Qsc0JBQUlBLGdCQUFDQSxDQUFFQTtxQkFBUEE7b0JBQ0VFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsQ0FBQ0E7OztlQUFBRjtZQUVEQSxzQkFBSUEsZ0JBQUNBLENBQUVBO3FCQUFQQSxVQUFRQSxLQUFLQTtvQkFDWEUsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZEQSxDQUFDQTs7O2VBQUFGO1lBRURBLHNCQUFJQSxnQkFBQ0EsQ0FBRUE7cUJBQVBBO29CQUNFRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkJBLENBQUNBOzs7ZUFBQUg7WUFFREEsc0JBQUlBLGdCQUFDQSxDQUFFQTtxQkFBUEEsVUFBUUEsS0FBS0E7b0JBQ1hHLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2REEsQ0FBQ0E7OztlQUFBSDtZQUVEQSxzQkFBSUEsZ0JBQUNBLENBQUVBO3FCQUFQQTtvQkFDRUksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZCQSxDQUFDQTs7O2VBQUFKO1lBRURBLHNCQUFJQSxnQkFBQ0EsQ0FBRUE7cUJBQVBBLFVBQVFBLEtBQUtBO29CQUNYSSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkRBLENBQUNBOzs7ZUFBQUo7WUFFREEsc0JBQUlBLGdCQUFDQSxDQUFFQTtxQkFBUEE7b0JBQ0VLLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsQ0FBQ0E7OztlQUFBTDtZQUVEQSxzQkFBSUEscUJBQUdBO3FCQUFQQTtvQkFDRU0sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hCQSxDQUFDQTtxQkFFRE4sVUFBUUEsS0FBS0E7b0JBQ1hNLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO2dCQUNqQkEsQ0FBQ0E7OztlQUpBTjtZQU1EQSxzQkFBSUEsdUJBQUtBO3FCQUFUQTtvQkFDRU8sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hCQSxDQUFDQTtxQkFFRFAsVUFBVUEsS0FBS0E7b0JBQ2JPLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO2dCQUNqQkEsQ0FBQ0E7OztlQUpBUDtZQU1EQSxzQkFBSUEsc0JBQUlBO3FCQUFSQTtvQkFDRVEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hCQSxDQUFDQTtxQkFFRFIsVUFBU0EsS0FBS0E7b0JBQ1pRLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO2dCQUNqQkEsQ0FBQ0E7OztlQUpBUjtZQU1EQSxzQkFBSUEsc0JBQUlBO3FCQUFSQTtvQkFDRVMsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hCQSxDQUFDQTtxQkFFRFQsVUFBU0EsS0FBS0E7b0JBQ1pTLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO2dCQUNqQkEsQ0FBQ0E7OztlQUpBVDtZQU1EQSxzQkFBSUEsc0JBQUlBO3FCQUFSQTtvQkFDRVUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hCQSxDQUFDQTtxQkFFRFYsVUFBU0EsS0FBS0E7b0JBQ1pVLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO2dCQUNqQkEsQ0FBQ0E7OztlQUpBVjtZQU1EQSxzQkFBSUEsZ0JBQUNBLENBQUVBO3FCQUFQQSxVQUFRQSxLQUFLQTtvQkFDWEssSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BEQSxDQUFDQTs7O2VBQUFMO1lBRURBLHNCQUFXQSxjQUFNQTtxQkFBakJBO29CQUNFVyxJQUFJQSxHQUFHQSxHQUFLQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbERBLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBO29CQUNsREEsSUFBSUEsSUFBSUEsR0FBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xEQSxJQUFJQSxJQUFJQSxHQUFJQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDNUNBLE1BQU1BLENBQUNBLElBQUlBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO2dCQUMxQ0EsQ0FBQ0E7OztlQUFBWDtZQUVIQSxXQUFDQTtRQUFEQSxDQWxGQTdOLEFBa0ZDNk4sRUFsRnlCN04sT0FBSUEsQ0FBQ0EsT0FBT0EsRUFrRnJDQTtRQWxGWUEsYUFBSUEsT0FrRmhCQSxDQUFBQTtJQUVIQSxDQUFDQSxFQXRGU3BELFFBQVFBLEdBQVJBLFdBQVFBLEtBQVJBLFdBQVFBLFFBc0ZqQkE7QUFBREEsQ0FBQ0EsRUF0Rk0sRUFBRSxLQUFGLEVBQUUsUUFzRlI7QUN0RkQsb0NBQW9DO0FBRXBDLElBQU8sRUFBRSxDQTJCUjtBQTNCRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsUUFBUUEsQ0EyQmpCQTtJQTNCU0EsV0FBQUEsUUFBUUEsRUFBQ0EsQ0FBQ0E7UUFFbEJvRDtZQUFpQ3lPLCtCQUFNQTtZQUlyQ0EscUJBQVlBLEtBQWFBLEVBQUVBLE1BQWNBO2dCQUN2Q0Msa0JBQU1BLEtBQUtBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO2dCQUNyQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBMEJBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2dCQUNsRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2RBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0E7Z0JBQzFEQSxDQUFDQTtnQkFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2RBLE1BQU1BLElBQUlBLEtBQUtBLENBQUNBLHFDQUFxQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pEQSxDQUFDQTtZQUNIQSxDQUFDQTtZQUVERCxzQkFBSUEsMkJBQUVBO3FCQUFOQTtvQkFDRUUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7Z0JBQ2xCQSxDQUFDQTs7O2VBQUFGO1lBRURBLDRCQUFNQSxHQUFOQSxVQUFPQSxNQUFvQkE7Z0JBQ3pCRyxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUMxQkEsQ0FBQ0E7WUFFSEgsa0JBQUNBO1FBQURBLENBdkJBek8sQUF1QkN5TyxFQXZCZ0N6TyxlQUFNQSxFQXVCdENBO1FBdkJZQSxvQkFBV0EsY0F1QnZCQSxDQUFBQTtJQUVIQSxDQUFDQSxFQTNCU3BELFFBQVFBLEdBQVJBLFdBQVFBLEtBQVJBLFdBQVFBLFFBMkJqQkE7QUFBREEsQ0FBQ0EsRUEzQk0sRUFBRSxLQUFGLEVBQUUsUUEyQlI7QUM3QkQsSUFBTyxFQUFFLENBb0ZSO0FBcEZELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxJQUFJQSxDQW9GYkE7SUFwRlNBLFdBQUFBLElBQUlBLEVBQUNBLENBQUNBO1FBRWQ4RDtZQUlFbU87Z0JBQ0VDLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQzFEQSxDQUFDQTtZQUVERCxzQkFBSUEsMEJBQUtBO3FCQUFUQTtvQkFDRUUsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLENBQUNBOzs7ZUFBQUY7WUFFREEsc0JBQUlBLDJCQUFNQTtxQkFBVkE7b0JBQ0VHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBO2dCQUNwQkEsQ0FBQ0E7OztlQUFBSDtZQUVEQSxzQkFBSUEseUJBQUlBO3FCQUFSQTtvQkFDRUksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQTs7O2VBQUFKO1lBRURBLHNCQUFHQSxtQkFBQ0EsR0FBSUE7cUJBQVJBO29CQUNFSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkJBLENBQUNBOzs7ZUFBQUw7WUFFREEsc0JBQUdBLG1CQUFDQSxHQUFJQTtxQkFBUkEsVUFBU0EsS0FBS0E7b0JBQ1pLLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO2dCQUN4QkEsQ0FBQ0E7OztlQUFBTDtZQUVEQSxzQkFBR0EsbUJBQUNBLEdBQUlBO3FCQUFSQTtvQkFDRU0sTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZCQSxDQUFDQTs7O2VBQUFOO1lBRURBLHNCQUFHQSxtQkFBQ0EsR0FBSUE7cUJBQVJBLFVBQVNBLEtBQUtBO29CQUNaTSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtnQkFDeEJBLENBQUNBOzs7ZUFBQU47WUFFREEsc0JBQUdBLG1CQUFDQSxHQUFJQTtxQkFBUkE7b0JBQ0VPLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsQ0FBQ0E7OztlQUFBUDtZQUVEQSxzQkFBR0EsbUJBQUNBLEdBQUlBO3FCQUFSQSxVQUFTQSxLQUFLQTtvQkFDWk8sSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQ3hCQSxDQUFDQTs7O2VBQUFQO1lBRURBLHNCQUFHQSxtQkFBQ0EsR0FBSUE7cUJBQVJBO29CQUNFUSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkJBLENBQUNBOzs7ZUFBQVI7WUFFREEsc0JBQUdBLG1CQUFDQSxHQUFJQTtxQkFBUkEsVUFBU0EsS0FBS0E7b0JBQ1pRLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO2dCQUN4QkEsQ0FBQ0E7OztlQUFBUjtZQUVEQSxvQkFBRUEsR0FBRkEsVUFBR0EsQ0FBUUEsRUFBRUEsQ0FBU0E7Z0JBQ3BCUyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzREEsQ0FBQ0E7WUFFRFQscUJBQUdBLEdBQUhBLFVBQUlBLENBQVFBLEVBQUVBLENBQVNBLEVBQUVBLEtBQVlBO2dCQUNuQ1UsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7WUFDNURBLENBQUNBO1lBRURWLDBCQUFRQSxHQUFSQSxVQUFTQSxHQUFXQTtnQkFDbEJXLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO2dCQUN0Q0EsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2xCQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDakJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLE1BQU1BLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO29CQUNoQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2RBLENBQUNBO2dCQUNEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUVEWCx3QkFBTUEsR0FBTkEsVUFBT0EsR0FBV0E7Z0JBQ2hCWSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUM1QkEsQ0FBQ0E7WUFFRFosc0JBQVdBLG1CQUFRQTtxQkFBbkJBO29CQUNFYSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxPQUFPQSxFQUFFQSxDQUFDQTtvQkFDeEJBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNwQkEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7Z0JBQ2JBLENBQUNBOzs7ZUFBQWI7WUFFSEEsY0FBQ0E7UUFBREEsQ0FoRkFuTyxBQWdGQ21PLElBQUFuTztRQWhGWUEsWUFBT0EsVUFnRm5CQSxDQUFBQTtJQUVIQSxDQUFDQSxFQXBGUzlELElBQUlBLEdBQUpBLE9BQUlBLEtBQUpBLE9BQUlBLFFBb0ZiQTtBQUFEQSxDQUFDQSxFQXBGTSxFQUFFLEtBQUYsRUFBRSxRQW9GUjtBQ3BGRCxxQ0FBcUM7QUFFckMsSUFBTyxFQUFFLENBc0hSO0FBdEhELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxJQUFJQSxDQXNIYkE7SUF0SFNBLFdBQUFBLElBQUlBLEVBQUNBLENBQUNBO1FBRWQ4RDtZQUE2QmlQLDJCQUFPQTtZQUFwQ0E7Z0JBQTZCQyw4QkFBT0E7WUFrSHBDQSxDQUFDQTtZQWhIQ0Qsc0JBQUdBLG1CQUFDQSxHQUFJQTtxQkFBUkE7b0JBQ0VFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsQ0FBQ0E7OztlQUFBRjtZQUVEQSxzQkFBR0EsbUJBQUNBLEdBQUlBO3FCQUFSQSxVQUFTQSxLQUFLQTtvQkFDWkUsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQ3hCQSxDQUFDQTs7O2VBQUFGO1lBRURBLHNCQUFHQSxtQkFBQ0EsR0FBSUE7cUJBQVJBO29CQUNFRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkJBLENBQUNBOzs7ZUFBQUg7WUFFREEsc0JBQUdBLG1CQUFDQSxHQUFJQTtxQkFBUkEsVUFBU0EsS0FBS0E7b0JBQ1pHLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO2dCQUN4QkEsQ0FBQ0E7OztlQUFBSDtZQUVEQSxzQkFBR0EsbUJBQUNBLEdBQUlBO3FCQUFSQTtvQkFDRUksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZCQSxDQUFDQTs7O2VBQUFKO1lBRURBLHNCQUFHQSxtQkFBQ0EsR0FBSUE7cUJBQVJBLFVBQVNBLEtBQUtBO29CQUNaSSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtnQkFDeEJBLENBQUNBOzs7ZUFBQUo7WUFFREEsc0JBQUdBLG1CQUFDQSxHQUFJQTtxQkFBUkE7b0JBQ0VLLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsQ0FBQ0E7OztlQUFBTDtZQUVEQSxzQkFBR0EsbUJBQUNBLEdBQUlBO3FCQUFSQSxVQUFTQSxLQUFLQTtvQkFDWkssSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQ3hCQSxDQUFDQTs7O2VBQUFMO1lBRURBLHFCQUFHQSxHQUFIQSxVQUFJQSxLQUFhQTtnQkFDZk0sSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2xCQSxJQUFJQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDbkJBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2Q0EsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZDQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2Q0EsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZDQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN6Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3pDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDekNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN6Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3pDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDekNB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QSxFQUFFQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUMxREEsQ0FBQ0E7WUFFRGpCLHdCQUFNQSxHQUFOQSxVQUFPQSxJQUFhQSxFQUFFQSxFQUFXQSxFQUFFQSxFQUFXQTtnQkFDNUNrQixJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtnQkFDdkJBLElBQUlBLEtBQUtBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBO2dCQUNwQ0EsSUFBSUEsS0FBS0EsR0FBR0EsRUFBRUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BDQSxJQUFJQSxLQUFLQSxHQUFHQSxLQUFLQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtnQkFDdkNBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLEVBQUVBLEdBQUdBLEtBQUtBLENBQUNBLElBQUlBLEVBQUVBLEVBQUVBLEdBQUdBLEtBQUtBLENBQUNBLElBQUlBLEVBQUVBLEVBQUVBLEdBQUdBLEtBQUtBLENBQUNBLElBQUlBLEVBQUVBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBO2dCQUNwRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZEQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQTtnQkFDdkRBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUN2REEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUVEbEIsMkJBQVNBLEdBQVRBLFVBQVVBLENBQVFBLEVBQUVBLENBQVFBLEVBQUVBLENBQUdBO2dCQUFIbUIsaUJBQUdBLEdBQUhBLEtBQUdBO2dCQUMvQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaERBLENBQUNBO1lBRURuQix3QkFBTUEsR0FBTkEsVUFBT0EsS0FBWUE7Z0JBQ2pCb0IsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDN0JBLENBQUNBO1lBRURwQix5QkFBT0EsR0FBUEEsVUFBUUEsS0FBWUE7Z0JBQ2xCcUIsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLENBQUNBO1lBRURyQix5QkFBT0EsR0FBUEEsVUFBUUEsS0FBWUE7Z0JBQ2xCc0IsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLENBQUNBO1lBRUR0Qix5QkFBT0EsR0FBUEEsVUFBUUEsS0FBWUE7Z0JBQ2xCdUIsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLENBQUNBO1lBRUR2Qix1QkFBS0EsR0FBTEEsVUFBTUEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsQ0FBR0E7Z0JBQUhnQixpQkFBR0EsR0FBSEEsS0FBR0E7Z0JBQzNCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQ0EsQ0FBQ0E7WUFFRGhCLHFCQUFHQSxHQUFIQSxVQUFJQSxLQUFhQTtnQkFDZndCLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO2dCQUNsQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ25CQSxJQUFJQSxHQUFHQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNsREEsR0FBR0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDbERBLEdBQUdBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQ2xEQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDdkRBLElBQUlBLEdBQUdBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQ2xEQSxHQUFHQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNsREEsR0FBR0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFDbERBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO2dCQUV2REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3REQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDdERBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN0REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3REQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDdERBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN0REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3REQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDdERBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN0REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3REQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDdERBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN0REEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3REQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDdERBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN0REEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3REQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUVEeEIseUJBQU9BLEdBQVBBO2dCQUNFeUIsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2xCQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkRBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNuREEsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3JEQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDdkRBLElBQUlBLEVBQUVBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEVBQUVBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEVBQUVBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEVBQUVBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN2RUEsSUFBSUEsRUFBRUEsR0FBSUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsRUFBRUEsR0FBSUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsRUFBRUEsR0FBSUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsRUFBRUEsR0FBSUEsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3ZFQSxJQUFJQSxFQUFFQSxHQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxFQUFFQSxHQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDdkVBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN2RUEsSUFBSUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3ZFQSxJQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFFdkVBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBO29CQUNyQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3JDQSxJQUFJQSxFQUFFQSxHQUFHQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQTtvQkFDckNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNyQ0EsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7b0JBQ3RDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDdENBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO29CQUN0Q0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRXRDQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFFMURBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUMvREEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xGQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbEZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUNwRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BGQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDeEZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUN4RkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hGQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDeEZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUN4RkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hGQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxH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cmFtZTogKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSA9PiB2b2lkID0gKGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAoPGFueT53aW5kb3cpLndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICg8YW55PndpbmRvdykubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgKDxhbnk+d2luZG93KS5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgZnVuY3Rpb24oY2FsbGJhY2spe1xyXG4gICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XHJcbiAgfTtcclxufSkoKTtcclxuIiwibW9kdWxlIG5lIHtcclxuXHJcbiAgZXhwb3J0IHZhciBXRUJHTCAgICA9IDE7XHJcbiAgZXhwb3J0IHZhciBDQU5WQVMyRCA9IDI7XHJcblxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgR2FtZU9wdGlvbnMge1xyXG4gICAgbW9kZT86IG51bWJlcjtcclxuICAgIHdpZHRoPzogbnVtYmVyO1xyXG4gICAgaGVpZ2h0PzogbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIExvYWRTY2VuZSBleHRlbmRzIHNjZW5lLlNjZW5lIHtcclxuXHJcbiAgfVxyXG5cclxuICBleHBvcnQgY2xhc3MgR2FtZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlQmluZCAgIDogKGRlbHRhOiBudW1iZXIpID0+IGFueTtcclxuICAgIHByaXZhdGUgX3NjZW5lTWFuYWdlciA6IHNjZW5lLlNjZW5lTWFuYWdlcjtcclxuICAgIHByaXZhdGUgX3JlbmRlciAgICAgICA6IGdyYXBoaWNzLlJlbmRlcjtcclxuICAgIHByaXZhdGUgX3RpbWUgICAgICAgICA6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih7IHdpZHRoOiB3aWR0aCA9IDQ4MCwgaGVpZ2h0OiBoZWlnaHQgPSAzMjAsXHJcbiAgICAgICAgICAgICAgICAgIG1vZGU6IG1vZGUgPSBuZS5XRUJHTCxcclxuICAgICAgICAgICAgICAgICAgbG9hZFNjZW5lOiBsb2FkU2NlbmUgPSBMb2FkU2NlbmUgfSkge1xyXG4gICAgICB0aGlzLl9zY2VuZU1hbmFnZXIgPSBuZXcgbmUuc2NlbmUuU2NlbmVNYW5hZ2VyKGxvYWRTY2VuZSk7XHJcbiAgICAgIHRoaXMuY3JlYXRlUmVuZGVyKHsgd2lkdGgsIGhlaWdodCwgbW9kZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVSZW5kZXIob3B0aW9ucyA6IEdhbWVPcHRpb25zKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLm1vZGUgPT09IFdFQkdMKSB7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyID0gbmV3IGdyYXBoaWNzLldlYkdMUmVuZGVyKG9wdGlvbnMud2lkdGgsIG9wdGlvbnMuaGVpZ2h0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9yZW5kZXIgPSBuZXcgZ3JhcGhpY3MuQ2FudmFzMkRSZW5kZXIob3B0aW9ucy53aWR0aCwgb3B0aW9ucy5oZWlnaHQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoc2NlbmU6IHNjZW5lLlNjZW5lQ2xhc3MpIHtcclxuICAgICAgdGhpcy5fdGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICB0aGlzLl91cGRhdGVCaW5kID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy5fc2NlbmVNYW5hZ2VyLmdvdG8oc2NlbmUpO1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fdXBkYXRlQmluZCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKHRpbWVzdGFtcDogbnVtYmVyKSB7XHJcbiAgICAgIHZhciBkZWx0YSA9IHRpbWVzdGFtcCAtIHRoaXMuX3RpbWU7XHJcbiAgICAgIHRoaXMuX3JlbmRlci5yZW5kZXIodGhpcy5fc2NlbmVNYW5hZ2VyLmluc3RhbmNlKVxyXG4gICAgICB0aGlzLl9zY2VuZU1hbmFnZXIudXBkYXRlKGRlbHRhKTtcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZUJpbmQpO1xyXG4gICAgICB0aGlzLl90aW1lID0gdGltZXN0YW1wO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2aWV3KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVuZGVyLmNhbnZhcztcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUuYXVkaW8ge1xyXG5cclxuICBleHBvcnQgY2xhc3MgQnVmZmVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBzdHJlYW0oKTogU3RyZWFtIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxlbmd0aCgpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vQnVmZmVyLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBuZS5hdWRpbyB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBMZWdhY3lCdWZmZXIgZXh0ZW5kcyBCdWZmZXIge1xyXG5cclxuICAgIHByaXZhdGUgX3RhZyA6IEhUTUxBdWRpb0VsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IodGFnOiBIVE1MQXVkaW9FbGVtZW50KSB7XHJcbiAgICAgIHN1cGVyKCk7XHJcbiAgICAgIHRoaXMuX3RhZyA9IHRhZztcclxuICAgIH1cclxuXHJcbiAgICBzdHJlYW0oKTogU3RyZWFtIHtcclxuICAgICAgcmV0dXJuIG5ldyBMZWdhY3lTdHJlYW0odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxlbmd0aCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3RhZy5kdXJhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3JjKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fdGFnO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIm1vZHVsZSBuZS5hdWRpbyB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBTdHJlYW0ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXkobG9vcD1mYWxzZSkge1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2UoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBvc2l0aW9uKCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcG9zaXRpb24odmFsdWUpIHtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbG9vcFN0YXJ0KCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbG9vcFN0YXJ0KHZhbHVlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxvb3BFbmQoKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBsb29wRW5kKHZhbHVlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBsYXliYWNrUmF0ZSgpIHtcclxuICAgICAgcmV0dXJuIDE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBsYXliYWNrUmF0ZSh2YWx1ZSkge1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL1N0cmVhbS50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUuYXVkaW8ge1xyXG5cclxuICBleHBvcnQgY2xhc3MgTGVnYWN5U3RyZWFtIGV4dGVuZHMgU3RyZWFtIHtcclxuXHJcbiAgICBwcml2YXRlIF9idWZmZXIgOiBMZWdhY3lCdWZmZXI7XHJcbiAgICBwcml2YXRlIF90YWcgICAgOiBIVE1MQXVkaW9FbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJ1ZmZlciA6IExlZ2FjeUJ1ZmZlcikge1xyXG4gICAgICBzdXBlcigpO1xyXG4gICAgICB0aGlzLl9idWZmZXIgID0gYnVmZmVyO1xyXG4gICAgICB0aGlzLl90YWcgICAgID0gPEhUTUxBdWRpb0VsZW1lbnQ+YnVmZmVyLnNyYy5jbG9uZU5vZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5KGxvb3A9ZmFsc2UpIHtcclxuICAgICAgdGhpcy5fdGFnLmxvb3AgPSBsb29wO1xyXG4gICAgICB0aGlzLl90YWcucGxheSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKSB7XHJcbiAgICAgIHRoaXMuX3RhZy5wYXVzZSgpO1xyXG4gICAgICB0aGlzLl90YWcuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICB0aGlzLl90YWcucGF1c2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcG9zaXRpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl90YWcuY3VycmVudFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBvc2l0aW9uKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3RhZy5jdXJyZW50VGltZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5YmFja1JhdGUoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl90YWcucGxheWJhY2tSYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwbGF5YmFja1JhdGUodmFsdWUpIHtcclxuICAgICAgdGhpcy5fdGFnLnBsYXliYWNrUmF0ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0J1ZmZlci50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUuYXVkaW8ge1xyXG5cclxuXHJcblxyXG4gIGV4cG9ydCBjbGFzcyBXZWJBdWRpb0J1ZmZlciBleHRlbmRzIEJ1ZmZlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29udGV4dCAgOiBBdWRpb0NvbnRleHQ7XHJcbiAgICBwcml2YXRlIF9idWZmZXIgICA6IEF1ZGlvQnVmZmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6IEF1ZGlvQ29udGV4dCwgYnVmZmVyIDogQXVkaW9CdWZmZXIpIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICAgIHRoaXMuX2J1ZmZlciAgPSBidWZmZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNyYygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlcjtcclxuICAgIH1cclxuXHJcbiAgICBzdHJlYW0oKSB7XHJcbiAgICAgIHJldHVybiBuZXcgV2ViQXVkaW9TdHJlYW0odGhpcy5fY29udGV4dCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxlbmd0aCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlci5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vU3RyZWFtLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBuZS5hdWRpbyB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBXZWJBdWRpb1N0cmVhbSBleHRlbmRzIFN0cmVhbSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29udGV4dCAgICAgIDogQXVkaW9Db250ZXh0O1xyXG4gICAgcHJpdmF0ZSBfc291cmNlICAgICAgIDogQXVkaW9CdWZmZXJTb3VyY2VOb2RlO1xyXG4gICAgcHJpdmF0ZSBfcG9zaXRpb24gICAgIDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfcGxheVBvc2l0aW9uIDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfcGxheVRpbWUgICAgIDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfYnVmZmVyICAgICAgIDogV2ViQXVkaW9CdWZmZXI7XHJcbiAgICBwcml2YXRlIF9wbGF5YmFja1JhdGUgOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29udGV4dDpBdWRpb0NvbnRleHQsIGJ1ZmZlciA6IFdlYkF1ZGlvQnVmZmVyKSB7XHJcbiAgICAgIHN1cGVyKCk7XHJcbiAgICAgIHRoaXMuX2NvbnRleHQgICAgICA9IGNvbnRleHQ7XHJcbiAgICAgIHRoaXMuX3NvdXJjZSAgICAgICA9IG51bGw7XHJcbiAgICAgIHRoaXMuX3Bvc2l0aW9uICAgICA9IDA7XHJcbiAgICAgIHRoaXMuX3BsYXlUaW1lICAgICA9IDA7XHJcbiAgICAgIHRoaXMuX2J1ZmZlciAgICAgICA9IGJ1ZmZlcjtcclxuICAgICAgdGhpcy5fcGxheVBvc2l0aW9uID0gbnVsbDtcclxuICAgICAgdGhpcy5fcGxheWJhY2tSYXRlID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5KGxvb3A9ZmFsc2UpIHtcclxuICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICB0aGlzLl9jcmVhdGVTb3VyY2UobG9vcCk7XHJcbiAgICAgIHRoaXMuX3BsYXlUaW1lICAgICA9IERhdGUubm93KCk7XHJcbiAgICAgIHRoaXMuX3BsYXlQb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uO1xyXG4gICAgICB0aGlzLl9zb3VyY2Uuc3RhcnQoMCwgdGhpcy5fcG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NyZWF0ZVNvdXJjZShsb29wOmJvb2xlYW4pIHtcclxuICAgICAgdGhpcy5fc291cmNlID0gdGhpcy5fY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgICAgdGhpcy5fc291cmNlLmJ1ZmZlciA9IHRoaXMuX2J1ZmZlci5zcmM7XHJcbiAgICAgIHRoaXMuX3NvdXJjZS5sb29wID0gbG9vcDtcclxuICAgICAgdGhpcy5fc291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZSA9IHRoaXMuX3BsYXliYWNrUmF0ZTtcclxuICAgICAgdGhpcy5fc291cmNlLmNvbm5lY3QodGhpcy5fY29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcCgpIHtcclxuICAgICAgaWYgKHRoaXMuX3BsYXlQb3NpdGlvbiA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICB0aGlzLl9zb3VyY2Uuc3RvcCgpO1xyXG4gICAgICB0aGlzLl9zb3VyY2UuZGlzY29ubmVjdCgpO1xyXG4gICAgICB0aGlzLl9wb3NpdGlvbiA9IDA7XHJcbiAgICAgIHRoaXMuX3BsYXlQb3NpdGlvbiA9IG51bGw7XHJcbiAgICAgIHRoaXMuX3NvdXJjZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgIGlmICh0aGlzLl9wbGF5UG9zaXRpb24gPT09IG51bGwpIHJldHVybjtcclxuICAgICAgdGhpcy5fc291cmNlLnN0b3AoKTtcclxuICAgICAgdGhpcy5fc2V0Q3VycmVudFBvc2l0aW9uKCk7XHJcbiAgICAgIHRoaXMuX3NvdXJjZS5kaXNjb25uZWN0KCk7XHJcbiAgICAgIHRoaXMuX3BsYXlQb3NpdGlvbiA9IG51bGw7XHJcbiAgICAgIHRoaXMuX3NvdXJjZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2V0Q3VycmVudFBvc2l0aW9uKCkge1xyXG4gICAgICB2YXIgcGJyID0gdGhpcy5fc291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZSAvIHRoaXMuX3NvdXJjZS5wbGF5YmFja1JhdGUuZGVmYXVsdFZhbHVlO1xyXG4gICAgICB2YXIgZCA9IChEYXRlLm5vdygpIC0gdGhpcy5fcGxheVRpbWUpICogcGJyICsgdGhpcy5fcGxheVBvc2l0aW9uO1xyXG4gICAgICB2YXIgdCA9IE1hdGgubWF4KDEsIHRoaXMubG9vcEVuZCAtIHRoaXMubG9vcFN0YXJ0KTtcclxuICAgICAgdGhpcy5fcG9zaXRpb24gPSB0aGlzLmxvb3BTdGFydCArIGQgJSB0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb250ZXh0KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcG9zaXRpb24oKSB7XHJcbiAgICAgIGlmICh0aGlzLl9wbGF5UG9zaXRpb24gIT09IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9zZXRDdXJyZW50UG9zaXRpb24oKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBvc2l0aW9uKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdmFsdWU7XHJcbiAgICAgIGlmICh0aGlzLl9wbGF5UG9zaXRpb24gIT09IG51bGwpIHtcclxuICAgICAgICB2YXIgbG9vcCA9IHRoaXMuX3NvdXJjZS5sb29wO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZS5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy5fc291cmNlLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB0aGlzLnBsYXkobG9vcCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbG9vcFN0YXJ0KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fc291cmNlLmxvb3BTdGFydDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbG9vcFN0YXJ0KHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3NvdXJjZS5sb29wU3RhcnQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbG9vcEVuZCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZS5sb29wRW5kO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBsb29wRW5kKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3NvdXJjZS5sb29wRW5kID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBsYXliYWNrUmF0ZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3BsYXliYWNrUmF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcGxheWJhY2tSYXRlKHZhbHVlKSB7XHJcbiAgICAgIGlmICh0aGlzLl9zb3VyY2UpIHtcclxuICAgICAgICB0aGlzLl9zb3VyY2UucGxheWJhY2tSYXRlLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fcGxheWJhY2tSYXRlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLmdyYXBoaWNzIHtcclxuXHJcbiAgZXhwb3J0IGludGVyZmFjZSBSZW5kZXJPYmplY3Qge1xyXG4gICAgcmVuZGVyKGdsIDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KTtcclxuICAgIHJlbmRlcjJkPyhjdHggOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIFJlbmRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2FudmFzIDogSFRNTENhbnZhc0VsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICB0aGlzLl9jYW52YXMud2lkdGggID0gd2lkdGg7XHJcbiAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNhbnZhcygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2lkdGgoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jYW52YXMud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhlaWdodCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcy5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzaXplKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihvYmplY3Q6IFJlbmRlck9iamVjdCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9SZW5kZXIudHNcIiAvPlxyXG5cclxubW9kdWxlIG5lLmdyYXBoaWNzIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIENhbnZhczJEUmVuZGVyIGV4dGVuZHMgUmVuZGVyIHtcclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUubWF0aCB7XHJcblxyXG4gIC8vIG4gLT4gW2FdIC0+IFtbYV1dXHJcbiAgIGV4cG9ydCBmdW5jdGlvbiBjb21iaW5hdG9yKG46IG51bWJlciwgbHN0IDogU3RyaW5nW10pOiBTdHJpbmdbXVtdIHtcclxuICAgICByZXR1cm4gbiA/IChcclxuICAgICAgIGxzdC5sZW5ndGggPyBjb21iaW5hdG9yKG4gLSAxLCBsc3QpLm1hcChmdW5jdGlvbiAodCkge1xyXG4gICAgICAgICByZXR1cm4gW2xzdFswXV0uY29uY2F0KHQpO1xyXG4gICAgICAgfSkuY29uY2F0KGNvbWJpbmF0b3IobiwgbHN0LnNsaWNlKDEpKSkgOiBbXVxyXG4gICAgICkgOiBbW11dO1xyXG4gICB9O1xyXG5cclxuICAgLy8gSWYgbmVlZGVkLCB3ZSBjYW4gZGVyaXZlIGEgc2lnbmlmaWNhbnRseSBmYXN0ZXIgdmVyc2lvbiBvZlxyXG4gICAvLyB0aGUgc2ltcGxlIHJlY3Vyc2l2ZSBmdW5jdGlvbiBhYm92ZSBieSBtZW1vaXppbmcgaXRcclxuXHJcbiAgIC8vIGYgLT4gZlxyXG4gICBmdW5jdGlvbiBtZW1vaXplZChmbikge1xyXG4gICAgIHZhciBtID0ge307XHJcbiAgICAgcmV0dXJuIGZ1bmN0aW9uICh4KSB7XHJcbiAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSxcclxuICAgICAgICAgc3RyS2V5ID0gYXJncy5qb2luKCctJyk7XHJcblxyXG4gICAgICAgdmFyIHYgPSBtW3N0cktleV07XHJcbiAgICAgICBpZiAoJ3UnID09PSAodHlwZW9mIHYpWzBdKVxyXG4gICAgICAgICBtW3N0cktleV0gPSB2ID0gZm4uYXBwbHkobnVsbCwgYXJncyk7XHJcbiAgICAgICByZXR1cm4gdjtcclxuICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIC8vIFttLi5uXVxyXG4gICBmdW5jdGlvbiByYW5nZShtLCBuKSB7XHJcbiAgICAgcmV0dXJuIEFycmF5LmFwcGx5KG51bGwsIEFycmF5KG4gLSBtICsgMSkpLm1hcChmdW5jdGlvbiAoeCwgaSkge1xyXG4gICAgICAgcmV0dXJuIG0gKyBpO1xyXG4gICAgIH0pO1xyXG4gICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2NvbWJpbmF0b3IudHNcIiAvPlxyXG5cclxubW9kdWxlIG5lLm1hdGgge1xyXG5cclxuICBmdW5jdGlvbiBtYWtlUHJvcGVydHlBY2Nlc3NvcihzbGljZTogU3RyaW5nW10pIHtcclxuICAgIHZhciBsZW5ndGggPSBzbGljZS5sZW5ndGg7XHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG1hcDogQXJyYXk8bnVtYmVyPiA9IHNsaWNlLm1hcCggKGkpID0+IHRoaXNbPHN0cmluZz5pXSApO1xyXG4gICAgICAgIHJldHVybiBuZXcgbmUubWF0aC5WZWN0b3I0KG1hcFswXSwgbWFwWzFdLCBtYXBbMl0gfHwgMCwgbWFwWzNdIHx8IDAgKTtcclxuICAgICAgfSxcclxuXHJcbiAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgKytpbmRleCkge1xyXG4gICAgICAgICAgbGV0IHAgPSBzbGljZVtpbmRleF07XHJcbiAgICAgICAgICB0aGlzWzxzdHJpbmc+cF0gPSB2YWx1ZVtpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbWFrZVByb3BlcnRpZXNPZlNpemUocmVzdWx0OiBQcm9wZXJ0eURlc2NyaXB0b3JNYXAsIHBlcm11dGF0aW9uczogU3RyaW5nW11bXSwgbGVuZ3RoKSB7XHJcbiAgICBwZXJtdXRhdGlvbnMuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICB2YXIgc2xpY2UgPSBpLnNsaWNlKDAsIGxlbmd0aCArIDEpO1xyXG4gICAgICB2YXIgbmFtZSA9IHNsaWNlLmpvaW4oJycpO1xyXG4gICAgICBpZiAodHlwZW9mIHJlc3VsdFtuYW1lXSA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJlc3VsdFtuYW1lXSA9IG1ha2VQcm9wZXJ0eUFjY2Vzc29yKHNsaWNlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBtYWtlUHJvcGVydGllcyhwcm9wZXJ0aWVzOiBTdHJpbmdbXSk6IFByb3BlcnR5RGVzY3JpcHRvck1hcCB7XHJcbiAgICB2YXIgcmVzdWx0OiBQcm9wZXJ0eURlc2NyaXB0b3JNYXAgPSB7fTtcclxuICAgIC8vdmFyIHBlcm11dGF0aW9ucyA9IHBlcm11dGF0b3IocHJvcGVydGllcyk7XHJcbiAgICB2YXIgcGVybXV0YXRpb25zID0gY29tYmluYXRvcihwcm9wZXJ0aWVzLmxlbmd0aCwgcHJvcGVydGllcyk7XHJcbiAgICBmb3IgKHZhciBsZW5ndGggPSAxOyBsZW5ndGggPD0gcHJvcGVydGllcy5sZW5ndGg7ICsrbGVuZ3RoKSB7XHJcbiAgICAgIG1ha2VQcm9wZXJ0aWVzT2ZTaXplKHJlc3VsdCwgcGVybXV0YXRpb25zLCBsZW5ndGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gdmVjdG9yRmllbGRzKG9iamVjdDogYW55LCAuLi5wcm9wZXJ0aWVzOiBTdHJpbmdbXSkge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMob2JqZWN0LCBtYWtlUHJvcGVydGllcyhwcm9wZXJ0aWVzKSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUubWF0aCB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBWZWN0b3Ige1xyXG5cclxuICAgIHByb3RlY3RlZCBfZGF0YTogRmxvYXQzMkFycmF5O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgICAgdGhpcy5fZGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5sZW5ndGgpO1xyXG4gICAgICB0aGlzWzBdID0geDtcclxuICAgICAgdGhpc1sxXSA9IHk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgICAgICBnZXQgbGVuZ3RoKCkge1xyXG4gICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgZGF0YSgpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IFswXSgpOm51bWJlciB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBbMF0odmFsdWU6bnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzLl9kYXRhWzBdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgWzFdKCk6bnVtYmVyIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhWzFdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IFsxXSh2YWx1ZTpudW1iZXIpIHtcclxuICAgICAgICAgIHRoaXMuX2RhdGFbMV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBbMl0oKTpudW1iZXIge1xyXG4gICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgWzJdKHZhbHVlOm51bWJlcikge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBbM10oKTpudW1iZXIge1xyXG4gICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgWzNdKHZhbHVlOm51bWJlcikge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB4KCk6bnVtYmVyIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHgodmFsdWU6bnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzWzBdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgcigpOm51bWJlciB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpc1swXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCByKHZhbHVlOm51bWJlcikge1xyXG4gICAgICAgICAgdGhpc1swXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHkoKTpudW1iZXIge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXNbMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgeSh2YWx1ZTpudW1iZXIpIHtcclxuICAgICAgICAgIHRoaXNbMV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBnKCk6bnVtYmVyIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzWzFdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGcodmFsdWU6bnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzWzFdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgeigpOm51bWJlciB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpc1syXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCB6KHZhbHVlOm51bWJlcikge1xyXG4gICAgICAgICAgdGhpc1syXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGIoKTpudW1iZXIge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXNbMl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYih2YWx1ZTpudW1iZXIpIHtcclxuICAgICAgICAgIHRoaXNbMl0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB3KCk6bnVtYmVyIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzWzNdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHcodmFsdWU6bnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzWzNdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgYSgpOm51bWJlciB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpc1szXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBhKHZhbHVlOm51bWJlcikge1xyXG4gICAgICAgICAgdGhpc1szXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHMoKTpudW1iZXIge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXNbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgcyh2YWx1ZTpudW1iZXIpIHtcclxuICAgICAgICAgIHRoaXNbMF0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB1KCk6bnVtYmVyIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHUodmFsdWU6bnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzWzBdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdCgpOm51bWJlciB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpc1sxXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCB0KHZhbHVlOm51bWJlcikge1xyXG4gICAgICAgICAgdGhpc1sxXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHYoKTpudW1iZXIge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXNbMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgdih2YWx1ZTpudW1iZXIpIHtcclxuICAgICAgICAgIHRoaXNbMV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBwKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXNbMl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgcCh2YWx1ZTpudW1iZXIpIHtcclxuICAgICAgICAgIHRoaXNbMl0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBxKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXNbM107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgcSh2YWx1ZTpudW1iZXIpIHtcclxuICAgICAgICAgIHRoaXNbM10gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vdmVjdG9yRmllbGRzLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vVmVjdG9yLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBuZS5tYXRoIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIFZlY3RvcjIgZXh0ZW5kcyBWZWN0b3Ige1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg9MCwgeT0wKSB7XHJcbiAgICAgIHN1cGVyKHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb25lKCk6VmVjdG9yMiB7XHJcbiAgICAgIHZhciB2ZWMgPSBuZXcgVmVjdG9yMigpO1xyXG4gICAgICByZXR1cm4gdmVjLmNvcHlGcm9tKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvcHlGcm9tKHZlYzpWZWN0b3IyKSB7XHJcbiAgICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcclxuICAgICAgdmFyIGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgIHZhciBiID0gdmVjLmRhdGE7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBhW2ldID0gYltpXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBjb3B5VG8odmVjOlZlY3RvcjIpIHtcclxuICAgICAgcmV0dXJuIHZlYy5jb3B5RnJvbSh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGQodmVjKSB7XHJcbiAgICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcclxuICAgICAgdmFyIGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgIHZhciBiID0gdmVjLmRhdGE7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBhW2ldICs9IGJbaV07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc3ViKHZlYykge1xyXG4gICAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XHJcbiAgICAgIHZhciBhID0gdGhpcy5kYXRhO1xyXG4gICAgICB2YXIgYiA9IHZlYy5kYXRhO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgYVtpXSAtPSBiW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG11bCh2ZWMpIHtcclxuICAgICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xyXG4gICAgICB2YXIgYSA9IHRoaXMuZGF0YTtcclxuICAgICAgdmFyIGIgPSB2ZWMuZGF0YTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGFbaV0gKj0gYltpXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBkaXYodmVjKSB7XHJcbiAgICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcclxuICAgICAgdmFyIGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgIHZhciBiID0gdmVjLmRhdGE7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBhW2ldIC89IGJbaV07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kKHZlYykge1xyXG4gICAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XHJcbiAgICAgIHZhciBhID0gdGhpcy5kYXRhO1xyXG4gICAgICB2YXIgYiA9IHZlYy5kYXRhO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgYVtpXSAlPSBiW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCAoeCwgeSkge1xyXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcclxuICAgICAgZGF0YVswXSA9IHg7XHJcbiAgICAgIGRhdGFbMV0gPSB5O1xyXG4gICAgfVxyXG5cclxuICAgIG5vcm1hbGl6ZSgpIHtcclxuICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgIHZhciBzdW0gPSAwO1xyXG4gICAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBzdW0gKz0gZGF0YVtpXSAqIGRhdGFbaV07XHJcbiAgICAgIH1cclxuICAgICAgdmFyIHZlYyA9IE1hdGguc3FydChzdW0pO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgZGF0YVtpXSA9IGRhdGFbaV0gLyB2ZWMgfHwgMDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgfVxyXG4gIHZlY3RvckZpZWxkcyhWZWN0b3IyLnByb3RvdHlwZSwgJ3MnLCAndCcsICdwJywgJ3EnKTtcclxuICB2ZWN0b3JGaWVsZHMoVmVjdG9yMi5wcm90b3R5cGUsICd1JywgJ3YnKTtcclxuICB2ZWN0b3JGaWVsZHMoVmVjdG9yMi5wcm90b3R5cGUsICd4JywgJ3knLCAneicsICd3Jyk7XHJcbiAgdmVjdG9yRmllbGRzKFZlY3RvcjIucHJvdG90eXBlLCAncicsICdnJywgJ2InLCAnYScpO1xyXG5cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9WZWN0b3IyLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBuZS5tYXRoIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIFZlY3RvcjMgZXh0ZW5kcyBWZWN0b3IyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4PTAsIHk9MCwgej0wKSB7XHJcbiAgICAgIHN1cGVyKHgsIHkpO1xyXG4gICAgICB0aGlzWzJdID0gejtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbGVuZ3RoKCkge1xyXG4gICAgICByZXR1cm4gMztcclxuICAgIH1cclxuXHJcbiAgICBjbG9uZSgpOlZlY3RvcjMge1xyXG4gICAgICB2YXIgdmVjID0gbmV3IFZlY3RvcjMoKTtcclxuICAgICAgcmV0dXJuIHZlYy5jb3B5RnJvbSh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgWzJdKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVsyXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgWzJdKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbMl0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2V0ICh4LCB5LCB6PTApIHtcclxuICAgICAgc3VwZXIuc2V0KHgsIHkpO1xyXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcclxuICAgICAgZGF0YVsyXSA9IHo7XHJcbiAgICB9XHJcblxyXG4gICAgY3Jvc3ModmVjOlZlY3RvcjMpIHtcclxuICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgIHZhciB2ZCAgID0gdmVjLmRhdGE7XHJcbiAgICAgIHZhciB4ID0gZGF0YVsxXSAqIHZkWzJdIC0gZGF0YVsyXSAqIHZkWzFdO1xyXG4gICAgICB2YXIgeSA9IGRhdGFbMl0gKiB2ZFswXSAtIGRhdGFbMF0gKiB2ZFsyXTtcclxuICAgICAgdmFyIHogPSBkYXRhWzBdICogdmRbMV0gLSBkYXRhWzFdICogdmRbMF07XHJcbiAgICAgIGRhdGFbMF0gPSB4O1xyXG4gICAgICBkYXRhWzFdID0geTtcclxuICAgICAgZGF0YVsyXSA9IHo7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL1ZlY3RvcjMudHNcIiAvPlxyXG5cclxubW9kdWxlIG5lLm1hdGgge1xyXG5cclxuICBleHBvcnQgY2xhc3MgVmVjdG9yNCBleHRlbmRzIFZlY3RvcjMge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg9MCwgeT0wLCB6PTAsIHc9MCkge1xyXG4gICAgICBzdXBlcih4LCB5LCB6KTtcclxuICAgICAgdGhpc1szXSA9IHc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxlbmd0aCgpIHtcclxuICAgICAgcmV0dXJuIDQ7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvbmUoKTpWZWN0b3I0IHtcclxuICAgICAgdmFyIHZlYyA9IG5ldyBWZWN0b3I0KCk7XHJcbiAgICAgIHJldHVybiB2ZWMuY29weUZyb20odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFszXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbM107XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFszXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzNdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0ICh4LCB5LCB6PTAsIHc9MCkge1xyXG4gICAgICBzdXBlci5zZXQoeCwgeSwgeik7XHJcbiAgICAgIHZhciBkYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgICBkYXRhWzJdID0gejtcclxuICAgICAgZGF0YVszXSA9IHc7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL21hdGgvVmVjdG9yNC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0NvbG9yLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBuZS5ncmFwaGljcyB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBDb2xvckJhc2UgZXh0ZW5kcyBtYXRoLlZlY3RvcjQge1xyXG5cclxuICAgIGdldCBbMF0oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBbMF0odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVswXSA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgdmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgWzFdKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVsxXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgWzFdKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbMV0gPSBNYXRoLm1pbigyNTUsIE1hdGgubWF4KDAsIHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFsyXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMl07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFsyXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzJdID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCB2YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBbM10oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhWzNdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBbM10odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVszXSA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgdmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcmVkKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCByZWQodmFsdWUpIHtcclxuICAgICAgdGhpcy5yID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGdyZWVuKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBncmVlbih2YWx1ZSkge1xyXG4gICAgICB0aGlzLmcgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYmx1ZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgYmx1ZSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLmIgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYWxwaGEoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGFscGhhKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuYSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBodWUoKTpudW1iZXIge1xyXG4gICAgICByZXR1cm4gdGhpcy50b0hzbCgpWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBodWUodmFsdWUpIHtcclxuICAgICAgdmFyIGhzbGEgPSB0aGlzLnRvSHNsYSgpO1xyXG4gICAgICBoc2xhWzBdID0gdmFsdWU7XHJcbiAgICAgIHZhciBjID0gQ29sb3IuZnJvbUhzbGEoaHNsYSk7XHJcbiAgICAgIHRoaXMuc2V0KGMucmVkLCBjLmdyZWVuLCBjLmJsdWUsIGMuYWxwaGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzYXR1cmF0aW9uKCk6bnVtYmVyIHtcclxuICAgICAgcmV0dXJuIHRoaXMudG9Ic2woKVsxXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2F0dXJhdGlvbih2YWx1ZSkge1xyXG4gICAgICB2YXIgaHNsYSA9IHRoaXMudG9Ic2xhKCk7XHJcbiAgICAgIGhzbGFbMV0gPSB2YWx1ZTtcclxuICAgICAgdmFyIGMgPSBDb2xvci5mcm9tSHNsYShoc2xhKTtcclxuICAgICAgdGhpcy5zZXQoYy5yZWQsIGMuZ3JlZW4sIGMuYmx1ZSwgYy5hbHBoYSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGx1bWluYW5jZSgpOm51bWJlciB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRvSHNsKClbMl07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGx1bWluYW5jZSh2YWx1ZSkge1xyXG4gICAgICB2YXIgaHNsYSA9IHRoaXMudG9Ic2xhKCk7XHJcbiAgICAgIGhzbGFbMl0gPSB2YWx1ZTtcclxuICAgICAgdmFyIGMgPSBDb2xvci5mcm9tSHNsYShoc2xhKTtcclxuICAgICAgdGhpcy5zZXQoYy5yZWQsIGMuZ3JlZW4sIGMuYmx1ZSwgYy5hbHBoYSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRvSHNsYSgpIHtcclxuICAgICAgdmFyIHIgPSB0aGlzLnJlZCAvIDI1NSwgZyA9IHRoaXMuZ3JlZW4gLyAyNTUsIGIgPSB0aGlzLmJsdWUgLyAyNTU7XHJcbiAgICAgIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKSwgbWluID0gTWF0aC5taW4ociwgZywgYik7XHJcbiAgICAgIHZhciBoLCBzLCBsID0gKG1heCArIG1pbikgLyAyO1xyXG4gICAgICBpZiAobWF4ID09IG1pbikge1xyXG4gICAgICAgICAgaCA9IHMgPSAwOyAvLyBhY2hyb21hdGljXHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgICAgdmFyIGQgPSBtYXggLSBtaW47XHJcbiAgICAgICAgICBzID0gbCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbik7XHJcbiAgICAgICAgICBzd2l0Y2gobWF4KXtcclxuICAgICAgICAgICAgICBjYXNlIHI6IGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBnOiBoID0gKGIgLSByKSAvIGQgKyAyOyBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIGI6IGggPSAociAtIGcpIC8gZCArIDQ7IGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaCAvPSA2O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gW2gsIHMsIGwsIHRoaXMuYWxwaGFdO1xyXG4gICAgfVxyXG5cclxuICAgIHRvSHNsKCkge1xyXG4gICAgICB2YXIgciA9IHRoaXMucmVkIC8gMjU1LCBnID0gdGhpcy5ncmVlbiAvIDI1NSwgYiA9IHRoaXMuYmx1ZSAvIDI1NTtcclxuICAgICAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcclxuICAgICAgdmFyIGgsIHMsIGwgPSAobWF4ICsgbWluKSAvIDI7XHJcblxyXG4gICAgICBpZihtYXggPT0gbWluKXtcclxuICAgICAgICAgIGggPSBzID0gMDsgLy8gYWNocm9tYXRpY1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICAgIHZhciBkID0gbWF4IC0gbWluO1xyXG4gICAgICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xyXG4gICAgICAgICAgc3dpdGNoKG1heCl7XHJcbiAgICAgICAgICAgICAgY2FzZSByOiBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7IGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgZzogaCA9IChiIC0gcikgLyBkICsgMjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBiOiBoID0gKHIgLSBnKSAvIGQgKyA0OyBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGggLz0gNjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIFtoLCBzLCBsXTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9Db2xvckJhc2UudHNcIiAvPlxyXG5cclxubW9kdWxlIG5lLmdyYXBoaWNzIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIENvbG9yIGV4dGVuZHMgQ29sb3JCYXNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihyPTAsIGc9MCwgYj0wLCBhPTI1NSkge1xyXG4gICAgICBzdXBlcihyLCBnLCBiLCBhKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaHVlMnJnYiAocDpudW1iZXIsIHE6bnVtYmVyLCB0Om51bWJlcikge1xyXG4gICAgICAgIGlmKHQgPCAwKSB0ICs9IDE7XHJcbiAgICAgICAgaWYodCA+IDEpIHQgLT0gMTtcclxuICAgICAgICBpZih0IDwgMS82KSByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdDtcclxuICAgICAgICBpZih0IDwgMS8yKSByZXR1cm4gcTtcclxuICAgICAgICBpZih0IDwgMi8zKSByZXR1cm4gcCArIChxIC0gcCkgKiAoMi8zIC0gdCkgKiA2O1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9oc2xUb1JnYihoOm51bWJlciwgczpudW1iZXIsIGw6bnVtYmVyLCBhOm51bWJlcikge1xyXG4gICAgICB2YXIgciwgZywgYjtcclxuXHJcbiAgICAgIGlmIChzID09IDApIHtcclxuICAgICAgICByID0gZyA9IGIgPSBsOyAvLyBhY2hyb21hdGljXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzO1xyXG4gICAgICAgIHZhciBwID0gMiAqIGwgLSBxO1xyXG4gICAgICAgIHIgPSB0aGlzLl9odWUycmdiKHAsIHEsIGggKyAxLzMpO1xyXG4gICAgICAgIGcgPSB0aGlzLl9odWUycmdiKHAsIHEsIGgpO1xyXG4gICAgICAgIGIgPSB0aGlzLl9odWUycmdiKHAsIHEsIGggLSAxLzMpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXcgQ29sb3IoTWF0aC5yb3VuZChyICogMjU1KSwgTWF0aC5yb3VuZChnICogMjU1KSwgTWF0aC5yb3VuZChiICogMjU1KSwgYSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZyb21SZ2JhKHJnYmE6bnVtYmVyKSB7XHJcbiAgICAgIHZhciByID0gKHJnYmEgPj4gMjQpICYmIDB4RkY7XHJcbiAgICAgIHZhciBnID0gKHJnYmEgPj4gMTYpICYmIDB4RkY7XHJcbiAgICAgIHZhciBiID0gKHJnYmEgPj4gIDgpICYmIDB4RkY7XHJcbiAgICAgIHZhciBhID0gKHJnYmEgPj4gIDApICYmIDB4RkY7XHJcbiAgICAgIHJldHVybiBuZXcgQ29sb3IociwgZywgYiwgYSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZyb21SZ2IocmdiOm51bWJlcikge1xyXG4gICAgICB2YXIgciA9IChyZ2IgPj4gMTYpICYmIDB4RkY7XHJcbiAgICAgIHZhciBnID0gKHJnYiA+PiAgOCkgJiYgMHhGRjtcclxuICAgICAgdmFyIGIgPSAocmdiID4+ICAwKSAmJiAweEZGO1xyXG4gICAgICByZXR1cm4gbmV3IENvbG9yKHIsIGcsIGIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBmcm9tQXJnYihhcmdiKSB7XHJcbiAgICAgICB2YXIgYSA9IChhcmdiID4+IDI0KSAmJiAweEZGO1xyXG4gICAgICAgdmFyIHIgPSAoYXJnYiA+PiAxNikgJiYgMHhGRjtcclxuICAgICAgIHZhciBnID0gKGFyZ2IgPj4gIDgpICYmIDB4RkY7XHJcbiAgICAgICB2YXIgYiA9IChhcmdiID4+ICAwKSAmJiAweEZGO1xyXG4gICAgICAgcmV0dXJuIG5ldyBDb2xvcihyLCBnLCBiLCBhKTtcclxuICAgICB9XHJcblxyXG4gICAgIHN0YXRpYyBmcm9tSHNsYShoc2xhOiBudW1iZXJbXSkge1xyXG4gICAgICAgdmFyIFtoLCBzLCBsLCBhXSA9IGhzbGE7XHJcbiAgICAgICByZXR1cm4gdGhpcy5faHNsVG9SZ2IoaCwgcywgbCwgYSk7XHJcbiAgICAgfVxyXG5cclxuICAgICBzdGF0aWMgZnJvbUhzbChoc2w6IG51bWJlcltdKSB7XHJcbiAgICAgICB2YXIgW2gsIHMsIGxdID0gaHNsO1xyXG4gICAgICAgcmV0dXJuIHRoaXMuX2hzbFRvUmdiKGgsIHMsIGwsIDI1NSk7XHJcbiAgICAgfVxyXG5cclxuICAgICBjbG9uZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbG9yKHRoaXMucmVkLCB0aGlzLmdyZWVuLCB0aGlzLmJsdWUsIHRoaXMuYWxwaGEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb21wbGVtZW50KCkge1xyXG4gICAgICAgICB0aGlzLmh1ZSA9ICgwLjUgKyB0aGlzLmh1ZSkgJSAxO1xyXG4gICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgIH1cclxuXHJcbiAgICAgICB0b0NzcygpIHtcclxuICAgICAgICAgdmFyIGEgPSB0aGlzLmFscGhhIC8gMjU1O1xyXG4gICAgICAgICByZXR1cm4gYHJnYmEoJHt0aGlzLnJlZH0sICR7dGhpcy5ncmVlbn0sICR7dGhpcy5ibHVlfSwgJHthfSlgO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHRvU3R5bGUodzpudW1iZXIsIGg6bnVtYmVyLCBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xyXG4gICAgICAgICByZXR1cm4gdGhpcy50b0NzcygpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHRvQXJnYigpIHtcclxuICAgICAgICAgcmV0dXJuIHRoaXMuYWxwaGEgPDwgMjQgKyB0aGlzLnJlZCA8PCAxNiArIHRoaXMuZ3JlZW4gPDwgOCArIHRoaXMuYmx1ZTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICB0b1JnYmEoKSB7XHJcbiAgICAgICAgIHJldHVybiB0aGlzLnJlZCA8PCAyNCArIHRoaXMuZ3JlZW4gPDwgMTYgKyB0aGlzLmJsdWUgPDwgOCArIHRoaXMuYWxwaGE7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgdG9SZ2IoKSB7XHJcbiAgICAgICAgIHJldHVybiB0aGlzLnJlZCA8PCAxNiArIHRoaXMuZ3JlZW4gPDwgOCArIHRoaXMuYmx1ZTtcclxuICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgZ3JheXNjYWxlKCkge1xyXG4gICAgICAgICB2YXIgYXZnID0gMC4yMSAqIHRoaXMucmVkICsgMC43MiAqIHRoaXMuZ3JlZW4gKyAwLjA3ICogdGhpcy5ibHVlO1xyXG4gICAgICAgICByZXR1cm4gdGhpcy5zZXQoYXZnLCBhdmcsIGF2Zyk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgYXZlcmFnZSgpIHtcclxuICAgICAgICAgdmFyIGF2ZyA9ICh0aGlzLnJlZCArIHRoaXMuZ3JlZW4gKyB0aGlzLmJsdWUpIC8gMztcclxuICAgICAgICAgcmV0dXJuIHRoaXMuc2V0KGF2ZywgYXZnLCBhdmcpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIGxpZ2h0bmVzc0F2ZXJhZ2UoKSB7XHJcbiAgICAgICAgIHZhciBhcmdzID0gW3RoaXMucmVkLCB0aGlzLmdyZWVuLCB0aGlzLmJsdWVdO1xyXG4gICAgICAgICB2YXIgYXZnID0gIChNYXRoLm1heCguLi5hcmdzKSArIE1hdGgubWluKC4uLmFyZ3MpKSAvIDI7XHJcbiAgICAgICAgIHJldHVybiB0aGlzLnNldChhdmcsIGF2ZywgYXZnKTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICBpbnZlcnQoYWxwaGE9ZmFsc2UpIHtcclxuICAgICAgICAgdmFyIGEgPSBhbHBoYSA/IDI1NSAtIHRoaXMuYWxwaGEgOiB0aGlzLmFscGhhO1xyXG4gICAgICAgICByZXR1cm4gdGhpcy5zZXQoMjU1IC0gdGhpcy5yZWQsIDI1NSAtIHRoaXMuZ3JlZW4sIDI1NSAtIHRoaXMuYmx1ZSwgYSk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBXSElURSgpIHtcclxuICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcigyNTUsIDI1NSwgMjU1KTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICBzdGF0aWMgZ2V0IEJMQUNLKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKCk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBSRUQoKSB7XHJcbiAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoMjU1LCAwLCAwKTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICBzdGF0aWMgZ2V0IEdSRUVOKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKDAsIDEyOCwgMCk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBCTFVFKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKDAsIDAsIDI1NSk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBZRUxMT1coKSB7XHJcbiAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoMjU1LCAyNTUsIDApO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHN0YXRpYyBnZXQgTUFHRU5UQSgpIHtcclxuICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcigyNTUsIDAsIDI1NSk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBDWUFOKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKDAsIDI1NSwgMjU1KTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICBzdGF0aWMgZ2V0IEdSQVkoKSB7XHJcbiAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoMTI4LCAxMjgsIDEyOCk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBEQVJLX0dSQVkoKSB7XHJcbiAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoMTY5LCAxNjksIDE2OSk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBMSUdIVF9HUkFZKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKDIxMSwgMjExLCAyMTEpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHN0YXRpYyBnZXQgT1JBTkdFKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKDI1NSwgMTY1LCAwKTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICBzdGF0aWMgZ2V0IEJST1dOKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKDE2NSwgNDIsIDQyKTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICBzdGF0aWMgZ2V0IExJTUUoKSB7XHJcbiAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoMCwgMjU1LCAwKTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICBzdGF0aWMgZ2V0IExJR0hUX0JMVUUoKSB7XHJcbiAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoMTczLCAyMTYsIDIzMCk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBQSU5LKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKDI1NSwgMTkyLCAyMDMpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHN0YXRpYyBnZXQgVFJBTlNQQVJFTlQoKSB7XHJcbiAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoMCwgMCwgMCwgMCk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBSQU5ET00oKSB7XHJcbiAgICAgICAgIHZhciByID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcclxuICAgICAgICAgdmFyIGcgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xyXG4gICAgICAgICB2YXIgYiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XHJcbiAgICAgICAgIHJldHVybiBuZXcgQ29sb3IociwgZywgYik7XHJcbiAgICAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLmdyYXBoaWNzIHtcclxuXHJcbiAgaW50ZXJmYWNlIFVuaWZvcm0ge1xyXG4gICAgW3MgOiBzdHJpbmddOiB7IHR5cGU6IHN0cmluZywgdmFsdWU6IGFueSB9O1xyXG4gIH1cclxuXHJcbiAgaW50ZXJmYWNlIFVuZm9ybUxvY2F0aW9ucyB7XHJcbiAgICBbcyA6IHN0cmluZ106IFdlYkdMVW5pZm9ybUxvY2F0aW9uO1xyXG4gIH1cclxuXHJcbiAgaW50ZXJmYWNlIEF0dHJpYnV0ZUxvY2F0aW9ucyB7XHJcbiAgICBbcyA6IHN0cmluZ106IG51bWJlcjtcclxuICB9XHJcblxyXG4gIGludGVyZmFjZSBMb2NhdGlvbnMge1xyXG4gICAgdW5pZm9ybXMgIDogVW5mb3JtTG9jYXRpb25zO1xyXG4gICAgYXR0cmlidXRlczogQXR0cmlidXRlTG9jYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIEZpbHRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2wgICAgICAgICA6IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcclxuICAgIHByaXZhdGUgX3ZlcnRleCAgICAgOiBTaGFkZXI7XHJcbiAgICBwcml2YXRlIF9mcmFnbWVudCAgIDogU2hhZGVyO1xyXG4gICAgcHJpdmF0ZSBfYXR0cmlidXRlcyA6IHsgW3MgOiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICAgIHByaXZhdGUgX3ZhcnlpbmcgICAgOiB7IFtzIDogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgICBwcml2YXRlIF91bmlmb3JtcyAgIDogVW5pZm9ybTtcclxuICAgIHByaXZhdGUgX2dsUHJvZ3JhbSAgOiBXZWJHTFByb2dyYW07XHJcbiAgICBwcml2YXRlIF9sb2NhdGlvbnMgIDogTG9jYXRpb25zO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICB0aGlzLl9nbCA9IG51bGw7XHJcbiAgICAgIHRoaXMuX3ZlcnRleCA9IG5ldyBTaGFkZXIodGhpcyk7XHJcbiAgICAgIHRoaXMuX2ZyYWdtZW50ID0gbmV3IFNoYWRlcih0aGlzLCB0cnVlKTtcclxuICAgICAgdGhpcy5fYXR0cmlidXRlcyA9IHRoaXMubWFrZUF0dHJpYnV0ZXMoKTtcclxuICAgICAgdGhpcy5fdW5pZm9ybXMgICA9IHRoaXMuX2Zvcm1hdFVuaWZvcm1zKHRoaXMubWFrZVVuaWZvcm1zKCkpO1xyXG4gICAgICB0aGlzLl92YXJ5aW5nICAgID0gdGhpcy5tYWtlVmFyeWluZygpO1xyXG4gICAgICB0aGlzLl9nbFByb2dyYW0gID0gbnVsbDtcclxuICAgICAgdGhpcy5fbG9jYXRpb25zICA9IHsgdW5pZm9ybXM6IHt9LCBhdHRyaWJ1dGVzOiB7fSB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2ZXJ0ZXgoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl92ZXJ0ZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZyYWdtZW50KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZnJhZ21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgaWYgKHRoaXMuX2dsKSB7XHJcbiAgICAgICAgdGhpcy52ZXJ0ZXguZGVzdHJveSh0aGlzLl9nbCk7XHJcbiAgICAgICAgdGhpcy5mcmFnbWVudC5kZXN0cm95KHRoaXMuX2dsKTtcclxuICAgICAgICBpZiAodGhpcy5fZ2xQcm9ncmFtKSB7XHJcbiAgICAgICAgICB0aGlzLl9nbC5kZWxldGVQcm9ncmFtKHRoaXMuX2dsUHJvZ3JhbSk7XHJcbiAgICAgICAgICB0aGlzLl9nbFByb2dyYW0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ha2VBdHRyaWJ1dGVzKCk6IHsgW3MgOiBzdHJpbmddOiBzdHJpbmcgfSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlVW5pZm9ybXMoKTogeyBbcyA6IHN0cmluZ106IHN0cmluZyB9IHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VWYXJ5aW5nKCk6IHsgW3MgOiBzdHJpbmddOiBzdHJpbmcgfSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICB1c2UoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgICBpZiAoIXRoaXMuX2dsUHJvZ3JhbSkge1xyXG4gICAgICAgIHRoaXMuX2NvbXBpbGUoZ2wpO1xyXG4gICAgICB9XHJcbiAgICAgIGdsLnVzZVByb2dyYW0odGhpcy5fZ2xQcm9ncmFtKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jb21waWxlKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB0aGlzLl9nbCA9IGdsO1xyXG4gICAgICAgIHRoaXMuX21ha2VQcm9ncmFtKGdsKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9tYWtlUHJvZ3JhbShnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgIHRoaXMuX2dsUHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMuX2dsUHJvZ3JhbSwgdGhpcy5fdmVydGV4LmNvbXBpbGUoZ2wpKTtcclxuICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMuX2dsUHJvZ3JhbSwgdGhpcy5fZnJhZ21lbnQuY29tcGlsZShnbCkpO1xyXG4gICAgICBnbC5saW5rUHJvZ3JhbSh0aGlzLl9nbFByb2dyYW0pO1xyXG4gICAgICB0aGlzLl9jaGVja1Byb2dyYW0oZ2wpO1xyXG4gICAgICB0aGlzLl9nZXRMb2NhdGlvbnMoZ2wpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldExvY2F0aW9ucyhnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgIHRoaXMuX2dldFVuaWZvcm1Mb2NhdGlvbnMoZ2wpO1xyXG4gICAgICB0aGlzLl9nZXRBdHRyaWJ1dGVMb2NhdGlvbnMoZ2wpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldFVuaWZvcm1Mb2NhdGlvbnMoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLnVuaWZvcm1zKS5mb3JFYWNoKHUgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fbG9jYXRpb25zLnVuaWZvcm1zW3VdID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuX2dsUHJvZ3JhbSwgdSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldEF0dHJpYnV0ZUxvY2F0aW9ucyhnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuYXR0cmlidXRlcykuZm9yRWFjaChhID0+IHtcclxuICAgICAgICAgIHRoaXMuX2xvY2F0aW9ucy5hdHRyaWJ1dGVzW2FdID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5fZ2xQcm9ncmFtLCBhKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY2hlY2tQcm9ncmFtKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgdmFyIHN1Y2Nlc3MgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuX2dsUHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpO1xyXG4gICAgICBpZiAoIXN1Y2Nlc3MpIHtcclxuICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicHJvZ3JhbSBmaWxlZCB0byBsaW5rOlwiICsgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cgKHRoaXMuX2dsUHJvZ3JhbSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZm9ybWF0VW5pZm9ybXModSA6IHsgW3MgOiBzdHJpbmddOiBzdHJpbmcgfSkge1xyXG4gICAgICB2YXIgcmVzdWx0OiBVbmlmb3JtID0ge307XHJcbiAgICAgIE9iamVjdC5rZXlzKHUpXHJcbiAgICAgICAgLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgdmFyIHR5cGUgPSB1W2tleV07XHJcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHsgdHlwZTogRmlsdGVyLlRZUEVTW3R5cGVdLCB2YWx1ZTogRmlsdGVyLkRFRkFVTFRTW3R5cGVdKCkgfTtcclxuICAgICAgICB9KSA7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVuaWZvcm1zKCk6IHsgW3MgOiBzdHJpbmddOiB7IHR5cGU6IHN0cmluZywgdmFsdWU6IGFueSB9IH0ge1xyXG4gICAgICByZXR1cm4gdGhpcy5fdW5pZm9ybXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YXJ5aW5nKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fdmFyeWluZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFRZUEVTID0ge1xyXG4gICAgICBudW1iZXI6ICdmbG9hdCcsXHJcbiAgICAgIGZsb2F0OiAgJ2Zsb2F0JyxcclxuICAgICAgdmVjMjogICAndmVjMicsXHJcbiAgICAgIHZlYzM6ICAgJ3ZlYzMnLFxyXG4gICAgICB2ZWM0OiAgICd2ZWM0JyxcclxuICAgICAgbWF0MjogICAnbWF0MicsXHJcbiAgICAgIG1hdDM6ICAgJ21hdDMnLFxyXG4gICAgICBtYXQ0OiAgICdtYXQ0JyxcclxuICAgICAgY29sb3I6ICAndmVjNCcsXHJcbiAgICAgIHJlY3Q6ICAgJ3ZlYzQnLFxyXG4gICAgICBwb2ludDogICd2ZWMzJyxcclxuICAgICAgc2FtcGxlcjJkOiAnc2FtcGxlcjJkJyxcclxuICAgICAgdGV4dHVyZTogICAnc2FtcGxlcjJkJ1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgREVGQVVMVFMgPSB7XHJcbiAgICAgIG51bWJlcjogICAgKCkgPT4gMCxcclxuICAgICAgZmxvYXQ6ICAgICAoKSA9PiAwLFxyXG4gICAgICBtYXQyOiAgICAgICgpID0+IG5ldyBtYXRoLk1hdHJpeDIoKSxcclxuICAgICAgbWF0MzogICAgICAoKSA9PiBuZXcgbWF0aC5NYXRyaXgzKCksXHJcbiAgICAgIG1hdDQ6ICAgICAgKCkgPT4gbmV3IG1hdGguTWF0cml4NCgpLFxyXG4gICAgICB2ZWMyOiAgICAgICgpID0+IG5ldyBtYXRoLlZlY3RvcjIoKSxcclxuICAgICAgdmVjMzogICAgICAoKSA9PiBuZXcgbWF0aC5WZWN0b3IzKCksXHJcbiAgICAgIHZlYzQ6ICAgICAgKCkgPT4gbmV3IG1hdGguVmVjdG9yNCgpLFxyXG4gICAgICBjb2xvcjogICAgICgpID0+IG5ldyBDb2xvcigpLFxyXG4gICAgICByZWN0OiAgICAgICgpID0+IG5ldyBSZWN0KCksXHJcbiAgICAgIHBvaW50OiAgICAgKCkgPT4gbmV3IFBvaW50KCksXHJcbiAgICAgIHNhbXBsZXIyZDogKCkgPT4gbnVsbCxcclxuICAgICAgdGV4dHVyZTogICAoKSA9PiBudWxsLFxyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFVQREFURSA9IHtcclxuICAgICAgbnVtYmVyKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiwgdmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGdsLnVuaWZvcm0xZihsb2NhdGlvbiwgdmFsdWUpO1xyXG4gICAgICB9LFxyXG4gICAgICBmbG9hdChnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBsb2NhdGlvbjogV2ViR0xVbmlmb3JtTG9jYXRpb24sIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBnbC51bmlmb3JtMWYobG9jYXRpb24sIHZhbHVlKTtcclxuICAgICAgfSxcclxuICAgICAgbWF0MihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBsb2NhdGlvbjogV2ViR0xVbmlmb3JtTG9jYXRpb24sIHZhbHVlOiBtYXRoLk1hdHJpeDIpIHtcclxuICAgICAgICBnbC51bmlmb3JtTWF0cml4MmZ2KGxvY2F0aW9uLCBmYWxzZSwgdmFsdWUuZGF0YSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1hdDMoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgbG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB2YWx1ZTogbWF0aC5NYXRyaXgzKSB7XHJcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDNmdihsb2NhdGlvbiwgZmFsc2UsIHZhbHVlLmRhdGEpO1xyXG4gICAgICB9LFxyXG4gICAgICBtYXQ0KGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiwgdmFsdWU6IG1hdGguTWF0cml4NCkge1xyXG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYobG9jYXRpb24sIGZhbHNlLCB2YWx1ZS5kYXRhKTtcclxuICAgICAgfSxcclxuICAgICAgdmVjMihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBsb2NhdGlvbjogV2ViR0xVbmlmb3JtTG9jYXRpb24sIHZhbHVlOiBtYXRoLlZlY3RvcjIpIHtcclxuICAgICAgICBnbC51bmlmb3JtMmZ2KGxvY2F0aW9uLCB2YWx1ZS5kYXRhKTtcclxuICAgICAgfSxcclxuICAgICAgdmVjMyhnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBsb2NhdGlvbjogV2ViR0xVbmlmb3JtTG9jYXRpb24sIHZhbHVlOiBtYXRoLlZlY3RvcjMpIHtcclxuICAgICAgICBnbC51bmlmb3JtM2Z2KGxvY2F0aW9uLCB2YWx1ZS5kYXRhKTtcclxuICAgICAgfSxcclxuICAgICAgdmVjNChnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBsb2NhdGlvbjogV2ViR0xVbmlmb3JtTG9jYXRpb24sIHZhbHVlOiBtYXRoLlZlY3RvcjQpIHtcclxuICAgICAgICBnbC51bmlmb3JtNGZ2KGxvY2F0aW9uLCB2YWx1ZS5kYXRhKTtcclxuICAgICAgfSxcclxuICAgICAgY29sb3IoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgbG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB2YWx1ZTogbWF0aC5WZWN0b3I0KSB7XHJcbiAgICAgICAgZ2wudW5pZm9ybTRmdihsb2NhdGlvbiwgdmFsdWUuZGF0YSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlY3QoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgbG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB2YWx1ZTogbWF0aC5WZWN0b3I0KSB7XHJcbiAgICAgICAgZ2wudW5pZm9ybTRmdihsb2NhdGlvbiwgdmFsdWUuZGF0YSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHBvaW50KGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiwgdmFsdWU6IG1hdGguVmVjdG9yMykge1xyXG4gICAgICAgIGdsLnVuaWZvcm0zZnYobG9jYXRpb24sIHZhbHVlLmRhdGEpO1xyXG4gICAgICB9LFxyXG4gICAgICBzYW1wbGVyMmQoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgbG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB2YWx1ZTogVGV4dHVyZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgdGV4dHVyZShnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBsb2NhdGlvbjogV2ViR0xVbmlmb3JtTG9jYXRpb24sIHZhbHVlOiBUZXh0dXJlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcblxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUuZ3JhcGhpY3Mge1xyXG5cclxuICBleHBvcnQgY2xhc3MgRm9udCB7XHJcblxyXG4gICAgc3RhdGljIERFRkFVTFRfU1RST0tFX1NUWUxFID0gQ29sb3IuVFJBTlNQQVJFTlQ7XHJcbiAgICBzdGF0aWMgREVGQVVMVF9GSUxMX1NUWUxFICAgPSBDb2xvci5CTEFDSztcclxuICAgIHN0YXRpYyBERUZBVUxUX1NJWkUgICAgICAgICA9IDI0O1xyXG4gICAgc3RhdGljIERFRkFVTFRfRkFNSUxZICAgICAgID0gJ21vbm9zcGFjZSc7XHJcblxyXG4gICAgc3Ryb2tlU3R5bGU6IEhhc1N0eWxlO1xyXG4gICAgZmlsbFN0eWxlOiAgIEhhc1N0eWxlO1xyXG4gICAgc2l6ZTogICAgICAgIG51bWJlcjtcclxuICAgIHByaXZhdGUgICAgIF9mYW1pbHk6ICBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZmFtaWx5PSBGb250LkRFRkFVTFRfRkFNSUxZLCBzaXplPUZvbnQuREVGQVVMVF9TSVpFKSB7XHJcbiAgICAgIHRoaXMuc3Ryb2tlU3R5bGUgPSBGb250LkRFRkFVTFRfU1RST0tFX1NUWUxFO1xyXG4gICAgICB0aGlzLmZpbGxTdHlsZSAgID0gRm9udC5ERUZBVUxUX0ZJTExfU1RZTEU7XHJcbiAgICAgIHRoaXMuZmFtaWx5ICAgICAgPSBmYW1pbHk7XHJcbiAgICAgIHRoaXMuc2l6ZSAgICAgICAgPSBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmYW1pbHkoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9mYW1pbHkuc3BsaXQoJyAnKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZmFtaWx5KHZhbHVlOnN0cmluZyB8IHN0cmluZ1tdKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICB0aGlzLl9mYW1pbHkgPSA8c3RyaW5nPnZhbHVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2ZhbWlseSA9ICg8c3RyaW5nW10+dmFsdWUpLmpvaW4oJyAnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0NvbG9yLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBuZS5ncmFwaGljcyB7XHJcblxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgQ29sb3JTdG9wIHtcclxuICAgIGNvbG9yOiAgIENvbG9yO1xyXG4gICAgcGVyY2VudDogbnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIEdyYWRpZW50IHtcclxuXHJcbiAgICBwcml2YXRlIF9fc3RvcHM6IENvbG9yU3RvcFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICB0aGlzLl9fc3RvcHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IF9zdG9wcygpOiBDb2xvclN0b3BbXSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9zdG9wcztcclxuICAgIH1cclxuXHJcbiAgICBhZGRDb2xvclN0b3AocGVyY2VudDpudW1iZXIsIGNvbG9yOiBDb2xvcikge1xyXG4gICAgICB0aGlzLl9zdG9wcy5wdXNoKHtjb2xvciwgcGVyY2VudH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRvU3R5bGUodzpudW1iZXIsIGg6bnVtYmVyLCBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHN0cmluZyB8IENhbnZhc0dyYWRpZW50IHwgQ2FudmFzUGF0dGVybiB7XHJcbiAgICAgIHZhciBzdHlsZSA9IHRoaXMuY3JlYXRlR3JhZGllbnQodywgaCwgY29udGV4dCk7XHJcbiAgICAgIHRoaXMuX3N0b3BzLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcclxuICAgICAgICBzdHlsZS5hZGRDb2xvclN0b3AoYy5wZXJjZW50LCBjLmNvbG9yLnRvQ3NzKCkpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUdyYWRpZW50KHc6bnVtYmVyLCBoOm51bWJlciwgY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBDYW52YXNHcmFkaWVudCB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0NvbG9yLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vR3JhZGllbnQudHNcIiAvPlxyXG5cclxubW9kdWxlIG5lLmdyYXBoaWNzIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIExpbmVhckdyYWRpZW50IGV4dGVuZHMgR3JhZGllbnQge1xyXG5cclxuICAgIGFuZ2xlOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYW5nbGU6bnVtYmVyPTApIHtcclxuICAgICAgc3VwZXIoKVxyXG4gICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlR3JhZGllbnQodzpudW1iZXIsIGg6bnVtYmVyLCBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IENhbnZhc0dyYWRpZW50IHtcclxuICAgICAgdmFyIGEgPSB0aGlzLmFuZ2xlICogTWF0aC5QSSAvIDE4MDtcclxuICAgICAgdmFyIHMgPSBNYXRoLnNpbihhKTtcclxuICAgICAgdmFyIGMgPSBNYXRoLmNvcyhhKTtcclxuICAgICAgdmFyIHggPSB3ICogYyAqIGMgKyBoICogcyAqIHM7XHJcbiAgICAgIHZhciB5ID0gaCAqIGMgKiBjICsgdyAqIHMgKiBzO1xyXG4gICAgICByZXR1cm4gY29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCB4LCB5KTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUuZ3JhcGhpY3Mge1xyXG5cclxuICBleHBvcnQgbW9kdWxlIFBhdHRlcm5SZXBlYXQge1xyXG4gICAgZXhwb3J0IHZhciBCT1RIID0gJ3JlcGVhdCc7XHJcbiAgICBleHBvcnQgdmFyIFggICAgPSAncmVwZWF0LXgnO1xyXG4gICAgZXhwb3J0IHZhciBZICAgID0gJ3JlcGVhdC15JztcclxuICAgIGV4cG9ydCB2YXIgTk9ORSA9ICduby1yZXBlYXQnO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIFBhdHRlcm4ge1xyXG5cclxuICAgIHB1YmxpYyBwaXhtYXA6IFBpeG1hcDtcclxuICAgIHB1YmxpYyByZXBlYXQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwaXhtYXA6IFBpeG1hcCwgcmVwZWF0OnN0cmluZz1QYXR0ZXJuUmVwZWF0LkJPVEgpIHtcclxuICAgICAgdGhpcy5waXhtYXAgPSBwaXhtYXA7XHJcbiAgICAgIHRoaXMucmVwZWF0ID0gcmVwZWF0O1xyXG4gICAgfVxyXG5cclxuICAgIHRvU3R5bGUodzpudW1iZXIsIGg6bnVtYmVyLCBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHN0cmluZyB8IENhbnZhc0dyYWRpZW50IHwgQ2FudmFzUGF0dGVybiB7XHJcbiAgICAgIHZhciByZXBlYXQgPSAnJztcclxuICAgICAgY29udGV4dC5jcmVhdGVQYXR0ZXJuKHRoaXMucGl4bWFwLmNhbnZhcywgcmVwZWF0KTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLmdyYXBoaWNzIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIFBpeG1hcCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2FudmFzOiAgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF9jb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcblxyXG4gICAgZm9udDogRm9udDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgIHRoaXMuX2NvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZnJvbUltYWdlKGltZzogSFRNTEltYWdlRWxlbWVudCkge1xyXG4gICAgICB2YXIgcHggPSBuZXcgUGl4bWFwKGltZy53aWR0aCwgaW1nLmhlaWdodCk7XHJcbiAgICAgIHB4LmNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCk7XHJcbiAgICAgIHJldHVybiBweDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2FudmFzKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY2FudmFzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjb250ZXh0KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2lkdGgoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jYW52YXMud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhlaWdodCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcy5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLmdyYXBoaWNzIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIFBvaW50IGV4dGVuZHMgbWF0aC5WZWN0b3IzIHtcclxuXHJcblxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIm1vZHVsZSBuZS5ncmFwaGljcyB7XHJcblxyXG4gIGV4cG9ydCBkZWNsYXJlIHR5cGUgUG9zaXRpb25WYWx1ZSA9ICh3LCBoKSA9PiBudW1iZXJbXTtcclxuXHJcbiAgZXhwb3J0IG1vZHVsZSBQb3NpdGlvbiB7XHJcbiAgICBleHBvcnQgdmFyIFRPUCAgICAgICAgICA6IFBvc2l0aW9uVmFsdWUgPSAodywgaCkgPT4gWyB3IC8gMiwgICAwICAgXTtcclxuICAgIGV4cG9ydCB2YXIgTEVGVCAgICAgICAgIDogUG9zaXRpb25WYWx1ZSA9ICh3LCBoKSA9PiBbICAgMCwgICBoIC8gMiBdO1xyXG4gICAgZXhwb3J0IHZhciBSSUdIVCAgICAgICAgOiBQb3NpdGlvblZhbHVlID0gKHcsIGgpID0+IFsgICB3LCAgIGggLyAyIF07XHJcbiAgICBleHBvcnQgdmFyIEJPVFRPTSAgICAgICA6IFBvc2l0aW9uVmFsdWUgPSAodywgaCkgPT4gWyB3IC8gMiwgICBoICAgXTtcclxuICAgIGV4cG9ydCB2YXIgVE9QX0xFRlQgICAgIDogUG9zaXRpb25WYWx1ZSA9ICh3LCBoKSA9PiBbICAgMCwgICAgIDAgICBdO1xyXG4gICAgZXhwb3J0IHZhciBUT1BfUklHSFQgICAgOiBQb3NpdGlvblZhbHVlID0gKHcsIGgpID0+IFsgICB3LCAgICAgMCAgIF07XHJcbiAgICBleHBvcnQgdmFyIEJPVFRPTV9MRUZUICA6IFBvc2l0aW9uVmFsdWUgPSAodywgaCkgPT4gWyAgIDAsICAgICBoICAgXTtcclxuICAgIGV4cG9ydCB2YXIgQk9UVE9NX1JJR0hUIDogUG9zaXRpb25WYWx1ZSA9ICh3LCBoKSA9PiBbICAgdywgICAgIGggICBdO1xyXG4gICAgZXhwb3J0IHZhciBNSURETEUgICAgICAgOiBQb3NpdGlvblZhbHVlID0gKHcsIGgpID0+IFsgdyAvIDIsIGggLyAyIF07XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHBlcmNlbnQoeDpudW1iZXIsIHk6bnVtYmVyKTogUG9zaXRpb25WYWx1ZSB7XHJcbiAgICAgIHJldHVybiAodywgaCkgPT4gW3cgKiB4LCBoICogeV07XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGFic29sdXRlKHg6bnVtYmVyLCB5Om51bWJlcik6IFBvc2l0aW9uVmFsdWUge1xyXG4gICAgICByZXR1cm4gKHcsIGgpID0+IFt4LCB5XTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9Db2xvci50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0dyYWRpZW50LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vUG9zaXRpb24udHNcIiAvPlxyXG5cclxubW9kdWxlIG5lLmdyYXBoaWNzIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIFJhZGlhbEdyYWRpZW50IGV4dGVuZHMgR3JhZGllbnQge1xyXG5cclxuICAgIHN0YXJ0UmFkaXVzOiBudW1iZXI7XHJcbiAgICBlbmRSYWRpdXM6ICAgbnVtYmVyO1xyXG4gICAgcG9zaXRpb246ICAgIFBvc2l0aW9uVmFsdWU7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhcnRSYWRpdXM9MCwgZW5kUmFkaXVzPTEsIHBvc2l0aW9uID0gUG9zaXRpb24uTUlERExFKSB7XHJcbiAgICAgIHN1cGVyKClcclxuICAgICAgdGhpcy5zdGFydFJhZGl1cyA9IHN0YXJ0UmFkaXVzO1xyXG4gICAgICB0aGlzLmVuZFJhZGl1cyAgID0gZW5kUmFkaXVzO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uICAgID0gcG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlR3JhZGllbnQodzpudW1iZXIsIGg6bnVtYmVyLCBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IENhbnZhc0dyYWRpZW50IHtcclxuICAgICAgdmFyIFt4LCB5XSA9IHRoaXMucG9zaXRpb24odywgaCk7XHJcbiAgICAgIHJldHVybiBjb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KHgsIHksIHRoaXMuc3RhcnRSYWRpdXMgKiB4LCB3LCBoLCB0aGlzLmVuZFJhZGl1cyAqIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFuZ2xlKCkge1xyXG4gICAgICBzd2l0Y2ggKFBvc2l0aW9uKSB7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tYXRoL1ZlY3RvcjQudHNcIiAvPlxyXG5cclxubW9kdWxlIG5lLmdyYXBoaWNzIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIFJlY3QgZXh0ZW5kcyBtYXRoLlZlY3RvcjQge1xyXG5cclxuICAgIGdldCB6KCkge1xyXG4gICAgICByZXR1cm4gdGhpc1szXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgeih2YWx1ZSkge1xyXG4gICAgICB0aGlzWzNdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHcoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzWzJdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB3KHZhbHVlKSB7XHJcbiAgICAgIHRoaXNbMl0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXNbM107XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGgodmFsdWUpIHtcclxuICAgICAgdGhpc1szXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB3aWR0aCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgd2lkdGgodmFsdWUpIHtcclxuICAgICAgdGhpcy53ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhlaWdodCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgaGVpZ2h0KHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuaCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb25lKCkge1xyXG4gICAgICByZXR1cm4gbmV3IFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMudywgdGhpcy5oKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBtYXRoLnZlY3RvckZpZWxkcyhSZWN0LnByb3RvdHlwZSwgJ3gnLCAneScsICd3JywgJ2gnKTtcclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLmdyYXBoaWNzIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIFNoYWRlciB7XHJcblxyXG4gICAgcHVibGljIHNyYyAgICAgICAgOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9nbFNoYWRlciA6IFdlYkdMU2hhZGVyO1xyXG4gICAgcHJpdmF0ZSBfZnJhZ21lbnQgOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfZmlsdGVyICAgOiBGaWx0ZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZmlsdGVyOiBGaWx0ZXIsIGZyYWdtZW50PWZhbHNlKSB7XHJcbiAgICAgIHRoaXMuc3JjID0gJyc7XHJcbiAgICAgIHRoaXMuX2dsU2hhZGVyID0gbnVsbDtcclxuICAgICAgdGhpcy5fZnJhZ21lbnQgPSBmcmFnbWVudDtcclxuICAgICAgdGhpcy5fZmlsdGVyICAgPSBmaWx0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZyYWdtZW50KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZnJhZ21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGdlbmVyYXRlZFNvdXJjZSgpIHtcclxuICAgICAgdmFyIGhlYWQgPSB0aGlzLl9tYWtlSGVhZCgpO1xyXG4gICAgICB2YXIgdmFycyA9IHRoaXMuX21ha2VWYXJpYWJsZXMoKTtcclxuICAgICAgcmV0dXJuIGAke2hlYWR9JHt2YXJzfVxcbnZvaWQgbWFpbih2b2lkKSB7XFxuJHsgdGhpcy5zcmMgfVxcbn1gO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgICBpZiAodGhpcy5fZ2xTaGFkZXIpIHtcclxuICAgICAgICBnbC5kZWxldGVTaGFkZXIodGhpcy5fZ2xTaGFkZXIpO1xyXG4gICAgICAgIHRoaXMuX2dsU2hhZGVyID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBpbGUoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgICBpZiAodGhpcy5fZ2xTaGFkZXIgPT09IG51bGwpIHtcclxuICAgICAgICB2YXIgdHlwZSA9IHRoaXMuZnJhZ21lbnQgPyBnbC5GUkFHTUVOVF9TSEFERVIgOiBnbC5WRVJURVhfU0hBREVSO1xyXG4gICAgICAgIHRoaXMuX2dsU2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xyXG4gICAgICAgIGdsLnNoYWRlclNvdXJjZSh0aGlzLl9nbFNoYWRlciwgdGhpcy5nZW5lcmF0ZWRTb3VyY2UpO1xyXG4gICAgICAgIGdsLmNvbXBpbGVTaGFkZXIodGhpcy5fZ2xTaGFkZXIpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX3ZhbGlkYXRlU2hhZGVyKGdsKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX2dsU2hhZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3ZhbGlkYXRlU2hhZGVyKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgdmFyIHN1Y2Nlc3MgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodGhpcy5fZ2xTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKTtcclxuICAgICAgaWYgKCFzdWNjZXNzKSB7XHJcbiAgICAgICAgLy8gU29tZXRoaW5nIHdlbnQgd3JvbmcgZHVyaW5nIGNvbXBpbGF0aW9uOyBnZXQgdGhlIGVycm9yXHJcbiAgICAgICAgdmFyIGVyciA9IFwiQ291bGQgbm90IGNvbXBpbGUgc2hhZGVyOiBcIiArIGdsLmdldFNoYWRlckluZm9Mb2codGhpcy5fZ2xTaGFkZXIpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveShnbCk7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9tYWtlSGVhZCgpIHtcclxuICAgICAgcmV0dXJuICdwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXG4nO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21ha2VWYXJpYWJsZXMoKSB7XHJcbiAgICAgIGlmICh0aGlzLmZyYWdtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcEZyYWdtZW50VmFyaWFibGVzKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuX21hcFZlcnRleFZhcmlhYmxlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21hcEF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgIHZhciBhdHRyID0gdGhpcy5fZmlsdGVyLmF0dHJpYnV0ZXM7XHJcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhhdHRyKVxyXG4gICAgICAgIC5tYXAoKGspID0+IHtcclxuICAgICAgICAgIHJldHVybiBgJHthdHRyW2tdfSAke2t9O2A7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuam9pbignXFxuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWFwVW5pZm9ybXMoKSB7XHJcbiAgICAgIHZhciBhdHRyID0gdGhpcy5fZmlsdGVyLnVuaWZvcm1zO1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoYXR0cilcclxuICAgICAgICAubWFwKChrKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gYCR7YXR0cltrXS50eXBlfSAke2t9O2A7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuam9pbignXFxuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWFwVmFyeWluZygpIHtcclxuICAgICAgdmFyIGF0dHIgPSB0aGlzLl9maWx0ZXIudmFyeWluZztcclxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGF0dHIpXHJcbiAgICAgICAgLm1hcCgoaykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGAke2F0dHJba119ICR7a307YDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5qb2luKCdcXG4nKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9tYXBWZXJ0ZXhWYXJpYWJsZXMoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9tYXBBdHRyaWJ1dGVzKCkgKyB0aGlzLl9tYXBVbmlmb3JtcygpICsgdGhpcy5fbWFwVmFyeWluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21hcEZyYWdtZW50VmFyaWFibGVzKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fbWFwVW5pZm9ybXMoKSArIHRoaXMuX21hcFZhcnlpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUuZ3JhcGhpY3Mge1xyXG5cclxuICBleHBvcnQgY2xhc3MgVGV4dHVyZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfcGl4bWFwICAgIDogUGl4bWFwO1xyXG4gICAgcHJpdmF0ZSBfZ2wgICAgICAgIDogV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xyXG4gICAgcHJpdmF0ZSBfZ2xCdWZmZXIgIDogV2ViR0xSZW5kZXJidWZmZXI7XHJcbiAgICBwcml2YXRlIF9nbFRleHR1cmUgOiBXZWJHTFRleHR1cmU7XHJcbiAgICBwcml2YXRlIF9idWZmZXIgICAgOiBGbG9hdDMyQXJyYXk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGl4bWFwIDogUGl4bWFwKSB7XHJcbiAgICAgIHRoaXMuX3BpeG1hcCAgICA9IHBpeG1hcDtcclxuICAgICAgdGhpcy5fZ2wgICAgICAgID0gbnVsbDtcclxuICAgICAgdGhpcy5fZ2xUZXh0dXJlID0gbnVsbDtcclxuICAgICAgdGhpcy5fZ2xCdWZmZXIgID0gbnVsbDtcclxuICAgICAgdGhpcy5fYnVmZmVyICAgID0gbmV3IEZsb2F0MzJBcnJheSgxMik7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgaWYgKHRoaXMuX2dsICE9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveUdsVGV4dHVyZSgpO1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lHbEJ1ZmZlcigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGVzdHJveUdsVGV4dHVyZSgpIHtcclxuICAgICAgaWYgKHRoaXMuX2dsVGV4dHVyZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX2dsLmRlbGV0ZVRleHR1cmUodGhpcy5fZ2xUZXh0dXJlKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9nbFRleHR1cmUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2Rlc3Ryb3lHbEJ1ZmZlcigpIHtcclxuICAgICAgaWYgKHRoaXMuX2dsQnVmZmVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5fZ2wuZGVsZXRlQnVmZmVyKHRoaXMuX2dsVGV4dHVyZSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fZ2xCdWZmZXIgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgdGhpcy5fZ2wgPSBnbDtcclxuICAgICAgdGhpcy5fZ2VuZXJhdGVHbEJ1ZmZlcigpO1xyXG4gICAgICB0aGlzLmJpbmQobmV3IFJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpKTtcclxuICAgICAgdGhpcy5fZ2VuZXJhdGVHbFRleHR1cmUoKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX2dsVGV4dHVyZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgaWYgKCF0aGlzLl9nbFRleHR1cmUpIHtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlKGdsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmQocmVjdDogUmVjdCkge1xyXG4gICAgICB0aGlzLl9iaW5kR2xCdWZmZXIodGhpcy5fYnVmZmVyLCByZWN0KTtcclxuICAgICAgdGhpcy5fYmluZEdsVGV4dHVyZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRBbGwocmVjdHMgOiBSZWN0W10pIHtcclxuICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkocmVjdHMubGVuZ3RoICogMTIpO1xyXG4gICAgICB2YXIgbGVuZ3RoID0gcmVjdHMubGVuZ3RoO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVSZWN0KGJ1ZmZlciwgcmVjdHNbaV0sIGkgKiAxMik7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fYmluZEdsVGV4dHVyZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dlbmVyYXRlR2xUZXh0dXJlKCkge1xyXG4gICAgICB2YXIgZ2wgPSB0aGlzLl9nbDtcclxuICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fZ2xUZXh0dXJlKTtcclxuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XHJcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcclxuICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCB0aGlzLl9waXhtYXAuY2FudmFzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZW5lcmF0ZUdsQnVmZmVyKCkge1xyXG4gICAgICB0aGlzLl9nbEJ1ZmZlciA9IHRoaXMuX2dsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2JpbmRHbEJ1ZmZlcihidWZmZXI6IEZsb2F0MzJBcnJheSwgcmVjdDogUmVjdCkge1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZVJlY3QoYnVmZmVyLCByZWN0KTtcclxuICAgICAgdGhpcy5fZ2wuYmluZEJ1ZmZlcih0aGlzLl9nbC5BUlJBWV9CVUZGRVIsIHRoaXMuX2dsQnVmZmVyKTtcclxuICAgICAgdGhpcy5fZ2wuYnVmZmVyRGF0YSh0aGlzLl9nbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlciwgdGhpcy5fZ2wuU1RBVElDX0RSQVcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2JpbmRHbFRleHR1cmUoKSB7XHJcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xyXG4gICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl9nbFRleHR1cmUpO1xyXG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcclxuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcclxuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlUmVjdChidWZmZXI6IEZsb2F0MzJBcnJheSwgcmVjdCA6IFJlY3QsIG9mZnNldDogbnVtYmVyID0gMCkge1xyXG4gICAgICB2YXIgeCA9IHJlY3QueCAgICAgIC8gdGhpcy53aWR0aCwgeSA9IHJlY3QueSAgICAgIC8gdGhpcy5oZWlnaHQ7XHJcbiAgICAgIHZhciB3ID0gcmVjdC53aWR0aCAgLyB0aGlzLndpZHRoLCBoID0gcmVjdC5oZWlnaHQgLyB0aGlzLmhlaWdodDtcclxuICAgICAgYnVmZmVyW29mZnNldCArIDBdID0gYnVmZmVyW29mZnNldCArIDRdID0gYnVmZmVyW29mZnNldCArICA2XSA9IHg7XHJcbiAgICAgIGJ1ZmZlcltvZmZzZXQgKyAxXSA9IGJ1ZmZlcltvZmZzZXQgKyAzXSA9IGJ1ZmZlcltvZmZzZXQgKyAgOV0gPSB5O1xyXG4gICAgICBidWZmZXJbb2Zmc2V0ICsgMl0gPSBidWZmZXJbb2Zmc2V0ICsgOF0gPSBidWZmZXJbb2Zmc2V0ICsgMTBdID0gdyArIHg7XHJcbiAgICAgIGJ1ZmZlcltvZmZzZXQgKyA1XSA9IGJ1ZmZlcltvZmZzZXQgKyA3XSA9IGJ1ZmZlcltvZmZzZXQgKyAxMV0gPSBoICsgeTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2lkdGgoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9waXhtYXAud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhlaWdodCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3BpeG1hcC5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLmdyYXBoaWNzIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIFRvbmUgZXh0ZW5kcyBtYXRoLlZlY3RvcjQge1xyXG5cclxuICAgIGdldCBbMF0oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBbMF0odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVswXSA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoLTI1NSwgdmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgWzFdKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVsxXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgWzFdKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbMV0gPSBNYXRoLm1pbigyNTUsIE1hdGgubWF4KC0yNTUsIHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFsyXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMl07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFsyXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzJdID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgtMjU1LCB2YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBbM10oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhWzNdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByZWQoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHJlZCh2YWx1ZSkge1xyXG4gICAgICB0aGlzLnIgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZ3JlZW4oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmc7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGdyZWVuKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuZyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBibHVlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5iO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBibHVlKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuYiA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBncmF5KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5hO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBncmF5KHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuYSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBncmV5KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5hO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBncmV5KHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuYSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBbM10odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVszXSA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgdmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IFJBTkRPTSgpIHtcclxuICAgICAgdmFyIHJlZCAgID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNTEyIC0gMjU1KTtcclxuICAgICAgdmFyIGdyZWVuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNTEyIC0gMjU1KTtcclxuICAgICAgdmFyIGJsdWUgID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNTEyIC0gMjU1KTtcclxuICAgICAgdmFyIGdyYXkgID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KTtcclxuICAgICAgcmV0dXJuIG5ldyBUb25lKHJlZCwgZ3JlZW4sIGJsdWUsIGdyYXkpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL1JlbmRlci50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUuZ3JhcGhpY3Mge1xyXG5cclxuICBleHBvcnQgY2xhc3MgV2ViR0xSZW5kZXIgZXh0ZW5kcyBSZW5kZXIge1xyXG5cclxuICAgIHByaXZhdGUgX2dsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XHJcblxyXG4gICAgY29uc3RydWN0b3Iod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgIHRoaXMuX2dsID0gPFdlYkdMUmVuZGVyaW5nQ29udGV4dD50aGlzLmNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpO1xyXG4gICAgICBpZiAoIXRoaXMuX2dsKSB7XHJcbiAgICAgICAgdGhpcy5fZ2wgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXRoaXMuX2dsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91ciBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBXZWJHTC5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgZ2woKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9nbDtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIob2JqZWN0OiBSZW5kZXJPYmplY3QpIHtcclxuICAgICAgb2JqZWN0LnJlbmRlcih0aGlzLl9nbCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLm1hdGgge1xyXG5cclxuICBleHBvcnQgY2xhc3MgTWF0cml4MiB7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9kYXRhOiBGbG9hdDMyQXJyYXk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHRoaXMuX2RhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHdpZHRoKCkge1xyXG4gICAgICByZXR1cm4gMjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGVpZ2h0KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGF0YSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WycwJ10oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFsnMCddKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbMF0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRbJzEnXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMV07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WycxJ10odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVsxXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFsnMiddKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVsyXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRbJzInXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzJdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WyczJ10oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhWzNdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFsnMyddKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbM10gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBhdCh4Om51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzW3ggJSB0aGlzLndpZHRoICsgTWF0aC5mbG9vcih5IC8gdGhpcy53aWR0aCldO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCh4Om51bWJlciwgeTogbnVtYmVyLCB2YWx1ZTpudW1iZXIpIHtcclxuICAgICAgdGhpc1t4ICUgdGhpcy53aWR0aCArIE1hdGguZmxvb3IoeSAvIHRoaXMud2lkdGgpXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvcHlGcm9tKG1hdDpNYXRyaXgyKSB7XHJcbiAgICAgIHZhciBsZW5ndGggPSB0aGlzLndpZHRoICogdGhpcy5oZWlnaHQ7XHJcbiAgICAgIHZhciBhID0gdGhpcy5kYXRhO1xyXG4gICAgICB2YXIgYiA9IG1hdC5kYXRhO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgYVtpXSA9IGJbaV07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgY29weVRvKG1hdDpNYXRyaXgyKSB7XHJcbiAgICAgIHJldHVybiBtYXQuY29weUZyb20odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBJREVOVElUWSgpIHtcclxuICAgICAgdmFyIG1hdCA9IG5ldyBNYXRyaXgyKCk7XHJcbiAgICAgIG1hdFswXSA9IG1hdFszXSA9IDE7XHJcbiAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vTWF0cml4Mi50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUubWF0aCB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBNYXRyaXgzIGV4dGVuZHMgTWF0cml4MiB7XHJcblxyXG4gICAgZ2V0Wyc0J10oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhWzRdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFsnNCddKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbNF0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRbJzUnXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbNV07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Wyc1J10odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVs1XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFsnNiddKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVs2XTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRbJzYnXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzZdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Wyc3J10oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhWzddO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFsnNyddKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbN10gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBtdWwob3RoZXI6TWF0cml4Mykge1xyXG4gICAgICB2YXIgYSA9IHRoaXMuZGF0YTtcclxuICAgICAgdmFyIGIgPSBvdGhlci5kYXRhO1xyXG4gICAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXTtcclxuICAgICAgdmFyIGExMCA9IGFbM10sIGExMSA9IGFbNF0sIGExMiA9IGFbNV07XHJcbiAgICAgIHZhciBhMjAgPSBhWzZdLCBhMjEgPSBhWzddLCBhMjIgPSBhWzhdO1xyXG4gICAgICB2YXIgYjAwID0gYlswXSwgYjAxID0gYlsxXSwgYjAyID0gYlsyXTtcclxuICAgICAgdmFyIGIxMCA9IGJbM10sIGIxMSA9IGJbNF0sIGIxMiA9IGJbNV07XHJcbiAgICAgIHZhciBiMjAgPSBiWzZdLCBiMjEgPSBiWzddLCBiMjIgPSBiWzhdO1xyXG4gICAgICBhWzBdID0gYTAwICogYjAwICsgYTAxICogYjEwICsgYTAyICogYjIwO1xyXG4gICAgICBhWzFdID0gYTAwICogYjAxICsgYTAxICogYjExICsgYTAyICogYjIxO1xyXG4gICAgICBhWzJdID0gYTAwICogYjAyICsgYTAxICogYjEyICsgYTAyICogYjIyO1xyXG4gICAgICBhWzNdID0gYTEwICogYjAwICsgYTExICogYjEwICsgYTEyICogYjIwO1xyXG4gICAgICBhWzRdID0gYTEwICogYjAxICsgYTExICogYjExICsgYTEyICogYjIxO1xyXG4gICAgICBhWzVdID0gYTEwICogYjAyICsgYTExICogYjEyICsgYTEyICogYjIyO1xyXG4gICAgICBhWzZdID0gYTIwICogYjAwICsgYTIxICogYjEwICsgYTIyICogYjIwO1xyXG4gICAgICBhWzddID0gYTIwICogYjAxICsgYTIxICogYjExICsgYTIyICogYjIxO1xyXG4gICAgICBhWzhdID0gYTIwICogYjAyICsgYTIxICogYjEyICsgYTIyICogYjIyO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2xhdGUoeDpudW1iZXIsIHk6bnVtYmVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm11bChNYXRyaXgzLnRyYW5zbGF0aW9uKHgsIHkpKTtcclxuICAgIH1cclxuXHJcbiAgICByb3RhdGUoYW5nbGU6bnVtYmVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm11bChNYXRyaXgzLnJvdGF0aW9uKGFuZ2xlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2NhbGUoeDpudW1iZXIsIHk6bnVtYmVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm11bChNYXRyaXgzLnNjYWxlKHgsIHkpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IElERU5USVRZKCkge1xyXG4gICAgICB2YXIgbWF0ID0gbmV3IE1hdHJpeDMoKTtcclxuICAgICAgdmFyIGRhdGEgPSBtYXQuZGF0YTtcclxuICAgICAgZGF0YVswXSA9IGRhdGFbNF0gPSBkYXRhWzhdID0gMTtcclxuICAgICAgcmV0dXJuIG1hdDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdHJhbnNsYXRpb24oeDpudW1iZXIsIHk6bnVtYmVyKSB7XHJcbiAgICAgIHZhciBtYXQgPSBuZXcgTWF0cml4MygpO1xyXG4gICAgICB2YXIgZGF0YSA9IG1hdC5kYXRhO1xyXG4gICAgICBkYXRhWzBdID0gZGF0YVs0XSA9IGRhdGFbOF0gPSAxO1xyXG4gICAgICBkYXRhWzZdID0geDtcclxuICAgICAgZGF0YVs3XSA9IHk7XHJcbiAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJvdGF0aW9uKGFuZ2xlOm51bWJlcikge1xyXG4gICAgICB2YXIgbWF0ID0gbmV3IE1hdHJpeDMoKTtcclxuICAgICAgdmFyIGRhdGEgPSBtYXQuZGF0YTtcclxuICAgICAgdmFyIGMgPSBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICAgIHZhciBzID0gTWF0aC5zaW4oYW5nbGUpO1xyXG4gICAgICBkYXRhWzBdID0gZGF0YVs0XSA9IGM7XHJcbiAgICAgIGRhdGFbMV0gPSAtcztcclxuICAgICAgZGF0YVszXSA9IHM7XHJcbiAgICAgIGRhdGFbOF0gPSAxO1xyXG4gICAgICByZXR1cm4gbWF0O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzY2FsZSh4Om51bWJlciwgeTpudW1iZXIpIHtcclxuICAgICAgdmFyIG1hdCA9IG5ldyBNYXRyaXgzKCk7XHJcbiAgICAgIHZhciBkYXRhID0gbWF0LmRhdGE7XHJcbiAgICAgIGRhdGFbMF0gPSB4O1xyXG4gICAgICBkYXRhWzRdID0geTtcclxuICAgICAgZGF0YVs4XSA9IDE7XHJcbiAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHByb2plY3Rpb24odzpudW1iZXIsIGg6bnVtYmVyKSB7XHJcbiAgICAgIHZhciBtYXQgPSBuZXcgTWF0cml4MygpO1xyXG4gICAgICB2YXIgZGF0YSA9IG1hdC5kYXRhO1xyXG4gICAgICBkYXRhWzBdID0gMiAvIHc7XHJcbiAgICAgIGRhdGFbNF0gPSAtMiAvIGg7XHJcbiAgICAgIGRhdGFbNl0gPSAtMTtcclxuICAgICAgZGF0YVs3XSA9IG1hdFs4XSA9IDE7XHJcbiAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vTWF0cml4My50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUubWF0aCB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBNYXRyaXg0IGV4dGVuZHMgTWF0cml4MyB7XHJcblxyXG4gICAgZ2V0Wyc4J10oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhWzhdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFsnOCddKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbOF0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRbJzknXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbOV07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Wyc5J10odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVs5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFsnMTAnXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMTBdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFsnMTAnXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzEwXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFsnMTEnXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMTFdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFsnMTEnXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzExXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFsnMTInXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMTJdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFsnMTInXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzEyXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFsnMTMnXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMTNdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFsnMTMnXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzEzXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFsnMTQnXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMTRdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFsnMTQnXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzE0XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFsnMTUnXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMTVdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFsnMTUnXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzE1XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgSURFTlRJVFkoKSB7XHJcbiAgICAgIHZhciBtYXQgPSBuZXcgTWF0cml4NCgpO1xyXG4gICAgICB2YXIgZGF0YSA9IG1hdC5kYXRhO1xyXG4gICAgICBkYXRhWzBdID0gZGF0YVs1XSA9IGRhdGFbMTBdID0gZGF0YVsxNV0gPSAxO1xyXG4gICAgICByZXR1cm4gbWF0O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0cmFuc2xhdGlvbih4Om51bWJlciwgeTpudW1iZXIsIHo6bnVtYmVyPTApIHtcclxuICAgICAgdmFyIG1hdCA9IHRoaXMuSURFTlRJVFk7XHJcbiAgICAgIHZhciBkYXRhID0gbWF0LmRhdGE7XHJcbiAgICAgIGRhdGFbMTJdID0geDtcclxuICAgICAgZGF0YVsxM10gPSB5O1xyXG4gICAgICBkYXRhWzE0XSA9IHo7XHJcbiAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHhSb3RhdGlvbihhbmdsZTpudW1iZXIpIHtcclxuICAgICAgdmFyIGMgICAgPSBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICAgIHZhciBzICAgID0gTWF0aC5zaW4oYW5nbGUpO1xyXG4gICAgICB2YXIgbWF0ICA9IHRoaXMuSURFTlRJVFk7XHJcbiAgICAgIHZhciBkYXRhID0gbWF0LmRhdGE7XHJcbiAgICAgIGRhdGFbNV0gID0gZGF0YVsxMF0gPSBjO1xyXG4gICAgICBkYXRhWzZdICA9IHM7XHJcbiAgICAgIGRhdGFbOV0gID0gLXM7XHJcbiAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyB5Um90YXRpb24oYW5nbGU6bnVtYmVyKSB7XHJcbiAgICAgIHZhciBjID0gTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgICB2YXIgcyA9IE1hdGguc2luKGFuZ2xlKTtcclxuICAgICAgdmFyIG1hdCAgPSB0aGlzLklERU5USVRZO1xyXG4gICAgICB2YXIgZGF0YSA9IG1hdC5kYXRhO1xyXG4gICAgICBkYXRhWzBdICA9IGM7XHJcbiAgICAgIGRhdGFbMl0gID0gLXM7XHJcbiAgICAgIGRhdGFbOF0gID0gcztcclxuICAgICAgZGF0YVsxMF0gPSBjO1xyXG4gICAgICByZXR1cm4gbWF0O1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgelJvdGF0aW9uIChhbmdsZTpudW1iZXIpIHtcclxuICAgICAgdmFyIGMgPSBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICAgIHZhciBzID0gTWF0aC5zaW4oYW5nbGUpO1xyXG4gICAgICB2YXIgbWF0ICA9IHRoaXMuSURFTlRJVFk7XHJcbiAgICAgIHZhciBkYXRhID0gbWF0LmRhdGE7XHJcbiAgICAgIGRhdGFbMF0gPSBkYXRhWzVdID0gYztcclxuICAgICAgZGF0YVsxXSA9IHM7XHJcbiAgICAgIGRhdGFbNF0gPSAtcztcclxuICAgICAgcmV0dXJuIG1hdDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcm90YXRpb24oYW5nbGU6bnVtYmVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnpSb3RhdGlvbihhbmdsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNjYWxlKHg6bnVtYmVyLCB5Om51bWJlciwgej0xKSB7XHJcbiAgICAgIHZhciBtYXQgID0gdGhpcy5JREVOVElUWTtcclxuICAgICAgdmFyIGRhdGEgPSBtYXQuZGF0YTtcclxuICAgICAgZGF0YVswXSAgPSB4O1xyXG4gICAgICBkYXRhWzVdICA9IHk7XHJcbiAgICAgIGRhdGFbMTBdID0gejtcclxuICAgICAgcmV0dXJuIG1hdDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY2FtZXJhKGNhbTogbmUuc2NlbmUuQ2FtZXJhKSB7XHJcbiAgICAgICAgdmFyIG1hdCA9IG5ldyBNYXRyaXg0KCk7XHJcbiAgICAgICAgcmV0dXJuIG1hdC5jYW1lcmEoY2FtKTtcclxuICAgIH1cclxuXHJcbiAgICBjYW1lcmEoY2FtOiBuZS5zY2VuZS5DYW1lcmEpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubG9va0F0KGNhbS5vcmlnaW4sIGNhbS5kZXN0aW5hdGlvbiwgY2FtLnVwKTtcclxuICAgIH1cclxuXHJcbiAgICBsb29rQXQoZnJvbTogVmVjdG9yMywgdG86IFZlY3RvcjMsIHVwOiBWZWN0b3IzKSB7XHJcbiAgICAgIHZhciBwb3MgPSBmcm9tLmNsb25lKCk7XHJcbiAgICAgIHZhciB6QXhpcyA9IHBvcy5zdWIodG8pLm5vcm1hbGl6ZSgpO1xyXG4gICAgICB2YXIgeEF4aXMgPSB1cC5jbG9uZSgpLmNyb3NzKHpBeGlzKTtcclxuICAgICAgdmFyIHlBeGlzID0gekF4aXMuY2xvbmUoKS5jcm9zcyh4QXhpcyk7XHJcbiAgICAgIHZhciBkID0gdGhpcy5kYXRhLCBkeCA9IHhBeGlzLmRhdGEsIGR5ID0geUF4aXMuZGF0YSwgZHogPSB6QXhpcy5kYXRhLCBwZCA9IHBvcy5kYXRhO1xyXG4gICAgICBkWzBdICA9IGR4WzBdOyBkWzFdICA9IGR4WzFdOyBkWzJdICA9IGR4WzJdOyBkWzNdICA9IDA7XHJcbiAgICAgIGRbNF0gID0gZHlbMF07IGRbNV0gID0gZHlbMV07IGRbNl0gID0gZHlbMl07IGRbN10gID0gMDtcclxuICAgICAgZFs4XSAgPSBkelswXTsgZFs5XSAgPSBkelsxXTsgZFsxMF0gPSBkelsyXTsgZFsxMV0gPSAwO1xyXG4gICAgICBkWzEyXSA9IHBkWzBdOyBkWzEzXSA9IHBkWzFdOyBkWzE0XSA9IHBkWzJdOyBkWzE1XSA9IDA7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zbGF0ZSh4Om51bWJlciwgeTpudW1iZXIsIHo9MCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5tdWwoTWF0cml4NC50cmFuc2xhdGlvbih4LCB5LCB6KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcm90YXRlKGFuZ2xlOm51bWJlcikge1xyXG4gICAgICByZXR1cm4gdGhpcy56Um90YXRlKGFuZ2xlKTtcclxuICAgIH1cclxuXHJcbiAgICB4Um90YXRlKGFuZ2xlOm51bWJlcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5tdWwoTWF0cml4NC54Um90YXRpb24oYW5nbGUpKTtcclxuICAgIH1cclxuXHJcbiAgICB5Um90YXRlKGFuZ2xlOm51bWJlcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5tdWwoTWF0cml4NC55Um90YXRpb24oYW5nbGUpKTtcclxuICAgIH1cclxuXHJcbiAgICB6Um90YXRlKGFuZ2xlOm51bWJlcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5tdWwoTWF0cml4NC56Um90YXRpb24oYW5nbGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBzY2FsZSh4Om51bWJlciwgeTpudW1iZXIsIHo9MSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5tdWwoTWF0cml4NC5zY2FsZSh4LCB5LCB6KSk7XHJcbiAgICB9XHJcblxyXG4gICAgbXVsKG90aGVyOk1hdHJpeDQpIHtcclxuICAgICAgdmFyIGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgIHZhciBiID0gb3RoZXIuZGF0YTtcclxuICAgICAgdmFyIGEwMCA9ICBhWzBdLCBhMDEgPSAgYVsxXSwgYTAyID0gIGFbMl0sIGEwMyA9ICBhWzNdLFxyXG4gICAgICAgICAgYTEwID0gIGFbNF0sIGExMSA9ICBhWzVdLCBhMTIgPSAgYVs2XSwgYTEzID0gIGFbN10sXHJcbiAgICAgICAgICBhMjAgPSAgYVs4XSwgYTIxID0gIGFbOV0sIGEyMiA9IGFbMTBdLCBhMjMgPSBhWzExXSxcclxuICAgICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdO1xyXG4gICAgICB2YXIgYjAwID0gIGJbMF0sIGIwMSA9ICBiWzFdLCBiMDIgPSAgYlsyXSwgYjAzID0gIGJbM10sXHJcbiAgICAgICAgICBiMTAgPSAgYls0XSwgYjExID0gIGJbNV0sIGIxMiA9ICBiWzZdLCBiMTMgPSAgYls3XSxcclxuICAgICAgICAgIGIyMCA9ICBiWzhdLCBiMjEgPSAgYls5XSwgYjIyID0gYlsxMF0sIGIyMyA9IGJbMTFdLFxyXG4gICAgICAgICAgYjMwID0gYlsxMl0sIGIzMSA9IGJbMTNdLCBiMzIgPSBiWzE0XSwgYjMzID0gYlsxNV07XHJcblxyXG4gICAgICBhWzBdICA9IGEwMCAqIGIwMCArIGEwMSAqIGIxMCArIGEwMiAqIGIyMCArIGEwMyAqIGIzMDtcclxuICAgICAgYVsxXSAgPSBhMDAgKiBiMDEgKyBhMDEgKiBiMTEgKyBhMDIgKiBiMjEgKyBhMDMgKiBiMzE7XHJcbiAgICAgIGFbMl0gID0gYTAwICogYjAyICsgYTAxICogYjEyICsgYTAyICogYjIyICsgYTAzICogYjMyO1xyXG4gICAgICBhWzNdICA9IGEwMCAqIGIwMyArIGEwMSAqIGIxMyArIGEwMiAqIGIyMyArIGEwMyAqIGIzMztcclxuICAgICAgYVs0XSAgPSBhMTAgKiBiMDAgKyBhMTEgKiBiMTAgKyBhMTIgKiBiMjAgKyBhMTMgKiBiMzA7XHJcbiAgICAgIGFbNV0gID0gYTEwICogYjAxICsgYTExICogYjExICsgYTEyICogYjIxICsgYTEzICogYjMxO1xyXG4gICAgICBhWzZdICA9IGExMCAqIGIwMiArIGExMSAqIGIxMiArIGExMiAqIGIyMiArIGExMyAqIGIzMjtcclxuICAgICAgYVs3XSAgPSBhMTAgKiBiMDMgKyBhMTEgKiBiMTMgKyBhMTIgKiBiMjMgKyBhMTMgKiBiMzM7XHJcbiAgICAgIGFbOF0gID0gYTIwICogYjAwICsgYTIxICogYjEwICsgYTIyICogYjIwICsgYTIzICogYjMwO1xyXG4gICAgICBhWzldICA9IGEyMCAqIGIwMSArIGEyMSAqIGIxMSArIGEyMiAqIGIyMSArIGEyMyAqIGIzMTtcclxuICAgICAgYVsxMF0gPSBhMjAgKiBiMDIgKyBhMjEgKiBiMTIgKyBhMjIgKiBiMjIgKyBhMjMgKiBiMzI7XHJcbiAgICAgIGFbMTFdID0gYTIwICogYjAzICsgYTIxICogYjEzICsgYTIyICogYjIzICsgYTIzICogYjMzO1xyXG4gICAgICBhWzEyXSA9IGEzMCAqIGIwMCArIGEzMSAqIGIxMCArIGEzMiAqIGIyMCArIGEzMyAqIGIzMDtcclxuICAgICAgYVsxM10gPSBhMzAgKiBiMDEgKyBhMzEgKiBiMTEgKyBhMzIgKiBiMjEgKyBhMzMgKiBiMzE7XHJcbiAgICAgIGFbMTRdID0gYTMwICogYjAyICsgYTMxICogYjEyICsgYTMyICogYjIyICsgYTMzICogYjMyO1xyXG4gICAgICBhWzE1XSA9IGEzMCAqIGIwMyArIGEzMSAqIGIxMyArIGEzMiAqIGIyMyArIGEzMyAqIGIzMztcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgaW52ZXJzZSgpIHtcclxuICAgICAgdmFyIG0gPSB0aGlzLmRhdGE7XHJcbiAgICAgIHZhciBtMDAgPSBtWzBdLCBtMDEgPSBtWzFdLCBtMDIgPSBtWzJdLCBtMDMgPSBtWzNdO1xyXG4gICAgICB2YXIgbTEwID0gbVs0XSwgbTExID0gbVs1XSwgbTEyID0gbVs2XSwgbTEzID0gbVs3XTtcclxuICAgICAgdmFyIG0yMCA9IG1bOF0sIG0yMSA9IG1bOV0sIG0yMiA9IG1bMTBdLCBtMjMgPSBtWzExXTtcclxuICAgICAgdmFyIG0zMCA9IG1bMTJdLCBtMzEgPSBtWzEzXSwgbTMyID0gbVsxNF0sIG0zMyA9IG1bMTVdO1xyXG4gICAgICB2YXIgdDAgID0gbTIyICogbTMzLCB0MSAgPSBtMzIgKiBtMjMsIHQyICA9IG0xMiAqIG0zMywgdDMgID0gbTMyICogbTEzO1xyXG4gICAgICB2YXIgdDQgID0gbTEyICogbTIzLCB0NSAgPSBtMjIgKiBtMTMsIHQ2ICA9IG0wMiAqIG0zMywgdDcgID0gbTMyICogbTAzO1xyXG4gICAgICB2YXIgdDggID0gbTAyICogbTIzLCB0OSAgPSBtMjIgKiBtMDMsIHQxMCA9IG0wMiAqIG0xMywgdDExID0gbTEyICogbTAzO1xyXG4gICAgICB2YXIgdDEyID0gbTIwICogbTMxLCB0MTMgPSBtMzAgKiBtMjEsIHQxNCA9IG0xMCAqIG0zMSwgdDE1ID0gbTMwICogbTExO1xyXG4gICAgICB2YXIgdDE2ID0gbTEwICogbTIxLCB0MTcgPSBtMjAgKiBtMTEsIHQxOCA9IG0wMCAqIG0zMSwgdDE5ID0gbTMwICogbTAxO1xyXG4gICAgICB2YXIgdDIwID0gbTAwICogbTIxLCB0MjEgPSBtMjAgKiBtMDEsIHQyMiA9IG0wMCAqIG0xMSwgdDIzID0gbTEwICogbTAxO1xyXG5cclxuICAgICAgdmFyIHQwID0gKHQwICogbTExICsgdDMgKiBtMjEgKyB0NCAqIG0zMSkgLVxyXG4gICAgICAgICAgKHQxICogbTExICsgdDIgKiBtMjEgKyB0NSAqIG0zMSk7XHJcbiAgICAgIHZhciB0MSA9ICh0MSAqIG0wMSArIHQ2ICogbTIxICsgdDkgKiBtMzEpIC1cclxuICAgICAgICAgICh0MCAqIG0wMSArIHQ3ICogbTIxICsgdDggKiBtMzEpO1xyXG4gICAgICB2YXIgdDIgPSAodDIgKiBtMDEgKyB0NyAqIG0xMSArIHQxMCAqIG0zMSkgLVxyXG4gICAgICAgICAgKHQzICogbTAxICsgdDYgKiBtMTEgKyB0MTEgKiBtMzEpO1xyXG4gICAgICB2YXIgdDMgPSAodDUgKiBtMDEgKyB0OCAqIG0xMSArIHQxMSAqIG0yMSkgLVxyXG4gICAgICAgICAgKHQ0ICogbTAxICsgdDkgKiBtMTEgKyB0MTAgKiBtMjEpO1xyXG5cclxuICAgICAgdmFyIGQgPSAxLjAgLyAobTAwICogdDAgKyBtMTAgKiB0MSArIG0yMCAqIHQyICsgbTMwICogdDMpO1xyXG5cclxuICAgICAgbVswXSAgPSBkICogdDA7IG1bMV0gID0gZCAqIHQxOyBtWzJdICA9IGQgKiB0MjsgbVszXSAgPSBkICogdDM7XHJcbiAgICAgIG1bNF0gID0gZCAqICgodDEgKiBtMTAgKyB0MiAqIG0yMCArIHQ1ICogbTMwKSAtICh0MCAqIG0xMCArIHQzICogbTIwICsgdDQgKiBtMzApKTtcclxuICAgICAgbVs1XSAgPSBkICogKCh0MCAqIG0wMCArIHQ3ICogbTIwICsgdDggKiBtMzApIC0gKHQxICogbTAwICsgdDYgKiBtMjAgKyB0OSAqIG0zMCkpO1xyXG4gICAgICBtWzZdICA9IGQgKiAoKHQzICogbTAwICsgdDYgKiBtMTAgKyB0MTEgKiBtMzApIC0gKHQyICogbTAwICsgdDcgKiBtMTAgKyB0MTAgKiBtMzApKTtcclxuICAgICAgbVs3XSAgPSBkICogKCh0NCAqIG0wMCArIHQ5ICogbTEwICsgdDEwICogbTIwKSAtICh0NSAqIG0wMCArIHQ4ICogbTEwICsgdDExICogbTIwKSk7XHJcbiAgICAgIG1bOF0gID0gZCAqICgodDEyICogbTEzICsgdDE1ICogbTIzICsgdDE2ICogbTMzKSAtICh0MTMgKiBtMTMgKyB0MTQgKiBtMjMgKyB0MTcgKiBtMzMpKTtcclxuICAgICAgbVs5XSAgPSBkICogKCh0MTMgKiBtMDMgKyB0MTggKiBtMjMgKyB0MjEgKiBtMzMpIC0gKHQxMiAqIG0wMyArIHQxOSAqIG0yMyArIHQyMCAqIG0zMykpO1xyXG4gICAgICBtWzEwXSA9IGQgKiAoKHQxNCAqIG0wMyArIHQxOSAqIG0xMyArIHQyMiAqIG0zMykgLSAodDE1ICogbTAzICsgdDE4ICogbTEzICsgdDIzICogbTMzKSk7XHJcbiAgICAgIG1bMTFdID0gZCAqICgodDE3ICogbTAzICsgdDIwICogbTEzICsgdDIzICogbTIzKSAtICh0MTYgKiBtMDMgKyB0MjEgKiBtMTMgKyB0MjIgKiBtMjMpKTtcclxuICAgICAgbVsxMl0gPSBkICogKCh0MTQgKiBtMjIgKyB0MTcgKiBtMzIgKyB0MTMgKiBtMTIpIC0gKHQxNiAqIG0zMiArIHQxMiAqIG0xMiArIHQxNSAqIG0yMikpO1xyXG4gICAgICBtWzEzXSA9IGQgKiAoKHQyMCAqIG0zMiArIHQxMiAqIG0wMiArIHQxOSAqIG0yMikgLSAodDE4ICogbTIyICsgdDIxICogbTMyICsgdDEzICogbTAyKSk7XHJcbiAgICAgIG1bMTRdID0gZCAqICgodDE4ICogbTEyICsgdDIzICogbTMyICsgdDE1ICogbTAyKSAtICh0MjIgKiBtMzIgKyB0MTQgKiBtMDIgKyB0MTkgKiBtMTIpKTtcclxuICAgICAgbVsxNV0gPSBkICogKCh0MjIgKiBtMjIgKyB0MTYgKiBtMDIgKyB0MjEgKiBtMTIpIC0gKHQyMCAqIG0xMiArIHQyMyAqIG0yMiArIHQxNyAqIG0wMikpO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUubWF0aCB7XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBwZXJtdXRhdG9yKGlucHV0QXJyOiBTdHJpbmdbXSk6IFN0cmluZ1tdW10ge1xyXG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBwZXJtdXRlKGFycjogU3RyaW5nW10sIG1lbW89W10pIHtcclxuICAgICAgdmFyIGN1cjtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjdXIgPSBhcnIuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICByZXN1bHRzLnB1c2gobWVtby5jb25jYXQoY3VyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBlcm11dGUoYXJyLnNsaWNlKCksIG1lbW8uY29uY2F0KGN1cikpO1xyXG4gICAgICAgIGFyci5zcGxpY2UoaSwgMCwgY3VyWzBdKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBlcm11dGUoaW5wdXRBcnIpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLnNjZW5lIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIENhbWVyYSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfb3JpZ2luICAgICAgOiBtYXRoLlZlY3RvcjM7XHJcbiAgICBwcml2YXRlIF9kZXN0aW5hdGlvbiA6IG1hdGguVmVjdG9yMztcclxuICAgIHByaXZhdGUgX3VwICAgICAgICAgIDogbWF0aC5WZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSBfdmlldyAgICAgICAgOiBtYXRoLk1hdHJpeDQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHRoaXMuX29yaWdpbiAgICAgID0gbmV3IG1hdGguVmVjdG9yMygpO1xyXG4gICAgICB0aGlzLl9kZXN0aW5hdGlvbiA9IG5ldyBtYXRoLlZlY3RvcjMoKTtcclxuICAgICAgdGhpcy5fdXAgICAgICAgICAgPSBuZXcgbWF0aC5WZWN0b3IzKCk7XHJcbiAgICAgIHRoaXMuX3ZpZXcgICAgICAgID0gbmV3IG1hdGguTWF0cml4NCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvcmlnaW4oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9vcmlnaW47XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlc3RpbmF0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGVzdGluYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVwKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fdXA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1hdHJpeCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3ZpZXcuY2FtZXJhKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2aWV3KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5tYXRyaXguaW52ZXJzZSgpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIiBtb2R1bGUgbmUuc2NlbmUge1xyXG5cclxuICBleHBvcnQgY2xhc3MgU2NlbmUgaW1wbGVtZW50cyBuZS51dGlscy5FdmVudEhhbmRsZXIge1xyXG5cclxuICAgIHByaXZhdGUgX2V2ZW50TWFuYWdlcjogdXRpbHMuRXZlbnRNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBfbWFuYWdlciAgICAgOiBTY2VuZU1hbmFnZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IobWFuYWdlcjogU2NlbmVNYW5hZ2VyKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50TWFuYWdlciA9IG5ldyB1dGlscy5FdmVudE1hbmFnZXIodGhpcyk7XHJcbiAgICAgIHRoaXMuX21hbmFnZXIgPSBtYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIGRlZmF1bHRFdmVudChuYW1lOiBzdHJpbmcsIGV2ZW50OiBFdmVudCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWFuYWdlcigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX21hbmFnZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGV2ZW50cygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50TWFuYWdlcjtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkKGxvYWRlcjogdXRpbHMuTG9hZGVyKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KGxvYWRlciA6IHV0aWxzLkNhY2hlRmluZGVyKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkZWx0YTogbnVtYmVyKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIm1vZHVsZSBuZS5zY2VuZSB7XHJcblxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgU2NlbmVDbGFzcyB7XHJcbiAgICBuZXcgKG1hbmFnZXIgOiBTY2VuZU1hbmFnZXIpOiBTY2VuZTtcclxuICB9XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBTY2VuZU1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgX3NjZW5lU3RhY2sgOiBTY2VuZUNsYXNzW107XHJcbiAgICBwcml2YXRlIF9sYXN0U2NlbmUgIDogU2NlbmVDbGFzcztcclxuICAgIHByaXZhdGUgX2luc3RhbmNlICAgOiBTY2VuZTtcclxuICAgIHByaXZhdGUgX2xvYWRTY2VuZSAgOiBTY2VuZTtcclxuICAgIHByaXZhdGUgX2lzUmVhZHkgICAgOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRTY2VuZSA6IFNjZW5lQ2xhc3MgPSBudWxsKSB7XHJcbiAgICAgIHRoaXMuX3NjZW5lU3RhY2sgPSBbbnVsbF07XHJcbiAgICAgIHRoaXMuX2xhc3RTY2VuZSAgPSBudWxsO1xyXG4gICAgICB0aGlzLl9pbnN0YW5jZSAgID0gbnVsbDtcclxuICAgICAgdGhpcy5zZXR1cExvYWRTY2VuZShsb2FkU2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldHVwTG9hZFNjZW5lKHNjZW5lOiBTY2VuZUNsYXNzKSB7XHJcbiAgICAgIHRoaXMuX2lzUmVhZHkgPSBmYWxzZTtcclxuICAgICAgdmFyIGxvYWRlciA9IG5ldyB1dGlscy5Mb2FkZXIoKTtcclxuICAgICAgdGhpcy5fbG9hZFNjZW5lICA9IG5ldyAoc2NlbmUgfHwgU2NlbmUpKHRoaXMpO1xyXG4gICAgICB0aGlzLl9pbnN0YW5jZS5sb2FkKGxvYWRlcik7XHJcbiAgICAgIGxvYWRlci5kb25lKCgpID0+IHRoaXMuX2lzUmVhZHkgPSB0cnVlICk7XHJcbiAgICAgIGxvYWRlci5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByZWFkeSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2lzUmVhZHk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjZW5lKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fc2NlbmVTdGFja1t0aGlzLl9zY2VuZVN0YWNrLmxlbmd0aCAtIDFdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBldmVudHMoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSA/IHRoaXMuX2luc3RhbmNlLmV2ZW50cyA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGluc3RhbmNlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ290byhzY2VuZTogU2NlbmVDbGFzcykge1xyXG4gICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgIHRoaXMuY2FsbChzY2VuZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbChzY2VuZSA6IFNjZW5lQ2xhc3MpIHtcclxuICAgICAgdGhpcy5fc2NlbmVTdGFjay5wdXNoKHNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBiYWNrKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgdGhpcy5fc2NlbmVTdGFjayA9IFtudWxsXTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZGVsdGE6IG51bWJlcikge1xyXG4gICAgICBpZiAoIXRoaXMucmVhZHkpIHJldHVybjtcclxuICAgICAgdmFyIHNjZW5lID0gdGhpcy5zY2VuZTtcclxuICAgICAgaWYgKHRoaXMuX2xhc3RTY2VuZSAhPT0gc2NlbmUpIHtcclxuICAgICAgICB0aGlzLl9zd2FwU2NlbmUoc2NlbmUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl91cGRhdGVJbnN0YW5jZShkZWx0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc3dhcFNjZW5lKHNjZW5lOiBTY2VuZUNsYXNzKSB7XHJcbiAgICAgIHRoaXMuX2xhc3RTY2VuZSA9IHNjZW5lO1xyXG4gICAgICB0aGlzLl90ZXJtaW5hdGUoKTtcclxuICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgc2NlbmUodGhpcyk7XHJcbiAgICAgIHZhciBsb2FkZXIgPSBuZXcgdXRpbHMuTG9hZGVyKCk7XHJcbiAgICAgIGxvYWRlci5kb25lKHRoaXMuX2FmdGVyTG9hZC5iaW5kKHRoaXMpKTtcclxuICAgICAgdGhpcy5faW5zdGFuY2UubG9hZChsb2FkZXIpO1xyXG4gICAgICBsb2FkZXIuc3RhcnQoKTtcclxuICAgICAgdGhpcy5fbG9hZFNjZW5lLnN0YXJ0KGxvYWRlci5jYWNoZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYWZ0ZXJMb2FkKGxvYWRlciA6IHV0aWxzLkxvYWRlcikge1xyXG4gICAgICB0aGlzLl9sb2FkU2NlbmUuZGVzdHJveSgpO1xyXG4gICAgICB0aGlzLl9pbnN0YW5jZS5zdGFydChsb2FkZXIuY2FjaGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Rlcm1pbmF0ZSgpIHtcclxuICAgICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XHJcbiAgICAgICAgdGhpcy5faW5zdGFuY2UuZGVzdHJveSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlSW5zdGFuY2UoZGVsdGE6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgdGhpcy5faW5zdGFuY2UudXBkYXRlKGRlbHRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fbG9hZFNjZW5lLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIm1vZHVsZSBuZS51dGlscyB7XHJcblxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgRXZlbnRIYW5kbGVyIHtcclxuICAgIGRlZmF1bHRFdmVudChuYW1lOiBzdHJpbmcsIGV2ZW50OiBFdmVudCk6IGFueTtcclxuICB9XHJcblxyXG4gIGV4cG9ydCBkZWNsYXJlIHR5cGUgRXZlbnRDYWxsYmFjayA9ICh0YXJnZXQ6IEV2ZW50SGFuZGxlciwgZXZlbnQ6IEV2ZW50KSA9PiBhbnk7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBFdmVudE1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgX3RhcmdldCA6IEV2ZW50SGFuZGxlcjtcclxuICAgIHByaXZhdGUgX2V2ZW50cyA6IHsgWyBzOiBzdHJpbmcgXTogRXZlbnRDYWxsYmFja1tdIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IodGFyZ2V0OiBFdmVudEhhbmRsZXIpIHtcclxuICAgICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBvbih0eXBlOnN0cmluZywgY2FsbGJhY2s6RXZlbnRDYWxsYmFjaykge1xyXG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSB0aGlzLl9ldmVudHNbdHlwZV0gfHwgW107XHJcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBvZmYodHlwZTpzdHJpbmcsIGNhbGxiYWNrOkV2ZW50Q2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gdGhpcy5fZXZlbnRzW3R5cGVdIHx8IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGZpcmUodHlwZTpzdHJpbmcsIGV2ZW50OkV2ZW50KSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IHRoaXMuX2V2ZW50c1t0eXBlXSB8fCBbXTtcclxuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgY2FsbGJhY2sodGhpcy5fdGFyZ2V0LCBldmVudCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpIHtcclxuICAgICAgICB0aGlzLl90YXJnZXQuZGVmYXVsdEV2ZW50KHR5cGUsIGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsImRlY2xhcmUgdmFyIG9wZW50eXBlOiBhbnk7XHJcblxyXG5tb2R1bGUgbmUudXRpbHMge1xyXG5cclxuICB2YXIgX3BpeG1hcENhY2hlIDogeyBbIHM6IHN0cmluZyBdOiBncmFwaGljcy5QaXhtYXAgfSA9IHt9O1xyXG4gIHZhciBfZm9udENhY2hlICAgOiB7IFsgczogc3RyaW5nIF06IGFueSB9ICAgICAgICAgICAgID0ge307XHJcbiAgdmFyIF9hdWRpb0NhY2hlICA6IHsgWyBzOiBzdHJpbmddOiBhdWRpby5CdWZmZXIgIH0gICAgPSB7fTtcclxuICB2YXIgX2pzb25DYWNoZSAgIDogeyBbIHM6IHN0cmluZ106IGFueSB9ICAgICAgICAgICAgICA9IHt9O1xyXG5cclxuICB2YXIgY2xzID0gQXVkaW9Db250ZXh0IHx8ICg8YW55PndpbmRvdykuQXVkaW9Db250ZXh0IHx8ICg8YW55PndpbmRvdykud2Via2l0QXVkaW9Db250ZXh0O1xyXG5cclxuICB2YXIgQUMgOiBBdWRpb0NvbnRleHQgPSBudWxsO1xyXG5cclxuICBpZiAoY2xzKSB7XHJcbiAgICBBQyA9IG5ldyBjbHMoKTtcclxuICB9XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBDYWNoZUZpbmRlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IobG9hZGVyOkxvYWRlcikge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwaXhtYXAodXJsOnN0cmluZykge1xyXG4gICAgICByZXR1cm4gX3BpeG1hcENhY2hlW3VybF07XHJcbiAgICB9XHJcblxyXG4gICAgZm9udCh1cmw6c3RyaW5nKSB7XHJcbiAgICAgIHJldHVybiBfZm9udENhY2hlW3VybF07XHJcbiAgICB9XHJcblxyXG4gICAgYXVkaW8odXJsKSB7XHJcbiAgICAgIHJldHVybiBfYXVkaW9DYWNoZVt1cmxdO1xyXG4gICAgfVxyXG5cclxuICAgIGpzb24odXJsKSB7XHJcbiAgICAgIHJldHVybiBfanNvbkNhY2hlW3VybF07XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGRlY2xhcmUgdHlwZSBMb2FkZXJDYWxsYmFjayA9IChsb2FkZXI6IExvYWRlcikgPT4gYW55O1xyXG5cclxuICBleHBvcnQgY2xhc3MgTG9hZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9sb2FkU3RhcnQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF90b0xvYWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2NhbGxiYWNrcyA6IExvYWRlckNhbGxiYWNrW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHRoaXMuX2xvYWRTdGFydCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLl90b0xvYWQgICAgPSAwO1xyXG4gICAgICB0aGlzLl9jYWxsYmFja3MgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBkb25lKGNhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMuX2NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuICAgICAgdGhpcy5fbG9hZFN0YXJ0ID0gdHJ1ZTtcclxuICAgICAgaWYgKHRoaXMuaXNEb25lKCkpIHtcclxuICAgICAgICB0aGlzLmNhbGxEb25lKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgaXNEb25lKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fbG9hZFN0YXJ0ICYmIHRoaXMuX3RvTG9hZCA8PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxEb25lKCkge1xyXG4gICAgICB0aGlzLl9jYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKHRoaXMpKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcGl4bWFwKHVybCkge1xyXG4gICAgICBpZiAoX3BpeG1hcENhY2hlW3VybF0pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgKyt0aGlzLl90b0xvYWQ7XHJcbiAgICAgIHRoaXMuX3ByZXBhcmVJbWFnZSh1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wcmVwYXJlSW1hZ2UodXJsKSB7XHJcbiAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLl9jaGVja0xvYWQoKTtcclxuICAgICAgICBfcGl4bWFwQ2FjaGVbdXJsXSA9IGdyYXBoaWNzLlBpeG1hcC5mcm9tSW1hZ2UoaW1nKTtcclxuICAgICAgfVxyXG4gICAgICBpbWcub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLl9jaGVja0xvYWQoKTtcclxuICAgICAgICBfcGl4bWFwQ2FjaGVbdXJsXSA9IG51bGw7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgQ291bGQgbm90IGxvYWQgaW1hZ2U6ICcke3VybH0nYCk7XHJcbiAgICAgIH1cclxuICAgICAgaW1nLnNyYyA9IHVybDtcclxuICAgIH1cclxuXHJcbiAgICBmb250KHVybCkge1xyXG4gICAgICBpZiAoX2ZvbnRDYWNoZVt1cmxdKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgICsrdGhpcy5fdG9Mb2FkO1xyXG4gICAgICB0aGlzLl9wcmVwYXJlRm9udCh1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wcmVwYXJlRm9udCh1cmwpIHtcclxuICAgICAgb3BlbnR5cGUubG9hZCh1cmwsIChlcnIsIGZvbnQpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBDb3VsZCBub3QgbG9hZCBmb250OiAnJHt1cmx9Jy5cXG4ke2Vycn1gKTtcclxuICAgICAgICAgICBfZm9udENhY2hlW3VybF0gPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIF9mb250Q2FjaGVbdXJsXSA9IGZvbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NoZWNrTG9hZCgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhdWRpbyh1cmwpIHtcclxuICAgICAgaWYgKF9hdWRpb0NhY2hlW3VybF0pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgKyt0aGlzLl90b0xvYWQ7XHJcbiAgICAgIGlmIChBQykge1xyXG4gICAgICAgIHRoaXMuX3ByZXBhcmVXZWJBdWRpb1JlcXVlc3QodXJsKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9wcmVwYXJlTGVnYWN5QXVkaW9SZXF1ZXN0KHVybCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAganNvbih1cmwpIHtcclxuICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xyXG4gICAgICByZXF1ZXN0Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICBfanNvbkNhY2hlW3VybF0gPSAgSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tMb2FkKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmVxdWVzdC5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYENvdWxkIG5vdCBsb2FkIGpzb24gZmlsZTogJyR7dXJsfScuXFxuYCk7XHJcbiAgICAgICAgX2pzb25DYWNoZVt1cmxdID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jaGVja0xvYWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXF1ZXN0LnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBfcHJlcGFyZUxlZ2FjeUF1ZGlvUmVxdWVzdCh1cmwpIHtcclxuICAgICAgdmFyIGF1ZGlvVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcclxuICAgICAgYXVkaW9UYWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIF9hdWRpb0NhY2hlW3VybF0gPSBuZXcgYXVkaW8uTGVnYWN5QnVmZmVyKGF1ZGlvVGFnKTtcclxuICAgICAgICB0aGlzLl9jaGVja0xvYWQoKTtcclxuICAgICAgfVxyXG4gICAgICBhdWRpb1RhZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYENvdWxkIG5vdCBsb2FkIGF1ZGlvIGZpbGU6ICcke3VybH0nLlxcbmApO1xyXG4gICAgICAgIF9hdWRpb0NhY2hlW3VybF0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NoZWNrTG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGF1ZGlvVGFnLnNyYyA9IHVybDtcclxuICAgIH1cclxuXHJcbiAgICBfcHJlcGFyZVdlYkF1ZGlvUmVxdWVzdCh1cmwpIHtcclxuICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xyXG4gICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcbiAgICAgIHJlcXVlc3Qub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIEFDLmRlY29kZUF1ZGlvRGF0YShyZXF1ZXN0LnJlc3BvbnNlLCBmdW5jdGlvbihidWZmZXIpIHtcclxuICAgICAgICAgIF9hdWRpb0NhY2hlW3VybF0gPSBuZXcgYXVkaW8uV2ViQXVkaW9CdWZmZXIoQUMsIGJ1ZmZlcik7XHJcbiAgICAgICAgICB0aGlzLl9jaGVja0xvYWQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgQ291bGQgbm90IGxvYWQgYXVkaW8gZmlsZTogJyR7dXJsfScuXFxuYCk7XHJcbiAgICAgICAgX2F1ZGlvQ2FjaGVbdXJsXSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tMb2FkKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNhY2hlKCkge1xyXG4gICAgICByZXR1cm4gbmV3IENhY2hlRmluZGVyKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jaGVja0xvYWQoKSB7XHJcbiAgICAgIC0tdGhpcy5fdG9Mb2FkO1xyXG4gICAgICBpZiAodGhpcy5pc0RvbmUoKSkge1xyXG4gICAgICAgIHRoaXMuY2FsbERvbmUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjbGVhcigpIHtcclxuICAgICAgdGhpcy5jbGVhclBpeG1hcHMoKTtcclxuICAgICAgdGhpcy5jbGVhckZvbnRzKCk7XHJcbiAgICAgIHRoaXMuY2xlYXJBdWRpbygpO1xyXG4gICAgICB0aGlzLmNsZWFySnNvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjbGVhclBpeG1hcHMoKSB7XHJcbiAgICAgIF9waXhtYXBDYWNoZSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjbGVhckZvbnRzKCkge1xyXG4gICAgICBfZm9udENhY2hlID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNsZWFyQXVkaW8oKSB7XHJcbiAgICAgIF9hdWRpb0NhY2hlID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNsZWFySnNvbigpIHtcclxuICAgICAgX2pzb25DYWNoZSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.opentype = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var TINF_OK = 0;
var TINF_DATA_ERROR = -3;

function Tree() {
  this.table = new Uint16Array(16);   /* table of code length counts */
  this.trans = new Uint16Array(288);  /* code -> symbol translation table */
}

function Data(source, dest) {
  this.source = source;
  this.sourceIndex = 0;
  this.tag = 0;
  this.bitcount = 0;
  
  this.dest = dest;
  this.destLen = 0;
  
  this.ltree = new Tree();  /* dynamic length/symbol tree */
  this.dtree = new Tree();  /* dynamic distance tree */
}

/* --------------------------------------------------- *
 * -- uninitialized global data (static structures) -- *
 * --------------------------------------------------- */

var sltree = new Tree();
var sdtree = new Tree();

/* extra bits and base tables for length codes */
var length_bits = new Uint8Array(30);
var length_base = new Uint16Array(30);

/* extra bits and base tables for distance codes */
var dist_bits = new Uint8Array(30);
var dist_base = new Uint16Array(30);

/* special ordering of code length codes */
var clcidx = new Uint8Array([
  16, 17, 18, 0, 8, 7, 9, 6,
  10, 5, 11, 4, 12, 3, 13, 2,
  14, 1, 15
]);

/* used by tinf_decode_trees, avoids allocations every call */
var code_tree = new Tree();
var lengths = new Uint8Array(288 + 32);

/* ----------------------- *
 * -- utility functions -- *
 * ----------------------- */

/* build extra bits and base tables */
function tinf_build_bits_base(bits, base, delta, first) {
  var i, sum;

  /* build bits table */
  for (i = 0; i < delta; ++i) bits[i] = 0;
  for (i = 0; i < 30 - delta; ++i) bits[i + delta] = i / delta | 0;

  /* build base table */
  for (sum = first, i = 0; i < 30; ++i) {
    base[i] = sum;
    sum += 1 << bits[i];
  }
}

/* build the fixed huffman trees */
function tinf_build_fixed_trees(lt, dt) {
  var i;

  /* build fixed length tree */
  for (i = 0; i < 7; ++i) lt.table[i] = 0;

  lt.table[7] = 24;
  lt.table[8] = 152;
  lt.table[9] = 112;

  for (i = 0; i < 24; ++i) lt.trans[i] = 256 + i;
  for (i = 0; i < 144; ++i) lt.trans[24 + i] = i;
  for (i = 0; i < 8; ++i) lt.trans[24 + 144 + i] = 280 + i;
  for (i = 0; i < 112; ++i) lt.trans[24 + 144 + 8 + i] = 144 + i;

  /* build fixed distance tree */
  for (i = 0; i < 5; ++i) dt.table[i] = 0;

  dt.table[5] = 32;

  for (i = 0; i < 32; ++i) dt.trans[i] = i;
}

/* given an array of code lengths, build a tree */
var offs = new Uint16Array(16);

function tinf_build_tree(t, lengths, off, num) {
  var i, sum;

  /* clear code length count table */
  for (i = 0; i < 16; ++i) t.table[i] = 0;

  /* scan symbol lengths, and sum code length counts */
  for (i = 0; i < num; ++i) t.table[lengths[off + i]]++;

  t.table[0] = 0;

  /* compute offset table for distribution sort */
  for (sum = 0, i = 0; i < 16; ++i) {
    offs[i] = sum;
    sum += t.table[i];
  }

  /* create code->symbol translation table (symbols sorted by code) */
  for (i = 0; i < num; ++i) {
    if (lengths[off + i]) t.trans[offs[lengths[off + i]]++] = i;
  }
}

/* ---------------------- *
 * -- decode functions -- *
 * ---------------------- */

/* get one bit from source stream */
function tinf_getbit(d) {
  /* check if tag is empty */
  if (!d.bitcount--) {
    /* load next tag */
    d.tag = d.source[d.sourceIndex++];
    d.bitcount = 7;
  }

  /* shift bit out of tag */
  var bit = d.tag & 1;
  d.tag >>>= 1;

  return bit;
}

/* read a num bit value from a stream and add base */
function tinf_read_bits(d, num, base) {
  if (!num)
    return base;

  while (d.bitcount < 24) {
    d.tag |= d.source[d.sourceIndex++] << d.bitcount;
    d.bitcount += 8;
  }

  var val = d.tag & (0xffff >>> (16 - num));
  d.tag >>>= num;
  d.bitcount -= num;
  return val + base;
}

/* given a data stream and a tree, decode a symbol */
function tinf_decode_symbol(d, t) {
  while (d.bitcount < 24) {
    d.tag |= d.source[d.sourceIndex++] << d.bitcount;
    d.bitcount += 8;
  }
  
  var sum = 0, cur = 0, len = 0;
  var tag = d.tag;

  /* get more bits while code value is above sum */
  do {
    cur = 2 * cur + (tag & 1);
    tag >>>= 1;
    ++len;

    sum += t.table[len];
    cur -= t.table[len];
  } while (cur >= 0);
  
  d.tag = tag;
  d.bitcount -= len;

  return t.trans[sum + cur];
}

/* given a data stream, decode dynamic trees from it */
function tinf_decode_trees(d, lt, dt) {
  var hlit, hdist, hclen;
  var i, num, length;

  /* get 5 bits HLIT (257-286) */
  hlit = tinf_read_bits(d, 5, 257);

  /* get 5 bits HDIST (1-32) */
  hdist = tinf_read_bits(d, 5, 1);

  /* get 4 bits HCLEN (4-19) */
  hclen = tinf_read_bits(d, 4, 4);

  for (i = 0; i < 19; ++i) lengths[i] = 0;

  /* read code lengths for code length alphabet */
  for (i = 0; i < hclen; ++i) {
    /* get 3 bits code length (0-7) */
    var clen = tinf_read_bits(d, 3, 0);
    lengths[clcidx[i]] = clen;
  }

  /* build code length tree */
  tinf_build_tree(code_tree, lengths, 0, 19);

  /* decode code lengths for the dynamic trees */
  for (num = 0; num < hlit + hdist;) {
    var sym = tinf_decode_symbol(d, code_tree);

    switch (sym) {
      case 16:
        /* copy previous code length 3-6 times (read 2 bits) */
        var prev = lengths[num - 1];
        for (length = tinf_read_bits(d, 2, 3); length; --length) {
          lengths[num++] = prev;
        }
        break;
      case 17:
        /* repeat code length 0 for 3-10 times (read 3 bits) */
        for (length = tinf_read_bits(d, 3, 3); length; --length) {
          lengths[num++] = 0;
        }
        break;
      case 18:
        /* repeat code length 0 for 11-138 times (read 7 bits) */
        for (length = tinf_read_bits(d, 7, 11); length; --length) {
          lengths[num++] = 0;
        }
        break;
      default:
        /* values 0-15 represent the actual code lengths */
        lengths[num++] = sym;
        break;
    }
  }

  /* build dynamic trees */
  tinf_build_tree(lt, lengths, 0, hlit);
  tinf_build_tree(dt, lengths, hlit, hdist);
}

/* ----------------------------- *
 * -- block inflate functions -- *
 * ----------------------------- */

/* given a stream and two trees, inflate a block of data */
function tinf_inflate_block_data(d, lt, dt) {
  while (1) {
    var sym = tinf_decode_symbol(d, lt);

    /* check for end of block */
    if (sym === 256) {
      return TINF_OK;
    }

    if (sym < 256) {
      d.dest[d.destLen++] = sym;
    } else {
      var length, dist, offs;
      var i;

      sym -= 257;

      /* possibly get more bits from length code */
      length = tinf_read_bits(d, length_bits[sym], length_base[sym]);

      dist = tinf_decode_symbol(d, dt);

      /* possibly get more bits from distance code */
      offs = d.destLen - tinf_read_bits(d, dist_bits[dist], dist_base[dist]);

      /* copy match */
      for (i = offs; i < offs + length; ++i) {
        d.dest[d.destLen++] = d.dest[i];
      }
    }
  }
}

/* inflate an uncompressed block of data */
function tinf_inflate_uncompressed_block(d) {
  var length, invlength;
  var i;
  
  /* unread from bitbuffer */
  while (d.bitcount > 8) {
    d.sourceIndex--;
    d.bitcount -= 8;
  }

  /* get length */
  length = d.source[d.sourceIndex + 1];
  length = 256 * length + d.source[d.sourceIndex];

  /* get one's complement of length */
  invlength = d.source[d.sourceIndex + 3];
  invlength = 256 * invlength + d.source[d.sourceIndex + 2];

  /* check length */
  if (length !== (~invlength & 0x0000ffff))
    return TINF_DATA_ERROR;

  d.sourceIndex += 4;

  /* copy block */
  for (i = length; i; --i)
    d.dest[d.destLen++] = d.source[d.sourceIndex++];

  /* make sure we start next block on a byte boundary */
  d.bitcount = 0;

  return TINF_OK;
}

/* inflate stream from source to dest */
function tinf_uncompress(source, dest) {
  var d = new Data(source, dest);
  var bfinal, res;

  do {
    /* read final block flag */
    bfinal = tinf_getbit(d);

    /* read block type (2 bits) */
    btype = tinf_read_bits(d, 2, 0);

    /* decompress block */
    switch (btype) {
      case 0:
        /* decompress uncompressed block */
        res = tinf_inflate_uncompressed_block(d);
        break;
      case 1:
        /* decompress block with fixed huffman trees */
        res = tinf_inflate_block_data(d, sltree, sdtree);
        break;
      case 2:
        /* decompress block with dynamic huffman trees */
        tinf_decode_trees(d, d.ltree, d.dtree);
        res = tinf_inflate_block_data(d, d.ltree, d.dtree);
        break;
      default:
        res = TINF_DATA_ERROR;
    }

    if (res !== TINF_OK)
      throw new Error('Data error');

  } while (!bfinal);

  if (d.destLen < d.dest.length) {
    if (typeof d.dest.slice === 'function')
      return d.dest.slice(0, d.destLen);
    else
      return d.dest.subarray(0, d.destLen);
  }
  
  return d.dest;
}

/* -------------------- *
 * -- initialization -- *
 * -------------------- */

/* build fixed huffman trees */
tinf_build_fixed_trees(sltree, sdtree);

/* build extra bits and base tables */
tinf_build_bits_base(length_bits, length_base, 4, 3);
tinf_build_bits_base(dist_bits, dist_base, 2, 1);

/* fix a special case */
length_bits[28] = 0;
length_base[28] = 258;

module.exports = tinf_uncompress;

},{}],2:[function(require,module,exports){
// Run-time checking of preconditions.

'use strict';

// Precondition function that checks if the given predicate is true.
// If not, it will throw an error.
exports.argument = function(predicate, message) {
    if (!predicate) {
        throw new Error(message);
    }
};

// Precondition function that checks if the given assertion is true.
// If not, it will throw an error.
exports.assert = exports.argument;

},{}],3:[function(require,module,exports){
// Drawing utility functions.

'use strict';

// Draw a line on the given context from point `x1,y1` to point `x2,y2`.
function line(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

exports.line = line;

},{}],4:[function(require,module,exports){
// Glyph encoding

'use strict';

var cffStandardStrings = [
    '.notdef', 'space', 'exclam', 'quotedbl', 'numbersign', 'dollar', 'percent', 'ampersand', 'quoteright',
    'parenleft', 'parenright', 'asterisk', 'plus', 'comma', 'hyphen', 'period', 'slash', 'zero', 'one', 'two',
    'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'colon', 'semicolon', 'less', 'equal', 'greater',
    'question', 'at', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'bracketleft', 'backslash', 'bracketright', 'asciicircum', 'underscore',
    'quoteleft', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'braceleft', 'bar', 'braceright', 'asciitilde', 'exclamdown', 'cent', 'sterling',
    'fraction', 'yen', 'florin', 'section', 'currency', 'quotesingle', 'quotedblleft', 'guillemotleft',
    'guilsinglleft', 'guilsinglright', 'fi', 'fl', 'endash', 'dagger', 'daggerdbl', 'periodcentered', 'paragraph',
    'bullet', 'quotesinglbase', 'quotedblbase', 'quotedblright', 'guillemotright', 'ellipsis', 'perthousand',
    'questiondown', 'grave', 'acute', 'circumflex', 'tilde', 'macron', 'breve', 'dotaccent', 'dieresis', 'ring',
    'cedilla', 'hungarumlaut', 'ogonek', 'caron', 'emdash', 'AE', 'ordfeminine', 'Lslash', 'Oslash', 'OE',
    'ordmasculine', 'ae', 'dotlessi', 'lslash', 'oslash', 'oe', 'germandbls', 'onesuperior', 'logicalnot', 'mu',
    'trademark', 'Eth', 'onehalf', 'plusminus', 'Thorn', 'onequarter', 'divide', 'brokenbar', 'degree', 'thorn',
    'threequarters', 'twosuperior', 'registered', 'minus', 'eth', 'multiply', 'threesuperior', 'copyright',
    'Aacute', 'Acircumflex', 'Adieresis', 'Agrave', 'Aring', 'Atilde', 'Ccedilla', 'Eacute', 'Ecircumflex',
    'Edieresis', 'Egrave', 'Iacute', 'Icircumflex', 'Idieresis', 'Igrave', 'Ntilde', 'Oacute', 'Ocircumflex',
    'Odieresis', 'Ograve', 'Otilde', 'Scaron', 'Uacute', 'Ucircumflex', 'Udieresis', 'Ugrave', 'Yacute',
    'Ydieresis', 'Zcaron', 'aacute', 'acircumflex', 'adieresis', 'agrave', 'aring', 'atilde', 'ccedilla', 'eacute',
    'ecircumflex', 'edieresis', 'egrave', 'iacute', 'icircumflex', 'idieresis', 'igrave', 'ntilde', 'oacute',
    'ocircumflex', 'odieresis', 'ograve', 'otilde', 'scaron', 'uacute', 'ucircumflex', 'udieresis', 'ugrave',
    'yacute', 'ydieresis', 'zcaron', 'exclamsmall', 'Hungarumlautsmall', 'dollaroldstyle', 'dollarsuperior',
    'ampersandsmall', 'Acutesmall', 'parenleftsuperior', 'parenrightsuperior', '266 ff', 'onedotenleader',
    'zerooldstyle', 'oneoldstyle', 'twooldstyle', 'threeoldstyle', 'fouroldstyle', 'fiveoldstyle', 'sixoldstyle',
    'sevenoldstyle', 'eightoldstyle', 'nineoldstyle', 'commasuperior', 'threequartersemdash', 'periodsuperior',
    'questionsmall', 'asuperior', 'bsuperior', 'centsuperior', 'dsuperior', 'esuperior', 'isuperior', 'lsuperior',
    'msuperior', 'nsuperior', 'osuperior', 'rsuperior', 'ssuperior', 'tsuperior', 'ff', 'ffi', 'ffl',
    'parenleftinferior', 'parenrightinferior', 'Circumflexsmall', 'hyphensuperior', 'Gravesmall', 'Asmall',
    'Bsmall', 'Csmall', 'Dsmall', 'Esmall', 'Fsmall', 'Gsmall', 'Hsmall', 'Ismall', 'Jsmall', 'Ksmall', 'Lsmall',
    'Msmall', 'Nsmall', 'Osmall', 'Psmall', 'Qsmall', 'Rsmall', 'Ssmall', 'Tsmall', 'Usmall', 'Vsmall', 'Wsmall',
    'Xsmall', 'Ysmall', 'Zsmall', 'colonmonetary', 'onefitted', 'rupiah', 'Tildesmall', 'exclamdownsmall',
    'centoldstyle', 'Lslashsmall', 'Scaronsmall', 'Zcaronsmall', 'Dieresissmall', 'Brevesmall', 'Caronsmall',
    'Dotaccentsmall', 'Macronsmall', 'figuredash', 'hypheninferior', 'Ogoneksmall', 'Ringsmall', 'Cedillasmall',
    'questiondownsmall', 'oneeighth', 'threeeighths', 'fiveeighths', 'seveneighths', 'onethird', 'twothirds',
    'zerosuperior', 'foursuperior', 'fivesuperior', 'sixsuperior', 'sevensuperior', 'eightsuperior', 'ninesuperior',
    'zeroinferior', 'oneinferior', 'twoinferior', 'threeinferior', 'fourinferior', 'fiveinferior', 'sixinferior',
    'seveninferior', 'eightinferior', 'nineinferior', 'centinferior', 'dollarinferior', 'periodinferior',
    'commainferior', 'Agravesmall', 'Aacutesmall', 'Acircumflexsmall', 'Atildesmall', 'Adieresissmall',
    'Aringsmall', 'AEsmall', 'Ccedillasmall', 'Egravesmall', 'Eacutesmall', 'Ecircumflexsmall', 'Edieresissmall',
    'Igravesmall', 'Iacutesmall', 'Icircumflexsmall', 'Idieresissmall', 'Ethsmall', 'Ntildesmall', 'Ogravesmall',
    'Oacutesmall', 'Ocircumflexsmall', 'Otildesmall', 'Odieresissmall', 'OEsmall', 'Oslashsmall', 'Ugravesmall',
    'Uacutesmall', 'Ucircumflexsmall', 'Udieresissmall', 'Yacutesmall', 'Thornsmall', 'Ydieresissmall', '001.000',
    '001.001', '001.002', '001.003', 'Black', 'Bold', 'Book', 'Light', 'Medium', 'Regular', 'Roman', 'Semibold'];

var cffStandardEncoding = [
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', 'space', 'exclam', 'quotedbl', 'numbersign', 'dollar', 'percent', 'ampersand', 'quoteright',
    'parenleft', 'parenright', 'asterisk', 'plus', 'comma', 'hyphen', 'period', 'slash', 'zero', 'one', 'two',
    'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'colon', 'semicolon', 'less', 'equal', 'greater',
    'question', 'at', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'bracketleft', 'backslash', 'bracketright', 'asciicircum', 'underscore',
    'quoteleft', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'braceleft', 'bar', 'braceright', 'asciitilde', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    'exclamdown', 'cent', 'sterling', 'fraction', 'yen', 'florin', 'section', 'currency', 'quotesingle',
    'quotedblleft', 'guillemotleft', 'guilsinglleft', 'guilsinglright', 'fi', 'fl', '', 'endash', 'dagger',
    'daggerdbl', 'periodcentered', '', 'paragraph', 'bullet', 'quotesinglbase', 'quotedblbase', 'quotedblright',
    'guillemotright', 'ellipsis', 'perthousand', '', 'questiondown', '', 'grave', 'acute', 'circumflex', 'tilde',
    'macron', 'breve', 'dotaccent', 'dieresis', '', 'ring', 'cedilla', '', 'hungarumlaut', 'ogonek', 'caron',
    'emdash', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'AE', '', 'ordfeminine', '', '', '',
    '', 'Lslash', 'Oslash', 'OE', 'ordmasculine', '', '', '', '', '', 'ae', '', '', '', 'dotlessi', '', '',
    'lslash', 'oslash', 'oe', 'germandbls'];

var cffExpertEncoding = [
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', 'space', 'exclamsmall', 'Hungarumlautsmall', '', 'dollaroldstyle', 'dollarsuperior',
    'ampersandsmall', 'Acutesmall', 'parenleftsuperior', 'parenrightsuperior', 'twodotenleader', 'onedotenleader',
    'comma', 'hyphen', 'period', 'fraction', 'zerooldstyle', 'oneoldstyle', 'twooldstyle', 'threeoldstyle',
    'fouroldstyle', 'fiveoldstyle', 'sixoldstyle', 'sevenoldstyle', 'eightoldstyle', 'nineoldstyle', 'colon',
    'semicolon', 'commasuperior', 'threequartersemdash', 'periodsuperior', 'questionsmall', '', 'asuperior',
    'bsuperior', 'centsuperior', 'dsuperior', 'esuperior', '', '', 'isuperior', '', '', 'lsuperior', 'msuperior',
    'nsuperior', 'osuperior', '', '', 'rsuperior', 'ssuperior', 'tsuperior', '', 'ff', 'fi', 'fl', 'ffi', 'ffl',
    'parenleftinferior', '', 'parenrightinferior', 'Circumflexsmall', 'hyphensuperior', 'Gravesmall', 'Asmall',
    'Bsmall', 'Csmall', 'Dsmall', 'Esmall', 'Fsmall', 'Gsmall', 'Hsmall', 'Ismall', 'Jsmall', 'Ksmall', 'Lsmall',
    'Msmall', 'Nsmall', 'Osmall', 'Psmall', 'Qsmall', 'Rsmall', 'Ssmall', 'Tsmall', 'Usmall', 'Vsmall', 'Wsmall',
    'Xsmall', 'Ysmall', 'Zsmall', 'colonmonetary', 'onefitted', 'rupiah', 'Tildesmall', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    'exclamdownsmall', 'centoldstyle', 'Lslashsmall', '', '', 'Scaronsmall', 'Zcaronsmall', 'Dieresissmall',
    'Brevesmall', 'Caronsmall', '', 'Dotaccentsmall', '', '', 'Macronsmall', '', '', 'figuredash', 'hypheninferior',
    '', '', 'Ogoneksmall', 'Ringsmall', 'Cedillasmall', '', '', '', 'onequarter', 'onehalf', 'threequarters',
    'questiondownsmall', 'oneeighth', 'threeeighths', 'fiveeighths', 'seveneighths', 'onethird', 'twothirds', '',
    '', 'zerosuperior', 'onesuperior', 'twosuperior', 'threesuperior', 'foursuperior', 'fivesuperior',
    'sixsuperior', 'sevensuperior', 'eightsuperior', 'ninesuperior', 'zeroinferior', 'oneinferior', 'twoinferior',
    'threeinferior', 'fourinferior', 'fiveinferior', 'sixinferior', 'seveninferior', 'eightinferior',
    'nineinferior', 'centinferior', 'dollarinferior', 'periodinferior', 'commainferior', 'Agravesmall',
    'Aacutesmall', 'Acircumflexsmall', 'Atildesmall', 'Adieresissmall', 'Aringsmall', 'AEsmall', 'Ccedillasmall',
    'Egravesmall', 'Eacutesmall', 'Ecircumflexsmall', 'Edieresissmall', 'Igravesmall', 'Iacutesmall',
    'Icircumflexsmall', 'Idieresissmall', 'Ethsmall', 'Ntildesmall', 'Ogravesmall', 'Oacutesmall',
    'Ocircumflexsmall', 'Otildesmall', 'Odieresissmall', 'OEsmall', 'Oslashsmall', 'Ugravesmall', 'Uacutesmall',
    'Ucircumflexsmall', 'Udieresissmall', 'Yacutesmall', 'Thornsmall', 'Ydieresissmall'];

var standardNames = [
    '.notdef', '.null', 'nonmarkingreturn', 'space', 'exclam', 'quotedbl', 'numbersign', 'dollar', 'percent',
    'ampersand', 'quotesingle', 'parenleft', 'parenright', 'asterisk', 'plus', 'comma', 'hyphen', 'period', 'slash',
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'colon', 'semicolon', 'less',
    'equal', 'greater', 'question', 'at', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'bracketleft', 'backslash', 'bracketright',
    'asciicircum', 'underscore', 'grave', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'braceleft', 'bar', 'braceright', 'asciitilde',
    'Adieresis', 'Aring', 'Ccedilla', 'Eacute', 'Ntilde', 'Odieresis', 'Udieresis', 'aacute', 'agrave',
    'acircumflex', 'adieresis', 'atilde', 'aring', 'ccedilla', 'eacute', 'egrave', 'ecircumflex', 'edieresis',
    'iacute', 'igrave', 'icircumflex', 'idieresis', 'ntilde', 'oacute', 'ograve', 'ocircumflex', 'odieresis',
    'otilde', 'uacute', 'ugrave', 'ucircumflex', 'udieresis', 'dagger', 'degree', 'cent', 'sterling', 'section',
    'bullet', 'paragraph', 'germandbls', 'registered', 'copyright', 'trademark', 'acute', 'dieresis', 'notequal',
    'AE', 'Oslash', 'infinity', 'plusminus', 'lessequal', 'greaterequal', 'yen', 'mu', 'partialdiff', 'summation',
    'product', 'pi', 'integral', 'ordfeminine', 'ordmasculine', 'Omega', 'ae', 'oslash', 'questiondown',
    'exclamdown', 'logicalnot', 'radical', 'florin', 'approxequal', 'Delta', 'guillemotleft', 'guillemotright',
    'ellipsis', 'nonbreakingspace', 'Agrave', 'Atilde', 'Otilde', 'OE', 'oe', 'endash', 'emdash', 'quotedblleft',
    'quotedblright', 'quoteleft', 'quoteright', 'divide', 'lozenge', 'ydieresis', 'Ydieresis', 'fraction',
    'currency', 'guilsinglleft', 'guilsinglright', 'fi', 'fl', 'daggerdbl', 'periodcentered', 'quotesinglbase',
    'quotedblbase', 'perthousand', 'Acircumflex', 'Ecircumflex', 'Aacute', 'Edieresis', 'Egrave', 'Iacute',
    'Icircumflex', 'Idieresis', 'Igrave', 'Oacute', 'Ocircumflex', 'apple', 'Ograve', 'Uacute', 'Ucircumflex',
    'Ugrave', 'dotlessi', 'circumflex', 'tilde', 'macron', 'breve', 'dotaccent', 'ring', 'cedilla', 'hungarumlaut',
    'ogonek', 'caron', 'Lslash', 'lslash', 'Scaron', 'scaron', 'Zcaron', 'zcaron', 'brokenbar', 'Eth', 'eth',
    'Yacute', 'yacute', 'Thorn', 'thorn', 'minus', 'multiply', 'onesuperior', 'twosuperior', 'threesuperior',
    'onehalf', 'onequarter', 'threequarters', 'franc', 'Gbreve', 'gbreve', 'Idotaccent', 'Scedilla', 'scedilla',
    'Cacute', 'cacute', 'Ccaron', 'ccaron', 'dcroat'];

// This is the encoding used for fonts created from scratch.
// It loops through all glyphs and finds the appropriate unicode value.
// Since it's linear time, other encodings will be faster.
function DefaultEncoding(font) {
    this.font = font;
}

DefaultEncoding.prototype.charToGlyphIndex = function(c) {
    var code = c.charCodeAt(0);
    var glyphs = this.font.glyphs;
    if (glyphs) {
        for (var i = 0; i < glyphs.length; i += 1) {
            var glyph = glyphs.get(i);
            for (var j = 0; j < glyph.unicodes.length; j += 1) {
                if (glyph.unicodes[j] === code) {
                    return i;
                }
            }
        }
    } else {
        return null;
    }
};

function CmapEncoding(cmap) {
    this.cmap = cmap;
}

CmapEncoding.prototype.charToGlyphIndex = function(c) {
    return this.cmap.glyphIndexMap[c.charCodeAt(0)] || 0;
};

function CffEncoding(encoding, charset) {
    this.encoding = encoding;
    this.charset = charset;
}

CffEncoding.prototype.charToGlyphIndex = function(s) {
    var code = s.charCodeAt(0);
    var charName = this.encoding[code];
    return this.charset.indexOf(charName);
};

function GlyphNames(post) {
    var i;
    switch (post.version) {
    case 1:
        this.names = exports.standardNames.slice();
        break;
    case 2:
        this.names = new Array(post.numberOfGlyphs);
        for (i = 0; i < post.numberOfGlyphs; i++) {
            if (post.glyphNameIndex[i] < exports.standardNames.length) {
                this.names[i] = exports.standardNames[post.glyphNameIndex[i]];
            } else {
                this.names[i] = post.names[post.glyphNameIndex[i] - exports.standardNames.length];
            }
        }

        break;
    case 2.5:
        this.names = new Array(post.numberOfGlyphs);
        for (i = 0; i < post.numberOfGlyphs; i++) {
            this.names[i] = exports.standardNames[i + post.glyphNameIndex[i]];
        }

        break;
    case 3:
        this.names = [];
        break;
    }
}

GlyphNames.prototype.nameToGlyphIndex = function(name) {
    return this.names.indexOf(name);
};

GlyphNames.prototype.glyphIndexToName = function(gid) {
    return this.names[gid];
};

function addGlyphNames(font) {
    var glyph;
    var glyphIndexMap = font.tables.cmap.glyphIndexMap;
    var charCodes = Object.keys(glyphIndexMap);

    for (var i = 0; i < charCodes.length; i += 1) {
        var c = charCodes[i];
        var glyphIndex = glyphIndexMap[c];
        glyph = font.glyphs.get(glyphIndex);
        glyph.addUnicode(parseInt(c));
    }

    for (i = 0; i < font.glyphs.length; i += 1) {
        glyph = font.glyphs.get(i);
        if (font.cffEncoding) {
            glyph.name = font.cffEncoding.charset[i];
        } else {
            glyph.name = font.glyphNames.glyphIndexToName(i);
        }
    }
}

exports.cffStandardStrings = cffStandardStrings;
exports.cffStandardEncoding = cffStandardEncoding;
exports.cffExpertEncoding = cffExpertEncoding;
exports.standardNames = standardNames;
exports.DefaultEncoding = DefaultEncoding;
exports.CmapEncoding = CmapEncoding;
exports.CffEncoding = CffEncoding;
exports.GlyphNames = GlyphNames;
exports.addGlyphNames = addGlyphNames;

},{}],5:[function(require,module,exports){
// The Font object

'use strict';

var path = require('./path');
var sfnt = require('./tables/sfnt');
var encoding = require('./encoding');
var glyphset = require('./glyphset');
var util = require('./util');

// A Font represents a loaded OpenType font file.
// It contains a set of glyphs and methods to draw text on a drawing context,
// or to get a path representing the text.
function Font(options) {
    options = options || {};

    if (!options.empty) {
        // Check that we've provided the minimum set of names.
        util.checkArgument(options.familyName, 'When creating a new Font object, familyName is required.');
        util.checkArgument(options.styleName, 'When creating a new Font object, styleName is required.');
        util.checkArgument(options.unitsPerEm, 'When creating a new Font object, unitsPerEm is required.');
        util.checkArgument(options.ascender, 'When creating a new Font object, ascender is required.');
        util.checkArgument(options.descender, 'When creating a new Font object, descender is required.');
        util.checkArgument(options.descender < 0, 'Descender should be negative (e.g. -512).');

        // OS X will complain if the names are empty, so we put a single space everywhere by default.
        this.names = {
            fontFamily: {en: options.familyName || ' '},
            fontSubfamily: {en: options.styleName || ' '},
            fullName: {en: options.fullName || options.familyName + ' ' + options.styleName},
            postScriptName: {en: options.postScriptName || options.familyName + options.styleName},
            designer: {en: options.designer || ' '},
            designerURL: {en: options.designerURL || ' '},
            manufacturer: {en: options.manufacturer || ' '},
            manufacturerURL: {en: options.manufacturerURL || ' '},
            license: {en: options.license || ' '},
            licenseURL: {en: options.licenseURL || ' '},
            version: {en: options.version || 'Version 0.1'},
            description: {en: options.description || ' '},
            copyright: {en: options.copyright || ' '},
            trademark: {en: options.trademark || ' '}
        };
        this.unitsPerEm = options.unitsPerEm || 1000;
        this.ascender = options.ascender;
        this.descender = options.descender;
    }

    this.supported = true; // Deprecated: parseBuffer will throw an error if font is not supported.
    this.glyphs = new glyphset.GlyphSet(this, options.glyphs || []);
    this.encoding = new encoding.DefaultEncoding(this);
    this.tables = {};
}

// Check if the font has a glyph for the given character.
Font.prototype.hasChar = function(c) {
    return this.encoding.charToGlyphIndex(c) !== null;
};

// Convert the given character to a single glyph index.
// Note that this function assumes that there is a one-to-one mapping between
// the given character and a glyph; for complex scripts this might not be the case.
Font.prototype.charToGlyphIndex = function(s) {
    return this.encoding.charToGlyphIndex(s);
};

// Convert the given character to a single Glyph object.
// Note that this function assumes that there is a one-to-one mapping between
// the given character and a glyph; for complex scripts this might not be the case.
Font.prototype.charToGlyph = function(c) {
    var glyphIndex = this.charToGlyphIndex(c);
    var glyph = this.glyphs.get(glyphIndex);
    if (!glyph) {
        // .notdef
        glyph = this.glyphs.get(0);
    }

    return glyph;
};

// Convert the given text to a list of Glyph objects.
// Note that there is no strict one-to-one mapping between characters and
// glyphs, so the list of returned glyphs can be larger or smaller than the
// length of the given string.
Font.prototype.stringToGlyphs = function(s) {
    var glyphs = [];
    for (var i = 0; i < s.length; i += 1) {
        var c = s[i];
        glyphs.push(this.charToGlyph(c));
    }

    return glyphs;
};

Font.prototype.nameToGlyphIndex = function(name) {
    return this.glyphNames.nameToGlyphIndex(name);
};

Font.prototype.nameToGlyph = function(name) {
    var glyphIndex = this.nametoGlyphIndex(name);
    var glyph = this.glyphs.get(glyphIndex);
    if (!glyph) {
        // .notdef
        glyph = this.glyphs.get(0);
    }

    return glyph;
};

Font.prototype.glyphIndexToName = function(gid) {
    if (!this.glyphNames.glyphIndexToName) {
        return '';
    }

    return this.glyphNames.glyphIndexToName(gid);
};

// Retrieve the value of the kerning pair between the left glyph (or its index)
// and the right glyph (or its index). If no kerning pair is found, return 0.
// The kerning value gets added to the advance width when calculating the spacing
// between glyphs.
Font.prototype.getKerningValue = function(leftGlyph, rightGlyph) {
    leftGlyph = leftGlyph.index || leftGlyph;
    rightGlyph = rightGlyph.index || rightGlyph;
    var gposKerning = this.getGposKerningValue;
    return gposKerning ? gposKerning(leftGlyph, rightGlyph) :
        (this.kerningPairs[leftGlyph + ',' + rightGlyph] || 0);
};

// Helper function that invokes the given callback for each glyph in the given text.
// The callback gets `(glyph, x, y, fontSize, options)`.
Font.prototype.forEachGlyph = function(text, x, y, fontSize, options, callback) {
    x = x !== undefined ? x : 0;
    y = y !== undefined ? y : 0;
    fontSize = fontSize !== undefined ? fontSize : 72;
    options = options || {};
    var kerning = options.kerning === undefined ? true : options.kerning;
    var fontScale = 1 / this.unitsPerEm * fontSize;
    var glyphs = this.stringToGlyphs(text);
    for (var i = 0; i < glyphs.length; i += 1) {
        var glyph = glyphs[i];
        callback(glyph, x, y, fontSize, options);
        if (glyph.advanceWidth) {
            x += glyph.advanceWidth * fontScale;
        }

        if (kerning && i < glyphs.length - 1) {
            var kerningValue = this.getKerningValue(glyph, glyphs[i + 1]);
            x += kerningValue * fontScale;
        }
    }
};

// Create a Path object that represents the given text.
//
// text - The text to create.
// x - Horizontal position of the beginning of the text. (default: 0)
// y - Vertical position of the *baseline* of the text. (default: 0)
// fontSize - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`. (default: 72)
// Options is an optional object that contains:
// - kerning - Whether to take kerning information into account. (default: true)
//
// Returns a Path object.
Font.prototype.getPath = function(text, x, y, fontSize, options) {
    var fullPath = new path.Path();
    this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
        var glyphPath = glyph.getPath(gX, gY, gFontSize);
        fullPath.extend(glyphPath);
    });

    return fullPath;
};

// Create an array of Path objects that represent the glyps of a given text.
//
// text - The text to create.
// x - Horizontal position of the beginning of the text. (default: 0)
// y - Vertical position of the *baseline* of the text. (default: 0)
// fontSize - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`. (default: 72)
// Options is an optional object that contains:
// - kerning - Whether to take kerning information into account. (default: true)
//
// Returns an array of Path objects.
Font.prototype.getPaths = function(text, x, y, fontSize, options) {
    var glyphPaths = [];
    this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
        var glyphPath = glyph.getPath(gX, gY, gFontSize);
        glyphPaths.push(glyphPath);
    });

    return glyphPaths;
};

// Draw the text on the given drawing context.
//
// ctx - A 2D drawing context, like Canvas.
// text - The text to create.
// x - Horizontal position of the beginning of the text. (default: 0)
// y - Vertical position of the *baseline* of the text. (default: 0)
// fontSize - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`. (default: 72)
// Options is an optional object that contains:
// - kerning - Whether to take kerning information into account. (default: true)
Font.prototype.draw = function(ctx, text, x, y, fontSize, options) {
    this.getPath(text, x, y, fontSize, options).draw(ctx);
};

// Draw the points of all glyphs in the text.
// On-curve points will be drawn in blue, off-curve points will be drawn in red.
//
// ctx - A 2D drawing context, like Canvas.
// text - The text to create.
// x - Horizontal position of the beginning of the text. (default: 0)
// y - Vertical position of the *baseline* of the text. (default: 0)
// fontSize - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`. (default: 72)
// Options is an optional object that contains:
// - kerning - Whether to take kerning information into account. (default: true)
Font.prototype.drawPoints = function(ctx, text, x, y, fontSize, options) {
    this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
        glyph.drawPoints(ctx, gX, gY, gFontSize);
    });
};

// Draw lines indicating important font measurements for all glyphs in the text.
// Black lines indicate the origin of the coordinate system (point 0,0).
// Blue lines indicate the glyph bounding box.
// Green line indicates the advance width of the glyph.
//
// ctx - A 2D drawing context, like Canvas.
// text - The text to create.
// x - Horizontal position of the beginning of the text. (default: 0)
// y - Vertical position of the *baseline* of the text. (default: 0)
// fontSize - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`. (default: 72)
// Options is an optional object that contains:
// - kerning - Whether to take kerning information into account. (default: true)
Font.prototype.drawMetrics = function(ctx, text, x, y, fontSize, options) {
    this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
        glyph.drawMetrics(ctx, gX, gY, gFontSize);
    });
};

Font.prototype.getEnglishName = function(name) {
    var translations = this.names[name];
    if (translations) {
        return translations.en;
    }
};

// Validate
Font.prototype.validate = function() {
    var warnings = [];
    var _this = this;

    function assert(predicate, message) {
        if (!predicate) {
            warnings.push(message);
        }
    }

    function assertNamePresent(name) {
        var englishName = _this.getEnglishName(name);
        assert(englishName && englishName.trim().length > 0,
               'No English ' + name + ' specified.');
    }

    // Identification information
    assertNamePresent('fontFamily');
    assertNamePresent('weightName');
    assertNamePresent('manufacturer');
    assertNamePresent('copyright');
    assertNamePresent('version');

    // Dimension information
    assert(this.unitsPerEm > 0, 'No unitsPerEm specified.');
};

// Convert the font object to a SFNT data structure.
// This structure contains all the necessary tables and metadata to create a binary OTF file.
Font.prototype.toTables = function() {
    return sfnt.fontToTable(this);
};

Font.prototype.toBuffer = function() {
    console.warn('Font.toBuffer is deprecated. Use Font.toArrayBuffer instead.');
    return this.toArrayBuffer();
};

Font.prototype.toArrayBuffer = function() {
    var sfntTable = this.toTables();
    var bytes = sfntTable.encode();
    var buffer = new ArrayBuffer(bytes.length);
    var intArray = new Uint8Array(buffer);
    for (var i = 0; i < bytes.length; i++) {
        intArray[i] = bytes[i];
    }

    return buffer;
};

// Initiate a download of the OpenType font.
Font.prototype.download = function() {
    var familyName = this.getEnglishName('fontFamily');
    var styleName = this.getEnglishName('fontSubfamily');
    var fileName = familyName.replace(/\s/g, '') + '-' + styleName + '.otf';
    var arrayBuffer = this.toArrayBuffer();

    if (util.isBrowser()) {
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(window.TEMPORARY, arrayBuffer.byteLength, function(fs) {
            fs.root.getFile(fileName, {create: true}, function(fileEntry) {
                fileEntry.createWriter(function(writer) {
                    var dataView = new DataView(arrayBuffer);
                    var blob = new Blob([dataView], {type: 'font/opentype'});
                    writer.write(blob);

                    writer.addEventListener('writeend', function() {
                        // Navigating to the file will download it.
                        location.href = fileEntry.toURL();
                    }, false);
                });
            });
        },
        function(err) {
            throw err;
        });
    } else {
        var fs = require('fs');
        var buffer = util.arrayBufferToNodeBuffer(arrayBuffer);
        fs.writeFileSync(fileName, buffer);
    }
};

exports.Font = Font;

},{"./encoding":4,"./glyphset":7,"./path":10,"./tables/sfnt":27,"./util":29,"fs":undefined}],6:[function(require,module,exports){
// The Glyph object

'use strict';

var check = require('./check');
var draw = require('./draw');
var path = require('./path');

function getPathDefinition(glyph, path) {
    var _path = path || { commands: [] };
    return {
        configurable: true,

        get: function() {
            if (typeof _path === 'function') {
                _path = _path();
            }

            return _path;
        },

        set: function(p) {
            _path = p;
        }
    };
}

// A Glyph is an individual mark that often corresponds to a character.
// Some glyphs, such as ligatures, are a combination of many characters.
// Glyphs are the basic building blocks of a font.
//
// The `Glyph` class contains utility methods for drawing the path and its points.
function Glyph(options) {
    // By putting all the code on a prototype function (which is only declared once)
    // we reduce the memory requirements for larger fonts by some 2%
    this.bindConstructorValues(options);
}

Glyph.prototype.bindConstructorValues = function(options) {
    this.index = options.index || 0;

    // These three values cannnot be deferred for memory optimization:
    this.name = options.name || null;
    this.unicode = options.unicode || undefined;
    this.unicodes = options.unicodes || options.unicode !== undefined ? [options.unicode] : [];

    // But by binding these values only when necessary, we reduce can
    // the memory requirements by almost 3% for larger fonts.
    if (options.xMin) {
        this.xMin = options.xMin;
    }

    if (options.yMin) {
        this.yMin = options.yMin;
    }

    if (options.xMax) {
        this.xMax = options.xMax;
    }

    if (options.yMax) {
        this.yMax = options.yMax;
    }

    if (options.advanceWidth) {
        this.advanceWidth = options.advanceWidth;
    }

    // The path for a glyph is the most memory intensive, and is bound as a value
    // with a getter/setter to ensure we actually do path parsing only once the
    // path is actually needed by anything.
    Object.defineProperty(this, 'path', getPathDefinition(this, options.path));
};

Glyph.prototype.addUnicode = function(unicode) {
    if (this.unicodes.length === 0) {
        this.unicode = unicode;
    }

    this.unicodes.push(unicode);
};

// Convert the glyph to a Path we can draw on a drawing context.
//
// x - Horizontal position of the glyph. (default: 0)
// y - Vertical position of the *baseline* of the glyph. (default: 0)
// fontSize - Font size, in pixels (default: 72).
Glyph.prototype.getPath = function(x, y, fontSize) {
    x = x !== undefined ? x : 0;
    y = y !== undefined ? y : 0;
    fontSize = fontSize !== undefined ? fontSize : 72;
    var scale = 1 / this.path.unitsPerEm * fontSize;
    var p = new path.Path();
    var commands = this.path.commands;
    for (var i = 0; i < commands.length; i += 1) {
        var cmd = commands[i];
        if (cmd.type === 'M') {
            p.moveTo(x + (cmd.x * scale), y + (-cmd.y * scale));
        } else if (cmd.type === 'L') {
            p.lineTo(x + (cmd.x * scale), y + (-cmd.y * scale));
        } else if (cmd.type === 'Q') {
            p.quadraticCurveTo(x + (cmd.x1 * scale), y + (-cmd.y1 * scale),
                               x + (cmd.x * scale), y + (-cmd.y * scale));
        } else if (cmd.type === 'C') {
            p.curveTo(x + (cmd.x1 * scale), y + (-cmd.y1 * scale),
                      x + (cmd.x2 * scale), y + (-cmd.y2 * scale),
                      x + (cmd.x * scale), y + (-cmd.y * scale));
        } else if (cmd.type === 'Z') {
            p.closePath();
        }
    }

    return p;
};

// Split the glyph into contours.
// This function is here for backwards compatibility, and to
// provide raw access to the TrueType glyph outlines.
Glyph.prototype.getContours = function() {
    if (this.points === undefined) {
        return [];
    }

    var contours = [];
    var currentContour = [];
    for (var i = 0; i < this.points.length; i += 1) {
        var pt = this.points[i];
        currentContour.push(pt);
        if (pt.lastPointOfContour) {
            contours.push(currentContour);
            currentContour = [];
        }
    }

    check.argument(currentContour.length === 0, 'There are still points left in the current contour.');
    return contours;
};

// Calculate the xMin/yMin/xMax/yMax/lsb/rsb for a Glyph.
Glyph.prototype.getMetrics = function() {
    var commands = this.path.commands;
    var xCoords = [];
    var yCoords = [];
    for (var i = 0; i < commands.length; i += 1) {
        var cmd = commands[i];
        if (cmd.type !== 'Z') {
            xCoords.push(cmd.x);
            yCoords.push(cmd.y);
        }

        if (cmd.type === 'Q' || cmd.type === 'C') {
            xCoords.push(cmd.x1);
            yCoords.push(cmd.y1);
        }

        if (cmd.type === 'C') {
            xCoords.push(cmd.x2);
            yCoords.push(cmd.y2);
        }
    }

    var metrics = {
        xMin: Math.min.apply(null, xCoords),
        yMin: Math.min.apply(null, yCoords),
        xMax: Math.max.apply(null, xCoords),
        yMax: Math.max.apply(null, yCoords),
        leftSideBearing: 0
    };

    if (!isFinite(metrics.xMin)) {
        metrics.xMin = 0;
    }

    if (!isFinite(metrics.xMax)) {
        metrics.xMax = this.advanceWidth;
    }

    if (!isFinite(metrics.yMin)) {
        metrics.yMin = 0;
    }

    if (!isFinite(metrics.yMax)) {
        metrics.yMax = 0;
    }

    metrics.rightSideBearing = this.advanceWidth - metrics.leftSideBearing - (metrics.xMax - metrics.xMin);
    return metrics;
};

// Draw the glyph on the given context.
//
// ctx - The drawing context.
// x - Horizontal position of the glyph. (default: 0)
// y - Vertical position of the *baseline* of the glyph. (default: 0)
// fontSize - Font size, in pixels (default: 72).
Glyph.prototype.draw = function(ctx, x, y, fontSize) {
    this.getPath(x, y, fontSize).draw(ctx);
};

// Draw the points of the glyph.
// On-curve points will be drawn in blue, off-curve points will be drawn in red.
//
// ctx - The drawing context.
// x - Horizontal position of the glyph. (default: 0)
// y - Vertical position of the *baseline* of the glyph. (default: 0)
// fontSize - Font size, in pixels (default: 72).
Glyph.prototype.drawPoints = function(ctx, x, y, fontSize) {

    function drawCircles(l, x, y, scale) {
        var PI_SQ = Math.PI * 2;
        ctx.beginPath();
        for (var j = 0; j < l.length; j += 1) {
            ctx.moveTo(x + (l[j].x * scale), y + (l[j].y * scale));
            ctx.arc(x + (l[j].x * scale), y + (l[j].y * scale), 2, 0, PI_SQ, false);
        }

        ctx.closePath();
        ctx.fill();
    }

    x = x !== undefined ? x : 0;
    y = y !== undefined ? y : 0;
    fontSize = fontSize !== undefined ? fontSize : 24;
    var scale = 1 / this.path.unitsPerEm * fontSize;

    var blueCircles = [];
    var redCircles = [];
    var path = this.path;
    for (var i = 0; i < path.commands.length; i += 1) {
        var cmd = path.commands[i];
        if (cmd.x !== undefined) {
            blueCircles.push({x: cmd.x, y: -cmd.y});
        }

        if (cmd.x1 !== undefined) {
            redCircles.push({x: cmd.x1, y: -cmd.y1});
        }

        if (cmd.x2 !== undefined) {
            redCircles.push({x: cmd.x2, y: -cmd.y2});
        }
    }

    ctx.fillStyle = 'blue';
    drawCircles(blueCircles, x, y, scale);
    ctx.fillStyle = 'red';
    drawCircles(redCircles, x, y, scale);
};

// Draw lines indicating important font measurements.
// Black lines indicate the origin of the coordinate system (point 0,0).
// Blue lines indicate the glyph bounding box.
// Green line indicates the advance width of the glyph.
//
// ctx - The drawing context.
// x - Horizontal position of the glyph. (default: 0)
// y - Vertical position of the *baseline* of the glyph. (default: 0)
// fontSize - Font size, in pixels (default: 72).
Glyph.prototype.drawMetrics = function(ctx, x, y, fontSize) {
    var scale;
    x = x !== undefined ? x : 0;
    y = y !== undefined ? y : 0;
    fontSize = fontSize !== undefined ? fontSize : 24;
    scale = 1 / this.path.unitsPerEm * fontSize;
    ctx.lineWidth = 1;

    // Draw the origin
    ctx.strokeStyle = 'black';
    draw.line(ctx, x, -10000, x, 10000);
    draw.line(ctx, -10000, y, 10000, y);

    // This code is here due to memory optimization: by not using
    // defaults in the constructor, we save a notable amount of memory.
    var xMin = this.xMin || 0;
    var yMin = this.yMin || 0;
    var xMax = this.xMax || 0;
    var yMax = this.yMax || 0;
    var advanceWidth = this.advanceWidth || 0;

    // Draw the glyph box
    ctx.strokeStyle = 'blue';
    draw.line(ctx, x + (xMin * scale), -10000, x + (xMin * scale), 10000);
    draw.line(ctx, x + (xMax * scale), -10000, x + (xMax * scale), 10000);
    draw.line(ctx, -10000, y + (-yMin * scale), 10000, y + (-yMin * scale));
    draw.line(ctx, -10000, y + (-yMax * scale), 10000, y + (-yMax * scale));

    // Draw the advance width
    ctx.strokeStyle = 'green';
    draw.line(ctx, x + (advanceWidth * scale), -10000, x + (advanceWidth * scale), 10000);
};

exports.Glyph = Glyph;

},{"./check":2,"./draw":3,"./path":10}],7:[function(require,module,exports){
// The GlyphSet object

'use strict';

var _glyph = require('./glyph');

// A GlyphSet represents all glyphs available in the font, but modelled using
// a deferred glyph loader, for retrieving glyphs only once they are absolutely
// necessary, to keep the memory footprint down.
function GlyphSet(font, glyphs) {
    this.font = font;
    this.glyphs = {};
    if (Array.isArray(glyphs)) {
        for (var i = 0; i < glyphs.length; i++) {
            this.glyphs[i] = glyphs[i];
        }
    }

    this.length = (glyphs && glyphs.length) || 0;
}

GlyphSet.prototype.get = function(index) {
    if (typeof this.glyphs[index] === 'function') {
        this.glyphs[index] = this.glyphs[index]();
    }

    return this.glyphs[index];
};

GlyphSet.prototype.push = function(index, loader) {
    this.glyphs[index] = loader;
    this.length++;
};

function glyphLoader(font, index) {
    return new _glyph.Glyph({index: index, font: font});
}

/**
 * Generate a stub glyph that can be filled with all metadata *except*
 * the "points" and "path" properties, which must be loaded only once
 * the glyph's path is actually requested for text shaping.
 */

function ttfGlyphLoader(font, index, parseGlyph, data, position, buildPath) {
    return function() {
        var glyph = new _glyph.Glyph({index: index, font: font});

        glyph.path = function() {
            parseGlyph(glyph, data, position);
            var path = buildPath(font.glyphs, glyph);
            path.unitsPerEm = font.unitsPerEm;
            return path;
        };

        return glyph;
    };
}

function cffGlyphLoader(font, index, parseCFFCharstring, charstring) {
    return function() {
        var glyph = new _glyph.Glyph({index: index, font: font});

        glyph.path = function() {
            var path = parseCFFCharstring(font, glyph, charstring);
            path.unitsPerEm = font.unitsPerEm;
            return path;
        };

        return glyph;
    };
}

exports.GlyphSet = GlyphSet;
exports.glyphLoader = glyphLoader;
exports.ttfGlyphLoader = ttfGlyphLoader;
exports.cffGlyphLoader = cffGlyphLoader;

},{"./glyph":6}],8:[function(require,module,exports){
// opentype.js
// https://github.com/nodebox/opentype.js
// (c) 2015 Frederik De Bleser
// opentype.js may be freely distributed under the MIT license.

/* global DataView, Uint8Array, XMLHttpRequest  */

'use strict';

var inflate = require('tiny-inflate');

var encoding = require('./encoding');
var _font = require('./font');
var glyph = require('./glyph');
var parse = require('./parse');
var path = require('./path');
var util = require('./util');

var cmap = require('./tables/cmap');
var cff = require('./tables/cff');
var fvar = require('./tables/fvar');
var glyf = require('./tables/glyf');
var gpos = require('./tables/gpos');
var head = require('./tables/head');
var hhea = require('./tables/hhea');
var hmtx = require('./tables/hmtx');
var kern = require('./tables/kern');
var ltag = require('./tables/ltag');
var loca = require('./tables/loca');
var maxp = require('./tables/maxp');
var _name = require('./tables/name');
var os2 = require('./tables/os2');
var post = require('./tables/post');

// File loaders /////////////////////////////////////////////////////////

function loadFromFile(path, callback) {
    var fs = require('fs');
    fs.readFile(path, function(err, buffer) {
        if (err) {
            return callback(err.message);
        }

        callback(null, util.nodeBufferToArrayBuffer(buffer));
    });
}

function loadFromUrl(url, callback) {
    var request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        if (request.status !== 200) {
            return callback('Font could not be loaded: ' + request.statusText);
        }

        return callback(null, request.response);
    };

    request.send();
}

// Table Directory Entries //////////////////////////////////////////////

function parseOpenTypeTableEntries(data, numTables) {
    var tableEntries = [];
    var p = 12;
    for (var i = 0; i < numTables; i += 1) {
        var tag = parse.getTag(data, p);
        var offset = parse.getULong(data, p + 8);
        tableEntries.push({tag: tag, offset: offset, compression: false});
        p += 16;
    }

    return tableEntries;
}

function parseWOFFTableEntries(data, numTables) {
    var tableEntries = [];
    var p = 44; // offset to the first table directory entry.
    for (var i = 0; i < numTables; i += 1) {
        var tag = parse.getTag(data, p);
        var offset = parse.getULong(data, p + 4);
        var compLength = parse.getULong(data, p + 8);
        var origLength = parse.getULong(data, p + 12);
        var compression;
        if (compLength < origLength) {
            compression = 'WOFF';
        } else {
            compression = false;
        }

        tableEntries.push({tag: tag, offset: offset, compression: compression,
            compressedLength: compLength, originalLength: origLength});
        p += 20;
    }

    return tableEntries;
}

function uncompressTable(data, tableEntry) {
    if (tableEntry.compression === 'WOFF') {
        var inBuffer = new Uint8Array(data.buffer, tableEntry.offset + 2, tableEntry.compressedLength - 2);
        var outBuffer = new Uint8Array(tableEntry.originalLength);
        inflate(inBuffer, outBuffer);
        if (outBuffer.byteLength !== tableEntry.originalLength) {
            throw new Error('Decompression error: ' + tableEntry.tag + ' decompressed length doesn\'t match recorded length');
        }

        var view = new DataView(outBuffer.buffer, 0);
        return {data: view, offset: 0};
    } else {
        return {data: data, offset: tableEntry.offset};
    }
}

// Public API ///////////////////////////////////////////////////////////

// Parse the OpenType file data (as an ArrayBuffer) and return a Font object.
// Throws an error if the font could not be parsed.
function parseBuffer(buffer) {
    var indexToLocFormat;
    var ltagTable;

    // Since the constructor can also be called to create new fonts from scratch, we indicate this
    // should be an empty font that we'll fill with our own data.
    var font = new _font.Font({empty: true});

    // OpenType fonts use big endian byte ordering.
    // We can't rely on typed array view types, because they operate with the endianness of the host computer.
    // Instead we use DataViews where we can specify endianness.
    var data = new DataView(buffer, 0);
    var numTables;
    var tableEntries = [];
    var signature = parse.getTag(data, 0);
    if (signature === String.fromCharCode(0, 1, 0, 0)) {
        font.outlinesFormat = 'truetype';
        numTables = parse.getUShort(data, 4);
        tableEntries = parseOpenTypeTableEntries(data, numTables);
    } else if (signature === 'OTTO') {
        font.outlinesFormat = 'cff';
        numTables = parse.getUShort(data, 4);
        tableEntries = parseOpenTypeTableEntries(data, numTables);
    } else if (signature === 'wOFF') {
        var flavor = parse.getTag(data, 4);
        if (flavor === String.fromCharCode(0, 1, 0, 0)) {
            font.outlinesFormat = 'truetype';
        } else if (flavor === 'OTTO') {
            font.outlinesFormat = 'cff';
        } else {
            throw new Error('Unsupported OpenType flavor ' + signature);
        }

        numTables = parse.getUShort(data, 12);
        tableEntries = parseWOFFTableEntries(data, numTables);
    } else {
        throw new Error('Unsupported OpenType signature ' + signature);
    }

    var cffTableEntry;
    var fvarTableEntry;
    var glyfTableEntry;
    var gposTableEntry;
    var hmtxTableEntry;
    var kernTableEntry;
    var locaTableEntry;
    var nameTableEntry;

    for (var i = 0; i < numTables; i += 1) {
        var tableEntry = tableEntries[i];
        var table;
        switch (tableEntry.tag) {
        case 'cmap':
            table = uncompressTable(data, tableEntry);
            font.tables.cmap = cmap.parse(table.data, table.offset);
            font.encoding = new encoding.CmapEncoding(font.tables.cmap);
            break;
        case 'fvar':
            fvarTableEntry = tableEntry;
            break;
        case 'head':
            table = uncompressTable(data, tableEntry);
            font.tables.head = head.parse(table.data, table.offset);
            font.unitsPerEm = font.tables.head.unitsPerEm;
            indexToLocFormat = font.tables.head.indexToLocFormat;
            break;
        case 'hhea':
            table = uncompressTable(data, tableEntry);
            font.tables.hhea = hhea.parse(table.data, table.offset);
            font.ascender = font.tables.hhea.ascender;
            font.descender = font.tables.hhea.descender;
            font.numberOfHMetrics = font.tables.hhea.numberOfHMetrics;
            break;
        case 'hmtx':
            hmtxTableEntry = tableEntry;
            break;
        case 'ltag':
            table = uncompressTable(data, tableEntry);
            ltagTable = ltag.parse(table.data, table.offset);
            break;
        case 'maxp':
            table = uncompressTable(data, tableEntry);
            font.tables.maxp = maxp.parse(table.data, table.offset);
            font.numGlyphs = font.tables.maxp.numGlyphs;
            break;
        case 'name':
            nameTableEntry = tableEntry;
            break;
        case 'OS/2':
            table = uncompressTable(data, tableEntry);
            font.tables.os2 = os2.parse(table.data, table.offset);
            break;
        case 'post':
            table = uncompressTable(data, tableEntry);
            font.tables.post = post.parse(table.data, table.offset);
            font.glyphNames = new encoding.GlyphNames(font.tables.post);
            break;
        case 'glyf':
            glyfTableEntry = tableEntry;
            break;
        case 'loca':
            locaTableEntry = tableEntry;
            break;
        case 'CFF ':
            cffTableEntry = tableEntry;
            break;
        case 'kern':
            kernTableEntry = tableEntry;
            break;
        case 'GPOS':
            gposTableEntry = tableEntry;
            break;
        }
    }

    var nameTable = uncompressTable(data, nameTableEntry);
    font.tables.name = _name.parse(nameTable.data, nameTable.offset, ltagTable);
    font.names = font.tables.name;

    if (glyfTableEntry && locaTableEntry) {
        var shortVersion = indexToLocFormat === 0;
        var locaTable = uncompressTable(data, locaTableEntry);
        var locaOffsets = loca.parse(locaTable.data, locaTable.offset, font.numGlyphs, shortVersion);
        var glyfTable = uncompressTable(data, glyfTableEntry);
        font.glyphs = glyf.parse(glyfTable.data, glyfTable.offset, locaOffsets, font);
    } else if (cffTableEntry) {
        var cffTable = uncompressTable(data, cffTableEntry);
        cff.parse(cffTable.data, cffTable.offset, font);
    } else {
        throw new Error('Font doesn\'t contain TrueType or CFF outlines.');
    }

    var hmtxTable = uncompressTable(data, hmtxTableEntry);
    hmtx.parse(hmtxTable.data, hmtxTable.offset, font.numberOfHMetrics, font.numGlyphs, font.glyphs);
    encoding.addGlyphNames(font);

    if (kernTableEntry) {
        var kernTable = uncompressTable(data, kernTableEntry);
        font.kerningPairs = kern.parse(kernTable.data, kernTable.offset);
    } else {
        font.kerningPairs = {};
    }

    if (gposTableEntry) {
        var gposTable = uncompressTable(data, gposTableEntry);
        gpos.parse(gposTable.data, gposTable.offset, font);
    }

    if (fvarTableEntry) {
        var fvarTable = uncompressTable(data, fvarTableEntry);
        font.tables.fvar = fvar.parse(fvarTable.data, fvarTable.offset, font.names);
    }

    return font;
}

// Asynchronously load the font from a URL or a filesystem. When done, call the callback
// with two arguments `(err, font)`. The `err` will be null on success,
// the `font` is a Font object.
//
// We use the node.js callback convention so that
// opentype.js can integrate with frameworks like async.js.
function load(url, callback) {
    var isNode = typeof window === 'undefined';
    var loadFn = isNode ? loadFromFile : loadFromUrl;
    loadFn(url, function(err, arrayBuffer) {
        if (err) {
            return callback(err);
        }

        var font = parseBuffer(arrayBuffer);
        return callback(null, font);
    });
}

// Syncronously load the font from a URL or file.
// When done, return the font object or throw an error.
function loadSync(url) {
    var fs = require('fs');
    var buffer = fs.readFileSync(url);
    return parseBuffer(util.nodeBufferToArrayBuffer(buffer));
}

exports._parse = parse;
exports.Font = _font.Font;
exports.Glyph = glyph.Glyph;
exports.Path = path.Path;
exports.parse = parseBuffer;
exports.load = load;
exports.loadSync = loadSync;

},{"./encoding":4,"./font":5,"./glyph":6,"./parse":9,"./path":10,"./tables/cff":12,"./tables/cmap":13,"./tables/fvar":14,"./tables/glyf":15,"./tables/gpos":16,"./tables/head":17,"./tables/hhea":18,"./tables/hmtx":19,"./tables/kern":20,"./tables/loca":21,"./tables/ltag":22,"./tables/maxp":23,"./tables/name":24,"./tables/os2":25,"./tables/post":26,"./util":29,"fs":undefined,"tiny-inflate":1}],9:[function(require,module,exports){
// Parsing utility functions

'use strict';

// Retrieve an unsigned byte from the DataView.
exports.getByte = function getByte(dataView, offset) {
    return dataView.getUint8(offset);
};

exports.getCard8 = exports.getByte;

// Retrieve an unsigned 16-bit short from the DataView.
// The value is stored in big endian.
exports.getUShort = function(dataView, offset) {
    return dataView.getUint16(offset, false);
};

exports.getCard16 = exports.getUShort;

// Retrieve a signed 16-bit short from the DataView.
// The value is stored in big endian.
exports.getShort = function(dataView, offset) {
    return dataView.getInt16(offset, false);
};

// Retrieve an unsigned 32-bit long from the DataView.
// The value is stored in big endian.
exports.getULong = function(dataView, offset) {
    return dataView.getUint32(offset, false);
};

// Retrieve a 32-bit signed fixed-point number (16.16) from the DataView.
// The value is stored in big endian.
exports.getFixed = function(dataView, offset) {
    var decimal = dataView.getInt16(offset, false);
    var fraction = dataView.getUint16(offset + 2, false);
    return decimal + fraction / 65535;
};

// Retrieve a 4-character tag from the DataView.
// Tags are used to identify tables.
exports.getTag = function(dataView, offset) {
    var tag = '';
    for (var i = offset; i < offset + 4; i += 1) {
        tag += String.fromCharCode(dataView.getInt8(i));
    }

    return tag;
};

// Retrieve an offset from the DataView.
// Offsets are 1 to 4 bytes in length, depending on the offSize argument.
exports.getOffset = function(dataView, offset, offSize) {
    var v = 0;
    for (var i = 0; i < offSize; i += 1) {
        v <<= 8;
        v += dataView.getUint8(offset + i);
    }

    return v;
};

// Retrieve a number of bytes from start offset to the end offset from the DataView.
exports.getBytes = function(dataView, startOffset, endOffset) {
    var bytes = [];
    for (var i = startOffset; i < endOffset; i += 1) {
        bytes.push(dataView.getUint8(i));
    }

    return bytes;
};

// Convert the list of bytes to a string.
exports.bytesToString = function(bytes) {
    var s = '';
    for (var i = 0; i < bytes.length; i += 1) {
        s += String.fromCharCode(bytes[i]);
    }

    return s;
};

var typeOffsets = {
    byte: 1,
    uShort: 2,
    short: 2,
    uLong: 4,
    fixed: 4,
    longDateTime: 8,
    tag: 4
};

// A stateful parser that changes the offset whenever a value is retrieved.
// The data is a DataView.
function Parser(data, offset) {
    this.data = data;
    this.offset = offset;
    this.relativeOffset = 0;
}

Parser.prototype.parseByte = function() {
    var v = this.data.getUint8(this.offset + this.relativeOffset);
    this.relativeOffset += 1;
    return v;
};

Parser.prototype.parseChar = function() {
    var v = this.data.getInt8(this.offset + this.relativeOffset);
    this.relativeOffset += 1;
    return v;
};

Parser.prototype.parseCard8 = Parser.prototype.parseByte;

Parser.prototype.parseUShort = function() {
    var v = this.data.getUint16(this.offset + this.relativeOffset);
    this.relativeOffset += 2;
    return v;
};

Parser.prototype.parseCard16 = Parser.prototype.parseUShort;
Parser.prototype.parseSID = Parser.prototype.parseUShort;
Parser.prototype.parseOffset16 = Parser.prototype.parseUShort;

Parser.prototype.parseShort = function() {
    var v = this.data.getInt16(this.offset + this.relativeOffset);
    this.relativeOffset += 2;
    return v;
};

Parser.prototype.parseF2Dot14 = function() {
    var v = this.data.getInt16(this.offset + this.relativeOffset) / 16384;
    this.relativeOffset += 2;
    return v;
};

Parser.prototype.parseULong = function() {
    var v = exports.getULong(this.data, this.offset + this.relativeOffset);
    this.relativeOffset += 4;
    return v;
};

Parser.prototype.parseFixed = function() {
    var v = exports.getFixed(this.data, this.offset + this.relativeOffset);
    this.relativeOffset += 4;
    return v;
};

Parser.prototype.parseOffset16List =
Parser.prototype.parseUShortList = function(count) {
    var offsets = new Array(count);
    var dataView = this.data;
    var offset = this.offset + this.relativeOffset;
    for (var i = 0; i < count; i++) {
        offsets[i] = exports.getUShort(dataView, offset);
        offset += 2;
    }

    this.relativeOffset += count * 2;
    return offsets;
};

Parser.prototype.parseString = function(length) {
    var dataView = this.data;
    var offset = this.offset + this.relativeOffset;
    var string = '';
    this.relativeOffset += length;
    for (var i = 0; i < length; i++) {
        string += String.fromCharCode(dataView.getUint8(offset + i));
    }

    return string;
};

Parser.prototype.parseTag = function() {
    return this.parseString(4);
};

// LONGDATETIME is a 64-bit integer.
// JavaScript and unix timestamps traditionally use 32 bits, so we
// only take the last 32 bits.
Parser.prototype.parseLongDateTime = function() {
    var v = exports.getULong(this.data, this.offset + this.relativeOffset + 4);
    this.relativeOffset += 8;
    return v;
};

Parser.prototype.parseFixed = function() {
    var v = exports.getULong(this.data, this.offset + this.relativeOffset);
    this.relativeOffset += 4;
    return v / 65536;
};

Parser.prototype.parseVersion = function() {
    var major = exports.getUShort(this.data, this.offset + this.relativeOffset);

    // How to interpret the minor version is very vague in the spec. 0x5000 is 5, 0x1000 is 1
    // This returns the correct number if minor = 0xN000 where N is 0-9
    var minor = exports.getUShort(this.data, this.offset + this.relativeOffset + 2);
    this.relativeOffset += 4;
    return major + minor / 0x1000 / 10;
};

Parser.prototype.skip = function(type, amount) {
    if (amount === undefined) {
        amount = 1;
    }

    this.relativeOffset += typeOffsets[type] * amount;
};

exports.Parser = Parser;

},{}],10:[function(require,module,exports){
// Geometric objects

'use strict';

// A bézier path containing a set of path commands similar to a SVG path.
// Paths can be drawn on a context using `draw`.
function Path() {
    this.commands = [];
    this.fill = 'black';
    this.stroke = null;
    this.strokeWidth = 1;
}

Path.prototype.moveTo = function(x, y) {
    this.commands.push({
        type: 'M',
        x: x,
        y: y
    });
};

Path.prototype.lineTo = function(x, y) {
    this.commands.push({
        type: 'L',
        x: x,
        y: y
    });
};

Path.prototype.curveTo = Path.prototype.bezierCurveTo = function(x1, y1, x2, y2, x, y) {
    this.commands.push({
        type: 'C',
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        x: x,
        y: y
    });
};

Path.prototype.quadTo = Path.prototype.quadraticCurveTo = function(x1, y1, x, y) {
    this.commands.push({
        type: 'Q',
        x1: x1,
        y1: y1,
        x: x,
        y: y
    });
};

Path.prototype.close = Path.prototype.closePath = function() {
    this.commands.push({
        type: 'Z'
    });
};

// Add the given path or list of commands to the commands of this path.
Path.prototype.extend = function(pathOrCommands) {
    if (pathOrCommands.commands) {
        pathOrCommands = pathOrCommands.commands;
    }

    Array.prototype.push.apply(this.commands, pathOrCommands);
};

// Draw the path to a 2D context.
Path.prototype.draw = function(ctx) {
    ctx.beginPath();
    for (var i = 0; i < this.commands.length; i += 1) {
        var cmd = this.commands[i];
        if (cmd.type === 'M') {
            ctx.moveTo(cmd.x, cmd.y);
        } else if (cmd.type === 'L') {
            ctx.lineTo(cmd.x, cmd.y);
        } else if (cmd.type === 'C') {
            ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        } else if (cmd.type === 'Q') {
            ctx.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
        } else if (cmd.type === 'Z') {
            ctx.closePath();
        }
    }

    if (this.fill) {
        ctx.fillStyle = this.fill;
        ctx.fill();
    }

    if (this.stroke) {
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.strokeWidth;
        ctx.stroke();
    }
};

// Convert the Path to a string of path data instructions
// See http://www.w3.org/TR/SVG/paths.html#PathData
// Parameters:
// - decimalPlaces: The amount of decimal places for floating-point values (default: 2)
Path.prototype.toPathData = function(decimalPlaces) {
    decimalPlaces = decimalPlaces !== undefined ? decimalPlaces : 2;

    function floatToString(v) {
        if (Math.round(v) === v) {
            return '' + Math.round(v);
        } else {
            return v.toFixed(decimalPlaces);
        }
    }

    function packValues() {
        var s = '';
        for (var i = 0; i < arguments.length; i += 1) {
            var v = arguments[i];
            if (v >= 0 && i > 0) {
                s += ' ';
            }

            s += floatToString(v);
        }

        return s;
    }

    var d = '';
    for (var i = 0; i < this.commands.length; i += 1) {
        var cmd = this.commands[i];
        if (cmd.type === 'M') {
            d += 'M' + packValues(cmd.x, cmd.y);
        } else if (cmd.type === 'L') {
            d += 'L' + packValues(cmd.x, cmd.y);
        } else if (cmd.type === 'C') {
            d += 'C' + packValues(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        } else if (cmd.type === 'Q') {
            d += 'Q' + packValues(cmd.x1, cmd.y1, cmd.x, cmd.y);
        } else if (cmd.type === 'Z') {
            d += 'Z';
        }
    }

    return d;
};

// Convert the path to a SVG <path> element, as a string.
// Parameters:
// - decimalPlaces: The amount of decimal places for floating-point values (default: 2)
Path.prototype.toSVG = function(decimalPlaces) {
    var svg = '<path d="';
    svg += this.toPathData(decimalPlaces);
    svg += '"';
    if (this.fill & this.fill !== 'black') {
        if (this.fill === null) {
            svg += ' fill="none"';
        } else {
            svg += ' fill="' + this.fill + '"';
        }
    }

    if (this.stroke) {
        svg += ' stroke="' + this.stroke + '" stroke-width="' + this.strokeWidth + '"';
    }

    svg += '/>';
    return svg;
};

exports.Path = Path;

},{}],11:[function(require,module,exports){
// Table metadata

'use strict';

var check = require('./check');
var encode = require('./types').encode;
var sizeOf = require('./types').sizeOf;

function Table(tableName, fields, options) {
    var i;
    for (i = 0; i < fields.length; i += 1) {
        var field = fields[i];
        this[field.name] = field.value;
    }

    this.tableName = tableName;
    this.fields = fields;
    if (options) {
        var optionKeys = Object.keys(options);
        for (i = 0; i < optionKeys.length; i += 1) {
            var k = optionKeys[i];
            var v = options[k];
            if (this[k] !== undefined) {
                this[k] = v;
            }
        }
    }
}

Table.prototype.sizeOf = function() {
    var v = 0;
    for (var i = 0; i < this.fields.length; i += 1) {
        var field = this.fields[i];
        var value = this[field.name];
        if (value === undefined) {
            value = field.value;
        }

        if (typeof value.sizeOf === 'function') {
            v += value.sizeOf();
        } else {
            var sizeOfFunction = sizeOf[field.type];
            check.assert(typeof sizeOfFunction === 'function', 'Could not find sizeOf function for field' + field.name);
            v += sizeOfFunction(value);
        }
    }

    return v;
};

Table.prototype.encode = function() {
    return encode.TABLE(this);
};

exports.Table = Table;

},{"./check":2,"./types":28}],12:[function(require,module,exports){
// The `CFF` table contains the glyph outlines in PostScript format.
// https://www.microsoft.com/typography/OTSPEC/cff.htm
// http://download.microsoft.com/download/8/0/1/801a191c-029d-4af3-9642-555f6fe514ee/cff.pdf
// http://download.microsoft.com/download/8/0/1/801a191c-029d-4af3-9642-555f6fe514ee/type2.pdf

'use strict';

var encoding = require('../encoding');
var glyphset = require('../glyphset');
var parse = require('../parse');
var path = require('../path');
var table = require('../table');

// Custom equals function that can also check lists.
function equals(a, b) {
    if (a === b) {
        return true;
    } else if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }

        for (var i = 0; i < a.length; i += 1) {
            if (!equals(a[i], b[i])) {
                return false;
            }
        }

        return true;
    } else {
        return false;
    }
}

// Parse a `CFF` INDEX array.
// An index array consists of a list of offsets, then a list of objects at those offsets.
function parseCFFIndex(data, start, conversionFn) {
    //var i, objectOffset, endOffset;
    var offsets = [];
    var objects = [];
    var count = parse.getCard16(data, start);
    var i;
    var objectOffset;
    var endOffset;
    if (count !== 0) {
        var offsetSize = parse.getByte(data, start + 2);
        objectOffset = start + ((count + 1) * offsetSize) + 2;
        var pos = start + 3;
        for (i = 0; i < count + 1; i += 1) {
            offsets.push(parse.getOffset(data, pos, offsetSize));
            pos += offsetSize;
        }

        // The total size of the index array is 4 header bytes + the value of the last offset.
        endOffset = objectOffset + offsets[count];
    } else {
        endOffset = start + 2;
    }

    for (i = 0; i < offsets.length - 1; i += 1) {
        var value = parse.getBytes(data, objectOffset + offsets[i], objectOffset + offsets[i + 1]);
        if (conversionFn) {
            value = conversionFn(value);
        }

        objects.push(value);
    }

    return {objects: objects, startOffset: start, endOffset: endOffset};
}

// Parse a `CFF` DICT real value.
function parseFloatOperand(parser) {
    var s = '';
    var eof = 15;
    var lookup = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'E', 'E-', null, '-'];
    while (true) {
        var b = parser.parseByte();
        var n1 = b >> 4;
        var n2 = b & 15;

        if (n1 === eof) {
            break;
        }

        s += lookup[n1];

        if (n2 === eof) {
            break;
        }

        s += lookup[n2];
    }

    return parseFloat(s);
}

// Parse a `CFF` DICT operand.
function parseOperand(parser, b0) {
    var b1;
    var b2;
    var b3;
    var b4;
    if (b0 === 28) {
        b1 = parser.parseByte();
        b2 = parser.parseByte();
        return b1 << 8 | b2;
    }

    if (b0 === 29) {
        b1 = parser.parseByte();
        b2 = parser.parseByte();
        b3 = parser.parseByte();
        b4 = parser.parseByte();
        return b1 << 24 | b2 << 16 | b3 << 8 | b4;
    }

    if (b0 === 30) {
        return parseFloatOperand(parser);
    }

    if (b0 >= 32 && b0 <= 246) {
        return b0 - 139;
    }

    if (b0 >= 247 && b0 <= 250) {
        b1 = parser.parseByte();
        return (b0 - 247) * 256 + b1 + 108;
    }

    if (b0 >= 251 && b0 <= 254) {
        b1 = parser.parseByte();
        return -(b0 - 251) * 256 - b1 - 108;
    }

    throw new Error('Invalid b0 ' + b0);
}

// Convert the entries returned by `parseDict` to a proper dictionary.
// If a value is a list of one, it is unpacked.
function entriesToObject(entries) {
    var o = {};
    for (var i = 0; i < entries.length; i += 1) {
        var key = entries[i][0];
        var values = entries[i][1];
        var value;
        if (values.length === 1) {
            value = values[0];
        } else {
            value = values;
        }

        if (o.hasOwnProperty(key)) {
            throw new Error('Object ' + o + ' already has key ' + key);
        }

        o[key] = value;
    }

    return o;
}

// Parse a `CFF` DICT object.
// A dictionary contains key-value pairs in a compact tokenized format.
function parseCFFDict(data, start, size) {
    start = start !== undefined ? start : 0;
    var parser = new parse.Parser(data, start);
    var entries = [];
    var operands = [];
    size = size !== undefined ? size : data.length;

    while (parser.relativeOffset < size) {
        var op = parser.parseByte();

        // The first byte for each dict item distinguishes between operator (key) and operand (value).
        // Values <= 21 are operators.
        if (op <= 21) {
            // Two-byte operators have an initial escape byte of 12.
            if (op === 12) {
                op = 1200 + parser.parseByte();
            }

            entries.push([op, operands]);
            operands = [];
        } else {
            // Since the operands (values) come before the operators (keys), we store all operands in a list
            // until we encounter an operator.
            operands.push(parseOperand(parser, op));
        }
    }

    return entriesToObject(entries);
}

// Given a String Index (SID), return the value of the string.
// Strings below index 392 are standard CFF strings and are not encoded in the font.
function getCFFString(strings, index) {
    if (index <= 390) {
        index = encoding.cffStandardStrings[index];
    } else {
        index = strings[index - 391];
    }

    return index;
}

// Interpret a dictionary and return a new dictionary with readable keys and values for missing entries.
// This function takes `meta` which is a list of objects containing `operand`, `name` and `default`.
function interpretDict(dict, meta, strings) {
    var newDict = {};

    // Because we also want to include missing values, we start out from the meta list
    // and lookup values in the dict.
    for (var i = 0; i < meta.length; i += 1) {
        var m = meta[i];
        var value = dict[m.op];
        if (value === undefined) {
            value = m.value !== undefined ? m.value : null;
        }

        if (m.type === 'SID') {
            value = getCFFString(strings, value);
        }

        newDict[m.name] = value;
    }

    return newDict;
}

// Parse the CFF header.
function parseCFFHeader(data, start) {
    var header = {};
    header.formatMajor = parse.getCard8(data, start);
    header.formatMinor = parse.getCard8(data, start + 1);
    header.size = parse.getCard8(data, start + 2);
    header.offsetSize = parse.getCard8(data, start + 3);
    header.startOffset = start;
    header.endOffset = start + 4;
    return header;
}

var TOP_DICT_META = [
    {name: 'version', op: 0, type: 'SID'},
    {name: 'notice', op: 1, type: 'SID'},
    {name: 'copyright', op: 1200, type: 'SID'},
    {name: 'fullName', op: 2, type: 'SID'},
    {name: 'familyName', op: 3, type: 'SID'},
    {name: 'weight', op: 4, type: 'SID'},
    {name: 'isFixedPitch', op: 1201, type: 'number', value: 0},
    {name: 'italicAngle', op: 1202, type: 'number', value: 0},
    {name: 'underlinePosition', op: 1203, type: 'number', value: -100},
    {name: 'underlineThickness', op: 1204, type: 'number', value: 50},
    {name: 'paintType', op: 1205, type: 'number', value: 0},
    {name: 'charstringType', op: 1206, type: 'number', value: 2},
    {name: 'fontMatrix', op: 1207, type: ['real', 'real', 'real', 'real', 'real', 'real'], value: [0.001, 0, 0, 0.001, 0, 0]},
    {name: 'uniqueId', op: 13, type: 'number'},
    {name: 'fontBBox', op: 5, type: ['number', 'number', 'number', 'number'], value: [0, 0, 0, 0]},
    {name: 'strokeWidth', op: 1208, type: 'number', value: 0},
    {name: 'xuid', op: 14, type: [], value: null},
    {name: 'charset', op: 15, type: 'offset', value: 0},
    {name: 'encoding', op: 16, type: 'offset', value: 0},
    {name: 'charStrings', op: 17, type: 'offset', value: 0},
    {name: 'private', op: 18, type: ['number', 'offset'], value: [0, 0]}
];

var PRIVATE_DICT_META = [
    {name: 'subrs', op: 19, type: 'offset', value: 0},
    {name: 'defaultWidthX', op: 20, type: 'number', value: 0},
    {name: 'nominalWidthX', op: 21, type: 'number', value: 0}
];

// Parse the CFF top dictionary. A CFF table can contain multiple fonts, each with their own top dictionary.
// The top dictionary contains the essential metadata for the font, together with the private dictionary.
function parseCFFTopDict(data, strings) {
    var dict = parseCFFDict(data, 0, data.byteLength);
    return interpretDict(dict, TOP_DICT_META, strings);
}

// Parse the CFF private dictionary. We don't fully parse out all the values, only the ones we need.
function parseCFFPrivateDict(data, start, size, strings) {
    var dict = parseCFFDict(data, start, size);
    return interpretDict(dict, PRIVATE_DICT_META, strings);
}

// Parse the CFF charset table, which contains internal names for all the glyphs.
// This function will return a list of glyph names.
// See Adobe TN #5176 chapter 13, "Charsets".
function parseCFFCharset(data, start, nGlyphs, strings) {
    var i;
    var sid;
    var count;
    var parser = new parse.Parser(data, start);

    // The .notdef glyph is not included, so subtract 1.
    nGlyphs -= 1;
    var charset = ['.notdef'];

    var format = parser.parseCard8();
    if (format === 0) {
        for (i = 0; i < nGlyphs; i += 1) {
            sid = parser.parseSID();
            charset.push(getCFFString(strings, sid));
        }
    } else if (format === 1) {
        while (charset.length <= nGlyphs) {
            sid = parser.parseSID();
            count = parser.parseCard8();
            for (i = 0; i <= count; i += 1) {
                charset.push(getCFFString(strings, sid));
                sid += 1;
            }
        }
    } else if (format === 2) {
        while (charset.length <= nGlyphs) {
            sid = parser.parseSID();
            count = parser.parseCard16();
            for (i = 0; i <= count; i += 1) {
                charset.push(getCFFString(strings, sid));
                sid += 1;
            }
        }
    } else {
        throw new Error('Unknown charset format ' + format);
    }

    return charset;
}

// Parse the CFF encoding data. Only one encoding can be specified per font.
// See Adobe TN #5176 chapter 12, "Encodings".
function parseCFFEncoding(data, start, charset) {
    var i;
    var code;
    var enc = {};
    var parser = new parse.Parser(data, start);
    var format = parser.parseCard8();
    if (format === 0) {
        var nCodes = parser.parseCard8();
        for (i = 0; i < nCodes; i += 1) {
            code = parser.parseCard8();
            enc[code] = i;
        }
    } else if (format === 1) {
        var nRanges = parser.parseCard8();
        code = 1;
        for (i = 0; i < nRanges; i += 1) {
            var first = parser.parseCard8();
            var nLeft = parser.parseCard8();
            for (var j = first; j <= first + nLeft; j += 1) {
                enc[j] = code;
                code += 1;
            }
        }
    } else {
        throw new Error('Unknown encoding format ' + format);
    }

    return new encoding.CffEncoding(enc, charset);
}

// Take in charstring code and return a Glyph object.
// The encoding is described in the Type 2 Charstring Format
// https://www.microsoft.com/typography/OTSPEC/charstr2.htm
function parseCFFCharstring(font, glyph, code) {
    var c1x;
    var c1y;
    var c2x;
    var c2y;
    var p = new path.Path();
    var stack = [];
    var nStems = 0;
    var haveWidth = false;
    var width = font.defaultWidthX;
    var open = false;
    var x = 0;
    var y = 0;

    function newContour(x, y) {
        if (open) {
            p.closePath();
        }

        p.moveTo(x, y);
        open = true;
    }

    function parseStems() {
        var hasWidthArg;

        // The number of stem operators on the stack is always even.
        // If the value is uneven, that means a width is specified.
        hasWidthArg = stack.length % 2 !== 0;
        if (hasWidthArg && !haveWidth) {
            width = stack.shift() + font.nominalWidthX;
        }

        nStems += stack.length >> 1;
        stack.length = 0;
        haveWidth = true;
    }

    function parse(code) {
        var b1;
        var b2;
        var b3;
        var b4;
        var codeIndex;
        var subrCode;
        var jpx;
        var jpy;
        var c3x;
        var c3y;
        var c4x;
        var c4y;

        var i = 0;
        while (i < code.length) {
            var v = code[i];
            i += 1;
            switch (v) {
            case 1: // hstem
                parseStems();
                break;
            case 3: // vstem
                parseStems();
                break;
            case 4: // vmoveto
                if (stack.length > 1 && !haveWidth) {
                    width = stack.shift() + font.nominalWidthX;
                    haveWidth = true;
                }

                y += stack.pop();
                newContour(x, y);
                break;
            case 5: // rlineto
                while (stack.length > 0) {
                    x += stack.shift();
                    y += stack.shift();
                    p.lineTo(x, y);
                }

                break;
            case 6: // hlineto
                while (stack.length > 0) {
                    x += stack.shift();
                    p.lineTo(x, y);
                    if (stack.length === 0) {
                        break;
                    }

                    y += stack.shift();
                    p.lineTo(x, y);
                }

                break;
            case 7: // vlineto
                while (stack.length > 0) {
                    y += stack.shift();
                    p.lineTo(x, y);
                    if (stack.length === 0) {
                        break;
                    }

                    x += stack.shift();
                    p.lineTo(x, y);
                }

                break;
            case 8: // rrcurveto
                while (stack.length > 0) {
                    c1x = x + stack.shift();
                    c1y = y + stack.shift();
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    x = c2x + stack.shift();
                    y = c2y + stack.shift();
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                }

                break;
            case 10: // callsubr
                codeIndex = stack.pop() + font.subrsBias;
                subrCode = font.subrs[codeIndex];
                if (subrCode) {
                    parse(subrCode);
                }

                break;
            case 11: // return
                return;
            case 12: // flex operators
                v = code[i];
                i += 1;
                switch (v) {
                case 35: // flex
                    // |- dx1 dy1 dx2 dy2 dx3 dy3 dx4 dy4 dx5 dy5 dx6 dy6 fd flex (12 35) |-
                    c1x = x   + stack.shift();    // dx1
                    c1y = y   + stack.shift();    // dy1
                    c2x = c1x + stack.shift();    // dx2
                    c2y = c1y + stack.shift();    // dy2
                    jpx = c2x + stack.shift();    // dx3
                    jpy = c2y + stack.shift();    // dy3
                    c3x = jpx + stack.shift();    // dx4
                    c3y = jpy + stack.shift();    // dy4
                    c4x = c3x + stack.shift();    // dx5
                    c4y = c3y + stack.shift();    // dy5
                    x = c4x + stack.shift();      // dx6
                    y = c4y + stack.shift();      // dy6
                    stack.shift();                // flex depth
                    p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                    p.curveTo(c3x, c3y, c4x, c4y, x, y);
                    break;
                case 34: // hflex
                    // |- dx1 dx2 dy2 dx3 dx4 dx5 dx6 hflex (12 34) |-
                    c1x = x   + stack.shift();    // dx1
                    c1y = y;                      // dy1
                    c2x = c1x + stack.shift();    // dx2
                    c2y = c1y + stack.shift();    // dy2
                    jpx = c2x + stack.shift();    // dx3
                    jpy = c2y;                    // dy3
                    c3x = jpx + stack.shift();    // dx4
                    c3y = c2y;                    // dy4
                    c4x = c3x + stack.shift();    // dx5
                    c4y = y;                      // dy5
                    x = c4x + stack.shift();      // dx6
                    p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                    p.curveTo(c3x, c3y, c4x, c4y, x, y);
                    break;
                case 36: // hflex1
                    // |- dx1 dy1 dx2 dy2 dx3 dx4 dx5 dy5 dx6 hflex1 (12 36) |-
                    c1x = x   + stack.shift();    // dx1
                    c1y = y   + stack.shift();    // dy1
                    c2x = c1x + stack.shift();    // dx2
                    c2y = c1y + stack.shift();    // dy2
                    jpx = c2x + stack.shift();    // dx3
                    jpy = c2y;                    // dy3
                    c3x = jpx + stack.shift();    // dx4
                    c3y = c2y;                    // dy4
                    c4x = c3x + stack.shift();    // dx5
                    c4y = c3y + stack.shift();    // dy5
                    x = c4x + stack.shift();      // dx6
                    p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                    p.curveTo(c3x, c3y, c4x, c4y, x, y);
                    break;
                case 37: // flex1
                    // |- dx1 dy1 dx2 dy2 dx3 dy3 dx4 dy4 dx5 dy5 d6 flex1 (12 37) |-
                    c1x = x   + stack.shift();    // dx1
                    c1y = y   + stack.shift();    // dy1
                    c2x = c1x + stack.shift();    // dx2
                    c2y = c1y + stack.shift();    // dy2
                    jpx = c2x + stack.shift();    // dx3
                    jpy = c2y + stack.shift();    // dy3
                    c3x = jpx + stack.shift();    // dx4
                    c3y = jpy + stack.shift();    // dy4
                    c4x = c3x + stack.shift();    // dx5
                    c4y = c3y + stack.shift();    // dy5
                    if (Math.abs(c4x - x) > Math.abs(c4y - y)) {
                        x = c4x + stack.shift();
                    } else {
                        y = c4y + stack.shift();
                    }

                    p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                    p.curveTo(c3x, c3y, c4x, c4y, x, y);
                    break;
                default:
                    console.log('Glyph ' + glyph.index + ': unknown operator ' + 1200 + v);
                    stack.length = 0;
                }
                break;
            case 14: // endchar
                if (stack.length > 0 && !haveWidth) {
                    width = stack.shift() + font.nominalWidthX;
                    haveWidth = true;
                }

                if (open) {
                    p.closePath();
                    open = false;
                }

                break;
            case 18: // hstemhm
                parseStems();
                break;
            case 19: // hintmask
            case 20: // cntrmask
                parseStems();
                i += (nStems + 7) >> 3;
                break;
            case 21: // rmoveto
                if (stack.length > 2 && !haveWidth) {
                    width = stack.shift() + font.nominalWidthX;
                    haveWidth = true;
                }

                y += stack.pop();
                x += stack.pop();
                newContour(x, y);
                break;
            case 22: // hmoveto
                if (stack.length > 1 && !haveWidth) {
                    width = stack.shift() + font.nominalWidthX;
                    haveWidth = true;
                }

                x += stack.pop();
                newContour(x, y);
                break;
            case 23: // vstemhm
                parseStems();
                break;
            case 24: // rcurveline
                while (stack.length > 2) {
                    c1x = x + stack.shift();
                    c1y = y + stack.shift();
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    x = c2x + stack.shift();
                    y = c2y + stack.shift();
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                }

                x += stack.shift();
                y += stack.shift();
                p.lineTo(x, y);
                break;
            case 25: // rlinecurve
                while (stack.length > 6) {
                    x += stack.shift();
                    y += stack.shift();
                    p.lineTo(x, y);
                }

                c1x = x + stack.shift();
                c1y = y + stack.shift();
                c2x = c1x + stack.shift();
                c2y = c1y + stack.shift();
                x = c2x + stack.shift();
                y = c2y + stack.shift();
                p.curveTo(c1x, c1y, c2x, c2y, x, y);
                break;
            case 26: // vvcurveto
                if (stack.length % 2) {
                    x += stack.shift();
                }

                while (stack.length > 0) {
                    c1x = x;
                    c1y = y + stack.shift();
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    x = c2x;
                    y = c2y + stack.shift();
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                }

                break;
            case 27: // hhcurveto
                if (stack.length % 2) {
                    y += stack.shift();
                }

                while (stack.length > 0) {
                    c1x = x + stack.shift();
                    c1y = y;
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    x = c2x + stack.shift();
                    y = c2y;
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                }

                break;
            case 28: // shortint
                b1 = code[i];
                b2 = code[i + 1];
                stack.push(((b1 << 24) | (b2 << 16)) >> 16);
                i += 2;
                break;
            case 29: // callgsubr
                codeIndex = stack.pop() + font.gsubrsBias;
                subrCode = font.gsubrs[codeIndex];
                if (subrCode) {
                    parse(subrCode);
                }

                break;
            case 30: // vhcurveto
                while (stack.length > 0) {
                    c1x = x;
                    c1y = y + stack.shift();
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    x = c2x + stack.shift();
                    y = c2y + (stack.length === 1 ? stack.shift() : 0);
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    if (stack.length === 0) {
                        break;
                    }

                    c1x = x + stack.shift();
                    c1y = y;
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    y = c2y + stack.shift();
                    x = c2x + (stack.length === 1 ? stack.shift() : 0);
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                }

                break;
            case 31: // hvcurveto
                while (stack.length > 0) {
                    c1x = x + stack.shift();
                    c1y = y;
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    y = c2y + stack.shift();
                    x = c2x + (stack.length === 1 ? stack.shift() : 0);
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    if (stack.length === 0) {
                        break;
                    }

                    c1x = x;
                    c1y = y + stack.shift();
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    x = c2x + stack.shift();
                    y = c2y + (stack.length === 1 ? stack.shift() : 0);
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                }

                break;
            default:
                if (v < 32) {
                    console.log('Glyph ' + glyph.index + ': unknown operator ' + v);
                } else if (v < 247) {
                    stack.push(v - 139);
                } else if (v < 251) {
                    b1 = code[i];
                    i += 1;
                    stack.push((v - 247) * 256 + b1 + 108);
                } else if (v < 255) {
                    b1 = code[i];
                    i += 1;
                    stack.push(-(v - 251) * 256 - b1 - 108);
                } else {
                    b1 = code[i];
                    b2 = code[i + 1];
                    b3 = code[i + 2];
                    b4 = code[i + 3];
                    i += 4;
                    stack.push(((b1 << 24) | (b2 << 16) | (b3 << 8) | b4) / 65536);
                }
            }
        }
    }

    parse(code);

    glyph.advanceWidth = width;
    return p;
}

// Subroutines are encoded using the negative half of the number space.
// See type 2 chapter 4.7 "Subroutine operators".
function calcCFFSubroutineBias(subrs) {
    var bias;
    if (subrs.length < 1240) {
        bias = 107;
    } else if (subrs.length < 33900) {
        bias = 1131;
    } else {
        bias = 32768;
    }

    return bias;
}

// Parse the `CFF` table, which contains the glyph outlines in PostScript format.
function parseCFFTable(data, start, font) {
    font.tables.cff = {};
    var header = parseCFFHeader(data, start);
    var nameIndex = parseCFFIndex(data, header.endOffset, parse.bytesToString);
    var topDictIndex = parseCFFIndex(data, nameIndex.endOffset);
    var stringIndex = parseCFFIndex(data, topDictIndex.endOffset, parse.bytesToString);
    var globalSubrIndex = parseCFFIndex(data, stringIndex.endOffset);
    font.gsubrs = globalSubrIndex.objects;
    font.gsubrsBias = calcCFFSubroutineBias(font.gsubrs);

    var topDictData = new DataView(new Uint8Array(topDictIndex.objects[0]).buffer);
    var topDict = parseCFFTopDict(topDictData, stringIndex.objects);
    font.tables.cff.topDict = topDict;

    var privateDictOffset = start + topDict['private'][1];
    var privateDict = parseCFFPrivateDict(data, privateDictOffset, topDict['private'][0], stringIndex.objects);
    font.defaultWidthX = privateDict.defaultWidthX;
    font.nominalWidthX = privateDict.nominalWidthX;

    if (privateDict.subrs !== 0) {
        var subrOffset = privateDictOffset + privateDict.subrs;
        var subrIndex = parseCFFIndex(data, subrOffset);
        font.subrs = subrIndex.objects;
        font.subrsBias = calcCFFSubroutineBias(font.subrs);
    } else {
        font.subrs = [];
        font.subrsBias = 0;
    }

    // Offsets in the top dict are relative to the beginning of the CFF data, so add the CFF start offset.
    var charStringsIndex = parseCFFIndex(data, start + topDict.charStrings);
    font.nGlyphs = charStringsIndex.objects.length;

    var charset = parseCFFCharset(data, start + topDict.charset, font.nGlyphs, stringIndex.objects);
    if (topDict.encoding === 0) { // Standard encoding
        font.cffEncoding = new encoding.CffEncoding(encoding.cffStandardEncoding, charset);
    } else if (topDict.encoding === 1) { // Expert encoding
        font.cffEncoding = new encoding.CffEncoding(encoding.cffExpertEncoding, charset);
    } else {
        font.cffEncoding = parseCFFEncoding(data, start + topDict.encoding, charset);
    }

    // Prefer the CMAP encoding to the CFF encoding.
    font.encoding = font.encoding || font.cffEncoding;

    font.glyphs = new glyphset.GlyphSet(font);
    for (var i = 0; i < font.nGlyphs; i += 1) {
        var charString = charStringsIndex.objects[i];
        font.glyphs.push(i, glyphset.cffGlyphLoader(font, i, parseCFFCharstring, charString));
    }
}

// Convert a string to a String ID (SID).
// The list of strings is modified in place.
function encodeString(s, strings) {
    var sid;

    // Is the string in the CFF standard strings?
    var i = encoding.cffStandardStrings.indexOf(s);
    if (i >= 0) {
        sid = i;
    }

    // Is the string already in the string index?
    i = strings.indexOf(s);
    if (i >= 0) {
        sid = i + encoding.cffStandardStrings.length;
    } else {
        sid = encoding.cffStandardStrings.length + strings.length;
        strings.push(s);
    }

    return sid;
}

function makeHeader() {
    return new table.Table('Header', [
        {name: 'major', type: 'Card8', value: 1},
        {name: 'minor', type: 'Card8', value: 0},
        {name: 'hdrSize', type: 'Card8', value: 4},
        {name: 'major', type: 'Card8', value: 1}
    ]);
}

function makeNameIndex(fontNames) {
    var t = new table.Table('Name INDEX', [
        {name: 'names', type: 'INDEX', value: []}
    ]);
    t.names = [];
    for (var i = 0; i < fontNames.length; i += 1) {
        t.names.push({name: 'name_' + i, type: 'NAME', value: fontNames[i]});
    }

    return t;
}

// Given a dictionary's metadata, create a DICT structure.
function makeDict(meta, attrs, strings) {
    var m = {};
    for (var i = 0; i < meta.length; i += 1) {
        var entry = meta[i];
        var value = attrs[entry.name];
        if (value !== undefined && !equals(value, entry.value)) {
            if (entry.type === 'SID') {
                value = encodeString(value, strings);
            }

            m[entry.op] = {name: entry.name, type: entry.type, value: value};
        }
    }

    return m;
}

// The Top DICT houses the global font attributes.
function makeTopDict(attrs, strings) {
    var t = new table.Table('Top DICT', [
        {name: 'dict', type: 'DICT', value: {}}
    ]);
    t.dict = makeDict(TOP_DICT_META, attrs, strings);
    return t;
}

function makeTopDictIndex(topDict) {
    var t = new table.Table('Top DICT INDEX', [
        {name: 'topDicts', type: 'INDEX', value: []}
    ]);
    t.topDicts = [{name: 'topDict_0', type: 'TABLE', value: topDict}];
    return t;
}

function makeStringIndex(strings) {
    var t = new table.Table('String INDEX', [
        {name: 'strings', type: 'INDEX', value: []}
    ]);
    t.strings = [];
    for (var i = 0; i < strings.length; i += 1) {
        t.strings.push({name: 'string_' + i, type: 'STRING', value: strings[i]});
    }

    return t;
}

function makeGlobalSubrIndex() {
    // Currently we don't use subroutines.
    return new table.Table('Global Subr INDEX', [
        {name: 'subrs', type: 'INDEX', value: []}
    ]);
}

function makeCharsets(glyphNames, strings) {
    var t = new table.Table('Charsets', [
        {name: 'format', type: 'Card8', value: 0}
    ]);
    for (var i = 0; i < glyphNames.length; i += 1) {
        var glyphName = glyphNames[i];
        var glyphSID = encodeString(glyphName, strings);
        t.fields.push({name: 'glyph_' + i, type: 'SID', value: glyphSID});
    }

    return t;
}

function glyphToOps(glyph) {
    var ops = [];
    var path = glyph.path;
    ops.push({name: 'width', type: 'NUMBER', value: glyph.advanceWidth});
    var x = 0;
    var y = 0;
    for (var i = 0; i < path.commands.length; i += 1) {
        var dx;
        var dy;
        var cmd = path.commands[i];
        if (cmd.type === 'Q') {
            // CFF only supports bézier curves, so convert the quad to a bézier.
            var _13 = 1 / 3;
            var _23 = 2 / 3;

            // We're going to create a new command so we don't change the original path.
            cmd = {
                type: 'C',
                x: cmd.x,
                y: cmd.y,
                x1: _13 * x + _23 * cmd.x1,
                y1: _13 * y + _23 * cmd.y1,
                x2: _13 * cmd.x + _23 * cmd.x1,
                y2: _13 * cmd.y + _23 * cmd.y1
            };
        }

        if (cmd.type === 'M') {
            dx = Math.round(cmd.x - x);
            dy = Math.round(cmd.y - y);
            ops.push({name: 'dx', type: 'NUMBER', value: dx});
            ops.push({name: 'dy', type: 'NUMBER', value: dy});
            ops.push({name: 'rmoveto', type: 'OP', value: 21});
            x = Math.round(cmd.x);
            y = Math.round(cmd.y);
        } else if (cmd.type === 'L') {
            dx = Math.round(cmd.x - x);
            dy = Math.round(cmd.y - y);
            ops.push({name: 'dx', type: 'NUMBER', value: dx});
            ops.push({name: 'dy', type: 'NUMBER', value: dy});
            ops.push({name: 'rlineto', type: 'OP', value: 5});
            x = Math.round(cmd.x);
            y = Math.round(cmd.y);
        } else if (cmd.type === 'C') {
            var dx1 = Math.round(cmd.x1 - x);
            var dy1 = Math.round(cmd.y1 - y);
            var dx2 = Math.round(cmd.x2 - cmd.x1);
            var dy2 = Math.round(cmd.y2 - cmd.y1);
            dx = Math.round(cmd.x - cmd.x2);
            dy = Math.round(cmd.y - cmd.y2);
            ops.push({name: 'dx1', type: 'NUMBER', value: dx1});
            ops.push({name: 'dy1', type: 'NUMBER', value: dy1});
            ops.push({name: 'dx2', type: 'NUMBER', value: dx2});
            ops.push({name: 'dy2', type: 'NUMBER', value: dy2});
            ops.push({name: 'dx', type: 'NUMBER', value: dx});
            ops.push({name: 'dy', type: 'NUMBER', value: dy});
            ops.push({name: 'rrcurveto', type: 'OP', value: 8});
            x = Math.round(cmd.x);
            y = Math.round(cmd.y);
        }

        // Contours are closed automatically.

    }

    ops.push({name: 'endchar', type: 'OP', value: 14});
    return ops;
}

function makeCharStringsIndex(glyphs) {
    var t = new table.Table('CharStrings INDEX', [
        {name: 'charStrings', type: 'INDEX', value: []}
    ]);

    for (var i = 0; i < glyphs.length; i += 1) {
        var glyph = glyphs.get(i);
        var ops = glyphToOps(glyph);
        t.charStrings.push({name: glyph.name, type: 'CHARSTRING', value: ops});
    }

    return t;
}

function makePrivateDict(attrs, strings) {
    var t = new table.Table('Private DICT', [
        {name: 'dict', type: 'DICT', value: {}}
    ]);
    t.dict = makeDict(PRIVATE_DICT_META, attrs, strings);
    return t;
}

function makeCFFTable(glyphs, options) {
    var t = new table.Table('CFF ', [
        {name: 'header', type: 'TABLE'},
        {name: 'nameIndex', type: 'TABLE'},
        {name: 'topDictIndex', type: 'TABLE'},
        {name: 'stringIndex', type: 'TABLE'},
        {name: 'globalSubrIndex', type: 'TABLE'},
        {name: 'charsets', type: 'TABLE'},
        {name: 'charStringsIndex', type: 'TABLE'},
        {name: 'privateDict', type: 'TABLE'}
    ]);

    var fontScale = 1 / options.unitsPerEm;
    // We use non-zero values for the offsets so that the DICT encodes them.
    // This is important because the size of the Top DICT plays a role in offset calculation,
    // and the size shouldn't change after we've written correct offsets.
    var attrs = {
        version: options.version,
        fullName: options.fullName,
        familyName: options.familyName,
        weight: options.weightName,
        fontBBox: options.fontBBox || [0, 0, 0, 0],
        fontMatrix: [fontScale, 0, 0, fontScale, 0, 0],
        charset: 999,
        encoding: 0,
        charStrings: 999,
        private: [0, 999]
    };

    var privateAttrs = {};

    var glyphNames = [];
    var glyph;

    // Skip first glyph (.notdef)
    for (var i = 1; i < glyphs.length; i += 1) {
        glyph = glyphs.get(i);
        glyphNames.push(glyph.name);
    }

    var strings = [];

    t.header = makeHeader();
    t.nameIndex = makeNameIndex([options.postScriptName]);
    var topDict = makeTopDict(attrs, strings);
    t.topDictIndex = makeTopDictIndex(topDict);
    t.globalSubrIndex = makeGlobalSubrIndex();
    t.charsets = makeCharsets(glyphNames, strings);
    t.charStringsIndex = makeCharStringsIndex(glyphs);
    t.privateDict = makePrivateDict(privateAttrs, strings);

    // Needs to come at the end, to encode all custom strings used in the font.
    t.stringIndex = makeStringIndex(strings);

    var startOffset = t.header.sizeOf() +
        t.nameIndex.sizeOf() +
        t.topDictIndex.sizeOf() +
        t.stringIndex.sizeOf() +
        t.globalSubrIndex.sizeOf();
    attrs.charset = startOffset;

    // We use the CFF standard encoding; proper encoding will be handled in cmap.
    attrs.encoding = 0;
    attrs.charStrings = attrs.charset + t.charsets.sizeOf();
    attrs.private[1] = attrs.charStrings + t.charStringsIndex.sizeOf();

    // Recreate the Top DICT INDEX with the correct offsets.
    topDict = makeTopDict(attrs, strings);
    t.topDictIndex = makeTopDictIndex(topDict);

    return t;
}

exports.parse = parseCFFTable;
exports.make = makeCFFTable;

},{"../encoding":4,"../glyphset":7,"../parse":9,"../path":10,"../table":11}],13:[function(require,module,exports){
// The `cmap` table stores the mappings from characters to glyphs.
// https://www.microsoft.com/typography/OTSPEC/cmap.htm

'use strict';

var check = require('../check');
var parse = require('../parse');
var table = require('../table');

// Parse the `cmap` table. This table stores the mappings from characters to glyphs.
// There are many available formats, but we only support the Windows format 4.
// This function returns a `CmapEncoding` object or null if no supported format could be found.
function parseCmapTable(data, start) {
    var i;
    var cmap = {};
    cmap.version = parse.getUShort(data, start);
    check.argument(cmap.version === 0, 'cmap table version should be 0.');

    // The cmap table can contain many sub-tables, each with their own format.
    // We're only interested in a "platform 3" table. This is a Windows format.
    cmap.numTables = parse.getUShort(data, start + 2);
    var offset = -1;
    for (i = 0; i < cmap.numTables; i += 1) {
        var platformId = parse.getUShort(data, start + 4 + (i * 8));
        var encodingId = parse.getUShort(data, start + 4 + (i * 8) + 2);
        if (platformId === 3 && (encodingId === 1 || encodingId === 0)) {
            offset = parse.getULong(data, start + 4 + (i * 8) + 4);
            break;
        }
    }

    if (offset === -1) {
        // There is no cmap table in the font that we support, so return null.
        // This font will be marked as unsupported.
        return null;
    }

    var p = new parse.Parser(data, start + offset);
    cmap.format = p.parseUShort();
    check.argument(cmap.format === 4, 'Only format 4 cmap tables are supported.');

    // Length in bytes of the sub-tables.
    cmap.length = p.parseUShort();
    cmap.language = p.parseUShort();

    // segCount is stored x 2.
    var segCount;
    cmap.segCount = segCount = p.parseUShort() >> 1;

    // Skip searchRange, entrySelector, rangeShift.
    p.skip('uShort', 3);

    // The "unrolled" mapping from character codes to glyph indices.
    cmap.glyphIndexMap = {};

    var endCountParser = new parse.Parser(data, start + offset + 14);
    var startCountParser = new parse.Parser(data, start + offset + 16 + segCount * 2);
    var idDeltaParser = new parse.Parser(data, start + offset + 16 + segCount * 4);
    var idRangeOffsetParser = new parse.Parser(data, start + offset + 16 + segCount * 6);
    var glyphIndexOffset = start + offset + 16 + segCount * 8;
    for (i = 0; i < segCount - 1; i += 1) {
        var glyphIndex;
        var endCount = endCountParser.parseUShort();
        var startCount = startCountParser.parseUShort();
        var idDelta = idDeltaParser.parseShort();
        var idRangeOffset = idRangeOffsetParser.parseUShort();
        for (var c = startCount; c <= endCount; c += 1) {
            if (idRangeOffset !== 0) {
                // The idRangeOffset is relative to the current position in the idRangeOffset array.
                // Take the current offset in the idRangeOffset array.
                glyphIndexOffset = (idRangeOffsetParser.offset + idRangeOffsetParser.relativeOffset - 2);

                // Add the value of the idRangeOffset, which will move us into the glyphIndex array.
                glyphIndexOffset += idRangeOffset;

                // Then add the character index of the current segment, multiplied by 2 for USHORTs.
                glyphIndexOffset += (c - startCount) * 2;
                glyphIndex = parse.getUShort(data, glyphIndexOffset);
                if (glyphIndex !== 0) {
                    glyphIndex = (glyphIndex + idDelta) & 0xFFFF;
                }
            } else {
                glyphIndex = (c + idDelta) & 0xFFFF;
            }

            cmap.glyphIndexMap[c] = glyphIndex;
        }
    }

    return cmap;
}

function addSegment(t, code, glyphIndex) {
    t.segments.push({
        end: code,
        start: code,
        delta: -(code - glyphIndex),
        offset: 0
    });
}

function addTerminatorSegment(t) {
    t.segments.push({
        end: 0xFFFF,
        start: 0xFFFF,
        delta: 1,
        offset: 0
    });
}

function makeCmapTable(glyphs) {
    var i;
    var t = new table.Table('cmap', [
        {name: 'version', type: 'USHORT', value: 0},
        {name: 'numTables', type: 'USHORT', value: 1},
        {name: 'platformID', type: 'USHORT', value: 3},
        {name: 'encodingID', type: 'USHORT', value: 1},
        {name: 'offset', type: 'ULONG', value: 12},
        {name: 'format', type: 'USHORT', value: 4},
        {name: 'length', type: 'USHORT', value: 0},
        {name: 'language', type: 'USHORT', value: 0},
        {name: 'segCountX2', type: 'USHORT', value: 0},
        {name: 'searchRange', type: 'USHORT', value: 0},
        {name: 'entrySelector', type: 'USHORT', value: 0},
        {name: 'rangeShift', type: 'USHORT', value: 0}
    ]);

    t.segments = [];
    for (i = 0; i < glyphs.length; i += 1) {
        var glyph = glyphs.get(i);
        for (var j = 0; j < glyph.unicodes.length; j += 1) {
            addSegment(t, glyph.unicodes[j], i);
        }

        t.segments = t.segments.sort(function(a, b) {
            return a.start - b.start;
        });
    }

    addTerminatorSegment(t);

    var segCount;
    segCount = t.segments.length;
    t.segCountX2 = segCount * 2;
    t.searchRange = Math.pow(2, Math.floor(Math.log(segCount) / Math.log(2))) * 2;
    t.entrySelector = Math.log(t.searchRange / 2) / Math.log(2);
    t.rangeShift = t.segCountX2 - t.searchRange;

    // Set up parallel segment arrays.
    var endCounts = [];
    var startCounts = [];
    var idDeltas = [];
    var idRangeOffsets = [];
    var glyphIds = [];

    for (i = 0; i < segCount; i += 1) {
        var segment = t.segments[i];
        endCounts = endCounts.concat({name: 'end_' + i, type: 'USHORT', value: segment.end});
        startCounts = startCounts.concat({name: 'start_' + i, type: 'USHORT', value: segment.start});
        idDeltas = idDeltas.concat({name: 'idDelta_' + i, type: 'SHORT', value: segment.delta});
        idRangeOffsets = idRangeOffsets.concat({name: 'idRangeOffset_' + i, type: 'USHORT', value: segment.offset});
        if (segment.glyphId !== undefined) {
            glyphIds = glyphIds.concat({name: 'glyph_' + i, type: 'USHORT', value: segment.glyphId});
        }
    }

    t.fields = t.fields.concat(endCounts);
    t.fields.push({name: 'reservedPad', type: 'USHORT', value: 0});
    t.fields = t.fields.concat(startCounts);
    t.fields = t.fields.concat(idDeltas);
    t.fields = t.fields.concat(idRangeOffsets);
    t.fields = t.fields.concat(glyphIds);

    t.length = 14 + // Subtable header
        endCounts.length * 2 +
        2 + // reservedPad
        startCounts.length * 2 +
        idDeltas.length * 2 +
        idRangeOffsets.length * 2 +
        glyphIds.length * 2;

    return t;
}

exports.parse = parseCmapTable;
exports.make = makeCmapTable;

},{"../check":2,"../parse":9,"../table":11}],14:[function(require,module,exports){
// The `fvar` table stores font variation axes and instances.
// https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6fvar.html

'use strict';

var check = require('../check');
var parse = require('../parse');
var table = require('../table');

function addName(name, names) {
    var nameString = JSON.stringify(name);
    var nameID = 256;
    for (var nameKey in names) {
        var n = parseInt(nameKey);
        if (!n || n < 256) {
            continue;
        }

        if (JSON.stringify(names[nameKey]) === nameString) {
            return n;
        }

        if (nameID <= n) {
            nameID = n + 1;
        }
    }

    names[nameID] = name;
    return nameID;
}

function makeFvarAxis(axis, names) {
    var nameID = addName(axis.name, names);
    return new table.Table('fvarAxis', [
        {name: 'tag', type: 'TAG', value: axis.tag},
        {name: 'minValue', type: 'FIXED', value: axis.minValue << 16},
        {name: 'defaultValue', type: 'FIXED', value: axis.defaultValue << 16},
        {name: 'maxValue', type: 'FIXED', value: axis.maxValue << 16},
        {name: 'flags', type: 'USHORT', value: 0},
        {name: 'nameID', type: 'USHORT', value: nameID}
    ]);
}

function parseFvarAxis(data, start, names) {
    var axis = {};
    var p = new parse.Parser(data, start);
    axis.tag = p.parseTag();
    axis.minValue = p.parseFixed();
    axis.defaultValue = p.parseFixed();
    axis.maxValue = p.parseFixed();
    p.skip('uShort', 1);  // reserved for flags; no values defined
    axis.name = names[p.parseUShort()] || {};
    return axis;
}

function makeFvarInstance(inst, axes, names) {
    var nameID = addName(inst.name, names);
    var fields = [
        {name: 'nameID', type: 'USHORT', value: nameID},
        {name: 'flags', type: 'USHORT', value: 0}
    ];

    for (var i = 0; i < axes.length; ++i) {
        var axisTag = axes[i].tag;
        fields.push({
            name: 'axis ' + axisTag,
            type: 'FIXED',
            value: inst.coordinates[axisTag] << 16
        });
    }

    return new table.Table('fvarInstance', fields);
}

function parseFvarInstance(data, start, axes, names) {
    var inst = {};
    var p = new parse.Parser(data, start);
    inst.name = names[p.parseUShort()] || {};
    p.skip('uShort', 1);  // reserved for flags; no values defined

    inst.coordinates = {};
    for (var i = 0; i < axes.length; ++i) {
        inst.coordinates[axes[i].tag] = p.parseFixed();
    }

    return inst;
}

function makeFvarTable(fvar, names) {
    var result = new table.Table('fvar', [
        {name: 'version', type: 'ULONG', value: 0x10000},
        {name: 'offsetToData', type: 'USHORT', value: 0},
        {name: 'countSizePairs', type: 'USHORT', value: 2},
        {name: 'axisCount', type: 'USHORT', value: fvar.axes.length},
        {name: 'axisSize', type: 'USHORT', value: 20},
        {name: 'instanceCount', type: 'USHORT', value: fvar.instances.length},
        {name: 'instanceSize', type: 'USHORT', value: 4 + fvar.axes.length * 4}
    ]);
    result.offsetToData = result.sizeOf();

    for (var i = 0; i < fvar.axes.length; i++) {
        result.fields.push({
            name: 'axis ' + i,
            type: 'TABLE',
            value: makeFvarAxis(fvar.axes[i], names)});
    }

    for (var j = 0; j < fvar.instances.length; j++) {
        result.fields.push({
            name: 'instance ' + j,
            type: 'TABLE',
            value: makeFvarInstance(fvar.instances[j], fvar.axes, names)
        });
    }

    return result;
}

function parseFvarTable(data, start, names) {
    var p = new parse.Parser(data, start);
    var tableVersion = p.parseULong();
    check.argument(tableVersion === 0x00010000, 'Unsupported fvar table version.');
    var offsetToData = p.parseOffset16();
    // Skip countSizePairs.
    p.skip('uShort', 1);
    var axisCount = p.parseUShort();
    var axisSize = p.parseUShort();
    var instanceCount = p.parseUShort();
    var instanceSize = p.parseUShort();

    var axes = [];
    for (var i = 0; i < axisCount; i++) {
        axes.push(parseFvarAxis(data, start + offsetToData + i * axisSize, names));
    }

    var instances = [];
    var instanceStart = start + offsetToData + axisCount * axisSize;
    for (var j = 0; j < instanceCount; j++) {
        instances.push(parseFvarInstance(data, instanceStart + j * instanceSize, axes, names));
    }

    return {axes:axes, instances:instances};
}

exports.make = makeFvarTable;
exports.parse = parseFvarTable;

},{"../check":2,"../parse":9,"../table":11}],15:[function(require,module,exports){
// The `glyf` table describes the glyphs in TrueType outline format.
// http://www.microsoft.com/typography/otspec/glyf.htm

'use strict';

var check = require('../check');
var glyphset = require('../glyphset');
var parse = require('../parse');
var path = require('../path');

// Parse the coordinate data for a glyph.
function parseGlyphCoordinate(p, flag, previousValue, shortVectorBitMask, sameBitMask) {
    var v;
    if ((flag & shortVectorBitMask) > 0) {
        // The coordinate is 1 byte long.
        v = p.parseByte();
        // The `same` bit is re-used for short values to signify the sign of the value.
        if ((flag & sameBitMask) === 0) {
            v = -v;
        }

        v = previousValue + v;
    } else {
        //  The coordinate is 2 bytes long.
        // If the `same` bit is set, the coordinate is the same as the previous coordinate.
        if ((flag & sameBitMask) > 0) {
            v = previousValue;
        } else {
            // Parse the coordinate as a signed 16-bit delta value.
            v = previousValue + p.parseShort();
        }
    }

    return v;
}

// Parse a TrueType glyph.
function parseGlyph(glyph, data, start) {
    var p = new parse.Parser(data, start);
    glyph.numberOfContours = p.parseShort();
    glyph.xMin = p.parseShort();
    glyph.yMin = p.parseShort();
    glyph.xMax = p.parseShort();
    glyph.yMax = p.parseShort();
    var flags;
    var flag;
    if (glyph.numberOfContours > 0) {
        var i;
        // This glyph is not a composite.
        var endPointIndices = glyph.endPointIndices = [];
        for (i = 0; i < glyph.numberOfContours; i += 1) {
            endPointIndices.push(p.parseUShort());
        }

        glyph.instructionLength = p.parseUShort();
        glyph.instructions = [];
        for (i = 0; i < glyph.instructionLength; i += 1) {
            glyph.instructions.push(p.parseByte());
        }

        var numberOfCoordinates = endPointIndices[endPointIndices.length - 1] + 1;
        flags = [];
        for (i = 0; i < numberOfCoordinates; i += 1) {
            flag = p.parseByte();
            flags.push(flag);
            // If bit 3 is set, we repeat this flag n times, where n is the next byte.
            if ((flag & 8) > 0) {
                var repeatCount = p.parseByte();
                for (var j = 0; j < repeatCount; j += 1) {
                    flags.push(flag);
                    i += 1;
                }
            }
        }

        check.argument(flags.length === numberOfCoordinates, 'Bad flags.');

        if (endPointIndices.length > 0) {
            var points = [];
            var point;
            // X/Y coordinates are relative to the previous point, except for the first point which is relative to 0,0.
            if (numberOfCoordinates > 0) {
                for (i = 0; i < numberOfCoordinates; i += 1) {
                    flag = flags[i];
                    point = {};
                    point.onCurve = !!(flag & 1);
                    point.lastPointOfContour = endPointIndices.indexOf(i) >= 0;
                    points.push(point);
                }

                var px = 0;
                for (i = 0; i < numberOfCoordinates; i += 1) {
                    flag = flags[i];
                    point = points[i];
                    point.x = parseGlyphCoordinate(p, flag, px, 2, 16);
                    px = point.x;
                }

                var py = 0;
                for (i = 0; i < numberOfCoordinates; i += 1) {
                    flag = flags[i];
                    point = points[i];
                    point.y = parseGlyphCoordinate(p, flag, py, 4, 32);
                    py = point.y;
                }
            }

            glyph.points = points;
        } else {
            glyph.points = [];
        }
    } else if (glyph.numberOfContours === 0) {
        glyph.points = [];
    } else {
        glyph.isComposite = true;
        glyph.points = [];
        glyph.components = [];
        var moreComponents = true;
        while (moreComponents) {
            flags = p.parseUShort();
            var component = {
                glyphIndex: p.parseUShort(),
                xScale: 1,
                scale01: 0,
                scale10: 0,
                yScale: 1,
                dx: 0,
                dy: 0
            };
            if ((flags & 1) > 0) {
                // The arguments are words
                component.dx = p.parseShort();
                component.dy = p.parseShort();
            } else {
                // The arguments are bytes
                component.dx = p.parseChar();
                component.dy = p.parseChar();
            }

            if ((flags & 8) > 0) {
                // We have a scale
                component.xScale = component.yScale = p.parseF2Dot14();
            } else if ((flags & 64) > 0) {
                // We have an X / Y scale
                component.xScale = p.parseF2Dot14();
                component.yScale = p.parseF2Dot14();
            } else if ((flags & 128) > 0) {
                // We have a 2x2 transformation
                component.xScale = p.parseF2Dot14();
                component.scale01 = p.parseF2Dot14();
                component.scale10 = p.parseF2Dot14();
                component.yScale = p.parseF2Dot14();
            }

            glyph.components.push(component);
            moreComponents = !!(flags & 32);
        }
    }
}

// Transform an array of points and return a new array.
function transformPoints(points, transform) {
    var newPoints = [];
    for (var i = 0; i < points.length; i += 1) {
        var pt = points[i];
        var newPt = {
            x: transform.xScale * pt.x + transform.scale01 * pt.y + transform.dx,
            y: transform.scale10 * pt.x + transform.yScale * pt.y + transform.dy,
            onCurve: pt.onCurve,
            lastPointOfContour: pt.lastPointOfContour
        };
        newPoints.push(newPt);
    }

    return newPoints;
}

function getContours(points) {
    var contours = [];
    var currentContour = [];
    for (var i = 0; i < points.length; i += 1) {
        var pt = points[i];
        currentContour.push(pt);
        if (pt.lastPointOfContour) {
            contours.push(currentContour);
            currentContour = [];
        }
    }

    check.argument(currentContour.length === 0, 'There are still points left in the current contour.');
    return contours;
}

// Convert the TrueType glyph outline to a Path.
function getPath(points) {
    var p = new path.Path();
    if (!points) {
        return p;
    }

    var contours = getContours(points);
    for (var i = 0; i < contours.length; i += 1) {
        var contour = contours[i];
        var firstPt = contour[0];
        var lastPt = contour[contour.length - 1];
        var curvePt;
        var realFirstPoint;
        if (firstPt.onCurve) {
            curvePt = null;
            // The first point will be consumed by the moveTo command,
            // so skip it in the loop.
            realFirstPoint = true;
        } else {
            if (lastPt.onCurve) {
                // If the first point is off-curve and the last point is on-curve,
                // start at the last point.
                firstPt = lastPt;
            } else {
                // If both first and last points are off-curve, start at their middle.
                firstPt = { x: (firstPt.x + lastPt.x) / 2, y: (firstPt.y + lastPt.y) / 2 };
            }

            curvePt = firstPt;
            // The first point is synthesized, so don't skip the real first point.
            realFirstPoint = false;
        }

        p.moveTo(firstPt.x, firstPt.y);

        for (var j = realFirstPoint ? 1 : 0; j < contour.length; j += 1) {
            var pt = contour[j];
            var prevPt = j === 0 ? firstPt : contour[j - 1];
            if (prevPt.onCurve && pt.onCurve) {
                // This is a straight line.
                p.lineTo(pt.x, pt.y);
            } else if (prevPt.onCurve && !pt.onCurve) {
                curvePt = pt;
            } else if (!prevPt.onCurve && !pt.onCurve) {
                var midPt = { x: (prevPt.x + pt.x) / 2, y: (prevPt.y + pt.y) / 2 };
                p.quadraticCurveTo(prevPt.x, prevPt.y, midPt.x, midPt.y);
                curvePt = pt;
            } else if (!prevPt.onCurve && pt.onCurve) {
                // Previous point off-curve, this point on-curve.
                p.quadraticCurveTo(curvePt.x, curvePt.y, pt.x, pt.y);
                curvePt = null;
            } else {
                throw new Error('Invalid state.');
            }
        }

        if (firstPt !== lastPt) {
            // Connect the last and first points
            if (curvePt) {
                p.quadraticCurveTo(curvePt.x, curvePt.y, firstPt.x, firstPt.y);
            } else {
                p.lineTo(firstPt.x, firstPt.y);
            }
        }
    }

    p.closePath();
    return p;
}

function buildPath(glyphs, glyph) {
    if (glyph.isComposite) {
        for (var j = 0; j < glyph.components.length; j += 1) {
            var component = glyph.components[j];
            var componentGlyph = glyphs.get(component.glyphIndex);
            // Force the ttfGlyphLoader to parse the glyph.
            componentGlyph.getPath();
            if (componentGlyph.points) {
                var transformedPoints = transformPoints(componentGlyph.points, component);
                glyph.points = glyph.points.concat(transformedPoints);
            }
        }
    }

    return getPath(glyph.points);
}

// Parse all the glyphs according to the offsets from the `loca` table.
function parseGlyfTable(data, start, loca, font) {
    var glyphs = new glyphset.GlyphSet(font);
    var i;

    // The last element of the loca table is invalid.
    for (i = 0; i < loca.length - 1; i += 1) {
        var offset = loca[i];
        var nextOffset = loca[i + 1];
        if (offset !== nextOffset) {
            glyphs.push(i, glyphset.ttfGlyphLoader(font, i, parseGlyph, data, start + offset, buildPath));
        } else {
            glyphs.push(i, glyphset.glyphLoader(font, i));
        }
    }

    return glyphs;
}

exports.parse = parseGlyfTable;

},{"../check":2,"../glyphset":7,"../parse":9,"../path":10}],16:[function(require,module,exports){
// The `GPOS` table contains kerning pairs, among other things.
// https://www.microsoft.com/typography/OTSPEC/gpos.htm

'use strict';

var check = require('../check');
var parse = require('../parse');

// Parse ScriptList and FeatureList tables of GPOS, GSUB, GDEF, BASE, JSTF tables.
// These lists are unused by now, this function is just the basis for a real parsing.
function parseTaggedListTable(data, start) {
    var p = new parse.Parser(data, start);
    var n = p.parseUShort();
    var list = [];
    for (var i = 0; i < n; i++) {
        list[p.parseTag()] = { offset: p.parseUShort() };
    }

    return list;
}

// Parse a coverage table in a GSUB, GPOS or GDEF table.
// Format 1 is a simple list of glyph ids,
// Format 2 is a list of ranges. It is expanded in a list of glyphs, maybe not the best idea.
function parseCoverageTable(data, start) {
    var p = new parse.Parser(data, start);
    var format = p.parseUShort();
    var count =  p.parseUShort();
    if (format === 1) {
        return p.parseUShortList(count);
    }
    else if (format === 2) {
        var coverage = [];
        for (; count--;) {
            var begin = p.parseUShort();
            var end = p.parseUShort();
            var index = p.parseUShort();
            for (var i = begin; i <= end; i++) {
                coverage[index++] = i;
            }
        }

        return coverage;
    }
}

// Parse a Class Definition Table in a GSUB, GPOS or GDEF table.
// Returns a function that gets a class value from a glyph ID.
function parseClassDefTable(data, start) {
    var p = new parse.Parser(data, start);
    var format = p.parseUShort();
    if (format === 1) {
        // Format 1 specifies a range of consecutive glyph indices, one class per glyph ID.
        var startGlyph = p.parseUShort();
        var glyphCount = p.parseUShort();
        var classes = p.parseUShortList(glyphCount);
        return function(glyphID) {
            return classes[glyphID - startGlyph] || 0;
        };
    }
    else if (format === 2) {
        // Format 2 defines multiple groups of glyph indices that belong to the same class.
        var rangeCount = p.parseUShort();
        var startGlyphs = [];
        var endGlyphs = [];
        var classValues = [];
        for (var i = 0; i < rangeCount; i++) {
            startGlyphs[i] = p.parseUShort();
            endGlyphs[i] = p.parseUShort();
            classValues[i] = p.parseUShort();
        }

        return function(glyphID) {
            var l = 0;
            var r = startGlyphs.length - 1;
            while (l < r) {
                var c = (l + r + 1) >> 1;
                if (glyphID < startGlyphs[c]) {
                    r = c - 1;
                } else {
                    l = c;
                }
            }

            if (startGlyphs[l] <= glyphID && glyphID <= endGlyphs[l]) {
                return classValues[l] || 0;
            }

            return 0;
        };
    }
}

// Parse a pair adjustment positioning subtable, format 1 or format 2
// The subtable is returned in the form of a lookup function.
function parsePairPosSubTable(data, start) {
    var p = new parse.Parser(data, start);
    // This part is common to format 1 and format 2 subtables
    var format = p.parseUShort();
    var coverageOffset = p.parseUShort();
    var coverage = parseCoverageTable(data, start + coverageOffset);
    // valueFormat 4: XAdvance only, 1: XPlacement only, 0: no ValueRecord for second glyph
    // Only valueFormat1=4 and valueFormat2=0 is supported.
    var valueFormat1 = p.parseUShort();
    var valueFormat2 = p.parseUShort();
    var value1;
    var value2;
    if (valueFormat1 !== 4 || valueFormat2 !== 0) return;
    var sharedPairSets = {};
    if (format === 1) {
        // Pair Positioning Adjustment: Format 1
        var pairSetCount = p.parseUShort();
        var pairSet = [];
        // Array of offsets to PairSet tables-from beginning of PairPos subtable-ordered by Coverage Index
        var pairSetOffsets = p.parseOffset16List(pairSetCount);
        for (var firstGlyph = 0; firstGlyph < pairSetCount; firstGlyph++) {
            var pairSetOffset = pairSetOffsets[firstGlyph];
            var sharedPairSet = sharedPairSets[pairSetOffset];
            if (!sharedPairSet) {
                // Parse a pairset table in a pair adjustment subtable format 1
                sharedPairSet = {};
                p.relativeOffset = pairSetOffset;
                var pairValueCount = p.parseUShort();
                for (; pairValueCount--;) {
                    var secondGlyph = p.parseUShort();
                    if (valueFormat1) value1 = p.parseShort();
                    if (valueFormat2) value2 = p.parseShort();
                    // We only support valueFormat1 = 4 and valueFormat2 = 0,
                    // so value1 is the XAdvance and value2 is empty.
                    sharedPairSet[secondGlyph] = value1;
                }
            }

            pairSet[coverage[firstGlyph]] = sharedPairSet;
        }

        return function(leftGlyph, rightGlyph) {
            var pairs = pairSet[leftGlyph];
            if (pairs) return pairs[rightGlyph];
        };
    }
    else if (format === 2) {
        // Pair Positioning Adjustment: Format 2
        var classDef1Offset = p.parseUShort();
        var classDef2Offset = p.parseUShort();
        var class1Count = p.parseUShort();
        var class2Count = p.parseUShort();
        var getClass1 = parseClassDefTable(data, start + classDef1Offset);
        var getClass2 = parseClassDefTable(data, start + classDef2Offset);

        // Parse kerning values by class pair.
        var kerningMatrix = [];
        for (var i = 0; i < class1Count; i++) {
            var kerningRow = kerningMatrix[i] = [];
            for (var j = 0; j < class2Count; j++) {
                if (valueFormat1) value1 = p.parseShort();
                if (valueFormat2) value2 = p.parseShort();
                // We only support valueFormat1 = 4 and valueFormat2 = 0,
                // so value1 is the XAdvance and value2 is empty.
                kerningRow[j] = value1;
            }
        }

        // Convert coverage list to a hash
        var covered = {};
        for (i = 0; i < coverage.length; i++) covered[coverage[i]] = 1;

        // Get the kerning value for a specific glyph pair.
        return function(leftGlyph, rightGlyph) {
            if (!covered[leftGlyph]) return;
            var class1 = getClass1(leftGlyph);
            var class2 = getClass2(rightGlyph);
            var kerningRow = kerningMatrix[class1];

            if (kerningRow) {
                return kerningRow[class2];
            }
        };
    }
}

// Parse a LookupTable (present in of GPOS, GSUB, GDEF, BASE, JSTF tables).
function parseLookupTable(data, start) {
    var p = new parse.Parser(data, start);
    var lookupType = p.parseUShort();
    var lookupFlag = p.parseUShort();
    var useMarkFilteringSet = lookupFlag & 0x10;
    var subTableCount = p.parseUShort();
    var subTableOffsets = p.parseOffset16List(subTableCount);
    var table = {
        lookupType: lookupType,
        lookupFlag: lookupFlag,
        markFilteringSet: useMarkFilteringSet ? p.parseUShort() : -1
    };
    // LookupType 2, Pair adjustment
    if (lookupType === 2) {
        var subtables = [];
        for (var i = 0; i < subTableCount; i++) {
            subtables.push(parsePairPosSubTable(data, start + subTableOffsets[i]));
        }
        // Return a function which finds the kerning values in the subtables.
        table.getKerningValue = function(leftGlyph, rightGlyph) {
            for (var i = subtables.length; i--;) {
                var value = subtables[i](leftGlyph, rightGlyph);
                if (value !== undefined) return value;
            }

            return 0;
        };
    }

    return table;
}

// Parse the `GPOS` table which contains, among other things, kerning pairs.
// https://www.microsoft.com/typography/OTSPEC/gpos.htm
function parseGposTable(data, start, font) {
    var p = new parse.Parser(data, start);
    var tableVersion = p.parseFixed();
    check.argument(tableVersion === 1, 'Unsupported GPOS table version.');

    // ScriptList and FeatureList - ignored for now
    parseTaggedListTable(data, start + p.parseUShort());
    // 'kern' is the feature we are looking for.
    parseTaggedListTable(data, start + p.parseUShort());

    // LookupList
    var lookupListOffset = p.parseUShort();
    p.relativeOffset = lookupListOffset;
    var lookupCount = p.parseUShort();
    var lookupTableOffsets = p.parseOffset16List(lookupCount);
    var lookupListAbsoluteOffset = start + lookupListOffset;
    for (var i = 0; i < lookupCount; i++) {
        var table = parseLookupTable(data, lookupListAbsoluteOffset + lookupTableOffsets[i]);
        if (table.lookupType === 2 && !font.getGposKerningValue) font.getGposKerningValue = table.getKerningValue;
    }
}

exports.parse = parseGposTable;

},{"../check":2,"../parse":9}],17:[function(require,module,exports){
// The `head` table contains global information about the font.
// https://www.microsoft.com/typography/OTSPEC/head.htm

'use strict';

var check = require('../check');
var parse = require('../parse');
var table = require('../table');

// Parse the header `head` table
function parseHeadTable(data, start) {
    var head = {};
    var p = new parse.Parser(data, start);
    head.version = p.parseVersion();
    head.fontRevision = Math.round(p.parseFixed() * 1000) / 1000;
    head.checkSumAdjustment = p.parseULong();
    head.magicNumber = p.parseULong();
    check.argument(head.magicNumber === 0x5F0F3CF5, 'Font header has wrong magic number.');
    head.flags = p.parseUShort();
    head.unitsPerEm = p.parseUShort();
    head.created = p.parseLongDateTime();
    head.modified = p.parseLongDateTime();
    head.xMin = p.parseShort();
    head.yMin = p.parseShort();
    head.xMax = p.parseShort();
    head.yMax = p.parseShort();
    head.macStyle = p.parseUShort();
    head.lowestRecPPEM = p.parseUShort();
    head.fontDirectionHint = p.parseShort();
    head.indexToLocFormat = p.parseShort();
    head.glyphDataFormat = p.parseShort();
    return head;
}

function makeHeadTable(options) {
    return new table.Table('head', [
        {name: 'version', type: 'FIXED', value: 0x00010000},
        {name: 'fontRevision', type: 'FIXED', value: 0x00010000},
        {name: 'checkSumAdjustment', type: 'ULONG', value: 0},
        {name: 'magicNumber', type: 'ULONG', value: 0x5F0F3CF5},
        {name: 'flags', type: 'USHORT', value: 0},
        {name: 'unitsPerEm', type: 'USHORT', value: 1000},
        {name: 'created', type: 'LONGDATETIME', value: 0},
        {name: 'modified', type: 'LONGDATETIME', value: 0},
        {name: 'xMin', type: 'SHORT', value: 0},
        {name: 'yMin', type: 'SHORT', value: 0},
        {name: 'xMax', type: 'SHORT', value: 0},
        {name: 'yMax', type: 'SHORT', value: 0},
        {name: 'macStyle', type: 'USHORT', value: 0},
        {name: 'lowestRecPPEM', type: 'USHORT', value: 0},
        {name: 'fontDirectionHint', type: 'SHORT', value: 2},
        {name: 'indexToLocFormat', type: 'SHORT', value: 0},
        {name: 'glyphDataFormat', type: 'SHORT', value: 0}
    ], options);
}

exports.parse = parseHeadTable;
exports.make = makeHeadTable;

},{"../check":2,"../parse":9,"../table":11}],18:[function(require,module,exports){
// The `hhea` table contains information for horizontal layout.
// https://www.microsoft.com/typography/OTSPEC/hhea.htm

'use strict';

var parse = require('../parse');
var table = require('../table');

// Parse the horizontal header `hhea` table
function parseHheaTable(data, start) {
    var hhea = {};
    var p = new parse.Parser(data, start);
    hhea.version = p.parseVersion();
    hhea.ascender = p.parseShort();
    hhea.descender = p.parseShort();
    hhea.lineGap = p.parseShort();
    hhea.advanceWidthMax = p.parseUShort();
    hhea.minLeftSideBearing = p.parseShort();
    hhea.minRightSideBearing = p.parseShort();
    hhea.xMaxExtent = p.parseShort();
    hhea.caretSlopeRise = p.parseShort();
    hhea.caretSlopeRun = p.parseShort();
    hhea.caretOffset = p.parseShort();
    p.relativeOffset += 8;
    hhea.metricDataFormat = p.parseShort();
    hhea.numberOfHMetrics = p.parseUShort();
    return hhea;
}

function makeHheaTable(options) {
    return new table.Table('hhea', [
        {name: 'version', type: 'FIXED', value: 0x00010000},
        {name: 'ascender', type: 'FWORD', value: 0},
        {name: 'descender', type: 'FWORD', value: 0},
        {name: 'lineGap', type: 'FWORD', value: 0},
        {name: 'advanceWidthMax', type: 'UFWORD', value: 0},
        {name: 'minLeftSideBearing', type: 'FWORD', value: 0},
        {name: 'minRightSideBearing', type: 'FWORD', value: 0},
        {name: 'xMaxExtent', type: 'FWORD', value: 0},
        {name: 'caretSlopeRise', type: 'SHORT', value: 1},
        {name: 'caretSlopeRun', type: 'SHORT', value: 0},
        {name: 'caretOffset', type: 'SHORT', value: 0},
        {name: 'reserved1', type: 'SHORT', value: 0},
        {name: 'reserved2', type: 'SHORT', value: 0},
        {name: 'reserved3', type: 'SHORT', value: 0},
        {name: 'reserved4', type: 'SHORT', value: 0},
        {name: 'metricDataFormat', type: 'SHORT', value: 0},
        {name: 'numberOfHMetrics', type: 'USHORT', value: 0}
    ], options);
}

exports.parse = parseHheaTable;
exports.make = makeHheaTable;

},{"../parse":9,"../table":11}],19:[function(require,module,exports){
// The `hmtx` table contains the horizontal metrics for all glyphs.
// https://www.microsoft.com/typography/OTSPEC/hmtx.htm

'use strict';

var parse = require('../parse');
var table = require('../table');

// Parse the `hmtx` table, which contains the horizontal metrics for all glyphs.
// This function augments the glyph array, adding the advanceWidth and leftSideBearing to each glyph.
function parseHmtxTable(data, start, numMetrics, numGlyphs, glyphs) {
    var advanceWidth;
    var leftSideBearing;
    var p = new parse.Parser(data, start);
    for (var i = 0; i < numGlyphs; i += 1) {
        // If the font is monospaced, only one entry is needed. This last entry applies to all subsequent glyphs.
        if (i < numMetrics) {
            advanceWidth = p.parseUShort();
            leftSideBearing = p.parseShort();
        }

        var glyph = glyphs.get(i);
        glyph.advanceWidth = advanceWidth;
        glyph.leftSideBearing = leftSideBearing;
    }
}

function makeHmtxTable(glyphs) {
    var t = new table.Table('hmtx', []);
    for (var i = 0; i < glyphs.length; i += 1) {
        var glyph = glyphs.get(i);
        var advanceWidth = glyph.advanceWidth || 0;
        var leftSideBearing = glyph.leftSideBearing || 0;
        t.fields.push({name: 'advanceWidth_' + i, type: 'USHORT', value: advanceWidth});
        t.fields.push({name: 'leftSideBearing_' + i, type: 'SHORT', value: leftSideBearing});
    }

    return t;
}

exports.parse = parseHmtxTable;
exports.make = makeHmtxTable;

},{"../parse":9,"../table":11}],20:[function(require,module,exports){
// The `kern` table contains kerning pairs.
// Note that some fonts use the GPOS OpenType layout table to specify kerning.
// https://www.microsoft.com/typography/OTSPEC/kern.htm

'use strict';

var check = require('../check');
var parse = require('../parse');

// Parse the `kern` table which contains kerning pairs.
function parseKernTable(data, start) {
    var pairs = {};
    var p = new parse.Parser(data, start);
    var tableVersion = p.parseUShort();
    check.argument(tableVersion === 0, 'Unsupported kern table version.');
    // Skip nTables.
    p.skip('uShort', 1);
    var subTableVersion = p.parseUShort();
    check.argument(subTableVersion === 0, 'Unsupported kern sub-table version.');
    // Skip subTableLength, subTableCoverage
    p.skip('uShort', 2);
    var nPairs = p.parseUShort();
    // Skip searchRange, entrySelector, rangeShift.
    p.skip('uShort', 3);
    for (var i = 0; i < nPairs; i += 1) {
        var leftIndex = p.parseUShort();
        var rightIndex = p.parseUShort();
        var value = p.parseShort();
        pairs[leftIndex + ',' + rightIndex] = value;
    }

    return pairs;
}

exports.parse = parseKernTable;

},{"../check":2,"../parse":9}],21:[function(require,module,exports){
// The `loca` table stores the offsets to the locations of the glyphs in the font.
// https://www.microsoft.com/typography/OTSPEC/loca.htm

'use strict';

var parse = require('../parse');

// Parse the `loca` table. This table stores the offsets to the locations of the glyphs in the font,
// relative to the beginning of the glyphData table.
// The number of glyphs stored in the `loca` table is specified in the `maxp` table (under numGlyphs)
// The loca table has two versions: a short version where offsets are stored as uShorts, and a long
// version where offsets are stored as uLongs. The `head` table specifies which version to use
// (under indexToLocFormat).
function parseLocaTable(data, start, numGlyphs, shortVersion) {
    var p = new parse.Parser(data, start);
    var parseFn = shortVersion ? p.parseUShort : p.parseULong;
    // There is an extra entry after the last index element to compute the length of the last glyph.
    // That's why we use numGlyphs + 1.
    var glyphOffsets = [];
    for (var i = 0; i < numGlyphs + 1; i += 1) {
        var glyphOffset = parseFn.call(p);
        if (shortVersion) {
            // The short table version stores the actual offset divided by 2.
            glyphOffset *= 2;
        }

        glyphOffsets.push(glyphOffset);
    }

    return glyphOffsets;
}

exports.parse = parseLocaTable;

},{"../parse":9}],22:[function(require,module,exports){
// The `ltag` table stores IETF BCP-47 language tags. It allows supporting
// languages for which TrueType does not assign a numeric code.
// https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6ltag.html
// http://www.w3.org/International/articles/language-tags/
// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry

'use strict';

var check = require('../check');
var parse = require('../parse');
var table = require('../table');

function makeLtagTable(tags) {
    var result = new table.Table('ltag', [
        {name: 'version', type: 'ULONG', value: 1},
        {name: 'flags', type: 'ULONG', value: 0},
        {name: 'numTags', type: 'ULONG', value: tags.length}
    ]);

    var stringPool = '';
    var stringPoolOffset = 12 + tags.length * 4;
    for (var i = 0; i < tags.length; ++i) {
        var pos = stringPool.indexOf(tags[i]);
        if (pos < 0) {
            pos = stringPool.length;
            stringPool += tags[i];
        }

        result.fields.push({name: 'offset ' + i, type: 'USHORT', value: stringPoolOffset + pos});
        result.fields.push({name: 'length ' + i, type: 'USHORT', value: tags[i].length});
    }

    result.fields.push({name: 'stringPool', type: 'CHARARRAY', value: stringPool});
    return result;
}

function parseLtagTable(data, start) {
    var p = new parse.Parser(data, start);
    var tableVersion = p.parseULong();
    check.argument(tableVersion === 1, 'Unsupported ltag table version.');
    // The 'ltag' specification does not define any flags; skip the field.
    p.skip('uLong', 1);
    var numTags = p.parseULong();

    var tags = [];
    for (var i = 0; i < numTags; i++) {
        var tag = '';
        var offset = start + p.parseUShort();
        var length = p.parseUShort();
        for (var j = offset; j < offset + length; ++j) {
            tag += String.fromCharCode(data.getInt8(j));
        }

        tags.push(tag);
    }

    return tags;
}

exports.make = makeLtagTable;
exports.parse = parseLtagTable;

},{"../check":2,"../parse":9,"../table":11}],23:[function(require,module,exports){
// The `maxp` table establishes the memory requirements for the font.
// We need it just to get the number of glyphs in the font.
// https://www.microsoft.com/typography/OTSPEC/maxp.htm

'use strict';

var parse = require('../parse');
var table = require('../table');

// Parse the maximum profile `maxp` table.
function parseMaxpTable(data, start) {
    var maxp = {};
    var p = new parse.Parser(data, start);
    maxp.version = p.parseVersion();
    maxp.numGlyphs = p.parseUShort();
    if (maxp.version === 1.0) {
        maxp.maxPoints = p.parseUShort();
        maxp.maxContours = p.parseUShort();
        maxp.maxCompositePoints = p.parseUShort();
        maxp.maxCompositeContours = p.parseUShort();
        maxp.maxZones = p.parseUShort();
        maxp.maxTwilightPoints = p.parseUShort();
        maxp.maxStorage = p.parseUShort();
        maxp.maxFunctionDefs = p.parseUShort();
        maxp.maxInstructionDefs = p.parseUShort();
        maxp.maxStackElements = p.parseUShort();
        maxp.maxSizeOfInstructions = p.parseUShort();
        maxp.maxComponentElements = p.parseUShort();
        maxp.maxComponentDepth = p.parseUShort();
    }

    return maxp;
}

function makeMaxpTable(numGlyphs) {
    return new table.Table('maxp', [
        {name: 'version', type: 'FIXED', value: 0x00005000},
        {name: 'numGlyphs', type: 'USHORT', value: numGlyphs}
    ]);
}

exports.parse = parseMaxpTable;
exports.make = makeMaxpTable;

},{"../parse":9,"../table":11}],24:[function(require,module,exports){
// The `name` naming table.
// https://www.microsoft.com/typography/OTSPEC/name.htm

'use strict';

var types = require('../types');
var decode = types.decode;
var encode = types.encode;
var parse = require('../parse');
var table = require('../table');

// NameIDs for the name table.
var nameTableNames = [
    'copyright',              // 0
    'fontFamily',             // 1
    'fontSubfamily',          // 2
    'uniqueID',               // 3
    'fullName',               // 4
    'version',                // 5
    'postScriptName',         // 6
    'trademark',              // 7
    'manufacturer',           // 8
    'designer',               // 9
    'description',            // 10
    'manufacturerURL',        // 11
    'designerURL',            // 12
    'license',                // 13
    'licenseURL',             // 14
    'reserved',               // 15
    'preferredFamily',        // 16
    'preferredSubfamily',     // 17
    'compatibleFullName',     // 18
    'sampleText',             // 19
    'postScriptFindFontName', // 20
    'wwsFamily',              // 21
    'wwsSubfamily'            // 22
];

var macLanguages = {
    0: 'en',
    1: 'fr',
    2: 'de',
    3: 'it',
    4: 'nl',
    5: 'sv',
    6: 'es',
    7: 'da',
    8: 'pt',
    9: 'no',
    10: 'he',
    11: 'ja',
    12: 'ar',
    13: 'fi',
    14: 'el',
    15: 'is',
    16: 'mt',
    17: 'tr',
    18: 'hr',
    19: 'zh-Hant',
    20: 'ur',
    21: 'hi',
    22: 'th',
    23: 'ko',
    24: 'lt',
    25: 'pl',
    26: 'hu',
    27: 'es',
    28: 'lv',
    29: 'se',
    30: 'fo',
    31: 'fa',
    32: 'ru',
    33: 'zh',
    34: 'nl-BE',
    35: 'ga',
    36: 'sq',
    37: 'ro',
    38: 'cz',
    39: 'sk',
    40: 'si',
    41: 'yi',
    42: 'sr',
    43: 'mk',
    44: 'bg',
    45: 'uk',
    46: 'be',
    47: 'uz',
    48: 'kk',
    49: 'az-Cyrl',
    50: 'az-Arab',
    51: 'hy',
    52: 'ka',
    53: 'mo',
    54: 'ky',
    55: 'tg',
    56: 'tk',
    57: 'mn-CN',
    58: 'mn',
    59: 'ps',
    60: 'ks',
    61: 'ku',
    62: 'sd',
    63: 'bo',
    64: 'ne',
    65: 'sa',
    66: 'mr',
    67: 'bn',
    68: 'as',
    69: 'gu',
    70: 'pa',
    71: 'or',
    72: 'ml',
    73: 'kn',
    74: 'ta',
    75: 'te',
    76: 'si',
    77: 'my',
    78: 'km',
    79: 'lo',
    80: 'vi',
    81: 'id',
    82: 'tl',
    83: 'ms',
    84: 'ms-Arab',
    85: 'am',
    86: 'ti',
    87: 'om',
    88: 'so',
    89: 'sw',
    90: 'rw',
    91: 'rn',
    92: 'ny',
    93: 'mg',
    94: 'eo',
    128: 'cy',
    129: 'eu',
    130: 'ca',
    131: 'la',
    132: 'qu',
    133: 'gn',
    134: 'ay',
    135: 'tt',
    136: 'ug',
    137: 'dz',
    138: 'jv',
    139: 'su',
    140: 'gl',
    141: 'af',
    142: 'br',
    143: 'iu',
    144: 'gd',
    145: 'gv',
    146: 'ga',
    147: 'to',
    148: 'el-polyton',
    149: 'kl',
    150: 'az',
    151: 'nn'
};

// MacOS language ID → MacOS script ID
//
// Note that the script ID is not sufficient to determine what encoding
// to use in TrueType files. For some languages, MacOS used a modification
// of a mainstream script. For example, an Icelandic name would be stored
// with smRoman in the TrueType naming table, but the actual encoding
// is a special Icelandic version of the normal Macintosh Roman encoding.
// As another example, Inuktitut uses an 8-bit encoding for Canadian Aboriginal
// Syllables but MacOS had run out of available script codes, so this was
// done as a (pretty radical) "modification" of Ethiopic.
//
// http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/Readme.txt
var macLanguageToScript = {
    0: 0,  // langEnglish → smRoman
    1: 0,  // langFrench → smRoman
    2: 0,  // langGerman → smRoman
    3: 0,  // langItalian → smRoman
    4: 0,  // langDutch → smRoman
    5: 0,  // langSwedish → smRoman
    6: 0,  // langSpanish → smRoman
    7: 0,  // langDanish → smRoman
    8: 0,  // langPortuguese → smRoman
    9: 0,  // langNorwegian → smRoman
    10: 5,  // langHebrew → smHebrew
    11: 1,  // langJapanese → smJapanese
    12: 4,  // langArabic → smArabic
    13: 0,  // langFinnish → smRoman
    14: 6,  // langGreek → smGreek
    15: 0,  // langIcelandic → smRoman (modified)
    16: 0,  // langMaltese → smRoman
    17: 0,  // langTurkish → smRoman (modified)
    18: 0,  // langCroatian → smRoman (modified)
    19: 2,  // langTradChinese → smTradChinese
    20: 4,  // langUrdu → smArabic
    21: 9,  // langHindi → smDevanagari
    22: 21,  // langThai → smThai
    23: 3,  // langKorean → smKorean
    24: 29,  // langLithuanian → smCentralEuroRoman
    25: 29,  // langPolish → smCentralEuroRoman
    26: 29,  // langHungarian → smCentralEuroRoman
    27: 29,  // langEstonian → smCentralEuroRoman
    28: 29,  // langLatvian → smCentralEuroRoman
    29: 0,  // langSami → smRoman
    30: 0,  // langFaroese → smRoman (modified)
    31: 4,  // langFarsi → smArabic (modified)
    32: 7,  // langRussian → smCyrillic
    33: 25,  // langSimpChinese → smSimpChinese
    34: 0,  // langFlemish → smRoman
    35: 0,  // langIrishGaelic → smRoman (modified)
    36: 0,  // langAlbanian → smRoman
    37: 0,  // langRomanian → smRoman (modified)
    38: 29,  // langCzech → smCentralEuroRoman
    39: 29,  // langSlovak → smCentralEuroRoman
    40: 0,  // langSlovenian → smRoman (modified)
    41: 5,  // langYiddish → smHebrew
    42: 7,  // langSerbian → smCyrillic
    43: 7,  // langMacedonian → smCyrillic
    44: 7,  // langBulgarian → smCyrillic
    45: 7,  // langUkrainian → smCyrillic (modified)
    46: 7,  // langByelorussian → smCyrillic
    47: 7,  // langUzbek → smCyrillic
    48: 7,  // langKazakh → smCyrillic
    49: 7,  // langAzerbaijani → smCyrillic
    50: 4,  // langAzerbaijanAr → smArabic
    51: 24,  // langArmenian → smArmenian
    52: 23,  // langGeorgian → smGeorgian
    53: 7,  // langMoldavian → smCyrillic
    54: 7,  // langKirghiz → smCyrillic
    55: 7,  // langTajiki → smCyrillic
    56: 7,  // langTurkmen → smCyrillic
    57: 27,  // langMongolian → smMongolian
    58: 7,  // langMongolianCyr → smCyrillic
    59: 4,  // langPashto → smArabic
    60: 4,  // langKurdish → smArabic
    61: 4,  // langKashmiri → smArabic
    62: 4,  // langSindhi → smArabic
    63: 26,  // langTibetan → smTibetan
    64: 9,  // langNepali → smDevanagari
    65: 9,  // langSanskrit → smDevanagari
    66: 9,  // langMarathi → smDevanagari
    67: 13,  // langBengali → smBengali
    68: 13,  // langAssamese → smBengali
    69: 11,  // langGujarati → smGujarati
    70: 10,  // langPunjabi → smGurmukhi
    71: 12,  // langOriya → smOriya
    72: 17,  // langMalayalam → smMalayalam
    73: 16,  // langKannada → smKannada
    74: 14,  // langTamil → smTamil
    75: 15,  // langTelugu → smTelugu
    76: 18,  // langSinhalese → smSinhalese
    77: 19,  // langBurmese → smBurmese
    78: 20,  // langKhmer → smKhmer
    79: 22,  // langLao → smLao
    80: 30,  // langVietnamese → smVietnamese
    81: 0,  // langIndonesian → smRoman
    82: 0,  // langTagalog → smRoman
    83: 0,  // langMalayRoman → smRoman
    84: 4,  // langMalayArabic → smArabic
    85: 28,  // langAmharic → smEthiopic
    86: 28,  // langTigrinya → smEthiopic
    87: 28,  // langOromo → smEthiopic
    88: 0,  // langSomali → smRoman
    89: 0,  // langSwahili → smRoman
    90: 0,  // langKinyarwanda → smRoman
    91: 0,  // langRundi → smRoman
    92: 0,  // langNyanja → smRoman
    93: 0,  // langMalagasy → smRoman
    94: 0,  // langEsperanto → smRoman
    128: 0,  // langWelsh → smRoman (modified)
    129: 0,  // langBasque → smRoman
    130: 0,  // langCatalan → smRoman
    131: 0,  // langLatin → smRoman
    132: 0,  // langQuechua → smRoman
    133: 0,  // langGuarani → smRoman
    134: 0,  // langAymara → smRoman
    135: 7,  // langTatar → smCyrillic
    136: 4,  // langUighur → smArabic
    137: 26,  // langDzongkha → smTibetan
    138: 0,  // langJavaneseRom → smRoman
    139: 0,  // langSundaneseRom → smRoman
    140: 0,  // langGalician → smRoman
    141: 0,  // langAfrikaans → smRoman
    142: 0,  // langBreton → smRoman (modified)
    143: 28,  // langInuktitut → smEthiopic (modified)
    144: 0,  // langScottishGaelic → smRoman (modified)
    145: 0,  // langManxGaelic → smRoman (modified)
    146: 0,  // langIrishGaelicScript → smRoman (modified)
    147: 0,  // langTongan → smRoman
    148: 6,  // langGreekAncient → smRoman
    149: 0,  // langGreenlandic → smRoman
    150: 0,  // langAzerbaijanRoman → smRoman
    151: 0   // langNynorsk → smRoman
};

// While Microsoft indicates a region/country for all its language
// IDs, we omit the region code if it's equal to the "most likely
// region subtag" according to Unicode CLDR. For scripts, we omit
// the subtag if it is equal to the Suppress-Script entry in the
// IANA language subtag registry for IETF BCP 47.
//
// For example, Microsoft states that its language code 0x041A is
// Croatian in Croatia. We transform this to the BCP 47 language code 'hr'
// and not 'hr-HR' because Croatia is the default country for Croatian,
// according to Unicode CLDR. As another example, Microsoft states
// that 0x101A is Croatian (Latin) in Bosnia-Herzegovina. We transform
// this to 'hr-BA' and not 'hr-Latn-BA' because Latin is the default script
// for the Croatian language, according to IANA.
//
// http://www.unicode.org/cldr/charts/latest/supplemental/likely_subtags.html
// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
var windowsLanguages = {
    0x0436: 'af',
    0x041C: 'sq',
    0x0484: 'gsw',
    0x045E: 'am',
    0x1401: 'ar-DZ',
    0x3C01: 'ar-BH',
    0x0C01: 'ar',
    0x0801: 'ar-IQ',
    0x2C01: 'ar-JO',
    0x3401: 'ar-KW',
    0x3001: 'ar-LB',
    0x1001: 'ar-LY',
    0x1801: 'ary',
    0x2001: 'ar-OM',
    0x4001: 'ar-QA',
    0x0401: 'ar-SA',
    0x2801: 'ar-SY',
    0x1C01: 'aeb',
    0x3801: 'ar-AE',
    0x2401: 'ar-YE',
    0x042B: 'hy',
    0x044D: 'as',
    0x082C: 'az-Cyrl',
    0x042C: 'az',
    0x046D: 'ba',
    0x042D: 'eu',
    0x0423: 'be',
    0x0845: 'bn',
    0x0445: 'bn-IN',
    0x201A: 'bs-Cyrl',
    0x141A: 'bs',
    0x047E: 'br',
    0x0402: 'bg',
    0x0403: 'ca',
    0x0C04: 'zh-HK',
    0x1404: 'zh-MO',
    0x0804: 'zh',
    0x1004: 'zh-SG',
    0x0404: 'zh-TW',
    0x0483: 'co',
    0x041A: 'hr',
    0x101A: 'hr-BA',
    0x0405: 'cs',
    0x0406: 'da',
    0x048C: 'prs',
    0x0465: 'dv',
    0x0813: 'nl-BE',
    0x0413: 'nl',
    0x0C09: 'en-AU',
    0x2809: 'en-BZ',
    0x1009: 'en-CA',
    0x2409: 'en-029',
    0x4009: 'en-IN',
    0x1809: 'en-IE',
    0x2009: 'en-JM',
    0x4409: 'en-MY',
    0x1409: 'en-NZ',
    0x3409: 'en-PH',
    0x4809: 'en-SG',
    0x1C09: 'en-ZA',
    0x2C09: 'en-TT',
    0x0809: 'en-GB',
    0x0409: 'en',
    0x3009: 'en-ZW',
    0x0425: 'et',
    0x0438: 'fo',
    0x0464: 'fil',
    0x040B: 'fi',
    0x080C: 'fr-BE',
    0x0C0C: 'fr-CA',
    0x040C: 'fr',
    0x140C: 'fr-LU',
    0x180C: 'fr-MC',
    0x100C: 'fr-CH',
    0x0462: 'fy',
    0x0456: 'gl',
    0x0437: 'ka',
    0x0C07: 'de-AT',
    0x0407: 'de',
    0x1407: 'de-LI',
    0x1007: 'de-LU',
    0x0807: 'de-CH',
    0x0408: 'el',
    0x046F: 'kl',
    0x0447: 'gu',
    0x0468: 'ha',
    0x040D: 'he',
    0x0439: 'hi',
    0x040E: 'hu',
    0x040F: 'is',
    0x0470: 'ig',
    0x0421: 'id',
    0x045D: 'iu',
    0x085D: 'iu-Latn',
    0x083C: 'ga',
    0x0434: 'xh',
    0x0435: 'zu',
    0x0410: 'it',
    0x0810: 'it-CH',
    0x0411: 'ja',
    0x044B: 'kn',
    0x043F: 'kk',
    0x0453: 'km',
    0x0486: 'quc',
    0x0487: 'rw',
    0x0441: 'sw',
    0x0457: 'kok',
    0x0412: 'ko',
    0x0440: 'ky',
    0x0454: 'lo',
    0x0426: 'lv',
    0x0427: 'lt',
    0x082E: 'dsb',
    0x046E: 'lb',
    0x042F: 'mk',
    0x083E: 'ms-BN',
    0x043E: 'ms',
    0x044C: 'ml',
    0x043A: 'mt',
    0x0481: 'mi',
    0x047A: 'arn',
    0x044E: 'mr',
    0x047C: 'moh',
    0x0450: 'mn',
    0x0850: 'mn-CN',
    0x0461: 'ne',
    0x0414: 'nb',
    0x0814: 'nn',
    0x0482: 'oc',
    0x0448: 'or',
    0x0463: 'ps',
    0x0415: 'pl',
    0x0416: 'pt',
    0x0816: 'pt-PT',
    0x0446: 'pa',
    0x046B: 'qu-BO',
    0x086B: 'qu-EC',
    0x0C6B: 'qu',
    0x0418: 'ro',
    0x0417: 'rm',
    0x0419: 'ru',
    0x243B: 'smn',
    0x103B: 'smj-NO',
    0x143B: 'smj',
    0x0C3B: 'se-FI',
    0x043B: 'se',
    0x083B: 'se-SE',
    0x203B: 'sms',
    0x183B: 'sma-NO',
    0x1C3B: 'sms',
    0x044F: 'sa',
    0x1C1A: 'sr-Cyrl-BA',
    0x0C1A: 'sr',
    0x181A: 'sr-Latn-BA',
    0x081A: 'sr-Latn',
    0x046C: 'nso',
    0x0432: 'tn',
    0x045B: 'si',
    0x041B: 'sk',
    0x0424: 'sl',
    0x2C0A: 'es-AR',
    0x400A: 'es-BO',
    0x340A: 'es-CL',
    0x240A: 'es-CO',
    0x140A: 'es-CR',
    0x1C0A: 'es-DO',
    0x300A: 'es-EC',
    0x440A: 'es-SV',
    0x100A: 'es-GT',
    0x480A: 'es-HN',
    0x080A: 'es-MX',
    0x4C0A: 'es-NI',
    0x180A: 'es-PA',
    0x3C0A: 'es-PY',
    0x280A: 'es-PE',
    0x500A: 'es-PR',

    // Microsoft has defined two different language codes for
    // “Spanish with modern sorting” and “Spanish with traditional
    // sorting”. This makes sense for collation APIs, and it would be
    // possible to express this in BCP 47 language tags via Unicode
    // extensions (eg., es-u-co-trad is Spanish with traditional
    // sorting). However, for storing names in fonts, the distinction
    // does not make sense, so we give “es” in both cases.
    0x0C0A: 'es',
    0x040A: 'es',

    0x540A: 'es-US',
    0x380A: 'es-UY',
    0x200A: 'es-VE',
    0x081D: 'sv-FI',
    0x041D: 'sv',
    0x045A: 'syr',
    0x0428: 'tg',
    0x085F: 'tzm',
    0x0449: 'ta',
    0x0444: 'tt',
    0x044A: 'te',
    0x041E: 'th',
    0x0451: 'bo',
    0x041F: 'tr',
    0x0442: 'tk',
    0x0480: 'ug',
    0x0422: 'uk',
    0x042E: 'hsb',
    0x0420: 'ur',
    0x0843: 'uz-Cyrl',
    0x0443: 'uz',
    0x042A: 'vi',
    0x0452: 'cy',
    0x0488: 'wo',
    0x0485: 'sah',
    0x0478: 'ii',
    0x046A: 'yo'
};

// Returns a IETF BCP 47 language code, for example 'zh-Hant'
// for 'Chinese in the traditional script'.
function getLanguageCode(platformID, languageID, ltag) {
    switch (platformID) {
    case 0:  // Unicode
        if (languageID === 0xFFFF) {
            return 'und';
        } else if (ltag) {
            return ltag[languageID];
        }

        break;

    case 1:  // Macintosh
        return macLanguages[languageID];

    case 3:  // Windows
        return windowsLanguages[languageID];
    }

    return undefined;
}

var utf16 = 'utf-16';

// MacOS script ID → encoding. This table stores the default case,
// which can be overridden by macLanguageEncodings.
var macScriptEncodings = {
    0: 'macintosh',           // smRoman
    1: 'x-mac-japanese',      // smJapanese
    2: 'x-mac-chinesetrad',   // smTradChinese
    3: 'x-mac-korean',        // smKorean
    6: 'x-mac-greek',         // smGreek
    7: 'x-mac-cyrillic',      // smCyrillic
    9: 'x-mac-devanagai',     // smDevanagari
    10: 'x-mac-gurmukhi',     // smGurmukhi
    11: 'x-mac-gujarati',     // smGujarati
    12: 'x-mac-oriya',        // smOriya
    13: 'x-mac-bengali',      // smBengali
    14: 'x-mac-tamil',        // smTamil
    15: 'x-mac-telugu',       // smTelugu
    16: 'x-mac-kannada',      // smKannada
    17: 'x-mac-malayalam',    // smMalayalam
    18: 'x-mac-sinhalese',    // smSinhalese
    19: 'x-mac-burmese',      // smBurmese
    20: 'x-mac-khmer',        // smKhmer
    21: 'x-mac-thai',         // smThai
    22: 'x-mac-lao',          // smLao
    23: 'x-mac-georgian',     // smGeorgian
    24: 'x-mac-armenian',     // smArmenian
    25: 'x-mac-chinesesimp',  // smSimpChinese
    26: 'x-mac-tibetan',      // smTibetan
    27: 'x-mac-mongolian',    // smMongolian
    28: 'x-mac-ethiopic',     // smEthiopic
    29: 'x-mac-ce',           // smCentralEuroRoman
    30: 'x-mac-vietnamese',   // smVietnamese
    31: 'x-mac-extarabic'     // smExtArabic
};

// MacOS language ID → encoding. This table stores the exceptional
// cases, which override macScriptEncodings. For writing MacOS naming
// tables, we need to emit a MacOS script ID. Therefore, we cannot
// merge macScriptEncodings into macLanguageEncodings.
//
// http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/Readme.txt
var macLanguageEncodings = {
    15: 'x-mac-icelandic',    // langIcelandic
    17: 'x-mac-turkish',      // langTurkish
    18: 'x-mac-croatian',     // langCroatian
    24: 'x-mac-ce',           // langLithuanian
    25: 'x-mac-ce',           // langPolish
    26: 'x-mac-ce',           // langHungarian
    27: 'x-mac-ce',           // langEstonian
    28: 'x-mac-ce',           // langLatvian
    30: 'x-mac-icelandic',    // langFaroese
    37: 'x-mac-romanian',     // langRomanian
    38: 'x-mac-ce',           // langCzech
    39: 'x-mac-ce',           // langSlovak
    40: 'x-mac-ce',           // langSlovenian
    143: 'x-mac-inuit',       // langInuktitut
    146: 'x-mac-gaelic'       // langIrishGaelicScript
};

function getEncoding(platformID, encodingID, languageID) {
    switch (platformID) {
    case 0:  // Unicode
        return utf16;

    case 1:  // Apple Macintosh
        return macLanguageEncodings[languageID] || macScriptEncodings[encodingID];

    case 3:  // Microsoft Windows
        if (encodingID === 1 || encodingID === 10) {
            return utf16;
        }

        break;
    }

    return undefined;
}

// Parse the naming `name` table.
// FIXME: Format 1 additional fields are not supported yet.
// ltag is the content of the `ltag' table, such as ['en', 'zh-Hans', 'de-CH-1904'].
function parseNameTable(data, start, ltag) {
    var name = {};
    var p = new parse.Parser(data, start);
    var format = p.parseUShort();
    var count = p.parseUShort();
    var stringOffset = p.offset + p.parseUShort();
    for (var i = 0; i < count; i++) {
        var platformID = p.parseUShort();
        var encodingID = p.parseUShort();
        var languageID = p.parseUShort();
        var nameID = p.parseUShort();
        var property = nameTableNames[nameID] || nameID;
        var byteLength = p.parseUShort();
        var offset = p.parseUShort();
        var language = getLanguageCode(platformID, languageID, ltag);
        var encoding = getEncoding(platformID, encodingID, languageID);
        if (encoding !== undefined && language !== undefined) {
            var text;
            if (encoding === utf16) {
                text = decode.UTF16(data, stringOffset + offset, byteLength);
            } else {
                text = decode.MACSTRING(data, stringOffset + offset, byteLength, encoding);
            }

            if (text) {
                var translations = name[property];
                if (translations === undefined) {
                    translations = name[property] = {};
                }

                translations[language] = text;
            }
        }
    }

    var langTagCount = 0;
    if (format === 1) {
        // FIXME: Also handle Microsoft's 'name' table 1.
        langTagCount = p.parseUShort();
    }

    return name;
}

// {23: 'foo'} → {'foo': 23}
// ['bar', 'baz'] → {'bar': 0, 'baz': 1}
function reverseDict(dict) {
    var result = {};
    for (var key in dict) {
        result[dict[key]] = parseInt(key);
    }

    return result;
}

function makeNameRecord(platformID, encodingID, languageID, nameID, length, offset) {
    return new table.Table('NameRecord', [
        {name: 'platformID', type: 'USHORT', value: platformID},
        {name: 'encodingID', type: 'USHORT', value: encodingID},
        {name: 'languageID', type: 'USHORT', value: languageID},
        {name: 'nameID', type: 'USHORT', value: nameID},
        {name: 'length', type: 'USHORT', value: length},
        {name: 'offset', type: 'USHORT', value: offset}
    ]);
}

// Finds the position of needle in haystack, or -1 if not there.
// Like String.indexOf(), but for arrays.
function findSubArray(needle, haystack) {
    var needleLength = needle.length;
    var limit = haystack.length - needleLength + 1;

    loop:
    for (var pos = 0; pos < limit; pos++) {
        for (; pos < limit; pos++) {
            for (var k = 0; k < needleLength; k++) {
                if (haystack[pos + k] !== needle[k]) {
                    continue loop;
                }
            }

            return pos;
        }
    }

    return -1;
}

function addStringToPool(s, pool) {
    var offset = findSubArray(s, pool);
    if (offset < 0) {
        offset = pool.length;
        for (var i = 0, len = s.length; i < len; ++i) {
            pool.push(s[i]);
        }

    }

    return offset;
}

function makeNameTable(names, ltag) {
    var nameID;
    var nameIDs = [];

    var namesWithNumericKeys = {};
    var nameTableIds = reverseDict(nameTableNames);
    for (var key in names) {
        var id = nameTableIds[key];
        if (id === undefined) {
            id = key;
        }

        nameID = parseInt(id);
        namesWithNumericKeys[nameID] = names[key];
        nameIDs.push(nameID);
    }

    var macLanguageIds = reverseDict(macLanguages);
    var windowsLanguageIds = reverseDict(windowsLanguages);

    var nameRecords = [];
    var stringPool = [];

    for (var i = 0; i < nameIDs.length; i++) {
        nameID = nameIDs[i];
        var translations = namesWithNumericKeys[nameID];
        for (var lang in translations) {
            var text = translations[lang];

            // For MacOS, we try to emit the name in the form that was introduced
            // in the initial version of the TrueType spec (in the late 1980s).
            // However, this can fail for various reasons: the requested BCP 47
            // language code might not have an old-style Mac equivalent;
            // we might not have a codec for the needed character encoding;
            // or the name might contain characters that cannot be expressed
            // in the old-style Macintosh encoding. In case of failure, we emit
            // the name in a more modern fashion (Unicode encoding with BCP 47
            // language tags) that is recognized by MacOS 10.5, released in 2009.
            // If fonts were only read by operating systems, we could simply
            // emit all names in the modern form; this would be much easier.
            // However, there are many applications and libraries that read
            // 'name' tables directly, and these will usually only recognize
            // the ancient form (silently skipping the unrecognized names).
            var macPlatform = 1;  // Macintosh
            var macLanguage = macLanguageIds[lang];
            var macScript = macLanguageToScript[macLanguage];
            var macEncoding = getEncoding(macPlatform, macScript, macLanguage);
            var macName = encode.MACSTRING(text, macEncoding);
            if (macName === undefined) {
                macPlatform = 0;  // Unicode
                macLanguage = ltag.indexOf(lang);
                if (macLanguage < 0) {
                    macLanguage = ltag.length;
                    ltag.push(lang);
                }

                macScript = 4;  // Unicode 2.0 and later
                macName = encode.UTF16(text);
            }

            var macNameOffset = addStringToPool(macName, stringPool);
            nameRecords.push(makeNameRecord(macPlatform, macScript, macLanguage,
                                            nameID, macName.length, macNameOffset));

            var winLanguage = windowsLanguageIds[lang];
            if (winLanguage !== undefined) {
                var winName = encode.UTF16(text);
                var winNameOffset = addStringToPool(winName, stringPool);
                nameRecords.push(makeNameRecord(3, 1, winLanguage,
                                                nameID, winName.length, winNameOffset));
            }
        }
    }

    nameRecords.sort(function(a, b) {
        return ((a.platformID - b.platformID) ||
                (a.encodingID - b.encodingID) ||
                (a.languageID - b.languageID) ||
                (a.nameID - b.nameID));
    });

    var t = new table.Table('name', [
        {name: 'format', type: 'USHORT', value: 0},
        {name: 'count', type: 'USHORT', value: nameRecords.length},
        {name: 'stringOffset', type: 'USHORT', value: 6 + nameRecords.length * 12}
    ]);

    for (var r = 0; r < nameRecords.length; r++) {
        t.fields.push({name: 'record_' + r, type: 'TABLE', value: nameRecords[r]});
    }

    t.fields.push({name: 'strings', type: 'LITERAL', value: stringPool});
    return t;
}

exports.parse = parseNameTable;
exports.make = makeNameTable;

},{"../parse":9,"../table":11,"../types":28}],25:[function(require,module,exports){
// The `OS/2` table contains metrics required in OpenType fonts.
// https://www.microsoft.com/typography/OTSPEC/os2.htm

'use strict';

var parse = require('../parse');
var table = require('../table');

var unicodeRanges = [
    {begin: 0x0000, end: 0x007F}, // Basic Latin
    {begin: 0x0080, end: 0x00FF}, // Latin-1 Supplement
    {begin: 0x0100, end: 0x017F}, // Latin Extended-A
    {begin: 0x0180, end: 0x024F}, // Latin Extended-B
    {begin: 0x0250, end: 0x02AF}, // IPA Extensions
    {begin: 0x02B0, end: 0x02FF}, // Spacing Modifier Letters
    {begin: 0x0300, end: 0x036F}, // Combining Diacritical Marks
    {begin: 0x0370, end: 0x03FF}, // Greek and Coptic
    {begin: 0x2C80, end: 0x2CFF}, // Coptic
    {begin: 0x0400, end: 0x04FF}, // Cyrillic
    {begin: 0x0530, end: 0x058F}, // Armenian
    {begin: 0x0590, end: 0x05FF}, // Hebrew
    {begin: 0xA500, end: 0xA63F}, // Vai
    {begin: 0x0600, end: 0x06FF}, // Arabic
    {begin: 0x07C0, end: 0x07FF}, // NKo
    {begin: 0x0900, end: 0x097F}, // Devanagari
    {begin: 0x0980, end: 0x09FF}, // Bengali
    {begin: 0x0A00, end: 0x0A7F}, // Gurmukhi
    {begin: 0x0A80, end: 0x0AFF}, // Gujarati
    {begin: 0x0B00, end: 0x0B7F}, // Oriya
    {begin: 0x0B80, end: 0x0BFF}, // Tamil
    {begin: 0x0C00, end: 0x0C7F}, // Telugu
    {begin: 0x0C80, end: 0x0CFF}, // Kannada
    {begin: 0x0D00, end: 0x0D7F}, // Malayalam
    {begin: 0x0E00, end: 0x0E7F}, // Thai
    {begin: 0x0E80, end: 0x0EFF}, // Lao
    {begin: 0x10A0, end: 0x10FF}, // Georgian
    {begin: 0x1B00, end: 0x1B7F}, // Balinese
    {begin: 0x1100, end: 0x11FF}, // Hangul Jamo
    {begin: 0x1E00, end: 0x1EFF}, // Latin Extended Additional
    {begin: 0x1F00, end: 0x1FFF}, // Greek Extended
    {begin: 0x2000, end: 0x206F}, // General Punctuation
    {begin: 0x2070, end: 0x209F}, // Superscripts And Subscripts
    {begin: 0x20A0, end: 0x20CF}, // Currency Symbol
    {begin: 0x20D0, end: 0x20FF}, // Combining Diacritical Marks For Symbols
    {begin: 0x2100, end: 0x214F}, // Letterlike Symbols
    {begin: 0x2150, end: 0x218F}, // Number Forms
    {begin: 0x2190, end: 0x21FF}, // Arrows
    {begin: 0x2200, end: 0x22FF}, // Mathematical Operators
    {begin: 0x2300, end: 0x23FF}, // Miscellaneous Technical
    {begin: 0x2400, end: 0x243F}, // Control Pictures
    {begin: 0x2440, end: 0x245F}, // Optical Character Recognition
    {begin: 0x2460, end: 0x24FF}, // Enclosed Alphanumerics
    {begin: 0x2500, end: 0x257F}, // Box Drawing
    {begin: 0x2580, end: 0x259F}, // Block Elements
    {begin: 0x25A0, end: 0x25FF}, // Geometric Shapes
    {begin: 0x2600, end: 0x26FF}, // Miscellaneous Symbols
    {begin: 0x2700, end: 0x27BF}, // Dingbats
    {begin: 0x3000, end: 0x303F}, // CJK Symbols And Punctuation
    {begin: 0x3040, end: 0x309F}, // Hiragana
    {begin: 0x30A0, end: 0x30FF}, // Katakana
    {begin: 0x3100, end: 0x312F}, // Bopomofo
    {begin: 0x3130, end: 0x318F}, // Hangul Compatibility Jamo
    {begin: 0xA840, end: 0xA87F}, // Phags-pa
    {begin: 0x3200, end: 0x32FF}, // Enclosed CJK Letters And Months
    {begin: 0x3300, end: 0x33FF}, // CJK Compatibility
    {begin: 0xAC00, end: 0xD7AF}, // Hangul Syllables
    {begin: 0xD800, end: 0xDFFF}, // Non-Plane 0 *
    {begin: 0x10900, end: 0x1091F}, // Phoenicia
    {begin: 0x4E00, end: 0x9FFF}, // CJK Unified Ideographs
    {begin: 0xE000, end: 0xF8FF}, // Private Use Area (plane 0)
    {begin: 0x31C0, end: 0x31EF}, // CJK Strokes
    {begin: 0xFB00, end: 0xFB4F}, // Alphabetic Presentation Forms
    {begin: 0xFB50, end: 0xFDFF}, // Arabic Presentation Forms-A
    {begin: 0xFE20, end: 0xFE2F}, // Combining Half Marks
    {begin: 0xFE10, end: 0xFE1F}, // Vertical Forms
    {begin: 0xFE50, end: 0xFE6F}, // Small Form Variants
    {begin: 0xFE70, end: 0xFEFF}, // Arabic Presentation Forms-B
    {begin: 0xFF00, end: 0xFFEF}, // Halfwidth And Fullwidth Forms
    {begin: 0xFFF0, end: 0xFFFF}, // Specials
    {begin: 0x0F00, end: 0x0FFF}, // Tibetan
    {begin: 0x0700, end: 0x074F}, // Syriac
    {begin: 0x0780, end: 0x07BF}, // Thaana
    {begin: 0x0D80, end: 0x0DFF}, // Sinhala
    {begin: 0x1000, end: 0x109F}, // Myanmar
    {begin: 0x1200, end: 0x137F}, // Ethiopic
    {begin: 0x13A0, end: 0x13FF}, // Cherokee
    {begin: 0x1400, end: 0x167F}, // Unified Canadian Aboriginal Syllabics
    {begin: 0x1680, end: 0x169F}, // Ogham
    {begin: 0x16A0, end: 0x16FF}, // Runic
    {begin: 0x1780, end: 0x17FF}, // Khmer
    {begin: 0x1800, end: 0x18AF}, // Mongolian
    {begin: 0x2800, end: 0x28FF}, // Braille Patterns
    {begin: 0xA000, end: 0xA48F}, // Yi Syllables
    {begin: 0x1700, end: 0x171F}, // Tagalog
    {begin: 0x10300, end: 0x1032F}, // Old Italic
    {begin: 0x10330, end: 0x1034F}, // Gothic
    {begin: 0x10400, end: 0x1044F}, // Deseret
    {begin: 0x1D000, end: 0x1D0FF}, // Byzantine Musical Symbols
    {begin: 0x1D400, end: 0x1D7FF}, // Mathematical Alphanumeric Symbols
    {begin: 0xFF000, end: 0xFFFFD}, // Private Use (plane 15)
    {begin: 0xFE00, end: 0xFE0F}, // Variation Selectors
    {begin: 0xE0000, end: 0xE007F}, // Tags
    {begin: 0x1900, end: 0x194F}, // Limbu
    {begin: 0x1950, end: 0x197F}, // Tai Le
    {begin: 0x1980, end: 0x19DF}, // New Tai Lue
    {begin: 0x1A00, end: 0x1A1F}, // Buginese
    {begin: 0x2C00, end: 0x2C5F}, // Glagolitic
    {begin: 0x2D30, end: 0x2D7F}, // Tifinagh
    {begin: 0x4DC0, end: 0x4DFF}, // Yijing Hexagram Symbols
    {begin: 0xA800, end: 0xA82F}, // Syloti Nagri
    {begin: 0x10000, end: 0x1007F}, // Linear B Syllabary
    {begin: 0x10140, end: 0x1018F}, // Ancient Greek Numbers
    {begin: 0x10380, end: 0x1039F}, // Ugaritic
    {begin: 0x103A0, end: 0x103DF}, // Old Persian
    {begin: 0x10450, end: 0x1047F}, // Shavian
    {begin: 0x10480, end: 0x104AF}, // Osmanya
    {begin: 0x10800, end: 0x1083F}, // Cypriot Syllabary
    {begin: 0x10A00, end: 0x10A5F}, // Kharoshthi
    {begin: 0x1D300, end: 0x1D35F}, // Tai Xuan Jing Symbols
    {begin: 0x12000, end: 0x123FF}, // Cuneiform
    {begin: 0x1D360, end: 0x1D37F}, // Counting Rod Numerals
    {begin: 0x1B80, end: 0x1BBF}, // Sundanese
    {begin: 0x1C00, end: 0x1C4F}, // Lepcha
    {begin: 0x1C50, end: 0x1C7F}, // Ol Chiki
    {begin: 0xA880, end: 0xA8DF}, // Saurashtra
    {begin: 0xA900, end: 0xA92F}, // Kayah Li
    {begin: 0xA930, end: 0xA95F}, // Rejang
    {begin: 0xAA00, end: 0xAA5F}, // Cham
    {begin: 0x10190, end: 0x101CF}, // Ancient Symbols
    {begin: 0x101D0, end: 0x101FF}, // Phaistos Disc
    {begin: 0x102A0, end: 0x102DF}, // Carian
    {begin: 0x1F030, end: 0x1F09F}  // Domino Tiles
];

function getUnicodeRange(unicode) {
    for (var i = 0; i < unicodeRanges.length; i += 1) {
        var range = unicodeRanges[i];
        if (unicode >= range.begin && unicode < range.end) {
            return i;
        }
    }

    return -1;
}

// Parse the OS/2 and Windows metrics `OS/2` table
function parseOS2Table(data, start) {
    var os2 = {};
    var p = new parse.Parser(data, start);
    os2.version = p.parseUShort();
    os2.xAvgCharWidth = p.parseShort();
    os2.usWeightClass = p.parseUShort();
    os2.usWidthClass = p.parseUShort();
    os2.fsType = p.parseUShort();
    os2.ySubscriptXSize = p.parseShort();
    os2.ySubscriptYSize = p.parseShort();
    os2.ySubscriptXOffset = p.parseShort();
    os2.ySubscriptYOffset = p.parseShort();
    os2.ySuperscriptXSize = p.parseShort();
    os2.ySuperscriptYSize = p.parseShort();
    os2.ySuperscriptXOffset = p.parseShort();
    os2.ySuperscriptYOffset = p.parseShort();
    os2.yStrikeoutSize = p.parseShort();
    os2.yStrikeoutPosition = p.parseShort();
    os2.sFamilyClass = p.parseShort();
    os2.panose = [];
    for (var i = 0; i < 10; i++) {
        os2.panose[i] = p.parseByte();
    }

    os2.ulUnicodeRange1 = p.parseULong();
    os2.ulUnicodeRange2 = p.parseULong();
    os2.ulUnicodeRange3 = p.parseULong();
    os2.ulUnicodeRange4 = p.parseULong();
    os2.achVendID = String.fromCharCode(p.parseByte(), p.parseByte(), p.parseByte(), p.parseByte());
    os2.fsSelection = p.parseUShort();
    os2.usFirstCharIndex = p.parseUShort();
    os2.usLastCharIndex = p.parseUShort();
    os2.sTypoAscender = p.parseShort();
    os2.sTypoDescender = p.parseShort();
    os2.sTypoLineGap = p.parseShort();
    os2.usWinAscent = p.parseUShort();
    os2.usWinDescent = p.parseUShort();
    if (os2.version >= 1) {
        os2.ulCodePageRange1 = p.parseULong();
        os2.ulCodePageRange2 = p.parseULong();
    }

    if (os2.version >= 2) {
        os2.sxHeight = p.parseShort();
        os2.sCapHeight = p.parseShort();
        os2.usDefaultChar = p.parseUShort();
        os2.usBreakChar = p.parseUShort();
        os2.usMaxContent = p.parseUShort();
    }

    return os2;
}

function makeOS2Table(options) {
    return new table.Table('OS/2', [
        {name: 'version', type: 'USHORT', value: 0x0003},
        {name: 'xAvgCharWidth', type: 'SHORT', value: 0},
        {name: 'usWeightClass', type: 'USHORT', value: 0},
        {name: 'usWidthClass', type: 'USHORT', value: 0},
        {name: 'fsType', type: 'USHORT', value: 0},
        {name: 'ySubscriptXSize', type: 'SHORT', value: 650},
        {name: 'ySubscriptYSize', type: 'SHORT', value: 699},
        {name: 'ySubscriptXOffset', type: 'SHORT', value: 0},
        {name: 'ySubscriptYOffset', type: 'SHORT', value: 140},
        {name: 'ySuperscriptXSize', type: 'SHORT', value: 650},
        {name: 'ySuperscriptYSize', type: 'SHORT', value: 699},
        {name: 'ySuperscriptXOffset', type: 'SHORT', value: 0},
        {name: 'ySuperscriptYOffset', type: 'SHORT', value: 479},
        {name: 'yStrikeoutSize', type: 'SHORT', value: 49},
        {name: 'yStrikeoutPosition', type: 'SHORT', value: 258},
        {name: 'sFamilyClass', type: 'SHORT', value: 0},
        {name: 'bFamilyType', type: 'BYTE', value: 0},
        {name: 'bSerifStyle', type: 'BYTE', value: 0},
        {name: 'bWeight', type: 'BYTE', value: 0},
        {name: 'bProportion', type: 'BYTE', value: 0},
        {name: 'bContrast', type: 'BYTE', value: 0},
        {name: 'bStrokeVariation', type: 'BYTE', value: 0},
        {name: 'bArmStyle', type: 'BYTE', value: 0},
        {name: 'bLetterform', type: 'BYTE', value: 0},
        {name: 'bMidline', type: 'BYTE', value: 0},
        {name: 'bXHeight', type: 'BYTE', value: 0},
        {name: 'ulUnicodeRange1', type: 'ULONG', value: 0},
        {name: 'ulUnicodeRange2', type: 'ULONG', value: 0},
        {name: 'ulUnicodeRange3', type: 'ULONG', value: 0},
        {name: 'ulUnicodeRange4', type: 'ULONG', value: 0},
        {name: 'achVendID', type: 'CHARARRAY', value: 'XXXX'},
        {name: 'fsSelection', type: 'USHORT', value: 0},
        {name: 'usFirstCharIndex', type: 'USHORT', value: 0},
        {name: 'usLastCharIndex', type: 'USHORT', value: 0},
        {name: 'sTypoAscender', type: 'SHORT', value: 0},
        {name: 'sTypoDescender', type: 'SHORT', value: 0},
        {name: 'sTypoLineGap', type: 'SHORT', value: 0},
        {name: 'usWinAscent', type: 'USHORT', value: 0},
        {name: 'usWinDescent', type: 'USHORT', value: 0},
        {name: 'ulCodePageRange1', type: 'ULONG', value: 0},
        {name: 'ulCodePageRange2', type: 'ULONG', value: 0},
        {name: 'sxHeight', type: 'SHORT', value: 0},
        {name: 'sCapHeight', type: 'SHORT', value: 0},
        {name: 'usDefaultChar', type: 'USHORT', value: 0},
        {name: 'usBreakChar', type: 'USHORT', value: 0},
        {name: 'usMaxContext', type: 'USHORT', value: 0}
    ], options);
}

exports.unicodeRanges = unicodeRanges;
exports.getUnicodeRange = getUnicodeRange;
exports.parse = parseOS2Table;
exports.make = makeOS2Table;

},{"../parse":9,"../table":11}],26:[function(require,module,exports){
// The `post` table stores additional PostScript information, such as glyph names.
// https://www.microsoft.com/typography/OTSPEC/post.htm

'use strict';

var encoding = require('../encoding');
var parse = require('../parse');
var table = require('../table');

// Parse the PostScript `post` table
function parsePostTable(data, start) {
    var post = {};
    var p = new parse.Parser(data, start);
    var i;
    post.version = p.parseVersion();
    post.italicAngle = p.parseFixed();
    post.underlinePosition = p.parseShort();
    post.underlineThickness = p.parseShort();
    post.isFixedPitch = p.parseULong();
    post.minMemType42 = p.parseULong();
    post.maxMemType42 = p.parseULong();
    post.minMemType1 = p.parseULong();
    post.maxMemType1 = p.parseULong();
    switch (post.version) {
    case 1:
        post.names = encoding.standardNames.slice();
        break;
    case 2:
        post.numberOfGlyphs = p.parseUShort();
        post.glyphNameIndex = new Array(post.numberOfGlyphs);
        for (i = 0; i < post.numberOfGlyphs; i++) {
            post.glyphNameIndex[i] = p.parseUShort();
        }

        post.names = [];
        for (i = 0; i < post.numberOfGlyphs; i++) {
            if (post.glyphNameIndex[i] >= encoding.standardNames.length) {
                var nameLength = p.parseChar();
                post.names.push(p.parseString(nameLength));
            }
        }

        break;
    case 2.5:
        post.numberOfGlyphs = p.parseUShort();
        post.offset = new Array(post.numberOfGlyphs);
        for (i = 0; i < post.numberOfGlyphs; i++) {
            post.offset[i] = p.parseChar();
        }

        break;
    }
    return post;
}

function makePostTable() {
    return new table.Table('post', [
        {name: 'version', type: 'FIXED', value: 0x00030000},
        {name: 'italicAngle', type: 'FIXED', value: 0},
        {name: 'underlinePosition', type: 'FWORD', value: 0},
        {name: 'underlineThickness', type: 'FWORD', value: 0},
        {name: 'isFixedPitch', type: 'ULONG', value: 0},
        {name: 'minMemType42', type: 'ULONG', value: 0},
        {name: 'maxMemType42', type: 'ULONG', value: 0},
        {name: 'minMemType1', type: 'ULONG', value: 0},
        {name: 'maxMemType1', type: 'ULONG', value: 0}
    ]);
}

exports.parse = parsePostTable;
exports.make = makePostTable;

},{"../encoding":4,"../parse":9,"../table":11}],27:[function(require,module,exports){
// The `sfnt` wrapper provides organization for the tables in the font.
// It is the top-level data structure in a font.
// https://www.microsoft.com/typography/OTSPEC/otff.htm
// Recommendations for creating OpenType Fonts:
// http://www.microsoft.com/typography/otspec140/recom.htm

'use strict';

var check = require('../check');
var table = require('../table');

var cmap = require('./cmap');
var cff = require('./cff');
var head = require('./head');
var hhea = require('./hhea');
var hmtx = require('./hmtx');
var ltag = require('./ltag');
var maxp = require('./maxp');
var _name = require('./name');
var os2 = require('./os2');
var post = require('./post');

function log2(v) {
    return Math.log(v) / Math.log(2) | 0;
}

function computeCheckSum(bytes) {
    while (bytes.length % 4 !== 0) {
        bytes.push(0);
    }

    var sum = 0;
    for (var i = 0; i < bytes.length; i += 4) {
        sum += (bytes[i] << 24) +
            (bytes[i + 1] << 16) +
            (bytes[i + 2] << 8) +
            (bytes[i + 3]);
    }

    sum %= Math.pow(2, 32);
    return sum;
}

function makeTableRecord(tag, checkSum, offset, length) {
    return new table.Table('Table Record', [
        {name: 'tag', type: 'TAG', value: tag !== undefined ? tag : ''},
        {name: 'checkSum', type: 'ULONG', value: checkSum !== undefined ? checkSum : 0},
        {name: 'offset', type: 'ULONG', value: offset !== undefined ? offset : 0},
        {name: 'length', type: 'ULONG', value: length !== undefined ? length : 0}
    ]);
}

function makeSfntTable(tables) {
    var sfnt = new table.Table('sfnt', [
        {name: 'version', type: 'TAG', value: 'OTTO'},
        {name: 'numTables', type: 'USHORT', value: 0},
        {name: 'searchRange', type: 'USHORT', value: 0},
        {name: 'entrySelector', type: 'USHORT', value: 0},
        {name: 'rangeShift', type: 'USHORT', value: 0}
    ]);
    sfnt.tables = tables;
    sfnt.numTables = tables.length;
    var highestPowerOf2 = Math.pow(2, log2(sfnt.numTables));
    sfnt.searchRange = 16 * highestPowerOf2;
    sfnt.entrySelector = log2(highestPowerOf2);
    sfnt.rangeShift = sfnt.numTables * 16 - sfnt.searchRange;

    var recordFields = [];
    var tableFields = [];

    var offset = sfnt.sizeOf() + (makeTableRecord().sizeOf() * sfnt.numTables);
    while (offset % 4 !== 0) {
        offset += 1;
        tableFields.push({name: 'padding', type: 'BYTE', value: 0});
    }

    for (var i = 0; i < tables.length; i += 1) {
        var t = tables[i];
        check.argument(t.tableName.length === 4, 'Table name' + t.tableName + ' is invalid.');
        var tableLength = t.sizeOf();
        var tableRecord = makeTableRecord(t.tableName, computeCheckSum(t.encode()), offset, tableLength);
        recordFields.push({name: tableRecord.tag + ' Table Record', type: 'TABLE', value: tableRecord});
        tableFields.push({name: t.tableName + ' table', type: 'TABLE', value: t});
        offset += tableLength;
        check.argument(!isNaN(offset), 'Something went wrong calculating the offset.');
        while (offset % 4 !== 0) {
            offset += 1;
            tableFields.push({name: 'padding', type: 'BYTE', value: 0});
        }
    }

    // Table records need to be sorted alphabetically.
    recordFields.sort(function(r1, r2) {
        if (r1.value.tag > r2.value.tag) {
            return 1;
        } else {
            return -1;
        }
    });

    sfnt.fields = sfnt.fields.concat(recordFields);
    sfnt.fields = sfnt.fields.concat(tableFields);
    return sfnt;
}

// Get the metrics for a character. If the string has more than one character
// this function returns metrics for the first available character.
// You can provide optional fallback metrics if no characters are available.
function metricsForChar(font, chars, notFoundMetrics) {
    for (var i = 0; i < chars.length; i += 1) {
        var glyphIndex = font.charToGlyphIndex(chars[i]);
        if (glyphIndex > 0) {
            var glyph = font.glyphs.get(glyphIndex);
            return glyph.getMetrics();
        }
    }

    return notFoundMetrics;
}

function average(vs) {
    var sum = 0;
    for (var i = 0; i < vs.length; i += 1) {
        sum += vs[i];
    }

    return sum / vs.length;
}

// Convert the font object to a SFNT data structure.
// This structure contains all the necessary tables and metadata to create a binary OTF file.
function fontToSfntTable(font) {
    var xMins = [];
    var yMins = [];
    var xMaxs = [];
    var yMaxs = [];
    var advanceWidths = [];
    var leftSideBearings = [];
    var rightSideBearings = [];
    var firstCharIndex;
    var lastCharIndex = 0;
    var ulUnicodeRange1 = 0;
    var ulUnicodeRange2 = 0;
    var ulUnicodeRange3 = 0;
    var ulUnicodeRange4 = 0;

    for (var i = 0; i < font.glyphs.length; i += 1) {
        var glyph = font.glyphs.get(i);
        var unicode = glyph.unicode | 0;
        if (firstCharIndex > unicode || firstCharIndex === null) {
            firstCharIndex = unicode;
        }

        if (lastCharIndex < unicode) {
            lastCharIndex = unicode;
        }

        var position = os2.getUnicodeRange(unicode);
        if (position < 32) {
            ulUnicodeRange1 |= 1 << position;
        } else if (position < 64) {
            ulUnicodeRange2 |= 1 << position - 32;
        } else if (position < 96) {
            ulUnicodeRange3 |= 1 << position - 64;
        } else if (position < 123) {
            ulUnicodeRange4 |= 1 << position - 96;
        } else {
            throw new Error('Unicode ranges bits > 123 are reserved for internal usage');
        }
        // Skip non-important characters.
        if (glyph.name === '.notdef') continue;
        var metrics = glyph.getMetrics();
        xMins.push(metrics.xMin);
        yMins.push(metrics.yMin);
        xMaxs.push(metrics.xMax);
        yMaxs.push(metrics.yMax);
        leftSideBearings.push(metrics.leftSideBearing);
        rightSideBearings.push(metrics.rightSideBearing);
        advanceWidths.push(glyph.advanceWidth);
    }

    var globals = {
        xMin: Math.min.apply(null, xMins),
        yMin: Math.min.apply(null, yMins),
        xMax: Math.max.apply(null, xMaxs),
        yMax: Math.max.apply(null, yMaxs),
        advanceWidthMax: Math.max.apply(null, advanceWidths),
        advanceWidthAvg: average(advanceWidths),
        minLeftSideBearing: Math.min.apply(null, leftSideBearings),
        maxLeftSideBearing: Math.max.apply(null, leftSideBearings),
        minRightSideBearing: Math.min.apply(null, rightSideBearings)
    };
    globals.ascender = font.ascender !== undefined ? font.ascender : globals.yMax;
    globals.descender = font.descender !== undefined ? font.descender : globals.yMin;

    var headTable = head.make({
        flags: 3, // 00000011 (baseline for font at y=0; left sidebearing point at x=0)
        unitsPerEm: font.unitsPerEm,
        xMin: globals.xMin,
        yMin: globals.yMin,
        xMax: globals.xMax,
        yMax: globals.yMax,
        lowestRecPPEM: 3
    });

    var hheaTable = hhea.make({
        ascender: globals.ascender,
        descender: globals.descender,
        advanceWidthMax: globals.advanceWidthMax,
        minLeftSideBearing: globals.minLeftSideBearing,
        minRightSideBearing: globals.minRightSideBearing,
        xMaxExtent: globals.maxLeftSideBearing + (globals.xMax - globals.xMin),
        numberOfHMetrics: font.glyphs.length
    });

    var maxpTable = maxp.make(font.glyphs.length);

    var os2Table = os2.make({
        xAvgCharWidth: Math.round(globals.advanceWidthAvg),
        usWeightClass: 500, // Medium FIXME Make this configurable
        usWidthClass: 5, // Medium (normal) FIXME Make this configurable
        usFirstCharIndex: firstCharIndex,
        usLastCharIndex: lastCharIndex,
        ulUnicodeRange1: ulUnicodeRange1,
        ulUnicodeRange2: ulUnicodeRange2,
        ulUnicodeRange3: ulUnicodeRange3,
        ulUnicodeRange4: ulUnicodeRange4,
        fsSelection: 64, // REGULAR
        // See http://typophile.com/node/13081 for more info on vertical metrics.
        // We get metrics for typical characters (such as "x" for xHeight).
        // We provide some fallback characters if characters are unavailable: their
        // ordering was chosen experimentally.
        sTypoAscender: globals.ascender,
        sTypoDescender: globals.descender,
        sTypoLineGap: 0,
        usWinAscent: globals.yMax,
        usWinDescent: Math.abs(globals.yMin),
        ulCodePageRange1: 1, // FIXME: hard-code Latin 1 support for now
        sxHeight: metricsForChar(font, 'xyvw', {yMax: Math.round(globals.ascender / 2)}).yMax,
        sCapHeight: metricsForChar(font, 'HIKLEFJMNTZBDPRAGOQSUVWXY', globals).yMax,
        usDefaultChar: font.hasChar(' ') ? 32 : 0, // Use space as the default character, if available.
        usBreakChar: font.hasChar(' ') ? 32 : 0 // Use space as the break character, if available.
    });

    var hmtxTable = hmtx.make(font.glyphs);
    var cmapTable = cmap.make(font.glyphs);

    var englishFamilyName = font.getEnglishName('fontFamily');
    var englishStyleName = font.getEnglishName('fontSubfamily');
    var englishFullName = englishFamilyName + ' ' + englishStyleName;
    var postScriptName = font.getEnglishName('postScriptName');
    if (!postScriptName) {
        postScriptName = englishFamilyName.replace(/\s/g, '') + '-' + englishStyleName;
    }

    var names = {};
    for (var n in font.names) {
        names[n] = font.names[n];
    }

    if (!names.uniqueID) {
        names.uniqueID = {en: font.getEnglishName('manufacturer') + ':' + englishFullName};
    }

    if (!names.postScriptName) {
        names.postScriptName = {en: postScriptName};
    }

    if (!names.preferredFamily) {
        names.preferredFamily = font.names.fontFamily;
    }

    if (!names.preferredSubfamily) {
        names.preferredSubfamily = font.names.fontSubfamily;
    }

    var languageTags = [];
    var nameTable = _name.make(names, languageTags);
    var ltagTable = (languageTags.length > 0 ? ltag.make(languageTags) : undefined);

    var postTable = post.make();
    var cffTable = cff.make(font.glyphs, {
        version: font.getEnglishName('version'),
        fullName: englishFullName,
        familyName: englishFamilyName,
        weightName: englishStyleName,
        postScriptName: postScriptName,
        unitsPerEm: font.unitsPerEm,
        fontBBox: [0, globals.yMin, globals.ascender, globals.advanceWidthMax]
    });

    // The order does not matter because makeSfntTable() will sort them.
    var tables = [headTable, hheaTable, maxpTable, os2Table, nameTable, cmapTable, postTable, cffTable, hmtxTable];
    if (ltagTable) {
        tables.push(ltagTable);
    }

    var sfntTable = makeSfntTable(tables);

    // Compute the font's checkSum and store it in head.checkSumAdjustment.
    var bytes = sfntTable.encode();
    var checkSum = computeCheckSum(bytes);
    var tableFields = sfntTable.fields;
    var checkSumAdjusted = false;
    for (i = 0; i < tableFields.length; i += 1) {
        if (tableFields[i].name === 'head table') {
            tableFields[i].value.checkSumAdjustment = 0xB1B0AFBA - checkSum;
            checkSumAdjusted = true;
            break;
        }
    }

    if (!checkSumAdjusted) {
        throw new Error('Could not find head table with checkSum to adjust.');
    }

    return sfntTable;
}

exports.computeCheckSum = computeCheckSum;
exports.make = makeSfntTable;
exports.fontToTable = fontToSfntTable;

},{"../check":2,"../table":11,"./cff":12,"./cmap":13,"./head":17,"./hhea":18,"./hmtx":19,"./ltag":22,"./maxp":23,"./name":24,"./os2":25,"./post":26}],28:[function(require,module,exports){
// Data types used in the OpenType font file.
// All OpenType fonts use Motorola-style byte ordering (Big Endian)

/* global WeakMap */

'use strict';

var check = require('./check');

var LIMIT16 = 32768; // The limit at which a 16-bit number switches signs == 2^15
var LIMIT32 = 2147483648; // The limit at which a 32-bit number switches signs == 2 ^ 31

var decode = {};
var encode = {};
var sizeOf = {};

// Return a function that always returns the same value.
function constant(v) {
    return function() {
        return v;
    };
}

// OpenType data types //////////////////////////////////////////////////////

// Convert an 8-bit unsigned integer to a list of 1 byte.
encode.BYTE = function(v) {
    check.argument(v >= 0 && v <= 255, 'Byte value should be between 0 and 255.');
    return [v];
};

sizeOf.BYTE = constant(1);

// Convert a 8-bit signed integer to a list of 1 byte.
encode.CHAR = function(v) {
    return [v.charCodeAt(0)];
};

sizeOf.CHAR = constant(1);

// Convert an ASCII string to a list of bytes.
encode.CHARARRAY = function(v) {
    var b = [];
    for (var i = 0; i < v.length; i += 1) {
        b.push(v.charCodeAt(i));
    }

    return b;
};

sizeOf.CHARARRAY = function(v) {
    return v.length;
};

// Convert a 16-bit unsigned integer to a list of 2 bytes.
encode.USHORT = function(v) {
    return [(v >> 8) & 0xFF, v & 0xFF];
};

sizeOf.USHORT = constant(2);

// Convert a 16-bit signed integer to a list of 2 bytes.
encode.SHORT = function(v) {
    // Two's complement
    if (v >= LIMIT16) {
        v = -(2 * LIMIT16 - v);
    }

    return [(v >> 8) & 0xFF, v & 0xFF];
};

sizeOf.SHORT = constant(2);

// Convert a 24-bit unsigned integer to a list of 3 bytes.
encode.UINT24 = function(v) {
    return [(v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
};

sizeOf.UINT24 = constant(3);

// Convert a 32-bit unsigned integer to a list of 4 bytes.
encode.ULONG = function(v) {
    return [(v >> 24) & 0xFF, (v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
};

sizeOf.ULONG = constant(4);

// Convert a 32-bit unsigned integer to a list of 4 bytes.
encode.LONG = function(v) {
    // Two's complement
    if (v >= LIMIT32) {
        v = -(2 * LIMIT32 - v);
    }

    return [(v >> 24) & 0xFF, (v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
};

sizeOf.LONG = constant(4);

encode.FIXED = encode.ULONG;
sizeOf.FIXED = sizeOf.ULONG;

encode.FWORD = encode.SHORT;
sizeOf.FWORD = sizeOf.SHORT;

encode.UFWORD = encode.USHORT;
sizeOf.UFWORD = sizeOf.USHORT;

// FIXME Implement LONGDATETIME
encode.LONGDATETIME = function() {
    return [0, 0, 0, 0, 0, 0, 0, 0];
};

sizeOf.LONGDATETIME = constant(8);

// Convert a 4-char tag to a list of 4 bytes.
encode.TAG = function(v) {
    check.argument(v.length === 4, 'Tag should be exactly 4 ASCII characters.');
    return [v.charCodeAt(0),
            v.charCodeAt(1),
            v.charCodeAt(2),
            v.charCodeAt(3)];
};

sizeOf.TAG = constant(4);

// CFF data types ///////////////////////////////////////////////////////////

encode.Card8 = encode.BYTE;
sizeOf.Card8 = sizeOf.BYTE;

encode.Card16 = encode.USHORT;
sizeOf.Card16 = sizeOf.USHORT;

encode.OffSize = encode.BYTE;
sizeOf.OffSize = sizeOf.BYTE;

encode.SID = encode.USHORT;
sizeOf.SID = sizeOf.USHORT;

// Convert a numeric operand or charstring number to a variable-size list of bytes.
encode.NUMBER = function(v) {
    if (v >= -107 && v <= 107) {
        return [v + 139];
    } else if (v >= 108 && v <= 1131) {
        v = v - 108;
        return [(v >> 8) + 247, v & 0xFF];
    } else if (v >= -1131 && v <= -108) {
        v = -v - 108;
        return [(v >> 8) + 251, v & 0xFF];
    } else if (v >= -32768 && v <= 32767) {
        return encode.NUMBER16(v);
    } else {
        return encode.NUMBER32(v);
    }
};

sizeOf.NUMBER = function(v) {
    return encode.NUMBER(v).length;
};

// Convert a signed number between -32768 and +32767 to a three-byte value.
// This ensures we always use three bytes, but is not the most compact format.
encode.NUMBER16 = function(v) {
    return [28, (v >> 8) & 0xFF, v & 0xFF];
};

sizeOf.NUMBER16 = constant(3);

// Convert a signed number between -(2^31) and +(2^31-1) to a five-byte value.
// This is useful if you want to be sure you always use four bytes,
// at the expense of wasting a few bytes for smaller numbers.
encode.NUMBER32 = function(v) {
    return [29, (v >> 24) & 0xFF, (v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
};

sizeOf.NUMBER32 = constant(5);

encode.REAL = function(v) {
    var value = v.toString();

    // Some numbers use an epsilon to encode the value. (e.g. JavaScript will store 0.0000001 as 1e-7)
    // This code converts it back to a number without the epsilon.
    var m = /\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(value);
    if (m) {
        var epsilon = parseFloat('1e' + ((m[2] ? +m[2] : 0) + m[1].length));
        value = (Math.round(v * epsilon) / epsilon).toString();
    }

    var nibbles = '';
    var i;
    var ii;
    for (i = 0, ii = value.length; i < ii; i += 1) {
        var c = value[i];
        if (c === 'e') {
            nibbles += value[++i] === '-' ? 'c' : 'b';
        } else if (c === '.') {
            nibbles += 'a';
        } else if (c === '-') {
            nibbles += 'e';
        } else {
            nibbles += c;
        }
    }

    nibbles += (nibbles.length & 1) ? 'f' : 'ff';
    var out = [30];
    for (i = 0, ii = nibbles.length; i < ii; i += 2) {
        out.push(parseInt(nibbles.substr(i, 2), 16));
    }

    return out;
};

sizeOf.REAL = function(v) {
    return encode.REAL(v).length;
};

encode.NAME = encode.CHARARRAY;
sizeOf.NAME = sizeOf.CHARARRAY;

encode.STRING = encode.CHARARRAY;
sizeOf.STRING = sizeOf.CHARARRAY;

decode.UTF16 = function(data, offset, numBytes) {
    var codePoints = [];
    var numChars = numBytes / 2;
    for (var j = 0; j < numChars; j++, offset += 2) {
        codePoints[j] = data.getUint16(offset);
    }

    return String.fromCharCode.apply(null, codePoints);
};

// Convert a JavaScript string to UTF16-BE.
encode.UTF16 = function(v) {
    var b = [];
    for (var i = 0; i < v.length; i += 1) {
        var codepoint = v.charCodeAt(i);
        b.push((codepoint >> 8) & 0xFF);
        b.push(codepoint & 0xFF);
    }

    return b;
};

sizeOf.UTF16 = function(v) {
    return v.length * 2;
};

// Data for converting old eight-bit Macintosh encodings to Unicode.
// This representation is optimized for decoding; encoding is slower
// and needs more memory. The assumption is that all opentype.js users
// want to open fonts, but saving a font will be comperatively rare
// so it can be more expensive. Keyed by IANA character set name.
//
// Python script for generating these strings:
//
//     s = u''.join([chr(c).decode('mac_greek') for c in range(128, 256)])
//     print(s.encode('utf-8'))
var eightBitMacEncodings = {
    'x-mac-croatian':  // Python: 'mac_croatian'
        'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø' +
        '¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ',
    'x-mac-cyrillic':  // Python: 'mac_cyrillic'
        'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњ' +
        'јЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю',
    'x-mac-gaelic':
        // http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/GAELIC.TXT
        'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæø' +
        'ṁṖṗɼƒſṠ«»… ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ',
    'x-mac-greek':  // Python: 'mac_greek'
        'Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩ' +
        'άΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ\u00AD',
    'x-mac-icelandic':  // Python: 'mac_iceland'
        'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø' +
        '¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ',
    'x-mac-inuit':
        // http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/INUIT.TXT
        'ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗ' +
        'ᓘᓚᓛᓪᔨᔩᔪᔫᔭ… ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł',
    'x-mac-ce':  // Python: 'mac_latin2'
        'ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅ' +
        'ņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ',
    macintosh:  // Python: 'mac_roman'
        'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø' +
        '¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ',
    'x-mac-romanian':  // Python: 'mac_romanian'
        'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș' +
        '¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ',
    'x-mac-turkish':  // Python: 'mac_turkish'
        'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø' +
        '¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙˆ˜¯˘˙˚¸˝˛ˇ'
};

// Decodes an old-style Macintosh string. Returns either a Unicode JavaScript
// string, or 'undefined' if the encoding is unsupported. For example, we do
// not support Chinese, Japanese or Korean because these would need large
// mapping tables.
decode.MACSTRING = function(dataView, offset, dataLength, encoding) {
    var table = eightBitMacEncodings[encoding];
    if (table === undefined) {
        return undefined;
    }

    var result = '';
    for (var i = 0; i < dataLength; i++) {
        var c = dataView.getUint8(offset + i);
        // In all eight-bit Mac encodings, the characters 0x00..0x7F are
        // mapped to U+0000..U+007F; we only need to look up the others.
        if (c <= 0x7F) {
            result += String.fromCharCode(c);
        } else {
            result += table[c & 0x7F];
        }
    }

    return result;
};

// Helper function for encode.MACSTRING. Returns a dictionary for mapping
// Unicode character codes to their 8-bit MacOS equivalent. This table
// is not exactly a super cheap data structure, but we do not care because
// encoding Macintosh strings is only rarely needed in typical applications.
var macEncodingTableCache = typeof WeakMap === 'function' && new WeakMap();
var macEncodingCacheKeys;
var getMacEncodingTable = function(encoding) {
    // Since we use encoding as a cache key for WeakMap, it has to be
    // a String object and not a literal. And at least on NodeJS 2.10.1,
    // WeakMap requires that the same String instance is passed for cache hits.
    if (!macEncodingCacheKeys) {
        macEncodingCacheKeys = {};
        for (var e in eightBitMacEncodings) {
            /*jshint -W053 */  // Suppress "Do not use String as a constructor."
            macEncodingCacheKeys[e] = new String(e);
        }
    }

    var cacheKey = macEncodingCacheKeys[encoding];
    if (cacheKey === undefined) {
        return undefined;
    }

    // We can't do "if (cache.has(key)) {return cache.get(key)}" here:
    // since garbage collection may run at any time, it could also kick in
    // between the calls to cache.has() and cache.get(). In that case,
    // we would return 'undefined' even though we do support the encoding.
    if (macEncodingTableCache) {
        var cachedTable = macEncodingTableCache.get(cacheKey);
        if (cachedTable !== undefined) {
            return cachedTable;
        }
    }

    var decodingTable = eightBitMacEncodings[encoding];
    if (decodingTable === undefined) {
        return undefined;
    }

    var encodingTable = {};
    for (var i = 0; i < decodingTable.length; i++) {
        encodingTable[decodingTable.charCodeAt(i)] = i + 0x80;
    }

    if (macEncodingTableCache) {
        macEncodingTableCache.set(cacheKey, encodingTable);
    }

    return encodingTable;
};

// Encodes an old-style Macintosh string. Returns a byte array upon success.
// If the requested encoding is unsupported, or if the input string contains
// a character that cannot be expressed in the encoding, the function returns
// 'undefined'.
encode.MACSTRING = function(str, encoding) {
    var table = getMacEncodingTable(encoding);
    if (table === undefined) {
        return undefined;
    }

    var result = [];
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);

        // In all eight-bit Mac encodings, the characters 0x00..0x7F are
        // mapped to U+0000..U+007F; we only need to look up the others.
        if (c >= 0x80) {
            c = table[c];
            if (c === undefined) {
                // str contains a Unicode character that cannot be encoded
                // in the requested encoding.
                return undefined;
            }
        }

        result.push(c);
    }

    return result;
};

sizeOf.MACSTRING = function(str, encoding) {
    var b = encode.MACSTRING(str, encoding);
    if (b !== undefined) {
        return b.length;
    } else {
        return 0;
    }
};

// Convert a list of values to a CFF INDEX structure.
// The values should be objects containing name / type / value.
encode.INDEX = function(l) {
    var i;
    //var offset, offsets, offsetEncoder, encodedOffsets, encodedOffset, data,
    //    dataSize, i, v;
    // Because we have to know which data type to use to encode the offsets,
    // we have to go through the values twice: once to encode the data and
    // calculate the offets, then again to encode the offsets using the fitting data type.
    var offset = 1; // First offset is always 1.
    var offsets = [offset];
    var data = [];
    var dataSize = 0;
    for (i = 0; i < l.length; i += 1) {
        var v = encode.OBJECT(l[i]);
        Array.prototype.push.apply(data, v);
        dataSize += v.length;
        offset += v.length;
        offsets.push(offset);
    }

    if (data.length === 0) {
        return [0, 0];
    }

    var encodedOffsets = [];
    var offSize = (1 + Math.floor(Math.log(dataSize) / Math.log(2)) / 8) | 0;
    var offsetEncoder = [undefined, encode.BYTE, encode.USHORT, encode.UINT24, encode.ULONG][offSize];
    for (i = 0; i < offsets.length; i += 1) {
        var encodedOffset = offsetEncoder(offsets[i]);
        Array.prototype.push.apply(encodedOffsets, encodedOffset);
    }

    return Array.prototype.concat(encode.Card16(l.length),
                           encode.OffSize(offSize),
                           encodedOffsets,
                           data);
};

sizeOf.INDEX = function(v) {
    return encode.INDEX(v).length;
};

// Convert an object to a CFF DICT structure.
// The keys should be numeric.
// The values should be objects containing name / type / value.
encode.DICT = function(m) {
    var d = [];
    var keys = Object.keys(m);
    var length = keys.length;

    for (var i = 0; i < length; i += 1) {
        // Object.keys() return string keys, but our keys are always numeric.
        var k = parseInt(keys[i], 0);
        var v = m[k];
        // Value comes before the key.
        d = d.concat(encode.OPERAND(v.value, v.type));
        d = d.concat(encode.OPERATOR(k));
    }

    return d;
};

sizeOf.DICT = function(m) {
    return encode.DICT(m).length;
};

encode.OPERATOR = function(v) {
    if (v < 1200) {
        return [v];
    } else {
        return [12, v - 1200];
    }
};

encode.OPERAND = function(v, type) {
    var d = [];
    if (Array.isArray(type)) {
        for (var i = 0; i < type.length; i += 1) {
            check.argument(v.length === type.length, 'Not enough arguments given for type' + type);
            d = d.concat(encode.OPERAND(v[i], type[i]));
        }
    } else {
        if (type === 'SID') {
            d = d.concat(encode.NUMBER(v));
        } else if (type === 'offset') {
            // We make it easy for ourselves and always encode offsets as
            // 4 bytes. This makes offset calculation for the top dict easier.
            d = d.concat(encode.NUMBER32(v));
        } else if (type === 'number') {
            d = d.concat(encode.NUMBER(v));
        } else if (type === 'real') {
            d = d.concat(encode.REAL(v));
        } else {
            throw new Error('Unknown operand type ' + type);
            // FIXME Add support for booleans
        }
    }

    return d;
};

encode.OP = encode.BYTE;
sizeOf.OP = sizeOf.BYTE;

// memoize charstring encoding using WeakMap if available
var wmm = typeof WeakMap === 'function' && new WeakMap();
// Convert a list of CharString operations to bytes.
encode.CHARSTRING = function(ops) {
    // See encode.MACSTRING for why we don't do "if (wmm && wmm.has(ops))".
    if (wmm) {
        var cachedValue = wmm.get(ops);
        if (cachedValue !== undefined) {
            return cachedValue;
        }
    }

    var d = [];
    var length = ops.length;

    for (var i = 0; i < length; i += 1) {
        var op = ops[i];
        d = d.concat(encode[op.type](op.value));
    }

    if (wmm) {
        wmm.set(ops, d);
    }

    return d;
};

sizeOf.CHARSTRING = function(ops) {
    return encode.CHARSTRING(ops).length;
};

// Utility functions ////////////////////////////////////////////////////////

// Convert an object containing name / type / value to bytes.
encode.OBJECT = function(v) {
    var encodingFunction = encode[v.type];
    check.argument(encodingFunction !== undefined, 'No encoding function for type ' + v.type);
    return encodingFunction(v.value);
};

sizeOf.OBJECT = function(v) {
    var sizeOfFunction = sizeOf[v.type];
    check.argument(sizeOfFunction !== undefined, 'No sizeOf function for type ' + v.type);
    return sizeOfFunction(v.value);
};

// Convert a table object to bytes.
// A table contains a list of fields containing the metadata (name, type and default value).
// The table itself has the field values set as attributes.
encode.TABLE = function(table) {
    var d = [];
    var length = table.fields.length;

    for (var i = 0; i < length; i += 1) {
        var field = table.fields[i];
        var encodingFunction = encode[field.type];
        check.argument(encodingFunction !== undefined, 'No encoding function for field type ' + field.type);
        var value = table[field.name];
        if (value === undefined) {
            value = field.value;
        }

        var bytes = encodingFunction(value);
        d = d.concat(bytes);
    }

    return d;
};

sizeOf.TABLE = function(table) {
    var numBytes = 0;
    var length = table.fields.length;

    for (var i = 0; i < length; i += 1) {
        var field = table.fields[i];
        var sizeOfFunction = sizeOf[field.type];
        check.argument(sizeOfFunction !== undefined, 'No sizeOf function for field type ' + field.type);
        var value = table[field.name];
        if (value === undefined) {
            value = field.value;
        }

        numBytes += sizeOfFunction(value);
    }

    return numBytes;
};

// Merge in a list of bytes.
encode.LITERAL = function(v) {
    return v;
};

sizeOf.LITERAL = function(v) {
    return v.length;
};

exports.decode = decode;
exports.encode = encode;
exports.sizeOf = sizeOf;

},{"./check":2}],29:[function(require,module,exports){
'use strict';

exports.isBrowser = function() {
    return typeof window !== 'undefined';
};

exports.isNode = function() {
    return typeof window === 'undefined';
};

exports.nodeBufferToArrayBuffer = function(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }

    return ab;
};

exports.arrayBufferToNodeBuffer = function(ab) {
    var buffer = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }

    return buffer;
};

exports.checkArgument = function(expression, message) {
    if (!expression) {
        throw message;
    }
};

},{}]},{},[8])(8)
});