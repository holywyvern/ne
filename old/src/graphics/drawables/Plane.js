ne.Plane = (function () {

  class Plane extends ne.Sprite {

    initMembers() {
      super.initMembers();
      this.shader = ne.PlaneShader.INSTANCE;
    }

    prepareAndRender(gl) {
      var rect = this.useTexture(gl);
      this.updateShader(gl, rect);
      var max = Math.max(this.parent.parentWidth, this.parent.parentHeight);
      this._untiledPosition = this.position.clone();
      this.renderTiles(gl, max);
      this.position = this._untiledPosition;
    }

    renderTiles(gl, max) {
      var [sw, sh, s, c] = this.calculateTileValues();
      var xtimes = Math.floor(max / sw) + 3;
      var ytimes = Math.floor(max / sh) + 3;
      for (var x = 0; x < xtimes; ++x) {
        for (var y = 0; y < ytimes; ++y) {
          this.drawTile(gl, x, y, sw, sh, s, c);
        }
      }
    }

    calculateTileValues() {
      var sx = this.scale.x * this.frame.width;
      var sy = this.scale.y * this.frame.height;
      var r = this.angle * Math.PI / 180;
      var s = Math.sin(r);
      var c = Math.cos(r);
      var sw = sx * c * c + sy * s * s;
      var sh = sy * c * c + sx * s * s;
      return [sw, sh, s, c];
    }

    drawTile(gl, x, y, sx, sy, s, c) {
      function mod(a, b) {
        return (a % b + b) % b;
      }
      var px = this._untiledPosition.x * c * c - this._untiledPosition.y * s * s;
      var py = this._untiledPosition.y * c * c - this._untiledPosition.x * s * s;
      this.position.x = mod(px, sx) + sx * (x - 1);
      this.position.y = mod(py, sy) + sy * (y - 1);
      this.shader.uniformValues.u_matrix  = this.generateMatrix(gl);
      this.shader.update(gl);
      ne.tools.gl.draw(gl);
    }

    updateShader(gl, rect) {
      this.shader.updateAttribute(gl, 'a_texCoord');
      this.shader.uniformValues.u_resolution.set(this.parent.parentWidth, this.parent.parentHeight);
      this.shader.uniformValues.u_textureSize.set(this.texture.width, this.texture.height);
      this.shader.uniformValues.u_tone        = this.tone;
    }

  }

  return Plane;

})();
