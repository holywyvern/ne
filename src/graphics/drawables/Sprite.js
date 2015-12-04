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
      return this.shader.uniformValues.u_scale;
    }

    get position() {
      return this.shader.uniformValues.u_scale;
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

    move(x, y, time=0, mode=null) {
      this.twig({x: x, y: y}, time, mode);
    }

    render(gl) {
      if (this.visible && this.texture) {
        this.useShader(gl);
        this.useTexture(gl);
        ne.tools.gl.draw(gl);
      }
    }

    useShader(gl) {
      this.shader.generate(gl);
      this.shader.use(gl);
      this.shader.updateAttribute(gl, 'a_position');
    }

    useTexture(gl) {
      this.texture.bind(gl, this.texture.rect);
      this.updateShader(gl);
    }

    updateShader(gl) {
      this.shader.updateAttribute(gl, 'a_texCoord');
      this.shader.uniformValues.u_resolution = this.parent.shader.uniformValues.u_resolution;
      this.shader.update(gl);
    }

  }

})();
