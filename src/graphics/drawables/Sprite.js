ne.Sprite = (function () {

  return class Sprite extends ne.Actor {

    constructor() {
      super();
    }

    initMembers() {
      super.initMembers();
      this.shader   = new ne.SpriteShader();
      this.texture  = null;
      this.scale    = new ne.Point(1, 1);
      this.position = new ne.Point();
      this.offset   = new ne.Point();
      this.origin   = new ne.Point();
      this.angle    = 0;
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
        this.updateParent(gl);
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
    }

    updateParent(gl) {
      this.parent.useBuffer(gl);
      this.shader.updateAttribute(gl, 'a_position');
    }

    useTexture(gl) {
      this.texture.bind(gl, this.texture.rect);
      this.updateShader(gl);
    }

    updateShader(gl) {
      this.shader.updateAttribute(gl, 'a_texCoord');
      this.shader.uniformValues.u_resolution.set(this.parent.parentWidth, this.parent.parentHeight);
      this.shader.uniformValues.u_textureSize = this.texture.rect.wh;
      this.shader.uniformValues.u_matrix      = this.generateMatrix(gl);
      this.shader.update(gl);
    }

    generateMatrix(gl) {
      var $ = ne.tools.gl;

      var mat =  $.makeTranslation(
        -this.offset.x * this.parent.parentWidth / this.texture.width,
        -this.offset.y * this.parent.parentHeight / this.texture.height
      );
      mat = $.matrixMultiply(mat, $.makeScale(this.scale.x, this.scale.y));
      mat = $.matrixMultiply(mat, $.makeRotation(this.angle * Math.PI / 180) );
      mat = $.matrixMultiply(mat, $.makeTranslation(
        this.position.x * this.parent.parentWidth / this.texture.width,
        this.position.y * this.parent.parentHeight  / this.texture.width
      ) );
      return mat;
    }

  }

})();
