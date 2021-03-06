'use strict';

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
})();

// Closure
(function () {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function (value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function (value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function (value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();
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

  $.bindTexture = function (gl, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  };

  $.bindBuffer = function (gl, buffer, data) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  };

  $.draw = function (gl) {
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

  $.checkShader = function (gl, shader) {
    var source = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      var log = gl.getShaderInfoLog(shader);
      var txt = source ? ".\nSource was:\n" + source : '';
      var e = "Could not compile shader:" + log + txt;
      gl.deleteShader(shader);
      throw e;
    }
  };

  $.makeShader = function (gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    this.checkShader(gl, shader, source);
    return shader;
  };

  $.checkProgram = function (gl, program) {
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      throw "program failed to link:" + gl.getProgramInfoLog(program);
    }
  };

  $.makeProgram = function (gl, vertex, fragment) {
    var program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    this.checkProgram(gl, program);
    return program;
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
        fonts: {},
        textures: {}
    };

    return (function () {
        function Loader() {
            _classCallCheck(this, Loader);

            this._whenDone = [];
            this._toLoad = 0;
            this._started = false;
        }

        _createClass(Loader, [{
            key: 'start',
            value: function start() {
                this._started = true;
                this._callDone();
            }
        }, {
            key: '_callDone',
            value: function _callDone() {
                var _this = this;

                if (this._started && this._toLoad == 0) {
                    this._whenDone.forEach(function (i) {
                        i(_this);
                    });
                }
            }
        }, {
            key: '_endSingleLoad',
            value: function _endSingleLoad() {
                this._toLoad -= 1;
                this._callDone();
            }
        }, {
            key: 'loadPixmap',
            value: function loadPixmap(name, url) {
                var _this2 = this;

                if (typeof _cache.pixmaps[name] == 'undefined') {
                    this._toLoad += 1;
                    var img = new Image();
                    img.onload = function () {
                        _cache.pixmaps[name] = ne.Pixmap.fromImage(img);
                        _this2._endSingleLoad();
                    };
                    img.onerror = function () {
                        _this2._endSingleLoad();
                    };
                    img.src = url;
                }
                return this;
            }
        }, {
            key: 'loadTexture',
            value: function loadTexture(name, url) {
                this.loadPixmap(name, url);
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
            value: function pixmap(name) {
                return _cache.pixmaps[name] || null;
            }
        }, {
            key: 'texture',
            value: function texture(name) {
                if (typeof _cache.textures[name] == 'undefined') {
                    if (typeof _cache.pixmaps[name] != 'undefined') {
                        _cache.textures[name] = new ne.Texture(_cache.pixmaps[name]);
                    }
                }
                return _cache.textures[name] || null;
            }
        }, {
            key: 'audio',
            value: function audio(name) {}
        }, {
            key: 'json',
            value: function json(name) {}
        }, {
            key: 'font',
            value: function font(name) {}
        }, {
            key: 'done',
            value: function done(callback) {
                this._whenDone.push(callback);
                return this;
            }
        }], [{
            key: 'clear',
            value: function clear() {
                this.clearPixmaps();
                this.clearAudio();
                this.clearJson();
                this.clearTextures();
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
        }, {
            key: 'clearTextures',
            value: function clearTextures() {}
        }]);

        return Loader;
    })();
})();
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

ne.tools.defineEscalarPorperties = (function () {

  function permutator(inputArr) {
    var results = [];

    function permute(arr, memo) {
      var cur,
          memo = memo || [];

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

  function makePropertyAccessor(slice) {
    var length = slice.length;
    return {

      get: function get() {
        var _this = this;

        var map = slice.map(function (i) {
          return _this[i];
        });
        return new (Function.prototype.bind.apply(ne.Vec4, [null].concat(_toConsumableArray(map))))();
      },

      set: function set(value) {
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
    var permutations = permutator(properties);
    for (var length = 1; length <= properties.length; ++length) {
      makePropertiesOfSize(result, permutations, length);
    }
    return result;
  }

  return function (object) {
    for (var _len = arguments.length, properties = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      properties[_key - 1] = arguments[_key];
    }

    Object.defineProperties(object, makeProperties(properties));
  };
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ne.Vec2 = (function () {
  var Vec2 = (function () {
    function Vec2() {
      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      _classCallCheck(this, Vec2);

      this.x = x;
      this.y = y;
    }

    _createClass(Vec2, [{
      key: Symbol.iterator,
      value: function value() {
        var index = -1;
        var data = [];
        var length = this.length;
        for (var i = 0; i < length; ++i) {
          data.push(this[i]);
        }
        return {
          next: function next() {
            return { value: data[++index], done: index >= length };
          }
        };
      }
    }, {
      key: 'clone',
      value: function clone() {
        return new Vec2(this.x, this.y);
      }
    }, {
      key: 'set',
      value: function set(x, y) {
        this.x = x;
        this.y = y;
      }
    }, {
      key: 'length',
      get: function get() {
        return 2;
      }
    }, {
      key: '0',
      get: function get() {
        return this.x;
      },
      set: function set(value) {
        this.x = value;
      }
    }, {
      key: '1',
      get: function get() {
        return this.y;
      },
      set: function set(value) {
        this.y = value;
      }
    }, {
      key: '2',
      get: function get() {
        return this.z;
      }
    }, {
      key: 'r',
      get: function get() {
        return this.x;
      },
      set: function set(value) {
        this.x = value;
      }
    }, {
      key: 's',
      get: function get() {
        return this.x;
      },
      set: function set(value) {
        this.x = value;
      }
    }, {
      key: 't',
      get: function get() {
        return this.y;
      },
      set: function set(value) {
        this.y = value;
      }
    }, {
      key: 'u',
      get: function get() {
        return this.x;
      },
      set: function set(value) {
        this.x = value;
      }
    }, {
      key: 'v',
      get: function get() {
        return this.y;
      },
      set: function set(value) {
        this.y = value;
      }
    }, {
      key: 'g',
      get: function get() {
        return this.y;
      },
      set: function set(value) {
        this.y = value;
      }
    }]);

    return Vec2;
  })();

  ne.tools.defineEscalarPorperties(Vec2.prototype, 'x', 'y');
  ne.tools.defineEscalarPorperties(Vec2.prototype, 'r', 's');
  ne.tools.defineEscalarPorperties(Vec2.prototype, 'r', 'g');
  ne.tools.defineEscalarPorperties(Vec2.prototype, 'u', 'v');

  return Vec2;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Vec3 = (function () {
  var Vec3 = (function (_ne$Vec) {
    _inherits(Vec3, _ne$Vec);

    function Vec3() {
      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      _classCallCheck(this, Vec3);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Vec3).call(this, x, y));

      _this.z = z;
      return _this;
    }

    _createClass(Vec3, [{
      key: 'clone',
      value: function clone() {
        return new Vec3(this.x, this.y, this.z);
      }
    }, {
      key: 'set',
      value: function set(x, y) {
        var z = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

        if (typeof z !== 'undefined') {
          this.z = z;
        }
        _get(Object.getPrototypeOf(Vec3.prototype), 'set', this).call(this, x, y);
      }
    }, {
      key: 'length',
      get: function get() {
        return 3;
      }
    }, {
      key: '2',
      get: function get() {
        return this.z;
      },
      set: function set(value) {
        this.z = value;
      }
    }, {
      key: 'b',
      get: function get() {
        return this.z;
      },
      set: function set(value) {
        this.z = value;
      }
    }]);

    return Vec3;
  })(ne.Vec2);

  ne.tools.defineEscalarPorperties(Vec3.prototype, 'x', 'y', 'z');
  ne.tools.defineEscalarPorperties(Vec3.prototype, 'r', 'g', 'b');

  return Vec3;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Vec4 = (function () {
  var Vec4 = (function (_ne$Vec) {
    _inherits(Vec4, _ne$Vec);

    function Vec4() {
      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
      var w = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

      _classCallCheck(this, Vec4);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Vec4).call(this, x, y, z));

      _this.w = w;
      return _this;
    }

    _createClass(Vec4, [{
      key: 'set',
      value: function set(x, y, z) {
        var w = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

        if (typeof w !== 'undefined') {
          this.w = w;
        }
        _get(Object.getPrototypeOf(Vec4.prototype), 'set', this).call(this, x, y, z);
      }
    }, {
      key: 'clone',
      value: function clone() {
        return new Vec4(this.x, this.y, this.z, this.w);
      }
    }, {
      key: 'length',
      get: function get() {
        return 4;
      }
    }, {
      key: 'a',
      get: function get() {
        return this.w;
      },
      set: function set(value) {
        this.w = value;
      }
    }, {
      key: '3',
      get: function get() {
        return this.w;
      },
      set: function set(value) {
        this.w = value;
      }
    }]);

    return Vec4;
  })(ne.Vec3);

  ne.tools.defineEscalarPorperties(Vec4.prototype, 'x', 'y', 'z', 'w');
  ne.tools.defineEscalarPorperties(Vec4.prototype, 'r', 'g', 'b', 'a');

  return Vec4;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ne.Mat2 = (function () {
  var Mat2 = (function () {
    function Mat2() {
      var cp = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      _classCallCheck(this, Mat2);

      this.createData();
      if (cp) {
        this.copyFrom(cp);
      }
    }

    _createClass(Mat2, [{
      key: 'createData',
      value: function createData() {
        this._data = new Float32Array(this.length);
      }
    }, {
      key: 'at',
      value: function at(i, j) {
        return this[i % this.width + j * this.width];
      }
    }, {
      key: 'set',
      value: function set(i, j, value) {
        this[i % this.width + j * this.width] = value;
      }
    }, {
      key: 'clone',
      value: function clone() {
        return this.copyTo(new Mat2());
      }
    }, {
      key: 'copyTo',
      value: function copyTo(mat) {
        var xs = Math.min(mat.width, this.width);
        var ys = Math.min(mat.height, this.height);
        for (var j = 0; j < ys; ++j) {
          for (var i = 0; i < xs; ++i) {
            mat.set(i, j, this.at(i, j));
          }
        }
        return mat;
      }
    }, {
      key: 'copyFrom',
      value: function copyFrom(mat) {
        var xs = Math.min(mat.width, this.width);
        var ys = Math.min(mat.height, this.height);
        for (var j = 0; j < ys; ++j) {
          for (var i = 0; i < xs; ++i) {
            this.set(i, j, mat.at(i, j));
          }
        }
        return this;
      }
    }, {
      key: 'data',
      get: function get() {
        return this._data;
      }
    }, {
      key: '0',
      get: function get() {
        return this.data[0];
      },
      set: function set(value) {
        this._data[0] = value;
      }
    }, {
      key: '1',
      get: function get() {
        return this.data[1];
      },
      set: function set(value) {
        this._data[1] = value;
      }
    }, {
      key: '2',
      get: function get() {
        return this.data[2];
      },
      set: function set(value) {
        this._data[2] = value;
      }
    }, {
      key: '3',
      get: function get() {
        return this._data[3];
      },
      set: function set(value) {
        this._data[3] = value;
      }
    }, {
      key: 'width',
      get: function get() {
        return 2;
      }
    }, {
      key: 'height',
      get: function get() {
        return 2;
      }
    }, {
      key: 'length',
      get: function get() {
        return this.width * this.height;
      }
    }, {
      key: 'xsize',
      get: function get() {
        return this.width;
      }
    }, {
      key: 'ysize',
      get: function get() {
        return this.height;
      }
    }, {
      key: 'size',
      get: function get() {
        return this.length;
      }
    }], [{
      key: 'IDENTITY',
      get: function get() {
        var mat = new Mat2();
        mat.set(0, 0, 1);
        mat.set(1, 1, 1);
        return mat;
      }
    }]);

    return Mat2;
  })();

  return Mat2;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Mat3 = (function () {
  var Mat3 = (function (_ne$Mat) {
    _inherits(Mat3, _ne$Mat);

    function Mat3() {
      _classCallCheck(this, Mat3);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Mat3).apply(this, arguments));
    }

    _createClass(Mat3, [{
      key: 'clone',
      value: function clone() {
        return this.copyTo(new Mat3());
      }
    }, {
      key: 'multiply',
      value: function multiply(other) {
        var a = this.data;
        var b = other.data;
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2];
        var a10 = a[3],
            a11 = a[4],
            a12 = a[5];
        var a20 = a[6],
            a21 = a[7],
            a22 = a[8];
        var b00 = b[0],
            b01 = b[1],
            b02 = b[2];
        var b10 = b[3],
            b11 = b[4],
            b12 = b[5];
        var b20 = b[6],
            b21 = b[7],
            b22 = b[8];
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
      }
    }, {
      key: 'translate',
      value: function translate(x, y) {
        return this.multiply(Mat3.translation(x, y));
      }
    }, {
      key: 'rotate',
      value: function rotate(angle) {
        return this.multiply(Mat3.rotation(angle));
      }
    }, {
      key: 'scale',
      value: function scale(x, y) {
        return this.multiply(Mat3.scale(x, y));
      }
    }, {
      key: 'width',
      get: function get() {
        return 3;
      }
    }, {
      key: 'height',
      get: function get() {
        return 3;
      }
    }, {
      key: '4',
      get: function get() {
        return this.data[4];
      },
      set: function set(value) {
        this.data[4] = value;
      }
    }, {
      key: '5',
      get: function get() {
        return this.data[5];
      },
      set: function set(value) {
        this.data[5] = value;
      }
    }, {
      key: '6',
      get: function get() {
        return this.data[6];
      },
      set: function set(value) {
        this.data[6] = value;
      }
    }, {
      key: '7',
      get: function get() {
        return this.data[7];
      },
      set: function set(value) {
        this.data[7] = value;
      }
    }], [{
      key: 'translation',
      value: function translation(x, y) {
        var mat = new Mat3();
        var data = mat.data;
        data[0] = data[4] = data[8] = 1;
        data[6] = x;
        data[7] = y;
        return mat;
      }
    }, {
      key: 'rotation',
      value: function rotation(angle) {
        var mat = new Mat3();
        var data = mat.data;
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        data[0] = data[4] = c;
        data[1] = -s;
        data[3] = s;
        data[8] = 1;
        return mat;
      }
    }, {
      key: 'scale',
      value: function scale(x, y) {
        var mat = new Mat3();
        var data = mat.data;
        data[0] = x;
        data[4] = y;
        data[8] = 1;
        return mat;
      }
    }, {
      key: 'projection',
      value: function projection(w, h) {
        var mat = new Mat3();
        var data = mat.data;
        data[0] = 2 / w;
        data[4] = -2 / h;
        data[6] = -1;
        data[7] = mat[8] = 1;
        return mat;
      }
    }, {
      key: 'IDENTITY',
      get: function get() {
        var mat = new Mat3();
        var data = mat.data;
        data[0] = data[4] = data[8] = 1;
        return mat;
      }
    }]);

    return Mat3;
  })(ne.Mat2);

  return Mat3;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Mat4 = (function () {
  var Mat4 = (function (_ne$Mat) {
    _inherits(Mat4, _ne$Mat);

    function Mat4() {
      _classCallCheck(this, Mat4);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Mat4).apply(this, arguments));
    }

    _createClass(Mat4, [{
      key: 'clone',
      value: function clone() {
        return this.copyTo(new Mat4());
      }
    }, {
      key: 'width',
      get: function get() {
        return 4;
      }
    }, {
      key: 'height',
      get: function get() {
        return 4;
      }
    }, {
      key: '8',
      get: function get() {
        return this.data[8];
      },
      set: function set(value) {
        this.data[8] = value;
      }
    }, {
      key: '9',
      get: function get() {
        return this.data[9];
      },
      set: function set(value) {
        this.data[9] = value;
      }
    }, {
      key: '10',
      get: function get() {
        return this.data[10];
      },
      set: function set(value) {
        this.data[10] = value;
      }
    }, {
      key: '11',
      get: function get() {
        return this.data[11];
      },
      set: function set(value) {
        this.data[11] = value;
      }
    }, {
      key: '12',
      get: function get() {
        return this.data[12];
      },
      set: function set(value) {
        this.data[12] = value;
      }
    }, {
      key: '13',
      get: function get() {
        return this.data[13];
      },
      set: function set(value) {
        this.data[13] = value;
      }
    }, {
      key: '14',
      get: function get() {
        return this.data[14];
      },
      set: function set(value) {
        this.data[14] = value;
      }
    }, {
      key: '15',
      get: function get() {
        return this.data[15];
      },
      set: function set(value) {
        this.data[15] = value;
      }
    }], [{
      key: 'IDENTITY',
      get: function get() {
        var mat = new Mat4();
        mat.set(0, 0, 1);
        mat.set(1, 1, 1);
        mat.set(2, 2, 1);
        mat.set(3, 3, 1);
        return mat;
      }
    }]);

    return Mat4;
  })(ne.Mat3);

  return Mat4;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Point = (function () {
  var Point = (function (_ne$Vec) {
    _inherits(Point, _ne$Vec);

    function Point() {
      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var z = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      _classCallCheck(this, Point);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Point).call(this, x, y));

      _this.z = z;
      return _this;
    }

    _createClass(Point, [{
      key: 'set',
      value: function set(x, y) {
        var z = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

        this.x = x;
        this.y = y;
        this.z = typeof z == 'undefined' ? z : this.z;
      }
    }, {
      key: 'clone',
      value: function clone() {
        return new Point(this.x, this.y, this.z);
      }
    }, {
      key: 'length',
      get: function get() {
        return this.dimensions;
      }
    }, {
      key: 'dimensions',
      get: function get() {
        return z === null ? 2 : 3;
      }
    }, {
      key: '2',
      get: function get() {
        return this.z;
      },
      set: function set(value) {
        this.z = value;
      }
    }]);

    return Point;
  })(ne.Vec2);

  ne.tools.defineEscalarPorperties(Point.prototype, 'x', 'y', 'z');

  return Point;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.RectBase = (function () {
  var RectBase = (function (_ne$Vec) {
    _inherits(RectBase, _ne$Vec);

    function RectBase() {
      var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var w = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
      var h = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

      _classCallCheck(this, RectBase);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(RectBase).call(this, x, y, h, w));
    }

    _createClass(RectBase, [{
      key: 'set',
      value: function set(x, y, w, h) {
        _get(Object.getPrototypeOf(RectBase.prototype), 'set', this).call(this, x, y, h, w);
      }
    }, {
      key: 'clone',
      value: function clone() {
        return new RectBase(this.x, this.y, this.width, this.height);
      }
    }, {
      key: 'width',
      get: function get() {
        return this.w;
      },
      set: function set(value) {
        this.w = value;
      }
    }, {
      key: 'height',
      get: function get() {
        return this.z;
      },
      set: function set(value) {
        this.z = value;
      }
    }, {
      key: 'h',
      get: function get() {
        return this.z;
      },
      set: function set(value) {
        this.z = value;
      }
    }, {
      key: '2',
      get: function get() {
        return this.w;
      },
      set: function set(value) {
        this.w = value;
      }
    }, {
      key: '3',
      get: function get() {
        return this.h;
      },
      set: function set(value) {
        this.h = value;
      }
    }]);

    return RectBase;
  })(ne.Vec4);

  ne.tools.defineEscalarPorperties(RectBase.prototype, 'x', 'y', 'w', 'h');

  return RectBase;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Rect = (function () {
  var Rect = (function (_ne$RectBase) {
    _inherits(Rect, _ne$RectBase);

    function Rect() {
      _classCallCheck(this, Rect);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Rect).apply(this, arguments));
    }

    _createClass(Rect, [{
      key: "clone",
      value: function clone() {
        return new Rect(this.x, this.y, this.width, this.height);
      }
    }, {
      key: "topLeft",
      get: function get() {
        var self = this;
        return {
          get x() {
            return self.x;
          },
          get y() {
            return self.y;
          }
        };
      }
    }, {
      key: "topRight",
      get: function get() {
        var self = this;
        return {
          get x() {
            return self.x + self.width;
          },
          get y() {
            return self.y;
          }
        };
      }
    }, {
      key: "bottomLeft",
      get: function get() {
        var self = this;
        return {
          get x() {
            return self.x;
          },
          get y() {
            return self.y + self.height;
          }
        };
      }
    }, {
      key: "bottomRight",
      get: function get() {
        var self = this;
        return {
          get x() {
            return self.x + self.width;
          },
          get y() {
            return self.y + self.height;
          }
        };
      }
    }]);

    return Rect;
  })(ne.RectBase);

  ;

  return Rect;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ne.EventManager = (function () {

  return (function () {
    function EventManager() {
      _classCallCheck(this, EventManager);

      this._events = {};
    }

    _createClass(EventManager, [{
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
    }]);

    return EventManager;
  })();
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.SceneManager = (function () {

    return (function (_ne$EventManager) {
        _inherits(SceneManager, _ne$EventManager);

        function SceneManager() {
            _classCallCheck(this, SceneManager);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SceneManager).call(this));

            _this._sceneStack = [null];
            _this._lastScene = null;
            return _this;
        }

        _createClass(SceneManager, [{
            key: "goto",
            value: function goto(scene) {
                this.clearSceneStack();
                this.call(scene);
            }
        }, {
            key: "clearSceneStack",
            value: function clearSceneStack() {
                this._sceneStack = [null];
            }
        }, {
            key: "call",
            value: function call(scene) {
                this._sceneStack.push(scene);
            }
        }, {
            key: "back",
            value: function back() {
                this._sceneStack.pop();
            }
        }, {
            key: "update",
            value: function update(delta) {
                if (this._lastScene !== this.scene) {
                    this.switchScene();
                    return;
                }
                this.updateScene(delta);
            }
        }, {
            key: "switchScene",
            value: function switchScene() {
                this.destroyScene(this._lastScene);
                this._lastScene = this.scene;
                var loader = new ne.Loader();
                this.prepareLoad(loader);
                this.scene.load(this, loader);
                loader.start();
            }
        }, {
            key: "destroyScene",
            value: function destroyScene(scene) {}
        }, {
            key: "prepareLoad",
            value: function prepareLoad(loader) {
                var _this2 = this;

                loader.done(function () {
                    return _this2.afterLoad(loader);
                });
            }
        }, {
            key: "endLoad",
            value: function endLoad() {}
        }, {
            key: "afterLoad",
            value: function afterLoad(loader) {
                this.endLoad();
                this.scene.startGlData(game);
                this.scene.start(this, loader);
            }
        }, {
            key: "updateScene",
            value: function updateScene(delta) {
                if (this.scene) {
                    this.scene.act(delta);
                }
            }
        }, {
            key: "scene",
            get: function get() {
                return this._sceneStack[this._sceneStack.length - 1];
            }
        }]);

        return SceneManager;
    })(ne.EventManager);
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Game = (function () {

  return (function (_ne$SceneManager) {
    _inherits(Game, _ne$SceneManager);

    function Game(id, width, height) {
      _classCallCheck(this, Game);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this));

      _this.initMembers(id, width, height);
      _this.initEventHandlers();
      _this.processFrame();
      return _this;
    }

    _createClass(Game, [{
      key: 'initMembers',
      value: function initMembers(id, width, height) {
        this.createRenderer(width, height);
        this.appendRenderer(id);
        this._time = Date.now();
        this._processFrameBinding = this.processFrame.bind(this);
      }
    }, {
      key: 'initEventHandlers',
      value: function initEventHandlers() {
        var _this2 = this;

        window.addEventListener('resize', function (evt) {
          return _this2.fire('resize', evt);
        });
        window.addEventListener('unload', function (evt) {
          return _this2.fire('unload', evt);
        });
        window.addEventListener('beforeunload', function (evt) {
          return _this2.fire('beforeunload', evt);
        });
      }
    }, {
      key: 'createRenderer',
      value: function createRenderer(width, height) {
        this._renderer = new ne.WebGLRenderer(width, height);
      }
    }, {
      key: 'appendRenderer',
      value: function appendRenderer(id) {
        var e = document.getElementById(id);
        e.appendChild(this._renderer.view);
      }
    }, {
      key: 'render',
      value: function render() {
        if (this.scene) {
          this._renderer.render(this.scene);
        }
      }
    }, {
      key: 'processFrame',
      value: function processFrame() {
        this.update(this.calculateDelta());
        this.render();
        window.setTimeout(this._processFrameBinding, 0);
      }
    }, {
      key: 'calculateDelta',
      value: function calculateDelta() {
        var t = Date.now();
        var delta = t - this._time;
        this._time = t;
        return delta;
      }
    }, {
      key: 'destroyScene',
      value: function destroyScene(scene) {
        if (scene) {
          this._renderer.destroy(scene);
        }
      }
    }, {
      key: 'resize',
      value: function resize(width, height) {
        this._renderer.resize(width, height);
      }
    }, {
      key: 'width',
      get: function get() {
        return this._renderer.width;
      }
    }, {
      key: 'height',
      get: function get() {
        return this._renderer.height;
      }
    }]);

    return Game;
  })(ne.SceneManager);
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.ColorBase = (function () {
  var ColorBase = (function (_ne$Vec) {
    _inherits(ColorBase, _ne$Vec);

    function ColorBase() {
      var r = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var g = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var b = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
      var a = arguments.length <= 3 || arguments[3] === undefined ? 255 : arguments[3];

      _classCallCheck(this, ColorBase);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(ColorBase).call(this, r, g, b, a));
    }

    _createClass(ColorBase, [{
      key: 'set',
      value: function set(r, g, b) {
        var a = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

        if (typeof a == 'undefined') a = this.alpha;
        _get(Object.getPrototypeOf(ColorBase.prototype), 'set', this).call(this, r, g, b, a);
        return this;
      }
    }, {
      key: 'clone',
      value: function clone() {
        return new ColorBase(this.red, this.green, this.blue, this.alpha);
      }
    }, {
      key: 'x',
      get: function get() {
        return this.red;
      },
      set: function set(value) {
        this.red = value;
      }
    }, {
      key: 'y',
      get: function get() {
        return this.green;
      },
      set: function set(value) {
        this.green = value;
      }
    }, {
      key: 'z',
      get: function get() {
        return this.blue;
      },
      set: function set(value) {
        this.blue = value;
      }
    }, {
      key: 'w',
      get: function get() {
        return this.alpha;
      },
      set: function set(value) {
        this.alpha = value;
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
      key: 'hue',
      get: function get() {
        return this.toHsl()[0];
      },
      set: function set(value) {
        var hsla = this.toHsla();
        hsla[0] = value;
        var c = ne.Color.fromHsla(hsla);
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
    }]);

    return ColorBase;
  })(ne.Vec4);

  return ColorBase;
})();
"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Color = (function () {
    var Color = (function (_ne$ColorBase) {
        _inherits(Color, _ne$ColorBase);

        function Color() {
            _classCallCheck(this, Color);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(Color).apply(this, arguments));
        }

        _createClass(Color, [{
            key: "clone",
            value: function clone() {
                return new Color(this.red, this.green, this.blue, this.alpha);
            }
        }, {
            key: "complement",
            value: function complement() {
                this.hue = (0.5 + this.hue) % 1;
                return this;
            }
        }, {
            key: "toCss",
            value: function toCss() {
                var a = this.alpha / 255;
                return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + a + ")";
            }
        }, {
            key: "toStyle",
            value: function toStyle() {
                return this.toCss();
            }
        }, {
            key: "toArgb",
            value: function toArgb() {
                return this.alpha << 24 + this.red << 16 + this.green << 8 + this.blue;
            }
        }, {
            key: "toRgba",
            value: function toRgba() {
                return this.red << 24 + this.green << 16 + this.blue << 8 + this.alpha;
            }
        }, {
            key: "toRgb",
            value: function toRgb() {
                return this.red << 16 + this.green << 8 + this.blue;
            }
        }, {
            key: "toHsla",
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
            key: "toHsl",
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
            key: "grayscale",
            value: function grayscale() {
                var avg = 0.21 * this.red + 0.72 * this.green + 0.07 * this.blue;
                return this.set(avg, avg, avg);
            }
        }, {
            key: "average",
            value: function average() {
                var avg = (this.red + this.green + this.blue) / 3;
                return this.set(avg, avg, avg);
            }
        }, {
            key: "lightnessAverage",
            value: function lightnessAverage() {
                var _Math, _Math2;

                var args = [this.red, this.green, this.blue];
                var avg = ((_Math = Math).max.apply(_Math, args) + (_Math2 = Math).min.apply(_Math2, args)) / 2;
                return this.set(avg, avg, avg);
            }
        }, {
            key: "invert",
            value: function invert() {
                var alpha = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

                var a = alpha ? 255 - this.alpha : this.alpha;
                return this.set(255 - this.red, 255 - this.green, 255 - this.blue, a);
            }
        }], [{
            key: "_hue2rgb",
            value: function _hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }
        }, {
            key: "_hslToRgb",
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
            key: "fromRgba",
            value: function fromRgba(rgba) {
                var r = rgba >> 24 && 0xFF;
                var g = rgba >> 16 && 0xFF;
                var b = rgba >> 8 && 0xFF;
                var a = rgba >> 0 && 0xFF;
                return new Color(r, g, b, a);
            }
        }, {
            key: "fromRgb",
            value: function fromRgb(rgb) {
                var r = rgba >> 16 && 0xFF;
                var g = rgba >> 8 && 0xFF;
                var b = rgba >> 0 && 0xFF;
                return new Color(r, g, b);
            }
        }, {
            key: "fromArgb",
            value: function fromArgb(argb) {
                var a = rgba >> 24 && 0xFF;
                var r = rgba >> 16 && 0xFF;
                var g = rgba >> 8 && 0xFF;
                var b = rgba >> 0 && 0xFF;
                return new Color(r, g, b, a);
            }
        }, {
            key: "fromHsla",
            value: function fromHsla(hsla) {
                var _hsla = _slicedToArray(hsla, 4);

                var h = _hsla[0];
                var s = _hsla[1];
                var l = _hsla[2];
                var a = _hsla[3];

                return this._hslToRgb(h, s, l, a);
            }
        }, {
            key: "fromHsl",
            value: function fromHsl(hsl) {
                var _hsl = _slicedToArray(hsl, 3);

                var h = _hsl[0];
                var s = _hsl[1];
                var l = _hsl[2];

                return this._hslToRgb(h, s, l, 255);
            }
        }, {
            key: "WHITE",
            get: function get() {
                return new ne.Color(255, 255, 255);
            }
        }, {
            key: "BLACK",
            get: function get() {
                return new ne.Color();
            }
        }, {
            key: "RED",
            get: function get() {
                return new ne.Color(255, 0, 0);
            }
        }, {
            key: "GREEN",
            get: function get() {
                return new ne.Color(0, 128, 0);
            }
        }, {
            key: "BLUE",
            get: function get() {
                return new ne.Color(0, 0, 255);
            }
        }, {
            key: "YELLOW",
            get: function get() {
                return new ne.Color(255, 255, 0);
            }
        }, {
            key: "MAGENTA",
            get: function get() {
                return new ne.Color(255, 0, 255);
            }
        }, {
            key: "CYAN",
            get: function get() {
                return new ne.Color(0, 255, 255);
            }
        }, {
            key: "GRAY",
            get: function get() {
                return new ne.Color(128, 128, 128);
            }
        }, {
            key: "DARK_GRAY",
            get: function get() {
                return new ne.Color(169, 169, 169);
            }
        }, {
            key: "LIGHT_GRAY",
            get: function get() {
                return new ne.Color(211, 211, 211);
            }
        }, {
            key: "ORANGE",
            get: function get() {
                return new ne.Color(255, 165, 0);
            }
        }, {
            key: "BROWN",
            get: function get() {
                return new ne.Color(165, 42, 42);
            }
        }, {
            key: "LIME",
            get: function get() {
                return new ne.Color(0, 255, 0);
            }
        }, {
            key: "LIGHT_BLUE",
            get: function get() {
                return new ne.Color(173, 216, 230);
            }
        }, {
            key: "PINK",
            get: function get() {
                return new ne.Color(255, 192, 203);
            }
        }, {
            key: "RANDOM",
            get: function get() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return new ne.Color(r, g, b);
            }
        }]);

        return Color;
    })(ne.ColorBase);

    return Color;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Tone = (function () {
  var Tone = (function (_ne$Vec) {
    _inherits(Tone, _ne$Vec);

    function Tone() {
      var r = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var g = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var b = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
      var a = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

      _classCallCheck(this, Tone);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Tone).call(this, r, g, b, a));
    }

    _createClass(Tone, [{
      key: 'set',
      value: function set(r, g, b) {
        var a = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

        if (typeof a == 'undefined') a = this.gray;
        _get(Object.getPrototypeOf(Tone.prototype), 'set', this).call(this, r, g, b, a);
        return this;
      }
    }, {
      key: 'x',
      get: function get() {
        return this.red;
      },
      set: function set(value) {
        this.red = value;
      }
    }, {
      key: 'y',
      get: function get() {
        return this.green;
      },
      set: function set(value) {
        this.green = value;
      }
    }, {
      key: 'z',
      get: function get() {
        return this.blue;
      },
      set: function set(value) {
        this.blue = value;
      }
    }, {
      key: 'w',
      get: function get() {
        return this.gray;
      },
      set: function set(value) {
        this.gray = value;
      }
    }, {
      key: 'red',
      get: function get() {
        return this._red;
      },
      set: function set(value) {
        this._red = Math.max(-255, Math.min(255, value));
      }
    }, {
      key: 'green',
      get: function get() {
        return this._green;
      },
      set: function set(value) {
        this._green = Math.max(-255, Math.min(255, value));
      }
    }, {
      key: 'blue',
      get: function get() {
        return this._blue;
      },
      set: function set(value) {
        this._blue = Math.max(-255, Math.min(255, value));
      }
    }, {
      key: 'gray',
      get: function get() {
        return this._gray;
      },
      set: function set(value) {
        this._gray = Math.max(0, Math.min(255, value));
      }
    }, {
      key: 'grey',
      get: function get() {
        return this.gray;
      },
      set: function set(value) {
        this.gray = value;
      }
    }], [{
      key: 'RANDOM',
      get: function get() {
        var red = Math.floor(Math.random() * 512 - 255);
        var green = Math.floor(Math.random() * 512 - 255);
        var blue = Math.floor(Math.random() * 512 - 255);
        var gray = Math.floor(Math.random() * 256);
        return new Tone(red, green, blue, gray);
      }
    }]);

    return Tone;
  })(ne.Vec4);

  return Tone;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ne.ShaderBase = (function () {

  var shaderUsed = null;

  var ShaderBase = (function () {
    function ShaderBase() {
      _classCallCheck(this, ShaderBase);

      this.initMembers();
    }

    _createClass(ShaderBase, [{
      key: "initMembers",
      value: function initMembers() {
        this._glProgram = null;
        this._glVertex = null;
        this._glFragment = null;
        this._glAttributes = {};
        this._glUniforms = {};
      }
    }, {
      key: "vertex",
      value: function vertex() {
        return "";
      }
    }, {
      key: "fragment",
      value: function fragment() {
        return "";
      }
    }, {
      key: "attributes",
      value: function attributes() {
        return {};
      }
    }, {
      key: "uniforms",
      value: function uniforms() {
        return {};
      }
    }, {
      key: "varying",
      value: function varying() {
        return {};
      }
    }, {
      key: "generate",
      value: function generate(gl) {
        if (!this._glProgram) {
          this.generateVertexShader(gl);
          this.generateFragmentShader(gl);
          this.generateProgram(gl);
          this.generateVariables(gl);
        }
        return this._glProgram;
      }
    }, {
      key: "use",
      value: function use(gl) {
        if (shaderUsed !== this) {
          shaderUsed = this;
          gl.useProgram(this._glProgram);
        }
      }
    }, {
      key: "generateVariables",
      value: function generateVariables(gl) {
        this.generateAttributes(gl);
        this.generateUniforms(gl);
      }
    }, {
      key: "generateAttributes",
      value: function generateAttributes(gl) {
        var _this = this;

        var attributes = this.attributes();
        Object.keys(attributes).forEach(function (attr) {
          _this._glAttributes[attr] = gl.getAttribLocation(_this._glProgram, attr);
        });
      }
    }, {
      key: "generateUniforms",
      value: function generateUniforms(gl) {
        var _this2 = this;

        var uniforms = this.uniforms();
        Object.keys(uniforms).forEach(function (u) {
          _this2._glUniforms[u] = gl.getUniformLocation(_this2._glProgram, u);
        });
      }
    }, {
      key: "destroy",
      value: function destroy(gl) {
        this.destroyVertexShader(gl);
        this.destroyFragmentShader(gl);
        this.destroyProgram(gl);
      }
    }, {
      key: "destroyVertexShader",
      value: function destroyVertexShader(gl) {
        if (this._glVertex) {
          if (this._glProgram) {
            gl.detachShader(this._glProgram, this._glVertex);
            gl.destroyShader(this._glVertex);
          }
          this._glVertex = null;
        }
      }
    }, {
      key: "destroyFragmentShader",
      value: function destroyFragmentShader(gl) {
        if (this._glFragment) {
          if (this._glProgram) {
            gl.detachShader(this._glProgram, this._glFragment);
            gl.destroyShader(this._glFragment);
          }
          this._glVertex = null;
        }
      }
    }, {
      key: "destroyProgram",
      value: function destroyProgram(gl) {
        if (this._glProgram) {
          gl.destroyProgram(this._glProgram);
          this._glProgram = null;
        }
      }
    }, {
      key: "generateVertexShader",
      value: function generateVertexShader(gl) {
        try {
          this._glVertex = ne.tools.gl.makeShader(gl, gl.VERTEX_SHADER, this.vertexSource());
        } catch (e) {
          this.destroy(gl);
          throw e;
        }
      }
    }, {
      key: "generateFragmentShader",
      value: function generateFragmentShader(gl) {
        try {
          this._glFragment = ne.tools.gl.makeShader(gl, gl.FRAGMENT_SHADER, this.fragmentSource());
        } catch (e) {
          this.destroy(gl);
          throw e;
        }
      }
    }, {
      key: "vertexSource",
      value: function vertexSource() {
        return this.vertexHeader() + this.mainFunction(this.vertex());
      }
    }, {
      key: "fragmentSource",
      value: function fragmentSource() {
        return this.fragmentHeader() + this.mainFunction(this.fragment());
      }
    }, {
      key: "generateProgram",
      value: function generateProgram(gl) {
        try {
          this._glProgram = ne.tools.gl.makeProgram(gl, this._glVertex, this._glFragment);
        } catch (e) {
          this.destroy(gl);
          throw e;
        }
      }
    }, {
      key: "vertexHeader",
      value: function vertexHeader() {
        return this.precision() + this.attributeSource() + this.uniformSource() + this.varyingSource();
      }
    }, {
      key: "fragmentHeader",
      value: function fragmentHeader() {
        return this.precision() + this.uniformSource() + this.varyingSource();
      }
    }, {
      key: "sourceFromObject",
      value: function sourceFromObject(kind, list) {
        var result = '';
        for (var a in list) {
          if (list.hasOwnProperty(a)) {
            var type = this.glType(list[a]);
            result += kind + " " + type + " " + a + ";\n";
          }
        }
        return result;
      }
    }, {
      key: "updateAttributes",
      value: function updateAttributes(gl) {
        var _this3 = this;

        Object.keys(this._glAttributes).forEach(function (name) {
          _this3.updateAttribute(gl, name);
        });
      }
    }, {
      key: "updateAttribute",
      value: function updateAttribute(gl, name) {
        var location = this._glAttributes[name];
        if (typeof location !== 'undefined') {
          gl.enableVertexAttribArray(location);
          gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
        }
      }
    }, {
      key: "attributeSource",
      value: function attributeSource() {
        return this.sourceFromObject('attribute', this.attributes());
      }
    }, {
      key: "uniformSource",
      value: function uniformSource() {
        return this.sourceFromObject('uniform', this.uniforms());
      }
    }, {
      key: "varyingSource",
      value: function varyingSource() {
        return this.sourceFromObject('varying', this.varying());
      }
    }, {
      key: "precision",
      value: function precision() {
        return 'precision mediump float;\n';
      }
    }, {
      key: "mainFunction",
      value: function mainFunction(code) {
        return "void main(void) {\n " + code + " \n}";
      }
    }, {
      key: "glType",
      value: function glType(type) {
        return ShaderBase.TYPES[type];
      }
    }]);

    return ShaderBase;
  })();

  ShaderBase.TYPES = {
    'point': 'vec2',
    '3d-point': 'vec3',
    'color': 'vec4',
    'number': 'float',
    'array': 'vec4',
    'real': 'real',
    'rect': 'vec4',
    'vec2': 'vec2',
    'vec3': 'vec3',
    'vec4': 'vec4',
    'float': 'float',
    'sampler2D': 'sampler2D',
    'sampler1D': 'sampler1D',
    'sampler3D': 'sampler3D',
    'int': 'int',
    'mat2': 'mat2',
    'mat3': 'mat3',
    'mat4': 'mat4',
    'tone': 'vec4'
  };

  ShaderBase.VALUES = {
    'point': function point() {
      return new ne.Point(0, 0);
    },
    '3d-point': function dPoint() {
      return new ne.Point(0, 0, 0);
    },
    'color': function color() {
      return new ne.Color(0, 0, 0);
    },
    'rect': function rect() {
      return new ne.Rect();
    },
    'number': function number() {
      return 0;
    },
    'float': function float() {
      return 0;
    },
    'real': function real() {
      return 0;
    },
    'vec2': function vec2() {
      return new ne.Vec2();
    },
    'vec3': function vec3() {
      return new ne.Vec3();
    },
    'vec4': function vec4() {
      return new ne.Vec4();
    },
    'array': function array() {
      return [0, 0, 0, 0];
    },
    'mat2': function mat2() {
      return new ne.Mat2();
    },
    'mat3': function mat3() {
      return new ne.Mat3();
    },
    'mat4': function mat4() {
      return new ne.Mat4();
    },
    'tone': function tone() {
      return new ne.Tone();
    }
  };

  ShaderBase.UNIFORM_SET = {
    'float': function float(gl, location, value) {
      return gl.uniform1f(location, value);
    },
    'number': function number(gl, location, value) {
      return gl.uniform1f(location, value);
    },
    'real': function real(gl, location, value) {
      return gl.uniform1f(location, value);
    },
    'vec2': function vec2(gl, location, value) {
      return gl.uniform2f(location, value[0], value[1]);
    },
    'vec3': function vec3(gl, location, value) {
      return gl.uniform3f(location, value[0], value[1], value[2]);
    },
    'vec4': function vec4(gl, location, value) {
      return gl.uniform4f(location, value[0], value[1], value[2], value[3]);
    },
    'point': function point(gl, location, value) {
      return gl.uniform2f(location, value.x, value.y);
    },
    'rect': function rect(gl, location, value) {
      return gl.uniform4f(location, value.x, value.y, value.width, value.height);
    },
    'color': function color(gl, location, value) {
      return gl.uniform4f(location, value.red / 255, value.green / 255, value.blue / 255, value.alpha / 255);
    },
    'array': function array(gl, location, value) {
      return gl['uniform' + value.length + 'f'].apply(gl, [location].concat(_toConsumableArray(value)));
    },
    'mat2': function mat2(gl, location, value) {
      return gl.uniformMatrix3fv(location, false, value.data);
    },
    'mat3': function mat3(gl, location, value) {
      return gl.uniformMatrix3fv(location, false, value.data);
    },
    'mat4': function mat4(gl, location, value) {
      return gl.uniformMatrix3fv(location, false, value.data);
    },
    'tone': function tone(gl, location, value) {
      return gl.uniform4f(location, value.red / 255, value.green / 255, value.blue / 255, value.gray / 255);
    }
  };

  return ShaderBase;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Shader = (function () {

  return (function (_ne$ShaderBase) {
    _inherits(Shader, _ne$ShaderBase);

    function Shader() {
      _classCallCheck(this, Shader);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Shader).call(this));
    }

    _createClass(Shader, [{
      key: 'initMembers',
      value: function initMembers() {
        _get(Object.getPrototypeOf(Shader.prototype), 'initMembers', this).call(this);
        this._values = this._defaultSet(this.uniforms());
      }
    }, {
      key: '_defaultSet',
      value: function _defaultSet(set) {
        var _this2 = this;

        var result = {};
        Object.keys(set).forEach(function (i) {
          result[i] = _this2._getDefaultValue(set[i]);
        });
        return result;
      }
    }, {
      key: '_getDefaultValue',
      value: function _getDefaultValue(type) {
        if (typeof ne.ShaderBase.VALUES[type] == 'undefined') {
          return null;
        }
        return ne.ShaderBase.VALUES[type]();
      }
    }, {
      key: 'update',
      value: function update(gl) {
        this.updateUniforms(gl);
      }
    }, {
      key: 'updateUniforms',
      value: function updateUniforms(gl) {
        var _this3 = this;

        var values = this.uniformValues;
        var types = this.uniforms();
        Object.keys(values).forEach(function (u) {
          _this3.updateUniform(gl, u, types[u], values[u]);
        });
      }
    }, {
      key: 'updateUniform',
      value: function updateUniform(gl, name, type, value) {
        var location = this._glUniforms[name];
        if (typeof location != 'undefined' && value !== null) {
          if (typeof ne.ShaderBase.UNIFORM_SET[type] !== 'undefined') {
            ne.ShaderBase.UNIFORM_SET[type](gl, location, value);
          }
        }
      }
    }, {
      key: 'updateUniformByType',
      value: function updateUniformByType(gl, location, type, value) {
        switch (type) {
          case 'float':case 'number':case 'real':
            gl.uniform1f(location, value);
            break;
          case 'vec2':
            gl.uniform2f(location, value[0], value[1]);
            break;
          case 'vec3':
            gl.uniform3f(location, value[0], value[1], value[2]);
            break;
          case 'vec4':
            gl.uniform4f(location, value[0], value[1], value[2], value[3]);
            break;
          case 'point':
            gl.uniform2f(location, value.x, value.y);
            break;
          case 'rect':
            gl.uniform4f(location, value.x, value.y, value.width, value.height);
            break;
          case 'color':
            gl.uniform4f(location, value.red / 255, value.green / 255, value.blue / 255, value.alpha / 255);
            break;
          case 'array':
            gl['uniform' + value.length + 'f'].apply(gl, [location].concat(_toConsumableArray(value)));
          default:
            break;
        }
      }
    }, {
      key: 'uniformValues',
      get: function get() {
        return this._values;
      }
    }]);

    return Shader;
  })(ne.ShaderBase);
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ne.Texture = (function () {

  return (function () {
    function Texture(pixmap) {
      _classCallCheck(this, Texture);

      this._data = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]);
      this._pixmap = pixmap;
      this._glTexture = null;
      this._buffer = null;
      this._isDirty = false;
    }

    _createClass(Texture, [{
      key: "generate",
      value: function generate(gl) {
        if (this._isDirty) {
          this._isDirty = false;
          this.destroyTexture();
        }
        this.regenerateTexture(gl);
        this.regenerateBuffer(gl);
        return this._glTexture;
      }
    }, {
      key: "update",
      value: function update() {
        this._isDirty = true;
      }
    }, {
      key: "regenerateTexture",
      value: function regenerateTexture(gl) {
        if (!this._glTexture) {
          this.generateTexture(gl);
        }
      }
    }, {
      key: "regenerateBuffer",
      value: function regenerateBuffer(gl) {
        if (!this._buffer) {
          this.generateBuffer(gl);
        }
      }
    }, {
      key: "destroy",
      value: function destroy(gl) {
        this.destroyTexture(gl);
        this.destroyBuffer(gl);
      }
    }, {
      key: "destroyTexture",
      value: function destroyTexture(gl) {
        if (this._glTexture) {
          gl.destroyTexture(gl);
          this._glTexture = null;
        }
      }
    }, {
      key: "destroyBuffer",
      value: function destroyBuffer(gl) {
        if (this._buffer) {
          gl.destroyBuffer(this._buffer);
          this._buffer = null;
        }
      }
    }, {
      key: "generateBuffer",
      value: function generateBuffer(gl) {
        this._buffer = gl.createBuffer();
      }
    }, {
      key: "generateTexture",
      value: function generateTexture(gl) {
        this._glTexture = this._pixmap.generateTexture(gl);
      }
    }, {
      key: "bind",
      value: function bind(gl, rect) {
        this.generate(gl);
        var r = this.bindBuffer(gl, rect);
        this.bindTexture(gl);
        return r;
      }
    }, {
      key: "bindBuffer",
      value: function bindBuffer(gl, rect) {
        var r = this.refreshData(rect);
        ne.tools.gl.bindBuffer(gl, this._buffer, this._data);
        return r;
      }
    }, {
      key: "refreshData",
      value: function refreshData(rect) {
        var r = this.textureRect(rect);
        this._data[0] = this._data[4] = this._data[6] = r.x;
        this._data[1] = this._data[3] = this._data[9] = r.y;
        this._data[2] = this._data[8] = this._data[10] = r.w;
        this._data[5] = this._data[7] = this._data[11] = r.h;
        return r;
      }
    }, {
      key: "clamp",
      value: function clamp(min, max, value) {
        return Math.max(min, Math.min(max, value));
      }
    }, {
      key: "bindTexture",
      value: function bindTexture(gl) {
        ne.tools.gl.bindTexture(gl, this._glTexture);
      }
    }, {
      key: "textureRect",
      value: function textureRect(rect) {
        var x1 = rect.x / this.width;
        var y1 = rect.y / this.height;
        var x2 = (rect.w + rect.x) / this.width;
        var y2 = (rect.h + rect.y) / this.height;
        return new ne.Rect(x1, y1, x2, y2);
      }
    }, {
      key: "rect",
      get: function get() {
        return this._pixmap.rect;
      }
    }, {
      key: "width",
      get: function get() {
        return this._pixmap.width;
      }
    }, {
      key: "height",
      get: function get() {
        return this._pixmap.height;
      }
    }]);

    return Texture;
  })();
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ne.Pixmap = (function () {

  return (function () {
    function Pixmap() {
      var width = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
      var height = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      _classCallCheck(this, Pixmap);

      this._canvas = document.createElement('canvas');
      this._canvas.width = width;
      this._canvas.height = height;
      this._context = this._canvas.getContext('2d');
    }

    _createClass(Pixmap, [{
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
    }, {
      key: 'generateTexture',
      value: function generateTexture(gl) {
        return ne.tools.gl.textureFromCanvas(gl, this._canvas);
      }
    }, {
      key: 'strokeRect',
      value: function strokeRect(rect, style) {
        var width = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

        var state = this._context.save();
        this._context.strokeStyle = style.toStyle();
        this._context.lineWidth = width;
        this._context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        this._context.restore(state);
      }
    }, {
      key: 'fillRect',
      value: function fillRect(rect, style) {
        var state = this._context.save();
        this._context.fillStyle = style.toStyle();
        this._context.fillRect(rect.x, rect.y, rect.width, rect.height);
        this._context.restore(state);
      }
    }, {
      key: 'clearRect',
      value: function clearRect(rect) {
        this._context.clearRect(rect.x, rect.y, rect.width, rect.height);
      }
    }, {
      key: 'clear',
      value: function clear() {
        this._context.clearRect(0, 0, this.width, this.height);
      }
    }, {
      key: 'width',
      get: function get() {
        return this._canvas.width;
      }
    }, {
      key: 'height',
      get: function get() {
        return this._canvas.height;
      }
    }, {
      key: 'rect',
      get: function get() {
        return new ne.Rect(0, 0, this.width, this.height);
      }
    }], [{
      key: 'fromImage',
      value: function fromImage(img) {
        var pixmap = new Pixmap(img.width, img.height);
        pixmap._bltImage(img, 0, 0, img.width, img.height);
        return pixmap;
      }
    }]);

    return Pixmap;
  })();
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ne.Renderer = (function () {

    return (function () {
        function Renderer(width, height) {
            _classCallCheck(this, Renderer);

            this.initMembers(width, height);
        }

        _createClass(Renderer, [{
            key: 'initMembers',
            value: function initMembers(width, height) {
                this.createCanvas(width, height);
                this.createContext();
            }
        }, {
            key: 'createCanvas',
            value: function createCanvas(width, height) {
                this._canvas = document.createElement('canvas');
                this._canvas.width = width;
                this._canvas.height = height;
            }
        }, {
            key: 'createContext',
            value: function createContext() {}
        }, {
            key: 'render',
            value: function render(object) {}
        }, {
            key: 'destroy',
            value: function destroy(object) {}
        }, {
            key: 'resize',
            value: function resize(width, height) {
                this._canvas.width = width;
                this._canvas.height = height;
            }
        }, {
            key: 'view',
            get: function get() {
                return this._canvas;
            }
        }, {
            key: 'width',
            get: function get() {
                return this._canvas.width;
            }
        }, {
            key: 'height',
            get: function get() {
                return this._canvas.height;
            }
        }]);

        return Renderer;
    })();
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.WebGLRenderer = (function () {

  return (function (_ne$Renderer) {
    _inherits(WebGLRenderer, _ne$Renderer);

    function WebGLRenderer() {
      _classCallCheck(this, WebGLRenderer);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(WebGLRenderer).apply(this, arguments));
    }

    _createClass(WebGLRenderer, [{
      key: 'createContext',
      value: function createContext() {
        this._gl = this.view.getContext('webgl');
        if (!this._gl) {
          this._gl = this.view.getContext('exerimental-webgl');
        }
        if (!this._gl) {
          throw "Your browser doesn't support webgl.";
        }
      }
    }, {
      key: 'render',
      value: function render(object) {
        object.render(this._gl);
      }
    }, {
      key: 'destroy',
      value: function destroy(object) {
        object.destroy(this._gl);
      }
    }]);

    return WebGLRenderer;
  })(ne.Renderer);
})();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Canvas2DRenderer = (function () {

  return (function (_ne$Renderer) {
    _inherits(Canvas2DRenderer, _ne$Renderer);

    function Canvas2DRenderer() {
      _classCallCheck(this, Canvas2DRenderer);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Canvas2DRenderer).apply(this, arguments));
    }

    return Canvas2DRenderer;
  })(ne.Renderer);
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Drawable = (function () {

    return (function (_ne$EventManager) {
        _inherits(Drawable, _ne$EventManager);

        function Drawable() {
            _classCallCheck(this, Drawable);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Drawable).call(this));

            _this.initMembers();
            return _this;
        }

        _createClass(Drawable, [{
            key: "initMembers",
            value: function initMembers() {
                this._parent = null;
                this.z = 0;
                this.visible = true;
            }
        }, {
            key: "render",
            value: function render(gl) {}
        }, {
            key: "destroy",
            value: function destroy(gl) {}
        }, {
            key: "render2D",
            value: function render2D(context) {}
        }, {
            key: "parent",
            get: function get() {
                return this._parent;
            }
        }, {
            key: "z",
            get: function get() {
                return this._z;
            },
            set: function set(value) {
                if (this._z !== value) {
                    this._z = value;
                    var parent = this.parent;
                    if (parent) {
                        parent.zUpdate();
                    }
                }
            }
        }, {
            key: "parentWidth",
            get: function get() {
                return this.parent ? this.parent.width : 1;
            }
        }, {
            key: "parentHeight",
            get: function get() {
                return this.parent ? this.parent.height : 1;
            }
        }]);

        return Drawable;
    })(ne.EventManager);
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Actor = (function () {
  var Actor = (function (_ne$Drawable) {
    _inherits(Actor, _ne$Drawable);

    function Actor() {
      _classCallCheck(this, Actor);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Actor).apply(this, arguments));
    }

    _createClass(Actor, [{
      key: "initMembers",
      value: function initMembers() {
        _get(Object.getPrototypeOf(Actor.prototype), "initMembers", this).call(this);
        this._twigs = [];
      }
    }, {
      key: "act",
      value: function act(delta) {}
    }, {
      key: "twig",
      value: function twig(props, time) {
        var type = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

        if (!type) {
          type = this.defaultTwigMode();
        }
        if (time <= 0) {
          time = 0;
        }
        var twig = new Twig(this, props, time, type);
        this._twigs.push(twig);
        return twig;
      }
    }, {
      key: "defaultTwigMode",
      value: function defaultTwigMode() {
        return Twig.LINEAR;
      }
    }, {
      key: "act",
      value: function act(delta) {
        this.updateTwigs(delta);
      }
    }, {
      key: "updateTwigs",
      value: function updateTwigs(delta) {
        var toRemove = this._twigs.filter(function (twig) {
          return twig.update(delta);
        });
        this.removeTwigs(toRemove);
      }
    }, {
      key: "removeTwigs",
      value: function removeTwigs(toRemove) {
        var _this2 = this;

        toRemove.forEach(function (twig) {
          var index = _this2._twigs.indexOf(twig);
          _this2._setProperties(twig.properties);
          _this2._twigs.splice(index, 1);
        });
      }
    }, {
      key: "_setProperties",
      value: function _setProperties(props) {
        var _this3 = this;

        Object.keys(props).forEach(function (i) {
          _this3[i] = props[i];
        });
      }
    }]);

    return Actor;
  })(ne.Drawable);

  var Twig = (function () {
    function Twig(subject, props, time, type) {
      _classCallCheck(this, Twig);

      this.initMembers(subject, props, time, type);
    }

    _createClass(Twig, [{
      key: "initMembers",
      value: function initMembers(subject, props, time, type) {
        this._properties = props;
        this._time = time;
        this._totalTime = time;
        this._type = type;
        this._subject = subject;
        this._initialValues = this.createInitialValues(subject, props);
        this._whenDone = [];
        this._doneCall = false;
      }
    }, {
      key: "createInitialValues",
      value: function createInitialValues(subject, props) {
        var result = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var k = _step.value;

            result[k] = subject[k];
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
      key: "update",
      value: function update(delta) {
        this._time = this._time - delta;
        if (this._time > 0) {
          this.updateValues();
          return false;
        }
        this.setFinalValues();
        this.callDoneCallbacks();
        return true;
      }
    }, {
      key: "setFinalValues",
      value: function setFinalValues() {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Object.keys(this._properties)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var k = _step2.value;

            this._subject[k] = this._properties[k];
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }, {
      key: "callDoneCallbacks",
      value: function callDoneCallbacks() {
        var _this4 = this;

        if (!this._doneCall) {
          this._doneCall = true;
          this._whenDone.forEach(function (callback) {
            return callback(_this4._subject);
          });
        }
      }
    }, {
      key: "updateValues",
      value: function updateValues() {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = Object.keys(this._properties)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var k = _step3.value;

            var init = this._initialValues[k];
            var final = this._properties[k];
            var current = this._subject[k];
            var v = this._type(init, final, current, this._totalTime, this._time);
            this._subject[k] = v;
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    }, {
      key: "done",
      value: function done(callback) {
        this._whenDone.push(callback);
        return this;
      }
    }, {
      key: "properties",
      get: function get() {
        return this._properties;
      }
    }]);

    return Twig;
  })();

  Actor.Twig = Twig;

  Twig.LINEAR = function (originalValue, finalValue, currentValue, totalTime, timeLeft) {
    return originalValue + (finalValue - originalValue) * (totalTime - timeLeft) / totalTime;
  };

  Twig.EASE_IN = function (originalValue, finalValue, currentValue, totalTime, timeLeft) {
    return (currentValue * (timeLeft - 1) + finalValue) / timeLeft;
  };

  return Actor;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Container = (function () {

  return (function (_ne$Actor) {
    _inherits(Container, _ne$Actor);

    function Container() {
      _classCallCheck(this, Container);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Container).call(this));
    }

    _createClass(Container, [{
      key: "initMembers",
      value: function initMembers() {
        _get(Object.getPrototypeOf(Container.prototype), "initMembers", this).call(this);
        this._children = [];
        this._zRefresh = false;
      }
    }, {
      key: "act",
      value: function act(delta) {
        _get(Object.getPrototypeOf(Container.prototype), "act", this).call(this, delta);
        this._refreshZ();
        this._makeChildrenAct(delta);
      }
    }, {
      key: "render",
      value: function render(gl) {
        this._renderChildren(gl);
      }
    }, {
      key: "destroy",
      value: function destroy(gl) {
        _get(Object.getPrototypeOf(Container.prototype), "destroy", this).call(this, gl);
        this.destroyChildren(gl);
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
      key: "destroyChildren",
      value: function destroyChildren(gl) {
        this.children.forEach(function (child) {
          return child.destroy(gl);
        });
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
          child._parent = this;
          this.children.push(child);
          this.zUpdate();
        }
      }
    }, {
      key: "remove",
      value: function remove(child) {
        var index = this.indexOf(child);
        this.removeAt(index);
      }
    }, {
      key: "removeAt",
      value: function removeAt(index) {
        if (index >= 0 && index <= this.length) {
          var deleted = this.children.splice(index, 1);
          deleted.forEach(function (c) {
            return c._parent = null;
          });
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
        this.children.forEach(function (child) {
          return child._parent = null;
        });
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
    }, {
      key: "length",
      get: function get() {
        return this._children.length;
      }
    }]);

    return Container;
  })(ne.Actor);
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.SpriteBase = (function () {

  return (function (_ne$Actor) {
    _inherits(SpriteBase, _ne$Actor);

    function SpriteBase() {
      _classCallCheck(this, SpriteBase);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SpriteBase).call(this));
    }

    _createClass(SpriteBase, [{
      key: 'initMembers',
      value: function initMembers() {
        _get(Object.getPrototypeOf(SpriteBase.prototype), 'initMembers', this).call(this);
        this.shader = ne.SpriteShader.INSTANCE;
        this.texture = null;
        this.scale = new ne.Point(1, 1);
        this.position = new ne.Point();
        this.offset = new ne.Point();
        this.origin = new ne.Point();
        this.tone = new ne.Tone();
        this.angle = 0;
      }
    }, {
      key: 'render',
      value: function render(gl) {
        if (this.visible && this.texture) {
          this.useShader(gl);
          this.applyBlendMode(gl);
          this.updateParent(gl);
          this.prepareAndRender(gl);
        }
      }
    }, {
      key: 'prepareAndRender',
      value: function prepareAndRender(gl) {
        var rect = this.useTexture(gl);
        this.updateShader(gl, rect);
        ne.tools.gl.draw(gl);
      }
    }, {
      key: 'applyBlendMode',
      value: function applyBlendMode(gl) {
        gl.enable(gl.BLEND);
        gl.blendEquation(gl.FUNC_ADD);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      }
    }, {
      key: 'useShader',
      value: function useShader(gl) {
        this.shader.generate(gl);
        this.shader.use(gl);
      }
    }, {
      key: 'updateParent',
      value: function updateParent(gl) {
        this.parent.useBuffer(gl);
        this.shader.updateAttribute(gl, 'a_position');
      }
    }, {
      key: 'useTexture',
      value: function useTexture(gl) {
        return this.texture.bind(gl, this.frame);
      }
    }, {
      key: 'updateShader',
      value: function updateShader(gl, rect) {
        this.shader.updateAttribute(gl, 'a_texCoord');
        this.shader.uniformValues.u_resolution.set(this.parent.parentWidth, this.parent.parentHeight);
        this.shader.uniformValues.u_textureSize.set(this.texture.width, this.texture.height);
        this.shader.uniformValues.u_matrix = this.generateMatrix(gl);
        this.shader.uniformValues.u_tone = this.tone;
        this.shader.update(gl);
      }
    }, {
      key: 'generateMatrix',
      value: function generateMatrix(gl) {
        var w = this.frame.width;
        var h = this.frame.height;
        var pw = this.parent.parentWidth;
        var ph = this.parent.parentHeight;
        var mat = ne.Mat3.translation(-this.offset.x * pw / w, -this.offset.y * ph / h).scale(this.scale.x, this.scale.y).rotate(this.angle * Math.PI / 180).translate(this.position.x * pw / w, this.position.y * ph / h);
        return mat;
      }
    }, {
      key: 'frame',
      get: function get() {
        return this.shader.uniformValues.u_frame;
      },
      set: function set(value) {
        this.shader.uniformValues.u_frame = value;
      }
    }, {
      key: 'texture',
      get: function get() {
        return this._texture;
      },
      set: function set(value) {
        if (this._texture !== value) {
          this._texture = value;
        }
        if (value !== null) {
          this.frame = value.rect;
        }
      }
    }]);

    return SpriteBase;
  })(ne.Actor);
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Sprite = (function () {
  var Sprite = (function (_ne$SpriteBase) {
    _inherits(Sprite, _ne$SpriteBase);

    function Sprite() {
      _classCallCheck(this, Sprite);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Sprite).apply(this, arguments));
    }

    _createClass(Sprite, [{
      key: "move",
      value: function move(x, y) {
        var time = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
        var mode = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

        return this.twig({ x: x, y: y }, time, mode);
      }
    }, {
      key: "rotate",
      value: function rotate(angle) {
        var time = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var mode = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

        return this.twig({ angle: angle }, time, mode);
      }
    }, {
      key: "tonalize",
      value: function tonalize(tone) {
        var time = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var mode = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

        return this.twig({ toneRed: tone.red, toneGreen: tone.green, toneBlue: tone.blue, toneGray: tone.gray }, time, mode);
      }
    }, {
      key: "x",
      get: function get() {
        return this.position.x;
      },
      set: function set(value) {
        this.position.x = value;
      }
    }, {
      key: "y",
      get: function get() {
        return this.position.y;
      },
      set: function set(value) {
        this.position.y = value;
      }
    }, {
      key: "ox",
      get: function get() {
        return this.offset.x;
      },
      set: function set(value) {
        this.offset.x = value;
      }
    }, {
      key: "oy",
      get: function get() {
        return this.offset.y;
      },
      set: function set(value) {
        this.offset.y = value;
      }
    }, {
      key: "width",
      get: function get() {
        return this.frame.width;
      }
    }, {
      key: "height",
      get: function get() {
        return this.frame.height;
      }
    }, {
      key: "toneRed",
      get: function get() {
        return this.tone.red;
      },
      set: function set(value) {
        this.tone.red = value;
      }
    }, {
      key: "toneGreen",
      get: function get() {
        return this.tone.green;
      },
      set: function set(value) {
        this.tone.green = value;
      }
    }, {
      key: "toneBlue",
      get: function get() {
        return this.tone.blue;
      },
      set: function set(value) {
        this.tone.blue = value;
      }
    }, {
      key: "toneGray",
      get: function get() {
        return this.tone.gray;
      },
      set: function set(value) {
        this.tone.gray = value;
      }
    }, {
      key: "toneGrey",
      get: function get() {
        return this.toneGray;
      },
      set: function set(value) {
        this.toneGray = value;
      }
    }, {
      key: "mirrorX",
      get: function get() {
        return this.scale.x < 0;
      },
      set: function set(value) {
        var sign = value ? -1 : 1;
        this.scale.x = sign * Math.abs(this.scale.x);
      }
    }, {
      key: "mirrorY",
      get: function get() {
        return this.scale.y < 0;
      },
      set: function set(value) {
        var sign = value ? -1 : 1;
        this.scale.y = sign * Math.abs(this.scale.y);
      }
    }]);

    return Sprite;
  })(ne.SpriteBase);

  return Sprite;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.SpriteSheet = (function () {
  var SpriteSheet = (function (_ne$Sprite) {
    _inherits(SpriteSheet, _ne$Sprite);

    function SpriteSheet() {
      _classCallCheck(this, SpriteSheet);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SpriteSheet).call(this));
    }

    _createClass(SpriteSheet, [{
      key: "initMembers",
      value: function initMembers() {
        _get(Object.getPrototypeOf(SpriteSheet.prototype), "initMembers", this).call(this);
        this.columns = 1;
        this.rows = 1;
        this._currentFrame = 0;
        this._currentMotion = null;
        this._motionSpeed = 0;
        this._motionIndex = 0;
        this._motionTime = 0;
        this._loops = 0;
        this.motions = {};
      }
    }, {
      key: "act",
      value: function act(delta) {
        _get(Object.getPrototypeOf(SpriteSheet.prototype), "act", this).call(this, delta);
        this.updateFrameAnimation(delta);
        this.updateFrame();
      }
    }, {
      key: "updateFrameAnimation",
      value: function updateFrameAnimation(delta) {
        if (!this._currentMotion) return;
        var i = 0;
        this._motionTime -= delta;
        while (this._motionTime <= 0) {
          this._motionTime += this._motionSpeed;
          this.updateMotionFrame();
        }
      }
    }, {
      key: "updateMotionFrame",
      value: function updateMotionFrame() {
        this._motionIndex += 1;
        if (this.isMotionOver()) {
          if (this._loops > 0) {
            --this._loops;
          }
          this._motionIndex = this.isFrameLooping() ? 0 : this._motionIndex - 1;
        }
        this._currentFrame = this._currentMotion[this._motionIndex];
      }
    }, {
      key: "isMotionOver",
      value: function isMotionOver() {
        return this._motionIndex >= this._currentMotion.length;
      }
    }, {
      key: "isFrameLooping",
      value: function isFrameLooping() {
        return this._loops != 0;
      }
    }, {
      key: "updateFrame",
      value: function updateFrame() {
        if (!this.texture) return;
        var w = this.texture.width / this.columns;
        var h = this.texture.height / this.rows;
        var x = w * (this._currentFrame % this.columns);
        var y = h * Math.floor(this._currentFrame / this.columns);
        this.frame.set(x, y, w, h);
      }
    }, {
      key: "startMotion",
      value: function startMotion(name) {
        var speed = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];
        var loops = arguments.length <= 2 || arguments[2] === undefined ? -1 : arguments[2];

        this._motionIndex = 0;
        this._currentMotion = this.motions[name] || null;
        this._motionSpeed = speed;
        this._loops = loops;
        this._motionTime = speed;
        if (this._currentMotion) {
          this._currentFrame = this._currentMotion[this._motionIndex];
        }
      }
    }, {
      key: "afterLoad",
      value: function afterLoad(loader) {
        this.calculateDelta();
        _get(Object.getPrototypeOf(SpriteSheet.prototype), "afterLoad", this).call(this, loader);
      }
    }]);

    return SpriteSheet;
  })(ne.Sprite);

  return SpriteSheet;
})();
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Plane = (function () {
  var Plane = (function (_ne$Sprite) {
    _inherits(Plane, _ne$Sprite);

    function Plane() {
      _classCallCheck(this, Plane);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Plane).apply(this, arguments));
    }

    _createClass(Plane, [{
      key: 'initMembers',
      value: function initMembers() {
        _get(Object.getPrototypeOf(Plane.prototype), 'initMembers', this).call(this);
        this.shader = ne.PlaneShader.INSTANCE;
      }
    }, {
      key: 'prepareAndRender',
      value: function prepareAndRender(gl) {
        var rect = this.useTexture(gl);
        this.updateShader(gl, rect);
        var max = Math.max(this.parent.parentWidth, this.parent.parentHeight);
        this._untiledPosition = this.position.clone();
        this.renderTiles(gl, max);
        this.position = this._untiledPosition;
      }
    }, {
      key: 'renderTiles',
      value: function renderTiles(gl, max) {
        var _calculateTileValues = this.calculateTileValues();

        var _calculateTileValues2 = _slicedToArray(_calculateTileValues, 4);

        var sw = _calculateTileValues2[0];
        var sh = _calculateTileValues2[1];
        var s = _calculateTileValues2[2];
        var c = _calculateTileValues2[3];

        var xtimes = Math.floor(max / sw) + 3;
        var ytimes = Math.floor(max / sh) + 3;
        for (var x = 0; x < xtimes; ++x) {
          for (var y = 0; y < ytimes; ++y) {
            this.drawTile(gl, x, y, sw, sh, s, c);
          }
        }
      }
    }, {
      key: 'calculateTileValues',
      value: function calculateTileValues() {
        var sx = this.scale.x * this.frame.width;
        var sy = this.scale.y * this.frame.height;
        var r = this.angle * Math.PI / 180;
        var s = Math.sin(r);
        var c = Math.cos(r);
        var sw = sx * c * c + sy * s * s;
        var sh = sy * c * c + sx * s * s;
        return [sw, sh, s, c];
      }
    }, {
      key: 'drawTile',
      value: function drawTile(gl, x, y, sx, sy, s, c) {
        function mod(a, b) {
          return (a % b + b) % b;
        }
        var px = this._untiledPosition.x * c * c - this._untiledPosition.y * s * s;
        var py = this._untiledPosition.y * c * c - this._untiledPosition.x * s * s;
        this.position.x = mod(px, sx) + sx * (x - 1);
        this.position.y = mod(py, sy) + sy * (y - 1);
        this.shader.uniformValues.u_matrix = this.generateMatrix(gl);
        this.shader.update(gl);
        ne.tools.gl.draw(gl);
      }
    }, {
      key: 'updateShader',
      value: function updateShader(gl, rect) {
        this.shader.updateAttribute(gl, 'a_texCoord');
        this.shader.uniformValues.u_resolution.set(this.parent.parentWidth, this.parent.parentHeight);
        this.shader.uniformValues.u_textureSize.set(this.texture.width, this.texture.height);
        this.shader.uniformValues.u_tone = this.tone;
      }
    }]);

    return Plane;
  })(ne.Sprite);

  return Plane;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Scene = (function () {

  return (function (_ne$Container) {
    _inherits(Scene, _ne$Container);

    function Scene() {
      _classCallCheck(this, Scene);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Scene).call(this));
    }

    _createClass(Scene, [{
      key: 'initMembers',
      value: function initMembers() {
        _get(Object.getPrototypeOf(Scene.prototype), 'initMembers', this).call(this);
        this.shader = ne.SceneShader.INSTANCE;
        this._glBuffer = null;
        this._glData = new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]);
      }
    }, {
      key: 'load',
      value: function load(game, loader) {}
    }, {
      key: 'start',
      value: function start(game, loader) {}
    }, {
      key: 'startGlData',
      value: function startGlData(game) {
        var data = this._glData;
        data[0] = data[4] = data[6] = 0; // x
        data[1] = data[3] = data[9] = 0; // x
        data[2] = data[8] = data[10] = game.width; // width
        data[5] = data[7] = data[11] = game.height; // height
        this.shader.uniformValues.u_matrix = ne.Mat3.projection(game.width, game.height);
      }
    }, {
      key: 'render',
      value: function render(gl) {
        if (this.visible) {
          this.glClear(gl);
          this.useShader(gl);
          this.useBuffer(gl);
          this.updateShader(gl);
          ne.tools.gl.draw(gl);
          _get(Object.getPrototypeOf(Scene.prototype), 'render', this).call(this, gl);
        }
      }
    }, {
      key: 'glClear',
      value: function glClear(gl) {
        gl.clearColor(1, 1, 1, 1);
        gl.colorMask(true, true, true, true);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
    }, {
      key: 'destroy',
      value: function destroy(gl) {
        _get(Object.getPrototypeOf(Scene.prototype), 'destroy', this).call(this, gl);
        this.destroyBuffer(gl);
        this.shader.destroy(gl);
      }
    }, {
      key: 'useShader',
      value: function useShader(gl) {
        this.shader.generate(gl);
        this.shader.use(gl);
      }
    }, {
      key: 'useBuffer',
      value: function useBuffer(gl) {
        this.generateBuffer(gl);
        ne.tools.gl.bindBuffer(gl, this._glBuffer, this._glData);
      }
    }, {
      key: 'updateShader',
      value: function updateShader(gl) {
        this.shader.updateAttribute(gl, 'a_position');
        this.shader.update(gl);
      }
    }, {
      key: 'destroyBuffer',
      value: function destroyBuffer(gl) {
        if (this._glBuffer) {
          gl.deleteBuffer(this._glBuffer);
        }
      }
    }, {
      key: 'generateBuffer',
      value: function generateBuffer(gl) {
        if (!this._glBuffer) {
          this._glBuffer = gl.createBuffer();
        }
      }
    }, {
      key: 'bgColor',
      get: function get() {
        return this.shader.uniformValues.u_bgColor;
      }
    }, {
      key: 'parentWidth',
      get: function get() {
        return this.parent ? this.parent.width : this._glData[2];
      }
    }, {
      key: 'parentHeight',
      get: function get() {
        return this.parent ? this.parent.height : this._glData[5];
      }
    }]);

    return Scene;
  })(ne.Container);
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.SpriteShader = (function () {

  var instance = null;

  return (function (_ne$Shader) {
    _inherits(SpriteShader, _ne$Shader);

    function SpriteShader() {
      _classCallCheck(this, SpriteShader);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SpriteShader).apply(this, arguments));
    }

    _createClass(SpriteShader, [{
      key: 'vertex',
      value: function vertex() {
        return '\n        // rotates the texture\n        vec2 point = a_position;\n        vec2 size = u_resolution * u_resolution / u_frame.zw;\n\n        vec2 position = (u_matrix * vec3(a_position, 1.0)).xy / size;\n        // convert from 0->1 to 0->2\n        vec2 zeroToTwo = position * 2.0;\n        // convert from 0->2 to -1->+1 (clipspace)\n        vec2 clipSpace = zeroToTwo - 1.0;\n        v_texCoord = a_texCoord;\n        gl_Position = vec4(clipSpace * vec2(1, -1.0), 0, 1.0);\n      ';
      }
    }, {
      key: 'fragment',
      value: function fragment() {
        return '\n        float avg = 0.2126 * (u_tone.r) + 0.7152 * (u_tone.g) + 0.0722 * (u_tone.b);\n        vec4 texColor = texture2D(u_texture, v_texCoord);\n        vec4 grayScale = vec4(avg, avg, avg, texColor[3]) * u_tone[3];\n        vec4 tinted = vec4(u_tone.rgb, 0.0);\n        gl_FragColor = ( tinted + texColor * (1.0 - u_tone.a) + grayScale);\n      ';
        return "gl_FragColor = texture2D(u_texture, v_texCoord);";
      }
    }, {
      key: 'attributes',
      value: function attributes() {
        return {
          a_position: 'vec2',
          a_texCoord: 'point'
        };
      }
    }, {
      key: 'uniforms',
      value: function uniforms() {
        return {
          u_texture: 'sampler2D',
          u_textureSize: 'vec2',
          u_resolution: 'vec2',
          u_tone: 'tone',
          u_matrix: 'mat3',
          u_frame: 'rect'
        };
      }
    }, {
      key: 'varying',
      value: function varying() {
        return {
          v_texCoord: 'point'
        };
      }
    }], [{
      key: 'INSTANCE',
      get: function get() {
        if (instance === null) {
          instance = new ne.SpriteShader();
        }
        return instance;
      }
    }]);

    return SpriteShader;
  })(ne.Shader);
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.PlaneShader = (function () {

  var _shader = null;

  var PlaneShader = (function (_ne$SpriteShader) {
    _inherits(PlaneShader, _ne$SpriteShader);

    function PlaneShader() {
      _classCallCheck(this, PlaneShader);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PlaneShader).apply(this, arguments));
    }

    _createClass(PlaneShader, null, [{
      key: "INSTANCE",
      get: function get() {
        if (_shader === null) {
          _shader = new PlaneShader();
        }
        return _shader;
      }
    }]);

    return PlaneShader;
  })(ne.SpriteShader);

  return PlaneShader;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.SceneShader = (function () {

  var instance = null;

  return (function (_ne$Shader) {
    _inherits(SceneShader, _ne$Shader);

    function SceneShader() {
      _classCallCheck(this, SceneShader);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SceneShader).apply(this, arguments));
    }

    _createClass(SceneShader, [{
      key: "vertex",
      value: function vertex() {
        return ["gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);"].join('\n');
      }
    }, {
      key: "fragment",
      value: function fragment() {
        return "gl_FragColor = u_bgColor;";
      }
    }, {
      key: "attributes",
      value: function attributes() {
        return {
          a_position: 'vec2'
        };
      }
    }, {
      key: "uniforms",
      value: function uniforms() {
        return {
          u_bgColor: 'color',
          u_matrix: 'mat3'
        };
      }
    }], [{
      key: "INSTANCE",
      get: function get() {
        if (instance === null) {
          instance = new ne.SceneShader();
        }
        return instance;
      }
    }]);

    return SceneShader;
  })(ne.Shader);
})();
//# sourceMappingURL=ne.js.map
