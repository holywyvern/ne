module ne.utils.gl {

  export function bindBuffer(gl: WebGLRenderingContext, buffer :WebGLBuffer, rect : graphics.Rect) {
    var x1 = rect.x;
    var x2 = rect.x + rect.width;
    var y1 = rect.y;
    var y2 = rect.y + rect.height;
    var data = new Float32Array([ x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2 ]);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  }

  export function drawTriangles(gl: WebGLRenderingContext, amount:number) {
    gl.drawArrays(gl.TRIANGLES, 0, amount * 3);
  }

}
