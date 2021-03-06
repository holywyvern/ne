ne.SpriteBase = (function () {

  return class SpriteBase extends ne.Actor {

    constructor() {
      super();
    }

    initMembers() {
      super.initMembers();
      this.shader   = ne.SpriteShader.INSTANCE;
      this.texture  = null;
      this.scale    = new ne.Point(1, 1);
      this.position = new ne.Point();
      this.offset   = new ne.Point();
      this.origin   = new ne.Point();
      this.tone     = new ne.Tone();
      this.angle    = 0;
    }

    get frame() {
      return this.shader.uniformValues.u_frame;
    }

    set frame(value) {
      this.shader.uniformValues.u_frame = value;
    }

    get texture() {
      return this._texture;
    }

    set texture(value) {
      if (this._texture !== value) {
        this._texture = value;
      }
      if (value !== null) {
        this.frame = value.rect;
      }
    }

    render(gl) {
      if (this.visible && this.texture) {
        this.useShader(gl);
        this.applyBlendMode(gl);
        this.updateParent(gl);
        this.prepareAndRender(gl);
      }
    }

    prepareAndRender(gl) {
      var rect = this.useTexture(gl);
      this.updateShader(gl, rect);
      ne.tools.gl.draw(gl);
    }

    applyBlendMode(gl) {
      gl.enable( gl.BLEND );
      gl.blendEquation( gl.FUNC_ADD );
      gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
    }

    useShader(gl) {
      this.shader.generate(gl);
      this.shader.use(gl);
    }

    updateParent(gl) {
      this.parent.useBuffer(gl);
      this.shader.updateAttribute(gl, 'a_position');
    }

    useTexture(gl) {
      return this.texture.bind(gl, this.frame);
    }

    updateShader(gl, rect) {
      this.shader.updateAttribute(gl, 'a_texCoord');
      this.shader.uniformValues.u_resolution.set(this.parent.parentWidth, this.parent.parentHeight);
      this.shader.uniformValues.u_textureSize.set(this.texture.width, this.texture.height);
      this.shader.uniformValues.u_matrix      = this.generateMatrix(gl);
      this.shader.uniformValues.u_tone        = this.tone;
      this.shader.update(gl);
    }

    generateMatrix(gl) {
      var w = this.frame.width;
      var h = this.frame.height;
      var pw =  this.parent.parentWidth;
      var ph = this.parent.parentHeight;
      var mat =  ne.Mat3
        .translation( -this.offset.x * pw / w, -this.offset.y * ph / h )
        .scale(this.scale.x, this.scale.y)
        .rotate(this.angle * Math.PI / 180)
        .translate( this.position.x * pw / w, this.position.y * ph / h );
      return mat;
    }

  }

})();
