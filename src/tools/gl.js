
ne.tools.gl = (function () {

  var $ = {};

  $.textureFromCanvas = function (gl, canvas) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    return texture;
  }

  $.bindTexture = function (gl, texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  }

  $.bindBuffer = function (gl, buffer, data) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  }

  $.draw = function (gl) {
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  $.checkShader = function (gl, shader, source=null) {
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      let log = gl.getShaderInfoLog(shader);
      let txt = source ? ".\nSource was:\n" + source : '';
      let e = "Could not compile shader:" + log + txt;
      gl.deleteShader(shader);
      throw e;
    }
  }

  $.makeShader = function (gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    this.checkShader(gl, shader, source);
    return shader;
  }

  $.checkProgram = function (gl, program) {
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      throw ("program failed to link:" + gl.getProgramInfoLog (program));
    }
  }

  $.makeProgram = function (gl, vertex, fragment) {
    var program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    this.checkProgram(gl, program);
    return program;
  }

  $.makeTranslation = function (tx, ty) {
    return [
      1, 0, 0,
      0, 1, 0,
      tx, ty, 1
    ];
  }

  $.makeRotation = function (angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    return [
      c,-s, 0,
      s, c, 0,
      0, 0, 1
    ];
  }

  $.makeScale = function (sx, sy) {
    return [
      sx, 0, 0,
      0, sy, 0,
      0, 0, 1
    ];
  }

  $.makeIdentity = function () {
    return [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ];
  }

  $.matrixMultiply = function (a, b) {
    var a00 = a[ 0 * 3 + 0];
    var a01 = a[ 0 * 3 + 1];
    var a02 = a[ 0 * 3 + 2];
    var a10 = a[ 1 * 3 + 0];
    var a11 = a[ 1 * 3 + 1];
    var a12 = a[ 1 * 3 + 2];
    var a20 = a[ 2 * 3 + 0];
    var a21 = a[ 2 * 3 + 1];
    var a22 = a[ 2 * 3 + 2];
    var b00 = b[ 0 * 3 + 0];
    var b01 = b[ 0 * 3 + 1];
    var b02 = b[ 0 * 3 + 2];
    var b10 = b[ 1 * 3 + 0];
    var b11 = b[ 1 * 3 + 1];
    var b12 = b[ 1 * 3 + 2];
    var b20 = b[ 2 * 3 + 0];
    var b21 = b[ 2 * 3 + 1];
    var b22 = b[ 2 * 3 + 2];
    return [a00 * b00 + a01 * b10 + a02 * b20,
            a00 * b01 + a01 * b11 + a02 * b21,
            a00 * b02 + a01 * b12 + a02 * b22,
            a10 * b00 + a11 * b10 + a12 * b20,
            a10 * b01 + a11 * b11 + a12 * b21,
            a10 * b02 + a11 * b12 + a12 * b22,
            a20 * b00 + a21 * b10 + a22 * b20,
            a20 * b01 + a21 * b11 + a22 * b21,
            a20 * b02 + a21 * b12 + a22 * b22
    ];
  }

  $.make2DProjection = function (width, height) {
  // Note: This matrix flips the Y axis so that 0 is at the top.
  return [
      2 / width, 0, 0,
      0, -2 / height, 0,
      -1, 1, 1
    ];
  }

  return $;

})();
