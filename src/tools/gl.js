
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
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }

  $.bindBuffer = function (gl, buffer, data) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  }

  $.draw = function (gl) {
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  $.checkShader = function (gl, shader) {
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      let log = gl.getShaderInfoLog(shader);
      let e = "Could not compile shader:" + log + ".\nSource was:\n" + source;
      gl.deleteShader(shader);
      throw e;
    }
  }

  $.makeShader = function (gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    this.checkShader(gl, shader);
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

  return $;

})();
