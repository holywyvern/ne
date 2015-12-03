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
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  };

  $.bindBuffer = function (gl, buffer, data) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  };

  $.draw = function () {
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

  $.checkShader = function (gl, shader) {
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      var log = gl.getShaderInfoLog(shader);
      var e = "Could not compile shader:" + log + ".\nSource was:\n" + source;
      gl.deleteShader(shader);
      throw e;
    }
  };

  $.makeShader = function (gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    this.checkShader(gl, shader);
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
            key: "toCss",
            value: function toCss() {
                var a = this.alpha / 255;
                return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + a + ")";
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
        }]);

        return Color;
    })(ne.ColorBase);

    return Color;
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

ne.ShaderBase = (function () {
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
        gl.useProgram(this._glProgram);
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

        var uniforms = this.attributes();
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
          this._glProgram = ne.tools.gl.generateProgram(gl, this._glVertex, this._glFragment);
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
            result += kind + " " + type + " " + a + ";";
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
        if (location) {
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
        return 'precision mediump float;';
      }
    }, {
      key: "mainFunction",
      value: function mainFunction(code) {
        return "void main(void) { " + code + " }";
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
    'int': 'int'
  };

  return ShaderBase;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
        switch (type) {
          case 'point':
            return new ne.Point(0, 0);
          case '3d-point':
            return new ne.Point(0, 0, 0);
          case 'color':
            return new ne.Color(0, 0, 0);
          case 'rect':
            return new ne.Rect();
          case 'number':case 'float':case 'real':
            return 0;
          case 'vec2':
            return [0, 0];
          case 'vec3':
            return [0, 0, 0];
          case 'array':case 'vec4':
            return [0, 0, 0, 0];
          default:
            return 0;
        }
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
        if (location) {
          this.updateUniformByType(gl, location, type, value);
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
          case 'rect':
            gl.uniform4f(location, rect.x, rect.y, rect.width, rect.height);
            break;
          case 'color':
            gl.uniform4f(location, color.red, color.green, color.blue, color.alpha);
            break;
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
        this.bindBuffer(gl, rect);
        this.bindTexture(gl);
      }
    }, {
      key: "bindBuffer",
      value: function bindBuffer(gl, rect) {
        this.refreshData(rect);
        ne.tools.gl.bindBuffer(gl, this._buffer, this._data);
      }
    }, {
      key: "refreshData",
      value: function refreshData(rect) {
        var x1 = this.clamp(rect.x / this._pixmap.width);
        var y1 = this.clamp(rect.y / this._pixmap.height);
        var x2 = this.clamp((rect.x + rect.width) / this._pixmap.width);
        var y2 = this.clamp((rect.y + rect.height) / this._pixmap.height);
        this._data[0] = this._data[4] = this._data[6] = x1;
        this._data[1] = this._data[3] = this._data[9] = y1;
        this._data[2] = this._data[8] = this._data[10] = x2;
        this._data[5] = this._data[7] = this._data[11] = y2;
      }
    }, {
      key: "clamp",
      value: function clamp(value) {
        return Math.max(0, Math.min(1, value));
      }
    }, {
      key: "bindTexture",
      value: function bindTexture(gl) {
        ne.tools.gl.bindTexture(gl, this._glTexture);
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
      key: 'width',
      get: function get() {
        return this._canvas.width;
      }
    }, {
      key: 'height',
      get: function get() {
        return this._canvas.height;
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
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.Sprite = (function () {

  return (function (_ne$Drawable) {
    _inherits(Sprite, _ne$Drawable);

    function Sprite() {
      _classCallCheck(this, Sprite);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sprite).call(this));

      _this.position = new ne.Point();
      _this.scale = new ne.Point(1, 1);
      _this.offset = new ne.Point();
      _this.shader = new ne.SpriteShader();
      return _this;
    }

    return Sprite;
  })(ne.Drawable);
})();
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ne.SpriteShader = (function () {

  return (function (_ne$Shader) {
    _inherits(SpriteShader, _ne$Shader);

    function SpriteShader() {
      _classCallCheck(this, SpriteShader);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SpriteShader).apply(this, arguments));
    }

    _createClass(SpriteShader, [{
      key: "vertex",
      value: function vertex() {
        return "gl_Position = vec4(a_position, 0, 1);";
      }
    }, {
      key: "fragment",
      value: function fragment() {
        return "gl_FragColor = vec4(0, 1, 0, 1);";
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
        return {};
      }
    }, {
      key: "varying",
      value: function varying() {
        return {};
      }
    }]);

    return SpriteShader;
  })(ne.Shader);
})();
//# sourceMappingURL=ne.js.map
