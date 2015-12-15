module ne.graphics {

  export class Texture {

    private _pixmap    : Pixmap;
    private _gl        : WebGLRenderingContext;
    private _glBuffer  : WebGLRenderbuffer;
    private _glTexture : WebGLTexture;
    private _buffer    : Float32Array;

    constructor(pixmap : Pixmap) {
      this._pixmap    = pixmap;
      this._gl        = null;
      this._glTexture = null;
      this._glBuffer  = null;
      this._buffer    = new Float32Array(12);
    }

    destroy() {
      if (this._gl !== null) {
        this._destroyGlTexture();
        this._destroyGlBuffer();
      }
    }

    private _destroyGlTexture() {
      if (this._glTexture !== null) {
        this._gl.deleteTexture(this._glTexture);
      }
      this._glTexture = null;
    }

    private _destroyGlBuffer() {
      if (this._glBuffer !== null) {
        this._gl.deleteBuffer(this._glTexture);
      }
      this._glBuffer = null;
    }

    generate(gl: WebGLRenderingContext) {
      this._gl = gl;
      this._generateGlBuffer();
      this._generateGlTexture();
      return this._glTexture;
    }

    update() {
      this.destroy();
    }

    check(gl: WebGLRenderingContext) {
      if (!this._glTexture) {
        this.generate(gl);
      }
    }

    bind(gl: WebGLRenderingContext, rect: Rect) {
      this.check(gl);
      this._bindGlBuffer(this._buffer, rect);
      this._bindGlTexture();
    }

    bindAll(rects : Rect[]) {
      var buffer = new Float32Array(rects.length * 12);
      var length = rects.length;
      for (var i = 0; i < length; ++i) {
        this.calculateRect(buffer, rects[i], i * 12);
      }
      this._bindGlTexture();
    }

    private _generateGlTexture() {
      var gl = this._gl;
      this._glTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this._glTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._pixmap.canvas);
    }

    private _generateGlBuffer() {
      this._glBuffer = this._gl.createBuffer();
    }

    private _bindGlBuffer(buffer: Float32Array, rect: Rect) {
      this.calculateRect(buffer, rect);
      this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._glBuffer);
      this._gl.bufferData(this._gl.ARRAY_BUFFER, buffer, this._gl.STATIC_DRAW);
    }

    private _bindGlTexture() {
      var gl = this._gl;
      gl.bindTexture(gl.TEXTURE_2D, this._glTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }

    private calculateRect(buffer: Float32Array, rect : Rect, offset: number = 0) {
      var x = rect.x      / this.width, y = rect.y      / this.height;
      var w = rect.width  / this.width, h = rect.height / this.height;
      buffer[offset + 0] = buffer[offset + 4] = buffer[offset +  6] = x;
      buffer[offset + 1] = buffer[offset + 3] = buffer[offset +  9] = y;
      buffer[offset + 2] = buffer[offset + 8] = buffer[offset + 10] = w + x;
      buffer[offset + 5] = buffer[offset + 7] = buffer[offset + 11] = h + y;
    }

    get width() {
      return this._pixmap.width;
    }

    get height() {
      return this._pixmap.height;
    }

    get rect() {
      return this._pixmap.rect;
    }

  }

}
