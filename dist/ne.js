"use strict";

window.ne = {};
"use strict";

window.ne.tools = {};
"use strict";

ne.tools.gl = (function () {

  var $ = {};

  $.textureFromCanvas = function (gl, canvas) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    return texture;
  };

  return $;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ne.Loader = (function () {

    var _cache = {
        audio: {},
        pixmaps: {},
        json: {},
        fonts: {}
    };

    return (function () {
        function Loader() {
            _classCallCheck(this, Loader);
        }

        _createClass(Loader, [{
            key: 'loadPixmaps',
            value: function loadPixmaps(name, url) {
                if (typeof _cache.pixmaps[name] == 'undefined') {}
                return this;
            }
        }, {
            key: 'loadAudio',
            value: function loadAudio(name, url) {
                if (typeof _cache.audio[name] == 'undefined') {}
                return this;
            }
        }, {
            key: 'loadJson',
            value: function loadJson(name, url) {
                if (typeof _cache.json[name] == 'undefined') {}
                return this;
            }
        }, {
            key: 'loadFont',
            value: function loadFont(name, url) {
                if (typeof _cache.fonts[name] == 'undefined') {}
                return this;
            }
        }, {
            key: 'pixmap',
            value: function pixmap(name) {}
        }, {
            key: 'audio',
            value: function audio(name) {}
        }, {
            key: 'json',
            value: function json(name) {}
        }, {
            key: 'font',
            value: function font(name) {}
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
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ne.Color = (function () {

    return (function () {
        function Color(r, g, b) {
            var a = arguments.length <= 3 || arguments[3] === undefined ? 255 : arguments[3];

            _classCallCheck(this, Color);

            this.set(r, g, b, a);
        }

        _createClass(Color, [{
            key: 'set',
            value: function set(r, g, b) {
                var a = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

                if (typeof a == 'undefined') a = this.alpha;
                this.red = r;
                this.green = g;
                this.blue = b;
                this.alpha = a;
                return this;
            }
        }, {
            key: 'clone',
            value: function clone() {
                return new Color(this.red, this.green, this.blue, this.alpha);
            }
        }, {
            key: 'toCss',
            value: function toCss() {
                var a = this.alpha / 255;
                return 'rgba(' + this.red + ', ' + this.green + ', ' + this.blue + ', ' + a + ')';
            }
        }, {
            key: 'toArgb',
            value: function toArgb() {
                return this.alpha << 24 + this.red << 16 + this.green << 8 + this.blue;
            }
        }, {
            key: 'toRgba',
            value: function toRgba() {
                return this.red << 24 + this.green << 16 + this.blue << 8 + this.alpha;
            }
        }, {
            key: 'toRgb',
            value: function toRgb() {
                return this.red << 16 + this.green << 8 + this.blue;
            }
        }, {
            key: 'toHsla',
            value: function toHsla() {
                var r = this.red / 255,
                    g = this.green / 255,
                    b = this.blue / 255;
                var max = Math.max(r, g, b),
                    min = Math.min(r, g, b);
                var h,
                    s,
                    l = (max + min) / 2;

                if (max == min) {
                    h = s = 0; // achromatic
                } else {
                        var d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        switch (max) {
                            case r:
                                h = (g - b) / d + (g < b ? 6 : 0);break;
                            case g:
                                h = (b - r) / d + 2;break;
                            case b:
                                h = (r - g) / d + 4;break;
                        }
                        h /= 6;
                    }

                return [h, s, l, this.alpha];
            }
        }, {
            key: 'toHsl',
            value: function toHsl() {
                var r = this.red / 255,
                    g = this.green / 255,
                    b = this.blue / 255;
                var max = Math.max(r, g, b),
                    min = Math.min(r, g, b);
                var h,
                    s,
                    l = (max + min) / 2;

                if (max == min) {
                    h = s = 0; // achromatic
                } else {
                        var d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        switch (max) {
                            case r:
                                h = (g - b) / d + (g < b ? 6 : 0);break;
                            case g:
                                h = (b - r) / d + 2;break;
                            case b:
                                h = (r - g) / d + 4;break;
                        }
                        h /= 6;
                    }

                return [h, s, l];
            }
        }, {
            key: 'grayscale',
            value: function grayscale() {
                var avg = 0.21 * this.red + 0.72 * this.green + 0.07 * this.blue;
                return this.set(avg, avg, avg);
            }
        }, {
            key: 'average',
            value: function average() {
                var avg = (this.red + this.green + this.blue) / 3;
                return this.set(avg, avg, avg);
            }
        }, {
            key: 'lightnessAverage',
            value: function lightnessAverage() {
                var _Math, _Math2;

                var args = [this.red, this.green, this.blue];
                var avg = ((_Math = Math).max.apply(_Math, args) + (_Math2 = Math).min.apply(_Math2, args)) / 2;
                return this.set(avg, avg, avg);
            }
        }, {
            key: 'invert',
            value: function invert() {
                var alpha = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

                var a = alpha ? 255 - this.alpha : this.alpha;
                return this.set(255 - this.red, 255 - this.green, 255 - this.blue, a);
            }
        }, {
            key: 'red',
            get: function get() {
                return this._r;
            },
            set: function set(value) {
                this._r = Math.max(0, Math.min(255, value));
            }
        }, {
            key: 'green',
            get: function get() {
                return this._g;
            },
            set: function set(value) {
                this._g = Math.max(0, Math.min(255, value));
            }
        }, {
            key: 'blue',
            get: function get() {
                return this._b;
            },
            set: function set(value) {
                this._b = Math.max(0, Math.min(255, value));
            }
        }, {
            key: 'alpha',
            get: function get() {
                return this._a;
            },
            set: function set(value) {
                this._a = Math.max(0, Math.min(255, value));
            }
        }, {
            key: 'r',
            get: function get() {
                return this.red;
            },
            set: function set(value) {
                this.red = value;
            }
        }, {
            key: 'g',
            get: function get() {
                return this.green;
            },
            set: function set(value) {
                this.green = value;
            }
        }, {
            key: 'b',
            get: function get() {
                return this.blue;
            },
            set: function set(value) {
                this.blue = value;
            }
        }, {
            key: 'a',
            get: function get() {
                this.alpha;
            },
            set: function set(value) {
                this.alpha = value;
            }
        }, {
            key: 'hue',
            get: function get() {
                return this.toHsl()[0];
            },
            set: function set(value) {
                var hsla = this.toHsla();
                hsla[0] = value;
                var c = Color.fromHsla(hsla);
                this.set(c.red, c.green, c.blue, c.alpha);
            }
        }, {
            key: 'saturation',
            get: function get() {
                return this.toHsl()[1];
            },
            set: function set(value) {
                var hsla = this.toHsla();
                hsla[1] = value;
                var c = Color.fromHsla(hsla);
                this.set(c.red, c.green, c.blue, c.alpha);
            }
        }, {
            key: 'luminance',
            get: function get() {
                return this.toHsl()[2];
            },
            set: function set(value) {
                var hsla = this.toHsla();
                hsla[2] = value;
                var c = Color.fromHsla(hsla);
                this.set(c.red, c.green, c.blue, c.alpha);
            }
        }, {
            key: 'h',
            get: function get() {
                return this.hue;
            },
            set: function set(value) {
                this.hue = value;
            }
        }, {
            key: 's',
            get: function get() {
                return this.saturation;
            },
            set: function set(value) {
                this.saturation = value;
            }
        }, {
            key: 'l',
            get: function get() {
                return this.luminance;
            },
            set: function set(value) {
                this.luminance = value;
            }
        }], [{
            key: '_hue2rgb',
            value: function _hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }
        }, {
            key: '_hslToRgb',
            value: function _hslToRgb(h, s, l, a) {
                var r, g, b;

                if (s == 0) {
                    r = g = b = l; // achromatic
                } else {
                        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                        var p = 2 * l - q;
                        r = this._hue2rgb(p, q, h + 1 / 3);
                        g = this._hue2rgb(p, q, h);
                        b = this._hue2rgb(p, q, h - 1 / 3);
                    }
                return new Color(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a);
            }
        }, {
            key: 'fromRgba',
            value: function fromRgba(rgba) {
                var r = rgba >> 24 && 0xFF;
                var g = rgba >> 16 && 0xFF;
                var b = rgba >> 8 && 0xFF;
                var a = rgba >> 0 && 0xFF;
                return new Color(r, g, b, a);
            }
        }, {
            key: 'fromRgb',
            value: function fromRgb(rgb) {
                var r = rgba >> 16 && 0xFF;
                var g = rgba >> 8 && 0xFF;
                var b = rgba >> 0 && 0xFF;
                return new Color(r, g, b);
            }
        }, {
            key: 'fromArgb',
            value: function fromArgb(argb) {
                var a = rgba >> 24 && 0xFF;
                var r = rgba >> 16 && 0xFF;
                var g = rgba >> 8 && 0xFF;
                var b = rgba >> 0 && 0xFF;
                return new Color(r, g, b, a);
            }
        }, {
            key: 'fromHsla',
            value: function fromHsla(hsla) {
                var _hsla = _slicedToArray(hsla, 4);

                var h = _hsla[0];
                var s = _hsla[1];
                var l = _hsla[2];
                var a = _hsla[3];

                return this._hslToRgb(h, s, l, a);
            }
        }, {
            key: 'fromHsl',
            value: function fromHsl(hsl) {
                var _hsl = _slicedToArray(hsl, 3);

                var h = _hsl[0];
                var s = _hsl[1];
                var l = _hsl[2];

                return this._hslToRgb(h, s, l, 255);
            }
        }]);

        return Color;
    })();
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ne.Pixmap = (function () {

  return (function () {
    function Pixmal() {
      var width = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      var height = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      _classCallCheck(this, Pixmal);

      this._canvas = document.createElement('canvas');
      this._context = this._canvas.getContext('2d');
    }

    _createClass(Pixmal, [{
      key: '_bltImage',
      value: function _bltImage(img) {
        var sx = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var sy = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
        var sw = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];
        var sh = arguments.length <= 4 || arguments[4] === undefined ? undefined : arguments[4];
        var dx = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];
        var dy = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
        var dw = arguments.length <= 7 || arguments[7] === undefined ? undefined : arguments[7];
        var dh = arguments.length <= 8 || arguments[8] === undefined ? undefined : arguments[8];

        if (typeof sw == 'undefined') sw = img.width;
        if (typeof sh == 'undefined') sh = img.height;
        if (typeof dw == 'undefined') dw = sw;
        if (typeof dh == 'undefined') dh = sh;
        this._context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        return this;
      }
    }, {
      key: 'blt',
      value: function blt(bmp) {
        var sx = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var sy = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
        var sw = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];
        var sh = arguments.length <= 4 || arguments[4] === undefined ? undefined : arguments[4];
        var dx = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];
        var dy = arguments.length <= 6 || arguments[6] === undefined ? 0 : arguments[6];
        var dw = arguments.length <= 7 || arguments[7] === undefined ? undefined : arguments[7];
        var dh = arguments.length <= 8 || arguments[8] === undefined ? undefined : arguments[8];

        this._bltImage(bmp._canvas, sx, sy, sw, sh, dx, dy, dw, dh);
        return this;
      }
    }, {
      key: 'drawLine',
      value: function drawLine(from, to, color) {}
    }], [{
      key: 'fromImage',
      value: function fromImage(img) {
        var pixmap = new Pixmap(img.width, img.height);
        pixmap._bltImage(img, 0, 0, img.width, img.height);
        return pixmap;
      }
    }]);

    return Pixmal;
  })();
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ne.Drawable = (function () {

  return (function () {
    function Drawable() {
      _classCallCheck(this, Drawable);

      this._parent = null;
      this._events = {};
      this.z = 0;
    }

    _createClass(Drawable, [{
      key: 'render',
      value: function render(gl) {}
    }, {
      key: 'act',
      value: function act(delta) {}
    }, {
      key: 'fire',
      value: function fire(name) {
        var event = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        this._ensureEventType(name);
        var result = true;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._events[name][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var callback = _step.value;

            var i = callback(event);
            if (typeof i != 'undefined' && i === false) {
              result = false;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return result;
      }
    }, {
      key: 'on',
      value: function on(name, callback) {
        this._ensureEventType(name);
        this._events[name].push(callback);
      }
    }, {
      key: 'off',
      value: function off(name) {
        var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        if (callback === null) {
          this._events[name] = [];
          return;
        }
        this._ensureEventType(name);
        var index = this._events[name].indexOf(callback);
        if (index !== -1) {
          this._events[name].splice(index, 1);
        }
      }
    }, {
      key: '_ensureEventType',
      value: function _ensureEventType(name) {
        if (typeof this._events[name] == 'undefined') {
          this._events[name] = [];
        }
      }
    }, {
      key: 'parent',
      get: function get() {
        return this._parent;
      }
    }, {
      key: 'z',
      get: function get() {
        return this._z;
      },
      set: function set(value) {
        this._z = value;
        var parent = this.parent;
        if (parent) {
          parent.zUpdate();
        }
      }
    }]);

    return Drawable;
  })();
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Container = (function () {

  return (function (_ne$Drawable) {
    _inherits(Container, _ne$Drawable);

    function Container() {
      _classCallCheck(this, Container);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Container).call(this));

      _this._children = [];
      _this._zRefresh = false;
      return _this;
    }

    _createClass(Container, [{
      key: "act",
      value: function act(delta) {
        this._refreshZ();
        this._makeChildrenAct(delta);
      }
    }, {
      key: "render",
      value: function render(gl) {
        this._renderChildren(gl);
      }
    }, {
      key: "zUpdate",
      value: function zUpdate() {
        this._zRefresh = true;
      }
    }, {
      key: "_refreshZ",
      value: function _refreshZ() {
        if (this._zRefresh) {
          this.children.sort(function (a, b) {
            return a.z - b.z;
          });
          this._zRefresh = false;
        }
      }
    }, {
      key: "_makeChildrenAct",
      value: function _makeChildrenAct(delta) {
        this.children.forEach(function (child) {
          return child.act(delta);
        });
      }
    }, {
      key: "_renderChildren",
      value: function _renderChildren(gl) {
        this.children.forEach(function (child) {
          return child.render(gl);
        });
      }
    }, {
      key: "add",
      value: function add(child) {
        if (!this.contains(child)) {
          this.children.push(child);
          this.zUpdate();
        }
      }
    }, {
      key: "remove",
      value: function remove(child) {
        var index = this.indexOf(child);
        if (index !== -1) {
          this.children.splice(index, 1);
        }
      }
    }, {
      key: "indexOf",
      value: function indexOf(child) {
        return this.children.indexOf(child);
      }
    }, {
      key: "clear",
      value: function clear() {
        this.children = [];
      }
    }, {
      key: "swap",
      value: function swap(a, b) {
        var i = this.indexOf(a);
        var j = this.indexOf(b);
        if (i !== -1 && j !== -1) {
          var z = a.z;
          a.z = b.z;
          b.z = z;
        }
      }
    }, {
      key: "contains",
      value: function contains(child) {
        return this.indexOf(child) !== -1;
      }
    }, {
      key: "children",
      get: function get() {
        return this._children;
      }
    }]);

    return Container;
  })(ne.Drawable);
})();
//# sourceMappingURL=ne.js.map
