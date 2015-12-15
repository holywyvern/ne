window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60, new Date().getTime());
        };
})();
var ne;
(function (ne) {
    var scene;
    (function (scene) {
        var Scene = (function () {
            function Scene(manager) {
                this._eventManager = new ne.utils.EventManager(this);
                this._manager = manager;
                this._container = new ne.objects.Viewport(this.manager.game.rect);
                this.setup();
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
            Object.defineProperty(Scene.prototype, "game", {
                get: function () {
                    return this.manager.game;
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
            Object.defineProperty(Scene.prototype, "container", {
                get: function () {
                    return this._container;
                },
                enumerable: true,
                configurable: true
            });
            Scene.prototype.setup = function () {
            };
            Scene.prototype.load = function (loader) {
            };
            Scene.prototype.start = function (cache) {
            };
            Scene.prototype.destroy = function () {
            };
            Scene.prototype.update = function (delta) {
                this.container.update(delta);
            };
            Scene.prototype.render = function (gl) {
                this._container.render(gl);
            };
            return Scene;
        })();
        scene.Scene = Scene;
    })(scene = ne.scene || (ne.scene = {}));
})(ne || (ne = {}));
/// <reference path="./Scene.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ne;
(function (ne) {
    var scene;
    (function (scene) {
        var LoadScene = (function (_super) {
            __extends(LoadScene, _super);
            function LoadScene() {
                _super.apply(this, arguments);
            }
            return LoadScene;
        })(scene.Scene);
        scene.LoadScene = LoadScene;
    })(scene = ne.scene || (ne.scene = {}));
})(ne || (ne = {}));
var ne;
(function (ne) {
    (function (Mode) {
        Mode[Mode["WEBGL"] = 0] = "WEBGL";
        Mode[Mode["CANVAS2D"] = 1] = "CANVAS2D";
        Mode[Mode["AUTO"] = 2] = "AUTO";
    })(ne.Mode || (ne.Mode = {}));
    var Mode = ne.Mode;
})(ne || (ne = {}));
/// <reference path="./scene/LoadScene.ts" />
/// <reference path="./Mode.ts" />
var ne;
(function (ne) {
    var Game = (function () {
        function Game(_a) {
            var _b = _a.width, width = _b === void 0 ? 480 : _b, _c = _a.height, height = _c === void 0 ? 320 : _c, _d = _a.mode, mode = _d === void 0 ? ne.Mode.AUTO : _d, _e = _a.loadScene, loadScene = _e === void 0 ? ne.scene.LoadScene : _e;
            this.createRender({ width: width, height: height, mode: mode });
            this._sceneManager = new ne.scene.SceneManager(this, loadScene);
        }
        Game.prototype.createRender = function (options) {
            switch (options.mode) {
                case ne.Mode.CANVAS2D:
                    this._render = new ne.graphics.Canvas2DRender(options);
                    break;
                case ne.Mode.WEBGL:
                    this._render = new ne.graphics.WebGLRender(options);
                    break;
                case ne.Mode.AUTO:
                default:
                    this._autoDetectMode(options);
                    break;
            }
        };
        Game.prototype._autoDetectMode = function (options) {
            try {
                this._render = new ne.graphics.WebGLRender(options);
            }
            catch (e) {
                this._render = new ne.graphics.Canvas2DRender(options);
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
            this._time = timestamp;
            requestAnimationFrame(this._updateBind);
        };
        Object.defineProperty(Game.prototype, "view", {
            get: function () {
                return this._render.canvas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "rect", {
            get: function () {
                return new ne.graphics.Rect(0, 0, this.width, this.height);
            },
            enumerable: true,
            configurable: true
        });
        Game.prototype.attach = function (id) {
            var e = typeof id == 'string' ? document.getElementById(id) : id;
            e.appendChild(this.view);
        };
        Object.defineProperty(Game.prototype, "width", {
            get: function () {
                return this._render.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "height", {
            get: function () {
                return this._render.height;
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
    var objects;
    (function (objects) {
        var Drawable = (function () {
            function Drawable() {
                this._z = 0;
                this._parent = null;
                this.visible = true;
            }
            Object.defineProperty(Drawable.prototype, "z", {
                get: function () {
                    return this._z;
                },
                set: function (value) {
                    if (value !== this._z) {
                        this._z = value;
                        if (this._parent) {
                            this._parent.notifyChanges();
                        }
                    }
                    this._z = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Drawable.prototype, "parent", {
                get: function () {
                    return this._parent;
                },
                set: function (value) {
                    if (value !== this._parent) {
                        if (this._parent) {
                            this._parent.remove(this);
                            this._parent = null;
                        }
                        if (value) {
                            value.add(this);
                        }
                    }
                    this._parent = value;
                },
                enumerable: true,
                configurable: true
            });
            Drawable.prototype.update = function (delta) {
            };
            Drawable.prototype.render = function (render) {
            };
            return Drawable;
        })();
        objects.Drawable = Drawable;
    })(objects = ne.objects || (ne.objects = {}));
})(ne || (ne = {}));
/// <reference path="./Drawable.ts" />
var ne;
(function (ne) {
    var objects;
    (function (objects) {
        var DrawableContainer = (function (_super) {
            __extends(DrawableContainer, _super);
            function DrawableContainer() {
                _super.call(this);
                this._changed = false;
                this._children = [];
            }
            DrawableContainer.prototype.notifyChanges = function () {
                this._changed = true;
            };
            DrawableContainer.prototype.render = function (render) {
                this._checkZIndex();
                this._renderChildren(render);
            };
            DrawableContainer.prototype._checkZIndex = function () {
                if (this._changed) {
                    this._changed = false;
                    this._children.sort(function (a, b) { return a.z - b.z; });
                }
            };
            DrawableContainer.prototype._renderChildren = function (render) {
                for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                    var c = _a[_i];
                    c.render(render);
                }
            };
            DrawableContainer.prototype.remove = function (child) {
                var idx = this._children.indexOf(child);
                if (idx !== -1) {
                    this._children.splice(idx, 1);
                    child.parent = null;
                }
            };
            DrawableContainer.prototype.add = function (child) {
                var idx = this._children.indexOf(child);
                if (idx === -1) {
                    this._children.push(child);
                    this.notifyChanges();
                    child.parent = this;
                }
            };
            DrawableContainer.prototype.update = function (delta) {
                for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
                    var c = _a[_i];
                    c.update(delta);
                }
            };
            DrawableContainer.prototype.contains = function (child) {
                return this._children.indexOf(child) !== -1;
            };
            DrawableContainer.prototype.prepare = function (render) {
            };
            return DrawableContainer;
        })(objects.Drawable);
        objects.DrawableContainer = DrawableContainer;
    })(objects = ne.objects || (ne.objects = {}));
})(ne || (ne = {}));
/// <reference path="../Drawable.ts" />
var ne;
(function (ne) {
    var objects;
    (function (objects) {
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            function Sprite() {
                _super.call(this);
                this.filter = ne.filters.TextureFilter.INSTANCE;
                this.texture = null;
                this._position = new ne.math.Vector2();
                this.frame = new ne.graphics.Rect();
            }
            Object.defineProperty(Sprite.prototype, "position", {
                get: function () {
                    return this._position;
                },
                enumerable: true,
                configurable: true
            });
            Sprite.prototype.render = function (render) {
                if (!this.isDrawable())
                    return;
                this._useFilter(render);
                this.parent.prepare(render);
                this.texture.bind(render.gl, this.frame);
            };
            Sprite.prototype._useFilter = function (render) {
                if (this.filter) {
                    this.filter.use(render.gl);
                }
            };
            Sprite.prototype.isDrawable = function () {
                return this.visible && (this.texture !== null);
            };
            return Sprite;
        })(objects.Drawable);
        objects.Sprite = Sprite;
    })(objects = ne.objects || (ne.objects = {}));
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
            Texture.prototype.bind = function (gl, rect) {
                this.check(gl);
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
                this._glTexture = gl.createTexture();
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
/// <reference path="./objects/Drawable.ts" />
/// <reference path="./objects/DrawableContainer.ts" />
/// <reference path="./objects/2d/Sprite.ts" />
/// <reference path="./scene/Scene.ts"/>
/// <reference path="./graphics/Texture.ts"/>
var ne;
(function (ne) {
    ne.VERSION = "0.1.0";
    // Shortcuts to most frequent elements
    ne.Drawable = ne.objects.Drawable;
    ne.DrawableContainer = ne.objects.DrawableContainer;
    ne.Viewport = ne.objects.Viewport;
    ne.Sprite = ne.objects.Sprite;
    ne.Scene = ne.scene.Scene;
    ne.Texture = ne.graphics.Texture;
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
/// <reference path="../graphics/Filter.ts" />
var ne;
(function (ne) {
    var filters;
    (function (filters) {
        var instance;
        var TextureFilter = (function (_super) {
            __extends(TextureFilter, _super);
            function TextureFilter() {
                _super.call(this);
                this.vertex.src = 'gl_Position  = u_matrix * a_position;';
                this.fragment.src = 'gl_FragColor = vec4(1, 0, 0, 1);';
            }
            TextureFilter.prototype.makeAttributes = function () {
                return {
                    a_position: 'vec4'
                };
            };
            TextureFilter.prototype.makeUniforms = function () {
                return {
                    u_matrix: 'mat4'
                };
            };
            Object.defineProperty(TextureFilter, "INSTANCE", {
                get: function () {
                    if (!instance) {
                        instance = new TextureFilter();
                    }
                    return instance;
                },
                enumerable: true,
                configurable: true
            });
            return TextureFilter;
        })(ne.graphics.Filter);
        filters.TextureFilter = TextureFilter;
    })(filters = ne.filters || (ne.filters = {}));
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
            function Canvas2DRender(options) {
                _super.call(this, options.width, options.height);
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
                    var info = gl.getShaderInfoLog(this._glShader);
                    var source = this.generatedSource;
                    var err = "Could not compile shader: " + info + "\nSource:\n" + source;
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
            function WebGLRender(options) {
                _super.call(this, options.width, options.height);
                this._createContext();
                this._createBuffer();
            }
            WebGLRender.prototype._createContext = function () {
                this._gl = this.canvas.getContext('webgl');
                if (!this._gl) {
                    this._gl = this.canvas.getContext('experimental-webgl');
                }
                if (!this._gl) {
                    throw new Error("Your browser doesn't support WebGL.");
                }
            };
            WebGLRender.prototype._createBuffer = function () {
                this._buffer = this.gl.createBuffer();
            };
            Object.defineProperty(WebGLRender.prototype, "gl", {
                get: function () {
                    return this._gl;
                },
                enumerable: true,
                configurable: true
            });
            WebGLRender.prototype.render = function (object) {
                object.render(this);
            };
            WebGLRender.prototype.prepareRectBuffer = function (rect) {
                var x1 = rect.x;
                var x2 = rect.x + rect.width;
                var y1 = rect.y;
                var y2 = rect.y + rect.height;
                var data = new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]);
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._buffer);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
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
    (function (scene_1) {
        var SceneManager = (function () {
            function SceneManager(game, loadScene) {
                if (loadScene === void 0) { loadScene = null; }
                this._sceneStack = [null];
                this._lastScene = null;
                this._instance = null;
                this._game = game;
                this.setupLoadScene(loadScene);
            }
            SceneManager.prototype.setupLoadScene = function (scene) {
                var _this = this;
                this._isReady = false;
                var loader = new ne.utils.Loader();
                this._loadScene = new (scene || scene_1.Scene)(this);
                this._instance = this._loadScene;
                this._loadScene.load(loader);
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
            Object.defineProperty(SceneManager.prototype, "game", {
                get: function () {
                    return this._game;
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
                    _pixmapCache[url] = ne.graphics.Pixmap.fromImage(img);
                    _this._checkLoad();
                };
                img.onerror = function () {
                    _pixmapCache[url] = null;
                    console.error("Could not load image: '" + url + "'");
                    _this._checkLoad();
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
/// <reference path="../DrawableContainer.ts" />
/// <reference path="../../graphics/Rect.ts" />
var ne;
(function (ne) {
    var objects;
    (function (objects) {
        var Viewport = (function (_super) {
            __extends(Viewport, _super);
            function Viewport(rect) {
                if (rect === void 0) { rect = null; }
                _super.call(this);
                this.rect = rect || new ne.graphics.Rect();
            }
            Viewport.prototype.prepare = function (render) {
                render.prepareRectBuffer(this.rect);
            };
            return Viewport;
        })(objects.DrawableContainer);
        objects.Viewport = Viewport;
    })(objects = ne.objects || (ne.objects = {}));
})(ne || (ne = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbHlmaWxsLnRzIiwibmUvc2NlbmUvU2NlbmUudHMiLCJuZS9zY2VuZS9Mb2FkU2NlbmUudHMiLCJuZS9Nb2RlLnRzIiwibmUvR2FtZS50cyIsIm5lL29iamVjdHMvRHJhd2FibGUudHMiLCJuZS9vYmplY3RzL0RyYXdhYmxlQ29udGFpbmVyLnRzIiwibmUvb2JqZWN0cy8yZC9TcHJpdGUudHMiLCJuZS9ncmFwaGljcy9UZXh0dXJlLnRzIiwibmUvbmUudHMiLCJuZS9hdWRpby9CdWZmZXIudHMiLCJuZS9hdWRpby9MZWdhY3lCdWZmZXIudHMiLCJuZS9hdWRpby9TdHJlYW0udHMiLCJuZS9hdWRpby9MZWdhY3lTdHJlYW0udHMiLCJuZS9hdWRpby9XZWJBdWRpb0J1ZmZlci50cyIsIm5lL2F1ZGlvL1dlYkF1ZGlvU3RyZWFtLnRzIiwibmUvZ3JhcGhpY3MvRmlsdGVyLnRzIiwibmUvZmlsdGVycy9UZXh0dXJlRmlsdGVyLnRzIiwibmUvZ3JhcGhpY3MvUmVuZGVyLnRzIiwibmUvZ3JhcGhpY3MvQ2FudmFzMkRSZW5kZXIudHMiLCJuZS9tYXRoL2NvbWJpbmF0b3IudHMiLCJuZS9tYXRoL3ZlY3RvckZpZWxkcy50cyIsIm5lL21hdGgvVmVjdG9yLnRzIiwibmUvbWF0aC9WZWN0b3IyLnRzIiwibmUvbWF0aC9WZWN0b3IzLnRzIiwibmUvbWF0aC9WZWN0b3I0LnRzIiwibmUvZ3JhcGhpY3MvQ29sb3JCYXNlLnRzIiwibmUvZ3JhcGhpY3MvQ29sb3IudHMiLCJuZS9ncmFwaGljcy9Gb250LnRzIiwibmUvZ3JhcGhpY3MvR3JhZGllbnQudHMiLCJuZS9ncmFwaGljcy9MaW5lYXJHcmFkaWVudC50cyIsIm5lL2dyYXBoaWNzL1BhdHRlcm4udHMiLCJuZS9ncmFwaGljcy9QaXhtYXAudHMiLCJuZS9ncmFwaGljcy9Qb2ludC50cyIsIm5lL2dyYXBoaWNzL1Bvc2l0aW9uLnRzIiwibmUvZ3JhcGhpY3MvUmFkaWFsR3JhZGllbnQudHMiLCJuZS9ncmFwaGljcy9SZWN0LnRzIiwibmUvZ3JhcGhpY3MvU2hhZGVyLnRzIiwibmUvZ3JhcGhpY3MvVG9uZS50cyIsIm5lL2dyYXBoaWNzL1dlYkdMUmVuZGVyLnRzIiwibmUvbWF0aC9NYXRyaXgyLnRzIiwibmUvbWF0aC9NYXRyaXgzLnRzIiwibmUvbWF0aC9NYXRyaXg0LnRzIiwibmUvbWF0aC9wZXJtdXRhdG9yLnRzIiwibmUvc2NlbmUvQ2FtZXJhLnRzIiwibmUvc2NlbmUvU2NlbmVNYW5hZ2VyLnRzIiwibmUvdXRpbHMvRXZlbnRNYW5hZ2VyLnRzIiwibmUvdXRpbHMvTG9hZGVyLnRzIiwibmUvb2JqZWN0cy8yZC9WaWV3cG9ydC50cyJdLCJuYW1lcyI6WyJuZSIsIm5lLnNjZW5lIiwibmUuc2NlbmUuU2NlbmUiLCJuZS5zY2VuZS5TY2VuZS5jb25zdHJ1Y3RvciIsIm5lLnNjZW5lLlNjZW5lLmRlZmF1bHRFdmVudCIsIm5lLnNjZW5lLlNjZW5lLm1hbmFnZXIiLCJuZS5zY2VuZS5TY2VuZS5nYW1lIiwibmUuc2NlbmUuU2NlbmUuZXZlbnRzIiwibmUuc2NlbmUuU2NlbmUuY29udGFpbmVyIiwibmUuc2NlbmUuU2NlbmUuc2V0dXAiLCJuZS5zY2VuZS5TY2VuZS5sb2FkIiwibmUuc2NlbmUuU2NlbmUuc3RhcnQiLCJuZS5zY2VuZS5TY2VuZS5kZXN0cm95IiwibmUuc2NlbmUuU2NlbmUudXBkYXRlIiwibmUuc2NlbmUuU2NlbmUucmVuZGVyIiwibmUuc2NlbmUuTG9hZFNjZW5lIiwibmUuc2NlbmUuTG9hZFNjZW5lLmNvbnN0cnVjdG9yIiwibmUuTW9kZSIsIm5lLkdhbWUiLCJuZS5HYW1lLmNvbnN0cnVjdG9yIiwibmUuR2FtZS5jcmVhdGVSZW5kZXIiLCJuZS5HYW1lLl9hdXRvRGV0ZWN0TW9kZSIsIm5lLkdhbWUuc3RhcnQiLCJuZS5HYW1lLnVwZGF0ZSIsIm5lLkdhbWUudmlldyIsIm5lLkdhbWUucmVjdCIsIm5lLkdhbWUuYXR0YWNoIiwibmUuR2FtZS53aWR0aCIsIm5lLkdhbWUuaGVpZ2h0IiwibmUub2JqZWN0cyIsIm5lLm9iamVjdHMuRHJhd2FibGUiLCJuZS5vYmplY3RzLkRyYXdhYmxlLmNvbnN0cnVjdG9yIiwibmUub2JqZWN0cy5EcmF3YWJsZS56IiwibmUub2JqZWN0cy5EcmF3YWJsZS5wYXJlbnQiLCJuZS5vYmplY3RzLkRyYXdhYmxlLnVwZGF0ZSIsIm5lLm9iamVjdHMuRHJhd2FibGUucmVuZGVyIiwibmUub2JqZWN0cy5EcmF3YWJsZUNvbnRhaW5lciIsIm5lLm9iamVjdHMuRHJhd2FibGVDb250YWluZXIuY29uc3RydWN0b3IiLCJuZS5vYmplY3RzLkRyYXdhYmxlQ29udGFpbmVyLm5vdGlmeUNoYW5nZXMiLCJuZS5vYmplY3RzLkRyYXdhYmxlQ29udGFpbmVyLnJlbmRlciIsIm5lLm9iamVjdHMuRHJhd2FibGVDb250YWluZXIuX2NoZWNrWkluZGV4IiwibmUub2JqZWN0cy5EcmF3YWJsZUNvbnRhaW5lci5fcmVuZGVyQ2hpbGRyZW4iLCJuZS5vYmplY3RzLkRyYXdhYmxlQ29udGFpbmVyLnJlbW92ZSIsIm5lLm9iamVjdHMuRHJhd2FibGVDb250YWluZXIuYWRkIiwibmUub2JqZWN0cy5EcmF3YWJsZUNvbnRhaW5lci51cGRhdGUiLCJuZS5vYmplY3RzLkRyYXdhYmxlQ29udGFpbmVyLmNvbnRhaW5zIiwibmUub2JqZWN0cy5EcmF3YWJsZUNvbnRhaW5lci5wcmVwYXJlIiwibmUub2JqZWN0cy5TcHJpdGUiLCJuZS5vYmplY3RzLlNwcml0ZS5jb25zdHJ1Y3RvciIsIm5lLm9iamVjdHMuU3ByaXRlLnBvc2l0aW9uIiwibmUub2JqZWN0cy5TcHJpdGUucmVuZGVyIiwibmUub2JqZWN0cy5TcHJpdGUuX3VzZUZpbHRlciIsIm5lLm9iamVjdHMuU3ByaXRlLmlzRHJhd2FibGUiLCJuZS5ncmFwaGljcyIsIm5lLmdyYXBoaWNzLlRleHR1cmUiLCJuZS5ncmFwaGljcy5UZXh0dXJlLmNvbnN0cnVjdG9yIiwibmUuZ3JhcGhpY3MuVGV4dHVyZS5kZXN0cm95IiwibmUuZ3JhcGhpY3MuVGV4dHVyZS5fZGVzdHJveUdsVGV4dHVyZSIsIm5lLmdyYXBoaWNzLlRleHR1cmUuX2Rlc3Ryb3lHbEJ1ZmZlciIsIm5lLmdyYXBoaWNzLlRleHR1cmUuZ2VuZXJhdGUiLCJuZS5ncmFwaGljcy5UZXh0dXJlLnVwZGF0ZSIsIm5lLmdyYXBoaWNzLlRleHR1cmUuY2hlY2siLCJuZS5ncmFwaGljcy5UZXh0dXJlLmJpbmQiLCJuZS5ncmFwaGljcy5UZXh0dXJlLmJpbmRBbGwiLCJuZS5ncmFwaGljcy5UZXh0dXJlLl9nZW5lcmF0ZUdsVGV4dHVyZSIsIm5lLmdyYXBoaWNzLlRleHR1cmUuX2dlbmVyYXRlR2xCdWZmZXIiLCJuZS5ncmFwaGljcy5UZXh0dXJlLl9iaW5kR2xCdWZmZXIiLCJuZS5ncmFwaGljcy5UZXh0dXJlLl9iaW5kR2xUZXh0dXJlIiwibmUuZ3JhcGhpY3MuVGV4dHVyZS5jYWxjdWxhdGVSZWN0IiwibmUuZ3JhcGhpY3MuVGV4dHVyZS53aWR0aCIsIm5lLmdyYXBoaWNzLlRleHR1cmUuaGVpZ2h0IiwibmUuYXVkaW8iLCJuZS5hdWRpby5CdWZmZXIiLCJuZS5hdWRpby5CdWZmZXIuY29uc3RydWN0b3IiLCJuZS5hdWRpby5CdWZmZXIuc3RyZWFtIiwibmUuYXVkaW8uQnVmZmVyLmxlbmd0aCIsIm5lLmF1ZGlvLkxlZ2FjeUJ1ZmZlciIsIm5lLmF1ZGlvLkxlZ2FjeUJ1ZmZlci5jb25zdHJ1Y3RvciIsIm5lLmF1ZGlvLkxlZ2FjeUJ1ZmZlci5zdHJlYW0iLCJuZS5hdWRpby5MZWdhY3lCdWZmZXIubGVuZ3RoIiwibmUuYXVkaW8uTGVnYWN5QnVmZmVyLnNyYyIsIm5lLmF1ZGlvLlN0cmVhbSIsIm5lLmF1ZGlvLlN0cmVhbS5jb25zdHJ1Y3RvciIsIm5lLmF1ZGlvLlN0cmVhbS5wbGF5IiwibmUuYXVkaW8uU3RyZWFtLnN0b3AiLCJuZS5hdWRpby5TdHJlYW0ucGF1c2UiLCJuZS5hdWRpby5TdHJlYW0ucG9zaXRpb24iLCJuZS5hdWRpby5TdHJlYW0ubG9vcFN0YXJ0IiwibmUuYXVkaW8uU3RyZWFtLmxvb3BFbmQiLCJuZS5hdWRpby5TdHJlYW0ucGxheWJhY2tSYXRlIiwibmUuYXVkaW8uTGVnYWN5U3RyZWFtIiwibmUuYXVkaW8uTGVnYWN5U3RyZWFtLmNvbnN0cnVjdG9yIiwibmUuYXVkaW8uTGVnYWN5U3RyZWFtLnBsYXkiLCJuZS5hdWRpby5MZWdhY3lTdHJlYW0uc3RvcCIsIm5lLmF1ZGlvLkxlZ2FjeVN0cmVhbS5wYXVzZSIsIm5lLmF1ZGlvLkxlZ2FjeVN0cmVhbS5wb3NpdGlvbiIsIm5lLmF1ZGlvLkxlZ2FjeVN0cmVhbS5wbGF5YmFja1JhdGUiLCJuZS5hdWRpby5XZWJBdWRpb0J1ZmZlciIsIm5lLmF1ZGlvLldlYkF1ZGlvQnVmZmVyLmNvbnN0cnVjdG9yIiwibmUuYXVkaW8uV2ViQXVkaW9CdWZmZXIuc3JjIiwibmUuYXVkaW8uV2ViQXVkaW9CdWZmZXIuc3RyZWFtIiwibmUuYXVkaW8uV2ViQXVkaW9CdWZmZXIubGVuZ3RoIiwibmUuYXVkaW8uV2ViQXVkaW9TdHJlYW0iLCJuZS5hdWRpby5XZWJBdWRpb1N0cmVhbS5jb25zdHJ1Y3RvciIsIm5lLmF1ZGlvLldlYkF1ZGlvU3RyZWFtLnBsYXkiLCJuZS5hdWRpby5XZWJBdWRpb1N0cmVhbS5fY3JlYXRlU291cmNlIiwibmUuYXVkaW8uV2ViQXVkaW9TdHJlYW0uc3RvcCIsIm5lLmF1ZGlvLldlYkF1ZGlvU3RyZWFtLnBhdXNlIiwibmUuYXVkaW8uV2ViQXVkaW9TdHJlYW0uX3NldEN1cnJlbnRQb3NpdGlvbiIsIm5lLmF1ZGlvLldlYkF1ZGlvU3RyZWFtLmNvbnRleHQiLCJuZS5hdWRpby5XZWJBdWRpb1N0cmVhbS5wb3NpdGlvbiIsIm5lLmF1ZGlvLldlYkF1ZGlvU3RyZWFtLmxvb3BTdGFydCIsIm5lLmF1ZGlvLldlYkF1ZGlvU3RyZWFtLmxvb3BFbmQiLCJuZS5hdWRpby5XZWJBdWRpb1N0cmVhbS5wbGF5YmFja1JhdGUiLCJuZS5ncmFwaGljcy5GaWx0ZXIiLCJuZS5ncmFwaGljcy5GaWx0ZXIuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5GaWx0ZXIudmVydGV4IiwibmUuZ3JhcGhpY3MuRmlsdGVyLmZyYWdtZW50IiwibmUuZ3JhcGhpY3MuRmlsdGVyLmRlc3Ryb3kiLCJuZS5ncmFwaGljcy5GaWx0ZXIubWFrZUF0dHJpYnV0ZXMiLCJuZS5ncmFwaGljcy5GaWx0ZXIubWFrZVVuaWZvcm1zIiwibmUuZ3JhcGhpY3MuRmlsdGVyLm1ha2VWYXJ5aW5nIiwibmUuZ3JhcGhpY3MuRmlsdGVyLnVzZSIsIm5lLmdyYXBoaWNzLkZpbHRlci5fY29tcGlsZSIsIm5lLmdyYXBoaWNzLkZpbHRlci5fbWFrZVByb2dyYW0iLCJuZS5ncmFwaGljcy5GaWx0ZXIuX2dldExvY2F0aW9ucyIsIm5lLmdyYXBoaWNzLkZpbHRlci5fZ2V0VW5pZm9ybUxvY2F0aW9ucyIsIm5lLmdyYXBoaWNzLkZpbHRlci5fZ2V0QXR0cmlidXRlTG9jYXRpb25zIiwibmUuZ3JhcGhpY3MuRmlsdGVyLl9jaGVja1Byb2dyYW0iLCJuZS5ncmFwaGljcy5GaWx0ZXIuX2Zvcm1hdFVuaWZvcm1zIiwibmUuZ3JhcGhpY3MuRmlsdGVyLnVuaWZvcm1zIiwibmUuZ3JhcGhpY3MuRmlsdGVyLmF0dHJpYnV0ZXMiLCJuZS5ncmFwaGljcy5GaWx0ZXIudmFyeWluZyIsIm5lLmdyYXBoaWNzLkZpbHRlci5udW1iZXIiLCJuZS5ncmFwaGljcy5GaWx0ZXIuZmxvYXQiLCJuZS5ncmFwaGljcy5GaWx0ZXIubWF0MiIsIm5lLmdyYXBoaWNzLkZpbHRlci5tYXQzIiwibmUuZ3JhcGhpY3MuRmlsdGVyLm1hdDQiLCJuZS5ncmFwaGljcy5GaWx0ZXIudmVjMiIsIm5lLmdyYXBoaWNzLkZpbHRlci52ZWMzIiwibmUuZ3JhcGhpY3MuRmlsdGVyLnZlYzQiLCJuZS5ncmFwaGljcy5GaWx0ZXIuY29sb3IiLCJuZS5ncmFwaGljcy5GaWx0ZXIucmVjdCIsIm5lLmdyYXBoaWNzLkZpbHRlci5wb2ludCIsIm5lLmdyYXBoaWNzLkZpbHRlci5zYW1wbGVyMmQiLCJuZS5ncmFwaGljcy5GaWx0ZXIudGV4dHVyZSIsIm5lLmZpbHRlcnMiLCJuZS5maWx0ZXJzLlRleHR1cmVGaWx0ZXIiLCJuZS5maWx0ZXJzLlRleHR1cmVGaWx0ZXIuY29uc3RydWN0b3IiLCJuZS5maWx0ZXJzLlRleHR1cmVGaWx0ZXIubWFrZUF0dHJpYnV0ZXMiLCJuZS5maWx0ZXJzLlRleHR1cmVGaWx0ZXIubWFrZVVuaWZvcm1zIiwibmUuZmlsdGVycy5UZXh0dXJlRmlsdGVyLklOU1RBTkNFIiwibmUuZ3JhcGhpY3MuUmVuZGVyIiwibmUuZ3JhcGhpY3MuUmVuZGVyLmNvbnN0cnVjdG9yIiwibmUuZ3JhcGhpY3MuUmVuZGVyLmNhbnZhcyIsIm5lLmdyYXBoaWNzLlJlbmRlci53aWR0aCIsIm5lLmdyYXBoaWNzLlJlbmRlci5oZWlnaHQiLCJuZS5ncmFwaGljcy5SZW5kZXIucmVzaXplIiwibmUuZ3JhcGhpY3MuUmVuZGVyLnJlbmRlciIsIm5lLmdyYXBoaWNzLkNhbnZhczJEUmVuZGVyIiwibmUuZ3JhcGhpY3MuQ2FudmFzMkRSZW5kZXIuY29uc3RydWN0b3IiLCJuZS5tYXRoIiwibmUubWF0aC5jb21iaW5hdG9yIiwibmUubWF0aC5tZW1vaXplZCIsIm5lLm1hdGgucmFuZ2UiLCJuZS5tYXRoLm1ha2VQcm9wZXJ0eUFjY2Vzc29yIiwibmUubWF0aC5tYWtlUHJvcGVydGllc09mU2l6ZSIsIm5lLm1hdGgubWFrZVByb3BlcnRpZXMiLCJuZS5tYXRoLnZlY3RvckZpZWxkcyIsIm5lLm1hdGguVmVjdG9yIiwibmUubWF0aC5WZWN0b3IuY29uc3RydWN0b3IiLCJuZS5tYXRoLlZlY3Rvci5sZW5ndGgiLCJuZS5tYXRoLlZlY3Rvci5kYXRhIiwibmUubWF0aC5WZWN0b3JbMF0iLCJuZS5tYXRoLlZlY3RvclsxXSIsIm5lLm1hdGguVmVjdG9yWzJdIiwibmUubWF0aC5WZWN0b3JbM10iLCJuZS5tYXRoLlZlY3Rvci54IiwibmUubWF0aC5WZWN0b3IuciIsIm5lLm1hdGguVmVjdG9yLnkiLCJuZS5tYXRoLlZlY3Rvci5nIiwibmUubWF0aC5WZWN0b3IueiIsIm5lLm1hdGguVmVjdG9yLmIiLCJuZS5tYXRoLlZlY3Rvci53IiwibmUubWF0aC5WZWN0b3IuYSIsIm5lLm1hdGguVmVjdG9yLnMiLCJuZS5tYXRoLlZlY3Rvci51IiwibmUubWF0aC5WZWN0b3IudCIsIm5lLm1hdGguVmVjdG9yLnYiLCJuZS5tYXRoLlZlY3Rvci5wIiwibmUubWF0aC5WZWN0b3IucSIsIm5lLm1hdGguVmVjdG9yMiIsIm5lLm1hdGguVmVjdG9yMi5jb25zdHJ1Y3RvciIsIm5lLm1hdGguVmVjdG9yMi5jbG9uZSIsIm5lLm1hdGguVmVjdG9yMi5jb3B5RnJvbSIsIm5lLm1hdGguVmVjdG9yMi5jb3B5VG8iLCJuZS5tYXRoLlZlY3RvcjIuYWRkIiwibmUubWF0aC5WZWN0b3IyLnN1YiIsIm5lLm1hdGguVmVjdG9yMi5tdWwiLCJuZS5tYXRoLlZlY3RvcjIuZGl2IiwibmUubWF0aC5WZWN0b3IyLm1vZCIsIm5lLm1hdGguVmVjdG9yMi5zZXQiLCJuZS5tYXRoLlZlY3RvcjIubm9ybWFsaXplIiwibmUubWF0aC5WZWN0b3IzIiwibmUubWF0aC5WZWN0b3IzLmNvbnN0cnVjdG9yIiwibmUubWF0aC5WZWN0b3IzLmxlbmd0aCIsIm5lLm1hdGguVmVjdG9yMy5jbG9uZSIsIm5lLm1hdGguVmVjdG9yM1syXSIsIm5lLm1hdGguVmVjdG9yMy5zZXQiLCJuZS5tYXRoLlZlY3RvcjMuY3Jvc3MiLCJuZS5tYXRoLlZlY3RvcjQiLCJuZS5tYXRoLlZlY3RvcjQuY29uc3RydWN0b3IiLCJuZS5tYXRoLlZlY3RvcjQubGVuZ3RoIiwibmUubWF0aC5WZWN0b3I0LmNsb25lIiwibmUubWF0aC5WZWN0b3I0WzNdIiwibmUubWF0aC5WZWN0b3I0LnNldCIsIm5lLmdyYXBoaWNzLkNvbG9yQmFzZSIsIm5lLmdyYXBoaWNzLkNvbG9yQmFzZS5jb25zdHJ1Y3RvciIsIm5lLmdyYXBoaWNzLkNvbG9yQmFzZVswXSIsIm5lLmdyYXBoaWNzLkNvbG9yQmFzZVsxXSIsIm5lLmdyYXBoaWNzLkNvbG9yQmFzZVsyXSIsIm5lLmdyYXBoaWNzLkNvbG9yQmFzZVszXSIsIm5lLmdyYXBoaWNzLkNvbG9yQmFzZS5yZWQiLCJuZS5ncmFwaGljcy5Db2xvckJhc2UuZ3JlZW4iLCJuZS5ncmFwaGljcy5Db2xvckJhc2UuYmx1ZSIsIm5lLmdyYXBoaWNzLkNvbG9yQmFzZS5hbHBoYSIsIm5lLmdyYXBoaWNzLkNvbG9yQmFzZS5odWUiLCJuZS5ncmFwaGljcy5Db2xvckJhc2Uuc2F0dXJhdGlvbiIsIm5lLmdyYXBoaWNzLkNvbG9yQmFzZS5sdW1pbmFuY2UiLCJuZS5ncmFwaGljcy5Db2xvckJhc2UudG9Ic2xhIiwibmUuZ3JhcGhpY3MuQ29sb3JCYXNlLnRvSHNsIiwibmUuZ3JhcGhpY3MuQ29sb3IiLCJuZS5ncmFwaGljcy5Db2xvci5jb25zdHJ1Y3RvciIsIm5lLmdyYXBoaWNzLkNvbG9yLl9odWUycmdiIiwibmUuZ3JhcGhpY3MuQ29sb3IuX2hzbFRvUmdiIiwibmUuZ3JhcGhpY3MuQ29sb3IuZnJvbVJnYmEiLCJuZS5ncmFwaGljcy5Db2xvci5mcm9tUmdiIiwibmUuZ3JhcGhpY3MuQ29sb3IuZnJvbUFyZ2IiLCJuZS5ncmFwaGljcy5Db2xvci5mcm9tSHNsYSIsIm5lLmdyYXBoaWNzLkNvbG9yLmZyb21Ic2wiLCJuZS5ncmFwaGljcy5Db2xvci5jbG9uZSIsIm5lLmdyYXBoaWNzLkNvbG9yLmNvbXBsZW1lbnQiLCJuZS5ncmFwaGljcy5Db2xvci50b0NzcyIsIm5lLmdyYXBoaWNzLkNvbG9yLnRvU3R5bGUiLCJuZS5ncmFwaGljcy5Db2xvci50b0FyZ2IiLCJuZS5ncmFwaGljcy5Db2xvci50b1JnYmEiLCJuZS5ncmFwaGljcy5Db2xvci50b1JnYiIsIm5lLmdyYXBoaWNzLkNvbG9yLmdyYXlzY2FsZSIsIm5lLmdyYXBoaWNzLkNvbG9yLmF2ZXJhZ2UiLCJuZS5ncmFwaGljcy5Db2xvci5saWdodG5lc3NBdmVyYWdlIiwibmUuZ3JhcGhpY3MuQ29sb3IuaW52ZXJ0IiwibmUuZ3JhcGhpY3MuQ29sb3IuV0hJVEUiLCJuZS5ncmFwaGljcy5Db2xvci5CTEFDSyIsIm5lLmdyYXBoaWNzLkNvbG9yLlJFRCIsIm5lLmdyYXBoaWNzLkNvbG9yLkdSRUVOIiwibmUuZ3JhcGhpY3MuQ29sb3IuQkxVRSIsIm5lLmdyYXBoaWNzLkNvbG9yLllFTExPVyIsIm5lLmdyYXBoaWNzLkNvbG9yLk1BR0VOVEEiLCJuZS5ncmFwaGljcy5Db2xvci5DWUFOIiwibmUuZ3JhcGhpY3MuQ29sb3IuR1JBWSIsIm5lLmdyYXBoaWNzLkNvbG9yLkRBUktfR1JBWSIsIm5lLmdyYXBoaWNzLkNvbG9yLkxJR0hUX0dSQVkiLCJuZS5ncmFwaGljcy5Db2xvci5PUkFOR0UiLCJuZS5ncmFwaGljcy5Db2xvci5CUk9XTiIsIm5lLmdyYXBoaWNzLkNvbG9yLkxJTUUiLCJuZS5ncmFwaGljcy5Db2xvci5MSUdIVF9CTFVFIiwibmUuZ3JhcGhpY3MuQ29sb3IuUElOSyIsIm5lLmdyYXBoaWNzLkNvbG9yLlRSQU5TUEFSRU5UIiwibmUuZ3JhcGhpY3MuQ29sb3IuUkFORE9NIiwibmUuZ3JhcGhpY3MuRm9udCIsIm5lLmdyYXBoaWNzLkZvbnQuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5Gb250LmZhbWlseSIsIm5lLmdyYXBoaWNzLkdyYWRpZW50IiwibmUuZ3JhcGhpY3MuR3JhZGllbnQuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5HcmFkaWVudC5fc3RvcHMiLCJuZS5ncmFwaGljcy5HcmFkaWVudC5hZGRDb2xvclN0b3AiLCJuZS5ncmFwaGljcy5HcmFkaWVudC50b1N0eWxlIiwibmUuZ3JhcGhpY3MuR3JhZGllbnQuY3JlYXRlR3JhZGllbnQiLCJuZS5ncmFwaGljcy5MaW5lYXJHcmFkaWVudCIsIm5lLmdyYXBoaWNzLkxpbmVhckdyYWRpZW50LmNvbnN0cnVjdG9yIiwibmUuZ3JhcGhpY3MuTGluZWFyR3JhZGllbnQuY3JlYXRlR3JhZGllbnQiLCJuZS5ncmFwaGljcy5QYXR0ZXJuUmVwZWF0IiwibmUuZ3JhcGhpY3MuUGF0dGVybiIsIm5lLmdyYXBoaWNzLlBhdHRlcm4uY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5QYXR0ZXJuLnRvU3R5bGUiLCJuZS5ncmFwaGljcy5QaXhtYXAiLCJuZS5ncmFwaGljcy5QaXhtYXAuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5QaXhtYXAuZnJvbUltYWdlIiwibmUuZ3JhcGhpY3MuUGl4bWFwLmNhbnZhcyIsIm5lLmdyYXBoaWNzLlBpeG1hcC5jb250ZXh0IiwibmUuZ3JhcGhpY3MuUGl4bWFwLndpZHRoIiwibmUuZ3JhcGhpY3MuUGl4bWFwLmhlaWdodCIsIm5lLmdyYXBoaWNzLlBvaW50IiwibmUuZ3JhcGhpY3MuUG9pbnQuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5Qb3NpdGlvbiIsIm5lLmdyYXBoaWNzLlBvc2l0aW9uLnBlcmNlbnQiLCJuZS5ncmFwaGljcy5Qb3NpdGlvbi5hYnNvbHV0ZSIsIm5lLmdyYXBoaWNzLlJhZGlhbEdyYWRpZW50IiwibmUuZ3JhcGhpY3MuUmFkaWFsR3JhZGllbnQuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5SYWRpYWxHcmFkaWVudC5jcmVhdGVHcmFkaWVudCIsIm5lLmdyYXBoaWNzLlJhZGlhbEdyYWRpZW50LmdldEFuZ2xlIiwibmUuZ3JhcGhpY3MuUmVjdCIsIm5lLmdyYXBoaWNzLlJlY3QuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5SZWN0LnoiLCJuZS5ncmFwaGljcy5SZWN0LnciLCJuZS5ncmFwaGljcy5SZWN0LmgiLCJuZS5ncmFwaGljcy5SZWN0LndpZHRoIiwibmUuZ3JhcGhpY3MuUmVjdC5oZWlnaHQiLCJuZS5ncmFwaGljcy5SZWN0LmNsb25lIiwibmUuZ3JhcGhpY3MuU2hhZGVyIiwibmUuZ3JhcGhpY3MuU2hhZGVyLmNvbnN0cnVjdG9yIiwibmUuZ3JhcGhpY3MuU2hhZGVyLmZyYWdtZW50IiwibmUuZ3JhcGhpY3MuU2hhZGVyLmdlbmVyYXRlZFNvdXJjZSIsIm5lLmdyYXBoaWNzLlNoYWRlci5kZXN0cm95IiwibmUuZ3JhcGhpY3MuU2hhZGVyLmNvbXBpbGUiLCJuZS5ncmFwaGljcy5TaGFkZXIuX3ZhbGlkYXRlU2hhZGVyIiwibmUuZ3JhcGhpY3MuU2hhZGVyLl9tYWtlSGVhZCIsIm5lLmdyYXBoaWNzLlNoYWRlci5fbWFrZVZhcmlhYmxlcyIsIm5lLmdyYXBoaWNzLlNoYWRlci5fbWFwQXR0cmlidXRlcyIsIm5lLmdyYXBoaWNzLlNoYWRlci5fbWFwVW5pZm9ybXMiLCJuZS5ncmFwaGljcy5TaGFkZXIuX21hcFZhcnlpbmciLCJuZS5ncmFwaGljcy5TaGFkZXIuX21hcFZlcnRleFZhcmlhYmxlcyIsIm5lLmdyYXBoaWNzLlNoYWRlci5fbWFwRnJhZ21lbnRWYXJpYWJsZXMiLCJuZS5ncmFwaGljcy5Ub25lIiwibmUuZ3JhcGhpY3MuVG9uZS5jb25zdHJ1Y3RvciIsIm5lLmdyYXBoaWNzLlRvbmVbMF0iLCJuZS5ncmFwaGljcy5Ub25lWzFdIiwibmUuZ3JhcGhpY3MuVG9uZVsyXSIsIm5lLmdyYXBoaWNzLlRvbmVbM10iLCJuZS5ncmFwaGljcy5Ub25lLnJlZCIsIm5lLmdyYXBoaWNzLlRvbmUuZ3JlZW4iLCJuZS5ncmFwaGljcy5Ub25lLmJsdWUiLCJuZS5ncmFwaGljcy5Ub25lLmdyYXkiLCJuZS5ncmFwaGljcy5Ub25lLmdyZXkiLCJuZS5ncmFwaGljcy5Ub25lLlJBTkRPTSIsIm5lLmdyYXBoaWNzLldlYkdMUmVuZGVyIiwibmUuZ3JhcGhpY3MuV2ViR0xSZW5kZXIuY29uc3RydWN0b3IiLCJuZS5ncmFwaGljcy5XZWJHTFJlbmRlci5fY3JlYXRlQ29udGV4dCIsIm5lLmdyYXBoaWNzLldlYkdMUmVuZGVyLl9jcmVhdGVCdWZmZXIiLCJuZS5ncmFwaGljcy5XZWJHTFJlbmRlci5nbCIsIm5lLmdyYXBoaWNzLldlYkdMUmVuZGVyLnJlbmRlciIsIm5lLmdyYXBoaWNzLldlYkdMUmVuZGVyLnByZXBhcmVSZWN0QnVmZmVyIiwibmUubWF0aC5NYXRyaXgyIiwibmUubWF0aC5NYXRyaXgyLmNvbnN0cnVjdG9yIiwibmUubWF0aC5NYXRyaXgyLndpZHRoIiwibmUubWF0aC5NYXRyaXgyLmhlaWdodCIsIm5lLm1hdGguTWF0cml4Mi5kYXRhIiwibmUubWF0aC5NYXRyaXgyWycwJ10iLCJuZS5tYXRoLk1hdHJpeDJbJzEnXSIsIm5lLm1hdGguTWF0cml4MlsnMiddIiwibmUubWF0aC5NYXRyaXgyWyczJ10iLCJuZS5tYXRoLk1hdHJpeDIuYXQiLCJuZS5tYXRoLk1hdHJpeDIuc2V0IiwibmUubWF0aC5NYXRyaXgyLmNvcHlGcm9tIiwibmUubWF0aC5NYXRyaXgyLmNvcHlUbyIsIm5lLm1hdGguTWF0cml4Mi5JREVOVElUWSIsIm5lLm1hdGguTWF0cml4MyIsIm5lLm1hdGguTWF0cml4My5jb25zdHJ1Y3RvciIsIm5lLm1hdGguTWF0cml4M1snNCddIiwibmUubWF0aC5NYXRyaXgzWyc1J10iLCJuZS5tYXRoLk1hdHJpeDNbJzYnXSIsIm5lLm1hdGguTWF0cml4M1snNyddIiwibmUubWF0aC5NYXRyaXgzLm11bCIsIm5lLm1hdGguTWF0cml4My50cmFuc2xhdGUiLCJuZS5tYXRoLk1hdHJpeDMucm90YXRlIiwibmUubWF0aC5NYXRyaXgzLnNjYWxlIiwibmUubWF0aC5NYXRyaXgzLklERU5USVRZIiwibmUubWF0aC5NYXRyaXgzLnRyYW5zbGF0aW9uIiwibmUubWF0aC5NYXRyaXgzLnJvdGF0aW9uIiwibmUubWF0aC5NYXRyaXgzLnByb2plY3Rpb24iLCJuZS5tYXRoLk1hdHJpeDQiLCJuZS5tYXRoLk1hdHJpeDQuY29uc3RydWN0b3IiLCJuZS5tYXRoLk1hdHJpeDRbJzgnXSIsIm5lLm1hdGguTWF0cml4NFsnOSddIiwibmUubWF0aC5NYXRyaXg0WycxMCddIiwibmUubWF0aC5NYXRyaXg0WycxMSddIiwibmUubWF0aC5NYXRyaXg0WycxMiddIiwibmUubWF0aC5NYXRyaXg0WycxMyddIiwibmUubWF0aC5NYXRyaXg0WycxNCddIiwibmUubWF0aC5NYXRyaXg0WycxNSddIiwibmUubWF0aC5NYXRyaXg0LklERU5USVRZIiwibmUubWF0aC5NYXRyaXg0LnRyYW5zbGF0aW9uIiwibmUubWF0aC5NYXRyaXg0LnhSb3RhdGlvbiIsIm5lLm1hdGguTWF0cml4NC55Um90YXRpb24iLCJuZS5tYXRoLk1hdHJpeDQuelJvdGF0aW9uIiwibmUubWF0aC5NYXRyaXg0LnJvdGF0aW9uIiwibmUubWF0aC5NYXRyaXg0LnNjYWxlIiwibmUubWF0aC5NYXRyaXg0LmNhbWVyYSIsIm5lLm1hdGguTWF0cml4NC5sb29rQXQiLCJuZS5tYXRoLk1hdHJpeDQudHJhbnNsYXRlIiwibmUubWF0aC5NYXRyaXg0LnJvdGF0ZSIsIm5lLm1hdGguTWF0cml4NC54Um90YXRlIiwibmUubWF0aC5NYXRyaXg0LnlSb3RhdGUiLCJuZS5tYXRoLk1hdHJpeDQuelJvdGF0ZSIsIm5lLm1hdGguTWF0cml4NC5tdWwiLCJuZS5tYXRoLk1hdHJpeDQuaW52ZXJzZSIsIm5lLm1hdGgucGVybXV0YXRvciIsIm5lLm1hdGgucGVybXV0YXRvci5wZXJtdXRlIiwibmUuc2NlbmUuQ2FtZXJhIiwibmUuc2NlbmUuQ2FtZXJhLmNvbnN0cnVjdG9yIiwibmUuc2NlbmUuQ2FtZXJhLm9yaWdpbiIsIm5lLnNjZW5lLkNhbWVyYS5kZXN0aW5hdGlvbiIsIm5lLnNjZW5lLkNhbWVyYS51cCIsIm5lLnNjZW5lLkNhbWVyYS5tYXRyaXgiLCJuZS5zY2VuZS5DYW1lcmEudmlldyIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlciIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlci5jb25zdHJ1Y3RvciIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlci5zZXR1cExvYWRTY2VuZSIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlci5yZWFkeSIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlci5nYW1lIiwibmUuc2NlbmUuU2NlbmVNYW5hZ2VyLnNjZW5lIiwibmUuc2NlbmUuU2NlbmVNYW5hZ2VyLmV2ZW50cyIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlci5pbnN0YW5jZSIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlci5nb3RvIiwibmUuc2NlbmUuU2NlbmVNYW5hZ2VyLmNhbGwiLCJuZS5zY2VuZS5TY2VuZU1hbmFnZXIuYmFjayIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlci5jbGVhciIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlci51cGRhdGUiLCJuZS5zY2VuZS5TY2VuZU1hbmFnZXIuX3N3YXBTY2VuZSIsIm5lLnNjZW5lLlNjZW5lTWFuYWdlci5fYWZ0ZXJMb2FkIiwibmUuc2NlbmUuU2NlbmVNYW5hZ2VyLl90ZXJtaW5hdGUiLCJuZS5zY2VuZS5TY2VuZU1hbmFnZXIuX3VwZGF0ZUluc3RhbmNlIiwibmUudXRpbHMiLCJuZS51dGlscy5FdmVudE1hbmFnZXIiLCJuZS51dGlscy5FdmVudE1hbmFnZXIuY29uc3RydWN0b3IiLCJuZS51dGlscy5FdmVudE1hbmFnZXIub24iLCJuZS51dGlscy5FdmVudE1hbmFnZXIub2ZmIiwibmUudXRpbHMuRXZlbnRNYW5hZ2VyLmZpcmUiLCJuZS51dGlscy5DYWNoZUZpbmRlciIsIm5lLnV0aWxzLkNhY2hlRmluZGVyLmNvbnN0cnVjdG9yIiwibmUudXRpbHMuQ2FjaGVGaW5kZXIucGl4bWFwIiwibmUudXRpbHMuQ2FjaGVGaW5kZXIuZm9udCIsIm5lLnV0aWxzLkNhY2hlRmluZGVyLmF1ZGlvIiwibmUudXRpbHMuQ2FjaGVGaW5kZXIuanNvbiIsIm5lLnV0aWxzLkxvYWRlciIsIm5lLnV0aWxzLkxvYWRlci5jb25zdHJ1Y3RvciIsIm5lLnV0aWxzLkxvYWRlci5kb25lIiwibmUudXRpbHMuTG9hZGVyLnN0YXJ0IiwibmUudXRpbHMuTG9hZGVyLmlzRG9uZSIsIm5lLnV0aWxzLkxvYWRlci5jYWxsRG9uZSIsIm5lLnV0aWxzLkxvYWRlci5waXhtYXAiLCJuZS51dGlscy5Mb2FkZXIuX3ByZXBhcmVJbWFnZSIsIm5lLnV0aWxzLkxvYWRlci5mb250IiwibmUudXRpbHMuTG9hZGVyLl9wcmVwYXJlRm9udCIsIm5lLnV0aWxzLkxvYWRlci5hdWRpbyIsIm5lLnV0aWxzLkxvYWRlci5qc29uIiwibmUudXRpbHMuTG9hZGVyLl9wcmVwYXJlTGVnYWN5QXVkaW9SZXF1ZXN0IiwibmUudXRpbHMuTG9hZGVyLl9wcmVwYXJlV2ViQXVkaW9SZXF1ZXN0IiwibmUudXRpbHMuTG9hZGVyLmNhY2hlIiwibmUudXRpbHMuTG9hZGVyLl9jaGVja0xvYWQiLCJuZS51dGlscy5Mb2FkZXIuY2xlYXIiLCJuZS51dGlscy5Mb2FkZXIuY2xlYXJQaXhtYXBzIiwibmUudXRpbHMuTG9hZGVyLmNsZWFyRm9udHMiLCJuZS51dGlscy5Mb2FkZXIuY2xlYXJBdWRpbyIsIm5lLnV0aWxzLkxvYWRlci5jbGVhckpzb24iLCJuZS5vYmplY3RzLlZpZXdwb3J0IiwibmUub2JqZWN0cy5WaWV3cG9ydC5jb25zdHJ1Y3RvciIsIm5lLm9iamVjdHMuVmlld3BvcnQucHJlcGFyZSJdLCJtYXBwaW5ncyI6IkFBQ0EsTUFBTSxDQUFDLHFCQUFxQixHQUFHLENBQUM7SUFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUI7UUFDN0IsTUFBTyxDQUFDLDJCQUEyQjtRQUNuQyxNQUFPLENBQUMsd0JBQXdCO1FBQ2hDLE1BQU8sQ0FBQyxzQkFBc0I7UUFDcEMsTUFBTSxDQUFDLHVCQUF1QjtRQUM5QixVQUFTLFFBQVE7WUFDYixNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsRUFBRSxDQUFDO0FDVkosSUFBTyxFQUFFLENBNkRUO0FBN0RBLFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxLQUFLQSxDQTZEZkE7SUE3RFVBLFdBQUFBLEtBQUtBLEVBQUNBLENBQUNBO1FBRWhCQztZQU1FQyxlQUFZQSxPQUFxQkE7Z0JBQy9CQyxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxRQUFLQSxDQUFDQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDbERBLElBQUlBLENBQUNBLFFB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LENBQUNBLElBQUlBLENBQUNBO2dCQUNsQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxNQUFNQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtvQkFDaENBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNmQSxDQUFDQTtnQkFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDZEEsQ0FBQ0E7WUFFRE4scUJBQUdBLEdBQUhBLFVBQUlBLEdBQUdBO2dCQUNMTyxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFDekJBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO2dCQUNsQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxNQUFNQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtvQkFDaENBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNmQSxDQUFDQTtnQkFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDZEEsQ0FBQ0E7WUFFRFAscUJBQUdBLEdBQUhBLFVBQUlBLEdBQUdBO2dCQUNMUSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFDekJBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO2dCQUNsQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxNQUFNQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtvQkFDaENBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNmQSxDQUFDQTtnQkFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDZEEsQ0FBQ0E7WUFFRFIscUJBQUdBLEdBQUhBLFVBQUlBLEdBQUdBO2dCQUNMUyxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQTtnQkFDekJBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO2dCQUNsQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0E7Z0JBQ2pCQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxNQUFNQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtvQkFDaENBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNmQSxDQUFDQTtnQkFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDZEEsQ0FBQ0E7WUFFRFQscUJBQUdBLEdBQUhBLFVBQUtBLENBQUNBLEVBQUVBLENBQUNBO2dCQUNQVSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDckJBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNaQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUVEViwyQkFBU0EsR0FBVEE7Z0JBQ0VXLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO2dCQUNyQkEsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1pBLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBO2dCQUN6QkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsTUFBTUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ2hDQSxHQUFHQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDM0JBLENBQUNBO2dCQUNEQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDekJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLE1BQU1BLEVBQUVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO29CQUNoQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQy9CQSxDQUFDQTtnQkFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDZEEsQ0FBQ0E7WUFFSFgsY0FBQ0E7UUFBREEsQ0EvRkE5QixBQStGQzhCLEVBL0Y0QjlCLFdBQU1BLEVBK0ZsQ0E7UUEvRllBLFlBQU9BLFVBK0ZuQkEsQ0FBQUE7UUFDREEsaUJBQVlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO1FBQ3BEQSxpQkFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDMUNBLGlCQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNwREEsaUJBQVlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO0lBRXREQSxDQUFDQSxFQXZHU2pLLElBQUlBLEdBQUpBLE9BQUlBLEtBQUpBLE9BQUlBLFFBdUdiQTtBQUFEQSxDQUFDQSxFQXZHTSxFQUFFLEtBQUYsRUFBRSxRQXVHUjtBQzFHRCxxQ0FBcUM7QUFFckMsSUFBTyxFQUFFLENBK0NSO0FBL0NELFdBQU8sRUFBRTtJQUFDQSxJQUFBQSxJQUFJQSxDQStDYkE7SUEvQ1NBLFdBQUFBLElBQUlBLEVBQUNBLENBQUNBO1FBRWRpSztZQUE2QjBDLDJCQUFPQTtZQUVsQ0EsaUJBQVlBLENBQUdBLEVBQUVBLENBQUdBLEVBQUVBLENBQUdBO2dCQUFiQyxpQkFBR0EsR0FBSEEsS0FBR0E7Z0JBQUVBLGlCQUFHQSxHQUFIQSxLQUFHQTtnQkFBRUEsaUJBQUdBLEdBQUhBLEtBQUdBO2dCQUN2QkEsa0JBQU1BLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2dCQUNaQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUVERCxzQkFBSUEsMkJBQU1BO3FCQUFWQTtvQkFDRUUsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLENBQUNBOzs7ZUFBQUY7WUFFREEsdUJBQUtBLEdBQUxBO2dCQUNFRyxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxPQUFPQSxFQUFFQSxDQUFDQTtnQkFDeEJBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQzVCQSxDQUFDQTtZQUVESCxzQkFBSUEsbUJBQUNBLENBQUVBO3FCQUFQQTtvQkFDRUksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZCQSxDQUFDQTs7O2VBQUFKO1lBRURBLHNCQUFJQSxtQkFBQ0EsQ0FBRUE7cUJBQVBBLFVBQVFBLEtBQUtBO29CQUNYSSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtnQkFDeEJBLENBQUNBOzs7ZUFBQUo7WUFHREEscUJBQUdBLEdBQUhBLFVBQUtBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUdBO2dCQUFISyxpQkFBR0EsR0FBSEEsS0FBR0E7Z0JBQ1pBLGdCQUFLQSxDQUFDQSxHQUFHQSxZQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDaEJBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO2dCQUNyQkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDZEEsQ0FBQ0E7WUFFREwsdUJBQUtBLEdBQUxBLFVBQU1BLEdBQVdBO2dCQUNmTSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDckJBLElBQUlBLEVBQUVBLEdBQUtBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBO2dCQUNwQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFDQSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDMUNBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1pBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNaQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDWkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDZEEsQ0FBQ0E7WUFFSE4sY0FBQ0E7UUFBREEsQ0EzQ0ExQyxBQTJDQzBDLEVBM0M0QjFDLFlBQU9BLEVBMkNuQ0E7UUEzQ1lBLFlBQU9BLFVBMkNuQkEsQ0FBQUE7SUFFSEEsQ0FBQ0EsRUEvQ1NqSyxJQUFJQSxHQUFKQSxPQUFJQSxLQUFKQSxPQUFJQSxRQStDYkE7QUFBREEsQ0FBQ0EsRUEvQ00sRUFBRSxLQUFGLEVBQUUsUUErQ1I7QUNqREQscUNBQXFDO0FBRXJDLElBQU8sRUFBRSxDQW1DUjtBQW5DRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsSUFBSUEsQ0FtQ2JBO0lBbkNTQSxXQUFBQSxJQUFJQSxFQUFDQSxDQUFDQTtRQUVkaUs7WUFBNkJpRCwyQkFBT0E7WUFFbENBLGlCQUFZQSxDQUFHQSxFQUFFQSxDQUFHQSxFQUFFQSxDQUFHQSxFQUFFQSxDQUFHQTtnQkFBbEJDLGlCQUFHQSxHQUFIQSxLQUFHQTtnQkFBRUEsaUJBQUdBLEdBQUhBLEtBQUdBO2dCQUFFQSxpQkFBR0EsR0FBSEEsS0FBR0E7Z0JBQUVBLGlCQUFHQSxHQUFIQSxLQUFHQTtnQkFDNUJBLGtCQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDZkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDZEEsQ0FBQ0E7WUFFREQsc0JBQUlBLDJCQUFNQTtxQkFBVkE7b0JBQ0VFLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2dCQUNYQSxDQUFDQTs7O2VBQUFGO1lBRURBLHVCQUFLQSxHQUFMQTtnQkFDRUcsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsT0FBT0EsRUFBRUEsQ0FBQ0E7Z0JBQ3hCQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUM1QkEsQ0FBQ0E7WUFFREgsc0JBQUlBLG1CQUFDQSxDQUFFQTtxQkFBUEE7b0JBQ0VJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsQ0FBQ0E7OztlQUFBSjtZQUVEQSxzQkFBSUEsbUJBQUNBLENBQUVBO3FCQUFQQSxVQUFRQSxLQUFLQTtvQkFDWEksSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQ3hCQSxDQUFDQTs7O2VBQUFKO1lBRURBLHFCQUFHQSxHQUFIQSxVQUFLQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFHQSxFQUFFQSxDQUFHQTtnQkFBUkssaUJBQUdBLEdBQUhBLEtBQUdBO2dCQUFFQSxpQkFBR0EsR0FBSEEsS0FBR0E7Z0JBQ2pCQSxnQkFBS0EsQ0FBQ0EsR0FBR0EsWUFBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25CQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDckJBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNaQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUVITCxjQUFDQTtRQUFEQSxDQS9CQWpELEFBK0JDaUQsRUEvQjRCakQsWUFBT0EsRUErQm5DQTtRQS9CWUEsWUFBT0EsVUErQm5CQSxDQUFBQTtJQUVIQSxDQUFDQSxFQW5DU2pLLElBQUlBLEdBQUpBLE9BQUlBLEtBQUpBLE9BQUlBLFFBbUNiQTtBQUFEQSxDQUFDQSxFQW5DTSxFQUFFLEtBQUYsRUFBRSxRQW1DUjtBQ3JDRCwyQ0FBMkM7QUFDM0MsbUNBQW1DO0FBRW5DLElBQU8sRUFBRSxDQWlKUjtBQWpKRCxXQUFPLEVBQUU7SUFBQ0EsSUFBQUEsUUFBUUEsQ0FpSmpCQTtJQWpKU0EsV0FBQUEsUUFBUUEsRUFBQ0EsQ0FBQ0E7UUFFbEJxRDtZQUErQm1LLDZCQUFZQTtZQUEzQ0E7Z0JBQStCQyw4QkFBWUE7WUE2STNDQSxDQUFDQTtZQTNJQ0Qsc0JBQUlBLHFCQUFDQSxDQUFFQTtxQkFBUEE7b0JBQ0VFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsQ0FBQ0E7OztlQUFBRjtZQUVEQSxzQkFBSUEscUJBQUNBLENBQUVBO3FCQUFQQSxVQUFRQSxLQUFLQTtvQkFDWEUsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BEQSxDQUFDQTs7O2VBQUFGO1lBRURBLHNCQUFJQSxxQkFBQ0EsQ0FBRUE7cUJBQVBBO29CQUNFRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkJBLENBQUNBOzs7ZUFBQUg7WUFFREEsc0JBQUlBLHFCQUFDQSxDQUFFQTtxQkFBUEEsVUFBUUEsS0FBS0E7b0JBQ1hHLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEVBQUVBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO2dCQUNwREEsQ0FBQ0E7OztlQUFBSDtZQUVEQSxzQkFBSUEscUJBQUNBLENBQUVBO3FCQUFQQTtvQkFDRUksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZCQSxDQUFDQTs7O2VBQUFKO1lBRURBLHNCQUFJQSxxQkFBQ0EsQ0FBRUE7cUJBQVBBLFVBQVFBLEtBQUtBO29CQUNYSSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDcERBLENBQUNBOzs7ZUFBQUo7WUFFREEsc0JBQUlBLHFCQUFDQSxDQUFFQTtxQkFBUEE7b0JBQ0VLLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsQ0FBQ0E7OztlQUFBTDtZQUVEQSxzQkFBSUEscUJBQUNBLENBQUVBO3FCQUFQQSxVQUFRQSxLQUFLQTtvQkFDWEssSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BEQSxDQUFDQTs7O2VBQUFMO1lBRURBLHNCQUFJQSwwQkFBR0E7cUJBQVBBO29CQUNFTSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDaEJBLENBQUNBO3FCQUVETixVQUFRQSxLQUFLQTtvQkFDWE0sSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQ2pCQSxDQUFDQTs7O2VBSkFOO1lBTURBLHNCQUFJQSw0QkFBS0E7cUJBQVRBO29CQUNFTyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDaEJBLENBQUNBO3FCQUVEUCxVQUFVQSxLQUFLQTtvQkFDYk8sSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQ2pCQSxDQUFDQTs7O2VBSkFQO1lBTURBLHNCQUFJQSwyQkFBSUE7cUJBQVJBO29CQUNFUSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDaEJBLENBQUNBO3FCQUVEUixVQUFTQSxLQUFLQTtvQkFDWlEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQ2pCQSxDQUFDQTs7O2VBSkFSO1lBTURBLHNCQUFJQSw0QkFBS0E7cUJBQVRBO29CQUNFUyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDaEJBLENBQUNBO3FCQUVEVCxVQUFVQSxLQUFLQTtvQkFDYlMsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQ2pCQSxDQUFDQTs7O2VBSkFUO1lBTURBLHNCQUFJQSwwQkFBR0E7cUJBQVBBO29CQUNFVSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDekJBLENBQUNBO3FCQUVEVixVQUFRQSxLQUFLQTtvQkFDWFUsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7b0JBQ3pCQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtvQkFDaEJBLElBQUlBLENBQUNBLEdBQUdBLGNBQUtBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO29CQUM3QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxDQUFDQTs7O2VBUEFWO1lBU0RBLHNCQUFJQSxpQ0FBVUE7cUJBQWRBO29CQUNFVyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDekJBLENBQUNBO3FCQUVEWCxVQUFlQSxLQUFLQTtvQkFDbEJXLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO29CQUN6QkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0E7b0JBQ2hCQSxJQUFJQSxDQUFDQSxHQUFHQSxjQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDN0JBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0E7OztlQVBBWDtZQVNEQSxzQkFBSUEsZ0NBQVNBO3FCQUFiQTtvQkFDRVksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pCQSxDQUFDQTtxQkFFRFosVUFBY0EsS0FBS0E7b0JBQ2pCWSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtvQkFDekJBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLENBQUNBO29CQUNoQkEsSUFBSUEsQ0FBQ0EsR0FBR0EsY0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQzdCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtnQkFDNUNBLENBQUNBOzs7ZUFQQVo7WUFVREEsMEJBQU1BLEdBQU5BO2dCQUNFYSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDbEVBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2dCQUNyREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzlCQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDYkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsYUFBYUE7Z0JBQzVCQSxDQUFDQTtnQkFBQUEsSUFBSUEsQ0FBQUEsQ0FBQ0E7b0JBQ0ZBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO29CQUNsQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3BEQSxNQUFNQSxDQUFBQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFBQSxDQUFDQTt3QkFDUkEsS0FBS0EsQ0FBQ0E7NEJBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBOzRCQUFDQSxLQUFLQSxDQUFDQTt3QkFDakRBLEtBQUtBLENBQUNBOzRCQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFBQ0EsS0FBS0EsQ0FBQ0E7d0JBQ25DQSxLQUFLQSxDQUFDQTs0QkFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7NEJBQUNBLEtBQUtBLENBQUNBO29CQUN2Q0EsQ0FBQ0E7b0JBQ0RBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNYQSxDQUFDQTtnQkFFREEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDL0JBLENBQUNBO1lBRURiLHlCQUFLQSxHQUFMQTtnQkFDRWMsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ2xFQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFD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QUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDOUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNsQkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2pDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDM0JBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNuQ0EsQ0FBQ0E7Z0JBQ0RBLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQ3JGQSxDQUFDQTtZQUVNSCxjQUFRQSxHQUFmQSxVQUFnQkEsSUFBV0E7Z0JBQ3pCSSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxJQUFJQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDN0JBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLElBQUlBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBO2dCQUM3QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsSUFBS0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQzdCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxJQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDN0JBLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQy9CQSxDQUFDQTtZQUVNSixhQUFPQSxHQUFkQSxVQUFlQSxHQUFVQTtnQkFDdkJLLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBO2dCQUM1QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBS0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQzVCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDNUJBLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQzVCQSxDQUFDQTtZQUVNTCxjQUFRQSxHQUFmQSxVQUFnQkEsSUFBSUE7Z0JBQ2pCTSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxJQUFJQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDN0JBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLElBQUlBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBO2dCQUM3QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsSUFBS0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQzdCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxJQUFLQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDN0JBLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLENBQUNBLENBQUNB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Q0EsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZDQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2Q0EsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDekNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN6Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3pDQSxDQUFDQSxD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QSxDQUFDQSxHQUFHQSxDQUFDQTtZQUNiQSxDQUFDQTtZQUVNWCxnQkFBUUEsR0FBZkEsVUFBZ0JBLEtBQVlBO2dCQUMxQlksSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsT0FBT0EsRUFBRUEsQ0FBQ0E7Z0JBQ3hCQSxJQUFJQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDcEJBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO2dCQUN4QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hCQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDdEJBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUNiQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDWkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1pBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBO1lBQ2JBLENBQUNBO1lBRU1aLGFBQUtBLEdBQVpBLFVBQWFBLENBQVFBLEVBQUVBLENBQVFBO2dCQUM3QlMsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsT0FBT0EsRUFBRUEsQ0FBQ0E7Z0JBQ3hCQSxJQUFJQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDcEJBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNaQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDWkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1pBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBO1lB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QSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDcEZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBO2dCQUN2REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZEQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDdkRBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFF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Q0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZEQSxJQUFJQSxHQUFHQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNsREEsR0FBR0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDbERBLEdBQUdBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQ2xEQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFFdkRBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN0REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3REQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDdERBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN0REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3REQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDdERBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN0REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3REQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDdERBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN0REEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3REQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDdERBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN0REEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3REQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDdERBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN0REEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDZEEsQ0FBQ0E7WUFFRHhCLHlCQUFPQSxHQUFQQTtnQkFDRXlCLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO2dCQUNsQkEsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25EQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkRBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO2dCQUNyREEsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZEQSxJQUFJQSxFQUFFQSxHQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxFQUFFQSxHQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxFQUFFQSxHQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxFQUFFQSxHQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDdkVBLElBQUlBLEVBQUVBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEVBQUVBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEVBQUVBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEVBQUVBLEdBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN2RUEsSUFBSUEsRUFBRUEsR0FBSUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsRUFBRUEsR0FBSUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBQ3ZFQSxJQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDdkVBLElBQUlBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUN2RUEsSUFBSUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7Z0JBRXZFQSxJQUFJQSxFQUFFQSxHQUFHQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQTtvQkFDckNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNyQ0EsSUFBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0E7b0JBQ3JDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDckNBLElBQUlBLEVBQUVBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO29CQUN0Q0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RDQSxJQUFJQSxFQUFFQSxHQUFHQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtvQkFDdENBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBO2dCQUV0Q0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBRTFEQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDL0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUNsRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xGQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDcEZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUNwRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hGQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDeEZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO2dCQUN4RkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hGQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDeEZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdB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Q0EsQ0FBQ0E7WUFDdENBLENBQUNBO1lBRUhGLGVBQUNBO1FBQURBLENBYkExYSxBQWFDMGEsRUFiNkIxYSx5QkFBaUJBLEVBYTlDQTtRQWJZQSxnQkFBUUEsV0FhcEJBLENBQUFBO0lBRUhBLENBQUNBLEVBakJTN0IsT0FBT0EsR0FBUEEsVUFBT0EsS0FBUEEsVUFBT0EsUUFpQmhCQTtBQUFEQSxDQUFDQSxFQWpCTSxFQUFFLEtBQUYsRUFBRSxRQWlCUiIsImZpbGUiOiJuZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gKGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAoPGFueT53aW5kb3cpLndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICg8YW55PndpbmRvdykubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgKDxhbnk+d2luZG93KS5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgZnVuY3Rpb24oY2FsbGJhY2spe1xyXG4gICAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XHJcbiAgfTtcclxufSkoKTtcclxuIiwiIG1vZHVsZSBuZS5zY2VuZSB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBTY2VuZSBpbXBsZW1lbnRzIG5lLnV0aWxzLkV2ZW50SGFuZGxlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfZXZlbnRNYW5hZ2VyOiB1dGlscy5FdmVudE1hbmFnZXI7XHJcbiAgICBwcml2YXRlIF9tYW5hZ2VyICAgICA6IFNjZW5lTWFuYWdlcjtcclxuICAgIHByaXZhdGUgX2NvbnRhaW5lciAgIDogb2JqZWN0cy5EcmF3YWJsZUNvbnRhaW5lcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtYW5hZ2VyOiBTY2VuZU1hbmFnZXIpIHtcclxuICAgICAgdGhpcy5fZXZlbnRNYW5hZ2VyID0gbmV3IHV0aWxzLkV2ZW50TWFuYWdlcih0aGlzKTtcclxuICAgICAgdGhpcy5fbWFuYWdlciAgICAgID0gbWFuYWdlcjtcclxuICAgICAgdGhpcy5fY29udGFpbmVyICAgID0gbmV3IG9iamVjdHMuVmlld3BvcnQodGhpcy5tYW5hZ2VyLmdhbWUucmVjdCk7XHJcbiAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWZhdWx0RXZlbnQobmFtZTogc3RyaW5nLCBldmVudDogRXZlbnQpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1hbmFnZXIoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9tYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBnYW1lKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5tYW5hZ2VyLmdhbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGV2ZW50cygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50TWFuYWdlcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29udGFpbmVyKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHNldHVwKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBsb2FkKGxvYWRlcjogdXRpbHMuTG9hZGVyKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KGNhY2hlIDogdXRpbHMuQ2FjaGVGaW5kZXIpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgdGhpcy5jb250YWluZXIudXBkYXRlKGRlbHRhKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoZ2w6IGdyYXBoaWNzLldlYkdMUmVuZGVyKSB7XHJcbiAgICAgIHRoaXMuX2NvbnRhaW5lci5yZW5kZXIoZ2wpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL1NjZW5lLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBuZS5zY2VuZSB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBMb2FkU2NlbmUgZXh0ZW5kcyBzY2VuZS5TY2VuZSB7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwibW9kdWxlIG5lIHtcclxuXHJcbiAgZXhwb3J0IGVudW0gTW9kZSB7XHJcbiAgICBXRUJHTCxcclxuICAgIENBTlZBUzJELFxyXG4gICAgQVVUT1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vc2NlbmUvTG9hZFNjZW5lLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vTW9kZS50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUge1xyXG5cclxuICBleHBvcnQgY2xhc3MgR2FtZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlQmluZCAgIDogKGRlbHRhOiBudW1iZXIpID0+IGFueTtcclxuICAgIHByaXZhdGUgX3NjZW5lTWFuYWdlciA6IHNjZW5lLlNjZW5lTWFuYWdlcjtcclxuICAgIHByaXZhdGUgX3JlbmRlciAgICAgICA6IGdyYXBoaWNzLlJlbmRlcjtcclxuICAgIHByaXZhdGUgX3RpbWUgICAgICAgICA6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih7IHdpZHRoOiB3aWR0aCA9IDQ4MCwgaGVpZ2h0OiBoZWlnaHQgPSAzMjAsXHJcbiAgICAgICAgICAgICAgICAgIG1vZGU6IG1vZGUgPSBuZS5Nb2RlLkFVVE8sXHJcbiAgICAgICAgICAgICAgICAgIGxvYWRTY2VuZTogbG9hZFNjZW5lID0gPHNjZW5lLlNjZW5lQ2xhc3M+c2NlbmUuTG9hZFNjZW5lIH0pIHtcclxuICAgICAgdGhpcy5jcmVhdGVSZW5kZXIoeyB3aWR0aCwgaGVpZ2h0LCBtb2RlIH0pO1xyXG4gICAgICB0aGlzLl9zY2VuZU1hbmFnZXIgPSBuZXcgbmUuc2NlbmUuU2NlbmVNYW5hZ2VyKHRoaXMsIGxvYWRTY2VuZSk7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVJlbmRlcihvcHRpb25zIDogR2FtZU9wdGlvbnMpIHtcclxuICAgICAgc3dpdGNoIChvcHRpb25zLm1vZGUpIHtcclxuICAgICAgICBjYXNlIE1vZGUuQ0FOVkFTMkQ6XHJcbiAgICAgICAgICB0aGlzLl9yZW5kZXIgPSBuZXcgZ3JhcGhpY3MuQ2FudmFzMkRSZW5kZXIob3B0aW9ucyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIE1vZGUuV0VCR0w6XHJcbiAgICAgICAgICB0aGlzLl9yZW5kZXIgPSBuZXcgZ3JhcGhpY3MuV2ViR0xSZW5kZXIob3B0aW9ucyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIE1vZGUuQVVUTzogZGVmYXVsdDpcclxuICAgICAgICAgIHRoaXMuX2F1dG9EZXRlY3RNb2RlKG9wdGlvbnMpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2F1dG9EZXRlY3RNb2RlKG9wdGlvbnMgOiBHYW1lT3B0aW9ucykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlciA9IG5ldyBncmFwaGljcy5XZWJHTFJlbmRlcihvcHRpb25zKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlciA9IG5ldyBncmFwaGljcy5DYW52YXMyRFJlbmRlcihvcHRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KHNjZW5lOiBzY2VuZS5TY2VuZUNsYXNzKSB7XHJcbiAgICAgIHRoaXMuX3RpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgdGhpcy5fdXBkYXRlQmluZCA9IHRoaXMudXBkYXRlLmJpbmQodGhpcyk7XHJcbiAgICAgIHRoaXMuX3NjZW5lTWFuYWdlci5nb3RvKHNjZW5lKTtcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZUJpbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSh0aW1lc3RhbXA6IG51bWJlcikge1xyXG4gICAgICB2YXIgZGVsdGEgPSB0aW1lc3RhbXAgLSB0aGlzLl90aW1lO1xyXG4gICAgICB0aGlzLl9yZW5kZXIucmVuZGVyKHRoaXMuX3NjZW5lTWFuYWdlci5pbnN0YW5jZSlcclxuICAgICAgdGhpcy5fc2NlbmVNYW5hZ2VyLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgIHRoaXMuX3RpbWUgPSB0aW1lc3RhbXA7XHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGVCaW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmlldygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlci5jYW52YXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJlY3QoKTogbmUuZ3JhcGhpY3MuUmVjdCB7XHJcbiAgICAgIHJldHVybiBuZXcgbmUuZ3JhcGhpY3MuUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNoKGlkOiBzdHJpbmd8SFRNTEVsZW1lbnQpIHtcclxuICAgICAgdmFyIGUgPSB0eXBlb2YgaWQgPT0gJ3N0cmluZycgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCg8c3RyaW5nPmlkKSA6IDxIVE1MRWxlbWVudD5pZDtcclxuICAgICAgZS5hcHBlbmRDaGlsZCh0aGlzLnZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB3aWR0aCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlci53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGVpZ2h0KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcmVuZGVyLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUub2JqZWN0cyB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBEcmF3YWJsZSBpbXBsZW1lbnRzIGdyYXBoaWNzLlJlbmRlck9iamVjdCB7XHJcblxyXG4gICAgcHVibGljIHZpc2libGUgIDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3ogICAgICA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3BhcmVudCA6IERyYXdhYmxlQ29udGFpbmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICB0aGlzLl96ID0gMDtcclxuICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcclxuICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgeigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3o7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHoodmFsdWUpIHtcclxuICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl96KSB7XHJcbiAgICAgICAgdGhpcy5feiA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcclxuICAgICAgICAgIHRoaXMuX3BhcmVudC5ub3RpZnlDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX3ogPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGFyZW50KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwYXJlbnQodmFsdWUpIHtcclxuICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9wYXJlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5fcGFyZW50KSB7XHJcbiAgICAgICAgICB0aGlzLl9wYXJlbnQucmVtb3ZlKHRoaXMpO1xyXG4gICAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICB2YWx1ZS5hZGQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX3BhcmVudCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkZWx0YTogbnVtYmVyKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihyZW5kZXI6IGdyYXBoaWNzLldlYkdMUmVuZGVyKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0RyYXdhYmxlLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBuZS5vYmplY3RzIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIERyYXdhYmxlQ29udGFpbmVyIGV4dGVuZHMgRHJhd2FibGUgIHtcclxuXHJcbiAgICBwcml2YXRlIF9jaGFuZ2VkICA6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9jaGlsZHJlbiA6IEFycmF5PERyYXdhYmxlPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgICAgdGhpcy5fY2hhbmdlZCAgPSBmYWxzZTtcclxuICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBub3RpZnlDaGFuZ2VzKCkge1xyXG4gICAgICB0aGlzLl9jaGFuZ2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIocmVuZGVyOiBncmFwaGljcy5XZWJHTFJlbmRlcikge1xyXG4gICAgICB0aGlzLl9jaGVja1pJbmRleCgpO1xyXG4gICAgICB0aGlzLl9yZW5kZXJDaGlsZHJlbihyZW5kZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfY2hlY2taSW5kZXgoKSB7XHJcbiAgICAgIGlmICh0aGlzLl9jaGFuZ2VkKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuLnNvcnQoKGEsIGIpID0+IGEueiAtIGIueik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX3JlbmRlckNoaWxkcmVuKHJlbmRlcjogZ3JhcGhpY3MuV2ViR0xSZW5kZXIpIHtcclxuICAgICAgZm9yICh2YXIgYyBvZiB0aGlzLl9jaGlsZHJlbikge1xyXG4gICAgICAgIGMucmVuZGVyKHJlbmRlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmUoY2hpbGQ6IERyYXdhYmxlKSB7XHJcbiAgICAgIHZhciBpZHggPSB0aGlzLl9jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcclxuICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKGNoaWxkOiBEcmF3YWJsZSkge1xyXG4gICAgICB2YXIgaWR4ID0gdGhpcy5fY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XHJcbiAgICAgIGlmIChpZHggPT09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4ucHVzaChjaGlsZCk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlDaGFuZ2VzKCk7XHJcbiAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkZWx0YTogbnVtYmVyKSB7XHJcbiAgICAgIGZvciAodmFyIGMgb2YgdGhpcy5fY2hpbGRyZW4pIHtcclxuICAgICAgICBjLnVwZGF0ZShkZWx0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb250YWlucyhjaGlsZCA6IERyYXdhYmxlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSAhPT0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJlcGFyZShyZW5kZXI6IGdyYXBoaWNzLldlYkdMUmVuZGVyKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9EcmF3YWJsZS50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUub2JqZWN0cyB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBTcHJpdGUgZXh0ZW5kcyBEcmF3YWJsZSB7XHJcblxyXG4gICAgcHVibGljIGZpbHRlciAgICAgOiBncmFwaGljcy5GaWx0ZXI7XHJcbiAgICBwcml2YXRlIF9wb3NpdGlvbiA6IG1hdGguVmVjdG9yMjtcclxuICAgIHB1YmxpYyB0ZXh0dXJlICAgIDogZ3JhcGhpY3MuVGV4dHVyZTtcclxuICAgIHB1YmxpYyBmcmFtZSAgICAgIDogZ3JhcGhpY3MuUmVjdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgICAgdGhpcy5maWx0ZXIgICAgPSBuZS5maWx0ZXJzLlRleHR1cmVGaWx0ZXIuSU5TVEFOQ0U7XHJcbiAgICAgIHRoaXMudGV4dHVyZSAgID0gbnVsbDtcclxuICAgICAgdGhpcy5fcG9zaXRpb24gPSBuZXcgbWF0aC5WZWN0b3IyKCk7XHJcbiAgICAgIHRoaXMuZnJhbWUgICAgID0gbmV3IGdyYXBoaWNzLlJlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcG9zaXRpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIocmVuZGVyOiBncmFwaGljcy5XZWJHTFJlbmRlcikge1xyXG4gICAgICBpZiAoIXRoaXMuaXNEcmF3YWJsZSgpKSByZXR1cm47XHJcbiAgICAgIHRoaXMuX3VzZUZpbHRlcihyZW5kZXIpO1xyXG4gICAgICB0aGlzLnBhcmVudC5wcmVwYXJlKHJlbmRlcik7XHJcbiAgICAgIHRoaXMudGV4dHVyZS5iaW5kKHJlbmRlci5nbCwgdGhpcy5mcmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF91c2VGaWx0ZXIocmVuZGVyOiBncmFwaGljcy5XZWJHTFJlbmRlcikge1xyXG4gICAgICBpZiAodGhpcy5maWx0ZXIpIHtcclxuICAgICAgICB0aGlzLmZpbHRlci51c2UocmVuZGVyLmdsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzRHJhd2FibGUoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZpc2libGUgJiYgKHRoaXMudGV4dHVyZSAhPT0gbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLmdyYXBoaWNzIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIFRleHR1cmUge1xyXG5cclxuICAgIHByaXZhdGUgX3BpeG1hcCAgICA6IFBpeG1hcDtcclxuICAgIHByaXZhdGUgX2dsICAgICAgICA6IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcclxuICAgIHByaXZhdGUgX2dsQnVmZmVyICA6IFdlYkdMUmVuZGVyYnVmZmVyO1xyXG4gICAgcHJpdmF0ZSBfZ2xUZXh0dXJlIDogV2ViR0xUZXh0dXJlO1xyXG4gICAgcHJpdmF0ZSBfYnVmZmVyICAgIDogRmxvYXQzMkFycmF5O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBpeG1hcCA6IFBpeG1hcCkge1xyXG4gICAgICB0aGlzLl9waXhtYXAgICAgPSBwaXhtYXA7XHJcbiAgICAgIHRoaXMuX2dsICAgICAgICA9IG51bGw7XHJcbiAgICAgIHRoaXMuX2dsVGV4dHVyZSA9IG51bGw7XHJcbiAgICAgIHRoaXMuX2dsQnVmZmVyICA9IG51bGw7XHJcbiAgICAgIHRoaXMuX2J1ZmZlciAgICA9IG5ldyBGbG9hdDMyQXJyYXkoMTIpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgIGlmICh0aGlzLl9nbCAhPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lHbFRleHR1cmUoKTtcclxuICAgICAgICB0aGlzLl9kZXN0cm95R2xCdWZmZXIoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2Rlc3Ryb3lHbFRleHR1cmUoKSB7XHJcbiAgICAgIGlmICh0aGlzLl9nbFRleHR1cmUgIT09IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9nbC5kZWxldGVUZXh0dXJlKHRoaXMuX2dsVGV4dHVyZSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fZ2xUZXh0dXJlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kZXN0cm95R2xCdWZmZXIoKSB7XHJcbiAgICAgIGlmICh0aGlzLl9nbEJ1ZmZlciAhPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX2dsLmRlbGV0ZUJ1ZmZlcih0aGlzLl9nbFRleHR1cmUpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX2dsQnVmZmVyID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZShnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgIHRoaXMuX2dsID0gZ2w7XHJcbiAgICAgIHRoaXMuX2dlbmVyYXRlR2xCdWZmZXIoKTtcclxuICAgICAgdGhpcy5fZ2VuZXJhdGVHbFRleHR1cmUoKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX2dsVGV4dHVyZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgaWYgKCF0aGlzLl9nbFRleHR1cmUpIHtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlKGdsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgcmVjdDogUmVjdCkge1xyXG4gICAgICB0aGlzLmNoZWNrKGdsKTtcclxuICAgICAgdGhpcy5fYmluZEdsQnVmZmVyKHRoaXMuX2J1ZmZlciwgcmVjdCk7XHJcbiAgICAgIHRoaXMuX2JpbmRHbFRleHR1cmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kQWxsKHJlY3RzIDogUmVjdFtdKSB7XHJcbiAgICAgIHZhciBidWZmZXIgPSBuZXcgRmxvYXQzMkFycmF5KHJlY3RzLmxlbmd0aCAqIDEyKTtcclxuICAgICAgdmFyIGxlbmd0aCA9IHJlY3RzLmxlbmd0aDtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUmVjdChidWZmZXIsIHJlY3RzW2ldLCBpICogMTIpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX2JpbmRHbFRleHR1cmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZW5lcmF0ZUdsVGV4dHVyZSgpIHtcclxuICAgICAgdmFyIGdsID0gdGhpcy5fZ2w7XHJcbiAgICAgIHRoaXMuX2dsVGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcclxuICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fZ2xUZXh0dXJlKTtcclxuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XHJcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcclxuICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCB0aGlzLl9waXhtYXAuY2FudmFzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZW5lcmF0ZUdsQnVmZmVyKCkge1xyXG4gICAgICB0aGlzLl9nbEJ1ZmZlciA9IHRoaXMuX2dsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2JpbmRHbEJ1ZmZlcihidWZmZXI6IEZsb2F0MzJBcnJheSwgcmVjdDogUmVjdCkge1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZVJlY3QoYnVmZmVyLCByZWN0KTtcclxuICAgICAgdGhpcy5fZ2wuYmluZEJ1ZmZlcih0aGlzLl9nbC5BUlJBWV9CVUZGRVIsIHRoaXMuX2dsQnVmZmVyKTtcclxuICAgICAgdGhpcy5fZ2wuYnVmZmVyRGF0YSh0aGlzLl9nbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlciwgdGhpcy5fZ2wuU1RBVElDX0RSQVcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2JpbmRHbFRleHR1cmUoKSB7XHJcbiAgICAgIHZhciBnbCA9IHRoaXMuX2dsO1xyXG4gICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl9nbFRleHR1cmUpO1xyXG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcclxuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcclxuICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlUmVjdChidWZmZXI6IEZsb2F0MzJBcnJheSwgcmVjdCA6IFJlY3QsIG9mZnNldDogbnVtYmVyID0gMCkge1xyXG4gICAgICB2YXIgeCA9IHJlY3QueCAgICAgIC8gdGhpcy53aWR0aCwgeSA9IHJlY3QueSAgICAgIC8gdGhpcy5oZWlnaHQ7XHJcbiAgICAgIHZhciB3ID0gcmVjdC53aWR0aCAgLyB0aGlzLndpZHRoLCBoID0gcmVjdC5oZWlnaHQgLyB0aGlzLmhlaWdodDtcclxuICAgICAgYnVmZmVyW29mZnNldCArIDBdID0gYnVmZmVyW29mZnNldCArIDRdID0gYnVmZmVyW29mZnNldCArICA2XSA9IHg7XHJcbiAgICAgIGJ1ZmZlcltvZmZzZXQgKyAxXSA9IGJ1ZmZlcltvZmZzZXQgKyAzXSA9IGJ1ZmZlcltvZmZzZXQgKyAgOV0gPSB5O1xyXG4gICAgICBidWZmZXJbb2Zmc2V0ICsgMl0gPSBidWZmZXJbb2Zmc2V0ICsgOF0gPSBidWZmZXJbb2Zmc2V0ICsgMTBdID0gdyArIHg7XHJcbiAgICAgIGJ1ZmZlcltvZmZzZXQgKyA1XSA9IGJ1ZmZlcltvZmZzZXQgKyA3XSA9IGJ1ZmZlcltvZmZzZXQgKyAxMV0gPSBoICsgeTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2lkdGgoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9waXhtYXAud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGhlaWdodCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3BpeG1hcC5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vb2JqZWN0cy9EcmF3YWJsZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL29iamVjdHMvRHJhd2FibGVDb250YWluZXIudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9vYmplY3RzLzJkL1Nwcml0ZS50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3NjZW5lL1NjZW5lLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9ncmFwaGljcy9UZXh0dXJlLnRzXCIvPlxyXG5cclxubW9kdWxlIG5lIHtcclxuXHJcbiAgZXhwb3J0IGNvbnN0IFZFUlNJT04gPSBcIjAuMS4wXCI7XHJcblxyXG4gIC8vIFNob3J0Y3V0cyB0byBtb3N0IGZyZXF1ZW50IGVsZW1lbnRzXHJcbiAgZXhwb3J0IGNvbnN0IERyYXdhYmxlICAgICAgICAgID0gbmUub2JqZWN0cy5EcmF3YWJsZTtcclxuICBleHBvcnQgY29uc3QgRHJhd2FibGVDb250YWluZXIgPSBuZS5vYmplY3RzLkRyYXdhYmxlQ29udGFpbmVyO1xyXG4gIGV4cG9ydCBjb25zdCBWaWV3cG9ydCAgICAgICAgICA9IG5lLm9iamVjdHMuVmlld3BvcnQ7XHJcbiAgZXhwb3J0IGNvbnN0IFNwcml0ZSAgICAgICAgICAgID0gbmUub2JqZWN0cy5TcHJpdGU7XHJcbiAgZXhwb3J0IGNvbnN0IFNjZW5lICAgICAgICAgICAgID0gbmUuc2NlbmUuU2NlbmU7XHJcbiAgZXhwb3J0IGNvbnN0IFRleHR1cmUgICAgICAgICAgID0gbmUuZ3JhcGhpY3MuVGV4dHVyZTtcclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLmF1ZGlvIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIEJ1ZmZlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc3RyZWFtKCk6IFN0cmVhbSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsZW5ndGgoKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0J1ZmZlci50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUuYXVkaW8ge1xyXG5cclxuICBleHBvcnQgY2xhc3MgTGVnYWN5QnVmZmVyIGV4dGVuZHMgQnVmZmVyIHtcclxuXHJcbiAgICBwcml2YXRlIF90YWcgOiBIVE1MQXVkaW9FbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRhZzogSFRNTEF1ZGlvRWxlbWVudCkge1xyXG4gICAgICBzdXBlcigpO1xyXG4gICAgICB0aGlzLl90YWcgPSB0YWc7XHJcbiAgICB9XHJcblxyXG4gICAgc3RyZWFtKCk6IFN0cmVhbSB7XHJcbiAgICAgIHJldHVybiBuZXcgTGVnYWN5U3RyZWFtKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsZW5ndGgoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl90YWcuZHVyYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNyYygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3RhZztcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUuYXVkaW8ge1xyXG5cclxuICBleHBvcnQgY2xhc3MgU3RyZWFtIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5KGxvb3A9ZmFsc2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwb3NpdGlvbigpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBvc2l0aW9uKHZhbHVlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxvb3BTdGFydCgpIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGxvb3BTdGFydCh2YWx1ZSkge1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsb29wRW5kKCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbG9vcEVuZCh2YWx1ZSkge1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5YmFja1JhdGUoKSB7XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwbGF5YmFja1JhdGUodmFsdWUpIHtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9TdHJlYW0udHNcIiAvPlxyXG5cclxubW9kdWxlIG5lLmF1ZGlvIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIExlZ2FjeVN0cmVhbSBleHRlbmRzIFN0cmVhbSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfYnVmZmVyIDogTGVnYWN5QnVmZmVyO1xyXG4gICAgcHJpdmF0ZSBfdGFnICAgIDogSFRNTEF1ZGlvRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihidWZmZXIgOiBMZWdhY3lCdWZmZXIpIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgICAgdGhpcy5fYnVmZmVyICA9IGJ1ZmZlcjtcclxuICAgICAgdGhpcy5fdGFnICAgICA9IDxIVE1MQXVkaW9FbGVtZW50PmJ1ZmZlci5zcmMuY2xvbmVOb2RlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheShsb29wPWZhbHNlKSB7XHJcbiAgICAgIHRoaXMuX3RhZy5sb29wID0gbG9vcDtcclxuICAgICAgdGhpcy5fdGFnLnBsYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCkge1xyXG4gICAgICB0aGlzLl90YWcucGF1c2UoKTtcclxuICAgICAgdGhpcy5fdGFnLmN1cnJlbnRUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgdGhpcy5fdGFnLnBhdXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBvc2l0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fdGFnLmN1cnJlbnRUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwb3NpdGlvbih2YWx1ZSkge1xyXG4gICAgICB0aGlzLl90YWcuY3VycmVudFRpbWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGxheWJhY2tSYXRlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fdGFnLnBsYXliYWNrUmF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcGxheWJhY2tSYXRlKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX3RhZy5wbGF5YmFja1JhdGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9CdWZmZXIudHNcIiAvPlxyXG5cclxubW9kdWxlIG5lLmF1ZGlvIHtcclxuXHJcblxyXG5cclxuICBleHBvcnQgY2xhc3MgV2ViQXVkaW9CdWZmZXIgZXh0ZW5kcyBCdWZmZXIge1xyXG5cclxuICAgIHByaXZhdGUgX2NvbnRleHQgIDogQXVkaW9Db250ZXh0O1xyXG4gICAgcHJpdmF0ZSBfYnVmZmVyICAgOiBBdWRpb0J1ZmZlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBBdWRpb0NvbnRleHQsIGJ1ZmZlciA6IEF1ZGlvQnVmZmVyKSB7XHJcbiAgICAgIHN1cGVyKCk7XHJcbiAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICB0aGlzLl9idWZmZXIgID0gYnVmZmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzcmMoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9idWZmZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RyZWFtKCkge1xyXG4gICAgICByZXR1cm4gbmV3IFdlYkF1ZGlvU3RyZWFtKHRoaXMuX2NvbnRleHQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsZW5ndGgoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9idWZmZXIubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL1N0cmVhbS50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUuYXVkaW8ge1xyXG5cclxuICBleHBvcnQgY2xhc3MgV2ViQXVkaW9TdHJlYW0gZXh0ZW5kcyBTdHJlYW0ge1xyXG5cclxuICAgIHByaXZhdGUgX2NvbnRleHQgICAgICA6IEF1ZGlvQ29udGV4dDtcclxuICAgIHByaXZhdGUgX3NvdXJjZSAgICAgICA6IEF1ZGlvQnVmZmVyU291cmNlTm9kZTtcclxuICAgIHByaXZhdGUgX3Bvc2l0aW9uICAgICA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3BsYXlQb3NpdGlvbiA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3BsYXlUaW1lICAgICA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2J1ZmZlciAgICAgICA6IFdlYkF1ZGlvQnVmZmVyO1xyXG4gICAgcHJpdmF0ZSBfcGxheWJhY2tSYXRlIDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQ6QXVkaW9Db250ZXh0LCBidWZmZXIgOiBXZWJBdWRpb0J1ZmZlcikge1xyXG4gICAgICBzdXBlcigpO1xyXG4gICAgICB0aGlzLl9jb250ZXh0ICAgICAgPSBjb250ZXh0O1xyXG4gICAgICB0aGlzLl9zb3VyY2UgICAgICAgPSBudWxsO1xyXG4gICAgICB0aGlzLl9wb3NpdGlvbiAgICAgPSAwO1xyXG4gICAgICB0aGlzLl9wbGF5VGltZSAgICAgPSAwO1xyXG4gICAgICB0aGlzLl9idWZmZXIgICAgICAgPSBidWZmZXI7XHJcbiAgICAgIHRoaXMuX3BsYXlQb3NpdGlvbiA9IG51bGw7XHJcbiAgICAgIHRoaXMuX3BsYXliYWNrUmF0ZSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheShsb29wPWZhbHNlKSB7XHJcbiAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgdGhpcy5fY3JlYXRlU291cmNlKGxvb3ApO1xyXG4gICAgICB0aGlzLl9wbGF5VGltZSAgICAgPSBEYXRlLm5vdygpO1xyXG4gICAgICB0aGlzLl9wbGF5UG9zaXRpb24gPSB0aGlzLl9wb3NpdGlvbjtcclxuICAgICAgdGhpcy5fc291cmNlLnN0YXJ0KDAsIHRoaXMuX3Bvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jcmVhdGVTb3VyY2UobG9vcDpib29sZWFuKSB7XHJcbiAgICAgIHRoaXMuX3NvdXJjZSA9IHRoaXMuX2NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICAgIHRoaXMuX3NvdXJjZS5idWZmZXIgPSB0aGlzLl9idWZmZXIuc3JjO1xyXG4gICAgICB0aGlzLl9zb3VyY2UubG9vcCA9IGxvb3A7XHJcbiAgICAgIHRoaXMuX3NvdXJjZS5wbGF5YmFja1JhdGUudmFsdWUgPSB0aGlzLl9wbGF5YmFja1JhdGU7XHJcbiAgICAgIHRoaXMuX3NvdXJjZS5jb25uZWN0KHRoaXMuX2NvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKSB7XHJcbiAgICAgIGlmICh0aGlzLl9wbGF5UG9zaXRpb24gPT09IG51bGwpIHJldHVybjtcclxuICAgICAgdGhpcy5fc291cmNlLnN0b3AoKTtcclxuICAgICAgdGhpcy5fc291cmNlLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgdGhpcy5fcG9zaXRpb24gPSAwO1xyXG4gICAgICB0aGlzLl9wbGF5UG9zaXRpb24gPSBudWxsO1xyXG4gICAgICB0aGlzLl9zb3VyY2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICBpZiAodGhpcy5fcGxheVBvc2l0aW9uID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgIHRoaXMuX3NvdXJjZS5zdG9wKCk7XHJcbiAgICAgIHRoaXMuX3NldEN1cnJlbnRQb3NpdGlvbigpO1xyXG4gICAgICB0aGlzLl9zb3VyY2UuZGlzY29ubmVjdCgpO1xyXG4gICAgICB0aGlzLl9wbGF5UG9zaXRpb24gPSBudWxsO1xyXG4gICAgICB0aGlzLl9zb3VyY2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3NldEN1cnJlbnRQb3NpdGlvbigpIHtcclxuICAgICAgdmFyIHBiciA9IHRoaXMuX3NvdXJjZS5wbGF5YmFja1JhdGUudmFsdWUgLyB0aGlzLl9zb3VyY2UucGxheWJhY2tSYXRlLmRlZmF1bHRWYWx1ZTtcclxuICAgICAgdmFyIGQgPSAoRGF0ZS5ub3coKSAtIHRoaXMuX3BsYXlUaW1lKSAqIHBiciArIHRoaXMuX3BsYXlQb3NpdGlvbjtcclxuICAgICAgdmFyIHQgPSBNYXRoLm1heCgxLCB0aGlzLmxvb3BFbmQgLSB0aGlzLmxvb3BTdGFydCk7XHJcbiAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5sb29wU3RhcnQgKyBkICUgdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29udGV4dCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBvc2l0aW9uKCkge1xyXG4gICAgICBpZiAodGhpcy5fcGxheVBvc2l0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0Q3VycmVudFBvc2l0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwb3NpdGlvbih2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xyXG4gICAgICBpZiAodGhpcy5fcGxheVBvc2l0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgdmFyIGxvb3AgPSB0aGlzLl9zb3VyY2UubG9vcDtcclxuICAgICAgICB0aGlzLl9zb3VyY2Uuc3RvcCgpO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZS5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5KGxvb3ApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxvb3BTdGFydCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZS5sb29wU3RhcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGxvb3BTdGFydCh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9zb3VyY2UubG9vcFN0YXJ0ID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxvb3BFbmQoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9zb3VyY2UubG9vcEVuZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbG9vcEVuZCh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9zb3VyY2UubG9vcEVuZCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwbGF5YmFja1JhdGUoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9wbGF5YmFja1JhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBsYXliYWNrUmF0ZSh2YWx1ZSkge1xyXG4gICAgICBpZiAodGhpcy5fc291cmNlKSB7XHJcbiAgICAgICAgdGhpcy5fc291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX3BsYXliYWNrUmF0ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIm1vZHVsZSBuZS5ncmFwaGljcyB7XHJcblxyXG4gIGludGVyZmFjZSBVbmlmb3JtIHtcclxuICAgIFtzIDogc3RyaW5nXTogeyB0eXBlOiBzdHJpbmcsIHZhbHVlOiBhbnkgfTtcclxuICB9XHJcblxyXG4gIGludGVyZmFjZSBVbmZvcm1Mb2NhdGlvbnMge1xyXG4gICAgW3MgOiBzdHJpbmddOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbjtcclxuICB9XHJcblxyXG4gIGludGVyZmFjZSBBdHRyaWJ1dGVMb2NhdGlvbnMge1xyXG4gICAgW3MgOiBzdHJpbmddOiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICBpbnRlcmZhY2UgTG9jYXRpb25zIHtcclxuICAgIHVuaWZvcm1zICA6IFVuZm9ybUxvY2F0aW9ucztcclxuICAgIGF0dHJpYnV0ZXM6IEF0dHJpYnV0ZUxvY2F0aW9ucztcclxuICB9XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBGaWx0ZXIge1xyXG5cclxuICAgIHByaXZhdGUgX2dsICAgICAgICAgOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XHJcbiAgICBwcml2YXRlIF92ZXJ0ZXggICAgIDogU2hhZGVyO1xyXG4gICAgcHJpdmF0ZSBfZnJhZ21lbnQgICA6IFNoYWRlcjtcclxuICAgIHByaXZhdGUgX2F0dHJpYnV0ZXMgOiB7IFtzIDogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgICBwcml2YXRlIF92YXJ5aW5nICAgIDogeyBbcyA6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gICAgcHJpdmF0ZSBfdW5pZm9ybXMgICA6IFVuaWZvcm07XHJcbiAgICBwcml2YXRlIF9nbFByb2dyYW0gIDogV2ViR0xQcm9ncmFtO1xyXG4gICAgcHJpdmF0ZSBfbG9jYXRpb25zICA6IExvY2F0aW9ucztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgdGhpcy5fZ2wgPSBudWxsO1xyXG4gICAgICB0aGlzLl92ZXJ0ZXggPSBuZXcgU2hhZGVyKHRoaXMpO1xyXG4gICAgICB0aGlzLl9mcmFnbWVudCA9IG5ldyBTaGFkZXIodGhpcywgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuX2F0dHJpYnV0ZXMgPSB0aGlzLm1ha2VBdHRyaWJ1dGVzKCk7XHJcbiAgICAgIHRoaXMuX3VuaWZvcm1zICAgPSB0aGlzLl9mb3JtYXRVbmlmb3Jtcyh0aGlzLm1ha2VVbmlmb3JtcygpKTtcclxuICAgICAgdGhpcy5fdmFyeWluZyAgICA9IHRoaXMubWFrZVZhcnlpbmcoKTtcclxuICAgICAgdGhpcy5fZ2xQcm9ncmFtICA9IG51bGw7XHJcbiAgICAgIHRoaXMuX2xvY2F0aW9ucyAgPSB7IHVuaWZvcm1zOiB7fSwgYXR0cmlidXRlczoge30gfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmVydGV4KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fdmVydGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBmcmFnbWVudCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2ZyYWdtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgIGlmICh0aGlzLl9nbCkge1xyXG4gICAgICAgIHRoaXMudmVydGV4LmRlc3Ryb3kodGhpcy5fZ2wpO1xyXG4gICAgICAgIHRoaXMuZnJhZ21lbnQuZGVzdHJveSh0aGlzLl9nbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dsUHJvZ3JhbSkge1xyXG4gICAgICAgICAgdGhpcy5fZ2wuZGVsZXRlUHJvZ3JhbSh0aGlzLl9nbFByb2dyYW0pO1xyXG4gICAgICAgICAgdGhpcy5fZ2xQcm9ncmFtID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtYWtlQXR0cmlidXRlcygpOiB7IFtzIDogc3RyaW5nXTogc3RyaW5nIH0ge1xyXG4gICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZVVuaWZvcm1zKCk6IHsgW3MgOiBzdHJpbmddOiBzdHJpbmcgfSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlVmFyeWluZygpOiB7IFtzIDogc3RyaW5nXTogc3RyaW5nIH0ge1xyXG4gICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcblxyXG4gICAgdXNlKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgaWYgKCF0aGlzLl9nbFByb2dyYW0pIHtcclxuICAgICAgICB0aGlzLl9jb21waWxlKGdsKTtcclxuICAgICAgfVxyXG4gICAgICBnbC51c2VQcm9ncmFtKHRoaXMuX2dsUHJvZ3JhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY29tcGlsZShnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdGhpcy5fZ2wgPSBnbDtcclxuICAgICAgICB0aGlzLl9tYWtlUHJvZ3JhbShnbCk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWFrZVByb2dyYW0oZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgICB0aGlzLl9nbFByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLl9nbFByb2dyYW0sIHRoaXMuX3ZlcnRleC5jb21waWxlKGdsKSk7XHJcbiAgICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLl9nbFByb2dyYW0sIHRoaXMuX2ZyYWdtZW50LmNvbXBpbGUoZ2wpKTtcclxuICAgICAgZ2wubGlua1Byb2dyYW0odGhpcy5fZ2xQcm9ncmFtKTtcclxuICAgICAgdGhpcy5fY2hlY2tQcm9ncmFtKGdsKTtcclxuICAgICAgdGhpcy5fZ2V0TG9jYXRpb25zKGdsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRMb2NhdGlvbnMoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgICB0aGlzLl9nZXRVbmlmb3JtTG9jYXRpb25zKGdsKTtcclxuICAgICAgdGhpcy5fZ2V0QXR0cmlidXRlTG9jYXRpb25zKGdsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRVbmlmb3JtTG9jYXRpb25zKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpIHtcclxuICAgICAgT2JqZWN0LmtleXModGhpcy51bmlmb3JtcykuZm9yRWFjaCh1ID0+IHtcclxuICAgICAgICAgIHRoaXMuX2xvY2F0aW9ucy51bmlmb3Jtc1t1XSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLl9nbFByb2dyYW0sIHUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXRBdHRyaWJ1dGVMb2NhdGlvbnMoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmF0dHJpYnV0ZXMpLmZvckVhY2goYSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9sb2NhdGlvbnMuYXR0cmlidXRlc1thXSA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuX2dsUHJvZ3JhbSwgYSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NoZWNrUHJvZ3JhbShnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgIHZhciBzdWNjZXNzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLl9nbFByb2dyYW0sIGdsLkxJTktfU1RBVFVTKTtcclxuICAgICAgaWYgKCFzdWNjZXNzKSB7XHJcbiAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInByb2dyYW0gZmlsZWQgdG8gbGluazpcIiArIGdsLmdldFByb2dyYW1JbmZvTG9nICh0aGlzLl9nbFByb2dyYW0pKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2Zvcm1hdFVuaWZvcm1zKHUgOiB7IFtzIDogc3RyaW5nXTogc3RyaW5nIH0pIHtcclxuICAgICAgdmFyIHJlc3VsdDogVW5pZm9ybSA9IHt9O1xyXG4gICAgICBPYmplY3Qua2V5cyh1KVxyXG4gICAgICAgIC5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgIHZhciB0eXBlID0gdVtrZXldO1xyXG4gICAgICAgICAgcmVzdWx0W2tleV0gPSB7IHR5cGU6IEZpbHRlci5UWVBFU1t0eXBlXSwgdmFsdWU6IEZpbHRlci5ERUZBVUxUU1t0eXBlXSgpIH07XHJcbiAgICAgICAgfSkgO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1bmlmb3JtcygpOiB7IFtzIDogc3RyaW5nXTogeyB0eXBlOiBzdHJpbmcsIHZhbHVlOiBhbnkgfSB9IHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3VuaWZvcm1zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhdHRyaWJ1dGVzKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFyeWluZygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3Zhcnlpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBUWVBFUyA9IHtcclxuICAgICAgbnVtYmVyOiAnZmxvYXQnLFxyXG4gICAgICBmbG9hdDogICdmbG9hdCcsXHJcbiAgICAgIHZlYzI6ICAgJ3ZlYzInLFxyXG4gICAgICB2ZWMzOiAgICd2ZWMzJyxcclxuICAgICAgdmVjNDogICAndmVjNCcsXHJcbiAgICAgIG1hdDI6ICAgJ21hdDInLFxyXG4gICAgICBtYXQzOiAgICdtYXQzJyxcclxuICAgICAgbWF0NDogICAnbWF0NCcsXHJcbiAgICAgIGNvbG9yOiAgJ3ZlYzQnLFxyXG4gICAgICByZWN0OiAgICd2ZWM0JyxcclxuICAgICAgcG9pbnQ6ICAndmVjMycsXHJcbiAgICAgIHNhbXBsZXIyZDogJ3NhbXBsZXIyZCcsXHJcbiAgICAgIHRleHR1cmU6ICAgJ3NhbXBsZXIyZCdcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIERFRkFVTFRTID0ge1xyXG4gICAgICBudW1iZXI6ICAgICgpID0+IDAsXHJcbiAgICAgIGZsb2F0OiAgICAgKCkgPT4gMCxcclxuICAgICAgbWF0MjogICAgICAoKSA9PiBuZXcgbWF0aC5NYXRyaXgyKCksXHJcbiAgICAgIG1hdDM6ICAgICAgKCkgPT4gbmV3IG1hdGguTWF0cml4MygpLFxyXG4gICAgICBtYXQ0OiAgICAgICgpID0+IG5ldyBtYXRoLk1hdHJpeDQoKSxcclxuICAgICAgdmVjMjogICAgICAoKSA9PiBuZXcgbWF0aC5WZWN0b3IyKCksXHJcbiAgICAgIHZlYzM6ICAgICAgKCkgPT4gbmV3IG1hdGguVmVjdG9yMygpLFxyXG4gICAgICB2ZWM0OiAgICAgICgpID0+IG5ldyBtYXRoLlZlY3RvcjQoKSxcclxuICAgICAgY29sb3I6ICAgICAoKSA9PiBuZXcgQ29sb3IoKSxcclxuICAgICAgcmVjdDogICAgICAoKSA9PiBuZXcgUmVjdCgpLFxyXG4gICAgICBwb2ludDogICAgICgpID0+IG5ldyBQb2ludCgpLFxyXG4gICAgICBzYW1wbGVyMmQ6ICgpID0+IG51bGwsXHJcbiAgICAgIHRleHR1cmU6ICAgKCkgPT4gbnVsbCxcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBVUERBVEUgPSB7XHJcbiAgICAgIG51bWJlcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBsb2NhdGlvbjogV2ViR0xVbmlmb3JtTG9jYXRpb24sIHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBnbC51bmlmb3JtMWYobG9jYXRpb24sIHZhbHVlKTtcclxuICAgICAgfSxcclxuICAgICAgZmxvYXQoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgbG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgZ2wudW5pZm9ybTFmKGxvY2F0aW9uLCB2YWx1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1hdDIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgbG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB2YWx1ZTogbWF0aC5NYXRyaXgyKSB7XHJcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDJmdihsb2NhdGlvbiwgZmFsc2UsIHZhbHVlLmRhdGEpO1xyXG4gICAgICB9LFxyXG4gICAgICBtYXQzKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiwgdmFsdWU6IG1hdGguTWF0cml4Mykge1xyXG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXgzZnYobG9jYXRpb24sIGZhbHNlLCB2YWx1ZS5kYXRhKTtcclxuICAgICAgfSxcclxuICAgICAgbWF0NChnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBsb2NhdGlvbjogV2ViR0xVbmlmb3JtTG9jYXRpb24sIHZhbHVlOiBtYXRoLk1hdHJpeDQpIHtcclxuICAgICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KGxvY2F0aW9uLCBmYWxzZSwgdmFsdWUuZGF0YSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHZlYzIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgbG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB2YWx1ZTogbWF0aC5WZWN0b3IyKSB7XHJcbiAgICAgICAgZ2wudW5pZm9ybTJmdihsb2NhdGlvbiwgdmFsdWUuZGF0YSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHZlYzMoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgbG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB2YWx1ZTogbWF0aC5WZWN0b3IzKSB7XHJcbiAgICAgICAgZ2wudW5pZm9ybTNmdihsb2NhdGlvbiwgdmFsdWUuZGF0YSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHZlYzQoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgbG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB2YWx1ZTogbWF0aC5WZWN0b3I0KSB7XHJcbiAgICAgICAgZ2wudW5pZm9ybTRmdihsb2NhdGlvbiwgdmFsdWUuZGF0YSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGNvbG9yKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiwgdmFsdWU6IG1hdGguVmVjdG9yNCkge1xyXG4gICAgICAgIGdsLnVuaWZvcm00ZnYobG9jYXRpb24sIHZhbHVlLmRhdGEpO1xyXG4gICAgICB9LFxyXG4gICAgICByZWN0KGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiwgdmFsdWU6IG1hdGguVmVjdG9yNCkge1xyXG4gICAgICAgIGdsLnVuaWZvcm00ZnYobG9jYXRpb24sIHZhbHVlLmRhdGEpO1xyXG4gICAgICB9LFxyXG4gICAgICBwb2ludChnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBsb2NhdGlvbjogV2ViR0xVbmlmb3JtTG9jYXRpb24sIHZhbHVlOiBtYXRoLlZlY3RvcjMpIHtcclxuICAgICAgICBnbC51bmlmb3JtM2Z2KGxvY2F0aW9uLCB2YWx1ZS5kYXRhKTtcclxuICAgICAgfSxcclxuICAgICAgc2FtcGxlcjJkKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiwgdmFsdWU6IFRleHR1cmUpIHtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHRleHR1cmUoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCwgbG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB2YWx1ZTogVGV4dHVyZSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG5cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2dyYXBoaWNzL0ZpbHRlci50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUuZmlsdGVycyB7XHJcblxyXG4gIHZhciBpbnN0YW5jZSA6IFRleHR1cmVGaWx0ZXI7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBUZXh0dXJlRmlsdGVyIGV4dGVuZHMgZ3JhcGhpY3MuRmlsdGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgICAgdGhpcy52ZXJ0ZXguc3JjICAgPSAnZ2xfUG9zaXRpb24gID0gdV9tYXRyaXggKiBhX3Bvc2l0aW9uOyc7XHJcbiAgICAgIHRoaXMuZnJhZ21lbnQuc3JjID0gJ2dsX0ZyYWdDb2xvciA9IHZlYzQoMSwgMCwgMCwgMSk7J1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VBdHRyaWJ1dGVzKCk6IHsgW3MgOiBzdHJpbmddOiBzdHJpbmcgfSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgYV9wb3NpdGlvbiA6ICd2ZWM0J1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZVVuaWZvcm1zKCk6IHsgW3MgOiBzdHJpbmddOiBzdHJpbmcgfSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdV9tYXRyaXg6ICdtYXQ0J1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgSU5TVEFOQ0UoKSB7XHJcbiAgICAgIGlmICghaW5zdGFuY2UpIHtcclxuICAgICAgICBpbnN0YW5jZSA9IG5ldyBUZXh0dXJlRmlsdGVyKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUuZ3JhcGhpY3Mge1xyXG5cclxuICBleHBvcnQgY2xhc3MgUmVuZGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9jYW52YXMgOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCAgPSB3aWR0aDtcclxuICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2FudmFzKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY2FudmFzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB3aWR0aCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGVpZ2h0KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY2FudmFzLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKG9iamVjdDogUmVuZGVyT2JqZWN0KSB7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL1JlbmRlci50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUuZ3JhcGhpY3Mge1xyXG5cclxuICBleHBvcnQgY2xhc3MgQ2FudmFzMkRSZW5kZXIgZXh0ZW5kcyBSZW5kZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgOiBHYW1lT3B0aW9ucykge1xyXG4gICAgICBzdXBlcihvcHRpb25zLndpZHRoLCBvcHRpb25zLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLm1hdGgge1xyXG5cclxuICAvLyBuIC0+IFthXSAtPiBbW2FdXVxyXG4gICBleHBvcnQgZnVuY3Rpb24gY29tYmluYXRvcihuOiBudW1iZXIsIGxzdCA6IFN0cmluZ1tdKTogU3RyaW5nW11bXSB7XHJcbiAgICAgcmV0dXJuIG4gPyAoXHJcbiAgICAgICBsc3QubGVuZ3RoID8gY29tYmluYXRvcihuIC0gMSwgbHN0KS5tYXAoZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICAgcmV0dXJuIFtsc3RbMF1dLmNvbmNhdCh0KTtcclxuICAgICAgIH0pLmNvbmNhdChjb21iaW5hdG9yKG4sIGxzdC5zbGljZSgxKSkpIDogW11cclxuICAgICApIDogW1tdXTtcclxuICAgfTtcclxuXHJcbiAgIC8vIElmIG5lZWRlZCwgd2UgY2FuIGRlcml2ZSBhIHNpZ25pZmljYW50bHkgZmFzdGVyIHZlcnNpb24gb2ZcclxuICAgLy8gdGhlIHNpbXBsZSByZWN1cnNpdmUgZnVuY3Rpb24gYWJvdmUgYnkgbWVtb2l6aW5nIGl0XHJcblxyXG4gICAvLyBmIC0+IGZcclxuICAgZnVuY3Rpb24gbWVtb2l6ZWQoZm4pIHtcclxuICAgICB2YXIgbSA9IHt9O1xyXG4gICAgIHJldHVybiBmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyksXHJcbiAgICAgICAgIHN0cktleSA9IGFyZ3Muam9pbignLScpO1xyXG5cclxuICAgICAgIHZhciB2ID0gbVtzdHJLZXldO1xyXG4gICAgICAgaWYgKCd1JyA9PT0gKHR5cGVvZiB2KVswXSlcclxuICAgICAgICAgbVtzdHJLZXldID0gdiA9IGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xyXG4gICAgICAgcmV0dXJuIHY7XHJcbiAgICAgfVxyXG4gICB9XHJcblxyXG4gICAvLyBbbS4ubl1cclxuICAgZnVuY3Rpb24gcmFuZ2UobSwgbikge1xyXG4gICAgIHJldHVybiBBcnJheS5hcHBseShudWxsLCBBcnJheShuIC0gbSArIDEpKS5tYXAoZnVuY3Rpb24gKHgsIGkpIHtcclxuICAgICAgIHJldHVybiBtICsgaTtcclxuICAgICB9KTtcclxuICAgfVxyXG5cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9jb21iaW5hdG9yLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBuZS5tYXRoIHtcclxuXHJcbiAgZnVuY3Rpb24gbWFrZVByb3BlcnR5QWNjZXNzb3Ioc2xpY2U6IFN0cmluZ1tdKSB7XHJcbiAgICB2YXIgbGVuZ3RoID0gc2xpY2UubGVuZ3RoO1xyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBtYXA6IEFycmF5PG51bWJlcj4gPSBzbGljZS5tYXAoIChpKSA9PiB0aGlzWzxzdHJpbmc+aV0gKTtcclxuICAgICAgICByZXR1cm4gbmV3IG5lLm1hdGguVmVjdG9yNChtYXBbMF0sIG1hcFsxXSwgbWFwWzJdIHx8IDAsIG1hcFszXSB8fCAwICk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7ICsraW5kZXgpIHtcclxuICAgICAgICAgIGxldCBwID0gc2xpY2VbaW5kZXhdO1xyXG4gICAgICAgICAgdGhpc1s8c3RyaW5nPnBdID0gdmFsdWVbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuXHJcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG1ha2VQcm9wZXJ0aWVzT2ZTaXplKHJlc3VsdDogUHJvcGVydHlEZXNjcmlwdG9yTWFwLCBwZXJtdXRhdGlvbnM6IFN0cmluZ1tdW10sIGxlbmd0aCkge1xyXG4gICAgcGVybXV0YXRpb25zLmZvckVhY2goKGkpID0+IHtcclxuICAgICAgdmFyIHNsaWNlID0gaS5zbGljZSgwLCBsZW5ndGggKyAxKTtcclxuICAgICAgdmFyIG5hbWUgPSBzbGljZS5qb2luKCcnKTtcclxuICAgICAgaWYgKHR5cGVvZiByZXN1bHRbbmFtZV0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXN1bHRbbmFtZV0gPSBtYWtlUHJvcGVydHlBY2Nlc3NvcihzbGljZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbWFrZVByb3BlcnRpZXMocHJvcGVydGllczogU3RyaW5nW10pOiBQcm9wZXJ0eURlc2NyaXB0b3JNYXAge1xyXG4gICAgdmFyIHJlc3VsdDogUHJvcGVydHlEZXNjcmlwdG9yTWFwID0ge307XHJcbiAgICAvL3ZhciBwZXJtdXRhdGlvbnMgPSBwZXJtdXRhdG9yKHByb3BlcnRpZXMpO1xyXG4gICAgdmFyIHBlcm11dGF0aW9ucyA9IGNvbWJpbmF0b3IocHJvcGVydGllcy5sZW5ndGgsIHByb3BlcnRpZXMpO1xyXG4gICAgZm9yICh2YXIgbGVuZ3RoID0gMTsgbGVuZ3RoIDw9IHByb3BlcnRpZXMubGVuZ3RoOyArK2xlbmd0aCkge1xyXG4gICAgICBtYWtlUHJvcGVydGllc09mU2l6ZShyZXN1bHQsIHBlcm11dGF0aW9ucywgbGVuZ3RoKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHZlY3RvckZpZWxkcyhvYmplY3Q6IGFueSwgLi4ucHJvcGVydGllczogU3RyaW5nW10pIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iamVjdCwgbWFrZVByb3BlcnRpZXMocHJvcGVydGllcykpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLm1hdGgge1xyXG5cclxuICBleHBvcnQgY2xhc3MgVmVjdG9yIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2RhdGE6IEZsb2F0MzJBcnJheTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgIHRoaXMuX2RhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMubGVuZ3RoKTtcclxuICAgICAgdGhpc1swXSA9IHg7XHJcbiAgICAgIHRoaXNbMV0gPSB5O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgICAgZ2V0IGxlbmd0aCgpIHtcclxuICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGRhdGEoKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBbMF0oKTpudW1iZXIge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgWzBdKHZhbHVlOm51bWJlcikge1xyXG4gICAgICAgICAgdGhpcy5fZGF0YVswXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IFsxXSgpOm51bWJlciB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVsxXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBbMV0odmFsdWU6bnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzLl9kYXRhWzFdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgWzJdKCk6bnVtYmVyIHtcclxuICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IFsyXSh2YWx1ZTpudW1iZXIpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgWzNdKCk6bnVtYmVyIHtcclxuICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IFszXSh2YWx1ZTpudW1iZXIpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgeCgpOm51bWJlciB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpc1swXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCB4KHZhbHVlOm51bWJlcikge1xyXG4gICAgICAgICAgdGhpc1swXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHIoKTpudW1iZXIge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXNbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgcih2YWx1ZTpudW1iZXIpIHtcclxuICAgICAgICAgIHRoaXNbMF0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB5KCk6bnVtYmVyIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzWzFdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHkodmFsdWU6bnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzWzFdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgZygpOm51bWJlciB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpc1sxXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBnKHZhbHVlOm51bWJlcikge1xyXG4gICAgICAgICAgdGhpc1sxXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHooKTpudW1iZXIge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXNbMl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgeih2YWx1ZTpudW1iZXIpIHtcclxuICAgICAgICAgIHRoaXNbMl0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBiKCk6bnVtYmVyIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzWzJdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGIodmFsdWU6bnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzWzJdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdygpOm51bWJlciB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpc1szXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCB3KHZhbHVlOm51bWJlcikge1xyXG4gICAgICAgICAgdGhpc1szXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGEoKTpudW1iZXIge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXNbM107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgYSh2YWx1ZTpudW1iZXIpIHtcclxuICAgICAgICAgIHRoaXNbM10gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBzKCk6bnVtYmVyIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHModmFsdWU6bnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzWzBdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgdSgpOm51bWJlciB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpc1swXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCB1KHZhbHVlOm51bWJlcikge1xyXG4gICAgICAgICAgdGhpc1swXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IHQoKTpudW1iZXIge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXNbMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgdCh2YWx1ZTpudW1iZXIpIHtcclxuICAgICAgICAgIHRoaXNbMV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCB2KCk6bnVtYmVyIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzWzFdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHYodmFsdWU6bnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzWzFdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgcCgpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzWzJdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHAodmFsdWU6bnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzWzJdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgcSgpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzWzNdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHEodmFsdWU6bnVtYmVyKSB7XHJcbiAgICAgICAgICB0aGlzWzNdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3ZlY3RvckZpZWxkcy50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL1ZlY3Rvci50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUubWF0aCB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBWZWN0b3IyIGV4dGVuZHMgVmVjdG9yIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4PTAsIHk9MCkge1xyXG4gICAgICBzdXBlcih4LCB5KTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9uZSgpOlZlY3RvcjIge1xyXG4gICAgICB2YXIgdmVjID0gbmV3IFZlY3RvcjIoKTtcclxuICAgICAgcmV0dXJuIHZlYy5jb3B5RnJvbSh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBjb3B5RnJvbSh2ZWM6VmVjdG9yMikge1xyXG4gICAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XHJcbiAgICAgIHZhciBhID0gdGhpcy5kYXRhO1xyXG4gICAgICB2YXIgYiA9IHZlYy5kYXRhO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgYVtpXSA9IGJbaV07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgY29weVRvKHZlYzpWZWN0b3IyKSB7XHJcbiAgICAgIHJldHVybiB2ZWMuY29weUZyb20odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKHZlYykge1xyXG4gICAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XHJcbiAgICAgIHZhciBhID0gdGhpcy5kYXRhO1xyXG4gICAgICB2YXIgYiA9IHZlYy5kYXRhO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgYVtpXSArPSBiW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHN1Yih2ZWMpIHtcclxuICAgICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xyXG4gICAgICB2YXIgYSA9IHRoaXMuZGF0YTtcclxuICAgICAgdmFyIGIgPSB2ZWMuZGF0YTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGFbaV0gLT0gYltpXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBtdWwodmVjKSB7XHJcbiAgICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcclxuICAgICAgdmFyIGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgIHZhciBiID0gdmVjLmRhdGE7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBhW2ldICo9IGJbaV07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZGl2KHZlYykge1xyXG4gICAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XHJcbiAgICAgIHZhciBhID0gdGhpcy5kYXRhO1xyXG4gICAgICB2YXIgYiA9IHZlYy5kYXRhO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgYVtpXSAvPSBiW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZCh2ZWMpIHtcclxuICAgICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xyXG4gICAgICB2YXIgYSA9IHRoaXMuZGF0YTtcclxuICAgICAgdmFyIGIgPSB2ZWMuZGF0YTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGFbaV0gJT0gYltpXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgKHgsIHkpIHtcclxuICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgIGRhdGFbMF0gPSB4O1xyXG4gICAgICBkYXRhWzFdID0geTtcclxuICAgIH1cclxuXHJcbiAgICBub3JtYWxpemUoKSB7XHJcbiAgICAgIHZhciBkYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgICB2YXIgc3VtID0gMDtcclxuICAgICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgc3VtICs9IGRhdGFbaV0gKiBkYXRhW2ldO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciB2ZWMgPSBNYXRoLnNxcnQoc3VtKTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGRhdGFbaV0gPSBkYXRhW2ldIC8gdmVjIHx8IDA7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuICB2ZWN0b3JGaWVsZHMoVmVjdG9yMi5wcm90b3R5cGUsICdzJywgJ3QnLCAncCcsICdxJyk7XHJcbiAgdmVjdG9yRmllbGRzKFZlY3RvcjIucHJvdG90eXBlLCAndScsICd2Jyk7XHJcbiAgdmVjdG9yRmllbGRzKFZlY3RvcjIucHJvdG90eXBlLCAneCcsICd5JywgJ3onLCAndycpO1xyXG4gIHZlY3RvckZpZWxkcyhWZWN0b3IyLnByb3RvdHlwZSwgJ3InLCAnZycsICdiJywgJ2EnKTtcclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vVmVjdG9yMi50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUubWF0aCB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBWZWN0b3IzIGV4dGVuZHMgVmVjdG9yMiB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeD0wLCB5PTAsIHo9MCkge1xyXG4gICAgICBzdXBlcih4LCB5KTtcclxuICAgICAgdGhpc1syXSA9IHo7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxlbmd0aCgpIHtcclxuICAgICAgcmV0dXJuIDM7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvbmUoKTpWZWN0b3IzIHtcclxuICAgICAgdmFyIHZlYyA9IG5ldyBWZWN0b3IzKCk7XHJcbiAgICAgIHJldHVybiB2ZWMuY29weUZyb20odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFsyXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMl07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFsyXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzJdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNldCAoeCwgeSwgej0wKSB7XHJcbiAgICAgIHN1cGVyLnNldCh4LCB5KTtcclxuICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgIGRhdGFbMl0gPSB6O1xyXG4gICAgfVxyXG5cclxuICAgIGNyb3NzKHZlYzpWZWN0b3IzKSB7XHJcbiAgICAgIHZhciBkYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgICB2YXIgdmQgICA9IHZlYy5kYXRhO1xyXG4gICAgICB2YXIgeCA9IGRhdGFbMV0gKiB2ZFsyXSAtIGRhdGFbMl0gKiB2ZFsxXTtcclxuICAgICAgdmFyIHkgPSBkYXRhWzJdICogdmRbMF0gLSBkYXRhWzBdICogdmRbMl07XHJcbiAgICAgIHZhciB6ID0gZGF0YVswXSAqIHZkWzFdIC0gZGF0YVsxXSAqIHZkWzBdO1xyXG4gICAgICBkYXRhWzBdID0geDtcclxuICAgICAgZGF0YVsxXSA9IHk7XHJcbiAgICAgIGRhdGFbMl0gPSB6O1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9WZWN0b3IzLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBuZS5tYXRoIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIFZlY3RvcjQgZXh0ZW5kcyBWZWN0b3IzIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4PTAsIHk9MCwgej0wLCB3PTApIHtcclxuICAgICAgc3VwZXIoeCwgeSwgeik7XHJcbiAgICAgIHRoaXNbM10gPSB3O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsZW5ndGgoKSB7XHJcbiAgICAgIHJldHVybiA0O1xyXG4gICAgfVxyXG5cclxuICAgIGNsb25lKCk6VmVjdG9yNCB7XHJcbiAgICAgIHZhciB2ZWMgPSBuZXcgVmVjdG9yNCgpO1xyXG4gICAgICByZXR1cm4gdmVjLmNvcHlGcm9tKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBbM10oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhWzNdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBbM10odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVszXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCAoeCwgeSwgej0wLCB3PTApIHtcclxuICAgICAgc3VwZXIuc2V0KHgsIHksIHopO1xyXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcclxuICAgICAgZGF0YVsyXSA9IHo7XHJcbiAgICAgIGRhdGFbM10gPSB3O1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9tYXRoL1ZlY3RvcjQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9Db2xvci50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUuZ3JhcGhpY3Mge1xyXG5cclxuICBleHBvcnQgY2xhc3MgQ29sb3JCYXNlIGV4dGVuZHMgbWF0aC5WZWN0b3I0IHtcclxuXHJcbiAgICBnZXQgWzBdKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVswXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgWzBdKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbMF0gPSBNYXRoLm1pbigyNTUsIE1hdGgubWF4KDAsIHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFsxXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMV07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFsxXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzFdID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCB2YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBbMl0oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhWzJdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBbMl0odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVsyXSA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgdmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgWzNdKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVszXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgWzNdKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbM10gPSBNYXRoLm1pbigyNTUsIE1hdGgubWF4KDAsIHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJlZCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcmVkKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuciA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBncmVlbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZ3JlZW4odmFsdWUpIHtcclxuICAgICAgdGhpcy5nID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJsdWUoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGJsdWUodmFsdWUpIHtcclxuICAgICAgdGhpcy5iID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFscGhhKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5hO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBhbHBoYSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLmEgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHVlKCk6bnVtYmVyIHtcclxuICAgICAgcmV0dXJuIHRoaXMudG9Ic2woKVswXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgaHVlKHZhbHVlKSB7XHJcbiAgICAgIHZhciBoc2xhID0gdGhpcy50b0hzbGEoKTtcclxuICAgICAgaHNsYVswXSA9IHZhbHVlO1xyXG4gICAgICB2YXIgYyA9IENvbG9yLmZyb21Ic2xhKGhzbGEpO1xyXG4gICAgICB0aGlzLnNldChjLnJlZCwgYy5ncmVlbiwgYy5ibHVlLCBjLmFscGhhKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2F0dXJhdGlvbigpOm51bWJlciB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRvSHNsKClbMV07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNhdHVyYXRpb24odmFsdWUpIHtcclxuICAgICAgdmFyIGhzbGEgPSB0aGlzLnRvSHNsYSgpO1xyXG4gICAgICBoc2xhWzFdID0gdmFsdWU7XHJcbiAgICAgIHZhciBjID0gQ29sb3IuZnJvbUhzbGEoaHNsYSk7XHJcbiAgICAgIHRoaXMuc2V0KGMucmVkLCBjLmdyZWVuLCBjLmJsdWUsIGMuYWxwaGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsdW1pbmFuY2UoKTpudW1iZXIge1xyXG4gICAgICByZXR1cm4gdGhpcy50b0hzbCgpWzJdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBsdW1pbmFuY2UodmFsdWUpIHtcclxuICAgICAgdmFyIGhzbGEgPSB0aGlzLnRvSHNsYSgpO1xyXG4gICAgICBoc2xhWzJdID0gdmFsdWU7XHJcbiAgICAgIHZhciBjID0gQ29sb3IuZnJvbUhzbGEoaHNsYSk7XHJcbiAgICAgIHRoaXMuc2V0KGMucmVkLCBjLmdyZWVuLCBjLmJsdWUsIGMuYWxwaGEpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0b0hzbGEoKSB7XHJcbiAgICAgIHZhciByID0gdGhpcy5yZWQgLyAyNTUsIGcgPSB0aGlzLmdyZWVuIC8gMjU1LCBiID0gdGhpcy5ibHVlIC8gMjU1O1xyXG4gICAgICB2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYiksIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xyXG4gICAgICB2YXIgaCwgcywgbCA9IChtYXggKyBtaW4pIC8gMjtcclxuICAgICAgaWYgKG1heCA9PSBtaW4pIHtcclxuICAgICAgICAgIGggPSBzID0gMDsgLy8gYWNocm9tYXRpY1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICAgIHZhciBkID0gbWF4IC0gbWluO1xyXG4gICAgICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xyXG4gICAgICAgICAgc3dpdGNoKG1heCl7XHJcbiAgICAgICAgICAgICAgY2FzZSByOiBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7IGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgZzogaCA9IChiIC0gcikgLyBkICsgMjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBiOiBoID0gKHIgLSBnKSAvIGQgKyA0OyBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGggLz0gNjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIFtoLCBzLCBsLCB0aGlzLmFscGhhXTtcclxuICAgIH1cclxuXHJcbiAgICB0b0hzbCgpIHtcclxuICAgICAgdmFyIHIgPSB0aGlzLnJlZCAvIDI1NSwgZyA9IHRoaXMuZ3JlZW4gLyAyNTUsIGIgPSB0aGlzLmJsdWUgLyAyNTU7XHJcbiAgICAgIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKSwgbWluID0gTWF0aC5taW4ociwgZywgYik7XHJcbiAgICAgIHZhciBoLCBzLCBsID0gKG1heCArIG1pbikgLyAyO1xyXG5cclxuICAgICAgaWYobWF4ID09IG1pbil7XHJcbiAgICAgICAgICBoID0gcyA9IDA7IC8vIGFjaHJvbWF0aWNcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgICB2YXIgZCA9IG1heCAtIG1pbjtcclxuICAgICAgICAgIHMgPSBsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKTtcclxuICAgICAgICAgIHN3aXRjaChtYXgpe1xyXG4gICAgICAgICAgICAgIGNhc2UgcjogaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApOyBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIGc6IGggPSAoYiAtIHIpIC8gZCArIDI7IGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgYjogaCA9IChyIC0gZykgLyBkICsgNDsgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBoIC89IDY7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBbaCwgcywgbF07XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vQ29sb3JCYXNlLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBuZS5ncmFwaGljcyB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBDb2xvciBleHRlbmRzIENvbG9yQmFzZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Iocj0wLCBnPTAsIGI9MCwgYT0yNTUpIHtcclxuICAgICAgc3VwZXIociwgZywgYiwgYSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2h1ZTJyZ2IgKHA6bnVtYmVyLCBxOm51bWJlciwgdDpudW1iZXIpIHtcclxuICAgICAgICBpZih0IDwgMCkgdCArPSAxO1xyXG4gICAgICAgIGlmKHQgPiAxKSB0IC09IDE7XHJcbiAgICAgICAgaWYodCA8IDEvNikgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHQ7XHJcbiAgICAgICAgaWYodCA8IDEvMikgcmV0dXJuIHE7XHJcbiAgICAgICAgaWYodCA8IDIvMykgcmV0dXJuIHAgKyAocSAtIHApICogKDIvMyAtIHQpICogNjtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaHNsVG9SZ2IoaDpudW1iZXIsIHM6bnVtYmVyLCBsOm51bWJlciwgYTpudW1iZXIpIHtcclxuICAgICAgdmFyIHIsIGcsIGI7XHJcblxyXG4gICAgICBpZiAocyA9PSAwKSB7XHJcbiAgICAgICAgciA9IGcgPSBiID0gbDsgLy8gYWNocm9tYXRpY1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBxID0gbCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcztcclxuICAgICAgICB2YXIgcCA9IDIgKiBsIC0gcTtcclxuICAgICAgICByID0gdGhpcy5faHVlMnJnYihwLCBxLCBoICsgMS8zKTtcclxuICAgICAgICBnID0gdGhpcy5faHVlMnJnYihwLCBxLCBoKTtcclxuICAgICAgICBiID0gdGhpcy5faHVlMnJnYihwLCBxLCBoIC0gMS8zKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV3IENvbG9yKE1hdGgucm91bmQociAqIDI1NSksIE1hdGgucm91bmQoZyAqIDI1NSksIE1hdGgucm91bmQoYiAqIDI1NSksIGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBmcm9tUmdiYShyZ2JhOm51bWJlcikge1xyXG4gICAgICB2YXIgciA9IChyZ2JhID4+IDI0KSAmJiAweEZGO1xyXG4gICAgICB2YXIgZyA9IChyZ2JhID4+IDE2KSAmJiAweEZGO1xyXG4gICAgICB2YXIgYiA9IChyZ2JhID4+ICA4KSAmJiAweEZGO1xyXG4gICAgICB2YXIgYSA9IChyZ2JhID4+ICAwKSAmJiAweEZGO1xyXG4gICAgICByZXR1cm4gbmV3IENvbG9yKHIsIGcsIGIsIGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBmcm9tUmdiKHJnYjpudW1iZXIpIHtcclxuICAgICAgdmFyIHIgPSAocmdiID4+IDE2KSAmJiAweEZGO1xyXG4gICAgICB2YXIgZyA9IChyZ2IgPj4gIDgpICYmIDB4RkY7XHJcbiAgICAgIHZhciBiID0gKHJnYiA+PiAgMCkgJiYgMHhGRjtcclxuICAgICAgcmV0dXJuIG5ldyBDb2xvcihyLCBnLCBiKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZnJvbUFyZ2IoYXJnYikge1xyXG4gICAgICAgdmFyIGEgPSAoYXJnYiA+PiAyNCkgJiYgMHhGRjtcclxuICAgICAgIHZhciByID0gKGFyZ2IgPj4gMTYpICYmIDB4RkY7XHJcbiAgICAgICB2YXIgZyA9IChhcmdiID4+ICA4KSAmJiAweEZGO1xyXG4gICAgICAgdmFyIGIgPSAoYXJnYiA+PiAgMCkgJiYgMHhGRjtcclxuICAgICAgIHJldHVybiBuZXcgQ29sb3IociwgZywgYiwgYSk7XHJcbiAgICAgfVxyXG5cclxuICAgICBzdGF0aWMgZnJvbUhzbGEoaHNsYTogbnVtYmVyW10pIHtcclxuICAgICAgIHZhciBbaCwgcywgbCwgYV0gPSBoc2xhO1xyXG4gICAgICAgcmV0dXJuIHRoaXMuX2hzbFRvUmdiKGgsIHMsIGwsIGEpO1xyXG4gICAgIH1cclxuXHJcbiAgICAgc3RhdGljIGZyb21Ic2woaHNsOiBudW1iZXJbXSkge1xyXG4gICAgICAgdmFyIFtoLCBzLCBsXSA9IGhzbDtcclxuICAgICAgIHJldHVybiB0aGlzLl9oc2xUb1JnYihoLCBzLCBsLCAyNTUpO1xyXG4gICAgIH1cclxuXHJcbiAgICAgY2xvbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvcih0aGlzLnJlZCwgdGhpcy5ncmVlbiwgdGhpcy5ibHVlLCB0aGlzLmFscGhhKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29tcGxlbWVudCgpIHtcclxuICAgICAgICAgdGhpcy5odWUgPSAoMC41ICsgdGhpcy5odWUpICUgMTtcclxuICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgdG9Dc3MoKSB7XHJcbiAgICAgICAgIHZhciBhID0gdGhpcy5hbHBoYSAvIDI1NTtcclxuICAgICAgICAgcmV0dXJuIGByZ2JhKCR7dGhpcy5yZWR9LCAke3RoaXMuZ3JlZW59LCAke3RoaXMuYmx1ZX0sICR7YX0pYDtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICB0b1N0eWxlKHc6bnVtYmVyLCBoOm51bWJlciwgY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgICAgICAgcmV0dXJuIHRoaXMudG9Dc3MoKTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICB0b0FyZ2IoKSB7XHJcbiAgICAgICAgIHJldHVybiB0aGlzLmFscGhhIDw8IDI0ICsgdGhpcy5yZWQgPDwgMTYgKyB0aGlzLmdyZWVuIDw8IDggKyB0aGlzLmJsdWU7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgdG9SZ2JhKCkge1xyXG4gICAgICAgICByZXR1cm4gdGhpcy5yZWQgPDwgMjQgKyB0aGlzLmdyZWVuIDw8IDE2ICsgdGhpcy5ibHVlIDw8IDggKyB0aGlzLmFscGhhO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHRvUmdiKCkge1xyXG4gICAgICAgICByZXR1cm4gdGhpcy5yZWQgPDwgMTYgKyB0aGlzLmdyZWVuIDw8IDggKyB0aGlzLmJsdWU7XHJcbiAgICAgICB9XHJcblxyXG5cclxuICAgICAgIGdyYXlzY2FsZSgpIHtcclxuICAgICAgICAgdmFyIGF2ZyA9IDAuMjEgKiB0aGlzLnJlZCArIDAuNzIgKiB0aGlzLmdyZWVuICsgMC4wNyAqIHRoaXMuYmx1ZTtcclxuICAgICAgICAgcmV0dXJuIHRoaXMuc2V0KGF2ZywgYXZnLCBhdmcpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIGF2ZXJhZ2UoKSB7XHJcbiAgICAgICAgIHZhciBhdmcgPSAodGhpcy5yZWQgKyB0aGlzLmdyZWVuICsgdGhpcy5ibHVlKSAvIDM7XHJcbiAgICAgICAgIHJldHVybiB0aGlzLnNldChhdmcsIGF2ZywgYXZnKTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICBsaWdodG5lc3NBdmVyYWdlKCkge1xyXG4gICAgICAgICB2YXIgYXJncyA9IFt0aGlzLnJlZCwgdGhpcy5ncmVlbiwgdGhpcy5ibHVlXTtcclxuICAgICAgICAgdmFyIGF2ZyA9ICAoTWF0aC5tYXgoLi4uYXJncykgKyBNYXRoLm1pbiguLi5hcmdzKSkgLyAyO1xyXG4gICAgICAgICByZXR1cm4gdGhpcy5zZXQoYXZnLCBhdmcsIGF2Zyk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgaW52ZXJ0KGFscGhhPWZhbHNlKSB7XHJcbiAgICAgICAgIHZhciBhID0gYWxwaGEgPyAyNTUgLSB0aGlzLmFscGhhIDogdGhpcy5hbHBoYTtcclxuICAgICAgICAgcmV0dXJuIHRoaXMuc2V0KDI1NSAtIHRoaXMucmVkLCAyNTUgLSB0aGlzLmdyZWVuLCAyNTUgLSB0aGlzLmJsdWUsIGEpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHN0YXRpYyBnZXQgV0hJVEUoKSB7XHJcbiAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBCTEFDSygpIHtcclxuICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcigpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHN0YXRpYyBnZXQgUkVEKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKDI1NSwgMCwgMCk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBHUkVFTigpIHtcclxuICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcigwLCAxMjgsIDApO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHN0YXRpYyBnZXQgQkxVRSgpIHtcclxuICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcigwLCAwLCAyNTUpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHN0YXRpYyBnZXQgWUVMTE9XKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKDI1NSwgMjU1LCAwKTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICBzdGF0aWMgZ2V0IE1BR0VOVEEoKSB7XHJcbiAgICAgICAgIHJldHVybiBuZXcgQ29sb3IoMjU1LCAwLCAyNTUpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHN0YXRpYyBnZXQgQ1lBTigpIHtcclxuICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcigwLCAyNTUsIDI1NSk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBHUkFZKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKDEyOCwgMTI4LCAxMjgpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHN0YXRpYyBnZXQgREFSS19HUkFZKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKDE2OSwgMTY5LCAxNjkpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHN0YXRpYyBnZXQgTElHSFRfR1JBWSgpIHtcclxuICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcigyMTEsIDIxMSwgMjExKTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICBzdGF0aWMgZ2V0IE9SQU5HRSgpIHtcclxuICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcigyNTUsIDE2NSwgMCk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBCUk9XTigpIHtcclxuICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcigxNjUsIDQyLCA0Mik7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBMSU1FKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKDAsIDI1NSwgMCk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgc3RhdGljIGdldCBMSUdIVF9CTFVFKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKDE3MywgMjE2LCAyMzApO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHN0YXRpYyBnZXQgUElOSygpIHtcclxuICAgICAgICAgcmV0dXJuIG5ldyBDb2xvcigyNTUsIDE5MiwgMjAzKTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICBzdGF0aWMgZ2V0IFRSQU5TUEFSRU5UKCkge1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKDAsIDAsIDAsIDApO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHN0YXRpYyBnZXQgUkFORE9NKCkge1xyXG4gICAgICAgICB2YXIgciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XHJcbiAgICAgICAgIHZhciBnID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcclxuICAgICAgICAgdmFyIGIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xyXG4gICAgICAgICByZXR1cm4gbmV3IENvbG9yKHIsIGcsIGIpO1xyXG4gICAgICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIm1vZHVsZSBuZS5ncmFwaGljcyB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBGb250IHtcclxuXHJcbiAgICBzdGF0aWMgREVGQVVMVF9TVFJPS0VfU1RZTEUgPSBDb2xvci5UUkFOU1BBUkVOVDtcclxuICAgIHN0YXRpYyBERUZBVUxUX0ZJTExfU1RZTEUgICA9IENvbG9yLkJMQUNLO1xyXG4gICAgc3RhdGljIERFRkFVTFRfU0laRSAgICAgICAgID0gMjQ7XHJcbiAgICBzdGF0aWMgREVGQVVMVF9GQU1JTFkgICAgICAgPSAnbW9ub3NwYWNlJztcclxuXHJcbiAgICBzdHJva2VTdHlsZTogSGFzU3R5bGU7XHJcbiAgICBmaWxsU3R5bGU6ICAgSGFzU3R5bGU7XHJcbiAgICBzaXplOiAgICAgICAgbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSAgICAgX2ZhbWlseTogIHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihmYW1pbHk9IEZvbnQuREVGQVVMVF9GQU1JTFksIHNpemU9Rm9udC5ERUZBVUxUX1NJWkUpIHtcclxuICAgICAgdGhpcy5zdHJva2VTdHlsZSA9IEZvbnQuREVGQVVMVF9TVFJPS0VfU1RZTEU7XHJcbiAgICAgIHRoaXMuZmlsbFN0eWxlICAgPSBGb250LkRFRkFVTFRfRklMTF9TVFlMRTtcclxuICAgICAgdGhpcy5mYW1pbHkgICAgICA9IGZhbWlseTtcclxuICAgICAgdGhpcy5zaXplICAgICAgICA9IHNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZhbWlseSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2ZhbWlseS5zcGxpdCgnICcpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBmYW1pbHkodmFsdWU6c3RyaW5nIHwgc3RyaW5nW10pIHtcclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHRoaXMuX2ZhbWlseSA9IDxzdHJpbmc+dmFsdWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fZmFtaWx5ID0gKDxzdHJpbmdbXT52YWx1ZSkuam9pbignICcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vQ29sb3IudHNcIiAvPlxyXG5cclxubW9kdWxlIG5lLmdyYXBoaWNzIHtcclxuXHJcbiAgZXhwb3J0IGludGVyZmFjZSBDb2xvclN0b3Age1xyXG4gICAgY29sb3I6ICAgQ29sb3I7XHJcbiAgICBwZXJjZW50OiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICBleHBvcnQgY2xhc3MgR3JhZGllbnQge1xyXG5cclxuICAgIHByaXZhdGUgX19zdG9wczogQ29sb3JTdG9wW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHRoaXMuX19zdG9wcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXQgX3N0b3BzKCk6IENvbG9yU3RvcFtdIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3N0b3BzO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZENvbG9yU3RvcChwZXJjZW50Om51bWJlciwgY29sb3I6IENvbG9yKSB7XHJcbiAgICAgIHRoaXMuX3N0b3BzLnB1c2goe2NvbG9yLCBwZXJjZW50fSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHlsZSh3Om51bWJlciwgaDpudW1iZXIsIGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogc3RyaW5nIHwgQ2FudmFzR3JhZGllbnQgfCBDYW52YXNQYXR0ZXJuIHtcclxuICAgICAgdmFyIHN0eWxlID0gdGhpcy5jcmVhdGVHcmFkaWVudCh3LCBoLCBjb250ZXh0KTtcclxuICAgICAgdGhpcy5fc3RvcHMuZm9yRWFjaChmdW5jdGlvbiAoYykge1xyXG4gICAgICAgIHN0eWxlLmFkZENvbG9yU3RvcChjLnBlcmNlbnQsIGMuY29sb3IudG9Dc3MoKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlR3JhZGllbnQodzpudW1iZXIsIGg6bnVtYmVyLCBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IENhbnZhc0dyYWRpZW50IHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vQ29sb3IudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9HcmFkaWVudC50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUuZ3JhcGhpY3Mge1xyXG5cclxuICBleHBvcnQgY2xhc3MgTGluZWFyR3JhZGllbnQgZXh0ZW5kcyBHcmFkaWVudCB7XHJcblxyXG4gICAgYW5nbGU6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhbmdsZTpudW1iZXI9MCkge1xyXG4gICAgICBzdXBlcigpXHJcbiAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVHcmFkaWVudCh3Om51bWJlciwgaDpudW1iZXIsIGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogQ2FudmFzR3JhZGllbnQge1xyXG4gICAgICB2YXIgYSA9IHRoaXMuYW5nbGUgKiBNYXRoLlBJIC8gMTgwO1xyXG4gICAgICB2YXIgcyA9IE1hdGguc2luKGEpO1xyXG4gICAgICB2YXIgYyA9IE1hdGguY29zKGEpO1xyXG4gICAgICB2YXIgeCA9IHcgKiBjICogYyArIGggKiBzICogcztcclxuICAgICAgdmFyIHkgPSBoICogYyAqIGMgKyB3ICogcyAqIHM7XHJcbiAgICAgIHJldHVybiBjb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIm1vZHVsZSBuZS5ncmFwaGljcyB7XHJcblxyXG4gIGV4cG9ydCBtb2R1bGUgUGF0dGVyblJlcGVhdCB7XHJcbiAgICBleHBvcnQgdmFyIEJPVEggPSAncmVwZWF0JztcclxuICAgIGV4cG9ydCB2YXIgWCAgICA9ICdyZXBlYXQteCc7XHJcbiAgICBleHBvcnQgdmFyIFkgICAgPSAncmVwZWF0LXknO1xyXG4gICAgZXhwb3J0IHZhciBOT05FID0gJ25vLXJlcGVhdCc7XHJcbiAgfVxyXG5cclxuICBleHBvcnQgY2xhc3MgUGF0dGVybiB7XHJcblxyXG4gICAgcHVibGljIHBpeG1hcDogUGl4bWFwO1xyXG4gICAgcHVibGljIHJlcGVhdDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBpeG1hcDogUGl4bWFwLCByZXBlYXQ6c3RyaW5nPVBhdHRlcm5SZXBlYXQuQk9USCkge1xyXG4gICAgICB0aGlzLnBpeG1hcCA9IHBpeG1hcDtcclxuICAgICAgdGhpcy5yZXBlYXQgPSByZXBlYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHlsZSh3Om51bWJlciwgaDpudW1iZXIsIGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogc3RyaW5nIHwgQ2FudmFzR3JhZGllbnQgfCBDYW52YXNQYXR0ZXJuIHtcclxuICAgICAgdmFyIHJlcGVhdCA9ICcnO1xyXG4gICAgICBjb250ZXh0LmNyZWF0ZVBhdHRlcm4odGhpcy5waXhtYXAuY2FudmFzLCByZXBlYXQpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUuZ3JhcGhpY3Mge1xyXG5cclxuICBleHBvcnQgY2xhc3MgUGl4bWFwIHtcclxuXHJcbiAgICBwcml2YXRlIF9jYW52YXM6ICBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIHByaXZhdGUgX2NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuXHJcbiAgICBmb250OiBGb250O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XHJcbiAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICB0aGlzLl9jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgdGhpcy5fY29udGV4dCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBmcm9tSW1hZ2UoaW1nOiBIVE1MSW1hZ2VFbGVtZW50KSB7XHJcbiAgICAgIHZhciBweCA9IG5ldyBQaXhtYXAoaW1nLndpZHRoLCBpbWcuaGVpZ2h0KTtcclxuICAgICAgcHguY29udGV4dC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcclxuICAgICAgcmV0dXJuIHB4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjYW52YXMoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jYW52YXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbnRleHQoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB3aWR0aCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGVpZ2h0KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY2FudmFzLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUuZ3JhcGhpY3Mge1xyXG5cclxuICBleHBvcnQgY2xhc3MgUG9pbnQgZXh0ZW5kcyBtYXRoLlZlY3RvcjMge1xyXG5cclxuXHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLmdyYXBoaWNzIHtcclxuXHJcbiAgZXhwb3J0IGRlY2xhcmUgdHlwZSBQb3NpdGlvblZhbHVlID0gKHcsIGgpID0+IG51bWJlcltdO1xyXG5cclxuICBleHBvcnQgbW9kdWxlIFBvc2l0aW9uIHtcclxuICAgIGV4cG9ydCB2YXIgVE9QICAgICAgICAgIDogUG9zaXRpb25WYWx1ZSA9ICh3LCBoKSA9PiBbIHcgLyAyLCAgIDAgICBdO1xyXG4gICAgZXhwb3J0IHZhciBMRUZUICAgICAgICAgOiBQb3NpdGlvblZhbHVlID0gKHcsIGgpID0+IFsgICAwLCAgIGggLyAyIF07XHJcbiAgICBleHBvcnQgdmFyIFJJR0hUICAgICAgICA6IFBvc2l0aW9uVmFsdWUgPSAodywgaCkgPT4gWyAgIHcsICAgaCAvIDIgXTtcclxuICAgIGV4cG9ydCB2YXIgQk9UVE9NICAgICAgIDogUG9zaXRpb25WYWx1ZSA9ICh3LCBoKSA9PiBbIHcgLyAyLCAgIGggICBdO1xyXG4gICAgZXhwb3J0IHZhciBUT1BfTEVGVCAgICAgOiBQb3NpdGlvblZhbHVlID0gKHcsIGgpID0+IFsgICAwLCAgICAgMCAgIF07XHJcbiAgICBleHBvcnQgdmFyIFRPUF9SSUdIVCAgICA6IFBvc2l0aW9uVmFsdWUgPSAodywgaCkgPT4gWyAgIHcsICAgICAwICAgXTtcclxuICAgIGV4cG9ydCB2YXIgQk9UVE9NX0xFRlQgIDogUG9zaXRpb25WYWx1ZSA9ICh3LCBoKSA9PiBbICAgMCwgICAgIGggICBdO1xyXG4gICAgZXhwb3J0IHZhciBCT1RUT01fUklHSFQgOiBQb3NpdGlvblZhbHVlID0gKHcsIGgpID0+IFsgICB3LCAgICAgaCAgIF07XHJcbiAgICBleHBvcnQgdmFyIE1JRERMRSAgICAgICA6IFBvc2l0aW9uVmFsdWUgPSAodywgaCkgPT4gWyB3IC8gMiwgaCAvIDIgXTtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gcGVyY2VudCh4Om51bWJlciwgeTpudW1iZXIpOiBQb3NpdGlvblZhbHVlIHtcclxuICAgICAgcmV0dXJuICh3LCBoKSA9PiBbdyAqIHgsIGggKiB5XTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gYWJzb2x1dGUoeDpudW1iZXIsIHk6bnVtYmVyKTogUG9zaXRpb25WYWx1ZSB7XHJcbiAgICAgIHJldHVybiAodywgaCkgPT4gW3gsIHldO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL0NvbG9yLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vR3JhZGllbnQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9Qb3NpdGlvbi50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUuZ3JhcGhpY3Mge1xyXG5cclxuICBleHBvcnQgY2xhc3MgUmFkaWFsR3JhZGllbnQgZXh0ZW5kcyBHcmFkaWVudCB7XHJcblxyXG4gICAgc3RhcnRSYWRpdXM6IG51bWJlcjtcclxuICAgIGVuZFJhZGl1czogICBudW1iZXI7XHJcbiAgICBwb3NpdGlvbjogICAgUG9zaXRpb25WYWx1ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdGFydFJhZGl1cz0wLCBlbmRSYWRpdXM9MSwgcG9zaXRpb24gPSBQb3NpdGlvbi5NSURETEUpIHtcclxuICAgICAgc3VwZXIoKVxyXG4gICAgICB0aGlzLnN0YXJ0UmFkaXVzID0gc3RhcnRSYWRpdXM7XHJcbiAgICAgIHRoaXMuZW5kUmFkaXVzICAgPSBlbmRSYWRpdXM7XHJcbiAgICAgIHRoaXMucG9zaXRpb24gICAgPSBwb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVHcmFkaWVudCh3Om51bWJlciwgaDpudW1iZXIsIGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogQ2FudmFzR3JhZGllbnQge1xyXG4gICAgICB2YXIgW3gsIHldID0gdGhpcy5wb3NpdGlvbih3LCBoKTtcclxuICAgICAgcmV0dXJuIGNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQoeCwgeSwgdGhpcy5zdGFydFJhZGl1cyAqIHgsIHcsIGgsIHRoaXMuZW5kUmFkaXVzICogeSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QW5nbGUoKSB7XHJcbiAgICAgIHN3aXRjaCAoUG9zaXRpb24pIHtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL21hdGgvVmVjdG9yNC50c1wiIC8+XHJcblxyXG5tb2R1bGUgbmUuZ3JhcGhpY3Mge1xyXG5cclxuICBleHBvcnQgY2xhc3MgUmVjdCBleHRlbmRzIG1hdGguVmVjdG9yNCB7XHJcblxyXG4gICAgZ2V0IHooKSB7XHJcbiAgICAgIHJldHVybiB0aGlzWzNdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB6KHZhbHVlKSB7XHJcbiAgICAgIHRoaXNbM10gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdygpIHtcclxuICAgICAgcmV0dXJuIHRoaXNbMl07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHcodmFsdWUpIHtcclxuICAgICAgdGhpc1syXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBoKCkge1xyXG4gICAgICByZXR1cm4gdGhpc1szXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgaCh2YWx1ZSkge1xyXG4gICAgICB0aGlzWzNdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHdpZHRoKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy53O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB3aWR0aCh2YWx1ZSkge1xyXG4gICAgICB0aGlzLncgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaGVpZ2h0KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5oO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBoZWlnaHQodmFsdWUpIHtcclxuICAgICAgdGhpcy5oID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvbmUoKSB7XHJcbiAgICAgIHJldHVybiBuZXcgUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53LCB0aGlzLmgpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIG1hdGgudmVjdG9yRmllbGRzKFJlY3QucHJvdG90eXBlLCAneCcsICd5JywgJ3cnLCAnaCcpO1xyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUuZ3JhcGhpY3Mge1xyXG5cclxuICBleHBvcnQgY2xhc3MgU2hhZGVyIHtcclxuXHJcbiAgICBwdWJsaWMgc3JjICAgICAgICA6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2dsU2hhZGVyIDogV2ViR0xTaGFkZXI7XHJcbiAgICBwcml2YXRlIF9mcmFnbWVudCA6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9maWx0ZXIgICA6IEZpbHRlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihmaWx0ZXI6IEZpbHRlciwgZnJhZ21lbnQ9ZmFsc2UpIHtcclxuICAgICAgdGhpcy5zcmMgPSAnJztcclxuICAgICAgdGhpcy5fZ2xTaGFkZXIgPSBudWxsO1xyXG4gICAgICB0aGlzLl9mcmFnbWVudCA9IGZyYWdtZW50O1xyXG4gICAgICB0aGlzLl9maWx0ZXIgICA9IGZpbHRlcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZnJhZ21lbnQoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9mcmFnbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZ2VuZXJhdGVkU291cmNlKCkge1xyXG4gICAgICB2YXIgaGVhZCA9IHRoaXMuX21ha2VIZWFkKCk7XHJcbiAgICAgIHZhciB2YXJzID0gdGhpcy5fbWFrZVZhcmlhYmxlcygpO1xyXG4gICAgICByZXR1cm4gYCR7aGVhZH0ke3ZhcnN9XFxudm9pZCBtYWluKHZvaWQpIHtcXG4keyB0aGlzLnNyYyB9XFxufWA7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveShnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgIGlmICh0aGlzLl9nbFNoYWRlcikge1xyXG4gICAgICAgIGdsLmRlbGV0ZVNoYWRlcih0aGlzLl9nbFNoYWRlcik7XHJcbiAgICAgICAgdGhpcy5fZ2xTaGFkZXIgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcGlsZShnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XHJcbiAgICAgIGlmICh0aGlzLl9nbFNoYWRlciA9PT0gbnVsbCkge1xyXG4gICAgICAgIHZhciB0eXBlID0gdGhpcy5mcmFnbWVudCA/IGdsLkZSQUdNRU5UX1NIQURFUiA6IGdsLlZFUlRFWF9TSEFERVI7XHJcbiAgICAgICAgdGhpcy5fZ2xTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XHJcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHRoaXMuX2dsU2hhZGVyLCB0aGlzLmdlbmVyYXRlZFNvdXJjZSk7XHJcbiAgICAgICAgZ2wuY29tcGlsZVNoYWRlcih0aGlzLl9nbFNoYWRlcik7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fdmFsaWRhdGVTaGFkZXIoZ2wpO1xyXG4gICAgICByZXR1cm4gdGhpcy5fZ2xTaGFkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdmFsaWRhdGVTaGFkZXIoZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgICB2YXIgc3VjY2VzcyA9IGdsLmdldFNoYWRlclBhcmFtZXRlcih0aGlzLl9nbFNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpO1xyXG4gICAgICBpZiAoIXN1Y2Nlc3MpIHtcclxuICAgICAgICAvLyBTb21ldGhpbmcgd2VudCB3cm9uZyBkdXJpbmcgY29tcGlsYXRpb247IGdldCB0aGUgZXJyb3JcclxuICAgICAgICB2YXIgaW5mbyA9IGdsLmdldFNoYWRlckluZm9Mb2codGhpcy5fZ2xTaGFkZXIpO1xyXG4gICAgICAgIHZhciBzb3VyY2UgPSB0aGlzLmdlbmVyYXRlZFNvdXJjZTtcclxuICAgICAgICB2YXIgZXJyID0gYENvdWxkIG5vdCBjb21waWxlIHNoYWRlcjogJHtpbmZvfVxcblNvdXJjZTpcXG4ke3NvdXJjZX1gO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveShnbCk7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9tYWtlSGVhZCgpIHtcclxuICAgICAgcmV0dXJuICdwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXG4nO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21ha2VWYXJpYWJsZXMoKSB7XHJcbiAgICAgIGlmICh0aGlzLmZyYWdtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcEZyYWdtZW50VmFyaWFibGVzKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuX21hcFZlcnRleFZhcmlhYmxlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21hcEF0dHJpYnV0ZXMoKSB7XHJcbiAgICAgIHZhciBhdHRyID0gdGhpcy5fZmlsdGVyLmF0dHJpYnV0ZXM7XHJcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhhdHRyKVxyXG4gICAgICAgIC5tYXAoKGspID0+IHtcclxuICAgICAgICAgIHJldHVybiBgJHthdHRyW2tdfSAke2t9O2A7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuam9pbignXFxuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWFwVW5pZm9ybXMoKSB7XHJcbiAgICAgIHZhciBhdHRyID0gdGhpcy5fZmlsdGVyLnVuaWZvcm1zO1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoYXR0cilcclxuICAgICAgICAubWFwKChrKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gYCR7YXR0cltrXS50eXBlfSAke2t9O2A7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuam9pbignXFxuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWFwVmFyeWluZygpIHtcclxuICAgICAgdmFyIGF0dHIgPSB0aGlzLl9maWx0ZXIudmFyeWluZztcclxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGF0dHIpXHJcbiAgICAgICAgLm1hcCgoaykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGAke2F0dHJba119ICR7a307YDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5qb2luKCdcXG4nKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9tYXBWZXJ0ZXhWYXJpYWJsZXMoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9tYXBBdHRyaWJ1dGVzKCkgKyB0aGlzLl9tYXBVbmlmb3JtcygpICsgdGhpcy5fbWFwVmFyeWluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21hcEZyYWdtZW50VmFyaWFibGVzKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fbWFwVW5pZm9ybXMoKSArIHRoaXMuX21hcFZhcnlpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUuZ3JhcGhpY3Mge1xyXG5cclxuICBleHBvcnQgY2xhc3MgVG9uZSBleHRlbmRzIG1hdGguVmVjdG9yNCB7XHJcblxyXG4gICAgZ2V0IFswXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFswXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzBdID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgtMjU1LCB2YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBbMV0oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBbMV0odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVsxXSA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoLTI1NSwgdmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgWzJdKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVsyXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgWzJdKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbMl0gPSBNYXRoLm1pbigyNTUsIE1hdGgubWF4KC0yNTUsIHZhbHVlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFszXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbM107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJlZCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcmVkKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuciA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBncmVlbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZ3JlZW4odmFsdWUpIHtcclxuICAgICAgdGhpcy5nID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGJsdWUoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGJsdWUodmFsdWUpIHtcclxuICAgICAgdGhpcy5iID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGdyYXkoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGdyYXkodmFsdWUpIHtcclxuICAgICAgdGhpcy5hID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGdyZXkoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGdyZXkodmFsdWUpIHtcclxuICAgICAgdGhpcy5hID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFszXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzNdID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCB2YWx1ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgUkFORE9NKCkge1xyXG4gICAgICB2YXIgcmVkICAgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1MTIgLSAyNTUpO1xyXG4gICAgICB2YXIgZ3JlZW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1MTIgLSAyNTUpO1xyXG4gICAgICB2YXIgYmx1ZSAgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1MTIgLSAyNTUpO1xyXG4gICAgICB2YXIgZ3JheSAgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpO1xyXG4gICAgICByZXR1cm4gbmV3IFRvbmUocmVkLCBncmVlbiwgYmx1ZSwgZ3JheSk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vUmVuZGVyLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBuZS5ncmFwaGljcyB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBXZWJHTFJlbmRlciBleHRlbmRzIFJlbmRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcclxuICAgIHByaXZhdGUgX2J1ZmZlciA6IFdlYkdMQnVmZmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgOiBHYW1lT3B0aW9ucykge1xyXG4gICAgICBzdXBlcihvcHRpb25zLndpZHRoLCBvcHRpb25zLmhlaWdodCk7XHJcbiAgICAgIHRoaXMuX2NyZWF0ZUNvbnRleHQoKTtcclxuICAgICAgdGhpcy5fY3JlYXRlQnVmZmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY3JlYXRlQ29udGV4dCgpIHtcclxuICAgICAgdGhpcy5fZ2wgPSA8V2ViR0xSZW5kZXJpbmdDb250ZXh0PnRoaXMuY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJyk7XHJcbiAgICAgIGlmICghdGhpcy5fZ2wpIHtcclxuICAgICAgICB0aGlzLl9nbCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5fZ2wpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3VyIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IFdlYkdMLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NyZWF0ZUJ1ZmZlcigpIHtcclxuICAgICAgdGhpcy5fYnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZ2woKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9nbDtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIob2JqZWN0OiBSZW5kZXJPYmplY3QpIHtcclxuICAgICAgb2JqZWN0LnJlbmRlcih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcmVwYXJlUmVjdEJ1ZmZlcihyZWN0IDogZ3JhcGhpY3MuUmVjdCkge1xyXG4gICAgICB2YXIgeDEgPSByZWN0Lng7XHJcbiAgICAgIHZhciB4MiA9IHJlY3QueCArIHJlY3Qud2lkdGg7XHJcbiAgICAgIHZhciB5MSA9IHJlY3QueTtcclxuICAgICAgdmFyIHkyID0gcmVjdC55ICsgcmVjdC5oZWlnaHQ7XHJcbiAgICAgIHZhciBkYXRhID0gbmV3IEZsb2F0MzJBcnJheShbIHgxLCB5MSwgeDIsIHkxLCB4MSwgeTIsIHgxLCB5MiwgeDIsIHkxLCB4MiwgeTIgXSk7XHJcbiAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgdGhpcy5fYnVmZmVyKTtcclxuICAgICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBkYXRhLCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUubWF0aCB7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBNYXRyaXgyIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2RhdGE6IEZsb2F0MzJBcnJheTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgdGhpcy5fZGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd2lkdGgoKSB7XHJcbiAgICAgIHJldHVybiAyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBoZWlnaHQoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLndpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkYXRhKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRbJzAnXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WycwJ10odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVswXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFsnMSddKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVsxXTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRbJzEnXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzFdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WycyJ10oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhWzJdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFsnMiddKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbMl0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRbJzMnXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbM107XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WyczJ10odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVszXSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGF0KHg6bnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgcmV0dXJuIHRoaXNbeCAlIHRoaXMud2lkdGggKyBNYXRoLmZsb29yKHkgLyB0aGlzLndpZHRoKV07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0KHg6bnVtYmVyLCB5OiBudW1iZXIsIHZhbHVlOm51bWJlcikge1xyXG4gICAgICB0aGlzW3ggJSB0aGlzLndpZHRoICsgTWF0aC5mbG9vcih5IC8gdGhpcy53aWR0aCldID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29weUZyb20obWF0Ok1hdHJpeDIpIHtcclxuICAgICAgdmFyIGxlbmd0aCA9IHRoaXMud2lkdGggKiB0aGlzLmhlaWdodDtcclxuICAgICAgdmFyIGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgIHZhciBiID0gbWF0LmRhdGE7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBhW2ldID0gYltpXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBjb3B5VG8obWF0Ok1hdHJpeDIpIHtcclxuICAgICAgcmV0dXJuIG1hdC5jb3B5RnJvbSh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IElERU5USVRZKCkge1xyXG4gICAgICB2YXIgbWF0ID0gbmV3IE1hdHJpeDIoKTtcclxuICAgICAgbWF0WzBdID0gbWF0WzNdID0gMTtcclxuICAgICAgcmV0dXJuIG1hdDtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9NYXRyaXgyLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBuZS5tYXRoIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIE1hdHJpeDMgZXh0ZW5kcyBNYXRyaXgyIHtcclxuXHJcbiAgICBnZXRbJzQnXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbNF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Wyc0J10odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVs0XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFsnNSddKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVs1XTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRbJzUnXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzVdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Wyc2J10oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kYXRhWzZdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFsnNiddKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbNl0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRbJzcnXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbN107XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Wyc3J10odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVs3XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIG11bChvdGhlcjpNYXRyaXgzKSB7XHJcbiAgICAgIHZhciBhID0gdGhpcy5kYXRhO1xyXG4gICAgICB2YXIgYiA9IG90aGVyLmRhdGE7XHJcbiAgICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdO1xyXG4gICAgICB2YXIgYTEwID0gYVszXSwgYTExID0gYVs0XSwgYTEyID0gYVs1XTtcclxuICAgICAgdmFyIGEyMCA9IGFbNl0sIGEyMSA9IGFbN10sIGEyMiA9IGFbOF07XHJcbiAgICAgIHZhciBiMDAgPSBiWzBdLCBiMDEgPSBiWzFdLCBiMDIgPSBiWzJdO1xyXG4gICAgICB2YXIgYjEwID0gYlszXSwgYjExID0gYls0XSwgYjEyID0gYls1XTtcclxuICAgICAgdmFyIGIyMCA9IGJbNl0sIGIyMSA9IGJbN10sIGIyMiA9IGJbOF07XHJcbiAgICAgIGFbMF0gPSBhMDAgKiBiMDAgKyBhMDEgKiBiMTAgKyBhMDIgKiBiMjA7XHJcbiAgICAgIGFbMV0gPSBhMDAgKiBiMDEgKyBhMDEgKiBiMTEgKyBhMDIgKiBiMjE7XHJcbiAgICAgIGFbMl0gPSBhMDAgKiBiMDIgKyBhMDEgKiBiMTIgKyBhMDIgKiBiMjI7XHJcbiAgICAgIGFbM10gPSBhMTAgKiBiMDAgKyBhMTEgKiBiMTAgKyBhMTIgKiBiMjA7XHJcbiAgICAgIGFbNF0gPSBhMTAgKiBiMDEgKyBhMTEgKiBiMTEgKyBhMTIgKiBiMjE7XHJcbiAgICAgIGFbNV0gPSBhMTAgKiBiMDIgKyBhMTEgKiBiMTIgKyBhMTIgKiBiMjI7XHJcbiAgICAgIGFbNl0gPSBhMjAgKiBiMDAgKyBhMjEgKiBiMTAgKyBhMjIgKiBiMjA7XHJcbiAgICAgIGFbN10gPSBhMjAgKiBiMDEgKyBhMjEgKiBiMTEgKyBhMjIgKiBiMjE7XHJcbiAgICAgIGFbOF0gPSBhMjAgKiBiMDIgKyBhMjEgKiBiMTIgKyBhMjIgKiBiMjI7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zbGF0ZSh4Om51bWJlciwgeTpudW1iZXIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubXVsKE1hdHJpeDMudHJhbnNsYXRpb24oeCwgeSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJvdGF0ZShhbmdsZTpudW1iZXIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubXVsKE1hdHJpeDMucm90YXRpb24oYW5nbGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBzY2FsZSh4Om51bWJlciwgeTpudW1iZXIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubXVsKE1hdHJpeDMuc2NhbGUoeCwgeSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgSURFTlRJVFkoKSB7XHJcbiAgICAgIHZhciBtYXQgPSBuZXcgTWF0cml4MygpO1xyXG4gICAgICB2YXIgZGF0YSA9IG1hdC5kYXRhO1xyXG4gICAgICBkYXRhWzBdID0gZGF0YVs0XSA9IGRhdGFbOF0gPSAxO1xyXG4gICAgICByZXR1cm4gbWF0O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0cmFuc2xhdGlvbih4Om51bWJlciwgeTpudW1iZXIpIHtcclxuICAgICAgdmFyIG1hdCA9IG5ldyBNYXRyaXgzKCk7XHJcbiAgICAgIHZhciBkYXRhID0gbWF0LmRhdGE7XHJcbiAgICAgIGRhdGFbMF0gPSBkYXRhWzRdID0gZGF0YVs4XSA9IDE7XHJcbiAgICAgIGRhdGFbNl0gPSB4O1xyXG4gICAgICBkYXRhWzddID0geTtcclxuICAgICAgcmV0dXJuIG1hdDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcm90YXRpb24oYW5nbGU6bnVtYmVyKSB7XHJcbiAgICAgIHZhciBtYXQgPSBuZXcgTWF0cml4MygpO1xyXG4gICAgICB2YXIgZGF0YSA9IG1hdC5kYXRhO1xyXG4gICAgICB2YXIgYyA9IE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgdmFyIHMgPSBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICAgIGRhdGFbMF0gPSBkYXRhWzRdID0gYztcclxuICAgICAgZGF0YVsxXSA9IC1zO1xyXG4gICAgICBkYXRhWzNdID0gcztcclxuICAgICAgZGF0YVs4XSA9IDE7XHJcbiAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNjYWxlKHg6bnVtYmVyLCB5Om51bWJlcikge1xyXG4gICAgICB2YXIgbWF0ID0gbmV3IE1hdHJpeDMoKTtcclxuICAgICAgdmFyIGRhdGEgPSBtYXQuZGF0YTtcclxuICAgICAgZGF0YVswXSA9IHg7XHJcbiAgICAgIGRhdGFbNF0gPSB5O1xyXG4gICAgICBkYXRhWzhdID0gMTtcclxuICAgICAgcmV0dXJuIG1hdDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcHJvamVjdGlvbih3Om51bWJlciwgaDpudW1iZXIpIHtcclxuICAgICAgdmFyIG1hdCA9IG5ldyBNYXRyaXgzKCk7XHJcbiAgICAgIHZhciBkYXRhID0gbWF0LmRhdGE7XHJcbiAgICAgIGRhdGFbMF0gPSAyIC8gdztcclxuICAgICAgZGF0YVs0XSA9IC0yIC8gaDtcclxuICAgICAgZGF0YVs2XSA9IC0xO1xyXG4gICAgICBkYXRhWzddID0gbWF0WzhdID0gMTtcclxuICAgICAgcmV0dXJuIG1hdDtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9NYXRyaXgzLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBuZS5tYXRoIHtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIE1hdHJpeDQgZXh0ZW5kcyBNYXRyaXgzIHtcclxuXHJcbiAgICBnZXRbJzgnXSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbOF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Wyc4J10odmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0YVs4XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFsnOSddKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVs5XTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRbJzknXSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kYXRhWzldID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WycxMCddKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVsxMF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WycxMCddKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbMTBdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WycxMSddKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVsxMV07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WycxMSddKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbMTFdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WycxMiddKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVsxMl07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WycxMiddKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbMTJdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WycxMyddKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVsxM107XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WycxMyddKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbMTNdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WycxNCddKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVsxNF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WycxNCddKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbMTRdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WycxNSddKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGF0YVsxNV07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WycxNSddKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFbMTVdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBJREVOVElUWSgpIHtcclxuICAgICAgdmFyIG1hdCA9IG5ldyBNYXRyaXg0KCk7XHJcbiAgICAgIHZhciBkYXRhID0gbWF0LmRhdGE7XHJcbiAgICAgIGRhdGFbMF0gPSBkYXRhWzVdID0gZGF0YVsxMF0gPSBkYXRhWzE1XSA9IDE7XHJcbiAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHRyYW5zbGF0aW9uKHg6bnVtYmVyLCB5Om51bWJlciwgejpudW1iZXI9MCkge1xyXG4gICAgICB2YXIgbWF0ID0gdGhpcy5JREVOVElUWTtcclxuICAgICAgdmFyIGRhdGEgPSBtYXQuZGF0YTtcclxuICAgICAgZGF0YVsxMl0gPSB4O1xyXG4gICAgICBkYXRhWzEzXSA9IHk7XHJcbiAgICAgIGRhdGFbMTRdID0gejtcclxuICAgICAgcmV0dXJuIG1hdDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgeFJvdGF0aW9uKGFuZ2xlOm51bWJlcikge1xyXG4gICAgICB2YXIgYyAgICA9IE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgdmFyIHMgICAgPSBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICAgIHZhciBtYXQgID0gdGhpcy5JREVOVElUWTtcclxuICAgICAgdmFyIGRhdGEgPSBtYXQuZGF0YTtcclxuICAgICAgZGF0YVs1XSAgPSBkYXRhWzEwXSA9IGM7XHJcbiAgICAgIGRhdGFbNl0gID0gcztcclxuICAgICAgZGF0YVs5XSAgPSAtcztcclxuICAgICAgcmV0dXJuIG1hdDtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHlSb3RhdGlvbihhbmdsZTpudW1iZXIpIHtcclxuICAgICAgdmFyIGMgPSBNYXRoLmNvcyhhbmdsZSk7XHJcbiAgICAgIHZhciBzID0gTWF0aC5zaW4oYW5nbGUpO1xyXG4gICAgICB2YXIgbWF0ICA9IHRoaXMuSURFTlRJVFk7XHJcbiAgICAgIHZhciBkYXRhID0gbWF0LmRhdGE7XHJcbiAgICAgIGRhdGFbMF0gID0gYztcclxuICAgICAgZGF0YVsyXSAgPSAtcztcclxuICAgICAgZGF0YVs4XSAgPSBzO1xyXG4gICAgICBkYXRhWzEwXSA9IGM7XHJcbiAgICAgIHJldHVybiBtYXQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyB6Um90YXRpb24gKGFuZ2xlOm51bWJlcikge1xyXG4gICAgICB2YXIgYyA9IE1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgdmFyIHMgPSBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICAgIHZhciBtYXQgID0gdGhpcy5JREVOVElUWTtcclxuICAgICAgdmFyIGRhdGEgPSBtYXQuZGF0YTtcclxuICAgICAgZGF0YVswXSA9IGRhdGFbNV0gPSBjO1xyXG4gICAgICBkYXRhWzFdID0gcztcclxuICAgICAgZGF0YVs0XSA9IC1zO1xyXG4gICAgICByZXR1cm4gbWF0O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByb3RhdGlvbihhbmdsZTpudW1iZXIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuelJvdGF0aW9uKGFuZ2xlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2NhbGUoeDpudW1iZXIsIHk6bnVtYmVyLCB6PTEpIHtcclxuICAgICAgdmFyIG1hdCAgPSB0aGlzLklERU5USVRZO1xyXG4gICAgICB2YXIgZGF0YSA9IG1hdC5kYXRhO1xyXG4gICAgICBkYXRhWzBdICA9IHg7XHJcbiAgICAgIGRhdGFbNV0gID0geTtcclxuICAgICAgZGF0YVsxMF0gPSB6O1xyXG4gICAgICByZXR1cm4gbWF0O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjYW1lcmEoY2FtOiBuZS5zY2VuZS5DYW1lcmEpIHtcclxuICAgICAgICB2YXIgbWF0ID0gbmV3IE1hdHJpeDQoKTtcclxuICAgICAgICByZXR1cm4gbWF0LmNhbWVyYShjYW0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbWVyYShjYW06IG5lLnNjZW5lLkNhbWVyYSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5sb29rQXQoY2FtLm9yaWdpbiwgY2FtLmRlc3RpbmF0aW9uLCBjYW0udXApO1xyXG4gICAgfVxyXG5cclxuICAgIGxvb2tBdChmcm9tOiBWZWN0b3IzLCB0bzogVmVjdG9yMywgdXA6IFZlY3RvcjMpIHtcclxuICAgICAgdmFyIHBvcyA9IGZyb20uY2xvbmUoKTtcclxuICAgICAgdmFyIHpBeGlzID0gcG9zLnN1Yih0bykubm9ybWFsaXplKCk7XHJcbiAgICAgIHZhciB4QXhpcyA9IHVwLmNsb25lKCkuY3Jvc3MoekF4aXMpO1xyXG4gICAgICB2YXIgeUF4aXMgPSB6QXhpcy5jbG9uZSgpLmNyb3NzKHhBeGlzKTtcclxuICAgICAgdmFyIGQgPSB0aGlzLmRhdGEsIGR4ID0geEF4aXMuZGF0YSwgZHkgPSB5QXhpcy5kYXRhLCBkeiA9IHpBeGlzLmRhdGEsIHBkID0gcG9zLmRhdGE7XHJcbiAgICAgIGRbMF0gID0gZHhbMF07IGRbMV0gID0gZHhbMV07IGRbMl0gID0gZHhbMl07IGRbM10gID0gMDtcclxuICAgICAgZFs0XSAgPSBkeVswXTsgZFs1XSAgPSBkeVsxXTsgZFs2XSAgPSBkeVsyXTsgZFs3XSAgPSAwO1xyXG4gICAgICBkWzhdICA9IGR6WzBdOyBkWzldICA9IGR6WzFdOyBkWzEwXSA9IGR6WzJdOyBkWzExXSA9IDA7XHJcbiAgICAgIGRbMTJdID0gcGRbMF07IGRbMTNdID0gcGRbMV07IGRbMTRdID0gcGRbMl07IGRbMTVdID0gMDtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNsYXRlKHg6bnVtYmVyLCB5Om51bWJlciwgej0wKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm11bChNYXRyaXg0LnRyYW5zbGF0aW9uKHgsIHksIHopKTtcclxuICAgIH1cclxuXHJcbiAgICByb3RhdGUoYW5nbGU6bnVtYmVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnpSb3RhdGUoYW5nbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHhSb3RhdGUoYW5nbGU6bnVtYmVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm11bChNYXRyaXg0LnhSb3RhdGlvbihhbmdsZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHlSb3RhdGUoYW5nbGU6bnVtYmVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm11bChNYXRyaXg0LnlSb3RhdGlvbihhbmdsZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHpSb3RhdGUoYW5nbGU6bnVtYmVyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm11bChNYXRyaXg0LnpSb3RhdGlvbihhbmdsZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNjYWxlKHg6bnVtYmVyLCB5Om51bWJlciwgej0xKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm11bChNYXRyaXg0LnNjYWxlKHgsIHksIHopKTtcclxuICAgIH1cclxuXHJcbiAgICBtdWwob3RoZXI6TWF0cml4NCkge1xyXG4gICAgICB2YXIgYSA9IHRoaXMuZGF0YTtcclxuICAgICAgdmFyIGIgPSBvdGhlci5kYXRhO1xyXG4gICAgICB2YXIgYTAwID0gIGFbMF0sIGEwMSA9ICBhWzFdLCBhMDIgPSAgYVsyXSwgYTAzID0gIGFbM10sXHJcbiAgICAgICAgICBhMTAgPSAgYVs0XSwgYTExID0gIGFbNV0sIGExMiA9ICBhWzZdLCBhMTMgPSAgYVs3XSxcclxuICAgICAgICAgIGEyMCA9ICBhWzhdLCBhMjEgPSAgYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxyXG4gICAgICAgICAgYTMwID0gYVsxMl0sIGEzMSA9IGFbMTNdLCBhMzIgPSBhWzE0XSwgYTMzID0gYVsxNV07XHJcbiAgICAgIHZhciBiMDAgPSAgYlswXSwgYjAxID0gIGJbMV0sIGIwMiA9ICBiWzJdLCBiMDMgPSAgYlszXSxcclxuICAgICAgICAgIGIxMCA9ICBiWzRdLCBiMTEgPSAgYls1XSwgYjEyID0gIGJbNl0sIGIxMyA9ICBiWzddLFxyXG4gICAgICAgICAgYjIwID0gIGJbOF0sIGIyMSA9ICBiWzldLCBiMjIgPSBiWzEwXSwgYjIzID0gYlsxMV0sXHJcbiAgICAgICAgICBiMzAgPSBiWzEyXSwgYjMxID0gYlsxM10sIGIzMiA9IGJbMTRdLCBiMzMgPSBiWzE1XTtcclxuXHJcbiAgICAgIGFbMF0gID0gYTAwICogYjAwICsgYTAxICogYjEwICsgYTAyICogYjIwICsgYTAzICogYjMwO1xyXG4gICAgICBhWzFdICA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSArIGEwMiAqIGIyMSArIGEwMyAqIGIzMTtcclxuICAgICAgYVsyXSAgPSBhMDAgKiBiMDIgKyBhMDEgKiBiMTIgKyBhMDIgKiBiMjIgKyBhMDMgKiBiMzI7XHJcbiAgICAgIGFbM10gID0gYTAwICogYjAzICsgYTAxICogYjEzICsgYTAyICogYjIzICsgYTAzICogYjMzO1xyXG4gICAgICBhWzRdICA9IGExMCAqIGIwMCArIGExMSAqIGIxMCArIGExMiAqIGIyMCArIGExMyAqIGIzMDtcclxuICAgICAgYVs1XSAgPSBhMTAgKiBiMDEgKyBhMTEgKiBiMTEgKyBhMTIgKiBiMjEgKyBhMTMgKiBiMzE7XHJcbiAgICAgIGFbNl0gID0gYTEwICogYjAyICsgYTExICogYjEyICsgYTEyICogYjIyICsgYTEzICogYjMyO1xyXG4gICAgICBhWzddICA9IGExMCAqIGIwMyArIGExMSAqIGIxMyArIGExMiAqIGIyMyArIGExMyAqIGIzMztcclxuICAgICAgYVs4XSAgPSBhMjAgKiBiMDAgKyBhMjEgKiBiMTAgKyBhMjIgKiBiMjAgKyBhMjMgKiBiMzA7XHJcbiAgICAgIGFbOV0gID0gYTIwICogYjAxICsgYTIxICogYjExICsgYTIyICogYjIxICsgYTIzICogYjMxO1xyXG4gICAgICBhWzEwXSA9IGEyMCAqIGIwMiArIGEyMSAqIGIxMiArIGEyMiAqIGIyMiArIGEyMyAqIGIzMjtcclxuICAgICAgYVsxMV0gPSBhMjAgKiBiMDMgKyBhMjEgKiBiMTMgKyBhMjIgKiBiMjMgKyBhMjMgKiBiMzM7XHJcbiAgICAgIGFbMTJdID0gYTMwICogYjAwICsgYTMxICogYjEwICsgYTMyICogYjIwICsgYTMzICogYjMwO1xyXG4gICAgICBhWzEzXSA9IGEzMCAqIGIwMSArIGEzMSAqIGIxMSArIGEzMiAqIGIyMSArIGEzMyAqIGIzMTtcclxuICAgICAgYVsxNF0gPSBhMzAgKiBiMDIgKyBhMzEgKiBiMTIgKyBhMzIgKiBiMjIgKyBhMzMgKiBiMzI7XHJcbiAgICAgIGFbMTVdID0gYTMwICogYjAzICsgYTMxICogYjEzICsgYTMyICogYjIzICsgYTMzICogYjMzO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpbnZlcnNlKCkge1xyXG4gICAgICB2YXIgbSA9IHRoaXMuZGF0YTtcclxuICAgICAgdmFyIG0wMCA9IG1bMF0sIG0wMSA9IG1bMV0sIG0wMiA9IG1bMl0sIG0wMyA9IG1bM107XHJcbiAgICAgIHZhciBtMTAgPSBtWzRdLCBtMTEgPSBtWzVdLCBtMTIgPSBtWzZdLCBtMTMgPSBtWzddO1xyXG4gICAgICB2YXIgbTIwID0gbVs4XSwgbTIxID0gbVs5XSwgbTIyID0gbVsxMF0sIG0yMyA9IG1bMTFdO1xyXG4gICAgICB2YXIgbTMwID0gbVsxMl0sIG0zMSA9IG1bMTNdLCBtMzIgPSBtWzE0XSwgbTMzID0gbVsxNV07XHJcbiAgICAgIHZhciB0MCAgPSBtMjIgKiBtMzMsIHQxICA9IG0zMiAqIG0yMywgdDIgID0gbTEyICogbTMzLCB0MyAgPSBtMzIgKiBtMTM7XHJcbiAgICAgIHZhciB0NCAgPSBtMTIgKiBtMjMsIHQ1ICA9IG0yMiAqIG0xMywgdDYgID0gbTAyICogbTMzLCB0NyAgPSBtMzIgKiBtMDM7XHJcbiAgICAgIHZhciB0OCAgPSBtMDIgKiBtMjMsIHQ5ICA9IG0yMiAqIG0wMywgdDEwID0gbTAyICogbTEzLCB0MTEgPSBtMTIgKiBtMDM7XHJcbiAgICAgIHZhciB0MTIgPSBtMjAgKiBtMzEsIHQxMyA9IG0zMCAqIG0yMSwgdDE0ID0gbTEwICogbTMxLCB0MTUgPSBtMzAgKiBtMTE7XHJcbiAgICAgIHZhciB0MTYgPSBtMTAgKiBtMjEsIHQxNyA9IG0yMCAqIG0xMSwgdDE4ID0gbTAwICogbTMxLCB0MTkgPSBtMzAgKiBtMDE7XHJcbiAgICAgIHZhciB0MjAgPSBtMDAgKiBtMjEsIHQyMSA9IG0yMCAqIG0wMSwgdDIyID0gbTAwICogbTExLCB0MjMgPSBtMTAgKiBtMDE7XHJcblxyXG4gICAgICB2YXIgdDAgPSAodDAgKiBtMTEgKyB0MyAqIG0yMSArIHQ0ICogbTMxKSAtXHJcbiAgICAgICAgICAodDEgKiBtMTEgKyB0MiAqIG0yMSArIHQ1ICogbTMxKTtcclxuICAgICAgdmFyIHQxID0gKHQxICogbTAxICsgdDYgKiBtMjEgKyB0OSAqIG0zMSkgLVxyXG4gICAgICAgICAgKHQwICogbTAxICsgdDcgKiBtMjEgKyB0OCAqIG0zMSk7XHJcbiAgICAgIHZhciB0MiA9ICh0MiAqIG0wMSArIHQ3ICogbTExICsgdDEwICogbTMxKSAtXHJcbiAgICAgICAgICAodDMgKiBtMDEgKyB0NiAqIG0xMSArIHQxMSAqIG0zMSk7XHJcbiAgICAgIHZhciB0MyA9ICh0NSAqIG0wMSArIHQ4ICogbTExICsgdDExICogbTIxKSAtXHJcbiAgICAgICAgICAodDQgKiBtMDEgKyB0OSAqIG0xMSArIHQxMCAqIG0yMSk7XHJcblxyXG4gICAgICB2YXIgZCA9IDEuMCAvIChtMDAgKiB0MCArIG0xMCAqIHQxICsgbTIwICogdDIgKyBtMzAgKiB0Myk7XHJcblxyXG4gICAgICBtWzBdICA9IGQgKiB0MDsgbVsxXSAgPSBkICogdDE7IG1bMl0gID0gZCAqIHQyOyBtWzNdICA9IGQgKiB0MztcclxuICAgICAgbVs0XSAgPSBkICogKCh0MSAqIG0xMCArIHQyICogbTIwICsgdDUgKiBtMzApIC0gKHQwICogbTEwICsgdDMgKiBtMjAgKyB0NCAqIG0zMCkpO1xyXG4gICAgICBtWzVdICA9IGQgKiAoKHQwICogbTAwICsgdDcgKiBtMjAgKyB0OCAqIG0zMCkgLSAodDEgKiBtMDAgKyB0NiAqIG0yMCArIHQ5ICogbTMwKSk7XHJcbiAgICAgIG1bNl0gID0gZCAqICgodDMgKiBtMDAgKyB0NiAqIG0xMCArIHQxMSAqIG0zMCkgLSAodDIgKiBtMDAgKyB0NyAqIG0xMCArIHQxMCAqIG0zMCkpO1xyXG4gICAgICBtWzddICA9IGQgKiAoKHQ0ICogbTAwICsgdDkgKiBtMTAgKyB0MTAgKiBtMjApIC0gKHQ1ICogbTAwICsgdDggKiBtMTAgKyB0MTEgKiBtMjApKTtcclxuICAgICAgbVs4XSAgPSBkICogKCh0MTIgKiBtMTMgKyB0MTUgKiBtMjMgKyB0MTYgKiBtMzMpIC0gKHQxMyAqIG0xMyArIHQxNCAqIG0yMyArIHQxNyAqIG0zMykpO1xyXG4gICAgICBtWzldICA9IGQgKiAoKHQxMyAqIG0wMyArIHQxOCAqIG0yMyArIHQyMSAqIG0zMykgLSAodDEyICogbTAzICsgdDE5ICogbTIzICsgdDIwICogbTMzKSk7XHJcbiAgICAgIG1bMTBdID0gZCAqICgodDE0ICogbTAzICsgdDE5ICogbTEzICsgdDIyICogbTMzKSAtICh0MTUgKiBtMDMgKyB0MTggKiBtMTMgKyB0MjMgKiBtMzMpKTtcclxuICAgICAgbVsxMV0gPSBkICogKCh0MTcgKiBtMDMgKyB0MjAgKiBtMTMgKyB0MjMgKiBtMjMpIC0gKHQxNiAqIG0wMyArIHQyMSAqIG0xMyArIHQyMiAqIG0yMykpO1xyXG4gICAgICBtWzEyXSA9IGQgKiAoKHQxNCAqIG0yMiArIHQxNyAqIG0zMiArIHQxMyAqIG0xMikgLSAodDE2ICogbTMyICsgdDEyICogbTEyICsgdDE1ICogbTIyKSk7XHJcbiAgICAgIG1bMTNdID0gZCAqICgodDIwICogbTMyICsgdDEyICogbTAyICsgdDE5ICogbTIyKSAtICh0MTggKiBtMjIgKyB0MjEgKiBtMzIgKyB0MTMgKiBtMDIpKTtcclxuICAgICAgbVsxNF0gPSBkICogKCh0MTggKiBtMTIgKyB0MjMgKiBtMzIgKyB0MTUgKiBtMDIpIC0gKHQyMiAqIG0zMiArIHQxNCAqIG0wMiArIHQxOSAqIG0xMikpO1xyXG4gICAgICBtWzE1XSA9IGQgKiAoKHQyMiAqIG0yMiArIHQxNiAqIG0wMiArIHQyMSAqIG0xMikgLSAodDIwICogbTEyICsgdDIzICogbTIyICsgdDE3ICogbTAyKSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIm1vZHVsZSBuZS5tYXRoIHtcclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHBlcm11dGF0b3IoaW5wdXRBcnI6IFN0cmluZ1tdKTogU3RyaW5nW11bXSB7XHJcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBlcm11dGUoYXJyOiBTdHJpbmdbXSwgbWVtbz1bXSkge1xyXG4gICAgICB2YXIgY3VyO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGN1ciA9IGFyci5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHJlc3VsdHMucHVzaChtZW1vLmNvbmNhdChjdXIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGVybXV0ZShhcnIuc2xpY2UoKSwgbWVtby5jb25jYXQoY3VyKSk7XHJcbiAgICAgICAgYXJyLnNwbGljZShpLCAwLCBjdXJbMF0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGVybXV0ZShpbnB1dEFycik7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJtb2R1bGUgbmUuc2NlbmUge1xyXG5cclxuICBleHBvcnQgY2xhc3MgQ2FtZXJhIHtcclxuXHJcbiAgICBwcml2YXRlIF9vcmlnaW4gICAgICA6IG1hdGguVmVjdG9yMztcclxuICAgIHByaXZhdGUgX2Rlc3RpbmF0aW9uIDogbWF0aC5WZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSBfdXAgICAgICAgICAgOiBtYXRoLlZlY3RvcjM7XHJcbiAgICBwcml2YXRlIF92aWV3ICAgICAgICA6IG1hdGguTWF0cml4NDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgdGhpcy5fb3JpZ2luICAgICAgPSBuZXcgbWF0aC5WZWN0b3IzKCk7XHJcbiAgICAgIHRoaXMuX2Rlc3RpbmF0aW9uID0gbmV3IG1hdGguVmVjdG9yMygpO1xyXG4gICAgICB0aGlzLl91cCAgICAgICAgICA9IG5ldyBtYXRoLlZlY3RvcjMoKTtcclxuICAgICAgdGhpcy5fdmlldyAgICAgICAgPSBuZXcgbWF0aC5NYXRyaXg0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG9yaWdpbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX29yaWdpbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGVzdGluYXRpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9kZXN0aW5hdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdXAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl91cDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWF0cml4KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fdmlldy5jYW1lcmEodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZpZXcoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1hdHJpeC5pbnZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLnNjZW5lIHtcclxuXHJcbiAgZXhwb3J0IGludGVyZmFjZSBTY2VuZUNsYXNzIHtcclxuICAgIG5ldyAobWFuYWdlciA6IFNjZW5lTWFuYWdlcik6IFNjZW5lO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIFNjZW5lTWFuYWdlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2NlbmVTdGFjayA6IFNjZW5lQ2xhc3NbXTtcclxuICAgIHByaXZhdGUgX2xhc3RTY2VuZSAgOiBTY2VuZUNsYXNzO1xyXG4gICAgcHJpdmF0ZSBfaW5zdGFuY2UgICA6IFNjZW5lO1xyXG4gICAgcHJpdmF0ZSBfbG9hZFNjZW5lICA6IFNjZW5lO1xyXG4gICAgcHJpdmF0ZSBfaXNSZWFkeSAgICA6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9nYW1lICAgICAgIDogR2FtZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lIDogR2FtZSwgbG9hZFNjZW5lIDogU2NlbmVDbGFzcyA9IG51bGwpIHtcclxuICAgICAgdGhpcy5fc2NlbmVTdGFjayA9IFtudWxsXTtcclxuICAgICAgdGhpcy5fbGFzdFNjZW5lICA9IG51bGw7XHJcbiAgICAgIHRoaXMuX2luc3RhbmNlICAgPSBudWxsO1xyXG4gICAgICB0aGlzLl9nYW1lICAgICAgID0gZ2FtZTtcclxuICAgICAgdGhpcy5zZXR1cExvYWRTY2VuZShsb2FkU2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldHVwTG9hZFNjZW5lKHNjZW5lOiBTY2VuZUNsYXNzKSB7XHJcbiAgICAgIHRoaXMuX2lzUmVhZHkgPSBmYWxzZTtcclxuICAgICAgdmFyIGxvYWRlciA9IG5ldyB1dGlscy5Mb2FkZXIoKTtcclxuICAgICAgdGhpcy5fbG9hZFNjZW5lICA9IG5ldyAoc2NlbmUgfHwgU2NlbmUpKHRoaXMpO1xyXG4gICAgICB0aGlzLl9pbnN0YW5jZSAgID0gdGhpcy5fbG9hZFNjZW5lO1xyXG4gICAgICB0aGlzLl9sb2FkU2NlbmUubG9hZChsb2FkZXIpO1xyXG4gICAgICBsb2FkZXIuZG9uZSgoKSA9PiB0aGlzLl9pc1JlYWR5ID0gdHJ1ZSApO1xyXG4gICAgICBsb2FkZXIuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcmVhZHkoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9pc1JlYWR5O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBnYW1lKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZ2FtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2NlbmUoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9zY2VuZVN0YWNrW3RoaXMuX3NjZW5lU3RhY2subGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGV2ZW50cygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlID8gdGhpcy5faW5zdGFuY2UuZXZlbnRzIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaW5zdGFuY2UoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBnb3RvKHNjZW5lOiBTY2VuZUNsYXNzKSB7XHJcbiAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgdGhpcy5jYWxsKHNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxsKHNjZW5lIDogU2NlbmVDbGFzcykge1xyXG4gICAgICB0aGlzLl9zY2VuZVN0YWNrLnB1c2goc2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGJhY2soKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICB0aGlzLl9zY2VuZVN0YWNrID0gW251bGxdO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkZWx0YTogbnVtYmVyKSB7XHJcbiAgICAgIGlmICghdGhpcy5yZWFkeSkgcmV0dXJuO1xyXG4gICAgICB2YXIgc2NlbmUgPSB0aGlzLnNjZW5lO1xyXG4gICAgICBpZiAodGhpcy5fbGFzdFNjZW5lICE9PSBzY2VuZSkge1xyXG4gICAgICAgIHRoaXMuX3N3YXBTY2VuZShzY2VuZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX3VwZGF0ZUluc3RhbmNlKGRlbHRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zd2FwU2NlbmUoc2NlbmU6IFNjZW5lQ2xhc3MpIHtcclxuICAgICAgdGhpcy5fbGFzdFNjZW5lID0gc2NlbmU7XHJcbiAgICAgIHRoaXMuX3Rlcm1pbmF0ZSgpO1xyXG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBzY2VuZSh0aGlzKTtcclxuICAgICAgdmFyIGxvYWRlciA9IG5ldyB1dGlscy5Mb2FkZXIoKTtcclxuICAgICAgbG9hZGVyLmRvbmUodGhpcy5fYWZ0ZXJMb2FkLmJpbmQodGhpcykpO1xyXG4gICAgICB0aGlzLl9pbnN0YW5jZS5sb2FkKGxvYWRlcik7XHJcbiAgICAgIGxvYWRlci5zdGFydCgpO1xyXG4gICAgICB0aGlzLl9sb2FkU2NlbmUuc3RhcnQobG9hZGVyLmNhY2hlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9hZnRlckxvYWQobG9hZGVyIDogdXRpbHMuTG9hZGVyKSB7XHJcbiAgICAgIHRoaXMuX2xvYWRTY2VuZS5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2luc3RhbmNlLnN0YXJ0KGxvYWRlci5jYWNoZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdGVybWluYXRlKCkge1xyXG4gICAgICBpZiAodGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICB0aGlzLl9pbnN0YW5jZS5kZXN0cm95KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVJbnN0YW5jZShkZWx0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XHJcbiAgICAgICAgICB0aGlzLl9pbnN0YW5jZS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl9sb2FkU2NlbmUudXBkYXRlKGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwibW9kdWxlIG5lLnV0aWxzIHtcclxuXHJcbiAgZXhwb3J0IGludGVyZmFjZSBFdmVudEhhbmRsZXIge1xyXG4gICAgZGVmYXVsdEV2ZW50KG5hbWU6IHN0cmluZywgZXZlbnQ6IEV2ZW50KTogYW55O1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGRlY2xhcmUgdHlwZSBFdmVudENhbGxiYWNrID0gKHRhcmdldDogRXZlbnRIYW5kbGVyLCBldmVudDogRXZlbnQpID0+IGFueTtcclxuXHJcbiAgZXhwb3J0IGNsYXNzIEV2ZW50TWFuYWdlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGFyZ2V0IDogRXZlbnRIYW5kbGVyO1xyXG4gICAgcHJpdmF0ZSBfZXZlbnRzIDogeyBbIHM6IHN0cmluZyBdOiBFdmVudENhbGxiYWNrW10gfTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXQ6IEV2ZW50SGFuZGxlcikge1xyXG4gICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIG9uKHR5cGU6c3RyaW5nLCBjYWxsYmFjazpFdmVudENhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IHRoaXMuX2V2ZW50c1t0eXBlXSB8fCBbXTtcclxuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIG9mZih0eXBlOnN0cmluZywgY2FsbGJhY2s6RXZlbnRDYWxsYmFjaykge1xyXG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSB0aGlzLl9ldmVudHNbdHlwZV0gfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgZmlyZSh0eXBlOnN0cmluZywgZXZlbnQ6RXZlbnQpIHtcclxuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gdGhpcy5fZXZlbnRzW3R5cGVdIHx8IFtdO1xyXG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0uZm9yRWFjaChmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICBjYWxsYmFjayh0aGlzLl90YXJnZXQsIGV2ZW50KTtcclxuICAgICAgfSk7XHJcbiAgICAgIGlmICghZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xyXG4gICAgICAgIHRoaXMuX3RhcmdldC5kZWZhdWx0RXZlbnQodHlwZSwgZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiZGVjbGFyZSB2YXIgb3BlbnR5cGU6IGFueTtcclxuXHJcbm1vZHVsZSBuZS51dGlscyB7XHJcblxyXG4gIHZhciBfcGl4bWFwQ2FjaGUgOiB7IFsgczogc3RyaW5nIF06IGdyYXBoaWNzLlBpeG1hcCB9ID0ge307XHJcbiAgdmFyIF9mb250Q2FjaGUgICA6IHsgWyBzOiBzdHJpbmcgXTogYW55IH0gICAgICAgICAgICAgPSB7fTtcclxuICB2YXIgX2F1ZGlvQ2FjaGUgIDogeyBbIHM6IHN0cmluZ106IGF1ZGlvLkJ1ZmZlciAgfSAgICA9IHt9O1xyXG4gIHZhciBfanNvbkNhY2hlICAgOiB7IFsgczogc3RyaW5nXTogYW55IH0gICAgICAgICAgICAgID0ge307XHJcblxyXG4gIHZhciBjbHMgPSBBdWRpb0NvbnRleHQgfHwgKDxhbnk+d2luZG93KS5BdWRpb0NvbnRleHQgfHwgKDxhbnk+d2luZG93KS53ZWJraXRBdWRpb0NvbnRleHQ7XHJcblxyXG4gIHZhciBBQyA6IEF1ZGlvQ29udGV4dCA9IG51bGw7XHJcblxyXG4gIGlmIChjbHMpIHtcclxuICAgIEFDID0gbmV3IGNscygpO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGNsYXNzIENhY2hlRmluZGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihsb2FkZXI6TG9hZGVyKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHBpeG1hcCh1cmw6c3RyaW5nKSB7XHJcbiAgICAgIHJldHVybiBfcGl4bWFwQ2FjaGVbdXJsXTtcclxuICAgIH1cclxuXHJcbiAgICBmb250KHVybDpzdHJpbmcpIHtcclxuICAgICAgcmV0dXJuIF9mb250Q2FjaGVbdXJsXTtcclxuICAgIH1cclxuXHJcbiAgICBhdWRpbyh1cmwpIHtcclxuICAgICAgcmV0dXJuIF9hdWRpb0NhY2hlW3VybF07XHJcbiAgICB9XHJcblxyXG4gICAganNvbih1cmwpIHtcclxuICAgICAgcmV0dXJuIF9qc29uQ2FjaGVbdXJsXTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBleHBvcnQgZGVjbGFyZSB0eXBlIExvYWRlckNhbGxiYWNrID0gKGxvYWRlcjogTG9hZGVyKSA9PiBhbnk7XHJcblxyXG4gIGV4cG9ydCBjbGFzcyBMb2FkZXIge1xyXG5cclxuICAgIHByaXZhdGUgX2xvYWRTdGFydDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3RvTG9hZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfY2FsbGJhY2tzIDogTG9hZGVyQ2FsbGJhY2tbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgdGhpcy5fbG9hZFN0YXJ0ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuX3RvTG9hZCAgICA9IDA7XHJcbiAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGRvbmUoY2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5fY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICB0aGlzLl9sb2FkU3RhcnQgPSB0cnVlO1xyXG4gICAgICBpZiAodGhpcy5pc0RvbmUoKSkge1xyXG4gICAgICAgIHRoaXMuY2FsbERvbmUoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpc0RvbmUoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9sb2FkU3RhcnQgJiYgdGhpcy5fdG9Mb2FkIDw9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbERvbmUoKSB7XHJcbiAgICAgIHRoaXMuX2NhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2sodGhpcykpO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwaXhtYXAodXJsKSB7XHJcbiAgICAgIGlmIChfcGl4bWFwQ2FjaGVbdXJsXSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICArK3RoaXMuX3RvTG9hZDtcclxuICAgICAgdGhpcy5fcHJlcGFyZUltYWdlKHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3ByZXBhcmVJbWFnZSh1cmwpIHtcclxuICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIF9waXhtYXBDYWNoZVt1cmxdID0gZ3JhcGhpY3MuUGl4bWFwLmZyb21JbWFnZShpbWcpO1xyXG4gICAgICAgIHRoaXMuX2NoZWNrTG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGltZy5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgIF9waXhtYXBDYWNoZVt1cmxdID0gbnVsbDtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBDb3VsZCBub3QgbG9hZCBpbWFnZTogJyR7dXJsfSdgKTtcclxuICAgICAgICB0aGlzLl9jaGVja0xvYWQoKTtcclxuICAgICAgfVxyXG4gICAgICBpbWcuc3JjID0gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIGZvbnQodXJsKSB7XHJcbiAgICAgIGlmIChfZm9udENhY2hlW3VybF0pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgKyt0aGlzLl90b0xvYWQ7XHJcbiAgICAgIHRoaXMuX3ByZXBhcmVGb250KHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3ByZXBhcmVGb250KHVybCkge1xyXG4gICAgICBvcGVudHlwZS5sb2FkKHVybCwgKGVyciwgZm9udCkgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYENvdWxkIG5vdCBsb2FkIGZvbnQ6ICcke3VybH0nLlxcbiR7ZXJyfWApO1xyXG4gICAgICAgICAgIF9mb250Q2FjaGVbdXJsXSA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgX2ZvbnRDYWNoZVt1cmxdID0gZm9udDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2hlY2tMb2FkKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGF1ZGlvKHVybCkge1xyXG4gICAgICBpZiAoX2F1ZGlvQ2FjaGVbdXJsXSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICArK3RoaXMuX3RvTG9hZDtcclxuICAgICAgaWYgKEFDKSB7XHJcbiAgICAgICAgdGhpcy5fcHJlcGFyZVdlYkF1ZGlvUmVxdWVzdCh1cmwpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX3ByZXBhcmVMZWdhY3lBdWRpb1JlcXVlc3QodXJsKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBqc29uKHVybCkge1xyXG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XHJcbiAgICAgIHJlcXVlc3Qub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIF9qc29uQ2FjaGVbdXJsXSA9ICBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICB0aGlzLl9jaGVja0xvYWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgQ291bGQgbm90IGxvYWQganNvbiBmaWxlOiAnJHt1cmx9Jy5cXG5gKTtcclxuICAgICAgICBfanNvbkNhY2hlW3VybF0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NoZWNrTG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJlcXVlc3Quc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9wcmVwYXJlTGVnYWN5QXVkaW9SZXF1ZXN0KHVybCkge1xyXG4gICAgICB2YXIgYXVkaW9UYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xyXG4gICAgICBhdWRpb1RhZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX2F1ZGlvQ2FjaGVbdXJsXSA9IG5ldyBhdWRpby5MZWdhY3lCdWZmZXIoYXVkaW9UYWcpO1xyXG4gICAgICAgIHRoaXMuX2NoZWNrTG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGF1ZGlvVGFnLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgQ291bGQgbm90IGxvYWQgYXVkaW8gZmlsZTogJyR7dXJsfScuXFxuYCk7XHJcbiAgICAgICAgX2F1ZGlvQ2FjaGVbdXJsXSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tMb2FkKCk7XHJcbiAgICAgIH1cclxuICAgICAgYXVkaW9UYWcuc3JjID0gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIF9wcmVwYXJlV2ViQXVkaW9SZXF1ZXN0KHVybCkge1xyXG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XHJcbiAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcclxuICAgICAgcmVxdWVzdC5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgQUMuZGVjb2RlQXVkaW9EYXRhKHJlcXVlc3QucmVzcG9uc2UsIGZ1bmN0aW9uKGJ1ZmZlcikge1xyXG4gICAgICAgICAgX2F1ZGlvQ2FjaGVbdXJsXSA9IG5ldyBhdWRpby5XZWJBdWRpb0J1ZmZlcihBQywgYnVmZmVyKTtcclxuICAgICAgICAgIHRoaXMuX2NoZWNrTG9hZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJlcXVlc3Qub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBDb3VsZCBub3QgbG9hZCBhdWRpbyBmaWxlOiAnJHt1cmx9Jy5cXG5gKTtcclxuICAgICAgICBfYXVkaW9DYWNoZVt1cmxdID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jaGVja0xvYWQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXF1ZXN0LnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2FjaGUoKSB7XHJcbiAgICAgIHJldHVybiBuZXcgQ2FjaGVGaW5kZXIodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NoZWNrTG9hZCgpIHtcclxuICAgICAgLS10aGlzLl90b0xvYWQ7XHJcbiAgICAgIGlmICh0aGlzLmlzRG9uZSgpKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsRG9uZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNsZWFyKCkge1xyXG4gICAgICB0aGlzLmNsZWFyUGl4bWFwcygpO1xyXG4gICAgICB0aGlzLmNsZWFyRm9udHMoKTtcclxuICAgICAgdGhpcy5jbGVhckF1ZGlvKCk7XHJcbiAgICAgIHRoaXMuY2xlYXJKc29uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNsZWFyUGl4bWFwcygpIHtcclxuICAgICAgX3BpeG1hcENhY2hlID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNsZWFyRm9udHMoKSB7XHJcbiAgICAgIF9mb250Q2FjaGUgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY2xlYXJBdWRpbygpIHtcclxuICAgICAgX2F1ZGlvQ2FjaGUgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY2xlYXJKc29uKCkge1xyXG4gICAgICBfanNvbkNhY2hlID0ge307XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL0RyYXdhYmxlQ29udGFpbmVyLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2dyYXBoaWNzL1JlY3QudHNcIiAvPlxyXG5cclxubW9kdWxlIG5lLm9iamVjdHMge1xyXG5cclxuICBleHBvcnQgY2xhc3MgVmlld3BvcnQgZXh0ZW5kcyBEcmF3YWJsZUNvbnRhaW5lciB7XHJcblxyXG4gICAgcHVibGljIHJlY3QgOiBncmFwaGljcy5SZWN0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJlY3QgOiBncmFwaGljcy5SZWN0ID0gbnVsbCkge1xyXG4gICAgICBzdXBlcigpO1xyXG4gICAgICB0aGlzLnJlY3QgPSByZWN0IHx8IG5ldyBncmFwaGljcy5SZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJlcGFyZShyZW5kZXI6IGdyYXBoaWNzLldlYkdMUmVuZGVyKSB7XHJcbiAgICAgIHJlbmRlci5wcmVwYXJlUmVjdEJ1ZmZlcih0aGlzLnJlY3QpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

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