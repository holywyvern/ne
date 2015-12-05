ne.Sprite = (function () {

  return class Sprite extends ne.Actor {

    constructor() {
      super();
    }

    initMembers() {
      super.initMembers();
      this.shader   = new ne.SpriteShader();
      this.texture  = null;
      this.scale.set(1, 1);
    }

    get scale() {
      return this.shader.uniformValues.u_scale;
    }

    get offset() {
      return this.shader.uniformValues.u_offset;
    }

    get position() {
      return this.shader.uniformValues.u_position;
    }

    get angle() {
      return this.shader.uniformValues.u_rotation * 180 / Math.PI;
    }

    set angle(value) {
      this.shader.uniformValues.u_rotation = value * Math.PI / 180;
    }

    get x() {
      return this.position.x;
    }

    get y() {
      return this.position.y;
    }

    set x(value) {
      this.position.x = value;
    }

    set y(value) {
      this.position.y = value;
    }

    get width() {
      return this.texture ? this.texture.width : 0;
    }

    get height() {
      return this.texture ? this.texture.height : 0;
    }

    move(x, y, time=0, mode=null) {
      this.twig({x: x, y: y}, time, mode);
    }

    render(gl) {
      if (this.visible && this.texture) {
        this.useShader(gl);
        this.applyBlendMode(gl);
        this.useTexture(gl);
        ne.tools.gl.draw(gl);
      }
    }

    applyBlendMode(gl) {
      gl.enable( gl.BLEND );
      gl.blendEquation( gl.FUNC_ADD );
      gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
    }

    useShader(gl) {
      this.shader.generate(gl);
      this.shader.use(gl);
      //this.shader.updateAttribute(gl, 'a_position');
    }

    useTexture(gl) {
      this.texture.bind(gl, this.texture.rect);
      this.updateShader(gl);
    }

    updateShader(gl) {
      this.shader.updateAttribute(gl, 'a_texCoord');
      this.shader.uniformValues.u_resolution  = this.parent.shader.uniformValues.u_resolution;
      this.shader.uniformValues.u_textureSize = this.texture.rect.wh;
      this.shader.update(gl);
    }

  }

})();
