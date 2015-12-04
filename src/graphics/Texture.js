ne.Texture = (function () {

  return class Texture {

    constructor(pixmap) {
      this._data = new Float32Array([
        0.0,  0.0,     1.0,  0.0,
        0.0,  1.0,     0.0,  1.0,
        1.0,  0.0,     1.0,  1.0
      ]);
      this._pixmap = pixmap;
      this._glTexture = null;
      this._buffer = null;
      this._isDirty = false;
    }

    get rect() {
      return this._pixmap.rect;
    }

    get width() {
      return this._pixmap.width;
    }

    get height() {
      return this._pixmap.height;
    }

    generate(gl) {
      if (this._isDirty) {
        this._isDirty = false;
        this.destroyTexture();
      }
      this.regenerateTexture(gl);
      this.regenerateBuffer(gl);
      return this._glTexture;
    }

    update() {
      this._isDirty = true;
    }

    regenerateTexture(gl) {
      if (!this._glTexture) {
        this.generateTexture(gl);
      }
    }

    regenerateBuffer(gl) {
      if (!this._buffer) {
        this.generateBuffer(gl);
      }
    }

    destroy(gl) {
      this.destroyTexture(gl);
      this.destroyBuffer(gl);
    }

    destroyTexture(gl) {
      if (this._glTexture) {
        gl.destroyTexture(gl);
        this._glTexture = null;
      }
    }

    destroyBuffer(gl) {
      if (this._buffer) {
        gl.destroyBuffer(this._buffer);
        this._buffer = null;
      }
    }

    generateBuffer(gl) {
      this._buffer = gl.createBuffer();
    }

    generateTexture(gl) {
      this._glTexture = this._pixmap.generateTexture(gl);
    }

    bind(gl, rect) {
      this.generate(gl);
      this.bindBuffer(gl, rect);
      this.bindTexture(gl);
    }

    bindBuffer(gl, rect) {
      this.refreshData(rect);
      ne.tools.gl.bindBuffer(gl, this._buffer, this._data);
    }

    refreshData(rect) {
      var x1 = this.clamp(0, rect.width,             rect.x           );
      var y1 = this.clamp(0, rect.height,            rect.y           );
      var x2 = this.clamp(0, rect.width  - x1, (rect.x + rect.width)  );
      var y2 = this.clamp(0, rect.height - y1, (rect.y + rect.height) );
      this._data[0] = this._data[4] = this._data[ 6] = x1;
      this._data[1] = this._data[3] = this._data[ 9] = y1;
      this._data[2] = this._data[8] = this._data[10] = x2;
      this._data[5] = this._data[7] = this._data[11] = y2;
    }

    clamp(min, max, value) {
      return Math.max(min,  Math.min(max, value));
    }

    bindTexture(gl) {
      ne.tools.gl.bindTexture(gl, this._glTexture);
    }

  };

})();
